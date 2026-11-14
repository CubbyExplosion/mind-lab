// ext/art-16-18.js  Art & Drawing levels 16-18
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // item string: question|answer|wrong1,wrong2|visual   (no commas inside answers)
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

  // ================= LEVEL 16 =================
  const a = [];
  a.push(L("Chiaroscuro", [
    "Light and dark|🌓|<b>Chiaroscuro</b> (kee-AR-oh-SKOO-roh) is an Italian word. <b>Chiaro</b> means light and <b>scuro</b> means dark. It is a strong contrast of light and dark.",
    "Looks 3D|🕯️|Bright light next to deep shadow makes shapes pop out and look solid, like they are lit by a candle or a spotlight.",
    "Caravaggio|🎭|The Italian painter <b>Caravaggio</b> (around 1600) used a dramatic spotlight against a dark background. The extreme dark style is called <b>tenebrism</b>. Rembrandt used strong light and dark too."
  ], [
    "Chiaroscuro is a strong contrast between...|light and dark|warm and cool|big and small|🌓",
    "In Italian, chiaro means...|light|heavy|round",
    "In Italian, scuro means...|dark|bright|soft",
    "Chiaroscuro helps shapes look...|three-dimensional|flat|invisible|🕯️",
    "Which Italian painter around 1600 was famous for dramatic spotlight lighting?|Caravaggio|Mondrian|Kusama|🎭",
    "Painting with a very dark background and a bright spotlight is called...|tenebrism|pointillism|cubism",
    "Which painter you may know used strong light and dark in portraits?|Rembrandt|Matisse|Magritte",
    "To practice chiaroscuro at home, light a simple object with...|one strong lamp|many colored lights|no light at all"
  ], "Think about a bright spotlight on a dark stage."));
  a.push(L("Figures from simple forms", [
    "Mannequin|🪆|Artists often draw a person by first building a simple <b>mannequin</b> out of basic forms. This helps get the pose and size right.",
    "Basic forms|🥚|The head is a sphere or an egg, the ribcage is an egg or box, and arms and legs are cylinders. Joints like knees and elbows are small balls.",
    "Line of action|〰️|Start with one flowing curve, the <b>line of action</b>, that shows the pose's main direction. Add forms next and details last."
  ], [
    "A wooden figure artists use to pose a person is a...|mannequin|palette|easel|🪆",
    "In a simple figure, the head is often drawn as a...|sphere|triangle|zigzag",
    "Arms and legs can first be drawn as...|cylinders|stars|spirals",
    "The ribcage can be drawn as an...|egg or box shape|ring|spiral",
    "A flowing line showing the main direction of a pose is the...|line of action|horizon|border|〰️",
    "Knees and elbows can be drawn as small...|balls|flags|stripes",
    "Why start with simple forms before details?|To get the pose and size right|To save paint|To hide the pencil",
    "A good order for drawing a figure is...|gesture then forms then details|details then forms then gesture|color first and nothing else"
  ], "Think about building a person from basic shapes."));
  a.push(L("Color symbolism across cultures", [
    "Meanings change|🌍|A color can mean different things in different cultures. Artists and designers learn what a color means to the people who will see it.",
    "Examples|🧧|In China, red often means luck and celebration. In several East Asian cultures white is linked with mourning. Gold often suggests wealth or something holy.",
    "Purple and power|👑|In old Europe, purple dye came from sea snails and cost a fortune, so purple became a color of kings and queens."
  ], [
    "In China, the color red often means...|luck and celebration|sadness|silence|🧧",
    "In several East Asian cultures, which color can be linked with mourning?|white|red|orange",
    "Purple became a royal color in old Europe because the dye was...|very expensive|free|made from grass|👑",
    "The same color can mean different things in different...|cultures|crayons|weekdays",
    "Gold often suggests...|wealth or holiness|trash|cold weather",
    "A stop sign is red because red suggests...|danger or stop|sleep|summer",
    "Before using a color symbol for people far away, a designer should...|check what it means to them|just guess|hide the color",
    "Blue is often used by banks and hospitals to feel...|calm and trusted|angry and loud|messy"
  ], "Think about where the people live who will see the color."));
  a.push(L("Rococo", [
    "After Baroque|🐚|<b>Rococo</b> began in France in the early 1700s, after the heavy, dramatic Baroque style. The name comes from the French word <b>rocaille</b>, rock and shell decoration.",
    "Light and playful|🎀|Rococo art uses soft pastel colors, curving lines and lots of decoration. Rooms were covered in curls, shells and gold trim.",
    "Painters|🖼️|Artists like Jean-Honore Fragonard and Francois Boucher painted cheerful garden scenes in this style."
  ], [
    "Rococo began in the early 1700s in...|France|Egypt|Canada|🐚",
    "Rococo colors are usually...|soft pastels|dark and heavy|only black and white",
    "Rococo decoration often uses...|shells and curves|machine parts|plain boxes",
    "Rococo came after the ___ style.|Baroque|Pop art|Cubist",
    "The mood of Rococo is...|light and playful|grim and gloomy|cold and plain|🎀",
    "Which artist painted cheerful Rococo scenes?|Fragonard|Pollock|Warhol",
    "The word rococo comes from the French word for...|rock and shell decoration|iron|winter",
    "Compared with Baroque, Rococo feels...|lighter and more playful|darker and heavier|more square"
  ], "Think light, soft and decorated."));
  a.push(L("Neoclassicism", [
    "New old style|🏛️|<b>Neoclassicism</b> (late 1700s to early 1800s) means new classical. Artists copied the calm, clear look of ancient Greece and Rome.",
    "Order|📐|Neoclassical art has clean lines, balance, and columns. It was a reaction to the curvy, busy Rococo style.",
    "Buildings|🇺🇸|Many government buildings, like the US Capitol, use columns and domes in this style. The French painter Jacques-Louis David and the Italian sculptor Antonio Canova were neoclassical artists."
  ], [
    "Neoclassical artists were inspired by ancient...|Greece and Rome|Mars|Canada|🏛️",
    "Neoclassical art looks...|calm and orderly|wild and messy|blurry and dreamy",
    "A feature common in neoclassical buildings is...|columns|neon signs|glass boxes",
    "Neoclassicism was a reaction to...|Rococo|Pop art|Fauvism",
    "Which French painter was a leader of Neoclassicism?|Jacques-Louis David|Joan Miro|Yayoi Kusama",
    "Which Italian sculptor worked in the neoclassical style?|Antonio Canova|Alexander Calder|Henry Moore",
    "Neoclassical lines are usually...|clean and clear|loose and wobbly|hidden",
    "The US Capitol building with its dome and columns is an example of...|neoclassical style|Pop art|Futurism|🇺🇸"
  ], "Think of ancient temples with columns."));
  a.push(L("Realism: Courbet and Millet", [
    "Real life|🌾|<b>Realism</b> began in France in the 1800s. Artists painted ordinary people and everyday work, not kings or myths.",
    "Gustave Courbet|🎨|Courbet said he would paint only what he could really see. He painted workers, countryside and ordinary scenes at full size.",
    "Millet|👩‍🌾|Jean-Francois Millet painted farm workers. In <i>The Gleaners</i> poor women pick up leftover grain after the harvest, and he gave them dignity."
  ], [
    "Realism painted mostly...|ordinary people and daily life|dragons and gods|only abstract shapes|🌾",
    "Realism began in the 1800s in...|France|Australia|Brazil",
    "Which artist said he would paint only what he could see?|Gustave Courbet|Henri Rousseau|Paul Klee",
    "Which painter is known for farm workers like The Gleaners?|Jean-Francois Millet|Vincent van Gogh|Piet Mondrian",
    "In The Gleaners, the women are picking up...|leftover grain|apples|seashells|👩‍🌾",
    "Realist art shows people as...|dignified and real|magic and floating|tiny dots",
    "Before Realism, much art showed kings, saints and...|myths|farm work|everyday shopping",
    "Realist artists wanted pictures to be...|true to life|just made-up fantasy|only gold"
  ], "Think about what the artists chose to paint."));
  a.push(L("Berthe Morisot", [
    "French Impressionist|🌸|<b>Berthe Morisot</b> (1841-1895) was a French painter. She helped start the Impressionist group and showed in their very first exhibition in 1874.",
    "Her subjects|🌿|She painted family, gardens and daily life with quick, light brushstrokes. She was not welcome in some official art schools, so she studied with private teachers.",
    "Impressionism|☀️|Impressionists painted fast to catch changing light. The name came from Claude Monet's painting <i>Impression, Sunrise</i>."
  ], [
    "Berthe Morisot was a painter from...|France|Mexico|Egypt",
    "Morisot showed in the first Impressionist exhibition in...|1874|1624|1974",
    "Morisot often painted...|family and garden scenes|battle scenes|robots",
    "Her brushstrokes were...|quick and light|slow and hidden|only straight",
    "Impressionists painted quickly to capture...|changing light|tiny details|rules from schools|☀️",
    "The name Impressionism came from a painting by...|Claude Monet|Pablo Picasso|Frida Kahlo",
    "Morisot was one of the first major women in...|Impressionism|Pop art|Minimalism",
    "Impressionist painters often worked...|outdoors|only in the dark|only from photos"
  ], "Think of quick, bright brushstrokes of everyday life."));
  a.push(L("Winslow Homer", [
    "American painter|🌊|<b>Winslow Homer</b> (1836-1910) was an American artist famous for powerful pictures of the sea and the outdoors.",
    "Watercolor|🖌️|He used fast, bright watercolors to catch weather and water. Later he lived on the rocky coast of Maine and painted waves crashing on rocks.",
    "Everyday life|🎈|Homer also painted children and country life. In <i>Snap the Whip</i>, boys play a running game in a field."
  ], [
    "Winslow Homer was an artist from...|the United States|Spain|Japan|🌊",
    "Homer is most famous for paintings of the...|sea|tall skyscrapers|outer space",
    "Homer lived later in life on the coast of...|Maine|Kansas|Nevada",
    "In Snap the Whip, boys are playing...|a running game|chess|a violin",
    "A paint Homer used for fast, bright sea scenes was...|watercolor|neon spray|charcoal only",
    "Homer's sea paintings show the power of...|waves and weather|robots|city lights",
    "Watercolor helped him...|capture a mood quickly|hide his work|avoid color",
    "Which subject did Homer paint a lot besides the sea?|Children and country life|Space travel|Cartoon animals"
  ], "Think of waves, weather and the coast."));
  a.push(L("Mesopotamian art", [
    "Between two rivers|🏺|<b>Mesopotamia</b> means land between rivers, the Tigris and the Euphrates, in what is now Iraq. It is one of the first places with cities and writing.",
    "Writing and seals|📜|People pressed wedge shapes into clay tablets. This writing is called <b>cuneiform</b>. Small <b>cylinder seals</b> were rolled over wet clay to print a picture.",
    "Big buildings|🏯|A <b>ziggurat</b> was a stepped temple tower. In Babylon the Ishtar Gate was covered in bright blue glazed bricks with animal pictures."
  ], [
    "Mesopotamia means land between two...|rivers|mountains|oceans|🏺",
    "Wedge-shaped writing in clay is called...|cuneiform|calligraphy|graffiti",
    "Cylinder seals were rolled over...|wet clay|paper|glass",
    "A stepped temple tower in Mesopotamia was a...|ziggurat|pagoda|igloo|🏯",
    "The Ishtar Gate was covered in bright blue...|glazed bricks|paper|snow",
    "Mesopotamia is in what is now mostly...|Iraq|Norway|Peru",
    "Which two rivers were important in Mesopotamia?|Tigris and Euphrates|Nile and Amazon|Thames and Seine",
    "People wrote on tablets made of...|clay|plastic|metal sheets|📜"
  ], "Think about clay tablets, rivers and stepped towers."));
  a.push(L("Chinese bronzes and jade", [
    "Ritual bronzes|🔔|Over 3,000 years ago, in the Shang dynasty, Chinese artists cast beautiful bronze vessels used in ceremonies. They poured melted metal into clay molds made in pieces.",
    "Jade|💚|<b>Jade</b> is a very hard stone. It cannot be easily cut, so carvers ground it slowly with sand and tools. Jade was loved for its beauty and was a symbol of purity and virtue.",
    "Patterns|🐉|Bronze and jade pieces often had animal designs such as dragons and birds, and swirling patterns."
  ], [
    "Shang dynasty artists cast ceremony vessels from...|bronze|paper|ice|🔔",
    "Bronze vessels were cast in clay...|molds|ovens made of ice|pencils",
    "Jade is a very ___ stone.|hard|soft|sticky|💚",
    "Jade was carved by slowly grinding it with...|sand|water balloons|crayons",
    "In China, jade was a symbol of...|purity and virtue|noise|speed",
    "Chinese bronze and jade often show animals such as...|dragons|spaceships|cars|🐉",
    "The Shang dynasty was more than ___ years ago.|3000|30|300",
    "Shang bronzes were used mostly in...|ceremonies|video games|sports"
  ], "Think about hard stone and cast metal."));
  a.push(L("The Alhambra", [
    "Palace in Spain|🕌|The <b>Alhambra</b> is a palace and fortress in Granada, Spain. Most of it was built in the 1200s and 1300s under the Nasrid rulers.",
    "Patterns everywhere|🔷|Walls are covered in geometric tiles, carved plaster, flowing plant patterns called <b>arabesques</b> and beautiful writing. Honeycomb ceilings are called <b>muqarnas</b>.",
    "Water|⛲|Pools and fountains cool the courtyards and mirror the arches. The Court of the Lions has a fountain held up by twelve stone lions."
  ], [
    "The Alhambra is in the country of...|Spain|Italy|India|🕌",
    "The Alhambra is in the city of...|Granada|Paris|Cairo",
    "Flowing plant patterns used in Islamic art are called...|arabesques|stencils|mobiles",
    "Honeycomb-like ceilings are called...|muqarnas|ziggurats|mosaics|🔷",
    "The Alhambra walls are covered with geometric...|tiles and carvings|neon signs|photographs",
    "The Court of the Lions has a fountain held by twelve...|stone lions|bronze birds|glass horses|⛲",
    "Pools in the Alhambra courtyards help to...|cool the air and reflect arches|grow fish to sell|hide the walls",
    "The Alhambra was built in the 1200s and...|1300s|1800s|1900s"
  ], "Think about tiles, patterns, water and a palace in Spain."));
  a.push(L("Kingdom of Benin art", [
    "Benin Kingdom|👑|The <b>Kingdom of Benin</b> was a powerful West African kingdom, in the south of what is now Nigeria. Its king was called the <b>Oba</b>.",
    "Brass plaques|🔶|Skilled guild artists cast brass and bronze plaques with the lost-wax method. The plaques decorated the royal palace and showed court life, leaders and events.",
    "Today|🏛️|Benin artworks are now in museums around the world. Many people think they should be returned to Nigeria, and some have been."
  ], [
    "The Kingdom of Benin was in what is now...|Nigeria|Norway|Mexico|👑",
    "The king of Benin was called the...|Oba|Pharaoh|Shogun",
    "Benin artists cast plaques from brass and...|bronze|clay only|wood only",
    "The casting method used was...|lost-wax casting|screen printing|origami|🔶",
    "The plaques showed scenes from...|court life|outer space|cartoons",
    "Benin artists worked in skilled groups called...|guilds|bands|teams of robots",
    "Today many Benin artworks are...|in museums around the world|lost forever|made of paper",
    "Benin is a kingdom in which part of the world?|West Africa|South America|Northern Europe"
  ], "Think of royal brass plaques from West Africa."));
  a.push(L("Japanese gardens and Zen art", [
    "Dry gardens|🪨|A <b>karesansui</b> is a dry rock garden. Gravel is raked into lines that look like water ripples, and rocks stand for islands or mountains.",
    "Zen ideas|🧘|Zen art loves simplicity, quiet and empty space. The gap between things is as important as the things themselves.",
    "Ryoan-ji|🌿|The famous Ryoan-ji garden in Kyoto has fifteen rocks on raked gravel. From any one spot you cannot see all fifteen at once."
  ], [
    "A Japanese dry rock garden is called a...|karesansui|ziggurat|mandala|🪨",
    "Raked gravel in a dry garden looks like...|water ripples|snow angels|grass",
    "Rocks in a dry garden can stand for...|islands or mountains|cars|clouds of paint",
    "Zen art loves...|simplicity and empty space|crowded decoration|bright neon",
    "The famous Ryoan-ji garden has how many rocks?|15|3|100|🌿",
    "Ryoan-ji is in the Japanese city of...|Kyoto|Sydney|Madrid",
    "In Zen art, empty space is...|as important as the objects|a mistake|always filled in",
    "A dry garden is a sort of...|calm place for thinking|sports field|market"
  ], "Think of raked gravel, stones and quiet."));
  a.push(L("Thumbnail sketches", [
    "Small and fast|🔍|A <b>thumbnail sketch</b> is a tiny, quick drawing, often only a few centimeters wide. It is used to plan a bigger picture.",
    "Try many|🗂️|Artists draw many thumbnails to test different layouts, crops and light and dark patterns before starting. Cheap mistakes are easy to fix.",
    "Pick the best|✅|Keep thumbnails simple with 3 values: light, medium and dark. Then choose the strongest design for the final piece."
  ], [
    "A tiny, quick planning drawing is a...|thumbnail sketch|mural|sculpture|🔍",
    "Thumbnails are used to plan a...|bigger picture|bridge|speech only",
    "Artists draw several thumbnails to test different...|layouts|brands of paper|signatures",
    "Thumbnails should be kept...|simple|detailed and slow|colored with every shade",
    "A simple thumbnail can use 3 values: light medium and...|dark|rainbow|glitter|🗂️",
    "Mistakes in thumbnails are...|easy to fix|very costly|impossible",
    "After drawing thumbnails, you should...|pick the strongest design|erase them all|only keep the first",
    "Thumbnails help you decide the...|composition|artist's age|price of paint"
  ], "Think about planning small before working big."));
  a.push(L("Layouts and grids", [
    "Grid|📏|A <b>grid</b> is an invisible set of columns and rows that designers use to line up text and pictures on a page.",
    "Parts|🧱|<b>Margins</b> are the empty edges. <b>Gutters</b> are the gaps between columns. <b>Alignment</b> means lining things up on the same edge.",
    "White space|⬜|Empty space, called <b>white space</b>, gives the eye a rest and makes a page easy to read."
  ], [
    "Invisible columns and rows used to arrange a page are a...|grid|palette|easel|📏",
    "The empty edges around a page are the...|margins|gutters|captions",
    "The gaps between columns are called...|gutters|margins|frames",
    "Lining up things on the same edge is...|alignment|contrast|pixelation",
    "Empty space on a page is called...|white space|noise|filler|⬜",
    "White space helps a page be...|easy to read|harder to read|messy",
    "Using a grid makes a layout look...|organized|random|accidental",
    "Magazines and websites use grids to...|keep a neat structure|hide pictures|add errors"
  ], "Think about lining things up neatly on a page."));
  a.push(L("Infographics", [
    "Information in pictures|📊|An <b>infographic</b> uses pictures, charts and short text to explain facts quickly.",
    "Design rules|🧭|Use icons, a few colors, clear labels and a strong title. Show the most important number biggest.",
    "Honest|✔️|Good infographics are accurate. They keep scales fair, and they tell where the facts came from."
  ], [
    "A design that explains facts with pictures, charts and short text is an...|infographic|abstract painting|mosaic|📊",
    "Infographics use small pictures called...|icons|stencils|chisels",
    "The most important number should be shown...|biggest|hidden|smallest",
    "A good infographic uses...|few clear colors|every color at once|no labels",
    "A good infographic should be...|accurate|made up|blurry|✔️",
    "It is good practice to say where your facts...|came from|were not found|were lost",
    "Short text and charts help people understand...|quickly|slowly|never",
    "Bars in a bar chart should start at...|zero for fair comparison|any random number|the page edge only"
  ], "Think about showing facts clearly and honestly."));
  a.push(L("Relief sculpture", [
    "Carved on a surface|🪙|A <b>relief</b> is a sculpture that stays attached to a flat background. The figures stick out from the surface.",
    "Low and high|📐|<b>Bas-relief</b> (low relief) rises only a little, like the picture on a coin. <b>High relief</b> sticks out so much that parts can almost stand free.",
    "Famous examples|🏛️|Ancient Greek temples such as the Parthenon had relief carvings. Many cultures carved reliefs on walls, doors and gravestones."
  ], [
    "A sculpture attached to a flat background is a...|relief|mobile|statue in the round|🪙",
    "A low relief only rises a ___ from the surface.|little|mile|ton",
    "The picture on a coin is a good example of...|low relief|a mobile|pottery",
    "In high relief, figures stick out...|a lot|never|not at all",
    "The Parthenon in Greece had carvings in...|relief|plastic|neon|🏛️",
    "Another name for low relief is...|bas-relief|haut-wall|flat-line",
    "Relief sculpture can be found on walls...|and doors|only in outer space|only in books",
    "A sculpture you can walk all around is not a...|relief|statue|figure"
  ], "Think about carving pictures that stay on a wall."));
  a.push(L("Quilts and embroidery", [
    "Quilts|🧵|A <b>quilt</b> has three layers, a top, a soft middle called batting and a back, stitched together. Patchwork top pieces are sewn from scraps in patterns.",
    "Gee's Bend|🏡|The quilters of Gee's Bend, a small community in Alabama, made bold, modern-looking quilts that are now in famous museums.",
    "Embroidery|🪡|<b>Embroidery</b> is decorating fabric with a needle and thread. Many cultures stitch flowers, animals and stories into clothing and cloth."
  ], [
    "A quilt has how many layers?|3|1|9|🧵",
    "The soft middle layer of a quilt is called...|batting|canvas|gesso",
    "Patchwork is made by sewing together...|scraps of fabric|panes of glass|sheets of metal",
    "The quilters of Gee's Bend lived in...|Alabama|Alaska|Arizona",
    "Decorating fabric with needle and thread is...|embroidery|printmaking|etching|🪡",
    "Embroidery can show flowers, animals and...|stories|nothing at all|only numbers",
    "Gee's Bend quilts are now shown in...|museums|only on trees|nowhere",
    "Quilts are held together by...|stitches|paint|staples of steel"
  ], "Think about fabric, needles and thread."));

  a.push(MIX("Mixed practice", [a[0], a[1], a[3], a[4], a[6], a[8], a[11], a[13], a[15]]));
  a.push(MIX("Level 16 Challenge", [a[2], a[5], a[7], a[9], a[10], a[12], a[14], a[16], a[17], a[18]]));

  // ================= LEVEL 17 =================
  const b = [];
  b.push(L("Gestalt principles", [
    "Whole before parts|🧠|<b>Gestalt</b> is a German word for shape or form. Gestalt ideas explain how our brain sees a whole picture before it sees the parts.",
    "Four rules|🔵|<b>Proximity</b>: things close together look like a group. <b>Similarity</b>: things alike look like a group. <b>Closure</b>: the brain fills in gaps. <b>Continuity</b>: the eye follows a smooth path.",
    "Figure and ground|⬛|The <b>figure</b> is the main shape we notice. The <b>ground</b> is the background behind it. Designers use these ideas to guide the eye."
  ], [
    "Things that are close together look like a group. This is...|proximity|closure|rhythm|🔵",
    "Things that look alike seem to belong together. This is...|similarity|continuity|scale",
    "When your brain fills in a missing part of a shape, it is...|closure|contrast|gradation",
    "Gestalt is a word from which language?|German|Latin|Japanese",
    "The main shape we notice is called the...|figure|margin|palette",
    "The background behind the main shape is the...|ground|figure|border",
    "A dotted line looks like a smooth path because of...|continuity|texture|pigment",
    "A designer groups buttons close together because of...|proximity|gravity|brightness"
  ], "Think about how the brain groups shapes."));
  b.push(L("Visual hierarchy", [
    "What first?|👀|<b>Visual hierarchy</b> means arranging things so the eye sees the most important thing first, then the next, and so on.",
    "Tools|🔠|Designers use size, color contrast, position and white space. A big bold title is read before small text.",
    "Test it|🔍|Squint at your design or step back. The first thing you see should be what matters most."
  ], [
    "Arranging things so the eye sees the most important first is...|visual hierarchy|collage|stippling|👀",
    "A bigger heading is usually read...|before small text|after small text|never",
    "A high-contrast color makes a thing stand out...|more|less|no differently",
    "Which helps the eye rest and see what matters?|White space|More clutter|Smaller margins",
    "Important items are often placed...|near the top|hidden in a corner|in the page fold",
    "To test hierarchy, you can...|squint at the design|erase the title|add more words|🔍",
    "If everything is bold and big, the hierarchy is...|weak|strong|invisible",
    "A button that should be clicked is often given...|a bright contrasting color|the same color as the page|no label"
  ], "Think about what your eye lands on first."));
  b.push(L("Portrait lighting", [
    "Light direction|💡|Where the light comes from changes how a face looks. <b>Front light</b> is flat. <b>Side light</b> makes shadows and shows the shape of the face.",
    "Rembrandt lighting|🔺|With <b>Rembrandt lighting</b>, the light comes from the side and a little above. It leaves a small triangle of light on the cheek in shadow.",
    "Soft or hard|🌥️|<b>Soft light</b> (like cloudy weather) has gentle shadows. <b>Hard light</b> (like direct sun) has sharp shadows. A light from behind can make a <b>silhouette</b>."
  ], [
    "Light from directly in front of a face makes it look...|flat|very dramatic|invisible|💡",
    "Light from the side shows the...|shape of the face|brand of camera|weather forecast",
    "Rembrandt lighting leaves a small triangle of light on the...|cheek|shoe|ceiling|🔺",
    "Soft light, like on a cloudy day, has...|gentle shadows|sharp black shadows|no light",
    "Hard light, like direct sun, has...|sharp shadows|no shadows|only colors",
    "A person lit only from behind can look like a...|silhouette|rainbow|mosaic",
    "In Rembrandt lighting, the light comes from the side and a little...|above|below the floor|inside",
    "To get dramatic shadows on a face, use light from the...|side|exact front|nowhere"
  ], "Think about where the light comes from."));
  b.push(L("Drawing animals", [
    "Shapes first|🐕|Start any animal with basic shapes: ovals for the body and head, and cylinders for legs. Then connect them.",
    "Animal anatomy|🦴|The backward bend in a dog's back leg is the animal's ankle, called the hock. A bird's wing is like a human arm. Learning the bones helps you draw natural poses.",
    "Fur and eyes|🐈|Draw fur in the direction it grows, with short quick strokes. In a side view, you usually see just one eye."
  ], [
    "A good first step in drawing an animal is...|basic shapes like ovals|tiny whiskers|a final shadow|🐕",
    "The backward-bending joint in a dog's back leg is like our...|ankle|elbow|neck",
    "A bird's wing is like a human...|arm|knee|toe|🦴",
    "Fur should be drawn in the direction it...|grows|never grows|dries",
    "In a side view of most animals you see how many eyes?|one|three|ten",
    "Short quick strokes are good for drawing...|fur|metal|glass",
    "Learning an animal's bones helps you draw...|natural poses|bigger paper|brighter colors",
    "Legs can first be drawn as...|cylinders|clouds|zigzags"
  ], "Think about starting with simple shapes and bones."));
  b.push(L("Arts and Crafts movement", [
    "Against factories|🌿|In the late 1800s, factories made cheap goods. The <b>Arts and Crafts movement</b> in Britain wanted well-made, handmade things instead.",
    "William Morris|🌺|<b>William Morris</b> designed wallpaper, fabric and books with patterns of leaves and flowers, such as <i>Strawberry Thief</i>.",
    "Honest craft|🔨|The movement valued skill, simple design and natural materials, and it believed beautiful things should be part of everyday life."
  ], [
    "The Arts and Crafts movement started in...|Britain|Brazil|Australia|🌿",
    "It began because of cheap goods made in...|factories|caves|trees",
    "A leader of the movement who designed patterns was...|William Morris|Pablo Picasso|Andy Warhol",
    "Morris's wallpaper patterns often show...|leaves and flowers|robots|spaceships|🌺",
    "The movement valued things that were...|handmade|made by machines only|always plastic",
    "Strawberry Thief is a famous...|textile pattern|cathedral|opera",
    "The movement believed beauty should be part of...|everyday life|museums only|factories only",
    "Arts and Crafts designs used mostly ___ materials.|natural|synthetic|radioactive"
  ], "Think about handmade patterns that answer factory products."));
  b.push(L("Symbolism", [
    "Ideas and dreams|🌙|<b>Symbolism</b> was an art movement in the late 1800s in Europe. Artists showed dreams, feelings and mysterious ideas instead of just realistic scenes.",
    "Symbols|🔑|An object can stand for an idea. A flower can mean life or beauty, and a bird can stand for freedom.",
    "Artists|🌺|Painters like Odilon Redon and Gustave Moreau used soft colors, glowing light and dream-like images. Symbolism was a reaction to Realism."
  ], [
    "Symbolism was an art movement of the late...|1800s|1200s|2000s|🌙",
    "Symbolist artists painted dreams and...|feelings|train timetables|only photos",
    "Symbolism was a reaction to...|Realism|Mosaics|Origami",
    "A symbol is an object that stands for an...|idea|price|frame",
    "A bird in art can stand for...|freedom|breakfast|math homework",
    "Which painter was a Symbolist?|Odilon Redon|Jackson Pollock|Mark Rothko",
    "Symbolist images often look...|dream-like|exactly like photos|plain and technical",
    "Symbolism was centered mostly in...|Europe|Antarctica|the Moon"
  ], "Think about dreams and ideas turned into pictures."));
  b.push(L("Abstract Expressionism and Rothko", [
    "New York in the 1940s|🗽|<b>Abstract Expressionism</b> began in New York in the 1940s and 50s. Artists made big abstract paintings full of emotion.",
    "Two paths|🎨|Some, like Jackson Pollock, used action and splashes. Others, like <b>Mark Rothko</b>, used big blocks of color.",
    "Rothko|🟥|Rothko painted tall canvases with soft-edged rectangles of glowing color. He wanted people to stand close and feel the color."
  ], [
    "Abstract Expressionism started in the city of...|New York|Rome|Tokyo|🗽",
    "Abstract Expressionist paintings are often...|large and emotional|tiny and realistic|black and white photos",
    "Which artist painted soft-edged blocks of color?|Mark Rothko|Albrecht Durer|Henri Rousseau|🟥",
    "Which artist is known for dripping and splashing paint?|Jackson Pollock|Johannes Vermeer|Edgar Degas",
    "Rothko wanted viewers to feel the...|color|stories of kings|perspective rules",
    "Rothko's shapes had edges that were...|soft|razor sharp|invisible",
    "Abstract Expressionism came in the middle of the...|1900s|1500s|2100s",
    "Rothko's canvases are often...|very large|postage-stamp size|made of glass"
  ], "Think about big emotional canvases of color."));
  b.push(L("Frank Lloyd Wright", [
    "Organic architecture|🏠|<b>Frank Lloyd Wright</b> (1867-1959) was an American architect. He believed buildings should fit in with their surroundings, which he called organic architecture.",
    "Fallingwater|💦|His house <b>Fallingwater</b> in Pennsylvania was built right over a waterfall in the 1930s, with stone and concrete terraces that stick out over the water.",
    "Other works|🌀|He designed low, wide Prairie-style houses. His Guggenheim Museum in New York has a spiral ramp inside."
  ], [
    "Frank Lloyd Wright was an American...|architect|opera singer|astronaut|🏠",
    "Wright believed buildings should fit their...|surroundings|neighbors' flags|bank balances",
    "Fallingwater is built over a...|waterfall|desert|volcano|💦",
    "Fallingwater is in which US state?|Pennsylvania|Hawaii|Texas",
    "Wright's Prairie-style houses are low and...|wide|round only|very tall",
    "The Guggenheim Museum in New York has a ___ ramp.|spiral|zigzag|straight",
    "Wright called his idea of buildings that fit nature...|organic architecture|abstract painting|pop design",
    "Fallingwater used stone and...|concrete|cardboard|ice"
  ], "Think about houses that blend with nature."));
  b.push(L("Zaha Hadid", [
    "Flowing buildings|🌊|<b>Zaha Hadid</b> (1950-2016) was an architect born in Iraq who worked in Britain. She designed buildings with bold, flowing curves instead of boxes.",
    "Prize|🏆|In 2004 she became the first woman to win the Pritzker Prize, one of architecture's highest honors.",
    "Famous work|🏟️|Her London Aquatics Centre for the 2012 Olympics has a swooping wave-shaped roof. The Heydar Aliyev Center in Baku, Azerbaijan, is a building of smooth curves."
  ], [
    "Zaha Hadid is known as a famous...|architect|violinist|chef|🌊",
    "Zaha Hadid was born in...|Iraq|Canada|Japan",
    "She was the first woman to win the...|Pritzker Prize|Nobel Peace Prize|Grammy",
    "Hadid's buildings are known for flowing...|curves|plain boxes|zigzag signs|🏟️",
    "Her London Aquatics Centre was built for the ___ Olympics.|2012|1980|2040",
    "Hadid's Aquatics Centre has a roof shaped like a...|wave|pyramid|flat lid",
    "The Heydar Aliyev Center is in...|Baku|Lima|Oslo",
    "Compared with old boxy buildings, Hadid's designs are more...|fluid and curved|square|invisible"
  ], "Think about swooping, wave-like architecture."));
  b.push(L("Maya Lin and memorials", [
    "A student's design|🎓|<b>Maya Lin</b> was a 21-year-old college student when her design won a contest for the Vietnam Veterans Memorial in Washington, DC.",
    "Quiet shape|⬛|Two long walls of polished black granite meet in a V and are carved with names. Visitors see their reflection in the stone and can touch the names.",
    "Remembering|🕊️|Memorials help people remember and honor those who served. Lin later designed other works, including the Civil Rights Memorial and land art."
  ], [
    "Maya Lin's design for the Vietnam Veterans Memorial won when she was a...|college student|king|pilot|🎓",
    "The memorial is in...|Washington DC|London|Beijing",
    "The memorial walls are made of polished black...|granite|wood|plastic|⬛",
    "The two walls meet in a shape like a...|V|circle|star",
    "Carved on the walls are...|names|cartoons|ads",
    "The shiny surface lets visitors see their...|reflection|dinner|homework",
    "Memorials help people...|remember and honor|forget|shop|🕊️",
    "The memorial design is described as quiet and...|simple|noisy|colorful"
  ], "Think about a quiet black wall with names."));
  b.push(L("Isamu Noguchi", [
    "Sculptor and designer|💡|<b>Isamu Noguchi</b> (1904-1988) was an American artist with a Japanese father and an American mother. He made sculpture, furniture, stage sets and gardens.",
    "Akari lamps|🏮|His <b>Akari</b> light sculptures are lanterns made of thin washi paper stretched over bamboo ribs. They give a soft glow and can fold flat.",
    "Playgrounds|🛝|Noguchi also designed playgrounds, such as Playscapes in Atlanta, with sculpted hills and shapes made for children to climb and slide on."
  ], [
    "Isamu Noguchi was a sculptor and...|designer|chef|pilot|💡",
    "Noguchi's Akari lamps are made of paper and...|bamboo|iron|stone|🏮",
    "The paper used in Akari lamps is called...|washi|canvas|felt",
    "Akari lamps give a ___ glow.|soft|harsh|no",
    "Noguchi designed playgrounds with sculpted...|hills|cars|prisons|🛝",
    "Akari lanterns can be folded...|flat|into liquid|into glass",
    "Besides sculpture, Noguchi made furniture and...|gardens|submarines|ice cream",
    "Noguchi's background mixed which two countries?|Japan and the United States|Egypt and Peru|France and Norway"
  ], "Think about paper lanterns and playground sculptures."));
  b.push(L("Street art with permission", [
    "Art outdoors|🎨|Murals and street art can brighten a city. Artists use spray paint, brushes, stencils and wheat-paste posters.",
    "Ask first|📝|Painting on someone else's property without permission is vandalism and is against the law. Artists should get the owner's permission or use legal walls.",
    "Community|🏘️|Many towns hold mural programs with approved walls. Community mural projects invite neighbors to help design and paint."
  ], [
    "Painting on someone's property without permission is...|vandalism|great art|always allowed|📝",
    "Before painting a wall you do not own, you should...|get the owner's permission|paint at night|ignore the rules",
    "A legal place to paint with permission is a...|designated wall|neighbor's car|store window",
    "A stencil is useful for repeating...|a design|a smell|a sound",
    "Community mural projects invite...|neighbors to help|nobody|only robots|🏘️",
    "Street art can be done with brushes and...|spray paint|silverware|chalk dust only",
    "Mural programs in towns often provide...|approved walls|free cars|loud speakers",
    "Wheat-paste art is made of paper stuck on with...|paste|nails|tape made of metal"
  ], "Think about being respectful with other people's property."));
  b.push(L("Cinematography and framing", [
    "Shot sizes|🎥|A <b>wide shot</b> shows the whole place. A <b>medium shot</b> shows a person from the waist up. A <b>close-up</b> shows a face or object up close.",
    "Angles|📐|A <b>low angle</b> (camera below) makes a subject look big and strong. A <b>high angle</b> (camera above) makes a subject look small.",
    "Thirds|🔲|Filmmakers place subjects along the lines of the rule of thirds. Leaving <b>headroom</b> and looking-space keeps the frame balanced."
  ], [
    "A shot that shows the whole place is a...|wide shot|close-up|ear shot|🎥",
    "A shot of a person's face up close is a...|close-up|wide shot|panorama",
    "A camera low looking up makes a subject look...|big and strong|tiny and weak|invisible",
    "A camera high looking down can make a subject look...|small|taller|louder",
    "A shot from the waist up is a...|medium shot|silent shot|zoom-out",
    "Placing subjects on thirds lines is the rule of...|thirds|halves|tens|🔲",
    "The space above a person's head in a frame is called...|headroom|rooftop|margin tax",
    "A film's establishing shot shows the...|setting|credits|actors' names"
  ], "Think about how camera distance and angle change the feeling."));
  b.push(L("Layers and masks", [
    "Layers|🗂️|In digital art, <b>layers</b> are like clear sheets stacked on each other. You can draw on one without changing the others.",
    "Masks|🎭|A <b>layer mask</b> hides parts of a layer without erasing it. Black hides, white shows. You can paint back anything you hid.",
    "Good habits|💾|Name your layers, keep the original file safe and use opacity and blend modes to change how layers mix."
  ], [
    "Digital layers are like stacked...|clear sheets|sandwiches|bricks|🗂️",
    "Drawing on one layer changes the other layers...|not at all|completely|only at night",
    "A layer mask hides parts of a layer without...|erasing it|changing the screen|using power",
    "On a layer mask, black...|hides|shows|burns|🎭",
    "On a layer mask, white...|shows|hides|deletes the file",
    "Lowering a layer's opacity makes it more...|see-through|solid|pixelated",
    "A smart habit is to keep a copy of the...|original file|screen brightness|power cable",
    "Naming layers helps you stay...|organized|slow|confused"
  ], "Think about clear sheets, and what hides or shows."));
  b.push(L("3D modeling basics", [
    "Mesh|🧊|A 3D model is built from a <b>mesh</b> of points called <b>vertices</b>, connected by <b>edges</b> that make flat <b>faces</b> or polygons.",
    "More polygons|🔺|More polygons make a smoother surface but need a stronger computer. Game artists balance detail and speed.",
    "Finish|🖼️|<b>Textures</b> are images wrapped on the model for color and detail. <b>Rendering</b> makes the final image. Some models are made real with 3D printers."
  ], [
    "A 3D model is built from a...|mesh|rope|brush|🧊",
    "The points in a 3D mesh are called...|vertices|palettes|rulers",
    "Vertices are connected by...|edges|stamps|tubes",
    "Edges form flat surfaces called...|faces|plates|boxes of color",
    "More polygons make a surface...|smoother|rougher|invisible|🔺",
    "An image wrapped on a 3D model is a...|texture|vertex|brush",
    "Creating the final picture from a 3D scene is...|rendering|erasing|framing",
    "A machine that makes real objects from a 3D model is a...|3D printer|pen plotter|copier"
  ], "Think about points, lines and faces."));
  b.push(L("Fractals", [
    "Repeating at all sizes|🌿|A <b>fractal</b> is a pattern that repeats itself at smaller and smaller sizes. Look closely and you see the same shape again.",
    "In nature|🥦|Ferns, Romanesco broccoli, snowflakes and branching trees all have fractal patterns. Coastlines are fractal-like too.",
    "In math and art|🔻|The Sierpinski triangle is made by cutting smaller and smaller triangles. Benoit Mandelbrot gave fractals their name in the 1970s. Artists create fractal designs on computers."
  ], [
    "A pattern that repeats at smaller and smaller sizes is a...|fractal|palette|collage|🌿",
    "Which of these has a fractal shape?|A fern|A plain brick|A flat sheet of glass",
    "Romanesco broccoli is famous for its...|repeating spiral cones|flat shape|blue color|🥦",
    "Looking closely at a fractal, you see the same shape...|again|disappear|turn into a square",
    "The scientist who named fractals was...|Benoit Mandelbrot|Albert Einstein|Isaac Newton",
    "The Sierpinski triangle is made of smaller and smaller...|triangles|squares|circles|🔻",
    "Fractal patterns in nature include...|branching trees|plastic cups|clocks",
    "Artists often make fractal designs using...|computers|rubber bands|fire"
  ], "Think about patterns that repeat inside themselves."));
  b.push(L("Adinkra and Kente", [
    "Symbols on cloth|🪶|<b>Adinkra</b> are symbols made by the Akan people of Ghana. They are stamped on cloth and each stands for an idea. <b>Sankofa</b> shows a bird looking backward and means learn from the past.",
    "Kente|🧶|<b>Kente</b> is a cloth woven in narrow strips and sewn together. It is made by the Asante and Ewe peoples of Ghana, often in bright colors, and each pattern has a name.",
    "Meaning|🎨|Colors in kente have meanings too. Kente is worn for important events and special days."
  ], [
    "Adinkra symbols come from the people of...|Ghana|Peru|Finland|🪶",
    "Adinkra symbols are stamped on...|cloth|glass|stone only",
    "The Sankofa bird looks backward and means...|learn from the past|run away|be silent",
    "Kente cloth is woven in narrow...|strips|circles|squares of paper|🧶",
    "The strips of kente are then...|sewn together|burned|painted over",
    "Kente is made by the Asante and which other group?|Ewe|Inuit|Navajo",
    "Each kente pattern has a...|name|number on the floor|barcode",
    "Kente is often worn for...|special occasions|sleeping|ironing"
  ], "Think about stamped symbols and woven strips."));
  b.push(L("Maori art", [
    "Carving|🪵|<b>Whakairo</b> is the Maori art of carving. Carved wood posts and panels decorate meeting houses and canoes in Aotearoa, New Zealand.",
    "Koru|🌱|The <b>koru</b> is a spiral shape based on a young fern frond unrolling. It stands for new life, growth and peace.",
    "Greenstone|💚|<b>Pounamu</b> (greenstone) is a hard, precious stone carved into pendants and tools. Painted patterns called <b>kowhaiwhai</b> decorate rafters."
  ], [
    "Maori carving is called...|whakairo|batik|etching|🪵",
    "The Maori live in...|New Zealand|Greenland|Chile",
    "A koru is a spiral based on a...|young fern frond|snail|seashell only|🌱",
    "The koru stands for new life and...|growth|danger|silence",
    "Greenstone in Maori is called...|pounamu|koru|frottage|💚",
    "Painted rafter patterns are called...|kowhaiwhai|mosaics|tessellations",
    "Maori meeting houses are decorated with...|carved posts|neon lights|plastic blocks",
    "Pounamu is carved into...|pendants|soft toys|pizzas"
  ], "Think about carved wood, ferns and greenstone."));

  b.push(MIX("Mixed practice", [b[0], b[2], b[4], b[6], b[8], b[10], b[12], b[14], b[16]]));
  b.push(MIX("Level 17 Challenge", [b[1], b[3], b[5], b[7], b[9], b[11], b[13], b[15], b[17], b[18]]));

  // ================= LEVEL 18 =================
  const c = [];
  c.push(L("Art in context", [
    "Who, when, where, why|🔎|<b>Context</b> is everything around an artwork: who made it, when, where and why. Knowing it can change what a picture means to you.",
    "Time and place|🗺️|Symbols, clothes and customs differ by culture and time. An artwork might mean one thing to its first viewers and another to us.",
    "Research|📚|When something puzzles you, look for reliable books and museum notes. Then connect what you see to what you learn."
  ], [
    "Everything around an artwork, such as who made it and when, is its...|context|frame|texture|🔎",
    "An old painting may use symbols we no longer...|recognize|print|see",
    "To understand an unfamiliar artwork, you can...|research its time and place|ignore it|guess without looking",
    "Artworks may mean different things to different...|viewers|crayons|rooms",
    "Where an artwork was made is part of its...|context|color wheel|signature size",
    "Knowing an artist's life can give...|clues to the artwork|a new frame|extra paint",
    "Good places to look up background are...|reliable books and museum notes|any rumors|only comments",
    "Context includes who, when, where and...|why|how heavy|how pink"
  ], "Think about the story around the artwork."));
  c.push(L("Style clues for dating art", [
    "Detective work|🕵️|Art historians date artworks with clues: materials, clothing, buildings, technology and style.",
    "Anachronism|⏳|An <b>anachronism</b> is something in the wrong time, like a phone in a painting of a medieval castle. It is a sign of a fake or a joke.",
    "Materials|🧪|Some materials only exist after certain dates. Acrylic paints for artists, for example, came out in the 1950s."
  ], [
    "Something shown in the wrong time period is an...|anachronism|abstraction|alphabet|⏳",
    "A phone in a painting of a medieval castle would be an...|anachronism|accurate detail|expected tool",
    "Acrylic artists' paint became available in the...|1950s|1450s|1250s",
    "Clues for dating art include clothing and...|buildings|the price tag|weather today",
    "A painting claimed to be from 1500 but made with acrylic would probably be...|a fake|a perfect proof|from 1000 BC",
    "Art historians act a bit like...|detectives|chefs|race drivers|🕵️",
    "Technology shown in a picture can tell you the...|time it was made|artist's shoe size|room temperature",
    "Photographs cannot be older than the early...|1800s|1500s|1000s"
  ], "Think about clues that belong to one time."));
  c.push(L("Copyright and sharing art", [
    "Your art is yours|©️|<b>Copyright</b> is the legal right of a creator to decide who can copy and share their original work. It begins when the work is made.",
    "Credit and permission|✅|Giving credit is polite, but it is not the same as permission. Ask before using someone's artwork, or use work that is free to use.",
    "Open licenses|🔓|<b>Creative Commons</b> licenses let creators share their work with clear rules. <b>Public domain</b> works can be used freely. Some uses for school or comment may be allowed as <b>fair use</b>."
  ], [
    "The legal right of a creator to control copies of their work is...|copyright|a guild|a palette|©️",
    "Copyright starts when the work is...|made|sold|framed",
    "Saying who made it is called giving...|credit|change|silence",
    "Giving credit is NOT the same as getting...|permission|a frame|a rhyme",
    "Licenses that give clear rules for sharing are...|Creative Commons licenses|library cards|bus passes|🔓",
    "Works anyone can use freely are in the...|public domain|private vault|locked frame",
    "Before using someone's artwork you should...|ask or check the license|copy it secretly|erase the name",
    "Using a few seconds or small parts for school or comment can sometimes be...|fair use|stealing always|a trophy"
  ], "Think about respecting what other creators own."));
  c.push(L("Provenance and forgeries", [
    "History of ownership|📜|<b>Provenance</b> is the record of who has owned an artwork over time. A clear provenance helps show it is real.",
    "Fakes|🖼️|A <b>forgery</b> is a fake made to look like the work of a famous artist. Experts use X-rays, microscopes and paint tests to check.",
    "A telltale sign|🔬|If a painting supposedly from 1650 contains a pigment invented in 1900, it must be a forgery. In the 1930s and 40s Han van Meegeren made fake Vermeers before being found out."
  ], [
    "The record of who owned an artwork is its...|provenance|palette|perspective|📜",
    "A fake made to look like a famous artist's work is a...|forgery|collage|mosaic",
    "Experts check art using X-rays and...|microscopes|clocks|paint tubes|🔬",
    "A painting from 1650 with a pigment invented in 1900 is probably...|a forgery|a true treasure|very old",
    "A clear provenance helps show an artwork is...|real|fragile|famous",
    "Han van Meegeren forged paintings by...|Vermeer|Pollock|Warhol",
    "Paint tests can reveal when a pigment was...|invented|bought|sold",
    "The people who study art for authenticity are called...|experts|jugglers|painters only"
  ], "Think about ownership records and science checks."));
  c.push(L("Historic pigments", [
    "Blue stories|💙|<b>Ultramarine</b> came from the stone lapis lazuli, mined in Afghanistan, and cost more than gold. <b>Egyptian blue</b> was one of the first made pigments.",
    "Purple and red|🐚|<b>Tyrian purple</b> came from sea snails. <b>Carmine</b> red came from the cochineal, a tiny insect on cactus in Mexico.",
    "Modern pigments|🧪|<b>Prussian blue</b> was one of the first modern made colors, in the early 1700s. Today many pigments are made in labs and are cheaper and safer."
  ], [
    "Ultramarine blue came from the stone...|lapis lazuli|marble|granite|💙",
    "Lapis lazuli was mined in...|Afghanistan|Iceland|Kenya",
    "In the Renaissance, ultramarine was as costly as...|gold|dirt|paper",
    "One of the first made pigments was...|Egyptian blue|ultramarine|cochineal red",
    "Tyrian purple came from...|sea snails|berries only|iron rust|🐚",
    "Carmine red came from the...|cochineal insect|rose petals|lava",
    "Prussian blue was invented in the early...|1700s|700s|1900s",
    "Today many pigments are made in...|labs|volcanoes|caves"
  ], "Think about where old colors came from."));
  c.push(L("The story of photography", [
    "Camera obscura|📷|A <b>camera obscura</b> is a dark room or box with a tiny hole that projects an upside-down picture of the outside. Artists used it to trace scenes.",
    "First photographs|🪞|In 1839 Louis Daguerre shared the <b>daguerreotype</b>, a sharp image on a silvered copper plate. William Henry Fox Talbot made paper negatives that could print many copies.",
    "Everyone's camera|📱|George Eastman's Kodak camera (1888) with roll film made photography easy for anyone. Today our phones are cameras."
  ], [
    "A dark box with a tiny hole that projects a picture is a...|camera obscura|palette|kiln|📷",
    "The picture a camera obscura projects is...|upside down|in color forever|3D",
    "Louis Daguerre shared his photo process in...|1839|1239|1939",
    "A daguerreotype image was made on a plate of...|silvered copper|paper|glass fiber",
    "Which method made many copies from a paper negative?|Talbot's process|The daguerreotype|Oil painting",
    "Kodak made photography easy for everyone with...|roll film|stone tablets|paint tubes|📱",
    "George Eastman introduced Kodak in...|1888|1588|1988",
    "Artists used a camera obscura to...|trace scenes|bake clay|cut metal"
  ], "Think about early cameras and plates."));
  c.push(L("Manga and anime style", [
    "Japanese comics|📖|<b>Manga</b> are Japanese comics. They are read from right to left. <b>Anime</b> is Japanese animation.",
    "Style|💨|Manga artists use expressive eyes, speed lines, dramatic angles and sound-effect letters to show action and feelings.",
    "Tezuka|⚛️|<b>Osamu Tezuka</b> is called the god of manga. He created <i>Astro Boy</i> and helped shape modern manga and anime."
  ], [
    "Japanese comics are called...|manga|origami|haiku|📖",
    "Manga is usually read from...|right to left|left to right|bottom to top",
    "Japanese animation is called...|anime|ukiyo-e|kabuki",
    "Lines that show fast movement are...|speed lines|border lines|contour lines|💨",
    "Who is called the god of manga?|Osamu Tezuka|Walt Disney|Roy Lichtenstein",
    "Osamu Tezuka created...|Astro Boy|Mickey Mouse|Snoopy|⚛️",
    "Manga artists show feelings with expressive...|eyes|signatures|frames",
    "Sound-effect letters in manga add to the sense of...|action|silence|math"
  ], "Think about Japanese comics and cartoons."));
  c.push(L("Artist statements", [
    "Words about work|✍️|An <b>artist statement</b> is a short piece of writing that explains your art: what you made, how you made it and why.",
    "How to write|📝|Use your own voice and plain words. Describe materials, ideas and what inspired you. Avoid long fancy words that say nothing.",
    "Keep it short|📏|A statement is often 100 to 200 words. Check spelling, read it aloud and make sure it matches the artwork."
  ], [
    "A short text explaining what you made and why is an...|artist statement|inventory|budget|✍️",
    "An artist statement is written in...|plain words|secret code|only numbers",
    "A statement should describe your materials and...|ideas|bank account|home address",
    "A statement should match the...|artwork|room color|frame price",
    "A short statement is often about how many words?|100 to 200|1 to 5|5000",
    "Good statements avoid long fancy words that say...|nothing|the truth|the title",
    "Before sharing it, you should...|read it aloud and check spelling|hide it|add random facts|📝",
    "The statement tells what, how and...|why|when you ate lunch|who is your neighbor"
  ], "Think about explaining your work in a few clear words."));
  c.push(L("Public art and community", [
    "Art for everyone|🌆|<b>Public art</b> is art placed in open places like parks, plazas and streets, where anyone can see it.",
    "Cloud Gate|🫘|<b>Cloud Gate</b>, nicknamed The Bean, by Anish Kapoor is a polished stainless steel sculpture from 2006 in Millennium Park, Chicago. It reflects the sky and people.",
    "Community|🤝|Good public art listens to the community. It can make a place friendlier, tell local history and welcome people to play and touch."
  ], [
    "Art placed in open places for anyone to see is...|public art|private art|museum-only|🌆",
    "Cloud Gate is nicknamed...|The Bean|The Cube|The Tower|🫘",
    "Cloud Gate was made by...|Anish Kapoor|Claude Monet|Pablo Picasso",
    "Cloud Gate is made of polished...|stainless steel|bubble gum|wood",
    "Cloud Gate is in the city of...|Chicago|Sydney|Mumbai",
    "Good public art listens to the...|community|loudest critic|price list",
    "Public art can tell local...|history|jokes only|passwords",
    "Cloud Gate reflects the sky and the...|people|shopping lists|price tag"
  ], "Think about art that belongs to a whole community."));
  c.push(L("Josef Albers and color", [
    "Teacher and artist|🟧|<b>Josef Albers</b> (1888-1976) was a German-born artist who taught at the Bauhaus and later in the United States.",
    "Homage to the Square|🔲|His famous series <i>Homage to the Square</i> has squares nested inside each other in carefully chosen colors.",
    "Interaction of Color|🎨|In his book <i>Interaction of Color</i> (1963) he showed that the same color can look different next to different colors, so color is relative."
  ], [
    "Josef Albers was born in...|Germany|Mexico|Egypt|🟧",
    "Albers taught at the famous school called the...|Bauhaus|Louvre|Colosseum",
    "His famous series Homage to the Square used nested...|squares|triangles|circles|🔲",
    "Albers showed that one color can look different next to...|other colors|a clock|a window",
    "The color book by Albers is Interaction of...|Color|Light|Paper",
    "Albers' book came out in...|1963|1463|1863",
    "In Albers' view, color is...|relative|fixed and never changes|invisible",
    "His squares were arranged by carefully chosen...|colors|names|fonts"
  ], "Think about nested squares and how neighbors change color."));
  c.push(L("Olafur Eliasson", [
    "Art with light|☀️|<b>Olafur Eliasson</b> is a Danish-Icelandic artist who makes installations with light, water, fog and color.",
    "The Weather Project|🌫️|In 2003 he filled the huge Turbine Hall of Tate Modern in London with a glowing orange sun and a mist. Visitors lay on the floor and saw themselves reflected in a mirror ceiling.",
    "Little Sun|🔋|He co-created <i>Little Sun</i>, a small solar-powered lamp for people without reliable electricity."
  ], [
    "Olafur Eliasson makes installations with light, water and...|fog|clay bricks only|tapestry|☀️",
    "The Weather Project showed a giant glowing...|sun|moon|robot",
    "It was shown in the city of...|London|Moscow|Cairo",
    "The Weather Project was made in...|2003|1803|1903",
    "The huge hall where it was shown is the Turbine Hall of...|Tate Modern|the Colosseum|the Taj Mahal|🌫️",
    "Little Sun is a lamp powered by the...|sun|wind-up bicycle only|candles|🔋",
    "Eliasson's mist and light made the room feel like...|weather|a library|a kitchen",
    "Visitors saw themselves reflected in a mirror...|ceiling|floor of mud|door"
  ], "Think about a glowing sun inside a museum."));
  c.push(L("Murakami and Superflat", [
    "Superflat|🌼|<b>Takashi Murakami</b> (born 1962) is a Japanese artist who founded the <b>Superflat</b> idea. Superflat joins flat, colorful traditional Japanese art with anime and pop culture.",
    "Flowers|🌸|He is known for bright smiling flowers and cheerful characters. He often works with a large team in a studio.",
    "Fine and popular art|🧩|Murakami blurs the line between fine art and popular products. He has designed bags, toys and album covers."
  ], [
    "Takashi Murakami is from...|Japan|Argentina|Canada|🌼",
    "Murakami started the idea called...|Superflat|Supertall|Superround",
    "Superflat mixes traditional Japanese art with anime and...|pop culture|oil only|nothing",
    "Murakami is known for smiling...|flowers|clocks|mountains|🌸",
    "Murakami's style is bright and...|colorful|gray|muddy",
    "Murakami has designed bags, toys and...|album covers|bridges|bicycles",
    "Murakami works with a large...|studio team|pet team of robots|orchestra",
    "Superflat shows the line between fine art and popular products is...|blurry|very thick|strictly guarded"
  ], "Think about flat, bright Japanese pop art."));
  c.push(L("Artificial intelligence and art", [
    "A new tool|🤖|Image generators learn from huge collections of pictures and then make new images from text. They are tools, but people still choose and direct.",
    "Questions|❓|Whose art was used to teach the tool? Did the artists agree? Who owns the result? Laws are still being decided.",
    "Be honest|✅|Tell people if AI helped make a piece. Do not copy another artist's style to pass off as theirs, and keep making art with your own hands and ideas."
  ], [
    "An image generator learns from large collections of...|pictures|clocks|cookbooks|🤖",
    "An image generator makes new images from...|text prompts|only crayons|silence",
    "A good question about AI art is whose art was used to...|train it|paint a wall|cook food",
    "Artists have asked whether they gave...|consent|fruit|socks",
    "It is honest to say when AI helped...|make a piece|clean a room|win a race",
    "Passing off another artist's style as your own is...|not fair|a great idea|required",
    "Even when using AI, people still make...|choices|none of the choices|everything by luck|✅",
    "Who owns AI-made images is a question that laws are...|still deciding|never going to ask|finished with"
  ], "Think about fairness and honesty."));
  c.push(L("El Anatsui and recycled art", [
    "Sculpture from waste|♻️|<b>El Anatsui</b>, born in Ghana in 1944 and working in Nigeria, makes huge shimmering wall sculptures from thousands of flattened aluminum bottle caps and tops.",
    "Like cloth|✨|He joins the pieces with copper wire so the sculpture hangs and folds like cloth. It can be arranged differently each time it is shown.",
    "Reuse|🌍|Recycling and <b>upcycling</b> turn waste into something new. Artists use found materials to talk about trade, history and care for the Earth."
  ], [
    "El Anatsui makes large sculptures from flattened...|bottle caps|crayons|bicycles|♻️",
    "El Anatsui was born in...|Ghana|Spain|Brazil",
    "He joins the pieces with copper...|wire|ribbon|rope",
    "His sculptures hang and fold like...|cloth|bricks|marble|✨",
    "Turning waste into something new is...|upcycling|chiseling|framing",
    "Artists use found materials to talk about care for the...|Earth|clouds|calendar",
    "El Anatsui's work can be arranged ___ each time.|differently|exactly the same|never",
    "His material at the start is...|waste|new gold|fresh paint"
  ], "Think about shimmering sculpture from recycled caps."));
  c.push(L("Narrative art and the Bayeux Tapestry", [
    "Telling stories|📜|<b>Narrative art</b> tells a story in pictures. Cultures used scrolls, tomb walls, columns and comics to show events in order.",
    "Bayeux Tapestry|🧵|The <b>Bayeux Tapestry</b> is an embroidered cloth about 70 meters long, made in the 1070s. It tells the story of 1066 and the Norman conquest of England, in a long strip of scenes.",
    "One picture|🖼️|In a single image, an artist chooses the <b>key moment</b> and uses poses, faces and objects so viewers can guess what came before and what comes next."
  ], [
    "Art that tells a story in pictures is...|narrative art|nonobjective art|pure design|📜",
    "The Bayeux Tapestry is an embroidered...|cloth|stone|canvas on a frame",
    "The Bayeux Tapestry is about ___ meters long.|70|7|700|🧵",
    "It tells the story of events in the year...|1066|2066|566",
    "The tapestry was made in the...|1070s|1870s|1970s",
    "In a single narrative picture, the artist picks the...|key moment|smallest brush|color red only",
    "Comics tell stories in a series of...|panels|statues|poems only",
    "Poses and faces help viewers guess what comes...|next|from nowhere|never"
  ], "Think about long strips of scenes telling a story."));
  c.push(L("Performance art", [
    "Live art|🎤|<b>Performance art</b> is art made with the artist's body and actions, live, in front of an audience, in a place and time.",
    "Happenings|🎪|In 1959 Allan Kaprow presented <i>18 Happenings in 6 Parts</i>. <b>Happenings</b> were events where the audience took part in the art.",
    "Leaving a record|📸|The art is temporary, so artists keep photos, videos and notes as <b>documentation</b>. Performance art can mix dance, music, poetry and objects."
  ], [
    "Art made with the artist's body live in front of an audience is...|performance art|a still life|an etching|🎤",
    "Performance art happens in real...|time|ink|crayons",
    "Events where the audience takes part in the art are called...|happenings|exhibits|frames|🎪",
    "Which artist presented 18 Happenings in 6 Parts?|Allan Kaprow|Claude Monet|Vincent van Gogh",
    "Because performance art is temporary, artists keep...|documentation|a lottery ticket|an eraser",
    "Documentation includes photos, videos and...|notes|clay|metal",
    "Performance art can mix dance, music and...|poetry|plumbing|hammers only|📸",
    "A happening is often planned but also...|open to what the audience does|filmed in secret|painted on paper"
  ], "Think about art that happens live."));
  c.push(L("UX and interface design", [
    "UI and UX|📱|<b>UI</b> (user interface) is what you see and touch, like buttons and menus. <b>UX</b> (user experience) is how easy and pleasant it feels to use.",
    "Plan and test|🧪|Designers draw <b>wireframes</b>, simple layouts without color, then test them with real users and fix problems.",
    "Clear and consistent|👆|Use clear labels, big enough buttons to tap, the same style across screens and enough contrast so text is readable."
  ], [
    "The buttons and menus you see and touch are the...|user interface|database|battery|📱",
    "How easy and pleasant an app feels to use is the...|user experience|price|screen size",
    "A simple layout drawing with no color is a...|wireframe|sculpture|portrait|🧪",
    "Designers test layouts with real...|users|mountains|books",
    "Buttons should be big enough to...|tap easily|hide|fit a pin",
    "Keeping the same style across screens is called...|consistency|confusion|clutter",
    "Text on a screen needs enough...|contrast|decoration|speed",
    "After testing, designers...|fix the problems found|ignore the results|delete the app"
  ], "Think about how easy an app is to use."));
  c.push(L("Designing for everyone", [
    "Color vision|👁️|About 1 in 12 men and 1 in 200 women have a color vision difference, often called color blindness. Red and green can look alike to them.",
    "Do not rely on color alone|🔠|Add labels, patterns or icons beside color. A chart with only red and green lines is hard to read for many people.",
    "Accessible design|♿|Good design also uses high contrast, readable type and <b>alt text</b>, a short description for people who use screen readers."
  ], [
    "Roughly how many men have a color vision difference?|1 in 12|1 in 2|1 in a million|👁️",
    "Which two colors can look alike to many people with color blindness?|Red and green|Blue and orange|Yellow and white",
    "A good fix is to add labels or patterns beside...|color|the frame|the glue",
    "A chart that uses only red and green lines is...|hard for many to read|perfect for all|invisible to everybody",
    "Text that describes an image for screen readers is called...|alt text|a caption fee|a logo|♿",
    "High contrast makes text easier to...|read|forget|lose",
    "Accessible design aims to work for...|as many people as possible|only experts|only artists",
    "Good accessible design uses readable...|type|noise|secrets"
  ], "Think about making design work for everyone."));

  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[6], c[8], c[10], c[12], c[14], c[16]]));
  c.push(MIX("Level 18 Challenge", [c[1], c[3], c[5], c[7], c[9], c[11], c[13], c[15], c[17], c[18]]));

  Object.assign(ART_LEVELS, { 16: a, 17: b, 18: c });
})();
