// Mind Lab Earth & Space, levels 25-27 (extension file). 20 lessons per level.
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



  // ================= LEVEL 25 =================
  const a = [];
  a.push(L("Kepler's laws with numbers", [
    "Three laws|🪐|Kepler found that (1) planets move in <b>ellipses</b> with the Sun at one focus, (2) a line from the Sun to a planet sweeps out <b>equal areas in equal times</b>, so a planet moves fastest when closest to the Sun, and (3) the <b>period squared equals the distance cubed</b>: P² = a³ (P in years, a in AU).",
    "Using the third law|🧮|A planet at 4 AU: a³ = 64, so P² = 64 and P = 8 years. Go the other way too: if P = 8 years, P² = 64, so a³ = 64 and a = 4 AU.",
    "Where it works|☀️|The same law works for any object orbiting the Sun, such as comets and asteroids, and for moons around a planet if you use that planet's own units."
  ], [
    "Kepler's first law says planetary orbits are...|ellipses|🪐|They are not perfect circles.|circles,spirals",
    "A planet moves fastest when it is...|closest to the Sun|☀️|Equal areas in equal times means a short radius needs a quick sweep.|farthest from the Sun,exactly halfway",
    "A planet orbits at 9 AU. Using P² = a³, its period in years is...|27|🧮|Cube 9, then take the square root.|18,81",
    "A planet orbits at 16 AU. Its period in years is...|64|🧮|Cube the distance, then take the square root.|32256",
    "A body with a period of 27 years orbits at how many AU?|9|🧮|Square the period first, then find the cube root.|3,54",
    "The Sun sits at one ____ of each planet's elliptical orbit.|focus|🎯|An ellipse has two special points.|center,edge",
    "Kepler's second law is also called the law of equal...|areas|📐|A line from the Sun sweeps out a shape.|angles,speeds",
    "The point in an orbit closest to the Sun is called...|perihelion|☄️|The prefix peri means near.|aphelion,equinox"
  ], "Remember the three laws: ellipses, equal areas, P squared equals a cubed."));
  a.push(L("Geostrophic wind", [
    "Pressure pushes|🌬️|Air is pushed from high pressure toward low pressure by the <b>pressure gradient force</b>. Isobars that are close together mean a steep gradient and stronger wind.",
    "A balance|🌀|Above the friction layer, the Coriolis force turns moving air until it balances the pressure force. The result is the <b>geostrophic wind</b>, which blows <b>parallel to the isobars</b> instead of straight across them.",
    "Highs and lows|🧭|In the Northern Hemisphere, air circles clockwise around a high and counterclockwise around a low. In the Southern Hemisphere it is the other way round. Friction near the ground lets air drift slightly toward low pressure."
  ], [
    "Wind that blows parallel to the isobars is called a ____ wind.|geostrophic|🌬️|It balances two forces.|katabatic,monsoon",
    "Isobars packed close together mean the wind is...|stronger|📏|A steep pressure gradient pushes harder.|weaker,still",
    "In the Northern Hemisphere, air around a high circulates...|clockwise|🔄|The opposite of a low.|counterclockwise,straight outward",
    "In the Northern Hemisphere, air around a low circulates...|counterclockwise|🌀|The opposite of a high.|clockwise,straight inward",
    "The force that starts air moving from high to low pressure is the...|pressure gradient force|⬇️|It depends on how quickly pressure changes with distance.|Coriolis force,friction",
    "Near the ground, friction makes wind cross isobars toward...|lower pressure|🧱|Friction weakens the Coriolis balance.|higher pressure,the poles",
    "In the Southern Hemisphere, air around a low circulates...|clockwise|🌪️|Everything is reversed compared with the north.|counterclockwise,straight in",
    "In the Northern Hemisphere, the Coriolis force turns moving air to the...|right|↪️|Think of the direction you turn a clock hand.|left,up"
  ], "Think about pressure pushing and the Coriolis effect turning."));
  a.push(L("Rossby waves and the jet stream", [
    "Waves in the jet|🌊|Fast west-to-east jet streams do not flow in a straight line. They form large meanders called <b>Rossby waves</b> (planetary waves). The waves exist because the Coriolis effect changes with latitude.",
    "Troughs and ridges|🌤️|A <b>trough</b> bends toward the equator and often brings cool, stormy weather. A <b>ridge</b> bends toward the pole and often brings warm, settled weather.",
    "Stuck patterns|🔄|Sometimes a wave pattern stalls (called <b>blocking</b>). Then one place gets a long heat wave or cold spell. The waves also carry heat toward the poles."
  ], [
    "Large meanders in the jet stream are called...|Rossby waves|🌊|Named after a Swedish-American meteorologist.|tidal waves,sound waves",
    "A trough in the jet stream dips toward the...|equator|⬇️|It brings cooler air to lower latitudes.|pole,east",
    "A ridge in the jet stream usually brings weather that is...|warm and settled|☀️|It bulges toward the pole.|cold and stormy,always rainy",
    "Rossby waves exist because the Coriolis effect changes with...|latitude|🧭|It is zero at the equator and largest at the poles.|longitude,season",
    "Jet streams generally flow from...|west to east|➡️|They follow the direction of Earth's spin.|east to west,north to south",
    "A stalled wave pattern (blocking) can cause long...|heat waves or cold spells|🥵|The same weather sits over a place.|earthquakes,eclipses",
    "Rossby waves help move heat toward the...|poles|🧊|Tropics have extra heat to share.|equator,core",
    "A trough usually brings...|cool stormy weather|⛈️|It is the dip toward the equator.|hot dry weather,calm clear skies"
  ], "Picture the jet stream as a wavy river of air."));
  a.push(L("Latent heat of water", [
    "Hidden heat|💧|Changing state takes energy without changing temperature. Evaporating 1 g of water absorbs about 2260 J (the <b>latent heat of vaporization</b>). Melting 1 g of ice absorbs about 334 J.",
    "Heat released|⛈️|When vapor condenses into cloud droplets, the same heat is released into the air. It warms the air, which rises, and this powers thunderstorms and hurricanes.",
    "Cooling and moving heat|🌡️|Evaporation cools the surface left behind (like sweat on skin). Water vapor carries energy from the warm ocean to the air, moving heat from the tropics toward higher latitudes."
  ], [
    "Energy absorbed or released during a phase change without a temperature change is called ____ heat.|latent|💧|The word means hidden.|sensible,static",
    "When water vapor condenses, heat is...|released|☁️|The air around the droplets warms.|absorbed,destroyed",
    "Evaporation of water at a surface...|cools the surface|🌡️|Think of sweat on your skin.|warms the surface,has no effect",
    "Which takes more energy per gram of water?|evaporating|🔥|One change is much bigger than the other.|melting,freezing",
    "Hurricanes are powered mainly by heat released when vapor...|condenses|🌀|Cloud droplets form.|evaporates,freezes",
    "About how many joules does it take to melt 1 g of ice?|334|🧊|A few hundred.|2260,42",
    "About how many joules does it take to evaporate 1 g of water?|2260|♨️|A few thousand.|334100",
    "Latent heat carries energy from the warm ocean to...|the air above|🌊|Vapor rises from the sea.|Earth's core,the Moon"
  ], "Think about where the hidden heat goes when water changes state."));
  a.push(L("Isostasy and the Moho", [
    "Floating crust|⚖️|Continental crust (about 2.7 g/cm³) floats on the denser mantle (about 3.3 g/cm³), like wood blocks in water. Thick crust sits high and thin crust sits low. This balance is <b>isostasy</b>.",
    "The Moho|📏|The <b>Mohorovičić discontinuity</b> (Moho) is the boundary between the crust and the mantle, where seismic waves speed up. It is about 7 km below the oceans, about 35 km under typical continents, and up to about 70 km under the biggest mountain ranges.",
    "Rebound|🏔️|When an ice sheet melts or a mountain erodes, the land gets lighter and slowly <b>rebounds</b> upward. Parts of Canada and Scandinavia are still rising after the last ice age."
  ], [
    "The balance of floating crust on the mantle is called...|isostasy|⚖️|Like a floating iceberg.|erosion,subduction",
    "The boundary between the crust and the mantle is the...|Moho|📏|Named for a Croatian seismologist.|Gutenberg discontinuity,Richter scale",
    "Compared with the mantle, continental crust is...|less dense|🪨|That is why it floats.|more dense,equally dense",
    "Under a big mountain range, the crust is...|thick with a deep root|🏔️|Like an iceberg, most of it is hidden.|thin with a shallow root,missing",
    "After an ice sheet melts, the land below...|rises slowly|⬆️|It is relieved of a heavy load.|sinks quickly,stays fixed",
    "At the Moho, seismic waves...|speed up|🌐|The mantle rock is denser.|slow down,stop",
    "Typical continental crust is about how thick?|35 km|📐|About the distance of a long road.|7 km,2900 km",
    "Where is the crust thinnest?|under the ocean|🌊|Oceanic crust is only a few kilometers thick.|under mountain ranges,under big plateaus"
  ], "Think of icebergs and floating wooden blocks."));
  a.push(L("Identifying minerals", [
    "Cleavage and fracture|🔍|<b>Cleavage</b> is when a mineral splits along flat planes. Mica splits into thin sheets and halite breaks into cubes. <b>Fracture</b> is irregular breaking, such as the curved, glassy (conchoidal) break of quartz.",
    "Luster, streak, hardness|✨|<b>Luster</b> is how a surface shines (metallic or nonmetallic). <b>Streak</b> is the color of the powder on a white tile and is more reliable than the outside color. <b>Hardness</b> uses the Mohs scale from 1 (talc) to 10 (diamond).",
    "Other tests|🧪|Density, magnetism (magnetite is attracted to a magnet) and fizzing in weak acid (calcite fizzes) help identify minerals."
  ], [
    "A mineral that splits along flat planes shows...|cleavage|🔍|Think of mica sheets.|streak,luster",
    "Which mineral breaks into thin flexible sheets?|mica|📄|Peels like pages.|quartz,halite",
    "The curved, glassy break of quartz is called...|conchoidal fracture|🥃|It looks like a shell.|perfect cleavage,streak",
    "The color of a mineral's powder is its...|streak|🖍️|Rub it on a white tile.|luster,cleavage",
    "The hardest mineral on the Mohs scale is...|diamond|💎|It is number 10.|quartz,topaz",
    "The softest mineral on the Mohs scale is...|talc|🪶|It is number 1.|gypsum,calcite",
    "Which mineral fizzes in weak acid?|calcite|🧪|It is the main mineral in limestone.|quartz,mica",
    "Which mineral is attracted to a magnet?|magnetite|🧲|Its name gives it away.|quartz,halite"
  ], "Think about the property that the question describes."));
  a.push(L("Metamorphic grade", [
    "Grade|🔥|Metamorphic <b>grade</b> tells how strong the heat and pressure were. Shale becomes slate (low grade), then phyllite, then schist, then gneiss (high grade).",
    "Foliation|📚|Pressure that squeezes from one direction lines up flat minerals like mica into layers called <b>foliation</b>. Rocks made of mostly one mineral, such as marble (from limestone) and quartzite (from sandstone), are <b>non-foliated</b>.",
    "Facies|🗺️|A <b>metamorphic facies</b> is a set of minerals that shows the pressure and temperature. Blueschist facies means high pressure with low temperature, as in subduction zones. Granulite facies means very high temperature deep in the continental crust."
  ], [
    "Shale at low metamorphic grade becomes...|slate|📘|It splits into flat sheets.|gneiss,marble",
    "Which of these is the highest grade?|gneiss|🔥|It has coarse bands.|schist,slate",
    "Limestone that is metamorphosed becomes...|marble|🏛️|A favorite stone of sculptors.|quartzite,slate",
    "Quartz sandstone that is metamorphosed becomes...|quartzite|⛰️|A very hard rock.|marble,gneiss",
    "Flat minerals lining up in layers is called...|foliation|📚|Like leaves of a book.|cleavage,bedding",
    "Blueschist facies forms at...|high pressure and low temperature|⬇️|It is typical of subduction zones.|high temperature and low pressure,surface weathering",
    "Marble is non-foliated because it is made mostly of...|one mineral|🏛️|Mostly calcite.|clay,mica",
    "Between slate and schist in the series comes...|phyllite|📶|It has a silky shine.|gneiss,marble"
  ], "Think about how much heat and pressure the rock felt."));
  a.push(L("Chemical and biochemical rocks", [
    "Rocks from water|🧂|Not all sedimentary rocks are broken pieces. <b>Chemical</b> sediments form when minerals crystallize out of water. <b>Evaporites</b> such as halite (rock salt) and gypsum form when seawater or lake water evaporates.",
    "Chert and limestone|🐚|<b>Chert</b> is very fine-grained silica, often from the glassy skeletons of tiny sea creatures. Many <b>limestones</b> are calcium carbonate from shells and corals (<b>biochemical</b> rocks).",
    "Clues|🏜️|Thick salt beds show a long-ago shallow sea or lake in a hot, dry climate. Banded iron formations show ancient oceans rich in iron."
  ], [
    "Halite and gypsum formed by evaporation are called...|evaporites|🏜️|The word is built from evaporate.|conglomerates,tuffs",
    "Rock salt is the mineral...|halite|🧂|You might put it on food.|calcite,quartz",
    "Chert is made mostly of...|silica|💠|The same stuff as quartz.|calcium carbonate,iron",
    "Limestone is mainly...|calcium carbonate|🐚|From shells and coral.|silica,sodium chloride",
    "Thick beds of salt suggest...|a hot dry shallow sea|☀️|Water evaporated away.|a glacier,a deep cold lake",
    "A chemical sediment crystallizes out of...|water|💧|It is dissolved first.|lava,wind",
    "Banded iron formations are layers of iron minerals and...|chert|🟫|A fine silica rock.|salt,coal",
    "Biochemical limestone is built from...|shells and corals|🪸|Life makes it.|volcanic ash,sand grains"
  ], "Ask yourself whether the rock came from pieces, water or life."));
  a.push(L("Earthquake magnitude and energy", [
    "Magnitude|📈|Magnitude measures the size of an earthquake from seismograph records. The scale is <b>logarithmic</b>: each whole number means 10 times larger ground motion (amplitude).",
    "Energy|⚡|Each whole number releases about 32 times more energy. A magnitude 7 releases about 1000 times the energy of a magnitude 5 (32 × 32 is about 1000).",
    "Two measures|📏|Scientists now use <b>moment magnitude (Mw)</b>, based on fault area, slip distance and rock strength. <b>Intensity</b> (Mercalli scale) describes shaking and damage at one place."
  ], [
    "A magnitude 7 earthquake has how many times the shaking amplitude of a magnitude 5?|100|📈|Ten for each step, two steps.|101000",
    "One whole step of magnitude means how many times the amplitude?|10|📏|The scale is logarithmic base ten.|32100",
    "One whole step of magnitude releases about how many times the energy?|32|⚡|More than ten, less than a hundred.|10100",
    "A magnitude 7 releases about how many times the energy of a magnitude 5?|1000|💥|About 32 times 32.|100,32",
    "The magnitude scale is...|logarithmic|📈|Each step multiplies.|linear,random",
    "The Mercalli scale measures...|intensity|🏚️|Shaking and damage at a place.|magnitude,depth",
    "The scale based on fault area, slip and rock strength is...|moment magnitude|📐|Mw.|Mercalli scale,Beaufort scale",
    "A magnitude 8 has how many times the amplitude of a magnitude 6?|100|🌐|Two steps up.|20,16"
  ], "Each whole number is a multiplication, not an addition."));
  a.push(L("Faults and folds", [
    "Faults|🪨|Faults are cracks where rock has moved. <b>Normal</b> faults form where the crust is pulled apart. <b>Reverse</b> (thrust) faults form where it is squeezed. <b>Strike-slip</b> faults slide sideways, like the San Andreas Fault.",
    "Folds|🌊|Layers can bend without breaking when pushed slowly. An <b>anticline</b> arches up, with the oldest layers in the core. A <b>syncline</b> bends down, with the youngest layers in the core.",
    "Settings|🌍|Normal faults are common at divergent boundaries and rifts. Reverse faults and folds are common at convergent boundaries. Strike-slip faults mark transform boundaries."
  ], [
    "A fault formed where the crust is pulled apart is a...|normal fault|↔️|It is extension.|reverse fault,strike-slip fault",
    "A fault formed where the crust is squeezed is a...|reverse fault|➡️|It is compression.|normal fault,strike-slip fault",
    "A fault where blocks slide sideways is a...|strike-slip fault|↕️|Think of the San Andreas.|normal fault,reverse fault",
    "The San Andreas Fault is an example of a...|strike-slip fault|🌎|It marks a transform boundary.|normal fault,reverse fault",
    "A fold that arches upward is an...|anticline|⛰️|Its name starts with anti.|syncline,monocline",
    "The youngest layers are in the core of a...|syncline|🥣|A trough-shaped fold.|anticline,fault",
    "Normal faults are common at which kind of boundary?|divergent|↔️|Plates move apart.|convergent,transform",
    "Mountain belts at convergent boundaries are rich in...|reverse faults and folds|🏔️|Compression shortens the crust.|normal faults and rifts,only strike-slip faults"
  ], "Think about whether the rock is pulled, squeezed or slid sideways."));
  a.push(L("Strike and dip", [
    "Describing tilted layers|🧭|Geologists describe a tilted layer with two numbers. <b>Strike</b> is the compass direction of a horizontal line drawn on the layer. <b>Dip</b> is the angle that the layer slopes down from horizontal, measured at 90° to the strike.",
    "Dip angle|📐|A flat layer has a dip of 0°. A vertical layer has a dip of 90°. A dip of 20° is gently tilted and a dip of 70° is steeply tilted.",
    "On maps|🗺️|A map symbol has a long line for the strike and a short tick pointing in the downhill (dip) direction, with the dip angle written next to it."
  ], [
    "The angle a layer slopes down from horizontal is its...|dip|📐|Not the compass direction.|strike,trend",
    "The compass direction of a horizontal line on a tilted layer is its...|strike|🧭|Not the slope angle.|dip,plunge",
    "A flat bed has a dip of...|0°|➖|No tilt.|90°,45°",
    "A vertical bed has a dip of...|90°|⬆️|Standing straight up.|0°,180°",
    "Strike and dip directions are at what angle to each other?|90°|📐|Right angles.|45°,180°",
    "A steeper tilt means a ____ dip angle.|larger|📈|Closer to vertical.|smaller,zero",
    "On a map, the small tick on the symbol points toward the...|downward slope|⬇️|The way water would run.|uphill direction,east only",
    "A layer dips 30° toward the east. Its strike runs...|north-south|🧭|Strike is at right angles to the dip direction.|east-west,northeast-southwest"
  ], "Strike is a direction on the flat map; dip is a slope angle."));
  a.push(L("Finding exoplanets", [
    "Transit method|🔭|When a planet crosses in front of its star, the starlight dips slightly. Repeating dips show the orbit, and the depth of the dip shows the planet's size. Kepler and TESS found thousands this way.",
    "Radial velocity|🎯|A planet's gravity makes its star wobble around the common center of mass. Doppler shifts in the star's spectrum show the wobble and give the planet's minimum mass. 51 Pegasi b (1995) was the first found around a Sun-like star.",
    "Other methods|✨|<b>Direct imaging</b> blocks starlight to see planets. <b>Microlensing</b> uses a gravity lens to brighten a background star. <b>Astrometry</b> measures tiny position wobbles."
  ], [
    "A small dip in starlight as a planet passes in front is the...|transit method|🔭|The planet crosses the star.|radial velocity method,direct imaging",
    "A Doppler wobble in a star's spectrum is the...|radial velocity method|🎯|Speed toward and away from us.|transit method,microlensing",
    "The depth of a transit dip tells us the planet's...|size|📏|A bigger planet blocks more light.|mass,age",
    "The radial velocity method gives a planet's...|minimum mass|⚖️|A pull on the star.|diameter,surface gravity",
    "The first planet found around a Sun-like star was...|51 Pegasi b|1️⃣|It was announced in 1995.|Proxima b,Kepler-452b",
    "Taking pictures by blocking out the star's light is...|direct imaging|📷|The star is hidden by a mask.|astrometry,transit",
    "A background star brightened by a foreground star's gravity shows...|microlensing|🔍|Gravity acts as a lens.|transit,wobble",
    "Which space telescope found thousands of planets by transits?|Kepler|🛰️|Named for a famous astronomer.|Hubble,Voyager"
  ], "Think about what the star's light or position does."));
  a.push(L("Sunspots and the solar cycle", [
    "The solar cycle|☀️|<b>Sunspots</b> are cooler, darker, magnetic patches on the Sun. Their number rises and falls in a cycle of about <b>11 years</b>. The Sun's magnetic poles flip each cycle, so the full magnetic cycle is about 22 years.",
    "Flares and CMEs|⚡|Solar flares are bursts of light and X-rays. <b>Coronal mass ejections (CMEs)</b> throw clouds of charged particles into space. They are more frequent at <b>solar maximum</b> and can disturb satellites and power grids, and make stronger auroras.",
    "Past cycles|📜|From about 1645 to 1715 very few sunspots were seen (the <b>Maunder Minimum</b>). The Sun's brightness changes only about 0.1% over a cycle, so it is not the main cause of recent warming."
  ], [
    "Darker, cooler magnetic patches on the Sun are...|sunspots|⚫|They look like freckles.|prominences,craters",
    "The sunspot cycle lasts about...|11 years|⏳|A little more than a decade.|1 year,100 years",
    "The full magnetic cycle of the Sun lasts about...|22 years|🔁|Two sunspot cycles.|5 years,100 years",
    "Clouds of charged particles thrown out from the Sun are called...|coronal mass ejections|☁️|CMEs.|sunspots,tides",
    "Strong CMEs can cause stronger...|auroras|🌌|Lights near the poles.|earthquakes,tides",
    "During the Maunder Minimum the Sun had...|very few sunspots|🌑|Almost none were seen.|many sunspots,huge flares",
    "The Sun's brightness changes over a cycle by about...|0.1%|📉|Very small.|50%,10%",
    "Sunspot numbers are highest at solar...|maximum|📈|The busiest time.|minimum,eclipse"
  ], "Think about the 11-year cycle."));
  a.push(L("Milankovitch cycles in detail", [
    "Three slow changes|🔄|Earth's orbit changes in three ways. <b>Eccentricity</b> (how stretched the orbit is) cycles about every 100000 years. <b>Obliquity</b> (axial tilt, now 23.4°) varies from about 22.1° to 24.5° every 41000 years. <b>Precession</b> (a wobble of the spin axis) takes about 26000 years.",
    "Ice ages|🧊|These cycles barely change the yearly total of sunlight but change where and when it falls. Cool summers at high northern latitudes let snow survive and ice sheets grow.",
    "Feedbacks|🔁|Small orbital nudges are amplified by changes in ice, albedo and CO₂. That is how a small change in sunlight can end or start an ice age."
  ], [
    "The tilt of Earth's axis is its...|obliquity|📐|It is 23.4° today.|eccentricity,precession",
    "How stretched Earth's orbit is, is its...|eccentricity|⭕|From nearly round to a little oval.|obliquity,precession",
    "The wobble of Earth's spin axis is...|precession|🌀|Like a spinning top.|obliquity,eccentricity",
    "The tilt (obliquity) cycle lasts about...|41000 years|⏳|Between the other two cycles.|26000 years,100000 years",
    "The precession cycle lasts about...|26000 years|⏳|The shortest of the three.|41000 years,100000 years",
    "The eccentricity cycle lasts about...|100000 years|⏳|The longest of the three.|41000 years,26000 years",
    "Earth's axial tilt today is about...|23.4°|🌍|Between 22.1° and 24.5°.|12°,45°",
    "Ice sheets tend to grow when northern summers are...|cool|❄️|Snow must survive the summer.|hot,dry"
  ], "Remember the three cycles and their lengths."));
  a.push(L("Paleomagnetism", [
    "Rocks as compasses|🧲|When lava cools, magnetic minerals such as magnetite line up with Earth's magnetic field and lock in its direction. Some sediments record it too. This is <b>paleomagnetism</b>.",
    "Inclination and latitude|🌐|The tilt (inclination) of the recorded field shows the latitude where the rock formed. It is flat (0°) at the equator and vertical (90°) at the poles.",
    "Wandering poles|🧭|Rocks of different ages on one continent point to different pole positions, an <b>apparent polar wander path</b>. Different continents gave different paths, because the continents moved. This helped prove continental drift in the 1950s and 1960s."
  ], [
    "The study of ancient magnetism recorded in rocks is...|paleomagnetism|🧲|Paleo means ancient.|paleontology,petrology",
    "Which mineral commonly records the magnetic field in lava?|magnetite|⚫|Its name includes magnet.|quartz,gypsum",
    "Magnetic field lines are horizontal (0° inclination) at the...|equator|🌍|The middle of the globe.|poles,45° latitude",
    "Magnetic field lines are vertical (90° inclination) at the...|poles|🧭|The top and bottom of the globe.|equator,tropics",
    "Apparent polar wander paths differ between continents because the...|continents moved|🌍|Not the poles.|poles split,Earth grew",
    "Magnetic minerals lock in the field direction when lava...|cools|🌋|They get fixed in place.|melts,boils",
    "Paleomagnetism gave strong evidence for...|continental drift|🗺️|Plates and continents.|the Big Bang,volcanic winter",
    "The inclination of the recorded field reveals the rock's...|latitude|📐|North or south position.|longitude,age"
  ], "Think of tiny compass needles frozen into rock."));
  a.push(L("Black holes", [
    "Gravity too strong|⚫|A <b>black hole</b> is a region where gravity is so strong that even light cannot escape. Its boundary is the <b>event horizon</b>. The radius of the event horizon is about 3 km for each solar mass.",
    "How they form|💥|A stellar black hole forms when the leftover core of a very massive star collapses and has more than about 3 solar masses. Supermassive black holes of millions to billions of solar masses sit at the centers of galaxies.",
    "Seeing them|🔭|We see black holes by the hot gas falling in, by orbiting stars, and by gravitational waves. Sagittarius A* in our galaxy has about 4 million solar masses. In 2019 the Event Horizon Telescope imaged the shadow of the black hole in galaxy M87."
  ], [
    "The boundary of no return around a black hole is the...|event horizon|⚫|Light cannot cross it outward.|photosphere,corona",
    "The event horizon radius of a 1-solar-mass black hole is about...|3 km|📏|Smaller than a city.|3000 km,30 km",
    "The event horizon radius of a 10-solar-mass black hole is about...|30 km|📏|Ten times the 1-solar-mass value.|3 km,300 km",
    "The black hole at the center of the Milky Way is...|Sagittarius A*|🌌|It is in Sagittarius.|Cygnus X-1,Andromeda",
    "We detect black holes by...|hot gas falling in|🔥|It glows before it vanishes.|their own light,their sound in space",
    "In 2019 the Event Horizon Telescope imaged a black hole's...|shadow|📷|A dark disc.|surface,interior",
    "Sagittarius A* has a mass of about...|4 million solar masses|⚖️|Supermassive.|4 solar masses,4 trillion solar masses",
    "A stellar black hole forms from...|the collapse of a massive star's core|💥|After a supernova.|a cooling planet,two asteroids",
    "If the Sun were replaced by a black hole of equal mass, Earth's orbit would...|stay the same|🌍|Gravity depends on mass and distance only.|spiral in immediately,fly away"
  ], "Think about gravity, mass and escape."));
  a.push(L("The Wilson cycle", [
    "Opening and closing oceans|🔄|J. Tuzo Wilson proposed that ocean basins open and close over hundreds of millions of years. This is the <b>Wilson cycle</b>.",
    "Stages|📚|(1) A continent rifts apart (East Africa). (2) A young, narrow ocean forms (Red Sea). (3) A wide ocean with a mid-ocean ridge grows (Atlantic). (4) Subduction starts at the edges and the ocean shrinks (Pacific). (5) Continents collide, build mountains and close the ocean.",
    "Evidence|🏔️|Old mountain belts such as the Appalachians mark closed oceans. Slivers of old seafloor, called <b>ophiolites</b>, sit inside mountain ranges. Pangea began to break up about 200 million years ago."
  ], [
    "The cycle of oceans opening and closing is the...|Wilson cycle|🔄|Named for a Canadian geophysicist.|Krebs cycle,Carnot cycle",
    "A rift valley stage of the Wilson cycle is found in...|East Africa|🏜️|A continent splitting.|the Amazon,Greenland",
    "A young, narrow ocean is the...|Red Sea|🌊|Africa and Arabia are separating.|Atlantic,Pacific",
    "A wide ocean with a spreading ridge in the middle is the...|Atlantic|🌊|Americas moving away from Europe and Africa.|Red Sea,Himalaya",
    "An ocean ringed by subduction zones and shrinking is the...|Pacific|🔥|The Ring of Fire.|Atlantic,Red Sea",
    "A collision of continents builds...|mountain ranges|🏔️|Like the Himalaya.|mid-ocean ridges,deep trenches",
    "Slivers of old seafloor found in mountain belts are...|ophiolites|🧩|They are pieces of oceanic crust.|evaporites,stromatolites",
    "The Appalachians mark...|a closed ocean|🏞️|Collision long ago.|an active rift,a hot spot",
    "A Wilson cycle takes...|hundreds of millions of years|⏳|Very slow.|a few thousand years,about a century"
  ], "Think about how oceans open, grow, shrink and close."));
  a.push(L("Ocean layers and the thermocline", [
    "Three layers|🌊|The open ocean is layered by temperature. The warm, wind-mixed <b>surface layer</b> is about the top 100-200 m. Below it is the <b>thermocline</b>, where temperature drops quickly with depth. Under that is the cold <b>deep layer</b>, mostly 0 to 4 °C.",
    "A stable lid|⚖️|Warm water is less dense, so it floats on cold water. The thermocline acts as a lid that slows the mixing of nutrients up from below. It is permanent in the tropics, seasonal at mid-latitudes and weak near the poles.",
    "Light and life|🐋|Most ocean life lives in the sunlit <b>photic zone</b>, roughly the top 200 m. Below about 1000 m it is completely dark."
  ], [
    "The layer where temperature drops quickly with depth is the...|thermocline|🌡️|Thermo means heat.|halocline,troposphere",
    "Most of the deep ocean has a temperature of about...|0 to 4 °C|❄️|Close to freezing.|15 to 20 °C,25 to 30 °C",
    "Warm water is ____ than cold water.|less dense|🌡️|That is why it floats.|more dense,saltier",
    "The thermocline slows the upward mixing of...|nutrients|🌱|Food for plankton.|ocean waves,tides",
    "The sunlit upper ocean is the...|photic zone|☀️|Photo means light.|abyssal zone,benthic zone",
    "A seasonal thermocline is typical at...|mid-latitudes|🧭|Neither the equator nor the poles.|the poles only,the equator only",
    "The wind-mixed surface layer is about how deep?|100 to 200 m|📏|Much thinner than the full ocean.|4 km,10 m",
    "The surface layer is mixed mainly by...|wind and waves|🌬️|They stir the top.|volcanoes,glaciers"
  ], "Think about warm water floating on cold water."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[11], a[12], a[13], a[15], a[16], a[17]]));
  a.push(MIX("Level 25 Challenge", [a[0], a[1], a[2], a[4], a[6], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[3], a[5]]));

  // ================= LEVEL 26 =================
  const b = [];
  b.push(L("Newton's law of gravitation", [
    "The law|🍎|Every mass pulls on every other mass: F = G m₁ m₂ / r². The force grows with both masses and gets weaker with the <b>square of the distance</b>.",
    "Inverse-square|📉|Double the distance and the force becomes 1/4. Triple it and the force becomes 1/9. Halve the distance and the force becomes 4 times bigger. Double one mass and the force doubles.",
    "Surface gravity|🌍|At Earth's surface g = GM/R² is about 9.8 m/s². The Moon pulls on Earth with exactly the same size of force as Earth pulls on the Moon (equal and opposite)."
  ], [
    "If the distance between two masses doubles, the gravity force becomes...|one quarter|📉|Think of the square of the distance.|one half,four times",
    "If the distance between two masses triples, the force becomes...|one ninth|📉|Three squared.|one third,one sixth",
    "If the distance between two masses is halved, the force becomes...|four times bigger|📈|Two squared, the other way.|twice as big,one quarter",
    "If one mass is doubled (the other and the distance staying the same), the force...|doubles|⚖️|The force is proportional to each mass.|stays the same,quarters",
    "If both masses are doubled, the force becomes...|four times bigger|⚖️|Two doublings multiply.|twice as big,eight times bigger",
    "The acceleration due to gravity at Earth's surface is about...|9.8 m/s²|🌍|Close to ten.|1.6 m/s²,24.8 m/s²",
    "At one Earth radius above the surface (twice the distance from the center), gravity is...|one quarter|🛰️|Twice as far from the center.|one half,one ninth",
    "Compared with Earth's pull on the Moon, the Moon's pull on Earth is...|equal in size|🌕|Newton's third law.|much larger,much smaller"
  ], "Remember: force depends on the masses and on the distance squared."));
  b.push(L("Orbital speed and period", [
    "Falling around|🛰️|An orbit is a fall around a planet with so much sideways speed that the surface curves away. For a circular orbit v = √(GM/r), where r is measured from the planet's center.",
    "Higher means slower|🐢|The farther out, the slower the orbit. The International Space Station (about 400 km up) moves at about 7.7 km/s and circles Earth in about 92 minutes. A geostationary satellite (about 36000 km up) moves at about 3.1 km/s and takes 24 hours.",
    "Weightless?|🧑‍🚀|The speed does not depend on the satellite's mass. Astronauts float because they and the station are in <b>free fall</b>, not because gravity is missing. At the ISS gravity is still about 90% of its surface value."
  ], [
    "The ISS moves at about...|7.7 km/s|🛰️|A few kilometers every second.|3.1 km/s,0.77 km/s",
    "The ISS circles Earth in about...|92 minutes|⏱️|Around an hour and a half.|24 hours,6 hours",
    "A geostationary satellite has a period of...|24 hours|📡|The same as Earth's rotation.|92 minutes,12 hours",
    "A higher circular orbit has a ____ speed.|slower|🐢|Gravity is weaker farther out.|faster,the same",
    "In v = √(GM/r), M is the mass of...|the central planet|🪐|The body being orbited.|the satellite,the astronaut",
    "Astronauts on the ISS float because they are...|in free fall|🧑‍🚀|They fall around Earth together with the station.|beyond gravity,in a vacuum",
    "A geostationary satellite stays over one spot because its period matches...|Earth's rotation|📡|It must turn at the same rate.|the Moon's orbit,Earth's orbit",
    "If the orbit radius becomes 4 times bigger, the orbital speed becomes...|half|📐|v goes as one over the square root of r.|double,one quarter"
  ], "Remember that higher orbits are slower."));
  b.push(L("Wave refraction and longshore drift", [
    "Refraction|🌊|Waves slow down in shallow water. The part of a wave nearest the shore slows first, so wave crests bend (<b>refract</b>) to line up with the coast. Wave energy focuses on headlands and spreads out in bays, so headlands erode faster.",
    "Longshore drift|➡️|Waves often arrive at an angle. The swash carries sand up the beach at that angle and the backwash pulls it straight down the slope, so grains zigzag along the coast. This is <b>longshore drift</b>.",
    "Results|🏖️|Drifting sand builds <b>spits</b> where the coast turns away. Groynes (walls built across a beach) trap sand but can starve beaches farther along."
  ], [
    "Waves bending to line up with the shore is called...|refraction|🌊|Light does the same in glass.|reflection,diffraction",
    "Waves slow down when the water becomes...|shallow|📉|Near the shore.|deep,cold",
    "Wave energy is concentrated on...|headlands|🏞️|Parts that stick out.|bays,sandbars",
    "Sand moving along a coast is called...|longshore drift|➡️|Along the shore.|upwelling,tidal bore",
    "The backwash pulls sand...|straight down the slope|⬇️|Gravity pulls it directly down the beach.|at the same angle as the waves,up the beach",
    "A ridge of sand that grows out where the coast turns is a...|spit|👆|A finger of sand.|stack,arch",
    "Walls built across a beach to trap drifting sand are...|groynes|🧱|They stick out into the sea.|levees,dams",
    "Bays tend to be sites of...|deposition|⏬|Wave energy is spread out.|erosion,uplift"
  ], "Think about how waves slow in shallow water and arrive at an angle."));
  b.push(L("Coastal landforms", [
    "Erosion landforms|🧗|Waves cut <b>sea cliffs</b>. Cracks widen into caves, then arches, then <b>sea stacks</b>. A flat <b>wave-cut platform</b> remains at the base of the cliff.",
    "Deposition landforms|🏝️|Waves and currents build beaches, spits and <b>barrier islands</b>, which are long sandy islands parallel to the coast with a lagoon behind.",
    "Rising or falling sea|🗺️|<b>Emergent</b> coasts (land rising or sea level falling) show raised beaches. <b>Submergent</b> coasts (sea level rising or land sinking) have drowned valleys: rias are drowned river valleys and fjords are drowned glacial valleys."
  ], [
    "A sea cave that erodes right through a headland becomes a sea...|arch|🌉|Water passes under it.|stack,spit",
    "When a sea arch collapses, a standing pillar of rock is left: a sea...|stack|🗿|Tall and alone.|spit,lagoon",
    "The flat rock surface left at the base of a cliff is a wave-cut...|platform|🪨|Like a stage.|stack,arch",
    "A long sandy island parallel to the coast with a lagoon behind it is a...|barrier island|🏝️|It protects the coast.|spit,stack",
    "A drowned river valley is a...|ria|🏞️|Flooded by rising seas.|fjord,delta",
    "A drowned glacial valley is a...|fjord|❄️|Deep, steep sides.|ria,estuary",
    "A coast formed by rising sea level or sinking land is...|submergent|⬆️|The sea comes in.|emergent,uplifted",
    "Raised beaches show that a coast is...|emergent|📈|The land rose or the sea fell.|submergent,glaciated"
  ], "Think about whether the sea is eroding, depositing, rising or falling."));
  b.push(L("The carbonate system and ocean acidification", [
    "CO₂ in the sea|🧪|The ocean absorbs about a quarter of the CO₂ we release. CO₂ + H₂O forms carbonic acid, which releases H⁺ and lowers pH. Ocean surface pH has fallen from about 8.2 to about 8.1, which is about 30% more hydrogen ions (pH is logarithmic).",
    "Shells|🐚|Extra H⁺ combines with carbonate ions (CO₃²⁻), leaving fewer to build calcium carbonate (CaCO₃) shells and skeletons. Corals, oysters and tiny sea snails called pteropods struggle most. Cold water holds more CO₂, so polar seas are at greater risk.",
    "Still basic|⚖️|Seawater is slightly basic (pH about 8.1) and buffered, so it will not become acidic in the chemical sense. Over thousands of years sediments can neutralize the extra CO₂."
  ], [
    "The pH of surface seawater today is about...|8.1|🧪|Slightly above neutral.|6.0,3.0",
    "The pH scale is...|logarithmic|📈|Each unit is a factor of ten.|linear,circular",
    "CO₂ dissolved in water forms...|carbonic acid|💧|A weak acid.|sulfuric acid,lime",
    "Shells and coral skeletons are made of...|calcium carbonate|🐚|CaCO₃.|silicon dioxide,iron oxide",
    "Ocean acidification leaves fewer ____ for making shells.|carbonate ions|⬇️|CO₃²⁻.|chloride ions,sodium ions",
    "The ocean has absorbed about what fraction of our CO₂ emissions?|a quarter|🌊|Not all, not none.|almost none,nearly all",
    "Even with acidification, seawater is still...|slightly basic|🧪|The pH is above 7.|strongly acidic,neutral",
    "Which group has the most trouble building shells in more acidic water?|corals|🪸|Reef builders.|sharks,whales"
  ], "Think about CO₂ dissolving in water and what it removes."));
  b.push(L("Clausius-Clapeyron and moist air", [
    "More vapor when warm|🌡️|The most water vapor air can hold grows quickly with temperature, by about <b>7% for each 1 °C</b> of warming. This is the <b>Clausius-Clapeyron relation</b>.",
    "Examples|📈|Air at 30 °C can hold about three times as much vapor as air at 10 °C (about 30 g/m³ compared with 9 g/m³). A 2 °C warming raises the capacity by about 14%.",
    "Heavier downpours|⛈️|Warmer air holds more moisture, so heavy rain events can drop more rain. Dry spells can also last longer because evaporation dries land faster."
  ], [
    "Warming by 1 °C raises the vapor capacity of air by about...|7%|📈|Not very large and not tiny.|1%,50%",
    "Air at 30 °C compared with air at 10 °C can hold...|about three times as much vapor|🌡️|Much more.|the same amount,half as much",
    "The relation linking temperature to saturation vapor pressure is named for...|Clausius and Clapeyron|🧑‍🔬|Two scientists.|Coriolis and Rossby,Kepler and Newton",
    "A warmer atmosphere allows storms with...|heavier downpours|⛈️|More moisture is available.|lighter drizzle only,no clouds",
    "When air cools below its saturation point, the extra vapor...|condenses|☁️|It forms droplets.|evaporates faster,freezes at once",
    "Cold air can hold ____ vapor than warm air.|less|❄️|Its capacity is lower.|more,the same amount of",
    "Saturated air has a relative humidity of...|100%|💧|Full.|0%,50%",
    "A 2 °C warming raises vapor capacity by about...|14%|📈|Twice the per-degree rate.|2%,70%"
  ], "Warm air is like a bigger sponge for water vapor."));
  b.push(L("Pressure and height", [
    "Weight of the air|⚖️|Air pressure at any height equals the weight of the air above. At sea level it is about 1013 hPa (hectopascals).",
    "Falling with height|📉|Pressure drops quickly near the ground. At about 5.5 km it is only about half the sea-level value, which means half of the air's mass lies below 5.5 km. At the jet-stream height of 11 km it is less than a quarter.",
    "Thin air|🏔️|Every 5.5 km or so the pressure halves again. The air near Everest's summit is still about 21% oxygen, but each breath holds about one third as many molecules, which is why climbers struggle."
  ], [
    "Standard sea-level air pressure is about...|1013 hPa|⚖️|About a thousand.|500 hPa,100 hPa",
    "At 5.5 km altitude the pressure is about...|half of sea level|📉|Half the air is below.|double sea level,almost zero",
    "Half of the atmosphere's mass lies below about...|5.5 km|📏|About the height of a tall mountain.|50 km,100 km",
    "Air pressure is the weight of the...|air above|⬇️|Everything piled overhead.|air below,air to the side",
    "When you climb a mountain, air pressure...|decreases|🧗|There is less air above you.|increases,stays the same",
    "Air at the summit of Mount Everest is still about what percent oxygen?|21%|🏔️|The same mix as at sea level.|10%,50%",
    "At 11 km altitude the pressure is...|less than a quarter of sea level|✈️|Jet cruising height.|about the same as sea level,about half of sea level",
    "The unit hPa stands for...|hectopascal|🔤|Hecto means one hundred.|high pascal,half pascal"
  ], "More air above means more pressure."));
  b.push(L("Reading weather maps", [
    "Isobars|🗺️|<b>Isobars</b> are lines joining equal pressure. Lines that are close together mean strong winds. Closed loops mark highs (H) and lows (L).",
    "Fronts and weather|🌧️|A blue line with triangles shows a <b>cold front</b>. A red line with semicircles shows a <b>warm front</b>. Highs usually bring clear, dry weather; lows usually bring clouds and rain.",
    "Wind barbs|🚩|A wind barb shows speed: a short feather is 5 knots, a long feather is 10 knots, and a flag (triangle) is 50 knots."
  ], [
    "Lines of equal pressure on a weather map are...|isobars|🗺️|Iso means equal.|isotherms,contours",
    "Isobars drawn close together mean...|strong winds|💨|The pressure changes quickly.|calm weather,warm air",
    "A cold front is drawn as a blue line with...|triangles|🔷|Pointed shapes.|semicircles,circles",
    "A warm front is drawn as a red line with...|semicircles|🔴|Rounded shapes.|triangles,stars",
    "A high-pressure area usually brings...|clear weather|☀️|Sinking air dries out.|clouds and rain,hurricanes",
    "A low-pressure area usually brings...|clouds and rain|🌧️|Rising air cools and condenses.|clear weather,deserts",
    "A long feather on a wind barb is...|10 knots|🚩|The shorter one is half of it.|5 knots,50 knots",
    "A flag (triangle) on a wind barb stands for...|50 knots|🚩|The biggest symbol.|10 knots,5 knots"
  ], "Match each map symbol to its meaning."));
  b.push(L("Transgression and regression", [
    "Sea level changes|📈|When sea level rises, the shoreline moves landward. This is <b>transgression</b>. When sea level falls, the shoreline moves seaward. This is <b>regression</b>.",
    "Walther's law|📚|Rock types (facies) that lie side by side also lie one above another in a vertical stack, if there are no gaps. A transgression leaves beach sand, then shallow mud, then deeper limestone or mud upward.",
    "Causes|🌍|Ice sheets growing and melting change global sea level (<b>eustasy</b>). Moving plates change ocean basin volume. Local sinking or uplift also matters."
  ], [
    "A shoreline moving landward as sea level rises is a...|transgression|⬆️|Trans means across.|regression,erosion",
    "A shoreline moving seaward as sea level falls is a...|regression|⬇️|The sea retreats.|transgression,deposition",
    "In a transgression the sediments upward become...|finer and deeper-water|📚|The sea gets deeper over time.|coarser gravel,volcanic ash",
    "Walther's law is about...|facies|📚|Rock types side by side and stacked.|fossil ages,magnetic polarity",
    "Global sea level change caused by ice and ocean volume is...|eustasy|🌍|Not local.|isostasy,subsidence",
    "When ice sheets grow, global sea level...|falls|🧊|Water is locked on land.|rises,stays fixed",
    "During a regression, shallower facies cover...|deeper facies|⬇️|The shoreline moves seaward.|older mountains,volcanoes",
    "A falling sea level moves the shoreline...|seaward|🌊|Toward the open sea.|landward,upward"
  ], "Think about the shoreline moving inland or toward the sea."));
  b.push(L("How fossils form: taphonomy", [
    "Becoming a fossil|🦴|Most organisms never become fossils. <b>Taphonomy</b> is the study of what happens after death: decay, scavenging, burial and mineral change.",
    "Good conditions|⏳|The best chances come with hard parts such as shells, bone and teeth, quick burial in low-oxygen mud and no scavengers. Minerals can fill pores in bone (<b>permineralization</b>). A shell can dissolve and leave a <b>mold</b>, and a mold filled with minerals is a <b>cast</b>.",
    "A biased record|⚠️|Marine animals with shells are over-represented. Soft-bodied animals like jellyfish rarely fossilize. Special sites called <b>Lagerstätten</b>, like the Burgess Shale, preserve soft tissue."
  ], [
    "The study of what happens to an organism after death is...|taphonomy|🦴|From a Greek word for burial.|taxonomy,topography",
    "Which body parts are most likely to fossilize?|hard parts|🦷|Shells, bones and teeth.|soft parts,skin",
    "Quick burial helps because it protects remains from...|scavengers and decay|⚰️|Things that destroy them.|ice and wind,stars",
    "Minerals filling the pores of bone is called...|permineralization|💎|Mineral filling.|mold making,carbonization only",
    "A mold that is filled with minerals makes a...|cast|🧩|A copy.|trace,coprolite",
    "The Burgess Shale is famous for preserving...|soft-bodied animals|🦐|Extraordinary detail.|only bones,only plants",
    "Which animals are least likely to be preserved?|jellyfish|🪼|No hard parts.|clams,snails",
    "The fossil record is biased toward...|marine animals with shells|🐚|Where burial is common.|desert plants,forest insects"
  ], "Think about what survives and what rots away."));
  b.push(L("Trace fossils and ancient environments", [
    "Tracks and burrows|👣|<b>Trace fossils</b> record activity rather than bodies. They include footprints, burrows, trails, nests and coprolites (fossil droppings).",
    "Reading the past|🏖️|Dinosaur trackways show speed (longer strides mean faster movement) and herd behavior. Burrows show whether the sea floor was shallow or deep and how much oxygen there was. Layered <b>stromatolites</b> built by microbial mats go back about 3.5 billion years.",
    "Why they matter|🔎|A trace fossil can exist even when the animal's body did not survive. They also help date rocks, since some burrow types first appear at the start of the Cambrian."
  ], [
    "A fossil of animal activity, like a footprint, is a...|trace fossil|👣|Not a body.|body fossil,mineral",
    "Fossilized droppings are called...|coprolites|💩|A rock with a funny past.|stromatolites,geodes",
    "A set of fossil footprints can show an animal's...|behavior and movement|🐾|How it moved.|exact color,exact age",
    "Layered structures built by microbial mats are...|stromatolites|🧫|One of the oldest fossils.|coprolites,ammonites",
    "A longer stride in a trackway means the animal was moving...|faster|🏃|Spread-out footprints.|slower,sleeping",
    "The oldest stromatolites are about...|3.5 billion years old|⏳|From early life.|35 million years old,350 million years old",
    "A trace fossil can exist even when the animal's body is...|not preserved|🦴|Gone.|fully intact,still alive",
    "Worm burrows in rock are...|trace fossils|🪱|They show activity.|body fossils,minerals"
  ], "Think about what a footprint or burrow can tell you."));
  b.push(L("Gravity anomalies", [
    "Tiny differences|⚖️|Gravity varies slightly with latitude, height and what lies below. Instruments called <b>gravimeters</b> measure it in <b>milligals</b> (1 gal = 1 cm/s²; Earth's g is about 980 gal).",
    "Anomalies|🔍|After correcting for height and latitude, a positive <b>Bouguer anomaly</b> means extra dense rock (an ore body or dense igneous rock). A negative anomaly means light rock (a sediment basin, a salt dome or a deep mountain root).",
    "Uses|🛢️|Gravity surveys help find oil basins, salt domes, mineral deposits and caves. Satellites such as GRACE measure changes in ice and groundwater from tiny changes in gravity."
  ], [
    "An instrument for measuring gravity is a...|gravimeter|⚖️|Gravity meter.|seismometer,barometer",
    "A positive gravity anomaly means there is...|denser rock below|⬆️|Extra mass.|lighter rock below,air below",
    "A negative gravity anomaly means there is...|lighter rock below|⬇️|Less mass.|denser rock below,more metal",
    "A deep mountain root produces a...|negative anomaly|🏔️|Light crust replaces dense mantle.|positive anomaly,no anomaly",
    "Salt is less dense than most rock, so a salt dome gives a...|negative anomaly|🧂|Less mass than its surroundings.|positive anomaly,magnetic anomaly",
    "A dense ore body gives a...|positive anomaly|⛏️|More mass.|negative anomaly,tidal anomaly",
    "The GRACE satellites measure changes in...|water and ice mass|🛰️|Heavy things moving around.|cloud cover,ocean color",
    "Gravity at the poles is ____ at the equator.|stronger than|🌍|Closer to the center and less spin effect.|weaker than,equal to"
  ], "More mass below means more gravity."));
  b.push(L("The Moon: terrains and origin", [
    "Two kinds of terrain|🌕|The bright <b>highlands</b> are old crust, about 4.4 to 4.5 billion years old. The dark <b>maria</b> are basalt lava plains, younger at about 3.1 to 3.9 billion years, filling large impact basins.",
    "Regolith|🧂|Impacts have broken the surface into dust and rubble called <b>regolith</b>. With no wind or rain to erase them, footprints can last millions of years.",
    "Origin|💥|The giant-impact hypothesis says a Mars-sized body (called Theia) hit the young Earth about 4.5 billion years ago and the debris formed the Moon. Support: the Moon's rocks match Earth's oxygen isotopes, and the Moon has a small iron core."
  ], [
    "The dark plains of the Moon are called...|maria|🌑|Latin for seas.|highlands,craters",
    "The bright, heavily cratered regions are the...|highlands|🌕|Older terrain.|maria,regolith",
    "The maria are made mostly of...|basalt|🌋|Cooled lava.|granite,limestone",
    "Which is older, the highlands or the maria?|highlands|⏳|They have more craters.|maria,they are the same age",
    "The layer of dust and rubble on the Moon is the...|regolith|🧂|Broken rock.|mantle,crust",
    "The leading explanation for the Moon's origin is a...|giant impact|💥|A collision.|capture of a comet,splitting of the Sun",
    "The Mars-sized impactor in the giant-impact idea is named...|Theia|☄️|A Greek Titan.|Gaia,Titan",
    "Apollo footprints last because the Moon has no...|wind or rain|👣|Nothing erases them.|craters,sunlight"
  ], "Think about lava, impacts and collisions."));
  b.push(L("Stellar spectral classes", [
    "OBAFGKM|🌈|Stars are sorted by surface temperature. The order is O (hottest, over 30000 K, blue), B, A, F, G, K, M (coolest, about 3000 K, red). Remember: Oh Be A Fine Guy, Kiss Me.",
    "The Sun|☀️|The Sun is class G2 with a surface temperature of about 5800 K. Each class is divided into numbers 0 to 9, so A0 is hotter than A9.",
    "Why lines differ|🔬|Temperature decides which absorption lines are strong. Hydrogen lines are strongest in A stars, helium lines appear in hot stars, and molecules appear in cool M stars."
  ], [
    "Which spectral class is the hottest?|O|🔵|It is the first letter in the sequence.|M,G",
    "Which spectral class is the coolest?|M|🔴|It is the last letter in the sequence.|O,B",
    "The Sun is spectral class...|G|☀️|G2.|K,A",
    "O stars look...|blue|🔵|They are very hot.|red,yellow",
    "M stars look...|red|🔴|They are the coolest.|blue,white",
    "Which is hotter, an F star or a K star?|F star|🌡️|F comes earlier in the sequence.|K star,they are equal",
    "The Sun's surface temperature is about...|5800 K|🌡️|Several thousand kelvins.|58000 K,3000 K",
    "The sequence OBAFGKM goes from...|hottest to coolest|📏|O first.|coolest to hottest,largest to smallest"
  ], "Remember the order from hot blue O stars to cool red M stars."));
  b.push(L("Binary stars and mass", [
    "Pairs of stars|⭐|More than half of Sun-like stars have a companion. In a binary the two stars orbit their common center of mass. Kepler's third law gives their total mass: M₁ + M₂ = a³ / P² (in solar masses, with a in AU and P in years).",
    "Example|🧮|If a = 2 AU and P = 2 years, then a³ = 8 and P² = 4, so the total mass is 8 ÷ 4 = 2 solar masses.",
    "Kinds of binaries|🔭|Visual binaries are seen as two stars. Eclipsing binaries dim regularly when one passes in front of the other. Spectroscopic binaries show Doppler shifts. The heavier star is closer to the center of mass."
  ], [
    "A binary with a = 3 AU and P = 3 years has a total mass of...|3 solar masses|⭐|Cube 3 and divide by the square of 3.|9 solar masses,27 solar masses",
    "A binary with a = 4 AU and P = 4 years has a total mass of...|4 solar masses|⭐|Cube 4 and divide by the square of 4.|16 solar masses,64 solar masses",
    "A binary with a = 2 AU and P = 1 year has a total mass of...|8 solar masses|⭐|The cube of 2 divided by the square of 1.|2 solar masses,4 solar masses",
    "A binary with a = 4 AU and P = 2 years has a total mass of...|16 solar masses|⭐|The cube of 4 divided by the square of 2.|8 solar masses,32 solar masses",
    "In a binary, both stars orbit their common...|center of mass|🎯|Not the bigger star.|north pole,event horizon",
    "A binary that dims regularly as stars cross in front of each other is an...|eclipsing binary|🌗|Eclipses.|visual binary,spectroscopic binary",
    "A binary known from Doppler shifts of its lines is a...|spectroscopic binary|🌈|Spectrum.|visual binary,eclipsing binary",
    "The more massive star in a binary lies...|closer to the center of mass|⚖️|Like the heavy child on a seesaw.|farther from the center of mass,exactly at the edge"
  ], "Use total mass = a cubed divided by P squared."));
  b.push(L("Neutron stars and pulsars", [
    "Collapsed cores|🌟|When the core of a massive star collapses and leaves about 1.4 to 3 solar masses, protons and electrons merge into neutrons. The result is a <b>neutron star</b>, about 20 km across, so dense that a teaspoon would weigh billions of tonnes.",
    "Pulsars|📡|A <b>pulsar</b> is a spinning, magnetized neutron star that sends out beams like a lighthouse. We see pulses when a beam sweeps past Earth. Jocelyn Bell Burnell found the first one in 1967. Periods range from milliseconds to seconds.",
    "Mergers|💥|When two neutron stars merge they make gravitational waves and a glowing <b>kilonova</b>. These events help make heavy elements such as gold and platinum. One was seen in 2017."
  ], [
    "The dense leftover core of a massive star may be a...|neutron star|🌟|Made of neutrons.|white dwarf only,red giant",
    "A neutron star is about how wide?|20 km|📏|The size of a city.|20000 km,2 km",
    "A pulsar appears to blink because its beams sweep past us as it...|spins|🔦|Like a lighthouse.|explodes,cools",
    "The first pulsar was found in...|1967|📅|The late 1960s.|18671997",
    "A neutron star is made mostly of...|neutrons|⚛️|The name tells you.|iron,hydrogen",
    "Heavy elements like gold are partly made when neutron stars...|merge|💥|They collide.|cool,spin",
    "The glow from a neutron star merger is called a...|kilonova|✨|Thousand times a nova.|supernova,pulsar",
    "A teaspoon of neutron star material would weigh...|billions of tonnes|⚖️|Incredibly dense.|a few grams,a few kilograms"
  ], "Think about collapsed cores, spinning and collisions."));
  b.push(L("Quasars and active galaxies", [
    "Active galactic nuclei|🌀|Some galaxy centers shine extremely brightly as a supermassive black hole swallows gas. The gas forms a hot <b>accretion disk</b> that glows at all wavelengths. A galaxy like this has an <b>AGN</b> (active galactic nucleus).",
    "Quasars|💫|<b>Quasars</b> are the brightest AGN. They can outshine their whole galaxy and are seen billions of light-years away, so we see them as they were long ago. The first was identified in 1963.",
    "Jets|🚀|Some AGN shoot jets of particles at nearly the speed of light, stretching for thousands of light-years or more. Quasars were most common about 10 billion years ago. Today our Milky Way's black hole is quiet."
  ], [
    "The hot swirling gas around a black hole is the...|accretion disk|🌀|Gas falling in.|event horizon,photosphere",
    "The power source of a quasar is a...|supermassive black hole|⚫|At the galaxy's center.|neutron star,white dwarf",
    "The brightest kind of AGN is a...|quasar|💫|Very luminous.|pulsar,nova",
    "Quasars are mostly seen very...|far away|🔭|So they show the early universe.|nearby,inside our galaxy",
    "AGN jets travel at nearly the speed of...|light|🚀|The fastest thing.|sound,a jet plane",
    "Quasars were most common...|billions of years ago|⏳|Back when the universe was younger.|today,never",
    "The Milky Way's central black hole is currently...|quiet|😴|Not much gas falling in.|a bright quasar,an AGN with jets",
    "AGN stands for active galactic...|nucleus|🔤|The center.|network,nebula"
  ], "Think about black holes, hot gas and far-away light."));
  b.push(L("Chondrites and the age of the Solar System", [
    "Primitive meteorites|☄️|<b>Chondrites</b> contain <b>chondrules</b>, tiny melted spheres from the early Solar System. The meteorite as a whole was never melted, so it preserves the original material of the solar nebula. Carbonaceous chondrites contain water and organic compounds.",
    "Age|⏳|Dating the calcium-aluminum-rich inclusions in chondrites gives 4.567 billion years: the age of the Solar System. No Earth rocks are that old because erosion and plate tectonics recycle them. The oldest Earth minerals (zircons) are about 4.4 billion years old.",
    "Differentiated meteorites|🔩|Iron meteorites are pieces of the cores of asteroids that once melted and separated. They show that small bodies formed metal cores too."
  ], [
    "Tiny melted spherules inside meteorites are called...|chondrules|🔵|From a Greek word for grain.|geodes,xenoliths",
    "Primitive meteorites that were never melted are...|chondrites|☄️|Rich in chondrules.|irons,tektites",
    "The age of the Solar System is about...|4.567 billion years|⏳|Between four and five billion.|4.0 billion years,13.8 billion years",
    "No Earth rocks as old as the Solar System remain because they were...|recycled by erosion and tectonics|♻️|Earth is active.|never formed,all launched into space",
    "Iron meteorites are pieces of...|asteroid cores|🔩|From destroyed small worlds.|comet tails,planet crusts",
    "Carbonaceous chondrites contain water and...|organic compounds|🧪|Carbon-based molecules.|metallic iron only,diamonds only",
    "The inclusions used to date the Solar System are called...|CAIs|📅|Calcium-aluminum-rich ones.|ZAPs,TNTs",
    "The oldest minerals found on Earth are...|zircons|💎|Found in Western Australia.|olivines,garnets"
  ], "Meteorites are time capsules from the beginning of the Solar System."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[8], b[9], b[10], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 26 Challenge", [b[0], b[1], b[2], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17], b[3]]));

  // ================= LEVEL 27 =================
  const c = [];
  c.push(L("Radioactive decay and age equations", [
    "Decay law|☢️|The amount left is N = N₀ × (1/2)^(t / T½). After one half-life half remains, after two a quarter, after three an eighth, after four a sixteenth.",
    "Parent and daughter|🧪|With measured parent P and daughter D (and no daughter at the start), age t = (T½ / ln 2) × ln(1 + D/P). If D = P, exactly one half-life has passed. Common pairs: U-238 to Pb-206 (half-life 4.47 billion years), K-40 to Ar-40 (1.25 billion years), Rb-87 to Sr-87 (about 49 billion years).",
    "Isochrons|📈|The <b>isochron</b> method plots isotope ratios for several minerals from one rock. The slope gives the age and the method does not need to assume how much daughter was there at the start."
  ], [
    "What fraction of a radioactive isotope remains after two half-lives?|one quarter|☢️|Half of a half.|one half,one eighth",
    "What fraction remains after three half-lives?|one eighth|☢️|Half of a half of a half.|one quarter,one sixteenth",
    "What fraction remains after four half-lives?|one sixteenth|☢️|Halve four times.|one eighth,one quarter",
    "If daughter atoms equal parent atoms (D = P), how many half-lives have passed?|one|⚖️|Half has decayed.|two,zero",
    "If D/P = 3, how many half-lives have passed?|two|🧮|Add one to the ratio, then ask what power of two that is.|one,three",
    "The half-life of U-238 is about...|4.47 billion years|⏳|Billions of years.|704 million years,5730 years",
    "The half-life of K-40 (decaying to Ar-40) is about...|1.25 billion years|⏳|More than a billion years.|5730 years,4.47 billion years",
    "A method that plots ratios for several minerals to find an age is the...|isochron method|📈|Iso means equal.|carbon method,tree-ring method"
  ], "Each half-life halves the parent isotope."));
  c.push(L("How rocks melt", [
    "Three ways|🌋|Mantle rock is hot but solid because of high pressure. It melts in three ways. (1) <b>Decompression melting</b>: rising rock loses pressure (mid-ocean ridges and plumes). (2) <b>Flux melting</b>: water added lowers the melting point (subduction zones). (3) <b>Heat transfer</b>: hot magma heats the crust.",
    "Partial melting|⚖️|Rocks melt over a range of temperatures. Only part melts, and the first melt comes from the minerals that melt easiest. It is richer in silica than the source. Partial melting of mantle peridotite gives basalt.",
    "Results|🧭|Ridges make basalt by decompression. Arcs make andesite by wet melting. Basalt ponding under continents can melt crust and make rhyolite."
  ], [
    "Melting caused by a drop in pressure is...|decompression melting|⬇️|The rock rises.|flux melting,contact melting",
    "Melting caused by adding water is...|flux melting|💧|Water acts as a flux.|decompression melting,friction melting",
    "Mid-ocean ridges produce magma mainly by...|decompression melting|↔️|Mantle rises as plates separate.|flux melting,impact melting",
    "Subduction zone magma forms mainly because of added...|water|🔥|It lowers the melting point.|oxygen,metal",
    "Partial melting of mantle peridotite makes...|basalt|⚫|The most common ocean crust.|granite,limestone",
    "Adding water makes the melting temperature...|lower|📉|It acts like a flux.|higher,exactly the same",
    "The mantle is solid despite high temperature because of high...|pressure|🗜️|It squeezes the atoms together.|gravity waves,humidity",
    "Hot basalt magma under a continent can melt crust by...|heat transfer|🌡️|Heat flows from hot to cool.|decompression,adding water"
  ], "Think about pressure, water and heat."));
  c.push(L("Solid solutions and crystal chemistry", [
    "Atoms that swap|🧬|In a crystal, atoms of similar size and charge can replace each other. In olivine, Mg²⁺ and Fe²⁺ swap, giving the formula (Mg,Fe)₂SiO₄. In plagioclase feldspar, Ca²⁺ and Na⁺ swap.",
    "Rules of thumb|📏|Substitution is easy when ionic radii differ by less than about 15% and the charges are equal or can be balanced. Silicon is small and sits among 4 oxygen atoms in a tetrahedron.",
    "Why it matters|⚗️|A mineral's composition can change smoothly, which records the temperature. Trace elements hide inside minerals this way, which is how radiometric dating works: rubidium replaces potassium."
  ], [
    "The olivine solid solution swaps between...|Mg and Fe|🟢|Two common metals in the mantle.|Na and Cl,Si and C",
    "Plagioclase feldspar swaps between...|Ca and Na|⚪|Calcium and sodium.|Mg and Fe,K and Rb",
    "Atoms substitute most easily when they have similar...|size and charge|📏|Like fitting the same lock.|color and taste,age and weight",
    "The magnesium-rich end of olivine is...|forsterite|🟢|It begins with F.|fayalite,quartz",
    "The iron-rich end of olivine is...|fayalite|🟤|It begins with F too.|forsterite,quartz",
    "A mineral whose composition varies smoothly between end members is a...|solid solution|🔄|A mixture in the crystal.|breccia,conglomerate",
    "Silicon is surrounded by how many oxygen atoms in a silicate tetrahedron?|4|🔺|A tetrahedron has four corners.|6,8",
    "Rubidium substitutes into minerals for...|potassium|⚛️|It has a similar size and the same charge.|silicon,iron"
  ], "Think about similar-sized atoms swapping places."));
  c.push(L("Index minerals and isograds", [
    "Barrovian sequence|🔥|When clay-rich rock is heated and squeezed, new minerals appear step by step as grade increases: chlorite, then biotite, then garnet, then staurolite, then kyanite, then sillimanite.",
    "Isograds|🗺️|A line on a map where a new index mineral first appears is an <b>isograd</b>. It marks a line of equal metamorphic grade.",
    "Polymorphs|💎|Andalusite, kyanite and sillimanite all have the formula Al₂SiO₅ but different crystal structures. Andalusite forms at low pressure, kyanite at high pressure and sillimanite at high temperature. Together they give pressure-temperature-time (P-T-t) paths."
  ], [
    "Which index mineral appears first (lowest grade) in the Barrovian sequence?|chlorite|🟢|Lowest grade.|sillimanite,garnet",
    "Which of these is the highest-grade index mineral?|sillimanite|🔥|It forms at high temperature.|biotite,chlorite",
    "A line where a new index mineral first appears is an...|isograd|🗺️|Equal grade.|isobar,isotherm",
    "Kyanite forms at...|high pressure|⬇️|Deep burial.|low pressure,low temperature",
    "Andalusite forms at...|low pressure|⬆️|Shallow depth.|high pressure,very high temperature",
    "Sillimanite forms at...|high temperature|🌡️|Hot rocks.|low temperature,low pressure only",
    "Kyanite, andalusite and sillimanite are polymorphs, meaning they share the same...|chemical formula|⚗️|Al₂SiO₅.|crystal structure,age",
    "P-T-t stands for pressure, temperature and...|time|⏳|The third variable.|texture,thickness"
  ], "Each mineral appears at its own temperature and pressure."));
  c.push(L("Seismic travel times and shadow zones", [
    "P and S waves|📊|P waves travel at about 6 km/s in the crust and S waves at about 3.5 km/s, so P arrives first. The gap between them (the <b>S-P lag</b>) grows with the distance from the earthquake.",
    "Locating a quake|📍|In the crust, each second of lag is about 8 km of distance. A lag of 10 seconds means about 80 km. With three stations, draw three circles and where they cross is the epicenter (<b>triangulation</b>).",
    "Shadow zones|🌍|S waves cannot pass through the liquid outer core, so they are missing beyond about 103° from the quake. P waves bend in the core, leaving a P-wave shadow zone between roughly 104° and 140°."
  ], [
    "Which seismic wave arrives first?|P wave|1️⃣|P stands for primary.|S wave,surface wave",
    "The S-P lag time gets longer as the distance to the quake...|increases|📏|Farther means more lag.|decreases,stays the same",
    "A lag of 10 seconds means a distance of about...|80 km|🧮|About 8 km per second of lag.|10 km,800 km",
    "A lag of 5 seconds means a distance of about...|40 km|🧮|About 8 km per second of lag.|4 km,400 km",
    "How many stations are needed to locate an epicenter by triangulation?|three|📍|Three circles cross at one point.|one,two",
    "S waves do not arrive beyond about 103° because the outer core is...|liquid|💧|S waves cannot pass through fluid.|solid,frozen",
    "The ratio of P speed to S speed in the crust is about...|1.7|⚖️|Between one and two.|0.6,3.0",
    "Triangulation uses overlapping...|circles|⭕|One around each station.|squares,spirals"
  ], "Remember that P comes first and the gap shows distance."));
  c.push(L("Stream transport and the Hjulström curve", [
    "Speed and grain size|📉|Whether flowing water erodes, carries or drops a grain depends on the water velocity and the grain size. Medium sand (about 0.2 to 0.5 mm) is picked up at the lowest speed. Clay and silt need faster flow because the particles stick together (they are <b>cohesive</b>). Gravel needs fast flow because it is heavy.",
    "Loads|🎒|<b>Dissolved load</b> is ions in the water. <b>Suspended load</b> is silt and clay held up by turbulence. <b>Bed load</b> is sand and gravel that roll and bounce along the bottom. <b>Competence</b> is the largest grain a stream can move. <b>Capacity</b> is the total load.",
    "Floods and sorting|⚡|Stream power grows with discharge and slope, so floods move most sediment in a few days. As the flow slows, the biggest grains drop out first."
  ], [
    "The largest particle a stream can move is its...|competence|🪨|Ability.|capacity,discharge",
    "The total amount of sediment a stream can carry is its...|capacity|🎒|How much it holds.|competence,gradient",
    "Which grain size is easiest to erode by water?|medium sand|🏖️|Neither too fine nor too coarse.|clay,boulders",
    "Clay needs high velocity to erode because it is...|cohesive|🧲|The particles cling together.|heavy,dissolved",
    "Silt and clay carried within the water is the...|suspended load|🌫️|Held up by turbulence.|bed load,dissolved load",
    "Sand and gravel rolling along the bottom is the...|bed load|⚪|On the bed.|suspended load,dissolved load",
    "Ions carried invisibly in the water are the...|dissolved load|🧂|Not solid particles.|bed load,suspended load",
    "When a stream slows down, the first particles to be deposited are the...|largest|⬇️|The heaviest.|smallest,dissolved"
  ], "Think about how fast the water must go to move each size of grain."));
  c.push(L("Darcy's law", [
    "Flow through rock|💧|<b>Darcy's law</b> says Q = K × A × (Δh / L). K is the hydraulic conductivity (how easily water moves through the material), A is the cross-sectional area and Δh/L is the <b>hydraulic gradient</b>.",
    "Speed|🧮|The Darcy velocity (flow per unit area) is q = K × i. If K = 10 m/day and i = 0.01, then q = 0.1 m/day. The real speed in the pores is faster, because water only moves through the pore space (divide by porosity).",
    "Head|⬇️|Groundwater flows from high hydraulic head to low head. Gravel has high K and clay has low K."
  ], [
    "Darcy's law links flow to conductivity, area and the...|hydraulic gradient|📉|Slope of the water table.|porosity,salinity",
    "With K = 10 m/day and gradient 0.02, the Darcy velocity is...|0.2 m/day|🧮|Multiply K by the gradient.|2 m/day,0.002 m/day",
    "With K = 5 m/day and gradient 0.01, the Darcy velocity is...|0.05 m/day|🧮|Multiply K by the gradient.|0.5 m/day,0.005 m/day",
    "With K = 100 m/day and gradient 0.001, the Darcy velocity is...|0.1 m/day|🧮|Multiply K by the gradient.|1 m/day,0.01 m/day",
    "Which material has the highest hydraulic conductivity?|gravel|🪨|Large connected pores.|clay,solid granite",
    "Groundwater flows from...|high head to low head|⬇️|Downhill in terms of head.|low head to high head,north to south",
    "The real water speed in the pores is ____ the Darcy velocity.|greater than|🏃|Water uses only part of the area.|smaller than,equal to",
    "If the hydraulic gradient doubles, the flow...|doubles|✖️|Flow is proportional to gradient.|halves,stays the same"
  ], "Flow equals conductivity times gradient (times area)."));
  c.push(L("Geostrophic currents and boundary currents", [
    "Sea-surface slopes|🌊|Wind-driven gyres pile water up in the middle of an ocean, making a gentle dome up to about 1 m high. Water that flows downhill is turned by the Coriolis effect, so it flows around the dome along lines of equal sea-surface height. This is a <b>geostrophic current</b>. Satellite altimeters map these heights.",
    "Western boundary currents|⚡|The Gulf Stream, Kuroshio, Brazil Current and Agulhas Current are narrow, fast, deep and warm. They lie on the <b>western</b> sides of ocean basins. <b>Eastern boundary currents</b> (California, Canary, Humboldt) are broad, slow and cool.",
    "Volume|📦|Ocean flow is measured in <b>sverdrups</b> (1 Sv = 1 million m³/s). The Florida Current carries about 30 Sv, while all the world's rivers together carry only about 1 Sv."
  ], [
    "Geostrophic currents flow along lines of equal...|sea-surface height|🌊|Along the contours of the dome.|water color,air pressure",
    "Satellites measure sea-surface height with...|altimeters|🛰️|Height meters.|barometers,thermometers",
    "Narrow, fast, warm currents lie on the ____ side of ocean basins.|western|⬅️|Like the Gulf Stream.|eastern,northern",
    "The Gulf Stream is a...|western boundary current|🌡️|Warm and narrow.|eastern boundary current,deep upwelling",
    "The California Current is an...|eastern boundary current|❄️|Broad, slow and cool.|western boundary current,equatorial jet",
    "Eastern boundary currents are typically...|broad and slow|🐢|The opposite of the Gulf Stream.|narrow and fast,warm and narrow",
    "One sverdrup equals...|one million cubic meters per second|📦|A huge flow.|one cubic meter per second,one liter per hour",
    "The middle of a subtropical gyre has a sea surface that is...|raised|⛰️|Water piles up there.|lowered,flat"
  ], "Think about wind piling up water and the Coriolis effect turning it."));
  c.push(L("Seawater chemistry and residence time", [
    "Salts|🧂|Seawater has about 35 g of dissolved salt per kg (salinity 35). The major ions are chloride (about 55%), sodium (about 31%), sulfate, magnesium, calcium and potassium. Their ratios are almost the same everywhere (<b>constant proportions</b>).",
    "Residence time|⏳|The <b>residence time</b> of an element is the amount in the ocean divided by the rate it is added or removed. Sodium and chloride stay for tens of millions of years or more. Iron stays only about a hundred years. Water stays about 4000 years.",
    "Two behaviors|🧪|Long residence time means <b>conservative</b>: well mixed and the same everywhere. Short residence time or biological use means <b>nonconservative</b>: varies from place to place, like nitrate, phosphate and oxygen."
  ], [
    "Typical ocean salinity is about...|35 g per kg|🧂|About three and a half percent.|3 g per kg,350 g per kg",
    "The most abundant dissolved ion in seawater is...|chloride|🧂|More than sodium.|sodium,sulfate",
    "The principle of constant proportions says the ratios of major ions are...|the same everywhere|🌐|Even though total salt can vary.|different in every ocean,always changing",
    "Residence time equals the amount in the ocean...|divided by the input rate|➗|Amount over rate.|multiplied by the input rate,minus the input rate",
    "Which element has a long residence time?|sodium|⏳|Tens of millions of years.|iron,phosphate",
    "Which element has a short residence time?|iron|⏱️|Only about a hundred years.|sodium,chloride",
    "Nutrients are nonconservative because they are...|used by organisms|🌱|Life takes them up.|too salty,too heavy",
    "Elements with long residence times are...|well mixed|🥄|They have time to spread.|always patchy,absent"
  ], "Residence time is stock divided by flow."));
  c.push(L("Parcels, lapse rates and CAPE", [
    "Dry adiabatic rate|🎈|A rising unsaturated air parcel expands and cools at about 9.8 °C per km (the <b>dry adiabatic lapse rate</b>). A saturated parcel cools more slowly, about 5 to 6 °C per km, because condensation releases latent heat.",
    "Stability|⚖️|Lift a parcel and compare it with its surroundings. If it stays warmer than the air around it, it keeps rising: the air is <b>unstable</b>. If it becomes cooler, it sinks back: the air is <b>stable</b>. If the environmental lapse rate is more than 9.8 °C/km, the air is absolutely unstable.",
    "CAPE|⚡|<b>CAPE</b> (convective available potential energy) measures the energy a rising parcel can gain while warmer than its surroundings. Values above about 2500 J/kg support severe storms."
  ], [
    "The dry adiabatic lapse rate is about...|9.8 °C per km|🎈|Close to ten.|5 °C per km,0.98 °C per km",
    "Saturated air parcels cool ____ than dry ones as they rise.|more slowly|🐢|Because of latent heat.|more quickly,at the same rate",
    "Saturated parcels cool more slowly because of...|latent heat released|☁️|Condensation.|friction,gravity",
    "A lifted parcel that stays warmer than its surroundings is...|unstable|🔥|It keeps rising.|stable,neutral",
    "A lifted parcel that becomes cooler than its surroundings is...|stable|⬇️|It sinks back.|unstable,explosive",
    "If the environmental lapse rate is 12 °C per km, the air is...|absolutely unstable|🌪️|It is steeper than the dry rate.|absolutely stable,conditionally stable",
    "If the environmental lapse rate is 4 °C per km, the air is...|absolutely stable|🧊|It is less steep than the moist rate.|absolutely unstable,explosive",
    "A dry parcel that rises 2 km cools by about how many °C?|20|🧮|2 times 9.8.|10,5"
  ], "Compare the parcel's cooling with the air around it."));
  c.push(L("Stratospheric ozone chemistry", [
    "Chapman cycle|🛡️|UV light splits O₂ into two oxygen atoms. Each atom joins an O₂ to make O₃ (ozone). Ozone absorbs ultraviolet light and splits again, releasing heat. This warms the stratosphere with height. The ozone layer peaks at about 20 to 30 km.",
    "Destruction|🧪|A chlorine atom takes an oxygen from ozone (Cl + O₃ gives ClO + O₂), then ClO gives it away to another oxygen atom (ClO + O gives Cl + O₂). The chlorine is a <b>catalyst</b>, so one atom can destroy thousands of ozone molecules. CFCs release chlorine in the stratosphere.",
    "The hole|🕳️|In Antarctic winter, polar stratospheric clouds help turn chlorine into active forms. When sunlight returns in spring (September to October), ozone falls steeply. The Montreal Protocol of 1987 banned CFCs, and the ozone layer is slowly recovering."
  ], [
    "In the Chapman cycle, UV light splits O₂ into...|oxygen atoms|☀️|Two single atoms.|ozone molecules,water molecules",
    "Ozone absorbs harmful...|ultraviolet light|🕶️|UV.|infrared light,radio waves",
    "Ozone warms the stratosphere by absorbing UV and releasing...|heat|🌡️|Thermal energy.|sound,oxygen",
    "The ozone layer peaks at about...|20 to 30 km|📏|In the stratosphere.|2 to 3 km,200 to 300 km",
    "The catalyst that destroys ozone from CFCs is...|chlorine|🧪|Cl.|helium,carbon",
    "The treaty that banned CFCs is the...|Montreal Protocol|📜|Signed in 1987.|Paris Agreement,Kyoto Protocol",
    "The Antarctic ozone hole is deepest in...|September to October|📅|Spring in the south.|March to April,June to July",
    "Ozone near the ground is a harmful...|pollutant|🏭|It damages lungs.|nutrient,shield"
  ], "Think about UV making and breaking ozone."));
  c.push(L("The one-layer greenhouse model", [
    "Energy balance|⚖️|Earth absorbs sunlight S(1 - α) / 4, where S = 1361 W/m² and the albedo α is about 0.3. That is about 240 W/m². The Earth must radiate the same amount (σT⁴). The result is T ≈ 255 K (-18 °C) without a greenhouse effect.",
    "Adding a layer|🧅|Add one atmospheric layer that absorbs all the infrared and radiates half up and half down. The surface must then emit twice as much, so Ts = 2^(1/4) × 255 K ≈ 303 K. That is too warm because the real atmosphere absorbs only part. The real average is 288 K (15 °C).",
    "Forcing|📈|<b>Radiative forcing</b> is a change in the net energy flow. Doubling CO₂ adds about 3.7 W/m². With feedbacks, that leads to roughly 3 °C of warming."
  ], [
    "The solar constant is about...|1361 W/m²|☀️|More than a thousand.|240 W/m²,340 W/m²",
    "Earth's average absorbed sunlight is about...|240 W/m²|⚖️|After albedo and spreading over the sphere.|1361 W/m²,10 W/m²",
    "Earth's temperature without a greenhouse effect would be about...|255 K|🥶|Well below freezing.|288 K,373 K",
    "Earth's actual average surface temperature is about...|288 K|🌍|About 15 °C.|255 K,373 K",
    "We divide by 4 because a sphere's surface area is...|four times its shadow area|⚪|Disk against sphere.|four times its volume,half its radius",
    "Doubling CO₂ gives a forcing of about...|3.7 W/m²|📈|A few watts.|37 W/m²,0.37 W/m²",
    "The natural greenhouse effect warms Earth by about...|33 K|🌡️|Difference between 288 K and 255 K.|3 K,100 K",
    "The one-layer model overshoots the real temperature because the real atmosphere...|absorbs only part of the infrared|🧅|It is not a perfect blanket.|absorbs all the infrared,has no clouds"
  ], "Absorbed energy in equals emitted energy out."));
  c.push(L("Parallax, parsecs and magnitudes", [
    "Parsecs|📐|Distance in parsecs is d = 1 / p, with p the parallax angle in arcseconds. A star with p = 0.1″ is 10 parsecs away. One parsec is about 3.26 light-years.",
    "Magnitudes|🔢|A smaller apparent magnitude m means a brighter star. A difference of 5 magnitudes is a factor of 100 in brightness. Absolute magnitude M is the magnitude the star would have at 10 parsecs.",
    "Distance modulus|🧮|m - M = 5 log₁₀(d / 10 pc). If m - M = 0 the star is at 10 pc. If m - M = 5 the star is at 100 pc."
  ], [
    "A star with a parallax of 0.5″ is how many parsecs away?|2|📐|One divided by the parallax.|5,0.5",
    "A star with a parallax of 0.25″ is how many parsecs away?|4|📐|One divided by the parallax.|0.25,2.5",
    "A star with a parallax of 0.05″ is how many parsecs away?|20|📐|One divided by the parallax.|0.5,2",
    "One parsec is about how many light-years?|3.26|📏|A little more than three.|1,32.6",
    "A difference of 5 magnitudes means a brightness factor of...|100|🔢|The scale is logarithmic.|5,10",
    "A brighter star has a ____ apparent magnitude.|smaller|🔦|The scale runs backward.|larger,negative only",
    "If m - M = 5, the distance is...|100 pc|🧮|From the formula.|10 pc,50 pc",
    "If m - M = 10, the distance is...|1000 pc|🧮|Two steps of five magnitudes.|100 pc,10000 pc"
  ], "Use d = 1/p, and remember that magnitude runs backward."));
  c.push(L("Inverse-square law and standard candles", [
    "Flux|💡|The brightness we receive (flux) is F = L / (4πd²), where L is the star's luminosity. Double the distance and the flux drops to a quarter. The Sun's luminosity is 3.8 × 10²⁶ W.",
    "Standard candles|🕯️|If we know an object's luminosity, measuring its flux gives its distance. Examples: Cepheid variable stars and Type Ia supernovae. Henrietta Leavitt found in 1912 that a Cepheid's pulsation period tells its luminosity.",
    "Magnitude difference|🔢|A factor of 100 in brightness is 5 magnitudes. A factor of 10 is 2.5 magnitudes."
  ], [
    "If the distance to a light source triples, its flux becomes...|one ninth|📉|Three squared.|one third,one sixth",
    "If the distance becomes 10 times larger, the flux becomes...|one hundredth|📉|Ten squared.|one tenth,one thousandth",
    "A star appears 4 times brighter than an identical star. It is...|half as far away|📏|Brightness goes as one over distance squared.|four times as far away,twice as far away",
    "A star that is 100 times brighter is how many magnitudes brighter?|5|🔢|Logarithmic.|2.5100",
    "A star that is 10 times brighter is how many magnitudes brighter?|2.5|🔢|Half of five.|5,10",
    "The astronomer who found the Cepheid period-luminosity relation was...|Henrietta Leavitt|🔭|She worked at Harvard.|Edwin Hubble,Carl Sagan",
    "A standard candle is an object with a known...|luminosity|🕯️|Its true brightness.|distance,color only",
    "Two stars have equal luminosity but one is twice as far. Its flux is...|one quarter|🔦|Two squared.|one half,double"
  ], "Brightness drops with the square of distance."));
  c.push(L("Telescope resolution and light gathering", [
    "Resolution|🔭|The smallest angle a telescope can separate is about θ = 1.22 λ / D (the Rayleigh criterion), where λ is the wavelength and D is the mirror or dish diameter. Bigger D or shorter λ gives finer detail.",
    "Light gathering|🪞|Light-gathering power grows with the area, so with D². A 4 m mirror collects 16 times as much light as a 1 m mirror.",
    "Blur and linking|🌫️|Air turbulence blurs images (<b>seeing</b>). <b>Adaptive optics</b> correct it, and space telescopes avoid it. <b>Interferometry</b> links several telescopes so that the resolution matches the distance between them, as in the Event Horizon Telescope."
  ], [
    "If you double a telescope's diameter, its light gathering becomes...|four times|🪞|Area goes as the diameter squared.|twice,eight times",
    "If you double the diameter, the smallest angle it can resolve becomes...|half as large|🔍|Finer detail.|twice as large,the same",
    "Shorter wavelengths give ____ detail.|finer|🌈|Smaller angle.|coarser,no",
    "Radio telescopes need huge dishes because radio waves have very...|long wavelengths|📡|λ is large.|short wavelengths,high energy",
    "The blurring of images by Earth's atmosphere is called...|seeing|🌫️|Turbulent air.|parallax,redshift",
    "A technique that corrects atmospheric blur is...|adaptive optics|🪞|Mirrors that change shape.|interferometry,photometry",
    "Combining several telescopes to get high resolution is...|interferometry|🔗|Waves interfering.|photometry,spectroscopy",
    "A 4 m mirror collects how many times the light of a 1 m mirror?|16|🧮|Four squared.|4,8"
  ], "Think about diameter, wavelength and the atmosphere."));
  c.push(L("Spectral lines and the Doppler shift", [
    "Kirchhoff's laws|🌈|A hot dense object makes a continuous spectrum. Hot thin gas makes bright <b>emission lines</b>. Cool gas in front of a hot source makes dark <b>absorption lines</b>. Each element has its own set of lines.",
    "Energy levels|⚛️|An electron jumping down to a lower level emits a photon with the energy of the gap. In hydrogen, the red Hα line is at 656 nm.",
    "Redshift|🚨|The redshift is z = Δλ / λ₀, which is about v / c for small speeds (c = 300000 km/s). A line at 500 nm seen at 501 nm has z = 0.002, so the source moves away at 600 km/s."
  ], [
    "Hot thin gas gives a spectrum of...|emission lines|✨|Bright lines.|absorption lines,a continuous rainbow",
    "Cool gas in front of a hot source gives...|absorption lines|⬛|Dark lines.|emission lines,no lines",
    "A hot dense object gives a...|continuous spectrum|🌈|A rainbow.|line spectrum,no light",
    "An atom emits light when an electron...|drops to a lower energy level|⬇️|It releases energy.|jumps to a higher level,leaves the Solar System",
    "The red hydrogen line Hα is at about...|656 nm|🔴|Between 600 and 700 nm.|486 nm,121 nm",
    "A line at 600 nm observed at 600.6 nm means a speed of...|300 km/s|🧮|z = 0.001.|30 km/s,3000 km/s",
    "A line at 400 nm observed at 404 nm means a speed of...|3000 km/s|🧮|z = 0.01.|300 km/s,30000 km/s",
    "A redshift means the source is moving...|away from us|🔴|The wavelengths stretch.|toward us,sideways only"
  ], "Match the kind of gas with the kind of lines it makes."));
  c.push(L("Stellar fusion pathways", [
    "Proton-proton chain|☀️|In the Sun (core about 15 million K), hydrogen fuses by the <b>proton-proton chain</b>: four H nuclei make one He-4 nucleus. About 0.7% of the mass becomes energy (E = mc²).",
    "CNO cycle|🔥|In stars more than about 1.3 solar masses the core is hotter, and the <b>CNO cycle</b> dominates. Carbon, nitrogen and oxygen act as catalysts, and the rate is extremely sensitive to temperature.",
    "Later stages|⚗️|At about 100 million K, helium fuses to carbon by the <b>triple-alpha</b> process (3 He-4 gives C-12). Massive stars go on to burn carbon, neon, oxygen and silicon. Fusing iron takes in energy instead of releasing it, so fusion ends at iron."
  ], [
    "The Sun mainly fuses hydrogen by the...|proton-proton chain|☀️|Protons joining.|CNO cycle,triple-alpha process",
    "Massive stars fuse hydrogen mainly by the...|CNO cycle|🔥|Carbon, nitrogen and oxygen help.|proton-proton chain,triple-alpha process",
    "Four hydrogen nuclei fuse to make...|helium-4|🎈|The second element.|carbon-12,oxygen",
    "About what percent of the mass becomes energy in hydrogen fusion?|0.7%|⚡|Less than one percent.|7%,70%",
    "The triple-alpha process makes...|carbon|🪨|Three helium nuclei join.|iron,hydrogen",
    "Helium burning needs a temperature of about...|100 million K|🌡️|Hotter than hydrogen burning.|15 million K,5800 K",
    "Fusion in a star's core stops at iron because fusing iron...|absorbs energy|⛔|No net gain.|releases a lot of energy,makes hydrogen",
    "The formula linking mass and energy is...|E = mc²|🧮|Einstein.|F = ma,P = IV"
  ], "Think about temperature: hotter cores use other pathways."));
  c.push(L("How planets form: core accretion", [
    "Building up|🪨|Dust grains stick together into pebbles, then into kilometer-sized <b>planetesimals</b>, then by gravity into protoplanets. The gas and dust disk around a young star lasts only a few million years.",
    "The frost line|❄️|Beyond about 3 to 5 AU from the Sun (the <b>frost line</b>), ices can survive. Cores of 5 to 10 Earth masses there pulled in gas and became giant planets. Closer in, only rock and metal condensed, so small rocky planets formed.",
    "Evidence|🔭|Young stars have disks, and ALMA shows gaps in them where planets are forming. Planets in our system orbit in the same direction and nearly the same plane, as a spinning disk would make them."
  ], [
    "Kilometer-sized building blocks of planets are...|planetesimals|🪨|Small planets.|nebulae,asteroids only",
    "Planets growing by collecting smaller bodies is called...|accretion|🧲|Building by adding.|erosion,fission",
    "Inside the frost line only ____ could condense.|rock and metal|🔥|Ice would melt or vaporize.|water ice,methane ice",
    "The frost line in our Solar System is about...|3 to 5 AU|📏|Beyond Mars.|0.3 AU,30 AU",
    "Giant planet cores needed about...|10 Earth masses|⚖️|Big enough to hold gas.|0.1 Earth masses,1000 Earth masses",
    "A planet-forming disk lasts about...|a few million years|⏳|Quick compared with the star's life.|a few thousand years,10 billion years",
    "The planets orbit the Sun in the same direction because they formed from a...|spinning disk|💿|A rotating cloud flattened.|collision,comet",
    "Gaps in disks seen by ALMA are signs of...|forming planets|🔭|They clear lanes.|exploding stars,black holes"
  ], "Think about dust becoming rocks and rocks becoming worlds."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[11], c[12], c[13], c[14], c[15], c[16]]));
  c.push(MIX("Level 27 Challenge", [c[0], c[1], c[2], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[3]]));

  Object.assign(EARTH_LEVELS, { 25: a, 26: b, 27: c });
})();
