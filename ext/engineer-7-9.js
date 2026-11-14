// ext/engineer-7-9.js  Engineering levels 7-9 (3rd grade, 4th grade first half)
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
  // generated lesson: gen() returns {text, visual?, answer, hints:[3], choices?}
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

  // ================= LEVEL 7 =================
  const g = [
    les("Forces and motion", [
      ["Force", "👉", "A <b>force</b> is a push or a pull. A force can start something moving, stop it, speed it up, slow it down or turn it."],
      ["Bigger force", "🛒", "A bigger force changes motion more. A heavy cart needs a bigger push than an empty one to speed up the same amount."],
      ["Units", "🧮", "Scientists measure force in <b>newtons</b> (N). Lifting a small apple takes about 1 newton."]
    ], ["Think: is something being pushed, pulled, or both?", "A force can change how fast or in which direction something moves.", "Example: kicking a ball makes it start moving, and a goalie's catch stops it. Now try yours."], [
      ["Force is a...", "Push or a pull", "Kind of light", "Shape"], ["What unit measures force?", "Newton", "Meter", "Second"],
      ["A goalie catches a rolling ball. The force...", "Stops the ball", "Makes the ball bigger", "Makes the ball a different color"], ["Which needs the bigger push to move?", "A full wagon", "An empty wagon"],
      ["Pulling a drawer open is a...", "Pull force", "Light", "Sound"], ["A force can change a moving thing's...", "Speed or direction", "Name", "Color"],
      ["A strong wind blows a kite. What is the wind doing?", "Pushing it", "Saying hello", "Freezing it"], ["Pushing a toy car makes it...", "Start moving", "Disappear", "Grow"]
    ]),
    les("Balanced forces", [
      ["Balanced", "⚖️", "<b>Balanced</b> forces are equal and push in opposite directions. When forces are balanced, a still object stays still."],
      ["Unbalanced", "🪢", "In tug-of-war, if one team pulls harder the forces are <b>unbalanced</b> and the rope moves toward the stronger team."],
      ["Bridges", "🌉", "A bridge stands still because gravity pulls it down and the supports push up with an equal force."]
    ], ["Equal forces cancel each other out.", "Ask: are the two sides equal or is one stronger?", "Example: two kids push a box from opposite sides with equal strength, so the box stays put. Now try yours."], [
      ["Two equal pushes from opposite sides are...", "Balanced", "Unbalanced", "Gone"], ["In tug-of-war, the rope moves toward the team that pulls...", "Harder", "Softer", "Quieter"],
      ["A book rests on a table. The forces on it are...", "Balanced", "Unbalanced"], ["Unbalanced forces make a still object...", "Start to move", "Stay perfectly still"],
      ["A bridge stands still because gravity pulling down is...", "Balanced by supports pushing up", "Stronger than the supports"], ["Two teams pull equally hard in tug-of-war. The rope...", "Does not move", "Zooms away", "Flies up"],
      ["A rocket lifts off when the push up is...", "Bigger than gravity pulling down", "Smaller than gravity pulling down", "Zero"], ["Balanced forces on a still chair mean it...", "Stays still", "Starts sliding"]
    ]),
    les("Friction", [
      ["Rubbing", "🖐️", "<b>Friction</b> is a force that slows things when they rub together. Rub your hands fast and they get warm!"],
      ["More or less", "🧊", "Rough surfaces have more friction. Smooth, slippery or wet surfaces have less friction."],
      ["Use it", "👟", "Engineers add friction to shoe soles and tires so they grip. They add oil to machines to reduce friction."]
    ], ["Friction happens when surfaces rub.", "Rough means more rubbing force. Slippery means less.", "Example: a sled slides farther on ice than on grass because ice has less friction. Now try yours."], [
      ["Friction is a force that...", "Slows things rubbing together", "Makes things glow", "Makes things tall"], ["Which surface has the LEAST friction?", "Ice", "Sandpaper", "Carpet"],
      ["Why do tires have bumpy tread?", "To grip the road", "To look pretty", "To be quieter"], ["Oil in a machine...", "Reduces friction", "Adds friction", "Stops gravity"],
      ["Rubbing your hands makes them...", "Warm", "Cold", "Heavier"], ["Which toy car rolls farthest?", "One on a smooth floor", "One on thick carpet"],
      ["Which has MORE friction?", "Sandpaper", "Soap on glass", "Ice"], ["Why do climbers wear rough gloves?", "More friction for grip", "Less friction for sliding", "To be warm only"]
    ]),
    les("Levers: effort and load", [
      ["Parts", "🪵", "A lever has a <b>fulcrum</b> (the pivot), a <b>load</b> (what you lift) and an <b>effort</b> (the push or pull you use)."],
      ["Move the pivot", "⚖️", "Put the fulcrum <b>closer to the load</b> and the lever is easier to push. You need less effort, but you push through a longer distance."],
      ["Examples", "🔧", "A see-saw, a crowbar, scissors and a wheelbarrow are all levers."]
    ], ["Name the parts: pivot, thing lifted, push.", "Where the pivot is changes how hard the push must be.", "Example: a long crowbar with the pivot near the rock lifts it with a gentle push. Now try yours."], [
      ["The pivot of a lever is the...", "Fulcrum", "Load", "Effort"], ["The thing a lever lifts is the...", "Load", "Fulcrum", "Effort"],
      ["The push you give a lever is the...", "Effort", "Load", "Fulcrum"], ["Fulcrum closer to the load means the effort is...", "Smaller", "Bigger", "Exactly the same"],
      ["A wheelbarrow is a...", "Lever", "Wedge", "Screw"], ["A long lever handle lets you lift a heavy load with...", "Less effort", "More effort"],
      ["Which tool is a lever?", "Scissors", "Marble", "Sock"], ["To lift a rock easier with a crowbar you can...", "Slide the pivot closer to the rock", "Slide the pivot far from the rock"]
    ]),
    les("Ramp trade-off", [
      ["Ramp", "📐", "An <b>inclined plane</b> (ramp) lets you lift a load with less force than lifting it straight up."],
      ["The trade", "🛹", "A longer, gentler ramp needs less push, but you move the load a longer way."],
      ["Where", "🚚", "Trucks use ramps to load heavy boxes. Wheelchair ramps are long and gentle so they are easy to climb."]
    ], ["Think about steep versus gentle.", "Long and gentle: easier push, longer trip.", "Example: a 2 m ramp is easier than a 1 m ramp to the same height, but you roll twice as far. Now try yours."], [
      ["A ramp is also called an...", "Inclined plane", "Axle", "Pulley"], ["A longer, gentler ramp needs...", "Less push", "More push"],
      ["The trade-off of a gentle ramp is a...", "Longer trip", "Shorter trip"], ["Why are wheelchair ramps long?", "So they are not too steep", "To waste material", "To be tall"],
      ["Which ramp is easiest to push a box up (same height)?", "The longest ramp", "The shortest ramp"], ["Lifting straight up compared with using a ramp needs...", "More force", "Less force"],
      ["A truck loading ramp helps you...", "Move heavy boxes up with less force", "Make boxes lighter"], ["A steep ramp is...", "Hard to push up", "Easy to push up"]
    ]),
    gen("Measure in cm and m", [
      ["Units", "📏", "Engineers measure length in <b>centimeters</b> (cm) and <b>meters</b> (m). There are <b>100 cm in 1 m</b>."],
      ["Change units", "🔁", "To change meters to centimeters, multiply by 100. 3 m = 300 cm."],
      ["Compare", "🪵", "To find how much longer one board is, subtract the lengths. Use the same unit for both."]
    ], () => {
      const m = ri(2, 9), a = ri(20, 90), b = ri(10, 19);
      return pick([
        { text: `A beam is ${m} meters long. How many centimeters is that?`, visual: "📏", answer: m * 100, hints: ["Meters to centimeters: is the number bigger or smaller?", "There are 100 cm in each meter. Multiply.", "Example: 4 m is 4 x 100 = 400 cm. Now do yours."] },
        { text: `One board is ${a + b} cm and another is ${a} cm. How many cm longer is the first board?`, visual: "🪵", answer: b, hints: ["Longer by means subtract.", "Take the shorter length away from the longer.", "Example: 75 cm and 60 cm: 75 - 60 = 15 cm. Now do yours."] },
        { text: `A pipe is ${m * 100} cm long. How many meters is it?`, visual: "🔧", answer: m, hints: ["Centimeters to meters: divide.", "Divide by 100.", "Example: 600 cm is 600 / 100 = 6 m. Now do yours."] }
      ]);
    }),
    gen("Perimeter of a design", [
      ["Perimeter", "🔲", "<b>Perimeter</b> is the distance around the outside of a shape. Add up all the sides."],
      ["Rectangles", "🟦", "A rectangle has two long sides and two short sides. Perimeter = length + width + length + width."],
      ["Use it", "🚧", "Engineers use perimeter to know how much fence, trim or wire they need."]
    ], () => {
      const l = ri(3, 12), w = ri(2, l - 1);
      return pick([
        { text: `A robot arena is ${l} m long and ${w} m wide. How many meters of fence go around it?`, visual: "🚧", answer: 2 * (l + w), hints: ["Fence goes all the way around.", "Add all four sides, or double length plus width.", "Example: 5 m by 3 m: 5 + 3 + 5 + 3 = 16 m. Now do yours."] },
        { text: `A square frame has sides of ${l} cm. What is its perimeter in cm?`, visual: "🖼️", answer: 4 * l, hints: ["A square has 4 equal sides.", "Add the side four times, or multiply.", "Example: side 6 cm: 4 x 6 = 24 cm. Now do yours."] }
      ]);
    }),
    gen("Area of a floor", [
      ["Area", "⬜", "<b>Area</b> is the amount of flat space inside a shape. We count square units, like square meters."],
      ["Rectangle", "📐", "Area of a rectangle = length x width. A 4 m by 3 m floor has 12 square meters."],
      ["Use it", "🏠", "Engineers use area to know how much carpet, paint or roofing to buy."]
    ], () => {
      const l = ri(3, 12), w = ri(2, 9);
      return pick([
        { text: `A robot lab floor is ${l} m by ${w} m. What is its area in square meters?`, visual: "🏠", answer: l * w, hints: ["Area is the space inside, not around.", "Multiply length by width.", "Example: 5 m by 4 m is 5 x 4 = 20 square meters. Now do yours."] },
        { text: `A rectangle has an area of ${l * w} square meters and is ${l} m long. How many meters wide is it?`, visual: "📐", answer: w, hints: ["Area = length x width. One side is missing.", "Divide the area by the length you know.", "Example: area 24, length 6: 24 / 6 = 4 m wide. Now do yours."] }
      ]);
    }),
    les("Forms of energy", [
      ["Energy", "⚡", "<b>Energy</b> is what makes things move or change. It comes in different forms."],
      ["Forms", "🔥 💡 🔊", "<b>Heat</b> warms things, <b>light</b> helps us see, <b>sound</b> carries to our ears, <b>electrical</b> energy flows in wires, and <b>motion</b> energy is in moving things."],
      ["Changing", "🔄", "Machines change energy from one form to another. A lamp changes electrical energy into light (and a little heat)."]
    ], ["Think about what the device gives out.", "Match the device to the energy it makes.", "Example: a radio turns electrical energy into sound. Now try yours."], [
      ["A light bulb gives off...", "Light", "Sound only", "Wind"], ["A speaker makes...", "Sound", "Heat only", "Water"],
      ["A heater mostly gives...", "Heat", "Light only"], ["A fan's spinning blades have...", "Motion energy", "No energy"],
      ["Electrical energy flows through...", "Wires", "Paper", "Rocks"], ["A toaster changes electricity into...", "Heat", "Sound", "Water"],
      ["A rolling ball has...", "Motion energy", "Sound energy only"], ["A bell ringing gives...", "Sound", "Electricity"]
    ]),
    les("Series circuits", [
      ["One path", "🔋", "In a <b>series circuit</b> the electricity has only one path to follow, like one single road."],
      ["Break it", "💡", "If anything on the path is broken or removed, the whole circuit stops. One burnt-out bulb in an old string of lights can turn them all off."],
      ["Closed loop", "⭕", "Current only flows around a <b>complete loop</b> from the battery, through the parts, and back."]
    ], ["Count how many paths the electricity has.", "One path means one break stops everything.", "Example: two bulbs in a row on one wire: remove one and the other goes dark. Now try yours."], [
      ["A series circuit has...", "One path", "Many paths", "No battery"], ["In a series circuit, if one bulb is removed the others...", "Go out", "Get brighter", "Stay on"],
      ["Current needs a ___ loop to flow.", "Complete", "Broken", "Wet"], ["Which is needed in every circuit?", "A power source", "A magnet", "A mirror"],
      ["An old light string where one dead bulb turns all off is a...", "Series circuit", "Parallel circuit"], ["Wire with a gap in it makes the circuit...", "Not work", "Work extra"],
      ["The parts of a series circuit are connected...", "One after another", "On separate branches"], ["Electricity flows from the battery, through the parts and...", "Back to the battery", "Out into the air"]
    ]),
    les("Batteries and switches", [
      ["Battery", "🔋", "A <b>battery</b> stores chemical energy and pushes electricity around a circuit. It has a + end and a - end."],
      ["Switch", "🔘", "A <b>switch</b> opens or closes a circuit. When the switch is <b>closed</b> (on), current flows. When it is <b>open</b> (off), the path is broken."],
      ["Safe", "⚠️", "Only use small batteries for experiments. Never play with wall sockets!"]
    ], ["Closed means connected. Open means a gap.", "Current needs a complete path.", "Example: a flashlight turns on when its switch closes the loop. Now try yours."], [
      ["A closed switch means the circuit is...", "Complete, so current flows", "Broken, so nothing flows"], ["An open switch makes a bulb...", "Turn off", "Turn on"],
      ["A battery stores ___ energy.", "Chemical", "Sound", "Cloud"], ["The job of a switch is to...", "Open or close the circuit", "Make the battery bigger"],
      ["What do you flip to turn a flashlight on?", "The switch", "The handle only"], ["A battery has two ends called...", "Plus and minus", "Left and right"],
      ["Who should use wall sockets for experiments?", "Nobody. Use small batteries", "Kids with wet hands"], ["Pressing a doorbell button...", "Closes a circuit", "Opens a window"]
    ]),
    gen("Gears and direction", [
      ["Meshing", "⚙️", "Gears that touch each other (mesh) turn in <b>opposite</b> directions."],
      ["A line of gears", "⚙️⚙️⚙️", "In a row, gear 1 turns clockwise, gear 2 counter-clockwise, gear 3 clockwise again. Odd gears match gear 1. Even gears are opposite."],
      ["Use it", "🔧", "Engineers add a middle gear to make two gears turn the same way."]
    ], () => {
      const n = ri(2, 7), dir = pick(["clockwise", "counter-clockwise"]), opp = dir === "clockwise" ? "counter-clockwise" : "clockwise";
      const ans = n % 2 === 1 ? dir : opp;
      return { text: `${n} gears are in a row, all meshing. Gear 1 turns ${dir}. Which way does gear ${n} turn?`, visual: "⚙️", choices: ["clockwise", "counter-clockwise"], answer: ans, hints: ["Touching gears turn in opposite directions.", "Count: gear 1, 2, 3... Odd numbers turn like gear 1.", "Example: with 4 gears and gear 1 clockwise: 1 cw, 2 ccw, 3 cw, 4 ccw. Now do yours."] };
    }),
    gen("Gear teeth", [
      ["Teeth", "⚙️", "A big gear with more teeth turns slower than a small gear it drives. Each tooth that passes the other gear counts."],
      ["How many turns", "🔢", "Driven turns = (driver turns x driver teeth) / driven teeth. A 10-tooth gear turning a 20-tooth gear: 2 turns of the small one make 1 turn of the big one."],
      ["Use it", "🚲", "A bike uses a small gear and a big gear to change how hard it is to pedal."]
    ], () => {
      const a = pick([6, 8, 10, 12]), k = ri(2, 4), b = a * k, t = k * ri(1, 4);
      return { text: `A ${a}-tooth gear drives a ${b}-tooth gear. The small gear turns ${t} times. How many times does the big gear turn?`, visual: "⚙️", answer: t / k, hints: ["The big gear has more teeth, so it turns fewer times.", "Divide the small gear's turns by how many times bigger the big gear is.", `Example: a 5-tooth gear drives a 15-tooth gear (3 times bigger). 9 turns / 3 = 3 turns. Now do yours.`] };
    }),
    gen("Loops in programs", [
      ["Repeat", "🔁", "A <b>loop</b> repeats steps many times so you do not have to write them again and again."],
      ["Count", "🔢", "\"Repeat 4 times: move 3 steps\" moves 4 x 3 = 12 steps."],
      ["Short code", "💻", "Loops make programs shorter and easier to read."]
    ], () => {
      const n = ri(2, 9), k = ri(2, 9);
      return pick([
        { text: `A robot program says: repeat ${n} times, move forward ${k} steps. How many steps does the robot move in all?`, visual: "🤖", answer: n * k, hints: ["The loop does the same thing again and again.", "Multiply the repeats by the steps each time.", "Example: repeat 3 times, move 5 steps = 3 x 5 = 15 steps. Now do yours."] },
        { text: `A robot must move ${n * k} steps by repeating "move ${k} steps". How many times should the loop repeat?`, visual: "🤖", answer: n, hints: ["Total steps is the repeats times the steps each time.", "Divide the total by the steps in one repeat.", "Example: 20 steps in groups of 4: 20 / 4 = 5 repeats. Now do yours."] }
      ]);
    }),
    les("If this, then that", [
      ["Decisions", "🤔", "A robot uses an <b>if-then</b> rule: IF something is true, THEN do an action."],
      ["Sensors", "👀", "IF the sensor sees a wall, THEN turn left. IF the light is dim, THEN turn on the lamp."],
      ["Else", "↔️", "You can add <b>else</b>: IF it is dark, THEN lamp on, ELSE lamp off."]
    ], ["Find the IF part (the sensor) and the THEN part (the action).", "Check whether the condition is true.", "Example: IF the floor is wet THEN slow down. The floor is wet, so the robot slows down. Now try yours."], [
      ["IF there is a wall ahead THEN turn. There is a wall ahead. The robot will...", "Turn", "Keep going straight"], ["IF it is dark THEN lamp on, ELSE lamp off. It is bright. The lamp is...", "Off", "On"],
      ["In an if-then rule, the IF part is the...", "Condition", "Action"], ["In an if-then rule, the THEN part is the...", "Action", "Question"],
      ["IF the bump sensor is pressed THEN stop. It is NOT pressed. The robot...", "Keeps moving", "Stops"], ["A smart door opens IF someone is near. Nobody is near. The door...", "Stays shut", "Opens"],
      ["The word ELSE means...", "Do this if the IF is false", "Do this twice"], ["IF the battery is low THEN go charge. The battery is full. The robot...", "Keeps working", "Goes to charge"]
    ]),
    les("Change one thing", [
      ["Fair test", "🔬", "In a <b>fair test</b> you change only ONE thing and keep everything else the same."],
      ["Variables", "📊", "The thing you change is the <b>variable</b>. If you test two ramps, use the same car and the same start point."],
      ["Why", "🤝", "If you change two things, you cannot tell which one caused the result."]
    ], ["How many things should you change at once?", "Keep everything but one thing the same.", "Example: to test which paper plane flies farther, use the same paper and the same throw, change only the wing shape. Now try yours."], [
      ["In a fair test you change...", "Only one thing", "Everything", "Nothing at all"], ["To test which ramp is steeper-friendly, keep the car...", "The same", "Different each time"],
      ["The thing you change on purpose is the...", "Variable", "Winner"], ["Testing paper strength: you should use...", "The same size paper each time", "A different size each time"],
      ["Why change only one thing?", "To know what caused the result", "To save time"], ["Testing three wheel sizes on one car. What stays the same?", "The car and the ramp", "The wheel size"],
      ["If you change the weight AND the ramp, the test is...", "Not fair", "Perfect"], ["Fair tests help engineers to...", "Trust their results", "Skip building"]
    ]),
    les("Reuse and recycle", [
      ["Reuse", "♻️", "To <b>reuse</b> means to use something again, like turning a jar into a pencil holder."],
      ["Recycle", "🔄", "To <b>recycle</b> means to break an old thing down and make something new from it. Glass, metal, paper and some plastic can be recycled."],
      ["Engineers", "🌍", "Engineers design products that last longer, use fewer materials and are easy to recycle."]
    ], ["Reuse = use again. Recycle = turn into something new.", "Think about what happens to the old material.", "Example: crushing old cans and melting them to make new cans is recycling. Now try yours."], [
      ["Using a jar again as a pencil holder is...", "Reusing", "Recycling"], ["Melting old metal into new metal is...", "Recycling", "Reusing"],
      ["Which can be recycled?", "Paper", "A banana peel in a bin of metal"], ["Why do engineers design products that last longer?", "Less waste", "More trash"],
      ["A good product is easy to...", "Recycle", "Lose"], ["Making a toy robot from cardboard boxes is...", "Reusing", "Wasting"],
      ["Which is the best for the planet?", "Use it again before throwing away", "Throw it away fast"], ["Recycling helps save...", "Materials", "Trash"]
    ]),
    les("Wind and water power", [
      ["Wind", "💨", "A wind turbine has blades that spin in the wind. The spinning turns a generator that makes electricity."],
      ["Water", "🌊", "Moving water can spin a turbine too. Dams and water wheels use falling water for energy."],
      ["Clean", "🌱", "Wind and moving water are <b>renewable</b>: they do not run out, and they make no smoke when making electricity."]
    ], ["Both use something that moves to spin blades.", "Spinning a generator makes electricity.", "Example: a water wheel in a stream turns as water pushes its paddles. Now try yours."], [
      ["A wind turbine is spun by...", "Wind", "Sand", "Light"], ["A generator turns spinning into...", "Electricity", "Water"],
      ["A dam uses ___ water to spin turbines.", "Falling", "Frozen"], ["Wind and water are called ___ energy.", "Renewable", "Used-up"],
      ["Why are they good for the air?", "No smoke when making electricity", "They make lots of smoke"], ["Where is a wind turbine best?", "A windy hill", "A sealed basement"],
      ["A water wheel in a stream spins because of...", "Moving water", "Sunlight only"], ["What spins inside a turbine?", "Blades", "Candles"]
    ]),
    null, null
  ];
  g[18] = mix("Mixed practice", at(g, [0, 2, 3, 5, 7, 9, 11, 13, 15]));
  g[19] = mix("Level 7 Challenge", at(g, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 8 =================
  const h = [
    gen("Speed", [
      ["Speed", "🏎️", "<b>Speed</b> tells how far something goes in a certain time. Speed = distance / time."],
      ["Units", "⏱️", "If a robot goes 12 meters in 3 seconds, its speed is 12 / 3 = 4 meters per second (m/s)."],
      ["Use it", "🚗", "Engineers test the speed of cars, trains and robots to make sure they are safe and fast enough."]
    ], () => {
      const s = ri(2, 9), t = ri(2, 8), d = s * t;
      return { text: `A robot car travels ${d} meters in ${t} seconds. What is its speed in meters per second?`, visual: "🤖", answer: s, hints: ["Speed is how far per one second.", "Divide the distance by the time.", "Example: 20 m in 4 s is 20 / 4 = 5 m/s. Now do yours."] };
    }),
    gen("Distance and time", [
      ["Rearrange", "🔁", "Distance = speed x time. Time = distance / speed."],
      ["Distance", "📏", "A robot at 3 m/s for 5 seconds goes 3 x 5 = 15 meters."],
      ["Time", "⏱️", "To go 24 meters at 4 m/s takes 24 / 4 = 6 seconds."]
    ], () => {
      const s = ri(2, 9), t = ri(2, 9);
      return pick([
        { text: `A conveyor belt moves at ${s} m/s. How many meters does a box travel in ${t} seconds?`, visual: "📦", answer: s * t, hints: ["The belt keeps going at the same speed.", "Multiply speed by time.", "Example: 4 m/s for 3 s is 4 x 3 = 12 m. Now do yours."] },
        { text: `A drone must fly ${s * t} meters at ${s} m/s. How many seconds will it take?`, visual: "🚁", answer: t, hints: ["Time tells how many seconds are needed.", "Divide distance by speed.", "Example: 30 m at 5 m/s takes 30 / 5 = 6 s. Now do yours."] }
      ]);
    }),
    gen("Pulley systems", [
      ["More ropes", "🪢", "A pulley system with more ropes holding the load needs less pull. In an ideal system: effort = load / number of supporting ropes."],
      ["Example", "🏗️", "A 12 N load held by 3 ropes needs only 12 / 3 = 4 N of pull."],
      ["Trade-off", "↕️", "You pull more rope. To lift the load 1 m with 3 ropes you pull 3 m of rope."]
    ], () => {
      const r = ri(2, 5), e = ri(2, 9), L = r * e;
      return pick([
        { text: `A pulley system has ${r} ropes holding a ${L} N load. About how many newtons of pull lift it (ideal)?`, visual: "🪢", answer: e, hints: ["More ropes share the load.", "Divide the load by the number of ropes.", "Example: 20 N with 4 ropes: 20 / 4 = 5 N. Now do yours."] },
        { text: `To lift a load 2 meters with a ${r}-rope pulley, how many meters of rope must you pull?`, visual: "🏗️", answer: 2 * r, hints: ["You trade a smaller pull for a longer pull.", "Multiply the lift height by the number of ropes.", "Example: lift 3 m with 2 ropes: 3 x 2 = 6 m of rope. Now do yours."] }
      ]);
    }),
    les("Tension and compression", [
      ["Compression", "🗜️", "<b>Compression</b> is a squeezing force. A column holding up a roof is squeezed (compressed)."],
      ["Tension", "↔️", "<b>Tension</b> is a pulling force. A rope in tug-of-war and the cables of a suspension bridge are in tension."],
      ["Both", "🌉", "A beam bridge bends: the top is squeezed and the bottom is stretched."]
    ], ["Squeeze or stretch?", "Compression pushes together. Tension pulls apart.", "Example: a stretched rubber band is in tension and a squashed sponge is in compression. Now try yours."], [
      ["A force that squeezes is...", "Compression", "Tension"], ["A force that pulls and stretches is...", "Tension", "Compression"],
      ["A rope in tug-of-war is under...", "Tension", "Compression"], ["A column under a roof is under...", "Compression", "Tension"],
      ["The cables on a suspension bridge are in...", "Tension", "Compression"], ["Standing on a sponge makes it...", "Compressed", "Stretched"],
      ["A hanging swing's chains are in...", "Tension", "Compression"], ["The legs of a table holding a book are in...", "Compression", "Tension"]
    ]),
    les("Bridge types", [
      ["Beam", "🌉", "A <b>beam bridge</b> is the simplest: a flat beam resting on supports. Good for short gaps."],
      ["Arch", "🌈", "An <b>arch bridge</b> curves upward and pushes the load into its ends. Arches are very strong."],
      ["Suspension", "🏗️", "A <b>suspension bridge</b> hangs the road from strong cables over tall towers. It can cross very wide gaps."]
    ], ["Think about the shape: flat, curved, or hanging.", "Cables and towers mean one type; a curve means another.", "Example: a plank across a ditch is the simplest kind of bridge. Now try yours."], [
      ["A bridge with the road hanging from cables is a...", "Suspension bridge", "Beam bridge", "Arch bridge"], ["A bridge that curves up like a rainbow is an...", "Arch bridge", "Beam bridge"],
      ["A plank across a stream is a...", "Beam bridge", "Suspension bridge"], ["Which bridge is best for a very wide river?", "Suspension bridge", "A single short beam"],
      ["Arch bridges are strong because they push the load into...", "Their ends", "The sky"], ["Tall towers with cables belong to a...", "Suspension bridge", "Beam bridge"],
      ["Which is simplest to build?", "Beam bridge", "Suspension bridge"], ["A stone bridge with curved openings is likely an...", "Arch bridge", "Beam bridge"]
    ]),
    les("Strong shapes", [
      ["Triangles", "🔺", "A triangle cannot change shape unless a side breaks. That is why trusses use triangles."],
      ["Squares wobble", "🟥", "A square or rectangle frame can squash sideways into a diamond. Add a diagonal bar and it becomes two triangles and stays firm."],
      ["I-beam", "🏢", "An <b>I-beam</b> is shaped like a capital I. It is strong but uses less metal than a solid bar."]
    ], ["Which shape holds its form when pushed?", "A diagonal brace makes triangles.", "Example: a gate with a diagonal board does not sag. Now try yours."], [
      ["Which shape is the strongest for frames?", "Triangle", "Rectangle with no brace"], ["How do you stop a square frame from wobbling?", "Add a diagonal brace", "Add paint"],
      ["A truss is made of...", "Triangles", "Circles only"], ["An I-beam is strong and uses...", "Less metal than a solid bar", "More metal than a solid bar"],
      ["A gate with a diagonal board stays...", "Firm", "Floppy"], ["An unbraced rectangle frame can squash into a...", "Diamond shape", "Circle"],
      ["Why are cranes full of triangles?", "They are strong and light", "They are just pretty"], ["An I-beam is shaped like the letter...", "I", "O", "Z"]
    ]),
    gen("Average of tests", [
      ["Mean", "📊", "Engineers test many times, then find the <b>average</b> (mean): add the results, then divide by how many there are."],
      ["Example", "🧮", "Tests of 4, 6, and 8: add to get 18, divide by 3 for an average of 6."],
      ["Why", "✅", "One test could be a fluke. An average is more trustworthy."]
    ], () => {
      const n = pick([3, 4, 5]), avg = ri(4, 15), arr = [];
      let rest = avg * n;
      for (let i = 0; i < n - 1; i++) { const lo = Math.max(1, rest - (n - 1 - i) * (avg + 5)), hi = Math.min(avg + 5, rest - (n - 1 - i)); const v = ri(lo, hi); arr.push(v); rest -= v; }
      arr.push(rest);
      return { text: `A paper bridge held these loads in ${n} tests: ${arr.join(", ")} (in coins). What is the average?`, visual: "📊", answer: avg, hints: ["Average means making the numbers fair-share equal.", "Add them all, then divide by how many tests.", "Example: 2, 5, 8 add to 15; 15 / 3 = 5. Now do yours."] };
    }),
    gen("Scale drawings", [
      ["Scale", "📐", "A <b>scale drawing</b> shows a big thing small. A scale of 1 cm = 5 m means each centimeter on paper stands for 5 meters in real life."],
      ["Use it", "🗺️", "A bridge drawn 6 cm long at 1 cm = 5 m is really 6 x 5 = 30 m long."],
      ["Back", "🔁", "To find the drawing size, divide the real size by the scale number."]
    ], () => {
      const s = pick([2, 5, 10]), c = ri(2, 9);
      return pick([
        { text: `A plan uses 1 cm = ${s} m. A wall is ${c} cm long on the drawing. How long is the real wall in meters?`, visual: "📐", answer: c * s, hints: ["Each centimeter stands for a set number of meters.", "Multiply the drawing length by the scale number.", "Example: scale 1 cm = 3 m, drawn 4 cm = 4 x 3 = 12 m. Now do yours."] },
        { text: `A real tower is ${c * s} m tall. With 1 cm = ${s} m, how many cm tall is it on the drawing?`, visual: "🗼", answer: c, hints: ["Going from real size to drawing size makes it smaller.", "Divide the real height by the scale number.", "Example: real 24 m with 1 cm = 6 m is 24 / 6 = 4 cm. Now do yours."] }
      ]);
    }),
    gen("Volume of a box", [
      ["Volume", "📦", "<b>Volume</b> is how much space is inside a 3D shape. It is counted in cubic units, like cubic centimeters (cm³)."],
      ["Box", "🧊", "Volume of a box = length x width x height."],
      ["Use it", "🚚", "Engineers use volume to design tanks, boxes and storage."]
    ], () => {
      const l = ri(2, 8), w = ri(2, 6), hh = ri(2, 5);
      return pick([
        { text: `A box is ${l} cm long, ${w} cm wide and ${hh} cm tall. What is its volume in cubic cm?`, visual: "📦", answer: l * w * hh, hints: ["Volume is space inside a 3D shape.", "Multiply length, width and height.", "Example: 3 x 2 x 4 = 24 cubic cm. Now do yours."] },
        { text: `A tank is ${l} m long and ${w} m wide, and holds ${l * w * hh} cubic m. How tall is it in meters?`, visual: "🛢️", answer: hh, hints: ["Volume = length x width x height. Height is missing.", "Divide the volume by length times width.", "Example: 60 cubic m, 5 by 4 base: 60 / 20 = 3 m. Now do yours."] }
      ]);
    }),
    gen("Budget and cost", [
      ["Budget", "💰", "A <b>budget</b> is the most money you can spend. Engineers choose parts that fit the budget."],
      ["Total cost", "🧾", "Cost for many parts = number x price. Add the costs of all kinds of parts."],
      ["Left over", "➖", "Budget minus total cost tells you what is left."]
    ], () => {
      const n = ri(2, 6), p = ri(2, 9), q = ri(2, 6), pr = ri(1, 5);
      const total = n * p + q * pr, bud = total + ri(2, 15);
      return pick([
        { text: `You buy ${n} motors at $${p} each and ${q} wheels at $${pr} each. What is the total cost in dollars?`, visual: "🧾", answer: total, hints: ["Find each group's cost first.", "Multiply count by price for each, then add.", "Example: 2 gears at $3 and 3 wires at $1 cost 6 + 3 = $9. Now do yours."] },
        { text: `Your budget is $${bud}. Parts cost $${total}. How many dollars are left?`, visual: "💰", answer: bud - total, hints: ["Left over means subtract.", "Take the cost away from the budget.", "Example: budget $20, cost $14 leaves $6. Now do yours."] }
      ]);
    }),
    les("Parallel circuits", [
      ["Branches", "🔀", "In a <b>parallel circuit</b> the electricity has more than one path (branches). Each part has its own path."],
      ["Still lit", "💡", "If one bulb in a parallel circuit is removed, the other bulbs stay on."],
      ["Homes", "🏠", "House lights are wired in parallel so one lamp burning out does not turn off the whole house."]
    ], ["Count the paths.", "More than one path means one broken part does not stop the rest.", "Example: car headlights are wired so one can fail and the other still shines. Now try yours."], [
      ["A parallel circuit has...", "More than one path", "Only one path"], ["One bulb removed from a parallel circuit: the others...", "Stay on", "Go out"],
      ["House lights are wired in...", "Parallel", "A knot"], ["Compared to series, a parallel circuit is better when you want...", "Lights to work separately", "All to stop together"],
      ["Each bulb in a parallel circuit has its own...", "Branch", "Roof"], ["One bulb burns out in a house. Other lights...", "Still work", "All go off"],
      ["Which circuit has branches?", "Parallel", "Series"], ["Parallel means the parts are connected...", "Side by side on branches", "In one single line"]
    ]),
    les("Sensors and actuators", [
      ["Sensors", "👀", "A <b>sensor</b> notices something: light, touch, sound, heat or distance. It sends information to the robot's controller."],
      ["Actuators", "💪", "An <b>actuator</b> makes something move or happen, such as a motor, a speaker or a light."],
      ["Loop", "🔁", "Sense, think, act: a robot senses, its program decides, and actuators do the job."]
    ], ["Does it notice, or does it do?", "Sensors give information. Actuators make things happen.", "Example: a microphone senses sound, a speaker acts by making sound. Now try yours."], [
      ["Which is a sensor?", "Light sensor", "Motor", "Speaker"], ["Which is an actuator?", "Motor", "Touch sensor", "Camera"],
      ["A distance sensor tells a robot...", "How far a wall is", "What music to play"], ["A speaker is an...", "Actuator", "Sensor"],
      ["A robot vacuum finds a wall using a...", "Bump or distance sensor", "Music player"], ["The three steps of a robot are sense, think and...", "Act", "Sleep"],
      ["A robot arm moving is done by an...", "Actuator", "Sensor"], ["A temperature sensor measures...", "How hot or cold", "How loud"]
    ]),
    gen("Variables in code", [
      ["Variable", "📦", "A <b>variable</b> is a named box that holds a number. You can change what is inside."],
      ["Update", "✏️", "<b>score = score + 3</b> means: take the old score, add 3, and store it back."],
      ["Order", "📋", "Follow the lines in order, from top to bottom, and keep track of the value."]
    ], () => {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 4);
      return pick([
        { text: `x = ${a}. Then x = x + ${b}. What is x now?`, visual: "💻", answer: a + b, hints: ["The new x uses the old x.", "Add the number to what x was.", "Example: x = 4, then x = x + 3 makes x = 7. Now do yours."] },
        { text: `x = ${a}. Then x = x + ${b}. Then x = x x ${c} (times). What is x at the end?`, visual: "💻", answer: (a + b) * c, hints: ["Do the lines in order, one at a time.", "First add, then multiply the result.", "Example: x = 2, add 3 makes 5, times 2 makes 10. Now do yours."] }
      ]);
    }),
    gen("Loops inside loops", [
      ["Nested", "🔁", "A loop can sit inside another loop. This is a <b>nested loop</b>."],
      ["Multiply", "✖️", "Repeat 3 times: (repeat 4 times: step). The inner steps happen 3 x 4 = 12 times."],
      ["Use it", "🎮", "Nested loops draw grids, rows and patterns in games and robots."]
    ], () => {
      const a = ri(2, 6), b = ri(2, 6), c = ri(1, 3);
      return pick([
        { text: `A program: repeat ${a} times { repeat ${b} times { place a brick } }. How many bricks are placed?`, visual: "🧱", answer: a * b, hints: ["The inside loop runs fully every time the outside loop runs.", "Multiply the two repeat numbers.", "Example: repeat 2 times {repeat 5 times} places 2 x 5 = 10. Now do yours."] },
        { text: `A program: repeat ${a} times { repeat ${b} times { step } then turn }. How many steps in all? (Turning does not count.)`, visual: "🤖", answer: a * b, hints: ["Only count the step lines.", "Multiply outer repeats by inner repeats.", "Example: repeat 3 times { repeat 4 steps, turn } = 12 steps. Now do yours."] },
        { text: `Each brick costs $${c}. A nested loop (${a} x ${b}) places bricks. What is the total cost in dollars?`, visual: "💰", answer: a * b * c, hints: ["First find how many bricks.", "Bricks = outer x inner, then multiply by the price.", "Example: 2 x 3 = 6 bricks at $2 = $12. Now do yours."] }
      ]);
    }),
    les("Debugging", [
      ["Bug", "🐛", "A <b>bug</b> is a mistake in a program. <b>Debugging</b> means finding and fixing it."],
      ["Steps", "🔍", "Read the steps in order, pretend you are the robot, and find where it first goes wrong. Then change only that part."],
      ["Test", "✅", "After you fix one thing, test again to be sure the bug is gone and nothing new broke."]
    ], ["Act like the robot and follow the steps.", "Find the first step that goes wrong.", "Example: a robot should go forward 3 but the program says 2. Changing the 2 to 3 fixes it. Now try yours."], [
      ["A mistake in a program is a...", "Bug", "Loop", "Battery"], ["Fixing mistakes in code is called...", "Debugging", "Decorating"],
      ["A robot should turn right but turns left. Check the...", "Turn command", "Battery color"], ["After you fix a bug you should...", "Test again", "Delete everything"],
      ["The best way to find a bug is to...", "Follow the steps in order", "Guess wildly"], ["Fix how many things at a time?", "One at a time", "Everything at once"],
      ["A robot stops one step short. The bug is likely in the...", "Number of steps", "Paint"], ["Pretending to be the robot helps you...", "See where it goes wrong", "Make it louder"]
    ]),
    les("Renewable energy", [
      ["Renewable", "🌞", "<b>Renewable</b> energy comes from sources that do not run out: sun, wind, moving water."],
      ["Non-renewable", "⛽", "<b>Non-renewable</b> sources, like coal, oil and gas, take millions of years to form. Once used, they are gone for a very long time."],
      ["Solar", "🔆", "A solar panel turns sunlight into electricity. Engineers design panels, turbines and batteries to store power."]
    ], ["Will it run out or not?", "Sun, wind and water keep coming back.", "Example: wind blows again tomorrow, so wind is renewable. Now try yours."], [
      ["Which is renewable?", "Sunlight", "Coal", "Oil"], ["Which is non-renewable?", "Gas", "Wind", "Moving water"],
      ["A solar panel turns ___ into electricity.", "Sunlight", "Rain", "Rocks"], ["Why store power in batteries?", "For when the sun is down", "To make the sun brighter"],
      ["A wind turbine uses...", "Wind", "Coal"], ["Renewable energy sources...", "Do not run out", "Run out quickly"],
      ["Oil takes ___ to form.", "Millions of years", "One day"], ["Hydropower uses...", "Moving water", "Coal fire"]
    ]),
    les("Compound machines", [
      ["Compound", "🔧", "A <b>compound machine</b> combines two or more simple machines."],
      ["Examples", "✂️ 🚲", "Scissors are two levers and two wedges. A bicycle uses wheels and axles, gears and levers."],
      ["Why", "🏗️", "Combining machines lets engineers do jobs that one simple machine cannot do alone."]
    ], ["Count how many simple machines the tool uses.", "Compound means more than one simple machine.", "Example: a can opener has a lever, a wedge and a wheel together. Now try yours."], [
      ["A compound machine uses...", "Two or more simple machines", "Only a lever"], ["Scissors combine levers and...", "Wedges", "Pulleys"],
      ["A bicycle uses wheels, axles, gears and...", "Levers", "Prisms"], ["Which is a compound machine?", "A bicycle", "A single ramp"],
      ["Which is a simple machine, not compound?", "A plain lever", "A bicycle"], ["Why combine machines?", "To do jobs one machine can't", "To confuse people"],
      ["A wheelbarrow has a wheel and axle and a...", "Lever", "Screw"], ["A can opener has a wheel, a lever and a...", "Wedge", "Cloud"]
    ]),
    les("Testing to the limit", [
      ["Failure", "💥", "Engineers sometimes test a design until it breaks, to learn its limit. Breaking a model teaches them how to make the real thing safe."],
      ["Safety factor", "🛡️", "A <b>safety factor</b> means building stronger than needed. A bridge that must hold 10 tons might be designed to hold 30 tons."],
      ["Standards", "📋", "Rules called <b>standards</b> tell engineers how strong and safe a product must be."]
    ], ["Why would someone want a design to be stronger than needed?", "Extra strength protects people if something goes wrong.", "Example: an elevator cable is built many times stronger than the heaviest load. Now try yours."], [
      ["Why test a model until it breaks?", "To learn its limit", "To waste material"], ["A safety factor means building...", "Stronger than needed", "Weaker than needed"],
      ["A bridge designed to hold 3 times its load has a safety factor of...", "3", "1"], ["Safety standards are...", "Rules for safe products", "Games"],
      ["A helmet should be tested to make sure it...", "Protects the head", "Looks funny"], ["Testing a model first helps keep real people...", "Safe", "Busy"],
      ["An elevator cable is built...", "Much stronger than the load", "Just barely strong enough"], ["Engineers find a design's weak spots by...", "Testing", "Ignoring it"]
    ]),
    null, null
  ];
  h[18] = mix("Mixed practice", at(h, [0, 3, 4, 5, 8, 10, 11, 13, 16]));
  h[19] = mix("Level 8 Challenge", at(h, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 9 =================
  const k = [
    gen("Mechanical advantage", [
      ["Meaning", "💪", "<b>Mechanical advantage</b> (MA) tells how many times a machine multiplies your effort. MA = load / effort."],
      ["Example", "🏋️", "A lever lifts a 60 N load with a 20 N push. MA = 60 / 20 = 3."],
      ["Bigger", "⬆️", "A bigger MA means an easier lift, but you usually push through a longer distance."]
    ], () => {
      const m = ri(2, 8), e = ri(2, 12);
      return pick([
        { text: `A machine lifts a ${m * e} N load using an effort of ${e} N. What is its mechanical advantage?`, visual: "⚙️", answer: m, hints: ["MA compares the load to the effort.", "Divide the load by the effort.", "Example: load 40 N, effort 10 N: 40 / 10 = 4. Now do yours."] },
        { text: `A lever has a mechanical advantage of ${m}. You push with ${e} N. How big a load can it lift (in N)?`, visual: "🪵", answer: m * e, hints: ["MA times effort gives the load.", "Multiply the MA by your effort.", "Example: MA 3 and effort 5 N gives 3 x 5 = 15 N. Now do yours."] }
      ]);
    }),
    les("Energy changes", [
      ["Transfer", "🔄", "Energy is not made or lost. It <b>changes form</b> or moves. This is called a <b>transfer</b>."],
      ["Chain", "⛓️", "A lamp: electrical energy changes to light and heat. A car: chemical energy in fuel changes to motion and heat."],
      ["Waste", "♨️", "Most machines also give off some unwanted heat. That is the wasted energy."]
    ], ["Start with what energy goes in, then what comes out.", "Look for the useful output and the wasted heat.", "Example: a hairdryer turns electrical energy into heat and motion of air. Now try yours."], [
      ["A solar panel changes light into...", "Electrical energy", "Sound"], ["A battery stores energy as...", "Chemical energy", "Light"],
      ["A car engine changes chemical energy into...", "Motion and heat", "Only sound"], ["A microphone changes sound into...", "Electrical signals", "Wind"],
      ["A wind turbine changes motion into...", "Electricity", "Fuel"], ["A toaster makes useful...", "Heat", "Sound only"],
      ["Wasted energy in machines is often...", "Heat", "Color"], ["A speaker changes electrical signals into...", "Sound", "Chemical energy"]
    ]),
    les("Potential and kinetic", [
      ["Kinetic", "🏃", "<b>Kinetic</b> energy is the energy of motion. Faster and heavier things have more."],
      ["Potential", "⛰️", "<b>Potential</b> energy is stored energy. A ball held high or a stretched spring has potential energy."],
      ["Roller coaster", "🎢", "At the top of a hill a roller coaster has the most potential energy. Rolling down changes it into kinetic energy."]
    ], ["Is it moving, or is it waiting to move?", "Height and stretch store energy. Motion shows it.", "Example: a pendulum at its highest point stores energy and at the bottom moves fastest. Now try yours."], [
      ["Energy of motion is...", "Kinetic", "Potential"], ["A stretched spring has...", "Potential energy", "No energy"],
      ["A ball held high has mostly...", "Potential energy", "Kinetic energy"], ["A roller coaster at the top of a hill has the most...", "Potential energy", "Kinetic energy"],
      ["The ball falls. Potential energy changes into...", "Kinetic energy", "Nothing"], ["A bike speeding down a hill has lots of...", "Kinetic energy", "Rest"],
      ["A drawn bow before release stores...", "Potential energy", "Kinetic energy"], ["Which has more kinetic energy?", "A fast truck", "A parked truck"]
    ]),
    gen("Efficiency", [
      ["Meaning", "📈", "<b>Efficiency</b> tells how much of the energy put in becomes useful energy out. Efficiency = useful out / total in, as a percent."],
      ["Example", "💡", "If 100 J goes in and 40 J becomes light, efficiency is 40 / 100 = 40%."],
      ["Better", "🔧", "Engineers want higher efficiency, so less energy is wasted."]
    ], () => {
      const inn = pick([50, 100, 200, 25, 20]), pct = pick([20, 40, 50, 60, 80, 25, 10]), out = inn * pct / 100;
      return pick([
        { text: `A machine uses ${inn} J of energy and gives ${out} J of useful work. What is its efficiency in percent? (Just type the number.)`, visual: "⚙️", answer: pct, hints: ["Efficiency compares what you get with what you put in.", "Divide the useful part by the total, then times 100.", "Example: 10 J in and 5 J useful gives 5 / 10 = 50 percent. Now do yours."] },
        { text: `A motor is ${pct}% efficient. If ${inn} J goes in, how many joules are useful?`, visual: "🔌", answer: out, hints: ["Take a percent of the energy put in.", "Multiply the energy in by the percent, divided by 100.", "Example: 50% of 20 J is 10 J. Now do yours."] }
      ]);
    }),
    les("Load paths", [
      ["Path", "⬇️", "Every weight must travel down to the ground through the structure. That route is the <b>load path</b>."],
      ["Roof to ground", "🏠", "Roof weight goes into the walls, then into the foundation, then into the ground."],
      ["Weak link", "⛓️", "A chain is only as strong as its weakest link. A load path is only as strong as its weakest part."]
    ], ["Follow the weight from top to bottom.", "The path must not have a weak or missing part.", "Example: a shelf's load goes into the brackets, then the wall. Now try yours."], [
      ["A load path carries weight...", "To the ground", "To the roof"], ["The roof's weight first goes into the...", "Walls", "Sky"],
      ["Walls pass weight to the...", "Foundation", "Chimney"], ["A load path is as strong as its...", "Weakest part", "Strongest part"],
      ["If a column is missing, the load path is...", "Broken, so it may fall", "Stronger"], ["Why do tall buildings have strong foundations?", "To carry all the weight to the ground", "To look good"],
      ["A shelf's weight goes into the...", "Brackets and wall", "Air"], ["A weak link in a chain...", "Limits its strength", "Makes it stronger"]
    ]),
    les("Material properties", [
      ["Properties", "🧪", "A <b>property</b> tells how a material behaves. <b>Strong</b> resists breaking, <b>hard</b> resists scratching, <b>flexible</b> bends, <b>brittle</b> snaps when bent."],
      ["Others", "🔩", "<b>Ductile</b> materials stretch into wires (copper). <b>Waterproof</b> materials keep water out. <b>Insulators</b> block heat or electricity."],
      ["Choose", "✅", "Engineers match properties to the job: glass is clear but brittle, rubber is flexible and good for tires."]
    ], ["What does the job need: bending, strength, or keeping things out?", "Match the property word to the behavior.", "Example: rope must be flexible and strong, so it is made from twisted fibers. Now try yours."], [
      ["A material that snaps when bent is...", "Brittle", "Flexible"], ["A material that bends easily is...", "Flexible", "Brittle"],
      ["Copper is good for wires because it is...", "Ductile and a conductor", "Brittle and clear"], ["A raincoat should be...", "Waterproof", "Brittle"],
      ["Why are tires made of rubber?", "It is flexible and grips", "It is brittle"], ["A material that resists scratching is...", "Hard", "Floppy"],
      ["Which is a good insulator for electric wire coating?", "Plastic", "Copper"], ["Glass is clear but...", "Brittle", "Ductile"]
    ]),
    les("Center of gravity", [
      ["Balance point", "⚖️", "The <b>center of gravity</b> is the point where an object's weight acts, like its balance point."],
      ["Low and wide", "🧱", "Objects with a low center of gravity and a wide base are very stable and hard to tip over."],
      ["Tipping", "🥤", "An object tips when its center of gravity moves outside its base."]
    ], ["Where is the weight? High or low?", "Low and wide means stable.", "Example: a wide pot is harder to tip than a tall thin vase. Now try yours."], [
      ["A stable object has a ___ center of gravity.", "Low", "High"], ["A stable base is...", "Wide", "Narrow"],
      ["Which tips more easily?", "A tall thin tower", "A short wide block"], ["An object tips when its center of gravity goes...", "Outside its base", "Down"],
      ["Why do race cars sit low?", "Lower center of gravity", "To be quiet"], ["How can you make a ladder more stable?", "Spread its feet wide", "Make it taller and narrower"],
      ["Putting heavy items on the bottom shelf makes the shelf...", "More stable", "Less stable"], ["The balance point of an object is its...", "Center of gravity", "Handle"]
    ]),
    gen("Batteries in series", [
      ["Volts", "🔋", "<b>Voltage</b> (volts, V) tells how strongly a battery pushes electricity. A small cell is often 1.5 V."],
      ["Add up", "➕", "When batteries are joined in a line (+ to -) their voltages add. Three 1.5 V cells make 4.5 V."],
      ["Careful", "⚠️", "Too much voltage can burn out a small bulb. Match the battery to the part."]
    ], () => {
      const v = pick([1, 2, 3, 6, 9]), n = ri(2, 5);
      return pick([
        { text: `${n} batteries of ${v} volts each are connected in series. What is the total voltage?`, visual: "🔋", answer: n * v, hints: ["In series, the voltages add.", "Add the voltage once for each battery (multiply).", "Example: 3 batteries of 2 V make 3 x 2 = 6 V. Now do yours."] },
        { text: `A toy needs ${n * v} volts. You have ${v}-volt batteries. How many do you connect in series?`, visual: "🧸", answer: n, hints: ["You need to reach the total voltage.", "Divide the needed volts by volts per battery.", "Example: need 9 V with 3 V batteries: 9 / 3 = 3. Now do yours."] }
      ]);
    }),
    gen("Tiles and fences", [
      ["Combine", "🧩", "Real jobs use area and perimeter together. Tiles cover an area. Fences go around the perimeter."],
      ["Tiles", "🟦", "Number of tiles = floor area / area of one tile."],
      ["Cost", "💲", "Cost = number of items x price of one item."]
    ], () => {
      const l = ri(2, 8) * 2, w = ri(2, 6) * 2, p = ri(2, 5);
      return pick([
        { text: `A floor is ${l} m by ${w} m. Each tile covers 1 square meter. How many tiles cover the floor?`, visual: "🟦", answer: l * w, hints: ["Tiles cover the inside area.", "Multiply length by width.", "Example: 4 m by 3 m needs 12 one-meter tiles. Now do yours."] },
        { text: `Fence around a ${l} m by ${w} m robot arena costs $${p} per meter. What is the total cost in dollars?`, visual: "🚧", answer: 2 * (l + w) * p, hints: ["Find the perimeter first.", "Perimeter times the price per meter.", "Example: 4 m by 3 m: perimeter 14 m at $2 is $28. Now do yours."] },
        { text: `A ${l} m by ${w} m floor uses 2 m by 2 m tiles (4 square meters each). How many tiles are needed?`, visual: "🟦", answer: l * w / 4, hints: ["Find the floor area first.", "Divide the floor area by one tile's area.", "Example: 8 m by 6 m is 48; with 4-square-meter tiles that is 12 tiles. Now do yours."] }
      ]);
    }),
    gen("Percent of a plan", [
      ["Percent", "💯", "<b>Percent</b> means out of 100. 50% is half, 25% is a quarter, 10% is one tenth."],
      ["Find it", "🧮", "To find 25% of 80, divide by 4: 20. To find 10% of 80, divide by 10: 8."],
      ["Use it", "📊", "Engineers use percents for progress, strength and test scores."]
    ], () => {
      const base = pick([40, 60, 80, 100, 120, 200]), pc = pick([10, 25, 50]);
      const out = base * pc / 100;
      return pick([
        { text: `A robot needs ${base} parts. ${pc}% are finished. How many parts are done?`, visual: "🤖", answer: out, hints: ["Percent means out of 100.", pc === 50 ? "Think of the fraction this percent stands for, and find that share." : "Convert the percent to a simple fraction, then find that part.", "Example: 50% of 20 is half of 20, which is 10. Now do yours."] },
        { text: `${pc}% of a bridge is built. The finished part is ${out} meters. How long is the whole bridge in meters?`, visual: "🌉", answer: base, hints: ["The finished part is only a share of the whole.", "Divide by the percent as a fraction, or multiply by what fits back to 100%.", "Example: 50% is 10 m, so the whole is 2 x 10 = 20 m. Now do yours."] }
      ]);
    }),
    gen("Gear ratio", [
      ["Ratio", "⚙️", "The <b>gear ratio</b> compares the teeth of two gears: driven teeth / driver teeth."],
      ["Slow and strong", "🐢", "A ratio over 1 (like 4:1) makes the driven gear turn slower but with more turning force. A ratio under 1 makes it faster."],
      ["Example", "🚲", "A 10-tooth driver turning a 40-tooth gear has a ratio of 40 / 10 = 4, so the driver turns 4 times for each turn of the big gear."]
    ], () => {
      const a = pick([6, 8, 10, 12]), r = ri(2, 6), t = ri(2, 5);
      return pick([
        { text: `A ${a}-tooth driver gear turns a ${a * r}-tooth gear. What is the gear ratio (driven / driver)?`, visual: "⚙️", answer: r, hints: ["Ratio compares the teeth of the two gears.", "Divide driven teeth by driver teeth.", "Example: 5 teeth driving 15 teeth: 15 / 5 = 3. Now do yours."] },
        { text: `The gear ratio is ${r}:1. The driver gear turns ${r * t} times. How many times does the driven gear turn?`, visual: "⚙️", answer: t, hints: ["A ratio over 1 means the driven gear turns slower.", "Divide the driver's turns by the ratio.", "Example: ratio 3:1, driver turns 12 times, driven turns 12 / 3 = 4. Now do yours."] }
      ]);
    }),
    gen("Binary numbers", [
      ["Bits", "💾", "Computers use only <b>0</b> and <b>1</b>. Each digit is a <b>bit</b>."],
      ["Place values", "🔢", "In a 3-bit number the places are 4, 2 and 1. Binary 101 means 4 + 0 + 1 = 5."],
      ["Use it", "🤖", "Robot brains store everything as bits: numbers, pictures and sound."]
    ], () => {
      const n = ri(1, 7), b = n.toString(2).padStart(3, "0");
      return pick([
        { text: `What decimal number is the binary number ${b}? (Places are 4, 2, 1.)`, visual: "💾", answer: n, hints: ["Each 1 turns on its place value.", "Add the place values (4, 2, 1) only where there is a 1.", "Example: 110 is 4 + 2 + 0 = 6. Now do yours."] },
        { text: `A sensor sends the bits ${b}. Each 1 turns on a light worth 4, 2 or 1 from left to right. What is the total?`, visual: "💡", answer: n, hints: ["Lights that are on count. Lights that are off do not.", "Add up 4, 2 and 1 only for the positions with a 1.", "Example: 011 turns on 2 and 1 so the total is 3. Now do yours."] }
      ]);
    }),
    les("Flowcharts", [
      ["Boxes", "🔷", "A <b>flowchart</b> shows the steps of a program with shapes and arrows. Rounded boxes start and end, rectangles are actions, and diamonds are questions."],
      ["Decision", "🔀", "A diamond asks yes or no. One arrow goes for yes and another for no."],
      ["Follow", "➡️", "Follow the arrows one at a time to see what the program does."]
    ], ["Look at the shape: action or question?", "Diamonds ask a question with two ways out.", "Example: Is it dark? Yes: lamp on. No: lamp off. Now try yours."], [
      ["A diamond in a flowchart means a...", "Decision (question)", "Action"], ["A rectangle in a flowchart is usually an...", "Action", "Question"],
      ["How many ways out of a yes/no decision?", "Two", "One"], ["What do arrows show?", "The order of steps", "The weather"],
      ["A rounded box often shows the...", "Start or end", "Question"], ["A flowchart helps you plan a...", "Program", "Sandwich only"],
      ["Question: Is the path blocked? Yes: turn. No: go on. Path is clear, so the robot...", "Goes on", "Turns"], ["Question: Is the battery low? Yes: charge. The battery is low, so the robot...", "Charges", "Keeps working"]
    ]),
    gen("Reusable functions", [
      ["Function", "🧰", "A <b>function</b> is a named group of steps you can use again and again. Write it once, then call it."],
      ["Example", "🔷", "Function square(size): move size, turn, four times. Calling square(3) moves 4 x 3 = 12 steps."],
      ["Why", "✨", "Functions keep programs short and help fix bugs in one place."]
    ], () => {
      const s = ri(2, 6), c = ri(2, 5);
      return pick([
        { text: `A function square(size) moves forward "size" steps 4 times (turns do not count). How many steps does square(${s}) move in all?`, visual: "🔷", answer: 4 * s, hints: ["The function repeats a side four times.", "Multiply the size by 4.", "Example: square(5) moves 4 x 5 = 20 steps. Now do yours."] },
        { text: `The same function square(${s}) is called ${c} times in a program. How many steps does the robot move in all?`, visual: "🤖", answer: 4 * s * c, hints: ["Find the steps for one call first.", "Then multiply by the number of calls.", "Example: one call moves 12 steps, 2 calls move 24. Now do yours."] }
      ]);
    }),
    les("Feedback and control", [
      ["Feedback", "🌡️", "<b>Feedback</b> means a machine measures what is happening and adjusts. A thermostat measures the room temperature."],
      ["Loop", "🔁", "If the room is too cold, the heater turns on. When it is warm enough, it turns off. The loop repeats."],
      ["Examples", "🚗", "Cruise control keeps a car at a set speed. A robot vacuum slows near a wall."]
    ], ["What does the machine measure, and what does it change?", "Measure, compare with the goal, adjust.", "Example: a fish tank heater turns on when the water is below the set temperature. Now try yours."], [
      ["A thermostat measures...", "Temperature", "Sound"], ["Too cold, so the heater turns...", "On", "Off"],
      ["Feedback means the machine...", "Measures and adjusts", "Never changes"], ["Cruise control keeps a car's...", "Speed", "Color"],
      ["A room reaches the set warm temperature. The heater turns...", "Off", "On"], ["An automatic night light uses feedback from a...", "Light sensor", "Speaker"],
      ["A robot slows near a wall because its sensor...", "Measures the distance", "Likes walls"], ["A feedback loop repeats...", "Again and again", "Just once"]
    ]),
    les("Engineering and nature", [
      ["Impact", "🌍", "Everything engineers build affects people and nature. They think about air, water, animals and neighbors."],
      ["Choices", "⚖️", "Good engineers compare choices: cost, safety, speed, and harm to the environment."],
      ["Fix", "🛠️", "Examples: bridges with passages for animals, filters for factories, and efficient engines."]
    ], ["Think about who could be helped or harmed.", "Pick the choice that is safest and kindest to the planet.", "Example: a road with an animal tunnel keeps wildlife safe. Now try yours."], [
      ["Why check a design's effect on nature?", "To protect animals and air", "To make it ugly"], ["A filter on a factory chimney helps clean the...", "Air", "Moon"],
      ["A tunnel under a road lets animals...", "Cross safely", "Drive cars"], ["Good engineers compare...", "Cost, safety and effects on nature", "Only paint colors"],
      ["Which is kinder to the planet?", "A solar-powered light", "Leaving lights on all day"], ["An efficient engine uses...", "Less fuel", "More fuel"],
      ["Who should engineers think about?", "People and nature", "Nobody"], ["Cleaner designs make less...", "Pollution", "Sunshine"]
    ]),
    gen("Pick the best design", [
      ["Data", "📊", "Engineers test designs and compare numbers. Check what matters: the highest strength, the lowest cost, or the best value."],
      ["Read", "👀", "Look at the column you care about. Compare all the values."],
      ["Rule", "⚠️", "A design must also meet the rules (like the budget) before it can win."]
    ], () => {
      const names = shuf(["Design A", "Design B", "Design C"]), vals = shuf([ri(5, 9), ri(10, 15), ri(16, 22)]);
      const wantMax = Math.random() < 0.5, best = wantMax ? Math.max(...vals) : Math.min(...vals);
      const ans = names[vals.indexOf(best)];
      return { text: `Weights held before breaking: ${names.map((n, i) => `${n} = ${vals[i]} kg`).join(", ")}. Which design is ${wantMax ? "the strongest" : "the weakest"}?`, visual: "📊", choices: names, answer: ans, hints: ["Look at the numbers for each design.", wantMax ? "Strongest means holds the most." : "Weakest means holds the least.", "Example: A = 4 kg, B = 9 kg. B holds more so B is stronger. Now do yours."] };
    }),
    les("Why things fail", [
      ["Failure", "🧯", "Things fail when forces are bigger than the material can handle. Causes: overload, wear, a weak joint, or the wrong material."],
      ["Fatigue", "🔄", "<b>Fatigue</b> is when a part bends back and forth many times until it cracks, like bending a paper clip again and again."],
      ["Learn", "📘", "Engineers study failures so they never happen again. A failure is data."]
    ], ["Think of the force and the part's limit.", "A small push repeated many times can break a part too.", "Example: a chair breaks when someone much heavier than it was made for sits. That is overload. Now try yours."], [
      ["Too much weight on a part is...", "Overload", "Fatigue"], ["Bending a paper clip back and forth until it snaps shows...", "Fatigue", "Overload"],
      ["Why study failures?", "To prevent them again", "To feel bad"], ["A wooden bridge made from thin matchsticks failing from heavy trucks shows...", "Overload", "Success"],
      ["Using soft chalk for a hammer head is the...", "Wrong material", "Right material"], ["A rusty bolt is weakened by...", "Wear and rust", "More paint"],
      ["A weak joint is the place a structure may...", "Break first", "Be strongest"], ["An engineer treats a failure as...", "Data to learn from", "Something to hide"]
    ]),
    null, null
  ];
  k[18] = mix("Mixed practice", at(k, [0, 2, 3, 5, 7, 9, 10, 12, 14]));
  k[19] = mix("Level 9 Challenge", at(k, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 7: g, 8: h, 9: k });
})();
