// ext/geo-25-27.js : Mind Lab Geography levels 25-27 (60 lessons): climatology, geomorphology, GIS, economic and political geography, sustainability
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const LS = (title, make) => ({ title, make });

  // Multiple choice. s = slides, n = nudge, c = clue, items = [question, right, "wrong1|wrong2", optional picture]
  const MC = (s, n, c, items) => {
    const make = () => {
      const [q, a, w, v] = pick(items), ex = pick(items.filter(x => x[1] !== a && x[0] !== q));
      const r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: [n, c, `Example: "${ex[0]}" The answer is "${ex[1]}". Now do yours.`] };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const NUM = (s, fn) => { fn.teach = () => s.map(x => slide(x[0], x[1], x[2])); return fn; };
  const Q = (text, answer, h1, h2, h3) => ({ text, answer, hints: [h1, h2, h3] });
  // Half multiple choice, half number questions in one lesson.
  const MN = (s, n, c, items, numFn) => {
    const mc = MC(s, n, c, items), f = () => (Math.random() < 0.5 ? mc() : numFn());
    f.teach = mc.teach;
    return f;
  };

  // ---------- LEVEL 25 number makers ----------
  const ENERGYN = () => {
    const I = pick([100, 200, 300, 400, 500]), a = pick([10, 20, 25, 30, 40, 50]), refl = I * a / 100;
    if (Math.random() < 0.5) return Q(`A surface receives ${I} units of sunlight and has an albedo of ${a} percent. How many units are reflected?`, refl,
      "Albedo is the share of sunlight that bounces back. Turn the percent into a part of the total.", "Find that percent of the incoming energy.",
      "Example: 200 units come in and the albedo is 10 percent. 10 percent of 200 is 20 reflected. Now do yours.");
    return Q(`A surface receives ${I} units of sunlight and has an albedo of ${a} percent. How many units are absorbed?`, I - refl,
      "Some sunlight is reflected and the rest is absorbed. Find the reflected part first.", "Absorbed energy is what is left after you take away the reflected part.",
      "Example: 200 units come in, albedo 10 percent. Reflected is 20, so absorbed is 200 - 20 = 180. Now do yours.");
  };
  const LAPSEN = () => {
    const m = Math.random(), k = ri(1, 5);
    if (m < 0.3) return Q(`Dry air rises ${k} km. About how many degrees Celsius does it cool? (Use 10 degrees per km.)`, 10 * k,
      "Rising air expands and cools at a steady rate.", "Multiply the cooling per kilometer by the number of kilometers climbed.",
      "Example: dry air rises 3 km at 10 degrees per km. 3 x 10 = 30 degrees cooler. Now do yours.");
    if (m < 0.55) return Q(`Moist rising air cools about 5 degrees Celsius per km. How many degrees does it cool in ${k} km?`, 5 * k,
      "Once a cloud forms, condensation releases heat, so the cooling is slower than for dry air.", "Multiply the cooling per kilometer by the number of kilometers climbed.",
      "Example: 4 km at 5 degrees per km is 4 x 5 = 20 degrees. Now do yours.");
    if (m < 0.8) { const d = 10 * k; return Q(`Dry air must cool by ${d} degrees Celsius to reach its dew point (10 degrees per km). How many km must it rise?`, k,
      "Work backwards from the total cooling to the distance climbed.", "Divide the total cooling by the cooling per kilometer.",
      "Example: cooling of 30 degrees at 10 degrees per km needs 30 / 10 = 3 km. Now do yours."); }
    const T = ri(20, 32), k2 = ri(1, 2);
    return Q(`Dry air at sea level is ${T} degrees Celsius. It rises ${k2} km (10 degrees per km). What is its temperature then, in degrees Celsius?`, T - 10 * k2,
      "Rising air gets colder, so the answer is lower than the start.", "Find the total cooling, then take it away from the starting temperature.",
      "Example: start at 25 degrees and rise 1 km. Cooling is 10, so 25 - 10 = 15 degrees. Now do yours.");
  };
  const HUMN = () => {
    const cap = pick([20, 40]), p = pick([25, 40, 50, 60, 75, 80]), v = cap * p / 100;
    if (Math.random() < 0.5) return Q(`Air at this temperature can hold ${cap} grams of water vapor per cubic meter. It holds ${v} grams. What is the relative humidity, in percent?`, p,
      "Relative humidity compares what the air holds with the most it could hold.", "Divide the vapor present by the capacity, then multiply by one hundred.",
      "Example: capacity 10 grams, holds 5 grams. 5 / 10 x 100 = 50 percent. Now do yours.");
    return Q(`Air can hold ${cap} grams of water vapor per cubic meter and its relative humidity is ${p} percent. How many grams of vapor does it hold per cubic meter?`, v,
      "Relative humidity is a percent of the air's capacity.", "Find that percent of the capacity.",
      "Example: capacity 20 grams and 50 percent humidity means 10 grams. Now do yours.");
  };
  const GHGN = () => {
    if (Math.random() < 0.65) { const t = pick([2, 5, 10, 20, 50]); return Q(`Methane warms the planet about 28 times more than carbon dioxide over 100 years (its GWP is 28). How many tonnes of CO2-equivalent are ${t} tonnes of methane?`, 28 * t,
      "Global warming potential tells you how many tonnes of CO2 have the same effect as one tonne of the gas.", "Multiply the tonnes of methane by its GWP.",
      "Example: 3 tonnes of a gas with GWP 10 equals 3 x 10 = 30 tonnes CO2-equivalent. Now do yours."); }
    return Q("Carbon dioxide in the air rose from about 280 ppm before the Industrial Revolution to 420 ppm. By what percent did it rise?", 50,
      "First find how many ppm it rose, then compare that with the starting level.", "Percent rise = rise divided by the starting value, times one hundred.",
      "Example: from 200 to 300 is a rise of 100. 100 / 200 x 100 = 50. A different pair, so work out yours.");
  };
  const CLIMN = () => {
    const m = Math.random();
    if (m < 0.5) { const W = ri(18, 32), C = ri(-14, 12); return Q(`A city's warmest month averages ${W} degrees Celsius and its coldest averages ${C} degrees Celsius. What is its annual temperature range?`, W - C,
      "The range is the gap between the highest and lowest monthly averages.", "Subtract the coldest from the warmest. Careful if the coldest is below zero.",
      "Example: warmest 20 and coldest -5. 20 - (-5) = 25 degrees. Now do yours."); }
    const a = ri(8, 24) * 10, b = ri(1, 6) * 10;
    return Q(`On a climograph the wettest month has ${a} mm of rain and the driest has ${b} mm. How many mm more rain falls in the wettest month?`, a - b,
      "Compare the tallest bar with the shortest bar.", "Subtract the smaller amount from the larger one.",
      "Example: 100 mm and 30 mm. 100 - 30 = 70 mm more. Now do yours.");
  };
  const NORMN = () => {
    const m = Math.random();
    if (m < 0.6) { const base = ri(40, 90) * 10, off = shuf(pick([[-20, 10, 0, -10, 20], [-30, 10, 0, 30, -10], [0, 20, -20, 40, -40], [-10, -10, 10, 10, 0]]));
      const vals = off.map(o => base + o); return Q(`Yearly rainfall (mm) in a town over 5 years was ${vals.join(", ")}. What is the 5-year average, in mm?`, base,
        "An average spreads the total evenly across all the years.", "Add all the values, then divide by how many values there are.",
        "Example: 100, 200 and 300 add to 600, and 600 / 3 = 200. Now do yours."); }
    const nrm = ri(4, 12) * 100, d = ri(1, 9) * 10;
    return Q(`A place's climate normal is ${nrm} mm of rain a year. This year it got ${nrm - d} mm. How many mm below normal was it?`, d,
      "A normal is the long-term average to compare against.", "Subtract this year's rainfall from the normal.",
      "Example: normal 500 and this year 460. 500 - 460 = 40 below normal. Now do yours.");
  };

  // ---------- LEVEL 25 ----------
  const l25 = [
    LS("Layers of the atmosphere", MC([
      ["Five layers", "🌤️", "From the ground up the atmosphere has five layers: the <b>troposphere</b>, <b>stratosphere</b>, <b>mesosphere</b>, <b>thermosphere</b> and <b>exosphere</b>."],
      ["Where things happen", "☁️", "Weather happens in the troposphere (the lowest layer, up to about 12 km). The <b>ozone layer</b> is in the stratosphere. Meteors burn up in the mesosphere. Auroras glow in the thermosphere, where the space station orbits."],
      ["Temperature", "🌡️", "Air gets colder with height in the troposphere, warmer in the stratosphere (ozone absorbs sunlight), colder again in the mesosphere, then very hot in the thin thermosphere. The <b>Karman line</b>, about 100 km up, is the usual edge of space."]],
      "Think about the order of layers from the ground upward.", "Match what the question describes (weather, ozone, meteors, auroras) to the layer where it happens.",
      [["Which layer is closest to the ground and holds nearly all weather?", "Troposphere", "Stratosphere|Mesosphere"], ["The ozone layer is in the...", "Stratosphere", "Troposphere|Thermosphere"],
       ["Most meteors burn up in the...", "Mesosphere", "Troposphere|Exosphere"], ["Auroras glow in the...", "Thermosphere", "Troposphere|Stratosphere"],
       ["Which layer is the outermost, fading into space?", "Exosphere", "Troposphere|Mesosphere"], ["In the troposphere, temperature with height...", "Falls", "Rises|Stays exactly the same"],
       ["Temperature rises with height in the stratosphere because...", "Ozone absorbs sunlight", "The ground is nearby|Clouds trap heat"], ["The Karman line, about 100 km up, marks the usual...", "Edge of space", "Top of the clouds|Start of the ozone layer"],
       ["Passenger jets cruise near the top of the...", "Troposphere", "Thermosphere|Mesosphere"]])),
    LS("Sunlight and the seasons", MC([
      ["Tilt, not distance", "🌍", "Seasons happen because Earth's axis is <b>tilted 23.5 degrees</b>, not because Earth gets closer to or farther from the Sun. Earth is actually closest to the Sun in early January, during Northern Hemisphere winter."],
      ["Insolation", "☀️", "<b>Insolation</b> is the sunlight reaching a surface. It is strongest when the Sun is high (rays are concentrated) and the day is long. At a <b>solstice</b> one hemisphere leans most toward the Sun. At an <b>equinox</b> day and night are about equal everywhere."],
      ["Key dates and lines", "📅", "June solstice (about 21 June): Sun is overhead at the <b>Tropic of Cancer</b> (23.5 N). December solstice: overhead at the <b>Tropic of Capricorn</b> (23.5 S). Equinoxes (March and September): overhead at the equator."]],
      "Think about which part of Earth leans toward the Sun.", "Remember the cause is the tilt of the axis, and that high Sun means concentrated rays.",
      [["What causes the seasons?", "Earth's tilted axis", "Earth's distance from the Sun|The Moon's pull"], ["When is Earth closest to the Sun?", "Early January", "Early July|Late March"],
       ["On the June solstice the Sun is overhead at the...", "Tropic of Cancer", "Tropic of Capricorn|Equator"], ["On the equinoxes the Sun is overhead at the...", "Equator", "Tropic of Cancer|Arctic Circle"],
       ["The axis tilt is about...", "23.5 degrees", "90 degrees|5 degrees"], ["Why is summer warmer than winter in the same place?", "Higher Sun and longer days", "The Sun is much closer|The Sun gives off more energy"],
       ["During the June solstice, the Southern Hemisphere has...", "Winter", "Summer|Equinox"], ["At an equinox, day and night are...", "About equal", "Longest of the year|Zero hours of daylight"],
       ["Insolation means...", "Sunlight reaching a surface", "Rainfall totals|Wind speed"]])),
    LS("Earth's energy balance", MN([
      ["Energy in, energy out", "⚖️", "Earth takes in energy from the Sun and sends the same amount back to space as heat. If the two are equal, the planet's temperature stays steady. This is the <b>energy balance</b>."],
      ["What happens to sunlight", "🌥️", "About 30 percent of sunlight is reflected by clouds, air and bright surfaces (<b>albedo</b>). About 70 percent is absorbed by the air and the surface. The warm surface then gives off <b>infrared</b> (heat) energy."],
      ["Do the sum", "🧮", "Reflected = incoming x albedo percent / 100. Absorbed = incoming - reflected. Example: 200 units in and 25 percent albedo: reflected 50, absorbed 150."]],
      "Think about what bounces back and what stays.", "Albedo tells you what share is reflected. The rest is absorbed.",
      [["What does albedo measure?", "How much sunlight a surface reflects", "How hot a surface gets|How much rain falls"], ["Which has the highest albedo?", "Fresh snow", "Dark forest|Open ocean"],
       ["Roughly what share of sunlight does Earth reflect?", "About 30 percent", "About 3 percent|About 90 percent"], ["If energy in equals energy out, the planet's temperature...", "Stays steady", "Rises forever|Falls forever"],
       ["The Earth's surface gives off energy mostly as...", "Infrared (heat)", "Ultraviolet|Radio waves only"], ["Which absorbs more sunlight?", "Dark ocean water", "Fresh snow|Thick white clouds"],
       ["Melting ice lowers albedo, which...", "Increases absorption and warming", "Cools the planet more|Has no effect"], ["Energy absorbed equals incoming minus...", "Reflected energy", "Wind energy|Tidal energy"]], ENERGYN)),
    LS("Pressure, winds and global cells", MC([
      ["High and low pressure", "🌬️", "Air at the surface that is rising makes <b>low pressure</b> (clouds, rain). Sinking air makes <b>high pressure</b> (clear, dry). Wind blows from high toward low pressure, and Earth's spin bends it: to the right in the Northern Hemisphere, to the left in the Southern."],
      ["Three cells in each hemisphere", "🔄", "The <b>Hadley cell</b> (equator to about 30 degrees) rises at the equator and sinks near 30 degrees, making deserts. The <b>Ferrel cell</b> (30 to 60 degrees) and the <b>Polar cell</b> (60 degrees to the pole) complete the pattern."],
      ["Surface winds", "🧭", "<b>Trade winds</b> blow from the east in the tropics. <b>Westerlies</b> blow from the west in the mid-latitudes. <b>Polar easterlies</b> blow from the east near the poles. Winds are named for the direction they come FROM."]],
      "Wind goes from high pressure to low pressure, then bends because of Earth's spin.", "Rising air means low pressure and cloud. Sinking air means high pressure and dry weather.",
      [["Sinking air at the surface is linked to...", "High pressure and clear skies", "Low pressure and storms|Strong tides"], ["Wind blows from...", "High pressure to low pressure", "Low pressure to high pressure|Cold to hot only"],
       ["In the Northern Hemisphere, moving air is bent to the...", "Right", "Left|Up"], ["The cell that reaches from the equator to about 30 degrees is the...", "Hadley cell", "Ferrel cell|Polar cell"],
       ["Many of the world's big deserts lie near 30 degrees because there air...", "Sinks and dries", "Rises and rains|Freezes"], ["Trade winds blow from the...", "East", "West|North only"],
       ["A west wind blows...", "From the west", "Toward the west|From the sky"], ["Mid-latitude winds that flow from the west are the...", "Westerlies", "Trade winds|Polar easterlies"],
       ["The weather near the equator is often rainy because air there...", "Rises", "Sinks|Stands still"]])),
    LS("Lapse rates and rising air", MN([
      ["Rising air cools", "⛰️", "When air rises it meets lower pressure, expands, and <b>cools</b>. Dry air cools about <b>10 degrees Celsius per km</b>. This is the <b>dry adiabatic lapse rate</b>."],
      ["Clouds slow the cooling", "☁️", "When cooling air reaches its dew point, vapor condenses into cloud and releases <b>latent heat</b>. Now the air cools more slowly, about <b>5 degrees per km</b> (the <b>moist adiabatic lapse rate</b>). Sinking air warms at the same rates."],
      ["Mountains", "🏔️", "Air forced up a mountain cools, makes cloud and rain on the windward side, then sinks and warms on the leeward side. That is why the lee side is dry and warm."]],
      "Think about what happens to air as it climbs and the pressure drops.", "Dry air has a bigger lapse rate than moist air because moist air gets extra heat from condensation.",
      [["As air rises it...", "Expands and cools", "Compresses and warms|Stays the same"], ["Latent heat is released when vapor...", "Condenses", "Evaporates|Freezes from a gas into plasma"],
       ["The moist lapse rate is smaller than the dry one because...", "Condensation releases heat", "Moist air is heavier|Clouds are cold"], ["Air sinking down a mountain...", "Warms", "Cools|Turns to rain"],
       ["Which side of a mountain is usually dry and warm?", "Leeward side", "Windward side|The summit only"], ["Another name for the dry rate is the...", "Dry adiabatic lapse rate", "Dew point rate|Coriolis rate"],
       ["Air that cools to its dew point begins to...", "Form cloud", "Boil|Speed up"], ["Adiabatic means no heat is exchanged with the surroundings, and the temperature changes because of...", "Expansion or compression", "Sunlight|Wind direction"]], LAPSEN)),
    LS("Humidity and dew point", MN([
      ["Water vapor in the air", "💧", "Warm air can hold more water vapor than cold air. <b>Relative humidity</b> = vapor present / most it could hold x 100. At 100 percent the air is <b>saturated</b>."],
      ["Dew point", "🥤", "The <b>dew point</b> is the temperature to which air must cool to become saturated. When air cools to its dew point, vapor condenses into dew, fog or cloud. A cold drink 'sweats' for this reason."],
      ["Working it out", "🧮", "Example: air that could hold 20 grams of vapor per cubic meter but holds 10 grams has relative humidity 10 / 20 x 100 = 50 percent. Cooling the air lowers its capacity, so the relative humidity goes up."]],
      "Compare what the air holds with what it could hold.", "Cooler air holds less vapor, so cooling raises relative humidity.",
      [["Warm air compared with cold air can hold...", "More water vapor", "Less water vapor|The same vapor"], ["At 100 percent relative humidity the air is...", "Saturated", "Dry|Frozen"],
       ["If air cools but its vapor stays the same, relative humidity...", "Rises", "Falls|Becomes zero"], ["Dew point is the temperature at which air...", "Becomes saturated", "Freezes solid|Stops moving"],
       ["Water drops on the outside of a cold glass show...", "Air cooled below its dew point", "The glass leaks|Evaporation"], ["Fog forms when air near the ground...", "Cools to its dew point", "Warms above its dew point|Rises quickly"],
       ["Which air has the lowest relative humidity?", "Hot desert air", "Air just before rain|Air in fog"], ["A big gap between air temperature and dew point means the air is...", "Dry", "Foggy|Saturated"]], HUMN)),
    LS("Cloud types", MC([
      ["Naming clouds", "☁️", "Cloud names come from Latin. <b>Cirrus</b> means a curl of hair (high, wispy), <b>cumulus</b> means a heap (puffy), <b>stratus</b> means a layer (flat, gray), and <b>nimbus</b> means rain-bearing."],
      ["High, middle, low", "📏", "<b>High</b> clouds (cirrus, cirrostratus) are made of ice crystals. <b>Middle</b> clouds have the prefix 'alto-' (altocumulus). <b>Low</b> clouds include stratus and stratocumulus. Cumulus and cumulonimbus can grow tall through every level."],
      ["Weather clues", "⛈️", "Fair-weather cumulus are small puffs. <b>Cumulonimbus</b> are towering storm clouds with thunder, lightning and heavy showers. <b>Nimbostratus</b> bring steady, long rain or snow."]],
      "Break the cloud name into its Latin parts.", "Cirrus is high and thin, cumulus is puffy, stratus is a layer, nimbus means rain.",
      [["Which clouds are thin, wispy and made of ice crystals?", "Cirrus", "Cumulonimbus|Stratus"], ["Which clouds are flat gray layers that can cover the sky?", "Stratus", "Cirrus|Cumulus"],
       ["Which towering clouds bring thunderstorms?", "Cumulonimbus", "Cirrus|Altocumulus"], ["Which clouds bring steady, long-lasting rain?", "Nimbostratus", "Cumulus|Cirrus"],
       ["Small, puffy white clouds on a fair day are...", "Cumulus", "Nimbostratus|Cirrostratus"], ["The word nimbus means...", "Rain-bearing", "Heap|Layer"],
       ["The prefix 'alto-' marks which height of cloud?", "Middle", "Highest|Ground level"], ["The Latin word stratus means...", "Layer", "Curl of hair|Heap"],
       ["Cirrus clouds are high, so they are made of...", "Ice crystals", "Large raindrops|Dust"]])),
    LS("Mid-latitude cyclones and fronts", MC([
      ["Low-pressure storms", "🌀", "A <b>mid-latitude cyclone</b> is a large low-pressure storm system that forms where cold polar air meets warm air. In the Northern Hemisphere, winds spiral <b>counterclockwise</b> into the low."],
      ["Two fronts", "🌦️", "A <b>warm front</b> (warm air rises gently over cold air) brings wide layers of cloud and long, steady rain. A <b>cold front</b> (cold air pushes under warm air) is steep, so it brings tall clouds, short heavy storms and then cooler, clearer air."],
      ["Catching up", "⏩", "The cold front moves faster than the warm front. When it catches up, the fronts form an <b>occluded front</b> and the storm begins to fade. These storms mostly travel west to east in the westerlies."]],
      "Think about whether the front is gentle or steep.", "Warm fronts rise gently with long rain. Cold fronts are steep with short, heavy storms.",
      [["A mid-latitude cyclone is a...", "Low-pressure system", "High-pressure system|Tropical wave"], ["In the Northern Hemisphere, winds around a low spiral...", "Counterclockwise", "Clockwise|In straight lines"],
       ["Which front brings long, steady rain?", "Warm front", "Cold front|Occluded front only"], ["Which front brings short, heavy storms followed by cooler air?", "Cold front", "Warm front|Stationary front"],
       ["A cold front moves faster than a warm front, so it...", "Catches up and forms an occluded front", "Falls behind forever|Turns into a hurricane"], ["Mid-latitude storms usually travel from...", "West to east", "East to west|North to south"],
       ["Where do these storms form?", "Where cold and warm air masses meet", "At the equator|Inside deserts"], ["After a cold front passes, the air is usually...", "Cooler and clearer", "Hotter and more humid|Perfectly still"],
       ["A front is the boundary between...", "Two different air masses", "Land and sea only|Two time zones"]])),
    LS("Jet streams and Rossby waves", MC([
      ["Rivers of air", "✈️", "<b>Jet streams</b> are narrow, fast ribbons of wind near the top of the troposphere, around 9 to 12 km up, flowing mostly from west to east at over 100 km/h. The <b>polar jet</b> lies near 60 degrees and the <b>subtropical jet</b> near 30 degrees."],
      ["Why they exist", "🌡️", "Jets form where warm and cold air meet, because a big temperature contrast makes strong winds aloft. They are stronger in winter, when the contrast is larger."],
      ["Waves", "〰️", "The polar jet does not run straight. It meanders in big waves called <b>Rossby waves</b>. Troughs pull cold air south and ridges push warm air north, steering storms and heat waves. Pilots flying east ride the jet to save fuel."]],
      "Think about height, direction and what causes the strong winds.", "Jets come from big temperature contrasts, flow west to east, and meander in waves.",
      [["Jet streams flow mostly from...", "West to east", "East to west|South to north"], ["Jet streams are found near the top of the...", "Troposphere", "Thermosphere|Ocean"],
       ["Jet streams form where there is a large...", "Temperature contrast", "Rainfall total|Ocean tide"], ["The polar jet lies near which latitude?", "60 degrees", "0 degrees|90 degrees"],
       ["Big waves in the polar jet are called...", "Rossby waves", "Tsunami waves|Sound waves"], ["Jets are usually stronger in...", "Winter", "Summer|The same all year"],
       ["A trough in the jet can pull what toward the south (Northern Hemisphere)?", "Cold air", "Hot air|Ocean water"], ["Why do pilots like a tailwind from the jet when flying east?", "It saves time and fuel", "It makes the plane quieter|It lowers the cloud base"],
       ["The subtropical jet lies near...", "30 degrees", "60 degrees|The poles"]])),
    LS("Local winds", MC([
      ["Sea and land breezes", "🏖️", "Land heats and cools faster than water. By day the land is warmer, air rises over it, and cooler air flows in from the sea: a <b>sea breeze</b>. At night the land cools faster and the wind blows from land to sea: a <b>land breeze</b>."],
      ["Mountain and valley winds", "🏔️", "By day, slopes warm and air flows <b>up</b> the valley. At night, cold heavy air drains <b>down</b> the slopes."],
      ["Warm, dry downslope winds", "🔥", "Air that descends the lee side of mountains warms and dries as it sinks. These winds have names: <b>Chinook</b> (Rocky Mountains), <b>Foehn</b> (Alps) and <b>Santa Ana</b> (California). A Chinook can melt snow fast."]],
      "Think about which surface heats up faster, land or water.", "Wind blows from the cooler, higher-pressure place toward the warmer, lower-pressure place.",
      [["Which wind blows from the sea to the land?", "Sea breeze", "Land breeze|Chinook"], ["When does a sea breeze usually blow?", "In the afternoon", "At midnight|Only in winter"],
       ["At night the land is cooler than the sea, so the wind blows...", "From land to sea", "From sea to land|Straight up"], ["The Chinook is a...", "Warm, dry wind down the lee of mountains", "Cold ocean current|Tropical storm"],
       ["The Foehn is found in the...", "Alps", "Amazon|Sahara"], ["Why does downslope air warm?", "It is compressed as it sinks", "It touches the sun|It picks up ocean water"],
       ["Cold air draining down valley slopes at night is a...", "Mountain breeze", "Sea breeze|Trade wind"], ["Land heats faster than water because water...", "Has a high heat capacity", "Reflects no light|Is always deeper than 10 km"],
       ["The Santa Ana wind blows in...", "California", "Norway|Japan"]])),
    LS("Birth of a tropical cyclone", MC([
      ["What they need", "🌀", "A <b>tropical cyclone</b> needs warm sea water (at least about 26.5 degrees Celsius to a good depth), moist air, little change of wind with height, and the <b>Coriolis effect</b> to spin. It forms at least about 5 degrees from the equator, where the Coriolis effect is strong enough."],
      ["Structure", "👁️", "A calm <b>eye</b> sits in the center, surrounded by the <b>eyewall</b> with the strongest winds and heaviest rain. Spiral rain bands reach outward. The warm ocean supplies energy, so storms weaken over land or cold water."],
      ["Different names", "📛", "The same kind of storm is a <b>hurricane</b> in the Atlantic and northeast Pacific, a <b>typhoon</b> in the northwest Pacific, and a <b>cyclone</b> in the Indian Ocean and South Pacific. The biggest danger is often the <b>storm surge</b>, a wall of sea water pushed onto the coast."]],
      "Think about what fuels the storm and why the equator is too close.", "Warm water feeds the storm, Coriolis spins it, and land cuts off its fuel.",
      [["A tropical cyclone needs sea water that is...", "Warm (above about 26.5 degrees Celsius)", "Near freezing|Very salty and cold"], ["A hurricane in the Atlantic is called a ___ in the northwest Pacific.", "Typhoon", "Tornado|Monsoon"],
       ["The calm center of the storm is the...", "Eye", "Eyewall|Front"], ["The strongest winds are found in the...", "Eyewall", "Eye|Outer sky"],
       ["Why do these storms rarely form right at the equator?", "The Coriolis effect is too weak", "The water is too cold|There is no air"], ["Why do hurricanes weaken over land?", "They lose their warm-water fuel", "Land is higher than clouds|The Sun is too bright"],
       ["Storm surge is...", "Sea water pushed ashore by the storm", "A lightning strike|A type of cloud"], ["In the Indian Ocean the storm is called a...", "Cyclone", "Typhoon|Blizzard"],
       ["Tropical cyclones form over...", "Warm oceans", "Cold deserts|Polar ice"]])),
    LS("Reading past climates", MC([
      ["Proxies", "🪵", "Thermometers are only about 150 years old. To learn older climates, scientists use <b>proxies</b>: natural records that depend on climate."],
      ["Examples", "🧊", "<b>Tree rings</b>: wide rings mean good growing years. <b>Ice cores</b>: layers of snow trap tiny air bubbles holding ancient CO2; cores from Antarctica reach back about 800,000 years. <b>Pollen</b> in lake mud shows which plants lived there. <b>Corals</b> and <b>ocean sediments</b> record sea temperatures."],
      ["Dating and limits", "⏳", "Each proxy is dated by counting layers or by radioactive decay (for example, carbon-14 for younger material). No single proxy is perfect, so scientists combine many to check each other."]],
      "Think about what natural record builds up in layers over time.", "Ice traps air bubbles, tree rings show growth, and pollen shows plant types.",
      [["A climate proxy is a...", "Natural record that reflects past climate", "Weather forecast|Type of thermometer"], ["Wide tree rings usually show...", "Good growing years", "A volcano|No growth at all"],
       ["Ancient air bubbles are found in...", "Ice cores", "Tree rings|Pollen grains"], ["Pollen in lake mud tells us about...", "Past plant life", "Ancient tides|The Moon"],
       ["Antarctic ice cores reach back about...", "800,000 years", "800 years|8 million years"], ["Why do scientists combine several proxies?", "To check one another", "Because each is perfect|To save time"],
       ["Which is dated by counting yearly layers?", "Tree rings", "A modern thermometer|A weather map"], ["Corals can record past...", "Sea temperature", "Lava flows|Wind speed"],
       ["Direct thermometer records are only about...", "150 years old", "5,000 years old|1 million years old"]])),
    LS("Greenhouse gases and forcing", MN([
      ["The main gases", "🏭", "<b>Carbon dioxide</b> (CO2) from burning fossil fuels and clearing forests is the biggest human-caused greenhouse gas. <b>Methane</b> (CH4) comes from livestock, rice paddies, landfills and gas leaks. <b>Nitrous oxide</b> (N2O) comes mostly from fertilizer. <b>Water vapor</b> amplifies warming."],
      ["Global warming potential", "⚖️", "<b>GWP</b> compares how strongly a gas warms over 100 years with CO2 (which is 1). Methane is about 28, nitrous oxide nearly 300. Methane breaks down in about a decade, but CO2 lingers for centuries. Total warming push is measured as <b>radiative forcing</b>."],
      ["The Keeling Curve", "📈", "Since 1958 CO2 has been measured at Mauna Loa, Hawaii. The record, called the <b>Keeling Curve</b>, climbs year after year with small yearly wiggles as plants take up CO2 in northern summer. CO2 was about 280 ppm before the Industrial Revolution and is now over 420 ppm."]],
      "Think about which gas is the biggest source and how strong each gas is.", "GWP multiplies a gas's mass to give an equal amount of CO2.",
      [["The biggest human-caused greenhouse gas is...", "Carbon dioxide", "Oxygen|Argon"], ["Methane comes from...", "Livestock, landfills and gas leaks", "Ocean salt|Volcanic ice"],
       ["Nitrous oxide comes mostly from...", "Fertilizer", "Waves|Moonlight"], ["GWP compares a gas's warming with that of...", "Carbon dioxide", "Oxygen|Nitrogen"],
       ["The Keeling Curve records...", "Carbon dioxide at Mauna Loa", "Ocean tides at Hawaii|Sea ice in Alaska"], ["Pre-industrial CO2 was about...", "280 ppm", "28 ppm|2,800 ppm"],
       ["Which stays in the air longer?", "Carbon dioxide", "Methane|Both vanish in a day"], ["Radiative forcing measures the...", "Push on Earth's energy balance", "Speed of wind|Height of tides"]], GHGN)),
    LS("The ozone layer", MC([
      ["Sunscreen in the sky", "🛡️", "The <b>ozone layer</b>, in the stratosphere about 15 to 35 km up, absorbs most harmful <b>ultraviolet</b> (UV) light from the Sun. Ozone is made of three oxygen atoms (O3)."],
      ["The ozone hole", "🕳️", "Chemicals called <b>CFCs</b>, once used in spray cans and refrigerators, drifted up and destroyed ozone. In 1985 scientists reported an <b>ozone hole</b> over Antarctica each spring, caused by very cold air and CFCs."],
      ["A success story", "✅", "In 1987 nations signed the <b>Montreal Protocol</b> to phase out CFCs. The ozone layer is slowly recovering and is expected to mostly heal around the middle of this century. Ozone near the ground is different: it is a smog pollutant that harms lungs."]],
      "Think about the layer where ozone is found and what it blocks.", "CFCs destroyed ozone, and a world agreement phased them out.",
      [["The ozone layer absorbs harmful...", "Ultraviolet light", "Sound|Magnetism"], ["Ozone is found mainly in the...", "Stratosphere", "Troposphere|Exosphere"],
       ["The chemicals that destroyed ozone were...", "CFCs", "Oxygen|Nitrogen"], ["The ozone hole appears over...", "Antarctica", "The Sahara|Brazil"],
       ["The treaty that phased out CFCs is the...", "Montreal Protocol", "Kyoto Rules|Panama Treaty"], ["Ozone is made of how many oxygen atoms?", "Three", "Two|Four"],
       ["Ozone near the ground is...", "A harmful smog pollutant", "The same helpful shield|A type of cloud"], ["The ozone layer is...", "Slowly recovering", "Completely gone|Growing thicker every day"],
       ["The ozone hole was reported in...", "1985", "1585|2025"]])),
    LS("Air pollution, smog and acid rain", MC([
      ["Particles and gases", "🏭", "<b>Particulate matter</b> (PM2.5) is dust and soot smaller than 2.5 micrometers that can enter lungs and blood. Other pollutants include <b>sulfur dioxide</b> (SO2) from burning coal, <b>nitrogen oxides</b> (NOx) from vehicles, and carbon monoxide."],
      ["Smog and inversions", "🌫️", "<b>Photochemical smog</b> forms when sunlight reacts with NOx and other gases to make ground-level ozone. A <b>temperature inversion</b> (a warm layer above cool air) acts like a lid and traps pollution near the ground, as in valleys such as Los Angeles and Mexico City."],
      ["Acid rain", "🌧️", "SO2 and NOx dissolve in cloud water to make <b>acid rain</b> (pH below about 5.6). It can harm lakes, forests and stone buildings, and it can fall far downwind from the source. Scrubbers on smokestacks and clean-air laws have cut it a lot."]],
      "Think about where each pollutant comes from and what traps it.", "Coal gives sulfur, vehicles give nitrogen oxides, and an inversion acts as a lid.",
      [["Burning coal releases a lot of...", "Sulfur dioxide", "Helium|Pure oxygen"], ["Vehicles are a main source of...", "Nitrogen oxides", "Sea salt|Pollen"],
       ["A temperature inversion...", "Traps pollution near the ground", "Blows pollution away|Makes rain"], ["Acid rain is caused mainly by...", "SO2 and NOx", "Ozone and helium|Dust only"],
       ["Normal rain is slightly acidic with a pH of about...", "5.6", "1.0|9.0"], ["PM2.5 is dangerous because the particles...", "Are tiny enough to enter the lungs", "Are very large|Are made of salt"],
       ["Which place often has smog trapped by mountains?", "Los Angeles", "Open ocean|Antarctica"], ["Smokestack scrubbers help reduce...", "Acid rain", "Tides|Earthquakes"],
       ["Photochemical smog needs...", "Sunlight", "Snow|Total darkness"]])),
    LS("Climographs", MN([
      ["Two things in one chart", "📊", "A <b>climograph</b> shows a place's average monthly <b>temperature</b> (a line) and <b>precipitation</b> (bars) for a year. You can read its climate type from the shape."],
      ["Read the patterns", "🔍", "Hot all year with a rainy season: tropical savanna or monsoon. Hot with almost no bars: desert. Mild with dry summers and wet winters: <b>Mediterranean</b>. A big temperature swing: continental interior. Little swing: near the ocean or the equator."],
      ["Work out numbers", "🧮", "<b>Annual range</b> = warmest month - coldest month. Example: 22 and -3 gives 25. Also compare tall and short bars to see wet and dry seasons."]],
      "Look at the line for temperature and the bars for rain.", "Think about the season of the rain and the size of the temperature swing.",
      [["On a climograph, bars usually show...", "Precipitation", "Temperature|Wind"], ["On a climograph, the line usually shows...", "Temperature", "Rainfall|Elevation"],
       ["Mild, wet winters and dry summers fit which climate?", "Mediterranean", "Tundra|Tropical rainforest"], ["Warm all year with almost no bars suggests a...", "Desert", "Rainforest|Taiga"],
       ["A small temperature range all year is typical of places...", "Near the equator or ocean", "Deep in a continent's interior|At the pole during winter"], ["A huge annual range suggests a...", "Continental interior", "Rainforest|Small tropical island"],
       ["Annual temperature range means...", "Warmest month minus coldest month", "Rainfall divided by months|Sum of all months"], ["Tall bars in summer and short in winter show a...", "Summer wet season", "Winter wet season|No seasons at all"]], CLIMN)),
    LS("Weather, climate and normals", MN([
      ["Not the same thing", "🌦️", "<b>Weather</b> is what the atmosphere does today or this week. <b>Climate</b> is the pattern of weather over a long time, usually <b>30 years or more</b>."],
      ["Climate normals", "📏", "A <b>climate normal</b> is the average of a measurement (like July temperature or yearly rain) over 30 years. The weather service updates the normals every 10 years. A day that is far from normal is an <b>anomaly</b>."],
      ["Why it matters", "💡", "One cold winter does not disprove global warming, just as one hot day does not prove it. Climate science looks at long trends. Average = total / how many values."]],
      "Think about time: days versus decades.", "A normal is an average over many years. An anomaly is the difference from that normal.",
      [["Climate is the pattern of weather over...", "Many years", "A single hour|One afternoon"], ["A climate normal is usually averaged over...", "30 years", "3 days|300 years"],
       ["A single cold day...", "Does not disprove climate warming", "Proves the planet is cooling|Changes the normal at once"], ["A temperature that is far from the normal is an...", "Anomaly", "Isoline|Equinox"],
       ["Which is weather?", "A thunderstorm this afternoon", "Deserts are dry|Seasons exist"], ["Which is climate?", "Winters are cold and wet in this region", "It is raining now|Tomorrow will be foggy"],
       ["Weather agencies update the normals every...", "10 years", "Day|1,000 years"], ["An average is found by...", "Adding values then dividing by how many", "Picking the biggest value|Subtracting the smallest"]], NORMN)),
    LS("Stable and unstable air", MC([
      ["Will the air keep rising?", "🎈", "A pocket of air that is warmer than its surroundings keeps rising: the air is <b>unstable</b>. A pocket that is cooler than its surroundings sinks back: the air is <b>stable</b>."],
      ["What it means for weather", "⛈️", "Unstable air builds tall cumulus and cumulonimbus clouds, showers and storms. Stable air makes flat stratus layers, fog or clear skies. Heating the ground, or air forced up a mountain or front, can make air unstable."],
      ["Inversions", "🛑", "An <b>inversion</b> is a very stable layer where temperature rises with height. It stops air from rising, traps smoke and haze, and can hold fog near the ground."]],
      "Compare the rising pocket of air with the air around it.", "If the pocket stays warmer than its surroundings it keeps rising.",
      [["Air that keeps rising because it is warmer than its surroundings is...", "Unstable", "Stable|Saturated only"], ["Which clouds are typical of unstable air?", "Towering cumulonimbus", "Flat stratus|Clear sky"],
       ["Which is typical of stable air?", "Flat stratus or fog", "Thunderstorms|Tornadoes"], ["An inversion is a layer where temperature...", "Rises with height", "Falls with height|Never changes"],
       ["An inversion tends to...", "Trap smoke and haze", "Create big storms|Speed up the wind"], ["What can make stable air rise and become unstable?", "Strong surface heating", "A calm night|Dense fog"],
       ["Air that sinks back down after being lifted is...", "Stable", "Unstable|Boiling"], ["Showers on a hot afternoon fit with...", "Unstable air", "A strong inversion|Stable air"]]))
  ];
  l25.push(LS("Mixed practice", MX(l25, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])));
  l25.push(LS("Level 25 Challenge", MX(l25, [10, 11, 12, 13, 14, 15, 16, 17, 2, 4, 5, 12, 15, 16])));

  // ---------- LEVEL 26 number makers ----------
  const DISCN = () => {
    const w = pick([5, 10, 20, 30]), d = ri(1, 4), v = ri(1, 3), Qd = w * d * v, m = Math.random();
    if (m < 0.5) return Q(`A river is ${w} m wide and ${d} m deep on average, and the water moves at ${v} m per second. What is its discharge, in cubic meters per second?`, Qd,
      "Discharge is the volume of water passing a point each second.", "Multiply the width, the depth and the speed together.",
      "Example: a stream 4 m wide, 2 m deep, flowing 1 m per second. 4 x 2 x 1 = 8 cubic meters per second. Now do yours.");
    if (m < 0.8) return Q(`A river is ${w} m wide and ${d} m deep. Its discharge is ${Qd} cubic meters per second. How fast does the water flow, in m per second?`, v,
      "Work backwards from discharge to speed.", "Divide the discharge by the width times the depth.",
      "Example: discharge 24, width 4, depth 3. Area is 12, and 24 / 12 = 2 m per second. Now do yours.");
    return Q(`A river's cross-section is ${w * d} square meters and the water flows at ${v} m per second. What is the discharge, in cubic meters per second?`, Qd,
      "The cross-section area already combines width and depth.", "Multiply the area by the speed.",
      "Example: area 10 square meters and speed 3 m per second gives 30. Now do yours.");
  };
  const GRADN = () => {
    const dist = pick([10, 20, 25, 50]), g = pick([2, 4, 5, 10, 20]), drop = dist * g, m = Math.random();
    if (m < 0.45) return Q(`A river falls ${drop} m in height over ${dist} km. What is its gradient, in meters per km?`, g,
      "Gradient says how steep the river bed is.", "Divide the drop in height by the distance.",
      "Example: a fall of 60 m over 20 km is 60 / 20 = 3 m per km. Now do yours.");
    if (m < 0.75) return Q(`A river has a gradient of ${g} m per km. How many meters does it fall over ${dist} km?`, drop,
      "Use the rate for each kilometer.", "Multiply the gradient by the number of kilometers.",
      "Example: 3 m per km over 15 km is 3 x 15 = 45 m. Now do yours.");
    return Q(`A river falls ${drop} m at a gradient of ${g} m per km. How long is this stretch, in km?`, dist,
      "Work backwards: total drop compared with drop per km.", "Divide the total drop by the gradient.",
      "Example: a drop of 80 m at 4 m per km covers 80 / 4 = 20 km. Now do yours.");
  };
  const SPN = () => {
    const s = ri(3, 40), m = Math.random();
    if (m < 0.6) return Q(`A seismograph records the S wave ${s} seconds after the P wave. Using the simple rule of 8 km of distance for each second of delay, how far away is the earthquake, in km?`, 8 * s,
      "The longer the gap between P and S waves, the farther away the quake.", "Multiply the delay in seconds by the distance per second.",
      "Example: a delay of 5 seconds at 8 km per second is 40 km. Now do yours.");
    return Q(`An earthquake is ${8 * s} km away. By the simple rule (8 km per second of delay), how many seconds after the P wave does the S wave arrive?`, s,
      "Work backwards from the distance to the delay.", "Divide the distance by the distance per second.",
      "Example: 80 km away means 80 / 8 = 10 seconds. Now do yours.");
  };
  const MAGN = () => {
    const a = ri(2, 6), d = ri(1, 3), m = Math.random();
    if (m < 0.65) return Q(`How many times larger is the ground shaking (amplitude) in a magnitude ${a + d} earthquake than in a magnitude ${a} earthquake?`, Math.pow(10, d),
      "Each whole step on the magnitude scale multiplies the shaking by the same number.", "Every whole number up multiplies the amplitude by ten. Multiply ten by itself once per step.",
      "Example: magnitude 5 versus magnitude 3 is two steps, so 10 x 10 = 100 times. Now do yours.");
    return Q(`A magnitude ${a + 1} earthquake releases about how many times more energy than a magnitude ${a} earthquake? (Round to the nearest whole number of the usual rule.)`, 32,
      "Energy grows faster than amplitude on the scale.", "The usual rule is that one step up releases a bit more than thirty times the energy.",
      "Example: one step multiplies amplitude by 10, but energy by about 32. So magnitude 4 to 5 is about 32 times the energy. Now answer for yours.");
  };
  const PLATEN = () => {
    const r = pick([1, 2, 3, 5, 8]), My = pick([1, 2, 5, 10, 20]), m = Math.random();
    if (m < 0.6) return Q(`A plate moves ${r} cm per year. How far does it travel in ${My} million years, in km? (1 cm per year for 1 million years is 10 km.)`, 10 * r * My,
      "Slow plate speeds add up over millions of years.", "Multiply the speed in cm per year by the number of million years, then by ten.",
      "Example: 2 cm per year for 3 million years: 2 x 3 x 10 = 60 km. Now do yours.");
    return Q(`A plate moved ${10 * r * My} km in ${My} million years. What was its speed, in cm per year? (1 cm per year for 1 million years is 10 km.)`, r,
      "Work backwards from the distance to the speed.", "Divide the distance by ten times the number of million years.",
      "Example: 60 km in 3 million years is 60 / (3 x 10) = 2 cm per year. Now do yours.");
  };
  const SEAN = () => {
    const r = pick([2, 3, 4, 5]), y = pick([10, 20, 30, 50]);
    if (Math.random() < 0.6) return Q(`Sea level is rising ${r} mm per year. How many mm does it rise in ${y} years?`, r * y,
      "A steady yearly rise adds up.", "Multiply the yearly rise by the number of years.",
      "Example: 3 mm per year for 10 years is 30 mm. Now do yours.");
    return Q(`Sea level rose ${r * y} mm over ${y} years at a steady rate. How many mm per year is that?`, r,
      "Work backwards from the total to the yearly rate.", "Divide the total rise by the number of years.",
      "Example: 60 mm in 20 years is 60 / 20 = 3 mm per year. Now do yours.");
  };

  // ---------- LEVEL 26 ----------
  const l26 = [
    LS("Layers of the Earth", MC([
      ["Inside the planet", "🌍", "Earth has four main layers. The thin <b>crust</b> is the rocky skin (about 5 to 70 km thick). The <b>mantle</b> is hot, slowly flowing rock about 2,900 km thick. The <b>outer core</b> is liquid iron and nickel. The <b>inner core</b> is solid iron and nickel, held solid by huge pressure."],
      ["Two kinds of crust", "🪨", "<b>Oceanic crust</b> is thin (about 7 km), dense basalt. <b>Continental crust</b> is thicker (30 to 70 km) and lighter, mostly granite. The boundary between crust and mantle is the <b>Moho</b>."],
      ["Lithosphere and asthenosphere", "🧩", "The crust and the rigid top of the mantle together form the <b>lithosphere</b>, broken into plates. Below it the softer, slowly flowing <b>asthenosphere</b> lets plates move."]],
      "Picture Earth cut in half and list the layers from outside to inside.", "The outer core is the only liquid layer. Oceanic crust is thinner and denser than continental crust.",
      [["Which layer of Earth is liquid?", "Outer core", "Inner core|Crust"], ["Which layer is the thickest?", "Mantle", "Crust|Inner core"],
       ["The inner core is solid because of...", "Enormous pressure", "Cold temperatures|Ocean water"], ["Oceanic crust is mainly...", "Basalt", "Granite|Limestone"],
       ["Continental crust is mainly...", "Granite", "Basalt|Iron"], ["The boundary between crust and mantle is the...", "Moho", "Equator|Dateline"],
       ["The lithosphere is...", "Crust plus the rigid top of the mantle", "The liquid outer core|The atmosphere"], ["Plates move on the...", "Asthenosphere", "Moho|Inner core"],
       ["Which crust is thicker?", "Continental", "Oceanic|They are equal"]])),
    LS("The rock cycle", MC([
      ["Three families", "🪨", "<b>Igneous</b> rock forms when magma or lava cools (granite cooled slowly underground; basalt cooled quickly at the surface). <b>Sedimentary</b> rock forms when pieces of rock and shells are pressed and cemented together in layers (sandstone, limestone, shale). <b>Metamorphic</b> rock is changed by heat and pressure without melting (marble, slate, gneiss)."],
      ["A cycle", "🔄", "Rocks change from one type to another over millions of years: weathering and erosion make sediment, burial makes sedimentary rock, heat and pressure make metamorphic rock, melting makes magma, and cooling makes igneous rock."],
      ["Clues", "🔍", "Fossils and layers point to sedimentary rock. Crystals that interlock point to igneous rock. Bands and folds point to metamorphic rock. Examples of changes: limestone becomes marble; shale becomes slate."]],
      "Think about how each rock family forms: cooling, layering, or heating and squeezing.", "Fossils are in sedimentary rock, crystals form as magma cools, and bands come from heat and pressure.",
      [["Granite is a(n)...", "Igneous rock", "Sedimentary rock|Metamorphic rock"], ["Which rock type often holds fossils?", "Sedimentary", "Igneous|Metamorphic"],
       ["Marble forms from...", "Limestone", "Sandstone|Granite"], ["Slate forms from...", "Shale", "Basalt|Limestone"],
       ["Metamorphic rocks form by...", "Heat and pressure without melting", "Cooling lava|Settling mud only"], ["Basalt forms when...", "Lava cools quickly", "Mud is cemented|Marble melts"],
       ["Sandstone is...", "Sedimentary", "Igneous|Metamorphic"], ["Igneous rock begins as...", "Molten rock", "Shells on a beach|Frozen water"],
       ["Melting any rock makes...", "Magma", "Sediment|Marble"]])),
    LS("Weathering", MC([
      ["Breaking down rock", "🧱", "<b>Weathering</b> breaks rock into smaller pieces in place. <b>Erosion</b> then carries the pieces away by water, wind, ice or gravity."],
      ["Three kinds", "🔨", "<b>Physical</b> weathering breaks rock without changing it: <b>frost wedging</b> (water freezes in cracks and expands), <b>exfoliation</b> (outer layers peel off like an onion) and plant roots. <b>Chemical</b> weathering changes the rock itself: <b>oxidation</b> (iron rusts) and <b>carbonation</b> (weak acid in rainwater dissolves limestone). <b>Biological</b> weathering includes lichens and burrowing animals."],
      ["Climate matters", "🌡️", "Physical weathering is strong in cold places with many freeze-thaw cycles. Chemical weathering is fastest where it is warm and wet, such as tropical rainforests."]],
      "Ask yourself: did the rock break apart, or did it change chemically?", "Freezing and thawing cracks rock physically. Rain acid and rust change it chemically.",
      [["Frost wedging is a type of...", "Physical weathering", "Chemical weathering|Erosion only"], ["Rusting of iron minerals is...", "Oxidation", "Exfoliation|Frost wedging"],
       ["Rainwater dissolving limestone is...", "Carbonation", "Frost wedging|Deposition"], ["Weathering differs from erosion because erosion also...", "Moves the pieces away", "Makes the pieces larger|Stops all water"],
       ["Where is chemical weathering fastest?", "Warm, wet regions", "Cold, dry regions|The Antarctic interior"], ["Where is frost wedging strongest?", "Places that often freeze and thaw", "Hot deserts at all times|Rainforest canopies"],
       ["Lichens and plant roots cause...", "Biological weathering", "Volcanic weathering|Tidal weathering"], ["Exfoliation is when...", "Outer layers peel off rock", "Rock melts|Rock sinks"],
       ["Water expands when it...", "Freezes", "Boils away|Falls as rain"]])),
    LS("Drainage basins and stream order", MC([
      ["Where the water goes", "🏞️", "A <b>drainage basin</b> (or watershed) is all the land that drains into one river. A high ridge, the <b>drainage divide</b>, separates one basin from the next. The <b>Continental Divide</b> in the Rockies sends water to different oceans."],
      ["Tributaries", "🌿", "Small streams join to make bigger rivers. A smaller stream that flows into a bigger one is a <b>tributary</b>, and the meeting place is the <b>confluence</b>. The <b>mouth</b> is where a river ends at a sea or lake."],
      ["Stream order", "🔢", "Scientists number streams. In the <b>Strahler</b> system, the smallest streams are order 1. When two order-1 streams join, they make an order-2 stream. Bigger numbers mean bigger rivers. The <b>Amazon</b> has the largest basin on Earth."]],
      "Picture a basin as a funnel and the divide as its rim.", "Streams of the same order join to make the next order up.",
      [["All the land that drains into one river is its...", "Drainage basin", "Delta|Divide"], ["The ridge between two basins is the...", "Drainage divide", "Confluence|Tributary"],
       ["A smaller stream that joins a larger one is a...", "Tributary", "Mouth|Source"], ["The place where two rivers meet is the...", "Confluence", "Divide|Delta"],
       ["In stream order, the smallest streams are order...", "1", "5|10"], ["Two order-1 streams that join make order...", "2", "1|3"],
       ["Which river has the largest basin on Earth?", "Amazon", "Nile|Danube"], ["Where does a river end?", "At its mouth", "At its confluence|At its divide"],
       ["The Continental Divide runs through the...", "Rocky Mountains", "Alps|Sahara"]])),
    LS("Meanders and floodplains", MC([
      ["Curves in a river", "〰️", "Slow, wide rivers on gentle slopes form bends called <b>meanders</b>. Water flows faster on the outside of a bend, which erodes a <b>cut bank</b>. It slows on the inside, where sand and gravel pile up as a <b>point bar</b>."],
      ["Oxbow lakes", "🌙", "Over time the bend grows tighter. In a flood the river can cut through the neck and take a shortcut. The old loop is left behind as a curved <b>oxbow lake</b>."],
      ["Floodplains", "🌾", "A <b>floodplain</b> is the flat land beside a river that floods. Floods drop fertile silt, so floodplains are rich farmland. Heavy flood deposits build natural banks called <b>levees</b>. A river with many shifting channels and sandbars is <b>braided</b>."]],
      "Think about where water moves fast and where it slows down.", "Fast water erodes the outside of a bend, and slow water deposits on the inside.",
      [["Erosion is strongest on the...", "Outside of a bend", "Inside of a bend|Middle of a lake"], ["A point bar forms on the...", "Inside of a bend", "Outside of a bend|River mouth only"],
       ["A curved lake left when a meander is cut off is an...", "Oxbow lake", "Fjord|Lagoon"], ["A floodplain is...", "Flat land beside a river that floods", "A steep valley wall|The deep ocean floor"],
       ["Why is floodplain farmland rich?", "Floods leave fertile silt", "It has no water|It is made of sand dunes"], ["Natural banks built by floods are called...", "Levees", "Fjords|Spits"],
       ["A braided river has...", "Many shifting channels and sandbars", "A single deep canyon|A frozen surface"], ["The bank cut away by water is the...", "Cut bank", "Point bar|Levee"],
       ["Meanders are typical of rivers on...", "Gentle slopes", "Steep waterfalls|Glaciers"]])),
    LS("River discharge", MN([
      ["How much water?", "🌊", "<b>Discharge</b> is the volume of water passing a point in a river each second, measured in cubic meters per second (m3/s)."],
      ["The formula", "🧮", "Discharge = <b>width x depth x velocity</b>. Example: 10 m wide x 2 m deep x 3 m per second = 60 m3/s. Width x depth is the <b>cross-section area</b>."],
      ["Floods and flow", "📈", "After heavy rain or snowmelt, rivers carry more discharge: deeper, wider and faster. Gauging stations measure it so people can warn about floods."]],
      "Discharge depends on how big the channel is and how fast the water flows.", "Multiply the size of the channel's cross-section by the speed.",
      [["Discharge is measured in...", "Cubic meters per second", "Meters per kilometer|Degrees"], ["Discharge equals width x depth x...", "Velocity", "Gradient|Salinity"],
       ["During a flood, discharge usually...", "Increases", "Decreases|Stays zero"], ["Cross-section area equals...", "Width x depth", "Length x speed|Depth + speed"],
       ["If the speed doubles and the channel stays the same, discharge...", "Doubles", "Halves|Stays the same"], ["Gauging stations are used to...", "Measure river flow", "Measure tides|Forecast earthquakes"],
       ["A river that is faster, deeper and wider has...", "Higher discharge", "Lower discharge|No discharge"], ["The unit m3/s means...", "Volume per second", "Length per second|Mass per meter"]], DISCN)),
    LS("Slope and gradient", MN([
      ["How steep?", "📐", "<b>Gradient</b> is how steeply the land or a river bed falls. For rivers it is often written in meters of drop per kilometer: <b>drop / distance</b>."],
      ["Long profile", "📉", "A river's long profile is steep near the source (fast, cutting down) and gentle near the mouth (slow, wide, depositing). Steep reaches make waterfalls and rapids."],
      ["Example", "🧮", "A river falls 300 m over 100 km: 300 / 100 = 3 m per km. On a hillside, slope can also be written as a percent (rise / run x 100)."]],
      "Gradient compares the fall in height with the distance traveled.", "Steeper means a bigger drop for the same distance.",
      [["Gradient compares the drop in height with the...", "Distance traveled", "River width|Rainfall"], ["Rivers are usually steepest near the...", "Source", "Mouth|Middle of an ocean"],
       ["Near the mouth, a river is usually...", "Gentle and depositing", "Steep and cutting down|Frozen"], ["Waterfalls and rapids occur at...", "Steep reaches", "Delta fronts|Flat floodplains"],
       ["A river's long profile shows its...", "Height along its length", "Width at the surface|Salt content"], ["A steeper gradient makes water flow...", "Faster", "Slower|Backwards"],
       ["Gradient in meters per kilometer equals drop divided by...", "Distance in km", "Depth|Width"], ["Slope as a percent is rise / run x...", "100", "10|1,000"]], GRADN)),
    LS("Seismic waves", MN([
      ["Waves from an earthquake", "📈", "An earthquake sends out <b>P waves</b> (primary, push-pull, fastest, travel through solids and liquids), <b>S waves</b> (secondary, side-to-side, slower, travel only through solids) and <b>surface waves</b> (slowest, and cause most damage)."],
      ["Looking inside Earth", "🔦", "S waves cannot cross the liquid <b>outer core</b>, so seismographs on the far side record a 'shadow zone'. That is how scientists learned the outer core is liquid."],
      ["Finding the distance", "📏", "P waves arrive first, then S waves. The longer the delay between them, the farther away the quake. Three stations find the <b>epicenter</b> by <b>triangulation</b>: where three circles cross. The <b>focus</b> is the point underground where the rock breaks."]],
      "Think about speed and which waves can pass through liquid.", "P waves are first. S waves are slower and stop at liquid. Surface waves arrive last.",
      [["Which waves arrive first?", "P waves", "S waves|Surface waves"], ["Which waves cannot travel through liquid?", "S waves", "P waves|Both can"],
       ["Which waves usually cause the most damage?", "Surface waves", "P waves|None of them"], ["The shadow zone showed that the outer core is...", "Liquid", "Solid|Empty"],
       ["The point on the surface above the break is the...", "Epicenter", "Focus|Fault line"], ["The point underground where the break starts is the...", "Focus", "Epicenter|Moho"],
       ["How many stations are used to triangulate an epicenter?", "At least three", "Exactly one|None"], ["A bigger delay between P and S waves means the quake is...", "Farther away", "Closer|Stronger"]], SPN)),
    LS("Earthquake magnitude", MN([
      ["Measuring size", "📊", "<b>Magnitude</b> measures the energy released by a quake. Modern scientists use the <b>moment magnitude scale</b>, which replaced the older <b>Richter scale</b>. <b>Intensity</b> (the Modified Mercalli scale) describes how strong the shaking felt in a particular place."],
      ["It is logarithmic", "🔟", "Each whole number up means <b>10 times more ground motion</b> (amplitude) and about <b>32 times more energy</b>. A magnitude 7 shakes the ground 100 times more than a magnitude 5."],
      ["Typical effects", "🏚️", "Below 3 is rarely felt. 5 can damage weak buildings. 7 or more can be major. The largest recorded quake was magnitude 9.5 in Chile in 1960."]],
      "Each step on the scale is a multiplication, not an addition.", "Look back at the second slide for the two multipliers, and match the one for shaking or for energy.",
      [["Each whole number on the magnitude scale is how many times more ground motion?", "10", "2|100"], ["Each whole number is about how many times more energy?", "32", "10|2"],
       ["Which scale describes the shaking felt at a place?", "Mercalli intensity", "Moment magnitude|Beaufort"], ["The largest recorded earthquake was in...", "Chile in 1960", "Canada in 2000|Spain in 1900"],
       ["The older scale replaced by moment magnitude was the...", "Richter scale", "Kelvin scale|Saffir scale"], ["A magnitude scale that is logarithmic means...", "Each step multiplies the effect", "Each step adds the same amount|Numbers never rise"],
       ["Which is stronger?", "Magnitude 7", "Magnitude 5|They are the same"], ["Intensity depends on...", "Distance and local ground conditions", "Only the name of the city|Only the day of the week"]], MAGN)),
    LS("Evidence for moving plates", MN([
      ["Wegener's idea", "🧭", "In 1912 <b>Alfred Wegener</b> proposed <b>continental drift</b>: the continents were once joined in a supercontinent, <b>Pangaea</b>, that began splitting about 200 million years ago. His evidence: matching coastlines, matching rocks and mountain chains, and identical fossils (such as the reptile <i>Mesosaurus</i>) in South America and Africa."],
      ["Sea-floor spreading", "🌊", "In the 1960s, maps of the sea floor showed ridges where new crust forms. Rock on either side has matching <b>magnetic stripes</b> that flip as Earth's magnetic field reverses. Older crust is farther from the ridge. This convinced scientists, and <b>plate tectonics</b> was born."],
      ["Speeds today", "📏", "GPS shows plates move at about the speed fingernails grow: 1 to 10 cm per year. Over a million years, 1 cm per year adds up to 10 km."]],
      "Think about what Wegener and later scientists used as evidence.", "Matching fossils, coasts and magnetic stripes all point to moving plates.",
      [["The supercontinent that broke apart was...", "Pangaea", "Gondwanaland|Atlantis"], ["Who proposed continental drift?", "Alfred Wegener", "Isaac Newton|Charles Darwin"],
       ["Matching fossils in South America and Africa suggest...", "The lands were once joined", "Animals could fly across|The fossils were planted"], ["Magnetic stripes on the sea floor show...", "Sea-floor spreading", "Ocean tides|Ice ages"],
       ["Crust at a mid-ocean ridge is the...", "Youngest", "Oldest|Same age as continents"], ["Plates move about as fast as...", "Fingernails grow", "A running car|A jet plane"],
       ["Plate tectonics became accepted in the...", "1960s", "1760s|1990s"], ["The sea floor shows ridges where...", "New crust forms", "Crust disappears|Glaciers form"]], PLATEN)),
    LS("Types of volcanoes", MC([
      ["Three shapes", "🌋", "<b>Shield volcanoes</b> (Mauna Loa, Hawaii) are broad and gentle, built by runny basalt lava that flows far. <b>Stratovolcanoes</b> or composite cones (Mount Fuji, Vesuvius, Mount St. Helens) are steep and made of alternating lava and ash; their thick lava traps gas and erupts explosively. <b>Cinder cones</b> are small, steep piles of ash and rock."],
      ["Calderas", "🕳️", "When a big eruption empties the magma chamber, the top can collapse into a huge bowl called a <b>caldera</b> (Yellowstone, Crater Lake)."],
      ["Explosive or gentle?", "💥", "Magma rich in silica is thick and sticky, so gas cannot escape and eruptions are violent. Runny, silica-poor basalt flows gently. The <b>Volcanic Explosivity Index (VEI)</b> rates eruptions from 0 to 8."]],
      "Think about whether the lava is runny or sticky.", "Runny lava builds broad, gentle volcanoes. Sticky lava builds steep, explosive ones.",
      [["Mauna Loa is a...", "Shield volcano", "Cinder cone|Caldera"], ["Mount Fuji is a...", "Stratovolcano", "Shield volcano|Cinder cone"],
       ["Shield volcanoes are built from...", "Runny basalt lava", "Sticky silica-rich lava|Glaciers"], ["Stratovolcanoes erupt explosively because their magma is...", "Thick and gas-rich", "Thin and runny|Frozen"],
       ["A giant bowl left when a volcano collapses is a...", "Caldera", "Delta|Spit"], ["Crater Lake sits in a...", "Caldera", "Cinder cone|Shield volcano"],
       ["The VEI rates eruptions from 0 to...", "8", "5|100"], ["A small steep pile of ash and rock is a...", "Cinder cone", "Shield volcano|Caldera"],
       ["Magma with lots of silica makes eruptions that are...", "More explosive", "Gentler|Silent always"]])),
    LS("Coastal erosion landforms", MC([
      ["Waves at work", "🌊", "Waves erode coasts by <b>hydraulic action</b> (force of water in cracks), <b>abrasion</b> (hurling sand and pebbles) and <b>attrition</b> (rocks rubbing each other smaller)."],
      ["Features in order", "🏝️", "Waves attack weak points and make a <b>sea cave</b>. The cave grows through a headland into an <b>arch</b>. The arch collapses, leaving a tall rock <b>stack</b> (the Twelve Apostles in Australia), which later becomes a short <b>stump</b>. A <b>wave-cut platform</b> is the flat rock shelf at the foot of a retreating cliff."],
      ["Headlands and bays", "🗺️", "Hard rock resists and sticks out as a <b>headland</b>. Soft rock erodes into a sheltered <b>bay</b>, where waves lose energy and deposit sand."]],
      "Follow the sequence: cave, arch, stack, stump.", "Hard rock makes headlands and soft rock makes bays.",
      [["The first feature in the cave-arch-stack sequence is a...", "Sea cave", "Stump|Stack"], ["A tall rock column left after an arch falls is a...", "Stack", "Spit|Delta"],
       ["A flat rock shelf at the base of a cliff is a...", "Wave-cut platform", "Beach berm|Floodplain"], ["Headlands are made of...", "Hard rock", "Soft rock|Ice"],
       ["Bays form where the rock is...", "Soft", "Hard|Frozen only"], ["Waves hurling sand and pebbles at the cliff is...", "Abrasion", "Attrition|Deposition"],
       ["Rocks rubbing each other smaller is...", "Attrition", "Abrasion|Oxidation"], ["The Twelve Apostles in Australia are...", "Sea stacks", "Volcanoes|Glacier valleys"],
       ["Hydraulic action is the...", "Force of water and trapped air in cracks", "Melting of ice|Wind carrying sand"]])),
    LS("Longshore drift and beaches", MC([
      ["Zigzag sand", "↗️", "Waves often hit the beach at an angle. The <b>swash</b> carries sand up the beach at that angle, but the <b>backwash</b> runs straight back down. Sand zigzags along the coast: <b>longshore drift</b>."],
      ["Landforms of deposition", "🏖️", "A <b>spit</b> is a finger of sand attached to land at one end, built where the coast bends away. A <b>bar</b> closes off a bay and makes a <b>lagoon</b>. A <b>tombolo</b> links an island to the mainland. <b>Barrier islands</b> are long sandy islands off the coast, such as those along the US Gulf and Atlantic coasts."],
      ["Managing beaches", "🧱", "<b>Groynes</b> are walls built out from the beach to trap drifting sand. <b>Beach nourishment</b> adds new sand. <b>Sea walls</b> protect land but can increase erosion at the foot."]],
      "Picture sand zigzagging because the swash is angled and the backwash is straight.", "Deposition builds spits, bars and tombolos where the drifting sand slows down.",
      [["Sand moving along a coast in a zigzag is...", "Longshore drift", "Hydraulic action|Frost wedging"], ["The swash moves sand...", "Up the beach at an angle", "Straight out to sea|Into the clouds"],
       ["A finger of sand attached to land at one end is a...", "Spit", "Stack|Arch"], ["A bar across a bay creates a...", "Lagoon", "Cliff|Volcano"],
       ["A deposit linking an island to the mainland is a...", "Tombolo", "Stump|Cave"], ["A groyne is used to...", "Trap drifting sand", "Make waves bigger|Melt ice"],
       ["Adding new sand to a beach is...", "Beach nourishment", "Abrasion|Isostasy"], ["Long sandy islands off a coast are...", "Barrier islands", "Atolls|Fjords"],
       ["Backwash returns sand...", "Straight down the beach slope", "Along the shore|Into the air"]])),
    LS("Isostasy and rebound", MC([
      ["Floating crust", "🧊", "The lithosphere floats on the denser, flowing mantle, like a block of wood on water. This balance is called <b>isostasy</b>. Thick, light continental crust floats higher than thin, dense oceanic crust."],
      ["Roots of mountains", "🏔️", "High mountains have deep 'roots' of crust pushing down into the mantle, just as most of an iceberg is under water."],
      ["Rebound", "⬆️", "A heavy ice sheet pushes the crust down. When the ice melts, the land slowly <b>rebounds</b> upward. Scandinavia and Hudson Bay in Canada are still rising by up to about a centimeter a year since the last ice age. Erosion of mountains also lets them rise a little."]],
      "Think about floating blocks and what happens when you remove weight.", "Remove a heavy load and the floating crust slowly rises back up.",
      [["Isostasy is the...", "Balance of floating crust on the mantle", "Spread of the ocean floor|Fall of rain"], ["Thick continental crust floats...", "Higher than thin oceanic crust", "Lower than oceanic crust|At exactly the same level"],
       ["When an ice sheet melts, the land below...", "Slowly rises", "Sinks forever|Turns to lava"], ["Scandinavia is rising because of...", "Post-glacial rebound", "A new volcano|Rain"],
       ["Tall mountains have...", "Deep crustal roots", "No roots|Roots made of ice"], ["An iceberg is a good model of isostasy because most of it is...", "Below the surface", "Above the surface|Made of rock"],
       ["Heavy ice pushing crust down is an example of...", "Loading", "Rebound|Weathering"], ["Hudson Bay in Canada is still...", "Rising slowly", "Sinking quickly|Frozen solid"]])),
    LS("Faults and folds", MC([
      ["Faults", "💥", "A <b>fault</b> is a crack along which rock has moved. In a <b>normal fault</b> one block drops down as the crust is stretched. In a <b>reverse (thrust) fault</b> one block is pushed up as the crust is squeezed. In a <b>strike-slip fault</b> blocks slide sideways, like the San Andreas."],
      ["Rift valleys", "🏞️", "When blocks drop between normal faults, the sunken block is a <b>graben</b> (a rift valley, like the East African Rift) and the raised blocks beside it are <b>horsts</b>."],
      ["Folds", "🌀", "Squeezing can bend layers into folds. An <b>anticline</b> is an upfold (shaped like an arch). A <b>syncline</b> is a downfold (shaped like a trough)."]],
      "Think about whether the crust is being stretched, squeezed or slid sideways.", "Stretching makes normal faults, squeezing makes reverse faults and folds, and sliding makes strike-slip faults.",
      [["Crust that is stretched forms...", "Normal faults", "Reverse faults|Folds only"], ["Crust that is squeezed forms...", "Reverse (thrust) faults and folds", "Normal faults|Strike-slip faults"],
       ["The San Andreas Fault is a...", "Strike-slip fault", "Normal fault|Reverse fault"], ["A sunken block between faults is a...", "Graben", "Horst|Anticline"],
       ["A raised block between faults is a...", "Horst", "Graben|Syncline"], ["An upfold is an...", "Anticline", "Syncline|Epicenter"],
       ["A downfold is a...", "Syncline", "Anticline|Horst"], ["The East African Rift is an example of a...", "Rift valley", "Delta|Spit"],
       ["A fault is a...", "Crack where rock has moved", "River bend|Layer of clouds"]])),
    LS("How mountains form", MC([
      ["Fold mountains", "🏔️", "<b>Fold mountains</b> form where plates collide and squeeze layers into huge folds: the Himalayas (India meeting Asia), the Alps, the Andes. The Himalayas are still rising."],
      ["Other types", "⛰️", "<b>Fault-block mountains</b> form when crust breaks and tilts along faults (the Sierra Nevada, the Tetons, and the Basin and Range). <b>Volcanic mountains</b> are built by eruptions (Mount Fuji). <b>Dome mountains</b> form where magma pushes rock up (the Black Hills)."],
      ["Old and young", "⏳", "Young mountains are tall and jagged. Old mountains such as the <b>Appalachians</b> have been worn down by hundreds of millions of years of erosion, so they are lower and rounded. The word for mountain building is <b>orogeny</b>."]],
      "Think about what pushes the rock up: collision, faulting, volcanoes or magma.", "Tall, jagged mountains are young. Low, rounded mountains are old.",
      [["The Himalayas formed when...", "India collided with Asia", "A volcano erupted|Glaciers carved a valley"], ["Fold mountains come from plates...", "Colliding and squeezing", "Moving apart only|Standing still"],
       ["The Sierra Nevada is a...", "Fault-block mountain range", "Volcanic island chain|Coral reef"], ["Mount Fuji is a...", "Volcanic mountain", "Fold mountain|Dome mountain"],
       ["The Appalachians are low and rounded because they are...", "Very old and eroded", "Brand new|Made of ice"], ["Mountain building is called...", "Orogeny", "Isostasy|Longshore drift"],
       ["The Andes formed from...", "A plate colliding and sinking beneath South America", "A meteor crash|Desert winds"], ["Young mountains tend to be...", "Tall and jagged", "Low and rounded|Perfectly flat"],
       ["Dome mountains form when...", "Magma pushes rock upward", "Rivers dry up|Ice melts"]])),
    LS("Sea-level change", MN([
      ["Why sea level changes", "📏", "<b>Global (eustatic) sea level</b> changes when the amount of ocean water changes: melting land ice (glaciers and ice sheets) adds water, and warm water <b>expands</b> (thermal expansion). Melting floating sea ice does not raise sea level much, just as melting ice in a full glass does not overflow."],
      ["Past and present", "🧊", "About 20,000 years ago, at the Last Glacial Maximum, sea level was roughly 120 m lower than today, and land bridges connected places like Britain and Europe. Since 1900 the sea has risen about 20 cm, and the rise is speeding up to a few mm per year."],
      ["Local changes", "🏝️", "<b>Relative</b> sea level also depends on the land: rebounding land rises while sinking delta land falls. Flooded river valleys form <b>rias</b>, and flooded glacial valleys form <b>fjords</b>."]],
      "Two main causes: more water in the ocean, or the same water taking up more space.", "Melting land ice adds water. Floating ice already displaces its own weight.",
      [["Which melting ice raises sea level?", "Ice sheets on land", "Floating sea ice|Ice cubes in a glass of water"], ["Warm water takes up more space, which is called...", "Thermal expansion", "Isostasy|Erosion"],
       ["At the Last Glacial Maximum, sea level was about...", "120 m lower than today", "120 m higher than today|Exactly the same"], ["Britain was joined to Europe then because...", "Sea level was lower", "Ice formed a bridge only|The Atlantic dried completely"],
       ["Flooded glacial valleys are called...", "Fjords", "Rias|Deltas"], ["Flooded river valleys are called...", "Rias", "Fjords|Calderas"],
       ["Relative sea level can fall where land is...", "Rising (rebounding)", "Sinking|Frozen"], ["The recent rise in sea level is...", "Speeding up", "Slowing to zero|Exactly zero"]], SEAN)),
    LS("Fans, deltas and sediment", MC([
      ["Where sediment is dropped", "🏜️", "When a fast river reaches flat land, it slows and drops its load. At a mountain front it spreads sediment into a fan-shaped pile: an <b>alluvial fan</b> (Death Valley has many)."],
      ["Deltas", "🔺", "When a river enters a lake or sea, it slows suddenly and drops sediment, building a <b>delta</b>. The Nile delta is triangle-shaped like the Greek letter delta. The <b>Mississippi delta</b> looks like a bird's foot. The <b>Ganges-Brahmaputra</b> delta is the largest in the world."],
      ["Why deltas matter", "🌾", "Deltas have rich soil and are home to huge populations, but they are low and can sink when dams trap sediment upstream, making floods and sea-level rise more dangerous."]],
      "Think about what happens to a fast river's energy when it hits flat land or a still sea.", "A river loses speed, so it can no longer carry its load and drops sediment.",
      [["A fan-shaped sediment pile at a mountain front is an...", "Alluvial fan", "Oxbow lake|Sea stack"], ["A delta forms where a river enters...", "A sea or lake", "A mountain|A glacier"],
       ["The Nile delta has the shape of a...", "Triangle", "Square|Circle"], ["The Mississippi delta looks like a...", "Bird's foot", "Fan|Crescent"],
       ["Why does a river drop sediment at its mouth?", "It slows down suddenly", "It speeds up|It freezes"], ["The largest delta in the world is the...", "Ganges-Brahmaputra", "Nile|Mississippi"],
       ["Dams upstream can cause deltas to...", "Sink and shrink", "Grow without limit|Disappear instantly into space"], ["Delta soil is usually...", "Rich and fertile", "Barren|Pure salt"],
       ["Alluvial fans are common in...", "Dry mountain regions like Death Valley", "Rainforest lowlands|Polar ice sheets"]]))
  ];
  l26.push(LS("Mixed practice", MX(l26, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])));
  l26.push(LS("Level 26 Challenge", MX(l26, [10, 11, 12, 13, 14, 15, 16, 17, 5, 6, 7, 8, 9, 3, 4])));

  // ---------- LEVEL 27 number makers ----------
  const SLOPEN = () => {
    const run = pick([100, 200, 250, 400, 500]), p = pick([4, 5, 8, 10, 20, 25]), rise = run * p / 100, m = Math.random();
    if (m < 0.5) return Q(`On a digital elevation model, a hillside rises ${rise} m over a horizontal distance of ${run} m. What is its slope, in percent?`, p,
      "Slope compares the climb with the horizontal distance.", "Divide the rise by the run, then multiply by one hundred.",
      "Example: a rise of 30 m over 200 m is 30 / 200 = 0.15, which is 15 percent. Now do yours.");
    return Q(`A slope is ${p} percent steep. How many meters does the ground rise over a horizontal distance of ${run} m?`, rise,
      "Percent slope tells you the rise for every one hundred of run.", "Multiply the run by the percent, then divide by one hundred.",
      "Example: a 10 percent slope over 300 m rises 300 x 10 / 100 = 30 m. Now do yours.");
  };
  const IDWN = () => {
    const a = ri(10, 30), k = ri(1, 6), b = a + 3 * k;
    return Q(`Weather station A is 1 km from a point and reads ${a}. Station B is 2 km from the point and reads ${b}. With inverse distance weighting (weight = 1 / distance), what is the estimate at the point?`, a + k,
      "Nearer stations get more weight. Station A is nearer, so the answer is closer to its reading than to the other.", "Weights are one for A and one half for B. Estimate = (A x 1 + B x 0.5) / (1 + 0.5).",
      "Example: A reads 10 at 1 km and B reads 16 at 2 km. (10 x 1 + 16 x 0.5) / 1.5 = 18 / 1.5 = 12. Now do yours.");
  };
  const OVERN = () => {
    let s1, s2, s3, tot;
    for (let i = 0; i < 99; i++) { s1 = ri(1, 5); s2 = ri(1, 5); s3 = ri(1, 5); tot = 5 * s1 + 3 * s2 + 2 * s3; if (tot % 10 === 0) break; }
    if (tot % 10 !== 0) { s1 = 4; s2 = 5; s3 = 5; tot = 45 + 5; tot = 5 * s1 + 3 * s2 + 2 * s3; }
    return Q(`A site is scored 1 to 5 on three layers: slope score ${s1} (weight 50 percent), road access score ${s2} (weight 30 percent) and flood safety score ${s3} (weight 20 percent). What is the weighted suitability score? (It comes out as a whole number.)`, tot / 10,
      "Each layer counts according to its weight. Bigger weights matter more.", "Multiply each score by its weight as a decimal, then add the three results.",
      "Example: scores 4, 2, 5 with weights 50, 30, 20 percent. 4 x 0.5 + 2 x 0.3 + 5 x 0.2 = 2 + 0.6 + 1 = 3.6. Now do yours.");
  };
  const NETN = () => {
    const a = ri(5, 20), b = ri(5, 20), c = ri(5, 20), d = ri(5, 20);
    if (a + b === c + d) return NETN();
    return Q(`A network analysis offers two routes from home to a clinic. Route 1 goes through a bridge: ${a} minutes then ${b} minutes. Route 2 goes through a tunnel: ${c} minutes then ${d} minutes. What is the shortest total travel time, in minutes?`, Math.min(a + b, c + d),
      "Find the total time for each route separately.", "Add the two parts of each route, then pick the smaller total.",
      "Example: route 1 is 6 + 9 = 15, route 2 is 7 + 5 = 12. The shortest is 12. Now do yours.");
  };
  const CFN = () => {
    const cap = pick([50, 100, 200, 500]), cf = pick([20, 25, 30, 40, 50, 90]), out = cap * 24 * cf / 100;
    if (Math.random() < 0.6) return Q(`A ${cap} MW power plant has a capacity factor of ${cf} percent. How many megawatt-hours (MWh) does it produce in one day?`, out,
      "Capacity factor tells what share of the maximum output is actually produced.", "Find the maximum for 24 hours (capacity x 24), then take the capacity-factor percent of that.",
      "Example: a 10 MW plant at 50 percent for one day: 10 x 24 = 240, and half is 120 MWh. Now do yours.");
    return Q(`A ${cap} MW plant produced ${out} MWh in one day. What is its capacity factor, in percent?`, cf,
      "Compare what it produced with the most it could have produced.", "Maximum is capacity x 24. Divide the output by the maximum and multiply by one hundred.",
      "Example: a 10 MW plant that made 120 MWh. Maximum is 240, and 120 / 240 x 100 = 50 percent. Now do yours.");
  };
  const CARBN = () => {
    const [b, e] = pick([[400, 40], [200, 40], [600, 40], [500, 50], [300, 50], [400, 50], [200, 50], [600, 50]]);
    if (Math.random() < 0.7) return Q(`A remaining carbon budget is ${b} billion tonnes of CO2 and the world emits ${e} billion tonnes a year. In how many years would the budget be used up at that rate?`, b / e,
      "Budget divided by yearly use tells how long it lasts.", "Divide the budget by the yearly emissions.",
      "Example: a budget of 300 used at 50 a year lasts 300 / 50 = 6 years. Now do yours.");
    return Q(`A budget of ${b} billion tonnes of CO2 must last ${b / e} years. How many billion tonnes a year can be emitted?`, e,
      "Spread the budget evenly over the years.", "Divide the budget by the number of years.",
      "Example: a budget of 300 over 6 years allows 300 / 6 = 50 a year. Now do yours.");
  };
  const SEATN = () => {
    let seats, p, n;
    for (let i = 0; i < 99; i++) { seats = pick([100, 120, 150, 200]); p = pick([15, 20, 25, 30, 35, 40, 45, 60]); n = seats * p / 100; if (Number.isInteger(n)) break; }
    if (!Number.isInteger(n)) { seats = 100; p = 30; n = 30; }
    return Q(`In a proportional system a party wins ${p} percent of the votes and the parliament has ${seats} seats. How many seats does it get?`, n,
      "Proportional means seats match the share of votes.", "Find that percent of the total number of seats.",
      "Example: 25 percent of 80 seats is 80 x 25 / 100 = 20 seats. Now do yours.");
  };

  // ---------- LEVEL 27 ----------
  const l27 = [
    LS("Tobler's law and clustering", MC([
      ["Near things are alike", "📍", "<b>Tobler's First Law of Geography</b> (1970): 'Everything is related to everything else, but near things are more related than distant things.' Neighboring places tend to be similar in climate, income or soil."],
      ["Spatial autocorrelation", "🧲", "<b>Spatial autocorrelation</b> measures how similar nearby values are. <b>Positive</b> means similar values cluster together (high-income areas next to high-income areas). <b>Negative</b> means neighbors are unlike, like a checkerboard. Near zero means a random pattern. A popular statistic is <b>Moran's I</b>."],
      ["Why it matters", "⚠️", "Many statistics assume each data point is independent. Because neighbors are related, spatial data break that rule, so geographers use special spatial methods."]],
      "Think about whether nearby places resemble each other.", "Clustered similar values are positive, checkerboard patterns are negative, and no pattern is random.",
      [["Tobler's law says near things are...", "More related than distant things", "Always identical|Unrelated"], ["Similar values clustered together show...", "Positive spatial autocorrelation", "Negative spatial autocorrelation|No data"],
       ["A checkerboard pattern of high and low values shows...", "Negative spatial autocorrelation", "Positive spatial autocorrelation|A cluster"], ["A random pattern has autocorrelation near...", "Zero", "One hundred|Minus one million"],
       ["A common statistic for spatial autocorrelation is...", "Moran's I", "Pythagoras' rule|Kepler's law"], ["Tobler's First Law was stated in...", "1970", "1770|2010"],
       ["Why do spatial data need special methods?", "Neighbors are not independent", "Maps cannot be printed|Data are always wrong"], ["Which is an example of positive autocorrelation?", "Wealthy neighborhoods next to each other", "Rich and poor alternating house by house|Random dots"]])),
    LS("Geocoding and georeferencing", MC([
      ["From address to point", "📮", "<b>Geocoding</b> turns an address or place name into coordinates so it can be mapped. A computer matches the address to a street file or address list. <b>Reverse geocoding</b> turns coordinates back into an address."],
      ["Fitting an old map", "🗺️", "<b>Georeferencing</b> gives a scanned map or aerial photo a real-world location. You pick <b>control points</b> (road corners, river bends) whose true coordinates you know, and the software stretches and rotates the image to fit."],
      ["Check the quality", "✅", "Geocoders give a match score, and some addresses fail or land in the wrong place. In georeferencing, the <b>RMS error</b> shows how well the control points fit: lower is better. Always use a clear coordinate system."]],
      "Think about whether you start with words or with a picture.", "Geocoding uses addresses. Georeferencing uses control points on an image.",
      [["Turning an address into coordinates is...", "Geocoding", "Georeferencing|Reverse geocoding"], ["Turning coordinates into an address is...", "Reverse geocoding", "Geocoding|Rasterizing"],
       ["Giving a scanned map a real-world location is...", "Georeferencing", "Geocoding|Digitizing a person"], ["Georeferencing uses known points called...", "Control points", "Contour lines|Time zones"],
       ["A lower RMS error means the fit is...", "Better", "Worse|Impossible"], ["Which needs a street file or address list?", "Geocoding", "Georeferencing|Remote sensing"],
       ["A good control point is a...", "Road corner with known coordinates", "Moving cloud|Random pixel"], ["A geocoder gives a match score to show...", "How well the address matched", "How tall the building is|The weather"]])),
    LS("Elevation models and slope", MN([
      ["A grid of heights", "🏔️", "A <b>digital elevation model (DEM)</b> is a raster grid where each cell holds the ground height. DEMs come from satellites, radar and <b>LiDAR</b> (laser pulses from a plane)."],
      ["What you can make", "🗺️", "From a DEM software can make <b>contour lines</b>, <b>slope</b> (steepness), <b>aspect</b> (the compass direction a slope faces) and <b>hillshade</b> (a 3D-looking shaded map). Slope percent = rise / run x 100."],
      ["Using it", "☀️", "In the Northern Hemisphere, south-facing slopes get the most sun, so they are warmer and drier. Steep slopes are prone to landslides. Flat land near rivers is prone to floods."]],
      "A DEM is a grid, and each cell stores the elevation.", "Slope compares height gained with horizontal distance.",
      [["A DEM stores...", "Elevation in a grid", "Street names|Population only"], ["LiDAR measures height using...", "Laser pulses", "Sound waves underwater|Magnets"],
       ["Aspect tells you the...", "Compass direction a slope faces", "Height of a peak|Rainfall total"], ["A hillshade gives a map a...", "3D-looking shaded relief", "List of addresses|Color-coded language"],
       ["In the Northern Hemisphere, which slopes get the most sun?", "South-facing", "North-facing|West-facing only"], ["Slope percent equals rise / run x...", "100", "1|1,000"],
       ["Which hazard is linked with steep slopes?", "Landslides", "Droughts of the ocean|Tides"], ["Contour lines can be made from a...", "DEM", "Phone book|Census list"]], SLOPEN)),
    LS("Interpolation", MN([
      ["Guessing between points", "📏", "We cannot measure rainfall or temperature everywhere. <b>Interpolation</b> estimates values at places without measurements using nearby measured points. It relies on Tobler's law."],
      ["Methods", "🧮", "<b>Inverse distance weighting (IDW)</b> gives closer points more weight (weight = 1 / distance). <b>Kriging</b> uses statistics of how values change with distance. <b>Thiessen polygons</b> give each spot the value of its nearest station."],
      ["Example", "📝", "Point is 1 km from A (reads 10) and 2 km from B (reads 16). Weights 1 and 0.5. Estimate = (10 x 1 + 16 x 0.5) / 1.5 = 12. The result is closer to A, the nearer station."]],
      "Interpolation estimates a value between measurements.", "Closer points matter more in IDW.",
      [["Interpolation estimates values...", "Between known points", "Only at known points|On the Moon"], ["In IDW, a closer point gets...", "More weight", "Less weight|No weight"],
       ["The weight in IDW equals...", "1 divided by the distance", "The distance squared plus ten|The temperature"], ["Which method uses statistics of change with distance?", "Kriging", "Thiessen polygons|Georeferencing"],
       ["Thiessen polygons give each place the value of its...", "Nearest station", "Highest station|Average of the whole world"], ["Interpolation works because of...", "Tobler's first law", "Newton's law|Boyle's law"],
       ["Estimating outside the range of data points is called...", "Extrapolation", "Georeferencing|Geocoding"], ["More stations generally give...", "A more reliable estimate", "A less reliable estimate|No estimate"]], IDWN)),
    LS("Weighted overlay", MN([
      ["Finding the best place", "🧩", "To choose a site for a school, solar farm or park, a GIS can combine several map layers. Each layer is first <b>reclassified</b> to a common scale (for example 1 = poor to 5 = excellent)."],
      ["Weights", "⚖️", "More important layers get bigger <b>weights</b>, which add to 100 percent. Each cell's score = (score 1 x weight 1) + (score 2 x weight 2) + ... The highest-scoring cells are the best sites."],
      ["Example", "📝", "Scores 4, 2, 5 with weights 50, 30, 20 percent: 4 x 0.5 + 2 x 0.3 + 5 x 0.2 = 3.6. Weights reflect people's values, so decisions about them should be open and fair."]],
      "Each layer counts according to how important it is.", "Weights must add up to a whole (one hundred percent).",
      [["Weighted overlay combines several...", "Map layers", "Time zones|Countries"], ["Reclassifying puts layers onto...", "A common scale", "A different projection|A secret code"],
       ["Bigger weights go to layers that are...", "More important", "Less important|Older"], ["The weights usually add up to...", "100 percent", "50 percent|1,000 percent"],
       ["The best sites have the...", "Highest total score", "Lowest total score|Most roads only"], ["Weighted overlay is used in...", "Site selection", "Weather forecasting only|Cooking"],
       ["Who should help decide the weights?", "People affected, in an open way", "Nobody|Only one secret group"], ["A cell's score is found by multiplying each layer score by its weight and...", "Adding the results", "Subtracting them|Ignoring them"]], OVERN)),
    LS("Network analysis", MN([
      ["Roads as a network", "🛣️", "A <b>network</b> is made of <b>nodes</b> (junctions) and <b>edges</b> (road segments). Each edge has a cost: distance, travel time or fuel."],
      ["What a GIS can do", "🧭", "<b>Shortest path</b> finds the lowest-cost route. <b>Service area</b> shows everywhere reachable within, say, 10 minutes (for example to a hospital). <b>Closest facility</b> finds the nearest clinic. The classic method is <b>Dijkstra's algorithm</b>."],
      ["Real life", "🚑", "Delivery companies and ambulance services use networks. One-way streets, speed limits, closed bridges and traffic change costs. Shortest in distance is not always quickest in time."]],
      "Think of junctions and road segments with costs.", "Add the costs along each route and pick the lowest total.",
      [["The junctions in a network are called...", "Nodes", "Edges|Raster cells"], ["The road segments are called...", "Edges", "Nodes|Contours"],
       ["A service area shows...", "Everywhere reachable within a time or distance", "Only one route|Population density"], ["Finding the lowest-cost route is...", "Shortest path analysis", "Overlay|Interpolation"],
       ["A classic shortest-path method is...", "Dijkstra's algorithm", "Moran's I|Mercator"], ["The cost on an edge can be...", "Time or distance", "Only color|Only name"],
       ["The shortest distance is not always...", "The quickest time", "A road|A route"], ["Which finds the nearest clinic?", "Closest facility analysis", "Hillshade|Georeferencing"]], NETN)),
    LS("Sectors of the economy", MC([
      ["Five sectors", "🏭", "The <b>primary</b> sector takes natural resources (farming, mining, fishing, forestry). The <b>secondary</b> sector makes things (factories, building). The <b>tertiary</b> sector gives services (shops, teaching, health care, transport)."],
      ["The top sectors", "🧠", "The <b>quaternary</b> sector deals with knowledge and information (research, software, universities). The <b>quinary</b> sector holds top decision makers (senior government, major company leaders)."],
      ["Change over time", "📈", "Poor countries tend to have most jobs in the primary sector. As countries industrialize, the secondary sector grows. Rich countries now have most jobs in the tertiary and quaternary sectors. This is the pattern called <b>structural change</b>."]],
      "Think of the order: raw material, making, serving, knowing, deciding.", "The sector is based on what the job does, not where it happens.",
      [["A farmer is in which sector?", "Primary", "Secondary|Tertiary"], ["A car factory worker is in which sector?", "Secondary", "Primary|Quaternary"],
       ["A nurse is in which sector?", "Tertiary", "Primary|Secondary"], ["A software researcher is in which sector?", "Quaternary", "Primary|Tertiary"],
       ["Top government decision makers are often placed in the...", "Quinary sector", "Primary sector|Secondary sector"], ["Poor countries often have most jobs in the...", "Primary sector", "Quaternary sector|Quinary sector"],
       ["Rich countries have most jobs in the...", "Tertiary sector", "Primary sector|Secondary sector only"], ["A miner is in which sector?", "Primary", "Quaternary|Quinary"]])),
    LS("Rostow's stages of growth", MC([
      ["A famous model", "🪜", "In 1960 the economist <b>Walt Rostow</b> proposed that every country passes through five stages: (1) <b>traditional society</b>, (2) <b>preconditions for take-off</b>, (3) <b>take-off</b>, (4) <b>drive to maturity</b> and (5) <b>age of high mass consumption</b>."],
      ["What each means", "🚂", "Traditional: mostly farming, little technology. Preconditions: trade and new ideas grow. Take-off: industry spreads quickly, often led by one sector such as railways or textiles. Maturity: many industries and technology. Mass consumption: people buy cars, appliances and services."],
      ["Criticism", "🤔", "Critics say the model is too simple and one-way. It was based on Europe and North America, and ignores colonial history, trade rules and the fact that countries can skip stages or start with new technology (for example mobile phones before landlines)."]],
      "Count the stages from the oldest to the newest.", "Think of traditional farming first, a big surge in the middle, and mass consumption last.",
      [["Rostow's model has how many stages?", "Five", "Three|Eight"], ["The first stage is...", "Traditional society", "Take-off|High mass consumption"],
       ["The stage when industry spreads quickly is...", "Take-off", "Traditional society|Preconditions"], ["The last stage is...", "Age of high mass consumption", "Drive to maturity|Take-off"],
       ["Rostow published his model in...", "1960", "1760|1860"], ["One criticism of the model is that it...", "Assumes every country follows one path", "Is about rivers|Has too many stages to count"],
       ["A country skipping landlines for mobile phones shows...", "Countries can skip stages", "The model is perfect|Phones cause storms"], ["The 'preconditions for take-off' stage includes growing...", "Trade and new ideas", "Glaciers|Volcanoes"]])),
    LS("Global value chains", MC([
      ["Made in many places", "📱", "A <b>global value chain</b> splits the making of a product across many countries. A phone may be designed in the United States, use chips from Taiwan and South Korea, glass from the United States or Japan, minerals from Africa, and be assembled in China or India."],
      ["Outsourcing and offshoring", "🌐", "<b>Outsourcing</b> means paying another company to do a job. <b>Offshoring</b> moves a job to another country, often to cut costs. <b>Reshoring</b> brings production back home. Companies may also diversify to avoid depending on one place."],
      ["Winners and risks", "⚖️", "Chains bring jobs and cheaper goods, but the biggest profit often goes to design and branding, not assembly. A flood, war, or ship blockage in one place can halt the whole chain, as seen when the Suez Canal was blocked in 2021."]],
      "Think about splitting a product's journey across many countries.", "Offshoring moves jobs abroad, while reshoring brings them back.",
      [["A global value chain spreads production across...", "Many countries", "One village|Only the ocean"], ["Moving a job to another country is...", "Offshoring", "Reshoring|Recycling"],
       ["Bringing production back home is...", "Reshoring", "Offshoring|Outsourcing only"], ["Paying another company to do a job is...", "Outsourcing", "Reshoring|Geocoding"],
       ["In many chains the biggest profit goes to...", "Design and branding", "Packing boxes|Unloading ships"], ["A risk of long chains is that one problem...", "Can stop the whole chain", "Makes everything cheaper|Has no effect"],
       ["The Suez Canal was blocked in...", "2021", "1921|2121"], ["Companies diversify suppliers to...", "Reduce risk", "Raise prices on purpose|Avoid all trade"]])),
    LS("FDI and special economic zones", MC([
      ["Foreign direct investment", "💼", "<b>FDI</b> is when a company or investor in one country builds or buys a lasting business in another country, such as a car company building a factory abroad. It differs from a short-term purchase of shares."],
      ["Benefits and worries", "⚖️", "FDI can bring jobs, skills and technology. Worries include profits leaving the country, local firms being pushed out, and weak labor or environmental rules."],
      ["Special economic zones", "🏗️", "A <b>special economic zone (SEZ)</b> is an area with special rules, such as low taxes and simple customs, to attract business. Shenzhen, China (started in 1980) grew from a small town into a huge city. Other examples include Jebel Ali in Dubai."]],
      "FDI is a lasting investment in a business abroad.", "An SEZ has special rules to attract business.",
      [["FDI stands for...", "Foreign direct investment", "Federal data index|Food distribution initiative"], ["An example of FDI is a company...", "Building a factory in another country", "Buying a snack abroad on holiday|Reading a map"],
       ["A possible benefit of FDI is...", "Jobs and technology", "More mountains|Longer days"], ["A worry about FDI is...", "Profits leaving the country", "Too many sunsets|Smaller oceans"],
       ["An SEZ offers...", "Special rules such as lower taxes", "Free airplanes|Stronger gravity"], ["Shenzhen became a SEZ in...", "1980", "1780|2080"],
       ["Jebel Ali is a free zone in...", "Dubai", "Brazil|Canada"], ["FDI is different from buying a few shares for a short time because it is...", "A lasting business interest", "Always smaller|Always illegal"]])),
    LS("The tragedy of the commons", MC([
      ["Shared resources", "🐄", "A <b>commons</b> is a resource everyone can use, such as ocean fish, clean air or a shared pasture. In 1968 Garrett Hardin described the <b>tragedy of the commons</b>: each person gains by taking a bit more, but if everyone does it the resource collapses."],
      ["Real examples", "🐟", "Overfishing, polluted air, groundwater being pumped out and crowded orbit with space junk are all commons problems. Each user shares the cost with everyone but keeps the whole benefit."],
      ["Solutions", "🤝", "Rules and limits (fishing quotas, pollution caps), private or government ownership, markets (permits that can be traded), or communities managing the resource together. <b>Elinor Ostrom</b> won the Nobel Prize in 2009 for showing that communities often manage commons well when they have clear rules."]],
      "Think about what happens when everyone only thinks of their own gain.", "Solutions create limits or shared rules.",
      [["The tragedy of the commons was described by...", "Garrett Hardin", "Isaac Newton|Marie Curie"], ["A commons is a resource that is...", "Shared by many", "Owned by one person|Imaginary"],
       ["Overfishing in open ocean is an example of...", "A commons problem", "A good solution|Plate tectonics"], ["A fishing quota is a...", "Limit on how much can be caught", "New type of net|Boat race"],
       ["Elinor Ostrom showed that communities can...", "Manage commons well with clear rules", "Never manage anything|Fix everything with money only"], ["Why does the tragedy happen?", "Each user keeps the whole benefit but shares the cost", "People enjoy waste|Resources grow forever"],
       ["Which is a commons?", "The atmosphere", "A private garden|A house"], ["Tradable pollution permits are a ___ solution.", "Market", "Volcanic|Cartographic"]])),
    LS("The circular economy", MC([
      ["Take, make, waste?", "♻️", "In the <b>linear economy</b> we take resources, make products and throw them away. In a <b>circular economy</b> we design out waste and keep materials in use for as long as possible."],
      ["Ways to close the loop", "🔁", "<b>Reduce</b> what we use, <b>reuse</b> and <b>repair</b> items, <b>refurbish</b> and <b>remanufacture</b>, and <b>recycle</b> materials into new products. Sharing and renting (for example bike sharing) keep products working harder. Compost returns food waste to soil."],
      ["Why it matters", "🌍", "A circular economy saves energy, cuts mining and pollution, and creates repair and recycling jobs. Challenges include products that are hard to repair or mix materials that cannot be separated. Good design from the start is key."]],
      "Linear goes in a line to the dump, circular goes round and round.", "Keeping materials in use and designing out waste are the key ideas.",
      [["A linear economy is take, make and...", "Dispose", "Repair|Share"], ["A circular economy tries to...", "Keep materials in use and design out waste", "Throw away more|Make more rubbish"],
       ["Which is a circular action?", "Repairing a broken bike", "Dumping it in a landfill|Burning it in the open"], ["Bike sharing is circular because it...", "Makes products work harder", "Wastes metal|Needs more bikes per person"],
       ["Composting returns food waste to...", "Soil", "The atmosphere only|Space"], ["Remanufacturing means...", "Rebuilding used products to like-new", "Throwing them away|Burying them"],
       ["A challenge for recycling is products that...", "Mix materials that cannot be separated", "Are made of one pure material|Last a long time"], ["Circular economy can create jobs in...", "Repair and recycling", "Only space travel|Nothing at all"]])),
    LS("Capacity factor of power plants", MN([
      ["Not always at full power", "⚡", "A power plant's <b>capacity</b> (in megawatts, MW) is its maximum output. The <b>capacity factor</b> is the share of that maximum it actually produces over time: actual output / maximum possible output x 100."],
      ["Typical values", "🌬️", "Solar panels: roughly 15 to 25 percent (night and clouds). Onshore wind: roughly 30 to 40 percent. Nuclear: often over 90 percent. Coal and gas depend on how much they are needed. Energy = MW x hours, in megawatt-hours (MWh)."],
      ["Why it matters", "🔋", "To replace a 100 MW plant that runs nearly all the time, you may need much more than 100 MW of solar or wind, plus storage or backup, because they only produce when the sun shines or the wind blows."]],
      "Capacity is the maximum, and capacity factor is the share actually produced.", "Maximum energy in a day is capacity times twenty-four hours.",
      [["Capacity factor compares actual output with...", "Maximum possible output", "The size of the building|The price of electricity"], ["Which usually has the highest capacity factor?", "Nuclear", "Solar|Onshore wind"],
       ["Why is solar's capacity factor lower?", "No sun at night and cloudy days", "Panels are too heavy|They produce radio waves"], ["Energy in MWh equals MW x...", "Hours", "Kilometers|Degrees"],
       ["Onshore wind usually has a capacity factor of about...", "30 to 40 percent", "5 percent|99 percent"], ["Solar and wind need storage or backup because they...", "Do not always produce", "Make too much noise|Are illegal"],
       ["A plant with a capacity factor of 100 percent would run...", "At full power all the time", "Never|Only at night"], ["Capacity is measured in...", "Megawatts", "Meters|Millimeters"]], CFN)),
    LS("Carbon budgets", MN([
      ["How much more can we emit?", "🌡️", "To hold warming to a target (for example 1.5 or 2 degrees Celsius), the world can only add a limited total amount of CO2 to the air. That total is the <b>carbon budget</b>, measured in billions of tonnes (gigatonnes, Gt)."],
      ["Using it up", "⏳", "Years left = remaining budget / yearly emissions. Global CO2 emissions are around 40 Gt a year, so a budget of 400 Gt would be used up in 10 years. Emissions must fall to <b>net zero</b>, where any CO2 still released is balanced by CO2 removed."],
      ["Fair shares", "🤝", "Rich countries have emitted most of the CO2 so far, so people debate who should cut fastest. Solutions include clean energy, efficiency, forests and other ways to remove carbon."]],
      "The budget is a fixed amount that gets used up over time.", "Years left come from dividing the budget by the yearly emissions.",
      [["A carbon budget is the total CO2 that...", "Can still be emitted for a temperature target", "Plants can eat|Has already vanished"], ["Net zero means emissions are...", "Balanced by removals", "Doubled|Ignored"],
       ["Years left equals the budget divided by...", "Yearly emissions", "The population|The temperature"], ["Carbon budgets are measured in...", "Gigatonnes of CO2", "Kilometers|Degrees of longitude"],
       ["If emissions fall, the budget lasts...", "Longer", "Shorter|Zero days"], ["Who has emitted most CO2 historically?", "Rich, industrialized countries", "The smallest island states|Antarctica"],
       ["Which helps remove carbon?", "Planting and protecting forests", "Burning more coal|Clearing forests"], ["The two targets often discussed are 1.5 and 2 degrees of...", "Warming", "Latitude|Rainfall"]], CARBN)),
    LS("Ecosystem services", MC([
      ["What nature does for us", "🌳", "<b>Ecosystem services</b> are the benefits people get from nature. There are four kinds, described in a major United Nations study in 2005."],
      ["Four kinds", "🧺", "<b>Provisioning</b>: food, water, wood, medicines. <b>Regulating</b>: clean air and water, climate control, flood control, pollination. <b>Cultural</b>: beauty, recreation, spiritual value. <b>Supporting</b>: soil formation, photosynthesis and nutrient cycling that all others depend on."],
      ["Putting a value on it", "💰", "Scientists estimate what these services are worth. Wetlands that absorb floods save money that would be spent on walls. Bees pollinate many crops. When ecosystems are destroyed, we often must pay for what nature did free."]],
      "Group each benefit into one of the four service types.", "Provisioning is products, regulating is controlling processes, cultural is enjoyment, and supporting is the base.",
      [["Food and fresh water from nature are...", "Provisioning services", "Cultural services|Supporting services"], ["Flood control by wetlands is a...", "Regulating service", "Provisioning service|Cultural service"],
       ["Pollination by bees is a...", "Regulating service", "Cultural service|Provisioning service"], ["Enjoying a park for recreation is a...", "Cultural service", "Provisioning service|Regulating service"],
       ["Soil formation and nutrient cycling are...", "Supporting services", "Cultural services|Provisioning services"], ["Wood from forests is a...", "Provisioning service", "Cultural service|Supporting service"],
       ["The service types were described by a UN study in...", "2005", "1805|2105"], ["When wetlands are destroyed, we may have to pay for...", "Flood walls", "More sunshine|Rain clouds"]])),
    LS("Environmental justice", MC([
      ["Fair sharing of burdens", "⚖️", "<b>Environmental justice</b> is the idea that everyone, whatever their income, race or place, deserves protection from pollution and a fair say in decisions. In many places polluting factories, highways and waste sites are built in low-income or minority neighborhoods."],
      ["A turning point", "✊", "In 1982 residents of <b>Warren County, North Carolina</b> protested peacefully against a toxic waste landfill planned near a mostly Black community. The protest helped start the environmental justice movement in the United States."],
      ["Today", "🌍", "The idea also applies worldwide: poorer countries often suffer most from climate change although they emitted the least. This is called <b>climate justice</b>. Fixes include fair planning, clean air and water standards, and including community voices."]],
      "Think about who gets the benefits and who gets the burdens.", "Fair sharing and fair decision-making are the main ideas.",
      [["Environmental justice is about...", "Fair protection from pollution and fair decisions", "Building more highways|Ignoring communities"], ["Polluting sites are often located in...", "Low-income communities", "Wealthy gated areas only|The middle of the ocean"],
       ["The 1982 protest happened in...", "Warren County, North Carolina", "Paris, France|Tokyo, Japan"], ["The Warren County protest was...", "A peaceful protest against a landfill", "A music festival|A sports event"],
       ["Climate justice says the countries that emitted least often...", "Suffer the most", "Gain the most|Have no effects"], ["A fix for environmental injustice is...", "Including community voices in decisions", "Hiding information|Ignoring complaints"],
       ["Environmental justice movement started in the US in the...", "1980s", "1780s|2020s"], ["Fair environmental policy gives everyone a say regardless of...", "Income or race", "Eye color only|Shoe size"]])),
    LS("Electoral systems", MN([
      ["Turning votes into seats", "🗳️", "In a <b>first-past-the-post</b> system (United States, United Kingdom, Canada, India) the candidate with the most votes in each district wins, even without a majority. It is simple but can leave many voters unrepresented."],
      ["Proportional representation", "📊", "In <b>proportional representation</b> (used in many European countries, like the Netherlands and Sweden) parties get seats in line with their share of the vote. A party with 30 percent of the vote gets about 30 percent of seats. It usually leads to <b>coalition governments</b> of several parties. Some countries, like Germany and New Zealand, mix both."],
      ["Geography matters", "🗺️", "Where votes are located matters in first-past-the-post: a party can win many votes but few seats if its voters are spread out. Seats = total seats x vote share."]],
      "One system rewards winning districts, the other matches seats to vote share.", "A mix of both is used in some countries.",
      [["First-past-the-post means the winner is the candidate with...", "The most votes", "The fewest votes|A random draw"], ["Proportional representation gives parties seats...", "In line with their vote share", "Equally|Only if they won every district"],
       ["Which country uses first-past-the-post?", "Canada", "Netherlands|Sweden"], ["Which country uses proportional representation?", "Netherlands", "United States|India"],
       ["A government made of several parties is a...", "Coalition", "Monarchy|Dictatorship"], ["A system mixing both is used in...", "Germany", "Antarctica|Mongolia only"],
       ["A weakness of first-past-the-post is that many votes may...", "Not lead to representation", "Be counted twice|Be illegal"], ["Seats under proportional representation equal total seats x...", "Vote share", "Population density|Area"]], SEATN)),
    LS("Supranational organizations", MC([
      ["Beyond one country", "🌐", "A <b>supranational organization</b> is a group of countries that share some decisions or rules. Members agree to give up a little of their independence to gain cooperation."],
      ["Key examples", "🏛️", "The <b>European Union (EU)</b> has a single market, shared laws, and a common currency, the euro, used by many members; its main institutions are in Brussels. The <b>African Union (AU)</b> has 55 members and is based in Addis Ababa. <b>ASEAN</b> brings together Southeast Asian countries for trade and cooperation. <b>NATO</b> is a defense alliance."],
      ["Costs and benefits", "⚖️", "Benefits: easier trade, shared security, a stronger voice. Concerns: loss of control over some laws, debates over fairness. In 2016 the United Kingdom voted to leave the EU (Brexit), showing that members can choose to go."]],
      "Think about which group each name stands for.", "Supranational means members share some decisions.",
      [["The euro is the common currency of many members of the...", "European Union", "African Union|NATO"], ["The EU's main institutions are in...", "Brussels", "Rio de Janeiro|Sydney"],
       ["The African Union is based in...", "Addis Ababa", "Cairo|Cape Town"], ["ASEAN is a group of countries in...", "Southeast Asia", "South America|Western Europe"],
       ["NATO is a...", "Defense alliance", "Trade currency|Sports league"], ["A supranational organization means members...", "Share some decisions or rules", "Give up all independence|Never meet"],
       ["The United Kingdom voted to leave the EU in...", "2016", "1916|2116"], ["Brexit shows that members can...", "Choose to leave", "Never leave|Be forced to stay"]]))
  ];
  l27.push(LS("Mixed practice", MX(l27, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])));
  l27.push(LS("Level 27 Challenge", MX(l27, [10, 11, 12, 13, 14, 15, 16, 17, 2, 3, 4, 5, 12, 13, 14, 16])));

  Object.assign(GEO_LEVELS, { 25: l25, 26: l26, 27: l27 });
})();
