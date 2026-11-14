// Mind Lab Earth & Space, levels 28-30 (extension file). 20 lessons per level.
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



  // ================= LEVEL 28 =================
  const a = [];
  a.push(L("The geoid and Earth's shape", [
    "Two reference shapes|🌍|Earth spins, so it bulges at the equator. The smooth mathematical shape that best fits it is a flattened sphere called the <b>reference ellipsoid</b>. The equatorial radius is about 21 km longer than the polar radius.",
    "The geoid|🌊|The <b>geoid</b> is the surface of equal gravitational potential that matches mean sea level. It is lumpy because mass is not spread evenly. It rises above the ellipsoid over extra mass and dips below it over missing mass, by up to roughly 100 meters.",
    "Measuring it|🛰️|Satellites such as GRACE map the geoid by tracking tiny changes in the distance between two satellites flying in line. GPS gives heights above the ellipsoid, and the geoid converts them to heights above sea level."
  ], [
    "The smooth mathematical shape that best fits Earth is a reference...|ellipsoid|🌍|It is a flattened sphere.|cube,geoid",
    "The surface of equal gravitational potential that matches mean sea level is the...|geoid|🌊|Its name sounds like Earth-shaped.|ellipsoid,isobar",
    "Earth bulges at the equator because of its...|rotation|🔄|Spinning things fling outward.|tides,magnetic field",
    "The equatorial radius is larger than the polar radius by about...|21 km|📏|It is a small fraction of the whole radius.|2 km,210 km",
    "The geoid lies above the ellipsoid where there is extra...|mass|⚖️|More mass pulls the equipotential surface up.|heat,water vapor",
    "Satellite missions such as GRACE map the geoid by tracking the distance between...|two satellites|🛰️|They fly one behind the other.|two volcanoes,two oceans",
    "Geoid heights differ from the ellipsoid by up to roughly...|100 meters|📐|Much smaller than mountains but still measurable.|10 kilometers,1 centimeter",
    "Surface gravity is slightly stronger at the...|poles|🧭|You are closer to the center and there is less spin effect.|equator,tropics"
  ], "Think about rotation, mass and the surface that gravity defines."));
  a.push(L("Heat flow and the geotherm", [
    "Conduction|🔥|Heat moves through solid rock by <b>conduction</b> from hot to cold. <b>Fourier's law</b> says heat flow q = k × (temperature gradient), where k is the thermal conductivity of the rock.",
    "Numbers|🧮|Typical rock has k near 3 W/m/K. Near the surface the temperature rises about 25 °C per km. So q = 3 × 0.025 = 0.075 W/m², or 75 mW/m². Earth's surface loses about 47 terawatts in total.",
    "Where heat comes from|☢️|Earth's heat comes from leftover heat from formation and from radioactive decay of uranium, thorium and potassium. Young ocean floor loses more heat than old continents."
  ], [
    "Heat is carried through solid rock by...|conduction|🔥|It needs no flowing matter.|radiation only,convection only",
    "Heat flows from...|hot to cold|🌡️|Think of a hot cup warming your hand.|cold to hot,left to right",
    "The usual temperature rise near the surface is about...|25 °C per km|⬇️|Roughly a few tens of degrees every kilometer.|2.5 °C per km,250 °C per km",
    "Rock has k = 3 W/m/K and a gradient of 0.02 K/m. Heat flow q = k × gradient in mW/m² is...|60|🧮|Multiply, then convert watts to milliwatts.|6,600",
    "Rock has k = 2.5 W/m/K and a gradient of 0.03 K/m. Heat flow in mW/m² is...|75|🧮|Multiply, then convert watts to milliwatts.|7.5,750",
    "Average heat flow through ocean floor is ___ that through continents.|higher than|🌊|Young seafloor is hot.|lower than,equal to",
    "Besides radioactive decay, Earth's other main heat source is...|leftover heat from formation|☄️|It dates from when the planet was built.|sunlight absorbed,the tides",
    "Total heat flow out of Earth is about...|47 terawatts|⚡|About three times human energy use.|4.7 terawatts,470 terawatts"
  ], "Use Fourier's law: heat flow equals conductivity times gradient."));
  a.push(L("Seismic reflection surveys", [
    "Echo sounding the ground|📡|A source (an air gun at sea or a vibrating truck on land) sends waves down. Where rock layers change, part of the energy bounces back to <b>geophones</b>.",
    "Two-way time|⏱️|The recorded time is for the trip down and back, the <b>two-way time</b>. Depth = velocity × two-way time ÷ 2. With v = 2000 m/s and 1 s, depth = 2000 × 1 ÷ 2 = 1000 m.",
    "How strong is an echo?|📈|A reflection is strong where <b>acoustic impedance</b> (density × velocity) changes a lot. Geologists stack many records to build a picture of folds, faults and oil traps."
  ], [
    "A wave goes down at 2000 m/s and returns in a two-way time of 1 s. The reflector depth in meters is...|1000|📡|Halve the time first.|2000,500",
    "A wave at 3000 m/s with a two-way time of 1.4 s. The depth in meters is...|2100|📡|Multiply velocity by time, then halve.|4200,1050",
    "A wave in water at 1500 m/s with a two-way time of 0.4 s. The depth in meters is...|300|🌊|Multiply, then halve.|600,150",
    "A wave at 2500 m/s with a two-way time of 0.8 s. The depth in meters is...|1000|📡|Multiply, then halve.|2000,500",
    "Reflection strength depends on contrasts in...|acoustic impedance|📈|It is density times velocity.|color,temperature",
    "The recorded time in a reflection survey is for a trip...|down and back|↕️|The wave must return to the surface.|down only,sideways only",
    "At sea, the sound source is usually an...|air gun|🚢|It releases a burst of compressed air.|ice drill,magnet",
    "Reflection surveys are widely used to find...|oil and gas traps|🛢️|They show buried structures.|ocean tides,aurora"
  ], "Remember: depth is velocity times two-way time, divided by 2."));
  a.push(L("The geodynamo", [
    "A self-sustaining magnet|🧲|Earth's field is made by moving liquid iron in the <b>outer core</b>. This is the <b>geodynamo</b>. It needs a conducting fluid, convection and rotation.",
    "What drives it|🔥|As the solid inner core slowly freezes, it releases heat and light elements. This stirs the outer core by convection. Spin organizes the flow into a mostly dipole field.",
    "Field strength and shield|🛡️|The field at the surface is about 25 to 65 microtesla. It shields us from the solar wind. Mars and Venus have no global field today."
  ], [
    "Earth's magnetic field is made by motion of liquid iron in the...|outer core|🧲|It lies between the mantle and the solid center.|crust,mantle",
    "This process is called the...|geodynamo|⚙️|It is a dynamo made by Earth.|geoid,gyre",
    "A dynamo needs a conducting fluid, convection and...|rotation|🔄|Spin twists the flow.|tides,volcanism",
    "The field at Earth's surface is about...|50 microtesla|🧲|Very weak compared with a fridge magnet.|50 millitesla,5 nanotesla",
    "The inner core is solid because of its high...|pressure|⬇️|It is under extreme squeezing.|volume,speed",
    "Freezing of the inner core stirs the outer core by...|convection|♨️|It releases buoyant light material.|erosion,subduction",
    "Earth's magnetic field shields us from the...|solar wind|☀️|It deflects charged particles.|Moon's gravity,cosmic dust",
    "Which planet has ancient magnetized crust but no global field today?|Mars|🔴|It is the fourth planet.|Earth,Saturn"
  ], "Think about liquid iron, convection and spin."));
  a.push(L("Elastic, viscous and brittle rock", [
    "Three behaviors|🧱|<b>Elastic</b> material springs back when stress is removed. <b>Viscous</b> material flows like honey. Real rock can be <b>viscoelastic</b>: elastic over seconds, viscous over millions of years.",
    "Viscosity|🍯|Mantle viscosity is about 10²¹ Pa·s, while water is about 0.001 Pa·s. The <b>Maxwell time</b> = viscosity ÷ shear modulus tells when a material switches from elastic to viscous behavior.",
    "Brittle and ductile|🔨|Cold shallow rock is <b>brittle</b> and breaks along faults. Deeper, hotter rock <b>creeps</b>. The change happens at around 10 to 15 km in continental crust."
  ], [
    "A material that returns to its shape after stress is removed is...|elastic|🔄|Think of a spring.|viscous,brittle",
    "A material that flows continuously under stress, like honey, is...|viscous|🍯|It has no memory of its shape.|elastic,brittle",
    "Rock that acts elastic in an earthquake yet flows over millions of years is...|viscoelastic|⏳|It is both, depending on time.|superelastic,inelastic only",
    "Water has a viscosity of about...|0.001 Pa s|💧|It flows very easily.|1000 Pa s,10²¹ Pa s",
    "Cold shallow rock deforms by...|fracturing|💥|It snaps instead of flowing.|slow creep,melting",
    "Slow flow of hot solid rock is called...|creep|🐌|It happens over geologic time.|rupture,rebound",
    "Maxwell time equals viscosity divided by the...|shear modulus|➗|It measures stiffness against shearing.|density,heat flow",
    "Higher temperature makes rock viscosity...|lower|🌡️|Hot rock flows more easily.|higher,unchanged"
  ], "Decide whether the rock springs back, flows or breaks."));
  a.push(L("Glacial isostatic adjustment", [
    "Pushed down, then rebounding|🏔️|A thick ice sheet pushes the lithosphere down and the mantle flows sideways. When the ice melts, the land slowly rises back up. This is <b>post-glacial rebound</b>.",
    "Slow because of viscosity|⏳|Rebound takes thousands of years because the mantle is so viscous. Northern Sweden and Hudson Bay still rise by up to about 1 cm per year. A ring around the ice sheet, the <b>peripheral bulge</b>, sinks as the mantle flows back.",
    "Clues|🔍|Raised beaches high above today's sea show how much land has risen. Scientists use rebound rates to estimate mantle viscosity."
  ], [
    "After an ice sheet melts, the land slowly rises. This is post-glacial...|rebound|⬆️|The crust bounces back.|erosion,subsidence",
    "Under a heavy ice sheet the lithosphere is pushed...|down|⬇️|Weight pushes on the crust.|up,sideways only",
    "The ring around an ice sheet that bulges up and later sinks is the peripheral...|bulge|⭕|Think of a dent that makes a rim.|plateau,trough",
    "Land is rebounding today in...|Scandinavia and Hudson Bay|🇨🇦|Both were once under thick ice.|Sahara and Arabia,Hawaii and Fiji",
    "Peak uplift rates in northern Europe are about...|1 cm per year|📏|A centimeter per year is fast for geology but slow for us.|1 m per year,1 mm per century",
    "Rebound is slow because the mantle has very high...|viscosity|🍯|It resists flowing.|conductivity,magnetism",
    "Raised beaches far above today's sea are evidence of...|land uplift|🏖️|The shore has been lifted.|ocean cooling,tsunamis",
    "Rebound rates help scientists estimate mantle...|viscosity|🔬|It controls how fast the mantle flows back.|salinity,albedo"
  ], "Think of pressing a sponge and slowly letting go."));
  a.push(L("Radiative forcing", [
    "A change in energy balance|⚖️|<b>Radiative forcing</b> is a change in energy flow into the climate system, in watts per square meter (W/m²). Positive forcing warms; negative forcing cools.",
    "The log law for CO₂|📈|CO₂ forcing is about ΔF = 5.35 × ln(C/C₀). Doubling CO₂ gives about 3.7 W/m². Each doubling gives the same forcing, because the effect grows with the <b>logarithm</b> of concentration.",
    "From forcing to warming|🌡️|Equilibrium warming ΔT = λ × ΔF, where λ is the climate sensitivity parameter in K per W/m². With λ = 0.8 and ΔF = 3, ΔT = 2.4 K. Human-caused forcing since 1750 is about 2.7 W/m²."
  ], [
    "Radiative forcing is measured in...|watts per square meter|⚡|It is a power per area.|joules per kilogram,degrees Celsius",
    "A positive forcing tends to...|warm the planet|🌡️|It adds energy.|cool the planet,have no effect",
    "Doubling CO₂ gives a forcing of about...|3.7 W/m²|✖️|A few watts per square meter.|37 W/m²,0.37 W/m²",
    "CO₂ forcing rises with the ___ of concentration.|logarithm|📈|Each doubling adds the same amount.|square,reciprocal",
    "If λ = 0.8 K per W/m² and ΔF = 3 W/m², warming in K is...|2.4|🧮|Multiply λ by ΔF.|3.8,0.27",
    "If λ = 0.5 K per W/m² and ΔF = 4 W/m², warming in K is...|2|🧮|Multiply λ by ΔF.|8,0.125",
    "Volcanic sulfate aerosols give a...|negative forcing|🌋|They reflect sunlight.|positive forcing,zero forcing",
    "Net human-caused forcing since 1750 is about...|2.7 W/m²|🏭|A few watts per square meter.|27 W/m²,0.27 W/m²"
  ], "Link watts per square meter to warming or cooling."));
  a.push(L("Water vapor and lapse-rate feedbacks", [
    "Water vapor feedback|💧|Warmer air holds about 7% more water vapor per °C. Water vapor is a greenhouse gas, so more of it warms more. This is a <b>positive feedback</b>. Vapor stays in the air only about 9 days, so it responds to temperature rather than driving it.",
    "Planck response|🔥|A warmer surface radiates more heat to space. This is the <b>Planck response</b>, a strong <b>negative feedback</b> that limits warming.",
    "Lapse-rate feedback|📉|In the tropics the upper troposphere warms more than the surface and radiates more to space. This <b>lapse-rate feedback</b> is negative there. Clouds are the largest uncertainty."
  ], [
    "Warmer air holds about ___ more water vapor per degree Celsius.|7%|💧|It is a small percentage per degree.|70%,0.7%",
    "The water vapor feedback is...|positive|➕|It amplifies warming.|negative,neutral",
    "The Planck response (a warmer surface radiates more) is a ___ feedback.|negative|➖|It pushes back against warming.|positive,runaway",
    "A feedback that amplifies an initial change is called a...|positive feedback|🔁|Positive here means reinforcing.|negative feedback,forcing only",
    "Water vapor mostly responds to...|temperature|🌡️|It stays up only a short time.|volcanoes,sunspots",
    "Water vapor stays in the air for about...|9 days|⏳|Much shorter than CO₂.|9 years,9 centuries",
    "In the tropics the lapse-rate feedback is mostly...|negative|📉|The upper troposphere radiates a lot of heat.|positive,absent",
    "The most uncertain climate feedback is from...|clouds|☁️|They both cool and warm.|ozone,rivers"
  ], "Decide if the process amplifies or cancels the first change."));
  a.push(L("Ocean heat uptake and thermal expansion", [
    "The ocean as a heat sponge|🌊|The ocean has taken up about 90% of the extra heat trapped by greenhouse gases. Water has a large heat capacity, so the ocean warms slowly.",
    "Thermal expansion|📏|Warm water expands. Rise in height ≈ α × ΔT × layer depth, where α is about 2 × 10⁻⁴ per K. For 1000 m warming by 1 K: 0.0002 × 1 × 1000 = 0.2 m, or 20 cm.",
    "Measuring and the future|🔬|Argo floats measure temperature and salinity down to 2000 m. Heat stored in the deep ocean means warming and sea-level rise continue after emissions stop."
  ], [
    "The ocean takes up about ___ of the extra heat trapped by greenhouse gases.|90%|🌊|Nearly all of it.|10%,50%",
    "Warm water expands, causing...|thermal expansion|📏|Heat makes molecules take more room.|isostasy,upwelling",
    "Thermal expansion per degree is larger in...|warm water|🌴|It is bigger in the tropics.|cold water,fresh water only",
    "A 1000 m layer warms 1 K and α = 2 × 10⁻⁴ per K. The rise in cm is...|20|🧮|Multiply α, ΔT and depth, then convert meters to cm.|2,200",
    "A 500 m layer warms 0.4 K and α = 2 × 10⁻⁴ per K. The rise in cm is...|4|🧮|Multiply α, ΔT and depth, then convert meters to cm.|40,0.4",
    "A 3000 m layer warms 0.2 K and α = 2 × 10⁻⁴ per K. The rise in cm is...|12|🧮|Multiply α, ΔT and depth, then convert meters to cm.|120,1.2",
    "Argo floats measure ocean temperature and...|salinity|🛟|They also measure how salty it is.|ozone,earthquakes",
    "Ocean heat content is measured in...|joules|⚡|A unit of energy.|newtons,pascals"
  ], "Think of the ocean as a huge slow heat store."));
  a.push(L("Oxygen isotopes as a thermometer", [
    "Light and heavy water|⚗️|Water with the light isotope ¹⁶O evaporates more easily than water with ¹⁸O. Ice sheets lock up ¹⁶O-rich water, so ocean water gets richer in ¹⁸O during ice ages.",
    "Foraminifera shells|🐚|Tiny sea animals build calcium carbonate shells that record the ¹⁸O in seawater. Scientists report δ¹⁸O in parts per thousand (per mil). Odd marine isotope stages are warm interglacials.",
    "Ice cores|❄️|In polar ice, more negative δ¹⁸O means colder air when the snow fell. These records show cycles of about 100 thousand years."
  ], [
    "Which water evaporates more easily?|water with oxygen-16|⚗️|The lighter molecule moves more easily.|water with oxygen-18,both equally",
    "Ice sheets store water rich in...|oxygen-16|🧊|The lighter isotope.|oxygen-18,carbon-14",
    "During an ice age, ocean water has relatively more...|oxygen-18|🌊|The ice took the light water.|oxygen-16,carbon-14",
    "In polar ice, a more negative δ¹⁸O means...|colder|🥶|Cold air makes snow isotopically lighter.|warmer,saltier",
    "Foraminifera shells are made of...|calcium carbonate|🐚|It is also the mineral in limestone.|iron oxide,quartz",
    "δ¹⁸O is reported in parts per...|thousand|📏|Per mil.|million,hundred",
    "Odd-numbered marine isotope stages are...|warm interglacials|☀️|Stage 1 is today.|ice ages,volcanic periods",
    "Isotope records show major climate cycles of about...|100 thousand years|🔄|Matches an orbital cycle.|1 thousand years,10 million years"
  ], "Light isotopes evaporate first and get trapped in ice."));
  a.push(L("Atmospheric escape", [
    "Can a planet keep its gas?|🚀|A gas escapes if its molecules move faster than the <b>escape velocity</b>, v = √(2GM/R). Earth: 11.2 km/s. Light molecules such as hydrogen move faster at the same temperature, so they escape more easily.",
    "A good rule|📏|A planet keeps a gas for billions of years if its escape velocity is more than about 6 times the typical molecular speed. The Moon (2.4 km/s) cannot hold gas, but cold Titan can hold a thick atmosphere.",
    "Other ways to lose gas|💨|The solar wind can strip air from planets with weak magnetic fields. NASA's MAVEN studies how Mars lost its atmosphere. Doubling the mass raises escape velocity by √2, while a larger radius lowers it."
  ], [
    "Light gases escape more easily because their molecules move...|faster at the same temperature|💨|Lighter things move quicker.|slower at the same temperature,at the same speed",
    "Earth's escape velocity is about...|11.2 km/s|🌍|About 40 000 km/h.|1.1 km/s,112 km/s",
    "The Moon has almost no atmosphere mainly because of its low...|escape velocity|🌙|Gas easily gets away.|day length,orbital tilt",
    "A gas is kept for billions of years if escape velocity exceeds typical molecular speed by a factor of about...|6|📏|A bit more than a handful.|1,2",
    "Mass is 4 times larger with the same radius. Escape velocity is multiplied by...|2|🧮|It depends on the square root of mass.|4,16",
    "Radius is 4 times larger with the same mass. Escape velocity is multiplied by...|0.5|🧮|It depends on one over the square root of radius.|0.25,4",
    "The solar wind can strip atmospheres from planets that lack a strong...|magnetic field|🧲|It shields the upper air.|ring system,moon",
    "Titan keeps a thick atmosphere despite weak gravity because it is very...|cold|🥶|Slow molecules cannot escape.|hot,close to the Sun"
  ], "Compare how fast molecules move with the escape speed."));
  a.push(L("Tidal heating of moons", [
    "Squeezed and stretched|🌋|A moon on an oval orbit is stretched and squeezed as its distance to the planet changes. Friction inside turns this flexing into heat: <b>tidal heating</b>.",
    "Io and friends|🪐|Jupiter's moon Io keeps an oval orbit through resonance with Europa and Ganymede. The result: Io is the most volcanically active body in the Solar System, and tidal heating gives most of its heat.",
    "Ocean worlds|🌊|Europa has a salty ocean under its ice, and Saturn's Enceladus sprays water plumes. Both are heated this way, which makes them targets in the search for life."
  ], [
    "Io is heated mainly by repeated tidal...|flexing|🌋|Squeezing and stretching.|freezing,collisions",
    "Tidal heating is larger when the orbit is more...|eccentric|⭕|It changes the moon's distance more.|circular,tilted",
    "Io's orbit stays slightly oval because of resonance with...|Europa and Ganymede|🪐|Other large moons of its planet.|Saturn and Titan,Mars and Phobos",
    "Io is the most ___ body in the Solar System.|volcanically active|🌋|It has hundreds of eruptions.|cratered,frozen",
    "The main source of Io's internal heat is...|tidal heating|🔥|Not radioactivity.|radioactive decay,sunlight",
    "The moon with a salty ocean beneath ice that Europa Clipper studies is...|Europa|🧊|A moon of Jupiter.|Io,Callisto",
    "The Saturn moon that sprays water plumes is...|Enceladus|⛲|It is small and icy.|Titan,Mimas",
    "Tidal flexing is turned into heat by...|friction inside the moon|♨️|Rubbing inside a squeezed body.|the solar wind,magnetic induction"
  ], "Think of bending a paper clip back and forth until it gets warm."));
  a.push(L("Luminosity, radius and temperature", [
    "The Stefan-Boltzmann law|☀️|A star's luminosity is L = 4πR²σT⁴. In solar units, L = R² × T⁴, where R and T are measured in solar radii and solar temperature.",
    "Try it|🧮|A star with R = 2 and the same temperature as the Sun has L = 2² = 4 solar luminosities. A star with the same size but 2× hotter has L = 2⁴ = 16.",
    "Giants and dwarfs|🔴|A cool red supergiant like Betelgeuse is very luminous because its radius is huge. A white dwarf is hot yet faint because it is tiny."
  ], [
    "A star has R = 2 and the same temperature as the Sun. Its L in solar units is...|4|⭐|Square the radius.|2,8",
    "A star has R = 3 and the same temperature as the Sun. Its L in solar units is...|9|⭐|Square the radius.|6,27",
    "A star has the Sun's radius and 2× its temperature. Its L in solar units is...|16|🔥|Raise 2 to the fourth power.|4,8",
    "A star has R = 2 and 2× the Sun's temperature. Its L in solar units is...|64|🔥|Multiply R squared by T to the fourth.|32,16",
    "A star has R = 10 and the Sun's temperature. Its L in solar units is...|100|🔴|Square the radius.|10,1000",
    "A star has R = 4 and half the Sun's temperature. Its L in solar units is...|1|⭐|Multiply 16 by one sixteenth.|16,4",
    "A cool red supergiant is bright mainly because of its huge...|radius|🔴|Surface area matters.|mass,age",
    "Luminosity depends on temperature to the power of...|four|🔥|A big power.|two,three"
  ], "Use L = R squared times T to the fourth, in solar units."));
  a.push(L("Goldschmidt's element groups", [
    "Rock-lovers and iron-lovers|🧪|Elements have different chemical affinities. <b>Lithophile</b> elements (Si, Al, Mg, Ca, Na, K) bond with oxygen and stay in silicate rock. <b>Siderophile</b> elements (Fe, Ni, Au, Pt) dissolve in metal and sank into the core.",
    "Sulfur and gas|💨|<b>Chalcophile</b> elements (Cu, Zn, Pb) bond with sulfur and form many ore minerals. <b>Atmophile</b> elements (N, noble gases) form gases.",
    "A big result|⚖️|Because gold is siderophile, most of Earth's gold is in the core, and the mantle has very little. Oxygen is the most abundant element in the crust; iron is the most abundant in the whole Earth."
  ], [
    "Elements that bond with oxygen and stay in silicate rock are...|lithophile|🪨|Their name means rock-loving.|siderophile,atmophile",
    "Nickel and gold mostly sank to the core because they are...|siderophile|🧲|Their name means iron-loving.|lithophile,chalcophile",
    "Chalcophile elements prefer to bond with...|sulfur|🟡|They make sulfide ores.|oxygen,hydrogen",
    "Atmophile elements are mostly...|gases|💨|Think nitrogen and noble gases.|metals,salts",
    "Copper in the mineral chalcopyrite is...|chalcophile|🟠|It lives in sulfide ore.|lithophile,atmophile",
    "The mantle has little gold because most went into the...|core|🌍|It followed the iron.|crust,ocean",
    "The most abundant element in Earth's crust by mass is...|oxygen|🪨|Silicate rocks are full of it.|silicon,iron",
    "The most abundant element in the whole Earth by mass is...|iron|🌍|The core holds a lot of it.|oxygen,silicon"
  ], "Ask which partner the element likes: oxygen, iron, sulfur or none."));
  a.push(L("Stable isotopes and fractionation", [
    "Same element, different mass|⚗️|Isotopes of one element have different numbers of neutrons. Stable isotopes do not decay. Processes such as evaporation and photosynthesis favor the lighter isotope, which is called <b>fractionation</b>.",
    "Carbon|🌿|Photosynthesis takes up ¹²C more readily than ¹³C, so plants and organic matter have strongly negative δ¹³C (about −25 per mil). Marine limestone is near zero.",
    "Fossil fuels|🏭|Fossil fuel carbon comes from ancient plants, so burning it makes the atmosphere's CO₂ lighter in δ¹³C. Equilibrium fractionation gets smaller as temperature rises."
  ], [
    "Isotopes of one element differ in number of...|neutrons|⚛️|Protons stay the same.|protons,electron shells",
    "Fractionation is a process that changes...|isotope ratios|⚗️|It sorts light from heavy.|crystal color,rock age only",
    "Plants take up more of the lighter carbon isotope...|carbon-12|🌿|The lighter one.|carbon-13,carbon-14",
    "Organic carbon has a δ¹³C that is...|strongly negative|🌿|It is depleted in ¹³C.|slightly positive,zero",
    "Marine limestone has a δ¹³C near...|zero|🪨|Close to the standard.|minus 25,plus 25",
    "Burning fossil fuels makes the atmosphere's CO₂ δ¹³C...|lighter|🏭|Plant carbon is low in ¹³C.|heavier,unchanged",
    "Equilibrium fractionation gets smaller as temperature...|rises|🌡️|Heat blurs the differences.|falls,becomes negative",
    "Stable isotopes, unlike radioactive ones, do not...|decay|☢️|They last forever.|exist in nature,have neutrons"
  ], "Light isotopes are used up first in biological and physical processes."));
  a.push(L("The water balance equation", [
    "Counting water|💧|For a catchment, <b>P = ET + Q + ΔS</b>. P is precipitation, ET is evapotranspiration, Q is runoff (streamflow) and ΔS is the change in storage. All are often given in mm per year.",
    "An example|🧮|If P = 800, ET = 500 and ΔS = 0, then Q = 800 − 500 = 300 mm. If storage grows, ΔS is positive and less water leaves as runoff.",
    "Runoff ratio|📊|The <b>runoff ratio</b> = Q ÷ P. If P = 800 and Q = 200 the ratio is 0.25. The equation is conservation of mass."
  ], [
    "P = 800, ET = 500 and ΔS = 0 (mm). The runoff Q in mm is...|300|💧|Subtract ET from P.|1300,400",
    "P = 1200, Q = 400 and ΔS = 100 (mm). The ET in mm is...|700|💧|P minus Q minus ΔS.|900,500",
    "P = 600, ET = 450 and Q = 100 (mm). The storage change in mm is...|50|💧|P minus ET minus Q.|150,1150",
    "P = 900, ET = 500 and ΔS = 0 (mm). The runoff Q in mm is...|400|💧|Subtract ET from P.|1400,300",
    "P = 1500, ET = 900 and Q = 500 (mm). The storage change in mm is...|100|💧|P minus ET minus Q.|400,2900",
    "P = 700, Q = 150 and ΔS = 0 (mm). The ET in mm is...|550|💧|P minus Q.|850,150",
    "The runoff ratio Q ÷ P when P = 800 and Q = 200 is...|0.25|📊|Divide runoff by rainfall.|4,0.5",
    "The water balance equation expresses conservation of...|mass|⚖️|Water cannot disappear.|momentum,charge"
  ], "Water in equals water out plus the change in storage."));
  a.push(L("Infiltration and runoff", [
    "Water enters the soil|🌧️|<b>Infiltration</b> is water soaking into soil. The <b>infiltration capacity</b> is highest at the start of a storm and then falls to a steady rate.",
    "Two ways to make runoff|🌊|<b>Infiltration-excess</b> (Hortonian) flow happens when rain falls faster than the soil can take it. <b>Saturation-excess</b> flow happens when the soil is full. Excess rate = rainfall rate − infiltration rate.",
    "Land cover|🏙️|Compacted or paved surfaces make fast, large runoff. Forest floors with litter and roots let water soak in."
  ], [
    "During a storm, infiltration capacity usually...|decreases then levels off|📉|The soil fills up.|increases steadily,stays at zero",
    "Overland flow because rain is faster than the soil can absorb is...|infiltration-excess|🌧️|Also called Hortonian.|saturation-excess,baseflow",
    "Runoff because the soil is already full is...|saturation-excess|💦|The soil cannot take more.|infiltration-excess,evaporation",
    "Rain is 40 mm/h and infiltration is 15 mm/h. Excess runoff in mm/h is...|25|🧮|Subtract.|55,15",
    "Rain is 55 mm/h and infiltration is 20 mm/h. Excess runoff in mm/h is...|35|🧮|Subtract.|75,20",
    "Rain is 10 mm/h and infiltration capacity is 15 mm/h. Excess runoff in mm/h is...|0|🧮|The soil can take it all.|5,25",
    "Paving a catchment makes peak flows...|bigger and earlier|🏙️|Water cannot soak in.|smaller and later,unchanged",
    "Which surface usually has the highest infiltration capacity?|forest soil with leaf litter|🌲|Roots and litter open the soil.|bare compacted soil,a parking lot"
  ], "Compare how fast it rains with how fast the soil can drink."));
  a.push(L("Evapotranspiration", [
    "Two sources of vapor|🌿|<b>Evapotranspiration (ET)</b> = evaporation from soil and water + <b>transpiration</b> from plants through their stomata. About 60% of land rainfall returns to the air this way.",
    "What controls it|☀️|ET needs energy (latent heat), dry air (a high vapor pressure deficit), wind and available water. <b>Potential ET</b> is what would evaporate if water were unlimited; <b>actual ET</b> is lower in dry places.",
    "Cooling|❄️|Evaporation takes heat from the surface, so wet vegetation cools the air. In drought, plants close stomata and ET falls."
  ], [
    "Water lost by plants through their stomata is...|transpiration|🌿|Plants breathe out water.|infiltration,condensation",
    "Evapotranspiration is evaporation plus...|transpiration|➕|The plant part.|precipitation,runoff",
    "Potential ET is the evaporation if water supply were...|unlimited|♾️|Imagine a soaking-wet surface.|zero,frozen",
    "In a desert, actual ET is much ___ potential ET.|lower than|🏜️|There is little water to evaporate.|higher than,equal to",
    "Evaporating water requires energy called...|latent heat|♨️|It is hidden heat.|sensible heat,kinetic spin",
    "A depth of 1 mm of water over 1 m² is...|1 liter|🥛|A tiny block 1 m by 1 m by 1 mm.|10 liters,1 milliliter",
    "Drier air (higher vapor pressure deficit) makes ET...|increase|💨|Dry air pulls water out.|decrease,stop",
    "About ___ of land rainfall returns to the air through ET.|60%|🌍|More than half.|6%,100%"
  ], "Think energy, dry air and water supply."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[11], a[12], a[13], a[14], a[15], a[16]]));
  a.push(MIX("Level 28 Challenge", [a[0], a[1], a[2], a[3], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[4]]));

  // ================= LEVEL 29 =================
  const b = [];
  b.push(L("Elastic moduli and seismic speeds", [
    "Speed from stiffness|🌊|Seismic speeds depend on stiffness and density. S-wave speed is Vs = √(μ/ρ), where μ is the shear modulus. P-wave speed is Vp = √((K + 4μ/3)/ρ), where K is the bulk modulus.",
    "A worked case|🧮|If μ = 36 GPa and ρ = 4000 kg/m³, then Vs = √(36 × 10⁹ ÷ 4000) = √(9 × 10⁶) = 3000 m/s. Rearranged, μ = ρ × Vs².",
    "Liquids|💧|Liquids cannot be sheared, so μ = 0 and Vs = 0. That is why S waves cannot pass through the liquid outer core. In ordinary rock, Vp/Vs is about 1.73."
  ], [
    "S-wave speed is the square root of the shear modulus divided by the...|density|🌊|Heavier rock slows the waves.|pressure,viscosity",
    "μ = 80 GPa and ρ = 5000 kg/m³. Vs in m/s is...|4000|🧮|Compute μ ÷ ρ, then take the square root.|16000,2000",
    "μ = 20 GPa and ρ = 5000 kg/m³. Vs in m/s is...|2000|🧮|Compute μ ÷ ρ, then take the square root.|4000,1000",
    "Vs = 3000 m/s and ρ = 3000 kg/m³. The shear modulus in GPa is...|27|🧮|μ = ρ × Vs².|9,270",
    "Vs = 4000 m/s and ρ = 3500 kg/m³. The shear modulus in GPa is...|56|🧮|μ = ρ × Vs².|14,560",
    "K = 50 GPa, μ = 30 GPa and ρ = 2500 kg/m³ give Vp (m/s) of...|6000|🧮|Use K plus four thirds of μ, divide by ρ, then square root.|3600,12000",
    "S waves cannot pass through liquid because its shear modulus is...|zero|💧|Liquids cannot resist shearing.|infinite,negative",
    "In ordinary rock, Vp/Vs is about...|1.73|➗|About the square root of three.|0.58,3"
  ], "Speed depends on stiffness divided by density."));
  b.push(L("Plate motion on a sphere", [
    "Rotation about a pole|🌐|Euler showed that any plate motion on a sphere is a rotation about an axis. Where the axis meets the surface is the <b>Euler pole</b>.",
    "Speed formula|📐|Speed depends on angular distance θ from the pole: v ≈ 111 × ω × sin θ mm/yr, where ω is in degrees per million years. It is zero at the pole and greatest 90° away.",
    "Transform faults|↔️|Transform faults follow small circles around the Euler pole, which is how scientists find poles from the seafloor."
  ], [
    "Every plate motion on a sphere is a rotation about an...|Euler pole|🌐|A fixed point on the surface.|equator,subduction axis",
    "The plate speed at the Euler pole itself is...|zero|⭕|A spinning top barely moves at its axis.|maximum,half the maximum",
    "The speed is greatest at an angular distance of ___ from the pole.|90°|📐|Where sin θ is largest.|0°,45°",
    "ω = 0.3 °/Myr and θ = 90°. Speed in mm/yr is about...|33|🧮|111 × ω × sin θ.|3,333",
    "ω = 0.8 °/Myr and θ = 30°. Speed in mm/yr is about...|44|🧮|sin 30° = 0.5.|89,22",
    "ω = 1 °/Myr and θ = 90°. Speed in mm/yr is about...|111|🧮|Almost one degree of arc per million years.|11,1110",
    "ω = 0.2 °/Myr and θ = 90°. Speed in mm/yr is about...|22|🧮|111 × ω × sin θ.|2,222",
    "Transform faults lie along...|small circles around the pole|⭕|Their direction shows the motion.|great circles through the pole,straight latitude lines"
  ], "Speed grows as you move away from the pole, up to 90 degrees."));
  b.push(L("Thermal subsidence of the seafloor", [
    "Cooling and sinking|🌊|New ocean floor forms hot and buoyant at the ridge crest, about 2500 m deep. As it ages it cools, contracts and becomes denser, so it sinks.",
    "A square-root rule|📏|For ages under about 70 million years, depth d ≈ 2500 + 350√t meters, where t is the age in Myr. For t = 4 Myr: 2500 + 350 × 2 = 3200 m.",
    "Old seafloor flattens|🛌|The lithosphere thickens as √t. Beyond roughly 70 Myr the floor is flat and deep. The ridge height reflects age, not depth of the magma."
  ], [
    "Seafloor deepens as it ages because it...|cools and contracts|🧊|Cold rock is denser.|heats up,melts",
    "At the ridge crest the seafloor is about ___ deep.|2500 m|🏔️|Fairly shallow for the ocean.|250 m,6000 m",
    "Using d = 2500 + 350√t, the depth at t = 4 Myr is...|3200|🧮|√4 is 2.|2850,4700",
    "Using d = 2500 + 350√t, the depth at t = 16 Myr is...|3900|🧮|√16 is 4.|3200,6100",
    "Using d = 2500 + 350√t, the depth at t = 25 Myr is...|4250|🧮|√25 is 5.|3500,5750",
    "Using d = 2500 + 350√t, the depth at t = 36 Myr is...|4600|🧮|√36 is 6.|3750,7100",
    "Using d = 2500 + 350√t, the depth at t = 1 Myr is...|2850|🧮|√1 is 1.|3500,2500",
    "After about 70 million years the seafloor depth...|levels off|➖|The cooling slows down.|doubles,shoals sharply"
  ], "Plug the age into the square-root rule."));
  b.push(L("Lithospheric flexure", [
    "Bending like a plank|📚|A heavy load on the lithosphere bends it, like a weight on a diving board. The strength is called <b>flexural rigidity</b>. A strong plate spreads the load over a wide area.",
    "Moats and bulges|🏝️|The weight of the Hawaiian volcanoes bends the plate into a deep <b>moat</b> around the islands, with a low bulge farther out. At trenches, the bending plate forms the <b>outer rise</b>.",
    "Basins|🏔️|The weight of a mountain range pushes the crust down, making a <b>foreland basin</b> in front. The Ganges plain in front of the Himalaya is one."
  ], [
    "Bending of the lithosphere under a load is called...|flexure|📚|Think of a bending plank.|faulting,erosion",
    "The strength of a plate against bending is its flexural...|rigidity|💪|Stiff plates bend less.|gravity,porosity",
    "A basin that forms in front of a growing mountain belt is a...|foreland basin|🏔️|It lies on the forward side.|rift basin,crater",
    "The weight of Hawaii bends the plate into a surrounding...|moat|🏝️|A ring-shaped depression.|ridge,plateau",
    "A strong, stiff lithosphere spreads a load over a ___ area.|wide|↔️|Think of a thick plank.|narrow,tiny",
    "A low bulge on the seaward side of a trench is the...|outer rise|〰️|It is bent upward before it dives.|forearc,accretionary wedge",
    "A plain in front of the Himalaya in a foreland basin is the...|Ganges plain|🏞️|A big river plain in India.|Sahara plateau,Amazon rise",
    "Lithosphere that is hotter is generally...|weaker|🌡️|It bends more easily.|stronger,magnetic"
  ], "Picture pressing on a springy board and look at the dip and bulge."));
  b.push(L("Magnetic reversals and drift", [
    "Poles can swap|🧭|The geomagnetic field flips polarity at irregular intervals, on average a few times per million years. A flip takes a few thousand years. The last full reversal was about 780 000 years ago.",
    "Superchrons|⏳|The Cretaceous Normal Superchron (about 120 to 83 million years ago) had no reversals for about 37 million years. Polarity patterns in seafloor and lava flows give a polarity timescale used for dating.",
    "Changes today|📉|The north magnetic pole drifts by tens of km per year. The field has weakened by about 10% since 1840, and a weak patch, the South Atlantic Anomaly, is growing. This is <b>secular variation</b>, not a reversal."
  ], [
    "On average the field reverses a few times per...|million years|🧭|A very long time.|decade,thousand years",
    "A reversal takes about...|a few thousand years|⏳|Quick for geology, slow for us.|a few seconds,a few billion years",
    "The last full reversal was about...|780 000 years ago|📅|Named for Brunhes and Matuyama.|7 800 years ago,78 million years ago",
    "A long time with no reversals is called a...|superchron|🧲|It is a super-long chron.|supercell,supernova",
    "The Cretaceous Normal Superchron lasted about...|37 million years|⏳|Several tens of millions of years.|37 thousand years,370 million years",
    "Reversal patterns in seafloor rocks are used as a...|polarity timescale|📏|A clock built from stripes.|temperature scale,wind scale",
    "Slow, short-term changes in the field are called secular...|variation|📉|Not a flip.|reversal,eruption",
    "A weak part of the field over the south Atlantic is the...|South Atlantic Anomaly|🌍|It is growing slowly.|Pacific Gap,Indian Rift"
  ], "Separate full flips from slow wandering of the field."));
  b.push(L("Optical depth and Beer-Lambert law", [
    "Fading light|🔦|When light or infrared passes through a gas, a fraction is absorbed. The <b>Beer-Lambert law</b> says transmitted light I = I₀ × e<sup>−τ</sup>, where <b>τ</b> (optical depth) is a pure number.",
    "Some values|🧮|τ = 0 transmits 100%. τ = 1 transmits about 37%. τ = 2 transmits about 14%. τ = 3 transmits about 5%. About half is transmitted when τ ≈ 0.69.",
    "Climate meaning|🌍|More absorbing gas or a longer path increases τ. For infrared, the effective emission level is where τ ≈ 1 looking down from space. Adding greenhouse gas raises that level into colder air, so less heat leaves."
  ], [
    "Optical depth is a number with...|no units|🔢|It is a pure number.|units of watts,units of meters",
    "With τ = 0, the fraction of light transmitted is...|100%|🔦|Nothing absorbs it.|37%,0%",
    "With τ = 1, the fraction transmitted is about...|37%|🔦|It equals 1 divided by e.|63%,50%",
    "With τ = 2, the fraction transmitted is about...|14%|🔦|Square the τ = 1 fraction.|37%,86%",
    "With τ = 3, the fraction transmitted is about...|5%|🔦|Cube the τ = 1 fraction.|14%,95%",
    "More absorbing gas or a longer path makes τ...|larger|📈|More chances to absorb.|smaller,zero",
    "Adding greenhouse gas moves the emission level to ___ air.|colder|⬆️|Higher means colder in the troposphere.|warmer,denser",
    "The level seen from space where τ ≈ 1 is the effective...|emission level|🛰️|Where infrared escapes.|reflection level,freezing level"
  ], "The e to the minus tau fraction gets smaller as tau grows."));
  b.push(L("The Hadley cell and angular momentum", [
    "A thermally direct cell|🌴|Air rises near the equator, moves poleward aloft, sinks near 30° latitude and returns near the surface as the trade winds. The Hadley cell is driven by heating.",
    "Spin and speed|🌀|As air moves poleward it keeps its <b>angular momentum</b>, but it gets closer to Earth's axis, so it speeds up eastward. That creates the subtropical jet near 30°.",
    "Dry belts|🏜️|Sinking air warms and dries, so many deserts sit at 20° to 30° latitude. The trade winds blow from the east and converge at the ITCZ."
  ], [
    "In the Hadley cell, air rises near the...|equator|🌴|It is warm and wet there.|poles,30° latitude",
    "Aloft, the air in a Hadley cell flows toward the...|poles|➡️|Away from the heating.|equator,west",
    "Air in a Hadley cell sinks near about...|30° latitude|⬇️|Subtropics.|0° latitude,90° latitude",
    "Moving poleward while conserving angular momentum makes air gain...|eastward speed|💨|It gets closer to the spin axis.|westward speed,moisture",
    "The jet formed at the Hadley cell edge is the...|subtropical jet|✈️|Near 30°.|polar vortex,low-level jet",
    "Sinking air in the subtropics is dry, so deserts form at about...|20° to 30° latitude|🏜️|Between the tropics and midlatitudes.|0° to 5° latitude,60° to 70° latitude",
    "The surface winds returning toward the equator are the...|trade winds|⛵|They blow from the east.|westerlies,monsoons",
    "The Hadley cell is called thermally direct because it is driven by...|heating|♨️|Warm air rises.|mountains,tides"
  ], "Rise at the equator, go aloft, sink in the subtropics."));
  b.push(L("Tree rings, corals and cave records", [
    "Natural archives|🌳|Proxies are natural records that stand in for thermometers. <b>Tree rings</b> are wide in good growth years and narrow in poor ones. Each ring is one year.",
    "Corals and forams|🪸|Coral skeletons record sea temperature in their Sr/Ca ratio, which falls as water warms. Foraminifera shells record it in Mg/Ca, which rises as water warms.",
    "Cave stalagmites|🕳️|<b>Speleothems</b> (stalagmites) can be dated precisely with uranium-thorium dating. Their δ¹⁸O records rainfall changes, such as monsoon strength. A proxy must be <b>calibrated</b> against modern measurements."
  ], [
    "A natural record that stands in for a thermometer is a...|proxy|🌳|Not a direct measurement.|probe,prism",
    "Each tree ring represents one...|year|🌳|A full growth cycle.|day,decade",
    "Wide tree rings usually mean...|good growth years|📏|Plenty of warmth and water.|poor growth years,volcanic ash",
    "The Sr/Ca ratio in coral ___ as water warms.|falls|🪸|It goes down.|rises,stays fixed",
    "The Mg/Ca ratio in foraminifera ___ as water warms.|rises|🐚|It goes up.|falls,vanishes",
    "Stalagmites in caves are called...|speleothems|🕳️|Cave deposits.|moraines,tephra",
    "Stalagmites can be dated with...|uranium-thorium dating|☢️|A radioactive series.|tree counting,carbon-14 only",
    "Matching a proxy to modern measurements is called...|calibration|📐|Making sure it reads correctly.|erosion,subsidence"
  ], "Each archive records a physical or chemical signal in a layer."));
  b.push(L("Differentiation and planetary interiors", [
    "Heavy sinks|🪐|Early heat from impacts, accretion and radioactivity melted planets. Dense iron sank to form a core and light rock rose. This is <b>differentiation</b>.",
    "Moment of inertia|⚖️|The moment-of-inertia factor C/(MR²) is 0.4 for a uniform sphere. Smaller values mean mass is concentrated toward the center. Earth: 0.33. Mars: 0.365. Moon: 0.393 (small core). Jupiter: 0.254.",
    "Learning the inside|🛰️|Spacecraft measure gravity and spin to find this factor and learn if a world has a core. Ganymede's low value (about 0.31) shows it is well differentiated."
  ], [
    "Heavy iron sinking to form a core is part of...|differentiation|🪐|The planet separates into layers.|accretion only,erosion",
    "The moment-of-inertia factor of a uniform sphere is...|0.4|⚖️|Two fifths.|0.2,1",
    "A value below 0.4 means mass is concentrated toward the...|center|🎯|Dense core.|surface,equator",
    "Earth's factor is about...|0.33|🌍|Quite concentrated.|0.40,0.15",
    "The Moon's factor (0.393) suggests a ___ core.|small|🌙|Nearly uniform.|huge,no",
    "Jupiter's low factor (0.254) shows it is...|strongly centrally condensed|🪐|Dense core and light envelope.|uniform,hollow",
    "Besides impacts, a major early heat source for planets was...|radioactive decay|☢️|Short-lived isotopes such as aluminum-26.|solar flares,ocean tides",
    "Spacecraft find the factor by measuring a planet's gravity field and its...|spin|🔄|Rotation and precession.|ring color,magnetic stripes"
  ], "Smaller factor means more mass packed toward the middle."));
  b.push(L("Venus and the runaway greenhouse", [
    "Earth's twin?|♀️|Venus is similar in size to Earth, but its surface is about 465 °C with 92 bar pressure and an atmosphere that is 96% CO₂. Its sulfuric acid clouds are thick.",
    "Runaway|🔥|If a planet gets too much sunlight, oceans evaporate and the water vapor traps more heat. This <b>runaway greenhouse</b> may have happened on Venus. Sunlight then splits water vapor and hydrogen escapes.",
    "Evidence|🔎|Venus's atmosphere has about 150 times Earth's ratio of heavy hydrogen (D/H), which suggests it lost much water. It has no plate tectonics and was resurfaced by volcanism."
  ], [
    "Venus's surface temperature is about...|465 °C|🔥|Hot enough to melt lead.|46 °C,15 °C",
    "Venus's atmosphere is mostly...|carbon dioxide|☁️|A greenhouse gas.|nitrogen,oxygen",
    "A process where oceans evaporate and trap more heat is the...|runaway greenhouse|🔁|A positive feedback with no stop.|snowball Earth,ice age",
    "Venus's clouds are made mainly of...|sulfuric acid|☁️|Not water.|ammonia,iron dust",
    "A high deuterium-to-hydrogen ratio suggests Venus lost much...|water|💧|Light hydrogen escaped first.|rock,iron",
    "Venus's surface pressure is about...|92 bar|⬇️|Like being nearly a kilometer under the sea.|0.9 bar,9 200 bar",
    "Venus lacks Earth-style...|plate tectonics|🌋|The crust is not recycled that way.|volcanoes,mountains",
    "Hydrogen escapes after sunlight splits water in a process called...|photodissociation|☀️|Light breaking molecules apart.|photosynthesis,precipitation"
  ], "Imagine a planet that loses its oceans to a hot sky."));
  b.push(L("Roche limit and planetary rings", [
    "Pulled apart|💍|Closer to a planet, the difference in its pull from one side of a moon to the other grows. Inside the <b>Roche limit</b>, tides beat the moon's own gravity and a loose body is pulled apart.",
    "The formula|🧮|For a fluid moon, d ≈ 2.44 × R × (ρ_planet ÷ ρ_moon)^(1/3). If the density ratio is 8, the cube root is 2 and d ≈ 2.44 × 2 = 4.9 planet radii.",
    "Rings|🪐|Saturn's bright rings lie inside the Roche limit and are mostly water-ice particles. Small <b>shepherd moons</b> keep ring edges sharp."
  ], [
    "Inside the Roche limit, a loose body is pulled apart by...|tides|🌊|Different pulls on near and far sides.|wind,magnetism",
    "The Roche limit for a fluid moon in planetary radii, with density ratio 8, is about...|4.9|🧮|Cube root of 8 is 2, then multiply by 2.44.|2.4,19.5",
    "With density ratio 27, the Roche limit is about...|7.3|🧮|Cube root of 27 is 3.|2.4,22",
    "With density ratio 64, the Roche limit is about...|9.8|🧮|Cube root of 64 is 4.|2.4,39",
    "With density ratio 1, the Roche limit is about...|2.4|🧮|The cube root of 1 is 1.|1.0,4.9",
    "Saturn's main rings are mostly...|water-ice particles|💍|Bright and icy.|iron spheres,gas clouds",
    "Small moons that keep ring edges sharp are...|shepherd moons|🐑|Named like animal helpers.|trojan moons,rogue moons",
    "Saturn's main rings lie ___ the Roche limit.|inside|⭕|Close to the planet.|outside,far beyond"
  ], "Closer than the limit, tides win over a moon's own gravity."));
  b.push(L("Jeans mass and star formation", [
    "Gravity versus pressure|☁️|A cloud collapses when its gravity beats its pressure. The <b>Jeans mass</b> is the minimum mass to collapse. It grows with temperature (M ∝ T^3/2) and shrinks with density (M ∝ ρ^−1/2).",
    "Cold and dense|🥶|Dense, cold molecular clouds (about 10 K, mostly H₂) collapse most easily. The free-fall time is about 1 ÷ √(Gρ), usually millions of years.",
    "Many stars|⭐|A cloud fragments into many clumps, forming a cluster. Low-mass stars are far more common than high-mass stars. This is described by the initial mass function."
  ], [
    "A cloud collapses when its gravity beats its...|pressure|☁️|Gas pushing outward.|rotation only,age",
    "A colder cloud collapses ___ easily.|more|🥶|Less pressure to fight gravity.|less,no",
    "Making a cloud denser makes it ___ likely to collapse.|more|⬆️|Gravity gets stronger.|less,equally",
    "Temperature is multiplied by 4. The Jeans mass is multiplied by...|8|🧮|Mass goes as T to the 3/2.|2,16",
    "Density is multiplied by 4. The Jeans mass is multiplied by...|0.5|🧮|Mass goes as density to the minus 1/2.|2,0.25",
    "Star-forming molecular clouds are mostly...|hydrogen molecules|⚗️|H₂.|iron dust,water ice only",
    "A cloud that fragments into many clumps forms a star...|cluster|✨|Many stars at once.|ring,mirror",
    "Compared with massive stars, low-mass stars form ___ often.|more|📊|The initial mass function slopes down.|less,never"
  ], "Collapse needs gravity to win: cold, dense and massive clouds."));
  b.push(L("Galaxy rotation curves", [
    "What we expect|🌌|Around a point mass, orbit speed should fall with distance (v ∝ 1/√r), as in the Solar System. Most of a galaxy's visible light is in the center, so we might expect something similar.",
    "What we see|📈|Observed speeds stay flat far out, about 220 km/s in the Milky Way. Enclosed mass M = v²r/G, so a flat curve means mass keeps increasing with radius. Vera Rubin's measurements made this clear.",
    "Dark matter|🕳️|The extra mass is called <b>dark matter</b>. It makes up most of the matter in a galaxy and sits in a huge halo."
  ], [
    "Around a point mass, orbit speed should ___ with distance.|fall|📉|v is proportional to 1 over the square root of r.|rise,stay flat",
    "In real galaxies, rotation speeds far out are about...|flat|➖|They do not fall.|zero,rising fast",
    "The Sun orbits the Milky Way at about...|220 km/s|☀️|Fast, but a lap takes a long time.|22 km/s,2200 km/s",
    "Rotation speed doubles at the same radius. The enclosed mass is multiplied by...|4|🧮|Mass goes with v squared.|2,8",
    "Radius doubles at the same speed. The enclosed mass is multiplied by...|2|🧮|Mass goes with r.|4,1",
    "A flat rotation curve means mass keeps ___ with radius.|increasing|📈|There is more matter far out.|decreasing,vanishing",
    "The unseen mass in galaxy halos is called...|dark matter|🕳️|It does not shine.|dark energy,antimatter",
    "The Sun takes about ___ to orbit the galaxy.|230 million years|⏳|Hundreds of millions of years.|230 thousand years,230 billion years"
  ], "Use M = v squared times r over G."));
  b.push(L("Trace elements and partition coefficients", [
    "Who goes where?|🧪|When rock melts or magma crystallizes, trace elements prefer either the solid or the melt. The <b>partition coefficient</b> D = C(solid) ÷ C(melt).",
    "Incompatible and compatible|⚖️|If D is below 1, the element is <b>incompatible</b> (it stays in the melt): K, Rb, Ba, U, Th and light rare earths. If D is above 1, it is <b>compatible</b> (it goes into crystals): Ni, Cr.",
    "Use it|🧮|C(solid) = D × C(melt). For D = 0.1 and a melt with 100 ppm, solid = 10 ppm. Continental crust is rich in incompatible elements because small melts of the mantle carry them upward."
  ], [
    "The partition coefficient D equals C(solid) divided by C(...)|melt|⚖️|The liquid.|crust,core",
    "An element with D = 0.01 is...|incompatible|🧪|It stays in the liquid.|compatible,radioactive",
    "An element with D = 5 is...|compatible|🧪|It goes into the crystals.|incompatible,volatile",
    "D = 0.1 and the melt has 100 ppm. The solid has ___ ppm.|10|🧮|Multiply D by the melt value.|1000,1",
    "D = 2 and the melt has 30 ppm. The solid has ___ ppm.|60|🧮|Multiply D by the melt value.|15,32",
    "D = 0.05 and the melt has 400 ppm. The solid has ___ ppm.|20|🧮|Multiply D by the melt value.|8000,2",
    "D = 0.2 and the melt has 75 ppm. The solid has ___ ppm.|15|🧮|Multiply D by the melt value.|375,5",
    "Continental crust is enriched in ___ elements.|incompatible|🏔️|Small melts carried them up.|compatible,noble gas"
  ], "Multiply D by the melt concentration to get the solid."));
  b.push(L("Radiogenic isotopes as tracers", [
    "Decay clocks and fingerprints|☢️|Some isotopes are made by decay: ⁸⁷Rb → ⁸⁷Sr (half-life about 49 billion years), ¹⁴⁷Sm → ¹⁴³Nd (about 106 billion years), and U and Th → Pb. Their ratios act as fingerprints of a rock's source.",
    "Crust versus mantle|🪨|Rb is more incompatible than Sr, so crust has high Rb/Sr and over time builds high ⁸⁷Sr/⁸⁶Sr. Mantle has lower values. Old continental crust therefore has high ⁸⁷Sr/⁸⁶Sr.",
    "Seawater|🌊|The ⁸⁷Sr/⁸⁶Sr of seawater tracks how much continental crust is weathered. It rose when the Himalaya were uplifted."
  ], [
    "Rubidium-87 decays to...|strontium-87|☢️|A neighboring element.|neodymium-143,lead-206",
    "Samarium-147 decays to...|neodymium-143|☢️|Rare-earth to rare-earth.|strontium-87,argon-40",
    "The half-life of ⁸⁷Rb is about...|49 billion years|⏳|Much longer than the age of the universe.|49 thousand years,49 million years",
    "Compared with Sr, Rb is more...|incompatible|⚖️|It stays in melts.|compatible,volatile",
    "Old continental crust has ___ ⁸⁷Sr/⁸⁶Sr.|high|🏔️|It has lots of Rb.|low,zero",
    "Mantle-derived rocks have ___ ⁸⁷Sr/⁸⁶Sr compared with old crust.|lower|🔥|Little Rb.|higher,identical",
    "Seawater ⁸⁷Sr/⁸⁶Sr tracks continental...|weathering|🌊|Rivers carry Sr to the sea.|volcano heights,coastlines only",
    "Seawater ⁸⁷Sr/⁸⁶Sr rose when the ___ were uplifted.|Himalaya|🏔️|A huge young range.|Sahara,Amazon"
  ], "Link crust to high Rb/Sr and mantle to low Rb/Sr."));
  b.push(L("Hydraulic head and the water table", [
    "Energy of groundwater|💧|Groundwater flows from high <b>hydraulic head</b> to low. Head h = elevation head z + pressure head p/(ρg). Both are lengths in meters.",
    "Gradient|📏|The <b>hydraulic gradient</b> is Δh ÷ L. If head drops 5 m over 100 m, the gradient is 0.05. The <b>water table</b> is where water pressure equals air pressure.",
    "Confined and pumped|🕳️|In a confined aquifer, wells can be <b>artesian</b> if the head is above the ground. Pumping makes a <b>cone of depression</b> around a well."
  ], [
    "Groundwater flows from ___ hydraulic head to ___ hydraulic head.|high to low|💧|Like water flowing downhill.|low to high,equal to equal",
    "Hydraulic head equals elevation head plus...|pressure head|➕|The water's pressure expressed as a height.|velocity head,heat head",
    "z = 20 m and p/ρg = 15 m. The head in meters is...|35|🧮|Add the two parts.|5,300",
    "z = 50 m and p/ρg = 5 m. The head in meters is...|55|🧮|Add the two parts.|45,250",
    "Head drops 5 m over 100 m. The gradient is...|0.05|📏|Divide drop by distance.|20,0.5",
    "Head drops 15 m over 500 m. The gradient is...|0.03|📏|Divide drop by distance.|33,0.3",
    "Head drops 2 m over 50 m. The gradient is...|0.04|📏|Divide drop by distance.|25,0.4",
    "A well that flows without pumping is called...|artesian|⛲|The head is above ground.|ephemeral,fumarolic"
  ], "Add the elevation head and the pressure head to find hydraulic head."));
  b.push(L("Flood frequency and return periods", [
    "Return period|🌊|A 100-year flood is one with a 1% chance of happening in any year. The <b>return period</b> is T = 1 ÷ p, where p is the annual probability. A 50-year flood has p = 0.02.",
    "Over time|🎲|The chance of at least one such flood in n years is 1 − (1 − p)ⁿ. For the 100-year flood over 30 years: 1 − 0.99³⁰ ≈ 26%. It can happen two years in a row.",
    "Changing odds|🌧️|Flood records may be a poor guide if climate or land use change (called nonstationarity). Paving and warming can make rare floods more likely."
  ], [
    "A 100-year flood has a yearly chance of...|1%|🌊|One in a hundred.|10%,100%",
    "A flood with a 5% yearly chance has a return period (years) of...|20|➗|Divide 1 by the probability.|5,50",
    "A flood with a 25% yearly chance has a return period (years) of...|4|➗|Divide 1 by the probability.|25,2.5",
    "A 200-year flood has a yearly chance of...|0.5%|➗|One over 200.|5%,2%",
    "A 10-year flood has a yearly chance of...|10%|➗|One over ten.|1%,0.1%",
    "The chance of at least one 100-year flood in 30 years is about...|26%|🎲|Not 30 percent, since chances overlap.|3%,63%",
    "A 100-year flood can happen...|two years in a row|🔁|It is only a probability.|only once a century,never twice",
    "When climate or land use change, flood statistics based on the past are said to be...|nonstationary|📈|The rules are moving.|stationary,symmetric"
  ], "Use T equals one over p."));
  b.push(L("Stellar lifetimes", [
    "Burning fuel fast|⏳|A star's fuel is proportional to its mass M, but its luminosity rises as about M³·⁵. So lifetime t ≈ 10 billion years × M⁻²·⁵ (M in solar masses). Massive stars live much shorter lives.",
    "Examples|🧮|A 4-solar-mass star: 4²·⁵ = 32, so t ≈ 10 ÷ 32 ≈ 0.31 billion years (310 million years). A 0.5-solar-mass star lives about 57 billion years, longer than the universe's age.",
    "Why it matters|🌌|Short-lived massive stars explode quickly and enrich space with heavy elements. Long-lived red dwarfs from the first generations are still shining today."
  ], [
    "Compared with the Sun, a massive star lives...|a much shorter time|⏳|It burns fuel very quickly.|a much longer time,exactly as long",
    "The Sun's main-sequence lifetime is about...|10 billion years|☀️|About twice its current age.|10 million years,100 billion years",
    "A 4-solar-mass star lives about...|310 million years|⭐|10 divided by 32.|3.1 billion years,31 million years",
    "A 16-solar-mass star lives about...|10 million years|⭐|Work out 16 to the power 2.5, then divide 10 billion years by it.|100 million years,1 billion years",
    "A 9-solar-mass star lives about...|41 million years|⭐|9 to the power 2.5 is 243.|410 million years,4.1 million years",
    "A 2-solar-mass star lives about...|1.8 billion years|⭐|2 to the power 2.5 is about 5.7.|18 billion years,180 million years",
    "A 0.5-solar-mass star lives about...|57 billion years|🔴|Much longer than the age of the universe.|5.7 billion years,570 million years",
    "Luminosity of main-sequence stars rises with mass roughly as M to the power...|3.5|📈|Steeper than a square.|0.5,1"
  ], "Lifetime is fuel over burn rate, and burn rate rises very fast with mass."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]]));
  b.push(MIX("Level 29 Challenge", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));

  // ================= LEVEL 30 =================
  const c = [];
  c.push(L("Mantle plumes and flood basalts", [
    "Hot columns|🌋|A <b>mantle plume</b> is a hot, buoyant upwelling that may start near the core-mantle boundary. It has a big bulbous head and a thin tail. The tail makes hotspot tracks like Hawaii.",
    "Huge eruptions|🔥|When a plume head reaches the lithosphere it can pour out millions of cubic kilometers of basalt, forming a <b>large igneous province</b> (LIP). Examples: the Siberian Traps (about 252 million years ago), the Deccan Traps (about 66 million years ago) and the Columbia River basalts.",
    "Climate links|🌡️|LIPs release large amounts of CO₂ and SO₂. The Siberian Traps are linked to the end-Permian mass extinction, and the Deccan Traps overlapped the end-Cretaceous extinction."
  ], [
    "A hot, buoyant column rising through the mantle is a...|mantle plume|🌋|It has a head and a tail.|subduction slab,rift valley",
    "The thin tail of a plume makes a...|hotspot track|👣|A chain of volcanoes.|trench,mid-ocean ridge",
    "Huge outpourings of basalt form a large...|igneous province|🪨|Abbreviated LIP.|metamorphic zone,sedimentary basin",
    "The Siberian Traps formed about...|252 million years ago|📅|Near the end of the Permian.|66 million years ago,2 million years ago",
    "The Deccan Traps are in...|India|🇮🇳|A country in South Asia.|Brazil,Iceland",
    "The Siberian Traps are linked to the end-___ extinction.|Permian|🦖|The biggest extinction of all.|Cretaceous,Ordovician",
    "Flood basalts can change climate by releasing CO₂ and...|SO₂|💨|A sulfur gas.|oxygen,helium",
    "Plumes may begin near the...|core-mantle boundary|⬆️|The deepest part of the mantle.|ocean surface,crust base"
  ], "Think of a hot blob rising from deep and breaking the surface."));
  c.push(L("The earthquake cycle and geodesy", [
    "Loading and release|📏|Plates keep moving, but a locked fault sticks. Strain slowly builds (the <b>interseismic</b> period) until the fault slips in an earthquake. This is the <b>elastic rebound</b> cycle.",
    "Measuring strain|🛰️|GPS stations measure plate motion to a millimeter per year. <b>InSAR</b> uses radar from satellites to map ground movement. The <b>slip deficit</b> = slip rate × time since last quake.",
    "A worked case|🧮|A fault slipping 20 mm/yr that last broke 150 years ago has a deficit of 20 × 150 = 3000 mm = 3 m. <b>Slow slip events</b> release strain silently over days to months."
  ], [
    "The slow build-up of strain between earthquakes is the ___ period.|interseismic|⏳|Between quakes.|coseismic,volcanic",
    "Strain stored in rock and then released is called elastic...|rebound|🔄|Like a stretched rubber band snapping back.|erosion,subsidence",
    "Radar from satellites that maps ground movement is...|InSAR|🛰️|Ends with the word radar's synthetic type.|GRACE,Argo",
    "A fault slips 20 mm/yr and last broke 150 years ago. The slip deficit in meters is...|3|🧮|Multiply, then convert millimeters to meters.|30,0.3",
    "A fault slips 35 mm/yr and last broke 200 years ago. The slip deficit in meters is...|7|🧮|Multiply, then convert millimeters to meters.|70,0.7",
    "A fault slips 40 mm/yr and last broke 100 years ago. The slip deficit in meters is...|4|🧮|Multiply, then convert millimeters to meters.|40,0.4",
    "A fault slips 5 mm/yr and last broke 1000 years ago. The slip deficit in meters is...|5|🧮|Multiply, then convert millimeters to meters.|50,0.5",
    "Strain released silently over days to months is a...|slow slip event|🐌|No strong shaking.|aftershock,foreshock"
  ], "Multiply the yearly slip rate by the years since the last quake."));
  c.push(L("Radiogenic heat and Earth's cooling", [
    "Heat from atoms|☢️|Uranium-238 (half-life 4.47 billion years), thorium-232 (14.0 billion years) and potassium-40 (1.25 billion years) heat the Earth as they decay. About 20 of the 47 terawatts leaving Earth are from this.",
    "Cooling history|📉|Earth was hotter in the past because radioactive heat was greater and leftover heat from formation was higher. Heat production at the start was perhaps three to four times today's.",
    "Neutrino detectors|🔬|Radioactive decay emits <b>geoneutrinos</b>. Detectors such as KamLAND and Borexino count them to measure how much radiogenic heat the Earth holds."
  ], [
    "Three main heat-producing radioactive elements are U, Th and...|K|☢️|The symbol for potassium.|Fe,Na",
    "The half-life of ²³⁸U is about...|4.47 billion years|⏳|Close to Earth's age.|4.47 thousand years,447 million years",
    "Radioactive decay supplies about ___ of the 47 TW Earth loses.|20 TW|⚡|Less than half.|5 TW,45 TW",
    "Heat production by radioactivity long ago was ___ today's.|greater than|⏮️|There was more parent isotope.|less than,exactly the same as",
    "Particles used to measure Earth's radiogenic heat are...|geoneutrinos|🔬|Tiny, nearly massless.|electrons,protons",
    "The Earth's heat leftover from formation is called...|primordial heat|🔥|From the beginning.|tidal heat,solar heat",
    "A detector that counts geoneutrinos is...|KamLAND|🏭|Located in Japan.|GRACE,Argo",
    "Over billions of years, the mantle has slowly been...|cooling|🧊|Radioactive heat has declined.|warming,freezing"
  ], "Remember: radioactive heat was higher long ago and has faded."));
  c.push(L("The inner core", [
    "A frozen center|⚪|The inner core is solid iron-nickel alloy with some light elements, with a radius of about 1220 km. It starts at a depth of about 5150 km. The liquid outer core above it is about 2260 km thick.",
    "Growing slowly|🐌|The inner core grows by about 1 mm per year as the core cools, and is perhaps 0.5 to 1 billion years old. Its boundary is about 5000 to 5400 °C, but it stays solid because of enormous pressure.",
    "Strange behavior|🔬|Seismic waves travel faster along Earth's axis than across it. This <b>anisotropy</b> shows iron crystals are aligned. The core-mantle boundary lies at 2890 km depth."
  ], [
    "The inner core's radius is about...|1220 km|⚪|About two thirds of the Moon's radius.|122 km,3480 km",
    "The inner core is made mostly of...|iron and nickel|🔩|Metals.|silicate rock,ice",
    "The inner core stays solid because of its immense...|pressure|⬇️|Squeezing from above.|magnetism,spin",
    "The inner core grows by about...|1 mm per year|🐌|Slower than fingernails.|1 m per year,1 cm per hour",
    "The core-mantle boundary lies at a depth of about...|2890 km|📏|The base of the mantle.|290 km,6370 km",
    "The liquid outer core is about ___ thick.|2260 km|📏|Roughly the width of a continent.|226 km,5000 km",
    "Seismic waves speeds that depend on direction show...|anisotropy|↔️|Aligned crystals.|isostasy,subduction",
    "The inner core is probably about ___ old.|0.5 to 1 billion years|⏳|Much younger than Earth.|10 thousand years,4.5 billion years"
  ], "Picture the core: solid inside, liquid around it."));
  c.push(L("Ice sheet mass balance", [
    "Gain and loss|🧊|An ice sheet gains mass by snowfall (accumulation) and loses it by melting, runoff and iceberg calving (ablation). The net is the <b>mass balance</b>.",
    "Sea level equivalent|🌊|About 362 gigatonnes (Gt) of ice melting raises global sea level by 1 mm. If melting totals 1086 Gt, the rise is 3 mm. Greenland holds enough ice for about 7 m, Antarctica for about 58 m.",
    "Instability|⚠️|The <b>grounding line</b> is where ice starts to float. In some bedrock-below-sea-level regions, retreat can speed up (marine ice sheet instability). Ice streams carry ice quickly to the sea."
  ], [
    "Snowfall adds to an ice sheet. This is called...|accumulation|❄️|Mass gain.|ablation,calving",
    "Loss by melt and calving is called...|ablation|💧|Mass loss.|accumulation,deposition",
    "The net of gain and loss is the...|mass balance|⚖️|Like a bank balance.|geoid,albedo",
    "Melting of 724 Gt of ice raises sea level by about ___ mm.|2|🧮|About 362 Gt per mm.|20,200",
    "Melting of 1810 Gt of ice raises sea level by about ___ mm.|5|🧮|About 362 Gt per mm.|50,0.5",
    "Melting of 3620 Gt of ice raises sea level by about ___ mm.|10|🧮|About 362 Gt per mm.|100,1",
    "Antarctica holds ice worth about ___ of sea level.|58 m|🐧|The biggest ice store.|7 m,580 m",
    "The place where ice starts to float is the...|grounding line|📍|It separates resting and floating ice.|snow line,equilibrium line"
  ], "Gains minus losses give the balance, and 362 Gt is 1 mm."));
  c.push(L("The silicate weathering thermostat", [
    "Rocks remove CO₂|🪨|Rain with dissolved CO₂ is a weak acid. It breaks down silicate minerals, for example CaSiO₃ + 2CO₂ + 3H₂O → Ca²⁺ + 2HCO₃⁻ + H₄SiO₄. CO₂ is removed from the air.",
    "A feedback|🔁|Warmer, wetter climate speeds up weathering, which removes more CO₂ and cools the planet. It is a long-term <b>negative feedback</b> that works over hundreds of thousands to millions of years.",
    "Source and sink|⚖️|Volcanoes emit CO₂, and weathering followed by carbonate formation in the sea removes it. The balance keeps Earth's climate fairly stable over geologic time."
  ], [
    "Rain with dissolved CO₂ is a weak...|acid|🌧️|It dissolves rock slowly.|base,salt",
    "Silicate weathering ___ CO₂ from the atmosphere.|removes|⬇️|It takes it away.|adds,makes",
    "Warmer, wetter climate makes weathering...|faster|🌴|Chemistry speeds up.|slower,stop",
    "The silicate weathering feedback is a ___ feedback.|negative|➖|It brings climate back toward balance.|positive,runaway",
    "It works over about...|hundreds of thousands to millions of years|⏳|Very slow.|minutes to hours,days to weeks",
    "The main natural source of CO₂ to balance weathering is...|volcanic outgassing|🌋|From inside Earth.|photosynthesis,ice melt",
    "The dissolved product ends up in the sea as bicarbonate and then in...|carbonate rocks|🪨|Like limestone.|sandstone only,granite",
    "This feedback helps keep Earth's climate fairly...|stable|⚖️|Not extreme for long.|chaotic,frozen"
  ], "Warmer climate leads to more weathering and less CO₂."));
  c.push(L("The faint young Sun", [
    "A dimmer Sun|☀️|Stars like the Sun slowly brighten as they burn hydrogen. When Earth formed, the Sun was only about 70% as bright as today. Its brightness rises by about 1% every 110 million years.",
    "The paradox|❓|With 70% sunlight, Earth's equilibrium temperature would be about 233 K, so the oceans would freeze. Yet rocks show liquid water 3.5 to 4.4 billion years ago. This is the <b>faint young Sun paradox</b>.",
    "Solutions|🌫️|A stronger greenhouse effect (more CO₂ and methane), less reflective clouds or land, and lower albedo could have kept Earth warm. Equilibrium temperature scales as L^(1/4)."
  ], [
    "When Earth formed, the Sun's brightness was about...|70% of today's|☀️|Dimmer, not brighter.|130% of today's,exactly today's",
    "The Sun's brightness increases by about 1% every...|110 million years|⏳|A slow brightening.|110 years,11 billion years",
    "The puzzle that early Earth was not frozen is the faint young Sun...|paradox|❓|A seeming contradiction.|theorem,constant",
    "With 70% sunlight and no greenhouse effect, Earth's equilibrium temperature would be about...|233 K|🥶|Colder than today's 255 K.|288 K,320 K",
    "Equilibrium temperature scales with luminosity to the power of...|one quarter|🔢|A fourth root.|one half,two",
    "Rocks show liquid water on Earth as early as...|4.4 billion years ago|💧|Zircon evidence.|1 billion years ago,100 million years ago",
    "A likely fix for the paradox is a stronger...|greenhouse effect|🌫️|More heat-trapping gas.|ozone hole,tidal friction",
    "Stars like the Sun brighten over time as they convert hydrogen to...|helium|⭐|Fusion in the core.|iron,carbon only"
  ], "Think of a Sun that grows brighter while Earth's air traps more heat."));
  c.push(L("Cloud droplets and aerosol effects", [
    "Making cloud drops|☁️|Water vapor condenses on tiny particles called <b>cloud condensation nuclei</b> (CCN), such as sea salt, dust and sulfate. A cloud droplet is about 10 micrometers (µm) across.",
    "Raindrops|🌧️|A raindrop is about 1 mm (1000 µm) across, so its volume is (1000 ÷ 10)³ = 1 million times that of a cloud droplet. Warm rain forms by collision and coalescence. In cold clouds, ice crystals grow at the expense of supercooled droplets (the <b>Bergeron process</b>).",
    "Brighter clouds|✨|More aerosols create more, smaller droplets, which makes clouds brighter (the <b>Twomey effect</b>). This cools the planet and is one reason aerosol forcing is uncertain."
  ], [
    "Cloud droplets form on tiny particles called cloud condensation...|nuclei|☁️|Like the center of a cell.|ions,drops",
    "A typical cloud droplet is about ___ across.|10 micrometers|🔬|Much smaller than a hair.|10 millimeters,10 meters",
    "A raindrop's volume compared with a cloud droplet is about...|1 million times|🌧️|The ratio of widths is 100, cubed.|1000 times,100 times",
    "Growth of ice crystals at the expense of supercooled droplets is the ___ process.|Bergeron|❄️|Named for a Swedish meteorologist.|Hadley,Coriolis",
    "Warm rain forms by collision and...|coalescence|💧|Drops join together.|sublimation,dilation",
    "More aerosols make clouds with ___ droplets.|more and smaller|✨|Water is shared among more particles.|fewer and larger,the same number",
    "Brighter clouds from more aerosols is the ___ effect.|Twomey|✨|Named after a scientist.|Doppler,Bergeron",
    "Which is a common cloud condensation nucleus?|sea salt|🧂|Spray from the ocean.|pure helium,water vapor itself"
  ], "Count the particles: more nuclei means smaller, brighter drops."));
  c.push(L("Stratospheric winds and sudden warmings", [
    "The QBO|🔄|The <b>quasi-biennial oscillation</b> (QBO) is a pattern in which the tropical stratospheric winds alternate between easterly and westerly with a period of about 28 months.",
    "Polar vortex|🌀|In winter the polar stratosphere has a strong band of westerly wind, the <b>polar vortex</b>. In a <b>sudden stratospheric warming</b>, large planetary waves break it down, and the polar stratosphere warms by 25 K or more within days.",
    "At the surface|🥶|After a warming, the troposphere may see cold outbreaks over mid-latitudes weeks later. The QBO influences how often warmings occur."
  ], [
    "QBO stands for quasi-biennial...|oscillation|🔄|It goes back and forth.|orbit,obliquity",
    "The QBO is a pattern of wind in the tropical...|stratosphere|⬆️|Above the weather layer.|troposphere,mesosphere",
    "The QBO period is about...|28 months|⏳|A little over two years.|28 days,28 years",
    "The strong winter wind band around the pole is the polar...|vortex|🌀|It swirls.|jet stream only,monsoon",
    "A sudden stratospheric warming raises the polar stratosphere by about...|25 K or more|🌡️|Within days.|2.5 K,250 K",
    "Sudden warmings can lead to cold outbreaks in the...|mid-latitudes|🥶|Weeks later.|tropics,deep ocean",
    "Sudden warmings are triggered by large atmospheric...|planetary waves|🌊|Rossby waves breaking upward.|tides,sound waves",
    "In a QBO the winds alternate between easterly and...|westerly|↔️|The opposite direction.|northerly,vertical"
  ], "Think of a winter polar vortex that suddenly gets disrupted."));
  c.push(L("Mars: a wetter past", [
    "Rivers and lakes|🔴|Mars has dry valley networks and deltas, such as the delta in Jezero crater explored by Perseverance. Clay minerals formed in water. This shows water flowed more than 3.5 billion years ago.",
    "Losing the air|💨|Today Mars's air is about 6 millibars, under 1% of Earth's pressure. Mars lost its global magnetic field and its small gravity let the solar wind strip air away. MAVEN measures this loss.",
    "What's left|🧊|Much water is locked in polar ice and ice buried under the surface. The planet is too cold and thin-aired for lasting liquid water."
  ], [
    "Perseverance explores a delta in Mars's...|Jezero crater|🛰️|An ancient lakebed.|Olympus Mons,Valles Marineris",
    "Clay minerals on Mars formed in the presence of...|water|💧|They need wet conditions.|lava only,ice only",
    "Mars's air pressure is about ___ of Earth's.|under 1%|⬇️|Very thin.|about 50%,about 10 times",
    "The mission that measures Mars's atmospheric loss is...|MAVEN|🛰️|It studies the upper air.|Voyager,Cassini",
    "Mars lost much air partly because it lost its global...|magnetic field|🧲|It no longer shielded the upper air.|moons,rings",
    "Much of Mars's remaining water is in...|polar and buried ice|🧊|Frozen.|deep seas,clouds",
    "Dry riverbed-like channels on Mars are called valley...|networks|🏞️|Branching patterns.|volcanoes,craters",
    "Liquid water cannot last on Mars's surface today because it is too cold and the air is too...|thin|🌬️|Low pressure.|thick,wet"
  ], "Mars once had rivers; now it has thin cold air."));
  c.push(L("Titan's methane cycle", [
    "Another water cycle|🪐|Saturn's moon Titan has a nitrogen atmosphere (about 95%) with about 5% methane. Its surface is about 94 K (−179 °C) and the pressure is about 1.5 bar.",
    "Methane rain|🌧️|On Titan, methane plays the role of water: it evaporates, forms clouds, rains and fills lakes and seas such as Kraken Mare. The ground is water ice as hard as rock.",
    "Exploration|🚁|The Huygens probe landed in 2005. Dragonfly, a planned rotorcraft, will fly between sites to study chemistry that may resemble steps toward life."
  ], [
    "Titan's atmosphere is mostly...|nitrogen|☁️|The same main gas as Earth's.|oxygen,helium",
    "On Titan the liquid that rains and fills lakes is mainly...|methane|🌧️|A hydrocarbon.|water,ammonia only",
    "Titan's surface temperature is about...|94 K|🥶|Extremely cold.|294 K,9 K",
    "Titan's surface pressure is about...|1.5 bar|⬇️|A bit more than Earth's.|0.015 bar,150 bar",
    "A large sea on Titan is called...|Kraken Mare|🌊|Named after a sea monster.|Mare Tranquillitatis,Lake Victoria",
    "The probe that landed on Titan in 2005 was...|Huygens|🛰️|A European probe.|Voyager,Pioneer",
    "The planned rotorcraft to fly on Titan is...|Dragonfly|🚁|Named for an insect.|Ingenuity,Spirit",
    "On Titan the ground is hard, made of...|water ice|🧊|Frozen like rock.|iron,sand"
  ], "Think of a cold moon with a methane version of rain."));
  c.push(L("Exoplanet atmospheres by transit", [
    "Shadow depth|🔭|When a planet passes in front of its star, the starlight dims by (Rp ÷ Rs)². If Rp ÷ Rs = 0.1, the depth is 0.01, or 1%.",
    "Light through the air|🌈|During transit, a little starlight passes through the planet's atmosphere. Molecules absorb at certain wavelengths, so the star's spectrum shows <b>absorption features</b> of water, CO₂, methane and more. JWST has detected CO₂ and SO₂ in the hot gas giant WASP-39b.",
    "Scale height|📏|Signals are bigger for hot, puffy, low-density atmospheres. The <b>scale height</b> H = kT/(μ m g) is larger when T is high and gravity is low."
  ], [
    "Transit depth equals (planet radius ÷ star radius) to the power...|2|🔭|Squared.|1,3",
    "If Rp ÷ Rs = 0.1, the transit depth is...|1%|🔭|0.1 squared.|10%,0.1%",
    "If Rp ÷ Rs = 0.05, the transit depth is...|0.25%|🔭|Square the ratio.|5%,2.5%",
    "If Rp ÷ Rs = 0.2, the transit depth is...|4%|🔭|Square the ratio.|40%,2%",
    "If Rp ÷ Rs = 0.01, the transit depth is...|0.01%|🔭|Square the ratio.|1%,0.1%",
    "Molecules in a planet's air leave marks in the star's...|spectrum|🌈|Absorption lines.|magnetic field,age",
    "A telescope that has detected CO₂ in WASP-39b's air is...|JWST|🔭|A space telescope.|Voyager 1,Arecibo",
    "Atmospheric signals are bigger when the scale height is...|larger|📏|Taller atmosphere, bigger signal.|smaller,zero"
  ], "Square the radius ratio for depth. Molecules absorb special colors."));
  c.push(L("Accretion and the Eddington limit", [
    "Falling matter shines|💫|When gas falls toward a black hole or star, it heats up and glows. Accretion luminosity is L = η × ṁ × c². Hydrogen fusion has η ≈ 0.007, while a black hole disk can reach 0.1 or more.",
    "A brightness limit|🚧|The <b>Eddington luminosity</b> is where radiation pressure outward balances gravity inward: L_Edd ≈ 32 000 × (M ÷ M☉) × L☉.",
    "Examples|🧮|For a 10-solar-mass black hole, L_Edd ≈ 320 000 solar luminosities. For 100 solar masses, 3 200 000. Quasars are fed by accretion onto supermassive black holes."
  ], [
    "Gas falling onto a black hole glows because it is...|heated|🔥|Compressed and rubbed.|cooled,frozen",
    "Accretion luminosity is L = η × ṁ × c², where c is the speed of...|light|💡|The cosmic speed limit.|sound,wind",
    "A black hole disk can convert up to about ___ of mass to energy.|10% or more|⚡|Far better than fusion.|0.0001%,0.1%",
    "Hydrogen fusion converts about ___ of mass to energy.|0.7%|☀️|A small fraction.|10%,70%",
    "The Eddington limit is reached when ___ balances gravity.|radiation pressure|💡|Light pushing matter out.|magnetic force,tide",
    "A black hole of 10 solar masses has L_Edd (in L☉) of about...|320000|🧮|Multiply 32 000 by the mass in suns.|3200,32000",
    "A black hole of 100 solar masses has L_Edd (in L☉) of about...|3200000|🧮|Multiply 32 000 by the mass in suns.|320000,32000",
    "Quasars are powered by accretion onto...|supermassive black holes|🌌|At galaxy centers.|white dwarfs,comets"
  ], "Use 32 000 times the mass in solar masses."));
  c.push(L("The age of the universe", [
    "Running the clock back|⏪|If the universe expanded at a constant speed, its age would be the <b>Hubble time</b> 1 ÷ H₀ ≈ 978 ÷ H₀ billion years, with H₀ in km/s/Mpc. For H₀ = 70, age ≈ 14 billion years.",
    "The real age|📅|Measurements of the cosmic microwave background (now at 2.7 K) and other data give 13.8 billion years. The expansion first slowed and then sped up because of dark energy, so the Hubble time is only close.",
    "Checks|✅|No star can be older than the universe. The oldest globular cluster stars are about 12 to 13 billion years old, consistent with 13.8."
  ], [
    "The Hubble time is 1 divided by the...|Hubble constant|⏪|H₀.|solar constant,speed of light",
    "H₀ = 70 km/s/Mpc gives an age near ___ billion years.|14|🧮|Divide 978 by 70.|7,28",
    "H₀ = 100 km/s/Mpc gives an age near ___ billion years.|10|🧮|Divide 978 by 100.|1,100",
    "H₀ = 50 km/s/Mpc gives an age near ___ billion years.|20|🧮|Divide 978 by 50.|5,50",
    "H₀ = 65 km/s/Mpc gives an age near ___ billion years.|15|🧮|Divide 978 by 65.|6,65",
    "The best current age of the universe is about...|13.8 billion years|🌌|From the microwave background.|4.5 billion years,138 billion years",
    "The cosmic microwave background has a temperature of about...|2.7 K|🌡️|Barely above absolute zero.|270 K,27 K",
    "The oldest stars must be ___ the universe's age.|younger than|⭐|They cannot be older.|older than,twice"
  ], "Divide 978 by H₀ to get billions of years."));
  c.push(L("Saturation index and solubility", [
    "Will it dissolve?|🧪|Water is <b>saturated</b> with a mineral when the ion activity product (IAP) equals the solubility product (Ksp). The saturation index is SI = log₁₀(IAP ÷ Ksp).",
    "Reading SI|🔎|SI = 0 means equilibrium. SI above 0 means supersaturated, so the mineral can precipitate. SI below 0 means undersaturated, so it can dissolve. If IAP = 1000 × Ksp, SI = 3.",
    "Calcite and acid|🕳️|Acidic water (more CO₂) dissolves calcite, forming caves. Evaporation or CO₂ loss makes calcite precipitate, forming stalactites and travertine."
  ], [
    "The saturation index is SI = log₁₀ of IAP divided by...|Ksp|🧪|The solubility product.|pH,density",
    "When SI = 0, the water is...|at equilibrium|⚖️|Neither dissolving nor growing.|undersaturated,supersaturated",
    "When SI is above 0, the mineral can...|precipitate|⬆️|The solution is oversupplied.|dissolve,melt",
    "If IAP = 1000 × Ksp, SI equals...|3|🧮|log₁₀ 1000.|1000,30",
    "If IAP = 10 × Ksp, SI equals...|1|🧮|log₁₀ 10.|10,0.1",
    "If IAP = 100 × Ksp, SI equals...|2|🧮|log₁₀ 100.|100,20",
    "Acidic, CO₂-rich water tends to ___ calcite.|dissolve|🕳️|It carves caves.|precipitate,melt",
    "Loss of CO₂ from cave water makes calcite...|precipitate|🪨|It forms stalactites.|dissolve,vanish"
  ], "Take the base-10 log of the ratio IAP to Ksp."));
  c.push(L("Noble gases and the mantle", [
    "Two helium isotopes|🎈|Helium-3 is mostly primordial, left from Earth's formation. Helium-4 is made continuously by alpha decay of U and Th. So ³He/⁴He tells how much a source has been degassed and mixed.",
    "Ratios|📊|Scientists report R/Ra, where Ra = 1.4 × 10⁻⁶ is the air value. Mid-ocean ridge basalts are about 8 Ra. Hotspots like Iceland and Hawaii reach more than 20 Ra, hinting at a deeper, less-degassed source. Crust is about 0.02 to 0.1 Ra.",
    "Argon|🌫️|Argon-40 comes from the decay of potassium-40 and makes up almost all the 1% argon in air. Helium escapes from the atmosphere to space."
  ], [
    "Helium-3 in the mantle is mostly...|primordial|🎈|Left from the beginning.|made by decay of U,made by plants",
    "Helium-4 is produced by alpha decay of...|U and Th|☢️|Radioactive elements.|N and O,Fe and Ni",
    "R/Ra compares a sample's ³He/⁴He with that of...|air|🌬️|The atmosphere.|seawater,the Sun",
    "Mid-ocean ridge basalts have R/Ra of about...|8|🌊|Moderate.|0.02,80",
    "Hot spots such as Iceland can reach more than...|20 Ra|🌋|Higher than ridges.|2 Ra,0.2 Ra",
    "Continental crust has ___ ³He/⁴He.|very low|🏔️|Lots of radiogenic helium-4.|very high,Earth-like air",
    "Most argon in air is argon-40 made from decay of...|potassium-40|☢️|K.|carbon-14,uranium-235",
    "Helium escapes from the atmosphere to...|space|🚀|It is too light to stay.|the oceans,the crust"
  ], "High helium-3 means a source that has been less degassed."));
  c.push(L("Tracing water with isotopes and chemistry", [
    "Meteoric water line|💧|Rain follows δD = 8 × δ¹⁸O + 10. Rain at higher latitudes and altitudes is isotopically lighter (more negative). Groundwater often keeps the signal of the rain that fed it.",
    "Mixing|🧮|A stream is a mix of rain and groundwater. Fraction from groundwater f = (C_mix − C_rain) ÷ (C_gw − C_rain). With C_rain = 0, C_gw = 40 and C_mix = 10, f = 10 ÷ 40 = 0.25.",
    "Dating young water|⏳|Tritium (³H, half-life 12.3 years) dates water from the last 60 years or so. High radon-222 in a stream shows groundwater is flowing in."
  ], [
    "The half-life of tritium is about...|12.3 years|⏳|A bit over a decade.|123 years,1.2 years",
    "Rain at high altitude has ___ δ¹⁸O.|lower|⛰️|More negative.|higher,identical",
    "The slope of the global meteoric water line is...|8|📐|δD = 8 δ¹⁸O + 10.|2,80",
    "Chloride in rain is 0, in groundwater 40 and in the stream 10. The groundwater fraction is...|0.25|🧮|(Cmix − Crain) ÷ (Cgw − Crain).|0.75,4",
    "Chloride in rain is 2, in groundwater 22 and in the stream 12. The groundwater fraction is...|0.5|🧮|(Cmix − Crain) ÷ (Cgw − Crain).|0.25,2",
    "Chloride in rain is 5, in groundwater 45 and in the stream 35. The groundwater fraction is...|0.75|🧮|(Cmix − Crain) ÷ (Cgw − Crain).|0.25,1.33",
    "High radon-222 in a stream suggests inflow of...|groundwater|🌊|Radon comes from rock.|snowmelt,rain",
    "Tritium is useful for dating water that is...|young|🕒|From recent decades.|billions of years old,very old only"
  ], "Use the mixing formula with the tracer concentrations."));
  c.push(L("Snowpack and snowmelt", [
    "Snow water equivalent|❄️|Snow acts as a natural reservoir. <b>Snow water equivalent (SWE)</b> is the depth of water you would get if it melted: SWE = snow depth × density ÷ 1000 (density in kg/m³). 100 cm at 300 kg/m³ is 30 cm SWE.",
    "Melting|☀️|A simple model: melt = degree-day factor × temperature above 0 °C. With 4 mm per °C per day and 5 °C, melt = 20 mm. Fresh snow reflects 80 to 90% of sunlight; old snow reflects less, so it melts faster.",
    "Floods and supply|🌊|Spring snowmelt supplies rivers in many dry regions. Rain falling on snow can melt it fast and cause floods."
  ], [
    "SWE stands for snow water...|equivalent|❄️|Water depth when melted.|elevation,estimate",
    "Snow depth 50 cm, density 200 kg/m³. The SWE in cm is...|10|🧮|Depth times density divided by 1000.|100,25",
    "Snow depth 200 cm, density 400 kg/m³. The SWE in cm is...|80|🧮|Depth times density divided by 1000.|800,50",
    "Snow depth 80 cm, density 250 kg/m³. The SWE in cm is...|20|🧮|Depth times density divided by 1000.|200,32",
    "Snow depth 120 cm, density 300 kg/m³. The SWE in cm is...|36|🧮|Depth times density divided by 1000.|360,40",
    "A degree-day factor of 4 mm/°C/day and 3 °C gives melt of ___ mm.|12|🧮|Multiply the two numbers.|7,1",
    "A degree-day factor of 5 mm/°C/day and 6 °C gives melt of ___ mm.|30|🧮|Multiply the two numbers.|11,1",
    "Compared with fresh snow, old snow melts faster because it is less...|reflective|✨|It absorbs more sunlight.|salty,cold"
  ], "SWE is depth times density over 1000. Melt is factor times degrees."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[11], c[12], c[13], c[14], c[15], c[16]]));
  c.push(MIX("Level 30 Challenge", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));

  Object.assign(EARTH_LEVELS, { 28: a, 29: b, 30: c });
})();
