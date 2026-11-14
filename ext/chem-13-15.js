// ext/chem-13-15.js  Mind Lab Chemistry levels 13-15 (grade 6 both halves, grade 7 first half): everyday chemistry, lab skills, data, history, careers
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

  // ================= LEVEL 13 =================
  const a = [];

  a.push(les("Lab safety gear", [
    ["Protect yourself", "🥽", "Before any experiment, put on your <b>safety goggles</b>. They keep splashes and tiny flying bits out of your eyes."],
    ["Clothes and hair", "🥼", "A <b>lab coat or apron</b> protects your clothes and skin. Tie long hair back and wear <b>closed shoes</b> so nothing can spill onto your feet."],
    ["Tell and rinse", "💧", "If something spills, breaks or splashes you, <b>tell your teacher at once</b>. Skin or eyes hit by a chemical are rinsed with lots of cool water. Never eat or drink in a lab."]
  ], ["Think about which body part or item each rule is protecting.", "A safe lab rule keeps you, your clothes or other people from harm. Pick the one that does that job.", "Example: if a bottle tips over onto the bench, you stay calm and tell the teacher. Now try yours."], [
    ["Which gear protects your eyes in the lab?", "Safety goggles", "Oven gloves", "A sun hat"],
    ["Long hair in the lab should be...", "Tied back", "Left loose", "Hung over the equipment"],
    ["Why wear a lab coat or apron?", "To protect your clothes and skin from spills", "To keep the room warm", "To make chemicals mix faster"],
    ["Which shoes are best in a lab?", "Closed shoes", "Open sandals", "No shoes"],
    ["A chemical splashes in your eye. You should...", "Rinse with lots of water and tell the teacher", "Rub it hard", "Wait and see if it stops"],
    ["Eating or drinking in the lab is...", "Never allowed", "Fine if you are careful", "Fine for water only if the teacher is away"],
    ["You break a glass beaker. What do you do?", "Tell the teacher and do not touch the pieces", "Pick up the pieces with bare hands", "Hide it in the bin"],
    ["When should you wear goggles?", "Whenever you do an experiment", "Only when something looks dangerous", "Only at the end"],
    ["Which is a safe way to carry on in a lab?", "Walk and follow the instructions", "Run to finish first", "Taste to check"]
  ]));

  a.push(les("Reading a thermometer", [
    ["Degrees Celsius", "🌡️", "Scientists measure temperature in <b>degrees Celsius (°C)</b>. Water freezes at <b>0 °C</b> and boils at <b>100 °C</b>."],
    ["Handy numbers", "🧑", "A comfortable room is about <b>20 °C</b>. Your body is about <b>37 °C</b>. A freezer is colder than 0 °C, and boiling water is much hotter than your body."],
    ["Reading it right", "👀", "Let the thermometer sit in the liquid until the number stops moving. Read at <b>eye level</b>. To find a change, <b>subtract</b> the smaller temperature from the bigger one."]
  ], ["For a change in temperature, you want the gap between the two readings.", "Subtract the smaller reading from the bigger one. For facts, remember the key numbers for water, the room and the body.", "Example: a drink goes from 12 °C to 20 °C. The gap is 20 − 12 = 8 degrees. Now do yours."], [
    ["At what temperature does pure water boil?", "100 °C", "0 °C", "37 °C"],
    ["At what temperature does pure water freeze?", "0 °C", "100 °C", "20 °C"],
    ["About what is normal human body temperature?", "37 °C", "20 °C", "90 °C"],
    ["About what is a comfortable room temperature?", "20 °C", "50 °C", "100 °C"],
    ["Which temperature is coldest?", "−5 °C", "0 °C", "8 °C"],
    ["Which temperature is hottest?", "80 °C", "37 °C", "20 °C"],
    () => { const s = ri(5, 30), d = ri(4, 40); return num(`A liquid warms from <b>${s} °C</b> to <b>${s + d} °C</b>. By how many degrees did it rise?`, d, ["Find the gap between the two readings.", "Take the smaller temperature away from the bigger one.", "Example: 10 °C up to 25 °C is 25 − 10 = 15 degrees. Now do yours."], "🌡️"); },
    () => { const s = ri(40, 90), d = ri(5, 35); return num(`Tea cools from <b>${s} °C</b> to <b>${s - d} °C</b>. By how many degrees did it fall?`, d, ["Find the gap between the two readings.", "Take the smaller temperature away from the bigger one.", "Example: 60 °C down to 45 °C is 60 − 45 = 15 degrees. Now do yours."], "☕");}
  ]));

  const conv1 = () => {
    const k = pick([
      ["kg", "g", 1000, "×1000"], ["L", "mL", 1000, "×1000"], ["m", "cm", 100, "×100"], ["cm", "mm", 10, "×10"], ["km", "m", 1000, "×1000"]
    ]);
    const v = pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 25]);
    return num(`Change <b>${v} ${k[0]}</b> into <b>${k[1]}</b>. How many ${k[1]}?`, v * k[2], [`There are lots of small units in one big unit, so the number gets bigger.`, `One ${k[0]} = ${k[2]} ${k[1]}. So multiply by ${k[2]}.`, `Example: 3 m into cm. 1 m = 100 cm, so 3 × 100 = 300 cm. Now do yours.`], "📏");
  };
  a.push(les("Metric units", [
    ["Units for mass, volume and length", "⚖️", "Mass: <b>grams (g)</b> and <b>kilograms (kg)</b>. Volume: <b>millilitres (mL)</b> and <b>litres (L)</b>. Length: <b>millimetres, centimetres, metres</b>."],
    ["Powers of ten", "🔟", "<b>1 kg = 1000 g</b>, <b>1 L = 1000 mL</b>, <b>1 m = 100 cm</b>, <b>1 cm = 10 mm</b>. The prefix <b>kilo</b> means a thousand, <b>milli</b> means a thousandth."],
    ["Big to small", "✖️", "Going from a <b>big unit to a small unit</b>, multiply. Going from small to big, divide. Check: a small unit gives a bigger number."]
  ], ["Going from a big unit to a small unit gives a bigger number.", "Use the fact for one big unit, then multiply by how many of them you have.", "Example: 3 m into cm. 1 m = 100 cm, so 3 × 100 = 300 cm. Now do yours."], [
    conv1, conv1, conv1, conv1,
    ["Which unit is used for the volume of a liquid?", "Millilitres", "Grams", "Metres"],
    ["Which unit is used for mass?", "Grams", "Litres", "Centimetres"],
    ["How many millilitres are in one litre?", "1000", "100", "10"],
    ["How many grams are in one kilogram?", "1000", "100", "10"]
  ]));

  a.push(les("Reading a measuring cylinder", [
    ["Measuring liquids", "🧪", "A <b>measuring cylinder</b> is a tall tube with a scale in <b>millilitres (mL)</b>. It measures liquids much more exactly than a beaker."],
    ["The meniscus", "👁️", "The liquid surface curves a little. That curve is the <b>meniscus</b>. Put the cylinder on a flat bench, bring your eye <b>level</b> with it, and read the <b>bottom of the curve</b>."],
    ["Pick the right size", "📐", "Use the <b>smallest cylinder that is big enough</b>, because its scale lines are closer together and so it is more exact. To find a volume of a solid, see how far the water level rises."]
  ], ["Think about where your eye should be, and which part of the curve you read.", "Look straight across at the same height as the liquid, not down from above.", "Example: water at 40 mL and you add 15 mL means it reads 55 mL. Now try yours."], [
    ["The curved surface of a liquid in a tube is called the...", "Meniscus", "Cylinder", "Crystal"],
    ["Where should your eye be when you read a cylinder?", "Level with the liquid surface", "Far above it", "Under the bench"],
    ["Which part of the meniscus do you read for water?", "The bottom of the curve", "The top edge of the glass", "The very top of the curve"],
    ["To measure 8 mL as exactly as possible, use a...", "10 mL cylinder", "250 mL cylinder", "Bucket"],
    ["The unit on a measuring cylinder is...", "mL", "kg", "°C"],
    ["The cylinder should stand on...", "A flat bench", "Your hand", "A tilted book"],
    () => { const s = ri(20, 60), d = ri(5, 25); return num(`Water in a cylinder reads <b>${s} mL</b>. You pour in <b>${d} mL</b> more. What does it read now (mL)?`, s + d, ["Pouring more liquid raises the level.", "Add the two volumes together.", "Example: 30 mL plus 12 mL is 42 mL. Now do yours."], "🧪"); },
    () => { const s = ri(30, 50), d = ri(4, 20); return num(`A cylinder holds <b>${s} mL</b> of water. A stone is dropped in and the level rises to <b>${s + d} mL</b>. What is the volume of the stone (mL)?`, d, ["The rise in level is the space the stone takes up.", "Subtract the first reading from the second.", "Example: 25 mL rises to 31 mL, so the stone is 31 − 25 = 6 mL. Now do yours."], "🪨"); }
  ]));

  a.push(les("Heating things safely", [
    ["Bunsen burner flames", "🔥", "A Bunsen burner has an air hole. <b>Open</b> it for a hot, <b>blue</b> flame. <b>Closed</b> gives a cooler, yellow, glowing flame that is easy to see: the <b>safety flame</b> when it is not in use."],
    ["Heating a test tube", "🧫", "Use a <b>test tube holder</b>, tilt the tube a little, keep it moving, and point the open end <b>away from everyone</b> (including you)."],
    ["Finish safely", "🧯", "Wear goggles, tie back hair, keep the bench tidy. When you finish, <b>turn off the gas</b> and let hot things cool before you touch them."]
  ], ["Think about what keeps hands and faces away from the hot or splashing liquid.", "Think about the direction the tube faces, how you hold it, and what the colour of a flame tells you.", "Example: you finish heating, so you check the gas tap and wait for the glass to cool. Now try yours."], [
    ["Which flame is hottest?", "A blue flame with the air hole open", "A yellow flame with the air hole closed", "A flame with no gas"],
    ["Which flame is the safety flame (easy to see)?", "Yellow, with the air hole closed", "Blue, with the air hole open", "Invisible"],
    ["When heating a test tube, the open end should point...", "Away from everyone", "At your friend", "At your own face"],
    ["What do you use to hold a hot test tube?", "A test tube holder", "Your fingers", "A paper napkin"],
    ["When you have finished heating, you must...", "Turn off the gas", "Leave the gas on", "Blow out your drink"],
    ["Hot equipment should be...", "Left to cool before touching", "Put straight into water", "Handed to a friend"],
    ["Before lighting a Bunsen burner you should...", "Put on goggles and tie back hair", "Stand on a chair", "Take your goggles off"],
    ["How should you keep a heated test tube?", "Moving gently in the flame", "Held still in one spot", "Sealed with a cork"]
  ]));

  a.push(les("Kitchen chemistry: baking", [
    ["Why bread rises", "🍞", "<b>Yeast</b> is a tiny living thing. It feeds on sugar and makes <b>carbon dioxide gas</b>. The gas makes bubbles in the dough, so it rises."],
    ["Baking powder and soda", "🧁", "<b>Baking soda</b> reacts with an acid (such as buttermilk or lemon juice) and makes carbon dioxide. <b>Baking powder</b> already holds both the soda and a dry acid, so it fizzes when it gets wet and warm."],
    ["Heat sets it", "♨️", "In the oven the gas bubbles grow, then heat makes the proteins and starch <b>set firm</b>. That leaves a soft, light cake or bread full of tiny holes."]
  ], ["Think about what gas makes bubbles in dough and cake.", "The gas forms from a reaction or from yeast feeding, not from heat alone.", "Example: soda plus lemon juice fizzes because a gas is made. Now try yours."], [
    ["Which gas makes bread dough rise?", "Carbon dioxide", "Helium", "Neon"],
    ["What does yeast feed on in dough?", "Sugar", "Salt", "Plastic"],
    ["Baking soda needs which kind of chemical to make bubbles?", "An acid", "A metal", "A noble gas"],
    ["Baking powder starts to fizz when it...", "Gets wet and warm", "Is stored in a jar", "Is sifted dry"],
    ["Why does a cake have tiny holes in it?", "Gas bubbles were trapped as it set", "Insects made them", "It was punched"],
    ["What does oven heat do to cake mixture?", "It sets the proteins and starch so it stays firm", "It turns it back into flour", "It removes all the sugar"],
    ["Yeast is...", "A tiny living thing", "A metal", "A kind of plastic"],
    ["A dough with no yeast or baking powder will...", "Stay flat and dense", "Rise a lot", "Float away"]
  ]));

  a.push(les("Soap and grease", [
    ["Water alone is not enough", "🍳", "Oil and grease do not mix with water, so water alone does not wash them off a plate or your hands."],
    ["Soap has two ends", "🧼", "A soap molecule has a <b>water-loving end</b> and a <b>grease-loving end</b>. The grease-loving ends grab the grease; the water-loving ends stay in the water."],
    ["Lifted away", "🫧", "Soap breaks the grease into tiny droplets that float in the water and rinse away. <b>Warm water</b> and <b>rubbing</b> help. Bubbles look nice but are not what does the cleaning."]
  ], ["Think about what is special about soap compared with plain water.", "Think about how soap is built, and what that does to oil in water.", "Example: soap pulls oil off a spoon and carries it into the rinse water. Now try yours."], [
    ["Why does plain water not wash off oil well?", "Oil does not mix with water", "Water is too dry", "Oil is too cold"],
    ["One end of a soap molecule likes...", "Water, and the other end likes grease", "Only metal", "Only air"],
    ["Soap helps oil to...", "Break into tiny droplets that rinse away", "Turn into water", "Grow bigger"],
    ["Which helps clean greasy dishes better?", "Warm soapy water", "Cold plain water", "Dry paper"],
    ["Do bubbles do the cleaning in soap?", "No, the soap molecules do the cleaning", "Yes, only the bubbles", "Yes, bubbles are made of grease"],
    ["After washing with soap you should...", "Rinse well", "Leave the soap on", "Add oil"],
    ["Which job does a detergent do?", "Lifts grease and dirt into the water", "Makes dirt stick on tighter", "Turns water into oil"],
    ["Rubbing while washing helps because it...", "Helps loosen dirt and grease", "Makes the soap disappear", "Makes water colder"]
  ]));

  a.push(les("Keeping food fresh", [
    ["Why food goes bad", "🦠", "Food goes bad because tiny living things (<b>microbes</b> such as bacteria and mould) grow in it. They need water, warmth and food."],
    ["Slowing microbes", "🧊", "A <b>fridge</b> or <b>freezer</b> keeps food cold, so microbes grow slowly. <b>Drying</b> takes the water away. <b>Salt</b> and <b>sugar</b> pull water out of microbes."],
    ["More ways", "🥒", "<b>Pickling</b> uses vinegar, an acid, which microbes dislike. <b>Canning</b> heats food and seals it in an airtight can or jar so no new microbes get in."]
  ], ["Food spoils when microbes grow. How could you stop them growing?", "Microbes need water and warmth. Remove one of those, or add something they dislike.", "Example: dried apple rings last longer because most of the water has gone. Now try yours."], [
    ["What makes food go bad?", "Microbes growing in it", "The food getting tired", "The plate"],
    ["Why does a fridge keep food fresh longer?", "Cold slows microbe growth", "It makes microbes bigger", "It adds salt"],
    ["Drying food keeps it fresh because it...", "Removes the water microbes need", "Adds water", "Heats it forever"],
    ["Pickling food uses...", "Vinegar, an acid", "Sand", "Soap"],
    ["Which of these is a very old way to keep fish or meat?", "Salting", "Tossing in water", "Leaving in sun for a week in a bag"],
    ["Canning food works by...", "Heating it and sealing it airtight", "Painting the can", "Freezing it solid"],
    ["Jam keeps for a long time because of its lots of...", "Sugar", "Water", "Air"],
    ["Which food is best kept in a fridge?", "Fresh milk", "Dry rice", "A sealed tin of beans"]
  ]));

  a.push(les("Making tap water safe", [
    ["From river to tap", "🚰", "Water from rivers and reservoirs goes to a <b>treatment works</b> before it reaches your tap."],
    ["The steps", "🪣", "1) <b>Screens</b> remove big things like twigs. 2) Chemicals make tiny bits clump together. 3) The clumps <b>settle</b> to the bottom. 4) Sand <b>filters</b> out what is left. 5) A little <b>chlorine</b> kills germs."],
    ["Boil if unsure", "♨️", "If you are not sure water is safe, a grown-up can <b>boil</b> it for a minute to kill germs. Never drink from a stream or pond without safe treatment."]
  ], ["Put the steps in order, from biggest bits to smallest bits, and think about when germs are dealt with.", "Filtering catches small bits; a germ-killing chemical is added at the end. Think about what each step removes.", "Example: a screen catches a twig before the sand filter, because the twig is much bigger. Now try yours."], [
    ["What is the first step: screens that remove...", "Big things such as twigs", "Germs", "Salt"],
    ["Sand filters in a water works remove...", "Tiny bits left in the water", "Chlorine", "Oxygen"],
    ["Which is added to kill germs in tap water?", "Chlorine", "Sugar", "Paint"],
    ["Sedimentation means clumps...", "Settle to the bottom", "Float to the top", "Turn into gas"],
    ["Which step comes last?", "Killing germs with chlorine", "Screening out twigs", "Settling"],
    ["How can an adult make unsafe water safer in an emergency?", "Boil it", "Stir it", "Freeze it for a second"],
    ["Where does tap water often come from before treatment?", "A river or reservoir", "A factory chimney", "A cloud in a bottle"],
    ["Filtering water through sand is a way to...", "Separate solid bits from the water", "Make the water salty", "Turn water into oil"]
  ]));

  a.push(les("Cleaner air", [
    ["What we breathe", "🌬️", "Clean air is mostly <b>nitrogen</b> and <b>oxygen</b>. Pollution adds things we do not want: <b>smoke, soot and harmful gases</b>."],
    ["Where it comes from", "🏭", "Burning <b>fuels</b> in cars, power stations and factories makes carbon dioxide, soot and other gases. Burning with too little oxygen makes <b>carbon monoxide</b>, a poisonous gas with no smell."],
    ["What helps", "🌳", "Cleaner cars and buses, <b>electric vehicles</b>, walking, cycling, and <b>filters</b> on chimneys all help. Homes with gas heaters should have a <b>carbon monoxide alarm</b>."]
  ], ["Think about what comes out when fuels burn, and what could reduce it.", "Less burning of fuel, or cleaning the smoke before it leaves, means cleaner air.", "Example: a bus that runs on electricity makes no exhaust from its own pipe. Now try yours."], [
    ["Which of these makes the air dirtier?", "Smoke from burning fuel", "Planting trees", "Walking to school"],
    ["Carbon monoxide is...", "A poisonous gas you cannot smell", "A harmless gas in balloons", "A kind of soap"],
    ["A carbon monoxide alarm is used to...", "Warn people if the gas is in the house", "Cook food", "Clean the air"],
    ["Which choice helps keep the air cleaner?", "Cycling instead of a short car trip", "Burning rubbish", "Leaving a car engine running"],
    ["Soot is...", "Tiny black bits of carbon from burning", "A type of water", "A noble gas"],
    ["Which gas does a car's exhaust always add when fuel burns?", "Carbon dioxide", "Helium", "Neon"],
    ["Filters on factory chimneys help to...", "Catch soot before it gets out", "Make more smoke", "Add noise"],
    ["The two main gases in clean air are...", "Nitrogen and oxygen", "Helium and neon", "Chlorine and sodium"]
  ]));

  a.push(les("Alchemists", [
    ["Long ago", "⚗️", "<b>Alchemists</b> lived hundreds of years ago in places such as Egypt, the Middle East and Europe. They mixed and heated materials, hoping for amazing results."],
    ["Their dreams", "🪙", "Some tried to turn <b>lead into gold</b>, and some looked for a drink that would let people live forever. Neither ever worked."],
    ["What they gave us", "🔬", "Alchemists invented useful tools and methods, such as <b>distilling</b> and careful record keeping. Slowly, their work grew into the science of <b>chemistry</b>."]
  ], ["Think about what alchemists wanted, and what good came out of their work anyway.", "They never reached their big goals, but their tools and methods were useful for later scientists.", "Example: a flask used for distilling, first made by early alchemists, is still used. Now try yours."], [
    ["What did many alchemists try to make?", "Gold from lead", "Plastic from gold", "Water from gold"],
    ["Did turning lead into gold work for the alchemists?", "No, it never worked", "Yes, every time", "Yes, but only on Mondays"],
    ["What did the alchemists leave us?", "Lab tools and methods", "Computers", "Airplanes"],
    ["The science that grew out of alchemy is...", "Chemistry", "Astronomy only", "Music"],
    ["Distilling is a way to...", "Separate liquids by boiling and cooling", "Turn lead into gold", "Make gold"],
    ["An alchemist's laboratory had things like...", "Flasks, furnaces and scales", "Phones and screens", "Robots"],
    ["Why is alchemy not called modern science?", "It lacked careful tests that anyone could repeat", "It used too many tools", "It was too short"],
    ["Alchemists lived...", "Long ago, hundreds of years back", "Last week", "Only in space"]
  ]));

  a.push(les("Famous chemists", [
    ["Dalton and Lavoisier", "🧑‍🔬", "<b>John Dalton</b> (England, early 1800s) said all matter is made of tiny <b>atoms</b>. <b>Antoine Lavoisier</b> (France) showed that the mass stays the same in a reaction and named <b>oxygen</b>."],
    ["Mendeleev", "📋", "<b>Dmitri Mendeleev</b> (Russia, 1869) arranged the elements in a table by their properties. He left gaps for elements nobody had found yet: this was the first useful <b>periodic table</b>."],
    ["Marie Curie", "⭐", "<b>Marie Curie</b> studied radioactivity and discovered the elements <b>polonium</b> and <b>radium</b>. She won two Nobel Prizes, one in physics and one in chemistry."]
  ], ["Match the name with the big idea or discovery that you remember.", "Think: atoms, periodic table, radioactive elements, mass in reactions. Which one fits the question?", "Example: the person who first put elements in a table is Mendeleev, so a table question points to him. Now try yours."], [
    ["Who arranged elements into the first useful periodic table (1869)?", "Dmitri Mendeleev", "John Dalton", "Marie Curie"],
    ["Who said all matter is made of atoms (early 1800s)?", "John Dalton", "Marie Curie", "Dmitri Mendeleev"],
    ["Who discovered the elements polonium and radium?", "Marie Curie", "Antoine Lavoisier", "John Dalton"],
    ["Who showed that mass stays the same in a reaction?", "Antoine Lavoisier", "Marie Curie", "Dmitri Mendeleev"],
    ["Who gave oxygen its name?", "Antoine Lavoisier", "Dmitri Mendeleev", "John Dalton"],
    ["Marie Curie won Nobel Prizes in...", "Physics and chemistry", "Music and art", "Only sport"],
    ["Mendeleev left gaps in his table for...", "Elements not yet discovered", "His friends' names", "Mistakes"],
    ["Which scientist studied radioactivity?", "Marie Curie", "John Dalton", "Antoine Lavoisier"]
  ]));

  a.push(les("Jobs with chemistry", [
    ["Chemists at work", "👩‍🔬", "Many jobs use chemistry. A <b>pharmacist</b> prepares and checks medicines. A <b>food scientist</b> makes food tasty, safe and long-lasting."],
    ["More careers", "🕵️", "A <b>forensic scientist</b> tests clues from a scene. An <b>environmental scientist</b> checks air and water for pollution. A <b>materials scientist</b> invents stronger, lighter materials."],
    ["Behind the scenes", "🏭", "A <b>chemical engineer</b> designs factories that make things such as plastics and soaps in large amounts. A <b>lab technician</b> runs tests and keeps equipment working."]
  ], ["Think about what each job needs to test, make or check.", "Match the job to its main task: medicine, food, pollution, clues, or materials.", "Example: someone who tests river water for pollution is an environmental scientist. Now try yours."], [
    ["Who checks and prepares medicines?", "A pharmacist", "A pilot", "A bus driver"],
    ["Who tests clues from a crime scene?", "A forensic scientist", "A baker only", "A farmer only"],
    ["Who checks rivers and air for pollution?", "An environmental scientist", "A hairdresser", "A painter only"],
    ["Who invents stronger and lighter materials?", "A materials scientist", "A librarian", "A referee"],
    ["Who makes food tastier and safer?", "A food scientist", "A bus driver", "A dentist"],
    ["Who designs big factories that make chemicals and plastics?", "A chemical engineer", "A pastry chef", "A gardener"],
    ["Which job runs tests in a lab and keeps equipment working?", "A lab technician", "A taxi driver", "A tour guide"],
    ["Which of these jobs uses chemistry?", "Making perfumes", "Sleeping", "Waiting"]
  ]));

  const tab = () => {
    const ds = shuf(["Mon", "Tue", "Wed", "Thu", "Fri"]).slice(0, 4);
    const vs = []; while (vs.length < 4) { const v = ri(5, 40); if (!vs.includes(v)) vs.push(v); }
    return [ds, vs, ds.map((d, i) => `${d}: ${vs[i]}`).join(", ")];
  };
  a.push(les("Reading a data table", [
    ["Tables hold results", "📋", "A <b>table</b> puts results in rows and columns. The left column often names what was measured, and the next column gives the numbers."],
    ["Find what you need", "🔍", "To find the <b>biggest</b> value, compare all the numbers. To find a <b>difference</b>, subtract the smaller from the larger. Always check the <b>units</b>."],
    ["Spot the pattern", "📈", "Look at the numbers going down the table. Do they rise, fall, or stay about the same? That pattern is what you tell in your conclusion."]
  ], ["Look at every number in the table before you choose.", "For highest or lowest, compare them all. For a difference, subtract.", "Example: Mon 10, Tue 18: the difference is 18 − 10 = 8. Now do yours."], [
    () => { const [ds, vs, s] = tab(); const mx = vs.indexOf(Math.max(...vs)); return { text: `Plants grew (mm) on each day: <b>${s}</b>. On which day was the growth highest?`, choices: shuf(ds), answer: ds[mx], hints: ["Compare all four numbers.", "The highest day has the biggest number.", "Example: Mon 10, Tue 18, Wed 14: Tue has the biggest number. Now do yours."], visual: "📋" }; },
    () => { const [ds, vs, s] = tab(); const mn = vs.indexOf(Math.min(...vs)); return { text: `Bubbles counted each day: <b>${s}</b>. On which day were there the fewest bubbles?`, choices: shuf(ds), answer: ds[mn], hints: ["Compare all four numbers.", "The fewest means the smallest number.", "Example: Mon 10, Tue 18, Wed 14: Mon has the smallest number. Now do yours."], visual: "📋" }; },
    () => { const [ds, vs, s] = tab(); const mx = Math.max(...vs), mn = Math.min(...vs); return num(`Mass of a sample (g): <b>${s}</b>. What is the difference between the biggest and the smallest value?`, mx - mn, ["Find the biggest and the smallest numbers first.", "Subtract the smallest from the biggest.", "Example: values 10, 18, 14: 18 − 10 = 8. Now do yours."], "📋"); },
    () => { const [ds, vs, s] = tab(); const i = ri(0, 3); return num(`Volume of gas (mL): <b>${s}</b>. What was the volume on <b>${ds[i]}</b>?`, vs[i], ["Find the right day in the table.", "Read the number next to that day.", "Example: Mon 10, Tue 18: the value for Tue is 18. Now do yours."], "📋"); },
    () => { const x = ri(10, 30), y = ri(2, 9), z = ri(2, 9); return num(`Three trials gave <b>${x}</b>, <b>${x + y}</b> and <b>${x + y + z}</b> mL of gas. How many mL more was the third trial than the first?`, y + z, ["Compare the first trial and the third trial only.", "Subtract the first number from the third number.", "Example: trials 10, 14, 20: 20 − 10 = 10. Now do yours."], "📋"); },
    ["Always check the... when you read a table.", "Units", "Colour of the paper", "Font"],
    ["If the numbers go 5, 10, 15, 20, the pattern is...", "They rise steadily", "They fall", "They stay the same"],
    ["If the numbers go 40, 30, 20, 10, the pattern is...", "They fall steadily", "They rise", "They stay the same"]
  ]));

  const meanQ = () => {
    const n = pick([3, 4, 5]), m = ri(14, 40);
    const arr = []; let tot = 0; for (let i = 0; i < n - 1; i++) { const v = m + ri(-4, 4); arr.push(v); tot += v; }
    arr.push(m * n - tot);
    return num(`Three repeats gave these readings... Actually: <b>${arr.join(", ")}</b> (all in mL). What is the <b>mean</b>?`.replace("Three repeats gave these readings... Actually", `${n} repeats gave`), m, ["The mean shares the total out equally.", "Add up all the readings, then divide by how many readings there are.", "Example: 4, 6 and 8: total 18, divided by 3 gives 6. Now do yours."], "📊");
  };
  a.push(les("The mean (average)", [
    ["Why repeat?", "🔁", "One reading can be a little off. So scientists <b>repeat</b> a measurement and find the <b>mean</b>, which is a fairer middle value."],
    ["How to find it", "➗", "<b>Add</b> all the readings, then <b>divide</b> by how many readings there are. For 2, 4 and 6: total = 12, divided by 3 = <b>4</b>."],
    ["Odd one out", "👀", "If one reading is far from the others, it might be a mistake (an <b>anomaly</b>). Check it, and leave it out of the mean if it is clearly wrong."]
  ], ["Mean means add them all, then share equally.", "Total first, then divide by the number of readings.", "Example: 4, 6 and 8: total 18, divided by 3 gives 6. Now do yours."], [
    meanQ, meanQ, meanQ, meanQ, meanQ,
    ["To find a mean you...", "Add the numbers, then divide by how many there are", "Multiply them", "Take only the biggest"],
    ["An odd reading far from all the others is called an...", "Anomaly", "Average", "Axis"],
    ["Why do scientists repeat measurements?", "To get a fairer, more reliable result", "To waste time", "Because one is never allowed"]
  ]));

  a.push(les("Reading a line graph", [
    ["Lines tell a story", "📈", "A <b>line graph</b> shows how something changes, such as temperature over time. The <b>bottom (x) axis</b> often shows time; the <b>side (y) axis</b> shows what you measure."],
    ["Going up, down or flat", "↗️", "A line going <b>up</b> means the amount is growing. Going <b>down</b> means it is falling. A <b>flat</b> line means no change. A <b>steeper</b> line means a faster change."],
    ["Labels matter", "🏷️", "Good graphs have a <b>title</b>, labelled axes and units. Without them you cannot tell what the numbers mean."]
  ], ["Think about what the shape of the line means: rising, falling or flat.", "Steeper means faster change. Flat means nothing is changing.", "Example: a line that goes down and then levels off means a thing cooled and then stayed at one temperature. Now try yours."], [
    ["A hot drink cools. Its graph line goes...", "Down, then flattens out", "Up forever", "Straight up then down"],
    ["A flat part on a temperature graph means the temperature is...", "Not changing", "Rising fast", "Falling fast"],
    ["A steeper line means the change is...", "Faster", "Slower", "Stopped"],
    ["The side (y) axis usually shows...", "The thing you measure", "The title", "The date you made it"],
    ["A line going up means the amount is...", "Increasing", "Decreasing", "Staying the same"],
    ["Which is needed on a good graph?", "Axis labels with units", "A joke", "A random picture"],
    ["Ice is heated and the graph is flat at 0 °C while it melts. This means...", "The temperature stays the same while it melts", "It is cooling", "The thermometer is broken"],
    ["The bottom (x) axis often shows...", "Time", "The answer", "The scientist's name"]
  ]));

  a.push(les("Variables in a test", [
    ["What is a variable?", "🎛️", "A <b>variable</b> is anything that can change in an experiment. In a <b>fair test</b> you change only one thing."],
    ["Three kinds", "🔬", "The <b>independent variable</b> is the one thing you change. The <b>dependent variable</b> is what you measure. <b>Control variables</b> are kept the same."],
    ["Example", "🧊", "Testing how water temperature changes how fast sugar dissolves: you change the <b>temperature</b>, measure the <b>time to dissolve</b>, and keep the amount of sugar and water the <b>same</b>."]
  ], ["Which thing is changed on purpose, which is measured, and which is kept the same?", "The thing you change on purpose is not the thing you measure.", "Example: changing the temperature of water and measuring how long sugar takes to dissolve. Temperature is the one changed. Now try yours."], [
    ["You change the amount of sugar and measure the time to dissolve. What is the independent variable?", "The amount of sugar", "The time to dissolve", "The beaker"],
    ["You change the amount of sugar and measure the time to dissolve. What is the dependent variable?", "The time to dissolve", "The amount of sugar", "The spoon"],
    ["The independent variable is the one you...", "Change on purpose", "Measure", "Keep the same"],
    ["The dependent variable is the one you...", "Measure", "Change on purpose", "Ignore"],
    ["A control variable is something you...", "Keep the same", "Change", "Forget"],
    ["In a fair test, how many things do you change?", "One", "All of them", "None"],
    ["You test how the volume of vinegar changes the gas made. What is a good control variable?", "The mass of baking soda", "The volume of vinegar", "The volume of gas"],
    ["You heat water for different times and measure its temperature. The dependent variable is...", "The temperature", "The heating time", "The colour of the flask"]
  ]));

  a.push(les("Hazard symbols", [
    ["Warning pictures", "⚠️", "Chemicals have <b>hazard symbols</b> on their labels. They warn you before you open anything, in any language."],
    ["Common ones", "🔥", "🔥 <b>Flammable</b>: catches fire easily. ☠️ <b>Toxic</b>: can poison. 🧪 <b>Corrosive</b>: can burn skin and eat metal. 💥 <b>Explosive</b>: can blow up. ⚠️ <b>Irritant / harmful</b>: can irritate skin or eyes."],
    ["Stay safe", "🧤", "Read the label first, follow the instructions and ask an adult if you do not know a symbol. <b>Never</b> open or mix chemicals just to see what happens."]
  ], ["Look at the picture and ask what kind of danger it is showing.", "Match the picture to the kind of danger it warns about, and cross out choices that do not fit.", "Example: a label with a person and a star on the chest warns of a health hazard, so you would wear gloves. Now try yours."], [
    ["🔥§This hazard symbol means...", "Flammable", "Toxic", "Explosive"],
    ["☠️§This hazard symbol means...", "Toxic (poisonous)", "Flammable", "Safe to drink"],
    ["💥§This hazard symbol means...", "Explosive", "Corrosive", "Magnetic"],
    ["🧪§A corrosive label means the chemical can...", "Burn skin and damage metal", "Make you hungry", "Glow in the dark"],
    ["A flammable liquid should be kept away from...", "Flames and sparks", "Water", "Shade"],
    ["What do you do if you do not know a hazard symbol?", "Ask an adult", "Open it to see", "Taste a tiny bit"],
    ["Where do you find hazard symbols?", "On the label of the chemical", "Under the table", "On the ceiling"],
    ["⚠️§This warning triangle usually means...", "Harmful or irritant", "Delicious", "Free to take"]
  ]));

  a.push(
    mix("Mixed practice", at(a, [0, 1, 2, 3, 5, 6, 8, 10, 13, 15, 17])),
    mix("Level 13 Challenge", at(a, [4, 7, 9, 11, 12, 14, 16, 17, 2, 13]))
  );

  // ================= LEVEL 14 =================
  const b = [];

  b.push(les("Parts of a lab report", [
    ["Tell the story", "📝", "A lab report lets someone else understand and repeat your work. It has clear parts in a set order."],
    ["The parts", "📑", "<b>Aim</b>: what you want to find out. <b>Method</b>: the steps, with the equipment. <b>Results</b>: your tables and graphs. <b>Conclusion</b>: what the results show, and whether your idea was right."],
    ["Hypothesis", "💡", "A <b>hypothesis</b> is a prediction you can test, such as \"warmer water will dissolve sugar faster.\" Your results show if it is supported."]
  ], ["Think about what job each section of a report does.", "Aim comes at the start, results hold the measurements and the conclusion comes last. Match the job to the part.", "Example: a section listing the steps in order so others can repeat them is the method. Now try yours."], [
    ["Which part says what you want to find out?", "Aim", "Results", "Conclusion"],
    ["Where do you put a table of your measurements?", "Results", "Aim", "Method"],
    ["Where do you say if your idea was supported?", "Conclusion", "Aim", "Method"],
    ["Where do you list the steps so others can repeat the test?", "Method", "Results", "Conclusion"],
    ["A hypothesis is...", "A prediction you can test", "A finished answer", "A kind of beaker"],
    ["Which part comes last in a report?", "Conclusion", "Aim", "Method"],
    ["A good method lets someone else...", "Repeat your test", "Skip your test", "Guess your results"],
    ["Where would a graph of your data go?", "Results", "Aim", "Hypothesis"]
  ]));

  b.push(les("Accurate and precise", [
    ["Two different words", "🎯", "<b>Accurate</b> means close to the true value. <b>Precise</b> means repeat readings are close to each other."],
    ["Picture it", "🏹", "Arrows all bunched together but far from the centre are precise, not accurate. Arrows around the centre are accurate. Bunched <i>and</i> on the centre are both."],
    ["Improving data", "🔁", "Repeat readings, read scales at eye level, use the right size of equipment and ignore a clear <b>anomaly</b> when you find the mean."]
  ], ["Accurate is about being close to the truth; precise is about the readings agreeing with each other.", "Look at whether the readings are close together, and whether they are near the true value.", "Example: readings 9.0, 9.0, 9.1 for a true 5.0 agree with each other but are far from the truth. Now try yours."], [
    ["A true mass is 50 g. Readings of 50.1, 49.9 and 50.0 g are...", "Accurate and precise", "Neither", "Precise only"],
    ["A true mass is 50 g. Readings of 56.0, 56.1 and 55.9 g are...", "Precise but not accurate", "Accurate but not precise", "Neither"],
    ["A true mass is 50 g. Readings of 40, 60 and 50 g average 50 but are...", "Not very precise", "Very precise", "Impossible"],
    ["Accurate means...", "Close to the true value", "All the same", "Written neatly"],
    ["Precise means...", "Repeat readings are close together", "Close to the true value", "Done quickly"],
    ["A reading far from all the others is called an...", "Anomaly", "Mean", "Axis"],
    ["How can you make results more reliable?", "Repeat and take a mean", "Measure once", "Guess"],
    ["To read a scale accurately, put your eye...", "Level with the mark", "As high as you can reach", "Behind the scale"]
  ]));

  const conv2 = () => {
    const k = pick([
      ["mg", "g", 1000], ["g", "kg", 1000], ["mL", "L", 1000], ["m", "km", 1000], ["cm", "m", 100], ["mm", "cm", 10]
    ]);
    const v = pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 25]);
    const small = v * k[2];
    return num(`Change <b>${small} ${k[0]}</b> into <b>${k[1]}</b>. How many ${k[1]}?`, v, [`You are going from a small unit to a bigger one, so the number gets smaller.`, `${k[2]} ${k[0]} = 1 ${k[1]}. So divide by ${k[2]}.`, `Example: 400 cm into m. 100 cm = 1 m, so 400 ÷ 100 = 4 m. Now do yours.`], "📏");
  };
  b.push(les("Converting units", [
    ["Small to big", "➗", "Going from a <b>small unit to a big unit</b>, <b>divide</b>. 3000 g ÷ 1000 = 3 kg."],
    ["Big to small", "✖️", "Going from a <b>big unit to a small unit</b>, <b>multiply</b>. 2 L × 1000 = 2000 mL."],
    ["Check it", "✅", "The number should get <b>smaller</b> when the unit gets bigger. Also remember <b>1 mL of water has a mass of 1 g</b> and a volume of 1 cm³."]
  ], ["Check if the unit is going from small to big (divide) or big to small (multiply).", "Find how many of the small unit make one big unit, then divide by that number.", "Example: 400 cm into m. 100 cm = 1 m, so 400 ÷ 100 = 4 m. Now do yours."], [
    conv2, conv2, conv2, conv2, conv2,
    () => { const m = ri(2, 9) * 100; return num(`<b>${m} mL</b> of water has a mass of about how many grams?`, m, ["1 mL of water has a mass of 1 gram.", "The number of grams matches the number of mL.", "Example: 50 mL of water is 50 g. Now do yours."], "💧"); },
    ["How many millimetres are in 1 centimetre?", "10", "100", "1000"],
    ["How many metres are in 1 kilometre?", "1000", "100", "10"]
  ]));

  const pctQ = () => {
    const tot = pick([20, 25, 40, 50, 80, 100, 200, 250]);
    const p = pick([10, 20, 25, 30, 40, 50, 60, 75]);
    const part = tot * p / 100;
    if (!Number.isInteger(part)) return pctQ();
    const k = ri(0, 2);
    if (k === 0) return num(`A salt solution has a total mass of <b>${tot} g</b>. <b>${part} g</b> of it is salt. What percent of the mass is salt?`, p, ["Percent means out of 100.", "Divide the part by the total, then multiply by 100.", "Example: 10 g out of 40 g is 10 ÷ 40 = 0.25, which is 25 percent. Now do yours."], "🧂");
    if (k === 1) return num(`A mixture has a mass of <b>${tot} g</b>. <b>${p}%</b> of it is sand. How many grams of sand is that?`, part, ["Percent means out of 100, so turn it into a fraction first.", "Find the percent of the total: total × percent ÷ 100.", "Example: 20% of 50 g is 50 × 20 ÷ 100 = 10 g. Now do yours."], "🏖️");
    return num(`<b>${part} g</b> out of <b>${tot} g</b> of a rock sample is iron ore. What percent is iron ore?`, p, ["Percent means out of 100.", "Divide the part by the total, then multiply by 100.", "Example: 6 g out of 30 g is 6 ÷ 30 = 0.2, which is 20 percent. Now do yours."], "🪨");
  };
  b.push(les("Percent of a mixture", [
    ["What is percent?", "💯", "<b>Percent</b> means \"out of 100\". 25% means 25 out of every 100."],
    ["Finding a percent", "🧮", "<b>part ÷ total × 100</b>. If 10 g of a 50 g mixture is salt: 10 ÷ 50 = 0.2, then × 100 = <b>20%</b>."],
    ["Finding the part", "⚖️", "To find a part from a percent: <b>total × percent ÷ 100</b>. 30% of 200 g = 200 × 30 ÷ 100 = <b>60 g</b>."]
  ], ["Decide: are you finding a percent, or the amount for a percent?", "Percent = part ÷ total × 100. Amount = total × percent ÷ 100.", "Example: 10 g out of 40 g is 10 ÷ 40 = 0.25, which is 25 percent. Now do yours."], [pctQ, pctQ, pctQ, pctQ, pctQ, pctQ, pctQ, pctQ]));

  const scaleQ = () => {
    const per = ri(2, 9), vol = pick([100, 200, 250, 500]), mult = ri(2, 5);
    const k = ri(0, 1);
    if (k === 0) return num(`A recipe uses <b>${per} g</b> of baking soda for every <b>${vol} mL</b> of vinegar. How many grams are needed for <b>${vol * mult} mL</b> of vinegar?`, per * mult, ["Find how many times bigger the new amount of vinegar is.", "Multiply the grams by that same number.", "Example: 3 g per 100 mL, so for 200 mL use 3 × 2 = 6 g. Now do yours."], "🧁");
    return num(`A cleaner is mixed using <b>${per}</b> spoons of powder for every <b>1 L</b> of water. How many spoons for <b>${mult} L</b>?`, per * mult, ["The amount of powder grows in the same way as the water.", "Multiply the spoons by the number of litres.", "Example: 4 spoons for 1 L means 4 × 3 = 12 spoons for 3 L. Now do yours."], "🥄");
  };
  b.push(les("Scaling recipes", [
    ["Same recipe, bigger batch", "🥣", "A <b>ratio</b> compares amounts. If a recipe uses 2 g of powder for each 100 mL of water, the ratio stays the same when you make more."],
    ["Multiply both", "✖️", "To make <b>3 times</b> as much, multiply every amount by 3. 2 g per 100 mL becomes 6 g per 300 mL."],
    ["Why it matters", "🏭", "Chemists and cooks use ratios to scale a small test up to a big batch. The result stays the same only if the ratio is kept the same."]
  ], ["Find how many times bigger the new batch is.", "Multiply each ingredient by that same number.", "Example: 3 g per 100 mL, so for 200 mL use 3 × 2 = 6 g. Now do yours."], [scaleQ, scaleQ, scaleQ, scaleQ, scaleQ, scaleQ, scaleQ, scaleQ]));

  b.push(les("Cleaning safely", [
    ["Never mix cleaners", "🚫", "Mixing cleaning products can make <b>poisonous gases</b>. For example, <b>bleach must never be mixed with ammonia or other cleaners</b>."],
    ["Use them well", "🧤", "Read the label, use gloves if it says so, open a window, and keep cleaners in their original bottles in a place small children cannot reach. Never put them in drink bottles."],
    ["Safe fizz", "🫧", "Baking soda and vinegar fizz and make carbon dioxide. That is safe for a science demo, but still do not seal it in a closed bottle because the gas can burst it."]
  ], ["Think about what could go wrong if two strong products touch.", "Labels give the rules. Strong cleaners can make toxic gas when they are mixed.", "Example: a cleaner is only opened with a window open and gloves on, as the label says. Now try yours."], [
    ["Is it safe to mix bleach with other cleaners?", "No, it can make poisonous gas", "Yes, it cleans better", "Yes, if you stir slowly"],
    ["You should keep cleaners in...", "Their original labelled bottles", "Old drink bottles", "Open bowls"],
    ["What should you do before using a strong cleaner?", "Read the label", "Taste it", "Mix it with another"],
    ["A good habit when using cleaners is to...", "Open a window for fresh air", "Close all the doors tightly", "Sniff the bottle"],
    ["Should a cleaning spray be stored where small children can reach?", "No, keep it out of reach", "Yes, on the floor", "Yes, in the kitchen sink"],
    ["Baking soda and vinegar make which gas?", "Carbon dioxide", "Chlorine", "Hydrogen chloride"],
    ["Why not seal baking soda and vinegar in a closed bottle?", "The gas can burst the bottle", "It would freeze", "The bottle would melt"],
    ["If cleaner gets on your skin, you should...", "Rinse with lots of water and tell an adult", "Wait for it to dry", "Rub it in"]
  ]));

  b.push(les("Food tests", [
    ["Testing for starch", "🥔", "<b>Iodine solution</b> is orange-brown. If there is <b>starch</b>, it turns <b>blue-black</b>. Bread, potato and rice have lots of starch."],
    ["Fat and sugar", "🧈", "Rub food on paper. A <b>see-through grease spot</b> that stays means <b>fat or oil</b>. To test for a sugar such as glucose, a teacher warms the food with <b>Benedict's solution</b>: blue turns to orange or brick-red."],
    ["Protein", "🥚", "To test for <b>protein</b>, a teacher adds <b>biuret solution</b>. It turns from blue to <b>purple</b> if protein is there. Only do food tests with your teacher, and never eat the food afterwards."]
  ], ["Match each food test to its colour change or sign.", "Think about which nutrient makes which colour, or a grease spot.", "Example: a drop of iodine that stays orange-brown shows there is no starch. Now try yours."], [
    ["Iodine turns blue-black when it meets...", "Starch", "Fat", "Water"],
    ["A see-through grease spot on paper shows...", "Fat or oil", "Starch", "Salt"],
    ["Biuret solution turns purple with...", "Protein", "Starch", "Sugar"],
    ["Benedict's solution (heated) changes to orange or brick-red with...", "A sugar such as glucose", "Starch", "Fat"],
    ["Iodine solution starts as what colour?", "Orange-brown", "Blue-black", "Purple"],
    ["Which food is rich in starch, so would turn iodine blue-black?", "Potato", "Olive oil", "Pure water"],
    ["Which food would leave a grease spot on paper?", "Butter", "A boiled potato", "An apple slice"],
    ["Food tests should be done...", "With your teacher, and never eaten after", "In your mouth", "With any chemicals from home"]
  ]));

  b.push(les("Cooking and browning", [
    ["Heat changes food", "🍳", "Cooking is chemistry. Heat changes the food into something new: egg white turns solid and white, and bread dough turns into a golden loaf."],
    ["Browning", "🍞", "When bread is toasted or meat is browned, sugars and proteins react to make new <b>brown</b> flavours. Heating plain sugar makes brown <b>caramel</b>."],
    ["Other changes", "🍌", "A cut apple browns because air (<b>oxygen</b>) reacts with chemicals inside it; <b>lemon juice</b> slows this. Ripe bananas give off a gas that helps nearby fruit ripen faster. Milk goes sour when microbes make acid."]
  ], ["Think about what heat or air does to the food.", "Many cooking changes cannot be undone: they are chemical changes.", "Example: an egg white goes solid when cooked and does not go back, so it is a chemical change. Now try yours."], [
    ["Heating sugar until it turns brown makes...", "Caramel", "Salt", "Water"],
    ["Why does a cut apple turn brown?", "Oxygen from the air reacts with it", "It gets cold", "The skin is angry"],
    ["Which helps slow apple slices browning?", "Lemon juice", "More air", "Leaving them in the sun"],
    ["An egg white turns solid when cooked. This is a...", "Chemical change", "Physical change that can be undone", "Change of colour only"],
    ["Toast is brown because...", "Sugars and proteins react with heat", "It is dirty", "It gets wet"],
    ["Milk goes sour because microbes make...", "Acid", "Sugar", "Gold"],
    ["A banana ripens faster in a bag with other fruit because ripe fruit gives off...", "A gas that helps ripening", "Water", "Salt"],
    ["Can you change a cooked egg back into a raw egg?", "No, cooking is a chemical change", "Yes, by cooling it", "Yes, by adding salt"]
  ]));

  b.push(les("Water on our planet", [
    ["So much water", "🌍", "About <b>71%</b> of the Earth's surface is covered by water. But about <b>97%</b> of that is <b>salty</b> ocean water that we cannot drink."],
    ["Fresh water", "🏔️", "Only a small part is fresh water, and most of that is frozen in <b>glaciers and ice caps</b>. Rivers, lakes and underground water give us the rest."],
    ["Using it wisely", "🚿", "<b>Desalination</b> removes salt from sea water, but it uses a lot of energy. Short showers, fixing leaks and turning off the tap all <b>save water</b>."]
  ], ["Most water on Earth is in one place. Think about which type it is.", "The oceans are the biggest store of water, and it is salty.", "Example: if a country has little fresh water, it may use desalination to make drinking water from the sea. Now try yours."], [
    ["Most of the Earth's water is...", "Salty ocean water", "Fresh river water", "Fresh lake water"],
    ["Most of the fresh water is...", "Frozen in glaciers and ice caps", "In rivers", "In clouds"],
    ["Desalination removes...", "Salt from sea water", "Sand from rivers", "Oxygen from air"],
    ["Which saves water?", "Turning off the tap while brushing teeth", "Leaving the hose running", "Washing a car every day"],
    ["About what part of the Earth's surface is covered by water?", "About 71%", "About 10%", "About 25%"],
    ["Desalination is useful but it...", "Uses a lot of energy", "Makes water more salty", "Costs nothing"],
    ["Fixing a dripping tap helps because it...", "Stops wasted water", "Adds more fish", "Makes the water salty"],
    ["Why can we not just drink ocean water?", "It is too salty", "It is too cold to drink", "It has no water in it"]
  ]));

  b.push(les("Acid rain, smog and ozone", [
    ["Acid rain", "🌧️", "Burning fuels releases gases such as <b>sulfur dioxide</b> and <b>nitrogen oxides</b>. They dissolve in rain and make it <b>more acidic</b> than normal. It can harm trees, lakes and stone buildings."],
    ["Smog", "🌫️", "<b>Smog</b> is a haze of smoke and gases from vehicles and factories, trapped over a city on still days. It can make breathing harder."],
    ["Ozone layer", "☀️", "High in the sky the <b>ozone layer</b> blocks much of the Sun's harmful <b>UV rays</b>. Chemicals called <b>CFCs</b> were damaging it, so many countries agreed to stop using them and it is slowly recovering."]
  ], ["Think about what each problem is and where the gases come from.", "Burning fuel makes gases that can dissolve in rain; some other gases harm a layer high in the sky.", "Example: smoke trapped over a city on a still day causes a hazy cloud. Now try yours."], [
    ["Acid rain is caused when gases from burning fuel...", "Dissolve in rain", "Turn rain into sugar", "Make rain freeze"],
    ["Which can acid rain harm?", "Trees, lakes and stone buildings", "Only the Moon", "Only clouds"],
    ["Smog is...", "A haze of smoke and gas over a city", "A kind of rain", "A type of metal"],
    ["The ozone layer protects us from...", "Harmful UV rays from the Sun", "Falling rain", "The wind"],
    ["CFC chemicals were harming the...", "Ozone layer", "Oceans' salt", "Moon"],
    ["What was done about CFCs?", "Countries agreed to stop using them", "Nothing at all", "They were made in larger amounts"],
    ["Which gas helps make acid rain?", "Sulfur dioxide", "Helium", "Argon"],
    ["Which of these helps reduce smog?", "Using fewer petrol cars", "Burning more fuel", "Idling cars"]
  ]));

  b.push(les("Ceramics, glass and concrete", [
    ["Made from earth", "🏺", "<b>Ceramics</b> such as pottery and bricks are made from <b>clay</b>. The clay is shaped, then <b>fired</b> (baked at high heat) in a kiln so it becomes hard."],
    ["Glass and concrete", "🏗️", "<b>Glass</b> is made by melting <b>sand</b> with a few other substances. <b>Concrete</b> is a mix of cement, sand, gravel and water that sets as hard as stone."],
    ["Composites", "🧱", "A <b>composite</b> joins two materials to get the best of both. Concrete with <b>steel bars</b> inside is strong when it is pushed and when it is pulled. Fibreglass mixes glass fibres and plastic."]
  ], ["Think about what each material is made of and how it is hardened.", "Match each material to its raw ingredients or its heating step.", "Example: bricks are baked in a very hot kiln after being shaped from clay. Now try yours."], [
    ["Pottery is shaped from clay, then hardened by...", "Firing it in a kiln", "Freezing it", "Soaking it"],
    ["Glass is made mainly by melting...", "Sand", "Wood", "Paper"],
    ["Concrete is a mix of cement, sand, gravel and...", "Water", "Oil", "Salt"],
    ["A composite is a material that...", "Joins two or more materials", "Is always one metal", "Is a gas"],
    ["Why put steel bars in concrete?", "To make it stronger", "To make it softer", "To make it float"],
    ["What kind of material is a brick?", "A ceramic", "A metal", "A plastic"],
    ["Fibreglass is made from glass fibres and...", "Plastic", "Sand only", "Paper"],
    ["A kiln is...", "A very hot oven for firing clay", "A kind of fridge", "A water tank"]
  ]));

  b.push(les("Fibres and fabrics", [
    ["Natural fibres", "🐑", "Natural fibres come from plants or animals. <b>Cotton</b> and <b>linen</b> come from plants. <b>Wool</b> comes from sheep. <b>Silk</b> comes from silkworm cocoons."],
    ["Synthetic fibres", "🧵", "<b>Nylon</b> and <b>polyester</b> are made in factories from chemicals, usually from oil. They are made of long chains called <b>polymers</b>."],
    ["Choosing a fabric", "🧥", "Wool is warm. Cotton is soft and soaks up sweat. Nylon is strong and dries quickly. Polyester dries fast and resists wrinkles. Many clothes mix fibres to get the best of each."]
  ], ["Does the fibre come from a plant or animal, or is it made in a factory?", "Natural fibres come from living things. Synthetic fibres are made from chemicals.", "Example: wool is cut from sheep, so it is natural; its coat can be warm. Now try yours."], [
    ["Which fibre comes from a plant?", "Cotton", "Nylon", "Polyester"],
    ["Which fibre comes from sheep?", "Wool", "Cotton", "Nylon"],
    ["Which fibre is made from silkworm cocoons?", "Silk", "Linen", "Polyester"],
    ["Which of these is a synthetic fibre?", "Nylon", "Wool", "Silk"],
    ["Synthetic fibres are mostly made from...", "Chemicals from oil", "Plant stems only", "Sand"],
    ["Which fabric is good for a warm winter sweater?", "Wool", "Thin silk only", "Paper"],
    ["Nylon is a good fabric for a raincoat because it is...", "Strong and dries quickly", "Made from sheep", "Made of cotton"],
    ["Why mix fibres in one fabric?", "To get the best of each fibre", "To make it heavier on purpose", "Because they need to fight"]
  ]));

  b.push(les("Recycling metals", [
    ["Metals can be reused", "♻️", "Many metals can be melted down and made into new things again and again. <b>Aluminium cans</b> and <b>steel cans</b> are recycled this way."],
    ["Sorting with magnets", "🧲", "Steel (mostly iron) is <b>magnetic</b>, so a big magnet can pull steel cans out of mixed rubbish. Aluminium is not magnetic, so it is separated another way."],
    ["Why bother?", "⚡", "Recycling aluminium uses <b>far less energy</b> than making new aluminium from ore. It also means less digging, less waste and less pollution."]
  ], ["Think about why melting old metal is better than mining new.", "Magnets pull iron and steel but not every metal.", "Example: a magnet picks up a steel can but not an aluminium one. Now try yours."], [
    ["Which metal item is attracted by a magnet?", "A steel can", "An aluminium can", "A copper coin"],
    ["Recycling aluminium compared with making new aluminium uses...", "Much less energy", "More energy", "The same energy"],
    ["Metals can be recycled...", "Many times", "Only once", "Never"],
    ["A magnet at a recycling plant helps to separate...", "Steel from other rubbish", "Plastic from paper", "Glass from sand"],
    ["Recycled metal is first...", "Melted down", "Burned to ash", "Planted"],
    ["Which is a good reason to recycle metal?", "Less mining and less waste", "To make more rubbish", "To use more oil"],
    ["Aluminium is not magnetic, so it is...", "Not picked up by a magnet", "Picked up by a magnet", "A gas"],
    ["What do we call the rock that metal is dug from?", "Ore", "Sand", "Soil"]
  ]));

  b.push(les("Ancient chemistry", [
    ["Metals of the past", "🏺", "About 5000 years ago people learned to mix copper and tin to make <b>bronze</b>, a harder metal than copper. That time is called the <b>Bronze Age</b>."],
    ["More discoveries", "⚒️", "Later, people learned to get <b>iron</b> from rock by heating it (the <b>Iron Age</b>). Ancient Egyptians made glass, dyes and pottery. The Romans built with strong <b>concrete</b>."],
    ["An idea about atoms", "💭", "Around 400 BC the Greek thinker <b>Democritus</b> imagined that matter is made of tiny pieces that cannot be cut: <b>atomos</b>. It was only an idea then, but we now know it is true in a way."]
  ], ["Match each time or people with what they used or imagined.", "Bronze is a mixture of metals. The Greek idea of tiny pieces gave a word we still use.", "Example: mixing two metals makes an alloy, an idea ancient smiths used to get a harder material. Now try yours."], [
    ["Bronze is made by mixing copper with...", "Tin", "Gold", "Wood"],
    ["The Bronze Age was about how long ago?", "About 5000 years", "Last year", "About 5 years"],
    ["Which came after learning to make bronze?", "Learning to get iron from rock", "Inventing phones", "Learning to fly"],
    ["Who imagined matter is made of tiny pieces?", "Democritus", "Marie Curie", "Albert Einstein"],
    ["The word atom comes from a Greek word meaning...", "Cannot be cut", "Very hot", "Round"],
    ["Who built with strong concrete long ago?", "The Romans", "The dinosaurs", "Space visitors"],
    ["Ancient Egyptians made...", "Glass, dyes and pottery", "Plastic bottles", "Batteries"],
    ["Bronze is harder than copper because it is...", "A mixture of metals", "A gas", "Wet"]
  ]));

  b.push(les("More jobs with chemistry", [
    ["Everyday experts", "👩‍🔬", "A <b>cosmetic chemist</b> designs creams and shampoos that are safe on skin. A <b>perfumer</b> blends scents. A <b>paint chemist</b> develops paints that last."],
    ["Looking after things", "🖼️", "A <b>conservator</b> uses chemistry to clean and protect old paintings and objects in museums. A <b>water quality scientist</b> tests drinking water."],
    ["Care and discovery", "💊", "A <b>drug researcher</b> tests new medicines. A <b>dentist</b> and a <b>nurse</b> also use chemistry knowledge in everyday care."]
  ], ["Which job is about making, testing or protecting that thing?", "Match the product or task to the job.", "Example: someone who repairs and protects an old painting is a conservator. Now try yours."], [
    ["Who designs safe creams and shampoos?", "A cosmetic chemist", "A pilot", "A referee"],
    ["Who blends scents to make perfume?", "A perfumer", "A plumber", "A mechanic"],
    ["Who cleans and protects old paintings in a museum?", "A conservator", "A bus driver", "A clown"],
    ["Who tests drinking water for safety?", "A water quality scientist", "A hairdresser", "A singer"],
    ["Who tests new medicines?", "A drug researcher", "A baker", "A gardener"],
    ["Who develops paints that last and keep their colour?", "A paint chemist", "A taxi driver", "A lifeguard"],
    ["Which job needs lots of chemistry skills?", "Food scientist", "Sleeper", "Daydreamer"],
    ["A chemist who tests clues for the police is a...", "Forensic scientist", "Farmer", "Painter"]
  ]));

  const lineQ = () => {
    const t0 = ri(10, 30), r = ri(2, 9), k = ri(2, 6);
    const pts = [0, 1, 2, 3, 4].map(m => `${m} min: ${t0 + r * m} °C`).join(", ");
    if (ri(0, 1)) return num(`A liquid is heated steadily. Readings: <b>${pts}</b>. What will the temperature be at <b>${5} minutes</b> if the pattern continues (°C)?`, t0 + r * 5, ["Look at how much it rises each minute.", "Add the same rise to the 4 minute reading.", "Example: 20, 24, 28: it rises 4 each minute, so the next is 32. Now do yours."], "📈");
    return num(`A liquid is heated steadily. Readings: <b>${pts}</b>. By how many °C does it rise each minute?`, r, ["Compare two readings that are 1 minute apart.", "Subtract one reading from the next one.", "Example: 20 then 24 is a rise of 4 each minute. Now do yours."], "📈");
  };
  b.push(les("Trends and rates on a graph", [
    ["Points make a line", "📍", "Each pair of numbers in a table is one <b>point</b> on a graph. Joining the points shows the <b>trend</b>."],
    ["Rate of change", "📐", "How much it changes in each step is its <b>rate</b>. If the temperature rises 5 °C every minute, the rate is 5 °C per minute. A steeper line has a bigger rate."],
    ["Predicting", "🔮", "If the trend is steady you can <b>predict</b> the next value: add the same rise again. Be careful: real things do not rise forever."]
  ], ["Compare two readings next to each other to find the change per step.", "Subtract an earlier reading from the next one to get the rate; then keep adding it.", "Example: 20, 24, 28 rises 4 each minute, so the next is 32. Now do yours."], [
    lineQ, lineQ, lineQ, lineQ,
    ["A steeper line on a graph means a... rate of change.", "Bigger", "Smaller", "Zero"],
    ["A horizontal (flat) line means the amount is...", "Not changing", "Rising quickly", "Falling quickly"],
    ["If a graph line goes up steadily you can...", "Predict the next point", "Not use it", "Turn it into water"],
    ["Joining the points on a graph shows the...", "Trend", "Weather", "Mistake"]
  ]));

  const roundQ = () => {
    const k = ri(0, 2);
    if (k === 0) { const w = ri(1, 9), d = ri(0, 9), e = ri(0, 9), ans = Math.floor((w * 100 + d * 10 + e + 5) / 10) / 10; const x = `${w}.${d}${e}`; return num(`Round <b>${x}</b> g to <b>one decimal place</b>.`, ans, ["Look at the second digit after the point.", "If it is 5 or more, round the first decimal digit up. If it is less than 5, leave it.", "Example: 3.27 rounds to 3.3 because 7 is 5 or more. Now do yours."], "🔢"); }
    if (k === 1) { const x = ri(11, 98) * 10 + ri(1, 9); return num(`Round <b>${x}</b> mL to the nearest <b>10</b>.`, Math.round(x / 10) * 10, ["Look at the digit in the ones place.", "5 or more rounds up to the next ten; less than 5 stays at the lower ten.", "Example: 84 rounds to 80 and 86 rounds to 90. Now do yours."], "🔢"); }
    const x = ri(2, 9) + (ri(1, 9) / 10); return num(`Round <b>${x.toFixed(1)}</b> to the nearest <b>whole number</b>.`, Math.round(x), ["Look at the digit after the decimal point.", "5 or more rounds up to the next whole number; less than 5 stays at the lower one.", "Example: 4.3 rounds to 4 and 4.7 rounds to 5. Now do yours."], "🔢");
  };
  b.push(les("Rounding measurements", [
    ["Why round?", "🔢", "A balance may show 12.468 g, but your method is not that exact. We <b>round</b> to a sensible number of digits."],
    ["The rule", "👇", "Look at the digit just after the place you are rounding to. <b>5 or more</b>: round up. <b>Less than 5</b>: leave it. 12.468 to one decimal place is <b>12.5</b>."],
    ["Estimate first", "🧠", "An <b>estimate</b> is a rough answer using easy numbers. 19 + 31 is about 20 + 30 = 50. Estimating helps you spot a silly mistake."]
  ], ["Find the digit just after the place you are rounding to.", "5 or more rounds up; 4 or less keeps the digit the same.", "Example: 3.27 rounds to 3.3 because 7 is 5 or more. Now do yours."], [roundQ, roundQ, roundQ, roundQ, roundQ, roundQ,
    ["An estimate of 19 + 31 is about...", "50", "10", "500"],
    ["An estimate is a...", "Rough answer using easy numbers", "Perfect answer", "Wrong answer on purpose"]
  ]));

  b.push(les("Batteries and cells", [
    ["Chemical energy to electricity", "🔋", "A <b>battery</b> turns <b>chemical energy</b> into electrical energy. Two different materials and a liquid or paste inside react to push a current round a circuit."],
    ["Used up or rechargeable", "🔌", "In an ordinary battery the chemicals get used up and it goes flat. A <b>rechargeable</b> battery can have its reaction reversed by plugging it into a charger."],
    ["Handle with care", "♻️", "Never throw batteries in a fire or break them open. Take old batteries to a <b>recycling point</b>. If a child finds a small round <b>button battery</b>, tell an adult immediately; they are dangerous if swallowed."]
  ], ["Think about which type of energy is stored inside a battery.", "A battery uses a chemical reaction. It goes flat when the chemicals are used up.", "Example: a torch dims when its battery chemicals run low. Now try yours."], [
    ["A battery stores energy in the form of...", "Chemical energy", "Sound energy", "Wind energy"],
    ["Why does an ordinary battery go flat?", "Its chemicals are used up", "It gets tired", "It forgets"],
    ["A rechargeable battery can be...", "Charged again", "Eaten", "Thrown into water"],
    ["A lemon battery needs two different metals and...", "An acidic juice", "Oil", "Sand"],
    ["Where should used batteries go?", "A recycling point", "A fire", "A fish tank"],
    ["If a child finds a button battery, they should...", "Tell an adult at once", "Put it in their mouth", "Hide it in a pocket"],
    ["Batteries should never be...", "Thrown in a fire", "Used in a torch", "Recycled"],
    ["Which of these has a battery?", "A remote control", "A rock", "A glass jar"]
  ]));

  b.push(
    mix("Mixed practice", at(b, [0, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16])),
    mix("Level 14 Challenge", at(b, [1, 7, 9, 11, 13, 15, 17, 3, 5, 10]))
  );

  // ================= LEVEL 15 =================
  const c = [];

  const statQ = () => {
    const n = pick([5, 7]);
    let arr; do { arr = Array.from({ length: n }, () => ri(3, 30)); } while (new Set(arr).size < n);
    const sorted = [...arr].sort((x, y) => x - y);
    const k = ri(0, 2);
    if (k === 0) return num(`Five or seven readings (g): <b>${arr.join(", ")}</b>. What is the <b>range</b> (biggest minus smallest)?`.replace("Five or seven readings", `${n} readings`), sorted[n - 1] - sorted[0], ["The range tells how spread out the readings are.", "Find the biggest and the smallest reading, then subtract.", "Example: 4, 9, 12: range = 12 − 4 = 8. Now do yours."], "📊");
    if (k === 1) return num(`${n} readings (g): <b>${arr.join(", ")}</b>. What is the <b>median</b> (the middle value when put in order)?`, sorted[(n - 1) / 2], ["Put the numbers in order from smallest to biggest first.", "The median is the one exactly in the middle of the ordered list.", "Example: 8, 3, 5 in order is 3, 5, 8 so the median is 5. Now do yours."], "📊");
    return num(`${n} readings (g): <b>${arr.join(", ")}</b>. What is the <b>biggest</b> value minus the <b>smallest</b> value?`, sorted[n - 1] - sorted[0], ["Find the biggest and the smallest reading.", "Subtract the smallest from the biggest.", "Example: 4, 9, 12: 12 − 4 = 8. Now do yours."], "📊");
  };
  c.push(les("Median and range", [
    ["More than the mean", "📊", "The <b>mean</b> is not the only way to describe data. The <b>median</b> is the middle value. The <b>range</b> shows how spread out the data is."],
    ["Median", "🥈", "Put the numbers in order. The median is the one in the <b>middle</b>. For 3, 8, 5: order is 3, 5, 8, so the median is <b>5</b>."],
    ["Range", "↔️", "<b>Range = biggest − smallest</b>. For 3, 5, 8 the range is 8 − 3 = <b>5</b>. A small range means the readings agree closely."]
  ], ["Always put the numbers in order first.", "Median is the middle number. Range is the biggest minus the smallest.", "Example: 8, 3, 5 in order is 3, 5, 8 so the median is 5. Now do yours."], [
    statQ, statQ, statQ, statQ, statQ, statQ,
    ["A small range means the readings are...", "Close together", "Very spread out", "Missing"],
    ["The median is the...", "Middle value when in order", "Biggest value", "Total of all values"]
  ]));

  const dryQ = () => {
    const st = pick([50, 100, 200, 250, 400]), p = pick([10, 20, 25, 40, 50, 60, 75, 80]);
    const lost = st * p / 100;
    if (!Number.isInteger(lost)) return dryQ();
    return num(`<b>${st} g</b> of fresh fruit is dried in an oven. After drying it has a mass of <b>${st - lost} g</b>. What percent of its mass was lost (as water)?`, p, ["Work out how many grams were lost first.", "Divide the grams lost by the starting mass, then multiply by 100.", "Example: 100 g dries to 70 g. It lost 30 g, which is 30 ÷ 100 × 100 = 30 percent. Now do yours."], "🍇");
  };
  c.push(les("Water in food", [
    ["Foods hold water", "🍉", "Fresh fruit and vegetables are mostly <b>water</b>. A watermelon is about 90% water. Drying removes it, so dried food weighs much less."],
    ["Measure the loss", "⚖️", "Weigh the food, dry it in an oven, and weigh it again. Mass lost = start − end. That lost mass is the water that left."],
    ["Percent lost", "💯", "<b>Percent lost = mass lost ÷ starting mass × 100</b>. If 100 g becomes 70 g, you lost 30 g, which is 30%."]
  ], ["First find how much mass went missing.", "Percent lost = mass lost ÷ starting mass × 100.", "Example: 100 g dries to 70 g. It lost 30 g, which is 30 percent. Now do yours."], [
    dryQ, dryQ, dryQ, dryQ, dryQ, dryQ,
    () => { const st = pick([50, 80, 120, 200]), end = st - pick([10, 20, 30, 40]); return num(`A sample of fresh bread is <b>${st} g</b>. After drying it is <b>${end} g</b>. How many grams of water left?`, st - end, ["The missing mass is the water that left.", "Subtract the end mass from the starting mass.", "Example: 90 g dries to 60 g, so 90 − 60 = 30 g left. Now do yours."], "🍞"); },
    ["Why is dried fruit lighter than fresh fruit?", "Most of the water has gone", "It has more sugar added", "It has become metal"]
  ]));

  const dishQ = () => {
    const dish = ri(20, 40), salt = ri(2, 12), vol = pick([25, 50, 100]);
    const k = ri(0, 1);
    if (k === 0) return num(`An empty evaporating dish has a mass of <b>${dish} g</b>. After evaporating salt water, the dish and the salt weigh <b>${dish + salt} g</b>. What mass of salt was in the water (g)?`, salt, ["The salt is the extra mass above the empty dish.", "Subtract the empty dish mass from the final mass.", "Example: dish 30 g, dish and solid 34 g: 34 − 30 = 4 g of solid. Now do yours."], "🧂");
    const m = pick([2, 4, 5, 10]);
    return num(`<b>${m * vol / 100 * 2} g</b> of salt is dissolved in <b>${vol * 2} mL</b> of water. How many grams of salt are there per <b>${vol} mL</b>?`, m * vol / 100, ["If you halve the water, you halve the salt too.", "Divide both amounts by the same number to get the amount for the smaller volume.", "Example: 8 g in 200 mL is 4 g in 100 mL. Now do yours."], "🧂");
  };
  c.push(les("How much solid is in a solution?", [
    ["Finding dissolved solids", "🍲", "Heat salt water in an <b>evaporating dish</b>. The water leaves as vapour and the salt stays behind. Weigh the dish before and after."],
    ["Subtract", "➖", "Mass of solid = (dish + solid) − dish alone. If the empty dish is 30 g and the dish with salt is 35 g, the salt is <b>5 g</b>."],
    ["Amount per volume", "🧪", "Scientists compare solutions using <b>grams per 100 mL</b>. If 10 g of salt are in 200 mL, then there are 5 g in each 100 mL."]
  ], ["Decide what you are subtracting or dividing.", "Subtract the empty dish; or divide the solid and volume by the same number.", "Example: dish 30 g, dish and solid 34 g: 34 − 30 = 4 g of solid. Now do yours."], [
    dishQ, dishQ, dishQ, dishQ, dishQ, dishQ,
    ["After evaporating salt water, what stays in the dish?", "The salt", "The water", "Nothing at all"],
    ["Why do you weigh the empty dish first?", "So you can find the mass of just the solid", "To make the dish heavier", "To clean it"]
  ]));

  const rateQ = () => {
    const t = pick([10, 20, 25, 30, 40, 50]), r = ri(2, 9), v = t * r;
    const k = ri(0, 1);
    if (k === 0) return num(`A reaction makes <b>${v} mL</b> of gas in <b>${t} seconds</b>. What is the average rate in mL per second?`, r, ["Rate tells how much happens in each second.", "Divide the amount of gas by the time.", "Example: 60 mL in 20 s is 60 ÷ 20 = 3 mL per second. Now do yours."], "⏱️");
    return num(`A reaction makes gas at <b>${r} mL per second</b>. How much gas is made in <b>${t} seconds</b> (mL)?`, v, ["Gas builds up by the same amount every second.", "Multiply the rate by the time.", "Example: 3 mL per second for 20 s is 3 × 20 = 60 mL. Now do yours."], "⏱️");
  };
  c.push(les("Rate of a reaction", [
    ["How fast?", "⏱️", "Some reactions are quick, like fizzing; others are slow, like rusting. The <b>rate</b> says how fast something happens."],
    ["Measuring it", "💨", "A common way: collect the gas made and time it. <b>Rate = amount made ÷ time taken</b>. 60 mL in 20 s is <b>3 mL per second</b>."],
    ["Speeding it up", "🔥", "Reactions are usually faster when things are <b>warmer</b>, when solids are <b>crushed to powder</b>, or when solutions are <b>more concentrated</b>."]
  ], ["Rate means how much per unit of time.", "Divide the amount by the time. To find the amount, multiply the rate by the time.", "Example: 60 mL in 20 s is 60 ÷ 20 = 3 mL per second. Now do yours."], [
    rateQ, rateQ, rateQ, rateQ, rateQ,
    ["Which makes a reaction faster?", "Crushing a solid into powder", "Making it colder", "Using a bigger beaker only"],
    ["Rate is how...", "Fast something happens", "Heavy it is", "Colourful it is"],
    ["A warmer reaction mixture usually reacts...", "Faster", "Slower", "Never"]
  ]));

  c.push(les("Sources of error", [
    ["Nothing is perfect", "🎯", "Every measurement has a little <b>error</b>. Good scientists find the errors and try to reduce them."],
    ["Two kinds", "🔍", "<b>Random errors</b> change from reading to reading (hard to read a tiny scale, small changes in the room). <b>Systematic errors</b> push every reading the same way (a balance that is not set to zero adds the same extra to every mass)."],
    ["Reducing them", "🛠️", "Repeat and take a mean to reduce random error. Check equipment, such as zeroing the balance, to remove systematic error. Read scales at eye level."]
  ], ["Think about whether the mistake changes randomly or always pushes the same way.", "Repeating helps with random scatter; checking the equipment helps with errors that push every reading the same way.", "Example: a ruler worn at the end makes every length 1 mm too big, which is the same push each time. Now try yours."], [
    ["A balance that reads 0.5 g with nothing on it adds the same error to every mass. This is a...", "Systematic error", "Random error", "Fair test"],
    ["Small differences from reading a scale slightly differently each time are...", "Random errors", "Systematic errors", "Control variables"],
    ["Repeating and finding a mean helps reduce...", "Random errors", "All hazards", "The need for goggles"],
    ["How can you fix the balance error above?", "Set (zero) the balance before weighing", "Add more weight", "Ignore it"],
    ["Reading a measuring cylinder from above causes...", "An error in the reading", "A more accurate reading", "No difference"],
    ["Losing some liquid by spilling is a...", "Source of error", "Control variable", "Safety rule"],
    ["Why try to find sources of error?", "So the experiment can be improved", "To blame someone", "To hide the results"],
    ["A dirty beaker used in an experiment can...", "Contaminate the results", "Make the results perfect", "Make glass break"]
  ]));

  c.push(les("Fuels in daily life", [
    ["Fuels give energy", "⛽", "A <b>fuel</b> is a material that releases energy when it burns. We use fuels for heating, cooking and moving vehicles."],
    ["Fossil fuels", "🛢️", "<b>Coal, oil and natural gas</b> are <b>fossil fuels</b>. They formed over millions of years from ancient plants and tiny sea animals. They are <b>non-renewable</b>: once used, they are gone for a very long time."],
    ["Other options", "🌱", "<b>Biofuels</b> are made from plants such as sugar cane, which can be regrown. <b>Hydrogen</b> burns to make only water. The Sun, wind and moving water give energy without burning a fuel."]
  ], ["Think about whether the energy source can be replaced soon or is used up.", "Fossil fuels took millions of years to form. Renewable sources can be replaced or never run out.", "Example: wood from a tree that is replanted can be grown again, so we call it renewable. Now try yours."], [
    ["Which is a fossil fuel?", "Coal", "Wind", "Sunlight"],
    ["Fossil fuels are non-renewable because...", "They take millions of years to form", "They are too light", "They are made yesterday"],
    ["Which is a renewable energy source?", "Wind", "Natural gas", "Oil"],
    ["Biofuels are made from...", "Plants", "Coal only", "Nothing"],
    ["Burning hydrogen produces only...", "Water", "Soot", "Smoke"],
    ["Fossil fuels formed from...", "Ancient plants and tiny sea animals", "Plastic", "Metal ore"],
    ["Which one is NOT burned as a fuel?", "Sunlight", "Natural gas", "Petrol"],
    ["Burning a fossil fuel releases... into the air.", "Carbon dioxide", "Neon", "Helium"]
  ]));

  c.push(les("Plastic recycling codes", [
    ["Numbers on plastic", "♻️", "Many plastic items have a number from 1 to 7 inside a triangle. It tells you the type of plastic, so recyclers can sort them."],
    ["Common codes", "🧴", "<b>1 = PET</b> (drink bottles). <b>2 = HDPE</b> (milk jugs, shampoo bottles). <b>3 = PVC</b> (pipes). <b>4 = LDPE</b> (bags and film). <b>5 = PP</b> (yoghurt pots, bottle caps). <b>6 = PS</b> (foam trays and cups)."],
    ["Good habits", "🧹", "Rinse containers, follow your local rules, and remember that <b>reducing and reusing</b> come before recycling. Plastic should never be dropped as litter, because it lasts a very long time."]
  ], ["Plastics are sorted by type. Think of the numbers you remember.", "Use the code number to find the name of the plastic, or the name to find a typical use.", "Example: a clear fizzy drink bottle usually has the code 1, which is PET. Now try yours."], [
    ["Code 1 plastic (PET) is often used for...", "Drink bottles", "Pipes", "Foam cups"],
    ["Code 2 plastic (HDPE) is often used for...", "Milk jugs", "Foam cups", "Pipes"],
    ["Code 3 plastic (PVC) is often used for...", "Pipes", "Milk jugs", "Drink bottles"],
    ["Code 5 plastic (PP) is often used for...", "Yoghurt pots", "Foam trays", "Pipes"],
    ["Code 6 plastic (PS) can be...", "Foam cups and trays", "Milk jugs", "Pipes"],
    ["What does PET stand for?", "Polyethylene terephthalate", "Plastic every time", "Pure energy tube"],
    ["Which comes first in reduce, reuse, recycle?", "Reduce", "Recycle", "Throw away"],
    ["Why do recycling plants need the number code?", "To sort plastic by type", "To count the cost", "To paint it"]
  ]));

  c.push(les("Biodegradable and compost", [
    ["Rotting away", "🍂", "Something is <b>biodegradable</b> if living things such as bacteria and fungi can break it down. Leaves, food scraps and paper are biodegradable."],
    ["Compost", "🪱", "In a compost heap, microbes and worms break down plant waste into rich dark <b>compost</b> that feeds soil. It needs air, moisture and a mix of green and brown waste."],
    ["Not biodegradable", "🛍️", "Most plastics, glass and metal do not rot quickly. A plastic bag can last for hundreds of years, so we should reuse and recycle them."]
  ], ["Can bacteria and fungi eat it and break it down?", "Food scraps and plants rot. Man-made plastics last much longer.", "Example: a banana peel rots into soil in weeks, while a plastic cup stays for years. Now try yours."], [
    ["Which is biodegradable?", "An apple core", "A glass bottle", "A plastic bag"],
    ["Which is NOT biodegradable?", "A plastic bottle", "A leaf", "A potato peel"],
    ["Compost is made when... break down plant waste.", "Microbes and worms", "Magnets", "Metals"],
    ["A compost heap needs...", "Air and moisture", "Plastic", "Only salt"],
    ["Compost is used to...", "Feed soil for plants", "Make plastic", "Light a fire"],
    ["A plastic bag can last for...", "Hundreds of years", "A day", "One hour"],
    ["Biodegradable means it can be...", "Broken down by living things", "Seen through", "Magnetised"],
    ["Which can go in a compost heap?", "Vegetable peelings", "Batteries", "Plastic toys"]
  ]));

  c.push(les("Making glass and paper", [
    ["Glass", "🫙", "Glass is made by melting <b>sand</b> (silica) with <b>soda ash</b> and <b>limestone</b> at a very high temperature. When it cools it is hard and see-through."],
    ["Recycled glass", "♻️", "Old glass can be melted again and again without losing quality. Using recycled glass (<b>cullet</b>) means the furnace needs less energy."],
    ["Paper", "📄", "Paper is made from tiny <b>cellulose fibres</b> from wood. Wood is broken into <b>pulp</b> in water, spread thin, pressed and dried. Recycling paper saves trees and water."]
  ], ["Think about what raw materials go in and how the final product is made.", "Sand is the main ingredient in glass; wood fibres are the main ingredient in paper.", "Example: a pulp of fibres in water is pressed flat and dried to make a sheet. Now try yours."], [
    ["The main ingredient of glass is...", "Sand", "Wood", "Cotton"],
    ["Glass can be recycled...", "Many times without losing quality", "Only once", "Never"],
    ["Paper is made from fibres called...", "Cellulose", "Nylon", "Iron"],
    ["Wood is broken into a wet mush called...", "Pulp", "Cullet", "Ore"],
    ["Recycled glass pieces ready for melting are called...", "Cullet", "Pulp", "Ore"],
    ["Recycling paper helps by...", "Saving trees and water", "Making more waste", "Using more oil"],
    ["Glass is made at a very high...", "Temperature", "Noise", "Colour"],
    ["After glass cools it is...", "Hard and see-through", "Soft and black", "A gas"]
  ]));

  c.push(les("How soap really works", [
    ["Two-faced molecules", "🧼", "A soap molecule has a <b>head that loves water</b> (hydrophilic) and a <b>tail that loves oil and grease</b> (hydrophobic, meaning it avoids water)."],
    ["Tiny balls", "⚪", "In water, soap tails dig into a grease droplet and the heads stick out into the water. The grease is wrapped in a tiny ball called a <b>micelle</b> that floats away."],
    ["Why it also kills germs", "🦠", "Washing hands with soap lifts dirt, oil and germs off your skin and rinses them away. Scrub for about 20 seconds to get everything clean."]
  ], ["The head and the tail of a soap molecule like different things.", "The tail likes grease and the head likes water. That is how it carries grease into water.", "Example: a washing-up liquid pulls fat off a pan and floats it away in the water. Now try yours."], [
    ["The head of a soap molecule loves...", "Water", "Grease", "Metal"],
    ["The tail of a soap molecule loves...", "Oil and grease", "Water only", "Salt"],
    ["The tiny ball of grease wrapped by soap is called a...", "Micelle", "Molecule", "Mixture"],
    ["Hydrophilic means...", "Water-loving", "Water-hating", "Grease-loving"],
    ["Hydrophobic means...", "Avoiding water", "Loving water", "Very hot"],
    ["How long should you scrub your hands with soap?", "About 20 seconds", "1 second", "1 hour"],
    ["Soap helps wash away germs by...", "Lifting them off skin with dirt and oil", "Painting them blue", "Making them bigger"],
    ["Soap works with oil because the tail...", "Mixes with oil", "Hates all liquids", "Is made of glass"]
  ]));

  c.push(les("Medicines from nature", [
    ["Plants as medicine", "🌿", "People have used plants as medicine for thousands of years. <b>Aspirin</b> came from a chemical found in <b>willow bark</b>; chemists later made it in the lab."],
    ["Penicillin", "🧫", "In 1928 <b>Alexander Fleming</b> noticed that a mould stopped bacteria growing on a dish. That mould made <b>penicillin</b>, the first antibiotic."],
    ["Medicine safety", "💊", "Only take medicine given by a trusted adult or a doctor. Doses matter: too much can be harmful. Check the date and keep medicine out of reach of small children."]
  ], ["Match the discovery with the plant, the mould or the safety rule.", "Aspirin started with tree bark; penicillin came from a mould on a dish.", "Example: a chemical from a plant leaf helped create a modern medicine, which shows why nature is studied. Now try yours."], [
    ["Aspirin started with a chemical from...", "Willow bark", "Sand", "Rocks"],
    ["Who noticed a mould that stopped bacteria growing (1928)?", "Alexander Fleming", "John Dalton", "Marie Curie"],
    ["The mould made...", "Penicillin", "Aspirin", "Plastic"],
    ["Penicillin is a kind of...", "Antibiotic", "Paint", "Metal"],
    ["Who should give you medicine?", "A trusted adult or doctor", "Anyone", "Nobody, take what you like"],
    ["Is taking more medicine than the dose safe?", "No, too much can be harmful", "Yes, it works faster", "Yes, always"],
    ["Where should medicine be kept?", "Out of reach of small children", "On the floor", "In the garden"],
    ["Why check the date on medicine?", "Old medicine may not work well or be safe", "To read a story", "To paint it"]
  ]));

  c.push(les("Lucky discoveries", [
    ["Surprises in the lab", "🧪", "Some materials were found by accident, or by chemists who noticed something unusual and followed it up."],
    ["Plastics and rubber", "🧰", "<b>Bakelite</b> (Leo Baekeland, 1907) was the first fully synthetic plastic. <b>Nylon</b> was made by Wallace Carothers' team in 1935. <b>Teflon</b> was found by Roy Plunkett in 1938 when a gas formed a slippery white solid. <b>Vulcanised rubber</b> (Charles Goodyear, 1839) made rubber strong and not sticky."],
    ["Keep noticing", "👀", "A good scientist pays attention to surprises, writes everything down, and asks \"why did that happen?\""]
  ], ["Match the material with the inventor or the use that you remember.", "Think of non-stick pans, early plastic, nylon fibres and tyres.", "Example: Penicillin was noticed by Alexander Fleming when mould stopped bacteria, so noticing matters. Now try yours."], [
    ["Bakelite was the first fully...", "Synthetic plastic", "Natural metal", "Natural cloth"],
    ["Teflon is known for being...", "Slippery (non-stick)", "Sticky", "Magnetic"],
    ["Who first made vulcanised rubber (1839)?", "Charles Goodyear", "Marie Curie", "Dmitri Mendeleev"],
    ["Nylon is a...", "Synthetic fibre", "Metal", "Gas"],
    ["Which material helped make better tyres?", "Vulcanised rubber", "Teflon", "Silk"],
    ["Roy Plunkett's accidental discovery in 1938 was...", "Teflon", "Nylon", "Bakelite"],
    ["A good scientist who sees something surprising should...", "Write it down and ask why", "Ignore it", "Throw it away"],
    ["Teflon is used on...", "Non-stick pans", "Bicycle tyres", "Window panes"]
  ]));

  c.push(les("Dyes and pigments", [
    ["Colour from nature", "🎨", "Long ago, people got colour from nature: <b>indigo</b> (blue) from a plant, <b>turmeric</b> (yellow) from a root, and red from <b>madder</b> roots or beetroot."],
    ["Dyes and pigments", "🖌️", "A <b>dye</b> dissolves and soaks into cloth. A <b>pigment</b> is tiny coloured bits that do not dissolve; they sit on a surface and are used in paint."],
    ["First man-made dye", "💜", "In 1856, 18-year-old <b>William Perkin</b> made a purple dye called <b>mauve</b> by accident while trying to make a medicine. It started the synthetic dye industry."]
  ], ["Does the colour dissolve and soak in, or sit on top as tiny bits?", "Dyes soak in; pigments are used in paint. Think about where the colour came from.", "Example: yellow from a spice root is a natural dye. Now try yours."], [
    ["Indigo gives which colour?", "Blue", "Green", "Orange"],
    ["A dye...", "Dissolves and soaks into cloth", "Is always a gas", "Never colours anything"],
    ["A pigment is used in...", "Paint", "Soap only", "Salt"],
    ["The first synthetic dye was...", "Mauve", "Indigo", "Turmeric"],
    ["Who made mauve in 1856?", "William Perkin", "John Dalton", "Alexander Fleming"],
    ["Turmeric gives which colour?", "Yellow", "Blue", "Purple"],
    ["Mauve is a shade of...", "Purple", "Green", "Black"],
    ["Pigments are tiny coloured bits that...", "Do not dissolve", "Always dissolve", "Only exist in water"]
  ]));

  c.push(les("Soil chemistry", [
    ["Soil is a mixture", "🌱", "Soil is a mixture of tiny bits of rock, <b>humus</b> (rotted plants), water, air and living things. Plants take water and nutrients from it."],
    ["Plant food", "🌾", "Plants need <b>nitrogen (N)</b>, <b>phosphorus (P)</b> and <b>potassium (K)</b>. Fertilisers and compost add them back. Nitrogen helps leaves grow, phosphorus helps roots, and potassium helps flowers and fruit."],
    ["Soil pH and type", "🧪", "Most plants grow best in soil that is slightly acidic to neutral. <b>Sandy</b> soil drains fast; <b>clay</b> soil holds water. Gardeners can add <b>lime</b> to make acidic soil less acidic."]
  ], ["Plant food names have the letters N, P and K.", "Think about the three main nutrients, or about which soil drains fast.", "Example: compost puts nutrients back into garden soil after plants have used them. Now try yours."], [
    ["The three main plant nutrients are nitrogen, phosphorus and...", "Potassium", "Plastic", "Helium"],
    ["Which soil drains water fastest?", "Sandy soil", "Clay soil", "Frozen soil"],
    ["Humus is made of...", "Rotted plants and animals", "Plastic", "Pure sand"],
    ["Adding lime to soil makes it...", "Less acidic", "More acidic", "Orange"],
    ["Which soil holds water best?", "Clay soil", "Sandy soil", "Dry sand"],
    ["Compost helps soil by...", "Adding nutrients", "Adding plastic", "Removing air"],
    ["What does N stand for as plant food?", "Nitrogen", "Neon", "Nickel"],
    ["Plants take nutrients from the soil through their...", "Roots", "Flowers", "Fruit"]
  ]));

  c.push(les("Carbon footprint", [
    ["Our footprint", "👣", "Your <b>carbon footprint</b> is the amount of carbon dioxide and other greenhouse gases made by what you do: energy at home, travel, food and things you buy."],
    ["Where it comes from", "🏠", "Burning fossil fuels for electricity, heating and cars is the biggest source. Trees and plants absorb carbon dioxide, so protecting forests helps."],
    ["Ways to reduce", "💡", "Turn off lights, use LED bulbs, walk or cycle, share rides, reduce food waste, reuse and recycle, and ask your family about cleaner energy."]
  ], ["Think of choices that burn less fuel or waste less.", "Walking instead of driving and switching off unused lights both use less energy.", "Example: using an LED bulb instead of an old bulb uses less electricity for the same light. Now try yours."], [
    ["Which action reduces your carbon footprint?", "Walking to a nearby shop", "Leaving lights on all day", "Driving for 100 metres"],
    ["Plants and trees...", "Absorb carbon dioxide", "Make carbon dioxide only", "Burn fossil fuels"],
    ["Carbon footprint measures...", "Greenhouse gases made by activities", "How big your shoes are", "The weight of your bag"],
    ["Which saves energy?", "Switching off unused lights", "Leaving the TV on", "Opening the fridge all day"],
    ["What is the biggest source of carbon dioxide?", "Burning fossil fuels", "Planting trees", "Breathing in"],
    ["Wasting less food helps because...", "Making food uses energy", "Food is free", "It has no effect"],
    ["Which is a good way to travel to reduce your footprint?", "Cycling", "A private jet", "Idling a car"],
    ["LED bulbs help because they...", "Use less electricity", "Use more electricity", "Make heat only"]
  ]));

  c.push(les("Chemistry in space", [
    ["Stars and planets", "🌌", "The Sun is mostly <b>hydrogen</b> and <b>helium</b>. On Mars, the thin atmosphere is mostly <b>carbon dioxide</b>, so people could not breathe there."],
    ["Living in space", "🧑‍🚀", "Astronauts need oxygen, water and food. On the space station, water is cleaned and <b>recycled</b>, even water from the air they breathe out."],
    ["Rocket fuel", "🚀", "Rockets burn a fuel with oxygen. Some use liquid hydrogen and liquid oxygen, which make water vapour. The hot gases rushing downwards push the rocket up."]
  ], ["Think about which gases are in the Sun and Mars, and what astronauts need.", "Hydrogen and helium are the two lightest elements; Mars has a carbon-based gas in its air.", "Example: a station recycles water because bringing water from Earth is heavy and costly. Now try yours."], [
    ["The Sun is mostly...", "Hydrogen and helium", "Iron and oxygen", "Water and sand"],
    ["The air on Mars is mostly...", "Carbon dioxide", "Oxygen", "Water"],
    ["Why do astronauts recycle water?", "Taking water into space is heavy and costly", "Water is poisonous", "They love recycling bins"],
    ["Some rockets burn liquid hydrogen with liquid...", "Oxygen", "Helium", "Neon"],
    ["Burning hydrogen with oxygen makes...", "Water vapour", "Soot", "Carbon dioxide"],
    ["A rocket goes up because hot gases rush...", "Downwards", "Upwards only", "Sideways"],
    ["Astronauts need to bring or make...", "Oxygen, water and food", "Only sand", "Nothing"],
    ["Which element is the lightest?", "Hydrogen", "Gold", "Iron"]
  ]));

  c.push(les("Choosing a graph", [
    ["Different graphs", "📊", "The right graph makes data easy to understand. Choose by the kind of data you have."],
    ["Which one?", "📈", "<b>Bar chart</b>: compare separate groups (like colours or foods). <b>Line graph</b>: show change over time or between measurements that run on a scale. <b>Pie chart</b>: show parts of a whole."],
    ["Check it", "✅", "Always give a title, axis labels and units, and start the scale in a sensible place. A good graph lets someone else see the pattern quickly."]
  ], ["Is the data in separate groups, a change over time, or parts of a whole?", "Groups use bars, change uses a line, parts of a whole use a circle.", "Example: the percent of each gas in air shows parts of a whole. Now try yours."], [
    ["Best graph for the temperature of cooling tea over time?", "Line graph", "Pie chart", "Bar chart of names"],
    ["Best graph to compare the mass of 5 different fruits?", "Bar chart", "Line graph of time", "Pie chart of time"],
    ["Best graph to show what fraction of a rock sample is each mineral?", "Pie chart", "Line graph", "Table of dates"],
    ["A pie chart shows...", "Parts of a whole", "A change over time", "A map"],
    ["A line graph is best for showing...", "Change over time", "Names of people", "Pictures"],
    ["A bar chart is best for comparing...", "Separate groups", "Weather", "The time of day"],
    ["A good graph needs...", "A title and labelled axes", "Only colours", "No numbers"],
    ["The scale on a graph should be...", "Even and sensible", "Random", "Hidden"]
  ]));

  c.push(les("Planning an investigation", [
    ["Start with a question", "❓", "A good investigation starts with a question you can test, such as \"Does the temperature of water change how fast sugar dissolves?\""],
    ["Plan the steps", "📋", "Make a prediction (hypothesis), choose what to change, measure and keep the same. List equipment and steps. Do a <b>risk assessment</b>: what could go wrong, and how will you stay safe?"],
    ["Then do it", "🔬", "Do the test, repeat it, record in a table, make a graph, and write a conclusion. Say what went well and what you would improve."]
  ], ["Think about the order of the steps in a good plan.", "Question first, then prediction and plan, then doing the test, then conclusion.", "Example: before heating, a pupil thinks about hot glass and splashes and decides to wear goggles. Now try yours."], [
    ["What comes first?", "A testable question", "The conclusion", "The graph"],
    ["A risk assessment is about...", "What could go wrong and how to stay safe", "Painting the lab", "Choosing a title"],
    ["After you collect results, you...", "Show them in a table or graph", "Hide them", "Throw them away"],
    ["Which step comes last?", "Write a conclusion", "Choose the question", "Plan the steps"],
    ["Why repeat the test?", "To make the results more reliable", "To use more time", "Because it is fun"],
    ["A prediction that can be tested is a...", "Hypothesis", "Hazard", "Mixture"],
    ["Your conclusion should say...", "What the results show", "What you had for lunch", "A secret"],
    ["Listing the equipment helps others to...", "Repeat the test", "Break the test", "Skip the test"]
  ]));

  c.push(
    mix("Mixed practice", at(c, [0, 1, 2, 3, 5, 6, 8, 9, 10, 12, 14, 16])),
    mix("Level 15 Challenge", at(c, [4, 7, 11, 13, 15, 17, 0, 3, 9, 12]))
  );

  Object.assign(CHEM_LEVELS, { 13: a, 14: b, 15: c });
})();
