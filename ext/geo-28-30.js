// ext/geo-28-30.js : Mind Lab Geography levels 28-30 (60 lessons): remote sensing and spatial analysis, urban and economic theory, environment, geopolitics, quantitative methods
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
  const MN = (s, n, c, items, numFn) => {
    const mc = MC(s, n, c, items), f = () => (Math.random() < 0.5 ? mc() : numFn());
    f.teach = mc.teach;
    return f;
  };

  // ---------- LEVEL 28 number makers ----------
  const NDVIN = () => {
    const [nir, red, ans] = pick([[60, 20, 50], [70, 30, 40], [90, 10, 80], [80, 20, 60], [60, 40, 20], [70, 10, 75], [75, 25, 50], [85, 15, 70], [95, 5, 90]]);
    return Q(`A pixel has near-infrared reflectance ${nir} and red reflectance ${red} (percent). What is its NDVI multiplied by 100?`, ans,
      "NDVI compares how much near-infrared and red light come back. Subtract on top, add on the bottom.",
      "NDVI = (NIR minus Red) divided by (NIR plus Red). Then multiply the result by one hundred.",
      "Example: NIR 80 and Red 20. (80 - 20) / (80 + 20) = 60/100 = 0.6, so NDVI x 100 = 60. Now do yours.");
  };
  const RESN = () => {
    const m = Math.random();
    if (m < 0.35) { const b = pick([2, 3, 4, 5, 6, 7, 8, 10]); return Q(`A sensor records brightness with ${b} bits. How many brightness levels can it record?`, 2 ** b,
      "Each extra bit doubles the number of possible levels.", "Multiply two by itself once for every bit.",
      "Example: 3 bits gives 2 x 2 x 2 = 8 levels. Now do yours."); }
    if (m < 0.7) { const p = pick([10, 20, 50, 100]); return Q(`How many square pixels with sides of ${p} m fit in one square kilometer? (1 km = 1000 m)`, (1000 / p) ** 2,
      "Find how many pixels fit along one side, then think of a grid.", "Pixels along one side times pixels along the other side.",
      "Example: 250 m pixels. 1000/250 = 4 along each side, so 4 x 4 = 16 pixels. Now do yours."); }
    const p = pick([2, 3, 5, 10, 15, 30]); return Q(`One pixel of a satellite image is ${p} m by ${p} m. How many square meters does it cover?`, p * p,
      "Area of a square: side times side.", "Multiply the pixel's width by its height in meters.",
      "Example: a 4 m pixel covers 4 x 4 = 16 square meters. Now do yours.");
  };
  const LIDARN = () => {
    const t = pick([2, 3, 4, 5, 6, 8, 10, 12]);
    return Q(`A laser pulse leaves an aircraft and its echo returns after ${t} microseconds. Light travels 300 m per microsecond. How far away is the surface, in meters?`, 150 * t,
      "The pulse goes down and comes back, so the trip time covers the distance twice.", "Find the total distance traveled, then take half of it.",
      "Example: 4 microseconds x 300 = 1200 m total, and half is 600 m. Now do yours.");
  };
  const ACCN = () => {
    const N = pick([50, 100, 200, 250, 400]), p = pick([60, 70, 80, 85, 90, 95]), ok = N * p / 100;
    if (Math.random() < 0.5) return Q(`A land cover map is checked at ${N} reference points and ${ok} are correct. What is the overall accuracy, in percent?`, p,
      "Overall accuracy is the correct share of all points checked.", "Divide correct points by total points, then express it as a percent.",
      "Example: 45 correct out of 50 is 45/50 = 0.9 = 90 percent. Now do yours.");
    return Q(`A map has an overall accuracy of ${p} percent. Out of ${N} checked points, how many are correct?`, ok,
      "Overall accuracy is the correct share of all points checked.", "Turn the percent into a part of the total number of points.",
      "Example: 80 percent of 50 points is 40 correct. Now do yours.");
  };
  const CHGN = () => {
    const i = pick([200, 400, 800, 1000, 2000]), p = pick([10, 20, 25, 50]), lost = i * p / 100;
    const m = Math.random();
    if (m < 0.5) return Q(`Forest cover was ${i} ha in 2000 and ${i - lost} ha in 2020. What percent was lost?`, p,
      "Find how many hectares disappeared, then compare to the starting amount.", "Percent lost = hectares lost divided by the starting amount, times one hundred.",
      "Example: 400 ha fell to 300 ha. Lost 100, and 100/400 = 25 percent. Now do yours.");
    return Q(`Forest cover was ${i} ha in 2000 and ${p} percent was lost by 2020. How many hectares were lost?`, lost,
      "Use the starting amount as the whole.", "Find that percent of the starting amount.",
      "Example: 40 percent of 500 ha is 200 ha. Now do yours.");
  };
  const NNEXPN = () => {
    const [A, n, ans] = pick([[3600, 900, 1], [3600, 225, 2], [3600, 100, 3], [6400, 100, 4], [10000, 100, 5], [1600, 100, 2], [400, 100, 1]]);
    return Q(`${n} points are scattered at random over ${A} square km. The expected mean nearest-neighbor distance is 0.5 / sqrt(density), where density = points / area. What is it, in km?`, ans,
      "First find the density, then take its square root.", "Divide one half by the square root of the density. Check your units.",
      "Example: 100 points over 400 square km: density is 0.25, its square root is 0.5, and 0.5/0.5 = 1 km. Now do yours.");
  };
  const RASN = () => {
    const m = Math.random();
    if (m < 0.35) { const a = ri(1, 9), b = ri(1, 9), c = ri(1, 9); return Q(`Three raster layers have these values in one cell: A = ${a}, B = ${b}, C = ${c}. What does A + B + C give for that cell?`, a + b + c,
      "Map algebra does the sum cell by cell.", "Add the three values for this one cell.",
      "Example: A = 2, B = 5, C = 1 gives 8. Now do yours."); }
    if (m < 0.7) { const a = ri(1, 6), b = ri(1, 6), c = ri(2, 4); return Q(`In one cell, A = ${a} and B = ${b}. A weighted score is (A + B) x ${c}. What is it?`, (a + b) * c,
      "Do the part in brackets first.", "Add A and B, then multiply by the weight.",
      "Example: A = 2, B = 3, weight 4: (2 + 3) x 4 = 20. Now do yours."); }
    const mean = ri(3, 12), d1 = ri(1, 2), d2 = ri(d1 + 1, 3);
    return Q(`A focal mean takes the average of a window of four cells with values ${mean - d2}, ${mean - d1}, ${mean + d1} and ${mean + d2}. What is the mean?`, mean,
      "A focal operation replaces a cell with a summary of its neighbors.", "Add the four cell values, then divide by how many cells there are.",
      "Example: cells 5, 7, 9, 11 add to 32, and 32/4 = 8. Now do yours.");
  };
  const RMSEN = () => {
    const [a, b, r] = pick([[1, 7, 5], [7, 1, 5], [2, 14, 10], [14, 2, 10], [3, 21, 15], [4, 28, 20], [28, 4, 20]]);
    return Q(`Two control points have position errors of ${a} m and ${b} m. RMSE = square root of the mean of the squared errors. What is the RMSE, in meters?`, r,
      "Square each error, average the squares, then undo the squaring.", "Add the two squared errors, divide by two, then take the square root.",
      "Example: errors 5 and 5. Squares 25 and 25, mean 25, square root 5 m. Now do yours.");
  };
  const CANOPYN = () => {
    const g = pick([100, 120, 150, 200, 250]), h = pick([8, 12, 15, 20, 25, 30]);
    return Q(`A lidar surface model (DSM) reads ${g + h} m at a spot and the bare-earth model (DTM) reads ${g} m. How tall is the vegetation or building, in meters?`, h,
      "The DSM includes things standing on the ground. The DTM does not.", "Subtract the bare-earth height from the surface height.",
      "Example: DSM 310 m and DTM 290 m gives 20 m of canopy. Now do yours.");
  };

  // ---------- LEVEL 28 ----------
  const l28 = [
    LS("The electromagnetic spectrum", MC([
      ["Energy in waves", "📡", "Remote sensing records <b>electromagnetic (EM) energy</b>. The spectrum runs from short, high-energy waves (gamma, X-ray, <b>ultraviolet</b>) through <b>visible light</b> and <b>infrared</b> to long waves (<b>microwaves</b> and radio)."],
      ["Wavelengths to know", "📏", "Visible light is about <b>0.4 to 0.7 micrometers</b>. Near-infrared is just longer. <b>Thermal infrared</b> (about 8 to 14 micrometers) senses emitted heat. <b>Microwaves</b> (millimeters to meters) are used by radar."],
      ["Atmospheric windows", "🪟", "Gases in the air absorb some wavelengths. Sensors work in the <b>atmospheric windows</b>, bands where energy passes through. Shorter wavelength means higher energy."]],
      "Think about where each type sits on the spectrum, from short waves to long waves.", "Compare the wavelengths in the slides, and use any numbers or sensor types in the question.",
      [["Which wavelength is longest?", "Microwave", "Visible|Ultraviolet"], ["Visible light spans about...", "0.4 to 0.7 micrometers", "4 to 7 millimeters|40 to 70 meters"],
       ["Thermal infrared sensors measure...", "Heat emitted by surfaces", "Reflected blue light|Radio broadcasts"], ["Radar belongs to the...", "Microwave region", "Ultraviolet region|Visible region"],
       ["An atmospheric window is a band where...", "The air lets energy through", "Clouds always form|Satellites cannot fly"], ["Compared with red light, near-infrared has a...", "Longer wavelength", "Shorter wavelength|Higher energy"],
       ["Which has the shortest wavelength?", "Ultraviolet", "Visible light|Microwave"], ["Remote sensors are useful because they detect energy...", "Beyond what the eye can see", "Only in daylight|Only with a camera on the ground"]])),
    LS("Spectral signatures", MC([
      ["Every surface has a fingerprint", "🌿", "A <b>spectral signature</b> shows how much energy a material reflects at each wavelength. Different materials have different curves, so a sensor can tell them apart."],
      ["Plants", "🍃", "Healthy leaves <b>absorb red and blue</b> light for photosynthesis and reflect a little green. They reflect very strongly in <b>near-infrared (NIR)</b> because of their leaf cell structure. The jump between red and NIR is the <b>red edge</b>."],
      ["Water, soil and snow", "💧", "<b>Water</b> absorbs NIR and looks dark. <b>Dry soil</b> reflects more as wavelength increases, and wet soil is darker. <b>Snow</b> is bright in visible light but dark in shortwave infrared, which helps tell it from cloud."]],
      "Think about which wavelengths each material absorbs and which it sends back.", "Plants use some colors for photosynthesis and bounce back what they do not need.",
      [["Healthy leaves reflect most strongly in...", "Near-infrared", "Red|Blue"], ["Why do plants look green?", "Chlorophyll absorbs red and blue and reflects some green", "They emit green light|They absorb green most"],
       ["In near-infrared, water looks...", "Very dark", "Very bright|The same as leaves"], ["When plants become stressed, near-infrared reflectance usually...", "Drops", "Rises sharply|Never changes"],
       ["A spectral signature is...", "Reflectance of a material across wavelengths", "The name of a satellite|A map border"], ["The steep rise between red and near-infrared in a plant curve is the...", "Red edge", "Blue shift|Dew line"],
       ["Wet soil compared with dry soil is usually...", "Darker", "Brighter|Identical"], ["Snow and cloud can be told apart because snow is dark in...", "Shortwave infrared", "Visible light|Blue light"]])),
    LS("NDVI", MN([
      ["A vegetation index", "🌱", "<b>NDVI</b> = (NIR - Red) / (NIR + Red). Plants reflect lots of NIR and little red, so healthy vegetation gives a high value."],
      ["Reading the values", "🔢", "NDVI runs from <b>-1 to +1</b>. Water and clouds are near zero or negative, bare soil and rock about 0.1 to 0.2, sparse plants 0.2 to 0.5, and dense healthy vegetation about <b>0.6 to 0.9</b>."],
      ["Uses and limits", "🛰️", "NDVI maps crop health, drought and seasons. It can saturate over very dense forest, and soil or haze can bias it. Other indices (EVI, SAVI) correct for this."]],
      "Think about how plants treat red light versus near-infrared light.", "Recall the formula and the typical values for each surface type from the slides.",
      [["Which NDVI suggests dense healthy vegetation?", "About 0.8", "About 0.1|About -0.5"], ["Water usually has an NDVI that is...", "Near zero or negative", "Above 0.8|Exactly 1"],
       ["NDVI uses which two bands?", "Near-infrared and red", "Blue and green|Thermal and radar"], ["Bare soil typically has an NDVI of about...", "0.1 to 0.2", "0.8 to 0.9|-1"],
       ["During a drought, the NDVI of a crop field usually...", "Falls", "Rises|Becomes negative infinity"], ["NDVI can never be larger than...", "1", "10|100"],
       ["A problem with NDVI over dense forest is that it can...", "Saturate", "Turn negative|Show only water"], ["Why divide by (NIR + Red)?", "To make values comparable across lighting conditions", "To make them larger|To remove the red band"]], NDVIN)),
    LS("Orbits and platforms", MC([
      ["Geostationary", "🌐", "A <b>geostationary</b> satellite orbits about <b>35,786 km</b> above the equator once per day, so it hangs over one spot. It sees a whole hemisphere constantly, which is ideal for weather."],
      ["Polar and sun-synchronous", "🔄", "Low Earth orbit satellites (a few hundred to about 800 km) with <b>polar orbits</b> scan the whole globe in strips called <b>swaths</b>. <b>Sun-synchronous</b> orbits pass each place at the same local time, so shadows stay comparable."],
      ["Trade-offs", "⚖️", "Close satellites give fine detail but see a narrow swath and take days to revisit. High satellites see wide areas often but with coarser detail. Landsat revisits each place every <b>16 days</b>; Sentinel-2 (two satellites) about every <b>5 days</b>."]],
      "Think about how height above Earth changes what a satellite can see and how often.", "Recall the orbit facts from the slides, then rule out choices that clearly do not fit.",
      [["A geostationary satellite stays over one place because...", "Its orbit matches Earth's rotation", "It does not move|It is held by a cable"], ["Geostationary orbit is above...", "The equator", "The poles|Tropic of Cancer"],
       ["A sun-synchronous orbit passes a place at...", "The same local solar time", "Random times|Midnight only"], ["Which type is best for constant weather watching?", "Geostationary", "Polar low orbit|Sun-synchronous"],
       ["A narrow strip scanned by a satellite is called a...", "Swath", "Datum|Parallel"], ["Compared with a high orbit, a low orbit gives...", "Finer detail but a narrower view", "Coarser detail and wider view|No detail"],
       ["The Landsat revisit time for one satellite is about...", "16 days", "16 hours|16 months"], ["Geostationary satellites orbit roughly...", "36,000 km up", "700 km up|36 km up"]])),
    LS("Four kinds of resolution", MN([
      ["Spatial and spectral", "🔍", "<b>Spatial resolution</b> is the pixel size on the ground (10 m, 30 m...). <b>Spectral resolution</b> is how many bands there are and how narrow they are. A <b>hyperspectral</b> sensor has hundreds of narrow bands."],
      ["Temporal and radiometric", "⏱️", "<b>Temporal resolution</b> is the revisit time. <b>Radiometric resolution</b> is how finely brightness is recorded: an <b>n-bit</b> sensor records 2 to the power n levels (8 bits = 256 levels, 12 bits = 4096)."],
      ["No sensor has everything", "⚖️", "Fine detail usually means a narrow swath and rare revisits. Choose the resolution that fits the question: tracking a flood needs time, mapping houses needs space."]],
      "Think about which of the four types the question describes: size, bands, time or brightness.", "Match the idea in the question to the four definitions in the slides.",
      [["Pixel size on the ground is the...", "Spatial resolution", "Temporal resolution|Radiometric resolution"], ["How often a sensor revisits a place is its...", "Temporal resolution", "Spectral resolution|Spatial resolution"],
       ["Bit depth belongs to...", "Radiometric resolution", "Spatial resolution|Temporal resolution"], ["A hyperspectral sensor has...", "Hundreds of narrow bands", "Only one band|Very large pixels"],
       ["To track a fast-moving flood you most need...", "High temporal resolution", "High bit depth only|Many bands"], ["Which has the finest spatial resolution?", "A 1 m pixel", "A 30 m pixel|A 1 km pixel"],
       ["More spectral bands help to...", "Tell materials apart", "Make pixels smaller|Shorten the orbit"], ["To map individual houses you need...", "Fine spatial resolution", "A daily revisit only|Thermal bands only"]], RESN)),
    LS("Active and passive sensing", MN([
      ["Two ways to sense", "📡", "<b>Passive</b> sensors record energy that is already there: reflected sunlight or emitted heat (Landsat, MODIS). <b>Active</b> sensors send out their own pulse and record the echo: <b>radar</b>, <b>lidar</b> and sonar."],
      ["Radar and lidar", "☁️", "<b>Radar</b> uses microwaves, so it sees through cloud, smoke and darkness. <b>SAR</b> (synthetic aperture radar) builds sharp images from a moving satellite. <b>Lidar</b> fires laser pulses and measures how long each echo takes."],
      ["Distance from time", "⏱️", "Distance = speed x time / 2, because the pulse travels out and back. Light travels about 300 m per microsecond."]],
      "Ask whether the sensor makes its own energy or uses the Sun's.", "Decide whether the energy comes from the sensor itself or from the surroundings.",
      [["Which is an active sensor?", "Radar", "A normal camera in sunlight|A thermal camera on a hill"], ["Passive sensors record...", "Energy already present", "Their own laser pulses|Only sound"],
       ["Why can radar image through clouds?", "Microwaves pass through cloud", "Clouds are made of metal|It uses visible light"], ["Lidar measures distance using...", "Time for a laser echo", "Air pressure|Color of the ground"],
       ["Optical sensors like Landsat are...", "Passive", "Active|Sonar"], ["Which works well at night?", "Radar", "Visible-light camera|Sunlit reflection only"],
       ["Why divide by two in distance = speed x time / 2?", "The pulse goes out and back", "Light slows by half|There are two satellites"], ["SAR stands for...", "Synthetic aperture radar", "Satellite aerial range|Surface altitude reading"]], LIDARN)),
    LS("False-color images", MC([
      ["Putting bands in color channels", "🎨", "A screen shows color from three channels: red, green and blue. A <b>composite</b> assigns any three bands to those channels. In a <b>true-color</b> image the red band goes to red, green to green, blue to blue."],
      ["Standard false color", "🟥", "In the common <b>false-color infrared</b> composite, <b>NIR is shown as red</b>, red as green, and green as blue. Healthy vegetation looks <b>bright red</b>, water looks dark blue or black, and cities look gray or cyan."],
      ["Why bother?", "🔎", "False color makes hidden differences visible: crop stress, flooded land, burned areas and rock types. Always read the legend or band list, because colors depend on the combination."]],
      "Check which band was assigned to each color channel.", "Recall the standard infrared band assignment from the slides, then work out the result.",
      [["In a standard false-color infrared image, vegetation looks...", "Bright red", "Bright blue|Black"], ["Which band goes to the red channel in that composite?", "Near-infrared", "Blue|Thermal"],
       ["A true-color image shows red band as...", "Red", "Green|Blue"], ["In false-color infrared, clear deep water looks...", "Dark", "Bright red|Yellow"],
       ["A composite assigns...", "Three bands to three color channels", "One band to three maps|Colors to satellites"], ["Why use false color?", "To reveal differences the eye cannot see", "To hide errors|To make the image smaller"],
       ["Colors in a false-color image depend on...", "The band combination chosen", "The date only|Nothing"], ["Healthy and stressed crops are easier to separate in false color because of...", "Near-infrared differences", "Blue light|Radio waves"]])),
    LS("Image classification", MC([
      ["Pixels into classes", "🗺️", "<b>Classification</b> turns an image into a map of classes (water, forest, urban, crops). Each pixel is compared by its spectral values."],
      ["Supervised and unsupervised", "🧠", "<b>Supervised</b>: the analyst gives <b>training samples</b> of known classes, and an algorithm (maximum likelihood, random forest) assigns every pixel. <b>Unsupervised</b>: a program such as <b>k-means</b> groups similar pixels into clusters first, and the analyst names them afterward."],
      ["Problems", "⚠️", "A <b>mixed pixel</b> contains more than one class, so it fits none perfectly. <b>Object-based</b> classification groups pixels into segments before labeling, which often works better on fine-detail images."]],
      "Ask who supplies the class labels: the analyst first, or the computer first.", "Recall how each method gets its class names, as described in the slides.",
      [["Supervised classification needs...", "Training samples", "No input at all|A radar pulse"], ["In unsupervised classification the computer first...", "Groups similar pixels into clusters", "Labels each cluster water|Draws political borders"],
       ["K-means is an example of...", "Unsupervised clustering", "Supervised training|Georeferencing"], ["A mixed pixel is one that...", "Contains more than one class", "Is missing data|Is perfectly black"],
       ["Object-based classification first...", "Groups pixels into segments", "Deletes small pixels|Changes the projection"], ["Maximum likelihood is a method for...", "Supervised classification", "Atmospheric correction|Orbit design"],
       ["After unsupervised clustering the analyst must...", "Decide what each cluster means", "Pick training samples first|Do nothing"], ["The output of classification is a map of...", "Land cover classes", "Raw sensor voltages|Satellite orbits"]])),
    LS("Accuracy assessment", MN([
      ["Checking the map", "✅", "A classified map must be checked against reference data, such as field visits or fine images, at independent sample points. A <b>confusion matrix</b> counts the matches and mistakes for each class."],
      ["Overall, user's and producer's", "📊", "<b>Overall accuracy</b> = correct points / all points. <b>Producer's accuracy</b> is how many real examples of a class were mapped correctly (relates to <b>omission</b> error). <b>User's accuracy</b> is how many mapped pixels of a class are really that class (<b>commission</b> error)."],
      ["Kappa", "🎯", "The <b>kappa</b> coefficient adjusts accuracy for agreement that could happen by chance. Training samples should not be reused as test samples."]],
      "Think about what share of the checked points matched reality.", "Overall accuracy counts all classes together.",
      [["Overall accuracy is...", "Correct points divided by all points", "Number of classes|Pixel size"], ["A confusion matrix compares...", "Mapped classes with reference classes", "Two satellites|Two projections"],
       ["An omission error means a real example of a class was...", "Left out of that class", "Added to extra classes|Perfectly mapped"], ["A commission error means a pixel was...", "Wrongly included in a class", "Missed by the sensor|Not recorded"],
       ["Why not test with the training samples?", "The result would look better than it is", "They are too small|They are classified twice"], ["The kappa coefficient corrects for...", "Chance agreement", "Cloud cover|Orbit height"],
       ["User's accuracy answers: of pixels mapped as forest, how many...", "Are really forest", "Were seen from space|Are red"], ["Reference data may come from...", "Field visits or finer imagery", "The same classified map|Random numbers"]], ACCN)),
    LS("Correcting images", MC([
      ["Raw images have errors", "🛠️", "<b>Radiometric correction</b> fixes sensor noise and removes <b>atmospheric</b> haze and scattering to give true <b>surface reflectance</b>. <b>Geometric correction</b> shifts the image so it lines up with map coordinates (<b>georeferencing</b>)."],
      ["Resampling", "🔁", "After shifting, new pixel values are calculated. <b>Nearest neighbor</b> keeps original values (good before classification). <b>Bilinear</b> and <b>cubic convolution</b> smooth the result."],
      ["Terrain", "⛰️", "Tall relief makes things appear displaced. <b>Orthorectification</b> uses an elevation model to remove this, giving an <b>orthoimage</b> with a constant scale like a map."]],
      "Ask whether the problem is about brightness values or about position.", "Recall which fixes handle brightness and which handle position, then match them to the question.",
      [["Atmospheric correction aims to find...", "Surface reflectance", "Orbit height|Pixel size"], ["Georeferencing means...", "Tying the image to map coordinates", "Changing colors|Removing clouds by painting"],
       ["Which resampling keeps the original pixel values?", "Nearest neighbor", "Bilinear|Cubic convolution"], ["Orthorectification removes errors caused by...", "Terrain relief", "Sensor noise only|Cloud shadows only"],
       ["A radiometric error is a problem with...", "Brightness values", "Position|Map labels"], ["An orthoimage has...", "Constant scale like a map", "Different scale everywhere|No coordinates"],
       ["Hazy air makes surfaces look...", "Brighter and less contrasty than they are", "Invisible|Darker than night"], ["Nearest neighbor is preferred before classification because it...", "Does not invent new values", "Makes images blurry|Improves resolution"]])),
    LS("Change detection", MN([
      ["Compare dates", "⏳", "<b>Change detection</b> compares images of one place at different times. <b>Image differencing</b> subtracts one date from the other. <b>Post-classification comparison</b> classifies each date and compares the maps."],
      ["Do it fairly", "📅", "Use the <b>same season and sensor</b>, so that normal plant cycles (<b>phenology</b>) and calibration do not look like real change. Check <b>georeferencing</b>: a small shift makes false change."],
      ["Examples", "🔥", "Forest loss, city growth, shrinking lakes, melting glaciers. The <b>Normalized Burn Ratio</b> (NIR and shortwave infrared) maps burn severity. Landsat has recorded Earth since <b>1972</b>."]],
      "Think about what must stay the same between two dates for a fair comparison.", "A fair comparison removes everything except real change on the ground.",
      [["Image differencing means...", "Subtracting one date from the other", "Averaging two sensors|Projecting two maps"], ["To avoid false change, compare images from the...", "Same season", "Opposite seasons|Any time"],
       ["Post-classification comparison first...", "Classifies each date", "Subtracts raw bands|Deletes clouds"], ["Landsat began in...", "1972", "1872|1992"],
       ["Poor alignment between dates causes...", "False change", "Better accuracy|Higher resolution"], ["Phenology means...", "Seasonal plant cycles", "Plate movement|Map scale"],
       ["Burn severity is often mapped with an index using near-infrared and...", "Shortwave infrared", "Radio waves|Sound"], ["Which question suits change detection?", "How much forest was lost in 20 years?", "What is the capital?|Which side is east?"]], CHGN)),
    LS("Moran's I and spatial autocorrelation", MC([
      ["Near things are alike", "📍", "<b>Spatial autocorrelation</b> measures whether nearby places have similar values. <b>Moran's I</b> summarizes it as a number from about <b>-1 to +1</b>."],
      ["Reading I", "🧭", "<b>Positive I</b>: similar values cluster (rich areas near rich areas). <b>Near zero</b>: random pattern. <b>Negative I</b>: neighbors tend to be unlike, like a checkerboard. A <b>z-score</b> and <b>p-value</b> tell whether it is statistically significant."],
      ["Global and local", "🔬", "<b>Global</b> Moran's I gives one number for the whole map. <b>Local</b> versions (<b>LISA</b>) find which places form clusters or outliers. Positive autocorrelation breaks the 'independent samples' rule of ordinary statistics."]],
      "Think about the sign of the number and what it says about neighbors.", "Picture the pattern on a map and compare it with the three cases in the slides.",
      [["A strongly positive Moran's I means...", "Similar values cluster together", "Values alternate like a checkerboard|Values are random"], ["Moran's I near zero suggests...", "A random pattern", "Perfect clustering|Perfect alternation"],
       ["A checkerboard pattern gives...", "Negative I", "Positive I|I of exactly 1 always"], ["Moran's I ranges roughly between...", "-1 and +1", "0 and 100|-100 and 0"],
       ["LISA statistics show...", "Where local clusters and outliers are", "The map projection|The scale only"], ["A p-value helps decide if the pattern is...", "Statistically significant", "Pretty|Large in area"],
       ["Global Moran's I gives...", "One value for the whole map", "A value per pixel|A list of cities"], ["Spatial autocorrelation is a problem for ordinary statistics because samples are...", "Not independent", "Too few colors|Too accurate"]])),
    LS("Nearest-neighbor analysis", MN([
      ["Are points clustered?", "⚪", "The <b>nearest-neighbor index</b> R = (observed mean distance to nearest neighbor) / (expected mean distance for a random pattern)."],
      ["Reading R", "📐", "<b>R = 1</b>: random. <b>R below 1</b>: <b>clustered</b> (points closer than chance). <b>R above 1</b>: <b>dispersed</b> or regular (up to about 2.15, a hexagon-like lattice)."],
      ["Expected distance", "🧮", "For a random pattern the expected distance is <b>0.5 / sqrt(density)</b>, where density = number of points / area. More points means a smaller expected distance."]],
      "Compare what you observe with what chance would give.", "Compare the value with one, the value for pure chance.",
      [["R = 0.4 means the points are...", "Clustered", "Dispersed|Random"], ["R = 1.8 means the points are...", "Dispersed", "Clustered|Random"],
       ["R = 1 means the pattern is...", "Random", "Clustered|Regular"], ["The observed distance is the mean distance to...", "The nearest neighbor of each point", "The farthest point|The city center"],
       ["More points in the same area make the expected distance...", "Smaller", "Larger|Unchanged"], ["A pattern of evenly spaced trees in an orchard would give R...", "Above 1", "Below 1|Equal to 0"],
       ["Earthquake epicenters along a fault would likely give R...", "Below 1", "Above 2|Exactly 2.15"], ["R is a ratio of...", "Observed to expected distance", "Area to length|Points to lines"]], NNEXPN)),
    LS("Overlay operations", MC([
      ["Combining layers", "🧩", "Vector overlay combines two layers. <b>Intersect</b> keeps only the area in both layers. <b>Union</b> keeps all area from both and merges attributes. <b>Clip</b> cuts one layer to the outline of another."],
      ["More tools", "✂️", "<b>Erase</b> (difference) removes the parts of a layer that overlap another. <b>Dissolve</b> merges neighbors that share an attribute value. A <b>buffer</b> draws a zone at a set distance around features."],
      ["Real questions", "🌊", "'Which homes are inside the flood zone?' (intersect). 'Parks within 500 m of a river?' (buffer then intersect). 'Merge counties into states' (dissolve)."]],
      "Think about whether you need the shared area, everything, or a cut-out.", "Match the wording of the question to the tool definitions in the slides.",
      [["Which operation keeps only the area found in both layers?", "Intersect", "Union|Dissolve"], ["Which keeps all area from both layers?", "Union", "Intersect|Clip"],
       ["Cutting a layer to a study area outline is a...", "Clip", "Dissolve|Buffer"], ["Merging counties into states uses...", "Dissolve", "Erase|Union"],
       ["A zone drawn 1 km around a river is a...", "Buffer", "Dissolve|Raster"], ["Removing the part of a layer that overlaps another is...", "Erase", "Union|Intersect"],
       ["Homes inside a flood zone: use...", "Intersect", "Dissolve|Georeference"], ["After a union, the attributes of the two layers are...", "Combined", "Deleted|Reprojected"]])),
    LS("Map algebra on rasters", MN([
      ["Rasters as numbers", "🔢", "A raster is a grid of numbers, so you can calculate with it. <b>Map algebra</b> applies math to whole layers. Four kinds of operation: <b>local</b> (cell by cell), <b>focal</b> (a cell and its neighbors), <b>zonal</b> (within zones) and <b>global</b> (whole layer)."],
      ["Examples", "🧮", "Local: add layers A + B + C. Weighted: (A + B) x 2. Focal mean: average a 3 by 3 window to smooth noise. Zonal: average rainfall inside each county."],
      ["Suitability", "🏠", "A site-suitability map often reclassifies layers (slope, roads, soil) to the same score range, then adds them with weights."]],
      "Decide whether the operation uses one cell, its neighbors, or a whole zone.", "Match the wording of the question to the four kinds of operation in the slides.",
      [["Adding two layers cell by cell is a...", "Local operation", "Focal operation|Zonal operation"], ["Averaging a cell with its neighbors is a...", "Focal operation", "Local operation|Global operation"],
       ["Average rainfall within each county is a...", "Zonal operation", "Local operation|Focal operation"], ["Map algebra works on...", "Rasters as grids of numbers", "Only text labels|Only city names"],
       ["Before adding suitability layers you should...", "Reclassify them to a common score range", "Convert them to photographs|Rotate them"], ["A focal mean is useful to...", "Smooth noise", "Add new bands|Change the datum"],
       ["A weighted overlay multiplies each layer by...", "Its importance weight", "Its file size|Its projection number"], ["A global operation uses...", "The whole layer", "One cell only|Only neighbors"]], RASN)),
    LS("Georeferencing error", NUM([
      ["Control points", "📌", "To georeference an image, you match <b>ground control points</b> (GCPs), such as road crossings, to known map coordinates. A mathematical transformation then fits the image to the map."],
      ["RMSE", "📏", "The fit is judged by the <b>root mean square error</b>. For each point take the error distance, square it, average the squares, then take the square root."],
      ["Rule of thumb", "✅", "A good result is usually an RMSE <b>under one pixel</b>. Use many well-spread points, and do not judge only by the points used to build the fit."]], RMSEN)),
    LS("Lidar and elevation models", NUM([
      ["Point clouds", "🌲", "Lidar pulses return many echoes. Together they form a <b>point cloud</b>. A single pulse can have a first return (canopy top) and a last return (often the ground)."],
      ["Two surfaces", "🏙️", "A <b>DSM</b> (digital surface model) shows the top of everything: treetops and roofs. A <b>DTM</b> (digital terrain model) shows bare earth only."],
      ["Subtract", "➖", "<b>DSM - DTM</b> gives the height of objects above ground (<b>canopy height</b> or <b>building height</b>), often called an nDSM. It is used to estimate forest biomass."]], CANOPYN)),
    LS("Remote sensing in action", MC([
      ["Floods and fires", "🌊", "Flat calm water bounces radar away from the sensor, so it looks <b>dark in SAR</b> images, even through storm clouds. Burn scars are found with <b>shortwave infrared</b> and the burn ratio."],
      ["Ground movement and nights", "🌃", "<b>InSAR</b> compares radar from two dates to measure ground movement of millimeters: volcano swelling, land sinking, earthquake shifts. <b>Night lights</b> images show where electricity is used."],
      ["Water and heat", "🌡️", "<b>Ocean color</b> sensors estimate chlorophyll (algae). Thermal sensors map sea surface temperature and city heat. The <b>GRACE</b> satellites tracked changes in Earth's gravity to follow groundwater and ice loss."]],
      "Match each problem to the kind of sensor that suits it.", "Radar sees through cloud, thermal sees heat, SWIR helps with burn scars.",
      [["Why is SAR good for mapping floods?", "It sees through clouds and water looks dark", "It only works at noon|Water looks bright orange"], ["InSAR measures...", "Ground movement", "Cloud height only|Bird numbers"],
       ["Night lights images show...", "Where electricity is used", "Deep ocean currents|Soil types"], ["Ocean color sensors estimate...", "Chlorophyll in the water", "Salt in rock|Wind direction"],
       ["Thermal infrared maps...", "Surface temperature", "Roads' names|Language regions"], ["Shortwave infrared helps map...", "Burn scars", "Borders|Languages"],
       ["GRACE tracked changes in...", "Gravity linked to water and ice", "City lights|Cloud color"], ["To map city heat islands, use...", "Thermal imagery", "Radio maps|Sound waves"]]))
  ];
  l28.push(LS("Mixed practice", MX(l28, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])));
  l28.push(LS("Level 28 Challenge", MX(l28, [10, 11, 12, 13, 14, 15, 16, 17, 2, 4, 5, 8, 9, 12, 14, 15])));

  // ---------- LEVEL 29 number makers ----------
  const CHRISTN = () => {
    const [K, t, v, h] = pick([[3, 2, 6, 18], [4, 3, 12, 48], [7, 6, 42, 294]]);
    if (Math.random() < 0.5) return Q(`In a K = ${K} central place system there is 1 city and ${t} towns. Each level has K times as many places as the level above it (after the first step). How many villages are there?`, v,
      "Multiply the number of towns by the K value.", "Use the towns count and the K number from the question, and multiply them.",
      "Example: K = 3, 1 city, 2 towns. Villages = 2 x 3 = 6. Now do yours.");
    return Q(`In a K = ${K} central place system there is 1 city, ${t} towns and ${v} villages. Each level has K times as many places as the one above it. How many hamlets are there?`, h,
      "Hamlets are the next level down from villages.", "Multiply the number of villages by the K value.",
      "Example: K = 3 with 6 villages gives 6 x 3 = 18 hamlets. Now do yours.");
  };
  const BIDN = () => {
    const R = pick([80, 100, 120, 150, 200]), s = pick([5, 8, 10, 12]), d = ri(1, Math.floor(R / s) - 1);
    return Q(`Land rent at the city center is ${R} units. It falls by ${s} units for every km away. What is the rent ${d} km from the center?`, R - s * d,
      "Rent falls steadily as you move away from the center.", "Find the total fall over the distance, then take it away from the central rent.",
      "Example: center rent 100, falls 10 per km. At 3 km it has fallen 30, so rent is 70. Now do yours.");
  };
  const REILLYN = () => {
    const d = pick([60, 120]), r = pick([2, 3, 4, 5]);
    return Q(`Two towns are ${d} km apart. The bigger town has ${r * r} times the population of the smaller. Reilly's breaking point is d / (1 + sqrt(bigger/smaller)), measured from the smaller town. How far is it, in km?`, d / (1 + r),
      "First find the square root of the population ratio.", "Add one to that root and divide the distance by the result.",
      "Example: 90 km apart and the bigger town has 4 times the population. sqrt(4) = 2, so 90 / 3 = 30 km. Now do yours.");
  };
  const WEBERN = () => {
    const [inp, prod] = pick([[40, 10], [60, 20], [90, 30], [50, 25], [80, 40], [100, 20], [120, 40], [60, 15]]);
    return Q(`Making a product uses ${inp} tonnes of local raw material to make ${prod} tonnes of product. What is the material index (inputs / product)?`, inp / prod,
      "Compare the weight that goes in with the weight that comes out.", "Divide the weight of the inputs by the weight of the finished product.",
      "Example: 30 tonnes of ore make 10 tonnes of metal. 30 / 10 = 3. Now do yours.");
  };
  const MULTN = () => {
    const [b, n] = pick([[100, 100], [200, 400], [50, 100], [100, 300], [300, 300], [250, 500], [400, 400], [200, 600]]);
    if (Math.random() < 0.5) return Q(`A town has ${b} basic jobs and ${n} non-basic jobs. What is the economic base multiplier (total jobs / basic jobs)?`, (b + n) / b,
      "Total jobs include both kinds.", "Add basic and non-basic jobs, then divide by the basic jobs.",
      "Example: 100 basic and 100 non-basic jobs. Total 200 / 100 = 2. Now do yours.");
    const m = pick([2, 3, 4]), nb = pick([20, 50, 100]);
    return Q(`A town's economic base multiplier is ${m}. A new factory brings ${nb} new basic jobs. About how many total new jobs result (counting the basic jobs)?`, m * nb,
      "The multiplier tells you total jobs per basic job.", "Multiply the new basic jobs by the multiplier.",
      "Example: multiplier 3 and 10 new basic jobs gives 30 jobs in total. Now do yours.");
  };
  const DISSN = () => {
    const a = pick([60, 70, 80, 90]), b = pick([10, 20, 30, 40]);
    return Q(`Two neighborhoods. ${a} percent of group X live in neighborhood 1, and ${b} percent of group Y live in neighborhood 1. For two areas, the dissimilarity index is the gap between these shares. What is it, in percent?`, a - b,
      "The index measures how differently two groups are spread across areas.", "Take the larger share and subtract the smaller share.",
      "Example: 70 percent of X and 20 percent of Y live in area 1. The gap is 50. Now do yours.");
  };
  const DENSN = () => {
    const D = pick([8000, 16000, 24000, 40000]), h = pick([2, 5, 10]), k = ri(1, 3), dist = h * k;
    return Q(`Population density is ${D} people per square km in the city center and halves every ${h} km outward. What is the density ${dist} km from the center?`, D / 2 ** k,
      "Count how many times the density has halved over the distance.", "Divide the central density by two once for every halving step.",
      "Example: 12000 at the center, halves every 4 km. At 8 km it has halved twice: 12000 / 4 = 3000. Now do yours.");
  };
  const NETN = () => {
    if (Math.random() < 0.5) { const v = ri(4, 9), e = v - 1 + ri(1, 5); return Q(`A connected network has ${v} nodes and ${e} links. What is its cyclomatic number (links - nodes + 1)?`, e - v + 1,
      "This number counts the independent loops in the network.", "Take the links, subtract the nodes, then add one.",
      "Example: 5 nodes and 7 links gives 7 - 5 + 1 = 3. Now do yours."); }
    const v = ri(3, 8), k = ri(1, 3), e = v * k;
    return Q(`A network has ${v} nodes and ${e} links. What is the beta index (links / nodes)?`, k,
      "Beta compares the number of links with the number of nodes.", "Divide the links by the nodes.",
      "Example: 6 nodes and 12 links gives 12 / 6 = 2. Now do yours.");
  };
  const CONVN = () => {
    const y = pick([10, 20, 25, 50]), k = pick([2, 4, 5, 10, 12]), nw = pick([60, 100, 120, 180]);
    return Q(`Travel time between two cities fell from ${nw + k * y} minutes to ${nw} minutes over ${y} years. What is the average rate of time-space convergence, in minutes per year?`, k,
      "Find how much the travel time dropped in total.", "Divide the total drop by the number of years.",
      "Example: 300 minutes fell to 200 over 20 years. The drop is 100, and 100 / 20 = 5 minutes per year. Now do yours.");
  };
  const HUBN = () => {
    const n = ri(4, 10), m = Math.random();
    if (m < 0.4) return Q(`${n} cities want direct flights between every pair. How many routes are needed?`, n * (n - 1) / 2,
      "Each city connects to every other city, but each route is shared by two cities.", "Multiply the cities by one fewer than the cities, then halve.",
      "Example: 5 cities need 5 x 4 / 2 = 10 routes. Now do yours.");
    if (m < 0.8) return Q(`${n} cities all connect through one hub. How many routes are needed (each non-hub city has one route to the hub)?`, n - 1,
      "Every city except the hub needs just one route.", "Count the cities that are not the hub.",
      "Example: 6 cities with one hub need 5 routes. Now do yours.");
    return Q(`Direct flights between every pair of ${n} cities need ${n * (n - 1) / 2} routes. A hub system needs ${n - 1}. How many routes does the hub save?`, n * (n - 1) / 2 - (n - 1),
      "Compare the two totals given in the question.", "Subtract the smaller total from the larger.",
      "Example: 10 routes versus 4 routes saves 6. Now do yours.");
  };
  const RICARDON = () => {
    const [w, c] = pick([[4, 12], [3, 12], [5, 20], [6, 18], [2, 10], [4, 20], [3, 18], [5, 15]]);
    return Q(`In one day a country can make either ${w} wine barrels or ${c} cloth bolts (not both). How many cloth bolts does it give up to make one wine barrel?`, c / w,
      "Opportunity cost is what you must give up. Compare the two maximum outputs.", "Divide the maximum cloth by the maximum wine.",
      "Example: 10 cloth or 5 wine gives 10 / 5 = 2 cloth per wine. Now do yours.");
  };

  // ---------- LEVEL 29 ----------
  const l29 = [
    LS("Christaller's K values", MN([
      ["Three ways to arrange towns", "⬡", "Walter Christaller (1933) imagined a flat plain where each town serves a hexagon of land. Which pattern appears depends on a goal: <b>K = 3 (marketing)</b>, <b>K = 4 (transport)</b>, <b>K = 7 (administrative)</b>."],
      ["What K means", "🔢", "<b>K</b> is how many lowest-level market areas one higher-order place controls, including its own. With K = 3, a city has 2 towns, then 6 villages, 18 hamlets. Each step multiplies by K."],
      ["The three goals", "🎯", "<b>Marketing</b>: most places, smallest areas. <b>Transport</b>: towns lie on the main roads between cities, so fewer roads are needed. <b>Administrative</b>: lower places belong wholly to one higher place, which is good for control."]],
      "Think about which goal each K number stands for.", "Recall the three goals in the slides and what each tries to achieve.",
      [["Which K is the marketing principle?", "K = 3", "K = 4|K = 7"], ["Which K is the transport principle?", "K = 4", "K = 3|K = 7"],
       ["Which K is the administrative principle?", "K = 7", "K = 3|K = 4"], ["Who proposed central place theory in 1933?", "Walter Christaller", "Johann von Thunen|Alfred Weber"],
       ["In central place theory, market areas are drawn as...", "Hexagons", "Squares|Triangles"], ["K means...", "How many market areas a higher place controls, itself included", "How many roads exist|The number of cities in a country"],
       ["The transport principle places towns...", "On the main roads between cities", "Far from roads|At the edge of the map"], ["The assumed landscape is...", "A flat plain with even population", "A mountain range|A coast only"]], CHRISTN)),
    LS("Bid-rent theory", MN([
      ["Competing for land", "🏙️", "<b>Bid-rent theory</b> (William Alonso, 1964) says land goes to the user who can pay the most. Rent is highest at the center, where access is best, and <b>falls with distance</b>."],
      ["Steep and gentle curves", "📉", "Each use has its own <b>bid-rent curve</b>. <b>Commercial</b> uses (shops, offices) need the center and bid steeply. <b>Housing</b> bids less steeply. <b>Farming</b> bids least. Where curves cross, land use changes."],
      ["Rings of land use", "🎯", "This gives rings: commercial in the middle, then housing, then farmland. Real cities vary (transport lines, hills, planning rules), but the idea explains why central land is dense and costly."]],
      "Think about who gains the most from being at the center.", "Follow the bid-rent curves: the highest bidder at each distance gets the land.",
      [["Land goes to the user who...", "Bids the highest rent", "Arrived first|Has the biggest building"], ["Land rent usually...", "Falls with distance from the center", "Rises with distance|Stays the same"],
       ["Which use bids most steeply?", "Commercial", "Farming|Forest"], ["Who developed the bid-rent model?", "William Alonso", "Walter Christaller|Ernest Burgess"],
       ["Farming ends up farthest out because its bid-rent is...", "The lowest", "The highest|Zero everywhere"], ["Where two bid-rent curves cross...", "Land use changes", "A river forms|Rent doubles"],
       ["Commercial users pay high central rents because they gain from...", "Easy access to many customers", "Quiet nights|Cheap soil"], ["A bid-rent curve shows rent against...", "Distance from the center", "Time of day|Rainfall"]], BIDN)),
    LS("Agglomeration economies", MC([
      ["Why firms cluster", "🏭", "<b>Agglomeration economies</b> are savings from being close to others. <b>Localization economies</b> come from many firms of one industry together (film in Hollywood). <b>Urbanization economies</b> come from a large, varied city."],
      ["Marshall's three reasons", "📚", "Alfred Marshall named three: a shared <b>labor pool</b> of skilled workers, shared <b>suppliers</b> and inputs, and <b>knowledge spillovers</b> as ideas pass between people."],
      ["The other side", "🚧", "Too much crowding brings <b>diseconomies</b>: high rent, traffic, pollution and wages. At some point firms move out, which is one reason for suburban business parks."]],
      "Think about what firms save when they are near each other.", "Separate benefits of one industry together from benefits of a big mixed city.",
      [["Localization economies come from...", "Many firms in one industry together", "Many industries together|One firm alone"], ["Urbanization economies come from...", "A large, varied city", "Only one industry|A rural area"],
       ["Which is one of Marshall's reasons for clustering?", "Knowledge spillovers", "Cheap tides|Lower rainfall"], ["A shared labor pool means...", "Skilled workers are easy to hire", "Workers are all unemployed|Wages are zero"],
       ["Which is a diseconomy of agglomeration?", "Traffic congestion", "Shared suppliers|Knowledge spillovers"], ["Film studios clustering in Hollywood is an example of...", "Localization economies", "Urbanization economies|Diseconomies"],
       ["High rent in a crowded center can push firms to...", "Move out", "Stay forever|Stop using land"], ["Agglomeration economies are savings from...", "Being close to others", "Being far from markets|Using less land"]])),
    LS("Weber's location theory", MN([
      ["Least-cost location", "⚖️", "Alfred Weber (1909) said a factory picks the place with the <b>lowest total cost</b>, mainly <b>transport</b> cost, then labor cost and agglomeration."],
      ["Material index", "🔢", "<b>Material index (MI)</b> = weight of local inputs / weight of finished product. <b>MI above 1</b> (weight-losing, like ore smelting): locate near the <b>raw materials</b>. <b>MI below 1</b> (weight-gaining, like bottling drinks with water added): locate near the <b>market</b>."],
      ["MI equals 1", "🦶", "If the inputs weigh the same as the product, or inputs are found everywhere, the industry can be <b>footloose</b> and locate almost anywhere. Modern factories also weigh labor, taxes and government policy."]],
      "Think about which end of the journey saves transport costs.", "A product that loses weight is cheaper to ship after processing.",
      [["Weber's main idea is that factories choose the...", "Lowest total cost location", "Prettiest site|Biggest city"], ["A material index above 1 means locate near...", "The raw materials", "The market|Anywhere"],
       ["A material index below 1 means locate near...", "The market", "The raw materials|The coast"], ["A footloose industry...", "Can locate almost anywhere", "Must be on a river|Needs a mine"],
       ["Ore smelting loses weight, so it tends to locate near...", "The mine", "Customers|The airport"], ["Weber was...", "A German location theorist", "A Greek mapmaker|A French explorer"],
       ["Bottling a drink with water added gains weight, so locate near...", "The market", "The spring only|The mine"], ["Besides transport, Weber considered labor cost and...", "Agglomeration", "Moon phase|Language"]], WEBERN)),
    LS("Hotelling's ice cream vendors", MC([
      ["Two vendors on a beach", "🍦", "Harold Hotelling (1929) imagined two ice cream vendors on a straight beach with customers spread evenly, and each customer buying from the nearest. Where should each stand?"],
      ["Back to the middle", "🎯", "Each vendor can win more customers by moving toward the center, next to the rival. So both end up <b>back to back at the middle</b> (the Nash equilibrium). This is <b>minimum differentiation</b>."],
      ["Not best for customers", "👥", "The best layout for customers (shortest average walk) would be at the <b>quarter points</b>. The model helps explain why shops cluster, why gas stations cluster, and why political parties drift toward the <b>median voter</b>."]],
      "Imagine one vendor sliding toward the other. What does that gain?", "Think about what each vendor does once the other has settled somewhere.",
      [["In Hotelling's model the vendors end up...", "Together at the middle", "At the two ends|At the quarter points"], ["The result is called...", "Minimum differentiation", "Maximum spread|Distance decay"],
       ["For customers, the best layout is at...", "The quarter points", "The center together|The two ends"], ["Why does a vendor move toward the middle?", "To win more customers", "To avoid sunlight|To be far from rivals"],
       ["The median voter idea says parties move toward...", "The middle of opinion", "The extremes|A coast"], ["Hotelling's model helps explain why...", "Similar shops cluster", "Rivers meander|Mountains rise"],
       ["In the model, customers choose...", "The nearest vendor", "The cheapest vendor only|A random vendor"], ["The beach in the model is...", "A straight line", "A circle|A pyramid"]])),
    LS("Reilly's law of retail gravitation", MN([
      ["Towns pull shoppers", "🛍️", "William Reilly (1931) said two cities pull shoppers from the land between them in proportion to their <b>population</b> and in inverse proportion to the <b>square of the distance</b>. Bigger and nearer cities attract more."],
      ["The breaking point", "📏", "The <b>breaking point</b> is where shoppers split evenly. Measured from the smaller town: <b>d / (1 + sqrt(bigger / smaller))</b>, where d is the distance between the towns. The bigger city's reach extends farther."],
      ["Later versions", "🔁", "<b>Huff's model</b> turned this into probabilities for each shopper and store, using store size and travel time. Online shopping now weakens these ideas, but planners still use them to site stores."]],
      "Think about how size and distance each affect attraction.", "Think about which town has the stronger pull on shoppers.",
      [["Reilly's law says shoppers are drawn by...", "City size and distance", "Rainfall|Language"], ["The breaking point is where shoppers...", "Split evenly between two cities", "All go to one city|Stop shopping"],
       ["A larger city makes the breaking point lie...", "Closer to the smaller city", "Farther from the smaller city|At exactly the middle"], ["Huff's model gives...", "Probabilities that a shopper picks a store", "Population counts|Soil classes"],
       ["Distance is used in the law as...", "Distance squared in the denominator", "Added to population|Ignored"], ["Reilly's law is a version of the...", "Gravity model", "Rank-size rule|Lorenz curve"],
       ["Online shopping weakens the idea because it...", "Reduces the role of distance", "Increases rainfall|Closes roads"], ["Equal-sized towns have a breaking point...", "Halfway between them", "At the larger one|At the coast"]], REILLYN)),
    LS("Core-periphery and cumulative causation", MC([
      ["Rich get richer", "🔄", "Gunnar Myrdal (1957) described <b>cumulative causation</b>: once a region gets ahead, jobs, investment and skilled people flow in, which speeds growth further. The core grows and the periphery loses out."],
      ["Backwash and spread", "↔️", "<b>Backwash effects</b> are the harm to the periphery as capital and workers leave. <b>Spread effects</b> are the benefits that reach the periphery, such as demand for its goods. Hirschman believed spread would eventually win; Myrdal feared backwash would."],
      ["Modern versions", "🧪", "John Friedmann's <b>core-periphery</b> model and Paul Krugman's <b>new economic geography</b> (scale economies plus transport costs) show how small differences become large gaps. Policies like growth poles try to spread development."]],
      "Think about whether an early advantage helps or hurts the later growth of a region.", "Distinguish the effects that drain the poorer region from those that help it.",
      [["Cumulative causation means an early advantage...", "Grows larger over time", "Disappears quickly|Never matters"], ["Backwash effects...", "Harm the periphery", "Help the core only by chance|Are tides"],
       ["Spread effects...", "Benefit the periphery", "Hurt the core|Move rivers"], ["Who described cumulative causation?", "Gunnar Myrdal", "Alfred Weber|Walter Christaller"],
       ["Krugman's new economic geography uses scale economies and...", "Transport costs", "Colors|Time zones"], ["A growth pole policy tries to...", "Create a center of development in a poor region", "Move people to the core|Tax the periphery"],
       ["Skilled workers leaving a poor region is an example of...", "Backwash", "Spread|Convergence"], ["Who believed spread effects would eventually win?", "Albert Hirschman", "Thomas Malthus|Karl Haushofer"]])),
    LS("Industrial clusters", MC([
      ["Firms side by side", "💻", "An <b>industrial cluster</b> is a group of linked firms and institutions in one area. Examples: <b>Silicon Valley</b> (electronics, software), Hollywood (film), Bangalore (IT services), Detroit (cars), and the Italian craft districts."],
      ["Porter's diamond", "💎", "Michael Porter (1990) said clusters thrive on four things: <b>factor conditions</b> (skills, resources), <b>demand conditions</b> (demanding home customers), <b>related and supporting industries</b>, and <b>firm strategy and rivalry</b>."],
      ["Rise and decline", "🔁", "Clusters can lock in to old products and decline when markets shift (older industrial regions). Governments often try to start clusters with universities, research parks and tax incentives. Success is hard to copy."]],
      "Think about what links the firms in a cluster.", "Recall the four parts of Porter's diamond from the slides.",
      [["Silicon Valley is a cluster for...", "Electronics and software", "Wine only|Coal"], ["Who proposed the diamond model?", "Michael Porter", "Harold Hotelling|William Reilly"],
       ["Which is a part of Porter's diamond?", "Related and supporting industries", "Time zones|Rainfall"], ["Strong local rivalry tends to...", "Push firms to improve", "Stop all trade|Reduce skills"],
       ["Bangalore is known as a cluster for...", "IT services", "Fishing|Car manufacturing only"], ["A cluster can decline if it...", "Gets locked into outdated products", "Gets too many universities|Has strong demand"],
       ["Governments try to start clusters with...", "Universities and research parks", "Border walls|Tolls"], ["Demanding home customers help firms to...", "Improve quality", "Close down|Avoid exports"]])),
    LS("The economic base", MN([
      ["Basic and non-basic jobs", "💼", "<b>Basic</b> jobs sell goods or services outside the city and bring in new money (a car factory, a university with out-of-town students). <b>Non-basic</b> jobs serve local people (shops, barbers, teachers of local kids)."],
      ["The multiplier", "✖️", "<b>Economic base multiplier</b> = total employment / basic employment. A multiplier of 2 means each basic job supports one extra local job. New basic jobs produce more jobs than themselves."],
      ["Limits and use", "⚠️", "A city depending on one basic industry is risky: if it closes, many local jobs vanish too. Planners use the multiplier to predict the effect of a new factory or the loss of one."]],
      "Think about whether the job brings money in from outside or recycles money locally.", "Basic jobs earn from outside buyers; non-basic jobs earn from local buyers.",
      [["A car factory selling abroad creates...", "Basic jobs", "Non-basic jobs|No jobs"], ["A local barber's job is usually...", "Non-basic", "Basic|Export"],
       ["Basic jobs bring in...", "New money from outside", "Local savings|Rainfall"], ["The multiplier is total jobs divided by...", "Basic jobs", "Non-basic jobs|Population"],
       ["A town that depends on one basic industry is...", "Risky", "Perfectly safe|Always growing"], ["A university with many out-of-town students is...", "A basic employer", "Non-basic only|A farm"],
       ["If a big basic employer closes, local shops...", "Lose customers too", "Gain customers|Are unaffected"], ["A multiplier of 2 means each basic job supports...", "One extra local job", "Two extra jobs|No extra jobs"]], MULTN)),
    LS("Segregation and the dissimilarity index", MN([
      ["Measuring separation", "🏘️", "Geographers measure how evenly two groups share a city. The <b>dissimilarity index</b> runs from 0 to 100. <b>0</b> means the groups are spread evenly. <b>100</b> means complete separation. It shows the share of one group that would have to move to be even."],
      ["Calculation idea", "🧮", "For each area, compare the area's share of group X with its share of group Y. Add the absolute gaps and halve the total. With just two areas this equals the gap between the two shares."],
      ["Why it matters", "⚠️", "Where people live shapes schools, jobs and health. Causes include history, housing prices, discrimination, and personal choice. Maps and indices describe patterns but do not explain the causes."]],
      "Think about what an index of zero and an index of one hundred each mean.", "Compare a value with the two ends of the scale.",
      [["A dissimilarity index of 0 means the groups are...", "Spread evenly", "Completely separated|Absent"], ["An index of 100 means...", "Complete separation", "Perfect mixing|No people"],
       ["The index can be read as the share of a group that...", "Would need to move to be even", "Lives in the center|Is under age 18"], ["The index runs between...", "0 and 100", "-100 and 0|1 and 1000"],
       ["Indices like this can show patterns but not...", "The causes", "Any numbers|Locations"], ["Which can contribute to segregation?", "Housing prices and history", "Tides|Cloud height"],
       ["A high value means groups live...", "In different areas", "In the same areas|Nowhere"], ["Dissimilarity compares...", "Each area's share of two groups", "Rainfall in two areas|Roads in two areas"]], DISSN)),
    LS("Density gradients", MN([
      ["Falling with distance", "📉", "Colin Clark (1951) found that population density falls steadily with distance from the city center. The relationship is often shown as a <b>negative exponential</b> curve: the density halves again and again at equal steps."],
      ["Flatter over time", "🏙️", "As cities grew and transport improved, the <b>density gradient flattened</b>: the center lost people to suburbs and edges gained them. Most cities in rich countries are now far less dense in the middle than a century ago."],
      ["Gradients differ", "🌏", "Dense, compact cities (older Asian and European cities) have steeper gradients. Car-based cities have flatter ones. Planners use the gradient to study sprawl and transport."]],
      "Think about whether density rises or falls as you leave the center.", "Compare the gradient before and after suburban growth.",
      [["Density usually...", "Falls with distance from the center", "Rises with distance|Is constant"], ["Who found the pattern in 1951?", "Colin Clark", "Ernest Burgess|Homer Hoyt"],
       ["The curve is called a...", "Negative exponential", "Straight line only|Circle"], ["As cities sprawl, the gradient...", "Flattens", "Steepens|Disappears forever"],
       ["Car-based cities usually have...", "Flatter gradients", "Steeper gradients|No density"], ["Suburban growth causes the center to...", "Lose population density", "Gain skyscrapers only|Disappear"],
       ["A steep gradient suggests a...", "Compact city", "Sprawling city|Desert"], ["Planners use gradients to study...", "Sprawl", "Tides|Volcanoes"]], DENSN)),
    LS("Network connectivity", MN([
      ["Nodes and links", "🕸️", "A transport network is a graph of <b>nodes</b> (places) and <b>links</b> (roads, rails, routes). <b>Connectivity</b> measures how well the nodes are linked."],
      ["Indices", "🔢", "<b>Beta index</b> = links / nodes (a tree has beta below 1; beta above 1 means loops). <b>Cyclomatic number</b> = links - nodes + 1 (for a connected network): the number of independent loops. <b>Gamma</b> compares actual links with the maximum possible."],
      ["Why it matters", "🚆", "More loops give alternative routes if one link is blocked. Dense networks cost more to build. Hubs and bridges are critical points whose failure splits the network."]],
      "Think about what more links per node tells you about loops and choices.", "Recall how links, nodes and loops are related in the slides.",
      [["A node is a...", "Place on a network", "Road surface|River"], ["More loops in a network give...", "More alternative routes", "Fewer choices|Slower trains"],
       ["Connectivity measures...", "How well nodes are linked", "Road width|Time zones"], ["A network with beta below 1 is...", "A tree with no loops", "Fully looped|Empty"],
       ["A link whose failure splits the network is a...", "Critical link", "Extra link|Beta"], ["The cyclomatic number counts...", "Independent loops", "Hubs|Countries"],
       ["Gamma compares actual links with...", "The maximum possible", "The minimum possible|Population"], ["The tradeoff of dense networks is...", "Higher cost", "Less access|Fewer loops"]], NETN)),
    LS("Time-space convergence", MN([
      ["Places draw closer", "🚄", "<b>Time-space convergence</b> (Donald Janelle, 1969) means places become closer in <b>travel time</b> as transport speeds up, even though the distance in km does not change. A trip between two cities once taking days can take hours."],
      ["Time-space compression", "🌐", "David Harvey's <b>time-space compression</b> describes how faster travel, telephones and the internet make the world feel smaller. Crossing the Atlantic went from weeks by sailing ship to hours by jet."],
      ["Not all places benefit", "⚖️", "Convergence is uneven: places on high-speed rail, airline hubs and fiber lines gain; others left out feel farther. Distance still matters: <b>friction of distance</b> never disappears completely."]],
      "Think about what changes: kilometers or travel time?", "Compare places on the fast network with places left off it.",
      [["Time-space convergence means places become closer in...", "Travel time", "Kilometers|Latitude"], ["Who introduced the idea in 1969?", "Donald Janelle", "David Harvey|Ernest Burgess"],
       ["Time-space compression describes...", "The world feeling smaller", "Maps shrinking in size|Rivers shortening"], ["Crossing the Atlantic went from weeks by sailing ship to...", "Hours by jet", "Years by plane|Days by horse"],
       ["Convergence is uneven because...", "Only places on fast networks gain", "Every place gains equally|Distance is gone"], ["Who wrote about time-space compression?", "David Harvey", "Donald Janelle|Colin Clark"],
       ["High-speed rail makes connected cities...", "Closer in time", "Farther in km|Smaller"], ["Distance still matters because of...", "Friction of distance", "Gravity of the Moon|Latitude lines"]], CONVN)),
    LS("Hub-and-spoke systems", MN([
      ["Why hubs", "✈️", "In a <b>hub-and-spoke</b> network, most routes go through a central hub. Direct links between every pair of n places need <b>n(n - 1)/2</b> routes. A hub needs only <b>n - 1</b>."],
      ["Gains and losses", "⚖️", "Hubs let airlines fill planes by combining passengers from many places (<b>economies of density</b>). The cost: connections add time, and the hub can be a congested bottleneck. After the US Airline Deregulation Act of 1978, hub systems spread widely."],
      ["Beyond planes", "📦", "Ports (Singapore, Rotterdam), parcel firms (Memphis) and rail systems also use hubs. Low-cost airlines often prefer point-to-point routes between smaller airports."]],
      "Think about how many routes a hub saves compared with linking every pair.", "Consider what passengers gain and lose by changing planes.",
      [["A hub-and-spoke network sends most traffic...", "Through a central hub", "Directly between all pairs|By sea only"], ["A hub system needs fewer...", "Routes", "Passengers|Pilots only"],
       ["A disadvantage of hubs is...", "Congestion and added connection time", "More direct flights|Needing more routes"], ["Hubs let airlines...", "Fill planes by combining passengers", "Avoid all fuel use|Fly empty"],
       ["US airline deregulation took place in...", "1978", "1878|1998"], ["Low-cost airlines often prefer...", "Point-to-point routes", "Only mega hubs|Only trains"],
       ["Which is a major shipping hub?", "Singapore", "Lhasa|Andorra"], ["Economies of density mean costs per passenger...", "Fall as traffic grows", "Rise as traffic grows|Stay zero"]], HUBN)),
    LS("Comparative advantage", MN([
      ["Ricardo's idea", "⚖️", "David Ricardo (1817): a country should make what it gives up least to make, its <b>comparative advantage</b>, even if another country is better at everything. <b>Opportunity cost</b> is what you give up."],
      ["Counting the cost", "🧮", "If a country can make 12 cloth or 4 wine, then 1 wine costs 12 / 4 = <b>3 cloth</b>. The country with the lower opportunity cost for a good should specialize in it, and trade for the other."],
      ["What decides it", "🌍", "The <b>Heckscher-Ohlin</b> idea: countries export goods that use their plentiful factors (land, labor, capital). Trade also grows from economies of scale (Krugman). Gains are shared, but some workers lose jobs."]],
      "Think about what is given up, not only what is produced.", "Compare the cost of each good between the two countries.",
      [["Comparative advantage is about the lowest...", "Opportunity cost", "Population|Altitude"], ["Opportunity cost is...", "What you give up", "The price tag|The transport fee"],
       ["Who stated the theory in 1817?", "David Ricardo", "Adam Smith|Alfred Weber"], ["A country can gain from trade even if it is...", "Worse at making everything", "At war|Landlocked only"],
       ["Heckscher-Ohlin says countries export goods that use their...", "Plentiful factors", "Scarce factors|Smallest cities"], ["Specialization means a country...", "Focuses on goods it makes at lowest cost", "Makes everything|Stops trading"],
       ["A downside of trade for some workers is...", "Job losses in competing industries", "Higher rainfall|Longer days"], ["Economies of scale help explain trade in...", "Similar goods between rich countries", "Water only|Rain"]], RICARDON)),
    LS("Fordism and post-Fordism", MC([
      ["The assembly line", "🚗", "<b>Fordism</b>: mass production of standard goods on a moving assembly line (Henry Ford, 1913), paid for by higher wages (the $5 day, 1914) so workers could buy the goods. Big factories clustered in places like Detroit."],
      ["Flexible production", "🔧", "<b>Post-Fordism</b> from the 1970s uses <b>flexible specialization</b>, smaller batches, <b>just-in-time</b> delivery (made famous by Toyota), computers and global supply chains."],
      ["Geographic effects", "🗺️", "Firms moved factories to low-wage places or cut labor. Older industrial regions saw <b>deindustrialization</b>; new centers rose in East Asia. Cities shifted to services, technology and knowledge work."]],
      "Compare large standardized batches with smaller flexible ones.", "Think about what changed after the 1970s in where and how things are made.",
      [["Fordism is built on...", "Mass production on an assembly line", "Handmade crafts|Small custom batches"], ["Ford's moving assembly line began in...", "1913", "1813|1953"],
       ["Just-in-time delivery was made famous by...", "Toyota", "Ford|Boeing"], ["Post-Fordism favors...", "Flexible specialization", "One standard product|Subsistence farming"],
       ["Deindustrialization means...", "Loss of manufacturing jobs in a region", "Growth of factories|More mining"], ["A Fordist city example is...", "Detroit", "Venice|Lhasa"],
       ["Global supply chains let firms...", "Make parts in many countries", "Use only local parts|Avoid transport"], ["Higher wages in the Fordist system helped workers...", "Buy the goods they made", "Save nothing|Avoid work"]])),
    LS("The informal economy", MC([
      ["Work outside the rules", "🛒", "The <b>informal economy</b> includes jobs and businesses not registered, taxed or protected by law: street vendors, small repair shops, domestic work, informal farming and many small builders."],
      ["How big?", "🌍", "The International Labour Organization estimates that <b>more than half</b> of the world's workers have informal jobs. The share is higher in low-income countries, and in parts of Africa and South Asia it is far higher."],
      ["Good and bad", "⚖️", "Informal work gives income and flexibility where formal jobs are scarce, but it often lacks pensions, safety and legal protection, and does not pay taxes for services. Hernando de Soto argued that giving poor people legal <b>property titles</b> could help them use their assets."]],
      "Think about whether the work is registered and protected by law.", "Compare the benefits to workers with the missing protections.",
      [["Informal work is work that is...", "Not registered, taxed or protected by law", "Done only at home|Done for a university"], ["A street food vendor with no license is part of the...", "Informal economy", "Formal economy|Government"],
       ["ILO estimates that informal jobs are held by...", "More than half of the world's workers", "Under 1 percent of workers|Only children"], ["A downside of informal work is a lack of...", "Legal protection", "Customers|Income always"],
       ["Informal jobs are most common in...", "Low-income countries", "Rich countries only|Antarctica"], ["Hernando de Soto proposed...", "Giving poor people legal property titles", "Banning markets|Taxing vendors more"],
       ["An advantage of informal work is...", "Flexibility and income when jobs are scarce", "Guaranteed pensions|Government housing"], ["Informal businesses usually pay...", "Little or no tax", "The highest taxes|Rent to the Moon"]])),
    LS("Migration theories", MC([
      ["Ravenstein's laws", "🧳", "E. G. Ravenstein (1885) noticed that most migrants move <b>short distances</b>, that migration happens in steps, that big cities attract migrants, and that economic reasons dominate."],
      ["Push, pull and obstacles", "↔️", "<b>Push factors</b> drive people out (poor jobs, conflict). <b>Pull factors</b> attract them (jobs, safety). Everett Lee added <b>intervening obstacles</b>: distance, cost, borders and laws. <b>Chain migration</b> follows relatives and friends."],
      ["Zelinsky's mobility transition", "📈", "Wilbur Zelinsky (1971) linked migration to the demographic transition: early on there is little long-distance movement; during growth, rural-to-urban migration rises; later, movement between cities and suburbs dominates."]],
      "Think about who moves, how far, and what gets in the way.", "Separate factors that push from those that pull, and add obstacles in between.",
      [["Ravenstein found that most migrants move...", "Short distances", "Across oceans|Only in winter"], ["A pull factor is...", "Job opportunities", "War|Famine"],
       ["A push factor is...", "Conflict at home", "A good school abroad|A new job offer"], ["Intervening obstacles include...", "Distance, cost and laws", "Cloud height|Time zone"],
       ["Chain migration follows...", "Relatives and friends", "Rivers|Rail lines only"], ["Who linked migration to the demographic transition?", "Wilbur Zelinsky", "E. G. Ravenstein|Colin Clark"],
       ["Step migration means moving...", "In stages, such as village to town to city", "In one huge jump|Back and forth daily"], ["Ravenstein's laws date from...", "1885", "1685|1985"]]))
  ];
  l29.push(LS("Mixed practice", MX(l29, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])));
  l29.push(LS("Level 29 Challenge", MX(l29, [10, 11, 12, 13, 14, 15, 16, 17, 1, 3, 5, 8, 9, 11, 12, 14])));

  // ---------- LEVEL 30 number makers ----------
  const ISLN = () => {
    const S = pick([20, 30, 40, 50, 80, 120]), f = pick([10, 100, 1000]), mult = { 10: 2, 100: 4, 1000: 8 }[f];
    return Q(`A rule of thumb says that when island area grows 10 times, the number of species about doubles. An island has ${S} species. About how many species would an island ${f} times larger have?`, S * mult,
      "Work out how many tenfold steps are inside the area increase.", "Double the species once for every tenfold step.",
      "Example: an island with 15 species and an island 100 times larger. That is two tenfold steps, so 15 x 2 x 2 = 60. Now do yours.");
  };
  const CUTN = () => {
    const E = pick([100, 200, 300, 400, 500, 800]), p = pick([10, 20, 25, 30, 40, 50]);
    return Q(`A country emits ${E} million tonnes of CO2 a year and plans to cut emissions by ${p} percent. How many million tonnes will it emit after the cut?`, E - E * p / 100,
      "First find the size of the cut, then see what remains.", "Take the percent of the current emissions, then subtract it from the current emissions.",
      "Example: 200 million tonnes with a 25 percent cut. The cut is 50, leaving 150. Now do yours.");
  };
  const RSQN = () => {
    const [r, a] = pick([[5, 25], [6, 36], [7, 49], [8, 64], [9, 81]]);
    return Q(`Two variables have a correlation coefficient r = 0.${r}. Multiply r by itself to get r squared. What percent of the variation is explained?`, a,
      "The squared value is the share of variation explained, written as a decimal.", "Square the decimal, then convert it to a percent.",
      "Example: r = 0.4 gives 0.16, which is 16 percent. Now do yours.");
  };
  const REGN = () => {
    const a = pick([10, 20, 30, 40]), b = pick([2, 3, 4, 5]), x = ri(2, 12);
    if (Math.random() < 0.6) return Q(`A regression line for crop yield is: yield = ${a} + ${b} x rainfall (cm). What yield does it predict for ${x} cm of rainfall?`, a + b * x,
      "Replace the rainfall symbol with the number given.", "Multiply the slope by the rainfall, then add the intercept.",
      "Example: yield = 10 + 3 x rainfall at 5 cm gives 10 + 15 = 25. Now do yours.");
    const pred = a + b * x, extra = ri(1, 9);
    return Q(`A regression line predicts a yield of ${pred} at ${x} cm of rainfall. A field with ${x} cm actually produced ${pred + extra}. What is the residual (observed - predicted)?`, extra,
      "A residual is the gap between what was seen and what the line predicted.", "Subtract the predicted value from the observed value.",
      "Example: predicted 40, observed 47. Residual = 47 - 40 = 7. Now do yours.");
  };
  const CHIN = () => {
    if (Math.random() < 0.55) {
      const opts = [];
      [100, 200].forEach(N => [20, 40, 50, 60, 80, 100].forEach(r => [10, 20, 25, 40, 50].forEach(c => { if (r < N && c < N && (r * c) % N === 0) opts.push([N, r, c]); })));
      const [N, r, c] = pick(opts);
      return Q(`In a table of ${N} people, a row total is ${r} and a column total is ${c}. What is the expected count for the cell where they meet if the variables are unrelated?`, r * c / N,
        "Expected counts assume no link between the variables.", "Multiply the row total by the column total, then divide by the grand total.",
        "Example: row total 30, column total 40, grand total 100. Expected = 30 x 40 / 100 = 12. Now do yours.");
    }
    const [E, d, ans] = pick([[4, 2, 1], [5, 5, 5], [10, 10, 10], [9, 6, 4], [16, 8, 4], [25, 5, 1], [8, 4, 2], [20, 10, 5]]);
    const O = Math.random() < 0.5 ? E + d : E - d;
    return Q(`In a chi-square test, a cell has an expected count of ${E} and an observed count of ${O}. Its contribution is (observed - expected) squared / expected. What is it?`, ans,
      "Find how far the observed value is from the expected value.", "Square the difference, then divide by the expected count.",
      "Example: observed 14, expected 10. Difference 4, squared 16, divided by 10 gives 1.6. Now do yours.");
  };
  const ZN = () => {
    const m = pick([40, 50, 60, 100, 200]), s = pick([5, 10, 20]), z = ri(1, 3);
    if (Math.random() < 0.5) return Q(`City rainfall averages ${m} mm with a standard deviation of ${s} mm. A year had ${m + z * s} mm. What is its z-score?`, z,
      "A z-score tells how many standard deviations a value is above the mean.", "Subtract the mean from the value, then divide by the standard deviation.",
      "Example: mean 50, standard deviation 10, value 70. (70 - 50) / 10 = 2. Now do yours.");
    return Q(`Heights above sea level average ${m} m with a standard deviation of ${s} m. What value is ${z} standard deviations above the mean?`, m + z * s,
      "Find the size of the step, then take that many steps from the mean.", "Multiply the standard deviation by the number of steps and add it to the mean.",
      "Example: mean 50, standard deviation 10, 2 steps above is 50 + 20 = 70. Now do yours.");
  };
  const SEN = () => {
    const k = pick([2, 3, 4, 5, 6, 10]), n = k * k, m = ri(2, 10), sd = k * m;
    if (Math.random() < 0.6) return Q(`A survey of ${n} households has a standard deviation of ${sd} in daily water use. What is the standard error (standard deviation / sqrt of sample size)?`, m,
      "The standard error shrinks as the sample grows.", "Take the square root of the sample size and divide the standard deviation by it.",
      "Example: standard deviation 20 and 25 households. sqrt(25) = 5, so 20 / 5 = 4. Now do yours.");
    return Q(`A sample of ${n} points has a standard error of ${m}. The margin of error is about 2 x the standard error. What is the margin of error?`, 2 * m,
      "A rough 95 percent interval goes about two standard errors either side.", "Double the standard error.",
      "Example: a standard error of 3 gives a margin of error of about 6. Now do yours.");
  };

  // ---------- LEVEL 30 ----------
  const l30 = [
    LS("Island biogeography", MN([
      ["Islands and species", "🏝️", "Robert MacArthur and E. O. Wilson (1967) said the number of species on an island balances <b>immigration</b> of new species against <b>extinction</b> of old ones. Immigration is faster on islands <b>near</b> a mainland. Extinction is slower on <b>large</b> islands."],
      ["Species-area", "📈", "Bigger islands have more species. A common rule of thumb: when area grows <b>10 times</b>, species roughly <b>double</b>. Far, small islands have the fewest species."],
      ["Habitat islands", "🌳", "The idea also applies to <b>habitat islands</b>: a forest patch in farmland, a mountain top, a lake. It guides conservation: large reserves lose fewer species, and <b>corridors</b> connect patches."]],
      "Think about how size and distance each affect arrivals and losses.", "Combine the effect of size with the effect of distance from the mainland.",
      [["Species numbers on an island balance immigration and...", "Extinction", "Erosion|Evaporation"], ["Which island holds the most species, other things equal?", "Large and near a mainland", "Small and far from a mainland|Small and near a mainland"],
       ["A forest patch surrounded by farms is a...", "Habitat island", "Peninsula|Plate"], ["A wildlife corridor...", "Connects habitat patches", "Blocks movement|Adds an island"],
       ["Who proposed the theory in 1967?", "MacArthur and Wilson", "Ricardo and Marshall|Hotelling and Weber"], ["Extinction rates are lower on...", "Large islands", "Small islands|Far islands only"],
       ["Immigration rates are higher on islands...", "Near a mainland", "Far from a mainland|Without beaches"], ["Larger reserves usually...", "Keep more species", "Lose more species|Have no effect"]], ISLN)),
    LS("Threatened species", MC([
      ["The Red List", "📕", "The <b>IUCN Red List</b> ranks the risk of extinction. From lowest to highest risk: Least Concern, Near Threatened, <b>Vulnerable</b>, <b>Endangered</b>, <b>Critically Endangered</b>, Extinct in the Wild, Extinct. The three bold ones together are called <b>threatened</b>."],
      ["Why species decline", "🌍", "The leading cause is <b>habitat loss</b> and degradation, mostly from farming and cutting forests. Others: overharvesting, invasive species, pollution and climate change."],
      ["Protecting them", "🛡️", "Tools include <b>protected areas</b>, laws on trade (CITES), restoring habitat, and working with local people. Because many species are found in only one place, geography matters: <b>endemic</b> species are most at risk when a small area is lost."]],
      "Think about where on the risk scale each category sits.", "Use the order of the categories from the slides to compare risk levels.",
      [["Which Red List category is closest to extinction in the wild?", "Critically Endangered", "Vulnerable|Least Concern"], ["The leading cause of species decline is...", "Habitat loss", "Moonlight|Too many tides"],
       ["Threatened means Vulnerable, Endangered or...", "Critically Endangered", "Least Concern|Extinct"], ["An endemic species is found...", "Only in one area", "Everywhere|Only in cities"],
       ["The IUCN Red List ranks species by...", "Risk of extinction", "Size|Color"], ["CITES controls...", "International trade in wildlife", "Weather reports|Farming"],
       ["Which has the lowest risk?", "Least Concern", "Endangered|Critically Endangered"], ["Endemic species are most at risk when...", "A small range is lost", "A large forest is added|Rain increases"]])),
    LS("Nutrient pollution and dead zones", MC([
      ["Too many nutrients", "🌾", "Fertilizer, manure and sewage carry <b>nitrogen and phosphorus</b> into rivers and seas. This is <b>eutrophication</b>: extra nutrients fuel huge blooms of algae."],
      ["Running out of oxygen", "🫧", "When algae die, bacteria decompose them and use up the oxygen in the water. The result is <b>hypoxia</b> (very low oxygen), forming <b>dead zones</b> where fish and other animals cannot live."],
      ["Where and how to fix", "🗺️", "The Mississippi River carries farm nutrients to the <b>Gulf of Mexico</b>, where a large seasonal dead zone forms. The Baltic Sea has another. Solutions: use less fertilizer, plant buffer strips along streams, restore wetlands and treat sewage."]],
      "Follow the chain from nutrients to algae to oxygen.", "Think about what the bacteria use up.",
      [["Eutrophication is caused by too many...", "Nutrients", "Fish|Rocks"], ["Which elements mainly cause it?", "Nitrogen and phosphorus", "Iron and gold|Neon and helium"],
       ["A dead zone has very low...", "Oxygen", "Salt|Gravity"], ["What uses up the oxygen?", "Bacteria decomposing dead algae", "Fish breathing less|Sunlight"],
       ["The Mississippi River feeds a dead zone in the...", "Gulf of Mexico", "Gulf of Aden|North Sea"], ["Which helps reduce nutrient runoff?", "Planting buffer strips along streams", "Adding more fertilizer|Draining wetlands"],
       ["Hypoxia means...", "Low oxygen", "High salt|Low light"], ["Another sea with a large dead zone is the...", "Baltic Sea", "Dead Sea|Red Sea"]])),
    LS("Tipping points and planetary boundaries", MC([
      ["Thresholds", "⚠️", "A <b>tipping point</b> is a threshold where a small extra push triggers a big, hard-to-reverse shift. <b>Positive feedbacks</b> speed the change. A system's <b>resilience</b> is its ability to absorb shocks and keep working."],
      ["Examples", "🌐", "Possible tipping elements: loss of the <b>Greenland ice sheet</b>, collapse of warm-water <b>coral reefs</b>, <b>Amazon dieback</b> to savanna, change in the Atlantic overturning circulation, and thawing permafrost. Many show <b>hysteresis</b>: going back needs far more than reversing the push."],
      ["Planetary boundaries", "🌍", "Johan Rockstrom and colleagues (2009) proposed <b>nine planetary boundaries</b> (climate, biodiversity, nitrogen and phosphorus, land use, freshwater, ocean acidification, ozone, aerosols, new chemicals). Crossing them raises the risk of abrupt change."]],
      "Think about thresholds, where a small change leads to a large one.", "Recall the definitions of the key terms in the slides.",
      [["A tipping point is a...", "Threshold that triggers a large shift", "Mountain peak|Weather station"], ["Resilience is the ability to...", "Absorb shocks and keep functioning", "Trigger tipping points|Reverse the seasons"],
       ["Hysteresis means reversing change...", "Needs much more than the original push", "Is always easy|Happens instantly"], ["How many planetary boundaries were proposed?", "Nine", "Three|Thirty"],
       ["Which is a possible tipping element?", "Amazon forest dieback", "Seasons of the Moon|The Equator"], ["A positive feedback...", "Speeds up change", "Stops all change|Reverses change"],
       ["Who led the 2009 planetary boundaries work?", "Johan Rockstrom", "Alfred Weber|William Reilly"], ["Crossing a boundary raises the risk of...", "Abrupt change", "Cheaper food|Longer days"]])),
    LS("Political ecology", MC([
      ["Power and nature", "⚖️", "<b>Political ecology</b> studies how power, wealth and politics shape human-environment relations. It asks: who owns the resource, who decides, who benefits and who bears the harm?"],
      ["Two old debates", "📚", "<b>Malthus</b> (1798) warned that population grows faster than food. <b>Boserup</b> (1965) argued that growing pressure pushes people to invent better farming. Political ecologists add that hunger often comes from unequal access, not just shortage."],
      ["Examples", "🌳", "Who gets forest rights? Large <b>land acquisitions</b> by outside investors; <b>enclosure</b> of common land; mining profits leaving a region while pollution stays; <b>conservation</b> areas that exclude local people. Solutions often involve community rights."]],
      "Think about who gains and who pays in the story.", "Separate shortage of a resource from unequal access to it.",
      [["Political ecology asks who has...", "Power over resources", "The tallest buildings|The longest coastline"], ["Malthus warned that population grows faster than...", "Food supply", "Rainfall|Land prices"],
       ["Boserup argued that population pressure leads to...", "Farming innovation", "Certain famine|Less people"], ["Enclosure means...", "Fencing off common land", "Opening a road|Building a bridge"],
       ["Political ecologists say hunger often comes from...", "Unequal access to food", "Too little sunlight|The Moon"], ["A conservation area that excludes local people can...", "Create conflict", "End all poverty|Improve nothing"],
       ["Malthus wrote in...", "1798", "1598|1998"], ["Community rights over forests can...", "Help both people and nature", "Prevent all use|Make forests vanish"]])),
    LS("Mitigation and adaptation", MN([
      ["Two responses", "🔀", "<b>Mitigation</b> reduces the cause: cut greenhouse gases (renewable energy, efficiency) or remove carbon (forests, capture). <b>Adaptation</b> adjusts to impacts: sea walls, drought-resistant crops, early warnings, cooler buildings."],
      ["Vulnerability", "🧩", "<b>Vulnerability</b> depends on <b>exposure</b> (is it in the way?), <b>sensitivity</b> (how much it is harmed) and <b>adaptive capacity</b> (ability to cope). Poor communities usually have less capacity."],
      ["Choices and limits", "🌴", "<b>Nature-based solutions</b> such as mangroves and wetlands protect coasts and store carbon. Adaptation has limits (very high seas, extreme heat). Equity matters: those who emitted least are often most at risk."]],
      "Ask whether the action reduces the cause or deals with the effect.", "Cutting the cause is one idea; living with the effect is the other.",
      [["Planting forests to absorb carbon is...", "Mitigation", "Adaptation|Exposure"], ["Building a sea wall is...", "Adaptation", "Mitigation|Emissions"],
       ["Adaptive capacity is the ability to...", "Cope with impacts", "Emit gases|Fill dams"], ["Which usually has more vulnerability?", "A poor coastal community", "A rich inland city|A mountain peak"],
       ["Mangroves protect coasts and also...", "Store carbon", "Raise sea level|Create smog"], ["Drought-resistant crops are...", "Adaptation", "Mitigation|Exposure"],
       ["Switching to solar power is...", "Mitigation", "Adaptation|Sensitivity"], ["Exposure means being...", "In the way of a hazard", "Hidden underground|Far from everything"]], CUTN)),
    LS("Chokepoints", MC([
      ["Narrow, vital passages", "🚢", "A <b>chokepoint</b> is a narrow strait or canal that much trade must pass through, so whoever controls it has power. About a fifth of world oil passes through the <b>Strait of Hormuz</b>, between the Persian Gulf and the Gulf of Oman."],
      ["Key places", "📍", "<b>Strait of Malacca</b>: between Malaysia and Indonesia, linking the Indian Ocean and the South China Sea. <b>Suez Canal</b> (opened 1869): Mediterranean to Red Sea. <b>Panama Canal</b> (opened 1914): Atlantic to Pacific. <b>Bosphorus</b>: Black Sea to Mediterranean. <b>Bab-el-Mandeb</b>: the Red Sea's southern gate."],
      ["Why it matters", "⚓", "A blockage (a ship stuck in Suez in 2021 held up global trade) or a threat can raise prices. Alternatives are long: ships can go around the <b>Cape of Good Hope</b>. Navies protect routes; treaties guarantee passage."]],
      "Match each strait or canal with the two seas it joins.", "Think about the ocean or sea names in each passage.",
      [["The Strait of Hormuz lies at the mouth of the...", "Persian Gulf", "Black Sea|Baltic Sea"], ["The Suez Canal links the Mediterranean with the...", "Red Sea", "Black Sea|Caspian Sea"],
       ["The Panama Canal links the Atlantic with the...", "Pacific", "Indian Ocean|Arctic Ocean"], ["The Strait of Malacca links the Indian Ocean with the...", "South China Sea", "Mediterranean|Gulf of Mexico"],
       ["The Bosphorus links the Black Sea with the...", "Mediterranean", "Red Sea|Baltic"], ["If Suez is blocked, ships can go around the...", "Cape of Good Hope", "Cape Horn only|Strait of Gibraltar"],
       ["The Suez Canal opened in...", "1869", "1769|1969"], ["The Panama Canal opened in...", "1914", "1814|2014"]])),
    LS("Geopolitics of the Arctic", MC([
      ["A changing ocean", "🧊", "Arctic sea ice is shrinking, opening new shipping routes: the <b>Northern Sea Route</b> along Russia's coast and the <b>Northwest Passage</b> through northern Canada. Resources and fishing also draw attention."],
      ["Who governs", "🏛️", "The <b>Arctic Council</b> (1996) has eight member states: Canada, Denmark (Greenland), Finland, Iceland, Norway, Russia, Sweden and the United States, with Indigenous groups as permanent participants. The <b>Svalbard Treaty</b> (1920) gave Norway sovereignty with equal access rights for others."],
      ["Claims", "📜", "Under UNCLOS, states can claim an extended continental shelf if the seabed is a natural extension of land. Russia, Canada and Denmark have each made claims that overlap on the <b>Lomonosov Ridge</b>. The poles are not owned; the Arctic is ocean, not a continent."]],
      "Think about which countries touch the Arctic Ocean and what melting ice allows.", "Recall the two sea routes and the council described in the slides.",
      [["The Arctic Council has how many member states?", "Eight", "Three|Twenty"], ["The Northern Sea Route runs along the coast of...", "Russia", "Greenland only|Alaska only"],
       ["The Northwest Passage lies mostly through...", "Northern Canada", "Siberia|Iceland"], ["Melting sea ice allows...", "New shipping routes", "Fewer ships|Frozen canals"],
       ["The Lomonosov Ridge claims overlap among Russia, Canada and...", "Denmark", "Mexico|Brazil"], ["Unlike Antarctica, the Arctic is...", "Ocean surrounded by land", "A continent|An island"],
       ["Which is a permanent participant in the Arctic Council?", "Indigenous peoples' organizations", "Oil firms|Shipping firms"], ["The Svalbard Treaty gave sovereignty to...", "Norway", "Russia|Canada"]])),
    LS("Hard, soft and smart power", MC([
      ["Hard power", "🛡️", "<b>Hard power</b> is getting what you want by force or payment: armies, weapons, sanctions, aid with conditions. It is visible and strong, but costly and can create resentment."],
      ["Soft power", "🎬", "Joseph Nye (1990) coined <b>soft power</b>: influence by attraction through culture, values, education and policies others admire. Examples are films, music, universities, exchange programs and popular brands. It works slowly and cannot be fully controlled by a government."],
      ["Smart power", "🧠", "<b>Smart power</b> mixes both. Geographers also look at how <b>geography</b> shapes power: size, resources, location, population, and who controls trade routes and technology."]],
      "Ask whether influence comes from force or from attraction.", "Think about whether the example is about pushing or about persuading.",
      [["Soft power works by...", "Attraction and influence", "Force|Blockade"], ["Hard power relies on...", "Military or economic force", "Music and films|Student exchanges"],
       ["Who coined the term soft power?", "Joseph Nye", "Halford Mackinder|Friedrich Ratzel"], ["Which is an example of soft power?", "Popular films and universities", "A naval blockade|Sanctions"],
       ["Smart power means...", "Combining hard and soft tools", "Using only computers|Avoiding all contact"], ["Economic sanctions are a form of...", "Hard power", "Soft power|No power"],
       ["Soft power is hard to control because...", "People freely choose what they admire", "It needs armies|It is illegal"], ["Student exchange programs mostly build...", "Soft power", "Hard power|Weapons"]])),
    LS("Balance of power", MC([
      ["States check each other", "⚖️", "The <b>balance of power</b> idea says states ally against any state that becomes too strong, so that no single one dominates. Alliances shift as threats change."],
      ["How many poles?", "🌐", "A system with one dominant power is <b>unipolar</b> (a hegemon). With two it is <b>bipolar</b> (the Cold War: the United States and the Soviet Union). With several it is <b>multipolar</b> (Europe in the 1800s)."],
      ["Alliances", "🤝", "<b>NATO</b> (1949) was a Western alliance and the <b>Warsaw Pact</b> (1955) the Soviet-led counterpart. <b>BRICS</b>, named for Brazil, Russia, India and China (South Africa joined in 2010), is an economic forum rather than a military alliance."]],
      "Count how many major powers there are in each description.", "Think about what states do when one state becomes very strong.",
      [["A bipolar system has...", "Two dominant powers", "One dominant power|Many equal powers"], ["A unipolar system has...", "One dominant power", "Two dominant powers|No powers"],
       ["The Cold War was mostly...", "Bipolar", "Unipolar|Multipolar"], ["NATO was formed in...", "1949", "1849|1989"],
       ["The Warsaw Pact was led by the...", "Soviet Union", "United States|United Kingdom"], ["BRICS is mainly a...", "Group for economic cooperation", "Military pact|Language union"],
       ["Balance of power predicts that states will...", "Ally against a rising giant", "Always join the strongest|Never ally"], ["A hegemon is a...", "Dominant power", "Weak state|River"]])),
    LS("Fragile states", MC([
      ["Weak control", "🏛️", "Max Weber defined a state as holding the <b>monopoly on legitimate force</b> within a territory. A <b>fragile state</b> has trouble doing this or delivering basic services such as security, justice, schooling and health."],
      ["Causes and signs", "📉", "Causes include civil conflict, weak institutions, corruption, poverty and colonial-era borders. Indexes such as the <b>Fragile States Index</b> (Fund for Peace) score demographic pressure, refugees, group grievances, and state legitimacy."],
      ["Spillovers", "🌐", "Instability can send <b>refugees</b> to neighbors, disrupt trade, and allow armed groups or smuggling in remote <b>borderlands</b>. International help usually focuses on building institutions, jobs and trust rather than only on security."]],
      "Think about what a state is expected to provide.", "Consider both causes inside the country and effects on neighbors.",
      [["Weber said a state has a monopoly on...", "Legitimate force", "Trade|Language"], ["A fragile state has difficulty providing...", "Basic services and security", "Football teams|Weather"],
       ["The Fragile States Index is published by the...", "Fund for Peace", "Red Cross|NATO"], ["Instability can cause...", "Refugees to flee to neighbors", "Higher mountains|Shorter days"],
       ["Borderlands in fragile states often see...", "Smuggling and armed groups", "Strong police|Many airports"], ["One cause of fragility is...", "Weak institutions", "Strong courts|Efficient taxes"],
       ["Colonial-era borders sometimes...", "Group people into states that do not fit", "Ensure peace|Were drawn by locals"], ["Long-term help focuses on...", "Building institutions and jobs", "Closing schools|Ignoring"]])),
    LS("Global commons", MC([
      ["Shared spaces", "🌍", "<b>Global commons</b> lie outside any state's ownership: the high seas, the atmosphere, Antarctica and outer space. Rules come from treaties."],
      ["Key treaties", "📜", "The <b>Antarctic Treaty</b> (signed 1959) reserves Antarctica for peace and science and freezes territorial claims. The <b>Outer Space Treaty</b> (1967) bans national ownership of the Moon and planets. <b>UNCLOS</b> (1982) sets rules for the oceans, including a 200-nautical-mile EEZ."],
      ["Challenges", "⚠️", "The commons face overfishing, space debris, pollution and disputes. Because no one owns them, everyone may overuse them, and enforcement is difficult. Treaties like the Montreal Protocol show cooperation can work."]],
      "Think about which spaces nobody owns.", "Match each treaty to the area it covers.",
      [["The Antarctic Treaty was signed in...", "1959", "1859|1979"], ["Antarctica is reserved for...", "Peace and science", "Mining|Military bases"],
       ["The Outer Space Treaty bans national ownership of...", "The Moon and planets", "Satellites' owners|The sea"], ["Which is a global commons?", "The high seas", "A lake in one country|A national park"],
       ["UNCLOS sets rules for...", "The oceans", "Space|Antarctica"], ["The EEZ extends...", "200 nautical miles", "12 kilometers|2,000 nautical miles"],
       ["Space debris is a problem in...", "Outer space", "Antarctica|Rivers"], ["Which treaty showed cooperation on the ozone layer?", "Montreal Protocol", "Warsaw Pact|Schengen"]])),
    LS("Correlation", MN([
      ["The correlation coefficient", "📈", "<b>Pearson's r</b> measures how well two variables move together in a straight line. It runs from <b>-1</b> (perfect opposite) through <b>0</b> (no linear link) to <b>+1</b> (perfect together)."],
      ["Strength and r squared", "🔢", "|r| near 1 is strong, near 0 weak. <b>r squared</b> is the share of the variation in one variable explained by the other. If r = 0.8, r squared is 0.64: 64 percent."],
      ["Careful!", "⚠️", "<b>Correlation is not causation</b>: ice cream sales and drowning both rise in summer. Geographers also watch for the <b>ecological fallacy</b>: a pattern across regions may not hold for individuals."]],
      "Think about the sign and the size of the number.", "The closer a value is to the ends of the scale, the stronger the link.",
      [["r = -0.9 means...", "A strong negative link", "A weak positive link|No link"], ["r = 0 means no...", "Linear relationship", "Data|Variation at all"],
       ["Correlation does not prove...", "Causation", "Any pattern|Averages"], ["r squared tells the share of variation...", "Explained", "Missed in the sample|Of the map scale"],
       ["The ecological fallacy is wrongly assuming a regional pattern holds for...", "Individuals", "The whole world|Maps"], ["Which r is strongest?", "-0.95", "0.5|-0.2"],
       ["Ice cream sales and drownings both rise in summer because of...", "A hidden common cause (warm weather)", "Ice cream causing drowning|Drowning causing ice cream sales"], ["r always lies between...", "-1 and 1", "0 and 100|-10 and 10"]], RSQN)),
    LS("Linear regression", MN([
      ["A line through data", "📉", "<b>Regression</b> fits a line y = a + b x to data. <b>b</b> is the <b>slope</b> (change in y per unit of x) and <b>a</b> is the <b>intercept</b> (y when x = 0). The line is chosen to make the squared gaps as small as possible (<b>least squares</b>)."],
      ["Predicting", "🔮", "Put a value of x into the equation to predict y. Example: yield = 10 + 3 x rainfall gives 25 at 5 cm. Stay inside the range of your data: predicting far outside it (<b>extrapolation</b>) is risky."],
      ["Residuals", "📏", "A <b>residual</b> is observed minus predicted. Mapping residuals can reveal places the model misses and show spatial patterns, hinting at missing variables."]],
      "Identify the slope and the intercept in the equation.", "Remember the line equation: start with the intercept, then add slope times x.",
      [["In y = a + bx, b is the...", "Slope", "Intercept|Residual"], ["In y = a + bx, a is the...", "Intercept", "Slope|Mean"],
       ["A residual is...", "Observed minus predicted", "Predicted minus the mean|Slope times x"], ["Least squares makes the line minimize...", "Squared gaps", "The data|The map scale"],
       ["Predicting far beyond your data is called...", "Extrapolation", "Interpolation|Georeferencing"], ["A positive slope means y...", "Rises as x rises", "Falls as x rises|Stays fixed"],
       ["Mapping residuals can reveal...", "Places where the model misses", "Perfect fits only|The datum"], ["The intercept is y when x equals...", "Zero", "One|The mean"]], REGN)),
    LS("Hypothesis tests and p-values", MC([
      ["Null and alternative", "🧪", "A <b>hypothesis test</b> starts with a <b>null hypothesis</b> (no effect or pattern). The <b>alternative</b> says there is one. We ask: if the null were true, how likely is data this extreme? That probability is the <b>p-value</b>."],
      ["Deciding", "⚖️", "If p is below a chosen <b>significance level</b> (alpha, often 0.05), we reject the null and call the result <b>statistically significant</b>. A <b>Type I error</b> rejects a true null; a <b>Type II error</b> fails to reject a false null."],
      ["Cautions", "⚠️", "A small p-value does not prove the effect is big or important. A large sample can make tiny effects significant. P is not the probability the null is true. Report effect sizes too."]],
      "Think about what the null hypothesis says before looking at the data.", "A low probability under the null makes the null hard to believe.",
      [["The null hypothesis usually says there is...", "No effect or pattern", "A huge effect|A map error"], ["A p-value is the probability of data this extreme if the...", "Null hypothesis is true", "Alternative is true|Sample is biased"],
       ["With alpha = 0.05, p = 0.01 means...", "Reject the null", "Accept the null|Collect no data"], ["A Type I error is...", "Rejecting a true null", "Failing to reject a false null|Mapping error"],
       ["A Type II error is...", "Failing to reject a false null", "Rejecting a true null|A typing error"], ["A significant result does not prove the effect is...", "Large or important", "Real at all|Measured"],
       ["A very large sample can make tiny effects...", "Statistically significant", "Disappear|Negative"], ["Alpha is the chosen...", "Significance level", "Slope|Sample"]])),
    LS("Chi-square tests", MN([
      ["Counts in categories", "🔢", "The <b>chi-square</b> test compares <b>observed</b> counts in categories with the counts <b>expected</b> if two variables were unrelated. Example: transport type by neighborhood."],
      ["Expected counts", "🧮", "For each cell, <b>expected = row total x column total / grand total</b>. The cell's contribution is <b>(observed - expected)squared / expected</b>. Add the contributions to get the chi-square statistic."],
      ["Reading it", "📊", "A large statistic means observed counts differ a lot from expected, so the p-value is small. Tests need expected counts of at least about 5 in most cells, and use counts, not percentages."]],
      "Think about what you would see if the two variables were unrelated.", "Compare the observed counts with the counts you would expect by chance.",
      [["Chi-square compares observed counts with...", "Expected counts", "Percentages only|Map scales"], ["It is used for data in...", "Categories", "Elevations only|Rivers"],
       ["A large chi-square statistic suggests...", "The variables may be related", "No link at all|An error"], ["The expected count in a cell is based on row totals, column totals and the...", "Grand total", "Median|Mode"],
       ["Chi-square tests use...", "Counts", "Percentages only|Ratios of ratios"], ["Expected counts assume the variables are...", "Unrelated", "Identical|Negative"],
       ["A small p-value for the test means...", "Observed differs a lot from expected", "Observed equals expected|Data is missing"], ["Expected counts should be at least about...", "5", "500|0.5"]], CHIN)),
    LS("Standard deviation and z-scores", MN([
      ["Spread", "📏", "The <b>standard deviation</b> (SD) measures how far values typically lie from the <b>mean</b>. A small SD means values cluster; a large SD means they spread out."],
      ["z-scores", "🔢", "<b>z = (value - mean) / SD</b>: how many SDs a value lies above (positive) or below (negative) the mean. A z of 2 is two SDs above the average."],
      ["The 68-95-99.7 rule", "🔔", "In a bell-shaped (normal) distribution, about <b>68 percent</b> of values lie within 1 SD of the mean, <b>95 percent</b> within 2 SDs and <b>99.7 percent</b> within 3. Values beyond 2 or 3 SDs are unusual and may be outliers or extreme events."]],
      "Think about how many steps the value is from the average.", "A step is one standard deviation.",
      [["A z-score of 0 means the value is...", "At the mean", "At the maximum|An outlier"], ["A z-score of -2 means the value is...", "Two SDs below the mean", "Two SDs above the mean|Equal to the mean"],
       ["About what share of values lie within 2 SDs of the mean?", "95 percent", "68 percent|50 percent"], ["A large SD means values are...", "Spread out", "Tightly clustered|All the same"],
       ["About what share lie within 1 SD?", "68 percent", "95 percent|99.7 percent"], ["Within 3 SDs lies about...", "99.7 percent", "50 percent|75 percent"],
       ["A value 3 SDs from the mean is...", "Unusual", "Typical|Impossible"], ["SD measures...", "Typical distance from the mean", "The highest value|The count"]], ZN)),
    LS("Sampling error and confidence", MN([
      ["Samples vary", "🎲", "A sample gives an estimate, not the exact truth. <b>Sampling error</b> is the natural difference between a sample result and the population value. Bigger samples have smaller error."],
      ["Standard error", "🔢", "The <b>standard error</b> of a mean is <b>SD / sqrt(n)</b>. To halve it you need <b>four times</b> as many observations. A rough 95 percent <b>confidence interval</b> is the sample mean plus or minus about <b>2 standard errors</b> (1.96)."],
      ["Bias is different", "⚠️", "<b>Bias</b> is a systematic mistake, such as only surveying people at a shopping mall or from a map that leaves out some groups. A bigger sample does not fix bias, only random sampling and good design do."]],
      "Think about how sample size changes the uncertainty.", "A bigger sample gives a more precise estimate, but only if it is chosen fairly.",
      [["Standard error falls as sample size...", "Rises", "Falls|Stays fixed"], ["To halve the standard error you need about...", "Four times the sample", "Twice the sample|Half the sample"],
       ["A 95 percent confidence interval is roughly the mean plus or minus...", "2 standard errors", "10 standard errors|Half an SE"], ["Bias is a...", "Systematic mistake", "Random difference|Measurement unit"],
       ["A bigger sample fixes...", "Random error but not bias", "Bias only|Nothing"], ["Surveying only people at a mall risks...", "Bias", "Perfect accuracy|Higher precision"],
       ["Sampling error comes from...", "Chance differences between samples", "Cloud cover|Rounding errors only"], ["A confidence interval shows...", "A range of likely values", "Exact truth|The sample size only"]], SEN))
  ];
  l30.push(LS("Mixed practice", MX(l30, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])));
  l30.push(LS("Level 30 Challenge", MX(l30, [10, 11, 12, 13, 14, 15, 16, 17, 2, 4, 6, 8, 12, 14, 16, 17])));

  Object.assign(GEO_LEVELS, { 28: l28, 29: l29, 30: l30 });
})();
