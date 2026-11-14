// ext/physics-10-12.js  Physics levels 10-12 (4th grade second half, 5th grade)
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

  // ================= LEVEL 10 =================
  const a = [
    les("Fair tests", [
      ["Change one thing", "🧪", "In a <b>fair test</b> you change only <b>one</b> thing. Everything else stays the same, so you know what caused the result."],
      ["Parts of a test", "📋", "The thing you change is the <b>variable</b>. The things you keep the same are <b>controlled</b>. What you measure is the <b>result</b>."],
      ["Repeat it", "🔁", "Scientists repeat a test several times and check the results match. That makes them more reliable."]
    ], ["If two things change at once, can you tell which one mattered?", "Change one thing, keep the rest the same, and measure.", "Example: to test which ball bounces highest, drop each from the same height onto the same floor. Now think about yours."], [
      ["Testing whether a heavier car rolls farther down a ramp. What must stay the same?", "The ramp and its height", "The weight of the car", "Nothing: change all of them"],
      ["In a fair test, how many things do you change at a time?", "One", "Everything", "Three"],
      ["A plant test: does more sunlight help growth? What do you change?", "The amount of sunlight", "The kind of seed each time", "The size of the pot each time"],
      ["Why do scientists repeat a test several times?", "To check the results are reliable", "To make it take longer", "To use more materials"],
      ["A guess that you can test is called a...", "Hypothesis", "Result", "Label"],
      ["Testing which wing shape makes a paper plane fly farthest. Keep the same:", "Paper type and throw strength", "The wing shape", "Nothing at all"],
      ["Which is a fair test of whether salt water freezes slower than fresh water?", "Same cups, same amounts, same freezer", "Different cups and different freezers", "Test only the salt water"],
      ["The things you keep the same in an experiment are called...", "Controlled variables", "Results", "Guesses"]
    ]),
    num("Distance and time from speed", [
      ["Three versions", "🧮", "Speed = distance / time. So <b>distance = speed x time</b> and <b>time = distance / speed</b>."],
      ["Find the distance", "🚗", "A car going 60 km/h for 2 hours travels 60 x 2 = 120 km."],
      ["Find the time", "⏱️", "A trip of 150 km at 50 km/h takes 150 / 50 = 3 hours."]
    ], () => {
      const s = pick([20, 30, 40, 50, 60, 80]), t = ri(2, 6);
      return pick([
        { text: `A bus travels at ${s} km/h for ${t} hours. How far does it go in km?`, visual: "🚌", answer: s * t,
          hints: ["Speed is distance each hour.", "Multiply the speed by the number of hours.", "Example: 40 km/h for 3 hours is 40 x 3 = 120 km. Now do yours."] },
        { text: `A train goes ${s * t} km at ${s} km/h. How many hours does it take?`, visual: "🚆", answer: t,
          hints: ["How many hours of travel make up the whole trip?", "Divide the distance by the speed.", "Example: 90 km at 30 km/h takes 90 / 30 = 3 hours. Now do yours."] }
      ]);
    }),
    les("What is acceleration?", [
      ["Changing velocity", "🚀", "<b>Acceleration</b> is any change in speed or direction. Speeding up, slowing down and turning are all acceleration."],
      ["Steady is zero", "➡️", "Moving at a constant speed in a straight line means <b>zero</b> acceleration."],
      ["Units", "📏", "Acceleration is measured in meters per second squared, written <b>m/s²</b>."]
    ], ["Ask: is the speed or the direction changing?", "Speeding up, braking and turning all count. Steady straight motion does not.", "Example: a bike rolling downhill and getting faster is accelerating. Now think about yours."], [
      ["Acceleration means a change in...", "Speed or direction", "Color", "Mass"],
      ["A car speeds up from a stop. It is...", "Accelerating", "Moving at a constant speed", "Not moving at all"],
      ["A car brakes to a stop. This is...", "Acceleration (slowing down)", "No acceleration", "A constant speed"],
      ["A car goes round a bend at a steady speed. Its direction changes, so it is...", "Accelerating", "Not accelerating", "Standing still"],
      ["A train moves at a steady 80 km/h in a straight line. Its acceleration is...", "Zero", "Large", "Pointing up"],
      ["Acceleration is measured in...", "m/s²", "kg", "N"],
      ["Which has the biggest acceleration?", "A rocket leaving the ground", "A parked car", "A boat drifting steadily"],
      ["A ball rolls in a line at a constant speed on smooth flat ground. Its acceleration is...", "None", "Growing", "Large"]
    ]),
    num("Acceleration sums", [
      ["The rule", "📐", "<b>Acceleration = change in speed / time</b>. The change in speed is the end speed minus the start speed."],
      ["Example", "🚲", "A bike goes from 2 m/s to 8 m/s in 3 s. Change = 6 m/s, so a = 6 / 3 = 2 m/s²."],
      ["End speed", "🏁", "You can also find the end speed: <b>end = start + a x t</b>."]
    ], () => {
      const u = ri(0, 5), a = ri(2, 5), t = ri(2, 6);
      return pick([
        { text: `A scooter speeds up from ${u} m/s to ${u + a * t} m/s in ${t} seconds. What is its acceleration in m/s²?`, visual: "🛴", answer: a,
          hints: ["First find how much the speed changed.", "Subtract the start speed from the end speed, then divide by the time.", "Example: 3 m/s to 15 m/s in 4 s is a change of 12, and 12 / 4 = 3 m/s². Now do yours."] },
        { text: `A cart starts at ${u} m/s and accelerates at ${a} m/s² for ${t} seconds. What is its final speed in m/s?`, visual: "🛒", answer: u + a * t,
          hints: ["Each second adds the same amount of speed.", "Multiply the acceleration by the time, then add the start speed.", "Example: start 1 m/s, a = 2 m/s², 5 s gives 1 + 2 x 5 = 11 m/s. Now do yours."] }
      ]);
    }),
    les("Force arrows", [
      ["Drawing forces", "➡️", "We draw a force as an <b>arrow</b>. The arrow points the way the force pushes or pulls. A longer arrow means a bigger force."],
      ["A book on a table", "📖", "Weight pulls the book down. The table pushes up with an equal force. Two equal arrows opposite each other mean the forces are <b>balanced</b>."],
      ["Unbalanced", "🏃", "If one arrow is longer, the object speeds up in that direction."]
    ], ["Look at the length and direction of each arrow.", "Equal and opposite means balanced. A longer arrow wins.", "Example: a box pushed with 8 N right and rubbed by 3 N of friction left will move right. Now think about yours."], [
      ["In a force diagram, a longer arrow means...", "A bigger force", "A slower object", "A lighter object"],
      ["A book rests on a table. The table pushes it...", "Up", "Down", "Sideways"],
      ["The weight of a book is shown by an arrow pointing...", "Down", "Up", "Sideways"],
      ["Two equal arrows point opposite ways. The forces are...", "Balanced", "Unbalanced", "Missing"],
      ["A box is pushed right with 10 N and friction pulls left with 4 N. The longer arrow points...", "Right", "Left", "Up"],
      ["A parachutist falls at a steady speed. Weight down and air resistance up are...", "Equal in size", "Weight much bigger", "Air resistance much bigger"],
      ["The arrow for friction on a sliding box points...", "Opposite to the motion", "The same way as the motion", "Straight up"],
      ["A balloon starts to rise. The upward arrow is...", "Longer than the weight arrow", "Shorter than the weight arrow", "The same as the weight arrow"]
    ]),
    les("Kinds of friction", [
      ["Four kinds", "🛷", "<b>Static</b> friction stops things starting to move. <b>Sliding</b> friction acts when surfaces slide. <b>Rolling</b> friction acts on wheels. <b>Fluid</b> friction (air or water resistance) acts on things moving through a fluid."],
      ["Order", "📊", "Usually static friction is the biggest, then sliding, and rolling is the smallest."],
      ["Use it", "🛞", "Wheels and oil reduce friction. Rough soles and tire treads increase it."]
    ], ["Think about what the object is doing: starting, sliding, rolling, or moving through air or water?", "Wheels help because rolling is easier than sliding.", "Example: a hockey puck sliding on ice has sliding friction. Now think about yours."], [
      ["The friction that you must beat to start pushing a heavy box is...", "Static friction", "Rolling friction", "Fluid friction"],
      ["Which kind of friction is usually the smallest?", "Rolling friction", "Sliding friction", "Static friction"],
      ["A sled slides over snow. The friction is...", "Sliding friction", "Rolling friction", "Static friction"],
      ["The wheels of a skateboard cause...", "Rolling friction", "Sliding friction", "Static friction"],
      ["Air pushing against a cyclist is a kind of...", "Fluid friction (air resistance)", "Static friction", "Sliding friction"],
      ["Oil on a bike chain reduces...", "Friction between the parts", "Gravity", "Weight"],
      ["Why is it easier to roll a suitcase on wheels than to drag it?", "Rolling friction is less than sliding friction", "Wheels cancel gravity", "Wheels make it lighter"],
      ["Tire treads help a car stop by increasing...", "Grip (friction)", "Weight", "Speed"]
    ]),
    les("Springs and elastic", [
      ["Elastic things", "🪀", "An <b>elastic</b> object goes back to its shape after being stretched or squashed, like a spring or rubber band."],
      ["Stretch and force", "📏", "For a spring, twice the force stretches it about twice as far. This works until the <b>elastic limit</b>."],
      ["Stored energy", "⚡", "A stretched spring stores <b>elastic energy</b>. A spring balance uses a spring to measure force."]
    ], ["Think about what happens when you let go of a stretched spring.", "A bigger pull gives a bigger stretch, up to a limit.", "Example: a rubber band pulled back stores energy to shoot a paper ball. Now think about yours."], [
      ["A material that springs back to its shape is...", "Elastic", "Brittle", "Magnetic"],
      ["Pulling a spring with twice the force stretches it about...", "Twice as far", "Half as far", "The same"],
      ["A spring balance measures...", "Force", "Color", "Sound"],
      ["Which stores elastic energy?", "A stretched rubber band", "A flat rock", "A cold spoon"],
      ["Which of these is NOT elastic?", "Wet clay", "A trampoline", "A rubber band"],
      ["The point beyond which a spring will not spring back is its...", "Elastic limit", "Top speed", "Boiling point"],
      ["A squashed spring stores...", "Elastic energy", "Light energy", "Sound energy"],
      ["Stretch a spring past its limit and it may...", "Stay stretched out of shape", "Become lighter", "Become a magnet"]
    ]),
    num("Spring stretch", [
      ["Proportional", "🔩", "A spring stretches by the <b>same amount for each newton</b>. If 1 N stretches it 2 cm, then 5 N stretches it 10 cm."],
      ["Rule", "✖️", "<b>Stretch = force x stretch per newton</b>."],
      ["Backwards", "➗", "To find the force, divide the stretch by the stretch per newton."]
    ], () => {
      const k = ri(2, 5), f = ri(2, 8);
      return pick([
        { text: `A spring stretches ${k} cm for every 1 N. How far does it stretch with ${f} N (in cm)?`, visual: "🔩", answer: k * f,
          hints: ["Each newton gives the same stretch.", "Multiply the stretch for 1 N by the number of newtons.", "Example: 3 cm per newton with 4 N gives 3 x 4 = 12 cm. Now do yours."] },
        { text: `A spring stretches ${k} cm for every 1 N. It is stretched ${k * f} cm. What force is pulling it, in N?`, visual: "💪", answer: f,
          hints: ["Think how many 1 N pulls make up the stretch.", "Divide the total stretch by the stretch for one newton.", "Example: 20 cm total at 4 cm per newton is 20 / 4 = 5 N. Now do yours."] }
      ]);
    }),
    les("Moving in circles", [
      ["Always turning", "🎡", "Moving in a circle means always changing direction. So there must be a force pulling <b>toward the center</b>."],
      ["Examples", "🌍", "A string pulls a whirling ball inward. Gravity pulls the Moon toward Earth. Tire friction turns a car."],
      ["Let go!", "🥎", "If the force stops, the object flies off <b>in a straight line</b> the way it was moving."]
    ], ["Which way must the force point to keep something turning?", "It points to the middle of the circle. With no force, motion is straight.", "Example: the water in a spinning salad spinner flies out through the holes. Now think about yours."], [
      ["To move in a circle, an object needs a force pointing toward the...", "Center", "Outside", "Ground only"],
      ["You whirl a ball on a string and let go. It flies...", "Straight off the way it was moving", "Back to your hand", "Straight up"],
      ["What gives the inward force for the Moon going around Earth?", "Gravity", "Friction", "Wind"],
      ["A car turning a corner is helped by the inward force from...", "Tire friction on the road", "The engine's noise", "The sky"],
      ["A washing machine spin cycle flings water...", "Out through the holes in the drum", "Into the center", "Upward"],
      ["A planet in a round orbit is always...", "Changing direction", "Moving in a straight line", "Stopped"],
      ["Whirling a ball faster on a string makes the string pull...", "Harder", "Weaker", "The same"],
      ["On a merry-go-round you feel pushed outward because your body...", "Wants to go straight", "Gets heavier", "Loses its mass"]
    ]),
    num("Ramp advantage", [
      ["Ramps help", "🛝", "A ramp lets you use a small push over a long path instead of a big lift straight up."],
      ["The rule", "📐", "<b>Mechanical advantage = ramp length / height</b>. A 6 m ramp that rises 2 m has an advantage of 6 / 2 = 3."],
      ["Meaning", "💡", "An advantage of 3 means you need about one third of the force (but you push over a longer distance)."]
    ], () => {
      const h = ri(1, 4), m = ri(2, 5);
      return pick([
        { text: `A ramp is ${h * m} m long and rises ${h} m. What is its mechanical advantage?`, visual: "🛝", answer: m,
          hints: ["Compare the long way with the way up.", "Divide the length of the ramp by its height.", "Example: a 12 m ramp rising 3 m gives 12 / 3 = 4. Now do yours."] },
        { text: `A ramp rises ${h} m and has a mechanical advantage of ${m}. How long is the ramp in meters?`, visual: "📏", answer: h * m,
          hints: ["The advantage tells you how many times longer the ramp is than its height.", "Multiply the height by the advantage.", "Example: rising 2 m with an advantage of 5 means 2 x 5 = 10 m. Now do yours."] }
      ]);
    }),
    les("Heat and temperature", [
      ["Different ideas", "🌡️", "<b>Temperature</b> tells how hot or cold something is. It is the average motion energy of its particles."],
      ["Heat", "🔥", "<b>Heat</b> is energy that flows from a hotter thing to a colder thing. It is measured in joules (J)."],
      ["Amount matters", "🛁", "A bathtub of warm water holds more heat energy than a cup of water at the same temperature, because it has many more particles."]
    ], ["Temperature is about how hot. Heat is about how much energy moves.", "Heat always flows from hot to cold.", "Example: a big pot and a small pot of water at the same temperature: the big pot has more heat energy. Now think about yours."], [
      ["Temperature tells us...", "How hot or cold something is", "How much heat energy is in total", "How heavy it is"],
      ["A bathtub and a cup of water have the same temperature. Which holds more heat energy?", "The bathtub", "The cup", "They are the same"],
      ["Heat energy flows from...", "Hot to cold", "Cold to hot", "Nowhere"],
      ["Temperature is a measure of the average...", "Movement energy of particles", "Size of particles", "Color of particles"],
      ["Heat is measured in...", "Joules", "Degrees", "Newtons"],
      ["A thermometer measures...", "Temperature", "Mass", "Force"],
      ["Two cups of water: one at 20 °C and one at 60 °C. Which has faster-moving particles?", "The 60 °C cup", "The 20 °C cup", "They are equal"],
      ["A hot cup left on a table slowly ends up...", "At room temperature", "Hotter than before", "Colder than the room"]
    ]),
    num("Celsius to kelvin", [
      ["Another scale", "🌡️", "Scientists often use the <b>Kelvin</b> scale (K). A kelvin is the same size as a degree Celsius, but the scale starts at absolute zero."],
      ["Change", "🔁", "<b>K = °C + 273</b>. Water freezes at 0 °C = 273 K and boils at 100 °C = 373 K."],
      ["Back again", "↩️", "<b>°C = K - 273</b>."]
    ], () => {
      const c = pick([0, 10, 15, 20, 25, 30, 37, 50, 100]);
      return pick([
        { text: `Convert ${c} °C to kelvin.`, visual: "🌡️", answer: c + 273,
          hints: ["The Kelvin scale starts lower than the Celsius scale.", "Add 273 to the Celsius number.", "Example: 5 °C + 273 = 278 K. Now do yours."] },
        { text: `A temperature is ${c + 273} K. What is it in °C?`, visual: "🔁", answer: c,
          hints: ["Go the other way from Celsius to kelvin.", "Subtract 273 from the kelvin number.", "Example: 300 K - 273 = 27 °C. Now do yours."] }
      ]);
    }),
    num("Echo distance", [
      ["Sound speed", "📢", "Sound travels about <b>340 m</b> every second in air."],
      ["There and back", "🏔️", "An echo goes to the wall and comes back, so the sound travels the distance <b>twice</b>."],
      ["Rule", "🧮", "Distance to the wall = 340 x time / 2. A 2 s echo means a wall 340 m away."]
    ], () => {
      const t = pick([2, 4, 6, 8]), d = pick([170, 340, 510, 680]);
      return pick([
        { text: `You shout and hear the echo after ${t} seconds. Sound travels 340 m each second. How far away is the cliff in meters?`, visual: "🏔️", answer: 170 * t,
          hints: ["The sound travels to the cliff and back.", "Work out the whole path (340 times the time), then halve it.", "Example: an echo after 10 s means a 340 x 10 = 3400 m round trip, so the cliff is 1700 m away. Now do yours."] },
        { text: `A cliff is ${d} m away. How many seconds until you hear your echo? (Sound goes 340 m each second.)`, visual: "📣", answer: d * 2 / 340,
          hints: ["The echo has to cover twice the distance.", "Double the distance, then divide by 340.", "Example: a wall 1020 m away needs 2040 m of travel, which is 6 seconds. Now do yours."] }
      ]);
    }),
    les("How the eye works", [
      ["Letting light in", "👁️", "Light enters through the clear <b>cornea</b> and the <b>pupil</b>, the dark hole. The colored <b>iris</b> makes the pupil bigger or smaller."],
      ["Focusing", "🔍", "The <b>lens</b> focuses light into a sharp picture on the <b>retina</b> at the back of the eye. The picture is upside down."],
      ["To the brain", "🧠", "The retina sends signals along the <b>optic nerve</b>. The brain turns the picture the right way up."]
    ], ["Follow the light from the front of the eye to the back.", "Think about which part lets light in, which focuses it, and which catches it.", "Example: a camera lens focuses light on a sensor, like the eye's lens focuses on the retina. Now think about yours."], [
      ["The dark opening that lets light into the eye is the...", "Pupil", "Retina", "Lens"],
      ["The colored part of the eye is the...", "Iris", "Retina", "Optic nerve"],
      ["The picture is formed on the...", "Retina", "Pupil", "Iris"],
      ["The lens of the eye...", "Focuses the light", "Makes tears", "Closes the eyelid"],
      ["In bright light your pupils get...", "Smaller", "Bigger", "Square"],
      ["Signals travel to the brain along the...", "Optic nerve", "Iris", "Cornea"],
      ["The picture on the retina is...", "Upside down", "Sideways", "Hidden"],
      ["A camera's sensor is like the eye's...", "Retina", "Eyelid", "Iris"]
    ]),
    num("Resistors in series", [
      ["Resistance", "🔌", "<b>Resistance</b> (in ohms, Ω) makes it harder for current to flow."],
      ["Add them", "➕", "In a <b>series</b> circuit the resistances add up: total = R1 + R2 + R3."],
      ["Example", "📘", "Resistors of 4 Ω and 6 Ω in series make 4 + 6 = 10 Ω."]
    ], () => {
      const r1 = ri(2, 9), r2 = ri(2, 9), r3 = ri(1, 6);
      return pick([
        { text: `Two resistors of ${r1} Ω and ${r2} Ω are in series. What is the total resistance in ohms?`, visual: "🔌", answer: r1 + r2,
          hints: ["All the current has to pass through both.", "Add the two resistances.", "Example: 3 Ω and 8 Ω in series give 3 + 8 = 11 Ω. Now do yours."] },
        { text: `Three resistors of ${r1} Ω, ${r2} Ω and ${r3} Ω are in series. What is the total in ohms?`, visual: "➕", answer: r1 + r2 + r3,
          hints: ["Series resistances join end to end.", "Add all three numbers.", "Example: 2, 5 and 4 Ω give 2 + 5 + 4 = 11 Ω. Now do yours."] },
        { text: `The total resistance in a series circuit is ${r1 + r2} Ω. One resistor is ${r1} Ω. What is the other, in ohms?`, visual: "❓", answer: r2,
          hints: ["The two parts add up to the total.", "Subtract the known resistor from the total.", "Example: total 12 Ω with one 5 Ω resistor leaves 12 - 5 = 7 Ω. Now do yours."] }
      ]);
    }),
    les("Magnet insides", [
      ["Tiny magnets", "🧲", "Iron is made of tiny regions called <b>domains</b>. Each domain acts like a very small magnet."],
      ["Lined up", "🧭", "In plain iron the domains point in <b>many directions</b> and cancel out. In a magnet most domains point the <b>same way</b>."],
      ["Making and losing", "🔨", "Stroking iron with a magnet lines up its domains. Heating or hitting a magnet jumbles them and weakens it."]
    ], ["Think about what the little domains are doing inside.", "Lined up means magnet. Jumbled means not a magnet.", "Example: stroking a steel needle many times with a magnet in one direction magnetizes it. Now think about yours."], [
      ["Tiny groups of atoms that act like small magnets are called...", "Domains", "Planets", "Cells"],
      ["In an ordinary piece of iron, the domains point...", "In many directions", "All the same way", "Straight up"],
      ["In a magnet, most domains point...", "The same way", "In random directions", "Nowhere"],
      ["If you cut a bar magnet in half you get...", "Two smaller magnets", "A north piece and a non-magnet", "Two non-magnets"],
      ["Dropping or hitting a magnet hard can...", "Weaken it", "Make it stronger", "Make it float"],
      ["Stroking an iron nail with a magnet many times in one direction...", "Magnetizes the nail", "Melts it", "Does nothing"],
      ["Heating a magnet strongly can make it...", "Lose its magnetism", "Heavier", "Non-metal"],
      ["Which can be magnetized?", "An iron nail", "A wooden stick", "A plastic comb"]
    ]),
    les("Loudness and decibels", [
      ["Measuring loudness", "🔊", "Loudness is measured in <b>decibels (dB)</b>. A whisper is about 30 dB, talking about 60 dB, and a rock concert about 110 dB."],
      ["Loud is risky", "🎧", "Very loud sounds, or loud sounds for a long time, can damage hearing. Use ear protection."],
      ["Not the same as pitch", "🎵", "Loudness depends on the wave's <b>amplitude</b>. Pitch depends on its <b>frequency</b> in hertz (Hz)."]
    ], ["Loudness and pitch are different. Which one is being asked?", "Bigger amplitude means louder. Frequency means pitch.", "Example: a quiet high whistle has a small amplitude and a high frequency. Now think about yours."], [
      ["Loudness is measured in...", "Decibels (dB)", "Hertz", "Newtons"],
      ["Which is louder?", "A jet engine", "A whisper", "Rustling leaves"],
      ["Hertz measures...", "Pitch (frequency)", "Loudness", "Echo"],
      ["A rock concert is about...", "110 dB", "10 dB", "0 dB"],
      ["Very loud sounds over a long time can harm your...", "Hearing", "Eyesight", "Bones"],
      ["At a very loud show, you should wear...", "Ear protection", "A hat", "A scarf"],
      ["Louder sounds have a bigger...", "Amplitude", "Color", "Weight"],
      ["A sound of 0 dB is about the...", "Quietest we can hear", "Loudest possible sound", "Sound of a plane"]
    ]),
    les("Tides", [
      ["The Moon pulls", "🌊", "The Moon's gravity pulls on Earth's oceans. Water bulges on the side facing the Moon, and also on the far side."],
      ["Twice a day", "🌗", "As Earth spins, most coasts have <b>two high tides</b> and <b>two low tides</b> each day, about 6 hours apart."],
      ["Sun helps", "☀️", "The Sun pulls too, but less than the Moon. At new moon and full moon, the Sun and Moon line up and make extra-big <b>spring tides</b>."]
    ], ["Think about what pulls on the oceans.", "The nearer, closer object matters most. Tides repeat through the day.", "Example: at low tide you can walk far out on the beach. Now think about yours."], [
      ["Ocean tides are mainly caused by the pull of the...", "Moon", "Wind", "Mars"],
      ["Most coasts have high tide about...", "Twice a day", "Once a year", "Never"],
      ["The biggest tides happen at...", "New moon and full moon", "First quarter moon", "Only in winter"],
      ["Besides the Moon, which also affects tides?", "The Sun", "Mercury", "A comet"],
      ["From one high tide to the next low tide takes about...", "6 hours", "1 minute", "1 week"],
      ["At low tide the sea is...", "Far out from the beach", "Up near the dunes", "Frozen"],
      ["The force that causes tides is...", "Gravity", "Magnetism", "Friction"],
      ["Gravity gets weaker with distance, so the Moon pulls hardest on...", "The side of Earth facing it", "The side of Earth facing away", "Only the poles"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [0, 2, 4, 5, 8, 10, 12, 14, 15])),
    mix("Level 10 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 11 =================
  const b = [
    les("Vectors and scalars", [
      ["Size only", "🔢", "A <b>scalar</b> has only a size: mass, time, temperature, speed and distance."],
      ["Size and direction", "🧭", "A <b>vector</b> has a size <b>and</b> a direction: velocity, force, acceleration, displacement and weight."],
      ["Speed vs velocity", "🚗", "'60 km/h' is a speed. '60 km/h north' is a velocity."]
    ], ["Ask: does it need a direction to make sense?", "A force pushes some way. A temperature has no direction.", "Example: time is a scalar, a pull to the left is a vector. Now think about yours."], [
      ["Which is a vector?", "Force", "Temperature", "Time"],
      ["Which is a scalar?", "Mass", "Velocity", "Acceleration"],
      ["'50 km/h east' is a...", "Velocity", "Speed", "Time"],
      ["'50 km/h' with no direction is a...", "Speed", "Velocity", "Force"],
      ["Which needs a direction?", "Displacement", "Distance", "Energy"],
      ["Which is a scalar?", "Temperature", "Weight", "Force"],
      ["A vector has...", "Size and direction", "Only a size", "Only a direction"],
      ["Which is a vector?", "Acceleration", "Speed", "Mass"]
    ]),
    num("Distance or displacement", [
      ["Two ideas", "🚶", "<b>Distance</b> is how far you walked in total. <b>Displacement</b> is how far you are from the start, in a straight line, with a direction."],
      ["Going back", "↩️", "Walk 10 m east then 4 m west. Distance walked = 10 + 4 = 14 m. Displacement = 10 - 4 = 6 m east."],
      ["Back at start", "🏠", "If you return to where you began, your displacement is zero."]
    ], () => {
      const x = ri(6, 15), y = ri(2, 5);
      return pick([
        { text: `You walk ${x} m east and then ${y} m west along a straight path. How far are you from the start, in meters?`, visual: "🚶", answer: x - y,
          hints: ["The second walk undoes part of the first.", "Subtract the shorter walk from the longer one.", "Example: 19 m east then 7 m west leaves you 19 - 7 = 12 m from the start. Now do yours."] },
        { text: `You walk ${x} m east and then ${y} m west. What total distance did you walk, in meters?`, visual: "👣", answer: x + y,
          hints: ["Distance counts every step, in any direction.", "Add the two walks together.", "Example: 18 m one way and 6 m back is 18 + 6 = 24 m of walking. Now do yours."] }
      ]);
    }),
    les("Relative motion", [
      ["Compared to what?", "🚆", "Motion depends on what you compare with. This is your <b>frame of reference</b>."],
      ["Add or subtract", "➕", "Walking forward on a moving train: add your speed to the train's. Walking backward: subtract."],
      ["Two vehicles", "🚗", "Cars driving toward each other approach at the <b>sum</b> of their speeds. Cars driving the same way approach at the <b>difference</b>."]
    ], ["Which way is the extra motion, with the main motion or against it?", "Same direction: add. Opposite direction: subtract.", "Example: a swimmer at 3 km/h with a river current of 1 km/h downstream moves at 4 km/h past the bank. Now think about yours."], [
      ["You walk forward at 2 km/h on a train moving 60 km/h. Your speed relative to the ground is...", "62 km/h", "58 km/h", "60 km/h"],
      ["You walk toward the back at 2 km/h on a train going 60 km/h. Relative to the ground...", "58 km/h", "62 km/h", "2 km/h"],
      ["Sitting on a moving bus, you are not moving relative to...", "The seat", "The road", "A tree outside"],
      ["Two cars each go 50 km/h in the same direction. To each other they seem...", "Not moving", "To go 100 km/h", "To go 25 km/h"],
      ["Two cars drive toward each other at 40 km/h each. They approach at...", "80 km/h", "0 km/h", "40 km/h"],
      ["Speed depends on the...", "Frame of reference", "Color of the object", "Weather only"],
      ["You are sitting still on Earth. Compared with the Sun, you are...", "Moving (Earth spins and orbits)", "Perfectly still", "Falling straight down"],
      ["A boat goes 10 km/h and the river flows with it at 3 km/h. Speed relative to the bank is...", "13 km/h", "7 km/h", "3 km/h"]
    ]),
    num("Distance from speed", [
      ["Steady speed", "🚴", "At a steady speed, <b>distance = speed x time</b>. On a speed-time graph this is the area of a rectangle."],
      ["Speeding up from rest", "📈", "If you speed up steadily from rest, your <b>average</b> speed is half the final speed. So distance = ½ x final speed x time."],
      ["Example", "🏎️", "A car speeds up from 0 to 20 m/s in 6 s. Distance = ½ x 20 x 6 = 60 m."]
    ], () => {
      const v = ri(2, 9) * 2, t = ri(2, 8);
      return pick([
        { text: `A runner holds a steady ${v} m/s for ${t} seconds. How far does she run, in meters?`, visual: "🏃", answer: v * t,
          hints: ["The speed does not change.", "Multiply the speed by the time.", "Example: 5 m/s for 4 s covers 5 x 4 = 20 m. Now do yours."] },
        { text: `A car speeds up steadily from rest to ${v} m/s in ${t} seconds. How far does it travel, in meters?`, visual: "🚗", answer: v * t / 2,
          hints: ["The speed is not steady, so use the average speed.", "The average of 0 and the final speed is half the final speed. Multiply by the time.", "Example: 0 to 10 m/s in 4 s has an average of 5 m/s, so 5 x 4 = 20 m. Now do yours."] }
      ]);
    }),
    num("Free fall speed", [
      ["Gravity speeds you up", "🍎", "Near Earth, a falling object (ignoring air) speeds up by about <b>10 m/s every second</b>. So g is about 10 m/s²."],
      ["Speed rule", "⏱️", "Speed after falling = 10 x time. After 3 s it is 10 x 3 = 30 m/s."],
      ["Distance rule", "📏", "Distance fallen = 5 x time x time. After 3 s it is 5 x 3 x 3 = 45 m."]
    ], () => {
      const t = ri(2, 6), u = ri(2, 4);
      return pick([
        { text: `A ball is dropped and falls for ${t} seconds. Ignoring air, how fast is it going in m/s? (Use g = 10 m/s²)`, visual: "⚽", answer: 10 * t,
          hints: ["Every second adds the same amount of speed.", "Multiply 10 by the number of seconds.", "Example: after 8 s, speed is 10 x 8 = 80 m/s. Now do yours."] },
        { text: `A stone falls at ${10 * t} m/s. For how many seconds has it been falling? (g = 10 m/s²)`, visual: "🪨", answer: t,
          hints: ["Each second adds 10 m/s of speed.", "Divide the speed by 10.", "Example: 90 m/s means 90 / 10 = 9 s. Now do yours."] },
        { text: `A coin falls for ${u} seconds from rest. Ignoring air, how far does it fall, in meters? (Distance = 5 x t x t)`, visual: "🪙", answer: 5 * u * u,
          hints: ["Use the distance rule with the time multiplied by itself.", "Multiply the time by itself, then multiply by 5.", "Example: 6 s gives 5 x 6 x 6 = 180 m. Now do yours."] }
      ]);
    }),
    num("Stored height energy", [
      ["Gravitational potential energy", "⛰️", "Lifting something stores energy. <b>GPE = mass x 10 x height</b>, with mass in kg, height in m, and energy in joules (J)."],
      ["Example", "🧱", "A 3 kg brick lifted 4 m stores 3 x 10 x 4 = 120 J."],
      ["Backwards", "🔁", "Height = energy / (mass x 10)."]
    ], () => {
      const m = ri(1, 8), h = ri(2, 9);
      return pick([
        { text: `A ${m} kg box is lifted ${h} m. How much gravitational potential energy does it gain, in joules? (Use g = 10)`, visual: "📦", answer: m * 10 * h,
          hints: ["Energy depends on the mass and the height.", "Multiply mass x 10 x height.", "Example: 2 kg lifted 5 m gives 2 x 10 x 5 = 100 J. Now do yours."] },
        { text: `A ${m} kg ball has ${m * 10 * h} J of potential energy. How high is it, in meters? (g = 10)`, visual: "🏀", answer: h,
          hints: ["Work backwards from the energy.", "Divide the energy by (mass x 10).", "Example: 3 kg with 150 J: 150 / (3 x 10) = 5 m. Now do yours."] }
      ]);
    }),
    num("Moving energy", [
      ["Kinetic energy", "🏃", "Moving things have <b>kinetic energy</b>: <b>KE = ½ x mass x speed x speed</b>, in joules."],
      ["Example", "🎾", "A 2 kg ball at 5 m/s: ½ x 2 x 5 x 5 = 25 J."],
      ["Speed matters most", "🚀", "Speed is multiplied by itself, so doubling the speed makes the energy 4 times bigger."]
    ], () => {
      const m = pick([2, 4, 6, 8, 10]), v = ri(2, 6);
      return pick([
        { text: `A ${m} kg cart moves at ${v} m/s. What is its kinetic energy in joules?`, visual: "🛒", answer: m * v * v / 2,
          hints: ["Speed counts twice in the rule.", "Multiply mass x speed x speed, then halve it.", "Example: 4 kg at 3 m/s gives ½ x 4 x 3 x 3 = 18 J. Now do yours."] },
        { text: `A ${m} kg ball has a kinetic energy of ${m * v * v / 2} J. How fast is it going in m/s?`, visual: "⚽", answer: v,
          hints: ["Undo the rule: first remove the half.", "Double the energy, divide by the mass, then find the number that multiplies by itself to make that.", "Example: 2 kg and 16 J: 32 / 2 = 16, and 4 x 4 = 16, so 4 m/s. Now do yours."] }
      ]);
    }),
    les("Roller coaster energy", [
      ["Up the hill", "🎢", "At the top of a hill a coaster car has lots of stored <b>potential energy</b> and is slow."],
      ["Down the drop", "⬇️", "Falling turns potential energy into <b>kinetic energy</b>. The car is fastest at the bottom."],
      ["Energy is never lost", "♻️", "Friction turns some energy into heat and sound. That is why later hills must be lower than the first."]
    ], ["Think about height (stored energy) and speed (moving energy).", "High means potential energy, fast means kinetic energy. Some becomes heat.", "Example: a ball rolled up a hill slows down as its moving energy turns into stored energy. Now think about yours."], [
      ["At the top of the first hill, a coaster has the most...", "Stored (potential) energy", "Speed", "Friction"],
      ["As the coaster drops, potential energy turns into...", "Kinetic energy", "Mass", "Gravity"],
      ["The coaster is fastest at the...", "Bottom of a big drop", "Top of a hill", "Station"],
      ["Later hills are lower than the first because...", "Some energy turns into heat by friction", "Gravity switches off", "The track gets longer"],
      ["Where is the kinetic energy smallest?", "At the top of a hill", "At the bottom of a drop", "In the fast part of the track"],
      ["Energy lost to friction and air ends up as...", "Heat and sound", "Nothing", "More height"],
      ["Counting heat too, the total energy stays...", "The same", "Growing", "Zero"],
      ["A cart waiting at rest at the top of a hill has mostly...", "Potential energy", "Kinetic energy", "Sound energy"]
    ]),
    les("Pendulums", [
      ["Swinging", "🕰️", "A <b>pendulum</b> is a weight on a string that swings back and forth. One swing there and back is a <b>cycle</b>."],
      ["Length matters", "📏", "A longer pendulum swings more <b>slowly</b>. The mass of the weight does not change the timing, for small swings."],
      ["Energy", "🔄", "At the highest point it has the most stored energy. At the lowest point it is fastest."]
    ], ["Think about what changes the time of a swing: the string or the weight?", "Only the length of the string changes the timing (for small swings).", "Example: a short swing set seat swings quicker than one on long chains. Now think about yours."], [
      ["A longer pendulum swings...", "More slowly", "Faster", "Not at all"],
      ["Does the mass of the bob change the swing time (for small swings)?", "No", "Yes, a lot", "Only when still"],
      ["At the lowest point of a swing the bob has the most...", "Speed", "Height", "Stored energy from height"],
      ["At the highest point of its swing the bob has the most...", "Potential energy", "Speed", "Sound"],
      ["Clocks with pendulums work because the swing time is...", "Steady", "Random", "Zero"],
      ["To make a pendulum swing more slowly, make the string...", "Longer", "Shorter", "Lighter"],
      ["A pendulum slowly stops swinging because of...", "Air resistance and friction", "Gravity turning off", "Light"],
      ["One full swing there and back is called a...", "Cycle", "Echo", "Orbit"]
    ]),
    num("Pulley systems", [
      ["Sharing the load", "🏗️", "In a pulley system, the rope sections that hold up the load share its weight."],
      ["The rule", "➗", "<b>Effort = load / number of supporting ropes</b>. With 4 ropes, you pull with a quarter of the load."],
      ["The cost", "⛓️", "You pull more rope. 4 ropes means you pull 4 m of rope to lift the load 1 m."]
    ], () => {
      const n = ri(2, 5), e = ri(10, 40);
      return pick([
        { text: `A pulley system has ${n} ropes holding up a ${n * e} N load. What effort force is needed, in N (ignoring friction)?`, visual: "🏗️", answer: e,
          hints: ["The ropes share the load equally.", "Divide the load by the number of supporting ropes.", "Example: 120 N held by 4 ropes needs 120 / 4 = 30 N. Now do yours."] },
        { text: `You pull with ${e} N on a pulley system with ${n} supporting ropes. How big a load can you lift, in N (ignoring friction)?`, visual: "💪", answer: n * e,
          hints: ["Each rope carries your pull.", "Multiply your force by the number of supporting ropes.", "Example: 25 N with 3 ropes lifts 25 x 3 = 75 N. Now do yours."] }
      ]);
    }),
    les("Hydraulics", [
      ["Pushing liquids", "🚜", "A liquid is very hard to squash. When you push on a liquid in a closed tube, the pressure goes <b>equally everywhere</b>."],
      ["Small to big", "🔧", "A small piston pushes liquid to a big piston. The same pressure on a bigger area gives a bigger force. That is how a car jack lifts a car."],
      ["Used everywhere", "🛑", "Car brakes, diggers and lifts use hydraulics."]
    ], ["Think about what a liquid can and cannot do when pushed.", "Liquids do not squash. Pressure passes on everywhere, and a bigger piston means a bigger force.", "Example: a small push on a small syringe can move a large piston at the other end of a tube. Now think about yours."], [
      ["Liquids are hard to...", "Squash", "Pour", "Warm"],
      ["Pressure pushed into a liquid in a closed space passes on...", "Everywhere equally", "Only upward", "Nowhere"],
      ["Car brakes use...", "Hydraulics (liquid pressure)", "Magnets", "Sunlight"],
      ["A hydraulic jack gets a big lifting force from a small push by using a...", "Larger piston", "Smaller piston", "Magnet"],
      ["Why do hydraulic systems use oil and not air?", "Liquids do not squash much", "Oil is a gas", "Oil weighs nothing"],
      ["A piston with 10 times the area gives about ___ the force.", "10 times", "The same", "Half"],
      ["Digger arms move using...", "Hydraulic pistons", "Springs only", "Magnets"],
      ["Pascal's principle is about pressure in...", "Fluids", "Wires", "Mirrors"]
    ]),
    les("Reaching the same temperature", [
      ["Heat flows", "🥄", "Heat moves from the hotter object to the colder one, until both reach the same temperature. This is <b>thermal equilibrium</b>."],
      ["Conductors feel colder", "🥶", "A metal spoon feels colder than a wooden one at the same temperature because metal pulls heat out of your hand faster."],
      ["Stopping the flow", "🧉", "A vacuum flask is made to slow heat flow so drinks stay hot or cold."]
    ], ["Which object is hotter, and which way does energy go?", "Heat goes from hot to cold until they match.", "Example: a warm cup in a cold room gives its heat to the air until they match. Now think about yours."], [
      ["A hot spoon is put in cold water. Heat flows...", "From spoon to water", "From water to spoon", "Nowhere"],
      ["When two things reach the same temperature they are in...", "Thermal equilibrium", "A race", "A circuit"],
      ["Ice cools a drink because heat flows...", "From the drink into the ice", "From the ice into the drink", "Both stay put"],
      ["A metal cup feels colder than a wooden cup in the same room because metal...", "Conducts heat away from your hand quickly", "Is colder", "Makes cold"],
      ["After a long time, a hot drink and the room have...", "The same temperature", "The drink is hotter", "The drink is colder"],
      ["Heat transfer stops when temperatures are...", "Equal", "Different", "High"],
      ["A vacuum flask keeps a drink hot by slowing...", "Heat flow", "Gravity", "Sound"],
      ["Holding a snowball feels cold because heat flows...", "From your hand to the snow", "From the snow to your hand", "Nowhere"]
    ]),
    les("Heating curves", [
      ["Flat parts", "📈", "When you heat ice, its temperature rises, then <b>stays at 0 °C</b> while it melts. Then it rises again to 100 °C and stays flat while it boils."],
      ["Where does the energy go?", "🧊", "During melting or boiling, the heat energy is used to <b>break the links between particles</b>, not to raise the temperature."],
      ["Cooling", "❄️", "Freezing and condensing <b>release</b> energy."]
    ], ["Remember: during a change of state, the temperature stays flat.", "Heat in goes to changing the state, not the temperature.", "Example: a pot of boiling water stays at the same temperature even with the stove on high. Now think about yours."], [
      ["While ice is melting at 0 °C, its temperature...", "Stays at 0 °C", "Rises quickly", "Drops"],
      ["At sea level, pure water boils at...", "100 °C", "50 °C", "0 °C"],
      ["During boiling, the added heat is used to...", "Change the state of the water", "Raise the temperature", "Freeze it"],
      ["Melting a solid needs energy to be...", "Absorbed", "Released", "Created"],
      ["Freezing water ___ heat.", "Releases", "Absorbs"],
      ["On a heating graph, flat sections show...", "A change of state", "No heating", "Stirring"],
      ["The same mass of steam and boiling water, both at 100 °C: which holds more energy?", "Steam", "Boiling water", "Equal"],
      ["Ice at -10 °C is heated. First it...", "Warms up to 0 °C", "Boils", "Melts at once"]
    ]),
    les("What waves can do", [
      ["Bounce and bend", "🌊", "<b>Reflection</b> is bouncing off a surface. <b>Refraction</b> is bending when a wave enters a new material."],
      ["Spread and soak", "🕳️", "<b>Diffraction</b> is waves spreading out as they pass a gap or an edge. <b>Absorption</b> is a material soaking up the wave's energy."],
      ["Everyday", "🪞", "Echoes are reflection. A straw looking bent in water is refraction. A black shirt getting hot is absorption."]
    ], ["Is the wave bouncing, bending, spreading or being soaked up?", "Bounce = reflect. Bend = refract. Spread = diffract. Soak = absorb.", "Example: light bouncing off a mirror is reflection. Now think about yours."], [
      ["Sound bouncing off a wall is...", "Reflection", "Refraction", "Diffraction"],
      ["Light bending as it goes from air into water is...", "Refraction", "Reflection", "Diffraction"],
      ["Ocean waves spreading out after passing through a gap in a harbor wall is...", "Diffraction", "Reflection", "Absorption"],
      ["A black shirt gets hot in the sun because it...", "Absorbs light", "Reflects light", "Refracts light"],
      ["A straw looks bent in a glass of water because of...", "Refraction", "Reflection", "Absorption"],
      ["An echo is an example of...", "Reflection", "Refraction", "Diffraction"],
      ["You see yourself in a mirror because light undergoes...", "Reflection", "Absorption", "Diffraction"],
      ["Foam on a studio wall makes sound quieter by...", "Absorbing it", "Reflecting it more", "Bending it"]
    ]),
    les("The Doppler effect", [
      ["Siren pitch", "🚑", "An ambulance siren sounds <b>higher</b> as it comes toward you and <b>lower</b> as it drives away. This is the <b>Doppler effect</b>."],
      ["Why?", "〰️", "Moving toward you squashes the sound waves together (shorter wavelength, higher pitch). Moving away stretches them out."],
      ["In space", "🌌", "Light does it too. Light from galaxies moving away is shifted toward red."]
    ], ["Is the sound source coming toward you or going away?", "Closer squashes the waves (higher). Away stretches them (lower).", "Example: a train horn drops in pitch after it passes the station. Now think about yours."], [
      ["An ambulance comes toward you. The siren's pitch sounds...", "Higher", "Lower", "The same"],
      ["After it passes and goes away, the pitch sounds...", "Lower", "Higher", "Louder only"],
      ["This change in pitch is called the...", "Doppler effect", "Echo effect", "Magnet effect"],
      ["The Doppler effect happens because the waves are...", "Squashed in front of a moving source and stretched behind", "Hotter in front", "Heavier in front"],
      ["If the source and listener do not move relative to each other, the pitch is...", "Unchanged", "Higher", "Lower"],
      ["A source moving toward you gives waves with a shorter...", "Wavelength", "Mass", "Color"],
      ["Police radar uses the Doppler effect to measure a car's...", "Speed", "Color", "Weight"],
      ["Light from galaxies moving away is shifted toward...", "Red", "Blue", "Green"]
    ]),
    les("Light in fibers", [
      ["Trapped light", "🧵", "Light traveling in glass can bounce off the inside surface and stay in. This is <b>total internal reflection</b>."],
      ["When it happens", "📐", "Light must be trying to leave a denser material (like glass or water) for a less dense one (like air), and hit the surface at a shallow angle."],
      ["Optical fibers", "🌐", "Thin glass strands guide light around bends. They carry internet signals as flashes of light and let doctors look inside the body."]
    ], ["Think about light bouncing along the inside of a thin glass strand.", "The light stays inside the glass instead of leaking out.", "Example: a diver looking up at the water surface from a low angle sees a mirror-like silvery surface. Now think about yours."], [
      ["Light stays inside an optical fiber because of total internal...", "Reflection", "Absorption", "Heat"],
      ["Optical fibers carry...", "Light signals", "Water", "Sound only"],
      ["Total internal reflection can happen when light tries to leave...", "Glass for air", "Air for glass", "Air for air"],
      ["Why are fibers thin glass strands?", "They guide light along curves", "They are easy to eat", "They are magnetic"],
      ["Doctors look inside the body using bundles of...", "Optical fibers", "Magnets", "Springs"],
      ["Diamonds sparkle partly because of...", "Total internal reflection", "Their weight", "Magnetism"],
      ["A bent fiber still carries light because the light...", "Keeps bouncing off the inside wall", "Escapes at the bend", "Melts the glass"],
      ["Compared with copper wire, a fiber carries data as...", "Pulses of light", "Pulses of sound", "Drops of water"]
    ]),
    num("Parallel branches", [
      ["Splitting current", "🔀", "In a <b>parallel</b> circuit the current splits between branches. The total current is the <b>sum</b> of the branch currents."],
      ["Same voltage", "🔋", "Every branch gets the full battery voltage."],
      ["Example", "📘", "Branches of 2 A and 3 A draw a total of 2 + 3 = 5 A from the battery."]
    ], () => {
      const x = ri(1, 5), y = ri(1, 5), z = ri(1, 4);
      return pick([
        { text: `Two parallel branches carry ${x} A and ${y} A. What current comes from the battery, in amps?`, visual: "🔀", answer: x + y,
          hints: ["All the current from the battery splits into the branches.", "Add the two branch currents.", "Example: 4 A and 3 A branches draw 4 + 3 = 7 A. Now do yours."] },
        { text: `Three parallel branches carry ${x} A, ${y} A and ${z} A. What is the total current in amps?`, visual: "💡", answer: x + y + z,
          hints: ["Think of the branches as roads sharing the traffic.", "Add all three branch currents.", "Example: 1, 2 and 3 A give 1 + 2 + 3 = 6 A. Now do yours."] },
        { text: `A battery supplies ${x + y} A to two parallel branches. One branch takes ${x} A. How many amps does the other branch take?`, visual: "❓", answer: y,
          hints: ["The two branches share the total.", "Subtract the known branch from the total.", "Example: total 9 A with one branch 6 A leaves 9 - 6 = 3 A. Now do yours."] }
      ]);
    }),
    les("Transformers", [
      ["Changing voltage", "🔌", "A <b>transformer</b> changes the voltage of alternating current (AC). It has two coils of wire wrapped on an iron core."],
      ["Up and down", "⬆️", "A <b>step-up</b> transformer makes voltage higher. A <b>step-down</b> transformer makes it lower. More turns on the output coil means higher voltage."],
      ["Power lines", "🗼", "Power lines use very high voltage because it wastes less energy as heat. Transformers near homes step it down so it is safe to use."]
    ], ["Think about which way the voltage must change.", "More turns on the output coil means higher voltage. Fewer turns means lower.", "Example: a phone charger steps mains voltage down to a few volts. Now think about yours."], [
      ["Transformers change the voltage of...", "Alternating current (AC)", "Light", "Sound"],
      ["A transformer works only with current that is...", "Changing (AC)", "Steady (DC)", "Zero"],
      ["A step-up transformer makes voltage...", "Higher", "Lower", "Zero"],
      ["Power lines use high voltage to waste less energy as...", "Heat", "Sound", "Light"],
      ["A phone charger contains a transformer to make the voltage...", "Lower", "Higher than the wall socket", "Infinite"],
      ["A transformer has two coils wrapped around a...", "Iron core", "Wooden core", "Water tank"],
      ["If the output coil has more turns than the input coil, the voltage goes...", "Up", "Down", "Nowhere"],
      ["A transformer near homes makes voltage...", "Lower and safer", "Higher and stronger", "Rainbow colored"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 2, 7, 9, 10, 12, 13, 14, 16])),
    mix("Level 11 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 12 =================
  const c = [
    les("Metric prefixes", [
      ["Big prefixes", "📏", "<b>Kilo-</b> means 1,000. <b>Mega-</b> means 1,000,000. <b>Giga-</b> means 1,000,000,000."],
      ["Small prefixes", "🔬", "<b>Centi-</b> means one hundredth. <b>Milli-</b> means one thousandth. <b>Micro-</b> means one millionth. <b>Nano-</b> means one billionth."],
      ["Use them", "⚡", "1 megawatt is a million watts. A millimeter is a thousandth of a meter."]
    ], ["Think of kilometer (1,000 m) and millimeter (a tiny part of a meter).", "Big prefixes multiply. Small prefixes divide into tiny parts.", "Example: a kilogram is 1,000 grams. Now think about yours."], [
      ["Kilo- means...", "1,000", "100", "10"],
      ["Milli- means...", "One thousandth", "One hundredth", "One thousand"],
      ["Centi- means...", "One hundredth", "One thousandth", "One hundred"],
      ["A megawatt is...", "1,000,000 watts", "1,000 watts", "100 watts"],
      ["A gigabyte is about...", "1 billion bytes", "1 million bytes", "1 thousand bytes"],
      ["A micrometer is...", "One millionth of a meter", "One thousandth of a meter", "One billionth of a meter"],
      ["Nano- means...", "One billionth", "One millionth", "One thousandth"],
      ["Which is the longest?", "1 km", "1 m", "1 cm"],
      ["Which is the shortest?", "1 mm", "1 cm", "1 m"]
    ]),
    num("Force, mass, acceleration", [
      ["Newton's second law", "🧮", "<b>Force = mass x acceleration</b>, or F = m x a. Force is in newtons, mass in kg, acceleration in m/s²."],
      ["Example", "🛒", "A 5 kg cart accelerating at 2 m/s² needs 5 x 2 = 10 N."],
      ["Rearranged", "🔁", "<b>a = F / m</b> and <b>m = F / a</b>."]
    ], () => {
      const m = ri(2, 9), a = ri(2, 8);
      return pick([
        { text: `A ${m} kg wagon accelerates at ${a} m/s². What net force acts on it, in N?`, visual: "🛒", answer: m * a,
          hints: ["Bigger mass or bigger acceleration needs more force.", "Multiply mass by acceleration.", "Example: 4 kg at 3 m/s² needs 4 x 3 = 12 N. Now do yours."] },
        { text: `A net force of ${m * a} N pushes a ${m} kg box. What is its acceleration in m/s²?`, visual: "📦", answer: a,
          hints: ["Acceleration is how much force there is for each kilogram.", "Divide the force by the mass.", "Example: 30 N on 5 kg gives 30 / 5 = 6 m/s². Now do yours."] },
        { text: `A net force of ${m * a} N gives an object an acceleration of ${a} m/s². What is its mass in kg?`, visual: "⚖️", answer: m,
          hints: ["Mass is how much force you need for each unit of acceleration.", "Divide the force by the acceleration.", "Example: 24 N and 4 m/s² gives 24 / 4 = 6 kg. Now do yours."] }
      ]);
    }),
    num("Momentum sums", [
      ["Mass in motion", "🚛", "<b>Momentum = mass x velocity</b>, or p = m x v. The units are kg m/s."],
      ["Example", "🚲", "A 40 kg rider at 5 m/s has 40 x 5 = 200 kg m/s of momentum."],
      ["Backwards", "🔁", "Velocity = momentum / mass."]
    ], () => {
      const m = pick([2, 5, 10, 20, 50]), v = ri(2, 9);
      return pick([
        { text: `A ${m} kg object moves at ${v} m/s. What is its momentum in kg m/s?`, visual: "🏒", answer: m * v,
          hints: ["Momentum grows with both mass and speed.", "Multiply mass by velocity.", "Example: 6 kg at 4 m/s gives 6 x 4 = 24 kg m/s. Now do yours."] },
        { text: `A ${m} kg cart has ${m * v} kg m/s of momentum. How fast is it moving, in m/s?`, visual: "🛒", answer: v,
          hints: ["Work back from momentum to speed.", "Divide the momentum by the mass.", "Example: 60 kg m/s from a 10 kg cart gives 60 / 10 = 6 m/s. Now do yours."] }
      ]);
    }),
    num("Sticking together", [
      ["Momentum is saved", "💥", "In a crash with no outside forces, the <b>total momentum stays the same</b> before and after."],
      ["Sticky crash", "🚃", "A moving cart hits an equal cart at rest and they stick. The momentum is now shared by double the mass, so the speed is <b>half</b>."],
      ["The rule", "📘", "<b>Final speed = (m1 x v) / (m1 + m2)</b>. Example: 2 kg at 6 m/s hits a 4 kg cart at rest: 12 / 6 = 2 m/s."]
    ], () => {
      const m1 = ri(1, 4), k = ri(1, 3), n = k + 1, v = n * ri(1, 4);
      return pick([
        { text: `A ${m1} kg cart moving at ${v} m/s hits a ${m1 * k} kg cart at rest and they stick together. How fast do they move, in m/s?`, visual: "🚃", answer: v / n,
          hints: ["The total momentum before equals the total momentum after.", "Find the first cart's momentum, then divide by the combined mass.", "Example: 5 kg at 8 m/s hits a 15 kg cart: 40 / (5 + 15) = 2 m/s. Now do yours."] },
        { text: `A ${m1} kg cart at ${v} m/s sticks to a ${m1 * k} kg cart at rest. What was the total momentum before the crash, in kg m/s?`, visual: "💥", answer: m1 * v,
          hints: ["Only the moving cart has momentum at first.", "Multiply the moving cart's mass by its speed.", "Example: 7 kg at 3 m/s has 7 x 3 = 21 kg m/s. Now do yours."] }
      ]);
    }),
    les("Impulse and safety", [
      ["Force times time", "⏱️", "Changing momentum needs <b>force x time</b>. This is called <b>impulse</b>."],
      ["Longer is gentler", "🛟", "To stop the same moving body, a long stopping time needs a smaller force. A short stop needs a much bigger force."],
      ["Safety designs", "🚗", "Airbags, crumple zones, bike helmets and soft mats all make the stopping time longer."]
    ], ["Think about the time it takes to stop.", "A longer stopping time means a smaller force on you.", "Example: landing on a thick mat takes longer to stop than landing on concrete. Now think about yours."], [
      ["Airbags make a crash safer by making the stopping time...", "Longer", "Shorter", "Zero"],
      ["A crumple zone is built to...", "Crush slowly and lengthen the crash", "Make the car stiffer", "Stop the car at once"],
      ["Impulse is force multiplied by...", "Time", "Mass", "Color"],
      ["Bending your knees when you land makes the stopping time...", "Longer, so the force is smaller", "Shorter, so the force is bigger", "Zero"],
      ["When catching a fast ball, you move your hands back to...", "Lengthen the stopping time", "Hit it harder", "Make it faster"],
      ["A bike helmet is padded to...", "Make the head stop more slowly", "Make the head stop faster", "Add weight"],
      ["The same change in momentum with a longer time needs a...", "Smaller force", "Bigger force", "Different mass"],
      ["Soft mats in gyms help by lengthening...", "The stopping time", "The jump height", "Gravity"]
    ]),
    les("Gravity and distance", [
      ["Pulls between everything", "🌍", "Every object with mass pulls on every other object. Isaac Newton worked out this law of <b>universal gravitation</b>."],
      ["Two things matter", "⚖️", "Gravity is stronger for <b>bigger masses</b> and weaker when objects are <b>farther apart</b>."],
      ["Inverse square", "🔭", "Double the distance and gravity becomes one <b>quarter</b>. Triple it and gravity is one ninth."]
    ], ["Think about mass and distance.", "Bigger mass = stronger. Farther away = weaker, and it drops quickly.", "Example: gravity from the Sun is weaker on Neptune than on Earth because Neptune is much farther away. Now think about yours."], [
      ["Gravity between two objects gets weaker as they move...", "Farther apart", "Closer", "Faster"],
      ["Gravity between objects depends on their masses and the...", "Distance between them", "Color", "Temperature"],
      ["Who described the law of universal gravitation?", "Isaac Newton", "Marie Curie", "Thomas Edison"],
      ["If the distance doubles, gravity becomes...", "One quarter as strong", "Half as strong", "Twice as strong"],
      ["Which pulls harder on you?", "Earth", "The Moon", "A parked car"],
      ["Astronauts on the space station float because they are...", "Falling around Earth along with the station", "Beyond all gravity", "Made lighter"],
      ["On the space station, gravity is about...", "Still strong (around 90 percent of the ground value)", "Zero", "Ten times the ground value"],
      ["Doubling one object's mass makes the gravity between two objects...", "Twice as big", "Half as big", "The same"]
    ]),
    les("Rockets and escape", [
      ["How rockets work", "🚀", "A rocket throws hot gas <b>down</b> out of its engine. By action and reaction, the gas pushes the rocket <b>up</b>. It works in space because it needs no air to push against."],
      ["Escape speed", "🌍", "To leave Earth for good, a rocket needs about <b>11 km/s</b> (escape speed). Staying in low orbit needs about 8 km/s sideways."],
      ["Stages", "🪜", "Rockets drop empty fuel tanks (stages) as they climb, so they get lighter."]
    ], ["Remember action and reaction.", "A rocket pushes gas one way and moves the other. It drops empty parts to be lighter.", "Example: the Moon has weaker gravity, so a rocket needs less speed to leave it. Now think about yours."], [
      ["To leave Earth for good, a rocket must reach about...", "11 km/s", "11 m/s", "110 km/h"],
      ["A rocket moves up by pushing hot gas...", "Down and back", "Up", "Sideways"],
      ["Rockets work in space because they do not need...", "Air to push against", "Gravity", "Sunlight"],
      ["The speed needed for low Earth orbit is about...", "8 km/s", "8 m/s", "80 km/h"],
      ["Rockets have stages so they can...", "Drop empty parts and get lighter", "Carry more passengers", "Cool the engine"],
      ["Compared with Earth, escape speed from the Moon is...", "Smaller", "Bigger", "The same"],
      ["Most of a rocket's mass at launch is...", "Fuel", "Passengers", "Wings"],
      ["A satellite stays up because it moves sideways so fast that, as it falls, it...", "Keeps missing Earth", "Stops", "Floats on air"]
    ]),
    num("Energy bills", [
      ["The kilowatt-hour", "🔌", "Electricity companies measure energy in <b>kilowatt-hours (kWh)</b>. <b>Energy (kWh) = power (kW) x time (hours)</b>."],
      ["Example", "🔥", "A 2 kW heater running 3 hours uses 2 x 3 = 6 kWh."],
      ["Cost", "💰", "<b>Cost = kWh x price per kWh</b>. At 10 cents per kWh, 6 kWh costs 60 cents."]
    ], () => {
      const p = ri(1, 5), h = ri(2, 8), c = pick([5, 10, 12, 20]);
      return pick([
        { text: `A ${p} kW heater runs for ${h} hours. How many kWh does it use?`, visual: "🔥", answer: p * h,
          hints: ["Energy is power used over time.", "Multiply the kilowatts by the hours.", "Example: 3 kW for 4 hours is 3 x 4 = 12 kWh. Now do yours."] },
        { text: `A home uses ${p * h} kWh. Each kWh costs ${c} cents. What is the cost in cents?`, visual: "💰", answer: p * h * c,
          hints: ["Each kWh has the same price.", "Multiply the kWh by the price per kWh.", "Example: 7 kWh at 9 cents is 7 x 9 = 63 cents. Now do yours."] }
      ]);
    }),
    les("Heat engines", [
      ["Heat to motion", "🚗", "A <b>heat engine</b> turns heat into movement. A car engine burns fuel to make hot gas that pushes pistons."],
      ["Always some waste", "♨️", "No engine is perfect. A lot of the energy ends up as <b>waste heat</b>, which is why engines get hot and need cooling."],
      ["Other engines", "🛫", "Steam turbines at power stations, jet engines and rocket engines are all heat engines. Electric motors waste less energy."]
    ], ["Think about where the fuel's energy goes.", "Only part becomes movement. The rest is heat.", "Example: a car and a bike both move, but only the car engine wastes much of its energy as heat. Now think about yours."], [
      ["A car engine changes the chemical energy in fuel into...", "Heat, then movement", "Only light", "Only sound"],
      ["Heat engines always waste some energy as...", "Heat", "Matter", "Gravity"],
      ["A steam engine uses ___ to push a piston.", "Steam pressure", "Magnets", "Wind"],
      ["Engines run hot, so cars need a...", "Cooling system", "Mirror", "Spring"],
      ["Most of the energy in a petrol car's fuel ends up as...", "Waste heat", "Movement", "Light"],
      ["A jet engine pushes hot gas...", "Backward to move forward", "Forward", "Upward"],
      ["Electric motors usually waste ___ energy than petrol engines.", "Less", "More", "The same amount of"],
      ["A power station turbine is turned by...", "Steam", "A bike", "Moonlight"]
    ]),
    les("Absolute zero", [
      ["The coldest possible", "🥶", "Particles move slower the colder things get. At <b>absolute zero</b>, -273 °C, they have the least possible motion. Nothing can be colder."],
      ["Kelvin scale", "🌡️", "The Kelvin scale starts at absolute zero: 0 K. So 0 °C is 273 K."],
      ["Space", "🌌", "Deep space is about 3 K, only a little above absolute zero."]
    ], ["Think about what temperature means for the particles.", "Slower particles means colder, and there is a limit.", "Example: on the Kelvin scale there are no negative numbers. Now think about yours."], [
      ["Absolute zero is about...", "-273 °C", "0 °C", "-100 °C"],
      ["Absolute zero is 0 on the ___ scale.", "Kelvin", "Celsius", "Fahrenheit"],
      ["At absolute zero particles have the...", "Least possible motion", "Most motion", "Fastest motion"],
      ["Can we reach a temperature colder than absolute zero?", "No, it is the coldest possible", "Yes, easily", "Only on Mars"],
      ["0 °C is about ___ in kelvins.", "273 K", "0 K", "100 K"],
      ["The Kelvin scale never has...", "Negative numbers", "Positive numbers", "Whole numbers"],
      ["In hotter objects the particles move...", "Faster", "Slower", "Not at all"],
      ["Deep space is about 3 K, which is...", "Just above absolute zero", "Hotter than boiling water", "Exactly absolute zero"]
    ]),
    les("Gases and pressure", [
      ["Squeezing gas", "💨", "Gas pressure comes from particles hitting the walls. Squeeze the same gas into a smaller space and the pressure goes <b>up</b>. This is <b>Boyle's law</b>."],
      ["Heating gas", "🔥", "Heat a gas and the particles move faster. In a sealed container the pressure rises. In a balloon the gas expands."],
      ["Cooling", "🧊", "Cool a gas and it shrinks, so a balloon gets smaller in a freezer."]
    ], ["Think about particles hitting the walls: more often, or harder?", "Smaller space = more hits. Hotter = faster hits.", "Example: a sealed syringe pushed in feels harder to push as the air is squeezed. Now think about yours."], [
      ["Squeezing a gas into a smaller space makes its pressure...", "Go up", "Go down", "Stay the same"],
      ["Heating a gas in a sealed rigid container makes its pressure...", "Rise", "Fall", "Stay the same"],
      ["A balloon in the freezer gets...", "Smaller", "Bigger", "Heavier"],
      ["Boyle's law: when volume gets smaller, pressure gets...", "Bigger", "Smaller", "Equal to zero"],
      ["A bike pump works by making the air volume...", "Smaller, so the pressure rises", "Bigger", "Disappear"],
      ["Gas pressure comes from particles...", "Hitting the walls", "Standing still", "Glowing"],
      ["A sealed bag of chips puffs up on a mountain because the outside pressure is...", "Lower", "Higher", "The same"],
      ["A hot-air balloon rises because the heated air is...", "Less dense", "More dense", "Heavier"]
    ]),
    num("Voltage in series", [
      ["Sharing voltage", "🔋", "In a <b>series</b> circuit the battery's voltage is shared. The voltage drops across the parts <b>add up</b> to the battery voltage."],
      ["Same current", "➡️", "The current is the <b>same</b> in every part of a series circuit."],
      ["Example", "📘", "A 12 V battery with one bulb using 5 V leaves 12 - 5 = 7 V for the other bulb."]
    ], () => {
      const x = ri(2, 6), y = ri(2, 6), z = ri(1, 4);
      return pick([
        { text: `Two bulbs in series use ${x} V and ${y} V. What is the battery voltage, in volts?`, visual: "🔋", answer: x + y,
          hints: ["The battery's voltage is used up by the parts.", "Add the voltages across the bulbs.", "Example: 3 V and 4 V come from a 3 + 4 = 7 V battery. Now do yours."] },
        { text: `A ${x + y} V battery powers two bulbs in series. One bulb uses ${x} V. How many volts does the other use?`, visual: "💡", answer: y,
          hints: ["The two bulbs share the battery voltage.", "Subtract the known voltage from the battery voltage.", "Example: 12 V battery, one bulb 8 V, leaves 12 - 8 = 4 V. Now do yours."] },
        { text: `Three parts in series use ${x} V, ${y} V and ${z} V. What is the battery voltage in volts?`, visual: "➕", answer: x + y + z,
          hints: ["Each part takes a share of the voltage.", "Add all three.", "Example: 2, 3 and 4 V need a 2 + 3 + 4 = 9 V battery. Now do yours."] }
      ]);
    }),
    les("Radio and microwaves", [
      ["Invisible waves", "📡", "Radio waves and microwaves are <b>electromagnetic waves</b>, like light but with longer wavelengths. We cannot see them."],
      ["Speed", "⚡", "They travel at the speed of light and can cross empty space. Antennas send and receive them."],
      ["Uses", "📱", "Radio, TV, phones and WiFi use radio waves or microwaves. A microwave oven uses microwaves to heat food."]
    ], ["Think about waves that travel without any air.", "Radio waves are electromagnetic with long wavelengths, and they travel at light speed.", "Example: sunlight reaches us across empty space as electromagnetic waves. Now think about yours."], [
      ["Radio waves are part of the ___ spectrum.", "Electromagnetic", "Sound", "Rainbow only"],
      ["Radio waves travel at the speed of...", "Light", "Sound", "Wind"],
      ["Radio waves can travel through...", "Empty space", "Only air", "Only water"],
      ["Compared with other EM waves, radio waves have the ___ wavelengths.", "Longest", "Shortest", "Tiniest"],
      ["A cell phone sends signals using...", "Radio waves or microwaves", "Sound", "Magnetic strings"],
      ["WiFi uses...", "Radio waves", "X-rays", "Gamma rays"],
      ["Antennas are used to...", "Send and receive waves", "Make food", "Stop light"],
      ["A microwave oven heats food using...", "Microwaves", "Sound", "Ice"]
    ]),
    les("Mixing colors", [
      ["Mixing light", "💡", "Mixing colored light is <b>additive</b>. Red + green makes yellow. Red + green + blue makes <b>white</b>. TV screens use red, green and blue."],
      ["Objects", "🍎", "An object looks red because it <b>reflects</b> red light and absorbs the others. A black object absorbs almost all light. A white object reflects most."],
      ["Mixing paint", "🎨", "Paints take away colors by absorbing them. Mixing many paints makes a dark muddy color."]
    ], ["Is it colored light being mixed, or an object reflecting light?", "Light adds up to white. Objects subtract by absorbing.", "Example: a green leaf reflects green and soaks up the rest. Now think about yours."], [
      ["Mixing red and green light makes...", "Yellow", "Brown", "Purple"],
      ["Mixing red, green and blue light makes...", "White", "Black", "Gray"],
      ["TV screens mix light of...", "Red, green and blue", "Only black and white", "Only yellow"],
      ["Mixing lots of paint colors tends to make something...", "Dark and muddy", "Pure white", "Glowing"],
      ["A red apple looks red because it reflects ___ light.", "Red", "Blue", "All colors"],
      ["A black shirt absorbs...", "Almost all colors", "Almost no colors", "Only red"],
      ["White objects reflect...", "Most colors", "Few colors", "Only blue"],
      ["Under only blue light, a red apple looks...", "Very dark", "Bright red", "Green"],
      ["Mixing blue and green light makes...", "Cyan (blue-green)", "Yellow", "Red"]
    ]),
    les("Resonance", [
      ["Natural frequency", "🎸", "Every object has a <b>natural frequency</b> at which it likes to vibrate."],
      ["Matching pushes", "🛝", "<b>Resonance</b> happens when pushes match the natural frequency. Pushing a swing at the right times makes it go higher and higher."],
      ["Uses and dangers", "🌉", "Guitar bodies resonate to make sound louder. A singer can shatter a glass. Bridges are built to avoid dangerous resonance."]
    ], ["Think about pushing at just the right rhythm.", "Matching the natural frequency makes the vibration grow.", "Example: a child on a swing goes higher if you push each time she comes back. Now think about yours."], [
      ["Pushing a swing at just the right times makes it go higher. This is...", "Resonance", "Friction", "Reflection"],
      ["Every object has a natural...", "Frequency at which it vibrates", "Color", "Weight"],
      ["A singer can break a glass by matching its...", "Natural frequency", "Weight", "Color"],
      ["Guitar bodies are hollow so they can...", "Resonate and make the sound louder", "Cool the strings", "Hold air for later"],
      ["Soldiers break step on bridges to avoid...", "Resonance vibrations", "Magnets", "Rain"],
      ["A longer guitar string gives a ___ note.", "Lower", "Higher", "Louder"],
      ["A shorter pipe in a pan flute gives a ___ note.", "Higher", "Lower", "Quieter"],
      ["Resonance happens when the push matches the object's...", "Natural frequency", "Mass", "Shadow"]
    ]),
    les("Nuclear energy", [
      ["Splitting", "⚛️", "<b>Fission</b> splits a big nucleus, like uranium, into smaller ones and releases a lot of energy. Nuclear power stations use fission."],
      ["Joining", "☀️", "<b>Fusion</b> joins small nuclei, like hydrogen, to make bigger ones, like helium. This powers the Sun and other stars."],
      ["Safety", "🛡️", "Nuclear power gives lots of electricity with little carbon dioxide, but plants need strong safety and the used fuel must be stored carefully."]
    ], ["Fission is about splitting. Fusion is about joining.", "Power stations split atoms. Stars join them.", "Example: the Sun fuses hydrogen into helium. Now think about yours."], [
      ["Fission means splitting...", "A heavy nucleus", "Water", "Light"],
      ["Fusion means joining...", "Small nuclei together", "Large rocks", "Wires"],
      ["The Sun makes energy by...", "Fusion", "Fission", "Burning wood"],
      ["Nuclear power stations today use...", "Fission", "Fusion", "Wind"],
      ["While running, a nuclear power station gives off little...", "Carbon dioxide", "Heat", "Energy"],
      ["Used nuclear fuel needs...", "Careful, safe storage", "To be put in a stream", "Nothing special"],
      ["Uranium is used as...", "Fuel in power plants", "A phone battery", "Plant food"],
      ["In the Sun, hydrogen fuses into...", "Helium", "Iron", "Gold"]
    ]),
    les("Speed of light", [
      ["The cosmic speed limit", "💫", "Light travels about 300,000 km every second. Nothing with mass can reach that speed, and nothing goes faster."],
      ["Fast!", "🌍", "In one second light could go around Earth about 7 times."],
      ["Einstein's ideas", "🧠", "Albert Einstein showed that <b>mass and energy are linked</b>: E = mc², where c is the speed of light. Time also passes slightly slower for fast-moving travelers."]
    ], ["Think about the fastest thing in the universe.", "The speed of light is the same for everyone who measures it.", "Example: sound needs air to travel, but light does not. Now think about yours."], [
      ["Nothing with mass can go faster than...", "Light", "Sound", "A rocket"],
      ["In one second light can circle Earth about...", "7 times", "70 times", "700 times"],
      ["E = mc² links mass and...", "Energy", "Color", "Sound"],
      ["In E = mc², c stands for the speed of...", "Light", "Cold", "Charge"],
      ["Sound needs a medium, but light...", "Does not", "Needs air", "Needs water"],
      ["For someone moving near light speed, time passes...", "More slowly than for others", "Faster than for others", "Backward"],
      ["GPS satellites need clock corrections because of...", "Relativity", "Rain", "Magnets"],
      ["The speed of light in empty space is...", "The same for every observer", "Faster if you run toward it", "Slower at night"]
    ]),
    num("Energy from power", [
      ["The rule", "🔋", "<b>Energy = power x time</b>. Power is in watts (W), time in seconds (s), and energy in joules (J)."],
      ["Example", "💡", "A 60 W bulb on for 10 s uses 60 x 10 = 600 J."],
      ["Backwards", "🔁", "Time = energy / power. Power = energy / time."]
    ], () => {
      const p = pick([5, 10, 20, 40, 60, 100]), t = ri(2, 10);
      return pick([
        { text: `A ${p} W lamp is on for ${t} seconds. How much energy does it use, in joules?`, visual: "💡", answer: p * t,
          hints: ["A watt is a joule each second.", "Multiply the power by the time.", "Example: 30 W for 4 s uses 30 x 4 = 120 J. Now do yours."] },
        { text: `A ${p} W device uses ${p * t} J. For how many seconds was it on?`, visual: "⏱️", answer: t,
          hints: ["Each second it uses the same amount of energy.", "Divide the energy by the power.", "Example: 200 J at 50 W is 200 / 50 = 4 s. Now do yours."] },
        { text: `A machine uses ${p * t} J of energy in ${t} seconds. What is its power in watts?`, visual: "⚙️", answer: p,
          hints: ["Power is energy used each second.", "Divide the energy by the time.", "Example: 300 J in 6 s gives 300 / 6 = 50 W. Now do yours."] }
      ]);
    })
  ];
  c.push(
    mix("Mixed practice", at(c, [1, 2, 3, 6, 8, 10, 12, 13, 15])),
    mix("Level 12 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  Object.assign(PHYSICS_LEVELS, { 10: a, 11: b, 12: c });
})();
