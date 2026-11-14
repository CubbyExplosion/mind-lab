// Mind Lab Engineering & Robots. Levels 1-3, 20 lessons each.
// Needs math.js and spelling.js loaded first (uses ri, pick, shuf).
const ENGINEER_LEVELS = (() => {
  // item = [question, rightAnswer, wrong1, wrong2?]  (use "emoji§question" to show a big picture)
  // items can also be a function that returns one item (for counting questions)
  const les = (title, slides, hints, items) => {
    const make = () => {
      const it = typeof items === "function" ? items() : pick(items), parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1)), answer: it[1], hints };
    };
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
  const wrongNums = ans => shuf([ans + 1, ans - 1, ans + 2, ans - 2, ans + 3].filter(x => x > 0 && x !== ans)).slice(0, 2);

  // counting makers
  const wheelsQ = (maxN) => () => {
    const [name, e, w] = pick([["car", "🚗", 4], ["bike", "🚲", 2], ["wagon", "🛒", 4], ["scooter", "🛴", 2], ["tricycle", "🚲", 3]]);
    const n = ri(2, maxN), ans = n * w;
    return [`${e.repeat(n)}§Each ${name} has ${w} wheels. How many wheels are there in all?`, ans, ...wrongNums(ans)];
  };
  const partsQ = (maxN) => () => {
    const [name, e, p, part] = pick([["table", "🪑", 4, "legs"], ["spider robot toy", "🕷️", 8, "legs"], ["airplane", "✈️", 2, "wings"], ["bike", "🚲", 2, "pedals"], ["toy truck", "🚚", 4, "wheels"], ["robot", "🤖", 2, "arms"]]);
    const n = ri(2, maxN), ans = n * p;
    return [`${e.repeat(n)}§There are ${n} ${name}s. Each one has ${p} ${part}. How many ${part} in all?`, ans, ...wrongNums(ans)];
  };
  const blocksQ = () => {
    const rows = ri(2, 5), per = ri(2, 4), ans = rows * per;
    return [`🧱§A wall has ${rows} rows. Each row has ${per} bricks. How many bricks are in the wall?`, ans, ...wrongNums(ans)];
  };

  // ================= LEVEL 1 =================
  const a = [
    les("What is an engineer?", [
      ["Engineers", "👷 🛠️", "An <b>engineer</b> is a person who solves problems by designing and building things."],
      ["What they make", "🌉 🚗 🤖", "Engineers help make bridges, cars, toys, robots and many things we use every day."],
      ["You can too", "🧱", "When you build with blocks and think \"how can I make this better?\", you think like an engineer."]
    ], ["Engineers make things that help people.", "They solve problems by planning, building and testing.", "Example: an engineer can design a bridge so cars can cross a river. Now try yours."], [
      ["An engineer is a person who...", "Solves problems by building things", "Only sleeps", "Only sings"], ["Which could an engineer help build?", "A bridge", "A rainbow", "A shadow"],
      ["Engineers make things that help...", "People", "Nothing"], ["Building with blocks is like...", "Thinking like an engineer", "Sleeping"], ["Which could an engineer make?", "A robot", "A cloud", "A song only"],
      ["Engineers like to...", "Solve problems", "Break everything"], ["Can kids think like engineers?", "Yes", "No"]
    ]),
    les("Build a tall tower", [
      ["Start wide", "🧱", "To build a tall tower, start with a <b>wide base</b>. Put the big blocks at the bottom."],
      ["Small on top", "🔝", "Put smaller blocks on top. The tower is steadier that way."],
      ["Try again", "🔄", "If it falls, don't worry! Fix it and build again."]
    ], ["Think about what holds the tower up.", "Wide and big on the bottom. Small on top.", "Example: a pyramid of blocks has a wide bottom and a small top, so it stands well. Now try yours."], [
      ["To build a tall tower, start with a...", "Wide base", "Tiny base"], ["Which block goes at the bottom?", "The biggest block", "The smallest block"], ["Your tower wobbles. What can you do?", "Make the bottom wider", "Add more on top only"],
      ["Which tower is steadier?", "Big blocks at the bottom", "Big blocks at the top"], ["Your tower falls down. What do you do?", "Fix it and try again", "Never build again"], ["Small blocks go...", "On top", "Under everything"],
      ["A steady tower has a...", "Strong base", "Wobbly base"]
    ]),
    les("Strong shapes", [
      ["Triangles", "🔺", "A <b>triangle</b> is a very strong shape. It has 3 sides and 3 corners."],
      ["Squares wobble", "🟦", "A square frame can lean over when you push the corner. A triangle frame stays stiff."],
      ["Triangles are used", "🌉 🏠 🚲", "Bridges, roofs and bike frames have triangles in them to make them strong."]
    ], ["Think about which shape does not change when you push it.", "Triangles are stiff. Squares can lean.", "Example: a bike frame has triangles to keep it stiff. Now try yours."], [
      ["Which shape is very strong?", "Triangle", "Wobbly blob", "Wavy line"], ["How many sides does a triangle have?", "3", "4", "5"], ["Which frame stays stiff when you push it?", "Triangle frame", "Square frame"],
      ["Bridges and roofs use triangles to be...", "Strong", "Funny"], ["A square frame, when pushed, can...", "Lean over", "Turn into a triangle"], ["Which has 3 corners?", "A triangle", "A square", "A circle"],
      ["Which is part of a bike frame?", "Triangles", "Clouds"]
    ]),
    les("Wide bases stay up", [
      ["Wide and low", "⛰️", "Things with a wide base are hard to tip over. Mountains and pyramids are wide at the bottom."],
      ["Tippy", "📏", "A tall skinny pole with a small base can tip over easily."],
      ["Your body", "🧍", "Stand with your feet wide apart. You are harder to push over!"]
    ], ["Look at the bottom of each thing.", "A bigger bottom is steadier.", "Example: a wide bucket is harder to tip than a tall skinny cup. Now try yours."], [
      ["Which is harder to tip over?", "Something with a wide base", "Something with a tiny base"], ["Which stands better?", "A pyramid", "A tall skinny pole on a tiny base"], ["Standing with feet wide apart makes you...", "Steadier", "Wobblier"],
      ["A mountain is wide at the...", "Bottom", "Top"], ["Which tips easily?", "A tall pole on a small base", "A wide flat box"], ["To make a lamp steadier, give it a...", "Wide base", "Narrow base"],
      ["A wide base makes things...", "More stable", "More likely to fall"]
    ]),
    les("Right material for the job", [
      ["Pick well", "🛠️", "Engineers choose materials that are good for the job."],
      ["Examples", "🪟 🌂 🛞", "Glass for a window (see-through). Waterproof cloth for an umbrella. Rubber for a tire (bouncy and grippy)."],
      ["Ask", "❓", "Ask: does it need to be strong? Soft? See-through? Waterproof?"]
    ], ["Think about what the thing needs to do.", "See-through = glass. Strong = steel. Waterproof = plastic or rubber.", "Example: a pot is metal because it must handle heat. Now try yours."], [
      ["Best for a window?", "Glass", "Paper", "Cloth"], ["Best for a rain boot?", "Rubber", "Paper", "Cheese"], ["Best for a cooking pot?", "Metal", "Paper", "Cotton"], ["Best for a bike helmet?", "Hard plastic", "Paper", "Cloth"],
      ["Best for a strong bridge?", "Steel", "Paper", "Cotton candy"], ["Best for a soft pillow?", "Fluffy stuffing", "Brick", "Metal"], ["Best for a sponge to soak water?", "Soft sponge material", "Glass", "Metal"]
    ]),
    les("Tools and what they do", [
      ["Tools help", "🔨 🪛 ✂️", "A <b>tool</b> helps us do a job. A hammer pounds nails. A screwdriver turns screws. Scissors cut."],
      ["Measuring", "📏", "A <b>ruler</b> measures how long something is. A tape measure does too."],
      ["Saw", "🪚", "A saw cuts wood. A grown-up must help you with a saw."]
    ], ["Match the tool to the job.", "Hammer = nails. Screwdriver = screws. Ruler = length.", "Example: a paintbrush puts paint on a wall. Now try yours."], [
      ["A hammer is used to...", "Pound nails", "Cut paper", "Measure"], ["Scissors are used to...", "Cut paper", "Pound nails", "Turn screws"], ["A ruler is used to...", "Measure length", "Cut wood", "Paint"],
      ["A screwdriver turns...", "Screws", "Nails", "Doors"], ["A saw cuts...", "Wood", "Water", "Air"], ["A paintbrush is used to...", "Paint", "Measure", "Cut"],
      ["A tape measure tells you...", "How long something is", "How heavy it is", "What color it is"]
    ]),
    les("Tool safety", [
      ["Ask a grown-up", "🧑‍🔧", "Some tools can hurt, like saws, hammers and hot tools. Ask a grown-up to help."],
      ["Wear goggles", "🥽", "Goggles protect your eyes from flying bits."],
      ["Clean up", "🧹", "When you are done, put the tools away. Never leave them on the floor."]
    ], ["Think about how to stay safe with tools.", "Ask a grown-up, wear goggles, and put tools away.", "Example: before using a saw you ask a grown-up to help. Now try yours."], [
      ["Who helps you with a saw?", "A grown-up", "A pet", "Nobody"], ["What protects your eyes?", "Goggles", "Hat", "Mittens"], ["After using tools, you...", "Put them away", "Leave them on the floor"],
      ["Should you run with scissors?", "No", "Yes"], ["Carry scissors with the points...", "Down", "Up at someone"], ["You don't know how to use a tool. What do you do?", "Ask a grown-up", "Try it fast"],
      ["Is it OK to play with a hammer like a toy?", "No", "Yes"]
    ]),
    les("Parts of a thing", [
      ["Parts", "🚲", "Most things are made of <b>parts</b>. A bike has wheels, pedals, a seat and handlebars."],
      ["Jobs", "🎡", "Each part has a job. Wheels roll. Handlebars steer. Pedals make it go."],
      ["Put together", "🧩", "Engineers put parts together to make something that works."]
    ], ["Think about the job of each part.", "Wheels roll. Handlebars steer. Pedals push.", "Example: a door has a handle to open it and hinges to swing. Now try yours."], [
      ["What part helps a bike roll?", "Wheels", "Seat", "Bell"], ["What part helps you steer a bike?", "Handlebars", "Pedals", "Wheels"], ["What part do you push with your feet on a bike?", "Pedals", "Handlebars", "Bell"],
      ["A wagon has a handle and...", "Wheels", "Wings"], ["A boat uses a ___ to catch the wind.", "Sail", "Wheel"], ["A door opens and closes on...", "Hinges", "Wings"], ["What part lets a car turn?", "Steering wheel", "Window"]
    ]),
    les("Count the parts", [
      ["Counting parts", "🔢", "Engineers count parts to make sure they have enough."],
      ["Skip count", "🚗🚗", "If one car has 4 wheels, two cars have 4 + 4 = 8 wheels."],
      ["Tip", "💡", "Count by the number of parts in each one: 4, 8, 12..."]
    ], ["Find how many parts are in one. Then count that many for each.", "Skip count by the parts in one.", "Example: 3 chairs with 4 legs each: 4, 8, 12. Now do yours."], wheelsQ(4)),
    les("Sorting parts", [
      ["Which one doesn't belong?", "🔍", "Sorting means putting things that are alike together. Something that is not like the others <b>doesn't belong</b>."],
      ["Tools together", "🔨 🪛 📏", "A hammer, a screwdriver and a ruler are all tools."],
      ["Look for the odd one", "🍌", "A banana is not a tool, so it doesn't belong with them."]
    ], ["Find what the most of them have in common.", "Which one is different from the others?", "Example: hammer, saw, spoon-shaped cloud... the cloud is not a tool. Now try yours."], [
      ["Which one doesn't belong? hammer, saw, banana", "Banana", "Hammer", "Saw"], ["Which one doesn't belong? wheel, wheel, cloud", "Cloud", "Wheel"], ["Which one doesn't belong? screwdriver, ruler, apple", "Apple", "Screwdriver", "Ruler"],
      ["Which one doesn't belong? brick, block, banana peel", "Banana peel", "Brick", "Block"], ["Which one doesn't belong? bridge, tower, ice cream", "Ice cream", "Bridge", "Tower"], ["Which one doesn't belong? robot, car, tree", "Tree", "Robot", "Car"],
      ["Which one doesn't belong? goggles, helmet, pizza", "Pizza", "Goggles", "Helmet"]
    ]),
    les("Bridges", [
      ["Bridges", "🌉", "A <b>bridge</b> helps us cross over a river, a road or a valley."],
      ["Supports", "🏛️", "Bridges have <b>supports</b> that hold them up, like pillars or cables."],
      ["Strong", "🚚", "A bridge must be strong enough to hold cars, trucks and people."]
    ], ["A bridge lets us cross something.", "Supports and strong materials keep it from falling.", "Example: a log across a stream is a very simple bridge. Now try yours."], [
      ["A bridge helps us cross a...", "River", "Pillow", "Song"], ["What holds a bridge up?", "Supports", "Wishes", "Balloons"], ["A bridge must be...", "Strong", "Made of paper"],
      ["Which could be a simple bridge?", "A log across a stream", "A cloud", "A feather"], ["Adding supports under a bridge makes it...", "Stronger", "Weaker"], ["Which shape helps make a bridge strong?", "Triangle", "Wavy line"],
      ["Cars use a bridge to go...", "Across", "Under only"]
    ]),
    les("Towers", [
      ["Tall towers", "🗼", "A <b>tower</b> is tall and holds itself up. A good tower has a strong, wide base."],
      ["Engineers test", "🧪", "Engineers test a tower by gently shaking the table. Does it stay up?"],
      ["Make it better", "🔧", "If it wobbles, make the bottom wider or use stronger materials."]
    ], ["A tower needs a good base to stay up.", "Wide base, strong materials, and testing help.", "Example: a lighthouse is wide at the bottom and narrower at the top. Now try yours."], [
      ["A tower is...", "Tall", "Flat", "Round and short"], ["A good tower has a strong...", "Base", "Hat"], ["Your tower wobbles. What can you do?", "Make the bottom wider", "Add more on top"],
      ["How can you test a tower?", "Gently shake the table", "Throw it"], ["Which is steadier?", "A tower with a wide base", "A tower with a pointy base"], ["Which shape of tower is steady?", "Wide at the bottom, narrower at the top", "Wide at the top, narrow at the bottom"],
      ["Stronger materials make a tower...", "Last longer", "Tip easily"]
    ]),
    les("Wheels and ramps", [
      ["Wheels roll", "🛞", "<b>Wheels</b> help things roll. It is easier to roll a heavy box on wheels than to drag it."],
      ["Ramps", "📦", "A <b>ramp</b> is a slope. It helps move heavy things up or down."],
      ["Slides", "🛝", "A playground slide is a ramp that you slide down."]
    ], ["Wheels roll. Ramps slope.", "Both make moving things easier.", "Example: a toy truck rolls down a ramp. Now try yours."], [
      ["Wheels help things...", "Roll", "Melt", "Sleep"], ["A ramp is a...", "Slope", "Rope", "Ball"], ["Which is easier to move?", "A heavy box on wheels", "A heavy box dragged on the ground"], ["A playground slide is a...", "Ramp", "Wheel"],
      ["A wagon moves with...", "Wheels", "Wings"], ["A ramp helps move heavy things...", "Up or down", "Nowhere"], ["A skateboard has...", "Wheels", "Wings"]
    ]),
    les("Build, test, fix", [
      ["Try it", "🛠️", "Engineers <b>build</b> something, <b>test</b> it, and <b>fix</b> it to make it better."],
      ["Mistakes help", "💡", "If it doesn't work, you learn something! That is how engineers get better."],
      ["Again", "🔄", "Build, test, fix. Then test again."]
    ], ["Think about what comes after you build something.", "Build, test, fix, test again.", "Example: your paper plane crashes, so you bend the wings and try again. Now try yours."], [
      ["After you build something, you...", "Test it", "Hide it"], ["It didn't work. What now?", "Fix it and try again", "Give up forever"], ["Mistakes help us...", "Learn", "Feel bad forever"],
      ["Engineers build, test and...", "Fix", "Forget"], ["Your tower falls. This tells you...", "Something to fix", "You can't build"], ["Your paper plane dives. You...", "Change the wings and test again", "Throw it away and quit"],
      ["After you fix something, you...", "Test it again", "Never look at it"]
    ]),
    les("What is a robot?", [
      ["Robots", "🤖", "A <b>robot</b> is a machine that follows instructions. People build robots and tell them what to do."],
      ["Not alive", "⚙️", "Robots are not alive. They don't feel happy or sad. They follow their program."],
      ["Power", "🔋", "Robots need power, like a battery, to move."]
    ], ["A robot is a machine.", "It follows instructions from people.", "Example: a toy robot walks forward because it was built to. Now try yours."], [
      ["A robot is a machine that follows...", "Instructions", "Dreams", "Weather"], ["Is a robot alive?", "No", "Yes"], ["Who tells a robot what to do?", "People", "The moon"],
      ["Robots are made by...", "People", "Clouds"], ["A robot needs ___ to move.", "Power (like a battery)", "Chocolate"], ["Can a robot feel happy like a person?", "No", "Yes"],
      ["Which is a robot?", "A robot vacuum", "A teddy bear", "A tree"]
    ]),
    les("Robot helpers", [
      ["Helpers", "🧹 🤖", "Robots help people. A robot vacuum cleans the floor."],
      ["Big jobs", "🏭 🦾", "Robot arms in factories lift heavy parts and build cars."],
      ["Far away", "🔭 🪐", "A rover robot can explore Mars where people cannot go yet."]
    ], ["Think about what job the robot has.", "Vacuum = floors. Arm = lifting. Rover = exploring.", "Example: a robot lawn mower cuts grass. Now try yours."], [
      ["A robot vacuum cleans...", "Floors", "The sky"], ["A robot arm in a factory can...", "Lift heavy parts", "Bake cookies only"], ["A rover robot can explore...", "Mars", "Your pocket"],
      ["A drone can...", "Fly", "Swim only"], ["Robots can help with jobs that are...", "Boring or dangerous", "Never"], ["A robot lawn mower cuts...", "Grass", "Hair"],
      ["Robots are good at...", "Doing the same job again and again", "Telling jokes about people"]
    ]),
    les("Robot senses", [
      ["Sensors", "📷 🎤", "A <b>sensor</b> helps a robot notice the world. A camera is like eyes. A microphone is like ears."],
      ["Touch sensor", "🖐️", "A touch sensor tells a robot when it has bumped into something."],
      ["Use what it senses", "🤖", "Robots use sensors to know what is going on, then decide what to do."]
    ], ["A sensor helps a robot notice things.", "Camera = eyes. Microphone = ears. Touch sensor = bump.", "Example: a robot vacuum has a bump sensor to turn when it hits a wall. Now try yours."], [
      ["A robot's camera is like its...", "Eyes", "Feet"], ["A robot's microphone is like its...", "Ears", "Eyes"], ["A touch sensor tells a robot that it...", "Bumped something", "Is hungry"],
      ["Sensors help robots...", "Notice things", "Eat lunch"], ["Which sensor hears sounds?", "Microphone", "Camera"], ["Which sensor sees?", "Camera", "Microphone"],
      ["A robot hits a wall. Which sensor tells it?", "Touch sensor", "Microphone"]
    ]),
    les("Robot safety", [
      ["Moving parts", "🦾", "Robots can have moving arms and wheels. Keep your fingers and hair away."],
      ["Grown-ups", "🧑‍🔧", "Ask a grown-up to turn on or fix big robots. Batteries need a grown-up, too."],
      ["Off switch", "🔴", "Know where the off switch is. If a robot acts strangely, switch it off and tell a grown-up."]
    ], ["Robots can have parts that move.", "Stay back, ask a grown-up, and know the off switch.", "Example: a robot arm is moving. You stand back and watch. Now try yours."], [
      ["Where should your fingers be near a moving robot?", "Away from it", "Inside it"], ["Who helps with big robots and batteries?", "A grown-up", "A baby"], ["A robot acts strangely. What do you do?", "Switch it off and tell a grown-up", "Poke it"],
      ["Should you stand in the way of a moving robot?", "No", "Yes"], ["What is good to know on a robot?", "Where the off switch is", "Its favorite food"], ["Can a robot's moving arm pinch you?", "Yes, so stay away", "No, never"],
      ["Who should change robot batteries?", "A grown-up", "A kid by themselves"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [1, 2, 4, 5, 10, 13, 15])),
    mix("Level 1 Challenge", at(a, [0, 3, 6, 7, 11, 12, 14, 16, 17]))
  );

  // ================= LEVEL 2 =================
  const b = [
    les("Plan, build, test, fix", [
      ["The loop", "🔄", "Engineers follow steps: <b>Ask</b> (what is the problem?), <b>Plan</b>, <b>Build</b>, <b>Test</b>, <b>Fix</b>."],
      ["Order matters", "1️⃣2️⃣3️⃣", "You plan before you build. You test after you build. You fix after you test."],
      ["Go again", "🔁", "After you fix it, you test again. Engineers repeat the steps until it works well."]
    ], ["Think about what comes first and what comes last.", "Ask, Plan, Build, Test, Fix.", "Example: after you test a boat and it tips over, you fix it. Now try yours."], [
      ["What do you do right after you build?", "Test it", "Plan it", "Hide it"], ["What do you do before you build?", "Plan", "Test", "Fix"], ["What do you do after a test shows a problem?", "Fix it", "Never touch it again"],
      ["The first step is to ask: what is the...", "Problem", "Prize"], ["After you fix, you...", "Test again", "Stop forever"], ["Which order is right?", "Plan, build, test, fix", "Fix, test, build, plan"],
      ["Engineers repeat the steps until it...", "Works well", "Falls apart"]
    ]),
    les("Find the problem", [
      ["Problems", "❓", "Engineers start by finding a <b>problem</b> to solve. Then they invent something that helps."],
      ["Solutions", "☂️", "A problem: rain gets us wet. A solution: an umbrella keeps us dry."],
      ["Match", "🧩", "Every invention solves a problem."]
    ], ["Ask: what problem does this fix?", "Match each thing to the problem it solves.", "Example: a flashlight solves the problem of the dark. Now try yours."], [
      ["An umbrella solves the problem of...", "Rain", "Hunger", "Silence"], ["A bridge solves the problem of...", "Crossing a river", "Being thirsty"], ["A flashlight solves the problem of...", "Darkness", "Rain"],
      ["A coat solves the problem of...", "Being cold", "Being bored only"], ["Wheels solve the problem of...", "Moving heavy things", "Seeing at night"], ["A ladder solves the problem of...", "Reaching up high", "Going fast"],
      ["A cup solves the problem of...", "Holding a drink", "Painting walls"]
    ]),
    les("Pick the best idea", [
      ["Choose", "✅", "Engineers think of more than one idea. Then they pick the one that works best."],
      ["Test ideas", "🧪", "They test each idea. The best one solves the problem and is safe and strong."],
      ["Example", "🌧️", "To keep rain off a puppy house: a leaf roof leaks, a wooden roof works well. Pick the wooden roof."]
    ], ["Think about which idea solves the problem best.", "Strong, safe, and does the job.", "Example: to carry water, a bucket works better than a basket with holes. Now try yours."], [
      ["Which is best to carry water?", "A bucket", "A basket with holes", "A paper bag"], ["Which is best to keep rain off?", "A roof", "An open box", "A net"], ["Which is best to reach a high shelf safely?", "A sturdy stool", "A wobbly pile of books", "A chair on a table"],
      ["Which is best to keep your head safe on a bike?", "A helmet", "A paper hat", "A bowl"], ["Which is best to hold a heavy book?", "A strong shelf", "A paper plate", "A feather"], ["Which is best to dig a hole in sand?", "A shovel", "A fork", "A sock"],
      ["Which is best to see in the dark?", "A flashlight", "A sock", "A spoon"]
    ]),
    les("Draw a plan", [
      ["Plan first", "📝", "Before building, engineers <b>draw a plan</b>. It shows what to build and where the parts go."],
      ["Label", "🏷️", "Write the names of the parts on the drawing so everyone understands."],
      ["Measure", "📏", "Add numbers, like how long each piece should be."]
    ], ["A plan is a drawing that helps you build.", "Draw, label parts, add measurements.", "Example: before building a doghouse you draw it with a door and a roof. Now try yours."], [
      ["Before building, engineers...", "Draw a plan", "Throw it together"], ["A plan shows...", "What to build and where parts go", "Only the weather"], ["Why label the parts?", "So everyone understands", "To hide them"],
      ["Which goes on a plan?", "Measurements", "Jokes only"], ["The plan comes...", "Before building", "After the thing breaks"], ["A good plan helps you...", "Build better", "Forget"],
      ["A drawing of what you will build is a...", "Plan", "Rain"]
    ]),
    les("Triangles are strong", [
      ["Stiff shape", "🔺", "A <b>triangle</b> cannot change shape unless a side breaks. That makes it strong."],
      ["Squares lean", "🟦", "A square can squash into a slanted diamond. Add a diagonal piece and it turns into two triangles, so it stays stiff."],
      ["Look for them", "🌉 🏠 🗼", "Bridges, roof frames and towers use many triangles."]
    ], ["A triangle holds its shape.", "Adding a diagonal brace turns a wobbly square into triangles.", "Example: a gate has a diagonal board so it does not sag. Now try yours."], [
      ["Which shape holds its shape best?", "Triangle", "Square frame"], ["A diagonal brace in a square makes...", "Two triangles", "A circle"], ["A bridge truss has lots of...", "Triangles", "Balloons"],
      ["A wobbly square frame gets stiff when you add a...", "Diagonal brace", "Bell"], ["Where do you see triangles?", "Roof frames", "Only in the sky"], ["A gate has a diagonal board so it does not...", "Sag", "Sing"],
      ["Triangles are strong because they...", "Don't change shape easily", "Are magic"]
    ]),
    les("Arches", [
      ["The curve", "🌉", "An <b>arch</b> is a curved shape. It spreads the weight of a bridge out to its two ends."],
      ["Old and strong", "🏛️", "People have built stone arches for thousands of years. Many are still standing!"],
      ["Doors too", "🚪", "Arches are used in bridges, doorways and tunnels."]
    ], ["An arch is a curve that holds weight.", "It spreads the weight down both sides.", "Example: a tunnel entrance is often shaped like an arch. Now try yours."], [
      ["An arch is a...", "Curved shape", "Flat line"], ["An arch helps a bridge by...", "Spreading the weight", "Making noise"], ["Where might you see an arch?", "A stone bridge", "Only underwater"],
      ["Arches have been used for...", "Thousands of years", "Only one day"], ["Which is an arch shape?", "A rainbow-like curve", "A straight stick"], ["A tunnel doorway can be an...", "Arch", "Ant"],
      ["An arch holds weight by sending it to its...", "Two ends", "Middle only"]
    ]),
    les("Stable or wobbly?", [
      ["Stable", "⚖️", "<b>Stable</b> means steady and hard to tip. Wobbly things tip easily."],
      ["Make it stable", "⬇️", "A wide base and a low weight make something more stable."],
      ["Try it", "🥤", "A wide mug is steadier than a tall thin glass."]
    ], ["Look for a wide, low bottom.", "Heavy at the bottom and wide = stable.", "Example: a snowman is steady because the big ball is at the bottom. Now try yours."], [
      ["Which is more stable?", "A wide mug", "A tall thin glass"], ["Stable means...", "Steady", "Loud"], ["Which makes something more stable?", "A wide base", "A tiny base"],
      ["Which is more likely to tip?", "A tall pole on a small base", "A wide, low box"], ["Put heavy things...", "Low down", "High up"], ["A snowman is stable because the big ball is at the...", "Bottom", "Top"],
      ["Wobbly means...", "Tips easily", "Very strong"]
    ]),
    les("Strong materials", [
      ["Steel", "🏗️", "<b>Steel</b> is very strong. Engineers use it for bridges and tall buildings."],
      ["Wood and brick", "🏠 🧱", "Wood is used for many homes. Bricks are hard and last a long time."],
      ["Weak ones", "📄", "Paper, foam and thin plastic bend easily, so they are not good for heavy jobs."]
    ], ["Think about how much weight it must hold.", "Heavy jobs need strong materials.", "Example: a strong rope is good for pulling, thin thread is not. Now try yours."], [
      ["Which is strongest for a big bridge?", "Steel", "Paper", "Cotton"], ["Bricks are...", "Hard and long-lasting", "Soft and floppy"], ["Which is a weak material for a heavy job?", "Paper", "Steel"],
      ["Many homes are built from...", "Wood", "Cotton candy"], ["Tall buildings use strong...", "Steel", "Tissue"], ["A thin foam sheet is...", "Easy to bend", "As strong as steel"],
      ["Which holds more weight?", "A steel bar", "A paper strip"]
    ]),
    les("Parts of a bridge", [
      ["Deck", "🛣️", "The <b>deck</b> is the flat road part of a bridge where we walk or drive."],
      ["Supports", "🏛️", "<b>Piers</b> or pillars hold the deck up. <b>Cables</b> or arches can help too."],
      ["Ends", "⛰️", "The ends of the bridge rest on the ground, called the <b>abutments</b>."]
    ], ["A bridge has a flat top and things that hold it up.", "Deck = road. Pillars = supports. Cables = ropes of steel.", "Example: a footbridge has a deck to walk on and pillars to hold it. Now try yours."], [
      ["The part of the bridge you drive on is the...", "Deck", "Cable", "Sky"], ["What holds the deck up?", "Pillars (supports)", "Clouds"], ["Strong steel ropes on a bridge are called...", "Cables", "Spaghetti"],
      ["A bridge that is curved like a rainbow is an...", "Arch bridge", "Square ball"], ["Pillars in the water are part of the bridge...", "Supports", "Roof"], ["The flat part of a bridge is the...", "Deck", "Cable"],
      ["Which helps hold up a bridge?", "Cables", "Whistles"]
    ]),
    les("Stacking tall", [
      ["Taller needs wider", "🗼", "The taller you build, the wider and stronger the bottom needs to be."],
      ["Light on top", "🪶", "Put lighter things higher. Heavy parts go low."],
      ["Test", "🌬️", "Gently blow on your tower or shake the table. Does it stand?"]
    ], ["Think about what keeps tall things up.", "Wide base, heavy at the bottom, light on top.", "Example: a tall stack of cups needs a wide first row. Now try yours."], [
      ["A taller tower needs a ___ base.", "Wider", "Smaller"], ["Heavy things go...", "Low", "High"], ["Light things go...", "Higher up", "At the very bottom only"],
      ["How can you test your tower?", "Gently shake the table", "Hit it with a ball"], ["Your tall tower leans. What do you do?", "Make the base wider", "Add weight to the top"], ["Which tower is more likely to fall?", "Tall with a tiny base", "Short with a wide base"],
      ["Strong towers need a strong...", "Base", "Hat"]
    ]),
    les("More tools", [
      ["More tools", "🔧 📐", "A <b>wrench</b> turns bolts. <b>Pliers</b> grip things. A <b>drill</b> makes holes. A <b>level</b> shows if something is flat."],
      ["Measure", "📏 ⚖️ ⏱️", "A ruler measures length. A scale measures weight. A timer measures time."],
      ["Safety", "🧑‍🔧", "Ask a grown-up before you use sharp or powered tools."]
    ], ["Match the tool to the job.", "Wrench = bolts. Drill = holes. Level = flat.", "Example: a measuring cup measures how much liquid. Now try yours."], [
      ["A wrench turns...", "Bolts", "Pages"], ["A drill makes...", "Holes", "Sound"], ["Pliers are used to...", "Grip things", "Make food"], ["A level shows if something is...", "Flat", "Sweet"],
      ["Which measures weight?", "A scale", "A ruler"], ["Which measures time?", "A timer", "A ruler"], ["Which measures length?", "A ruler", "A timer"]
    ]),
    les("Measuring", [
      ["Measure it", "📏", "Engineers measure carefully. A ruler measures <b>length</b>. A scale measures <b>weight</b>. A timer measures <b>time</b>."],
      ["Units", "🔢", "We measure length in inches or centimeters, weight in pounds or kilograms, and time in seconds."],
      ["Check twice", "✅", "Measure twice, cut once! Careful measuring avoids mistakes."]
    ], ["Pick the tool that matches what you are measuring.", "Length = ruler. Weight = scale. Time = timer.", "Example: to see how long a pencil is, use a ruler. Now try yours."], [
      ["To find how long a stick is, use a...", "Ruler", "Scale", "Timer"], ["To find how heavy a bag is, use a...", "Scale", "Ruler", "Timer"], ["To time a race, use a...", "Timer", "Ruler", "Scale"],
      ["Which unit measures length?", "Inches", "Seconds", "Pounds"], ["Which unit measures time?", "Seconds", "Inches", "Pounds"], ["Which unit measures weight?", "Pounds", "Seconds", "Inches"],
      ["Measure twice, cut...", "Once", "Never"]
    ]),
    les("Simple machines at work", [
      ["Ramp", "📦", "A ramp helps move things up with less effort."],
      ["Lever", "⚖️", "A lever, like a seesaw or a crowbar, helps lift heavy things."],
      ["Wheel and pulley", "🛞 🪢", "A wheel helps things roll. A pulley helps lift things by pulling down on a rope."]
    ], ["Match the machine to the job.", "Ramp = up a slope. Lever = pry or lift. Wheel = roll. Pulley = lift with a rope.", "Example: a flag goes up using a pulley. Now try yours."], [
      ["To roll a heavy barrel up to a truck, use a...", "Ramp", "Feather"], ["A seesaw is a...", "Lever", "Pulley"], ["To raise a flag up a pole, use a...", "Pulley", "Ramp"],
      ["To move a box easily on the ground, put it on...", "Wheels", "Glue"], ["A crowbar is a kind of...", "Lever", "Wheel"], ["A bike has...", "Wheels", "Wings"],
      ["A wheelchair ramp is easier than...", "Stairs", "Doors"]
    ]),
    les("Robots follow steps", [
      ["Instructions", "📋", "A robot follows <b>instructions</b> step by step, in order. It does exactly what it is told."],
      ["Order matters", "1️⃣2️⃣3️⃣", "If the steps are in the wrong order, the robot gets it wrong."],
      ["Example", "🤖 ➡️ ➡️ ⬆️", "Move forward, move forward, turn left. The robot follows each step."]
    ], ["A robot only does what the steps say.", "Check the order of the steps.", "Example: to make toast: put bread in, push the lever, wait. Wrong order would not work. Now try yours."], [
      ["A robot follows instructions...", "One step at a time", "Only when it feels like it"], ["If the steps are in the wrong order, the robot...", "Gets it wrong", "Still gets it right"], ["Which first? Put on socks or put on shoes?", "Socks", "Shoes"],
      ["A robot does exactly what it is...", "Told", "Dreaming"], ["Which step comes first to cross the street?", "Look both ways", "Run across"], ["Steps for a robot are called...", "Instructions", "Clouds"],
      ["To bake a cake, which comes first?", "Mix the batter", "Eat the cake"]
    ]),
    les("Robot senses 2", [
      ["More sensors", "👀 🎤 ✋ 📏", "Robots can have a <b>camera</b> (sees), a <b>microphone</b> (hears), a <b>touch sensor</b> (bumps) and a <b>distance sensor</b> (how far things are)."],
      ["Light sensor", "💡", "A light sensor can tell if it is bright or dark. Some night lights turn on by themselves."],
      ["Decide", "🧠", "The robot uses sensor information to decide what to do."]
    ], ["Each sensor notices something different.", "Camera sees. Microphone hears. Distance sensor measures how far.", "Example: a car's back sensor beeps when you get close to a wall. Now try yours."], [
      ["Which sensor tells how far away a wall is?", "Distance sensor", "Microphone"], ["A night light turns on in the dark. It uses a...", "Light sensor", "Taste sensor"], ["Which sensor hears a voice?", "Microphone", "Touch sensor"],
      ["Which sensor tells it bumped something?", "Touch sensor", "Camera"], ["A robot camera helps it...", "See", "Hear"], ["A robot uses sensor information to...", "Decide what to do", "Eat dinner"],
      ["A robot vacuum stops before a wall because of its...", "Sensor", "Hat"]
    ]),
    les("Motors and power", [
      ["Motors", "⚙️", "A <b>motor</b> makes parts move, like wheels or an arm."],
      ["Power", "🔋", "A <b>battery</b> gives the motor power. Without power the robot will not move."],
      ["Controller", "🧠", "The robot's <b>brain</b> (a computer chip) tells the motors when to turn on."]
    ], ["Motors move parts. Batteries give power.", "The brain tells the motors what to do.", "Example: a toy car has a motor in its wheels and a battery inside. Now try yours."], [
      ["A motor makes parts...", "Move", "Taste"], ["A battery gives a robot...", "Power", "Feelings"], ["Without power, a robot...", "Stops", "Dances forever"], ["The robot's brain is a...", "Computer chip", "Sponge"],
      ["What tells the motors when to go?", "The robot's brain", "A cloud"], ["A robot's wheels are turned by a...", "Motor", "Whisper"], ["Where does the power come from?", "A battery", "A rock"]
    ]),
    les("Robots and people", [
      ["Alike and different", "🤖 🧑", "Robots can do jobs people tell them to do. They can lift heavy things and repeat the same job again and again."],
      ["People are special", "💗", "People can think of new ideas, feel emotions, care for others and solve brand new problems. Robots follow their program."],
      ["Working together", "🤝", "Robots and people work well as a team. People decide. Robots help."]
    ], ["People think and feel. Robots follow instructions.", "Ask: could a robot feel love? Could a person lift a car like a machine?", "Example: a person invents a robot; the robot repeats a job. Now try yours."], [
      ["Who decides what a robot does?", "People", "The robot's shadow"], ["Can robots feel happy like people?", "No", "Yes"], ["A robot is good at...", "Repeating the same job", "Making friends like a person"],
      ["People can...", "Think of new ideas", "Only follow steps"], ["Robots and people can work as a...", "Team", "Rainstorm"], ["Who builds robots?", "People", "Squirrels"],
      ["A robot does what it is...", "Programmed to do", "Wishing"]
    ]),
    les("Safe building", [
      ["Gear up", "🥽 🧤", "Wear goggles when a grown-up says. Wear gloves for rough jobs."],
      ["Clean space", "🧹", "Keep your work space tidy. Pick up pieces so no one trips."],
      ["Listen", "🧑‍🔧", "Follow the rules and ask a grown-up when you are unsure."]
    ], ["Think about what keeps hands, eyes and feet safe.", "Goggles, gloves, tidy space, ask for help.", "Example: you pick up tiny pieces so nobody steps on them. Now try yours."], [
      ["What protects your eyes?", "Goggles", "A scarf"], ["What do you do with tiny pieces on the floor?", "Pick them up", "Leave them"], ["Who do you ask if you are unsure?", "A grown-up", "Nobody"],
      ["Is running with a hammer safe?", "No", "Yes"], ["A tidy work space helps...", "Nobody trip", "Things to get lost"], ["Gloves protect your...", "Hands", "Teeth"],
      ["Should you put small parts in your mouth?", "No", "Yes"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 4, 6, 7, 9, 11, 13])),
    mix("Level 2 Challenge", at(b, [2, 3, 5, 8, 10, 12, 14, 15, 16, 17]))
  );

  // ================= LEVEL 3 =================
  const c = [
    les("Design challenges", [
      ["The goal", "🎯", "A design challenge has a <b>goal</b>: what your thing must do. For example, a bridge that holds 10 toy cars."],
      ["Limits", "📏", "It also has <b>limits</b>, like only 20 craft sticks, or it must fit on the table."],
      ["Check", "✅", "At the end, check: did my design reach the goal and follow the limits?"]
    ], ["Read the goal and the limits.", "A good design reaches the goal and follows the rules.", "Example: goal = tower 30 cm tall, limit = 20 blocks. Your tower must be tall and use no more blocks. Now try yours."], [
      ["The goal of a design is what your thing must...", "Do", "Eat"], ["A limit is a...", "Rule you must follow", "Kind of bird"], ["The limit is only 10 blocks. You use 15. What happened?", "You broke the limit", "You followed the limit"],
      ["The goal is a bridge that holds toy cars. A good design...", "Holds the toy cars", "Falls with one car"], ["At the end, you check if you reached your...", "Goal", "Lunch"], ["Which is a limit?", "Only 20 craft sticks", "A bridge that is strong"],
      ["Which is a goal?", "A tower that stands up on its own", "Only 5 blocks"]
    ]),
    les("Compare designs", [
      ["Test each one", "🧪", "Engineers build different designs and <b>test</b> them the same way, then compare."],
      ["Fair", "⚖️", "A fair test uses the same weight, same table and same steps for each design."],
      ["Pick the winner", "🏆", "The design that holds the most or works best is the winner. Then you can make it even better."]
    ], ["Look at which design did best in the test.", "Same test for every design.", "Example: bridge A holds 6 cars, bridge B holds 4. Bridge A is stronger. Now try yours."], [
      ["Bridge A holds 6 cars. Bridge B holds 4. Which is stronger?", "Bridge A", "Bridge B", "Same"], ["A fair test uses the ___ weight for each design.", "Same", "Different"], ["Tower A falls over. Tower B stays up. Which design worked better?", "Tower B", "Tower A"],
      ["After testing, which one do you pick?", "The one that works best", "The one that is prettiest only"], ["Which is a fair test?", "Same steps for each", "Different steps for each"], ["Engineers compare designs by...", "Testing", "Guessing only"],
      ["Boat A holds 10 coins. Boat B holds 15 coins. Which holds more?", "Boat B", "Boat A"]
    ]),
    les("Fix a broken design", [
      ["Find the cause", "🔍", "When a design fails, look for the <b>cause</b>. Why did it fall or break?"],
      ["Fix it", "🔧", "Narrow base tower falls? Make the base wider. Bridge sags? Add a support or triangle."],
      ["Test again", "🔁", "After the fix, test again to see if it worked."]
    ], ["Ask: why did it fail?", "Match the fix to the cause.", "Example: a shelf bends in the middle, so add a support under it. Now try yours."], [
      ["Your tower has a tiny base and falls. Fix:", "Make the base wider", "Make it taller"], ["Your bridge sags in the middle. Fix:", "Add a support under it", "Add more weight on top"], ["Your boat tips over. Fix:", "Make it wider and lower", "Make it taller and narrower"],
      ["Your square frame wobbles. Fix:", "Add a diagonal brace", "Remove a side"], ["Your paper plane dives. Fix:", "Adjust the wings and test again", "Throw harder only"], ["After the fix, you...", "Test again", "Stop forever"],
      ["Your ramp is too steep and the cart flies off. Fix:", "Make the ramp longer and gentler", "Make it steeper"]
    ]),
    les("Fair tests", [
      ["Change one thing", "1️⃣", "In a <b>fair test</b> you change only <b>one</b> thing and keep everything else the same."],
      ["Example", "🛝", "To see if a rougher ramp slows a car, change only the ramp surface. Use the same car, same ramp slope."],
      ["Write it down", "📝", "Record what happened so you can compare."]
    ], ["Only one thing should change.", "Keep everything else the same.", "Example: to test paper towel brands, use the same amount of water for each. Now try yours."], [
      ["In a fair test you change...", "Only one thing", "Everything"], ["You test two paper planes. What should be the same?", "The throw", "The paper airplane's color only"], ["To test which ramp surface is slowest, keep the car the...", "Same", "Different each time"],
      ["Why record what happened?", "To compare", "To lose it"], ["Testing a sponge: use the same amount of...", "Water", "Candy"], ["Which is NOT fair?", "Using a big ball on one ramp and a small ball on the other", "Using the same ball on both ramps"],
      ["A fair test helps you trust your...", "Results", "Shoes"]
    ]),
    les("Trusses", [
      ["Bridge frames", "🌉", "A <b>truss</b> is a frame made of triangles joined together. Many bridges and roofs use trusses."],
      ["Why triangles", "🔺", "Triangles don't change shape easily. Lots of them together can carry a big load."],
      ["Spread the push", "↔️", "The triangles pass the weight from piece to piece, so no single piece has too much."]
    ], ["Trusses are made of triangles.", "They share the weight among many pieces.", "Example: a roof truss is a triangle frame inside the roof. Now try yours."], [
      ["A truss is made of...", "Triangles", "Circles only"], ["Which can use a truss?", "A bridge", "A cloud"], ["Triangles in a truss are strong because they...", "Don't change shape easily", "Make noise"],
      ["A truss helps to...", "Share the weight", "Make it heavy"], ["Where might you find a truss?", "Under a roof", "In a puddle"], ["What shape is the main part of a truss?", "Triangle", "Heart"],
      ["More triangles joined together make it...", "Stronger", "Weaker"]
    ]),
    les("Load and strength", [
      ["Load", "🏋️", "The <b>load</b> is the weight a thing holds, like cars on a bridge."],
      ["Too much", "⚠️", "If the load is more than a thing can hold, it bends or breaks. Signs on bridges show the weight limit."],
      ["Spread out", "🛏️", "Spreading the load over a wider area helps. A bed spreads your weight better than a single pin."]
    ], ["Load means the weight on something.", "Too much weight can break it. Spreading it out helps.", "Example: a bookshelf holds 20 books, but 100 books bend it. Now try yours."], [
      ["The load is the ___ a thing holds.", "Weight", "Color"], ["Too much load can make a bridge...", "Bend or break", "Sing"], ["A weight limit sign tells you the most weight that is...", "Safe", "Pretty"],
      ["Which spreads weight better?", "A wide flat board", "A single thin pin"], ["A shelf holds a few books. You add a huge pile. It may...", "Bend or break", "Get stronger"], ["Snowshoes help you not sink because they...", "Spread your weight", "Make you heavier"],
      ["A heavy truck sees a sign: Weight Limit 3 tons. The truck weighs 5 tons. It should...", "Not cross", "Cross fast"]
    ]),
    les("Beams and columns", [
      ["Beam and column", "🏠", "A <b>column</b> stands up and holds weight from above. A <b>beam</b> lies across and holds weight over a gap."],
      ["Fold it", "📄", "A flat paper bridge sags. Fold the paper into a zigzag or a tube, and it holds much more!"],
      ["Thicker", "📚", "A thicker beam is stronger than a thin one."]
    ], ["Column = up. Beam = across.", "Folding or thickening makes beams stronger.", "Example: a folded card holds more than a flat card. Now try yours."], [
      ["A column stands...", "Up", "Across"], ["A beam lies...", "Across a gap", "Straight up only"], ["A flat paper bridge sags. Folding it makes it...", "Stronger", "Weaker"],
      ["A thicker beam is...", "Stronger", "Weaker"], ["A column holds weight from...", "Above", "Below only"], ["A tube-shaped paper is ___ than a flat sheet.", "Stronger", "Weaker"],
      ["The roof of a porch is held by...", "Columns", "Balloons"]
    ]),
    les("Which machine?", [
      ["Pick one", "🔧", "Pick the simple machine that fits the job: ramp, lever, wheel and axle, pulley, wedge or screw."],
      ["Wedge", "🪓", "A <b>wedge</b> is a thin tip that splits things, like an axe or a knife."],
      ["Screw", "🔩", "A <b>screw</b> holds things together. A jar lid is a screw too!"]
    ], ["Think about the job first.", "Up a slope = ramp. Lift/pry = lever. Roll = wheel. Lift with rope = pulley. Split = wedge. Hold = screw.", "Example: a doorstop is a wedge that stops a door. Now try yours."], [
      ["To split wood, use a...", "Wedge (axe)", "Pulley"], ["To lift a flag up a pole, use a...", "Pulley", "Wedge"], ["To pry open a paint lid, use a...", "Lever", "Wheel"],
      ["To move a barrel up to a truck, use a...", "Ramp", "Screw"], ["To hold two boards together, use a...", "Screw", "Pulley"], ["To roll a wagon, use a...", "Wheel and axle", "Wedge"],
      ["A knife cutting an apple is a...", "Wedge", "Pulley"]
    ]),
    les("Gears", [
      ["Gears", "⚙️", "A <b>gear</b> is a wheel with teeth. The teeth fit together with another gear."],
      ["Turn together", "🔄", "When one gear turns, the gear next to it turns too, in the <b>opposite</b> direction."],
      ["Where", "🚲 ⏰", "Bikes, clocks and toy cars use gears."]
    ], ["Gears have teeth that fit together.", "Touching gears turn opposite ways.", "Example: gear A turns right, gear B next to it turns left. Now try yours."], [
      ["A gear is a wheel with...", "Teeth", "Wings"], ["When one gear turns, the next gear...", "Turns too", "Stays still"], ["Two gears touching turn in ___ directions.", "Opposite", "The same"],
      ["Gear A turns right. The gear touching it turns...", "Left", "Right"], ["Where might you find gears?", "A bike", "A cloud"], ["Gears' teeth...", "Fit together", "Fall off"],
      ["A clock uses gears to...", "Move its hands", "Make it rain"]
    ]),
    les("Patterns in building", [
      ["Patterns", "🧱", "A <b>pattern</b> repeats. Bricks in a wall make a pattern. Tiles on a floor make a pattern."],
      ["Find the next", "🔴🔵🔴🔵", "Look at what repeats, then say what comes next."],
      ["Use patterns", "🏗️", "Engineers use patterns to build fast and make strong, even structures."]
    ], ["Find the part that repeats.", "Say it again in your head to see what comes next.", "Example: moon, star, moon, star, moon... the pattern repeats, so star comes next. Now try yours."], [
      ["🔴 🔵 🔴 🔵 🔴 ___§What comes next?", "Blue", "Red", "Green"], ["🟦 🟦 🟧 🟦 🟦 🟧 🟦 🟦 ___§What comes next?", "Orange", "Blue", "Red"], ["🔺 🟦 🔺 🟦 🔺 ___§What comes next?", "Square", "Triangle", "Circle"],
      ["🧱 🪟 🧱 🪟 🧱 ___§What comes next?", "Window", "Brick", "Door"], ["⚙️ 🔩 ⚙️ 🔩 ⚙️ ___§What comes next?", "Bolt", "Gear", "Hammer"], ["🔴 🔴 🔵 🔴 🔴 🔵 🔴 ___§What comes next?", "Red", "Blue", "Green"],
      ["🟩 🟨 🟩 🟨 🟩 ___§What comes next?", "Yellow", "Green", "Red"]
    ]),
    les("Counting parts", [
      ["Skip counting", "🔢", "When each thing has the same number of parts, <b>multiply</b> or skip count to find the total."],
      ["Example", "🚗🚗🚗", "3 cars, 4 wheels each: 4, 8, 12. There are 12 wheels."],
      ["Check", "✅", "Does the answer make sense? More things means more parts."]
    ], ["Find parts in one. Skip count for each one.", "Count by the number in one: 2s, 3s, 4s...", "Example: 4 bikes with 2 wheels each: 2, 4, 6, 8. Now do yours."], () => pick([wheelsQ(5), partsQ(4), blocksQ])()),
    les("Robot parts", [
      ["Four parts", "🤖", "Most robots have <b>sensors</b> (notice), a <b>controller</b> (the brain), <b>motors</b> (move) and a <b>power</b> source (battery)."],
      ["Sense, think, act", "👀 🧠 ⚙️", "A robot senses, thinks and acts. The sensor notices, the controller decides, the motor moves."],
      ["Example", "🧹", "A robot vacuum senses a wall, decides to turn, and its motors steer away."]
    ], ["Sensors notice. The controller decides. Motors move.", "Think: sense, think, act.", "Example: an automatic door senses you, decides to open, and its motor opens the door. Now try yours."], [
      ["Which part notices things?", "Sensor", "Motor", "Battery"], ["Which part decides what to do?", "Controller (brain)", "Wheel", "Battery"], ["Which part makes the robot move?", "Motor", "Sensor", "Camera"],
      ["Which part gives power?", "Battery", "Camera", "Controller"], ["The robot order is sense, think and...", "Act", "Sleep"], ["A robot vacuum senses a wall. Then its controller...", "Decides to turn", "Eats the wall"],
      ["A camera is a kind of...", "Sensor", "Motor", "Battery"]
    ]),
    les("Programs", [
      ["Program", "💻", "A <b>program</b> is a list of steps a robot follows. Programmers write programs."],
      ["Repeat", "🔁", "A <b>loop</b> repeats steps. \"Repeat 3 times: step forward\" moves 3 steps."],
      ["If-then", "❓", "<b>If</b> something happens, <b>then</b> do something. If the robot bumps a wall, then turn."]
    ], ["Programs are step-by-step lists.", "Loops repeat. If-then makes a choice.", "Example: repeat 2 times: clap. The robot claps 2 times. Now try yours."], [
      ["A program is a list of...", "Steps", "Colors"], ["Repeat 3 times: step forward. How many steps?", "3", "1", "6"], ["If the robot bumps a wall, then it should...", "Turn", "Walk through it"],
      ["A loop does what?", "Repeats steps", "Deletes steps"], ["Repeat 2 times: clap. How many claps?", "2", "1", "4"], ["Who writes programs?", "Programmers", "Rainclouds"],
      ["If it is dark, then turn on the light. It is dark. The robot...", "Turns the light on", "Does nothing"]
    ]),
    les("Find the bug", [
      ["Bugs", "🐞", "A mistake in a program is called a <b>bug</b>. Finding and fixing it is called <b>debugging</b>."],
      ["Check steps", "📋", "Read the steps one at a time. Does each step do what you want?"],
      ["Fix it", "🔧", "Fix the wrong step, then run the program again."]
    ], ["Read each step slowly.", "Find the step that does the wrong thing.", "Example: the robot should go forward 2, but the program says forward 3. Change 3 to 2. Now try yours."], [
      ["A mistake in a program is called a...", "Bug", "Cloud"], ["Fixing mistakes in a program is called...", "Debugging", "Dancing"], ["The robot should go forward 2 steps but goes forward 4. The bug is in the...", "Number of steps", "Color"],
      ["To find a bug, you...", "Check each step", "Ignore it"], ["After you fix a bug, you...", "Run the program again", "Stop forever"], ["The robot should turn left but turns right. The bug is the...", "Turn direction", "Battery color"],
      ["Debugging helps programs...", "Work properly", "Break more"]
    ]),
    les("Right robot for the job", [
      ["Different robots", "🤖", "Different robots do different jobs. Choose the right one for the job."],
      ["Examples", "🛰️ 🧹 🦾 🚁", "A rover explores. A vacuum robot cleans. A robot arm builds cars. A drone flies."],
      ["Safety jobs", "⛑️", "Some robots do dangerous jobs so people stay safe, like checking inside a pipe."]
    ], ["Think about the place and the job.", "Rover = explore. Vacuum = clean. Arm = lift or build. Drone = fly.", "Example: a robot that swims could check under a boat. Now try yours."], [
      ["Which robot explores Mars?", "A rover", "A vacuum robot"], ["Which robot cleans the floor?", "A vacuum robot", "A drone"], ["Which robot lifts and builds cars?", "A robot arm", "A rover"],
      ["Which robot can take pictures from the sky?", "A drone", "A vacuum robot"], ["A robot checks inside a dangerous pipe so people...", "Stay safe", "Get bored"], ["Which robot could swim to look under a boat?", "A water robot", "A vacuum robot"],
      ["Choosing the right robot means matching it to the...", "Job", "Weather only"]
    ]),
    les("People and robots together", [
      ["Teamwork", "🤝", "People use robots as helpers. People decide the goal and make sure robots are safe."],
      ["Take care", "🔧", "Robots need people to build, program, charge and fix them."],
      ["Kind use", "💗", "Engineers make robots to help people and keep them safe, not to hurt anyone."]
    ], ["Robots are tools made by people.", "People are in charge.", "Example: a doctor uses a robot arm to help in surgery, but the doctor decides. Now try yours."], [
      ["Who is in charge of a robot?", "People", "Nobody"], ["Robots need people to...", "Build and fix them", "Eat for them"], ["Engineers make robots to...", "Help people", "Scare people"],
      ["A robot's battery runs out. Who recharges it?", "A person", "The robot's shadow"], ["Robots and people working together are a...", "Team", "Storm"], ["Who decides the goal for a robot?", "People", "Rocks"],
      ["Robots should be used to keep people...", "Safe", "Worried"]
    ]),
    les("Safety rules for engineers", [
      ["Rules", "📜", "Real engineers follow safety rules: helmets at building sites, goggles for tools, and seat belts in cars."],
      ["Test safely", "🧪", "Test new designs in a safe place with grown-ups and the right gear."],
      ["Signs", "🪧", "Signs tell us the rules, like a weight limit or a danger sign. Always follow them."]
    ], ["Safety comes first.", "Gear, rules and signs keep everyone safe.", "Example: a builder wears a hard hat to protect their head. Now try yours."], [
      ["A hard hat protects your...", "Head", "Feet"], ["Goggles protect your...", "Eyes", "Knees"], ["A seat belt keeps you...", "Safe in a car", "Cold"],
      ["A danger sign means...", "Be careful", "Go play there"], ["Where should you test a new design?", "In a safe place with a grown-up", "In the street"], ["A weight limit sign tells you...", "The most weight that is safe", "The color of the bridge"],
      ["Safety rules are there to...", "Keep people safe", "Spoil the fun"]
    ]),
    les("Kinds of engineers", [
      ["Many kinds", "👷 ⚡ 💻", "There are many kinds of engineers. Each solves different problems."],
      ["Examples", "🌉 🔌 🤖", "<b>Civil</b> engineers build bridges and roads. <b>Electrical</b> engineers work with electricity. <b>Software</b> engineers write programs."],
      ["Also", "🚀 🧪", "Space engineers build rockets. Robot engineers build robots."]
    ], ["Match the engineer to the job.", "Civil = bridges and roads. Electrical = electricity. Software = programs.", "Example: someone who designs a new toy car might be a mechanical engineer. Now try yours."], [
      ["Who builds bridges and roads?", "Civil engineer", "Software engineer"], ["Who writes programs?", "Software engineer", "Civil engineer"], ["Who works with electricity?", "Electrical engineer", "Civil engineer"],
      ["Who builds robots?", "Robot engineer", "Cloud engineer"], ["Who builds rockets?", "Space engineer", "Pizza engineer"], ["Engineers solve...", "Problems", "Nothing"],
      ["Can there be many kinds of engineers?", "Yes", "No"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [1, 2, 3, 4, 5, 8, 9, 10])),
    mix("Level 3 Challenge", at(c, [0, 6, 7, 11, 12, 13, 14, 15, 16, 17]))
  );

  return { 1: a, 2: b, 3: c };
})();
