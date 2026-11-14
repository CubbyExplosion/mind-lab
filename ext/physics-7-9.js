// ext/physics-7-9.js  Physics levels 7-9 (3rd grade, 4th grade first half)
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
  // numeric lesson: gen() returns {text, answer, hints:[3], visual?}
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

  // ================= LEVEL 7 =================
  const g = [
    les("Contact and field forces", [
      ["Contact forces", "🤝", "A <b>contact force</b> needs things to touch. Pushes, pulls, friction and air resistance are contact forces."],
      ["Forces from far away", "🧲", "Some forces work <b>without touching</b>. Gravity, magnetism and static electricity act across a gap."],
      ["Test it", "🔍", "Ask: do the two things have to touch? If yes, it is a contact force. If not, it works at a distance."]
    ], ["Ask yourself: do the two things touch?", "Contact forces need touching. Gravity and magnets can work across a gap.", "Example: a hand pushing a door touches it, so that is a contact force. Now try yours."], [
      ["Which force works without touching?", "Magnetism", "Friction", "A push by hand"], ["Friction is a...", "Contact force", "Force with no touching"],
      ["An apple falls from a tree. Which force pulls it down?", "Gravity", "Friction", "A push"], ["Which one is a contact force?", "Pulling a wagon by its handle", "A magnet pulling a paper clip from far away", "Gravity pulling the Moon"],
      ["A magnet pulls a nail across the table before touching it. This force is...", "A force that works at a distance", "A contact force", "Friction"],
      ["Air resistance on a skydiver is a...", "Contact force", "Force at a distance"], ["Which is NOT a contact force?", "Gravity", "A kick", "A push on a swing"],
      ["A balloon rubbed on hair sticks to the wall. The force that holds it is...", "Static electricity", "A strong push", "Friction between two hands"]
    ]),
    les("Mass and weight", [
      ["Mass", "⚖️", "<b>Mass</b> is how much stuff something is made of. We measure it in grams (g) and kilograms (kg)."],
      ["Weight", "🪝", "<b>Weight</b> is the pull of gravity on that mass. It is a force, measured in newtons (N)."],
      ["Moon or Earth", "🌙", "On the Moon your mass stays the same, but your weight is smaller because the Moon's gravity is weaker."]
    ], ["Mass is about how much stuff. Weight is about a pull.", "Mass stays the same everywhere. Weight can change with gravity.", "Example: an astronaut has the same mass on Earth and on the Moon, but weighs less on the Moon. Now try yours."], [
      ["Weight is measured in...", "Newtons", "Kilograms", "Meters"], ["Mass is measured in...", "Kilograms", "Newtons", "Degrees"],
      ["You fly to the Moon. What stays the same?", "Your mass", "Your weight"], ["On the Moon, an object's weight is...", "Smaller than on Earth", "Bigger than on Earth", "Exactly the same"],
      ["Weight is really a...", "Force", "Color", "Length"], ["A scale that measures newtons is measuring...", "Weight", "Mass"],
      ["Which one tells how much stuff is in a rock?", "Its mass", "Its weight", "Its shadow"], ["Gravity is stronger on Jupiter than on Earth. A rock there has...", "More weight, same mass", "Less weight, same mass", "Less mass, same weight"]
    ]),
    les("Inertia", [
      ["Stay as you are", "🛑", "<b>Inertia</b> means things keep doing what they are doing. A still thing stays still. A moving thing keeps moving."],
      ["Bus ride", "🚌", "When a bus stops suddenly, your body keeps moving forward. That is why we wear seat belts."],
      ["Mass matters", "⚖️", "More mass means more inertia. A heavy truck is much harder to start or stop than a bike."]
    ], ["Think: does the thing want to keep doing what it was doing?", "Things resist changes to their motion, and heavier things resist more.", "Example: if a car brakes suddenly, a bag on the seat slides forward. Now try yours."], [
      ["A bus brakes suddenly. Passengers lurch...", "Forward", "Backward", "Straight up"], ["Which has more inertia?", "A loaded truck", "A bicycle"],
      ["A ball sits still on a flat floor. Without a push it will...", "Stay still", "Start rolling", "Float up"], ["Seat belts help because of...", "Inertia", "Magnetism", "Sound"],
      ["Pull a tablecloth fast and the cups stay put. This is because of...", "Inertia", "Light", "Heat"], ["A hockey puck slides on smooth ice for a long time because...", "Little friction lets it keep moving", "Ice pulls it along", "Gravity pushes it sideways"],
      ["Which is hardest to start moving?", "A big boulder", "A tennis ball", "A feather"], ["Inertia is the tendency of things to...", "Keep their motion the same", "Speed up by themselves", "Get lighter"]
    ]),
    les("Action and reaction", [
      ["Pairs of forces", "🤜🤛", "When one thing pushes another, the other pushes back with an <b>equal force</b> in the opposite direction."],
      ["Rockets and balloons", "🚀", "A balloon lets air out backward, and the balloon shoots forward. A rocket works the same way."],
      ["Swimming", "🏊", "A swimmer pushes water backward, and the water pushes the swimmer forward."]
    ], ["Forces come in pairs, pushing in opposite directions.", "If you push one way, the other thing pushes you the other way.", "Example: when you jump off a small boat, the boat slides the opposite way. Now try yours."], [
      ["A balloon lets air out of its back. The balloon moves...", "Forward", "Backward", "It does not move"], ["A swimmer pushes the water back. The water pushes the swimmer...", "Forward", "Backward", "Up only"],
      ["You push a wall, standing on skates. You roll...", "Away from the wall", "Toward the wall"], ["Jumping from a small boat to the dock, the boat moves...", "Away from the dock", "Toward the dock", "It stays perfectly still"],
      ["A rocket pushes hot gas down. The gas pushes the rocket...", "Up", "Down", "Sideways"], ["Force pairs are always...", "Equal and opposite", "Equal and in the same direction", "Different sizes"],
      ["When you walk, your foot pushes back on the ground. The ground pushes you...", "Forward", "Backward"], ["A bat hits a ball. The ball also...", "Pushes back on the bat", "Does nothing to the bat"]
    ]),
    num("Comparing speeds", [
      ["Find the speed", "🚆", "<b>Speed</b> = distance divided by time. A train that goes 120 km in 2 hours goes 120 / 2 = 60 km per hour."],
      ["Compare", "🚌", "To compare, work out each speed. The bigger number is faster."],
      ["Take away", "➖", "To find how much faster one is, subtract the smaller speed from the bigger speed."]
    ], () => {
      const t = ri(2, 5), sb = ri(6, 14) * 5, diff = ri(1, 5) * 5, sa = sb + diff;
      const [n1, e1, n2] = pick([["train", "🚆", "bus"], ["car", "🚗", "truck"], ["boat", "🚤", "ferry"]]);
      return { text: `A ${n1} goes ${sa * t} km in ${t} hours. A ${n2} goes ${sb * t} km in ${t} hours. How many km per hour faster is the ${n1}?`, visual: e1, answer: diff,
        hints: ["Find each speed first.", "Divide each distance by the hours, then subtract the smaller speed from the bigger one.", "Example: a car goes 100 km in 2 hours (50 km/h) and a bike goes 30 km in 2 hours (15 km/h). The car is 50 - 15 = 35 km/h faster. Now do yours."] };
    }),
    les("Particles in matter", [
      ["Tiny particles", "🔬", "All matter is made of tiny <b>particles</b> that are too small to see."],
      ["Solid, liquid, gas", "🧊💧💨", "In a solid, particles are packed tightly and only jiggle in place. In a liquid, they slide past each other. In a gas, they spread far apart and zoom around."],
      ["Heat", "🔥", "Heating makes particles move faster. That is why ice melts and water boils."]
    ], ["Think about how close and how free the particles are.", "Solid = packed and jiggling. Liquid = sliding. Gas = far apart and zooming.", "Example: steam is a gas, so its particles are far apart. Now try yours."], [
      ["Particles of a solid are...", "Packed tightly, jiggling in place", "Far apart and zooming", "Not there"], ["Which state has particles far apart?", "Gas", "Solid", "Liquid"],
      ["Particles in a liquid can...", "Slide past each other", "Never move", "Disappear"], ["Heating a solid makes its particles move...", "Faster", "Slower", "Not at all"],
      ["Why does a gas fill its whole container?", "Its particles spread out everywhere", "Its particles are glued down", "It has no particles"], ["Why does a solid keep its shape?", "Its particles are held in place", "Its particles zoom around", "Its particles are gone"],
      ["Which is true of all matter?", "It is made of tiny particles", "It is always hard", "It always floats"], ["Cooling a gas makes its particles move...", "Slower", "Faster"]
    ]),
    les("Air pressure", [
      ["Air pushes", "🎈", "Air is made of tiny particles that bump into things. All that bumping is <b>air pressure</b>. It pushes in every direction."],
      ["Up high", "🏔️", "High up, there is less air above you, so the air pressure is lower. Your ears can pop on a mountain or a plane."],
      ["Using pressure", "🥤", "When you sip through a straw, you lower the pressure inside. The air outside pushes the drink up the straw."]
    ], ["Think about air particles bumping into things.", "More air squeezed in means more pressure. Less air above means less pressure.", "Example: a pumped-up bike tire is hard because lots of air is inside pushing out. Now try yours."], [
      ["Air pressure pushes...", "In every direction", "Only down", "Only up"], ["On a high mountain, air pressure is...", "Lower", "Higher", "The same as underwater"],
      ["A balloon gets bigger when you blow in air because...", "More air particles push out on the inside", "Air is lighter", "Gravity stretches it"], ["A flat tire has ___ air inside than a full tire.", "Less", "More"],
      ["A barometer measures...", "Air pressure", "Sound", "Temperature"], ["What pushes your drink up a straw?", "Air outside pushing on the drink", "The straw pulling it", "Gravity"],
      ["Your ears pop on a plane because of changes in...", "Air pressure", "Light", "Color"], ["Pumping more air into a ball makes the pressure inside...", "Go up", "Go down"]
    ]),
    les("Wedges", [
      ["What is a wedge?", "🪓", "A <b>wedge</b> is a simple machine that is thick at one end and thin at the other. It is two ramps put together."],
      ["Splitting", "🔪", "A wedge turns a push forward into a push sideways. Axes, knives and chisels split and cut things this way."],
      ["Thin is best", "📐", "The thinner and sharper the wedge, the less force it needs."]
    ], ["A wedge is thin at one end and thick at the other.", "It pushes things apart or holds them in place.", "Example: a doorstop is a wedge that keeps a door from moving. Now try yours."], [
      ["Which one is a wedge?", "An axe blade", "A seesaw", "A pulley"], ["A wedge turns a forward push into a...", "Sideways push", "Spin", "Sound"],
      ["Which of these works as a wedge?", "A doorstop", "A swing", "A bicycle wheel"], ["A sharper knife needs ___ force to cut.", "Less", "More"],
      ["A wedge is like two ___ back to back.", "Ramps", "Levers", "Wheels"], ["Which is used to split wood?", "An axe", "A spring", "A rope"],
      ["A nail's pointed tip works like a...", "Wedge", "Pulley"], ["Your front teeth cut food like...", "Wedges", "Wheels", "Magnets"]
    ]),
    num("Metric conversions", [
      ["Length", "📏", "1 meter = 100 centimeters. 1 kilometer = 1000 meters."],
      ["Mass and volume", "⚖️", "1 kilogram = 1000 grams. 1 liter = 1000 milliliters."],
      ["Which way?", "↔️", "Going to a smaller unit? Multiply. Going to a bigger unit? Divide."]
    ], () => {
      const x = ri(2, 9);
      return pick([
        { text: `${x} meters = how many centimeters?`, visual: "📏", answer: x * 100, hints: ["Centimeters are smaller than meters, so you will have more of them.", "Multiply by the number of centimeters in one meter.", "Example: 3 m = 3 x 100 = 300 cm. Now do yours."] },
        { text: `${x} kilometers = how many meters?`, visual: "🛣️", answer: x * 1000, hints: ["Meters are smaller than kilometers, so you will have more of them.", "Multiply by the number of meters in one kilometer.", "Example: 2 km = 2 x 1000 = 2000 m. Now do yours."] },
        { text: `${x} kilograms = how many grams?`, visual: "⚖️", answer: x * 1000, hints: ["Grams are small, so you will need lots of them.", "Multiply by the number of grams in one kilogram.", "Example: 4 kg = 4 x 1000 = 4000 g. Now do yours."] },
        { text: `${x} liters = how many milliliters?`, visual: "🥛", answer: x * 1000, hints: ["Milliliters are tiny, so you will need lots of them.", "Multiply by the number of milliliters in one liter.", "Example: 5 L = 5 x 1000 = 5000 mL. Now do yours."] },
        { text: `${x * 100} centimeters = how many meters?`, visual: "📏", answer: x, hints: ["Meters are bigger than centimeters, so you will have fewer of them.", "Divide by the number of centimeters in one meter.", "Example: 600 cm = 600 / 100 = 6 m. Now do yours."] },
        { text: `${x * 1000} grams = how many kilograms?`, visual: "⚖️", answer: x, hints: ["Kilograms are bigger than grams, so you will have fewer of them.", "Divide by the number of grams in one kilogram.", "Example: 7000 g = 7000 / 1000 = 7 kg. Now do yours."] }
      ]);
    }),
    les("Static electricity", [
      ["Charges", "⚡", "Everything is made of tiny parts with <b>charge</b>. Electrons have negative charge. Rubbing can move electrons from one thing to another."],
      ["Attract and repel", "🎈", "Like charges push apart (repel). Opposite charges pull together (attract)."],
      ["Static sparks", "🌩️", "A balloon rubbed on hair sticks to a wall. Lightning is a giant static spark."]
    ], ["Think about electrons moving when you rub two things.", "Same charges repel. Different charges attract.", "Example: two balloons rubbed on wool both get the same charge, so they push each other away. Now try yours."], [
      ["Like charges...", "Repel", "Attract", "Disappear"], ["Opposite charges...", "Attract", "Repel", "Stay still"],
      ["What moves when you rub a balloon on your hair?", "Electrons", "Magnets", "Sound"], ["Lightning is a huge...", "Static spark", "Magnet", "Shadow"],
      ["Static electricity can make hair...", "Stand up", "Turn blue", "Get heavier"], ["A charged balloon sticks to a wall because of...", "Attraction between charges", "Glue in the air", "Gravity pushing it sideways"],
      ["Electrons have what kind of charge?", "Negative", "Positive", "No charge"], ["Which makes static electricity?", "Rubbing a balloon on wool", "Dropping a ball", "Shining a flashlight"]
    ]),
    les("Series and parallel circuits", [
      ["One path", "🔗", "In a <b>series circuit</b>, everything is on one path. If one bulb goes out, they all go out."],
      ["Branches", "🌿", "In a <b>parallel circuit</b>, the current has branches. If one bulb goes out, the others stay on."],
      ["Brightness", "💡", "Adding more bulbs in series makes each bulb dimmer. In parallel, each bulb stays bright."]
    ], ["Count the paths the current can take.", "One path means series. Several paths mean parallel.", "Example: string lights where the whole string dies when one bulb breaks are wired in series. Now try yours."], [
      ["A circuit with ONE path is...", "Series", "Parallel"], ["A circuit with branches is...", "Parallel", "Series"],
      ["In a series circuit, one bulb burns out. The others...", "All go out", "Stay on"], ["In a parallel circuit, one bulb burns out. The others...", "Stay on", "All go out"],
      ["Bulbs in homes are mostly wired in...", "Parallel", "Series"], ["Adding more bulbs in series makes each bulb...", "Dimmer", "Brighter"],
      ["Which circuit keeps every bulb bright when you add another?", "Parallel", "Series"], ["Old holiday lights went dark all at once when one bulb broke. They were wired in...", "Series", "Parallel"]
    ]),
    les("Circuit symbols", [
      ["A map for circuits", "📐", "Electricians draw circuits with simple <b>symbols</b>, like a map. Each part has its own symbol."],
      ["Common symbols", "🔋", "A <b>cell</b> or battery is a long line and a short line. A <b>bulb</b> is a circle with a cross. A <b>switch</b> is a line with a gap that can close. Wires are straight lines."],
      ["Closed or open", "🔘", "A closed switch makes a complete loop and the bulb lights. An open switch has a gap and the bulb is off."]
    ], ["Picture the shape of the symbol.", "Remember: circle with a cross, long and short lines, a gap in a line.", "Example: a circle with a cross inside is the symbol for a bulb. Now try yours."], [
      ["A circle with a cross inside is the symbol for a...", "Bulb", "Battery", "Switch"], ["A long line next to a short line is the symbol for a...", "Cell or battery", "Bulb", "Wire"],
      ["A line with a gap in it that can close is a...", "Switch", "Bulb", "Battery"], ["Wires are drawn as...", "Straight lines", "Circles", "Crosses"],
      ["An open switch means the bulb is...", "Off", "On", "Brighter"], ["For a bulb to light, the circuit must be...", "A complete closed loop", "Broken", "Open"],
      ["What gives the circuit its push?", "The cell or battery", "The wire", "The switch"], ["You close the switch. The bulb...", "Lights up", "Goes out", "Gets cold"]
    ]),
    les("Lenses", [
      ["Bending light", "🔍", "A <b>lens</b> is a curved piece of clear glass or plastic that bends light."],
      ["Convex lens", "🔎", "A <b>convex</b> lens is thicker in the middle. It brings light together. A magnifying glass is a convex lens and makes things look bigger."],
      ["Concave lens", "👓", "A <b>concave</b> lens is thinner in the middle. It spreads light apart. Some glasses use them."]
    ], ["Look at the shape: thick in the middle or thin in the middle?", "Thick middle brings light together. Thin middle spreads it apart.", "Example: a magnifying glass is thicker in the middle. Now try yours."], [
      ["A magnifying glass is a ___ lens.", "Convex", "Concave", "Flat"], ["A convex lens is thicker...", "In the middle", "At the edges"],
      ["A concave lens makes light...", "Spread out", "Come together"], ["Which tool uses lenses?", "A microscope", "A hammer", "A pillow"],
      ["Your eye has a ___ that focuses light.", "Lens", "Magnet", "Speaker"], ["A convex lens used as a magnifier makes a small thing look...", "Bigger", "Smaller", "Invisible"],
      ["Cameras use lenses to...", "Focus light", "Make sound", "Cool the air"], ["A lens works by ___ light.", "Bending", "Eating", "Freezing"]
    ]),
    les("Wave parts", [
      ["Waves carry energy", "🌊", "A <b>wave</b> carries energy from place to place. Water waves, sound waves and light waves all have the same kinds of parts."],
      ["Parts of a wave", "〰️", "The top of a wave is the <b>crest</b>. The bottom is the <b>trough</b>. The distance from one crest to the next is the <b>wavelength</b>."],
      ["Size and speed", "📈", "The <b>amplitude</b> is how tall the wave is. The <b>frequency</b> is how many waves pass by each second."]
    ], ["Picture a wave drawn as a wiggly line.", "Top = crest, bottom = trough. Height = amplitude. Distance crest to crest = wavelength.", "Example: the lowest point of a wave is called the trough. Now try yours."], [
      ["The highest point of a wave is the...", "Crest", "Trough", "Wavelength"], ["The lowest point of a wave is the...", "Trough", "Crest", "Frequency"],
      ["Distance from one crest to the next is the...", "Wavelength", "Amplitude", "Trough"], ["How tall a wave is (from rest) is its...", "Amplitude", "Wavelength", "Frequency"],
      ["How many waves pass by each second is the...", "Frequency", "Amplitude", "Crest"], ["A bigger amplitude sound wave is...", "Louder", "Quieter", "Higher"],
      ["Waves carry...", "Energy", "Matter all the way across", "Only light"], ["A wave with a shorter wavelength and faster wiggle has a higher...", "Frequency", "Trough"]
    ]),
    les("Renewable energy", [
      ["Never runs out", "🌞", "<b>Renewable</b> energy comes from sources that do not run out: sunlight, wind, flowing water and heat from inside the Earth."],
      ["Used up", "🛢️", "<b>Non-renewable</b> energy comes from coal, oil and natural gas. These fuels took millions of years to form and we are using them up."],
      ["Cleaner", "🌳", "Burning fuels puts gases in the air. Wind and solar power make electricity without burning anything."]
    ], ["Ask: will this source run out, or will it come back?", "Sun, wind and water keep coming. Coal, oil and gas get used up.", "Example: wind will blow tomorrow too, so it is renewable. Now try yours."], [
      ["Which is renewable?", "Wind", "Coal", "Oil"], ["Which is NOT renewable?", "Natural gas", "Sunlight", "Flowing water"],
      ["Solar panels use energy from...", "The Sun", "Coal", "Oil"], ["A wind turbine turns the energy of moving ___ into electricity.", "Air", "Coal", "Rock"],
      ["Coal, oil and gas are called...", "Fossil fuels", "Wind fuels", "Light fuels"], ["A dam uses the energy of...", "Flowing water", "Burning oil", "Sound"],
      ["Which source makes electricity without burning fuel?", "Solar panels", "A coal plant", "A gas engine"], ["Fossil fuels formed over...", "Millions of years", "A few days", "One minute"]
    ]),
    num("Temperature changes", [
      ["Thermometer", "🌡️", "A <b>thermometer</b> measures temperature in degrees Celsius (°C)."],
      ["Warming", "🔥", "If water warms by 5°C each minute, after 3 minutes it is 15°C warmer."],
      ["Cooling", "🧊", "If a drink cools by 2°C each minute, take away 2°C for every minute."]
    ], () => {
      const r = ri(2, 6), t = ri(2, 5);
      return pick([
        (() => { const s = ri(10, 25); return { text: `Water is ${s}°C. A heater warms it by ${r}°C every minute. What is the temperature after ${t} minutes?`, visual: "🌡️", answer: s + r * t,
          hints: ["Work out how many degrees it rises in total.", "Multiply the rise each minute by the minutes, then add that to where it started.", "Example: 20°C, rising 4°C a minute for 3 minutes: 20 + 4 x 3 = 32°C. Now do yours."] }; })(),
        (() => { const s = ri(30, 60); return { text: `Soup is ${s}°C. It cools by ${r}°C every minute. What is its temperature after ${t} minutes?`, visual: "🍲", answer: s - r * t,
          hints: ["Work out how many degrees it drops in total.", "Multiply the drop each minute by the minutes, then take that away from where it started.", "Example: 50°C, dropping 3°C a minute for 4 minutes: 50 - 3 x 4 = 38°C. Now do yours."] }; })()
      ]);
    }),
    les("Orbits", [
      ["Going around", "🌍", "An <b>orbit</b> is the path one object takes around another. Earth orbits the Sun, and the Moon orbits Earth."],
      ["Time to go round", "📅", "Earth takes about one year (365 days) to go around the Sun. It spins once every day, which gives us day and night."],
      ["Gravity holds on", "🛰️", "Gravity keeps planets and moons in orbit instead of flying off into space."]
    ], ["Orbit means going around something.", "Gravity is the pull that keeps things circling.", "Example: the Moon circles Earth, so it orbits Earth. Now try yours."], [
      ["Earth orbits the...", "Sun", "Moon", "Mars"], ["The Moon orbits...", "Earth", "The Sun only", "Jupiter"],
      ["One trip of Earth around the Sun takes about...", "A year", "A day", "An hour"], ["What keeps planets in orbit?", "Gravity", "Wind", "Sound"],
      ["Earth spinning once makes one...", "Day", "Year", "Month"], ["How many planets orbit our Sun?", "Eight", "Two", "Twenty"],
      ["A satellite that circles Earth is in...", "Orbit", "A circuit", "A storm"], ["The Sun is a...", "Star", "Planet", "Moon"]
    ]),
    les("Moon phases", [
      ["The Moon's light", "🌙", "The Moon does not make its own light. It reflects sunlight. We always see half of it lit up by the Sun."],
      ["Changing shape", "🌑🌓🌕", "As the Moon orbits Earth, we see different amounts of its lit side. These are the <b>phases</b>: new, crescent, quarter, gibbous and full."],
      ["The cycle", "🔁", "The phases repeat about every month. A Moon getting bigger is <b>waxing</b>. A Moon getting smaller is <b>waning</b>."]
    ], ["Think: the lit part we see changes as the Moon moves around Earth.", "New Moon is dark. Full Moon is a bright circle. The cycle takes about a month.", "Example: a thin sliver of light is called a crescent. Now try yours."], [
      ["The Moon shines because it...", "Reflects sunlight", "Makes its own light", "Burns gas"], ["When we see the whole circle lit, it is a...", "Full Moon", "New Moon", "Crescent"],
      ["When we can barely see the Moon, it is a...", "New Moon", "Full Moon", "Quarter Moon"], ["The cycle of phases takes about...", "A month", "A day", "A year"],
      ["A Moon that is getting bigger is...", "Waxing", "Waning"], ["A Moon that is getting smaller is...", "Waning", "Waxing"],
      ["The Moon's phases happen because of how the Moon...", "Orbits Earth", "Melts", "Spins faster"], ["A thin sliver of lit Moon is a...", "Crescent", "Full Moon"]
    ])
  ];
  g.push(
    mix("Mixed practice", at(g, [0, 1, 2, 4, 5, 9, 12, 17])),
    mix("Level 7 Challenge", at(g, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 8 =================
  const h = [
    num("Net force", [
      ["Add forces", "➕", "When two forces push the same way, they add. 10 N and 5 N together give 15 N."],
      ["Subtract forces", "➖", "When forces push opposite ways, subtract the smaller from the bigger. 10 N right and 4 N left leaves 6 N to the right."],
      ["Net force", "🎯", "The <b>net force</b> is what is left after you combine all the forces. It decides how the object moves."]
    ], () => {
      const a = ri(10, 40), b = ri(3, 9);
      return pick([
        { text: `Two kids push a box the same way with ${a} N and ${b} N. What is the net force?`, visual: "📦", answer: a + b,
          hints: ["Both pushes go the same way.", "When forces go the same way, put them together.", "Example: pushes of 12 N and 5 N in the same direction give 12 + 5 = 17 N. Now do yours."] },
        { text: `You pull a sled forward with ${a} N. Friction pulls back with ${b} N. What is the net force forward?`, visual: "🛷", answer: a - b,
          hints: ["The two forces go opposite ways.", "Take the smaller force away from the bigger force.", "Example: 30 N forward and 8 N back leaves 30 - 8 = 22 N forward. Now do yours."] },
        { text: `A rope has ${a} N pulling left and ${a} N pulling right. What is the net force?`, visual: "🪢", answer: 0,
          hints: ["The forces are the same size and opposite.", "When equal forces push opposite ways, they cancel.", "Example: 15 N left and 15 N right cancel out, so the net force is 0 N. Now do yours."] }
      ]);
    }),
    num("Average speed", [
      ["Whole trip", "🛣️", "<b>Average speed</b> = total distance divided by total time."],
      ["Example", "🚲", "A cyclist goes 10 km in the first hour and 14 km in the second. Total 24 km in 2 hours, so the average is 12 km per hour."],
      ["Careful", "⚠️", "Add up all the distances first. Then add up all the times. Then divide."]
    ], () => {
      const a = ri(8, 20), t1 = ri(1, 3), t2 = ri(1, 3), k = ri(1, 5);
      const d1 = a * t1 + k, d2 = a * t2 - k;
      return { text: `A car drives ${d1} km in ${t1} ${t1 === 1 ? "hour" : "hours"}, then ${d2} km in ${t2} ${t2 === 1 ? "hour" : "hours"}. What is its average speed in km per hour?`, visual: "🚗", answer: a,
        hints: ["Find the whole distance and the whole time first.", "Add the two distances, add the two times, then divide the distance by the time.", "Example: 30 km in 1 hour then 60 km in 2 hours: 90 km in 3 hours, and 90 / 3 = 30 km per hour. Now do yours."] };
    }),
    les("Distance-time graphs", [
      ["A picture of a trip", "📈", "A <b>distance-time graph</b> shows how far something has gone as time passes. Time goes along the bottom. Distance goes up the side."],
      ["Reading the line", "📏", "A flat line means <b>stopped</b>. A straight slanted line means <b>steady speed</b>. A steeper line means <b>faster</b>."],
      ["Coming back", "↩️", "If the line goes back down, the object is coming back toward where it started."]
    ], ["Picture the line on the graph.", "Flat means no change in distance. Steeper means faster.", "Example: a line that climbs steeply shows fast movement. Now try yours."], [
      ["A flat line on a distance-time graph means the object is...", "Stopped", "Speeding up", "Going backward"], ["A steeper line means the object is going...", "Faster", "Slower", "Nowhere"],
      ["A straight slanted line means...", "Steady speed", "Stopped", "Falling"], ["The bottom of the graph usually shows...", "Time", "Distance", "Mass"],
      ["The side of the graph usually shows...", "Distance", "Time", "Color"], ["The line goes back down toward zero. The object is...", "Coming back", "Stopped", "Going farther away"],
      ["Which line shows the fastest runner?", "The steepest line", "The flattest line", "A line that goes down"], ["A runner stops to rest. On the graph the line is...", "Flat", "Steeper", "Zigzag upward"]
    ]),
    les("Momentum", [
      ["Hard to stop", "🚛", "<b>Momentum</b> is how hard it is to stop a moving object. It depends on mass and speed."],
      ["More of each", "⚽", "A heavy object has more momentum than a light one at the same speed. A faster object has more momentum than a slower one of the same mass."],
      ["Staying safe", "🪖", "Helmets, airbags and crumple zones take longer to stop you, which makes the stopping force smaller."]
    ], ["Think about mass and speed together.", "Bigger mass or faster speed makes it harder to stop.", "Example: a bowling ball rolling slowly can still be harder to stop than a tennis ball rolling at the same speed. Now try yours."], [
      ["Which is harder to stop at the same speed?", "A truck", "A bicycle"], ["Which has more momentum?", "A fast car", "The same car moving slowly"],
      ["Momentum depends on mass and...", "Speed", "Color", "Temperature"], ["An airbag helps by...", "Making the stop take longer", "Making you heavier", "Speeding you up"],
      ["A parked truck has momentum of...", "Zero", "Very large", "Negative"], ["Which has the most momentum?", "A heavy train moving fast", "A feather drifting", "A snail crawling"],
      ["A bike helmet crumples to...", "Slow your head's stop gently", "Make a crash louder", "Add speed"], ["A tennis ball and a bowling ball roll at the same speed. Which is harder to stop?", "The bowling ball", "The tennis ball"]
    ]),
    les("Pressure and area", [
      ["Force on an area", "👠", "<b>Pressure</b> is how much force is pressing on each bit of area. Small area means high pressure."],
      ["Sharp things", "🔪📌", "A sharp knife or a pin has a tiny tip, so all the force is squeezed onto a very small area. That makes it cut or poke easily."],
      ["Spread it out", "🥾", "Snowshoes and wide tank tracks spread weight over a big area, so the pressure is small and they do not sink."]
    ], ["Think about how big the pressing area is.", "Same force on a smaller area means more pressure.", "Example: a wide ski stays on top of snow because it spreads your weight out. Now try yours."], [
      ["Same force on a smaller area gives...", "More pressure", "Less pressure", "No pressure"], ["Snowshoes stop you sinking because they...", "Spread your weight over a big area", "Make you lighter", "Melt the snow"],
      ["A pin goes into a board easily because its tip has...", "A tiny area", "A huge area", "No force"], ["A knife is sharpened to make its edge...", "Thinner", "Wider", "Heavier"],
      ["Which puts the most pressure on the ground?", "A tall thin heel", "A flat wide shoe", "A snowshoe"], ["A wide tractor tire helps it not sink because it has...", "A big area", "A small area"],
      ["Lying flat on thin ice is safer because your weight spreads over...", "A bigger area", "A smaller area"], ["A thumbtack has a wide head so you can...", "Push without hurting your thumb", "Make it heavier", "Make it magnetic"]
    ]),
    les("Buoyancy", [
      ["Water pushes up", "🛟", "Water pushes up on things that are in it. This upward push is called <b>buoyancy</b> (or upthrust)."],
      ["Float or sink", "🚢", "An object floats when the water's upward push equals its weight. A ship floats because its hollow shape pushes aside lots of water."],
      ["Salt helps", "🧂", "Salty water pushes up harder than fresh water, so it is easier to float in the sea."]
    ], ["Think about the upward push from water.", "If the push up can match the weight, the object floats.", "Example: a steel ship floats because it is shaped to push aside a lot of water. Now try yours."], [
      ["Water pushes up on a floating object. This is called...", "Buoyancy", "Friction", "Static"], ["A big steel ship floats because of its...", "Hollow shape that pushes aside lots of water", "Light steel atoms", "Magnets"],
      ["It is easier to float in...", "Salty sea water", "Fresh water"], ["A floating object has an upward push that is ___ its weight.", "Equal to", "Much smaller than", "Zero compared with"],
      ["A solid steel ball in water will...", "Sink", "Float"], ["The same steel shaped into a hollow boat will...", "Float", "Sink"],
      ["A life jacket helps you float because it...", "Adds buoyancy", "Adds weight", "Adds friction"], ["The upward push of water is also called...", "Upthrust", "Downthrust", "Sideways push"]
    ]),
    num("Density", [
      ["Packed in", "🧱", "<b>Density</b> tells how much mass is packed into a space. Density = mass divided by volume."],
      ["Units", "📦", "If a block has a mass of 20 g and a volume of 5 cm³, its density is 20 / 5 = 4 g per cm³."],
      ["Floating", "💧", "Water has a density of 1 g per cm³. Things with a lower density float in water. Things with a higher density sink."]
    ], () => {
      const d = ri(2, 9), v = ri(2, 8);
      return pick([
        { text: `A block has a mass of ${d * v} g and a volume of ${v} cm³. What is its density in g per cm³?`, visual: "🧱", answer: d,
          hints: ["Density compares mass to volume.", "Divide the mass by the volume.", "Example: 18 g in 3 cm³ gives 18 / 3 = 6 g per cm³. Now do yours."] },
        { text: `A metal has a density of ${d} g per cm³. What is the mass of ${v} cm³ of it, in grams?`, visual: "🪙", answer: d * v,
          hints: ["Each cm³ has the same mass.", "Multiply the density by the volume.", "Example: density 5 g per cm³ and 4 cm³ gives 5 x 4 = 20 g. Now do yours."] }
      ]);
    }),
    les("Changes of state", [
      ["Names of changes", "🔄", "<b>Melting</b>: solid to liquid. <b>Freezing</b>: liquid to solid. <b>Evaporation</b>: liquid to gas. <b>Condensation</b>: gas to liquid."],
      ["Water facts", "🌡️", "Water freezes and ice melts at 0°C. Water boils at 100°C and turns to steam."],
      ["Skipping a step", "🧊", "<b>Sublimation</b> is when a solid turns straight into a gas. Dry ice does this."]
    ], ["Find the starting state and the ending state.", "Solid to liquid, liquid to solid, liquid to gas, gas to liquid. Each has its own name.", "Example: wet clothes drying outside is liquid water becoming a gas. Now try yours."], [
      ["Solid to liquid is called...", "Melting", "Freezing", "Condensation"], ["Liquid to solid is called...", "Freezing", "Melting", "Evaporation"],
      ["Gas to liquid is called...", "Condensation", "Evaporation", "Melting"], ["Water boils at...", "100°C", "0°C", "50°C"],
      ["Ice melts at...", "0°C", "100°C", "37°C"], ["Drops on the outside of a cold glass come from...", "Condensation", "Melting", "Freezing"],
      ["A puddle disappearing in the Sun is...", "Evaporation", "Condensation", "Freezing"], ["Dry ice turning straight into gas is...", "Sublimation", "Freezing", "Condensation"]
    ]),
    les("Water heats slowly", [
      ["Heating takes energy", "🏖️", "Different materials need different amounts of heat energy to warm up. Water needs a lot."],
      ["Sand and sea", "🌊", "On a sunny day, sand gets hot fast, but the sea stays cooler. At night, sand cools fast, but the sea stays warmer for longer."],
      ["Useful", "🏠", "Because water holds heat so well, it is used in radiators and hot-water bottles. Places near the sea have milder weather."]
    ], ["Think about which material warms up quickly.", "Water warms up and cools down slowly. Sand and metal change quickly.", "Example: a metal spoon in hot soup heats up quickly, much faster than the soup warms up. Now try yours."], [
      ["Which warms up faster in the Sun?", "Sand", "Sea water"], ["Which stays warm longer after sunset?", "The sea", "The sand"],
      ["Water needs ___ heat energy to warm up than most materials.", "More", "Less"], ["Why are hot-water bottles filled with water?", "Water holds heat well", "Water is light", "Water is magnetic"],
      ["Places near the sea tend to have weather that is...", "Milder", "More extreme"], ["A metal spoon in hot soup gets hot...", "Quickly", "Very slowly"],
      ["Water in a radiator carries heat because water...", "Stores a lot of heat", "Has no heat", "Is lighter than air"], ["At noon on the beach the hot feet-burning part is the...", "Sand", "Sea"]
    ]),
    les("Current, voltage, resistance", [
      ["Current", "🌊", "<b>Current</b> is the flow of electric charge. We measure it in <b>amps</b> (A)."],
      ["Voltage", "🔋", "<b>Voltage</b> is the push that makes the current flow. A battery gives voltage. We measure it in <b>volts</b> (V)."],
      ["Resistance", "🚧", "<b>Resistance</b> is how hard it is for current to flow. We measure it in <b>ohms</b>. Long, thin wires have more resistance than short, thick ones."]
    ], ["Match the idea to the unit: amps, volts, ohms.", "Current = flow. Voltage = push. Resistance = how hard it is to flow.", "Example: a battery's push is measured in volts. Now try yours."], [
      ["Current is measured in...", "Amps", "Volts", "Ohms"], ["Voltage is measured in...", "Volts", "Amps", "Ohms"],
      ["Resistance is measured in...", "Ohms", "Volts", "Amps"], ["A battery supplies...", "Voltage", "Resistance only", "Sound"],
      ["A thin wire has ___ resistance than a thick wire.", "More", "Less"], ["More voltage across the same bulb gives ___ current.", "More", "Less"],
      ["The flow of charge is called...", "Current", "Voltage", "Resistance"], ["A long wire has ___ resistance than a short one.", "More", "Less"]
    ]),
    num("Ohm's law", [
      ["The rule", "📐", "<b>Voltage = current x resistance</b>, or V = I x R. Voltage is in volts, current in amps, resistance in ohms."],
      ["Example", "🔌", "A current of 2 A through a 3 ohm resistor needs 2 x 3 = 6 V."],
      ["Rearranged", "🔁", "Current = voltage / resistance. Resistance = voltage / current."]
    ], () => {
      const i = ri(2, 6), r = ri(2, 9);
      return pick([
        { text: `A current of ${i} A flows through a resistor of ${r} ohms. What is the voltage in volts?`, visual: "🔌", answer: i * r,
          hints: ["Use the rule that links volts, amps and ohms.", "Multiply the current by the resistance.", "Example: 3 A through 4 ohms needs 3 x 4 = 12 V. Now do yours."] },
        { text: `A ${i * r} V battery pushes current through a ${r} ohm resistor. What is the current in amps?`, visual: "🔋", answer: i,
          hints: ["Current is voltage shared out by the resistance.", "Divide the voltage by the resistance.", "Example: 12 V across 4 ohms gives 12 / 4 = 3 A. Now do yours."] },
        { text: `A ${i * r} V battery gives a current of ${i} A. What is the resistance in ohms?`, visual: "💡", answer: r,
          hints: ["Resistance is how many volts you need for each amp.", "Divide the voltage by the current.", "Example: 12 V and 3 A gives 12 / 3 = 4 ohms. Now do yours."] }
      ]);
    }),
    les("Magnetic fields", [
      ["Invisible field", "🧲", "A magnet has a <b>magnetic field</b> all around it. It is the space where the magnet's force can be felt."],
      ["Field lines", "🧭", "We draw field lines from the north pole to the south pole. Lines close together mean a strong field."],
      ["Compass", "🧭", "A compass needle is a tiny magnet. It lines up with the magnetic field, which is why it points north."]
    ], ["Picture the lines drawn around a magnet.", "Lines run from north pole to south pole. Close lines mean strong.", "Example: iron filings sprinkled near a magnet gather along the field lines. Now try yours."], [
      ["Magnetic field lines are drawn from the...", "North pole to south pole", "South pole to north pole", "Middle to the edge"], ["Field lines close together mean a ___ field.", "Strong", "Weak"],
      ["Where is a magnet strongest?", "At its poles", "In its middle", "Far away"], ["A compass needle lines up with...", "The magnetic field", "The wind", "Gravity"],
      ["Iron filings near a magnet show...", "The field lines", "The color", "The weight"], ["The field gets weaker...", "Farther from the magnet", "Closer to the magnet"],
      ["A compass needle is a tiny...", "Magnet", "Battery", "Lens"], ["Can a magnet's field pass through paper?", "Yes", "No"]
    ]),
    les("Motors and generators", [
      ["Motor", "⚙️", "A <b>motor</b> uses electricity and magnets to make something spin. It turns electrical energy into movement."],
      ["Generator", "🔄", "A <b>generator</b> does the opposite. A magnet spinning near a coil of wire makes an electric current. It turns movement into electricity."],
      ["Power stations", "🏭", "Wind, water or steam spin giant generators in power stations. Fans, drills and electric cars use motors."]
    ], ["Motors use electricity. Generators make electricity.", "Motor: electricity to movement. Generator: movement to electricity.", "Example: a bike dynamo that lights a lamp when you pedal is a small generator. Now try yours."], [
      ["A motor turns electrical energy into...", "Movement", "Sunlight", "Soil"], ["A generator turns movement into...", "Electricity", "Heat only", "Sound only"],
      ["A wind turbine is connected to a...", "Generator", "Motor that uses electricity", "Lens"], ["Which one uses a motor?", "An electric fan", "A candle", "A mirror"],
      ["A bike dynamo lights a lamp when you pedal. It is a...", "Generator", "Motor", "Switch"], ["A generator needs a magnet and a...", "Coil of wire", "Mirror", "Balloon"],
      ["Which spins a generator at a power station?", "Steam, wind or water", "A balloon", "A flashlight"], ["An electric drill uses electricity to...", "Spin", "Make electricity"]
    ]),
    les("Electricity at home", [
      ["Safe use", "🔌", "Never put metal things into a power outlet. Keep water and electricity apart, because water can carry electricity to you."],
      ["Fuses", "🧯", "A <b>fuse</b> or <b>circuit breaker</b> stops the current if too much flows, so wires do not overheat."],
      ["Power", "💡", "Power is measured in <b>watts</b> (W). A 60 W lamp uses less energy per second than a 2000 W heater."]
    ], ["Think about what keeps people and wires safe.", "Water and metal in outlets are dangerous. Fuses cut off too much current.", "Example: a hairdryer must stay away from the bathtub. Now try yours."], [
      ["A fuse is there to...", "Stop too much current", "Make light", "Add more power"], ["Power is measured in...", "Watts", "Meters", "Newtons"],
      ["It is unsafe to use electric devices with...", "Wet hands", "Dry hands", "Rubber-handled tools"], ["A 2000 W heater uses ___ energy per second than a 60 W lamp.", "More", "Less"],
      ["Never put ___ in a power outlet.", "Metal objects", "A plug", "Nothing"], ["A circuit breaker does what when the current is too big?", "Switches off", "Switches on", "Gets hotter"],
      ["Frayed, damaged cords are...", "Dangerous", "Extra safe", "Magnetic"], ["Watts tell us how fast a device uses...", "Energy", "Sound", "Air"]
    ]),
    les("Color of light", [
      ["Light colors", "🌈", "White light is a mix of colors. The primary colors of light are <b>red, green and blue</b>. Mixing all three makes white."],
      ["Seeing color", "🍎", "A red apple looks red because it reflects red light and absorbs the other colors."],
      ["White and black", "⬜⬛", "White things reflect all colors. Black things absorb nearly all light, which is why black clothes get hot in the sun."]
    ], ["Think about which colors the object reflects.", "The color you see is the light that bounces back to your eyes.", "Example: a green leaf reflects green light and absorbs the rest. Now try yours."], [
      ["The primary colors of light are red, green and...", "Blue", "Yellow", "Black"], ["A red apple looks red because it reflects...", "Red light", "Blue light", "All colors"],
      ["Mixing red, green and blue light makes...", "White light", "Black", "Brown"], ["Which absorbs the most light?", "Black cloth", "White cloth", "A mirror"],
      ["A white shirt reflects...", "All colors", "No colors", "Only blue"], ["A blue filter on a flashlight lets through...", "Blue light", "All colors", "Red light"],
      ["Why do black clothes feel hotter in the Sun?", "They absorb more light", "They reflect more light", "They make light"], ["A rainbow shows that white light is...", "A mix of colors", "Just one color", "Always red"]
    ]),
    les("Frequency and Hz", [
      ["Counting vibrations", "🎻", "<b>Frequency</b> is how many vibrations happen each second. It is measured in <b>hertz</b> (Hz). 100 Hz means 100 vibrations per second."],
      ["Pitch", "🎶", "A higher frequency makes a higher pitch. A lower frequency makes a lower pitch."],
      ["Beyond hearing", "🦇", "People hear about 20 to 20,000 Hz. Sound above that is <b>ultrasound</b>. Bats and dolphins use it, and doctors use it to look inside the body."]
    ], ["Hz counts vibrations per second.", "More vibrations per second means a higher sound.", "Example: a 400 Hz sound is higher than a 200 Hz sound. Now try yours."], [
      ["Frequency is measured in...", "Hertz", "Newtons", "Liters"], ["A higher frequency gives a ___ pitch.", "Higher", "Lower"],
      ["Which sound has the highest pitch?", "1000 Hz", "100 Hz", "50 Hz"], ["Sound above human hearing is called...", "Ultrasound", "Echo", "Thunder"],
      ["Bats use ultrasound to...", "Find their way and catch insects", "Speak to people", "Make light"], ["500 Hz means 500...", "Vibrations per second", "Meters per second", "Newtons"],
      ["Which sound has the lowest pitch?", "80 Hz", "800 Hz", "8000 Hz"], ["Doctors use ultrasound to...", "See inside the body safely", "Cook food", "Make magnets"]
    ]),
    les("Seasons", [
      ["Tilted Earth", "🌍", "Earth spins on a tilted axis. The tilt is why we have seasons, not how close we are to the Sun."],
      ["Summer and winter", "☀️❄️", "When your half of Earth tilts toward the Sun, you get summer: warmer weather and longer days. When it tilts away, you get winter."],
      ["Opposite", "🔄", "When it is summer in the north, it is winter in the south, and the other way around."]
    ], ["Think about Earth's tilt, not distance.", "Tilted toward the Sun is summer. Tilted away is winter.", "Example: when the north tilts toward the Sun, the north has summer. Now try yours."], [
      ["Seasons happen because Earth is...", "Tilted", "Square", "Flat"], ["When the north tilts toward the Sun, the north has...", "Summer", "Winter"],
      ["When it is summer in the north, the south has...", "Winter", "Summer"], ["Summer days are...", "Longer", "Shorter"],
      ["Seasons are NOT caused by...", "Earth being close to or far from the Sun", "The tilt of Earth", "Earth orbiting the Sun"], ["Earth's tilt stays pointed in about the same direction while Earth...", "Orbits the Sun", "Stands still"],
      ["Winter in the north has days that are...", "Shorter", "Longer"], ["One full set of seasons takes about...", "A year", "A week", "A day"]
    ]),
    les("The solar system", [
      ["The Sun and planets", "☀️", "The Sun is a star at the center. Eight planets orbit it: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune."],
      ["Rocky and giant", "🪐", "The four inner planets are small and rocky. Jupiter and Saturn are huge gas giants. Uranus and Neptune are icy giants."],
      ["Fun facts", "⭐", "Mercury is closest to the Sun. Jupiter is the biggest planet. Saturn has bright rings. Mars looks red."]
    ], ["Remember the order outward from the Sun.", "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.", "Example: the planet right after Earth, going outward, is the one that looks red. Now try yours."], [
      ["Which planet is closest to the Sun?", "Mercury", "Neptune", "Earth"], ["Which is the biggest planet?", "Jupiter", "Mars", "Venus"],
      ["Which planet is famous for its rings?", "Saturn", "Mercury", "Earth"], ["The red planet is...", "Mars", "Venus", "Jupiter"],
      ["Earth is the ___ planet from the Sun.", "Third", "First", "Fifth"], ["Which is a gas giant?", "Jupiter", "Mercury", "Mars"],
      ["The Sun is a...", "Star", "Planet", "Moon"], ["Which is the farthest planet from the Sun?", "Neptune", "Mars", "Saturn"]
    ])
  ];
  h.push(
    mix("Mixed practice", at(h, [0, 3, 4, 6, 8, 10, 13, 15])),
    mix("Level 8 Challenge", at(h, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 9 =================
  const k = [
    les("Newton's three laws", [
      ["First law", "🛑", "<b>First law</b>: an object keeps its motion (stays still or moves straight at the same speed) unless a force acts on it. This is inertia."],
      ["Second law", "🏋️", "<b>Second law</b>: a bigger force makes a bigger change in motion. A bigger mass makes a smaller change for the same force."],
      ["Third law", "🚀", "<b>Third law</b>: forces come in pairs. If A pushes B, then B pushes A equally the other way."]
    ], ["Decide which idea fits: keeps moving, depends on mass, or comes in pairs.", "First = inertia. Second = force, mass and change in motion. Third = action and reaction.", "Example: a rocket pushing gas down while the gas pushes it up is the third law. Now try yours."], [
      ["A hockey puck keeps sliding until friction slows it. This is Newton's...", "First law", "Second law", "Third law"], ["A balloon shoots forward as air rushes out the back. This is Newton's...", "Third law", "First law", "Second law"],
      ["It is harder to push a full cart than an empty one. This fits Newton's...", "Second law", "Third law", "First law"], ["Newton's first law is also called the law of...", "Inertia", "Gravity", "Light"],
      ["A bigger force on the same object gives a ___ change in motion.", "Bigger", "Smaller"], ["Newton's third law says forces come in...", "Equal and opposite pairs", "Single forces", "Threes"],
      ["A passenger lurches forward when a car brakes. This is Newton's...", "First law", "Third law", "Second law"], ["Kicking a football hard makes it go faster than a gentle tap. This fits Newton's...", "Second law", "First law", "Third law"]
    ]),
    les("Force and acceleration", [
      ["Acceleration", "🏎️", "<b>Acceleration</b> is how quickly speed changes. Speeding up, slowing down and turning are all acceleration."],
      ["Bigger force", "💪", "For the same object, a bigger force gives a bigger acceleration."],
      ["Bigger mass", "🚚", "For the same force, a bigger mass gives a smaller acceleration. A full truck speeds up slowly."]
    ], ["Think about both the force and the mass.", "More force means more acceleration. More mass means less acceleration.", "Example: pushing a big box and a small box with the same force makes the small box speed up more. Now try yours."], [
      ["Same push on a toy car and a real car. Which speeds up more?", "The toy car", "The real car"], ["Doubling the force on an object makes its acceleration...", "Bigger", "Smaller", "The same"],
      ["Acceleration is how quickly your ___ changes.", "Speed", "Color", "Size"], ["Which is an acceleration?", "A car slowing down at a red light", "A car parked still", "A car cruising at constant speed in a straight line"],
      ["A heavier cart with the same push has ___ acceleration.", "Less", "More"], ["A rocket gets lighter as fuel burns, so with the same thrust its acceleration gets...", "Bigger", "Smaller"],
      ["Moving at a steady speed in a straight line means acceleration is...", "Zero", "Large"], ["Which needs the biggest force to speed up quickly?", "A loaded truck", "A bicycle", "A skateboard"]
    ]),
    num("Weight in newtons", [
      ["Rule of thumb", "⚖️", "On Earth, each kilogram weighs about <b>10 newtons</b>. So weight (N) is about mass (kg) x 10."],
      ["Example", "🎒", "A 3 kg bag has a weight of about 3 x 10 = 30 N."],
      ["Backwards", "🔁", "To find mass from weight, divide the weight by 10."]
    ], () => {
      const m = ri(2, 15);
      return pick([
        { text: `A ${m} kg backpack is on Earth. About what is its weight in newtons? (Use 10 N per kg.)`, visual: "🎒", answer: m * 10,
          hints: ["Weight is a force in newtons.", "Multiply the mass in kilograms by the number of newtons each kilogram weighs.", "Example: a 4 kg box weighs about 4 x 10 = 40 N. Now do yours."] },
        { text: `A watermelon weighs ${m * 10} N on Earth. What is its mass in kg? (Use 10 N per kg.)`, visual: "🍉", answer: m,
          hints: ["Work backwards from weight to mass.", "Divide the weight by the number of newtons each kilogram weighs.", "Example: a 50 N object has a mass of 50 / 10 = 5 kg. Now do yours."] }
      ]);
    }),
    num("Work", [
      ["Work in physics", "🏗️", "<b>Work</b> is done when a force moves something. Work = force x distance."],
      ["Joules", "⚡", "Work is measured in <b>joules</b> (J). Pushing with 5 N for 3 m does 5 x 3 = 15 J of work."],
      ["No movement, no work", "🧱", "If the thing does not move, no work is done, even if you push hard."]
    ], () => {
      const f = ri(2, 12), d = ri(2, 9);
      return pick([
        { text: `You push a box with a force of ${f} N for ${d} meters. How much work do you do, in joules?`, visual: "📦", answer: f * d,
          hints: ["Work depends on the force and the distance moved.", "Multiply the force by the distance.", "Example: 6 N over 4 m is 6 x 4 = 24 J. Now do yours."] },
        { text: `A crane does ${f * d} J of work lifting a load ${d} meters. What force did it use, in newtons?`, visual: "🏗️", answer: f,
          hints: ["Work is force times distance, so go backwards.", "Divide the work by the distance.", "Example: 40 J over 5 m means a force of 40 / 5 = 8 N. Now do yours."] },
        { text: `A force of ${f} N pushes a sled ${d} meters. How many joules of work is that?`, visual: "🛷", answer: f * d,
          hints: ["Combine the force and how far it moved.", "Multiply the two numbers.", "Example: 3 N for 7 m gives 3 x 7 = 21 J. Now do yours."] }
      ]);
    }),
    num("Power", [
      ["Fast work", "⏱️", "<b>Power</b> is how fast work is done. Power = work / time."],
      ["Watts", "💡", "Power is measured in <b>watts</b> (W). 1 watt = 1 joule per second. If you do 100 J of work in 10 s, your power is 100 / 10 = 10 W."],
      ["Backwards", "🔁", "Work = power x time. Time = work / power."]
    ], () => {
      const p = ri(2, 12), t = ri(2, 9);
      return pick([
        { text: `A motor does ${p * t} J of work in ${t} seconds. What is its power in watts?`, visual: "⚙️", answer: p,
          hints: ["Power measures work per second.", "Divide the work by the time.", "Example: 60 J in 3 s is 60 / 3 = 20 W. Now do yours."] },
        { text: `A ${p} W lamp runs for ${t} seconds. How many joules of energy does it use?`, visual: "💡", answer: p * t,
          hints: ["Each second the lamp uses the same number of joules as its watts.", "Multiply the power by the time.", "Example: a 5 W light for 6 s uses 5 x 6 = 30 J. Now do yours."] },
        { text: `A machine with a power of ${p} W does ${p * t} J of work. How many seconds does it take?`, visual: "⏲️", answer: t,
          hints: ["The machine does a fixed amount of work every second.", "Divide the work by the power.", "Example: 40 J at 8 W takes 40 / 8 = 5 s. Now do yours."] }
      ]);
    }),
    num("Levers and advantage", [
      ["Mechanical advantage", "⚖️", "A lever's <b>mechanical advantage</b> tells how much it multiplies your force. For a lever: effort arm length / load arm length."],
      ["Example", "🔧", "If the effort arm is 90 cm and the load arm is 30 cm, the advantage is 90 / 30 = 3. A 10 N push can then lift a 30 N load."],
      ["Trade", "↕️", "A bigger advantage means less force, but you have to move your end farther."]
    ], () => {
      const m = ri(2, 6), l = pick([10, 15, 20, 25, 30]), f = ri(3, 12);
      return pick([
        { text: `A lever has an effort arm of ${l * m} cm and a load arm of ${l} cm. What is its mechanical advantage?`, visual: "🔧", answer: m,
          hints: ["Compare the two arm lengths.", "Divide the effort arm length by the load arm length.", "Example: arms of 80 cm and 20 cm give 80 / 20 = 4. Now do yours."] },
        { text: `A lever has a mechanical advantage of ${m}. You push with ${f} N. How big a load, in newtons, can it lift?`, visual: "⚖️", answer: f * m,
          hints: ["The lever multiplies your force.", "Multiply your force by the mechanical advantage.", "Example: advantage 3 and a 7 N push lifts 3 x 7 = 21 N. Now do yours."] }
      ]);
    }),
    les("Energy conservation", [
      ["Two kinds", "🎢", "<b>Kinetic energy</b> is energy of movement. <b>Gravitational potential energy</b> is stored energy from being high up. Higher or heavier means more potential energy."],
      ["Swapping", "🔁", "At the top of a roller coaster hill, most of the energy is potential. Going down, it changes into kinetic energy and the cars speed up."],
      ["Conservation", "♾️", "Energy is never created or destroyed. It only changes form. Some turns into heat and sound because of friction."]
    ], ["Ask: is the thing high up or is it moving fast?", "High means stored energy. Fast means kinetic energy. Total energy is conserved.", "Example: a ball at the top of a ramp has stored energy that becomes movement as it rolls down. Now try yours."], [
      ["At the top of a hill, a roller coaster has the most...", "Potential energy", "Kinetic energy"], ["At the bottom of a hill, a roller coaster is going fastest and has the most...", "Kinetic energy", "Potential energy"],
      ["Energy cannot be...", "Created or destroyed", "Changed", "Moved"], ["A pendulum at its highest point has the most...", "Potential energy", "Kinetic energy"],
      ["A faster object has ___ kinetic energy.", "More", "Less"], ["A heavier object lifted to the same height has ___ potential energy.", "More", "Less"],
      ["Where does some energy go when a bike brakes?", "Into heat", "It vanishes", "Into mass"], ["A falling apple changes potential energy into...", "Kinetic energy", "Magnetic energy"]
    ]),
    num("Efficiency", [
      ["Useful and wasted", "♻️", "A machine does not turn all its energy into what we want. Some becomes wasted heat or sound."],
      ["The percentage", "📊", "<b>Efficiency</b> = useful energy out / total energy in x 100%. A bulb that turns 50 J into 10 J of light is 10 / 50 x 100 = 20% efficient."],
      ["Better machines", "💡", "LED bulbs waste less as heat than old filament bulbs, so they are more efficient."]
    ], () => {
      const tot = pick([10, 20, 50, 100, 200]), pct = pick([10, 20, 25, 40, 50, 60, 75, 80].filter(x => (tot * x) % 100 === 0));
      return pick([
        { text: `A machine takes in ${tot} J of energy and gives out ${tot * pct / 100} J of useful energy. What is its efficiency as a percent?`, visual: "⚙️", answer: pct,
          hints: ["Compare the useful energy with the total energy.", "Divide useful energy by total energy, then multiply by 100.", "Example: 40 J useful out of 50 J in is 40 / 50 x 100 = 80%. Now do yours."] },
        { text: `A device is ${pct}% efficient and takes in ${tot} J. How many joules of useful energy does it give out?`, visual: "🔋", answer: tot * pct / 100,
          hints: ["Efficiency tells what share of the energy is useful.", "Find that percent of the energy that goes in.", "Example: 50% of 80 J is 40 J. Now do yours."] }
      ]);
    }),
    les("Kinds of waves", [
      ["Transverse", "〰️", "In a <b>transverse</b> wave, the wiggle is at right angles to the direction the wave travels. Water ripples and light are transverse."],
      ["Longitudinal", "🪀", "In a <b>longitudinal</b> wave, the wiggle goes back and forth along the direction of travel. Sound is longitudinal, with squashed and stretched parts."],
      ["Need matter?", "🌌", "Sound needs matter (air, water or solid) to travel. Light does not, so it can cross empty space."]
    ], ["Think about which way the wiggle goes compared with the way the wave travels.", "Sideways wiggle = transverse. Back-and-forth along the path = longitudinal.", "Example: shaking a rope up and down sends a transverse wave along it. Now try yours."], [
      ["Sound is a ___ wave.", "Longitudinal", "Transverse"], ["Light is a ___ wave.", "Transverse", "Longitudinal"],
      ["Which can travel through empty space?", "Light", "Sound"], ["A wave on a rope shaken up and down is...", "Transverse", "Longitudinal"],
      ["Sound cannot travel through...", "A vacuum", "Water", "Steel"], ["Water surface ripples are mostly...", "Transverse", "Longitudinal"],
      ["In a longitudinal wave, the wiggle goes...", "Back and forth along the wave's path", "Up and down across the path"], ["Sunlight reaches Earth through space because light...", "Does not need matter", "Needs air"]
    ]),
    num("Wave speed", [
      ["The wave equation", "🌊", "<b>Wave speed = frequency x wavelength</b>. Frequency is in hertz (Hz) and wavelength is in meters."],
      ["Example", "📻", "A wave with a frequency of 5 Hz and a wavelength of 2 m moves at 5 x 2 = 10 m per second."],
      ["Backwards", "🔁", "Frequency = speed / wavelength. Wavelength = speed / frequency."]
    ], () => {
      const f = ri(2, 10), w = ri(2, 9);
      return pick([
        { text: `A wave has a frequency of ${f} Hz and a wavelength of ${w} m. What is its speed in meters per second?`, visual: "🌊", answer: f * w,
          hints: ["Use the wave equation.", "Multiply the frequency by the wavelength.", "Example: 4 Hz and 3 m gives 4 x 3 = 12 m/s. Now do yours."] },
        { text: `A wave travels at ${f * w} m/s with a wavelength of ${w} m. What is its frequency in Hz?`, visual: "📶", answer: f,
          hints: ["Work backwards from speed.", "Divide the speed by the wavelength.", "Example: 24 m/s and a wavelength of 6 m gives 24 / 6 = 4 Hz. Now do yours."] },
        { text: `A wave travels at ${f * w} m/s with a frequency of ${f} Hz. What is its wavelength in meters?`, visual: "〰️", answer: w,
          hints: ["Work backwards from speed.", "Divide the speed by the frequency.", "Example: 30 m/s at 5 Hz gives 30 / 5 = 6 m. Now do yours."] }
      ]);
    }),
    les("Electromagnetic spectrum", [
      ["Family of waves", "🌈", "Light is part of a family of waves called the <b>electromagnetic spectrum</b>. They all travel at the speed of light in space, about 300,000 km per second."],
      ["The order", "📡", "From long waves to short waves: radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays."],
      ["Uses", "📱", "Radio carries TV and phone signals. Microwaves heat food. Infrared is felt as heat. Ultraviolet causes sunburn. X-rays see bones."]
    ], ["Remember the order from long waves to short waves.", "Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.", "Example: infrared is what a heat lamp gives off. Now try yours."], [
      ["Which waves can we see?", "Visible light", "X-rays", "Radio waves"], ["Which waves have the longest wavelength?", "Radio waves", "Gamma rays", "X-rays"],
      ["Doctors use ___ to see bones.", "X-rays", "Radio waves", "Microwaves"], ["Too much ___ from the Sun can cause sunburn.", "Ultraviolet", "Radio waves", "Infrared"],
      ["A microwave oven uses...", "Microwaves", "X-rays", "Gamma rays"], ["Heat lamps give off...", "Infrared", "Ultraviolet", "X-rays"],
      ["All electromagnetic waves travel through space at the speed of...", "Light", "Sound", "A car"], ["Which is between infrared and ultraviolet?", "Visible light", "Radio waves", "Gamma rays"]
    ]),
    les("Curved mirrors", [
      ["Flat mirror", "🪞", "A flat (plane) mirror makes an image the same size, flipped left to right."],
      ["Concave mirror", "🔦", "A <b>concave</b> mirror curves inward like a bowl. It brings light together. It is used in flashlight reflectors, car headlights and telescopes."],
      ["Convex mirror", "🚗", "A <b>convex</b> mirror curves outward. It spreads light out and shows a wide view. It is used in shop security mirrors and on the passenger side of cars."]
    ], ["Picture a bowl shape (concave) or a bulging shape (convex).", "Concave gathers light. Convex gives a wide view.", "Example: a spoon's inside is concave and its back is convex. Now try yours."], [
      ["A mirror curving inward like a bowl is...", "Concave", "Convex", "Plane"], ["A mirror that bulges outward is...", "Convex", "Concave", "Plane"],
      ["Which mirror shows a very wide view?", "Convex", "Concave"], ["Flashlight reflectors are...", "Concave", "Convex"],
      ["A flat mirror makes an image that is...", "The same size, flipped left to right", "Much bigger", "Upside down and tiny"], ["Shop security mirrors are usually...", "Convex", "Concave", "Flat"],
      ["A concave mirror brings light...", "Together", "Apart"], ["Large telescopes can use a ___ mirror to gather light.", "Concave", "Convex"]
    ]),
    les("Atoms", [
      ["Tiny building blocks", "⚛️", "Everything is made of <b>atoms</b>. An atom has a center called the <b>nucleus</b> with <b>protons</b> (positive) and <b>neutrons</b> (no charge)."],
      ["Electrons", "🌀", "<b>Electrons</b> (negative) zoom around the nucleus. An atom usually has equal numbers of protons and electrons, so it has no overall charge."],
      ["Elements", "🧪", "The number of protons decides which <b>element</b> an atom is. Hydrogen has 1 proton, helium 2, carbon 6 and oxygen 8."]
    ], ["Protons and neutrons are in the middle. Electrons are outside.", "Protons are positive, electrons are negative, neutrons have none.", "Example: a carbon atom has 6 protons, so its atomic number is 6. Now try yours."], [
      ["Which particle is positive?", "Proton", "Electron", "Neutron"], ["Which particle is negative?", "Electron", "Proton", "Neutron"],
      ["Which particle has no charge?", "Neutron", "Proton", "Electron"], ["The center of an atom is the...", "Nucleus", "Shell", "Cell"],
      ["How many protons does a hydrogen atom have?", "1", "2", "8"], ["How many protons does an oxygen atom have?", "8", "6", "1"],
      ["A normal atom has no overall charge because it has equal protons and...", "Electrons", "Neutrons only", "Nuclei"], ["What decides which element an atom is?", "Its number of protons", "Its color", "Its weight in grams"]
    ]),
    les("Electrons in wires", [
      ["Current is moving charge", "🔌", "In a metal wire, some electrons are free to move. An <b>electric current</b> is these electrons flowing along the wire."],
      ["The push", "🔋", "A battery pushes the electrons around the circuit. They move from the negative end toward the positive end."],
      ["Why metals work", "🪙", "Metals are good <b>conductors</b> because they have free electrons. Plastic and rubber are <b>insulators</b> because their electrons are stuck."]
    ], ["Think about which particles move in a wire.", "Electrons are free in metals and stuck in insulators.", "Example: copper has free electrons, so wires are made of copper. Now try yours."], [
      ["An electric current in a wire is a flow of...", "Electrons", "Protons", "Neutrons"], ["Which is a good conductor?", "Copper", "Rubber", "Plastic"],
      ["Rubber is a good...", "Insulator", "Conductor"], ["In a circuit, electrons are pushed by the...", "Battery", "Switch only", "Bulb"],
      ["Metals conduct well because they have...", "Free electrons", "No atoms", "Thick skin"], ["Wires are coated in plastic to...", "Keep the current safely inside", "Add more electrons", "Make them heavier"],
      ["Electrons move from the battery's...", "Negative end around to the positive end", "Positive end only", "Middle"], ["Which is an insulator?", "Glass", "Iron", "Silver"]
    ]),
    num("Electric power", [
      ["Power rule", "🔌", "<b>Power = voltage x current</b>, or P = V x I. Power is in watts, voltage in volts and current in amps."],
      ["Example", "💡", "A lamp on a 12 V supply drawing 2 A uses 12 x 2 = 24 W."],
      ["Backwards", "🔁", "Current = power / voltage. Voltage = power / current."]
    ], () => {
      const v = pick([5, 6, 9, 10, 12, 20]), i = ri(2, 8);
      return pick([
        { text: `A device on a ${v} V supply draws ${i} A. What is its power in watts?`, visual: "🔌", answer: v * i,
          hints: ["Power links volts and amps.", "Multiply the voltage by the current.", "Example: 10 V and 3 A gives 10 x 3 = 30 W. Now do yours."] },
        { text: `A ${v * i} W heater works on a ${v} V supply. What current does it draw, in amps?`, visual: "🔥", answer: i,
          hints: ["Work backwards from power.", "Divide the power by the voltage.", "Example: 60 W on 12 V draws 60 / 12 = 5 A. Now do yours."] }
      ]);
    }),
    num("Pressure", [
      ["The rule", "👠", "<b>Pressure = force / area</b>. When force is in newtons (N) and area is in square meters (m²), pressure is in <b>pascals</b> (Pa)."],
      ["Example", "📌", "100 N spread over 5 m² gives 100 / 5 = 20 Pa."],
      ["Smaller area", "🔽", "The same force on a smaller area gives a larger pressure."]
    ], () => {
      const a = ri(2, 9), p = ri(2, 12);
      return pick([
        { text: `A force of ${a * p} N pushes on an area of ${a} m². What is the pressure in pascals?`, visual: "🔽", answer: p,
          hints: ["Pressure is force spread over area.", "Divide the force by the area.", "Example: 60 N on 3 m² gives 60 / 3 = 20 Pa. Now do yours."] },
        { text: `A pressure of ${p} Pa acts on an area of ${a} m². What is the total force in newtons?`, visual: "💪", answer: p * a,
          hints: ["Force is the pressure on every square meter added up.", "Multiply the pressure by the area.", "Example: 8 Pa on 5 m² gives 8 x 5 = 40 N. Now do yours."] }
      ]);
    }),
    les("Falling and throwing", [
      ["Falling together", "⬇️", "Without air resistance, all objects fall with the same acceleration, so a heavy ball and a light ball land together."],
      ["Thrown sideways", "🏐", "A ball thrown sideways keeps moving sideways while gravity pulls it down. It follows a curved path. A ball dropped at the same moment from the same height lands at the same time."],
      ["Best angle", "📐", "Ignoring air resistance, throwing at about 45 degrees sends something the farthest."]
    ], ["Think about gravity pulling down the whole time.", "Gravity pulls all objects down equally. Sideways motion does not change the fall time.", "Example: a feather and a hammer dropped on the Moon land together because there is no air. Now try yours."], [
      ["Without air, a heavy ball and a light ball dropped together land...", "At the same time", "Heavy one first", "Light one first"], ["A ball thrown sideways and one dropped from the same height land...", "At the same time", "The thrown one later", "The dropped one later"],
      ["The path of a thrown ball is a...", "Curve", "Straight line forever", "Circle"], ["Which angle sends a ball farthest (no air)?", "About 45 degrees", "Straight up", "Flat sideways"],
      ["A feather falls slowly on Earth because of...", "Air resistance", "A smaller gravity", "Magnetism"], ["What pulls a thrown ball down?", "Gravity", "Wind only", "Sound"],
      ["At the very top of a ball thrown straight up, its up-and-down speed is...", "Zero for a moment", "Biggest", "Doubled"], ["A skydiver stops speeding up when air resistance...", "Equals their weight", "Becomes zero", "Pulls sideways"]
    ]),
    les("Stars and light-years", [
      ["Stars are suns", "⭐", "Stars are huge balls of hot glowing gas. The Sun is our nearest star. Other stars look tiny because they are very far away."],
      ["Light-year", "🌌", "A <b>light-year</b> is a distance, not a time. It is how far light travels in one year, about 9.5 trillion kilometers."],
      ["Light takes time", "⏳", "Light from the Sun takes about 8 minutes to reach us. The next nearest star, Proxima Centauri, is about 4 light-years away."]
    ], ["A light-year is about distance.", "Light is very fast but space is huge.", "Example: light from the Moon takes only about a second to reach us because the Moon is close. Now try yours."], [
      ["A light-year measures...", "Distance", "Time", "Brightness"], ["Our nearest star is the...", "Sun", "Moon", "Polaris"],
      ["Light from the Sun takes about ___ to reach Earth.", "8 minutes", "8 seconds", "8 days"], ["Stars look tiny because they are...", "Very far away", "Very small compared with planets", "Made of ice"],
      ["Stars are made mostly of hot...", "Gas", "Rock", "Water"], ["Our galaxy is called the...", "Milky Way", "Big Dipper", "Solar system"],
      ["Light travels about ___ km per second.", "300,000", "300", "30"], ["Light from a star 10 light-years away left it...", "10 years ago", "10 minutes ago", "10 seconds ago"]
    ])
  ];
  k.push(
    mix("Mixed practice", at(k, [0, 2, 3, 5, 8, 10, 13, 16])),
    mix("Level 9 Challenge", at(k, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 7: g, 8: h, 9: k });
})();
