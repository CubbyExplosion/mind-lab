// Mind Lab Earth & Space, levels 4-6 (extension file). 20 lessons per level.
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

  // ================= LEVEL 4 =================
  const d = [];
  d.push(L("Weather tools at work", [
    "Measuring weather|🌡️|Scientists use tools to measure the weather. A <b>thermometer</b> measures temperature. A <b>rain gauge</b> measures how much rain falls.",
    "Wind tools|🧭|A <b>wind vane</b> shows which way the wind blows. An <b>anemometer</b> measures how fast the wind blows.",
    "Air pressure|📊|A <b>barometer</b> measures air pressure. Changes in air pressure help us guess the weather."
  ], [
    "Which tool measures how much rain fell?|a rain gauge|🌧️||a thermometer,a wind vane",
    "Which tool shows the wind direction?|a wind vane|🐓||a rain gauge,a ruler",
    "Which tool measures wind speed?|an anemometer|💨||a thermometer,a barometer",
    "Which tool measures temperature?|a thermometer|🌡️||a rain gauge,an anemometer",
    "Which tool measures air pressure?|a barometer|📊||a wind vane,a rain gauge",
    "A weather scientist is called a...|meteorologist|🌦️||geologist,astronomer",
    "You want to know how hot it is. Use a...|thermometer|🌡️||rain gauge,wind vane",
    "You want to know which way the wind blows. Use a...|wind vane|🧭||thermometer,rain gauge"
  ], "Each weather tool measures one thing."));
  d.push(L("Reading a thermometer", [
    "Temperature|🌡️|Temperature tells how hot or cold something is. We measure it in degrees. The mark is °.",
    "Freezing point|🧊|Water freezes at 0 degrees Celsius (0°C), which is 32 degrees Fahrenheit (32°F).",
    "Hot and warm|☀️|A warm summer day might be 30°C (86°F). A cold winter day may be below 0°C. When the liquid in a thermometer goes up, it is getting hotter."
  ], [
    "At what Celsius temperature does water freeze?|0|🧊|It is the smallest whole number you can count.|10,100",
    "At what Fahrenheit temperature does water freeze?|32|🧊||0,100",
    "When the liquid in a thermometer goes up, it is getting...|hotter|🌡️||colder,darker",
    "When the liquid in a thermometer goes down, it is getting...|colder|🌡️||hotter,louder",
    "Which temperature is coldest?|-5°C|❄️||20°C,30°C",
    "Which temperature is hottest?|35°C|🥵||5°C,15°C",
    "Which is most likely a snowy day?|-3°C|⛄||25°C,35°C",
    "Which is most likely a day at the beach?|30°C|🏖️||0°C,-10°C"
  ], "Bigger number means hotter. Smaller number means colder."));
  d.push(L("Kinds of clouds", [
    "Cloud shapes|☁️|Scientists name clouds by their shapes. <b>Cumulus</b> clouds are puffy like cotton balls.",
    "Flat and wispy|🌫️|<b>Stratus</b> clouds are flat gray blankets. <b>Cirrus</b> clouds are thin and wispy and very high up.",
    "Storm clouds|⛈️|<b>Cumulonimbus</b> clouds are tall, dark storm clouds. They bring thunder and heavy rain."
  ], [
    "Which clouds are puffy like cotton balls?|cumulus|☁️||stratus,cirrus",
    "Which clouds are flat gray blankets?|stratus|🌫️||cumulus,cirrus",
    "Which clouds are thin and wispy?|cirrus|🌤️||cumulus,stratus",
    "Which clouds bring thunderstorms?|cumulonimbus|⛈️||cirrus,stratus",
    "Which cloud is high up and feathery?|cirrus|🌤️||cumulonimbus,stratus",
    "A sky full of one gray blanket is made of...|stratus clouds|🌫️||cirrus clouds,cumulus clouds",
    "Fair-weather puffy clouds are...|cumulus|⛅||cumulonimbus,stratus",
    "A tall dark cloud with lightning is...|cumulonimbus|⚡||cirrus,cumulus"
  ], "Think about the shape of the cloud."));
  d.push(L("Thunder and lightning", [
    "Lightning|⚡|Lightning is a giant spark of electricity in the sky. It is very hot and very bright.",
    "Thunder|🔊|Thunder is the loud boom made by lightning. Light travels faster than sound, so we see the flash first and hear the boom after.",
    "Stay safe|🏠|When you hear thunder, go inside. Stay away from tall trees, water and open fields."
  ], [
    "What is lightning?|a spark of electricity|⚡||a kind of wind,a big raindrop",
    "What is thunder?|the sound lightning makes|🔊||a flash of light,a kind of cloud",
    "Which do we notice first?|the lightning flash|⚡||the thunder boom",
    "Why do we see lightning before we hear thunder?|light travels faster than sound|💡||thunder is shy,sound is quicker",
    "When you hear thunder, you should...|go inside|🏠||go swimming,stand under a tall tree",
    "Which is NOT a safe place in a lightning storm?|a swimming pool|🏊||inside a house,inside a car",
    "Thunder and lightning come from...|storm clouds|⛈️||fog,rainbows",
    "A big storm cloud is called a...|cumulonimbus|⛈️||cirrus,stratus"
  ], "Light is faster than sound."));
  d.push(L("Hurricanes and tornadoes", [
    "Hurricanes|🌀|A <b>hurricane</b> is a huge spinning storm that forms over warm ocean water. It has an <b>eye</b> in the middle that is calm.",
    "Tornadoes|🌪️|A <b>tornado</b> is a spinning funnel of wind that touches the ground. It is smaller than a hurricane but can be very strong.",
    "Be ready|📻|Weather scientists give warnings. Listen to grown-ups and go to a safe place when a warning comes."
  ], [
    "Where do hurricanes form?|over warm ocean water|🌊||over snowy hills,in a desert",
    "What is the calm middle of a hurricane called?|the eye|👁️||the nose,the wing",
    "A spinning funnel of wind that touches the ground is a...|tornado|🌪️||hurricane,rainbow",
    "A huge spinning storm over the ocean is a...|hurricane|🌀||tornado,blizzard",
    "Which is bigger?|a hurricane|🌀||a tornado",
    "What should you do when there is a storm warning?|listen to grown-ups|📻||ignore it,go outside to look",
    "Who warns us about storms?|weather scientists|🌦️||bakers,painters",
    "A tornado is a spinning...|funnel of wind|🌪️||pool of water,block of ice"
  ], "One storm is over the ocean. One touches the land."));
  d.push(L("Layers of the Earth", [
    "Three layers|🌍|Earth has three main layers. The thin top layer is the <b>crust</b>. We live on it.",
    "Hot inside|🔥|Under the crust is the <b>mantle</b>. It is thick and very hot. In the middle is the <b>core</b>.",
    "The core|⚪|The core has two parts. The outer core is liquid. The inner core is solid and the hottest part of all."
  ], [
    "What is the top layer of Earth called?|the crust|🌍||the mantle,the core",
    "What is the middle layer called?|the mantle|🔥||the crust,the core",
    "What is the center of Earth called?|the core|⚪||the crust,the mantle",
    "Which layer do we live on?|the crust|🏠||the mantle,the core",
    "Which layer is the thinnest?|the crust|🍎||the mantle,the core",
    "Which is the hottest layer?|the core|🔥||the crust,the mantle",
    "How many main layers does Earth have?|three|3️⃣||two,six",
    "Earth is like a peach. The skin is like the...|crust|🍑||core,mantle"
  ], "Crust, mantle, core: from the outside to the inside."));
  d.push(L("Mountains, valleys and plains", [
    "Tall land|⛰️|A <b>mountain</b> is very high land with a peak at the top. A group of mountains is a mountain range.",
    "Low land|🏞️|A <b>valley</b> is low land between mountains or hills. A river often flows through it.",
    "Flat land|🌾|A <b>plain</b> is wide, flat land. Farmers grow lots of crops on plains. A <b>plateau</b> is flat land that is high up."
  ], [
    "Very high land with a peak is a...|mountain|⛰️||valley,plain",
    "Low land between mountains is a...|valley|🏞️||peak,plateau",
    "Wide flat land is a...|plain|🌾||mountain,canyon",
    "Flat land that is high up is a...|plateau|🏜️||valley,island",
    "The top of a mountain is the...|peak|🏔️||valley,delta",
    "A group of mountains is a...|mountain range|⛰️||valley floor,desert",
    "Where do farmers often grow lots of crops?|on plains|🚜||on mountain peaks,in the ocean",
    "A river often flows through a...|valley|🏞️||peak,glacier top"
  ], "Think high, low or flat."));
  d.push(L("Rivers, lakes and oceans", [
    "Moving water|🏞️|A <b>river</b> is moving water that flows downhill. It starts at a <b>source</b> and ends where it meets a lake or the sea.",
    "Still water|🌊|A <b>lake</b> is a large body of water with land all around it. Oceans are the biggest bodies of water.",
    "Salt and fresh|🧂|Ocean water is salty. Most rivers and lakes have fresh water that is not salty."
  ], [
    "Water that flows downhill in a long line is a...|river|🏞️||lake,pond",
    "A large body of water with land all around is a...|lake|🏞️||river,ocean",
    "Which water is salty?|the ocean|🌊||most rivers,most lakes",
    "Which water is fresh and not salty?|a lake|💧||the ocean,the sea",
    "Where does a river start?|at its source|⛰️||at the sea,at a desert",
    "Rivers flow...|downhill|⬇️||uphill,in circles",
    "What are the biggest bodies of water?|oceans|🌊||ponds,lakes",
    "Where does a river often end?|in the sea|🌊||on a mountain top,in the sky"
  ], "Rivers move. Lakes stay in one place."));
  d.push(L("Erosion", [
    "Breaking rock|🪨|Wind, water and ice slowly break rocks into tiny pieces. This is called <b>weathering</b>.",
    "Moving it|💨|<b>Erosion</b> is when wind or water carries those pieces away. A river can carve a deep valley over a very long time.",
    "Slow change|⏳|Erosion takes thousands or millions of years. The Grand Canyon was carved by the Colorado River."
  ], [
    "What is it called when wind or water carries pieces of rock away?|erosion|💨||freezing,melting",
    "What can slowly carve a valley?|a river|🏞️||a cloud,a rainbow",
    "Erosion happens...|very slowly|⏳||in one minute,in one second",
    "Which can cause erosion?|wind|💨||moonlight,music",
    "Which can cause erosion?|flowing water|🌊||a shadow,a rainbow",
    "Breaking rock into tiny pieces is called...|weathering|🪨||gravity,planting",
    "What carved the Grand Canyon?|a river|🏜️||a bulldozer,a storm in one day",
    "Sand on a beach comes from...|rocks broken into tiny bits|🏖️||melted ice cream,dried clouds"
  ], "Erosion is a slow change over a very long time."));
  d.push(L("Three kinds of rock", [
    "Igneous|🌋|<b>Igneous</b> rock forms when hot melted rock (magma or lava) cools and gets hard. Granite is igneous.",
    "Sedimentary|🏖️|<b>Sedimentary</b> rock forms when tiny bits of sand and mud are pressed into layers. Sandstone and limestone are sedimentary.",
    "Metamorphic|🔥|<b>Metamorphic</b> rock is rock that has been changed by great heat and pressure. Marble is metamorphic."
  ], [
    "Which rock forms from cooled lava?|igneous|🌋||sedimentary,metamorphic",
    "Which rock forms from pressed layers of sand and mud?|sedimentary|🏖️||igneous,metamorphic",
    "Which rock is changed by heat and pressure?|metamorphic|🔥||igneous,sedimentary",
    "Granite is a kind of...|igneous rock|🪨||sedimentary rock,metamorphic rock",
    "Sandstone is a kind of...|sedimentary rock|🏜️||igneous rock,metamorphic rock",
    "Marble is a kind of...|metamorphic rock|🏛️||igneous rock,sedimentary rock",
    "Which rock is often found with fossils?|sedimentary|🦴||igneous,metamorphic",
    "Melted rock underground is called...|magma|🌋||sand,ice"
  ], "Think about how each rock is made."));
  d.push(L("Minerals and gems", [
    "What is a mineral?|💎|A <b>mineral</b> is a solid thing found in nature that was never alive. Rocks are made of minerals.",
    "Hard and soft|⛏️|Scientists test how hard a mineral is by scratching it. <b>Talc</b> is the softest. <b>Diamond</b> is the hardest.",
    "Gems|💍|Gems are shiny, pretty minerals. Quartz, ruby and emerald are gems or gem-like minerals."
  ], [
    "Which mineral is the hardest?|diamond|💎||talc,chalk",
    "Which mineral is the softest?|talc|🧂||diamond,quartz",
    "Rocks are made of...|minerals|🪨||plastic,clouds",
    "A mineral was never...|alive|🌱||hard,old",
    "How do scientists test how hard a mineral is?|by scratching it|⛏️||by weighing it only,by smelling it",
    "A harder mineral can scratch a...|softer mineral|⛏️||harder mineral only,cloud",
    "Which is a shiny pretty mineral?|a gem|💍||a puddle,a feather",
    "Table salt crystals are found in nature as the mineral...|halite|🧂||talc,diamond"
  ], "Hard minerals scratch soft ones."));
  d.push(L("Why we have day and night", [
    "Earth spins|🌍|Earth spins like a top. It takes about 24 hours to spin around once. That is one day.",
    "Facing the Sun|☀️🌙|The side of Earth facing the Sun has day. The side facing away from the Sun has night.",
    "Rising and setting|🌅|The Sun seems to rise in the east and set in the west. It is really Earth that is turning."
  ], [
    "How long does Earth take to spin around once?|24 hours|⏰||1 hour,one year",
    "Why do we have day and night?|Earth spins|🌍||the Sun turns off,the Moon covers the Sun",
    "The side of Earth facing the Sun has...|day|☀️||night,winter",
    "The side of Earth facing away from the Sun has...|night|🌙||day,summer",
    "In which direction does the Sun seem to rise?|east|🌅||west,south",
    "In which direction does the Sun seem to set?|west|🌇||east,north",
    "Does the Sun really move across the sky?|no. Earth turns|🌍||yes it circles us,yes it jumps",
    "One full spin of Earth is one...|day|⏰||month,year"
  ], "Earth turns all the time."));
  d.push(L("Shadows and the Sun's path", [
    "Making shadows|🧍|A shadow forms when something blocks the light. The Sun makes shadows outside.",
    "Long and short|📏|In the morning and evening the Sun is low, so shadows are long. At noon the Sun is high, so shadows are short.",
    "Direction|↔️|A shadow always points away from the light. If the Sun is on your left, your shadow falls on your right."
  ], [
    "When are shadows the shortest?|at noon|🕛||in the morning,in the evening",
    "When are shadows long?|in the morning and evening|🌇||at noon,never",
    "At noon the Sun is...|high in the sky|☀️||low in the sky,under us",
    "A shadow forms when something blocks...|light|💡||sound,wind",
    "A shadow points...|away from the light|🧍||toward the light,straight up",
    "The Sun is on your left. Your shadow is on your...|right|↔️||left,head",
    "When the Sun is low, shadows are...|long|🌅||short,gone",
    "Which makes a shadow?|a tree in sunlight|🌳||a clear window,a bright room with no objects"
  ], "Low Sun makes long shadows."));
  d.push(L("Phases of the Moon", [
    "Moon shapes|🌙|The Moon does not make its own light. We see the part that the Sun lights up. The shape we see is the Moon's <b>phase</b>.",
    "The cycle|🌑🌓🌕|The phases go: new moon (dark), crescent, half, full moon (round and bright), then back again.",
    "A month|📅|It takes about one month to go through all the phases."
  ], [
    "Which phase is round and bright?|full moon|🌕||new moon,crescent",
    "Which phase looks dark?|new moon|🌑||full moon,half moon",
    "Which phase is a thin curved sliver?|crescent|🌙||full moon,new moon",
    "How long to go through all the phases?|about one month|📅||about one day,about ten years",
    "Does the Moon make its own light?|no|🌙||yes",
    "The Moon shines because it reflects light from the...|Sun|☀️||Earth lamps,stars",
    "What comes after a full moon, going toward new?|the Moon gets smaller|🌖||it turns blue,it stops",
    "The different shapes of the Moon are called its...|phases|🌓||seasons,tides"
  ], "The Moon only reflects sunlight."));
  d.push(L("The inner planets", [
    "Four rocky planets|🪐|The four planets closest to the Sun are Mercury, Venus, Earth and Mars. They are small and made of rock.",
    "Hot and red|🔴|<b>Mercury</b> is the smallest and closest to the Sun. <b>Venus</b> is the hottest planet. <b>Mars</b> is called the Red Planet.",
    "Our home|🌍|<b>Earth</b> is the only planet we know that has life, liquid water and air we can breathe."
  ], [
    "Which planet is closest to the Sun?|Mercury|☿||Mars,Venus",
    "Which planet is the hottest?|Venus|🔥||Mercury,Mars",
    "Which planet is called the Red Planet?|Mars|🔴||Venus,Earth",
    "Which planet has life that we know of?|Earth|🌍||Mars,Venus",
    "Which is the smallest of the inner planets?|Mercury|🪐||Earth,Venus",
    "The inner planets are made mostly of...|rock|🪨||gas,ice cream",
    "Which of these is NOT an inner planet?|Jupiter|🪐||Earth,Mars",
    "How many inner planets are there?|four|4️⃣||two,eight"
  ], "Mercury, Venus, Earth, Mars."));
  d.push(L("The outer planets", [
    "Four giants|🪐|Jupiter, Saturn, Uranus and Neptune are far from the Sun. They are much bigger than Earth.",
    "Gas giants|🌪️|<b>Jupiter</b> is the biggest planet. <b>Saturn</b> has beautiful rings. Both are mostly gas.",
    "Cold and far|🥶|<b>Uranus</b> and <b>Neptune</b> are very cold. Neptune is the farthest planet from the Sun."
  ], [
    "Which planet is the biggest?|Jupiter|🪐||Earth,Mars",
    "Which planet is famous for its rings?|Saturn|💍||Mars,Mercury",
    "Which planet is farthest from the Sun?|Neptune|🥶||Jupiter,Mars",
    "Which of these is an outer planet?|Uranus|🪐||Venus,Mercury",
    "The outer planets are much ___ than Earth.|bigger|🪐||smaller,warmer",
    "Jupiter and Saturn are mostly made of...|gas|☁️||rock,wood",
    "How many outer planets are there?|four|4️⃣||two,seven",
    "Which planet is very cold and far away?|Neptune|🥶||Mercury,Venus"
  ], "Big and far from the Sun."));
  d.push(L("Our Sun and other stars", [
    "A star|⭐|The Sun is a star: a giant ball of hot glowing gas. It makes its own light and heat.",
    "Far away|🔭|Other stars are much farther away than the Sun. That is why they look like tiny dots at night.",
    "Big Sun|🌞|The Sun is so big that more than a million Earths could fit inside it!"
  ], [
    "What is the Sun?|a star|🌞||a planet,a moon",
    "The Sun is made of hot glowing...|gas|🔥||rock,water",
    "Why do other stars look tiny?|they are very far away|🔭||they are very small ants,they are paper",
    "Which makes its own light?|a star|⭐||a planet,a moon",
    "Which is the closest star to Earth?|the Sun|🌞||the Moon,Polaris",
    "Which of these is NOT a star?|the Moon|🌙||the Sun,Polaris",
    "The Sun gives Earth light and...|heat|🔥||ice,rain",
    "We see stars most easily at...|night|🌌||noon,lunch"
  ], "A star makes its own light."));
  d.push(L("Reduce, reuse, recycle", [
    "Three Rs|♻️|<b>Reduce</b> means use less. <b>Reuse</b> means use things again. <b>Recycle</b> means turn old things into new things.",
    "What we recycle|📦|Paper, cardboard, glass, metal cans and some plastics can be recycled.",
    "Caring for Earth|🌍|Picking up litter, saving water and planting trees help keep our planet clean and healthy."
  ], [
    "Using less is called...|reduce|⬇️||reuse,recycle",
    "Using something again is called...|reuse|🔁||reduce,recycle",
    "Turning old things into new things is called...|recycle|♻️||reduce,reuse",
    "Which can be recycled?|a glass jar|🫙||a banana peel only,a smile",
    "Which is a way to reuse?|use a jar to hold pencils|✏️||throw the jar in a river,break the jar",
    "Which is a way to reduce?|turn off lights you do not need|💡||leave the tap running,buy more things",
    "Where do we put trash?|in a trash can|🗑️||on the ground,in a river",
    "Planting trees helps...|clean the air|🌳||make more litter,use up water"
  ], "The three Rs help the Earth."));
  d.push(MIX("Mixed practice", [d[0], d[2], d[4], d[5], d[9], d[11], d[13], d[14]]));
  d.push(MIX("Level 4 Challenge", [d[1], d[3], d[6], d[7], d[8], d[10], d[12], d[15], d[16], d[17]]));

  // ================= LEVEL 5 =================
  const e = [];
  e.push(L("Weather or climate?", [
    "Weather|🌦️|<b>Weather</b> is what the air is like outside right now or today: sunny, rainy, windy or snowy.",
    "Climate|🌍|<b>Climate</b> is the usual weather in a place over many years. A desert has a hot, dry climate.",
    "Telling them apart|🔍|If it describes one day, it is weather. If it describes what a place is like most years, it is climate."
  ], [
    "It rained at my school today. Is that weather or climate?|weather|🌧️||climate",
    "Deserts are hot and dry most years. Weather or climate?|climate|🏜️||weather",
    "Tomorrow will be cloudy. Weather or climate?|weather|☁️||climate",
    "The North Pole is cold all year. Weather or climate?|climate|🧊||weather",
    "Weather can change in...|a few hours|⏰||a million years,never",
    "Climate is the usual weather over...|many years|📅||one hour,one minute",
    "Rainforests are warm and wet most years. That is their...|climate|🌴||weather today,forecast",
    "It is windy this afternoon. That is the...|weather|💨||climate,biome"
  ], "Weather is short. Climate is long."));
  e.push(L("Wind and air", [
    "Air moves|💨|Wind is moving air. Air moves because the Sun heats some places more than others.",
    "Warm and cool|🌡️|Warm air is lighter, so it rises. Cool air is heavier, so it sinks and flows in to take its place. That flow is wind.",
    "Sea breeze|🏖️|In the day the land warms faster than the sea. Cool air from the sea moves toward the land. That is a sea breeze."
  ], [
    "What does warm air do?|rises|⬆️||sinks,freezes",
    "What does cool air do?|sinks|⬇️||rises,burns",
    "What is wind?|moving air|💨||moving water,falling rain",
    "What heats the air unevenly?|the Sun|☀️||the Moon,the stars",
    "On a sunny day at the beach the breeze blows from...|the sea to the land|🏖️||the land to the sea,the sky to the sea",
    "Which warms up faster in the day?|land|🏝️||the sea",
    "A hot air balloon rises because warm air is...|lighter|🎈||heavier,colder",
    "Wind moves in to take the place of rising...|warm air|⬆️||rain,sand"
  ], "Warm air goes up. Cool air moves in."));
  e.push(L("The water cycle words", [
    "Evaporation|☀️|The Sun heats water. It turns into invisible gas called water vapor and rises. This is <b>evaporation</b>.",
    "Condensation|☁️|High up the vapor cools and turns back into tiny drops that make clouds. This is <b>condensation</b>.",
    "Precipitation|🌧️|When the drops get big, they fall as rain, snow, sleet or hail. This is <b>precipitation</b>. Then water <b>collects</b> in rivers, lakes and oceans."
  ], [
    "Liquid water turning into a gas is called...|evaporation|☀️||condensation,precipitation",
    "Water vapor cooling into drops is called...|condensation|☁️||evaporation,precipitation",
    "Rain, snow, sleet and hail are called...|precipitation|🌧️||evaporation,condensation",
    "What energy source drives evaporation?|the Sun|☀️||the Moon,the wind only",
    "Clouds are made by...|condensation|☁️||evaporation,collection",
    "Water vapor is water as a...|gas|💨||solid,rock",
    "After it falls, water collects in...|rivers lakes and oceans|🌊||the sky,clouds",
    "Which step comes right before precipitation?|condensation|☁️||evaporation,collection"
  ], "Water goes up, makes clouds, then falls."));
  e.push(L("Biomes and climate", [
    "Different places|🌍|Climate makes different homes for plants and animals. A big area with a certain climate is called a <b>biome</b>.",
    "Wet and dry|🌴🏜️|A <b>rainforest</b> is warm and gets lots of rain. A <b>desert</b> gets very little rain.",
    "Cold places|🧊|The <b>tundra</b> is very cold with frozen ground and no tall trees. <b>Grasslands</b> have lots of grass and few trees."
  ], [
    "Which biome gets very little rain?|desert|🏜️||rainforest,ocean",
    "Which biome is warm and very rainy?|rainforest|🌴||desert,tundra",
    "Which biome is very cold with frozen ground?|tundra|🧊||rainforest,grassland",
    "Which biome has lots of grass and few trees?|grassland|🌾||tundra,rainforest",
    "A big area with a certain climate is a...|biome|🌍||planet,tide",
    "Cactus plants grow well in a...|desert|🌵||tundra,ocean",
    "Which has the tallest trees and most rain?|rainforest|🌳||desert,tundra",
    "A polar bear lives in cold places like the...|Arctic|🐻‍❄️||desert,rainforest"
  ], "Think about rain and temperature."));
  e.push(L("Layers of the air", [
    "The atmosphere|🌍|The <b>atmosphere</b> is the blanket of air around Earth. It has layers.",
    "Low layers|☁️|We live in the <b>troposphere</b>, the lowest layer. All our weather happens here. Above it is the <b>stratosphere</b>, which has the ozone layer that blocks harmful sunlight.",
    "High layers|🌠|In the <b>mesosphere</b> space rocks burn up and make shooting stars. Higher still are the thermosphere and the exosphere, where air fades into space."
  ], [
    "What is the blanket of air around Earth called?|the atmosphere|🌍||the mantle,the ocean",
    "In which layer do we live and have weather?|troposphere|☁️||stratosphere,mesosphere",
    "Which layer has the ozone layer?|stratosphere|🛡️||troposphere,exosphere",
    "Where do many space rocks burn up?|mesosphere|🌠||troposphere,crust",
    "Which layer is the lowest?|troposphere|⬇️||exosphere,thermosphere",
    "The ozone layer blocks harmful...|sunlight|☀️||rain,sound",
    "How many main layers does the atmosphere have?|five|5️⃣||two,eleven",
    "Air gets thinner as you go...|higher|⬆️||lower,underground"
  ], "The lowest layer has our weather."));
  e.push(L("Moving plates", [
    "Pieces of crust|🧩|Earth's crust is broken into big pieces called <b>plates</b>. They fit together like a puzzle.",
    "Slow movers|🐌|The plates move very slowly, about as fast as your fingernails grow. They float on the hot mantle.",
    "What it does|⛰️|When plates push together, mountains can rise. When they slide past each other, earthquakes can happen."
  ], [
    "Earth's crust is broken into big pieces called...|plates|🧩||bowls,tiles of glass",
    "The plates move...|very slowly|🐌||very fast,never",
    "The plates float on the...|mantle|🔥||ocean,atmosphere",
    "When plates push together, what can rise?|mountains|⛰️||clouds,oceans",
    "What can happen when plates slide past each other?|an earthquake|🌎||a rainbow,snow",
    "Plates fit together like a...|puzzle|🧩||ladder,sandwich",
    "The study of plate movement is part of...|Earth science|🌍||cooking,music",
    "How fast do plates move?|about as fast as fingernails grow|💅||like a race car,like a plane"
  ], "Plates are pieces of crust."));
  e.push(L("Volcanoes and earthquakes", [
    "Volcano parts|🌋|A volcano has a <b>vent</b>, a <b>crater</b> at the top and a <b>magma chamber</b> underground. Magma that comes out is called <b>lava</b>.",
    "Earthquakes|📈|An earthquake is the ground shaking when plates move. A <b>seismograph</b> measures earthquakes.",
    "Ring of Fire|🔥|Many volcanoes and earthquakes happen around the Pacific Ocean. It is called the Ring of Fire."
  ], [
    "Melted rock underground is called...|magma|🌋||lava lamp,sand",
    "Melted rock that flows out of a volcano is called...|lava|🌋||ice,mud",
    "The bowl-shaped opening at the top of a volcano is the...|crater|🌋||valley,delta",
    "What measures earthquakes?|a seismograph|📈||a thermometer,a ruler",
    "What is an earthquake?|the ground shaking|🌎||a big wind,a big wave only",
    "The Ring of Fire is around the...|Pacific Ocean|🌊||Sahara Desert,Arctic",
    "Where is magma stored in a volcano?|in the magma chamber|🌋||in the crater cloud,in the sky",
    "What should you do in an earthquake?|drop cover and hold on|🛡️||run outside fast,stand by windows"
  ], "A volcano is a mountain with a hole for hot rock."));
  e.push(L("Weathering, erosion, deposition", [
    "Break down|🪨|<b>Weathering</b> breaks rock into smaller pieces. Water that freezes in a crack can split a rock.",
    "Carry away|🌊|<b>Erosion</b> moves the pieces. Wind, rivers, waves and glaciers do this.",
    "Drop off|🏝️|<b>Deposition</b> is when moving water or wind slows down and drops the pieces. Rivers build a <b>delta</b> where they meet the sea."
  ], [
    "Breaking rock into pieces is...|weathering|🪨||erosion,deposition",
    "Carrying pieces away is...|erosion|💨||weathering,deposition",
    "Dropping pieces in a new place is...|deposition|🏝️||weathering,erosion",
    "Water freezing in a crack can...|split a rock|🧊||melt a rock into lava,paint a rock",
    "A delta is built by...|deposition|🏝️||weathering,rain",
    "Where does a river often build a delta?|where it meets the sea|🌊||at its source,on a mountain top",
    "Which is NOT part of changing the land?|painting|🎨||weathering,erosion",
    "When a river slows down, it...|drops sand and mud|🏞️||speeds up forever,freezes the sea"
  ], "Break, carry, drop."));
  e.push(L("Energy from the Earth", [
    "Fossil fuels|🛢️|Coal, oil and natural gas are <b>fossil fuels</b>. They formed from plants and tiny animals that lived long ago.",
    "Running out|⏳|Fossil fuels take millions of years to form, so we can run out. They are <b>nonrenewable</b>. Burning them can make the air dirty.",
    "Renewable|☀️💨|<b>Renewable</b> energy never runs out. Sunlight, wind and moving water are renewable."
  ], [
    "Which is a fossil fuel?|coal|⚫||wind,sunlight",
    "Which is a fossil fuel?|oil|🛢️||water power,sunlight",
    "Which is renewable?|wind|💨||coal,oil",
    "Which is renewable?|sunlight|☀️||natural gas,coal",
    "Fossil fuels formed from ancient...|plants and animals|🌿||robots,toys",
    "Fossil fuels are nonrenewable because they...|take millions of years to form|⏳||are free,are cold",
    "Burning fossil fuels can make the air...|dirty|🏭||cleaner,sweeter",
    "Wind turbines make power from...|wind|🌬️||oil,coal"
  ], "Renewable means it does not run out."));
  e.push(L("How fossils form", [
    "A fossil|🦴|A <b>fossil</b> is the remains or print of a plant or animal that lived long, long ago.",
    "Turning to stone|⏳|When an animal died, mud and sand could cover it. Over millions of years its hard parts turned to stone.",
    "Finding fossils|🔍|Fossils are found in sedimentary rock. A scientist who studies fossils is a <b>paleontologist</b>."
  ], [
    "What is a fossil?|remains of something that lived long ago|🦴||a new toy,a type of rain",
    "Fossils are usually found in...|sedimentary rock|🪨||lava,ice cream",
    "Who studies fossils?|a paleontologist|🔍||a meteorologist,a chef",
    "How long do fossils take to form?|millions of years|⏳||one day,one hour",
    "Which is a fossil?|a dinosaur bone turned to stone|🦖||a shell from today's beach,a plastic toy",
    "Fossils tell us about...|life long ago|🦕||tomorrow's weather,the future",
    "What covers a dead animal so it can become a fossil?|mud and sand|🏖️||ice cream,leaves only",
    "A footprint left in stone long ago is a...|fossil|👣||volcano,star"
  ], "Fossils are very old."));
  e.push(L("Earth's tilt and seasons", [
    "A tilted Earth|🌍|Earth is tilted like a leaning top as it travels around the Sun. The tilt, not the distance, makes the seasons.",
    "Summer and winter|☀️❄️|When the top half of Earth tilts toward the Sun, it is summer there. Days are long and warm. Half a year later, it tilts away and it is winter.",
    "Opposite seasons|🔄|When it is summer in the north, it is winter in the south. Near the equator it is warm all year."
  ], [
    "What causes the seasons?|Earth's tilt|🌍||Earth's color,Moon's pull",
    "When the north tilts toward the Sun, the north has...|summer|☀️||winter,night forever",
    "When the north tilts away from the Sun, the north has...|winter|❄️||summer,autumn only",
    "When it is summer in the north, the south has...|winter|🔄||summer,spring",
    "Where is it warm all year?|near the equator|🌴||at the poles,on mountain peaks",
    "Summer days are...|long|🌞||short,missing",
    "Winter days are...|short|🌑||long,warm",
    "Earth goes around the Sun once in one...|year|📅||week,day"
  ], "Tilt toward the Sun means warm."));
  e.push(L("Hemispheres and poles", [
    "The equator|🌐|The <b>equator</b> is an imaginary line around the middle of Earth. It splits Earth into the Northern and Southern <b>Hemispheres</b>.",
    "The poles|🧊|The <b>North Pole</b> is the top of Earth. The <b>South Pole</b> is the bottom. Both are freezing cold.",
    "East and west|🧭|Another line, the <b>prime meridian</b>, splits Earth into the Eastern and Western Hemispheres."
  ], [
    "What line goes around the middle of Earth?|the equator|🌐||the prime meridian,the date line only",
    "Half of Earth is called a...|hemisphere|🌍||continent,ocean",
    "What is at the top of Earth?|the North Pole|🧊||the equator,the South Pole",
    "What is at the bottom of Earth?|the South Pole|🐧||the North Pole,the equator",
    "Places near the equator are usually...|hot|🌴||freezing,snowy all year",
    "Places near the poles are usually...|cold|🥶||hot,rainy rainforests",
    "The equator splits Earth into north and...|south|🌐||east,west",
    "What splits Earth into east and west?|the prime meridian|🧭||the equator,the poles"
  ], "The equator is the middle line."));
  e.push(L("Maps and directions", [
    "Compass|🧭|A compass shows four main directions: north, east, south and west. Remember: Never Eat Soggy Waffles, going clockwise.",
    "Map parts|🗺️|A map has a <b>title</b>, a <b>compass rose</b> that shows directions and a <b>key</b> that explains the symbols.",
    "Between|↗️|Northeast is between north and east. Southwest is between south and west."
  ], [
    "The four main directions are north, south, east and...|west|🧭||up,down",
    "On a map, north is usually at the...|top|⬆️||bottom,left",
    "The part of a map that explains the symbols is the...|key|🔑||title,edge",
    "The part of a map that shows directions is the...|compass rose|🧭||key,title",
    "The direction opposite north is...|south|⬇️||east,west",
    "The direction opposite east is...|west|⬅️||north,south",
    "Between north and east is...|northeast|↗️||southwest,southeast",
    "A compass needle points to...|north|🧭||east,the Sun"
  ], "N, E, S, W go clockwise."));
  e.push(L("Eclipses", [
    "Solar eclipse|🌑☀️|In a <b>solar eclipse</b> the Moon passes between the Sun and Earth. It blocks some or all of the Sun's light for a short time.",
    "Safety|🕶️|Never look right at the Sun, even during an eclipse. Only special eclipse glasses are safe.",
    "Lunar eclipse|🌕|In a <b>lunar eclipse</b> Earth is between the Sun and the Moon. Earth's shadow falls on the Moon and it looks dim or reddish."
  ], [
    "In a solar eclipse, what blocks the Sun?|the Moon|🌑||a cloud,Mars",
    "In a lunar eclipse, whose shadow falls on the Moon?|Earth's|🌍||Mars's,the Sun's",
    "Is it safe to look at the Sun during an eclipse without special glasses?|no|🕶️||yes",
    "An eclipse of the Sun is a...|solar eclipse|☀️||lunar eclipse,full eclipse",
    "An eclipse of the Moon is a...|lunar eclipse|🌕||solar eclipse,rain eclipse",
    "In a solar eclipse, the Moon is between the Sun and...|Earth|🌍||Mars,Venus",
    "In a lunar eclipse, Earth is between the Sun and the...|Moon|🌕||stars,Mars",
    "Eclipses last for a...|short time|⏰||whole year,hundred years"
  ], "Eclipse means one space object blocks light."));
  e.push(L("Tides", [
    "Rising and falling|🌊|The ocean water rises and falls along the shore. These are the <b>tides</b>.",
    "Moon pull|🌙|The Moon's gravity pulls on the ocean and makes the water bulge. This causes <b>high tide</b> and <b>low tide</b>.",
    "Twice a day|⏰|Most beaches have two high tides and two low tides each day. At low tide you can find tide pools."
  ], [
    "What causes the tides?|the Moon's pull|🌙||the wind only,the fish",
    "When the water is high on the shore, it is...|high tide|🌊||low tide,no tide",
    "When the water is far out, it is...|low tide|🏖️||high tide,wave tide",
    "How many high tides do most beaches get each day?|two|2️⃣||one hundred,none",
    "The pull of the Moon is called...|gravity|⬇️||magnetism,wind",
    "Tide pools are easiest to see at...|low tide|🦀||high tide,noon only",
    "Tides are changes in...|ocean water level|🌊||rain color,Moon color",
    "The ocean's rise and fall along the shore is the...|tide|🌊||eclipse,season"
  ], "The Moon pulls the ocean."));
  e.push(L("Planet facts", [
    "Giants|🪐|<b>Jupiter</b> has a huge storm called the Great Red Spot. <b>Saturn</b> has rings made of ice and rock.",
    "Hot and cold|🌡️|<b>Venus</b> is hotter than Mercury because its thick air traps heat. <b>Neptune</b> is a very cold, windy planet.",
    "Mars|🔴|<b>Mars</b> has the biggest volcano we know, Olympus Mons. Mars is rusty red from iron in its dust."
  ], [
    "Which planet has the Great Red Spot?|Jupiter|🌀||Mars,Venus",
    "Saturn's rings are made of...|ice and rock|💍||gas only,metal rings",
    "Which planet is hotter than Mercury?|Venus|🔥||Mars,Neptune",
    "Which planet has Olympus Mons?|Mars|🌋||Earth,Saturn",
    "Why is Mars red?|iron in its dust|🔴||red paint,red water",
    "Which planet is very cold and windy?|Neptune|🥶||Mercury,Venus",
    "The Great Red Spot is a giant...|storm|🌀||volcano,lake",
    "Which planet has the most famous rings?|Saturn|💍||Mars,Mercury"
  ], "Remember one special fact for each planet."));
  e.push(L("Asteroids, comets and meteors", [
    "Space rocks|☄️|Most <b>asteroids</b> are rocky pieces left from when the planets formed. Many live in a belt between Mars and Jupiter.",
    "Comets|☄️|A <b>comet</b> is a ball of ice and dust. Near the Sun it makes a glowing tail that points away from the Sun.",
    "Shooting stars|🌠|A <b>meteor</b> is a space rock that burns up in Earth's air. We call it a shooting star. One that lands is a <b>meteorite</b>."
  ], [
    "A rocky piece in space is an...|asteroid|🪨||comet,star",
    "A ball of ice and dust with a tail is a...|comet|☄️||planet,moon",
    "A comet's tail points...|away from the Sun|☀️||toward the Sun,toward Earth only",
    "A shooting star is really a...|meteor|🌠||star,planet",
    "A space rock that lands on Earth is a...|meteorite|🪨||meteor,comet",
    "Where is the main asteroid belt?|between Mars and Jupiter|🪐||near Earth,past Neptune",
    "A meteor glows because it...|burns in Earth's air|🔥||is a lamp,is made of fire",
    "Comets are made of ice and...|dust|☄️||sand castles,wood"
  ], "Asteroids are rock. Comets are ice."));
  e.push(L("Our galaxy", [
    "Galaxies|🌌|A <b>galaxy</b> is a huge group of stars, gas and dust held together by gravity. There are billions of galaxies.",
    "The Milky Way|🌠|We live in the <b>Milky Way</b> galaxy. It is shaped like a giant spiral. The Sun is one of billions of stars in it.",
    "Constellations|⭐|People long ago joined stars into pictures called constellations, like Orion the hunter. The North Star stays almost still in the northern sky."
  ], [
    "A huge group of stars, gas and dust is a...|galaxy|🌌||planet,constellation",
    "What is the name of our galaxy?|the Milky Way|🌠||Candy Bar,Andromeda Street",
    "The Milky Way is shaped like a...|spiral|🌀||cube,square",
    "The Sun is one star in the...|Milky Way|🌌||Moon,asteroid belt",
    "A picture made by joining stars is a...|constellation|⭐||galaxy,comet",
    "Which is a constellation?|Orion|⭐||Mars,Earth",
    "Which star stays almost still in the northern sky?|the North Star|🧭||the Sun,the Moon",
    "Stars are held in a galaxy by...|gravity|⬇️||glue,wind"
  ], "A galaxy is much bigger than a constellation."));
  e.push(MIX("Mixed practice", [e[0], e[1], e[2], e[4], e[6], e[9], e[12], e[14]]));
  e.push(MIX("Level 5 Challenge", [e[3], e[5], e[7], e[8], e[10], e[11], e[13], e[15], e[16], e[17]]));

  // ================= LEVEL 6 =================
  const f = [];
  f.push(L("Staying safe in disasters", [
    "Be ready|🎒|A natural disaster is a big event like a flood, earthquake or wildfire. Families can make a plan and a kit with water, food and a flashlight.",
    "Different dangers|🌪️|Earthquake: drop, cover and hold on. Tornado: go to the lowest floor, in a room with no windows. Lightning: go inside.",
    "Listen|📻|Always listen to grown-ups and official warnings. If they say to leave, go to a safe place together."
  ], [
    "In an earthquake you should...|drop cover and hold on|🛡️||run up the stairs,stand by a window",
    "In a tornado, a safe place is...|a low room with no windows|🏠||a car on the road,a tall tree",
    "In a lightning storm you should...|go inside|⚡||fly a kite,swim",
    "What goes in a safety kit?|water and a flashlight|🔦||only toys,only candy",
    "In a flood, you should go to...|higher ground|⛰️||the river bank,low ground",
    "A natural disaster is...|a big dangerous event in nature|🌋||a birthday party,a school lunch",
    "Who should you listen to in a warning?|grown-ups and officials|📻||nobody,strangers online",
    "A family plan helps you know...|what to do and where to meet|📋||the weather next year,which game is fun"
  ], "Plan ahead and listen to grown-ups."));
  f.push(L("Floods and droughts", [
    "Too much water|🌊|A <b>flood</b> happens when water covers land that is usually dry, often after heavy rain or fast-melting snow.",
    "Too little water|🏜️|A <b>drought</b> is a long time with very little rain. Plants dry out and water gets low.",
    "Saving water|💧|In a drought everyone saves water. A <b>dam</b> holds back a river and stores water in a <b>reservoir</b>."
  ], [
    "Too much water on usually dry land is a...|flood|🌊||drought,breeze",
    "A long time with very little rain is a...|drought|🏜️||flood,blizzard",
    "What can cause a flood?|heavy rain|🌧️||a long dry spell,a sunny week",
    "In a drought we should...|save water|🚰||waste water,fill pools",
    "A dam holds back a...|river|🏞️||mountain,cloud",
    "Water stored behind a dam is in a...|reservoir|💧||volcano,glacier",
    "During a drought, plants...|dry out|🥀||grow very fast,float",
    "In a flood, never...|walk or drive through the water|🚫||go to higher ground,listen to officials"
  ], "Flood is too wet. Drought is too dry."));
  f.push(L("The ocean", [
    "Salty and huge|🌊|Oceans cover about three quarters of Earth's surface. Ocean water is salty.",
    "Deep|🤿|The deepest place in the ocean is the Mariana Trench in the Pacific Ocean. It is deeper than the tallest mountain is high.",
    "Moving water|🐢|Winds make waves. Ocean <b>currents</b> are like rivers inside the ocean, moving warm or cold water around the world."
  ], [
    "How much of Earth is covered by ocean?|about three quarters|🌍||about one tenth,almost none",
    "Ocean water is...|salty|🧂||sweet,sour",
    "Which ocean is the biggest?|Pacific|🌊||Arctic,Atlantic",
    "What makes most waves?|wind|💨||fish,boats only",
    "Rivers inside the ocean are called...|currents|🌀||valleys,tides",
    "The deepest part of the ocean is the...|Mariana Trench|🤿||Sahara Gulf,Grand Canyon",
    "Ocean currents move...|warm or cold water|🌡️||mountains,clouds",
    "Is there more ocean or land on Earth?|ocean|🌍||land"
  ], "Most of Earth is water."));
  f.push(L("Glaciers and ice", [
    "Rivers of ice|🧊|A <b>glacier</b> is a huge mass of ice that moves very slowly downhill. It forms from snow that piles up for years.",
    "Ice sheets|🐧|Huge ice sheets cover Antarctica and Greenland. Most of Earth's fresh water is frozen in ice.",
    "Icebergs|🚢|An <b>iceberg</b> is a big chunk of ice that broke off a glacier and floats in the sea. Most of it is under the water."
  ], [
    "A huge mass of slow-moving ice is a...|glacier|🧊||volcano,river",
    "A chunk of ice that floats in the sea is an...|iceberg|🚢||island,igloo",
    "Where is most of an iceberg?|under the water|🌊||above the water,in the sky",
    "Glaciers move...|very slowly|🐌||very fast,never",
    "Which place is covered by a huge ice sheet?|Antarctica|🐧||Australia,Africa",
    "Where is most of Earth's fresh water?|frozen in ice|🧊||in puddles,in the clouds",
    "A glacier forms from piles of...|snow|❄️||sand,leaves",
    "A glacier can carve a...|valley|🏞️||volcano,rainbow"
  ], "A glacier is slow, frozen water."));
  f.push(L("Groundwater and watersheds", [
    "Underground water|🕳️|Some rain soaks into the ground. Water under the ground is <b>groundwater</b>. People dig wells to reach it.",
    "Aquifers|⛲|An <b>aquifer</b> is rock or sand underground that holds lots of water. A <b>spring</b> is where groundwater flows out.",
    "Watersheds|🗺️|A <b>watershed</b> is all the land where the rain drains into the same river or lake."
  ], [
    "Water under the ground is called...|groundwater|🕳️||rainwater,seawater",
    "A well is dug to reach...|groundwater|⛲||lava,clouds",
    "Where groundwater flows out of the ground is a...|spring|💧||dam,delta",
    "Underground rock that holds lots of water is an...|aquifer|🕳️||asteroid,iceberg",
    "All the land that drains into one river is its...|watershed|🏞️||canyon,peak",
    "What soaks into the ground?|some rain|🌧️||all the Sun,thunder",
    "Why is groundwater important?|people use it for drinking|🚰||it makes shadows,it is salty",
    "Water we drink from a well comes from...|under the ground|⛲||the Moon,a cloud"
  ], "Groundwater is below the surface."));
  f.push(L("Mineral clues", [
    "Telling minerals apart|🔍|Scientists check a mineral's <b>color</b>, <b>shine</b> (luster), <b>hardness</b> and <b>streak</b>. Streak is the color of its powder when rubbed on a tile.",
    "Hardness|⛏️|A mineral that scratches another is harder. Quartz can scratch glass. A fingernail can scratch talc.",
    "Special ones|🧲|Magnetite is attracted to a magnet. Some minerals glow under special lights."
  ], [
    "The color of a mineral's powder is its...|streak|🎨||shine,size",
    "How shiny a mineral is, is called its...|luster|✨||weight,sound",
    "Which mineral can a fingernail scratch?|talc|💅||quartz,diamond",
    "Which mineral can scratch glass?|quartz|🔍||talc,chalk",
    "Which mineral sticks to a magnet?|magnetite|🧲||quartz,talc",
    "A harder mineral will ___ a softer one.|scratch|⛏️||melt,paint",
    "Which is NOT a way to tell minerals apart?|their age at lunch|🔍||hardness,streak",
    "Scientists can test a mineral's...|hardness|⛏️||dreams,music"
  ], "Check color, shine, hardness, streak."));
  f.push(L("The rock cycle", [
    "Rocks change|🔄|Rocks are always slowly changing from one kind to another. This is the <b>rock cycle</b>.",
    "Cycle steps|⛰️|Weathering and erosion make bits called <b>sediment</b>. Sediment pressed together makes sedimentary rock. Heat and pressure make it metamorphic.",
    "Melt and cool|🌋|If rock melts it becomes magma. When magma cools it becomes igneous rock, and the cycle goes on."
  ], [
    "Sediment pressed together makes...|sedimentary rock|🏖️||igneous rock,lava",
    "Heat and pressure change rock into...|metamorphic rock|🔥||sediment,water",
    "Melted rock cooling makes...|igneous rock|🌋||sedimentary rock,sand",
    "Rock that melts becomes...|magma|🌋||sediment,ice",
    "Tiny bits of broken rock are called...|sediment|🏖️||magma,vapor",
    "The rock cycle takes...|a very long time|⏳||one minute,one second",
    "Can igneous rock become sedimentary rock over time?|yes|🔄||no",
    "Is the rock cycle a straight line or a loop?|a loop|🔄||a straight line"
  ], "Rocks keep changing form."));
  f.push(L("Deep time", [
    "Very old Earth|🌍|Earth is about 4.5 billion years old. That is an enormously long time.",
    "Dinosaurs|🦕|Dinosaurs lived millions of years ago. They died out about 66 million years ago. We learn about them from fossils.",
    "People came late|🧑|People have only been on Earth for a tiny part of that time. Scientists read rock layers: lower layers are usually older."
  ], [
    "About how old is Earth?|4.5 billion years|🌍||4.5 hundred years,45 years",
    "Dinosaurs lived...|millions of years ago|🦕||last year,with the first cars",
    "How do we learn about dinosaurs?|from fossils|🦴||from photos,from movies only",
    "In rock layers, lower layers are usually...|older|⬇️||younger,hotter",
    "In rock layers, higher layers are usually...|younger|⬆️||older,wetter",
    "Which came first?|dinosaurs|🦖||people",
    "Which is a very long time?|a billion years|⏳||a minute,a day",
    "Amber can trap a tiny...|insect|🟠||planet,mountain"
  ], "Deep time means very, very long ago."));
  f.push(L("Reading maps", [
    "Map tools|🗺️|A map shows a place from above. A <b>key</b> tells what the symbols mean. A <b>scale</b> tells how map distance matches real distance.",
    "Scale|📏|If 1 centimeter on a map equals 1 kilometer in real life, then 3 centimeters equals 3 kilometers.",
    "Globe|🌐|A <b>globe</b> is a model of Earth. It shows the shapes of land and sea more truthfully than a flat map."
  ], [
    "A map's key tells you...|what the symbols mean|🔑||the weather,the time",
    "A map's scale tells you...|how far real places are|📏||what color the sky is,who made it",
    "A model of Earth is a...|globe|🌐||compass,graph",
    "A map shows a place from...|above|🛰️||below,inside",
    "1 cm = 1 km on a map. 4 cm is how many km?|4|📏||14,40",
    "1 cm = 2 km on a map. 3 cm is how many km?|6|📏||5,32",
    "Which shows land shapes most truthfully?|a globe|🌐||a drawing of a duck,a flat doodle",
    "Which part tells directions?|compass rose|🧭||key,scale"
  ], "Use the key, scale and compass."));
  f.push(L("Seasons around the world", [
    "North and south|🌐|The Northern and Southern Hemispheres have opposite seasons.",
    "Opposite times|🎄|When it is winter in the United States, it is summer in Australia. Holiday time there can be at the beach!",
    "Near the poles and equator|🌴🐧|Near the equator it is warm all year, with wet and dry seasons. Near the poles, summer has very long days and winter has very long nights."
  ], [
    "When it is summer in the north, it is ___ in the south.|winter|🔄||summer,spring only",
    "December is winter in the north. In the south it is...|summer|🏖️||winter,snowy",
    "Is Australia in the Northern or Southern Hemisphere?|Southern|🦘||Northern",
    "Which place has warm weather all year?|the equator|🌴||the poles,the Arctic",
    "Near the poles, winter has very long...|nights|🌑||days,summers",
    "Near the poles, summer has very long...|days|☀️||nights,winters",
    "June is summer in the Northern Hemisphere. In the Southern Hemisphere it is...|winter|❄️||summer,spring",
    "Who has seasons opposite to the north?|the south|🔄||the equator only,the Moon"
  ], "North and south are opposite."));
  f.push(L("How far is space?", [
    "Near and far|📏|The Moon is our closest big neighbor. The Sun is about 400 times farther away than the Moon.",
    "Light takes time|💡|Light from the Moon takes about 1 second to reach us. Light from the Sun takes about 8 minutes.",
    "Stars|🌟|Other stars are so far that their light takes years to reach us. We use <b>light-years</b> to measure these huge distances."
  ], [
    "What is the closest big object to Earth in space?|the Moon|🌙||the Sun,Mars",
    "Which is farther from Earth?|the Sun|☀️||the Moon",
    "About how long does sunlight take to reach Earth?|8 minutes|⏰||8 seconds,8 years",
    "About how long does moonlight take to reach Earth?|1 second|💡||1 year,1 day",
    "A light-year measures...|distance|📏||time of day,weight",
    "Other stars are ___ than the Sun.|much farther away|🌟||much closer,the same distance",
    "Does light travel instantly?|no. It takes time|💡||yes it does",
    "Which object is nearest to us?|the Moon|🌙||Neptune,Polaris"
  ], "Closer things are reached in less time."));
  f.push(L("The planets in order", [
    "Order from the Sun|🪐|The planets in order are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    "Number them|1️⃣|Mercury is 1st, Venus 2nd, Earth 3rd, Mars 4th, Jupiter 5th, Saturn 6th, Uranus 7th, Neptune 8th.",
    "Memory trick|🧠|Make a sentence: My Very Educated Mother Just Served Us Noodles. Each first letter is a planet."
  ], [
    "Which planet is 3rd from the Sun?|Earth|🌍||Mars,Venus",
    "Which planet is 1st from the Sun?|Mercury|☿||Venus,Earth",
    "Which planet is 5th from the Sun?|Jupiter|🪐||Saturn,Mars",
    "Which planet is 8th from the Sun?|Neptune|🥶||Uranus,Saturn",
    "Which planet comes right after Earth?|Mars|🔴||Venus,Jupiter",
    "Which planet comes right before Saturn?|Jupiter|🪐||Uranus,Mars",
    "Which planet is between Venus and Mars?|Earth|🌍||Mercury,Jupiter",
    "Which planet is 6th from the Sun?|Saturn|💍||Jupiter,Uranus"
  ], "Count outward from the Sun."));
  f.push(L("Space exploration", [
    "First steps|🚀|The first human-made satellite, Sputnik, flew in 1957. In 1961 the first person traveled into space.",
    "The Moon|🌙|In 1969 the Apollo 11 mission landed the first people on the Moon. They collected rocks and left footprints.",
    "Today|🤖|Robots called rovers explore Mars. The International Space Station orbits Earth with astronauts living on board."
  ], [
    "In what year did people first land on the Moon?|1969|🌙||1869,1999",
    "What was the first human-made satellite called?|Sputnik|🛰️||Apollo,Rover",
    "What is a rover?|a robot that drives on another world|🤖||a kind of rocket seat,a space hat",
    "What orbits Earth with astronauts living on it?|the International Space Station|🛰️||a rover,a comet",
    "Which mission landed the first people on the Moon?|Apollo 11|🚀||Sputnik 1,Voyager",
    "Rovers explore the planet...|Mars|🔴||Earth only,the Sun",
    "What did the Moon visitors collect?|rocks|🪨||fish,bananas",
    "Astronauts on the Moon wore...|space suits|👩‍🚀||swimsuits,pajamas"
  ], "Think about the history of space travel."));
  f.push(L("Tools for space", [
    "Looking far|🔭|A <b>telescope</b> makes faraway things look bigger and brighter. The Hubble Space Telescope orbits Earth and takes sharp pictures.",
    "Visiting|🛸|A <b>probe</b> is a robot spacecraft sent to explore, like Voyager. A <b>rover</b> drives on the ground of another world.",
    "Living in space|🧑‍🚀|A <b>space station</b> is a home in space where astronauts live and do science."
  ], [
    "Which tool makes faraway things look bigger?|a telescope|🔭||a microscope,a ruler",
    "A robot spacecraft sent to explore is a...|probe|🛸||bus,boat",
    "A robot that drives on Mars is a...|rover|🤖||satellite,rocket",
    "A home in space for astronauts is a...|space station|🛰️||rover,probe",
    "Which telescope orbits Earth?|Hubble|🔭||Olympus,Orion",
    "A rocket is used to...|carry things into space|🚀||bake bread,cut grass",
    "What do we call a spacecraft that circles Earth to send pictures?|a satellite|🛰️||a canoe,a kite",
    "What tool lets you see tiny things up close?|a microscope|🔬||a telescope"
  ], "Each tool has a job."));
  f.push(L("Gravity and orbits", [
    "Orbits|🌍|An <b>orbit</b> is the path one object takes around another. Earth orbits the Sun. The Moon orbits Earth.",
    "Gravity holds on|⬇️|The Sun's gravity pulls on the planets and keeps them from flying off into space.",
    "Year length|📅|Planets closer to the Sun have shorter years. Mercury's year is only 88 Earth days. Earth's year is about 365 days. Neptune's is much longer."
  ], [
    "The path around another object is an...|orbit|🔄||eclipse,echo",
    "What keeps the planets going around the Sun?|the Sun's gravity|⬇️||wind,tides",
    "What orbits Earth?|the Moon|🌙||the Sun,Jupiter",
    "How many days does Earth take to orbit the Sun?|about 365|📅||about 30,about 7",
    "Which planet has the shortest year?|Mercury|☿||Neptune,Earth",
    "Which planet has a very long year?|Neptune|🥶||Mercury,Venus",
    "Do planets closer to the Sun have shorter or longer years?|shorter|🔄||longer",
    "One trip of Earth around the Sun is one...|year|📅||day,month"
  ], "Closer to the Sun means a faster trip."));
  f.push(L("Sun power", [
    "Source of energy|☀️|Almost all energy on Earth comes from the Sun. It warms the planet and lights the day.",
    "Plants|🌱|Plants use sunlight to make their own food. Animals eat plants, or eat animals that ate plants.",
    "Solar panels|🔋|Solar panels turn sunlight into electricity. It is clean and renewable energy."
  ], [
    "Where does almost all energy on Earth come from?|the Sun|☀️||the Moon,the wind alone",
    "Plants use sunlight to make...|food|🌱||plastic,sound",
    "A solar panel turns sunlight into...|electricity|🔋||rain,snow",
    "Solar energy is...|renewable|♻️||nonrenewable,gone tomorrow",
    "Which needs sunlight to grow?|plants|🌻||rocks,coins",
    "At night solar panels make...|little or no power|🌙||the most power,thunder",
    "Where do solar panels work best?|in sunny places|☀️||in a dark cave,under a bed",
    "The Sun keeps Earth...|warm|🌍||frozen solid,dark"
  ], "Sunlight is energy."));
  f.push(L("Air and our planet", [
    "Air pollution|🏭|Smoke from cars, factories and fires can dirty the air. Clean air is better for our lungs.",
    "A warming Earth|🌡️|Burning fuels adds gases like carbon dioxide to the air. These gases hold in heat, so Earth is slowly getting warmer.",
    "How to help|🚲|We can walk or bike, save electricity and plant trees. Trees take in carbon dioxide and give us fresh air."
  ], [
    "Smoke from factories can cause...|air pollution|🏭||clean air,rainbows",
    "Which gas holds heat in the air?|carbon dioxide|🌡️||helium,oxygen only",
    "Burning fuels adds ___ to the air.|carbon dioxide|🔥||sparkles,ice",
    "Which helps clean the air?|planting trees|🌳||burning trash,more smoke",
    "A good way to save energy is to...|turn off lights you do not need|💡||leave all the lights on,open the fridge all day",
    "Walking or biking makes ___ pollution than a car.|less|🚲||more,the same",
    "Earth is slowly getting...|warmer|🌡️||smaller,flatter",
    "Trees take in...|carbon dioxide|🌳||trash,oil"
  ], "Less burning means cleaner air."));
  f.push(L("Renewable or not?", [
    "Renewable|♻️|Renewable resources can be used again and again: sunlight, wind, moving water and heat from deep in the Earth (geothermal).",
    "Nonrenewable|⛽|Coal, oil and natural gas are nonrenewable. Once used, they are gone for a very long time.",
    "Choosing|🤔|Using more renewable energy helps keep the air clean and our resources lasting."
  ], [
    "Which is renewable?|wind|💨||coal,oil",
    "Which is renewable?|moving water|🌊||natural gas,coal",
    "Which is nonrenewable?|oil|🛢️||sunlight,wind",
    "Which is nonrenewable?|coal|⚫||sunlight,moving water",
    "A dam can make power from...|moving water|💧||sunshine only,oil",
    "Geothermal energy comes from...|heat inside Earth|🌋||wind,the Moon",
    "Which is NOT renewable?|natural gas|🔥||wind,sunlight",
    "Renewable energy keeps the air...|cleaner|🌿||dirtier,smokier"
  ], "Renewable can be used again and again."));
  f.push(MIX("Mixed practice", [f[0], f[2], f[4], f[6], f[8], f[11], f[13], f[15]]));
  f.push(MIX("Level 6 Challenge", [f[1], f[3], f[5], f[7], f[9], f[10], f[12], f[14], f[16], f[17]]));

  Object.assign(EARTH_LEVELS, { 4: d, 5: e, 6: f });
})();
