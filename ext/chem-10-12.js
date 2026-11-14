// ext/chem-10-12.js  Mind Lab Chemistry levels 10-12 (grade 4 second half, grade 5 both halves)
(() => {
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
  const AR = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Ca: 40, Fe: 56, Cu: 64 };
  const ARTXT = "Ar values: H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, Al = 27, S = 32, Ca = 40, Fe = 56, Cu = 64.";
  const parse = f => { const o = {}; (f.match(/[A-Z][a-z]?\d*/g) || []).forEach(p => { const e = p.match(/[A-Z][a-z]?/)[0], n = +(p.slice(e.length) || 1); o[e] = (o[e] || 0) + n; }); return o; };
  const expand = f => { let s = f, m; while ((m = s.match(/\(([^()]*)\)(\d*)/))) { const k = +(m[2] || 1), o = parse(m[1]); s = s.replace(m[0], Object.entries(o).map(([e, n]) => e + (n * k)).join("")); } return s; };
  const atoms = f => parse(expand(f));
  const mr = f => Object.entries(atoms(f)).reduce((t, [e, n]) => t + AR[e] * n, 0);
  const r2 = x => Math.round(x * 1000) / 1000;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const num = (text, answer, hints, visual) => ({ text, answer, hints, visual });

  // ================= LEVEL 10 =================
  const a = [];

  a.push(les("Noble gases", [
    ["The far-right group", "🎈", "The <b>noble gases</b> are in Group 18 (also called Group 0), on the far right of the periodic table: helium, neon, argon, krypton and xenon."],
    ["Full outer shells", "🔒", "Their outer shell of electrons is <b>full</b>. Atoms with full shells do not need to gain, lose or share electrons, so noble gases are almost <b>unreactive</b>."],
    ["Useful gases", "💡", "Helium fills balloons, neon makes glowing signs and argon fills light bulbs. They exist as <b>single atoms</b>, not molecules."]
  ], ["Think about what makes an atom want to react: does it have a full outer shell or not?", "Use the idea of full outer shells and the position on the right of the table.", "Example: xenon is also a noble gas, in Group 18, with a full outer shell, so it hardly reacts. Now try yours."], [
    ["Which group are the noble gases in?", "Group 18, the far right", "Group 1, the far left", "Group 17, next to the noble gases"],
    ["Which one is a noble gas?", "Argon", "Oxygen", "Chlorine"],
    ["Which one is a noble gas?", "Neon", "Nitrogen", "Sulfur"],
    ["Which one is a noble gas?", "Helium", "Hydrogen", "Sodium"],
    ["Why are noble gases almost unreactive?", "Their outer electron shell is full", "They have only one outer electron", "They are too heavy to move"],
    ["Why is helium good for party balloons?", "It is lighter than air and does not burn", "It is heavier than air", "It burns with a bright flame"],
    ["Why is argon put inside light bulbs?", "It is unreactive, so the hot wire does not burn away", "It is very reactive", "It makes the bulb colder"],
    ["Which noble gas is used to make glowing signs?", "Neon", "Oxygen", "Chlorine"],
    ["How do noble gases exist?", "As single atoms", "As pairs of atoms joined together", "As giant lattices"],
    ["How many electrons are in the full outer shell of neon?", "8", "1", "2"]
  ]));

  a.push(les("Transition metals", [
    ["The middle block", "🧲", "The <b>transition metals</b> sit in the middle block of the periodic table. Iron, copper, nickel, titanium and chromium are transition metals."],
    ["Their properties", "🔩", "They are hard, strong and shiny, with high melting points and high density. Their compounds are often <b>colored</b>, and many make good <b>catalysts</b>."],
    ["Different charges", "➕", "A transition metal can form ions with different charges. A Roman number shows it: <b>copper(II)</b> has a 2+ charge and <b>iron(III)</b> has a 3+ charge."]
  ], ["Think about where the block sits and what the metals are like compared with Group 1 metals.", "Transition metals are tougher and denser than soft Group 1 metals, and their compounds are often colorful.", "Example: in cobalt(II) chloride the (II) tells us the cobalt ion has a 2+ charge. Now try yours."], [
    ["Which one is a transition metal?", "Copper", "Sodium", "Chlorine"],
    ["Which one is a transition metal?", "Iron", "Calcium", "Oxygen"],
    ["Which one is a transition metal?", "Nickel", "Potassium", "Neon"],
    ["Compared with Group 1 metals, transition metals are usually...", "Harder, denser and higher melting", "Softer and lower melting", "Gases at room temperature"],
    ["Compounds of transition metals are often...", "Colored", "Always white", "Always invisible"],
    ["In iron(III) oxide, what does the (III) tell us?", "The iron ion has a 3+ charge", "There are 3 iron atoms", "There are 3 oxygen atoms"],
    ["In copper(II) sulfate, what does the (II) tell us?", "The copper ion has a 2+ charge", "There are 2 sulfur atoms", "It has 2 water molecules"],
    ["Iron is used as a catalyst in making ammonia. A catalyst...", "Speeds up a reaction without being used up", "Is the main product", "Slows the reaction down"],
    ["Where are transition metals on the periodic table?", "In the middle block", "On the far right", "At the very top only"]
  ]));

  a.push(les("Metals and non-metals", [
    ["Properties of metals", "🔧", "Metals are shiny, <b>conduct</b> heat and electricity, and can be bent or hammered (<b>malleable</b>). Most are solid at room temperature."],
    ["Properties of non-metals", "🧪", "Solid non-metals are usually dull and <b>brittle</b> (they snap or crumble). Most do not conduct electricity. Graphite is a famous exception."],
    ["Ions and oxides", "⚡", "Metal atoms <b>lose</b> electrons to make positive ions; non-metal atoms tend to <b>gain</b> electrons. Metal oxides are usually basic, and non-metal oxides are usually acidic."]
  ], ["Think about whether the property is shiny and bendy (metal) or dull and crumbly (non-metal).", "Metals lose electrons and conduct; non-metals gain or share electrons and mostly do not conduct.", "Example: a lump of sulfur is dull and snaps easily, so it is a non-metal. Now try yours."], [
    ["Which property do metals have?", "They conduct electricity", "They are brittle and dull", "They are always gases"],
    ["Malleable means a material can be...", "Hammered into shape without breaking", "Dissolved in water", "Seen through"],
    ["A dull, crumbly solid that does not conduct is most likely a...", "Non-metal", "Metal", "Transition metal"],
    ["Metal atoms usually form ions by...", "Losing electrons", "Gaining electrons", "Losing protons"],
    ["Non-metal atoms usually form ions by...", "Gaining electrons", "Losing electrons", "Losing neutrons"],
    ["Which non-metal conducts electricity?", "Graphite", "Sulfur", "Diamond"],
    ["Which metal is a liquid at room temperature?", "Mercury", "Iron", "Copper"],
    ["Metal oxides are usually...", "Basic", "Acidic", "Gases"],
    ["Non-metal oxides, such as sulfur dioxide, are usually...", "Acidic", "Basic", "Shiny solids"],
    ["Which one is a non-metal?", "Carbon", "Zinc", "Magnesium"]
  ]));

  a.push(les("Alloys", [
    ["Mixing metals", "🥉", "An <b>alloy</b> is a mixture of a metal with at least one other element. Brass is copper and zinc. Bronze is copper and tin. Steel is iron with a little carbon."],
    ["Why harder?", "🧱", "In a pure metal the layers of identical atoms slide over each other easily, so it is soft. In an alloy, atoms of a different size <b>block the layers</b> from sliding, so it is harder."],
    ["Useful alloys", "🛠️", "Stainless steel (iron with chromium) does not rust. Pure gold is too soft for jewelry, so it is often mixed with other metals."]
  ], ["Think about what an alloy is made from and what the different-sized atoms do to the layers.", "Different-sized atoms stop the layers from sliding, which changes how hard the metal is.", "Example: solder is an alloy of tin with another metal and is used to join wires. Now try yours."], [
    ["What is an alloy?", "A mixture of a metal with other elements", "A pure element", "A kind of gas"],
    ["Brass is an alloy of copper and...", "Zinc", "Tin", "Carbon"],
    ["Bronze is an alloy of copper and...", "Tin", "Zinc", "Chromium"],
    ["Steel is mainly iron mixed with a little...", "Carbon", "Gold", "Neon"],
    ["Why is an alloy harder than a pure metal?", "Different-sized atoms stop the layers sliding", "It has no atoms", "It is always a liquid"],
    ["Why is pure gold mixed with other metals for rings?", "Pure gold is too soft", "Pure gold is too hard", "Pure gold is a gas"],
    ["Stainless steel is useful for cutlery because it...", "Does not rust", "Rusts quickly", "Dissolves in water"],
    ["Why are pure metals soft?", "Layers of atoms slide over each other", "They have no electrons", "They are made of molecules"],
    ["Which one is NOT an alloy?", "Pure copper", "Brass", "Bronze"]
  ]));

  a.push(les("Extracting metals", [
    ["Ores", "⛏️", "An <b>ore</b> is a rock that contains enough metal compound to be worth digging up. Most metals are found joined to oxygen or other elements."],
    ["Using carbon", "🏭", "Metals less reactive than carbon, like iron, are made by heating their oxide with carbon in a blast furnace. The oxide loses oxygen: this is called <b>reduction</b>."],
    ["Using electricity", "⚡", "Metals more reactive than carbon, like aluminum, need <b>electrolysis</b>. A few very unreactive metals, such as gold, are found as the plain metal."]
  ], ["Think about how reactive the metal is compared with carbon.", "Less reactive than carbon: heat with carbon. More reactive than carbon: use electricity. Very unreactive: already pure.", "Example: zinc is less reactive than carbon, so it can be extracted by heating its oxide with carbon. Now try yours."], [
    ["What is an ore?", "A rock with enough metal compound to be worth extracting", "A pure metal bar", "A kind of gas"],
    ["Iron is extracted by heating its oxide with...", "Carbon", "Water", "Salt"],
    ["Aluminum is extracted using...", "Electrolysis", "Heating with carbon", "Digging it up pure"],
    ["Gold is often found...", "As the uncombined metal", "Only as an oxide", "Only as a gas"],
    ["Reduction of a metal oxide means...", "Removing oxygen from it", "Adding oxygen to it", "Dissolving it in water"],
    ["Why can't carbon be used to extract sodium?", "Sodium is more reactive than carbon", "Sodium is less reactive than carbon", "Sodium is a gas"],
    ["Where is iron made from iron ore?", "In a blast furnace", "In a freezer", "In a fish tank"],
    ["Recycling metals is a good idea because it...", "Saves energy and ore", "Makes more waste", "Uses up more ore"],
    ["A metal found as a plain metal in the ground is probably...", "Very unreactive", "Very reactive", "A gas"]
  ]));

  a.push(les("Rusting", [
    ["What is rust?", "🟤", "<b>Rust</b> is the reddish-brown iron oxide that forms when iron reacts with <b>oxygen and water</b> together. Only iron (and steel) rusts."],
    ["Stopping rust", "🎨", "Keep air and water away: <b>paint</b>, oil or plastic coatings. <b>Galvanizing</b> coats iron with zinc. Zinc is more reactive, so it corrodes first and protects the iron."],
    ["Faster rusting", "🌊", "Salt speeds up rusting, which is why cars and ships near the sea rust fast."]
  ], ["Rusting needs two things from the air and water around us. Which ones?", "To stop rust, block those two things, or use a more reactive metal that gets used up first.", "Example: painting a bicycle frame keeps air and water off the iron. Now try yours."], [
    ["What two things are needed for iron to rust?", "Oxygen and water", "Only oxygen", "Only water"],
    ["Which of these would NOT help stop rust?", "Leaving iron in salty water", "Painting it", "Coating it in oil"],
    ["Galvanizing means coating iron with...", "Zinc", "Salt", "Sand"],
    ["Rust is...", "Iron oxide with water", "Pure iron", "A noble gas"],
    ["Why does a nail in oil-covered, boiled water not rust?", "There is no air getting in", "Oil makes iron burn", "Water cannot touch iron"],
    ["Why do zinc blocks on a ship's iron hull protect it?", "Zinc is more reactive, so it corrodes first", "Zinc is less reactive", "Zinc is a gas"],
    ["Rusting is faster in...", "Salty sea water", "Dry air", "A vacuum"],
    ["Which metal does NOT rust, because it makes a protective oxide layer?", "Aluminum", "Iron", "Steel"],
    ["The word rust is used only for...", "Iron and steel", "All metals", "Plastics"]
  ]));

  a.push(les("Conservation of mass", [
    ["Nothing is lost", "⚖️", "In a chemical reaction, atoms are <b>not created or destroyed</b>. So the total mass of the reactants equals the total mass of the products."],
    ["Adding up", "➕", "If 24 g of magnesium reacts with 16 g of oxygen, the magnesium oxide weighs 24 + 16 = 40 g."],
    ["Missing mass?", "💨", "If a bubbling reaction in an open flask seems to lose mass, a gas escaped into the air. In a sealed flask, the mass stays the same."]
  ], ["Total mass before = total mass after. What do you need to add or subtract?", "Add the masses on one side, then subtract the part you already know from the total.", "Example: 8 g of A and 12 g of B make 20 g of product. If you know the product is 20 g and A is 8 g, then B is 20 - 8. Now do yours."], [
    () => { const x = ri(2, 30), y = ri(2, 30); return num(`<b>${x} g</b> of substance A reacts completely with <b>${y} g</b> of substance B to make one product. What is the mass of the product in grams?`, x + y, ["Atoms are not lost, so the product holds all the mass of the reactants.", "Add the two reactant masses together.", "Example: 5 g plus 7 g makes 12 g of product. Now do yours."], "⚖️"); },
    () => { const x = ri(2, 30), y = ri(2, 30); return num(`<b>${x + y} g</b> of product is made from substance A and substance B. If <b>${x} g</b> of A was used, how many grams of B were used?`, y, ["Total reactant mass equals the product mass.", "Take the known reactant mass away from the product mass.", "Example: 20 g of product, 8 g of A, so B was 20 - 8 = 12 g. Now do yours."], "🧪"); },
    () => { const m = pick([25, 50, 100]), cao = m * 0.56, co2 = m * 0.44; return num(`Heating <b>${m} g</b> of calcium carbonate gives <b>${cao} g</b> of calcium oxide and carbon dioxide gas. How many grams of carbon dioxide were made?`, co2, ["The carbonate splits into two products. Their masses add up to the starting mass.", "Subtract the oxide mass from the carbonate mass.", "Example: 30 g splits into 20 g of one product and the rest is the other product: 30 - 20 = 10 g. Now do yours."], "🔥"); },
    () => { const mg = pick([12, 24, 48]), o = mg * 2 / 3; return num(`<b>${mg} g</b> of magnesium burns in air and joins with <b>${o} g</b> of oxygen. What is the mass of magnesium oxide in grams?`, mg + o, ["The oxide is made from both the magnesium and the oxygen.", "Add the magnesium and oxygen masses.", "Example: 10 g of one element joins 4 g of another to make 14 g of compound. Now do yours."], "✨"); },
    ["Baking soda and vinegar fizz in an open cup and the mass goes down. Why?", "Carbon dioxide gas escaped", "Atoms were destroyed", "The cup got lighter"],
    ["In a sealed flask, a reaction makes a gas. The total mass...", "Stays the same", "Goes up", "Goes down"],
    ["Which law says mass is not lost or made in a reaction?", "Conservation of mass", "Gravity", "Melting point"],
    ["A piece of iron wool is burned and the ash weighs MORE than the iron wool. Why?", "Oxygen from the air joined the iron", "Atoms were created", "The iron grew bigger on its own"]
  ]));

  const PCT = [["CuO", "Cu", 64, 80], ["CuO", "O", 16, 80], ["Fe2O3", "Fe", 112, 160], ["Fe2O3", "O", 48, 160], ["SO2", "S", 32, 64], ["SO3", "S", 32, 80], ["SO3", "O", 48, 80],
    ["CH4", "C", 12, 16], ["CH4", "H", 4, 16], ["CaCO3", "Ca", 40, 100], ["CaCO3", "O", 48, 100], ["CaCO3", "C", 12, 100], ["NaOH", "O", 16, 40]];
  a.push(les("Percentage of an element", [
    ["Part of a whole", "🥧", "The <b>percentage of an element</b> in a compound tells you how much of its mass is that element."],
    ["The method", "🧮", "Percentage = (mass of the element in the formula ÷ total formula mass) × 100. Example: in MgO, Mg is 24 out of 40 so 24 ÷ 40 × 100 = 60%."],
    ["Check", "✅", "Percentages of all the elements in a compound add up to 100%."]
  ], [], [
    () => { const p = pick(PCT); return num(`${ARTXT}<br>What is the percentage by mass of <b>${p[1]}</b> in <b>${fmt(p[0])}</b>? (Total formula mass = ${p[3]})`, p[2] / p[3] * 100,
      ["First find how much of the formula mass belongs to your element, counting every atom of it.", "Divide the element's part by the total formula mass, then multiply by 100.", "Example: in MgO, Mg is 24 out of a total of 40, so 24 ÷ 40 = 0.6, which is 60%. Now do yours."], "🥧"); }
  ]));
  a[a.length - 1] = (() => { // add some multiple choice variety
    const base = a[a.length - 1];
    const extra = [
      ["In a compound, the percentages of all its elements add up to...", "100%", "50%", "10%"],
      ["Water is H2O. Hydrogen is 2 out of a total of 18 of the mass. Which is true?", "Oxygen makes up most of the mass", "Hydrogen makes up most of the mass", "They are equal"],
      ["To find a percentage by mass you finish by...", "Multiplying by 100", "Adding 100", "Dividing by 100"],
      ["A compound has total formula mass 50 and the element part is 25. What is the percentage?", "50%", "25%", "75%"],
      ["A compound has total formula mass 20 and the element part is 5. What is the percentage?", "25%", "5%", "40%"]
    ];
    const hints = ["Think about the part and the whole: which number goes on top of the fraction?", "Put the element's mass over the total formula mass, then multiply by 100.", "Example: 3 out of 12 is 3 ÷ 12 = 0.25, which is 25%. Now try yours."];
    const make = () => Math.random() < 0.65 ? base.make() : (() => { const it = pick(extra); return { text: it[0], choices: shuf(it.slice(1)), answer: it[1], hints }; })();
    make.teach = base.make.teach; make.slide = base.make.slide;
    return { title: base.title, make };
  })();

  a.push(les("Alkanes", [
    ["Hydrocarbons with single bonds", "⛽", "<b>Alkanes</b> are hydrocarbons (only carbon and hydrogen) with only <b>single bonds</b>. They are <b>saturated</b>: they hold as many hydrogen atoms as possible."],
    ["The first four", "🔥", "Methane CH<sub>4</sub>, ethane C<sub>2</sub>H<sub>6</sub>, propane C<sub>3</sub>H<sub>8</sub>, butane C<sub>4</sub>H<sub>10</sub>. Then pentane (5 C), hexane (6 C), heptane (7 C), octane (8 C)."],
    ["The pattern", "🔢", "An alkane with <b>n</b> carbon atoms has <b>2n + 2</b> hydrogen atoms. Propane and butane are used in camping stoves."]
  ], ["Count the carbon atoms, then use the pattern for hydrogen atoms.", "Hydrogens = 2 × carbons + 2. Names go meth, eth, prop, but, pent, hex, hept, oct.", "Example: pentane has 5 carbons so its hydrogens are 2 × 5 + 2 = 12, giving C5H12. Now try yours."], [
    () => { const n = ri(3, 10); return num(`How many hydrogen atoms are in an alkane molecule with <b>${n}</b> carbon atoms?`, 2 * n + 2, ["Alkanes follow a pattern linking carbons and hydrogens.", "Double the number of carbons, then add 2.", "Example: with 4 carbons, 2 × 4 + 2 = 10 hydrogens (butane). Now do yours."], "⛽"); },
    () => { const n = ri(4, 10); return num(`An alkane has <b>${2 * n + 2}</b> hydrogen atoms. How many carbon atoms does it have?`, n, ["Work backwards from the 2n + 2 pattern.", "Take away 2 from the hydrogens, then halve it.", "Example: an alkane with 14 hydrogens has (14 - 2) ÷ 2 = 6 carbons. Now do yours."], "⛽"); },
    ["Which is the formula of propane?", fmt("C3H8"), fmt("C3H6"), fmt("C2H6")],
    ["Which is the formula of methane?", fmt("CH4"), fmt("C2H4"), fmt("CH2")],
    ["Which alkane has 2 carbon atoms?", "Ethane", "Methane", "Propane"],
    ["Which alkane has 4 carbon atoms?", "Butane", "Propane", "Pentane"],
    ["Saturated means a hydrocarbon has...", "Only single bonds between carbons", "A double bond", "No hydrogen atoms"],
    ["What does hydrocarbon mean?", "Contains only hydrogen and carbon", "Contains hydrogen and oxygen", "Is made of water"],
    ["Which alkane has 6 carbon atoms?", "Hexane", "Pentane", "Octane"],
    ["Which two fuels are used in camping stoves?", "Propane and butane", "Methane and neon", "Octane and helium"]
  ]));

  a.push(les("Alkenes", [
    ["A double bond", "🔗", "<b>Alkenes</b> are hydrocarbons with a <b>double bond</b> (C=C) between two carbon atoms. Ethene is C<sub>2</sub>H<sub>4</sub> and propene is C<sub>3</sub>H<sub>6</sub>."],
    ["Unsaturated", "🧷", "Because of the double bond they hold fewer hydrogens, so they are <b>unsaturated</b>. An alkene with n carbons has 2n hydrogens."],
    ["Bromine test", "🟠", "Shake with orange <b>bromine water</b>: an alkene turns it <b>colorless</b>. An alkane leaves it orange."]
  ], ["Look for a double bond between carbons, or think about the bromine water test.", "Alkenes are unsaturated, and they decolorize orange bromine water. Alkanes do not.", "Example: butene (C4H8) is an alkene, so it turns bromine water colorless. Now try yours."], [
    ["What is special about an alkene?", "It has a carbon-carbon double bond", "It has only single bonds", "It has no carbon"],
    ["Which is the formula of ethene?", fmt("C2H4"), fmt("C2H6"), fmt("CH4")],
    ["Which is the formula of propene?", fmt("C3H6"), fmt("C3H8"), fmt("C2H4")],
    ["Alkenes are called unsaturated because they...", "Have a double bond and fewer hydrogens", "Are dissolved in water", "Have too many hydrogens"],
    ["Bromine water is orange. What happens when ethene is shaken with it?", "It turns colorless", "It stays orange", "It turns blue"],
    ["What happens when an alkane is shaken with bromine water?", "It stays orange", "It turns colorless", "It turns green"],
    () => { const n = ri(2, 8); return num(`An alkene has <b>${n}</b> carbon atoms. How many hydrogen atoms does it have? (an alkene has 2n hydrogens)`, 2 * n, ["Each alkene has twice as many hydrogens as carbons.", "Multiply the number of carbons by 2.", "Example: with 5 carbons, 2 × 5 = 10 hydrogens. Now do yours."], "🔗"); },
    ["Which one is an alkene?", fmt("C2H4"), fmt("C2H6"), fmt("C3H8")],
    ["Which is an unsaturated hydrocarbon?", "Ethene", "Ethane", "Methane"],
    ["The simplest alkene has how many carbon atoms?", "2", "1", "3"]
  ]));

  a.push(les("Polymers", [
    ["Long chains", "⛓️", "A <b>polymer</b> is a very long molecule made by joining thousands of small molecules called <b>monomers</b>."],
    ["Making poly(ethene)", "🛍️", "Ethene monomers have a double bond. The bond opens, and they join into a long chain called poly(ethene), used for bags and bottles."],
    ["Plastics", "♻️", "Plastics are polymers. Some melt when heated and can be reshaped (<b>thermoplastics</b>). Others stay hard when heated. Recycling plastic helps the planet."]
  ], ["A polymer is a long chain. What are the little parts called?", "Monomers join to make a polymer. Think about the prefix poly meaning many.", "Example: many propene monomers join to make poly(propene). Now try yours."], [
    ["What is a monomer?", "A small molecule that can join into a chain", "A very long chain", "A metal"],
    ["What is a polymer?", "A very long molecule made of many monomers", "A single atom", "A noble gas"],
    ["Poly(ethene) is made from which monomer?", "Ethene", "Ethane", "Methane"],
    ["The word poly means...", "Many", "One", "None"],
    ["What happens to the double bond when ethene makes a polymer?", "It opens up so the molecules can join", "It gets doubled", "It disappears with the carbon"],
    ["Which everyday item is often made of poly(ethene)?", "Plastic bags", "Gold rings", "Glass windows"],
    ["A thermoplastic...", "Softens when heated and can be reshaped", "Never changes with heat", "Turns into metal"],
    ["Why is recycling plastic useful?", "It reduces waste and saves resources", "It makes more rubbish", "It uses up more oil"],
    ["Nylon is a...", "Polymer", "Noble gas", "Metal ore"]
  ]));

  a.push(les("Greenhouse effect", [
    ["Warm blanket", "🌍", "Gases such as <b>carbon dioxide</b> and <b>methane</b> trap heat around Earth, like a blanket. This is the <b>greenhouse effect</b>. A little keeps Earth warm enough for life."],
    ["Too much", "🏭", "Burning fossil fuels and cutting down forests add extra carbon dioxide, so Earth warms more. This is <b>global warming</b>."],
    ["The carbon cycle", "🌱", "Plants take in carbon dioxide for photosynthesis. Animals, burning and decay put it back into the air. Planting trees helps balance it."]
  ], ["Think about which gases trap heat and what puts them in or takes them out of the air.", "Photosynthesis takes CO2 in; burning fuels and breathing put it out.", "Example: a growing forest takes in carbon dioxide as the trees make food. Now try yours."], [
    ["Which gas is a greenhouse gas?", "Carbon dioxide", "Argon", "Helium"],
    ["Methane is...", "A greenhouse gas", "A noble gas", "A metal"],
    ["What does burning fossil fuels add to the air?", "Carbon dioxide", "More noble gases", "Helium"],
    ["Which process takes carbon dioxide out of the air?", "Photosynthesis", "Burning", "Rusting"],
    ["Which helps reduce carbon dioxide in the air?", "Planting trees", "Cutting down more forests", "Burning more coal"],
    ["Why do we need some greenhouse effect?", "It keeps Earth warm enough for life", "It makes Earth freezing", "It removes oxygen"],
    ["Global warming is caused mainly by...", "Extra greenhouse gases from human activity", "Too many noble gases", "Water boiling"],
    ["Which of these puts carbon dioxide into the air?", "Animals breathing out", "Plants making food", "Trees growing"],
    ["Using less energy and cleaner energy such as wind and solar helps because...", "It cuts the carbon dioxide we make", "It adds more methane", "It melts rocks"]
  ]));

  a.push(les("Rate graphs", [
    ["Reading the slope", "📈", "On a graph of product made (y) against time (x), a <b>steep</b> line means a <b>fast</b> reaction. A gentle slope means slow."],
    ["Flat line", "➖", "When the line goes <b>flat</b>, the reaction has <b>finished</b>: no more product is being made."],
    ["Calculating rate", "🧮", "Rate = amount of product ÷ time taken. For example 20 cm<sup>3</sup> of gas in 4 minutes is 5 cm<sup>3</sup> per minute."]
  ], ["Think about what the steepness and the flat part of the graph tell you.", "Steep = fast. Flat = finished. Rate = amount ÷ time.", "Example: 18 cm³ of gas in 3 minutes is 18 ÷ 3 per minute. Now try yours."], [
    () => { const t = pick([2, 4, 5, 10]), r = pick([2, 3, 4, 5, 6, 10]); return num(`A reaction makes <b>${r * t} cm³</b> of gas in <b>${t} minutes</b>. What is the average rate in cm³ per minute?`, r, ["Rate compares how much was made with how long it took.", "Divide the volume of gas by the time.", "Example: 24 cm³ in 6 minutes is 24 ÷ 6 per minute. Now do yours."], "📈"); },
    () => { const t = pick([2, 3, 5, 10]), r = pick([2, 3, 4, 5, 8]); return num(`A reaction runs at <b>${r} cm³ per minute</b>. How many cm³ of gas are made in <b>${t} minutes</b>?`, r * t, ["The rate tells you how much is made every minute.", "Multiply the rate by the number of minutes.", "Example: at 3 cm³ per minute for 5 minutes you get 3 × 5 = 15 cm³. Now do yours."], "⏱️"); },
    ["On a graph of gas made against time, a steep line means the reaction is...", "Fast", "Slow", "Finished"],
    ["On a graph of gas made against time, a flat line means the reaction has...", "Finished", "Not started", "Speeded up"],
    ["Graph A is steeper than graph B. Which reaction is faster?", "A", "B", "They are the same"],
    ["As a reaction goes on, the line on the graph usually...", "Gets less steep, then flat", "Gets steeper forever", "Goes down"],
    ["Which graph shows a catalyst has been added?", "A steeper line that ends at the same height", "A line that ends lower", "A flat line from the start"],
    ["Which unit could measure a rate of gas made?", "cm³ per minute", "Grams per liter", "Degrees"]
  ]));

  a.push(les("Reversible reactions", [
    ["Both ways", "🔁", "In a <b>reversible reaction</b>, the products can turn back into the reactants. We write it with the symbol <b>⇌</b>."],
    ["Blue and white", "🔵", "Heat blue copper sulfate crystals and the water leaves, leaving white powder. Add water and it turns <b>blue again</b>, giving out heat."],
    ["Both directions", "↔️", "If the reaction is exothermic one way, it is endothermic the other way, with the same amount of energy."]
  ], ["Think about whether the products can change back into what you started with.", "Reversible reactions use the ⇌ arrow, and one direction gives out energy while the other takes it in.", "Example: ammonium chloride splits when heated and joins again on cooling, so that is reversible. Now try yours."], [
    ["Which symbol shows a reversible reaction?", "The double arrow pointing both ways", "A single arrow pointing right", "An equals sign"],
    ["What happens when you heat blue copper sulfate crystals?", "They turn white as water leaves", "They turn red", "They explode"],
    ["What happens when you add water to white copper sulfate powder?", "It turns blue again", "It turns black", "Nothing at all"],
    ["A reversible reaction can go...", "Forwards and backwards", "Forwards only", "Backwards only"],
    ["If the forward reaction is exothermic, the backward reaction is...", "Endothermic", "Also exothermic", "Not possible"],
    ["White copper sulfate powder is used as a test for...", "Water", "Oxygen", "Carbon dioxide"],
    ["In which does the product turn back into the reactants?", "A reversible reaction", "Burning paper", "Frying an egg"],
    ["Which is NOT easily reversed?", "Burning a match", "Heating and cooling copper sulfate crystals", "Melting and freezing"]
  ]));

  a.push(les("Hard and soft water", [
    ["Hard water", "🚰", "<b>Hard water</b> has calcium and magnesium ions dissolved from rocks. It does not lather well with soap and leaves <b>scum</b>. <b>Soft water</b> lathers easily."],
    ["Limescale", "🫖", "Heating hard water can leave <b>limescale</b> (calcium carbonate) inside kettles and pipes. This is called temporary hardness, and boiling removes it."],
    ["Softening", "🧂", "Water can be softened by <b>ion exchange</b>, which swaps calcium and magnesium ions for sodium ions. Hard water is good for strong bones and teeth."]
  ], ["Think about which ions are in hard water and what happens to soap.", "Hard water forms scum with soap and limescale when heated; softening removes the calcium and magnesium ions.", "Example: a kettle coated with white crust is a sign of hard water. Now try yours."], [
    ["Which ions make water hard?", "Calcium and magnesium", "Sodium and chlorine", "Helium and neon"],
    ["What happens when soap meets hard water?", "It forms scum and little lather", "It makes lots of foam", "It turns blue"],
    ["Limescale is mostly...", "Calcium carbonate", "Sodium chloride", "Iron"],
    ["Where does limescale form?", "Inside kettles and pipes", "On the moon", "In the air"],
    ["Soft water...", "Lathers easily with soap", "Forms lots of scum", "Has lots of calcium ions"],
    ["Ion exchange softens water by swapping calcium ions for...", "Sodium ions", "Iron ions", "Silver ions"],
    ["Where do the calcium ions in hard water come from?", "Rocks such as limestone", "The air", "Plants"],
    ["Hard water is good for people because the calcium...", "Helps build bones and teeth", "Stops them from sweating", "Cleans their clothes"],
    ["Boiling removes which kind of hardness?", "Temporary hardness", "All hardness at once", "Soft water"]
  ]));

  a.push(les("Chromatography and Rf", [
    ["Splitting colors", "🖍️", "<b>Chromatography</b> separates a mixture, like the dyes in ink. A solvent (such as water) soaks up the paper and carries the dyes up different distances."],
    ["Drawing the line", "✏️", "Draw the start line in <b>pencil</b>, because pencil does not dissolve. Ink would run up the paper too. The start line must sit above the solvent."],
    ["The Rf value", "🧮", "<b>Rf</b> = distance moved by the substance ÷ distance moved by the solvent. Rf is always between 0 and 1. The same substance has the same Rf."]
  ], ["Think about what chromatography separates and what the Rf compares.", "Rf compares the distance of the spot with the distance of the solvent front. Divide the spot by the solvent.", "Example: spot moves 3 cm, solvent 6 cm, so Rf = 3 ÷ 6. Now try yours."], [
    () => { const s = pick([5, 10, 20]), k = ri(1, 9), d = s * k / 10; return num(`The solvent moved <b>${s} cm</b> up the paper and a spot moved <b>${d} cm</b>. What is the Rf value of the spot?`, k / 10, ["Rf compares the spot's journey with the solvent's journey.", "Divide the distance moved by the spot by the distance moved by the solvent.", "Example: spot 3 cm, solvent 6 cm, Rf = 3 ÷ 6 = 0.5. Now do yours."], "🖍️"); },
    () => { const s = pick([5, 10, 20]), k = ri(1, 9), d = s * k / 10; return num(`A substance has an Rf of <b>${k / 10}</b>. The solvent moves <b>${s} cm</b>. How far does the substance move in cm?`, d, ["Use Rf = spot distance ÷ solvent distance, but find the spot distance.", "Multiply the Rf by the distance moved by the solvent.", "Example: Rf 0.5 and solvent 8 cm gives 0.5 × 8 = 4 cm. Now do yours."], "📏"); },
    ["Why is the start line drawn in pencil?", "Pencil does not dissolve in the solvent", "Pencil is colored", "Pencil is permanent ink"],
    ["Chromatography is used to...", "Separate the substances in a mixture", "Make new elements", "Measure mass"],
    ["Two spots have the same Rf in the same solvent. They are...", "Probably the same substance", "Definitely different", "Both gases"],
    ["Rf values are always...", "Between 0 and 1", "More than 10", "Negative"],
    ["The moving liquid in chromatography is called the...", "Solvent", "Solute", "Filter"],
    ["If an ink turns into three spots, the ink is...", "A mixture of three dyes", "A pure element", "A single dye"]
  ]));

  a.push(les("Testing for gases", [
    ["Hydrogen and oxygen", "🧪", "<b>Hydrogen</b>: a lit splint makes a squeaky <b>pop</b>. <b>Oxygen</b>: a glowing splint <b>relights</b>."],
    ["Carbon dioxide", "🥛", "Bubble the gas through <b>limewater</b> (clear). If it is carbon dioxide, the limewater turns <b>cloudy (milky)</b>."],
    ["Chlorine", "🟡", "<b>Chlorine</b> bleaches damp blue litmus paper white. It has a sharp smell and is toxic, so test it only with a teacher and in a fume cupboard."]
  ], ["Match the test result to the gas: pop, relight, milky or bleached.", "Squeaky pop is a light gas that burns. A glowing splint needs a gas that helps burning. Limewater gives a color change.", "Example: a gas that makes a damp indicator paper go white is chlorine. Now try yours."], [
    ["A lit splint gives a squeaky pop. The gas is...", "Hydrogen", "Oxygen", "Carbon dioxide"],
    ["A glowing splint relights. The gas is...", "Oxygen", "Hydrogen", "Chlorine"],
    ["Limewater turns cloudy. The gas is...", "Carbon dioxide", "Oxygen", "Hydrogen"],
    ["Damp blue litmus paper turns white. The gas is...", "Chlorine", "Hydrogen", "Oxygen"],
    ["Which test is used for carbon dioxide?", "Bubble it through limewater", "Use a glowing splint", "Use a lit splint"],
    ["Which test is used for oxygen?", "A glowing splint", "Limewater", "Bleaching litmus"],
    ["Which test is used for hydrogen?", "A lit splint", "A glowing splint", "Limewater"],
    ["Limewater is normally...", "Clear and colorless", "Milky", "Black"],
    ["Which gas is made when zinc reacts with acid?", "Hydrogen", "Chlorine", "Neon"]
  ]));

  const CAT = [["Na", 1], ["Li", 1], ["Mg", 2], ["Ca", 2], ["Al", 3], ["Zn", 2]];
  const ANI = [["Cl", 1], ["Br", 1], ["O", 2], ["S", 2], ["F", 1]];
  const ion = (s, n, pos) => `${s}<sup>${n > 1 ? n : ""}${pos ? "+" : "-"}</sup>`;
  const formulaFrom = (c, an) => {
    const g = gcd(c[1], an[1]), x = an[1] / g, y = c[1] / g;
    const right = c[0] + (x > 1 ? x : "") + an[0] + (y > 1 ? y : "");
    const sw = c[0] + (y > 1 ? y : "") + an[0] + (x > 1 ? x : "");
    const wrongs = [sw, c[0] + an[0], c[0] + (c[1] > 1 ? c[1] : 2) + an[0] + (an[1] > 1 ? an[1] : 3), c[0] + 2 + an[0] + 2].filter((w, i, arr) => w !== right && arr.indexOf(w) === i);
    return { right, wrongs: wrongs.slice(0, 3), cn: c, an };
  };
  a.push(les("Formulas from ions", [
    ["Balance the charges", "⚖️", "A compound has no overall charge, so the positive and negative charges must <b>cancel out</b>. Na<sup>+</sup> and Cl<sup>-</sup> make NaCl."],
    ["Swap and drop", "🔄", "Swap the charge numbers (ignore the signs) to make the subscripts, then simplify. Al<sup>3+</sup> and O<sup>2-</sup>: Al gets 2 and O gets 3, so Al<sub>2</sub>O<sub>3</sub>."],
    ["Check", "✅", "Check the total: 2 × (3+) = 6+ and 3 × (2-) = 6-. They cancel, so the formula is right."]
  ], [], [
    () => { const c = pick(CAT), an = pick(ANI), f = formulaFrom(c, an); return { text: `Which is the formula of the compound made from ${ion(c[0], c[1], true)} ions and ${ion(an[0], an[1], false)} ions?`, visual: "⚖️",
      choices: shuf([fmt(f.right), ...f.wrongs.map(fmt)]), answer: fmt(f.right),
      hints: ["The positive and negative charges must cancel out, so you may need more than one of an ion.", "Swap the charge numbers (ignoring signs) to become the subscripts, then divide both by any common factor.", "Example: K+ and O2- need two K+ for each O2-, giving K2O. Now do yours."] }; }
  ]));

  // ---------- Level 10 mixed ----------
  a.push(
    mix("Mixed practice", at(a, [0, 1, 3, 5, 6, 8, 12, 15])),
    mix("Level 10 Challenge", at(a, [2, 4, 7, 9, 10, 11, 13, 14, 16, 17]))
  );

  // ================= LEVEL 11 =================
  const b = [];

  const BR = ["Ca(OH)2", "Mg(OH)2", "Al(OH)3", "Ca(NO3)2", "Mg(NO3)2", "(NH4)2SO4", "Al2(SO4)3", "Cu(OH)2", "Fe(OH)3", "Fe2(SO4)3", "Cu(NO3)2"];
  b.push(les("Brackets in formulas", [
    ["What brackets mean", "🔍", "In Ca(OH)<sub>2</sub> the number outside the bracket multiplies <b>everything inside it</b>. So there are 2 oxygen atoms and 2 hydrogen atoms."],
    ["Counting", "🧮", "Ca(OH)<sub>2</sub> has 1 Ca, 2 O and 2 H, which is 5 atoms in total."],
    ["Bigger ones", "🧪", "In Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>: 2 Al, and inside the bracket S × 3 = 3 and O 4 × 3 = 12."]
  ], [], [
    () => { const f = pick(BR), at0 = atoms(f), el = pick(Object.keys(at0)); return num(`How many <b>${el}</b> atoms are in one unit of <b>${fmt(f)}</b>?`, at0[el],
      ["Find your element. Is it inside a bracket or outside it?", "If it is inside the bracket, multiply its small number by the number after the bracket. A symbol with no number counts as 1.", "Example: in Ba(OH)2, O is inside the bracket (1) and the bracket has a 2, so there are 1 × 2 = 2 O atoms. Now do yours."], "🔍"); },
    () => { const f = pick(BR), t = Object.values(atoms(f)).reduce((x, y) => x + y, 0); return num(`How many atoms are there altogether in one unit of <b>${fmt(f)}</b>?`, t,
      ["Count each element separately, then add up.", "Multiply everything in the bracket by the number after it, then add all the atom counts.", "Example: Ba(OH)2 has 1 Ba + 2 O + 2 H = 5 atoms. Now do yours."], "🧮"); }
  ]));

  const MRF = ["Ca(OH)2", "Mg(OH)2", "Al(OH)3", "Cu(OH)2", "Ca(NO3)2", "Mg(NO3)2", "(NH4)2SO4", "Fe(OH)3", "Cu(NO3)2", "CaCO3", "H2SO4", "Fe2O3"];
  b.push(les("Relative formula mass", [
    ["Add up the Ar values", "➕", "The <b>relative formula mass (Mr)</b> is the sum of the Ar values of all atoms in the formula. For H<sub>2</sub>O: 2 × 1 + 16 = 18."],
    ["With brackets", "🔍", "Ca(OH)<sub>2</sub>: Ca 40 + 2 × (O 16 + H 1) = 40 + 34 = 74."],
    ["Careful", "💡", "Mr has no units. Count every atom, including those multiplied by brackets."]
  ], [], [
    () => { const f = pick(MRF); return num(`${ARTXT}<br>What is the relative formula mass (Mr) of <b>${fmt(f)}</b>?`, mr(f),
      ["Count the atoms of each element first, using the brackets.", "Multiply each Ar by the number of those atoms, then add them all up.", "Example: for Ba(OH)2 you would do the same: count Ba, O and H atoms (O and H are doubled), multiply by their Ar and add. Now do yours."], "➕"); }
  ]));

  const MOLEF = ["CO2", "H2O", "NaOH", "CaCO3", "MgO", "CH4", "SO2", "CuO", "Fe2O3", "H2SO4"];
  b.push(les("Moles from mass", [
    ["What is a mole?", "🔢", "Atoms are far too small to count one by one, so chemists count in <b>moles</b>. One mole of any substance has a mass in grams equal to its Mr."],
    ["The formula", "🧮", "<b>Moles = mass (g) ÷ Mr.</b> Example: 36 g of water, Mr 18, is 36 ÷ 18 = 2 moles."],
    ["Check", "✅", "More mass means more moles. One Mr of grams is exactly 1 mole."]
  ], [], [
    () => { const f = pick(MOLEF), n = pick([0.5, 1, 2, 3, 4, 5]), m = n * mr(f); return num(`${ARTXT}<br>How many moles are in <b>${m} g</b> of <b>${fmt(f)}</b>?`, n,
      ["First work out the Mr of the substance.", "Divide the mass in grams by the Mr.", "Example: 64 g of O2 (Mr 32) is 64 ÷ 32 = 2 moles. Now do yours with your substance."], "🔢"); }
  ]));

  b.push(les("Mass from moles", [
    ["Reverse it", "🔄", "If you know the moles, find the mass: <b>mass (g) = moles × Mr</b>."],
    ["Example", "🧮", "3 moles of carbon dioxide (Mr 44) weigh 3 × 44 = 132 g."],
    ["Triangle", "🔺", "The three quantities link in a triangle: mass on top, moles and Mr below. Cover the one you want."]
  ], [], [
    () => { const f = pick(MOLEF.filter(x => x !== "SO2")), n = pick([1, 2, 3, 4, 5]); return num(`${ARTXT}<br>What is the mass in grams of <b>${n} mole${n > 1 ? "s" : ""}</b> of <b>${fmt(f)}</b>?`, n * mr(f),
      ["First find the Mr of the substance.", "Multiply the number of moles by the Mr.", "Example: 2 moles of O2 (Mr 32) weigh 2 × 32 = 64 g. Now do yours with your substance."], "⚖️"); }
  ]));

  b.push(les("Avogadro's number", [
    ["A huge number", "🌌", "One mole of any substance contains the same number of particles: <b>6.02 × 10<sup>23</sup></b>. It is called Avogadro's number."],
    ["Same number, different mass", "⚖️", "A mole of carbon atoms and a mole of copper atoms have the same number of atoms, but copper's mass is bigger."],
    ["Doubling", "✌️", "2 moles have twice as many particles as 1 mole, and half a mole has half as many."]
  ], ["Think about what a mole counts: particles, not mass.", "Each mole has the same fixed huge number of particles, no matter what the substance is.", "Example: one mole of iron atoms and one mole of tin atoms have equal numbers of atoms. Now try yours."], [
    ["How many particles are in one mole of any substance?", "6.02 × 10 to the power of 23", "6.02 × 10 to the power of 32", "Just 100"],
    ["Which has more atoms: 1 mole of carbon or 1 mole of copper?", "They have the same number", "Carbon", "Copper"],
    ["2 moles of water have how many times as many molecules as 1 mole?", "Twice as many", "The same number", "Half as many"],
    ["Which has the larger mass: 1 mole of helium atoms or 1 mole of neon atoms?", "Neon", "Helium", "They are the same"],
    ["A mole is a measure of...", "The amount of substance (a number of particles)", "Temperature", "Color"],
    ["Half a mole of atoms contains...", "Half of Avogadro's number of atoms", "One whole Avogadro's number", "Twice Avogadro's number"],
    ["Avogadro's number is written 6.02 × 10²³. This is...", "A very large number", "A very small number", "A temperature"],
    ["Why do chemists use moles?", "Atoms are too tiny to count one by one", "Moles are animals", "Atoms are huge"]
  ]));

  b.push(les("Empirical formulas", [
    ["Simplest ratio", "📐", "The <b>empirical formula</b> shows the simplest whole-number ratio of atoms. Glucose is C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>, but its empirical formula is CH<sub>2</sub>O."],
    ["Divide down", "➗", "Divide all the numbers in the formula by the biggest number that goes into all of them."],
    ["From moles", "🧪", "If 0.2 mol of an element A combines with 0.4 mol of B, the ratio is 1 : 2, so the formula is AB<sub>2</sub>."]
  ], ["Find the biggest number that divides exactly into every number in the formula.", "Divide each number by it. A 1 is not written.", "Example: C4H10 has numbers 4 and 10, both divisible by 2, so C2H5. Now try yours."], [
    ["What is the empirical formula of C2H6?", fmt("CH3"), fmt("C2H6"), fmt("C6H2")],
    ["What is the empirical formula of C6H12O6?", fmt("CH2O"), fmt("C6H12O6"), fmt("C2H4O3")],
    ["What is the empirical formula of H2O2?", "HO", fmt("H2O2"), fmt("H2O")],
    ["What is the empirical formula of C2H4?", fmt("CH2"), fmt("C2H4"), fmt("C4H2")],
    ["What is the empirical formula of N2O4?", fmt("NO2"), fmt("N2O4"), fmt("N2O2")],
    ["What is the empirical formula of C6H6?", "CH", fmt("C6H6"), fmt("C3H3")],
    ["0.1 mol of Mg combines with 0.1 mol of O. The empirical formula is...", "MgO", fmt("Mg2O"), fmt("MgO2")],
    ["0.1 mol of Mg combines with 0.2 mol of Cl. The empirical formula is...", fmt("MgCl2"), "MgCl", fmt("Mg2Cl")],
    ["The empirical formula shows...", "The simplest ratio of atoms", "The exact number of atoms in one molecule", "The mass of the molecule"]
  ]));

  const REAC = [
    ["2Mg + O<sub>2</sub> → 2MgO", "Mg", "MgO", 2, 2], ["N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>", "N<sub>2</sub>", "NH<sub>3</sub>", 1, 2], ["N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>", "H<sub>2</sub>", "NH<sub>3</sub>", 3, 2],
    ["CH<sub>4</sub> + 2O<sub>2</sub> → CO<sub>2</sub> + 2H<sub>2</sub>O", "CH<sub>4</sub>", "O<sub>2</sub>", 1, 2], ["CH<sub>4</sub> + 2O<sub>2</sub> → CO<sub>2</sub> + 2H<sub>2</sub>O", "CH<sub>4</sub>", "H<sub>2</sub>O", 1, 2],
    ["2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O", "O<sub>2</sub>", "H<sub>2</sub>O", 1, 2], ["2H<sub>2</sub>O<sub>2</sub> → 2H<sub>2</sub>O + O<sub>2</sub>", "H<sub>2</sub>O<sub>2</sub>", "O<sub>2</sub>", 2, 1],
    ["C<sub>3</sub>H<sub>8</sub> + 5O<sub>2</sub> → 3CO<sub>2</sub> + 4H<sub>2</sub>O", "C<sub>3</sub>H<sub>8</sub>", "CO<sub>2</sub>", 1, 3]
  ];
  b.push(les("Reacting moles", [
    ["The big numbers", "🔢", "The numbers in front of formulas in a balanced equation show the <b>ratio of moles</b>. In 2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O, 2 mol H<sub>2</sub> reacts with 1 mol O<sub>2</sub>."],
    ["Scale up", "📈", "Moles scale in the same ratio. 4 mol H<sub>2</sub> would need 2 mol O<sub>2</sub> and make 4 mol H<sub>2</sub>O."],
    ["The steps", "🪜", "Write the ratio, find the multiplier from the substance you know, then use it on the one you want."]
  ], [], [
    () => { const r = pick(REAC), k = pick([1, 2, 3, 4, 5]), given = r[3] * k; return num(`<span style="font-size:1.1em">${r[0]}</span><br>How many moles of <b>${r[2]}</b> are involved when <b>${given} mol</b> of <b>${r[1]}</b> react?`, r[4] * k,
      ["Compare the big numbers in front of your two substances.", "Work out how many times the equation is repeated, then multiply the other substance's big number by that.", "Example: in 2H2 + O2 → 2H2O, 6 mol of H2 repeats the equation 3 times, so O2 is 1 × 3 = 3 mol. Now do yours."], "🔢"); }
  ]));

  b.push(les("Percent yield", [
    ["Not everything works", "📉", "In real life you rarely get as much product as the equation predicts. The <b>theoretical yield</b> is the maximum; the <b>actual yield</b> is what you really get."],
    ["The formula", "🧮", "<b>Percent yield = actual yield ÷ theoretical yield × 100.</b> Example: 15 g actual out of 20 g theoretical is 75%."],
    ["Why less?", "💧", "Some product is lost when filtering or transferring, the reaction may be reversible, or side reactions happen."]
  ], ["Think about the most you could make and what you really got.", "Real reactions lose some product, so the real amount compares with the maximum.", "Example: if a recipe could make 10 cookies but you got 8, you got 80% of the possible amount. Now try yours."], [
    () => { let th, pc, act; do { th = pick([10, 20, 25, 40, 50, 80]); pc = pick([20, 25, 40, 50, 60, 75, 80]); act = th * pc / 100; } while (!Number.isInteger(act));
      const t = ri(0, 2); return t === 0 ? num(`A reaction should make <b>${th} g</b> of product (theoretical yield) but only <b>${act} g</b> is made. What is the percent yield?`, pc, ["Compare what you got with what you could have got.", "Divide the actual yield by the theoretical yield, then multiply by 100.", "Example: 9 g actual out of 12 g theoretical = 9 ÷ 12 × 100 = 75%. Now do yours."], "📉")
        : t === 1 ? num(`The theoretical yield is <b>${th} g</b> and the percent yield is <b>${pc}%</b>. How many grams were actually made?`, act, ["Percent yield tells you what fraction of the maximum you got.", "Turn the percentage into a fraction of 100, then take that fraction of the theoretical yield.", "Example: 10% of 50 g is 5 g. Now do yours."], "⚗️")
        : num(`You got <b>${act} g</b> of product, which is <b>${pc}%</b> of the theoretical yield. What was the theoretical yield in grams?`, th, ["The actual yield is a fraction of the theoretical yield.", "Divide the actual yield by the percentage, then multiply by 100.", "Example: 5 g is 10% of the maximum, so the maximum is 5 ÷ 10 × 100 = 50 g. Now do yours."], "🧪"); },
    ["Percent yield cannot normally be more than...", "100%", "10%", "50%"],
    ["Which is a reason for a low percent yield?", "Some product is lost when filtering", "The atoms got destroyed", "More atoms were made"],
    ["Theoretical yield is...", "The maximum amount of product possible", "The mass of reactants lost", "The mass of the catalyst"]
  ]));

  b.push(les("Gas volumes", [
    ["Molar volume", "🎈", "At room temperature and pressure, <b>1 mole of any gas takes up 24 dm³</b> (24 liters)."],
    ["Using it", "🧮", "<b>Volume (dm³) = moles × 24</b>. So 2 mol of any gas is 48 dm³, and 0.5 mol is 12 dm³."],
    ["Reverse", "🔄", "<b>Moles = volume ÷ 24.</b> 72 dm³ of gas is 72 ÷ 24 = 3 moles."]
  ], ["Think about the molar volume rule that every gas follows.", "At room temperature one mole of any gas takes the same space, whatever the gas.", "Example: 3 mol of any gas takes 3 times the space of 1 mol. Now try yours."], [
    () => { const n = pick([0.5, 1, 2, 3, 4, 5]); return num(`At room temperature, what is the volume in dm³ of <b>${n} mol</b> of any gas? (1 mol = 24 dm³)`, n * 24,
      ["One mole of any gas takes the same volume, so use the molar volume.", "Multiply the moles by 24.", "Example: 2 mol of gas is 2 × 24 = 48 dm³, so use that method. Now do yours with your number."], "🎈"); },
    () => { const n = pick([0.5, 1, 2, 3, 4, 5]); return num(`How many moles of gas are in <b>${n * 24} dm³</b> at room temperature? (1 mol = 24 dm³)`, n,
      ["Think about how many 24 dm³ blocks fit into your volume.", "Divide the volume by 24.", "Example: 72 dm³ ÷ 24 = 3 mol. Now do yours."], "🧮"); },
    ["How much space does 1 mole of any gas take at room temperature?", "24 dm³", "1 dm³", "100 dm³"],
    ["Do 1 mole of hydrogen and 1 mole of carbon dioxide take the same volume at the same conditions?", "Yes", "No, carbon dioxide is bigger", "No, hydrogen is bigger"],
    ["Which has the larger volume at room temperature?", "2 mol of any gas", "1 mol of any gas", "They are the same"]
  ]));

  b.push(les("Concentration in mol/dm³", [
    ["How strong?", "🥤", "The <b>concentration</b> of a solution can be given in <b>mol/dm³</b>: the moles of dissolved substance in every dm³ (liter) of solution."],
    ["The formula", "🧮", "<b>Concentration = moles ÷ volume (dm³)</b>. If 0.5 mol is dissolved in 2 dm³, the concentration is 0.25 mol/dm³."],
    ["Moles needed", "🔄", "Rearranged: moles = concentration × volume. Remember 1000 cm³ = 1 dm³."]
  ], ["Concentration is about how much is dissolved in each dm³.", "A dm³ is the same as a liter, and more dissolved moles in a dm³ means a stronger solution.", "Example: 1 dm³ is 1 liter, so 2 liters hold twice as much liquid. Now try yours."], [
    () => { const V = pick([0.25, 0.5, 1, 2]), c = pick([0.1, 0.2, 0.5, 1, 2]), n = r2(c * V); const t = ri(0, 2);
      return t === 0 ? num(`<b>${n} mol</b> of a substance is dissolved to make <b>${V} dm³</b> of solution. What is the concentration in mol/dm³?`, c, ["Concentration tells you how many moles are in each dm³.", "Divide the moles by the volume in dm³.", "Example: 3 mol in 2 dm³ is 3 ÷ 2 = 1.5 mol/dm³. Now do yours."], "🥤")
        : t === 1 ? num(`A solution has a concentration of <b>${c} mol/dm³</b>. How many moles are in <b>${V} dm³</b> of it?`, n, ["Concentration is moles per dm³. How many dm³ do you have?", "Multiply the concentration by the volume.", "Example: 2 mol/dm³ in 3 dm³ gives 6 mol. Now do yours."], "🧪")
        : num(`<b>${n} mol</b> of a substance is in a solution of concentration <b>${c} mol/dm³</b>. What is the volume in dm³?`, V, ["Each dm³ holds a certain number of moles. How many dm³ do you need?", "Divide the moles by the concentration.", "Example: 6 mol at 2 mol/dm³ needs 6 ÷ 2 = 3 dm³. Now do yours."], "🫗"); },
    ["1000 cm³ equals...", "1 dm³", "10 dm³", "0.1 dm³"],
    ["A 2 mol/dm³ solution is...", "More concentrated than a 1 mol/dm³ solution", "More dilute than a 1 mol/dm³ solution", "The same as water"]
  ]));

  b.push(les("pH and hydrogen ions", [
    ["More H⁺ is more acidic", "🍋", "Acids make <b>hydrogen ions (H<sup>+</sup>)</b> in water. The more H<sup>+</sup>, the lower the pH. Alkalis make hydroxide ions (OH<sup>-</sup>)."],
    ["Powers of ten", "🔟", "Each pH step changes the H<sup>+</sup> concentration by <b>10 times</b>. pH 3 has 10 times more H<sup>+</sup> than pH 4."],
    ["Bigger gaps", "📏", "Two steps = 10 × 10 = 100 times. Three steps = 1000 times."]
  ], ["Think about what a low pH and a high pH tell you about hydrogen ions.", "Acids have a low pH and many H⁺ ions; alkalis have a high pH and many OH⁻ ions.", "Example: pH 1 is a strong acid and pH 13 is a strong alkali. Now try yours."], [
    () => { const lo = ri(1, 5), d = ri(1, 3); return num(`How many times more hydrogen ions does a solution at <b>pH ${lo}</b> have than one at <b>pH ${lo + d}</b>?`, Math.pow(10, d),
      ["Count how many pH steps apart they are. Lower pH has more H+.", "Each step is a factor of 10, so multiply 10 by itself once for each step.", "Example: 2 steps apart is 10 × 10 = 100, and 1 step is just 10. Now do yours."], "🍋"); },
    ["Which ion makes a solution acidic?", "H⁺", "OH⁻", "Cl⁻"],
    ["Which ion makes a solution alkaline?", "OH⁻", "H⁺", "Na⁺"],
    ["Which has more hydrogen ions?", "pH 2", "pH 5", "pH 9"],
    ["A pH of 7 means the solution is...", "Neutral", "Strongly acidic", "Strongly alkaline"],
    ["Adding an alkali to an acid makes the pH...", "Go up", "Go down", "Stay at 0"],
    ["Lemon juice has a pH around 2. Compared with water (pH 7) it is...", "Much more acidic", "Slightly alkaline", "The same"]
  ]));

  b.push(les("Titration", [
    ["Measuring neutralization", "🧪", "A <b>titration</b> finds the exact amount of acid that neutralizes an alkali. A <b>pipette</b> measures a set volume of alkali; a <b>burette</b> adds acid drop by drop."],
    ["The end-point", "🎯", "An <b>indicator</b> changes color when the solution becomes neutral. This is the <b>end-point</b>. Read the burette to find the volume used."],
    ["Calculating", "🧮", "For acid and alkali that react 1 : 1, the moles are equal at the end-point: <b>c × V (acid) = c × V (alkali)</b>."]
  ], ["Think about the job of each piece of equipment in a titration.", "A titration needs a precise measure of one liquid, a careful addition of the other, and a signal that tells you when to stop.", "Example: a pipette measures one exact volume of liquid into the flask. Now try yours."], [
    () => { let v1, c1, c2, v2; do { v1 = pick([20, 25, 50]); c1 = pick([0.1, 0.2, 0.5]); c2 = pick([0.1, 0.2, 0.25, 0.5]); v2 = r2(c1 * v1 / c2); } while (!Number.isInteger(v2) || v2 === v1);
      return num(`<b>${v1} cm³</b> of sodium hydroxide of concentration <b>${c1} mol/dm³</b> is neutralized by hydrochloric acid of concentration <b>${c2} mol/dm³</b>. They react 1 : 1. What volume of acid in cm³ is needed?`, v2,
        ["At the end-point, moles of acid equal moles of alkali. Which concentration times volume do you already know?", "Find the alkali's c × V, then divide by the acid's concentration.", "Example: 10 cm³ at 0.2 mol/dm³ gives 2, and acid of 0.1 mol/dm³ needs 2 ÷ 0.1 = 20 cm³. Now do yours."], "🧪"); },
    ["Which piece of equipment adds acid drop by drop?", "Burette", "Beaker", "Thermometer"],
    ["Which piece of equipment measures an exact volume of alkali?", "Pipette", "Burette stand", "Bunsen burner"],
    ["The end-point is when...", "The indicator changes color", "The flask is full", "The acid runs out of the burette"],
    ["Why is the acid added drop by drop near the end?", "So you do not go past the end-point", "To waste time", "To make bubbles"],
    ["Titrations are repeated to get...", "Reliable, concordant results", "Different answers each time", "More waste"],
    ["Why is an indicator used?", "To show when neutralization is complete", "To make the acid stronger", "To heat the mixture"]
  ]));

  b.push(les("Shapes of molecules", [
    ["Pairs repel", "🧲", "Electron pairs around an atom push away from each other. This sets the <b>shape</b> of the molecule."],
    ["Four shapes", "📐", "<b>CO<sub>2</sub></b> is linear (straight). <b>H<sub>2</sub>O</b> is bent. <b>NH<sub>3</sub></b> is pyramid-shaped. <b>CH<sub>4</sub></b> is tetrahedral (a pyramid with a triangle base, 4 sides)."],
    ["Why it matters", "💧", "Water's bent shape makes it <b>polar</b> (slightly charged ends), which is why it dissolves so many things."]
  ], ["Think about how many atoms are bonded to the central atom and whether there are lone pairs.", "Two atoms with no lone pair on the center is straight. Lone pairs bend or squash the shape.", "Example: hydrogen sulfide H2S is bent, like water. Now try yours."], [
    ["What is the shape of a carbon dioxide molecule?", "Linear (straight)", "Bent", "Tetrahedral"],
    ["What is the shape of a water molecule?", "Bent", "Linear (straight)", "Tetrahedral"],
    ["What is the shape of a methane molecule?", "Tetrahedral", "Linear (straight)", "Bent"],
    ["What is the shape of an ammonia molecule?", "Pyramid", "Linear (straight)", "Flat triangle"],
    ["Which molecule is tetrahedral?", fmt("CH4"), fmt("CO2"), fmt("H2O")],
    ["Which molecule is straight (linear)?", fmt("CO2"), fmt("H2O"), fmt("NH3")],
    ["Why do electron pairs spread out?", "They repel each other", "They attract each other", "They are neutral"],
    ["Water is polar because...", "Its bent shape gives slightly charged ends", "It is a metal", "It is a noble gas"],
    ["In methane, how many hydrogens are attached to the carbon?", "4", "2", "3"]
  ]));

  b.push(les("Forces between molecules", [
    ["Two kinds of bonds", "🔗", "Inside a molecule, atoms are held by strong <b>covalent bonds</b>. Between molecules there are weak <b>intermolecular forces</b>."],
    ["Melting and boiling", "🌡️", "When a simple molecular substance melts or boils, only the weak forces between molecules are broken, not the covalent bonds. So the melting and boiling points are low."],
    ["Bigger molecules", "📏", "Larger molecules have stronger forces between them, so higher boiling points. Water has extra strong forces called <b>hydrogen bonds</b>."]
  ], ["Which bonds break when a simple molecular substance boils: the ones inside molecules or between them?", "Weak forces between molecules break easily, so boiling points are low. Bigger molecules have stronger forces.", "Example: when ice melts, the forces between water molecules weaken; the H-O bonds stay. Now try yours."], [
    ["When a simple molecular substance boils, what breaks?", "The weak forces between molecules", "The covalent bonds inside molecules", "The nuclei"],
    ["Why do simple molecular substances have low boiling points?", "Forces between molecules are weak", "Covalent bonds are weak", "They are metals"],
    ["Which is stronger?", "A covalent bond inside a molecule", "The force between two molecules", "They are exactly equal"],
    ["Which has the higher boiling point?", "A large molecule", "A small molecule of the same type", "They always match"],
    ["Methane (small) boils at a lower temperature than octane (large) because...", "Forces between its molecules are weaker", "It has more atoms", "Its bonds are stronger"],
    ["Water has an unusually high boiling point for its size because of...", "Hydrogen bonds", "Metallic bonds", "Ionic bonds"],
    ["When water boils, which bonds stay unbroken?", "The covalent bonds in each molecule", "The forces between molecules", "No bonds stay"],
    ["Simple molecular substances do not conduct electricity because...", "They have no free charged particles", "They are too hot", "They are metals"]
  ]));

  b.push(les("Metallic bonding", [
    ["A sea of electrons", "🌊", "In a metal, the atoms lose their outer electrons. These electrons are <b>delocalized</b>: free to move around a lattice of positive ions."],
    ["The bond", "🧲", "The strong attraction between the positive ions and the sea of electrons is <b>metallic bonding</b>. It makes metals strong with high melting points."],
    ["Properties", "🔌", "Free electrons carry charge, so metals <b>conduct electricity</b> and heat. Layers of ions can slide, so metals are <b>malleable</b>."]
  ], ["Think about the free electrons and the layers of positive ions.", "Moving electrons carry electricity and heat; layers sliding makes metals bend rather than shatter.", "Example: the free electrons are what carry electricity through a copper wire. Now try yours."], [
    ["What is found in the sea around metal ions?", "Delocalized electrons", "Protons", "Neutrons"],
    ["Why do metals conduct electricity?", "Their electrons are free to move", "They have no atoms", "They contain water"],
    ["Why can metals be bent and hammered?", "Layers of ions can slide over each other", "They are made of gases", "The electrons are heavy"],
    ["Metallic bonding is the attraction between...", "Positive ions and delocalized electrons", "Two non-metal atoms sharing electrons", "Two noble gases"],
    ["Why do most metals have high melting points?", "Metallic bonds are strong", "Metals have no bonds", "The electrons are cold"],
    ["The ions in a metal are...", "Positive", "Negative", "Neutral"],
    ["Metals are good conductors of heat because...", "Free electrons carry the energy", "They have air spaces", "They are always cold"],
    ["Which is NOT a property caused by metallic bonding?", "Dissolving easily in water", "Conducting electricity", "Malleability"]
  ]));

  b.push(les("Redox and electrons", [
    ["OIL RIG", "🔋", "<b>O</b>xidation <b>I</b>s <b>L</b>oss of electrons. <b>R</b>eduction <b>I</b>s <b>G</b>ain of electrons."],
    ["Half-equations", "✏️", "Mg → Mg<sup>2+</sup> + 2e<sup>-</sup> is oxidation (electrons lost). Cl<sub>2</sub> + 2e<sup>-</sup> → 2Cl<sup>-</sup> is reduction (electrons gained)."],
    ["Oxygen view", "🔥", "Gaining oxygen is oxidation and losing oxygen is reduction. The two always happen together in a <b>redox</b> reaction."]
  ], ["Remember OIL RIG: is the electron on the left or right of the arrow?", "Electrons on the right means they were lost (oxidation). Electrons on the left means gained (reduction).", "Example: Zn → Zn2+ + 2e- shows electrons lost, so zinc is oxidized. Now try yours."], [
    ["Oxidation means...", "Losing electrons", "Gaining electrons", "Gaining protons"],
    ["Reduction means...", "Gaining electrons", "Losing electrons", "Losing neutrons"],
    ["Na → Na⁺ + e⁻ is...", "Oxidation", "Reduction", "Neutralization"],
    ["Cl₂ + 2e⁻ → 2Cl⁻ is...", "Reduction", "Oxidation", "Evaporation"],
    ["Mg → Mg²⁺ + 2e⁻ shows magnesium being...", "Oxidized", "Reduced", "Frozen"],
    ["Cu²⁺ + 2e⁻ → Cu shows copper ions being...", "Reduced", "Oxidized", "Dissolved"],
    ["In a redox reaction, if one substance is oxidized then another is...", "Reduced", "Oxidized too", "Removed"],
    ["Gaining oxygen is...", "Oxidation", "Reduction", "Distillation"],
    ["Losing oxygen is...", "Reduction", "Oxidation", "Filtration"]
  ]));

  b.push(les("Halogen displacement", [
    ["Group 17", "🟢", "The <b>halogens</b> (fluorine, chlorine, bromine, iodine) are very reactive non-metals. They get <b>less reactive</b> going down the group."],
    ["Displacing", "🔁", "A more reactive halogen pushes out a less reactive one from its salt. Chlorine + potassium bromide gives potassium chloride + bromine."],
    ["Colors", "🎨", "Chlorine water is pale green, bromine water is orange and iodine is brown. A color change shows a displacement."]
  ], ["More reactive halogens are higher up Group 17. Which one is higher?", "A halogen can displace only a halogen below it in the group.", "Example: fluorine can displace chlorine from sodium chloride, since it is above chlorine. Now try yours."], [
    ["Chlorine is added to potassium bromide solution. What happens?", "Bromine is displaced", "Nothing happens", "Chlorine disappears and nothing forms"],
    ["Chlorine is added to potassium iodide solution. What happens?", "Iodine is displaced", "Nothing happens", "Hydrogen forms"],
    ["Iodine is added to sodium chloride solution. What happens?", "Nothing, iodine is less reactive", "Chlorine is displaced", "It explodes"],
    ["Bromine is added to potassium iodide solution. What happens?", "Iodine is displaced", "Nothing happens", "Chlorine forms"],
    ["Which halogen is most reactive?", "Fluorine", "Iodine", "Bromine"],
    ["Which halogen is least reactive of these?", "Iodine", "Chlorine", "Fluorine"],
    ["Going down Group 17, reactivity...", "Decreases", "Increases", "Stays the same"],
    ["Bromine water is what color?", "Orange", "Pale green", "Clear"],
    ["A more reactive halogen will displace...", "A less reactive halogen from its salt", "A more reactive halogen", "A noble gas"]
  ]));

  b.push(les("Ion tests", [
    ["Flame tests", "🔥", "Put a compound in a flame: lithium gives <b>crimson</b>, sodium <b>yellow</b>, potassium <b>lilac</b>, calcium <b>orange-red</b>, copper <b>blue-green</b>."],
    ["Metal hydroxides", "🧪", "Add sodium hydroxide solution: copper(II) gives a <b>blue</b> solid, iron(II) a <b>green</b> solid, and iron(III) a <b>brown</b> solid."],
    ["Negative ions", "⚪", "Chloride ions: add silver nitrate for a <b>white</b> precipitate. Sulfate ions: add barium chloride for a <b>white</b> precipitate."]
  ], ["Match the colour or result with the ion.", "Flame colors identify metal ions; colored solids with sodium hydroxide identify transition metals.", "Example: a green solid with sodium hydroxide points to iron(II). Now try yours."], [
    ["A flame test gives a yellow flame. The metal ion is...", "Sodium", "Potassium", "Lithium"],
    ["A flame test gives a lilac flame. The metal ion is...", "Potassium", "Sodium", "Calcium"],
    ["A flame test gives a crimson flame. The metal ion is...", "Lithium", "Copper", "Calcium"],
    ["A flame test gives a blue-green flame. The metal ion is...", "Copper", "Sodium", "Lithium"],
    ["Sodium hydroxide gives a blue solid. The ion is...", "Copper(II)", "Iron(II)", "Iron(III)"],
    ["Sodium hydroxide gives a green solid. The ion is...", "Iron(II)", "Copper(II)", "Iron(III)"],
    ["Sodium hydroxide gives a brown solid. The ion is...", "Iron(III)", "Iron(II)", "Copper(II)"],
    ["Which test is for chloride ions?", "Silver nitrate gives a white precipitate", "Limewater turns cloudy", "A lit splint pops"],
    ["Barium chloride gives a white precipitate. The ion is...", "Sulfate", "Chloride", "Carbonate"]
  ]));

  b.push(
    mix("Mixed practice", at(b, [0, 1, 2, 4, 6, 8, 11, 13, 15])),
    mix("Level 11 Challenge", at(b, [3, 5, 7, 9, 10, 12, 14, 16, 17]))
  );

  // ================= LEVEL 12 =================
  const c = [];

  c.push(les("Average atomic mass", [
    ["Mixed isotopes", "⚛️", "Most elements are a mixture of <b>isotopes</b> with different mass numbers. The relative atomic mass (Ar) is the <b>weighted average</b>."],
    ["Weighting", "🧮", "Multiply each mass by its percentage, add, then divide by 100. Example: 50% of mass 10 and 50% of mass 12: (10 × 50 + 12 × 50) ÷ 100 = 11."],
    ["Check", "✅", "The answer lies between the two masses, closer to the more common isotope."]
  ], ["Think about how isotopes and the average relate.", "The average is pulled toward the more common isotope; isotopes differ in neutrons, not protons.", "Example: if 99% of atoms are one type, the average is almost that mass. Now try yours."], [
    () => { const s = pick([[35, 37, "chlorine"], [63, 65, "copper"], [10, 11, "boron"], [24, 26, "magnesium"]]), p = pick([25, 50, 75, 80, 20]);
      return num(`In a sample of ${s[2]}, <b>${p}%</b> of the atoms have mass number <b>${s[0]}</b> and <b>${100 - p}%</b> have mass number <b>${s[1]}</b>. What is the average relative atomic mass?`, r2((s[0] * p + s[1] * (100 - p)) / 100),
        ["The average is weighted: the more common isotope counts more.", "Multiply each mass number by its percentage, add the results, then divide by 100.", "Example: 60% of mass 20 and 40% of mass 22 gives (20 × 60 + 22 × 40) ÷ 100 = 20.8. Now do yours."], "⚛️"); },
    ["If an element has 90% of one isotope, its average mass is closest to...", "The mass of that common isotope", "The mass of the rare isotope", "Zero"],
    ["Isotopes of an element have the same number of...", "Protons", "Neutrons", "Mass"],
    ["Relative atomic mass is a...", "Weighted average", "Whole number always", "Count of electrons"]
  ]));

  c.push(les("Periodic trends", [
    ["Down a group", "⬇️", "Going down a group, atoms have more shells, so the <b>atomic radius gets bigger</b>. Group 1 metals get <b>more reactive</b>; halogens get <b>less reactive</b>."],
    ["Across a period", "➡️", "Going across a period (left to right), protons increase and pull the electrons in, so atoms get <b>smaller</b>. Metals change to non-metals."],
    ["Why?", "🧲", "Outer electrons far from the nucleus are held loosely, so they are lost more easily. That makes Group 1 reactivity rise down the group."]
  ], ["Think about whether you are going down a group or across a period.", "Down a group: more shells. Across a period: more protons pulling in the electrons.", "Example: from lithium to potassium there are more shells, so potassium is bigger than lithium. Now try yours."], [
    ["Going down a group, atoms get...", "Bigger", "Smaller", "Lighter in number of protons"],
    ["Going across a period from left to right, atoms get...", "Smaller", "Bigger", "More shells"],
    ["Which is more reactive?", "Potassium", "Lithium", "They are equal"],
    ["Which halogen is more reactive?", "Chlorine", "Bromine", "Iodine"],
    ["Why does a Group 1 metal get more reactive down the group?", "The outer electron is further from the nucleus and easier to lose", "The nucleus gets smaller", "It gets more protons than electrons"],
    ["Why does the radius increase down a group?", "There are more electron shells", "There are fewer electrons", "There are fewer protons"],
    ["Which atom is the smallest in Period 3?", "Chlorine (right side)", "Sodium (left side)", "They are equal"],
    ["Elements in the same group have similar properties because they have the same number of...", "Outer electrons", "Neutrons", "Isotopes"],
    ["Across Period 3, elements change from...", "Metals to non-metals", "Non-metals to metals", "Liquids to solids"]
  ]));

  c.push(les("Ionization energy", [
    ["Pulling an electron off", "🪢", "<b>Ionization energy</b> is the energy needed to remove one electron from an atom (in the gas state)."],
    ["Down a group", "⬇️", "It <b>decreases</b> down a group: outer electrons are further from the nucleus and shielded by inner shells, so they are easier to remove."],
    ["Across a period", "➡️", "It <b>increases</b> across a period: more protons pull the outer electrons more strongly. Noble gases have the highest values."]
  ], ["Think about how strongly the nucleus holds the outer electron.", "Closer to the nucleus and more protons means a stronger hold and a higher ionization energy.", "Example: argon holds its outer electrons very tightly, so it needs lots of energy to remove one. Now try yours."], [
    ["Ionization energy is the energy needed to...", "Remove an electron from an atom", "Add a proton to an atom", "Melt a solid"],
    ["Going down Group 1, ionization energy...", "Decreases", "Increases", "Stays the same"],
    ["Going across a period, ionization energy generally...", "Increases", "Decreases", "Stays the same"],
    ["Which needs more energy to remove an electron?", "Helium", "Lithium", "Sodium"],
    ["Which needs less energy to remove an electron?", "Potassium", "Sodium", "Lithium"],
    ["Why is it easier to remove an outer electron from sodium than from lithium?", "It is further from the nucleus", "Sodium has fewer shells", "Sodium has no protons"],
    ["Which group has the highest ionization energies in each period?", "Noble gases", "Alkali metals", "Transition metals"],
    ["Which group has the lowest ionization energies in each period?", "Alkali metals", "Noble gases", "Halogens"]
  ]));

  const OXN = [["SO₂", "S", 4], ["SO₃", "S", 6], ["CO₂", "C", 4], ["CO", "C", 2], ["NO₂", "N", 4], ["Fe₂O₃", "Fe", 3], ["FeO", "Fe", 2], ["H₂SO₄", "S", 6], ["MgO", "Mg", 2], ["NaCl", "Na", 1], ["Al₂O₃", "Al", 3], ["CuO", "Cu", 2], ["N₂O", "N", 1], ["H₂S", "S", -2]];
  const sgn = n => n > 0 ? "plus " + n : n < 0 ? "minus " + Math.abs(n) : "zero";
  c.push(les("Oxidation numbers", [
    ["Counting charge", "🔢", "An <b>oxidation number</b> shows the charge an atom has, or seems to have, in a compound. Pure elements are 0. Oxygen is usually −2 and hydrogen is usually +1."],
    ["They add up", "➕", "The oxidation numbers in a compound add to zero. In CO<sub>2</sub>: O is −2 each, giving −4, so carbon must be +4."],
    ["Ions", "⚡", "In a simple ion, the oxidation number is its charge: Na<sup>+</sup> is +1, Cl<sup>-</sup> is −1."]
  ], ["Start with the atoms you know: oxygen is −2 and hydrogen is +1. Everything must add to zero.", "Total up the known charges, then find the number that cancels them.", "Example: in NO the oxygen is −2, so nitrogen has the opposite value. Now try yours."], [
    () => { const o = pick(OXN.filter(x => x[2] > 0 || x[0] === "H₂S")), right = sgn(o[2]), pool = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter(x => x !== o[2]).map(sgn), wr = shuf(pool).slice(0, 3);
      const near = [sgn(o[2] + 1), sgn(o[2] - 1)].filter(x => x !== right); const w = [...new Set([...near, ...wr])].slice(0, 3);
      return { text: `What is the oxidation number of <b>${o[1]}</b> in <b>${o[0]}</b>?`, visual: "🔢", choices: shuf([right, ...w]), answer: right,
        hints: ["Add up the charges of the atoms you know. The total of the whole formula is zero.", "Oxygen is −2 (times how many oxygens there are) and hydrogen is +1. The element you want must cancel the rest.", "Example: in NO2 the two oxygens give −4, so nitrogen is +4. Now do yours."] }; },
    ["What is the oxidation number of an element on its own, such as O₂?", "zero", "minus 2", "plus 1"],
    ["What is the oxidation number of sodium in Na⁺?", "plus 1", "zero", "minus 1"],
    ["What is the oxidation number of oxygen in most compounds?", "minus 2", "plus 2", "zero"],
    ["The oxidation numbers in a neutral compound add up to...", "Zero", "One", "Ten"],
    ["What is the oxidation number of Cl in Cl⁻?", "minus 1", "plus 1", "zero"],
    ["What is the oxidation number of Mg in Mg²⁺?", "plus 2", "minus 2", "zero"],
    ["What is the oxidation number of hydrogen in most compounds?", "plus 1", "minus 1", "zero"]
  ]));

  c.push(les("Electrolysis products", [
    ["The electrodes", "🔋", "The <b>cathode</b> is negative and attracts positive ions. The <b>anode</b> is positive and attracts negative ions. Positive ions gain electrons at the cathode (reduction); negative ions lose electrons at the anode (oxidation)."],
    ["Molten and solution", "🧂", "Molten sodium chloride gives sodium at the cathode and chlorine at the anode. In sodium chloride <i>solution</i>, hydrogen forms at the cathode and chlorine at the anode, leaving sodium hydroxide."],
    ["Copper sulfate", "🔷", "In copper sulfate solution (inert electrodes), copper forms at the cathode and oxygen at the anode."]
  ], ["Positive ions go to the negative electrode and negative ions to the positive electrode.", "Cathode makes the metal (or hydrogen); anode makes a non-metal gas such as chlorine or oxygen.", "Example: molten lead bromide gives lead at the cathode and bromine at the anode. Now try yours."], [
    ["Which electrode attracts positive ions?", "Cathode", "Anode", "Both"],
    ["Molten sodium chloride is electrolyzed. What forms at the cathode?", "Sodium", "Chlorine", "Hydrogen"],
    ["Molten sodium chloride is electrolyzed. What forms at the anode?", "Chlorine", "Sodium", "Hydrogen"],
    ["Sodium chloride SOLUTION is electrolyzed. What forms at the cathode?", "Hydrogen", "Sodium", "Oxygen"],
    ["Copper sulfate solution is electrolyzed with inert electrodes. What forms at the cathode?", "Copper", "Oxygen", "Hydrogen"],
    ["Copper sulfate solution is electrolyzed with inert electrodes. What forms at the anode?", "Oxygen", "Copper", "Sulfur"],
    ["Oxidation happens at the...", "Anode", "Cathode", "Battery"],
    ["Reduction happens at the...", "Cathode", "Anode", "Wire"],
    ["Na⁺ + e⁻ → Na happens at the...", "Cathode", "Anode", "Salt bridge"],
    ["2Cl⁻ → Cl₂ + 2e⁻ happens at the...", "Anode", "Cathode", "Battery"]
  ]));

  c.push(les("Bond energies", [
    ["Breaking and making", "🔨", "Breaking bonds <b>takes in</b> energy. Making bonds <b>gives out</b> energy."],
    ["Overall change", "⚖️", "If more energy is given out making bonds than taken in breaking them, the reaction is <b>exothermic</b> (ΔH is negative). If less, it is <b>endothermic</b> (ΔH is positive)."],
    ["The sum", "🧮", "ΔH = energy in (bonds broken) − energy out (bonds made). Example: 900 in and 1100 out: 900 − 1100 = −200 kJ, so 200 kJ is released."]
  ], ["Think about whether energy goes into the bonds or comes out of them.", "Energy in versus energy out: whichever side is bigger decides whether the reaction heats up or cools down.", "Example: if a reaction takes in 500 kJ and gives out 700 kJ, it ends up releasing energy to its surroundings. Now try yours."], [
    () => { const ein = ri(4, 14) * 100, out = ein + ri(1, 6) * 100; return num(`Breaking bonds takes in <b>${ein} kJ</b>. Making new bonds gives out <b>${out} kJ</b>. How many kJ are released overall?`, out - ein,
      ["Compare the energy in with the energy out.", "Subtract the smaller number from the larger one.", "Example: 800 kJ in and 1000 kJ out releases 1000 - 800 = 200 kJ. Now do yours."], "🔨"); },
    () => { const out = ri(4, 14) * 100, ein = out + ri(1, 6) * 100; return num(`Breaking bonds takes in <b>${ein} kJ</b>. Making new bonds gives out <b>${out} kJ</b>. How many kJ are taken in overall?`, ein - out,
      ["Compare the energy in with the energy out. Which is bigger?", "Subtract the smaller number from the larger one.", "Example: 1000 kJ in and 800 kJ out takes in 1000 - 800 = 200 kJ overall. Now do yours."], "🔥"); },
    ["Breaking a bond...", "Takes in energy", "Gives out energy", "Makes a new element"],
    ["Making a bond...", "Gives out energy", "Takes in energy", "Needs no energy"],
    ["More energy out than in means the reaction is...", "Exothermic", "Endothermic", "Neutral"],
    ["A negative ΔH means the reaction is...", "Exothermic", "Endothermic", "Slow"],
    ["A positive ΔH means the reaction is...", "Endothermic", "Exothermic", "Reversible"]
  ]));

  c.push(les("Heat energy and calorimetry", [
    ["Measuring heat", "🌡️", "A <b>calorimeter</b> measures energy changes. Heat gained by water is <b>q = m × c × ΔT</b>."],
    ["The pieces", "🧮", "m = mass of water in g, c = 4.2 J/g°C (the heat needed to warm 1 g by 1 °C), ΔT = temperature change. 50 g warmed by 10 °C: 50 × 4.2 × 10 = 2100 J."],
    ["Units", "🔁", "1000 J = 1 kJ, so 2100 J is 2.1 kJ."]
  ], ["Think about what the letters in q = m × c × ΔT stand for.", "More mass or a bigger temperature change means more heat is involved.", "Example: warming 100 g of water needs more energy than warming 10 g by the same amount. Now try yours."], [
    () => { const m = pick([10, 20, 25, 50, 100]), dT = pick([2, 5, 10, 15, 20]); return num(`<b>${m} g</b> of water is warmed by <b>${dT} °C</b>. How much heat in joules does it gain? (c = 4.2 J/g°C)`, r2(m * 4.2 * dT),
      ["Heat depends on the mass, the temperature rise and the specific heat.", "Multiply the mass by 4.2 and then by the temperature change.", "Example: 10 g warmed by 3 °C gains 10 × 4.2 × 3 = 126 J. Now do yours."], "🌡️"); },
    () => { const k = ri(1, 9); return num(`A reaction releases <b>${k * 1000} J</b>. How many kJ is that?`, k, ["The prefix kilo means 1000.", "Divide the joules by 1000.", "Example: 5000 J is 5 kJ. Now do yours."], "🔁"); },
    ["In q = m × c × ΔT, what does ΔT stand for?", "Temperature change", "Time taken", "Total mass"],
    ["Which has the bigger ΔT: water that goes from 20 °C to 30 °C, or from 20 °C to 25 °C?", "20 °C to 30 °C", "20 °C to 25 °C", "They are equal"],
    ["A calorimeter is used to...", "Measure energy changes", "Measure mass", "Separate mixtures"],
    ["More water heated by the same amount needs...", "More energy", "Less energy", "No energy"]
  ]));

  c.push(les("Collision theory", [
    ["Particles must collide", "💥", "A reaction happens when particles <b>collide</b> with enough energy. This minimum energy is the <b>activation energy</b>."],
    ["Speeding up", "🚀", "More <b>concentration</b>, more <b>surface area</b> or more <b>pressure</b> gives more collisions each second. Higher <b>temperature</b> makes particles faster, so more collisions have enough energy."],
    ["Catalysts", "🔑", "A <b>catalyst</b> gives the reaction an easier route with a <b>lower activation energy</b>, so more collisions succeed. The catalyst is not used up."]
  ], ["Think about how often particles collide and how much energy they have.", "More collisions per second and more energy per collision both speed up a reaction.", "Example: crushing a solid into powder exposes more surface, so more collisions happen. Now try yours."], [
    ["Activation energy is...", "The minimum energy needed for a reaction", "The energy released", "The mass of a catalyst"],
    ["Why does a higher concentration speed up a reaction?", "More collisions each second", "Particles get smaller", "Particles stop moving"],
    ["Why does a powder react faster than a lump?", "More surface area is exposed to collisions", "Powder is hotter", "Lumps are lighter"],
    ["Why does raising the temperature speed up a reaction?", "Particles move faster and collide harder", "Particles stick together", "Atoms get smaller"],
    ["A catalyst works by...", "Lowering the activation energy", "Raising the temperature", "Being used up"],
    ["Which change would NOT speed up a reaction?", "Making the solution more dilute", "Heating it", "Using a powder"],
    ["Is a catalyst used up in the reaction?", "No", "Yes, completely", "Yes, half of it"],
    ["Collisions that lead to a reaction need...", "Enough energy and the right orientation", "Only a loud noise", "A cold flask"],
    ["Increasing pressure for gases speeds up the reaction because...", "The particles are squashed closer together", "The particles slow down", "The gas disappears"]
  ]));

  c.push(les("Equilibrium", [
    ["A balance", "⚖️", "In a reversible reaction in a closed container, the forward and backward reactions eventually go at the <b>same rate</b>. This is <b>dynamic equilibrium</b>: the amounts stay steady but the reactions keep going."],
    ["Le Chatelier", "🔧", "If you change the conditions, the equilibrium shifts to <b>oppose the change</b>."],
    ["Examples", "🧪", "More pressure favors the side with fewer gas molecules. Higher temperature favors the endothermic direction. Adding more reactant makes more product."]
  ], ["Which side opposes the change you made?", "Pressure: fewer gas molecules. Temperature: the direction that takes in heat if heating. Add reactant: more product.", "Example: raising temperature on an exothermic forward reaction favors the reverse direction. Now try yours."], [
    ["At dynamic equilibrium, the forward and backward reactions...", "Go at the same rate", "Stop completely", "Only the forward one runs"],
    ["Equilibrium needs a system that is...", "Closed", "Open", "Frozen"],
    ["N₂ + 3H₂ ⇌ 2NH₃: increasing the pressure shifts the equilibrium to...", "The right (fewer gas molecules)", "The left (more gas molecules)", "Neither"],
    ["For a reversible reaction, adding more reactant shifts the equilibrium towards...", "The products", "The reactants", "A catalyst"],
    ["If the forward reaction is exothermic, raising the temperature favors...", "The backward reaction", "The forward reaction", "Neither"],
    ["If the forward reaction is exothermic, lowering the temperature gives...", "More product", "Less product", "No change"],
    ["A catalyst changes the position of equilibrium by...", "Nothing, it only speeds up reaching it", "Moving it to the products", "Moving it to the reactants"],
    ["Le Chatelier's principle says that the system...", "Shifts to oppose the change", "Ignores the change", "Doubles the change"]
  ]));

  c.push(les("The Haber process", [
    ["Making ammonia", "🏭", "The <b>Haber process</b> makes ammonia: N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub>. Nitrogen comes from the air and hydrogen from natural gas."],
    ["Conditions", "🌡️", "About <b>450 °C</b>, 200 atmospheres pressure and an <b>iron catalyst</b>. The reaction is reversible and exothermic, so it is a compromise between yield and speed."],
    ["Recycling", "♻️", "Ammonia is cooled to a liquid and removed. Unreacted nitrogen and hydrogen are <b>recycled</b>. Most ammonia is used to make fertilizers."]
  ], ["Think about the raw materials, the catalyst, and what happens to the unreacted gases.", "High pressure favors the product; a moderate temperature balances speed and yield; unused gases are sent round again.", "Example: the catalyst helps the reaction reach equilibrium faster but does not change the yield. Now try yours."], [
    ["The Haber process makes...", "Ammonia", "Iron", "Salt"],
    ["The nitrogen for the Haber process comes from...", "The air", "Natural gas", "Seawater"],
    ["The hydrogen for the Haber process comes from...", "Natural gas", "The air", "Salt"],
    ["The catalyst used is...", "Iron", "Gold", "Copper"],
    ["What happens to unreacted nitrogen and hydrogen?", "They are recycled", "They are thrown away", "They are sold as ammonia"],
    ["Why is a moderate temperature used?", "A compromise between rate and yield", "To make the catalyst melt", "To cool the iron"],
    ["Most ammonia made is used for...", "Fertilizers", "Jewelry", "Fuel for planes"],
    ["How is ammonia separated from the unreacted gases?", "It is cooled until it becomes a liquid", "It is filtered", "It is burned"],
    ["The high pressure helps because the product side has...", "Fewer gas molecules", "More gas molecules", "No gas"]
  ]));

  c.push(les("Fertilizers", [
    ["What plants need", "🌱", "Plants need <b>nitrogen (N)</b> for leaves, <b>phosphorus (P)</b> for roots and <b>potassium (K)</b> for flowers and fruit. Fertilizers called <b>NPK</b> supply all three."],
    ["Common fertilizers", "🧂", "Ammonium nitrate, ammonium sulfate and urea add nitrogen. NPK 20-10-10 means 20% nitrogen, 10% phosphorus and 10% potassium."],
    ["Using them wisely", "💧", "Too much can wash into rivers and cause algae to grow too fast, which uses up oxygen. Farmers use only what crops need."]
  ], ["Think about which letter stands for which nutrient and what each does for the plant.", "N is for leaves, P for roots, K for flowers and fruit; the numbers are percentages.", "Example: a fertilizer high in P helps young plants grow strong roots. Now try yours."], [
    ["What does the N in NPK stand for?", "Nitrogen", "Neon", "Nickel"],
    ["What does the P in NPK stand for?", "Phosphorus", "Potassium", "Plastic"],
    ["What does the K in NPK stand for?", "Potassium", "Krypton", "Calcium"],
    ["Which nutrient helps plants make healthy leaves?", "Nitrogen", "Phosphorus", "Salt"],
    ["Which nutrient helps roots grow?", "Phosphorus", "Nitrogen", "Potassium"],
    ["NPK 20-10-10 contains the most...", "Nitrogen", "Phosphorus", "Potassium"],
    ["Ammonium nitrate is used as a...", "Fertilizer", "Fuel", "Metal"],
    ["Too much fertilizer washing into rivers can cause...", "Algae to grow too fast", "Water to freeze", "Fish to grow wings"],
    ["Fertilizers are made using ammonia from the...", "Haber process", "Contact lens process", "Blast furnace"]
  ]));

  c.push(les("Functional groups", [
    ["Special parts", "🧩", "A <b>functional group</b> is the part of an organic molecule that decides how it reacts. Alkanes have C-C single bonds; alkenes have <b>C=C</b>."],
    ["Alcohols and acids", "🧴", "Alcohols have an <b>–OH</b> group (ethanol is used as a fuel and solvent). Carboxylic acids have <b>–COOH</b>; ethanoic acid is the acid in vinegar."],
    ["Esters", "🍓", "An alcohol reacts with a carboxylic acid to make an <b>ester</b>, many of which smell fruity and are used in perfumes and flavorings."]
  ], ["Match the group name to its formula: –OH, –COOH or C=C.", "Alcohol ends in -ol and has OH. Carboxylic acid ends in -oic acid and has COOH.", "Example: propanol is an alcohol, so it has –OH. Now try yours."], [
    ["Which functional group do alcohols have?", "–OH", "–COOH", "C=C"],
    ["Which functional group do carboxylic acids have?", "–COOH", "–OH", "C=C"],
    ["Which functional group do alkenes have?", "C=C", "–OH", "–COOH"],
    ["Ethanoic acid is found in...", "Vinegar", "Water", "Steel"],
    ["Ethanol is an example of a(n)...", "Alcohol", "Alkene", "Acid"],
    ["Which of these is a carboxylic acid?", "Ethanoic acid", "Ethanol", "Ethene"],
    ["An alcohol + a carboxylic acid makes an...", "Ester", "Alkane", "Alloy"],
    ["Esters often smell...", "Fruity and sweet", "Of rotten eggs", "Of nothing"],
    ["Alkanes have only...", "Single bonds", "Double bonds", "Triple bonds only"]
  ]));

  c.push(les("Isomers", [
    ["Same atoms, new shape", "🧬", "<b>Isomers</b> have the same molecular formula but their atoms are arranged differently, so they are different substances."],
    ["Butane's twin", "🔗", "Butane C<sub>4</sub>H<sub>10</sub> is a straight chain. Methylpropane has the same C<sub>4</sub>H<sub>10</sub> but the carbons form a branch."],
    ["Counting", "🔢", "Methane, ethane and propane have no isomers. Butane has 2, pentane has 3 and hexane has 5."]
  ], ["Isomers have the same formula but a different arrangement.", "Check whether the molecular formulas match exactly.", "Example: ethanol C2H6O and methoxymethane C2H6O are isomers, since the formulas match. Now try yours."], [
    ["Isomers have the same...", "Molecular formula", "Structure", "Boiling point"],
    ["Which pair are isomers?", "Butane and methylpropane", "Ethane and propane", "Methane and ethene"],
    ["How many isomers does butane (C₄H₁₀) have, including itself?", "2", "1", "5"],
    ["How many isomers does pentane (C₅H₁₂) have, including itself?", "3", "2", "6"],
    ["How many isomers does propane (C₃H₈) have, including itself?", "1", "2", "3"],
    ["Which two molecules are NOT isomers?", "Ethane and ethene", "Butane and methylpropane", "Two C₅H₁₂ molecules"],
    ["Different isomers usually have different...", "Boiling points", "Numbers of atoms", "Atomic numbers"],
    ["A branched chain and a straight chain with the same formula are...", "Isomers", "Isotopes", "Polymers"]
  ]));

  c.push(les("Fractional distillation", [
    ["Splitting crude oil", "🛢️", "Crude oil is heated and its vapor rises up a column. Different <b>fractions</b> condense at different heights, because they have different boiling points."],
    ["Top to bottom", "⬆️", "Top: refinery gases, petrol, kerosene, diesel, fuel oil and bitumen at the bottom."],
    ["Trends", "📈", "From top to bottom, molecules get longer: boiling point <b>rises</b>, they get thicker (more <b>viscous</b>), darker and <b>harder to ignite</b>."]
  ], ["Think about chain length: short chains or long chains?", "Longer chains have stronger forces between molecules, so higher boiling points and thicker liquids.", "Example: kerosene, with medium chains, lies between petrol and diesel in the column. Now try yours."], [
    ["Fractional distillation separates crude oil by...", "Boiling point", "Color", "Taste"],
    ["Which fraction is collected at the top of the column?", "Refinery gases", "Bitumen", "Fuel oil"],
    ["Which fraction is collected at the bottom?", "Bitumen", "Petrol", "Refinery gases"],
    ["Which fraction is used for aircraft fuel?", "Kerosene", "Bitumen", "Refinery gases"],
    ["Longer hydrocarbon chains have...", "Higher boiling points", "Lower boiling points", "No boiling point"],
    ["Longer hydrocarbon chains are...", "More viscous (thicker)", "Runnier", "Always gases"],
    ["Bitumen is used for...", "Road surfaces", "Aircraft fuel", "Camping gas"],
    ["Shorter chains are...", "Easier to ignite", "Harder to ignite", "Not flammable at all"],
    ["Why do fractions condense at different heights?", "They have different boiling points", "They have different colors", "They have different smells"]
  ]));

  const BOY = [[100, 6], [200, 3], [300, 2], [600, 1], [100, 12], [200, 6], [400, 3], [300, 4], [600, 2], [1200, 1]];
  c.push(les("Boyle's law", [
    ["Squashing a gas", "🫁", "At a constant temperature, if you squeeze a gas into a smaller volume, its <b>pressure goes up</b>. Pressure and volume are inversely related."],
    ["The law", "📐", "<b>P<sub>1</sub> × V<sub>1</sub> = P<sub>2</sub> × V<sub>2</sub></b>. Example: 100 kPa × 6 L = 600; at 200 kPa, V = 600 ÷ 200 = 3 L."],
    ["Check", "✅", "Doubling the pressure halves the volume (at constant temperature)."]
  ], ["Think about what happens to the gas particles when they have less room.", "Pressure and volume pull in opposite directions when the temperature is steady.", "Example: pushing in a bicycle pump squeezes the air, and it pushes back harder. Now try yours."], [
    () => { const [p1, v1] = pick(BOY), k = p1 * v1, ps = [100, 200, 300, 400, 600, 1200].filter(p => p !== p1 && Number.isInteger(k / p)), p2 = pick(ps);
      return num(`A gas has a volume of <b>${v1} L</b> at a pressure of <b>${p1} kPa</b>. The temperature stays the same. What is its volume in liters at <b>${p2} kPa</b>?`, k / p2,
        ["Pressure times volume stays the same at constant temperature.", "Multiply the starting pressure by the starting volume, then divide by the new pressure.", "Example: 300 kPa and 2 L means 600; at 100 kPa the volume is 600 ÷ 100 = 6 L. Now do yours."], "🫁"); },
    ["At constant temperature, squeezing a gas to a smaller volume makes the pressure...", "Go up", "Go down", "Stay the same"],
    ["If you double the pressure on a gas at constant temperature, the volume...", "Halves", "Doubles", "Stays the same"],
    ["If the pressure is halved, the volume...", "Doubles", "Halves", "Stays the same"],
    ["Boyle's law needs which quantity to be constant?", "Temperature", "Color", "Mass of the container"]
  ]));

  c.push(les("Gases and temperature", [
    ["Kelvin scale", "🌡️", "Gas calculations use <b>kelvin (K)</b>. K = °C + 273. So 27 °C is 300 K, and 0 °C is 273 K."],
    ["Charles's law", "🎈", "At constant pressure, a gas takes more room when it is hotter: <b>V<sub>1</sub> ÷ T<sub>1</sub> = V<sub>2</sub> ÷ T<sub>2</sub></b> (T in kelvin)."],
    ["Example", "🧮", "2 L at 300 K, heated to 600 K, becomes 2 × 600 ÷ 300 = 4 L. Doubling the kelvin temperature doubles the volume."]
  ], ["Think about what temperature does to the speed of gas particles.", "Hotter particles push outward more, and the kelvin scale starts at the coldest possible temperature.", "Example: a balloon left in a warm car swells. Now try yours."], [
    () => { const t = pick([0, 27, 127, -73, -23, 77, 100, 227]); return num(`Change <b>${t} °C</b> into kelvin (K = °C + 273).`, t + 273, ["The kelvin scale starts at absolute zero, which is about -273 °C.", "Add 273 to the Celsius temperature.", "Example: 50 °C is 50 + 273 = 323 K. Now do yours."], "🌡️"); },
    () => { const t1 = pick([200, 250, 300, 400]), f = pick([0.5, 1.5, 2]), v1 = pick([2, 4, 6, 8, 10]); return num(`A gas has a volume of <b>${v1} L</b> at <b>${t1} K</b>. The pressure stays the same. What is its volume in liters at <b>${t1 * f} K</b>?`, v1 * f,
      ["Volume goes up and down with the kelvin temperature. By what factor did the temperature change?", "Work out the temperature ratio (new ÷ old), then multiply the volume by it.", "Example: 4 L at 200 K to 400 K is a factor of 2, so 8 L. Now do yours."], "🎈"); },
    () => { const k1 = pick([200, 300, 400]), v1 = pick([2, 4, 6, 8]); return num(`A gas has a volume of <b>${v1} L</b> at <b>${k1 - 273} °C</b>. It is heated at constant pressure until the kelvin temperature doubles. What is its new volume in liters?`, v1 * 2,
      ["If the kelvin temperature doubles, what happens to the volume?", "Volume is proportional to the kelvin temperature at constant pressure.", "Example: 3 L with kelvin temperature tripling becomes 9 L. Now do yours."], "🎈"); },
    ["At constant pressure, heating a gas makes its volume...", "Increase", "Decrease", "Stay the same"],
    ["What is absolute zero in °C?", "About −273 °C", "0 °C", "100 °C"],
    ["Why use kelvin in gas laws?", "Because kelvin starts at absolute zero, so ratios work", "Because it is smaller", "Because it uses fewer digits"]
  ]));

  c.push(les("Solubility curves", [
    ["Reading a curve", "📈", "A <b>solubility curve</b> shows how many grams of a solid dissolve in 100 g of water at each temperature."],
    ["Most solids", "☕", "For most solids, solubility <b>rises</b> with temperature. A hot saturated solution that cools forms crystals."],
    ["Crystals", "💎", "Crystals formed = solubility at the hot temperature − solubility at the cool temperature (in 100 g water)."]
  ], ["Compare the two solubility values: the hot one and the cold one.", "Subtract the colder (smaller) solubility from the hotter (bigger) one.", "Example: 60 g dissolves hot and 25 g cold, so 60 - 25 = 35 g comes out as crystals. Now do yours."], [
    () => { const cold = ri(1, 6) * 10, hot = cold + ri(1, 6) * 10; return num(`In <b>100 g</b> of water, salt X dissolves up to <b>${hot} g</b> at 60 °C and <b>${cold} g</b> at 20 °C. A saturated solution is cooled from 60 °C to 20 °C. How many grams of crystals form?`, hot - cold,
      ["Some of the salt can no longer stay dissolved when it cools.", "Find the difference between the two solubilities.", "Example: 70 g hot and 30 g cold gives 70 - 30 = 40 g crystals. Now do yours."], "💎"); },
    ["For most solids, solubility with a rise in temperature...", "Increases", "Decreases", "Stays the same"],
    ["When a hot saturated solution cools, what often forms?", "Crystals", "A gas", "A metal"],
    ["A saturated solution is one that...", "Cannot dissolve any more solute at that temperature", "Has no solute", "Is always hot"],
    ["For most gases, solubility in water with a rise in temperature...", "Decreases", "Increases", "Stays the same"],
    ["Solubility is usually measured in...", "g per 100 g of water", "Kilometers", "Degrees"],
    ["A solubility curve plots solubility against...", "Temperature", "Color", "Time of day"]
  ]));

  c.push(les("Acids and bases: giving and taking H⁺", [
    ["Brønsted-Lowry", "🤝", "An <b>acid</b> is a <b>proton (H<sup>+</sup>) donor</b>. A <b>base</b> is a <b>proton acceptor</b>."],
    ["An example", "💧", "HCl + H<sub>2</sub>O → H<sub>3</sub>O<sup>+</sup> + Cl<sup>-</sup>: HCl gives an H<sup>+</sup> (acid) and water takes it (base)."],
    ["Strong and weak", "💪", "A <b>strong</b> acid ionizes completely in water. A <b>weak</b> acid, like ethanoic acid, ionizes only a little and stays mostly as molecules."]
  ], ["Ask which substance gives away H⁺ and which one receives it.", "The donor is the acid and the acceptor is the base.", "Example: in NH3 + H2O → NH4+ + OH−, ammonia takes an H⁺, so it is the base. Now try yours."], [
    ["An acid is a...", "Proton (H⁺) donor", "Proton acceptor", "Electron donor only"],
    ["A base is a...", "Proton (H⁺) acceptor", "Proton donor", "Neutron donor"],
    ["In HCl + H₂O → H₃O⁺ + Cl⁻, HCl is the...", "Acid", "Base", "Catalyst"],
    ["In HCl + H₂O → H₃O⁺ + Cl⁻, water acts as the...", "Base", "Acid", "Salt"],
    ["A strong acid...", "Ionizes completely in water", "Ionizes only a little", "Does not ionize"],
    ["Which is a weak acid?", "Ethanoic acid", "Hydrochloric acid", "Sulfuric acid"],
    ["Which is a strong acid?", "Hydrochloric acid", "Ethanoic acid", "Carbonic acid"],
    ["H⁺ is the same as a...", "Proton", "Neutron", "Electron"],
    ["A weak acid in water is mostly...", "Un-ionized molecules", "Fully split into ions", "Pure H⁺"]
  ]));

  c.push(
    mix("Mixed practice", at(c, [0, 1, 3, 5, 7, 9, 11, 14, 16])),
    mix("Level 12 Challenge", at(c, [2, 4, 6, 8, 10, 12, 13, 15, 17]))
  );

  Object.assign(CHEM_LEVELS, { 10: a, 11: b, 12: c });
})();
