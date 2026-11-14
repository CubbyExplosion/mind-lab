// ext/art-10-12.js  Art & Drawing levels 10-12
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // item string: question|answer|wrong1,wrong2|visual   (no commas inside answers)
  const L = (title, slides, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p[2].split(","), v: p[3] || "" }; });
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

  // ================= LEVEL 10 =================
  const a = [];
  a.push(L("Three-point perspective", [
    "A third point|🏙️|<b>Three-point perspective</b> adds a third vanishing point, above or below the page. It shows tall things seen from very high or very low.",
    "Looking up|⬆️|When you look up at a skyscraper, its sides seem to meet far above. The third point sits high in the sky.",
    "Looking down|⬇️|When you look down from a roof, the sides seem to meet far below. The third point sits low."
  ], [
    "How many vanishing points are in three-point perspective?|three|one,two|🏙️",
    "Looking up at a skyscraper, the third point is...|high above|far below,at the left edge",
    "Looking down from a roof, the third point is...|far below|high above,on the cloud",
    "Three-point perspective is good for drawing very...|tall buildings|flat meadows,tiny seeds",
    "One-point perspective has one vanishing point. Three-point has...|three|none,ten",
    "In three-point perspective, tall edges seem to...|lean toward a point|stay perfectly parallel,melt away",
    "A view looking up at a tower from the ground is called a...|worm's-eye view|bird's-eye view,side view|🪱",
    "A view looking down on a city from a helicopter is a...|bird's-eye view|worm's-eye view,close-up|🚁"
  ], "Count the vanishing points and think about up or down."));
  a.push(L("Light and cast shadows", [
    "The light source|💡|Shadows depend on where the light comes from. This place is the <b>light source</b>.",
    "Opposite side|🌳|A <b>cast shadow</b> falls on the opposite side from the light. Light from the left means a shadow to the right.",
    "Long or short|🌇|Low light, like at sunset, makes long shadows. A sun high at noon makes short shadows."
  ], [
    "The place light comes from is the light...|source|frame|palette|💡",
    "If light comes from the left, the cast shadow falls to the...|right|left,top",
    "At sunset, shadows are...|long|very short,missing|🌇",
    "At noon with the sun high, shadows are...|short|long,missing|☀️",
    "A shadow that falls on the ground from an object is a...|cast shadow|highlight,outline",
    "In a drawing, all shadows should go in the ___ direction.|same|random,opposite of each other",
    "If the light is above a ball, the shadow is mostly...|underneath it|high above it,behind a cloud|⚽",
    "Drawing the light source first helps you place the...|shadows|signature,frame"
  ], "Shadows fall away from the light."));
  a.push(L("Tetradic colors", [
    "Four colors|🟦|A <b>tetradic</b> scheme uses four colors made of two complementary pairs. Tetra means four.",
    "A rectangle|▭|On the color wheel, the four colors form a rectangle. An example is blue and orange with red and green.",
    "Balance|⚖️|With four colors it is easy to make a mess. Let one color lead and use the others as accents."
  ], [
    "A scheme with four colors in two complementary pairs is...|tetradic|triadic|monochromatic|🟦",
    "Tetradic colors make a ___ on the wheel.|rectangle|triangle|single dot",
    "How many colors are in a tetradic scheme?|four|three,six",
    "Tetradic schemes include how many complementary pairs?|two|one,four",
    "Which pair of colors could be in a tetradic scheme?|blue and orange|blue and blue-green,red and pink",
    "To keep four colors balanced, let ___ color lead.|one|none,all four equally",
    "Triadic uses three colors. Tetradic uses...|four|two,eight",
    "Tetra means...|four|three,rectangle"
  ], "Tetra means four."));
  a.push(L("Impasto", [
    "Thick paint|🎨|<b>Impasto</b> means putting paint on so thickly that you can see brush or knife marks.",
    "Texture you can see|🖌️|Impasto makes the paint stand up from the canvas, so it catches real light and shadow.",
    "Tools|🔪|Artists use stiff brushes or a palette knife. Oil and acrylic paint work well. Watercolor is too thin."
  ], [
    "Putting paint on very thickly is called...|impasto|wash|stippling|🎨",
    "Impasto paint stands up and makes real...|texture|silence|smell",
    "A tool that spreads thick paint is a palette...|knife|bowl,clock|🔪",
    "Which paint works well for impasto?|oil or acrylic|thin watercolor,pencil",
    "Impasto brush marks can be seen from...|up close|only under water,nowhere",
    "Impasto is the opposite of a thin...|wash|knife,block",
    "Thick paint catches real...|light and shadow|wind,sound",
    "A painting with thick swirling paint has strong...|texture|silence,smell"
  ], "Think of thick, textured paint."));
  a.push(L("Vincent van Gogh", [
    "A Dutch painter|🌻|Vincent van Gogh was born in the Netherlands in 1853. He painted with bright colors and thick brushstrokes.",
    "Famous works|🌌|He painted The Starry Night, with swirling stars, and a series of Sunflowers.",
    "Short career|🖌️|He painted for only about ten years, but made hundreds of paintings. He is a Post-Impressionist."
  ], [
    "Van Gogh was born in the...|Netherlands|Spain,Japan|🌻",
    "Van Gogh painted The Starry Night, with swirling...|stars|trains,robots|🌌",
    "Van Gogh also painted a series of...|sunflowers|castles,cars|🌻",
    "Van Gogh's brushstrokes were thick and...|swirling|invisible,perfectly flat",
    "Van Gogh is linked with Post-...|Impressionism|Pop art,Cubism",
    "Van Gogh painted for about how many years?|ten|ninety,one",
    "Thick paint like Van Gogh's is called...|impasto|wash,mosaic",
    "Van Gogh used bright...|colors|only gray,only black"
  ], "Think of swirling stars and sunflowers."));
  a.push(L("Claude Monet", [
    "Impression, Sunrise|🌅|Claude Monet was a French painter. His painting Impression, Sunrise gave Impressionism its name.",
    "Same place, new light|🌾|Monet painted the same haystacks or buildings again and again to show how light changes through the day.",
    "Giverny|🪷|He made a beautiful water garden at his home in Giverny and painted the water lilies for years."
  ], [
    "Monet was a painter from...|France|Brazil,Egypt|🌅",
    "Monet's painting Impression, Sunrise gave a name to...|Impressionism|Cubism,Pop art",
    "Monet painted the same scene many times to show changing...|light|prices,names",
    "Monet's famous garden had water...|lilies|robots,mountains|🪷",
    "Monet's home and garden was in...|Giverny|Rome,Cairo",
    "Impressionists often painted outdoors using quick...|brushstrokes|pencil lines only,stone carving",
    "Impressionists were interested in the effects of...|light|numbers,rules",
    "Which painter is an Impressionist?|Claude Monet|Andy Warhol,Michelangelo"
  ], "Think of a pond with lilies."));
  a.push(L("Georgia O'Keeffe", [
    "An American artist|🌸|Georgia O'Keeffe was born in 1887 in the United States and lived to be nearly 100.",
    "Big flowers|🌺|She painted flowers very large and close up so that people would stop and really look at them.",
    "The desert|🏜️|She loved New Mexico and painted its hills, bones and skies in bold shapes and colors."
  ], [
    "Georgia O'Keeffe was an artist from the...|United States|Netherlands,China|🌸",
    "She is famous for painting giant...|flowers|robots,spaceships|🌺",
    "She painted flowers close up so people would...|look closely|look away,ignore them",
    "She loved the desert scenery of New...|Mexico|York,Zealand|🏜️",
    "O'Keeffe used bold shapes and...|colors|noises,rules",
    "A close-up view makes small things look...|big|invisible,sleepy",
    "O'Keeffe painted hills, skies and...|flowers|shopping malls,airplanes",
    "O'Keeffe lived to be nearly...|100|20,50"
  ], "Think of giant flowers."));
  a.push(L("Johannes Vermeer", [
    "Quiet rooms|🪟|Johannes Vermeer was a Dutch painter from Delft who lived about 350 years ago.",
    "Window light|💡|Many of his paintings show one or two people in a quiet room lit by soft light from a window.",
    "Famous work|👧|His best known painting is Girl with a Pearl Earring. He painted very few pictures, only about 35 are known."
  ], [
    "Vermeer was a painter from the...|Netherlands|Mexico,India|🪟",
    "Vermeer often painted rooms lit by a...|window|campfire,lightning",
    "Vermeer's best known painting is Girl with a Pearl...|Earring|Necklace,Hat|👧",
    "His paintings show a ___ mood.|quiet|loud,scary",
    "Vermeer was from the city of...|Delft|Tokyo,Lima",
    "Vermeer lived about ___ years ago.|350|35,3500",
    "Vermeer painted very ___ paintings.|few|thousands of,no",
    "Soft light from a window makes a room feel...|calm|stormy,empty"
  ], "Think of window light and a pearl."));
  a.push(L("Maya and Aztec art", [
    "Maya|🛕|The Maya lived in what is now Mexico and Central America. They built tall stepped pyramids and temples, such as Chichen Itza, and wrote with hieroglyphs.",
    "Aztecs|🦅|The Aztecs built a great city called Tenochtitlan on an island in a lake. Today the city is Mexico City.",
    "Art|🗿|Both peoples made carved stone, bright feather work, painted pottery and gold and jade jewelry."
  ], [
    "Maya pyramids were shaped like...|steps|domes|needles|🛕",
    "A famous Maya city with a pyramid is...|Chichen Itza|Athens,Venice",
    "The Maya wrote with...|hieroglyphs|emojis,Roman letters",
    "The Aztec city of Tenochtitlan is now...|Mexico City|Madrid,Lima|🦅",
    "Tenochtitlan was built on an island in a...|lake|desert,glacier",
    "The Maya lived in Mexico and Central...|America|Asia,Europe",
    "Maya and Aztec artists made jewelry from gold and...|jade|plastic,rubber",
    "The Aztecs and Maya both made pottery and carved...|stone|ice,balloons"
  ], "Think of stepped pyramids in Mexico."));
  a.push(L("Inca art and Machu Picchu", [
    "Mountain builders|⛰️|The Inca lived in the Andes mountains of South America, in what is now Peru. Their empire was very large.",
    "Stonework|🧱|Inca builders fitted big stones so tightly that no mortar was needed. Their walls have lasted for centuries.",
    "Machu Picchu|🏔️|Machu Picchu is a famous Inca city high in the mountains, built about 600 years ago. Inca weavers also made fine cloth."
  ], [
    "The Inca lived in the...|Andes|Alps|Sahara|⛰️",
    "Machu Picchu is in...|Peru|Egypt,Greece|🏔️",
    "Inca stone walls were fitted tightly without...|mortar|stones,workers",
    "Machu Picchu is a city high in the...|mountains|ocean,desert",
    "Inca walls have lasted for...|centuries|a week,a day",
    "The Inca were also skilled at weaving...|cloth|spaceships,robots|🧵",
    "The Inca lived on the continent of South...|America|Asia,Australia",
    "Machu Picchu was built about ___ years ago.|600|60,6000"
  ], "Think of stone walls in the Andes."));
  a.push(L("Totem poles and Native American art", [
    "Carved poles|🪵|Peoples of the Pacific Northwest, in places like Alaska and British Columbia, carve tall <b>totem poles</b> from cedar trees.",
    "Stories|🦅|Animals such as eagles, bears and ravens on the pole stand for family stories, history and respect.",
    "Other arts|🧶|Navajo (Diné) weavers make colorful wool rugs. Pueblo potters make beautiful painted pots."
  ], [
    "Totem poles are carved from...|cedar trees|metal|ice|🪵",
    "Totem poles are made by peoples of the Pacific...|Northwest|Island chain,South Pole",
    "Animals on a totem pole stand for stories and...|family history|shopping lists,weather",
    "Navajo weavers make colorful...|wool rugs|glass beads only,paper kites|🧶",
    "Pueblo potters make painted...|pots|swords,screens",
    "A totem pole is a kind of...|carved sculpture|oil painting,photo",
    "An eagle on a totem pole is a kind of...|symbol|machine,shadow|🦅",
    "Totem poles are usually...|very tall|tiny,flat"
  ], "Think of tall carved poles."));
  a.push(L("Rangoli and mandalas", [
    "Floor art from India|🪔|<b>Rangoli</b> is art made on the floor near a home's door, using colored powder, rice flour or flower petals. It is made for festivals such as Diwali.",
    "Mandalas|🌸|The word <b>mandala</b> means circle in the old Sanskrit language. A mandala has a pattern that grows out of the center.",
    "Radial design|🔆|Both often use radial symmetry, with shapes repeating around a center point."
  ], [
    "Rangoli patterns are made on the...|floor|ceiling|moon|🪔",
    "Rangoli uses colored powder, rice flour or flower...|petals|bricks,coins",
    "Mandala means...|circle|square,flower pot|🌸",
    "A mandala pattern grows out from the...|center|edge only,corner",
    "Mandalas often use ___ symmetry.|radial|no,mirror-only",
    "Rangoli is often made for festivals like...|Diwali|a snow day,a math test",
    "Rangoli is a tradition from...|India|Canada,Peru",
    "Mandala patterns repeat shapes around a center...|point|building,song"
  ], "Think of circles and colored powder."));
  a.push(L("Origami and paper art", [
    "Paper folding|🦢|<b>Origami</b> is the Japanese art of folding paper into shapes, such as a crane. Traditionally it uses one square sheet and no glue or cutting.",
    "Cutting|✂️|<b>Kirigami</b> adds cuts to the folds. In China, people have made paper cutting art for centuries.",
    "Creases|📐|Sharp, neat creases make good origami. Fold slowly and line up the corners first."
  ], [
    "The Japanese art of folding paper is...|origami|mosaic|weaving|🦢",
    "Origami traditionally starts with a ___ sheet of paper.|square|round,triangle",
    "Origami is a tradition from...|Japan|Mexico,Egypt",
    "Folding and cutting paper together is called...|kirigami|pottery,printmaking|✂️",
    "A famous origami shape is a paper...|crane|helicopter,bridge|🦢",
    "Good origami needs sharp...|creases|batteries,colors only",
    "Traditional origami uses no...|glue|paper,folds",
    "Before folding, line up the...|corners|clouds,shadows"
  ], "Think of a paper crane."));
  a.push(L("Comic page design", [
    "Panels|🗯️|A comic page is split into boxes called <b>panels</b>. Each panel shows one moment of the story.",
    "The gutter|📏|The gap between panels is the <b>gutter</b>. Readers fill in what happens between the panels.",
    "Words and pictures|💬|<b>Speech balloons</b> show what people say. Sound words like POW or SPLASH add action."
  ], [
    "The boxes on a comic page are called...|panels|gutters|brushes|🗯️",
    "The gap between comic panels is the...|gutter|balloon|frame",
    "A speech balloon shows what a character...|says|owns,weighs|💬",
    "A big panel is good for an important...|moment|empty space,ruler",
    "Sound words like POW add...|action|silence,measurements",
    "Comics are read in order, usually left to...|right|bottom,top",
    "Each panel shows one ___ of the story.|moment|chapter,library",
    "Readers imagine what happens in the...|gutter|speech balloon,title"
  ], "Think of boxes and gaps."));
  a.push(L("Storyboards", [
    "Plan the shots|🎞️|A <b>storyboard</b> is a row of small drawings that plan a film, show or animation shot by shot.",
    "Why|🎬|Filmmakers and animators use storyboards to decide camera angles and the order of events before making the real thing.",
    "Notes|📝|Under each drawing, short notes tell about sound, speech or action."
  ], [
    "A row of small drawings that plan a film is a...|storyboard|mosaic|portfolio|🎞️",
    "A storyboard is used before...|making the film|buying a ticket,painting a mural",
    "A storyboard helps plan camera...|angles|prices,weather",
    "Animators use storyboards to plan the order of...|events|colors only,stones",
    "Each storyboard drawing is a...|shot|sculpture,seed",
    "Notes under a storyboard drawing tell about sound or...|action|taxes,names of rivers",
    "Storyboard drawings are usually...|small and quick|giant and slow,made from clay",
    "A storyboard is a bit like a...|comic strip|marble statue,bowl|🎬"
  ], "Think shot by shot."));
  a.push(L("Designing useful things", [
    "Form and function|🪑|<b>Product designers</b> plan everyday things like chairs, bottles and phones. A saying says form follows function: shape should fit the job.",
    "Prototype|🧪|A <b>prototype</b> is a first test model. Designers try it, find problems and improve it.",
    "Users|🙂|Good design is comfortable, safe and easy for people to use."
  ], [
    "A person who plans chairs, bottles and phones is a product...|designer|inspector|reporter|🪑",
    "A first test model is a...|prototype|mural|stamp|🧪",
    "Form follows...|function|fashion,noise",
    "A good chair is comfortable and...|safe|invisible,sharp",
    "After testing a prototype, designers...|improve it|throw away every idea,hide it",
    "A water bottle with a handle fits the job of being easy to...|carry|break,melt|🍶",
    "Good design is easy for people to...|use|lose,doubt",
    "Designers sketch ideas before building a...|prototype|mountain,song"
  ], "Think about how a thing is used."));
  a.push(L("Still life", [
    "Objects arranged|🍎|A <b>still life</b> is a picture of objects that do not move, like fruit, flowers and bottles on a table.",
    "Arranging|🏺|Artists choose and arrange the objects. Overlapping objects and different heights make an interesting group.",
    "Light|🕯️|One light from the side makes clear shadows and helps show form."
  ], [
    "A picture of fruit and bottles on a table is a...|still life|landscape|self-portrait|🍎",
    "In a still life, the objects...|do not move|run around,are alive",
    "Overlapping objects in a group make it more...|interesting|empty,boring",
    "Different heights in a group of objects add...|variety|noise,speed",
    "One light from the side makes clear...|shadows|colors only,sounds|🕯️",
    "Artists ___ the objects before they draw.|arrange|eat,sell",
    "A still life could include flowers in a...|vase|sink,mountain|💐",
    "Still life is a good way to practice drawing...|form|crowds,storms"
  ], "Think of fruit on a table."));
  a.push(L("Sfumato and the Mona Lisa", [
    "Smoky edges|🌫️|<b>Sfumato</b> is an Italian word meaning smoky. Artists blend colors so softly that there are no hard outlines.",
    "Leonardo|🖼️|Leonardo da Vinci used sfumato in the Mona Lisa, painted about 500 years ago. The soft shading makes her face look alive.",
    "Where|🏛️|The Mona Lisa hangs in the Louvre Museum in Paris, France."
  ], [
    "Softly blending colors with no hard outlines is called...|sfumato|collage|stippling|🌫️",
    "Sfumato is an ___ word.|Italian|Spanish|Japanese",
    "Who painted the Mona Lisa?|Leonardo da Vinci|Vincent van Gogh,Claude Monet|🖼️",
    "The Mona Lisa hangs in the Louvre in...|Paris|Rome,London",
    "Sfumato makes edges look...|soft|sharp,jagged",
    "Sfumato means...|smoky|bright,heavy",
    "The Mona Lisa was painted about ___ years ago.|500|50,5000",
    "Sfumato is the opposite of a hard...|outline|shadow,color"
  ], "Think smoky and soft."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[5], a[8], a[10], a[13], a[15]]));
  a.push(MIX("Level 10 Challenge", [a[1], a[3], a[6], a[7], a[9], a[11], a[12], a[14], a[16], a[17]]));

  // ================= LEVEL 11 =================
  const b = [];
  b.push(L("Horizon and eye level", [
    "Your eye level|👁️|The <b>horizon line</b> in a perspective drawing is the viewer's <b>eye level</b>. Everything is drawn as if seen from that height.",
    "Above and below|📦|Things above the horizon show their undersides. Things below it show their tops.",
    "Changing the view|🌄|A high eye level, like standing on a hill, puts the horizon high. A low one, like lying on the grass, puts it low."
  ], [
    "In perspective, the horizon line is the viewer's...|eye level|shadow|signature|👁️",
    "A box below the horizon shows its...|top|bottom|nothing",
    "A box above the horizon shows its...|underside|top,back only",
    "Lying on the grass, the horizon is...|low|high,missing|🌱",
    "Standing on a hill, the horizon is...|high|low,hidden|⛰️",
    "A table at your eye level looks like a...|thin line|big flat square,circle",
    "Vanishing points sit on the...|horizon line|ground,frame",
    "If you move the eye level up, the horizon moves...|up|down,sideways"
  ], "Think about where your eyes are."));
  b.push(L("Foreshortening", [
    "Pointing at you|🫵|<b>Foreshortening</b> is how something pointing toward you looks shorter than it really is.",
    "Example|💪|A friend's arm pointing at you looks short and wide, and the hand looks big.",
    "Tip|✏️|Draw what you see, not what you know. Measure the shapes with your pencil and compare."
  ], [
    "Something pointing toward you looks shorter. This is...|foreshortening|symmetry|rhythm|🫵",
    "An arm pointing at you looks short and...|wide|invisible,thin as a hair",
    "In foreshortening, the nearest part looks...|big|tiny only,absent",
    "To foreshorten well, draw what you...|see|know,forget",
    "A pencil pointed straight at you looks...|short|very long,curly|✏️",
    "Foreshortening is used to make forms look...|3D|flat,tiny",
    "Measuring with your pencil helps compare...|sizes|prices,sounds",
    "A foot pointing toward you looks...|short and wide|long and thin,square and blue|🦶"
  ], "Think about things pointing toward your eyes."));
  b.push(L("Ellipses", [
    "Circles seen at an angle|⭕|A circle seen at an angle looks like an <b>ellipse</b>, a smooth oval with rounded ends.",
    "Cylinders|🥫|The top and bottom of a can are ellipses. The lower ellipse is a little wider than the top one if you look from above.",
    "Eye level|👁️|The closer a circle is to your eye level, the thinner its ellipse looks."
  ], [
    "A circle seen at an angle looks like an...|ellipse|triangle|square|⭕",
    "The ends of an ellipse are...|rounded|pointed|flat",
    "The top and bottom of a can are drawn as...|ellipses|squares,stars|🥫",
    "A circle at your eye level looks like a...|thin line|fat round ball,wide oval",
    "The farther below eye level, the ___ the ellipse.|wider|thinner,pointier",
    "A common mistake is drawing an ellipse with ___ ends.|pointed|round,smooth",
    "A drinking glass seen from above has an ellipse for its...|rim|handle,label|🥛",
    "An ellipse looks like a squashed...|circle|triangle,star"
  ], "Think of a squashed circle."));
  b.push(L("Parts of a shadow", [
    "Five parts|⚽|A shaded ball has a <b>highlight</b>, a <b>midtone</b>, a <b>core shadow</b>, <b>reflected light</b> and a <b>cast shadow</b>.",
    "On the ball|🌗|The highlight is where light hits most. The core shadow is the darkest part on the ball itself, on the side away from the light.",
    "Bounce|↩️|Reflected light is a soft glow in the shadow side, bounced up from the surface the ball sits on. The cast shadow lies on the ground."
  ], [
    "The brightest spot on a shaded ball is the...|highlight|core shadow|cast shadow|⚽",
    "The darkest part on the ball itself is the...|core shadow|highlight|midtone",
    "Light bounced into the shadow side is...|reflected light|highlight,cast shadow",
    "The shadow on the ground is the...|cast shadow|core shadow,midtone",
    "The in-between gray value is the...|midtone|highlight,cast shadow",
    "How many parts are in a shaded ball?|five|two,nine",
    "The core shadow is on the side ___ the light.|away from|toward,above",
    "The reflected light is usually ___ than the core shadow.|lighter|darker,more pointed"
  ], "Name the five parts from bright to dark."));
  b.push(L("Hue, saturation and value", [
    "Three traits|🌈|Every color has a <b>hue</b> (its name, like red or blue), a <b>value</b> (how light or dark) and a <b>saturation</b> (how bright or dull).",
    "Saturation|🎚️|A very saturated red is bold and strong. A less saturated red looks grayish and quiet.",
    "Change one|🎛️|You can change one trait without changing the others. Adding white changes the value."
  ], [
    "The name of a color, like red, is its...|hue|value|saturation|🌈",
    "How light or dark a color is, is its...|value|hue|saturation",
    "How bright or dull a color is, is its...|saturation|hue,value",
    "A bold neon green is highly...|saturated|dull,transparent",
    "A grayish red has low...|saturation|hue name,size",
    "Adding white to blue changes its...|value|hue name only,sound",
    "Blue and green are different...|hues|values only,sizes",
    "Pale pink and dark red are different...|values|hues only,shapes"
  ], "Hue = name, value = light or dark."));
  b.push(L("Dulling a color", [
    "Too bright?|🎨|A color straight from the tube can be too bright. To dull it, add a little of its <b>complement</b>, the color opposite it.",
    "Examples|🔴🟢|Red is dulled by green, blue by orange and yellow by purple. The mixed color becomes more natural.",
    "Careful|⚠️|Add only a little at a time. Too much makes the color brown or gray."
  ], [
    "To dull a color, add a little of its...|complement|white only|water only|🎨",
    "Red can be dulled with a little...|green|red,pink",
    "Blue can be dulled with a little...|orange|blue,navy",
    "Yellow can be dulled with a little...|purple|yellow,white",
    "Adding too much of the complement makes a ___ color.|gray or brown|neon,glowing",
    "Dulling a color lowers its...|saturation|hue name,page size",
    "Add the complement a ___ at a time.|little|bucket,wheelbarrow",
    "The complement of orange is...|blue|red,yellow"
  ], "Use the color opposite on the wheel."));
  b.push(L("Baroque art", [
    "Drama|🎭|<b>Baroque</b> art began in Europe in the 1600s. It is full of drama, movement, strong light and rich color.",
    "Artists|🖼️|Caravaggio from Italy used spotlight-like light and dark. Peter Paul Rubens from Flanders painted energetic, swirling scenes.",
    "Look for|🔎|Baroque pictures often have diagonal lines and bright light against deep shadow, to feel exciting."
  ], [
    "Baroque art is full of drama and...|movement|silence|empty space|🎭",
    "Baroque art began in the...|1600s|1950s|300s",
    "Caravaggio was an artist from...|Italy|Peru,Norway",
    "Baroque art often has strong...|light and dark|only pale pastels,flat shapes",
    "Rubens painted energetic, ___ scenes.|swirling|stiff,empty",
    "Baroque pictures often use ___ lines for excitement.|diagonal|only straight horizontal,no",
    "Caravaggio used light like a...|spotlight|rainbow,fog|🔦",
    "Baroque art began on the continent of...|Europe|Antarctica,Australia"
  ], "Think drama and spotlight."));
  b.push(L("Romanticism and Turner", [
    "Feeling and nature|🌩️|<b>Romanticism</b> was an art movement of the 1800s. Artists painted strong feelings and the power of nature, like storms and mountains.",
    "J. M. W. Turner|🚢|The English painter Turner is famous for glowing skies, sea and misty light. His paintings can look almost dreamy.",
    "Another Romantic|🏔️|The German painter Caspar David Friedrich painted lonely figures looking over misty mountains and seas."
  ], [
    "Romanticism painted strong feelings and the power of...|nature|machines|numbers|🌩️",
    "Romanticism was an art movement of the...|1800s|1950s,100s",
    "Turner was a painter from...|England|Egypt,Mexico|🚢",
    "Turner is famous for glowing skies and...|misty light|flat black shapes,cartoon dots",
    "Friedrich painted misty mountains and...|seas|supermarkets,robots|🏔️",
    "Romantic painters liked storms and big...|landscapes|calculators,keyboards",
    "Friedrich was from...|Germany|Brazil,Japan",
    "Romantic art often has a ___ mood.|dramatic|boring,silly"
  ], "Think feelings and big nature."));
  b.push(L("Edgar Degas", [
    "Dancers|🩰|Edgar Degas was a French artist who lived about 150 years ago. He is best known for his pictures of ballet dancers.",
    "Pastels|🖍️|He often used soft <b>pastels</b>, powdery colored sticks, and drew dancers in rehearsal and backstage.",
    "Surprising views|👀|Degas liked unusual viewpoints and cropped scenes, as if you had snapped a quick photo."
  ], [
    "Degas is best known for pictures of ballet...|dancers|mountains|castles|🩰",
    "Degas was a painter from...|France|Brazil,Norway",
    "Degas often used soft...|pastels|nails,bricks|🖍️",
    "Degas liked unusual...|viewpoints|rules,wallpaper",
    "Degas drew dancers rehearsing and...|backstage|in space,under the sea",
    "Pastels are like powdery colored...|sticks|ropes,bottles",
    "Degas lived about ___ years ago.|150|15,1500",
    "Degas is linked with the movement of...|Impressionism|Pop art,Surrealism"
  ], "Think of ballet and pastels."));
  b.push(L("Mary Cassatt", [
    "An American in Paris|🇫🇷|Mary Cassatt was born in Pennsylvania in 1844. She moved to France and joined the Impressionists.",
    "Her subjects|👩‍👧|She painted warm scenes of mothers and children in everyday life, with soft colors and gentle light.",
    "Prints|🖨️|She was also inspired by Japanese woodblock prints, and she made colorful prints of her own."
  ], [
    "Mary Cassatt was born in the...|United States|Netherlands|Japan|🇫🇷",
    "She moved to...|France|Egypt,Mexico",
    "Cassatt joined the artists called...|Impressionists|Cubists,Pop artists",
    "She often painted mothers and...|children|robots,ships|👩‍👧",
    "Cassatt's pictures have soft colors and gentle...|light|noise,numbers",
    "She was inspired by Japanese...|woodblock prints|clay pots,sports|🖨️",
    "Cassatt painted everyday...|life|battles,storms only",
    "Mary Cassatt was a ___ artist.|famous American|ancient Greek,medieval English"
  ], "Think of a Pennsylvania-born Impressionist."));
  b.push(L("Abstract art and Kandinsky", [
    "No real objects|🔵|<b>Abstract</b> art uses shapes, lines and colors that do not show things from the real world.",
    "Kandinsky|🎼|Wassily Kandinsky was a Russian-born painter. He thought colors and shapes could make feelings, just as music does. He is a pioneer of abstract art.",
    "Titles|🎨|He named many works Composition or Improvisation, like music pieces."
  ], [
    "Art using only shapes, lines and colors is...|abstract|realistic|portrait|🔵",
    "Kandinsky compared painting to...|music|cooking|sports|🎼",
    "Kandinsky was born in...|Russia|Brazil,Canada",
    "An abstract painting does not show real...|objects|colors,lines",
    "Kandinsky named many works Composition and...|Improvisation|Sandwich,Weather",
    "Abstract art can still make people feel...|feelings|nothing at all,hungry only",
    "Which painting is abstract?|circles and lines in color|a photo of a dog,a portrait of a king",
    "Kandinsky is a pioneer of ___ art.|abstract|realistic,cave"
  ], "Think shapes without real things."));
  b.push(L("Piet Mondrian", [
    "De Stijl|🟥|Piet Mondrian was a Dutch painter. He and others began a movement called <b>De Stijl</b>, Dutch for The Style.",
    "His look|⬛|He used only red, yellow, blue, white and thick black lines forming a grid of rectangles.",
    "Idea|📐|He wanted pure, calm balance with only the simplest colors and lines, going back to the essentials."
  ], [
    "Mondrian was a painter from the...|Netherlands|United States|Italy|🟥",
    "Mondrian used red, yellow, blue, white and black...|lines|dots|swirls",
    "Mondrian's paintings are made of a grid of...|rectangles|circles,hearts|⬛",
    "De Stijl is Dutch for...|The Style|The Circle,The Light",
    "Mondrian used ___ colors for his bold shapes.|primary|only pastel,neon",
    "Mondrian's lines were mostly straight and...|black|rainbow,wavy",
    "Mondrian's paintings feel...|balanced|chaotic,stormy",
    "Mondrian's style is very ___.|simple|detailed,realistic"
  ], "Think of red, yellow, blue and black lines."));
  b.push(L("Jackson Pollock", [
    "Drip painting|🎨|Jackson Pollock was an American painter. In the 1940s, he laid big canvases on the floor and dripped and poured paint onto them.",
    "Action painting|🏃|This is called <b>action painting</b> because the artist's moves are part of the art. It belongs to Abstract Expressionism.",
    "No picture|🌀|His paintings do not show objects. They are tangles of lines and colors with rhythm and energy."
  ], [
    "Jackson Pollock was an artist from the...|United States|Netherlands|Japan|🎨",
    "Pollock put his canvases on the...|floor|ceiling|roof",
    "Pollock dripped and poured...|paint|water only,sand only",
    "Pollock's style is called ___ painting.|action|still,window",
    "Pollock's paintings are...|abstract|realistic portraits,landscapes of cities",
    "His paintings feel full of...|energy|silence,stillness|🌀",
    "Pollock painted in the...|1940s|1740s,2040s",
    "In action painting, the artist's ___ are part of the art.|movements|neighbors,clocks"
  ], "Think drips on the floor."));
  b.push(L("Henri Matisse", [
    "Wild beasts|🦁|Henri Matisse was a French artist. He and friends used such bold, unreal colors that a critic called them <b>Fauves</b>, French for wild beasts.",
    "Bold color|🟩|Fauvism means painting with strong, bright colors that show feeling, even when they are not true to life.",
    "Cut-outs|✂️|When he was older, Matisse made art by cutting shapes from paper painted with bright colors."
  ], [
    "Matisse was an artist from...|France|Brazil|Spain|🦁",
    "Fauves is French for wild...|beasts|colors|weather",
    "Fauvism is known for strong, bright...|colors|pencil lines,shadows|🟩",
    "Late in life, Matisse made art by cutting out painted...|paper|metal,bread",
    "Fauvist colors do not have to be true to...|life|paint,cloth",
    "A Fauvist painter might paint a face with...|green and pink|only gray,only pencil",
    "Matisse's cut-outs used scissors and...|painted paper|clay only,wood only|✂️",
    "Fauvism shows strong...|feelings|numbers,fog"
  ], "Think of wild beasts and bold color."));
  b.push(L("Jacob Lawrence", [
    "Telling history|🏙️|Jacob Lawrence was an American painter born in 1917. He grew up in Harlem in New York City.",
    "The Migration Series|🚂|He made 60 small panel paintings about Black families moving from the southern to the northern United States in the early 1900s.",
    "His style|🟧|He used flat bold shapes, bright colors and strong patterns, and told stories in a series of pictures."
  ], [
    "Jacob Lawrence grew up in Harlem in...|New York City|Paris|Delft|🏙️",
    "The Migration Series has how many panels?|60|6,600",
    "Lawrence told stories in a ___ of pictures.|series|bubble,room",
    "His shapes were flat and...|bold|invisible,blurry",
    "Lawrence was an artist from the...|United States|Netherlands,Italy",
    "His paintings told about families moving to a new...|part of the country|planet,museum",
    "Telling a story in many pictures is like a...|comic strip|single photograph,statue|🚂",
    "Lawrence used bright colors and strong...|patterns|rules,silence"
  ], "Think of a series of 60 panels."));
  b.push(L("Diego Rivera", [
    "Wall painter|🖼️|Diego Rivera was a Mexican painter who lived from 1886 to 1957. He painted giant murals on public walls.",
    "Stories|👷|His murals show the history of Mexico and the work of farmers and factory workers, so everyone could see them.",
    "Fresco|🧱|He painted many murals in fresco, with paint on wet plaster, so the picture became part of the wall."
  ], [
    "Diego Rivera was an artist from...|Mexico|Greece|Norway|🖼️",
    "Rivera painted giant...|murals|stamps|mobiles",
    "His murals showed the history of...|Mexico|the Moon,Mars",
    "Rivera painted on ___ walls so everyone could see.|public|secret,tiny",
    "Fresco is paint on wet...|plaster|paper,glass|🧱",
    "His murals showed farmers and ___ workers.|factory|moon,pirate",
    "A mural is a very large painting on a...|wall|plate,pebble",
    "A painting in fresco becomes part of the...|wall|frame,canvas"
  ], "Think of giant public murals."));
  b.push(L("The Taj Mahal", [
    "A marble masterpiece|🕌|The Taj Mahal is in Agra, India. It was built in the 1600s by the Mughal emperor Shah Jahan as a tomb.",
    "White marble|🤍|It is made of white marble that glows in different colors during the day. It has a big dome and four tall towers called minarets.",
    "Symmetry|🪞|The building is perfectly symmetrical, with gardens and a long reflecting pool in front."
  ], [
    "The Taj Mahal is in the country of...|India|Egypt|Peru|🕌",
    "The Taj Mahal is made of white...|marble|wood|glass",
    "The tall towers around it are called...|minarets|aqueducts,buttresses",
    "The Taj Mahal is ___ symmetrical.|perfectly|not at all,only a little",
    "It was built in the...|1600s|1950s,200s",
    "The Taj Mahal has a big...|dome|pyramid,ice cap|🤍",
    "A long ___ is in front of the Taj Mahal.|reflecting pool|highway,volcano",
    "The Taj Mahal is in the city of...|Agra|Athens,Lima"
  ], "Think of white marble in India."));
  b.push(L("Pixels and vectors", [
    "Pixels|🔲|A <b>raster</b> image is made of tiny squares called <b>pixels</b>. If you zoom in a lot, it looks blocky or blurry.",
    "Vectors|📐|A <b>vector</b> image is made from math shapes and lines. It stays sharp however big you make it.",
    "Layers|🗂️|Digital artists use <b>layers</b>, like clear sheets stacked up, so they can change one part without messing up the rest."
  ], [
    "A picture made of tiny squares is a...|raster image|vector image|mosaic of tiles only|🔲",
    "The tiny squares of a digital picture are...|pixels|layers|brushes",
    "An image made from math shapes and lines is a...|vector|photo|pixel",
    "Which type stays sharp when made huge?|vector|raster|blurry",
    "A logo should usually be a...|vector|blurry picture,tiny photo",
    "Stacked clear sheets in digital art are called...|layers|frames|pixels|🗂️",
    "Layers let you change one part without messing up the...|rest|screen,power cord",
    "If you zoom into a raster image, you see...|blocks|math,sound"
  ], "Pixels are tiny squares."));
  b.push(MIX("Mixed practice", [b[0], b[2], b[4], b[6], b[8], b[10], b[12], b[16]]));
  b.push(MIX("Level 11 Challenge", [b[1], b[3], b[5], b[7], b[9], b[11], b[13], b[14], b[15], b[17]]));

  // ================= LEVEL 12 =================
  const c = [];
  c.push(L("Op art", [
    "Tricking the eye|🌀|<b>Op art</b> is short for optical art. It uses patterns, lines and contrast to make your eyes see movement that is not really there.",
    "Black and white|⚫⚪|Many Op art pictures use only black and white, with waves or stripes that seem to shake or swirl.",
    "Artists|🎨|Bridget Riley from Britain and Victor Vasarely, born in Hungary, were famous Op artists in the 1960s."
  ], [
    "Op art is short for...|optical art|open art|old art|🌀",
    "Op art makes the eye see...|movement|nothing|sounds",
    "Many Op art pieces use black and...|white|gold|pink|⚫",
    "Bridget Riley was an Op artist from...|Britain|Peru,Egypt",
    "The picture is really flat, but it seems to...|move|speak,disappear",
    "Op art became famous in the...|1960s|1560s,2060s",
    "Op art uses stripes, waves and...|patterns|photos,statues",
    "A page of wavy black-and-white lines that seems to ripple is...|Op art|a mosaic of tiles,a fresco"
  ], "Optical means about seeing."));
  c.push(L("Tessellations and Escher", [
    "No gaps|🔷|A <b>tessellation</b> is a pattern of shapes that fit together with no gaps and no overlaps, like floor tiles.",
    "Shapes that work|⬡|Regular triangles, squares and hexagons all tessellate. Regular pentagons do not.",
    "M. C. Escher|🦎|The Dutch artist M. C. Escher made tessellations of birds, fish and lizards that change shape across the page."
  ], [
    "Shapes fitting with no gaps or overlaps make a...|tessellation|collage|spiral|🔷",
    "Which regular shape tessellates?|hexagon|pentagon|circle",
    "Which regular shape does NOT tessellate?|pentagon|square,triangle",
    "Escher was an artist from the...|Netherlands|Mexico,Egypt",
    "Escher made tessellations of birds, fish and...|lizards|houses only,rockets|🦎",
    "Floor tiles are a good example of a...|tessellation|mural,mobile",
    "A honeycomb is made of tessellating...|hexagons|pentagons,circles|🐝",
    "A tessellation has no...|gaps|colors,shapes"
  ], "Think of floor tiles."));
  c.push(L("The golden ratio", [
    "A special number|🐚|The <b>golden ratio</b> is about 1.6 to 1. Some artists use it to make rectangles that look pleasing.",
    "Fibonacci|🔢|In the <b>Fibonacci</b> numbers, each number is the sum of the two before it: 1, 1, 2, 3, 5, 8, 13, and so on. They grow close to the golden ratio.",
    "In nature|🌻|Spirals in sunflowers, pinecones and shells often follow Fibonacci numbers."
  ], [
    "The golden ratio is about 1.6 to...|1|10|60|🐚",
    "In Fibonacci numbers, each number is the ___ of the two before it.|sum|difference|product",
    "In 1, 1, 2, 3, 5, 8, the next number is...|13|11,16|🔢",
    "In 1, 1, 2, 3, 5, the next number is...|8|6,7",
    "Fibonacci spirals can be seen in...|sunflowers|bricks,cups|🌻",
    "Some artists use the golden ratio to make rectangles that look...|pleasing|broken,silent",
    "2 + 3 = 5 and 3 + 5 = ...|8|7,9",
    "In the Fibonacci numbers, the numbers keep getting...|bigger|smaller,sillier"
  ], "Add the two numbers before it."));
  c.push(L("Slide, flip and turn", [
    "Moving a shape|🔁|In patterns, a shape can be moved three ways: a <b>translation</b> (slide), a <b>reflection</b> (flip) and a <b>rotation</b> (turn).",
    "Examples|🪞|A mirror image of a butterfly wing is a reflection. A shape spinning around a center, like petals, is a rotation.",
    "Wallpaper|🧱|A motif that slides along a row again and again makes a border pattern."
  ], [
    "Sliding a shape along is a...|translation|reflection|rotation|🔁",
    "Flipping a shape like a mirror is a...|reflection|translation|rotation|🪞",
    "Turning a shape around a point is a...|rotation|reflection|translation",
    "Petals around a flower's center show...|rotation|translation,a flip",
    "A mirror image of a wing is a...|reflection|slide,turn",
    "A repeated motif along a border is made by a...|translation|rotation,reflection",
    "A pinwheel shows the shape being...|rotated|flipped,slid|🎡",
    "Moving a shape without turning or flipping it is a...|slide|rotation,reflection"
  ], "Slide, flip, turn: pick the one that fits."));
  c.push(L("Newton and the rainbow", [
    "A prism|🔺|In the 1600s, the English scientist Isaac Newton passed sunlight through a glass <b>prism</b> and showed that white light is made of all the colors.",
    "The spectrum|🌈|The colors of the spectrum, in order, are red, orange, yellow, green, blue, indigo and violet.",
    "Rainbows|☔|A rainbow happens when sunlight is split into colors by drops of water in the air."
  ], [
    "A glass shape that splits light into colors is a...|prism|mirror|lens|🔺",
    "White light is made of...|all the colors|only red,no color",
    "Who showed this with a prism?|Isaac Newton|Leonardo da Vinci,Georges Seurat",
    "The color that comes first in the rainbow is...|red|violet,green",
    "The color that comes last in the rainbow is...|violet|red,yellow",
    "A rainbow forms when light is split by drops of...|water|paint,sand|☔",
    "The rainbow of colors is called a...|spectrum|palette,horizon",
    "Which color comes between green and indigo?|blue|orange,red"
  ], "Think about light and a glass triangle."));
  c.push(L("Pigments and binders", [
    "Color powder|🟦|A <b>pigment</b> is a colored powder. Mixed with a <b>binder</b> (a sticky liquid) it becomes paint.",
    "Old colors|🪨|Early artists used earth: yellow and red <b>ochre</b>, black charcoal from burnt wood, and blue made from a stone called lapis lazuli.",
    "Binders|🥚|Oil paint uses oil as the binder, tempera uses egg yolk, and watercolor uses a gum from trees."
  ], [
    "A colored powder used in paint is a...|pigment|binder|brush|🟦",
    "The sticky liquid that holds pigment is the...|binder|easel|canvas",
    "Yellow and red earth colors are called...|ochre|ivory,chalk|🪨",
    "Charcoal is made from burnt...|wood|glass,rubber",
    "A deep blue pigment came from the stone lapis...|lazuli|marble,coal",
    "Oil paint uses ___ as the binder.|oil|water|sand",
    "Tempera paint uses egg...|yolk|shell only,butter|🥚",
    "Pigment plus binder makes...|paint|clay,brick"
  ], "Pigment is the color, binder holds it."));
  c.push(L("Kinds of paint", [
    "Oil|🛢️|<b>Oil paint</b> is rich and dries slowly, so colors can be blended for days. It needs special solvents to clean up.",
    "Acrylic|💧|<b>Acrylic paint</b> dries fast and cleans up with water while it is wet. It makes bold, bright colors.",
    "Others|🖌️|<b>Watercolor</b> is see-through. <b>Gouache</b> is like opaque watercolor. <b>Tempera</b> is made with egg."
  ], [
    "Which paint dries slowly and is rich?|oil|acrylic|marker|🛢️",
    "Which paint dries fast and cleans up with water?|acrylic|oil|egg tempera",
    "Which paint is see-through?|watercolor|oil,gouache",
    "Opaque watercolor is called...|gouache|tempera,pastel",
    "Tempera is traditionally made with...|egg|milk,honey|🥚",
    "Oil paint cleans up with special...|solvents|only soap bubbles,sugar",
    "For a fast homework project with bold colors, choose...|acrylic|oil,fresco",
    "Opaque means you cannot see...|through it|its color,its shape"
  ], "Think about drying time and clean-up."));
  c.push(L("Fresco", [
    "Fresh plaster|🧱|<b>Fresco</b> is Italian for fresh. In fresco, painters apply paint on wet plaster on a wall.",
    "Part of the wall|🖼️|As the plaster dries, the color becomes part of the wall and can last for hundreds of years.",
    "Hurry|⏱️|The painter must work fast and only paint as much as can be finished before the plaster dries."
  ], [
    "Fresco is Italian for...|fresh|paint|wall|🧱",
    "Fresco paint goes on wet...|plaster|paper|glass",
    "As the plaster dries, the color becomes part of the...|wall|brush,palette",
    "Fresco paintings can last for hundreds of...|years|seconds,minutes",
    "In fresco, the painter must work...|fast|very slowly for a week,asleep",
    "Michelangelo painted the Sistine Chapel ceiling in...|fresco|watercolor on paper,digital art|⛪",
    "A fresco is painted on a...|wall|small card only,leaf",
    "Fresco is different from canvas painting because it is on...|plaster|cloth,paper"
  ], "Think wet plaster."));
  c.push(L("The Terracotta Army", [
    "Clay soldiers|🏺|Near Xi'an in China, farmers digging a well in 1974 found thousands of life-size clay figures of soldiers. They are called the <b>Terracotta Army</b>.",
    "The emperor|👑|They were buried about 2,200 years ago with China's first emperor, Qin Shi Huang, to guard his tomb.",
    "Each different|🙂|Every figure has its own face, hairstyle and clothes. They were once painted in bright colors."
  ], [
    "The Terracotta Army was made of...|clay|gold|ice|🏺",
    "Terracotta means baked...|earth|bread,glass",
    "The Terracotta Army is in...|China|Egypt,Peru",
    "It was found by farmers digging a...|well|tunnel to the moon,garden pond",
    "The figures are about ___ years old.|2,200|220,22",
    "Each figure has its own...|face|number plate,password",
    "The army was made for China's first...|emperor|teacher,chef|👑",
    "The figures were once painted in bright...|colors|dots only,shadows"
  ], "Think of clay soldiers in China."));
  c.push(L("Moai of Rapa Nui", [
    "Island statues|🗿|Rapa Nui, also called Easter Island, is a small island in the Pacific Ocean. It belongs to Chile.",
    "Moai|⛰️|The Rapa Nui people carved hundreds of giant stone statues called <b>moai</b> from volcanic rock. Many have big heads and long faces.",
    "How big|📏|The tallest moai standing is about 10 meters tall. The statues were carved long ago and moved across the island."
  ], [
    "Rapa Nui is an island in the...|Pacific Ocean|Atlantic Ocean|Arctic Ocean|🗿",
    "The giant statues are called...|moai|totems|pyramids",
    "The moai are carved from volcanic...|rock|ice,wood",
    "Rapa Nui is also called Easter...|Island|Mountain,Desert",
    "The Rapa Nui people carved hundreds of...|statues|boats only,castles",
    "Many moai have big...|heads|wings,wheels",
    "Rapa Nui belongs to the country of...|Chile|Japan,Italy",
    "Moai are a kind of...|stone sculpture|oil painting,tapestry"
  ], "Think of giant stone heads on an island."));
  c.push(L("Raphael and School of Athens", [
    "Renaissance master|🏛️|Raphael was an Italian artist of the High Renaissance, about 500 years ago, famous for graceful, calm paintings.",
    "The School of Athens|📜|His huge fresco in the Vatican shows ancient Greek thinkers like Plato and Aristotle gathered in a grand hall.",
    "Perspective|📐|The arches and floor lines go to one vanishing point in the middle, which draws your eye to the center."
  ], [
    "Raphael was an artist from...|Italy|Spain|Egypt|🏛️",
    "Raphael lived during the...|Renaissance|Pop art era|computer age",
    "The School of Athens is a famous...|fresco|mosaic|mobile|📜",
    "The School of Athens shows ancient Greek...|thinkers|pirates,astronauts",
    "Its arches and floor lines meet at one vanishing...|point|rule,dot of paint",
    "This style of drawing is called ___ perspective.|one-point|two-point,no-point",
    "The School of Athens is in the...|Vatican|Louvre,Alhambra",
    "Raphael's paintings feel calm and...|graceful|spooky,chaotic"
  ], "Think of a hall full of Greek thinkers."));
  c.push(L("Paul Cezanne", [
    "Shapes in nature|🍏|Paul Cézanne was a French painter who lived in the 1800s. He is called a Post-Impressionist.",
    "Cylinder, sphere, cone|🔵|He said to treat nature in terms of the cylinder, the sphere and the cone. He built apples, bottles and mountains from basic forms.",
    "A big influence|🧩|His way of showing many views at once inspired Picasso and the start of Cubism."
  ], [
    "Cézanne was a painter from...|France|Mexico|Japan|🍏",
    "Cézanne is famous for painting still lifes with...|apples|rockets|robots",
    "Cézanne built objects from cylinders, spheres and...|cones|stars|waves",
    "Cézanne inspired Picasso and...|Cubism|Pop art,Fauvism",
    "Cézanne is called a Post-...|Impressionist|Surrealist,Romantic",
    "Cézanne painted a mountain called Mont Sainte-...|Victoire|Marie,Lucie",
    "Cézanne looked at nature in terms of basic...|forms|jokes,cartoons",
    "A ball shape is a...|sphere|cone,cylinder|⚽"
  ], "Think of apples made from basic forms."));
  c.push(L("Land art", [
    "Art in nature|🍂|<b>Land art</b> is art made outdoors from natural things like leaves, stones, ice and sticks.",
    "Andy Goldsworthy|🪨|Andy Goldsworthy, an artist from Scotland, makes sculptures from icicles, leaves and rocks. He takes photos because the wind, rain or tide soon change or wash them away.",
    "Care|🌱|Good land artists respect nature. They use only things already lying on the ground and do not harm living plants."
  ], [
    "Art made outdoors from natural things is...|land art|pop art|digital art|🍂",
    "Andy Goldsworthy is an artist from...|Scotland|Brazil|Chile",
    "Land art often uses leaves, stones and...|ice|plastic bags,paint cans",
    "Goldsworthy takes photos because his art is...|temporary|permanent,made of glass",
    "Land artists should respect...|nature|trash,fences|🌱",
    "A land artist should not ___ living plants.|harm|water,photograph",
    "Land art is made from materials found...|outdoors|in a store only,in space",
    "Wind or tide can wash away land art. This means it is...|temporary|forever,invisible"
  ], "Think of leaves, stones and ice outside."));
  c.push(L("Yayoi Kusama", [
    "Dots everywhere|🔴|Yayoi Kusama is a Japanese artist born in 1929. She is famous for covering things with polka dots.",
    "Pumpkins|🎃|She makes pumpkin sculptures covered in dots and paints pictures full of repeating patterns.",
    "Infinity rooms|🪞|Her <b>Infinity Mirror Rooms</b> use mirrors and lights so the space seems to go on forever. An <b>installation</b> is art you can walk into."
  ], [
    "Kusama is an artist from...|Japan|Canada|Italy|🔴",
    "Kusama is famous for covering things with...|polka dots|stripes only|bricks",
    "Kusama makes sculptures of dotted...|pumpkins|dinosaurs,houses|🎃",
    "Her Infinity Mirror Rooms use mirrors and...|lights|snow,water",
    "An installation is art you can...|walk into|only read,only hear",
    "In her rooms, the space seems to go on...|forever|for one step,backward",
    "Repeating dots make a...|pattern|rule,map",
    "Kusama was born in...|1929|1729,2029"
  ], "Think polka dots and mirrors."));
  c.push(L("Animation principles", [
    "Making it feel alive|🏀|Animators follow principles that make movement feel real. Two famous ones are <b>squash and stretch</b> and <b>anticipation</b>.",
    "Squash and stretch|🪀|A bouncing ball squashes when it hits the ground and stretches when it moves fast. This gives it weight and life.",
    "Anticipation|🏃|Before a big action, a character winds up, like bending knees before a jump. This warns the audience what is about to happen."
  ], [
    "A bouncing ball squashes when it...|hits the ground|is in the air,is turned off|🏀",
    "A ball stretches when it moves...|fast|slowly,not at all",
    "The wind-up before a jump is called...|anticipation|follow-through|framing",
    "Squash and stretch give a ball weight and...|life|silence,noise",
    "Bending your knees before a jump shows...|anticipation|squash only,stretch only",
    "These ideas are called animation...|principles|prices,passwords",
    "Principles of animation help movement feel...|real|boring,flat",
    "Anticipation tells the audience what is...|about to happen|boring,finished"
  ], "Think of a bouncing ball."));
  c.push(L("Video game art", [
    "Many jobs|🎮|Making a game needs many artists. A <b>concept artist</b> draws early ideas for characters and worlds before anything is built.",
    "Pixel art|👾|A <b>sprite</b> is a 2D character image. <b>Pixel art</b> builds pictures from a small grid of squares, like many old games.",
    "3D models|🧊|Many modern games use 3D models made of many tiny flat shapes. An <b>art director</b> keeps the whole style consistent."
  ], [
    "An artist who draws early ideas for a game is a ___ artist.|concept|clay|fresco|🎮",
    "A 2D character image in a game is a...|sprite|brush|font|👾",
    "Pictures built from a small grid of squares are...|pixel art|watercolors,murals",
    "Someone who keeps a game's whole style consistent is the art...|director|inspector,teacher",
    "3D game models are made of many small flat...|shapes|jokes,eggs|🧊",
    "Concept art is drawn ___ the game is built.|before|after,instead of",
    "Old arcade games often used...|pixel art|oil paintings,marble statues",
    "A game artist might draw a...|character|volcano of lava only,receipt"
  ], "Think of the artists who make a game."));
  c.push(L("Advertising and art", [
    "Persuading|📣|An <b>advertisement</b> uses pictures, colors and words to make people want something.",
    "Look closer|🔍|Ask three questions: Who made this ad? Who is it for (the <b>target audience</b>)? What do they want me to do?",
    "Tools|🎨|Ads use bold colors, happy faces and short slogans. A <b>slogan</b> is a short catchy phrase. Ads should be honest."
  ], [
    "A picture and words that make you want something is an...|advertisement|exhibit|sketch|📣",
    "The group an ad is made for is the target...|audience|market,mural",
    "A short catchy phrase in an ad is a...|slogan|palette,tessera",
    "A good question to ask about an ad is, what do they want me to...|do|erase,carve",
    "Ads often use bold colors and happy...|faces|rules,storms",
    "Ads should be...|honest|confusing,hidden",
    "An ad for a toy is mainly made for...|kids and families|whales,statues",
    "Studying ads carefully helps you think...|for yourself|less,nothing at all|🧠"
  ], "Think about why the ad was made."));
  c.push(L("What a curator does", [
    "Show organizer|🏛️|A <b>curator</b> chooses and arranges artworks for an <b>exhibition</b> in a museum or gallery.",
    "Labels|🏷️|Each work has a wall label with the artist, title, year and materials. Curators write short texts to explain the show.",
    "Hanging|📏|Curators place works at about eye level, leave space around each piece and use lighting that helps without harming the art."
  ], [
    "A person who chooses and arranges artworks for a show is a...|curator|potter|animator|🏛️",
    "A show of artworks is an...|exhibition|easel|etching",
    "A wall label gives the artist, title and...|year|price of lunch,weather",
    "Artworks are usually hung at about ___ level.|eye|knee,ceiling",
    "Leaving space around each piece helps viewers...|look closely|miss it,sleep",
    "Lighting in a gallery should not ___ the art.|harm|show,warm gently",
    "A curator also writes short ___ to explain the show.|texts|songs,recipes",
    "A museum or gallery is a place to...|view art|race cars,fish|🖼️"
  ], "Think of the person who plans the show."));
  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[6], c[9], c[11], c[13], c[16]]));
  c.push(MIX("Level 12 Challenge", [c[1], c[3], c[5], c[7], c[8], c[10], c[12], c[14], c[15], c[17]]));

  Object.assign(ART_LEVELS, { 10: a, 11: b, 12: c });
})();
