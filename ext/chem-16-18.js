// ext/chem-16-18.js  Mind Lab Chemistry levels 16-18 (grade 7 second half, grade 8 both halves): number skills, matter and light, biochemistry and nuclear ideas, green chemistry and industry
(() => {
  // item = [question, right, wrong1, wrong2?, wrong3?] ("emoji§question" shows a big picture) OR a function returning an item or a full question object
  const les = (title, slides, hints, items) => {
    const make = () => {
      let it = pick(items);
      if (typeof it === "function") it = it();
      if (!Array.isArray(it)) return Object.assign({ hints }, it);
      const parts = it[0].split("§");
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
    make.slide = x => x;
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);
  const num = (text, answer, hints, visual) => ({ text, answer, hints, visual });

  // ================= LEVEL 16 =================
  const a = [];

  const sciQ = () => {
    const c = ri(2, 9), n = ri(3, 8), val = (c * Math.pow(10, n)).toLocaleString("en-US");
    return num(`<b>${c} × 10<sup>?</sup></b> = ${val}. What number goes in the exponent (the small raised number)?`, n,
      ["Look at how many places the digit has to move to make the big number.", "The exponent counts the zeros that come after the single digit.", "Example: 9 × 10<sup>?</sup> = 9,000 has three zeros after the 9, so the exponent is 3. Now do yours."], "🔬");
  };
  a.push(les("Scientific notation", [
    ["Very big and very small", "🌌", "Chemists meet huge and tiny numbers. Writing them with many zeros is slow, so we use <b>scientific notation</b>: a number from 1 to 9.99 times a power of ten."],
    ["Big numbers", "➡️", "<b>5 × 10<sup>4</sup></b> means 5 followed by four zeros: <b>50,000</b>. The exponent says how many places the decimal point moves right."],
    ["Tiny numbers", "⬅️", "A <b>negative</b> exponent means a tiny number: <b>3 × 10<sup>-2</sup> = 0.03</b>. The point moves left. The speed of light is about 3 × 10<sup>8</sup> m/s."]
  ], ["Positive exponent means a big number, negative exponent means a tiny number.", "The exponent tells you how many places the decimal point moves.", "Example: 2 × 10<sup>3</sup> = 2,000 because the point moves 3 places right. Now try yours."], [
    sciQ, sciQ, sciQ, sciQ,
    ["Which is <b>3 × 10<sup>4</sup></b> written normally?", "30,000", "3,000", "300,000", "34"],
    ["Which is <b>6 × 10<sup>-3</sup></b> written normally?", "0.006", "0.06", "6,000", "0.0006"],
    ["Which is the best way to write 0.0005?", "5 × 10<sup>-4</sup>", "5 × 10<sup>4</sup>", "5 × 10<sup>-5</sup>", "50 × 10<sup>-4</sup>"],
    ["Light travels about 300,000,000 m each second. In scientific notation that is...", "3 × 10<sup>8</sup> m", "3 × 10<sup>6</sup> m", "3 × 10<sup>9</sup> m", "30 × 10<sup>7</sup> m"],
    ["A negative exponent means the number is...", "Smaller than 1", "Bigger than 1000", "Negative", "Exactly zero"],
    ["The Sun is about 150,000,000 km away. Which is correct?", "1.5 × 10<sup>8</sup> km", "1.5 × 10<sup>7</sup> km", "15 × 10<sup>9</sup> km", "1.5 × 10<sup>-8</sup> km"]
  ]));

  a.push(les("Significant figures", [
    ["Digits that count", "🔢", "<b>Significant figures</b> (sig figs) are the digits that tell us how well we measured. A balance reading of 4.20 g has <b>3</b> sig figs."],
    ["The rules", "📏", "Digits 1-9 always count. Zeros <b>between</b> digits count (305 has 3). Zeros at the <b>start</b> do not count (0.0072 has 2). Zeros at the end <b>after a decimal point</b> do count (4.20 has 3)."],
    ["Rounding", "✂️", "To round to 3 sig figs, keep the first three counting digits and look at the next one. 3.4567 becomes <b>3.46</b> because the next digit, 6, rounds up."]
  ], ["Start counting at the first digit that is not zero.", "Zeros in the middle count, zeros at the very start never count.", "Example: 0.0560 has digits 5, 6 and the last 0 after the point, so 3 sig figs. Now count yours."], [
    ["How many sig figs are in <b>4.20</b>?", "3", "2", "4", "1"],
    ["How many sig figs are in <b>305</b>?", "3", "2", "1", "4"],
    ["How many sig figs are in <b>0.0072</b>?", "2", "4", "3", "5"],
    ["How many sig figs are in <b>12.34</b>?", "4", "3", "2", "5"],
    ["How many sig figs are in <b>0.508</b>?", "3", "4", "2", "1"],
    ["How many sig figs are in <b>7.0</b>?", "2", "1", "3", "0"],
    ["How many sig figs are in <b>0.00300</b>?", "3", "5", "1", "6"],
    ["Round <b>3.4567</b> to 3 sig figs.", "3.46", "3.45", "3.5", "3.457"],
    ["Round <b>5.678</b> to 2 sig figs.", "5.7", "5.6", "5.68", "6"],
    ["Round <b>0.04567</b> to 2 sig figs.", "0.046", "0.045", "0.0457", "0.05"]
  ]));

  const pctErrQ = () => {
    let A, d;
    do { A = pick([20, 25, 40, 50, 80, 100, 200]); d = ri(1, 12); } while (!Number.isInteger(100 * d / A) || d >= A);
    const M = Math.random() < 0.5 ? A + d : A - d, err = 100 * d / A;
    const ctx = pick([["a mass of", "g", "⚖️"], ["a volume of", "mL", "🧪"], ["a length of", "cm", "📏"]]);
    return num(`The accepted value is ${ctx[0]} <b>${A} ${ctx[1]}</b>. A student measures <b>${M} ${ctx[1]}</b>. What is the percent error? (Give the number only.)`, err,
      ["First find how far the measurement is from the accepted value, ignoring plus or minus.", "Percent error = difference ÷ accepted value × 100.", "Example: accepted 50, measured 49. Difference 1, then 1 ÷ 50 = 0.02, × 100 = 2 percent. Now do yours."], ctx[2]);
  };
  a.push(les("Percent error", [
    ["How wrong was I?", "🎯", "When you measure something, you can compare your result to the <b>accepted value</b>. <b>Percent error</b> tells you how far off you were."],
    ["The formula", "🧮", "<b>percent error = |measured − accepted| ÷ accepted × 100</b>. The bars mean: ignore the minus sign."],
    ["Small is good", "✅", "A small percent error means a careful, accurate measurement. 2% is better than 20%. Errors come from reading scales badly, loose equipment or spills."]
  ], ["Subtract the two values, then ignore the sign.", "Divide the difference by the accepted value, then times 100.", "Example: accepted 20, measured 19. Difference 1, so 1 ÷ 20 × 100 = 5 percent. Now try yours."], [
    pctErrQ, pctErrQ, pctErrQ, pctErrQ, pctErrQ, pctErrQ,
    ["Which percent error shows the most accurate measurement?", "1%", "8%", "15%", "30%"],
    ["Percent error divides the difference by the...", "Accepted value", "Measured value squared", "Number of students", "Unit"]
  ]));

  a.push(les("Diffusion", [
    ["Spreading out", "👃", "<b>Diffusion</b> is when particles spread from where there are lots of them to where there are few. You smell cookies from another room because their particles diffuse through the air."],
    ["No stirring needed", "🎨", "A drop of food colouring spreads through still water by itself. Particles are always moving and bumping, so they slowly mix."],
    ["Faster or slower", "🌡️", "Diffusion is <b>faster when it is hot</b> (particles move faster) and faster in gases than in liquids, because gas particles are far apart and free."]
  ], ["Particles move from a crowded place to an empty place.", "Faster particles diffuse faster. What does heat do to particle speed?", "Example: perfume sprayed in a corner reaches the far wall because particles drift from many to few. Now try yours."], [
    ["Diffusion is the movement of particles from...", "Where there are many to where there are few", "Where there are few to where there are many", "Cold places to hot places only", "The top to the bottom only"],
    ["Why can you smell baking from another room?", "Scent particles diffuse through the air", "The smell is a solid that rolls", "Air stops moving", "Light carries it"],
    ["Food colouring spreads fastest in...", "Hot water", "Cold water", "Ice", "A solid block"],
    ["Which state of matter has the fastest diffusion?", "Gas", "Liquid", "Solid", "They are all equal"],
    ["Does diffusion need stirring?", "No, particles move by themselves", "Yes, always", "Only in gases", "Only in the dark"],
    ["A drop of ink in still water slowly turns the whole glass pale. This shows...", "Diffusion", "Evaporation", "Freezing", "Rusting"],
    ["Why is diffusion slow in a solid?", "Particles are packed tightly and only vibrate", "Solids have no particles", "Solids are always cold", "Particles are too big to exist"],
    ["Heating a liquid makes diffusion...", "Faster", "Slower", "Stop", "Reverse direction"]
  ]));

  a.push(les("Surface tension", [
    ["A skin on water", "🪲", "Water particles pull on each other. At the top surface they pull sideways and inward, making a stretchy 'skin'. This is <b>surface tension</b>."],
    ["Round drops", "💧", "Surface tension pulls a drop into a round bead. It also lets a water strider insect walk on a pond and a careful needle float on water."],
    ["Soap breaks it", "🧼", "Soap and detergent <b>lower</b> surface tension. A needle that floats will sink if soap is added, and soapy water spreads out flat instead of beading."]
  ], ["Think about what pulls water particles together.", "Soap changes how strongly the surface particles hold each other.", "Example: a paper clip floats on clean water, then sinks when soap touches the water because the surface skin weakens. Now try yours."], [
    ["Surface tension is caused by...", "Water particles pulling on each other", "Gravity switching off", "Salt in the water", "Light shining on water"],
    ["Which insect can walk on a pond because of surface tension?", "A water strider", "A butterfly", "An earthworm", "A bee"],
    ["Why do small drops of water form round beads?", "Surface tension pulls them into a ball", "They are frozen", "They are heavy", "They are made of glass"],
    ["What does soap do to the surface tension of water?", "Lowers it", "Raises it", "Nothing", "Makes it magnetic"],
    ["A needle floats on clean water. What happens after a drop of soap is added?", "It sinks", "It floats higher", "It turns green", "It melts"],
    ["Which liquid usually has a stronger surface tension?", "Plain water", "Soapy water", "Water with lots of detergent", "They are all the same"],
    ["Why do raindrops on a waxy leaf form beads?", "Surface tension holds the water together", "The leaf is magnetic", "The water is hot", "Wax dissolves water"],
    ["A bubble is round because...", "Surface tension pulls the soap film into the smallest surface", "Air has corners", "Soap is a solid", "It is made of ice"]
  ]));

  a.push(les("Viscosity", [
    ["Thick or runny", "🍯", "<b>Viscosity</b> measures how much a liquid resists flowing. Honey has <b>high viscosity</b> (thick and slow). Water has <b>low viscosity</b> (runny)."],
    ["Heat changes it", "🔥", "Warm honey pours more easily than cold honey. For most liquids, <b>heating lowers viscosity</b> because the particles move faster and slip past each other."],
    ["Why it matters", "🚗", "Engines use oils with the right viscosity so parts slide smoothly. Too thick in winter and the oil will not flow; too thin and it will not protect."]
  ], ["High viscosity means a liquid flows slowly.", "What does warming a liquid do to how easily its particles slide?", "Example: syrup from a cold fridge pours slowly, but warm syrup pours faster, so heating lowers viscosity. Now try yours."], [
    ["Which liquid has the highest viscosity?", "Honey", "Water", "Milk", "Juice"],
    ["Which liquid has the lowest viscosity?", "Water", "Honey", "Syrup", "Shampoo"],
    ["What does viscosity measure?", "How much a liquid resists flowing", "How hot it is", "How heavy it is", "How acidic it is"],
    ["Warming honey makes it...", "Flow more easily", "Flow less easily", "Turn solid", "Turn into a gas"],
    ["Cold cooking oil poured from a fridge is usually...", "Thicker than warm oil", "Thinner than warm oil", "Exactly the same", "A gas"],
    ["A marble falls fastest through...", "Water", "Honey", "Syrup", "Thick shampoo"],
    ["Which words fit a high viscosity liquid?", "Thick and slow", "Thin and fast", "Hot and fast", "Light and bubbly"],
    ["Why do engines need oil of the right viscosity?", "So parts slide smoothly", "To make the engine colder than ice", "To make it louder", "To add sugar"]
  ]));

  a.push(les("Capillary action", [
    ["Climbing water", "🧻", "Dip the corner of a paper towel in water and the water <b>climbs up</b>, even against gravity. This is <b>capillary action</b>."],
    ["Two pulls", "🧲", "Water particles stick to the walls (<b>adhesion</b>) and to each other (<b>cohesion</b>). Together these pull water up narrow gaps."],
    ["In nature", "🌱", "Capillary action helps water move up plant stems and soil to roots. In a thinner tube, water climbs <b>higher</b>."]
  ], ["Think about water sticking to a surface and to itself.", "Narrow spaces make the pulling forces matter more.", "Example: water climbs higher in a thin straw than in a wide glass, so thin tubes lift it more. Now try yours."], [
    ["Water rising up a paper towel is called...", "Capillary action", "Evaporation", "Condensation", "Rusting"],
    ["Water particles sticking to other water particles is called...", "Cohesion", "Adhesion", "Fusion", "Neutralisation"],
    ["Water particles sticking to the wall of a tube is called...", "Adhesion", "Cohesion", "Diffusion", "Combustion"],
    ["In which tube does water climb highest?", "A very thin tube", "A medium tube", "A wide tube", "It is the same in all"],
    ["Which of these uses capillary action?", "A plant drawing water up its stem", "A ball rolling down a hill", "A fire burning wood", "Ice melting"],
    ["A paper towel soaks up a spill because water...", "Climbs the tiny gaps between fibres", "Disappears into space", "Turns into paper", "Freezes"],
    ["Celery stalk standing in coloured water slowly becomes coloured. This shows...", "Water moving up narrow tubes", "Colour creating water", "Celery melting", "A chemical explosion"],
    ["Capillary action works against...", "Gravity", "Heat", "Time", "Colour"]
  ]));

  a.push(les("Colloids and the Tyndall effect", [
    ["In between mixtures", "🥛", "In a <b>solution</b> (salt water) the particles are tiny. In a <b>suspension</b> (muddy water) they are big and settle. A <b>colloid</b> is in between: milk, fog and jelly."],
    ["Colloids do not settle", "🌫️", "Colloid particles are too small to sink, but big enough to <b>scatter light</b>. Shine a torch through milk and you can see the beam."],
    ["Tyndall effect", "🔦", "Seeing a light beam in a mixture is the <b>Tyndall effect</b>. A true solution such as salt water does <b>not</b> show a beam. This is a test to tell them apart."]
  ], ["Think about particle size: tiny, medium or big.", "Which kind of mixture shows a beam of light?", "Example: a torch beam shows in foggy air but not in clear air, so fog is a colloid. Now try yours."], [
    ["Which of these is a colloid?", "Milk", "Salt water", "Sugar water", "Clear tea"],
    ["Which mixture would NOT show a light beam?", "Salt dissolved in water", "Milk", "Fog", "Jelly"],
    ["Seeing a beam of light pass through a mixture is called the...", "Tyndall effect", "Doppler effect", "Greenhouse effect", "Haber process"],
    ["Muddy water is a...", "Suspension", "Solution", "Pure substance", "Element"],
    ["Colloid particles...", "Do not settle out", "Always sink quickly", "Are atoms of one element", "Are invisible gases only"],
    ["A suspension left standing will...", "Settle into layers", "Stay mixed forever", "Turn into a gas", "Become a solid"],
    ["Which is a colloid made of gas in a liquid?", "Whipped cream", "Salt water", "Rock", "Pure water"],
    ["Torch shone through clear sugar water shows...", "No visible beam", "A bright beam", "A red beam", "A sound"]
  ]));

  a.push(les("Emulsions and emulsifiers", [
    ["Oil and water", "🥗", "Oil and water do not mix. An <b>emulsion</b> is tiny drops of one liquid spread through another. Milk, mayonnaise and salad dressing are emulsions."],
    ["Emulsifiers", "🥚", "An <b>emulsifier</b> keeps an emulsion from separating. One end of its molecule loves water, the other end loves oil. Egg yolk in mayonnaise and soap both do this job."],
    ["Foams", "🍦", "A <b>foam</b> is gas bubbles trapped in a liquid or solid: whipped cream, bubble bath, bread. Shaking a vinaigrette makes a short-lived emulsion that separates again."]
  ], ["Think about two liquids that do not like each other.", "Which helper has one end that likes water and one that likes oil?", "Example: egg yolk helps oil and vinegar stay mixed in mayonnaise, so it is an emulsifier. Now try yours."], [
    ["What is an emulsion?", "Tiny drops of one liquid spread in another", "A solid dissolved in water", "A pure gas", "A metal alloy"],
    ["Which of these is an emulsion?", "Milk", "Salt water", "A rock", "Pure oxygen"],
    ["What does an emulsifier do?", "Keeps oil and water mixed", "Makes water boil", "Turns oil into gas", "Makes things heavier"],
    ["Which ingredient in mayonnaise is an emulsifier?", "Egg yolk", "Oil", "Vinegar", "Salt"],
    ["Why does a salad dressing separate when left on the shelf?", "Oil and water do not stay mixed without an emulsifier", "The oil evaporates fast", "The jar is too heavy", "Gravity stops working"],
    ["Whipped cream is a...", "Foam", "Pure liquid", "Metal", "Solution"],
    ["One end of an emulsifier molecule likes ____ and the other likes oil.", "Water", "Metal", "Salt", "Glass"],
    ["Soap cleans greasy dishes because it works like...", "An emulsifier", "A magnet", "A fuel", "A plastic"]
  ]));

  a.push(les("Non-Newtonian fluids", [
    ["Odd liquids", "🥄", "Water and oil keep the same viscosity however you push them. Some strange liquids do not. They are called <b>non-Newtonian fluids</b>."],
    ["Oobleck", "🌽", "Mix cornflour (cornstarch) with water. Press it quickly and it feels <b>hard</b>. Let your hand sink slowly and it <b>flows</b>. The harder you push, the thicker it gets."],
    ["Runnier when pushed", "🍅", "Ketchup and paint go the other way: shake or brush them and they get <b>runnier</b>. That is why ketchup comes out suddenly after a good shake."]
  ], ["Ordinary liquids keep the same thickness. These ones change when you push or stir them.", "Think about pressing fast versus slowly.", "Example: ketchup is stuck in the bottle, but a good shake makes it flow, so it gets runnier when pushed. Now try yours."], [
    ["A mixture of cornflour and water is called...", "Oobleck", "Brine", "Alloy", "Bleach"],
    ["Oobleck feels hard when you...", "Hit or squeeze it fast", "Leave it still", "Heat it to boiling", "Add more water to it"],
    ["Oobleck flows when you...", "Let your hand sink slowly", "Punch it", "Jump on it fast", "Stir it very quickly"],
    ["Ketchup gets runnier when you...", "Shake it", "Leave it", "Freeze it", "Add flour"],
    ["Which is an ordinary (Newtonian) liquid?", "Water", "Oobleck", "Ketchup", "Non-drip paint"],
    ["Non-Newtonian fluids...", "Change thickness when pushed or stirred", "Never flow", "Are always gases", "Only exist in space"],
    ["Which ingredient makes oobleck?", "Cornflour (cornstarch)", "Iron filings", "Baking soda only", "Pure salt"],
    ["Why is wet quicksand hard to pull out of quickly?", "Quick force makes it stiffer", "It is made of glue", "It is a solid block", "It is frozen"]
  ]));

  a.push(les("Sublimation and deposition", [
    ["Skipping the liquid", "🧊", "Most things melt before they boil. But <b>dry ice</b> (solid carbon dioxide) turns straight from solid to gas. This is <b>sublimation</b>."],
    ["Gas to solid", "❄️", "The opposite is <b>deposition</b>: a gas turns straight into a solid. Frost on a cold window forms when water vapour freezes directly onto the glass."],
    ["Everyday sublimation", "🥬", "Freeze-dried food loses its ice by sublimation. Snow can slowly vanish on a cold, sunny, dry day without melting. Dry ice is very cold (about −78 °C), so adults handle it with gloves."]
  ], ["Which two states does the change skip over?", "Name the change from the starting state to the ending state.", "Example: frost forms when water vapour goes straight to ice, so gas to solid. Now try yours."], [
    ["Solid turning straight into gas is called...", "Sublimation", "Deposition", "Melting", "Condensation"],
    ["Gas turning straight into solid is called...", "Deposition", "Sublimation", "Boiling", "Freezing"],
    ["Which substance is the solid form of carbon dioxide?", "Dry ice", "Table salt", "Baking soda", "Ice cubes"],
    ["Frost on a cold window forms by...", "Deposition", "Sublimation", "Evaporation", "Melting"],
    ["Which one skips the liquid state?", "Dry ice turning to gas", "Ice melting to water", "Water boiling", "Steam condensing on a lid"],
    ["Why should dry ice only be handled with gloves by adults?", "It is extremely cold", "It is sticky", "It is very hot", "It glows"],
    ["Freeze-dried foods are dried when ice turns to vapour by...", "Sublimation", "Deposition", "Diffusion", "Rusting"],
    ["Which change is the reverse of sublimation?", "Deposition", "Melting", "Freezing", "Boiling"]
  ]));

  a.push(les("Crystals and crystal growth", [
    ["Neat patterns", "💎", "In a <b>crystal</b>, particles sit in a neat repeating pattern. Table salt makes little cubes. Snowflakes always have six sides."],
    ["Growing crystals", "🍬", "Make a saturated solution of sugar in hot water and let it cool. Sugar particles leave the water and build onto a string, making <b>rock candy</b>. A tiny <b>seed crystal</b> gives them a start."],
    ["Slow is big", "⏳", "<b>Slow cooling</b> gives big, well-shaped crystals. <b>Fast cooling</b> gives lots of tiny crystals. Glass has no pattern at all, so it is not a crystal."]
  ], ["Think about particles in a neat repeating pattern.", "Which gives particles more time to line up, slow or fast cooling?", "Example: a lava that cools slowly makes big crystals, while a fast cool makes tiny ones. Now try yours."], [
    ["In a crystal, particles are arranged...", "In a repeating pattern", "At random", "As a gas", "In a line that moves"],
    ["Table salt crystals are shaped like...", "Cubes", "Stars", "Spheres", "Needles"],
    ["How many sides does a snowflake usually have?", "Six", "Four", "Eight", "Three"],
    ["How do you get BIG crystals?", "Cool the solution slowly", "Cool it very fast", "Shake it hard", "Boil it away at once"],
    ["A tiny crystal added to help others grow is a...", "Seed crystal", "Filter", "Catalyst", "Solvent"],
    ["Rock candy is made of crystals of...", "Sugar", "Salt", "Plastic", "Glass"],
    ["Fast cooling of a hot saturated solution gives...", "Many tiny crystals", "One giant crystal", "A gas", "No change at all"],
    ["Which does NOT have a repeating crystal pattern?", "Glass", "Salt", "Sugar", "Ice"]
  ]));

  a.push(les("Freezing point and salt", [
    ["Salt lowers freezing", "🧂", "Pure water freezes at <b>0 °C</b>. Salty water needs to be <b>colder</b> to freeze. Sea water freezes at about −2 °C. Salt <b>lowers the freezing point</b>."],
    ["Icy roads", "🛣️", "Roads are spread with salt in winter. The salt dissolves in the thin film of water and stops it from freezing, so the ice melts or does not form until it is much colder."],
    ["More uses", "🍨", "Ice and salt make a mix colder than 0 °C, used for making ice cream. Car <b>antifreeze</b> also lowers the freezing point (and raises the boiling point) of the water in the engine."]
  ], ["Does adding salt make freezing easier or harder?", "Think about why salty sea water freezes later than a pond.", "Example: a puddle that normally freezes at 0 °C stays liquid longer when salted. Now try yours."], [
    ["Pure water freezes at...", "0 °C", "5 °C", "20 °C", "100 °C"],
    ["Adding salt to water makes its freezing point...", "Lower", "Higher", "The same", "Impossible to measure"],
    ["Why is salt spread on icy roads?", "It stops water freezing until it is colder", "It makes ice hotter in the sun", "It makes cars stick", "It makes roads shiny"],
    ["Sea water freezes at about...", "−2 °C", "0 °C exactly", "5 °C", "100 °C"],
    ["Antifreeze in a car engine...", "Lowers the freezing point of the liquid", "Makes it burn", "Makes it sweeter", "Turns it to gas"],
    ["Which freezes at a lower temperature?", "Salt water", "Pure water", "Both the same", "Neither freezes"],
    ["Ice mixed with salt can be...", "Colder than 0 °C", "Always exactly 0 °C", "Hotter than boiling water", "Dry"],
    ["Compared with a freshwater pond, the sea freezes...", "Later and at lower temperatures", "Earlier", "Never melts", "In the same way"]
  ]));

  a.push(les("Plasma", [
    ["The fourth state", "⚡", "Solid, liquid and gas are three states of matter. Heat a gas enough and its atoms lose electrons. The mix of charged particles is the fourth state: <b>plasma</b>."],
    ["Plasma is everywhere", "☀️", "The Sun and stars are huge balls of plasma. Lightning, auroras and neon signs are plasma too. Most of the visible universe is plasma."],
    ["Plasma properties", "🔌", "Plasma <b>glows</b>, conducts electricity and reacts to magnets. A neon sign glows when electricity turns gas inside into plasma."]
  ], ["The first three states are solid, liquid and gas.", "Plasma has charged particles: ions and free electrons.", "Example: lightning heats air so much it glows, which shows air becoming a plasma. Now try yours."], [
    ["Which is the fourth state of matter?", "Plasma", "Foam", "Jelly", "Dust"],
    ["Plasma is made of...", "Charged particles (ions and electrons)", "Only solid blocks", "Only water drops", "Only neutral gas"],
    ["Which of these is mostly plasma?", "The Sun", "A rock", "Ice cream", "A glass of water"],
    ["A neon sign glows because the gas inside becomes...", "Plasma", "Solid", "Liquid", "A metal"],
    ["Which natural display is a plasma?", "Lightning", "A rainbow", "A cloud of dust", "A shadow"],
    ["Plasma conducts electricity.", "True", "False", "Only when frozen", "Only in water"],
    ["How do you turn a gas into plasma?", "Heat it a lot or give it lots of electrical energy", "Freeze it", "Shake it", "Add sugar"],
    ["What are stars mostly made of?", "Plasma", "Solid rock", "Liquid water", "Metal bars"]
  ]));

  a.push(les("Flame tests and fireworks", [
    ["Colourful flames", "🎆", "Some metal ions give a flame a special <b>colour</b>. A teacher can use a clean wire and a tiny sample to see it. Sodium: <b>yellow-orange</b>. Copper: <b>blue-green</b>. Potassium: <b>lilac</b>. Lithium: <b>red</b>."],
    ["Why colour?", "💡", "Heat lifts the electrons in a metal ion to higher energy. When they drop back down they give out light of a certain colour. Each metal gives its own colour."],
    ["Fireworks", "🧨", "Fireworks use the same idea. Metal compounds inside make the colours: strontium red, copper blue, barium green, sodium yellow. Fireworks are only for trained adults."]
  ], ["Each metal ion has its own flame colour.", "Match the metal to the colour in the lesson.", "Example: sodium gives a bright yellow-orange flame. Now try yours."], [
    ["Sodium gives a flame that is...", "Yellow-orange", "Lilac", "Blue-green", "White"],
    ["Copper gives a flame that is...", "Blue-green", "Yellow-orange", "Red", "Lilac"],
    ["Potassium gives a flame that is...", "Lilac", "Yellow-orange", "Green", "Black"],
    ["Lithium gives a flame that is...", "Red", "Lilac", "Blue-green", "Yellow"],
    ["Which metal gives green colours in fireworks?", "Barium", "Strontium", "Sodium", "Lithium"],
    ["Which metal gives red colours in fireworks?", "Strontium", "Barium", "Copper", "Sodium"],
    ["The colour of the flame comes from...", "Electrons dropping and releasing light", "Water boiling", "Rust forming", "Gravity"],
    ["A flame test helps a chemist to...", "Identify which metal ion is present", "Measure the weight of water", "Change lead into gold", "Find pH"]
  ]));

  a.push(les("Light and colour", [
    ["White light", "🌈", "Sunlight looks white but is a mix of all colours. A prism or raindrop splits it into the rainbow: red, orange, yellow, green, blue, indigo, violet."],
    ["Why things have colour", "🍎", "A red apple <b>absorbs</b> most colours and <b>reflects</b> red light to your eye. A white shirt reflects all colours. A black shirt absorbs nearly all of them, so it heats up in the sun."],
    ["Mixing light", "🔦", "The primary colours of <b>light</b> are red, green and blue. Red + green make <b>yellow</b>. Red + blue make magenta. Green + blue make cyan. All three make <b>white</b>."]
  ], ["Colour you see is the colour that gets reflected.", "Which colours does the object bounce back to your eye?", "Example: a green leaf reflects green and absorbs most other colours. Now try yours."], [
    ["A red apple looks red because it...", "Reflects red light", "Absorbs red light only", "Makes its own light", "Reflects all colours"],
    ["A white shirt...", "Reflects all colours", "Absorbs all colours", "Reflects only blue", "Makes its own light"],
    ["A black shirt...", "Absorbs nearly all colours", "Reflects all colours", "Reflects only red", "Glows in the dark"],
    ["Red light plus green light makes...", "Yellow", "Blue", "Purple", "Brown"],
    ["Red, green and blue light together make...", "White", "Black", "Brown", "Grey"],
    ["What splits white light into a rainbow?", "A prism", "A mirror", "A magnet", "A filter that is black"],
    ["Green + blue light makes...", "Cyan", "Yellow", "Red", "White"],
    ["Why does a black shirt feel hot in the sun?", "It absorbs the light energy", "It reflects all the light", "It makes cold", "It is made of metal"]
  ]));

  a.push(les("Fluorescence and glow", [
    ["Light from light", "🔦", "A <b>fluorescent</b> material absorbs invisible <b>ultraviolet (UV)</b> light and sends out visible light. Highlighter ink glows bright under a UV lamp. It stops glowing when the lamp is off."],
    ["Glow-in-the-dark", "🌟", "<b>Phosphorescent</b> materials store light energy and glow slowly for minutes or hours afterwards. Stickers on a ceiling are an example."],
    ["Cold light", "🧪", "A glow stick glows because of a <b>chemical reaction</b> (chemiluminescence). Fireflies make light inside their bodies too (bioluminescence). All give off light with very little heat."]
  ], ["Which one stops glowing as soon as the lamp is off?", "Which one makes light from a chemical reaction?", "Example: a firefly makes its own light inside its body, so that is bioluminescence. Now try yours."], [
    ["A fluorescent material glows when it absorbs...", "Ultraviolet light", "Sound", "Cold", "Magnets"],
    ["Fluorescent glow...", "Stops when the UV lamp is switched off", "Lasts all night", "Needs a battery inside", "Makes things hot"],
    ["Glow-in-the-dark stickers are...", "Phosphorescent", "Magnetic", "Acidic", "Metallic"],
    ["A glow stick makes light by...", "A chemical reaction", "Sunlight only", "Burning a flame", "A tiny bulb"],
    ["Light made by living things such as fireflies is...", "Bioluminescence", "Chemical rust", "Reflection", "Refraction"],
    ["Which glows for a long time after the light goes off?", "A phosphorescent sticker", "Highlighter under a UV lamp", "A mirror", "A white shirt"],
    ["A glow stick is called 'cold light' because it makes...", "Light with very little heat", "Ice", "Snow", "Freezing"],
    ["Which of these is bioluminescent?", "A firefly", "A rock", "A glass", "The Moon"]
  ]));

  a.push(les("Mohs hardness", [
    ["Scratch test", "⛏️", "Geologists test minerals by scratching. A harder mineral scratches a softer one. The <b>Mohs scale</b> goes from <b>1 (talc, very soft)</b> to <b>10 (diamond, the hardest)</b>."],
    ["The scale", "📊", "Some points on the scale: talc 1, gypsum 2, calcite 3, fluorite 4, apatite 5, feldspar 6, <b>quartz 7</b>, topaz 8, corundum 9, diamond 10."],
    ["Everyday tools", "🪙", "A fingernail is about 2.5, a copper coin about 3 and a steel knife about 5.5. So a fingernail can scratch gypsum but not calcite. Hardness is not the same as being unbreakable."]
  ], ["The bigger the Mohs number, the harder the mineral.", "A harder mineral can scratch a softer one, not the other way round.", "Example: quartz (7) scratches calcite (3), but calcite cannot scratch quartz. Now try yours."], [
    ["Which mineral is hardest on the Mohs scale?", "Diamond", "Talc", "Quartz", "Calcite"],
    ["Which mineral is softest on the Mohs scale?", "Talc", "Quartz", "Diamond", "Topaz"],
    ["Which mineral has Mohs hardness 7?", "Quartz", "Gypsum", "Talc", "Diamond"],
    ["Can quartz scratch calcite?", "Yes, it is harder", "No, it is softer", "Only when wet", "Only in the dark"],
    ["A fingernail (about 2.5) can scratch...", "Gypsum (2)", "Quartz (7)", "Topaz (8)", "Diamond (10)"],
    ["A copper coin (about 3) cannot scratch...", "Quartz", "Talc", "Gypsum", "A pencil line"],
    ["The Mohs scale ranks minerals by their...", "Scratch hardness", "Colour", "Weight", "Price"],
    ["Which is the second hardest in the list: topaz 8, corundum 9, diamond 10?", "Corundum", "Topaz", "Diamond", "Talc"]
  ]));

  a.push(mix("Mixed practice", at(a, [0, 1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 15, 17])));
  a.push(mix("Level 16 Challenge", at(a, [2, 3, 5, 8, 10, 12, 13, 15, 16, 17, 1, 0])));

  // ================= LEVEL 17 =================
  const b = [];

  b.push(les("Forms of carbon", [
    ["Same atom, different shape", "💎", "<b>Allotropes</b> are different forms of the same element. Diamond, graphite, graphene and fullerenes are all pure <b>carbon</b>, but their atoms are joined differently."],
    ["Diamond and graphite", "✏️", "In <b>diamond</b> each carbon bonds to 4 others in a rigid 3D net: the hardest natural material. In <b>graphite</b> carbon sits in flat layers that slide over each other, so pencil 'lead' is soft and it conducts electricity."],
    ["New carbon", "⚽", "<b>Graphene</b> is a single layer of graphite, only one atom thick, strong and a good conductor. <b>Fullerenes</b> are hollow balls: C<sub>60</sub> has 60 carbon atoms and looks like a football. <b>Nanotubes</b> are rolled-up graphene."]
  ], ["Think about how the carbon atoms are joined together in each form.", "Layers that slide are soft. A rigid net is hard.", "Example: graphite slides in layers so it is soft enough to write with. Now try yours."], [
    ["Different forms of the same element are called...", "Allotropes", "Isotopes", "Alloys", "Compounds"],
    ["Which form of carbon is hardest?", "Diamond", "Graphite", "Graphene", "Soot"],
    ["Why is graphite soft and slippery?", "Its layers slide over each other", "It has no carbon", "It is a liquid", "Its atoms are in a ball"],
    ["Which form of carbon is a single layer of atoms?", "Graphene", "Diamond", "Coal", "C60"],
    ["C<sub>60</sub> has how many carbon atoms?", "60", "6", "600", "12"],
    ["What shape is a C<sub>60</sub> fullerene?", "A hollow ball like a football", "A flat sheet", "A cube", "A straight line"],
    ["Which carbon form conducts electricity?", "Graphite", "Diamond", "Both do equally", "Neither"],
    ["A nanotube is like...", "A rolled-up sheet of graphene", "A block of diamond", "A cloud of gas", "A piece of rubber"]
  ]));

  b.push(les("Carbohydrates", [
    ["Sugars and starches", "🍞", "<b>Carbohydrates</b> are made of carbon, hydrogen and oxygen. The simplest ones are <b>sugars</b> such as glucose, C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>. They give quick energy."],
    ["Long chains", "⛓️", "<b>Starch</b> is a long chain of many glucose units (potatoes, rice, bread). <b>Cellulose</b> is another glucose chain that makes plant cell walls strong. Humans cannot digest cellulose, but it works as fibre."],
    ["Table sugar", "🍬", "Table sugar is <b>sucrose</b>, made of one glucose joined to one fructose. In digestion, enzymes break starch down into glucose, which the blood carries to cells."]
  ], ["Carbohydrates contain carbon, hydrogen and oxygen.", "Starch is built from lots of the same small unit joined in a chain.", "Example: a potato stores energy as starch, a chain of glucose units. Now try yours."], [
    ["Which three elements are in carbohydrates?", "Carbon, hydrogen and oxygen", "Iron, sulfur and neon", "Helium, lead and gold", "Calcium, chlorine and zinc"],
    ["What is glucose?", "A simple sugar", "A metal", "A noble gas", "A plastic"],
    ["Starch is a chain of many...", "Glucose units", "Iron atoms", "Water drops", "Salt crystals"],
    ["Which carbohydrate makes plant cell walls strong?", "Cellulose", "Glucose", "Sucrose", "Fat"],
    ["Which is the main sugar in the blood?", "Glucose", "Sucrose", "Starch", "Cellulose"],
    ["Table sugar is called...", "Sucrose", "Glucose", "Starch", "Protein"],
    ["Which of these foods is rich in starch?", "Rice", "Olive oil", "Water", "Salt"],
    ["Fibre, which humans cannot digest, is mostly...", "Cellulose", "Glucose", "Oil", "Iron"]
  ]));

  b.push(les("Proteins and amino acids", [
    ["Building blocks", "🥚", "<b>Proteins</b> are long chains made of small units called <b>amino acids</b>. There are 20 common amino acids, and they contain nitrogen as well as carbon, hydrogen and oxygen."],
    ["Shape is job", "🧬", "A chain folds into a special 3D shape, and the shape decides what the protein does. <b>Enzymes</b> are proteins. So are muscle, hair, nails and the haemoglobin that carries oxygen in blood."],
    ["Cooking changes them", "🍳", "Heat can unfold a protein. This is why a clear egg white turns white and solid when cooked. Good food sources: eggs, fish, beans, nuts and milk."]
  ], ["Proteins are chains. What are the small units called?", "Folded shape decides the job.", "Example: an egg white becomes solid when heated because the protein chains unfold and tangle. Now try yours."], [
    ["Proteins are made of...", "Amino acids", "Sugars", "Fatty acids only", "Metals"],
    ["How many common amino acids make proteins?", "20", "2", "200", "5"],
    ["Which element is found in proteins but not in simple sugars?", "Nitrogen", "Gold", "Neon", "Chlorine"],
    ["Enzymes are made of...", "Protein", "Pure sugar", "Pure metal", "Salt"],
    ["Why does a protein's shape matter?", "It decides what the protein can do", "It makes the protein shiny", "It makes it a gas", "It has no effect"],
    ["Which of these is a good source of protein?", "Eggs", "Sugar", "Butter only", "Water"],
    ["An egg white turns solid when cooked because heat...", "Unfolds the protein chains", "Adds salt", "Freezes it", "Makes it a metal"],
    ["Haemoglobin is a protein that carries...", "Oxygen", "Sugar", "Iron nails", "Starch"]
  ]));

  b.push(les("Fats and oils", [
    ["Energy stores", "🧈", "<b>Fats and oils</b> are made of glycerol joined to three <b>fatty acids</b>. They store a lot of energy: more than twice as much per gram as carbohydrates."],
    ["Solid or liquid", "🫒", "At room temperature, fats such as butter are solid and oils such as olive oil are liquid. Oils have <b>C=C double bonds</b> that bend the chains (unsaturated). Fats usually have single bonds only (saturated)."],
    ["Uses", "🛡️", "Fats cushion organs, keep animals warm and help us absorb vitamins A, D, E and K. Oils and fats do not dissolve in water, which is why soap is needed to clean them."]
  ], ["Fats and oils are made from fatty acids.", "C=C double bonds bend the chains so they cannot pack tightly.", "Example: butter is solid because its chains pack together, olive oil is liquid because its bent chains cannot. Now try yours."], [
    ["Fats and oils are made from glycerol and...", "Fatty acids", "Amino acids", "Glucose", "Salt"],
    ["Which stores more energy per gram?", "Fat", "Carbohydrate", "Water", "Fibre"],
    ["Which one is liquid at room temperature?", "Olive oil", "Butter", "Lard", "Candle wax"],
    ["Unsaturated fats have...", "C=C double bonds", "No carbon", "Only metals", "Only nitrogen"],
    ["Saturated fats usually have...", "Only single bonds between carbons", "Many double bonds", "No hydrogen", "Only oxygen"],
    ["Fats do NOT dissolve in...", "Water", "Oil", "Grease", "Fat"],
    ["Which vitamin needs fat to be absorbed?", "Vitamin A", "Vitamin C", "Sodium", "Chlorine"],
    ["Why does the body store fat?", "As an energy reserve and for cushioning and warmth", "To make iron", "To make water", "To make oxygen"]
  ]));

  b.push(les("Vitamins and minerals", [
    ["Small but vital", "🍊", "<b>Vitamins</b> are carbon compounds our bodies need in tiny amounts. <b>Minerals</b> are elements, like calcium and iron, that we need too."],
    ["What they do", "🦴", "<b>Vitamin C</b> (citrus fruits) keeps skin and gums healthy; without it people get scurvy. <b>Vitamin D</b> (sunlight, fish, eggs) helps bones absorb calcium. <b>Vitamin A</b> (carrots) helps eyes."],
    ["Minerals", "🩸", "<b>Calcium</b> builds bones and teeth. <b>Iron</b> makes haemoglobin in red blood cells. <b>Iodine</b> helps the thyroid gland. A mix of foods usually gives all we need."]
  ], ["Vitamins are compounds, minerals are elements.", "Match the nutrient to the body part it helps.", "Example: calcium builds bones, which is why milk is called good for teeth. Now try yours."], [
    ["Which vitamin is found in citrus fruits?", "Vitamin C", "Vitamin D", "Vitamin K", "Vitamin B12"],
    ["Which mineral builds strong bones and teeth?", "Calcium", "Iron", "Iodine", "Sodium"],
    ["Which mineral helps make haemoglobin in blood?", "Iron", "Calcium", "Neon", "Gold"],
    ["Which vitamin can your skin make from sunlight?", "Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B12"],
    ["Lacking vitamin C can cause...", "Scurvy", "Rust", "Sunburn", "Hiccups"],
    ["Which vitamin helps your eyes and is in carrots?", "Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    ["Minerals in food are...", "Elements", "Compounds of amino acids", "Gases only", "Fats"],
    ["We need vitamins in...", "Tiny amounts", "Huge amounts", "No amount", "Only as medicine"]
  ]));

  b.push(les("Stomach acid and antacids", [
    ["Acid in the stomach", "🫃", "The stomach makes <b>hydrochloric acid</b>, giving it a pH of about 2. This strong acid kills many germs and helps the enzyme pepsin break up proteins."],
    ["Protection", "🛡️", "The stomach wall is coated with a layer of mucus, so the acid does not harm it. When stomach acid goes where it should not be, we feel heartburn."],
    ["Antacids", "💊", "<b>Antacids</b> are bases like magnesium hydroxide and calcium carbonate. They <b>neutralise</b> some acid. (A parent or doctor decides about medicines. Never take them on your own.)"]
  ], ["Acids have low pH. Bases cancel acids.", "Neutralisation turns acid and base into salt and water.", "Example: a base added to an acid raises its pH toward 7. Now try yours."], [
    ["Which acid is made in the stomach?", "Hydrochloric acid", "Sulfuric acid", "Citric acid", "Vinegar"],
    ["The pH of stomach acid is about...", "2", "7", "11", "14"],
    ["What protects the stomach wall from acid?", "A layer of mucus", "A layer of metal", "Sugar", "Water only"],
    ["Antacids are...", "Bases", "Strong acids", "Metals", "Gases"],
    ["An antacid does what to stomach acid?", "Neutralises some of it", "Makes it stronger", "Freezes it", "Turns it red"],
    ["Which enzyme works best in stomach acid?", "Pepsin", "Amylase", "Cellulose", "Glucose"],
    ["After an antacid, the stomach's pH moves...", "Closer to 7", "Toward 0", "To exactly 14", "Nowhere"],
    ["Stomach acid helps by...", "Killing many germs and helping digestion", "Making bones", "Making oxygen", "Making vitamins from nothing"]
  ]));

  b.push(les("Respiration", [
    ["Releasing energy", "🏃", "Every living cell does <b>respiration</b> to release energy from food. The equation: <b>glucose + oxygen → carbon dioxide + water + energy</b>."],
    ["With atoms", "⚗️", "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6CO<sub>2</sub> + 6H<sub>2</sub>O. It is like slow burning, but controlled in cells. It is almost the <b>reverse</b> of photosynthesis."],
    ["No oxygen?", "💪", "In hard exercise, muscles may run short of oxygen. They use <b>anaerobic respiration</b>, which makes <b>lactic acid</b> and less energy. Breathing out removes the carbon dioxide."]
  ], ["Respiration releases energy from glucose.", "Compare it with photosynthesis: it uses what that makes.", "Example: in a cell glucose and oxygen react, giving CO<sub>2</sub>, water and energy. Now try yours."], [
    ["Respiration releases energy from...", "Glucose", "Sunlight", "Salt", "Plastic"],
    ["Which gas does respiration use?", "Oxygen", "Neon", "Helium", "Carbon dioxide"],
    ["Which gas does respiration make?", "Carbon dioxide", "Oxygen", "Hydrogen", "Methane"],
    ["In C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → ? + 6H<sub>2</sub>O, the missing product is...", "6CO<sub>2</sub>", "6CO", "6C", "12O"],
    ["Respiration is almost the opposite of...", "Photosynthesis", "Melting", "Dissolving", "Rusting"],
    ["Muscles with too little oxygen make...", "Lactic acid", "Oxygen", "Chlorine", "Helium"],
    ["Where does the carbon dioxide from respiration leave the body?", "When we breathe out", "Through the ears", "As a solid", "It never leaves"],
    ["How many oxygen molecules does one glucose use in respiration?", "6", "1", "12", "2"]
  ]));

  b.push(les("Fermentation", [
    ["Tiny helpers", "🍞", "<b>Fermentation</b> is when tiny living things such as yeast or bacteria break down sugars. The products depend on the helper."],
    ["Yeast", "🫓", "Yeast eats sugar in dough and makes <b>carbon dioxide gas</b>. The gas makes bubbles, so dough rises. Yeast works best when warm; too hot kills it."],
    ["Bacteria", "🥛", "Bacteria ferment the sugar in milk into <b>lactic acid</b>. This makes milk thicker and sour: <b>yogurt</b>. Pickles and sauerkraut also use lactic acid bacteria."]
  ], ["Think about what living helper is working, and what gas or acid it makes.", "Bread rises because of a gas.", "Example: yogurt turns sour because bacteria make lactic acid. Now try yours."], [
    ["What does yeast make that makes bread rise?", "Carbon dioxide gas", "Oxygen", "Sugar", "Salt"],
    ["Yogurt is made when bacteria turn milk sugar into...", "Lactic acid", "Citric acid", "Glucose", "Hydrochloric acid"],
    ["Yeast works best when it is...", "Warm", "Boiling hot", "Frozen solid", "Dry and cold"],
    ["Too much heat will...", "Kill the yeast", "Make it grow faster", "Turn it into sugar", "Make dough sweeter"],
    ["What does yeast feed on in dough?", "Sugars", "Metals", "Plastic", "Pure water"],
    ["Which of these foods uses fermentation?", "Yogurt", "A fresh apple", "Plain water", "Raw carrot"],
    ["Fermentation is carried out by...", "Tiny living things", "Magnets", "Metals", "Sunlight"],
    ["Why do dough bubbles make a loaf soft and light?", "Gas is trapped in the dough", "Water is trapped as ice", "Salt melts", "Sugar turns to metal"]
  ]));

  b.push(les("Natural and synthetic", [
    ["Two sources", "🌿", "<b>Natural</b> materials come from living things or the ground: cotton, wool, wood, rubber latex, silk. <b>Synthetic</b> materials are made by chemists in factories: nylon, polyester, most plastics."],
    ["Why synthetic?", "🧵", "Synthetic materials can be cheaper, stronger or more waterproof. Nylon is strong and light for ropes and tents. Natural fibres are often more breathable and biodegradable."],
    ["Same chemical", "🍦", "Vanillin from vanilla pods and lab-made vanillin are the <b>same molecule</b>. Synthetic does not mean worse; it means made by people instead of taken from nature."]
  ], ["Ask: does it come from a plant, animal or the ground, or was it made in a factory?", "Natural comes from nature; synthetic is made by chemists.", "Example: cotton grows on a plant, so it is natural; polyester is made from oil chemicals, so it is synthetic. Now try yours."], [
    ["Which of these is a natural fibre?", "Cotton", "Nylon", "Polyester", "Acrylic"],
    ["Which of these is synthetic?", "Nylon", "Wool", "Silk", "Cotton"],
    ["Wool comes from...", "Sheep (sheared safely)", "A factory only", "Oil wells", "Rocks"],
    ["Synthetic materials are made by...", "Chemists in factories", "Wild plants", "Waves", "Wind"],
    ["Which is a benefit of nylon?", "Strong and light", "Always biodegradable", "Grows on trees", "Edible"],
    ["Silk comes from...", "Silkworm cocoons", "A mine", "Rocks", "Oil"],
    ["Is lab-made vanillin the same molecule as natural vanillin?", "Yes", "No", "Only if red", "It is a metal"],
    ["Which of these is a natural material?", "Wood", "Polystyrene", "Nylon", "PVC"]
  ]));

  b.push(les("The carbon cycle", [
    ["Carbon moves", "🔄", "Carbon atoms are used again and again. The <b>carbon cycle</b> moves carbon between the air, plants, animals, soil, the ocean and rocks."],
    ["Taking in, giving out", "🌳", "Plants take CO<sub>2</sub> from the air by <b>photosynthesis</b>. Animals eat plants. All living things release CO<sub>2</sub> by <b>respiration</b>. When things <b>decay</b> or <b>burn</b>, CO<sub>2</sub> goes back to the air."],
    ["Stores", "🛢️", "Carbon is stored in trees, in the ocean and in <b>fossil fuels</b>, made from ancient plants and tiny sea creatures. Burning fossil fuels moves stored carbon into the air quickly."]
  ], ["Which processes put CO<sub>2</sub> in, and which take it out?", "Living things both take and give carbon.", "Example: a tree takes CO<sub>2</sub> from the air to make sugar, so it is removing carbon from the air. Now try yours."], [
    ["Which process takes CO<sub>2</sub> from the air?", "Photosynthesis", "Respiration", "Burning", "Decay"],
    ["Which process adds CO<sub>2</sub> to the air?", "Burning fuel", "Photosynthesis", "A tree growing", "Seeds sprouting"],
    ["Where did fossil fuels come from?", "Ancient plants and sea creatures", "Rocks made from gold", "Clouds", "Ice"],
    ["Decomposers break down dead plants and...", "Release CO<sub>2</sub>", "Make oxygen only", "Make gold", "Destroy carbon"],
    ["Which stores carbon for a long time?", "Fossil fuels", "A puff of air", "A raindrop", "A cloud"],
    ["Animals get carbon by...", "Eating plants or other animals", "Absorbing it through the skin only", "Drinking sunlight", "Breathing in diamonds"],
    ["Does the carbon cycle ever destroy carbon atoms?", "No, they move around", "Yes, all of them", "Only in winter", "Only at night"],
    ["Planting more trees does what to CO<sub>2</sub>?", "Helps remove some from the air", "Makes more at once", "Does nothing at all", "Turns it into hydrogen"]
  ]));

  b.push(les("The nitrogen cycle", [
    ["Lots of nitrogen", "🌬️", "About <b>78%</b> of the air is nitrogen gas, N<sub>2</sub>. But plants cannot use it, because its atoms are held by a very strong triple bond."],
    ["Fixing nitrogen", "🌱", "<b>Nitrogen-fixing bacteria</b> in the roots of peas, beans and clover turn N<sub>2</sub> into nitrates plants can use. <b>Lightning</b> also fixes a little nitrogen. Factories make fertiliser by the Haber process."],
    ["Round and round", "🐄", "Plants take up nitrates and make proteins. Animals eat the plants. When plants and animals die, decomposers return ammonia to the soil. Other bacteria turn nitrates back into N<sub>2</sub>."]
  ], ["Plants need nitrogen in a form they can take up through roots.", "Which tiny organisms change nitrogen gas into a usable form?", "Example: bacteria in clover roots change N<sub>2</sub> into nitrates, so that is fixing. Now try yours."], [
    ["About how much of the air is nitrogen?", "78%", "21%", "1%", "50%"],
    ["Can plants use N<sub>2</sub> gas straight from the air?", "No", "Yes, easily", "Only at night", "Only in winter"],
    ["Which plants have nitrogen-fixing bacteria in their roots?", "Peas and beans", "Pine cones", "Cacti", "Mushrooms"],
    ["Plants take up nitrogen as...", "Nitrates", "N<sub>2</sub> gas", "Pure metal", "Water"],
    ["What do plants make from the nitrogen they take in?", "Proteins", "Plastic", "Salt rock", "Fuel"],
    ["Decomposers return nitrogen to the soil as...", "Ammonia", "Pure oxygen", "Chlorine", "Methane"],
    ["Besides bacteria, what else fixes a little nitrogen?", "Lightning", "Snow", "Moonlight", "Wind chimes"],
    ["How do animals get nitrogen?", "By eating plants or animals", "By breathing nitrogen into blood", "By drinking soil", "From sunlight"]
  ]));

  b.push(les("Types of radioactivity", [
    ["Unstable nuclei", "☢️", "Some atoms have unstable nuclei. They give off energy or particles to become steadier. This is <b>radioactivity</b>. It happens naturally, and we get a little everyday from rocks, food and space (<b>background radiation</b>)."],
    ["Three kinds", "🧱", "<b>Alpha</b>: a helium nucleus (2 protons, 2 neutrons); stopped by paper. <b>Beta</b>: a fast electron; stopped by thin aluminium. <b>Gamma</b>: a high-energy wave; needs thick lead or concrete."],
    ["Staying safe", "🛡️", "Scientists use <b>distance, shielding and short time</b> near radioactive things. Useful jobs: smoke alarms, medical scans, checking pipes and dating old objects."]
  ], ["Alpha is big and easily stopped, gamma is the most penetrating.", "Think of what each radiation is made of.", "Example: a sheet of paper stops alpha, so alpha is the least penetrating. Now try yours."], [
    ["Which radiation is stopped by a sheet of paper?", "Alpha", "Beta", "Gamma", "All of them"],
    ["Which radiation needs thick lead or concrete to stop it?", "Gamma", "Alpha", "Beta", "None needs it"],
    ["An alpha particle is the same as a...", "Helium nucleus", "Electron", "Light wave", "Hydrogen atom"],
    ["A beta particle is a fast...", "Electron", "Proton", "Neutron", "Atom"],
    ["Radiation that comes naturally from rocks and space is called...", "Background radiation", "Sound radiation", "Sunlight only", "Alpha only"],
    ["Which is a way to stay safe near a radioactive source?", "Keep distance and use shielding", "Touch it", "Stay close for hours", "Carry it in a pocket"],
    ["Radioactive atoms have...", "Unstable nuclei", "No nuclei", "Only electrons", "Full shells"],
    ["Which job uses a tiny radioactive source?", "A smoke alarm", "A torch", "A fan", "A spoon"]
  ]));

  const halfQ = () => {
    const n = ri(1, 4), start = pick([80, 160, 320, 640, 1200]), hl = pick([2, 3, 5, 10, 30]), unit = pick(["days", "hours", "years", "minutes"]);
    const rem = start / Math.pow(2, n);
    return num(`A sample has <b>${start} g</b> of a radioactive isotope. Its half-life is <b>${hl} ${unit}</b>. How many grams are left after <b>${n * hl} ${unit}</b>?`, rem,
      ["Find how many half-lives have passed by dividing the time by the half-life.", "Halve the mass once for each half-life that has passed.", "Example: 40 g with a half-life of 2 days, after 4 days: 4 ÷ 2 = 2 half-lives, so 40 → 20 → 10 g. Now do yours."], "☢️");
  };
  b.push(les("Half-life", [
    ["Half is gone", "⏳", "The <b>half-life</b> is the time for half of the radioactive atoms in a sample to decay. It can be tiny seconds or billions of years."],
    ["Halving again and again", "➗", "Start with 80 g. After 1 half-life: <b>40 g</b>. After 2: <b>20 g</b>. After 3: <b>10 g</b>. You halve once for each half-life."],
    ["Using it", "🦴", "<b>Carbon-14</b> has a half-life of 5,730 years, so scientists can date old wood and bones by measuring how much is left. Hospitals use isotopes with short half-lives so they fade quickly."]
  ], ["Count how many half-lives fit into the total time.", "Halve the mass once for each half-life.", "Example: 100 g, 1 half-life = 50 g, 2 half-lives = 25 g. Now try yours."], [
    halfQ, halfQ, halfQ, halfQ, halfQ, halfQ,
    ["After one half-life, how much of the sample is left?", "Half", "All of it", "None", "A quarter"],
    ["After two half-lives, how much is left?", "A quarter", "Half", "Three quarters", "None"],
    ["Carbon-14 dating is used to date...", "Old wood and bones", "Metals", "Pure water", "Plastic bags"],
    ["A short half-life means the sample decays...", "Quickly", "Slowly", "Never", "Backwards"]
  ]));

  b.push(les("Fission and fusion", [
    ["Splitting", "⚛️", "<b>Nuclear fission</b> splits a large nucleus such as uranium-235 into smaller ones and releases energy. Nuclear power stations use it to make heat, then steam, then electricity."],
    ["Joining", "☀️", "<b>Nuclear fusion</b> joins small nuclei such as hydrogen to make helium. It powers the Sun and stars. It needs millions of degrees, and scientists are still working on fusion power stations."],
    ["Pros and cons", "⚖️", "Nuclear power stations release no CO<sub>2</sub> while running, but fission leaves radioactive waste that has to be stored safely for a long time. Both fission and fusion turn a tiny amount of mass into energy."]
  ], ["Fission = split, fusion = join.", "Which nuclei are big and which are small?", "Example: a uranium nucleus splitting is fission, while two hydrogen nuclei joining is fusion. Now try yours."], [
    ["Splitting a large nucleus is called...", "Fission", "Fusion", "Fermentation", "Filtration"],
    ["Joining small nuclei together is called...", "Fusion", "Fission", "Freezing", "Evaporation"],
    ["What powers the Sun?", "Fusion of hydrogen into helium", "Burning coal", "Fission of uranium", "Wind"],
    ["Which fuel do nuclear power stations use for fission?", "Uranium", "Helium", "Neon", "Sand"],
    ["A problem with nuclear fission is...", "Radioactive waste", "It makes CO<sub>2</sub> while running", "It uses no energy", "It makes smoke"],
    ["Fusion needs...", "Extremely high temperatures", "Freezing cold", "Plain water only", "No energy"],
    ["In a nuclear power station, heat from fission is used to make...", "Steam", "Ice", "Clouds of dust", "Sound"],
    ["Fusion makes helium from...", "Hydrogen", "Uranium", "Gold", "Iron"]
  ]));

  b.push(les("Electroplating", [
    ["Coating with metal", "🥄", "<b>Electroplating</b> coats an object with a thin layer of metal using electricity. It protects it, makes it shiny or makes it cheaper than solid metal."],
    ["How it works", "🔋", "The object to plate is the <b>negative electrode (cathode)</b>. The plating metal is the <b>positive electrode (anode)</b>. The solution has ions of the plating metal. Metal ions gain electrons and stick to the object."],
    ["Examples", "🚰", "Chromium on taps and car trim, silver on spoons, gold on jewellery, tin on food cans, zinc on steel to stop rust (galvanising uses a similar idea)."]
  ], ["The object you want to coat is connected to the negative side.", "The plating metal ions are in the solution.", "Example: to plate a key with copper, the key is the cathode and copper ions in the solution coat it. Now try yours."], [
    ["In electroplating, the object to be coated is the...", "Cathode (negative)", "Anode (positive)", "Solvent", "Filter"],
    ["The solution contains ions of the...", "Plating metal", "Object's paint", "Wood", "Gas"],
    ["Electroplating needs...", "Electricity", "A magnet only", "Light only", "Cold only"],
    ["Which is an example of electroplating?", "A silver-plated spoon", "A wooden spoon", "A glass bowl", "Ice"],
    ["Why are food cans plated with tin?", "To protect the steel from rusting", "To make them heavier", "To make them cook", "To make them magnetic"],
    ["Chromium on a tap is there to...", "Protect and make it shiny", "Make it float", "Make it edible", "Make water hot"],
    ["At the cathode, metal ions...", "Gain electrons and become metal atoms", "Lose electrons", "Become gas", "Disappear"],
    ["Compared with a solid gold ring, a gold-plated ring is...", "Cheaper", "More expensive", "Impossible", "Magnetic"]
  ]));

  b.push(les("Fuel cells and hydrogen", [
    ["Clean electricity", "🚗", "A <b>fuel cell</b> reacts hydrogen with oxygen to make electricity. The only product is <b>water</b>: 2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O."],
    ["Not a battery", "🔋", "A battery has its chemicals stored inside and runs flat. A fuel cell keeps making electricity <b>as long as fuel is supplied</b>. Some buses and cars use them."],
    ["The challenge", "🏭", "Hydrogen is not found free on Earth. It must be made, for example by electrolysis of water or from natural gas. It is also a very light, flammable gas, so storing it safely is hard."]
  ], ["A fuel cell needs two gases to react.", "The waste product is something you can drink.", "Example: hydrogen and oxygen react in the cell, giving electricity and water. Now try yours."], [
    ["A hydrogen fuel cell gives out...", "Electricity and water", "Smoke and soot", "Oil", "Ash"],
    ["Which two gases react in a hydrogen fuel cell?", "Hydrogen and oxygen", "Helium and neon", "Nitrogen and argon", "Methane and helium"],
    ["How is a fuel cell different from a battery?", "It keeps working while fuel is supplied", "It cannot make electricity", "It has no chemicals", "It is always larger"],
    ["Hydrogen is difficult to store because it is...", "A very light, flammable gas", "A heavy solid", "Always frozen", "Poisonous only"],
    ["Hydrogen can be made by...", "Electrolysis of water", "Burning water", "Freezing air", "Mixing sand and salt"],
    ["Is hydrogen found free in large amounts on Earth?", "No, it must be made", "Yes, in the air", "Yes, in the sea as gas", "Only in sand"],
    ["The equation 2H<sub>2</sub> + O<sub>2</sub> → ?H<sub>2</sub>O needs this number in the blank:", "2", "1", "4", "3"],
    ["A benefit of hydrogen fuel cells is...", "No CO<sub>2</sub> made where the car is used", "They use petrol", "They burn coal", "They make smoke"]
  ]));

  b.push(les("Semiconductors", [
    ["In the middle", "💻", "Metals conduct electricity well. Plastics and glass do not. <b>Semiconductors</b> such as <b>silicon</b> are in between. They conduct a little, and we can control how much."],
    ["Doping", "🧪", "Adding tiny amounts of other atoms (<b>doping</b>) changes how a semiconductor conducts. This lets makers build <b>transistors</b>, tiny on-off switches for computer chips."],
    ["Everywhere", "🔆", "Silicon comes from sand (silicon dioxide). It is in phones, computers, LEDs and <b>solar cells</b>, which turn light into electricity. Heating a semiconductor makes it conduct <b>better</b>, the opposite of a metal."]
  ], ["A semiconductor is between a conductor and an insulator.", "Think of where a computer chip's material comes from.", "Example: silicon is made from sand and used in chips, so it is a semiconductor. Now try yours."], [
    ["Silicon is a...", "Semiconductor", "Perfect insulator", "Gas", "Liquid metal"],
    ["A semiconductor conducts electricity...", "A little, and it can be controlled", "Not at all", "As well as copper always", "Only when frozen"],
    ["Silicon is mainly obtained from...", "Sand", "Wood", "Rain", "Salt"],
    ["A transistor is a tiny...", "On-off switch", "Battery", "Magnet", "Heater"],
    ["Adding small amounts of other atoms to silicon is called...", "Doping", "Rusting", "Freezing", "Boiling"],
    ["Solar cells change light into...", "Electricity", "Sound", "Plastic", "Water"],
    ["Which device uses a semiconductor chip?", "A phone", "A wooden chair", "A rock", "A pencil"],
    ["When a semiconductor is heated, it usually conducts...", "Better", "Worse", "The same", "Not at all"]
  ]));

  b.push(les("Composite materials", [
    ["Better together", "🧩", "A <b>composite</b> joins two or more materials to make something better than either alone. Each keeps its own properties inside the mix."],
    ["Examples", "🚴", "<b>Fibreglass</b>: glass fibres in plastic, light and strong (boats). <b>Carbon fibre</b>: carbon threads in plastic, very light and stiff (bikes, aircraft). <b>Reinforced concrete</b>: concrete with steel bars. <b>Plywood</b>: layers of wood glued crossways."],
    ["Fibres and matrix", "🔗", "Many composites have strong <b>fibres</b> held by a <b>matrix</b> (glue-like material). The fibres carry the load and the matrix keeps them in place."]
  ], ["A composite is a mix of different materials.", "Think about why people add steel bars to concrete.", "Example: concrete is strong when pressed but weak when pulled, so steel bars help it, making reinforced concrete. Now try yours."], [
    ["A composite is made of...", "Two or more different materials", "One pure element", "A single gas", "Water only"],
    ["Fibreglass is glass fibres in...", "Plastic", "Metal", "Wood", "Water"],
    ["Carbon fibre composites are used in...", "Bikes and aircraft", "Bubble gum", "Window glass", "Jam"],
    ["Reinforced concrete has...", "Steel bars inside", "Wood inside", "Glass bottles inside", "Sugar inside"],
    ["Plywood is made of...", "Layers of wood glued together", "One slab of plastic", "Powdered iron", "Rubber"],
    ["In many composites, the matrix...", "Holds the fibres in place", "Is the only strong part", "Is invisible gas", "Is removed"],
    ["Why use composites?", "They combine useful properties", "They are always weaker", "They have no weight", "They never break"],
    ["Which is a benefit of carbon fibre?", "Very light and stiff", "Heavy and soft", "Sticky", "Edible"]
  ]));

  b.push(mix("Mixed practice", at(b, [0, 1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 14, 16, 17])));
  b.push(mix("Level 17 Challenge", at(b, [5, 8, 12, 13, 14, 15, 16, 17, 0, 9, 11, 3])));

  // ================= LEVEL 18 =================
  const c = [];

  const aeQ = () => {
    const tot = pick([50, 100, 200, 250, 400]), pct = pick([20, 25, 40, 50, 60, 75, 80, 90]), prod = tot * pct / 100;
    return num(`A reaction uses reactants with a total mass of <b>${tot} g</b>. The wanted product has a mass of <b>${prod} g</b>. What is the atom economy in percent? (Number only.)`, pct,
      ["Atom economy compares the wanted product with everything that went in.", "Atom economy = mass of wanted product ÷ total mass of reactants × 100.", "Example: 30 g wanted product from 60 g of reactants: 30 ÷ 60 = 0.5, × 100 = 50 percent. Now do yours."], "♻️");
  };
  c.push(les("Atom economy", [
    ["Little waste", "♻️", "A factory wants to turn as much of the reactants as possible into the product it wants. <b>Atom economy</b> measures this."],
    ["The formula", "🧮", "<b>atom economy (%) = mass of wanted product ÷ total mass of reactants × 100</b>. If 60 g of reactants make 45 g of product you want, atom economy is 45 ÷ 60 × 100 = <b>75%</b>."],
    ["Why it matters", "🌍", "High atom economy means less waste, less cost and less pollution. Reactions where all atoms end up in the product (addition reactions) can reach 100%. This is different from percent yield, which is about how much you actually collected."]
  ], ["Compare the wanted product with the total mass that went in.", "Divide the product mass by the reactant mass, then times 100.", "Example: 25 g product from 50 g reactants is 25 ÷ 50 × 100 = 50 percent. Now try yours."], [
    aeQ, aeQ, aeQ, aeQ, aeQ, aeQ,
    ["A reaction with a high atom economy produces...", "Little waste", "Lots of waste", "No product", "Only gas"],
    ["Atom economy of 100% means...", "All reactant atoms end up in the wanted product", "Nothing reacted", "All the product is waste", "The reaction is explosive"],
    ["Atom economy is different from percent yield because it asks about...", "The atoms in the balanced equation, not the amount collected", "The colour", "The temperature", "The price"]
  ]));

  c.push(les("Green chemistry", [
    ["Cleaner chemistry", "🌿", "<b>Green chemistry</b> means designing products and processes that make less pollution and waste. It starts at the design stage, not at the clean-up."],
    ["Key ideas", "✅", "Prevent waste. Use safer chemicals and <b>water</b> instead of harmful solvents. Use <b>renewable</b> raw materials such as plants. Save energy. Use <b>catalysts</b>. Design products that break down after use."],
    ["Real examples", "🧴", "Making plastic from plant sugars, washing powders that work at low temperatures, and using carbon dioxide as a safe solvent for decaffeinating coffee are green chemistry ideas."]
  ], ["Green chemistry tries to prevent pollution before it happens.", "Which choice uses less energy, creates less waste, or is safer?", "Example: switching from a harmful solvent to water makes a process safer, which is green chemistry. Now try yours."], [
    ["Green chemistry aims to...", "Reduce pollution and waste by design", "Paint chemicals green", "Use more harmful solvents", "Make bigger factories"],
    ["Which is a greener solvent?", "Water", "A toxic solvent", "Fuel", "Strong acid"],
    ["Renewable raw materials come from...", "Plants and other things that regrow", "Rocks that run out", "Oil only", "Coal only"],
    ["A catalyst helps green chemistry by...", "Speeding a reaction without being used up, saving energy", "Making more waste", "Adding poison", "Using up all the product"],
    ["Which is a green choice?", "Washing clothes at lower temperature", "Throwing everything away", "Using more solvent than needed", "Burning waste in the open"],
    ["Designing a product that safely breaks down after use is...", "Green chemistry", "Pollution", "Waste", "Rusting"],
    ["Preventing waste is better than...", "Cleaning it up afterwards", "Planning ahead", "Using less energy", "Saving materials"],
    ["Making plastic from plant sugar uses a...", "Renewable feedstock", "Fossil fuel only", "Radioactive source", "Magnetic field"]
  ]));

  c.push(les("Life cycle of a product", [
    ["Cradle to grave", "📦", "A <b>life cycle assessment</b> follows a product through every stage: getting raw materials, making it, transporting it, using it, and what happens at the end (disposal or recycling)."],
    ["Comparing", "🛍️", "Which is better, a paper bag, a plastic bag or a cloth bag? Each uses different materials, water and energy. A cloth bag costs more to make, but it is better if you use it <b>many times</b>."],
    ["Using it well", "🔁", "Long use, repair, reuse and recycling usually lower a product's total impact. The stage with the biggest impact depends on the product: for a kettle it is using electricity; for a drink can it is making the metal."]
  ], ["List the stages from raw materials to disposal.", "Which stage is the product used? More uses means less impact each time.", "Example: a bottle used 100 times has less impact per use than a bottle used once. Now try yours."], [
    ["A life cycle assessment looks at...", "Every stage from raw materials to disposal", "Only the shop", "Only the colour", "Only the price"],
    ["Which is the first stage in a life cycle?", "Getting raw materials", "Throwing away", "Recycling", "Using"],
    ["A reusable cloth bag is better when it is used...", "Many times", "Once", "Never", "Only as decoration"],
    ["Which action lowers a product's impact?", "Repairing and reusing it", "Throwing it out early", "Buying a new one each week", "Burning it"],
    ["Transport is a stage because it...", "Uses fuel and makes emissions", "Makes the product older", "Changes its colour", "Is not part of the cycle"],
    ["At the end of life, a metal can can be...", "Recycled", "Only burned", "Turned into water", "Left in a river"],
    ["For a kettle, the biggest impact is usually from...", "Electricity used while boiling water", "The box colour", "Its handle", "The shop sign"],
    ["Why compare life cycles of two products?", "To choose the one with less total impact", "To find the prettiest one", "To make the oldest one", "To waste more"]
  ]));

  const nanoQ = () => {
    const k = pick([
      ["micrometres (µm)", "nanometres (nm)", 1000, "A micrometre is one thousandth of a millimetre, and 1 µm = 1,000 nm."],
      ["millimetres", "micrometres (µm)", 1000, "1 mm = 1,000 µm."],
      ["metres", "millimetres", 1000, "1 m = 1,000 mm."]
    ]);
    const n = ri(2, 9), ans = n * k[2];
    return num(`${n} ${k[0]} equals how many ${k[1]}? (Number only.)`, ans,
      ["Each unit here is 1,000 times smaller or bigger than the next.", "Going to a smaller unit means multiplying.", "Example: 4 metres × 1,000 = 4,000 millimetres. Now do yours."], "🔬");
  };
  c.push(les("Nanotechnology", [
    ["The nanoscale", "🔬", "A <b>nanometre (nm)</b> is a billionth of a metre (10<sup>-9</sup> m). A human hair is about 80,000 nm wide. A DNA strand is about 2 nm wide. A few atoms side by side are about 1 nm."],
    ["Different when tiny", "✨", "Materials can behave differently when their particles are 1-100 nm. Nano zinc oxide makes sunscreen clear. Silver nanoparticles can kill germs, so are used in some socks and bandages."],
    ["Think and be careful", "🧑‍🔬", "Nanotechnology also helps make better batteries, lighter materials and targeted medicines. Scientists test tiny particles for safety before they are used widely."]
  ], ["Nano means one billionth.", "1,000 nm = 1 µm, 1,000 µm = 1 mm.", "Example: 1 µm is 1,000 nm, so 3 µm is 3,000 nm. Now try yours."], [
    nanoQ, nanoQ, nanoQ,
    ["A nanometre is...", "One billionth of a metre", "One thousandth of a metre", "A million metres", "A unit of mass"],
    ["Nano zinc oxide in sunscreen makes it...", "Clear instead of white", "Black", "Magnetic", "Hot"],
    ["Silver nanoparticles are used in some socks to...", "Kill germs", "Add colour", "Make them heavy", "Make them glow"],
    ["Which is on the nanoscale?", "A DNA strand's width", "A school bus", "A football pitch", "A tree"],
    ["The nanoscale is about...", "1 to 100 nm", "1 to 100 km", "1 to 100 mm", "1 to 100 m"],
    ["Why can nanoparticles behave differently?", "They have a huge surface compared with their size", "They are made of a new element", "They have no atoms", "They are always liquid"],
    ["Before nanoparticles are widely used, scientists...", "Test them for safety", "Ignore the risks", "Hide the results", "Paint them"]
  ]));

  c.push(les("Smart materials", [
    ["Materials that react", "🧠", "<b>Smart materials</b> change when the surroundings change: heat, light, pressure or electricity."],
    ["Examples", "🕶️", "<b>Photochromic</b> glasses darken in UV light. <b>Thermochromic</b> mugs change colour when hot liquid is added. <b>Shape-memory alloys</b> such as nitinol return to their shape when heated. <b>Piezoelectric</b> crystals make a small voltage when squeezed."],
    ["Uses", "🦷", "Nitinol is in flexible glasses frames and medical stents. Piezoelectric crystals are in some lighters and quartz watches. Self-healing coatings repair small scratches."]
  ], ["Smart materials respond to something: heat, light or pressure.", "Match the clue word to the stimulus.", "Example: a mug that changes colour with hot tea responds to heat, so it is thermochromic. Now try yours."], [
    ["Glasses that darken in sunlight are...", "Photochromic", "Thermochromic", "Piezoelectric", "Magnetic"],
    ["A mug that changes colour with hot drink is...", "Thermochromic", "Photochromic", "Radioactive", "Fluorescent"],
    ["A shape-memory alloy...", "Returns to its shape when heated", "Never bends", "Is a gas", "Is always liquid"],
    ["A well-known shape-memory alloy is...", "Nitinol", "Brass", "Steel wool", "Solder"],
    ["A piezoelectric crystal gives a voltage when...", "Squeezed", "Frozen", "Dissolved", "Painted"],
    ["Which object might use a piezoelectric crystal?", "A spark lighter", "A pillow", "A towel", "A cup of water"],
    ["A smart material is one that...", "Changes in response to its surroundings", "Never changes", "Can do homework", "Is always expensive"],
    ["Self-healing coatings can...", "Repair small scratches", "Make new colours from nothing", "Melt concrete", "Heat the house"]
  ]));

  const dilQ = () => {
    const k = ri(0, 1), f = ri(2, 5);
    if (k === 0) {
      const V1 = pick([10, 20, 25, 50]), C2 = ri(2, 9) * 2, C1 = C2 * f;
      return num(`<b>${V1} mL</b> of a <b>${C1} g/L</b> solution is diluted with water until the total volume is <b>${V1 * f} mL</b>. What is the new concentration in g/L?`, C2,
        ["The volume got bigger, so the solution is weaker.", "C<sub>1</sub> × V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub>. Divide by the new volume.", "Example: 10 mL of 30 g/L made up to 30 mL: 30 × 10 ÷ 30 = 10 g/L. Now do yours."], "🧪");
    }
    const V2 = pick([100, 200, 250, 500]), C1 = pick([10, 20, 40, 50]), C2 = C1 / f;
    const need = V2 / f;
    if (!Number.isInteger(need) || !Number.isInteger(C2)) return dilQ();
    return num(`How many mL of a <b>${C1} g/L</b> stock solution are needed to make <b>${V2} mL</b> of <b>${C2} g/L</b> solution? (Number only.)`, need,
      ["Use the idea that the amount of solute stays the same when you add water.", "V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub> ÷ C<sub>1</sub>.", "Example: to make 100 mL of 5 g/L from a 20 g/L stock: 5 × 100 ÷ 20 = 25 mL. Now do yours."], "🧪");
  };
  c.push(les("Making dilutions", [
    ["Adding water", "💧", "To <b>dilute</b> a solution you add more solvent (usually water). The amount of dissolved solute stays the same, but it is spread through more liquid, so the concentration drops."],
    ["The dilution rule", "📐", "<b>C<sub>1</sub> × V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub></b>. Start: 20 mL at 10 g/L. Add water to make 40 mL. New concentration: 10 × 20 ÷ 40 = <b>5 g/L</b>."],
    ["In practice", "🧴", "Lab workers dilute strong stock solutions, and so do cleaners and cordial drinks. Always add acid to water, never water to acid, and follow the label's mixing ratio."]
  ], ["The amount of dissolved stuff stays the same when you add water.", "Use C<sub>1</sub> × V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub> and solve for what you need.", "Example: 50 mL of 8 g/L made up to 100 mL gives 8 × 50 ÷ 100 = 4 g/L. Now try yours."], [
    dilQ, dilQ, dilQ, dilQ, dilQ, dilQ,
    ["When you add water to a solution, its concentration...", "Decreases", "Increases", "Stays the same", "Turns negative"],
    ["Diluting a solution changes the amount of solute dissolved. True or false?", "False, the amount of solute stays the same", "True, it doubles", "True, it vanishes", "True, it becomes acid"]
  ]));

  const ppmQ = () => {
    const k = ri(0, 1);
    if (k === 0) {
      const ppm = ri(2, 9), L = pick([5, 10, 20, 50]);
      return num(`A swimming pool sample has <b>${ppm} ppm</b> of chlorine (${ppm} mg per litre). How many mg of chlorine are in <b>${L} L</b> of pool water?`, ppm * L,
        ["ppm here means milligrams per litre.", "Multiply the ppm by the number of litres.", "Example: 3 ppm in 10 L is 3 × 10 = 30 mg. Now do yours."], "🏊");
    }
    const ppm = ri(2, 9), L = pick([2, 4, 5, 10]);
    return num(`<b>${ppm * L} mg</b> of dissolved nitrate is found in <b>${L} L</b> of river water. What is the concentration in ppm (mg per litre)?`, ppm,
      ["ppm in water is milligrams per litre.", "Divide the milligrams by the litres.", "Example: 40 mg in 8 L is 40 ÷ 8 = 5 ppm. Now do yours."], "🏞️");
  };
  c.push(les("Parts per million", [
    ["Tiny amounts", "🔍", "Some pollutants and nutrients are present in very small amounts. <b>Parts per million (ppm)</b> says how many parts of a substance are in a million parts of the mixture."],
    ["In water", "💧", "For dilute water samples, <b>1 ppm = 1 mg per litre</b>, because 1 litre of water has a mass of about 1,000,000 mg. So 5 ppm is 5 mg in every litre."],
    ["Why use ppm?", "🏊", "Pool chlorine, minerals in drinking water and gases in air are tiny amounts. Percent would give awkward decimals. 1% is 10,000 ppm."]
  ], ["In water, 1 ppm means 1 mg for every litre.", "Multiply or divide using the litres.", "Example: 4 ppm in 5 L is 20 mg (4 × 5), and 20 mg in 5 L is 4 ppm (20 ÷ 5). Now try yours."], [
    ppmQ, ppmQ, ppmQ, ppmQ, ppmQ, ppmQ,
    ["ppm stands for...", "Parts per million", "Particles per metre", "Pounds per meal", "Pressure per minute"],
    ["In water, 1 ppm is about...", "1 mg per litre", "1 g per litre", "1 kg per litre", "1 mg per drop"],
    ["Which is bigger?", "1% (10,000 ppm)", "100 ppm", "1 ppm", "0.5 ppm"]
  ]));

  c.push(les("Gases in liquids", [
    ["Fizzy drinks", "🥤", "Fizzy drinks have carbon dioxide dissolved under <b>high pressure</b>. When you open the bottle, pressure drops, the gas escapes as bubbles and the drink fizzes."],
    ["Temperature", "🌡️", "A gas dissolves <b>less</b> in warm water than in cold water. Warm lemonade goes flat faster. (Solids usually dissolve better when warm, but gases do the opposite.)"],
    ["Life depends on it", "🐟", "Fish breathe oxygen dissolved in water. Warm water holds less oxygen, so a hot summer or warm waste water can leave a lake short of oxygen."]
  ], ["Gases behave differently from solids in warm water.", "Think about what happens when pressure drops.", "Example: a shaken soda fizzes more when opened because the gas is released as pressure drops. Now try yours."], [
    ["More gas dissolves in a liquid at...", "Higher pressure", "Lower pressure", "Exactly zero pressure", "No pressure"],
    ["A gas dissolves best in...", "Cold water", "Hot water", "Boiling water", "It does not matter"],
    ["Why does soda fizz when opened?", "Pressure drops and dissolved gas escapes", "It starts to freeze", "Air turns into sugar", "The metal reacts"],
    ["Why does warm soda go flat faster?", "Gas is less soluble in warm liquids", "Warm soda has more gas", "Cold soda has no gas", "Gas turns solid"],
    ["Which gas makes drinks fizzy?", "Carbon dioxide", "Helium", "Neon", "Chlorine"],
    ["Fish in warm lake water may struggle because...", "Warm water holds less oxygen", "Warm water has no water", "Fish dislike light", "Oxygen turns solid"],
    ["The opposite is true for most solids, which dissolve...", "Better in warm water", "Worse in warm water", "Equally in all water", "Never"],
    ["Shaking a closed soda bottle then opening it makes...", "A lot of foam", "Nothing", "Ice", "Colour change"]
  ]));

  c.push(les("Buffers", [
    ["Resisting change", "🛡️", "A <b>buffer</b> is a solution that resists changes in <b>pH</b> when a little acid or base is added. It usually has a weak acid and a salt of that acid."],
    ["In your body", "🩸", "Blood must stay at pH about 7.4. Buffers (like bicarbonate) soak up extra acid or base, keeping blood nearly constant. If the pH changed a lot, enzymes would stop working."],
    ["Elsewhere", "🧴", "Buffers are in shampoos, medicines, swimming pool chemicals and lab solutions. Add a few drops of acid to pure water: pH changes a lot. Add the same to a buffer: pH hardly changes."]
  ], ["Buffers keep pH steady.", "Think of what happens to the pH after adding a few drops of acid.", "Example: a buffer with a few drops of acid still has nearly the same pH, so it resists change. Now try yours."], [
    ["A buffer solution...", "Resists changes in pH", "Always has pH 1", "Is a solid", "Cannot dissolve"],
    ["The pH of blood is about...", "7.4", "1", "13", "3"],
    ["A few drops of acid are added to pure water and to a buffer. Which changes pH less?", "The buffer", "Pure water", "Both change equally", "Neither has a pH"],
    ["Which keeps blood pH steady?", "Buffers", "Bleach", "Sugar", "Fibre"],
    ["Why must blood pH stay nearly constant?", "Enzymes only work in a narrow pH range", "Blood freezes otherwise", "Red cells would turn green", "It would taste sour"],
    ["A buffer usually contains a weak acid and...", "A salt of that acid", "A strong metal", "A noble gas", "Pure sand"],
    ["Which product often has a buffer to keep a gentle pH?", "Shampoo", "A brick", "A nail", "A stone"],
    ["After adding a little base, a buffer's pH...", "Changes very little", "Doubles", "Goes to zero", "Becomes negative"]
  ]));

  c.push(les("Osmosis and desalination", [
    ["Water through a membrane", "🍇", "<b>Osmosis</b> is the movement of water through a thin <b>semi-permeable membrane</b>, from a dilute solution to a more concentrated one. Raisins swell in water because water moves into them."],
    ["Cells", "🥔", "A potato slice in salty water gets soft and shrinks because water leaves it. In pure water it gets firm because water enters. This is why salty drinks do not quench thirst."],
    ["Fresh water from the sea", "🌊", "<b>Reverse osmosis</b> uses high pressure to push water through a membrane against the natural direction. Salt is left behind. It is one way of <b>desalination</b>: making drinking water from sea water."]
  ], ["Water moves toward the side with more dissolved stuff.", "Reverse osmosis uses pressure to go the other way.", "Example: a raisin soaked in water swells because water moves into the sweeter inside. Now try yours."], [
    ["Osmosis is the movement of...", "Water through a membrane", "Salt through a wall", "Electrons only", "Heat only"],
    ["In osmosis water moves from...", "A dilute solution to a more concentrated one", "A concentrated to a dilute one", "Cold to hot", "Solid to gas"],
    ["A potato slice in very salty water will...", "Lose water and shrink", "Gain water and swell", "Turn blue", "Dissolve"],
    ["Raisins soaked in water swell because...", "Water moves into them", "Sugar leaves", "They get hot", "They turn into grapes"],
    ["Reverse osmosis uses...", "High pressure", "Cold only", "Magnets", "Sunlight"],
    ["Desalination makes...", "Drinking water from sea water", "Sea water from rain", "Salt from sand", "Plastic"],
    ["What is left behind in reverse osmosis?", "The salt", "The fresh water", "Gold", "Oxygen"],
    ["A semi-permeable membrane lets...", "Some particles through but not others", "Everything through", "Nothing through", "Only metals through"]
  ]));

  c.push(les("The limestone cycle", [
    ["Limestone", "🪨", "<b>Limestone</b> is calcium carbonate, CaCO<sub>3</sub>. Heat it strongly and it decomposes: CaCO<sub>3</sub> → <b>CaO</b> + CO<sub>2</sub>. CaO is called quicklime."],
    ["Slaking", "💦", "Add water to quicklime and it reacts, getting hot: CaO + H<sub>2</sub>O → <b>Ca(OH)<sub>2</sub></b>, slaked lime. A solution of it is <b>limewater</b>."],
    ["Back again", "🔁", "Limewater turns cloudy when carbon dioxide is bubbled in, because white CaCO<sub>3</sub> forms. Quicklime and limestone are used in cement, and slaked lime neutralises acidic soil."]
  ], ["Follow the chain: limestone, quicklime, slaked lime, limestone again.", "Heat breaks limestone down, water changes quicklime.", "Example: heating makes CaCO<sub>3</sub> lose CO<sub>2</sub> to leave CaO. Now try yours."], [
    ["The chemical name of limestone is...", "Calcium carbonate", "Calcium oxide", "Calcium hydroxide", "Sodium chloride"],
    ["Heating limestone gives CO<sub>2</sub> and...", "Calcium oxide (quicklime)", "Calcium hydroxide", "Water", "Iron"],
    ["Quicklime plus water makes...", "Calcium hydroxide (slaked lime)", "Calcium carbonate", "Salt", "Sand"],
    ["Limewater turns cloudy with...", "Carbon dioxide", "Oxygen", "Nitrogen", "Helium"],
    ["The cloudiness in limewater is white...", "Calcium carbonate", "Quicklime", "Water", "Salt"],
    ["Slaked lime can be used to...", "Neutralise acidic soil", "Make lemonade", "Cool ice cream", "Fuel cars"],
    ["The formula of quicklime is...", "CaO", "CaCO<sub>3</sub>", "Ca(OH)<sub>2</sub>", "CO<sub>2</sub>"],
    ["When quicklime is mixed with water, the mixture gets...", "Hot", "Frozen", "Magnetic", "Sparkly"]
  ]));

  c.push(les("Hypothesis, theory and law", [
    ["Everyday words, special meanings", "📘", "In science, a <b>hypothesis</b> is a testable idea for one question. A <b>theory</b> is a well-tested explanation supported by lots of evidence. A <b>law</b> describes a pattern, often with a formula."],
    ["Not just a guess", "🧠", "The 'theory' of evolution or atoms is not a wild guess. It is a big explanation backed by many experiments. A theory <b>explains why</b>; a law says <b>what happens</b>. A law does not grow up from a theory."],
    ["Testing ideas", "🔁", "Scientists check each other's work (<b>peer review</b>) and repeat tests (<b>replication</b>). If new evidence disagrees, ideas are improved. Two things happening together (<b>correlation</b>) do not prove one causes the other."]
  ], ["Hypothesis is testable and specific, theory is a big explanation backed by evidence.", "A law says what happens; a theory says why.", "Example: 'Warmer water dissolves sugar faster' is a testable hypothesis. Now try yours."], [
    ["A testable idea you can check by experiment is a...", "Hypothesis", "Law", "Mixture", "Reactant"],
    ["A well-tested explanation backed by lots of evidence is a...", "Theory", "Guess", "Rumour", "Hunch"],
    ["A scientific law usually...", "Describes a pattern of what happens", "Explains why in full", "Is just an opinion", "Cannot be tested"],
    ["Checking a result by repeating the experiment is...", "Replication", "Evaporation", "Distillation", "Condensation"],
    ["When other scientists review a study before it is published, it is called...", "Peer review", "Chemical review", "Tasting", "Advertising"],
    ["Two things happening together shows...", "Correlation, not always cause", "Proof of cause every time", "A law", "An element"],
    ["If new evidence disagrees with an idea, scientists...", "Improve or change the idea", "Hide the evidence", "Ignore it for ever", "Stop all science"],
    ["Which is a testable hypothesis?", "Hot water dissolves sugar faster than cold water", "Chemistry is great", "Blue is the best colour", "Everyone likes salt"]
  ]));

  c.push(les("Fire classes and extinguishers", [
    ["Fires differ", "🧯", "Different fuels need different ways to put out the fire. Class A: wood, paper, cloth. Class B: flammable liquids such as petrol. Electrical fires. Cooking oil and fat fires."],
    ["Right tool", "🛠️", "<b>Water</b> works on wood and paper (Class A) by cooling. <b>Never use water on an oil fire or an electrical fire</b>. <b>CO<sub>2</sub> extinguishers</b> are good for electrical fires: they push away oxygen and leave no mess. A <b>fire blanket</b> smothers a small pan fire."],
    ["Fire triangle", "🔺", "Fire needs <b>heat, fuel and oxygen</b>. Remove one and it goes out. In a real fire, get out, shout for help and call the emergency number; only trained adults fight fires."]
  ], ["Remember: fire needs heat, fuel and oxygen.", "Water carries electricity and can spread burning oil.", "Example: smothering a small pan fire with a lid cuts off oxygen. Now try yours."], [
    ["What are the three parts of the fire triangle?", "Heat, fuel and oxygen", "Water, wind and sand", "Light, sound and cold", "Salt, sugar and ice"],
    ["Which should NOT be put out with water?", "A cooking oil fire", "A paper fire", "A wood fire", "A cardboard fire"],
    ["A fire blanket puts out a pan fire by...", "Smothering it (no oxygen)", "Adding fuel", "Heating it", "Adding water"],
    ["A CO<sub>2</sub> extinguisher is good for...", "Electrical fires", "Nothing at all", "Making ice cream", "Watering plants"],
    ["Water puts out a paper fire mainly by...", "Cooling it down", "Adding fuel", "Adding oxygen", "Making it dry"],
    ["If you remove the fuel from a fire it...", "Goes out", "Burns brighter", "Explodes", "Changes colour"],
    ["If there is a real fire at home, you should...", "Get out and call for help", "Fight it alone", "Hide inside", "Open all the windows and watch"],
    ["Which classes of fire does water NOT suit?", "Electrical and oil fires", "Wood fires", "Paper fires", "Cloth fires"]
  ]));

  c.push(les("Reading a chemical label", [
    ["Know before you use", "🏷️", "A chemical label tells you the <b>name</b>, how strong it is, the <b>signal word</b>, hazard warnings, how to use it and what to do if something goes wrong."],
    ["Signal words", "⚠️", "<b>Danger</b> marks the more serious hazards. <b>Warning</b> marks the less serious. <b>Precautionary statements</b> tell you what to do: wear gloves, keep away from heat, keep out of reach of children."],
    ["More detail", "📄", "A <b>Safety Data Sheet (SDS)</b> has full details: first aid, firefighting, storage, spills and disposal. Check the expiry date, and never put chemicals in a food or drink bottle."]
  ], ["Labels tell you how to use a chemical safely.", "Which words signal how serious the hazard is?", "Example: a label says 'Keep out of reach of children', which is a precautionary statement. Now try yours."], [
    ["Which signal word shows the more serious hazard?", "Danger", "Warning", "Caution only", "Please"],
    ["Where can you find full first-aid and spill advice?", "Safety Data Sheet", "Price tag", "Shop sign", "Barcode"],
    ["'Wear gloves' is a...", "Precautionary statement", "Chemical name", "Barcode", "Hazard colour"],
    ["Should you put chemicals in an empty drink bottle?", "Never", "Always", "Only juice bottles", "Yes if you tell a friend"],
    ["Why check an expiry date on a chemical?", "Old chemicals may change or be unsafe", "To see its colour", "To know its price", "Because it will explode if not"],
    ["A label should tell you...", "How to use it safely", "Your homework", "Your name", "A joke"],
    ["Which tells you what to do if it gets in your eyes?", "First-aid information", "The brand name", "The barcode", "The colour"],
    ["Keeping chemicals in their original container helps because...", "The label stays with them", "They stay cold", "They cost less", "They taste better"]
  ]));

  const uncQ = () => {
    const k = ri(0, 1);
    if (k === 0) {
      const d = pick([1, 2, 0.1, 0.5, 0.2, 10]), u = d / 2, unit = pick(["mm", "mL", "g"]);
      return num(`A measuring scale has smallest divisions of <b>${d} ${unit}</b>. A common rule gives the reading uncertainty as half a division. What is the uncertainty in ${unit}? (Number only.)`, u,
        ["Uncertainty is about half of the smallest division.", "Divide the division size by 2.", "Example: smallest division 4 means uncertainty 4 ÷ 2 = 2. Now do yours."], "📏");
    }
    const lo = ri(100, 200) / 10, sp = pick([0.2, 0.4, 0.6, 0.8]), mid = Math.round((lo + sp / 2) * 10) / 10, hi = Math.round((lo + sp) * 10) / 10;
    return num(`Three readings of a length are <b>${lo.toFixed(1)}</b>, <b>${mid.toFixed(1)}</b> and <b>${hi.toFixed(1)}</b> cm. Using half the range, what is the uncertainty in cm?`, Math.round(sp / 2 * 10) / 10,
      ["Range is the highest reading minus the lowest reading.", "Uncertainty = range ÷ 2.", "Example: readings 5.0, 5.2 and 5.4 have range 0.4, so uncertainty is 0.2. Now do yours."], "📐");
  };
  c.push(les("Uncertainty in measurements", [
    ["No measurement is perfect", "📏", "Every measurement has some <b>uncertainty</b>. We write it with ±: a length of 12.5 ± 0.5 cm means the real value is probably between 12.0 and 13.0 cm."],
    ["Finding it", "🔎", "For one reading, use <b>half the smallest division</b> of the scale. For repeated readings, use <b>half the range</b> (highest minus lowest, then ÷ 2)."],
    ["Better results", "✅", "Use equipment with smaller divisions, repeat measurements and take the mean. A smaller uncertainty means a more trustworthy result."]
  ], ["Uncertainty tells you how far off the reading might be.", "For one scale reading use half a division. For repeats use half the range.", "Example: divisions of 2 mm give uncertainty 2 ÷ 2 = 1 mm. Now try yours."], [
    uncQ, uncQ, uncQ, uncQ, uncQ, uncQ,
    ["12.5 ± 0.5 cm means the true length is probably between...", "12.0 and 13.0 cm", "10 and 15 cm", "12.5 and 13.5 cm", "0 and 12.5 cm"],
    ["Which gives a smaller uncertainty?", "A scale with smaller divisions", "A scale with bigger divisions", "Guessing", "Closing your eyes"],
    ["Repeating a measurement and finding the mean helps to...", "Get a more reliable result", "Make it larger", "Hide errors", "Change the unit"]
  ]));

  c.push(les("Humidity and dew point", [
    ["Water in the air", "☁️", "Air always has some invisible <b>water vapour</b>. <b>Humidity</b> tells how much. <b>Relative humidity</b> is how full the air is compared with the most it can hold at that temperature."],
    ["Warm holds more", "🌡️", "Warm air can hold more water vapour than cold air. When air cools, it may reach 100% relative humidity. The temperature where this happens is the <b>dew point</b>."],
    ["Dew, fog and drips", "🥛", "Below the dew point, vapour condenses: <b>dew</b> on grass, <b>fog</b> in the air, droplets on a cold glass of water. Clothes dry faster when the air is dry."]
  ], ["Warm air holds more water vapour.", "Cooling the air makes vapour condense.", "Example: a cold can gets wet outside because the air next to it cools below the dew point. Now try yours."], [
    ["Warm air can hold...", "More water vapour than cold air", "Less water vapour than cold air", "No water vapour", "Only liquid water"],
    ["The dew point is the temperature at which...", "Water vapour starts to condense", "Water boils", "Ice melts", "Air freezes"],
    ["Why do drops form on a cold glass of water?", "Vapour in the air cools and condenses on it", "Water leaks through glass", "The glass sweats like a person", "Ice grows inside"],
    ["Fog is...", "Tiny water droplets in the air near the ground", "Smoke", "Pure gas", "Frost"],
    ["100% relative humidity means the air is...", "Holding all the vapour it can", "Completely dry", "Hot", "Out of oxygen"],
    ["Clothes dry fastest in...", "Warm, dry, windy air", "Cold, damp, still air", "Fog", "Rain"],
    ["Dew on grass forms when the ground...", "Cools below the dew point", "Warms up", "Dries", "Melts"],
    ["If air cools but does not reach the dew point, vapour...", "Stays as vapour", "Condenses at once", "Turns into ice", "Disappears"]
  ]));

  c.push(les("Forensic chemistry", [
    ["Chemistry detectives", "🔎", "<b>Forensic scientists</b> use chemistry to answer questions with evidence. They test tiny samples carefully and never contaminate them."],
    ["Tools", "🖍️", "<b>Chromatography</b> can show whether the ink on two notes is the same. <b>Powders</b> make fingerprints visible. Fibres, glass fragments and paint chips can be compared by colour, density and chemical tests."],
    ["Good evidence", "🧤", "Evidence is collected with gloves, bagged and labelled. The mystery 'Who took the cookies?' can be solved by comparing crumbs, ink or fibres, never by guessing."]
  ], ["Match the tool to the clue it can help with.", "Ink can be split into its dyes.", "Example: comparing two black pens by chromatography shows they use different dye mixtures. Now try yours."], [
    ["Which technique can show if two inks match?", "Chromatography", "Fermentation", "Electroplating", "Distillation"],
    ["Fingerprints are made visible with...", "A fine powder", "Salt water", "Ice", "A magnet"],
    ["Why do forensic scientists wear gloves?", "To avoid contaminating evidence", "To keep warm", "To play a game", "To hide"],
    ["What does evidence in a mystery need to be?", "Collected carefully and labelled", "Mixed together", "Thrown away", "Drawn on"],
    ["Comparing fibres from clothes can help show...", "Whether two samples are from the same material", "What the weather was", "What song was playing", "How old a person is"],
    ["Glass fragments can be compared by their...", "Density", "Taste", "Smell", "Sound"],
    ["A forensic scientist bases conclusions on...", "Test results and evidence", "Guesses", "Rumours", "Luck"],
    ["Chromatography separates ink into its...", "Different dyes", "Metals", "Gases", "Foods"]
  ]));

  c.push(les("Perfumes and volatility", [
    ["Evaporating scents", "🌸", "A perfume works because its scented molecules <b>evaporate</b> easily. A liquid that evaporates easily is called <b>volatile</b>. The scent molecules drift through the air by diffusion to your nose."],
    ["Top, middle, base", "🧴", "Perfume is made of several parts. <b>Top notes</b> are the most volatile (light, citrus) and are smelled first. <b>Middle notes</b> come next. <b>Base notes</b> are the least volatile and last longest. Small light molecules evaporate fastest."],
    ["Making scents", "🌿", "Many scents come from flowers, peel and herbs. <b>Steam distillation</b> carries the plant oils out and condenses them. Heat from skin makes the scent evaporate faster."]
  ], ["Volatile means easily turning into a vapour.", "Think about which note evaporates first and which stays longest.", "Example: citrus top notes disappear fast so they are very volatile. Now try yours."], [
    ["A volatile liquid is one that...", "Evaporates easily", "Never evaporates", "Is always solid", "Is always sweet"],
    ["Which notes of perfume are smelled first?", "Top notes", "Base notes", "Middle notes", "Silent notes"],
    ["Which notes last the longest?", "Base notes", "Top notes", "Fast notes", "Light notes"],
    ["Scent molecules reach your nose by...", "Diffusion through the air", "Falling as rain", "Freezing", "Rolling"],
    ["Which molecules evaporate fastest?", "Small, light molecules", "Huge, heavy molecules", "Metals", "Rocks"],
    ["Plant oils for scents can be collected by...", "Steam distillation", "Rusting", "Smelting", "Welding"],
    ["Warm skin makes perfume...", "Evaporate faster", "Evaporate slower", "Freeze", "Turn solid"],
    ["A perfume with only top notes would...", "Fade quickly", "Last for days", "Turn into metal", "Never smell"]
  ]));

  c.push(mix("Mixed practice", at(c, [0, 1, 3, 5, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17])));
  c.push(mix("Level 18 Challenge", at(c, [2, 4, 5, 6, 9, 10, 13, 14, 15, 17, 0, 12])));

  Object.assign(CHEM_LEVELS, { 16: a, 17: b, 18: c });
})();
