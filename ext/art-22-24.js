// ext/art-22-24.js  Art & Drawing levels 22-24
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

  // ================= LEVEL 22 =================
  const a = [];
  a.push(L("Lascaux cave paintings", [
    "Art from the Ice Age|🐎|<b>Lascaux</b> is a cave in southwestern France. About 17,000 years ago, people painted hundreds of animals on its walls: horses, deer and huge wild bulls.",
    "Natural pigments|🖍️|The painters used minerals such as <b>ochre</b> (yellow and red), charcoal for black and manganese for dark colors. They may have blown or dabbed paint onto the rock.",
    "Protecting the cave|🔦|Teenagers found Lascaux in 1940. So many visitors came that their breath harmed the paintings, so the cave closed in 1963. Visitors now see a careful <b>replica</b>."
  ], [
    "Lascaux is a cave in which country?|France|Egypt|Brazil|🐎",
    "About how old are the Lascaux paintings?|17,000 years|170 years|1,000 years",
    "Which animals appear on the Lascaux walls?|Horses and bulls|Robots and cars|Penguins and polar bears",
    "Ochre was used to make which colors?|Yellow and red|Bright blue and pink|Silver and gold",
    "Why was Lascaux closed to visitors?|Breath and crowds harmed the paintings|The paintings were stolen|The cave filled with water",
    "Today people visit a Lascaux...|replica|skyscraper|airport",
    "Charcoal gave the painters which color?|Black|Purple|Orange",
    "Who found the Lascaux cave in 1940?|Teenagers|Astronauts|Kings",
    "Painting animals on cave walls is called...|prehistoric art|Pop art|digital art"
  ], "Think about the oldest art people made on rock walls."));
  a.push(L("Stonehenge and megaliths", [
    "A circle of giant stones|🪨|<b>Stonehenge</b> stands on Salisbury Plain in England. It was built in stages, beginning around 3000 BCE, from huge standing stones.",
    "Moving heavy stones|🛤️|A <b>megalith</b> is a very large stone used in building. The biggest stones, called sarsens, came from nearby. Smaller bluestones were moved about 150 miles from Wales.",
    "Sun and seasons|🌅|Stonehenge lines up with the sunrise at the summer solstice and the sunset at the winter solstice. Horizontal stones called <b>lintels</b> rest across the tops of the uprights."
  ], [
    "Stonehenge is found in which country?|England|Japan|Mexico|🪨",
    "A very large stone used in building is a...|megalith|pixel|palette",
    "Horizontal stones that rest across the top of two uprights are called...|lintels|glazes|frescoes",
    "Stonehenge lines up with the...|solstice sun|full moon only|North Pole",
    "The smaller bluestones of Stonehenge came from...|Wales|Egypt|Canada",
    "Stonehenge was built...|in stages over many centuries|in one afternoon|last year",
    "Stonehenge was built from...|stone|plastic|glass",
    "Which kind of art is Stonehenge?|Prehistoric architecture|Pop art|Digital animation"
  ], "Think about huge stones placed in a circle long before writing."));
  a.push(L("Hagia Sophia's dome", [
    "A dome in Constantinople|🕌|<b>Hagia Sophia</b> was built in 532-537 CE for the Byzantine emperor Justinian in Constantinople (today Istanbul). It was a huge church for about 900 years.",
    "How the dome fits|🏛️|The architects, Anthemius and Isidore, used curved triangles called <b>pendentives</b>. They let a round dome sit on a square base.",
    "Floating light|✨|A ring of windows at the base of the dome lets light pour in, so the dome seems to float. Later the building became a mosque with four minarets added."
  ], [
    "Hagia Sophia was built for which emperor?|Justinian|Augustus|Napoleon|🕌",
    "Hagia Sophia stands in the city now called...|Istanbul|Paris|Cairo",
    "Curved triangles that help a round dome sit on a square base are called...|pendentives|lintels|palettes",
    "The ring of windows at the dome's base makes it seem to...|float|shrink|fall",
    "Hagia Sophia was built in the...|500s CE|1800s CE|1990s",
    "Hagia Sophia belongs to which art tradition?|Byzantine|Pop|Dada",
    "Anthemius and Isidore were the...|architects|admirals|musicians",
    "The Hagia Sophia dome is built on a...|square base|triangular tent|floating raft"
  ], "Think about how a round dome can rest on a four-sided room."));
  a.push(L("Romanesque churches", [
    "Roman-like arches|⛪|<b>Romanesque</b> means \"Roman-like.\" From about 1000 to 1200, builders in Europe made churches with thick stone walls and <b>round arches</b>, like Roman buildings.",
    "Heavy and strong|🧱|Because the walls held the weight of stone ceilings (barrel vaults), the windows stayed small. Inside, these churches feel dim, solid and calm.",
    "Stories in stone|🗿|Carved scenes often filled the <b>tympanum</b>, the half-circle above a church door. Later, builders switched to pointed arches and bigger windows: the Gothic style."
  ], [
    "Romanesque churches use which kind of arch?|Round|Pointed|Flat triangle|⛪",
    "Romanesque churches have walls that are...|thick|paper thin|made of glass",
    "The half-circle carved space above a church door is the...|tympanum|palette|easel",
    "Romanesque windows are usually...|small|enormous|missing",
    "Romanesque means...|Roman-like|Gothic-like|Modern",
    "Which style came after Romanesque?|Gothic|Cubism|Pop art",
    "Romanesque builders were copying ideas from...|ancient Rome|the Moon|cartoons",
    "Inside a Romanesque church you would feel...|dim and solid|bright like glass|floating"
  ], "Think of round arches and thick walls."));
  a.push(L("Giotto and the new realism", [
    "Giotto di Bondone|🎨|<b>Giotto</b> (about 1267-1337) was an Italian painter from near Florence. Many people see him as a forerunner of the Renaissance.",
    "Solid people|🧍|Earlier Byzantine-style paintings looked flat and golden. Giotto's figures have weight, shadows and real feelings on their faces.",
    "The Arena Chapel|🖌️|Around 1305 he painted <b>frescoes</b> telling the story of Mary and Jesus on the walls of the Scrovegni (Arena) Chapel in Padua, Italy."
  ], [
    "Giotto was a painter from...|Italy|Spain|Japan|🎨",
    "Giotto's figures look more...|solid and real|flat and golden|invisible",
    "The Arena Chapel paintings are...|frescoes|oil on canvas|digital prints",
    "The Arena Chapel is in the city of...|Padua|Madrid|Tokyo",
    "Giotto is seen as a forerunner of the...|Renaissance|Pop art movement|Bauhaus",
    "Giotto added feelings to the faces of his...|figures|photographs|rulers",
    "Giotto lived around...|1300|1950|2000",
    "Earlier Byzantine-style paintings often looked...|flat|three-dimensional like a photo|invisible"
  ], "Think about someone who made painted people seem to have weight."));
  a.push(L("Sofonisba Anguissola", [
    "A young Renaissance painter|🖼️|<b>Sofonisba Anguissola</b> was born in Cremona, Italy, around 1532. Her father made sure she studied art, which was unusual for a girl at that time.",
    "Portraits and family|👪|She painted lively portraits, many self-portraits and family scenes such as <b>The Chess Game</b> (1555). Michelangelo admired one of her drawings.",
    "Court painter|👑|She became a court painter to King Philip II of Spain. Her success helped open the door for later women artists."
  ], [
    "Sofonisba Anguissola was born in which country?|Italy|Peru|Norway|🖼️",
    "Sofonisba worked mainly as a...|portrait painter|spacecraft engineer|chef",
    "Which painting is by Sofonisba?|The Chess Game|Hunters in the Snow|The Starry Night",
    "For which king was she court painter?|Philip II of Spain|Louis XIV of France|Henry VIII of England",
    "Which famous artist admired her drawing?|Michelangelo|Picasso|Warhol",
    "She painted many portraits of herself, called...|self-portraits|landscapes|murals",
    "Sofonisba lived during the...|Renaissance|Industrial age|Space age",
    "Her father...|supported her art training|forbade all art|moved to the Moon"
  ], "Think of an Italian woman artist of the 1500s who painted portraits."));
  a.push(L("Mosque architecture", [
    "Parts of a mosque|🕌|A mosque is a place of prayer for Muslims. Common parts are the <b>dome</b>, the <b>minaret</b> (a tower where the call to prayer is heard) and a courtyard with a fountain.",
    "The mihrab|🧭|The <b>mihrab</b> is a niche in the wall that shows the direction of Mecca, which worshippers face when praying. It is often beautifully decorated.",
    "Patterns not pictures|🔷|Mosque decoration usually uses calligraphy, geometric patterns and plants rather than people. The Great Mosque of Cordoba in Spain is famous for its red-and-white striped horseshoe arches."
  ], [
    "A tower on a mosque is called a...|minaret|lintel|mihrab|🕌",
    "A niche that shows the direction of Mecca is the...|mihrab|tympanum|pendant",
    "Mosque decoration often uses...|calligraphy and geometric patterns|cartoon characters|neon signs",
    "The Great Mosque of Cordoba is in...|Spain|Mexico|Australia",
    "Cordoba's arches are striped in...|red and white|green and pink|black and orange",
    "The round roof of a mosque is a...|dome|spire|chimney",
    "Worshippers face the mihrab to face...|Mecca|the nearest tree|the setting sun",
    "A courtyard fountain is often used for...|washing before prayer|swimming races|cooking dinner"
  ], "Think about the tower, the dome and the prayer niche."));
  a.push(L("The Great Stupa at Sanchi", [
    "A mound for the Buddha|🛕|A <b>stupa</b> is a dome-shaped Buddhist monument that often holds sacred relics. The Great Stupa at Sanchi in India was begun by Emperor Ashoka in the 200s BCE.",
    "Four gateways|🚪|Four carved stone gateways, called <b>toranas</b>, stand at the points of the compass. They are covered with scenes of the Buddha's life and animal tales.",
    "Symbols instead of statues|☸️|In early Buddhist art the Buddha was shown by symbols: a wheel, footprints, an empty throne or a tree. Pilgrims walk clockwise around the dome."
  ], [
    "A dome-shaped Buddhist monument is a...|stupa|minaret|kiln|🛕",
    "Sanchi is in which country?|India|Brazil|Canada",
    "Who began the Great Stupa?|Emperor Ashoka|Julius Caesar|King Tut",
    "The carved gateways of Sanchi are called...|toranas|mihrabs|totems",
    "Early Buddhist art often showed the Buddha as...|a symbol such as a wheel|a photograph|a robot",
    "Pilgrims walk around the stupa in which direction?|Clockwise|Backward on one foot|Zigzag",
    "The gateways show scenes from the...|Buddha's life|first moon landing|Olympic races",
    "Sanchi's Great Stupa was begun in the...|200s BCE|1600s CE|1990s"
  ], "Think about a dome with four carved gates in India."));
  a.push(L("Chola bronzes", [
    "Bronze gods from south India|🔥|The <b>Chola</b> dynasty ruled much of south India from about the 800s to the 1200s CE. Its artists cast graceful bronze figures of gods for temples.",
    "Lord of the Dance|💃|The best-known bronze is <b>Shiva Nataraja</b>, \"Lord of the Dance.\" He dances inside a ring of flames, one foot lifted, showing the cycle of creation and renewal.",
    "Lost-wax casting|🕯️|The bronzes were made by <b>lost-wax casting</b>. A wax model is covered in clay, the wax is melted out and molten bronze fills the space. They were carried in festival processions."
  ], [
    "The Chola dynasty ruled in which region?|South India|Northern Europe|The Andes|🔥",
    "Shiva Nataraja is known as Lord of the...|Dance|Rings|Sea",
    "Nataraja dances inside a ring of...|flames|ice|leaves",
    "The Chola bronzes were made by...|lost-wax casting|screen printing|origami",
    "In lost-wax casting the wax is...|melted out|painted red|eaten",
    "Chola bronzes were carried in...|festival processions|submarines|spacecraft",
    "Nataraja shows the cycle of creation and...|renewal|shopping|painting",
    "The Chola dynasty ruled around the...|800s to 1200s CE|1980s|300 BCE"
  ], "Think about bronze figures made by pouring metal into a mold."));
  a.push(L("Song dynasty landscapes", [
    "Mountains and mist|🏔️|During the Song dynasty (960-1279) in China, landscape painting became a great art. Artists painted ink and color on silk scrolls to show nature's grandeur.",
    "Fan Kuan|🖌️|Fan Kuan's <b>Travelers Among Mountains and Streams</b> (about 1000) fills the scroll with a giant mountain and a waterfall. Tiny travelers with mules walk at the bottom.",
    "Humans are small|🧘|The scale shows that people are small next to nature. Painters wanted viewers to feel calm and at one with the landscape, an idea influenced by Daoism."
  ], [
    "Travelers Among Mountains and Streams was painted by...|Fan Kuan|Vermeer|Hokusai|🏔️",
    "The Song dynasty ruled which country?|China|Peru|Norway",
    "In Song landscapes, people look...|tiny beside nature|bigger than mountains|missing from every scene",
    "These paintings were made on...|silk scrolls|computer screens|stained glass",
    "The painting style mainly uses...|ink|spray paint|crayons only",
    "A tall mountain filling the scroll makes viewers feel...|nature is powerful|nothing at all|the painting is empty",
    "The Song dynasty began in the...|900s CE|1700s CE|2000s",
    "Which idea influenced these landscapes?|Daoism|Cubism|Pop art"
  ], "Think of a huge mountain and tiny travelers in a Chinese scroll."));
  a.push(L("Great Zimbabwe", [
    "A city of stone|🏯|<b>Great Zimbabwe</b> was a large trading city in southeastern Africa, in today's Zimbabwe. It flourished from the 1100s to the 1400s.",
    "Walls without mortar|🧱|The Shona ancestors built curved walls of granite blocks stacked with <b>no mortar</b>. The Great Enclosure's outer wall is about 11 meters (36 feet) tall.",
    "The Zimbabwe birds|🦅|Carved soapstone birds stood on the site. A bird now appears on the flag of Zimbabwe. The word \"Zimbabwe\" is thought to mean \"stone houses.\""
  ], [
    "Great Zimbabwe is a city made mostly of...|stone|wood|ice|🏯",
    "The walls were stacked without...|mortar|stones|hands",
    "Who built Great Zimbabwe?|Ancestors of the Shona people|Viking sailors|Roman soldiers",
    "A carved bird from the site appears on the...|Zimbabwe flag|moon|US dollar",
    "The Great Enclosure is a tall...|curved wall|glass tower|tent",
    "Great Zimbabwe was a center of...|trade|skiing|space travel",
    "Great Zimbabwe flourished in the...|1100s to 1400s|1990s|300 BCE",
    "The carved birds are made of...|soapstone|plastic|neon glass"
  ], "Think about stone walls stacked with no cement in southern Africa."));
  a.push(L("Olmec colossal heads", [
    "The Olmec|🗿|The <b>Olmec</b> lived on Mexico's Gulf Coast from about 1200 to 400 BCE. They are often called the \"mother culture\" of Mesoamerica because later peoples borrowed their ideas.",
    "Giant carved heads|⛰️|They carved 17 known <b>colossal heads</b> from basalt. Each wears a helmet-like cap and has its own face, possibly portraits of rulers. Some weigh many tons.",
    "Moving the stone|🛶|The basalt came from mountains many miles away. Workers likely moved the blocks on rafts and rollers, and carved them with stone tools."
  ], [
    "The Olmec lived in what is now...|Mexico|Iceland|Mongolia|🗿",
    "Olmec colossal heads were carved from...|basalt|ice|chocolate",
    "The heads wear...|helmet-like caps|top hats|cowboy boots",
    "The Olmec are called the mother culture of...|Mesoamerica|Antarctica|Europe",
    "Each head probably shows...|a ruler or leader|a cartoon|a pet",
    "The Olmec lived around...|1200 to 400 BCE|1950 CE|2020 CE",
    "How many colossal heads are known?|17|3|500",
    "The basalt blocks were carried...|many miles|zero steps|by airplane"
  ], "Think of enormous stone heads in Mexico."));
  a.push(L("Cusco School painting", [
    "Painters of the Andes|🏔️|In the 1600s and 1700s, Peru was a Spanish colony. In Cusco, local Quechua and mestizo artists learned European oil painting and made it their own. This is the <b>Cusco School</b>.",
    "Gold and local touches|✨|They added patterns of gold, called <b>brocateado</b>, over clothing. They also added Andean flowers, birds and fruits to religious scenes.",
    "A famous Last Supper|🍽️|In the Cusco Cathedral, Marcos Zapata's <b>Last Supper</b> shows the meal with Andean foods, including cuy (guinea pig) and local fruit."
  ], [
    "The Cusco School was in which country?|Peru|Finland|Egypt|🏔️",
    "Cusco School artists used which paint?|Oil paint|Neon markers|Spray cans",
    "Gold patterns painted on clothing are called...|brocateado|chiaroscuro|tessellations",
    "Cusco paintings often added local...|plants and animals|skyscrapers|spaceships",
    "Marcos Zapata painted a Last Supper that includes...|Andean foods|pizza|sushi",
    "Peru in the 1600s was a colony of...|Spain|Japan|Canada",
    "Cusco School painting mixes European and...|Andean traditions|Arctic traditions|robot traditions",
    "Cusco is high in the...|Andes mountains|Sahara desert|Pacific Ocean"
  ], "Think of European painting techniques blended with Andean life."));
  a.push(L("Notan and value structure", [
    "Light and dark shapes|⚫|<b>Notan</b> is a Japanese idea meaning \"light-dark.\" It shows a design as flat black shapes and white shapes that balance each other.",
    "Positive and negative|✂️|Cut a shape from black paper and place it on white. The black is the <b>positive</b> space and the white around it is the <b>negative</b> space. Both are shapes.",
    "Value structure|🌗|Before painting, squint and simplify your scene into 2 or 3 values (light, middle, dark). This <b>value structure</b> makes the picture strong, even before color."
  ], [
    "Notan is a Japanese idea about...|light and dark balance|rainfall|musical notes|⚫",
    "The empty space around a main shape is called...|negative space|positive space|a palette",
    "Squinting your eyes helps you see...|big value shapes|tiny wrinkles|only color names",
    "A strong value structure often uses how many main values?|2 or 3|47|none",
    "In a notan, the shapes are...|black and white|rainbow colored|made of metal",
    "A simple value sketch is useful before...|painting|tying shoes|brushing teeth",
    "Light, middle and dark are called...|values|hues|frames",
    "Notan balances light and dark so the design feels...|balanced|accidental|invisible"
  ], "Think about balancing dark shapes against light shapes."));
  a.push(L("Hard, soft and lost edges", [
    "Three kinds of edges|🔲|A <b>hard edge</b> is crisp. A <b>soft edge</b> blurs gradually from one value to another. A <b>lost edge</b> disappears when the shape melts into the background.",
    "Leading the eye|👁️|The eye goes first to sharp contrast and crisp edges. Painters keep their hardest edges at the center of interest and soften edges elsewhere.",
    "Edges make it real|🍎|A round apple has a soft edge where it turns away from the light and a hard edge where it sits against a dark shadow. Varying edges looks natural."
  ], [
    "A crisp sharp boundary is a...|hard edge|lost edge|soft edge|🔲",
    "An edge that melts into the background is a...|lost edge|hard edge|grid edge",
    "A gradual blurry transition is a...|soft edge|hard edge|sharp edge",
    "Painters keep the sharpest edges near the...|center of interest|corner of the frame|back of the canvas",
    "Making every edge equally sharp can make a picture look...|stiff|natural|invisible",
    "The eye is drawn first to...|sharp contrast|blurry grays|empty corners",
    "A round form often has a soft edge where it...|turns away from the light|touches the frame|is signed",
    "Using several kinds of edges makes a painting look more...|natural|boring|flat and equal"
  ], "Think about edges that are sharp, blurry or fade away."));
  a.push(L("Sustained investigation", [
    "One big question|❓|In the AP Art and Design portfolio, a <b>sustained investigation</b> is a body of work that explores a single question or idea in depth, not a pile of unrelated pieces.",
    "Practice, experiment, revise|🧪|You plan, try materials and ideas, make mistakes, then revise. Your works should show your thinking growing, one piece leading to the next.",
    "Record your process|📓|Sketchbook notes, photos and short written explanations show how an idea changed. Strong investigations have a clear question and clear evidence."
  ], [
    "A sustained investigation explores...|one idea in depth|random unrelated ideas|nothing in particular|❓",
    "In a sustained investigation each work should...|build on earlier work|ignore earlier work|be identical",
    "Which is a good way to show your thinking?|Sketchbook notes and revisions|Hiding all your drafts|Deleting every sketch",
    "Strong investigations begin with a clear...|question|accident|autograph",
    "Experimenting with materials is part of...|the process|cheating|laziness",
    "Mistakes in an investigation can...|lead to new ideas|never help|ruin the portfolio",
    "Revision means...|improving by looking again|erasing everything|stopping",
    "AP Art and Design includes the section called...|Sustained Investigation|Weather Report|Snack Break"
  ], "Think about making many related works around one question."));
  a.push(L("Formal analysis", [
    "Describe what you see|🔎|A <b>formal analysis</b> describes how an artwork looks, not what it means. Look at line, shape, color, texture, space, scale and composition.",
    "Use art vocabulary|📝|Say \"thick diagonal lines lead the eye to the left\" or \"warm colors advance while cool colors recede.\" Specific words make your analysis strong.",
    "Evidence first|🧩|Notice the formal elements first. Then ask how they work together to create a mood or draw attention. Meaning comes from this evidence."
  ], [
    "A formal analysis focuses on...|how the work looks|who bought it|its price|🔎",
    "Which is a formal element of art?|Line|Receipt|Frame price",
    "A sentence with strong formal analysis is...|Thick diagonal lines lead the eye to the right.|I like it.|It is famous.",
    "Composition means...|how things are arranged|the artist's age|the size of the museum",
    "Warm colors usually seem to...|advance toward the viewer|disappear|become sounds",
    "In analysis, evidence comes from...|what you can see|guessing wildly|rumors only",
    "Texture is how a surface...|looks or feels|smells|sounds",
    "Scale is how...|large or small something is|loud it is|old it is"
  ], "Think of describing only what your eyes can see."));
  a.push(L("Patrons and function", [
    "Who paid for it?|💰|A <b>patron</b> is a person or group that pays for art. Churches, kings and wealthy families were big patrons. The Medici family of Florence supported many Renaissance artists.",
    "Why was it made?|🎯|<b>Function</b> is an artwork's purpose: to teach religious stories, show a ruler's power, remember someone, decorate a home or tell news.",
    "Context questions|🧭|A contextual analysis asks who made it, for whom, when, where and why. For example, Pope Julius II commissioned Michelangelo to paint the Sistine Chapel ceiling."
  ], [
    "A person who pays for art is a...|patron|critic|model|💰",
    "The purpose of an artwork is its...|function|frame|signature",
    "The Medici family of Florence were famous...|art patrons|ice skaters|astronauts",
    "Who commissioned Michelangelo's Sistine ceiling?|Pope Julius II|King Tut|Walt Disney",
    "A memorial's function is often to...|remember someone|boil water|play music",
    "Asking who, when, where and why is part of...|contextual analysis|color mixing|stretching canvas",
    "To commission a work means to...|ask an artist to make it|steal it|tear it",
    "Powerful rulers used art to show their...|power|bedtime|lunch menu"
  ], "Think about who paid and what the artwork was for."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[6], a[8], a[10], a[12], a[13], a[14], a[16], a[17]]));
  a.push(MIX("Level 22 Challenge", [a[1], a[3], a[5], a[7], a[9], a[11], a[13], a[15], a[16], a[17], a[18]]));

  // ================= LEVEL 23 =================
  const b = [];
  b.push(L("Holbein and Tudor portraits", [
    "A painter for the king|👑|<b>Hans Holbein the Younger</b> (about 1497-1543) was born in Augsburg, Germany. He became court painter to King Henry VIII of England.",
    "Real detail|🧵|Holbein painted fur, velvet, jewels and carpets so precisely that you can almost feel them. His portraits of Henry VIII and his court helped shape how we picture the Tudors.",
    "A hidden trick|💀|In <b>The Ambassadors</b> (1533), a strange stretched shape on the floor turns into a skull when seen from the side. This trick is called <b>anamorphosis</b>."
  ], [
    "Holbein was court painter to which English king?|Henry VIII|George Washington|Napoleon|👑",
    "Holbein was born in which country?|Germany|Australia|Brazil",
    "A picture that looks distorted until seen from a special angle uses...|anamorphosis|pointillism|batik",
    "Which painting by Holbein hides a stretched shape?|The Ambassadors|The Gleaners|Water Lilies",
    "Holbein was famous for painting...|precise portraits|only abstract blobs|only skyscrapers",
    "Holbein worked around the...|early 1500s|late 1900s|2020s",
    "Holbein painted textures such as...|fur and velvet|plastic bags|sandpaper",
    "The Tudors were a royal family of...|England|Japan|Peru"
  ], "Think about a German-born portrait painter at the English court."));
  b.push(L("Judith Leyster", [
    "A Dutch Golden Age artist|🎻|<b>Judith Leyster</b> (1609-1660) worked in Haarlem, in the Netherlands. In 1633 she joined the Haarlem painters' guild, which was rare for a woman.",
    "Everyday scenes|🍻|She painted <b>genre scenes</b>, pictures of ordinary people, such as musicians, children and card players, along with portraits and a famous self-portrait.",
    "A lost reputation|⭐|She signed her work with a monogram and a star (her name Leyster means \"lode star\"). Some of her paintings were wrongly credited to Frans Hals until 1893."
  ], [
    "Judith Leyster worked in the...|Netherlands|Mexico|Japan|🎻",
    "A painting of ordinary daily life is a...|genre scene|vanitas|fresco",
    "Leyster's signature included a...|star|crown|dragon",
    "Her paintings were once wrongly credited to...|Frans Hals|Raphael|Monet",
    "Leyster joined the painters'...|guild|zoo|choir",
    "Leyster lived in the...|1600s|1900s|2100s",
    "Leyster's city was...|Haarlem|Cusco|Padua",
    "The Dutch Golden Age was an era of great...|art and trade|snow only|silence"
  ], "Think about a Dutch woman painter of musicians and card players."));
  b.push(L("Vanitas still life", [
    "Life is short|⏳|<b>Vanitas</b> is Latin for \"vanity\" or \"emptiness.\" In the 1600s, Dutch artists painted still lifes that remind viewers that life is short and wealth does not last.",
    "Symbols|🕯️|Common symbols are a skull, an hourglass, a snuffed-out candle, wilting flowers and peeled fruit. Each stands for time passing.",
    "Beauty and message|🌷|Vanitas paintings show gorgeous objects, but the message is to value what really matters. Artists used careful light and realistic detail."
  ], [
    "Vanitas paintings remind viewers that...|life is short|paint is cheap|brushes are round|⏳",
    "Which object is a common vanitas symbol?|Hourglass|Rocket|Smartphone",
    "A snuffed-out candle stands for...|time passing|a birthday|strong wind",
    "Vanitas paintings were popular in the...|1600s|1980s|Stone Age",
    "Wilting flowers suggest that beauty...|does not last|lasts forever|is purple",
    "The Latin word vanitas means...|emptiness or vanity|laughter|castle",
    "Vanitas is a type of...|still life|portrait of a king|mural",
    "Which country is most linked to vanitas still lifes?|The Netherlands|Antarctica|Australia"
  ], "Think about still lifes that remind us time passes."));
  b.push(L("Versailles", [
    "The Sun King's palace|☀️|<b>Versailles</b> is a huge palace near Paris. King Louis XIV, the \"Sun King,\" moved his court there in 1682 to show France's power.",
    "The Hall of Mirrors|🪞|The Hall of Mirrors is a long gallery with 17 arched mirrors facing the windows. Candlelight and sunshine bounce around, making the room sparkle.",
    "Planned gardens|🌳|The gardens, designed by <b>Andre Le Nôtre</b>, are formal and geometric, with straight paths, fountains and clipped hedges. Nature is arranged like architecture."
  ], [
    "Versailles was built for King...|Louis XIV|Henry VIII|Alexander|☀️",
    "Versailles is near which city?|Paris|Rome|Madrid",
    "The famous long gallery is the Hall of...|Mirrors|Clocks|Statues",
    "Louis XIV was nicknamed the...|Sun King|Moon Prince|Sea Captain",
    "Who designed the formal gardens?|Andre Le Notre|Claude Monet|Frank Lloyd Wright",
    "Versailles shows the power of the...|French monarchy|Roman senate|Aztec empire",
    "The gardens have paths and hedges that are...|straight and geometric|wild and tangled|invisible",
    "Versailles is an example of which style?|Baroque|Pop art|Minimalism"
  ], "Think about the palace of the Sun King."));
  b.push(L("Gustave Caillebotte", [
    "A modern Paris painter|🌧️|<b>Gustave Caillebotte</b> (1848-1894) painted city life in Paris. His <b>Paris Street; Rainy Day</b> (1877) shows people with umbrellas on wide new boulevards.",
    "Photo-like views|📷|He used strong one-point perspective, cropped figures at the edges and unusual angles, much like a snapshot. The lines of cobblestones and buildings pull you into the scene.",
    "A friend of Impressionists|🤝|Caillebotte was rich enough to buy paintings by friends such as Monet and Renoir. He left his collection to France, and it helped these artists gain fame."
  ], [
    "Caillebotte painted the city of...|Paris|Cairo|Oslo|🌧️",
    "Which painting is by Caillebotte?|Paris Street; Rainy Day|Hunters in the Snow|Guernica",
    "His wide views use strong...|perspective|silence|mosaics",
    "Cropped figures at the edges make a picture seem like a...|snapshot|statue|mobile",
    "Caillebotte supported his friends by buying their...|paintings|bicycles|shoes",
    "Caillebotte left his collection to...|France|a pirate|the Moon",
    "Caillebotte is linked to which movement?|Impressionism|Dada|Cubism",
    "Paris Street; Rainy Day shows people holding...|umbrellas|kites|skis"
  ], "Think of a Paris street on a rainy day with strong perspective."));
  b.push(L("Cubism", [
    "Many views at once|🔷|<b>Cubism</b> was invented in Paris around 1907-1914 by Pablo Picasso and Georges Braque. They showed an object from several viewpoints in one picture.",
    "Analytic Cubism|🎻|In <b>Analytic Cubism</b> (about 1909-1912), objects are broken into small geometric planes in muted browns and grays, as if taken apart to study.",
    "Synthetic Cubism|📰|<b>Synthetic Cubism</b> (from about 1912) used brighter colors, simpler shapes and pasted paper bits. It built pictures up from pieces rather than taking them apart."
  ], [
    "Cubism was started by Picasso and...|Braque|Monet|Warhol|🔷",
    "Cubism shows an object from...|many viewpoints|one viewpoint only|no viewpoint",
    "Analytic Cubism used mostly...|muted browns and grays|neon colors|bright pink",
    "Synthetic Cubism added...|pasted paper pieces|3D movie glasses|sound",
    "Cubism began in...|Paris|Tokyo|Cairo",
    "Cubist paintings break objects into...|geometric planes|clouds|waves only",
    "Cubism started around...|1907|1407|2007",
    "Which came first?|Analytic Cubism|Synthetic Cubism|Pop art"
  ], "Think of objects broken into shapes and seen from many sides."));
  b.push(L("Collage and assemblage", [
    "Gluing things together|✂️|<b>Collage</b> (from the French word for glue) builds an image from pasted paper, cloth or photos. Picasso's <b>Still Life with Chair Caning</b> (1912) glued oilcloth printed like chair caning onto a canvas.",
    "Photomontage|📰|Artists such as Hannah Hoch cut up magazines to make <b>photomontage</b>: new pictures made from photographs.",
    "Assemblage|🧰|<b>Assemblage</b> is the 3D version: sculpture made from found objects. Kurt Schwitters built whole artworks from trash, tickets and scraps he picked up."
  ], [
    "Collage comes from a French word meaning...|glue|paint|frame|✂️",
    "Art made from pasted pieces of paper and cloth is...|collage|fresco|etching",
    "3D art made from found objects is...|assemblage|watercolor|portrait",
    "Art made from cut-up photographs is...|photomontage|batik|origami",
    "Who made Still Life with Chair Caning?|Picasso|Hokusai|Rembrandt",
    "Kurt Schwitters used...|scraps and found objects|only oil paint|only marble",
    "Collage lets artists combine...|different materials|only one color|only pencils",
    "Hannah Hoch used...|magazine photographs|stained glass|giant stones"
  ], "Think about artwork made by gluing and combining pieces."));
  b.push(L("Constantin Brancusi", [
    "Simplifying a form|🕊️|<b>Constantin Brancusi</b> (1876-1957) was born in Romania and worked in Paris. He wanted to capture the essence of a subject, not every detail.",
    "Bird in Space|🪽|His <b>Bird in Space</b> series is a smooth, polished bronze that rises like a flight. It has no feathers or beak, just the feeling of soaring.",
    "Endless Column|📏|His <b>Endless Column</b> in Romania is a tall tower of repeating shapes that seems to go on forever. For Brancusi, the base and pedestal were part of the sculpture too."
  ], [
    "Brancusi was born in...|Romania|Peru|Canada|🕊️",
    "Brancusi's Bird in Space is a...|polished bronze|neon sign|watercolor",
    "Brancusi simplified forms to show their...|essence|price|age",
    "The Endless Column is made of repeating...|shapes|colors|sounds",
    "Bird in Space gives the feeling of...|soaring|sleeping|sinking",
    "Brancusi worked in the city of...|Paris|Sydney|Houston",
    "Brancusi treated the base as...|part of the sculpture|an empty box|a mistake",
    "Brancusi's style is often called...|modern abstract|Gothic|Baroque"
  ], "Think of a sculptor who polished simple smooth forms."));
  b.push(L("Dorothea Lange", [
    "Photos that tell truth|📸|<b>Dorothea Lange</b> (1895-1965) was an American photographer. <b>Documentary photography</b> records real events and people to show others what life is like.",
    "The Great Depression|🌾|In the 1930s she worked for the Farm Security Administration and photographed families who had lost jobs and farms. Her best-known photo is <b>Migrant Mother</b> (1936).",
    "Impact|💬|Her pictures helped Americans understand hard times and led to help for farm workers. A strong photo can be both art and evidence."
  ], [
    "Dorothea Lange is best known as a...|documentary photographer|sculptor of marble|animator|📸",
    "Migrant Mother was taken in...|1936|1486|2012",
    "Documentary photography aims to record...|real life|imaginary dragons|only colors",
    "Lange photographed the Great...|Depression|Wall of China|Barrier Reef",
    "Her photos helped people...|understand and help families|avoid the news|play video games",
    "Lange worked for the Farm Security...|Administration|Orchestra|Carnival",
    "Lange was from which country?|United States|Japan|Spain",
    "A photograph can be art and also...|evidence|a unicorn|a skyscraper"
  ], "Think of a photo that showed real hardship in the 1930s."));
  b.push(L("Robert Rauschenberg", [
    "Between art and life|🛏️|<b>Robert Rauschenberg</b> (1925-2008) said he worked in the gap between art and life. He used everyday objects in his art.",
    "Combines|🧷|He invented <b>Combines</b>, works that mix painting and sculpture. <b>Bed</b> (1955) uses a real quilt and pillow, splattered with paint and hung on the wall.",
    "Erasing a drawing|✏️|In <b>Erased de Kooning Drawing</b> (1953) he asked another artist for a drawing, then erased it. He wanted to see whether erasing could be a way of making art."
  ], [
    "Rauschenberg's Combines mix painting with...|real objects|nothing|only marble|🛏️",
    "Rauschenberg's Bed uses a real...|quilt|helicopter|elephant",
    "Rauschenberg wanted to work between art and...|life|math|sports",
    "Erased de Kooning Drawing explored whether...|erasing could be art|paint is wet|pencils are round",
    "Rauschenberg was born in...|1925|1525|2025",
    "A Combine is part painting and part...|sculpture|poem|song",
    "He used everyday...|objects|ice crystals only|star charts only",
    "Rauschenberg was from the...|United States|Netherlands|Japan"
  ], "Think of an artist who combined paint with real everyday objects."));
  b.push(L("Jean-Michel Basquiat", [
    "From the street to the gallery|👑|<b>Jean-Michel Basquiat</b> (1960-1988) grew up in Brooklyn, New York. As a teenager he wrote clever messages on walls under the name SAMO.",
    "Raw energy|✍️|His paintings mix bold color, crowns, skulls, words and scribbled lines. This <b>neo-expressionist</b> style feels fast, direct and full of ideas.",
    "Words as art|🔤|Basquiat crossed out words on purpose, which makes you look at them even more. His work explores history, heroes and identity."
  ], [
    "Basquiat grew up in...|Brooklyn|Paris|Lima|👑",
    "Basquiat first wrote messages on walls under the name...|SAMO|ZED|KING",
    "Basquiat often added which symbol to his paintings?|Crowns|Rainbows|Penguins",
    "Basquiat's style is called...|neo-expressionism|Baroque|Rococo",
    "Basquiat sometimes crossed out words to...|make you look at them more|hide them forever|save paint",
    "Basquiat painted using bold color and...|scribbled lines|only gray pencil|mosaics",
    "His art explores identity and...|history|weather|recipes",
    "Basquiat became famous in the...|1980s|1580s|2020s"
  ], "Think of a young New York artist famous for crowns and bold lines."));
  b.push(L("Nick Cave's Soundsuits", [
    "Wearable sculpture|🧥|<b>Nick Cave</b> (born 1959) is an American artist who makes <b>Soundsuits</b>, full-body costumes that are also sculptures. They cover the wearer from head to toe.",
    "Made from found things|🧶|Soundsuits use twigs, buttons, beads, hair, fabric and thrifted objects. When the wearer moves or dances, the suit rustles and makes sound.",
    "Hiding who you are|🎭|Because the suit hides race, gender and class, viewers focus on the art and the movement. Cave first made one in 1992 and later organized community dance performances."
  ], [
    "Soundsuits are...|wearable sculptures|paintings on paper|buildings|🧥",
    "A Soundsuit makes noise when the wearer...|moves|sleeps|stands still forever",
    "Soundsuits cover the wearer from...|head to toe|only the nose|no part",
    "Nick Cave uses found materials such as...|buttons and twigs|only gold|only glass",
    "Soundsuits hide the wearer's...|identity|shoes only|sneeze",
    "Nick Cave is from the...|United States|Peru|Egypt",
    "Cave made his first Soundsuit in...|1992|1292|2032",
    "A Soundsuit is both costume and...|sculpture|vehicle|meal"
  ], "Think of costumes that rustle and shake like moving sculpture."));
  b.push(L("Christo and Jeanne-Claude", [
    "Temporary giants|🧣|<b>Christo and Jeanne-Claude</b> made huge outdoor artworks, often by wrapping buildings or landscapes in fabric. Each project stayed up only for a short time.",
    "Famous projects|🌆|They wrapped the Reichstag in Berlin (1995) and put up 7,503 saffron-colored gates in New York's Central Park (<b>The Gates</b>, 2005). <b>Running Fence</b> (1976) was a fabric wall across California hills.",
    "Paying for it themselves|🖼️|They never accepted sponsors. They paid by selling Christo's preparatory drawings, which is why the art stayed free to visit."
  ], [
    "Christo and Jeanne-Claude often covered things in...|fabric|ice cream|sand|🧣",
    "The Gates was installed in New York's...|Central Park|Empire State Building|Statue of Liberty",
    "Their projects were usually...|temporary|buried underground|private",
    "They paid for projects by selling...|preparatory drawings|tickets only|lottery cards",
    "Running Fence was in...|California|Antarctica|Egypt",
    "The Reichstag is in...|Berlin|Lima|Seoul",
    "They created art on a scale that was...|enormous|tiny|invisible",
    "The Gates was colored...|saffron orange|plain black|neon green"
  ], "Think of giant temporary wrapped buildings and gates."));
  b.push(L("Greek vase painting", [
    "Black-figure|🏺|From about 700 BCE, Greek potters in Corinth and Athens painted figures in black slip on red clay. Details were scratched through the black, a style called <b>black-figure</b>.",
    "Red-figure|🔴|Around 530 BCE, Athenian potters flipped the idea. In <b>red-figure</b> the figures stay the red color of the clay and the background is painted black. Details were drawn with a fine brush, allowing more natural poses.",
    "Stories on pots|🍷|Vases such as the amphora (storage jar) and kylix (drinking cup) show myths, athletes and daily life. Artists like Exekias signed their work."
  ], [
    "In black-figure painting, the figures are...|black|red clay color|green|🏺",
    "In red-figure painting, the background is...|black|gold|white",
    "Red-figure allowed artists to draw details with...|a fine brush|a hammer|a camera",
    "A Greek storage jar is an...|amphora|aqueduct|acropolis",
    "Greek vases often show...|myths and daily life|airplanes|computers",
    "Which city was a major vase-painting center?|Athens|Cusco|Beijing",
    "Black-figure details were...|scratched through the black|photographed|printed",
    "Exekias was a famous Greek...|vase painter|admiral|goat herder"
  ], "Think of figures painted black on red, and then flipped."));
  b.push(L("Borobudur", [
    "A mountain of stone|⛰️|<b>Borobudur</b> is a huge Buddhist monument on the island of Java, Indonesia, built in the 800s CE. It looks like a stepped pyramid.",
    "A path to enlightenment|🧗|Pilgrims climb up through galleries lined with about 2,600 carved relief panels showing the Buddha's life and teachings. The six square terraces lead to three round ones, with 72 stupas holding Buddha statues, and one big stupa at the top.",
    "Rediscovered|🌿|After centuries, the jungle and volcanic ash covered it. In the 1800s it was cleared. Today it is a UNESCO World Heritage Site."
  ], [
    "Borobudur is in which country?|Indonesia|Norway|Chile|⛰️",
    "Borobudur is a monument for...|Buddhism|Vikings|Romans",
    "Borobudur's shape is like a...|stepped pyramid|glass cube|tent",
    "The carved panels on its walls are called...|reliefs|negatives|mobiles",
    "Pilgrims move up through the monument by...|walking galleries|elevators|rockets",
    "Borobudur sits on the island of...|Java|Greenland|Crete",
    "The top of Borobudur has a large...|stupa|rocket|windmill",
    "Borobudur was built in the...|800s CE|1990s|3000 BCE"
  ], "Think of a stepped Buddhist monument on an Indonesian island."));
  b.push(L("Iznik tiles and Sinan", [
    "Tiles from Iznik|🏺|In the 1500s, the Ottoman town of Iznik (in Turkey) made glossy ceramic tiles painted with flowers such as tulips and carnations. Colors included cobalt blue, turquoise and a bright tomato red.",
    "Sinan the architect|🕌|<b>Sinan</b> was chief architect to Sultan Suleiman. He designed hundreds of buildings, including the Selimiye Mosque in Edirne, famous for its huge dome.",
    "The Blue Mosque|💙|The Sultan Ahmed (Blue) Mosque in Istanbul was finished in 1616. Its inside is covered in thousands of blue Iznik tiles."
  ], [
    "Iznik is famous for painted...|tiles|bicycles|clocks|🏺",
    "Iznik tiles often show flowers like...|tulips|giant robots|airplanes",
    "Sinan was a famous Ottoman...|architect|baker|sailor",
    "The Blue Mosque is in...|Istanbul|Paris|Delhi",
    "The Selimiye Mosque is known for its large...|dome|clock tower|swimming pool",
    "Iznik tiles had a bright red often called...|tomato red|sky silver|midnight pink",
    "Iznik is in...|Turkey|Mexico|Italy"
  ], "Think of glossy blue tiles in Ottoman mosques."));
  b.push(L("Reduction linocut", [
    "One block, many colors|🟩|In a <b>reduction linocut</b> you carve one block again and again. First print the lightest color. Then carve away more and print the next color on top.",
    "No going back|✂️|Each carving removes parts of the block forever. This is why it is called <b>reduction</b>: the block is reduced as you work. Plan your colors first.",
    "Registration|🎯|To make layers line up, use <b>registration</b> marks or pins that place the paper in the same position each time. Pablo Picasso made colorful linocuts this way."
  ], [
    "In a reduction print, you print the lightest color...|first|last|never|🟩",
    "The block in a reduction linocut is carved...|again and again|only once|never",
    "Lining up each color layer is called...|registration|erosion|collage",
    "Why is it called reduction?|The block is reduced as you carve|The paper shrinks|The ink dries up",
    "A reduction linocut uses how many blocks?|One|Ten|None",
    "After carving away an area, you...|cannot get it back|can easily paste it back|print it in neon",
    "Which artist made colorful linocuts this way?|Picasso|Leonardo|Rodin",
    "Careful planning of colors helps you avoid...|mistakes|sunshine|breakfast"
  ], "Think of carving the same block over and over to add colors."));
  b.push(L("Iteration in the studio", [
    "Try, test, improve|🔁|<b>Iteration</b> means making a version, studying it and making a better one. Artists make thumbnails, studies and drafts before the final piece.",
    "Learn from each version|🔍|After each attempt, ask what works and what does not. Change only one or two things at a time so you can see what made the difference.",
    "Keep the evidence|📓|Keep earlier versions and notes. They show how your ideas grew and give you new paths. A so-called \"failed\" version is often where the best idea begins."
  ], [
    "Iteration means making...|improved versions|only one attempt|a final piece without sketches|🔁",
    "Changing one or two things at a time helps you see...|what made the difference|nothing|the weather",
    "A first small rough drawing is a...|thumbnail|finale|frame",
    "A \"failed\" draft can...|lead to new ideas|never be useful|ruin the studio",
    "Why keep early versions?|They show how ideas grew|They are heavy|They are required by law",
    "After each version, a good artist asks...|what works and what does not|what is for lunch|how to hide it",
    "Studies are practice pieces made...|before the final work|after retiring|during sleep",
    "Iteration is part of the creative...|process|accident only|illusion only"
  ], "Think of making several improved versions of one idea."));
  b.push(MIX("Mixed practice", [b[0], b[2], b[4], b[5], b[7], b[9], b[10], b[12], b[13], b[15], b[16]]));
  b.push(MIX("Level 23 Challenge", [b[1], b[3], b[6], b[8], b[11], b[14], b[16], b[17], b[18]]));

  // ================= LEVEL 24 =================
  const c = [];
  c.push(L("Thesis and evidence", [
    "A claim you can argue|💡|An art history essay needs a <b>thesis</b>: a clear claim that someone could disagree with, such as \"The artist uses light to make the viewer feel calm.\" A plain fact is not a thesis.",
    "Prove it with details|🔎|<b>Evidence</b> means specific things you can see in the artwork (colors, shapes, materials) plus facts about its context. Then explain how the evidence supports your claim.",
    "Do not just summarize|📝|Do not only describe the picture. Say why it matters. Give each paragraph one point, evidence and a link back to your thesis."
  ], [
    "A thesis is a...|claim that can be argued|list of colors|signature|💡",
    "Evidence in art writing is...|details you can point to|your guess with no support|a rumor",
    "Which is the best thesis?|The artist uses diagonal lines to create tension.|The painting is big.|The painting is in a museum.",
    "After giving evidence you should...|explain how it supports your claim|change the topic|erase it",
    "An essay that only describes what is seen is...|just a summary|a strong argument|a thesis",
    "Each body paragraph should have...|one main point|ten unrelated points|no point",
    "Contextual facts can include the artist's...|time and place|favorite cereal|shoe size",
    "A conclusion should...|return to the claim|start a new topic|be left out"
  ], "Think about a claim supported by things you can see."));
  c.push(L("Comparing two artworks", [
    "Same questions for both|⚖️|To compare, ask the same questions about each work: its form, materials, subject, function and context. Then decide what is similar and what is different.",
    "Not a list, a point|🧩|A good comparison makes a point, such as \"Both buildings use domes, but one gives glowing light while the other is solid.\" Use words like <b>both</b>, <b>whereas</b> and <b>however</b>.",
    "Example pair|🏛️|Compare the Parthenon and the Pantheon. Both are temples with columns, but the Parthenon is Greek marble and post-and-lintel, while the Pantheon uses Roman concrete and a dome."
  ], [
    "To compare fairly, ask...|the same questions of both works|different questions of each|nothing|⚖️",
    "Which word signals a difference?|whereas|furthermore|similarly",
    "Which word signals a similarity?|both|however|but",
    "A strong comparison...|makes a point|lists random facts|only says like and dislike",
    "The Pantheon uses Roman...|concrete|plastic|glass walls",
    "The Parthenon is built from...|marble|concrete|brick only",
    "When comparing, you should look at form and...|context|weather|price",
    "A comparison should avoid...|only listing separate facts|using evidence|using art words"
  ], "Think of a method that treats two works with the same questions."));
  c.push(L("The Pantheon", [
    "Temple of all gods|🏛️|The <b>Pantheon</b> in Rome was rebuilt about 118-128 CE under Emperor Hadrian. Its name means \"all gods.\" It later became a church, which helped it survive.",
    "A concrete dome|⚪|Its dome is about 43 meters across, the same as the height from floor to the dome's top. The dome has sunken panels called <b>coffers</b> that make it lighter.",
    "The oculus|☀️|At the top is a round opening, the <b>oculus</b>, about 9 meters wide. A beam of sunlight moves across the interior like a clock as the day passes."
  ], [
    "The Pantheon is in...|Rome|Athens|Istanbul|🏛️",
    "The opening at the top of the Pantheon's dome is the...|oculus|mihrab|apse",
    "The Pantheon's dome is made of...|concrete|glass|wood",
    "The sunken panels in the dome are...|coffers|spires|flags",
    "The Pantheon was built under Emperor...|Hadrian|Justinian|Louis XIV",
    "Pantheon means temple of all...|gods|colors|kings",
    "Coffers make the dome...|lighter|heavier|invisible",
    "The Pantheon survived partly because it became a...|church|factory|zoo"
  ], "Think about a Roman temple with a famous round hole in its dome."));
  c.push(L("The Parthenon", [
    "Temple for Athena|🦉|The <b>Parthenon</b> sits on the Acropolis in Athens, Greece. It was built from 447 to 432 BCE for Athena, goddess of wisdom, when Pericles led the city.",
    "Doric style|🏛️|The architects were Ictinus and Callicrates. It uses the <b>Doric order</b>, plain and sturdy columns. The other main orders are Ionic and Corinthian. The sculptor Phidias oversaw its sculpture.",
    "Optical tricks|📐|The Parthenon looks perfectly straight but has gentle curves. Columns swell slightly (<b>entasis</b>) so they do not look thin from far away."
  ], [
    "The Parthenon is in...|Athens|Rome|Cairo|🦉",
    "The Parthenon was built for...|Athena|Zeus's pet|Augustus",
    "Which column order is the Parthenon's?|Doric|Corinthian|Gothic",
    "Slight swelling in a column is called...|entasis|oculus|lintel",
    "Who oversaw the Parthenon's sculpture?|Phidias|Michelangelo|Picasso",
    "Greece's three main column orders are Doric Ionic and...|Corinthian|Cubist|Baroque",
    "The Parthenon stands on a hill called the...|Acropolis|Vatican|Louvre",
    "The Parthenon was built in the...|400s BCE|1400s CE|1900s CE"
  ], "Think of the Greek temple on the Acropolis."));
  c.push(L("Abbot Suger and Saint-Denis", [
    "A new way to build|⛪|In the 1140s, Abbot Suger rebuilt part of the church of Saint-Denis near Paris. It is often called the first Gothic building.",
    "Pointed arches and rib vaults|🔺|Builders used <b>pointed arches</b> and <b>rib vaults</b>, which push weight down to piers and allow big windows instead of thick walls.",
    "Light of heaven|🌈|Suger believed bright light stands for divine light. Large <b>stained glass</b> windows filled the church with colored light, a goal of Gothic design."
  ], [
    "Saint-Denis is often called the first...|Gothic building|skyscraper|pyramid|⛪",
    "Abbot Suger rebuilt it in the...|1140s|1940s|140s BCE",
    "Gothic builders used pointed arches and...|rib vaults|geodesic domes|flat roofs",
    "Bigger windows were possible because weight moved to...|piers|wallpaper|paint",
    "Colored light came through...|stained glass|frescoes|neon",
    "Suger saw light as a symbol of...|divine light|cheap lamps|shadows",
    "Saint-Denis is near which city?|Paris|Beijing|Mexico City",
    "The style after Romanesque is...|Gothic|Pop|Minimalism"
  ], "Think of the abbot who made churches full of colored light."));
  c.push(L("Palladio and classical villas", [
    "Andrea Palladio|🏡|<b>Andrea Palladio</b> (1508-1580) was an Italian architect from the Veneto region. He studied ancient Roman buildings and used their ideas in country houses called villas.",
    "Villa Rotonda|⛪|His <b>Villa Rotonda</b> near Vicenza is a square building with a porch of columns and a triangle (pediment) on every side and a central dome. It is balanced and symmetrical.",
    "Spreading ideas|🌎|His book <b>The Four Books of Architecture</b> (1570) spread his style across Europe and America. Thomas Jefferson used Palladian ideas for Monticello."
  ], [
    "Palladio was an architect from...|Italy|Japan|Brazil|🏡",
    "Palladio built the Villa...|Rotonda|Versailles|Nova",
    "Palladio's designs are very...|symmetrical|random|messy",
    "Which American used Palladian ideas?|Thomas Jefferson|Elvis Presley|Abraham Lincoln only",
    "Palladio studied buildings of ancient...|Rome|Antarctica|Mars",
    "Palladio spread his ideas in a...|book|video game|phone call",
    "A triangle over a porch is a...|pediment|oculus|minaret",
    "A villa is a...|country house|boat|castle on the sea"
  ], "Think of the architect behind symmetrical villas with columns."));
  c.push(L("St. Peter's Basilica", [
    "A church of many architects|⛪|The new <b>St. Peter's Basilica</b> in Vatican City was begun in 1506 and finished more than a century later. Bramante, Michelangelo, Maderno and Bernini all worked on it.",
    "Michelangelo's dome|🔝|Michelangelo designed the tall dome in his seventies. After he died in 1564 it was completed by Giacomo della Porta in 1590. It was inspired by Brunelleschi's dome in Florence.",
    "Bernini's square|🧭|In front is <b>St. Peter's Square</b>, designed by Bernini. Its curved colonnades stretch out like open arms to welcome visitors."
  ], [
    "St. Peter's Basilica is in...|Vatican City|Venice|Athens|⛪",
    "Who designed the dome?|Michelangelo|Monet|Warhol",
    "Whose dome in Florence inspired it?|Brunelleschi's|Hadrian's|Wright's",
    "The curved colonnades of the square are by...|Bernini|Cezanne|Ansel Adams",
    "The church took...|more than a century|one week|a day",
    "The colonnades are shaped like...|open arms|a straight line|a spiral stair",
    "Maderno designed the church's...|facade|wheels|parachute",
    "The basilica is in the style of...|Renaissance and Baroque|Cubism|Bauhaus"
  ], "Think of the great church of Rome with Michelangelo's dome."));
  c.push(L("Iron and glass architecture", [
    "The Crystal Palace|💎|For the Great Exhibition of 1851 in London, Joseph Paxton built the <b>Crystal Palace</b> from iron and glass. Its parts were made in a factory and put together quickly.",
    "The Eiffel Tower|🗼|Gustave Eiffel's company built the <b>Eiffel Tower</b> for the 1889 World's Fair in Paris. It is about 300 meters (984 feet) tall, built from wrought iron.",
    "Why iron mattered|🔩|Iron frames hold the weight, so walls can be thin or glass. This made taller buildings and huge open halls possible. Some Parisians first disliked the tower, but it became a beloved symbol."
  ], [
    "The Crystal Palace was made of iron and...|glass|chocolate|ice|💎",
    "The Eiffel Tower was built for the 1889...|World's Fair|baseball game|snow festival",
    "Who designed the Crystal Palace?|Joseph Paxton|Leonardo|Michelangelo",
    "The Eiffel Tower is made of...|wrought iron|marble|bamboo",
    "Iron frames allowed buildings to have...|thin or glass walls|no floors|no doors",
    "The Eiffel Tower is in...|Paris|London|Rome",
    "The Crystal Palace was in...|London|Sydney|Lima",
    "The Crystal Palace parts were made in a...|factory|volcano|school"
  ], "Think of the factory-made iron buildings of the 1800s."));
  c.push(L("Edvard Munch", [
    "Painting feelings|🌅|<b>Edvard Munch</b> (1863-1944) was a Norwegian painter. He wanted to paint inner feelings, such as worry and loneliness, instead of just the outside world.",
    "The Scream|〰️|<b>The Scream</b> (1893) uses swirling lines and glowing orange-red sky to express anxiety. Munch made several versions, including paintings and prints.",
    "Expressionism|🎨|Munch influenced <b>Expressionism</b>, in which color and line express emotion rather than realism. He lived in Oslo (then Kristiania) and loved painting the Norwegian landscape."
  ], [
    "Edvard Munch was from...|Norway|Spain|India|🌅",
    "Munch is famous for The...|Scream|Starry Night|Gleaners",
    "In The Scream, swirling lines express...|anxiety|a recipe|a map",
    "Munch influenced the movement called...|Expressionism|Neoclassicism|Pop art",
    "Munch wanted to paint...|inner feelings|only accurate maps|only clouds",
    "The Scream was made in...|1893|1393|1993",
    "Munch made...|several versions of The Scream|just one copy ever|no prints",
    "Expressionism uses color and line to show...|emotion|price tags|exact measurements"
  ], "Think of a Norwegian painter of swirling anxious skies."));
  c.push(L("Alberto Giacometti", [
    "Very thin figures|🚶|<b>Alberto Giacometti</b> (1901-1966) was a Swiss sculptor who worked in Paris. He is known for tall, extremely thin figures cast in bronze.",
    "Space around us|📏|His figures have rough, scratchy surfaces, like they have been shaped by worn hands. <b>Walking Man</b> seems alone in the large space around him.",
    "Early Surrealism|🧠|Early on he made Surrealist sculptures. Later he tried to capture how a person looks in space from far away, which made his figures stretched and thin."
  ], [
    "Giacometti was a sculptor from...|Switzerland|Mexico|Kenya|🚶",
    "Giacometti's figures are known for being...|very thin|round like balls|neon pink",
    "A famous Giacometti sculpture is Walking...|Man|Dog|Machine",
    "Giacometti cast many figures in...|bronze|ice|bubble wrap",
    "His surfaces look...|rough|mirror smooth|made of glass",
    "Giacometti worked in the city of...|Paris|Tokyo|Chicago",
    "Giacometti's early work was linked to...|Surrealism|Rococo|Pop art",
    "His figures seem to feel...|alone in space|crowded together|made of rubber"
  ], "Think of tall, extremely thin bronze figures."));
  c.push(L("Agnes Martin", [
    "Quiet grids|▦|<b>Agnes Martin</b> (1912-2004) was born in Canada and worked in the United States, later in New Mexico. She is known for delicate grids and pale stripes.",
    "Feeling, not objects|🕊️|She drew faint pencil lines by hand over soft washes of color. She did not paint things she saw but hoped to express calm feelings such as happiness and innocence.",
    "Close looking|👀|Her large canvases (six feet square) reward slow looking. Tiny wobbles in each hand-drawn line show human touch."
  ], [
    "Agnes Martin is best known for...|grids and soft lines|bright portraits|large bronze statues|▦",
    "She often lived and worked in...|New Mexico|Antarctica|Sweden",
    "Martin tried to express...|calm feelings|loud noise|specific cities",
    "Her lines were drawn...|by hand|by machine only|with a ruler of fire",
    "Her paintings reward...|slow looking|a glance|rushing past",
    "The wobbles in her lines show...|a human touch|a mistake always|computer code",
    "Martin was born in...|Canada|Egypt|China",
    "Her colors are usually...|pale and soft|neon bright|black only"
  ], "Think of a quiet painter of faint hand-drawn grids."));
  c.push(L("Julie Mehretu", [
    "Layers of places|🗺️|<b>Julie Mehretu</b> (born 1970 in Addis Ababa, Ethiopia) lives in New York. She makes huge abstract paintings built from many layers.",
    "Maps and buildings|🏙️|She starts with faint drawings of buildings, plans and maps, then covers them with layers of paint and ink in swirls, lines and marks.",
    "Movement|🌪️|The marks seem to swirl and fly like cities in motion. Her art is about how people, history and place move and change."
  ], [
    "Julie Mehretu was born in...|Ethiopia|Iceland|Argentina|🗺️",
    "Her paintings are mostly...|abstract and layered|tiny and plain|photos of cats",
    "She starts with drawings of...|architecture and maps|animals only|food only",
    "Her marks suggest...|motion|stillness only|silence",
    "Mehretu lives in...|New York|Moscow|Cairo",
    "She builds her work in many...|layers|rooms|flights",
    "Her art explores how people and places...|change|stay identical|freeze",
    "Mehretu's paintings are often...|huge|stamp-sized|invisible"
  ], "Think of giant layered abstract paintings with maps beneath."));
  c.push(L("Cindy Sherman", [
    "Photographer and model|📷|<b>Cindy Sherman</b> (born 1954) is an American photographer. In her pictures, she is the photographer, model, stylist and makeup artist.",
    "Characters, not self-portraits|🎭|She dresses as invented characters using wigs, costumes and makeup. <b>Untitled Film Stills</b> (1977-80) imitate scenes from old movies that do not exist.",
    "Questions about identity|❓|Her work asks how media and stereotypes shape how we see people and ourselves. Costumes can change who we think someone is."
  ], [
    "Cindy Sherman usually photographs...|herself dressed as characters|only mountains|only robots|📷",
    "Untitled Film Stills look like...|old movie scenes|science charts|maps",
    "Her work explores...|identity and stereotypes|bicycle repair|cooking",
    "Sherman uses wigs and...|costumes|bricks|skis",
    "Sherman is from the...|United States|Peru|Nepal",
    "In her pictures she is the model and also the...|photographer|moon|queen",
    "The Film Stills were made in the...|1970s|1770s|2010s",
    "Sherman's characters are...|invented|real strangers|animals"
  ], "Think of a photographer who disguises herself as invented characters."));
  c.push(L("Nam June Paik and video art", [
    "Father of video art|📺|<b>Nam June Paik</b> (1932-2006) was born in Korea and worked in Germany, Japan and the United States. He is called the father of <b>video art</b>.",
    "TV sculptures|🔌|He turned television sets into sculpture. <b>TV Buddha</b> (1974) shows a statue of Buddha watching its own image on TV. <b>Electronic Superhighway</b> (1995) uses many screens in the shape of a map of the United States.",
    "Art and technology|💡|Paik thought of TV as a material like paint. He imagined a future of global connection long before the internet was common."
  ], [
    "Nam June Paik is called the father of...|video art|oil painting|stained glass|📺",
    "Paik used which objects in his sculptures?|Television sets|Pencils only|Marble blocks only",
    "TV Buddha shows a statue watching...|itself on TV|a sunset|a book",
    "Electronic Superhighway uses screens shaped like a...|map of the United States|giant apple|dragon",
    "Paik was born in...|Korea|Iceland|Egypt",
    "Paik treated TV like a...|material like paint|toy only|trash only",
    "Paik imagined global...|connection|silence|weather",
    "Video art is art that uses...|moving images|only marble|only pastels"
  ], "Think of the artist who made sculptures out of television sets."));
  c.push(L("Museums and returning objects", [
    "Where do objects belong?|🏛️|Many museum collections include objects taken from other countries long ago, sometimes in times of colonial rule. Today people debate who should care for them.",
    "Repatriation|📦|<b>Repatriation</b> means returning an object to its country or community of origin. Some museums have returned items such as Benin bronzes and sacred Native American objects.",
    "Good practice|🤝|Museums now research an object's history (<b>provenance</b>), talk with source communities and write labels that explain how it arrived. Others share objects on loan or digitally."
  ], [
    "Returning an object to its place of origin is...|repatriation|collage|etching|🏛️",
    "Studying an object's ownership history is...|provenance research|color mixing|sketching",
    "Benin bronzes are objects some museums have...|returned|painted blue|lost on purpose",
    "Museums now often talk with...|source communities|no one|only robots",
    "A good museum label explains how an object...|arrived at the museum|tastes|grows",
    "Sharing objects on loan can help...|more people see them|nobody see them|them vanish",
    "Source communities are...|the people connected to an object's origin|random tourists|museum guards only",
    "The debate is about who should...|care for the objects|paint the walls|sell tickets"
  ], "Think about sending cultural objects back to the communities they came from."));
  c.push(L("Photographing your artwork", [
    "Even light|💡|To photograph a painting, place it flat on a wall. Use soft, even light from two sides at about 45 degrees so there are no shadows or glare. Turn off the flash.",
    "Straight on|📐|Keep the camera at the center of the work, with the lens parallel to the surface. Tilting makes the sides look crooked. Fill the frame but leave a small border to crop.",
    "True color|🎨|Set the white balance so colors look right. Include a gray card or a neutral background if you can. For 3D work take several angles. Name files clearly."
  ], [
    "To avoid glare, you should turn off the...|flash|picture|wall|💡",
    "Lights are placed about which angle to the artwork?|45 degrees|180 degrees|zero degrees",
    "The camera lens should be...|parallel to the artwork|tilted wildly|upside down",
    "Setting white balance helps colors look...|accurate|invisible|louder",
    "For 3D work you should take...|several angles|no photos|one blurry photo",
    "Tilting the camera makes the edges look...|crooked|perfect|invisible",
    "Soft even light avoids...|harsh shadows|colors|the frame",
    "Name your files...|clearly|with random letters|never"
  ], "Think about even lighting and keeping the camera straight."));
  c.push(L("Peer critique", [
    "Look before talking|👥|A good <b>critique</b> starts with careful looking. Describe what you notice before judging. Say \"I notice the large blue shape on the left draws my eye.\"",
    "Specific and kind|💬|Helpful feedback is specific and kind. Mention what is working and ask questions: \"What were you trying to show with this texture?\" Instead of \"I do not like it,\" explain why.",
    "Listening and using|👂|The artist listens, asks questions and decides what to use. Feedback is advice, not orders. Writing down what you heard helps you revise."
  ], [
    "A helpful critique is...|specific and kind|vague and unkind|silent|👥",
    "A good first step is to...|look closely and describe|judge immediately|leave",
    "Feedback is best when it includes...|evidence from the work|rumors|only insults",
    "The artist should...|listen and decide what to use|argue with everyone|ignore all advice",
    "Which is a useful question?|What were you trying to show here?|Why are you so bad?|Whose pencil is this?",
    "Writing down feedback helps you...|revise|forget|lose it",
    "Critique feedback is advice, not...|orders|ideas|suggestions",
    "A kind critic points out what is...|working well|only mistakes|none"
  ], "Think of the way to talk about someone else's work helpfully."));
  c.push(L("Postmodernism", [
    "After modernism|🌀|<b>Postmodernism</b> (from about 1970) is a way of thinking in art that questions big ideas like \"progress\" and \"originality.\" It often mixes styles and uses humor and irony.",
    "Borrowing|📎|Artists practice <b>appropriation</b>: borrowing images from earlier art or advertising to make a new point. <b>Pastiche</b> imitates styles, and many postmodern buildings combine old forms with bright shapes.",
    "Anything goes|🧩|Postmodern artists use any material or style, high or low, serious or playful. Examples include Michael Graves's Portland Building and Cindy Sherman's photographs."
  ], [
    "Postmodernism began around...|1970|1170|2070|🌀",
    "Borrowing images from other art is...|appropriation|fresco|erosion",
    "Postmodern art often uses humor and...|irony|only silence|math homework",
    "Pastiche means...|imitating or mixing styles|erasing paint|only portraits",
    "Postmodernism questions ideas of originality and...|progress|weather|gravity",
    "A postmodern building might combine...|old forms with bright shapes|nothing|only a plain box",
    "Postmodern artists use...|any material or style|only oil paint|only chalk",
    "Michael Graves designed the Portland...|Building|Bridge|Ocean"
  ], "Think about the style that mixes, borrows and questions originality."));
  c.push(MIX("Mixed practice", [c[0], c[2], c[3], c[5], c[7], c[8], c[10], c[12], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 24 Challenge", [c[1], c[4], c[6], c[9], c[11], c[13], c[15], c[16], c[17], c[18]]));

  Object.assign(ART_LEVELS, { 22: a, 23: b, 24: c });
})();
