// Mind Lab Earth & Space, levels 22-24 (extension file). 20 lessons per level.
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



  // ================= LEVEL 22 =================
  const a = [];
  a.push(L("Orbital resonance", [
    "Simple ratios|🔁|When the orbit times of two bodies make a simple ratio, such as 2 to 1, they are in <b>orbital resonance</b>. They line up again and again and give each other regular gravity tugs.",
    "Jupiter's moons|🪐|Io, Europa and Ganymede are in a 1 : 2 : 4 resonance. Io orbits four times while Ganymede orbits once. The tugs keep Io's orbit slightly <b>elliptical</b>, so Jupiter flexes it and heats it. That heat powers Io's volcanoes.",
    "More resonances|☄️|Pluto orbits twice while Neptune orbits three times (a 3 : 2 resonance). Jupiter's resonances also clear the <b>Kirkwood gaps</b> in the asteroid belt."
  ], [
    "When two orbit times make a simple ratio, the bodies are in orbital...|resonance|🔁|The word means a repeating match.|collision,eclipse",
    "Io's constant volcanoes are powered by heat from...|tidal flexing|🌋|Jupiter stretches and squeezes the moon.|nuclear fusion,sunlight",
    "Pluto and Neptune are in a 3 : 2 resonance. Which one orbits more times in the same period?|Neptune|🔵|The planet with the shorter year goes around more often.|Pluto,neither",
    "The Kirkwood gaps in the asteroid belt are caused by resonances with...|Jupiter|🪨|It is the most massive planet.|Mars,the Sun",
    "Europa orbits twice for each orbit of Ganymede. Ganymede's period is how many times Europa's?|2|🌙|Twice as many orbits means half the time for each.|4,3",
    "Resonance works because the bodies give each other regular...|gravity tugs|🧲|The tugs repeat at the same spot in the orbits.|radio signals,magnetic bursts",
    "Which Galilean moon is the innermost one in the resonance chain?|Io|🌋|It is the closest to Jupiter.|Europa,Ganymede",
    "In a 2 : 1 resonance the inner body orbits how often for each orbit of the outer one?|twice|⏱️|Inner orbits are quicker.|once,three times"
  ], "Think about orbit times that repeat in a neat pattern."));
  a.push(L("Tides: spring and neap", [
    "Why tides happen|🌊|The Moon's gravity pulls harder on the near side of Earth than on the far side. This difference makes two <b>tidal bulges</b> in the ocean. As Earth turns, most coasts get about two high tides each day.",
    "Spring tides|🌕|At new moon and full moon the Sun, Earth and Moon line up. Their pulls add together. This gives the biggest tidal range: very high high tides and very low low tides. These are <b>spring tides</b> (the name has nothing to do with the season).",
    "Neap tides|🌓|At the first and third quarter moon the Sun and Moon pull at right angles. The pulls partly cancel, so the tidal range is smallest. These are <b>neap tides</b>."
  ], [
    "Tides are caused mainly by the gravity of the Moon and the...|Sun|🌊|Think of the bright star we orbit.|wind,magnetic field",
    "Spring tides happen at new moon and at...|full moon|🌕|The Sun Earth and Moon line up again.|first quarter,third quarter",
    "Neap tides have the...|smallest tidal range|🌓|The pulls partly cancel.|largest tidal range,no tidal range",
    "Most coasts have about how many high tides each day?|two|🌊|There are two tidal bulges.|one,four",
    "At first quarter moon the tides are...|neap|🌓|The Sun and Moon pull at right angles.|spring,absent",
    "The word 'spring' in spring tide refers to...|a big rise of water|⬆️|It is not about flowers or seasons.|the season of spring,a water source",
    "During a spring tide the Sun Earth and Moon are...|lined up|📏|They sit on one straight line.|at right angles,far apart",
    "The Moon affects tides more than the Sun because it is...|much closer|🌙|Gravity weakens quickly with distance.|much bigger,much hotter"
  ], "Think about when the Sun and Moon pull together or against each other."));
  a.push(L("Tidal locking", [
    "Same face always|🌙|The Moon spins once for each orbit of Earth, so we always see the same side. This is <b>tidal locking</b> (synchronous rotation). The far side gets sunlight too, so it is not truly 'dark'.",
    "How it happens|⚙️|Gravity raises tidal bulges on a body. Friction as the bulges move slows the body's spin until the spin period equals the orbital period. Most large moons are locked to their planets.",
    "Not always 1 : 1|🪐|Mercury is not locked. It spins three times for every two orbits of the Sun (a 3 : 2 spin-orbit resonance). Pluto and its moon Charon are locked to each other. Planets close to small red stars are likely to be locked."
  ], [
    "The Moon shows us the same face because its spin period equals its...|orbital period|🌙|It turns once per trip around Earth.|day length on Earth,year length on Earth",
    "This effect is called...|tidal locking|🔒|Tides slow the spin until it matches.|magnetic locking,solar locking",
    "The far side of the Moon is best called the...|far side|🌑|It gets sunlight too.|dark side,cold side",
    "What slows a moon's spin until it is locked?|tidal friction|⚙️|Moving bulges rub and lose energy.|solar wind,air resistance",
    "Mercury spins how many times per two orbits of the Sun?|three|☿️|It is a 3 : 2 pattern.|two,one",
    "Pluto and Charon are locked to...|each other|🔗|Both show one face to the other.|the Sun,Neptune",
    "Which planets are most likely to be tidally locked?|planets close to a small red star|🔴|Tides are strong when you are very close.|planets far from any star,gas giants only",
    "On a locked planet one side always faces...|its star|⭐|The same side points at the star.|away from space,the planet's core"
  ], "Think about how long one spin takes compared with one orbit."));
  a.push(L("Mass wasting", [
    "Downhill by gravity|⛰️|<b>Mass wasting</b> is the downhill movement of rock and soil by gravity. It happens without a river or glacier carrying it. Slopes fail when they are too steep (steeper than the <b>angle of repose</b>) or too weak.",
    "Kinds of movement|🪨|<b>Creep</b> is very slow. A <b>slump</b> moves as one curved block. A <b>rockfall</b> drops pieces fast. A <b>debris flow</b> or <b>mudflow</b> is a fast mix of water and soil.",
    "Triggers|🌧️|Heavy rain, earthquakes and cutting a slope can start a slide. Roots hold soil together, so cutting down trees on a hillside raises the risk."
  ], [
    "Mass wasting is moved downhill mainly by...|gravity|⛰️|It is the pull toward Earth.|wind,rivers",
    "The slowest kind of mass wasting is...|creep|🐌|Fence posts slowly tilt over years.|rockfall,debris flow",
    "A fast mix of water and soil is a...|debris flow|🌧️|It behaves almost like a river of mud.|creep,rockfall",
    "The steepest slope that loose material can hold is the angle of...|repose|📐|Its name means rest.|rise,reflection",
    "Which trigger adds water weight and weakens a slope?|heavy rain|🌧️|Think about soaked ground.|a sunny day,a mild breeze",
    "Cutting down trees on a hillside makes slides...|more likely|🌳|Roots helped hold the soil.|less likely,impossible",
    "A slump moves as...|one curved block|🥄|The ground slides along a curved surface.|tiny grains in the wind,a flowing river",
    "Shaking from an earthquake can cause...|landslides|🌍|Steep loose slopes are shaken loose.|auroras,tides"
  ], "Think about what pulls everything downhill."));
  a.push(L("Karst and caves", [
    "Rock that dissolves|💧|Rain absorbs carbon dioxide and becomes weak <b>carbonic acid</b>. This acid slowly dissolves <b>limestone</b> (calcium carbonate). Landscapes shaped this way are called <b>karst</b>.",
    "Karst features|🕳️|Water widens cracks into caves. Roofs can collapse to form <b>sinkholes</b>. Streams may vanish into the ground and appear again as springs.",
    "Cave decorations|🦇|Dripping water leaves calcite behind. <b>Stalactites</b> hang from the ceiling. <b>Stalagmites</b> grow up from the floor. They can join as a column."
  ], [
    "Karst forms mostly in which rock?|limestone|🪨|It is made of calcium carbonate.|granite,basalt",
    "The weak acid in rainwater is...|carbonic acid|💧|Carbon dioxide dissolves in the drops.|sulfuric acid,hydrochloric acid",
    "A hole made when a cave roof collapses is a...|sinkhole|🕳️|The ground sinks down.|crater,rift",
    "Cave formations that hang from the ceiling are...|stalactites|🦇|They hold tight to the top.|stalagmites,geodes",
    "Cave formations that grow up from the floor are...|stalagmites|🕯️|They might reach the ceiling.|stalactites,dunes",
    "The mineral left by dripping water in caves is...|calcite|💎|It is the mineral of limestone.|quartz,halite",
    "In karst areas streams often...|disappear underground|🌊|The rock has holes below.|freeze solid,flow uphill",
    "Karst landscapes are formed mainly by...|dissolving rock|🧪|Chemical weathering does the work.|glacier bulldozing,wind blasting"
  ], "Think about what weak acid does to limestone."));
  a.push(L("Tsunamis", [
    "Waves from the seafloor|🌊|A <b>tsunami</b> is a series of very long waves, usually caused by a sudden jolt of the seafloor, often at a subduction zone. Underwater landslides and volcanic eruptions can also cause one.",
    "Fast then tall|📈|In the deep ocean a tsunami travels as fast as a jet plane, about 700 km/h, but it is only about a meter high. Near shore the water gets shallow, the wave <b>slows down and grows taller</b>.",
    "Staying safe|🚨|Warning systems use seafloor pressure sensors and buoys. If the sea suddenly pulls back, or you feel a strong long earthquake near the coast, move to high ground at once. Waves may arrive many times over hours."
  ], [
    "Most tsunamis are caused by...|earthquakes under the sea|🌍|The seafloor suddenly moves.|tides,hurricanes",
    "In deep water a tsunami is...|fast and low|✈️|It is hard to notice from a ship.|slow and tall,slow and low",
    "Near the shore a tsunami...|slows and grows taller|📈|Shallow water squeezes the wave up.|speeds up and shrinks,stops moving",
    "The best action when the sea suddenly pulls back is to...|go to high ground|🏃|Put distance and height between you and the sea.|go swimming,wait on the beach",
    "A tsunami can be a series of...|many waves|🌊|The first is not always the biggest.|one wave only,a steady wind",
    "Deep-ocean tsunami speed is about as fast as a...|jet plane|✈️|Hundreds of kilometers per hour.|walking person,bicycle",
    "Which can also cause a tsunami?|an underwater landslide|⛰️|A sudden push on the water.|a calm breeze,a full moon",
    "Tsunami warning buoys measure changes in...|water pressure|📡|They sit on the seafloor.|rock color,star light"
  ], "Think about what happens to a long wave in shallow water."));
  a.push(L("Hurricane anatomy", [
    "Fuel from warm water|🌀|A hurricane (also called a typhoon or cyclone) needs sea water warmer than about 26 °C, moist air and light upper winds. It cannot form right on the equator because the Coriolis effect is zero there.",
    "Parts of the storm|👁️|Winds spiral in. The <b>eyewall</b> around the center has the strongest winds and rain. The <b>eye</b> in the middle is calm. In the northern hemisphere the storm spins counterclockwise.",
    "Strength and surge|📊|The <b>Saffir-Simpson scale</b> rates winds from category 1 to 5. The <b>storm surge</b>, a dome of sea water pushed ashore, is often the biggest danger. Storms weaken over land or cool water because they lose their heat fuel."
  ], [
    "A hurricane needs sea water warmer than about...|26 °C|🌡️|It is warm enough to feel like a tropical sea.|5 °C,15 °C",
    "The calm center of a hurricane is the...|eye|👁️|It is clear and quiet.|eyewall,rainband",
    "The strongest winds are in the...|eyewall|🌀|The ring around the center.|eye,outer edge",
    "The scale that rates hurricane winds is the...|Saffir-Simpson scale|📊|It has five categories.|Richter scale,Mohs scale",
    "A dome of sea water pushed ashore is a storm...|surge|🌊|Its name means a sudden rush.|shadow,front",
    "Hurricanes weaken over land because they lose...|their warm water fuel|🏝️|Heat from the sea feeds them.|their wind,their rotation direction",
    "In the northern hemisphere a hurricane spins...|counterclockwise|🔄|The Coriolis effect turns winds to the right.|clockwise,straight up",
    "Hurricanes cannot form on the equator because the Coriolis effect is...|zero|🧭|There is no spin to start a storm.|strongest,reversed"
  ], "Think about what fuels the storm and what weakens it."));
  a.push(L("Fronts and air masses", [
    "Air masses|🌬️|An <b>air mass</b> is a huge body of air with similar temperature and moisture, named for where it forms. <b>Continental polar</b> air is cold and dry. <b>Maritime tropical</b> air is warm and moist.",
    "Where they meet|🌡️|A <b>front</b> is the boundary between two air masses. At a <b>cold front</b> cold air pushes under warm air: steep clouds, heavy short showers, then cooler weather. At a <b>warm front</b> warm air slides up over cold air: gentle long rain.",
    "On weather maps|🗺️|Cold fronts are blue lines with triangles. Warm fronts are red lines with half circles. Low pressure brings rising air and clouds. High pressure brings sinking air and clear skies."
  ], [
    "A boundary between two air masses is a...|front|🌡️|It is like a battle line.|jet stream,monsoon",
    "A cold front often brings...|heavy short showers|⛈️|The cold air shoves warm air up quickly.|long gentle drizzle,weeks of calm",
    "A warm front often brings...|gentle long rain|🌦️|Warm air slides up a gentle slope.|sudden hail only,no clouds",
    "Cold dry air from over land far north is called...|continental polar|🥶|It forms over a cold continent.|maritime tropical,maritime polar",
    "Warm moist air that formed over a tropical ocean is...|maritime tropical|🌴|Maritime means from the sea.|continental polar,continental arctic",
    "On a weather map a cold front is drawn with...|blue triangles|🔺|Cold is blue.|red half circles,green dots",
    "High pressure usually brings...|clear skies|☀️|Air sinks and dries out.|stormy weather,rising air",
    "Low pressure usually brings...|clouds and rain|🌧️|Air rises and cools.|sinking air,clear dry weather"
  ], "Think about which air mass is moving into which."));
  a.push(L("Wetlands", [
    "Land with water|🌾|<b>Wetlands</b> are places where water covers the soil or stays near the surface for much of the year. Types include <b>marshes</b> (grasses), <b>swamps</b> (trees), <b>bogs</b> (peat and moss) and <b>mangroves</b> (salty coasts).",
    "Natural helpers|🧽|Wetlands act like sponges that soak up flood water. Plants and soil <b>filter pollution</b>. Peat wetlands store huge amounts of carbon. Many birds and fish use them as nurseries.",
    "Under threat|🚜|Over half of some regions' wetlands have been drained for farms and buildings. Mangroves also shield coasts from waves. Protecting wetlands saves money on floods and clean water."
  ], [
    "A wetland with mostly grasses is a...|marsh|🌾|It is open and grassy.|swamp,desert",
    "A wetland dominated by trees is a...|swamp|🌳|Think of cypress trees in water.|marsh,tundra",
    "Wetlands reduce floods by acting like...|sponges|🧽|They soak up extra water.|dams made of metal,funnels",
    "Peat wetlands store large amounts of...|carbon|⚫|Dead plants pile up unrotted.|helium,sand",
    "Mangroves grow along...|salty coasts|🌴|They like tides.|high mountains,dry deserts",
    "Wetland plants and soil help to...|filter pollution|💧|They clean the water that flows through.|add pollution,stop all rain",
    "A wetland of peat and moss is a...|bog|🟤|The ground is soft and spongy.|mangrove,marsh",
    "Draining wetlands for farms usually makes flooding...|worse|🚜|The sponge is gone.|better,impossible"
  ], "Think about what a sponge does with water."));
  a.push(L("Invasive species", [
    "Newcomers that harm|🦎|An <b>invasive species</b> is a non-native species that spreads and harms the places it enters. It often has no natural predators or diseases there to keep it in check.",
    "Famous cases|🌿|Kudzu vine smothers trees in the southern USA. Zebra mussels clog pipes in the Great Lakes. Cane toads spread across Australia. Lionfish crowd out reef fish in the Atlantic.",
    "How they travel|🚢|Ships carry them in <b>ballast water</b>. Pets, plants and firewood also move them. Stopping them early is cheaper than removing them later. Never release pets into the wild."
  ], [
    "A species that spreads and harms where it was brought is called...|invasive|🦎|It invades a new place.|endangered,extinct",
    "Invasive species often thrive because they lack...|natural predators|🛡️|Nothing keeps their numbers down.|food,sunlight",
    "Which plant smothers trees in the southern USA?|kudzu|🌿|It is a fast climbing vine.|oak,cactus",
    "Ships spread species in their...|ballast water|🚢|It is water carried deep in the hull for balance.|sails,anchor chains",
    "Zebra mussels cause problems by...|clogging pipes|🔧|They grow in huge numbers on hard surfaces.|eating clouds,making rain",
    "The cheapest way to handle invasives is...|stopping them early|⏱️|Catch the problem while it is small.|waiting until they spread,ignoring them",
    "Releasing an unwanted pet into the wild can...|start an invasion|🐠|It may survive and spread.|help nature always,clean the water",
    "Lionfish are an invasive problem in the...|Atlantic Ocean|🐟|They came from another ocean.|Arctic Ocean only,Dead Sea"
  ], "Think about what keeps a population in balance in its home."));
  a.push(L("Ecosystem services", [
    "Nature's gifts|🌳|<b>Ecosystem services</b> are the benefits people get from nature. Scientists group them: <b>provisioning</b> (food, water, wood), <b>regulating</b> (flood control, climate, clean air, pollination), <b>supporting</b> (soil formation, nutrient cycling) and <b>cultural</b> (recreation, beauty).",
    "A real example|🐝|Bees and other insects pollinate many crops. Doing this by hand would cost billions of dollars. Wetlands clean water for free that a plant would otherwise have to clean.",
    "Why count them?|💰|Putting a value on services helps leaders see the cost of losing a forest or a reef. But some things, like beauty, are hard to measure."
  ], [
    "Benefits that people get from nature are called ecosystem...|services|🌳|They are help, not products in a shop.|mistakes,layers",
    "Food and fresh water are which type of service?|provisioning|🍎|They are supplied to us directly.|regulating,cultural",
    "Flood control and pollination are which type?|regulating|🐝|Nature keeps things in balance.|provisioning,cultural",
    "Hiking and beautiful views are which type?|cultural|🥾|They enrich our lives.|supporting,provisioning",
    "Soil formation and nutrient cycling are which type?|supporting|🌱|They underlie all the others.|cultural,provisioning",
    "Pollination by bees is valuable because it helps grow...|crops|🌻|Flowers must be pollinated to make fruit.|rocks,tides",
    "Wetlands cleaning water is an example of...|a free service|💧|Nature does the work for us.|a mistake,a hazard",
    "Giving a money value to nature helps leaders...|compare costs of losing it|📊|It shows what is at stake.|ignore forests,end all farming"
  ], "Think about the kind of help nature gives us."));
  a.push(L("Plastic in the ocean", [
    "Plastic lasts|🧴|Plastic does not rot. Sunlight and waves break it into tiny pieces under 5 mm called <b>microplastics</b>. Most ocean plastic starts on land and is carried by rivers and wind.",
    "Garbage patches|🌀|Ocean gyres gather floating plastic. The Great Pacific Garbage Patch is a huge area with many small pieces, more like a thin soup than an island you can walk on.",
    "What helps|♻️|Reduce, reuse and recycle. Better waste collection, refillable bottles and fewer single-use items cut the flow. Only a small share of all plastic ever made has been recycled."
  ], [
    "Plastic pieces smaller than 5 mm are called...|microplastics|🔬|The word micro means tiny.|megaplastics,nanoplanets",
    "Most ocean plastic comes from...|land|🏞️|Rivers and wind carry it.|deep volcanoes,the Moon",
    "Ocean gyres collect floating plastic because they...|circle slowly|🌀|Water spirals in toward the middle.|are very cold,have no water",
    "The Great Pacific Garbage Patch is best described as...|a thin soup of pieces|🍲|It is spread out and mostly small.|a solid island,a floating city",
    "Plastic does not rot, so it...|lasts a very long time|⏳|Nothing easily digests it.|vanishes in days,turns to water",
    "Which action lowers plastic waste?|refillable bottles|🚰|Use items again and again.|more single-use cups,burning in open air",
    "Plastics are mostly made from...|fossil fuels|🛢️|They come from oil and gas.|sea salt,sand",
    "The three Rs begin with reduce reuse and...|recycle|♻️|Turn old items into new ones.|remove,rebuild"
  ], "Think about where the plastic starts and where it ends up."));
  a.push(L("Ecological footprint", [
    "A footprint of land|👣|The <b>ecological footprint</b> is the area of land and sea needed to supply what a person or country uses and to absorb its waste. <b>Biocapacity</b> is how much nature can renew each year.",
    "Overshoot|📆|When humanity uses more than Earth can renew, we are in <b>overshoot</b>. <b>Earth Overshoot Day</b> is the date each year when we have used a full year's worth of renewable resources. It now falls well before the end of the year.",
    "Three levers|⚖️|Impact depends on <b>population</b>, <b>affluence</b> (how much each person consumes) and <b>technology</b> (how clean the methods are). Footprints differ greatly between countries."
  ], [
    "The area needed to supply what we use and absorb our waste is the ecological...|footprint|👣|It is like a mark we leave on Earth.|handprint,horizon",
    "What nature can renew each year is its...|biocapacity|🌱|Think of nature's yearly budget.|overshoot,footprint",
    "Using more than Earth can renew is called...|overshoot|📈|Past the limit.|undershoot,balance",
    "Earth Overshoot Day falls...|before the end of the year|📆|We use up the budget early.|exactly on December 31,never",
    "Which is part of the I = P × A × T idea?|affluence|💵|It means how much each person consumes.|volcanism,gravity",
    "Cleaner technology usually makes the footprint...|smaller|⚙️|Less waste per item.|larger,identical",
    "A larger population with the same habits makes impact...|larger|👥|More people use more.|smaller,zero",
    "Footprints per person differ between countries because of...|different lifestyles|🌍|People consume different amounts.|different moon phases,different time zones"
  ], "Think about what you take and what you give back to nature."));
  a.push(L("Nuclear energy", [
    "Splitting atoms|⚛️|In <b>nuclear fission</b> a neutron splits a uranium-235 nucleus, releasing heat and more neutrons. These cause a <b>chain reaction</b>. The heat makes steam that spins a turbine to make electricity.",
    "Good and hard parts|🏭|Nuclear plants release almost no carbon dioxide while running and make steady power. But the spent fuel stays <b>radioactive</b> for a very long time and needs safe storage. Uranium is mined, so it is not renewable.",
    "Fission vs fusion|☀️|<b>Fusion</b> joins small nuclei, as in the Sun. It makes little long-lived waste but needs extreme heat and has not yet produced steady electricity for the grid."
  ], [
    "Splitting a heavy nucleus is called...|fission|⚛️|Think of cutting into pieces.|fusion,combustion",
    "A common fuel for fission is...|uranium|🪨|It is a heavy radioactive metal.|coal,helium",
    "Joining small nuclei is called...|fusion|☀️|It powers the Sun.|fission,erosion",
    "Control rods in a reactor...|absorb neutrons|🔧|They slow the reaction down.|make more neutrons,cool the Sun",
    "A nuclear plant while running releases almost no...|carbon dioxide|💨|It does not burn fuel.|heat,steam",
    "A main challenge of fission is storing...|radioactive waste|☢️|It stays harmful for a long time.|clean steam,fresh water",
    "Fission heat is used to make...|steam|♨️|Steam spins the turbine.|lightning,wind",
    "Uranium is considered...|non-renewable|⛏️|There is only so much to mine.|renewable,infinite"
  ], "Think about what is split and what is joined."));
  a.push(L("Storing energy and the grid", [
    "Matching supply and demand|🔌|An electric <b>grid</b> must make exactly as much power as people use at each moment. Solar works only in daylight and wind varies. This is called <b>intermittency</b>.",
    "Storage|🔋|<b>Batteries</b> such as lithium-ion store extra power for quick use. <b>Pumped hydro</b> pumps water uphill when power is cheap and lets it fall through turbines when needed, and it is the biggest type of storage worldwide.",
    "Smarter use|💡|Better <b>efficiency</b> (LED bulbs, insulation, heat pumps) lowers demand. A <b>smart grid</b> shifts use to times when power is plentiful."
  ], [
    "Solar and wind power vary over time. This is called...|intermittency|☁️|It means on and off.|baseload,inertia",
    "Pumping water uphill to store energy is called...|pumped hydro|💧|It uses falling water later.|solar farming,geothermal",
    "Which battery type is common in phones and electric cars?|lithium-ion|🔋|It is named for a light metal.|lead-free paper,copper-wire",
    "An LED bulb saves energy because it is...|more efficient|💡|It wastes less as heat.|brighter than the Sun,always off",
    "A grid must always match supply with...|demand|⚖️|It is what people use.|weather,tides",
    "A smart grid can shift use to times when power is...|plentiful|🧠|When a lot is available.|scarce,missing",
    "Insulating a house reduces the need for...|heating|🏠|Heat stays inside.|gravity,rain",
    "Pumped hydro releases energy when water...|flows downhill through turbines|🌊|Falling water spins them.|is pumped up the hill,freezes"
  ], "Think about saving extra energy for later."));
  a.push(L("Solar and lunar eclipses", [
    "Shadows in space|🌑|A <b>solar eclipse</b> happens at new moon when the Moon passes between the Sun and Earth. A <b>lunar eclipse</b> happens at full moon when Earth's shadow falls on the Moon.",
    "Not every month|📐|The Moon's orbit is tilted about 5° to Earth's orbit, so most months the Moon passes above or below the line. Eclipses happen only near the two <b>nodes</b> where the orbits cross. The darkest part of a shadow is the <b>umbra</b>; the lighter part is the <b>penumbra</b>.",
    "Safe viewing|🕶️|Never look at the Sun without proper eclipse glasses. A lunar eclipse is safe to watch. The Moon often looks reddish because Earth's air bends red light onto it. When the Moon is farther away it looks too small to cover the Sun, giving a ring-shaped <b>annular</b> eclipse."
  ], [
    "A solar eclipse happens at which moon phase?|new moon|🌑|The Moon is between us and the Sun.|full moon,first quarter",
    "A lunar eclipse happens at which moon phase?|full moon|🌕|Earth lies between the Sun and Moon.|new moon,third quarter",
    "The darkest part of a shadow is the...|umbra|⚫|It is the full shadow.|penumbra,corona",
    "Eclipses do not happen every month because the Moon's orbit is...|tilted|📐|It leans by about 5 degrees.|too small,perfectly flat",
    "A ring-shaped solar eclipse is called...|annular|⭕|Its name comes from a word for ring.|total,partial",
    "A reddish Moon in a lunar eclipse is caused by...|Earth's air bending red light|🌍|The air filters sunlight.|Moon dust burning,fires on the Moon",
    "Which eclipse is safe to look at with no special glasses?|lunar|🌕|It is only dim moonlight.|solar,annular",
    "The points where the Moon's orbit crosses Earth's are called...|nodes|✖️|Eclipses happen near them.|poles,gyres"
  ], "Think about which body is in the middle."));
  a.push(L("Comets", [
    "Dirty snowballs|☄️|A <b>comet</b> is a small body of ice, dust and rock a few kilometers wide. Near the Sun the ice turns to gas, forming a glowing <b>coma</b> and long tails.",
    "Two tails|✨|A comet has a <b>dust tail</b> and a blue <b>ion tail</b>. Both point <b>away from the Sun</b>, pushed by sunlight and the solar wind, even when the comet is moving away.",
    "Home of comets|🏠|Short-period comets come from the <b>Kuiper belt</b> beyond Neptune. Long-period comets come from the huge, distant <b>Oort cloud</b>. Halley's Comet returns about every 76 years. Meteor showers happen when Earth crosses a comet's trail of dust."
  ], [
    "A comet is mostly made of ice dust and...|rock|☄️|It is a mix of frozen and solid material.|iron only,gas only",
    "A comet's tail always points...|away from the Sun|☀️|Sunlight and solar wind push it.|toward the Sun,behind its motion",
    "The glowing cloud around a comet's nucleus is the...|coma|✨|It is like a fuzzy head.|crater,corona",
    "Short-period comets come from the...|Kuiper belt|🔵|It lies just beyond Neptune.|Oort cloud,asteroid belt",
    "The distant spherical source of long-period comets is the...|Oort cloud|☁️|It is far beyond the planets.|Kuiper belt,asteroid belt",
    "Halley's Comet returns about every...|76 years|🕰️|It is about a human lifetime.|7 years,760 years",
    "Meteor showers are made when Earth crosses...|a comet's dust trail|🌠|Bits of dust burn up in the air.|a planet's ring,a black hole",
    "A comet's tail grows when it is near the...|Sun|☀️|Heat turns ice to gas.|Moon,Kuiper belt"
  ], "Think about what the Sun does to a snowball."));
  a.push(L("Mars geology", [
    "A cold red desert|🔴|Mars is red because of <b>iron oxide</b>, or rust, in its dust. Its air is very thin, about 1% of Earth's pressure, and mostly carbon dioxide. Gravity is about 38% of Earth's.",
    "Giant landforms|🌋|Mars has no active plate tectonics, so volcanoes keep growing in one place. <b>Olympus Mons</b> is the largest volcano in the solar system, about 22 km high. <b>Valles Marineris</b> is a canyon system about 4,000 km long.",
    "Water in the past|💧|Dry river valleys and the delta in Jezero crater show that liquid water once flowed on Mars. Water ice is still found at the poles and under the ground. Rovers like Curiosity and Perseverance study the rocks."
  ], [
    "Mars looks red because of...|iron oxide|🔴|It is rust.|sulfur fire,red water",
    "The largest volcano in the solar system is...|Olympus Mons|🌋|It is on Mars.|Mauna Loa,Mount Etna",
    "The long canyon system on Mars is...|Valles Marineris|🏜️|Its name means Mariner Valleys.|Grand Canyon,Mariana Trench",
    "The air on Mars is mostly...|carbon dioxide|💨|It is the gas Venus also has a lot of.|oxygen,nitrogen only",
    "Mars volcanoes grow so large because there is no...|plate tectonics|🌍|The crust stays over one hot spot.|gravity,sunlight",
    "The delta in Jezero crater is evidence of past...|liquid water|💧|Rivers once flowed there.|lava,wind storms",
    "Today water on Mars is found mostly as...|ice|🧊|It is frozen at the poles.|ocean waves,rain",
    "Gravity on Mars compared with Earth is...|about 38% as strong|⚖️|It is lighter than Earth's.|twice as strong,the same"
  ], "Think about the colors and landforms of the red planet."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[8], a[9], a[10], a[12], a[13], a[14], a[15], a[17]]));
  a.push(MIX("Level 22 Challenge", [a[1], a[2], a[4], a[5], a[6], a[7], a[8], a[9], a[11], a[13], a[14], a[15], a[16], a[17], a[0]]));


  // ================= LEVEL 23 =================
  const b = [];
  b.push(L("Blackbody radiation", [
    "Everything glows|🔥|Every object gives off radiation because of its temperature. A perfect emitter is called a <b>blackbody</b>. Stars and planets are close to blackbodies.",
    "Two laws|📈|<b>Stefan-Boltzmann law</b>: the power given off per square meter grows with the <b>fourth power</b> of the temperature. Doubling the temperature in kelvin gives 16 times the power. <b>Wien's law</b>: hotter objects peak at a <b>shorter wavelength</b>.",
    "Sun and Earth|☀️|The Sun (about 5,800 K) peaks in visible light. Earth (about 288 K) is much cooler and peaks in the <b>infrared</b>. That is why Earth sends out heat we cannot see."
  ], [
    "Hotter objects peak at what kind of wavelength?|shorter|🔥|Hot things shift toward blue.|longer,the same",
    "If the temperature in kelvin doubles the power output grows by...|16 times|📈|It depends on the fourth power.|2 times,4 times",
    "The Sun's radiation peaks mostly in...|visible light|☀️|It is the light we see.|radio waves,gamma rays",
    "Earth's own radiation peaks in the...|infrared|🌍|A cool object gives off heat radiation.|ultraviolet,visible light",
    "A perfect emitter and absorber of radiation is called a...|blackbody|⚫|The name tells its color.|whitebody,graybox",
    "Wien's law links temperature to the...|peak wavelength|📏|It tells which wavelength is brightest.|number of moons,rotation speed",
    "A star at 11,600 K compared with one at 5,800 K peaks at a...|shorter wavelength|⭐|Doubling temperature halves the wavelength.|longer wavelength,same wavelength",
    "The Stefan-Boltzmann law says power depends on temperature to the power of...|four|4️⃣|It is a high power of the temperature.|one,two"
  ], "Think about how heat and color of glowing things are related."));
  b.push(L("A planet's equilibrium temperature", [
    "Balance of energy|⚖️|A planet warms until the energy it radiates equals the energy it absorbs. For Earth, absorbed sunlight alone would set a temperature near −18 °C (255 K).",
    "Greenhouse boost|🌡️|Earth's real average is about 15 °C (288 K). The difference of about <b>33 °C</b> is the natural <b>greenhouse effect</b>, made mostly by water vapor, carbon dioxide and methane.",
    "Other worlds|🪐|Venus has a very thick carbon dioxide atmosphere and averages about 460 °C, hotter than Mercury, even though it is farther from the Sun. Mars has a thin atmosphere and a weak greenhouse effect."
  ], [
    "Without a greenhouse effect Earth's average would be about...|−18 °C|🥶|Well below freezing.|15 °C,50 °C",
    "Earth's real average temperature is about...|15 °C|🌍|A mild temperature.|−18 °C,100 °C",
    "The natural greenhouse effect warms Earth by about...|33 °C|🌡️|More than thirty degrees.|3 °C,333 °C",
    "A planet reaches balance when energy absorbed equals energy...|radiated|⚖️|What goes out.|created,stored forever",
    "Which planet is the hottest in the solar system?|Venus|🪐|It has a thick carbon dioxide blanket.|Mercury,Mars",
    "Venus is hotter than Mercury because of its...|thick atmosphere|☁️|Its gas traps heat.|size,tilt",
    "Which gas is a major natural greenhouse gas?|water vapor|💧|It is also the gas in clouds.|argon,helium",
    "Mars has a weak greenhouse effect because its air is...|thin|💨|There are few molecules to trap heat.|very thick,full of oxygen"
  ], "Think about what the atmosphere does to outgoing heat."));
  b.push(L("Zircons and the oldest crust", [
    "Tiny time capsules|💎|<b>Zircon</b> crystals are very hard and survive erosion and melting. When they form they take in uranium but almost no lead, so any lead inside came from uranium decay.",
    "U-Pb clocks|⏰|Uranium-238 decays to lead-206 with a half-life of about 4.5 billion years. Measuring the lead to uranium ratio gives the crystal's age. Two decay chains give a built-in cross-check.",
    "Oldest finds|🌏|Zircons from Jack Hills, Australia are about 4.4 billion years old, the oldest Earth material found. The oldest intact rocks are about 4 billion years old. Earth itself is about 4.54 billion years old, from meteorites."
  ], [
    "A very durable mineral used for dating old rocks is...|zircon|💎|Its name starts with Z.|talc,gypsum",
    "When zircon forms it takes in uranium but almost no...|lead|⚖️|It is a heavy gray metal.|iron,silicon",
    "Uranium-238 decays eventually to...|lead-206|☢️|A stable heavy metal.|carbon-14,potassium-40",
    "Earth's age is about...|4.54 billion years|🌍|Between four and five billion.|454 million years,45 billion years",
    "The oldest zircons found are about...|4.4 billion years old|🕰️|Almost as old as Earth.|400 million years old,40 million years old",
    "Zircon dating is called the U-Pb method. Pb is the symbol for...|lead|🔤|It comes from a Latin name.|potassium,lithium",
    "The more lead compared with uranium in a zircon, the...|older it is|📈|More time for decay.|younger it is,wetter it is",
    "Earth's age was found from the dating of...|meteorites|☄️|They are leftovers from the early solar system.|ocean water,clouds"
  ], "Think about which atoms a crystal takes in when it forms."));
  b.push(L("Bowen's reaction series", [
    "Order of crystals|🌋|As magma cools, different minerals crystallize at different temperatures. <b>Bowen's reaction series</b> shows the order. High temperature first: <b>olivine</b> and calcium-rich plagioclase. Lower: pyroxene, amphibole, biotite.",
    "Last to form|🪨|At the lowest temperatures come sodium-rich plagioclase, potassium feldspar, muscovite and finally <b>quartz</b>. Early minerals are dark and low in silica; late ones are light and rich in silica.",
    "Why it matters|🔬|When early crystals settle out, the leftover melt becomes richer in silica. This is <b>fractional crystallization</b>. Minerals that form hot are less stable at the surface, so olivine weathers fast and quartz weathers slowly."
  ], [
    "Which mineral crystallizes first from cooling magma?|olivine|🟢|It is green and forms at high temperature.|quartz,muscovite",
    "Which mineral crystallizes last?|quartz|⚪|It forms at the lowest temperature.|olivine,pyroxene",
    "Removing early crystals from a melt is called...|fractional crystallization|⚗️|Pieces of the melt come out in steps.|partial melting,metamorphism",
    "As early crystals settle out the leftover melt gets richer in...|silica|🪨|The silicon dioxide builds up.|iron,calcium",
    "Which weathers faster at the surface?|olivine|🟢|It formed far from surface conditions.|quartz,zircon",
    "High-temperature minerals are usually...|dark and low in silica|⚫|Think of basalt.|light and high in silica,white and glassy",
    "The series is named for...|a scientist who studied it|📚|It is a person's name.|a mountain,a mineral color",
    "Minerals that form at high temperature are generally...|less stable at Earth's surface|🌧️|Surface conditions are far cooler.|more stable at the surface,unchanged by water"
  ], "Think about hot minerals versus cool minerals as magma cools."));
  b.push(L("Porosity and permeability", [
    "Holes and flow|💧|<b>Porosity</b> is the share of a rock or soil that is empty space. <b>Permeability</b> is how easily fluids can flow through connected pores.",
    "Not the same|🧽|Clay can have high porosity but very low permeability, because its pores are tiny and poorly connected. Sand and gravel have both high porosity and high permeability. Solid granite has low porosity and low permeability.",
    "Why we care|🛢️|A rock layer that holds and passes water well is an <b>aquifer</b>. Oil and gas also need porous, permeable rock (like sandstone) to collect and be pumped out."
  ], [
    "The share of a rock that is empty space is its...|porosity|🕳️|Think of pores.|permeability,density",
    "How easily fluids flow through a rock is its...|permeability|💧|It is about connections between holes.|porosity,hardness",
    "A layer that stores and carries useful groundwater is an...|aquifer|🚰|The word comes from water and carry.|aquiclude,aqueduct",
    "Which material has high permeability?|gravel|🪨|Big connected gaps.|clay,solid granite",
    "Clay has high porosity but...|low permeability|🧱|The tiny pores block flow.|high permeability,no pores at all",
    "Solid granite has...|low porosity|🏔️|Few holes.|high porosity,unlimited permeability",
    "Well-sorted sand usually has...|more porosity|⏳|Grains of one size leave more gaps.|less porosity,no water at all",
    "A good oil reservoir rock is...|sandstone|🛢️|Its grains leave gaps.|obsidian,granite"
  ], "Think about space inside the rock and how connected it is."));
  b.push(L("Oil and gas traps", [
    "From plankton to oil|🛢️|Oil and gas formed from the remains of tiny sea life buried in mud. Heat and pressure over millions of years changed it. The <b>source rock</b> is usually organic-rich shale.",
    "Moving up|⬆️|Oil and gas are lighter than water, so they move up through <b>reservoir rock</b>, such as sandstone, until blocked by a <b>seal</b> or <b>cap rock</b> like shale or salt. This blocked place is a <b>trap</b>.",
    "Kinds of trap|🔍|An upward fold called an <b>anticline</b> can make a trap. So can a fault. In a trap, gas sits on top, then oil, then water below."
  ], [
    "Oil formed mostly from the remains of tiny...|sea life|🌊|Plankton and algae.|dinosaur eggs only,volcano rock",
    "Rock where oil first formed is the...|source rock|⚫|It is where oil is born.|cap rock,seal",
    "Oil collects in a porous layer called the...|reservoir rock|🏺|It holds the oil.|source rock,bedrock only",
    "A blocking layer above the oil is a...|seal|🔒|It stops upward flow.|reservoir,source",
    "An upward fold that can trap oil is an...|anticline|🌋|It looks like an arch.|syncline,sinkhole",
    "In a trap the order from top to bottom is gas then oil then...|water|💧|The heaviest liquid.|rock salt,mercury",
    "Oil moves upward because it is...|less dense than water|⚖️|It floats.|heavier than water,magnetic",
    "Which rock is a common seal?|shale|🧱|Its tiny grains block flow.|gravel,sandstone"
  ], "Think about where oil is formed, where it travels and where it stops."));
  b.push(L("Mass extinctions", [
    "The Big Five|🦕|Earth has had five major <b>mass extinctions</b>, when many species vanished in a short time (geologically). They happened about 445, 375, 252, 201 and 66 million years ago.",
    "Worst and best known|🌋|The end-Permian event, about 252 million years ago, killed around 90% of marine species. Huge volcanic eruptions in Siberia (the Siberian Traps) are the likely cause. The end-Cretaceous event, 66 million years ago, ended the non-bird dinosaurs.",
    "Evidence|☄️|At the end of the Cretaceous an asteroid hit near Chicxulub in Mexico. A thin clay layer worldwide is rich in <b>iridium</b>, a metal common in asteroids. Life recovers, but takes millions of years."
  ], [
    "How many 'Big Five' mass extinctions are known?|five|5️⃣|The name tells you.|three,ten",
    "The biggest mass extinction was at the end of the...|Permian|🌋|About 252 million years ago.|Cretaceous,Ordovician",
    "The likely cause of the end-Permian event was huge...|volcanic eruptions|🌋|They released large amounts of gas.|ice storms,asteroids from Mars",
    "The end-Cretaceous crater is near...|Chicxulub|☄️|It is in Mexico.|Mount Fuji,Paris",
    "A metal rich layer linked to the asteroid impact is...|iridium|⚪|It is rare in Earth's crust.|gold,copper",
    "The end-Cretaceous extinction ended the...|non-bird dinosaurs|🦖|They disappeared 66 million years ago.|first mammals,all plants",
    "The end-Permian event killed about what share of marine species?|90%|📉|Nearly all.|9%,30%",
    "After a mass extinction life usually recovers over...|millions of years|⏳|It is slow.|a few days,one week"
  ], "Think about when and why many species disappear at once."));
  b.push(L("Oxygen and Snowball Earth", [
    "The oxygen revolution|🫧|About 2.4 billion years ago, <b>cyanobacteria</b> filled the air with oxygen through photosynthesis (the <b>Great Oxidation Event</b>). First the oxygen reacted with iron in the oceans, making rust-colored layers called <b>banded iron formations</b>.",
    "Cold times|🧊|About 720 to 635 million years ago, glaciers may have reached near the equator in a 'Snowball Earth'. Ice reflected sunlight, which cooled Earth even more (the ice-albedo feedback).",
    "The way out|🌋|Volcanoes kept adding carbon dioxide. With no way to remove it under the ice, it built up until the greenhouse effect melted the ice."
  ], [
    "Oxygen first rose in the air because of...|cyanobacteria|🦠|Tiny photosynthesizers.|dinosaurs,volcanoes",
    "The big rise in oxygen is called the Great...|Oxidation Event|🫧|Oxygen can oxidize things.|Ice Age,Collision",
    "Rust-colored rock layers formed from iron and oxygen are...|banded iron formations|🟤|They have stripes.|coral reefs,salt flats",
    "The Great Oxidation Event was about...|2.4 billion years ago|⏳|Very early in Earth's history.|240 million years ago,24 thousand years ago",
    "Snowball Earth glaciers may have reached the...|equator|🧊|Even tropical land was icy.|poles only,Moon",
    "A feedback that kept the cold going was ice...|reflecting sunlight|☀️|White ice has a high albedo.|absorbing sunlight,making CO₂",
    "What eventually melted Snowball Earth?|carbon dioxide from volcanoes|🌋|It built up and warmed the air.|a brighter Moon,more snow",
    "Oxygen is made by photosynthesis from carbon dioxide and...|water|💧|The other raw material.|nitrogen,helium"
  ], "Think about what early life added to the air."));
  b.push(L("Warm spells and cooling", [
    "A fast warming|🔥|About 56 million years ago a huge release of carbon caused the <b>PETM</b> (Paleocene-Eocene Thermal Maximum). Global temperature rose by about 5 °C or more over several thousand years. Deep oceans became acidic and many seafloor species died out.",
    "Cooling down|❄️|Over the last 50 million years carbon dioxide slowly fell and Earth cooled. Antarctica grew its ice sheet about 34 million years ago. Ice sheets began to grow in the north about 2.6 million years ago.",
    "Today vs then|⏱️|The PETM carbon release took thousands of years. Humans are releasing carbon much faster, which gives life less time to adapt."
  ], [
    "The PETM was about how long ago?|56 million years|🕰️|In the Paleogene.|5.6 thousand years,560 million years",
    "During the PETM global temperature rose by about...|5 °C or more|🌡️|A big jump.|0.1 °C,50 °C",
    "The oceans in the PETM became more...|acidic|🧪|Extra carbon dioxide dissolved.|basic like soap,frozen",
    "Antarctica's ice sheet grew about...|34 million years ago|🧊|In the Eocene-Oligocene boundary.|3.4 thousand years ago,340 million years ago",
    "Over the last 50 million years carbon dioxide levels mostly...|fell|📉|The planet cooled.|rose,stayed steady",
    "Northern ice sheets began to grow about...|2.6 million years ago|🌍|This starts the ice age cycles.|26 years ago,260 million years ago",
    "Compared with the PETM today's carbon release is...|much faster|⚡|There is less time for life to adapt.|much slower,exactly equal",
    "PETM stands for Paleocene-Eocene Thermal...|Maximum|🔥|The warmest point.|Minimum,Mirror"
  ], "Think about how warm Earth was and how fast it changed."));
  b.push(L("Hydrographs and river discharge", [
    "How much water flows|🌊|<b>Discharge</b> is the volume of water passing a point each second, in m³/s. Discharge = width × depth × speed. A channel 10 m wide, 2 m deep with water moving 1.5 m/s carries 30 m³/s.",
    "Hydrographs|📈|A <b>hydrograph</b> graphs discharge over time. After rain the river rises to a <b>peak flow</b>. The delay between peak rain and peak river is the <b>lag time</b>. Between storms, groundwater feeds the <b>baseflow</b>.",
    "Cities change it|🏙️|Pavement lets less water soak in, so cities have a <b>shorter lag time</b> and a <b>higher peak</b>. Forests and wetlands soak up water and flatten the peak."
  ], [
    "A graph of river discharge over time is a...|hydrograph|📈|Hydro means water.|histogram,topograph",
    "Discharge is usually measured in...|cubic meters per second|📏|A volume per time.|meters per degree,kilograms",
    "A river 5 m wide 2 m deep moving 2 m/s has a discharge of...|20 m³/s|🌊|Multiply all three numbers.|10 m³/s,9 m³/s",
    "The delay between peak rainfall and peak river flow is the...|lag time|⏱️|Water takes time to reach the river.|baseflow,peak flow",
    "The groundwater feeding a river between storms is the...|baseflow|💧|It is the steady background flow.|peak flow,lag",
    "In cities the lag time is usually...|shorter|🏙️|Water runs fast over pavement.|longer,unchanged",
    "Cities usually make flood peaks...|higher|📈|More runoff arrives quickly.|lower,disappear",
    "Which land cover flattens the hydrograph peak?|forest|🌲|Soil and roots soak up rain.|parking lots,bare pavement"
  ], "Think about how fast rain reaches the river."));
  b.push(L("Groundwater contamination", [
    "Hidden pollution|🧪|Groundwater can be polluted by leaking fuel tanks, landfills, septic systems, fertilizer (<b>nitrate</b>) and road salt. Some water also has natural poisons such as arsenic from rock.",
    "Plumes|🌫️|Pollution forms a <b>plume</b> that spreads in the direction the groundwater flows. Groundwater moves slowly, often centimeters to meters per day, so a problem can take years to show and decades to clean.",
    "Protection|🛡️|Keep waste away from <b>recharge areas</b>, test wells regularly and seal old wells. Sandy, permeable soil lets pollution travel quickly. Clay slows it down."
  ], [
    "A spreading cloud of pollution in groundwater is a...|plume|🌫️|It stretches out downstream.|crater,delta",
    "Fertilizer in groundwater often adds...|nitrate|🌾|A form of nitrogen.|helium,chlorine gas",
    "Groundwater moves...|slowly|🐌|Often only centimeters a day.|faster than rivers,at the speed of sound",
    "Cleaning polluted groundwater usually takes...|many years|⏳|It is hard to reach.|a few minutes,one afternoon",
    "A natural groundwater poison from some rocks is...|arsenic|☠️|A toxic element.|oxygen,calcium",
    "Which soil lets pollution travel fastest?|sandy soil|🏖️|It is very permeable.|thick clay,solid rock",
    "A leaking underground fuel tank is a...|source of contamination|⛽|It puts chemicals into the ground.|natural filter,rain gauge",
    "Keeping waste away from recharge areas helps...|protect groundwater|🛡️|Recharge areas feed the aquifer.|speed up pollution,dry up springs"
  ], "Think about how pollution moves with slow underground water."));
  b.push(L("The ocean's biological pump", [
    "Plankton pull in carbon|🦠|Tiny <b>phytoplankton</b> near the surface use sunlight and carbon dioxide to grow. They make about half of Earth's photosynthesis.",
    "Sinking carbon|❄️|When plankton and animals die, or make waste, bits sink as <b>marine snow</b>. This moves carbon to the deep ocean where it can stay for centuries. This is the <b>biological pump</b>.",
    "Limits|🔩|In some areas nutrients like iron are scarce, which limits plankton. Cold water also holds more CO₂ and sinks, a related process called the <b>solubility pump</b>."
  ], [
    "Tiny photosynthesizing ocean organisms are called...|phytoplankton|🦠|They float and photosynthesize.|zooplankton,whales",
    "Sinking bits of dead plankton are called marine...|snow|❄️|They look like falling flakes.|rain,sand",
    "The biological pump moves carbon to the...|deep ocean|⬇️|Far below the surface.|upper atmosphere,Moon",
    "Phytoplankton take in which gas?|carbon dioxide|💨|The gas in photosynthesis.|helium,methane",
    "A nutrient that limits plankton in some regions is...|iron|🔩|A metal in tiny amounts.|sugar,sodium chloride",
    "Cold water holds more CO₂ because gases dissolve better in...|cold water|🥶|Think of a cold soda staying fizzy.|hot water,dry air",
    "Carbon in deep water can stay for...|centuries|⏳|A very long time.|a few minutes,one day",
    "Plankton produce about what share of Earth's photosynthesis?|half|🌍|A big share.|1%,all of it"
  ], "Think about what happens to plankton when they die."));
  b.push(L("Climate sensitivity", [
    "A doubling test|🌡️|<b>Climate sensitivity</b> is how much Earth warms when carbon dioxide doubles from pre-industrial levels (about 280 ppm to 560 ppm) and the climate settles.",
    "Feedbacks|🔁|Without feedbacks, doubling CO₂ gives about 1.2 °C. But warmer air holds more water vapor, a greenhouse gas, and melting ice reflects less light. These <b>positive feedbacks</b> raise the total.",
    "Best estimate|📊|Scientists estimate a likely range of about 2.5 to 4 °C, with a best estimate near 3 °C. Clouds are the biggest uncertainty because they can both cool and warm."
  ], [
    "Climate sensitivity asks about warming from a doubling of...|carbon dioxide|🌡️|The main greenhouse gas we add.|oxygen,nitrogen",
    "Pre-industrial CO₂ was about...|280 ppm|📊|Under three hundred.|28 ppm,2800 ppm",
    "Warming from doubled CO₂ without feedbacks is about...|1.2 °C|🌡️|A little over one degree.|12 °C,0.01 °C",
    "The best estimate of sensitivity is about...|3 °C|📈|Between 2.5 and 4.|0.3 °C,30 °C",
    "Warmer air holds more...|water vapor|💧|A greenhouse gas that amplifies warming.|oxygen,argon",
    "Melting ice makes Earth absorb more sunlight. This is a...|positive feedback|🔁|It increases the original change.|negative feedback,no feedback",
    "The biggest uncertainty in sensitivity comes from...|clouds|☁️|They can cool and warm.|tides,volcanic rock",
    "Doubling CO₂ from 280 ppm gives...|560 ppm|2️⃣|Twice 280.|140 ppm,840 ppm"
  ], "Think about what happens when CO₂ doubles and the climate settles."));
  b.push(L("Carbon pricing and net zero", [
    "Putting a price on carbon|💰|A <b>carbon tax</b> charges for each ton of CO₂ released. <b>Cap-and-trade</b> sets a limit on total emissions and lets companies trade permits. Both make pollution cost something.",
    "Net zero|⚖️|<b>Net zero</b> means emissions added to the air are balanced by amounts removed. To limit warming, emissions must fall fast first; removal can only cover what cannot be cut.",
    "Paris Agreement|🌍|In 2015 countries agreed to hold warming well below 2 °C, aiming for 1.5 °C above pre-industrial levels. Each country sets its own targets, called <b>nationally determined contributions</b>."
  ], [
    "A charge on each ton of CO₂ released is a carbon...|tax|💰|Money paid to the government.|rebate,filter",
    "A system that limits total emissions and allows permit trading is...|cap-and-trade|🔄|Cap the total then trade.|carbon tax,cap-and-release",
    "Net zero means emissions are balanced by...|removals|⚖️|What is taken out of the air.|more emissions,fewer plants",
    "The Paris Agreement aims to keep warming well below...|2 °C|🌡️|A small number of degrees.|20 °C,0.2 °C",
    "The Paris Agreement was made in...|2015|📅|Early in the last decade.|1985,2045",
    "A stretch goal of the Paris Agreement is...|1.5 °C|🎯|Even stricter than the main limit.|5 °C,15 °C",
    "Each country's own Paris target is called a...|nationally determined contribution|🏳️|It is set by that nation.|global tax rule,United Nations tax",
    "Planting forests is an example of carbon...|removal|🌳|Trees pull CO₂ from the air.|emission,pricing"
  ], "Think about making polluters pay and balancing what is added with what is removed."));
  b.push(L("Geoengineering", [
    "Two families|🛠️|<b>Geoengineering</b> means large-scale changes to the climate system. <b>Carbon dioxide removal</b> takes CO₂ out of the air (forests, direct air capture, enhanced rock weathering). <b>Solar radiation management</b> reflects some sunlight.",
    "Sunlight reflection|☁️|One idea is spraying tiny particles into the stratosphere. The eruption of Mount Pinatubo in 1991 cooled Earth by about 0.5 °C for a year or two in a similar way. Another idea is brightening marine clouds.",
    "Risks|⚠️|Reflecting sunlight does not stop ocean acidification, could change rainfall, and if stopped suddenly could cause quick warming (<b>termination shock</b>). It also raises hard questions: who decides for the whole world?"
  ], [
    "Large-scale climate intervention is called...|geoengineering|🛠️|It engineers the Earth.|geomorphology,geology only",
    "Taking CO₂ out of the air is carbon dioxide...|removal|🌳|Pull it out.|injection,creation",
    "Reflecting some sunlight is called solar radiation...|management|☀️|Controlling the sunlight.|creation,collection",
    "A volcanic eruption that cooled Earth in 1991 was...|Mount Pinatubo|🌋|It was in the Philippines.|Mount Fuji,Vesuvius",
    "Sunlight reflection would NOT stop ocean...|acidification|🧪|It does not remove CO₂.|waves,tides",
    "A rapid warming after sudden stopping is called termination...|shock|⚡|A sudden jolt.|fix,rest",
    "Brightening marine clouds aims to...|reflect more sunlight|☁️|Whiter clouds bounce light.|absorb more sunlight,add CO₂",
    "A direct air capture machine...|removes CO₂ from air|🏭|It filters the gas out.|adds CO₂ to the air,makes oxygen from rock"
  ], "Think about removing carbon versus reflecting sunlight."));
  b.push(L("Food webs and energy pyramids", [
    "Who eats whom|🕸️|A <b>food web</b> shows feeding links. <b>Producers</b> (plants) make food from sunlight. <b>Primary consumers</b> eat producers. <b>Secondary and tertiary consumers</b> eat other animals. <b>Decomposers</b> recycle dead matter.",
    "The 10 percent rule|🔺|Only about 10% of the energy at one level reaches the next. The rest is used for life or lost as heat. So 10,000 units in plants support about 1,000 in plant-eaters and 100 in meat-eaters.",
    "Why top predators are few|🦅|Little energy is left at the top, so there are fewer top predators and food chains seldom have more than 4 or 5 levels. A <b>keystone species</b> has an effect much larger than its numbers."
  ], [
    "Plants are called...|producers|🌱|They make their own food.|decomposers,predators",
    "Animals that eat plants are...|primary consumers|🐛|The first level of consumers.|tertiary consumers,decomposers",
    "Fungi and bacteria that break down dead matter are...|decomposers|🍄|They recycle nutrients.|producers,herbivores",
    "About what share of energy passes to the next level?|10%|🔺|One tenth.|90%,50%",
    "If plants hold 5,000 energy units the plant-eaters get about...|500|🧮|One tenth of that.|50,2500",
    "Food chains are short because energy is...|lost at each level|🔥|Much becomes heat.|created at each level,stored forever",
    "A species with an unusually big effect for its numbers is a...|keystone species|🗝️|It holds the system together.|invasive species,extinct species",
    "Top predators are usually...|few in number|🦅|There is little energy at the top.|the most numerous,smaller than plants"
  ], "Think about how energy shrinks as you climb the chain."));
  b.push(L("Bioaccumulation", [
    "Poisons that stay|🐟|Some pollutants, like mercury and certain chemicals, are not easily broken down or removed. They build up in an organism's body over time: <b>bioaccumulation</b>.",
    "Climbing the chain|📈|When a predator eats many contaminated prey, the pollutant becomes more concentrated at each step. This is <b>biomagnification</b>. Top predators such as large tuna, swordfish and eagles have the highest amounts.",
    "What we learned|🥚|The pesticide DDT thinned the eggshells of some birds. After it was banned in the USA in 1972 many bird populations recovered. Today advice for people limits some large fish for children and pregnant women."
  ], [
    "A pollutant building up in one body over time is...|bioaccumulation|📈|Bio means life.|biodegradation,photosynthesis",
    "Pollutants getting more concentrated up a food chain is...|biomagnification|🔺|Magnify means make bigger.|biodiversity,bioluminescence",
    "Which animals carry the most contaminant?|top predators|🦅|They eat many contaminated prey.|producers,decomposers only",
    "A metal that builds up in large fish is...|mercury|🐟|A liquid metal.|calcium,sodium",
    "The pesticide that thinned some birds' eggshells was...|DDT|🥚|It was banned in 1972.|salt,chlorine",
    "Chemicals that bioaccumulate are usually hard to...|break down|🧪|They persist.|find in food,measure ever",
    "Eating smaller fish lower on the chain usually brings...|less contaminant|🐠|Less concentrated.|more contaminant,none ever",
    "Bioaccumulation matters for people who eat lots of...|large predator fish|🍽️|Like swordfish.|vegetables,rice"
  ], "Think about what happens when a predator eats many contaminated meals."));
  b.push(L("Hubble's law", [
    "Farther means faster|🔭|Galaxies far away are moving away from us faster. <b>Hubble's law</b>: speed = H₀ × distance. H₀, the Hubble constant, is about 70 km/s per megaparsec (Mpc).",
    "A worked case|🧮|1 Mpc is about 3.26 million light-years. A galaxy 100 Mpc away recedes at about 70 × 100 = 7,000 km/s. A galaxy 10 Mpc away recedes at about 700 km/s.",
    "Space itself stretches|🎈|Galaxies are not flying through space like fireworks. The space between them is expanding, like dots on an inflating balloon. Nearby bound galaxies like Andromeda are not part of this stretch."
  ], [
    "Hubble's law says farther galaxies move away...|faster|🔭|Distance and speed grow together.|slower,at the same speed",
    "The Hubble constant is about 70 km/s per...|megaparsec|📏|A big distance unit, Mpc.|kilogram,degree",
    "A galaxy 10 Mpc away recedes at about...|700 km/s|🧮|70 times 10.|70 km/s,7000 km/s",
    "A galaxy 50 Mpc away recedes at about...|3500 km/s|🧮|70 times 50.|350 km/s,35000 km/s",
    "A galaxy 200 Mpc away recedes at about...|14000 km/s|🧮|70 times 200.|1400 km/s,140000 km/s",
    "The expansion is best described as the stretching of...|space|🎈|Not the galaxies themselves.|stars,galaxies only",
    "1 Mpc is about...|3.26 million light-years|📏|A few million.|3.26 light-years,326 light-years",
    "Hubble's law links a galaxy's speed to its...|distance|📈|How far away it is.|color only,age only"
  ], "Think about the rule: speed equals a constant times distance."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[8], b[9], b[10], b[11], b[12], b[13], b[15], b[17]]));
  b.push(MIX("Level 23 Challenge", [b[1], b[2], b[3], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[13], b[14], b[15], b[16], b[17], b[0]]));


  // ================= LEVEL 24 =================
  const c = [];
  c.push(L("Balance inside a star", [
    "Gravity vs pressure|⚖️|A star is held in <b>hydrostatic equilibrium</b>: gravity pulls inward and the pressure of hot gas pushes outward. When they balance, the star is stable.",
    "A thermostat|🌡️|If fusion in the core slows, the core shrinks and heats up, which speeds fusion again. If fusion speeds up, the core expands and cools. This keeps main-sequence stars steady for billions of years.",
    "Getting energy out|☀️|The Sun's core is about 15 million K. Energy moves out by radiation through the inner layers, then by <b>convection</b> in the outer layers. A photon can take over 100,000 years to leave the Sun."
  ], [
    "A stable star has gravity balanced by...|pressure|⚖️|The outward push of hot gas.|magnetism,rotation",
    "This balance is called hydrostatic...|equilibrium|⚖️|It means a state of balance.|collapse,expansion",
    "If fusion in a star's core slows the core...|shrinks and heats up|🌡️|Gravity wins for a moment.|expands and cools,stops spinning",
    "The Sun's core temperature is about...|15 million K|🔥|Millions of degrees.|5800 K,15 K",
    "Energy moves through the Sun's outer layers mainly by...|convection|♨️|Hot gas rises and cool gas sinks.|conduction,radioactivity",
    "A photon takes about how long to leave the Sun's core?|over 100000 years|⏳|It bounces around a huge number of times.|8 minutes exactly,one second",
    "The Sun's surface temperature is about...|5800 K|☀️|Much cooler than the core.|15 million K,580 K",
    "The thermostat effect keeps main-sequence stars...|steady for billions of years|⭐|They shine for a very long time.|exploding every day,changing color weekly"
  ], "Think about two forces: one pulls in and one pushes out."));
  c.push(L("Onion shells and core collapse", [
    "Layers of fusion|🧅|In a star over about 8 times the Sun's mass, the core fuses heavier and heavier elements in layers: hydrogen, then helium, carbon, neon, oxygen and silicon, ending with <b>iron</b> in the center.",
    "The iron limit|⚙️|Fusing iron does not release energy, it uses energy. The core cannot hold itself up, so it collapses in less than a second.",
    "Explosion|💥|The rebound blasts out the outer layers as a <b>supernova</b> and spreads heavy elements. The core becomes a <b>neutron star</b>, or a <b>black hole</b> if it is massive enough."
  ], [
    "Fusion in massive stars ends with the element...|iron|⚙️|A common metal in your home.|gold,uranium",
    "Fusing iron does not release energy, so the core...|collapses|⬇️|There is nothing to hold it up.|grows,cools safely",
    "The explosion after core collapse is a...|supernova|💥|A very bright event.|nova only,eclipse",
    "The leftover core can become a neutron star or a...|black hole|⚫|If it is massive enough.|white dwarf only,comet",
    "Which layer is deepest in the onion of a massive star?|iron|🧅|It is the final product.|hydrogen,helium",
    "Which fuses first in a star's life?|hydrogen|🔥|The lightest element.|silicon,carbon",
    "Stars need roughly how many Suns of mass to end this way?|more than 8|⚖️|Much heavier than the Sun.|less than 1,exactly 1",
    "A core-collapse supernova spreads heavy elements into...|space|🌌|They become nebulae and future stars.|the Sun's core,Earth's core"
  ], "Think about what builds up in the center and what happens when it cannot burn."));
  c.push(L("White dwarfs and Type Ia supernovae", [
    "Dead star leftovers|⚪|A star like the Sun ends as a <b>white dwarf</b>, an Earth-sized remnant held up by electron pressure, not fusion. It slowly cools.",
    "The limit|⚖️|A white dwarf cannot be heavier than about 1.4 Suns, the <b>Chandrasekhar limit</b>. If a white dwarf in a double star pulls gas from its partner and reaches this limit, it explodes as a <b>Type Ia supernova</b>.",
    "A standard candle|🕯️|Type Ia supernovae all peak at nearly the same true brightness. By comparing true and apparent brightness, astronomers measure distances to far galaxies. They revealed in 1998 that the expansion is speeding up."
  ], [
    "A Sun-like star ends its life as a...|white dwarf|⚪|A small hot remnant.|red giant,black hole",
    "A white dwarf is about as big as...|Earth|🌍|A planet size.|Jupiter,a city",
    "The maximum mass of a white dwarf is about...|1.4 Suns|⚖️|The Chandrasekhar limit.|14 Suns,0.14 Suns",
    "A Type Ia supernova happens when a white dwarf...|reaches the mass limit|💥|It gets too heavy.|runs out of hydrogen,hits a comet",
    "Type Ia supernovae are used as...|standard candles|🕯️|They have a known true brightness.|clocks,magnets",
    "The 1998 discovery from Type Ia supernovae was that expansion is...|speeding up|🚀|It points to dark energy.|slowing down,stopped",
    "A white dwarf is held up by...|electron pressure|⚙️|Not by fusion.|fusion,magnetism",
    "To get the distance we compare true brightness with...|apparent brightness|🔭|How bright it looks from Earth.|color alone,mass alone"
  ], "Think about a dead star pulling gas from a neighbor."));
  c.push(L("Gravitational lensing", [
    "Mass bends light|🔭|Einstein's general relativity says mass bends space. Light follows the bent space, so a massive object can act like a lens. This is <b>gravitational lensing</b>.",
    "Proof and pictures|📸|In 1919 starlight bending near the Sun was measured during a solar eclipse, supporting relativity. Today galaxy clusters bend light from far galaxies into arcs or rings, called <b>Einstein rings</b>.",
    "A useful tool|🧰|Lensing magnifies faraway galaxies. <b>Weak lensing</b> maps unseen dark matter. <b>Microlensing</b>, a brief brightening when a star passes in front of another, can reveal planets."
  ], [
    "Bending of light by gravity is called gravitational...|lensing|🔭|Like a lens.|refraction,eclipsing",
    "Whose theory predicts lensing?|Einstein's|💡|General relativity.|Newton's only,Galileo's",
    "A ring made by lensing is an...|Einstein ring|⭕|Named after the theorist.|Saturn ring,halo",
    "The 1919 test used an...|eclipse|🌑|It made stars near the Sun visible.|earthquake,aurora",
    "Lensing can help map invisible...|dark matter|⚫|Its gravity bends light too.|moonlight,rainbows",
    "A brief brightening from a star passing in front of another is...|microlensing|✨|A small lens effect.|redshift,parallax",
    "Lensing by a cluster makes far galaxies look...|magnified|🔍|Like a magnifying glass.|smaller and fainter,hidden",
    "What bends the light in gravitational lensing?|mass|⚖️|Heavy things bend space.|temperature,sound"
  ], "Think about what heavy objects do to space."));
  c.push(L("The first atoms", [
    "The first minutes|⏱️|In the first few minutes after the Big Bang it was hot enough to fuse protons and neutrons. <b>Big Bang nucleosynthesis</b> made about 75% hydrogen and 25% helium-4 by mass, plus tiny amounts of deuterium and lithium.",
    "First atoms|⚛️|The universe was too hot for atoms for about 380,000 years. Then electrons joined nuclei, light was free to travel, and we see that light today as the <b>cosmic microwave background</b>.",
    "Heavier elements|⭐|Carbon, oxygen, iron and the rest were made later, inside stars and supernovae. Predicting the hydrogen to helium ratio correctly is a major success of Big Bang theory."
  ], [
    "Big Bang nucleosynthesis made mostly hydrogen and...|helium|🎈|The second lightest element.|carbon,iron",
    "By mass, the universe is about 75% hydrogen and how much helium?|25%|🥧|The rest after hydrogen.|2.5%,50%",
    "Atoms first formed about...|380000 years after the Big Bang|⏳|Hundreds of thousands of years.|3 minutes after,13 billion years after",
    "The light released when atoms formed is the...|cosmic microwave background|📡|A leftover glow.|aurora,zodiacal light",
    "Elements like carbon and iron were made in...|stars|⭐|Later in the universe.|the first minutes,the Moon",
    "Nucleosynthesis began about...|a few minutes after the Big Bang|🕒|Very early.|a billion years after,380000 years after",
    "A very light element made in tiny amounts early was...|lithium|🔋|Number three on the table.|gold,iron",
    "Predicting the hydrogen to helium ratio is a success of...|Big Bang theory|✅|It matches what we observe.|geocentric theory,steady state theory"
  ], "Think about which elements could form in the first few minutes."));
  c.push(L("Hot Jupiters and planet migration", [
    "A surprise in 1995|🪐|The first planet found around a Sun-like star, 51 Pegasi b, was a gas giant with a 4-day orbit. Such <b>hot Jupiters</b> circle very close to their star with temperatures over 1,000 °C.",
    "Moving in|➡️|Gas giants probably form far out where ice is common, then <b>migrate</b> inward through interaction with the disk of gas or with other planets. Our own planets seem to have moved less.",
    "Detection bias|🔎|Methods like <b>transit</b> and <b>radial velocity</b> find big close planets most easily, so early catalogs had many hot Jupiters. They are actually uncommon."
  ], [
    "A gas giant orbiting very close to its star is a...|hot Jupiter|🔥|Hot and giant.|cold Neptune,dwarf Pluto",
    "A planet moving from where it formed to a new orbit is said to...|migrate|➡️|Birds do it too.|erode,rotate",
    "Hot Jupiters probably formed...|far from the star|❄️|Where gas giants usually form.|very close to the star,inside the star",
    "51 Pegasi b orbits its star in about...|4 days|⏱️|A very short year.|4 years,40 years",
    "A dip in starlight as a planet crosses the star is a...|transit|🌑|The planet passes in front.|eclipse of the Moon,flare",
    "A wobble in a star's motion is measured by...|radial velocity|〰️|It measures how fast the star moves toward and away.|parallax,lensing",
    "Early planet catalogs had many hot Jupiters because they are...|easy to detect|🔎|Big and close planets give strong signals.|very common,all there is",
    "Hot Jupiters have temperatures over about...|1000 °C|🌡️|Hotter than lava.|10 °C,100 °C"
  ], "Think about where a gas giant forms and where it ends up."));
  c.push(L("Impact craters", [
    "How craters form|☄️|A space rock hits at many kilometers per second. The impact makes a shock wave and a round crater, even if the rock came in at a slant. Small craters are bowl-shaped; large ones have a <b>central peak</b>.",
    "Dating a surface|📆|More craters mean an older surface. The Moon is heavily cratered because it has no air, water or plate tectonics to erase them. Earth has few, because erosion and tectonics wipe them out.",
    "Famous craters|🏜️|Meteor Crater in Arizona is about 1.2 km wide and about 50,000 years old. Chicxulub in Mexico is about 180 km wide and linked to the end of the dinosaurs. Shocked quartz is a sign of an impact."
  ], [
    "Most impact craters are...|round|⭕|Even for slanting hits.|square,triangular",
    "A feature of large craters is a...|central peak|⛰️|A rebound in the middle.|chimney,tail",
    "A more heavily cratered surface is usually...|older|📆|It has had more time to collect hits.|younger,newer",
    "The Moon has so many craters because it has no...|erosion or plate tectonics|🌙|Nothing wipes them out.|rocks,gravity",
    "Earth has few craters because erosion and tectonics...|erase them|🌍|They cover and remove them.|prevent impacts,add them",
    "A mineral sign of a big impact is shocked...|quartz|💎|It is damaged by a shock wave.|ice,coal",
    "Meteor Crater is in...|Arizona|🌵|A US state.|Alaska,Maine",
    "Chicxulub is about how wide?|180 km|📏|A very big crater.|1.2 km,18 m"
  ], "Think about what erases craters on a planet."));
  c.push(L("Lagrange points", [
    "Spots of balance|⚖️|<b>Lagrange points</b> are five places near two large bodies, such as the Sun and Earth, where a small object can stay in step with them. Gravity from both and the orbital motion balance there.",
    "Which are useful|🛰️|<b>L1</b> lies between Earth and Sun and is used by solar observers. <b>L2</b> lies 1.5 million km beyond Earth on the night side, home of the James Webb Space Telescope. L1, L2 and L3 are unstable, so craft use small thrusters to stay.",
    "Stable ones|🪨|<b>L4</b> and <b>L5</b> lie 60° ahead of and behind the smaller body in its orbit. They are stable. Thousands of Trojan asteroids gather at Jupiter's L4 and L5."
  ], [
    "How many Lagrange points does a two-body system have?|five|5️⃣|L1 through L5.|three,nine",
    "The point between Earth and Sun is...|L1|☀️|The first one.|L2,L5",
    "The James Webb Space Telescope sits near...|L2|🔭|Beyond Earth on the night side.|L1,L4",
    "Which Lagrange points are stable?|L4 and L5|⚖️|Sixty degrees ahead and behind.|L1 and L2,L2 and L3",
    "Asteroids that gather at L4 and L5 of Jupiter are...|Trojans|🪨|Named after Greek heroes.|Centaurs,Kuiper objects",
    "Crafts at L1 L2 and L3 need small thrusters because those points are...|unstable|🚀|They are like a ball balanced on a hill.|stable,hot",
    "L2 is about how far from Earth?|1.5 million km|📏|Beyond the Moon by far.|384000 km,15 million km",
    "L4 and L5 sit at what angle from the smaller body?|60°|📐|One sixth of a circle.|90°,180°"
  ], "Think about where gravity and motion balance."));
  c.push(L("Seismic tomography", [
    "A CT scan of Earth|🩻|<b>Seismic tomography</b> uses waves from thousands of earthquakes crossing the planet to build 3D images of the inside. Waves go faster through cold, dense rock and slower through hot rock.",
    "What it shows|🌍|Fast regions under continents and along sinking slabs are cold. Slow regions under hot spots show hot rising mantle. Two huge slow patches sit deep under Africa and the Pacific.",
    "Layers revealed|🧅|S waves cannot cross liquid, so they vanish at the <b>core-mantle boundary</b> at about 2,900 km depth. This showed the outer core is liquid. The inner core is solid and has a radius of about 1,220 km."
  ], [
    "Seismic tomography uses waves from...|earthquakes|🌍|Thousands of them.|tides,thunder",
    "Seismic waves travel faster through...|cold dense rock|🥶|Stiff material.|hot soft rock,magma only",
    "A slow wave region is usually...|hotter|🔥|Soft rock slows waves.|colder,identical",
    "Sinking slabs in the mantle appear as...|fast regions|⬇️|They are cold.|slow regions,empty spaces",
    "S waves cannot pass through a...|liquid|💧|They shear rock but not fluid.|solid,crystal",
    "The outer core is...|liquid|🌊|S waves cannot cross it.|solid,gas",
    "The core-mantle boundary lies at a depth of about...|2900 km|⛏️|About halfway to the center.|29 km,290 km",
    "The inner core is...|solid|⚪|Pressure keeps it solid despite the heat.|liquid,gas"
  ], "Think about waves going quickly through cold rock and slowly through hot rock."));
  c.push(L("Plate tectonics and the rock cycle", [
    "Plates drive the cycle|♻️|At <b>divergent</b> boundaries magma makes new basalt crust. At <b>subduction zones</b> plates sink, heat and squeeze rocks (metamorphism) and make magma that feeds volcanoes. At <b>collisions</b> rocks pile up as mountains.",
    "Metamorphic settings|🔥|Regional metamorphism happens when plates collide. Contact metamorphism happens next to magma. At subduction zones a high-pressure rock called <b>blueschist</b> forms.",
    "Back to sediment|⛰️|Mountains are eroded to sediment, which settles in basins and becomes sedimentary rock. Slices of ocean crust pushed onto land are called <b>ophiolites</b>."
  ], [
    "New basalt crust forms at which boundary?|divergent|↔️|Plates move apart.|convergent,transform",
    "Plates sink and cause volcanoes at...|subduction zones|⬇️|Oceanic plate goes under.|mid-ocean ridges,hot spots only",
    "Continents colliding make...|mountains|🏔️|Crust piles up.|ocean basins,deserts",
    "A high-pressure rock from subduction zones is...|blueschist|🔵|Its name has a color.|marble,pumice",
    "Metamorphism next to a magma body is...|contact metamorphism|🔥|Heat from touching.|regional metamorphism,burial",
    "Slices of ocean crust found on land are...|ophiolites|🌊|A word with ophi- in it.|ophites of salt,laccoliths",
    "Eroded mountains become sediment and then...|sedimentary rock|🪨|They are compacted.|igneous rock directly,metals",
    "Metamorphism over a large area during plate collision is...|regional|🗺️|A wide region.|local,contact"
  ], "Think about how plate boundaries make or recycle rock."));
  c.push(L("How ore deposits form", [
    "Rich rock|⛏️|An <b>ore</b> is rock with enough of a valuable metal to be mined for profit. Natural processes concentrate metals far above their usual average.",
    "Ways to concentrate|🧪|Hot, mineral-rich water makes <b>hydrothermal veins</b> of gold, silver and copper. <b>Porphyry copper</b> deposits form above subduction-zone magma. <b>Placer</b> deposits form where heavy gold grains settle in streams.",
    "Weathering and seas|🌴|<b>Bauxite</b>, the aluminum ore, forms when heavy tropical rain leaches away other minerals. <b>Banded iron formations</b> hold most iron ore. Salt and gypsum form when seawater evaporates."
  ], [
    "Rock with enough metal to mine for profit is an...|ore|⛏️|A short word.|opal,agate",
    "Veins of gold from hot mineral-rich water are...|hydrothermal|♨️|Hydro means water and thermal means heat.|glacial,aeolian",
    "Heavy gold grains settled in a stream make a...|placer deposit|🌊|Gold pans work on these.|vein deposit,porphyry",
    "The ore of aluminum is...|bauxite|⚪|It forms in the tropics.|hematite,galena",
    "Most iron ore comes from...|banded iron formations|🟤|Old rusty layers.|salt flats,coal beds",
    "Salt deposits form when seawater...|evaporates|☀️|The water leaves and the salt stays.|freezes,erupts",
    "Porphyry copper deposits form above...|subduction-zone magma|🌋|Near volcanic arcs.|glaciers,beach sand",
    "Ore is more valuable when metal is...|highly concentrated|📈|Rich rock is cheaper to mine.|spread very thinly,absent"
  ], "Think about how nature gathers a metal into one place."));
  c.push(L("Volcanic hazards", [
    "Different dangers|🌋|<b>Pyroclastic flows</b> are fast clouds of hot ash and gas that rush down a volcano at hundreds of km/h. <b>Lahars</b> are volcanic mudflows. <b>Ashfall</b> can collapse roofs and damage jet engines.",
    "Lava is slower|🔥|Lava flows usually move slowly enough that people can leave. Volcanic gases such as sulfur dioxide and carbon dioxide can also be harmful in low places.",
    "Staying safe|📏|The <b>Volcanic Explosivity Index (VEI)</b> measures eruption size from 0 to 8, and each step is about ten times bigger. Scientists watch earthquakes, gas and swelling, and officials order evacuations before big eruptions."
  ], [
    "A fast cloud of hot ash and gas is a...|pyroclastic flow|☁️|It rushes down the volcano.|lava flow,lahar",
    "A volcanic mudflow is a...|lahar|🟤|A word from Indonesia.|tephra,caldera",
    "Ashfall can be dangerous to...|jet engines|✈️|Ash can melt inside them.|submarines,compasses",
    "The VEI scale runs from 0 to...|8|📏|The biggest eruptions.|5,12",
    "Each step on the VEI is about how many times bigger?|ten|🔟|It is a logarithmic scale.|two,one hundred",
    "Which hazard moves slowest?|lava flow|🐌|People can usually walk away.|pyroclastic flow,ashfall plume",
    "Scientists watch for gas swelling and...|earthquakes|📈|Rising magma shakes the ground.|tides,wind",
    "Before a big eruption officials may order an...|evacuation|🚌|People move to safer places.|experiment,fireworks"
  ], "Think about how fast and how far each volcanic hazard travels."));
  c.push(L("Aerosols and climate", [
    "Tiny particles|🌫️|<b>Aerosols</b> are tiny solid or liquid particles floating in the air, such as dust, sea salt, smoke and sulfates. Many come from volcanoes, fires and burning fuels.",
    "Cooling and warming|🌡️|Sulfate aerosols <b>reflect sunlight</b> and cool the surface. <b>Black carbon</b> (soot) absorbs sunlight and warms the air. Aerosols also give water vapor something to condense on, so they help make <b>cloud droplets</b>.",
    "A hidden mask|🎭|Aerosol cooling has hidden part of greenhouse warming. Cleaner air is good for health, but means less masking. Low aerosols last days to weeks; those in the stratosphere can last a year or more."
  ], [
    "Tiny particles floating in the air are...|aerosols|🌫️|Not a gas but tiny solids or droplets.|isotopes,isobars",
    "Sulfate aerosols tend to...|cool the surface|❄️|They reflect sunlight.|warm the surface,absorb heat",
    "Soot is also called...|black carbon|⚫|Dark particles.|white carbon,blue carbon",
    "Black carbon in the air tends to...|warm the air|🔥|Dark particles absorb light.|reflect all sunlight,cool the air",
    "Water vapor condenses on aerosols to form...|cloud droplets|☁️|Tiny drops that make clouds.|snow only,hail only",
    "Aerosols have partly hidden greenhouse warming by...|masking it|🎭|They cool a little.|adding to it,erasing it",
    "Aerosols in the stratosphere last...|a year or more|⏳|Much longer than low ones.|a few minutes,one day",
    "Cleaning air pollution lowers aerosols and may make warming...|appear stronger|🌡️|The mask comes off.|disappear,reverse"
  ], "Think about which particles reflect and which ones absorb sunlight."));
  c.push(L("Polar amplification", [
    "The Arctic warms faster|🧊|Since 1979 the Arctic has warmed about <b>3 to 4 times</b> faster than the global average. This is called <b>polar amplification</b>.",
    "Why|🔁|When sea ice melts, dark ocean replaces bright ice, absorbs more sunlight and melts more ice. This is the ice-albedo feedback. Other causes include changes in clouds, heat flow and how heat spreads through the atmosphere.",
    "Sea level link|🌊|Melting <b>sea ice</b> floats already, so it hardly changes sea level. Melting <b>land ice</b> (Greenland and Antarctic ice sheets, glaciers) adds water and raises sea level. Antarctica is a land surrounded by ocean, so it behaves differently from the Arctic."
  ], [
    "The Arctic is warming about how many times faster than the global average?|3 to 4 times|🔥|More than double.|0.5 times,100 times",
    "Faster warming near the poles is called polar...|amplification|📢|Things get stronger.|reduction,rotation",
    "A key feedback in the Arctic is ice...|albedo|⚪|How reflective the surface is.|density,volume",
    "Melting sea ice replaces bright ice with dark...|ocean water|🌊|It absorbs more sunlight.|snow,clouds",
    "Which melting raises sea level the most?|land ice|🏔️|It adds new water to the ocean.|floating sea ice,fog",
    "Antarctica is a...|continent covered in ice|🧊|Land surrounded by ocean.|frozen ocean only,floating island",
    "Floating sea ice melting changes sea level...|very little|🧊|It already displaces water.|a lot,not at all because it vanishes",
    "The Arctic sea ice minimum occurs in...|September|📅|End of summer.|March,June"
  ], "Think about a bright reflective surface changing to a dark one."));
  c.push(L("Ocean waves", [
    "Parts of a wave|🌊|A wave has a <b>crest</b> (top), <b>trough</b> (bottom), <b>wavelength</b> (crest to crest), <b>amplitude</b> and <b>period</b> (time for one wave to pass). Speed = wavelength ÷ period. A 50 m wave with a 10 s period moves at 5 m/s.",
    "Made by wind|🌬️|Wave size depends on wind speed, how long it blows and the <b>fetch</b>, the distance over open water. <b>Swell</b> is wave energy that has travelled far from its storm.",
    "At the beach|🏖️|Water moves in circles; only the energy moves forward. Waves break when the water gets shallow. A <b>rip current</b> pulls out to sea. If caught, swim sideways, parallel to the shore, and do not fight it."
  ], [
    "Crest to crest is the...|wavelength|📏|The distance between two tops.|amplitude,period",
    "Time for one wave to pass is the...|period|⏱️|It is measured in seconds.|wavelength,fetch",
    "Wave speed equals wavelength divided by...|period|➗|A time.|height,depth",
    "A wave with a 20 m wavelength and a 4 s period moves at...|5 m/s|🌊|Divide 20 by 4.|80 m/s,0.2 m/s",
    "The distance of open water the wind blows over is the...|fetch|🌬️|It is a long run.|trough,tide",
    "Waves that have travelled far from their storm are...|swell|🌊|Smooth and regular.|chop,tsunami",
    "In a wave the water mostly moves in...|circles|🔄|The energy travels but not the water.|straight lines to shore,one direction forever",
    "If caught in a rip current you should swim...|parallel to the shore|🏊|Escape sideways.|straight toward shore,straight out to sea"
  ], "Think about wave size, wavelength and time."));
  c.push(L("Circular economy", [
    "Straight line or circle|♻️|In a <b>linear economy</b> we take resources, make things and throw them away. In a <b>circular economy</b> we design to keep materials in use through repair, reuse, remanufacture and recycling.",
    "Life-cycle thinking|🔍|A <b>life-cycle assessment</b> counts the impact of a product from raw materials to making, use and disposal. The best step is to <b>reduce</b> use first. Recycling aluminum saves about 95% of the energy needed to make it from ore.",
    "Waste streams|📱|Old electronics (<b>e-waste</b>) contain valuable metals and harmful materials, so they need special recycling. Food scraps can be composted into soil."
  ], [
    "Take make and throw away is a...|linear economy|➡️|A straight line.|circular economy,barter economy",
    "Keeping materials in use again and again is a...|circular economy|♻️|A loop.|linear economy,black market",
    "Counting a product's impact from raw material to disposal is a life-cycle...|assessment|🔍|A kind of review.|calendar,composition",
    "The best first step in the waste hierarchy is to...|reduce|⬇️|Use less to begin with.|dump,burn",
    "Recycling aluminum saves about what share of the energy?|95%|📊|Nearly all.|5%,50%",
    "Old phones and computers are called...|e-waste|📱|Electronic waste.|bio-waste,glass-waste",
    "Food scraps can be turned into soil by...|composting|🍎|Natural decay.|melting,sandblasting",
    "Designing a product to be fixed easily helps...|repair|🔧|Keeping things in use.|disposal,landfill"
  ], "Think about a loop where materials keep being used."));
  c.push(L("Shared resources and fisheries", [
    "The commons|🐟|In the <b>tragedy of the commons</b>, a shared resource is overused because each person gains from taking more while the cost is shared by everyone. Open-ocean fish are an example.",
    "A real collapse|📉|In 1992 the Atlantic cod fishery off Newfoundland collapsed after years of overfishing, and many fishers lost their jobs. The fish recovered slowly.",
    "Solutions|🤝|Rules such as <b>catch limits (quotas)</b>, fishing seasons, <b>marine protected areas</b> and community agreements keep catches near a sustainable level (<b>maximum sustainable yield</b>). Shared rules can work well."
  ], [
    "A shared resource that gets overused is the tragedy of the...|commons|🐟|Everyone's property.|garden,market",
    "Taking more fish than can be replaced is...|overfishing|🎣|Too much fishing.|aquaculture,migration",
    "A catch limit is also called a...|quota|📏|A number set by rules.|loophole,bonus",
    "Areas where fishing is restricted to help fish recover are...|marine protected areas|🛡️|Protected sea zones.|fishing derbies,plastic gyres",
    "The Atlantic cod fishery collapsed in...|1992|📅|Near the end of the twentieth century.|1692,2020",
    "A catch that can continue year after year is...|sustainable|🔁|It can be kept up.|short-lived,illegal",
    "Why are shared resources easily overused?|each user gains while costs are shared|💡|Individual benefit versus shared cost.|nobody wants them,they cost too much",
    "Closing a fishing season allows fish to...|reproduce|🐟|Their numbers can recover.|vanish faster,change color"
  ], "Think about what happens when everyone takes a little too much."));
  c.push(L("Forests and deforestation", [
    "Forests and carbon|🌳|Trees take in CO₂ and store carbon in wood and soil. Tropical forests hold much of it. Cutting and burning forests releases the carbon, and changes in land use cause roughly 10% of human CO₂ emissions.",
    "Why they are cleared|🚜|Most tropical deforestation clears land for cattle, soy and palm oil. Losing forest also means losing habitat, since tropical forests hold most land species, and changing local rainfall.",
    "Solutions|🌱|Protecting old forests, <b>reforestation</b> (replanting where forest was lost), <b>afforestation</b> (planting where there was none), <b>agroforestry</b> and sustainable logging all help. Protecting existing forest comes first because new trees take decades to grow."
  ], [
    "Forests store carbon in wood and...|soil|🌳|The ground beneath.|clouds,stars",
    "Clearing forest mostly releases carbon as...|carbon dioxide|💨|A greenhouse gas.|oxygen only,helium",
    "Most tropical deforestation is to make room for...|farming|🐄|Cattle soy and palm oil.|volcanoes,skyscrapers",
    "Replanting where forest was lost is...|reforestation|🌱|Re means again.|afforestation,deforestation",
    "Planting trees where there was no forest is...|afforestation|🌲|Af means to.|reforestation,deforestation",
    "Growing trees together with crops is called...|agroforestry|🌾|Agro and forestry.|monoculture,hydroponics",
    "Protecting old forests comes first because new trees take...|decades to grow|⏳|They are slow.|a day to grow,no time",
    "Tropical forests are home to most of the world's...|land species|🐒|Great biodiversity.|deserts,oceans"
  ], "Think about trees, carbon and where cleared land is used."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[16]]));
  c.push(MIX("Level 24 Challenge", [c[1], c[2], c[4], c[5], c[6], c[7], c[8], c[9], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[0]]));

  Object.assign(EARTH_LEVELS, { 22: a, 23: b, 24: c });
})();
