// ext/physics-4-6.js  Physics levels 4-6 (1st grade 2nd half, 2nd grade)
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
  // numeric lesson: gen() returns {text, answer, hints:[3]}
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
    les("Big and small pushes", [
      ["Strong or gentle", "💪", "A big push or pull is a <b>strong force</b>. A small one is a <b>gentle force</b>."],
      ["What changes", "⚽", "A strong kick sends a ball far. A gentle tap sends it only a little way."],
      ["Heavy things", "📦", "A heavy box needs a bigger push than a light box."]
    ], ["Think about how much push is needed.", "More push makes things move farther or faster.", "Example: a hard throw sends a ball farther than a soft toss. Now try yours."], [
      ["Which kick sends a ball farther?", "A strong kick", "A gentle tap"], ["A heavy box needs a ___ push than a light one.", "Bigger", "Smaller"],
      ["A gentle push on a swing makes it go...", "Only a little way", "Very high"], ["To make a toy car go farther, you...", "Push it harder", "Push it softer"],
      ["Which needs a bigger pull?", "A heavy wagon", "An empty toy wagon"], ["A small push makes a ball roll...", "A short way", "Far away"],
      ["A hard throw makes a ball go...", "Farther", "Less far"]
    ]),
    les("Rough and smooth", [
      ["Friction", "🧤", "When two things rub together, <b>friction</b> slows them down."],
      ["Rough or smooth", "🧊 🪨", "Rough ground has lots of friction. Smooth ice has very little, so things slide a long way."],
      ["Useful friction", "👟", "Shoes with bumpy soles grip the floor. Friction helps you walk without slipping."]
    ], ["Rough surfaces grip. Smooth surfaces let things slide.", "More friction means things stop sooner.", "Example: a toy car goes far on a smooth floor but stops fast on a rug. Now try yours."], [
      ["Where does a toy car roll farther?", "Smooth floor", "Thick rug"], ["Which surface has the most friction?", "Rough sandpaper", "Ice", "Glass"],
      ["Which surface has the least friction?", "Ice", "Gravel", "Grass"], ["Friction makes moving things...", "Slow down", "Speed up"],
      ["Why do shoes have bumpy bottoms?", "To grip the floor", "To make them heavy"], ["You slide farthest on...", "Smooth ice", "Sand"],
      ["Rubbing your hands together makes them feel...", "Warm", "Frozen"]
    ]),
    les("Magnets", [
      ["Magnets", "🧲", "A <b>magnet</b> pulls on some metals. It can pull without even touching!"],
      ["Magnetic things", "📎 🔩", "Magnets stick to things with iron or steel, like paper clips and nails."],
      ["Not magnetic", "🪵 🧸", "Wood, plastic, paper, glass and cloth are <b>not</b> magnetic."]
    ], ["Magnets like iron and steel.", "Wood, plastic and paper are not pulled by magnets.", "Example: a magnet picks up a nail but not a wooden block. Now try yours."], [
      ["A magnet will pick up a...", "Paper clip", "Wooden spoon", "Rubber band"], ["A magnet will NOT pick up a...", "Plastic cup", "Steel nail", "Iron key"],
      ["Which one sticks to a magnet?", "Steel screw", "Glass marble", "Paper"], ["Which one does a magnet NOT stick to?", "Cloth", "Iron nail", "Steel pin"],
      ["A magnet can pull things...", "Without touching them", "Only when it is wet"], ["Magnets are good at pulling things made of...", "Iron", "Wood", "Cotton"],
      ["Which can a fridge magnet stick to?", "A steel fridge door", "A wooden door"]
    ]),
    les("Poles", [
      ["Two ends", "🧲", "Every magnet has two ends called <b>poles</b>: a north pole and a south pole."],
      ["Opposites", "N ↔ S", "A north pole and a south pole pull together. They <b>attract</b>."],
      ["Same", "N ⇄ N", "Two north poles push apart. Two south poles push apart. They <b>repel</b>."]
    ], ["Opposite poles are different letters.", "Same poles push each other away.", "Example: two south poles repel. A north and a south attract. Now try yours."], [
      ["How many poles does a magnet have?", "Two", "One", "Five"], ["North and south poles...", "Attract", "Repel"], ["Two north poles...", "Repel", "Attract"],
      ["Two south poles...", "Repel", "Attract"], ["Opposite poles...", "Pull together", "Push apart"], ["Repel means to...", "Push apart", "Pull together"],
      ["Attract means to...", "Pull together", "Push apart"]
    ]),
    les("Gravity", [
      ["Gravity", "🌍", "<b>Gravity</b> is a force that pulls things toward the Earth."],
      ["Down", "🍎", "That is why a dropped apple falls down and why we stay on the ground."],
      ["Weight", "⚖️", "How hard gravity pulls on you is your <b>weight</b>."]
    ], ["Gravity pulls toward the middle of the Earth.", "Things you let go of go toward the ground.", "Example: a pencil you drop lands on the floor. Now try yours."], [
      ["Gravity pulls things...", "Down toward the Earth", "Up into the sky"], ["You jump up. What brings you back down?", "Gravity", "The wind", "Friction"],
      ["Rain falls down because of...", "Gravity", "Magnets"], ["What keeps us on the ground?", "Gravity", "Sunshine"], ["A ball thrown up comes back down because of...", "Gravity", "Sound"],
      ["Your weight tells how hard ___ pulls on you.", "Gravity", "The wind"], ["Which way does gravity pull?", "Toward the ground", "Toward the clouds"]
    ]),
    les("Float or sink", [
      ["Float", "🛟 🦆", "Some things <b>float</b> on top of water, like a rubber duck, a cork or a wooden stick."],
      ["Sink", "🪨 🔩", "Other things <b>sink</b> to the bottom, like a rock or a metal key."],
      ["Test it", "🧪", "The best way to know is to try it in a tub of water."]
    ], ["Think about what happens when you drop it in a pool.", "Rocks and metal keys sink. Wood, cork and foam float.", "Example: a feather floats but a coin sinks. Now try yours."], [
      ["Which one floats?", "A cork", "A rock", "A key"], ["Which one sinks?", "A rock", "A cork", "A leaf"], ["Which one floats?", "A wooden stick", "A marble", "A coin"],
      ["Which one sinks?", "A metal key", "A foam block", "A rubber duck"], ["Which one floats?", "A beach ball", "A steel nail", "A stone"], ["Which one sinks?", "A marble", "A balloon full of air", "A piece of wood"],
      ["How can you find out if something floats?", "Put it in water", "Look at its color"]
    ]),
    les("Solid, liquid, gas", [
      ["Solid", "🧊 🪨", "A <b>solid</b> keeps its own shape, like a rock, a toy or ice."],
      ["Liquid", "💧 🥛", "A <b>liquid</b> flows and takes the shape of its cup. Water and milk are liquids."],
      ["Gas", "🎈 💨", "A <b>gas</b> spreads out and fills the space it is in. Air is a mix of gases."]
    ], ["Does it keep its shape, flow, or spread everywhere?", "Solid = own shape. Liquid = flows. Gas = spreads out.", "Example: juice is a liquid because it pours. Now try yours."], [
      ["Which one is a solid?", "A rock", "Juice", "Air"], ["Which one is a liquid?", "Milk", "A brick", "Air"], ["Which one is a gas?", "Air in a balloon", "Water", "Ice"],
      ["A liquid takes the shape of its...", "Container", "Color"], ["Which one is a solid?", "Ice", "Rain", "Steam"], ["Which one flows and pours?", "A liquid", "A solid"],
      ["A gas fills up all the space in a...", "Balloon", "Pebble"]
    ]),
    les("Melting and freezing", [
      ["Melting", "🍦 ➡️ 💧", "When a solid gets warm enough, it <b>melts</b> into a liquid. Ice cream melts in the sun."],
      ["Freezing", "💧 ➡️ 🧊", "When a liquid gets cold enough, it <b>freezes</b> into a solid. Water becomes ice."],
      ["Heat and cold", "🌡️", "Heating makes things melt. Cooling makes things freeze."]
    ], ["Heat melts. Cold freezes.", "Melting goes solid to liquid. Freezing goes liquid to solid.", "Example: a candle melts near a flame. Now try yours."], [
      ["Ice in the sun will...", "Melt", "Freeze more"], ["Water in a freezer will...", "Freeze", "Melt"], ["Melting changes a solid into a...", "Liquid", "Gas"],
      ["Freezing changes a liquid into a...", "Solid", "Gas"], ["What makes ice cream melt?", "Heat", "Cold"], ["What turns water into ice?", "Cold", "Heat"],
      ["A puddle freezes on a very ___ night.", "Cold", "Hot"]
    ]),
    les("Light and shadows", [
      ["Light", "☀️ 🔦", "Light travels in straight lines. The Sun, a lamp and a flashlight give off light."],
      ["Shadow", "🧍‍♂️ ⬛", "A <b>shadow</b> forms when something blocks the light."],
      ["Opaque", "🧱", "Things that block light, like a wall or a book, are <b>opaque</b> and make dark shadows."]
    ], ["A shadow is where the light cannot get through.", "The thing must be in between the light and the wall.", "Example: your hand in front of a flashlight makes a shadow on the wall. Now try yours."], [
      ["A shadow is made when something...", "Blocks light", "Makes sound"], ["Which makes the darkest shadow?", "A wooden board", "Clear glass"], ["Light travels in...", "Straight lines", "Zigzags"],
      ["Which gives off light?", "The Sun", "The Moon's rocks", "A mirror"], ["You need ___ to make a shadow.", "Light", "Sound"], ["Which is a light source?", "A lamp", "A pillow"],
      ["At night with the lights off, shadows...", "Mostly disappear", "Get bigger"]
    ]),
    les("Mirrors", [
      ["Reflect", "🪞", "A mirror <b>reflects</b> light. That means light bounces off it."],
      ["Reflections", "🙂 ↔️ 🙂", "When you look in a mirror you see a picture of yourself. It is called a <b>reflection</b>."],
      ["Shiny things", "🥄 💧", "Shiny things like spoons, still water and metal also reflect light."]
    ], ["Reflect means bounce back.", "Shiny, smooth things reflect the best.", "Example: a still pond shows a picture of the trees. Now try yours."], [
      ["Light that bounces off something is...", "Reflected", "Eaten"], ["Which shows the best reflection?", "A mirror", "A wool sweater", "A brick"], ["A picture of you in a mirror is a...", "Reflection", "Shadow"],
      ["Which can show a reflection?", "Still water", "A cardboard box", "A dry sponge"], ["A shiny spoon...", "Reflects light", "Makes sound"], ["Mirrors are very...", "Smooth and shiny", "Rough and dull"],
      ["A dark, rough rock reflects ___ than a mirror.", "Less light", "More light"]
    ]),
    les("Sound and vibration", [
      ["Vibrate", "🎸", "Sound is made when something <b>vibrates</b>, which means it shakes back and forth very fast."],
      ["Feel it", "🗣️ 🤚", "Put your hand on your throat and hum. You can feel the vibration."],
      ["Travel", "👂", "Vibrations travel through the air to your ears. Then you hear the sound."]
    ], ["Sound starts with something shaking.", "No shaking means no sound.", "Example: a plucked guitar string shakes and makes a sound. Now try yours."], [
      ["Sound is made by something that...", "Vibrates", "Stands still"], ["A drum makes a sound when its skin...", "Shakes", "Freezes"], ["You hear a sound with your...", "Ears", "Elbows"],
      ["Hum with your hand on your throat. You feel a...", "Vibration", "Breeze"], ["A plucked string makes sound because it...", "Vibrates", "Melts"], ["What carries sound to your ears?", "Air", "Color"],
      ["If a guitar string stops shaking, the sound...", "Stops", "Gets louder"]
    ]),
    les("Loud, quiet, high, low", [
      ["Volume", "🔊 🔈", "<b>Volume</b> is how loud or quiet a sound is. A shout is loud. A whisper is quiet."],
      ["Pitch", "🐭 🐘", "<b>Pitch</b> is how high or low a sound is. A mouse squeaks high. A big drum booms low."],
      ["Strong shakes", "🥁", "Hit a drum harder and it gets louder. Small things often make higher sounds."]
    ], ["Loud and quiet are about volume. High and low are about pitch.", "Big things often sound low. Small things often sound high.", "Example: a whisper is quiet but a shout is loud. Now try yours."], [
      ["A whisper is...", "Quiet", "Loud"], ["A shout is...", "Loud", "Quiet"], ["A tiny bird chirp has a ___ pitch.", "High", "Low"],
      ["A big bass drum has a ___ pitch.", "Low", "High"], ["Hitting a drum harder makes it...", "Louder", "Quieter"], ["How high or low a sound is, is called...", "Pitch", "Volume"],
      ["How loud or quiet a sound is, is called...", "Volume", "Pitch"]
    ]),
    les("Ramps", [
      ["Simple machines", "🛠️", "A <b>simple machine</b> makes work easier. A ramp is one."],
      ["Ramp", "📦 ⛰️", "A ramp (an <b>inclined plane</b>) is a slope. It is easier to push a box up a ramp than to lift it straight up."],
      ["Longer is easier", "↗️", "A longer, gentler ramp needs less push, but you go a longer way."]
    ], ["A ramp is a slope.", "A ramp spreads the work over a longer path.", "Example: a wheelchair ramp lets people roll up to a door. Now try yours."], [
      ["A ramp is also called an inclined...", "Plane", "Circle"], ["A ramp makes it easier to...", "Move things up", "Make sound"], ["Which is easier for a heavy box?", "Pushing it up a ramp", "Lifting it straight up"],
      ["Which one is a ramp?", "A slide", "A ball"], ["A longer, gentler ramp needs a ___ push.", "Smaller", "Bigger"], ["Which uses a ramp?", "Rolling a barrel up a slope", "Stirring soup"],
      ["A simple machine helps make work...", "Easier", "Louder"]
    ]),
    les("Levers", [
      ["Lever", "🪵 ⚖️", "A <b>lever</b> is a stick that tilts on a point called the <b>fulcrum</b>."],
      ["Seesaw", "🛝", "A seesaw is a lever. A crowbar and a pair of scissors use levers too."],
      ["Push down, lift up", "⬇️ ⬆️", "Push one end of a lever down and the other end goes up."]
    ], ["A lever tilts on a middle point.", "The middle point is called the fulcrum.", "Example: a seesaw tilts on its center. Now try yours."], [
      ["A seesaw is a kind of...", "Lever", "Ramp"], ["The point a lever tilts on is the...", "Fulcrum", "Handle"], ["Push one end of a lever down and the other end goes...", "Up", "Down too"],
      ["Which one is a lever?", "A seesaw", "A ball", "A rope"], ["A crowbar is used as a...", "Lever", "Light"], ["Which uses a lever?", "Scissors", "A paper plane"],
      ["A lever works by tilting on a...", "Fulcrum", "Mirror"]
    ]),
    les("Wheels and axles", [
      ["Wheel and axle", "🛞", "A <b>wheel and axle</b> is a wheel that turns on a rod called an <b>axle</b>."],
      ["Rolling is easy", "🚲 🚗", "Wheels roll instead of sliding. There is less friction, so heavy things move easier."],
      ["Where", "🚪 🎡", "Bikes, cars, wagons, doorknobs and steering wheels all use a wheel and axle."]
    ], ["Wheels turn on a rod in the middle.", "Wheels roll, which has less friction than sliding.", "Example: a wagon wheel turns on an axle. Now try yours."], [
      ["The rod in the middle of a wheel is the...", "Axle", "Fulcrum"], ["Wheels make it easier to...", "Move things", "Hide things"], ["Which uses a wheel and axle?", "A bike", "A ramp", "A seesaw"],
      ["Rolling has ___ friction than sliding.", "Less", "More"], ["A doorknob is a...", "Wheel and axle", "Lever only"], ["A wheelbarrow carries a heavy load on a...", "Wheel", "Shadow"],
      ["Which has wheels and axles?", "A wagon", "A rock"]
    ]),
    les("Hot and cold", [
      ["Temperature", "🌡️", "<b>Temperature</b> tells how hot or cold something is. A thermometer measures it."],
      ["Hot things", "☀️ 🔥", "The Sun, a stove and a campfire are hot. Ice and snow are cold."],
      ["Safe", "🧤", "Never touch hot things. Use oven mitts, and ask a grown-up for help."]
    ], ["A thermometer reads temperature.", "Higher numbers mean hotter.", "Example: ice is colder than a cup of tea. Now try yours."], [
      ["A thermometer measures...", "Temperature", "Weight"], ["Which is the coldest?", "Ice", "Soup", "A campfire"], ["Which is the hottest?", "A campfire", "Snow", "A cold drink"],
      ["When the temperature number gets bigger, it is getting...", "Warmer", "Colder"], ["A hot stove should be touched by...", "Nobody, it is not safe", "Little kids"], ["Which is warmer?", "A summer day", "A snowy day"],
      ["A cold drink in the sun gets...", "Warmer", "Colder"]
    ]),
    les("Electricity and metal", [
      ["Conductors", "🔌 🪙", "A material that lets electricity flow is a <b>conductor</b>. Metals like copper are good conductors."],
      ["Insulators", "🧤 🧴", "Rubber, plastic, wood and glass block electricity. They are <b>insulators</b>."],
      ["Wires", "🔋", "Wires are metal inside and plastic outside. The metal carries electricity and the plastic keeps us safe."]
    ], ["Metals let electricity flow.", "Rubber and plastic stop it.", "Example: the copper in a wire carries electricity, but the plastic does not. Now try yours."], [
      ["Which lets electricity flow?", "Copper wire", "Rubber band", "Wooden stick"], ["Which blocks electricity?", "Plastic", "Metal key", "Iron nail"], ["The metal inside a wire is a...", "Conductor", "Insulator"],
      ["The plastic outside a wire is an...", "Insulator", "Conductor"], ["Why is a wire covered in plastic?", "To keep us safe", "To make it sing"], ["Which is a good conductor?", "A metal spoon", "A glass cup"],
      ["Which is an insulator?", "Rubber", "Copper"]
    ]),
    les("Day and night", [
      ["Spinning Earth", "🌍 🔄", "The Earth <b>spins</b> like a top. It takes 24 hours, or one day, to turn all the way around."],
      ["Day", "☀️", "The side of Earth facing the Sun has daytime."],
      ["Night", "🌙", "The side facing away from the Sun has night. The Sun does not move across the sky; we turn."]
    ], ["The Earth turns around once each day.", "Facing the Sun means day.", "Example: when it is day where you live, it is night on the far side of Earth. Now try yours."], [
      ["Earth spins around once in about...", "24 hours", "1 hour", "1 year"], ["The side of Earth facing the Sun has...", "Day", "Night"], ["The side of Earth facing away from the Sun has...", "Night", "Day"],
      ["Day and night happen because the Earth...", "Spins", "Melts"], ["How long is one day?", "24 hours", "7 hours"], ["At noon the Sun is...", "High in the sky", "Below the ground"],
      ["The Sun is a...", "Star", "Planet", "Moon"]
    ])
  ];
  d.push(
    mix("Mixed practice", at(d, [0, 1, 2, 3, 4, 5, 6, 7])),
    mix("Level 4 Challenge", at(d, [1, 3, 5, 6, 8, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 5 =================
  const e = [
    les("Forces change motion", [
      ["Force", "➡️", "A <b>force</b> is a push or a pull. Forces can start something moving, stop it, or change its direction."],
      ["Start, stop, turn", "⚽ 🧤 🏏", "A kick starts a ball. A goalie's catch stops it. A bat turns it around."],
      ["No force", "🧊", "A thing at rest stays still until a force acts on it."]
    ], ["Think: is the force starting, stopping or turning the thing?", "Starting means from still to moving. Stopping is the opposite.", "Example: a bat hitting a ball changes its direction. Now try yours."], [
      ["A goalie catches a ball. The force...", "Stops it", "Starts it"], ["A kick on a ball sitting still...", "Starts it moving", "Stops it"], ["A bat hits a ball back the way it came. The force...", "Changes its direction", "Makes it stand still"],
      ["Force means a push or a...", "Pull", "Color"], ["A ball on the grass stays still until...", "A force acts on it", "You look at it"], ["Braking a bike with your hands...", "Stops it", "Starts it"],
      ["A pull on a wagon makes it...", "Start moving", "Disappear"]
    ]),
    les("Fast, slow and speed", [
      ["Speed", "🏎️ 🐢", "<b>Speed</b> tells how fast something moves, or how far it goes in a set time."],
      ["Compare", "🏁", "If two things travel for the same time, the one that goes farther is faster."],
      ["Units", "🚗 💨", "We can measure speed in kilometers per hour (km/h) or meters per second."]
    ], ["Same time? Look at who went farther.", "Farther in the same time means faster.", "Example: a cheetah runs farther than a turtle in one minute, so it is faster. Now try yours."], [
      ["Two runners run for 1 minute. Ann goes 100 m and Ben goes 80 m. Who is faster?", "Ann", "Ben", "They tie"],
      ["A car goes 50 km in an hour. A bike goes 15 km in an hour. Which is faster?", "The car", "The bike"], ["Speed tells how ___ something moves.", "Fast", "Heavy"],
      ["A snail and a rabbit race for 1 minute. The rabbit goes farther, so the rabbit is...", "Faster", "Slower"], ["Which unit can measure speed?", "km/h", "kg", "cm"],
      ["Two toy cars roll for 5 seconds. Car A goes 2 m and Car B goes 3 m. Which is faster?", "Car B", "Car A"], ["Going farther in the same time means...", "Faster speed", "Slower speed"]
    ]),
    num("Distance and time", [
      ["Same speed", "🚲", "If you go the same speed, you travel the same distance each hour."],
      ["Multiply", "✖️", "A bike that goes 10 km each hour goes 10 + 10 = 20 km in 2 hours."],
      ["Count the hours", "⏱️", "Distance = how far in one hour times the number of hours."]
    ], () => {
      const s = pick([2, 3, 4, 5, 10]), t = ri(2, 6), w = pick([2, 3, 4, 5, 10].filter(x => x !== s)), u = ri(2, 5);
      return pick([
        { text: `A bike goes ${s} km every hour. How many km does it go in ${t} hours?`, visual: "🚲", answer: s * t,
          hints: ["Add the same distance for each hour.", "Multiply the distance in one hour by the number of hours.", `Example: ${w} km an hour for ${u} hours is ${w} x ${u} = ${w * u} km. Now do yours.`] },
        { text: `A snail crawls ${s} meters every minute. How many meters in ${t} minutes?`, visual: "🐌", answer: s * t,
          hints: ["Count up the same distance for each minute.", "Multiply meters per minute by the number of minutes.", `Example: ${w} m per minute for ${u} minutes is ${w} x ${u} = ${w * u} m. Now do yours.`] }
      ]);
    }),
    les("Measuring", [
      ["Units", "📏", "We measure <b>length</b> in centimeters (cm) and meters (m)."],
      ["More units", "⚖️ 🥛 🌡️", "We measure <b>mass</b> in grams (g) and kilograms (kg), liquid <b>volume</b> in milliliters (mL) and liters (L), and <b>temperature</b> in degrees Celsius (°C)."],
      ["Choose well", "✅", "Use a small unit for small things and a big unit for big things."]
    ], ["Match the thing being measured to its unit.", "Ruler = length. Scale = mass. Measuring cup = volume. Thermometer = temperature.", "Example: a cup of juice is measured in milliliters. Now try yours."], [
      ["Which tool measures length?", "A ruler", "A thermometer", "A scale"], ["Which tool measures temperature?", "A thermometer", "A ruler", "A measuring cup"],
      ["Which unit is for mass?", "Kilogram", "Meter", "Liter"], ["Which unit is for liquid volume?", "Liter", "Gram", "Centimeter"], ["Which is the best unit for the length of a pencil?", "Centimeters", "Kilometers", "Liters"],
      ["Which tool measures mass?", "A scale", "A ruler", "A clock"], ["Which is the best unit for a big lake's water?", "Liters (lots of them)", "Centimeters", "Grams"], ["Temperature is measured in degrees...", "Celsius", "Meters"]
    ]),
    les("Heavy for its size", [
      ["Mass", "⚖️", "<b>Mass</b> tells how much stuff is in an object. Heavier things have more mass."],
      ["Sink or float", "🪨 🪵", "A rock sinks. A piece of wood the same size floats. The rock is heavier for its size."],
      ["Shape matters", "🚢", "A metal ship floats because it is wide and has a lot of air inside."]
    ], ["Think: is it heavy for its size?", "Things that are heavy for their size tend to sink.", "Example: a toy boat of clay can float if shaped like a bowl. Now try yours."], [
      ["Which is more likely to sink?", "A small stone", "A big sponge"], ["A big ship made of steel can float because it is...", "Wide with lots of air inside", "Very tiny"],
      ["Mass tells how much ___ is in an object.", "Stuff", "Color"], ["A lump of clay sinks. Shaped like a boat it can...", "Float", "Disappear"], ["Which has more mass?", "A bowling ball", "A balloon"],
      ["Which is likely to float?", "A foam block", "A steel ball"], ["A small marble sinks because it is...", "Heavy for its size", "Light for its size"]
    ]),
    les("Properties of materials", [
      ["Properties", "🔎", "<b>Properties</b> describe how something looks and feels. Examples: hard, soft, bendy, shiny, rough."],
      ["Good choices", "🪟 🧸", "We pick materials by their properties. Windows are clear glass. Teddy bears are soft."],
      ["Waterproof", "☂️", "Rain jackets are <b>waterproof</b>. Water cannot go through them."]
    ], ["What property does the job need?", "Think about whether it should be hard, soft, clear or waterproof.", "Example: a spoon for hot soup needs a material that does not melt. Now try yours."], [
      ["A window is made of glass because glass is...", "See-through", "Soft"], ["Which material is best for a rain jacket?", "Waterproof plastic", "Paper", "Thin cloth"], ["A pillow should be...", "Soft", "Hard"],
      ["Which is bendy?", "A rubber band", "A brick", "A rock"], ["Which is hard?", "A rock", "A cotton ball", "A sponge"], ["A rope should be...", "Strong and bendy", "Glass and stiff"],
      ["Which is the best for a cooking pot?", "Metal", "Paper", "Ice"]
    ]),
    les("Evaporation and condensation", [
      ["Evaporation", "☀️ 💧 ➡️ 💨", "When water gets warm it can turn into an invisible gas called water vapor. That is <b>evaporation</b>."],
      ["Condensation", "🥤 💦", "When water vapor touches something cold it turns back into tiny drops of liquid. That is <b>condensation</b>."],
      ["Puddles", "🌦️", "A puddle dries up on a sunny day because the water evaporates."]
    ], ["Evaporation = liquid to gas. Condensation = gas to liquid.", "Warm makes evaporation. Cold makes condensation.", "Example: wet clothes dry on a line because the water evaporates. Now try yours."], [
      ["A puddle dries up in the sun. This is...", "Evaporation", "Condensation"], ["Drops form on the outside of a cold glass. This is...", "Condensation", "Evaporation"], ["Evaporation turns a liquid into a...", "Gas", "Solid"],
      ["Condensation turns a gas into a...", "Liquid", "Solid"], ["Wet laundry dries because water...", "Evaporates", "Freezes"], ["A bathroom mirror gets foggy after a hot shower. This is...", "Condensation", "Evaporation"],
      ["Water vapor is water as a...", "Gas", "Rock"]
    ]),
    les("Water cycle", [
      ["Around and around", "🔄 🌧️", "Water goes around and around. This is the <b>water cycle</b>."],
      ["Up", "☀️ ⬆️ ☁️", "The Sun warms oceans and lakes. Water evaporates and rises. High up it cools and makes clouds."],
      ["Down", "🌧️ ⛰️ 🌊", "Rain or snow falls (<b>precipitation</b>). Water flows back to rivers and the ocean."]
    ], ["Follow the water: up, clouds, down.", "The Sun gives the energy to lift water up.", "Example: rain falls on a hill and runs into a river. Now try yours."], [
      ["What gives the energy for the water cycle?", "The Sun", "The Moon", "Wind chimes"], ["Clouds are made when water vapor...", "Cools and condenses", "Heats up and burns"], ["Rain, snow and hail are called...", "Precipitation", "Evaporation"],
      ["Rivers carry water back to the...", "Ocean", "Moon"], ["Water rising from the ocean in the sun is...", "Evaporating", "Freezing"], ["Which comes first in the water cycle story: water on the ground heats up and...", "Evaporates", "Is precipitation"],
      ["Does water in the water cycle get used up?", "No, it goes around again", "Yes, it vanishes"]
    ]),
    num("Freezing and boiling", [
      ["Freezing point", "🧊", "Water freezes into ice at <b>0°C</b>."],
      ["Boiling point", "♨️", "Water boils into steam at <b>100°C</b>. Never touch boiling water."],
      ["Room and body", "🏠 🧍", "A room is about 20°C. Your body is about 37°C."]
    ], () => {
      const a = ri(2, 9) * 10, b = ri(2, 8) * 5, w = ri(2, 9) * 5, v = ri(2, 6);
      return pick([
        { text: `Water is ${a}°C. It warms up by ${b} degrees. What is the new temperature in °C?`, visual: "🌡️", answer: a + b,
          hints: ["Warming means the number goes up. Add.", "Add the degrees it warmed to the starting temperature.", `Example: 30°C warming by ${w} degrees is ${30 + w}°C. Now do yours.`] },
        { text: `A drink is ${a + 20}°C. It cools down by ${b} degrees. What is the new temperature in °C?`, visual: "🥤", answer: a + 20 - b,
          hints: ["Cooling means the number goes down. Subtract.", "Take the degrees it cooled away from the starting temperature.", `Example: 60°C cooling by ${w} degrees is ${60 - w}°C. Now do yours.`] },
        { text: `How many degrees C must water at ${100 - a}°C warm up to start boiling at 100°C?`, visual: "♨️", answer: a,
          hints: ["Water boils at 100°C. Find the gap.", "Subtract the starting temperature from 100.", `Example: from ${100 - v * 10}°C to 100°C is ${v * 10} degrees. Now do yours.`] }
      ]);
    }),
    les("Light sources", [
      ["Make light", "☀️ 🔥 💡", "Things that make their own light are <b>light sources</b>: the Sun, fire, light bulbs and fireflies."],
      ["Not sources", "🌙 🪞", "The Moon does not make light. It looks bright because it reflects sunlight. Mirrors reflect light too."],
      ["Seeing", "👀", "We see things when light bounces off them into our eyes."]
    ], ["Does it make light, or just bounce it?", "Sun, fire and bulbs make light. The Moon bounces it.", "Example: a candle flame makes light, but a book only reflects it. Now try yours."], [
      ["Which makes its own light?", "The Sun", "The Moon", "A mirror"], ["The Moon shines because it...", "Reflects sunlight", "Makes its own light"], ["Which is a light source?", "A flashlight", "A wooden chair", "A pillow"],
      ["We see a book when light...", "Bounces off it into our eyes", "Goes into the book only"], ["Which is NOT a light source?", "A mirror", "A campfire", "A light bulb"], ["Fireflies make their own...", "Light", "Shadows"],
      ["In a pitch dark room you can see...", "Nothing, until there is light", "Everything clearly"]
    ]),
    les("See-through or not", [
      ["Transparent", "🪟", "<b>Transparent</b> things let light go straight through. You can see clearly through clear glass and water."],
      ["Translucent", "🧊 🪟", "<b>Translucent</b> things let some light through, but you cannot see clearly. Wax paper and frosted glass are translucent."],
      ["Opaque", "🧱", "<b>Opaque</b> things let no light through. Wood, metal and bricks are opaque."]
    ], ["Can you see clearly through it, a little, or not at all?", "Clear = transparent. Blurry = translucent. Blocks all = opaque.", "Example: a wooden door is opaque. Now try yours."], [
      ["Clear glass is...", "Transparent", "Opaque", "Translucent"], ["A brick wall is...", "Opaque", "Transparent"], ["Frosted bathroom glass is...", "Translucent", "Transparent", "Opaque"],
      ["Which lets you see clearly through it?", "A clear window", "A wooden door"], ["Wax paper lets some light through, so it is...", "Translucent", "Opaque"], ["Opaque things ___ light.", "Block", "Make"],
      ["Which is transparent?", "Clean water", "A metal pot", "A cardboard box"]
    ]),
    les("Shadows change", [
      ["Moving shadows", "🌅 ☀️ 🌇", "A shadow changes when the light moves. In the morning and evening the Sun is low and shadows are <b>long</b>."],
      ["Noon", "🕛", "At noon the Sun is highest, so shadows are <b>short</b>."],
      ["Direction", "↔️", "A shadow falls on the side away from the light."]
    ], ["Low Sun means a long shadow.", "High Sun means a short shadow.", "Example: late in the afternoon your shadow is long. Now try yours."], [
      ["When is your shadow shortest?", "Noon", "Sunrise", "Sunset"], ["When the Sun is low in the sky, shadows are...", "Long", "Short"], ["The Sun is on your left. Your shadow falls to your...", "Right", "Left"],
      ["A shadow grows longer as the Sun...", "Gets lower", "Gets higher"], ["Moving a flashlight closer to a toy makes its shadow...", "Bigger", "Smaller"], ["Shadows are longest in the...", "Early morning and evening", "Middle of the day"],
      ["A shadow falls on the side ___ the light.", "Away from", "Toward"]
    ]),
    les("Colors of light", [
      ["Rainbow", "🌈", "Sunlight looks white but it is made of many colors: red, orange, yellow, green, blue, indigo and violet."],
      ["Make a rainbow", "☔ ☀️", "When sunlight shines through raindrops, the colors spread out and we see a rainbow."],
      ["Colored things", "🍎 🍌", "A red apple reflects red light and soaks up the other colors."]
    ], ["Rainbows come from sunlight and water drops.", "The order is red, orange, yellow, green, blue, indigo, violet.", "Example: sunlight through a prism makes colors. Now try yours."], [
      ["Which two things make a rainbow?", "Sunlight and raindrops", "Wind and snow"], ["What color is at the top (outside) of a rainbow?", "Red", "Violet"], ["White sunlight is a mix of...", "Many colors", "Only gray"],
      ["Which color comes just after red in a rainbow?", "Orange", "Blue"], ["A red apple looks red because it reflects ___ light.", "Red", "Green"], ["A rainbow often shows up when it is...", "Sunny and rainy", "Dark and dry"],
      ["Which color comes just before blue in a rainbow?", "Green", "Orange"]
    ]),
    les("How sound travels", [
      ["Through air", "📢 ➡️ 👂", "Sound travels as vibrations through air, water and solids."],
      ["No air, no sound", "🚀 🌌", "In space there is almost no air, so sound cannot travel. It is silent."],
      ["Faster in solids", "🚪 🔊", "Sound travels faster through solids like wood and metal than through air."]
    ], ["Sound needs something to travel through.", "Space has no air.", "Example: you can hear knocking on a wooden door from the other side. Now try yours."], [
      ["Sound needs ___ to travel.", "Matter, like air", "Empty space"], ["Can sound travel in outer space?", "No", "Yes"], ["Sound can travel through...", "Air, water and solids", "Only air"],
      ["Sound travels fastest through...", "A solid", "Air", "A gas"], ["Whales hear each other through...", "Water", "Space"], ["You can hear a knock through a door because sound travels through...", "Wood", "Nothing"],
      ["With your ear on a table, a tap on the table sounds...", "Clear, since sound goes through wood", "Silent"]
    ]),
    les("Echoes", [
      ["Echo", "⛰️ 🗣️", "An <b>echo</b> is a sound that bounces off a hard surface and comes back to you."],
      ["Where", "🏔️ 🏛️", "You hear echoes in canyons, caves and large empty rooms."],
      ["Soft things", "🛋️ 🧸", "Soft things like carpets and curtains soak up sound, so there is less echo."]
    ], ["An echo is a bounce.", "Hard walls bounce sound. Soft things soak it up.", "Example: shouting in a big empty hall gives an echo. Now try yours."], [
      ["An echo is sound that...", "Bounces back", "Gets stuck"], ["Where might you hear an echo?", "In a canyon", "In a pillow fort"], ["Which surface makes the best echo?", "A hard wall", "A soft blanket"],
      ["Curtains and carpets make a room ___ echoey.", "Less", "More"], ["An empty gym has more echo than a room with many...", "Soft sofas", "Stone walls"], ["Bats find their way using...", "Echoes", "Colors"],
      ["To hear an echo you shout toward a...", "Far hard wall", "Pillow"]
    ]),
    les("Energy changes", [
      ["Forms", "⚡ 🔥 💡", "Energy comes in forms: light, heat, sound, motion and electricity."],
      ["Changing", "🔄", "Energy can change form. A toaster changes electricity into heat. A bulb changes it into light."],
      ["Kept", "🔒", "Energy is never used up; it just changes into other forms."]
    ], ["Ask: what energy goes in, and what comes out?", "Energy changes but never disappears.", "Example: a radio changes electricity into sound. Now try yours."], [
      ["A light bulb changes electricity into...", "Light (and some heat)", "Water"], ["A toaster changes electricity into...", "Heat", "Snow"], ["A radio changes electricity into...", "Sound", "Food"],
      ["Rubbing hands together changes motion into...", "Heat", "Cold"], ["A solar panel changes sunlight into...", "Electricity", "Wind"], ["Energy can be...", "Changed into other forms", "Used up and gone"],
      ["Your body changes food energy into...", "Motion and heat", "Rocks"]
    ]),
    les("Energy sources", [
      ["Renewable", "☀️ 🌬️ 💧", "<b>Renewable</b> energy does not run out: sunlight, wind and moving water."],
      ["Fossil fuels", "🛢️ ⛏️", "Coal, oil and natural gas are <b>fossil fuels</b>. They took millions of years to form and can run out."],
      ["Choices", "🌱", "Using the Sun and wind is cleaner for the air."]
    ], ["Renewable means it comes back or never runs out.", "Coal, oil and gas can run out.", "Example: wind turbines use wind, which keeps blowing. Now try yours."], [
      ["Which one is renewable?", "Wind", "Coal", "Oil"], ["Which one is a fossil fuel?", "Coal", "Sunlight", "Wind"], ["Solar panels use...", "Sunlight", "Coal"],
      ["A wind turbine uses...", "Wind", "Oil"], ["Water behind a dam can make...", "Electricity", "Snow"], ["Which can run out?", "Oil", "Sunlight"],
      ["Which is a clean, renewable source?", "The Sun", "Natural gas"]
    ]),
    les("Circuits", [
      ["Parts", "🔋 💡 🧵", "A simple circuit has a battery, wires and a bulb in a loop."],
      ["Closed", "🔄", "A <b>closed</b> circuit is a complete loop, so electricity flows and the bulb lights."],
      ["Open", "✂️", "An <b>open</b> circuit has a gap, so the bulb is off. A switch opens and closes the loop."]
    ], ["Electricity needs a complete loop.", "A gap means off. No gap means on.", "Example: if a wire is unplugged, the bulb goes off. Now try yours."], [
      ["A bulb lights in a ___ circuit.", "Closed", "Open"], ["A circuit with a gap is...", "Open", "Closed"], ["A switch turns a bulb off by making the circuit...", "Open", "Closed"],
      ["A simple circuit needs a battery, a bulb and...", "Wires", "Water"], ["The bulb is on. The circuit is...", "Complete", "Broken"], ["A wire falls out of a circuit. The bulb...", "Goes off", "Gets brighter"],
      ["The battery in a circuit gives...", "Energy", "Wind"]
    ])
  ];
  e.push(
    mix("Mixed practice", at(e, [0, 1, 3, 5, 7, 8, 10, 12])),
    mix("Level 5 Challenge", at(e, [1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 6 =================
  const f = [
    les("Forces in balance", [
      ["Balanced", "⚖️", "When forces push equally from both sides, they are <b>balanced</b> and the thing does not move."],
      ["Unbalanced", "💪 ➡️", "When one force is bigger, the forces are <b>unbalanced</b> and the thing moves toward the bigger force."],
      ["Tug of war", "🪢", "A tug-of-war with two equal teams: nobody moves. If one team is stronger, the rope moves their way."]
    ], ["Compare the two sides.", "Equal sides = no change. Bigger side wins.", "Example: 3 kids pull against 3 equally strong kids and the rope stays. Now try yours."], [
      ["Two equal teams pull a rope. What happens?", "It does not move", "It moves fast"], ["One team pulls harder. The rope moves...", "Toward the stronger team", "Toward the weaker team"],
      ["Balanced forces mean the object...", "Stays put", "Moves away"], ["Unbalanced forces make an object...", "Start to move or change", "Never change"], ["A book sits on a table. The table pushes up and gravity pulls down. The forces are...", "Balanced", "Unbalanced"],
      ["You push a box 5 units right and a friend pushes it 8 units left. It moves...", "Left", "Right", "Not at all"], ["Tug-of-war with a tie means forces are...", "Equal", "Unequal"]
    ]),
    les("Newtons and force", [
      ["Newton", "🍎", "We measure forces in <b>newtons</b> (N). A small apple weighs about 1 newton."],
      ["Bigger", "⚖️", "A bigger force has more newtons. Lifting a heavy bag needs a bigger force than lifting a pencil."],
      ["Spring scale", "🪝", "A <b>spring scale</b> measures force. The more it is pulled, the more the spring stretches."]
    ], ["Newtons measure how big a force is.", "A bigger number means a bigger force.", "Example: 10 N is a bigger force than 2 N. Now try yours."], [
      ["Forces are measured in...", "Newtons", "Liters", "Degrees"], ["Which force is bigger?", "20 N", "5 N"], ["A spring scale measures...", "Force", "Time"],
      ["The more a spring is pulled, the more it...", "Stretches", "Shrinks"], ["A tiny push is about...", "1 N", "1000 N"], ["Which is bigger?", "50 N", "15 N", "9 N"],
      ["The short way to write newton is...", "N", "L"]
    ]),
    les("Friction in life", [
      ["Helpful", "🚗 🛞", "Friction helps tires grip the road and brakes stop a bike."],
      ["Not helpful", "⚙️ 🛢️", "Friction wears parts and makes heat. Oil on machine parts lowers friction."],
      ["Change it", "🛷 🧤", "Waxing skis lowers friction. Sand on icy roads raises friction."]
    ], ["Rough means more friction. Slippery means less.", "Oil, wax and water can lower friction.", "Example: sprinkling sand on ice helps cars grip. Now try yours."], [
      ["Oil in a bike chain makes friction...", "Smaller", "Bigger"], ["Sand on an icy road makes friction...", "Bigger", "Smaller"], ["Brake pads work by using...", "Friction", "Sound"],
      ["Rubbing hands together gets warm because of...", "Friction", "Gravity"], ["Waxed skis have ___ friction.", "Less", "More"], ["Which would you want less friction?", "A slide", "Hiking boots"],
      ["Which needs lots of friction?", "Tires on wet roads", "A sled runner on snow"]
    ]),
    les("Gravity on other worlds", [
      ["Gravity everywhere", "🌍 🌙", "Every planet and moon has gravity. Bigger worlds pull harder."],
      ["The Moon", "👨‍🚀 🌙", "The Moon is smaller than Earth, so its gravity is about <b>one sixth</b> as strong. Astronauts bounce high there!"],
      ["Weight changes, mass stays", "⚖️", "Your weight is less on the Moon, but you still have the same amount of stuff in you (same mass)."]
    ], ["Smaller world means weaker gravity.", "The Moon is smaller than Earth.", "Example: you could jump higher on the Moon than on Earth. Now try yours."], [
      ["Moon gravity is ___ Earth gravity.", "Weaker than", "Stronger than", "The same as"], ["Astronauts on the Moon can jump...", "Higher than on Earth", "Lower than on Earth"],
      ["Your weight on the Moon is...", "Less than on Earth", "More than on Earth"], ["Your mass on the Moon is...", "The same as on Earth", "Zero"], ["Which world pulls harder?", "A big planet", "A small moon"],
      ["Gravity pulls things toward the ___ of a world.", "Center", "Edge"], ["Is there gravity in space?", "Yes, objects pull each other", "No, none at all"]
    ]),
    les("Air resistance", [
      ["Air pushes back", "🪂", "Moving things push against air. The air pushes back. This is <b>air resistance</b>."],
      ["Parachute", "🪂", "A parachute is wide, so it catches lots of air and slows the fall."],
      ["Shape", "🏎️ ✈️", "Smooth, pointy shapes slip through air easily. Race cars and planes are shaped that way."]
    ], ["Wide shapes catch more air.", "Streamlined shapes cut through air.", "Example: a flat sheet of paper falls slower than a crumpled ball. Now try yours."], [
      ["A parachute slows a fall by catching lots of...", "Air", "Sound"], ["Which falls slower?", "A flat sheet of paper", "A crumpled paper ball"], ["Air resistance works...", "Against moving things", "Along with moving things"],
      ["Race cars are smooth to have ___ air resistance.", "Less", "More"], ["A bigger parachute means a ___ fall.", "Slower", "Faster"], ["Pushing your hand out a moving car window, you feel...", "Air pushing back", "Nothing"],
      ["Which has the most air resistance?", "An open umbrella falling", "A pebble falling"]
    ]),
    num("Speed problems", [
      ["Speed formula", "🏎️", "Speed = distance divided by time. If you go 20 km in 2 hours, your speed is 20 / 2 = 10 km per hour."],
      ["Distance", "📏", "Distance = speed x time. Going 10 km per hour for 3 hours is 30 km."],
      ["Check", "✅", "Always check the units: km, hours, meters, seconds."]
    ], () => {
      const s = ri(2, 12), t = ri(2, 6), w = ri(2, 9), u = ri(2, 5);
      return pick([
        { text: `A car goes ${s * t} km in ${t} hours at a steady speed. What is its speed in km per hour?`, visual: "🚗", answer: s,
          hints: ["Speed is how far in one hour.", "Divide the distance by the hours.", `Example: ${w * u} km in ${u} hours is ${w * u} / ${u} = ${w} km per hour. Now do yours.`] },
        { text: `A runner goes ${s} meters every second. How many meters in ${t} seconds?`, visual: "🏃", answer: s * t,
          hints: ["Add the same distance for each second.", "Multiply speed by time.", `Example: ${w} m per second for ${u} seconds is ${w} x ${u} = ${w * u} m. Now do yours.`] },
        { text: `A train goes ${s * t} km at ${s} km per hour. How many hours does it take?`, visual: "🚆", answer: t,
          hints: ["Time is how many speed-sized steps fit in the distance.", "Divide the distance by the speed.", `Example: ${w * u} km at ${w} km per hour takes ${w * u} / ${w} = ${u} hours. Now do yours.`] }
      ]);
    }),
    les("Gears and screws", [
      ["Gears", "⚙️ ⚙️", "<b>Gears</b> are wheels with teeth. Teeth fit together so one gear turns the next."],
      ["Opposite", "🔄", "When two gears touch, they turn in <b>opposite</b> directions."],
      ["Uses", "🚲 ⏰", "Bikes, clocks and egg beaters use gears."]
    ], ["Gears have teeth that mesh.", "Neighbor gears turn the opposite way.", "Example: if the left gear goes clockwise, the next goes counterclockwise. Now try yours."], [
      ["Gears have...", "Teeth", "Wings"], ["Two touching gears turn in ___ directions.", "Opposite", "The same"], ["The first gear turns clockwise. The one touching it turns...", "Counterclockwise", "Clockwise"],
      ["Which uses gears?", "A bike", "A rock", "A cloud"], ["Gears help to pass on...", "Turning motion", "Light"], ["A clock uses gears to move its...", "Hands", "Colors"],
      ["Three gears in a row: the first and third turn...", "The same direction", "Opposite directions"]
    ]),
    les("Levers up close", [
      ["Three parts", "🛝", "A lever has a <b>fulcrum</b> (pivot), a place you push (<b>effort</b>) and a thing being moved (<b>load</b>)."],
      ["Fulcrum position", "📍", "The closer the fulcrum is to the load, the easier it is to lift the load."],
      ["Examples", "🪵 🔨 🥄", "A crowbar, a claw hammer and a wheelbarrow are levers."]
    ], ["Find the fulcrum, effort and load.", "Fulcrum near the load means less effort.", "Example: a long crowbar lifts a heavy rock with little effort. Now try yours."], [
      ["The pivot point of a lever is the...", "Fulcrum", "Load"], ["The thing a lever moves is the...", "Load", "Fulcrum"], ["Where do you push a lever?", "At the effort end", "At the fulcrum"],
      ["To lift a heavy rock more easily, put the fulcrum ___ the rock.", "Close to", "Far from"], ["Which is a lever?", "A claw hammer", "A ball", "A mirror"], ["A longer lever handle needs ___ push.", "Less", "More"],
      ["A wheelbarrow is a...", "Lever", "Magnet"]
    ]),
    les("Earth is a magnet", [
      ["Compass", "🧭", "A <b>compass</b> has a small magnet needle that points north."],
      ["Why", "🌍 🧲", "The Earth acts like a giant magnet. Its magnetic poles are near the North Pole and South Pole."],
      ["Magnetic field", "🧲 〰️", "A magnet has a <b>magnetic field</b>, an invisible area where it can push or pull. It is strongest at the poles."]
    ], ["The needle follows the Earth's magnetism.", "The needle points toward north.", "Example: a hiker uses a compass to find north. Now try yours."], [
      ["A compass needle points...", "North", "To the nearest tree"], ["The Earth acts like a giant...", "Magnet", "Mirror"], ["A compass needle is a small...", "Magnet", "Light bulb"],
      ["A magnet's field is strongest at its...", "Poles", "Middle"], ["A magnetic field is...", "Invisible", "Bright pink"], ["Which tool helps you find directions?", "A compass", "A thermometer"],
      ["A compass works because of Earth's...", "Magnetism", "Gravity only"]
    ]),
    les("Electromagnets", [
      ["Make one", "🔩 🧵 🔋", "Wrap wire around an iron nail and connect a battery. The nail becomes a magnet! This is an <b>electromagnet</b>."],
      ["On and off", "🔌", "An electromagnet works only when electricity flows. Switch it off and it stops being a magnet."],
      ["Stronger", "💪", "More coils of wire or a stronger battery makes it stronger."]
    ], ["Electromagnets need electricity.", "More coils make it stronger.", "Example: cranes in junkyards use big electromagnets to lift metal. Now try yours."], [
      ["An electromagnet needs...", "Electricity", "Sunshine"], ["Switch off the electricity and the electromagnet...", "Stops being a magnet", "Gets stronger"], ["To make an electromagnet stronger, add more...", "Coils of wire", "Paper"],
      ["An electromagnet has a coil of wire around an...", "Iron nail", "Wooden stick"], ["Which can turn on and off?", "An electromagnet", "A fridge magnet"], ["A junkyard crane lifts scrap metal with an...", "Electromagnet", "Umbrella"],
      ["An electromagnet works because electric current makes a...", "Magnetic field", "Rainbow"]
    ]),
    les("Conductors and insulators", [
      ["Conductors", "🔌 🪙", "<b>Conductors</b> let electricity flow. Copper, aluminum, iron and silver are metals that do."],
      ["Insulators", "🧤", "<b>Insulators</b> block electricity. Rubber, plastic, glass, wood and dry cloth are insulators."],
      ["Use both", "🔋", "Electricians use rubber gloves and wires with plastic coats to stay safe."]
    ], ["Metal tends to be a conductor.", "Rubber, glass and plastic are insulators.", "Example: the copper in a wire is a conductor and the plastic is an insulator. Now try yours."], [
      ["Which is a conductor?", "Aluminum foil", "Rubber glove", "Plastic bag"], ["Which is an insulator?", "Glass", "Copper", "Iron"], ["A conductor ___ electricity flow.", "Lets", "Stops"],
      ["Electricians wear rubber gloves because rubber is an...", "Insulator", "Conductor"], ["Which can be used to complete a circuit?", "A metal paper clip", "A wooden stick"], ["Pot handles are often plastic because plastic is a poor ___ of heat.", "Conductor", "Insulator"],
      ["Water with salt in it can carry electricity, so keep electric things...", "Away from water", "In the bath"]
    ]),
    les("How heat travels", [
      ["Conduction", "🥄 ♨️", "<b>Conduction</b> is heat moving through touch, like a spoon getting hot in soup."],
      ["Convection", "🫧 ♨️", "<b>Convection</b> is heat carried by moving air or liquid. Warm air rises."],
      ["Radiation", "☀️ ➡️", "<b>Radiation</b> is heat traveling as rays. The Sun warms us this way, even across empty space."]
    ], ["Touching, moving fluid, or rays?", "The Sun reaches us by rays.", "Example: sitting near a campfire, you feel its rays. Now try yours."], [
      ["A hot pan warms your hand when you touch it. This is...", "Conduction", "Radiation"], ["The Sun warms Earth through space by...", "Radiation", "Conduction"], ["Warm air rising from a heater is...", "Convection", "Conduction"],
      ["Which kind needs touching?", "Conduction", "Radiation"], ["Hot air balloons rise because warm air...", "Rises", "Falls"], ["You feel heat from a fire across the room. This is...", "Radiation", "Conduction"],
      ["Boiling water has bubbles carrying heat upward. This is...", "Convection", "Radiation"]
    ]),
    les("Warming and expanding", [
      ["Expand", "🌡️ ⬆️", "Most things <b>expand</b> (get a little bigger) when warmed and shrink when cooled."],
      ["Thermometer", "🌡️", "The liquid in a thermometer expands and rises when it is warm. It sinks when it is cold."],
      ["Gaps", "🛤️ 🌉", "Bridges and railways have small gaps so they have room to expand in hot weather."]
    ], ["Warm makes things grow a little.", "Cool makes things shrink a little.", "Example: a balloon left in a hot car stretches tighter. Now try yours."], [
      ["When warmed, most things...", "Expand", "Vanish"], ["The liquid in a thermometer goes up when it gets...", "Warmer", "Colder"], ["Bridges have gaps to allow...", "Expansion in the heat", "Cars to jump"],
      ["When cooled, most things...", "Shrink a little", "Grow a lot"], ["A balloon in a freezer gets...", "Smaller", "Bigger"], ["Train tracks have gaps because the metal...", "Expands when hot", "Is too short"],
      ["A thermometer reading drops when it gets...", "Colder", "Warmer"]
    ]),
    les("Bending light", [
      ["Straight", "🔦 ➡️", "Light travels in straight lines in the air."],
      ["Refraction", "🥤 🥢", "When light goes from air into water, it bends. This is <b>refraction</b>. A straw in a glass looks bent."],
      ["Lenses", "🔍 👓", "A curved piece of glass, called a <b>lens</b>, bends light. Magnifying glasses and glasses use lenses."]
    ], ["Light bends when it goes into water or glass.", "A lens bends light on purpose.", "Example: a pencil in water looks broken. Now try yours."], [
      ["Light bending as it goes into water is called...", "Refraction", "Reflection"], ["A straw in a glass of water looks...", "Bent", "Longer"], ["A magnifying glass has a...", "Lens", "Magnet"],
      ["Glasses help people see using...", "Lenses", "Mirrors"], ["Light usually travels in...", "Straight lines", "Circles"], ["A swimming pool looks ___ than it really is.", "Shallower", "Deeper"],
      ["Which bends light on purpose?", "A lens", "A brick"]
    ]),
    les("Reflection rules", [
      ["Bounce", "🔦 🪞", "A ray of light that hits a mirror bounces off. The angle it comes in at equals the angle it goes out at."],
      ["Flip", "🔤 🪞", "In a mirror, left and right swap. Letters look backwards."],
      ["Smooth vs rough", "🧊 🧱", "Smooth surfaces give clear reflections. Rough surfaces scatter the light everywhere."]
    ], ["A mirror is smooth.", "Rough surfaces scatter light.", "Example: a calm lake gives a clear reflection but a wavy lake gives a blurry one. Now try yours."], [
      ["A mirror is smooth, so it gives a ___ reflection.", "Clear", "Blurry"], ["Wavy water gives a ___ reflection.", "Blurry", "Perfect"], ["In a mirror your right hand looks like a...", "Left hand", "Right hand"],
      ["The angle light comes in at a mirror equals the angle it goes...", "Out at", "Down at"], ["Which surface scatters light?", "Rough paper", "A mirror"], ["A periscope uses ___ to see around corners.", "Mirrors", "Magnets"],
      ["Light bouncing back is called...", "Reflection", "Refraction"]
    ]),
    les("Lightning and thunder", [
      ["Light is faster", "⚡ 🔊", "Light travels much faster than sound. We see lightning first and hear thunder later."],
      ["Count", "🔢", "Count the seconds from the flash to the thunder. Every 3 seconds is about 1 kilometer away."],
      ["Stay safe", "🏠", "In a storm, stay inside away from windows and wait for it to pass."]
    ], ["Light travels faster than sound.", "A bigger gap means the storm is farther.", "Example: if you hear thunder 6 seconds after the flash, it is about 2 km away. Now try yours."], [
      ["We see lightning ___ we hear thunder.", "Before", "After", "At the same time as"], ["Which is faster?", "Light", "Sound"], ["A long gap between flash and thunder means the storm is...", "Far away", "Very close"],
      ["A very short gap between flash and boom means the storm is...", "Close", "Far"], ["During a thunderstorm, the safest place is...", "Inside a building", "Under a tall lone tree"], ["Thunder is a ___.", "Sound", "Light"],
      ["Lightning is a ___.", "Flash of light", "Echo"]
    ]),
    les("Sound and materials", [
      ["Different materials", "🪵 🔔", "Different materials make different sounds. Wood goes 'tock', metal goes 'ting', glass goes 'clink'."],
      ["Muffling", "🧸 🔇", "Soft materials like foam, carpet and blankets soak up sound. Hard materials reflect it."],
      ["Pitch of strings", "🎻", "Short, thin, tight strings make high sounds. Long, thick, loose strings make low sounds."]
    ], ["Soft soaks, hard bounces.", "Short and tight is high. Long and loose is low.", "Example: shortening a guitar string by pressing it makes a higher note. Now try yours."], [
      ["Which soaks up sound best?", "A thick blanket", "A glass window"], ["A short string makes a ___ sound than a long one.", "Higher", "Lower"], ["A tighter string makes a ___ pitch.", "Higher", "Lower"],
      ["A thick, loose string makes a ___ pitch.", "Lower", "Higher"], ["Foam on a studio wall helps to...", "Soak up echoes", "Make more echo"], ["A hard tile floor makes a room sound...", "More echoey", "Quieter"],
      ["A xylophone's short bars make ___ notes.", "Higher", "Lower"]
    ]),
    les("Stored energy and moving energy", [
      ["Potential", "🏹 🎢", "<b>Potential energy</b> is stored energy, waiting to be used. A stretched rubber band or a ball held high has it."],
      ["Kinetic", "🏃 🎢", "<b>Kinetic energy</b> is the energy of motion. A rolling ball or a running kid has it."],
      ["Switching", "🔄", "At the top of a hill a sled has lots of potential energy. As it slides down, that turns into kinetic energy."]
    ], ["Stored = potential. Moving = kinetic.", "Higher up means more stored energy.", "Example: a pushed swing at its highest point has the most potential energy. Now try yours."], [
      ["A ball sitting at the top of a hill has mostly...", "Potential energy", "Kinetic energy"], ["A rolling ball has...", "Kinetic energy", "Only potential energy"], ["A stretched rubber band has...", "Potential energy", "No energy"],
      ["Going down a slide, potential energy turns into...", "Kinetic energy", "Cold"], ["Kinetic energy is the energy of...", "Motion", "Waiting"], ["Which has the most potential energy?", "A book on a high shelf", "A book on the floor"],
      ["A running dog has ___ energy.", "Kinetic", "Potential only"]
    ])
  ];
  f.push(
    mix("Mixed practice", at(f, [0, 2, 3, 4, 6, 8, 10, 12])),
    mix("Level 6 Challenge", at(f, [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 4: d, 5: e, 6: f });
})();
