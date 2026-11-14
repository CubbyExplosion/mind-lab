// ext/physics-13-15.js  Physics levels 13-15 (6th grade, 7th grade first half)
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

  // ================= LEVEL 13 =================
  const a = [
    les("Archimedes, Galileo, Newton", [
      ["Archimedes", "🛁", "<b>Archimedes</b> lived in ancient Greece. He explained levers and why things float. A famous story says he shouted 'Eureka!' (I found it!) in his bath."],
      ["Galileo", "🔭", "<b>Galileo</b> (about 400 years ago) used a telescope to see the moons of Jupiter. He also studied swinging pendulums and falling objects."],
      ["Newton", "🍎", "<b>Isaac Newton</b> explained gravity and the laws of motion. He also used a glass prism to show that white light is made of many colors."]
    ], ["Think about what each scientist is most famous for.", "Each of these scientists is linked to one big famous idea. Try to remember it from the slides.", "Example: Marie Curie is famous for studying radioactivity, so a question about radioactivity points to her. Now do yours."], [
      ["Who is said to have shouted 'Eureka!' in the bath?", "Archimedes", "Galileo", "Newton"],
      ["Who used a telescope to find four big moons of Jupiter?", "Galileo", "Archimedes", "Newton"],
      ["Who wrote down the laws of motion and explained gravity?", "Newton", "Galileo", "Archimedes"],
      ["Who is famous for explaining levers and floating?", "Archimedes", "Newton", "Galileo"],
      ["Who is said to have studied swinging lamps and pendulums?", "Galileo", "Newton", "Archimedes"],
      ["A story says an apple helped Newton think about...", "Gravity", "Magnets", "Sound"],
      ["Who lived in ancient Greece?", "Archimedes", "Newton", "Galileo"],
      ["Newton used a prism to show that white light is made of...", "Many colors", "Only one color", "Sound waves"]
    ]),
    les("Measuring tools", [
      ["Pick the right tool", "📏", "Each tool measures one thing: a <b>ruler</b> measures length, a <b>balance</b> measures mass, a <b>stopwatch</b> measures time."],
      ["More tools", "🌡️", "A <b>thermometer</b> measures temperature. A <b>measuring cylinder</b> measures the volume of a liquid. A <b>newton meter</b> measures force."],
      ["Reading well", "👀", "Read a scale with your eye level with it. Look straight at the mark so you do not read it a little too high or too low."]
    ], ["First ask: what quantity do I need to measure?", "Match the quantity (length, mass, time, temperature, volume, force) to the tool made for it.", "Example: to measure how long a pencil is, you need a ruler, because it measures length. Now do yours."], [
      ["Which tool measures the mass of an apple?", "A balance", "A stopwatch", "A thermometer"],
      ["Which tool measures how long a race takes?", "A stopwatch", "A ruler", "A measuring cylinder"],
      ["Which tool measures how much water is in a jug?", "A measuring cylinder", "A newton meter", "A ruler"],
      ["Which tool measures the temperature of soup?", "A thermometer", "A balance", "A stopwatch"],
      ["Which tool measures the pull of a spring?", "A newton meter", "A ruler", "A thermometer"],
      ["Which tool measures the width of a desk?", "A ruler or tape measure", "A balance", "A stopwatch"],
      ["When reading a scale, where should your eye be?", "Level with the mark", "Far above it", "Below it"],
      ["Which tool tells you how heavy a bag of flour is (its mass)?", "A balance", "A thermometer", "A ruler"]
    ]),
    les("Reading line graphs", [
      ["Two axes", "📈", "A line graph has two <b>axes</b>. The bottom one (x) often shows time or what you changed. The side one (y) shows what you measured."],
      ["Read the trend", "🔍", "If the line goes <b>up</b>, the measured value is growing. If it goes <b>down</b>, it is shrinking. A <b>flat</b> line means no change."],
      ["Steepness", "⛰️", "A steeper line means a faster change. Read a value by going up from the x number until you meet the line, then across to the y axis."]
    ], ["Describe how the numbers change from the first one to the last one.", "Going up means growing, going down means shrinking, and staying level means no change.", "Example: a plant is 5 cm, 8 cm, 11 cm in weeks 1, 2, 3. It grows 3 cm each week, so the line goes up steadily. Now do yours."], [
      ["A plant is 2 cm, 4 cm, 6 cm tall in weeks 1, 2, 3. The line goes...", "Up steadily", "Down", "Flat"],
      ["A cup of tea is 80°C, 60°C, 45°C over 3 minutes. The line goes...", "Down", "Up", "Flat"],
      ["A car stays at 50 km/h for 4 minutes. The speed line is...", "Flat", "Up", "Down"],
      ["Which line shows the fastest change?", "The steepest line", "The flattest line", "The shortest line"],
      ["Distance is 0 m, 5 m, 10 m, 15 m after 0, 1, 2, 3 s. How far does it go each second?", "5 m", "10 m", "15 m"],
      ["A line graph shows time along the bottom. What does the bottom axis show?", "Time", "Everything measured", "Nothing"],
      ["Temperature is 10°C, 10°C, 10°C. The graph line is...", "Flat", "Rising", "Falling"],
      ["In a graph of a rolling ball, the line gets steeper and steeper. The ball is...", "Speeding up", "Slowing down", "Staying still"]
    ]),
    num("Mean of readings", [
      ["Why repeat?", "🔁", "Scientists measure the same thing several times. The readings are a little different each time."],
      ["The mean", "🧮", "To find the <b>mean</b> (the average), add up all readings and divide by how many there are."],
      ["Example", "⏱️", "Times: 4 s, 6 s, 5 s. Total = 15. Divide by 3 readings: mean = 5 s."]
    ], () => {
      const m = ri(4, 20), d = ri(1, 3), x = shuf([m - d, m, m + d]);
      const n = pick([3, 4]), tot = m * n;
      return pick([
        { text: `A ball took ${x[0]} s, ${x[1]} s and ${x[2]} s to roll down a ramp. What is the mean time in seconds?`, visual: "⏱️", answer: m,
          hints: ["Add all the readings together first.", "Then divide the total by how many readings there are.", "Example: 3 s, 5 s, 4 s add to 12; 12 / 3 = 4 s. Now do yours."] },
        { text: `${n} readings add up to ${tot}. What is the mean?`, visual: "🧮", answer: m,
          hints: ["Mean means share the total equally.", "Divide the total by the number of readings.", "Example: 3 readings with a total of 21 have a mean of 21 / 3 = 7. Now do yours."] }
      ]);
    }),
    les("Bridges", [
      ["Beam bridge", "🌉", "A <b>beam bridge</b> is a flat strong beam resting on supports. It is simple, but it works best over short gaps."],
      ["Arch bridge", "🏛️", "An <b>arch bridge</b> is curved. The weight pushes along the curve and out to the ends, so the arch is squeezed. Stone is great at being squeezed."],
      ["Suspension bridge", "🏗️", "A <b>suspension bridge</b> hangs the road from strong cables held up by tall towers. It can cross very long gaps."]
    ], ["Think about the shape of the bridge and where its weight goes.", "Beams are flat, arches are curved, and suspension bridges hang from cables.", "Example: a bridge that is a flat plank over a small stream is a beam bridge. Now do yours."], [
      ["Which bridge hangs the road from cables and towers?", "Suspension bridge", "Beam bridge", "Arch bridge"],
      ["Which bridge is a curved shape that is squeezed by the load?", "Arch bridge", "Suspension bridge", "Beam bridge"],
      ["A plank laid over a ditch is a...", "Beam bridge", "Arch bridge", "Suspension bridge"],
      ["Which bridge can cross the longest gaps?", "Suspension bridge", "Beam bridge made of wood", "A single stone"],
      ["Old Roman stone bridges often used...", "Arches", "Cables", "Rubber"],
      ["In an arch, the stones are mostly being...", "Squeezed", "Stretched", "Melted"],
      ["In a suspension bridge, the cables are mostly being...", "Stretched", "Squeezed", "Bent flat"],
      ["Why do bridge builders use steel for cables?", "It is very strong when stretched", "It is very soft", "It floats"]
    ]),
    les("Strong shapes", [
      ["Triangles", "🔺", "A <b>triangle</b> cannot change shape unless a side breaks. That is why cranes, roofs and bike frames use triangles."],
      ["Arches and domes", "🕌", "Arches and domes spread weight out and down through their curves, so they carry heavy loads."],
      ["Tubes and beams", "🔩", "A hollow tube is strong for its weight. An I-shaped beam keeps most of its steel where it is needed, so it is strong and not too heavy."]
    ], ["Which shape stays rigid when you push on it?", "Think about a shape that cannot be squashed sideways without a side breaking.", "Example: a square frame can fold into a diamond, but adding a diagonal bar makes two triangles and stops it. Now do yours."], [
      ["Which shape is the most rigid in a frame?", "Triangle", "Square with no brace", "Four-sided shape that can slant"],
      ["Why are triangles used in crane arms?", "They do not squash out of shape", "They look nice", "They are light in color"],
      ["A square frame wobbles. How can you make it stiffer?", "Add a diagonal brace", "Take away a side", "Make it thinner"],
      ["Domes are good at...", "Spreading weight down through curves", "Floating", "Making sound"],
      ["Why are many bike frames made of tubes?", "Tubes are strong and light", "Tubes are heavy", "Tubes are soft"],
      ["An I-beam is shaped to be...", "Strong without using too much steel", "As weak as possible", "Round like a ball"],
      ["Which of these roof parts often uses triangles?", "Roof trusses", "Door handles", "Window glass"],
      ["Pylons carrying electric wires have lots of...", "Triangles", "Circles", "Springs"]
    ]),
    les("Bike gears and brakes", [
      ["Gears on a bike", "🚲", "A <b>low gear</b> makes pedaling easy but the bike moves slowly: good for hills. A <b>high gear</b> is harder to pedal but faster: good on flat roads."],
      ["Brakes", "🛑", "Brakes use <b>friction</b>. Rubber pads squeeze the wheel (or a metal disc). The movement energy turns into heat."],
      ["Chain and sprockets", "⛓️", "The chain carries the push from the pedals to the back wheel. Changing gear moves the chain to a bigger or smaller sprocket."]
    ], ["Think about whether the job needs easy pedaling or high speed.", "Low gears give easy pushing; high gears give more speed but need more effort.", "Example: a very steep hill needs a gear that is easy on your legs. Now do yours."], [
      ["Which gear is best for climbing a steep hill?", "A low gear", "A high gear", "No gear"],
      ["Which gear is good for speeding along a flat road?", "A high gear", "A low gear", "A broken gear"],
      ["Bike brakes work by...", "Friction", "Magic", "Gravity pulling up"],
      ["When a bike brakes, its movement energy mostly turns into...", "Heat", "Sound only", "Light"],
      ["What carries the push from the pedals to the back wheel?", "The chain", "The handlebar", "The saddle"],
      ["Why do brake pads wear out over time?", "Friction rubs them away", "They melt in water", "They grow bigger"],
      ["Wet brakes work worse because water...", "Reduces friction", "Increases friction", "Makes more heat"],
      ["Wide rubber tires help a bike grip because they have...", "High friction with the road", "No friction", "Springs inside"]
    ]),
    les("Balloons and submarines", [
      ["Hot air balloon", "🎈", "Hot air is <b>less dense</b> than cold air, so a hot air balloon is pushed up. To go down, the pilot lets the air cool."],
      ["Submarines", "🚢", "A submarine has <b>ballast tanks</b>. Fill them with water and it gets heavier (denser) and sinks. Fill them with air and it rises."],
      ["Why ships float", "⚓", "A steel ship floats because its hull is full of air. The ship as a whole is less dense than the water it pushes aside."]
    ], ["Think about density: less dense than the fluid around it floats, more dense sinks.", "Water in the tanks makes things heavier, air makes them lighter.", "Example: a wooden block floats because wood is less dense than water. Now do yours."], [
      ["A hot air balloon rises because the hot air inside is...", "Less dense than cold air", "Denser than cold air", "Made of water"],
      ["A submarine fills its ballast tanks with water to...", "Sink", "Rise", "Make light"],
      ["A submarine fills its tanks with air to...", "Rise", "Sink", "Go faster"],
      ["A steel ship floats because overall it is...", "Less dense than water", "Denser than water", "Made of wood"],
      ["A solid steel ball sinks because steel is...", "Denser than water", "Less dense than water", "Magnetic"],
      ["A helium balloon floats up because helium is...", "Lighter than air", "Heavier than air", "Hot"],
      ["To bring a hot air balloon down, the pilot...", "Lets the air cool", "Heats the air more", "Adds sand"],
      ["A life jacket helps you float because it holds lots of...", "Air or foam", "Water", "Metal"]
    ]),
    les("Wings and lift", [
      ["Four forces", "✈️", "A flying plane has four forces: <b>lift</b> (up), <b>weight</b> (down), <b>thrust</b> (forward from engines) and <b>drag</b> (air pushing back)."],
      ["Wings", "🪽", "A wing is curved on top. As it moves through the air, the air pressure above becomes lower than below. The wing is pushed up. That is <b>lift</b>."],
      ["Takeoff", "🛫", "To take off, a plane needs enough speed so the lift is bigger than its weight. That is why planes run down a long runway."]
    ], ["Which of the four forces is being asked about?", "Lift acts up, weight acts down, thrust pushes forward, drag pushes back.", "Example: a car's engine pushes it forward, which is like thrust. Now do yours."], [
      ["Which force pushes a plane up?", "Lift", "Weight", "Drag"],
      ["Which force do the engines provide?", "Thrust", "Drag", "Weight"],
      ["Which force acts against a plane's forward motion?", "Drag", "Thrust", "Lift"],
      ["For a plane to take off, lift must be...", "Bigger than its weight", "Smaller than its weight", "Zero"],
      ["Why do planes run along a long runway first?", "To reach enough speed for lift", "To get dirty", "To use up fuel"],
      ["A plane flying level at a steady speed has lift that equals its...", "Weight", "Thrust only", "Drag only"],
      ["Pressure above a wing is...", "Lower than below", "Higher than below", "Zero"],
      ["Which force pulls a plane toward the ground?", "Weight (gravity)", "Lift", "Thrust"]
    ]),
    num("Speeds: km/h and m/s", [
      ["Two units", "🔁", "Speed can be in km/h or in m/s. To change <b>km/h to m/s</b>, divide by 3.6. To change <b>m/s to km/h</b>, multiply by 3.6."],
      ["Why 3.6?", "🧠", "1 km is 1000 m and 1 hour is 3600 s. So 1 m/s is 3600 / 1000 = 3.6 km/h."],
      ["Example", "🏃", "36 km/h / 3.6 = 10 m/s. And 5 m/s x 3.6 = 18 km/h."]
    ], () => {
      const ms = pick([5, 10, 15, 20, 25, 30]);
      return pick([
        { text: `A cyclist rides at ${ms * 3.6} km/h. What is that in m/s?`, visual: "🚴", answer: ms,
          hints: ["Going from km/h to m/s makes the number smaller.", "Divide by 3.6.", "Example: 36 km/h / 3.6 = 10 m/s. Now do yours."] },
        { text: `A runner moves at ${ms} m/s. What is that in km/h?`, visual: "🏃", answer: ms * 3.6,
          hints: ["Going from m/s to km/h makes the number bigger.", "Multiply by 3.6.", "Example: 10 m/s x 3.6 = 36 km/h. Now do yours."] }
      ]);
    }),
    les("Keeping heat in", [
      ["Insulators trap heat", "🧣", "Materials that trap air, like wool, foam and feathers, are good <b>insulators</b>. Trapped air does not carry heat well."],
      ["Thermos flask", "🫗", "A flask has two walls with a <b>vacuum</b> between them. Heat cannot cross empty space by conduction or convection. Shiny walls also reflect heat back."],
      ["Houses", "🏠", "Loft insulation, wall filling and double glazing (two panes with a gap) all slow heat leaving a house. That saves energy and money."]
    ], ["Think: does the material trap air or let heat flow through it?", "Trapped air and empty space slow heat moving. Metals let it pass easily.", "Example: a duvet keeps you warm because it traps air in its filling. Now do yours."], [
      ["Why does a flask keep drinks hot?", "A vacuum between the walls slows heat", "It has a heater inside", "It is made of ice"],
      ["Double glazing helps because the gap between panes...", "Slows heat loss", "Lets heat out fast", "Makes noise"],
      ["Which is the best insulator?", "Wool", "Copper", "Iron"],
      ["Pan handles are often plastic or wood because they are...", "Poor conductors of heat", "Good conductors of heat", "Magnetic"],
      ["Loft insulation is thick and fluffy because it...", "Traps air", "Soaks up water", "Conducts heat well"],
      ["A shiny inside wall in a flask helps by...", "Reflecting heat back", "Making heat", "Absorbing heat"],
      ["Why wear several thin layers in the cold?", "Air trapped between layers insulates", "Layers make heat", "Layers are heavy"],
      ["A cooking pan base is metal because metal is a...", "Good conductor", "Good insulator", "Weak magnet"]
    ]),
    les("Musical instruments", [
      ["Strings", "🎸", "A string vibrates to make sound. <b>Short, thin, tight</b> strings make high notes. <b>Long, thick, loose</b> strings make low notes."],
      ["Pipes and winds", "🎺", "In pipes and horns, the air inside vibrates. A <b>longer</b> air column gives a <b>lower</b> note. Pressing keys changes the length."],
      ["Drums", "🥁", "A drum skin vibrates when hit. A bigger or looser drum gives a lower sound. Hitting it harder makes it louder."]
    ], ["Ask what is vibrating: a string, a column of air or a skin.", "Short or tight things vibrate faster and sound higher; long or loose things sound lower.", "Example: a very short guitar string sounds higher than a long one. Now do yours."], [
      ["A shorter string gives a...", "Higher note", "Lower note", "Louder note only"],
      ["A thicker string usually gives a...", "Lower note", "Higher note", "Silent note"],
      ["Tightening a guitar string makes the note...", "Higher", "Lower", "The same"],
      ["A longer pipe makes a...", "Lower note", "Higher note", "Brighter color"],
      ["What vibrates inside a flute?", "Air", "A big string", "A drum skin"],
      ["Hitting a drum harder makes it...", "Louder", "Higher in pitch", "Silent"],
      ["A big bass drum sounds...", "Lower than a small drum", "Higher than a small drum", "Exactly the same"],
      ["A violin sound comes mainly from...", "Vibrating strings", "Vibrating drum skin", "Light"]
    ]),
    les("Eclipses", [
      ["Solar eclipse", "🌞", "In a <b>solar eclipse</b> the Moon passes between the Sun and Earth and its shadow falls on part of Earth. The Sun is partly or fully hidden."],
      ["Lunar eclipse", "🌕", "In a <b>lunar eclipse</b> Earth is between the Sun and the Moon. Earth's shadow falls on the Moon, which often looks reddish."],
      ["Safety", "🕶️", "Never look straight at the Sun, even in an eclipse. Special eclipse glasses or a pinhole viewer are the safe ways to watch."]
    ], ["Draw the Sun, Earth and Moon in a line. Which one is in the middle?", "For a solar eclipse the shadow falls on Earth; for a lunar eclipse it falls on the Moon.", "Example: a shadow of a ball falls on the wall behind it, so the ball is in the middle. Now do yours."], [
      ["In a solar eclipse, which body is in the middle?", "The Moon", "The Earth", "Mars"],
      ["In a lunar eclipse, which body is in the middle?", "The Earth", "The Moon", "The Sun"],
      ["During a lunar eclipse, whose shadow falls on the Moon?", "Earth's", "The Sun's", "Mars's"],
      ["Is it safe to look straight at a solar eclipse?", "No, never without special glasses", "Yes, it is fine", "Yes, if you squint"],
      ["A solar eclipse happens when the Moon blocks...", "Sunlight", "Starlight from Mars", "Earth's air"],
      ["Eclipses show that light travels in...", "Straight lines", "Zigzags", "Circles"],
      ["A safe way to watch a solar eclipse is a...", "Pinhole viewer", "Telescope without a filter", "Bare eyes"],
      ["A lunar eclipse can be seen from...", "Anywhere on the night side of Earth", "Only the poles", "Only from space"]
    ]),
    les("Cells and batteries", [
      ["Chemical to electrical", "🔋", "A <b>cell</b> changes stored chemical energy into electrical energy. Several cells joined together make a <b>battery</b>."],
      ["Voltage", "⚡", "An AA cell gives about 1.5 volts. Two in series give about 3 volts. More voltage means a bigger push on the charge."],
      ["Using batteries well", "♻️", "Rechargeable batteries can be refilled with electrical energy again. Old batteries should be recycled, and small button batteries kept away from little children."]
    ], ["Think about what kind of energy is stored inside.", "A cell stores chemical energy. A battery is a group of cells.", "Example: a torch battery turns stored chemical energy into light and heat in the bulb. Now do yours."], [
      ["A cell stores energy in the form of...", "Chemical energy", "Sound energy", "Gravitational energy"],
      ["A battery is...", "Several cells joined together", "One lamp", "A kind of wire"],
      ["Two 1.5 V cells in series give about...", "3 V", "1.5 V", "0 V"],
      ["A rechargeable battery can be...", "Charged again", "Used only once", "Eaten"],
      ["Old batteries should be...", "Recycled", "Thrown in a fire", "Opened"],
      ["When a battery goes flat, its stored chemical energy is...", "Used up", "Growing", "Turning into more cells"],
      ["Which has a battery inside?", "A phone", "A paper cup", "A rock"],
      ["Small button batteries should be kept away from...", "Little children", "Calculators", "Clocks"]
    ]),
    les("Fuses and switches", [
      ["Switches", "🔘", "A <b>switch</b> opens or closes a circuit. Closed means the circuit is a complete loop and current flows. Open means a gap and no current."],
      ["Fuses", "🧯", "A <b>fuse</b> has a thin wire that heats up and melts if too much current flows. It breaks the circuit before wires get dangerously hot."],
      ["Circuit breakers", "🚨", "A <b>circuit breaker</b> does the same job but flips a switch off instead of melting. You can switch it back on once the fault is fixed."]
    ], ["Does the job need to open the circuit by hand or automatically?", "A fuse protects against too much current by breaking the circuit.", "Example: a switch on a lamp breaks the loop so the lamp goes off. Now do yours."], [
      ["What does a fuse protect against?", "Too much current", "Too little current", "Loud sounds"],
      ["What happens inside a fuse when the current is too large?", "The thin wire melts", "The wire grows", "The wire becomes a magnet"],
      ["An open switch means the circuit is...", "Broken, no current flows", "Complete, current flows", "Full of water"],
      ["A circuit breaker can be...", "Switched back on after the fault is fixed", "Used only once", "Eaten"],
      ["A fuse is connected...", "In series with the appliance", "Far away from it", "Only to the plug's outside"],
      ["Why is a fuse wire thin?", "So it melts easily when current is too high", "To save money only", "To be magnetic"],
      ["A closed switch makes the circuit...", "A complete loop", "A broken loop", "Colder"],
      ["Which does NOT automatically cut off a dangerous current?", "A simple light switch", "A fuse", "A circuit breaker"]
    ]),
    les("Telescopes and microscopes", [
      ["Telescopes", "🔭", "A <b>telescope</b> collects light from far-away things and makes them look bigger and brighter. Bigger lenses or mirrors collect more light."],
      ["Microscopes", "🔬", "A <b>microscope</b> magnifies tiny things. In 1665 Robert Hooke looked at thin cork through one and named the tiny boxes he saw <b>cells</b>."],
      ["Space telescopes", "🛰️", "The Hubble Space Telescope orbits above the air, so its pictures are not blurred by the atmosphere."]
    ], ["Is the thing far away or very small?", "Telescopes help with distant things; microscopes help with tiny things.", "Example: to look closely at a grain of sand you would use a microscope. Now do yours."], [
      ["Which instrument helps you see the Moon's craters better?", "Telescope", "Microscope", "Stopwatch"],
      ["Which instrument shows tiny cells?", "Microscope", "Telescope", "Thermometer"],
      ["Bigger telescope mirrors collect more...", "Light", "Sound", "Heat only"],
      ["Who named 'cells' after looking at cork?", "Robert Hooke", "Archimedes", "Newton"],
      ["Why does the Hubble telescope orbit above the air?", "The air does not blur its pictures", "To stay cool", "To hear sounds"],
      ["Galileo used a telescope to look at...", "Jupiter and its moons", "Tiny cells", "Atoms"],
      ["Which part of a microscope makes the sample look bigger?", "Lenses", "The stand", "The light switch"],
      ["Telescopes and microscopes both use...", "Lenses or mirrors", "Wires and fuses", "Speakers"]
    ]),
    les("Physics in sport", [
      ["Friction and grip", "⚽", "Football studs and running spikes dig into the ground to increase <b>friction</b> so athletes do not slip."],
      ["Streamlining", "🏊", "Swimmers wear smooth suits, and cyclists wear helmets and tight clothes, to reduce <b>drag</b> from water or air."],
      ["Throwing and spin", "🏀", "A ball thrown at an angle of about 45° goes farthest on level ground (ignoring air). Spin can make a ball curve in the air."]
    ], ["Is the sport trying to increase grip or reduce drag?", "Studs and spikes help grip; smooth suits help slip through air or water.", "Example: a cyclist crouches low to reduce air drag. Now do yours."], [
      ["Why do running shoes have spikes?", "To increase grip", "To reduce friction to zero", "To make noise"],
      ["Why do swimmers wear smooth suits?", "To reduce drag", "To increase drag", "To stay dry"],
      ["Why does a cyclist crouch low?", "To reduce air drag", "To get more friction", "To slow down"],
      ["Which angle sends a ball farthest on flat ground (ignoring air)?", "About 45°", "About 90°", "About 0°"],
      ["Spin on a football can make it...", "Curve in the air", "Go through walls", "Float away"],
      ["A pole vault pole stores energy by...", "Bending", "Melting", "Glowing"],
      ["A gymnast tucks in to spin faster, because a smaller shape...", "Spins quicker", "Spins slower", "Stops spinning"],
      ["Wearing a helmet helps by...", "Spreading out the force of an impact", "Reducing gravity", "Making you faster"]
    ]),
    les("Units and symbols", [
      ["SI units", "📐", "Scientists share units: <b>meter (m)</b> for length, <b>kilogram (kg)</b> for mass, <b>second (s)</b> for time, <b>kelvin or °C</b> for temperature."],
      ["Units from others", "🧩", "Force is in <b>newtons (N)</b>, energy in <b>joules (J)</b>, power in <b>watts (W)</b>, current in <b>amperes (A)</b>, voltage in <b>volts (V)</b>."],
      ["Named after people", "🏅", "Newton, Joule, Watt, Ampere and Volt were all scientists. A unit named after a person starts with a small letter when spelled out, but its symbol is a capital."]
    ], ["Match the quantity to its unit.", "Think of the symbols: m, kg, s, N, J, W, A, V, each belongs to one quantity.", "Example: speed in meters per second is written m/s. Now do yours."], [
      ["The unit of force is the...", "Newton", "Joule", "Watt"],
      ["The unit of energy is the...", "Joule", "Newton", "Volt"],
      ["The unit of power is the...", "Watt", "Ampere", "Newton"],
      ["The unit of electric current is the...", "Ampere", "Volt", "Joule"],
      ["The unit of voltage is the...", "Volt", "Watt", "Newton"],
      ["Mass is measured in...", "Kilograms", "Meters", "Seconds"],
      ["What does the symbol 's' stand for?", "Second", "Speed", "Sound"],
      ["Which of these is NOT a unit?", "Gravity", "Meter", "Second"]
    ]),
    mix("Mixed practice", [])
  ];
  a.pop();
  a.push(
    mix("Mixed practice", at(a, [1, 2, 3, 4, 6, 8, 9, 11, 12, 15])),
    mix("Level 13 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 14 =================
  const b = [
    les("Faraday, Curie, Einstein", [
      ["Michael Faraday", "🧲", "<b>Michael Faraday</b> (1831) showed that moving a magnet near a wire makes electricity. This idea is behind generators and power stations."],
      ["Marie Curie", "☢️", "<b>Marie Curie</b> studied radioactivity. She won two Nobel Prizes, one in physics (1903) and one in chemistry (1911)."],
      ["Einstein and others", "🧠", "<b>Albert Einstein</b> developed the theory of relativity. <b>Alessandro Volta</b> made the first battery (1800). <b>Heinrich Hertz</b> proved radio waves exist."]
    ], ["Think about the one big idea that each person is famous for.", "Match the discovery (generators, radioactivity, relativity, batteries, radio waves) to the person.", "Example: Newton is famous for gravity and the laws of motion. Now do yours."], [
      ["Who showed that a moving magnet can make electricity?", "Faraday", "Curie", "Einstein"],
      ["Who studied radioactivity and won two Nobel Prizes?", "Marie Curie", "Faraday", "Volta"],
      ["Who developed the theory of relativity?", "Einstein", "Hertz", "Faraday"],
      ["Who made the first battery in 1800?", "Volta", "Einstein", "Curie"],
      ["Who showed that radio waves exist?", "Hertz", "Volta", "Curie"],
      ["The unit of frequency is named after...", "Hertz", "Faraday", "Einstein"],
      ["Generators in power stations use an idea from...", "Faraday", "Curie", "Hertz"],
      ["Which scientist won Nobel Prizes in two different sciences?", "Marie Curie", "Alessandro Volta", "Heinrich Hertz"]
    ]),
    num("Scale drawings", [
      ["What a scale is", "🗺️", "A <b>scale</b> tells you how real sizes shrink on paper. '1 cm = 5 m' means each 1 cm on the drawing is 5 m in real life."],
      ["Real length", "📏", "Real length = drawing length x the scale. A line of 4 cm on a 1 cm = 5 m drawing is 4 x 5 = 20 m."],
      ["Drawing length", "✏️", "To find the drawing length, divide the real length by the scale. A real 30 m is 30 / 5 = 6 cm on the drawing."]
    ], () => {
      const s = pick([2, 5, 10, 20, 50]), d = ri(2, 12);
      return pick([
        { text: `On a plan, 1 cm stands for ${s} m. A building is ${d} cm long on the plan. How long is it really, in meters?`, visual: "🗺️", answer: d * s,
          hints: ["Each centimeter on the plan stands for the same number of meters.", "Multiply the plan length by the meters for each centimeter.", "Example: 1 cm = 4 m and a line of 3 cm is 3 x 4 = 12 m. Now do yours."] },
        { text: `On a plan, 1 cm stands for ${s} m. A path is really ${d * s} m long. How long is it on the plan, in cm?`, visual: "🛤️", answer: d,
          hints: ["How many 1 cm steps does the real length hold?", "Divide the real length by the meters for each centimeter.", "Example: 1 cm = 4 m and a real 20 m path is 20 / 4 = 5 cm. Now do yours."] }
      ]);
    }),
    les("Patterns in graphs", [
      ["Straight line through zero", "📈", "If doubling one thing doubles the other, the graph is a straight line through the origin (0,0). This is <b>direct proportion</b>."],
      ["Going the other way", "↘️", "If one goes up while the other goes down, the line slopes <b>downward</b>. For example, the faster you travel, the less time a trip takes."],
      ["Curves", "〰️", "A curve means the change speeds up or slows down. A flat line means one value does not change at all."]
    ], ["Look at what happens to the second number when the first doubles.", "Same direction and same size of change means a straight line through zero; opposite directions mean a downward slope.", "Example: 1 kg of apples costs 2 coins, 2 kg costs 4, so cost is in direct proportion to weight. Now do yours."], [
      ["Mass 1, 2, 3 kg stretches a spring 2, 4, 6 cm. The graph is a...", "Straight line through zero", "Flat line", "Downward slope"],
      ["The faster a car goes, the less time the trip takes. The graph slopes...", "Downward", "Upward through zero", "Flat"],
      ["A horizontal line means the measured value...", "Does not change", "Doubles", "Falls fast"],
      ["Which describes direct proportion?", "Double one, double the other", "Double one, halve the other", "No link at all"],
      ["Two plants: height is 4 cm, 8 cm, 16 cm over time. The line is...", "A curve getting steeper", "Flat", "Sloping down"],
      ["A cooling cup of tea: temperature falls quickly then slowly. The graph is...", "A curve that levels off", "A perfectly straight rise", "A vertical line"],
      ["Which graph would show a car at a steady speed on a distance-time graph?", "A straight sloping line", "A random zigzag", "A vertical line"],
      ["A distance-time line that is flat means the object is...", "Standing still", "Speeding up", "Moving fast"]
    ]),
    les("Accurate and precise", [
      ["Accurate", "🎯", "A measurement is <b>accurate</b> if it is close to the true value."],
      ["Precise", "🔁", "Measurements are <b>precise</b> if repeated readings are close to each other, even if they are all a bit wrong."],
      ["Good habits", "✅", "Check your tool starts at zero (a wrong start is a <b>zero error</b>), read at eye level, and repeat the reading."]
    ], ["Does the answer concern closeness to the true value or closeness between repeated readings?", "Accurate is about the truth; precise is about the readings agreeing.", "Example: an arrow cluster tight together but away from the bullseye is precise but not accurate. Now do yours."], [
      ["Readings close to the true value are...", "Accurate", "Colorful", "Heavy"],
      ["Readings close to each other are...", "Precise", "Accurate", "Wrong"],
      ["A ruler's end is worn so it starts at 1 cm, not 0. This is a...", "Zero error", "Perfect scale", "Pressure"],
      ["Readings are 9.8 s, 9.9 s, 9.8 s but the true value is 12 s. They are...", "Precise but not accurate", "Accurate but not precise", "Both"],
      ["Why read a scale at eye level?", "To avoid reading too high or too low", "To make the scale shine", "To make it heavier"],
      ["Repeating measurements helps because...", "It shows how precise they are", "It makes the object bigger", "It slows time"],
      ["A good scientist checks their tool starts at...", "Zero", "Ten", "Anything"],
      ["Readings that are both close to the truth and to each other are...", "Accurate and precise", "Neither", "Heavy and light"]
    ]),
    les("Water towers and dams", [
      ["Deeper, more pressure", "🌊", "Pressure in a liquid grows with <b>depth</b>. The deeper you go, the greater the pressure."],
      ["Dams", "🏞️", "A dam wall is thicker at the bottom because the water pushes hardest there."],
      ["Water towers", "🗼", "Water stored high up flows down through pipes with high pressure. That is how water reaches taps without needing a pump at every house."]
    ], ["Think about depth: shallow or deep?", "More depth of water means more pressure.", "Example: the bottom of a swimming pool feels more pressure on your ears than the surface. Now do yours."], [
      ["Where is water pressure the greatest in a lake?", "At the bottom", "At the surface", "It is the same everywhere"],
      ["Why is a dam thicker at the bottom?", "Water pushes harder there", "To look nice", "Water pushes harder at the top"],
      ["Why are water tanks built on hills or towers?", "Height gives pressure in the pipes", "To catch birds", "To stay cool"],
      ["A hole low in a bottle leaks water that shoots out...", "Farther than a high hole", "Less far than a high hole", "Never"],
      ["Divers feel more pressure when they go...", "Deeper", "Higher", "Faster"],
      ["A taller water tower makes the pressure at the tap...", "Greater", "Smaller", "Zero"],
      ["Submarines need strong hulls because pressure at depth is...", "Very large", "Zero", "Small"],
      ["Pressure in a liquid pushes in...", "All directions", "Only down", "Only up"]
    ]),
    les("Earthquake-proof buildings", [
      ["Seismic waves", "🌍", "Earthquakes send <b>seismic waves</b> through the ground. A <b>seismograph</b> records the shaking."],
      ["Safe buildings", "🏢", "Strong buildings in earthquake zones are light, flexible and braced with triangles. They sway instead of snapping."],
      ["Base isolators", "🛞", "Some buildings sit on rubber and steel pads called <b>base isolators</b> that soak up the shaking before it reaches the building."]
    ], ["Think about how a building can absorb or survive shaking.", "Flexible and braced buildings do better than stiff and heavy ones.", "Example: a tall thin tree bends in the wind instead of breaking. Now do yours."], [
      ["What does a seismograph record?", "Ground shaking", "Wind speed", "Temperature"],
      ["Earthquake-ready buildings are often...", "Flexible and braced", "Very brittle", "Built on loose sand"],
      ["Diagonal braces are made of triangles to keep a frame...", "Rigid", "Wobbly", "Floating"],
      ["Rubber base isolators help by...", "Soaking up shaking", "Making shaking worse", "Melting"],
      ["Seismic waves travel through...", "The ground", "Only the air", "Only space"],
      ["A lighter roof helps because there is less weight to...", "Fall and swing", "Float", "Charge"],
      ["Which material can bend a little without snapping?", "Steel", "Glass", "Dry biscuit"],
      ["Earthquake drills teach people to...", "Drop, cover and hold on", "Run towards the shaking", "Stand under big windows"]
    ]),
    les("Trains and maglev", [
      ["Steel on steel", "🚆", "Train wheels roll on steel rails. There is very little friction, so a train can pull heavy loads with little energy."],
      ["Magnetic levitation", "🧲", "A <b>maglev</b> train floats just above its track using magnets. Like poles repel, so there is no rolling or rubbing."],
      ["Speed", "💨", "With so little friction, maglev trains can reach about 600 km/h in tests. Air drag is then the main force that slows them down."]
    ], ["Think about what is rubbing or what is pushing apart.", "Magnets with the same pole facing each other push apart.", "Example: two bar magnets with north poles together push apart without touching. Now do yours."], [
      ["A maglev train floats because magnets...", "Repel each other", "Attract the track hard", "Melt the track"],
      ["Why is a steel wheel on a steel rail good for trains?", "Low friction", "High friction", "It floats"],
      ["Maglev trains have less friction because they...", "Do not touch the track", "Use big tires", "Drag along"],
      ["When maglev trains go very fast, the main slowing force is...", "Air drag", "Gravity pulling up", "Magnetic fields"],
      ["Poles that are alike...", "Repel", "Attract", "Melt"],
      ["Which uses magnets to float?", "A maglev train", "A bicycle", "A bus"],
      ["Slippery wet leaves on a track reduce...", "Grip (friction)", "Gravity", "Mass"],
      ["Because there is little friction, a train can pull heavy loads using...", "Less energy", "More energy", "No force at all"]
    ]),
    les("Satellites", [
      ["Orbiting", "🛰️", "A satellite moves sideways so fast that as it falls toward Earth it keeps missing it. This is an <b>orbit</b>. The Moon is a natural satellite."],
      ["Jobs in space", "📡", "Satellites help with weather forecasts, TV and phone signals, maps (GPS) and studying Earth and space."],
      ["Orbit times", "⏳", "The International Space Station orbits about 400 km up and circles Earth about every 90 minutes. A geostationary satellite takes 24 hours, so it stays above the same place."]
    ], ["Think about what satellites do and how they move.", "A satellite is always falling around Earth, not floating without gravity.", "Example: the Moon is held in orbit by gravity. Now do yours."], [
      ["What keeps a satellite in orbit?", "Gravity and sideways speed", "Wind", "Magnets in the ground"],
      ["Which is a natural satellite of Earth?", "The Moon", "The Sun", "Mars"],
      ["Satellites help give us...", "Weather forecasts", "Ice cream", "Rain"],
      ["GPS uses signals from...", "Satellites", "Whales", "Mountains"],
      ["A geostationary satellite orbits once in about...", "24 hours", "90 minutes", "1 minute"],
      ["The ISS circles Earth roughly every...", "90 minutes", "24 hours", "1 year"],
      ["Satellites often use solar panels to get...", "Electric power", "Water", "Food"],
      ["Astronauts in the ISS float because they are...", "In free fall around Earth", "Beyond gravity", "Very light by nature"]
    ]),
    les("How a fridge works", [
      ["Moving heat", "❄️", "A fridge does not make cold. It <b>moves heat</b> from inside the box to the outside."],
      ["The cycle", "🔄", "A special liquid inside pipes evaporates in the cold part and takes in heat. A pump squeezes the gas, and it gives out heat at the back as it turns to liquid again."],
      ["Warm back", "🌡️", "The pipes at the back of a fridge feel warm. If you leave the door open, the fridge works hard but the room gets warmer, not cooler."]
    ], ["Think about where the heat is picked up and where it is released.", "The fridge moves heat; it does not destroy it.", "Example: a sponge takes up water in one place and squeezes it out in another. A fridge does that with heat. Now do yours."], [
      ["A fridge works by...", "Moving heat out of the box", "Making cold appear", "Burning cold fuel"],
      ["The pipes at the back of a fridge are...", "Warm", "Freezing", "Glowing"],
      ["Inside the fridge, the liquid in pipes...", "Evaporates and takes in heat", "Freezes the food", "Makes light"],
      ["Leaving the fridge door open makes the room...", "Warmer", "Colder", "The same"],
      ["Fridges are insulated to...", "Slow heat getting in", "Make heat", "Help food melt"],
      ["Which uses the same idea as a fridge?", "An air conditioner", "A torch", "A fan only"],
      ["Putting hot food in a fridge makes the fridge...", "Work harder", "Work less", "Stop working"],
      ["The heat taken from the food goes...", "Out into the room", "Into nowhere", "Into the cold"]
    ]),
    num("Gear turns", [
      ["Gears with teeth", "⚙️", "Meshed gears pass motion on. Each time one gear moves by one tooth, the other moves by one tooth too."],
      ["Counting teeth", "🧮", "Turns of the second gear = turns of the first x (teeth on first / teeth on second). A bigger gear turns slower, a smaller gear turns faster."],
      ["Example", "🔢", "A 10-tooth gear turns 6 times and drives a 20-tooth gear. The big gear turns 6 x 10 / 20 = 3 times."]
    ], () => {
      const a1 = pick([8, 12, 16, 24]), b1 = pick([8, 12, 16, 24].filter(x => x !== a1)), k = ri(1, 3), n = b1 * k;
      return { text: `A gear with ${a1} teeth turns ${n} times. It drives a gear with ${b1} teeth. How many times does the second gear turn?`, visual: "⚙️", answer: a1 * k,
        hints: ["Count how many teeth pass by in total, then see how many fit a turn of the second gear.", "Turns of second gear = turns of first x teeth of first / teeth of second.", "Example: a 10-tooth gear turning 6 times drives a 20-tooth gear: 6 x 10 / 20 = 3 turns. Now do yours."] };
    }),
    les("Cameras and pinholes", [
      ["Pinhole camera", "📷", "A tiny hole in a dark box lets rays of light cross over, so the picture on the back is <b>upside down</b>."],
      ["Lens cameras", "🔍", "A real camera uses a <b>lens</b> to bend light and focus it into a clear, bright picture on a sensor."],
      ["Like the eye", "👁️", "A camera is a lot like your eye. The lens focuses, the pupil/aperture controls how much light enters, and a sensor or retina catches the picture."]
    ], ["Think about what a camera needs to bend light and to catch the picture.", "Light travels in straight lines and crosses over at the pinhole.", "Example: a lens in a magnifying glass bends light to a point. Now do yours."], [
      ["A pinhole camera makes an image that is...", "Upside down", "Right way up", "Invisible"],
      ["Which part of a camera bends light to focus it?", "The lens", "The strap", "The battery door"],
      ["A camera sensor does the same job as the eye's...", "Retina", "Eyelid", "Eyebrow"],
      ["The aperture controls how much...", "Light enters", "Sound enters", "Heat leaves"],
      ["A pinhole camera works because light travels...", "In straight lines", "In circles", "Only at night"],
      ["In a dark room, a camera needs...", "More light or a flash", "Less light", "A louder noise"],
      ["A smaller pinhole makes the picture...", "Sharper but dimmer", "Brighter but blurry", "Louder"],
      ["The pupil of the eye is like a camera's...", "Aperture", "Case", "Screen"]
    ]),
    les("Sonar and ultrasound", [
      ["Sonar", "🚢", "<b>Sonar</b> sends a pulse of sound under water. It bounces off the sea floor and the echo returns. A computer works out depth from the time taken."],
      ["Ultrasound", "📶", "<b>Ultrasound</b> is sound with a pitch too high for people to hear (above 20,000 Hz). Doctors use it to make safe pictures of babies before birth."],
      ["Depth sum", "🧮", "Depth = speed of sound x time / 2, because the sound goes down and back. In water the speed is about 1500 m/s."]
    ], ["Think about sound waves that bounce back.", "The echo time covers the trip down and back up.", "Example: an echo from a cliff comes back after 2 s; the cliff is half the total path away. Now do yours."], [
      ["Sonar uses...", "Sound pulses", "Light beams", "Radio waves only"],
      ["Ultrasound is sound that is...", "Too high for people to hear", "Too quiet to measure", "Always loud"],
      ["Doctors use ultrasound to look at...", "Babies before birth", "Rainbows", "Stars"],
      ["Sonar finds the sea depth by timing the...", "Echo", "Wind", "Moon"],
      ["In sonar the echo time covers...", "The trip down and back", "Only the trip down", "Only the trip back"],
      ["Humans hear sounds from about 20 Hz to about...", "20,000 Hz", "200 Hz", "2,000,000 Hz"],
      ["Boats use sonar to find...", "Fish and the sea floor", "Mountains in the sky", "The wind"],
      ["Sound travels faster in water than in air, so sonar sound...", "Comes back quickly", "Never returns", "Turns into light"]
    ]),
    les("From filament to LED", [
      ["Old bulbs", "💡", "An old <b>filament bulb</b> has a thin wire that glows white-hot. Most of its energy becomes heat, not light, so it is not efficient."],
      ["LEDs", "🌈", "An <b>LED</b> makes light directly and wastes much less energy. It also lasts many times longer."],
      ["Safety and saving", "🧯", "Never touch a bulb that has been on, as it can be hot. Swapping to LEDs lowers electricity bills."]
    ], ["Think about where the energy goes: light or heat?", "LEDs waste less energy as heat than filament bulbs.", "Example: a hairdryer turns most of its electricity into heat. A filament bulb does a lot of that too. Now do yours."], [
      ["In an old filament bulb, most of the energy becomes...", "Heat", "Sound", "Light"],
      ["Which bulb is more efficient?", "LED", "Filament", "They are the same"],
      ["A filament glows because it is...", "White-hot", "Cold", "Frozen"],
      ["An LED lasts...", "Much longer than a filament bulb", "Shorter than a filament bulb", "One second"],
      ["Why swap to LED bulbs?", "They save electricity", "They use more electricity", "They make heat"],
      ["Why not touch a bulb that has been on?", "It may be hot", "It is slippery", "It can sing"],
      ["The thin wire inside an old bulb is called the...", "Filament", "Fuse", "Switch"],
      ["Which wastes the most energy as heat?", "A filament bulb", "An LED", "A solar cell"]
    ]),
    les("Compasses and navigation", [
      ["The needle", "🧭", "A compass needle is a small magnet. It lines up with Earth's magnetic field, so one end points north."],
      ["Using it", "🗺️", "With a map and a compass, travelers can find their direction even when they cannot see far. Keep magnets and iron away from it."],
      ["Other magnet uses", "🔔", "Magnets are also used in loudspeakers, door catches, fridge doors and electric motors."]
    ], ["Remember the compass needle is a magnet.", "Earth acts like a giant bar magnet; the needle follows its field.", "Example: iron nails near a compass can pull the needle off. Now do yours."], [
      ["A compass needle is a small...", "Magnet", "Mirror", "Lens"],
      ["The needle lines up with Earth's...", "Magnetic field", "Rain", "Moon"],
      ["Which can spoil a compass reading?", "A nearby magnet", "A nearby piece of paper", "A nearby cloud"],
      ["A loudspeaker uses a magnet and a...", "Coil of wire", "Mirror", "Fuse"],
      ["A compass needle's one end points roughly...", "North", "At the Sun", "At the Moon"],
      ["Sailors used compasses to find...", "Direction", "Fish", "Time of day only"],
      ["Which uses magnets?", "A fridge door seal", "A glass window", "A wooden spoon"],
      ["Earth's magnetic field is made by...", "Moving metal deep inside Earth", "The Moon", "Clouds"]
    ]),
    les("Energy in food", [
      ["Fuel for the body", "🍎", "Food stores chemical energy. Our bodies use it to move, think, grow and keep warm at about 37°C."],
      ["Measuring it", "🔥", "Food energy is measured in <b>kilojoules (kJ)</b> or <b>Calories</b>. Fats hold more energy per gram than sugars or starch."],
      ["The Sun's gift", "☀️", "Plants make food using sunlight. So almost all the energy in our food started as energy from the Sun."]
    ], ["Where does the energy in food come from, and how is it used?", "Plants capture sunlight and animals eat plants or other animals.", "Example: we eat an apple, and the apple tree got its energy from sunlight. Now do yours."], [
      ["Food energy is stored as...", "Chemical energy", "Sound energy", "Magnetic energy"],
      ["Food energy is measured in...", "Kilojoules or Calories", "Meters", "Newtons"],
      ["Almost all food energy comes from the...", "Sun", "Moon", "Wind"],
      ["Which holds more energy per gram?", "Fat", "Water", "Salt"],
      ["Running uses ___ energy than sitting.", "More", "Less", "No"],
      ["Our body temperature is about...", "37°C", "10°C", "100°C"],
      ["Plants make food using...", "Sunlight", "Sound", "Magnets"],
      ["A sleeping person still uses energy for...", "Breathing and keeping warm", "Nothing at all", "Making electricity"]
    ]),
    les("Dark and light colors", [
      ["Absorb or reflect", "🎨", "Dark, matt surfaces <b>absorb</b> more of the Sun's heat and light. Light, shiny surfaces <b>reflect</b> more."],
      ["In real life", "🏠", "People in hot places often paint houses white to stay cooler. Solar panels are dark to soak up as much sunlight as possible."],
      ["Emergency blankets", "🩹", "A shiny foil blanket reflects body heat back to the person, helping them stay warm."]
    ], ["Does the surface absorb or reflect more light and heat?", "Dark and matt absorb a lot; pale and shiny reflect a lot.", "Example: a black car in the sun gets hotter than a white car. Now do yours."], [
      ["Which absorbs the most heat from the Sun?", "A black surface", "A white surface", "A shiny mirror"],
      ["Why are houses in hot places often white?", "White reflects heat", "White makes heat", "White is heavy"],
      ["Solar panels are dark so they can...", "Absorb sunlight", "Reflect sunlight", "Avoid the Sun"],
      ["A foil blanket keeps a person warm by...", "Reflecting body heat back", "Making new heat", "Soaking up cold"],
      ["On a hot day, the coolest T-shirt is...", "White", "Black", "Dark blue"],
      ["A shiny surface mostly...", "Reflects light", "Absorbs light", "Makes sound"],
      ["Dark surfaces are also good at giving out heat. A black radiator...", "Radiates heat well", "Cannot give heat", "Is always cold"],
      ["A snowy field looks bright because snow...", "Reflects a lot of light", "Absorbs all light", "Makes its own light"]
    ]),
    les("Clocks through history", [
      ["Early clocks", "⏳", "Sundials used shadows, and water clocks used dripping water. Hourglasses used falling sand."],
      ["Pendulum and quartz", "🕰️", "Christiaan Huygens made the first pendulum clock in 1656. Modern watches use a tiny quartz crystal that vibrates very steadily."],
      ["Time zones", "🌍", "Earth turns 360° in 24 hours, which is 15° each hour. Places 15° apart have clocks one hour apart."]
    ], ["Think about what moves steadily in each kind of clock.", "A steady swing or vibration lets a clock count equal time steps.", "Example: a sundial uses the moving shadow of a stick. Now do yours."], [
      ["A sundial tells time using...", "A shadow", "Sand", "A battery"],
      ["A pendulum clock counts time using a...", "Swinging weight", "Water drip", "Sundial"],
      ["Modern watches use a crystal called...", "Quartz", "Diamond", "Salt"],
      ["Earth turns about how many degrees each hour?", "15°", "60°", "1°"],
      ["An hourglass uses...", "Falling sand", "Shadows", "Radio signals"],
      ["Who made the first pendulum clock?", "Christiaan Huygens", "Newton", "Faraday"],
      ["Why do places far east and west have different times?", "Earth spins, so the Sun rises at different times", "Clocks are broken", "The Moon pulls clocks"],
      ["Atomic clocks are used because they are...", "Extremely steady", "Large and loud", "Made of wood"]
    ]),
    les("Fast things", [
      ["Everyday speeds", "🚶", "A person walks at about 5 km/h. A cheetah can sprint at about 100 km/h. A jet airliner flies at around 900 km/h."],
      ["Super speeds", "🔊", "Sound travels in air at about 340 m/s (about 1200 km/h). Light is much faster, about 300,000 km/s."],
      ["Comparing", "⚖️", "To compare speeds, put them in the same unit first. 36 km/h is 10 m/s."]
    ], ["Put the speeds in the same unit if you need to compare them.", "Think of walking < cheetah < jet < sound < light.", "Example: a bicycle at 20 km/h is faster than a walker at 5 km/h but slower than a car at 100 km/h. Now do yours."], [
      ["Which is fastest?", "Light", "Sound in air", "A jet airliner"],
      ["Which is slowest?", "A walking person", "A cheetah", "A jet airliner"],
      ["A cheetah sprints at about...", "100 km/h", "5 km/h", "5000 km/h"],
      ["Sound in air travels at about...", "340 m/s", "340 km/s", "34 m/s"],
      ["Light is about how fast?", "300,000 km/s", "300 km/s", "300 km/h"],
      ["Which is faster, 20 m/s or 50 km/h?", "20 m/s", "50 km/h", "They are exactly equal"],
      ["Which is faster, 100 km/h or 25 m/s?", "100 km/h", "25 m/s", "They are exactly equal"],
      ["Lightning is seen before thunder is heard because...", "Light is much faster than sound", "Sound is much faster", "They travel the same"]
    ]),
    mix("Mixed practice", []),
    mix("Level 14 Challenge", [])
  ];
  b.splice(18, 2,
    mix("Mixed practice", at(b, [1, 2, 3, 4, 6, 8, 9, 12, 13, 14, 17])),
    mix("Level 14 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 15 =================
  const c = [
    les("Inventors who changed the world", [
      ["Steam and trains", "🚂", "<b>James Watt</b> improved the steam engine in the 1700s. <b>George Stephenson</b>'s locomotive Rocket (1829) helped start the age of railways."],
      ["Talking and light", "☎️", "<b>Alexander Graham Bell</b> patented the telephone in 1876. <b>Thomas Edison</b> and his team built a long-lasting electric light bulb in 1879."],
      ["Radio and flight", "🛩️", "<b>Guglielmo Marconi</b> sent radio signals across long distances. The <b>Wright brothers</b> made the first powered airplane flight in 1903."]
    ], ["Think about the one invention each person is linked to.", "Match the invention (steam engine, telephone, bulb, radio, airplane) to the person.", "Example: Volta is linked to the first battery. Now do yours."], [
      ["Who patented the telephone in 1876?", "Alexander Graham Bell", "Thomas Edison", "James Watt"],
      ["Who improved the steam engine?", "James Watt", "Marconi", "The Wright brothers"],
      ["Who is linked to the first powered airplane flight in 1903?", "The Wright brothers", "Marconi", "Stephenson"],
      ["Who sent radio signals over long distances?", "Marconi", "Bell", "Watt"],
      ["Who helped make a long-lasting light bulb in 1879?", "Thomas Edison", "Bell", "Marconi"],
      ["Rocket was a famous...", "Steam locomotive", "Airplane", "Radio"],
      ["The unit of power, the watt, is named after...", "James Watt", "Edison", "Bell"],
      ["The telephone turns your voice into...", "Electrical signals", "Light waves only", "Heat"]
    ]),
    num("Proportion problems", [
      ["Same rate", "⚖️", "In <b>direct proportion</b>, doubling one quantity doubles the other. A rate stays the same."],
      ["Find the rate first", "🧮", "A spring stretches 3 cm for each 1 N. Then 4 N stretches it 4 x 3 = 12 cm."],
      ["Going back", "↩️", "To find the force from the stretch, divide: 12 cm / 3 cm per N = 4 N."]
    ], () => {
      const r = ri(2, 6), f = ri(2, 9);
      return pick([
        { text: `A spring stretches ${r} cm for each 1 N of force. How far does it stretch with ${f} N?`, visual: "🪀", answer: r * f,
          hints: ["Each newton adds the same stretch.", "Multiply the stretch for 1 N by the number of newtons.", "Example: 4 cm for each 1 N, so 3 N gives 3 x 4 = 12 cm. Now do yours."] },
        { text: `A spring stretches ${r} cm for each 1 N. A load stretches it ${r * f} cm. How many newtons is the load?`, visual: "⚖️", answer: f,
          hints: ["How many 1 N steps make up the whole stretch?", "Divide the total stretch by the stretch for 1 N.", "Example: 4 cm per N and a stretch of 20 cm gives 20 / 4 = 5 N. Now do yours."] },
        { text: `A toy car rolls ${r} m every second at a steady speed. How far does it go in ${f} seconds?`, visual: "🚗", answer: r * f,
          hints: ["It goes the same distance each second.", "Multiply the distance each second by the number of seconds.", "Example: 3 m each second for 5 s is 3 x 5 = 15 m. Now do yours."] }
      ]);
    }),
    les("Planning an experiment", [
      ["Question and guess", "❓", "Start with a question, then make a <b>hypothesis</b>, a guess you can test. Choose what you will <b>change</b>, what you will <b>measure</b> and what you will <b>keep the same</b>."],
      ["Method and safety", "🥽", "Write your steps in order, list your equipment, and check the risks, like hot water or sharp tools. Wear goggles if needed."],
      ["Results and conclusion", "📊", "Put results in a table, repeat them, and draw a graph. Then write a <b>conclusion</b>: did the results support your hypothesis?"]
    ], ["Where in the planning steps does this belong?", "Think: question, hypothesis, variables, method, risks, results, conclusion.", "Example: deciding to wear goggles when heating water is part of planning for safety. Now do yours."], [
      ["A guess that you can test is a...", "Hypothesis", "Conclusion", "Graph"],
      ["What you change in a test is the...", "Independent variable", "Result", "Hypothesis"],
      ["What you measure is the...", "Dependent variable", "Equipment", "Risk"],
      ["Hot water in an experiment is a...", "Risk to think about", "Result", "Hypothesis"],
      ["After the results you write a...", "Conclusion", "Question", "Guess before you start"],
      ["Things you keep the same are...", "Control variables", "Anomalies", "Conclusions"],
      ["Why repeat readings?", "To check they agree", "To waste time", "To change the question"],
      ["Putting results in a clear table is part of...", "Recording results", "Making a guess", "Choosing a hypothesis"]
    ]),
    les("Range and odd results", [
      ["Range", "↔️", "The <b>range</b> is the biggest value minus the smallest value. It tells you how spread out the readings are."],
      ["Anomalies", "🚩", "An <b>anomaly</b> is a result that does not fit the pattern, perhaps from a mistake. Check it, and leave it out when finding the mean if it is clearly wrong."],
      ["Example", "🧮", "Times: 5 s, 6 s, 5 s, 12 s. The 12 s is odd. Without it the mean is (5+6+5) / 3 = 5.3 s."]
    ], ["Look for the biggest and smallest readings, or for the one that does not fit.", "An odd one out is far from all the rest.", "Example: readings 20, 21, 20, 35. The 35 is far from the others, so it is the anomaly. Now do yours."], [
      ["Readings: 4, 5, 4, 5, 15. Which is the anomaly?", "15", "4", "5"],
      ["Readings: 12, 15, 14. What is the range?", "3", "14", "12"],
      ["Readings: 7, 7, 8, 7, 1. Which is the odd one out?", "1", "7", "8"],
      ["Range = biggest value minus...", "Smallest value", "Mean", "Biggest value"],
      ["A very different reading might come from...", "A mistake in measuring", "A perfect tool", "Nothing at all"],
      ["Readings: 3, 4, 5, 6. The range is...", "3", "4", "6"],
      ["If one result is clearly an anomaly, you should...", "Check it and maybe leave it out of the mean", "Always make it the mean", "Hide all the results"],
      ["A small range means the readings are...", "Close together", "Far apart", "Hotter"]
    ]),
    num("Rates and efficiency", [
      ["Rates", "⛽", "A <b>rate</b> says how much per unit. A car using 6 liters per 100 km uses 6 liters every 100 km."],
      ["Using it", "🧮", "For 300 km that is 3 x 6 = 18 liters (3 lots of 100 km)."],
      ["Another type", "🏃", "A runner who goes 12 km in 2 hours has a speed rate of 12 / 2 = 6 km per hour."]
    ], () => {
      const r = pick([4, 6, 8, 10]), d = pick([50, 100, 150, 200, 250, 300, 400]), t = ri(2, 6), v = ri(3, 12);
      return pick([
        { text: `A car uses ${r} liters of fuel for every 100 km. How many liters does it use for ${d} km?`, visual: "⛽", answer: r * d / 100,
          hints: ["Work out how many lots of 100 km the trip has.", "Fuel = liters per 100 km x (distance / 100).", "Example: 5 liters per 100 km for 200 km is 5 x 2 = 10 liters. Now do yours."] },
        { text: `A cyclist rides ${v * t} km in ${t} hours at a steady pace. How many km does she ride each hour?`, visual: "🚴", answer: v,
          hints: ["Rate means how much each hour.", "Divide the distance by the hours.", "Example: 30 km in 5 hours is 30 / 5 = 6 km each hour. Now do yours."] }
      ]);
    }),
    les("The design process", [
      ["Steps", "📝", "Engineers solve problems step by step: <b>find the problem</b>, research it, brainstorm ideas, choose a design, build a <b>prototype</b>, test it, improve it, and share the result."],
      ["Prototypes", "🛠️", "A <b>prototype</b> is a first model. Testing it shows what works and what to fix."],
      ["Trade-offs", "⚖️", "Every design has <b>trade-offs</b>. A stronger material may cost more. A lighter one may be less safe. Engineers choose the best balance."]
    ], ["What stage of the design process does the question describe?", "Problem, research, ideas, design, prototype, test, improve, share.", "Example: building a small model bridge from card is making a prototype. Now do yours."], [
      ["A first model of a design is a...", "Prototype", "Hypothesis", "Conclusion"],
      ["After building a prototype, engineers...", "Test it", "Never use it", "Forget it"],
      ["What is the very first step?", "Find the problem", "Share the result", "Improve it"],
      ["A cheaper design that breaks easily is an example of a...", "Trade-off", "Perfect result", "Magnet"],
      ["Brainstorming means...", "Thinking up lots of ideas", "Testing in water", "Cleaning up"],
      ["If the test shows a weakness, engineers should...", "Improve the design", "Hide it", "Stop learning"],
      ["Researching a problem helps engineers...", "Learn what is needed", "Skip testing", "Avoid ideas"],
      ["Sharing the result lets other people...", "Learn from and use the design", "Lose the design", "Forget it"]
    ]),
    les("Properties of materials", [
      ["Strong and stiff", "🧱", "<b>Strong</b> materials do not break easily. <b>Stiff</b> materials do not bend much. <b>Tough</b> materials absorb knocks without cracking."],
      ["Brittle and more", "🪟", "<b>Brittle</b> materials, like glass, snap or shatter suddenly. <b>Ductile</b> metals like copper can be drawn into wires. <b>Malleable</b> metals like gold can be hammered thin."],
      ["Picking one", "✅", "Engineers choose materials for the job: steel for cables, glass for windows, rubber for tires and plastic for handles."]
    ], ["Think about what the job needs: bending, stretching, absorbing knocks or being see-through.", "Match the property words to the examples.", "Example: copper is used for electrical wires because it can be drawn out thin. Now do yours."], [
      ["Which word means 'snaps suddenly'?", "Brittle", "Ductile", "Elastic"],
      ["Which material can be drawn into a thin wire?", "Copper", "Glass", "Chalk"],
      ["Which is stiff and does not bend easily?", "A steel beam", "Cooked spaghetti", "A rubber band"],
      ["Why use rubber for tires?", "It is tough and grips well", "It is brittle", "It is transparent"],
      ["Why use glass for windows?", "It is transparent", "It is stretchy", "It is magnetic"],
      ["Which metal can be hammered flat into thin sheets?", "Gold", "Chalk", "Wood"],
      ["A material that returns to its shape after stretching is...", "Elastic", "Brittle", "Malleable"],
      ["A bicycle helmet should be made of a material that is...", "Tough and light", "Brittle and heavy", "Very stretchy"]
    ]),
    les("Electric cars", [
      ["Battery and motor", "🔌", "An electric car stores energy in a big battery. An electric motor turns that energy into movement. There is no exhaust pipe on the car."],
      ["Regenerative braking", "♻️", "When the car slows, the motor can work backwards as a generator and put some movement energy back into the battery."],
      ["Where the energy comes from", "🏭", "The car is only as clean as the electricity used to charge it. Wind, solar and hydro power give the cleanest charge."]
    ], ["Think about what stores the energy and what turns it into motion.", "Regenerative means energy is saved back instead of wasted as heat.", "Example: a phone battery stores energy for the screen. A car battery stores energy for the motor. Now do yours."], [
      ["An electric car stores energy in a...", "Battery", "Fuel tank only", "Spring"],
      ["The part that turns electrical energy into motion is the...", "Motor", "Mirror", "Seat"],
      ["Regenerative braking sends energy to the...", "Battery", "Exhaust", "Tires"],
      ["An electric car has no...", "Exhaust pipe", "Wheels", "Brakes"],
      ["The cleanest way to charge it is with...", "Wind or solar power", "Burning more fuel only", "Rain boots"],
      ["A hybrid car uses...", "A battery and a fuel engine", "Only wind", "Only a spring"],
      ["Electric motors are efficient because they waste...", "Little energy as heat", "Lots of energy", "All the energy"],
      ["Charging at home uses electricity measured in...", "kWh", "mm", "kg"]
    ]),
    les("From power station to plug", [
      ["Making electricity", "🏭", "Most power stations use a heat source or moving water or wind to turn a <b>turbine</b>. The turbine spins a <b>generator</b> that makes electricity."],
      ["Different fuels", "💨", "Coal, gas and nuclear power heat water into steam. Hydro uses falling water. Wind turbines use moving air. Solar cells change sunlight directly into electricity."],
      ["The grid", "🗼", "Electricity travels through the <b>grid</b> of cables and pylons to homes, schools and factories."]
    ], ["What spins the turbine in each case?", "Steam, falling water or moving air spin a turbine, and the turbine turns a generator.", "Example: in a wind turbine, moving air spins the blades. Now do yours."], [
      ["A generator is spun by a...", "Turbine", "Fuse", "Switch"],
      ["Hydro power uses...", "Falling water", "Burning coal", "Sunlight"],
      ["A wind turbine is turned by...", "Moving air", "Steam", "Sound"],
      ["Gas and coal stations heat water into...", "Steam", "Ice", "Wind"],
      ["Solar cells change sunlight into...", "Electricity", "Coal", "Water"],
      ["The grid carries electricity to...", "Homes and factories", "The Moon", "Nowhere"],
      ["Which of these uses no fuel being burned?", "Wind power", "Coal power", "Gas power"],
      ["A turbine plus a generator is a way to change movement into...", "Electrical energy", "Sound energy only", "Mass"]
    ]),
    les("How thermometers work", [
      ["Liquid in a tube", "🌡️", "In a liquid thermometer, the liquid inside (colored alcohol or mercury) <b>expands</b> when warm and rises up a thin tube."],
      ["Fixed points", "🧊", "The scale uses two fixed points: water freezes at 0°C and boils at 100°C. The scale between is split into 100 equal steps."],
      ["Other types", "📟", "Digital thermometers use an electronic sensor. Thermostats often use a bimetallic strip, two metals that bend when heated."]
    ], ["What happens to the liquid or metal when it warms?", "Expanding liquids rise; two metals joined together bend because they expand by different amounts.", "Example: a balloon gets bigger when heated because the air expands. Now do yours."], [
      ["The liquid in a thermometer rises when it...", "Expands", "Shrinks", "Freezes first"],
      ["Water boils at...", "100°C", "0°C", "37°C"],
      ["Water freezes at...", "0°C", "100°C", "50°C"],
      ["A bimetallic strip bends because two metals...", "Expand by different amounts", "Are magnets", "Both melt"],
      ["A normal human body temperature is about...", "37°C", "50°C", "10°C"],
      ["A digital thermometer uses an...", "Electronic sensor", "Mirror", "Compass"],
      ["The scale from 0°C to 100°C has...", "100 equal steps", "10 steps", "37 steps"],
      ["A thermostat uses a bimetallic strip to...", "Switch heating on or off", "Make light", "Make sound"]
    ]),
    les("Glasses and lenses", [
      ["Converging lenses", "🔍", "A <b>convex</b> (fatter in the middle) lens bends light together. It helps people who are <b>long-sighted</b> and cannot see close things clearly."],
      ["Diverging lenses", "👓", "A <b>concave</b> (thinner in the middle) lens spreads light out. It helps people who are <b>short-sighted</b> and cannot see far things clearly."],
      ["The eye", "👁️", "The eye's lens focuses light onto the <b>retina</b>. Glasses and contact lenses help it focus in just the right place."]
    ], ["Is the lens fat in the middle (convex) or thin in the middle (concave)?", "Short-sighted people see close things well; long-sighted people see far things well.", "Example: a magnifying glass is a convex lens. Now do yours."], [
      ["A convex lens is...", "Fatter in the middle", "Thinner in the middle", "Flat"],
      ["A concave lens helps someone who is...", "Short-sighted", "Long-sighted", "Deaf"],
      ["A convex lens helps someone who is...", "Long-sighted", "Short-sighted", "Color-blind"],
      ["A magnifying glass is a...", "Convex lens", "Concave lens", "Flat mirror"],
      ["Light is focused onto the eye's...", "Retina", "Eyelid", "Eyelash"],
      ["A short-sighted person has trouble seeing...", "Far things", "Near things", "In the dark only"],
      ["A concave lens makes light rays...", "Spread out", "Meet at a point", "Stop"],
      ["Contact lenses do the same job as...", "Glasses", "Hearing aids", "Compasses"]
    ]),
    les("Animal hearing", [
      ["Echolocation", "🦇", "Bats make very high-pitched <b>ultrasound</b> squeaks and listen for the echoes. This helps them find insects in the dark."],
      ["Many ranges", "🐘", "Dogs hear higher sounds than people. Elephants make very low sounds, called infrasound, that can travel a long way."],
      ["Humans", "👂", "People hear from about 20 Hz to 20,000 Hz. Below this is infrasound and above it is ultrasound."]
    ], ["Think about what kind of sound the animal uses.", "Very high is above 20,000 Hz. Very low is below 20 Hz.", "Example: a dog whistle makes sound too high for most people but a dog can hear it. Now do yours."], [
      ["Bats find insects using...", "Echoes of ultrasound", "Radio", "Smell only"],
      ["Sound above 20,000 Hz is called...", "Ultrasound", "Infrasound", "Light"],
      ["Sound below 20 Hz is called...", "Infrasound", "Ultrasound", "Radio"],
      ["Elephants can talk across long distances with...", "Very low sounds", "Whistling", "Light"],
      ["A dog whistle makes a sound that is...", "Too high for most people", "Too low for dogs", "Quiet for everyone"],
      ["Echolocation works because sound...", "Bounces off things", "Goes through everything", "Is a kind of light"],
      ["Humans hear from about 20 Hz to...", "20,000 Hz", "200 Hz", "2 Hz"],
      ["Dolphins also use sound to...", "Find things underwater", "Make light", "Heat water"]
    ]),
    les("Air pressure and weather", [
      ["High and low", "🌤️", "Air pressure changes from place to place. <b>High pressure</b> usually brings calm, clear weather. <b>Low pressure</b> usually brings clouds, wind and rain."],
      ["Wind", "💨", "Air moves from high pressure to low pressure. That moving air is <b>wind</b>. A bigger pressure difference gives stronger winds."],
      ["Measuring it", "📉", "A <b>barometer</b> measures air pressure. A falling barometer often means bad weather is coming."]
    ], ["Does the weather usually come with high or low pressure?", "Air moves from high pressure toward low pressure.", "Example: a flat tire lets air flow out to the lower pressure outside. Wind works in a similar way. Now do yours."], [
      ["Clear, calm weather usually comes with...", "High pressure", "Low pressure", "No pressure"],
      ["Clouds and rain usually come with...", "Low pressure", "High pressure", "Zero pressure"],
      ["A barometer measures...", "Air pressure", "Wind speed", "Rain"],
      ["Wind blows from...", "High pressure to low pressure", "Low pressure to high pressure", "Up to space"],
      ["A falling barometer often means...", "Bad weather is coming", "A sunny day", "Night is coming"],
      ["A bigger pressure difference gives...", "Stronger winds", "Calmer air", "Hot rain"],
      ["Air pressure is lower on top of a mountain because there is...", "Less air above", "More air above", "More water"],
      ["Warm air rising leaves behind an area of...", "Lower pressure", "Higher pressure", "Zero air"]
    ]),
    les("Surface tension", [
      ["A skin on water", "💧", "Water molecules pull on each other. At the top, this makes a stretchy 'skin'. This is <b>surface tension</b>."],
      ["Effects", "🐜", "It makes raindrops round and lets some insects, like pond skaters, walk on water. A needle can float on it if placed gently."],
      ["Soap", "🧼", "Soap <b>reduces</b> surface tension. That helps water spread and wet things, which is useful for cleaning."]
    ], ["Think of the water's surface as a thin stretchy skin.", "Molecules of water attract each other, making the surface pull tight.", "Example: a small drop on a leaf stays round instead of flat. Now do yours."], [
      ["Surface tension is like a...", "Stretchy skin on water", "Magnet in water", "Light in water"],
      ["Raindrops are round because of...", "Surface tension", "Magnets", "Echoes"],
      ["What does soap do to surface tension?", "Reduces it", "Increases it", "Does nothing"],
      ["A pond skater can walk on water because of...", "Surface tension", "Magnetism", "Wind"],
      ["Water molecules at the surface are pulled by...", "Other water molecules", "Only the air", "Light"],
      ["A paper towel soaks up water by...", "Water climbing up tiny gaps", "Water running away", "Melting"],
      ["Soapy water cleans well because it...", "Spreads and wets surfaces", "Has stronger surface tension", "Gets very hot"],
      ["A needle can float if...", "It is placed gently on the surface", "It is dropped hard", "It is wet with soap"]
    ]),
    num("Battery life", [
      ["Capacity", "🔋", "Battery capacity is often in <b>mAh</b> (milliamp-hours). A 2000 mAh battery could give 2000 mA for one hour, or 1000 mA for two hours."],
      ["Time", "⏳", "Hours = capacity / current. A 3000 mAh battery with a 500 mA drain lasts 3000 / 500 = 6 hours."],
      ["Other ways", "🔁", "Capacity = current x hours. Current = capacity / hours."]
    ], () => {
      const cur = pick([100, 200, 250, 500]), h = ri(2, 12);
      return pick([
        { text: `A battery holds ${cur * h} mAh and a toy uses ${cur} mA. How many hours does it last?`, visual: "🔋", answer: h,
          hints: ["Hours = capacity divided by how much is drawn each hour.", "Divide the capacity by the current.", "Example: 1200 mAh with a 300 mA toy gives 1200 / 300 = 4 hours. Now do yours."] },
        { text: `A torch uses ${cur} mA and runs for ${h} hours. How many mAh of battery capacity did it use?`, visual: "🔦", answer: cur * h,
          hints: ["Each hour uses the same amount.", "Multiply the current by the number of hours.", "Example: 200 mA for 3 hours is 200 x 3 = 600 mAh. Now do yours."] }
      ]);
    }),
    les("Exploring space", [
      ["First steps", "🚀", "Sputnik 1 (1957) was the first artificial satellite. Yuri Gagarin became the first person in space in 1961. Apollo 11 landed the first astronauts on the Moon in 1969."],
      ["Staying in space", "🛰️", "The International Space Station has had crews living aboard since 2000. The Hubble Space Telescope, launched in 1990, has sent back amazing pictures."],
      ["Robots", "🤖", "Robot probes explore where people cannot yet go. Voyager 1, launched in 1977, is now in the space between the stars. Rovers explore Mars."]
    ], ["Think about the order of space firsts.", "Satellite first, then a person in orbit, then the Moon landing.", "Example: Sputnik 1 came before Apollo 11, as a satellite is easier than a Moon landing. Now do yours."], [
      ["What was Sputnik 1?", "The first artificial satellite", "A Mars rover", "A space station"],
      ["In what year did Apollo 11 land on the Moon?", "1969", "1900", "2010"],
      ["Who was the first person in space?", "Yuri Gagarin", "Isaac Newton", "Neil Armstrong"],
      ["The Hubble Space Telescope sends back...", "Pictures of space", "Rain", "Food"],
      ["Voyager 1 is a...", "Robot probe", "Moon base", "Airplane"],
      ["Rovers explore...", "The surface of other worlds", "The deep ocean only", "Cities"],
      ["The ISS is a...", "Space station", "Telescope on the ground", "Planet"],
      ["Which came first?", "Sputnik 1", "Apollo 11", "The Hubble telescope"]
    ]),
    les("Lifts and counterweights", [
      ["Counterweight", "🛗", "A lift cabin hangs from steel cables over a pulley. A heavy <b>counterweight</b> on the other end balances the cabin, so the motor only has to move the difference."],
      ["Safety", "🔒", "Lifts have safety brakes that clamp onto the rails if anything goes wrong, and strong multiple cables."],
      ["Escalators", "🪜", "An escalator is a moving staircase on a chain loop turned by a motor. Hold the handrail and stand still."]
    ], ["What does the counterweight do to the load on the motor?", "A balance of weights means the motor lifts less.", "Example: a see-saw is easy to move when both sides weigh nearly the same. Now do yours."], [
      ["A counterweight in a lift...", "Balances the cabin", "Makes it heavier overall", "Powers the lights"],
      ["Because of the counterweight, the motor...", "Works less hard", "Works harder", "Is not needed"],
      ["Lifts hang from...", "Steel cables", "Elastic bands", "Strings of wool"],
      ["Safety brakes in a lift clamp onto the...", "Rails", "Floor lights", "Buttons"],
      ["An escalator is driven by a...", "Motor and chain", "Spring", "Sail"],
      ["The cables go over a...", "Pulley wheel", "Magnet", "Mirror"],
      ["A lift balanced with its counterweight is like a...", "See-saw with nearly equal weights", "Rocket", "Mirror"],
      ["Why are lift cables made of steel?", "Strong when stretched", "Soft and stretchy", "Light as paper"]
    ]),
    num("Powers of ten", [
      ["Big numbers", "🔟", "Scientists write big numbers using <b>powers of ten</b>. 10³ means 10 x 10 x 10 = 1000, so 4 x 10³ = 4000."],
      ["Small numbers", "🔬", "Small numbers use negative powers. 10⁻¹ is 0.1 and 10⁻² is 0.01."],
      ["Shortcut", "✂️", "For 3 x 10⁴, put the 3 first and add four zeros: 30 000."]
    ], () => {
      const m = ri(2, 9), p = ri(1, 5);
      return pick([
        { text: `Write ${m} x 10^${p} as an ordinary number.`, visual: "🔟", answer: m * Math.pow(10, p),
          hints: ["The power tells you how many zeros to put after the digit.", "Multiply the digit by 1 followed by that many zeros.", "Example: 5 x 10^2 = 5 x 100 = 500. Now do yours."] },
        { text: `The ordinary number ${m * Math.pow(10, p)} is ${m} x 10 to the power of what?`, visual: "🔢", answer: p,
          hints: ["Count the zeros after the first digit.", "The number of zeros is the power.", "Example: 7000 = 7 x 10^3 because there are 3 zeros. Now do yours."] }
      ]);
    }),
    mix("Mixed practice", []),
    mix("Level 15 Challenge", [])
  ];
  c.splice(18, 2,
    mix("Mixed practice", at(c, [1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 17])),
    mix("Level 15 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 13: a, 14: b, 15: c });
})();
