// Mind Lab Earth & Space, levels 13-15 (extension file). 20 lessons per level.
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // L(title, slides["h|v|t"], items["question|answer|picture|clue|wrong1,wrong2"], nudge)
  const L = (title, slides, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], v: p[2] || "", c: p[3] || "", w: p[4] ? p[4].split(",") : null }; });
    const make = () => {
      const it = pick(its);
      const pool = [...new Set(its.map(x => x.a))].filter(a => a !== it.a);
      const wr = shuf(it.w || pool).slice(0, 2);
      let exs = its.filter(x => x.a !== it.a && !nz(x.q + x.a).includes(nz(it.a)));
      if (!exs.length) exs = its.filter(x => x.a !== it.a);
      const ex = pick(exs);
      const na = nz(it.a), leaks = h => na.length > 2 && nz(String(h).replace(/<[^>]+>/g, "")).includes(na);
      let h1 = nudge || "Think back to what you just learned. Read the question slowly.";
      if (leaks(h1)) h1 = "Think back to what you just learned. Read the question slowly.";
      let h2 = it.c || "";
      if (!h2 || leaks(h2)) h2 = `The answer starts with the letter "${it.a[0].toUpperCase()}" and has ${it.a.replace(/ /g, "").length} letters.`;
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...wr]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of the ideas, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };


  // ================= LEVEL 13 =================
  const a = [];
  a.push(L("Thinking like an Earth scientist", [
    "Ask and guess|🔬|Scientists start with a question. Then they make a <b>hypothesis</b>, a guess that can be tested. Example: darker soil will get warmer in the Sun.",
    "Variables|🎛️|In a fair test you change only one thing on purpose: the <b>independent variable</b>. You measure the result: the <b>dependent variable</b>. Everything else stays the same. Those are the <b>constants</b>.",
    "Data and conclusions|📝|The numbers and notes you collect are <b>data</b>. Repeating the test makes the data more trustworthy. A <b>conclusion</b> says what the data show."
  ], [
    "A testable guess made before an experiment is a...|hypothesis|💡||conclusion,constant",
    "The one thing you change on purpose in a fair test is the...|independent variable|🎛️||dependent variable,constant",
    "The thing you measure to see the result is the...|dependent variable|📏||independent variable,hypothesis",
    "Things kept the same in a fair test are called...|constants|⚖️||variables you change,conclusions",
    "You test how sunlight changes soil temperature. What do you change on purpose?|the amount of sunlight|☀️||the thermometer reading,the day of the week",
    "Why repeat an experiment several times?|to make the results more reliable|🔁||to make it last longer,to change the question",
    "Numbers and notes collected in a test are called...|data|📝||guesses,constants",
    "A statement that sums up what the data show is a...|conclusion|✅||hypothesis,variable",
    "Which unit measures rainfall?|millimeters|🌧️||kilograms,degrees"
  ], "Think about what you change, what you measure, and what stays the same."));
  a.push(L("Three ways heat moves", [
    "Conduction|🥄|<b>Conduction</b> is heat moving by touch. A metal spoon in hot soup gets hot because heat passes along it.",
    "Convection|♨️|<b>Convection</b> is heat carried by moving air or liquid. Warm air is less dense, so it rises. Cool air sinks. This makes a loop called a convection current.",
    "Radiation|☀️|<b>Radiation</b> is heat carried by waves. It needs no matter, so it crosses empty space. This is how the Sun warms Earth."
  ], [
    "Heat moving by direct touch is...|conduction|🥄||convection,radiation",
    "Heat carried by rising warm air or liquid is...|convection|♨️||conduction,radiation",
    "Heat that reaches Earth from the Sun through space is...|radiation|☀️||conduction,convection",
    "Warm air compared with cool air is...|less dense|🎈||more dense,the same density",
    "A metal spoon warms up in hot soup. This is...|conduction|🥣||radiation,convection",
    "You feel warmth from a campfire a few steps away. This is mostly...|radiation|🔥||conduction,erosion",
    "A loop of rising warm air and sinking cool air is a...|convection current|🔄||radiation beam,conduction bar",
    "Why can heat from the Sun cross space?|Radiation needs no matter|🚀||Space is full of air,Space is full of water",
    "Warm air near the ground tends to...|rise|⬆️||sink,stand still"
  ], "Ask yourself: touch, moving fluid, or waves?"));
  a.push(L("Pressure and altitude", [
    "Air has weight|⚖️|Air presses on everything. This is <b>air pressure</b>. At sea level it is about <b>1013 millibars</b>.",
    "Higher means thinner|🏔️|The higher you go, the less air is above you. Pressure <b>drops</b> and the air is <b>thinner</b>, with less oxygen in each breath.",
    "Pressure and weather|🌤️|<b>High pressure</b> usually brings clear skies. <b>Low pressure</b> means rising air, clouds and often storms. A <b>barometer</b> measures pressure."
  ], [
    "As you climb a mountain, air pressure...|decreases|🏔️||increases,stays the same",
    "Air on a high mountaintop is...|thinner|🧗||thicker,heavier",
    "Air pressure at sea level is about...|1013 millibars|📊||10 millibars,5000 millibars",
    "A quickly falling barometer often means...|a storm may be coming|⛈️||clear weather is coming,an earthquake is coming",
    "High pressure usually brings...|clear skies|☀️||storms,hurricanes",
    "Low pressure means air is mostly...|rising|⬆️||sinking,frozen",
    "Climbers carry oxygen high up because each breath has...|less oxygen|😮‍💨||more oxygen,more water",
    "An altimeter uses air pressure to find...|height|📏||wind direction,rainfall",
    "Water boils at a ___ temperature on a high mountain.|lower|♨️||higher,the same"
  ], "Fewer air molecules above you means what for pressure?"));
  a.push(L("The Coriolis effect", [
    "A spinning Earth|🌍|Earth spins, so moving air and water do not travel in straight lines. They curve. This is the <b>Coriolis effect</b>.",
    "Left and right|↪️|In the Northern Hemisphere moving things curve to the <b>right</b>. In the Southern Hemisphere they curve to the <b>left</b>.",
    "Strong or weak|🌀|The effect is zero at the equator and strongest at the poles. It helps spin hurricanes: counterclockwise in the north, clockwise in the south."
  ], [
    "The Coriolis effect is caused by Earth's...|rotation|🌍||tilt only,magnet",
    "In the Northern Hemisphere moving air curves to the...|right|↪️||left,east only",
    "In the Southern Hemisphere moving air curves to the...|left|↩️||right,north",
    "The Coriolis effect is strongest at the...|poles|🧊||equator,tropics",
    "The Coriolis effect is zero at the...|equator|🌴||poles,mid-latitudes",
    "Northern Hemisphere hurricanes spin...|counterclockwise|🌀||clockwise,straight",
    "Southern Hemisphere hurricanes spin...|clockwise|🌀||counterclockwise,straight",
    "Hurricanes rarely form right on the equator because...|there is almost no Coriolis effect there|🌴||it is too cold there,there is no ocean there",
    "The Coriolis effect bends...|winds and ocean currents|💨||only volcanoes,only rocks"
  ], "Remember: it comes from Earth spinning."));
  a.push(L("Jet streams", [
    "Rivers of air|✈️|A <b>jet stream</b> is a fast, narrow river of air high in the sky, near the top of the troposphere, about 9 to 16 km up.",
    "Fast and wavy|💨|Jet streams can blow faster than <b>200 km/h</b>. They mostly flow from <b>west to east</b>. They form where cold air and warm air meet.",
    "Why they matter|🛩️|Jet streams steer storms. Pilots use them: flying east with a jet stream saves time and fuel."
  ], [
    "A jet stream is...|a fast river of air high up|✈️||a slow ocean current,a kind of cloud",
    "Jet streams mostly flow from...|west to east|➡️||east to west,north to south",
    "Jet streams are caused by differences in...|temperature|🌡️||rock type,tides",
    "A plane flying east with a jet stream will usually be...|faster|🛫||slower,grounded",
    "Jet streams can blow faster than...|200 km/h|💨||10 km/h,50 km/h",
    "Jet streams help move...|weather systems|🌪️||tectonic plates,mountains",
    "Jet streams are found...|high in the sky|☁️||deep underground,at the bottom of the sea",
    "Flying west against a jet stream is usually...|slower|🛬||faster,impossible"
  ], "Think about where the air is and which way it travels."));
  a.push(L("El Niño and La Niña", [
    "A Pacific pattern|🌊|Every 2 to 7 years the tropical Pacific Ocean swings between warm and cool. Normally trade winds push warm water west.",
    "El Niño|🔥|In <b>El Niño</b> the winds weaken and the surface water stays warm in the central and eastern Pacific. It can bring heavy rain to western South America and drought to Australia.",
    "La Niña|❄️|In <b>La Niña</b> the water in the eastern Pacific is unusually cool. Weather shifts the other way. The names are Spanish: the little boy and the little girl."
  ], [
    "El Niño is unusually ___ water in the tropical Pacific.|warm|🔥||cool,frozen",
    "La Niña is unusually ___ water in the eastern Pacific.|cool|❄️||warm,boiling",
    "El Niño and La Niña happen in which ocean?|Pacific|🌊||Atlantic,Arctic",
    "These swings happen about every...|2 to 7 years|📅||2 days,200 years",
    "Normal trade winds push warm surface water toward the...|west|➡️||east,south",
    "La Niña is Spanish for...|the little girl|👧||the big storm,the cold wind",
    "El Niño can bring heavy rain to...|western South America|🌧️||Antarctica,central Africa",
    "Scientists watch El Niño with...|ocean buoys and satellites|🛰️||sundials,compasses"
  ], "One brings warm water, the other cool water."));
  a.push(L("Rain shadows", [
    "Up and over|⛰️|When wind meets a mountain, air is forced up the slope. This is <b>orographic lift</b>. Rising air cools and its water vapor condenses into clouds and rain.",
    "Two sides|🌧️|The <b>windward</b> side faces the wind and is wet. On the <b>leeward</b> side the air sinks, warms and dries.",
    "A dry zone|🏜️|The dry land behind a mountain is a <b>rain shadow</b>. Many deserts, like parts of Nevada, lie in the rain shadow of mountains."
  ], [
    "The side of a mountain that faces the wind is the...|windward side|⛰️||leeward side,shadow peak",
    "The dry side of a mountain, away from the wind, is the...|leeward side|🏜️||windward side,wet side",
    "A dry area behind a mountain is a...|rain shadow|🏜️||flood plain,delta",
    "Air forced up a mountain slope is called...|orographic lift|⬆️||erosion,deposition",
    "Rising air cools, so its water vapor...|condenses|☁️||evaporates,freezes solid",
    "Air sinking down the leeward side gets...|warmer and drier|⬇️||colder and wetter,heavier and wetter",
    "Wind comes from the Pacific in the west. Nevada is east of the Sierra Nevada, so it is on the...|leeward side|🏜️||windward side,sea side",
    "Forests and heavy rain are common on the...|windward side|🌲||leeward side,summit only"
  ], "Wet side faces the wind. Dry side is sheltered."));
  a.push(L("Convection in the mantle", [
    "Slow flowing rock|🌋|The mantle is hot, solid rock, but over millions of years it flows very slowly, like extremely thick putty.",
    "A slow loop|🔄|Hot mantle rock is less dense, so it rises. Near the top it cools, gets denser and sinks. This loop is <b>mantle convection</b>. The heat comes from Earth's core and from radioactive rocks.",
    "Moving plates|🌏|The slow flow helps push and pull tectonic plates a few centimeters a year. Hot rock rises at mid-ocean ridges. Cold crust sinks at trenches."
  ], [
    "Mantle rock moves...|very slowly|🐌||as fast as a river,instantly",
    "Hot mantle rock rises because it is...|less dense|⬆️||more dense,frozen",
    "Cooler mantle rock...|sinks|⬇️||floats away,turns to gas",
    "Mantle convection helps move...|tectonic plates|🌏||the Moon,ocean tides",
    "Tectonic plates move about...|a few centimeters a year|📏||a few meters a second,a kilometer a day",
    "Mantle rock is mostly...|solid rock that flows slowly|🪨||liquid water,hot gas",
    "At a mid-ocean ridge, hot mantle rock...|rises|🌋||sinks,freezes",
    "At a deep ocean trench, cold crust...|sinks|⬇️||rises,melts instantly",
    "Heat that drives mantle flow comes from Earth's...|hot core and radioactive rock|🔥||Moon,clouds"
  ], "Hot goes up, cool goes down, just like soup in a pot."));
  a.push(L("Faults", [
    "Cracks in rock|🪨|A <b>fault</b> is a crack in Earth's crust where blocks of rock have moved. Different stresses make different faults.",
    "Three stresses|↔️|<b>Tension</b> pulls rock apart. <b>Compression</b> squeezes it together. <b>Shear</b> pushes parts sideways past each other.",
    "Three faults|📐|Tension makes a <b>normal fault</b> where one block drops down. Compression makes a <b>reverse fault</b> where one block is pushed up. Shear makes a <b>strike-slip fault</b>, like the San Andreas Fault."
  ], [
    "A crack in the crust where rock has moved is a...|fault|🪨||fold,crater",
    "Stress that pulls rock apart is...|tension|↔️||compression,shear",
    "Stress that squeezes rock together is...|compression|🤏||tension,shear",
    "Stress that pushes rock sideways past other rock is...|shear|↕️||tension,compression",
    "Tension usually makes a...|normal fault|⬇️||reverse fault,strike-slip fault",
    "Compression usually makes a...|reverse fault|⬆️||normal fault,strike-slip fault",
    "Shear usually makes a...|strike-slip fault|↔️||normal fault,reverse fault",
    "The San Andreas Fault is a...|strike-slip fault|🌉||normal fault,reverse fault",
    "In a normal fault the hanging wall moves...|down|⬇️||up,nowhere"
  ], "Match the stress to the movement of the blocks."));
  a.push(L("Seismic waves", [
    "Waves from a quake|🌍|An earthquake sends out <b>seismic waves</b>. A <b>seismograph</b> records them.",
    "P and S|📈|<b>P waves</b> are fastest and arrive first. They push and pull rock, and travel through solids and liquids. <b>S waves</b> are slower, shake rock side to side and cannot travel through liquids.",
    "Surface waves|🌊|<b>Surface waves</b> arrive last but cause the most damage. The gap between the P and S arrival times tells scientists how far away the quake was."
  ], [
    "The first seismic wave to arrive is the...|P wave|1️⃣||S wave,surface wave",
    "The S in S wave stands for...|secondary|2️⃣||surface,soft",
    "Seismic waves that move rock side to side are...|S waves|↔️||P waves,tides",
    "Which waves cause the most damage?|surface waves|🏚️||P waves,sound waves",
    "S waves cannot travel through...|liquid|💧||solid rock,granite",
    "Which wave can travel through liquids?|P wave|🌊||S wave,none",
    "S waves cannot pass through Earth's outer core. This shows it is...|liquid|🌍||solid,missing",
    "An instrument that records earthquakes is a...|seismograph|📉||barometer,anemometer",
    "The gap between P and S wave arrival tells scientists...|how far away the quake was|📏||tomorrow's weather,the rock color"
  ], "Think about speed and what each wave can pass through."));
  a.push(L("How crystals form", [
    "Growing crystals|💎|A <b>crystal</b> has atoms in a repeating pattern, which gives it flat faces and a regular shape.",
    "From melted rock|🌋|Crystals grow as melted rock cools. Slow cooling deep underground gives <b>large</b> crystals, like granite. Fast cooling at the surface gives <b>small</b> crystals, like basalt, or none at all, like glass-like obsidian.",
    "From water|🧂|Crystals also grow when water evaporates and leaves minerals behind, like salt. A <b>geode</b> is a hollow rock lined with crystals."
  ], [
    "Slow cooling of magma makes...|large crystals|💎||tiny crystals,no rock",
    "Fast cooling of lava makes...|small crystals|🔹||giant crystals,gold",
    "Volcanic glass like obsidian cooled so fast it has...|no crystals|🖤||huge crystals,fossils",
    "Salt crystals form when water...|evaporates|☀️||freezes,boils over",
    "Granite has big crystals. It cooled...|slowly underground|🪨||quickly in the air,in a river",
    "Basalt has tiny crystals. It cooled...|quickly at the surface|🌋||slowly underground,in a cave",
    "A hollow rock lined with crystals is a...|geode|💎||fossil,pebble",
    "Crystal shapes come from atoms in a...|repeating pattern|🔷||random pile,liquid swirl"
  ], "Slow means big, fast means small."));
  a.push(L("The carbon cycle", [
    "Carbon moves around|🔄|Carbon is in air, water, rocks, plants and animals. It moves between them in the <b>carbon cycle</b>.",
    "Taking in and giving out|🌳|Plants take in carbon dioxide (CO₂) by <b>photosynthesis</b>. Animals and plants give out CO₂ by <b>respiration</b>. Decomposers release CO₂ as they break down dead things. Oceans also absorb CO₂.",
    "Storing and burning|🛢️|Coal, oil and gas are carbon stored from ancient plants and animals. Burning them releases CO₂ fast. A <b>carbon sink</b>, like a forest, absorbs more than it releases."
  ], [
    "Plants take in carbon dioxide by...|photosynthesis|🌿||respiration,erosion",
    "Animals give out carbon dioxide by...|respiration|🐾||photosynthesis,condensation",
    "Burning fossil fuels releases...|carbon dioxide|🏭||oxygen only,helium",
    "Coal, oil and gas come from ancient...|plants and animals|🦕||rocks only,ice",
    "Decomposers release carbon when they...|break down dead things|🍄||make rain,melt ice",
    "The gas form of carbon in the air is...|carbon dioxide|💨||carbon rock,carbon water",
    "Cutting down forests means ___ CO₂ is absorbed.|less|🪓||more,the same",
    "A carbon sink takes in more carbon than it gives out. Which is one?|a forest|🌲||a car,a factory",
    "The ocean ___ carbon dioxide from the air.|absorbs|🌊||never touches,only makes"
  ], "Where does the carbon go in, and where does it come out?"));
  a.push(L("Earth's water budget", [
    "Mostly salty|🌊|About <b>97%</b> of Earth's water is salt water in the oceans. Only about <b>3%</b> is fresh.",
    "Mostly frozen|🧊|Most fresh water is frozen in glaciers and ice caps. Most of the unfrozen fresh water is <b>groundwater</b>.",
    "A tiny share|💧|Rivers and lakes hold only a tiny part of all the water. That is why we must not waste it."
  ], [
    "About how much of Earth's water is salty?|97%|🌊||50%,75%",
    "About how much of Earth's water is fresh?|3%|💧||30%,50%",
    "Most fresh water is frozen in...|glaciers and ice caps|🧊||rivers,clouds",
    "Most unfrozen fresh water is in...|groundwater|🕳️||rivers,the air",
    "Out of 100 liters of Earth's water, about how many are fresh?|3 liters|🧪||30 liters,97 liters",
    "Rivers and lakes hold...|a tiny share of the water|🏞️||most of the water,all fresh water",
    "Salt water is mostly found in the...|oceans|🌊||glaciers,clouds",
    "Easy-to-use fresh water comes from...|rivers, lakes and shallow groundwater|🚰||the ocean floor,ice caps only"
  ], "Most is salty, and most of the rest is locked in ice."));
  a.push(L("The electromagnetic spectrum", [
    "Waves of light|🌈|Light is energy that travels in waves. The <b>electromagnetic spectrum</b> is the whole family of these waves, from longest to shortest.",
    "The family|📻|Longest to shortest: <b>radio, microwave, infrared, visible light, ultraviolet, X-ray, gamma ray</b>. We can only see the visible part. Infrared feels like heat. Ultraviolet can cause sunburn.",
    "Why astronomers care|🔭|Every wave shows something different. Earth's air blocks much UV and X-ray light, so those telescopes must be in space. All of these waves travel at the speed of light in space."
  ], [
    "The part of the spectrum we can see is...|visible light|👀||infrared,radio",
    "Which waves are longest?|radio waves|📻||gamma rays,X-rays",
    "Which waves are shortest?|gamma rays|☢️||radio waves,microwaves",
    "We feel infrared light as...|heat|🔥||sound,cold",
    "Ultraviolet light from the Sun can cause...|sunburn|🏖️||thunder,tides",
    "X-rays are used to see...|bones|🦴||the wind,clouds",
    "Telescopes for X-rays are placed in space because Earth's air...|blocks them|🛰️||makes them stronger,turns them into rain",
    "Astronomers use many kinds of waves because...|each shows different things|🔭||only radio works,light is boring",
    "All electromagnetic waves travel through space at the...|speed of light|⚡||speed of sound,speed of a car"
  ], "Think of the order from radio to gamma."));
  a.push(L("How the Sun makes energy", [
    "A giant ball of gas|☀️|The Sun is mostly hydrogen and helium. Gravity squeezes it, making the core extremely hot: about 15 million °C.",
    "Fusion|⚛️|In the core, hydrogen atoms are squeezed together to make helium. This is <b>nuclear fusion</b>. A tiny bit of mass turns into a huge amount of energy.",
    "Long lasting|⏳|The Sun has been shining for about 4.6 billion years and has fuel for about 5 billion more. Its light takes about 8 minutes to reach Earth."
  ], [
    "The Sun gets its energy from nuclear...|fusion|⚛️||fission only,burning coal",
    "In fusion, hydrogen atoms join to make...|helium|🎈||iron,water",
    "The Sun is mostly...|hydrogen and helium|☀️||rock and iron,water and ice",
    "The Sun's core temperature is about...|15 million °C|🌡️||100 °C,5500 °C",
    "Sunlight reaches Earth in about...|8 minutes|⏱️||8 seconds,8 hours",
    "In fusion, a little mass is turned into...|energy|⚡||rock,water",
    "The Sun has fuel left for about...|5 billion years|⏳||5 thousand years,50 million years",
    "The Sun is a medium-sized...|star|⭐||planet,moon",
    "What squeezes the Sun's core hot enough for fusion?|gravity|🌌||wind,magnets"
  ], "Think of tiny atoms being pushed together."));
  a.push(L("Parallax", [
    "Hold up a finger|☝️|Hold a finger out and close one eye, then the other. Your finger seems to jump against the background. This shift is <b>parallax</b>.",
    "Near and far|↔️|Close objects seem to shift a lot. Far objects seem to shift only a little. So the size of the shift tells you how far away something is.",
    "Measuring stars|⭐|Astronomers look at a nearby star in January and again in July, from opposite sides of Earth's orbit. The star's tiny shift gives its distance. A <b>parsec</b> is about 3.26 light-years."
  ], [
    "Parallax is...|the apparent shift of an object seen from two places|👀||a kind of star,a weather front",
    "Objects that are closer seem to shift...|more|☝️||less,never",
    "Objects that are farther seem to shift...|less|🌄||more,backwards",
    "A star with a large parallax shift is...|nearby|⭐||very far away,not a star",
    "Astronomers measure star parallax from opposite sides of...|Earth's orbit|🌍||the Moon,a mountain",
    "One parsec is about...|3.26 light-years|📏||1 light-year,100 light-years",
    "You hold your finger closer to your face. Its shift when you switch eyes...|gets bigger|☝️||gets smaller,stays zero",
    "Parallax works best for stars that are...|fairly near|🔭||billions of light-years away,inside the Sun"
  ], "Closer means a bigger shift."));
  a.push(L("Exoplanets", [
    "Planets around other stars|🪐|An <b>exoplanet</b> is a planet that orbits a star other than our Sun. The first around a Sun-like star was found in 1995. Thousands are now known.",
    "How we find them|🔭|Stars are far brighter than their planets, so we rarely see exoplanets directly. In the <b>transit method</b> a planet passes in front of its star and makes the starlight dip a tiny bit. The Kepler and TESS space telescopes use it.",
    "The habitable zone|🌡️|The <b>habitable zone</b> is the range of distances from a star where liquid water could exist. Too close and water boils away. Too far and it freezes."
  ], [
    "A planet orbiting a star other than the Sun is an...|exoplanet|🪐||asteroid,comet",
    "In the transit method a planet...|passes in front of its star|🌑||explodes,touches Earth",
    "During a transit the starlight...|dips a little|📉||doubles,turns red",
    "The habitable zone is where...|liquid water could exist|💧||stars form,comets live",
    "Too close to a star, water would...|boil away|♨️||freeze,turn to rock",
    "Too far from a star, water would...|freeze|🧊||boil,glow",
    "We rarely see exoplanets directly because their star is...|much brighter|🌟||much dimmer,invisible",
    "Which space telescopes hunt for exoplanets?|Kepler and TESS|🛰️||Titanic and Apollo,Moon and Mars",
    "Roughly how many exoplanets are known?|thousands|🔢||about 8,only 1"
  ], "Think about what makes a planet not too hot and not too cold."));
  a.push(L("How the planets formed", [
    "A cloud collapses|🌫️|About 4.6 billion years ago a cloud of gas and dust, the <b>solar nebula</b>, began to collapse. Most of it fell to the center and made the Sun.",
    "Building planets|🪨|The leftover material flattened into a spinning disk. Dust clumped into bits, then into chunks called <b>planetesimals</b>. Chunks stuck together by <b>accretion</b> and grew into planets.",
    "Rocky and gassy|🪐|Near the Sun it was too hot for ice and gas to stay, so rocky planets formed. Farther out, planets gathered lots of gas and ice and became giants."
  ], [
    "The solar system formed from a cloud of gas and dust called a...|nebula|🌫️||galaxy,comet",
    "The solar system is about this old...|4.6 billion years|⏳||4.6 million years,46 thousand years",
    "Small bits sticking together to form bigger bodies is...|accretion|🧲||erosion,fusion",
    "Most of the cloud's material ended up in the...|Sun|☀️||Moon,asteroid belt",
    "The leftover cloud flattened into a spinning...|disk|💿||cube,ring of fire",
    "The inner planets are rocky because near the Sun it was too...|hot for ice and gas|🔥||cold for rock,windy for ice",
    "The chunks that built the planets were called...|planetesimals|🪨||geodes,nebulas",
    "The outer planets became giants by gathering lots of...|gas and ice|🪐||sand,lava",
    "The asteroid belt holds leftover rock that...|never became a planet|☄️||fell into the Sun,formed the Moon"
  ], "Think: cloud, disk, clumps, planets."));
  a.push(MIX("Mixed practice", [a[1], a[2], a[3], a[5], a[7], a[8], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 13 Challenge", [a[0], a[4], a[6], a[9], a[10], a[16], a[17], a[3], a[8], a[12], a[1], a[7]]));

  // ================= LEVEL 14 =================
  const b = [];
  b.push(L("Clues to ancient climate", [
    "Natural records|🧊|Scientists can learn about past climate from natural records called <b>proxies</b>: ice cores, tree rings, coral and ocean mud.",
    "Ice cores|❄️|Snow piles up in layers each year in Antarctica and Greenland. Deep layers are the oldest. They trap tiny bubbles of ancient air.",
    "Tree rings|🌳|A tree grows one ring each year. A wide ring means a good growing year, with enough warmth and water. A thin ring means a hard year."
  ], [
    "Natural records of past climate are called...|proxies|🧊||fossils only,forecasts",
    "Ice cores contain trapped bubbles of ancient...|air|🫧||oil,sand",
    "In an ice core the oldest ice is at the...|bottom|⬇️||top,side",
    "Ice cores are drilled in Greenland and...|Antarctica|🐧||Australia,Brazil",
    "Each tree ring is usually one...|year of growth|🌳||day of growth,century",
    "A wide tree ring suggests a ___ growing year.|good|🌧️||poor,frozen",
    "Each layer of snow in an ice core is about one...|year|📅||week,million years",
    "Which can be a climate proxy?|tree rings|🌲||a new sneaker,a bus ticket",
    "Ocean mud and coral can also record past...|climate|🪸||birthdays,bus routes"
  ], "These are natural recorders of the past."));
  b.push(L("Albedo and feedback loops", [
    "Reflecting light|⬜|<b>Albedo</b> is how much sunlight a surface reflects. Fresh snow reflects a lot (high albedo). Dark ocean water reflects little (low albedo).",
    "A loop|🔄|A <b>feedback loop</b> is when a change causes more of the same change. Warming melts ice. Dark water takes its place and absorbs more sunlight. This warms things further.",
    "Everyday example|🏠|A white roof reflects sunlight and stays cooler. A dark roof absorbs sunlight and gets hot."
  ], [
    "Albedo is how much sunlight a surface...|reflects|⬜||absorbs,makes",
    "Which has the highest albedo?|fresh snow|❄️||dark ocean water,black asphalt",
    "Which has a low albedo?|dark ocean water|🌊||fresh snow,white clouds",
    "When sea ice melts, Earth reflects ___ sunlight.|less|🧊||more,the same",
    "A change that makes itself bigger is a...|positive feedback|🔄||fair test,cold front",
    "Which roof stays coolest in the Sun?|white roof|🏠||black roof,dark brown roof",
    "An albedo of 1 would mean a surface reflects...|all the light|🪞||none of the light,half the light",
    "Melting ice exposes dark water that...|absorbs more sunlight|🌊||reflects more sunlight,stops the Sun",
    "Black asphalt compared with grass absorbs...|more heat|🛣️||less heat,no heat"
  ], "Light colors bounce light. Dark colors soak it up."));
  b.push(L("The ozone layer", [
    "Sunscreen in the sky|🛡️|The <b>ozone layer</b> is a thin layer in the stratosphere. Ozone is a molecule with three oxygen atoms. It absorbs most of the Sun's harmful <b>ultraviolet (UV)</b> light.",
    "A hole appears|🕳️|Chemicals called <b>CFCs</b>, once used in fridges and spray cans, destroyed ozone. A thin spot, the ozone hole, grew over Antarctica.",
    "A success story|✅|In 1987 nations signed the <b>Montreal Protocol</b> to ban CFCs. The ozone layer is now slowly recovering. Ozone near the ground, in smog, is harmful to breathe."
  ], [
    "The ozone layer is in the...|stratosphere|🛡️||mantle,troposphere only",
    "The ozone layer absorbs harmful...|ultraviolet light|☀️||rain,sound",
    "An ozone molecule has how many oxygen atoms?|three|3️⃣||one,seven",
    "Chemicals that harmed the ozone layer were called...|CFCs|🧴||CPUs,GPS",
    "The treaty that banned CFCs is the...|Montreal Protocol|📜||Paris Pact,Berlin Wall",
    "The ozone hole grew over...|Antarctica|🐧||the Sahara,Brazil",
    "The ozone layer today is...|slowly recovering|✅||gone forever,growing faster than ever",
    "Ozone high in the sky is protective, but ozone at ground level is...|a pollutant|🏭||a fuel,a vitamin",
    "Without enough ozone, people would get more...|sunburn and skin damage|🏖️||earthquakes,rainbows"
  ], "Think about what blocks UV light."));
  b.push(L("Acid rain", [
    "The pH scale|🧪|The <b>pH scale</b> runs from 0 to 14. Pure water is 7, which is neutral. Below 7 is acidic. Above 7 is basic.",
    "Where it comes from|🏭|Burning coal and oil in power plants and cars sends sulfur dioxide and nitrogen oxides into the air. They mix with water and fall as <b>acid rain</b>.",
    "What it does|🌲|Acid rain harms fish in lakes, weakens trees and eats away limestone statues and buildings. Wind can carry the gases hundreds of kilometers. Cleaner energy and smokestack scrubbers help."
  ], [
    "On the pH scale, acidic means a number...|below 7|🧪||above 7,exactly 14",
    "Pure water has a pH of...|7|💧||1,14",
    "Which pH is the most acidic?|3|🍋||7,10",
    "Acid rain comes mostly from gases made by burning...|coal and oil|🏭||water and air,wood only in fireplaces",
    "Two gases that cause acid rain are sulfur dioxide and...|nitrogen oxides|💨||helium,argon",
    "Acid rain can damage...|limestone statues|🗿||the Moon,air",
    "Acid rain is harmful to...|fish in lakes|🐟||sand dunes,satellites",
    "A way to reduce acid rain is to...|burn less coal|⚡||burn more coal,drive more",
    "Wind can carry acid rain gases...|far from where they started|🌬️||nowhere at all,only into space"
  ], "Think about what comes out of smokestacks."));
  b.push(L("Cities and air quality", [
    "Hot cities|🏙️|Cities are often warmer than nearby countryside. This is the <b>urban heat island</b>. Dark pavement and roofs absorb heat, and there are fewer plants to cool the air.",
    "Smog|🌫️|<b>Smog</b> is smoky, hazy air. Car fumes react in sunlight to make ground-level ozone. Tiny dust and soot particles, called <b>PM2.5</b>, are smaller than 2.5 micrometers and can get into lungs.",
    "Fixes|🌳|Trees, parks, green roofs and light-colored roofs cool a city. Public transport, bikes and clean energy cut smog. The <b>Air Quality Index (AQI)</b> tells people how clean the air is."
  ], [
    "A city that is warmer than the countryside around it is an...|urban heat island|🏙️||ice shelf,rain shadow",
    "Dark pavement ___ heat.|absorbs|🛣️||reflects,makes",
    "A high AQI number means the air is...|worse|😷||cleaner,colder",
    "Smoky, hazy polluted air is called...|smog|🌫️||dew,frost",
    "PM2.5 are tiny...|particles|🔬||planets,clouds of rain",
    "Which helps cool a hot city?|more trees and parks|🌳||more dark parking lots,more dark roofs",
    "A major source of city smog is...|car exhaust|🚗||tree leaves,snowfall",
    "A light-colored roof helps because it...|reflects sunlight|🏠||absorbs sunlight,makes smog",
    "Cities get hot partly because they have fewer...|plants|🌿||buildings,roads"
  ], "Think about what dark surfaces do with sunlight."));
  b.push(L("Ocean acidification", [
    "The ocean takes CO₂|🌊|The ocean absorbs about a quarter of the carbon dioxide people release. When CO₂ dissolves in seawater it makes a weak acid called carbonic acid.",
    "Getting more acidic|🧪|Ocean water is slightly basic, with a pH of about 8.1. As CO₂ rises, the pH is falling. The ocean is becoming <b>more acidic</b>.",
    "Shells in trouble|🐚|Corals, oysters and many tiny sea animals build shells from minerals in seawater. More acid makes shells harder to build, which affects the food web."
  ], [
    "The ocean absorbs about what share of human CO₂ emissions?|a quarter|🌊||none,all of it",
    "CO₂ dissolving in seawater makes a weak...|acid|🧪||metal,rock",
    "Ocean water has a pH of about...|8.1|📊||3.0,12",
    "As the ocean takes in more CO₂ its pH is...|falling|⬇️||rising,locked at 14",
    "Ocean acidification harms animals that build...|shells|🐚||wings,fur",
    "Which is at risk from ocean acidification?|coral reefs|🪸||sand dunes,glaciers on land",
    "The main cause of ocean acidification is extra...|carbon dioxide|🏭||oxygen,salt",
    "Fewer healthy shell builders can hurt the ocean...|food web|🐟||tides,earthquakes",
    "Seawater is naturally slightly...|basic|🧂||acidic,fizzy"
  ], "Think about what CO₂ does when it dissolves in water."));
  b.push(L("The ocean conveyor belt", [
    "Heat and salt|🌡️|<b>Thermohaline circulation</b> is a slow flow of the deep ocean driven by temperature (thermo) and saltiness (haline).",
    "Sinking water|⬇️|Near the poles water gets very cold. When sea ice forms it leaves salt behind. Cold, salty water is <b>dense</b>, so it sinks to the deep ocean.",
    "A giant loop|🌍|The deep water creeps along the ocean floor and rises elsewhere. One full trip takes about <b>1,000 years</b>. It is called the global conveyor belt and it moves heat around the planet."
  ], [
    "In the word thermohaline, thermo means...|heat|🌡️||salt,wind",
    "In the word thermohaline, haline means...|salt|🧂||heat,light",
    "Cold, salty water is ___ so it sinks.|dense|⬇️||light,fizzy",
    "Deep water sinks mostly near the...|poles|🧊||equator,tropics",
    "One trip around the global conveyor belt takes about...|1,000 years|⏳||10 days,1 year",
    "When sea ice forms, it leaves behind...|salt|🧂||sugar,sand",
    "Surface currents are driven mostly by wind. Deep currents are driven mostly by...|density|⚖️||tides only,volcanoes",
    "The conveyor belt moves ___ around the planet.|heat|🔥||mountains,clouds only",
    "Lots of melting fresh water would make the ocean surface...|less dense|💧||more dense,solid"
  ], "Cold plus salty makes water heavy."));
  b.push(L("Upwelling", [
    "Water rising up|⬆️|<b>Upwelling</b> is when cold water from deep in the sea rises to the surface.",
    "Why it happens|💨|Winds blowing along a coast can push the surface water away from shore. Deep water rises to take its place. The opposite, when surface water sinks, is <b>downwelling</b>.",
    "Full of food|🐟|Deep water holds lots of nutrients. At the surface they feed plankton, the base of the food web. Upwelling zones, like the coasts of Peru and California, have rich fishing."
  ], [
    "Upwelling is when ___ water rises to the surface.|deep|⬆️||warm shallow,fresh river",
    "Upwelling is often caused by...|wind pushing surface water away|💨||the Moon exploding,earthquakes only",
    "Upwelled water is usually...|colder|🧊||hotter,boiling",
    "Upwelled water brings up...|nutrients|🌱||sand castles,plastic",
    "Nutrients feed tiny ocean life called...|plankton|🔬||sharks,whales only",
    "The opposite of upwelling is...|downwelling|⬇️||outwelling,overwelling",
    "Which coast has famous upwelling and rich fishing?|Peru|🎣||Sahara coast,Antarctica interior",
    "Upwelling zones have lots of fish because plankton is the base of the...|food web|🐟||tide table,rock cycle",
    "During a strong El Niño, upwelling off Peru is usually...|weaker|📉||stronger,unchanged"
  ], "Deep water carries food up."));
  b.push(L("Magnetic stripes on the seafloor", [
    "New crust|🌋|At a mid-ocean ridge, magma rises and cools into new rock called basalt. Tiny magnetic grains in it line up with Earth's magnetic field as it cools.",
    "Flips|🧲|Earth's magnetic field has flipped direction many times in history. Each flip is recorded in the rock, making stripes on each side of the ridge that match like a mirror.",
    "Proof|✅|The stripes, found in the 1950s and 1960s, helped prove <b>seafloor spreading</b>. Rock is youngest at the ridge and gets older farther away. The oldest ocean floor is only about 180 million years old."
  ], [
    "New ocean crust forms at a...|mid-ocean ridge|🌋||trench,delta",
    "Seafloor stripes on each side of a ridge...|mirror each other|🪞||are all different,are random",
    "Rock closest to the ridge is the...|youngest|👶||oldest,most buried",
    "Basalt records Earth's magnetic field as it...|cools|🧊||erodes,burns",
    "Earth's magnetic field has ___ many times.|flipped|🧲||frozen,disappeared",
    "Rock gets older as you move ___ the ridge.|away from|➡️||toward,straight into",
    "The idea that new seafloor forms and moves outward is seafloor...|spreading|↔️||shrinking,stopping",
    "The oldest ocean floor is about...|180 million years old|⏳||4 billion years old,10 thousand years old",
    "Magnetic stripes are evidence for...|plate tectonics|🌍||tides,seasons"
  ], "Think about rock forming at the ridge and moving outward."));
  b.push(L("Metamorphic rocks", [
    "Changed by heat and pressure|🔥|<b>Metamorphic</b> rocks form when heat and pressure change an existing rock without melting it. The old rock is the <b>parent rock</b>.",
    "Foliated|📚|<b>Foliated</b> rocks have flat layers or bands. Shale becomes slate, then schist, then gneiss as heat and pressure increase.",
    "Non-foliated|⚪|<b>Non-foliated</b> rocks have no bands. Limestone becomes marble. Sandstone becomes quartzite."
  ], [
    "Metamorphic rocks form from heat and pressure without...|melting|🔥||freezing,drying",
    "The rock that changes is the...|parent rock|🪨||child rock,mirror rock",
    "A rock with flat layers or bands is...|foliated|📚||volcanic,fizzy",
    "Limestone changes into...|marble|⚪||slate,gneiss",
    "Sandstone changes into...|quartzite|🟫||marble,schist",
    "Shale changes first into...|slate|⬛||marble,quartzite",
    "Which is a foliated rock?|gneiss|📚||marble,quartzite",
    "Which is a non-foliated rock?|marble|⚪||slate,schist",
    "Meta in metamorphic comes from a word meaning...|change|🔄||melt,mountain"
  ], "Which parent rock gave which new rock?"));
  b.push(L("Sedimentary rock types", [
    "Layers pile up|🏖️|<b>Sedimentary</b> rock forms from bits of sediment. <b>Compaction</b> squeezes layers together. <b>Cementation</b> glues the grains with minerals.",
    "Clastic|🪨|<b>Clastic</b> rocks are made of pieces of other rocks: <b>conglomerate</b> from rounded pebbles, <b>sandstone</b> from sand and <b>shale</b> from mud.",
    "Chemical and organic|🧂|<b>Chemical</b> rocks form when water evaporates, like rock salt. <b>Organic</b> rocks form from living things: coal from plants, limestone often from shells and skeletons."
  ], [
    "Squeezing sediment layers together is...|compaction|🤏||cementation,evaporation",
    "Gluing grains together with minerals is...|cementation|🧴||compaction,melting",
    "Sandstone is made of...|sand grains|🏖️||plant remains,salt crystals",
    "Shale is made of...|mud and clay|🟫||pebbles,shells",
    "Conglomerate contains...|rounded pebbles|⚪||tiny shells,glass",
    "Rock salt forms when water...|evaporates|☀️||freezes,erupts",
    "Coal forms from...|plant remains|🌿||sand,seashells",
    "Limestone is often made from...|shells and skeletons|🐚||lava,wind",
    "Rocks made of pieces of other rocks are...|clastic|🪨||chemical,organic"
  ], "Ask what the rock is made of."));
  b.push(L("Geologic maps and folds", [
    "Maps of rock|🗺️|A <b>geologic map</b> uses colors to show which rock types or ages are at the surface. The <b>legend</b> tells you what each color means.",
    "Cross sections|✂️|A <b>cross section</b> is a slice that shows rock layers underground, like looking at the side of a cake.",
    "Bent layers|〰️|Layers can bend into folds. An <b>anticline</b> is an arch. A <b>syncline</b> is a trough. <b>Strike</b> is the direction a layer runs. <b>Dip</b> is the angle it tilts."
  ], [
    "On a geologic map, colors show different...|rock types or ages|🗺️||weather types,city names",
    "The part of a map that explains the colors is the...|legend|📖||scale only,title only",
    "A slice view showing rock layers underground is a...|cross section|✂️||weather map,time zone",
    "Rock layers folded upward into an arch make an...|anticline|⛰️||syncline,earthquake",
    "Rock layers folded downward into a trough make a...|syncline|🥣||anticline,volcano",
    "The angle a rock layer tilts is its...|dip|📐||strike,legend",
    "The direction a rock layer runs along the ground is its...|strike|🧭||dip,fold",
    "Sedimentary layers are first laid down...|flat|➖||upside-down,vertical",
    "A gap in the rock record where layers are missing is an...|unconformity|🕳️||anticline,epicenter"
  ], "Think arch versus bowl."));
  b.push(L("Hazards and risk", [
    "Hazard or risk|⚠️|A <b>hazard</b> is a natural event that could cause harm, like an earthquake. <b>Risk</b> is the chance that people and property will be harmed.",
    "Lowering risk|🏗️|<b>Mitigation</b> means reducing harm before it happens: strong building codes, flood walls, not building in flood zones, and good planning.",
    "Warning and planning|📣|Maps show where hazards are greater. Alerts and sirens give early warning. Families can plan routes and keep an emergency kit."
  ], [
    "A natural event that could cause harm is a...|hazard|⚠️||risk,mitigation",
    "The chance that people or property will be harmed is...|risk|🎲||hazard,mitigation",
    "Reducing harm before a disaster is...|mitigation|🏗️||erosion,deposition",
    "Which lowers flood risk?|not building in flood zones|🏘️||building on a flood plain,removing flood walls",
    "Buildings in earthquake zones follow strict...|building codes|📋||movie rules,sports rules",
    "Sirens and phone alerts are examples of...|early warning|📣||erosion,fossils",
    "A hazard map shows where danger is...|greater|🗺️||the same everywhere,never found",
    "Something every family should have for emergencies is a...|emergency kit|🎒||video game,garden gnome",
    "A volcano far from any town has high hazard but ___ risk to people.|low|🌋||high,no"
  ], "Hazard is the event. Risk is about people being affected."));
  b.push(L("Kepler's laws of orbits", [
    "Ellipses|🥚|Johannes Kepler found that planets move in <b>ellipses</b>, slightly squashed circles, with the Sun at one <b>focus</b>, not the center.",
    "Speed changes|🏃|A planet moves faster when it is closer to the Sun (<b>perihelion</b>) and slower when it is farther (<b>aphelion</b>).",
    "Farther, longer|⏳|Planets farther from the Sun take longer to orbit. Earth is closest to the Sun in early January, so distance does not cause our seasons."
  ], [
    "Planets orbit the Sun in shapes called...|ellipses|🥚||squares,triangles",
    "The Sun sits at one ___ of a planet's orbit.|focus|☀️||corner,pole",
    "A planet moves fastest when it is...|closest to the Sun|🏃||farthest from the Sun,behind the Moon",
    "The closest point to the Sun is the...|perihelion|☀️||aphelion,equinox",
    "The farthest point from the Sun is the...|aphelion|🌌||perihelion,solstice",
    "Who discovered these laws?|Johannes Kepler|🔭||Isaac Newton,Marie Curie",
    "A planet farther from the Sun has a ___ year.|longer|⏳||shorter,same-length",
    "Earth is closest to the Sun in...|January|📅||July,April",
    "Earth's seasons are caused by its...|tilt|🌍||distance from the Sun,speed"
  ], "Closer means faster. Farther means a longer trip."));
  b.push(L("Gravity and orbits", [
    "A pull between masses|🍎|Isaac Newton showed that every object pulls on every other object with <b>gravity</b>. More mass means a stronger pull.",
    "Distance matters|📏|The farther apart two objects are, the weaker the pull. Double the distance and the force becomes <b>one quarter</b>. Triple it and the force is one ninth.",
    "Falling around|🛰️|An orbiting satellite is falling toward Earth, but it moves sideways so fast that it keeps missing. Without gravity, the Moon would fly off in a straight line."
  ], [
    "Gravity depends on mass and...|distance|📏||color,temperature",
    "More mass means gravity is...|stronger|🍎||weaker,zero",
    "Greater distance makes gravity...|weaker|📏||stronger,unchanged",
    "If you double the distance, gravity becomes...|one quarter|✖️||double,half",
    "If you triple the distance, gravity becomes...|one ninth|3️⃣||one third,triple",
    "Who explained gravity with math?|Isaac Newton|🍎||Galileo's cat,Neil Armstrong",
    "A satellite stays in orbit because it keeps ___ around Earth.|falling|🛰️||floating away,standing still",
    "Without gravity the Moon would...|fly off in a straight line|🌙||crash into Mars,get bigger",
    "The Moon orbits Earth because of...|gravity|🌍||wind,magnets in the ocean"
  ], "Gravity weakens quickly as distance grows."));
  b.push(L("Where did the Moon come from?", [
    "Giant impact|💥|The leading idea is the <b>giant impact hypothesis</b>. About 4.5 billion years ago a Mars-sized body called <b>Theia</b> crashed into the young Earth.",
    "Making the Moon|🌙|The crash flung hot rock into orbit. The debris clumped together to form the Moon.",
    "Clues|🔍|Moon rocks are much like Earth's mantle. The Moon has only a small iron core. It always shows us the same face, because it is <b>tidally locked</b>. It drifts away from Earth about 3.8 cm each year."
  ], [
    "The leading idea for the Moon's origin is the giant...|impact|💥||eruption,flood",
    "The body that hit young Earth is called...|Theia|🪐||Titan,Terra",
    "Theia was about the size of...|Mars|🔴||Jupiter,a small asteroid",
    "The Moon formed about how long ago?|4.5 billion years|⏳||4.5 thousand years,45 million years",
    "The Moon formed from...|debris thrown into orbit|🌙||a captured comet,a frozen cloud",
    "Moon rocks are similar to Earth's...|mantle|🪨||ocean water,clouds",
    "The Moon always shows us the same face because it is...|tidally locked|🔒||standing still,made of ice",
    "The Moon moves away from Earth about...|3.8 cm a year|📏||38 meters a year,3.8 km a year",
    "The Moon has a small core of...|iron|⚙️||gold,ice"
  ], "A planet-sized crash made lots of debris."));
  b.push(L("Star types and the H-R diagram", [
    "Star classes|🌈|Stars are sorted by temperature into classes <b>O, B, A, F, G, K, M</b>, from hottest to coolest. Blue stars are hot. Red stars are cooler. The Sun is class <b>G</b>.",
    "The H-R diagram|📊|The <b>Hertzsprung-Russell diagram</b> plots star brightness against temperature. Most stars lie in a band called the <b>main sequence</b>.",
    "Giants and dwarfs|🔴|<b>Red giants</b> are cool but huge, so they are bright. <b>White dwarfs</b> are hot but tiny, so they are dim. Dark lines in a star's spectrum tell us which elements it contains."
  ], [
    "The hottest star class is...|O|🔵||M,G",
    "The coolest star class is...|M|🔴||O,B",
    "The Sun is class...|G|☀️||O,M",
    "Blue stars are ___ than red stars.|hotter|🔵||cooler,smaller",
    "The H-R diagram plots brightness against...|temperature|📊||distance from Earth,age in school",
    "Most stars lie on the...|main sequence|📈||white band,red line",
    "Red giants are cool but very...|large|🔴||tiny,dark",
    "White dwarfs are hot but...|dim|⚪||huge,cold",
    "Dark lines in a star's spectrum show its...|elements|🌈||age in years,name"
  ], "Remember the order O B A F G K M: hot to cool."));
  b.push(L("Black holes and neutron stars", [
    "Star remains|💥|When a very massive star runs out of fuel it explodes in a <b>supernova</b>. The core that is left can become a neutron star or a black hole.",
    "Neutron stars|⚫|A <b>neutron star</b> is only about 20 km wide, yet it is so dense that a teaspoon would weigh billions of tons.",
    "Black holes|🕳️|A <b>black hole</b> has gravity so strong that not even light escapes. Its edge is the <b>event horizon</b>. We find black holes by how they affect nearby stars and gas. Far away, its gravity is the same as a star of that mass."
  ], [
    "The explosion of a massive star is a...|supernova|💥||solar flare,eclipse",
    "A neutron star is extremely...|dense|⚫||light,hollow",
    "A black hole's gravity is so strong that even ___ cannot escape.|light|💡||sound waves only,dust only",
    "The edge of a black hole is the...|event horizon|⭕||equator,crust",
    "How do scientists find black holes?|by their effect on nearby stars and gas|🔭||by seeing them glow,by smelling them",
    "At the center of the Milky Way is a...|supermassive black hole|🌌||giant planet,bright comet",
    "A black hole forms from a very ___ star.|massive|⭐||small,cold",
    "If the Sun became a black hole of the same mass, Earth's orbit would...|stay the same|🌍||spiral in right away,fly away",
    "A neutron star is about the width of a...|city|🏙️||planet,galaxy"
  ], "Think of the most extreme gravity there is."));
  b.push(MIX("Mixed practice", [b[1], b[2], b[4], b[6], b[7], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 14 Challenge", [b[0], b[3], b[5], b[8], b[11], b[12], b[13], b[15], b[16], b[17], b[2], b[9]]));

  // ================= LEVEL 15 =================
  const c = [];
  c.push(L("Stable and unstable air", [
    "Will it rise?|🎈|A bubble of air rises if it is warmer than the air around it. Rising air cools by about <b>10 °C for every kilometer</b> (when dry).",
    "Stable or unstable|⚖️|<b>Stable</b> air resists rising, so clouds stay flat and layered, or there is fog. <b>Unstable</b> air keeps rising. If it is moist, tall <b>cumulonimbus</b> clouds and thunderstorms grow.",
    "Extra energy|🌩️|When vapor condenses it releases <b>latent heat</b>, which warms the air and helps it keep rising. A <b>temperature inversion</b> is warm air over cold air. It acts like a lid and traps smog."
  ], [
    "A bubble of air rises if it is ___ than the air around it.|warmer|🎈||colder,wetter only",
    "Dry rising air cools about how many °C per kilometer?|10|🌡️||1,50",
    "Air that resists rising is...|stable|⚖️||unstable,tropical",
    "Air that keeps rising is...|unstable|⬆️||stable,frozen",
    "Moist unstable air can build...|thunderstorm clouds|⛈️||fog banks only,rainbows",
    "Tall storm clouds are called...|cumulonimbus|⛈️||stratus,cirrus",
    "Heat released when vapor condenses is...|latent heat|🔥||frost heat,tidal heat",
    "Warm air sitting over cold air is a temperature...|inversion|🔁||front,gradient",
    "A temperature inversion can trap...|smog|🌫️||the Sun,tides"
  ], "Ask: is the rising air warmer than its surroundings?"));
  c.push(L("Climate classification", [
    "Sorting climates|🗺️|The <b>Köppen system</b> sorts the world's climates using temperature and rainfall. It has five main groups, each with a letter.",
    "The five groups|🔤|<b>A</b> tropical (hot and wet). <b>B</b> dry (deserts and steppes). <b>C</b> temperate (mild). <b>D</b> continental (cold winters). <b>E</b> polar (very cold).",
    "Examples|🌎|The Amazon is A. The Sahara is B. Much of western Europe is C. Siberia is D. Antarctica is E."
  ], [
    "The Köppen system sorts climates using temperature and...|rainfall|🌧️||tides,soil color",
    "Köppen group A is...|tropical|🌴||polar,dry",
    "Köppen group B is...|dry|🏜️||tropical,polar",
    "Köppen group C is...|temperate|🌤️||polar,dry",
    "Köppen group D is...|continental|🥶||tropical,dry",
    "Köppen group E is...|polar|🧊||tropical,temperate",
    "The Amazon rainforest is in group...|tropical|🌴||polar,dry",
    "The Sahara is in the ___ group.|dry|🏜️||tropical,polar",
    "Antarctica is in the ___ group.|polar|🐧||tropical,dry"
  ], "Match the letter to the temperature and rain."));
  c.push(L("Why ice ages come and go", [
    "Slow changes in orbit|🌍|Milutin Milankovitch, a Serbian scientist, showed that slow changes in Earth's orbit affect the amount of sunlight each part of the planet gets. These are the <b>Milankovitch cycles</b>.",
    "Three cycles|🔄|<b>Eccentricity</b>: the orbit gets more or less stretched, about every 100,000 years. <b>Tilt</b>: the angle changes between about 22.1° and 24.5°, every 41,000 years. <b>Precession</b>: Earth's axis wobbles like a top, every 26,000 years.",
    "Ice ages|❄️|Together these cycles help time the ice ages. Small changes in sunlight, boosted by feedbacks like ice and CO₂, grow into big climate shifts."
  ], [
    "Milankovitch cycles are changes in Earth's...|orbit and tilt|🌍||volcanoes,rivers",
    "The orbit stretching more or less is called...|eccentricity|🥚||precession,tilt",
    "Earth's axis wobbling like a spinning top is...|precession|🌀||eccentricity,albedo",
    "The tilt cycle takes about...|41,000 years|⏳||41 years,4 million years",
    "The tilt of Earth changes between about 22.1° and...|24.5°|📐||45°,90°",
    "The orbit-shape cycle takes about...|100,000 years|⏳||100 years,100 days",
    "The wobble cycle takes about...|26,000 years|⏳||26 days,26 million years",
    "Milankovitch cycles help explain the timing of...|ice ages|❄️||eclipses,volcanoes",
    "These cycles change how much ___ reaches different places.|sunlight|☀️||rain only,volcanic ash"
  ], "These are slow orbit changes over tens of thousands of years."));
  c.push(L("Carbon footprints and solutions", [
    "Your footprint|👣|A <b>carbon footprint</b> is the amount of greenhouse gas caused by a person, product or group. Driving, flying, heating and eating all add up.",
    "Two kinds of action|🛠️|<b>Mitigation</b> reduces the cause: solar panels, wind power, insulation, planting trees. <b>Adaptation</b> helps us cope with change: sea walls, drought-tolerant crops, cooling centers.",
    "Net zero|⚖️|<b>Net zero</b> means the greenhouse gas we put into the air equals what we remove. Cutting use of energy and switching to clean energy are big steps."
  ], [
    "A carbon footprint measures...|greenhouse gas caused by our activities|👣||how big our shoes are,the weight of coal",
    "Reducing the causes of climate change is...|mitigation|☀️||adaptation,erosion",
    "Adjusting to the changes that happen is...|adaptation|🧱||mitigation,pollution",
    "Net zero means gases emitted are balanced by gases...|removed|⚖️||added,hidden",
    "Building sea walls is an example of...|adaptation|🌊||mitigation,nothing",
    "Installing solar panels is an example of...|mitigation|☀️||adaptation,a footprint",
    "Which lowers your carbon footprint?|cycling instead of driving|🚲||driving short trips,leaving lights on",
    "Insulating a house lowers its...|energy use|🏠||windows,roof color only",
    "Planting trees helps by...|absorbing carbon dioxide|🌳||making CO₂,melting ice"
  ], "Mitigation = reduce the cause. Adaptation = cope with effects."));
  c.push(L("Is the water healthy?", [
    "Testing water|🧪|Scientists test streams for <b>pH</b> (healthy streams are about 6.5 to 8.5), <b>turbidity</b> (cloudiness), temperature and <b>dissolved oxygen</b>.",
    "Oxygen|🐟|Fish need dissolved oxygen. Warm water holds less oxygen. Fertilizer runoff adds nitrates that feed algae blooms. When the algae die, bacteria use up the oxygen and fish suffer.",
    "Living clues|🪲|Some small animals, like stonefly larvae, only live in clean water, so finding them is a good sign. A Secchi disk measures how clear water is."
  ], [
    "Cloudiness of water is called...|turbidity|🌫️||salinity,gravity",
    "Fish need ___ oxygen in the water.|dissolved|🐟||frozen,solid",
    "Warm water holds ___ oxygen than cold water.|less|🌡️||more,the same",
    "Healthy streams have a pH around...|6.5 to 8.5|🧪||1 to 3,11 to 13",
    "Fertilizer runoff can cause algae...|blooms|🟢||fossils,volcanoes",
    "When algae die, bacteria use up the water's...|oxygen|🫧||salt,light",
    "Stonefly larvae in a stream suggest the water is...|clean|✅||polluted,frozen",
    "A Secchi disk measures water...|clarity|🥏||depth of ice,saltiness",
    "Water that is murky has high...|turbidity|🌫️||clarity,oxygen"
  ], "Think about what fish and tiny animals need to live."));
  c.push(L("Protecting the soil", [
    "Soil is precious|🌱|Soil takes hundreds of years to form but can wash or blow away fast. In the 1930s, drought and plowing without care caused the <b>Dust Bowl</b> in the central United States.",
    "Farming tricks|🚜|<b>Contour plowing</b> follows the curves of a hill. <b>Terraces</b> are flat steps on slopes. <b>Cover crops</b> keep soil covered. <b>Windbreaks</b> are rows of trees. <b>No-till</b> farming leaves old plant roots in the ground.",
    "Why it works|🌾|Roots hold soil. Plants and mulch slow raindrops and wind. Slowing water and wind means less erosion."
  ], [
    "Plowing along the curves of a hill is called...|contour plowing|🚜||terracing,mulching",
    "Flat steps cut into a slope are...|terraces|🪜||windbreaks,dunes",
    "Rows of trees that slow wind are...|windbreaks|🌳||terraces,cover crops",
    "Plants grown to keep soil covered are...|cover crops|🌱||bare fields,deserts",
    "Leaving old roots in the soil is called...|no-till farming|🌾||heavy plowing,burning",
    "The 1930s dust storms in the central US were the...|Dust Bowl|🌪️||Ice Age,Gold Rush",
    "Plant roots help soil by...|holding it in place|🌿||washing it away,turning it to sand",
    "Contour plowing helps because it slows ___ running down a hill.|water|💧||sunlight,magma",
    "Soil takes ___ to form.|hundreds of years|⏳||one day,one week"
  ], "Anything that slows wind or water saves soil."));
  c.push(L("Floating crust", [
    "Two kinds of crust|🏔️|<b>Continental crust</b> is thick (about 30 to 50 km), made mostly of granite, and less dense. <b>Oceanic crust</b> is thin (about 5 to 10 km), made of basalt, and denser.",
    "Floating|🛟|Crust floats on the denser, flowing mantle, like a boat in water. This balance is called <b>isostasy</b>. Mountains have deep roots, like an iceberg.",
    "Rebound|⬆️|When a heavy ice sheet melts, the land slowly rises back up. This is <b>isostatic rebound</b>. Parts of Canada and Scandinavia are still rising."
  ], [
    "Which crust is thicker?|continental crust|🏔️||oceanic crust,both the same",
    "Oceanic crust is mostly made of...|basalt|⬛||granite,limestone",
    "Continental crust is mostly made of...|granite|🪨||basalt,ice",
    "Which crust is denser?|oceanic crust|🌊||continental crust,neither",
    "The crust floats on the...|mantle|🛟||core,atmosphere",
    "The balance of floating crust is called...|isostasy|⚖️||erosion,subduction",
    "Big mountains have deep...|roots|⛰️||oceans,craters",
    "When a heavy ice sheet melts, the land slowly...|rises|⬆️||sinks,turns to ice",
    "That slow rising of land is isostatic...|rebound|⬆️||collision,sunset"
  ], "Light, thick continents float higher than dense, thin ocean floor."));
  c.push(L("Rift valleys", [
    "Pulled apart|↔️|Where two plates move apart, the crust stretches and sinks to form a long, narrow <b>rift valley</b>. This is a <b>divergent boundary</b>.",
    "On land|🌍|The <b>East African Rift</b> is slowly splitting Africa. It has volcanoes, earthquakes and long lakes. If the rift keeps widening, the sea may one day flood it and make a new ocean.",
    "In the sea|🌋|Iceland sits on the Mid-Atlantic Ridge, where the North American and Eurasian plates pull apart. That is why Iceland has so many volcanoes. The Red Sea began as a rift."
  ], [
    "A long, narrow valley where plates pull apart is a...|rift valley|↔️||delta,dune",
    "Plates moving apart make a ___ boundary.|divergent|↔️||convergent,transform",
    "A famous rift in Africa is the East African...|Rift|🌍||Plain,Trench",
    "Iceland sits on the Mid-Atlantic...|Ridge|🌋||Canyon,Desert",
    "Iceland has many volcanoes because plates are...|pulling apart|🌋||sliding on ice,standing still",
    "A rift that keeps widening could one day become an...|ocean|🌊||desert,mountain",
    "The Red Sea began as a...|rift|🌊||crater,glacier",
    "Rift valleys often have earthquakes and...|volcanoes|🌋||hurricanes,glaciers only",
    "The shape of a rift valley is long and...|narrow|↔️||round,tall"
  ], "Think about plates pulling away from each other."));
  c.push(L("Half-lives", [
    "Atoms that decay|☢️|Some atoms are unstable. They change into other atoms in a steady, random way. The <b>half-life</b> is the time for half of the atoms in a sample to decay.",
    "Halving again|➗|After 1 half-life half is left. After 2, a quarter. After 3, an eighth. Start with 80 g: 40 g, then 20 g, then 10 g.",
    "Dating the past|⏳|<b>Carbon-14</b> has a half-life of about 5,730 years. It dates once-living things like wood and bone up to about 50,000 years old. <b>Uranium-238</b> has a half-life of 4.5 billion years, so it dates very old rocks."
  ], [
    "Half-life is the time for ___ of the atoms to decay.|half|➗||all,a tenth",
    "A sample has 80 g. After 1 half-life, how much is left?|40 g|⚖️||20 g,80 g",
    "A sample has 80 g. After 2 half-lives, how much is left?|20 g|⚖️||40 g,10 g",
    "A sample has 100 g. After 3 half-lives, how much is left?|12.5 g|⚖️||25 g,33 g",
    "After 2 half-lives, what fraction is left?|one quarter|🥧||one half,one eighth",
    "After 3 half-lives, what fraction is left?|one eighth|🥧||one quarter,one sixth",
    "The half-life of carbon-14 is about...|5,730 years|🌳||57 years,5 billion years",
    "Carbon-14 can date things that were once...|alive|🦴||melted,frozen forever",
    "Uranium-238 dates very old rocks because its half-life is...|billions of years|🪨||a few seconds,one day",
    "A sample has one quarter of its atoms left. How many half-lives passed?|2|⏳||1,4"
  ], "Each half-life cuts what is left in half."));
  c.push(L("Evidence from fossils", [
    "Changes over time|🦴|The <b>fossil record</b> shows that life has changed over millions of years. Older fossils are found in deeper layers, and simpler forms often appear before more complex ones.",
    "Missing links|🔗|<b>Transitional fossils</b> show features of two groups. <i>Archaeopteryx</i> had feathers and wings like a bird, and teeth and a long tail like a dinosaur. <i>Tiktaalik</i> was a fish with limb-like fins, a step toward four-legged animals.",
    "More clues|🐋|Early whale ancestors had legs. A bat wing, a whale flipper and a human arm share the same bone pattern, a sign of a shared ancestor. Charles Darwin explained change over time by <b>natural selection</b>."
  ], [
    "The fossil record shows that life has...|changed over time|🦴||never changed,stopped",
    "Older fossils are usually found in ___ layers.|deeper|⬇️||higher,sideways",
    "A fossil showing features of two groups is...|transitional|🔗||modern,fake",
    "Archaeopteryx had traits of birds and...|dinosaurs|🦖||fish,mammals",
    "Tiktaalik was a fish with limb-like...|fins|🐟||wings,horns",
    "Early whale ancestors had...|legs|🐋||wings,feathers",
    "A bat wing and a human arm have the same...|bone pattern|🦴||color,weight",
    "Who explained natural selection?|Charles Darwin|📖||Isaac Newton,Albert Einstein",
    "Tiktaalik shows a step from fish toward...|four-legged animals|🦎||birds,insects"
  ], "Fossils in a row can show how life changed."));
  c.push(L("The Big Bang and the expanding universe", [
    "A hot beginning|💥|About <b>13.8 billion years ago</b> the universe began extremely hot and dense, and it has been expanding ever since. This is the <b>Big Bang</b> theory. It was not an explosion into empty space. Space itself grew.",
    "Evidence|📡|In 1929 Edwin Hubble found that distant galaxies are moving away from us. In the 1960s astronomers detected faint microwave glow from everywhere: the <b>cosmic microwave background</b>, left over from the early universe.",
    "Raisin bread|🍞|Think of raisin bread rising. As the dough expands, every raisin moves away from every other raisin. Galaxies are like the raisins."
  ], [
    "The universe began about...|13.8 billion years ago|💥||13.8 million years ago,4.6 billion years ago",
    "The theory of the beginning of the universe is the...|Big Bang|💥||Big Crunch,Big Eclipse",
    "Since the Big Bang the universe has been...|expanding|↔️||shrinking,standing still",
    "In 1929 Hubble found that distant galaxies are moving...|away from us|🌌||toward us,in circles around Earth",
    "The leftover glow from the early universe is the cosmic ___ background.|microwave|📡||gamma,water",
    "In the raisin bread picture, the raisins are...|galaxies|🍞||stars only,planets only",
    "The Big Bang was best described as...|space itself expanding|🌌||an explosion in empty space,a star collision",
    "Edwin Hubble was an...|astronomer|🔭||architect,chemist",
    "The universe is older than the solar system by about...|9 billion years|⏳||9 thousand years,9 years"
  ], "Everything is moving apart as space grows."));
  c.push(L("Redshift", [
    "Waves stretch|🚑|When a source of waves moves away, the waves stretch out. Think of an ambulance siren that drops in pitch as it drives away. This is the <b>Doppler effect</b>.",
    "Light version|🔴|When a galaxy moves away, its light is stretched toward the red end of the spectrum: <b>redshift</b>. When a galaxy moves toward us, its light shifts toward blue: <b>blueshift</b>.",
    "A big clue|🌌|Most galaxies show redshift. Farther galaxies have larger redshifts, so they move away faster. This is Hubble's law, and shows the universe is expanding."
  ], [
    "Light from a galaxy moving away shifts toward...|red|🔴||blue,green only",
    "Light from an object moving toward us shifts toward...|blue|🔵||red,black",
    "The change in waves from a moving source is the...|Doppler effect|🚑||greenhouse effect,Coriolis effect",
    "A siren sounds lower pitched as it moves...|away|🚑||closer,sideways forever",
    "Most distant galaxies show...|redshift|🌌||blueshift,no light",
    "Farther galaxies are moving away...|faster|💨||slower,at the same speed",
    "Redshift is evidence the universe is...|expanding|↔️||shrinking,a flat disk",
    "Waves from a source moving away are...|stretched|↔️||squeezed,stopped",
    "Hubble's law links a galaxy's distance to its...|speed of moving away|🌌||color of its name,number of moons"
  ], "Away means stretched and red."));
  c.push(L("Moons with surprises", [
    "Giant moons|🌕|Ganymede, a moon of Jupiter, is the largest moon in the solar system, bigger than Mercury. Io, also at Jupiter, is the most volcanic place we know.",
    "Hidden oceans|🌊|Europa, a moon of Jupiter, has an icy shell over a salty ocean. Enceladus, a moon of Saturn, shoots geysers of water vapor and ice into space. Liquid water makes scientists curious about life.",
    "A hazy moon|🟠|Titan, a moon of Saturn, has a thick orange atmosphere and lakes of liquid methane. NASA launched Europa Clipper in 2024 to study Europa."
  ], [
    "The largest moon in the solar system is...|Ganymede|🌕||Europa,Io",
    "The most volcanic moon is...|Io|🌋||Titan,Ganymede",
    "Which moon has an icy shell over an ocean and orbits Jupiter?|Europa|🧊||Titan,Io",
    "Which moon of Saturn shoots geysers?|Enceladus|⛲||Ganymede,Io",
    "Which moon has a thick orange atmosphere?|Titan|🟠||Europa,Enceladus",
    "Titan orbits...|Saturn|🪐||Jupiter,Mars",
    "Europa orbits...|Jupiter|🪐||Saturn,Neptune only",
    "Scientists are curious about Europa because it may have...|liquid water|💧||cities,forests",
    "The NASA mission launched in 2024 to Europa is the...|Europa Clipper|🚀||Moon Express,Titan Sailor"
  ], "Match each moon to its planet and its surprise."));
  c.push(L("Sunspots and flares", [
    "Dark spots|🌑|<b>Sunspots</b> are dark patches on the Sun. They look dark because they are cooler (about 3,500 °C) than the area around (about 5,500 °C). The number of sunspots rises and falls in an <b>11-year cycle</b>.",
    "Eruptions|💥|A <b>solar flare</b> is a sudden burst of energy. A <b>coronal mass ejection (CME)</b> is a huge cloud of charged particles thrown into space. <b>Prominences</b> are giant loops of gas.",
    "Solar wind|🌬️|The Sun constantly sends out a stream of charged particles, the <b>solar wind</b>. Never look at the Sun without a proper solar filter, because it can damage your eyes."
  ], [
    "Sunspots look dark because they are...|cooler|🌑||hotter,empty holes",
    "The sunspot cycle lasts about...|11 years|📅||11 days,110 years",
    "A sudden burst of energy from the Sun is a...|solar flare|💥||sunspot,prominence",
    "A huge cloud of charged particles thrown into space is a...|coronal mass ejection|☁️||sunspot,solar eclipse",
    "A steady stream of charged particles from the Sun is the...|solar wind|🌬️||jet stream,trade wind",
    "Giant loops of gas above the Sun's surface are...|prominences|🔥||sunspots,craters",
    "To look at the Sun safely you need a...|proper solar filter|🕶️||camera flash,mirror",
    "Sunspots are about 3,500 °C compared with the Sun's surface of about...|5,500 °C|🌡️||500 °C,55 °C",
    "More sunspots usually means more solar...|activity|☀️||rain,ice"
  ], "Sunspots are cooler, flares are bursts."));
  c.push(L("Space weather", [
    "Particles reach Earth|🧲|Charged particles from flares and CMEs can reach Earth in a day or two. Earth's <b>magnetosphere</b> protects us by steering most of them away.",
    "Beautiful and risky|🌌|Some particles follow magnetic field lines to the poles and make auroras. Strong storms, called <b>geomagnetic storms</b>, can disturb satellites, GPS, radios and power grids.",
    "History|📜|In 1859 the Carrington Event caused auroras seen far from the poles and set telegraph machines sparking. In 1989 a storm caused a power blackout in Quebec, Canada. Forecasters now watch the Sun to warn us."
  ], [
    "Earth's protective magnetic bubble is the...|magnetosphere|🧲||atmosphere,mantle",
    "Auroras happen when charged particles hit Earth's...|upper atmosphere|🌌||oceans,volcanoes",
    "A strong disturbance of Earth's magnetic field is a ___ storm.|geomagnetic|🧲||hurricane,monsoon",
    "Space weather can disturb satellites and...|power grids|⚡||forests,glaciers",
    "The big storm of 1859 is called the...|Carrington Event|📜||Great Fire,Dust Bowl",
    "A 1989 storm caused a blackout in...|Quebec|🇨🇦||Egypt,Brazil",
    "Charged particles from the Sun reach Earth in about...|a day or two|📅||a few seconds,a century",
    "Auroras are mostly seen near the...|poles|🧊||equator,tropics",
    "Forecasters watch the ___ to predict space weather.|Sun|☀️||Moon,tides"
  ], "The Sun sends it, and Earth's magnetic field steers it."));
  c.push(L("Space numbers", [
    "Big numbers|🔢|Space numbers are huge, so scientists use <b>scientific notation</b>: a number between 1 and 10 times a power of ten. 5,000 is 5 × 10^3 because 10^3 is 1,000.",
    "Counting zeros|0️⃣|10^6 means 1 followed by 6 zeros, which is a million. 7 × 10^6 is 7,000,000. A negative power makes a small number: 4 × 10^-3 is 0.004.",
    "Examples|🌌|Light travels about 3 × 10^8 meters per second. The Earth is about 1.5 × 10^8 km from the Sun. The universe is about 1.38 × 10^10 years old."
  ], [
    "5 × 10^3 equals...|5,000|🔢||500,50",
    "Write 7,000,000 in scientific notation.|7 × 10^6|🔢||7 × 10^5,7 × 10^7",
    "4.6 × 10^9 years equals...|4.6 billion years|🌍||460 million years,46 billion years",
    "10^6 means 1 followed by how many zeros?|6|0️⃣||10,60",
    "Which is bigger, 2 × 10^6 or 2 × 10^9?|2 × 10^9|🔢||2 × 10^6,they are equal",
    "Earth is about 1.5 × 10^8 km from the Sun. That is about...|150 million km|☀️||15 million km,1.5 billion km",
    "Write 300,000,000 in scientific notation.|3 × 10^8|⚡||3 × 10^7,3 × 10^9",
    "4 × 10^-3 equals...|0.004|🔬||0.04,0.4",
    "A number in scientific notation is written as a number between 1 and 10 times a power of...|ten|🔟||two,hundred"
  ], "Move the decimal point one place for each power of ten."));
  c.push(L("Scale models", [
    "Making space fit|📐|Space is too large to show at full size. A <b>scale model</b> shrinks everything by the same amount. A map scale of 1 cm = 10 km means 4 cm shows 40 km.",
    "Earth and Sun|☀️|The Sun is about 109 times wider than Earth. If Earth were 1 cm wide, the Sun would be about 109 cm, a little over a meter. The Sun would then be about 117 meters from Earth.",
    "Mostly empty|🌌|In a good scale model, most of the space between planets is empty. That shows how spread out the solar system really is."
  ], [
    "A map scale of 1 cm = 10 km. A distance of 4 cm shows...|40 km|🗺️||4 km,400 km",
    "A map scale of 1 cm = 50 km. A distance of 6 cm shows...|300 km|🗺️||56 km,3,000 km",
    "A scale model shrinks everything by the...|same amount|📐||random amount,largest amount",
    "The Sun is about how many times wider than Earth?|109|☀️||9,1000",
    "If Earth is 1 cm wide in a model, the Sun is about...|109 cm|☀️||10 cm,1 km",
    "In a good solar system scale model, most of the space is...|empty|🌌||full of planets,full of stars",
    "Why do we use scale models of space?|space is too big to show at full size|🔭||space is too small,they are cheaper than nothing",
    "A scale of 1:100 means the real thing is...|100 times bigger|📏||100 times smaller,the same size",
    "A map scale of 1 cm = 5 km. A distance of 3 cm shows...|15 km|🗺️||8 km,150 km"
  ], "Multiply the map distance by the scale."));
  c.push(L("Engineering for natural hazards", [
    "Design problems|🏗️|Engineers design solutions to natural hazards. They list <b>criteria</b> (what it must do) and <b>constraints</b> (limits like cost, size and materials), then build and test <b>prototypes</b>.",
    "Quakes and floods|🏢|<b>Base isolators</b> let a building move separately from shaking ground. <b>Cross-bracing</b> strengthens frames. <b>Levees</b> hold back rivers. <b>Retrofitting</b> strengthens old buildings. Mangrove forests slow coastal waves.",
    "Fire and tsunami|🔥|<b>Firebreaks</b> are cleared strips that slow a wildfire. <b>DART buoys</b> sit in deep ocean and sense tsunami waves, so warnings can be sent."
  ], [
    "What a solution must do is its...|criteria|✅||constraints,prototypes",
    "Limits like cost and materials are called...|constraints|💰||criteria,hazards",
    "A first test model of a design is a...|prototype|🧪||levee,constraint",
    "Base isolators help a building...|move separately from shaking ground|🏢||float on water,stay frozen",
    "A wall that holds back river floods is a...|levee|🌊||firebreak,buoy",
    "Strengthening an old building is called...|retrofitting|🔧||erosion,fossilization",
    "A cleared strip that slows a wildfire is a...|firebreak|🔥||levee,terrace",
    "Buoys that detect tsunamis are called...|DART buoys|🛟||GPS lamps,tide pools",
    "Mangrove forests protect coasts by...|slowing waves|🌴||making waves,melting ice"
  ], "Engineers match each hazard with a design that fights it."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[3], c[5], c[6], c[7], c[8], c[10], c[11], c[12], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 15 Challenge", [c[2], c[4], c[7], c[8], c[9], c[10], c[11], c[13], c[14], c[16], c[17], c[0], c[6]]));

  Object.assign(EARTH_LEVELS, { 13: a, 14: b, 15: c });
})();
