// Mind Lab Earth & Space, levels 7-9 (extension file). 20 lessons per level.
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

  // ================= LEVEL 7 =================
  const g = [];
  g.push(L("Fronts and air pressure", [
    "Air pressure|📊|Air has weight. Where it presses harder we say <b>high pressure</b>. Where it presses less we say <b>low pressure</b>.",
    "High and low|🗺️|High pressure usually brings clear, calm weather. Low pressure usually brings clouds, wind and rain. Weather maps mark them with H and L.",
    "Fronts|🌩️|A <b>front</b> is the edge between two air masses. A <b>cold front</b> pushes cold air in and brings short, strong storms. A <b>warm front</b> brings steady, light rain, then warmer air."
  ], [
    "High pressure usually brings...|clear, calm weather|☀️||clouds and rain,stormy weather",
    "Low pressure usually brings...|clouds and rain|🌧️||clear, calm weather,no wind at all",
    "After a cold front passes, the air becomes...|cooler|🌬️||warmer,more humid",
    "After a warm front passes, the air becomes...|warmer|☀️||cooler,icy",
    "The edge between two air masses is called a...|front|🗺️||delta,fault",
    "On a weather map, the letter H means...|high pressure|🗺️||heavy rain,hot air",
    "On a weather map, the letter L means...|low pressure|🗺️||lots of lightning,light wind",
    "Which front often brings short, strong thunderstorms?|cold front|⛈️||warm front,high pressure",
    "Which front brings steady, light rain for a long time?|warm front|🌦️||cold front,high pressure"
  ], "Think about what high and low pressure do to the sky."));
  g.push(L("Humidity and dew", [
    "Water vapor|💧|Water can be a gas called <b>water vapor</b>. <b>Humidity</b> is how much water vapor is in the air.",
    "Changing state|🔄|<b>Evaporation</b> turns liquid water into vapor. <b>Condensation</b> turns vapor back into liquid drops.",
    "Dew and fog|🌫️|When air cools, vapor condenses. On grass at night it makes <b>dew</b>. Near the ground it makes <b>fog</b>, a cloud that touches the ground."
  ], [
    "Water vapor is water as a...|gas|💨||solid,liquid",
    "Humidity is the amount of ___ in the air.|water vapor|💧||dust,oxygen",
    "Liquid water turning into a gas is called...|evaporation|☀️||condensation,freezing",
    "A gas turning into liquid drops is called...|condensation|🥛||evaporation,melting",
    "Drops on the outside of a cold glass come from...|water vapor in the air|🥤||the glass leaking,juice soaking through",
    "Dew forms on grass when the air...|cools down|🌿||heats up,gets drier",
    "Fog is a cloud that is...|touching the ground|🌫️||very high up,made of smoke",
    "Wet clothes on a line dry because the water...|evaporates|👕||condenses,freezes",
    "Frost forms when a surface is at or below...|0°C|❄️||20°C,50°C"
  ], "Ask yourself: is water turning into a gas or into a liquid?"));
  g.push(L("Kinds of precipitation", [
    "Falling water|☔|<b>Precipitation</b> is any water that falls from clouds: rain, drizzle, snow, sleet and hail.",
    "Icy kinds|🌨️|<b>Snow</b> falls when the air is below freezing all the way down. <b>Sleet</b> is frozen raindrops. <b>Freezing rain</b> freezes when it touches the ground.",
    "Hail|🧊|<b>Hail</b> is balls of ice made inside tall thunderstorm clouds. Wind tosses the ice up and down so it grows layer by layer."
  ], [
    "Balls of ice that fall from thunderstorms are...|hail|🧊||sleet,drizzle",
    "Rain that freezes when it touches the ground is...|freezing rain|🧊||hail,drizzle",
    "Tiny frozen raindrops that bounce are called...|sleet|🌨️||hail,dew",
    "Ice crystals that join together fall as...|snow|❄️||sleet,dew",
    "Precipitation means water that...|falls from clouds|☔||rises from the sea,flows in rivers",
    "Which one is NOT precipitation?|dew|🌿||snow,hail",
    "Hail grows inside a...|thunderstorm cloud|⛈️||fog bank,rainbow",
    "Snow falls when the air from cloud to ground is...|below freezing|❄️||above 20°C,very windy",
    "A very light, fine rain is called...|drizzle|🌦️||hail,sleet"
  ], "Think about how cold the air is as the water falls."));
  g.push(L("Climate zones", [
    "Climate|🌍|<b>Climate</b> is the usual weather of a place over a long time. Earth has big zones with different climates.",
    "Three big zones|🗺️|<b>Tropical</b> zones near the equator are hot. <b>Temperate</b> zones in the middle have four seasons. <b>Polar</b> zones near the poles are very cold.",
    "Why?|🌞|Near the equator sunlight shines straight down, so it is hot. Near the poles it hits at a slant, so it is cold. Deserts are dry zones with very little rain."
  ], [
    "Which zone is near the equator and hot all year?|tropical|🌴||polar,temperate",
    "Which zone has four seasons and lies in the middle?|temperate|🍂||tropical,polar",
    "Which zone is very cold and lies near the poles?|polar|🐧||tropical,temperate",
    "Which place gets very little rain all year?|a desert|🏜️||a rainforest,a swamp",
    "Antarctica has a ___ climate.|polar|🧊||tropical,temperate",
    "Why is it hotter near the equator?|sunlight hits more directly|🌞||it is much closer to the Sun,it has no clouds",
    "Climate is the weather of a place over a...|long time|📅||single hour,few minutes",
    "A place with hot summers, cold winters and rain all year likely has a ___ climate.|temperate|🍁||tropical,polar",
    "A rainforest near the equator has a ___ climate.|tropical|🌴||polar,desert"
  ], "Think about how directly the Sun shines there."));
  g.push(L("Ocean currents", [
    "Rivers in the sea|🌊|An <b>ocean current</b> is a stream of water that moves through the ocean. Surface currents are pushed by wind.",
    "Warm and cold|🌡️|Warm currents carry heat from the tropics toward the poles. Cold currents carry cool water toward the equator. The <b>Gulf Stream</b> is a warm current.",
    "Deep currents|⬇️|Cold, salty water is heavy, so it sinks. This drives slow deep currents. Earth's spin also bends currents. This is the <b>Coriolis effect</b>."
  ], [
    "Ocean currents are like rivers of...|moving water|🌊||sand,ice",
    "Surface currents are mostly pushed by...|wind|💨||volcanoes,fish",
    "The Gulf Stream is a ___ current.|warm|🔥||cold,frozen",
    "A warm current can make a nearby coast...|warmer|🌊||colder,drier",
    "Cold, salty water is heavy, so it...|sinks|⬇️||floats,boils",
    "The bending of currents by Earth's spin is the...|Coriolis effect|🌍||greenhouse effect,Doppler effect",
    "Which could travel with an ocean current?|a floating bottle|🍾||a mountain,a shadow",
    "A cold current along a coast usually makes the air...|cooler|🧊||hotter,stickier",
    "Currents move heat around the planet. This helps spread out...|temperatures|🌡️||tides,rocks"
  ], "Think about what pushes or moves the water."));
  g.push(L("Earth's four spheres", [
    "Systems of Earth|🌍|Scientists split Earth into four parts called <b>spheres</b>. They all work together.",
    "The four|🪨💧💨🌱|<b>Geosphere</b>: rock, soil and land. <b>Hydrosphere</b>: all the water. <b>Atmosphere</b>: the air. <b>Biosphere</b>: all living things.",
    "They connect|🔗|Rain (hydrosphere) wears down rock (geosphere). Plants (biosphere) add oxygen to the air (atmosphere)."
  ], [
    "The geosphere is all of Earth's...|rock and land|⛰️||water,air",
    "The hydrosphere is all of Earth's...|water|💧||rock,living things",
    "The atmosphere is the...|air around Earth|💨||oceans,soil",
    "The biosphere is all...|living things|🌱||rocks,rain",
    "A river belongs to the...|hydrosphere|🏞️||geosphere,atmosphere",
    "A mountain belongs to the...|geosphere|⛰️||hydrosphere,biosphere",
    "Wind belongs to the...|atmosphere|💨||geosphere,biosphere",
    "A frog belongs to the...|biosphere|🐸||atmosphere,hydrosphere",
    "Which sphere includes oceans, lakes and ice?|hydrosphere|🌊||geosphere,atmosphere"
  ], "Look at the first part of each sphere name for a clue."));
  g.push(L("Earthquake words", [
    "Shaking ground|🌍|An earthquake happens when rocks underground suddenly slip along a crack called a <b>fault</b>.",
    "Where?|📍|The <b>focus</b> is where the quake starts underground. The <b>epicenter</b> is the spot on the surface right above it.",
    "Measuring|📈|Quakes send out <b>seismic waves</b>. A <b>seismograph</b> records them. <b>Magnitude</b> tells how big a quake is. Smaller quakes after a big one are <b>aftershocks</b>."
  ], [
    "A crack in the crust where rocks slip is a...|fault|🌍||delta,crater",
    "The spot on the surface right above where a quake starts is the...|epicenter|📍||focus,magnitude",
    "The place underground where a quake begins is the...|focus|📍||epicenter,fault line",
    "An instrument that records quake shaking is a...|seismograph|📈||barometer,telescope",
    "Energy waves from a quake are called...|seismic waves|〰️||light waves,tidal waves",
    "The number that tells how big a quake is, is its...|magnitude|🔢||epicenter,aftershock",
    "Smaller quakes that come after the big one are...|aftershocks|🏚️||foreshadows,fault lines",
    "A huge ocean wave caused by an undersea quake is a...|tsunami|🌊||monsoon,hurricane",
    "Scientists who study earthquakes are called...|seismologists|🔬||meteorologists,astronomers"
  ], "Each word names a different part of an earthquake."));
  g.push(L("Volcano parts and types", [
    "Magma and lava|🌋|Melted rock under the ground is <b>magma</b>. When it comes out onto the surface it is <b>lava</b>.",
    "Parts|🔥|Magma waits in a <b>magma chamber</b>, rises up a <b>vent</b>, and erupts from the <b>crater</b> at the top.",
    "Kinds|🗻|<b>Shield</b> volcanoes are wide with gentle slopes. <b>Cinder cones</b> are small and steep. <b>Composite</b> volcanoes are tall cones built of layers of lava and ash."
  ], [
    "Melted rock under the ground is called...|magma|🌋||lava,ash",
    "Melted rock that flows out on the surface is called...|lava|🌋||magma,ash",
    "The bowl-shaped opening at the top of a volcano is the...|crater|🌋||vent,chamber",
    "The underground pool of melted rock is the...|magma chamber|🔥||crater,cinder",
    "A wide volcano with gentle slopes is a...|shield volcano|🏔️||cinder cone,composite volcano",
    "A small, steep volcano made of loose bits is a...|cinder cone|🌋||shield volcano,composite volcano",
    "A tall cone built from layers of lava and ash is a...|composite volcano|🗻||shield volcano,cinder cone",
    "Mauna Loa in Hawaii is what type of volcano?|shield volcano|🌺||cinder cone,composite volcano",
    "A volcano that will never erupt again is called...|extinct|💤||active,erupting"
  ], "Think about where the melted rock is: below or above the ground."));
  g.push(L("How mountains form", [
    "Big pushes|⛰️|Mountains form when Earth's plates move. This takes millions of years.",
    "Fold and fault|🏔️|<b>Fold mountains</b> form when plates push together and crumple the crust, like the Himalayas and the Alps. <b>Fault-block mountains</b> form when big blocks of crust slide up along faults.",
    "Volcanic and dome|🌋|<b>Volcanic mountains</b> are built by lava and ash. <b>Dome mountains</b> form when rising magma pushes the land up like a bump."
  ], [
    "Mountains made when colliding plates crumple the crust are...|fold mountains|🏔️||dome mountains,volcanic mountains",
    "The Himalayas are what kind of mountains?|fold mountains|🏔️||volcanic mountains,dome mountains",
    "Mountains made from blocks of crust pushed up along faults are...|fault-block mountains|🧱||fold mountains,dome mountains",
    "Mountains built by erupting lava and ash are...|volcanic mountains|🌋||fold mountains,fault-block mountains",
    "Mountains pushed up like a bump by magma below are...|dome mountains|⛰️||fold mountains,volcanic mountains",
    "The highest mountain above sea level is...|Mount Everest|🏔️||Mount Fuji,Mount Rainier",
    "Which is a volcanic mountain?|Mount Fuji|🗻||Mount Everest,the Alps",
    "Making a mountain range takes...|millions of years|⏳||a few days,one week",
    "The Himalayas keep growing because plates keep...|pushing together|➡️⬅️||pulling apart,sinking"
  ], "Think about how the crust is moved to make each mountain."));
  g.push(L("Soil layers", [
    "Soil is alive|🪱|Soil is made of tiny bits of weathered rock mixed with <b>humus</b>, which is rotted plants and animals.",
    "Layers|🟫|<b>Topsoil</b> is the dark top layer full of humus and roots. <b>Subsoil</b> below has more clay and minerals. <b>Bedrock</b> is solid rock at the bottom.",
    "Slow to make|⏳|Soil takes hundreds of years to form. Earthworms and roots help mix it and let air in."
  ], [
    "The dark top layer of soil, full of humus, is...|topsoil|🟫||subsoil,bedrock",
    "The layer below topsoil with more clay is...|subsoil|🟤||topsoil,bedrock",
    "The solid rock layer at the bottom is...|bedrock|🪨||topsoil,subsoil",
    "Humus is made from...|decayed plants and animals|🍂||crushed glass,melted ice",
    "Plants grow best in the...|topsoil|🌱||bedrock,subsoil",
    "Which animal helps mix and loosen soil?|an earthworm|🪱||an eagle,a dolphin",
    "Soil takes about how long to form?|hundreds of years|⏳||a few minutes,one day",
    "Which soil layer is usually darkest?|topsoil|🟫||bedrock,subsoil",
    "Soil comes from tiny bits of ___ mixed with humus.|weathered rock|🪨||plastic,salt"
  ], "Think about which layer is on top and which is deepest."));
  g.push(L("Fossil fuels", [
    "Ancient energy|⛽|Coal, oil and natural gas are <b>fossil fuels</b>. They formed from dead plants and tiny sea life buried for millions of years.",
    "Using them|🏭|We burn them for electricity, heating and cars. Gasoline comes from oil. Burning them releases carbon dioxide.",
    "Running out|⏳|They are <b>nonrenewable</b>, because they take millions of years to form again."
  ], [
    "Coal formed mostly from ancient...|plants|🌿||metal,sand",
    "Oil formed mostly from tiny...|sea life|🌊||desert insects,rocks",
    "Which one is a fossil fuel?|natural gas|🔥||wind,sunlight",
    "Which one is NOT a fossil fuel?|solar power|☀️||coal,oil",
    "Fossil fuels take about how long to form?|millions of years|⏳||a few weeks,a few years",
    "Gasoline for cars comes from...|oil|🚗||wind,wood",
    "Burning fossil fuels releases...|carbon dioxide|🏭||helium,pure water",
    "Fossil fuels are called nonrenewable because they...|take millions of years to replace|♻️||grow back each spring,fall from the sky",
    "Which fossil fuel is a solid black rock?|coal|⚫||oil,natural gas"
  ], "Fossil fuels come from living things long, long ago."));
  g.push(L("Pollution and cleanup", [
    "Three kinds|🏭|<b>Air pollution</b> is dirty smoke and gas, like smog. <b>Water pollution</b> is trash, oil or chemicals in water. <b>Land pollution</b> is litter and waste on the ground.",
    "Where from?|🚗|Car exhaust and factories make air pollution. Spills and litter wash into rivers and the sea.",
    "Cleaning up|♻️|We can ride buses or bikes, plant trees, compost food scraps, recycle, and pick up litter."
  ], [
    "Smog is a kind of...|air pollution|🌫️||water pollution,land pollution",
    "An oil spill in the ocean is ___ pollution.|water|🛢️||air,land",
    "Litter on the ground is ___ pollution.|land|🗑️||air,water",
    "Which helps cut air pollution?|riding a bike or bus|🚲||driving alone everywhere,burning trash",
    "Compost turns food scraps into...|rich soil|🍎||plastic,smog",
    "Cars make air pollution from their...|exhaust|🚗||seats,tires' color",
    "Plastic bags take a ___ time to break down.|very long|⏳||one day,few hours",
    "Planting trees helps clean the...|air|🌳||bedrock,moon",
    "Which cuts down on waste?|using a refillable bottle|🚰||buying a new bottle every time,throwing bottles on the ground"
  ], "Which kind of pollution is it: air, water or land?"));
  g.push(L("Stars and constellations", [
    "Star pictures|⭐|A <b>constellation</b> is a pattern of stars that people named long ago, like Orion, the hunter, with three stars in a row for his belt.",
    "North Star|🧭|<b>Polaris</b>, the North Star, stays nearly still in the north. Travelers use it to find north. The Big Dipper looks like a ladle and points toward it.",
    "Moving sky|🌌|Stars seem to move across the night because Earth spins. We see different constellations in different seasons because Earth orbits the Sun."
  ], [
    "A pattern of stars with a name is a...|constellation|⭐||galaxy,comet",
    "The star that stays nearly still in the north is...|Polaris|🧭||the Sun,Orion",
    "Polaris helps travelers find...|north|🧭||south,the Moon",
    "Which constellation has three stars in a row as a belt?|Orion|🌟||Polaris,the Big Dipper",
    "The Big Dipper looks like a...|ladle|🥄||sailboat,crown",
    "Stars seem to move across the sky because...|Earth spins|🌍||stars race around us,the Moon pushes them",
    "We see different constellations in different seasons because Earth...|orbits the Sun|🔄||stops moving,gets bigger",
    "A star is different from a planet because a star makes its own...|light|💡||water,rocks",
    "The hottest stars look...|blue|🔵||red,green"
  ], "Think about what stars are and how we see them."));
  g.push(L("Moons and rings", [
    "Moons|🌙|Earth has one moon. Mars has two tiny moons. Mercury and Venus have none. Jupiter and Saturn have dozens.",
    "Special moons|🪐|<b>Ganymede</b>, near Jupiter, is the biggest moon in the solar system. <b>Europa</b> has an icy shell. <b>Titan</b> orbits Saturn and has thick air.",
    "Rings|💍|Saturn's bright rings are made of pieces of ice and rock. Jupiter, Uranus and Neptune have faint rings too."
  ], [
    "How many moons does Earth have?|one|🌙||two,none",
    "How many moons does Mars have?|two|🔴||none,one",
    "How many moons do Mercury and Venus have?|none|☿||one,two",
    "Saturn's rings are made of...|ice and rock pieces|🪐||solid metal,gas clouds",
    "The biggest moon in the solar system is...|Ganymede|🌕||Titan,Europa",
    "Titan orbits which planet?|Saturn|🪐||Jupiter,Mars",
    "Which moon has an icy shell and an ocean underneath?|Europa|🧊||Ganymede,Titan",
    "Which planet has the brightest, biggest rings?|Saturn|🪐||Mars,Venus",
    "Mars's moons are...|small|🔴||bigger than Earth's moon,bigger than Mars"
  ], "Remember how many moons each planet has."));
  g.push(L("Dwarf planets and the Kuiper belt", [
    "Dwarf planets|🪨|A <b>dwarf planet</b> orbits the Sun and is round, but it has not cleared other objects from its path. Pluto became a dwarf planet in 2006.",
    "The list|📋|Dwarf planets include <b>Pluto</b>, <b>Ceres</b> (in the asteroid belt), <b>Eris</b>, <b>Haumea</b> and <b>Makemake</b>.",
    "Kuiper belt|🧊|Past Neptune lies the <b>Kuiper belt</b>, a huge ring of icy bodies. Pluto is one of them."
  ], [
    "Pluto is a...|dwarf planet|🪐||star,moon",
    "In what year was Pluto named a dwarf planet?|2006|📅||1930,1990",
    "The largest object in the asteroid belt, a dwarf planet, is...|Ceres|🪨||Eris,Neptune",
    "The Kuiper belt lies beyond...|Neptune|🧊||Mars,Jupiter",
    "The Kuiper belt is made mostly of...|icy bodies|🧊||gas clouds,hot stars",
    "A dwarf planet has not...|cleared its path|🛣️||orbited the Sun,been round",
    "Which one is a dwarf planet?|Eris|🪐||Venus,Saturn",
    "A dwarf planet orbits the...|Sun|☀️||Earth,Moon",
    "Ceres is found between which two planets?|Mars and Jupiter|🪨||Earth and Venus,Saturn and Uranus"
  ], "Think about where each object is in the solar system."));
  g.push(L("Telescopes and probes", [
    "Telescopes|🔭|A telescope makes faraway things look bigger and brighter. <b>Refracting</b> telescopes use lenses. <b>Reflecting</b> telescopes use mirrors.",
    "Above the air|🛰️|The <b>Hubble Space Telescope</b> orbits Earth. Above the air it sees clearer pictures. Some telescopes collect radio waves.",
    "Robot explorers|🤖|A <b>probe</b> flies far without people. An <b>orbiter</b> circles a planet. A <b>rover</b> drives on its surface."
  ], [
    "A telescope that uses mirrors is a...|reflecting telescope|🔭||refracting telescope,microscope",
    "A telescope that uses lenses is a...|refracting telescope|🔭||reflecting telescope,microscope",
    "Why is Hubble in space?|air blurs views from the ground|🛰️||it is closer to the Sun,it is hotter there",
    "A robot that drives on another world is a...|rover|🤖||orbiter,satellite",
    "A spacecraft that circles a planet is an...|orbiter|🛰️||rover,lander",
    "Voyager 1 is a space...|probe|🚀||station,telescope",
    "Telescopes make faraway objects look...|bigger and brighter|🔭||smaller and darker,wavy",
    "A telescope that collects radio waves is a...|radio telescope|📡||sound telescope,rain telescope",
    "A craft that flies far to study space without people on board is a...|probe|🚀||rover,hot-air balloon"
  ], "Think about what each kind of space tool does."));
  g.push(L("Calendars and time zones", [
    "Day and year|📅|Earth spins once in about 24 hours: a day. It orbits the Sun in about 365 and a quarter days: a year.",
    "Leap years|🗓️|Those extra quarter days add up. Every 4 years we add February 29. That year is a <b>leap year</b>, like 2024 or 2028.",
    "Time zones|🕐|The Sun is high at different times in different places. So Earth has about 24 <b>time zones</b>. Places to the east have later times."
  ], [
    "Earth takes about how many days to orbit the Sun?|365|🌍||300,400",
    "Which day is added in a leap year?|February 29|🗓️||January 1,December 32",
    "Leap years come every...|4 years|🗓️||2 years,10 years",
    "About how many time zones does Earth have?|24|🕐||12,60",
    "We have time zones because Earth...|spins, so the Sun shines on places at different times|🌍||is flat,has two Moons",
    "Places to the east have a ___ time than places to the west.|later|🕐||earlier,the same",
    "Earth spins once in about...|24 hours|🌍||1 hour,365 days",
    "Which year is a leap year?|2028|🗓️||2026,2027",
    "Which year is a leap year?|2024|🗓️||2023,2025"
  ], "Think about Earth's spin and orbit."));
  g.push(L("Landforms made by water", [
    "Water carves|🏞️|Moving water wears rock away and drops sand and mud somewhere else. It makes many landforms.",
    "River forms|🌊|A river cuts a <b>canyon</b>, like the Grand Canyon. It bends in curves called <b>meanders</b>. At its mouth it drops mud to build a <b>delta</b>.",
    "Caves|🦇|Water can dissolve limestone and make a <b>cave</b>. Hanging rock spikes are <b>stalactites</b>. Spikes growing up are <b>stalagmites</b>."
  ], [
    "A deep valley cut by a river is a...|canyon|🏞️||delta,dune",
    "Mud dropped where a river meets the sea builds a...|delta|🌊||canyon,glacier",
    "Curves in a river are called...|meanders|〰️||deltas,stalactites",
    "Which Colorado River landform is very famous?|the Grand Canyon|🏜️||Mount Everest,the Great Lakes",
    "Water can dissolve limestone to make a...|cave|🕳️||volcano,dune",
    "Cave spikes that hang from the ceiling are...|stalactites|🦇||stalagmites,deltas",
    "Cave spikes that grow up from the floor are...|stalagmites|🦇||stalactites,meanders",
    "A river can carry sand and mud. When it slows down it...|drops it|🏖️||dissolves it,burns it",
    "Water falling over a cliff makes a...|waterfall|💦||delta,dune"
  ], "Think about whether water is wearing rock away or dropping things."));
  g.push(MIX("Mixed practice", [g[0], g[2], g[4], g[6], g[8], g[10], g[12], g[14], g[16]]));
  g.push(MIX("Level 7 Challenge", [g[1], g[3], g[5], g[7], g[9], g[11], g[13], g[15], g[17]]));

  // ================= LEVEL 8 =================
  const h = [];
  h.push(L("The greenhouse effect", [
    "A warm blanket|🌡️|Sunlight warms Earth. Some gases in the air, called <b>greenhouse gases</b>, hold some of that heat in, like a blanket.",
    "Good and too much|🌍|Without any greenhouse effect Earth would be too cold for most life. But extra gases make the planet warm up more.",
    "Which gases?|🏭|Carbon dioxide, methane and water vapor are greenhouse gases. Burning coal, oil and gas adds more carbon dioxide. Trees take it in."
  ], [
    "Gases that trap heat are called...|greenhouse gases|🌡️||helium gases,noble gases",
    "Which one is a greenhouse gas?|carbon dioxide|🏭||oxygen,nitrogen",
    "The greenhouse effect acts like a...|blanket|🛏️||mirror,fan",
    "Without any greenhouse effect Earth would be...|too cold for most life|🥶||too windy to breathe,perfectly the same",
    "Burning fossil fuels adds ___ to the air.|carbon dioxide|🏭||oxygen,pure water",
    "Which planet has a very strong greenhouse effect?|Venus|🪐||Neptune,Mars",
    "Trees help the air by taking in...|carbon dioxide|🌳||smoke,methane",
    "Which gas is also a greenhouse gas?|methane|☁️||oxygen,argon",
    "Extra heat trapped by greenhouse gases makes the air...|warmer|🌡️||colder,heavier"
  ], "Think about which gases hold heat in."));
  h.push(L("Climate change", [
    "Changing climate|🌍|<b>Climate change</b> means the average weather of Earth is changing over many years. Earth has warmed about 1 degree Celsius since the 1800s.",
    "Effects|🧊|Warming melts glaciers and ice sheets, so sea level rises. It can also bring more heat waves and stronger hurricanes.",
    "What we can do|🌱|Use clean energy like sun and wind, save energy, plant trees, walk or bike, and waste less."
  ], [
    "Climate change means long-term changes in...|average weather|🌍||yesterday's rain,one storm",
    "When glaciers and ice sheets melt, sea level...|rises|🌊||falls,stays flat",
    "Which action helps slow climate change?|using clean energy like solar|☀️||burning more coal,leaving lights on",
    "Which adds greenhouse gases to the air?|burning lots of coal and oil|🏭||planting forests,using wind power",
    "Climate is usually measured over about...|30 years|📅||one day,one hour",
    "Scientists learn about past climates by studying...|ice cores|🧊||clouds today,seashells' colors",
    "Warmer oceans can power stronger...|hurricanes|🌀||earthquakes,eclipses",
    "Turning off lights saves energy and helps cut...|pollution|💡||sunshine,gravity",
    "Which is a clean, renewable energy?|wind power|🌬️||coal power,oil power"
  ], "Think about what heats the planet and what cools it."));
  h.push(L("Forecasting the weather", [
    "Predicting|🔮|A <b>forecast</b> is a prediction of future weather. <b>Meteorologists</b> make forecasts using lots of data.",
    "Tools|🛰️|Weather <b>satellites</b> watch clouds from space. <b>Radar</b> finds rain and storms. <b>Weather balloons</b> measure the air high up. <b>Weather stations</b> measure the ground.",
    "Computers|💻|Powerful computers use all the data to predict. A forecast of 70% chance of rain means rain is likely."
  ], [
    "A scientist who forecasts weather is a...|meteorologist|🌦️||geologist,archaeologist",
    "Which tool watches clouds from space?|a weather satellite|🛰️||a rain gauge,a weather balloon",
    "Which tool finds rain and storms near you?|radar|📡||a barometer,a ruler",
    "What does a weather balloon measure?|the air high up|🎈||ocean depth,earthquakes",
    "A forecast is a...|prediction|🔮||memory,recording",
    "A forecast of 90% chance of rain means rain is...|very likely|☔||very unlikely,impossible",
    "A forecast of 10% chance of rain means rain is...|unlikely|🌤️||very likely,certain",
    "Forecasts use computers to work with lots of...|data|💻||paint,sand",
    "Forecasts for tomorrow are usually ___ than forecasts for next month.|more accurate|📅||less accurate,never different"
  ], "Think about what each weather tool measures."));
  h.push(L("Sea breezes and monsoons", [
    "Land warms fast|🏖️|Land heats up and cools down faster than water. Warm air rises, and cooler air flows in to take its place. That flow is wind.",
    "Breezes|🌬️|In the day, air over land rises and a cool <b>sea breeze</b> blows in. At night the land cools, so a <b>land breeze</b> blows out to sea.",
    "Monsoons|☔|A <b>monsoon</b> is a wind that changes with the season. The summer monsoon in South Asia brings heavy rain."
  ], [
    "During the day, land warms faster than the...|sea|🏖️||sky,mountains",
    "A daytime sea breeze blows from...|sea to land|🌬️||land to sea,up to space",
    "A night-time land breeze blows from...|land to sea|🌙||sea to land,the poles to the equator",
    "Warm air...|rises|🔥||sinks,stands still",
    "A monsoon is a wind that changes with the...|season|🍂||hour,tide",
    "The summer monsoon in India brings...|heavy rain|🌧️||deep snow,thick fog",
    "A sea breeze on a hot day makes the coast feel...|cooler|🏖️||hotter,darker",
    "At night the sea is warmer than the land, so air rises over the...|sea|🌊||land,desert",
    "Wind is air moving from a high-pressure area to a...|low-pressure area|💨||another high-pressure area,the Moon"
  ], "Remember that warm air rises and cool air moves in."));
  h.push(L("Storm scales and safety", [
    "Rating storms|🌀|Hurricanes are rated 1 to 5 on the <b>Saffir-Simpson scale</b> by wind speed. Tornadoes are rated EF0 to EF5 on the <b>Enhanced Fujita scale</b> by the damage they do.",
    "Watch or warning|⚠️|A <b>watch</b> means a storm could form. A <b>warning</b> means it is happening or about to, so take shelter now.",
    "Be safe|🏠|In a tornado, go to an inside room on the lowest floor, away from windows. Hurricanes form over warm ocean water and weaken over land."
  ], [
    "Hurricanes are rated 1 to 5 on the ___ scale.|Saffir-Simpson|🌀||Richter,Beaufort-Fahrenheit",
    "The strongest hurricane category is...|5|🌀||1,10",
    "Tornadoes are rated on the...|Enhanced Fujita scale|🌪️||Saffir-Simpson scale,Mohs scale",
    "A tornado warning means...|a tornado is happening or about to, so take cover|⚠️||a tornado could form someday,the sky is blue",
    "A tornado watch means a tornado...|could form|👀||is on your street now,cannot happen",
    "Hurricane categories are based on...|wind speed|💨||rainfall color,time of day",
    "In a tornado, the safest place is...|an inside room on the lowest floor|🏠||next to a window,on the roof",
    "Hurricanes form over...|warm ocean water|🌊||cold mountains,dry deserts",
    "In the western Pacific Ocean, hurricanes are called...|typhoons|🌀||tsunamis,blizzards"
  ], "Think about what each scale or word is used for."));
  h.push(L("Inside the Earth, in detail", [
    "Crust|🪨|The <b>crust</b> is the thin top layer. <b>Oceanic crust</b> is thin and heavy. <b>Continental crust</b> is thick and lighter.",
    "Mantle|🔥|The <b>mantle</b> is the thickest layer. Its hot rock flows very slowly. The crust and the top of the mantle make a hard shell called the <b>lithosphere</b>.",
    "Core|🧲|The <b>outer core</b> is liquid iron and nickel. The <b>inner core</b> is solid iron and nickel, held solid by huge pressure. Moving liquid metal makes Earth's magnetic field."
  ], [
    "Which layer is the thickest?|mantle|🔥||crust,inner core",
    "The outer core is...|liquid|💧||solid,gas",
    "The inner core is...|solid|🧊||liquid,gas",
    "The core is mostly made of iron and...|nickel|🧲||gold,copper",
    "Which layer is the thinnest?|crust|🪨||mantle,outer core",
    "Which crust is thinner?|oceanic crust|🌊||continental crust,mantle crust",
    "The crust and upper mantle make a hard shell called the...|lithosphere|🪨||atmosphere,hydrosphere",
    "The inner core stays solid because of huge...|pressure|⬇️||wind,rain",
    "Earth's magnetic field is made by moving liquid metal in the...|outer core|🧲||crust,mantle"
  ], "Think about the order of the layers from the surface down."));
  h.push(L("Plate boundaries", [
    "Moving plates|🌍|Earth's lithosphere is cracked into plates. They move a few centimeters a year. Where they meet is a <b>boundary</b>.",
    "Three kinds|↔️|<b>Convergent</b>: plates push together (mountains, trenches, volcanoes). <b>Divergent</b>: plates move apart (new crust, rift valleys). <b>Transform</b>: plates slide past each other.",
    "Famous places|📍|The San Andreas Fault in California is a transform boundary. The Mid-Atlantic Ridge is a divergent boundary."
  ], [
    "Plates pushing together make a ___ boundary.|convergent|➡️⬅️||divergent,transform",
    "Plates moving apart make a ___ boundary.|divergent|⬅️➡️||convergent,transform",
    "Plates sliding past each other make a ___ boundary.|transform|↕️||convergent,divergent",
    "The San Andreas Fault is a ___ boundary.|transform|📍||convergent,divergent",
    "The Mid-Atlantic Ridge is a ___ boundary.|divergent|🌊||convergent,transform",
    "At a divergent boundary, new ___ forms.|crust|🪨||oceans of air,clouds",
    "Fold mountains usually form at ___ boundaries.|convergent|🏔️||divergent,transform",
    "How fast do plates move?|a few centimeters a year|🐌||a few meters an hour,as fast as a car",
    "Where plates grind past each other, we often feel...|earthquakes|🏚️||blizzards,eclipses"
  ], "Think about the direction the plates move."));
  h.push(L("Ring of Fire and hot spots", [
    "Ring of Fire|🔥|Around the Pacific Ocean is a ring of plate edges called the <b>Ring of Fire</b>. It has most of the world's volcanoes and earthquakes.",
    "Hot spots|🌋|A <b>hot spot</b> is a place where hot rock rises from deep inside Earth, even in the middle of a plate.",
    "Islands|🏝️|The Hawaiian Islands formed over a hot spot as the Pacific Plate slid over it. Yellowstone also sits on a hot spot."
  ], [
    "The Ring of Fire surrounds the...|Pacific Ocean|🌊||Atlantic Ocean,Sahara",
    "The Ring of Fire has many...|volcanoes and earthquakes|🔥||glaciers and deserts,rainforests only",
    "A hot spot is where hot rock rises from...|deep inside Earth|🌋||the Moon,the clouds",
    "The Hawaiian Islands formed over a...|hot spot|🏝️||trench,glacier",
    "Japan has many earthquakes because it sits on the...|Ring of Fire|🗾||Sahara,Arctic Circle",
    "Yellowstone National Park sits over a...|hot spot|♨️||desert,glacier",
    "Which country is on the Ring of Fire?|Japan|🗾||Egypt,Brazil",
    "Hawaii is in the middle of a plate, so its volcanoes come from a...|hot spot|🌺||plate edge,tsunami",
    "The Ring of Fire is named for its...|volcanoes|🌋||sunshine,snow"
  ], "Think about where the Ring of Fire is and why it is called that."));
  h.push(L("Pangaea and drifting continents", [
    "Jigsaw coasts|🧩|The coast of South America fits the coast of Africa like a puzzle. In 1912 Alfred Wegener said continents drift. This is <b>continental drift</b>.",
    "Pangaea|🌎|More than 200 million years ago the land was one giant <b>supercontinent</b> called <b>Pangaea</b>. It slowly broke apart.",
    "Evidence|🦴|The same fossils and rocks are found on continents now far apart. Plate tectonics explains it: continents ride on moving plates."
  ], [
    "The giant supercontinent was called...|Pangaea|🌍||Atlantis,Eurasia",
    "The idea that continents slowly move is...|continental drift|🧭||continental slide,plate balance",
    "Same fossils on far-apart continents suggest they were once...|joined|🧩||bigger,frozen",
    "South America's east coast fits with Africa's...|west coast|🧩||east coast,north coast",
    "Continents move about as fast as...|fingernails grow|💅||cars drive,rockets fly",
    "Plate tectonics says continents ride on...|moving plates|🌍||the ocean surface,giant icebergs",
    "The Atlantic Ocean is slowly getting...|wider|🌊||smaller,hotter",
    "Pangaea began breaking up about...|200 million years ago|⏳||2 thousand years ago,2 million years ago",
    "Pangaea means...|all the land|🌍||two oceans,north and south"
  ], "Think about what the matching coasts and fossils tell us."));
  h.push(L("Igneous, sedimentary, metamorphic", [
    "Igneous|🌋|<b>Igneous</b> rock forms from cooled magma or lava. Slow cooling underground makes big crystals (granite). Fast cooling makes small crystals (basalt).",
    "Sedimentary|🏖️|<b>Sedimentary</b> rock forms when layers of sand, mud and shells are pressed and cemented. Sandstone and limestone are examples. Fossils are found here.",
    "Metamorphic|🔥|<b>Metamorphic</b> rock is changed by heat and pressure. Limestone becomes marble. Shale becomes slate."
  ], [
    "Rock made from cooled lava or magma is...|igneous|🌋||sedimentary,metamorphic",
    "Rock made of pressed layers of sand and mud is...|sedimentary|🏖️||igneous,metamorphic",
    "Rock changed by heat and pressure is...|metamorphic|🔥||igneous,sedimentary",
    "Granite is an example of ___ rock.|igneous|🪨||sedimentary,metamorphic",
    "Sandstone is an example of ___ rock.|sedimentary|🏜️||igneous,metamorphic",
    "Marble is made when ___ is changed by heat and pressure.|limestone|🏛️||basalt,sandstone",
    "Slow cooling underground makes rock with ___ crystals.|large|💎||tiny,no",
    "Fossils are usually found in ___ rock.|sedimentary|🦴||igneous,metamorphic",
    "Basalt cools quickly, so it has ___ crystals.|small|🌋||large,giant"
  ], "Think about how each kind of rock is made."));
  h.push(L("Reading rock layers", [
    "Layer cake|🍰|Sediments pile up in layers. In undisturbed layers, the oldest is on the bottom and the youngest on top. This is the <b>law of superposition</b>.",
    "Relative or exact|📏|<b>Relative age</b> says which is older or younger. <b>Absolute age</b> gives a number of years, found by measuring slowly decaying atoms in rock.",
    "Index fossils|🦴|<b>Index fossils</b> are from creatures that lived a short time in many places. Finding one tells the age of a layer."
  ], [
    "In undisturbed rock layers, the oldest layer is on the...|bottom|⬇️||top,side",
    "In undisturbed rock layers, the youngest layer is on the...|top|⬆️||bottom,middle",
    "A fossil in a lower layer is ___ than one in a higher layer.|older|🦴||younger,the same age",
    "Saying one rock is older than another gives its...|relative age|📏||absolute age,mass",
    "A number of years, like 50 million, is an...|absolute age|🔢||relative age,unknown age",
    "Fossils that help tell the age of layers are called...|index fossils|🦴||flag fossils,mirror fossils",
    "Scientists who study fossils are called...|paleontologists|🔬||seismologists,meteorologists",
    "Fossils form best when an organism is buried...|quickly|⏩||slowly,in the air",
    "Fossils are usually found in ___ rock.|sedimentary|🪨||igneous,metamorphic"
  ], "The layer at the bottom was laid down first."));
  h.push(L("Geologic time", [
    "Deep time|⏳|Earth is about <b>4.5 billion</b> years old. Scientists split its history into long eras.",
    "Three eras|🦕|<b>Paleozoic</b>: first fish, land plants and trilobites. <b>Mesozoic</b>: the age of dinosaurs. <b>Cenozoic</b>: mammals, and us. We live in the Cenozoic.",
    "Tiny time|⏱️|Dinosaurs died out about 66 million years ago. If Earth's history were a day, people would show up in the last few seconds."
  ], [
    "About how old is Earth?|4.5 billion years|🌍||4.5 million years,45 thousand years",
    "The age of the dinosaurs was the...|Mesozoic Era|🦕||Paleozoic Era,Cenozoic Era",
    "We live in the...|Cenozoic Era|🌍||Mesozoic Era,Paleozoic Era",
    "Dinosaurs died out about...|66 million years ago|☄️||6 thousand years ago,6 billion years ago",
    "The era of trilobites and the first fish was the...|Paleozoic Era|🐟||Mesozoic Era,Cenozoic Era",
    "If Earth's history were one day, people appear in the...|last few seconds|⏱️||first hour,middle of the day",
    "Most of Earth's history is called...|Precambrian time|⏳||the Ice Age,the Space Age",
    "The geologic time scale splits Earth's history into...|eras and periods|📅||hours and minutes,only weeks",
    "Which came first?|Paleozoic Era|🐟||Cenozoic Era,Mesozoic Era"
  ], "Remember the order: Paleozoic, Mesozoic, Cenozoic."));
  h.push(L("Fresh water and salt water", [
    "Salty Earth|🌊|About 97% of Earth's water is salt water in the oceans. Only about 3% is fresh water.",
    "Locked up|🧊|Most fresh water is frozen in glaciers and ice sheets. Some is underground. Only a tiny part is in lakes and rivers.",
    "Drinking|🚰|We cannot drink seawater because it has too much salt. <b>Desalination</b> removes the salt but costs a lot of energy."
  ], [
    "Most of Earth's water is...|salt water|🌊||fresh water,ice",
    "About how much of Earth's water is salty?|97%|🌊||50%,10%",
    "Most fresh water is stored as...|ice|🧊||clouds,rivers",
    "Water without much salt is called...|fresh water|🚰||sea water,brine",
    "Removing the salt from seawater is called...|desalination|🧂||evaporation,irrigation",
    "We cannot drink seawater because it has too much...|salt|🧂||oxygen,ice",
    "The amount of fresh water in lakes and rivers is...|tiny|💧||most of the water,half of all water",
    "Which place holds the most fresh-water ice?|Antarctica|🧊||the Sahara,Lake Michigan",
    "Water stored in rocks underground is called...|groundwater|💧||sea ice,rain gauge"
  ], "Think about how much of Earth's water is in the ocean."));
  h.push(L("Ocean floor features", [
    "Under the sea|🌊|The ocean floor has land shapes too. Near the coast is the shallow <b>continental shelf</b>. Then the <b>slope</b> drops down to the flat <b>abyssal plain</b>.",
    "Ridges and trenches|🏔️|A <b>mid-ocean ridge</b> is an underwater mountain chain where new crust forms. A <b>trench</b> is a very deep canyon where one plate dives under another.",
    "Record|📏|The deepest place is the Mariana Trench in the Pacific, nearly 11 kilometers deep. The Pacific is the largest ocean."
  ], [
    "The shallow edge of a continent under the sea is the...|continental shelf|🌊||trench,ridge",
    "The flat, deep part of the ocean floor is the...|abyssal plain|🌊||continental shelf,volcano",
    "An underwater mountain chain where new crust forms is a...|mid-ocean ridge|🏔️||trench,shelf",
    "A very deep canyon on the ocean floor is a...|trench|🕳️||ridge,delta",
    "The deepest place in the ocean is the...|Mariana Trench|📏||Grand Canyon,Mid-Atlantic Ridge",
    "The Mariana Trench is about how deep?|11 kilometers|📏||1 kilometer,100 meters",
    "The largest ocean is the...|Pacific Ocean|🌊||Atlantic Ocean,Indian Ocean",
    "A mountain under the sea that rose from the floor is a...|seamount|🌋||delta,dune",
    "Fish and sea life are most plentiful on the...|continental shelf|🐟||abyssal plain,trench floor"
  ], "Think about shallow near the coast and deep far away."));
  h.push(L("Inside the Sun", [
    "Core|☀️|The <b>core</b> of the Sun is about 15 million °C. Here hydrogen squeezes together to make helium in <b>nuclear fusion</b>. This makes the Sun's energy.",
    "Surface|🔥|The glowing surface we see is the <b>photosphere</b>, about 5,500°C. Cooler dark patches on it are <b>sunspots</b>. Bursts of energy are <b>solar flares</b>.",
    "Outer layer|👑|The <b>corona</b> is the Sun's outer atmosphere. We see it when the Moon blocks the Sun in an eclipse. The <b>solar wind</b> is a stream of particles from it."
  ], [
    "Where does the Sun make its energy?|the core|☀️||the corona,the sunspots",
    "In the core, hydrogen joins to make...|helium|⚛️||oxygen,iron",
    "The Sun's visible surface is the...|photosphere|☀️||corona,core",
    "The outer atmosphere of the Sun is the...|corona|👑||core,photosphere",
    "Cooler, darker patches on the Sun are...|sunspots|⚫||solar flares,eclipses",
    "A sudden burst of energy from the Sun is a...|solar flare|💥||sunspot,solar wind",
    "A stream of particles from the Sun is the...|solar wind|💨||sea breeze,jet stream",
    "The Sun is mostly...|hydrogen and helium|☀️||iron and nickel,rock and ice",
    "How many Earths could fit inside the Sun?|over a million|🌍||about 100,about 1,000"
  ], "Think about which part of the Sun is deep inside and which is outside."));
  h.push(L("The life of a star", [
    "Birth|🌌|Stars are born in a <b>nebula</b>, a cloud of gas and dust. Gravity pulls it together until it heats up and starts to shine.",
    "Long life|☀️|Most of a star's life is spent steadily shining. Our Sun is about halfway through a life of around 10 billion years. Later it will swell into a <b>red giant</b>, then shrink into a <b>white dwarf</b>.",
    "Big stars|💥|Very massive stars end in a huge explosion called a <b>supernova</b>. What is left may be a neutron star or a <b>black hole</b>."
  ], [
    "Stars are born in a cloud of gas and dust called a...|nebula|🌌||comet,crater",
    "What pulls a nebula together to form a star?|gravity|⬇️||wind,magnets",
    "Our Sun will one day swell into a...|red giant|🔴||blue nebula,black planet",
    "A small star like the Sun ends as a...|white dwarf|⚪||supernova,comet",
    "A huge star explodes in a...|supernova|💥||nebula,eclipse",
    "A very massive star can leave behind a...|black hole|⚫||white planet,new moon",
    "Our Sun is about how old?|4.6 billion years|☀️||4.6 million years,46 thousand years",
    "Most of a star's life is spent...|steadily shining|⭐||exploding,hiding",
    "Hot stars look blue and cooler stars look...|red|🔴||purple,white-green"
  ], "Think about the order of a star's life."));
  h.push(L("Light-years", [
    "Light is fast|💡|Light travels about 300,000 kilometers every second. Nothing travels faster.",
    "A light-year|📏|A <b>light-year</b> is the distance light travels in one year, about 9.5 trillion kilometers. It measures <b>distance</b>, not time.",
    "Looking back|🔭|Sunlight takes about 8 minutes to reach us. The nearest star after the Sun, <b>Proxima Centauri</b>, is 4.2 light-years away. We see it as it was 4.2 years ago."
  ], [
    "A light-year measures...|distance|📏||time,brightness",
    "Sunlight takes about how long to reach Earth?|8 minutes|☀️||8 seconds,8 days",
    "Moonlight takes about how long to reach Earth?|1 second|🌙||8 minutes,1 day",
    "The nearest star after the Sun is...|Proxima Centauri|⭐||Polaris,Sirius",
    "Nothing travels faster than...|light|💡||sound,rockets",
    "A star 10 light-years away: we see light that left it...|10 years ago|🔭||10 days ago,yesterday",
    "About how fast does light travel?|300,000 km per second|💡||300 km per second,30 km per hour",
    "Looking at faraway stars is like looking back in...|time|⏳||space-flight,place",
    "A light-year is the distance light travels in...|one year|📅||one second,one day"
  ], "A light-year is about distance, not about clocks."));
  h.push(L("Galaxies", [
    "Star cities|🌌|A <b>galaxy</b> is a huge group of stars, gas and dust held together by gravity. Our galaxy is the <b>Milky Way</b>, with over 100 billion stars.",
    "Shapes|🌀|Galaxies can be <b>spiral</b>, <b>elliptical</b> (oval) or <b>irregular</b> (no clear shape). The Milky Way is a spiral. Our Sun is in one of its arms.",
    "Neighbors|🔭|<b>Andromeda</b> is a big spiral galaxy about 2.5 million light-years away. The universe has billions of galaxies."
  ], [
    "A huge group of stars held together by gravity is a...|galaxy|🌌||comet,constellation",
    "Our galaxy is called the...|Milky Way|🌌||Andromeda,Big Dipper",
    "The Milky Way has more than how many stars?|100 billion|⭐||100 thousand,100 million",
    "The Milky Way's shape is a...|spiral|🌀||oval blob,square",
    "A galaxy shaped like an oval is...|elliptical|🥚||spiral,irregular",
    "A galaxy with no clear shape is...|irregular|☁️||spiral,elliptical",
    "A big spiral galaxy near the Milky Way is...|Andromeda|🌌||Orion,Polaris",
    "What holds a galaxy together?|gravity|⬇️||wind,glue",
    "Our Sun is just one star in the...|Milky Way|🌌||Andromeda,Sun cluster"
  ], "A galaxy is much bigger than a solar system."));
  h.push(MIX("Mixed practice", [h[0], h[2], h[4], h[6], h[8], h[10], h[12], h[14], h[16]]));
  h.push(MIX("Level 8 Challenge", [h[1], h[3], h[5], h[7], h[9], h[11], h[13], h[15], h[17]]));

  // ================= LEVEL 9 =================
  const k = [];
  k.push(L("Size of the solar system", [
    "A yardstick in space|📏|Scientists use the <b>astronomical unit</b> (AU). 1 AU is the distance from Earth to the Sun, about 150 million kilometers.",
    "Far planets|🪐|Jupiter is about 5 AU from the Sun. Saturn is about 9.5 AU. Neptune is about 30 AU. Sunlight takes about 8 minutes to cross 1 AU.",
    "Mostly Sun|☀️|The Sun holds almost all of the solar system's mass. The planets formed from a spinning disk of gas and dust about 4.6 billion years ago."
  ], [
    "1 AU is the distance from...|Earth to the Sun|📏||Earth to the Moon,Earth to Mars",
    "About how many kilometers is 1 AU?|150 million|📏||150 thousand,150 billion",
    "Neptune is about how far from the Sun?|30 AU|🔵||3 AU,300 AU",
    "Jupiter is about how far from the Sun?|5 AU|🟠||1 AU,50 AU",
    "A planet at 5 AU is ___ from the Sun than Earth.|farther|🪐||closer,the same",
    "What has most of the solar system's mass?|the Sun|☀️||Jupiter,the asteroid belt",
    "The planets formed from a spinning disk of...|gas and dust|🌀||water and ice only,iron bars",
    "The solar system is about how old?|4.6 billion years|⏳||4.6 million years,460 years",
    "Which planet is about 0.4 AU from the Sun?|Mercury|☿||Mars,Uranus"
  ], "Think: is the planet nearer or farther than Earth?"));
  k.push(L("Planet records", [
    "Small and hot|☿|<b>Mercury</b> is the smallest planet and the closest to the Sun. <b>Venus</b> is the hottest, about 465°C, because of its thick carbon dioxide air.",
    "Red and giant|🔴|<b>Mars</b> is red from rusty iron and has <b>Olympus Mons</b>, the tallest volcano in the solar system. <b>Jupiter</b> is the biggest planet and has a giant storm.",
    "Far away|🔵|<b>Saturn</b> is so light for its size it would float in a huge bathtub. <b>Uranus</b> spins tipped on its side. <b>Neptune</b> is farthest and has fierce winds."
  ], [
    "The smallest planet is...|Mercury|☿||Mars,Venus",
    "The hottest planet is...|Venus|🪐||Mercury,Mars",
    "The biggest planet is...|Jupiter|🟠||Saturn,Neptune",
    "The tallest volcano in the solar system, Olympus Mons, is on...|Mars|🔴||Venus,Earth",
    "Mars looks red because of...|rusty iron|🔴||red paint,hot lava",
    "Which planet is tipped on its side?|Uranus|🔵||Mercury,Earth",
    "Which planet is farthest from the Sun?|Neptune|🔵||Saturn,Uranus",
    "Which planet would float in water because it is so light for its size?|Saturn|🪐||Jupiter,Earth",
    "Venus is hotter than Mercury because of its...|thick carbon dioxide air|☁️||nearness to Earth,many moons"
  ], "Think about each planet's special fact."));
  k.push(L("Orbits and years", [
    "Ellipses|🔄|Planets orbit the Sun in slightly squashed circles called <b>ellipses</b>. One trip around is one <b>year</b> on that planet.",
    "Close and fast|⚡|Planets closer to the Sun move faster and have shorter years. Mercury's year is 88 Earth days. Venus: 225 days. Mars: 687 days.",
    "Far and slow|🐢|Jupiter takes about 12 Earth years to go around, Saturn about 29, and Neptune about 165 years."
  ], [
    "A planet's orbit is a squashed circle called an...|ellipse|🔄||square,triangle",
    "One orbit around the Sun is one...|year|📅||day,month",
    "Which planet has the shortest year?|Mercury|☿||Mars,Neptune",
    "Mercury's year is about...|88 Earth days|☿||88 Earth years,365 Earth days",
    "A year on Mars lasts about...|687 Earth days|🔴||365 Earth days,88 Earth days",
    "A year on Jupiter lasts about...|12 Earth years|🟠||12 Earth days,100 Earth years",
    "Planets farther from the Sun orbit...|more slowly|🐢||faster,at the same speed",
    "Which planet has the longest year?|Neptune|🔵||Venus,Mars",
    "Neptune takes about how long to orbit?|165 Earth years|🔵||16 Earth days,1 Earth year"
  ], "Closer to the Sun means a faster and shorter orbit."));
  k.push(L("Gravity, mass and weight", [
    "Mass and weight|⚖️|<b>Mass</b> is how much matter something has. It stays the same everywhere. <b>Weight</b> is how hard gravity pulls on that mass. It changes from world to world.",
    "Moon weight|🌙|The Moon's gravity is about 1/6 of Earth's. A person weighs only 1/6 as much on the Moon, so they can jump higher.",
    "Bigger pulls|🪐|Bigger planets pull harder. Jupiter's gravity is about 2.5 times Earth's, so you would weigh much more there."
  ], [
    "How much matter something has is its...|mass|⚖️||weight,height",
    "How hard gravity pulls on something is its...|weight|⚖️||mass,volume",
    "Your mass on the Moon compared with Earth is...|the same|🌙||smaller,bigger",
    "Your weight on the Moon compared with Earth is...|smaller|🌙||bigger,the same",
    "The Moon's gravity is about ___ of Earth's.|one sixth|🌙||six times,half",
    "If you weigh 60 pounds on Earth, on the Moon you weigh about...|10 pounds|🌙||360 pounds,30 pounds",
    "If you weigh 30 pounds on Earth, on the Moon you weigh about...|5 pounds|🌙||180 pounds,15 pounds",
    "On which planet would you weigh the most?|Jupiter|🟠||Mars,Mercury",
    "Gravity pulls things toward the ___ of a planet.|center|⬇️||edge,north pole"
  ], "Mass stays the same. Weight depends on gravity."));
  k.push(L("A history of space exploration", [
    "First steps|🛰️|In 1957 the first satellite, <b>Sputnik 1</b>, orbited Earth. In 1961 <b>Yuri Gagarin</b> became the first person in space.",
    "To the Moon|🌙|In 1969 <b>Apollo 11</b> landed the first people on the Moon. Neil Armstrong and Buzz Aldrin walked there.",
    "Later|🔭|The Hubble Space Telescope launched in 1990. The International Space Station has been crewed since 2000. Rovers like Curiosity (2012) explore Mars."
  ], [
    "The first artificial satellite was...|Sputnik 1|🛰️||Hubble,Apollo 11",
    "Who was the first person in space?|Yuri Gagarin|🚀||Neil Armstrong,Buzz Aldrin",
    "Apollo 11 landed the first people on...|the Moon|🌙||Mars,Venus",
    "Apollo 11 landed on the Moon in...|1969|📅||1939,1999",
    "The first satellite was launched in...|1957|📅||1857,1997",
    "The Hubble Space Telescope launched in...|1990|🔭||1890,2010",
    "Curiosity is a ___ on Mars.|rover|🤖||satellite,space station",
    "People have lived on the International Space Station since...|2000|🛰️||1900,1950",
    "Which came first?|Sputnik 1|🛰️||Apollo 11,Hubble"
  ], "Think about the order of space firsts."));
  k.push(L("Living in space", [
    "Weightless|🧑‍🚀|Astronauts on the International Space Station float. Gravity is still there, but the station and the crew are in constant free fall around Earth. This is <b>microgravity</b>.",
    "Staying healthy|🏋️|In microgravity muscles and bones weaken, so astronauts exercise about two hours a day. Water is recycled and food comes in pouches.",
    "No air|🥽|Space is a <b>vacuum</b> with no air. Spacesuits give air, protect against heat and cold, and shield from tiny space dust."
  ], [
    "Astronauts float because they and the station are in constant...|free fall|🧑‍🚀||sleep,sunlight",
    "The feeling of floating in orbit is called...|microgravity|🎈||megagravity,antigravity",
    "Astronauts exercise a lot because muscles and bones...|weaken in space|🏋️||grow too fast,turn to stone",
    "Space is a vacuum, which means it has...|no air|🌌||thick air,only water",
    "A spacesuit gives air and protects from...|heat, cold and dust|🥽||rain and snow,wind and waves",
    "The International Space Station circles Earth about how often?|every 90 minutes|🛰️||every 90 days,every year",
    "Food on the station often comes in...|pouches|🥫||open bowls,glass jars",
    "On the station, water is...|recycled|♻️||poured into space,not used",
    "Is there gravity at the height of the space station?|yes, almost as strong as on the ground|🛰️||no gravity at all,only on the Moon"
  ], "Gravity is still pulling, but everything is falling together."));
  k.push(L("How rockets work", [
    "Push back|🚀|A rocket works by <b>Newton's third law</b>: for every action there is an equal and opposite reaction. Hot gas shoots down, so the rocket goes up.",
    "Stages|🔥|Rockets use <b>stages</b>. Empty fuel tanks drop away, so the rest is lighter and faster. Rockets carry their own oxygen because there is no air in space.",
    "Speed|⚡|To stay in orbit, a spacecraft must move sideways at about 28,000 kilometers per hour. To leave Earth completely it needs about 11 kilometers per second, the <b>escape velocity</b>."
  ], [
    "A rocket goes up because hot gas shoots...|down|🚀||up,sideways only",
    "The law behind rockets says every action has an equal and opposite...|reaction|↔️||direction,planet",
    "Empty fuel tanks are dropped to make the rocket...|lighter|🪶||heavier,wider",
    "Parts of a rocket that drop away in turn are called...|stages|🚀||wings,sails",
    "Rockets carry their own oxygen because space has...|no air|🌌||too much air,thick fog",
    "To stay in orbit, a spacecraft must move...|sideways fast|🔄||straight up slowly,not at all",
    "The speed needed to leave Earth completely is called...|escape velocity|⚡||orbit time,drag speed",
    "A balloon flying around when air rushes out shows...|action and reaction|🎈||evaporation,erosion",
    "Orbit is like always falling but...|missing the ground|🌍||hitting the ground,going up"
  ], "Think about the push in one direction and the push back."));
  k.push(L("Searching for life", [
    "What life needs|💧|Life as we know it needs liquid water, energy and building materials. The <b>habitable zone</b> is the distance from a star where liquid water can stay on a surface.",
    "In our system|🔍|Mars once had rivers. Moons like <b>Europa</b> and <b>Enceladus</b> have oceans of water under their ice. Scientists search these places for signs of life.",
    "Other stars|🔭|Planets that orbit other stars are <b>exoplanets</b>. We know of more than 5,000. Telescopes find them when they dim a star's light as they pass in front."
  ], [
    "Life as we know it needs liquid...|water|💧||sand,iron",
    "The zone where liquid water can stay on a planet is the...|habitable zone|🌍||magnetic zone,dead zone",
    "Which moon has an ocean under its ice?|Europa|🧊||Phobos,our Moon",
    "Mars once had...|rivers|🏞️||thick forests,living cities",
    "A planet that orbits another star is an...|exoplanet|🪐||asteroid,meteoroid",
    "We know of more than ___ exoplanets.|5,000|🔭||50,500",
    "Telescopes find exoplanets partly by seeing a star's light...|dim as a planet passes|🔭||turn green,flash like lightning",
    "Enceladus is a moon of...|Saturn|🪐||Mars,Jupiter",
    "A planet too close to its star usually has water that is...|boiled away|🔥||frozen solid,always rain"
  ], "Think about what life needs and where it might be found."));
  k.push(L("The water cycle in detail", [
    "Sun power|☀️|The Sun powers the water cycle. Water <b>evaporates</b> from oceans, and plants release vapor from their leaves by <b>transpiration</b>.",
    "Back down|🌧️|Vapor cools and condenses into clouds. Water falls as <b>precipitation</b>. Some runs over the ground as <b>runoff</b>. Some soaks in by <b>infiltration</b>.",
    "Underground|💧|Soaked water fills spaces in rock. The top of that wet zone is the <b>water table</b>. A rock layer that holds water is an <b>aquifer</b>."
  ], [
    "What powers the water cycle?|the Sun|☀️||the Moon,volcanoes",
    "Plants releasing water vapor from leaves is called...|transpiration|🌿||infiltration,runoff",
    "Water flowing over the ground to rivers is called...|runoff|🏞️||evaporation,condensation",
    "Water soaking into the ground is called...|infiltration|🕳️||transpiration,runoff",
    "Underground rock that holds water is an...|aquifer|💧||airport,iceberg",
    "The top of the wet underground zone is the...|water table|💧||sea level,river bed",
    "Vapor turning into cloud droplets is...|condensation|☁️||evaporation,runoff",
    "Rain, snow and hail together are called...|precipitation|🌧️||transpiration,infiltration",
    "Water cycle energy that lifts water into the air comes from...|sunlight|☀️||the ocean floor,gravity"
  ], "Follow the water: up, across, down, under."));
  k.push(L("Climate graphs", [
    "A graph of a place|📊|A <b>climograph</b> shows a place's average temperature (a line) and rain (bars) for each month.",
    "Reading it|📈|The highest point of the line is the hottest month. The tallest bar is the rainiest month.",
    "Averages|➗|To find an <b>average</b>, add the numbers and divide by how many there are. Average of 10, 12 and 14 is (10 + 12 + 14) ÷ 3 = 12."
  ], [
    "On a climograph, the line usually shows...|temperature|📈||earthquakes,wind direction",
    "On a climograph, the bars usually show...|rainfall|📊||sunrise time,pressure",
    "The tallest rain bar shows the ___ month.|rainiest|🌧️||hottest,coldest",
    "The highest point of the temperature line shows the ___ month.|hottest|☀️||rainiest,windiest",
    "Monthly temperatures of 4, 6 and 8°C have an average of...|6°C|🌡️||18°C,8°C",
    "Monthly temperatures of 20, 22 and 24°C have an average of...|22°C|🌡️||66°C,20°C",
    "Monthly temperatures of 5, 10 and 15°C have an average of...|10°C|🌡️||30°C,15°C",
    "Monthly temperatures of 30, 35 and 40°C have an average of...|35°C|🌡️||105°C,40°C",
    "To find an average you add and then...|divide|➗||subtract,multiply"
  ], "Add all the numbers first, then divide by how many there are."));
  k.push(L("Global winds", [
    "Uneven heat|🌍|The Sun heats the equator most. Warm air rises there and cooler air flows toward it. Earth's spin bends the winds.",
    "Wind belts|💨|Near the equator the <b>trade winds</b> blow from east to west. In the middle latitudes the <b>westerlies</b> blow from west to east, so US weather usually moves west to east. Calm areas near the equator are the <b>doldrums</b>.",
    "Jet stream|✈️|The <b>jet stream</b> is a fast river of air about 10 kilometers up. A wind is named for where it comes from: a west wind blows from the west."
  ], [
    "The Sun heats most the...|equator|🌞||poles,Moon",
    "Winds near the equator that blow east to west are the...|trade winds|⛵||westerlies,jet stream",
    "Winds that blow from west to east in the middle latitudes are the...|westerlies|🌬️||trade winds,doldrums",
    "The calm area near the equator is the...|doldrums|😴||jet stream,westerlies",
    "A fast river of air high up is the...|jet stream|✈️||sea breeze,monsoon",
    "A west wind blows from the...|west|🧭||east,south",
    "Weather in the US usually moves from...|west to east|🗺️||east to west,north to south",
    "Earth's spin bends winds. This is the...|Coriolis effect|🌍||greenhouse effect,mirror effect",
    "The jet stream is about how high?|10 kilometers|✈️||10 meters,1,000 kilometers"
  ], "A wind is named for the direction it comes from."));
  k.push(L("Resources and mining", [
    "Ores|⛏️|An <b>ore</b> is a rock with a useful metal in it. Iron ore makes steel. Bauxite makes aluminum. Copper is used for wires.",
    "Other resources|🧱|Sand makes glass. Limestone is used for cement. Mining is done on the surface or underground, and the land must be repaired afterward.",
    "Saving|♻️|Recycling aluminum uses about 95% less energy than making it new. Using less of what we dig up helps resources last."
  ], [
    "A rock that holds a useful metal is an...|ore|⛏️||egg,oil",
    "Iron ore is used to make...|steel|🏗️||glass,paper",
    "Bauxite is used to make...|aluminum|🥫||copper,gold",
    "Which metal is used for electric wires?|copper|🔌||sand,aluminum foil only",
    "Sand is melted to make...|glass|🪟||steel,plastic",
    "Which rock is used to make cement?|limestone|🧱||obsidian,bauxite",
    "Recycling aluminum cans uses much less...|energy|🔋||water vapor,gravity",
    "After mining, land should be...|repaired|🌱||left empty forever,flooded with oil",
    "Which is a way to make resources last longer?|recycling|♻️||wasting more,mining without limits"
  ], "Think about what each resource is used to make."));
  k.push(L("Renewable energy up close", [
    "Sun and wind|☀️|<b>Solar panels</b> turn sunlight into electricity. <b>Wind turbines</b> use the wind to spin a generator.",
    "Water and heat|💧|<b>Hydroelectric dams</b> use falling water. <b>Geothermal</b> plants use heat from underground. <b>Biomass</b> burns plant material. <b>Tidal</b> power uses the ocean's tides.",
    "Pros and cons|⚖️|Renewables make little pollution. But solar needs sunshine and wind needs wind, so batteries and a mix of sources help."
  ], [
    "Solar panels turn sunlight into...|electricity|☀️||wind,water",
    "A wind turbine uses wind to spin a...|generator|🌬️||paint mixer,boat",
    "Which energy uses falling water?|hydroelectric power|💧||geothermal power,solar power",
    "Which energy uses heat from inside the Earth?|geothermal power|🌋||wind power,tidal power",
    "Burning plant material for energy is...|biomass|🌾||tidal power,solar power",
    "Energy from the ocean's rise and fall is...|tidal power|🌊||solar power,biomass",
    "A problem with solar power at night is that there is no...|sunlight|🌙||gravity,air",
    "Why are batteries useful with solar and wind?|they store energy for when it is calm or dark|🔋||they make the Sun brighter,they make more wind",
    "Compared with coal, renewable energy makes less...|pollution|🌿||light,heat from the Sun"
  ], "Think about what natural source each power plant uses."));
  k.push(L("Glaciers, wind and shaping land", [
    "Glaciers|🏔️|Glaciers are moving rivers of ice. They carve wide <b>U-shaped valleys</b> and drop piles of rock called <b>moraines</b>. Rivers carve V-shaped valleys.",
    "Wind|🏜️|Wind can pick up sand and dust and move it. Sand piles up into <b>dunes</b>. Fine dust can settle far away as <b>loess</b>.",
    "Taking and dropping|⛏️|Weathering and erosion take land apart. <b>Deposition</b> drops it somewhere new. Deltas, dunes and moraines are all deposited."
  ], [
    "A glacier carves a ___ valley.|U-shaped|🏔️||V-shaped,round",
    "A river usually carves a ___ valley.|V-shaped|🏞️||U-shaped,square",
    "A pile of rock dropped by a glacier is a...|moraine|🪨||delta,dune",
    "Hills of sand piled up by wind are...|dunes|🏜️||moraines,deltas",
    "Dropping bits of rock and soil in a new place is...|deposition|⬇️||weathering,erosion",
    "Wind erosion is strongest in...|dry, bare places|🏜️||rainforests,thick forests",
    "A moving river of ice is a...|glacier|🧊||delta,geyser",
    "Mud dropped where a river meets the sea builds a...|delta|🌊||moraine,dune",
    "Fine wind-blown dust that settles far away is...|loess|🌫️||lava,granite"
  ], "Think about which force shaped each landform."));
  k.push(L("Latitude and longitude", [
    "Lines on the globe|🧭|<b>Latitude</b> lines run east-west and tell how far north or south you are from the <b>equator</b> (0°). The poles are 90°N and 90°S.",
    "Longitude|🌐|<b>Longitude</b> lines run north-south and tell how far east or west you are from the <b>Prime Meridian</b> (0°), which passes through Greenwich, England.",
    "Special lines|📍|The Tropic of Cancer is at 23.5°N and the Tropic of Capricorn at 23.5°S. A place is found with a pair, like 40°N, 74°W."
  ], [
    "Latitude lines run...|east-west|↔️||north-south,up-down",
    "Longitude lines run...|north-south|↕️||east-west,in circles around the poles only",
    "Latitude measures how far you are from the...|equator|🧭||Prime Meridian,Moon",
    "Longitude measures how far east or west you are from the...|Prime Meridian|🌐||equator,North Pole",
    "The latitude of the equator is...|0°|🧭||90°,180°",
    "The North Pole is at...|90°N|🧊||0°N,23.5°N",
    "The Prime Meridian passes through...|Greenwich in England|🌐||Cairo in Egypt,Tokyo in Japan",
    "The Tropic of Cancer is at...|23.5°N|🌞||23.5°S,66.5°N",
    "To find a place on a map we use...|latitude and longitude|📍||weight and height,sound and light"
  ], "Think about which direction each line goes."));
  k.push(L("Topographic maps", [
    "Maps of height|🗺️|A <b>topographic map</b> shows the shape of the land. <b>Contour lines</b> connect points that have the same <b>elevation</b> (height above sea level).",
    "Reading lines|⛰️|Lines close together mean a steep slope. Lines far apart mean a gentle slope. Small closed circles in the middle usually mean a hilltop.",
    "Map helpers|📐|The <b>contour interval</b> is the height change between lines. The <b>scale</b> tells real distance. The <b>legend</b> explains the symbols."
  ], [
    "A contour line connects places with the same...|elevation|🗺️||temperature,rainfall",
    "Contour lines close together mean a...|steep slope|⛰️||gentle slope,flat lake",
    "Contour lines far apart mean a...|gentle slope|🌄||steep cliff,mountain peak",
    "Small closed circles in the middle usually mean a...|hilltop|⛰️||valley floor,lake",
    "The height change between contour lines is the contour interval. It is a...|height difference|📏||time difference,weight difference",
    "The part of a map that explains the symbols is the...|legend|🗝️||scale,title",
    "The part of a map that tells real distance is the...|scale|📏||legend,compass rose",
    "Elevation means height above...|sea level|🌊||the clouds,the Moon",
    "A topographic map shows the shape of the...|land|🗺️||weather,rocks' ages"
  ], "Contour lines show height. Close together means steep."));
  k.push(L("Earth's magnetism and auroras", [
    "Giant magnet|🧲|Earth has a <b>magnetic field</b>, like a giant bar magnet. A compass needle lines up with it, so it points toward magnetic north.",
    "Shield|🛡️|The magnetic field protects us from the <b>solar wind</b>, particles that stream from the Sun. It bends most of them away.",
    "Auroras|🌌|Some particles follow the field to the poles and hit gases in the air. The air glows green, pink and purple. These lights are <b>auroras</b>: northern lights and southern lights."
  ], [
    "Earth has a magnetic field like a giant...|bar magnet|🧲||bar of soap,mirror",
    "A compass needle points toward...|magnetic north|🧭||the Sun,the Moon",
    "The magnetic field protects us from the...|solar wind|🛡️||tides,earthquakes",
    "Particles from the Sun are called the...|solar wind|☀️||jet stream,sea breeze",
    "Colorful lights in the sky near the poles are...|auroras|🌌||rainbows,eclipses",
    "The northern lights are seen near the...|North Pole|🧊||equator,Moon",
    "Auroras glow when particles hit gases in the...|air|💨||ocean,ground",
    "Earth's magnetic field is made by moving liquid metal in the...|outer core|🔥||crust,atmosphere",
    "Which tool uses Earth's magnetism to show direction?|a compass|🧭||a thermometer,a barometer"
  ], "Think about what the magnetic field does."));
  k.push(L("Protecting Earth", [
    "Ozone layer|🛡️|The <b>ozone layer</b> high in the air blocks much of the Sun's harmful ultraviolet light. In 1987 the world agreed to stop making chemicals that harmed it, and it is slowly healing.",
    "Living things|🌿|<b>Biodiversity</b> is the variety of life. Losing a <b>habitat</b>, like a forest, can put species at risk. Parks and reserves protect habitats.",
    "Everyday help|♻️|Save water and energy, recycle, plant trees and learn about nature. Using resources so they last is called <b>sustainability</b>."
  ], [
    "The ozone layer blocks harmful...|ultraviolet light|🛡️||rain,sound",
    "The ozone layer is found in the...|atmosphere|☁️||ocean,core",
    "The world agreed in 1987 to stop making chemicals that...|harm the ozone layer|🌍||make rain,cool the Moon",
    "The variety of life in a place is its...|biodiversity|🦋||gravity,humidity",
    "The home where a living thing lives is its...|habitat|🌳||orbit,fault",
    "Parks and nature reserves help protect...|habitats|🏞️||oil wells,mines",
    "Using resources so they last is called...|sustainability|♻️||pollution,erosion",
    "Which helps protect Earth?|planting trees|🌳||wasting water,littering",
    "The ozone layer is slowly...|healing|🩹||disappearing faster,turning blue"
  ], "Think about what helps protect nature."));
  k.push(MIX("Mixed practice", [k[0], k[2], k[4], k[6], k[8], k[10], k[12], k[14], k[16]]));
  k.push(MIX("Level 9 Challenge", [k[1], k[3], k[5], k[7], k[9], k[11], k[13], k[15], k[17]]));

  Object.assign(EARTH_LEVELS, { 7: g, 8: h, 9: k });
})();
