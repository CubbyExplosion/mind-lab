// ext/engineer-4-6.js  Engineering levels 4-6 (1st grade 2nd half, 2nd grade)
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
  // numeric lesson: gen() returns {text, visual?, answer, hints:[3]}
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

  // ================= LEVEL 4 =================
  const d = [
    les("The design steps", [
      ["Five steps", "🧩", "Engineers follow steps: <b>Ask</b> what the problem is, <b>Imagine</b> ideas, <b>Plan</b> the best one, <b>Create</b> it, then <b>Improve</b> it."],
      ["In order", "1️⃣ 2️⃣ 3️⃣", "Ask, Imagine, Plan, Create, Improve. After you improve, you can go around again!"],
      ["Example", "☂️", "Problem: kids get wet walking to school. Imagine: hat, coat, umbrella. Plan: an umbrella. Create it. Improve: make it fold small."]
    ], ["Think about what comes first when you solve a problem.", "You ask about the problem before you build. You improve after you test.", "Example: for a leaky roof, first ask what is wrong, then imagine fixes, plan, build, and improve. Now try yours."], [
      ["What is the first design step?", "Ask what the problem is", "Improve it", "Show it off"], ["What do you do after you plan?", "Create it", "Ask again", "Stop"],
      ["What is the last step in the list?", "Improve", "Ask", "Imagine"], ["Thinking of lots of ideas is called...", "Imagine", "Improve", "Create"],
      ["Which step is building your idea?", "Create", "Ask", "Imagine"], ["After you improve, you can...", "Go around the steps again", "Never build again"], ["Which step comes right before Create?", "Plan", "Improve", "Ask"]
    ]),
    les("Draw a plan", [
      ["Sketch first", "✏️", "A <b>sketch</b> is a quick drawing of your idea. Engineers draw before they build."],
      ["Labels", "🏷️", "Write <b>labels</b> on your drawing to name the parts. Add numbers to show how big things are."],
      ["Why draw?", "💡", "A drawing lets you fix mistakes before you use real materials."]
    ], ["A drawing is for planning.", "Labels name the parts of the drawing.", "Example: a sketch of a toy boat with a label that says \"sail\" shows where the sail goes. Now try yours."], [
      ["A quick drawing of an idea is a...", "Sketch", "Song", "Test"], ["Words that name parts on a drawing are...", "Labels", "Bugs", "Wheels"],
      ["Why do engineers draw first?", "To fix mistakes before building", "Because they must", "To waste paper"], ["You should draw your plan...", "Before building", "After you finish building"],
      ["A label on a drawing says \"wheel\". It shows...", "Where the wheel goes", "How loud it is"], ["Adding numbers to a drawing shows...", "How big things are", "What it smells like"], ["A good plan drawing has...", "Labels", "No details"]
    ]),
    les("Levers", [
      ["Lever", "🪵", "A <b>lever</b> is a stiff bar that turns on a point. The point is the <b>fulcrum</b>."],
      ["See-saw", "⚖️", "A see-saw is a lever. A crowbar and a spoon used to pop a lid are levers too."],
      ["Easier", "💪", "A lever helps you lift heavy things with less push."]
    ], ["A lever turns on a point.", "The turning point is called the fulcrum.", "Example: a spoon pops a paint-can lid because it is a lever. Now try yours."], [
      ["A see-saw is a...", "Lever", "Wheel", "Screw"], ["The turning point of a lever is the...", "Fulcrum", "Wedge", "Axle"], ["A lever helps you...", "Lift heavy things more easily", "Run faster only", "Make sound"],
      ["Which is a lever?", "A crowbar", "A ball", "A cup"], ["A claw hammer pulling a nail works as a...", "Lever", "Pulley", "Ramp"], ["A lever is a ___ bar.", "Stiff", "Floppy", "Wet"],
      ["Which is a lever?", "A see-saw", "A marble", "A sock"]
    ]),
    les("Pulleys", [
      ["Pulley", "🪢", "A <b>pulley</b> is a wheel with a rope over it. Pulling down on one side lifts the other."],
      ["Flag pole", "🚩", "A flag goes up a pole with a pulley. You pull down and the flag goes up!"],
      ["Many uses", "🏗️", "Cranes and window blinds use pulleys to lift things."]
    ], ["A pulley has a wheel and a rope.", "It changes the direction you pull.", "Example: a well bucket goes up when you pull the rope down over a pulley. Now try yours."], [
      ["A pulley is a wheel with a...", "Rope", "Hammer", "Magnet"], ["A pulley on a flag pole helps the flag go...", "Up", "Sideways only"], ["Which uses a pulley?", "A crane", "A pencil", "A pillow"],
      ["When you pull down on a pulley rope, the load goes...", "Up", "Down"], ["Which is a pulley job?", "Lifting a bucket", "Cutting paper", "Painting"], ["A pulley changes the ___ of your pull.", "Direction", "Color", "Taste"],
      ["Window blinds can use a...", "Pulley", "Drum"]
    ]),
    les("Wheels and axles", [
      ["Axle", "🛞", "A <b>wheel and axle</b> is a wheel joined to a rod called an <b>axle</b>. They turn together."],
      ["Rolling", "🚗", "Wheels roll easily, so heavy things move with less push."],
      ["More", "🚪 🎡", "A door knob, a steering wheel and a Ferris wheel are wheels and axles too."]
    ], ["The axle is the rod in the middle.", "Wheels roll instead of dragging.", "Example: a wagon rolls on wheels, so it is easier than dragging a box. Now try yours."], [
      ["The rod in the middle of a wheel is the...", "Axle", "Lever", "Ramp"], ["Wheels make heavy things...", "Easier to move", "Harder to move"], ["Which uses a wheel and axle?", "A wagon", "A pillow", "A spoon"],
      ["A door knob is a...", "Wheel and axle", "Wedge", "Magnet"], ["Which is easier?", "Rolling a box on wheels", "Dragging a box on the ground"], ["A steering wheel turns on an...", "Axle", "Egg"],
      ["Rolling beats dragging because wheels reduce...", "Friction", "Color"]
    ]),
    les("Ramps", [
      ["Inclined plane", "📐", "A <b>ramp</b> (also called an inclined plane) is a slope. It is easier to push a load up a ramp than to lift it straight up."],
      ["Longer is easier", "🛝", "A long, gentle ramp needs less push but you go farther."],
      ["Where", "♿ 🚚", "Wheelchair ramps and truck ramps help people move things up high."]
    ], ["A ramp is a slope.", "A longer ramp is a gentler slope.", "Example: a gentle ramp lets you roll a barrel up with less push than lifting it. Now try yours."], [
      ["A ramp is a...", "Slope", "Rope", "Magnet"], ["It is easier to move a heavy box up a...", "Ramp", "Cliff"], ["A longer ramp needs...", "Less push", "More push"],
      ["A wheelchair ramp helps people...", "Go up without stairs", "Fly"], ["Which is a ramp?", "A slide", "A balloon", "A sock"], ["A steep ramp is ___ to push up than a gentle one.", "Harder", "Easier"],
      ["Trucks use ramps to...", "Load heavy things", "Make music"]
    ]),
    les("Wedges and screws", [
      ["Wedge", "🪓", "A <b>wedge</b> is a thick-to-thin shape that splits or cuts. An axe, a knife and a door stop are wedges."],
      ["Screw", "🔩", "A <b>screw</b> is a ramp wrapped around a rod. Turning it pulls it into wood."],
      ["Jobs", "🛠️", "Wedges split and hold. Screws hold things together or lift, like a jar lid."]
    ], ["Wedges have a sharp edge that splits.", "A screw turns round and round.", "Example: a door stop wedge holds a door open. Now try yours."], [
      ["Which is a wedge?", "An axe", "A ball", "A rope"], ["A screw is like a ramp wrapped around a...", "Rod", "Cloud", "Wheel"], ["A door stop is a...", "Wedge", "Pulley", "Lever"],
      ["A knife is a...", "Wedge", "Screw", "Axle"], ["You use a screw by...", "Turning it", "Pounding it only"], ["A jar lid works like a...", "Screw", "Wedge", "Spring"],
      ["A wedge is used to...", "Split or hold", "Roll"]
    ]),
    les("Kinds of bridges", [
      ["Beam bridge", "🌉", "A <b>beam bridge</b> is a flat strong road resting on supports at each end. It is the simplest bridge."],
      ["Arch bridge", "🏛️", "An <b>arch bridge</b> has a curved shape that carries weight to its two ends."],
      ["Suspension bridge", "🌁", "A <b>suspension bridge</b> hangs from big cables held up by tall towers. It can be very long."]
    ], ["Look at the shape: flat, curved or hanging.", "Cables and towers = suspension. Curve = arch.", "Example: a log across a stream is the simplest beam bridge. Now try yours."], [
      ["A flat bridge on supports at each end is a...", "Beam bridge", "Arch bridge", "Suspension bridge"], ["A curved bridge is an...", "Arch bridge", "Beam bridge", "Cable cat"],
      ["A bridge hanging from cables and towers is a...", "Suspension bridge", "Arch bridge", "Beam bridge"], ["The simplest bridge is a...", "Beam bridge", "Suspension bridge"],
      ["Which bridge can be very long?", "Suspension bridge", "A log beam"], ["A log laid across a stream is a...", "Beam bridge", "Suspension bridge", "Arch bridge"], ["An arch carries weight to its...", "Two ends", "Middle only"]
    ]),
    les("Strong and stable", [
      ["Stable", "🏗️", "<b>Stable</b> means it does not fall or tip over easily. A low, wide base helps."],
      ["Strong", "💪", "<b>Strong</b> means it does not break. Thick parts and triangles help."],
      ["Both", "🏠", "A good building needs to be strong and stable."]
    ], ["Stable is about not tipping. Strong is about not breaking.", "A wide, low base is stable.", "Example: a wide pyramid is stable because its base is big. Now try yours."], [
      ["Which is more stable?", "A wide, low block", "A tall, thin stick standing on one end"], ["Strong means it does not...", "Break", "Smile"], ["Stable means it does not easily...", "Tip over", "Taste good"],
      ["What helps a tower be stable?", "A wide base", "A tiny base"], ["What makes a frame strong?", "Triangles", "Loose joints"], ["A good building should be...", "Strong and stable", "Only pretty"],
      ["Which is harder to tip?", "A low wide table", "A tall skinny lamp pole on a tiny base"]
    ]),
    les("Choose a material", [
      ["Properties", "🔍", "A material's <b>properties</b> tell us what it is like: hard, soft, bendy, waterproof, strong or see-through."],
      ["Match", "🧱 🧵", "Pick the property the job needs. A raincoat needs waterproof. A rope needs strong and bendy."],
      ["Test it", "🧪", "If you are not sure, test the material first."]
    ], ["Think about what the job needs.", "Waterproof keeps water out. Bendy can bend without breaking.", "Example: a bike tire is rubber because it is bouncy and grips. Now try yours."], [
      ["A raincoat should be...", "Waterproof", "See-through", "Breakable"], ["A rope should be...", "Strong and bendy", "Stiff and brittle"], ["A window should be...", "See-through", "Soft"],
      ["A cooking pot handle should not...", "Get too hot", "Be useful"], ["A pillow should be...", "Soft", "Hard"], ["A bridge needs to be made of something...", "Strong", "Squishy"],
      ["Properties tell us what a material is...", "Like", "Called by its owner"]
    ]),
    num("Measure in centimeters", [
      ["cm", "📏", "We measure small lengths in <b>centimeters</b>, written <b>cm</b>. A ruler shows them."],
      ["Start at zero", "0️⃣", "Line the end of the thing up with <b>0</b> on the ruler. Then read the number where it ends."],
      ["Add lengths", "➕", "Two sticks joined end to end: add their lengths. 4 cm + 3 cm = 7 cm."]
    ], () => {
      const mode = ri(0, 2);
      if (mode === 0) { const a = ri(2, 9), b = ri(2, 9); return { visual: "🪵➕🪵", text: `One stick is ${a} cm long. Another is ${b} cm long. Joined end to end, how many cm long are they?`, answer: a + b, hints: ["Joining means adding.", "Add the two lengths together.", "Example: 3 cm and 5 cm stick pieces joined are 3 + 5 = 8 cm. Now do yours."] }; }
      if (mode === 1) { const a = ri(10, 15), b = ri(2, 8); return { visual: "✂️", text: `A ribbon is ${a} cm long. You cut off ${b} cm. How many cm are left?`, answer: a - b, hints: ["Cutting takes some away.", "Subtract the piece you cut off.", "Example: 12 cm minus 4 cm leaves 8 cm. Now do yours."] }; }
      const a = ri(2, 6); return { visual: "🪵🪵", text: `Two beams are each ${a} cm long. How many cm is that in all?`, answer: a * 2, hints: ["Two of the same length.", "Add the number to itself.", "Example: two 4 cm beams are 4 + 4 = 8 cm. Now do yours."] };
    }),
    les("Make a prototype", [
      ["Prototype", "🧸", "A <b>prototype</b> is a first test model of your idea. It can be made of cardboard or paper."],
      ["Cheap and quick", "✂️", "Make a prototype from cheap things first. If it fails, you only lose a little."],
      ["Learn from it", "🔄", "Test the prototype, see what is wrong, and then improve it."]
    ], ["A prototype is a first model.", "It is okay if the first one is not perfect.", "Example: a cardboard boat to test floating before building a big boat. Now try yours."], [
      ["A first test model is a...", "Prototype", "Poster", "Rule"], ["A prototype can be made from...", "Cardboard", "Only gold"], ["If a prototype fails, you should...", "Learn and improve it", "Give up forever"],
      ["Why use cheap materials for a prototype?", "You lose little if it fails", "It must be ugly"], ["After testing a prototype you...", "Improve it", "Throw away the idea"], ["A prototype helps you find...", "Problems early", "New friends"],
      ["A paper model of a car is a...", "Prototype", "Real engine"]
    ]),
    les("What must it do?", [
      ["Needs", "✅", "Before you build, decide what your design <b>must do</b>. These are the rules your design must meet."],
      ["Limits", "🚧", "There can be limits too, like \"use only 10 blocks\" or \"must fit on a desk\"."],
      ["Check", "🔍", "When you finish, check your design against the rules."]
    ], ["Rules say what the design must do.", "A limit tells how much you may use.", "Example: a bridge must hold a toy car and be under 20 cm long. Now try yours."], [
      ["A rule for a toy bridge: it must...", "Hold a toy car", "Taste sweet", "Be invisible"], ["\"Use only 10 blocks\" is a...", "Limit", "Song"], ["After you build, you...", "Check it against the rules", "Forget the rules"],
      ["A tower must be 20 cm tall. Yours is 10 cm. Does it meet the rule?", "No", "Yes"], ["Rules help you decide what to...", "Build", "Eat"], ["A chair must hold a person. This is a...", "Rule for the design", "Color"],
      ["Which is a limit?", "Only 5 straws", "A happy face"]
    ]),
    les("Simple circuits", [
      ["Circuit", "🔋 💡", "A <b>circuit</b> is a path for electricity. It needs a battery, wires and something to power, like a bulb."],
      ["A loop", "⭕", "The path must make a complete loop with no gaps. Then the bulb lights."],
      ["Switch", "🔘", "A <b>switch</b> opens or closes the loop. Closed = on. Open = off."]
    ], ["Electricity needs a full loop.", "A gap in the loop stops the electricity.", "Example: a flashlight lights when the switch closes the loop. Now try yours."], [
      ["A circuit needs a complete...", "Loop", "Sandwich", "Picture"], ["A bulb will not light if the wire has a...", "Gap", "Battery"], ["A closed switch means the light is...", "On", "Off"],
      ["A circuit needs a battery, wires and a...", "Bulb or other part to power", "Sandwich"], ["An open switch makes a gap, so the light is...", "Off", "On"], ["The battery gives the circuit...", "Energy", "Paint"],
      ["Which is a circuit part?", "Wire", "Bread", "Pillow"]
    ]),
    les("Robot inputs and outputs", [
      ["Inputs", "👂 👁️", "A robot uses <b>sensors</b> to take in information. That information is its <b>input</b>."],
      ["Outputs", "💡 🔊 🦿", "What the robot does is its <b>output</b>: it moves, lights up or makes a sound."],
      ["Example", "🤖", "A touch sensor feels a wall (input). The robot stops (output)."]
    ], ["Input comes in. Output goes out.", "Sensors give input. Motors, lights and speakers give output.", "Example: a light sensor sees dark (input) and a lamp turns on (output). Now try yours."], [
      ["A sensor gives a robot...", "Input", "Output"], ["A robot's motor moving is an...", "Output", "Input"], ["A touch sensor feels a wall. That is an...", "Input", "Output"],
      ["A robot's speaker beeping is an...", "Output", "Input"], ["Which is a sensor job?", "Sense the light", "Move wheels"], ["A robot's light turning on is an...", "Output", "Input"],
      ["A sound sensor hears a clap. This is...", "Input", "Output"]
    ]),
    les("Steps in order", [
      ["Sequence", "🔢", "A <b>sequence</b> is steps in the right order. Robots follow steps exactly."],
      ["Order matters", "🧦 👟", "Socks go on before shoes. The wrong order does not work!"],
      ["Programs", "⌨️", "A program is a list of steps for a computer or robot to follow."]
    ], ["Think about what must happen first.", "Each step must be possible when you get to it.", "Example: to make toast, put bread in the toaster first, then press the lever. Now try yours."], [
      ["What comes first?", "Put on socks", "Put on shoes"], ["A list of steps in order is a...", "Sequence", "Rainbow"], ["For a robot to move forward 3, then turn, the steps are in...", "A set order", "Any order at all"],
      ["To build a block tower, first you...", "Put down the bottom blocks", "Put the top block on air"], ["A program is a list of...", "Steps", "Colors"], ["Which order makes sense?", "Plan, build, test", "Test, plan, build"],
      ["If steps are in the wrong order, the robot may...", "Do the wrong thing", "Sing"]
    ]),
    num("Repeat loops", [
      ["Loop", "🔁", "A <b>loop</b> repeats steps. \"Repeat 3 times: move 2\" means move 2, then 2, then 2."],
      ["Shorter code", "✂️", "Loops save time. You write the steps once instead of many times."],
      ["Count it", "🧮", "Times to repeat × steps each time = total."]
    ], () => {
      const r = ri(2, 5), s = ri(2, 4);
      const who = pick(["robot", "rover", "toy car"]);
      return { visual: "🔁", text: `A ${who} program says: repeat ${r} times: move ${s} steps. How many steps does it move in all?`, answer: r * s, hints: ["The loop repeats the same move.", "Add the steps for each repeat, or multiply.", "Example: repeat 3 times: move 2 steps gives 2 + 2 + 2 = 6. Now do yours."] };
    }),
    les("Reduce, reuse, recycle", [
      ["Three Rs", "♻️", "<b>Reduce</b> means use less. <b>Reuse</b> means use again. <b>Recycle</b> means turn old things into new ones."],
      ["Engineers help", "🌍", "Engineers design things that last longer and can be recycled."],
      ["Try it", "🥫", "A jar can be reused to hold pencils. Old cans and paper can be recycled."]
    ], ["Reduce is less. Reuse is again. Recycle is made new.", "Re- means again.", "Example: using a jar as a pencil holder is reusing. Now try yours."], [
      ["Using a jar again for pencils is...", "Reuse", "Reduce", "Recycle"], ["Using less plastic is...", "Reduce", "Reuse", "Recycle"], ["Melting old cans to make new cans is...", "Recycle", "Reuse", "Reduce"],
      ["Which helps the Earth?", "Recycling", "Littering"], ["Reduce means to use...", "Less", "More"], ["A reusable water bottle is an example of...", "Reuse", "Throwing away"],
      ["Engineers design things to be...", "Long-lasting", "Broken fast"]
    ]),
    null, null
  ];
  d[18] = mix("Mixed practice", at(d, [0, 2, 3, 5, 7, 9, 13, 14, 15]));
  d[19] = mix("Level 4 Challenge", at(d, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 5 =================
  const e = [
    les("The design loop", [
      ["Test it", "🧪", "After you create something, <b>test</b> it. Does it do what it should?"],
      ["Improve", "🔧", "Use what you learned from the test to make it better. Then test again."],
      ["A loop", "🔄", "Ask, Imagine, Plan, Create, Test, Improve. Real engineers repeat the loop many times."]
    ], ["Testing comes after building.", "Improve using what the test showed.", "Example: a paper plane flies short, so you fold sharper wings and test again. Now try yours."], [
      ["You built a boat. What next?", "Test it", "Never use it", "Throw it away"], ["A test shows a problem. You should...", "Improve the design", "Hide the test"], ["Engineers repeat the design steps because...", "Each round makes it better", "They forget"],
      ["After improving, you...", "Test again", "Stop forever"], ["Testing tells you whether the design...", "Works well", "Smells nice"], ["Which step uses the test result?", "Improve", "Ask"], ["The design process is a...", "Loop", "Straight line only"]
    ]),
    les("What is the problem?", [
      ["Problem statement", "❓", "Write the problem in one clear sentence: <b>Who</b> needs <b>what</b>, and why."],
      ["Example", "🎒", "\"Kids need a way to carry heavy books without hurting their backs.\""],
      ["Not the answer", "🚫", "A problem statement says what is wrong, not the solution. \"Make a backpack\" is a solution."]
    ], ["Say who needs it and what they need.", "Do not name the solution yet.", "Example: \"People need a dry way to walk in rain\" names the problem, not the umbrella. Now try yours."], [
      ["Which is a problem?", "Kids get wet walking in the rain", "Build an umbrella", "Buy a raincoat"], ["Which is a solution?", "A new backpack", "Backs hurt from heavy books"],
      ["A good problem statement says...", "Who needs what", "Which tool to use"], ["Which is a clear problem?", "The toy keeps falling off the shelf", "Make a shelf with a lip"], ["Before building, first define the...", "Problem", "Prize"],
      ["\"Plants need water while we are away\" is a...", "Problem", "Solution"], ["Why not put the answer in the problem?", "You might miss better ideas", "It's too long"]
    ]),
    les("Brainstorming", [
      ["Many ideas", "💡💡💡", "<b>Brainstorming</b> means coming up with lots of ideas, even silly ones."],
      ["No judging", "🙂", "Do not say \"that is bad\" while brainstorming. Write every idea down."],
      ["Then choose", "✅", "After brainstorming, pick the best idea using your rules."]
    ], ["Brainstorming is about quantity first.", "Pick later, not during.", "Example: for a way to keep a door open, ideas are a wedge, a heavy bag, a hook. Now try yours."], [
      ["In brainstorming you try to get...", "Lots of ideas", "One perfect idea"], ["While brainstorming you should...", "Write every idea down", "Say no to ideas"], ["When do you pick the best idea?", "After brainstorming", "Before you start"],
      ["Brainstorming works well with...", "A team", "Nothing"], ["A silly idea during brainstorming is...", "Okay to write", "Not allowed"], ["You choose the best idea using your...", "Rules", "Mood"],
      ["Brainstorming helps you find...", "More solutions", "Fewer solutions"]
    ]),
    les("Criteria and constraints", [
      ["Criteria", "✅", "<b>Criteria</b> are what a good design must do. For example: holds 5 blocks."],
      ["Constraints", "🚧", "<b>Constraints</b> are limits like time, money, size and materials."],
      ["Together", "🤝", "A good design meets all the criteria and stays inside the constraints."]
    ], ["Criteria = must do. Constraints = limits.", "Time, cost and size are limits.", "Example: \"must hold a toy car\" is a criterion. \"Use only 8 straws\" is a constraint. Now try yours."], [
      ["\"Must hold a toy car\" is a...", "Criterion", "Constraint"], ["\"Use only 8 straws\" is a...", "Constraint", "Criterion"], ["Which is a constraint?", "Only 1 hour to build", "Be strong"],
      ["Which is a criterion?", "Must stand on its own", "Only $5 to spend"], ["A design that uses 12 straws when only 8 are allowed breaks the...", "Constraint", "Weather"], ["Constraints are...", "Limits", "Wishes"],
      ["Criteria tell you what the design must...", "Do", "Cost"]
    ]),
    les("Compare designs", [
      ["Choose", "⚖️", "When you have a few ideas, compare them against your criteria."],
      ["Count", "✅❌", "Give a check for each rule it meets. The design with the most checks is usually best."],
      ["Fair", "🎯", "Compare using the same test for each design."]
    ], ["Count how many rules each design meets.", "Choose the one that meets the most.", "Example: Design X meets 2 rules and Design Y meets 3, so Y is the better choice. Now try yours."], [
      ["Design A meets 2 rules, B meets 3. Which is better?", "B", "A", "Both are equal"], ["Design 1 meets 4 rules, design 2 meets 1. Which is better?", "Design 1", "Design 2"], ["To compare fairly, use the...", "Same test for each", "A different test for each"],
      ["A design that is too big for the space...", "Breaks a rule", "Is perfect"], ["Three designs: 1 check, 3 checks, 2 checks. Best is the one with...", "3 checks", "1 check"], ["We compare designs against our...", "Criteria", "Birthdays"],
      ["If two designs tie, you can...", "Test them more", "Ignore the rules"]
    ]),
    les("Fair tests", [
      ["Fair test", "⚖️", "In a <b>fair test</b> you change only <b>one thing</b>. Everything else stays the same."],
      ["Example", "✈️", "To test paper type for a plane, use the same fold, the same throw and the same place. Change only the paper."],
      ["Why", "🔍", "If you change two things, you can't tell which one made the difference."]
    ], ["Change only one thing at a time.", "Keep everything else the same.", "Example: to test which ramp height rolls a ball farthest, use the same ball and floor. Now try yours."], [
      ["In a fair test you change...", "One thing", "Everything"], ["Testing which paper makes the best plane. What stays the same?", "The fold and the throw", "The paper"], ["Why change only one thing?", "To know what caused the difference", "To waste time"],
      ["Testing ball size on a ramp. What do you change?", "The ball size", "The ramp"], ["A test where you change two things at once is...", "Not fair", "Fair"], ["Which is part of a fair test?", "Same starting spot", "A different start each time"],
      ["Testing which glue is stronger. Keep the same...", "Weight on it", "Glue used"]
    ]),
    num("Read the graph", [
      ["Tally marks", "||||", "A <b>tally</b> counts things with marks. Groups of five help: four lines and one across."],
      ["Bar graph", "📊", "A <b>bar graph</b> uses bars. A taller bar means more."],
      ["Compare", "🔢", "Find how many more or fewer by subtracting the smaller number."]
    ], () => {
      const names = shuf(["Tower A", "Tower B", "Tower C"]), vals = [ri(3, 9), ri(3, 9), ri(3, 9)];
      const mode = ri(0, 2);
      const row = names.map((n, i) => `${n}: ${vals[i]} blocks`).join(", ");
      if (mode === 0) { const i = ri(0, 2); return { visual: "📊", text: `Heights in blocks: ${row}. How tall is ${names[i]}?`, answer: vals[i], hints: ["Find the name in the list.", "Read the number beside that name.", "Example: in 'Tower X: 5 blocks, Tower Y: 7 blocks', Tower Y is 7. Now do yours."] }; }
      if (mode === 1) { const i = ri(0, 2), j = (i + 1) % 3; const hi = Math.max(vals[i], vals[j]), lo = Math.min(vals[i], vals[j]); return { visual: "📊", text: `Heights in blocks: ${row}. How many more blocks is the taller of ${names[i]} and ${names[j]}?`, answer: hi - lo, hints: ["Find the two numbers.", "Subtract the smaller from the larger.", "Example: 8 blocks and 5 blocks differ by 8 - 5 = 3. Now do yours."] }; }
      return { visual: "📊", text: `Heights in blocks: ${row}. How many blocks in all three towers?`, answer: vals[0] + vals[1] + vals[2], hints: ["All three means add them up.", "Add the three numbers.", "Example: 2 + 4 + 5 = 11 blocks. Now do yours."] };
    }),
    les("Lever parts", [
      ["Three parts", "⚖️", "A lever has a <b>fulcrum</b> (the turning point), a <b>load</b> (what you lift) and an <b>effort</b> (your push or pull)."],
      ["Example", "🪵", "On a see-saw, the middle is the fulcrum. The kid on one side is the load, and you push down on the other side."],
      ["Closer to the load", "📏", "Putting the fulcrum closer to the load makes it easier to lift."]
    ], ["Find the turning point first.", "Load = what is lifted. Effort = what you push.", "Example: in a wheelbarrow the wheel is the fulcrum and the dirt is the load. Now try yours."], [
      ["The turning point of a lever is the...", "Fulcrum", "Load", "Effort"], ["What you lift with a lever is the...", "Load", "Fulcrum", "Axle"], ["Your push on a lever is the...", "Effort", "Load", "Fulcrum"],
      ["On a see-saw, the middle is the...", "Fulcrum", "Load", "Effort"], ["A fulcrum closer to the load makes lifting...", "Easier", "Harder"], ["In a wheelbarrow, the wheel is the...", "Fulcrum", "Handle"],
      ["A lever has how many main parts?", "3", "5", "9"]
    ]),
    les("Gears", [
      ["Gears", "⚙️", "<b>Gears</b> are wheels with teeth. The teeth lock together so turning one turns the other."],
      ["Opposite way", "🔄", "Two gears touching turn in <b>opposite directions</b>. If one goes clockwise, the next goes counter-clockwise."],
      ["Speed", "🚲", "A small gear turns faster than the big gear it drives."]
    ], ["Touching gears turn opposite ways.", "Small gears turn faster than big gears.", "Example: gear 1 goes clockwise so gear 2 goes counter-clockwise. Now try yours."], [
      ["Gear A turns clockwise. The gear touching it turns...", "Counter-clockwise", "Clockwise", "Not at all"], ["Gears have...", "Teeth", "Fins", "Roots"], ["A small gear turns ___ than a big gear it touches.", "Faster", "Slower"],
      ["Two gears touching turn in ___ directions.", "Opposite", "The same"], ["Three gears in a row. Gear 1 goes clockwise. Gear 3 goes...", "Clockwise", "Counter-clockwise"], ["A bike uses gears to change...", "How hard it is to pedal", "Its color"],
      ["Teeth on gears help them...", "Lock together", "Fly"]
    ]),
    les("Pulley systems", [
      ["Fixed pulley", "🎏", "A <b>fixed pulley</b> is attached high up. It changes the direction of your pull."],
      ["Moving pulley", "🏗️", "A <b>moving pulley</b> moves with the load. It makes lifting easier but you pull more rope."],
      ["Together", "➕", "Many pulleys together make a lifting system for heavy loads."]
    ], ["Fixed stays put. Moving travels with the load.", "More pulleys can make it easier but need more rope.", "Example: a flag pulley is fixed. Now try yours."], [
      ["A pulley that stays in one place is a...", "Fixed pulley", "Moving pulley"], ["A fixed pulley changes the ___ of the pull.", "Direction", "Taste"], ["A pulley that moves with the load is a...", "Moving pulley", "Fixed pulley"],
      ["Adding pulleys can make lifting...", "Easier", "Impossible"], ["With more pulleys you pull ___ rope.", "More", "Less"], ["A flagpole pulley is...", "Fixed", "Moving"],
      ["Cranes use pulleys to...", "Lift heavy loads", "Swim"]
    ]),
    les("Push and pull inside", [
      ["Squash", "🧱", "<b>Compression</b> is a squashing force. A column holding up a roof is squashed."],
      ["Stretch", "🪢", "<b>Tension</b> is a pulling force. A rope holding a swing is stretched."],
      ["Both", "🌉", "Bridges have both: some parts get squashed and some get stretched."]
    ], ["Squash = compression. Stretch = tension.", "Think: is it being pushed together or pulled apart?", "Example: a table leg is squashed (compression). Now try yours."], [
      ["A rope holding a swing is in...", "Tension", "Compression"], ["A column holding a roof is in...", "Compression", "Tension"], ["Tension means being...", "Pulled", "Squashed"],
      ["Compression means being...", "Squashed", "Stretched"], ["The cable of a suspension bridge is in...", "Tension", "Compression"], ["A tent pole pushed down by the tent is in...", "Compression", "Tension"],
      ["A bridge can have...", "Both kinds", "Neither kind"]
    ]),
    les("Foundations", [
      ["Foundation", "🏠", "A <b>foundation</b> is the strong base under a building. It holds the whole building up."],
      ["Wide and deep", "⛏️", "Tall buildings need a deep, wide foundation so they do not sink or lean."],
      ["Soft ground", "🏖️", "Sand and mud are soft. Engineers use strong posts or concrete to hold buildings."]
    ], ["Foundations are at the bottom.", "Bigger buildings need stronger foundations.", "Example: houses on soft ground need deep posts. Now try yours."], [
      ["A foundation is the building's...", "Base", "Roof", "Door"], ["A very tall tower needs a ___ foundation.", "Deep and wide", "Tiny"], ["A foundation helps a building not...", "Sink or lean", "Have windows"],
      ["Soft sand is a ___ place for a tall building without help.", "Poor", "Great"], ["Foundations are found...", "Under buildings", "On the roof"], ["Which is stronger as a foundation?", "Concrete", "Whipped cream"],
      ["A strong foundation makes a building...", "Stable", "Wobbly"]
    ]),
    les("Conductors and insulators", [
      ["Conductors", "🔌", "A <b>conductor</b> lets electricity flow through. Metals like copper are good conductors."],
      ["Insulators", "🧤", "An <b>insulator</b> does not let electricity flow. Plastic, rubber, wood and glass are insulators."],
      ["Wires", "🧵", "Wires are copper inside (conductor) and plastic outside (insulator) to keep us safe."]
    ], ["Metals let electricity through.", "Plastic, rubber and wood do not.", "Example: the copper in a cord is the conductor and the plastic coat is the insulator. Now try yours."], [
      ["Which is a good conductor?", "Copper wire", "Rubber band", "Wooden stick"], ["Which is an insulator?", "Plastic", "Copper", "Iron"], ["The plastic coat on a wire is there to...", "Keep us safe", "Make it heavy"],
      ["Inside a cord, the wire is...", "Metal", "Plastic"], ["Which would NOT carry electricity?", "Rubber", "Steel"], ["A conductor lets electricity...", "Flow", "Stop"],
      ["An insulator is useful for...", "Safety coverings", "Making electricity"]
    ]),
    les("Open or closed?", [
      ["Closed circuit", "✅", "A <b>closed</b> circuit is a complete loop. Electricity flows and the bulb lights."],
      ["Open circuit", "❌", "An <b>open</b> circuit has a gap. Electricity stops and the bulb stays off."],
      ["Why switches", "🔘", "A switch lets you open and close the loop on purpose."]
    ], ["Closed means connected. Open means a gap.", "Electricity only flows in a closed circuit.", "Example: flipping a light switch up closes the circuit so the light turns on. Now try yours."], [
      ["A bulb is lit. The circuit is...", "Closed", "Open"], ["A wire is broken. The circuit is...", "Open", "Closed"], ["A closed circuit makes the bulb...", "Light up", "Stay dark"],
      ["An open switch means the light is...", "Off", "On"], ["A circuit with a gap is...", "Open", "Closed"], ["You press a doorbell button and it rings. The circuit became...", "Closed", "Open"],
      ["A switch can...", "Open or close the circuit", "Make batteries"]
    ]),
    les("If this, then that", [
      ["If-then", "🤖", "A robot can make choices with <b>if-then</b> rules. \"If the path is blocked, then turn.\""],
      ["Sensor checks", "👁️", "The robot checks its sensor. If the answer is yes, it does the action."],
      ["Else", "↔️", "\"Else\" means otherwise. \"If blocked, turn. Else, go forward.\""]
    ], ["Check the if part first.", "If true, do the then part. If not, do the else part.", "Example: if it is dark, then turn on the lamp; else keep it off. Now try yours."], [
      ["If a wall is ahead then turn. A wall is ahead. The robot will...", "Turn", "Go forward"], ["If it is dark then lights on. It is sunny. The lights are...", "Off", "On"], ["\"Else\" means...", "Otherwise", "Always"],
      ["If the floor is dirty then clean. It is dirty. The robot will...", "Clean", "Sleep"], ["If touch sensor pressed then stop. It is not pressed. The robot...", "Keeps moving", "Stops"], ["An if-then rule helps robots make...", "Choices", "Cookies"],
      ["If the battery is low then go charge. The battery is full. The robot...", "Keeps working", "Goes to charge"]
    ]),
    num("Loop and count", [
      ["Counting steps", "🧮", "To count a loop's moves, multiply how many times it repeats by the steps in each repeat."],
      ["Two parts", "➕", "If the program has two loops, find each total and add them."],
      ["Example", "🤖", "Repeat 3 times: move 2 = 6. Then move 1 more = 7 steps in all."]
    ], () => {
      const r = ri(2, 5), s = ri(2, 4), extra = ri(1, 5);
      return { visual: "🤖", text: `A robot program: repeat ${r} times: move ${s} steps. Then move ${extra} more steps. How many steps in all?`, answer: r * s + extra, hints: ["First work out the loop's total.", "Loop total is repeats × steps, then add the extra.", "Example: repeat 4 times: move 2, then 3 more gives 8 + 3 = 11. Now do yours."] };
    }),
    num("Edge around it", [
      ["Perimeter", "🔲", "<b>Perimeter</b> is the distance around the outside of a shape. Add up all its sides."],
      ["Rectangle", "▭", "A rectangle has two long sides and two short sides. Add all four."],
      ["Use it", "🚧", "Engineers use perimeter to know how much fence or edge trim to buy."]
    ], () => {
      const mode = ri(0, 1);
      if (mode === 0) { const a = ri(2, 9), b = ri(2, 9); return { visual: "▭", text: `A robot track is a rectangle ${a} m long and ${b} m wide. How many meters is the track all the way around?`, answer: 2 * (a + b), hints: ["Go all the way around the outside.", "Add: long + wide + long + wide.", "Example: a 4 m by 3 m rectangle is 4 + 3 + 4 + 3 = 14 m around. Now do yours."] }; }
      const s = ri(2, 9); return { visual: "🟦", text: `A square sandbox has sides that are ${s} m long. How many meters is the edge all the way around?`, answer: s * 4, hints: ["A square has four equal sides.", "Add the side four times.", "Example: a square with 5 m sides is 5 + 5 + 5 + 5 = 20 m. Now do yours."] };
    }),
    les("Engineers help people", [
      ["Helping", "💗", "Engineers design things to help: wheelchairs, glasses, clean water systems and safe cars."],
      ["Everyone", "🌎", "Good designs work for many kinds of people, big and small, young and old."],
      ["Safe testing", "🦺", "Engineers test designs safely before people use them."]
    ], ["Think of who is helped.", "Safe and fair for everyone.", "Example: a ramp helps wheelchair users and parents with strollers. Now try yours."], [
      ["Engineers design things to...", "Help people", "Trick people"], ["A ramp next to stairs helps...", "People who can't use stairs", "No one"], ["Before people use a bridge, engineers must...", "Test it safely", "Skip testing"],
      ["A good design works for...", "Many kinds of people", "Only one person"], ["Clean water systems help...", "Keep people healthy", "Make water dirty"], ["Seat belts are designed to...", "Keep people safe", "Look funny"],
      ["Engineers care most about making things...", "Safe and useful", "Confusing"]
    ]),
    null, null
  ];
  e[18] = mix("Mixed practice", at(e, [0, 3, 5, 7, 8, 10, 12, 13, 14]));
  e[19] = mix("Level 5 Challenge", at(e, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 6 =================
  const f = [
    les("Iterate and improve", [
      ["Iteration", "🔁", "<b>Iterating</b> means making a better version again and again. Version 1, then 2, then 3."],
      ["Change one thing", "🔧", "Change one part at a time and test. Then you know what helped."],
      ["Keep notes", "📝", "Write down what you tried and what happened so you do not repeat mistakes."]
    ], ["Each round builds on the last one.", "Notes help you remember.", "Example: a paper plane flew short, so you tried longer wings and wrote down the result. Now try yours."], [
      ["Making a better version again and again is...", "Iterating", "Forgetting"], ["When improving, change...", "One part at a time", "Everything at once"], ["Why keep notes?", "To remember what worked", "To fill paper"],
      ["Version 2 should be...", "Better than version 1", "The same always"], ["A failed test is...", "Useful information", "A reason to quit"], ["After a change you should...", "Test again", "Hide it"],
      ["Which engineer is doing it right?", "Tries, tests and keeps notes", "Builds once and never tests"]
    ]),
    les("Models and scale", [
      ["Models", "🏠", "A <b>model</b> is a smaller (or bigger) copy of a real thing. Architects make small models of buildings."],
      ["Scale", "📐", "<b>Scale</b> tells how much smaller. If 1 cm on the model is 1 m in real life, the model is 100 times smaller."],
      ["Use", "🧪", "Testing a model costs less than testing the real thing."]
    ], ["A model is a copy at a different size.", "Scale connects model size to real size.", "Example: if 1 cm stands for 2 m, a 5 cm model wall is 10 m in real life. Now try yours."], [
      ["A small copy of a real building is a...", "Model", "Wall", "Cloud"], ["Why make a model before building a real bridge?", "It costs less to test", "It is the final bridge"], ["Scale tells how much...", "Bigger or smaller the model is", "A building weighs"],
      ["Toy cars are usually models that are...", "Smaller than real cars", "Bigger than real cars"], ["A map is a model of...", "A place", "A sound"], ["A model house is smaller than the real one. That means it is a...", "Scale model", "Bigger copy"],
      ["Models help you find problems...", "Early", "Never"]
    ]),
    num("Meters and centimeters", [
      ["Units", "📏", "<b>100 cm = 1 m</b>. Use cm for small things and meters for big things like rooms."],
      ["Change units", "🔄", "To change meters to cm, multiply by 100. For a half meter, it is 50 cm."],
      ["Add", "➕", "Add lengths when they are in the same unit."]
    ], () => {
      const mode = ri(0, 2);
      if (mode === 0) { const m = ri(2, 6); return { visual: "📏", text: `A plank is ${m} meters long. How many centimeters is that?`, answer: m * 100, hints: ["There are 100 cm in 1 m.", "Multiply the meters by 100.", "Example: 3 m is 3 × 100 = 300 cm. Now do yours."] }; }
      if (mode === 1) { const c = ri(2, 9) * 100; return { visual: "📏", text: `A wall is ${c} cm tall. How many meters is that?`, answer: c / 100, hints: ["100 cm makes one meter.", "Divide the cm by 100.", "Example: 500 cm is 500 ÷ 100 = 5 m. Now do yours."] }; }
      const a = ri(2, 9), b = ri(2, 9); return { visual: "🪵", text: `A beam is ${a} m long. A second beam is ${b} m long. Laid end to end, how many meters long?`, answer: a + b, hints: ["End to end means add.", "Both are in meters, so add the numbers.", "Example: 4 m and 3 m make 4 + 3 = 7 m. Now do yours."] };
    }),
    num("Floor plan area", [
      ["Area", "🟩", "<b>Area</b> is how much flat space a shape covers. We count square units."],
      ["Rows and columns", "🔢", "Area of a rectangle = rows × columns of squares."],
      ["Use", "🏗️", "Engineers use area to know how much floor, paint or tile they need."]
    ], () => {
      const r = ri(2, 6), c = ri(2, 6), mode = ri(0, 1);
      if (mode === 0) return { visual: "🟩", text: `A robot arena floor has ${r} rows of tiles. Each row has ${c} tiles. How many tiles cover the floor?`, answer: r * c, hints: ["Count the tiles in each row, then all rows.", "Rows × tiles in each row.", "Example: 3 rows of 4 tiles is 3 × 4 = 12 tiles. Now do yours."] };
      return { visual: "📐", text: `A model room is ${r} squares long and ${c} squares wide. What is its area in squares?`, answer: r * c, hints: ["Area counts all the squares inside.", "Multiply length by width.", "Example: 2 by 5 squares has area 2 × 5 = 10. Now do yours."] };
    }),
    les("Lever balance", [
      ["Balance", "⚖️", "A lever balances when the pushes on each side are equal. Weight times distance from the fulcrum matters."],
      ["Closer or farther", "↔️", "A heavy kid sits close to the middle. A light kid sits far from the middle to balance."],
      ["Effort", "💪", "A longer handle on the effort side means you need less push."]
    ], ["Heavy means close, light means far.", "A long handle gives more help.", "Example: a long crowbar lifts a rock more easily than a short one. Now try yours."], [
      ["A heavy kid on a see-saw should sit...", "Closer to the middle", "Farther from the middle"], ["A light kid balances a heavy one by sitting...", "Farther from the middle", "Closer to the middle"], ["A longer lever handle means you need ___ effort.", "Less", "More"],
      ["A short crowbar vs a long crowbar: which lifts a rock more easily?", "The long one", "The short one"], ["A lever balances when both sides are...", "Equal in turning effect", "Different colors"], ["To lift a load more easily, move the fulcrum...", "Closer to the load", "Farther from the load"],
      ["Using the end of a long wrench makes a stuck bolt turn...", "More easily", "Less easily"]
    ]),
    les("Gentle ramps", [
      ["Work trade", "📐", "A ramp makes the push smaller, but you push over a longer distance. You get help, but it takes longer."],
      ["Steep or gentle", "⛰️", "A gentle ramp needs less push than a steep ramp to reach the same height."],
      ["Friction", "🧱", "Rough ramps add friction and need more push. Smooth ramps need less."]
    ], ["Longer ramp means less push but farther.", "Rough surfaces add friction.", "Example: a gentle truck ramp needs a long slope. Now try yours."], [
      ["Which ramp needs less push to get to the same height?", "The gentler one", "The steeper one"], ["A longer ramp means you push over a ___ distance.", "Longer", "Shorter"], ["A rough ramp needs ___ push than a smooth one.", "More", "Less"],
      ["Ramps help you by making the push...", "Smaller", "Bigger"], ["A very steep ramp is ___ to climb with a load.", "Harder", "Easier"], ["To make a ramp easier, you could...", "Make it longer", "Make it steeper"],
      ["A skateboard park ramp is smooth to reduce...", "Friction", "Fun"]
    ]),
    num("Gear turns", [
      ["Same size", "⚙️", "Two gears of the same size turn the same number of times."],
      ["Half the teeth", "🔄", "A gear with half as many teeth turns twice for each turn of the big gear."],
      ["Count", "🧮", "Small gear turns = big gear turns × 2 (when it has half the teeth)."]
    ], () => {
      const t = ri(2, 6), mode = ri(0, 1);
      if (mode === 0) return { visual: "⚙️", text: `A big gear turns ${t} times. It drives a small gear with half as many teeth. How many times does the small gear turn?`, answer: t * 2, hints: ["Fewer teeth means it turns more.", "Half the teeth turns twice as many times.", "Example: if the big gear turns 3 times, the half-size gear turns 3 × 2 = 6 times. Now do yours."] };
      return { visual: "⚙️⚙️", text: `Two gears have the same size. The first turns ${t} times. How many times does the second turn?`, answer: t, hints: ["Compare the gear sizes.", "Same size means same number of turns.", "Example: two matching gears: if one turns 7 times, so does the other. Now do yours."] };
    }),
    les("Triangles in trusses", [
      ["Truss", "🏗️", "A <b>truss</b> is a frame made of triangles. It is light but very strong."],
      ["Why triangles", "🔺", "A triangle cannot change shape unless a side breaks. A four-sided frame can squash flat."],
      ["Where", "🌉", "Trusses hold up bridges, roofs, cranes and towers."]
    ], ["Triangles do not change shape.", "Four-sided frames can squash.", "Example: a gate with a diagonal brace across it stays square. Now try yours."], [
      ["A truss is made of...", "Triangles", "Circles", "Pillows"], ["Adding a diagonal brace to a square frame makes it...", "Stiffer", "Wobblier"], ["Which frame shape cannot squash flat unless a side breaks?", "Triangle", "Square"],
      ["Trusses are used in...", "Bridges and roofs", "Soup"], ["Trusses are strong and also...", "Light", "Heavy always"], ["A cross brace on a shelf prevents it from...", "Leaning over", "Having books"],
      ["Bridge frames often show many...", "Triangles", "Hearts"]
    ]),
    les("Arches and beams", [
      ["Beams bend", "➖", "A <b>beam</b> is a flat bar. If it is long and loaded in the middle, it bends."],
      ["Arches spread", "🌈", "An <b>arch</b> passes the load sideways to its ends. Stone arches have lasted for thousands of years."],
      ["Make stronger", "📏", "Make a beam stronger by making it deeper (taller), not just wider, or by adding a support in the middle."]
    ], ["Long flat beams sag in the middle.", "Arches push the load down into their ends.", "Example: a bridge arch carries weight to the ground at both ends. Now try yours."], [
      ["A long beam with a heavy load in the middle will...", "Bend", "Fly"], ["An arch carries weight to its...", "Ends", "Roof only"], ["A support in the middle of a beam makes it...", "Stronger", "Weaker"],
      ["Which can last thousands of years?", "A stone arch", "A paper beam"], ["Making a beam deeper (taller) makes it...", "Stiffer", "Floppier"], ["Which shape spreads load to its two ends?", "Arch", "Flat sheet"],
      ["A short beam bends ___ a long one.", "Less than", "More than"]
    ]),
    les("Building materials", [
      ["Steel and concrete", "🏢", "<b>Steel</b> is strong when pulled. <b>Concrete</b> is strong when squashed. Together they make strong buildings."],
      ["Wood and brick", "🪵 🧱", "<b>Wood</b> is light and easy to cut. <b>Brick</b> is hard and lasts a long time."],
      ["Glass", "🪟", "<b>Glass</b> lets light in but can break."]
    ], ["Match the property to the job.", "Concrete resists squashing. Steel resists stretching.", "Example: a lightweight roof frame could use wood. Now try yours."], [
      ["Which material lets light into a room?", "Glass", "Brick", "Concrete"], ["Concrete is strong when it is...", "Squashed", "Stretched"], ["Steel is strong when it is...", "Pulled", "Left alone only"],
      ["Which is light and easy to cut?", "Wood", "Steel beam", "Concrete block"], ["Bricks are used for walls because they are...", "Hard and long-lasting", "Soft and floppy"], ["Steel rods inside concrete make it...", "Stronger", "Weaker"],
      ["Which is likely to break if dropped?", "Glass", "Steel", "Rubber"]
    ]),
    les("Where energy comes from", [
      ["Renewable", "☀️ 💨 💧", "<b>Renewable</b> energy does not run out: sunshine, wind and moving water."],
      ["Devices", "🔋", "Solar panels use sunlight. Wind turbines use wind. Dams use falling water to make electricity."],
      ["Not renewable", "⛽", "Coal, oil and gas can run out one day. We try to use them carefully."]
    ], ["Sun, wind and water keep coming back.", "Fuels dug from the ground run out.", "Example: a windmill spins from wind, which is renewable. Now try yours."], [
      ["Solar panels use...", "Sunlight", "Wind", "Coal"], ["Wind turbines use...", "Wind", "Sunshine", "Oil"], ["Which is renewable?", "Sunshine", "Oil", "Coal"],
      ["Which can run out one day?", "Oil", "Wind", "Sunlight"], ["A dam makes electricity from...", "Moving water", "Sand"], ["Renewable means it...", "Does not run out", "Costs a lot"],
      ["A solar-powered calculator uses...", "Light", "Wind"]
    ]),
    les("Wasted energy", [
      ["Efficiency", "💡", "A device is <b>efficient</b> if it turns most of its energy into what we want, with little wasted."],
      ["Heat waste", "🔥", "An old light bulb makes lots of heat as well as light, so it wastes energy. An LED bulb stays cooler and wastes less."],
      ["Saving", "🌱", "Efficient designs save energy and money."]
    ], ["Wasted energy often turns into heat.", "Efficient means less waste.", "Example: a warm phone charger is wasting a little energy as heat. Now try yours."], [
      ["An LED bulb is more efficient than an old bulb because it wastes less as...", "Heat", "Sound", "Paint"], ["Efficient means little energy is...", "Wasted", "Needed"], ["An old bulb feels hot. That heat is energy that is...", "Wasted", "Saved"],
      ["Efficient designs save...", "Energy and money", "Only rainbows"], ["Which is more efficient?", "An LED bulb", "An old hot bulb"], ["Switching off lights not in use...", "Saves energy", "Wastes energy"],
      ["A device that is mostly warm when it should be working is...", "Wasting energy", "Super efficient"]
    ]),
    les("Robot sensors", [
      ["Light and touch", "💡 ✋", "A <b>light sensor</b> tells light from dark. A <b>touch sensor</b> feels a bump."],
      ["Distance", "📡", "A <b>distance sensor</b> sends out a beep or light and measures how far away something is."],
      ["Sound and heat", "🎤 🌡️", "A <b>sound sensor</b> hears noise. A <b>temperature sensor</b> senses hot and cold."]
    ], ["Match the sensor to the thing it measures.", "Light, touch, distance, sound, temperature.", "Example: a robot vacuum uses a bump sensor to know when it hit a chair. Now try yours."], [
      ["Which sensor tells how far a wall is?", "Distance sensor", "Sound sensor", "Touch sensor"], ["A robot needs to know if a room is dark. It uses a...", "Light sensor", "Touch sensor"], ["A robot that stops at a clap uses a...", "Sound sensor", "Light sensor"],
      ["A thermostat uses a...", "Temperature sensor", "Touch sensor"], ["A bump on a robot's front is detected by a...", "Touch sensor", "Sound sensor"], ["A parking sensor that beeps near a car uses...", "Distance sensing", "Sound recording"],
      ["Which sensor would help a robot avoid walls?", "Distance sensor", "Temperature sensor"]
    ]),
    num("Program a path", [
      ["Moves", "🧭", "Robots follow commands like forward, turn left and turn right."],
      ["Count it", "🧮", "Add up all the forward steps to find how far the robot goes."],
      ["Loops", "🔁", "A loop of 3 × (forward 2) is 6 steps forward."]
    ], () => {
      const a = ri(2, 6), b = ri(2, 6), r = ri(2, 4), s = ri(1, 3), mode = ri(0, 1);
      if (mode === 0) return { visual: "🧭", text: `A robot goes forward ${a} steps, turns right, then goes forward ${b} steps. How many steps forward in all?`, answer: a + b, hints: ["Turns do not add steps forward.", "Add the two forward moves.", "Example: forward 3, turn, forward 4 is 3 + 4 = 7 steps. Now do yours."] };
      return { visual: "🔁", text: `A robot repeats this ${r} times: forward ${s}, turn right. How many steps forward in all?`, answer: r * s, hints: ["Turns do not count as steps forward.", "Multiply repeats by forward steps.", "Example: repeat 5 times: forward 2, turn gives 5 × 2 = 10 steps. Now do yours."] };
    }),
    les("Find the bug", [
      ["Bug", "🐞", "A <b>bug</b> is a mistake in a program. <b>Debugging</b> is finding and fixing it."],
      ["Check", "🔍", "Run the program one step at a time. Find the step where things go wrong."],
      ["Test again", "✅", "After you fix the bug, run it again to make sure it works."]
    ], ["Read each step carefully.", "Find the first step that does something unexpected.", "Example: the robot should turn left but turns right. The bug is the turn command. Now try yours."], [
      ["A mistake in a program is a...", "Bug", "Feature", "Bell"], ["Finding and fixing mistakes is...", "Debugging", "Deleting"], ["The robot should go 4 steps but goes 6. The bug is in the...", "Number of steps", "Battery color"],
      ["The robot turns left instead of right. The bug is in the...", "Turn command", "Wheel size"], ["After fixing a bug, you should...", "Run it again", "Stop"], ["A good way to find a bug is to...", "Check one step at a time", "Ignore it"],
      ["The robot should stop at the wall but hits it. Which command may be missing?", "A stop command", "A color"]
    ]),
    les("Copy nature", [
      ["Biomimicry", "🌿", "<b>Biomimicry</b> means copying ideas from nature to solve problems."],
      ["Velcro", "🌸", "Velcro was invented after an engineer saw how burrs stick to fur and clothes with tiny hooks."],
      ["Kingfisher", "🐦 🚅", "A bullet train in Japan has a nose shaped like a kingfisher's beak so it moves quietly through air."]
    ], ["Look at nature for ideas.", "Bio means life. Mimic means copy.", "Example: a gecko's sticky feet inspired gripping tape. Now try yours."], [
      ["Copying ideas from nature is...", "Biomimicry", "Recycling", "Painting"], ["Velcro was inspired by...", "Burrs sticking to fur", "Clouds"], ["A bullet train nose was shaped like a...", "Kingfisher's beak", "Ball"],
      ["Which is an idea copied from nature?", "A plane shaped like a bird", "A plain square box"], ["Engineers copy nature because it...", "Has clever solutions", "Is easy to buy"], ["Birds' wings inspired the first...", "Airplane wings", "Pencils"],
      ["Bio means...", "Life", "Metal"]
    ]),
    num("Budget the build", [
      ["Cost", "💰", "Every design costs money. The <b>budget</b> is the most you may spend."],
      ["Add parts", "➕", "Add the price of each part to get the total cost."],
      ["Compare", "⚖️", "Subtract from the budget to see what is left."]
    ], () => {
      const a = ri(2, 9), b = ri(2, 9), c = ri(1, 5), mode = ri(0, 1);
      if (mode === 0) return { visual: "💰", text: `A robot kit needs wheels that cost $${a} and a motor that costs $${b}. What is the total cost in dollars?`, answer: a + b, hints: ["Total means add.", "Add the two prices.", "Example: a $3 wheel and a $4 motor cost 3 + 4 = $7. Now do yours."] };
      const budget = a + b + c + ri(1, 5); return { visual: "💰", text: `Your class budget is $${budget}. You spend $${a + c} on parts. How many dollars are left?`, answer: budget - a - c, hints: ["Money left means subtract.", "Take what you spent away from the budget.", "Example: budget $12, spent $7 leaves 12 - 7 = $5. Now do yours."] };
    }),
    les("Engineering careers", [
      ["Many jobs", "👩‍🔧 👨‍🔬", "<b>Mechanical</b> engineers design machines. <b>Electrical</b> engineers design circuits. <b>Civil</b> engineers design roads and bridges."],
      ["More", "✈️ 🌱", "<b>Aerospace</b> engineers design planes and rockets. <b>Environmental</b> engineers keep air and water clean."],
      ["Software", "💻", "<b>Software</b> engineers write programs and apps. Robotics engineers combine all of these."]
    ], ["Match the engineer to the thing they design.", "Machines, circuits, roads, planes, clean air, programs.", "Example: someone designing a skate park might be a civil engineer. Now try yours."], [
      ["Who designs bridges and roads?", "Civil engineer", "Software engineer"], ["Who designs rockets and planes?", "Aerospace engineer", "Environmental engineer"], ["Who writes apps?", "Software engineer", "Civil engineer"],
      ["Who designs circuits?", "Electrical engineer", "Environmental engineer"], ["Who helps keep water and air clean?", "Environmental engineer", "Aerospace engineer"], ["Who designs engines and machines?", "Mechanical engineer", "Software engineer"],
      ["Who builds robots using many skills?", "Robotics engineer", "Chef"]
    ]),
    null, null
  ];
  f[18] = mix("Mixed practice", at(f, [0, 3, 5, 7, 8, 10, 12, 13, 14]));
  f[19] = mix("Level 6 Challenge", at(f, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 4: d, 5: e, 6: f });
})();
