// Mind Lab Earth & Space, levels 16-18 (extension file). 20 lessons per level.
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


  // ================= LEVEL 16 =================
  const a = [];
  a.push(L("Density and Earth's layers", [
    "What is density?|⚖️|<b>Density</b> tells how much stuff is packed into a space. Density = mass ÷ volume. Water has a density of about 1 g/cm³.",
    "Sink or float|🪨|A material with density <b>greater than water</b> sinks in water. One with density <b>less than water</b> floats. Ice floats because it is a little less dense than liquid water.",
    "Dense things sink inside Earth|🌍|Earth's heavy, dense iron sank to the middle long ago, so the <b>core</b> is the densest layer. Light rocks stayed near the top as the <b>crust</b>."
  ], [
    "Density equals mass divided by...|volume|⚖️|Divide the mass by how much space the object takes up.|speed,time",
    "A rock has a mass of 20 g and a volume of 4 cm³. Its density is...|5 g/cm³|🪨|Do 20 ÷ 4.|80 g/cm³,0.2 g/cm³",
    "A block has a mass of 18 g and a volume of 3 cm³. Its density is...|6 g/cm³|🧱|Mass divided by volume.|54 g/cm³,15 g/cm³",
    "Water has a density of about...|1 g/cm³|💧|It is the number used to decide sink or float.|10 g/cm³,0.1 g/cm³",
    "An object with a density of 0.5 g/cm³ placed in water will...|float|🛟|Compare 0.5 with the density of water.|sink,dissolve",
    "An object with a density of 7 g/cm³ placed in water will...|sink|⚓|Compare 7 with the density of water.|float,evaporate",
    "Which layer of Earth is the densest?|inner core|🌍|Think of the heavy iron that sank to the center.|crust,mantle",
    "Ice floats on water because ice is...|less dense than liquid water|🧊|Think about how its density compares with 1 g/cm³.|more dense than liquid water,heavier than a rock",
    "Why did Earth's iron sink to the center?|It is very dense|🌋|Dense things sink through lighter material.|It is very light,It is very cold"
  ], "Think about how much mass is packed into each bit of space."));
  a.push(L("Humidity and dew point", [
    "Water vapor in the air|💧|Air always holds some invisible <b>water vapor</b>. <b>Humidity</b> is how much. <b>Relative humidity</b> is a percent: how full the air is compared with the most it could hold at that temperature.",
    "Warm air holds more|🌡️|Warm air can hold more vapor than cold air. When air cools, the same vapor takes up a larger share of what the air can hold, so relative humidity goes up.",
    "Dew point|🌫️|The <b>dew point</b> is the temperature where air becomes full (100% relative humidity). Cool air below the dew point gives dew, fog or clouds. A <b>hygrometer</b> measures humidity."
  ], [
    "Invisible water in the air is called...|water vapor|💧|It is water as a gas.|ice crystal,runoff",
    "Relative humidity is measured as a...|percent|📊|It compares how full the air is with how full it could be.|speed,mass",
    "Air at 100% relative humidity is...|full of water vapor|☁️|It cannot hold any more at that temperature.|completely dry,very windy",
    "Which air can hold more water vapor?|warm air|🔥|Think about what happens to vapor as air cools.|cold air,neither can hold any",
    "The temperature where air becomes full of water vapor is the...|dew point|🌫️|Cooling below it makes water droplets appear.|freezing point,boiling point",
    "A tool that measures humidity is a...|hygrometer|📏|Its name starts like the word for water.|anemometer,barometer",
    "Cold drinks collect water drops on the outside because air touching the glass...|cools below the dew point|🥤|Think about the air next to the cold glass.|warms above the dew point,gets less humid",
    "As air cools but keeps the same vapor, its relative humidity...|goes up|📈|Cool air holds less vapor at the most.|goes down,stays at zero"
  ], "Think about how temperature changes how much vapor air can hold."));
  a.push(L("Thunderstorms and lightning", [
    "How storms grow|⛈️|A thunderstorm grows in a tall <b>cumulonimbus</b> cloud. Warm moist air rises fast in an <b>updraft</b>. Strong updrafts can also make hail.",
    "Lightning|⚡|Ice bits in the cloud bump together and build up electric charge. A giant spark, <b>lightning</b>, jumps. It heats air to about 30,000 °C, hotter than the Sun's surface.",
    "Thunder and safety|🔊|The hot air expands in a flash, which makes <b>thunder</b>. Light travels far faster than sound. Count the seconds from flash to bang and divide by 3 for the distance in km. Go indoors!"
  ], [
    "Thunderstorms form in a cloud called...|cumulonimbus|⛈️|It is the tallest cloud type.|cirrus,stratus",
    "Rising warm moist air in a storm is called an...|updraft|⬆️|The name tells you its direction.|downburst,eclipse",
    "A giant electric spark in a storm is...|lightning|⚡|Ice bits in the cloud bump and build up charge.|hail,fog",
    "Thunder is caused by...|air expanding quickly from the heat|🔊|Lightning heats the air a lot.|clouds bumping together,rain hitting the ground",
    "We see lightning before we hear thunder because...|light travels faster than sound|👀|Compare the speeds of light and sound.|sound travels faster than light,thunder happens later on purpose",
    "You count 6 seconds from flash to bang. About how far away is the lightning?|2 km|🔢|Divide the seconds by 3.|6 km,18 km",
    "You count 9 seconds from flash to bang. About how far away is the lightning?|3 km|🔢|Divide the seconds by 3.|9 km,27 km",
    "When thunder is heard you should...|go inside a building|🏠|Choose the safest place.|stand under a lone tree,swim in a lake"
  ], "Think about charge building up in a tall cloud."));
  a.push(L("Monsoons", [
    "A wind that changes with the season|🌬️|A <b>monsoon</b> is a wind pattern that switches direction with the season. It brings very wet or very dry weather.",
    "Why it happens|🌊|In summer, land heats faster than the ocean. Warm air rises over land and moist ocean air rushes in, so heavy rain falls. In winter the wind blows from land to sea and it is dry.",
    "Monsoon lands|🇮🇳|South Asia, including India, has a famous monsoon. Its rains arrive from about June to September. Farmers depend on them, but too much rain can flood."
  ], [
    "A wind that reverses with the season is a...|monsoon|🌬️|Its name is used a lot in South Asia.|tornado,jet stream",
    "In a summer monsoon, moist wind blows from the...|ocean to the land|🌊|Land is hotter than the sea in summer.|land to the ocean,north pole to the south pole",
    "The summer monsoon brings...|heavy rain|🌧️|The wind carries lots of moisture.|dry weather,snow",
    "The winter monsoon is usually...|dry|🏜️|The wind blows from land toward the sea.|very rainy,full of hurricanes",
    "Monsoons happen because land heats up...|faster than ocean water|☀️|Think about which warms more slowly.|slower than ocean water,at the same speed as ocean water",
    "Which region is famous for its monsoon?|South Asia|🗺️|It includes India.|Antarctica,Greenland",
    "India's summer monsoon rains arrive around...|June to September|📅|Think of the hot part of the year.|December to February,all year",
    "Why do farmers watch the monsoon closely?|Crops need its rain|🌾|Think about what plants need.|It gives them snow,It blows seeds away on purpose"
  ], "Think about land and sea warming at different speeds."));
  a.push(L("Sea and land breezes", [
    "Day by the sea|🏖️|In the daytime, land warms faster than water. Warm air rises over the land and cooler air from the sea moves in. This is a <b>sea breeze</b>.",
    "Night by the sea|🌙|At night land cools faster than water. The air over the warm sea rises and cooler air from the land moves out. This is a <b>land breeze</b>.",
    "Naming winds|🧭|Winds are named for where they come <b>from</b>. A sea breeze blows from the sea. The cause of both is that land and water heat and cool at different rates."
  ], [
    "A cool wind blowing from the sea to land in the day is a...|sea breeze|🌊|It is named for where it comes from.|land breeze,monsoon",
    "A wind blowing from land to sea at night is a...|land breeze|🌙|It is named for where it comes from.|sea breeze,trade wind",
    "In the daytime, which warms faster?|land|☀️|Water heats up slowly.|ocean water,both warm the same",
    "At night, which cools faster?|land|🌙|Water holds its heat longer.|ocean water,both cool the same",
    "Over the warm land in daytime, the air...|rises|⬆️|Warm air is less dense.|sinks,stands still",
    "Winds are named by the direction they blow...|from|🧭|A west wind comes out of the west.|toward,around",
    "At night over the warm sea, air is...|rising|🌊|The sea is warmer than the land at night.|sinking,frozen",
    "Sea and land breezes are caused by...|different heating of land and water|🔥|Think about how fast each one changes temperature.|the Moon pulling on the air,volcanoes"
  ], "Think about which one heats up and cools down faster."));
  a.push(L("Glaciers carve the land", [
    "Rivers of ice|🏔️|A <b>glacier</b> is a huge mass of ice that slowly flows downhill. <b>Valley glaciers</b> sit in mountains. <b>Ice sheets</b> cover huge areas such as Greenland and Antarctica.",
    "Carving|⛏️|Glaciers grind and scrape rock. A river digs a <b>V-shaped</b> valley. A glacier widens it into a <b>U-shaped</b> valley. Scratches in rock called <b>striations</b> show the way it moved.",
    "Dropping rock|🪨|Glaciers carry rock and then drop it in piles called <b>moraines</b> when they melt. A <b>fjord</b> is a sea inlet in a valley a glacier carved."
  ], [
    "A slow-moving mass of ice on land is a...|glacier|🧊|It flows like a very slow river.|geyser,delta",
    "A valley carved by a glacier is shaped like a...|U|🏔️|Glaciers make wide valleys.|V,X",
    "A valley cut by a river is usually shaped like a...|V|🏞️|A river cuts narrowly downward.|U,O",
    "A pile of rock left behind by a glacier is a...|moraine|🪨|It is rock debris dropped as ice melts.|delta,dune",
    "Scratches in bedrock made by a moving glacier are called...|striations|📏|They are long, straight grooves.|ripples,crystals",
    "A glacier-carved inlet of the sea is a...|fjord|🌊|Norway has many.|oxbow,butte",
    "Huge ice sheets cover most of Antarctica and...|Greenland|🗺️|It is the big island near North America.|Australia,Iceland",
    "Glaciers shape land mainly by...|grinding and carrying rock|⛏️|Think about erosion by moving ice.|dissolving it in rain,blowing sand"
  ], "Think about slow flowing ice and the rock it drags along."));
  a.push(L("Deltas and alluvial fans", [
    "Dropping sediment|🏞️|When moving water slows down, it can no longer carry its sediment, so it drops it. This is <b>deposition</b>.",
    "Deltas|🔺|A <b>delta</b> forms where a river meets a calm lake or sea and drops sediment. Many are shaped like a triangle, like the Greek letter delta. The Nile Delta in Egypt is famous.",
    "Fans and floodplains|⛰️|An <b>alluvial fan</b> forms where a fast mountain stream reaches flat land and spreads its sediment out. A <b>floodplain</b> is flat land beside a river that floods and gets rich new soil."
  ], [
    "When water slows and drops its sediment, this is...|deposition|⬇️|It is the opposite of picking up sediment.|erosion,evaporation",
    "A landform where a river meets the sea and drops sediment is a...|delta|🔺|It can look like a triangle.|canyon,glacier",
    "Which famous delta is in Egypt?|Nile Delta|🏺|It is at the end of Africa's longest river.|Amazon Delta,Ganges Delta",
    "Why does a river drop sediment in a lake or sea?|The water slows down|🐌|Slow water cannot carry as much.|The water speeds up,The sediment melts",
    "A fan-shaped deposit at the foot of a mountain is an...|alluvial fan|🪭|It spreads out from a mountain stream.|oxbow lake,moraine",
    "Flat land beside a river that floods is a...|floodplain|🌾|Floods leave rich new soil there.|plateau,fjord",
    "Why is floodplain soil good for farming?|Floods leave rich sediment|🌱|Think of what the river drops there.|It is always frozen,It is made of pure sand",
    "The Greek letter that gives a delta its name is...|delta (Δ)|🔤|It looks like a triangle.|alpha (α),omega (Ω)"
  ], "Think about what happens when moving water slows down."));
  a.push(L("Groundwater and aquifers", [
    "Water underground|💧|Rain soaks into the ground. Underground water is <b>groundwater</b>. It fills the tiny spaces, called <b>pores</b>, between soil and rock bits.",
    "Water table and aquifers|🕳️|The top of the soaked zone is the <b>water table</b>. A layer of rock or sand that holds and lets water flow is an <b>aquifer</b>. Sand and gravel are <b>permeable</b>: water moves through. Clay is not.",
    "Wells and springs|🚰|A <b>well</b> is dug below the water table to pull water up. A <b>spring</b> is where groundwater flows out at the surface. Water soaking back in refills aquifers; this is <b>recharge</b>."
  ], [
    "Water stored in the spaces of soil and rock underground is...|groundwater|💧|It is under the surface.|runoff,vapor",
    "The top of the soaked zone underground is the...|water table|📏|It is named like furniture holding water.|aquifer cap,rain line",
    "A rock layer that holds and carries water is an...|aquifer|🪨|The name starts with the letter A.|iceberg,estuary",
    "Which material lets water pass through easily?|sand|🏖️|Water drains fast through it.|clay,solid granite",
    "Which material blocks water from passing?|clay|🧱|It is very tightly packed.|gravel,sand",
    "Where groundwater flows out onto the surface it makes a...|spring|⛲|It flows out on its own.|dune,crater",
    "Water soaking down to refill an aquifer is called...|recharge|🔄|Think of refilling.|runoff,erosion",
    "A well must reach below the...|water table|🚰|You need to reach water.|moraine,delta"
  ], "Think about water filling tiny spaces below the ground."));
  a.push(L("Hot spots and island chains", [
    "A hot spot|🔥|A <b>hot spot</b> is a place where a plume of very hot rock rises from deep in the mantle and melts into magma. It can build volcanoes in the middle of a plate.",
    "Moving plate, fixed plume|🏝️|The hot spot stays in place while the plate slides over it. Each volcano is carried away and a new one forms. This makes a <b>chain</b> of islands, such as Hawaii.",
    "Reading the chain|🌋|Islands far from the hot spot are <b>older</b>. In Hawaii, the Big Island is youngest and sits over the hot spot. Yellowstone is another hot spot."
  ], [
    "A place where a plume of hot mantle rock rises is a...|hot spot|🔥|The name says it is very hot.|trench,fault",
    "In the Hawaiian chain the plate moves but the hot spot...|stays in place|📍|Think of a candle under moving paper.|moves with the plate,disappears each year",
    "Islands that form over a moving plate make a...|chain|⛓️|They line up one after the other.|circle,cluster with no order",
    "The youngest Hawaiian island is the...|Big Island|🌋|It sits over the hot spot now.|Kauai,Oahu",
    "Islands farther from the hot spot are...|older|⏳|They were made earlier and carried away.|younger,the same age",
    "Which place in Wyoming sits on a hot spot?|Yellowstone|♨️|It has famous geysers.|Grand Canyon,Niagara Falls",
    "Hot spots are usually found...|in the middle of plates|🗺️|They are not at plate edges.|only at trenches,only at the poles",
    "What melts to feed hot spot volcanoes?|rock rising from the mantle|🌡️|It comes from deep inside Earth.|glacier ice,ocean water"
  ], "Think about a fixed heat source under a moving plate."));
  a.push(L("How mountains are built", [
    "Pushing together|⛰️|When two continental plates collide, rock is squeezed and pushed up into <b>folded mountains</b>. The Himalayas formed this way when India crashed into Asia, and they are still rising a few millimeters a year.",
    "Faults and volcanoes|🌋|<b>Fault-block mountains</b> form when huge blocks of crust tilt or lift along faults, like the Sierra Nevada. <b>Volcanic mountains</b>, like Mount Fuji, are built from lava and ash.",
    "Dome mountains|🏔️|Some mountains form when magma pushes the crust up from below into a bulge called a <b>dome mountain</b>. Wind and water slowly wear all mountains down."
  ], [
    "Folded mountains form when plates...|collide|💥|They push toward each other.|drift apart,stay still",
    "The Himalayas formed when India crashed into...|Asia|🗺️|It is the biggest continent.|Africa,Australia",
    "Mount Fuji is a...|volcanic mountain|🗻|It is built from lava and ash.|fault-block mountain,dome mountain",
    "Mountains made when blocks of crust lift along faults are...|fault-block mountains|🧱|The name mentions faults.|folded mountains,volcanic mountains",
    "Which are built by layers of lava and ash?|volcanic mountains|🌋|Their name tells the source.|folded mountains,dome mountains",
    "The Himalayas are still...|rising slowly|📈|The plates are still pushing.|sinking fast,exactly the same",
    "A mountain made when rising magma bulges the crust is a...|dome mountain|🔵|It has a rounded shape.|folded mountain,cinder cone",
    "What slowly wears mountains down?|weathering and erosion|💨|Think wind and water.|lightning,tides only"
  ], "Think about which force made each kind of mountain."));
  a.push(L("Fossil fuels", [
    "Ancient energy|🛢️|<b>Fossil fuels</b> are coal, oil and natural gas. They formed from ancient living things that were buried and squeezed for millions of years.",
    "How they formed|🌿|<b>Coal</b> formed from swamp plants. <b>Oil</b> and <b>natural gas</b> formed mostly from tiny sea creatures. Natural gas is mainly methane.",
    "Use and cost|🏭|Burning them gives energy but also releases carbon dioxide. They take millions of years to form, so they are <b>nonrenewable</b>: we use them faster than nature can make more."
  ], [
    "Which is a fossil fuel?|coal|⚫|It formed from ancient swamp plants.|wind,sunlight",
    "Coal formed mostly from ancient...|swamp plants|🌿|Think of leafy plants that were buried.|sea creatures only,volcano ash",
    "Oil and natural gas formed mostly from tiny...|sea creatures|🦐|They lived in ancient oceans.|desert plants,volcano rocks",
    "Fossil fuels take about how long to form?|millions of years|⏳|It is a very long time.|a few weeks,about one year",
    "Fossil fuels are called nonrenewable because...|we use them faster than they form|🔋|Nature cannot replace them quickly.|they are free,they never run out",
    "Burning fossil fuels releases the gas...|carbon dioxide|🏭|It is a greenhouse gas.|helium,neon",
    "The main part of natural gas is...|methane|🔥|It has one carbon atom.|oxygen,helium",
    "Which is NOT a fossil fuel?|wind|💨|It is not made from buried life.|oil,natural gas"
  ], "Think about what was buried and squeezed over a long time."));
  a.push(L("Renewable energy", [
    "Energy that does not run out|♻️|<b>Renewable energy</b> comes from sources that nature refills. These include sunlight, wind, flowing water, Earth's heat and plants.",
    "Examples|🌞|<b>Solar panels</b> turn sunlight into electricity. <b>Wind turbines</b> spin in wind. <b>Hydroelectric</b> dams use falling water. <b>Geothermal</b> uses heat from inside Earth.",
    "Trade-offs|⚖️|Solar and wind do not work all the time, so we store energy in batteries. Dams can change rivers. Every choice has good and bad points, so engineers compare them."
  ], [
    "Which is a renewable energy source?|sunlight|☀️|The Sun shines every day.|coal,oil",
    "Panels that turn sunlight into electricity are...|solar panels|🔆|Their name starts like our star's name.|wind blades,dams",
    "Wind turbines turn the energy of...|moving air|🌬️|They have big spinning blades.|burning coal,hot rocks",
    "Using Earth's inner heat for power is called...|geothermal energy|🌋|Geo means Earth.|hydroelectric energy,solar energy",
    "A dam that makes electricity from water is...|hydroelectric|💧|Hydro means water.|geothermal,nuclear",
    "A problem with solar power is that it...|does not work at night|🌙|Think about when the Sun is up.|makes smoke,uses coal",
    "Why use batteries with solar and wind?|To store energy for later|🔋|Wind and sun come and go.|To make more wind,To burn fuel",
    "Renewable means the source...|is refilled by nature|♻️|The opposite of running out for good.|can never be used,takes a million years"
  ], "Think about sources that nature keeps refilling."));
  a.push(L("Longitude and time zones", [
    "Lines from pole to pole|🌐|Lines of <b>longitude</b> run from the North Pole to the South Pole. The <b>Prime Meridian</b> is 0° and passes through Greenwich, England.",
    "Earth turns 15° each hour|🕒|Earth spins 360° in 24 hours, so it turns 15° every hour (360 ÷ 24). Places 15° apart are one hour apart in time.",
    "Time zones|🌍|There are about 24 <b>time zones</b>. Going east, clocks are <b>later</b>; going west, <b>earlier</b>. The <b>International Date Line</b> is near 180°, where the date changes."
  ], [
    "Lines of longitude run from...|pole to pole|🌐|They meet at both ends of Earth.|east to west only,the equator to the Moon",
    "The 0° line of longitude is the...|Prime Meridian|📍|It passes through Greenwich.|Equator,Date Line",
    "How many degrees does Earth turn in one hour?|15 degrees|🔄|360 ÷ 24.|24 degrees,60 degrees",
    "A place 30° east of another is how many hours ahead?|2 hours|⏰|Each 15° is one hour.|1 hour,30 hours",
    "A place 45° east of another is how many hours ahead?|3 hours|⏰|Each 15° is one hour.|2 hours,45 hours",
    "Going east, clocks are...|later|➡️|The Sun rises there first.|earlier,the same",
    "Going west, clocks are...|earlier|⬅️|The Sun gets there later.|later,the same",
    "Where does the date change on Earth?|International Date Line|🗓️|It is near 180°.|Prime Meridian,Tropic of Cancer"
  ], "Think about 360 degrees shared by 24 hours."));
  a.push(L("Latitude and coordinates", [
    "Lines around Earth|🧭|<b>Latitude</b> lines run east-west and tell how far north or south you are. The <b>Equator</b> is 0°. The North Pole is 90° N and the South Pole is 90° S.",
    "Special lines|🌐|The Tropic of Cancer is about 23.5° N and the Tropic of Capricorn is 23.5° S. The Arctic Circle is about 66.5° N. One degree of latitude is about 111 km.",
    "Giving a location|📍|A place is given as latitude, then longitude. Together they are <b>coordinates</b>. Example: 40° N, 74° W is near New York City."
  ], [
    "Latitude tells how far you are...|north or south|🧭|It is measured from the Equator.|east or west,up or down",
    "The Equator is at a latitude of...|0°|🌍|It is the starting line.|90°,23.5°",
    "The North Pole is at...|90° N|❄️|It is the farthest north.|0° N,45° N",
    "Lines of latitude run...|east to west|↔️|They circle Earth like rings.|from pole to pole,diagonally",
    "One degree of latitude is about...|111 km|📏|It is a bit more than 100.|11 km,1100 km",
    "The Tropic of Cancer is at about...|23.5° N|☀️|It marks the northmost overhead Sun.|23.5° S,66.5° N",
    "In coordinates, the first number is usually the...|latitude|📍|It comes first.|longitude,altitude",
    "The Arctic Circle is about...|66.5° N|🧊|It is close to the pole.|23.5° N,0°"
  ], "Think of rings around Earth measured from the Equator."));
  a.push(L("Reading topographic maps", [
    "Contour lines|🗺️|A <b>topographic map</b> shows the shape of land. <b>Contour lines</b> connect points with the same elevation. The <b>contour interval</b> is the height between lines.",
    "Steep or gentle|⛰️|Lines <b>close together</b> mean a steep slope. Lines <b>far apart</b> mean a gentle slope. Circles inside circles show a hill; the smallest circle is the top.",
    "Rivers|🏞️|Contour lines bend into a <b>V</b> where a stream flows. The V points uphill, toward where the stream starts."
  ], [
    "A contour line connects points with the same...|elevation|📏|It tells height above sea level.|temperature,color",
    "Contour lines close together show a...|steep slope|⛰️|The land changes height fast.|gentle slope,flat lake",
    "Contour lines far apart show a...|gentle slope|🟩|The land changes height slowly.|steep cliff,volcano",
    "The height between neighboring contour lines is the...|contour interval|📐|It is a fixed amount.|map key,scale bar",
    "Circles inside circles on a map show a...|hill|⛰️|The smallest circle is the top.|lake,road",
    "A V in contour lines shows a...|stream valley|🏞️|Water flows along it.|city,glacier edge",
    "The V in contour lines points...|uphill|⬆️|Toward where the stream starts.|downhill,sideways",
    "A very flat area on a topographic map has contour lines that are...|very far apart|🏜️|Few height changes.|very close together,touching"
  ], "Think about how fast the height changes where lines are close or far."));
  a.push(L("Light-years and the Milky Way", [
    "A very long distance|✨|A <b>light-year</b> is the distance light travels in one year, about 9.5 trillion km. It measures distance, not time. The Sun is only about 8 light-<b>minutes</b> away.",
    "Looking back in time|🔭|Light takes time to arrive. If a star is 100 light-years away, we see it as it was 100 years ago. The nearest star system, Alpha Centauri, is about 4.2 light-years away.",
    "Our galaxy|🌌|We live in the <b>Milky Way</b>, a spiral galaxy about 100,000 light-years across with hundreds of billions of stars. Our Sun sits in one of its arms."
  ], [
    "A light-year measures...|distance|📏|It is how far light goes in a year.|time,brightness",
    "A light-year is about...|9.5 trillion km|✨|It is a huge number.|9.5 thousand km,300 km",
    "Sunlight takes about how long to reach Earth?|8 minutes|☀️|It is much less than an hour.|8 hours,8 seconds",
    "A star 50 light-years away is seen as it was...|50 years ago|⏳|Its light has traveled that long.|50 days ago,right now",
    "Our galaxy is called the...|Milky Way|🌌|It is also a candy bar name.|Andromeda,Orion",
    "The Milky Way is a...|spiral galaxy|🌀|It has curved arms.|elliptical galaxy,planet",
    "The Milky Way is about how wide?|100,000 light-years|📐|It is enormous.|100 light-years,100 km",
    "The closest star system to the Sun is...|Alpha Centauri|⭐|About 4.2 light-years away.|Polaris,Sirius"
  ], "Think about light speed and how long it travels."));
  a.push(L("Types of galaxies", [
    "Three shapes|🌀|Galaxies come in shapes. <b>Spiral</b> galaxies have curved arms and a bright center. <b>Elliptical</b> galaxies are smooth ovals. <b>Irregular</b> galaxies have no clear shape.",
    "Neighbors|🌠|<b>Andromeda</b> is the nearest big spiral galaxy, about 2.5 million light-years away. The Milky Way, Andromeda and many small galaxies make the <b>Local Group</b>.",
    "Black hole in the middle|⚫|Most big galaxies have a huge <b>supermassive black hole</b> in the center. Ours is called Sagittarius A*. Galaxies are held together by gravity and gather in clusters."
  ], [
    "A galaxy with curved arms is a...|spiral galaxy|🌀|The shape is like a pinwheel.|elliptical galaxy,irregular galaxy",
    "A smooth oval galaxy is...|elliptical|🥚|It looks like an egg.|spiral,irregular",
    "A galaxy with no clear shape is...|irregular|🌫️|Not regular.|spiral,elliptical",
    "The nearest large spiral galaxy to us is...|Andromeda|🌌|It is named after a princess in a Greek myth.|Orion,Cassiopeia",
    "Our galaxy and Andromeda are in the...|Local Group|👥|It is a small family of galaxies.|Solar System,Oort cloud",
    "The center of the Milky Way holds a...|supermassive black hole|⚫|It is very heavy.|giant star ball,gas planet",
    "Galaxies are held together by...|gravity|🧲|The pull between masses.|magnets,wind",
    "A big group of many galaxies is a...|galaxy cluster|🔭|The name says it all.|star cluster,solar system"
  ], "Think about the shape names and the biggest nearby galaxy."));
  a.push(L("Space telescopes", [
    "Why go to space?|🛰️|Air blurs and blocks light. That is why stars twinkle. A telescope above the atmosphere sees much clearer and can catch light that never reaches the ground.",
    "Hubble|🔭|The <b>Hubble Space Telescope</b> launched in 1990 and orbits Earth about 540 km up. It has taken sharp pictures of galaxies, nebulae and planets.",
    "Webb and others|🌟|The <b>James Webb Space Telescope</b> launched in 2021. It sees <b>infrared</b> light and sits about 1.5 million km from Earth. Other space telescopes study X-rays, like Chandra."
  ], [
    "Stars twinkle because of Earth's...|atmosphere|🌫️|Moving air blurs the light.|oceans,magnetic field",
    "A telescope in space can see clearer because it is above the...|atmosphere|🛰️|Air blurs the view.|Moon,Sun",
    "The Hubble Space Telescope was launched in...|1990|📅|It was near the end of the twentieth century.|1950,2021",
    "Hubble orbits...|Earth|🌍|It circles our planet.|the Sun alone,Mars",
    "The James Webb Space Telescope mostly sees...|infrared light|🌡️|It can see heat.|radio waves only,visible light only",
    "Webb launched in...|2021|🚀|It is newer than Hubble.|1990,1969",
    "Webb is about 1.5 million km from Earth, which is farther than the...|Moon|🌙|It is about 384,000 km away.|Sun,Alpha Centauri",
    "Which type of light does the Chandra telescope study?|X-rays|☢️|It sees high-energy light.|sound waves,microwaves from ovens"
  ], "Think about how air in the sky affects what telescopes see."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[4], a[6], a[7], a[9], a[11], a[12], a[13], a[14], a[15], a[16]]));
  a.push(MIX("Level 16 Challenge", [a[1], a[3], a[5], a[7], a[8], a[10], a[11], a[12], a[13], a[15], a[16], a[17], a[0]]));

  // ================= LEVEL 17 =================
  const b = [];
  b.push(L("Why sea level is rising", [
    "Two main causes|🌊|Global sea level is rising for two big reasons. Water gets warmer and <b>expands</b> (thermal expansion). And ice on land melts and runs into the sea.",
    "Land ice vs sea ice|🧊|Melting <b>land ice</b> from glaciers and ice sheets adds new water to the ocean. Melting <b>floating sea ice</b> barely changes sea level, just like melting ice in a full glass of water.",
    "Numbers and effects|📈|Sea level has risen about 20 cm since 1900, and the rise has sped up. Higher seas make coastal floods worse and can salt farmland."
  ], [
    "Warm water takes up more space. This is called thermal...|expansion|🌡️|Think of something growing bigger.|contraction,erosion",
    "Melting which type of ice raises sea level?|ice sheets on land|🏔️|The water was not in the ocean before.|floating sea ice,ice cubes in a drink",
    "Floating sea ice melting changes sea level...|very little|🧊|It already pushes aside its own weight in water.|a lot,by 10 meters",
    "Sea level has risen about how much since 1900?|20 cm|📏|It is centimeters so far, not meters.|20 m,2 mm",
    "Higher sea levels make coastal storms...|more flooding|🌊|More water reaches the land.|less dangerous,drier",
    "Besides melting ice, the other main cause of sea level rise is...|warming oceans expanding|🔥|Think about the water itself.|more rain only,Moon changes",
    "Glaciers that melt on land end up...|in the ocean|💧|Water flows downhill to the sea.|in the sky forever,deep in the mantle",
    "Salty seawater reaching farmland can...|harm crops|🌾|Plants do not like too much salt.|help all crops grow,turn soil to ice"
  ], "Think about both the water itself and the ice on land."));
  b.push(L("The nitrogen cycle", [
    "Air is mostly nitrogen|🌬️|About 78% of air is nitrogen gas (N₂). But plants and animals cannot use it as a gas.",
    "Fixing nitrogen|🌱|Special bacteria do <b>nitrogen fixation</b>: they turn N₂ into forms plants can use, like ammonia. Some live in lumps on roots of beans and peas, which are <b>legumes</b>. Lightning also fixes a little.",
    "Round it goes|🔄|Plants take up nitrogen from soil, animals eat plants, and <b>decomposers</b> return nitrogen to soil. Other bacteria send it back to the air. Too much fertilizer washing into water can cause algae blooms."
  ], [
    "About how much of air is nitrogen gas?|78%|🌬️|It is the biggest part of air.|21%,1%",
    "Turning N₂ into a form plants can use is...|nitrogen fixation|🧪|Bacteria do it.|photosynthesis,evaporation",
    "Which plants have nitrogen-fixing bacteria in root lumps?|beans and peas|🫛|They are called legumes.|grass and moss,cacti only",
    "Besides bacteria, which natural event also fixes some nitrogen?|lightning|⚡|It is a huge spark.|earthquakes,tides",
    "Living things that break down dead matter and return nitrogen are...|decomposers|🍄|Fungi and bacteria do this.|producers,predators",
    "Bacteria that send nitrogen back to the air are...|denitrifying bacteria|🔄|They finish the cycle.|nitrogen-fixing plants,fossil makers",
    "Too much fertilizer washing into lakes can cause...|algae blooms|🟢|Extra nutrients feed tiny green plants.|more ice,faster glaciers",
    "Animals get nitrogen mostly by...|eating plants or other animals|🍽️|They cannot take it from the air.|breathing air,drinking sea salt"
  ], "Think about how nitrogen gets from air to living things."));
  b.push(L("Ocean gyres", [
    "Surface currents|🌊|Winds push the ocean surface and the <b>Coriolis effect</b> bends the flow. The water moves in huge circles called <b>gyres</b>. There are five major ocean gyres.",
    "Direction|🔄|In the Northern Hemisphere gyres turn <b>clockwise</b>. In the Southern Hemisphere they turn <b>counterclockwise</b>. The Gulf Stream is a warm current in the North Atlantic gyre.",
    "Trash in the circle|🗑️|Floating trash gathers in the calm middle of gyres. The Great Pacific Garbage Patch is mostly tiny plastic bits called <b>microplastics</b>. It is not a solid island."
  ], [
    "A giant circling pattern of ocean currents is a...|gyre|🔄|Its name starts with G.|delta,fjord",
    "Surface currents are driven mainly by...|wind|🌬️|It pushes the top of the water.|volcanoes,glaciers",
    "In the Northern Hemisphere gyres turn...|clockwise|⏩|Like clock hands.|counterclockwise,straight",
    "In the Southern Hemisphere gyres turn...|counterclockwise|⏪|Opposite of the north.|clockwise,not at all",
    "The Gulf Stream is a...|warm current|♨️|It carries heat north.|cold glacier,tide",
    "Floating trash collects in the middle of a gyre because the water there is...|calm|🗑️|The edges move fast and the center does not.|very fast,frozen",
    "Most of the Great Pacific Garbage Patch is...|tiny plastic pieces|🧩|They are called microplastics.|one solid island,giant boats",
    "How many major ocean gyres are there?|5|🔢|There are fewer than ten.|2,12"
  ], "Think about wind, spin and large circles of water."));
  b.push(L("Salinity and ocean density", [
    "Salty seas|🧂|Ocean water is about 3.5% salt, or 35 grams per kilogram. The salt comes from rocks that rivers wash down and from underwater vents.",
    "What changes it|☀️|Evaporation leaves salt behind, so salinity goes up. Rain, rivers and melting ice add fresh water, so salinity goes down. The Dead Sea is far saltier than the ocean, and you float easily in it.",
    "Density|⚖️|Cold, salty water is <b>denser</b> and sinks. Warm, fresh water is less dense and floats on top. This helps move deep ocean water around the world."
  ], [
    "Typical ocean water is about what percent salt?|3.5%|🧂|It is more than 1% but less than 10%.|35%,0.1%",
    "Evaporation makes ocean salinity...|go up|☀️|Salt stays behind.|go down,vanish",
    "Rain and river water make salinity...|go down|🌧️|They add fresh water.|go up,stay exactly the same",
    "Which water is denser?|cold salty water|🥶|Cold and salty both add density.|warm fresh water,warm salty water",
    "Warm fresh water tends to...|float on top|🛟|It is lighter.|sink to the bottom,freeze",
    "You float easily in the Dead Sea because it is very...|salty|🧂|More salt makes denser water.|fresh,cold",
    "Ocean salt mostly comes from...|rocks and underwater vents|🪨|Rivers wash minerals down.|sugar,clouds",
    "Salinity is a measure of how much...|salt is in the water|🔬|Think of what it measures.|oxygen is in the air,heat is in the Sun"
  ], "Think about what adds or removes salt and how that changes weight."));
  b.push(L("Estuaries and salt marshes", [
    "Where river meets sea|🌾|An <b>estuary</b> is where a river flows into the sea and fresh and salty water mix. The mix is called <b>brackish</b> water.",
    "Nurseries|🐟|Estuaries are rich in food and protected from big waves, so many young fish, crabs and oysters grow there. They are called ocean <b>nurseries</b>.",
    "Marshes and mangroves|🌿|<b>Salt marshes</b> and <b>mangrove</b> forests grow along the edges. Their roots hold soil, filter water and soak up storm waves. Chesapeake Bay is a large US estuary."
  ], [
    "Where a river meets the sea and the waters mix is an...|estuary|🌊|It starts with E.|aquifer,iceberg",
    "A mix of fresh and salty water is...|brackish|🧂|It is not fully salty or fresh.|distilled,frozen",
    "Estuaries are called nurseries because...|young sea animals grow there|🐟|They are safe and full of food.|they grow plants for classrooms,they are very cold",
    "Plants with roots in salty coastal mud, often in warm places, are...|mangroves|🌴|Their roots stand in the water.|cacti,pines",
    "Salt marsh plants help the coast by...|slowing waves and holding soil|🌾|They protect the shore.|making waves bigger,melting sand",
    "Estuaries filter water by catching...|sediment and pollution|🧽|Plants and shellfish trap it.|sunlight,wind",
    "A large estuary in the US is...|Chesapeake Bay|🦀|It is on the east coast.|Death Valley,Lake Superior",
    "Estuary water is saltier than a river but less salty than...|the open ocean|🌊|It is in between.|rainwater,tap water"
  ], "Think about where freshwater and salt water meet."));
  b.push(L("Features of the seafloor", [
    "Underwater landscape|🗺️|The seafloor has mountains, valleys and plains. Near shore is the shallow <b>continental shelf</b>, then the steep <b>continental slope</b>, then the flat <b>abyssal plain</b>.",
    "Ridges and trenches|🌋|A <b>mid-ocean ridge</b> is a chain of underwater mountains where new crust forms. A <b>trench</b> is a very deep narrow valley where one plate sinks under another. The Mariana Trench is the deepest, about 11 km.",
    "Seamounts|🏔️|A <b>seamount</b> is an underwater volcano that does not reach the surface. Mid-ocean ridges make the longest mountain chain on Earth, about 65,000 km."
  ], [
    "The shallow edge of a continent under the sea is the...|continental shelf|🌊|It is close to shore.|abyssal plain,trench",
    "The flat deep ocean floor is the...|abyssal plain|🛏️|It is wide and level.|continental slope,ridge",
    "A deep narrow valley in the seafloor is a...|trench|🕳️|Plates sink there.|seamount,shelf",
    "Where new ocean crust forms there is a...|mid-ocean ridge|⛰️|Plates move apart there.|trench,delta",
    "The deepest known place in the ocean is the...|Mariana Trench|🌊|It is in the western Pacific.|Atlantic Ridge,Hudson Bay",
    "An underwater volcano that does not reach the surface is a...|seamount|🌋|Its name mentions the sea.|dune,horst",
    "The mid-ocean ridge system is...|the longest mountain chain on Earth|📏|It is about 65,000 km.|the shortest mountain chain,a single volcano",
    "The Mariana Trench is about how deep?|11 km|📐|Deeper than Mount Everest is tall.|1 km,110 km"
  ], "Think about edges, plains and where plates meet under water."));
  b.push(L("Subduction and the Ring of Fire", [
    "One plate dives|⬇️|Where an ocean plate meets another plate, the denser one sinks under it. This is <b>subduction</b>. It makes a deep trench.",
    "Why volcanoes form|🌋|The sinking plate carries water. The water lowers the melting point of the rock above it, so magma forms and rises to make a line of volcanoes called a <b>volcanic arc</b>.",
    "Ring of Fire|🔥|Many subduction zones circle the Pacific Ocean. This is the <b>Ring of Fire</b>. It has about 75% of the world's volcanoes and about 90% of earthquakes. Examples: the Andes, Japan, Alaska's Aleutian Islands."
  ], [
    "When one plate sinks under another this is called...|subduction|⬇️|It starts with S.|spreading,erosion",
    "The plate that sinks is usually the more...|dense one|⚖️|Heavier things sink.|light one,cold one only",
    "Water from the sinking plate makes rock melt more...|easily|💧|It lowers the melting point.|slowly,never",
    "A line of volcanoes above a subduction zone is a...|volcanic arc|🌋|It curves like a bow.|rift valley,delta",
    "The Ring of Fire surrounds the...|Pacific Ocean|🌏|It is the largest ocean.|Atlantic Ocean,Arctic Ocean",
    "The Ring of Fire has about what share of the world's volcanoes?|75%|📊|It is most of them.|5%,25%",
    "Which mountain chain is on a Pacific subduction zone?|the Andes|⛰️|It runs along South America.|the Alps in Switzerland,the Appalachians",
    "Subduction zones are where the deepest...|trenches form|🕳️|Seafloor plunges down.|deserts form,glaciers form"
  ], "Think about heavy plates sinking and wet rock melting."));
  b.push(L("Kinds of volcanoes", [
    "Shield volcanoes|🌋|<b>Shield volcanoes</b> are wide and gently sloped. Their lava is runny, so it flows far. Mauna Loa in Hawaii is one.",
    "Stratovolcanoes and cinder cones|🗻|<b>Stratovolcanoes</b> (composite volcanoes) are steep and built of layers of lava and ash, like Mount Fuji and Mount St. Helens. <b>Cinder cones</b> are small, steep piles of loose cinders.",
    "Thick or runny|🫕|Thick, sticky magma traps gas and erupts <b>explosively</b>. Runny magma lets gas escape, so eruptions are gentler. A <b>caldera</b> is a big bowl left when a volcano collapses."
  ], [
    "A wide, gently sloped volcano is a...|shield volcano|🛡️|Its shape is like a warrior's shield.|cinder cone,stratovolcano",
    "Mount Fuji is a...|stratovolcano|🗻|It has layers of ash and lava.|shield volcano,cinder cone",
    "A small steep volcano of loose cinders is a...|cinder cone|🔺|It is made of little pieces.|shield volcano,caldera",
    "Runny lava usually makes eruptions that are...|gentle|🫗|Gas escapes easily.|explosive,silent forever",
    "Thick sticky magma makes eruptions that are often...|explosive|💥|Gas gets trapped.|gentle,cold",
    "A large bowl left after a volcano collapses is a...|caldera|🥣|It is much bigger than a crater.|moraine,dune",
    "Hawaii's Mauna Loa is a...|shield volcano|🌺|It is huge and gently sloped.|cinder cone,stratovolcano",
    "Gas trapped in thick magma causes eruptions to be...|more violent|🎈|Pressure builds up.|calmer,colder"
  ], "Think about the shape and how runny or sticky the magma is."));
  b.push(L("Igneous rock textures", [
    "Slow or fast cooling|🪨|<b>Igneous rock</b> forms from cooled magma or lava. Magma that cools slowly underground makes <b>intrusive</b> rock with big crystals, like granite.",
    "Quick cooling|🌋|Lava that cools fast on the surface makes <b>extrusive</b> rock with tiny crystals, like basalt. If it cools very fast it can make glass, called <b>obsidian</b>.",
    "Holes|🫧|Gas bubbles trapped in lava can make rock with holes. <b>Pumice</b> is so full of holes that it can float on water. Basalt is dark and makes up most ocean floor."
  ], [
    "Rock that cools slowly underground has crystals that are...|large|🔎|Slow cooling gives time to grow.|tiny,absent",
    "Granite is an...|intrusive rock|🪨|It cooled below the ground.|extrusive rock,sedimentary rock",
    "Basalt is an...|extrusive rock|🌋|It cooled at the surface.|intrusive rock,metamorphic rock",
    "Volcanic glass is called...|obsidian|⚫|It breaks with sharp edges.|pumice,marble",
    "A rock so full of holes it can float is...|pumice|🫧|Gas bubbles made it light.|obsidian,granite",
    "Fast-cooling lava makes crystals that are...|tiny|🔬|There was not much time.|huge,enormous",
    "Most of the ocean floor is made of...|basalt|🌊|It is a dark rock.|granite,limestone",
    "Igneous rocks form when...|melted rock cools and hardens|❄️|Think of a hot liquid becoming solid.|sediment gets pressed,heat changes a rock"
  ], "Think about how long melted rock had to cool."));
  b.push(L("Soil layers", [
    "A soil profile|🌱|If you dig down you see layers called <b>horizons</b>. The top is the <b>O horizon</b> of leaves and humus. Next is the <b>A horizon</b>, or topsoil, dark and full of life.",
    "Deeper|⛏️|The <b>B horizon</b> is subsoil, with clay and minerals washed down. The <b>C horizon</b> is broken-up rock. Below is solid <b>bedrock</b>.",
    "Slow work|⏳|Soil forms very slowly, often centimeters in hundreds or thousands of years. Climate, rock type, living things, slope and time all shape it."
  ], [
    "Layers of soil are called...|horizons|🪜|Think of looking at a skyline.|sediments,strata of glass",
    "The dark, rich top mineral layer of soil is the...|A horizon (topsoil)|🌱|It is where most roots grow.|C horizon,bedrock",
    "The layer of leaves and humus on top is the...|O horizon|🍂|The letter stands for organic.|B horizon,C horizon",
    "Subsoil, where minerals and clay collect, is the...|B horizon|🟫|It is under the topsoil.|O horizon,A horizon",
    "Broken-up rock under the subsoil is the...|C horizon|🪨|Close to solid rock.|A horizon,O horizon",
    "Solid rock beneath the soil is...|bedrock|⛰️|It is the foundation.|humus,loam",
    "How fast does soil form?|very slowly|🐌|Centimeters in hundreds of years.|in a few days,in one hour",
    "Which is NOT a factor in how soil forms?|the phases of the Moon|🌙|Look for the odd one out.|climate,time"
  ], "Think of a vertical cut through the ground."));
  b.push(L("The geologic time scale", [
    "Earth's long story|⏳|Earth is about 4.6 billion years old. Scientists split its history into <b>eons</b>, <b>eras</b> and <b>periods</b>. Most of it, about 88%, is called the Precambrian.",
    "Three eras|🦖|The <b>Paleozoic</b> era is oldest (fish, early land plants). The <b>Mesozoic</b> is the age of dinosaurs (Triassic, Jurassic, Cretaceous). The <b>Cenozoic</b> began 66 million years ago and is the age of mammals. We live in it.",
    "Big moments|📅|Animals with hard shells burst onto the scene in the <b>Cambrian</b>, about 540 million years ago. Dinosaurs (except birds) died out at the end of the Cretaceous. Humans appeared only about 300,000 years ago."
  ], [
    "About how old is Earth?|4.6 billion years|🌍|Billions, not millions.|4.6 million years,460 years",
    "The oldest of these eras is the...|Paleozoic|🐟|Fish and early land plants.|Mesozoic,Cenozoic",
    "The age of dinosaurs is the...|Mesozoic era|🦖|Triassic Jurassic Cretaceous.|Paleozoic era,Cenozoic era",
    "The era we live in now is the...|Cenozoic era|🐘|It began 66 million years ago.|Mesozoic era,Paleozoic era",
    "Which period came last?|Cretaceous|🦕|It ended the age of dinosaurs.|Triassic,Jurassic",
    "Animals with hard shells became common in the...|Cambrian|🐚|About 540 million years ago.|Jurassic,Cretaceous",
    "Humans have lived on Earth for...|a tiny part of Earth's history|👤|About 300,000 years versus 4.6 billion.|most of Earth's history,since the planet formed",
    "The Cenozoic is known as the age of...|mammals|🐘|Many warm-blooded animals spread.|dinosaurs,trilobites"
  ], "Think about the order of eras from oldest to youngest."));
  b.push(L("Early Earth and first life", [
    "A hot start|🌋|Earth formed about 4.6 billion years ago as a ball of hot rock. It cooled, and rain filled the first oceans. Early air had almost no free oxygen.",
    "First life|🦠|The oldest known fossils are about 3.5 billion years old, layered mats called <b>stromatolites</b> built by microbes. Later, bacteria called <b>cyanobacteria</b> used photosynthesis and released oxygen.",
    "Oxygen builds up|🌬️|About 2.4 billion years ago oxygen began to build up in the air, the <b>Great Oxidation Event</b>. Oxygen made the ozone layer. The first animals came about 600 million years ago, and land plants about 470 million."
  ], [
    "The first oceans formed after Earth...|cooled down|🌊|Water could stay liquid.|froze solid,lost its gravity",
    "The oldest known fossils are about how old?|3.5 billion years|🦠|Early Earth, almost its start.|35 million years,3500 years",
    "Layered mats built by microbes are...|stromatolites|🪨|They look like stacked layers.|trilobites,ammonites",
    "Bacteria that made oxygen by photosynthesis are...|cyanobacteria|🟢|The name has cyan, a blue-green.|dinosaurs,mammals",
    "The big rise of oxygen in the air is the...|Great Oxidation Event|💨|It happened about 2.4 billion years ago.|Cambrian Explosion,Ice Age Boom",
    "Oxygen helped form the...|ozone layer|🛡️|It blocks harmful UV light.|Moon,magnetic poles",
    "Which came first on Earth?|microbes|🦠|They were the first life.|dinosaurs,flowers",
    "Early Earth's air had almost no...|free oxygen|🫁|We could not breathe it.|nitrogen at all,water vapor at all"
  ], "Think about the order of events in Earth's early history."));
  b.push(L("Heat inside Earth", [
    "Hot inside|🌡️|Earth's inside is hot. Some heat is left from when Earth formed. More comes from the slow <b>decay of radioactive elements</b> such as uranium inside rocks.",
    "Getting hotter with depth|⬇️|Temperature rises as you go deeper, in the crust by about 25 °C each kilometer. The core is about 5,000 °C or more, about as hot as the Sun's surface.",
    "Heat reaches the surface|♨️|Heat escapes through volcanoes, hot springs and <b>geysers</b>, which shoot hot water up. Old Faithful in Yellowstone is a famous geyser. People also use this <b>geothermal</b> heat for power."
  ], [
    "Earth's inside is hot partly because of heat left from...|its formation|🌍|It started out as a hot ball.|a recent storm,the Moon",
    "Radioactive decay inside Earth gives off...|heat|☢️|It warms the rocks.|cold,sound only",
    "As you dig deeper into Earth, temperature...|goes up|📈|Deeper means hotter.|goes down,stays frozen",
    "The core is about as hot as the Sun's...|surface|☀️|About 5,000 to 6,000 °C.|center,corona only",
    "A spring that shoots hot water into the air is a...|geyser|⛲|Old Faithful is one.|oasis,delta",
    "Old Faithful is found in...|Yellowstone|♨️|It is a national park.|Antarctica,Death Valley",
    "Using Earth's heat to make power is...|geothermal energy|⚡|Geo means Earth.|solar energy,wind energy",
    "An element that gives off heat as it decays is...|uranium|☢️|It is radioactive.|helium,silver"
  ], "Think about leftover heat and slow radioactive decay."));
  b.push(L("How rockets work", [
    "Push and push back|🚀|Newton's third law: for every action there is an equal and opposite reaction. A rocket pushes hot gas <b>down</b>, and the gas pushes the rocket <b>up</b>.",
    "No air needed|🌌|Rockets work in the vacuum of space because they push against their own exhaust, not the air. They carry their own fuel and oxygen.",
    "Getting to orbit|🛰️|To stay in orbit around Earth a spacecraft must travel about 7.8 km per second, sideways, so it keeps falling around Earth. To leave Earth for good needs about 11.2 km/s, the <b>escape velocity</b>. Rockets drop empty fuel stages to get lighter."
  ], [
    "Newton's third law says every action has an equal and...|opposite reaction|↔️|Think of push and push back.|bigger reaction,later reaction",
    "A rocket moves up because exhaust gas goes...|down|⬇️|The push is opposite.|up,sideways only",
    "A rocket can work in space because it does not need...|air to push against|🌌|It pushes against its own exhaust.|fuel,gravity to exist",
    "Speed needed to leave Earth for good is the...|escape velocity|🚀|It is about 11.2 km/s.|orbit angle,light speed",
    "A craft in low orbit is really...|falling around Earth|🌍|It moves sideways fast enough to miss.|floating with no gravity,held up by air",
    "Dropping empty fuel stages makes the rocket...|lighter|🪶|Less mass to push.|heavier,slower on purpose",
    "A rocket carries its own oxygen because space has...|no air to burn fuel|🫁|Burning needs oxygen.|too much oxygen,only water",
    "Low Earth orbit speed is about...|7.8 km/s|⏱️|Very fast, but less than escape speed.|78 km/s,0.78 km/s"
  ], "Think about a balloon letting air out."));
  b.push(L("How telescopes work", [
    "Collecting light|🔭|A telescope gathers more light than your eye so faint things look bright. A bigger opening, the <b>aperture</b>, collects more light.",
    "Lenses and mirrors|🪞|A <b>refracting</b> telescope bends light with lenses. A <b>reflecting</b> telescope uses curved mirrors. Most big research telescopes use mirrors. Galileo used a telescope in 1609.",
    "Spectra|🌈|A <b>spectroscope</b> spreads starlight into a rainbow with dark lines. Each element leaves its own lines, so scientists can tell what stars are made of."
  ], [
    "A telescope's opening that collects light is the...|aperture|⭕|A bigger one sees fainter things.|eyepiece,tripod",
    "Telescopes that use lenses are...|refracting telescopes|🔍|They bend light.|reflecting telescopes,radio telescopes",
    "Telescopes that use curved mirrors are...|reflecting telescopes|🪞|They reflect light.|refracting telescopes,hand lenses",
    "Who used a telescope to study the sky in 1609?|Galileo|👨‍🔬|An Italian scientist.|Newton,Einstein",
    "A bigger aperture lets a telescope...|collect more light|💡|Fainter objects appear.|see fewer stars,show less detail",
    "A tool that spreads light into a rainbow of colors is a...|spectroscope|🌈|It shows a spectrum.|barometer,seismometer",
    "Dark lines in starlight show which...|elements are present|🧪|Each element has its own pattern.|planets orbit it,seasons it has",
    "Most big research telescopes use...|mirrors|🪞|Large lenses are too heavy.|giant magnifying glasses,paper tubes only"
  ], "Think about gathering and bending or reflecting light."));
  b.push(L("Dwarf planets and far-off space", [
    "Dwarf planets|🪐|A <b>dwarf planet</b> orbits the Sun and is round, but has not cleared other objects from its path. Pluto was moved to this group in 2006. Others are Eris, Ceres, Haumea and Makemake.",
    "The Kuiper Belt|🧊|The <b>Kuiper Belt</b> is a ring of icy bodies beyond Neptune, from about 30 to 50 AU. An <b>AU</b> is the Earth-Sun distance. Pluto lives here. New Horizons flew past Pluto in 2015.",
    "The Oort Cloud|☄️|The <b>Oort Cloud</b> is a huge, far-off shell of icy objects around the Sun. Comets that take thousands of years to orbit are thought to come from there. Ceres is a dwarf planet in the asteroid belt."
  ], [
    "Pluto became a dwarf planet in...|2006|📅|It was in the 2000s.|1930,1990",
    "A dwarf planet has not cleared its...|orbit|🛣️|Other objects share its path.|rings,moons",
    "A ring of icy bodies beyond Neptune is the...|Kuiper Belt|🧊|Pluto is in it.|asteroid belt,Van Allen belt",
    "One AU is the distance from Earth to the...|Sun|☀️|An astronomical unit.|Moon,Mars",
    "Which spacecraft flew past Pluto in 2015?|New Horizons|🚀|Its name looks forward.|Voyager 2,Cassini",
    "The far-off shell of icy objects around the Sun is the...|Oort Cloud|☁️|The Dutch astronomer who proposed it has the same name.|Kuiper Belt,Milky Way",
    "Ceres is a dwarf planet in the...|asteroid belt|🪨|Between Mars and Jupiter.|Kuiper Belt,Oort Cloud",
    "Which is a dwarf planet?|Eris|🪐|It is beyond Pluto's orbit on average.|Mars,Venus"
  ], "Think about the Sun's far-off neighbors beyond Neptune."));
  b.push(L("Asteroids and planetary defense", [
    "Rocky leftovers|🪨|<b>Asteroids</b> are rocky leftovers from the solar system's start. Most live in the asteroid belt between Mars and Jupiter. The biggest object there is Ceres.",
    "Near-Earth objects|🌍|Some asteroids pass close to Earth. They are called <b>near-Earth objects</b>. Telescopes watch the sky to find and track them early.",
    "Nudging one|🛰️|In 2022 NASA's <b>DART</b> spacecraft crashed into the small asteroid moon Dimorphos and changed its orbit. This showed that we could nudge an asteroid away. A huge impact about 66 million years ago left Chicxulub Crater."
  ], [
    "Most asteroids orbit between Mars and...|Jupiter|🪐|The belt is before the gas giants.|Venus,Earth",
    "A rocky leftover from the solar system's start is an...|asteroid|🪨|It is smaller than a planet.|comet only,moon of Earth",
    "Asteroids that pass close to Earth are called...|near-Earth objects|🌍|Their name tells you.|dwarf planets,gas giants",
    "Why do telescopes track near-Earth objects?|To find and predict them early|🔭|Warning gives time.|To paint them,To make them bigger",
    "NASA's DART mission in 2022 tested...|nudging an asteroid|🎯|It crashed into one on purpose.|landing on Mars,visiting the Sun",
    "DART hit the asteroid moon...|Dimorphos|🌑|A small body orbiting a bigger one.|Phobos,Titan",
    "A huge impact about 66 million years ago left the...|Chicxulub Crater|💥|It is near Mexico.|Grand Canyon,Great Lakes",
    "Most small space rocks entering the atmosphere...|burn up|🔥|They get very hot from air friction.|reach the ground whole,bounce off",
  ], "Think about space rocks and keeping watch."));
  b.push(L("Mapping from space and sea", [
    "GPS|📡|<b>GPS</b> uses signals from satellites. A receiver needs signals from at least 4 satellites to find where it is. Each satellite sends its time, and the delay shows how far away it is.",
    "Remote sensing|🛰️|<b>Remote sensing</b> means studying Earth from far away using satellites and aircraft. It tracks forests, storms and ice. <b>LiDAR</b> uses laser pulses to map land height.",
    "Sonar|🌊|<b>Sonar</b> maps the seafloor with sound. The ship sends a ping and times its echo. Depth = speed of sound × time ÷ 2. Sound travels about 1,500 meters per second in seawater."
  ], [
    "GPS stands for Global...|Positioning System|📡|It finds position.|Painting Software,Planet Sensor",
    "A GPS receiver needs signals from at least how many satellites?|4|🛰️|More than 3.|1,2",
    "Studying Earth from far away with satellites is...|remote sensing|🛰️|Sensing from a distance.|core drilling,field digging",
    "LiDAR maps land height using...|laser pulses|🔦|Light is sent out and timed.|sound pings,radio music",
    "Sonar maps the seafloor using...|sound|🔊|It sends a ping.|lasers,magnets",
    "In sonar, we divide the echo time by 2 because the sound goes...|down and back up|↕️|The sound makes a round trip.|only up,through the Moon",
    "A sonar echo returns after 4 seconds at 1,500 m/s. The seafloor is how deep?|3000 m|📏|1,500 × 4 ÷ 2.|6000 m,1500 m",
    "A sonar echo returns after 2 seconds at 1,500 m/s. The seafloor is how deep?|1500 m|📏|1,500 × 2 ÷ 2.|3000 m,750 m"
  ], "Think about signals that travel and come back."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[4], b[5], b[7], b[8], b[9], b[10], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 17 Challenge", [b[0], b[2], b[4], b[6], b[8], b[10], b[11], b[12], b[13], b[15], b[16], b[17], b[1], b[5]]));

  // ================= LEVEL 18 =================
  const c = [];
  c.push(L("How forecasts are made", [
    "Data in, forecast out|📡|Weather stations, balloons, radar, ships and satellites measure the air all over the world. Supercomputers use math models of the atmosphere to predict what happens next.",
    "Why forecasts miss|🦋|Air is a <b>chaotic</b> system: tiny errors grow over time. A forecast for tomorrow is quite good. A forecast for 10 days away is much less sure. Forecasters often run many models and compare them.",
    "Chances|🌧️|A forecast of \"40% chance of rain\" means that in similar conditions rain happens at a point about 4 times in 10. <b>Weather</b> is short-term; <b>climate</b> is the long-term average."
  ], [
    "Computers predict weather using math models of the...|atmosphere|💻|Think of the air around Earth.|Moon,mantle",
    "Which forecast is usually most accurate?|tomorrow's|📅|Short-term is easier.|10 days from now,next month",
    "Small errors that grow over time make the air a...|chaotic system|🦋|Tiny changes grow big.|solid object,stable crystal",
    "Which is NOT used to collect weather data?|seismographs for rock|📉|Look for something not about the air.|satellites,weather balloons",
    "A 40% chance of rain means rain happens in about how many of 10 similar days?|4|🌧️|40% of 10.|40,10",
    "Long-term average weather is called...|climate|🌍|Not just today.|forecast,front",
    "Forecasters run many models and compare them to see...|how sure they can be|📊|If they agree, it is more likely.|which model is prettiest,what to name the storm",
    "Radar helps by showing where...|rain is falling|📡|It bounces signals off drops.|volcanoes are,rocks are"
  ], "Think about collecting data, then using math to look ahead."));
  c.push(L("Watersheds", [
    "A drainage area|🏞️|A <b>watershed</b> (drainage basin) is all the land where rain and snowmelt flow to the same river or lake. A high ridge, called a <b>divide</b>, separates one watershed from the next.",
    "Streams and rivers|🌊|Small streams join bigger ones. A stream that joins a bigger river is a <b>tributary</b>. The Mississippi River watershed drains about 40% of the lower 48 US states. The Amazon has the largest basin on Earth.",
    "Runoff|🏙️|Water that flows over the ground is <b>runoff</b>. Pavement and roofs, called impervious surfaces, do not let water soak in, so cities have more runoff and flooding. Plants and soil soak water in (<b>infiltration</b>)."
  ], [
    "All the land that drains to one river is a...|watershed|🏞️|Rain flows to the same place.|aquifer,delta",
    "A ridge that separates two watersheds is a...|divide|⛰️|It splits water in two directions.|tributary,estuary",
    "A stream that flows into a larger river is a...|tributary|🌿|Its name sounds like a gift or payment.|distributary,gyre",
    "Which river basin is the largest in the world?|Amazon|🌎|It is in South America.|Nile,Colorado",
    "Water flowing over the surface is called...|runoff|🏃|It runs off.|infiltration,recharge",
    "Water soaking down into soil is...|infiltration|🌱|It filters in.|runoff,evaporation",
    "Pavement increases runoff because it...|does not let water soak in|🏙️|It is impervious.|makes more rain,absorbs water well",
    "Cities with lots of pavement have a higher risk of...|flash flooding|🌊|Water rushes off quickly.|drought only,glaciers"
  ], "Think about where each raindrop goes downhill."));
  c.push(L("Floods and flood risk", [
    "Types of floods|🌊|A <b>flash flood</b> comes fast after heavy rain. A <b>river flood</b> rises slowly as rivers overflow. A <b>storm surge</b> is seawater pushed ashore by a hurricane.",
    "100-year flood|📈|A \"100-year flood\" has a 1% chance (1 in 100) of happening in any given year. It does not mean one flood every 100 years. Maps show flood-risk zones on <b>floodplains</b>.",
    "Staying safe|🚫|Never walk or drive through floodwater. Just 15 cm of moving water can knock a person down and 60 cm can carry away a car. Move to higher ground."
  ], [
    "A fast flood after heavy rain is a...|flash flood|⚡|The word flash means sudden.|storm surge,drought",
    "Seawater pushed onto land by a hurricane is a...|storm surge|🌀|A surge is a big rush.|flash flood,tide pool",
    "A 100-year flood has what chance in any one year?|1%|📊|1 in 100.|100%,10%",
    "A \"100-year flood\" can happen...|in back-to-back years|🔁|It is just a chance each year.|only once per century,never twice in a lifetime",
    "Flat land beside a river that floods is a...|floodplain|🌾|Water spreads out there.|plateau,moraine",
    "How deep must moving water be to carry away a car?|60 cm|🚗|Under a meter.|6 cm,6 m",
    "If a road is flooded you should...|turn around|↩️|Do not drive through.|drive through quickly,walk through it",
    "Levees are built to...|hold back river water|🧱|They are long walls.|make rain,warm the water"
  ], "Think about how fast the water comes and how likely it is each year."));
  c.push(L("Drought and desertification", [
    "Kinds of drought|🏜️|A <b>drought</b> is a long time with less water than usual. Little rain is a <b>meteorological</b> drought. Dry soil that hurts crops is an <b>agricultural</b> drought. Low rivers and lakes is a <b>hydrological</b> drought.",
    "Dust Bowl|🌪️|In the 1930s a long drought hit the US Great Plains. Plowed-up, bare soil blew away in huge dust storms. Many farms failed. Farmers later learned better ways, like planting cover crops and windbreaks.",
    "Desertification|🌵|<b>Desertification</b> is when dry land loses its plants and turns desert-like, because of drought, overgrazing, or cutting down trees. The Sahel in Africa is at risk."
  ], [
    "A long time with much less water than usual is a...|drought|🏜️|The opposite of a flood.|monsoon,hurricane",
    "Low rainfall causing a drought is a...|meteorological drought|🌦️|It is about weather.|agricultural drought,hydrological drought",
    "Dry soil that hurts crops is an...|agricultural drought|🌽|Farms suffer.|hydrological drought,meteorological drought",
    "The 1930s dust storms on the US Great Plains were called the...|Dust Bowl|🌪️|A bowl of dust.|Sand Sea,Big Burn",
    "The Dust Bowl was worsened by bare, plowed soil that...|blew away|💨|Nothing held it down.|froze solid,turned to rock",
    "Planting grass, windbreaks and cover crops helps by...|holding soil in place|🌱|Roots keep soil from blowing.|making the air hotter,blocking all rain",
    "Land turning dry and desert-like is called...|desertification|🌵|Becoming desert.|deforestation,afforestation",
    "Which can cause desertification?|overgrazing|🐄|Too many animals eating the plants.|too many glaciers,more volcanoes"
  ], "Think about too little water and bare soil."));
  c.push(L("Sustainability", [
    "Using resources wisely|♻️|<b>Sustainability</b> means meeting today's needs without using up resources future people will need. <b>Renewable</b> resources can be replaced. <b>Nonrenewable</b> ones cannot, at least not quickly.",
    "Sustainable yield|🐟|A <b>sustainable yield</b> is taking no more than nature can replace each year. <b>Overfishing</b> breaks that rule and can crash fish populations. Forests can be replanted: <b>reforestation</b>.",
    "Trade-offs|⚖️|Choices have costs and benefits. People compare them, and the three Rs help: <b>reduce</b>, <b>reuse</b>, <b>recycle</b>. Reducing use is best."
  ], [
    "Meeting needs without using up resources for the future is...|sustainability|♻️|It starts with S.|inflation,erosion",
    "Which is a nonrenewable resource?|oil|🛢️|It takes millions of years to form.|wind,sunlight",
    "Taking no more fish than nature replaces is a...|sustainable yield|🐟|Balanced with replacement.|big catch,bottom trawl",
    "Catching fish faster than they can reproduce is...|overfishing|🎣|Too much.|farming,fish ladders",
    "Planting trees where forests were cut is...|reforestation|🌳|Re means again.|deforestation,desertification",
    "Which of the three Rs is considered best?|reduce|📉|Use less to begin with.|recycle,reuse after breaking",
    "Comparing costs and benefits of a choice is thinking about...|trade-offs|⚖️|Every choice has both.|coincidences,luck",
    "Which is a renewable resource?|wind|🌬️|It keeps coming.|coal,natural gas"
  ], "Think about using resources at a rate nature can keep up with."));
  c.push(L("Pumping groundwater", [
    "Taking too much|🚰|If people pump water out of an aquifer faster than rain refills it (recharge), the water table drops. Wells can run dry and have to be dug deeper.",
    "Sinking ground|⬇️|When water is removed, the sand and clay can compact and the ground sinks. This is <b>subsidence</b>. In California's San Joaquin Valley some land has sunk by several meters.",
    "Coasts and big aquifers|🌊|Near the sea, over-pumping can let salt water move into an aquifer (<b>saltwater intrusion</b>). The big Ogallala Aquifer under the Great Plains is being drained faster than it refills."
  ], [
    "Pumping water faster than recharge makes the water table...|drop|📉|Water leaves faster than it comes.|rise,turn to ice",
    "The ground sinking after water is removed is...|subsidence|⬇️|It starts with S.|uplift,deposition",
    "Salt water moving into a freshwater aquifer is...|saltwater intrusion|🌊|It happens near the coast.|freshwater recharge,tidal pull",
    "Which aquifer lies under the Great Plains?|Ogallala|🌾|Say OH-gah-LAH-lah.|Mississippian,Appalachian",
    "A well may run dry when the water table...|falls below its bottom|🚰|Water is no longer reached.|rises above it,turns salty forever",
    "Water soaking down to refill aquifers is called...|recharge|🔄|It refills them.|runoff,subsidence",
    "Ways to help aquifers include...|using water more carefully|💧|Take less.|pumping more,paving the recharge area",
    "Sinking land can damage...|roads and buildings|🏚️|They rest on the ground.|clouds,the Moon"
  ], "Think about taking out more than nature puts back."));
  c.push(L("How fast do plates move?", [
    "Slow but sure|🐢|Plates move about 2 to 10 cm per year, a bit like fingernails grow. Speed = distance ÷ time, so distance = speed × time.",
    "Big distances|🧮|1 km = 100,000 cm. So 5 cm per year for 1 million years is 5,000,000 cm, which is 50 km. Over tens of millions of years oceans can open or close.",
    "Real examples|🌊|The Atlantic Ocean is widening by about 2.5 cm each year. The Pacific plate under Hawaii moves about 7 to 10 cm a year. Faster plate movement means more change in the same time."
  ], [
    "Plates typically move about how fast?|a few cm per year|🐢|About as fast as fingernails grow.|a few meters per second,a few km per hour",
    "A plate moves 5 cm per year. In 1 million years it moves...|50 km|🧮|5,000,000 cm ÷ 100,000.|5 km,500 km",
    "A plate moves 2 cm per year. In 10 million years it moves...|200 km|🧮|20,000,000 cm ÷ 100,000.|20 km,2000 km",
    "A plate moves 4 cm per year. In 50 million years it moves...|2000 km|🧮|200,000,000 cm ÷ 100,000.|200 km,20 km",
    "How many cm are in 1 km?|100000|📏|1000 m × 100 cm.|1000,10000",
    "Distance equals speed multiplied by...|time|⏱️|Use the speed formula.|mass,density",
    "The Atlantic Ocean is widening by about...|2.5 cm a year|🌊|About a fingernail's growth.|25 m a year,2.5 km a year",
    "In the same time, a plate moving 10 cm a year goes how far compared with one at 2 cm a year?|5 times farther|✖️|10 ÷ 2.|2 times farther,10 times farther"
  ], "Think speed times time, and remember 1 km is 100,000 cm."));
  c.push(L("Why rocks weather fast or slow", [
    "More surface, faster|🪨|Weathering works on surfaces. Breaking a rock into small pieces gives more <b>surface area</b>, so it weathers faster. Powder weathers faster than a boulder.",
    "Climate and rock type|🌧️|Warm, wet places weather rock fastest. Freezing and thawing cracks rock (<b>frost wedging</b>). Limestone dissolves easily in weak acids, but quartz is very hard to weather.",
    "Living things and rust|🌱|Plant roots pry cracks wider. Iron in rocks combines with oxygen and rusts, called <b>oxidation</b>. Rainwater is slightly acidic, which causes chemical weathering."
  ], [
    "A powdered rock weathers faster than a boulder because it has more...|surface area|📐|More of it touches air and water.|mass,color",
    "Which climate weathers rock the fastest?|warm and wet|🌴|Heat and water speed up reactions.|cold and dry,hot and bone dry",
    "Water freezing in cracks and breaking rock is...|frost wedging|🧊|Ice pushes like a wedge.|oxidation,deposition",
    "Which rock dissolves easily in weak acid?|limestone|🪨|Acid fizzes on it.|quartz,granite",
    "Which mineral is very resistant to weathering?|quartz|💎|It is hard.|calcite,gypsum",
    "Iron in rock reacting with oxygen and rusting is...|oxidation|🟤|Oxygen is involved.|frost wedging,abrasion",
    "Plant roots weather rock by...|prying cracks wider|🌿|They grow into gaps.|melting it,painting it",
    "Rainwater causes chemical weathering because it is slightly...|acidic|🧪|It can dissolve some minerals.|salty,sweet"
  ], "Think about how much rock is exposed to air, water and heat."));
  c.push(L("Mining and its effects", [
    "Getting materials|⛏️|We mine metals, stone, coal and minerals for buildings, cars and phones. <b>Surface mining</b> removes soil and rock from the top. <b>Underground mining</b> uses tunnels.",
    "Effects|🏞️|Mining can destroy habitats and create piles of waste rock called <b>tailings</b>. Water running through some mines can turn acidic (<b>acid mine drainage</b>) and harm streams.",
    "Doing better|♻️|<b>Reclamation</b> restores mined land with soil and plants. Recycling metals saves energy; recycling aluminum uses about 95% less energy than making it from ore."
  ], [
    "Digging materials out of the ground is...|mining|⛏️|Metals and coal come from it.|farming,fishing",
    "Removing top soil and rock to reach a resource is...|surface mining|🏔️|Done at the top.|underground mining,deep drilling",
    "Mining with tunnels is...|underground mining|🚇|Below the ground.|surface mining,strip planting",
    "Waste rock left from mining is called...|tailings|🪨|They trail after the good ore.|sediment cores,moraines",
    "Acidic water from old mines can harm...|streams and fish|🐟|It flows away from the mine.|volcanoes,satellites",
    "Restoring mined land with soil and plants is...|reclamation|🌱|It claims the land back.|extraction,subduction",
    "Recycling aluminum saves about what share of energy?|95%|♻️|Almost all of it.|5%,50%",
    "Which is a way to reduce the need for mining?|recycling metals|♻️|Use again.|throwing metals away,making more waste"
  ], "Think about digging up resources and what is left behind."));
  c.push(L("Measuring distance with stars", [
    "Two kinds of brightness|💡|<b>Luminosity</b> is how much light a star really gives off. <b>Apparent brightness</b> is how bright it looks from Earth. A far, powerful star can look dim.",
    "Pulsing stars|⭐|<b>Cepheid variable</b> stars brighten and dim in a steady rhythm. In 1912 Henrietta Leavitt found that the longer the pulse, the greater the true luminosity. Compare that with how bright it looks, and you can get the distance.",
    "Distance ladder|🪜|Parallax works for nearby stars. Cepheids reach farther galaxies. Exploding stars called <b>Type Ia supernovae</b> are bright enough to measure to very far galaxies. Twice as far looks 4 times dimmer."
  ], [
    "How much light a star really gives off is its...|luminosity|💡|True power.|apparent brightness,parallax",
    "How bright a star looks from Earth is its...|apparent brightness|👀|It depends on distance.|luminosity,mass",
    "Stars that pulse in a steady rhythm are called...|Cepheid variables|💓|Leavitt studied them.|red dwarfs,neutron stars",
    "Who found the period-luminosity link for Cepheids?|Henrietta Leavitt|👩‍🔬|She worked at Harvard in 1912.|Galileo,Newton",
    "A star twice as far away looks how much dimmer?|4 times|📉|Use the inverse square rule.|2 times,8 times",
    "A star 3 times farther away looks how much dimmer?|9 times|📉|Square the 3.|3 times,6 times",
    "Type Ia supernovae help measure distances to...|very far galaxies|🌌|They are super bright.|nearby planets,Earth's clouds",
    "Parallax works best for stars that are...|nearby|📐|Tiny shifts are easier to see.|in far galaxies,invisible"
  ], "Think about real power versus how dim something looks."));
  c.push(L("Dark matter and dark energy", [
    "Something unseen|🌌|Stars at the edges of galaxies orbit too fast for the matter we can see. Something we cannot see adds gravity. We call it <b>dark matter</b>. It gives off no light.",
    "Dark energy|🚀|Scientists found in 1998 that the universe's expansion is speeding up. We call the cause <b>dark energy</b>. We do not yet know what it is.",
    "The recipe|🥧|About 5% of the universe is ordinary matter (stars, planets, us), about 27% is dark matter, and about 68% is dark energy. Mass bends light, called <b>gravitational lensing</b>, which helps map dark matter."
  ], [
    "Matter that gives off no light but adds gravity is...|dark matter|⚫|Its name says it is hidden.|black hole dust only,star dust",
    "Stars in galaxies orbit faster than expected because of extra...|gravity|🧲|Mass pulls on them.|wind,heat",
    "The cause of the universe's speeding-up expansion is called...|dark energy|🚀|It pushes things apart.|dark matter,black light",
    "The speeding-up expansion was found in about...|1998|📅|The late 1990s.|1798,2018",
    "About how much of the universe is ordinary matter?|5%|🥧|A small slice.|68%,27%",
    "Dark energy makes up about...|68%|🥧|The biggest slice.|5%,27%",
    "Bending of light by mass is called gravitational...|lensing|🔭|Like a lens.|erosion,spinning",
    "Which statement is true?|Scientists do not know what dark matter is|❓|It is still being studied.|Dark matter is just black paint,We have caught dark matter in jars"
  ], "Think about invisible influences on stars and galaxies."));
  c.push(L("Habitable zones and the search for life", [
    "The Goldilocks zone|🌍|The <b>habitable zone</b> is the ring around a star where it is not too hot or too cold for liquid water on a planet's surface. Earth is in the Sun's zone.",
    "Needs for life|💧|Life as we know it needs liquid water, energy and the right chemicals. Some tiny life, <b>extremophiles</b>, lives in very hot, cold or salty places on Earth.",
    "Where to look|🔍|Moons like Europa and Enceladus may have oceans under their ice. Rovers search Mars for signs of old life. Telescopes look for <b>biosignatures</b>, such as certain gases, in exoplanet air."
  ], [
    "The ring around a star where liquid water is possible is the...|habitable zone|🌍|Not too hot or too cold.|Kuiper Belt,magnetic zone",
    "Life as we know it needs...|liquid water|💧|One of the main needs.|plenty of lava,no energy",
    "Tiny life in very extreme places on Earth is called...|extremophiles|🦠|They love extremes.|dinosaurs,grazers",
    "Which moon may have an ocean under its ice?|Europa|🌙|It orbits Jupiter.|Phobos,Our Moon",
    "Another moon with a hidden ocean is...|Enceladus|🪐|It orbits Saturn.|Deimos,Ganymede",
    "Mars rovers search for signs of...|past life|🤖|Old water and old microbes.|volcanoes in the sky,ice cream",
    "Signs of life that telescopes might detect are...|biosignatures|🔎|Bio means life.|moonquakes,sunspots",
    "A planet too close to its star would likely be...|too hot for liquid water|🔥|The oceans would boil off.|too cold for any water,perfect for oceans"
  ], "Think about the just-right distance from a star for liquid water."));
  c.push(L("Famous space probes", [
    "Voyagers|🛰️|<b>Voyager 1</b> and <b>2</b> launched in 1977. They flew past the giant planets. Voyager 1 entered interstellar space in 2012. Voyager 2 is the only craft to visit Uranus and Neptune.",
    "Orbiters and landers|🪐|<b>Cassini</b> studied Saturn from 2004 to 2017. <b>Juno</b> orbits Jupiter. <b>Curiosity</b> (2012) and <b>Perseverance</b> (2021) are Mars rovers. <b>Parker Solar Probe</b> flies through the Sun's atmosphere.",
    "Looking ahead|🚀|<b>New Horizons</b> visited Pluto in 2015. <b>Artemis</b> missions plan to return people to the Moon. Each mission asks a question and brings home data."
  ], [
    "The Voyager probes launched in...|1977|📅|The 1970s.|1957,2007",
    "Which craft is the only one to visit Uranus and Neptune?|Voyager 2|🛰️|Part of a pair.|Voyager 1,Cassini",
    "Which probe studied Saturn until 2017?|Cassini|🪐|It ended by diving into Saturn.|Juno,Parker Solar Probe",
    "Which probe orbits Jupiter?|Juno|🪐|It is named after a Roman goddess.|Cassini,Curiosity",
    "Which of these is a Mars rover?|Perseverance|🤖|It landed in 2021.|Juno,Voyager",
    "Which probe flies through the Sun's atmosphere?|Parker Solar Probe|☀️|Its name mentions the Sun.|New Horizons,Cassini",
    "New Horizons visited which world in 2015?|Pluto|🪐|A dwarf planet.|Saturn,Mercury",
    "NASA's Artemis program plans to return people to the...|Moon|🌙|Like Apollo before it.|Sun,Venus"
  ], "Think about the planet or object each mission is named for visiting."));
  c.push(L("Planet atmospheres", [
    "Why atmospheres differ|🪐|A planet keeps gases if its gravity is strong and it is not too hot. Small, hot worlds lose gas into space. Mercury has almost no atmosphere.",
    "A tour|🌫️|Earth: mostly nitrogen and oxygen. Mars: very thin, mostly carbon dioxide. Venus: very thick carbon dioxide, with about 90 times Earth's pressure. Titan, a moon of Saturn, has thick nitrogen air.",
    "Giants|🌀|Jupiter and Saturn are mostly hydrogen and helium. Venus's thick air traps heat, making it the hottest planet at about 465 °C, hotter than Mercury."
  ], [
    "Mercury has almost no atmosphere because it is small and...|hot|☀️|The Sun is close.|too cold,too wet",
    "Mars's thin atmosphere is mostly...|carbon dioxide|🔴|Not nitrogen or oxygen.|oxygen,helium",
    "Venus's atmosphere is very...|thick|🟡|About 90 times Earth's pressure.|thin,nonexistent",
    "The hottest planet is...|Venus|🔥|Its air traps heat.|Mercury,Mars",
    "Venus is about how hot on its surface?|465 °C|🌡️|Hot enough to melt lead.|65 °C,15 °C",
    "Jupiter's air is mostly hydrogen and...|helium|🎈|The second lightest element.|oxygen,iron",
    "Saturn's moon with a thick nitrogen atmosphere is...|Titan|🌙|It is the second largest moon in the solar system.|Europa,Ganymede",
    "A planet holds an atmosphere better when its gravity is...|strong|🧲|It pulls gas close.|weak,absent"
  ], "Think about gravity, temperature and the gases that stay."));
  c.push(L("Volcanoes and climate", [
    "Ash and gas|🌋|Big eruptions throw ash and sulfur gases high into the air. The sulfur forms tiny droplets, called <b>aerosols</b>, that reflect sunlight, so Earth can cool for a year or two.",
    "Famous examples|🌍|After Mount Pinatubo erupted in 1991, Earth cooled about 0.5 °C. Tambora's eruption in 1815 led to 1816, the \"year without a summer\", with cold, crop-killing weather.",
    "Not the cause of recent warming|🏭|Volcanoes also release carbon dioxide, but people release about 100 times more each year. Over millions of years, volcanoes put CO₂ back into the air, as part of the carbon cycle."
  ], [
    "Volcanic sulfur droplets in the air are called...|aerosols|🌫️|Tiny particles in the sky.|moraines,magma",
    "Volcanic aerosols make Earth temporarily...|cooler|❄️|They reflect sunlight.|hotter,magnetic",
    "Mount Pinatubo erupted in...|1991|📅|The late twentieth century.|1815,2015",
    "Pinatubo cooled Earth by about...|0.5 °C|🌡️|A small amount.|5 °C,15 °C",
    "The 1816 \"year without a summer\" followed the eruption of...|Tambora|🌋|In Indonesia in 1815.|Pinatubo,Mauna Loa",
    "Compared with volcanoes, people release carbon dioxide...|about 100 times more each year|🏭|Humans emit far more.|about 100 times less,about the same",
    "Volcanic ash and gas high in the air can reduce...|sunlight reaching the ground|☁️|They block light.|ocean salt,the Moon's gravity",
    "Volcanoes return carbon to the air as part of the...|carbon cycle|🔄|Carbon moves around Earth's spheres.|rock cycle only,water cycle only"
  ], "Think about what volcanic particles do to sunlight."));
  c.push(L("The two poles compared", [
    "Arctic and Antarctic|🧊|The <b>Arctic</b> is an ocean covered with floating sea ice, surrounded by land. <b>Antarctica</b> is a continent buried under an ice sheet about 2 km thick on average.",
    "Extremes|🥶|Antarctica is the coldest, driest and windiest continent. The lowest air temperature ever measured, about -89 °C, was there. Under the 1959 Antarctic Treaty, it is kept for peaceful science.",
    "Life and light|🐧|Polar bears live in the Arctic and penguins live in the south. Both poles have months of 24-hour daylight in summer and darkness in winter. Arctic sea ice is shrinking."
  ], [
    "The Arctic is mainly an...|ocean with sea ice|🧊|Water with floating ice.|continent of rock,desert of sand",
    "Antarctica is a...|continent|🌍|Land under ice.|ocean,lake",
    "Antarctica's ice sheet is about how thick on average?|2 km|📏|Thicker than a mountain climb.|20 m,200 km",
    "The coldest continent is...|Antarctica|🥶|Almost all ice.|Asia,Australia",
    "Antarctica is kept for peaceful science under the...|Antarctic Treaty|📜|Signed in 1959.|Paris Rules,Polar Pass",
    "Polar bears live in the...|Arctic|🐻‍❄️|The northern polar region.|Antarctic,Sahara",
    "Most penguin species live in the...|Southern Hemisphere|🐧|Near Antarctica.|North Pole,Sahara",
    "Summer at a pole has long periods of...|24-hour daylight|☀️|The Sun does not set.|constant darkness,twice-daily sunsets"
  ], "Think about ocean versus land at the top and bottom of Earth."));
  c.push(L("Biodiversity", [
    "Variety of life|🦋|<b>Biodiversity</b> is the variety of living things in a place. Healthy ecosystems have many kinds of plants, animals and microbes, which helps them bounce back from change.",
    "Threats|⚠️|The biggest threats are <b>habitat loss</b>, <b>invasive species</b> (non-native species that spread and crowd others out), pollution and climate change. A species with very few left is <b>endangered</b>.",
    "Protection|🛡️|A <b>keystone species</b> affects many others, like sea otters that protect kelp forests. Protected areas, wildlife corridors and restoring habitat help species recover."
  ], [
    "The variety of living things in a place is...|biodiversity|🦋|Bio means life.|bioenergy,biome only",
    "The biggest threat to many species is...|habitat loss|🏞️|Losing their homes.|too much food,full moons",
    "A non-native species that spreads and crowds out others is...|invasive|🐍|It invades.|endemic,extinct",
    "A species with very few left is...|endangered|⚠️|Close to being lost.|abundant,common",
    "A species that affects many others in its ecosystem is a...|keystone species|🗝️|Like the top stone in an arch.|pet species,nameless species",
    "Sea otters help kelp forests by eating...|sea urchins|🦦|Urchins eat the kelp.|kelp,whales",
    "Wildlife corridors help by...|connecting habitats|🛤️|Animals can move between areas.|blocking roads for plants,drying rivers",
    "More biodiversity usually makes an ecosystem...|more stable|🌳|It can bounce back.|more fragile,empty"
  ], "Think about how many kinds of living things share a place."));
  c.push(L("Meteorites", [
    "Rocks from space|☄️|A <b>meteoroid</b> is a space rock. It becomes a <b>meteor</b> when it burns up and makes a streak of light. If a piece lands on Earth it is a <b>meteorite</b>.",
    "Three kinds|🪨|<b>Stony</b> meteorites are the most common. <b>Iron</b> meteorites come from the metal cores of broken asteroids. <b>Stony-iron</b> ones are a mix. Some stony meteorites, called chondrites, hold tiny round grains from the early solar system.",
    "Age clues|⏳|Radiometric dating of meteorites shows they are about 4.56 billion years old. This is our best age for the solar system. Earth is a bit younger at about 4.54 billion years."
  ], [
    "A space rock traveling through space is a...|meteoroid|☄️|Before it enters the air.|meteorite,meteor shower",
    "The streak of light in the sky is a...|meteor|🌠|The burning part.|meteoroid,meteorite",
    "A piece that lands on Earth is a...|meteorite|🪨|Found on the ground.|meteor,meteoroid",
    "The most common kind of meteorite is...|stony|🪨|Mostly rock.|iron,stony-iron",
    "Iron meteorites came from the...|cores of broken asteroids|🔩|Metal cores.|crusts of comets,oceans of Mars",
    "Meteorites are about how old?|4.56 billion years|⏳|About as old as the solar system.|4.56 million years,456 years",
    "Meteorites help scientists learn about the...|early solar system|🔬|They are very old.|weather tomorrow,future climate",
    "Which tool tells the age of meteorites?|radiometric dating|☢️|It uses decaying atoms.|a ruler,a thermometer"
  ], "Think about what a rock is called before, during and after its fall."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[4], c[5], c[6], c[8], c[9], c[10], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 18 Challenge", [c[1], c[3], c[5], c[6], c[7], c[9], c[11], c[12], c[14], c[15], c[16], c[17], c[0], c[2]]));

  Object.assign(EARTH_LEVELS, { 16: a, 17: b, 18: c });
})();
