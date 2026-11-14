// ext/physics-28-30.js  Physics levels 28-30 (College year 1 second half, College year 2): optics and electromagnetism in depth, modern and quantum physics, Lagrangian ideas, relativity, statistical physics intro
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
  const choose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

  // ================= LEVEL 28 =================
  const a = [
    num("Brewster's angle", [
      ["Light polarised by reflection", "🕶️", "At one special angle of incidence, reflected light is completely <b>polarised</b> (its E-field is parallel to the surface). This is the <b>Brewster angle</b>: <b>tan θB = n₂ ÷ n₁</b>."],
      ["Ninety degrees apart", "📐", "At Brewster's angle the reflected ray and the refracted ray are exactly <b>90° apart</b>, so θ₁ + θ₂ = 90°. Polarising sunglasses block this glare."],
      ["Example", "🧮", "Air (n = 1) to water (n = 1.33): tan θB = 1.33, so θB ≈ 53°. The refracted angle is about 37°."]
    ], () => {
      const [n1, n2] = pick([[1, 1.5], [1, 2], [1.5, 3], [1.2, 1.8], [2, 3], [1.25, 2.5]]);
      const t = r2(n2 / n1), ang = pick([50, 52, 54, 56, 58, 60, 62]);
      return pick([
        S(`Light in a medium of index ${n1} meets a surface of index ${n2}. What is tan θB for the Brewster angle?`, "🕶️", n2 / n1,
          "Brewster's angle depends only on the two refractive indices.", "The tangent of the angle is the second index divided by the first.", "Example: from n = 1.2 into n = 2.4 gives tan θB = 2.4 ÷ 1.2 = 2. Now do yours."),
        S(`Light in a medium of index ${n1} meets a second medium at Brewster's angle, where tan θB = ${t}. What is the index of the second medium?`, "🔎", n2,
          "Start from the Brewster relation and solve for the unknown index.", "n₂ = n₁ × tan θB.", "Example: n₁ = 1.5 and tan θB = 2 gives n₂ = 3. Now do yours."),
        S(`Light in a medium of index ${n2} meets a second medium at Brewster's angle, where tan θB = ${r2(1 / t)}. What is the index of the second medium?`, "🔄", n1,
          "Here the ratio is less than 1, so the second medium has the smaller index.", "n₂ = n₁ × tan θB again.", "Example: n₁ = 2 and tan θB = 0.5 gives n₂ = 1. Now do yours."),
        S(`At Brewster's angle the angle of incidence is ${ang}°. What is the angle of refraction, in degrees?`, "📐", 90 - ang,
          "At this special angle the reflected and refracted rays are at right angles.", "The incidence angle and refraction angle add up to a quarter turn.", "Example: if the incidence angle were 55°, the refraction angle would be 35°. Now do yours.")
      ]);
    }),
    num("Lens power and combinations", [
      ["Power in dioptres", "🔭", "The <b>power</b> of a lens is <b>P = 1/f</b> with f in metres. The unit is the <b>dioptre (D)</b>. A short focal length means a strong lens. In centimetres, P = 100 ÷ f."],
      ["Lenses in contact", "🧩", "Thin lenses pressed together add their powers: <b>P = P₁ + P₂</b>. Spectacles use this: a negative lens (diverging) subtracts."],
      ["Example", "🧮", "f = 20 cm gives P = 5 D. Add a 3 D lens and the pair has 8 D, so f = 100 ÷ 8 = 12.5 cm."]
    ], () => {
      const f = pick([5, 10, 20, 25, 40, 50, 100]);
      const [p1, p2] = combo([[1, 2, 3, 4, 5, 6, 8], [1, 2, 3, 4, 5, 6, 8]], (x, y) => [2, 4, 5, 10].includes(x + y));
      return pick([
        S(`A lens has focal length ${f} cm. What is its power, in dioptres?`, "🔭", 100 / f,
          "Power is the reciprocal of the focal length.", "Use metres for f, or P = 100 ÷ f when f is in cm.", "Example: f = 40 cm is 0.4 m, so P = 1 ÷ 0.4 = 2.5 D. Now do yours."),
        S(`A lens has power ${r2(100 / f)} D. What is its focal length, in centimetres?`, "🔍", f,
          "Focal length is the reciprocal of the power.", "f(cm) = 100 ÷ P.", "Example: 4 D gives 100 ÷ 4 = 25 cm. Now do yours."),
        S(`Two thin lenses of ${p1} D and ${p2} D are pressed together. What is the power of the pair, in dioptres?`, "➕", p1 + p2,
          "Thin lenses in contact combine by adding something simple.", "Add the powers.", "Example: 2 D and 7 D together make 9 D. Now do yours."),
        S(`Two thin lenses of ${p1} D and ${p2} D are pressed together. What is the focal length of the pair, in centimetres?`, "🔭", 100 / (p1 + p2),
          "First find the combined power, then turn it into a focal length.", "f(cm) = 100 ÷ (P₁ + P₂).", "Example: 3 D and 7 D make 10 D, so f = 10 cm. Now do yours.")
      ]);
    }),
    num("The lensmaker's equation", [
      ["Shape sets the focus", "🔍", "A lens's focal length depends on its glass and its curved surfaces: <b>1/f = (n − 1)(1/R₁ − 1/R₂)</b>. R is positive for a surface bulging toward the incoming light."],
      ["Common shapes", "🧩", "Symmetric <b>biconvex</b> lens (R₁ = R, R₂ = −R): <b>f = R ÷ [2(n − 1)]</b>. <b>Plano-convex</b> (one flat face): <b>f = R ÷ (n − 1)</b>."],
      ["Example", "🧮", "Biconvex, R = 20 cm, n = 1.5: f = 20 ÷ (2 × 0.5) = 20 cm. Plano-convex with the same glass and R: f = 20 ÷ 0.5 = 40 cm."]
    ], () => {
      const [R, n] = combo([[8, 10, 12, 20, 24, 30, 40], [1.5, 1.25, 1.75, 1.4, 1.6]], (R, n) => cl(R / (2 * (n - 1))) && cl(R / (n - 1)));
      const f = pick([10, 20, 30, 40]), q = pick([0.5, 0.25, 0.75, 0.4]);
      const [n3, f3] = combo([[1.5, 1.6, 1.25, 1.4, 1.75], [10, 20, 25, 30, 40, 50]], (n, f) => cl(2 * (n - 1) * f));
      return pick([
        S(`A symmetric biconvex lens has surfaces of radius ${R} cm and glass of index ${n}. What is its focal length, in cm?`, "🔍", R / (2 * (n - 1)),
          "Both surfaces curve, so both help to bend the light.", "For a symmetric biconvex lens, f = R ÷ [2(n − 1)].", "Example: R = 30 cm and n = 1.6 gives f = 30 ÷ 1.2 = 25 cm. Now do yours."),
        S(`A plano-convex lens has one flat face and one face of radius ${R} cm. The glass has index ${n}. What is the focal length, in cm?`, "🥠", R / (n - 1),
          "Only one surface is curved; the flat face has an infinite radius.", "f = R ÷ (n − 1).", "Example: R = 12 cm and n = 1.5 gives 12 ÷ 0.5 = 24 cm. Now do yours."),
        S(`A symmetric biconvex lens has focal length ${f} cm and surface radius ${r2(f * 2 * q)} cm. What is the refractive index of the glass?`, "🧊", 1 + q,
          "Rearrange the lensmaker's formula to get (n − 1).", "n − 1 = R ÷ (2f) for a symmetric biconvex lens. Then add 1.", "Example: f = 20 cm and R = 20 cm gives n − 1 = 0.5, so n = 1.5. Now do yours."),
        S(`A symmetric biconvex lens of glass index ${n3} has focal length ${f3} cm. What is the radius of each surface, in cm?`, "📏", 2 * (n3 - 1) * f3,
          "Rearrange the formula to find R.", "R = 2(n − 1) f for a symmetric biconvex lens.", "Example: n = 1.5 and f = 24 cm gives R = 2 × 0.5 × 24 = 24 cm. Now do yours.")
      ]);
    }),
    num("Telescopes and microscopes", [
      ["Telescope", "🔭", "An astronomical telescope has an objective (long focal length fₒ) and an eyepiece (short fₑ). <b>Angular magnification M = fₒ ÷ fₑ</b>, and the tube length is about <b>fₒ + fₑ</b>."],
      ["Microscope", "🔬", "A compound microscope magnifies twice. The objective gives m<sub>o</sub> (about tube length ÷ fₒ) and the eyepiece acts as a magnifier giving <b>25 ÷ fₑ</b> (fₑ in cm). Total: <b>M = mₒ × 25 ÷ fₑ</b>."],
      ["Example", "🧮", "fₒ = 100 cm and fₑ = 4 cm: M = 25 and the length is 104 cm. Microscope with mₒ = 20 and fₑ = 5 cm: M = 20 × 5 = 100."]
    ], () => {
      const [fo, fe] = combo([[60, 80, 100, 120, 150, 200], [2, 4, 5, 10, 20]], (o, e) => cl(o / e) && o / e >= 4);
      const [mo, fm] = pick([[5, 2.5], [10, 5], [20, 5], [40, 2.5], [10, 2.5], [20, 10], [40, 5]]);
      return pick([
        S(`A telescope has an objective of focal length ${fo} cm and an eyepiece of ${fe} cm. What is its angular magnification?`, "🔭", fo / fe,
          "Magnification compares the two focal lengths.", "M = objective focal length ÷ eyepiece focal length.", "Example: 90 cm and 3 cm gives M = 30. Now do yours."),
        S(`A telescope has an objective of focal length ${fo} cm and an eyepiece of ${fe} cm. About how long is the tube, in cm?`, "📏", fo + fe,
          "The two focal points coincide inside the tube.", "Length ≈ fₒ + fₑ.", "Example: 80 cm and 5 cm gives 85 cm. Now do yours."),
        S(`A telescope with a ${fe} cm eyepiece has magnification ${fo / fe}. What is the focal length of its objective, in cm?`, "🌙", fo,
          "Rearrange M = fₒ ÷ fₑ.", "fₒ = M × fₑ.", "Example: M = 20 with a 3 cm eyepiece needs fₒ = 60 cm. Now do yours."),
        S(`A microscope has an objective magnification of ${mo} and an eyepiece of focal length ${fm} cm. What is the total magnification?`, "🔬", mo * 25 / fm,
          "Multiply the two stages together.", "The eyepiece stage is 25 ÷ fₑ with fₑ in cm.", "Example: objective ×10 with a 5 cm eyepiece gives 10 × 5 = 50. Now do yours.")
      ]);
    }),
    num("Resolving power", [
      ["Waves spread out", "👀", "Even a perfect lens blurs a point of light into a small disc because of diffraction. Two sources can just be told apart when separated by the <b>Rayleigh criterion</b>: <b>θmin = 1.22 λ ÷ D</b> (D = aperture diameter)."],
      ["Units", "🧩", "θ is in radians. With λ in nm and D in mm, <b>θ(µrad) = 1.22 × λ ÷ D</b>. A bigger aperture or a shorter wavelength resolves finer detail."],
      ["Example", "🧮", "λ = 500 nm and D = 10 mm: θ = 1.22 × 500 ÷ 10 = 61 µrad."]
    ], () => {
      const [l, D] = combo([[400, 500, 600, 700], [2, 4, 5, 10, 20, 25, 50]], (l, D) => cl(1.22 * l / D));
      const th0 = pick([200, 244, 122, 61]), k = pick([2, 4, 5, 10]);
      return pick([
        S(`A telescope of aperture ${D} mm observes light of wavelength ${l} nm. What is the smallest resolvable angle, in µrad? (θ = 1.22 λ ÷ D)`, "🔭", 1.22 * l / D,
          "Use the Rayleigh criterion with the wavelength and aperture.", "θ(µrad) = 1.22 × λ(nm) ÷ D(mm).", "Example: λ = 600 nm and D = 20 mm gives 1.22 × 30 = 36.6 µrad. Now do yours."),
        S(`A lens resolves a smallest angle of ${r2(1.22 * l / D)} µrad at wavelength ${l} nm. What is its aperture diameter, in mm?`, "👁️", D,
          "Rearrange the Rayleigh criterion for D.", "D(mm) = 1.22 × λ(nm) ÷ θ(µrad).", "Example: θ = 61 µrad at 500 nm gives D = 610 ÷ 61 = 10 mm. Now do yours."),
        S(`A telescope resolves ${th0} µrad. Its aperture is made ${k} times wider. What is the new smallest angle, in µrad?`, "⬆️", th0 / k,
          "A bigger aperture resolves finer detail, so the angle shrinks.", "θ is inversely proportional to D.", "Example: 300 µrad with an aperture 3 times wider becomes 100 µrad. Now do yours."),
        S(`A telescope resolves ${th0} µrad. Switching to light with a wavelength ${k} times shorter, what is the new smallest angle, in µrad?`, "🎨", th0 / k,
          "Shorter wavelengths diffract less.", "θ is proportional to λ.", "Example: 300 µrad with a wavelength 3 times shorter becomes 100 µrad. Now do yours.")
      ]);
    }),
    num("The Michelson interferometer", [
      ["Counting fringes", "🌀", "A beam is split and sent along two arms, reflected back and recombined. Moving one mirror by <b>d</b> changes the path by 2d, so the pattern shifts by <b>N = 2d ÷ λ</b> fringes."],
      ["Useful units", "🧩", "With d in µm and λ in nm: <b>N = 2000 × d ÷ λ</b>. This measures tiny distances; LIGO uses the same idea with arms 4 km long."],
      ["Example", "🧮", "d = 10 µm and λ = 500 nm: N = 2000 × 10 ÷ 500 = 40 fringes."]
    ], () => {
      const l = pick([400, 500, 800, 1000]), d = pick([10, 20, 30, 40, 50]);
      const [l2, N2] = combo([[400, 500, 800], [100, 200, 300, 500]], (l, N) => cl(N * l / 2000));
      return pick([
        S(`In a Michelson interferometer a mirror moves ${d} µm. The light has wavelength ${l} nm. How many fringes pass the screen?`, "🌀", 2000 * d / l,
          "Moving the mirror by d changes the light's path by twice d.", "N = 2d ÷ λ; with d in µm and λ in nm, N = 2000 d ÷ λ.", "Example: d = 25 µm and λ = 500 nm gives N = 50000 ÷ 500 = 100. Now do yours."),
        S(`${N2} fringes pass as a mirror in a Michelson interferometer moves. The light has wavelength ${l2} nm. How far did the mirror move, in µm?`, "📏", N2 * l2 / 2000,
          "Rearrange N = 2d ÷ λ for d.", "d = N λ ÷ 2, and with λ in nm and d in µm divide by 2000.", "Example: 100 fringes at 500 nm gives d = 100 × 500 ÷ 2000 = 25 µm. Now do yours."),
        S(`A mirror moves ${d} µm and ${2000 * d / l} fringes are counted. What is the wavelength, in nm?`, "🌈", l,
          "Rearrange N = 2d ÷ λ for the wavelength.", "λ(nm) = 2000 d(µm) ÷ N.", "Example: 40 µm and 100 fringes gives 80000 ÷ 100 = 800 nm. Now do yours."),
        S(`The mirror moves ${d} µm, but with light of wavelength ${l} nm. How many bright-to-dark-to-bright fringe cycles is that? (1 cycle = 1 fringe)`, "🔦", 2000 * d / l,
          "One fringe passes each time the path changes by one wavelength.", "The path change is 2d, divided by λ.", "Example: 5 µm and 500 nm gives 2000 × 5 ÷ 500 = 20. Now do yours.")
      ]);
    }),
    num("The velocity selector", [
      ["Crossed fields", "⚖️", "Put an electric field E and a magnetic field B at right angles. A charge moving straight feels <b>qE</b> one way and <b>qvB</b> the other way."],
      ["Balanced", "🧩", "It goes undeflected when the forces cancel: qE = qvB, so <b>v = E ÷ B</b>. Mass and charge cancel, so only particles with this speed get through."],
      ["Example", "🧮", "E = 5000 V/m and B = 0.05 T: v = 100 000 m/s."]
    ], () => {
      const [E, B] = combo([[200, 400, 600, 1000, 2000, 6000], [0.01, 0.02, 0.05, 0.1, 0.2]], (E, B) => E / B === Math.round(E / B));
      return pick([
        S(`A velocity selector has E = ${E} V/m and B = ${B} T. What speed passes through undeflected, in m/s?`, "⚖️", E / B,
          "The electric and magnetic forces must cancel.", "v = E ÷ B.", "Example: E = 900 V/m and B = 0.03 T gives 30 000 m/s. Now do yours."),
        S(`Particles of speed ${E / B} m/s pass undeflected through crossed fields with E = ${E} V/m. What is B, in tesla?`, "🧲", B,
          "Balance qE and qvB.", "B = E ÷ v.", "Example: E = 600 V/m and v = 3000 m/s gives B = 0.2 T. Now do yours."),
        S(`A magnetic field of ${B} T is used and particles of speed ${E / B} m/s must pass straight. What electric field is needed, in V/m?`, "⚡", E,
          "The electric force must match the magnetic force.", "E = v × B.", "Example: v = 4000 m/s and B = 0.5 T needs E = 2000 V/m. Now do yours."),
        S(`A velocity selector is set for E = ${E} V/m and B = ${B} T. An electron and a proton both enter at that selected speed. What speed, in m/s, does each leave with?`, "🧪", E / B,
          "The mass and charge cancel in the balance, so they do not matter.", "Both pass straight at the same selected speed.", "Example: for a selector set to 20 000 m/s, any ion at that speed leaves at 20 000 m/s. Now do yours.")
      ]);
    }),
    num("The Hall effect", [
      ["Sideways push", "🔌", "A current in a magnetic field gets pushed sideways, piling charge on one edge. This builds a transverse <b>Hall field E<sub>H</sub> = v<sub>d</sub> B</b> that cancels the magnetic push."],
      ["Hall voltage", "🧩", "Across a strip of width w: <b>V<sub>H</sub> = v<sub>d</sub> B w</b>. With v in m/s, B in T and w in mm the answer is in <b>mV</b>. The sign shows whether carriers are positive or negative."],
      ["Example", "🧮", "v = 100 m/s, B = 0.5 T, w = 2 mm: E<sub>H</sub> = 50 V/m and V<sub>H</sub> = 100 mV."]
    ], () => {
      const [v, B, w] = combo([[50, 100, 200, 250, 400], [0.1, 0.2, 0.5, 1, 2], [1, 2, 4, 5]], (v, B, w) => cl(v * B * w));
      return pick([
        S(`Carriers with drift speed ${v} m/s move in a field B = ${B} T. What Hall field builds up, in V/m?`, "🔌", v * B,
          "The Hall field balances the magnetic force on the carriers.", "E_H = v_d × B.", "Example: v = 80 m/s and B = 0.5 T gives 40 V/m. Now do yours."),
        S(`A strip ${w} mm wide has drift speed ${v} m/s in a field of ${B} T. What is the Hall voltage across it, in mV?`, "🔋", v * B * w,
          "Multiply the Hall field by the width of the strip.", "V_H = v B w; with w in mm the result is in mV.", "Example: v = 100 m/s, B = 1 T, w = 3 mm gives 300 mV. Now do yours."),
        S(`A Hall field of ${v * B} V/m is measured in a field of ${B} T. What is the carriers' drift speed, in m/s?`, "🏃", v,
          "Rearrange E_H = v_d B.", "v_d = E_H ÷ B.", "Example: E_H = 60 V/m and B = 0.3 T gives 200 m/s. Now do yours."),
        S(`A Hall voltage of ${v * B * w} mV appears across a strip ${w} mm wide in a field of ${B} T. What is the drift speed, in m/s?`, "📏", v,
          "Divide out the width and the field.", "v_d = V_H ÷ (B w), with V_H in mV and w in mm.", "Example: 300 mV, 3 mm and 1 T gives 100 m/s. Now do yours.")
      ]);
    }),
    num("Mutual inductance", [
      ["Coupled coils", "🔗", "A changing current in coil 1 changes the flux through coil 2. The link is the <b>mutual inductance M</b>: <b>M = N₂Φ₂₁ ÷ I₁</b>, in henries."],
      ["Induced emf", "🧩", "The emf in coil 2 is <b>ε₂ = M × (dI₁/dt)</b>. With M in mH and the current rate in A/s, ε comes out in <b>mV</b>. Transformers and wireless chargers use this."],
      ["Example", "🧮", "M = 5 mH and the current changes at 40 A/s: ε = 200 mV."]
    ], () => {
      const [M, r] = combo([[2, 4, 5, 8, 10, 25], [10, 20, 40, 50, 100]], (M, r) => cl(M * r));
      const [N, F, I] = combo([[50, 100, 200, 500], [1, 2, 4, 5], [1, 2, 4, 5]], (N, F, I) => cl(N * F / I));
      return pick([
        S(`Two coils have a mutual inductance of ${M} mH. The current in coil 1 changes at ${r} A/s. What emf is induced in coil 2, in mV?`, "🔗", M * r,
          "The induced emf is proportional to how fast the first current changes.", "ε = M × dI/dt; mH times A/s gives mV.", "Example: M = 8 mH and 25 A/s gives 200 mV. Now do yours."),
        S(`Coil 2 has ${N} turns and a flux of ${F} mWb passes through each turn when coil 1 carries ${I} A. What is M, in mH?`, "🧲", N * F / I,
          "Total flux linkage in coil 2 divided by the current in coil 1.", "M = N₂ Φ ÷ I₁; with Φ in mWb the result is in mH.", "Example: 100 turns, 3 mWb and 2 A gives 150 mH. Now do yours."),
        S(`A mutual inductance of ${M} mH induces ${M * r} mV. How fast was the current changing, in A/s?`, "⏱️", r,
          "Rearrange ε = M dI/dt.", "Rate = ε ÷ M, with ε in mV and M in mH.", "Example: 300 mV with M = 6 mH gives 50 A/s. Now do yours."),
        S(`The current in coil 1 changes at ${r} A/s and induces ${M * r} mV in coil 2. What is M, in mH?`, "🔌", M,
          "Divide the induced emf by the rate of change.", "M = ε ÷ (dI/dt).", "Example: 240 mV at 30 A/s gives 8 mH. Now do yours.")
      ]);
    }),
    num("LC oscillations", [
      ["Charge sloshing", "🔁", "A charged capacitor connected to an inductor swings its energy between the electric field (C) and the magnetic field (L), like a mass on a spring. The angular frequency is <b>ω = 1 ÷ √(LC)</b>."],
      ["Units", "🧩", "With L in mH and C in µF, LC = (L × C) × 10⁻⁹ s². So <b>ω = 1 ÷ √(L·C × 10⁻⁹)</b>. The peak current is <b>I₀ = ω Q₀</b>."],
      ["Example", "🧮", "L = 10 mH, C = 100 µF: LC = 1000 × 10⁻⁹ = 10⁻⁶, so ω = 1000 rad/s. With Q₀ = 3 µC, I₀ = 3 mA."]
    ], () => {
      const [L, C, w] = pick([[10, 100, 1000], [20, 50, 1000], [50, 20, 1000], [5, 50, 2000], [10, 25, 2000], [25, 10, 2000], [10, 16, 2500], [16, 10, 2500], [20, 8, 2500], [4, 10, 5000], [10, 4, 5000], [5, 8, 5000], [8, 5, 5000], [1, 10, 10000], [10, 1, 10000], [2, 5, 10000]]);
      const Q = pick([1, 2, 3, 4, 5, 6]);
      return pick([
        S(`An LC circuit has L = ${L} mH and C = ${C} µF. What is its angular frequency, in rad/s?`, "🔁", w,
          "The frequency depends on the product of L and C.", "ω = 1 ÷ √(LC); mH times µF gives 10⁻⁹ s².", "Example: L = 4 mH and C = 10 µF: LC = 40 × 10⁻⁹, ω = 5000 rad/s. Now do yours."),
        S(`An LC circuit oscillates at ${w} rad/s and has L = ${L} mH. What is C, in µF?`, "🔋", C,
          "Square the frequency relation: ω² = 1 ÷ (LC).", "C = 1 ÷ (ω² L); in these units C(µF) = 10⁹ ÷ (ω² × L(mH)).", "Example: ω = 5000 rad/s and L = 8 mH gives C = 10⁹ ÷ (25 000 000 × 8) = 5 µF. Now do yours."),
        S(`An LC circuit oscillates at ${w} rad/s and has C = ${C} µF. What is L, in mH?`, "🧲", L,
          "Use ω² = 1 ÷ (LC) and solve for L.", "L(mH) = 10⁹ ÷ (ω² × C(µF)).", "Example: ω = 2000 rad/s and C = 10 µF gives L = 10⁹ ÷ (4 000 000 × 10) = 25 mH. Now do yours."),
        S(`In an LC circuit with ω = ${w} rad/s, the capacitor starts with ${Q} µC. What is the peak current, in µA?`, "⚡", w * Q,
          "All the charge flows through the inductor over a quarter of a cycle.", "I₀ = ω Q₀; µC times rad/s gives µA.", "Example: ω = 2000 rad/s and Q₀ = 4 µC gives 8000 µA. Now do yours.")
      ]);
    }),
    num("Series RLC and impedance", [
      ["Reactances", "〰️", "In AC, an inductor has <b>X<sub>L</sub> = ωL</b> and a capacitor has <b>X<sub>C</sub> = 1 ÷ ωC</b>. They act in opposite directions: net reactance <b>X = X<sub>L</sub> − X<sub>C</sub></b>."],
      ["Impedance", "🧩", "<b>Z = √(R² + X²)</b> and <b>I<sub>rms</sub> = V<sub>rms</sub> ÷ Z</b>. At resonance X<sub>L</sub> = X<sub>C</sub>, so X = 0, Z = R and the current is largest."],
      ["Example", "🧮", "R = 30 Ω, X<sub>L</sub> = 70 Ω, X<sub>C</sub> = 30 Ω: X = 40 Ω, Z = 50 Ω. On 100 V, I = 2 A."]
    ], () => {
      const [R, X, Z] = pick([[30, 40, 50], [60, 80, 100], [50, 120, 130], [120, 50, 130], [80, 60, 100], [40, 30, 50], [90, 120, 150], [100, 240, 260]]);
      const XC = pick([20, 40, 50, 100]), XL = X + XC, k = pick([1, 2, 3, 4]);
      return pick([
        S(`A series circuit has R = ${R} Ω, X_L = ${XL} Ω and X_C = ${XC} Ω. What is the impedance Z, in ohms?`, "〰️", Z,
          "Find the net reactance first.", "Z = √(R² + (X_L − X_C)²).", "Example: R = 6 Ω, X_L = 14 Ω and X_C = 6 Ω: net 8 Ω, so Z = 10 Ω. Now do yours."),
        S(`A series circuit has Z = ${Z} Ω and is driven by ${Z * k} V rms. What rms current flows, in amps?`, "🔌", k,
          "This is Ohm's law with impedance.", "I = V ÷ Z.", "Example: 260 V across 130 Ω gives 2 A. Now do yours."),
        S(`A series circuit has R = ${R} Ω and is driven at resonance by ${R * k} V rms. What rms current flows, in amps?`, "🎯", k,
          "At resonance the reactances cancel.", "Then Z equals R only.", "Example: 90 V and R = 30 Ω at resonance gives 3 A. Now do yours."),
        S(`A series circuit has R = ${R} Ω, X_L = ${XL} Ω and Z = ${Z} Ω. What is X_C, in ohms?`, "🧩", XC,
          "Z and R give the net reactance through the right-triangle relation.", "X = √(Z² − R²), then X_C = X_L − X.", "Example: R = 6, Z = 10, X_L = 20 gives X = 8 and X_C = 12 Ω. Now do yours.")
      ]);
    }),
    num("Power factor", [
      ["Phase angle", "📐", "In an RLC circuit the voltage and current are out of step by a phase angle φ with <b>cos φ = R ÷ Z</b>. This cos φ is the <b>power factor</b>."],
      ["Average power", "🧩", "Only the resistor uses power: <b>P = V<sub>rms</sub> I<sub>rms</sub> cos φ = I<sub>rms</sub>² R</b>. The reactive parts store and return energy, so a poor power factor wastes cable capacity."],
      ["Example", "🧮", "R = 40 Ω, Z = 50 Ω: cos φ = 0.8. With 3 A rms, P = 9 × 40 = 360 W."]
    ], () => {
      const [R, Z] = pick([[30, 50], [40, 50], [60, 100], [80, 100], [12, 15], [24, 30]]);
      const I = pick([1, 2, 3, 4, 5]);
      return pick([
        S(`A circuit has R = ${R} Ω and impedance Z = ${Z} Ω. What is its power factor?`, "📐", R / Z,
          "The power factor is the cosine of the phase angle.", "cos φ = R ÷ Z.", "Example: R = 8 Ω and Z = 10 Ω gives 0.8. Now do yours."),
        S(`A circuit with R = ${R} Ω carries ${I} A rms. What average power does it use, in watts?`, "💡", I * I * R,
          "Only the resistance dissipates energy.", "P = I² R.", "Example: 3 A through R = 10 Ω gives 90 W. Now do yours."),
        S(`A circuit with Z = ${Z} Ω and R = ${R} Ω is run from ${Z * I} V rms. What average power is used, in watts?`, "🔌", Z * I * I * R / Z,
          "First find the current I = V ÷ Z, then use the power factor.", "P = V I cos φ with cos φ = R ÷ Z (or P = I² R).", "Example: Z = 10 Ω, R = 6 Ω, 30 V gives I = 3 A and P = 30 × 3 × 0.6 = 54 W. Now do yours."),
        S(`A circuit with R = ${R} Ω uses ${I * I * R} W. What rms current flows, in amps?`, "🔍", I,
          "Rearrange P = I² R.", "I = √(P ÷ R).", "Example: 90 W through 10 Ω gives I = 3 A. Now do yours.")
      ]);
    }),
    num("Radiation pressure", [
      ["Light pushes", "☀️", "Light carries momentum, so it pushes on surfaces. A perfectly absorbing surface feels <b>P = I ÷ c</b>; a perfect mirror reverses the light and feels twice that, <b>2I ÷ c</b>."],
      ["Numbers", "🧩", "With c = 3 × 10⁸ m/s, a beam of 300 W/m² gives P = 1 µPa. So <b>P(µPa) = I ÷ 300</b> for absorption. Force = pressure × area. Solar sails use this."],
      ["Example", "🧮", "I = 900 W/m² on a black surface: P = 3 µPa. On a mirror: 6 µPa."]
    ], () => {
      const I = pick([300, 600, 900, 1200, 1500, 3000]), A = pick([2, 5, 10, 100]);
      return pick([
        S(`Light of intensity ${I} W/m² is fully absorbed by a surface. What radiation pressure results, in µPa? (c = 3 × 10⁸ m/s)`, "☀️", I / 300,
          "An absorbed beam gives its momentum once.", "P = I ÷ c, which is I ÷ 300 in µPa.", "Example: 450 W/m² absorbed gives 1.5 µPa. Now do yours."),
        S(`Light of intensity ${I} W/m² reflects straight back from a perfect mirror. What radiation pressure results, in µPa?`, "🪞", 2 * I / 300,
          "Reversing the light's momentum doubles the push.", "P = 2I ÷ c, which is 2I ÷ 300 in µPa.", "Example: 450 W/m² on a mirror gives 3 µPa. Now do yours."),
        S(`A black sail of area ${A} m² absorbs light of intensity ${I} W/m². What force acts on it, in µN?`, "⛵", I / 300 * A,
          "First find the pressure, then multiply by the area.", "F = P × A with P = I ÷ c.", "Example: 600 W/m² on 4 m² gives 2 µPa × 4 = 8 µN. Now do yours."),
        S(`A perfectly absorbing surface feels a pressure of ${I / 300} µPa. What is the light's intensity, in W/m²?`, "🔦", I,
          "Rearrange P = I ÷ c.", "I = P × c, which is P(µPa) × 300 in W/m².", "Example: 5 µPa corresponds to 1500 W/m². Now do yours.")
      ]);
    }),
    les("Maxwell's equations", [
      ["Four laws", "📜", "<b>Gauss (electric):</b> charges make E-field lines. <b>Gauss (magnetic):</b> there are no isolated magnetic poles. <b>Faraday:</b> a changing B makes a circulating E. <b>Ampère–Maxwell:</b> currents and a changing E make a circulating B."],
      ["Maxwell's fix", "➕", "Maxwell added the <b>displacement current</b> (a changing E acts like a current). It makes the equations consistent for a charging capacitor and lets fields sustain each other."],
      ["Light is a wave", "🌈", "Together they give waves with speed <b>1 ÷ √(μ₀ε₀) ≈ 3 × 10⁸ m/s</b>, the speed of light. Light is an electromagnetic wave."]
    ], ["Ask which quantity is the cause and which is the effect.", "Match the idea to one of four laws: charge, no monopoles, changing B, or changing E and current.", "Example: the idea that a changing field of one kind creates a circulating field of the other kind is the heart of how waves form. Now match yours."], [
      ["Which law says magnetic field lines never start or end, so there are no magnetic monopoles?", "Gauss's law for magnetism", "Faraday's law", "Gauss's law for electric fields", "Ampère–Maxwell law"],
      ["A changing magnetic flux creates an electric field. Which law is this?", "Faraday's law", "Gauss's law for magnetism", "Gauss's law for electric fields", "Coulomb's law"],
      ["Which law says electric charges are the sources of electric field lines?", "Gauss's law for electric fields", "Faraday's law", "Gauss's law for magnetism", "Ampère–Maxwell law"],
      ["The term Maxwell added to Ampère's law is called the...", "Displacement current", "Eddy current", "Drift current"],
      ["Maxwell's added term made the law work for...", "A capacitor charging, with no wire between the plates", "A magnet falling through air", "A resting charge only"],
      ["A changing electric field can create a...", "Magnetic field", "Gravitational field", "Nuclear force"],
      ["Maxwell's equations predict waves with speed 1 ÷ √(μ₀ε₀). That is about...", "3 × 10⁸ m/s, the speed of light", "340 m/s, the speed of sound", "3 × 10⁶ m/s"],
      ["In an electromagnetic wave in vacuum, E and B are...", "At right angles to each other and to the direction of travel", "Parallel to each other", "Both along the direction of travel"]
    ]),
    num("Counting microstates", [
      ["Macro and micro", "🪙", "A <b>macrostate</b> is what you can measure (for example, 3 heads out of 6 coins). A <b>microstate</b> is one exact arrangement (which coins are heads). Statistical physics counts microstates."],
      ["Counting ways", "🧩", "For n coins there are <b>2ⁿ</b> microstates in total. The number giving exactly k heads is <b>Ω = n! ÷ (k!(n − k)!)</b>, written C(n, k). The middle macrostate has the most ways, so it is the most likely."],
      ["Example", "🧮", "4 coins, 2 heads: C(4, 2) = 4×3 ÷ 2 = 6 ways out of 16 total."]
    ], () => {
      const [n, k] = combo([[4, 5, 6, 7, 8, 10], [1, 2, 3, 4, 5]], (n, k) => k <= n);
      const m = pick([3, 4, 5, 6, 8, 10]);
      return pick([
        S(`${n} coins are tossed. In how many different ways can exactly ${k} of them be heads?`, "🪙", choose(n, k),
          "Count which coins are the heads; order does not matter.", "Use C(n, k) = n! ÷ (k!(n − k)!).", "Example: 5 coins with 2 heads: 5×4 ÷ 2 = 10 ways. Now do yours."),
        S(`How many microstates in total are there for ${m} coins, each heads or tails?`, "🔢", Math.pow(2, m),
          "Each coin has two choices, independently.", "Multiply 2 by itself once for each coin.", "Example: 3 coins have 2×2×2 = 8 microstates. Now do yours."),
        S(`${m} coins are tossed. How many macrostates (different numbers of heads, counting zero) are possible?`, "📊", m + 1,
          "Count the possible head totals, including none.", "The totals run from 0 up to the number of coins.", "Example: 4 coins can give 0, 1, 2, 3 or 4 heads, which is 5 macrostates. Now do yours."),
        S(`${n * 2} coins are tossed. How many different ways give exactly ${n} heads, the most likely macrostate? (n! ÷ (k!(n − k)!))`, "🎲", choose(n * 2, n),
          "The most likely outcome is half heads and half tails.", "Use C(2n, n).", "Example: 6 coins with 3 heads: 6×5×4 ÷ 6 = 20 ways. Now do yours.")
      ].filter(q => q.answer < 100000));
    }),
    num("Boltzmann's entropy", [
      ["Entropy counts", "🔥", "Boltzmann defined entropy by <b>S = k ln Ω</b>, where Ω is the number of microstates and k is Boltzmann's constant. More ways to arrange the system means more entropy."],
      ["Combining systems", "🧩", "For two independent systems, microstates <b>multiply</b> (Ω = Ω₁Ω₂) so entropies <b>add</b> (S = S₁ + S₂). Doubling the microstates adds <b>k ln 2</b>. Doubling the volume of a gas of N molecules multiplies Ω by 2ᴺ, so ΔS = N k ln 2."],
      ["Example", "🧮", "Ω₁ = 6 and Ω₂ = 5 gives Ω = 30. If Ω = e¹⁰, then S = 10 k."]
    ], () => {
      const [x, y] = combo([[2, 3, 4, 5, 6, 8], [2, 3, 4, 5, 7, 9]], () => true);
      const s1 = pick([2, 3, 4, 5, 6]), s2 = pick([1, 2, 3, 7, 8]), m = pick([2, 3, 4, 5, 6, 10]), e = pick([5, 8, 10, 12, 20]);
      return pick([
        S(`Two independent systems have ${x} and ${y} microstates. How many microstates does the combined system have?`, "✖️", x * y,
          "Independent choices combine by multiplying.", "Ω = Ω₁ × Ω₂.", "Example: 4 and 6 microstates give 24. Now do yours."),
        S(`One system has entropy ${s1} k and another has ${s2} k. What is the total entropy, in units of k?`, "➕", s1 + s2,
          "Logarithms turn products into sums.", "S = S₁ + S₂ for independent systems.", "Example: 4 k and 9 k give 13 k. Now do yours."),
        S(`The number of microstates of a gas is multiplied by 2^${m} when its volume is changed. By how many multiples of k ln 2 does its entropy rise?`, "📈", m,
          "Use S = k ln Ω, so ΔS = k ln(multiplying factor).", "ln(2ᵐ) = m ln 2.", "Example: a factor of 2⁷ raises S by 7 k ln 2. Now do yours."),
        S(`A system has Ω = e^${e} microstates. What is its entropy, in units of k?`, "🔥", e,
          "S = k ln Ω.", "ln(eˣ) = x.", "Example: Ω = e⁶ gives S = 6 k. Now do yours.")
      ]);
    }),
    num("Heat capacity of solids", [
      ["Atoms as springs", "🧱", "In a solid each atom vibrates in 3 directions. Each direction holds kinetic and potential energy (½kT each), so each atom has about 3kT of energy. This gives the <b>Dulong–Petit law</b>: molar heat capacity <b>C ≈ 3R ≈ 25 J/(mol·K)</b>."],
      ["Where it fails", "🧩", "At low temperatures vibrations freeze out (a quantum effect explained by Einstein and Debye) and the heat capacity falls toward zero. For most metals the law works well near room temperature."],
      ["Example", "🧮", "Warm 2 mol of a metal by 10 K: Q = n C ΔT = 2 × 25 × 10 = 500 J."]
    ], () => {
      const n = pick([1, 2, 3, 4, 5]), dT = pick([5, 10, 20, 40]);
      const Q = n * 25 * dT;
      return pick([
        S(`Using the Dulong–Petit value of 25 J/(mol·K), how much heat warms ${n} mol of a solid by ${dT} K, in joules?`, "🔥", Q,
          "Heat equals moles times molar heat capacity times the temperature change.", "Q = n C ΔT.", "Example: 3 mol warmed by 8 K needs 3 × 25 × 8 = 600 J. Now do yours."),
        S(`${n} mol of a solid absorbs ${Q} J of heat. By how many kelvin does its temperature rise? (C = 25 J/(mol·K))`, "🌡️", dT,
          "Rearrange Q = n C ΔT.", "ΔT = Q ÷ (n C).", "Example: 600 J into 3 mol gives ΔT = 600 ÷ 75 = 8 K. Now do yours."),
        S(`A solid takes ${Q} J to warm by ${dT} K. How many moles does it contain? (C = 25 J/(mol·K))`, "⚗️", n,
          "Rearrange Q = n C ΔT for n.", "n = Q ÷ (C ΔT).", "Example: 600 J and 8 K gives n = 600 ÷ 200 = 3 mol. Now do yours."),
        S(`The Dulong–Petit value is C = 3R. Using R = 8.3 J/(mol·K), what is 3R, in J/(mol·K)?`, "🧱", 24.9,
          "Each atom has three vibration directions.", "Multiply the gas constant by the number of directions.", "Example: with R = 8.0 the same rule would give 24.0. Now do yours.")
      ]);
    }),
    num("Speeds of gas molecules", [
      ["Root-mean-square speed", "💨", "Molecules in a gas have a spread of speeds. The typical (rms) speed is <b>v = √(3kT ÷ m)</b>. So <b>v ∝ √(T ÷ M)</b>: hotter means faster, heavier means slower."],
      ["Using ratios", "🧩", "At the same temperature the ratio of speeds is <b>v₁ ÷ v₂ = √(M₂ ÷ M₁)</b>. Quadruple T and the speed doubles. Light gases like hydrogen escape from planets more easily."],
      ["Example", "🧮", "Hydrogen (M = 2) and oxygen (M = 32) at the same T: v ratio = √16 = 4, so hydrogen is 4 times faster."]
    ], () => {
      const [M1, M2, g1, g2] = pick([[2, 32, "hydrogen H₂", "oxygen O₂"], [2, 18, "hydrogen H₂", "water vapour H₂O"], [4, 16, "helium", "methane"], [2, 8, "hydrogen H₂", "a gas with M = 8"], [1, 4, "a gas with M = 1", "helium"]]);
      const v0 = pick([300, 400, 500, 600]), f = pick([2, 3, 4]), T0 = pick([100, 200, 300]);
      return pick([
        S(`At the same temperature, how many times faster is the rms speed of ${g1} (M = ${M1}) than ${g2} (M = ${M2})?`, "💨", Math.sqrt(M2 / M1),
          "Lighter molecules move faster at the same temperature.", "The speed ratio is the square root of the inverse mass ratio.", "Example: M = 1 versus M = 9 gives √9 = 3 times faster. Now do yours."),
        S(`A gas has rms speed ${v0} m/s. Its absolute temperature is multiplied by ${f * f}. What is the new rms speed, in m/s?`, "🔥", v0 * f,
          "Speed scales with the square root of temperature.", "Take the square root of the temperature factor.", "Example: T × 9 triples the speed, so 100 m/s becomes 300 m/s. Now do yours."),
        S(`A gas has rms speed ${v0} m/s at ${T0} K. At what temperature, in kelvin, is its rms speed ${v0 * f} m/s?`, "🌡️", T0 * f * f,
          "Speed squared is proportional to temperature.", "T scales as the square of the speed factor.", "Example: doubling the speed from 100 K needs 400 K. Now do yours."),
        S(`A gas has rms speed ${v0} m/s. Its temperature is divided by ${f * f}. What is the new rms speed, in m/s?`, "❄️", v0 / f,
          "A cooler gas has slower molecules, by a square-root rule.", "Divide the speed by the square root of the temperature factor.", "Example: T ÷ 4 halves the speed, so 600 m/s becomes 300 m/s. Now do yours.")
      ].filter(q => q.answer > 0));
    })
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])),
    mix("Level 28 Challenge", at(a, [1, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 29 =================
  const b = [
    num("Electron wavelength from voltage", [
      ["Accelerated electrons", "🔬", "An electron accelerated through a voltage V gains kinetic energy eV. Its de Broglie wavelength is <b>λ = h ÷ p</b>. For slow electrons this simplifies to <b>λ(nm) = 1.226 ÷ √V</b> (V in volts)."],
      ["Why it matters", "🧩", "More voltage means a shorter wavelength, so an electron microscope can see far finer detail than light (~500 nm). Quadruple V and λ halves."],
      ["Example", "🧮", "V = 9 V would give 1.226 ÷ 3 ≈ 0.409 nm. With V = 100 V, λ = 0.1226 nm, about the spacing between atoms in a crystal."]
    ], () => {
      const V = pick([1, 4, 16, 25, 100, 400]);
      const [l0, f] = combo([[0.8, 0.6, 0.4, 1.0, 1.2, 0.2], [2, 3, 4, 5]], (l, f) => cl(l / f));
      return pick([
        S(`An electron is accelerated from rest through ${V} V. What is its wavelength, in nm? (λ = 1.226 ÷ √V)`, "🔬", 1.226 / Math.sqrt(V),
          "Take the square root of the voltage first.", "Divide 1.226 by that square root.", "Example: V = 36 V gives 1.226 ÷ 6 ≈ 0.2043 nm. Now do yours."),
        S(`An electron has wavelength ${r2(1.226 / Math.sqrt(V))} nm. Through what voltage was it accelerated, in volts?`, "⚡", V,
          "Rearrange λ = 1.226 ÷ √V.", "√V = 1.226 ÷ λ, then square.", "Example: λ = 0.1226 nm gives √V = 10, so V = 100 V. Now do yours."),
        S(`An electron beam has wavelength ${l0} nm. The accelerating voltage is multiplied by ${f * f}. What is the new wavelength, in nm?`, "⬆️", l0 / f,
          "λ is inversely proportional to the square root of V.", "Divide the wavelength by the square root of the voltage factor.", "Example: λ = 0.8 nm and V × 4 gives 0.4 nm. Now do yours.")
      ]);
    }),
    num("The uncertainty principle", [
      ["Limits of knowing", "❓", "<b>Δx · Δp ≥ ħ/2</b>. The more tightly a particle is confined, the less precisely its momentum can be known. This is not a failure of instruments; it is how waves work."],
      ["Handy form", "🧩", "Using ħc ≈ 200 eV·nm: <b>Δp·c ≥ 100 eV·nm ÷ Δx</b> (Δx in nm gives pc in eV). For a nucleus use ħc ≈ 200 MeV·fm."],
      ["Example", "🧮", "An electron confined to Δx = 0.5 nm has Δpc ≥ 100 ÷ 0.5 = 200 eV."]
    ], () => {
      const x = pick([0.05, 0.1, 0.2, 0.5, 1, 2, 4, 10]), k = pick([2, 4, 5, 10]), xf = pick([1, 2, 4, 5, 10]);
      return pick([
        S(`An electron is confined within Δx = ${x} nm. What is the smallest possible uncertainty in its momentum, written as Δp·c in eV? (Δp·c ≥ 100 ÷ Δx)`, "❓", 100 / x,
          "Tighter confinement forces a larger momentum uncertainty.", "Divide 100 eV·nm by the width in nm.", "Example: Δx = 0.4 nm gives 250 eV. Now do yours."),
        S(`A particle's momentum is known to within Δp·c = ${100 / x} eV. What is the smallest possible position uncertainty, in nm?`, "📍", x,
          "Rearrange Δx Δp ≥ ħ/2 for Δx.", "Δx = 100 eV·nm ÷ Δpc.", "Example: Δpc = 250 eV gives Δx = 0.4 nm. Now do yours."),
        S(`The position uncertainty of a particle is squeezed from ${x * k} nm to ${x} nm. By what factor does its minimum momentum uncertainty grow?`, "🗜️", k,
          "Position and momentum uncertainty trade off.", "Δp is inversely proportional to Δx.", "Example: squeezing from 6 nm to 2 nm raises Δp by a factor of 3. Now do yours."),
        S(`A proton is confined in a nucleus of width Δx = ${xf} fm. What is the smallest Δp·c, in MeV? (ħc = 200 MeV·fm, so Δpc ≥ 100 ÷ Δx)`, "⚛️", 100 / xf,
          "Use the same relation with femtometres and MeV.", "Δpc = 100 MeV·fm ÷ Δx.", "Example: Δx = 8 fm gives 12.5 MeV. Now do yours.")
      ]);
    }),
    num("A particle in a box", [
      ["Standing waves", "📦", "A particle trapped between walls can only have wavelengths that fit: λ = 2L ÷ n. This gives energies <b>Eₙ = n² E₁</b> with n = 1, 2, 3… The lowest energy E₁ is not zero (zero-point energy)."],
      ["Width matters", "🧩", "<b>E₁ = h² ÷ (8mL²)</b>, so a box twice as wide has E₁ ÷ 4. For an electron, E₁ = 0.376 ÷ L² eV (L in nm). Jumping from level i to level f releases or needs ΔE = (n_f² − n_i²) E₁."],
      ["Example", "🧮", "E₁ = 2 eV: E₃ = 9 × 2 = 18 eV. Jump 3 → 2 releases 9 × 2 − 4 × 2 = 10 eV."]
    ], () => {
      const E1 = pick([0.4, 0.5, 1, 2, 3, 1.5]), n = pick([2, 3, 4, 5]);
      const [hi, lo] = combo([[2, 3, 4, 5], [1, 2, 3]], (h, l) => h > l);
      const f = pick([2, 3, 4]);
      return pick([
        S(`A particle in a box has ground-state energy E₁ = ${E1} eV. What is the energy of level n = ${n}, in eV?`, "📦", n * n * E1,
          "Energy levels grow as the square of the quantum number.", "Eₙ = n² E₁.", "Example: E₁ = 2 eV, n = 5 gives 25 × 2 = 50 eV. Now do yours."),
        S(`A particle in a box has E₁ = ${E1} eV. How much energy does it release in a jump from n = ${hi} to n = ${lo}, in eV?`, "⬇️", (hi * hi - lo * lo) * E1,
          "Subtract the two level energies.", "ΔE = (n_i² − n_f²) E₁.", "Example: E₁ = 1 eV, jump 4 → 2 releases 16 − 4 = 12 eV. Now do yours."),
        S(`A particle in a box has an energy of ${n * n * E1} eV in level n = ${n}. What is its ground-state energy E₁, in eV?`, "🔻", E1,
          "Divide the energy by the square of the quantum number.", "E₁ = Eₙ ÷ n².", "Example: 72 eV in n = 6 gives 2 eV. Now do yours."),
        S(`A box has ground-state energy ${E1 * f * f} eV. It is made ${f} times wider. What is the new ground-state energy, in eV?`, "↔️", E1,
          "E₁ depends on 1 ÷ L².", "Divide by the square of the width factor.", "Example: 36 eV in a box made 3 times wider becomes 4 eV. Now do yours.")
      ]);
    }),
    num("Photons from transitions", [
      ["Energy to light", "🌈", "When an atom or a particle in a box drops from a higher to a lower energy level, it can emit a photon with energy equal to the gap: <b>ΔE = hf = 1240 ÷ λ</b> (ΔE in eV, λ in nm)."],
      ["Reading a spectrum", "🧩", "Bigger gaps give bluer light (shorter λ); smaller gaps give redder light. Each substance has its own line pattern, which is how we identify atoms in stars."],
      ["Example", "🧮", "A 2.48 eV gap gives λ = 1240 ÷ 2.48 = 500 nm (green)."]
    ], () => {
      const [dE, lam] = pick([[1.24, 1000], [1.55, 800], [2, 620], [2.48, 500], [3.1, 400], [4, 310], [6.2, 200]]);
      const [ni, nf, E1, l2] = pick([[3, 2, 0.62, 400], [3, 1, 0.31, 500], [3, 2, 0.248, 1000]]);
      return pick([
        S(`A transition releases a photon with energy ${dE} eV. What is its wavelength, in nm? (λ = 1240 ÷ E)`, "🌈", lam,
          "Shorter wavelength means more energetic light.", "Divide 1240 by the energy in eV.", "Example: 3.1 eV gives 1240 ÷ 3.1 = 400 nm. Now do yours."),
        S(`A photon has wavelength ${lam} nm. What is its energy, in eV? (E = 1240 ÷ λ)`, "💡", dE,
          "Use the inverse relation between energy and wavelength.", "Divide 1240 by the wavelength in nm.", "Example: 620 nm gives 2 eV. Now do yours."),
        S(`A particle in a box with E₁ = ${E1} eV drops from n = ${ni} to n = ${nf}. What wavelength does it emit, in nm? (λ = 1240 ÷ ΔE)`, "📦", l2,
          "First find the energy gap using n² times E₁ for each level.", "ΔE = (n_i² − n_f²) E₁; then λ = 1240 ÷ ΔE.", "Example: E₁ = 0.31 eV, jump 2 → 1 gives ΔE = 0.93 eV, so λ = 1240 ÷ 0.93 ≈ 1333 nm. Now do yours.")
      ]);
    }),
    num("Bohr radius and speed", [
      ["Bohr's orbits", "⚛️", "In the Bohr model the electron in hydrogen has allowed orbits with radius <b>rₙ = n² a₀</b>, where <b>a₀ = 0.053 nm</b>. The orbit speed is <b>vₙ = 2.2 × 10⁶ ÷ n m/s</b>."],
      ["Pattern", "🧩", "Radius grows as n²: level 2 is 4 times larger than level 1, level 3 is 9 times. Speed drops as 1/n. (Modern quantum mechanics replaces orbits by probability clouds, but the size scale is the same.)"],
      ["Example", "🧮", "n = 3: r = 9 × 0.053 = 0.477 nm. v = 2.2 × 10⁶ ÷ 3 ≈ 0.73 × 10⁶ m/s."]
    ], () => {
      const n = pick([2, 3, 4, 5, 6]), n2 = pick([2, 4, 5, 10]), k = pick([2, 3, 4, 5]);
      return pick([
        S(`What is the Bohr radius of the n = ${n} orbit in hydrogen, in nm? (a₀ = 0.053 nm)`, "⚛️", n * n * 0.053,
          "The radius grows with the square of the level number.", "rₙ = n² a₀.", "Example: n = 7 gives 49 × 0.053 = 2.597 nm. Now do yours."),
        S(`An electron in hydrogen is in an orbit of radius ${r2(n * n * 0.053)} nm. Which level n is it in? (a₀ = 0.053 nm)`, "🔎", n,
          "Divide by the smallest radius to get n².", "n² = r ÷ 0.053; then take the square root.", "Example: r = 1.325 nm gives n² = 25, so n = 5. Now do yours."),
        S(`What is the electron's speed in the n = ${n2} orbit of hydrogen, in units of 10⁶ m/s? (v₁ = 2.2 × 10⁶ m/s)`, "🏃", 2.2 / n2,
          "Speed falls as the level number rises.", "vₙ = v₁ ÷ n.", "Example: n = 8 gives 2.2 ÷ 8 = 0.275. Now do yours."),
        S(`How many times larger is the radius of the n = ${k} orbit than the n = 1 orbit?`, "📏", k * k,
          "Compare rₙ with r₁ directly; a₀ cancels.", "The ratio is n² ÷ 1.", "Example: for n = 6 the ratio is 36. Now do yours.")
      ]);
    }),
    num("Hydrogen-like ions", [
      ["One electron, more charge", "🔆", "An ion with one electron and nuclear charge Z (He⁺ has Z = 2, Li²⁺ has Z = 3) has <b>Eₙ = −13.6 Z² ÷ n² eV</b>. A stronger pull means a deeper, more tightly bound electron."],
      ["Ionisation and sizes", "🧩", "Ionisation energy from level n: <b>13.6 Z² ÷ n²</b>. Orbits shrink: <b>rₙ = n² a₀ ÷ Z</b>. A transition 2 → 1 releases <b>10.2 Z² eV</b>."],
      ["Example", "🧮", "Be³⁺ (Z = 4), n = 2: binding energy = 13.6 × 16 ÷ 4 = 54.4 eV."]
    ], () => {
      const [Z, n] = combo([[2, 3, 4], [1, 2, 3]], (z, n) => cl(13.6 * z * z / (n * n)));
      const [Z2, m] = combo([[2, 3, 4], [2, 3, 4, 5]], (z, m) => cl(m * m / z));
      return pick([
        S(`How much energy, in eV, is needed to remove the electron from level n = ${n} of a hydrogen-like ion with Z = ${Z}? (use 13.6 eV)`, "🔆", 13.6 * Z * Z / (n * n),
          "Binding energy grows with the nuclear charge squared.", "E = 13.6 Z² ÷ n².", "Example: Z = 5, n = 2 gives 13.6 × 25 ÷ 4 = 85 eV. Now do yours."),
        S(`A hydrogen-like ion with Z = ${Z} drops from n = 2 to n = 1. How much energy does the photon carry, in eV? (use 10.2 eV for hydrogen)`, "💥", 10.2 * Z * Z,
          "Scale the hydrogen transition energy by the charge.", "ΔE = 10.2 Z² eV.", "Example: Z = 5 gives 10.2 × 25 = 255 eV. Now do yours."),
        S(`The ground state of a hydrogen-like ion has binding energy ${r2(13.6 * Z * Z)} eV. What is Z?`, "🔢", Z,
          "Divide by the hydrogen value to get a square.", "Z² = E ÷ 13.6.", "Example: 122.4 eV gives Z² = 9, so Z = 3. Now do yours."),
        S(`What is the orbit radius of the n = ${m} level in an ion with Z = ${Z2}, in units of a₀?`, "📏", m * m / Z2,
          "The radius scales as n² but shrinks with Z.", "r = n² a₀ ÷ Z.", "Example: n = 4 and Z = 2 gives 16 ÷ 2 = 8 a₀. Now do yours.")
      ]);
    }),
    num("Quantum numbers and shells", [
      ["The labels", "🏷️", "An electron state has <b>n</b> (shell, 1, 2, 3…), <b>l</b> (subshell, 0 to n − 1, called s, p, d, f), <b>mₗ</b> (from −l to +l) and spin <b>mₛ = ±½</b>."],
      ["Counting", "🧩", "A subshell with l has <b>2l + 1</b> orbitals and holds <b>2(2l + 1)</b> electrons: s = 2, p = 6, d = 10, f = 14. Shell n has n subshells and holds <b>2n²</b> electrons."],
      ["Example", "🧮", "n = 3: l = 0, 1, 2 (3 subshells); capacity 2 × 9 = 18 electrons."]
    ], () => {
      const [letter, l] = pick([["p", 1], ["d", 2], ["f", 3], ["s", 0]]);
      const n = pick([1, 2, 3, 4, 5]), m = pick([1, 2, 3, 4]);
      return pick([
        S(`How many orbitals are in a ${letter} subshell (l = ${l})?`, "🏷️", 2 * l + 1,
          "Count the allowed values of mₗ from −l to +l.", "There are 2l + 1 of them.", "Example: l = 4 would have 9 orbitals. Now do yours."),
        S(`How many electrons can a ${letter} subshell (l = ${l}) hold?`, "🔢", 2 * (2 * l + 1),
          "Each orbital holds two electrons of opposite spin.", "Capacity = 2 × (number of orbitals).", "Example: a subshell with 9 orbitals holds 18 electrons. Now do yours."),
        S(`What is the maximum number of electrons in shell n = ${n}?`, "🧅", 2 * n * n,
          "Add up the capacities of all subshells in the shell.", "The total is 2 times n squared.", "Example: n = 6 would hold 72. Now do yours."),
        S(`How many different subshells (values of l) does shell n = ${n + 1} contain?`, "📚", n + 1,
          "l runs from 0 up to one less than n.", "The count equals n.", "Example: n = 7 has 7 subshells. Now do yours."),
        S(`What is the largest value of l allowed when n = ${n + m}?`, "⬆️", n + m - 1,
          "l is always smaller than n.", "l_max = n − 1.", "Example: n = 9 allows l up to 8. Now do yours.")
      ]);
    }),
    les("Electron configurations", [
      ["Filling order", "🧱", "Electrons fill the lowest available orbitals: 1s, 2s, 2p, 3s, 3p, 4s, 3d… The <b>Pauli exclusion principle</b> says no two electrons in an atom can share all four quantum numbers, so each orbital holds at most 2."],
      ["Hund's rule", "🧩", "In a subshell with several orbitals (like 2p) electrons spread out one per orbital with parallel spins before pairing up. The outermost electrons (<b>valence</b>) decide chemistry."],
      ["Example", "🧮", "Carbon (6 electrons): 1s² 2s² 2p². Argon (18): 1s² 2s² 2p⁶ 3s² 3p⁶, a full outer shell."]
    ], ["Count electrons and fill orbitals in order: s holds 2, p holds 6.", "The number of electrons equals the atomic number for a neutral atom.", "Example: 1s² 2s¹ adds up to 3 electrons, which is lithium. Now work out yours."], [
      ["Which neutral element has the configuration 1s² 2s² 2p⁶ 3s¹?", "Sodium", "Neon", "Magnesium", "Lithium"],
      ["Which element has the configuration 1s² 2s² 2p⁶ 3s² 3p⁶?", "Argon", "Neon", "Chlorine", "Potassium"],
      ["Oxygen has configuration 1s² 2s² 2p⁴. How many valence electrons (outer shell) does it have?", "6", "4", "8"],
      ["The Pauli exclusion principle says that...", "No two electrons in an atom share all four quantum numbers", "Electrons attract each other", "All electrons have the same energy"],
      ["The element with configuration 1s² 2s² 2p⁶ is...", "Neon", "Oxygen", "Sodium", "Helium"],
      ["How many electrons can fill the 2p subshell?", "6", "2", "10", "14"],
      ["Hund's rule says electrons in a subshell...", "Spread over separate orbitals with parallel spins before pairing", "Pair up in the first orbital", "Always have opposite spins"],
      ["Which element has the configuration 1s² 2s² 2p⁶ 3s² 3p⁵?", "Chlorine", "Fluorine", "Sulphur", "Argon"]
    ]),
    num("X-ray tubes", [
      ["Stopping electrons", "🩻", "Fast electrons slammed into a metal target give out X-rays. An electron accelerated through V can give at most one photon with all its energy eV. This sets the shortest wavelength: <b>λmin = 1240 ÷ V</b> in pm when V is in kV."],
      ["Reading it", "🧩", "More voltage means a shorter minimum wavelength and a harder (more penetrating) X-ray. Maximum photon energy in keV equals the tube voltage in kV."],
      ["Example", "🧮", "A 50 kV tube: λmin = 1240 ÷ 50 = 24.8 pm, and the biggest photon energy is 50 keV."]
    ], () => {
      const V = pick([20, 31, 40, 50, 62, 124, 25, 100]);
      return pick([
        S(`An X-ray tube runs at ${V} kV. What is the shortest wavelength produced, in pm? (λmin = 1240 ÷ V)`, "🩻", 1240 / V,
          "The most energetic photon uses all the electron's energy.", "Divide 1240 by the voltage in kV to get picometres.", "Example: 80 kV gives 15.5 pm. Now do yours."),
        S(`The shortest X-ray wavelength from a tube is ${r2(1240 / V)} pm. What is the tube voltage, in kV?`, "⚡", V,
          "Rearrange λmin = 1240 ÷ V.", "V = 1240 ÷ λmin.", "Example: λmin = 31 pm gives 40 kV. Now do yours."),
        S(`An X-ray tube runs at ${V} kV. What is the largest photon energy it can produce, in keV?`, "💥", V,
          "One electron can give one photon at most its own energy.", "keV equals the voltage in kV.", "Example: a 70 kV tube has a maximum photon energy of 70 keV. Now do yours."),
        S(`The voltage on an X-ray tube is doubled from ${V} kV. By what factor does the shortest wavelength change? (Give the multiplying factor as a decimal.)`, "✖️", 0.5,
          "A higher voltage makes shorter wavelengths.", "λmin is inversely proportional to V.", "Example: tripling the voltage multiplies λmin by about 0.33. Now do yours.")
      ].filter(q => cl(q.answer)));
    }),
    num("Compton scattering", [
      ["Light as particles", "🎱", "When an X-ray photon collides with an electron it loses energy and its wavelength grows. The shift is <b>Δλ = λc (1 − cos θ)</b>, where θ is the scattering angle and the Compton wavelength is <b>λc = 2.43 pm</b>."],
      ["Special angles", "🧩", "θ = 0°: no shift. θ = 90°: Δλ = 2.43 pm. θ = 180° (straight back): the biggest shift, <b>2λc = 4.86 pm</b>. The shift does not depend on the original wavelength."],
      ["Example", "🧮", "θ = 60°: cos 60° = 0.5, so Δλ = 2.43 × 0.5 = 1.215 pm."]
    ], () => {
      const th2 = pick([60, 90, 120, 180]), c2 = { 60: 0.5, 90: 0, 120: -0.5, 180: -1 }[th2], l0 = pick([10, 20, 50, 100]);
      return pick([
        S(`An X-ray photon scatters through ${th2}° from a free electron. What is the shift in wavelength, in pm? (λc = 2.43 pm)`, "🎱", 2.43 * (1 - c2),
          "Use the Compton formula with the cosine of the angle.", "Δλ = 2.43 × (1 − cos θ).", "Example: 60° gives 2.43 × 0.5 = 1.215 pm. Now do yours."),
        S(`An X-ray of wavelength ${l0} pm scatters through ${th2}° from an electron. What is the scattered wavelength, in pm? (λc = 2.43 pm)`, "📡", l0 + 2.43 * (1 - c2),
          "The scattered wavelength is longer than the original.", "λ' = λ + λc (1 − cos θ).", "Example: 30 pm at 60° gives 30 + 1.215 = 31.215 pm. Now do yours."),
        S(`What is the largest possible Compton shift, in pm? (λc = 2.43 pm)`, "↩️", 4.86,
          "The photon loses the most energy when it bounces straight back.", "Use cos θ = −1.", "Example: at 180° the factor (1 − cos θ) equals 2. Now do yours."),
        S(`An X-ray photon scatters through ${th2}°. By how many pm does its wavelength change if its original wavelength is ${l0} pm and λc = 2.43 pm?`, "🧮", 2.43 * (1 - c2),
          "The shift does not depend on the original wavelength.", "Δλ = λc (1 − cos θ).", "Example: any wavelength scattered through 60° shifts by 1.215 pm. Now do yours.")
      ]);
    }),
    les("Quantum tunnelling", [
      ["Through the wall", "🚪", "A classical ball cannot cross a hill taller than its energy. A quantum particle's wave function does not stop dead at a barrier; it decays inside it. If the barrier is thin, some of the wave reaches the other side: <b>tunnelling</b>."],
      ["What controls it", "🧩", "The chance falls <b>exponentially</b> with barrier width and with the square root of the barrier height, and it is bigger for light particles like electrons than for heavy ones. T ≈ e^(−2κL)."],
      ["Where it matters", "🌞", "Tunnelling powers nuclear fusion in the Sun, scanning tunnelling microscopes (which image single atoms) and some radioactive decays."]
    ], ["Think about what happens to a matter wave at a barrier.", "The probability depends strongly on the barrier width and on the mass of the particle.", "Example: making a barrier a little thicker cuts the tunnelling chance by a large factor. Now apply that to yours."], [
      ["Quantum tunnelling means a particle can...", "Pass through a barrier it classically could not climb", "Travel faster than light", "Lose all its mass"],
      ["If a barrier is made thicker, the tunnelling probability...", "Falls very quickly (exponentially)", "Rises", "Stays exactly the same"],
      ["A scanning tunnelling microscope works because the tunnelling current depends on...", "The tiny gap between the tip and the surface", "The colour of the sample", "The sample's weight"],
      ["Which particle tunnels more easily through the same barrier at the same energy?", "An electron", "A proton", "A bowling ball"],
      ["Which process in the Sun depends on tunnelling?", "Nuclear fusion", "Photosynthesis", "Sunspots only"],
      ["Inside a barrier the wave function...", "Decays exponentially", "Grows without limit", "Is exactly zero"],
      ["A larger barrier height makes tunnelling...", "Less likely", "More likely", "No different"]
    ]),
    num("Radioactive activity", [
      ["Decay rate", "☢️", "The <b>activity</b> A is the number of decays per second (becquerels, Bq). It is proportional to the number of nuclei N: <b>A = λN = N ÷ τ</b>, where τ is the mean lifetime."],
      ["Lifetime and half-life", "🧩", "<b>τ = T½ ÷ 0.693</b>, so <b>T½ = 0.693 τ</b>. Half-life is a bit shorter than the mean lifetime. A big sample or a short lifetime means a high activity."],
      ["Example", "🧮", "N = 6000 nuclei with τ = 20 s: A = 300 Bq. T½ = 0.693 × 20 = 13.86 s."]
    ], () => {
      const [N, tau] = combo([[2000, 6000, 8000, 12000, 20000, 50000], [10, 20, 40, 50, 100]], (N, t) => N % t === 0);
      return pick([
        S(`A sample has ${N} radioactive nuclei with a mean lifetime of ${tau} s. What is its activity, in Bq?`, "☢️", N / tau,
          "Activity is the number of nuclei divided by something with units of time.", "A = N ÷ τ.", "Example: 9000 nuclei and τ = 30 s gives 300 Bq. Now do yours."),
        S(`A sample has an activity of ${N / tau} Bq and a mean lifetime of ${tau} s. How many radioactive nuclei does it contain?`, "🔢", N,
          "Rearrange A = N ÷ τ.", "N = A × τ.", "Example: 300 Bq and τ = 30 s means N = 9000. Now do yours."),
        S(`A sample has ${N} nuclei and an activity of ${N / tau} Bq. What is its mean lifetime, in seconds?`, "⏳", tau,
          "Rearrange A = N ÷ τ for τ.", "τ = N ÷ A.", "Example: 9000 nuclei and 300 Bq gives τ = 30 s. Now do yours."),
        S(`A nucleus has a mean lifetime of ${tau} s. What is its half-life, in seconds? (T½ = 0.693 τ)`, "⏱️", 0.693 * tau,
          "Half-life is slightly shorter than the mean lifetime.", "Multiply the mean lifetime by 0.693.", "Example: τ = 30 s gives T½ ≈ 20.79 s. Now do yours.")
      ]);
    }),
    num("Energy released in nuclear reactions", [
      ["Mass becomes energy", "🌟", "In a reaction, the products can have a bit less mass than the reactants. The missing mass Δm appears as energy: <b>Q = Δm c²</b>. With masses in atomic mass units, <b>1 u ≙ 931.5 MeV</b>."],
      ["Fission and fusion", "🧩", "Fission of uranium releases about 200 MeV per nucleus (Δm ≈ 0.2 u). Fusion of light nuclei releases a smaller amount per reaction but more per kilogram. Chemical reactions release only a few eV."],
      ["Example", "🧮", "Δm = 0.02 u gives Q = 0.02 × 931.5 = 18.63 MeV."]
    ], () => {
      const dm = pick([0.005, 0.01, 0.02, 0.03, 0.05, 0.1, 0.2]);
      const Rm = pick([5.0301, 4.0262, 5.0124]), dd = pick([0.0050, 0.0120, 0.0190, 0.0210]);
      return pick([
        S(`A reaction loses ${dm} u of mass. How much energy is released, in MeV? (1 u = 931.5 MeV)`, "🌟", dm * 931.5,
          "Multiply the lost mass by an energy conversion factor.", "Q = Δm × 931.5 MeV per u.", "Example: 0.04 u gives 37.26 MeV. Now do yours."),
        S(`A reaction releases ${r2(dm * 931.5)} MeV. How much mass is lost, in u? (1 u = 931.5 MeV)`, "⚖️", dm,
          "Divide the energy by the energy equivalent of 1 u.", "Δm = Q ÷ 931.5.", "Example: 18.63 MeV corresponds to 0.02 u. Now do yours."),
        S(`The reactants have a total mass of ${Rm} u and the products ${r2(Rm - dd)} u. How much energy is released, in MeV? (1 u = 931.5 MeV)`, "🔥", dd * 931.5,
          "First find the mass difference between reactants and products.", "Q = (m_reactants − m_products) × 931.5.", "Example: 5.0100 u becomes 5.0000 u, so Δm = 0.01 u and Q = 9.315 MeV. Now do yours."),
        S(`If 1 u of mass were completely converted to energy, how many MeV would be released?`, "💥", 931.5,
          "Use the conversion between mass units and energy.", "1 u is equivalent to a standard amount of MeV.", "Example: 2 u would give twice that conversion value. Now do yours.")
      ].filter(q => q.answer > 0));
    }),
    num("Quarks and charge", [
      ["Inside protons", "🧩", "Protons and neutrons are made of <b>quarks</b>. Up quark (u): charge <b>+2/3 e</b>. Down quark (d): <b>−1/3 e</b>. Baryons (such as the proton) have 3 quarks; mesons have a quark and an antiquark."],
      ["Adding charge", "🧮", "Proton = uud: 2/3 + 2/3 − 1/3 = <b>+1</b>. Neutron = udd: 2/3 − 1/3 − 1/3 = <b>0</b>. An antiquark has the opposite charge, so d̄ is +1/3."],
      ["Baryon number", "🔢", "Each quark has baryon number 1/3, so a baryon has baryon number 1; a meson has 0 (the antiquark cancels the quark)."]
    ], () => {
      const [u, d] = pick([[3, 0], [2, 1], [1, 2]]);
      return pick([
        S(`A baryon is made of ${u} up and ${d} down quarks. What is its total charge, in units of e? (u = +2/3, d = −1/3)`, "🧩", (2 * u - d) / 3,
          "Add the charges of all three quarks.", "Each up gives +2/3 and each down gives −1/3.", "Example: uud gives 2/3 + 2/3 − 1/3 = 1. Now do yours."),
        S("A pion π⁺ is made of an up quark and an anti-down quark (d̄ = +1/3). What is its charge, in units of e?", "⚛️", 1,
          "Add +2/3 for the up quark and the antiquark's charge.", "An anti-down quark carries +1/3.", "Example: an up quark with an anti-up quark has charge 2/3 − 2/3 = 0. Now do yours."),
        S("How many quarks make up a proton?", "🔢", 3,
          "Protons are baryons.", "A baryon is built from a small odd number of quarks.", "Example: a neutron has the same number as a proton. Now do yours."),
        S("How many quarks make up a meson?", "🔢", 2,
          "A meson is a quark paired with something.", "It has one quark and one antiquark.", "Example: a pion is a meson. Now count its constituents."),
        S("What is the baryon number of a meson?", "0️⃣", 0,
          "A quark counts +1/3 and an antiquark counts the opposite.", "They cancel.", "Example: a quark and antiquark pair sums to zero. Now do yours.")
      ]);    }),
    les("Conservation laws in particle physics", [
      ["What stays constant", "⚖️", "In every reaction, <b>electric charge</b>, <b>energy and momentum</b>, <b>baryon number</b> and <b>lepton number</b> are conserved. A particle and its antiparticle have opposite charges and opposite lepton or baryon numbers."],
      ["Beta decay", "🧩", "A neutron decays: <b>n → p + e⁻ + ν̄ₑ</b>. Charge: 0 → +1 − 1 + 0. Lepton number: the electron (+1) is balanced by the antineutrino (−1). The weak force causes this; the strong force binds quarks and nuclei."],
      ["Annihilation", "💫", "An electron meeting a positron (its antiparticle) can annihilate into photons (gamma rays). Total charge was zero before and after."]
    ], ["Check charge on both sides of the reaction, then lepton number.", "Antiparticles count with the opposite sign.", "Example: if a neutral particle turns into a positive one, something negative must also appear. Now check yours."], [
      ["In neutron beta decay (n → p + e⁻ + ?), which particle is also produced to conserve lepton number?", "An antineutrino", "A positron", "A photon"],
      ["Which force is responsible for beta decay?", "The weak force", "The strong force", "Gravity"],
      ["Which force binds quarks together inside protons and neutrons?", "The strong force", "The weak force", "Magnetism"],
      ["The antiparticle of the electron is the...", "Positron", "Proton", "Photon"],
      ["An electron and a positron annihilate. What do they typically produce?", "Photons (gamma rays)", "Two protons", "A heavier atom"],
      ["In n → p + e⁻ + ν̄ₑ the total charge on the right side is...", "Zero", "Positive (+1)", "Negative (−1)"],
      ["A neutrino carries electric charge of...", "Zero", "Positive (+1)", "Negative (−1)"]
    ]),
    num("Photon momentum", [
      ["Light has momentum", "💨", "A photon of wavelength λ has momentum <b>p = h ÷ λ</b>, so <b>pc = E = 1240 ÷ λ</b> (eV, with λ in nm). Radiation pressure, Compton scattering and laser cooling all depend on it."],
      ["Recoil", "🧩", "When an atom absorbs or emits a photon it recoils to conserve momentum. The shorter the wavelength, the bigger the kick. For a photon, energy and pc are the same number."],
      ["Example", "🧮", "λ = 620 nm: E = 1240 ÷ 620 = 2 eV, so pc = 2 eV."]
    ], () => {
      const [lam, pcv] = pick([[400, 3.1], [500, 2.48], [620, 2], [800, 1.55], [310, 4], [248, 5], [200, 6.2]]);
      const f = pick([2, 3, 4, 5]);
      return pick([
        S(`A photon has wavelength ${lam} nm. What is its momentum, written as pc in eV? (pc = 1240 ÷ λ)`, "💨", pcv,
          "For a photon, pc equals its energy.", "Divide 1240 by the wavelength in nm.", "Example: λ = 400 nm gives pc = 3.1 eV. Now do yours."),
        S(`A photon has momentum pc = ${pcv} eV. What is its wavelength, in nm?`, "🌈", lam,
          "Rearrange pc = 1240 ÷ λ.", "λ = 1240 ÷ pc.", "Example: pc = 2 eV gives 620 nm. Now do yours."),
        S(`A photon of energy ${pcv} eV has momentum pc equal to what, in eV?`, "⚖️", pcv,
          "For a massless particle, pc and E are linked simply.", "E = pc for a photon.", "Example: a 5 eV photon has pc = 5 eV. Now do yours."),
        S(`A photon's wavelength is divided by ${f}. By what factor does its momentum change? (Give the multiplier.)`, "✖️", f,
          "Momentum is inversely proportional to wavelength.", "Shorter wavelength means proportionally larger momentum.", "Example: λ halved doubles the momentum. Now do yours.")
      ]);
    }),
    num("Normalising a wave function", [
      ["Probabilities add to 1", "📈", "The probability of finding a particle in a small width dx is |ψ|² dx. Somewhere it must be found, so the total is 1: this is <b>normalisation</b>."],
      ["A simple case", "🧩", "If ψ = A (constant) over a region of width L and zero elsewhere, then A²L = 1, so <b>A = 1 ÷ √L</b>. The probability of finding the particle in a part of width w is <b>A² w = w ÷ L</b>."],
      ["Example", "🧮", "L = 25: A = 1/5 = 0.2. The chance of finding it in a part of width 10 is 10 ÷ 25 = 0.4."]
    ], () => {
      const [L, A] = pick([[4, 0.5], [16, 0.25], [25, 0.2], [100, 0.1]]);
      const [L2, w] = combo([[8, 10, 20, 40, 50], [1, 2, 4, 5, 10]], (L, w) => w < L && cl(w / L));
      return pick([
        S(`A wave function has constant value A over a region of width ${L} and is zero elsewhere. What is A when it is normalised?`, "📈", A,
          "The total probability must equal 1.", "A² × width = 1, so A = 1 ÷ √width.", "Example: width 9 gives A = 1/3 ≈ 0.3333. Now do yours."),
        S(`A normalised wave function has constant value ${A} over a region and is zero elsewhere. How wide is the region?`, "📏", L,
          "Use A² × width = 1.", "width = 1 ÷ A².", "Example: A = 0.5 gives 1 ÷ 0.25 = 4. Now do yours."),
        S(`A particle is equally likely to be anywhere in a region of width ${L2}. What is the probability of finding it in a part of width ${w}?`, "🎯", w / L2,
          "For a uniform wave function the chance is proportional to the width.", "P = part width ÷ total width.", "Example: a part of width 3 in a region of 12 gives 0.25. Now do yours."),
        S(`A uniform wave function over a region of width ${L} has A = ${A}. What is the probability density |ψ|² inside the region?`, "🔆", A * A,
          "Probability density is the square of the wave function.", "|ψ|² = A².", "Example: A = 0.3 gives 0.09. Now do yours.")
      ]);
    }),
    num("The quantum harmonic oscillator", [
      ["Evenly spaced levels", "🪀", "A quantum oscillator (a vibrating bond, a trapped atom) has energy levels <b>Eₙ = (n + ½) hf</b>, n = 0, 1, 2… The levels are equally spaced by hf."],
      ["Zero-point energy", "🧩", "Even the ground state (n = 0) has energy <b>½hf</b>: the oscillator can never be perfectly at rest. It could not be, by the uncertainty principle. A photon of energy hf moves it up one level."],
      ["Example", "🧮", "hf = 0.2 eV: E₀ = 0.1 eV, E₁ = 0.3 eV, E₂ = 0.5 eV."]
    ], () => {
      const h = pick([0.1, 0.2, 0.4, 0.5, 1, 2]), n = pick([0, 1, 2, 3, 4, 5]);
      return pick([
        S(`A quantum oscillator has hf = ${h} eV. What is the energy of the ground state (n = 0), in eV?`, "🪀", h / 2,
          "Even the lowest state has some energy.", "E₀ = ½ hf.", "Example: hf = 0.6 eV gives E₀ = 0.3 eV. Now do yours."),
        S(`A quantum oscillator has hf = ${h} eV. What is the energy of level n = ${n}, in eV?`, "📶", (n + 0.5) * h,
          "Add one half to the quantum number first.", "Eₙ = (n + ½) hf.", "Example: hf = 0.2 eV, n = 4 gives 4.5 × 0.2 = 0.9 eV. Now do yours."),
        S(`The energy levels of an oscillator are ${h / 2}, ${r2(1.5 * h)}, ${r2(2.5 * h)} eV and so on. What photon energy, in eV, moves it up one level?`, "⬆️", h,
          "Look at the spacing between neighbouring levels.", "The spacing equals hf.", "Example: levels 0.3, 0.9, 1.5 eV are spaced 0.6 eV apart. Now do yours."),
        S(`An oscillator has hf = ${h} eV and is in a level with energy ${r2((n + 0.5) * h)} eV. What is n?`, "🔢", n,
          "Divide the energy by hf first.", "n = E ÷ hf − ½.", "Example: hf = 0.2 eV and E = 0.9 eV gives n = 4. Now do yours.")
      ]);
    })
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])),
    mix("Level 29 Challenge", at(b, [0, 2, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 30 =================
  const c = [
    num("Degrees of freedom", [
      ["Counting coordinates", "🧭", "The number of independent numbers needed to say where everything is = <b>degrees of freedom</b>. N free particles in 3D have <b>3N</b>; in a plane, <b>2N</b>. Each independent constraint (a rod, a rail, a surface) removes one."],
      ["Generalised coordinates", "🧩", "Lagrangian mechanics picks one <b>generalised coordinate</b> q for each degree of freedom (an angle, a distance along a rail…) instead of working with all the forces in Cartesian axes."],
      ["Example", "🧮", "A pendulum bob in a plane: 2 coordinates, 1 constraint (fixed string length) → 1 degree of freedom, the angle θ."]
    ], () => {
      const N = pick([1, 2, 3, 4, 5]), cn = pick([1, 2, 3]), Np = pick([2, 3, 4, 5, 6]);
      return pick([
        S(`${N + 1} free particles move in three dimensions. How many degrees of freedom do they have?`, "🧭", 3 * (N + 1),
          "Each particle needs a fixed number of coordinates in 3D.", "Multiply that number by the number of particles.", "Example: 2 particles in 3D have 6. Now do yours."),
        S(`${Np} free particles move in a plane. How many degrees of freedom do they have?`, "📄", 2 * Np,
          "A plane needs fewer coordinates than 3D.", "Each particle in a plane needs two numbers.", "Example: 4 particles in a plane have 8. Now do yours."),
        S(`${N + 1} particles move in three dimensions but are joined by ${cn} rigid rods (${cn} constraints). How many degrees of freedom remain?`, "🔗", 3 * (N + 1) - cn,
          "Start with the free count, then remove the constraints.", "DOF = 3N − (number of independent constraints).", "Example: 3 particles with 2 rods: 9 − 2 = 7. Now do yours."),
        S(`${Np} particles move in a plane but are joined by ${cn} rigid rods. How many degrees of freedom remain?`, "🔩", 2 * Np - cn,
          "Start with 2 per particle, then subtract each constraint.", "DOF = 2N − constraints.", "Example: 4 particles with 2 rods: 8 − 2 = 6. Now do yours."),
        S(`A bead slides on a fixed frictionless wire. How many degrees of freedom does it have?`, "📿", 1,
          "The wire forces the bead onto a curve.", "Only one coordinate is needed: the distance along the wire.", "Example: a bead on a fixed ring is likewise described by its angle. Now do yours.")
      ]);
    }),
    num("The Lagrangian L = T − V", [
      ["Kinetic minus potential", "⚖️", "The <b>Lagrangian</b> is <b>L = T − V</b>, kinetic energy minus potential energy. (Not the sum!) It is a function of the coordinates q and their speeds q̇, and the equation of motion follows from it."],
      ["Examples", "🧩", "Mass on a spring: <b>L = ½mẋ² − ½kx²</b>. Free fall (height y, g = 10): <b>L = ½mẏ² − mgy</b>."],
      ["Example", "🧮", "m = 2 kg, v = 3 m/s, k = 8 N/m, x = 1 m: T = 9 J, V = 4 J, so L = 5 J."]
    ], () => {
      const [m, v, k, x] = combo([[1, 2, 4], [2, 3, 4, 5, 6], [2, 4, 6, 8], [1, 2, 3]], (m, v, k, x) => 0.5 * m * v * v > 0.5 * k * x * x);
      const [m2, v2, h] = combo([[1, 2, 4], [4, 6, 8, 10], [0.5, 1, 2, 3]], (m, v, h) => 0.5 * m * v * v > 10 * m * h);
      return pick([
        S(`A ${m} kg mass on a spring (k = ${k} N/m) is at x = ${x} m moving at ${v} m/s. What is L = T − V, in joules?`, "⚖️", 0.5 * m * v * v - 0.5 * k * x * x,
          "Find the kinetic and potential energies separately.", "T = ½mv², V = ½kx², then subtract.", "Example: m = 2, v = 2, k = 6, x = 1: T = 4, V = 3, L = 1 J. Now do yours."),
        S(`A ${m} kg mass on a spring (k = ${k} N/m) is at x = ${x} m moving at ${v} m/s. What is its kinetic energy T, in joules?`, "🏃", 0.5 * m * v * v,
          "Kinetic energy depends on the speed.", "T = ½mv².", "Example: m = 3 and v = 2 gives 6 J. Now do yours."),
        S(`A ${m2} kg ball is ${h} m above the ground moving at ${v2} m/s. What is its Lagrangian L = T − V, in joules? (V = mgh, g = 10 m/s²)`, "🏀", 0.5 * m2 * v2 * v2 - 10 * m2 * h,
          "Kinetic energy minus gravitational potential energy.", "T = ½mv², V = mgh.", "Example: m = 1, v = 6, h = 2: T = 18, V = 20, so L would be −2 J (here the potential is bigger). Now do yours."),
        S(`A system has kinetic energy ${0.5 * m * v * v + 4} J and potential energy ${4} J. What is L, in joules?`, "➖", 0.5 * m * v * v,
          "L is a difference, not a sum.", "L = T − V.", "Example: T = 15 J and V = 6 J gives 9 J. Now do yours.")
      ]);
    }),
    num("Canonical momentum", [
      ["Momentum from L", "📐", "The <b>canonical momentum</b> for coordinate q is <b>p = ∂L/∂q̇</b>. For L = ½mẋ² − V it equals mẋ, ordinary momentum."],
      ["Angular coordinates", "🧩", "For a bead on a ring or a pendulum, L = ½ml²θ̇² + …, so <b>p_θ = ml²θ̇</b>, the angular momentum. If L has a factor ½A·q̇², then p = A·q̇."],
      ["Example", "🧮", "L = 3ẋ² − 5x: p = ∂L/∂ẋ = 6ẋ. At ẋ = 2, p = 12."]
    ], () => {
      const m = pick([1, 2, 3, 4, 5]), v = pick([2, 3, 4, 5, 6]), l = pick([1, 2, 3]), w = pick([1, 2, 3, 4]), A = pick([1, 2, 3, 4, 5]);
      return pick([
        S(`A free particle has L = ½ m ẋ² with m = ${m} kg and ẋ = ${v} m/s. What is p = ∂L/∂ẋ, in kg·m/s?`, "📐", m * v,
          "Differentiate L with respect to the speed.", "d/dẋ of ½mẋ² is mẋ.", "Example: m = 2 and ẋ = 7 gives 14. Now do yours."),
        S(`A pendulum has L = ½ m l² θ̇² − mgl(1 − cos θ), with m = ${m} kg and l = ${l} m. What is p_θ at θ̇ = ${w} rad/s, in kg·m²/s?`, "🎡", m * l * l * w,
          "Differentiate with respect to θ̇; the potential term has no θ̇.", "p_θ = m l² θ̇.", "Example: m = 2, l = 3, θ̇ = 1 gives 18. Now do yours."),
        S(`A system has L = ${A} q̇² − 7q. What is p = ∂L/∂q̇ when q̇ = ${w}?`, "🧮", 2 * A * w,
          "Differentiate L with respect to q̇ only.", "d/dq̇ of Aq̇² is 2Aq̇.", "Example: L = 4q̇² − 7q at q̇ = 3 gives p = 24. Now do yours."),
        S(`A particle has p = ${m * v} kg·m/s and L = ½ m ẋ² − V with m = ${m} kg. What is its speed ẋ, in m/s?`, "🏃", v,
          "For this kind of Lagrangian p = mẋ.", "ẋ = p ÷ m.", "Example: p = 24 and m = 4 gives 6 m/s. Now do yours.")
      ]);
    }),
    num("The Hamiltonian", [
      ["Energy in terms of p", "🔋", "The <b>Hamiltonian</b> is the total energy written with momentum p instead of speed: for L = ½mẋ² − V, <b>H = p²/2m + V</b>."],
      ["Hamilton's equations", "🧩", "<b>ẋ = ∂H/∂p</b> and <b>ṗ = −∂H/∂x</b>. For a spring, V = ½kx²: ẋ = p/m and ṗ = −kx. These two first-order equations replace Newton's second law."],
      ["Example", "🧮", "m = 2, p = 4, k = 8, x = 1: H = 16/4 + 4 = 8 J. ẋ = 2 m/s."]
    ], () => {
      const [m, p, k, x] = combo([[1, 2, 4, 5], [2, 4, 6, 8, 10], [2, 4, 8, 10], [1, 2, 3, 4]], (m, p, k, x) => cl(p * p / (2 * m) + 0.5 * k * x * x));
      return pick([
        S(`A mass m = ${m} kg on a spring (k = ${k} N/m) has p = ${p} kg·m/s and x = ${x} m. What is the Hamiltonian H = p²/2m + ½kx², in joules?`, "🔋", p * p / (2 * m) + 0.5 * k * x * x,
          "H is the total energy: a kinetic part and a potential part.", "Kinetic = p² ÷ 2m, potential = ½kx².", "Example: m = 2, p = 6, k = 4, x = 2: 9 + 8 = 17 J. Now do yours."),
        S(`For the system with m = ${m} kg and p = ${p} kg·m/s, ẋ = ∂H/∂p. What is the velocity ẋ, in m/s?`, "🏃", p / m,
          "Differentiate H with respect to p.", "ẋ = p ÷ m.", "Example: p = 12 and m = 3 gives 4 m/s. Now do yours."),
        S(`For a spring with k = ${k} N/m at x = ${x} m, ṗ = −∂H/∂x. What is the size of the rate of change of momentum, in N?`, "🌀", k * x,
          "Differentiate the potential energy with respect to position and ignore the sign.", "|ṗ| = kx.", "Example: k = 6 and x = 5 gives 30 N. Now do yours."),
        S(`A particle of mass ${m} kg moves freely (V = 0) with p = ${p} kg·m/s. What is H, in joules?`, "💨", p * p / (2 * m),
          "With no potential, H is just the kinetic energy.", "H = p² ÷ 2m.", "Example: p = 10, m = 5 gives 10 J. Now do yours.")
      ]);
    }),
    les("Symmetry and conservation", [
      ["Cyclic coordinates", "🌀", "If the Lagrangian does not contain a coordinate q (only q̇), then ∂L/∂q = 0 and its canonical momentum <b>p = ∂L/∂q̇ is conserved</b>. Such a q is called <b>cyclic</b>."],
      ["Noether's idea", "🧩", "Every continuous symmetry gives a conservation law: <b>time translation → energy</b>, <b>space translation → linear momentum</b>, <b>rotation → angular momentum</b>."],
      ["Example", "🧮", "A planet in a central force: the Lagrangian does not depend on the angle φ, so angular momentum is conserved (Kepler's second law)."]
    ], ["Ask what the physics does not care about (where, when or which way).", "Each such symmetry has its own conserved quantity.", "Example: if rotating the whole set-up changes nothing, a rotational quantity cannot change. Now apply that to yours."], [
      ["If the laws do not change with time, which quantity is conserved?", "Energy", "Linear momentum", "Angular momentum"],
      ["If the physics is the same at every place along a line, which quantity is conserved?", "Linear momentum along that line", "Energy", "Angular momentum"],
      ["If the physics is the same under rotation about an axis, which quantity is conserved?", "Angular momentum about that axis", "Energy", "Mass"],
      ["A coordinate q does not appear in L, only q̇. What is conserved?", "The momentum conjugate to q", "The coordinate q itself", "Nothing"],
      ["Which result links symmetries to conservation laws?", "Noether's theorem", "Hooke's law", "Ohm's law"],
      ["A planet moves in a central force. Which is conserved?", "Angular momentum", "Speed", "Kinetic energy"],
      ["A block slides with friction. Which total is not conserved?", "Mechanical energy", "Charge", "Total energy including heat"]
    ]),
    num("Small oscillations", [
      ["Near the bottom", "🥣", "Near a minimum of a potential V(x), any smooth well looks like a parabola: V ≈ V₀ + ½V″x². Then the motion is simple harmonic with <b>ω = √(V″ ÷ m)</b>."],
      ["Reading V", "🧩", "If <b>V = A x²</b> near the minimum, V″ = 2A and <b>ω = √(2A ÷ m)</b>. Higher powers (x³, x⁴) do not matter for small x. A pendulum: ω = √(g ÷ l)."],
      ["Example", "🧮", "V = 8x² with m = 4 kg: V″ = 16, ω = √(16 ÷ 4) = 2 rad/s."]
    ], () => {
      const [m, s] = combo([[2, 4, 6, 8], [1, 2, 3, 4, 5]], () => true);
      const l = pick([[0.4, 5], [2.5, 2], [10, 1], [0.1, 10], [0.625, 4]]);
      const B = pick([1, 2, 3, 5]);
      return pick([
        S(`A particle of mass ${m} kg sits in a well V = ${m * s * s / 2} x² (joules, x in metres). What is the small-oscillation angular frequency, in rad/s?`, "🥣", s,
          "Find the curvature V″ at the bottom.", "ω = √(V″ ÷ m), where V″ = 2A.", "Example: m = 4, V = 8x² gives V″ = 16 and ω = 2 rad/s. Now do yours."),
        S(`A particle of mass ${m} kg sits in a well V = ${m * s * s / 2} x² − ${B} x³ (joules, x in metres). What is the angular frequency of small oscillations about x = 0, in rad/s?`, "🧮", s,
          "For small x the cubic term is negligible next to the squared term.", "Use only the x² term: ω = √(2A ÷ m).", "Example: V = 8x² − 3x³ with m = 4 behaves like 8x², ω = 2 rad/s. Now do yours."),
        S(`A pendulum has length ${l[0]} m. What is its small-oscillation angular frequency, in rad/s? (g = 10 m/s²)`, "🎡", l[1],
          "A pendulum is like a spring with stiffness mg ÷ l.", "ω = √(g ÷ l).", "Example: l = 2.5 m gives √4 = 2 rad/s. Now do yours."),
        S(`A mass of ${m} kg on a spring of stiffness ${m * s * s} N/m is described by V = ½kx². What is ω, in rad/s?`, "🔩", s,
          "Compare ½kx² with ½V″x².", "ω = √(k ÷ m).", "Example: k = 36 and m = 4 gives ω = 3 rad/s. Now do yours.")
      ]);
    }),
    num("Circular orbits and angular momentum", [
      ["Central force", "🪐", "For motion around a point mass M, the angular momentum per unit mass <b>h = r v</b> is constant (the Lagrangian does not depend on the angle). The effective potential has a minimum at the circular orbit."],
      ["Circular orbit", "🧩", "Gravity gives v² = GM ÷ r. With h = r v this means <b>r = h² ÷ GM</b> and <b>v = h ÷ r = GM ÷ h</b>. A larger h means a larger orbit."],
      ["Example", "🧮", "GM = 9 and h = 6: r = 36 ÷ 9 = 4 and v = 6 ÷ 4 = 1.5 (in these scaled units)."]
    ], () => {
      const [GM, h] = combo([[4, 9, 16, 25], [2, 3, 4, 5, 6, 8, 10, 12]], (G, h) => cl(h * h / G) && cl(h / (h * h / G)));
      const r = h * h / GM, v = h / r;
      const [GM2, r2v] = combo([[4, 9, 16, 25], [1, 4, 9, 16, 25, 36]], () => true);
      return pick([
        S(`In scaled units GM = ${GM}. A circular orbit has specific angular momentum h = ${h}. What is its radius r = h² ÷ GM?`, "🪐", r,
          "Gravity supplies the centripetal force.", "r = h² ÷ GM.", "Example: GM = 4 and h = 4 gives r = 4. Now do yours."),
        S(`In scaled units GM = ${GM}. A circular orbit has radius ${r} and h = ${h}. What is the orbital speed v = h ÷ r?`, "🏃", v,
          "Angular momentum per unit mass is radius times speed.", "v = h ÷ r.", "Example: h = 6 and r = 4 gives 1.5. Now do yours."),
        S(`In scaled units GM = ${GM2}. A circular orbit has radius ${r2v}. What is h = √(GM·r)?`, "🔄", Math.sqrt(GM2 * r2v),
          "Rearrange r = h² ÷ GM.", "h = √(GM × r).", "Example: GM = 4 and r = 9 gives h = 6. Now do yours."),
        S(`A circular orbit has radius ${r} and speed ${v}. What is the specific angular momentum h = r v?`, "🎡", h,
          "Angular momentum per unit mass is r times v.", "Multiply the radius and the speed.", "Example: r = 5 and v = 2 gives 10. Now do yours.")
      ]);
    }),
    num("Reduced mass", [
      ["Two bodies, one", "👯", "Two bodies attracting each other can be treated as one particle of <b>reduced mass μ = m₁m₂ ÷ (m₁ + m₂)</b> moving around the centre of mass. This turns a two-body problem into a one-body problem."],
      ["Limits", "🧩", "Equal masses: μ = m ÷ 2. If one mass is far heavier, μ ≈ the lighter mass. Two masses joined by a spring oscillate at <b>ω = √(k ÷ μ)</b>."],
      ["Example", "🧮", "m₁ = 3 and m₂ = 6: μ = 18 ÷ 9 = 2. A spring k = 18 N/m gives ω = √(18 ÷ 2) = 3 rad/s."]
    ], () => {
      const [m1, m2, mu] = pick([[1, 1, 0.5], [2, 2, 1], [3, 6, 2], [4, 12, 3], [2, 6, 1.5], [6, 12, 4], [10, 15, 6], [20, 30, 12], [5, 5, 2.5]]);
      const s = pick([2, 3, 4, 5]), mm = pick([2, 4, 6, 8, 10]);
      return pick([
        S(`Two masses of ${m1} kg and ${m2} kg interact. What is their reduced mass, in kg?`, "👯", mu,
          "Multiply the masses, then divide by something.", "μ = m₁m₂ ÷ (m₁ + m₂).", "Example: 4 kg and 12 kg gives 48 ÷ 16 = 3 kg. Now do yours."),
        S(`Two equal masses of ${mm} kg orbit each other. What is the reduced mass, in kg?`, "🤝", mm / 2,
          "For equal masses the formula simplifies nicely.", "μ = m ÷ 2.", "Example: two 10 kg masses give 5 kg. Now do yours."),
        S(`Masses of ${m1} kg and ${m2} kg are joined by a spring of stiffness ${r2(mu * s * s)} N/m. What is the angular frequency of their vibration, in rad/s? (ω = √(k ÷ μ))`, "🔩", s,
          "Use the reduced mass in place of the single mass.", "First find μ, then ω = √(k ÷ μ).", "Example: μ = 2 kg and k = 50 N/m gives √25 = 5 rad/s. Now do yours."),
        S(`Two masses have reduced mass ${mu} kg and one of them is ${m1} kg. What is the other mass, in kg?`, "🔎", m2,
          "Rearrange μ = m₁m₂ ÷ (m₁ + m₂).", "m₂ = μ m₁ ÷ (m₁ − μ).", "Example: μ = 2 and m₁ = 3 gives m₂ = 6. Now do yours.")
      ].filter(q => q.answer > 0 && cl(q.answer)));
    }),
    num("Lorentz transformations", [
      ["Changing frames", "🚀", "Event coordinates in a frame moving at speed v along x: <b>x′ = γ(x − vt)</b> and <b>t′ = γ(t − vx ÷ c²)</b>, with <b>γ = 1 ÷ √(1 − v²/c²)</b>. Use units where c = 1 (for example light-years and years)."],
      ["Useful values", "🧩", "v = 0.6c gives γ = 1.25. v = 0.8c gives γ = 5/3. Time and space mix, so events simultaneous in one frame are not simultaneous in another."],
      ["Example", "🧮", "v = 0.6, event x = 10, t = 5: x′ = 1.25 × (10 − 3) = 8.75; t′ = 1.25 × (5 − 6) = −1.25."]
    ], () => {
      const [be, g, x, t] = combo([[0.6, 0.8], [0, 0], [6, 8, 9, 10, 12, 15, 20, 24, 30], [1, 2, 3, 4, 5, 6, 9, 12, 15]], (b, _, x, t) => {
        const gg = b === 0.6 ? 1.25 : 5 / 3;
        return x - b * t > 0 && t - b * x > 0 && cl(gg * (x - b * t)) && cl(gg * (t - b * x));
      });
      const gam = be === 0.6 ? 1.25 : 5 / 3;
      return pick([
        S(`In units where c = 1, an event has x = ${x} and t = ${t}. A frame moves at v = ${be} (γ = ${be === 0.6 ? "1.25" : "5/3"}). What is x′ = γ(x − vt)?`, "🚀", gam * (x - be * t),
          "Subtract v times t from x, then apply γ.", "x′ = γ(x − vt).", "Example: v = 0.6, x = 10, t = 5 gives 1.25 × 7 = 8.75. Now do yours."),
        S(`In units where c = 1, an event has x = ${x} and t = ${t}. A frame moves at v = ${be} (γ = ${be === 0.6 ? "1.25" : "5/3"}). What is t′ = γ(t − vx)?`, "⏱️", gam * (t - be * x),
          "Subtract v times x from t, then apply γ.", "t′ = γ(t − vx) when c = 1.", "Example: v = 0.6, x = 3, t = 10 gives 1.25 × (10 − 1.8) = 10.25. Now do yours."),
        S(`With v = ${be} and c = 1, what is γ = 1 ÷ √(1 − v²)? (Answer to 2 decimal places.)`, "📈", Math.round(100 / Math.sqrt(1 - be * be)) / 100,
          "Square v, subtract from 1, take the square root, then invert.", "For v = 0.6 the square root is 0.8; for v = 0.8 it is 0.6.", "Example: v = 0.28 gives √(1 − 0.0784) = 0.96 and γ ≈ 1.04. Now do yours.")
      ]);
    }),
    num("Adding relativistic velocities", [
      ["Speeds do not simply add", "🛸", "If something moves at u′ in a frame that moves at v, the speed in the original frame is <b>u = (u′ + v) ÷ (1 + u′v/c²)</b>. Speeds never exceed c."],
      ["Light stays c", "🧩", "With c = 1: if u′ = 1 then u = 1 whatever v is. For small speeds the denominator is almost 1 and we recover u = u′ + v. The relative speed of two objects uses <b>(u − v) ÷ (1 − uv)</b>."],
      ["Example", "🧮", "Two 0.5c speeds in the same direction: u = 1.0 ÷ 1.25 = 0.8c."]
    ], () => {
      const add = pick([[0.5, 0.5, 0.8], [0.4, 0.5, 0.75], [1 / 3, 1 / 3, 0.6]]);
      const rel = pick([[0.8, 0.5, 0.5], [0.75, 0.4, 0.5]]);
      const p4 = pick([[0.5, 0.5], [0.4, 0.5], [0.2, 0.4], [0.3, 0.4], [0.1, 0.7]]);
      const showA = x => Math.abs(x - 1 / 3) < 1e-9 ? "1/3" : String(r2(x));
      return pick([
        S(`A ship moves at ${showA(add[0])}c and fires a missile forward at ${showA(add[1])}c relative to the ship. How fast does the missile move relative to us, in units of c?`, "🚀", add[2],
          "Do not just add: use the relativistic rule.", "u = (u′ + v) ÷ (1 + u′v) with c = 1.", "Example: 0.4c and 0.5c: (0.9) ÷ (1.2) = 0.75. Now do yours."),
        S(`Two objects move in the same direction at ${rel[0]}c and ${rel[1]}c relative to us. How fast is the faster one moving relative to the slower, in units of c?`, "👀", rel[2],
          "Use the relative-velocity formula with a minus sign.", "u_rel = (u − v) ÷ (1 − uv) with c = 1.", "Example: 0.9c and 0.6c: 0.3 ÷ 0.46 ≈ 0.65. Now do yours."),
        S(`A ship moving at ${pick([0.3, 0.5, 0.6, 0.9])}c shines a torch forward. How fast does the light travel relative to us, in units of c?`, "🔦", 1,
          "Light has the same speed in every frame.", "Put u′ = 1 into the formula and see what happens.", "Example: for any v, (1 + v) ÷ (1 + v) = 1. Now do yours."),
        S(`With c = 1, speeds of ${p4[0]} and ${p4[1]} are combined by u = (u′ + v) ÷ (1 + u′v). What is the numerator u′ + v? (Answer as a decimal.)`, "➕", r2(p4[0] + p4[1]),
          "Add the two speeds first.", "The top of the fraction is the ordinary sum.", "Example: 0.2 and 0.4 give 0.6 on top. Now do yours.")
      ].filter(q => q.answer > 0));
    }),
    num("Relativistic energy", [
      ["Total energy", "⚡", "<b>E = γmc²</b>, where mc² is the rest energy E₀. <b>Kinetic energy = (γ − 1) mc²</b>. Momentum: <b>pc = γβ mc²</b> with β = v/c."],
      ["Handy cases", "🧩", "β = 0.6: γ = 1.25, pc = 0.75 E₀. β = 0.8: γ = 5/3, pc = (4/3) E₀. β = 0.96: γ = 25/7, pc = (24/7) E₀."],
      ["Example", "🧮", "E₀ = 200 MeV at β = 0.6: E = 250 MeV, KE = 50 MeV, pc = 150 MeV."]
    ], () => {
      const [be, g, E0] = pick([[0.6, 1.25, 100], [0.6, 1.25, 200], [0.6, 1.25, 400], [0.8, 5 / 3, 300], [0.8, 5 / 3, 600], [0.8, 5 / 3, 900], [0.96, 25 / 7, 700], [0.96, 25 / 7, 1400]]);
      return pick([
        S(`A particle with rest energy ${E0} MeV moves at ${be}c. What is its total energy, in MeV?`, "⚡", g * E0,
          "Total energy is the rest energy times γ.", `γ for ${be}c is a standard value: use E = γ E₀.`, "Example: E₀ = 100 MeV at 0.6c has γ = 1.25 and E = 125 MeV. Now do yours."),
        S(`A particle with rest energy ${E0} MeV moves at ${be}c. What is its kinetic energy, in MeV?`, "🏃", (g - 1) * E0,
          "Kinetic energy is total energy minus rest energy.", "KE = (γ − 1) E₀.", "Example: E₀ = 100 MeV at 0.6c gives 25 MeV. Now do yours."),
        S(`A particle with rest energy ${E0} MeV moves at ${be}c. What is its momentum, written as pc in MeV?`, "💨", g * be * E0,
          "Momentum is γ times mass times speed.", "pc = γβ E₀.", "Example: E₀ = 100 MeV at 0.6c gives pc = 1.25 × 0.6 × 100 = 75 MeV. Now do yours."),
        S(`A particle moving at ${be}c has total energy ${r2(g * E0)} MeV. What is its rest energy, in MeV?`, "🔙", E0,
          "Rest energy is the total energy divided by γ.", "E₀ = E ÷ γ.", "Example: E = 125 MeV at 0.6c gives E₀ = 100 MeV. Now do yours.")
      ]);
    }),
    num("The energy–momentum triangle", [
      ["A right triangle", "📐", "<b>E² = (pc)² + (mc²)²</b>. Total energy is the hypotenuse; pc and rest energy mc² are the legs. For a photon (m = 0), E = pc."],
      ["Pythagorean triples", "🧩", "Nice numbers: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). Scale them by any factor. This also shows the invariant mass: E² − (pc)² is the same in every frame."],
      ["Example", "🧮", "pc = 6 MeV and mc² = 8 MeV: E² = 36 + 64 = 100, so E = 10 MeV."]
    ], () => {
      const [p, m, E] = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25]]);
      const k = pick([1, 2, 10, 20]);
      return pick([
        S(`A particle has pc = ${p * k} MeV and rest energy mc² = ${m * k} MeV. What is its total energy, in MeV?`, "📐", E * k,
          "The three energies form a right triangle.", "E = √((pc)² + (mc²)²).", "Example: pc = 9 and mc² = 12 gives E = 15 MeV. Now do yours."),
        S(`A particle has total energy ${E * k} MeV and rest energy ${m * k} MeV. What is pc, in MeV?`, "💨", p * k,
          "Rearrange E² = (pc)² + (mc²)².", "pc = √(E² − (mc²)²).", "Example: E = 25 and mc² = 7 gives pc = 24 MeV. Now do yours."),
        S(`A particle has total energy ${E * k} MeV and momentum pc = ${p * k} MeV. What is its rest energy, in MeV?`, "⚖️", m * k,
          "The rest energy is one leg of the triangle.", "mc² = √(E² − (pc)²).", "Example: E = 13 and pc = 5 gives mc² = 12 MeV. Now do yours."),
        S(`A photon has energy ${E * k} MeV. What is its pc, in MeV?`, "💡", E * k,
          "A photon has no rest energy.", "With mc² = 0 the triangle collapses: E = pc.", "Example: a 7 MeV photon has pc = 7 MeV. Now do yours.")
      ]);
    }),
    num("The relativistic Doppler effect", [
      ["Light from moving sources", "📡", "For light, an observer and a source moving directly toward each other see <b>f_obs = f_src × √((1 + β) ÷ (1 − β))</b>. Moving apart, the factor is inverted: <b>√((1 − β) ÷ (1 + β))</b>. No medium is needed."],
      ["Useful values", "🧩", "β = 0.6: factor 2. β = 0.8: factor 3. β = 0.96: factor 7. Approaching = blueshift (higher f, shorter λ); receding = redshift (lower f, longer λ)."],
      ["Example", "🧮", "A source of 12 THz approaching at 0.6c is seen at 24 THz. Receding at 0.6c it is seen at 6 THz."]
    ], () => {
      const [be, fac] = pick([[0.6, 2], [0.8, 3], [0.96, 7]]);
      const f = fac * pick([2, 3, 4, 5, 6, 10]), lam = fac * pick([100, 200, 300]);
      return pick([
        S(`A light source emits ${f} THz and approaches you head-on at ${be}c. What frequency do you see, in THz?`, "📡", f * fac,
          "Approaching raises the frequency.", `Multiply by the Doppler factor for ${be}c (a whole number).`, "Example: 12 THz approaching at 0.6c becomes 24 THz. Now do yours."),
        S(`A light source emits ${f * fac} THz and recedes from you directly at ${be}c. What frequency do you see, in THz?`, "🌌", f,
          "Receding lowers the frequency.", "Divide by the same Doppler factor.", "Example: 24 THz receding at 0.6c becomes 12 THz. Now do yours."),
        S(`A source emits light of wavelength ${lam} nm and approaches you head-on at ${be}c. What wavelength do you see, in nm?`, "🔵", lam / fac,
          "Approaching light is blueshifted, with a shorter wavelength.", "λ_obs = λ ÷ (Doppler factor).", "Example: 600 nm approaching at 0.6c becomes 300 nm. Now do yours."),
        S(`A source emits light of wavelength ${lam} nm and recedes at ${be}c. What wavelength do you see, in nm?`, "🔴", lam * fac,
          "Receding light is redshifted, with a longer wavelength.", "λ_obs = λ × (Doppler factor).", "Example: 300 nm receding at 0.6c becomes 600 nm. Now do yours.")
      ]);
    }),
    num("The spacetime interval", [
      ["An invariant", "🕰️", "The interval between two events, <b>s² = (cΔt)² − (Δx)²</b>, is the same in every inertial frame. In units where c = 1: s² = Δt² − Δx²."],
      ["Proper time", "🧩", "If s² > 0 (timelike), a clock moving between the events reads the <b>proper time τ = √(Δt² − Δx²)</b>. If s² < 0 (spacelike), no signal can connect the events."],
      ["Example", "🧮", "Δt = 5 and Δx = 3: τ = √(25 − 9) = 4 (same units)."]
    ], () => {
      const [T, X, tau] = pick([[5, 3, 4], [13, 5, 12], [10, 6, 8], [17, 8, 15], [25, 7, 24], [25, 15, 20], [26, 10, 24]]);
      return pick([
        S(`Two events are separated by Δt = ${T} years and Δx = ${X} light-years. What proper time elapses on a clock that travels between them, in years?`, "🕰️", tau,
          "Proper time is the invariant interval.", "τ = √(Δt² − Δx²) with c = 1.", "Example: Δt = 10 and Δx = 6 gives √64 = 8. Now do yours."),
        S(`Two events have Δt = ${T} years and Δx = ${X} light-years. What is s² = Δt² − Δx², in years²?`, "🔢", T * T - X * X,
          "Square both and subtract.", "s² = Δt² − Δx².", "Example: Δt = 5 and Δx = 4 gives 9. Now do yours."),
        S(`A clock travels between two events and records a proper time of ${tau} years. The events are ${X} light-years apart. How much time passed in the frame where both are measured, Δt, in years?`, "⏳", T,
          "Rearrange the interval formula.", "Δt = √(τ² + Δx²).", "Example: τ = 8 and Δx = 6 gives Δt = 10. Now do yours."),
        S(`Two events have Δt = ${tau} years and Δx = ${T} light-years. What is the proper distance √(Δx² − Δt²) in the frame where they are simultaneous, in light-years?`, "📏", X,
          "These events are spacelike: space beats time.", "Distance = √(Δx² − Δt²) with c = 1.", "Example: Δx = 10 and Δt = 8 gives 6. Now do yours.")
      ]);
    }),
    num("The twin trip", [
      ["Moving clocks", "👯", "A traveller flies out and back at constant speed v. In Earth's frame the trip lasts <b>2d ÷ v</b>. The traveller's clock runs slow: <b>T_traveller = T_Earth ÷ γ</b>."],
      ["Why the traveller is younger", "🧩", "The traveller changes frames to turn around, so their situations are not symmetric. Use units of light-years and years (c = 1). γ = 1.25 at 0.6c, 5/3 at 0.8c, 25/7 at 0.96c."],
      ["Example", "🧮", "d = 3 ly at 0.6c: Earth time = 6 ÷ 0.6 = 10 years; traveller = 10 ÷ 1.25 = 8 years."]
    ], () => {
      const [be, g, d] = pick([[0.6, 1.25, 3], [0.6, 1.25, 6], [0.6, 1.25, 9], [0.6, 1.25, 12], [0.8, 5 / 3, 4], [0.8, 5 / 3, 8], [0.8, 5 / 3, 12], [0.96, 25 / 7, 12], [0.96, 25 / 7, 24]]);
      const TE = 2 * d / be, TT = TE / g;
      return pick([
        S(`A star is ${d} light-years away. A ship flies there and back at ${be}c. How long does the round trip take in Earth's frame, in years?`, "🌍", TE,
          "Distance travelled divided by speed.", "The round trip covers twice the distance.", "Example: 4 ly at 0.8c gives 8 ÷ 0.8 = 10 years. Now do yours."),
        S(`A star is ${d} light-years away. A ship flies there and back at ${be}c. How many years pass on the ship's clock?`, "🧑‍🚀", TT,
          "First find the Earth-frame time, then slow it down.", "T_ship = T_Earth ÷ γ.", "Example: 4 ly at 0.8c: Earth time 10 years, γ = 5/3, ship = 6 years. Now do yours."),
        S(`A ship makes a round trip to a star ${d} light-years away at ${be}c. How many more years pass on Earth than on the ship?`, "⏳", TE - TT,
          "Find both times and subtract.", "Difference = T_Earth − T_Earth ÷ γ.", "Example: 4 ly at 0.8c: 10 − 6 = 4 years. Now do yours."),
        S(`A star is ${d} light-years away. How long does one leg of the trip take at ${be}c in Earth's frame, in years?`, "➡️", d / be,
          "One way is half the round trip.", "t = d ÷ v.", "Example: 6 ly at 0.6c takes 10 years. Now do yours.")
      ].filter(q => cl(q.answer)));
    }),
    les("Gravity and general relativity", [
      ["Equivalence principle", "🛗", "Einstein noticed that you cannot tell the difference between being pulled by gravity and being in an accelerating rocket. Free fall feels weightless. This led to <b>general relativity</b>: mass-energy curves spacetime, and things follow the straightest paths (geodesics) in it."],
      ["Tested predictions", "🧩", "Light bends passing the Sun (seen in the 1919 eclipse). Clocks run slower deeper in a gravitational field (GPS needs this correction). Mercury's orbit slowly precesses. Gravitational waves from merging black holes were detected in 2015."],
      ["Black holes", "🌑", "If enough mass is packed into a small region, an <b>event horizon</b> forms, a boundary inside which nothing, not even light, can get out to the rest of the universe."]
    ], ["Think about what general relativity says gravity actually is.", "Remember tests: light, clocks, orbits and ripples.", "Example: a clock higher in a gravitational field ticks a little faster than one lower down. Now think about yours."], [
      ["According to general relativity, gravity is...", "The curvature of spacetime caused by mass and energy", "A force carried by magnets", "Only an illusion with no effects"],
      ["The equivalence principle says that...", "Gravity and acceleration are locally indistinguishable", "All masses weigh the same", "Light has no mass"],
      ["Clocks deeper in a gravitational field run...", "Slower", "Faster", "At exactly the same rate"],
      ["The 1919 eclipse observations showed that...", "Starlight bends near the Sun", "The Sun is hot", "Planets are round"],
      ["Gravitational waves are...", "Ripples in spacetime", "Sound in air", "Waves of light"],
      ["Which instrument first detected gravitational waves in 2015?", "LIGO", "A telescope with a mirror", "A radio dish"],
      ["The boundary beyond which not even light can escape from a black hole is the...", "Event horizon", "Photosphere", "Corona"],
      ["GPS satellites need relativity corrections because...", "Their clocks tick at a different rate from clocks on the ground", "They are too heavy", "They fly faster than light"]
    ]),
    num("The Boltzmann factor", [
      ["Thermal populations", "🌡️", "In a system at temperature T, the chance of being in a state of energy E is proportional to <b>e^(−E/kT)</b>. For two levels separated by ΔE: <b>N₂/N₁ = (g₂/g₁) e^(−ΔE/kT)</b>, where g is the number of states at each level."],
      ["Using ln 2", "🧩", "If ΔE = m·kT·ln 2, then e^(−ΔE/kT) = 2^(−m). So m = 1 gives ½, m = 2 gives ¼, m = 3 gives ⅛. Raising T makes the ratio approach 1."],
      ["Example", "🧮", "ΔE = 2kT ln 2 and g₂ = g₁: ratio = ¼ = 0.25."]
    ], () => {
      const m = pick([1, 2, 3, 4]), g = pick([1, 2, 3, 4]);
      return pick([
        S(`Two levels have equal degeneracy. Their energy gap is ΔE = ${m} kT ln 2. What is N₂/N₁?`, "🌡️", Math.pow(0.5, m),
          "Use e^(−ΔE/kT) and remember e^(−ln 2) is a simple number.", "The ratio is 2 raised to the power of minus m.", "Example: ΔE = 5 kT ln 2 gives (½)⁵ = 0.03125. Now do yours."),
        S(`The upper level has ${g} times as many states as the lower level, and ΔE = 1 kT ln 2. What is N₂/N₁?`, "🔢", g * 0.5,
          "The degeneracy ratio multiplies the Boltzmann factor.", "N₂/N₁ = (g₂/g₁) × ½.", "Example: g₂/g₁ = 6 with ΔE = 2 kT ln 2 gives 6 × ¼ = 1.5. Now do yours."),
        S(`At some temperature N₂/N₁ = ${Math.pow(0.5, m)} for non-degenerate levels. What is m in ΔE = m kT ln 2?`, "🔎", m,
          "Write the ratio as a power of one half.", "Count how many halvings give that ratio.", "Example: a ratio of 0.0625 is (½)⁴, so m = 4. Now do yours."),
        S("Two non-degenerate levels have ΔE = 2 kT ln 2. What fraction of all particles is in the upper level? (N₂ ÷ (N₁ + N₂))", "🥧", 0.2,
          "First find N₂/N₁ from the Boltzmann factor.", "Fraction = ratio ÷ (1 + ratio).", "Example: a ratio of 1/3 gives (1/3) ÷ (4/3) = 0.25. Now do yours.")
      ].filter(q => q.answer > 0));
    }),
    les("Bosons and fermions", [
      ["Two families", "👥", "Every particle has an intrinsic spin. <b>Fermions</b> (electrons, protons, neutrons) have half-integer spin and obey the <b>Pauli exclusion principle</b>: no two can be in the same state. <b>Bosons</b> (photons, helium-4 atoms) have whole-number spin and can pile into the same state."],
      ["Why it matters", "🧩", "Fermions fill energy levels one by one. At absolute zero the highest filled level is the <b>Fermi energy</b>. This gives electrons in metals their behaviour and holds up white dwarf stars (degeneracy pressure). Bosons produce lasers and the Bose–Einstein condensate."],
      ["Quick rule", "💡", "Half-integer spin (½, 3/2) → fermion → exclusion. Integer spin (0, 1, 2) → boson → can share a state."]
    ], ["Check the spin: whole number or half-integer.", "Fermions obey exclusion; bosons do not.", "Example: an electron has spin ½, so it is a fermion. Now classify yours."], [
      ["An electron has spin ½. It is a...", "Fermion", "Boson", "Photon"],
      ["A photon has spin 1. It is a...", "Boson", "Fermion", "Quark"],
      ["Which particles can all occupy the same quantum state?", "Bosons", "Fermions", "Electrons only"],
      ["What stops a white dwarf star from collapsing?", "Electron degeneracy pressure from the exclusion principle", "Nuclear fusion in the core", "Photons"],
      ["Which of these is a fermion?", "A proton", "A photon", "A helium-4 atom"],
      ["At absolute zero, the highest filled energy level of a gas of fermions is the...", "Fermi energy", "Rest energy", "Ionisation energy"],
      ["A Bose–Einstein condensate forms when many ___ drop into the lowest state.", "Bosons", "Fermions", "Electrons"],
      ["A laser works well because photons are...", "Bosons that can share a state", "Fermions that repel", "Charged"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])),
    mix("Level 30 Challenge", at(c, [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 28: a, 29: b, 30: c });
})();
