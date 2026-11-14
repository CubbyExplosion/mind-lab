// ext/chem-4-6.js  Mind Lab Chemistry levels 4-6 (grades 1 second half, 2 first half, 2 second half)
(() => {
  // item = [question, rightAnswer, wrong1, wrong2?]  ("emoji§question" shows a big picture)  OR a function returning an item or a full question object
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
  const fmt = f => f.replace(/\d+/g, m => `<sub>${m}</sub>`);
  const NAMES = { H: "hydrogen", O: "oxygen", C: "carbon", N: "nitrogen", Na: "sodium", Cl: "chlorine", S: "sulfur", Ca: "calcium" };

  // ---------- number makers ----------
  const addMass = () => {
    const a = pick([100, 200, 250, 300, 400, 500]), b = pick([50, 100, 150, 200, 300, 350]);
    return { text: `A bowl weighs ${a} grams. You add apples that weigh ${b} grams. How many grams is that in all?`, visual: "⚖️", answer: a + b,
      hints: ["You are putting two masses together. Should you add or take away?", "Joining more mass to what you have means you add the two numbers.", "Example: 40 g of flour and 25 g of sugar make 40 + 25 = 65 g. Now do yours."] };
  };
  const addMl = () => {
    const a = pick([100, 200, 250, 300, 400]), b = pick([50, 100, 150, 250, 300]);
    return { text: `A jug holds ${a} mL of water. You pour in ${b} mL more. How many mL are in the jug now?`, visual: "🫗", answer: a + b,
      hints: ["You are pouring more water in. Will there be more or less?", "More water means you add the two amounts.", "Example: 120 mL plus 80 mL is 200 mL. Now do yours."] };
  };
  const kgToG = () => {
    const k = ri(2, 9);
    return { text: `A bag of rice is ${k} kilograms. 1 kilogram is 1000 grams. How many grams is the bag?`, visual: "🍚", answer: k * 1000,
      hints: ["Each kilogram is a big number of grams. Think about multiplying.", "Multiply the kilograms by 1000. Adding three zeros at the end does the same thing.", "Example: 5 kilograms is 5 x 1000 = 5000 grams. Now do yours (use a different number)."] };
  };
  const countAtoms = (forms) => () => {
    const f = pick(forms), el = pick(Object.keys(f[1])), total = Object.values(f[1]).reduce((x, y) => x + y, 0);
    const which = pick(["one", "one", "total"]);
    const hints = which === "one"
      ? ["Look at the small number just after the letter. A letter with no small number means just one atom.", "Find the letter you are asked about, then read the small number next to it.", "Example: in Cl2 the Cl has a small 2, so there are 2 Cl atoms. Now do yours."]
      : ["Find every letter in the formula. Each letter is a different kind of atom.", "Add up the small numbers. A letter with no small number counts as one atom.", "Example: for N2O, N has 2 and O has no number (one), so 2 + 1 = 3 atoms. Now do yours."];
    return which === "one"
      ? { text: `How many <b>${NAMES[el]}</b> (${el}) atoms are in one molecule of <b>${fmt(f[0])}</b>?`, answer: f[1][el], hints }
      : { text: `How many atoms are in one molecule of <b>${fmt(f[0])}</b> in all?`, answer: total, hints };
  };
  const F5 = [["H2O", { H: 2, O: 1 }], ["CO2", { C: 1, O: 2 }], ["O2", { O: 2 }], ["H2", { H: 2 }], ["NaCl", { Na: 1, Cl: 1 }], ["CH4", { C: 1, H: 4 }], ["NH3", { N: 1, H: 3 }]];
  const F6 = [["C6H12O6", { C: 6, H: 12, O: 6 }], ["H2SO4", { H: 2, S: 1, O: 4 }], ["NaHCO3", { Na: 1, H: 1, C: 1, O: 3 }], ["CaCO3", { Ca: 1, C: 1, O: 3 }], ["CH4", { C: 1, H: 4 }], ["NH3", { N: 1, H: 3 }], ["CO2", { C: 1, O: 2 }], ["H2O", { H: 2, O: 1 }]];
  const EL = [["hydrogen", "H", 1], ["helium", "He", 2], ["lithium", "Li", 3], ["carbon", "C", 6], ["nitrogen", "N", 7], ["oxygen", "O", 8], ["neon", "Ne", 10], ["sodium", "Na", 11], ["magnesium", "Mg", 12], ["aluminum", "Al", 13], ["sulfur", "S", 16], ["chlorine", "Cl", 17], ["calcium", "Ca", 20]];
  const protons = () => {
    const e = pick(EL), kind = pick(["p", "e", "who"]);
    if (kind === "who") {
      const wr = shuf(EL.filter(x => x !== e)).slice(0, 2);
      return { text: `An atom has <b>${e[2]}</b> protons. Which element is it?`, choices: shuf([e[0], wr[0][0], wr[1][0]]), answer: e[0],
        hints: ["The number of protons tells you which element an atom is.", "The atomic number is the number of protons. Match the number to the element.", "Example: an atom with 1 proton is hydrogen, the lightest element. Now do yours."] };
    }
    return { text: kind === "p" ? `<b>${e[0][0].toUpperCase() + e[0].slice(1)}</b> has atomic number ${e[2]}. How many protons does one atom have?` : `A neutral atom of <b>${e[0]}</b> has ${e[2]} protons. How many electrons does it have?`, answer: e[2],
      hints: kind === "p" ? ["The atomic number is a special number for each element. It counts one kind of particle.", "Atomic number = number of protons. They are the same number.", "Example: sodium has atomic number 11, so it has 11 protons. Now do yours (a different element)."]
        : ["A neutral atom has no charge. Positive and negative must balance.", "In a neutral atom, the number of electrons equals the number of protons.", "Example: a neutral atom with 3 protons has 3 electrons. Now do yours."] };
  };
  const mass = () => {
    const a = pick([10, 20, 30, 40, 50]), b = pick([60, 70, 80, 90, 100]), k = ri(0, 2);
    const t = [`You stir ${a} g of sugar into ${b} g of water. The sugar dissolves. How many grams is the sugar water?`,
      `You mix ${a} g of baking soda with ${b} g of vinegar in a closed, sealed bag. The bag fills with gas. How many grams does everything in the bag weigh together?`,
      `A cup holds ${a} g of ice and ${b} g of juice. The ice melts. What is the total mass of the liquid in the cup now?`][k];
    return { text: t, answer: a + b, visual: ["🥄", "🛍️", "🧊"][k],
      hints: ["Matter is not lost or made new when things mix or change. Think about what happens to the total.", "The total mass stays the same. Add the two starting masses.", "Example: 15 g of salt and 85 g of water make a salty water of 15 + 85 = 100 g. Now do yours."] };
  };
  const waterState = () => {
    let T; do { T = pick([-20, -10, -5, 5, 10, 25, 40, 60, 80, 90, 105, 110, 120, 150]); } while (false);
    const ans = T < 0 ? "Solid ice" : T < 100 ? "Liquid water" : "Water vapor (gas)";
    return { text: `Pure water is at <b>${T} °C</b>. What state is it in?`, visual: "🌡️", choices: ["Solid ice", "Liquid water", "Water vapor (gas)"], answer: ans,
      hints: ["Water has two special temperatures. Think about where it freezes and where it boils.", "Below the freezing point it is solid. Between freezing and boiling it is liquid. Above the boiling point it is a gas.", "Example: at 20 °C water is above freezing and below boiling, so it is liquid. Now do yours."] };
  };

  // ================= LEVEL 4 =================
  const a = [
    les("Measuring mass", [
      ["What is mass?", "⚖️", "<b>Mass</b> tells how much stuff is in something. We measure it in <b>grams</b> (g) and <b>kilograms</b> (kg)."],
      ["Which unit?", "🍎", "A paperclip is only a gram or so. An apple is about 100 grams. A bag of potatoes is measured in kilograms."],
      ["Big and small", "🔢", "<b>1 kilogram = 1000 grams</b>. Use a scale to measure mass."]
    ], ["Think about how big or heavy the thing is, and which tool or unit fits.", "Small things use grams. Big things use kilograms. A scale measures mass.", "Example: a pencil is a few grams, so grams fit best. Now try yours."], [
      ["Which tool measures mass?", "A scale", "A ruler", "A clock"], ["Which unit is best for a paperclip?", "Grams", "Kilograms"], ["Which unit is best for a big bag of dog food?", "Kilograms", "Grams"],
      ["1 kilogram is the same as how many grams?", "1000 grams", "10 grams", "100 grams"], ["Which is more mass?", "1 kilogram", "1 gram"],
      ["Which unit is best for a single raisin?", "Grams", "Kilograms"], addMass, addMass, kgToG
    ]),
    les("Measuring liquids", [
      ["Volume", "🥛", "<b>Volume</b> tells how much space a liquid takes up. We use <b>milliliters</b> (mL) and <b>liters</b> (L)."],
      ["Which unit?", "🥄", "A spoon of medicine is a few mL. A big bottle of soda is 2 liters. <b>1 liter = 1000 mL</b>."],
      ["Reading a jug", "🫗", "Put the jug on a flat table and read the line at the top of the water at eye level."]
    ], ["Think about how much liquid there is. A little or a lot?", "Small amounts use mL. Big amounts use liters. 1 liter is 1000 mL.", "Example: a teaspoon holds a tiny amount, so it is measured in mL. Now try yours."], [
      ["Which unit is best for a teaspoon of syrup?", "Milliliters", "Liters"], ["Which unit is best for a big bathtub of water?", "Liters", "Milliliters"], ["1 liter is the same as how many milliliters?", "1000 mL", "10 mL", "100 mL"],
      ["Which tool measures liquid?", "A measuring jug", "A ruler", "A scale only"], ["Which is more water?", "1 liter", "1 milliliter"], ["Where should the jug be when you read it?", "On a flat table", "In the air", "Tilted on its side"],
      addMl, addMl
    ]),
    les("Atoms and elements", [
      ["Tiny atoms", "⚛️", "Everything is made of tiny <b>atoms</b>. They are far too small to see."],
      ["Elements", "🥇", "An <b>element</b> is made of only one kind of atom. Gold, iron, oxygen and carbon are elements."],
      ["Not an element", "💧", "Water is not an element. It is made of two kinds of atoms joined together."]
    ], ["An element has just one kind of atom in it.", "Gold, iron, oxygen, carbon and silver are elements. Water and salt are made of more than one kind of atom.", "Example: gold is made only of gold atoms, so it is an element. Now try yours."], [
      ["Which one is an element?", "Gold", "Water", "Lemonade"], ["Which one is an element?", "Oxygen", "Salt water", "Soup"], ["Which one is an element?", "Iron", "Orange juice", "Cake"],
      ["An element is made of how many kinds of atom?", "Only one kind", "Two kinds", "Ten kinds"], ["Everything is made of tiny...", "Atoms", "Clouds", "Boxes"], ["Can you see a single atom with your eyes?", "No, it is too small", "Yes, easily"],
      ["Which one is an element?", "Carbon", "Pizza", "Milk"]
    ]),
    les("Element symbols", [
      ["Short names", "🔤", "Scientists give each element a short <b>symbol</b> made of letters."],
      ["First ones", "O  H  C  N", "<b>O</b> is oxygen. <b>H</b> is hydrogen. <b>C</b> is carbon. <b>N</b> is nitrogen."],
      ["Tip", "💡", "Symbols always start with a capital letter. You will use them in the periodic table."]
    ], ["Match the symbol to the element name.", "O is for oxygen, H for hydrogen, C for carbon and N for nitrogen.", "Example: the symbol for oxygen is O, like the first letter of its name. Now try yours."], [
      ["What is the symbol for oxygen?", "O", "H", "C"], ["What is the symbol for hydrogen?", "H", "O", "N"], ["What is the symbol for carbon?", "C", "H", "O"], ["What is the symbol for nitrogen?", "N", "C", "H"],
      ["Which element has the symbol C?", "Carbon", "Oxygen", "Hydrogen"], ["Which element has the symbol H?", "Hydrogen", "Oxygen", "Carbon"], ["Which element has the symbol O?", "Oxygen", "Nitrogen", "Carbon"],
      ["Which element has the symbol N?", "Nitrogen", "Oxygen", "Hydrogen"]
    ]),
    les("Metals", [
      ["Shiny and strong", "🔩", "<b>Metals</b> are usually shiny, hard and strong. Iron, gold, silver and copper are metals."],
      ["Heat and electricity", "⚡", "Metals carry heat and electricity well. Wires are made of metal, often copper."],
      ["Bendy", "🥄", "Metals can be bent and shaped. Aluminum foil is a metal squeezed very thin."]
    ], ["Think of things that are shiny, strong and can be shaped.", "Iron, gold, silver, copper and aluminum are metals. Wood, glass and plastic are not.", "Example: a metal spoon is shiny and strong, so it is made of metal. Now try yours."], [
      ["Which one is a metal?", "Iron", "Glass", "Wood"], ["Which one is a metal?", "Gold", "Plastic", "Paper"], ["Electric wires are often made of which metal?", "Copper", "Wood", "Glass"],
      ["Which one is a metal?", "Aluminum foil", "A cotton ball", "A sponge"], ["Metals are usually...", "Shiny and strong", "Soft and fluffy", "Clear like glass"], ["Which one is a metal?", "Silver", "Rubber", "Candle wax"],
      ["Can metal carry heat and electricity well?", "Yes", "No"]
    ]),
    les("Evaporation", [
      ["Liquid to gas", "☀️", "When a liquid warms up, it can turn into a gas. This is called <b>evaporation</b>."],
      ["Puddles disappear", "🌧️", "A puddle dries in the sun because the water evaporates into the air as <b>water vapor</b>."],
      ["Faster", "🌬️", "Warm and windy days dry things faster. Wet clothes dry faster in the sun."]
    ], ["Evaporation is a liquid becoming a gas.", "Heat and wind make evaporation happen faster. The water goes into the air as vapor.", "Example: a wet towel on a sunny line dries because the water evaporates. Now try yours."], [
      ["Evaporation is when a liquid turns into a...", "Gas", "Solid", "Rock"], ["Why does a puddle disappear in the sun?", "The water evaporates", "The ground eats it", "It turns into sand"],
      ["Which dries faster?", "Clothes in the hot sun", "Clothes in a cold, dark room"], ["Water in the air as a gas is called...", "Water vapor", "Ice", "Mud"],
      ["What helps water evaporate faster?", "Heat", "Cold", "Darkness"], ["Where does the water go when a wet towel dries?", "Into the air", "Into the floor", "Nowhere, it vanishes"],
      ["Which word means a liquid turning into a gas?", "Evaporation", "Freezing", "Melting"]
    ]),
    les("Condensation", [
      ["Gas to liquid", "🥶", "When a gas cools down, it can turn back into a liquid. This is <b>condensation</b>."],
      ["Cold glass", "🥤", "Water drops form on the outside of a cold glass. The water vapor in the air cools and turns into drops."],
      ["Clouds", "☁️", "Clouds are made of tiny drops that formed when water vapor cooled high in the sky."]
    ], ["Condensation is the opposite of evaporation.", "A gas cools down and becomes tiny drops of liquid.", "Example: a bathroom mirror gets foggy because warm vapor cools on it. Now try yours."], [
      ["Condensation is when a gas turns into a...", "Liquid", "Solid rock", "Metal"], ["Why do drops form on a cold glass?", "Water vapor cools into drops", "The glass leaks", "The glass makes water"],
      ["Which is the opposite of evaporation?", "Condensation", "Melting", "Burning"], ["What are clouds made of?", "Tiny water drops", "Cotton", "Smoke"],
      ["A foggy mirror after a hot shower is...", "Condensation", "Rust", "Burning"], ["Does cooling make water vapor turn into drops?", "Yes", "No"],
      ["What kind of air carries water vapor?", "Air with vapor in it", "Only the ground"]
    ]),
    les("Boiling", [
      ["Hot enough", "♨️", "When water gets very hot, bubbles form and rise. It is <b>boiling</b>."],
      ["How hot?", "🌡️", "Water boils at <b>100 °C</b>. The bubbles are water vapor, and the gas that rises is steam."],
      ["Be safe", "🧤", "Boiling water can burn you. Only a grown-up should handle hot pots and kettles."]
    ], ["Think about a kettle on the stove. What happens when the water gets very hot?", "Water boils at 100 degrees Celsius. It turns into steam, which is a gas.", "Example: soup bubbles in a pot when it is boiling. Now try yours."], [
      ["At what temperature does water boil?", "100 °C", "10 °C", "0 °C"], ["The gas that rises from boiling water is called...", "Steam", "Ice", "Sand"], ["Who should handle a pot of boiling water?", "A grown-up", "A baby", "A pet"],
      ["What do you see in boiling water?", "Bubbles", "Snow", "Rocks"], ["Is steam hot or cold?", "Hot", "Cold"], ["Boiling turns liquid water into...", "A gas", "A solid", "Metal"],
      ["Which is hotter?", "Boiling water", "Water from the cold tap"]
    ]),
    les("Dissolving faster", [
      ["Hot and cold", "☕", "Sugar dissolves faster in <b>hot</b> tea than in cold tea. Heat helps the water pull the sugar apart."],
      ["Stir it", "🥄", "Stirring helps too. It moves the sugar around so more of it meets the water."],
      ["Small pieces", "🧂", "Small bits, like powder, dissolve faster than big lumps. A sugar cube is slower than loose sugar."]
    ], ["Three things make dissolving faster: heat, stirring and small pieces.", "Warm water, a stir and smaller bits all speed it up.", "Example: powdered sugar dissolves faster than a big sugar cube. Now try yours."], [
      ["Which dissolves sugar faster?", "Hot water", "Cold water"], ["What helps sugar dissolve faster?", "Stirring", "Leaving it alone", "Covering it"], ["Which dissolves faster?", "Loose sugar", "A big sugar cube"],
      ["Which dissolves salt faster?", "Warm water, stirred", "Cold water, not stirred"], ["Which dissolves faster?", "Tiny crumbs of salt", "One big lump of salt"], ["What does stirring do?", "Moves bits around so they dissolve faster", "Makes the water cold"],
      ["Which helps hot chocolate powder dissolve?", "Stirring in hot milk", "Dropping it on the table"]
    ]),
    les("Crush it, stir it", [
      ["Surface", "🔍", "Crushing something makes lots of small bits. More of it touches the water, so it dissolves quicker."],
      ["Fair test", "📋", "To test fairly, change only <b>one</b> thing. Keep the same amount of water and the same amount of sugar."],
      ["Predict", "💭", "Before you test, make a <b>prediction</b>. Then compare it with what really happens."]
    ], ["A fair test changes only one thing at a time.", "Keep everything the same except the one thing you want to test.", "Example: to test if hot water is faster, use the same sugar and the same cup, but change only the temperature. Now try yours."], [
      ["To test hot against cold water, what should you change?", "Only the temperature", "Everything", "Nothing"], ["In a fair test, the amount of sugar should be...", "The same each time", "Different each time"],
      ["A prediction is a guess about what will...", "Happen", "Taste good"], ["Crushing a sugar cube makes it dissolve...", "Faster", "Slower", "Never"], ["Why do scientists test fairly?", "So the result is trustworthy", "So the test is longer"],
      ["You test stirring. You stir one cup and not the other. What stays the same?", "The water and the sugar", "Nothing at all"], ["More small bits touching the water means dissolving is...", "Quicker", "Slower"]
    ]),
    les("Filtering", [
      ["Catching bits", "☕", "A <b>filter</b> has tiny holes. It lets water through but catches bigger solid bits."],
      ["Muddy water", "🌊", "Pour muddy water through a coffee filter. The mud and sand stay on the paper. Clearer water drips out."],
      ["Dissolved things", "🧂", "Dissolved things, like salt in water, are too tiny to be caught. They go right through the filter."]
    ], ["Think: is the bit big enough to be stuck on the filter?", "Sand and mud are caught. Salt that has dissolved in the water goes through.", "Example: a coffee filter keeps the coffee grounds but lets the liquid through. Now try yours."], [
      ["A filter catches...", "Sand", "Dissolved salt", "Water"], ["What goes through a filter easily?", "Water", "Big stones", "Sand"], ["Does a filter catch dissolved sugar?", "No, it goes through", "Yes, every bit"],
      ["Which can a filter separate from water?", "Sand", "Dissolved salt"], ["A coffee filter keeps back the...", "Coffee grounds", "Hot water"], ["A filter has lots of...", "Tiny holes", "Big gaps"],
      ["Muddy water poured through a filter comes out...", "Clearer", "Muddier"]
    ]),
    les("Salt from sea water", [
      ["Salty sea", "🌊", "Sea water has salt <b>dissolved</b> in it. You cannot see the salt, but you can taste it."],
      ["Let it dry", "☀️", "Leave salty water in a shallow dish in the sun. The water evaporates, but the salt cannot, so it stays behind."],
      ["Real life", "🧂", "Some salt is made this way, in big shallow pools by the sea."]
    ], ["Water can evaporate. What can not?", "Only the water turns into a gas and leaves. The salt stays in the dish.", "Example: when a puddle of salty water dries, white crumbs of salt are left. Now try yours."], [
      ["What is left when salty water dries up?", "Salt", "Sugar", "Nothing"], ["What evaporates from salty water?", "The water", "The salt"], ["Sea water has salt that is...", "Dissolved", "Frozen", "Burning"],
      ["Where can salt be made from the sea?", "Shallow pools in the sun", "Deep in a freezer", "In a closed box"], ["The sun helps make salt by making the water...", "Evaporate", "Freeze", "Turn into rock"],
      ["Does salt evaporate with the water?", "No, it stays", "Yes, it floats away"], ["Which tool separates dissolved salt: a filter or evaporation?", "Evaporation", "A filter"]
    ]),
    les("Baking soda and vinegar", [
      ["A fizzy mix", "🌋", "Mix baking soda with vinegar and it fizzes. Bubbles of gas appear."],
      ["New gas", "🫧", "The gas is <b>carbon dioxide</b>. It is a new thing that was not there before, so this is a <b>chemical change</b>."],
      ["Safe fun", "🥽", "Do this with a grown-up, in a tray, and wear goggles. Never taste the mix."]
    ], ["Look for clues that something new was made, like bubbles.", "Bubbles of gas show a chemical change. The gas here is carbon dioxide.", "Example: fizzy soda has carbon dioxide gas bubbles too. Now try yours."], [
      ["What do you see when baking soda meets vinegar?", "Fizzy bubbles", "Snow", "Smoke from a fire"], ["The gas that makes the bubbles is...", "Carbon dioxide", "Gold", "Milk"], ["Is this a chemical change?", "Yes, a new gas is made", "No, nothing happens"],
      ["Who should you do this with?", "A grown-up", "A stranger"], ["Should you taste the mix?", "No, never", "Yes, always"], ["What should you wear?", "Goggles", "A hat only"],
      ["Which two things fizz together?", "Baking soda and vinegar", "Sand and water", "Salt and sugar"]
    ]),
    les("Burning needs oxygen", [
      ["Fire needs three", "🔥", "Fire needs <b>fuel</b> (like wood), <b>heat</b> and <b>oxygen</b> from the air."],
      ["Take one away", "🕯️", "Put a jar over a candle and the flame goes out when the oxygen runs low. Remove one part and the fire stops."],
      ["Burning is a change", "🪵", "When wood burns, it turns into ash and gases. It cannot be turned back into wood. That is a chemical change."]
    ], ["Fire needs three things. Which gas from the air does it use?", "Fuel, heat and oxygen. Without oxygen the flame goes out.", "Example: a candle under a jar goes out when the oxygen is used up. Now try yours."], [
      ["What gas does fire need?", "Oxygen", "Gold", "Sand"], ["What happens if a candle is covered by a jar?", "It goes out", "It gets brighter forever"], ["Which is fuel?", "Wood", "Water", "Ice"],
      ["Burning wood makes...", "Ash and gases", "New wood", "Ice"], ["Can burnt wood turn back into wood?", "No", "Yes"], ["Fire needs heat, fuel and...", "Oxygen", "Snow"],
      ["Is burning a chemical change?", "Yes", "No"]
    ]),
    les("Fire safety", [
      ["Never play", "🚫", "Matches and lighters are not toys. Only a grown-up should use them."],
      ["Smoke alarm", "🔔", "A smoke alarm beeps loudly if there is smoke. If it beeps, get out and tell a grown-up."],
      ["If clothes catch fire", "🧎", "<b>Stop, drop and roll</b>. Smoke rises, so stay low and crawl to get out."]
    ], ["Fire safety keeps everyone safe. Who handles matches?", "Never play with matches. If there is fire, get out and tell a grown-up.", "Example: when a smoke alarm beeps, you leave the house and tell a grown-up. Now try yours."], [
      ["Who should use matches?", "A grown-up", "A little kid", "A pet"], ["If your clothes catch fire, you...", "Stop, drop and roll", "Run fast", "Wave your arms"], ["Smoke rises, so you should stay...", "Low to the ground", "Standing on a chair"],
      ["A smoke alarm beeps. You...", "Get out and tell a grown-up", "Hide under the bed", "Ignore it"], ["Are matches toys?", "No, never", "Yes"], ["What does a smoke alarm do?", "Warns us of smoke", "Makes toast"],
      ["If you see a fire, you should...", "Get out and get help", "Poke it"]
    ]),
    les("Magnets", [
      ["Magnet power", "🧲", "A <b>magnet</b> pulls on some metals. Iron and steel stick to a magnet."],
      ["Not magnetic", "🪵", "Wood, plastic, glass and paper do not stick to a magnet. Some metals, like aluminum foil, do not either."],
      ["Test it", "🔎", "Hold a magnet near different things and see what it pulls."]
    ], ["A magnet likes iron and steel.", "Wood, plastic, glass and paper are not magnetic. Many nails and paper clips are steel, so they stick.", "Example: a steel paper clip sticks to a magnet. Now try yours."], [
      ["Which one sticks to a magnet?", "An iron nail", "A wooden spoon", "A glass cup"], ["Which one will NOT stick to a magnet?", "A plastic cup", "A steel paper clip", "An iron nail"], ["A magnet pulls on...", "Iron", "Paper", "Air"],
      ["Does aluminum foil stick to a magnet?", "No", "Yes"], ["Which one sticks to a magnet?", "A steel paper clip", "A rubber band", "A crayon"], ["Which is magnetic?", "A steel fork", "A paper cup", "A glass jar"],
      ["Does a magnet pull on wood?", "No", "Yes"]
    ]),
    les("Hot and cold stuff", [
      ["Heat travels", "🥄", "A metal spoon in hot soup gets hot quickly. Metal lets heat travel through it. It is a <b>conductor</b>."],
      ["Stop the heat", "🧤", "Wood, plastic, cloth and foam let heat travel slowly. They are <b>insulators</b>."],
      ["Use them", "☕", "Pot handles and oven mitts are insulators, so we do not burn our hands. A foam cup keeps coffee warm."]
    ], ["Metal passes heat quickly. What passes it slowly?", "Wood, plastic and cloth are insulators. Metal is a conductor.", "Example: a wooden spoon stays cooler than a metal spoon in soup. Now try yours."], [
      ["Which gets hot fastest in hot soup?", "A metal spoon", "A wooden spoon", "A plastic spoon"], ["An oven mitt is made of...", "An insulator", "A conductor"], ["Which is a good insulator?", "Foam", "Copper", "Iron"],
      ["Which is a conductor of heat?", "Metal", "Wool", "Foam"], ["Why do pot handles use plastic or wood?", "So hands do not get burned", "To make the pot heavy"], ["A wool sweater keeps you warm because wool is...", "An insulator", "A conductor"],
      ["Why use a foam cup for hot drinks?", "It keeps heat in", "It makes drinks colder"]
    ]),
    les("Reduce, reuse, recycle", [
      ["Three Rs", "♻️", "<b>Reduce</b> means use less. <b>Reuse</b> means use again. <b>Recycle</b> means turn old things into new ones."],
      ["Recycle these", "🥫", "Paper, glass bottles, cans and some plastics can be melted or mashed up and made into new things."],
      ["Compost", "🍌", "Banana peels and leaves rot into rich soil. That is called <b>compost</b>."]
    ], ["Think about using things again instead of throwing them away.", "Reduce = less. Reuse = again. Recycle = make new things from old ones.", "Example: using an old jar to hold pencils is reuse. Now try yours."], [
      ["Using an old jar to hold pencils is...", "Reusing", "Recycling", "Burning"], ["Which can be recycled?", "A glass bottle", "A banana peel"], ["Using less water is...", "Reducing", "Reusing", "Wasting"],
      ["Old paper can be recycled into...", "New paper", "Fresh fruit", "Water"], ["Banana peels can rot into...", "Compost", "Metal", "Glass"], ["Which is the best way to help the Earth?", "Reduce, reuse, recycle", "Throw everything away"],
      ["An aluminum can can be recycled into...", "A new can", "A banana"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [1, 3, 5, 6, 8, 10, 13, 15])),
    mix("Level 4 Challenge", at(a, [0, 2, 4, 7, 9, 11, 12, 14, 16, 17]))
  );

  // ================= LEVEL 5 =================
  const b = [
    les("Elements are pure", [
      ["Pure stuff", "🥇", "An <b>element</b> is a pure substance. It has only one kind of atom and cannot be broken into simpler stuff."],
      ["How many?", "🔢", "There are more than 100 elements. Everything in the world is built from them."],
      ["Examples", "🔩", "Gold, iron, oxygen, carbon and helium are elements. Water, salt and sugar are not."]
    ], ["An element is made of one kind of atom only.", "Gold, iron, oxygen, carbon and helium are elements. Water, salt and sugar have different atoms joined together.", "Example: copper is only copper atoms, so it is an element. Now try yours."], [
      ["Which is an element?", "Oxygen", "Salt", "Sugar"], ["Which is NOT an element?", "Water", "Gold", "Iron"], ["How many elements are there?", "More than 100", "Only 3", "Exactly 10"],
      ["An element has how many kinds of atoms?", "One", "Two", "Many"], ["Which is an element?", "Helium", "Baking soda", "Soup"], ["Which is an element?", "Copper", "Sugar", "Vinegar"],
      ["Can an element be split into simpler stuff by normal chemistry?", "No", "Yes, easily"]
    ]),
    les("The periodic table", [
      ["The element chart", "🧮", "The <b>periodic table</b> is a chart that shows all the elements in order."],
      ["Rows and columns", "📊", "A row is a <b>period</b>. A column is a <b>group</b>. Elements in the same column often act alike."],
      ["Who made it?", "📜", "A scientist named Dmitri Mendeleev made the first version of the table about 150 years ago."]
    ], ["The periodic table puts the elements in order.", "Rows go across (periods). Columns go down (groups). Elements in a column act alike.", "Example: the periodic table starts with hydrogen, the lightest element. Now try yours."], [
      ["What does the periodic table show?", "All the elements", "All the countries", "All the animals"], ["A column on the table is called a...", "Group", "Period", "Atom"], ["A row on the table is called a...", "Period", "Group", "Metal"],
      ["Elements in the same column usually...", "Act alike", "Look the same size", "Are all gold"], ["Which element comes first?", "Hydrogen", "Gold", "Iron"], ["Who made the first periodic table?", "Dmitri Mendeleev", "A baker", "A pilot"],
      ["Is the periodic table a chart?", "Yes", "No, it is a kind of cake"]
    ]),
    les("Two-letter symbols", [
      ["Longer symbols", "🔤", "Many symbols have two letters. The first is a <b>capital</b> and the second is <b>small</b>."],
      ["Surprising ones", "🥇", "<b>Fe</b> is iron. <b>Au</b> is gold. <b>Ag</b> is silver. <b>Cu</b> is copper. <b>Na</b> is sodium."],
      ["More", "💡", "<b>Ca</b> is calcium. <b>Cl</b> is chlorine. <b>He</b> is helium. <b>K</b> is potassium."]
    ], ["Some symbols come from old names, so they do not match the English name.", "Fe iron, Au gold, Ag silver, Cu copper, Na sodium, Ca calcium, Cl chlorine, He helium.", "Example: the symbol for gold is Au. Now try yours."], [
      ["What is the symbol for iron?", "Fe", "Ir", "In"], ["What is the symbol for gold?", "Au", "Go", "Ag"], ["What is the symbol for silver?", "Ag", "Au", "Si"], ["What is the symbol for copper?", "Cu", "Co", "Cp"],
      ["What is the symbol for sodium?", "Na", "So", "Sd"], ["What is the symbol for helium?", "He", "H", "Hl"], ["Which is the correct way to write sodium's symbol: a capital then a small letter?", "Yes, Na", "No, it is NA"],
      ["Which element has the symbol Ca?", "Calcium", "Carbon", "Copper"], ["Which element has the symbol Cl?", "Chlorine", "Carbon", "Calcium"]
    ]),
    les("Compounds", [
      ["Joined atoms", "🔗", "A <b>compound</b> is made when two or more different elements join together."],
      ["Examples", "💧", "Water is hydrogen and oxygen. Table salt is sodium and chlorine. Carbon dioxide is carbon and oxygen."],
      ["New stuff", "✨", "A compound is a brand new thing. It does not look like the elements it was made from."]
    ], ["A compound needs at least two different elements joined.", "Water, salt and carbon dioxide are compounds. Oxygen on its own is an element.", "Example: water is hydrogen joined with oxygen, so it is a compound. Now try yours."], [
      ["Which is a compound?", "Water", "Gold", "Oxygen"], ["A compound has...", "Two or more kinds of atoms joined", "Only one kind of atom"], ["Water is made of hydrogen and...", "Oxygen", "Carbon", "Gold"],
      ["Table salt is made of sodium and...", "Chlorine", "Oxygen", "Iron"], ["Carbon dioxide is made of carbon and...", "Oxygen", "Hydrogen", "Gold"], ["Which is a compound?", "Salt", "Silver", "Helium"],
      ["Is a compound the same as an element?", "No", "Yes"]
    ]),
    les("Counting atoms: H2O", [
      ["Chemical formulas", "🧪", "A <b>formula</b> shows which atoms are in a molecule. Water is <b>H<sub>2</sub>O</b>."],
      ["Small numbers", "🔢", "The small number after a letter tells how many atoms. H<sub>2</sub> means 2 hydrogen atoms. No number means just one."],
      ["Add them up", "➕", "H<sub>2</sub>O has 2 hydrogen and 1 oxygen, so 3 atoms in all."]
    ], ["Read the formula carefully. The small numbers tell how many.", "Water is H2O. The small number after a letter says how many atoms of that element.", "Example: H2 means two hydrogen atoms. Now try yours."], [
      countAtoms(F5), countAtoms(F5), countAtoms(F5), countAtoms(F5), countAtoms(F5), countAtoms(F5),
      ["Water has the formula...", "H2O", "CO2", "NaCl"], ["The formula H2O shows 2 hydrogen and how many oxygen?", "1", "2", "3"]
    ]),
    les("Carbon dioxide", [
      ["CO2", "💨", "<b>Carbon dioxide</b> is a gas with the formula CO<sub>2</sub>. It has 1 carbon and 2 oxygen atoms."],
      ["Where from", "🫁", "We breathe it out. Burning things make it. It makes soda fizzy."],
      ["Plants use it", "🌿", "Plants take in carbon dioxide from the air and use it to make food."]
    ], ["Carbon dioxide has a short formula you may know.", "People and animals breathe it out. Plants take it in.", "Example: the bubbles in soda pop are carbon dioxide. Now try yours."], [
      ["What is the formula for carbon dioxide?", "CO2", "H2O", "O2"], ["What gas do we breathe out?", "Carbon dioxide", "Gold", "Helium"], ["What gas do plants take in?", "Carbon dioxide", "Sand"],
      ["What puts bubbles in soda?", "Carbon dioxide", "Sugar", "Salt"], ["CO2 has how many oxygen atoms?", "2", "1", "3"], ["Burning wood makes...", "Carbon dioxide", "Gold"],
      ["Is carbon dioxide a compound?", "Yes", "No"]
    ]),
    les("Metals and non-metals", [
      ["Metals", "🔩", "Metals are shiny, carry heat and electricity well, and can bend without breaking."],
      ["Non-metals", "🪨", "Non-metals are usually dull and crumbly (brittle) and do not carry electricity well. Examples: carbon, sulfur and oxygen."],
      ["Sort them", "🗂️", "On the periodic table, metals are on the left and middle. Non-metals are mostly on the right."]
    ], ["Metals are shiny and bendy. Non-metals are dull and brittle.", "Iron, copper and aluminum are metals. Sulfur, carbon and oxygen are non-metals.", "Example: sulfur is a yellow, crumbly non-metal. Now try yours."], [
      ["Which is a metal?", "Copper", "Sulfur", "Oxygen"], ["Which is a non-metal?", "Carbon", "Iron", "Gold"], ["Metals carry electricity...", "Well", "Badly"],
      ["Which is a non-metal gas?", "Oxygen", "Aluminum", "Silver"], ["Which is usually shiny?", "A metal", "A non-metal"], ["Which is brittle and crumbly?", "Sulfur", "Copper wire", "A gold ring"],
      ["Which is a metal?", "Aluminum", "Carbon", "Sulfur"]
    ]),
    les("Physical changes", [
      ["Same stuff", "🧊", "In a <b>physical change</b>, the stuff stays the same. It only changes its shape, size or state."],
      ["Examples", "✂️", "Melting ice, tearing paper, crushing a can and dissolving sugar are physical changes."],
      ["Undo it?", "↩️", "Many physical changes can be undone. Freeze the melted ice and you get ice again."]
    ], ["Ask: is it still the same kind of stuff afterward?", "Ice that melts is still water. Torn paper is still paper.", "Example: cutting an apple is a physical change, because it is still apple. Now try yours."], [
      ["Which is a physical change?", "Melting ice", "Burning wood", "Rusting iron"], ["Which is a physical change?", "Tearing paper", "Baking a cake", "A banana rotting"], ["Which is a physical change?", "Crushing a can", "Burning a candle"],
      ["After a physical change, the stuff is...", "Still the same kind of stuff", "A totally new stuff"], ["Dissolving sugar in water is a...", "Physical change", "Chemical change"], ["Which can be undone by freezing?", "Melted ice", "A burnt log"],
      ["Cutting a carrot is a...", "Physical change", "Chemical change"]
    ]),
    les("Chemical changes", [
      ["New stuff", "🔥", "In a <b>chemical change</b>, new stuff with new properties is made."],
      ["Examples", "🎂", "Baking a cake, burning wood, rusting iron and a banana turning brown are chemical changes."],
      ["Hard to undo", "🚫", "Most chemical changes cannot be undone. You cannot turn a burnt log back into wood."]
    ], ["Ask: was something new made?", "Burning, rusting, rotting and cooking make new stuff.", "Example: toast cannot go back to bread, so toasting is a chemical change. Now try yours."], [
      ["Which is a chemical change?", "Burning wood", "Melting ice", "Folding paper"], ["Which is a chemical change?", "Rusting iron", "Cutting grass", "Mixing salt and water"], ["Which is a chemical change?", "Baking a cake", "Breaking a plate"],
      ["After a chemical change, you get...", "New stuff", "The same stuff"], ["Can you turn a burnt log back into wood?", "No", "Yes"], ["A banana rotting is a...", "Chemical change", "Physical change"],
      ["Which is a chemical change?", "Milk going sour", "Pouring milk"]
    ]),
    les("Clues of a reaction", [
      ["Look for clues", "🔍", "A chemical change is also called a <b>reaction</b>. Clues: <b>bubbles</b>, a <b>color change</b>, <b>heat or light</b>, a new <b>smell</b>, or a new <b>solid</b>."],
      ["Examples", "🧪", "Fizzing when baking soda meets vinegar. Fire giving off heat and light. Milk smelling sour."],
      ["Careful", "⚠️", "One clue is not always proof. Boiling water makes bubbles, but it is a physical change."]
    ], ["Look at what you can see, feel or smell.", "Bubbles of new gas, a color change, heat, light and a new smell are clues.", "Example: an apple slice turning brown is a color change, a clue of a reaction. Now try yours."], [
      ["Which is a clue of a chemical reaction?", "A color change", "Cutting something in half"], ["Which is a clue?", "Fizzing bubbles of new gas", "Ice cubes floating"], ["Which is a clue?", "Heat and light from a fire", "Folding a paper"],
      ["Which is a clue?", "A new bad smell", "A smaller piece"], ["A candle gives off...", "Heat and light", "Only cold"], ["Baking soda and vinegar fizz. That is a clue of...", "A reaction", "Freezing"],
      ["A rusty nail turning orange shows...", "A color change", "A bubble"]
    ]),
    les("Mass stays the same", [
      ["Nothing lost", "⚖️", "When things change, no matter disappears and none is created. The <b>total mass stays the same</b>."],
      ["Melting", "🧊", "A 50 g ice cube melts. You get 50 g of water. The mass did not change."],
      ["Mixing", "🥄", "If 10 g of sugar dissolves in 90 g of water, the sugar water weighs 100 g."]
    ], ["Think about whether any matter is lost or gained.", "Nothing is lost or made. The total mass stays the same.", "Example: a snowman melts into a puddle with the same mass. Now try yours."], [
      mass, mass, mass, mass, mass, mass,
      ["Ice melts into water. Does the mass change?", "No, it stays the same", "Yes, it vanishes"], ["You dissolve sugar in water. The total mass is...", "The same as before", "Zero"]
    ]),
    les("Mixture or solution?", [
      ["Mixtures", "🥗", "A <b>mixture</b> has different things mixed, and you can often still see the parts. A salad is a mixture."],
      ["Solutions", "🧂", "A <b>solution</b> is a special mixture. One thing dissolves completely, so it looks like one clear thing. Salt in water is a solution."],
      ["Parts", "🔍", "The thing that dissolves is the <b>solute</b>. The liquid it dissolves in is the <b>solvent</b>."]
    ], ["In a solution, you cannot see the dissolved part.", "If you can still see the pieces, it is a mixture. If it dissolved and looks clear or even, it is a solution.", "Example: sugar stirred in water disappears, so it is a solution. Now try yours."], [
      ["Which is a solution?", "Salt dissolved in water", "Sand in water", "Rocks in a bucket"], ["Which is a mixture you can still see parts of?", "Sand and water", "Salt dissolved in water"], ["In salt water, the solvent is...", "Water", "Salt"],
      ["In salt water, the solute is...", "Salt", "Water"], ["Which is a mixture?", "A fruit salad", "A glass of pure water"], ["Which is a solution?", "Sugar dissolved in tea", "Cereal in milk"],
      ["A solution looks like...", "One even thing", "Many separate bits"]
    ]),
    les("Saturated solutions", [
      ["Full up", "🫙", "You can only dissolve so much. When no more will dissolve, the solution is <b>saturated</b>."],
      ["Settles down", "⬇️", "Extra sugar will fall to the bottom and stay there."],
      ["Warm helps", "☕", "Warm water can dissolve more than cold water, so heat lets you add more."]
    ], ["Saturated means full. No more can dissolve.", "When the water cannot take any more, the extra settles at the bottom. Warm water holds more.", "Example: after many spoons of sugar, some sugar sits at the bottom, so the water is saturated. Now try yours."], [
      ["A saturated solution can...", "Dissolve no more", "Dissolve unlimited amounts"], ["Extra sugar that will not dissolve...", "Settles at the bottom", "Floats to the sky"], ["Which usually dissolves more sugar?", "Warm water", "Cold water"],
      ["When no more salt dissolves, the water is...", "Saturated", "Empty", "Frozen"], ["The liquid that does the dissolving is the...", "Solvent", "Solute"], ["The thing that gets dissolved is the...", "Solute", "Solvent"],
      ["You keep adding sugar to tea and it piles up. The tea is...", "Saturated", "Out of water"]
    ]),
    les("Sink or float: density", [
      ["Packed stuff", "🪨", "<b>Density</b> tells how tightly the stuff is packed. Dense things are packed tightly."],
      ["Sink or float", "🌊", "Things that are denser than water sink. Things that are less dense than water float."],
      ["Layers", "🍯", "Honey, water and oil poured together make layers. Honey is the densest, so it sinks to the bottom. Oil is the least dense, so it floats on top."]
    ], ["Compare how dense the object is with water.", "More dense than water sinks. Less dense than water floats.", "Example: a stone is denser than water, so it sinks. Now try yours."], [
      ["Which will float on water?", "A cork", "An iron nail", "A stone"], ["Which will sink in water?", "An iron nail", "A cork", "A dry leaf"], ["Oil poured on water will...", "Float on top", "Sink to the bottom"],
      ["In honey, water and oil layers, which is on the bottom?", "Honey", "Oil", "Water"], ["Ice floats in water because it is...", "Less dense than water", "More dense than water"], ["Which is denser than water?", "A rock", "A piece of foam"],
      ["Something that sinks is...", "Denser than water", "Lighter than air"]
    ]),
    les("Acids", [
      ["Sour stuff", "🍋", "<b>Acids</b> taste sour. Lemons, oranges, and vinegar all contain acids."],
      ["Careful", "🥽", "Some acids are very strong and can hurt skin. In a lab we never taste, and we wear goggles."],
      ["Fizz", "🫧", "Acids can fizz when mixed with baking soda."]
    ], ["Think of sour tastes in foods.", "Lemon juice and vinegar are acids. Strong acids can be harmful.", "Example: vinegar is a sour acid. Now try yours."], [
      ["Which is an acid?", "Lemon juice", "Soap", "Baking soda"], ["Acids usually taste...", "Sour", "Sweet", "Salty"], ["Which has an acid in it?", "Vinegar", "Sugar", "Plain water"],
      ["Do we taste unknown liquids in a lab?", "Never", "Always"], ["Which fruit contains acid?", "Orange", "A rock"], ["What fizzes with an acid?", "Baking soda", "Sand", "Paper"],
      ["Should you touch strong acids?", "No, never", "Yes"]
    ]),
    les("Bases", [
      ["Opposite of acid", "🧼", "<b>Bases</b> are the opposite of acids. They can taste bitter and feel slippery."],
      ["Home bases", "🏠", "Soap and baking soda are bases. Cleaning products can be strong bases, so never mix or taste them."],
      ["Balance", "⚖️", "A base and an acid can cancel each other out."]
    ], ["Bases feel slippery. Acids are sour.", "Soap, baking soda and many cleaners are bases.", "Example: slippery soap is a base. Now try yours."], [
      ["Which is a base?", "Soap", "Lemon juice", "Vinegar"], ["Which is a base?", "Baking soda", "Orange juice", "Lemonade"], ["Bases can feel...", "Slippery", "Fuzzy"],
      ["An acid and a base can...", "Cancel each other out", "Make a rock"], ["Which tastes sour: an acid or a base?", "An acid", "A base"], ["Should you mix cleaning products together?", "No, never", "Yes"],
      ["Soap feels...", "Slippery", "Sticky like glue"]
    ]),
    les("Indicators", [
      ["Color testers", "🥬", "An <b>indicator</b> changes color to show an acid or a base. Red cabbage juice is a natural indicator."],
      ["Cabbage colors", "🎨", "In acids it turns pink or red. In bases it turns blue or green. In plain water it stays purple."],
      ["Litmus paper", "📄", "Litmus paper turns <b>red</b> in an acid and <b>blue</b> in a base."]
    ], ["An indicator uses color to tell you something.", "Acid makes cabbage juice pink or red. Base makes it blue or green.", "Example: cabbage juice turns pink in lemon juice, so lemon juice is an acid. Now try yours."], [
      ["Red cabbage juice turns pink in...", "An acid", "A base"], ["Red cabbage juice turns blue-green in...", "A base", "An acid"], ["Litmus paper turns red in...", "An acid", "A base"],
      ["Litmus paper turns blue in...", "A base", "An acid"], ["An indicator shows us...", "If something is an acid or a base", "How tall a thing is"], ["Cabbage juice in lemon juice turns...", "Pink", "Green"],
      ["Cabbage juice in soapy water turns...", "Blue or green", "Pink"]
    ]),
    les("Stopping rust", [
      ["Rust needs two", "🔩", "Iron rusts when it touches <b>water</b> and <b>oxygen</b> together."],
      ["Block them", "🎨", "Paint, oil or a coating of zinc keeps water and air away. Dry iron does not rust."],
      ["Stainless steel", "🍴", "Stainless steel is mixed with other metals so it rusts much less. Forks and sinks use it."]
    ], ["To stop rust, keep water and air away from iron.", "Paint, oil and dry storage stop rust. Stainless steel resists it.", "Example: a painted fence rusts slowly because paint keeps water away. Now try yours."], [
      ["What does iron need to rust?", "Water and oxygen", "Only sand", "Only light"], ["How can you stop rust?", "Paint it", "Leave it in the rain"], ["Does dry iron in a dry place rust easily?", "No", "Yes, fast"],
      ["Which rusts less?", "Stainless steel", "A plain iron nail left in rain"], ["Oil on a tool helps keep away...", "Water", "Light"], ["Rust is what color?", "Orange-brown", "Bright blue"],
      ["Why do bike chains get oiled?", "To help stop rust", "To make them heavier"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [2, 4, 6, 7, 9, 11, 13, 16])),
    mix("Level 5 Challenge", at(b, [0, 1, 3, 5, 8, 10, 12, 14, 15, 17]))
  );

  // ================= LEVEL 6 =================
  const c = [
    les("Inside an atom", [
      ["Three parts", "⚛️", "An atom has three kinds of particles: <b>protons</b>, <b>neutrons</b> and <b>electrons</b>."],
      ["The nucleus", "🎯", "Protons (positive +) and neutrons (no charge) sit in the middle, the <b>nucleus</b>."],
      ["Electrons", "🌀", "Electrons (negative −) zoom around the outside. They are much, much lighter than protons."]
    ], ["Think about the middle of the atom and the outside.", "Protons and neutrons are in the nucleus. Electrons whirl around it. Protons are positive, electrons negative, neutrons neutral.", "Example: the nucleus is in the middle and holds the protons and neutrons. Now try yours."], [
      ["Which particle is positive?", "Proton", "Electron", "Neutron"], ["Which particle is negative?", "Electron", "Proton", "Neutron"], ["Which particle has no charge?", "Neutron", "Proton", "Electron"],
      ["The middle of the atom is called the...", "Nucleus", "Shell", "Cell"], ["Which particles are in the nucleus?", "Protons and neutrons", "Electrons only"], ["Electrons move...", "Around the nucleus", "Inside the proton"],
      ["Which particle is lightest?", "Electron", "Proton", "Neutron"]
    ]),
    les("Atomic number", [
      ["Its ID", "🔢", "The <b>atomic number</b> is the number of protons in an atom. It is the atom's ID: it tells you which element it is."],
      ["Examples", "📋", "Hydrogen has 1 proton. Carbon has 6. Oxygen has 8. Sodium has 11."],
      ["Balanced", "⚖️", "A neutral atom has the same number of electrons as protons, so the charges cancel."]
    ], ["The atomic number is special. It counts one kind of particle.", "Atomic number = protons. A neutral atom has the same number of electrons.", "Example: hydrogen has one proton and one electron. Now try yours."], [
      protons, protons, protons, protons, protons, protons, protons,
      ["The atomic number counts the...", "Protons", "Electrons only", "Cells"], ["Hydrogen has how many protons?", "1", "2", "8"]
    ]),
    les("Counting atoms in formulas", [
      ["Bigger formulas", "🔬", "Count each letter's small number. Glucose is <b>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></b>: 6 carbon, 12 hydrogen and 6 oxygen atoms."],
      ["No number", "1️⃣", "A letter with no small number means one atom. In CH<sub>4</sub> there is one C and four H."],
      ["Add them all", "➕", "To find the total, add them: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> has 6 + 12 + 6 = 24 atoms."]
    ], ["Read the formula carefully. The small numbers tell how many.", "A letter with no small number means just one atom.", "Example: H2 means two hydrogen atoms. Now try yours."], [
      countAtoms(F6), countAtoms(F6), countAtoms(F6), countAtoms(F6), countAtoms(F6), countAtoms(F6), countAtoms(F6), countAtoms(F6)
    ]),
    les("Everyday compounds", [
      ["Names and formulas", "📛", "Every compound has a name and a formula. Table salt is <b>NaCl</b>. Water is <b>H<sub>2</sub>O</b>."],
      ["More", "🧁", "Baking soda is NaHCO<sub>3</sub>. Carbon dioxide is CO<sub>2</sub>. Chalk and limestone are mostly CaCO<sub>3</sub>."],
      ["Natural gas", "🔥", "The gas in a kitchen stove is mostly methane, <b>CH<sub>4</sub></b>."]
    ], ["Match the name to its formula.", "NaCl is salt, H2O is water, CO2 is carbon dioxide, CH4 is methane.", "Example: salt is NaCl, sodium and chlorine. Now try yours."], [
      ["What is the formula of table salt?", "NaCl", "H2O", "CO2"], ["What is the formula of water?", "H2O", "NaCl", "CH4"], ["What is the formula of carbon dioxide?", "CO2", "H2O", "NaCl"],
      ["What is CH4 called?", "Methane", "Water", "Salt"], ["Baking soda has the formula...", "NaHCO3", "CO2", "H2O"], ["NaCl is made of sodium and...", "Chlorine", "Carbon", "Calcium"],
      ["Which is the formula for chalk and limestone?", "CaCO3", "NaCl", "H2O"]
    ]),
    les("Reactants and products", [
      ["Starting and ending", "➡️", "In a reaction the starting stuff is the <b>reactants</b>. The new stuff is the <b>products</b>."],
      ["An equation", "📝", "We write: reactants → products. The arrow means 'make'. Example: baking soda + vinegar → carbon dioxide + water + more."],
      ["Same atoms", "🧩", "The atoms are only rearranged. They are not lost or made. This is why mass stays the same."]
    ], ["Reactants go in. Products come out.", "The reactants are on the left of the arrow. The products are on the right.", "Example: in hydrogen + oxygen → water, water is the product. Now try yours."], [
      ["In 'iron + oxygen → rust', rust is the...", "Product", "Reactant"], ["In 'iron + oxygen → rust', iron is a...", "Reactant", "Product"], ["Reactants are the...", "Starting stuff", "Ending stuff"],
      ["Products are the...", "New stuff made", "Stuff you start with"], ["The arrow in a reaction means...", "Makes", "Takes away"], ["In reactions, atoms are...", "Rearranged", "Destroyed"],
      ["In 'hydrogen + oxygen → water', the reactants are...", "Hydrogen and oxygen", "Water only"]
    ]),
    les("Burning is a reaction", [
      ["Fuel + oxygen", "🔥", "Burning, or <b>combustion</b>, is a reaction: fuel + oxygen → carbon dioxide + water + heat and light."],
      ["Candle", "🕯️", "The wax is the fuel. The flame uses oxygen from the air and makes heat, light, carbon dioxide and water vapor."],
      ["Smother it", "🧯", "Taking away oxygen, heat or fuel stops a fire. A fire blanket takes away oxygen."]
    ], ["Burning needs fuel and a gas from the air.", "Fuel and oxygen make carbon dioxide, water, heat and light.", "Example: burning methane gas in a stove makes carbon dioxide and water. Now try yours."], [
      ["Combustion is another word for...", "Burning", "Freezing", "Dissolving"], ["Burning uses fuel and...", "Oxygen", "Gold"], ["Burning gives off...", "Heat and light", "Only cold"],
      ["Which gas does burning make?", "Carbon dioxide", "Helium"], ["How does a fire blanket stop a fire?", "It cuts off oxygen", "It adds fuel"], ["The wax in a candle is the...", "Fuel", "Product only"],
      ["Which stops a fire?", "Removing oxygen", "Adding more fuel"]
    ]),
    les("Photosynthesis", [
      ["Plants make food", "🌱", "Plants make their own food using light. This is <b>photosynthesis</b>."],
      ["The recipe", "📜", "Carbon dioxide + water + light → sugar + oxygen."],
      ["Green helper", "🍃", "The green stuff in leaves is <b>chlorophyll</b>. It catches sunlight."]
    ], ["Plants use three things and make two.", "In: carbon dioxide, water and light. Out: sugar and oxygen.", "Example: a leaf takes in carbon dioxide from the air and gives out oxygen. Now try yours."], [
      ["Plants make sugar and...", "Oxygen", "Plastic", "Gold"], ["Plants take in which gas from air?", "Carbon dioxide", "Oxygen only"], ["What catches sunlight in a leaf?", "Chlorophyll", "Rust"],
      ["Photosynthesis needs light, water and...", "Carbon dioxide", "Sugar"], ["What do plants give out?", "Oxygen", "Carbon dioxide only"], ["The green color in leaves comes from...", "Chlorophyll", "Rust"],
      ["Plants make their own...", "Food", "Metal"]
    ]),
    les("Rust reaction", [
      ["Iron + oxygen", "🔩", "Rust is a chemical reaction: iron + oxygen (with water) → <b>iron oxide</b>, which is rust."],
      ["New stuff", "🟠", "Rust is not iron. It is orange-brown, flaky and weak."],
      ["Slow burning", "🐢", "Rusting is slow. It makes a little heat, but you cannot feel it. Burning is the same kind of reaction, just fast."]
    ], ["Rust is a new substance. What two things make it with iron?", "Iron joins with oxygen (and water) to make iron oxide.", "Example: iron + oxygen → iron oxide, so iron oxide is the product. Now try yours."], [
      ["Rust is also called...", "Iron oxide", "Iron water", "Gold dust"], ["Rust is made when iron meets oxygen and...", "Water", "Sugar"], ["Is rust the same as iron?", "No, it is new stuff", "Yes"],
      ["Rust is...", "Flaky and weak", "Stronger than iron"], ["In rusting, the reactants are iron and...", "Oxygen", "Gold"], ["Rusting is a...", "Chemical change", "Physical change"],
      ["Is rusting fast or slow?", "Slow", "Fast"]
    ]),
    les("The pH scale", [
      ["Measuring acid", "📏", "The <b>pH scale</b> goes from 0 to 14. It tells how acidic or basic something is."],
      ["Seven in the middle", "⚖️", "<b>7</b> is neutral, like pure water. Below 7 is an acid. Above 7 is a base."],
      ["Examples", "🍋", "Lemon juice is about 2 (acid). Pure water is 7. Soap and baking soda are above 7 (bases)."]
    ], ["Below the middle is acid and above is base.", "Seven is neutral. Smaller numbers are more acidic. Larger numbers are more basic.", "Example: pH 3 is an acid, because it is below 7. Now try yours."], [
      ["What pH is pure water?", "7", "1", "14"], ["A pH of 2 is...", "A strong acid", "A base", "Neutral"], ["A pH of 10 is...", "A base", "An acid", "Neutral"],
      ["Which is more acidic?", "pH 2", "pH 6"], ["Which is more basic?", "pH 12", "pH 8"], ["The pH scale goes from 0 to...", "14", "7", "100"],
      ["Lemon juice has a pH that is...", "Low (an acid)", "High (a base)"], ["Soap has a pH that is...", "Above 7", "Below 7"]
    ]),
    les("Neutralizing", [
      ["Acid meets base", "⚖️", "When an acid and a base react they <b>neutralize</b> each other. They make a salt and water."],
      ["Real life", "💊", "A sour stomach has too much acid. An antacid is a mild base that calms it."],
      ["Fizzy test", "🍋", "Baking soda (a base) fizzes when it touches lemon juice (an acid)."]
    ], ["Neutralizing brings the pH close to 7.", "An acid plus a base makes a salt and water. The pH moves to the middle.", "Example: baking soda on a sour spill makes it less acidic. Now try yours."], [
      ["An acid plus a base makes...", "Salt and water", "Pure gold", "Only fire"], ["Neutralizing moves the pH toward...", "7", "0", "14"], ["An antacid is a mild...", "Base", "Acid"],
      ["What does an antacid calm?", "Too much stomach acid", "A headache from noise"], ["Baking soda fizzes with...", "Lemon juice", "Sand"], ["After a perfect neutralizing, the pH is about...", "7", "2", "13"],
      ["Neutralizing needs an acid and a...", "Base", "Rock"]
    ]),
    les("Noble gases", [
      ["Group 18", "🎈", "The far-right column of the periodic table holds the <b>noble gases</b>: helium, neon, argon, and more."],
      ["Calm", "😌", "They almost never react with anything. Their outer electron shell is full."],
      ["Use them", "💡", "Helium fills balloons. Neon glows in signs. Argon fills some light bulbs."]
    ], ["Noble gases are very calm.", "Helium, neon and argon are noble gases. They hardly ever react.", "Example: helium is a noble gas used in party balloons. Now try yours."], [
      ["Which is a noble gas?", "Helium", "Oxygen", "Iron"], ["Noble gases mostly...", "Do not react", "Explode all the time"], ["What fills floating balloons?", "Helium", "Neon"],
      ["Which glows in signs?", "Neon", "Iron"], ["Which noble gas is used inside some light bulbs?", "Argon", "Gold"], ["Where are noble gases on the table?", "The far right column", "The far left"],
      ["Is neon a noble gas?", "Yes", "No"]
    ]),
    les("Alloys", [
      ["Metal mixes", "🔔", "An <b>alloy</b> is a mixture of metals (sometimes with a little carbon). Alloys are often stronger than pure metals."],
      ["Examples", "🏗️", "Steel is iron with a bit of carbon. Bronze is copper and tin. Brass is copper and zinc."],
      ["Uses", "🎺", "Steel makes bridges and tools. Bronze makes bells and statues. Brass makes musical horns."]
    ], ["An alloy is a mix of metals.", "Steel is iron plus carbon. Bronze is copper plus tin. Brass is copper plus zinc.", "Example: brass is copper mixed with zinc. Now try yours."], [
      ["Steel is mostly...", "Iron", "Plastic", "Copper"], ["Bronze is copper and...", "Tin", "Zinc", "Gold"], ["Brass is copper and...", "Zinc", "Tin", "Silver"],
      ["An alloy is a...", "Mix of metals", "Kind of plastic"], ["Alloys are often...", "Stronger than pure metal", "Weaker than wood"], ["Which is an alloy?", "Steel", "Pure gold", "Pure oxygen"],
      ["Bridges are often made of...", "Steel", "Paper"]
    ]),
    les("Melting and boiling points", [
      ["Special temperatures", "🌡️", "Every pure substance melts and boils at its own temperatures. For water: melts and freezes at <b>0 °C</b>, boils at <b>100 °C</b>."],
      ["Three states", "🧊", "Below 0 °C water is ice. From 0 to 100 °C it is liquid. Above 100 °C it is a gas."],
      ["Others differ", "🥇", "Iron melts at a very high temperature. That is why it is a solid in our world."]
    ], ["Water has two special temperatures.", "Below its freezing point it is a solid. Between freezing and boiling it is liquid. Above boiling it is a gas.", "Example: at 20 degrees water is liquid. Now try yours."], [
      waterState, waterState, waterState, waterState, waterState, waterState,
      ["At what temperature does water freeze?", "0 °C", "50 °C", "100 °C"], ["At what temperature does water boil?", "100 °C", "0 °C", "37 °C"]
    ]),
    les("Chromatography", [
      ["Splitting colors", "🖍️", "<b>Chromatography</b> separates the colors hidden in ink. Put a dot of marker on paper and dip the end in water."],
      ["How it works", "💧", "Water creeps up the paper and carries the colors. Each color moves a different distance."],
      ["Black ink", "⚫", "Many black markers are really a mix of several colors. Chromatography shows them."]
    ], ["The colors travel different distances.", "Water climbs the paper and drags the colors with it at different speeds.", "Example: green marker may split into blue and yellow. Now try yours."], [
      ["Chromatography separates...", "Colors in ink", "Metals from rocks"], ["What carries the colors up the paper?", "Water", "A magnet"], ["Black ink might be made of...", "Several colors", "Only black"],
      ["Each color moves...", "A different distance", "Exactly the same distance"], ["What do you use for chromatography?", "Paper and water", "A hammer and nail"], ["Chromatography is a way to...", "Separate a mixture", "Make a fire"],
      ["The ink should start as a...", "Small dot above the water line", "Dot under the water"]
    ]),
    les("Distillation", [
      ["Clean water", "♨️", "<b>Distillation</b> separates a liquid from what is dissolved in it. Heat the salty water. The water evaporates."],
      ["Cool it", "🥶", "Cool the steam and it condenses into clean water. The salt stays behind."],
      ["Two changes", "🔁", "Distillation uses <b>evaporation</b> then <b>condensation</b>."]
    ], ["Distillation uses two changes of state that you already know.", "Evaporate the liquid by heating, then condense the vapor by cooling.", "Example: steam hitting a cold lid and dripping is a small distillation. Now try yours."], [
      ["Distillation uses evaporation and...", "Condensation", "Freezing"], ["What stays behind when salty water is distilled?", "The salt", "The clean water"], ["Distillation can make...", "Clean water from salt water", "Gold from sand"],
      ["The steam turns back into water by...", "Cooling", "Heating more"], ["Distillation separates a liquid from...", "What is dissolved in it", "Magnets"], ["Which comes first?", "Evaporation", "Condensation"],
      ["Who should do hot experiments?", "A grown-up helping", "Nobody needs to watch"]
    ]),
    les("Conservation of mass", [
      ["Same total", "⚖️", "In a reaction the total mass of the reactants equals the total mass of the products. Atoms are only rearranged."],
      ["Sealed bag", "🛍️", "If baking soda and vinegar react in a sealed bag, the gas stays in the bag. The bag weighs the same as before."],
      ["Open top", "🔓", "In an open cup, the gas escapes into the air. It looks like the mass went down, but the gas just left."]
    ], ["Think about whether any atoms are lost.", "Atoms are only rearranged, so the total mass stays the same if nothing escapes.", "Example: a sealed bottle with a fizzy reaction weighs the same before and after. Now try yours."], [
      mass, mass, mass, mass, mass, mass,
      ["Baking soda and vinegar react in a sealed bag. Does the total mass change?", "No", "Yes, it goes up", "Yes, it goes down"], ["In an open cup the fizzy gas escapes. The cup's mass looks...", "Smaller", "Bigger"]
    ]),
    les("Heat in reactions", [
      ["Gives off heat", "🔥", "Some reactions give out heat. They are <b>exothermic</b>. Burning and hand warmers are examples."],
      ["Takes in heat", "🧊", "Some reactions take in heat from around them and feel cold. They are <b>endothermic</b>. Instant cold packs are examples."],
      ["Remember", "💡", "<b>Exo</b> means out. <b>Endo</b> means in."]
    ], ["Does the reaction make things hotter or colder?", "Exothermic gives out heat (feels hot). Endothermic takes in heat (feels cold).", "Example: a campfire gives out heat, so it is exothermic. Now try yours."], [
      ["A hand warmer is...", "Exothermic (gives out heat)", "Endothermic (takes in heat)"], ["An instant cold pack is...", "Endothermic (takes in heat)", "Exothermic (gives out heat)"], ["Burning is...", "Exothermic", "Endothermic"],
      ["Exothermic means heat goes...", "Out", "In"], ["Endothermic means heat goes...", "In", "Out"], ["A reaction that feels cold is...", "Endothermic", "Exothermic"],
      ["A candle flame is...", "Exothermic", "Endothermic"]
    ]),
    les("Plastics and polymers", [
      ["Long chains", "🔗", "Plastics are made of <b>polymers</b>: very long chains of small molecules joined like beads on a string."],
      ["From oil", "🛢️", "Many plastics are made from oil (petroleum). Some natural polymers are cotton, wool and rubber from trees."],
      ["Planet-friendly", "♻️", "Plastic lasts a very long time. Reuse and recycle it, and never litter."]
    ], ["Polymers are made of long chains.", "Plastics, cotton and wool are polymers. Many plastics start from oil.", "Example: a plastic bottle is made of polymers. Now try yours."], [
      ["A polymer is made of...", "Long chains of molecules", "One single atom"], ["Many plastics come from...", "Oil", "Sand and sea water"], ["Which is a natural polymer?", "Cotton", "A plastic bag", "Nylon"],
      ["Plastic lasts a...", "Very long time", "Few minutes"], ["Which can you recycle?", "Many plastic bottles", "Nothing"], ["Is wool a natural polymer?", "Yes", "No"],
      ["What should we do with plastic?", "Reuse or recycle", "Throw in the sea"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [1, 2, 4, 7, 8, 12, 14, 15])),
    mix("Level 6 Challenge", at(c, [0, 3, 5, 6, 9, 10, 11, 13, 16, 17]))
  );

  Object.assign(CHEM_LEVELS, { 4: a, 5: b, 6: c });
})();
