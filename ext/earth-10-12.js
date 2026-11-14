// Mind Lab Earth & Space, levels 10-12 (extension file). 20 lessons per level.
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

  // ================= LEVEL 10 =================
  const a = [];
  a.push(L("Reading a weather map", [
    "Weather maps|🗺️|A weather map uses lines and symbols to show the weather over a big area. <b>Isobars</b> are lines that join places with the same air pressure.",
    "Lines close together|🌬️|When isobars are close together, the pressure changes fast and the wind is <b>strong</b>. When they are far apart, the wind is light.",
    "Front symbols|🔺|A blue line with triangles shows a <b>cold front</b>. A red line with half circles shows a <b>warm front</b>. <b>Isotherms</b> are lines that join places with the same temperature."
  ], [
    "Lines that join places with the same air pressure are...|isobars|🗺️||isotherms,equators",
    "Lines that join places with the same temperature are...|isotherms|🌡️||isobars,contours",
    "Isobars very close together mean the wind is...|strong|💨||weak,not blowing",
    "Isobars far apart mean the wind is...|light|🍃||strong,a hurricane",
    "A blue line with triangles is a...|cold front|🔺||warm front,river",
    "A red line with half circles is a...|warm front|🟠||cold front,road",
    "A weather map shows weather over a...|big area|🗺️||single raindrop,tiny pond",
    "Which tool measures air pressure?|barometer|📊||anemometer,rain gauge",
    "Which tool measures wind speed?|anemometer|💨||barometer,thermometer"
  ], "Think about what the lines and symbols stand for."));
  a.push(L("Air masses", [
    "Big blobs of air|🌫️|An <b>air mass</b> is a huge body of air that is the same temperature and wetness all through. It can be hundreds of kilometers wide.",
    "Where it forms|🌎|Air masses take on the feel of the place where they form. Over cold land they are <b>polar</b> and cold. Over warm places they are <b>tropical</b> and warm. Over oceans they are <b>maritime</b> and moist. Over land they are <b>continental</b> and dry.",
    "On the move|➡️|Air masses move with the wind. When a cold air mass meets a warm one, they do not mix easily. The edge between them is a <b>front</b>, where weather often changes."
  ], [
    "A huge body of air with the same temperature and wetness is an...|air mass|🌫️||ocean current,air bubble",
    "A cold air mass that forms over cold land is called...|polar|🥶||tropical,maritime",
    "A warm air mass that forms near the equator is called...|tropical|🌴||polar,continental",
    "An air mass that forms over the ocean is...|maritime|🌊||continental,polar",
    "An air mass that forms over land is...|continental|🏜️||maritime,tropical",
    "A maritime air mass is usually...|moist|💧||dry,frozen solid",
    "A continental air mass is usually...|dry|🌵||moist,full of fish",
    "The edge where two air masses meet is a...|front|🔺||delta,fault",
    "A polar maritime air mass would be cold and...|moist|❄️||dry,hot"
  ], "Look at the first word: polar is cold, tropical is warm."));
  a.push(L("Deserts", [
    "What is a desert?|🏜️|A <b>desert</b> is a place that gets very little rain, less than about 25 centimeters (10 inches) a year. Many deserts are hot, but some are cold.",
    "Living in a desert|🌵|Desert plants save water. A cactus stores water in its thick stem. Many desert animals come out at night when it is cooler. The camel can go a long time without a drink.",
    "Big deserts|🐪|The <b>Sahara</b> in Africa is the largest hot desert. The biggest desert of all is cold: <b>Antarctica</b>, because it gets very little snow and rain."
  ], [
    "A desert gets very little...|rain|🏜️||sunshine,wind",
    "A cactus saves water in its...|thick stem|🌵||roots only,flowers",
    "Many desert animals are active at...|night|🌙||noon,midday",
    "The largest hot desert is the...|Sahara|🐪||Amazon,Alps",
    "The largest desert of all is...|Antarctica|🧊||the Sahara,Australia",
    "Are all deserts hot?|No, some are cold|🥶||Yes, all of them,Only on Mondays",
    "A place that gets about 10 cm of rain a year is probably a...|desert|🌵||rainforest,swamp",
    "Which plant fits a desert best?|cactus|🌵||water lily,palm in a swamp",
    "Which animal can go a long time without a drink?|camel|🐫||frog,otter"
  ], "Think about what a desert is missing."));
  a.push(L("Rainforests and tundra", [
    "Tropical rainforest|🌴|A <b>rainforest</b> is hot and wet all year, with tall trees. It has layers: the <b>emergent</b> layer on top, then the <b>canopy</b>, then the <b>understory</b>, then the dark <b>forest floor</b>. The Amazon is the biggest rainforest.",
    "Tundra|🥶|The <b>tundra</b> is cold, windy and almost treeless. Under the surface the ground stays frozen all year. This frozen ground is called <b>permafrost</b>.",
    "Life in each|🦊|Rainforests hold more kinds of plants and animals than any other land biome. Tundra animals such as arctic foxes have thick fur and many only visit in the short summer."
  ], [
    "The thick leafy roof of a rainforest is the...|canopy|🌳||tundra,forest floor",
    "The darkest layer of a rainforest is the...|forest floor|🌿||emergent layer,canopy",
    "The tallest trees poke out in the...|emergent layer|🌲||understory,forest floor",
    "Ground that stays frozen all year is called...|permafrost|🧊||canopy,topsoil",
    "A cold, windy, treeless biome is the...|tundra|🥶||rainforest,savanna",
    "A hot and wet biome with many kinds of life is the...|rainforest|🌴||tundra,desert",
    "The biggest rainforest in the world is the...|Amazon|🌎||Sahara,Gobi",
    "Which animal has thick fur and lives in the tundra?|arctic fox|🦊||parrot,tree frog",
    "Which fits the tundra?|very few tall trees|🌬️||thick jungle,many vines"
  ], "Think about which biome is cold and which is wet."));
  a.push(L("Wetlands and coral reefs", [
    "Wetlands|🦆|A <b>wetland</b> is land that is soaked with water for much of the year. Swamps and marshes are wetlands. They soak up floods like a sponge and filter dirty water.",
    "Home for wildlife|🐸|Wetlands are homes for frogs, ducks, fish and many plants. Many birds rest there when they travel long distances.",
    "Coral reefs|🪸|A <b>coral reef</b> is built by tiny animals called coral polyps. They grow in warm, shallow, clear sea water. The Great Barrier Reef in Australia is the largest reef in the world."
  ], [
    "Land soaked with water much of the year is a...|wetland|🦆||desert,plateau",
    "Two kinds of wetland are swamps and...|marshes|🌾||dunes,canyons",
    "Wetlands help in a flood by acting like a...|sponge|🧽||wall of ice,fan",
    "A coral reef is built by tiny...|animals|🪸||rocks only,plants",
    "Coral reefs grow in water that is warm and...|shallow|🐠||freezing,muddy",
    "The Great Barrier Reef is in...|Australia|🇦🇺||Canada,Egypt",
    "Wetlands can clean water by...|filtering it|💧||heating it,freezing it",
    "A swamp is a wetland with lots of...|trees|🌳||sand dunes,snow",
    "Which animal often lives in a wetland?|frog|🐸||camel,arctic fox"
  ], "Think about what water does in each place."));
  a.push(L("Hardness of minerals", [
    "Testing hardness|💎|Hardness tells how easily a mineral can be scratched. A harder mineral scratches a softer one. Scientists use the <b>Mohs scale</b>, from 1 (softest) to 10 (hardest).",
    "The scale|📏|Talc is 1 and is so soft that you can scratch it with a fingernail. Quartz is 7. Diamond is 10, the hardest natural material.",
    "Everyday tools|🪙|A fingernail scratches minerals up to about 2.5. A copper coin is about 3. A steel nail is about 5.5. If a mineral scratches glass, it is harder than 5.5."
  ], [
    "The Mohs scale tests a mineral's...|hardness|💎||color only,weight only",
    "The softest mineral on the Mohs scale is...|talc|🧂||diamond,quartz",
    "The hardest natural material is...|diamond|💎||talc,gold",
    "Diamond is number ___ on the Mohs scale.|10|🔟||1,5",
    "Talc is number ___ on the Mohs scale.|1|1️⃣||7,10",
    "Quartz is number ___ on the Mohs scale.|7|7️⃣||2,10",
    "A mineral that scratches glass is harder than a...|steel nail|🔩||fingernail,talc",
    "A harder mineral will ___ a softer one.|scratch|✏️||melt,paint",
    "Which can scratch talc?|a fingernail|💅||nothing at all,only diamond"
  ], "Harder things scratch softer things."));
  a.push(L("Mineral clues", [
    "More ways to test|🔍|Hardness is not the only clue. <b>Luster</b> is how a mineral shines: metallic like a coin, or glassy like glass. <b>Streak</b> is the color of the powder it leaves when rubbed on a white tile.",
    "Color can trick you|🎨|The same mineral can come in different colors, so color is not a reliable clue. Streak stays the same, so it is better.",
    "Other tests|🧲|<b>Cleavage</b> means the mineral breaks along flat, smooth surfaces. Magnetite is attracted to a magnet. Calcite fizzes with a drop of weak acid."
  ], [
    "How a mineral shines is its...|luster|✨||streak,cleavage",
    "The color of a mineral's powder is its...|streak|🎨||luster,hardness",
    "A mineral that shines like a coin has a ___ luster.|metallic|🪙||glassy,dull earthy",
    "Breaking along flat, smooth surfaces is called...|cleavage|💥||streak,luster",
    "Which clue can change even for the same mineral?|color|🌈||streak,hardness",
    "Which mineral is attracted to a magnet?|magnetite|🧲||calcite,talc",
    "Which mineral fizzes with a drop of weak acid?|calcite|🧪||magnetite,quartz",
    "To find a streak you rub the mineral on a...|white tile|⬜||piece of wood,mirror",
    "A mineral that shines like glass has a ___ luster.|glassy|🔮||metallic,magnetic"
  ], "Match each word to the test it describes."));
  a.push(L("Ores and metals", [
    "Metals in rocks|⛏️|An <b>ore</b> is a rock that holds enough metal to be worth digging up. Workers mine it and then heat it to get the metal out.",
    "Common ores|🔩|<b>Iron ore</b> gives iron, which is used to make steel for bridges and cars. <b>Bauxite</b> gives aluminum for cans and planes. Copper ore gives copper for wires.",
    "Not forever|♻️|Ore is a non-renewable resource. Recycling metal saves energy and means we need to mine less."
  ], [
    "A rock with enough metal to be worth mining is an...|ore|⛏️||egg,oar",
    "Iron ore is used to make...|steel|🌉||glass,paper",
    "Bauxite is the ore of...|aluminum|🥫||gold,copper",
    "Copper is often used for electric...|wires|🔌||pillows,candles",
    "Metal ores are a ___ resource.|non-renewable|⛏️||renewable,endless",
    "Recycling metal means we need to mine...|less|♻️||more,deeper",
    "Which is made from steel?|a bridge|🌉||a cloud,a rainbow",
    "Which is usually made from aluminum?|a drink can|🥫||a pencil,a book",
    "To get metal out of ore, workers often...|heat it|🔥||freeze it,wash it only"
  ], "Think about where metals start and how they get out."));
  a.push(L("Earth's axis and day length", [
    "The tilted axis|🌍|Earth spins around an imaginary line called its <b>axis</b>. The axis is tilted about 23.5 degrees. That tilt gives us seasons.",
    "Long and short days|🌞|When your half of Earth tilts toward the Sun, the days are longer and the Sun is higher. When it tilts away, days are shorter and the Sun is lower.",
    "At the equator|📍|Near the equator the day is about 12 hours long all year. Near the poles, there are months of daylight in summer and months of darkness in winter."
  ], [
    "The tilt of Earth's axis is about...|23.5 degrees|🌍||90 degrees,0 degrees",
    "Earth spins around its...|axis|🌀||orbit,equator line only",
    "Seasons happen because Earth's axis is...|tilted|📐||straight up,hot",
    "When your half tilts toward the Sun, days are...|longer|☀️||shorter,the same",
    "When your half tilts away from the Sun, days are...|shorter|🌑||longer,hotter",
    "Near the equator, day length is about ___ all year.|12 hours|📍||2 hours,20 hours",
    "In summer, the Sun is ___ in the sky.|higher|🌞||lower,gone",
    "Near the poles, winter brings months of...|darkness|🌑||nonstop sun,fog only",
    "How long does Earth take to spin once?|24 hours|⏰||1 year,1 month"
  ], "Remember the tilt, not the distance from the Sun."));
  a.push(L("Solstices and equinoxes", [
    "Solstice|☀️|A <b>solstice</b> is the day when the Sun is at its highest or lowest point. In the Northern Hemisphere the summer solstice is around June 21, the longest day. The winter solstice is around December 21, the shortest day.",
    "Equinox|⚖️|On an <b>equinox</b> day and night are almost equal, about 12 hours each. This happens around March 20 and September 22.",
    "Opposite halves|🔄|When it is summer in the north, it is winter in the south. So June 21 is the longest day in the north but the shortest day in the south."
  ], [
    "Around June 21, the north has its...|longest day|☀️||shortest day,equal day and night",
    "Around December 21, the north has its...|shortest day|🌑||longest day,equal day and night",
    "On an equinox, day and night are about...|equal|⚖️||very different,both zero",
    "An equinox happens around March 20 and...|September 22|📅||July 4,January 1",
    "The summer solstice in the north is in...|June|📅||December,March",
    "The winter solstice in the north is in...|December|❄️||June,September",
    "When it is summer in the north, the south has...|winter|🔄||summer,spring only",
    "A solstice happens ___ times a year.|2|2️⃣||1,12",
    "The word for equal day and night is...|equinox|⚖️||solstice,eclipse"
  ], "Solstice means extreme. Equinox means equal."));
  a.push(L("Craters and Moon seas", [
    "Craters|🌑|The Moon is covered with <b>craters</b>, round dents made when rocks from space crashed into it long ago. Earth gets craters too, but wind and water wear them away.",
    "Seas|🌓|The dark patches you see on the Moon are called <b>maria</b> (say MAH-ree-ah), which means seas. They are not water. They are huge plains of ancient hardened lava.",
    "No air|🚫|The Moon has almost no air and no weather. That is why footprints and craters stay for millions of years."
  ], [
    "Round dents on the Moon are called...|craters|🌑||maria,valleys of water",
    "Craters are made when space rocks...|crash into the Moon|☄️||grow out of it,melt it",
    "The dark patches on the Moon are called...|maria|🌓||craters,clouds",
    "The Moon's dark patches are really...|ancient hardened lava|🌋||oceans,forests",
    "Does the Moon's sea hold water?|No|🌊||Yes, lots of it,Only on Tuesdays",
    "The Moon keeps its craters because it has no...|wind or weather|🚫||gravity,rocks",
    "Craters on Earth wear away because of wind and...|water|💧||the Moon,starlight",
    "The word maria means...|seas|🌊||mountains,craters",
    "The Moon has almost no...|air|💨||rocks,craters"
  ], "Think about why the Moon looks so different from Earth."));
  a.push(L("Mercury and Venus", [
    "Mercury|☿️|<b>Mercury</b> is the smallest planet and the closest to the Sun. It has almost no air. Days are very hot and nights are very cold. A year there lasts only 88 Earth days.",
    "Venus|🟡|<b>Venus</b> is wrapped in thick clouds that trap heat. It is the hottest planet, about 465°C, even hotter than Mercury. It spins backward compared with most planets.",
    "Look in the sky|✨|Venus is the brightest planet in our sky. You can see it just after sunset or before sunrise, so people call it the evening or morning star. It is not really a star."
  ], [
    "The smallest planet is...|Mercury|☿️||Venus,Mars",
    "The planet closest to the Sun is...|Mercury|☀️||Venus,Earth",
    "The hottest planet is...|Venus|🔥||Mercury,Mars",
    "Venus is so hot because its clouds...|trap heat|☁️||block the Sun,make ice",
    "A year on Mercury lasts about...|88 Earth days|📅||365 Earth days,2 Earth days",
    "Mercury has almost no...|air|💨||rocks,craters",
    "The brightest planet in our sky is...|Venus|✨||Mars,Neptune",
    "Venus is sometimes called the...|evening star|🌆||Moon's twin,comet",
    "Is the evening star really a star?|No, it is a planet|🪐||Yes, a big one,No, it is a comet"
  ], "Closest to the Sun is not always the hottest."));
  a.push(L("Mars, the red planet", [
    "A red world|🔴|<b>Mars</b> looks red because its soil has rust, which is iron mixed with oxygen. It is cold and dry, with a thin air made mostly of carbon dioxide.",
    "Big features|🏔️|Mars has the tallest volcano we know in the solar system, <b>Olympus Mons</b>. It also has a giant canyon system called Valles Marineris.",
    "Moons and days|🌑|Mars has two small moons, <b>Phobos</b> and <b>Deimos</b>. A day on Mars is a little longer than on Earth, about 24 hours and 37 minutes."
  ], [
    "Mars looks red because its soil has...|rust|🔴||red paint,blood",
    "Mars has how many moons?|2|🌑||0,12",
    "The names of the Mars moons are Phobos and...|Deimos|🌑||Titan,Europa",
    "The tallest volcano is on...|Mars|🌋||Earth,Venus",
    "The tallest volcano on Mars is...|Olympus Mons|🏔️||Mount Everest,Mauna Loa",
    "The air on Mars is mostly...|carbon dioxide|💨||oxygen,water vapor",
    "Compared with Earth, a Mars day is...|a little longer|⏰||much shorter,exactly the same",
    "Mars is a ___ world.|cold and dry|🏜️||warm and wet,hot and stormy",
    "Rust is iron mixed with...|oxygen|🧪||helium,sand"
  ], "Think about why a rusty nail looks the color it does."));
  a.push(L("Jupiter and Saturn", [
    "Jupiter|🟠|<b>Jupiter</b> is the largest planet. It is a gas giant with no solid ground. The <b>Great Red Spot</b> is a giant storm that has lasted for hundreds of years. It has at least 90 moons, including four big ones: Io, Europa, Ganymede and Callisto.",
    "Saturn|🪐|<b>Saturn</b> is famous for its bright rings made of ice and rock pieces. It is the second largest planet but not very dense. It is so light for its size that it would float in a giant bathtub!",
    "Gas giants|💨|Both are made mostly of hydrogen and helium. Saturn's biggest moon is <b>Titan</b>, which is larger than the planet Mercury and has thick air."
  ], [
    "The largest planet is...|Jupiter|🟠||Saturn,Neptune",
    "Jupiter's giant storm is the Great...|Red Spot|🌀||Blue Hole,Wave",
    "Jupiter and Saturn are mostly made of hydrogen and...|helium|🎈||iron,sand",
    "Saturn's rings are made of ice and...|rock pieces|🪐||solid gold,gas",
    "Saturn's biggest moon is...|Titan|🌑||Phobos,Io",
    "Which planet has the famous bright rings?|Saturn|🪐||Mars,Mercury",
    "Jupiter is a ___ giant.|gas|💨||rocky,water",
    "Could you stand on Jupiter's surface?|No, it has no solid ground|🚫||Yes it is rocky,Yes but only at night",
    "Four of Jupiter's big moons are Io, Europa, Ganymede and...|Callisto|🌑||Titan,Deimos"
  ], "Think about the two biggest planets and their special features."));
  a.push(L("Uranus and Neptune", [
    "Ice giants|🔵|<b>Uranus</b> and <b>Neptune</b> are called ice giants. They are made of water, ammonia and methane ices around a small rocky core, with hydrogen and helium on the outside. Methane gives them a blue color.",
    "Uranus|🌀|Uranus is tilted so far that it spins on its side. It was the first planet found with a telescope, in 1781. Its year lasts 84 Earth years.",
    "Neptune|🌬️|Neptune is the farthest planet from the Sun. It has the fastest winds of any planet. One year there lasts about 165 Earth years."
  ], [
    "Uranus and Neptune are called...|ice giants|🔵||gas dwarfs,rocky worlds",
    "Which planet spins on its side?|Uranus|🌀||Neptune,Venus",
    "Which planet is farthest from the Sun?|Neptune|🔵||Uranus,Saturn",
    "Which planet has the fastest winds?|Neptune|🌬️||Mars,Earth",
    "Uranus was the first planet found using a...|telescope|🔭||spaceship,satellite",
    "Methane gas gives these planets a ___ color.|blue|💙||red,yellow",
    "A year on Neptune is about...|165 Earth years|📅||1 Earth year,10 Earth days",
    "Uranus and Neptune are far from the Sun, so they are very...|cold|🥶||hot,close together",
    "Neptune is the ___ planet from the Sun.|eighth|8️⃣||fourth,second"
  ], "Think about which planets are blue and far away."));
  a.push(L("Star colors and Polaris", [
    "Star colors|🌟|Stars have different colors because they have different temperatures. Blue-white stars are the hottest. Yellow stars like our Sun are medium. Red stars are the coolest.",
    "Examples|🔴|<b>Betelgeuse</b> in the constellation Orion is a red star. <b>Rigel</b> in Orion is a hot blue-white star. Our Sun is a yellow-white star.",
    "The North Star|⭐|<b>Polaris</b>, the North Star, sits almost directly above the North Pole. It seems to stay still while other stars circle around it. The two end stars of the Big Dipper's cup point toward it."
  ], [
    "The hottest stars look...|blue-white|🔵||red,green",
    "The coolest stars look...|red|🔴||blue-white,purple",
    "Our Sun is a ___ star.|yellow-white|☀️||blue,red",
    "Star color shows a star's...|temperature|🌡️||age in years only,home city",
    "The North Star is called...|Polaris|⭐||Rigel,Sirius",
    "Polaris sits almost above the...|North Pole|🧭||equator,South Pole",
    "Which constellation holds Betelgeuse and Rigel?|Orion|🏹||Big Dipper,Leo",
    "Betelgeuse is a ___ star.|red|🔴||blue,white dwarf",
    "The Big Dipper helps you find...|Polaris|🔦||the Moon,Mars"
  ], "Think about a flame: which color is the hottest?"));
  a.push(L("Water pollution and clean water", [
    "Dirty water|🚯|<b>Water pollution</b> happens when harmful things get into rivers, lakes and oceans. Litter, oil, chemicals from farms and waste can all pollute water.",
    "Runoff|🌧️|Rain washes things off roads, farms and yards into streams. This is called <b>runoff</b>. It can carry fertilizer and trash into water.",
    "Cleaning water|🚰|A <b>water treatment plant</b> filters water and kills germs so it is safe to drink. You can help by never dumping things down storm drains and by picking up litter."
  ], [
    "Harmful things in rivers and oceans are called...|water pollution|🚯||water power,tides",
    "Rain washing things off the land into streams is called...|runoff|🌧️||evaporation,erosion",
    "A place that cleans drinking water is a water...|treatment plant|🚰||slide park,storm",
    "Which can pollute a river?|litter|🗑️||clean rain,fresh snow",
    "Storm drains lead to streams, so we should never dump...|trash or oil in them|🕳️||rain in them,leaves from a tree",
    "Water treatment filters water and kills...|germs|🦠||clouds,rocks",
    "Fertilizer from farms can wash into...|rivers|🌾||the Sun,the Moon",
    "Which helps keep water clean?|picking up litter|🧤||pouring oil on grass,throwing cans in a lake",
    "Is every clear stream safe to drink?|No it might hold germs|🧪||Yes always,Yes if it is cold"
  ], "Think about what gets in and what takes it out."));
  a.push(L("Landslides and avalanches", [
    "Falling slopes|⛰️|A <b>landslide</b> is when rock, soil and mud slide down a slope. Heavy rain, earthquakes and steep land can set one off. Tree roots help hold soil in place.",
    "Snow slides|🏔️|An <b>avalanche</b> is a mass of snow that slides down a mountain. A lot of new snow or a warm day can make snow loose.",
    "Staying safe|🦺|Hikers and skiers check avalanche warnings and stay out of danger zones. People near steep hills listen to warnings after heavy rain and move to safe ground."
  ], [
    "Rock, soil and mud sliding down a slope is a...|landslide|⛰️||tsunami,drought",
    "A mass of snow sliding down a mountain is an...|avalanche|🏔️||earthquake,eclipse",
    "A landslide can be set off by heavy...|rain|🌧️||sunshine,starlight",
    "What helps hold soil on a slope?|tree roots|🌳||bare dirt,loose sand",
    "Skiers can check an avalanche...|warning|⚠️||recipe,coin",
    "A very steep slope is ___ likely to slide.|more|⛰️||less,never",
    "Which can also cause a landslide?|an earthquake|🌍||a rainbow,a full Moon",
    "An avalanche is made of...|snow|❄️||lava,sand only",
    "After heavy rain on a steep hill, it is safest to...|follow warnings and move away|🦺||stand below the slope,play on the hill"
  ], "Think about what holds a slope together and what pulls it down."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[3], a[5], a[6], a[8], a[10], a[12], a[13], a[14], a[16]]));
  a.push(MIX("Level 10 Challenge", [a[2], a[4], a[7], a[9], a[11], a[12], a[13], a[14], a[15], a[17]]));

  // ================= LEVEL 11 =================
  const b = [];
  b.push(L("Heat waves and cold snaps", [
    "Extreme temperatures|🌡️|A <b>heat wave</b> is a long stretch of unusually hot weather. A <b>cold snap</b> is a short time of unusually cold weather.",
    "Staying safe in heat|🥤|In a heat wave, drink lots of water, rest in the shade or in cool buildings, and never leave anyone in a parked car. Wear light clothes.",
    "Staying safe in cold|🧣|In a cold snap, wear warm layers, a hat and gloves. Stay dry, because wet clothes make you colder. Check on neighbors who may need help."
  ], [
    "A long stretch of unusually hot weather is a...|heat wave|🌡️||cold snap,monsoon",
    "A short time of unusually cold weather is a...|cold snap|🥶||heat wave,monsoon",
    "In a heat wave you should drink lots of...|water|🥤||soda only,nothing",
    "In a heat wave it is best to rest in the...|shade|🌳||sun,hot car",
    "In the cold, wear several...|layers|🧥||sunglasses,swimsuits",
    "Wet clothes in the cold make you...|colder|💧||warmer,drier",
    "Never leave a child or a pet in a...|parked car|🚗||library,cool room",
    "Which is the best choice on a very hot day?|light clothes|👕||heavy coat,wool scarf",
    "Which is the best choice in a cold snap?|a warm hat|🧢||shorts,a thin shirt"
  ], "Think about how to keep your body temperature comfortable."));
  b.push(L("What air is made of", [
    "Gases|💨|Earth's air is a mix of gases. About 78 percent is <b>nitrogen</b>. About 21 percent is <b>oxygen</b>, the gas we need to breathe. The rest is argon, carbon dioxide, water vapor and tiny amounts of other gases.",
    "Needed by life|🌱|Plants take in <b>carbon dioxide</b> and give out oxygen when they make food. Animals, including people, breathe in oxygen and breathe out carbon dioxide.",
    "Air has weight|⚖️|Air is matter. It has mass and takes up space. The air above us presses down on everything. This is called <b>air pressure</b>."
  ], [
    "Most of Earth's air is...|nitrogen|💨||oxygen,carbon dioxide",
    "The gas we need to breathe is...|oxygen|🫁||nitrogen,argon",
    "About how much of air is oxygen?|21 percent|📊||78 percent,1 percent",
    "About how much of air is nitrogen?|78 percent|📊||21 percent,50 percent",
    "Plants take in...|carbon dioxide|🌱||nitrogen only,helium",
    "Plants give out...|oxygen|🌿||methane,smoke",
    "The weight of air pressing down is air...|pressure|⚖️||power,speed",
    "Air takes up space and has...|mass|🎈||no weight at all,only color",
    "People breathe out mostly...|carbon dioxide|😮‍💨||helium,rain"
  ], "Think about the two biggest parts of the air."));
  b.push(L("How clouds form", [
    "Rising air|☁️|Air that is warmed by the ground rises. As it goes up, it gets cooler. Cool air cannot hold as much water vapor.",
    "Dew point|🌡️|The temperature where air is full of water vapor and vapor starts to turn into drops is the <b>dew point</b>. Water condenses onto tiny specks of dust and salt, making cloud droplets.",
    "Many droplets|💧|A cloud is made of billions of tiny water drops or ice crystals. When the drops get big and heavy, they fall as rain or snow."
  ], [
    "Warm air near the ground tends to...|rise|⬆️||sink fast,stand still",
    "As air rises it gets...|cooler|🥶||warmer,heavier gold",
    "Water vapor turning into drops is...|condensation|💧||evaporation,melting",
    "Clouds are made of tiny water drops or...|ice crystals|❄️||smoke,cotton",
    "The temperature where vapor starts to condense is the...|dew point|🌡️||boiling point,melting point",
    "Cloud drops form around tiny specks of...|dust|🌫️||sugar,metal",
    "When cloud drops get big and heavy, they...|fall as rain or snow|🌧️||float forever,turn to smoke",
    "A cloud is made of billions of tiny...|droplets|☁️||fish,rocks",
    "Cool air holds ___ water vapor than warm air.|less|📉||more,exactly the same"
  ], "Follow the air as it goes up."));
  b.push(L("Temperature data", [
    "High, low and range|📈|The <b>high</b> is the warmest temperature in a day. The <b>low</b> is the coolest. The <b>range</b> is the high minus the low.",
    "The mean|➗|To find the <b>average</b> (mean), add the numbers and divide by how many there are. For 10, 12 and 14: 10 + 12 + 14 = 36, and 36 divided by 3 is 12.",
    "Trends|📉|A line graph shows how temperature changes over time. If the line goes up, it is getting warmer. If it goes down, it is getting cooler."
  ], [
    "High 24°C and low 15°C. What is the range?|9°C|🌡️||39°C,15°C",
    "High 30°C and low 18°C. What is the range?|12°C|🌡️||48°C,18°C",
    "High 8°C and low 2°C. What is the range?|6°C|🌡️||10°C,2°C",
    "The average of 10, 20 and 30 is...|20|➗||30,60",
    "The average of 4, 6, 8 and 10 is...|7|➗||8,28",
    "The average of 12 and 18 is...|15|➗||30,6",
    "On a line graph, a line going up means it is getting...|warmer|📈||cooler,rainier",
    "On a line graph, a line going down means it is getting...|cooler|📉||warmer,windier",
    "The warmest temperature in a day is the...|high|☀️||low,range"
  ], "Subtract for range. Add then divide for average."));
  b.push(L("Rivers and their parts", [
    "From start to end|🏞️|A river starts at its <b>source</b>, often in the mountains. It flows downhill and ends at its <b>mouth</b>, where it meets a lake or the sea. Small streams that join it are <b>tributaries</b>.",
    "Bends and floods|〰️|On flat land a river bends in big curves called <b>meanders</b>. When it floods, it spreads over the flat land beside it, called the <b>floodplain</b>, and drops rich soil.",
    "River mouth|🔺|At the mouth, a river slows down and drops its sand and mud. Sometimes this builds a fan-shaped area of land called a <b>delta</b>."
  ], [
    "Where a river begins is its...|source|🏔️||mouth,delta",
    "Where a river ends is its...|mouth|🌊||source,tributary",
    "A small stream that joins a bigger river is a...|tributary|🏞️||meander,delta",
    "Big curves in a river on flat land are...|meanders|〰️||deltas,waterfalls",
    "Flat land beside a river that floods is a...|floodplain|🌾||plateau,reef",
    "Land built from sand and mud at a river mouth is a...|delta|🔺||canyon,glacier",
    "Rivers flow...|downhill|⬇️||uphill,in circles forever",
    "A flood drops rich ___ on the floodplain.|soil|🌱||salt,glass",
    "Most rivers end by flowing into a lake or the...|sea|🌊||desert,volcano"
  ], "Think about a river's trip from start to finish."));
  b.push(L("Caves and sinkholes", [
    "Caves from water|🕳️|Some caves form in <b>limestone</b>. Rainwater is a little bit acidic, and over thousands of years it dissolves the rock and carves out holes. Land like this is called <b>karst</b>.",
    "Cave formations|🪨|Dripping water leaves behind minerals. <b>Stalactites</b> hang down from the ceiling. <b>Stalagmites</b> grow up from the floor. When they meet, they make a column.",
    "Sinkholes|⚠️|A <b>sinkhole</b> is a hole in the ground made when the roof of an underground space falls in. It can happen where water has dissolved the rock underneath."
  ], [
    "Many caves form in the rock called...|limestone|🪨||granite,obsidian",
    "Rainwater is slightly...|acidic|💧||sugary,salty like the sea",
    "A cave formation that hangs from the ceiling is a...|stalactite|🧊||stalagmite,geyser",
    "A cave formation that grows up from the floor is a...|stalagmite|🪨||stalactite,fossil",
    "When a stalactite and a stalagmite meet they make a...|column|🏛️||river,volcano",
    "A hole made when the ground above an empty space falls in is a...|sinkhole|🕳️||crater of the Moon,delta",
    "Land with caves and sinkholes is called...|karst|🏞️||tundra,delta",
    "Cave formations are made by dripping...|minerals|💧||sand,lava",
    "Caves take ___ to form.|thousands of years|⏳||a few minutes,one day"
  ], "Stalactites hold tight to the ceiling."));
  b.push(L("Shaping the coast", [
    "Waves at work|🌊|Waves crash against the shore all day. They wear down cliffs and can carve sea caves, arches and tall rock towers called <b>stacks</b>.",
    "Making beaches|🏖️|Waves also drop sand and pebbles. This builds beaches, <b>sandbars</b> and long thin <b>barrier islands</b> near the coast.",
    "Moving sand|➡️|Waves that hit the shore at an angle move sand along the coast. This is called <b>longshore drift</b>. People build walls to slow the loss of beach sand."
  ], [
    "Waves wear down cliffs by...|erosion|🌊||deposition,gravity",
    "A tall rock tower left by waves is a...|sea stack|🪨||sandbar,dune",
    "A ridge of sand built under or near the water is a...|sandbar|🏖️||sea arch,cave",
    "A long thin island of sand along a coast is a...|barrier island|🏝️||volcano island,glacier",
    "Waves that move sand along a shore cause...|longshore drift|➡️||erosion only,a tsunami",
    "Waves drop sand and pebbles, which is called...|deposition|🏖️||weathering,melting",
    "A rock bridge carved by waves is a sea...|arch|🌉||delta,peak",
    "Which is a coastal landform made by erosion?|sea cave|🕳️||sandbar,beach",
    "A beach is mostly made of sand and...|pebbles|🏖️||lava,clouds"
  ], "Erosion takes away. Deposition leaves behind."));
  b.push(L("Measuring earthquakes", [
    "Where it starts|📍|The place underground where an earthquake begins is the <b>focus</b>. The spot on the surface right above it is the <b>epicenter</b>.",
    "Waves and instruments|📈|Earthquakes send out <b>seismic waves</b>. A <b>seismograph</b> records them. The faster <b>P waves</b> arrive first, then the slower <b>S waves</b>.",
    "Size|🔢|<b>Magnitude</b> tells how big an earthquake is. Each whole number up means about 10 times more ground shaking. A magnitude 6 shakes the ground about 10 times more than a magnitude 5."
  ], [
    "The place underground where an earthquake starts is the...|focus|📍||epicenter,fault line",
    "The spot on the surface above the focus is the...|epicenter|📍||focus,crater",
    "An instrument that records earthquake waves is a...|seismograph|📈||barometer,telescope",
    "Earthquake waves are called ___ waves.|seismic|🌍||tidal,sound only",
    "The waves that arrive first are the...|P waves|1️⃣||S waves,radio waves",
    "How big an earthquake is, is its...|magnitude|🔢||epicenter,focus",
    "A magnitude 6 shakes the ground about ___ times more than a 5.|10|🔢||2,100",
    "A scientist who studies earthquakes is a...|seismologist|👩‍🔬||meteorologist,astronomer",
    "Which is the surface point right above where the quake begins?|epicenter|🎯||seismograph,magnitude"
  ], "Focus is deep. Epicenter is on top."));
  b.push(L("Volcano hazards", [
    "More than lava|🌋|A volcano can send out lava, ash, gas and rock. <b>Lava</b> flows slowly, so people can usually move away. Ash can fall far away and cover roofs and fields.",
    "Fast dangers|💨|A <b>pyroclastic flow</b> is a fast cloud of hot gas and rock that rushes down a volcano. A <b>lahar</b> is a fast flow of mud and water made when ash mixes with rain or melting snow.",
    "Staying safe|📻|Volcanologists watch for small earthquakes and swelling ground. When a warning comes, listen to the authorities and evacuate early."
  ], [
    "A fast flow of mud and water from a volcano is a...|lahar|🌋||tsunami,geyser",
    "A fast cloud of hot gas and rock is a ___ flow.|pyroclastic|💨||glacial,tidal",
    "Melted rock that flows from a volcano is...|lava|🌋||ash,gas",
    "Tiny bits of rock thrown into the air are...|ash|🌫️||lava,pearls",
    "A scientist who studies volcanoes is a...|volcanologist|👩‍🔬||astronomer,botanist",
    "Before an eruption the ground may...|swell and shake|📈||turn blue,freeze",
    "When a warning comes you should...|evacuate early|🚗||wait and watch,climb the volcano",
    "Which is usually slowest?|lava flow|🐢||pyroclastic flow,lahar",
    "A lahar is made when ash mixes with...|rain or melting snow|🌧️||dry sand,sunlight"
  ], "Think about which hazards move fast and which move slowly."));
  b.push(L("Fossil clues", [
    "Kinds of fossils|🦴|Body fossils are bones, teeth and shells. <b>Trace fossils</b> show what an animal did, such as footprints, burrows and nests. A <b>mold</b> is a hollow shape. A <b>cast</b> is made when the hollow fills with minerals.",
    "Special fossils|🍯|Insects can be caught in <b>amber</b>, hardened tree sap. In <b>petrified wood</b>, minerals slowly replace the wood and turn it to stone.",
    "Where to look|🏜️|Most fossils are found in <b>sedimentary rock</b>, because animals were buried gently by mud and sand. Fossils help us learn how life and places changed."
  ], [
    "Footprints and burrows are called...|trace fossils|🐾||body fossils,molds only",
    "Hardened tree sap that traps insects is...|amber|🍯||coal,marble",
    "Wood turned to stone is...|petrified wood|🪵||charcoal,driftwood",
    "A hollow shape left by a shell is a...|mold|🐚||cast,crystal",
    "A mold filled with minerals makes a...|cast|🐚||stalactite,delta",
    "Most fossils are found in ___ rock.|sedimentary|🪨||igneous,volcanic only",
    "A fossil footprint tells us...|how an animal moved|🐾||what color it was,its name",
    "A scientist who studies fossils is a...|paleontologist|🦴||meteorologist,volcanologist",
    "Which is a body fossil?|a fossil tooth|🦷||a footprint,a burrow"
  ], "Body fossils are parts. Trace fossils are signs."));
  b.push(L("Dinosaurs and extinction", [
    "The age of dinosaurs|🦕|Dinosaurs lived in the Mesozoic Era, from about 250 to 66 million years ago. Some were bigger than a bus, and some were as small as a chicken.",
    "A sudden change|☄️|About 66 million years ago, most dinosaurs died out. Scientists think a huge space rock hit Earth and changed the climate. The crater is under Mexico.",
    "Still here|🐦|Not all dinosaurs vanished. Birds are living relatives of dinosaurs. Fossils such as feathered dinosaurs show this link."
  ], [
    "Dinosaurs died out about ___ years ago.|66 million|🦕||66 thousand,6 billion",
    "Dinosaurs lived in the...|Mesozoic Era|🦖||Ice Age only,Space Age",
    "Scientists think a huge ___ hit Earth.|space rock|☄️||volcano ball,iceberg",
    "The crater from that impact is under...|Mexico|🗺️||Egypt,Japan",
    "A living group related to dinosaurs is the...|birds|🐦||frogs,sharks",
    "All dinosaurs were as big as a bus.|False|🦕||True,True for all",
    "An extinct animal is one that...|has died out forever|⌛||lives in a zoo,hides well",
    "Humans lived at the same time as the dinosaurs.|False|🧑||True,True in Asia",
    "Scientists learn about dinosaurs from...|fossils|🦴||legends only,photographs"
  ], "Think about how we know about animals from long ago."));
  b.push(L("Soil and farming", [
    "Soil layers help crops|🌾|Plants grow best in rich <b>topsoil</b>, which holds <b>humus</b>, bits of rotted plants and animals. It also holds water and air.",
    "Care for the land|🚜|Farmers add <b>fertilizer</b> to give plants nutrients and rotate crops so the soil does not wear out. They plant in rows that follow the slope, called <b>contour farming</b>, to slow runoff.",
    "Save the soil|🌱|Without plants, wind and rain carry soil away. Cover crops and terraces on hills hold it in place."
  ], [
    "The best layer for growing crops is the...|topsoil|🌱||bedrock,subsoil",
    "Rotted plants and animals in soil are called...|humus|🍂||gravel,salt",
    "Something that adds nutrients to soil is...|fertilizer|🌾||bedrock,wind",
    "Changing the crop planted each year is crop...|rotation|🔄||erosion,melting",
    "Planting in rows that follow the slope is ___ farming.|contour|〰️||straight-up,desert",
    "Steps cut into a hillside to hold soil are...|terraces|🏞️||dunes,caves",
    "Bare soil is easily carried away by wind and...|rain|🌧️||starlight,magnets",
    "Cover crops help by...|holding soil in place|🌿||melting soil,burning soil",
    "Soil that has lost its nutrients can be helped by...|fertilizer|🌾||more wind,paint"
  ], "Think about keeping soil rich and keeping it from washing away."));
  b.push(L("Exploring the Moon", [
    "First steps|👨‍🚀|In 1969, <b>Apollo 11</b> landed the first people on the Moon. Neil Armstrong and Buzz Aldrin walked there. Between 1969 and 1972, twelve astronauts walked on the Moon.",
    "Moon gravity|⚖️|The Moon has about one sixth of Earth's gravity. Astronauts could jump high and bounce. They brought back rocks, which taught us the Moon is about 4.5 billion years old.",
    "Going back|🚀|NASA's <b>Artemis</b> program aims to send people back to the Moon. Other countries are sending robot probes too."
  ], [
    "The first people landed on the Moon in...|1969|📅||1869,1999",
    "The first landing mission was called Apollo...|11|🚀||1,50",
    "How many astronauts walked on the Moon?|12|👨‍🚀||2,100",
    "Moon gravity is about ___ of Earth's.|one sixth|⚖️||twice,the same as",
    "Astronauts on the Moon could...|jump very high|🦘||float away,not move",
    "Astronauts brought back Moon...|rocks|🪨||clouds,water ponds",
    "The Moon is about ___ years old.|4.5 billion|🌑||4.5 thousand,45",
    "The program to go back to the Moon is called...|Artemis|🚀||Sputnik,Voyager",
    "On the Moon, footprints last a very long time because there is no...|wind|🌑||gravity,dust"
  ], "Think about the numbers and names from the Moon landings."));
  b.push(L("Satellites and space stations", [
    "Satellites|🛰️|A <b>satellite</b> is any object that circles a planet. The Moon is a natural satellite. Many satellites are made by people. <b>Sputnik 1</b>, in 1957, was the first.",
    "What they do|📡|Satellites help with weather forecasts, GPS maps, TV and phone signals, and photos of Earth that show changes in forests and ice.",
    "Space station|🏠|The <b>International Space Station (ISS)</b> orbits about 400 km above Earth. It circles the planet about every 90 minutes, so astronauts see about 16 sunrises a day. Many countries built it together."
  ], [
    "An object that circles a planet is a...|satellite|🛰️||comet,asteroid",
    "The first human-made satellite was...|Sputnik 1|🛰️||Apollo 11,Hubble",
    "The system that tells your location is...|GPS|📍||ISS,NASA",
    "The ISS stands for International Space...|Station|🏠||Ship,Satellite",
    "The ISS circles Earth about every...|90 minutes|⏱️||24 hours,one year",
    "The Moon is a ___ satellite.|natural|🌑||human-made,fake",
    "Weather satellites help with weather...|forecasts|🌤️||cooking,clothing",
    "The ISS orbits about ___ above Earth.|400 km|🛰️||40 km,4000 km",
    "The ISS was built by...|many countries together|🌐||one person,only the Moon"
  ], "Think about what orbits what."));
  b.push(L("The Sun's surface", [
    "Layers and heat|☀️|The Sun's core is about 15 million °C. Its surface is about 5,500°C. The glowing surface is the <b>photosphere</b>, and its thin outer air is the <b>corona</b>.",
    "Sunspots and flares|🌑|<b>Sunspots</b> are darker, cooler patches on the surface. A <b>solar flare</b> is a sudden burst of energy. Sunspots and flares are stronger and weaker in cycles of about 11 years.",
    "Safety|🕶️|Never look straight at the Sun. Even a short look can hurt your eyes. Scientists use special filters and telescopes to study it."
  ], [
    "Darker, cooler patches on the Sun are...|sunspots|🌑||craters,seas",
    "A sudden burst of energy from the Sun is a solar...|flare|⚡||eclipse,wave",
    "The glowing surface of the Sun is the...|photosphere|☀️||corona,core",
    "The thin outer air of the Sun is the...|corona|👑||core,crust",
    "The hottest part of the Sun is the...|core|🔥||corona,sunspot",
    "Sunspots are cooler than the rest of the Sun's...|surface|🌑||core,gas giants",
    "You should never look straight at the...|Sun|🕶️||Moon,rainbow",
    "Sunspot activity changes in cycles of about...|11 years|📅||11 days,1100 years",
    "Special filters are used to study the Sun...|safely|🔭||quickly,at night"
  ], "Think about hot, hotter and hottest."));
  b.push(L("Brightness and distance of stars", [
    "Why stars look different|🌟|Some stars look bright because they are close. Some look bright because they are truly huge and powerful. A very bright star can look faint if it is very far away.",
    "The nearest stars|🔭|The Sun is the nearest star. The next nearest is <b>Proxima Centauri</b>, about 4.2 light-years away. <b>Sirius</b> is the brightest star in our night sky.",
    "Measuring|📏|A <b>light-year</b> is a distance, not a time. It is how far light travels in a year, about 9.5 trillion kilometers."
  ], [
    "The nearest star to Earth is...|the Sun|☀️||Sirius,Polaris",
    "The next nearest star after the Sun is...|Proxima Centauri|⭐||Sirius,Rigel",
    "The brightest star in our night sky is...|Sirius|✨||Betelgeuse,Polaris",
    "A light-year measures...|distance|📏||time,brightness",
    "Proxima Centauri is about ___ light-years away.|4.2|🔭||42,0.4",
    "A star can look faint because it is...|very far away|🔭||too cold to exist,inside a cloud forever",
    "A closer star looks ___ than the same star far away.|brighter|💡||fainter,bluer",
    "A light-year is about ___ km.|9.5 trillion|🔢||9.5 thousand,9.5 million",
    "Light travels ___ in space.|very fast|⚡||slowly,not at all"
  ], "Light-year is a length, like a kilometer, but much bigger."));
  b.push(L("Daylight around the world", [
    "Near the equator|📍|Places near the equator have about 12 hours of daylight all year. Their temperature changes little. They have wet and dry seasons instead of hot and cold ones.",
    "Near the poles|🧊|Inside the Arctic Circle and Antarctic Circle there is a <b>midnight sun</b> in summer, when the Sun does not set for days or months. In winter there is a <b>polar night</b> with no sunrise.",
    "Opposite seasons|🔄|The Northern and Southern Hemispheres have opposite seasons. In Australia, December is in the middle of summer."
  ], [
    "Near the equator, daylight is about ___ all year.|12 hours|📍||2 hours,24 hours",
    "The Sun stays up for days in summer near the poles. This is called the...|midnight sun|🌞||polar night,eclipse",
    "Months of darkness in a polar winter are the...|polar night|🌑||midnight sun,equinox",
    "December in Australia is...|summer|🏖️||winter,monsoon only",
    "When it is winter in the north, the south has...|summer|🔄||winter,no season",
    "Near the equator, seasons are mostly wet and...|dry|🌴||frozen,snowy",
    "The circles near the poles are called the Arctic and...|Antarctic circles|🧊||Pacific circles,Equator lines",
    "The place with the most steady day length is the...|equator|📍||North Pole,South Pole",
    "In the Arctic summer the Sun can stay up for...|days|☀️||seconds,no time"
  ], "Think about how the tilt matters more near the poles."));
  b.push(L("Tides and the Moon", [
    "Two tides a day|🌊|<b>Tides</b> are the slow rise and fall of the sea. Most places have two high tides and two low tides each day. High tide to the next high tide takes about 12 hours and 25 minutes.",
    "The pull of the Moon|🌑|The Moon's gravity pulls on the ocean and makes the water bulge on the side facing the Moon. A second bulge forms on the opposite side of Earth. As Earth spins, coasts move through the bulges.",
    "Spring and neap|⚖️|At new Moon and full Moon, the Sun and Moon line up and make extra-big tides called <b>spring tides</b>. At the quarter Moons, they pull in different directions and make smaller <b>neap tides</b>."
  ], [
    "The slow rise and fall of the sea is the...|tide|🌊||wave,current",
    "Most places have how many high tides a day?|2|2️⃣||1,6",
    "What mostly causes tides?|the Moon's gravity|🌑||the wind,fish swimming",
    "Extra-big tides are called...|spring tides|🌊||neap tides,rip tides",
    "Smaller tides are called...|neap tides|🌊||spring tides,king waves",
    "Spring tides happen at new Moon and...|full Moon|🌕||quarter Moon,half Moon only",
    "Neap tides happen at the...|quarter Moons|🌓||full Moon,new Moon",
    "The Sun also affects tides but its pull is...|weaker than the Moon's|☀️||stronger than the Moon's,zero",
    "Water bulges on the side of Earth facing the Moon and on the...|opposite side|🌍||north pole only,same side only"
  ], "Think about what pulls the water and when the Sun and Moon line up."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[4], b[6], b[7], b[9], b[11], b[12], b[13], b[14], b[16]]));
  b.push(MIX("Level 11 Challenge", [b[2], b[5], b[8], b[10], b[13], b[14], b[15], b[16], b[17], b[1]]));

  // ================= LEVEL 12 =================
  const c = [];
  c.push(L("Microclimates and mountains", [
    "Small climates|🏙️|A <b>microclimate</b> is the climate of a small area that differs from the area around it. A city is often warmer than the countryside, because roads and buildings hold heat. This is the <b>urban heat island</b>.",
    "Going up|🏔️|The higher you climb a mountain, the colder it gets. Air higher up is thinner and cannot hold heat well. Mountain tops can have snow even near the equator.",
    "Rain shadow|🌧️|Wind pushes moist air up one side of a mountain. The air cools and drops rain there. The other side, called the <b>rain shadow</b>, gets dry air and little rain."
  ], [
    "The climate of a small area that differs from nearby is a...|microclimate|🏙️||biome,rain shadow",
    "A city that is warmer than the countryside is an urban heat...|island|🏙️||wave,front",
    "Cities hold heat because of roads and...|buildings|🏢||forests,rivers",
    "As you climb a mountain the temperature gets...|colder|🏔️||warmer,hotter then colder",
    "The dry side of a mountain, away from the wind, is the rain...|shadow|🌵||front,gauge",
    "Moist air pushed up a mountain drops its rain on the...|windward side|🌧️||leeward side,summit only",
    "A place near a big ocean usually has a ___ climate.|milder|🌊||more extreme,windless",
    "Mountain tops near the equator can still have...|snow|🏔️||tundra animals only,deserts",
    "Thinner air higher up is ___ at holding heat.|worse|📉||better,the same"
  ], "Think about what changes with height and with buildings."));
  c.push(L("Fresh water and conservation", [
    "Where water is|💧|About 97 percent of Earth's water is salty ocean. Only about 3 percent is fresh, and most of that is frozen in ice sheets and glaciers. Only a tiny part is in lakes, rivers and underground.",
    "Underground|🪣|Water stored in underground rock and soil is <b>groundwater</b>. A layer of rock that holds it is an <b>aquifer</b>. People pump it up with wells.",
    "Saving water|🚿|We use fresh water for drinking, farms and factories. Fix leaks, take shorter showers and water plants wisely. In some places, <b>desalination</b> removes salt from sea water."
  ], [
    "About how much of Earth's water is salty?|97 percent|🌊||50 percent,3 percent",
    "Most of Earth's fresh water is stored in...|ice sheets and glaciers|🧊||rivers,clouds",
    "Water stored underground is called...|groundwater|🪣||runoff,rain",
    "A rock layer that holds groundwater is an...|aquifer|🪨||atoll,archipelago",
    "Removing salt from sea water is...|desalination|🧂||evaporation,erosion",
    "Which saves water?|fixing a leaky tap|🔧||leaving the hose on,washing a car daily",
    "People pump groundwater up with a...|well|⛲||kite,ladder",
    "Lakes and rivers hold only a ___ part of all water.|tiny|💧||huge,half",
    "Fresh water is used for drinking, farming and...|factories|🏭||sea salt,Moon travel"
  ], "Think about how much of the water is fresh."));
  c.push(L("Wildfires", [
    "Fire needs three things|🔥|Fire needs <b>fuel</b>, <b>heat</b> and <b>oxygen</b>. This is the fire triangle. Take away any one and the fire goes out.",
    "How they start|🌲|Lightning can start a wildfire. Most are started by people who are careless with campfires or fireworks. Dry weather, wind and dry plants make a fire spread fast.",
    "Help and safety|🧑‍🚒|Firefighters make <b>firebreaks</b>, strips with no plants, to stop fires. Some forests need small fires to grow new plants. If a wildfire is near, follow the evacuation orders."
  ], [
    "Fire needs heat, oxygen and...|fuel|🔥||water,snow",
    "Taking away one part of the fire triangle will...|put the fire out|🧯||make it bigger,do nothing",
    "A strip cleared of plants to slow a fire is a...|firebreak|🚧||fire wall of ice,moat",
    "Which can start a wildfire naturally?|lightning|⚡||snowfall,tides",
    "Wildfires spread faster when plants are...|dry|🍂||wet,frozen",
    "Most wildfires are started by...|people|🏕️||the Moon,earthquakes",
    "A campfire should be put out with water and...|checked until cold|🏕️||left to burn,covered with leaves",
    "If a wildfire is close, you should...|follow evacuation orders|🚗||go closer to look,hide in the garden",
    "Some forests need small fires to...|grow new plants|🌱||make clouds,make rock"
  ], "Remember the fire triangle."));
  c.push(L("Hurricane anatomy", [
    "Birth of a hurricane|🌀|A hurricane forms over warm ocean water, at least 26.5°C. Warm, wet air rises, spins and builds a huge storm. When it moves over land or cold water, it weakens.",
    "Parts|👁️|The <b>eye</b> is the calm center. The <b>eyewall</b>, the ring around the eye, has the strongest winds and rain. Rainbands spiral outward.",
    "Scale and surge|📏|The <b>Saffir-Simpson scale</b> rates hurricanes from category 1 to 5 by wind speed. <b>Storm surge</b>, sea water pushed onto land, is often the most dangerous part. Near Asia, the same storm is a <b>typhoon</b>."
  ], [
    "The calm center of a hurricane is the...|eye|👁️||eyewall,rainband",
    "The ring with the strongest winds is the...|eyewall|🌀||eye,tail",
    "Hurricanes form over warm...|ocean water|🌊||desert sand,mountains",
    "A hurricane weakens over...|land|🏞️||warm ocean,warm gulf",
    "Hurricanes are rated by the ___ scale.|Saffir-Simpson|📏||Mohs,Richter",
    "Hurricane categories go from 1 to...|5|5️⃣||3,10",
    "Sea water pushed onto land by a storm is a storm...|surge|🌊||eye,front",
    "A hurricane near Asia is called a...|typhoon|🌀||volcano,monsoon",
    "The hurricane scale is based on...|wind speed|💨||rainfall only,temperature"
  ], "Think about the middle of a spinning storm."));
  c.push(L("Tornadoes", [
    "How they form|🌪️|A <b>tornado</b> is a spinning column of air that touches the ground. Most come from strong thunderstorms called supercells. The central United States, called Tornado Alley, has many.",
    "Measuring|📏|The <b>Enhanced Fujita (EF) scale</b> rates tornadoes from EF0 to EF5 using the damage they cause. A spinning column that does not reach the ground is a <b>funnel cloud</b>.",
    "Watch or warning|📻|A <b>tornado watch</b> means conditions could make a tornado. A <b>tornado warning</b> means one is happening or is about to. Go to the lowest floor, to an inside room away from windows."
  ], [
    "A spinning column of air that touches the ground is a...|tornado|🌪️||hurricane,wave",
    "A spinning column that does not touch the ground is a...|funnel cloud|🌪️||fog,rainbow",
    "Tornadoes are rated on the...|Enhanced Fujita scale|📏||Mohs scale,Beaufort scale of tides",
    "The highest tornado rating is...|EF5|5️⃣||EF1,EF10",
    "A tornado ___ means a tornado is happening or about to.|warning|🚨||watch,hint",
    "A tornado ___ means a tornado could form.|watch|👀||warning,party",
    "In a tornado warning you should go to...|an inside room on the lowest floor|🏠||the roof,a window",
    "Most tornadoes come from strong...|thunderstorms|⛈️||snowstorms,sea breezes",
    "The tornado scale rates a tornado by its...|damage|📏||color,size of the cloud only"
  ], "Watch means be ready. Warning means act now."));
  c.push(L("Waves and tsunamis", [
    "Ocean waves|🌊|Most waves are made by wind. A wave has a <b>crest</b> (the top) and a <b>trough</b> (the bottom). The <b>wavelength</b> is the distance from one crest to the next.",
    "Tsunamis|⚠️|A <b>tsunami</b> is a giant wave made by an underwater earthquake, volcano or landslide. It has a very long wavelength. Out at sea it may be hardly noticed, but near shore it grows tall. It is not caused by wind or the tides.",
    "Staying safe|🚨|Before a tsunami the water may pull back far from the shore. This is a warning. Move to high ground right away and listen to sirens and alerts."
  ], [
    "The top of a wave is the...|crest|🌊||trough,floor",
    "The bottom of a wave is the...|trough|🌊||crest,tide",
    "The distance from one crest to the next is the...|wavelength|📏||frequency,shore",
    "Most ocean waves are made by...|wind|💨||fish,magnets",
    "A giant wave from an undersea earthquake is a...|tsunami|🌊||tide,ripple",
    "A tsunami is not caused by...|wind|🚫||earthquakes,landslides",
    "A warning sign of a tsunami is water pulling back from...|the shore|🏖️||the sky,the Sun",
    "When a tsunami alert comes you should go to...|high ground|⛰️||the beach to look,a boat",
    "Near the shore a tsunami grows...|taller|⬆️||shorter,invisible"
  ], "Think about what starts a tsunami."));
  c.push(L("Ocean zones", [
    "Going down|🤿|The ocean has zones by depth. The <b>sunlight zone</b> goes from the top to about 200 meters, where most sea life lives. The <b>twilight zone</b> is dim, to about 1,000 meters.",
    "Deep dark|🌑|Below that is the <b>midnight zone</b>, where there is no sunlight at all. The water is very cold and the pressure is huge. Some animals there make their own light, which is called <b>bioluminescence</b>.",
    "Deepest|🕳️|The deepest place is the <b>Mariana Trench</b> in the Pacific Ocean, nearly 11 kilometers down. Pressure grows with depth, so special submarines are needed to go there."
  ], [
    "Most sea life lives in the ___ zone.|sunlight|☀️||midnight,twilight",
    "The dim zone below the sunlight zone is the...|twilight zone|🌅||sunlight zone,surface",
    "The zone with no sunlight at all is the...|midnight zone|🌑||sunlight zone,tropic zone",
    "Making your own light, like some deep fish, is...|bioluminescence|✨||hibernation,photosynthesis",
    "The deepest place in the ocean is the...|Mariana Trench|🕳️||Grand Canyon,Great Lakes",
    "The Mariana Trench is in the ___ Ocean.|Pacific|🌊||Atlantic,Arctic",
    "As you go deeper, pressure...|increases|📈||decreases,stays zero",
    "As you go deeper, the water gets...|colder|🥶||warmer,sweeter",
    "Plants cannot grow in the midnight zone because there is no...|sunlight|☀️||water,salt"
  ], "Think about how light fades with depth."));
  c.push(L("Ice ages", [
    "Big freezes|🧊|An <b>ice age</b> is a long period when Earth is colder and huge ice sheets cover large parts of the land. There have been many. The last big glacial period ended about 11,700 years ago.",
    "What ice did|🏔️|Ice sheets covered much of Canada, the northern United States and northern Europe. So much water was frozen that sea level was lower. Moving glaciers carved U-shaped valleys and helped to make the Great Lakes.",
    "Ice age life|🦣|Woolly mammoths lived in the cold lands of the last ice age. Scientists learn about ice ages from ice cores, long tubes of ice drilled out of glaciers."
  ], [
    "A long period when ice sheets cover large parts of the land is an...|ice age|🧊||heat wave,monsoon",
    "The last glacial period ended about ___ years ago.|11700|📅||117000,1170",
    "During an ice age sea level was...|lower|🌊||higher,the same",
    "Glaciers carved valleys shaped like the letter...|U|🏔️||V,X",
    "Glaciers helped to make the...|Great Lakes|🏞️||Sahara,Mariana Trench",
    "A huge furry animal of the last ice age was the woolly...|mammoth|🦣||fox,lion",
    "Scientists drill tubes of ice called ice...|cores|🧊||cubes,bergs",
    "Ice sheets covered much of northern...|Europe|🗺️||Africa,the equator",
    "So much water was frozen in ice that sea level...|dropped|📉||rose,hid"
  ], "Water locked in ice cannot be in the sea."));
  c.push(L("Identifying minerals", [
    "Mineral detective|🔎|Scientists use several tests together: hardness, streak, luster, cleavage and color. One test is not always enough.",
    "Special minerals|💎|<b>Quartz</b> is very common, hard (7) and glassy. <b>Gypsum</b> is soft (2) and can be scratched by a fingernail. <b>Halite</b> is rock salt and tastes salty. <b>Mica</b> splits into thin, shiny sheets.",
    "Uses|🧂|Quartz is used in watches and glass. Gypsum is used in plasterboard for walls. Halite is table salt. Graphite, a very soft mineral, is the dark part in a pencil."
  ], [
    "A soft mineral that a fingernail can scratch is...|gypsum|🧱||quartz,diamond",
    "The mineral that splits into thin shiny sheets is...|mica|📄||halite,quartz",
    "Rock salt is the mineral...|halite|🧂||mica,gypsum",
    "A very common hard glassy mineral is...|quartz|💎||talc,graphite",
    "The dark part of a pencil is the soft mineral...|graphite|✏️||gold,mica",
    "Gypsum is used in...|plasterboard for walls|🏠||jewelry for kings,pencils",
    "To identify a mineral you should use...|several tests|🔎||color only,one guess",
    "Quartz has a hardness of about...|7|7️⃣||2,10",
    "Why is color not a perfect clue?|The same mineral can come in different colors|🎨||Minerals have no color,Color never changes"
  ], "No one test tells the whole story."));
  c.push(L("Rocks in our world", [
    "Rocks we use|🏛️|<b>Granite</b> is an igneous rock used in countertops and buildings. <b>Limestone</b> is a sedimentary rock used in buildings, and the Great Pyramid of Giza is made mostly of it. <b>Marble</b> is metamorphic and used for statues.",
    "More uses|🧱|<b>Slate</b> is a metamorphic rock that splits into flat sheets, used for roofs. <b>Sandstone</b> is a sedimentary rock used for walls. Gravel and crushed rock go into concrete and roads.",
    "Matching|🔗|Marble starts as limestone that has been heated and squeezed deep in the Earth. Slate starts as shale. This is metamorphism."
  ], [
    "Marble starts as...|limestone|🏛️||granite,sandstone",
    "Slate starts as...|shale|📄||marble,basalt",
    "Granite is an ___ rock.|igneous|🌋||sedimentary,metamorphic",
    "Limestone is a ___ rock.|sedimentary|🪨||igneous,metamorphic",
    "Marble is a ___ rock.|metamorphic|🏛️||igneous,sedimentary",
    "A rock often used for statues is...|marble|🗿||pumice,sandstone",
    "A rock that splits into flat sheets for roofs is...|slate|🏠||granite,gravel",
    "The Great Pyramid of Giza is made mostly of...|limestone|🔺||glass,ice",
    "Crushed rock is used in roads and...|concrete|🛣️||clouds,paper"
  ], "Use the rock cycle: heat and squeeze changes a rock."));
  c.push(L("Dating rocks and fossils", [
    "Relative age|📚|Layers of rock pile up like pages in a stack. The oldest layer is usually at the bottom and the youngest is at the top. This is the <b>law of superposition</b>.",
    "Actual age|⏳|Some atoms in rocks are <b>radioactive</b>, which means they slowly change into other atoms at a steady rate. By measuring this, scientists find a rock's age in years. This is <b>radiometric dating</b>. Carbon dating works for things that were once alive, up to about 50,000 years old.",
    "How old is Earth?|🌍|Using these methods, scientists have found that Earth is about <b>4.5 billion</b> years old."
  ], [
    "In undisturbed rock layers, the oldest layer is usually at the...|bottom|⬇️||top,middle",
    "In undisturbed rock layers, the youngest layer is usually at the...|top|⬆️||bottom,center",
    "The idea that lower layers are older is the law of...|superposition|📚||gravity,erosion",
    "Dating that uses radioactive atoms is ___ dating.|radiometric|⚛️||tidal,musical",
    "Carbon dating works for things that were once...|alive|🌿||melted,frozen forever",
    "Earth is about ___ years old.|4.5 billion|🌍||4.5 million,450",
    "Carbon dating works up to about...|50,000 years|⏳||50 years,5 billion years",
    "Radioactive atoms change at a ___ rate.|steady|⏱️||random,different every day",
    "Counting tree rings tells a tree's age in...|years|🌳||inches only,feet"
  ], "Stack of pages: the one at the bottom went down first."));
  c.push(L("Waste and recycling", [
    "Where garbage goes|🗑️|Most trash goes to a <b>landfill</b>, a big pit lined with layers to keep harmful liquids out of the ground. Landfills fill up, and trash there breaks down very slowly.",
    "Compost and recycle|♻️|Food scraps and leaves can be turned into <b>compost</b>, a rich soil helper. Paper, glass, metal and some plastics can be recycled into new things, which saves energy and raw materials.",
    "Better habits|🌍|A big part of plastic ends up in the ocean and can hurt sea life. Choose reusable bottles and bags, repair things and buy only what you need."
  ], [
    "A big pit where trash is buried is a...|landfill|🗑️||compost heap,quarry",
    "Food scraps that turn into rich soil are called...|compost|🍂||plastic,metal",
    "Recycling saves energy and ___ materials.|raw|♻️||fake,frozen",
    "Which can be composted?|banana peel|🍌||glass jar,metal can",
    "Which can usually be recycled?|aluminum can|🥫||used tissue,food scrap",
    "Plastic in the ocean can hurt...|sea life|🐢||the Moon,mountains",
    "A reusable bottle helps by creating less...|waste|🚰||water,wind",
    "A landfill is lined to keep harmful liquids out of the...|ground|🌎||sky,sea only",
    "The best way to make less trash is to...|use things again|🔁||throw things more,buy extras"
  ], "Think about a thing going round again instead of away."));
  c.push(L("Comparing the planets", [
    "Distance from the Sun|📏|The planets in order from the Sun are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Farther planets are colder and take much longer to orbit.",
    "Four rocky, four giant|🪐|The four inner planets are small and rocky. The four outer planets are giants: Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants.",
    "Days and years|⏰|A <b>day</b> is how long a planet takes to spin once. A <b>year</b> is how long it takes to orbit the Sun. Jupiter spins fast: its day is about 10 hours. Venus spins slowly: its day is longer than its year."
  ], [
    "The planet with the shortest year is...|Mercury|☿️||Neptune,Earth",
    "The planet with the longest year is...|Neptune|🔵||Mercury,Mars",
    "The two gas giants are Jupiter and...|Saturn|🪐||Uranus,Mars",
    "The two ice giants are Uranus and...|Neptune|🔵||Jupiter,Venus",
    "The fastest-spinning planet (about a 10 hour day) is...|Jupiter|🟠||Venus,Mercury",
    "The planet whose day is longer than its year is...|Venus|🟡||Earth,Mars",
    "A planet's year is the time it takes to...|orbit the Sun|🌞||spin once,cross the sky",
    "A planet's day is the time it takes to...|spin once|🔄||orbit the Sun,heat up",
    "Farther planets take ___ to orbit.|longer|⏳||less time,the same time"
  ], "Day is spin. Year is orbit."));
  c.push(L("Robots on Mars and beyond", [
    "Rovers|🤖|A <b>rover</b> is a robot vehicle that drives over another world. NASA's Mars rovers include Sojourner (1997), Spirit and Opportunity (2004), Curiosity (2012) and Perseverance (2021). Perseverance carried a small helicopter named Ingenuity.",
    "Probes|🛸|A <b>probe</b> is a spacecraft without people. The two <b>Voyager</b> probes were launched in 1977 and visited the outer planets. Voyager 1 has now left the solar system and is in interstellar space.",
    "Telescopes in space|🔭|The <b>Hubble Space Telescope</b> (1990) sees the sky from above the air. The <b>James Webb Space Telescope</b> (2021) uses infrared light to look at very distant, old galaxies."
  ], [
    "A robot vehicle that drives on another world is a...|rover|🤖||satellite,comet",
    "The helicopter that flew on Mars was named...|Ingenuity|🚁||Voyager,Hubble",
    "The Mars rover launched in 2011 and landing in 2012 is...|Curiosity|🔍||Sojourner,Perseverance",
    "Spacecraft without people are called...|probes|🛸||crews,stations",
    "The Voyager probes were launched in...|1977|📅||1777,2017",
    "Voyager 1 is now in...|interstellar space|🌌||Earth's orbit,the Moon's orbit",
    "The telescope launched in 1990 is the...|Hubble|🔭||Webb,Spirit",
    "The telescope that uses infrared light is the James...|Webb|🔭||Hubble,Apollo",
    "A good reason to put a telescope in space is that it is above Earth's...|air|🌍||Moon,oceans"
  ], "Think about what each machine does and when it flew."));
  c.push(L("Comets and meteor showers", [
    "Dirty snowballs|☄️|A <b>comet</b> is a ball of ice, dust and rock that circles the Sun. When it gets close to the Sun, it warms up and grows a glowing tail. The tail always points away from the Sun.",
    "Halley's Comet|🔭|<b>Halley's Comet</b> comes back about every 76 years. It was last seen in 1986 and should return in 2061.",
    "Shooting stars|🌠|A <b>meteor</b> is a streak of light when a bit of space dust burns up in our air. A <b>meteor shower</b> happens when Earth passes through the dust trail of a comet. The Perseids are seen every August. A space rock that lands on Earth is a <b>meteorite</b>."
  ], [
    "A ball of ice and dust that grows a tail near the Sun is a...|comet|☄️||planet,star",
    "A comet's tail always points...|away from the Sun|➡️||toward the Sun,down to Earth",
    "Halley's Comet returns about every...|76 years|📅||7 years,760 years",
    "A streak of light in our sky is a...|meteor|🌠||comet,meteorite",
    "A space rock that lands on Earth is a...|meteorite|🪨||meteor,asteroid",
    "A meteor shower happens when Earth passes through a comet's...|dust trail|✨||tail of ice,orbit of Mars",
    "The Perseid meteor shower happens in...|August|📅||January,April",
    "A shooting star is really not a...|star|🌠||meteor,streak of light",
    "A comet's tail grows when it gets close to the...|Sun|☀️||Moon,Earth only"
  ], "Meteor is in the sky. Meteorite is on the ground."));
  c.push(L("Eclipses up close", [
    "Solar eclipse|🌞|A <b>solar eclipse</b> happens when the Moon moves between the Sun and Earth and blocks the Sun's light. It can only happen at new Moon. The darkest shadow is the <b>umbra</b>; the lighter shadow is the <b>penumbra</b>.",
    "Lunar eclipse|🌕|A <b>lunar eclipse</b> happens when Earth moves between the Sun and the Moon, so Earth's shadow falls on the Moon. It happens at full Moon, and the Moon may glow a dim red.",
    "Safety|🕶️|Never look directly at the Sun, even in a partial eclipse. Use special eclipse glasses. A lunar eclipse is safe to watch with your eyes."
  ], [
    "In a solar eclipse the ___ is between the Sun and Earth.|Moon|🌑||Earth,Mars",
    "In a lunar eclipse the ___ is between the Sun and Moon.|Earth|🌍||Venus,Saturn",
    "A solar eclipse can only happen at...|new Moon|🌑||full Moon,quarter Moon",
    "A lunar eclipse can only happen at...|full Moon|🌕||new Moon,crescent Moon",
    "The darkest part of a shadow is the...|umbra|🌑||penumbra,corona",
    "The lighter part of a shadow is the...|penumbra|🌓||umbra,orbit",
    "To watch a solar eclipse safely you need...|eclipse glasses|🕶️||sunglasses,nothing",
    "A lunar eclipse is safe to watch with...|your eyes|👀||no one,a telescope only",
    "During a lunar eclipse the Moon may look dim...|red|🔴||green,purple stripes"
  ], "Think about which one is lined up in the middle."));
  c.push(L("Reading climate graphs", [
    "Two kinds of graph|📊|A <b>bar graph</b> compares amounts, like rainfall for each month. A <b>line graph</b> shows change over time, like temperature through the year. A climate graph often has both.",
    "Reading it|🔍|Find the month at the bottom, go up to the bar or line, then read across to the number on the side. The <b>highest</b> point is the peak. The <b>lowest</b> point is the dip.",
    "Using the data|✏️|Add up monthly rainfall to find the total for a year. Subtract to find a difference: if June gets 8 cm and July gets 3 cm, June gets 5 cm more."
  ], [
    "Which graph shows rainfall for each month?|bar graph|📊||pie of the Moon,map",
    "Which graph shows temperature change over time?|line graph|📈||bar of colors,table of rocks",
    "Rain was 4 cm in May and 9 cm in June. What is the total?|13 cm|🌧️||5 cm,36 cm",
    "June 8 cm and July 3 cm. How much more rain fell in June?|5 cm|🌧️||11 cm,24 cm",
    "Temps: Mon 10, Tue 14, Wed 12. Which day was warmest?|Tuesday|🌡️||Monday,Wednesday",
    "Temps: Mon 10, Tue 14, Wed 12. What is the range?|4|🌡️||2,14",
    "The highest point on a line graph is the...|peak|⛰️||dip,axis",
    "The numbers along the side of a graph are the...|scale|📏||title,legend",
    "A graph's title tells you what the graph is...|about|📊||made of,colored"
  ], "Read across and up carefully."));
  c.push(L("Earth scientists", [
    "Studying the Earth|🔬|A <b>geologist</b> studies rocks and land. A <b>meteorologist</b> studies weather. An <b>oceanographer</b> studies the sea. A <b>hydrologist</b> studies water on and under the land.",
    "Studying danger and past|🧪|A <b>seismologist</b> studies earthquakes. A <b>volcanologist</b> studies volcanoes. A <b>paleontologist</b> studies fossils. A <b>glaciologist</b> studies ice.",
    "Studying space|🔭|An <b>astronomer</b> studies stars and planets. A <b>cartographer</b> makes maps. Scientists ask questions, collect data and test ideas."
  ], [
    "A scientist who studies weather is a...|meteorologist|🌦️||geologist,astronomer",
    "A scientist who studies rocks is a...|geologist|🪨||oceanographer,hydrologist",
    "A scientist who studies the sea is an...|oceanographer|🌊||astronomer,seismologist",
    "A scientist who studies earthquakes is a...|seismologist|🌍||paleontologist,glaciologist",
    "A scientist who studies fossils is a...|paleontologist|🦴||volcanologist,cartographer",
    "A scientist who studies ice is a...|glaciologist|🧊||meteorologist,geologist",
    "A person who makes maps is a...|cartographer|🗺️||astronomer,seismologist",
    "A scientist who studies stars and planets is an...|astronomer|🔭||oceanographer,hydrologist",
    "A scientist who studies volcanoes is a...|volcanologist|🌋||glaciologist,hydrologist"
  ], "Look at the first part of each word for a clue."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[3], c[4], c[5], c[6], c[8], c[9], c[11], c[12], c[13], c[15], c[16]]));
  c.push(MIX("Level 12 Challenge", [c[2], c[7], c[10], c[12], c[13], c[14], c[15], c[16], c[17], c[0], c[1]]));

  Object.assign(EARTH_LEVELS, { 10: a, 11: b, 12: c });
})();
