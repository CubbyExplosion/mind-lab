// ext/art-25-27.js  Art & Drawing levels 25-27
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // item string: question|answer|wrong1,wrong2|visual   (no commas inside wrong answers)
  const L = (title, slides, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); let rest = p.slice(2), v = ""; if (rest.length > 1 && !/[A-Za-z0-9]/.test(rest[rest.length - 1])) v = rest.pop(); return { q: p[0], a: p[1], w: rest.join(",").split(",").filter(Boolean), v }; });
    const make = () => {
      const it = pick(its);
      let exs = its.filter(x => x.a !== it.a && !nz(x.q + x.a).includes(nz(it.a)));
      if (!exs.length) exs = its.filter(x => x.a !== it.a);
      const ex = pick(exs);
      const na = nz(it.a), leaks = h => na.length > 2 && nz(String(h).replace(/<[^>]+>/g, "")).includes(na);
      let h1 = nudge || "Think back to what you just learned. Read the question slowly.";
      if (leaks(h1)) h1 = "Think back to what you just learned. Read the question slowly.";
      const h2 = `Try to remember the teaching slides. The answer starts with the letter "${it.a[0].toUpperCase()}".`;
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...shuf(it.w).slice(0, 2)]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 25 =================
  const a = [];
  a.push(L("Minoan frescoes at Knossos", [
    "Palace on Crete|🐂|The <b>Minoans</b> lived on the island of Crete in the Bronze Age, about 2000 to 1450 BCE. Their big palace at <b>Knossos</b> was dug up by the archaeologist Arthur Evans, starting in 1900.",
    "Lively wall paintings|🐬|Minoan <b>frescoes</b> show dolphins, flowers and people in graceful, flowing poses. The famous <b>Bull-Leaping fresco</b> shows acrobats jumping over a bull.",
    "Odd columns|🏛️|Minoan columns were painted red and are wider at the <b>top</b> than the bottom, the opposite of Greek columns. Stories of the Minotaur's labyrinth in Greek myth may echo the maze-like palace."
  ], [
    "The Minoans lived on the island of...|Crete|Sicily|Cyprus|🐂",
    "Which palace is the best-known Minoan site?|Knossos|Versailles|Alhambra",
    "Arthur Evans began digging at Knossos in...|1900|1600|1990",
    "The Bull-Leaping fresco shows acrobats jumping over a...|bull|horse|elephant",
    "Minoan columns are unusual because they are wider at the...|top|bottom|middle",
    "Minoan frescoes often show sea life such as...|dolphins|penguins|whales in space",
    "The Minoans belong to the...|Bronze Age|Ice Age|Space Age",
    "Knossos is linked to the Greek myth of the...|Minotaur|Trojan Horse|Golden Fleece"
  ], "Think of a Bronze Age island culture famous for bulls and dolphins."));
  a.push(L("Etruscan art", [
    "Before Rome's rise|🏺|The <b>Etruscans</b> lived in central Italy, in a region now called Tuscany, from about 800 to 100 BCE. They traded with the Greeks and strongly influenced early Rome.",
    "Smiling terracotta|😊|The <b>Sarcophagus of the Spouses</b> (about 520 BCE) is a terracotta coffin showing a couple relaxing at a banquet with gentle smiles. The Etruscans loved lively, warm figures.",
    "Painted tombs|🎶|Etruscan tombs were often painted inside with feasts, music and dancing. They show a culture that enjoyed life, not only mourning."
  ], [
    "The Etruscans lived in central...|Italy|Egypt|India|🏺",
    "The Sarcophagus of the Spouses is made of...|terracotta|ice|gold",
    "The couple on the sarcophagus look...|relaxed and smiling|angry|asleep in bed",
    "Etruscan tomb paintings often show...|feasts and dancing|rocket launches|ski races",
    "Etruscan culture strongly influenced early...|Rome|Peru|Canada",
    "The region of Tuscany is named after the...|Etruscans|Vikings|Normans",
    "The Etruscans flourished about...|800 to 100 BCE|1500 to 1600 CE|20,000 BCE",
    "A sarcophagus is a...|stone or clay coffin|kind of paintbrush|temple roof"
  ], "Think of a culture in Tuscany before Rome ruled it."));
  a.push(L("Roman wall painting at Pompeii", [
    "Preserved by ash|🌋|In 79 CE, Mount Vesuvius buried the city of <b>Pompeii</b> near Naples in ash. The ash sealed the walls, so many painted rooms survived for almost 1,800 years.",
    "Four styles|🖼️|Scholars sort the paintings into four styles. The <b>First Style</b> imitates blocks of colored marble. The <b>Second Style</b> paints open views and columns that seem to extend the room.",
    "Fooling the eye|👀|Painting that tricks you into thinking something is real is called <b>trompe l'oeil</b> (French for \"fools the eye\"). The <b>Third Style</b> is calmer, with delicate small scenes on flat colored panels."
  ], [
    "Pompeii was buried by ash from Mount...|Vesuvius|Etna|Fuji|🌋",
    "Pompeii was buried in...|79 CE|179 BCE|1779 CE",
    "The First Style imitates...|marble blocks|photographs|stained glass",
    "Second Style paintings create illusions of...|3D architecture and open views|only plain white walls|flat stripes",
    "Painting that tricks the eye into seeing real objects is...|trompe l'oeil|batik|collage",
    "Pompeii's paintings survived because they were...|sealed under ash|repainted each year|kept in a freezer",
    "The Third Style has small scenes on flat...|colored panels|3D stages|glass windows",
    "Pompeii is near the modern city of...|Naples|Venice|Paris"
  ], "Think of walls preserved under volcanic ash."));
  a.push(L("Early Christian basilicas", [
    "From law court to church|⛪|In 313 CE the emperor Constantine allowed Christians to worship openly. Churches were built on the plan of the Roman <b>basilica</b>, a large public hall.",
    "The plan|📐|A basilica church is long and rectangular. People enter through the <b>narthex</b> (porch), walk down the <b>nave</b> (central space) between side aisles and reach the <b>apse</b>, a half-circle recess at the end.",
    "Plain outside, rich inside|✨|The outsides were usually plain brick, but the insides glowed with <b>mosaics</b> and gold. Before this, Christians had buried their dead in underground <b>catacombs</b>."
  ], [
    "A basilica was first a Roman...|public hall|volcano|fort|⛪",
    "The central space of a basilica church is the...|nave|apse|crypt",
    "The half-circle recess at the end is the...|apse|narthex|oculus",
    "The entrance porch is the...|narthex|nave|torana",
    "Early Christians buried their dead in underground...|catacombs|ziggurats|stupas",
    "The plan of a basilica is long and...|rectangular|star-shaped|round",
    "Basilica interiors were often decorated with...|mosaics|neon signs|billboards",
    "Which emperor allowed Christians to worship openly in 313 CE?|Constantine|Nero|Hadrian"
  ], "Think of a Roman public hall turned into a church."));
  a.push(L("Ravenna mosaics", [
    "Golden walls|🟡|<b>San Vitale</b> in Ravenna, Italy, was finished in 548 CE. It has an eight-sided (<b>octagonal</b>) plan and walls covered in mosaics of glass and gold.",
    "Emperor and empress|👑|Famous panels show the Byzantine emperor <b>Justinian</b> and the empress <b>Theodora</b> with their courts. The figures stand stiffly, face forward and seem to float.",
    "Glass tesserae|🔷|A mosaic is made of small pieces called <b>tesserae</b>. Gold tesserae are made by sandwiching gold leaf in glass. The gold backgrounds suggest a heavenly, timeless light."
  ], [
    "San Vitale is in the city of...|Ravenna|Athens|Vienna|🟡",
    "San Vitale has a plan that is...|octagonal|triangular|oval",
    "Small mosaic pieces are called...|tesserae|pendentives|lintels",
    "One famous panel shows the emperor...|Justinian|Hadrian|Augustus",
    "The empress in the other panel is...|Theodora|Cleopatra|Hatshepsut",
    "Figures in the panels look...|flat and facing forward|deeply shadowed|blurry and soft",
    "Gold tesserae are made from gold leaf and...|glass|plastic|wood",
    "The mosaics were made in the...|500s CE|1500s CE|1900s CE"
  ], "Think of Byzantine glitter in an Italian city."));
  a.push(L("Charlemagne and Carolingian art", [
    "A new emperor|👑|<b>Charlemagne</b>, king of the Franks, was crowned emperor on Christmas Day in 800 CE. He wanted to revive the glory of Rome in western Europe.",
    "Palace chapel|⛪|At Aachen (in today's Germany) he built a palace chapel with an octagonal plan, inspired by San Vitale in Ravenna. Builders borrowed Roman and Byzantine ideas.",
    "Clear writing|✍️|Monks in workshops called <b>scriptoria</b> copied books by hand. They used a clear lowercase script, <b>Carolingian minuscule</b>. Our modern lowercase letters grew from it."
  ], [
    "Charlemagne was crowned emperor in...|800 CE|1100 CE|300 CE|👑",
    "The palace chapel at Aachen was inspired by...|San Vitale|Stonehenge|the Parthenon",
    "A clear lowercase script from his time is Carolingian...|minuscule|pendentive|vanitas",
    "Charlemagne ruled the...|Franks|Aztecs|Incas",
    "Workshops where monks copied books are called...|scriptoria|aqueducts|stupas",
    "Aachen is in modern...|Germany|Spain|Poland",
    "Our lowercase letters grew from...|Carolingian minuscule|cave marks|hieroglyphs",
    "Charlemagne wanted to revive the glory of...|Rome|Egypt|Persia"
  ], "Think of an emperor crowned in 800 and a script we still use."));
  a.push(L("Sutton Hoo", [
    "A ship burial|⚓|In 1939, on land owned by Edith Pretty in Suffolk, England, the archaeologist Basil Brown uncovered an Anglo-Saxon <b>ship burial</b> from about 625 CE. It probably held a king of East Anglia.",
    "Treasures|💎|Inside were a helmet, weapons and gold jewelry. Clasps and buckles were set with red <b>garnets</b> and glass in thin gold walls, a technique called <b>cloisonne</b>.",
    "Twisting animals|🐍|The designs show animals whose bodies twist and weave together, called <b>interlace</b>. The wooden ship had rotted away, leaving a ghostly imprint in the sand."
  ], [
    "Sutton Hoo is in...|England|Norway|Iceland|⚓",
    "The Sutton Hoo burial was found in...|1939|1539|1999",
    "The burial was inside a...|ship|pyramid|igloo",
    "Red stones set in the gold jewelry were...|garnets|emeralds|pearls",
    "Twisting animal patterns are called...|interlace|perspective|pointillism",
    "Thin gold walls holding gems in tiny cells make...|cloisonne|impasto|batik",
    "Who owned the land where the ship was found?|Edith Pretty|Queen Victoria|Basil Brown",
    "The ship's wood had decayed, leaving only an...|imprint in the sand|golden engine|working sail"
  ], "Think of a king's treasure ship buried in the English ground."));
  a.push(L("Dome of the Rock", [
    "A golden dome in Jerusalem|🕌|The <b>Dome of the Rock</b> in Jerusalem was finished around 691-692 CE for the Umayyad caliph Abd al-Malik. It is one of the oldest surviving Islamic monuments.",
    "Eight sides|🔷|Its plan is an <b>octagon</b> with a wooden dome covered in gold. It was built to shelter a sacred rock, and walkways circle the rock inside.",
    "Words and plants|🌿|The inside is covered in glittering mosaics of plants, vines and jewels, not people. Long bands of <b>Arabic calligraphy</b> run around the walls."
  ], [
    "The Dome of the Rock is in...|Jerusalem|Cordoba|Cairo|🕌",
    "It was finished about...|690s CE|990s CE|1690s CE",
    "Its plan is an...|octagon|pentagon|ellipse",
    "It was built for the caliph...|Abd al-Malik|Justinian|Louis XIV",
    "The mosaics inside show mostly...|plants and jewels|portraits of kings|cartoons",
    "Inscriptions on the walls are in...|Arabic calligraphy|Latin cursive|hieroglyphs",
    "The caliph belonged to the dynasty called...|Umayyad|Ming|Tudor",
    "The dome is covered in...|gold|clay tiles|ice"
  ], "Think of a golden dome with eight sides over a sacred rock."));
  a.push(L("Great Mosque of Djenne", [
    "A building of mud|🧱|The <b>Great Mosque of Djenne</b> in Mali, West Africa, is the largest mud-brick building in the world. The present building was rebuilt in 1907 on an older mosque's site.",
    "Sticks in the walls|🪵|Bundles of palm wood, called <b>torons</b>, stick out of the walls. They give workers a permanent scaffold for repairs.",
    "A town effort|🤝|Rain wears away the mud, so each year the people of Djenne re-plaster the walls together in a community festival. Old Djenne is a UNESCO World Heritage Site."
  ], [
    "The Great Mosque of Djenne is in...|Mali|Chile|Iran|🧱",
    "It is built mostly of...|mud brick|marble|steel",
    "Wooden beams that stick out of the walls are...|torons|lintels|minarets",
    "Each year the walls are...|re-plastered with mud|painted neon|taken apart",
    "The present mosque was rebuilt in...|1907|1307|1999",
    "The torons serve as...|permanent scaffolding|chimneys|flagpoles",
    "It is the world's largest...|mud-brick building|stone pyramid|ice castle",
    "Djenne lies in...|West Africa|South America|Scandinavia"
  ], "Think of a huge West African building made of mud."));
  a.push(L("Longmen Grottoes", [
    "Buddhas in the cliff|⛰️|The <b>Longmen Grottoes</b> (\"Dragon Gate\") near Luoyang, China, are thousands of shrines carved into limestone cliffs. Work began about 493 CE under the Northern Wei dynasty.",
    "Tang giants|🧘|Carving continued for centuries. The giant seated Buddha <b>Vairocana</b>, about 17 meters (56 feet) tall, was finished in 675 CE under the Tang dynasty.",
    "Thousands of figures|🗿|Longmen holds over 100,000 statues and many inscriptions. A <b>grotto</b> is a cave or cave-like shrine, here cut right into the rock."
  ], [
    "Longmen Grottoes are carved into...|limestone cliffs|ice|clay bricks|⛰️",
    "They are near the Chinese city of...|Luoyang|Rome|Lima",
    "Carving began about...|493 CE|993 BCE|1493 CE",
    "The giant seated Buddha is called...|Vairocana|Nataraja|Moai",
    "Longmen means...|Dragon Gate|Silent Garden|Iron Bridge",
    "The shrines are mostly...|Buddhist|Viking|Roman",
    "How many statues does Longmen hold?|Over 100,000|About 12|Exactly 3",
    "A grotto is a...|cave-like shrine|kind of paintbrush|type of tile"
  ], "Think of Buddhist statues cut into cliffs near Luoyang."));
  a.push(L("Heian Japan and The Tale of Genji", [
    "Court culture|🎎|The <b>Heian period</b> (794 to 1185) takes its name from the capital Heian-kyo, now Kyoto. Nobles loved poetry, fine paper and delicate art.",
    "A first novel|📜|Murasaki Shikibu wrote <b>The Tale of Genji</b> about the year 1000. Later painted handscrolls show scenes with the roofs removed, so viewers peek inside rooms. Faces are drawn with a few simple lines.",
    "Phoenix Hall|🏯|The <b>Phoenix Hall</b> at Byodo-in (1053) near Kyoto has wings on either side, like a bird. Japanese-style painting of this time is called <b>Yamato-e</b>."
  ], [
    "The Tale of Genji was written by...|Murasaki Shikibu|Hokusai|Sinan|🎎",
    "The Heian capital was today's...|Kyoto|Tokyo|Osaka",
    "The Phoenix Hall at Byodo-in was built in...|1053|1553|853",
    "In Genji scrolls the roofs are often removed to show...|the rooms inside|the clouds|a map",
    "Yamato-e means...|Japanese-style painting|oil portraits|Chinese ink only",
    "The Heian period lasted from...|794 to 1185|1900 to 1990|300 to 100 BCE",
    "The Phoenix Hall's shape resembles a...|bird with spread wings|pyramid|cube",
    "Faces in the Genji scrolls are drawn with...|a few simple lines|heavy realistic shading|photographic detail"
  ], "Think of a Japanese court a thousand years ago and a famous novel."));
  a.push(L("Cahokia and the mound builders", [
    "A city of earth|🏔️|<b>Cahokia</b>, near modern St. Louis in Illinois, was the largest city of the Mississippian culture. It peaked between about 1050 and 1200 CE.",
    "Monks Mound|⛰️|<b>Monks Mound</b> is the largest earthen mound in the Americas north of Mexico, about 100 feet (30 meters) tall. Workers carried the soil in baskets, one load at a time.",
    "Woodhenge|☀️|Rings of tall wooden posts, called <b>Woodhenge</b>, probably tracked the sun's position through the year, like a calendar. Cahokia Mounds is a UNESCO World Heritage Site."
  ], [
    "Cahokia is in the present-day state of...|Illinois|Florida|Alaska|🏔️",
    "Monks Mound is made of...|packed earth|stone blocks|glass",
    "Monks Mound is about how tall?|100 feet|10 feet|1,000 feet",
    "Woodhenge was probably used as a...|sun calendar|fence|boat dock",
    "Cahokia peaked about...|1050 to 1200 CE|1850 CE|4000 BCE",
    "Its builders belonged to the...|Mississippian culture|Roman Empire|Viking age",
    "Workers carried the earth in...|baskets|trucks|conveyor belts",
    "Cahokia Mounds is a UNESCO...|World Heritage Site|zoo|ski resort"
  ], "Think of a huge earthen mound near the Mississippi River."));
  a.push(L("Pencil grades and paper tooth", [
    "H and B|✏️|Pencils are graded by letters. <b>H</b> means hard (light, crisp lines). <b>B</b> means black (soft, dark lines). <b>HB</b> is in the middle. Bigger numbers go further: a 6B is softer and darker than a 2B.",
    "Paper tooth|📄|<b>Tooth</b> is the texture of paper. Rough paper with lots of tooth grabs graphite or charcoal and gives grainy tones. Smooth paper suits fine detail.",
    "Erasers and fixative|🧽|A <b>kneaded eraser</b> lifts graphite without crumbs and can be shaped. A spray called <b>fixative</b> helps keep pencil and charcoal from smudging."
  ], [
    "In pencil grades the B stands for...|black|bright|blue|✏️",
    "Compared with a 2B, a 6B is...|darker and softer|lighter and harder|exactly the same",
    "Compared with HB, a 4H is...|harder and lighter|softer and darker|identical",
    "The texture of paper's surface is its...|tooth|spine|grain-free glaze",
    "Rough paper with lots of tooth grabs more...|graphite or charcoal|water only|glue",
    "A pencil in the middle of the scale is...|HB|9H|9B",
    "A kneaded eraser...|lifts graphite without crumbs|cuts the paper|adds color",
    "A spray that helps keep pencil from smudging is...|fixative|gesso|solvent"
  ], "Think about the letters on a pencil and what they say about its lead."));
  a.push(L("Local color and optical color", [
    "Two kinds of color|🍎|<b>Local color</b> is the true color of an object in plain white light, such as a red apple. <b>Optical color</b> is the color you actually see, changed by light, shadow, reflections and distance.",
    "Why they differ|🌅|The apple's shadow side looks darker and shifts toward another hue. At sunset a white wall may look orange or pink. Far mountains turn bluer because of the air between you and them.",
    "Paint what you see|👁️|Beginners often paint what they <i>know</i> (the apple is red). Painters like the Impressionists painted what they <i>saw</i>, so they compared patches of color with each other."
  ], [
    "The true color of an object in plain white light is its...|local color|optical color|complementary|🍎",
    "The color you actually see, changed by light and shadow, is...|optical color|local color|a primary",
    "A white wall at sunset may look...|orange or pink|invisible|always blue",
    "Distant mountains look bluer because of...|the air between|old paint|a camera filter",
    "The Impressionists mostly painted...|optical color|only local color|only black and white",
    "A white cup next to a red cloth may pick up a little...|red reflected light|green dots|nothing at all",
    "The shadow side of a red apple usually looks...|darker and shifted in hue|exactly the same|bright white",
    "Painting what you see instead of what you know is painting...|from observation|from memory|blindly"
  ], "Think about the difference between the real color and the seen color."));
  a.push(L("The CARP principles", [
    "Four tools|🧰|<b>CARP</b> stands for Contrast, Alignment, Repetition and Proximity. Designers use these four ideas to make layouts clear.",
    "Group and line up|📐|<b>Proximity</b> means putting related things close together. <b>Alignment</b> means lining items up along a shared edge so nothing looks placed by accident.",
    "Repeat and contrast|🔁|<b>Repetition</b> reuses colors, fonts and shapes to unify a design. <b>Contrast</b> makes different things look clearly different, such as a big bold title above small body text."
  ], [
    "Putting related items close together is...|proximity|contrast|repetition|🧰",
    "Lining things up along a shared edge is...|alignment|repetition|proximity",
    "Reusing the same fonts and colors is...|repetition|contrast|alignment",
    "Making different things look clearly different is...|contrast|proximity|alignment",
    "The P in CARP stands for...|proximity|perspective|pattern",
    "Text scattered with no shared edge lacks...|alignment|paper|ink",
    "A big bold title above small text uses...|contrast|alignment only|proximity only",
    "Repeating one logo color on every page adds...|unity|confusion|noise"
  ], "Think of the four letters C A R P and what each one asks you to do."));
  a.push(L("Studio safety", [
    "Air and fumes|🌬️|Solvents such as turpentine and mineral spirits give off fumes. Work with good <b>ventilation</b>. Wear a mask for fine dust from clay, pastel or sanding.",
    "Oily rags|🔥|Rags with oil paint or linseed oil can heat up and catch fire by themselves. Lay them flat to dry, or store them in a closed metal container.",
    "Read the label|📋|A <b>Safety Data Sheet</b> (SDS) tells you a material's hazards and how to handle it. Never pour solvents down a drain, keep food out of the studio and cut away from your body."
  ], [
    "Oily rags should be kept in a...|closed metal container|crumpled pile in a pocket|plastic bag in the sun|🌬️",
    "A Safety Data Sheet tells you about a material's...|hazards|sale price|color name",
    "When using solvents you should have good...|ventilation|silence|sunshine",
    "When cutting with a craft knife, cut...|away from your body|toward your hand|while distracted",
    "For fine dust from clay or sanding, wear a...|mask|scarf only|party hat",
    "Solvents should never be poured...|down the drain|into a labeled waste container|into a sealed jar",
    "Oil-soaked rags can...|catch fire by themselves|turn into paper|cool the room",
    "Food and drinks are best kept...|out of the studio|beside the paint|in the paint water"
  ], "Think about air, fire and labels."));
  a.push(L("The 60-30-10 rule", [
    "Share the colors|🎨|The <b>60-30-10 rule</b> says to give your <b>dominant</b> color about 60 percent of a design, a <b>secondary</b> color about 30 percent and an <b>accent</b> about 10 percent.",
    "In a room|🛋️|In a bedroom, the walls might be 60 percent soft blue, the furniture 30 percent gray and the pillows and art 10 percent bright orange.",
    "Why it works|⚖️|One main color calms the eye, a second adds interest and a small bright accent draws attention. If every color gets an equal share, the design can feel busy and confusing."
  ], [
    "In the 60-30-10 rule, the dominant color gets about...|60 percent|10 percent|30 percent|🎨",
    "The accent color gets about...|10 percent|60 percent|50 percent",
    "The secondary color gets about...|30 percent|90 percent|0 percent",
    "An accent color is best used for...|small highlights|the whole background|body text",
    "If all colors get an equal share, the design may feel...|busy and confusing|perfectly calm|invisible",
    "In a room, the pillows are likely the...|accent|dominant|secondary wall",
    "The 60-30-10 rule helps designers get...|balance|louder paint|thicker paper",
    "The rule is used in...|rooms and websites|only cave paintings|only bronze casting"
  ], "Think about three shares of color that add up to a whole."));
  a.push(L("Figure-ground reversal", [
    "Two ways to see|🏺|The <b>figure</b> is the shape you notice first. The <b>ground</b> is the area behind it. In <b>Rubin's vase</b> (by the Danish psychologist Edgar Rubin) you can see a vase or two faces.",
    "Clever logos|➡️|Designers hide pictures in negative space. In the FedEx logo, a white arrow appears in the space between the letters E and x.",
    "Making it work|🔲|Strong contrast between the shapes helps the eye switch between figure and ground. Switching on purpose is a <b>figure-ground reversal</b>."
  ], [
    "The shape you notice first is the...|figure|ground|frame|🏺",
    "The area behind the main shape is the...|ground|figure|border",
    "Rubin's vase can look like a vase or two...|faces|trees|clocks",
    "Edgar Rubin was a Danish...|psychologist|chef|sculptor",
    "The FedEx arrow hides in the space between E and...|x|F|d",
    "Logos with hidden pictures use...|negative space|cast shadows|texture",
    "Strong contrast helps the eye switch between...|figure and ground|hot and cold|loud and quiet",
    "Switching which shape you see as the subject is figure-ground...|reversal|inflation|rotation"
  ], "Think of the main shape and the empty space around it."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[6], a[8], a[10], a[12], a[13], a[14], a[16], a[17]]));
  a.push(MIX("Level 25 Challenge", [a[1], a[3], a[5], a[7], a[9], a[11], a[12], a[13], a[15], a[16], a[17]]));

  // ================= LEVEL 26 =================
  const b = [];
  b.push(L("Duccio and Siena", [
    "A painter of Siena|🎨|<b>Duccio di Buoninsegna</b> (about 1255-1319) worked in Siena, Italy, a proud rival of Florence. He is the founder of the Sienese school of painting.",
    "The Maesta|👑|His huge altarpiece the <b>Maesta</b> (\"Majesty\"), finished in 1311 for Siena Cathedral, was painted in egg tempera and gold leaf on wood panels.",
    "Old and new|✨|Duccio kept the gold glow and elegant lines of Byzantine art but gave his figures softer shapes and more natural feeling."
  ], [
    "Duccio worked in the city of...|Siena|Venice|Milan|🎨",
    "Duccio's famous altarpiece is the...|Maesta|Arena Chapel|Ambassadors",
    "Maesta means...|Majesty|Master|Midnight",
    "The Maesta was painted in egg tempera and gold leaf on...|wood panels|canvas|glass",
    "Duccio combined Byzantine elegance with...|softer more natural figures|abstract blocks|photographs",
    "Siena's great rival city was...|Florence|Lisbon|Oslo",
    "An altarpiece stands...|behind an altar|on a bridge|in a garden",
    "Duccio lived around the year...|1300|1900|700 BCE"
  ], "Think of Gothic-era panel painting in the rival city of Florence."));
  b.push(L("Ghiberti's Gates of Paradise", [
    "A bronze competition|🏆|In 1401 Florence held a contest to design bronze doors for its Baptistery. <b>Lorenzo Ghiberti</b> beat Filippo Brunelleschi and spent decades making doors.",
    "Ten panels|🚪|His second set, made 1425-1452, has ten gilded bronze panels showing Old Testament stories. Later admirers named them the <b>Gates of Paradise</b>.",
    "Depth in relief|📐|Ghiberti used <b>linear perspective</b> in shallow <b>relief</b>: figures near the front stick out far, and distant buildings are barely raised, so the scene looks deep."
  ], [
    "Ghiberti made bronze doors for a baptistery in...|Florence|Madrid|Athens|🏆",
    "The doors are covered in a thin layer of...|gold (gilded)|paint|plastic",
    "How many panels do the Gates of Paradise have?|Ten|Two|One hundred",
    "Ghiberti won a contest against...|Brunelleschi|Titian|Rubens",
    "The panels use...|linear perspective in relief|no sense of depth|photographs",
    "The Gates of Paradise belong to the...|Early Renaissance|Baroque|Pop art era",
    "In relief, distant buildings are...|barely raised|the most raised|hanging off",
    "The contest was held in...|1401|1801|1201"
  ], "Think of ten gilded bronze panels with perspective."));
  b.push(L("Masaccio", [
    "A young genius|🖌️|<b>Masaccio</b> (1401-about 1428) worked in Florence and died when he was only about 27. He built on Giotto's solid, weighty figures.",
    "Holy Trinity|🏛️|His fresco <b>Holy Trinity</b> in Santa Maria Novella (about 1427) is painted so the chapel seems to be a real <b>barrel-vaulted</b> space. It is among the first paintings to use linear perspective with great accuracy.",
    "Real people|🧍|His figures cast shadows and stand firmly on the ground. In the Brancacci Chapel frescoes, they show real emotions, an important step toward the High Renaissance."
  ], [
    "Masaccio worked in the city of...|Florence|Cusco|Nara|🖌️",
    "Masaccio's Holy Trinity uses accurate...|linear perspective|no perspective|only atmosphere",
    "The painted chapel in the Trinity looks like a...|barrel-vaulted space|flat wall|mountain",
    "Masaccio died at about the age of...|27|90|60",
    "His figures cast shadows and have...|weight|no volume|metallic faces",
    "Masaccio built on the solid figures of...|Giotto|Warhol|Kahlo",
    "Masaccio's Brancacci Chapel paintings are...|frescoes|mosaics|prints",
    "Masaccio lived in the...|1400s|1900s|700s"
  ], "Think of an Early Renaissance painter who died very young."));
  b.push(L("Artemisia Gentileschi", [
    "Daughter of a painter|👩‍🎨|<b>Artemisia Gentileschi</b> (1593-about 1656) was born in Rome and trained by her father, the painter Orazio Gentileschi. She worked in the dramatic Baroque style.",
    "A first|🏅|In 1616 she became the first woman admitted to the Academy of the Arts of Drawing in Florence. She later worked in Naples as well.",
    "Self-portrait|🖼️|Her <b>Self-Portrait as the Allegory of Painting</b> (about 1638) shows her at work as the personification of painting. She often painted strong women from history and stories."
  ], [
    "Artemisia Gentileschi was born in...|Rome|Delhi|Boston|👩‍🎨",
    "She was trained by her father...|Orazio|Rembrandt|Vermeer",
    "She was the first woman admitted to the Academy in...|Florence|Paris|Lisbon",
    "Her style is called...|Baroque|Cubist|Pop",
    "Her famous self-portrait shows her as the allegory of...|Painting|Music|War",
    "She lived in the...|1600s|1900s|800s",
    "Her dramatic lighting was influenced by...|Caravaggio|Monet|Mondrian",
    "She often painted...|strong women from stories|robots|cars"
  ], "Think of a Baroque woman painter trained by her father."));
  b.push(L("Caravaggio and tenebrism", [
    "Spotlight painting|🔦|<b>Caravaggio</b> (1571-1610) painted with extreme contrast of light and dark, called <b>tenebrism</b> (from the Italian for \"dark\"). Light seems to come from one strong source, like a spotlight.",
    "Ordinary people|👥|He used everyday people as models and set sacred stories in plain rooms. In <b>The Calling of Saint Matthew</b> (about 1600) in Rome, a beam of light points toward the man being called.",
    "Drama and realism|🎭|The strong light makes scenes feel dramatic and real. His style became a main starting point for the Baroque."
  ], [
    "Very strong contrast of light and dark is called...|tenebrism|pointillism|batik|🔦",
    "The Calling of Saint Matthew hangs in...|Rome|Tokyo|London",
    "Caravaggio often used as models...|ordinary people|marble statues only|robots",
    "Light in his paintings often comes from...|one strong source|many equal lamps|no source",
    "Caravaggio's period is called the...|Baroque|Rococo|Gothic",
    "Caravaggio painted mainly with...|oil paint|watercolor|crayons",
    "He was born in...|1571|1871|1271",
    "The effect of his strong light is...|drama and realism|calm flatness|abstract pattern"
  ], "Think of spotlight-style lighting in Baroque painting."));
  b.push(L("Ming blue-and-white porcelain", [
    "Porcelain capital|🏺|During the Ming dynasty (1368-1644), the town of <b>Jingdezhen</b> in China became the center of porcelain making. Porcelain is made from white <b>kaolin</b> clay fired at very high heat.",
    "Cobalt blue|🔵|Artists painted designs of flowers, dragons and landscapes with <b>cobalt</b> pigment directly on the clay, then covered it with clear <b>glaze</b>. The blue stays bright under the glassy glaze.",
    "Traded worldwide|🚢|These vessels traveled by ship and along the Silk Road to the Middle East and Europe. Fine ceramics are still called <b>china</b> in English."
  ], [
    "Ming porcelain was made in the town of...|Jingdezhen|Paris|Cairo|🏺",
    "The blue color came from...|cobalt|copper|gold",
    "Designs were painted under a clear...|glaze|varnish|lacquer",
    "Porcelain is made from white clay called...|kaolin|ochre|gesso",
    "The Ming dynasty ruled from...|1368 to 1644|1900 to 1990|900 to 700 BCE",
    "Porcelain was traded along...|the Silk Road and sea routes|only one river|no routes",
    "Fine ceramic is often called china after the country...|China|Chile|Chad",
    "Porcelain is fired at...|very high heat|room temperature|freezing cold"
  ], "Think of Chinese ceramics painted under the glaze."));
  b.push(L("Safavid Isfahan", [
    "A new capital|🕌|Shah Abbas I of the <b>Safavid</b> dynasty moved Iran's capital to Isfahan in about 1598. He rebuilt it as a showpiece city in the 1600s.",
    "A great square|🏟️|<b>Naqsh-e Jahan Square</b> is one of the largest city squares in the world. Mosques, a palace and a bazaar face it. The Shah Mosque rises on one side, begun in 1611.",
    "Seven colors|🔷|Its walls are covered with <b>haft rangi</b> (\"seven colors\") tiles. Tilework in blue, turquoise, yellow and white makes the huge dome shimmer."
  ], [
    "Shah Abbas I ruled which country?|Iran|Egypt|Peru|🕌",
    "The Safavid capital he built up was...|Isfahan|Lima|Oslo",
    "Haft rangi tiles means...|seven colors|seven stones|seven domes",
    "Naqsh-e Jahan Square is one of the largest...|city squares|lakes|volcanoes",
    "The Shah Mosque is covered in...|colorful tilework|bare gray concrete|wood paneling",
    "The dynasty was called...|Safavid|Ming|Tudor",
    "Isfahan's building boom was in the...|1600s|1200s|1900s",
    "Shah means...|king|queen|scholar"
  ], "Think of tilework in Iran's great square."));
  b.push(L("Ife bronze heads", [
    "Art of the Yoruba|👑|<b>Ife</b> is an ancient Yoruba city in southwestern Nigeria. From about the 1100s to the 1400s its artists cast lifelike heads in copper alloys such as brass, and in terracotta.",
    "Lifelike faces|🙂|Unlike many styles that simplify faces, Ife heads are <b>naturalistic</b>, with smooth skin and careful features. Some have fine lines on the face and small holes near the hairline, maybe for attaching a crown or veil.",
    "Lost-wax casting|🔥|The heads were made by <b>lost-wax casting</b>, the same method used by Chola and Benin artists. They likely show royal figures such as an ooni (king)."
  ], [
    "Ife is in which country?|Nigeria|Norway|Mexico|👑",
    "The Ife heads were made by...|lost-wax casting|3D printing|weaving",
    "The Ife style is described as...|naturalistic|abstract cubes|cartoonish",
    "Small holes near the hairline may have attached a...|crown or veil|pair of glasses|helmet visor",
    "Ife is a city of the...|Yoruba people|Inuit|Maori",
    "Ife heads date from about...|the 1100s to 1400s CE|1900s|3000 BCE",
    "The heads likely show...|royal figures|cartoon animals|machines",
    "Many Ife heads are made of a...|copper alloy|rubber|glass"
  ], "Think of lifelike bronze heads from a Yoruba city."));
  b.push(L("Hudson River School", [
    "Painting the wild|🏞️|The <b>Hudson River School</b> was a group of American painters of the 1800s, led by <b>Thomas Cole</b>, who painted the Hudson River valley and Catskill Mountains of New York.",
    "Awe at nature|⛰️|These Romantic painters believed nature was grand and almost sacred. They aimed to show the <b>sublime</b>, a feeling of awe at something vast. Cole painted <b>The Oxbow</b> (1836).",
    "Going west|🌄|Later painters such as Albert Bierstadt painted the Rocky Mountains and Yosemite in huge canvases that made people dream of the American West."
  ], [
    "The founder of the Hudson River School was...|Thomas Cole|Edward Hopper|Winslow Homer|🏞️",
    "The school painted the valley of the...|Hudson River|Nile River|Amazon River",
    "Which painting is by Thomas Cole?|The Oxbow|Las Meninas|Guernica",
    "A feeling of awe at something vast is the...|sublime|grotesque|minimal",
    "Albert Bierstadt painted mountains of the...|American West|Alps in winter|Himalayas",
    "The Hudson River School flourished in the...|1800s|1500s|2000s",
    "The movement is connected with...|Romanticism|Cubism|Dada",
    "Hudson River painters saw nature as...|grand and almost sacred|boring|ugly"
  ], "Think of vast American landscapes full of awe."));
  b.push(L("Romare Bearden", [
    "Harlem artist|🎷|<b>Romare Bearden</b> (1911-1988) was born in Charlotte, North Carolina, and grew up partly in Harlem, New York. He became one of the best-known American collage artists.",
    "Cut and pasted|✂️|He cut up photographs, magazines and painted paper and pasted them together. In 1964 he made a series called <b>Projections</b>, enlarging his collages photographically.",
    "Music and community|🎶|His art shows Black community life, jazz, blues and memory. <b>The Block</b> (1971) is a collage of a city block in Harlem seen like a long street."
  ], [
    "Romare Bearden is best known for...|collage|marble statues|stained glass|🎷",
    "Bearden was born in...|North Carolina|Texas|Maine",
    "Bearden grew up partly in the New York neighborhood of...|Harlem|Hollywood|Chinatown",
    "His subjects include Black community life and...|jazz|space battles|Roman emperors",
    "The Block (1971) shows a city block in...|Harlem|a desert|a harbor of ships",
    "Bearden's 1964 series of enlarged collages is...|Projections|Soundsuits|Combines",
    "Collage builds a new image from...|pasted pieces|only one brushstroke|tiny dots only",
    "Bearden lived in the...|1900s|1600s|1300s"
  ], "Think of cut and pasted scenes of jazz and Harlem."));
  b.push(L("Ai Weiwei", [
    "A global artist|🌻|<b>Ai Weiwei</b> (born 1957 in Beijing) is a Chinese contemporary artist. He also helped design the Beijing National Stadium, the \"Bird's Nest,\" for the 2008 Olympics.",
    "Sunflower Seeds|🌻|His <b>Sunflower Seeds</b> (2010) at Tate Modern in London filled a huge hall with 100 million tiny porcelain seeds, each handmade and painted by artisans in Jingdezhen.",
    "Crowd and individual|🧑‍🤝‍🧑|From far away the seeds look the same, but each is slightly different. The work makes you think about individuals, crowds and mass production."
  ], [
    "Sunflower Seeds is made of...|porcelain|real seeds|candy|🌻",
    "How many seeds were in the work?|100 million|One thousand|Five",
    "Sunflower Seeds was shown at Tate Modern in...|London|Paris|Cairo",
    "The seeds were handmade in...|Jingdezhen|Houston|Oslo",
    "Ai Weiwei helped design the Beijing National...|Stadium|Library|Zoo",
    "Ai Weiwei was born in...|Beijing|Moscow|Cairo",
    "Each seed was...|slightly different|exactly alike|made of metal",
    "The work makes viewers think about the individual and the...|crowd|weather|moon"
  ], "Think of millions of handmade porcelain seeds."));
  b.push(L("Helen Frankenthaler and soak-stain", [
    "A new way to paint|🌊|<b>Helen Frankenthaler</b> (1928-2011) laid a large unprimed canvas on the floor and poured thinned oil paint onto it. This <b>soak-stain</b> technique let color sink into the fibers.",
    "Mountains and Sea|🏔️|Her breakthrough, <b>Mountains and Sea</b> (1952), glows with washes of blue, green and pink, with no thick brushstrokes. Color and canvas become one.",
    "Color Field|🎨|Painters such as Morris Louis and Kenneth Noland learned from her. Their style is called <b>Color Field</b> painting."
  ], [
    "Frankenthaler's technique is called...|soak-stain|impasto|etching|🌊",
    "She worked with the canvas laid...|flat on the floor|hanging from the ceiling|inside a frame",
    "The canvas was left...|unprimed|covered in gesso|painted black first",
    "Her work influenced the style called...|Color Field|Rococo|Art Deco",
    "Mountains and Sea was made in...|1952|1752|1992",
    "Oil paint was thinned with...|turpentine|milk|honey",
    "Painters influenced by her include...|Morris Louis|Monet|Giotto",
    "In her stained paintings, color seems to...|become part of the canvas|sit in thick bumps|glow from electricity"
  ], "Think of poured, thinned paint soaking into raw canvas."));
  b.push(L("Design briefs", [
    "Start with a brief|📋|A <b>design brief</b> is a short document that describes the project: its goal, the <b>audience</b>, the <b>constraints</b> (size, budget, deadline) and the <b>deliverables</b> you must produce.",
    "Ask good questions|❓|Before designing, ask: Who is this for? What should they feel or do? Where will they see it? A clear brief helps you judge whether a design succeeds.",
    "Check against it|✅|During critique, hold your work up to the brief. A beautiful design that misses the audience or the constraints has not solved the problem."
  ], [
    "A document describing a project's goals and limits is a...|design brief|palette|tintype|📋",
    "The people a design is made for are the...|audience|critics|framers",
    "Limits such as size and budget are called...|constraints|deliverables|tints",
    "The things you must hand in are the...|deliverables|outliers|gesso",
    "A design succeeds when it meets the...|brief|designer's nickname|paper price",
    "Before designing, you should ask...|who it is for|what snacks are nearby|what rain is",
    "A beautiful design that misses the audience has...|not solved the problem|won the brief|no function needed",
    "A brief helps you judge...|whether the design works|the weather|the cost of your pencil"
  ], "Think of the document that sets the goals before you start."));
  b.push(L("Design thinking", [
    "Five stages|🔄|Many designers follow <b>design thinking</b>: <b>Empathize</b>, <b>Define</b>, <b>Ideate</b>, <b>Prototype</b> and <b>Test</b>.",
    "Understand, then imagine|💡|First you study the people you design for (empathize) and state their problem clearly (define). Then you brainstorm many ideas (ideate).",
    "Build and learn|🛠️|A <b>prototype</b> is a quick, rough version made to test an idea. You watch real people use it, learn what fails and go around the loop again."
  ], [
    "The first stage of design thinking is to...|empathize|prototype|sell|🔄",
    "Brainstorming many ideas is the stage called...|ideate|define|test",
    "A quick rough version to try out an idea is a...|prototype|tintype|trademark",
    "Stating the people's problem clearly is to...|define|test|empathize",
    "In the Test stage you...|watch people use your prototype|hide the work|paint the walls",
    "Design thinking is usually...|a loop you repeat|a one-time step|only for painters",
    "To empathize, you first...|study the people you design for|buy supplies|pick colors",
    "After testing, designers often...|improve the design|never look again|burn the sketches"
  ], "Think of five stages that begin with understanding people."));
  b.push(L("Moodboards and references", [
    "Collect and arrange|📌|A <b>moodboard</b> gathers images, colors, textures and words that set the feeling of a project. It helps you and your client agree on a direction before you start.",
    "Reference, not copy|🔍|Use <b>references</b> to study how things work: poses, light, materials. Learn from them but make your own design. Copying someone's finished work and calling it yours is plagiarism.",
    "Keep credit|📝|Note where each image came from. Keep your board private or credit sources, and never publish others' work as your own."
  ], [
    "A collection of images and colors that sets a project's feeling is a...|moodboard|pigment|tint|📌",
    "Using references means...|studying how things work|tracing and signing as your own|ignoring all research",
    "Copying someone's finished work and calling it yours is...|plagiarism|iteration|a study",
    "Why make a moodboard before starting?|To agree on a direction|To avoid sketching|To use up paper",
    "Moodboards can include colors, textures and...|words|invoices|batteries",
    "You should note where each image...|came from|was cut|was printed",
    "A reference photo is best used to...|learn about light and form|copy and sell|hide the source",
    "A moodboard is mainly about the project's...|feeling|price|shipping"
  ], "Think about a board of images that sets the mood."));
  b.push(L("Matting and framing", [
    "Protecting work|🖼️|A <b>mat</b> is a card border around artwork. It keeps the glass from touching the surface and gives the eye room to rest. A <b>window mat</b> has an opening cut for the picture.",
    "Archival choices|🛡️|Use <b>acid-free</b> mat board and archival hinges (small paper tabs with starch paste or tape) so the art can be lifted out safely. Never glue or tape a work flat to the backing.",
    "Glass and light|☀️|<b>UV-filtering glass or acrylic</b> slows fading. Keep framed art out of direct sunlight and damp places."
  ], [
    "The card border around a framed picture is a...|mat|palette|stencil|🖼️",
    "Mat board for artwork should be...|acid-free|acidic|oily",
    "Artwork should be attached with...|archival hinges|strong glue all over|packing tape across the front",
    "UV-filtering glass helps slow...|fading|ice|noise",
    "A mat keeps the glass from...|touching the artwork|being clean|being cut",
    "Framed art is best kept out of...|direct sunlight|a quiet hall|a dry room",
    "A window mat has an...|opening cut for the picture|print on the back|plastic film",
    "Why hinge art instead of gluing it?|So it can be lifted out safely|So it looks messy|So it falls off"
  ], "Think of how a frame protects a work on paper."));
  b.push(L("Archival paper and lightfastness", [
    "Why paper yellows|📄|Cheap paper is made from wood pulp that contains <b>lignin</b> and acids. Over time it turns yellow and brittle. Artist paper is often <b>acid-free</b> and made of cotton rag.",
    "Lightfast pigments|🌈|Some colors fade in light. A <b>lightfastness</b> rating (for example ASTM I or II) tells how well a paint or pencil resists fading. Choose high ratings for work you plan to sell or keep.",
    "Storage|📦|Store work flat or in acid-free sleeves, away from sun and damp. Good materials help art last for generations."
  ], [
    "Cheap paper turns yellow because of acids and...|lignin|marble|silk|📄",
    "Artist paper is often made from...|cotton rag|plastic bags|broken glass",
    "A rating that tells how well a pigment resists fading is...|lightfastness|viscosity|resolution",
    "Work you want to keep should use pigments that are...|lightfast|fugitive|fragile",
    "Paper labeled acid-free is...|kinder to artwork over time|more likely to yellow|unfit for drawing",
    "Art should be stored away from sun and...|damp|shade|silence",
    "Wood pulp paper contains substance called...|lignin|kaolin|cobalt",
    "Colors that fade quickly in light are called...|fugitive|archival|permanent"
  ], "Think about what makes paper and pigments last or fade."));
  b.push(L("Contrast and accessibility", [
    "Readable color|🔍|Text must stand out from its background. The Web Content Accessibility Guidelines (<b>WCAG</b>) ask for a <b>contrast ratio</b> of at least 4.5 to 1 for normal text and 3 to 1 for large text.",
    "Do not rely on color alone|🚦|About 1 in 12 men and 1 in 200 women have some color vision deficiency. Do not use only red versus green to show a difference. Add labels, patterns or shapes.",
    "Test it|🧪|Free tools check contrast ratios. Try your design in grayscale: if you can still read it and tell things apart, it works for more people."
  ], [
    "WCAG asks for normal text a contrast ratio of at least...|4.5 to 1|1.1 to 1|50 to 1|🔍",
    "Large text needs a ratio of at least...|3 to 1|20 to 1|0.5 to 1",
    "Red versus green alone is a poor way to show...|a difference|a title|a border",
    "To help people with color vision deficiency, add...|labels or patterns|more red|less light",
    "Light gray text on white has...|low contrast|high contrast|ideal contrast",
    "A good quick test is to view the design in...|grayscale|neon|sepia only",
    "A contrast ratio compares the brightness of...|text and background|two fonts|two paper sizes",
    "Accessible design helps...|more people use it|fewer people|nobody"
  ], "Think about numbers that compare how bright text and background are."));
  b.push(MIX("Mixed practice", [b[0], b[2], b[4], b[6], b[8], b[10], b[11], b[12], b[13], b[15], b[16], b[17]]));
  b.push(MIX("Level 26 Challenge", [b[1], b[3], b[5], b[7], b[9], b[11], b[12], b[14], b[15], b[16], b[17]]));

  // ================= LEVEL 27 =================
  const c = [];
  c.push(L("Periods and the canon", [
    "Labels for time|🗂️|Art historians sort works into <b>periods</b> such as Gothic or Baroque. These are labels invented later by scholars to organize a huge past. Real artists did not wake up in a period.",
    "The canon|📚|The <b>canon</b> is the list of works that textbooks treat as most important. For a long time it favored European men, and many other makers and regions were left out.",
    "Surveys today|🌍|A <b>survey</b> is a broad overview of art across time. Modern surveys try to include more places, women and materials, and they ask who decides what counts as great."
  ], [
    "The list of works treated as most important is the...|canon|survey|palette|🗂️",
    "Labels such as Gothic or Baroque are called...|periods|pigments|plans",
    "A broad overview of art across time is a...|survey|critique|sketch",
    "Period labels were mostly invented by...|later scholars|the artists themselves|machines",
    "The traditional canon mostly favored...|European men|everyone equally|animals",
    "Modern surveys try to include...|more places and makers|fewer regions|nothing new",
    "Asking who decides what counts as great is part of...|questioning the canon|mixing paint|framing",
    "Real artists in the past...|did not use our period labels|always said period names|used computers"
  ], "Think of the labels and lists that historians create."));
  c.push(L("Iconography and iconology", [
    "Reading symbols|🔑|<b>Iconography</b> identifies the subjects and symbols in an artwork. A figure holding keys is usually Saint Peter. A lily often stands for purity.",
    "Panofsky's three levels|🧭|The art historian Erwin Panofsky described three steps. First, <b>describe</b> what you see. Second, <b>identify</b> the subject and symbols. Third, use <b>iconology</b> to explain the deeper meaning in its culture.",
    "Why it matters|📖|Without knowing the symbol code, a viewer may miss the story. Knowing the culture and time helps you read a picture as its first viewers did."
  ], [
    "Identifying subjects and symbols in an artwork is...|iconography|chiaroscuro|tessellation|🔑",
    "Explaining deeper cultural meaning is called...|iconology|silhouette|framing",
    "Which scholar described three levels of interpretation?|Panofsky|Monet|Warhol",
    "The first step in his method is to...|describe what you see|guess the price|sign the work",
    "A figure holding keys is usually...|Saint Peter|Napoleon|Mozart",
    "A lily often stands for...|purity|speed|money",
    "To read symbols well, you need to know the...|culture and time|brush brand|frame size",
    "The third step goes deeper into...|cultural meaning|paint chemistry|canvas weight"
  ], "Think of a three-step method for reading symbols and meaning."));
  c.push(L("Signs and semiotics", [
    "Sign, signifier, signified|🔤|<b>Semiotics</b> studies signs. The linguist Ferdinand de Saussure said a sign has two parts: the <b>signifier</b> (the sound or image) and the <b>signified</b> (the idea it points to).",
    "Peirce's three kinds|🔺|Charles Sanders Peirce sorted signs into three kinds. An <b>icon</b> looks like what it stands for (a portrait). An <b>index</b> points to its cause (a footprint). A <b>symbol</b> works by agreement (a flag).",
    "In design|🚸|Road signs, logos and emoji are all sign systems. A good designer chooses signs that most viewers will read the same way."
  ], [
    "The study of signs is...|semiotics|geometry|botany|🔤",
    "A sign that looks like what it stands for is an...|icon|index|symbol",
    "A sign that points to its cause, like a footprint, is an...|index|icon|symbol",
    "A sign that works by agreement, like a flag, is a...|symbol|index|icon",
    "In Saussure's idea the image or sound is the...|signifier|signified|spectrum",
    "The idea the sign points to is the...|signified|signifier|tessera",
    "Smoke pointing to fire is an example of an...|index|icon|palette",
    "Logos and road signs are...|sign systems|only ornaments|pigments"
  ], "Think of icon, index and symbol."));
  c.push(L("Ways of Seeing", [
    "A famous series|📺|In 1972 the British critic <b>John Berger</b> made <b>Ways of Seeing</b>, a four-part BBC television series and a short book. It changed how many people look at art.",
    "Seeing comes first|👁️|Berger began, \"Seeing comes before words.\" He argued that what we see depends on what we know and believe, and that images are shaped by the people who make and own them.",
    "Who is the viewer?|❓|Ask who made the picture, who it was made for and who is shown. Berger also pointed out that photographs and posters can change a famous painting's meaning when copied."
  ], [
    "Ways of Seeing was made by...|John Berger|Walter Benjamin|Linda Nochlin|📺",
    "Ways of Seeing first aired in...|1972|1872|1992",
    "Berger said that seeing comes before...|words|breakfast|sleep",
    "Ways of Seeing was a television series and a...|book|video game|statue",
    "Berger asked who the picture was made...|for|against|by robots",
    "Berger was a British...|critic|pilot|chemist",
    "The series was broadcast by the...|BBC|NASA|FIFA",
    "Berger said copies can change a painting's...|meaning|chemistry|weight"
  ], "Think of a 1972 BBC series about how we look at pictures."));
  c.push(L("Walter Benjamin and the aura", [
    "A famous essay|📄|In 1935 the German thinker <b>Walter Benjamin</b> wrote <i>The Work of Art in the Age of Mechanical Reproduction</i>, about what happens when photography and film copy art.",
    "The aura|✨|Benjamin said an original artwork has an <b>aura</b>: a special presence tied to its unique place and history. A poster or photo of the painting does not share that presence.",
    "New possibilities|📷|Reproduction can lose the aura, but it also brings art to many people. Film and photography became new art forms that were made to be copied."
  ], [
    "Benjamin wrote an essay about art in the age of...|mechanical reproduction|mountain climbing|cooking|📄",
    "An original artwork's special presence is its...|aura|palette|tooth",
    "Benjamin wrote in...|1935|1535|1995",
    "Benjamin said reproduction can...|lose the aura|add more gold paint|prove the artist alive",
    "Photography and film are art forms made to be...|copied|hidden|buried",
    "Walter Benjamin was a...|German thinker|Roman emperor|Aztec priest",
    "Reproductions bring art to...|many more people|nobody|only museums",
    "The aura is tied to an original's unique...|place and history|price tag|frame color"
  ], "Think of what a copy cannot share with an original."));
  c.push(L("Formalism and Clement Greenberg", [
    "Form over story|🔲|<b>Formalism</b> judges art mainly by its form: line, color, shape and composition, rather than its story or its maker's life.",
    "Greenberg|🗣️|The American critic <b>Clement Greenberg</b> (1909-1994) championed Abstract Expressionism and Jackson Pollock. In his essay <i>Modernist Painting</i> (1960) he argued that painting should emphasize its own <b>flatness</b>.",
    "Limits|⚖️|Critics later said formalism ignores history, society and meaning. Today many art historians use formal analysis as one tool among several."
  ], [
    "Formalism focuses mainly on a work's...|form|price|travel history|🔲",
    "The critic who championed Pollock was...|Clement Greenberg|John Berger|Linda Nochlin",
    "Greenberg thought modern painting should emphasize...|flatness|deep perspective|storytelling",
    "Greenberg wrote his essay Modernist Painting in...|1960|1760|1860",
    "Formal analysis looks at line, color and...|composition|gossip|auction results",
    "Later critics said formalism may ignore...|history and society|brushes|scissors",
    "Greenberg supported the style called...|Abstract Expressionism|Baroque|Gothic",
    "Today formal analysis is...|one tool among several|forbidden|the only method"
  ], "Think of judging art by its form and the critic who loved flat paintings."));
  c.push(L("Why have there been no great women artists?", [
    "A bold question|❓|In 1971 the art historian <b>Linda Nochlin</b> published an essay with this title. She did not blame a lack of talent. She asked who was allowed to train and show.",
    "Barriers|🚪|For centuries, women were often kept out of art academies and could not draw from live models. Their work was less often bought, exhibited and written about.",
    "Rewriting the story|📚|Her question led to feminist art history, which recovers forgotten artists such as Artemisia Gentileschi and Sofonisba Anguissola and asks how history is told."
  ], [
    "The essay asking this question was written by...|Linda Nochlin|Walter Benjamin|John Berger|❓",
    "Nochlin's essay appeared in...|1971|1771|1991",
    "Nochlin argued the issue was mostly about...|unequal access to training|lack of talent|bad weather",
    "Women were often kept out of art...|academies|supermarkets|libraries only",
    "Her question helped start feminist...|art history|chemistry|architecture",
    "Which artist did feminist art historians help recover?|Artemisia Gentileschi|Leonardo da Vinci|Claude Monet",
    "Women often could not draw from...|live models|a pencil|a window",
    "The essay questions how history is...|told|painted red|erased by rain"
  ], "Think of a 1971 essay that blamed institutions, not talent."));
  c.push(L("Orientalism", [
    "Edward Said's idea|📘|In his 1978 book <i>Orientalism</i>, the scholar Edward Said argued that Western writers and painters often showed \"the East\" in an exotic, stereotyped way that suited Western ideas, not real people.",
    "In painting|🎭|Many 1800s European paintings show invented scenes of the Middle East and North Africa, with costumes and settings mixed together. They made faraway lands seem mysterious or backward.",
    "Looking carefully|🔎|Ask who is painting, who is shown, and who is missing a voice. This is a <b>postcolonial</b> way of looking, one that questions power in how cultures are pictured."
  ], [
    "The 1978 book Orientalism was written by...|Edward Said|Erwin Panofsky|Clement Greenberg|📘",
    "Orientalism argues that Western art often showed the East in a...|stereotyped way|perfectly accurate way|mathematical way",
    "Orientalism was published in...|1978|1678|1878",
    "Many Orientalist paintings date from the...|1800s|1200s|2000s",
    "A postcolonial view questions...|power in how cultures are pictured|paint thickness|frame size",
    "Orientalist scenes were often...|invented or mixed up|photographs|blueprints",
    "A good question to ask is who is missing a...|voice|brush|frame",
    "Edward Said was a...|scholar|sailor|baker"
  ], "Think of a 1978 book about stereotypes in Western pictures of the East."));
  c.push(L("Akhenaten and Amarna art", [
    "A new capital|☀️|Pharaoh <b>Akhenaten</b> (reigned about 1353-1336 BCE) moved Egypt's capital to Akhetaten, now called Amarna. He promoted worship of one god, the sun disk <b>Aten</b>, shown with rays ending in tiny hands.",
    "A new style|👨‍👩‍👧|<b>Amarna art</b> breaks the old rules. Figures have long faces and necks, narrow shoulders and soft curves. Royal family scenes are relaxed, with children on laps.",
    "Nefertiti|👸|A painted limestone bust of Queen <b>Nefertiti</b> by the sculptor Thutmose (about 1345 BCE) was found at Amarna in 1912 and is now in Berlin. After Akhenaten, Egypt returned to the old gods and the old style."
  ], [
    "Akhenaten worshipped the sun disk called...|Aten|Horus|Anubis|☀️",
    "Akhenaten's new capital is today's...|Amarna|Giza|Luxor",
    "Amarna figures have long faces and...|soft curves|rigid blocks|metal armor",
    "Amarna family scenes are...|relaxed and affectionate|always formal|empty",
    "The famous bust was made by the sculptor...|Thutmose|Phidias|Brancusi",
    "The bust shows Queen...|Nefertiti|Hatshepsut|Cleopatra",
    "The Nefertiti bust was found in...|1912|1612|1998",
    "After Akhenaten, Egypt went back to the...|old gods and style|Greek style|Roman style"
  ], "Think of the sun-disk pharaoh who changed Egyptian art."));
  c.push(L("Ara Pacis and Roman propaganda", [
    "Altar of Peace|🕊️|The <b>Ara Pacis</b> (\"Altar of Peace\") was dedicated in Rome in 9 BCE to honor the peace brought by Emperor <b>Augustus</b>. The marble walls are covered with carved reliefs.",
    "A procession|👪|One side shows a procession of the imperial family, including children. The figures look natural and walk as if in real life, a mix of Greek style and Roman portrait truth.",
    "Message in marble|📣|Art that spreads a ruler's message is called <b>propaganda</b>. Plants and fruit on the panels suggest a land at peace, blessed with growth under Augustus."
  ], [
    "Ara Pacis means...|Altar of Peace|Arch of Power|House of Mirrors|🕊️",
    "The Ara Pacis honors Emperor...|Augustus|Nero|Constantine",
    "It was dedicated in Rome in...|9 BCE|909 CE|1509 CE",
    "Carved scenes on a wall like those on the altar are...|reliefs|mosaics|tapestries",
    "Art that spreads a ruler's message is...|propaganda|abstraction|notan",
    "One side shows a procession of the...|imperial family|Olympic athletes|tourists",
    "Plants and fruit on the panels suggest...|peace and plenty|famine|winter war",
    "The Ara Pacis is made of...|marble|bronze|glass"
  ], "Think of a marble altar celebrating peace under Augustus."));
  c.push(L("Nike of Samothrace and Hellenistic art", [
    "After Alexander|🌊|The <b>Hellenistic</b> period (323-31 BCE) began after Alexander the Great died. Greek style spread across a huge area, and artists favored drama, emotion and movement.",
    "Winged Victory|🪽|The <b>Nike of Samothrace</b> (about 190 BCE) shows the goddess of victory landing on the prow of a ship. Her robes ripple in the wind, though her head and arms are missing.",
    "Where to see it|🏛️|It was found on the island of Samothrace in 1863 and stands today at the top of a grand staircase in the Louvre in Paris."
  ], [
    "The Hellenistic period began after the death of...|Alexander the Great|Augustus|Charlemagne|🌊",
    "The Nike of Samothrace shows the goddess of...|victory|the sea|wisdom",
    "The goddess seems to land on the prow of a...|ship|horse|mountain",
    "Her clothing looks like it is blowing in the...|wind|dark|mirror",
    "The statue is now in the museum called the...|Louvre|Prado|Uffizi",
    "Hellenistic art favored drama and...|emotion|silence only|simple squares",
    "The statue was found in...|1863|1263|1963",
    "Nike is the Greek word for...|victory|marble|water"
  ], "Think of a winged goddess landing on a ship."));
  c.push(L("Reliquaries and pilgrimage", [
    "Journeys to holy places|🚶|In medieval Europe, pilgrims walked long roads to shrines. The most famous route led to Santiago de Compostela in Spain. Churches along the way grew rich and built big new buildings.",
    "Relics|📿|A <b>relic</b> is a saint's remains or belongings. It is kept in a <b>reliquary</b>, a precious container. At Conques, France, the golden statue of Saint Foy holds her relic and is covered in gems.",
    "Built for crowds|⛪|Pilgrimage churches added an <b>ambulatory</b>, a walkway around the apse, so many visitors could circle past the shrines without disturbing services."
  ], [
    "A saint's remains or belongings are called a...|relic|mosaic|fresco|🚶",
    "A precious container for a relic is a...|reliquary|palette|sarcophagus",
    "A walkway curving around the apse is the...|ambulatory|narthex|nave",
    "The most famous pilgrimage route led to Santiago de...|Compostela|Cordoba|Cusco",
    "The golden statue of Saint Foy is at...|Conques|Giza|Kyoto",
    "Pilgrimage churches were designed to handle large...|crowds|tigers|cars",
    "Pilgrims in medieval Europe often traveled by...|walking|flying|train",
    "Churches on pilgrim roads often became...|rich and large|empty|underwater"
  ], "Think of golden containers for sacred remains."));
  c.push(L("Arabic calligraphy styles", [
    "Beautiful writing|✒️|Calligraphy is the highest art in the Islamic world because it carries the words of the Qur'an. Over time scribes developed several named scripts.",
    "Four famous scripts|🖋️|<b>Kufic</b> is angular and geometric, used in early Qur'ans and on buildings. <b>Naskh</b> is rounded and easy to read. <b>Thuluth</b> is large and graceful, often seen in mosque inscriptions. <b>Nastaliq</b> is a flowing, slanted Persian script.",
    "Measured beauty|📏|The scribe Ibn Muqla (died 940) set rules for proportion using the letter alif and the diamond-shaped dot made by the pen. Calligraphers use a reed pen, called a <b>qalam</b>."
  ], [
    "The angular geometric script is...|Kufic|Nastaliq|Naskh|✒️",
    "The rounded and easy-to-read script is...|Naskh|Kufic|Thuluth",
    "A flowing slanted Persian script is...|Nastaliq|Kufic|Naskh",
    "A large graceful script used in mosque inscriptions is...|Thuluth|Kufic|Nastaliq",
    "The pen of a calligrapher is called a...|qalam|brayer|burin",
    "Which scribe set rules of proportion?|Ibn Muqla|Sinan|Fan Kuan",
    "The pen is usually cut from a...|reed|steel bar|paper tube",
    "Calligraphy is so valued because it carries the words of the...|Qur'an|stock market|weather report"
  ], "Think of four famous Arabic scripts and a pen cut from a reed."));
  c.push(L("Teotihuacan", [
    "A city of pyramids|🌄|<b>Teotihuacan</b>, near today's Mexico City, was one of the largest cities in the world around 400-500 CE, with perhaps over 100,000 people. Its name, from the Aztec language, means \"place where the gods were created.\"",
    "Planned in a grid|📐|The city was laid out on a grid along the broad <b>Avenue of the Dead</b>. The huge <b>Pyramid of the Sun</b> and <b>Pyramid of the Moon</b> stand along it.",
    "Painted walls|🐆|Walls of apartment compounds were covered in colorful murals of jaguars, birds and priests. The Aztecs found the empty city centuries later and named it."
  ], [
    "Teotihuacan is near today's...|Mexico City|Lima|Madrid|🌄",
    "The wide road through the city is the Avenue of the...|Dead|Sun|Moon",
    "The two big pyramids are named for the Sun and the...|Moon|Stars|Wind",
    "The name Teotihuacan comes from the...|Aztec language|Latin language|Greek language",
    "The city was laid out on a...|grid|spiral|zigzag",
    "Walls were decorated with murals of jaguars and...|birds|spaceships|skyscrapers",
    "Teotihuacan was at its biggest about...|400-500 CE|1400-1500 CE|2000 BCE",
    "The Aztecs found the city...|already empty|brand new|under snow"
  ], "Think of a planned city of pyramids near Mexico City."));
  c.push(L("The Munsell color system", [
    "Three dimensions|🌈|Albert Munsell (1858-1918), an American artist and teacher, described every color by three numbers: <b>hue</b> (the color family), <b>value</b> (lightness) and <b>chroma</b> (purity or strength).",
    "The color tree|🌳|In the Munsell tree, hue goes around the trunk, value goes up from black (0) to white (10) and chroma stretches outward like branches. Brighter colors have a higher chroma.",
    "Measuring color|📏|Munsell tried to space colors in equal visual steps. His system was used in science, soil studies, art and industry, and its 1905 book made color talk exact."
  ], [
    "Munsell described color by hue, value and...|chroma|weight|texture|🌈",
    "In the Munsell system, value means...|lightness|temperature|sweetness",
    "Chroma tells how pure or strong a color is, its...|purity|weight|age",
    "On the Munsell scale, value 0 is...|black|white|gray",
    "Value 10 is...|white|black|red",
    "Albert Munsell was an American...|artist and teacher|astronaut|pirate",
    "In the Munsell tree, hue goes...|around the trunk|up the branch|to the roots only",
    "The system was used in art, industry and...|soil studies|ice skating|cooking contests"
  ], "Think of a color tree with three measurements."));
  c.push(L("Dieter Rams and good design", [
    "Less but better|📻|<b>Dieter Rams</b> (born 1932) is a German designer who led design at the company Braun. His radios, clocks and calculators look simple, clear and calm.",
    "Ten principles|🔟|He wrote ten principles of good design. Good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally friendly and has as little design as possible.",
    "Honest and useful|🛠️|<b>Honest</b> means it does not pretend to be more powerful or valuable than it is. His motto was \"Less, but better.\" Many later designers have been inspired by his work."
  ], [
    "Dieter Rams worked for the company...|Braun|Disney|Nike|📻",
    "He came from which country?|Germany|Brazil|Japan",
    "His motto was \"Less, but better\", meaning...|simple and well made|crowded and loud|ornate and heavy",
    "How many principles of good design did he list?|Ten|Two|One hundred",
    "In his view, honest design...|does not pretend to be more than it is|hides what it does|exaggerates its power",
    "Good design should be long-lasting and...|environmentally friendly|quickly thrown away|full of ornament",
    "Rams designed radios, clocks and...|calculators|jets|castles",
    "His designs look simple, clear and...|calm|chaotic|spiky"
  ], "Think of ten principles and a motto about less."));
  c.push(L("Swiss style and the grid", [
    "A clear system|📐|The <b>Swiss style</b> (International Typographic Style) began in 1950s Switzerland. It uses a strict <b>grid</b>, clean sans-serif type, plenty of white space and photographs instead of illustrations.",
    "Helvetica|🔤|The typeface <b>Helvetica</b> (1957, by Max Miedinger) became a symbol of the style: neutral, clear and easy to read. Text is often set flush left with a ragged right edge.",
    "Poster pioneer|🎼|Josef Muller-Brockmann made concert posters for the Zurich Tonhalle, using geometric shapes and type arranged on a grid to suggest rhythm and music."
  ], [
    "The Swiss style began in which country?|Switzerland|Brazil|Japan|📐",
    "It organizes layouts on a strict...|grid|spiral|zigzag",
    "Helvetica was created in...|1957|1857|1997",
    "Swiss style likes type that is...|sans-serif and clear|ornate and curly|handwritten only",
    "Josef Muller-Brockmann made posters for concerts in...|Zurich|Tokyo|Havana",
    "Swiss style often uses photographs instead of...|illustrations|paper|margins",
    "Text is often set flush left and...|ragged right|justified in boxes|upside down",
    "Swiss style also leaves plenty of...|white space|clutter|neon"
  ], "Think of grids, white space and a famous neutral typeface."));
  c.push(L("Encaustic painting", [
    "Hot wax paint|🕯️|<b>Encaustic</b> is paint made of melted beeswax, colored pigment and sometimes a resin. It is applied hot and then fused with heat so the layers join.",
    "Ancient examples|🪞|The Fayum mummy portraits, painted in Egypt in the first to third centuries CE, are among the oldest known encaustic paintings. They have lasted about 2,000 years.",
    "A modern master|🇺🇸|Jasper Johns used encaustic in <b>Flag</b> (1954-55), pairing wax with strips of newspaper. Artists need a warm palette, a heat tool and good ventilation."
  ], [
    "Encaustic paint is made with melted...|beeswax|chocolate|ice|🕯️",
    "Layers of encaustic are joined by...|heating (fusing)|freezing|soaking",
    "The Fayum portraits come from...|Egypt|Norway|Japan",
    "They are about how old?|2,000 years|20 years|200,000 years",
    "Which artist used encaustic in Flag?|Jasper Johns|Rembrandt|Georgia O'Keeffe",
    "Johns combined wax with strips of...|newspaper|bricks|glass",
    "Encaustic work needs good...|ventilation|silence|snow",
    "Encaustic is applied...|hot|frozen|under water"
  ], "Think of paint made with melted wax."));
  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[6], c[8], c[9], c[11], c[12], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 27 Challenge", [c[1], c[3], c[5], c[7], c[10], c[12], c[13], c[14], c[15], c[16], c[17]]));

  Object.assign(ART_LEVELS, { 25: a, 26: b, 27: c });
})();
