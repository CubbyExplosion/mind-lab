// ext/engineer-10-12.js  Engineering levels 10-12 (4th grade second half, 5th grade)
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
    const make = () => { const q = g(); return { text: q.text, visual: q.visual, answer: q.answer, choices: q.choices ? shuf(q.choices) : undefined, hints: q.hints }; };
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

  // ================= LEVEL 10 =================
  const a = [
    les("Inertia", [
      ["Staying the same", "🛋️", "Things that are still stay still, and moving things keep moving in a straight line at the same speed, unless a force acts on them. This is <b>inertia</b> (Newton's first law)."],
      ["Seat belts", "🚗", "When a car stops suddenly, riders keep moving forward because of inertia. A seat belt gives a force that stops them safely."],
      ["More mass", "🚛", "Heavier things have more inertia. A full truck is harder to start and to stop than a bicycle."]
    ], ["Think: does the thing want to keep doing what it is already doing?", "Heavier things resist changes in motion more, and motion goes on until a force acts.", "Example: a cart stops at a wall but the groceries slide forward. Now try yours."], [
      ["🚌§A bus stops suddenly. Riders lean forward because of...", "Inertia", "Magnets", "Echoes"],
      ["Which has MORE inertia?", "A loaded truck", "A bicycle"],
      ["Why do cars have seat belts?", "To stop riders safely when the car stops", "To make the car go faster", "To make the engine quieter"],
      ["A ball rolls on very smooth ice with almost no friction. It will...", "Keep rolling a long way", "Stop right away", "Roll backward"],
      ["Inertia means things keep their motion (or stillness) unless...", "A force acts on them", "The sun sets", "They get painted"],
      ["A tablecloth is yanked fast and the dishes stay put. Why?", "Their inertia keeps them still", "The dishes are glued", "The dishes are lighter than air"],
      ["Which is hardest to stop?", "A heavy train moving fast", "A small ball moving slowly", "A feather floating"],
      ["A moving object far out in space with no forces on it will...", "Keep moving at the same speed", "Stop after a minute", "Turn around"]
    ]),
    les("Force, mass, speeding up", [
      ["Same push", "🛒", "Push a light cart and a heavy cart with the same force. The light cart speeds up more."],
      ["Bigger force", "💪", "A bigger force makes the same cart speed up more."],
      ["The rule", "📏", "How quickly speed changes (<b>acceleration</b>) gets bigger with more force and smaller with more mass. This is Newton's second law."]
    ], ["Compare the force and the mass in the question.", "More force means more speeding up. More mass means less speeding up.", "Example: the same kick sends a soccer ball farther than a bowling ball. Now try yours."], [
      ["The same push is given to a toy car and a real car. Which speeds up more?", "The toy car", "The real car"],
      ["To make a cart speed up faster you can...", "Push harder", "Push more gently", "Add heavy rocks"],
      ["A bigger mass needs ___ force to speed up by the same amount.", "More", "Less", "The same"],
      ["The same cart is pushed with 10 N, then 20 N. Which push speeds it up more?", "The 20 N push", "The 10 N push"],
      ["A rocket burns fuel and gets lighter. With the same engine push it speeds up...", "More", "Less", "Exactly the same"],
      ["Which is easiest to speed up?", "An empty wagon", "A wagon full of bricks", "A wagon with two riders"],
      ["Newton's second law connects force, mass and...", "Acceleration", "Color", "Sound"],
      ["To stop a heavy truck quickly you need...", "A big force", "A tiny force"]
    ]),
    les("Action and reaction", [
      ["Pairs", "🤝", "When one object pushes on another, the second pushes back with an equal force in the opposite direction. This is Newton's third law."],
      ["Rocket", "🚀", "A rocket pushes hot gas down. The gas pushes the rocket up."],
      ["Swimming", "🏊", "A swimmer pushes water backward and the water pushes the swimmer forward."]
    ], ["Every push comes with a push back.", "The push back is equal in size and points the opposite way.", "Example: a skater pushes a wall and rolls away from it. Now try yours."], [
      ["A rocket pushes gas down. The gas pushes the rocket...", "Up", "Down", "Sideways"],
      ["A swimmer pushes water backward, so she moves...", "Forward", "Backward"],
      ["Action and reaction forces are...", "Equal and opposite", "Both in the same direction", "Always very different in size"],
      ["You jump from a small boat toward the dock. The boat moves...", "Backward", "Forward", "Not at all"],
      ["A balloon lets air rush out of its back. The balloon moves...", "Forward, away from the air", "Backward, with the air"],
      ["When you push on a wall, the wall...", "Pushes you back", "Does nothing", "Pulls you in"],
      ["When you walk, your foot pushes the ground backward and the ground pushes you...", "Forward", "Backward", "Straight down only"],
      ["Newton's third law is about...", "Pairs of forces", "Colors of light", "Heat and cold"]
    ]),
    gen("Mass and weight", [
      ["Mass", "⚖️", "<b>Mass</b> is how much stuff an object is made of. It is measured in kilograms (kg) and does not change when you travel."],
      ["Weight", "🌍", "<b>Weight</b> is the force of gravity on a mass, measured in newtons (N). On Earth each 1 kg weighs about 10 N."],
      ["The Moon", "🌙", "Moon gravity is about one sixth of Earth's. Your mass stays the same, but you weigh less there."]
    ], () => {
      const m = ri(2, 30);
      return pick([
        { text: `A robot has a mass of ${m} kg. About how many newtons does it weigh on Earth? (Use 10 N for each kg.)`, visual: "🤖", answer: m * 10, hints: ["Weight is a force measured in newtons.", "Multiply the mass by the weight of each kilogram.", "Example: a 4 kg bag weighs about 4 x 10 = 40 N. Now do yours."] },
        { text: `A rover weighs ${m * 10} N on Earth. What is its mass in kg? (Use 10 N for each kg.)`, visual: "🛞", answer: m, hints: ["Go backward from weight to mass.", "Divide the weight by the newtons in each kilogram.", "Example: a 90 N box has a mass of 90 / 10 = 9 kg. Now do yours."] },
        { text: `A rover has a mass of ${m * 10} kg on Earth. On the Moon its mass is...`, visual: "🌙", choices: [`${m * 10} kg`, `${Math.round(m * 10 / 6)} kg`, `${m * 60} kg`], answer: `${m * 10} kg`, hints: ["Is mass the amount of stuff, or the pull of gravity?", "Moving to another place changes the pull of gravity but not the amount of stuff.", "Example: an astronaut who has 70 kg of mass on Earth still has that mass on Mars. Now try yours."] }
      ]);
    }),
    les("Drag and air resistance", [
      ["Air pushes back", "💨", "Air and water push against anything moving through them. This force is called <b>drag</b> (air resistance)."],
      ["Streamlined", "🐟", "A smooth, pointed, <b>streamlined</b> shape has less drag. That is why fish, planes and race cars have smooth curves."],
      ["Using drag", "🪂", "Sometimes engineers want lots of drag. A parachute is wide to catch air and make you fall slowly."]
    ], ["Drag is a force from air or water pushing back.", "Smooth shapes slip through easier. Wide, flat shapes catch more air.", "Example: a flat sheet of paper falls slower than the same sheet squashed into a ball. Now try yours."], [
      ["Drag is a force that...", "Pushes against moving things", "Makes things glow", "Makes things heavier"],
      ["Which shape has the LEAST drag?", "A smooth pointed shape", "A flat wide board", "A big open box"],
      ["Why is a parachute wide?", "To catch lots of air and slow the fall", "To look colorful", "To weigh more"],
      ["Race cars have smooth curved bodies to...", "Reduce drag", "Add drag", "Make them heavier"],
      ["A cyclist crouches low to...", "Cut down air resistance", "Get more air pushing", "Slow down"],
      ["A flat sheet of paper and the same paper crumpled are dropped. Which falls faster?", "The crumpled ball", "The flat sheet"],
      ["Drag from water on a boat hull can be lowered by a...", "Smooth, pointed hull shape", "Wide flat front", "Bumpy rough hull"],
      ["Which uses drag ON PURPOSE?", "A parachute", "A race car", "A dolphin"]
    ]),
    gen("Work = force x distance", [
      ["Work", "🏋️", "In science, <b>work</b> is done when a force moves something. Work = force × distance. The unit is the <b>joule</b> (J)."],
      ["Example", "📦", "Pushing a box with 20 N for 3 m does 20 × 3 = 60 J of work."],
      ["No move, no work", "🧱", "Pushing on a wall that does not move does no work, because the distance moved is zero."]
    ], () => {
      const F = ri(2, 20), d = ri(2, 12), W = F * d;
      return pick([
        { text: `A robot pushes a crate with ${F} N of force for ${d} m. How many joules of work is that?`, visual: "🤖", answer: W, hints: ["Work depends on both the force and the distance moved.", "Multiply the force by the distance. The unit is the joule.", "Example: 6 N of force for 4 m is 6 x 4 = 24 J. Now do yours."] },
        { text: `A motor does ${W} J of work using a force of ${F} N. How many meters did it move the load?`, visual: "⚙️", answer: d, hints: ["Work = force x distance, so the distance is the missing piece.", "Undo the multiplication: divide the work by the force.", "Example: 40 J of work with 8 N means 40 / 8 = 5 m. Now do yours."] },
        { text: `Lifting a box took ${W} J of work over ${d} m. How many newtons of force were used?`, visual: "📦", answer: F, hints: ["Work = force x distance, so the force is the missing piece.", "Undo the multiplication: divide the work by the distance.", "Example: 36 J of work over 4 m means 36 / 4 = 9 N. Now do yours."] }
      ]);
    }),
    gen("Power", [
      ["Power", "⚡", "<b>Power</b> tells how fast work is done or energy is used. Power = work ÷ time. The unit is the <b>watt</b> (W): 1 watt means 1 joule each second."],
      ["Example", "🔧", "A machine does 100 J of work in 5 s. Power = 100 ÷ 5 = 20 W."],
      ["Bulbs", "💡", "A 10 W bulb uses 10 J of energy every second. A 60 W bulb uses energy six times as fast."]
    ], () => {
      const P = ri(3, 30), t = ri(2, 10), W = P * t;
      return pick([
        { text: `A machine does ${W} J of work in ${t} seconds. What is its power in watts?`, visual: "🏭", answer: P, hints: ["Power says how much work is done each second.", "Divide the work by the time.", "Example: 90 J in 6 s is 90 / 6 = 15 W. Now do yours."] },
        { text: `A ${P} W motor runs for ${t} seconds. How many joules of energy does it use?`, visual: "🔌", answer: W, hints: ["A watt is one joule for every second.", "Multiply the power by the time.", "Example: a 8 W lamp for 5 s uses 8 x 5 = 40 J. Now do yours."] },
        { text: `A heater uses ${W} J of energy and its power is ${P} W. For how many seconds did it run?`, visual: "🔥", answer: t, hints: ["Energy = power x time, so the time is missing.", "Divide the energy by the power.", "Example: 60 J at 12 W lasts 60 / 12 = 5 s. Now do yours."] }
      ]);
    }),
    les("Volts, amps and ohms", [
      ["Voltage", "🔋", "<b>Voltage</b> (volts, V) is the push that moves electric charge, like water pressure in a pipe."],
      ["Current", "🌊", "<b>Current</b> (amps, A) is how much charge flows past each second, like how much water flows."],
      ["Resistance", "🚧", "<b>Resistance</b> (ohms) tells how much a part slows the flow. A thin wire has more resistance than a thick wire of the same material."]
    ], ["Match the word to its job: push, flow or slowing.", "Volts push, amps flow, ohms resist.", "Example: in a water pipe the pump pressure is like voltage and the water per second is like current. Now try yours."], [
      ["Voltage is the...", "Push that moves charge", "Color of the wire", "Weight of the battery"],
      ["Current is measured in...", "Amps", "Volts", "Ohms"],
      ["Resistance is measured in...", "Ohms", "Amps", "Watts"],
      ["In the water-pipe comparison, voltage is like...", "Water pressure", "Pipe color", "Pipe name"],
      ["A bigger battery voltage pushes ___ current through the same part.", "More", "Less"],
      ["Compared to a thick wire, a thin wire of the same material has...", "More resistance", "Less resistance"],
      ["Which unit goes with the push of a battery?", "Volts", "Amps", "Ohms"],
      ["Resistance slows the...", "Flow of current", "Color of the wire", "Label on the battery"]
    ]),
    les("Electromagnets", [
      ["Make one", "🧲", "Wrap wire around an iron nail and connect a battery. Electric current makes the nail a magnet. This is an <b>electromagnet</b>."],
      ["Stronger", "➕", "More coils of wire, or more current, make an electromagnet stronger."],
      ["On and off", "🔘", "Switch the current off and the magnetism goes away. Junkyard cranes use this to pick up and drop scrap iron."]
    ], ["An electromagnet needs electric current.", "Coils and current set its strength. No current, no magnet.", "Example: a crane magnet lifts a car, then the driver switches it off to let go. Now try yours."], [
      ["An electromagnet works only when...", "Current flows in the wire", "It is painted", "It is very cold"],
      ["Which makes an electromagnet stronger?", "More coils of wire", "Fewer coils", "Cutting the wire"],
      ["A crane drops scrap iron by...", "Switching off the current", "Switching on more current", "Shaking it"],
      ["The core of a simple electromagnet is usually...", "An iron nail", "A wooden stick", "A rubber band"],
      ["A bigger battery gives the electromagnet...", "More current and more strength", "Less strength"],
      ["What can an electromagnet do that a normal magnet cannot?", "Turn on and off", "Pick up iron", "Have two poles"],
      ["Which is attracted to an electromagnet?", "A steel paper clip", "A plastic spoon", "A wooden block"],
      ["Electromagnets are used in...", "Electric doorbells and motors", "Rubber balls", "Paper cups"]
    ]),
    les("Motors and generators", [
      ["Motor", "🌀", "An electric <b>motor</b> turns electrical energy into motion using magnets and coils of wire."],
      ["Generator", "💡", "A <b>generator</b> does the opposite: it turns motion into electrical energy when a magnet spins near a coil."],
      ["Where", "🌬️", "Wind turbines and hydro dams spin generators. Fans, drills and toy cars use motors."]
    ], ["Ask: does it start with electricity, or end with electricity?", "Motor: electricity in, motion out. Generator: motion in, electricity out.", "Example: a bike light powered by the spinning wheel is a generator. Now try yours."], [
      ["A motor turns electricity into...", "Motion", "Water", "Paper"],
      ["A generator turns motion into...", "Electricity", "Steel", "Wind"],
      ["A wind turbine spins a...", "Generator", "Motor for a fan"],
      ["An electric fan uses a...", "Motor", "Generator"],
      ["A hand-crank flashlight that makes its own light uses a...", "Generator", "Motor"],
      ["A hydro dam uses falling water to turn a...", "Generator", "Battery"],
      ["A toy car with batteries uses a...", "Motor", "Generator"],
      ["Both motors and generators use...", "Magnets and coils of wire", "Only batteries", "Only water"]
    ]),
    gen("Conditions with numbers", [
      ["Test", "❓", "A program checks a <b>condition</b> like <b>temperature &gt; 30</b>. The test is true or false."],
      ["If and else", "🔀", "If the test is true, the program does the <b>then</b> part. If it is false, it does the <b>else</b> part."],
      ["And", "🤝", "With <b>and</b>, both tests must be true for the then part to run."]
    ], () => {
      const [name, act, alt] = pick([["temperature", "Fan ON", "Fan OFF"], ["light level", "Lamp ON", "Lamp OFF"], ["distance", "Robot STOPS", "Robot GOES"], ["battery level", "Charging", "Not charging"]]);
      const T = ri(10, 60);
      if (Math.random() < 0.5) {
        const op = pick([">", "<"]), x = pick([T - ri(1, 9), T + ri(1, 9)]), tru = op === ">" ? x > T : x < T;
        return { text: `Rule: if ${name} ${op} ${T} then "${act}" else "${alt}". The ${name} is ${x}. What happens?`, visual: "💻", choices: [act, alt], answer: tru ? act : alt, hints: ["First work out if the test is true or false for this number.", "True means do the then part. False means do the else part.", "Example: if speed > 10 then GO else WAIT, and the speed is 4. The test is false, so the else part runs. Now do yours."] };
      }
      const U = ri(5, 20), x = pick([T - ri(1, 9), T + ri(1, 9)]), y = pick([U - ri(1, 4), U + ri(1, 4)]), tru = x > T && y < U;
      return { text: `Rule: if ${name} > ${T} and speed < ${U} then "${act}" else "${alt}". The ${name} is ${x} and the speed is ${y}. What happens?`, visual: "💻", choices: [act, alt], answer: tru ? act : alt, hints: ["Check each test on its own.", "With and, BOTH tests must be true for the then part. If either is false, use else.", "Example: if a > 5 and b < 3, with a = 8 and b = 9: the first is true but the second is false, so else runs. Now do yours."] };
    }),
    gen("Lists", [
      ["A list", "📋", "A <b>list</b> stores many items in order, like [\"gear\", \"motor\", \"wheel\"]. Each item has a place number called its <b>index</b>."],
      ["Start at 0", "0️⃣", "In many programming languages the first item has index <b>0</b>, the next is 1, and so on."],
      ["Length", "📏", "The <b>length</b> of a list is how many items it has. The last index is always one less than the length."]
    ], () => {
      const parts = ["gear", "motor", "wheel", "sensor", "wire", "battery", "switch", "lamp", "spring", "axle"];
      const n = ri(4, 6), L = shuf(parts).slice(0, n), i = ri(0, n - 1);
      const lt = `list = [${L.map(x => '"' + x + '"').join(", ")}]`;
      return pick([
        { text: `${lt}. Counting from 0, which item is at index ${i}?`, visual: "📋", choices: shuf([L[i], ...shuf(L.filter((_, j) => j !== i)).slice(0, 2)]), answer: L[i], hints: ["Remember the first item is index zero, not one.", "Count along the list, starting at zero, until you reach the index.", "Example: in [\"a\", \"b\", \"c\", \"d\"], index 2 is \"c\" because a = 0, b = 1, c = 2. Now do yours."] },
        { text: `${lt}. Counting from 0, what is the index of "${L[i]}"?`, visual: "📋", answer: i, hints: ["Start counting at zero for the first item.", "Count how many items come before it.", "Example: in [\"x\", \"y\", \"z\"], \"z\" has two items before it, so its index is 2. Now do yours."] },
        { text: `${lt}. How many items are in the list (its length)?`, visual: "📋", answer: n, hints: ["Length means how many items there are.", "Count every item once.", "Example: [\"a\", \"b\", \"c\"] has a length of 3. Now do yours."] }
      ]);
    }),
    gen("Coordinates and robot moves", [
      ["Grid", "🗺️", "A point on a grid is written (x, y). <b>x</b> says how far across, <b>y</b> says how far up."],
      ["Moving", "🤖", "Right adds to x, left subtracts from x. Up adds to y, down subtracts from y."],
      ["Order", "📍", "Always write x first, then y. (3, 1) is not the same place as (1, 3)."]
    ], () => {
      let x = ri(1, 5), y = ri(1, 5);
      const sx = x, sy = y, mv = [];
      for (let k = 0; k < 3; k++) {
        const s = ri(1, 3), opts = ["right", "up"];
        if (x - s >= 0) opts.push("left");
        if (y - s >= 0) opts.push("down");
        const d = pick(opts);
        if (d === "right") x += s; else if (d === "left") x -= s; else if (d === "up") y += s; else y -= s;
        mv.push(`${d} ${s}`);
      }
      const fmt = (p, q) => `x=${p}, y=${q}`;
      const cs = [];
      [fmt(x, y), fmt(y, x), fmt(x + 1, y), fmt(x, y + 1), fmt(x + 2, y + 1)].forEach(c => { if (!cs.includes(c)) cs.push(c); });
      return { text: `A robot starts at (${sx}, ${sy}). It moves ${mv.join(", then ")}. Where does it end? (x is across, y is up)`, visual: "🤖", choices: cs.slice(0, 4).includes(fmt(x, y)) ? cs.slice(0, 4) : [fmt(x, y), ...cs.slice(1, 4)], answer: fmt(x, y), hints: ["Track x and y separately.", "Right and left change x. Up and down change y.", "Example: from (0, 7), right 2 and down 3 gives (2, 4). Now do yours."] };
    }),
    gen("Angles in designs", [
      ["Triangle", "📐", "The three angles inside any triangle add up to <b>180°</b>."],
      ["Straight line", "➖", "Angles that sit together on a straight line add up to <b>180°</b>."],
      ["Right angle", "⌊", "A right angle is <b>90°</b>, like a square corner. Two angles that make a right angle add up to 90°."]
    ], () => {
      return pick([
        (() => { const p = ri(30, 80), q = ri(30, 80); return { text: `A truss triangle has angles of ${p}° and ${q}°. What is the third angle in degrees?`, visual: "📐", answer: 180 - p - q, hints: ["All three angles of a triangle share a total.", "Add the two known angles, then take that from the total.", "Example: angles 50° and 60° make 110°. The third angle is 180 - 110 = 70°. Now do yours."] }; })(),
        (() => { const p = ri(20, 160); return { text: `Two angles sit side by side on a straight line. One is ${p}°. How big is the other angle?`, visual: "➖", answer: 180 - p, hints: ["Angles on a straight line share a total.", "Take the known angle away from the total for a straight line.", "Example: if one angle is 100°, the other is 180 - 100 = 80°. Now do yours."] }; })(),
        (() => { const p = ri(10, 80); return { text: `A corner brace makes a right angle. One part is ${p}°. How big is the other part?`, visual: "⌊", answer: 90 - p, hints: ["A right angle is a special size.", "Take the known angle away from the right-angle total.", "Example: if one part is 35°, the other is 90 - 35 = 55°. Now do yours."] }; })()
      ]);
    }),
    gen("Fractions of a measurement", [
      ["Part of a whole", "🪚", "To find a fraction of a length, split the whole into equal parts (the bottom number), then take some of them (the top number)."],
      ["Example", "📏", "3/4 of 24 cm: 24 ÷ 4 = 6 cm for each part, and 3 parts is 6 × 3 = 18 cm."],
      ["What is left", "✂️", "If you cut off 3/4, the rest is 24 − 18 = 6 cm. Or it is the other 1/4."]
    ], () => {
      const d = pick([2, 3, 4, 5, 8]), n = ri(1, d - 1), whole = d * ri(2, 10), part = whole / d * n;
      const unit = pick(["cm", "m"]);
      return pick([
        { text: `A board is ${whole} ${unit} long. You cut ${n}/${d} of it. How long is the piece you cut?`, visual: "🪚", answer: part, hints: ["Split the board into equal parts first.", "Divide by the bottom number, then multiply by the top number.", "Example: 2/5 of 30 cm: 30 / 5 = 6, then 6 x 2 = 12 cm. Now do yours."] },
        { text: `A board is ${whole} ${unit} long. You cut off ${n}/${d} of it. How long is the part that is left?`, visual: "📏", answer: whole - part, hints: ["First find how long the cut piece is.", "Then take the cut piece away from the whole board.", "Example: a 20 cm board with 1/4 cut off: 20 / 4 = 5 cm cut, 20 - 5 = 15 cm left. Now do yours."] }
      ]);
    }),
    gen("Changing units", [
      ["Bigger to smaller", "🔁", "Going from a big unit to a small unit gives a bigger number, so <b>multiply</b>. 1 m = 100 cm, 1 cm = 10 mm, 1 km = 1000 m, 1 kg = 1000 g."],
      ["Smaller to bigger", "🔂", "Going from a small unit to a big unit gives a smaller number, so <b>divide</b>. 300 cm ÷ 100 = 3 m."],
      ["Check", "✅", "Ask: is the new unit smaller (more of them) or bigger (fewer of them)? That tells you whether to multiply or divide."]
    ], () => {
      const pairs = [["m", "cm", 100], ["cm", "mm", 10], ["km", "m", 1000], ["kg", "g", 1000], ["m", "mm", 1000]];
      const exs = ["3 km = 3 x 1000 = 3000 m", "4 m = 4 x 100 = 400 cm", "5 kg = 5 x 1000 = 5000 g", "6 cm = 6 x 10 = 60 mm", "2 m = 2 x 1000 = 2000 mm"];
      const exr = ["8000 m = 8000 / 1000 = 8 km", "700 cm = 700 / 100 = 7 m", "9000 g = 9000 / 1000 = 9 kg", "50 mm = 50 / 10 = 5 cm", "6000 mm = 6000 / 1000 = 6 m"];
      const k = ri(0, 4), [big, small, f] = pairs[k], v = ri(2, 9), nx = (k + 1) % 5;
      if (Math.random() < 0.5) return { text: `Change ${v} ${big} into ${small}.`, visual: "📏", answer: v * f, hints: [`Is ${small} a bigger or a smaller unit than ${big}?`, "Smaller units mean more of them, so multiply by how many fit in the big unit.", `Example: ${exs[nx]}. Now do yours.`] };
      return { text: `Change ${v * f} ${small} into ${big}.`, visual: "📏", answer: v, hints: [`Is ${big} a bigger or a smaller unit than ${small}?`, "Bigger units mean fewer of them, so divide by how many small ones fit in a big one.", `Example: ${exr[nx]}. Now do yours.`] };
    }),
    les("Hydraulics", [
      ["Liquid pushes", "💧", "A liquid cannot be squeezed into a smaller space. In a closed tube, a push on the liquid at one end is passed along to the other end."],
      ["Small to big", "🔼", "A small piston pushing into a big piston makes a bigger force. But the small piston has to move farther."],
      ["Uses", "🚜", "Car brakes, car lifts and the arms of diggers use <b>hydraulics</b>."]
    ], ["Think of liquid in a sealed tube passing a push along.", "The push moves through the liquid. A bigger piston area gives a bigger force.", "Example: a garage car lift uses a small push on a small piston to raise a car on a big piston. Now try yours."], [
      ["Hydraulic systems use...", "A liquid in a closed tube", "Only gears", "Only magnets"],
      ["Why is liquid used in hydraulics?", "It cannot be squeezed into less space", "It is colorful", "It is light as air"],
      ["Which uses hydraulics?", "A digger's arm", "A pencil", "A paper plane"],
      ["A small piston pushes a big piston. The big piston gets a...", "Bigger force", "Smaller force"],
      ["To get a bigger force, the small piston must move...", "A longer distance", "A shorter distance"],
      ["Car brakes use hydraulics to...", "Pass your foot push to the wheels", "Make the car louder", "Heat the tires"],
      ["A hydraulic car lift is used to...", "Raise a heavy car with a small push", "Wash the car", "Paint the car"],
      ["Hydraulic fluid in a closed tube...", "Passes a push along", "Soaks into the walls", "Makes the push disappear"]
    ]),
    les("Strong beam shapes", [
      ["Bending", "🪵", "When a beam bends, its top is squeezed and its bottom is stretched. The material at the top and bottom does the most work."],
      ["I-beam", "🏗️", "An <b>I-beam</b> puts most of the steel in a flat top and a flat bottom, joined by a thin middle. It is strong but light."],
      ["Deeper is stronger", "📏", "A tall, deep beam bends less than a flat one made of the same material. Stand a plank on its edge and it is much stiffer."]
    ], ["Think about where a beam is squeezed and stretched most.", "Material far from the middle helps the most, and a taller beam bends less.", "Example: a ruler bends easily when laid flat but hardly bends when stood on its thin edge. Now try yours."], [
      ["An I-beam has its steel mostly in the...", "Top and bottom flanges", "Middle only", "Corners only"],
      ["Why use an I-beam instead of a solid block?", "Strong but lighter and cheaper", "It is heavier", "It looks like a letter"],
      ["A plank is stiffer when it is placed...", "On its edge (tall)", "Lying flat"],
      ["When a beam bends down in the middle, its bottom is...", "Stretched", "Squeezed"],
      ["When a beam bends down in the middle, its top is...", "Squeezed", "Stretched"],
      ["Making a beam deeper (taller) makes it bend...", "Less", "More", "The same"],
      ["Which beam shape saves steel but keeps strength?", "I-beam", "Solid square block", "Flat sheet"],
      ["I-beams are often used in...", "Building frames and bridges", "Paper clips", "Shoelaces"]
    ]),
    null, null
  ];
  a[18] = mix("Mixed practice", at(a, [0, 2, 3, 5, 7, 9, 11, 13, 15]));
  a[19] = mix("Level 10 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 11 =================
  const b = [
    gen("Pressure", [
      ["Pressure", "📍", "<b>Pressure</b> = force ÷ area. The unit is the pascal (Pa), which is 1 newton on each square meter."],
      ["Small area", "📌", "The same force on a small area makes a big pressure. That is why a pin pushes in easily but a flat hand does not."],
      ["Spread it out", "👟", "Snowshoes and wide tires spread a force over a big area, so the pressure is low and they do not sink."]
    ], () => {
      const A = pick([2, 4, 5, 10]), P = ri(3, 30), F = P * A;
      return pick([
        { text: `A force of ${F} N pushes on an area of ${A} square meters. What is the pressure in pascals?`, visual: "📍", answer: P, hints: ["Pressure compares the force to the area it is spread over.", "Divide the force by the area.", "Example: 60 N on 4 square meters is 60 / 4 = 15 Pa. Now do yours."] },
        { text: `The pressure is ${P} Pa over an area of ${A} square meters. What is the force in newtons?`, visual: "🔩", answer: F, hints: ["Pressure = force / area, so work backward.", "Multiply the pressure by the area.", "Example: 8 Pa on 5 square meters means 8 x 5 = 40 N. Now do yours."] },
        { text: "The same force is pressed on a big area, then on a tiny area. Where is the pressure bigger?", visual: "📌", choices: ["The tiny area", "The big area", "It is the same"], answer: "The tiny area", hints: ["Pressure = force divided by area.", "Dividing by a smaller number gives a bigger result.", "Example: a sharp knife cuts better than a blunt one because its edge is thinner. Now try yours."] },
        { text: "Why do snowshoes stop you sinking into snow?", visual: "🥾", choices: ["They spread your weight over a bigger area", "They make you lighter", "They warm the snow"], answer: "They spread your weight over a bigger area", hints: ["Think about force and area.", "Your weight stays the same, so change the area.", "Example: a wide tractor tire sinks less in mud than a thin bike tire. Now try yours."] }
      ]);
    }),
    gen("Density", [
      ["Density", "🧱", "<b>Density</b> = mass ÷ volume. It tells how much stuff is packed into a space. Units: g per cm³."],
      ["Water", "💧", "Water has a density of 1 g per cm³. Things with a density below 1 float in water. Things above 1 sink."],
      ["Example", "🔢", "A block with a mass of 40 g and a volume of 10 cm³ has a density of 40 ÷ 10 = 4 g per cm³."]
    ], () => {
      const d = ri(2, 9), v = pick([2, 3, 4, 5, 10]);
      const fl = pick([0.3, 0.5, 0.8, 0.9]), sk = pick([1.5, 2, 2.7, 7.8, 8.9]), isF = Math.random() < 0.5, dens = isF ? fl : sk;
      return pick([
        { text: `A block has a mass of ${d * v} g and a volume of ${v} cm³. What is its density in g per cm³?`, visual: "🧱", answer: d, hints: ["Density compares mass to volume.", "Divide the mass by the volume.", "Example: 36 g in 9 cm³ is 36 / 9 = 4 g per cm³. Now do yours."] },
        { text: `A metal has a density of ${d} g per cm³. How many grams does ${v} cm³ of it have?`, visual: "⚖️", answer: d * v, hints: ["Density tells the mass of each cm³.", "Multiply the density by the number of cm³.", "Example: 3 g per cm³ for 5 cm³ is 3 x 5 = 15 g. Now do yours."] },
        { text: `An object has a density of ${dens} g per cm³. Water is 1 g per cm³. Will it float or sink in water?`, visual: "🌊", choices: ["Float", "Sink"], answer: isF ? "Float" : "Sink", hints: ["Compare the object's density to the density of water.", "Less dense than water floats. More dense than water sinks.", "Example: oil at 0.9 g per cm³ floats on water; iron at 7.8 sinks. Now try yours."] }
      ]);
    }),
    les("Buoyancy and ships", [
      ["Pushing up", "🛟", "Water pushes up on anything in it. This upward push is called <b>buoyancy</b>."],
      ["Why ships float", "🚢", "A steel ship floats because it is hollow and filled with air. Its average density is less than water, so the upward push can hold it up."],
      ["Submarines", "🌊", "A submarine fills <b>ballast tanks</b> with water to sink and with air to rise."]
    ], ["Think about water pushing up on the object.", "An object floats when the upward push equals its weight, which happens when it is less dense overall.", "Example: a clay ball sinks but a clay boat shape floats because it holds air. Now try yours."], [
      ["Buoyancy is a ___ push from water.", "Upward", "Downward", "Sideways"],
      ["Why does a big steel ship float?", "It is hollow, so its average density is low", "Steel is lighter than water", "It is painted"],
      ["A submarine dives by filling its ballast tanks with...", "Water", "Air", "Sand"],
      ["A submarine rises by filling its ballast tanks with...", "Air", "Water", "Metal"],
      ["Loading cargo on a boat makes it sit...", "Lower in the water", "Higher in the water", "The same"],
      ["A flat ball of clay sinks. Shaping it into a hollow boat makes it...", "Float", "Sink faster"],
      ["A life jacket helps you float because it is...", "Full of light, low-density material", "Very heavy", "Made of metal"],
      ["Which pushes up on a boat?", "The water", "The wind only", "The sand"]
    ]),
    les("Three ways heat moves", [
      ["Conduction", "🥄", "<b>Conduction</b> is heat moving through touching things. A metal spoon in hot soup heats up all the way to the handle."],
      ["Convection", "♨️", "<b>Convection</b> is heat carried by moving liquid or gas. Warm air rises and cool air sinks, making a circle."],
      ["Radiation", "☀️", "<b>Radiation</b> is heat traveling as rays, even through empty space. That is how the Sun warms the Earth."]
    ], ["Ask: touching, moving fluid, or rays?", "Conduction needs touching. Convection needs moving air or liquid. Radiation needs nothing between.", "Example: warmth you feel from a campfire across the yard is a ray from the fire. Now try yours."], [
      ["A metal spoon gets hot in soup by...", "Conduction", "Convection", "Radiation"],
      ["Warm air rising in a room is...", "Convection", "Conduction", "Radiation"],
      ["The Sun warms Earth across empty space by...", "Radiation", "Conduction", "Convection"],
      ["Heat moving through touching solid parts is...", "Conduction", "Radiation"],
      ["Boiling water circulating in a pot, hot rising and cool sinking, is...", "Convection", "Conduction"],
      ["The warmth you feel standing near a fire without touching it is mostly...", "Radiation", "Conduction"],
      ["Heat always moves from...", "Hot things to cooler things", "Cool things to hotter things", "Nowhere"],
      ["Which needs NO matter to carry the heat?", "Radiation", "Conduction", "Convection"]
    ]),
    les("Insulation", [
      ["Slow the heat", "🧣", "<b>Insulation</b> slows the movement of heat. Materials with trapped air, like wool, foam and fiberglass, are good insulators."],
      ["Conductors", "🍳", "Metals let heat flow easily, so they are good <b>conductors</b>. Pots have metal bottoms but plastic or wooden handles."],
      ["Examples", "🏠", "Walls with insulation keep a house warm in winter and cool in summer. A thermos uses a gap with almost no air to slow heat."]
    ], ["Decide: should the heat move easily or slowly here?", "Trapped air and foam slow heat. Metal lets heat pass quickly.", "Example: a wool hat keeps your head warm because trapped air slows heat leaving. Now try yours."], [
      ["Which is the best insulator?", "Foam", "Copper", "Iron"],
      ["Why do pots have plastic handles?", "Plastic does not conduct heat well", "Plastic is shiny", "Plastic is heavy"],
      ["Insulation in house walls helps keep the house...", "Warm in winter and cool in summer", "Wet", "Noisy"],
      ["Trapped air is useful in insulation because it...", "Slows heat movement", "Speeds up heat", "Makes metal"],
      ["Which material conducts heat well?", "Aluminum", "Wool", "Foam"],
      ["A thermos keeps drinks hot using a gap that is...", "Nearly empty of air", "Full of metal", "Full of water"],
      ["A winter coat keeps you warm by...", "Trapping air to slow heat loss", "Making heat", "Pulling in cold"],
      ["A cooking spoon handle is wood because wood is a...", "Poor conductor of heat", "Good conductor of heat"]
    ]),
    les("Things grow when hot", [
      ["Expansion", "🔥", "Most materials get slightly bigger when they get hotter. This is <b>thermal expansion</b>. They shrink a little when cooled."],
      ["Gaps", "🌉", "Engineers leave small gaps in bridges, sidewalks and railway tracks so they have room to expand on hot days and do not buckle."],
      ["Thermometers", "🌡️", "Liquid in a thermometer expands when it warms and rises up the tube."]
    ], ["Ask: what do most materials do when they get hotter?", "They grow a tiny bit, so designs need room for it.", "Example: a metal jar lid is stuck, but running it under hot water makes it expand and loosen. Now try yours."], [
      ["Most materials get ___ when heated.", "Slightly bigger", "Slightly smaller", "Lighter in color"],
      ["Why are there gaps in railway tracks?", "To give room for expansion", "To save steel", "For wheels to jump"],
      ["Bridges have expansion joints to...", "Let the bridge grow and shrink with heat", "Make noise", "Hold paint"],
      ["The liquid in a thermometer rises when warm because it...", "Expands", "Shrinks", "Evaporates away"],
      ["Power lines hang lower on a hot day because the wire...", "Expands and gets longer", "Gets thinner and lighter", "Turns into rope"],
      ["If a long metal pipe had no room to expand in the heat, it might...", "Bend or buckle", "Shrink away", "Stay perfect"],
      ["When a metal object cools it...", "Shrinks a little", "Grows a lot"],
      ["A tight jar lid can sometimes be loosened by...", "Running it under hot water", "Putting it in ice"]
    ]),
    gen("Ohm's law", [
      ["The law", "🔌", "<b>Ohm's law</b>: voltage = current × resistance, or <b>V = I × R</b>. Volts, amps, ohms."],
      ["Rearrange", "🔄", "Current: I = V ÷ R. Resistance: R = V ÷ I. Cover the one you want and see what is left."],
      ["Example", "🔢", "A 12 V battery and a 4 ohm part give a current of 12 ÷ 4 = 3 A."]
    ], () => {
      const R = pick([2, 3, 4, 5, 6, 10]), I = ri(1, 6), V = R * I;
      return pick([
        { text: `A circuit has a current of ${I} amps through a ${R} ohm resistor. How many volts is the battery?`, visual: "🔋", answer: V, hints: ["Volts come from current and resistance together.", "Multiply the current by the resistance.", "Example: 3 A through 5 ohms needs 3 x 5 = 15 V. Now do yours."] },
        { text: `A ${V} V battery is connected to a ${R} ohm resistor. How many amps flow?`, visual: "🔌", answer: I, hints: ["Current is the volts shared by the resistance.", "Divide the voltage by the resistance.", "Example: 20 V across 4 ohms gives 20 / 4 = 5 A. Now do yours."] },
        { text: `A ${V} V battery pushes ${I} amps through a part. What is the resistance in ohms?`, visual: "🚧", answer: R, hints: ["Resistance tells how much the part holds back current.", "Divide the voltage by the current.", "Example: 18 V and 3 A means 18 / 3 = 6 ohms. Now do yours."] }
      ]);
    }),
    les("Resistors and LEDs", [
      ["Resistor", "🟫", "A <b>resistor</b> limits the current in a circuit. Its value is in ohms. More ohms means less current."],
      ["LED", "💡", "An <b>LED</b> is a tiny light that glows with little power. It only works one way: the longer leg goes to the positive (+) side."],
      ["Protect it", "🛡️", "An LED needs a resistor in series. Without it too much current flows and the LED can burn out."]
    ], ["Think about what limits the current.", "A resistor protects the LED, and an LED has a correct direction.", "Example: a garden hose nozzle limits water, like a resistor limits current. Now try yours."], [
      ["A resistor is used to...", "Limit the current", "Make electricity", "Store light"],
      ["An LED in a circuit usually needs a...", "Resistor", "Magnet", "Spring"],
      ["Which has MORE resistance?", "A 1000 ohm resistor", "A 10 ohm resistor"],
      ["More resistance in a circuit means ___ current.", "Less", "More"],
      ["The longer leg of an LED goes to the...", "Positive (+) side", "Negative (-) side"],
      ["An LED connected without a resistor may...", "Burn out", "Taste sweet", "Float"],
      ["An LED works in...", "Only one direction", "Both directions equally"],
      ["Resistance is measured in...", "Ohms", "Volts", "Joules"]
    ]),
    gen("Electric power: P = V x I", [
      ["Formula", "⚡", "Electric power in watts = volts × amps. <b>P = V × I</b>."],
      ["Example", "🔌", "A 12 V device that draws 3 A uses 12 × 3 = 36 W."],
      ["Rearrange", "🔄", "Current: I = P ÷ V. Voltage: V = P ÷ I."]
    ], () => {
      const V = pick([3, 5, 6, 9, 12]), I = ri(2, 6), P = V * I;
      return pick([
        { text: `A motor runs on ${V} volts and draws ${I} amps. How many watts is it using?`, visual: "🔌", answer: P, hints: ["Power combines the push and the flow.", "Multiply the volts by the amps.", "Example: 10 V and 4 A is 10 x 4 = 40 W. Now do yours."] },
        { text: `A ${V} V lamp uses ${P} watts. How many amps does it draw?`, visual: "💡", answer: I, hints: ["Power = volts x amps, so amps is the missing piece.", "Divide the power by the volts.", "Example: 60 W at 12 V draws 60 / 12 = 5 A. Now do yours."] },
        { text: `A device uses ${P} watts and draws ${I} amps. How many volts does it run on?`, visual: "🔋", answer: V, hints: ["Power = volts x amps, so volts is the missing piece.", "Divide the power by the amps.", "Example: 36 W with 4 A runs on 36 / 4 = 9 V. Now do yours."] }
      ]);
    }),
    les("Digital and analog", [
      ["Analog", "🎚️", "An <b>analog</b> signal changes smoothly and can be any value in a range, like a volume dial or a mercury thermometer."],
      ["Digital", "🔢", "A <b>digital</b> signal uses separate steps, usually just 0 and 1 (off and on). Computers and phones are digital."],
      ["Why digital", "📱", "Digital information can be copied again and again without getting fuzzy, and it is easy for computers to store."]
    ], ["Ask: smooth and continuous, or in separate steps?", "Smooth dial = analog. Numbers in steps like 0 and 1 = digital.", "Example: a light dimmer knob is analog but a light switch with only on or off is digital. Now try yours."], [
      ["A light switch with only ON and OFF is...", "Digital", "Analog"],
      ["A volume knob that turns smoothly is...", "Analog", "Digital"],
      ["Digital signals usually use...", "0s and 1s", "Smooth waves only", "Colors"],
      ["A clock with a sweeping hand is...", "Analog", "Digital"],
      ["A watch showing numbers like 3:45 is...", "Digital", "Analog"],
      ["Which can be copied without getting fuzzy?", "Digital information", "A pencil drawing"],
      ["Computers store everything as...", "Digital bits", "Smooth analog waves only"],
      ["A temperature number shown on a screen, such as 21 degrees, is a ___ display.", "Digital", "Analog"]
    ]),
    gen("Logic gates", [
      ["Gates", "🚪", "A <b>logic gate</b> takes inputs that are 1 (on) or 0 (off) and gives one output. <b>AND</b> gives 1 only if both inputs are 1."],
      ["OR", "➕", "<b>OR</b> gives 1 if at least one input is 1. It gives 0 only when both are 0."],
      ["NOT", "🔁", "<b>NOT</b> flips one input: 1 becomes 0 and 0 becomes 1."]
    ], () => {
      const A = ri(0, 1), B = ri(0, 1), C = ri(0, 1), k = pick(["AND", "OR", "NOT", "AND-OR"]);
      if (k === "AND") return { text: `Inputs: A = ${A}, B = ${B}. What does an AND gate output?`, visual: "🚪", choices: ["0", "1"], answer: String(A & B), hints: ["AND asks: are ALL the inputs on?", "One input that is off is enough to make the output off.", "Example: an OR gate with inputs 0 and 1 outputs 1, but AND is stricter. Now do yours with AND."] };
      if (k === "OR") return { text: `Inputs: A = ${A}, B = ${B}. What does an OR gate output?`, visual: "🚪", choices: ["0", "1"], answer: String(A | B), hints: ["OR asks: is AT LEAST ONE input on?", "OR is only off when every input is off.", "Example: an AND gate with inputs 1 and 1 outputs 1, but OR is more relaxed. Now do yours with OR."] };
      if (k === "NOT") return { text: `Input: A = ${A}. What does a NOT gate output?`, visual: "🚪", choices: ["0", "1"], answer: String(1 - A), hints: ["NOT is the opposite maker.", "It always flips the input to the other value.", "Example: a switch that is ON read through NOT gives OFF. Now do yours."] };
      return { text: `Inputs: A = ${A}, B = ${B}, C = ${C}. What is (A AND B) OR C?`, visual: "🚪", choices: ["0", "1"], answer: String((A & B) | C), hints: ["Work out the part in brackets first.", "Find A AND B, then use that result as one input of the OR with C.", "Example: (1 AND 0) OR 1: the brackets give 0, then 0 OR 1 gives 1. Now do yours."] };
    }),
    gen("Counters and updates", [
      ["Updating", "🔢", "A <b>variable</b> holds a value, and code can update it: <b>x = x + 3</b> means take x, add 3, and store the result back in x."],
      ["In order", "📜", "The computer runs lines from top to bottom, one at a time. The value changes after each line."],
      ["Example", "🧮", "x = 4, then x = x + 3 makes 7, then x = x × 2 makes 14."]
    ], () => {
      const s = ri(2, 9);
      let x = s;
      const lines = [];
      for (let k = 0; k < 3; k++) {
        const op = pick(["+", "-", "*"]);
        if (op === "+") { const n = ri(2, 9); x += n; lines.push(`x = x + ${n}`); }
        else if (op === "-" && x > 3) { const n = ri(1, x - 2); x -= n; lines.push(`x = x - ${n}`); }
        else { const n = ri(2, 3); x *= n; lines.push(`x = x * ${n}`); }
      }
      return { text: `x = ${s}. Then: ${lines.join(". ")}. What is x at the end?`, visual: "💻", answer: x, hints: ["Do each line in order, one at a time.", "After each line, write down the new value of x before going on.", "Example: y = 2, then y = y + 5 gives 7, then y = y * 3 gives 21. Now do yours."] };
    }),
    gen("While loops", [
      ["Repeat while", "🔁", "A <b>while</b> loop repeats its steps again and again <b>while</b> a test is true. When the test turns false, it stops."],
      ["Example", "🤖", "n = 0. While n < 6: n = n + 2. n goes 0, 2, 4, 6. The loop ran 3 times, and n ends at 6."],
      ["Careful", "⚠️", "The loop must change something so the test can become false. Otherwise it runs forever!"]
    ], () => {
      const k = ri(2, 5), t = ri(2, 8), s = ri(0, 5), L = s + t * k;
      return pick([
        { text: `n = ${s}. While n < ${L}: n = n + ${k}. How many times does the loop run?`, visual: "🔁", answer: t, hints: ["Each time round, n grows, and the loop stops once the test fails.", "Count the steps from the start up to the limit, adding the same amount each time.", "Example: n = 0, while n < 6, add 2: n becomes 2, 4, 6, so it ran 3 times. Now do yours."] },
        { text: `n = ${s}. While n < ${L}: n = n + ${k}. What is n when the loop ends?`, visual: "🔁", answer: L, hints: ["The loop stops as soon as the test is false.", "Keep adding the step until n is no longer smaller than the limit.", "Example: n = 1, while n < 9, add 4: 1, 5, 9. It stops at 9. Now do yours."] }
      ]);
    }),
    gen("Rates", [
      ["Unit rate", "⏱️", "A <b>rate</b> compares two things, like boxes per minute. A <b>unit rate</b> is for just 1, like 4 boxes per minute."],
      ["Find it", "➗", "Unit rate = total ÷ time. 12 boxes in 3 minutes is 12 ÷ 3 = 4 boxes per minute."],
      ["Use it", "✖️", "Total = rate × time. At 4 boxes per minute, 5 minutes packs 4 × 5 = 20 boxes."]
    ], () => {
      const [item, who] = pick([["boxes", "A robot arm packs"], ["bolts", "A machine makes"], ["toy cars", "A line builds"], ["bricks", "A machine lays"]]);
      const pm = ri(2, 9), t = ri(2, 8), tot = pm * t;
      return pick([
        { text: `${who} ${tot} ${item} in ${t} minutes. How many ${item} each minute?`, visual: "🏭", answer: pm, hints: ["A unit rate is for one minute.", "Divide the total by the number of minutes.", "Example: 30 pens in 6 minutes is 30 / 6 = 5 pens per minute. Now do yours."] },
        { text: `${who} ${pm} ${item} every minute. How many ${item} in ${t} minutes?`, visual: "🏭", answer: tot, hints: ["The rate is for one minute, so repeat it for each minute.", "Multiply the rate by the number of minutes.", "Example: 6 per minute for 4 minutes is 6 x 4 = 24. Now do yours."] },
        { text: `${who} ${pm} ${item} every minute. How many minutes does it take to make ${tot} ${item}?`, visual: "⏱️", answer: t, hints: ["Ask how many groups of the rate fit in the total.", "Divide the total by the rate per minute.", "Example: at 5 per minute, 35 items take 35 / 5 = 7 minutes. Now do yours."] }
      ]);
    }),
    gen("Cost estimates", [
      ["Unit price", "💲", "A <b>unit price</b> is the cost of 1 item or 1 meter. Total cost = unit price × amount."],
      ["Decimals", "🔢", "Prices often have cents. $2.50 per meter for 4 meters is 2.50 × 4 = $10."],
      ["Budget", "🧾", "A budget is what you can spend. Money left = budget − cost."]
    ], () => {
      const p = pick([0.5, 1.5, 2.5, 3.5, 4.5]), n = pick([2, 4, 6, 8, 10]), c = p * n, B = c + ri(2, 15);
      return pick([
        { text: `Wire costs $${p.toFixed(2)} per meter. How many dollars do ${n} meters cost?`, visual: "🧵", answer: c, hints: ["Total cost uses the price for one meter.", "Multiply the price per meter by the number of meters.", "Example: $1.50 per meter for 6 meters is 1.50 x 6 = $9. Now do yours."] },
        { text: `You have $${B}. You buy ${n} meters of wire at $${p.toFixed(2)} per meter. How many dollars are left?`, visual: "🧾", answer: B - c, hints: ["First find the total cost of the wire.", "Then take the cost away from your budget.", "Example: with $20, spending $7 leaves 20 - 7 = $13. Now do yours."] },
        { text: `Wire costs $${p.toFixed(2)} per meter. You spend exactly $${c}. How many meters did you buy?`, visual: "🧵", answer: n, hints: ["Total cost = price per meter x meters.", "Divide the money spent by the price per meter.", "Example: $12 at $3 per meter buys 12 / 3 = 4 meters. Now do yours."] }
      ]);
    }),
    gen("Decimals in measuring", [
      ["mm and cm", "📏", "10 mm make 1 cm. So 47 mm is 4.7 cm: divide by 10 to go from mm to cm."],
      ["cm to mm", "🔁", "To go the other way, multiply by 10. 6.3 cm is 63 mm."],
      ["Adding", "➕", "Line up the decimal points. 3.4 cm + 2.9 cm = 6.3 cm."]
    ], () => {
      const t = ri(11, 99), u = ri(11, 60), w = ri(11, 60);
      return pick([
        { text: `A screw is ${t} mm long. How many centimeters is that?`, visual: "🔩", answer: t / 10, hints: ["Centimeters are bigger than millimeters, so the number gets smaller.", "Divide by the number of millimeters in a centimeter.", "Example: 53 mm / 10 = 5.3 cm. Now do yours."] },
        { text: `A wire is ${t / 10} cm long. How many millimeters is that?`, visual: "📏", answer: t, hints: ["Millimeters are smaller than centimeters, so the number gets bigger.", "Multiply by the number of millimeters in a centimeter.", "Example: 8.2 cm x 10 = 82 mm. Now do yours."] },
        { text: `Two beams are ${u / 10} cm and ${w / 10} cm long. Put end to end, how many centimeters long are they?`, visual: "➕", answer: (u + w) / 10, hints: ["Add the two lengths.", "Line up the decimal points before adding.", "Example: 2.5 + 3.4 = 5.9 cm. Now do yours."] }
      ]);
    }),
    les("Four forces of flight", [
      ["Four forces", "✈️", "A plane has four forces on it: <b>lift</b> (up), <b>weight</b> (down), <b>thrust</b> (forward) and <b>drag</b> (backward)."],
      ["Balance", "⚖️", "In steady level flight, lift equals weight and thrust equals drag. More thrust than drag speeds the plane up."],
      ["Wings", "🪽", "A wing is curved on top and tilted a little. It pushes air down, and the air pushes the wing up. That upward push is lift."]
    ], ["Name the direction of each force first.", "Lift fights weight. Thrust fights drag.", "Example: a glider has no engine, so it has no thrust and slowly sinks as it glides. Now try yours."], [
      ["Which force pulls a plane toward the ground?", "Weight (gravity)", "Lift", "Thrust"],
      ["Which force moves the plane forward?", "Thrust", "Drag", "Weight"],
      ["Which force slows the plane down?", "Drag", "Thrust", "Lift"],
      ["Wings mainly make...", "Lift", "Weight", "Drag only"],
      ["Thrust bigger than drag makes the plane...", "Speed up", "Slow down", "Fall"],
      ["In steady level flight, lift equals...", "Weight", "Thrust", "Nothing"],
      ["A jet engine or propeller makes...", "Thrust", "Weight"],
      ["Lift acts in which direction?", "Up", "Down", "Backward"]
    ]),
    les("Wind tunnel tests", [
      ["Wind tunnel", "🌬️", "A <b>wind tunnel</b> blows air over a model so engineers can see how air flows around it. Smoke streams show the path of the air."],
      ["Fair test", "🧪", "Change only <b>one thing</b> at a time, like the wing angle, and keep the wind speed and model size the same."],
      ["Measure", "📊", "Sensors measure lift and drag. Engineers record the numbers and compare designs."]
    ], ["Ask what is being changed, and what should stay the same.", "A fair test changes just one variable and measures the result.", "Example: to test paper plane wing size, use the same paper and the same throw each time. Now try yours."], [
      ["A wind tunnel is used to...", "Study how air flows around a model", "Cook food", "Make rain"],
      ["Smoke in a wind tunnel shows...", "The path of the air", "The weight of the model"],
      ["To test wing angle fairly, you keep ___ the same.", "Wind speed and model size", "Nothing", "The angle"],
      ["In a fair test you change...", "Only one thing", "Everything", "Nothing"],
      ["Engineers test a small model first because it is...", "Cheaper and safer than a full plane", "Louder"],
      ["The numbers a sensor gives in a test are called...", "Data", "Stories", "Paint"],
      ["After several tests, engineers should...", "Compare the data and choose the best design", "Ignore the numbers"],
      ["Which is NOT a fair test of wing shape?", "Using a stronger wind on one wing", "Same wind for both wings", "Same model size for both"]
    ]),
    null, null
  ];
  b[18] = mix("Mixed practice", at(b, [0, 1, 3, 6, 8, 10, 12, 13, 16]));
  b[19] = mix("Level 11 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 12 =================
  const c = [
    gen("Torque", [
      ["Turning force", "🔧", "<b>Torque</b> is a turning effect. Torque = force × distance from the pivot. Unit: newton-meters (N·m)."],
      ["Longer wrench", "📏", "A longer wrench gives more torque for the same push. That is why long handles loosen stuck bolts."],
      ["Example", "🔢", "A 10 N push at 3 m from the pivot gives 10 × 3 = 30 N·m."]
    ], () => {
      const F = ri(2, 15), d = ri(2, 9), T = F * d;
      return pick([
        { text: `You push a wrench handle with ${F} N at a distance of ${d} m from the bolt. What is the torque in N·m?`, visual: "🔧", answer: T, hints: ["Torque depends on the push and how far from the pivot it is.", "Multiply the force by the distance.", "Example: 7 N at 4 m gives 7 x 4 = 28 N·m. Now do yours."] },
        { text: `A torque of ${T} N·m is made by a force of ${F} N. How many meters from the pivot is the force applied?`, visual: "📏", answer: d, hints: ["Torque = force x distance, so distance is missing.", "Divide the torque by the force.", "Example: 36 N·m from 9 N is 36 / 9 = 4 m. Now do yours."] },
        { text: `A torque of ${T} N·m is made at ${d} m from the pivot. What force in newtons was used?`, visual: "💪", answer: F, hints: ["Torque = force x distance, so force is missing.", "Divide the torque by the distance.", "Example: 40 N·m at 5 m needs 40 / 5 = 8 N. Now do yours."] }
      ]);
    }),
    gen("Safety factor", [
      ["Extra strong", "🛡️", "A <b>safety factor</b> says how many times stronger a part is than the load it will carry. Safety factor = breaking load ÷ expected load."],
      ["Why", "🏗️", "Engineers add a safety factor in case of surprises like bad weather, older materials or heavier loads."],
      ["Example", "🔢", "A cable that breaks at 600 N and is used for 200 N has a safety factor of 600 ÷ 200 = 3."]
    ], () => {
      const L = pick([50, 100, 200, 250]), k = ri(2, 6), B = L * k;
      return pick([
        { text: `A rope breaks at ${B} N. It will be used for ${L} N. What is the safety factor?`, visual: "🪢", answer: k, hints: ["Compare how strong it is to how much it will carry.", "Divide the breaking load by the expected load.", "Example: breaks at 900 N, used at 300 N: 900 / 300 = 3. Now do yours."] },
        { text: `A design needs a safety factor of ${k} for an expected load of ${L} N. What load in N must the part be able to hold before breaking?`, visual: "🏗️", answer: L * k, hints: ["The part must be stronger than the load by the safety factor.", "Multiply the expected load by the safety factor.", "Example: factor 4, load 100 N needs 100 x 4 = 400 N strength. Now do yours."] },
        { text: `A part breaks at ${B} N and the design uses a safety factor of ${k}. What is the greatest load in N it should carry?`, visual: "⚠️", answer: L, hints: ["The safe load is only a part of the breaking load.", "Divide the breaking load by the safety factor.", "Example: breaks at 500 N, factor 5: safe load is 500 / 5 = 100 N. Now do yours."] }
      ]);
    }),
    gen("Mean, median and range", [
      ["Mean", "➗", "The <b>mean</b> (average) is the sum of all the numbers divided by how many there are."],
      ["Median", "🎯", "The <b>median</b> is the middle number after you put them in order from smallest to biggest."],
      ["Range", "↔️", "The <b>range</b> is the biggest number minus the smallest number. It shows how spread out the data is."]
    ], () => {
      const m = ri(6, 20), p = ri(1, 4), q = ri(5, 7), four = shuf([m - q, m - p, m + p, m + q]);
      const five = shuf(Array.from({ length: 30 }, (_, i) => i + 1)).slice(0, 5), sorted = five.slice().sort((x, y) => x - y);
      return pick([
        { text: `A toy car rolled ${four.join(", ")} meters in 4 tests. What is the mean?`, visual: "🚗", answer: m, hints: ["The mean shares the total equally.", "Add all the results, then divide by the number of tests.", "Example: 2, 4, 6: the sum is 12, and 12 / 3 = 4. Now do yours."] },
        { text: `Bridge test loads were ${five.join(", ")} kg. What is the median?`, visual: "🌉", answer: sorted[2], hints: ["Put the numbers in order first.", "The median is the one in the exact middle of the ordered list.", "Example: 9, 2, 5 in order is 2, 5, 9 so the median is the middle one, 5. Now do yours."] },
        { text: `Bridge test loads were ${five.join(", ")} kg. What is the range?`, visual: "🌉", answer: sorted[4] - sorted[0], hints: ["Range tells how far apart the extremes are.", "Subtract the smallest number from the biggest number.", "Example: for 3, 8, 5 the range is 8 - 3 = 5. Now do yours."] }
      ]);
    }),
    gen("Reading data tables", [
      ["Tables", "📊", "Engineers record test results in a table. Read the row or column carefully before you answer."],
      ["Compare", "⚖️", "To find which is biggest, scan the numbers. To find how much more, subtract."],
      ["Check", "✅", "Always check the unit (kg, cm, seconds) and that you used the right test."]
    ], () => {
      const vals = shuf(Array.from({ length: 40 }, (_, i) => i + 5)).slice(0, 5), names = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"];
      const tab = names.map((n, i) => `${n} = ${vals[i]} kg`).join(", ");
      const mx = vals.indexOf(Math.max(...vals)), mn = vals.indexOf(Math.min(...vals));
      const i1 = ri(0, 4), i2 = (i1 + ri(1, 4)) % 5, hi = Math.max(vals[i1], vals[i2]), lo = Math.min(vals[i1], vals[i2]);
      const wrongs = n => shuf(names.filter(x => x !== n)).slice(0, 3);
      return pick([
        { text: `Weight each bridge held: ${tab}. Which test held the most?`, visual: "📊", choices: shuf([names[mx], ...wrongs(names[mx])]), answer: names[mx], hints: ["Look down every number in the list.", "You want the largest number, then find its test name.", "Example: Test A = 4, Test B = 9, Test C = 6. The largest is 9, which is Test B. Now do yours."] },
        { text: `Weight each bridge held: ${tab}. Which test held the least?`, visual: "📊", choices: shuf([names[mn], ...wrongs(names[mn])]), answer: names[mn], hints: ["Look down every number in the list.", "You want the smallest number, then find its test name.", "Example: Test A = 4, Test B = 9, Test C = 6. The smallest is 4, which is Test A. Now do yours."] },
        { text: `Weight each bridge held: ${tab}. How many kg more did ${names[vals[i1] === hi ? i1 : i2]} hold than ${names[vals[i1] === hi ? i2 : i1]}?`, visual: "📊", answer: hi - lo, hints: ["Find the two numbers you need.", "To find how much more, take the smaller number away from the bigger.", "Example: 15 kg and 11 kg: 15 - 11 = 4 kg more. Now do yours."] }
      ]);
    }),
    gen("Acceleration", [
      ["Changing speed", "🏎️", "<b>Acceleration</b> is how fast speed changes. Acceleration = change in speed ÷ time. Unit: meters per second each second (m/s²)."],
      ["Example", "🔢", "A cart goes from 2 m/s to 14 m/s in 4 s. Speed grew by 12, so acceleration = 12 ÷ 4 = 3 m/s²."],
      ["Final speed", "🏁", "Final speed = start speed + acceleration × time."]
    ], () => {
      const a = ri(2, 6), t = ri(2, 8), v1 = ri(0, 10), v2 = v1 + a * t;
      return pick([
        { text: `A robot cart speeds up from ${v1} m/s to ${v2} m/s in ${t} seconds. What is its acceleration in m/s²?`, visual: "🤖", answer: a, hints: ["First find how much the speed changed.", "Divide the change in speed by the time.", "Example: from 3 m/s to 15 m/s in 4 s: change 12, then 12 / 4 = 3 m/s². Now do yours."] },
        { text: `A cart starts at ${v1} m/s and accelerates at ${a} m/s² for ${t} seconds. How fast is it going at the end, in m/s?`, visual: "🏁", answer: v2, hints: ["Each second the speed grows by the acceleration.", "Multiply acceleration by time, then add to the starting speed.", "Example: start 2 m/s, 3 m/s² for 4 s: 3 x 4 = 12, then 2 + 12 = 14 m/s. Now do yours."] }
      ]);
    }),
    gen("Momentum", [
      ["Momentum", "🚚", "<b>Momentum</b> = mass × velocity. It tells how hard a moving object is to stop. Unit: kg·m/s."],
      ["Example", "🔢", "A 5 kg cart moving at 4 m/s has a momentum of 5 × 4 = 20 kg·m/s."],
      ["Crash safety", "🛡️", "Airbags and crumple zones make a crash take longer, so the stopping force is smaller."]
    ], () => {
      const m = ri(2, 15), v = ri(2, 10), p = m * v;
      return pick([
        { text: `A ${m} kg cart moves at ${v} m/s. What is its momentum in kg·m/s?`, visual: "🛒", answer: p, hints: ["Momentum uses both the mass and the speed.", "Multiply the mass by the speed.", "Example: 6 kg at 3 m/s is 6 x 3 = 18 kg·m/s. Now do yours."] },
        { text: `A cart moving at ${v} m/s has a momentum of ${p} kg·m/s. What is its mass in kg?`, visual: "⚖️", answer: m, hints: ["Momentum = mass x speed, so mass is missing.", "Divide the momentum by the speed.", "Example: 42 kg·m/s at 6 m/s means 42 / 6 = 7 kg. Now do yours."] },
        { text: `A ${m} kg cart has a momentum of ${p} kg·m/s. How fast is it moving in m/s?`, visual: "💨", answer: v, hints: ["Momentum = mass x speed, so speed is missing.", "Divide the momentum by the mass.", "Example: 40 kg·m/s for a 8 kg cart means 40 / 8 = 5 m/s. Now do yours."] }
      ]);
    }),
    les("Kinetic energy", [
      ["Moving energy", "🏃", "<b>Kinetic energy</b> is the energy of motion. Faster or heavier things have more of it."],
      ["Speed matters most", "⚡", "Kinetic energy grows with speed squared. Double the speed and the energy is <b>four times</b> bigger. Double the mass and it is only twice as big."],
      ["Safety", "🚦", "That is why speed limits matter. A car going twice as fast needs about four times the distance to stop."]
    ], ["Ask: which of mass and speed changed, and by how much?", "Double the mass doubles the energy, but double the speed makes four times the energy.", "Example: a cyclist at 10 km/h hits less hard than at 20 km/h, which has four times the energy. Now try yours."], [
      ["Kinetic energy is the energy of...", "Motion", "Heat only", "Height"],
      ["Which has more kinetic energy?", "A fast truck", "A slow bicycle"],
      ["If speed doubles, kinetic energy becomes...", "Four times bigger", "Twice as big", "Half as big"],
      ["If mass doubles at the same speed, kinetic energy becomes...", "Twice as big", "Four times bigger", "The same"],
      ["Why do speed limits matter?", "Fast vehicles have much more energy to stop", "Roads get tired", "Cars use less fuel"],
      ["A ball at rest has ___ kinetic energy.", "Zero", "A lot", "Four times"],
      ["A car travels three times faster. Its kinetic energy is...", "Nine times bigger", "Three times bigger", "The same"],
      ["Brakes stop a car by changing its motion energy into...", "Heat", "Light", "Paint"]
    ]),
    les("Solar power and storage", [
      ["Solar panels", "☀️", "<b>Solar panels</b> turn sunlight into electricity. They work best when they face the Sun and are not shaded."],
      ["Batteries", "🔋", "Panels only make power in daylight. A battery stores extra energy so lights and devices can use it at night."],
      ["Inverter", "🔌", "Panels and batteries give DC power. An <b>inverter</b> changes it to AC, which home outlets use."]
    ], ["Think: when is sunlight there, and when is it not?", "Panels make power by day, and batteries keep it for later.", "Example: a solar garden light charges all day and shines all night using its small battery. Now try yours."], [
      ["Solar panels turn sunlight into...", "Electricity", "Water", "Wind"],
      ["Why add a battery to a solar system?", "To store energy for night", "To make the sun hotter", "To make panels lighter"],
      ["Solar panels make the most power when they are...", "In full sunshine facing the Sun", "In a dark closet", "Covered by a tree"],
      ["An inverter changes DC power into...", "AC power", "Sunlight", "Heat"],
      ["Cloudy weather makes solar panels give...", "Less power", "More power"],
      ["Solar energy is called renewable because...", "The Sun keeps shining every day", "It never costs anything to build", "It uses no materials"],
      ["Which place is best for a solar panel?", "A sunny roof", "A shady basement"],
      ["A solar-powered calculator works by...", "Using light to make a small current", "Burning fuel", "Using a hand crank"]
    ]),
    les("Civil engineering: roads and water", [
      ["Road layers", "🛣️", "A road has layers: soil, then packed gravel, then a hard top of asphalt or concrete. Each layer spreads the weight."],
      ["Drainage", "🌧️", "Roads are slightly curved and have ditches or drains so rainwater runs away. Standing water can damage a road."],
      ["Pipes and towers", "🚰", "Water towers store water up high. Gravity pushes it down through pipes to homes. Sewer pipes slope downhill so waste flows away."]
    ], ["Think about what holds the weight and what moves the water.", "Layers spread the load, drains move water, and gravity helps pipes.", "Example: a sidewalk tilts slightly so rain runs off into the gutter. Now try yours."], [
      ["Why does a road have a gravel layer under the top?", "To spread out the weight", "To look pretty", "To make noise"],
      ["Roads have drains so that...", "Rainwater runs away", "Cars can swim", "Roads stay dark"],
      ["Water towers use ___ to push water to homes.", "Gravity", "Magnets", "Wind"],
      ["Sewer pipes slope downhill so waste...", "Flows by gravity", "Climbs up"],
      ["A civil engineer might design...", "A bridge or a road", "A song", "A cartoon"],
      ["Standing water on a road can...", "Damage it over time", "Make it stronger"],
      ["Which layer is on top of a road?", "Asphalt or concrete", "Soil", "Gravel"],
      ["A tunnel through a mountain helps a road by...", "Making a shorter, flatter route", "Making it longer"]
    ]),
    les("Cleaning water", [
      ["Why clean it", "💧", "Water from rivers and lakes may have dirt and germs. Plants clean it so it is safe to drink."],
      ["The steps", "🧪", "Steps in order: <b>screen</b> out big things, let dirt <b>settle</b> to the bottom, <b>filter</b> through sand and gravel, then <b>disinfect</b> to kill germs."],
      ["Test it", "🔬", "Engineers test the water often to make sure it stays safe."]
    ], ["Picture the water going through the plant from start to finish.", "Big things come out first, germs are killed last.", "Example: you can strain pasta first, and only then add the sauce. Order matters. Now try yours."], [
      ["Which step comes first in cleaning water?", "Screening out big things", "Killing germs", "Adding fish"],
      ["Letting dirt sink to the bottom is called...", "Settling", "Screening", "Boiling"],
      ["Sand and gravel are used to...", "Filter the water", "Color the water", "Warm the water"],
      ["Disinfecting water means...", "Killing germs", "Adding sugar", "Freezing it"],
      ["Which step comes last?", "Disinfecting", "Screening", "Settling"],
      ["Why do engineers test drinking water often?", "To make sure it stays safe", "To make it sparkle", "To make it cold"],
      ["A coffee filter is like a water plant's...", "Filter step", "Disinfect step"],
      ["Screening removes things like...", "Sticks and leaves", "Tiny germs"]
    ]),
    les("Families of materials", [
      ["Metals", "🔩", "<b>Metals</b> are strong and carry heat and electricity well. Steel and aluminum are common."],
      ["Plastics and ceramics", "🧴", "<b>Plastics</b> are light and can be molded. <b>Ceramics</b>, like tiles and bricks, are hard and heat-proof but can crack."],
      ["Composites", "🏎️", "A <b>composite</b> mixes materials. Fiberglass and carbon fiber are strong and light. Concrete is strong when squeezed."]
    ], ["Think about what the part must do: bend, carry heat, stay light?", "Match the property to the job.", "Example: a pot handle needs a material that does not conduct heat well, so wood or plastic is chosen. Now try yours."], [
      ["Which material family conducts electricity well?", "Metals", "Plastics", "Ceramics"],
      ["Brick and tile are examples of...", "Ceramics", "Metals", "Plastics"],
      ["A composite is...", "A mix of materials", "Only one pure metal", "A kind of paint"],
      ["Which is light and easy to mold?", "Plastic", "Steel beam", "Brick"],
      ["Electrical wires are made of metal because metals...", "Carry electricity well", "Are soft and cheap only", "Are clear"],
      ["Carbon fiber is used in bikes because it is...", "Strong and light", "Heavy and weak", "Sticky"],
      ["Ceramics can be a problem when they...", "Crack when hit", "Bend like rubber"],
      ["A rain jacket is made from plastic-based fabric because it is...", "Waterproof", "Magnetic", "Very heavy"]
    ]),
    les("Making things in a factory", [
      ["Assembly line", "🏭", "On an <b>assembly line</b> each worker or robot does one step as the product moves past. Many products are made quickly."],
      ["Quality control", "🔍", "<b>Quality control</b> checks products against a standard. Bad ones are fixed or removed before they reach customers."],
      ["Making methods", "🖨️", "A CNC machine cuts material away. A 3D printer builds an object up, layer by layer."]
    ], ["Think about speed, checking, and the way things are made.", "Assembly lines split work into steps, and quality checks catch mistakes.", "Example: a cookie factory has one machine mix, one bake and one box, in order. Now try yours."], [
      ["On an assembly line each station...", "Does one step", "Does every step", "Sleeps"],
      ["Quality control is used to...", "Check products meet a standard", "Make products cost more", "Paint them"],
      ["A 3D printer makes objects by...", "Adding layer by layer", "Cutting from a block only", "Melting everything"],
      ["A CNC machine usually...", "Cuts material away", "Prints with ink"],
      ["Robots on assembly lines are good at...", "Repeating the same step accurately", "Telling jokes"],
      ["Why use standard-sized parts?", "They fit and are easy to replace", "They are always pink", "They never work"],
      ["Finding a bad product early saves...", "Time and money", "Nothing"],
      ["A factory makes many copies of a design, so engineers want the copies to be...", "The same quality", "All different"]
    ]),
    les("Software engineering", [
      ["Steps", "💻", "Software engineers decide the <b>requirements</b> (what it must do), write the code, <b>test</b> it, fix bugs and release it."],
      ["Testing", "🧪", "Test small parts first, then the whole program. Try normal inputs and odd inputs like zero or an empty list."],
      ["Versions", "🗂️", "<b>Version control</b> saves every change, so you can see who changed what and go back if something breaks."]
    ], ["Think about the order: plan, build, test, fix.", "Testing finds bugs before users do, and version control keeps a history.", "Example: a game maker tests a new level, finds a bug, and goes back to the earlier saved version. Now try yours."], [
      ["Requirements say...", "What the software must do", "Who owns the computer", "How loud the fan is"],
      ["Why test with odd inputs like zero?", "To find hidden bugs", "To waste time", "To change the language"],
      ["Version control lets you...", "Go back to an earlier saved version", "Delete all your work", "Make the screen bigger"],
      ["Which should happen before release?", "Testing", "Deleting the code"],
      ["A bug is...", "A mistake in a program", "A tiny robot", "A mouse button"],
      ["Testing small parts first helps because...", "Bugs are easier to find", "It is never needed"],
      ["Comments in code help by...", "Explaining it to people who read it", "Running faster"],
      ["After finding a bug the engineer should...", "Fix it, then test again", "Hide it and ship"]
    ]),
    gen("Searching and halving", [
      ["Find fast", "🔎", "Searching a list one item at a time is a <b>linear search</b>. In the worst case you check every item."],
      ["Halving", "✂️", "If the list is sorted, <b>binary search</b> checks the middle and throws away half each time. 16 items becomes 8, then 4, 2, 1."],
      ["Powerful", "🚀", "Halving is very fast. A sorted list of 1000 items needs only about 10 checks."]
    ], () => {
      const k = ri(2, 6), n = 2 ** k, j = ri(1, k - 1), m = ri(5, 40);
      return pick([
        { text: `A sorted list has ${n} items. How many times can you cut it in half until just 1 item is left?`, visual: "✂️", answer: k, hints: ["Each cut makes the list half as long.", "Keep halving and count the cuts until you reach one item.", "Example: 8 items to 4 to 2 to 1 is 3 cuts. Now do yours."] },
        { text: `A sorted list has ${n} items. After ${j} cut${j > 1 ? "s" : ""} in half, how many items are left to search?`, visual: "🔎", answer: n / 2 ** j, hints: ["Halve the number of items for each cut.", "Do the halving one cut at a time.", "Example: 32 items after 2 cuts: 16, then 8, so 8 are left. Now do yours."] },
        { text: `You search an unsorted list of ${m} items one by one, and the item you want is the very last one. How many items do you check?`, visual: "🔍", answer: m, hints: ["You cannot skip any when the list is not sorted.", "The item is at the end, so every item gets checked.", "Example: for a list of 12 with the item at the end, you check 12. Now do yours."] }
      ]);
    }),
    gen("Robot paths on a grid", [
      ["Grid moves", "🧭", "A robot on a grid can only move up, down, left or right, one square per step. No diagonal moves."],
      ["Count steps", "👣", "Steps from one point to another = across distance + up/down distance. Add how far x differs and how far y differs."],
      ["Example", "🔢", "From (1, 1) to (4, 5): across 4 − 1 = 3, up 5 − 1 = 4. That is 3 + 4 = 7 steps."]
    ], () => {
      const x1 = ri(0, 8), y1 = ri(0, 8), x2 = ri(0, 8), y2 = ri(0, 8);
      const s = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      if (s === 0) return { text: "A robot is at (3, 3) and needs to get to (7, 5). How many single-square steps does it take?", visual: "🤖", answer: 6, hints: ["Look at how far apart the x numbers are, and the y numbers.", "Add the x difference and the y difference, since there are no diagonal moves.", "Example: from (0, 0) to (2, 3) takes 2 + 3 = 5 steps. Now do yours."] };
      return pick([
        { text: `A robot is at (${x1}, ${y1}) and needs to get to (${x2}, ${y2}). It moves one square at a time, no diagonals. How many steps does it take?`, visual: "🤖", answer: s, hints: ["Look at how far apart the x numbers are, and the y numbers.", "Add the x difference and the y difference, since there are no diagonal moves.", "Example: from (1, 2) to (4, 6) takes 3 + 4 = 7 steps. Now do yours."] },
        { text: `A robot goes from (${x1}, ${y1}) to (${x2}, ${y2}) one square at a time, then returns the same way. How many steps is the whole round trip?`, visual: "🔄", answer: 2 * s, hints: ["Find the steps for one way first.", "The trip back is the same length, so double the one-way steps.", "Example: one way takes 5 steps, so the round trip takes 5 + 5 = 10 steps. Now do yours."] }
      ]);
    }),
    gen("Project timelines", [
      ["Tasks", "📅", "A project has tasks. Tasks done one after another add up: design 3 days + build 5 days + test 2 days = 10 days."],
      ["At the same time", "👯", "Tasks done by different teams <b>at the same time</b> take only as long as the longest one."],
      ["Critical path", "🛤️", "The longest chain of tasks decides the finish date. A delay on that chain delays the whole project."]
    ], () => {
      const d1 = ri(2, 6), b1 = ri(3, 9), t1 = ri(1, 5), b2 = ri(3, 9);
      return pick([
        { text: `Design takes ${d1} days, building takes ${b1} days and testing takes ${t1} days, one after another. How many days in all?`, visual: "📅", answer: d1 + b1 + t1, hints: ["Each task waits for the one before it.", "Add up the days for all the tasks.", "Example: 2 + 4 + 3 = 9 days. Now do yours."] },
        { text: `Two teams build two parts at the same time: one needs ${b1} days and the other needs ${b2} days. Then testing takes ${t1} days. How many days in all?`, visual: "👯", answer: Math.max(b1, b2) + t1, hints: ["Parts built at the same time do not add together.", "Use the longer build time, then add the testing time.", "Example: parts of 3 and 7 days together take 7 days, plus 2 days of testing is 9. Now do yours."] },
        { text: `A project takes ${d1 + b1 + t1} days in all. Design takes ${d1} days and testing takes ${t1} days. How many days does building take?`, visual: "🧮", answer: b1, hints: ["Take away the tasks you already know.", "Total days minus design days minus testing days.", "Example: 12 days in all with 3 and 4 known leaves 12 - 3 - 4 = 5. Now do yours."] }
      ]);
    }),
    les("Life of a product", [
      ["Life cycle", "♻️", "Every product has a <b>life cycle</b>: get materials, make it, ship it, use it, then repair, reuse, recycle or throw it away."],
      ["Design well", "🛠️", "Engineers can make products last longer, be easy to repair, use less packaging and be made of recyclable materials."],
      ["Choose", "⚖️", "A product that lasts ten years can be better for the planet than a cheap one thrown away every year."]
    ], ["Think about every stage from raw materials to the end.", "Longer-lasting and repairable designs usually waste less.", "Example: a water bottle you refill for years makes less waste than one you throw away each day. Now try yours."], [
      ["The first stage of a product's life is usually...", "Getting raw materials", "Throwing it away", "Selling it again"],
      ["Which design choice helps the planet?", "Making a product easy to repair", "Making it break fast", "Using extra packaging"],
      ["Recycling happens...", "At the end of a product's life", "Before it is made"],
      ["A product that lasts longer usually makes ___ waste.", "Less", "More"],
      ["Designing for repair means...", "Parts can be fixed or replaced", "It can never be opened"],
      ["Which is part of the life cycle?", "Using the product", "Forgetting the product"],
      ["A refillable bottle compared to a one-use bottle makes...", "Less trash", "More trash"],
      ["Using fewer materials in a design is called...", "Reducing", "Wasting"]
    ]),
    les("Safe and responsible engineering", [
      ["People first", "🦺", "A good engineer puts <b>safety</b> first. Bridges, toys and cars must not hurt the people who use them."],
      ["Standards", "📋", "<b>Standards</b> and rules say how strong or safe things must be. Engineers follow them and test their work."],
      ["Honest", "🤝", "Engineers tell the truth about problems, even when it is hard. They give credit for other people's ideas and think about how their work affects others."]
    ], ["Think about who could be hurt or helped by the design.", "Safety, honest reports and following the rules come first.", "Example: a toy maker finds a loose small part and fixes it before selling, to protect little kids. Now try yours."], [
      ["An engineer finds a safety problem. What should they do?", "Report it and fix it", "Hide it", "Wait and see"],
      ["Standards are...", "Rules for safe, good quality work", "Colors", "Jokes"],
      ["Using someone else's idea in your design, you should...", "Give them credit", "Pretend it is yours"],
      ["Who should an engineer think about?", "The people who will use the design", "Only themselves"],
      ["Testing a product before selling it helps keep people...", "Safe", "Confused"],
      ["Being honest about a mistake in a design is...", "The right thing to do", "A bad idea"],
      ["A good engineer's first priority is...", "Safety", "Speed only"],
      ["Rules about how strong a bridge must be are meant to...", "Protect people", "Make bridges plain"]
    ]),
    null, null
  ];
  c[18] = mix("Mixed practice", at(c, [0, 2, 4, 5, 6, 8, 12, 14, 15]));
  c[19] = mix("Level 12 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 10: a, 11: b, 12: c });
})();
