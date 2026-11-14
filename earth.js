// Mind Lab Earth & Space. Levels 1-3, 20 lessons each (60 lessons).
// Every lesson: 3 teaching slides, then quiz questions with 3 hints (nudge, clue, worked example).
// Needs math.js loaded first (uses pick, shuf).
const EARTH_LEVELS = (() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // L(title, slides["h|v|t"], items["question|answer|picture|clue|wrong1,wrong2"], nudge, defaultClue)
  const L = (title, slides, items, nudge, clue) => {
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
      let h2 = it.c || clue || "";
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


  // ================= LEVEL 1 =================
  const a = [];
  a.push(L("Weather words", [
    "What is weather?|🌤️|Weather is what it is like outside. It can be sunny, rainy, cloudy, windy or snowy.",
    "Look up!|☀️☁️🌧️|When the sun is out, it is <b>sunny</b>. When the sky is full of clouds, it is <b>cloudy</b>. When water falls, it is <b>rainy</b>.",
    "Wind and snow|💨❄️|When air moves fast, it is <b>windy</b>. When it is very cold, snow can fall. Then it is <b>snowy</b>."
  ], [
    "What is the weather like?|sunny|☀️||rainy,snowy",
    "What is the weather like?|rainy|🌧️||sunny,snowy",
    "What is the weather like?|cloudy|☁️||sunny,snowy",
    "What is the weather like?|snowy|❄️||sunny,rainy",
    "What is the weather like?|windy|💨||snowy,rainy",
    "What is the weather like?|stormy|⛈️||sunny,snowy",
    "What is the weather like?|foggy|🌫️||sunny,rainy",
    "What is the weather like?|sunny and hot|🥵||snowy,rainy"
  ], "Look at the picture. What is happening in the sky?"));
  a.push(L("What to wear", [
    "Match your clothes|🧥|We wear different clothes for different weather.",
    "Rain and snow|☔🧤|In the rain, wear a raincoat and boots. In the snow, wear a warm coat, hat and mittens.",
    "Sun|🕶️🧢|On a sunny day, wear a hat and sunglasses, and use sunscreen."
  ], [
    "What do you use when it is raining?|an umbrella|☔||sunglasses,a swimsuit",
    "What do you wear on your hands when it snows?|mittens|🧤||sandals,sunglasses",
    "What do you wear on your feet when it rains?|rain boots|🥾||flip-flops,slippers",
    "What do you wear to protect your eyes on a sunny day?|sunglasses|🕶️||mittens,a scarf",
    "What do you wear on your head in the hot sun?|a sun hat|👒||a scarf,a snow hat",
    "What do you wear in the snow?|a warm coat|🧥||a swimsuit,shorts",
    "What do you wear on a hot beach day?|shorts and a t-shirt|🏖️||a heavy coat,snow boots",
    "What do you put on your skin in the sun?|sunscreen|🧴||mittens,boots"
  ], "Think about what the weather is like first."));
  a.push(L("Sunny days", [
    "The Sun|☀️|The Sun gives us light and warmth. It makes the day bright.",
    "Sunny weather|😎|On a sunny day we can play outside. Wear sunscreen and a hat to protect your skin.",
    "Never stare|🚫👀|Never look right at the Sun. It can hurt your eyes."
  ], [
    "What gives us light in the day?|the Sun|☀️||the Moon,a lamp",
    "What makes a sunny day feel warm?|the Sun|🌞||the Moon,the stars",
    "What should you NOT do on a sunny day?|stare at the Sun|🚫||wear a hat,play outside",
    "What should you wear to protect your skin?|sunscreen|🧴||mittens,boots",
    "Is the Sun out on a sunny day?|yes|☀️||no",
    "Which is a good thing to do on a sunny day?|play outside|⚽||wear a snowsuit,build a snowman",
    "What helps your eyes in bright sun?|sunglasses|🕶️||mittens,a scarf",
    "The Sun is in the...|sky|🌤️||ground,basement"
  ], "The Sun makes light and heat."));
  a.push(L("Rain and clouds", [
    "Clouds|☁️|Clouds float in the sky. They are made of tiny drops of water.",
    "Rain|🌧️|When clouds get heavy, the water falls as <b>rain</b>. Rain helps plants grow.",
    "After the rain|🌈|Puddles form on the ground. Sometimes a rainbow shows up!"
  ], [
    "What falls from rain clouds?|rain|🌧️||sand,leaves",
    "What are clouds made of?|tiny drops of water|☁️||cotton candy,smoke",
    "What helps plants grow?|rain|🌱||wind,thunder",
    "What forms on the ground after rain?|puddles|💧||sand dunes,snowflakes",
    "What can you use to stay dry in the rain?|an umbrella|☔||sunglasses,a kite",
    "What pretty thing can you see after rain with sun?|a rainbow|🌈||a snowman,a volcano",
    "Where do clouds float?|in the sky|☁️||in the ground,under the sea",
    "What color are rain clouds?|gray|🌧️||pink,orange"
  ], "Rain falls out of the clouds."));
  a.push(L("Windy days", [
    "Wind|💨|Wind is moving air. We cannot see air, but we can see what wind does.",
    "What wind does|🍂🪁|Wind moves leaves, flags and kites. It can blow hair and make trees sway.",
    "Strong winds|🌪️|Very strong wind can be dangerous. Go inside if there is a big storm."
  ], [
    "Wind is moving...|air|💨||water,sand",
    "What can wind lift into the sky?|a kite|🪁||a rock,a table",
    "What does wind blow around in the fall?|leaves|🍂||sand castles,snowmen",
    "Can you see air?|no|💨||yes",
    "What can wind move on a sailboat?|the sail|⛵||the sea floor,the sun",
    "What do windmills use to spin?|wind|🌬️||milk,sand",
    "What do trees do in the wind?|sway|🌳||sing,sleep",
    "What should you do in a very strong storm?|go inside|🏠||fly a kite,go for a swim"
  ], "Wind is moving air."));
  a.push(L("Snow and cold", [
    "Snow|❄️|When it is very cold, water in the clouds freezes. It falls as <b>snowflakes</b>.",
    "Snow fun|⛄🛷|We can build a snowman, make snow angels, or go sledding.",
    "Stay warm|🧣🧤|Wear a coat, a hat, mittens and boots in the snow."
  ], [
    "What falls on a snowy day?|snowflakes|❄️||raindrops,sand",
    "What can you build out of snow?|a snowman|⛄||a sandcastle,a cloud",
    "What can you ride down a snowy hill?|a sled|🛷||a surfboard,a bike",
    "What melts snow?|warm weather|🌞||cold wind,freezing",
    "What do you wear to keep your hands warm?|mittens|🧤||sandals,shorts",
    "Snow is frozen...|water|💧||milk,sand",
    "Which season is the snowiest?|winter|⛄||summer,spring",
    "What do you drink to warm up after the snow?|hot cocoa|☕||ice water,cold juice"
  ], "Snow is frozen water."));
  a.push(L("Hot and cold", [
    "Hot things|🔥☀️|The Sun, a fire and a hot stove are hot. Be careful: hot things can burn.",
    "Cold things|🧊❄️|Ice, snow and the freezer are cold.",
    "Warm and cool|🌡️|A thermometer tells us how hot or cold it is."
  ], [
    "Which is hot?|the Sun|☀️||ice,snow",
    "Which is cold?|ice|🧊||a candle,a stove",
    "Which is cold?|snow|❄️||fire,soup",
    "Which is hot?|a campfire|🔥||an ice cube,a snowball",
    "What tool tells us how hot or cold it is?|a thermometer|🌡️||a ruler,a clock",
    "Is ice cream hot or cold?|cold|🍦||hot",
    "Is hot soup hot or cold?|hot|🍲||cold",
    "Which can melt ice?|warmth|🌞||snow,wind"
  ], "Hot things feel warm. Cold things feel chilly."));
  a.push(L("Day and night", [
    "Day|🌞|In the day, the sky is bright. The Sun is up.",
    "Night|🌙⭐|At night, the sky is dark. We see the Moon and stars.",
    "Sleep and wake|😴|Most people sleep at night and wake up in the morning."
  ], [
    "What do we see in the sky in the day?|the Sun|🌞||the stars,the moon only",
    "What do we see in the sky at night?|the Moon and stars|🌙||the Sun,a rainbow",
    "When is the sky bright?|in the day|🌞||at night,in a cave",
    "When is the sky dark?|at night|🌃||in the day,at noon",
    "When do most people sleep?|at night|😴||at noon,during lunch",
    "Which is a night thing?|stars|⭐||a sunrise,sunscreen",
    "Which is a day thing?|a sunny sky|☀️||the Moon only,shooting stars",
    "When do owls wake up?|at night|🦉||at noon,after lunch"
  ], "Is the Sun up, or is it dark outside?"));
  a.push(L("The Sun", [
    "A big, bright star|⭐☀️|The Sun is a star. It is very far away. It looks big because it is very, very big.",
    "Light and heat|🔆|The Sun gives us light and heat. Plants need sunlight to grow.",
    "Safe with sun|🧢|Use sunscreen and a hat. Never look right at the Sun."
  ], [
    "What gives the Earth light and heat?|the Sun|☀️||the Moon,the wind",
    "The Sun is a...|star|⭐||planet,cloud",
    "What do plants need from the Sun?|light|🌱||snow,wind",
    "When does the Sun come up?|in the morning|🌅||at midnight,at night",
    "Where does the Sun go down in the evening?|the horizon|🌇||the freezer,the ocean floor",
    "What should you not do with the Sun?|look right at it|🚫||wear a hat,sit in the shade",
    "What keeps your skin safe from the Sun?|sunscreen|🧴||mittens,a scarf",
    "Which is the biggest light in our sky in the day?|the Sun|🌞||the Moon,a lamp"
  ], "The Sun is a star that lights up our day."));
  a.push(L("The Moon", [
    "The Moon|🌙|The Moon shines in the night sky. It is much closer to us than the stars.",
    "It changes|🌓|The Moon seems to change shape from night to night. Sometimes it is round, sometimes it looks like a slice.",
    "Not alone|👩‍🚀|People have even visited the Moon in rockets."
  ], [
    "When can we often see the Moon?|at night|🌙||at noon only,never",
    "What does the Moon look like when it is round?|a big circle|🌕||a square,a triangle",
    "The Moon seems to change...|shape|🌓||color to green,size to a house",
    "Which is closer to Earth, the Moon or a star?|the Moon|🌙||a star",
    "Can you see the Moon in the day sometimes?|yes|🌤️||no",
    "The Moon is in the...|sky|🌙||ocean,garden",
    "What do you call the round Moon?|full Moon|🌕||tiny Moon,empty Moon",
    "Who has visited the Moon in a rocket?|astronauts|👩‍🚀||doctors,bakers"
  ], "The Moon is our neighbor in the night sky."));
  a.push(L("Stars", [
    "Stars|⭐|Stars are far away balls of burning gas. At night they look like tiny sparkling dots.",
    "Twinkle|✨|Stars seem to twinkle because we see them through moving air.",
    "Many stars|🌌|There are more stars than we can count."
  ], [
    "When can you see stars best?|on a clear night|🌃||at noon,in the morning sun",
    "Stars look like...|tiny sparkling dots|✨||big dinner plates,round cookies",
    "Are stars close or far away?|far away|🌌||close",
    "What do stars do in the night sky?|twinkle|⭐||sing,run",
    "Our Sun is a...|star|☀️||planet,moon",
    "Can we count all the stars?|no|🌌||yes",
    "What makes it hard to see stars?|bright city lights|🏙️||dark skies,quiet",
    "Stars are in the...|sky|🌠||ocean,kitchen"
  ], "Stars shine far away in the night sky."));
  a.push(L("Four seasons", [
    "Four seasons|🌷☀️🍂❄️|A year has four seasons: <b>spring</b>, <b>summer</b>, <b>fall</b> and <b>winter</b>.",
    "In order|🔁|Spring comes after winter. Summer comes after spring. Fall comes after summer. Then winter comes again.",
    "Every year|📅|The seasons repeat over and over, year after year."
  ], [
    "How many seasons are there?|four|4️⃣||two,seven",
    "Which season comes after spring?|summer|☀️||winter,fall",
    "Which season comes after summer?|fall|🍂||winter,spring",
    "Which season comes after fall?|winter|❄️||summer,spring",
    "Which season comes after winter?|spring|🌷||fall,summer",
    "Which is the coldest season?|winter|❄️||summer,spring",
    "Which is the warmest season?|summer|🏖️||winter,fall",
    "Which season is also called autumn?|fall|🍁||spring,winter"
  ], "Spring, summer, fall, winter. Then it starts again."));
  a.push(L("What each season is like", [
    "Spring and summer|🌷🏖️|In <b>spring</b>, flowers bloom and it rains. In <b>summer</b>, it is hot and we swim.",
    "Fall and winter|🍂⛄|In <b>fall</b>, leaves change color and drop. In <b>winter</b>, it is cold and may snow.",
    "Every season is special|💚|Each season has fun things to do."
  ], [
    "In which season do flowers bloom?|spring|🌷||winter,fall",
    "In which season do we swim at the beach?|summer|🏖️||winter,spring",
    "In which season do leaves turn red and fall?|fall|🍂||spring,summer",
    "In which season might it snow?|winter|⛄||summer,spring",
    "In which season is it hottest?|summer|☀️||winter,fall",
    "In which season do baby animals often get born?|spring|🐣||fall,winter",
    "In which season do we wear coats and mittens?|winter|🧤||summer,spring",
    "In which season do we rake leaves?|fall|🍁||spring,summer"
  ], "Think about the weather in each season."));
  a.push(L("Land and water", [
    "Land|⛰️|The land has mountains, hills, and flat places.",
    "Water|🌊|Water forms rivers, lakes and oceans.",
    "Where they meet|🏖️|A beach is where land meets water. An island has water all around it."
  ], [
    "What is a very tall piece of land?|a mountain|⛰️||a lake,a puddle",
    "What is a big body of salty water?|an ocean|🌊||a hill,a pond",
    "What is water that flows along the land?|a river|🏞️||a mountain,a hill",
    "What is land with water all around it?|an island|🏝️||a hill,a valley",
    "What is the sandy place by the sea?|a beach|🏖️||a mountain,a farm",
    "What is a small, low bump of land?|a hill|⛰️||a lake,an ocean",
    "What is water with land around it called?|a lake|🏞️||a mountain,an island",
    "Is a mountain land or water?|land|⛰️||water"
  ], "Is it land or water? Big or small?"));
  a.push(L("Our planet Earth", [
    "Our home|🌍|We live on a planet called <b>Earth</b>. From space it looks blue and green.",
    "Blue and green|🌊🌳|The blue is water. The green and brown is land.",
    "Round Earth|🌎|Earth is shaped like a ball. It has air around it, too."
  ], [
    "What planet do we live on?|Earth|🌍||the Sun,the Moon",
    "What shape is Earth?|round, like a ball|🌎||flat like a plate,square",
    "Why does Earth look blue from space?|it has lots of water|🌊||it is painted,it is made of ice",
    "What do we breathe on Earth?|air|🌬️||water,sand",
    "What is the green and brown part of Earth?|land|🏞️||clouds,stars",
    "Is Earth a star or a planet?|a planet|🌍||a star",
    "Does Earth have air around it?|yes|🌬️||no",
    "Where does everyone you know live?|on Earth|🌎||on the Moon,on the Sun"
  ], "Earth is our home planet."));
  a.push(L("Rocks", [
    "Rocks are everywhere|🪨|Rocks can be big or small, smooth or rough. They come in many colors.",
    "Size names|⚪|A tiny rock is a <b>pebble</b>. A huge rock is a <b>boulder</b>.",
    "Look closely|🔍|Look at the color, the size and how it feels. Rocks are not alive."
  ], [
    "Is a rock living or not living?|not living|🪨||living",
    "A tiny rock is called a...|pebble|⚪||boulder,mountain",
    "A huge rock is called a...|boulder|🪨||pebble,grain",
    "Which feels smooth?|a river rock|🪨||tree bark,sandpaper",
    "Which is hard?|a rock|🪨||a pillow,a marshmallow",
    "A mountain is made of...|rock|⛰️||cotton,bubbles",
    "Rocks can be different...|colors|🌈||songs,smells",
    "Which should you do to look at a rock?|look closely|🔍||eat it,throw it at someone"
  ], "Rocks are hard and not alive."));
  a.push(L("Soil and sand", [
    "Soil|🌱|Soil is the dirt where plants grow. It is brown and has bits of rock and old plants in it.",
    "Sand|🏖️|Sand is made of tiny pieces of rock. We find it at beaches and deserts.",
    "Mud|💧|When soil gets very wet, it makes mud."
  ], [
    "What do plants grow in?|soil|🌱||sand only,ice",
    "What do we find at the beach?|sand|🏖️||soil,snow",
    "What is sand made of?|tiny bits of rock|🪨||tiny bits of food,tiny bits of paper",
    "What do you get when soil gets very wet?|mud|💧||sand,snow",
    "Where do earthworms live?|in soil|🪱||in the sky,in clouds",
    "Which one is good for a garden?|soil|🌷||sand only,cement",
    "Which feels gritty?|sand|🏖️||water,a cloud",
    "What color is rich soil often?|brown|🟤||purple,blue"
  ], "Soil is for plants. Sand is at beaches."));
  a.push(L("Water: ice, liquid and steam", [
    "Water forms|💧|Water can be a liquid (like in a cup), a solid (ice) or a gas (steam).",
    "Freezing and melting|🧊|When water gets cold enough, it freezes into ice. When ice gets warm, it melts.",
    "Be careful|♨️|Steam is hot water gas. It can burn you, so stay away."
  ], [
    "Frozen water is called...|ice|🧊||steam,sand",
    "What happens to ice in the sun?|it melts|🌞||it grows,it turns into sand",
    "What happens when water gets very cold?|it freezes|❄️||it melts,it disappears",
    "Which is a liquid?|water in a cup|🥛||an ice cube,a rock",
    "Which is a solid?|an ice cube|🧊||a glass of milk,a puddle",
    "Steam is water as a...|gas|♨️||rock,toy",
    "Hot water makes...|steam|♨️||ice,snow",
    "Which one is cold and can melt?|ice cream|🍦||a rock,a book"
  ], "Water can change when it is hot or cold."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[6], a[10], a[12], a[14]]));
  a.push(MIX("Level 1 Challenge", [a[2], a[3], a[7], a[8], a[9], a[11], a[13], a[17]]));

  // ================= LEVEL 2 =================
  const b = [];
  b.push(L("Kinds of weather", [
    "Rain, snow and fog|🌧️❄️🌫️|Rain is water drops. Snow is frozen flakes. Fog is a cloud that sits close to the ground.",
    "Storms|⛈️|A thunderstorm has dark clouds, rain, lightning and thunder.",
    "Rainbow|🌈|A rainbow shows up when the sun shines through rain."
  ], [
    "A cloud close to the ground is called...|fog|🌫️||snow,hail",
    "Frozen flakes that fall from clouds are...|snow|❄️||rain,fog",
    "What has dark clouds, lightning and thunder?|a thunderstorm|⛈️||a sunny day,a rainbow",
    "What can you see when sun shines through rain?|a rainbow|🌈||a snowman,a rock",
    "Which weather is wet?|rainy|🌧️||sunny,windy",
    "Which weather is dry and bright?|sunny|☀️||rainy,foggy",
    "Which weather makes it hard to see?|fog|🌫️||sunshine,a rainbow",
    "Which weather has lots of lightning?|a storm|⚡||a sunny day,a calm night"
  ], "Think about what you see in the sky."));
  b.push(L("Storm safety", [
    "Lightning and thunder|⚡|Lightning is a big spark in the sky. Thunder is the loud boom that follows.",
    "Stay safe|🏠|When you hear thunder, go inside. Stay away from windows.",
    "Do not stand under trees|🌳|Never stand under a tree or swim during a storm."
  ], [
    "What is a big spark in the sky?|lightning|⚡||thunder,fog",
    "What is the loud boom after lightning?|thunder|💥||lightning,rain",
    "Where should you go in a storm?|inside a building|🏠||under a tree,in a pool",
    "Where should you NOT stand in a storm?|under a tree|🌳|It is not safe.|inside a house,in a car",
    "Should you swim during a thunderstorm?|no|🏊||yes",
    "Which comes with a storm?|dark clouds|⛈️||rainbows only,snowmen",
    "Who can you ask for help in a storm?|a grown-up|🧑||a stranger,nobody",
    "What should you do when you hear thunder?|go inside|⚡||go swimming,climb a tree"
  ], "Safety first in a storm."));
  b.push(L("Rainbows", [
    "Sun and rain together|🌦️|A rainbow appears when sunlight shines through raindrops.",
    "The colors|🌈|The colors are red, orange, yellow, green, blue and violet. They are always in this order.",
    "Where to look|👀|To see a rainbow, stand with the sun behind you and look at the rain."
  ], [
    "What two things make a rainbow?|sun and rain|🌦️||snow and wind,fog and ice",
    "Which color is at the top outside edge of a rainbow?|red|🌈||blue,green",
    "Which color is in a rainbow?|yellow|🟡||black,white",
    "Which color comes right after red?|orange|🟠||yellow,blue",
    "Which color comes right after green?|blue|🟢||red,orange",
    "Are the colors of a rainbow always in the same order?|yes|🌈||no",
    "When do you see a rainbow?|when sun shines through rain|🌦️||at night,in a closet",
    "How many main colors are in a rainbow?|six or seven|🌈||two,twenty"
  ], "Remember: red, orange, yellow, green, blue, violet."));
  b.push(L("Weather tools", [
    "Thermometer|🌡️|A <b>thermometer</b> tells how hot or cold it is.",
    "Rain gauge|🥛|A <b>rain gauge</b> collects rain to see how much fell.",
    "Wind vane|🧭|A <b>wind vane</b> points to where the wind is coming from."
  ], [
    "Which tool measures how hot or cold it is?|a thermometer|🌡️||a rain gauge,a wind vane",
    "Which tool measures how much rain fell?|a rain gauge|☔||a thermometer,a ruler",
    "Which tool shows which way the wind is blowing?|a wind vane|🐓||a thermometer,a rain gauge",
    "A thermometer measures...|temperature|🌡️||rainfall,wind direction",
    "A rain gauge measures...|rain|☔||temperature,wind direction",
    "A wind vane shows the wind's...|direction|🧭||temperature,rainfall",
    "A weather forecast tells you...|what the weather will be|📺||what is for lunch,what time it is",
    "Who tells us the weather forecast?|a meteorologist|🌦️||a baker,a plumber"
  ], "Each weather tool measures one thing."));
  b.push(L("Temperature", [
    "Hot, warm, cool, cold|🌡️|Temperature tells us how warm or cool something is.",
    "Reading a thermometer|🔴|The red line rises when it gets hotter and falls when it gets colder.",
    "Numbers|9️⃣0️⃣|A high number means hot. A low number means cold."
  ], [
    "A thermometer shows a high number. Is it hot or cold?|hot|🌡️||cold",
    "A thermometer shows a low number. Is it hot or cold?|cold|🥶||hot",
    "Which temperature is hotter, 90 or 40?|90|🌡️||40",
    "Which temperature is colder, 20 or 70?|20|🥶||70",
    "At which number does water freeze in Fahrenheit?|32|🧊||90,212",
    "When it gets hotter, the red line on a thermometer goes...|up|⬆️||down,sideways",
    "When it gets colder, the red line goes...|down|⬇️||up,sideways",
    "Which is the best number for a nice warm day?|75|🌤️||5,125"
  ], "Bigger numbers mean hotter."));
  b.push(L("Seasons in order", [
    "The cycle|🔁|The seasons go in a circle: spring, summer, fall, winter, then spring again.",
    "Months|📅|Winter has December, January and February in much of the world. Summer has June, July and August.",
    "Same pattern|🔄|The seasons repeat every year in the same order."
  ], [
    "What season comes right before summer?|spring|🌷||fall,winter",
    "What season comes right before fall?|summer|☀️||spring,winter",
    "What season comes right before winter?|fall|🍂||summer,spring",
    "What season comes right before spring?|winter|❄️||summer,fall",
    "After winter comes...|spring|🌷||fall,summer",
    "After summer comes...|fall|🍂||spring,winter",
    "Which season has the shortest days?|winter|🌑||summer,spring",
    "Which season has the longest days?|summer|☀️||winter,fall"
  ], "Spring, summer, fall, winter, repeat."));
  b.push(L("How seasons change nature", [
    "Spring|🌷🐣|In spring, plants wake up and baby animals are born.",
    "Summer and fall|🌻🍁|In summer, things grow fast. In fall, leaves turn colors and some animals get ready for winter.",
    "Winter|🐻❄️|In winter, many trees are bare. Some animals sleep or travel to warmer places."
  ], [
    "In which season do trees bloom with new leaves?|spring|🌳||winter,fall",
    "In which season do many trees lose their leaves?|fall|🍂||spring,summer",
    "In which season do many trees look bare?|winter|🌲||summer,spring",
    "In which season do plants grow fastest?|summer|🌻||winter,fall",
    "What do some animals do in winter?|sleep or travel|🐻||have a picnic,go swimming",
    "What do farmers often do in spring?|plant seeds|🌱||ice-skate,sled",
    "What do farmers often do in fall?|harvest crops|🌽||plant snow,build igloos",
    "When are many baby animals born?|spring|🐣||fall,winter"
  ], "Nature changes with the seasons."));
  b.push(L("Sunrise and sunset", [
    "Morning|🌅|The Sun comes up in the east in the morning. This is the <b>sunrise</b>.",
    "Evening|🌇|The Sun goes down in the west in the evening. This is the <b>sunset</b>.",
    "It looks like it moves|➡️|The Sun looks like it travels across the sky, but really the Earth is turning."
  ], [
    "The Sun comes up in the...|morning|🌅||evening,night",
    "The Sun goes down in the...|evening|🌇||morning,noon",
    "The Sun rises in the...|east|🌅||west,south",
    "The Sun sets in the...|west|🌇||east,north",
    "The Sun is highest in the sky around...|noon|🌞||sunrise,midnight",
    "When the Sun goes down, it gets...|dark|🌙||brighter,hotter",
    "Which is the sunrise?|the Sun coming up|🌅||the Sun going down,the Moon",
    "Which is the sunset?|the Sun going down|🌇||the Sun coming up,a star"
  ], "East in the morning, west in the evening."));
  b.push(L("Shadows", [
    "What is a shadow?|👤|A <b>shadow</b> forms when something blocks light.",
    "Long and short|📏|In the morning and evening, shadows are long. At noon, they are short.",
    "Shadow play|🦆|You can make shadow puppets with your hands and a lamp."
  ], [
    "What makes a shadow?|blocking light|💡||making a sound,heating a pan",
    "Are shadows longer in the morning or at noon?|in the morning|🌅||at noon",
    "Are shadows shorter at noon or in the evening?|at noon|☀️||in the evening",
    "A shadow is dark because light is...|blocked|⛔||colored,hungry",
    "What can you use to make a shadow puppet?|a lamp and your hands|💡||a pot and a spoon,a sandwich",
    "At night, can the Sun make a shadow?|no|🌙||yes",
    "A shadow looks like the...|shape of the object|👤||color of a rainbow,sound of a bell",
    "Which makes a shadow?|a tree in sunlight|🌳||a tree at midnight,a dark room"
  ], "Light + something in the way = shadow."));
  b.push(L("The Moon's light", [
    "No light of its own|🌙|The Moon does not make its own light. It shines because the Sun's light bounces off it.",
    "Changing shapes|🌒🌕|The Moon looks different on different nights. This is because we see different parts lit by the Sun.",
    "Craters|🕳️|The Moon has bowl-shaped holes called craters."
  ], [
    "What lights up the Moon?|the Sun|☀️||a lamp,a star",
    "Does the Moon make its own light?|no|🌙||yes",
    "What are the round holes on the Moon called?|craters|🕳️||puddles,caves",
    "The Moon looks like it changes...|shape|🌒||into a star,to gold",
    "When the Moon is round, we call it a...|full Moon|🌕||tiny Moon,quiet Moon",
    "The Moon is...|far away|🌙||inside your room,in your hand",
    "Does the Moon have air to breathe?|no|🌙||yes",
    "Who visited the Moon in a rocket?|astronauts|👩‍🚀||farmers,bakers"
  ], "The Moon shines with the Sun's light."));
  b.push(L("Stars and constellations", [
    "Stars are suns|⭐|Stars are huge balls of hot gas, like our Sun. They look tiny because they are very far away.",
    "Patterns|🌌|People saw pictures in the stars. These patterns are called <b>constellations</b>.",
    "Colors|🔵🔴|Some stars look white, blue or reddish."
  ], [
    "A pattern of stars is called a...|constellation|🌌||cloud,planet",
    "Our Sun is a...|star|☀️||planet,moon",
    "Why do stars look tiny?|they are far away|🔭||they are small paper,they are broken",
    "Stars are balls of...|hot gas|🔥||ice cream,paper",
    "What tool helps us see stars up close?|a telescope|🔭||a ruler,a thermometer",
    "When can we see stars best?|on a clear dark night|🌃||at lunch,on a sunny noon",
    "Why do stars seem to twinkle?|we see them through moving air|✨||they blink on and off,they sing",
    "People made up stories about...|constellations|📖||clouds only,rocks only"
  ], "Stars are far-away suns."));
  b.push(L("Land shapes", [
    "Hills and mountains|⛰️|A <b>hill</b> is a small rise of land. A <b>mountain</b> is very tall.",
    "Flat and low|🌾|A <b>plain</b> is flat land. A <b>valley</b> is low land between hills.",
    "Dry and sandy|🏜️|A <b>desert</b> is dry land that gets little rain."
  ], [
    "Very tall land is a...|mountain|⛰️||valley,lake",
    "A small rise of land is a...|hill|⛰️||mountain,ocean",
    "Flat land is a...|plain|🌾||mountain,island",
    "Low land between hills is a...|valley|🏞️||peak,cliff",
    "Dry land with little rain is a...|desert|🏜️||lake,forest",
    "Land with water all around it is an...|island|🏝️||valley,desert",
    "A place where land meets the sea is a...|coast|🌊||mountain,desert",
    "The very top of a mountain is called the...|peak|🏔️||valley,beach"
  ], "Think about how high or low the land is."));
  b.push(L("Water on Earth", [
    "Lots of water|🌍|Most of Earth is covered with water. The oceans are huge!",
    "Salty and fresh|🧂💧|Ocean water is salty. Rivers, lakes and ponds have fresh water.",
    "Drinking water|🚰|People drink fresh water. We must keep it clean."
  ], [
    "Is ocean water salty or fresh?|salty|🌊||fresh",
    "Is river water salty or fresh?|fresh|🏞️||salty",
    "Most of Earth is covered with...|water|🌍||sand,ice cream",
    "Which water do we drink?|fresh water|🚰||ocean water,paint",
    "Which is the biggest body of water?|an ocean|🌊||a pond,a puddle",
    "Which is a small body of water?|a pond|🦆||an ocean,a sea",
    "What flows along the land to the sea?|a river|🏞️||a hill,a dune",
    "How can we keep water clean?|don't pour trash in it|🚯||throw rocks in it,pour paint in it"
  ], "Ocean water is salty. Most other water is fresh."));
  b.push(L("Rocks in more detail", [
    "Big and small|🪨|Rocks can be tiny grains of sand or huge boulders.",
    "Hard or soft|💎|Some rocks are very hard, like granite. Some are soft, like chalk.",
    "Uses|🏠|People use rocks to build houses and roads."
  ], [
    "A very tiny piece of rock, like at the beach, is called...|sand|🏖️||a boulder,a mountain",
    "A huge rock is a...|boulder|🪨||grain,pebble",
    "Which rock is soft and can write on a board?|chalk|✏️||granite,marble",
    "Which rock is very hard?|granite|🪨||chalk,sand",
    "What do people build with rocks?|houses and roads|🏠||clouds,rivers",
    "Rocks make up the Earth's...|ground and mountains|⛰️||clouds,rivers",
    "Are rocks living things?|no|🪨||yes",
    "How can you describe a rock?|by color, size and feel|🔍||by its birthday,by its favorite song"
  ], "Rocks can be hard or soft, big or small."));
  b.push(L("Soil", [
    "What soil is|🌱|Soil is made of tiny pieces of rock mixed with bits of dead plants and animals.",
    "Soil helps|🌻|Plants grow in soil. Worms and tiny bugs live in it and make it healthy.",
    "Kinds of soil|🟤|Soil can be dark and rich, or sandy and light."
  ], [
    "Soil is made of tiny pieces of...|rock and old plants|🟤||plastic,sugar",
    "What grows in soil?|plants|🌱||buildings,clouds",
    "Which animal helps make soil healthy?|an earthworm|🪱||a shark,a lion",
    "What do roots take from soil?|water|💧||light,wind",
    "Dark, rich soil is good for...|growing plants|🌻||building sandcastles,freezing ice",
    "Sandy soil feels...|gritty|🏖️||sticky like glue,like jelly",
    "What happens to soil when it rains a lot?|it gets muddy|🌧️||it turns blue,it disappears",
    "Where do you often find soil?|in a garden|🌷||in the sky,in a bathtub"
  ], "Soil is where plants grow."));
  b.push(L("The water cycle", [
    "Up it goes|☀️💧|The Sun heats water. Some water rises into the air as invisible water vapor.",
    "Clouds form|☁️|High in the sky, the vapor cools and makes tiny drops. They gather into clouds.",
    "Down it comes|🌧️|The drops get bigger and fall as rain or snow. The water goes back to rivers and oceans."
  ], [
    "What heats water so it rises into the air?|the Sun|☀️||the Moon,a star",
    "What do tiny drops of water in the sky make?|clouds|☁️||rocks,mountains",
    "What falls from clouds?|rain or snow|🌧️||sand,leaves",
    "Where does rain go after it falls?|into rivers and oceans|🌊||back to the Sun,into outer space",
    "The water cycle happens again and...|again|🔄||never,once",
    "Water that rises into the air is called water...|vapor|♨️||rock,sand",
    "What happens to water in a puddle on a sunny day?|it dries up into the air|☀️||it turns into milk,it turns into a rock",
    "Is the water cycle a circle?|yes|🔁||no"
  ], "Up as vapor, clouds, down as rain, repeat."));
  b.push(L("Clouds", [
    "Cloud shapes|☁️|Fluffy white clouds look like cotton balls. Thin wispy clouds float very high.",
    "Rain clouds|🌧️|Dark gray clouds often bring rain or storms.",
    "Fog|🌫️|Fog is a cloud that touches the ground."
  ], [
    "Which clouds look like fluffy cotton balls?|white puffy clouds|☁️||dark storm clouds,fog on the ground",
    "Which clouds often bring rain?|dark gray clouds|🌧️||thin wispy clouds,puffy white clouds",
    "Fog is a cloud that is near...|the ground|🌫️||the Moon,the Sun",
    "Clouds are made of tiny drops of...|water|💧||milk,sand",
    "What color are thunderstorm clouds?|dark gray|⛈️||pink,yellow",
    "Where do clouds float?|in the sky|☁️||in the soil,in a pot",
    "Which clouds are thin and wispy?|high clouds|🌤️||fog,storm clouds",
    "Can you walk through fog?|yes, it is a cloud on the ground|🌫️||no it is solid,it is made of rocks"
  ], "Fluffy for fair weather, dark for rain."));
  b.push(L("Air and wind", [
    "Air is everywhere|🌬️|Air is all around us. We cannot see it, but we can feel it as wind.",
    "Wind moves|💨|Wind is air that moves. The Sun heats some places more than others, and this makes air move.",
    "Using wind|🌀|Windmills and sailboats use wind to move."
  ], [
    "Moving air is called...|wind|💨||fog,rain",
    "Can we see air?|no|🌬️||yes",
    "What do sailboats use to move?|wind|⛵||batteries,coal",
    "What can wind spin?|a windmill|🌀||a rock,a table",
    "What can wind carry?|seeds and leaves|🍃||houses,the Moon",
    "When wind blows hard, trees...|sway|🌳||sing,float away",
    "Air is made of tiny...|gases|🌬️||rocks,cookies",
    "We need air to...|breathe|🫁||paint,sing only"
  ], "Wind is air that moves."));
  b.push(MIX("Mixed practice", [b[0], b[3], b[5], b[7], b[12], b[14]]));
  b.push(MIX("Level 2 Challenge", [b[1], b[2], b[4], b[8], b[9], b[10], b[13], b[15], b[16]]));

  // ================= LEVEL 3 =================
  const c = [];
  c.push(L("Earth spins", [
    "Turning Earth|🌍|Earth spins like a top. One full spin takes about 24 hours, or one day.",
    "Day and night|🌞🌙|The side of Earth facing the Sun has daytime. The side facing away has night.",
    "Sun seems to move|🌅|The Sun seems to move across the sky, but really we are turning."
  ], [
    "Earth spins around once every about...|24 hours|⏰||1 hour,1 year",
    "When your side of Earth faces the Sun, it is...|day|🌞||night,winter",
    "When your side of Earth faces away from the Sun, it is...|night|🌙||day,summer",
    "What makes day and night?|Earth spinning|🌍||the Sun turning off,clouds",
    "Does the Sun really move across the sky?|no, Earth turns|🌅||yes it flies,yes it rolls",
    "How long is one day?|24 hours|⏰||12 hours,365 hours",
    "Earth's spinning gives us...|day and night|🌗||only winter,only summer",
    "Earth spins like a...|top|🌀||box,pillow"
  ], "Earth turns slowly all the time."));
  c.push(L("Earth travels around the Sun", [
    "A trip around the Sun|🌍☀️|Earth goes around the Sun. One trip takes about 365 days, or one year.",
    "Tilt|🌎|Earth is tilted. As it travels, different parts get more sunlight, and that makes the seasons.",
    "Four seasons|🍂❄️|Because of the tilt and trip, we have spring, summer, fall and winter."
  ], [
    "Earth goes around the...|Sun|☀️||Moon,Mars",
    "One trip around the Sun takes about...|a year|📅||a day,a week",
    "How many days are in a year, about?|365|📅||24,7",
    "What gives us seasons?|Earth's tilt and trip around the Sun|🌎||clouds,the Moon",
    "The path Earth takes around the Sun is called an...|orbit|🔄||eclipse,equator",
    "Earth is a...|planet|🌍||star,moon",
    "How many times does Earth go around the Sun in a year?|once|1️⃣||twice,100 times",
    "Is Earth tilted?|yes|🌎||no"
  ], "A year is one trip around the Sun."));
  c.push(L("The Sun is a star", [
    "Our star|☀️|The Sun is the star closest to Earth. It is a huge ball of hot gas.",
    "So big|📏|The Sun is so big that over a million Earths could fit inside it!",
    "Why other stars look tiny|⭐|Other stars are much farther away, so they look like tiny dots."
  ], [
    "The Sun is a...|star|☀️||planet,moon",
    "Which star is closest to Earth?|the Sun|☀️||the North Star,Mars",
    "The Sun is made of hot...|gas|🔥||rock,water",
    "Why do other stars look tiny?|they are very far away|🌌||they are small,they are broken",
    "Is the Sun bigger than Earth?|yes|☀️||no",
    "What does the Sun give Earth?|light and heat|🌞||sound and wind,clouds and rain",
    "Plants use light from the Sun to...|make food|🌱||sing,swim",
    "Should you look straight at the Sun?|no|🚫||yes"
  ], "The Sun is a star that is close to us."));
  c.push(L("The eight planets", [
    "Planets|🪐|A planet is a big world that travels around a star. Our Sun has eight planets.",
    "In order from the Sun|📋|<b>Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</b>.",
    "Earth is third|🌍|Earth is the third planet from the Sun."
  ], [
    "Which planet is closest to the Sun?|Mercury|☀️||Venus,Earth",
    "Which planet is second from the Sun?|Venus|♀️||Earth,Mars",
    "Which planet is third from the Sun?|Earth|🌍||Venus,Mars",
    "Which planet is fourth from the Sun?|Mars|🔴||Earth,Jupiter",
    "Which planet is fifth from the Sun?|Jupiter|🪐||Mars,Saturn",
    "Which planet comes after Jupiter?|Saturn|🪐||Mars,Uranus",
    "Which planet comes after Saturn?|Uranus|🪐||Jupiter,Neptune",
    "Which planet is farthest from the Sun?|Neptune|🔵||Uranus,Saturn"
  ], "Say them in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."));
  c.push(L("Planet facts", [
    "Big and small|🪐|Jupiter is the biggest planet. Mercury is the smallest.",
    "Special planets|💍🔴|Saturn has bright rings. Mars is called the Red Planet. Venus is the hottest planet.",
    "Home|🌍|Earth is the only planet we know that has living things."
  ], [
    "Which planet is the biggest?|Jupiter|🪐||Earth,Mars",
    "Which planet is the smallest?|Mercury|☿||Jupiter,Saturn",
    "Which planet has bright rings you can see?|Saturn|💍||Mars,Earth",
    "Which planet is called the Red Planet?|Mars|🔴||Venus,Jupiter",
    "Which planet is the hottest?|Venus|🔥||Neptune,Mercury",
    "Which planet do we live on?|Earth|🌍||Mars,Venus",
    "Which planet is the farthest from the Sun?|Neptune|🔵||Mercury,Earth",
    "Which planet is called a blue-green planet and tilted on its side?|Uranus|🔵||Mars,Mercury"
  ], "Each planet has something special."));
  c.push(L("Rocky and giant planets", [
    "Rocky planets|🪨|Mercury, Venus, Earth and Mars are small and rocky. You could stand on them.",
    "Giant planets|🪐|Jupiter and Saturn are huge and made mostly of gas. Uranus and Neptune are giant and icy.",
    "Far away|❄️|The farther a planet is from the Sun, the colder it is."
  ], [
    "Which planet is rocky?|Earth|🌍||Jupiter,Saturn",
    "Which planet is rocky?|Mars|🔴||Jupiter,Neptune",
    "Which planet is a giant?|Jupiter|🪐||Mercury,Venus",
    "Which planet is a giant?|Saturn|💍||Earth,Mars",
    "Which planet is a giant?|Neptune|🔵||Venus,Mercury",
    "Which planet is rocky?|Venus|♀️||Uranus,Saturn",
    "Which planets are the cold, faraway ones?|Uranus and Neptune|❄️||Mercury and Venus,Earth and Mars",
    "How many planets are rocky?|four|4️⃣||two,six"
  ], "The first four planets are rocky."));
  c.push(L("Phases of the Moon", [
    "The Moon goes around Earth|🌙|The Moon travels around Earth in about a month.",
    "Phases|🌑🌒🌓🌕|As it goes, we see different amounts of its lit side. These shapes are called <b>phases</b>.",
    "Order|🔁|New Moon (dark), crescent, half (also called a quarter Moon), full Moon (round). Then it gets smaller again."
  ], [
    "When the Moon is a thin curve, it is a...|crescent|🌒||full,new",
    "When we see the whole lit circle, it is a...|full Moon|🌕||new Moon,crescent",
    "When we cannot see the Moon at all, it is a...|new Moon|🌑||full Moon,crescent",
    "When the Moon looks like half a circle, it is a...|half Moon|🌓||full Moon,new Moon",
    "The shapes of the Moon are called...|phases|🌗||seasons,orbits",
    "About how long does it take the Moon to go through all its phases?|a month|📅||a day,a year",
    "The Moon goes around the...|Earth|🌍||Sun only,Mars",
    "What lights the part of the Moon we see?|the Sun|☀️||the Earth,a star"
  ], "Look at how much of the Moon is lit."));
  c.push(L("Moon facts", [
    "Craters|🕳️|The Moon is covered with craters, made long ago by space rocks.",
    "No air|🚫🌬️|The Moon has no air and no liquid water on its surface. People cannot breathe there.",
    "Visitors|👩‍🚀|Astronauts have walked on the Moon in space suits."
  ], [
    "What covers the Moon's surface?|craters|🕳️||trees,oceans",
    "Does the Moon have air to breathe?|no|🌙||yes",
    "What do astronauts need on the Moon?|a space suit|👩‍🚀||a swimsuit,a raincoat",
    "Does the Moon have rivers?|no|🌙||yes",
    "How did astronauts get to the Moon?|in a rocket|🚀||on a bus,on a boat",
    "What is the Moon to Earth?|a space neighbor|🌙||a star,a cloud",
    "Is the Moon bigger than Earth?|no, it is smaller|🌍||yes it is bigger,it is the same",
    "Does the Moon make its own light?|no|☀️||yes"
  ], "The Moon is a rocky, dusty, airless place."));
  c.push(L("Weather and climate", [
    "Weather|🌦️|Weather is what is happening outside right now, like rain today.",
    "Climate|🌴🏜️|Climate is the usual weather in a place over many years.",
    "Different places|🌍|Deserts have a dry climate. Rainforests have a wet climate. Poles have a cold climate."
  ], [
    "What is the usual weather in a place over many years?|climate|🌴||wind,fog",
    "What is the weather outside right now?|today's weather|🌦️||the climate,the season only",
    "A desert has a...|dry climate|🏜️||wet climate,icy climate",
    "A rainforest has a...|wet climate|🌴||dry climate,snowy climate",
    "The North Pole has a...|cold climate|🥶||hot climate,sandy climate",
    "Weather can change...|from day to day|📅||never,only once",
    "Climate changes...|slowly|🐌||every hour,every minute",
    "Which tells you whether to take an umbrella today?|the weather|☔||the climate,the planets"
  ], "Weather is today. Climate is the usual."));
  c.push(L("The water cycle in four steps", [
    "Evaporation|☀️|The Sun heats water. It turns into invisible gas called water vapor and rises. This is <b>evaporation</b>.",
    "Condensation|☁️|High up, the vapor cools and makes tiny drops that form clouds. This is <b>condensation</b>.",
    "Precipitation and collection|🌧️🌊|Water falls as rain or snow. This is <b>precipitation</b>. It collects in rivers and oceans, and the cycle starts again."
  ], [
    "Water turning into vapor is called...|evaporation|☀️||condensation,precipitation",
    "Vapor cooling and forming clouds is called...|condensation|☁️||evaporation,precipitation",
    "Rain, snow or hail falling is called...|precipitation|🌧️||condensation,evaporation",
    "What heats water to make it evaporate?|the Sun|☀️||the Moon,the wind",
    "What do we call the collecting of water in rivers and oceans?|collection|🌊||evaporation,condensation",
    "Which step comes right after evaporation?|condensation|☁️||precipitation,collection",
    "Which step comes right after condensation?|precipitation|🌧️||evaporation,collection",
    "Is the water cycle a circle?|yes|🔄||no"
  ], "Evaporate, condense, precipitate, collect."));
  c.push(L("Inside the Earth", [
    "Layers|🌍|Earth has layers like a peach. The outside is the <b>crust</b>.",
    "Mantle|🔥|Under the crust is the thick, hot <b>mantle</b>.",
    "Core|🔴|In the center is the very hot <b>core</b>."
  ], [
    "What is the outside layer of Earth called?|crust|🌍||core,mantle",
    "What is the thick middle layer called?|mantle|🔥||crust,core",
    "What is the center of Earth called?|core|🔴||crust,mantle",
    "We live on Earth's...|crust|🏞️||core,mantle",
    "Which layer is the hottest?|core|🔥||crust,mantle",
    "Which layer is the thinnest?|crust|🍑||mantle,core",
    "Earth's layers are like a...|peach|🍑||paper plane,pencil",
    "How many main layers does Earth have?|three|3️⃣||one,ten"
  ], "From outside in: crust, mantle, core."));
  c.push(L("Fossils", [
    "What is a fossil?|🦴|A <b>fossil</b> is what is left of a plant or animal that lived long, long ago.",
    "In rock|🪨|Mud and sand covered the remains. Over a very long time, they turned to rock with the shape inside.",
    "What fossils tell us|🦕|Scientists study fossils to learn about plants and animals of long ago, like dinosaurs."
  ], [
    "Fossils are what is left of things that lived...|long ago|⏳||yesterday,this morning",
    "Where do we often find fossils?|in rock|🪨||in the sky,in a nest",
    "Who studies fossils?|scientists|🧑‍🔬||bakers,painters",
    "Which animal's fossils have been found?|dinosaurs|🦕||robots,unicorns",
    "Fossils can show the shape of a...|leaf or bone|🍃||cookie,TV",
    "Fossils form over a very...|long time|⌛||short time,quick minute",
    "Fossils help us learn about...|the past|📜||the future only,today's lunch",
    "Fossils are found in...|rocks|🪨||clouds,sunshine"
  ], "Fossils are clues from long ago."));
  c.push(L("Volcanoes and earthquakes", [
    "Volcanoes|🌋|A <b>volcano</b> is a mountain with an opening. Hot melted rock, called <b>lava</b>, can come out.",
    "Earthquakes|🌐|An <b>earthquake</b> is when the ground shakes. The Earth's crust moves.",
    "Stay safe|🛡️|In an earthquake: drop, cover and hold on."
  ], [
    "Melted rock from a volcano is called...|lava|🌋||water,snow",
    "A mountain with an opening that lava comes out of is a...|volcano|🌋||valley,beach",
    "When the ground shakes, it is an...|earthquake|🌐||eclipse,avalanche",
    "In an earthquake you should drop, cover and...|hold on|🛡️||run outside,jump",
    "What can you hide under in an earthquake?|a sturdy table|🪑||a tall shelf,a glass window",
    "Are volcanoes always erupting?|no, most are quiet|🌋||yes always",
    "Lava is very...|hot|🔥||cold,sweet",
    "Who helps people stay safe in earthquakes?|grown-ups and rescue workers|🧑‍🚒||only pets,nobody"
  ], "Volcanoes and earthquakes are powerful, but we can be ready."));
  c.push(L("Weather forecast", [
    "Forecast|📺|A <b>forecast</b> tells what the weather will be. Scientists called meteorologists make it.",
    "Symbols|☀️🌧️⛅|Weather maps use symbols: a sun for sunny, a cloud with drops for rain.",
    "Temperature|🌡️|Forecasts also tell the high and low temperature for the day."
  ], [
    "A weather forecast tells you what the weather...|will be|📺||was last year,is for lunch",
    "A scientist who studies weather is a...|meteorologist|🌦️||biologist,chef",
    "Which symbol shows rain?|a cloud with drops|🌧️||a sun,a snowman",
    "Which symbol shows sunny weather?|a sun|☀️||a cloud with drops,a snowflake",
    "The high is the...|warmest temperature of the day|🔥||coldest temperature,time the Sun rises",
    "The low is the...|coolest temperature of the day|❄️||warmest temperature,time of lunch",
    "If the forecast says rain, you should pack...|an umbrella|☔||sunglasses,sunscreen",
    "If the forecast says snow, you should wear...|a warm coat|🧥||a swimsuit,flip-flops"
  ], "A forecast helps you plan your day."));
  c.push(L("Natural resources", [
    "From nature|🌳💧|Natural resources are things from nature that we use, like water, air, soil, trees and sunlight.",
    "Use wisely|♻️|We should not waste them. We should save water and plant trees.",
    "Clean energy|☀️💨|Sunlight and wind can make power without using up resources."
  ], [
    "Which is a natural resource?|water|💧||a plastic toy,a car",
    "Which is a natural resource?|trees|🌳||a bicycle,a phone",
    "Which gives us clean power?|the Sun|☀️||a coal fire,a smoky engine",
    "Which gives us clean power?|wind|💨||a coal fire,a smoky engine",
    "What do we get from soil?|food that grows|🌽||plastic,candy bars",
    "How can we save water?|turn off the tap|🚰||leave it running,run it all day",
    "We use trees to make...|paper and wood|📄||water,sunlight",
    "Why do we plant trees?|to give shade, air and homes|🌳||to make noise,to hide toys"
  ], "Natural resources come from nature."));
  c.push(L("Continents and oceans", [
    "Seven continents|🗺️|The big pieces of land are the seven <b>continents</b>: Africa, Antarctica, Asia, Australia, Europe, North America and South America.",
    "Five oceans|🌊|The oceans are the Pacific, Atlantic, Indian, Southern and Arctic.",
    "Biggest and coldest|🐧|The Pacific is the biggest ocean. Asia is the biggest continent. Antarctica is the coldest."
  ], [
    "How many continents are there?|seven|7️⃣||five,ten",
    "How many oceans are there?|five|5️⃣||two,nine",
    "Which is the biggest ocean?|the Pacific|🌊||the Arctic,the Atlantic",
    "Which is the biggest continent?|Asia|🌏||Europe,Africa",
    "Which continent is the coldest?|Antarctica|🐧||Africa,Asia",
    "Which is a continent?|Europe|🗺️||Pacific,Arctic",
    "Which is an ocean?|Atlantic|🌊||Africa,Asia",
    "Which continent has the Sahara Desert?|Africa|🏜️||Antarctica,Europe"
  ], "Continents are land. Oceans are water."));
  c.push(L("Space travel", [
    "Rockets|🚀|A rocket is a powerful machine that carries things into space.",
    "Satellites|🛰️|Satellites orbit Earth. They help with weather pictures, maps and phones.",
    "Astronauts|👩‍🚀|Astronauts live and work in space. They wear space suits outside the spaceship."
  ], [
    "What carries things into space?|a rocket|🚀||a bus,a bicycle",
    "What do we call a person who travels in space?|an astronaut|👩‍🚀||a baker,a doctor",
    "Which machine orbits Earth and takes pictures?|a satellite|🛰️||a boat,a train",
    "Which tool helps us look at faraway stars?|a telescope|🔭||a ruler,a spoon",
    "Why do astronauts wear space suits?|to stay safe in space|🧑‍🚀||to look fancy,to play",
    "A satellite helps with...|weather and maps|🌦️||cooking,gardening only",
    "What do rockets use to go very fast?|powerful engines|🔥||pedals,sails",
    "There is no air in...|space|🌌||a kitchen,a garden"
  ], "Rockets, satellites and telescopes help us explore space."));
  c.push(L("Gravity", [
    "What is gravity?|⬇️|Gravity is a pull. Earth pulls things toward itself.",
    "Falling|🍎|When you drop a ball, it falls down because of gravity. Gravity also keeps us on the ground.",
    "In space|🧑‍🚀|Far from Earth, astronauts float because gravity is weaker. The Moon has less gravity than Earth."
  ], [
    "What pulls things toward Earth?|gravity|⬇️||wind,rain",
    "What happens if you drop a ball?|it falls down|⚽||it floats away,it turns into a bird",
    "Gravity keeps us on the...|ground|🌍||ceiling,clouds",
    "Which has less gravity than Earth?|the Moon|🌙||the Sun,a rock",
    "Why can astronauts float in space?|gravity is weak there|🧑‍🚀||they are magic,they are very light always",
    "What makes an apple fall from a tree?|gravity|🍎||the Moon,a magnet",
    "Which way does gravity pull?|down toward Earth|⬇️||up to the sky,sideways",
    "Gravity keeps the Moon going around...|Earth|🌙||the Sun only,Mars"
  ], "Gravity pulls things down."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[3], c[5], c[8], c[10]]));
  c.push(MIX("Level 3 Challenge", [c[2], c[4], c[6], c[7], c[9], c[11], c[12], c[13], c[15], c[17]]));

  return { 1: a, 2: b, 3: c };
})();
