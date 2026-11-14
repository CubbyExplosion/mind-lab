// ext/art-19-21.js  Art & Drawing levels 19-21
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

  // ================= LEVEL 19 =================
  const a = [];
  a.push(L("Jan van Eyck and oil paint", [
    "Early oil painter|🖼️|<b>Jan van Eyck</b> was a painter from Flanders (today part of Belgium) in the early 1400s. He is famous for using oil paint in a very skilled way.",
    "Thin glazes|✨|Oil paint dries slowly, so he could blend smoothly and add thin, see-through layers called <b>glazes</b>. This made colors glow and tiny details look sharp.",
    "Tiny details|🔍|Van Eyck painted jewels, fabric and shiny metal so carefully that they look real. He was part of the <b>Northern Renaissance</b>."
  ], [
    "Jan van Eyck was an early master of which paint?|oil paint|spray paint|chalk paint|🖼️",
    "Van Eyck worked in which part of Europe?|Flanders (now Belgium)|Australia|Peru",
    "Thin see-through layers of paint are called...|glazes|frames|sketches",
    "Oil paint dries...|slowly|instantly|in one second",
    "Why does slow drying help a painter?|Colors can be blended smoothly|The paint turns into stone|The canvas disappears",
    "Which movement was van Eyck part of?|Northern Renaissance|Pop art|Cubism",
    "Van Eyck became famous for painting tiny...|realistic details|invisible shapes|messy blobs|🔍",
    "Glazes make colors look...|glowing and deep|dull and flat|always gray"
  ], "Think about paint that dries slowly and can be layered."));
  a.push(L("Bruegel's busy scenes", [
    "Pieter Bruegel|🏘️|<b>Pieter Bruegel the Elder</b> was a Flemish painter in the 1500s. Instead of kings and saints, he often painted ordinary village people.",
    "Busy pictures|⛸️|His paintings are full of tiny people skating, dancing, farming and playing games. You can spend a long time finding new things in them.",
    "The seasons|❄️|He painted a famous set about the seasons. <b>Hunters in the Snow</b> shows a cold winter day with frozen ponds and a village far below."
  ], [
    "Pieter Bruegel the Elder was a painter from...|Flanders|Japan|Mexico|🏘️",
    "Bruegel often painted...|ordinary village life|only portraits of kings|only machines",
    "Which famous Bruegel painting shows a winter scene?|Hunters in the Snow|The Starry Night|Water Lilies|❄️",
    "Bruegel's paintings are full of...|tiny busy people|one big empty space|only one color",
    "In the 1500s, painting everyday people was...|less common than painting kings and saints|the only thing painters did|against the law",
    "Bruegel lived in the...|1500s|1900s|2000s",
    "Why do people enjoy looking at his paintings for a long time?|There is so much to discover|They are completely blank|They are tiny stamps",
    "Hunters in the Snow belongs to a set about the...|seasons|planets|alphabet"
  ], "Think of a painting packed with little people doing everyday things."));
  a.push(L("Caspar David Friedrich", [
    "Romantic landscapes|🏔️|<b>Caspar David Friedrich</b> (1774-1840) was a German Romantic painter. He painted misty mountains, sea shores and forests that feel huge and quiet.",
    "Small people|🧍|Often a person stands with their back to us, looking at the view. Because they are tiny, nature feels powerful and the picture feels like a mood.",
    "The sublime|🌫️|Romantic artists loved the <b>sublime</b>: the feeling of awe you get from something far bigger than you, like a mountain or a stormy sky."
  ], [
    "Caspar David Friedrich was from which country?|Germany|Egypt|Brazil|🏔️",
    "Friedrich belonged to which movement?|Romanticism|Cubism|Pop art",
    "Friedrich often painted a person seen from...|behind|above in a helicopter|inside a bottle|🧍",
    "Why are the people in his paintings small?|To show how big nature is|Because he ran out of paint|To hide the sky",
    "The feeling of awe at something huge is called the...|sublime|grid|palette",
    "Friedrich's landscapes often feel...|misty and quiet|loud and crowded|flat and plain|🌫️",
    "Friedrich painted mostly...|mountains sea and forests|robots|spaceships",
    "Romantic artists cared a lot about...|feelings and nature|machines only|math tests"
  ], "Think of a tiny person looking at a huge misty mountain."));
  a.push(L("Edouard Manet", [
    "A bridge painter|🌉|<b>Edouard Manet</b> (1832-1883) was a French painter who linked older realistic painting with the new Impressionists. He is called the father of modern painting by some.",
    "Flat and bold|⬛|Manet used bold dark shapes, flat areas of color and loose brushstrokes. He painted modern Paris life: cafes, music and crowds.",
    "Friends|🤝|Younger painters such as Monet admired him. But Manet never showed in the Impressionist exhibitions. He kept showing at the official Salon."
  ], [
    "Edouard Manet was a painter from...|France|Spain|China|🌉",
    "Manet painted scenes of...|modern Paris life|ancient Greece only|outer space",
    "Manet used bold dark shapes and...|loose brushstrokes|tiny dots only|no color at all",
    "Manet is seen as a bridge between...|realism and Impressionism|Baroque and Rococo|Dada and pop",
    "Which group of painters admired Manet?|The Impressionists|The Vikings|The Romans",
    "Where did Manet usually show his work?|The official Salon|Only on the internet|In a cave",
    "Which kind of place did Manet often paint?|A cafe|A volcano|The bottom of the sea|🤝",
    "Manet lived in the...|1800s|1200s|1980s"
  ], "Think of a Paris painter who inspired the Impressionists."));
  a.push(L("The Pre-Raphaelites", [
    "A group in England|🌹|In 1848 a few young English artists formed the <b>Pre-Raphaelite Brotherhood</b>. They included Millais, Rossetti and Holman Hunt.",
    "Back to detail|🌿|They disliked stiff rules taught in art schools. They admired painters before Raphael, who painted with bright color and close detail from nature.",
    "Nature and stories|📖|They painted plants and flowers very carefully, often outdoors, and chose stories from legends, poems and the Bible."
  ], [
    "The Pre-Raphaelites formed in which country?|England|Mexico|Japan|🌹",
    "The Pre-Raphaelite Brotherhood began in...|1848|1348|1998",
    "Which painter was part of the group?|John Everett Millais|Andy Warhol|Piet Mondrian",
    "They admired painters from before...|Raphael|Picasso|Monet",
    "Their paintings show plants and flowers in...|very careful detail|no detail at all|only black and white|🌿",
    "They often chose subjects from...|legends and poems|car adverts|computer games",
    "They disliked...|stiff rules taught in art schools|bright colors|painting outdoors",
    "The word Brotherhood suggests the group was...|a close team of friends|a company of robots|a school of fish"
  ], "Think of English painters who loved bright color and nature detail."));
  a.push(L("Japonisme", [
    "Japan reaches Europe|🎎|Japan opened to trade in the 1850s. Colorful Japanese woodblock prints and crafts soon arrived in Europe and amazed artists. The trend is called <b>Japonisme</b>.",
    "What they borrowed|🖌️|Western artists copied flat areas of color, bold outlines, high viewpoints and cropped, off-center compositions.",
    "Who was inspired|🌸|Van Gogh, Monet, Degas and Mary Cassatt all collected Japanese prints. Van Gogh even copied some in oil paint."
  ], [
    "The European craze for Japanese art is called...|Japonisme|Cubism|Fauvism|🎎",
    "Which kind of Japanese art arrived in Europe in the 1800s?|woodblock prints|laptops|movies",
    "Western artists borrowed flat areas of color and...|bold outlines|invisible lines|heavy shadows only",
    "Which painter copied Japanese prints in oil paint?|Vincent van Gogh|Jackson Pollock|Rene Magritte",
    "Cropped off-center compositions came partly from...|Japanese prints|Egyptian tombs|computer screens",
    "Japan opened to trade in the...|1850s|1450s|1990s",
    "Another artist who collected Japanese prints was...|Mary Cassatt|Michelangelo|Andy Warhol|🌸",
    "Japonisme shows that artists...|learn from other cultures|never look at other art|only copy photos"
  ], "Think about prints from Japan that surprised European painters."));
  a.push(L("Color field painting", [
    "Big blocks of color|🟧|<b>Color field painting</b> began in the 1940s and 50s in America. Artists used large areas of flat or soft color to create a mood.",
    "Soaking in|💧|Helen Frankenthaler (1928-2011) poured thin paint onto raw, unprimed canvas on the floor. The paint soaked in and made glowing stains. Her method is called <b>soak-stain</b>.",
    "Feel the color|🎨|The colors are the subject. Mark Rothko and Frankenthaler hoped you would feel the color instead of looking for a picture."
  ], [
    "Color field painting uses large areas of...|color|tiny dots of ink|photographs|🟧",
    "Which artist invented the soak-stain method?|Helen Frankenthaler|Caravaggio|Hokusai",
    "Frankenthaler poured thin paint onto...|raw canvas on the floor|a sheet of glass|a wall of bricks|💧",
    "Color field painting began in which country?|the United States|Italy|Egypt",
    "What does soak-stain look like?|Soft glowing color inside the canvas|Thick bumpy paint on top|Sharp black outlines",
    "In color field painting, the main subject is often...|the color itself|a bowl of fruit|a king",
    "Another color field painter was...|Mark Rothko|Leonardo da Vinci|Pieter Bruegel",
    "Color field painters hoped you would...|feel the color|count the dots|read a story"
  ], "Think of huge soft blocks of color that make you feel something."));
  a.push(L("Louise Bourgeois", [
    "A big spider|🕷️|<b>Louise Bourgeois</b> (1911-2010) was a French-American artist. She is best known for giant spider sculptures called <b>Maman</b>, which means Mom in French.",
    "Why a spider?|🧵|Her mother repaired old tapestries, and the spider is a patient weaver. The giant steel spider is meant to feel protective, like a caring parent.",
    "Many materials|🪨|Bourgeois used bronze, steel, marble, wood and fabric. Copies of Maman stand in cities around the world."
  ], [
    "Louise Bourgeois is famous for giant sculptures of a...|spider|rocket|banana|🕷️",
    "The sculpture is called...|Maman|Cloud Gate|The Thinker",
    "Maman is the French word for...|Mom|Moon|Mountain",
    "What did her mother do that inspired the spider?|Repaired old tapestries|Flew planes|Sold cars|🧵",
    "The spider is meant to feel...|protective|silly|boring",
    "Bourgeois lived and worked in France and...|the United States|Antarctica|Mars",
    "Which is one material Bourgeois used?|bronze|chocolate|ice",
    "A weaver spider reminded her of...|patience and care|speed racing|loud music"
  ], "Think of a giant steel spider named after a mother."));
  a.push(L("Persepolis and ancient Persia", [
    "A royal city|🏛️|<b>Persepolis</b> was a grand ceremonial capital of the Persian Empire. Building began around 518 BCE under King Darius the Great, in what is now Iran.",
    "Stone reliefs|🪨|Its stairways are covered in carved stone reliefs showing people from many lands carrying gifts in a calm line. Huge columns topped with animal figures held up its halls.",
    "Winged symbol|🦅|A winged disc symbol often appears in Persian art. Persepolis is now a UNESCO World Heritage Site."
  ], [
    "Persepolis was built in what is now...|Iran|Canada|Norway|🏛️",
    "Building began around...|518 BCE|1918 CE|2018 CE",
    "Which king started building Persepolis?|Darius the Great|King Tut|Julius Caesar",
    "The long stairways are covered in carved...|stone reliefs|neon lights|paper cutouts|🪨",
    "The reliefs show people from many lands...|bringing gifts|fighting|sleeping",
    "Tall columns at Persepolis were topped with...|animal figures|clocks|television sets",
    "Persepolis is a UNESCO...|World Heritage Site|candy store|shopping mall",
    "Persepolis belonged to the...|Persian Empire|Roman Republic|Aztec Empire"
  ], "Think of an ancient royal city in Iran with carved stairways."));
  a.push(L("Angkor Wat and Khmer art", [
    "A giant temple|🛕|<b>Angkor Wat</b> in Cambodia was built in the early 1100s by the Khmer Empire. It is one of the largest religious buildings in the world.",
    "Carved stories|🪨|Its long walls are covered with stone reliefs telling stories from Hindu epics. The five central towers are shaped like lotus buds.",
    "Still standing|🌳|The temple was surrounded by a wide moat. It later became a Buddhist site, and it still appears on Cambodia's flag."
  ], [
    "Angkor Wat is in which country?|Cambodia|Peru|Iceland|🛕",
    "Angkor Wat was built by the...|Khmer Empire|Roman Empire|Inca Empire",
    "It was built in the early...|1100s|1800s|600s",
    "The five towers are shaped like...|lotus buds|rockets|bottles|🌳",
    "The long walls are covered with...|stone reliefs|glass windows|posters",
    "Angkor Wat is surrounded by a wide...|moat|desert|parking lot",
    "Angkor Wat appears on Cambodia's...|flag|coins from Japan|moon map",
    "The reliefs tell stories from...|Hindu epics|space movies|car adverts"
  ], "Think of a huge temple with lotus-bud towers in Cambodia."));
  a.push(L("Lalibela's rock churches", [
    "Carved from rock|⛪|In Lalibela, Ethiopia, eleven churches were carved down into solid rock around 800 years ago. They are often dated to the reign of King Lalibela, around 1200 CE.",
    "Top to bottom|⛏️|Workers started at the top of a big rock and cut downward. Doors, windows, pillars and roofs were all shaped from the same single stone, a technique called <b>monolithic</b> building.",
    "Still used|🌍|These churches are still used for worship today. The most famous is the cross-shaped Church of Saint George, and the site is a UNESCO World Heritage Site."
  ], [
    "Lalibela is in which country?|Ethiopia|Japan|Chile|⛪",
    "The churches were carved from...|solid rock|bricks and clay|plastic",
    "Building from one single block of stone is called...|monolithic|mosaic|collage|⛏️",
    "How were the churches carved?|From the top down|From the bottom up|Inside a factory",
    "The Church of Saint George is shaped like a...|cross|circle|star",
    "How many churches are at Lalibela?|eleven|three|one hundred",
    "The churches were made around...|800 years ago|50 years ago|5 years ago",
    "Today the churches are still used for...|worship|storing cars|flying kites"
  ], "Think of churches cut down into the ground out of a single rock."));
  a.push(L("Navajo weaving", [
    "Diné weavers|🧶|The Diné (Navajo) people of the American Southwest are famous weavers. Weavers use an upright loom to make rugs, blankets and wall hangings.",
    "Wool and dye|🐑|Yarn comes from sheep wool and is often dyed with plants. Designs use bold diamonds, zigzags and stripes, and each weaver has her own style.",
    "A family art|🌄|Knowledge of weaving passes from grandmothers and mothers to the next generation. A Navajo rug can take months to finish."
  ], [
    "The Navajo people call themselves...|Diné|Maya|Viking|🧶",
    "Navajo weavers use a...|loom|microwave|hammer",
    "Navajo wool comes from...|sheep|bees|whales|🐑",
    "Yarn is often dyed with...|plants|chocolate|water only",
    "Typical Navajo designs include diamonds and...|zigzags|portraits|cars",
    "A Navajo rug can take...|months to make|one second|never finished",
    "Weaving skills are passed down in...|families|vending machines|video games",
    "Navajo weavers live in the American...|Southwest|North Pole|Amazon rainforest"
  ], "Think of woolen rugs with diamond patterns from the American Southwest."));
  a.push(L("Shifting perspective in scrolls", [
    "Walking through a painting|📜|A traditional Chinese landscape scroll is long and rolled up. You unroll it a little at a time, so you see the scenery like you are on a journey.",
    "Many viewpoints|⛰️|Instead of one vanishing point, these paintings use <b>shifting perspective</b>. The painter shows high peaks, valleys and villages from different viewpoints in one picture.",
    "Empty space|🌫️|Mist and blank space are important. They suggest air and distance, and give the eye a place to rest."
  ], [
    "A Chinese landscape scroll is usually...|long and rolled up|a tiny stamp|a round plate|📜",
    "Shifting perspective means the painting uses...|many viewpoints|exactly one vanishing point|no landscape",
    "You look at a long scroll by...|unrolling a little at a time|looking from far away only|folding it into a ball",
    "Mist and empty space in a scroll suggest...|air and distance|a mistake|a missing piece|🌫️",
    "A scroll viewer feels like they are on a...|journey|rocket|test",
    "Western one-point perspective uses...|a single vanishing point|many different viewpoints at once|no lines at all",
    "Chinese landscapes often show...|mountains and mist|space stations|cars",
    "In a scroll, empty space gives the eye...|a place to rest|a nasty surprise|a sharp edge"
  ], "Think of walking through a painting as you slowly unroll it."));
  a.push(L("Color grading in film", [
    "Color tells a story|🎬|After a movie is filmed, a colorist does <b>color grading</b>. They adjust the colors and brightness so the look matches the story.",
    "Mood by color|🌡️|Warm orange tones can feel sunny or cozy. Cool blue tones can feel quiet, cold or mysterious. Faded colors may look old or dreamy.",
    "Matching shots|🎞️|Grading also makes shots filmed on different days look like they belong together."
  ], [
    "Changing the colors of a finished movie is called...|color grading|pottery|etching|🎬",
    "A person who does color grading is a...|colorist|plumber|pilot",
    "Warm orange tones can feel...|sunny or cozy|icy cold|silent and empty",
    "Cool blue tones can feel...|cold or mysterious|like a summer picnic|like a party",
    "Color grading also helps shots filmed on different days...|match|disappear|speak",
    "Faded colors may make a scene look...|old or dreamy|sharp and shiny|upside down",
    "Color grading happens...|after filming|before the story is written|during a test only",
    "A filmmaker uses color to help tell the...|story|bill|time zone"
  ], "Think of how warm or cool colors change the mood of a movie."));
  a.push(L("Kerning leading and tracking", [
    "Spacing letters|🔤|Good type design depends on space. <b>Kerning</b> adjusts the space between two certain letters, such as A and V, so the gap looks even.",
    "More spacing words|📏|<b>Tracking</b> changes the space across a whole word or line of text. <b>Leading</b> (say LED-ing) is the space between lines of text, named after metal strips printers once used.",
    "Easy to read|👀|Lines that are too tight or too loose are harder to read. Designers adjust all three until the text looks smooth and clear."
  ], [
    "Adjusting space between two letters is called...|kerning|casting|glazing|🔤",
    "Space across a whole word or line is called...|tracking|etching|firing",
    "The space between lines of text is called...|leading|weaving|mixing|📏",
    "Leading is named after strips of...|metal|candy|silk",
    "Kerning is often needed for letter pairs like...|A and V|M and M|I and I",
    "Why do designers adjust spacing?|To make text smooth and clear|To hide the words|To use more ink",
    "Lines packed too tightly are...|harder to read|easier to read forever|invisible",
    "Adjusting spacing is part of...|typography|geology|cooking"
  ], "Think about the gaps between letters, words and lines."));
  a.push(L("Painting outdoors", [
    "Plein air|🌳|<b>En plein air</b> is French for in the open air. It means painting outside, looking right at the landscape.",
    "A new tool|🧪|In the 1840s, paint in metal tubes was invented. Before this, painters carried paint in bladders (animal skin bags), so tubes made outdoor painting much easier.",
    "Quick work|⏱️|Light and weather change fast, so plein air painters work quickly and paint small. The Impressionists loved this method."
  ], [
    "En plein air is French for...|in the open air|in the dark|in a museum|🌳",
    "Plein air painting means painting...|outside|only from photos|underwater",
    "Which invention helped outdoor painters in the 1840s?|metal paint tubes|computers|cameras with color",
    "Plein air painters work quickly because...|light and weather change|paint is free|the canvas is heavy|⏱️",
    "Which group loved painting outdoors?|The Impressionists|The Pharaohs|The Romans",
    "Plein air paintings are usually...|small|as big as a house|invisible",
    "Before tubes painters stored paint in...|animal skin bladders|water bottles|soda cans",
    "Outdoor painters try to catch the changing...|light|parking rules|price tags"
  ], "Think of a painter on a hill with an easel and a view."));
  a.push(L("Kintsugi and wabi-sabi", [
    "Golden repair|🏺|<b>Kintsugi</b> is a Japanese craft for mending broken pottery with lacquer mixed with gold powder. The cracks become shining golden lines.",
    "Wabi-sabi|🍂|Kintsugi connects to <b>wabi-sabi</b>, a Japanese view that finds beauty in things that are simple, imperfect and change over time.",
    "A new story|💛|Instead of hiding a break, kintsugi shows it. The history of the bowl becomes part of its beauty."
  ], [
    "Kintsugi is a way of mending broken...|pottery|shoes|windows|🏺",
    "In kintsugi the cracks are filled with lacquer and...|gold powder|sand|glitter glue",
    "Kintsugi comes from which country?|Japan|Canada|Norway",
    "The idea of finding beauty in imperfect things is called...|wabi-sabi|Dada|pointillism|🍂",
    "Kintsugi makes the cracks...|stand out as golden lines|disappear completely|turn invisible",
    "Instead of hiding a break, kintsugi...|shows it|throws it away|paints over it",
    "Wabi-sabi values things that are simple and...|imperfect|perfectly shiny|brand new only",
    "The repaired bowl keeps its...|history|first price tag|old glue"
  ], "Think of a mended bowl with shining gold lines."));
  a.push(L("Artists' books and bookbinding", [
    "Book as art|📚|An <b>artist's book</b> is a book made as a work of art. The pages, shape, materials and binding can all be part of the idea.",
    "Simple binding|🧵|One common way to sew pages is <b>pamphlet stitch</b>. Folded sheets (called folios) are stacked and sewn through the fold. Another way is Japanese stab binding.",
    "Handmade|✂️|Bookbinders use paper, thread, glue, needles and a bone folder to crease paper neatly. Zines, small handmade booklets, are also a form of artists' books."
  ], [
    "A book made as a work of art is an...|artist's book|encyclopedia|calendar|📚",
    "Sewing folded pages through the fold is a...|pamphlet stitch|brush stroke|glaze",
    "A tool used to crease paper neatly is a...|bone folder|hammer|ladle|✂️",
    "A zine is a small handmade...|booklet|statue|bridge",
    "Another binding method from Japan is...|stab binding|laser binding|tape stitch",
    "Stacked folded sheets used in binding are called...|folios|palettes|easels",
    "In an artist's book the idea can include...|the shape and materials|only the price|nothing but the cover color",
    "Bookbinders sew pages with...|thread|clay|paint"
  ], "Think about making a handmade book with folded paper and thread."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[6], a[8], a[10], a[12], a[14], a[16]]));
  a.push(MIX("Level 19 Challenge", [a[1], a[3], a[5], a[7], a[9], a[11], a[13], a[15], a[17], a[18]]));

  // ================= LEVEL 20 =================
  const b = [];
  b.push(L("Broken color", [
    "Side by side|🎨|Impressionists often used <b>broken color</b>: small strokes of pure color placed next to each other instead of mixing them on the palette.",
    "Mixing in the eye|👁️|From a distance, your eye blends the strokes. This is called <b>optical mixing</b>, and it can look brighter than paint that was mixed by hand.",
    "Shimmering light|✨|Broken color makes water, leaves and sunlight look like they shimmer. Claude Monet and Pierre-Auguste Renoir used it a lot."
  ], [
    "Small strokes of pure color placed side by side are called...|broken color|monochrome|gray tones|🎨",
    "When your eye blends nearby strokes, it is called...|optical mixing|firing|casting",
    "Broken color makes light look...|shimmering|dull and gray|invisible|✨",
    "Who used broken color a lot?|Claude Monet|Michelangelo|Jan van Eyck",
    "Another Impressionist who used it was...|Pierre-Auguste Renoir|Andy Warhol|Alma Thomas",
    "Optical mixing happens best when you look from...|a distance|an inch away|under a table",
    "Instead of mixing on the palette, the painter...|puts strokes side by side|only uses gray|erases the paint",
    "Broken color often looks...|brighter than mixed paint|always muddy|completely black"
  ], "Think of tiny strokes of pure color that blend when you step back."));
  b.push(L("Edward Hopper", [
    "Quiet scenes|🌃|<b>Edward Hopper</b> (1882-1967) was an American painter of quiet city and small town scenes. His painting Nighthawks shows a lit-up diner at night.",
    "Light and mood|💡|Hopper used strong sunlight, long shadows and simple shapes. The people in his pictures often seem still and thoughtful, which gives a lonely, calm mood.",
    "Stories without words|🏠|He left out details so that viewers imagine the story. His house and street paintings still influence films and photographers."
  ], [
    "Edward Hopper was a painter from the...|United States|Netherlands|Mexico|🌃",
    "Which painting by Hopper shows a diner at night?|Nighthawks|Water Lilies|Guernica",
    "Hopper's pictures often have a mood that feels...|quiet and thoughtful|loud and silly|spooky and wild",
    "Hopper used strong light and long...|shadows|rainbows|stripes|💡",
    "Hopper left out details so viewers could...|imagine the story|find the price|count dots",
    "Hopper mainly painted scenes of...|ordinary American places|space travel|ancient battles",
    "Hopper's work has influenced...|films and photographers|only sculptors|nobody",
    "Hopper lived in the...|1900s|1500s|2100s"
  ], "Think of a glowing diner window on a quiet night street."));
  b.push(L("American Regionalism", [
    "Painting home|🌾|<b>Regionalism</b> was an American art movement in the 1930s. Artists such as Grant Wood, Thomas Hart Benton and John Steuart Curry painted rural Midwest life.",
    "American Gothic|🏡|Grant Wood's painting <b>American Gothic</b> (1930) shows a farmer and his daughter in front of a farmhouse with a pointed Gothic-style window.",
    "Not abstract|🚜|Regionalists chose clear, realistic pictures of farms and small towns, instead of the abstract art that was popular in Europe."
  ], [
    "Regionalism painted life in the rural...|Midwest|Arctic|Sahara|🌾",
    "Who painted American Gothic?|Grant Wood|Georgia O'Keeffe|Paul Klee",
    "American Gothic was painted in...|1930|1630|2030",
    "The house in the painting has a pointed window in the style of...|Gothic buildings|pyramids|igloos|🏡",
    "Another Regionalist was...|Thomas Hart Benton|Pablo Picasso|Salvador Dali",
    "Regionalists painted in a style that was...|clear and realistic|completely abstract|blurry and invisible",
    "The movement was strongest in the...|1930s|1730s|1830s",
    "Regionalist subjects included farms and...|small towns|space stations|volcanoes"
  ], "Think of a farmer and a farmhouse with a pointed window."));
  b.push(L("Norman Rockwell and magazines", [
    "Cover artist|📰|<b>Norman Rockwell</b> (1894-1978) painted covers for The Saturday Evening Post for over 40 years. His pictures show warm, funny scenes of American life.",
    "Telling a story|😄|Each cover tells a small story in one picture, using faces and body language. He often used photographs of friends and neighbors as models to plan his paintings.",
    "Illustration|✏️|He was an <b>illustrator</b>, an artist whose pictures go with stories, news or ads. Many people loved his work, though critics of his time argued about whether it was fine art."
  ], [
    "Norman Rockwell painted covers for...|The Saturday Evening Post|a video game|a cereal box only|📰",
    "Rockwell's pictures show scenes that are...|warm and funny|dark and scary|completely abstract",
    "An artist whose pictures go with stories or ads is an...|illustrator|architect|potter|✏️",
    "Rockwell planned paintings using photographs of...|friends and neighbors|moons|robots",
    "Each Rockwell cover tells a small...|story|spelling test|math problem",
    "Rockwell worked as a cover artist for over...|40 years|4 days|4 minutes",
    "Rockwell was from the...|United States|Norway|India",
    "Rockwell shows feelings through faces and...|body language|secret codes|color charts"
  ], "Think of magazine covers that tell a friendly story in one picture."));
  b.push(L("Marc Chagall", [
    "Dream colors|🎻|<b>Marc Chagall</b> (1887-1985) was born in Belarus and lived in Russia and France. His paintings float with dreamlike scenes of villages, animals, musicians and flying figures.",
    "Memory pictures|🐓|Chagall painted memories and feelings instead of realistic views. Houses may float, a goat may play a violin, and the colors glow.",
    "Stained glass|🪟|Chagall also designed stained glass windows, including blue windows for Jerusalem and for churches and cathedrals in France."
  ], [
    "Marc Chagall's paintings often look...|dreamlike|like photos|made only of black lines|🎻",
    "Chagall was born in...|Belarus|Brazil|Australia",
    "Chagall often painted memories of his...|village|spaceship|computer",
    "In a Chagall picture, a figure might...|float in the air|stay still as a ruler|be a number",
    "Besides paintings, Chagall designed...|stained glass windows|video games|race cars|🪟",
    "Chagall's colors are usually...|rich and glowing|completely gray|all the same",
    "Musicians in his art often play the...|violin|keyboard|drums on the moon",
    "Chagall lived for part of his life in...|France|Antarctica|the Arctic"
  ], "Think of floating houses and a goat with a violin."));
  b.push(L("Constructivism and Russian posters", [
    "Art for a new age|📐|<b>Constructivism</b> began in Russia around 1915-1920. Artists wanted to build art like engineers, using geometric shapes, bold lines and modern materials.",
    "Poster style|📣|Constructivist posters use red, black and white, big diagonal lines and strong sans-serif letters. They influenced modern graphic design for a hundred years.",
    "Names to know|🔴|Famous Constructivists include El Lissitzky, Alexander Rodchenko and Varvara Stepanova, who designed posters, books, clothes and buildings."
  ], [
    "Constructivism began in which country?|Russia|Italy|Egypt|📐",
    "Constructivists wanted to build art like...|engineers|ghosts|clowns",
    "Constructivist posters often use red black and...|white|pink|silver stripes|🔴",
    "They liked big diagonal...|lines|clouds|pillows",
    "Which artist was a Constructivist?|El Lissitzky|Rembrandt|Vermeer",
    "Constructivism shaped modern...|graphic design|cooking|farming|📣",
    "The movement started around...|1915-1920|1115-1120|1995-2000",
    "Constructivist letters are usually...|bold and sans-serif|swirly and decorated|tiny and invisible"
  ], "Think of red, black and white posters with diagonal shapes."));
  b.push(L("Suprematism and Malevich", [
    "Pure shapes|⬛|<b>Kazimir Malevich</b> (1879-1935) was a Russian painter. In 1915 he began <b>Suprematism</b>, an art made only of simple geometric shapes on a plain background.",
    "Black Square|◼️|His most famous work, <b>Black Square</b>, is just a black square on a white background. He wanted art that was free from showing objects and was just about feeling.",
    "Floating shapes|✈️|Other Suprematist paintings have rectangles and lines that seem to float in white space, as if seen from an airplane or flying through space."
  ], [
    "Suprematism was started by...|Kazimir Malevich|Edgar Degas|Jan van Eyck|⬛",
    "Malevich was from...|Russia|Spain|Peru",
    "Malevich's most famous painting is...|Black Square|Hunters in the Snow|American Gothic|◼️",
    "Suprematism uses only simple...|geometric shapes|portraits|landscapes",
    "Suprematism began in...|1915|1615|2015",
    "Suprematist shapes often seem to...|float in white space|stick to a wall|speak",
    "Malevich wanted art that was free from showing...|real objects|colors|paper",
    "Suprematism is a kind of...|abstract art|portrait art|realism"
  ], "Think of a single black square on a white background."));
  b.push(L("Roy Lichtenstein", [
    "Comic style|💬|<b>Roy Lichtenstein</b> (1923-1997) was an American Pop artist. He painted big versions of comic book pictures with thick black outlines and bright primary colors.",
    "Ben-Day dots|🔴|Old comics were printed with tiny dots of ink, called <b>Ben-Day dots</b>. Lichtenstein painted these dots by hand, making them very large.",
    "Why?|🖼️|He asked viewers: what is fine art? His art showed that everyday printed images can be interesting art, just like old paintings."
  ], [
    "Roy Lichtenstein based his art on...|comic books|ancient temples|maps of the sea|💬",
    "Lichtenstein was part of which movement?|Pop art|Romanticism|Baroque",
    "Tiny dots used in old comic printing are called...|Ben-Day dots|pixels only|sparkles|🔴",
    "Lichtenstein painted his dots...|by hand and large|with a laser|invisibly",
    "His pictures have thick black...|outlines|clouds|ropes",
    "He used bright colors, mostly the...|primary colors|neutral colors only|pastels only",
    "Lichtenstein's art asks what counts as...|fine art|a good sandwich|a fast car",
    "Lichtenstein was from the...|United States|Mongolia|Italy"
  ], "Think of a giant comic panel painted with large dots."));
  b.push(L("Anish Kapoor and Cloud Gate", [
    "The Bean|🫘|<b>Cloud Gate</b> is a giant steel sculpture in Chicago by Anish Kapoor. People call it The Bean. It was finished in 2006.",
    "Mirror skin|🪞|It is made of polished stainless steel plates welded together with no visible seams. Its curved surface reflects the sky, the city and the visitors who walk underneath.",
    "Big ideas|☁️|Kapoor was born in India and works in England. He likes simple shapes, shiny surfaces and deep dark spaces that make people think about what they see."
  ], [
    "Cloud Gate is a sculpture in which city?|Chicago|Rome|Sydney|🫘",
    "People nickname Cloud Gate...|The Bean|The Moon|The Bridge",
    "Cloud Gate is made of polished...|stainless steel|wood|clay|🪞",
    "Its surface reflects...|the sky and the city|nothing at all|only paper",
    "Who made Cloud Gate?|Anish Kapoor|Louise Nevelson|Claes Oldenburg",
    "Cloud Gate has no visible...|seams|colors|people",
    "Visitors can walk...|underneath it|only on its top|inside a hidden room",
    "Kapoor was born in...|India|Greenland|Canada"
  ], "Think of a huge shiny bean-shaped sculpture that reflects the city."));
  b.push(L("Louise Nevelson", [
    "Wooden walls|🪵|<b>Louise Nevelson</b> (1899-1988) was an American sculptor. She collected scraps of wood, such as chair legs, boxes and railings, found in the streets of New York.",
    "One color|⬛|She stacked the pieces into big box shelves like walls, then painted everything one color, often black, white or gold. The single color joins the parts into one huge sculpture.",
    "Assemblage|🧩|Making art by joining found objects is called <b>assemblage</b>. Nevelson turned things people threw away into powerful art."
  ], [
    "Louise Nevelson made sculptures from...|wood scraps|ice|soap bubbles|🪵",
    "Nevelson usually painted her walls...|one color|a rainbow|a different color on each piece",
    "Art made by joining found objects is called...|assemblage|fresco|etching|🧩",
    "Nevelson found her wood in the streets of...|New York|Venice|Cairo",
    "Painting everything one color makes the parts feel...|joined as one|unrelated|invisible",
    "A color often used by Nevelson was...|black|neon green|pink with stripes",
    "Her sculptures look like big...|walls of boxes|bubbles|airplanes",
    "Nevelson turned thrown-away things into...|art|plants|toys only"
  ], "Think of a wall of boxes made from scrap wood, all painted black."));
  b.push(L("James Turrell and light art", [
    "Light is the medium|🌅|<b>James Turrell</b> (born 1943) is an American artist who uses light itself as his material. He makes rooms and spaces where color light seems to float.",
    "Skyspaces|🌌|A Turrell <b>Skyspace</b> is a room with an opening in the ceiling. At dusk, as the sky changes, colored lights inside make the sky seem close and flat like a painting.",
    "Roden Crater|🏜️|Turrell has spent decades shaping an extinct volcano crater in Arizona, called Roden Crater, to watch the sun, moon and stars."
  ], [
    "James Turrell uses what as his main material?|light|bronze|clay|🌅",
    "A Turrell room with an opening in the ceiling is a...|Skyspace|Beanroom|Paintbox",
    "At dusk, the sky in a Skyspace seems...|close and flat like a painting|far away and invisible|made of paper",
    "Roden Crater is in which state?|Arizona|Alaska|Florida|🏜️",
    "Roden Crater was once a...|volcano|lake|school",
    "Turrell is from the...|United States|Mexico|Norway",
    "Turrell's art makes you notice...|how you see light|how to bake bread|how to count",
    "Colored lights and sky in a Skyspace change with...|time of day|a coin|a language"
  ], "Think of an artist who shapes light and sky instead of paint."));
  b.push(L("Modern architecture", [
    "Less is more|🏢|In the early 1900s, architects began to design <b>modern</b> buildings with steel, glass and concrete. Mies van der Rohe said, 'less is more', meaning simple is strong.",
    "Le Corbusier|🏠|Le Corbusier (Swiss-French) designed buildings raised on pillars with flat roof gardens and large windows. He called a house 'a machine for living'.",
    "Form follows function|🔧|Many modern architects believed a building's shape should come from its purpose. They avoided extra decoration and valued clean lines."
  ], [
    "Modern architects often built with steel glass and...|concrete|cheese|snow|🏢",
    "Who said 'less is more'?|Mies van der Rohe|Leonardo da Vinci|Claude Monet",
    "Le Corbusier raised buildings on...|pillars|balloons|clouds|🏠",
    "'Form follows function' means shape should come from...|purpose|decoration|price|🔧",
    "Modern buildings avoid extra...|decoration|windows|walls",
    "Le Corbusier worked in Switzerland and...|France|Peru|Egypt",
    "Modern architecture started in the early...|1900s|1100s|2200s",
    "Large windows let in a lot of...|light|snow|sand"
  ], "Think of simple clean buildings made of glass, steel and concrete."));
  b.push(L("Sydney Opera House", [
    "Sails by the sea|⛵|The <b>Sydney Opera House</b> in Australia stands on Sydney Harbour. Its white roofs look like sails or shells. It opened in 1973.",
    "Danish architect|📐|It was designed by the Danish architect <b>Jorn Utzon</b>, who won a world competition in 1957. The roof shapes were hard to build, and engineers solved the problem by making them all from parts of one sphere.",
    "Tiles|🏛️|The roof is covered with over a million white and cream tiles that shine in the sun. It is a UNESCO World Heritage Site."
  ], [
    "The Sydney Opera House is in...|Australia|Canada|Egypt|⛵",
    "Its roofs look like sails or...|shells|cars|pencils",
    "Who designed it?|Jorn Utzon|Frank Lloyd Wright|Zaha Hadid|📐",
    "Utzon came from...|Denmark|Italy|Mexico",
    "The Opera House opened in...|1973|1873|2073",
    "The roof is covered with more than a million...|tiles|bricks of gold|bubbles|🏛️",
    "Engineers solved the roof design by using parts of one...|sphere|cube|pyramid",
    "The Opera House stands next to...|a harbour|a desert|a glacier"
  ], "Think of the white sail-shaped roofs on Sydney Harbour."));
  b.push(L("Green and sustainable design", [
    "Caring for Earth|🌱|<b>Sustainable design</b> means making things in ways that protect the planet. Designers think about materials, energy, waste and how long a product will last.",
    "Three Rs|♻️|Reduce, reuse and recycle. Artists reuse old bottles, fabric or metal. Architects add solar panels, green roofs with plants and use wood from well-managed forests.",
    "Design for life|🌍|A good sustainable design is useful, lasts a long time and is easy to repair or recycle at the end."
  ], [
    "Designing in ways that protect the planet is called...|sustainable design|rapid design|loud design|🌱",
    "The three Rs are reduce reuse and...|recycle|redo|remove|♻️",
    "A roof covered with plants is a...|green roof|blue flag|gray cloud",
    "Solar panels collect energy from the...|sun|moon rocks|ocean fish",
    "Sustainable products should last...|a long time|only one minute|just one hour",
    "Art made from old bottles and metal is an example of...|reuse|waste|mining",
    "Designers also think about energy and...|waste|ghosts|jokes",
    "At the end of its life, a good design is easy to...|recycle|lose|bury"
  ], "Think of designs that reuse materials and protect nature."));
  b.push(L("Molas of the Guna people", [
    "Layered cloth|🧵|The Guna people live on islands off the coast of Panama. Guna women make <b>molas</b>, colorful panels of layered cloth that become the front and back of a blouse.",
    "Reverse appliqué|✂️|Mola makers stack several layers of bright cloth, cut shapes through the top layers and sew the edges down. This technique is called <b>reverse appliqué</b>.",
    "Designs|🐠|Molas show fish, birds, plants, stories and geometric patterns. They are also sold as art around the world."
  ], [
    "Molas are made by the Guna people of...|Panama|Iceland|Mongolia|🧵",
    "A mola is made from layers of...|cloth|clay|ice",
    "The sewing technique used is called reverse...|appliqué|etching|glaze|✂️",
    "In a mola, shapes are cut through the top...|layers|window|clock",
    "Mola designs include fish and...|birds|robots|rockets|🐠",
    "Molas become part of a...|blouse|boat|building",
    "The Guna live on islands off the coast of...|Panama|Norway|Egypt",
    "Mola panels are bright and...|colorful|invisible|made of metal"
  ], "Think of layered colorful cloth with cut-out animal shapes."));
  b.push(L("Madhubani painting", [
    "From Bihar|🦚|<b>Madhubani</b> painting is a folk art from the Mithila region of Bihar, India. It was traditionally painted by women on the walls of houses for festivals.",
    "Patterns everywhere|🌺|The style has bold outlines and fills every space with patterns. Common subjects are peacocks, fish, flowers, the sun and moon, and stories from Hindu tales.",
    "Natural colors|🖌️|Artists once used natural colors from plants, flowers and soot, and painted with twigs, matchsticks or fingers. Today the art is also made on paper and cloth."
  ], [
    "Madhubani painting comes from...|India|Greenland|Argentina|🦚",
    "Madhubani paintings were traditionally painted on...|house walls|airplanes|computers",
    "The style fills spaces with...|patterns|empty white|photographs|🌺",
    "A common Madhubani subject is a...|peacock|race car|skyscraper",
    "Artists once painted with twigs and...|matchsticks|laser pens|spray cans|🖌️",
    "Natural colors came from plants and...|soot|plastic|metal",
    "Madhubani outlines are...|bold|invisible|only dotted",
    "Today Madhubani is also made on paper and...|cloth|ice|glass bricks"
  ], "Think of a bright folk art from India with peacocks and patterns."));
  b.push(L("Wayang shadow puppets", [
    "Shadows on a screen|🎭|<b>Wayang kulit</b> is the shadow puppet theater of Java and Bali in Indonesia. Flat leather puppets are held in front of a lamp so their shadows fall on a white screen.",
    "Craft|🦇|The puppets are carefully cut and punched from buffalo hide and painted. Fine lace-like holes create patterns in the shadow. Rods move the arms.",
    "Storyteller|🗣️|A puppet master called the <b>dalang</b> tells the stories, moves the puppets and speaks all the voices, with a musical orchestra called gamelan."
  ], [
    "Wayang kulit is a theater of...|shadow puppets|robots|live animals|🎭",
    "Wayang comes from which country?|Indonesia|Spain|Canada",
    "The puppet master is called the...|dalang|dancer|doctor|🗣️",
    "The puppets are made from carefully cut...|leather|glass|paper clips",
    "The shadows fall on a white...|screen|ceiling fan|sail",
    "The orchestra that plays with wayang is called...|gamelan|choir|marching band",
    "Fine holes in the puppet create patterns in the...|shadow|floor|sky",
    "One person tells the story and speaks...|all the voices|only one word|no words"
  ], "Think of leather puppets, a lamp and a screen in Indonesia."));
  b.push(L("Hand-drawn versus CGI animation", [
    "Two ways|🖍️|<b>Hand-drawn (2D) animation</b> uses thousands of drawings, each a little different, shown quickly to make movement. <b>CGI</b> (computer-generated imagery) builds 3D models inside a computer.",
    "Rigs and frames|🎞️|In CGI, an animator moves a digital skeleton called a <b>rig</b> and the computer fills in the frames between key poses. Film usually plays at 24 frames per second.",
    "Mixing styles|🎬|Many films now blend 2D and 3D. A movie like Spider-Man: Into the Spider-Verse uses 3D models but also comic-style lines and dots to look drawn."
  ], [
    "Animation made from thousands of drawings is called...|hand-drawn 2D animation|photography|sculpture|🖍️",
    "CGI stands for computer-generated...|imagery|image tapes|ideas",
    "In CGI, a digital skeleton that moves is called a...|rig|brush|mold",
    "Film usually plays at about how many frames per second?|24|2|240|🎞️",
    "In CGI, the computer helps fill the frames between...|key poses|walls|colors",
    "Many modern films mix 2D and 3D...|styles|rooms|houses",
    "Spider-Man: Into the Spider-Verse used 3D models plus comic-style...|lines and dots|real clay|puppets|🎬",
    "Hand-drawn animation shows many drawings...|quickly in order|only one at a time forever|as a statue"
  ], "Think of thousands of drawings versus models inside a computer."));
  b.push(MIX("Mixed practice", [b[0], b[2], b[4], b[6], b[8], b[10], b[12], b[14], b[16]]));
  b.push(MIX("Level 20 Challenge", [b[1], b[3], b[5], b[7], b[9], b[11], b[13], b[15], b[17], b[18]]));

  // ================= LEVEL 21 =================
  const c = [];
  c.push(L("Itten's color contrasts", [
    "A Bauhaus teacher|🎓|<b>Johannes Itten</b> (1888-1967) taught color at the Bauhaus school. He described seven ways colors can contrast, to help artists choose colors that work together.",
    "Some of the seven|🌈|They include <b>contrast of hue</b> (pure colors side by side), <b>light-dark</b>, <b>cold-warm</b>, <b>complementary</b>, <b>simultaneous</b>, <b>saturation</b> (bright versus dull) and <b>extension</b> (how much space each color takes).",
    "Using them|🖌️|An artist can use cold-warm contrast to make an orange sun pop against a blue sky, or saturation contrast to make one bright spot stand out from dull colors."
  ], [
    "Who described seven color contrasts?|Johannes Itten|Raphael|Georges Seurat|🎓",
    "Itten taught at the...|Bauhaus|Louvre|Moon school",
    "Bright color next to dull color shows contrast of...|saturation|extension|echo|🌈",
    "Orange next to blue shows mostly...|cold-warm contrast|no contrast|weight contrast",
    "How much space each color takes is called contrast of...|extension|hue|firing",
    "Pure colors side by side show contrast of...|hue|texture|stone",
    "Light yellow next to deep purple shows contrast of...|light and dark|sound|time",
    "Itten's seven contrasts help artists...|choose colors that work together|find the price|clean brushes"
  ], "Think of ways two colors can be different from each other."));
  c.push(L("Simultaneous contrast", [
    "Colors change each other|👀|A color can look different depending on its neighbor. This effect is called <b>simultaneous contrast</b>. The same gray square can look lighter on a dark background and darker on a light one.",
    "Chevreul|🧪|French chemist <b>Michel Eugene Chevreul</b> studied this in the 1830s when he worked at a tapestry factory. He found that dyed threads looked different next to other colors.",
    "Afterimages|💡|Your eyes also tend to see a faint complementary color next to a strong color. Impressionists and Seurat used this to make colors vibrate."
  ], [
    "A color looking different because of its neighbor is called...|simultaneous contrast|pigment binding|glazing|👀",
    "A gray square on a dark background looks...|lighter|invisible|square-shaped no more",
    "Who studied this effect in the 1830s?|Michel Eugene Chevreul|Andy Warhol|Louise Bourgeois|🧪",
    "Chevreul worked at a factory that made...|tapestries|rockets|chocolate",
    "Chevreul was a...|chemist|pilot|goalkeeper",
    "Which artist used the effect to make colors vibrate?|Georges Seurat|Jan van Eyck|Louise Nevelson",
    "Next to a strong color, the eye adds a faint...|complementary color|word|sound",
    "The effect shows that colors are never seen...|completely alone|in black and white only|only at night"
  ], "Think about how a gray looks different on dark and light backgrounds."));
  c.push(L("Visual weight and balance", [
    "Heavy and light|⚖️|Every part of a picture has <b>visual weight</b>, how strongly it pulls the eye. Big, dark, bright or detailed things feel heavier than small, pale, simple ones.",
    "Balance|⚖️|Artists balance weight. A small bright object far from the center can balance a big dull one close to it, like a seesaw. Perfect mirror balance is <b>symmetrical</b>; uneven but steady balance is <b>asymmetrical</b>.",
    "Eye stops|🎯|The heaviest part is often the focal point. An artist can guide the eye by placing weight where they want people to look first."
  ], [
    "How strongly something pulls the eye is its visual...|weight|battery|frame|⚖️",
    "Which usually has more visual weight?|A large dark shape|A small pale shape|A thin faded line",
    "A mirror-perfect arrangement is...|symmetrical|asymmetrical|unfinished",
    "An uneven yet steady arrangement is...|asymmetrical|symmetrical|broken",
    "A small bright object can balance a big dull one if it is...|far from the center|exactly the same|hidden",
    "The heaviest part of a picture is often the...|focal point|signature|border|🎯",
    "Bright colors usually have...|more visual weight|less visual weight than gray|no weight",
    "Balance in an artwork is like a...|seesaw|a puddle|a stopwatch"
  ], "Think of a seesaw and which things pull your eye harder."));
  c.push(L("Sight-size and measuring", [
    "Seeing true size|📏|When drawing from life, artists often hold a pencil at arm's length and close one eye. This lets them compare the real size of parts of what they see.",
    "Plumb and level|📐|Hold the pencil straight up and down to check if two points line up vertically (a <b>plumb line</b>). Hold it flat to check angles against the horizontal.",
    "Sight-size|👁️|In the <b>sight-size</b> method, the artist stands back and puts the drawing next to the subject so that both look the same size. Then comparing is easy."
  ], [
    "To measure, artists hold a pencil at...|arm's length|their ankle|the wall|📏",
    "To measure, they usually close...|one eye|both eyes|their mouth",
    "Checking if two points line up vertically uses a...|plumb line|pizza|rainbow|📐",
    "A pencil held flat checks angles against the...|horizontal|clock|window frame",
    "In sight-size, the drawing is placed next to...|the subject|a mirror ball|the ceiling",
    "In sight-size, the artist stands...|back from the work|inside the work|upside down|👁️",
    "Sight-size helps compare sizes...|directly|by guessing wildly|using a phone",
    "Keeping the arm straight helps make measurements...|consistent|messy|secret"
  ], "Think of a pencil held out and one eye closed."));
  c.push(L("Anatomy landmarks for artists", [
    "Under the surface|🦴|Artists study the skeleton and muscles to draw people so they look natural. Bones are fixed in length, so they show proper proportions.",
    "Landmarks|📍|Bony landmarks show through the skin, like the collarbone, elbow, wrist, knee and ankle. They help artists place parts of the body without guessing.",
    "Muscle shapes|💪|Muscles bulge when they work. The biceps on the upper arm and the calf muscle on the lower leg are shapes that change when someone moves."
  ], [
    "Why do artists study the skeleton?|To draw people naturally|To count teeth|To pick paint|🦴",
    "Which of these is a bony landmark?|Collarbone|Eyelash|Hair",
    "Bones show proper...|proportions|colors|jokes",
    "The biceps are on the...|upper arm|foot|forehead|💪",
    "The calf muscle is on the lower...|leg|arm|ear",
    "Muscles bulge when they...|work|sleep|dry",
    "An elbow is a place where bones show...|through the skin|only in photographs|never",
    "Which joint is in the leg?|Knee|Elbow|Wrist"
  ], "Think of the bones and muscles beneath the skin."));
  c.push(L("Egg tempera and icons", [
    "Painting with egg|🥚|<b>Egg tempera</b> uses powdered pigment mixed with egg yolk. It dries fast to a smooth, matte finish and lasts hundreds of years.",
    "Wood and gold|🪙|Byzantine and Russian icons were often painted on wooden panels with egg tempera, then decorated with thin sheets of <b>gold leaf</b> for the halo and background.",
    "Layers|✨|Painters work from dark to light in thin, slightly overlapping strokes. Because tempera dries so quickly, they cannot blend as smoothly as in oil."
  ], [
    "Egg tempera mixes pigment with...|egg yolk|chocolate|toothpaste|🥚",
    "Egg tempera dries...|fast|never|only in the rain",
    "Icons were often painted on...|wooden panels|glass bottles|balloons",
    "Thin sheets of gold used on icons are called...|gold leaf|gold paint dots|gold tape|🪙",
    "Compared with oil, tempera is...|harder to blend smoothly|easier to blend forever|always runny",
    "Tempera finishes are usually...|matte|neon|rubbery",
    "Tempera painters usually build up...|thin strokes|one giant blob|only dots",
    "Which kind of art often used egg tempera and gold leaf?|Byzantine icons|Graffiti|Comics"
  ], "Think about paint made with a kitchen ingredient and gold."));
  c.push(L("Lithography", [
    "Printing from stone|🪨|<b>Lithography</b> was invented in 1796 by Alois Senefelder in Germany. The artist draws on a flat limestone slab with a greasy crayon.",
    "Oil and water don't mix|💧|The stone is wet with water, and then oily ink is rolled on. The ink sticks only to the greasy drawing and is pushed away by the wet parts. Paper pressed on top picks up the picture.",
    "Famous prints|🖼️|Lithographs let artists make many soft, crayon-like prints. Toulouse-Lautrec used lithography for his colorful posters in Paris."
  ], [
    "Lithography prints from a flat...|stone|balloon|sponge cake|🪨",
    "Lithography was invented in...|1796|1096|1996",
    "Who invented lithography?|Alois Senefelder|Roy Lichtenstein|Raphael",
    "The artist draws with a greasy...|crayon|ruler|mirror",
    "The ink sticks only to the...|greasy drawing|wet areas|nothing at all|💧",
    "Lithography relies on oil and water not...|mixing|burning|freezing",
    "Which artist made colorful lithograph posters in Paris?|Toulouse-Lautrec|Frederic Church|Michelangelo",
    "Lithographs often look like...|soft crayon drawings|carved wood only|cut paper"
  ], "Think of a stone drawing that repels water and holds ink."));
  c.push(L("Stone carving", [
    "Marble|🗿|Carved stone has been used for sculpture for thousands of years. Marble is popular because it is strong but can be carved to a smooth, soft-looking surface. The finest marble comes from Carrara, Italy.",
    "Subtractive|⛏️|Carving is <b>subtractive</b> sculpture: the artist removes material to reveal the shape. The artist cannot put the stone back, so planning is important.",
    "Tools|🔨|Carvers use a point chisel to remove lots of stone, a tooth chisel to refine, and rasps and sandpaper to smooth. They finish by polishing."
  ], [
    "A famous kind of stone for carving is...|marble|butter|fabric|🗿",
    "Famous marble comes from Carrara in...|Italy|Canada|Australia",
    "Sculpture made by removing material is...|subtractive|additive|liquid",
    "Why is planning important in carving?|Removed stone cannot be put back|The stone is edible|Stone melts in the sun|⛏️",
    "A tool for removing lots of stone is a...|point chisel|feather|spoon",
    "Rasps and sandpaper are used to...|smooth the surface|add color|make noise",
    "The last step is often...|polishing|baking|stretching",
    "Modeling clay by adding is the opposite of...|carving|painting|singing"
  ], "Think of a sculptor who chips away stone to reveal a shape."));
  c.push(L("Welded sculpture", [
    "Joining metal|🔥|Some sculptors cut and join pieces of steel with a hot welding torch. This is called <b>welded sculpture</b>.",
    "David Smith|🔩|The American sculptor <b>David Smith</b> (1906-1965) learned welding in a car factory. He made huge abstract metal sculptures that look like drawings in space.",
    "Safety|🧤|Welders wear a helmet with a dark lens, gloves and protective clothing. The bright light and heat can harm eyes and skin, so safety comes first."
  ], [
    "Joining metal pieces with a hot torch is called...|welding|weaving|knitting|🔥",
    "Which sculptor made welded steel art after working in a car factory?|David Smith|Mary Cassatt|Raphael",
    "David Smith's sculptures often look like drawings in...|space|water|sand|🔩",
    "Welders wear a helmet with a...|dark lens|colorful hat|snorkel",
    "Why do welders wear gloves?|To protect from heat|To look fancy|To hide paint",
    "Welded sculptures are often made of...|steel|ice cream|cotton",
    "Smith's art was mostly...|abstract|a photo copy|invisible",
    "Welding light can harm...|eyes|clouds|homework"
  ], "Think of metal parts joined with a bright, hot torch."));
  c.push(L("Hilma af Klint", [
    "A secret pioneer|🔮|<b>Hilma af Klint</b> (1862-1944) was a Swedish artist. Around 1906 she began painting large abstract pictures with circles, spirals and flowing shapes, years before Kandinsky.",
    "Hidden for years|🗝️|She believed the world was not ready for her work, so she asked that it stay unseen until twenty years after she died. It became widely known only in the 1980s and later.",
    "Huge paintings|🌸|Her series called The Paintings for the Temple includes huge canvases in bright colors. Today she is seen as one of the first abstract artists."
  ], [
    "Hilma af Klint was from...|Sweden|Egypt|Japan|🔮",
    "Her large abstract paintings began around...|1906|1606|1996",
    "Her shapes include circles and...|spirals|photographs|faces only|🌸",
    "Hilma af Klint asked that her work stay unseen for...|twenty years after her death|a hundred days|no time",
    "She is now seen as one of the first...|abstract artists|printing presses|CGI animators",
    "Her work became widely known in the...|1980s and later|1500s|1700s",
    "Compared with Kandinsky, she began painting abstract art...|earlier|later|never",
    "Her art is mostly...|colorful and abstract|black and white photos|portraits of kings"
  ], "Think of a Swedish painter who made abstract art very early."));
  c.push(L("Kerry James Marshall", [
    "Painting Black life|🎨|<b>Kerry James Marshall</b> (born 1955) is an American painter. He paints scenes of everyday Black life, such as families, gardens, music and neighborhoods.",
    "Deep black|⚫|He often paints skin in very rich, deep black so that Black figures are clearly and proudly seen in a museum history where they were left out.",
    "Big and detailed|🏘️|His large paintings have many details and patterns. He wants Black people to have a place in the history of art alongside the great masters."
  ], [
    "Kerry James Marshall is a painter from the...|United States|Peru|Iceland|🎨",
    "He paints scenes of everyday...|Black life|space stations|ancient battles",
    "His figures are painted in rich deep...|black|neon yellow|silver|⚫",
    "Marshall wants Black people to have a place in the history of...|art|baking|weather",
    "Marshall's paintings are usually...|large and detailed|tiny and blank|made of lights",
    "Marshall was born in...|1955|1655|2055",
    "His subjects include gardens and...|music|volcanoes|robots",
    "He paints Black figures so they are seen...|clearly and proudly|only in shadows|only in dreams"
  ], "Think of large paintings celebrating everyday life of Black families."));
  c.push(L("Dunhuang and the Silk Road", [
    "Caves of paintings|🏜️|Near the city of Dunhuang in China, hundreds of caves were carved into a cliff starting around the 300s CE. They are called the <b>Mogao Caves</b>.",
    "Silk Road meeting place|🐪|Dunhuang was a stop on the <b>Silk Road</b>, the trade routes that linked China with Central Asia and Europe. Travelers brought ideas and religions with them.",
    "Walls of art|🪷|The cave walls and statues are covered in thousands of square meters of paintings, mostly Buddhist, which mix Chinese, Indian and Central Asian styles. A hidden library cave held ancient scrolls."
  ], [
    "The Mogao Caves are near the city of...|Dunhuang|Paris|Mexico City|🏜️",
    "Mogao is in which country?|China|Brazil|Norway",
    "The Silk Road was a network of...|trade routes|volcanoes|games|🐪",
    "The Silk Road linked China with Central Asia and...|Europe|Antarctica|the Moon",
    "The cave walls are covered in...|paintings|neon signs|carpets",
    "Most of the cave paintings are...|Buddhist|Viking|Roman",
    "Travelers on the Silk Road brought ideas and...|religions|computers|snowmobiles",
    "The art in the caves mixes styles from China India and...|Central Asia|Iceland|Mexico"
  ], "Think of painted caves on the Silk Road in China."));
  c.push(L("Celtic knots and the Book of Kells", [
    "Endless knots|🪢|Celtic art is known for <b>knotwork</b>, bands that weave over and under each other with no beginning or end. It also uses spirals and animal shapes.",
    "Book of Kells|📖|The <b>Book of Kells</b> is a beautifully decorated manuscript of the four Gospels, made by monks around 800 CE. It is kept in Trinity College Dublin, Ireland.",
    "Tiny and rich|🔍|Its pages are filled with huge decorated letters, little animals and tiny patterns. Some details are so small that you need a magnifying glass to see them."
  ], [
    "Bands that weave over and under with no end are called...|knotwork|pottery|stencils|🪢",
    "The Book of Kells was made by...|monks|astronauts|builders",
    "It was made around...|800 CE|1800 CE|2000 CE",
    "The Book of Kells is kept in...|Dublin|Tokyo|Cairo|📖",
    "Which shapes are common in Celtic art?|Spirals|Skyscrapers|Smiley faces",
    "Some details are so small you need a...|magnifying glass|ladder|telescope|🔍",
    "The Book of Kells is a decorated...|manuscript|building|toy",
    "Pages include huge decorated...|letters|clouds|bridges"
  ], "Think of endless woven bands and a decorated Irish manuscript."));
  c.push(L("Botanical illustration", [
    "Drawing plants for science|🌿|<b>Botanical illustration</b> shows plants accurately so that scientists can identify them. It shows leaves, flowers, fruit, roots and sometimes a cut view.",
    "Maria Sibylla Merian|🦋|<b>Maria Sibylla Merian</b> (1647-1717) was a German artist and naturalist. She studied insects and plants closely and showed butterflies, caterpillars and the plants they live on together in one picture.",
    "Surinam trip|🌺|In 1699 she traveled to Surinam in South America, with her daughter, to study insects and plants. She published her paintings in a famous book."
  ], [
    "Drawing plants accurately for science is...|botanical illustration|graffiti|cartooning|🌿",
    "Maria Sibylla Merian was a...|naturalist and artist|baker|king",
    "Merian studied insects and...|plants|clouds only|cars",
    "Merian painted butterflies together with their...|caterpillars and plants|trophies|computers|🦋",
    "In 1699 she traveled to...|Surinam|Antarctica|the Moon",
    "Botanical illustrations help scientists...|identify plants|bake bread|race cars",
    "Merian came from...|Germany|Peru|Australia",
    "A cut view of a plant might show...|parts inside|a cartoon|a car"
  ], "Think of an artist-scientist drawing butterflies and plants."));
  c.push(L("Conceptual art", [
    "Idea first|💡|In <b>conceptual art</b>, the idea matters more than the look of the finished object. It became important in the 1960s.",
    "One and Three Chairs|🪑|Joseph Kosuth's work <b>One and Three Chairs</b> (1965) shows a real chair, a photo of it and a dictionary definition of the word chair. It asks: what makes something a chair?",
    "Instructions|📝|Sol LeWitt wrote instructions for wall drawings that others could carry out. The idea belonged to the artist, but many people could make it."
  ], [
    "In conceptual art what matters most is the...|idea|brush size|frame|💡",
    "Conceptual art became important in the...|1960s|1360s|1860s",
    "One and Three Chairs was made by...|Joseph Kosuth|Winslow Homer|Jan van Eyck|🪑",
    "Kosuth's work shows a real chair a photo and a...|definition|clock|bird",
    "Sol LeWitt wrote instructions for...|wall drawings|cookies|spaceships|📝",
    "Others can carry out the artist's...|instructions|passwords|lunch",
    "Kosuth's work asks what makes something a...|chair|mountain|cloud",
    "Conceptual art can be made of...|words and ideas|only oil paint|only marble"
  ], "Think of art where the idea is the most important part."));
  c.push(L("Generative art", [
    "Rules and chance|🎲|<b>Generative art</b> is made using a system of rules, often a computer program, with some randomness. The artist designs the rules, and the system draws the result.",
    "Each one different|🌀|Changing a number in the program can give a different picture every time. Artists use loops, random numbers, noise and math patterns to make shapes and color.",
    "Early pioneers|🖥️|In the 1960s artists such as Vera Molnar, Frieder Nake and Georg Nees used early computers and plotters to make drawings from code."
  ], [
    "Art made from a system of rules is called...|generative art|portrait art|stone carving|🎲",
    "Generative art often uses a computer...|program|brush|cloth",
    "Randomness lets each picture be...|different|identical|invisible|🌀",
    "Which artist made early computer art in the 1960s?|Vera Molnar|Jan van Eyck|Hokusai",
    "Early computer drawings were made by machines called...|plotters|ovens|bikes|🖥️",
    "The artist designs the...|rules|pencil|canvas size only",
    "Artists use random numbers and...|math patterns|rubbers|bubble wrap",
    "Changing one number in the code can give...|a new image|a mistake always|nothing"
  ], "Think of a code that draws a new picture each time."));
  c.push(L("Motion graphics", [
    "Design that moves|🎬|<b>Motion graphics</b> are moving text, shapes and symbols. You see them in title sequences, ads, app screens and explainer videos.",
    "Keyframes|🔑|Animators set <b>keyframes</b>, points that mark the start and end of a change, such as position or size. The software fills in the movement between them, called <b>tweening</b>.",
    "Easing|📈|Easing makes motion speed up or slow down smoothly, like a real object, instead of moving at a stiff, robotic pace."
  ], [
    "Moving text and shapes are called...|motion graphics|oil paintings|stone carvings|🎬",
    "Points that mark the start and end of a change are...|keyframes|palettes|stencils|🔑",
    "Software filling in movement between keyframes is called...|tweening|firing|mixing",
    "Making motion speed up or slow down smoothly is...|easing|printing|framing|📈",
    "Where might you see motion graphics?|Title sequences|Cave walls|Stained glass",
    "Motion graphics can animate position or...|size|temperature|weight",
    "Without easing, motion can look...|stiff and robotic|alive and perfect|silent",
    "Motion graphics are used in app...|screens|rocks|forests"
  ], "Think of animated titles and moving shapes made with keyframes."));
  c.push(L("Art and well-being", [
    "Making art feels good|😊|Many people find that drawing, painting or making things helps them relax, focus and feel proud. It can give your mind a break from worries.",
    "Art therapy|🧑‍🎨|An <b>art therapist</b> is a trained professional who uses art-making to help people express feelings and feel better. You do not need to be good at art to enjoy it.",
    "Looking helps too|🏛️|Visiting a museum or seeing a mural can also calm people and spark ideas. Sharing art with friends can build connection."
  ], [
    "Making art can help people relax and...|focus|forget how to read|become taller|😊",
    "A trained professional who uses art to help people is an...|art therapist|auctioneer|sculpture|🧑‍🎨",
    "To enjoy making art, you need to be...|nothing special|a professional only|famous",
    "Art therapy helps people express...|feelings|passwords|taxes",
    "Visiting a museum can help people feel...|calm and inspired|worried only|nothing ever",
    "Sharing art with friends can build...|connection|noise only|walls",
    "Creating something can make you feel...|proud|bored all day|invisible",
    "Art can give your mind a break from...|worries|breathing|gravity"
  ], "Think about how drawing or painting can feel calming."));
  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[6], c[8], c[10], c[12], c[14], c[16]]));
  c.push(MIX("Level 21 Challenge", [c[1], c[3], c[5], c[7], c[9], c[11], c[13], c[15], c[17], c[18]]));

  Object.assign(ART_LEVELS, { 19: a, 20: b, 21: c });
})();
