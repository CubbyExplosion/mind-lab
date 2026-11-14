// ext/physics-16-18.js  Physics levels 16-18 (7th grade second half, 8th grade)
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

  // ================= LEVEL 16 =================
  const a = [
    les("Speed-time graphs", [
      ["Reading the line", "📈", "On a <b>speed-time graph</b>, time goes along the bottom and speed goes up the side. A line that slopes <b>up</b> means speeding up. A <b>flat</b> line means steady speed. A line sloping <b>down</b> means slowing down."],
      ["Steepness", "⛰️", "The <b>steeper</b> the line, the bigger the acceleration. A flat line on the zero level means the object is not moving at all."],
      ["Area", "🟦", "The area under the line is the <b>distance travelled</b>. This is different from a distance-time graph, where a flat line means standing still."]
    ], ["Look at which way the line goes: up, flat or down.", "Remember the axes: the side shows speed, not distance. Ask yourself what the speed is doing.", "Example: a line that rises and then stays flat means speeding up and then keeping steady. Now do yours."], [
      ["On a speed-time graph, a flat line above zero means the object is...", "Moving at a steady speed", "Standing still", "Speeding up"],
      ["A line sloping upwards means the object is...", "Speeding up", "Slowing down", "Moving at steady speed"],
      ["A line sloping downwards means the object is...", "Slowing down", "Speeding up", "Going backwards"],
      ["A flat line lying exactly on the zero speed level means the object is...", "Stopped", "Moving fast", "Speeding up"],
      ["Which line shows the larger acceleration?", "The steeper line", "The flatter line", "The longer line"],
      ["The area under a speed-time graph gives the...", "Distance travelled", "Mass", "Temperature"],
      ["A cyclist's line goes up, stays flat, then falls to zero. Last, the cyclist is...", "Braking to a stop", "Speeding up", "Cruising"],
      ["Which axis shows speed on a speed-time graph?", "The vertical axis", "The horizontal axis", "Neither axis"]
    ]),
    num("Stopping distances", [
      ["Two parts", "🚗", "A car cannot stop at once. The <b>thinking distance</b> is how far it travels while the driver reacts. The <b>braking distance</b> is how far it travels after the brakes are pressed."],
      ["Add them", "➕", "<b>Stopping distance = thinking distance + braking distance.</b> Faster speeds make both parts longer."],
      ["Longer when...", "🌧️", "Tiredness slows reactions, so thinking distance grows. Wet roads and worn tyres give less grip, so braking distance grows."]
    ], () => {
      const th = ri(6, 21), br = ri(8, 45), tot = th + br;
      return pick([
        { text: `A car travels ${th} m while the driver reacts and ${br} m while braking. What is the stopping distance in metres?`, visual: "🚗", answer: tot,
          hints: ["Stopping distance has two parts.", "Add the thinking distance and the braking distance together.", "Example: 10 m thinking + 20 m braking = 30 m stopping distance. Now do yours."] },
        { text: `The stopping distance is ${tot} m and the thinking distance is ${th} m. What is the braking distance in metres?`, visual: "🛑", answer: br,
          hints: ["The whole is made of two parts. One part is given.", "Take the thinking distance away from the total.", "Example: total 40 m, thinking 12 m, so braking = 40 - 12 = 28 m. Now do yours."] },
        { text: `The stopping distance is ${tot} m and the braking distance is ${br} m. What is the thinking distance in metres?`, visual: "🧠", answer: th,
          hints: ["Total = thinking + braking.", "Take the braking distance away from the total.", "Example: total 35 m, braking 25 m, so thinking = 35 - 25 = 10 m. Now do yours."] }
      ]);
    }),
    les("Terminal velocity", [
      ["Falling faster", "🪂", "When something starts to fall, gravity pulls it down and there is little air resistance. It speeds up. As it gets faster, <b>air resistance</b> (drag) grows."],
      ["Balance", "⚖️", "At last the drag pushing up equals the weight pulling down. The forces are balanced, so there is no more acceleration. The steady top speed is the <b>terminal velocity</b>."],
      ["Changing it", "🧍", "Spreading out your body or opening a parachute increases drag, so the terminal velocity becomes <b>lower</b>. A streamlined dive gives a higher one."]
    ], ["Think about what happens to drag as speed goes up.", "At the terminal velocity the forces are balanced. Which two forces are they?", "Example: a ball on a string pulled equally from both sides does not move, because the two pulls are equal. Now do yours."], [
      ["At terminal velocity, the drag force is...", "Equal to the weight", "Zero", "Bigger than the weight forever"],
      ["At terminal velocity, the skydiver...", "Falls at a steady speed", "Speeds up more and more", "Stops in mid-air"],
      ["As a falling object speeds up, air resistance...", "Increases", "Decreases", "Stays zero"],
      ["Opening a parachute makes the terminal velocity...", "Lower", "Higher", "Exactly the same"],
      ["At the instant a skydiver leaves the plane, the drag is...", "Very small", "Equal to the weight", "Larger than the weight"],
      ["At terminal velocity, the resultant force is...", "Zero", "Pointing down and growing", "Pointing up and growing"],
      ["Which has the higher terminal velocity?", "A diver with arms tucked in, head down", "A diver spread out flat", "A diver under an open parachute"],
      ["On the airless Moon, a falling hammer...", "Keeps speeding up until it lands", "Reaches terminal velocity quickly", "Floats"]
    ]),
    les("Centre of gravity and stability", [
      ["The balance point", "🎯", "The <b>centre of gravity</b> is the point where all the weight seems to act. A uniform ruler balances on your finger at its middle."],
      ["Stable or not", "🔺", "An object stays up while the centre of gravity is above its base. If you tilt it so the centre of gravity moves outside the base, it topples."],
      ["Staying stable", "🏎️", "A <b>low</b> centre of gravity and a <b>wide</b> base make things stable. Racing cars are low and wide. Tall, narrow objects topple more easily."]
    ], ["Think about where the weight is and how wide the bottom is.", "Is the centre of gravity low or high? Is the base wide or narrow?", "Example: a traffic cone is wide at the bottom, so it is hard to knock over. Now do yours."], [
      ["Which is hardest to tip over?", "A wide, low object", "A tall, narrow object", "A tall, thin object on a small base"],
      ["An object topples when its centre of gravity moves...", "Outside its base", "Closer to the middle of its base", "Lower"],
      ["Racing cars are built low and wide to be...", "Stable on corners", "Lighter", "Quieter"],
      ["A double-decker bus is safer if heavy parts are placed...", "Low down", "On the roof", "At the front window"],
      ["A uniform ruler balances on a finger placed at its...", "Middle", "End", "Quarter mark"],
      ["Widening the base of a table makes it...", "More stable", "Less stable", "Heavier only"],
      ["A tightrope walker holds a long pole to help...", "Keep the centre of gravity over the rope", "Pull on the rope", "Make shade"],
      ["Loading heavy boxes on top of a truck makes it...", "More likely to tip", "More stable", "Faster"]
    ]),
    les("Diffusion", [
      ["Spreading out", "🌸", "<b>Diffusion</b> is when particles spread out from where there are lots of them to where there are fewer. A smell spreads across a room because the particles of gas drift everywhere."],
      ["No stirring needed", "💧", "A drop of food colouring in still water slowly spreads until the whole glass is the same colour. The particles move randomly all the time."],
      ["Faster or slower", "🔥", "Diffusion is <b>faster in gases</b> than in liquids, and it is very slow in solids. Heating makes particles move faster, so diffusion speeds up."]
    ], ["Diffusion is about particles moving from crowded places to less crowded places.", "Think about which state of matter has particles that move most freely, and about temperature.", "Example: a spoonful of sugar slowly spreads sweetness in a still cup of tea. Now do yours."], [
      ["Diffusion means particles...", "Spread out from crowded to less crowded places", "Gather into one lump", "Disappear"],
      ["Which diffusion is the fastest?", "In a gas", "In a liquid", "In a solid"],
      ["Perfume sprayed in one corner can be smelled across the room because of...", "Diffusion", "Magnetism", "Reflection"],
      ["Food colouring in still warm water spreads faster than in cold water because particles...", "Move faster when warm", "Stop moving", "Are bigger"],
      ["Particles in a gas or liquid move...", "Randomly all the time", "Only when stirred", "Never"],
      ["Which is the slowest case of diffusion?", "In a solid", "In a gas", "In warm air"],
      ["Pollen grains in water jiggle about because they are hit by...", "Fast-moving water molecules", "Tiny magnets", "Light rays"],
      ["Diffusion goes from where there are...", "Many particles to few particles", "Few particles to many", "Hot to cold only"]
    ]),
    les("Winds and convection", [
      ["Warm air rises", "🎈", "Warm air is less dense than cool air, so it <b>rises</b>. Cool air flows in underneath to take its place. This circulation is a <b>convection current</b>."],
      ["Sea breeze", "🏖️", "In the day, land heats up faster than the sea. Warm air rises over the land and cooler air blows in from the sea: a <b>sea breeze</b>."],
      ["At night", "🌙", "At night the land cools faster than the sea, so the air flows the other way, from land to sea. Wind is a convection current on a big scale."]
    ], ["Warm air rises and cool air sinks.", "Which warms up faster in the day, land or sea? That decides where air rises.", "Example: above a hot radiator the air rises, and cooler air moves in at the bottom. Now do yours."], [
      ["Warm air rises because it is...", "Less dense", "More dense", "Magnetic"],
      ["In the day, a sea breeze blows from the...", "Sea to the land", "Land to the sea", "Sky to the sea"],
      ["During the day the land becomes warmer than the sea because land...", "Heats up faster", "Heats up slower", "Reflects all heat"],
      ["At night, the wind near a coast often blows...", "From the land to the sea", "From the sea to the land", "Straight upwards"],
      ["Convection can happen in...", "Liquids and gases", "Solids only", "A vacuum"],
      ["Cool air near the ground moves towards a hot patch of ground and...", "Replaces the rising warm air", "Stops moving", "Turns into a liquid"],
      ["A hot air balloon rises because the air inside it is...", "Warmer and less dense than the air outside", "Colder and denser", "Heavier"],
      ["A kettle heats water well because the hot water at the bottom...", "Rises and sets up convection", "Stays at the bottom", "Turns into ice"]
    ]),
    les("The greenhouse effect", [
      ["Warm blanket", "🌍", "The Sun's light warms the ground. The ground sends out heat as infrared. Gases like <b>carbon dioxide</b>, <b>methane</b> and <b>water vapour</b> absorb some of it and keep the Earth warm."],
      ["We need it", "🌡️", "Without any greenhouse effect, Earth would be a frozen place. A natural amount keeps life comfortable."],
      ["Too much", "🏭", "Burning coal, oil and gas adds more carbon dioxide, so the Earth warms more. Trees take in carbon dioxide. Venus has a very thick carbon dioxide atmosphere and is hotter than Mercury."]
    ], ["The gases act like a blanket around the Earth.", "Think about which gases hold in heat, and about what adds extra of them.", "Example: a car parked in the sun gets warm inside because the glass lets sunlight in and keeps heat from leaving. Now do yours."], [
      ["Which of these is a greenhouse gas?", "Carbon dioxide", "Argon", "Helium"],
      ["Greenhouse gases keep the Earth warm by...", "Absorbing some heat given out by the ground", "Making the Sun hotter", "Cooling the Sun's light"],
      ["Burning fossil fuels adds extra...", "Carbon dioxide", "Argon", "Gold"],
      ["Without the natural greenhouse effect, Earth would be...", "Much colder", "Much hotter", "The same"],
      ["Which living things take in carbon dioxide from the air?", "Plants and trees", "Rocks", "Clouds"],
      ["Venus is very hot mainly because of its thick atmosphere of...", "Carbon dioxide", "Oxygen", "Helium"],
      ["Methane, water vapour and carbon dioxide are all...", "Greenhouse gases", "Metals", "Fuels that never burn"],
      ["Planting more forests helps because trees...", "Absorb carbon dioxide", "Make carbon dioxide", "Block the Sun's heat forever"]
    ]),
    num("Charge and current", [
      ["Charge", "⚡", "Electric <b>charge</b> is measured in <b>coulombs</b> (C). A current is charge flowing past a point each second: <b>1 ampere = 1 coulomb per second</b>."],
      ["The formula", "🧮", "<b>Charge = current x time</b> (Q = I x t). A current of 3 A for 4 s moves 3 x 4 = 12 C."],
      ["Rearranging", "🔁", "Current I = Q / t. Time t = Q / I."]
    ], () => {
      const I = ri(1, 6), t = ri(2, 12), Q = I * t;
      return pick([
        { text: `A current of ${I} A flows for ${t} s. How many coulombs of charge pass?`, visual: "⚡", answer: Q,
          hints: ["Charge is how much flows in total.", "Multiply the current by the time in seconds.", "Example: 2 A for 5 s gives 2 x 5 = 10 C. Now do yours."] },
        { text: `${Q} C of charge pass a point in ${t} s. What is the current in amperes?`, visual: "🔌", answer: I,
          hints: ["Current is charge per second.", "Divide the charge by the time.", "Example: 20 C in 4 s is 20 / 4 = 5 A. Now do yours."] },
        { text: `A current of ${I} A moves ${Q} C of charge. For how many seconds did it flow?`, visual: "⏱️", answer: t,
          hints: ["Time = how much charge in total, shared out per second.", "Divide the charge by the current.", "Example: 18 C at 3 A takes 18 / 3 = 6 s. Now do yours."] }
      ]);
    }),
    les("Using meters", [
      ["Ammeter", "🔢", "An <b>ammeter</b> measures current in amperes. It goes <b>in series</b> in the circuit, so the current flows through it."],
      ["Voltmeter", "📟", "A <b>voltmeter</b> measures voltage in volts. It goes <b>in parallel</b>, across the part you want to measure, like a side branch."],
      ["Good meters", "✅", "A good ammeter has very low resistance and a good voltmeter has very high resistance, so neither changes the circuit much."]
    ], ["Series means in the same loop. Parallel means across a part.", "Which meter needs the current to go through it, and which only needs to compare two points?", "Example: a water flow meter goes in the pipe, but a pressure gauge connects across a part. Now do yours."], [
      ["An ammeter is connected...", "In series", "In parallel", "Not connected at all"],
      ["A voltmeter is connected...", "In parallel across the part", "In series", "In a separate loop"],
      ["An ammeter measures...", "Current", "Voltage", "Resistance directly"],
      ["A voltmeter measures...", "Voltage", "Current", "Mass"],
      ["The unit of current is the...", "Ampere", "Volt", "Ohm"],
      ["A good voltmeter has a very...", "High resistance", "Low resistance", "Zero reading"],
      ["A good ammeter has a very...", "Low resistance", "High resistance", "Loud sound"],
      ["To find the voltage across a bulb, put the voltmeter...", "Across the bulb", "In line with the bulb", "Next to the battery's label"]
    ]),
    les("Thermistors and diodes", [
      ["Thermistor", "🌡️", "A <b>thermistor</b> is a resistor whose resistance changes with temperature. In the common kind, resistance <b>falls</b> as it gets hotter. They are used in thermostats and fire alarms."],
      ["Diode", "➡️", "A <b>diode</b> lets current flow in <b>one direction only</b>. An <b>LED</b> is a diode that also gives out light."],
      ["Remember the LDR", "💡", "An LDR (light-dependent resistor) has high resistance in the dark and low resistance in bright light. These parts are called components."]
    ], ["Each part reacts to something: heat, light or the direction of current.", "Think about which component is sensitive to temperature, and which is one-way.", "Example: a one-way street lets cars through in one direction only. Now do yours."], [
      ["A diode lets current flow...", "In one direction only", "In both directions", "Only when it is cold"],
      ["For a common thermistor, resistance as it gets hotter...", "Goes down", "Goes up", "Stays the same"],
      ["A thermistor is a good part for a...", "Thermostat", "Torch lens", "Magnet"],
      ["An LED is a diode that also...", "Gives out light", "Makes sound", "Stores heat"],
      ["If a diode is connected the wrong way round, current...", "Does not flow", "Flows twice as fast", "Flows backwards"],
      ["An LDR has low resistance in...", "Bright light", "Darkness", "A vacuum"],
      ["Which component helps a street light switch on at dusk?", "LDR", "Diode", "Thermistor"],
      ["Which component's resistance depends on temperature?", "Thermistor", "LDR", "Diode"]
    ]),
    num("Energy flow diagrams", [
      ["Sankey diagrams", "🌊", "A <b>Sankey diagram</b> uses arrows to show how energy flows. The wider the arrow, the more energy. The arrow going in is split into <b>useful</b> and <b>wasted</b> arrows."],
      ["Adding up", "➕", "<b>Energy in = useful energy out + wasted energy out.</b> No energy is lost; it all goes somewhere."],
      ["Example", "💡", "A lamp takes in 100 J. If 20 J becomes light and 80 J is heat, the diagram has a thin useful arrow and a fat wasted arrow."]
    ], () => {
      const inp = pick([80, 100, 200, 400]), pct = pick([20, 25, 40, 50, 60, 75]), use = inp * pct / 100, was = inp - use;
      return pick([
        { text: `A machine takes in ${inp} J. Useful energy out is ${use} J. How many joules are wasted?`, visual: "⚙️", answer: was,
          hints: ["Energy is conserved, so the numbers must add up.", "Take the useful energy away from the energy going in.", "Example: 50 J in and 30 J useful leaves 50 - 30 = 20 J wasted. Now do yours."] },
        { text: `A machine wastes ${was} J as heat and gives ${use} J of useful energy. How many joules went in?`, visual: "🔌", answer: inp,
          hints: ["Input = useful + wasted.", "Add the useful and wasted energy.", "Example: 15 J useful + 25 J wasted = 40 J input. Now do yours."] },
        { text: `A machine takes in ${inp} J and wastes ${was} J. How many joules of useful energy come out?`, visual: "💡", answer: use,
          hints: ["Input is split into useful and wasted parts.", "Take the wasted energy away from the input.", "Example: 60 J in and 45 J wasted gives 60 - 45 = 15 J useful. Now do yours."] }
      ]);
    }),
    les("Room acoustics", [
      ["Hard and soft", "🏛️", "Hard, flat surfaces such as tiles and bare walls <b>reflect</b> sound. Soft materials such as curtains, carpets and foam <b>absorb</b> it."],
      ["Reverberation", "🔊", "In a bare room, sound bounces around and the reflections blur together. This is <b>reverberation</b>, or echoey sound. Soft furnishings reduce it."],
      ["Designing rooms", "🎙️", "Recording studios use foam panels to absorb sound. Concert halls use shaped panels to spread the sound evenly."]
    ], ["Think about whether each surface bounces sound or soaks it up.", "Hard and smooth surfaces behave differently from soft and bumpy ones.", "Example: a shout in an empty tiled bathroom sounds echoey, but not in a room full of cushions. Now do yours."], [
      ["Which material absorbs sound best?", "Thick curtains", "Bare glass", "Polished tiles"],
      ["A room with bare walls and floor usually sounds...", "Echoey", "Very quiet and dead", "Dark"],
      ["Adding carpets and sofas to an empty room makes echoes...", "Weaker", "Stronger", "Unchanged"],
      ["Why do recording studios use foam panels?", "To absorb sound", "To make sound louder", "To reflect sound"],
      ["Hard, smooth surfaces mostly...", "Reflect sound", "Absorb sound", "Make sound"],
      ["Reverberation is caused by...", "Sound reflecting many times", "Sound turning into light", "Sound getting hotter"],
      ["An empty hall sounds more echoey than a full hall because the audience...", "Absorbs sound", "Reflects sound", "Makes more sound"],
      ["Egg-box shaped panels on a wall help to...", "Break up and absorb reflections", "Make walls waterproof", "Keep sound in a straight line"]
    ]),
    num("Percentage error", [
      ["How far off?", "🎯", "A measurement can differ from the true value. The <b>error</b> is the gap between them (ignore the sign)."],
      ["Percent error", "💯", "<b>Percentage error = error / true value x 100.</b> A true length of 50 cm measured as 46 cm has an error of 4 cm, so 4 / 50 x 100 = 8%."],
      ["Why use it", "⚖️", "Percentages let us compare accuracy fairly: a 1 cm error matters a lot on 10 cm but little on 1000 cm."]
    ], () => {
      let tr, p, e;
      do { tr = pick([20, 40, 50, 80, 100, 200]); p = pick([2, 5, 10, 20, 25]); e = tr * p / 100; } while (e !== Math.floor(e));
      const meas = Math.random() < 0.5 ? tr + e : tr - e;
      return { text: `The true value of a mass is ${tr} g. A student measures ${meas} g. What is the percentage error? (give the number only)`, visual: "⚖️", answer: p,
        hints: ["First find the size of the error, the gap between measured and true.", "Divide the error by the TRUE value, then multiply by 100.", "Example: true 40, measured 42, error 2, so 2 / 40 x 100 = 5 percent. Now do yours."] };
    }),
    les("The life of a star", [
      ["Birth", "☁️", "Stars are born in giant clouds of gas and dust called <b>nebulae</b>. Gravity pulls the gas together until it gets hot enough for fusion to start."],
      ["Main sequence", "☀️", "A star spends most of its life fusing hydrogen into helium. Our Sun is in this stable stage and has about 5 billion years of it left."],
      ["The end", "🌟", "A star like the Sun swells into a <b>red giant</b>, then shrinks to a <b>white dwarf</b>. A much more massive star becomes a red supergiant, explodes as a <b>supernova</b>, and leaves a neutron star or black hole."]
    ], ["Think of the stages in order: birth, long stable life, then the end.", "The mass of the star decides how it ends.", "Example: the stages of a butterfly come in a fixed order too. Now do yours."], [
      ["Stars are born in a...", "Nebula", "Comet", "Moon crater"],
      ["Which force pulls the gas together to form a star?", "Gravity", "Friction", "Magnetism"],
      ["The Sun is in which stage?", "Main sequence", "Red giant", "White dwarf"],
      ["A star like the Sun ends up as a...", "White dwarf", "Supernova", "Nebula again right away"],
      ["Which comes after the main sequence for a Sun-like star?", "Red giant", "Protostar", "Nebula"],
      ["A very massive star ends its life with a...", "Supernova", "Gentle fading only", "Planetary orbit"],
      ["During the main sequence, a star mainly fuses...", "Hydrogen into helium", "Iron into gold", "Water into ice"],
      ["Stars shine because of...", "Nuclear fusion in their cores", "Burning wood", "Reflecting other stars"]
    ]),
    les("Comets and asteroids", [
      ["Asteroids", "🪨", "<b>Asteroids</b> are rocky lumps left over from the formation of the solar system. Most orbit in the <b>asteroid belt</b> between Mars and Jupiter."],
      ["Comets", "☄️", "<b>Comets</b> are icy 'dirty snowballs'. Near the Sun the ice turns to gas and makes a glowing tail that always points <b>away</b> from the Sun."],
      ["Shooting stars", "🌠", "A <b>meteor</b> is the streak of light made when a small bit of space rock burns up in our atmosphere. If a piece lands on the ground it is called a <b>meteorite</b>."]
    ], ["Think about what each object is made of and where it orbits.", "Comets are icy and asteroids are rocky.", "Example: a snowball melts near a fire, but a stone does not. Now do yours."], [
      ["Which is mostly rock?", "An asteroid", "A comet", "A cloud"],
      ["Which is mostly ice and dust?", "A comet", "An asteroid", "A meteorite"],
      ["The asteroid belt lies between the orbits of...", "Mars and Jupiter", "Earth and the Moon", "Saturn and Neptune"],
      ["A comet's tail points...", "Away from the Sun", "Towards the Sun", "Down to the ground"],
      ["The streak of light of a 'shooting star' is a...", "Meteor", "Comet", "Planet"],
      ["A space rock that lands on Earth is a...", "Meteorite", "Meteor", "Asteroid belt"],
      ["A comet grows a tail near the Sun because its ice...", "Turns to gas", "Freezes harder", "Turns to metal"],
      ["Halley's Comet comes back about every...", "76 years", "7 days", "1000 years"]
    ]),
    les("Making estimates", [
      ["Good guesses", "🧠", "Scientists often <b>estimate</b> before they measure. A good estimate is the right size: not exact, but the right order of magnitude."],
      ["Know some anchors", "📏", "A door is about 2 m high. A walking person goes about 1.5 m/s. Room temperature is about 20 °C. A litre of water has a mass of about 1 kg."],
      ["Check it", "✅", "After you estimate, ask: does this answer make sense? A car at 3 m/s or 3000 m/s would clearly be wrong."]
    ], ["Compare with something you know well, like a door or a bottle of water.", "Which choice has a believable size for an everyday thing?", "Example: a teaspoon of sugar has a mass of a few grams, not a few kilograms. Now do yours."], [
      ["The best estimate for the height of a classroom door is...", "2 m", "20 m", "0.2 m"],
      ["The best estimate for a walking speed is...", "1.5 m/s", "15 m/s", "150 m/s"],
      ["The best estimate for the mass of a litre of water is...", "1 kg", "10 kg", "0.01 kg"],
      ["The best estimate for room temperature is...", "20 °C", "2 °C", "200 °C"],
      ["The best estimate for the length of a football pitch is...", "100 m", "10 m", "1000 m"],
      ["The best estimate for the mass of a bicycle is...", "10 kg", "1 kg", "100 kg"],
      ["The best estimate for a car's speed on a motorway is...", "30 m/s", "3 m/s", "300 m/s"],
      ["The best estimate for the time between two heartbeats is...", "1 s", "10 s", "0.01 s"]
    ]),
    les("Thick and runny liquids", [
      ["Viscosity", "🍯", "<b>Viscosity</b> is how much a liquid resists flowing. Honey is very viscous (thick). Water has low viscosity (runny)."],
      ["Temperature", "🔥", "Most liquids flow more easily when <b>warmed</b>, and become thicker when cooled. That is why engine oil is made to work well over a range of temperatures."],
      ["In practice", "🛢️", "Lubricating oil lets machine parts slide with less friction. A ball dropped into a viscous liquid falls slowly, because the drag is large."]
    ], ["Think about how easily the liquid flows or pours.", "Warming and cooling change how thick a liquid is.", "Example: syrup poured straight from the fridge is harder to pour than warm syrup. Now do yours."], [
      ["Which liquid is the most viscous?", "Honey", "Water", "Milk"],
      ["Warming honey makes it...", "Flow more easily", "Flow less easily", "Turn to gas"],
      ["A marble dropped in honey falls...", "Slower than in water", "Faster than in water", "Not at all"],
      ["Viscosity is how much a liquid resists...", "Flowing", "Freezing", "Shining"],
      ["Cooling oil makes it...", "Thicker", "Thinner", "Lighter in colour"],
      ["A liquid with low viscosity is...", "Runny", "Thick", "Solid"],
      ["Oil is used in machines to...", "Reduce friction between moving parts", "Increase friction", "Make noise"],
      ["Which pours the quickest?", "Water", "Cold treacle", "Thick paint"]
    ]),
    les("Solar cells", [
      ["Light to electricity", "🔋", "A <b>solar cell</b> (photovoltaic cell) is made mostly of silicon. Light falling on it makes an electric current directly, with no moving parts."],
      ["Strengths and limits", "⛅", "Solar cells give no pollution while working. But they give less on cloudy days and nothing at night, so batteries or other sources are needed."],
      ["Using them", "🛰️", "They power calculators, satellites, and rooftop panels. Panels should face the Sun. A typical panel turns about one-fifth of the light energy into electricity."]
    ], ["Think about what the solar cell needs in order to work.", "Light is the energy source here, and the output is electricity.", "Example: a calculator with a small solar strip stops working in a dark drawer. Now do yours."], [
      ["A solar cell turns light energy into...", "Electrical energy", "Sound energy", "Chemical energy"],
      ["A solar cell makes the most electricity in...", "Bright sunshine", "Total darkness", "Heavy fog"],
      ["At night, a solar panel gives...", "No electricity", "The most electricity", "Sound"],
      ["Solar cells are made mainly from...", "Silicon", "Wood", "Rubber"],
      ["A big advantage of solar cells is that they...", "Make no pollution while working", "Work in the dark", "Burn fuel"],
      ["A satellite in space often uses solar panels because...", "Sunlight is available there", "There is wind", "There is water"],
      ["Solar panels should be pointed...", "Towards the Sun", "Away from the Sun", "At the ground"],
      ["To keep a lamp lit at night from solar power, you need...", "A battery to store energy", "More clouds", "A bigger shadow"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 1, 2, 3, 6, 7, 9, 10, 12, 14])),
    mix("Level 16 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 17 =================
  const b = [
    num("Speeding up: v = u + at", [
      ["The formula", "🚀", "For steady acceleration, <b>final speed = start speed + acceleration x time</b>: v = u + a t. Here u is the start speed (m/s), a is in m/s² and t is in seconds."],
      ["Worked example", "🧮", "A bike starts at 2 m/s and accelerates at 3 m/s² for 4 s. The speed gained is 3 x 4 = 12 m/s, so v = 2 + 12 = 14 m/s."],
      ["Rearranging", "🔁", "Time: t = (v - u) / a. Acceleration: a = (v - u) / t."]
    ], () => {
      const u = ri(0, 10), a2 = ri(1, 5), t = ri(2, 10), v = u + a2 * t;
      return pick([
        { text: `A runner starts at ${u} m/s and accelerates at ${a2} m/s² for ${t} s. What is the final speed in m/s?`, visual: "🏃", answer: v,
          hints: ["Work out how much speed is gained, then add the start speed.", "Gain = acceleration x time. Then add u.", "Example: u = 1, a = 2, t = 5: gain 10, so v = 11 m/s. Now do yours."] },
        { text: `A scooter speeds up from ${u} m/s to ${v} m/s at ${a2} m/s². How many seconds does it take?`, visual: "🛴", answer: t,
          hints: ["Find the total change in speed first.", "Divide the change in speed by the acceleration.", "Example: 4 m/s to 16 m/s at 3 m/s² gives change 12, and 12 / 3 = 4 s. Now do yours."] },
        { text: `A car goes from ${u} m/s to ${v} m/s in ${t} s. What is its acceleration in m/s²?`, visual: "🚗", answer: a2,
          hints: ["Find the change in speed first.", "Divide the change in speed by the time taken.", "Example: 5 m/s to 25 m/s in 4 s gives change 20, and 20 / 4 = 5 m/s². Now do yours."] }
      ]);
    }),
    num("Distance while accelerating", [
      ["From rest", "🛫", "An object that starts from rest and accelerates steadily travels <b>s = ½ a t²</b>. With a = 4 m/s² and t = 3 s, s = ½ x 4 x 9 = 18 m."],
      ["Changing speeds", "🔄", "If acceleration is steady, use the <b>average speed</b> = (u + v) / 2. Then <b>distance = average speed x time</b>."],
      ["Example", "🧮", "A train goes from 10 m/s to 20 m/s in 6 s. Average speed 15 m/s, so distance = 15 x 6 = 90 m."]
    ], () => {
      if (Math.random() < 0.5) {
        const a2 = pick([2, 4, 6]), t = ri(2, 8);
        return { text: `A rocket sled starts from rest and accelerates at ${a2} m/s² for ${t} s. How far does it travel in metres? (use s = ½ a t²)`, visual: "🛷", answer: a2 * t * t / 2,
          hints: ["Square the time first.", "Multiply a by t² and then halve it.", "Example: a = 2, t = 5: 2 x 25 = 50, half is 25 m. Now do yours."] };
      }
      const u = pick([0, 2, 4, 6, 8, 10]), v = u + pick([4, 6, 8, 10, 12, 20]), t = ri(2, 10);
      return { text: `A van speeds up steadily from ${u} m/s to ${v} m/s in ${t} s. How far does it travel in metres?`, visual: "🚐", answer: (u + v) / 2 * t,
        hints: ["With steady acceleration the average speed is halfway between start and end.", "Add the two speeds, halve, then multiply by the time.", "Example: 2 m/s to 10 m/s in 5 s: average 6 m/s, distance 6 x 5 = 30 m. Now do yours."] };
    }),
    num("Specific heat capacity", [
      ["Heating stuff", "🔥", "The <b>specific heat capacity</b> c is the energy needed to warm 1 kg of a material by 1 °C. Water: 4200 J/kg°C. Copper: about 400 J/kg°C."],
      ["The formula", "🧮", "<b>Energy = mass x c x temperature change</b> (Q = m c ΔT). To warm 2 kg of water by 10 °C: 2 x 4200 x 10 = 84 000 J."],
      ["Why it matters", "🌊", "Water has a high c, so it takes a lot of energy to heat up, and it holds a lot of heat. Metals with low c heat up quickly."]
    ], () => {
      const mat = pick([["water", 4200], ["cooking oil", 2000], ["aluminium", 900], ["copper", 400], ["iron", 450]]);
      const m = pick([1, 2, 3, 5]), d = pick([5, 10, 20, 30]), Q = m * mat[1] * d;
      return pick([
        { text: `How much energy in joules is needed to warm ${m} kg of ${mat[0]} (c = ${mat[1]} J/kg°C) by ${d} °C?`, visual: "🔥", answer: Q,
          hints: ["You need three numbers multiplied together.", "Multiply mass, specific heat capacity and temperature change.", "Example: 2 kg of aluminium (c = 900) warmed by 10 °C: 2 x 900 x 10 = 18 000 J. Now do yours."] },
        { text: `${Q} J warms ${m} kg of ${mat[0]} (c = ${mat[1]} J/kg°C). What is the temperature rise in °C?`, visual: "🌡️", answer: d,
          hints: ["Q = m x c x ΔT, so ΔT is what is left when you divide.", "Divide the energy by (mass x c).", "Example: 8000 J, 2 kg, c = 400: 8000 / 800 = 10 °C. Now do yours."] },
        { text: `${Q} J warms some ${mat[0]} (c = ${mat[1]} J/kg°C) by ${d} °C. What is its mass in kg?`, visual: "⚖️", answer: m,
          hints: ["Q = m x c x ΔT, so mass is what is left when you divide.", "Divide the energy by (c x temperature change).", "Example: 18 000 J, c = 900, ΔT = 10: 18 000 / 9000 = 2 kg. Now do yours."] }
      ]);
    }),
    les("Latent heat", [
      ["Hidden heat", "🧊", "While a solid melts or a liquid boils, you keep adding energy but the <b>temperature stays the same</b>. The energy goes into breaking the bonds between particles. This is <b>latent heat</b>."],
      ["Melting vs boiling", "♨️", "Boiling needs far more energy than melting. For water, turning 1 kg of boiling water to steam takes about 2260 kJ, but melting 1 kg of ice takes about 334 kJ."],
      ["In real life", "💦", "Sweat cools you because evaporating takes energy from your skin. A steam burn is worse than a boiling-water burn, as steam gives out its latent heat when it condenses."]
    ], ["Think about where the energy goes if the temperature does not change.", "Changes of state need energy to break bonds, or release energy when bonds form.", "Example: an ice cube in a drink keeps taking energy at 0 °C while it melts. Now do yours."], [
      ["While ice melts at 0 °C, the temperature...", "Stays at 0 °C", "Keeps rising", "Falls"],
      ["During boiling, the energy supplied is used to...", "Break the bonds between particles", "Make the particles colder", "Make the pan heavier"],
      ["Which needs more energy for 1 kg of water?", "Boiling to steam", "Melting ice", "They are equal"],
      ["Sweating cools you because evaporation...", "Takes energy from your skin", "Adds energy to your skin", "Adds salt"],
      ["Steam can cause a worse burn than boiling water because it...", "Releases latent heat when it condenses", "Is colder", "Is heavier"],
      ["Latent heat is energy used to...", "Change state without changing temperature", "Raise temperature only", "Make light"],
      ["When water vapour condenses, it...", "Gives out energy", "Takes in energy", "Stays at the same energy"],
      ["A flat part on a heating curve shows...", "A change of state", "Rapid warming", "Cooling"]
    ]),
    les("Alpha, beta and gamma", [
      ["Unstable atoms", "☢️", "Some atoms have unstable nuclei. They give out <b>radiation</b> to become stable. This is <b>radioactive decay</b>, and it happens at random."],
      ["Three kinds", "🔬", "<b>Alpha</b>: a helium nucleus (2 protons and 2 neutrons). <b>Beta</b>: a fast electron. <b>Gamma</b>: a high-energy electromagnetic wave."],
      ["Stopping them", "🛡️", "Alpha is stopped by paper. Beta is stopped by a few millimetres of aluminium. Gamma is only reduced by thick lead or concrete."]
    ], ["Each type of radiation is different in size and in how far it goes.", "The biggest, heaviest one is stopped most easily; the wave goes furthest.", "Example: a big beach ball is stopped by a fence, but a tiny speck of dust passes through. Now do yours."], [
      ["Which radiation is stopped by a sheet of paper?", "Alpha", "Beta", "Gamma"],
      ["Which is an electromagnetic wave?", "Gamma", "Alpha", "Beta"],
      ["Which is a fast-moving electron?", "Beta", "Alpha", "Gamma"],
      ["An alpha particle is the same as a...", "Helium nucleus", "Hydrogen atom", "Photon"],
      ["Which needs thick lead or concrete to reduce it?", "Gamma", "Alpha", "Beta"],
      ["Radioactive decay happens...", "At random", "On a timetable", "Only in daylight"],
      ["Beta radiation is stopped by...", "A few millimetres of aluminium", "A sheet of paper", "Nothing at all"],
      ["Radioactive atoms give out radiation because their nuclei are...", "Unstable", "Too cold", "Magnetic"]
    ]),
    num("Half-life", [
      ["Random but predictable", "⏳", "We cannot say when a single atom will decay, but we can say how long it takes for <b>half</b> of a large sample to decay. That time is the <b>half-life</b>."],
      ["Halving", "➗", "After 1 half-life, half the radioactive atoms are left. After 2, a quarter. After 3, an eighth. A 80 g sample after 3 half-lives is 80 / 2 / 2 / 2 = 10 g."],
      ["Counting", "🔢", "Number of half-lives = total time / half-life."]
    ], () => {
      const n = ri(1, 4), hl = pick([2, 3, 5, 10, 12]), k = ri(1, 10), start = k * Math.pow(2, n);
      return pick([
        { text: `A sample has ${start} g of a radioactive material with a half-life of ${hl} days. How many grams are left after ${n * hl} days?`, visual: "⏳", answer: k,
          hints: ["First work out how many half-lives have passed.", "Halve the amount once for each half-life.", "Example: 40 g after 2 half-lives: 40 to 20 to 10 g. Now do yours."] },
        { text: `A material has a half-life of ${hl} days. How many half-lives pass in ${n * hl} days?`, visual: "🔢", answer: n,
          hints: ["Divide the total time by the half-life.", "Total days divided by days per half-life.", "Example: 30 days with a half-life of 10 days is 3 half-lives. Now do yours."] },
        { text: `After ${n} half-lives only ${k} g of a sample remain. How many grams were there at the start?`, visual: "⚗️", answer: start,
          hints: ["Work backwards: each half-life you double.", "Double the amount once for every half-life that passed.", "Example: 5 g left after 2 half-lives means 5 to 10 to 20 g at the start. Now do yours."] }
      ]);
    }),
    num("Atomic number and mass number", [
      ["Inside the nucleus", "⚛️", "The <b>atomic number</b> is the number of protons. The <b>mass number</b> is protons + neutrons. A neutral atom has as many electrons as protons."],
      ["Neutrons", "➖", "Neutrons = mass number - atomic number. Carbon has 6 protons. Carbon-12 has 6 neutrons; carbon-14 has 8."],
      ["Isotopes", "🔀", "<b>Isotopes</b> are atoms of the same element (same protons) with different numbers of neutrons. Carbon-12 and carbon-14 are isotopes."]
    ], () => {
      const el = pick([["lithium", 3, 7], ["beryllium", 4, 9], ["boron", 5, 11], ["carbon", 6, 12], ["nitrogen", 7, 14], ["oxygen", 8, 16], ["fluorine", 9, 19], ["neon", 10, 20], ["sodium", 11, 23], ["magnesium", 12, 24], ["aluminium", 13, 27], ["silicon", 14, 28], ["sulfur", 16, 32], ["chlorine", 17, 35], ["calcium", 20, 40]]);
      return pick([
        { text: `An atom of ${el[0]} has ${el[1]} protons and mass number ${el[2]}. How many neutrons does it have?`, visual: "⚛️", answer: el[2] - el[1],
          hints: ["The mass number counts protons and neutrons together.", "Take the number of protons away from the mass number.", "Example: sodium-23 has 11 protons so 23 - 11 = 12 neutrons. Now do yours."] },
        { text: `A neutral atom of ${el[0]} has atomic number ${el[1]}. How many electrons does it have?`, visual: "➖", answer: el[1],
          hints: ["A neutral atom has equal positive and negative charges.", "Electrons equal protons, and the atomic number counts protons.", "Example: nitrogen has atomic number 7, so a neutral nitrogen atom has the same number of electrons. Now do yours."] },
        { text: `An atom of ${el[0]} has ${el[1]} protons and ${el[2] - el[1]} neutrons. What is its mass number?`, visual: "🔢", answer: el[2],
          hints: ["Mass number counts the particles in the nucleus.", "Add the protons and the neutrons.", "Example: 8 protons + 9 neutrons gives mass number 17. Now do yours."] }
      ]);
    }),
    les("Resistance of wires", [
      ["Length", "📏", "A <b>longer</b> wire has <b>more</b> resistance, as electrons collide with more atoms on the way. Doubling the length doubles the resistance."],
      ["Thickness", "🧵", "A <b>thicker</b> wire has <b>less</b> resistance, as there is more room for charges to flow. Doubling the cross-section area halves the resistance."],
      ["Material and heat", "🔥", "Copper has low resistance, so it is used for cables. Nichrome has high resistance, so it is used in heaters. For a metal wire, a higher temperature means more resistance."]
    ], ["Think about how much room there is for charges, and how far they travel.", "Longer means a longer journey; thicker means a wider road.", "Example: a long, narrow corridor is harder to walk through than a short, wide one. Now do yours."], [
      ["Making a wire longer makes its resistance...", "Larger", "Smaller", "Zero"],
      ["Making a wire thicker makes its resistance...", "Smaller", "Larger", "The same"],
      ["Doubling the length of a wire makes its resistance...", "Double", "Half", "Four times as small"],
      ["Which material is best for a long power cable?", "Copper", "Nichrome", "Plastic"],
      ["Heating elements are made from nichrome because it has...", "High resistance", "Low resistance", "No metal in it"],
      ["Doubling the thickness (cross-section) of a wire makes its resistance...", "Half", "Double", "Four times larger"],
      ["Heating a metal wire makes its resistance...", "Go up", "Go down", "Disappear"],
      ["Which wire has the least resistance?", "Short and thick", "Long and thin", "Long and thick"]
    ]),
    num("Voltage and energy", [
      ["What is a volt?", "🔋", "The voltage of a cell tells you how much energy each unit of charge gets. <b>1 volt = 1 joule per coulomb</b>."],
      ["The formula", "🧮", "<b>Energy = charge x voltage</b> (E = Q V). Moving 5 C across 3 V transfers 5 x 3 = 15 J."],
      ["Rearranged", "🔁", "V = E / Q and Q = E / V."]
    ], () => {
      const Q = ri(1, 8), V = pick([2, 3, 4, 6, 9, 12]), E = Q * V;
      return pick([
        { text: `${Q} C of charge pass through a ${V} V battery. How many joules of energy are transferred?`, visual: "🔋", answer: E,
          hints: ["Each coulomb gets the same energy per volt.", "Multiply the charge by the voltage.", "Example: 4 C through 5 V gives 4 x 5 = 20 J. Now do yours."] },
        { text: `A battery transfers ${E} J to ${Q} C of charge. What is its voltage in volts?`, visual: "⚡", answer: V,
          hints: ["Voltage is the energy given to each coulomb.", "Divide the energy by the charge.", "Example: 30 J shared by 5 C is 6 V. Now do yours."] },
        { text: `A ${V} V battery transfers ${E} J. How many coulombs of charge passed through?`, visual: "🔌", answer: Q,
          hints: ["Each coulomb carries 'voltage' joules.", "Divide the energy by the voltage.", "Example: 36 J at 9 V means 36 / 9 = 4 C. Now do yours."] }
      ]);
    }),
    num("Magnification", [
      ["Bigger pictures", "🔍", "<b>Magnification = image size / object size</b>. A magnification of 10 means the image looks 10 times as big as the real thing."],
      ["Use the same units", "📏", "Measure both in the same unit. A 2 mm insect that looks 20 mm in a photo has a magnification of 20 / 2 = 10."],
      ["Rearranged", "🔁", "Image size = magnification x object size. Object size = image size / magnification."]
    ], () => {
      const o = pick([2, 3, 4, 5, 6]), M = pick([2, 3, 4, 5, 10, 20]), im = o * M;
      return pick([
        { text: `A cell is ${o} mm across in real life and its image is ${im} mm across. What is the magnification?`, visual: "🔬", answer: M,
          hints: ["Compare the image with the real object.", "Divide the image size by the object size.", "Example: image 30 mm, object 6 mm gives 30 / 6 = 5 times. Now do yours."] },
        { text: `A magnification of ${M} is used on an object that is ${o} mm long. How long is the image in mm?`, visual: "🔍", answer: im,
          hints: ["Magnification tells you how many times bigger.", "Multiply the object size by the magnification.", "Example: x4 on a 3 mm object gives 4 x 3 = 12 mm. Now do yours."] },
        { text: `An image is ${im} mm long and the magnification is ${M}. How long is the real object in mm?`, visual: "🪲", answer: o,
          hints: ["Undo the magnification.", "Divide the image size by the magnification.", "Example: image 24 mm at x8 gives 24 / 8 = 3 mm. Now do yours."] }
      ]);
    }),
    les("Red-shift and the expanding universe", [
      ["Stretched light", "🔴", "Light from most distant galaxies is stretched to <b>longer wavelengths</b>. We call this <b>red-shift</b>, as the light moves towards the red end of the spectrum."],
      ["Bigger = faster", "🌌", "The farther away the galaxy, the bigger the red-shift. So far galaxies move away from us faster. The universe is <b>expanding</b>."],
      ["Big Bang", "💥", "Running the expansion backwards, everything was once squeezed into a tiny, hot space. The Big Bang happened about 13.8 billion years ago."]
    ], ["Think about what happens to light waves from something moving away.", "Distance and speed of galaxies are linked.", "Example: the siren of an ambulance gets lower in pitch as it drives away; light does something similar. Now do yours."], [
      ["Red-shift means light is shifted to...", "Longer wavelengths", "Shorter wavelengths", "Sound waves"],
      ["Red-shifted light shows a galaxy is moving...", "Away from us", "Towards us", "Not at all"],
      ["Galaxies that are farther away show...", "Greater red-shift", "Less red-shift", "No red-shift"],
      ["Red-shift is evidence that the universe is...", "Expanding", "Shrinking", "Standing still"],
      ["The Big Bang happened about...", "13.8 billion years ago", "13.8 million years ago", "13.8 thousand years ago"],
      ["Red-shift is like which sound effect?", "A siren dropping in pitch as it moves away", "An echo", "A drum roll"],
      ["The Big Bang theory says the universe began...", "Very hot and very small", "Cold and huge", "Empty and dark forever"],
      ["Light waves have a longer wavelength at the...", "Red end of the spectrum", "Violet end", "Blue end"]
    ]),
    les("Earthquake waves", [
      ["P-waves", "🌍", "<b>P-waves</b> (primary) are compression waves, like sound. They travel through solids <b>and</b> liquids and arrive first."],
      ["S-waves", "〰️", "<b>S-waves</b> (secondary) shake sideways, and travel only through <b>solids</b>. They arrive second and are slower."],
      ["Inside the Earth", "🧅", "S-waves do not pass through the Earth's outer core, which shows that this layer is <b>liquid</b>. Seismometers record the waves. The layers are crust, mantle and core."]
    ], ["Think about which wave is faster and which wave travels through more types of material.", "Liquids cannot be sheared sideways.", "Example: sound goes through water but a sideways wobble cannot travel through water. Now do yours."], [
      ["Which seismic wave arrives first?", "P-wave", "S-wave", "Both together"],
      ["Which wave cannot travel through a liquid?", "S-wave", "P-wave", "Both can"],
      ["The fact that S-waves are stopped in the outer core shows it is...", "Liquid", "Solid", "Empty"],
      ["A P-wave is a...", "Compression wave", "Sideways shake only", "Light wave"],
      ["An instrument that records earthquake waves is a...", "Seismometer", "Thermometer", "Telescope"],
      ["The layers of the Earth are the crust, mantle and...", "Core", "Beak", "Cloud"],
      ["S stands for...", "Secondary", "Sound", "Solid-only fast"],
      ["Which wave travels through both solids and liquids?", "P-wave", "S-wave", "Neither"]
    ]),
    les("Why metals conduct heat", [
      ["Vibrating atoms", "🔩", "In all solids, hot atoms vibrate harder and pass the vibrations to neighbours. This is <b>conduction</b>."],
      ["Free electrons", "⚡", "Metals have <b>free electrons</b> that can move through the solid. They carry energy quickly, which is why metals conduct heat very well (and electricity too)."],
      ["Poor conductors", "🧶", "Non-metals like wood and plastic have no free electrons, so they conduct poorly. Gases are poor conductors, as their particles are far apart. Trapped air makes a good insulator."]
    ], ["Think about which particles carry the energy in a metal.", "Metals have something extra that other solids do not.", "Example: a relay team passes the baton quicker if some runners can sprint right across the track. Now do yours."], [
      ["Metals conduct heat well because they have...", "Free electrons", "More air", "Cold atoms"],
      ["In a non-metal solid, heat travels by...", "Vibrations passed between atoms", "Free electrons", "Currents of liquid"],
      ["Which is the best conductor of heat?", "Copper", "Wood", "Wool"],
      ["Gases conduct poorly because their particles are...", "Far apart", "Packed tightly", "Metal"],
      ["Trapped air in a woolly jumper helps to...", "Insulate", "Conduct", "Make sound"],
      ["A good heat conductor is also often a good...", "Electrical conductor", "Insulator", "Sound absorber"],
      ["A saucepan handle is plastic because plastic...", "Is a poor conductor of heat", "Is shiny", "Is heavy"],
      ["Conduction cannot happen through...", "A vacuum", "A spoon", "A copper bar"]
    ]),
    les("Significant figures", [
      ["What counts", "🔢", "<b>Significant figures</b> (s.f.) show how precise a number is. Count from the first non-zero digit. 0.0072 has 2 s.f.; 405 has 3 s.f.; 12.30 has 4 s.f."],
      ["Rounding", "✂️", "To round to 3 s.f., keep the first three significant digits and look at the next one. 3.1416 becomes 3.14. Fill the empty places with zeros: 28 640 to 2 s.f. is 29 000."],
      ["Why use them", "⚖️", "An answer should not look more precise than the measurements. If the data has 3 s.f., give the answer to 3 s.f."]
    ], ["Start counting at the first digit that is not zero.", "Zeros in the middle count; zeros at the very start do not.", "Example: 0.0305 has 3 significant figures (3, 0, 5). Now do yours."], [
      ["How many significant figures in 405?", "3", "2", "1"],
      ["How many significant figures in 0.0072?", "2", "4", "5"],
      ["How many significant figures in 12.30?", "4", "3", "2"],
      ["Round 7.846 to 2 s.f.", "7.8", "7.9", "8.0"],
      ["Round 0.04567 to 3 s.f.", "0.0457", "0.0456", "0.046"],
      ["Round 28 640 to 2 s.f.", "29 000", "28 000", "28 600"],
      ["Round 3.049 to 3 s.f.", "3.05", "3.04", "3.1"],
      ["Data is given to 3 s.f. and a calculator shows 2.34567. Give the answer to 3 s.f.", "2.35", "2.34", "2.3"]
    ]),
    les("Rearranging formulas", [
      ["Same rule, new shape", "🔁", "A formula can be rearranged to find any quantity in it. Whatever you do to one side, do to the other. From v = d / t we get d = v x t and t = d / v."],
      ["Multiplying", "✖️", "If a formula says E = P x t, you can find P by dividing by t: P = E / t, or t by dividing by P: t = E / P."],
      ["Checking", "✅", "Test your rearrangement with simple numbers. If 6 = 2 x 3 then 6 / 3 should give 2."]
    ], ["Decide which letter you want on its own.", "To move a multiplier to the other side, divide by it; to move a divisor, multiply by it.", "Example: from F = m x a you get a = F / m. Now do yours."], [
      ["If density = mass / volume, then mass =", "density x volume", "density / volume", "volume / density"],
      ["If speed = distance / time, then time =", "distance / speed", "distance x speed", "speed / distance"],
      ["If W = F x d, then d =", "W / F", "W x F", "F / W"],
      ["If P = E / t, then E =", "P x t", "P / t", "t / P"],
      ["If p = F / A, then A =", "F / p", "F x p", "p / F"],
      ["If V = I x R, then I =", "V / R", "V x R", "R / V"],
      ["If a = Δv / t, then t =", "Δv / a", "Δv x a", "a / Δv"],
      ["If M = I / O, then O =", "I / M", "I x M", "M / I"]
    ]),
    les("Planets around other stars", [
      ["Exoplanets", "🪐", "An <b>exoplanet</b> is a planet orbiting a star other than our Sun. Thousands have been found, and many stars have planets."],
      ["How we find them", "🔭", "In the <b>transit method</b> we watch for a star's light dipping a tiny bit as a planet passes in front of it. Another way is spotting the star's small wobble as the planet's gravity tugs it."],
      ["Habitable zone", "💧", "The <b>habitable zone</b> is the range of distances from a star where it is not too hot or too cold for liquid water. Earth is in the Sun's zone."]
    ], ["Think about what we can actually see from far away.", "Liquid water needs the right temperature.", "Example: sitting too near a campfire is too hot, and too far is too cold; just right is the middle. Now do yours."], [
      ["An exoplanet orbits...", "A star other than the Sun", "The Earth", "The Moon"],
      ["In the transit method, a star's light...", "Dips slightly when a planet passes in front", "Gets brighter", "Changes to green"],
      ["The habitable zone is where a planet could have...", "Liquid water", "Only ice", "Only gas"],
      ["A planet too close to its star would be...", "Too hot for liquid water", "Too cold", "Without gravity"],
      ["A planet too far from its star would be...", "Too cold", "Too hot", "Weightless"],
      ["Besides transits, planets can be spotted from the star's...", "Small wobble", "Smell", "Sound"],
      ["Is Earth in the Sun's habitable zone?", "Yes", "No, it is too hot", "No, it is too cold"],
      ["Exoplanets are mostly found using...", "Telescopes", "Drills", "Magnifying glasses"]
    ]),
    les("Real and virtual images", [
      ["Real images", "🎞️", "A <b>real image</b> is made where light rays actually meet. You can catch it on a screen. A convex lens makes a real, upside-down image of an object that is far away. Cameras and your eye do this."],
      ["Virtual images", "🔎", "A <b>virtual image</b> is where rays only seem to come from. You cannot put it on a screen. A mirror's image is virtual, and so is the image in a magnifying glass."],
      ["Magnifying glass", "🧐", "Hold an object <b>closer than the focal point</b> of a convex lens and you see a bigger, upright, virtual image."]
    ], ["Can the image be caught on a screen, or only seen by looking?", "Think about which instrument makes which kind of image.", "Example: a movie projector throws an image on a screen, so it is real. Now do yours."], [
      ["A real image can be...", "Caught on a screen", "Seen only in a mirror", "Never seen"],
      ["A virtual image...", "Cannot be projected on a screen", "Is always upside-down", "Is always smaller"],
      ["A plane mirror makes a...", "Virtual image", "Real image", "No image"],
      ["A magnifying glass shows a...", "Bigger virtual image", "Smaller real image", "Shadow"],
      ["The image formed on your retina is...", "Real and upside-down", "Virtual and upright", "Always a rainbow"],
      ["To use a convex lens as a magnifier, hold the object...", "Closer than the focal point", "Far beyond the focal point", "Behind your head"],
      ["A camera lens forms a...", "Real image on the sensor", "Virtual image behind the lens", "Echo"],
      ["A real image made by a convex lens from a distant object is...", "Upside-down", "Upright", "Invisible"]
    ]),
    les("Years of the planets", [
      ["Orbit length", "🪐", "A planet's <b>year</b> is the time it takes to orbit the Sun. Planets farther away have a longer path and move slower, so their years are much longer."],
      ["Some years", "📅", "Mercury: 88 days. Venus: 225 days. Earth: 365 days. Mars: about 687 days. Jupiter: about 12 Earth years. Saturn: about 29. Uranus: about 84. Neptune: about 165."],
      ["Rule", "🌞", "Closer to the Sun means a shorter year. Farther away means a longer year."]
    ], ["Closer planets zip around quickly; far ones crawl.", "Put the planets in order from the Sun and compare their orbit lengths.", "Example: on a running track, the runner in the outer lane has farther to go. Now do yours."], [
      ["Which planet has the shortest year?", "Mercury", "Earth", "Neptune"],
      ["Which planet has the longest year of these?", "Neptune", "Mars", "Venus"],
      ["Mars's year compared with Earth's year is...", "Longer", "Shorter", "The same"],
      ["Venus's year compared with Earth's year is...", "Shorter", "Longer", "The same"],
      ["A year on Jupiter is about...", "12 Earth years", "12 Earth days", "1 Earth day"],
      ["Planets farther from the Sun move...", "More slowly", "Faster", "At exactly the same speed"],
      ["A year on Earth lasts about...", "365 days", "88 days", "165 years"],
      ["Which planet takes about 165 Earth years to orbit the Sun?", "Neptune", "Saturn", "Mercury"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 2, 4, 5, 7, 8, 9, 12, 14])),
    mix("Level 17 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 18 =================
  // precomputed combos for v^2 = u^2 + 2as with whole-number answers
  const kin = [];
  for (let u = 0; u <= 8; u++) for (const a2 of [2, 4, 5]) for (let s = 5; s <= 50; s++) {
    const v2 = u * u + 2 * a2 * s, v = Math.round(Math.sqrt(v2));
    if (v * v === v2 && v > u) kin.push([u, v, a2, s]);
  }
  // potential divider combos with whole-number output
  const div = [];
  for (const Vin of [6, 8, 9, 10, 12, 15, 18, 24]) for (const r1 of [100, 200, 300, 400, 500, 600]) for (const r2 of [100, 200, 300, 400, 500, 600]) {
    if ((Vin * r2) % (r1 + r2) === 0) div.push([Vin, r1, r2, Vin * r2 / (r1 + r2)]);
  }
  const trip = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25], [20, 21, 29], [15, 20, 25], [10, 24, 26]];

  const c = [
    num("Distance with a start speed", [
      ["The equation", "🧮", "For steady acceleration: <b>s = u t + ½ a t²</b>. The first part is the distance you would go at the start speed; the second part is the extra from accelerating."],
      ["Example", "🚲", "A cyclist at 4 m/s accelerates at 2 m/s² for 5 s. u t = 4 x 5 = 20 m. ½ a t² = ½ x 2 x 25 = 25 m. Total s = 45 m."],
      ["Careful", "⚠️", "Square only the time (t²) before you multiply by ½ a."]
    ], () => {
      const u = ri(0, 10), a2 = pick([2, 4]), t = ri(2, 8);
      return { text: `A skater with a start speed of ${u} m/s accelerates at ${a2} m/s² for ${t} s. How far does the skater travel in metres? (s = ut + ½at²)`, visual: "⛸️", answer: u * t + a2 * t * t / 2,
        hints: ["There are two parts to add together.", "Work out u x t, then work out half of a x t squared, and add them.", "Example: u = 3, a = 2, t = 4: 3 x 4 = 12 and ½ x 2 x 16 = 16, total 28 m. Now do yours."] };
    }),
    num("v squared equation", [
      ["No time needed", "🧪", "When time is not given, use <b>v² = u² + 2 a s</b>. It links final speed, start speed, acceleration and distance."],
      ["Example", "🚗", "A car starts at 3 m/s and accelerates at 2 m/s² over 20 m. v² = 9 + 2 x 2 x 20 = 89 (m/s)². Take the square root to get v."],
      ["Find the distance", "🔁", "Rearranged: s = (v² - u²) / (2 a)."]
    ], () => {
      if (Math.random() < 0.5) {
        const u = ri(0, 8), a2 = ri(1, 5), s = ri(5, 40);
        return { text: `A ball starts at ${u} m/s and accelerates at ${a2} m/s² over ${s} m. What is v² in m²/s²? (v² = u² + 2as)`, visual: "⚽", answer: u * u + 2 * a2 * s,
          hints: ["Work out u² and 2 x a x s separately.", "Add u squared to 2 x a x s. Do not take the square root.", "Example: u = 2, a = 3, s = 10: 4 + 60 = 64. Now do yours."] };
      }
      const k = pick(kin);
      return { text: `A car speeds up from ${k[0]} m/s to ${k[1]} m/s with an acceleration of ${k[2]} m/s². How far does it travel in metres?`, visual: "🚗", answer: k[3],
        hints: ["Use s = (v² - u²) / (2a).", "Square both speeds, subtract, then divide by 2a.", "Example: u = 2, v = 6, a = 4: (36 - 4) / 8 = 4 m. Now do yours."] };
    }),
    num("Speed, energy and braking", [
      ["Doubling speed", "🚦", "Kinetic energy depends on <b>speed squared</b>. Double the speed and the kinetic energy becomes <b>4 times</b> as big."],
      ["Braking distance", "🛑", "The brakes must remove all that energy, so braking distance also grows with speed squared. Twice the speed means about 4 times the braking distance. Three times the speed means 9 times."],
      ["Example", "🧮", "At 10 m/s a car brakes in 6 m. At 20 m/s (x2) it needs 6 x 4 = 24 m."]
    ], () => {
      const f = pick([2, 3]), d1 = ri(3, 10), e1 = pick([5, 10, 20, 50]);
      return pick([
        { text: `At 10 m/s a car brakes to a halt in ${d1} m. About how many metres does it need if the speed is ${f} times as fast?`, visual: "🚗", answer: d1 * f * f,
          hints: ["Braking distance is proportional to speed squared.", "Multiply the distance by the speed factor squared.", "Example: speed x2 and 5 m before gives 5 x 4 = 20 m. Now do yours."] },
        { text: `A cyclist has ${e1} J of kinetic energy. How many joules does the cyclist have when going ${f} times as fast?`, visual: "🚴", answer: e1 * f * f,
          hints: ["Kinetic energy depends on speed squared.", "Multiply the energy by the speed factor squared.", "Example: speed x2 and 3 J before gives 3 x 4 = 12 J. Now do yours."] }
      ]);
    }),
    num("Forces at right angles", [
      ["Not in a line", "↗️", "Two forces at 90 degrees to each other add up to a <b>resultant</b> found by Pythagoras: <b>R² = F₁² + F₂²</b>."],
      ["Example", "📐", "A boat is pulled 3 N east and 4 N north. R² = 9 + 16 = 25, so R = 5 N."],
      ["Remember", "🧠", "The resultant is always bigger than either force alone, but smaller than their plain sum (7 N here)."]
    ], () => {
      const t = pick(trip);
      if (Math.random() < 0.6) return { text: `Two forces of ${t[0]} N and ${t[1]} N act at right angles on a crate. What is the size of the resultant in newtons?`, visual: "📦", answer: t[2],
        hints: ["Draw the forces as the two short sides of a right-angled triangle.", "Square each force, add, then take the square root.", "Example: 6 N and 8 N: 36 + 64 = 100 and the root is 10 N. Now do yours."] };
      return { text: `A resultant force of ${t[2]} N is made from a ${t[0]} N force and a second force at right angles. How big is the second force in newtons?`, visual: "📐", answer: t[1],
        hints: ["The resultant is the longest side of the triangle.", "Square the resultant, subtract the square of the known force, then root.", "Example: resultant 10, one side 6: 100 - 36 = 64 and the root is 8 N. Now do yours."] };
    }),
    num("Potential dividers", [
      ["Splitting voltage", "✂️", "Two resistors in series share the battery voltage in proportion to their resistance. Together they form a <b>potential divider</b>."],
      ["The rule", "🧮", "Voltage across R₂ = <b>Vin x R₂ / (R₁ + R₂)</b>. With 12 V and R₁ = R₂, each gets 6 V."],
      ["Uses", "🎛️", "Volume controls and light sensors use potential dividers. If R₂ changes (an LDR, say), the output voltage changes."]
    ], () => {
      const d = pick(div);
      if (Math.random() < 0.6) return { text: `A ${d[0]} V supply is connected across R₁ = ${d[1]} Ω in series with R₂ = ${d[2]} Ω. What is the voltage across R₂ in volts?`, visual: "🎛️", answer: d[3],
        hints: ["R₂ takes a share equal to R₂ out of the total resistance.", "Voltage across R₂ = supply x R₂ / (R₁ + R₂).", "Example: 10 V, R₁ = 100, R₂ = 400: 10 x 400 / 500 = 8 V. Now do yours."] };
      return { text: `A ${d[0]} V supply is connected across R₁ = ${d[1]} Ω in series with R₂ = ${d[2]} Ω. What is the voltage across R₁ in volts?`, visual: "🔌", answer: d[0] - d[3],
        hints: ["The two voltages add up to the supply voltage.", "Find the voltage across R₂ first, then take it from the supply.", "Example: 10 V supply and 8 V across R₂ leaves 2 V across R₁. Now do yours."] };
    }),
    num("Power lost in cables", [
      ["Heat in wires", "🔥", "A current heats any wire with resistance. The power wasted is <b>P = I² x R</b>. With 3 A and 2 Ω: P = 9 x 2 = 18 W."],
      ["Current matters most", "📉", "The current is squared. Halve the current and the wasted power drops to a <b>quarter</b>."],
      ["Power lines", "🗼", "That is why the grid uses transformers to give very high voltage and low current for long-distance lines."]
    ], () => {
      if (Math.random() < 0.6) {
        const I = ri(2, 10), R = pick([1, 2, 5, 10]);
        return { text: `A current of ${I} A flows through a cable with resistance ${R} Ω. How much power is wasted as heat in watts? (P = I² R)`, visual: "🔌", answer: I * I * R,
          hints: ["Square the current first.", "Multiply the squared current by the resistance.", "Example: 4 A and 3 Ω: 16 x 3 = 48 W. Now do yours."] };
      }
      const L = pick([20, 40, 100, 200, 400]);
      return { text: `A cable wastes ${L * 4} W as heat. If the current is halved, how many watts are wasted now?`, visual: "🗼", answer: L,
        hints: ["Power loss depends on current squared.", "Halving the current divides the loss by 2 x 2.", "Example: a loss of 80 W with current halved becomes 20 W. Now do yours."] };
    }),
    les("Interference", [
      ["Waves meeting", "🌊", "When two waves meet, their effects add up. Where a crest meets a crest, we get a bigger wave: <b>constructive interference</b>."],
      ["Cancelling", "🤫", "Where a crest meets a trough, they cancel: <b>destructive interference</b>. Two identical waves exactly opposite make a flat line."],
      ["In use", "🎧", "Noise-cancelling headphones listen to outside noise and play the opposite sound wave to cancel it. Two speakers can make loud and quiet spots in a room."]
    ], ["Think about adding up the heights of the waves.", "A crest is up, a trough is down. What happens when you add them?", "Example: two kids pushing a swing the same way make it go higher; pushing opposite ways cancels. Now do yours."], [
      ["Crest meets crest, giving a bigger wave, is...", "Constructive interference", "Destructive interference", "Reflection"],
      ["Crest meets trough, cancelling out, is...", "Destructive interference", "Constructive interference", "Refraction"],
      ["Noise-cancelling headphones work by making...", "An opposite sound wave", "A louder sound", "A light"],
      ["After waves pass through each other, they...", "Carry on unchanged", "Disappear forever", "Join into one"],
      ["Quiet spots between two speakers are caused by...", "Destructive interference", "Constructive interference", "Magnetism"],
      ["Two equal waves exactly opposite make a result that is...", "Flat (zero)", "Twice as high", "Double the speed"],
      ["Loud spots between two speakers are caused by...", "Constructive interference", "Destructive interference", "Absorption"],
      ["Interference happens with...", "All kinds of waves", "Only sound", "Only water"]
    ]),
    num("Refractive index", [
      ["Slower in glass", "🔆", "Light travels slower in materials than in empty space. The <b>refractive index</b> is n = (speed of light in vacuum) / (speed in the material)."],
      ["Numbers", "🧮", "Light in a vacuum goes at 300 000 km/s. In glass with n = 1.5 it goes 300 000 / 1.5 = 200 000 km/s. A bigger n means light slows more and bends more."],
      ["Bending", "↩️", "Light entering a slower material bends towards the normal line, a line at right angles to the surface."]
    ], () => {
      const n = pick([2, 3, 4, 5]);
      const v = 300000 / n;
      if (Math.random() < 0.5) return { text: `A material has refractive index ${n}. How fast does light travel in it, in km/s? (light in a vacuum is 300 000 km/s)`, visual: "🔆", answer: v,
        hints: ["Light slows down by the factor n.", "Divide 300 000 by the refractive index.", "Example: n = 6 gives 300 000 / 6 = 50 000 km/s. Now do yours."] };
      return { text: `Light travels at ${v} km/s in a material. What is its refractive index? (light in a vacuum is 300 000 km/s)`, visual: "🔬", answer: n,
        hints: ["n compares the vacuum speed with the speed in the material.", "Divide 300 000 by the speed in the material.", "Example: speed 100 000 km/s gives 300 000 / 100 000 = 3. Now do yours."] };
    }),
    num("Carbon dating", [
      ["Living clocks", "🪵", "Living things take in a little radioactive <b>carbon-14</b>. When they die, no more is taken in and what is there decays. Its half-life is about 5700 years."],
      ["Reading the age", "⌛", "Measure how much carbon-14 is left. Half left means about 5700 years old. A quarter left means 2 half-lives, so 11 400 years."],
      ["Limits", "🏺", "It only works on things that were once alive (wood, bone, cloth) and up to around 50 000 years old. Rocks need other methods."]
    ], () => {
      const n = ri(1, 4), age = n * 5700, frac = [2, 4, 8, 16][n - 1];
      if (Math.random() < 0.5) return { text: `An old wooden tool has 1/${frac} of its original carbon-14. About how old is it, in years? (half-life 5700 years)`, visual: "🪓", answer: age,
        hints: ["Count how many times the amount was halved.", "Multiply the number of halvings by 5700.", "Example: 1/4 left is 2 halvings, so 2 x 5700 = 11 400 years. Now do yours."] };
      return { text: `A bone is ${age} years old. Carbon-14 has a half-life of 5700 years. How many half-lives is that?`, visual: "🦴", answer: n,
        hints: ["Divide the age by the half-life.", "Years divided by 5700.", "Example: 17 100 years / 5700 is 3 half-lives. Now do yours."] };
    }),
    les("Radiation in medicine", [
      ["X-rays", "🩻", "X-rays pass through soft tissue but are absorbed more by bone, so they make a shadow picture of bones on a detector. Staff stay behind shields."],
      ["Gamma rays", "🏥", "Gamma rays can kill germs, so hospitals use them to sterilise equipment. Carefully aimed beams can also be used in treatments."],
      ["Tracers", "🔎", "A <b>tracer</b> is a small amount of a radioactive material that is swallowed or injected. A gamma camera outside the body follows it. Tracers have a <b>short half-life</b> so they soon disappear."]
    ], ["Think about how safe use is arranged: short exposure, shielding and care.", "Different rays are used for different jobs.", "Example: a torch shows what is in a dark box without opening it; a tracer does something similar. Now do yours."], [
      ["X-rays are used to look at...", "Bones", "Sounds", "Dreams"],
      ["Which radiation is used to sterilise medical equipment?", "Gamma rays", "Visible light", "Radio waves"],
      ["Why should a medical tracer have a short half-life?", "So it soon becomes harmless", "So it lasts for years", "So it is brighter"],
      ["Where does the camera sit for a gamma tracer scan?", "Outside the body", "Inside a cell", "On the patient's tongue"],
      ["Hospital staff stand behind lead shields to...", "Reduce exposure to radiation", "See better", "Hear better"],
      ["Bones show up on X-ray pictures because they...", "Absorb more X-rays than soft tissue", "Glow in the dark", "Make X-rays"],
      ["Dose badges worn by workers measure...", "How much radiation they have received", "Their height", "Their speed"],
      ["Doctors use radiation carefully by using...", "The smallest dose that does the job", "The biggest dose possible", "No safety rules"]
    ]),
    les("Superconductors", [
      ["Zero resistance", "🧊", "In some materials, when cooled below a certain <b>critical temperature</b>, the resistance drops to <b>zero</b>. These are <b>superconductors</b>."],
      ["Why it's special", "♾️", "A current in a superconducting loop can flow without losing any energy as heat. Ordinary cables waste energy as heat."],
      ["Uses", "🧲", "Superconducting electromagnets make the very strong magnetic fields in MRI scanners and some maglev trains. The catch is that they must be kept extremely cold, with liquid helium or liquid nitrogen."]
    ], ["Think about what 'super' refers to in terms of electrical resistance.", "The special behaviour only happens when the material is very cold.", "Example: a frozen road may be slippery, but a superconductor is 'slippery' to current when cold. Now do yours."], [
      ["A superconductor has, below its critical temperature, a resistance of...", "Zero", "Very high", "Exactly 1 ohm"],
      ["Superconductors must usually be kept...", "Extremely cold", "Very hot", "Wet"],
      ["A current in a superconductor loses...", "No energy as heat", "All its energy at once", "Energy as sound"],
      ["Superconducting magnets are used in...", "MRI scanners", "Toasters", "Torches"],
      ["Ordinary copper wires waste some energy as...", "Heat", "Sound", "Magnetism"],
      ["Liquid nitrogen or helium is used to...", "Cool the superconductor", "Heat the superconductor", "Light the circuit"],
      ["Strong superconducting magnets also appear in some...", "Maglev trains", "Bicycles", "Candles"],
      ["The temperature below which a material becomes a superconductor is called the...", "Critical temperature", "Boiling point", "Room temperature"]
    ]),
    les("Parallax", [
      ["Try your thumb", "👍", "Hold your thumb out and close one eye, then the other. Your thumb seems to jump against the background. This shift is called <b>parallax</b>."],
      ["Stars", "⭐", "As Earth orbits the Sun, nearby stars seem to shift a tiny bit against far-away stars. The <b>closer</b> the star, the <b>bigger</b> the shift."],
      ["Measuring", "📏", "Measuring the shift lets astronomers work out the distance to nearby stars. Very distant stars shift too little to measure this way."]
    ], ["Think about which objects jump more: near ones or far ones.", "The shift is caused by looking from two different places.", "Example: out of a car window, a near tree flashes past while distant hills hardly move. Now do yours."], [
      ["Parallax is the apparent shift of an object when seen from...", "Two different positions", "A darker room", "A lower speed"],
      ["Which star seems to shift more?", "A closer star", "A more distant star", "They shift equally"],
      ["Parallax is used to measure the distance to...", "Nearby stars", "The most distant galaxies", "Sound waves"],
      ["The viewing positions for stellar parallax come from...", "Earth's orbit around the Sun", "The Moon's phases", "Rotating binoculars"],
      ["Why can't parallax measure the most distant stars?", "The shift is too small", "They are too hot", "They make no light"],
      ["Closing one eye then the other and seeing your thumb jump is...", "Parallax", "Refraction", "Diffraction"],
      ["The closer a star is, the parallax angle is...", "Larger", "Smaller", "Zero"],
      ["Parallax needs a background of...", "Far-away stars", "Cloud", "The Moon only"]
    ]),
    les("Star colour and temperature", [
      ["Hot colours", "🌈", "A star's colour tells its surface temperature. <b>Blue-white</b> stars are the hottest, <b>yellow</b> stars like the Sun are in the middle and <b>red</b> stars are the coolest."],
      ["Numbers", "🌡️", "The Sun's surface is about 5500 °C. Red stars are about 3000 °C. Blue-white stars can be over 10 000 °C."],
      ["Like a heated metal", "🔩", "A heated iron bar glows dull red, then orange, then yellow-white as it gets hotter. Stars show the same pattern."]
    ], ["Think of a heated metal bar changing colour.", "The coolest glow is at the red end, and the hottest at the blue end.", "Example: the blue flame of a gas cooker is hotter than a candle's yellow flame. Now do yours."], [
      ["Which stars are the hottest?", "Blue-white stars", "Red stars", "Yellow stars"],
      ["Which stars are the coolest?", "Red stars", "Blue-white stars", "Yellow stars"],
      ["The Sun is a...", "Yellow star", "Blue star", "Red star"],
      ["A star looks red because its surface is...", "Relatively cool", "Extremely hot", "Frozen"],
      ["A hot blue-white star has a surface temperature of...", "Over 10 000 °C", "About 3000 °C", "About 0 °C"],
      ["A heated metal bar glows from dull red to...", "Yellow-white as it gets hotter", "Black", "Green"],
      ["Betelgeuse looks red, so it is...", "Cooler than the Sun's surface", "Hotter than the Sun", "Exactly as hot as the Sun"],
      ["The colour of a star tells us its...", "Surface temperature", "Distance directly", "Number of moons"]
    ]),
    les("Weightlessness in orbit", [
      ["Gravity is still there", "🛰️", "On the space station gravity is still about 90 percent as strong as on the ground. Astronauts float because they are <b>in free fall</b>."],
      ["Falling around the Earth", "🌍", "The station falls toward Earth all the time, but it moves sideways so fast (about 7.7 km/s) that it keeps missing it. Everything inside falls at the same rate, so nothing presses on anything else."],
      ["Mass vs weight", "⚖️", "An astronaut's <b>mass</b> is unchanged, but the feeling of weight is gone. A scale would read zero, and water floats in wobbly balls."]
    ], ["Think about what 'free fall' means, and about whether gravity has been switched off.", "The space station and the astronauts are falling together.", "Example: someone in a falling lift would also feel weightless for a moment. Now do yours."], [
      ["Astronauts on the ISS float because they are...", "In free fall together with the station", "Beyond gravity", "Lighter in mass"],
      ["At the ISS height, gravity is...", "Still strong, about 90 percent", "Zero", "Reversed"],
      ["An astronaut's mass in orbit is...", "The same as on Earth", "Zero", "Doubled"],
      ["The ISS stays in orbit because it moves...", "Sideways very fast as it falls", "Straight up", "With rocket engines on all the time"],
      ["A scale in a freely falling space station would read...", "Zero", "The normal weight", "Double"],
      ["Water in space forms...", "Floating blobs", "Flat puddles", "Ice cubes"],
      ["The ISS speed is about...", "7.7 km/s", "7.7 m/s", "77 km/h"],
      ["Everything inside the ISS falls at...", "The same rate", "Different rates by weight", "No rate"]
    ]),
    num("Area under a speed-time graph", [
      ["Distance from a graph", "📊", "The <b>area under a speed-time graph</b> is the distance travelled. For a rectangle: speed x time. For a triangle: ½ x base x height."],
      ["Two shapes", "🔺", "A car speeds up from 0 to 10 m/s in 4 s (triangle: ½ x 4 x 10 = 20 m), then stays at 10 m/s for 6 s (rectangle: 10 x 6 = 60 m). Total 80 m."],
      ["Check units", "📐", "Speed in m/s and time in s give distance in m."]
    ], () => {
      const v = pick([4, 6, 8, 10, 12]), t1 = pick([2, 4, 6]), t2 = ri(2, 8);
      return pick([
        { text: `A train speeds up steadily from rest to ${v} m/s in ${t1} s, then moves at ${v} m/s for ${t2} s. What is the total distance in metres?`, visual: "🚆", answer: v * t1 / 2 + v * t2,
          hints: ["Split the graph into a triangle and a rectangle.", "Triangle = ½ x time x speed. Rectangle = speed x time. Add them.", "Example: up to 6 m/s in 2 s, then 6 m/s for 3 s: 6 + 18 = 24 m. Now do yours."] },
        { text: `A speed-time graph shows a steady ${v} m/s for ${t2} s. How far does the object travel in metres?`, visual: "📈", answer: v * t2,
          hints: ["The shape under a flat line is a rectangle.", "Multiply the speed by the time.", "Example: 5 m/s for 4 s gives 5 x 4 = 20 m. Now do yours."] },
        { text: `A speed-time graph rises in a straight line from 0 to ${v} m/s over ${t1} s. How far has the object travelled in metres?`, visual: "🔺", answer: v * t1 / 2,
          hints: ["The shape under the line is a triangle.", "Area of a triangle = ½ x base x height.", "Example: 0 to 8 m/s over 5 s... uses ½ x 5 x 8 = 20 m. Now do yours."] }
      ]);
    }),
    les("Random and systematic errors", [
      ["Random errors", "🎲", "<b>Random errors</b> make readings scatter a bit above and below the true value, for example from reaction time with a stopwatch. Repeating and averaging reduces them."],
      ["Systematic errors", "📐", "<b>Systematic errors</b> push all readings the same way, for example a scale that reads 2 g with nothing on it (a <b>zero error</b>). Repeating does not fix them. You must correct or calibrate."],
      ["Reading carefully", "👀", "Reading a scale from an angle gives a <b>parallax error</b>. Look straight at the scale, level with your eye."]
    ], ["Ask: do the errors scatter both ways, or all push the same way?", "Repeating helps with one kind of error but not the other.", "Example: a clock that is always 5 minutes fast is always wrong in the same direction. Now do yours."], [
      ["A scale reads 2 g when empty. This is a...", "Systematic (zero) error", "Random error", "Perfect reading"],
      ["Repeating and averaging mostly reduces...", "Random errors", "Systematic errors", "Nothing at all"],
      ["Readings scattered above and below the true value suggest...", "Random error", "Systematic error", "No error at all"],
      ["Stopwatch reaction time gives mainly a...", "Random error", "Zero error", "Calculation error"],
      ["Reading a scale from an angle causes...", "Parallax error", "A new unit", "A shorter ruler"],
      ["To fix a systematic error you should...", "Calibrate or correct the instrument", "Repeat 100 times", "Ignore the instrument"],
      ["A ruler with a worn-off end gives readings that are always...", "Wrong in the same direction", "Randomly high or low", "Exactly right"],
      ["Which helps most to reduce random error?", "Taking many readings and finding the mean", "Using one reading", "Guessing"]
    ]),
    num("Measuring density", [
      ["The method", "⚖️", "Density = mass / volume. Measure the mass with a balance. For an irregular solid, find its volume by <b>displacement</b>: lower it into water and see how much the level rises."],
      ["Example", "🧪", "A stone has mass 90 g. The water in a measuring cylinder rises from 40 mL to 70 mL. The volume is 30 cm³ (1 mL = 1 cm³). Density = 90 / 30 = 3 g/cm³."],
      ["Careful", "👀", "Read the water level at the bottom of the curve, eye level with the scale."]
    ], () => {
      const d = ri(2, 9), V = pick([10, 15, 20, 25, 30, 40]), m = d * V, w = pick([40, 50, 60, 100]);
      return pick([
        { text: `A stone has a mass of ${m} g. It makes the water in a measuring cylinder rise from ${w} mL to ${w + V} mL. What is its density in g/cm³? (1 mL = 1 cm³)`, visual: "🪨", answer: d,
          hints: ["First find the stone's volume from the rise in the level.", "Density = mass / volume. The volume is the new level minus the old level.", "Example: mass 100 g, level 50 mL to 75 mL: 100 / 25 = 4 g/cm³. Now do yours."] },
        { text: `The water level rises from ${w} mL to ${w + V} mL when a metal cube is lowered in. What is the cube's volume in cm³?`, visual: "🧊", answer: V,
          hints: ["Displacement: the object pushes aside its own volume of water.", "Take the starting level away from the final level.", "Example: 30 mL rising to 55 mL means a volume of 25 cm³. Now do yours."] },
        { text: `A block has density ${d} g/cm³ and a volume of ${V} cm³. What is its mass in grams?`, visual: "⚖️", answer: m,
          hints: ["Rearrange density = mass / volume.", "Mass = density x volume.", "Example: density 3 and volume 20 gives mass 60 g. Now do yours."] }
      ]);
    }),
    les("Cooling curves", [
      ["Hot things cool", "☕", "A cup of hot tea cools fast at first, then more slowly. The bigger the temperature gap between an object and its surroundings, the faster it loses heat."],
      ["The graph", "📉", "A cooling graph (temperature against time) starts steep and then <b>flattens</b>. It flattens at the temperature of the surroundings, which is room temperature, not zero."],
      ["Slowing the cooling", "🧣", "A lid, a thicker insulator or a smaller surface area slows cooling. A bigger surface area, such as a wide flat dish, makes it faster."]
    ], ["Think about how big the temperature difference is at the start and at the end.", "The object cannot cool below the temperature of its surroundings.", "Example: a hot cup in a 20 °C room levels off at 20 °C, not at 0 °C. Now do yours."], [
      ["A cooling curve is steepest...", "At the start", "At the end", "In the middle only"],
      ["A cup of tea in a 20 °C room cools until it reaches...", "About 20 °C", "0 °C", "100 °C"],
      ["Cooling is fastest when the temperature difference to the surroundings is...", "Large", "Small", "Zero"],
      ["Putting a lid on a cup makes it cool...", "More slowly", "Faster", "At the same speed"],
      ["A wide, flat dish of soup cools...", "Faster than a tall narrow mug", "Slower than a tall narrow mug", "Not at all"],
      ["The cooling graph flattens out because...", "The object reaches the surroundings' temperature", "The object freezes", "The thermometer breaks"],
      ["A good insulator around a hot drink makes cooling...", "Slower", "Faster", "Impossible to measure"],
      ["On a cooling curve, the vertical axis shows...", "Temperature", "Time", "Mass"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [0, 1, 3, 4, 5, 7, 8, 10, 14, 16])),
    mix("Level 18 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 16: a, 17: b, 18: c });
})();
