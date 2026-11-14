// Mind Lab Earth & Space, levels 19-21 (extension file). 20 lessons per level.
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


  // ================= LEVEL 19 =================
  const a = [];
  a.push(L("Earth's magnetic field", [
    "A giant magnet|🧲|Earth acts like a giant magnet. Its <b>magnetic field</b> reaches far out into space. A compass needle lines up with it.",
    "Made in the core|🌍|Moving liquid iron in the <b>outer core</b> makes electric currents. These currents create the field. This is called the <b>geodynamo</b>.",
    "A shield and lights|🌌|The field deflects the <b>solar wind</b> and protects life. Charged particles that slip in near the poles make glowing <b>auroras</b>."
  ], [
    "Earth's magnetic field is made by moving liquid iron in the...|outer core|🌍|It is the liquid layer that surrounds the solid center.|crust,upper mantle",
    "The process that makes Earth's field is called the...|geodynamo|⚙️|It sounds like a spinning machine.|hydrodynamo,photosynthesis",
    "A compass needle lines up with Earth's...|magnetic field|🧭|It is an invisible force.|gravity,wind",
    "Glowing lights near the poles are called...|auroras|🌌|They happen when charged particles hit the air.|rainbows,halos",
    "A stream of charged particles from the Sun is the...|solar wind|☀️|It blows outward from our star.|jet stream,trade wind",
    "Earth's magnetic field protects us by...|deflecting charged particles|🛡️|It acts like a shield around the planet.|making rain,heating the oceans",
    "The outer core is made mostly of liquid...|iron|🔩|It is a heavy metal.|water,rock",
    "Auroras are seen mostly near the...|poles|🧊|Look at the far north and far south.|equator,tropics"
  ], "Think about what moves inside Earth to make electric currents."));
  a.push(L("Earth's energy budget", [
    "Energy in, energy out|⚖️|Earth gets energy from the Sun and sends energy back to space. If the two are equal, the average temperature stays steady.",
    "What happens to sunlight|☀️|About 30% of sunlight is <b>reflected</b> back to space by clouds, ice and bright ground. The rest is <b>absorbed</b> by air, land and oceans.",
    "Out again as heat|🌡️|Earth sends the energy back as invisible <b>infrared</b> heat. <b>Greenhouse gases</b> slow this loss. More greenhouse gases means the planet warms until a new balance is reached."
  ], [
    "Earth's main source of energy is the...|Sun|☀️|It is the star at the center of our solar system.|Moon,core",
    "About what share of sunlight is reflected back to space?|30%|📊|It is a bit less than one half.|3%,90%",
    "Sunlight that is NOT reflected is...|absorbed|🌍|It warms the air land and oceans.|created,erased",
    "Earth sends energy back to space mainly as...|infrared heat|🔥|It cannot be seen with our eyes.|X-rays,sound",
    "Which surface reflects the most sunlight?|fresh snow|❄️|Think of the brightest ground.|dark forest,open ocean",
    "If energy in equals energy out, Earth's average temperature...|stays steady|⚖️|The two sides are balanced.|keeps rising,keeps falling",
    "Gases that slow the escape of heat are called...|greenhouse gases|🏭|Their name comes from a warm building for plants.|noble gases,fuel gases",
    "More greenhouse gases will make Earth...|warm up|🌡️|Less heat escapes to space.|cool down,stop spinning"
  ], "Think about how much energy arrives and how much leaves."));
  a.push(L("Global wind belts", [
    "Air moves in big loops|🌬️|The Sun heats the equator most. Warm air rises there and flows toward the poles. Cooler air sinks and flows back along the ground. These loops are called <b>cells</b>.",
    "Three cells|🔁|In each hemisphere there are three cells: the <b>Hadley cell</b> near the tropics, the <b>Ferrel cell</b> in the middle and the <b>polar cell</b> near the pole.",
    "Belts of wind|🧭|Spin of Earth bends the winds. This makes the <b>trade winds</b> in the tropics, the <b>westerlies</b> in mid-latitudes and the <b>polar easterlies</b> near the poles."
  ], [
    "Air at the equator is heated and then...|rises|⬆️|Warm air is less dense.|sinks,freezes",
    "The cell nearest the equator is the...|Hadley cell|🔁|It is named after a scientist whose name starts with H.|polar cell,Ferrel cell",
    "How many wind cells are in each hemisphere?|3|3️⃣|Count Hadley and Ferrel and one more.|2,5",
    "Winds in the tropics are called the...|trade winds|⛵|Sailing ships used them for trade.|westerlies,polar easterlies",
    "Winds in the mid-latitudes are the...|westerlies|🌬️|They blow from the west.|trade winds,polar easterlies",
    "Winds near the poles are the...|polar easterlies|🧊|They blow from the east.|trade winds,westerlies",
    "Winds are bent by the spin of Earth. This is the...|Coriolis effect|🌀|It is named after a French scientist.|greenhouse effect,Doppler effect",
    "Many deserts form near 30 degrees latitude because there the air is...|sinking and dry|🏜️|Sinking air warms and holds its water.|rising and wet,not moving at all"
  ], "Remember that warm air rises and cool air sinks."));
  a.push(L("Silicate minerals", [
    "Earth's most common minerals|💎|Oxygen and silicon are the two most common elements in the crust. They join to form <b>silicates</b>, the biggest mineral group.",
    "Silica tetrahedron|🔺|The building block of a silicate is a silicon atom bonded to four oxygen atoms. It is called a <b>silica tetrahedron</b>.",
    "Common examples|🪨|<b>Quartz</b>, <b>feldspar</b>, <b>mica</b> and <b>olivine</b> are all silicates. Feldspar is the most abundant mineral group in Earth's crust."
  ], [
    "Which two elements form the silicates?|silicon and oxygen|💎|One of them is the gas we breathe.|iron and carbon,sodium and chlorine",
    "The basic building block of silicates is the...|silica tetrahedron|🔺|It has four oxygen atoms around one silicon atom.|carbon ring,salt cube",
    "The most abundant mineral group in the crust is...|feldspar|🪨|It makes up over half of the crust.|calcite,halite",
    "Which of these is a silicate?|quartz|💠|It is often clear or milky.|halite,gold",
    "A glassy green silicate found in mantle rock is...|olivine|🟢|Its name sounds like a green fruit.|mica,galena",
    "A silicate that splits into thin sheets is...|mica|📄|Think of peeling layers.|quartz,olivine",
    "How many oxygen atoms surround the silicon in the basic block?|4|🔺|The word tetra means four.|2,6",
    "The two most common elements in the crust are oxygen and...|silicon|🌍|It is the base of sand and glass.|gold,helium"
  ], "Think of the elements that make up sand and quartz."));
  a.push(L("Magma types", [
    "Not all magma is the same|🌋|Magma differs in how much silica it holds. This changes its color, its thickness and how it erupts.",
    "Mafic and felsic|⚫⚪|<b>Mafic</b> magma has less silica, more iron and magnesium. It is dark and runny, and makes <b>basalt</b>. <b>Felsic</b> magma has more silica. It is light in color and thick, and makes <b>granite</b> or <b>rhyolite</b>.",
    "Thick means explosive|💥|Thick magma traps gas, so pressure builds up and eruptions can be explosive. Runny magma lets gas escape, so eruptions are calmer."
  ], [
    "Magma with less silica is called...|mafic|⚫|It is dark and runny.|felsic,sedimentary",
    "Magma with more silica is called...|felsic|⚪|It is light-colored and thick.|mafic,metamorphic",
    "Which rock forms from mafic lava?|basalt|⚫|It is dark and common on the seafloor.|granite,marble",
    "Which rock is felsic?|granite|⚪|It has light and speckled crystals.|basalt,gabbro",
    "Thick magma tends to make eruptions that are...|explosive|💥|Gas gets trapped.|gentle,silent",
    "Runny magma lets gas escape so eruptions are...|calm|🌊|Think of lava that flows easily.|explosive,magnetic",
    "Compared with felsic magma mafic magma is...|darker|🌑|It has more iron and magnesium.|lighter,more sticky",
    "Magma that is high in silica is most likely to be...|thick|🍯|Think of how honey flows.|thin,gassy-free"
  ], "Think about how the amount of silica changes thickness."));
  a.push(L("Reading rock layers", [
    "Layers tell a story|📚|Sedimentary rocks form in layers. In an undisturbed stack, the oldest layer is on the bottom. This is the <b>law of superposition</b>.",
    "Cutting across|✂️|A fault or an <b>igneous intrusion</b> that cuts across layers is younger than the layers it cuts. This is the law of <b>cross-cutting relationships</b>.",
    "Gaps in time|🕳️|An <b>unconformity</b> is a surface that shows missing time, where rock was eroded away or never laid down. Geologists use these clues for <b>relative dating</b>."
  ], [
    "In undisturbed layers the oldest rock is...|on the bottom|⬇️|Layers pile up one on top of another.|on the top,in the middle",
    "The law that says older layers lie below younger ones is...|superposition|📚|Think of stacking pancakes.|gravity,rotation",
    "A fault that cuts through layers is...|younger than the layers|✂️|It had to come after the rocks it cuts.|older than the layers,the same age as the layers",
    "A surface showing missing time in the rock record is an...|unconformity|🕳️|It is a gap in the story.|ore body,epicenter",
    "Putting events in order without exact ages is called...|relative dating|🔢|It tells which is older or younger.|radiometric dating,carbon counting",
    "A magma intrusion that cuts across layers is...|younger than the layers|🌋|It came later.|older than the layers,the oldest rock",
    "If layers were tilted or folded then eroded flat and new layers were put on top, you have...|an unconformity|🪜|The record has a gap.|a delta,a geyser",
    "An unconformity can be caused by...|erosion removing rock|🌧️|Some of the story is washed away.|more rain on top,a magnet"
  ], "Think about which event had to happen first."));
  a.push(L("Rivers that wander", [
    "Fast outside slow inside|🏞️|In a river bend, water flows faster on the outside and slower on the inside. The fast side <b>erodes</b> the bank. The slow side <b>deposits</b> sand.",
    "Meanders|〰️|Over time, bends grow into big loops called <b>meanders</b>. The inside of a bend builds a <b>point bar</b>. The outside forms a steep <b>cut bank</b>.",
    "Oxbow lakes|🌙|When a river cuts through the neck of a meander, the old loop is cut off and becomes an <b>oxbow lake</b>."
  ], [
    "A big loop in a river is a...|meander|〰️|It winds like a snake.|delta,canyon",
    "Water in a bend flows fastest on the...|outside|🏞️|The water has farther to travel.|inside,bottom only",
    "The outside of a meander is eroded into a...|cut bank|🧱|It is steep.|point bar,sandbar island",
    "Sand builds up on the inside of a bend forming a...|point bar|🏖️|It is where water moves slowly.|cut bank,waterfall",
    "A curved lake left when a river cuts off a loop is an...|oxbow lake|🌙|It is shaped like a U.|crater lake,glacier lake",
    "Slow water on the inside of a bend does what with sediment?|deposits it|⬇️|It does not have the energy to carry it.|erodes it,melts it",
    "Meanders usually form in rivers on...|flat land|🌾|Think of a gentle slope.|steep mountains,high cliffs",
    "Erosion on the outside of a bend makes the bend...|grow bigger|📈|The loop is carved farther out.|disappear at once,shrink"
  ], "Think about where the water moves fast and where it moves slowly."));
  a.push(L("Wind shapes the land", [
    "Wind erosion|💨|Wind can pick up small particles and carry them. It works best where the ground is dry and has few plants, like deserts.",
    "Moving sand|🏜️|Wind rolls and bounces sand grains along the ground, a process called <b>saltation</b>. Sand piles up as <b>dunes</b>. A dune moves because sand blows up the gentle side and slides down the steep side.",
    "Dust and loess|🌫️|Fine dust can travel thousands of kilometers. Thick deposits of wind-blown silt are called <b>loess</b>. They make very rich farm soil."
  ], [
    "Wind erosion is strongest where there are...|few plants|🏜️|Plants hold the soil in place.|many trees,thick grass",
    "Sand grains that bounce along the ground move by...|saltation|⛹️|The word sounds like jumping.|subduction,deposition",
    "A hill of sand piled by wind is a...|dune|🏜️|You find them in deserts.|delta,moraine",
    "Wind-blown silt deposits are called...|loess|🌾|They make rich farm soil.|till,basalt",
    "The steep side of a dune is the side where sand...|slides down|⬇️|It moves like a small avalanche.|blows up,sticks in place",
    "A dune slowly moves in the direction...|the wind blows|➡️|Sand is pushed along.|the wind comes from,straight up",
    "Fine dust can travel...|thousands of kilometers|🌍|It is very light.|only a few meters,only inside caves",
    "Which place has the most wind erosion?|a dry desert|🌵|Dry loose sand is easy to move.|a wet marsh,a thick forest"
  ], "Think about what holds soil and sand in place."));
  a.push(L("Radiocarbon dating", [
    "Carbon-14|☢️|Living things take in a small amount of <b>carbon-14</b>, a radioactive form of carbon. When an organism dies it stops taking in new carbon, and the carbon-14 slowly decays.",
    "Half-life 5,730 years|⏳|The half-life of carbon-14 is about <b>5,730 years</b>. After one half-life half is left. After two, one quarter is left.",
    "Limits|📏|Radiocarbon dating works on once-living things such as wood, bone and cloth up to about <b>50,000 years</b> old. For older or non-living rocks, scientists use other elements."
  ], [
    "Radiocarbon dating uses an atom called...|carbon-14|☢️|Its name has a number 14.|oxygen-16,helium-4",
    "The half-life of carbon-14 is about...|5,730 years|⏳|It is thousands of years.|57 years,5 million years",
    "After one half-life how much carbon-14 is left?|half|½|The word half-life gives the clue.|all of it,one tenth",
    "After two half-lives how much is left?|one quarter|¼|Cut in half twice.|one half,none",
    "Radiocarbon dating works on things that were once...|alive|🌳|Wood and bone are examples.|made of metal,deep volcanic rock",
    "About how far back can radiocarbon dating reach?|50,000 years|📏|It is far shorter than the age of Earth.|5 billion years,500 years",
    "A dead tree stops taking in new...|carbon|🌳|It can no longer breathe or grow.|sunlight only,moon dust",
    "To date a rock that is millions of years old scientists use...|other radioactive elements|🪨|Carbon-14 is gone too soon.|carbon-14 again,a thermometer"
  ], "Think about when a living thing stops absorbing carbon."));
  a.push(L("How stars live and die", [
    "A star's life|⭐|A star begins in a cloud of gas and dust called a <b>nebula</b>. Gravity pulls it together until fusion starts and it becomes a <b>main-sequence</b> star.",
    "Sun-like stars|☀️|When a star like the Sun runs low on hydrogen it swells into a <b>red giant</b>. It then puffs off its outer layers and leaves a small hot <b>white dwarf</b>.",
    "Massive stars|💥|A star much bigger than the Sun ends as a <b>supernova</b> explosion. What is left is a <b>neutron star</b> or a <b>black hole</b>."
  ], [
    "Stars are born in clouds of gas and dust called...|nebulae|🌌|The word starts with N.|comets,galaxies",
    "A star spends most of its life as a...|main-sequence star|⭐|It is fusing hydrogen steadily.|white dwarf,supernova",
    "The Sun will one day swell into a...|red giant|🔴|It will become huge and cool.|blue dwarf,black hole",
    "A Sun-like star ends its life as a...|white dwarf|⚪|It is small and hot.|neutron star,supernova",
    "A massive star ends in a huge explosion called a...|supernova|💥|It outshines a whole galaxy for a time.|eclipse,nova of dust",
    "What can remain after a massive star explodes?|a neutron star or black hole|🕳️|The core collapses.|a red giant,a planet",
    "What holds a main-sequence star in balance?|gravity versus fusion pressure|⚖️|Inward pull equals outward push.|magnets versus wind,rain versus ice",
    "A star's life depends mostly on its...|mass|⚖️|Heavy stars burn faster.|color of its planets,distance from Earth"
  ], "Think about how the size of a star changes what happens at the end."));
  a.push(L("Stardust and heavy elements", [
    "Making elements|⚛️|Stars are element factories. In the core, <b>fusion</b> joins small nuclei into larger ones. Hydrogen becomes helium, and in big stars helium becomes carbon and oxygen.",
    "Up to iron|🔩|Big stars keep fusing heavier elements until they make <b>iron</b>. Fusing iron does not release energy, so the core collapses.",
    "Spread by explosions|✨|A supernova scatters elements into space. Even heavier elements such as gold form in extreme events such as exploding stars and neutron star collisions. We are made of this <b>stardust</b>."
  ], [
    "In a star's core small nuclei join in a process called...|fusion|⚛️|Hydrogen joins to make helium.|fission,erosion",
    "The first element a star fuses is...|hydrogen|💧|It is the lightest element.|iron,gold",
    "Hydrogen fuses to make...|helium|🎈|It is the next element on the table.|iron,silver",
    "Fusion in a massive star stops making energy at...|iron|🔩|It is the end of the chain.|hydrogen,helium",
    "Elements are scattered across space by a...|supernova|💥|It is a huge star explosion.|rainfall,lunar eclipse",
    "The calcium in your bones and the oxygen you breathe were first made in...|stars|⭐|Long before the Sun.|volcanoes,the ocean",
    "Elements heavier than iron form mostly in...|extreme explosions and collisions|💫|Normal fusion cannot reach them.|ordinary rainstorms,Earth's crust",
    "Carbon is made in stars when helium nuclei...|fuse together|🔗|Small nuclei join.|split apart,freeze solid"
  ], "Think about what happens when small nuclei are squeezed together."));
  a.push(L("Nebulae and star nurseries", [
    "Clouds in space|🌌|A <b>nebula</b> is a cloud of gas and dust. Some glow, some reflect light and some are dark and block the light behind them.",
    "Star nurseries|👶|In dense parts of a nebula, gravity pulls gas into clumps. The clumps heat up and form <b>protostars</b>. When the core is hot enough for fusion, a star is born.",
    "Leftover disks|🪐|Around a young star, spinning leftover gas and dust flatten into a <b>disk</b>. Planets can form in that disk."
  ], [
    "A cloud of gas and dust in space is a...|nebula|🌌|It can glow or reflect light.|asteroid,quasar",
    "A young star that is not yet fusing hydrogen is a...|protostar|👶|The word proto means first.|white dwarf,pulsar",
    "What pulls gas into clumps in a nebula?|gravity|⬇️|It is a force of attraction.|wind,magnetism of Earth",
    "Planets form from a spinning...|disk of gas and dust|🪐|It is flat like a record.|ball of ice,cloud of oxygen",
    "A star is born when its core starts...|fusion|🔥|Hydrogen begins to join.|freezing,rotating backward",
    "Some nebulae look dark because they...|block light from behind|⚫|Dust is thick.|are very cold air,are empty of dust",
    "The Orion Nebula is a place where...|new stars form|🌟|It is a nursery.|old stars are buried,planets end",
    "Dense clumps in a nebula heat up as they...|contract|🔥|Gravity squeezes them.|expand,disappear"
  ], "Think about what gravity does to gas over a long time."));
  a.push(L("Planets that loop back", [
    "Strange paths|🔭|Seen from Earth, planets sometimes seem to stop and move backward against the stars for a few weeks. This is called <b>retrograde motion</b>.",
    "An illusion|🏎️|Retrograde motion is not real backward motion. It is an <b>apparent</b> motion. It happens when Earth, which moves faster on an inner orbit, passes a slower outer planet.",
    "History|📜|Ancient astronomers used big complicated models to explain it. Copernicus and Kepler showed that planets orbit the Sun, which explains the loops simply."
  ], [
    "A planet that seems to move backward in the sky shows...|retrograde motion|🔭|The word retro means back.|rotation,revolution",
    "Retrograde motion is...|an apparent illusion|🏎️|It only looks that way from our view.|a real reversal,a magnet effect",
    "It happens when Earth passes a slower...|outer planet|🪐|Earth is on an inner track.|inner planet,comet only",
    "Retrograde motion is like when a fast car passes a...|slower car|🚗|The slower one seems to go backward for a moment.|stopped bridge,faster jet",
    "Who explained planet paths with the Sun at the center?|Copernicus|📜|He was a Polish astronomer.|Ptolemy,Aristotle",
    "Planets seem to move against the background of...|stars|✨|They wander across them.|clouds,mountains",
    "In a Sun-centered model retrograde motion happens because...|planets orbit at different speeds|🔄|Inner orbits are quicker.|the Sun stops,planets turn around",
    "The word planet comes from a Greek word meaning...|wanderer|🚶|They move among fixed stars.|sleeper,mirror"
  ], "Think about two cars on a track passing each other."));
  a.push(L("The Moon moves away", [
    "Tidal bulges|🌊|The Moon's gravity makes bulges in Earth's oceans. Earth spins faster than the Moon orbits, so the bulges are pulled slightly ahead of the Moon.",
    "Drifting away|🌙|The bulges pull the Moon forward, which sends it into a larger orbit. The Moon moves away from Earth about <b>3.8 cm each year</b>. Earth's spin also slows, so days get longer.",
    "Tidal locking|🔒|Long ago Earth's gravity slowed the Moon's spin until one turn equals one orbit. This is <b>tidal locking</b>, and it is why we see only one side of the Moon."
  ], [
    "The Moon moves away from Earth about how much each year?|3.8 cm|📏|It is about the speed that fingernails grow.|3.8 km,38 m",
    "Because of tidal friction Earth's days are slowly getting...|longer|⏳|Earth's spin is slowing.|shorter,exactly the same",
    "We always see the same side of the Moon because of...|tidal locking|🔒|One spin equals one orbit.|a magnetic field,an eclipse",
    "The Moon's gravity causes the ocean's...|tides|🌊|Water bulges toward the Moon.|currents only,salt",
    "The Moon takes about how long to orbit Earth?|27 days|🌙|It is under one month.|7 days,365 days",
    "As the Moon drifts away its orbit becomes...|larger|⭕|It is farther from Earth.|smaller,square",
    "Total solar eclipses will one day stop because the Moon will look...|too small|🌑|It will be farther away.|too large,too bright",
    "Tidal locking happens when a body's spin matches its...|orbit time|🔁|One turn per trip.|temperature,color"
  ], "Think about how Earth's spin drags the tidal bulges."));
  a.push(L("Oceans, ice and heat", [
    "Oceans store heat|🌊|Water takes a lot of energy to warm up. The oceans hold over 90% of the extra heat trapped by greenhouse gases.",
    "Sea ice|🧊|Sea ice floats on the ocean. It is bright, so it reflects sunlight. Less ice means darker water and more absorbed heat.",
    "Ice sheets and shelves|🏔️|Melting <b>land ice</b> such as ice sheets adds water to the sea and raises sea level. Floating sea ice does not raise sea level when it melts, just as melting ice cubes do not overflow a full glass."
  ], [
    "The oceans hold most of the extra heat in the climate system. About how much?|over 90%|🌊|It is nearly all of it.|about 5%,about 20%",
    "Sea ice is bright so it...|reflects sunlight|🧊|It has a high albedo.|absorbs sunlight,makes sunlight",
    "Less sea ice means the ocean absorbs...|more heat|🌡️|Dark water soaks up sunlight.|less heat,no heat",
    "Melting land ice such as an ice sheet makes sea level...|rise|📈|New water flows into the sea.|fall,stay steady",
    "Melting floating sea ice changes sea level...|almost not at all|🧊|It already displaces its own weight.|a lot,by meters",
    "Water needs a lot of energy to warm up so oceans change temperature...|slowly|🐢|They store heat well.|very quickly,never",
    "The ice sheet of Antarctica sits mostly on...|land|🏔️|It is a continent.|the open ocean,a floating raft",
    "Reflection of sunlight by bright surfaces is called...|albedo|☀️|It was discussed with feedback loops.|salinity,humidity"
  ], "Think about the difference between ice on land and ice in the water."));
  a.push(L("Habitats change over time", [
    "Ecological succession|🌱|After a disturbance such as a fire or a lava flow, living things come back in stages. This is <b>ecological succession</b>.",
    "Pioneers|🪴|On bare rock, <b>pioneer species</b> such as lichens and moss start the process. They break down rock and add organic matter, making the first soil.",
    "Climax community|🌳|Grasses then shrubs then trees arrive. The stable final stage is a <b>climax community</b>, such as a forest. Primary succession starts on bare rock. Secondary succession starts where soil is already there."
  ], [
    "Gradual change in a community over time is called...|succession|🌱|The community changes in stages.|erosion,convection",
    "The first living things on bare rock are called...|pioneer species|🪴|They are the first to arrive.|climax species,predators",
    "Which is a pioneer species on bare rock?|lichen|🌿|It can grow on stone.|oak tree,deer",
    "Succession that starts with no soil is called...|primary succession|🪨|Think of a new lava flow.|secondary succession,climax",
    "Succession after a forest fire where soil remains is...|secondary succession|🔥|The soil is already there.|primary succession,no succession",
    "The stable final community is the...|climax community|🌳|It is mature and steady.|pioneer stage,first stage",
    "Pioneer species help build...|soil|🪱|They break down rock and add matter.|volcanoes,glaciers",
    "Which comes first in a field returning to forest?|grasses|🌾|Trees take longer.|oak trees,tall pines"
  ], "Think about which living things can grow in the harshest places."));
  a.push(L("The shape of Earth", [
    "Not a perfect sphere|🌍|Earth spins, so it bulges at the equator. It is slightly flattened at the poles. This shape is an <b>oblate spheroid</b>.",
    "Bulge numbers|📏|Earth is about 43 km wider across the equator than from pole to pole. That is small, about 0.3% of its width, so Earth looks round from space.",
    "Eratosthenes|📜|Around 240 BCE, <b>Eratosthenes</b> measured the shadow angle in two cities and calculated the size of Earth. His answer was very close to the true size."
  ], [
    "Earth's shape is best described as an...|oblate spheroid|🌍|It is slightly flattened.|perfect cube,pyramid",
    "Earth bulges at the...|equator|🌍|Spinning pushes outward there.|poles,tropics only",
    "Earth is flattened at the...|poles|🧊|Top and bottom.|equator,oceans",
    "The bulge is caused by Earth's...|spin|🔄|Rotation pushes matter outward.|magnetism,moon phase",
    "Who measured Earth's size using shadow angles?|Eratosthenes|📜|He lived in ancient Greece.|Galileo,Newton",
    "Eratosthenes compared shadows in two cities at...|noon|☀️|The Sun is highest then.|midnight,dawn",
    "Earth looks round from space because the bulge is...|small|🌕|It is a tiny percentage of its width.|huge,missing",
    "Earth's circumference is about...|40,000 km|📏|It is around forty thousand.|4000 km,400000 km"
  ], "Think about what happens to a spinning ball of soft material."));
  a.push(L("Graphs, trends and doubt", [
    "Reading a trend|📈|A <b>trend</b> is the general direction data move over time. Noise in data means points do not fall on a perfect line, but a trend can still be clear.",
    "Uncertainty|❓|All measurements have <b>uncertainty</b>. Scientists show it with error bars. A larger sample usually shrinks the uncertainty.",
    "Correlation is not cause|🔗|Two things that change together are <b>correlated</b>. That does not prove one causes the other. Scientists test cause with experiments or physical explanations."
  ], [
    "The general direction data move over time is a...|trend|📈|It is not one single point.|outlier,error bar",
    "A single point far from the others is an...|outlier|⚠️|It does not fit the pattern.|trend line,average",
    "Showing how uncertain a measurement is uses...|error bars|📏|They are lines on the dots.|pie slices,legends",
    "More samples usually make uncertainty...|smaller|📉|More data helps.|larger,zero always",
    "Two things that change together are...|correlated|🔗|It is not the same as cause.|proven to cause,unrelated",
    "Correlation shows that one thing causes another.|false|❌|Think of ice cream sales and sunburn.|true,always true",
    "The sum of values divided by their count is the...|mean|➗|It is a kind of average.|mode,range",
    "A line of best fit shows...|the overall trend|📊|It goes through the middle of the dots.|every exact point,the highest point only"
  ], "Think about whether the data show a pattern or just one point."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[8], a[9], a[10], a[12], a[13], a[14], a[15], a[17]]));
  a.push(MIX("Level 19 Challenge", [a[1], a[2], a[4], a[5], a[6], a[7], a[8], a[9], a[11], a[13], a[14], a[15], a[16], a[17], a[0]]));


  // ================= LEVEL 20 =================
  const b = [];
  b.push(L("Temperature inversions", [
    "The usual pattern|🌡️|In the lowest layer of air, the <b>troposphere</b>, temperature usually drops as you go up, about 6.5 °C for every kilometer.",
    "Upside down|🔃|In a <b>temperature inversion</b>, a layer of warm air sits above cooler air near the ground. The warm layer acts like a lid.",
    "Trapped air|🏙️|Under the lid, smoke, dust and car exhaust cannot rise and spread out. In valleys and cities this can cause thick <b>smog</b> and fog."
  ], [
    "Normally temperature in the troposphere as you go up...|decreases|📉|Mountain tops are colder.|increases,stays the same",
    "A layer of warm air above cooler air near the ground is an...|inversion|🔃|The usual pattern is flipped.|upwelling,eclipse",
    "An inversion acts like a...|lid|🥫|It stops air from rising.|chimney,window open",
    "Smog is worse during an inversion because pollution is...|trapped near the ground|🏙️|It cannot rise away.|blown to space,destroyed",
    "Which place often gets inversions that trap smog?|a bowl-shaped valley|⛰️|Cold air pools there.|a windy peak,the open sea",
    "Temperature drops about how much per km in the troposphere?|6.5 °C|🌡️|It is a bit more than six degrees.|0.65 °C,65 °C",
    "Inversions are often broken up by...|strong wind|💨|Moving air mixes the layers.|a quiet calm,thick fog",
    "In an inversion the warmest air is...|above the cool air|⬆️|It sits on top.|at the ground,missing"
  ], "Think about which air is normally warmer, the air near the ground or high up."));
  b.push(L("Climate models", [
    "A model of Earth|💻|A <b>climate model</b> is a computer program that uses physics to simulate the air, oceans, ice and land. It splits Earth into a grid of boxes.",
    "Testing the model|🧪|Scientists test a model by running it on the past and checking whether it matches real records. If it does, it is more trustworthy for the future.",
    "Projections not predictions|🔮|A <b>projection</b> shows what could happen under different choices, such as high or low emissions. Weather forecasts cover days. Climate models cover decades."
  ], [
    "A computer program that simulates the climate is a...|climate model|💻|It uses the laws of physics.|compass,thermometer",
    "A climate model divides Earth into a...|grid of boxes|🔲|Each box has numbers.|set of stripes,single point",
    "Scientists test a model by running it on the...|past|📜|Then they compare with records.|future only,moon",
    "A projection shows what could happen under different...|choices|🔀|Such as how much carbon we release.|colors,names",
    "Climate models look at changes over...|decades|📆|They are not for tomorrow's rain.|minutes,single afternoons",
    "A weather forecast is for a few...|days|☔|It is short-term.|centuries,millions of years",
    "A better match between model and past records means the model is...|more trustworthy|✅|It passes the test.|useless,broken",
    "Higher emissions in a model usually give...|more warming|🌡️|More greenhouse gas traps more heat.|cooling,no change"
  ], "Think about the difference between weather in a week and climate over many years."));
  b.push(L("Greenhouse gas strength", [
    "Not all gases are equal|🏭|Carbon dioxide (CO₂), methane (CH₄) and nitrous oxide (N₂O) all trap heat. Some are stronger than others for each molecule.",
    "Warming potential|📊|<b>Global warming potential</b> compares a gas to CO₂ over a time span. Methane traps far more heat per molecule but breaks down within about 12 years. CO₂ stays for centuries.",
    "Sources|🐄|CO₂ comes mostly from burning fuels. Methane comes from farm animals, rice fields, landfills and gas leaks. Water vapor is a greenhouse gas too, but it mostly responds to temperature."
  ], [
    "The greenhouse gas made mostly by burning fuels is...|carbon dioxide|🏭|Its symbol is CO₂.|methane,ozone",
    "A greenhouse gas from landfills and farm animals is...|methane|🐄|Its symbol is CH₄.|nitrogen,helium",
    "Methane traps heat more strongly per molecule than...|carbon dioxide|⚖️|It is stronger but shorter-lived.|water,argon",
    "Methane lasts in the air for about...|12 years|⏳|It is short compared to CO₂.|12 minutes,1200 years",
    "Carbon dioxide can stay in the air for...|centuries|🕰️|It is long-lived.|hours,a day",
    "Global warming potential compares a gas to...|carbon dioxide|📊|It is the standard.|oxygen,water",
    "Which is NOT mainly a greenhouse gas?|oxygen|💨|It makes up about one fifth of the air.|methane,nitrous oxide",
    "Water vapor in the air mostly changes in response to...|temperature|💧|Warm air holds more.|volcanoes,the Moon"
  ], "Think about how long each gas stays in the air and how strongly it traps heat."));
  b.push(L("Carbon sinks", [
    "Where carbon goes|🌳|A <b>carbon sink</b> takes in more carbon than it gives out. Forests, soils and oceans are natural sinks. About half of the CO₂ we release is absorbed by them.",
    "Forests and soils|🌲|Trees take in CO₂ for photosynthesis and store the carbon in wood and roots. Cutting or burning forests releases it. Healthy soils hold even more carbon than all plants.",
    "Capturing carbon|🏗️|People also try <b>carbon capture</b>, which collects CO₂ from smokestacks or from the air and stores it underground. It is costly and works best alongside cutting emissions."
  ], [
    "Something that absorbs more carbon than it releases is a...|sink|🌳|Think of a drain.|source,leak",
    "Which is a natural carbon sink?|forests|🌲|They grow by taking in CO₂.|coal plants,car engines",
    "Another large natural sink is the...|ocean|🌊|It dissolves CO₂.|desert dust,stratosphere only",
    "About what part of human CO₂ is absorbed by land and oceans?|about half|📊|It is not nearly all and not almost none.|almost none,almost all",
    "Cutting down and burning forests...|releases stored carbon|🔥|The carbon goes back into the air.|stores more carbon,makes oxygen only",
    "Collecting CO₂ and storing it underground is called...|carbon capture|🏗️|The first word is the name of the element.|carbon farming,carbon dating",
    "Trees store carbon in their...|wood and roots|🌳|It is built into their bodies.|leaves only,sap only",
    "Carbon capture works best when it is used...|along with cutting emissions|⚖️|It is not a cure by itself.|instead of any change,only on Mars"
  ], "Think about where plants and oceans put the carbon they take in."));
  b.push(L("Coastal upwelling and Ekman", [
    "Wind pushes water|🌬️|Because of the Coriolis effect, wind-driven surface water in the Northern Hemisphere moves about 90 degrees to the right of the wind. This is <b>Ekman transport</b>.",
    "Coastal upwelling|⬆️|When winds blow along a coast so the water is moved offshore, cold deep water rises to replace it. This is <b>upwelling</b>.",
    "Rich fishing|🐟|Upwelling brings nutrients to the surface and feeds plankton. This is why places like the coasts of Peru and California are rich in sea life."
  ], [
    "Surface water driven by wind is turned by the...|Coriolis effect|🌀|Earth's spin bends it.|greenhouse effect,tides",
    "In the Northern Hemisphere Ekman transport is about 90 degrees to the...|right|➡️|It is not left.|left,front",
    "Cold water rising from the deep is called...|upwelling|⬆️|It is the opposite of sinking.|downwelling,runoff",
    "Upwelling brings up...|nutrients|🌱|It feeds tiny sea life.|oil,sand",
    "Tiny floating sea plants that are fed by upwelling are...|phytoplankton|🦠|Phyto means plant.|zooplankton,whales",
    "A coast with strong upwelling is usually...|rich in fish|🐟|There is plenty of food.|empty of life,warm all year",
    "Upwelling water is usually...|cold|🥶|It comes from the deep.|boiling,very warm",
    "Ekman transport is caused by wind and the...|spin of Earth|🔄|Both are needed.|moon only,volcanoes"
  ], "Think about which way the Coriolis effect bends moving water."));
  b.push(L("Supercontinents", [
    "Joined and split|🧩|Continents have come together and broken apart many times. A giant landmass is a <b>supercontinent</b>. The most recent was <b>Pangaea</b>, about 300 to 200 million years ago.",
    "Evidence|🔍|Wegener noticed that coastlines fit, fossils match on different continents and mountain chains line up. Seafloor spreading later gave the mechanism.",
    "The cycle|🔁|Supercontinents form and break up about every 400 to 500 million years. This is the <b>supercontinent cycle</b>. Earlier ones include Rodinia and Gondwana."
  ], [
    "The most recent supercontinent was...|Pangaea|🌍|It means all lands.|Atlantis,Mu",
    "Who proposed continental drift?|Alfred Wegener|📜|He was a German scientist.|Isaac Newton,Marie Curie",
    "Matching fossils on different continents suggest the lands were once...|joined|🧩|They shared the same animals.|far apart,under water",
    "Coastlines of Africa and South America seem to...|fit together|🗺️|Look at the shape.|never touch,be the same size",
    "The supercontinent cycle takes about...|400 to 500 million years|⏳|It is very slow.|400 to 500 years,4 to 5 days",
    "What later explained how continents move?|seafloor spreading|🌊|New crust forms at ridges.|ocean tides,wind",
    "An earlier supercontinent was...|Rodinia|🌍|It was before Pangaea.|Pangaea 2,Europa",
    "Pangaea began to break up about...|200 million years ago|📆|It was in the age of dinosaurs.|2 million years ago,2 billion years ago"
  ], "Think about the evidence that fits like puzzle pieces."));
  b.push(L("Geysers and hot springs", [
    "Heat from below|♨️|Where hot rock lies near the surface, groundwater is heated. A <b>hot spring</b> is where the heated water flows out.",
    "Geysers|⛲|In a <b>geyser</b>, water is trapped in narrow underground tubes and heated past boiling under pressure. When some turns to steam, it pushes the rest out in a burst. Old Faithful in Yellowstone is a famous geyser.",
    "Geothermal power|⚡|People use Earth's heat for <b>geothermal energy</b>. Hot water or steam from underground turns a turbine to make electricity, or heats buildings directly."
  ], [
    "A place where heated groundwater flows out is a...|hot spring|♨️|It is warm or hot water.|waterfall,well",
    "A spring that erupts steam and water is a...|geyser|⛲|Old Faithful is one.|oasis,fjord",
    "Old Faithful is in...|Yellowstone|🏞️|It is a national park in the USA.|Antarctica,the Sahara",
    "Geysers erupt when trapped water...|turns to steam|💨|It heats past boiling.|freezes,dries up",
    "Heat from Earth used for power is called...|geothermal energy|⚡|Geo means Earth.|solar energy,wind energy",
    "Geothermal plants use hot water or steam to turn a...|turbine|🌀|It spins a generator.|compass,pump of oil",
    "Geysers and hot springs are most common near...|volcanic areas|🌋|Hot rock is close to the surface.|flat cold plains,deep deserts only",
    "Groundwater in a hot spring is heated by...|hot rock below|🔥|Earth's inner heat.|the Sun directly,rain"
  ], "Think about what heats the water beneath the ground."));
  b.push(L("Finding an earthquake", [
    "Two waves|〰️|An earthquake sends out <b>P waves</b> (fast) and <b>S waves</b> (slower). A seismograph records both. P waves arrive first.",
    "The time gap|⏱️|The longer the gap between the P wave and the S wave, the farther away the earthquake. Scientists use this gap to find the distance from a station.",
    "Three stations|📍|One station gives only a distance, so a circle of possible places. Circles from <b>three stations</b> cross at one point, which is the <b>epicenter</b>. This is called triangulation."
  ], [
    "Which wave arrives first at a seismograph?|P wave|〰️|P stands for primary.|S wave,surface wave",
    "The P wave is...|faster than the S wave|🏃|It arrives first.|slower than the S wave,the same speed as the S wave",
    "A bigger gap between P and S arrival means the quake is...|farther away|📏|Waves have more time to spread out.|closer,weaker",
    "One station tells you the...|distance to the quake|⭕|It cannot tell direction.|exact location,time of day",
    "How many stations are needed to find the epicenter?|3|3️⃣|The method is called triangulation.|1,10",
    "The point on the surface directly above the quake is the...|epicenter|📍|It is on the ground.|focus,fault line",
    "An instrument that records ground shaking is a...|seismograph|📈|Seismo means shaking.|barometer,hygrometer",
    "On a map the three station circles cross at...|the epicenter|❌|That is the one point that fits all.|the Moon,the focus depth"
  ], "Think about which wave is faster and what the delay tells you."));
  b.push(L("Watching volcanoes", [
    "Warning signs|🌋|Before an eruption a volcano often gives signs. Small earthquakes happen as magma moves. The ground may bulge, and gas output can change.",
    "Tools|🛰️|Scientists use <b>seismometers</b> to listen to quakes, <b>tiltmeters</b> and GPS to measure bulging ground, gas sensors to measure gases such as sulfur dioxide, and satellites to watch heat.",
    "Forecasting|⚠️|Scientists cannot say exactly when an eruption will occur, but monitoring helps them give warnings and plan evacuations, which has saved many lives."
  ], [
    "Small earthquakes before an eruption are caused by...|moving magma|🌋|It breaks rock as it rises.|rain,tides",
    "A tool that measures ground tilt is a...|tiltmeter|📐|Tilt gives the first part.|seismograph only,hygrometer",
    "A gas often measured at volcanoes is...|sulfur dioxide|☁️|It is a smelly gas.|helium,neon",
    "A volcano's ground may before an eruption...|bulge|⬆️|Magma pushes up from below.|shrink flat,turn blue",
    "Satellites help volcano scientists by watching...|heat and ground changes|🛰️|They see from above.|only the stars,only the Moon",
    "Monitoring helps people by giving...|warnings|⚠️|They can leave in time.|rain,magma",
    "Scientists can predict the exact minute of an eruption.|false|⏰|They usually give likelihoods.|true,always true",
    "Seismometers at volcanoes record...|small earthquakes|📈|They listen to the ground.|wind speed,sun hours"
  ], "Think about what changes inside and around a volcano before it erupts."));
  b.push(L("Where sediment settles", [
    "Environments tell a story|🏖️|Sediment settles in different <b>environments</b>: rivers, deltas, beaches, deep ocean and deserts. Each leaves rock with its own clues.",
    "Reading the clues|🔎|Coarse grains and cross-bedding suggest fast water, such as a river or dune. Fine mud suggests calm water, such as a lake or deep ocean.",
    "Facies|🧩|Rocks formed in the same environment form a <b>facies</b>. When the sea level rises, deeper-water rock covers shallower-water rock, so the layers record the changes."
  ], [
    "Coarse sandstone with cross-bedding suggests...|fast moving water or wind|🏜️|Large grains need energy to move.|calm deep water,a frozen lake",
    "Very fine mud suggests...|calm water|🌫️|Small grains settle slowly.|fast rapids,a dune",
    "Rock formed in the same environment makes a...|facies|🧩|It is a body of rock with matching features.|fossil,mineral",
    "Shells of ocean animals in rock suggest the area was once...|under the sea|🐚|Look at the clue.|a desert,a glacier",
    "Sandstone with ripple marks may show the area was a...|shallow shore|🌊|Waves left ripples.|deep trench,volcano cone",
    "Limestone made of coral suggests warm...|shallow seas|🪸|Corals need sunlight.|polar ice,high mountains",
    "When sea level rises shallow-water rock gets covered by...|deeper-water rock|⬆️|The shoreline moves inland.|desert sand,volcanic ash only",
    "Sedimentary layers help scientists reconstruct...|past environments|🗺️|They record where the rock formed.|future weather,planet orbits"
  ], "Think about how fast the water was moving when each sediment was dropped."));
  b.push(L("Evolution in the rocks", [
    "Change over time|🦴|The fossil record shows that life changes over time. Species appear, change and sometimes disappear. This is <b>evolution</b>.",
    "Natural selection|🧬|Individuals in a population differ. Those with traits that suit their environment tend to survive and have more young, so those traits become more common. This is <b>natural selection</b>.",
    "Transitional fossils|🐋|Fossils such as <b>Tiktaalik</b> (fish with limb-like fins) and early whale ancestors with legs show steps between groups of animals."
  ], [
    "Change in living things over many generations is...|evolution|🦴|The fossil record shows it.|erosion,eruption",
    "The process where better suited individuals survive and reproduce is...|natural selection|🧬|Nature selects.|artificial planting,plate tectonics",
    "Who wrote about natural selection in On the Origin of Species?|Charles Darwin|📖|He sailed on the Beagle.|Albert Einstein,Galileo",
    "A fossil showing steps between two groups is a...|transitional fossil|🐟|It sits between them.|index fossil,trace fossil",
    "Tiktaalik had features of fish and...|four-legged animals|🦎|Its fins had limb-like bones.|birds,insects",
    "Traits that help survival become more common over...|generations|👪|It takes many births.|minutes,one day",
    "The fossil record shows that most species that ever lived are...|extinct|🦖|They no longer exist.|still living,on the Moon",
    "Whales evolved from ancestors that lived on...|land|🐋|They once had legs.|trees only,ice only"
  ], "Think about which traits help living things survive and have young."));
  b.push(L("Weight on other worlds", [
    "Mass and weight|⚖️|<b>Mass</b> is how much matter an object has. <b>Weight</b> is the pull of gravity on that mass. Mass stays the same everywhere. Weight changes with gravity.",
    "Surface gravity|🪐|Gravity depends on the mass and size of the world. The Moon's surface gravity is about <b>1/6</b> of Earth's. Mars is about 38%. Jupiter's cloud tops are about 2.5 times Earth's.",
    "Do the math|🔢|Weight on another world = weight on Earth × that world's gravity ratio. A 60 kg person who weighs 600 N on Earth would weigh about 100 N on the Moon."
  ], [
    "What changes from planet to planet?|weight|⚖️|It depends on gravity.|mass,amount of matter",
    "What stays the same everywhere?|mass|🧱|It is the amount of matter.|weight,gravity pull",
    "Surface gravity on the Moon is about how much of Earth's?|one sixth|🌙|It is a small fraction.|twice,the same",
    "On the Moon a 600 N person would weigh about...|100 N|🌙|Divide by six.|3600 N,6 N",
    "Which world has the strongest gravity at its cloud tops?|Jupiter|🪐|It is the biggest planet.|Mars,the Moon",
    "Gravity at the surface of Mars compared with Earth is...|weaker|🔴|It is about 38%.|stronger,exactly the same",
    "Weight is measured in...|newtons|📏|A unit named after a scientist.|kilograms,liters",
    "Mass is usually measured in...|kilograms|⚖️|A metric unit.|newtons,degrees"
  ], "Think about what depends on gravity and what does not."));
  b.push(L("Reading the spectrum of a star", [
    "Starlight tells all|🌈|A <b>spectrum</b> splits light into colors. A star's spectrum has dark lines. Each line is a fingerprint of an element that absorbed light.",
    "What it tells us|🔬|The lines show what elements are in a star. The pattern also shows temperature. Shifts in the lines tell us whether the star moves toward us or away from us.",
    "Spectral types|🌟|Stars are sorted by temperature into classes <b>O B A F G K M</b>, from the hottest and bluest to the coolest and reddest. The Sun is class <b>G</b>."
  ], [
    "A band of colors made by splitting light is a...|spectrum|🌈|A prism makes one.|shadow,horizon",
    "Dark lines in a star's spectrum show which...|elements are present|🔬|Each element has its own fingerprint.|moons orbit it,seasons it has",
    "A tool that splits light into a spectrum is a...|spectrograph|📡|Its name has the word spectrum in it.|seismograph,barograph",
    "The Sun's spectral class is...|G|☀️|It is in the middle of the list.|O,M",
    "The hottest star class is...|O|🔵|It comes first in the list.|M,K",
    "The coolest star class is...|M|🔴|It comes last in the list.|O,B",
    "Hot stars look...|blue|🔵|Color shows temperature.|red,black",
    "A shift of lines toward red shows a star moving...|away from us|➡️|It is a redshift.|toward us,in a circle only"
  ], "Think about what the dark lines act like for each element."));
  b.push(L("Ripples in space and an echo of light", [
    "The cosmic microwave background|📡|The <b>CMB</b> is faint microwave light that fills the sky. It is the cooled-down glow from about 380,000 years after the Big Bang. Its temperature is about 2.7 K.",
    "Evidence|🧪|The CMB is almost the same in every direction, with tiny differences that grew into stars and galaxies. It is one of the strongest pieces of evidence for the Big Bang.",
    "Gravitational waves|🌊|In 2015 scientists detected <b>gravitational waves</b>, tiny ripples in space made when two black holes merged. They give a new way to study the universe."
  ], [
    "Faint microwave light filling the sky is the...|cosmic microwave background|📡|It is an afterglow.|aurora,zodiacal belt",
    "The CMB is leftover glow from the...|early universe|🌌|It came from long ago.|Moon,Sun",
    "The CMB temperature is about...|2.7 K|🌡️|It is just above absolute zero.|270 K,2700 K",
    "Tiny differences in the CMB grew into...|stars and galaxies|✨|Gravity made them clump.|planets only,comets only",
    "The CMB supports the theory of the...|Big Bang|💥|The universe began hot.|steady state,flat Earth",
    "Ripples in space itself are called...|gravitational waves|🌊|Merging black holes make them.|sound waves,radio waves",
    "Gravitational waves were first detected in...|2015|📆|It was in the 2010s.|1815,1915",
    "Gravitational waves were caused by merging...|black holes|🕳️|They are heavy objects.|raindrops,comets"
  ], "Think about what light left over from the early universe would look like now."));
  b.push(L("Getting to other planets", [
    "Orbit to orbit|🚀|Spacecraft do not fly straight to a planet. They follow an orbit around the Sun. A <b>Hohmann transfer</b> is a fuel-saving path that touches both the starting and the target orbit.",
    "Launch windows|📅|Planets move, so a spacecraft must leave at the right time, a <b>launch window</b>. For Mars, windows come about every 26 months.",
    "Gravity assist|🪐|A spacecraft can fly close to a planet and borrow some of its orbital energy to speed up. This is a <b>gravity assist</b>. It saves fuel on trips to the outer planets."
  ], [
    "A fuel-saving path between two orbits is a...|Hohmann transfer|🚀|Its name is a scientist's last name.|solar flare,warp jump",
    "The right time to launch is called a...|launch window|📅|It opens and closes.|launch pad,launch roof",
    "Launch windows to Mars come about every...|26 months|🔴|A bit over two years.|26 days,26 years",
    "Borrowing a planet's energy to speed up is a...|gravity assist|🪐|It saves fuel.|solar sail,heat shield",
    "Spacecraft to Mars follow a path around the...|Sun|☀️|They are in its orbit.|Moon,Earth only",
    "A gravity assist helps a spacecraft...|change speed and direction|🛰️|It uses a planet's pull.|stop for ever,cool down",
    "Gravity assists are very useful for missions to the...|outer planets|🌌|Those trips are long.|the Moon only,the kitchen",
    "Why not fly straight to Mars?|The planets are moving|🔄|Everything is orbiting.|Space has no gravity,Mars is flat"
  ], "Think about how planets are always moving around the Sun."));
  b.push(L("Space junk", [
    "Junk in orbit|🛰️|Old satellites, rocket stages and tiny paint flecks orbit Earth. This is <b>space debris</b>. Millions of pieces are in orbit.",
    "Danger from speed|💥|Debris moves about 7 to 8 km per second in low orbit. Even a tiny fleck can damage a satellite or a spacecraft.",
    "Kessler syndrome|⚠️|If too many crashes happen, each crash makes more pieces, which cause more crashes. This chain reaction is called the <b>Kessler syndrome</b>. Better rules and clean-up plans help prevent it."
  ], [
    "Old satellites and rocket pieces in orbit are called...|space debris|🛰️|It is junk in space.|space dust only,star clusters",
    "Debris in low orbit moves about how fast?|7 to 8 km per second|⚡|Much faster than a bullet.|7 to 8 km per hour,70 meters per second",
    "A tiny piece of debris can be dangerous because of its...|speed|💥|Fast things carry lots of energy.|color,smell",
    "The chain reaction of crashes in orbit is the...|Kessler syndrome|⚠️|It is named after a NASA scientist.|Hubble effect,Doppler effect",
    "Each crash in the Kessler syndrome makes...|more debris|💥|The pieces cause more crashes.|less debris,fresh satellites",
    "A good way to reduce space junk is to...|deorbit old satellites|⬇️|Bring them down safely.|leave them all up,add more rockets stages",
    "Tracking debris helps satellites...|avoid collisions|📡|Operators can dodge pieces.|go faster,disappear",
    "Most debris orbits near...|Earth|🌍|That is where we launch to.|Jupiter,the Sun's core"
  ], "Think about how fast something must move to stay in orbit."));
  b.push(L("Models and their limits", [
    "What is a model?|🧩|A <b>model</b> is a simplified version of something real. It can be a drawing, a physical object, an equation or a computer program.",
    "Why simplify|✂️|Earth systems are very complicated. A model keeps the key parts and leaves out the small details, so we can test ideas and make predictions.",
    "Limits|⚠️|Every model has limits. It is only as good as the data and rules it uses. Scientists compare models with real measurements and improve them when they do not match."
  ], [
    "A simplified version of something real is a...|model|🧩|It keeps the key parts.|fact,fossil",
    "Which is a model of Earth?|a globe|🌍|It is small but looks like Earth.|a rock,a raindrop",
    "Why do scientists simplify with models?|to test ideas|🧪|Real systems are too complicated.|to hide the facts,to guess without data",
    "Every model has...|limits|⚠️|It is not perfect.|no flaws,no inputs",
    "When a model does not match real data scientists...|improve the model|🔧|They revise it.|ignore the data,throw away science",
    "An equation that describes how the Earth system works is a...|mathematical model|➗|It uses numbers.|physical model,drawing model",
    "A model is only as good as its...|data and rules|📊|What goes in affects what comes out.|color,size alone",
    "A map is a model because it...|shows a simplified view|🗺️|It leaves out many details.|is the real place,is bigger than the land"
  ], "Think about why a map does not show every blade of grass."));
  b.push(L("Lithosphere and asthenosphere", [
    "Two ways to slice Earth|🍰|We can describe Earth by what it is made of (crust, mantle, core) or by how it behaves. By behavior, the outer layers are the <b>lithosphere</b> and the <b>asthenosphere</b>.",
    "Stiff and soft|🪨|The <b>lithosphere</b> is the cool, stiff, rigid outer shell. It is the crust plus the very top of the mantle. It is broken into the tectonic plates.",
    "Slow flow|🫠|Below it, the <b>asthenosphere</b> is hot mantle rock that is still solid but can flow very slowly like soft plastic. The plates glide on it."
  ], [
    "The rigid outer shell of Earth is the...|lithosphere|🪨|Litho means stone.|asthenosphere,outer core",
    "The soft flowing layer under the plates is the...|asthenosphere|🫠|Its name begins with the letter A.|lithosphere,crust only",
    "The lithosphere is made of the crust and the...|top of the mantle|🍰|It includes a little of the next layer.|inner core,outer core",
    "Tectonic plates are pieces of the...|lithosphere|🧩|They are the rigid shell.|asthenosphere,core",
    "The asthenosphere is solid but can...|flow slowly|🐌|Like warm plastic.|burn quickly,float on the sea",
    "Plates glide on the...|asthenosphere|🛷|It is the soft layer.|lithosphere,inner core",
    "The asthenosphere is part of Earth's...|mantle|🔥|It lies below the crust.|crust,core",
    "Compared with the asthenosphere the lithosphere is...|stiffer|💪|It is cool and rigid.|runnier,hotter"
  ], "Think about which layer acts rigid and which acts like soft plastic."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[8], b[9], b[10], b[12], b[13], b[14], b[15], b[17]]));
  b.push(MIX("Level 20 Challenge", [b[1], b[2], b[3], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[13], b[14], b[15], b[16], b[17], b[0]]));


  // ================= LEVEL 21 =================
  const c = [];
  c.push(L("Stress and strain in rock", [
    "Forces on rock|🪨|<b>Stress</b> is the force on a rock for each unit of area. <b>Strain</b> is the change in shape that results. Rock can be squeezed, pulled or sheared.",
    "Three kinds of stress|↔️|<b>Compression</b> squeezes and shortens rock. <b>Tension</b> pulls and stretches it. <b>Shear</b> pushes in opposite directions side by side.",
    "How rock responds|🧱|Rock can bend like putty (<b>ductile</b>, often when hot and deep) or snap (<b>brittle</b>, when cool and shallow). Brittle breaks are faults. Bends are folds."
  ], [
    "Squeezing force on rock is called...|compression|⬇️|It shortens the rock.|tension,shear",
    "Pulling force that stretches rock is...|tension|↔️|It makes rock longer and thinner.|compression,shear",
    "Forces that push in opposite directions side by side are...|shear|↕️|Think of scissors.|compression,tension",
    "The change in shape caused by stress is...|strain|📐|It is the result.|stress,gravity",
    "Rock that bends without breaking is...|ductile|🫠|It acts like putty.|brittle,igneous",
    "Rock that snaps under stress is...|brittle|💥|Cool rock near the surface.|ductile,molten",
    "Brittle breaks in rock are called...|faults|⚡|The rock slips along them.|folds,dunes",
    "Bends in rock layers are called...|folds|🌊|Ductile rock can make them.|faults,cracks of ice"
  ], "Think about the direction the rock is being pushed or pulled."));
  c.push(L("What drives the plates", [
    "Moving plates|🧩|Plates move a few centimeters each year. Scientists think several forces work together to move them.",
    "Slab pull|⬇️|At a subduction zone, the old cold plate is dense and sinks into the mantle. It pulls the rest of the plate behind it. This <b>slab pull</b> is probably the strongest force.",
    "Ridge push and the mantle|⛰️|At a mid-ocean ridge, new crust is high and slides downhill, giving a <b>ridge push</b>. Slow flow in the mantle also helps. Plates are not simply carried on the back of mantle currents."
  ], [
    "The sinking of a cold dense plate pulls the plate behind it. This is...|slab pull|⬇️|Think of a tablecloth sliding off a table.|ridge push,mantle plume",
    "Slab pull is thought to be the...|strongest driving force|💪|It is the biggest of the pushes and pulls.|weakest force,only force",
    "Sliding of new elevated crust away from a ridge is...|ridge push|⛰️|It pushes from behind.|slab pull,shear",
    "Slab pull happens at a...|subduction zone|⬇️|One plate dives under another.|mid-ocean ridge,transform fault",
    "Plates move at about...|a few cm per year|🐌|About as fast as fingernails grow.|a few m per day,a few km per year",
    "Why does an old ocean plate sink?|It is cold and dense|🧊|Cooling makes it heavier.|It is hot and light,It is lost at sea",
    "New crust forms at a...|mid-ocean ridge|🌊|The seafloor spreads there.|trench,mountain belt",
    "The main idea is that plate motion is driven by...|several forces|🔧|It is not one thing alone.|the Moon alone,wind alone"
  ], "Think about what happens when a cold dense plate meets another plate."));
  c.push(L("Earthquake patterns and forecasts", [
    "Quakes repeat|🔁|Faults build up strain slowly and then slip. Because of this, big earthquakes on a fault repeat over long periods. The time between them is called the <b>recurrence interval</b>.",
    "Probability not prediction|🎲|Scientists can say how likely a big quake is in the next 30 years. They cannot say the day or hour. A forecast gives odds. A prediction would give a time, and none are reliable.",
    "Early warning|📲|Once a quake starts, sensors detect the fast P waves and send alerts that travel faster than the damaging S and surface waves. This can give seconds of warning."
  ], [
    "The time between big quakes on a fault is the...|recurrence interval|🔁|It means how often it repeats.|epicenter time,wave period",
    "Scientists can reliably predict the exact day of a quake.|false|📅|They give odds instead.|true,sometimes true",
    "A statement about the chance of a quake in the next 30 years is a...|forecast|🎲|It uses probabilities.|prediction of the hour,rumor",
    "Early warning systems detect the fast...|P waves|📡|They arrive first.|S waves,surface waves only",
    "Early warning can give about...|seconds of warning|⏱️|It is very short.|years of warning,months of warning",
    "Faults slip after they build up...|strain|📐|Stress stored in the rock.|snow,heat only",
    "A longer recurrence interval means big quakes are...|less frequent|⏳|They happen less often.|more frequent,never",
    "Early warning works because alerts travel faster than the...|damaging waves|⚡|Electronic signals are quicker than the shaking.|P waves,sound of the Sun"
  ], "Think about the difference between giving odds and naming a date."));
  c.push(L("Hot water on the seafloor", [
    "Hydrothermal vents|♨️|At mid-ocean ridges, seawater seeps into cracks, is heated by hot rock and shoots out again as hot, mineral-rich fluid. These places are <b>hydrothermal vents</b>.",
    "Black smokers|⚫|The hot fluid can reach 350 °C or more. When it meets cold seawater, dissolved metals such as iron and sulfur form tiny dark particles. The chimneys are called <b>black smokers</b>.",
    "Life without sunlight|🦀|Vents have no sunlight, yet they host tube worms, crabs and shrimp. Bacteria use chemicals from the vent for energy in <b>chemosynthesis</b>. Vent deposits can also form valuable ore."
  ], [
    "Openings on the seafloor where hot fluid shoots out are...|hydrothermal vents|♨️|Hydro means water and thermal means heat.|geysers on land,cold seeps only",
    "Chimneys that release dark mineral-rich fluid are...|black smokers|⚫|The color gives the first word.|white clouds,blue bubbles",
    "Vent fluid can reach about...|350 °C|🌡️|Pressure keeps the water from boiling.|35 °C,3 °C",
    "Vent life gets energy from...|chemicals|🧪|There is no sunlight.|sunlight,wind",
    "Making food from chemicals instead of sunlight is...|chemosynthesis|🧬|Chemo means chemical.|photosynthesis,respiration only",
    "Which animal lives at vents?|giant tube worms|🪱|They have no mouths and rely on bacteria.|polar bears,seagulls",
    "Vents are usually found at...|mid-ocean ridges|🌊|The crust is thin and hot there.|continental plains,deserts",
    "Vents can build up deposits rich in...|metals|⛏️|The fluid carries dissolved minerals.|sand only,pure water"
  ], "Think about what powers life where sunlight never reaches."));
  c.push(L("Permafrost", [
    "Frozen ground|🧊|<b>Permafrost</b> is ground that stays frozen for at least two years in a row. It covers about a quarter of the land in the Northern Hemisphere, in places like Siberia, Alaska and Canada.",
    "The active layer|🌱|In summer, the top layer thaws and plants can grow. This is the <b>active layer</b>. The deeper ground stays frozen all year.",
    "Thaw danger|⚠️|Warming makes permafrost thaw. Buildings and roads can sink or crack. Frozen plant matter also rots and releases CO₂ and methane, which add to warming. This is a <b>feedback loop</b>."
  ], [
    "Ground that stays frozen for two or more years is...|permafrost|🧊|Perma means lasting.|loess,tundra grass",
    "Permafrost covers about what share of the land in the Northern Hemisphere?|a quarter|📊|It is large but not most.|almost all,almost none",
    "The top layer that thaws each summer is the...|active layer|🌱|Plants live in it.|bedrock,mantle",
    "When permafrost thaws buildings can...|sink or crack|🏠|The ground becomes soft.|get stronger,float away on air",
    "Thawing permafrost releases CO₂ and...|methane|💨|Another greenhouse gas.|oxygen,helium",
    "Thawing that releases more greenhouse gases and causes more warming is a...|positive feedback|🔁|It makes the change bigger.|negative feedback,balance",
    "Permafrost is found mostly in...|cold polar regions|🥶|Think of Siberia and Alaska.|tropical islands,deserts",
    "Which is a danger of thawing permafrost?|damaged roads|🛣️|The ground loses its strength.|colder weather,more ice cream"
  ], "Think about what happens to the ground and to the stored plants when it warms."));
  c.push(L("Gases and their lifetimes", [
    "Lifetime in the air|⏳|Different gases stay in the air for different times. This is their <b>lifetime</b>. Methane lasts about 12 years, nitrous oxide about 110 years and CO₂ for hundreds of years or more.",
    "Why it matters|🔍|A gas with a short lifetime responds fast when emissions are cut. A gas with a long lifetime keeps on warming for a long time after it is released.",
    "Man-made gases|🧴|Some man-made gases, like <b>CFCs</b> and <b>HFCs</b>, trap heat very strongly. CFCs also harmed the ozone layer, so they were phased out by an international agreement."
  ], [
    "Methane stays in the air about...|12 years|🐄|Not as long as CO₂.|1200 years,12 days",
    "Which gas lasts longest in the air?|carbon dioxide|🏭|It stays for centuries.|methane,water vapor",
    "Cutting a short-lived gas gives...|a faster response|⚡|It leaves the air sooner.|no response at all,a slower response",
    "Gases like CFCs were mainly used in...|fridges and sprays|🧴|Older cooling and spray products.|bicycles,bread",
    "CFCs were phased out because they harmed the...|ozone layer|🛡️|It protects us from UV light.|Moon,ocean floor",
    "The phase-out of CFCs was a worldwide...|agreement|🤝|Countries agreed together.|volcano,storm",
    "HFCs are strong...|greenhouse gases|🔥|They trap heat.|fertilizers,nutrients",
    "Nitrous oxide lasts about...|110 years|⏳|Longer than methane but shorter than some CO₂.|11 years,11000 years"
  ], "Think about how long each gas stays before it breaks down or is absorbed."));
  c.push(L("Dead zones", [
    "Too many nutrients|🌾|Fertilizer and sewage can run off into rivers and reach the sea. These nutrients, mostly nitrogen and phosphorus, feed a huge growth of algae. This is <b>eutrophication</b>.",
    "Running out of oxygen|🫧|When the algae die, bacteria feed on them and use up oxygen in the water. This is called <b>hypoxia</b>. Fish and crabs leave or die.",
    "Dead zones|🌊|An area of water with too little oxygen for most life is a <b>dead zone</b>. One forms each summer near the mouth of the Mississippi River. Using less fertilizer and keeping wetlands helps."
  ], [
    "A burst of algae caused by extra nutrients is part of...|eutrophication|🌿|It means too well fed.|erosion,evaporation",
    "Which two nutrients mostly cause eutrophication?|nitrogen and phosphorus|🌾|They are in fertilizer.|iron and gold,helium and neon",
    "Water with too little oxygen is...|hypoxic|🫧|Hypo means below.|saline,fresh and clear",
    "Algae die and bacteria use up...|oxygen|🫧|Fish need it too.|salt,sunlight",
    "An area with too little oxygen for most life is a...|dead zone|🌊|Few animals can live there.|nursery,coral reef",
    "Nutrients reach rivers from fertilizer and...|sewage|🚰|Both carry nutrients.|volcanic ash only,sea salt",
    "A dead zone forms near the mouth of the...|Mississippi River|🏞️|It flows into the Gulf of Mexico.|Nile River,Amazon River",
    "A way to reduce dead zones is to...|use less fertilizer|🌱|Cut the nutrients at the source.|add more nutrients,pump out oxygen"
  ], "Think about what the algae need and what happens when they die."));
  c.push(L("The phosphorus and sulfur cycles", [
    "Phosphorus cycle|🦴|Phosphorus is needed for DNA and bones. Unlike carbon and nitrogen, it has almost no gas phase. It moves mainly through rock, soil, water and living things.",
    "Slow cycle|🪨|Weathering of rock releases phosphate into soil and water. Plants take it up and animals eat the plants. It returns to the soil when they decay. Over millions of years, it ends up in ocean sediments and is uplifted again.",
    "Sulfur cycle|🌋|Sulfur comes from volcanoes, ocean spray and burning coal. It can form <b>sulfur dioxide</b>, which makes acid rain and tiny particles that reflect sunlight."
  ], [
    "Which cycle has almost no gas phase?|phosphorus cycle|🦴|It moves through rock and water.|carbon cycle,water cycle",
    "Phosphorus is needed for DNA and...|bones|🦴|It helps build hard parts.|clouds,wind",
    "Phosphate is released into soil by the weathering of...|rock|🪨|Slowly breaking down.|clouds,steam",
    "Plants get phosphorus from the...|soil|🌱|They take it up through roots.|air,moonlight",
    "Phosphorus returns to the soil when living things...|decay|🍂|They break down.|fly,sing",
    "A major natural source of sulfur is...|volcanoes|🌋|They release gas.|rainbows,tides",
    "Sulfur dioxide can cause...|acid rain|☔|It makes the rain more acidic.|auroras,earthquakes",
    "Tiny sulfur particles in the air can...|reflect sunlight|☀️|They cool the surface.|make heat,stop gravity"
  ], "Think about where each element is stored, mostly in rock or in air."));
  c.push(L("Measuring sea level", [
    "Tide gauges|📏|For over a century, <b>tide gauges</b> at the coast have measured sea level. They show it going up in most places. But land can also move up or down, which changes the reading.",
    "Satellite altimetry|🛰️|Since 1993, satellites have bounced radar off the ocean from space. This <b>altimetry</b> measures the height of the sea surface across the whole globe to within a few centimeters.",
    "Two causes|📈|Global sea level rises for two main reasons. Warm water takes up more room (<b>thermal expansion</b>), and melting land ice adds new water. The rate has increased in recent decades."
  ], [
    "A coastal instrument that measures sea level is a...|tide gauge|📏|It has the word tide in it.|rain gauge,wind vane",
    "Satellites measure the sea surface height by bouncing...|radar|🛰️|It is a radio wave.|sound,paint",
    "Measuring height from space is called...|altimetry|📡|Alti means height.|seismology,hydrology",
    "Satellite measurements of the sea began in...|1993|📆|It was in the 1990s.|1793,2093",
    "Warm water takes up more room. This is called...|thermal expansion|🌡️|Think of heat and growth.|thermal erosion,tidal lock",
    "Besides expansion, sea level rises because of...|melting land ice|🏔️|Water flows into the sea.|melting sea ice,more tides",
    "A tide gauge can be fooled if the land is...|sinking or rising|🏖️|The ground moves with it.|too sandy,windy",
    "Compared with past decades, the rate of sea level rise is...|faster|⏩|It has increased.|slower,zero",
  ], "Think about which tools measure from the coast and which from space."));
  c.push(L("The Intertropical Convergence Zone", [
    "Where trade winds meet|🌐|Near the equator, the trade winds from the north and south meet in a belt called the <b>ITCZ</b>, the Intertropical Convergence Zone.",
    "Rain belt|🌧️|Air in the ITCZ is warm and moist. It rises, cools and makes towering storm clouds and heavy rain. The belt shifts north and south through the year, following the Sun, and brings the wet seasons to the tropics.",
    "The Walker circulation|🔁|Over the tropical Pacific, air rises over the warm west and sinks over the cool east. This loop is the <b>Walker circulation</b>. It weakens in an El Niño."
  ], [
    "The belt where trade winds meet near the equator is the...|ITCZ|🌐|Think of the letters I T C Z.|jet stream,Hadley front",
    "Air in the ITCZ is moving...|upward|⬆️|It is warm and moist.|downward,sideways only",
    "The ITCZ is known for...|heavy rain|🌧️|Towering clouds form.|dry deserts,thick ice",
    "The ITCZ moves north and south following the...|Sun|☀️|It tracks the hottest area.|Moon,stars",
    "The ITCZ brings the wet season to the...|tropics|🌴|Near the equator.|poles,deep ocean",
    "Over the tropical Pacific air rises over the...|warm west|🌅|Warm water heats the air.|cool east,north pole",
    "The tropical Pacific loop of air is the...|Walker circulation|🔁|It is named after a British scientist.|Ferrel cell,polar vortex",
    "In an El Niño the Walker circulation...|weakens|📉|The warm water shifts east.|strengthens,stops Earth spinning"
  ], "Think about where warm moist air meets and rises."));
  c.push(L("Severe storm types", [
    "Single-cell and multi-cell|⛈️|An ordinary thunderstorm lasts under an hour. A <b>multicell</b> cluster has many storms in a row, each at a different stage.",
    "Supercells|🌪️|A <b>supercell</b> is a long-lived storm with a rotating updraft called a <b>mesocyclone</b>. It makes most big hail and the strongest tornadoes.",
    "Squall lines|🌬️|A <b>squall line</b> is a long line of storms that can bring strong straight-line winds, called a <b>derecho</b> when it is very large. Doppler radar and storm spotters help give warnings."
  ], [
    "A storm with a rotating updraft is a...|supercell|🌪️|It is long-lived.|squall line,sea breeze",
    "The rotating updraft of a supercell is a...|mesocyclone|🌀|Its name has cyclone in it.|derecho,anemometer",
    "Most of the strongest tornadoes come from...|supercells|🌪️|The rotating storm type.|fog banks,sea breezes",
    "A long line of storms is a...|squall line|🌬️|It forms a line.|supercell,mesocyclone",
    "A very large storm with damaging straight-line wind is a...|derecho|💨|It is a Spanish word meaning straight.|tornado,hurricane",
    "Radar that detects motion in storms is...|Doppler radar|📡|It senses wind movement.|sonar,laser",
    "A single ordinary thunderstorm usually lasts...|under an hour|⏱️|It is short.|many days,a month",
    "People who watch the sky and report storms are storm...|spotters|👀|They are trained watchers.|farmers,divers"
  ], "Think about which storms rotate and which come in lines."));
  c.push(L("Climate tipping points", [
    "Thresholds|⚖️|A <b>tipping point</b> is a threshold. Once crossed, a system changes in a big way that is hard or impossible to reverse, like a tipping chair.",
    "Examples|🌍|Possible tipping points include the collapse of big ice sheets, die-back of the Amazon rainforest, loss of coral reefs and changes in ocean currents.",
    "Why they worry us|⚠️|Feedback loops can push a system over the edge. Scientists are not sure exactly where each threshold lies, so they urge caution and early action to reduce emissions."
  ], [
    "A threshold after which a system changes in a hard-to-reverse way is a...|tipping point|⚖️|Like a chair tipping over.|turning wheel,gentle slope",
    "Which is a possible tipping point?|collapse of an ice sheet|🏔️|It would raise sea level.|a sunny weekend,a short rain",
    "Another possible tipping point is Amazon rainforest...|die-back|🌳|The forest dries out and shrinks.|growth only,sunbathing",
    "After crossing a tipping point the change is...|hard to reverse|🔒|It cannot be easily undone.|easy to undo,not important",
    "Feedback loops can push a system toward a...|tipping point|🔁|They amplify change.|calm,balance forever",
    "Scientists urge caution because exact thresholds are...|uncertain|❓|We do not know exactly where they lie.|well known,fixed",
    "Corals can die when ocean water becomes too...|warm|🪸|Heat causes bleaching.|cold only,quiet",
    "The best way to avoid tipping points is to...|reduce emissions early|🌱|Act before the threshold.|wait and see,ignore it"
  ], "Think about a ball rolling over the top of a hill and not coming back."));
  c.push(L("Escape velocity and orbits", [
    "Staying in orbit|🛰️|An orbit is a fall around a planet. The object moves sideways so fast that as it falls it keeps missing the ground. Low Earth orbit needs about 7.8 km/s.",
    "Escape velocity|🚀|To leave a planet for good you need the <b>escape velocity</b>. For Earth it is about <b>11.2 km/s</b>. For the Moon it is only about 2.4 km/s, and for Jupiter about 60 km/s.",
    "Why it depends|⚖️|Escape velocity grows with a world's mass and shrinks with its radius. A bigger, denser world has stronger gravity at its surface and is harder to escape."
  ], [
    "The speed needed to leave a planet for good is the...|escape velocity|🚀|It is a minimum speed.|orbital drift,terminal speed",
    "Earth's escape velocity is about...|11.2 km/s|🌍|Roughly eleven.|1.1 km/s,112 km/s",
    "Low Earth orbit needs a speed of about...|7.8 km/s|🛰️|Less than escape speed.|0.78 km/s,78 km/s",
    "The Moon's escape velocity compared with Earth's is...|much lower|🌙|Its gravity is weaker.|much higher,equal",
    "Which has the greatest escape velocity?|Jupiter|🪐|It is the most massive planet.|the Moon,Mars",
    "An orbit is a fall where the object keeps...|missing the ground|🎯|It moves sideways quickly.|hitting the ground,stopping",
    "Escape velocity increases with a world's...|mass|⚖️|More mass pulls more.|smallness,coolness",
    "Why can small worlds like the Moon hold little air?|Low escape velocity|🌙|Gas can drift away.|They have no Sun,They are too cold to see"
  ], "Think about how strongly a world pulls at its surface."));
  c.push(L("Inside the giant planets", [
    "No solid surface|🪐|Jupiter and Saturn are mostly hydrogen and helium. There is no ground to stand on. The gas gets thicker and hotter with depth.",
    "Strange layers|🔬|Deep inside Jupiter, the pressure is so huge that hydrogen acts like a liquid metal. This <b>metallic hydrogen</b> carries electric currents and produces Jupiter's strong magnetic field.",
    "Ice giants|🔵|Uranus and Neptune have thick layers of water, ammonia and methane under their gases. They are called <b>ice giants</b>. They are not made of everyday ice, since the material is hot and under high pressure."
  ], [
    "Jupiter and Saturn are made mostly of hydrogen and...|helium|🎈|The second lightest element.|iron,oxygen",
    "Jupiter's strong magnetic field comes from...|metallic hydrogen|🧲|Pressure changes the hydrogen.|iron crust,solid ice",
    "Deep inside Jupiter, hydrogen behaves like a...|liquid metal|🔩|Under huge pressure.|plain gas,light rock",
    "Uranus and Neptune are called...|ice giants|🔵|They have water and ammonia.|rock giants,gas dwarfs",
    "Gas giants have no...|solid surface|🪐|You cannot land on them.|atmosphere,mass",
    "Temperature inside a gas giant as you go deeper...|rises|🌡️|It gets hotter.|falls,stays same",
    "Jupiter's atmosphere is mostly...|hydrogen|💨|The lightest element.|oxygen,nitrogen",
    "Methane in the atmosphere gives Neptune its...|blue color|🔵|It absorbs red light.|red color,green stripes"
  ], "Think about what huge pressure does to hydrogen."));
  c.push(L("Listening to the universe", [
    "More than light you see|📡|Our eyes see only a thin slice of light. Telescopes now observe in <b>radio</b>, infrared, ultraviolet, X-ray and gamma rays. Each shows things the others miss.",
    "Radio astronomy|📻|Large dishes collect radio waves from space. Radio waves can pass through dust and show things like pulsars, hydrogen gas and distant galaxies.",
    "Many messengers|🌌|<b>Multi-messenger astronomy</b> combines light with other signals such as gravitational waves and neutrinos. Using many at once gives a fuller picture of events like colliding neutron stars."
  ], [
    "Telescopes that collect radio waves use big...|dishes|📡|They look like bowls.|mirrors of glass only,lenses of sand",
    "Radio waves can pass through...|dust clouds|🌫️|Light is blocked, radio is not.|solid iron,thick walls of lead",
    "Rapidly spinning dead stars found by radio are...|pulsars|⭐|They pulse with regular beeps.|comets,planets",
    "Which kind of light do our eyes see?|visible light|👁️|A thin slice of the spectrum.|X-rays,gamma rays",
    "Combining light with other signals is...|multi-messenger astronomy|🌌|Many messengers are used.|single-signal viewing,star counting",
    "Besides light, a messenger can be...|gravitational waves|🌊|Ripples in space.|rain,wind",
    "Different kinds of light show things...|the others miss|🔍|Each tells a different story.|that are all the same,that are not real",
    "Why put X-ray telescopes in space?|Earth's air blocks X-rays|🛰️|The atmosphere absorbs them.|X-rays are too slow,Space is brighter at night"
  ], "Think about why we need more than just our own eyes to study space."));
  c.push(L("The Drake equation", [
    "Are we alone?|👽|Scientists ask whether life exists elsewhere. In 1961 Frank Drake wrote an equation to think about how many civilizations might exist in our galaxy.",
    "The pieces|🧮|The <b>Drake equation</b> multiplies factors: how many stars form, how many have planets, how many planets could have life, how often life becomes intelligent, and how long such civilizations last.",
    "A tool for thinking|💭|Many numbers in the equation are still unknown, so the answer ranges from almost none to many. It helps scientists decide what to search for and learn. The search for life uses telescopes and radio listening."
  ], [
    "The Drake equation was made to estimate...|civilizations in our galaxy|🌌|It is about others who might be out there.|asteroids in space,days in a year",
    "Who wrote the Drake equation?|Frank Drake|🧑‍🔬|The name is in the title.|Carl Sagan,Isaac Newton",
    "It was written in...|1961|📆|It was in the 1960s.|1861,2061",
    "The equation works by...|multiplying factors|✖️|Several numbers combine.|adding rocks,drawing circles",
    "Many numbers in the equation are...|still unknown|❓|We have little data.|exactly known,never used",
    "Our galaxy has hundreds of billions of...|stars|⭐|More than we can count.|planets with oceans only,empty gaps",
    "Searching for signals from space uses...|radio telescopes|📡|They listen.|microscopes,thermometers",
    "The search for life elsewhere focuses on planets that may have...|liquid water|💧|Life as we know it needs it.|only ice,no air"
  ], "Think about which numbers we know and which we do not."));
  c.push(L("Star mass and brightness", [
    "Heavier means brighter|⚖️|For stars on the main sequence, a heavier star shines much brighter. Doubling the mass makes a star about ten times brighter.",
    "A shorter life|⏳|Heavy stars burn their fuel fast. A star ten times the Sun's mass lives about 20 million years. The Sun lives about 10 billion years. Small red dwarfs can live for trillions of years.",
    "Luminosity|💡|The total light a star gives off is its <b>luminosity</b>. It depends on its size and its surface temperature. The H-R diagram shows these properties."
  ], [
    "The total light a star gives off is its...|luminosity|💡|It is how bright it truly is.|parallax,azimuth",
    "A heavier main-sequence star is...|brighter|✨|It shines more.|dimmer,the same",
    "Heavier stars live...|shorter lives|⏳|They burn fuel fast.|longer lives,equal lives",
    "The Sun will live about...|10 billion years|☀️|A very long time.|10 million years,10 thousand years",
    "Which star type can live for trillions of years?|red dwarf|🔴|It is small and slow-burning.|blue giant,supernova",
    "A star ten times the Sun's mass lives about...|20 million years|⏳|Much shorter than the Sun.|20 billion years,200 trillion years",
    "Luminosity depends on size and...|surface temperature|🌡️|Hot surfaces shine more.|distance from Earth,color of its planets",
    "A graph that sorts stars by brightness and temperature is the...|H-R diagram|📊|It is named for two astronomers.|periodic table,star map of Earth"
  ], "Think about why a huge fire burns out fast."));
  c.push(L("The Anthropocene", [
    "Humans leave a mark|🏙️|Some scientists suggest a new time in Earth's history, the <b>Anthropocene</b>, because humans now shape the planet. Anthropos means human.",
    "Evidence in the rocks|🧱|Future rocks will contain our traces: plastics, concrete, soot, radioactive fallout from the mid-1900s, and a spike in carbon dioxide. Many animals and plants are going extinct faster than normal.",
    "Not official yet|🗳️|The International Union of Geological Sciences considered the idea but did not adopt it. We still officially live in the <b>Holocene</b> epoch, which began about 11,700 years ago."
  ], [
    "The proposed time when humans shape Earth is the...|Anthropocene|🏙️|Anthropos means human.|Holocene,Cambrian",
    "We officially live in the...|Holocene|🕰️|It began after the last ice age.|Anthropocene,Jurassic",
    "The Holocene began about...|11,700 years ago|⏳|It follows the last ice age.|117 years ago,117 million years ago",
    "Which will be found in future rocks as a trace of humans?|plastics|🧴|Man-made materials last.|dinosaur teeth,lava only",
    "Another trace left in the layers is...|concrete|🧱|We build with it.|ice crystals,volcanic bombs",
    "Today species are going extinct...|faster than normal|📉|Faster than natural rates.|more slowly,never",
    "The Anthropocene is a(n)...|proposed time interval|🗳️|It has not been adopted.|official epoch,type of rock",
    "Humans have changed the carbon dioxide level in the air by...|raising it|📈|Burning fuels adds CO₂.|lowering it,leaving it exactly the same"
  ], "Think about what future geologists might find in our layer of rock."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[16]]));
  c.push(MIX("Level 21 Challenge", [c[1], c[2], c[4], c[5], c[6], c[7], c[8], c[9], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[0]]));

  Object.assign(EARTH_LEVELS, { 19: a, 20: b, 21: c });
})();
