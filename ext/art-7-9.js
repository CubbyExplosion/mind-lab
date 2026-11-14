// ext/art-7-9.js  Art & Drawing levels 7-9
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // item string: question|answer|wrong1,wrong2|visual|clue   (no commas inside answers)
  const L = (title, slides, items, nudge, clue) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p[2].split(","), v: p[3] || "", c: p[4] || "" }; });
    const make = () => {
      const it = pick(its);
      let exs = its.filter(x => x.a !== it.a && !nz(x.q + x.a).includes(nz(it.a)));
      if (!exs.length) exs = its.filter(x => x.a !== it.a);
      const ex = pick(exs);
      const na = nz(it.a), leaks = h => na.length > 2 && nz(String(h).replace(/<[^>]+>/g, "")).includes(na);
      let h1 = nudge || "Think back to what you just learned. Read the question slowly.";
      if (leaks(h1)) h1 = "Think back to what you just learned. Read the question slowly.";
      let h2 = it.c || clue || "";
      if (!h2 || leaks(h2)) h2 = `The answer starts with the letter "${it.a[0].toUpperCase()}".`;
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

  // ================= LEVEL 7 =================
  const a = [];
  a.push(L("One-point perspective", [
    "Lines that meet|🛤️|In <b>one-point perspective</b>, lines that go away from you seem to meet at one spot called the <b>vanishing point</b>.",
    "On the horizon|🌅|The vanishing point sits on the <b>horizon line</b>. A road or railway track getting narrow is a good example.",
    "Steps|📏|1. Draw the horizon line. 2. Put a dot on it. 3. Draw lines from the edges of the page toward the dot."
  ], [
    "In one-point perspective, lines going away meet at the...|vanishing point|palette|frame|🛤️",
    "The vanishing point sits on the...|horizon line|bottom edge,border|🌅",
    "How many vanishing points are in one-point perspective?|one|two,five",
    "A railway track that seems to get narrow far away shows...|perspective|symmetry,collage|🚂",
    "Lines that run toward the vanishing point seem to go...|away from you|up to the sky,in circles",
    "A road drawn with perspective looks wider...|near you|far away,at the dot",
    "Perspective helps a flat page look...|deep|empty,wet",
    "To start a perspective drawing, you first draw the...|horizon line|signature,frame"
  ], "Think about where lines going far away end up."));
  a.push(L("Contour drawing", [
    "Draw the edge|✏️|A <b>contour line</b> is a line that shows the outside edge of a shape or object.",
    "Slow eyes|👀|In contour drawing you look at the object closely and draw slowly, as if your pencil is walking along its edge.",
    "Blind contour|🙈|In a <b>blind contour</b> drawing you look at the object, not at your paper. It trains your eyes and hand to work together."
  ], [
    "A line that shows the edge of an object is a...|contour line|shadow|texture|✏️",
    "In a blind contour drawing, you look at the...|object|paper|clock|🙈",
    "Contour drawing makes you look...|closely|quickly and away,only once",
    "Contour lines show the...|outline|color only,sound",
    "Blind contour drawings are good practice for your...|eyes and hand|feet,lunch",
    "A contour drawing of a shoe shows its...|edges|price,smell|👟",
    "Contour drawing is best done...|slowly|as fast as you can,with your eyes shut all the time",
    "Which tool is good for contour drawing?|a pencil or pen|a hammer,a kiln"
  ], "Think about the outside edge."));
  a.push(L("Hatching and stippling", [
    "Shading with marks|✒️|Artists can shade with a pen using lines or dots instead of smudging.",
    "Hatching|▦|<b>Hatching</b> uses lines close together. <b>Cross-hatching</b> adds lines going the other way for darker value.",
    "Stippling|⚫|<b>Stippling</b> uses lots of tiny dots. More dots close together make a darker area."
  ], [
    "Shading with lots of tiny dots is...|stippling|hatching|weaving|⚫",
    "Shading with lines close together is...|hatching|stippling|casting",
    "Lines crossing in two directions is...|cross-hatching|stippling,collage|▦",
    "In stippling, more dots close together make a ___ area.|darker|lighter,invisible",
    "In hatching, lines farther apart make a ___ value.|lighter|darker,black",
    "Cross-hatching makes shading...|darker|whiter,wetter",
    "Which tool is good for stippling?|a fine pen|a wide house brush,a ruler only|🖊️",
    "Hatching and stippling are ways to show...|value|rhythm of music,weather"
  ], "Think lines or dots, and how close they are."));
  a.push(L("Warm and cool colors", [
    "Color temperature|🔥❄️|<b>Warm colors</b> are red, orange and yellow. They remind us of fire and sun.",
    "Cool colors|💧|<b>Cool colors</b> are blue, green and purple. They remind us of water, ice and forests.",
    "Push and pull|↔️|Warm colors seem to come forward. Cool colors seem to move back, which helps make distance."
  ], [
    "Which is a warm color?|orange|blue,purple|🟠",
    "Which is a cool color?|blue|red,yellow|🔵",
    "Red, orange and yellow are...|warm colors|cool colors,neutral colors|🔥",
    "Blue, green and purple are...|cool colors|warm colors,primary colors only|❄️",
    "Warm colors seem to come...|forward|backward,apart",
    "Cool colors seem to move...|back|forward,out of the paper",
    "Which colors suit an icy winter scene?|cool colors|warm colors,only red|⛄",
    "Which colors suit a hot desert sunset?|warm colors|cool colors,only blue|🏜️"
  ], "Think of fire for warm and water for cool."));
  a.push(L("Triadic colors", [
    "Three evenly spaced|🔺|A <b>triadic</b> color scheme uses three colors spaced evenly around the color wheel, like the points of a triangle.",
    "Examples|🔴🟡🔵|Red, yellow and blue make a triadic set. So do orange, green and purple.",
    "Balance|⚖️|Triadic colors look lively. Artists often let one color lead and use the other two in smaller amounts."
  ], [
    "A scheme with three evenly spaced colors is...|triadic|monochromatic|neutral|🔺",
    "Which set is triadic?|red and yellow and blue|red and orange and yellow,blue and green and blue-green",
    "Which set is triadic?|orange and green and purple|yellow and yellow-green and green,red and green only",
    "Triadic colors make a ___ on the wheel.|triangle|circle only,line",
    "In a triadic scheme, artists often let ___ color lead.|one|none,all three equally always",
    "How many colors are in a triadic scheme?|three|two,five",
    "Monochromatic uses one color. Triadic uses...|three colors|zero colors,ten colors",
    "Triadic colors look...|lively|all the same,invisible"
  ], "Tri means three."));
  a.push(L("Proportion", [
    "Sizes that fit|📐|<b>Proportion</b> is how the size of one part compares with the size of another part.",
    "People|🧍|An adult is about 7 or 8 heads tall. A child is fewer heads tall because the head is bigger compared to the body.",
    "Why it matters|✅|Good proportion makes a drawing look right. On purpose, artists also change proportion to make funny cartoons."
  ], [
    "How big one part is compared with another is...|proportion|rhythm|pattern|📐",
    "An adult is about how many heads tall?|7 or 8|2,20",
    "A cartoon with a giant head has changed...|proportion|color wheel,medium",
    "Good proportion makes a drawing look...|right|upside down,wet",
    "A cat drawn bigger than a house is out of...|proportion|paint,line|🐱",
    "Artists change proportion on purpose in...|cartoons|maps,rulers",
    "To check proportion, you can compare one part with...|another part|the weather,the clock",
    "A child has a ___ head compared with the body than an adult.|bigger|smaller,missing|🧒"
  ], "Think about comparing sizes."));
  a.push(L("Near, middle, far", [
    "Three layers|🏞️|A landscape has a <b>foreground</b> (near), a <b>middleground</b> (middle) and a <b>background</b> (far away).",
    "Details|🌲|Foreground objects are big and have lots of detail. Background objects are small, pale and simple.",
    "Depth|⛰️|Using all three layers makes a flat page look deep."
  ], [
    "The part of a picture that seems nearest is the...|foreground|background|horizon|🌲",
    "The part that seems farthest away is the...|background|foreground|frame|⛰️",
    "The layer between near and far is the...|middleground|border|signature",
    "Foreground objects have more...|detail|fog,blur",
    "Background mountains are usually...|pale and simple|dark and very detailed,bright red",
    "Using three layers makes a picture look...|deep|flat,empty",
    "Big flowers at the bottom of a picture are in the...|foreground|background,sky|🌼",
    "A pale blue hill at the top is in the...|background|foreground,frame|🔵"
  ], "Near, middle, far."));
  a.push(L("Ancient Egyptian art", [
    "Art for pharaohs|🔺|Ancient Egyptians built pyramids as tombs for their kings, called <b>pharaohs</b>. Walls inside were painted with pictures.",
    "Hieroglyphs|𓂀|<b>Hieroglyphs</b> are picture symbols used for writing. Egyptians painted them on walls and wrote on <b>papyrus</b>, a paper made from a reed plant.",
    "Style|🧍|People in Egyptian paintings often show heads and legs from the side and the body from the front."
  ], [
    "Egyptian kings were called...|pharaohs|knights,samurai|🔺",
    "Picture symbols used for Egyptian writing are...|hieroglyphs|pixels,emojis only",
    "Egyptians made paper from a plant called...|papyrus|cotton,bamboo",
    "Pyramids were built as...|tombs for pharaohs|schools,swimming pools|🔺",
    "In Egyptian paintings, people's heads are often shown from the...|side|top,back only",
    "The Great Sphinx has the body of a lion and the head of a...|human|bird,fish",
    "A famous golden mask belongs to the young king...|Tutankhamun|Hokusai,Monet",
    "Egyptian art comes from the country of...|Egypt|Mexico,Japan"
  ], "Think of pyramids and picture writing."));
  a.push(L("Ancient Greek art", [
    "Beautiful shapes|🏛️|Ancient Greeks made statues, buildings and painted pots. They loved balance and perfect proportions.",
    "The Parthenon|🇬🇷|The <b>Parthenon</b> is a famous temple in Athens, with many tall columns.",
    "Painted pots|🏺|Greek vases show scenes of heroes, gods and everyday life, often in black and orange."
  ], [
    "The famous Greek temple in Athens is the...|Parthenon|Great Wall|Eiffel Tower|🏛️",
    "Greek buildings had many tall...|columns|igloos,chimneys",
    "Greek vases were often painted in black and...|orange|pink,silver|🏺",
    "Greek statues were carved from...|marble|ice cream,paper|🗿",
    "The Parthenon is in the city of...|Athens|Paris,Tokyo",
    "Greeks loved art with balance and good...|proportion|noise,cartoons",
    "Greek vases show scenes of heroes and...|gods|robots,spaceships",
    "Ancient Greek art comes from...|Greece|Brazil,Canada|🇬🇷"
  ], "Think of columns and marble."));
  a.push(L("The Renaissance", [
    "A rebirth|🌅|<b>Renaissance</b> means rebirth. It began in Italy about 600 years ago, when artists studied nature and the ancient Greeks again.",
    "New tricks|📐|Renaissance artists used perspective, light and shadow to make pictures look real and deep.",
    "Famous names|🎨|Leonardo da Vinci, Michelangelo and Raphael were great Renaissance artists."
  ], [
    "The word Renaissance means...|rebirth|new paint,big wall|🌅",
    "The Renaissance began in...|Italy|Australia,Iceland",
    "Which artist was a Renaissance artist?|Leonardo da Vinci|Andy Warhol,Claude Monet",
    "Renaissance artists used perspective to make pictures look...|deep and real|flat and plain,blurry",
    "Which artist made the Mona Lisa?|Leonardo da Vinci|Raphael only,Picasso|🖼️",
    "Renaissance artists studied nature and ancient...|Greece|robots,dinosaurs",
    "Which artist is NOT from the Renaissance?|Andy Warhol|Raphael,Michelangelo",
    "Renaissance artists used light and ___ to look real.|shadow|silence,sugar"
  ], "Re means again."));
  a.push(L("Michelangelo", [
    "A great artist|⛪|Michelangelo was an Italian sculptor and painter who lived in the Renaissance.",
    "David|🗿|He carved a huge marble statue of David, a young hero, from one block of stone.",
    "The ceiling|🎨|He painted the ceiling of the Sistine Chapel in Rome. It shows stories from the Bible with amazing figures."
  ], [
    "Michelangelo carved the statue of...|David|a horse|a robot|🗿",
    "The statue of David is made of...|marble|wood|clay",
    "Michelangelo painted the ceiling of the...|Sistine Chapel|Parthenon|Louvre|⛪",
    "The Sistine Chapel is in...|Rome|London,Madrid",
    "Michelangelo was from...|Italy|Spain,Japan",
    "A person who carves statues is a...|sculptor|baker,animator",
    "Michelangelo lived in the...|Renaissance|Pop art era,computer age",
    "Carving a statue means cutting ___ stone.|away|extra onto,sugar onto"
  ], "Think of marble and a chapel ceiling."));
  a.push(L("Pointillism", [
    "Dots of color|🔵🟡|<b>Pointillism</b> is painting with tiny dots of pure color placed side by side.",
    "Your eyes mix|👁️|From far away, your eyes blend the dots into new colors. Blue dots next to yellow dots can look green.",
    "Seurat|🌳|The French painter Georges Seurat made a famous pointillist painting called A Sunday on La Grande Jatte."
  ], [
    "Painting with tiny dots of color is...|pointillism|cubism|printmaking|🔵",
    "Which painter used pointillism?|Georges Seurat|Pablo Picasso,Hokusai",
    "From far away, the dots seem to...|blend together|disappear forever,turn to metal|👁️",
    "Blue dots next to yellow dots can look...|green|pink,black",
    "Seurat was from...|France|Egypt,Mexico",
    "A pointillist painting is made of many...|dots|long lines,stamps",
    "Your eyes do the ___ of colors.|mixing|erasing,tasting",
    "Pointillism takes a lot of...|patience|noise,sleeping"
  ], "Point means dot."));
  a.push(L("Pop art", [
    "Art from everyday life|🥫|<b>Pop art</b> began in the 1950s and 60s. It used bold colors and things from everyday life, like soup cans and comics.",
    "Andy Warhol|🎨|American artist Andy Warhol repeated pictures of soup cans and other things in bright colors.",
    "Comic style|💥|Roy Lichtenstein painted big pictures that looked like comic book panels, with dots and thick outlines."
  ], [
    "Art with bold colors and everyday things is...|pop art|cave art|ancient art|🥫",
    "Which artist painted soup cans?|Andy Warhol|Leonardo da Vinci,Claude Monet",
    "Roy Lichtenstein's art looked like...|comic books|marble statues,old maps|💥",
    "Pop art often uses ___ colors.|bold|faded,only gray",
    "Warhol often ___ the same picture in different colors.|repeated|hid,burned",
    "Pop art started in the...|1950s and 60s|1200s,1700s",
    "Pop art takes ideas from...|everyday life|only the moon,only ancient temples",
    "Dots and thick outlines are found in...|comic-style art|a marble statue,a clay pot"
  ], "Pop is short for popular."));
  a.push(L("Mosaics", [
    "Tiny pieces|🧩|A <b>mosaic</b> is a picture made from many small pieces, called <b>tesserae</b>, such as tiles, glass or stones.",
    "Old art|🏺|Ancient Romans made mosaics on floors. Some are still colorful after 2,000 years.",
    "Make one|📄|At home you can make a paper mosaic by gluing small squares of colored paper close together."
  ], [
    "A picture made from many small pieces is a...|mosaic|portrait|sketch|🧩",
    "The small pieces of a mosaic are called...|tesserae|brushes,canvases",
    "Ancient Romans often made mosaics on...|floors|clouds,paper airplanes",
    "A paper mosaic is made from small...|squares of paper|bricks of gold,pots of paint",
    "Mosaics can use tiles, glass or...|stones|water,smoke|🪨",
    "To make a mosaic, you place pieces ___ together.|close|far apart,upside down",
    "Mosaics can last a very ___ time.|long|short,silent",
    "A mosaic is different from a painting because it is made of...|separate pieces|one smooth layer,only ink"
  ], "Think of tiny tiles."));
  a.push(L("Murals", [
    "Art on walls|🖼️|A <b>mural</b> is a very large painting made right on a wall or building.",
    "For everyone|🏙️|Murals are public art. People walking by can enjoy them, and they often tell a story about a community.",
    "Planning|📏|Muralists draw a small plan first, then use a grid to copy the design large on the wall."
  ], [
    "A very large painting on a wall is a...|mural|sketch|collage|🖼️",
    "A person who paints murals is a...|muralist|kiln worker,baker",
    "Murals are often seen by...|the public|nobody,only the artist",
    "Before painting a mural, artists make a small...|plan|cake,boat",
    "A grid helps copy a small plan to a ___ wall.|large|tiny,imaginary",
    "Murals often tell a story about a...|community|secret only,single pencil",
    "Which place might have a mural?|the side of a building|inside a pencil,under the sea floor|🏙️",
    "Murals are a kind of ___ art.|public|secret,tiny"
  ], "Mural means wall."));
  a.push(L("Mobiles and moving art", [
    "Art that moves|🎐|A <b>mobile</b> is a sculpture with hanging parts that balance and move in the air.",
    "Alexander Calder|🧑‍🎨|American artist Alexander Calder invented the art mobile about 90 years ago.",
    "Balance|⚖️|A heavier piece must hang closer to the middle than a lighter piece to keep the mobile level."
  ], [
    "A sculpture with hanging balanced parts is a...|mobile|mosaic|mural|🎐",
    "Which artist invented the art mobile?|Alexander Calder|Georges Seurat,Hokusai",
    "A mobile moves with the...|air|sand,paint",
    "Art that moves is called ___ art.|kinetic|silent,flat|🌀",
    "To keep a mobile level, a heavier piece hangs ___ the middle.|closer to|farther from,above",
    "A mobile is a kind of...|sculpture|photograph,mural",
    "A mobile needs good...|balance|noise,glue only|⚖️",
    "Calder made his art from wire and...|metal shapes|ice cream,sand"
  ], "Think of something hanging and swaying."));
  a.push(L("Emphasis and contrast", [
    "Make it pop|⭐|<b>Emphasis</b> means making one part of the artwork stand out. <b>Contrast</b> is a strong difference between things.",
    "Kinds of contrast|⚫⚪|Contrast can be light and dark, big and small, warm and cool, or smooth and rough.",
    "Use it|🔴|A red apple on a gray table has strong contrast, so your eye goes to the apple."
  ], [
    "Making one part of an artwork stand out is...|emphasis|erasing|framing|⭐",
    "A strong difference between two things is...|contrast|harmony|silence",
    "Black next to white is a strong...|contrast|blend|rhythm|⚫",
    "Which has strong contrast?|a yellow circle on dark blue|light gray on light gray,beige on cream",
    "Contrast helps draw the viewer's...|eyes|nose,shoes",
    "Big and small is a kind of...|contrast|rhythm only,glue",
    "A small red dot in a big blue picture gets...|emphasis|lost,erased",
    "Same color, same size, same shape everywhere gives ___ contrast.|little|a lot of,loud"
  ], "Think about what makes one thing stand out."));
  a.push(L("Careers in art", [
    "Many jobs|💼|People can make a living in art in many ways.",
    "Some jobs|🎬|An <b>animator</b> makes moving pictures. An <b>illustrator</b> draws for books. A <b>graphic designer</b> makes logos and posters.",
    "More jobs|🏛️|An <b>architect</b> designs buildings. A <b>conservator</b> repairs old art. A <b>potter</b> makes things from clay."
  ], [
    "A person who designs logos and posters is a...|graphic designer|conservator|potter|🎨",
    "A person who repairs old art is a...|conservator|animator,architect|🔧",
    "A person who designs buildings is an...|architect|illustrator,potter|🏛️",
    "A person who makes moving pictures is an...|animator|architect,potter|🎬",
    "A person who draws pictures for storybooks is an...|illustrator|architect,conservator|📚",
    "A person who makes bowls and pots from clay is a...|potter|animator,designer of logos|🏺",
    "Which can be a job?|working as an artist|none of these,never possible",
    "Many art jobs use creativity and...|skill|luck only,silence"
  ], "Match the job to what the person makes."));
  a.push(MIX("Mixed practice", [a[0], a[3], a[5], a[7], a[9], a[10], a[12]]));
  a.push(MIX("Level 7 Challenge", [a[1], a[2], a[4], a[6], a[8], a[11], a[13], a[14], a[15], a[16], a[17]]));

  // ================= LEVEL 8 =================
  const b = [];
  b.push(L("Two-point perspective", [
    "Two vanishing points|🏢|<b>Two-point perspective</b> uses two vanishing points on the horizon line, one on the left and one on the right.",
    "Corners toward you|📦|It is used to draw a box or building seen from its corner. The corner edge is a straight up-and-down line.",
    "Steps|📏|1. Draw the horizon and two dots. 2. Draw the near vertical edge. 3. Draw lines from its top and bottom toward both dots."
  ], [
    "How many vanishing points are in two-point perspective?|two|one,four|🏢",
    "In two-point perspective, the vanishing points sit on the...|horizon line|bottom of the box,frame",
    "Two-point perspective is good for drawing a building seen from its...|corner|roof only,shadow|🏢",
    "The near corner edge of a box is drawn as a ___ line.|vertical|curved,zigzag",
    "Lines go from the top and bottom of that edge toward the...|vanishing points|frame edges,horizon only at one spot",
    "One-point perspective has one vanishing point. Two-point has...|two|three,none",
    "Perspective helps flat pictures look...|3D|silly,quiet",
    "The two vanishing points are one on the left and one on the...|right|top,floor"
  ], "Count the dots on the horizon."));
  b.push(L("Atmospheric perspective", [
    "Hazy distance|🏔️|<b>Atmospheric perspective</b> is a trick that uses the air. Faraway things look lighter, bluer and blurrier.",
    "Why?|🌫️|Air, dust and tiny water drops in the sky soften what we see far away.",
    "Use it|🖌️|Paint far mountains in pale blue-gray with few details. Paint near mountains darker with more detail."
  ], [
    "Faraway mountains look...|lighter and bluer|darker and redder,exactly the same as near ones|🏔️",
    "Atmospheric perspective makes faraway things look...|blurrier|sharper,louder",
    "Details of faraway objects are...|fewer|more,huge",
    "Nearby objects in a landscape are painted...|darker with more detail|paler with less detail,invisible",
    "The air, dust and water drops make faraway things look...|softer|spikier,closer",
    "To show a far mountain, use pale...|blue-gray|neon red,black",
    "Atmospheric perspective is a trick to show...|distance|taste,speed",
    "Which mountain is farther away?|the pale blurry one|the dark sharp one,the biggest one"
  ], "Think about haze in the air."));
  b.push(L("Split-complementary", [
    "A softer scheme|🎨|A <b>split-complementary</b> scheme uses one color plus the two colors beside its complement.",
    "Example|🔵|Blue's complement is orange. The colors beside orange are yellow-orange and red-orange. So blue, yellow-orange and red-orange make a split-complementary set.",
    "Why use it|✨|It has strong contrast like complements, but it is easier to balance."
  ], [
    "A scheme with one color plus the two beside its complement is...|split-complementary|monochromatic|neutral",
    "The complement of blue is...|orange|green,purple|🔵",
    "Blue's split-complementary partners are yellow-orange and...|red-orange|green,purple",
    "Split-complementary schemes use ___ colors.|three|one,twelve",
    "The complement of red is...|green|yellow,orange",
    "Compared with complements, split-complementary is...|easier to balance|harder to see,always gray",
    "Which color is NOT used by the blue split-complementary set?|purple|blue,yellow-orange",
    "The complement of purple is...|yellow|green,orange"
  ], "Start by finding the opposite color."));
  b.push(L("Light mixing", [
    "Light is different|💡|Paint and light mix in different ways. The primary colors of light are <b>red, green and blue</b>.",
    "Screens|📺|TVs, tablets and phones use tiny red, green and blue lights to make every color you see.",
    "All together|⚪|Mixing all three colors of light makes white light. Mixing all paints tends to make a muddy dark color."
  ], [
    "The primary colors of light are red, green and...|blue|yellow,orange|💡",
    "Screens make colors using red, green and...|blue lights|paint pots,crayons|📺",
    "All three colors of light mixed together make...|white|black,brown|⚪",
    "Mixing many paints together usually makes a...|muddy dark color|bright white,pure light",
    "A phone screen is made of tiny...|lights|brushes,stamps",
    "Which is a primary color of light?|green|yellow,purple",
    "Paint primaries are red, yellow and...|blue|green,white",
    "Light mixing is different from...|paint mixing|nothing at all,counting"
  ], "Light uses red, green and a third color."));
  b.push(L("Gesture drawing", [
    "Capture movement|🏃|A <b>gesture drawing</b> is a quick sketch that captures how a body moves, not its details.",
    "Fast and loose|⏱️|Artists spend about 30 seconds to 2 minutes. They use flowing lines, not small details.",
    "Find the action|➰|Look for the long curve of the action: the line from head through the body to the feet."
  ], [
    "A quick drawing that captures movement is a...|gesture drawing|mosaic|mural|🏃",
    "A gesture drawing usually takes...|1 or 2 minutes|3 hours,3 days|⏱️",
    "A gesture drawing focuses on...|movement|small details,shading only",
    "Gesture drawing uses ___ lines.|flowing|ruler-straight only,dotted only",
    "In a gesture drawing, you look for the line of the...|action|price,frame",
    "Gesture drawing is good practice for drawing people and...|animals|clocks only,maps only",
    "A gesture drawing of a runner shows how the body...|moves|is dressed,is priced",
    "In gesture drawing, you do not worry about tiny...|details|lines,shapes"
  ], "Think quick and loose."));
  b.push(L("Face proportions", [
    "Where things go|🙂|On a face, the eyes sit about halfway down the head. The space between the eyes is about one eye wide.",
    "Width and height|📏|The head is about five eyes wide. The nose ends about halfway between the eyes and the chin.",
    "Ears|👂|The tops of the ears line up with the eyebrows and the bottoms with the bottom of the nose."
  ], [
    "On a face, the eyes sit about ___ down the head.|halfway|a quarter of the way,at the very top|🙂",
    "A head is about how many eyes wide?|five|two,ten",
    "The space between the eyes is about one ___ wide.|eye|nose,ear",
    "The tops of the ears line up with the...|eyebrows|chin,forehead top",
    "The bottoms of the ears line up with the bottom of the...|nose|forehead,hair|👂",
    "The nose ends about halfway between the eyes and the...|chin|ears,hair",
    "The mouth is between the nose and the...|chin|eyes,ears",
    "Knowing face proportions helps a portrait look...|believable|upside down,tiny"
  ], "Think about guide lines on a face."));
  b.push(L("Unity and variety", [
    "Working together|🧩|<b>Unity</b> means all parts of an artwork feel like they belong together. You can get unity from repeated colors or shapes.",
    "Not boring|🌈|<b>Variety</b> means using different things, like sizes, shapes or colors, so the art is interesting.",
    "Just right|⚖️|Good art has both. Too much unity is dull. Too much variety looks messy."
  ], [
    "All parts of an artwork feeling like they belong together is...|unity|variety|chaos|🧩",
    "Using different shapes and colors to keep it interesting is...|variety|unity|rhythm only",
    "Repeating a color through a picture helps give...|unity|silence,chaos",
    "Too much variety can look...|messy|calm,tidy",
    "Too much unity can look...|dull|exciting,loud",
    "Good art often has both unity and...|variety|nothing,mistakes",
    "A quilt with the same blue in each square has...|unity|no color,no pattern",
    "A quilt with squares in many different shapes has...|variety|no variety,only one shape"
  ], "Think about same versus different."));
  b.push(L("Pattern and movement", [
    "Eyes on the move|👀|<b>Movement</b> is how the viewer's eye travels through an artwork.",
    "Leading the eye|➡️|Lines, curves, and repeated shapes can lead the eye from one place to another.",
    "Pattern|🔷|A <b>pattern</b> repeats a shape, line or color on purpose. Patterns can show movement, like waves."
  ], [
    "How the viewer's eye travels through art is...|movement|texture|framing|👀",
    "A road curving into the distance leads the eye by...|a line|a smell,a sound",
    "Wavy repeated lines can show the movement of...|water|stone,a frozen lake|🌊",
    "A shape, line or color repeated on purpose is a...|pattern|mistake,shadow",
    "Which can lead the eye through a picture?|a path|a blank spot,a closed door",
    "Swirls in The Starry Night show...|movement|stillness,silence",
    "A zigzag line leads the eye with...|quick turns|no direction,a stop",
    "Artists use movement to guide the viewer to the...|focal point|exit,erasers"
  ], "Think about where your eyes go."));
  b.push(L("Rembrandt and light", [
    "Master of light|🕯️|Rembrandt was a Dutch painter who lived about 400 years ago. He is famous for the way he painted light.",
    "Chiaroscuro|🔦|<b>Chiaroscuro</b> is an Italian word meaning light-dark. It is strong contrast between lights and darks.",
    "Glow|✨|In Rembrandt's paintings, faces often glow out of dark backgrounds, as if lit by a candle."
  ], [
    "Rembrandt was a painter from the...|Netherlands|Mexico,Japan|🕯️",
    "Chiaroscuro means strong contrast between...|light and dark|red and green,big and small",
    "Chiaroscuro comes from which language?|Italian|Dutch,Spanish",
    "In Rembrandt's paintings, faces often glow against...|dark backgrounds|white backgrounds,rainbows",
    "Rembrandt is famous for how he painted...|light|robots,cartoons|🔦",
    "Chiaroscuro makes pictures look...|dramatic|flat and dull,empty",
    "Rembrandt lived about ___ years ago.|400|40,4",
    "A face lit by one candle in a dark room shows...|chiaroscuro|pointillism,pop art|🕯️"
  ], "Light-dark."));
  b.push(L("Japanese woodblock prints", [
    "Ukiyo-e|🌊|<b>Ukiyo-e</b> means pictures of the floating world. These are Japanese woodblock prints made over 200 years ago.",
    "How made|🪵|An artist draws, a carver cuts the design into a wood block, and printers ink the raised parts and press paper on top. Each color needs its own block.",
    "Famous|🗻|Hokusai made The Great Wave. Hiroshige made prints of travel scenes, rain and Mount Fuji."
  ], [
    "Ukiyo-e are Japanese...|woodblock prints|clay pots,quilts|🪵",
    "Hokusai made the famous print called...|The Great Wave|Mona Lisa,Starry Night|🌊",
    "Hiroshige made prints of travel scenes and...|Mount Fuji|pyramids,igloos|🗻",
    "In a woodblock print, the design is cut into a...|wood block|glass sheet,balloon",
    "Ink goes on the ___ parts of the block.|raised|carved-away,invisible",
    "Each color in these prints needs its own...|block|brush strand,kiln",
    "Woodblock prints can make many...|copies|volcanoes,rooms",
    "Ukiyo-e comes from...|Japan|Egypt,Greece"
  ], "Think of prints from Japan."));
  b.push(L("African art", [
    "A huge continent|🌍|Africa has many countries and many art traditions. Artists carve wood, cast metal, weave and paint.",
    "Masks|🎭|Masks carved from wood are used in ceremonies and dances in many places in Africa.",
    "Kente cloth|🧵|<b>Kente</b> is a colorful woven cloth from Ghana, made from narrow strips sewn together in bold patterns."
  ], [
    "Kente cloth comes from...|Ghana|Norway,Peru|🧵",
    "Kente cloth is made of woven...|strips|bricks,balloons",
    "Masks in many African traditions are used in...|ceremonies and dances|math tests,sports bags|🎭",
    "Many African masks are carved from...|wood|ice,jelly",
    "Africa has ___ art traditions.|many|only one,no|🌍",
    "Kente patterns are...|bold and colorful|plain white,invisible",
    "African artists also weave and...|paint|never create,freeze",
    "Africa is a...|continent|city,single country"
  ], "Think of weaving and masks."));
  b.push(L("Aboriginal Australian art", [
    "Stories in dots|🇦🇺|The Aboriginal peoples of Australia have the oldest continuing art traditions on Earth, going back tens of thousands of years.",
    "Dot painting|⚫|Many paintings use dots and symbols to tell stories about the land, animals and ancestors.",
    "Respect|🤝|Some stories and symbols are special to a community. We look with respect and learn the stories from the artists."
  ], [
    "Dot paintings come from the Aboriginal peoples of...|Australia|Iceland,Canada|🇦🇺",
    "Aboriginal art uses dots and ___ to tell stories.|symbols|numbers only,emojis",
    "These art traditions are...|very old|brand new,only 10 years old",
    "Aboriginal paintings often tell stories about the...|land|stock market,weather on Mars|🏜️",
    "Some symbols are special to a community, so we look with...|respect|laughter,hurry",
    "Dot paintings are made with lots of...|dots|clay pots,ink stamps",
    "Australia is both a country and a...|continent|state of the USA,city",
    "Which animal might appear in these stories?|kangaroo|penguin in a tuxedo,dragon from China|🦘"
  ], "Think of dots and stories about the land."));
  b.push(L("Frida Kahlo", [
    "Mexican painter|🇲🇽|Frida Kahlo was a famous painter from Mexico who lived about 100 years ago.",
    "Self-portraits|🪞|She painted many <b>self-portraits</b>, pictures of herself. She added flowers, animals and symbols to show her feelings and her culture.",
    "Bold style|🌺|Her paintings have bright colors and a strong look. She loved Mexican folk art."
  ], [
    "Frida Kahlo was a painter from...|Mexico|Italy,Egypt|🇲🇽",
    "Frida painted many...|self-portraits|skyscrapers,maps|🪞",
    "A picture of yourself is a...|self-portrait|landscape,mural",
    "Frida added flowers and animals to show her...|feelings|lunch,homework",
    "Frida loved Mexican...|folk art|robots,video games",
    "Her paintings have ___ colors.|bright|only gray,invisible",
    "Frida lived about ___ years ago.|100|10,1000",
    "Symbols in a painting can show...|ideas and feelings|only the date,only the price"
  ], "Think of a self-portrait painter."));
  b.push(L("Surrealism", [
    "Dream pictures|💭|<b>Surrealism</b> is art that looks like a dream. Strange things appear together in surprising ways.",
    "Salvador Dalí|🕰️|The Spanish artist Salvador Dalí painted melting clocks in a famous work called The Persistence of Memory.",
    "Imagination|🌙|Surrealists painted things that could not happen in real life, but they painted them in a very realistic way."
  ], [
    "Art that looks like a dream is...|surrealism|pointillism|cubism|💭",
    "Which artist painted melting clocks?|Salvador Dalí|Georges Seurat,Hokusai|🕰️",
    "Salvador Dalí was from...|Spain|Japan,Ghana",
    "Surrealists painted things that could not happen in...|real life|dreams,stories",
    "Surrealist art often shows ___ things together.|strange|ordinary only,no|🌙",
    "The Persistence of Memory shows clocks that look...|soft and melting|digital and square,frozen blue",
    "Surrealism uses...|imagination|only rulers,only photos",
    "Sur- in surrealism hints at going beyond...|real|ruler,reed"
  ], "Think dream-like and surprising."));
  b.push(L("Watercolor tricks", [
    "Using water|💧|Watercolor is paint you spread with water. Little paint and lots of water makes a light, see-through color.",
    "Three methods|🖌️|A <b>wash</b> covers a big area smoothly. <b>Wet-on-wet</b> means painting on damp paper so colors blur together. <b>Dry brush</b> uses little water to make scratchy texture.",
    "Lights|⬜|Watercolor artists often leave the white paper unpainted for the brightest spots."
  ], [
    "Painting on damp paper so colors blur is...|wet-on-wet|dry brush|hatching|💧",
    "Covering a big area smoothly with thin paint is a...|wash|stipple|stamp",
    "A scratchy texture comes from the ___ method.|dry brush|wash,wet-on-wet|🖌️",
    "For a light see-through color, use more...|water|glue,sand",
    "Watercolor artists often leave white ___ for highlights.|paper|oil,clay|⬜",
    "Dry brush uses ___ water.|little|lots of,only|🖌️",
    "Wet-on-wet is good for painting soft...|skies|sharp outlines,tiny details",
    "Watercolor is spread with...|water|oil,sand"
  ], "Think about how much water is used."));
  b.push(L("Printmaking types", [
    "Relief printing|🪵|In <b>relief printing</b>, you carve away parts of a block. The raised parts get ink and print. Woodcuts and linocuts are relief prints.",
    "Other ways|🖨️|<b>Screen printing</b> pushes ink through a mesh stencil, often for T-shirts and posters.",
    "Remember|🔁|A print can be repeated to make many copies, called an <b>edition</b>."
  ], [
    "Carving a block and inking the raised parts is...|relief printing|screen printing|sculpting|🪵",
    "Printing ink through a mesh stencil is...|screen printing|woodcut|weaving|🖨️",
    "A set of copies of one print is an...|edition|easel,aquarium",
    "A linocut is carved from...|linoleum|marble,glass",
    "In relief printing, the ___ parts hold ink.|raised|carved-away,hidden",
    "Screen printing is often used on...|T-shirts|clouds,jewels|👕",
    "In a woodcut, the block is made of...|wood|paper,plastic water",
    "The areas that stay white were carved...|away|up,loudly"
  ], "Think about carving away and inking."));
  b.push(L("Stop-motion animation", [
    "Photo by photo|🎬|In <b>stop-motion</b>, you take a photo, move a model a tiny bit, take another photo, and repeat. Played fast, the model moves.",
    "Models|🧱|Models can be made of clay, paper, toys or building blocks.",
    "Frames|🎞️|Each photo is a <b>frame</b>. Movies often use 24 frames each second, so a few seconds takes many photos."
  ], [
    "Taking photos while moving a model a tiny bit is...|stop-motion|a mural|a mosaic|🎬",
    "Each photo in an animation is a...|frame|palette,canvas|🎞️",
    "Movies often use how many frames per second?|24|2,400",
    "A model for stop-motion can be made of...|clay|water,smoke",
    "Between photos, you move the model...|a tiny bit|across the room,not at all",
    "Played fast, the photos make the model look like it...|moves|melts away,stays still",
    "A few seconds of film needs ___ photos.|many|one,no",
    "Stop-motion is a kind of...|animation|sculpture only,print only"
  ], "Photo, move a little, photo."));
  b.push(L("Logos and graphic design", [
    "Fast messages|🏷️|A <b>logo</b> is a simple picture or word shape that stands for a business or group.",
    "Good logos|✅|A good logo is simple, easy to remember, and works small or large. It uses only a few colors.",
    "Graphic design|🖥️|<b>Graphic designers</b> plan logos, posters, book covers and websites."
  ], [
    "A simple symbol standing for a business is a...|logo|mural|portrait|🏷️",
    "A good logo is...|simple|full of tiny details,impossible to read",
    "A logo should work when it is small or...|large|folded,wet",
    "Logos usually use how many colors?|only a few|hundreds,none ever",
    "A person who plans logos and posters is a...|graphic designer|potter,sculptor|🖥️",
    "Why should a logo be easy to remember?|people recognize it fast|it is hidden,it is heavy",
    "Graphic designers also plan book...|covers|oceans,roots",
    "A logo for a bakery might include...|bread or a wheat shape|a rocket engine,a tank|🥖"
  ], "Think about being simple and memorable."));
  b.push(MIX("Mixed practice", [b[0], b[2], b[4], b[6], b[8], b[10], b[12], b[14]]));
  b.push(MIX("Level 8 Challenge", [b[1], b[3], b[5], b[7], b[9], b[11], b[13], b[15], b[16], b[17]]));

  // ================= LEVEL 9 =================
  const c = [];
  c.push(L("Grid method", [
    "Copy bigger|🔲|The <b>grid method</b> helps you copy a picture accurately or draw it larger.",
    "Steps|📏|1. Draw a grid of squares over the small picture. 2. Draw a grid with the same number of squares, but bigger, on your paper. 3. Copy what you see in each square.",
    "Why it works|🧩|Each square is easier to draw than the whole picture. The big grid keeps the proportions right."
  ], [
    "A method that uses squares to copy and enlarge a picture is the...|grid method|wash method|tracing wheel|🔲",
    "To make a drawing 2 times bigger, each square on your paper is...|twice as wide|half as wide,the same size",
    "The two grids must have the same number of...|squares|colors,corners only",
    "Copying one square at a time makes drawing...|easier|impossible,louder",
    "The grid helps keep the ___ right.|proportions|weather,price",
    "Muralists use grids to copy a small plan onto a...|big wall|ant,tiny stamp",
    "Grid lines on a reference photo are drawn...|lightly|with thick paint,in permanent glue",
    "If a grid has 5 columns and 4 rows, it has how many squares?|20|9,54"
  ], "Think about breaking a picture into small squares."));
  c.push(L("Shading and blending", [
    "Pencil grades|✏️|Pencils are graded. <b>H</b> pencils are hard and make light lines. <b>B</b> pencils are soft and make dark lines. <b>HB</b> is in the middle.",
    "Blending|👆|To blend, rub the graphite gently with a paper stump, a cotton swab or a clean finger for smooth shading.",
    "A shaded ball|⚽|Make a smooth change from light to dark (a gradient). Leave a small bright highlight, and add a cast shadow."
  ], [
    "Which pencil makes the darkest lines?|a soft B pencil|a hard H pencil,a plain eraser|✏️",
    "Which pencil makes light lines?|a hard H pencil|a soft B pencil,a marker",
    "HB pencils are...|in the middle|the darkest,the lightest",
    "A smooth change from light to dark is a...|gradient|patch|stamp",
    "To blend graphite, you can use a paper...|stump|brick,clock",
    "A shaded sphere also needs a cast...|shadow|rainbow,melody",
    "To get a very dark value, use a softer pencil and press...|harder|barely at all,never",
    "Leaving a small white spot on a sphere makes the...|highlight|cast shadow,frame"
  ], "Think about hard versus soft pencils."));
  c.push(L("Tints, tones and shades", [
    "Changing a color|🎨|Pure colors can be changed. A <b>tint</b> is a color plus white. A <b>shade</b> is a color plus black. A <b>tone</b> is a color plus gray.",
    "Moods|🌫️|Tints look soft and light, like pastel pink. Shades look deep and rich, like navy. Tones look calm and muted.",
    "Use|🖌️|Artists mix tints, tones and shades to make a color work in light and shadow."
  ], [
    "A color plus white is a...|tint|shade|tone|⚪",
    "A color plus black is a...|shade|tint|tone|⚫",
    "A color plus gray is a...|tone|tint|shade|🩶",
    "Pastel pink is a tint of...|red|blue,green",
    "Navy is a ___ of blue.|shade|tint,tone",
    "Tones look more...|muted|neon,transparent",
    "To make a lighter version of green, add...|white|black,more green only",
    "To make a darker version of purple, add...|black|white,yellow only"
  ], "Tint, tone, shade: white, gray, black."));
  c.push(L("Color and feeling", [
    "Colors speak|🌈|Colors can change how a picture feels. These feelings can differ between cultures, but some are common in many places.",
    "Examples|🔴🔵🟢|Red can feel energetic or can warn us. Blue often feels calm. Green reminds us of nature and growth. Yellow often feels cheerful.",
    "Choose|✅|Pick colors that match the feeling you want to show."
  ], [
    "Which color often feels calm?|blue|red|bright orange|🔵",
    "Which color often reminds us of nature?|green|black|pink|🌿",
    "Which color often feels cheerful?|yellow|dark gray|navy|🌞",
    "Red can feel energetic or can...|warn us|make us sleepy,be invisible|🔴",
    "For a peaceful lake scene, an artist might choose...|soft blues|harsh reds,hot orange only",
    "For a lively birthday poster, an artist might choose...|bright colors|only gray,only brown|🎉",
    "Colors can mean different things in different...|cultures|pencils,frames",
    "Dark gray and black can feel...|serious|giggly,sunny|⚫"
  ], "Think about the mood each color brings."));
  c.push(L("Symbols in art", [
    "Pictures with meaning|🕊️|A <b>symbol</b> is a picture or object that stands for an idea.",
    "Common symbols|🦉|A dove stands for peace. An owl stands for wisdom. A lion stands for courage. Scales stand for fairness.",
    "In paintings|🖼️|Artists add symbols to give a painting a deeper meaning that viewers can find."
  ], [
    "A dove is often a symbol of...|peace|anger|hunger|🕊️",
    "An owl is often a symbol of...|wisdom|speed|laziness|🦉",
    "A lion is often a symbol of...|courage|fear|sleep|🦁",
    "Scales are a symbol of...|fairness|weather|cooking|⚖️",
    "A picture that stands for an idea is a...|symbol|shadow|stamp",
    "Why do artists add symbols?|to add deeper meaning|to hide the painting,to make it heavier",
    "A heart shape is often a symbol of...|care|rain,sand",
    "A light bulb in a cartoon often stands for a...|new idea|power cut,sleepy day|💡"
  ], "Think about what each picture usually means."));
  c.push(L("Four steps of art criticism", [
    "How to talk about art|🔍|Art critics often use four steps: <b>describe</b>, <b>analyze</b>, <b>interpret</b>, and <b>judge</b>.",
    "The steps|📋|<b>Describe</b>: what do you see? <b>Analyze</b>: how are the elements and principles used? <b>Interpret</b>: what is the meaning? <b>Judge</b>: how well does it work, and why?",
    "Back it up|💬|Always give reasons. Say what you see that makes you think so."
  ], [
    "Which step asks, What do you see?|describe|judge|interpret|🔍",
    "Which step looks at how lines, colors and shapes are used?|analyze|describe|judge",
    "Which step asks, What is the meaning?|interpret|describe,analyze",
    "Which step asks how well the artwork works?|judge|describe,interpret",
    "How many steps are in this art criticism method?|four|two,nine",
    "A good opinion about art includes...|reasons|insults,no words",
    "The painting has a big red circle in the middle. This is a...|description|judgment,guess about price",
    "I think it feels lonely because of the empty space. This is an...|interpretation|description,order"
  ], "Think about what each step asks."));
  c.push(L("Principles of design", [
    "Rules artists use|🧰|The <b>principles of design</b> are ways artists organize the elements: balance, contrast, emphasis, movement, pattern, rhythm and unity.",
    "Elements vs principles|🧱|Elements are the ingredients: line, shape, color, value, texture, form, space. Principles are how you arrange them.",
    "Try spotting|🔎|In any picture, ask: Where is the emphasis? Is it balanced? Where does the eye move?"
  ], [
    "Line, shape and color are elements. Balance and contrast are...|principles of design|tools only|materials|🧰",
    "Which is a principle of design?|rhythm|clay|easel",
    "Which is a principle of design?|unity|kiln|crayon",
    "Which is an element of art?|texture|emphasis|balance",
    "Making one thing stand out is...|emphasis|pattern|symmetry",
    "Elements are the ___ of art.|ingredients|prices|reviews",
    "Principles are how you ___ the elements.|arrange|erase|hide",
    "Where the eye travels through a picture is called...|movement|stipple|variety only"
  ], "Elements are ingredients, principles are the recipe."));
  c.push(L("Roman buildings", [
    "Strong builders|🏟️|Ancient Romans built with arches, domes and concrete. This let them make huge, strong buildings.",
    "Famous places|🏛️|The <b>Colosseum</b> in Rome was a giant arena. The <b>Pantheon</b> has a big dome. <b>Aqueducts</b> carried water over arches.",
    "Greek columns|🏛️|The Greeks used three kinds of columns: simple Doric, scrolled Ionic and leafy Corinthian."
  ], [
    "The giant arena in Rome is the...|Colosseum|Parthenon|Louvre|🏟️",
    "Romans built bridges for water called...|aqueducts|kilns,studios",
    "Romans used curved tops called...|arches|spikes,rails",
    "The Pantheon is famous for its big...|dome|pyramid,windmill",
    "The simple Greek column is...|Doric|Corinthian,Ionic|🏛️",
    "The Greek column with leaves on top is...|Corinthian|Doric,Ionic",
    "The Greek column with scrolls on top is...|Ionic|Doric,Corinthian",
    "Romans mixed arches with strong...|concrete|paper,jelly"
  ], "Think about arches and domes."));
  c.push(L("Gothic cathedrals", [
    "Reaching to the sky|⛪|Gothic cathedrals were built in Europe about 800 years ago. They are tall, with pointed arches and huge windows.",
    "Helpers|🧱|<b>Flying buttresses</b> are curved supports outside the walls. They let walls be tall and thin, with room for windows.",
    "Glass|🌈|The windows are made of <b>stained glass</b>, pieces of colored glass joined to make pictures that glow in sunlight."
  ], [
    "Gothic arches are...|pointed|flat|round like a ball|⛪",
    "Curved supports outside Gothic walls are flying...|buttresses|bridges,balconies",
    "Colored glass windows are called ___ glass.|stained|frozen,paper",
    "Gothic cathedrals are very...|tall|short and wide,tiny",
    "Notre-Dame is a Gothic cathedral in...|Paris|Cairo,Tokyo",
    "Stained glass glows when ___ shines through.|sunlight|rain,wind|🌈",
    "Flying buttresses let walls be tall and thin with room for...|windows|moats,chimneys",
    "Gothic cathedrals were built about 800 years ago in...|Europe|Antarctica,Mars"
  ], "Think pointed arches and tall windows."));
  c.push(L("Leonardo's notebooks", [
    "Artist and inventor|📓|Leonardo da Vinci filled thousands of pages with sketches and notes. He drew people, animals, plants, machines and flying ideas.",
    "Mirror writing|🪞|Leonardo was left-handed and often wrote in <b>mirror writing</b>, which reads right-to-left and looks normal in a mirror.",
    "Famous work|🧍|His Vitruvian Man shows how the parts of the body fit inside a circle and a square. His Last Supper is a huge wall painting."
  ], [
    "Leonardo da Vinci often wrote in...|mirror writing|invisible ink only,code of dots|🪞",
    "Leonardo's notebooks include drawings of machines and...|plants|nothing,only boats",
    "Vitruvian Man shows body proportions inside a circle and a...|square|triangle,star|🧍",
    "Leonardo da Vinci was an artist and...|inventor|baker,farmer only",
    "Leonardo wrote and drew thousands of pages in his...|notebooks|bank,mirror shop|📓",
    "The Last Supper is a huge...|wall painting|statue,mobile",
    "Leonardo studied nature and the human...|body|stock market,video game",
    "Leonardo drew ideas for machines that could...|fly|play music only,make toast"
  ], "Think about an inventor's sketchbooks."));
  c.push(L("Illuminated manuscripts", [
    "Books before printing|📜|Long ago, books were copied by hand, because the printing press was not invented until about the year 1450.",
    "Decorated pages|✨|An <b>illuminated manuscript</b> has pages decorated with gold, bright colors and tiny pictures. The first letter might be big and fancy.",
    "Makers|🖋️|Monks and scribes wrote the text with quill pens, and artists painted the pictures."
  ], [
    "A hand-copied book decorated with gold and color is an...|illuminated manuscript|poster|mural|📜",
    "Before the printing press, books were copied by...|hand|machine only,computer",
    "Scribes wrote with a quill, a pen made from a...|feather|nail,stick of metal|🪶",
    "Illuminated manuscripts often use shiny...|gold|plastic,mud",
    "The first letter on a page might be big and...|fancy|missing,silent",
    "The printing press was invented about the year...|1450|1850,950",
    "The word manuscript means written by...|hand|machine,voice",
    "Illuminated pages contain tiny...|pictures|engines,coins"
  ], "Think about books made by hand."));
  c.push(L("Islamic geometric patterns", [
    "Patterns that repeat|🕌|Islamic art is famous for beautiful geometric patterns made from circles, squares, stars and repeating lines.",
    "Arabesques|🌿|An <b>arabesque</b> is a pattern of flowing leaves and curving stems that repeats.",
    "Places|🧱|You can see these patterns on tiles, carpets, books and buildings like the Alhambra in Spain."
  ], [
    "Islamic art is famous for repeating geometric...|patterns|robots,video|🕌",
    "A pattern of flowing leaves and stems is an...|arabesque|origami|etching",
    "These patterns are often made from circles, squares and...|stars|dragons,cars",
    "Where might you see these patterns?|on tiles|only in the clouds,only on food|🧱",
    "The Alhambra is a famous palace in...|Spain|Peru,Canada",
    "Patterns that repeat forever without gaps are...|tessellations|puddles,coins",
    "These designs are often made with a ruler and...|compass|spoon,hammer",
    "Carpets and tiles often have...|repeating patterns|no patterns,only photos"
  ], "Think shapes and repeating lines."));
  c.push(L("Chinese brush painting", [
    "Ink and brush|🖌️|Chinese brush painting uses black ink and a soft brush on silk or rice paper. Artists often paint mountains, mist, bamboo and birds.",
    "Four treasures|📜|Scholars called the brush, ink, paper and inkstone the Four Treasures of the Study.",
    "Calligraphy|🈶|Beautiful handwriting, <b>calligraphy</b>, is treated as a high art. A painting often has a poem written on it."
  ], [
    "Chinese brush painting often uses black...|ink|clay|neon paint|🖌️",
    "Artists paint on silk or rice...|paper|metal,stone",
    "Beautiful handwriting as art is...|calligraphy|pointillism,relief|🈶",
    "A common subject of these paintings is...|bamboo|skyscrapers,robots",
    "The Four Treasures are brush, ink, paper and...|inkstone|palette knife,easel",
    "These paintings often show mountains and...|mist|neon signs,traffic",
    "A painting may have a ___ written on it.|poem|price list,menu",
    "The brush is made from soft...|hair|steel,glass"
  ], "Think of ink and brush on paper."));
  c.push(L("Art movements", [
    "Styles over time|⏳|An <b>art movement</b> is a style shared by a group of artists in a certain time.",
    "Match them|🎨|Impressionism: Monet. Post-Impressionism: Van Gogh. Cubism: Picasso. Surrealism: Dalí. Pop art: Warhol. Pointillism: Seurat.",
    "Remember|🧠|Each movement tried something new with color, shape or ideas."
  ], [
    "Monet belongs to...|Impressionism|Cubism|Pop art|🪷",
    "Picasso helped start...|Cubism|Surrealism|Pointillism|🧩",
    "Dalí painted in the style of...|Surrealism|Cubism,Impressionism|🕰️",
    "Warhol is linked with...|Pop art|Impressionism,Renaissance|🥫",
    "Seurat is linked with...|Pointillism|Pop art,Cubism|🔵",
    "A style shared by a group of artists in a certain time is an...|art movement|exhibit,easel",
    "Van Gogh is linked with...|Post-Impressionism|Pop art,Surrealism|🌌",
    "Which movement used dabs of paint to catch light outdoors?|Impressionism|Pop art,Surrealism"
  ], "Match each artist to the style."));
  c.push(L("Typography", [
    "Letters as design|🔤|<b>Typography</b> is the art of choosing and arranging letters. A style of letters is a <b>font</b>.",
    "Two families|🅰️|<b>Serif</b> fonts have small feet on the letters. <b>Sans-serif</b> fonts do not have feet. Sans means without.",
    "Readable|👓|Good text is easy to read: clear fonts, enough space between lines and strong contrast with the background."
  ], [
    "The art of choosing and arranging letters is...|typography|stippling|weaving|🔤",
    "A style of letters is a...|font|palette|frame",
    "Letters with small feet are...|serif|sans-serif|bubble",
    "Letters without feet are...|sans-serif|serif|printed only",
    "Sans means...|without|with,small",
    "For easy reading, text needs strong ___ with the background.|contrast|noise,rhythm only",
    "Which is easiest to read?|dark text on a light background|light yellow on white,gray on gray",
    "A poster headline is usually...|bigger than body text|tiny,hidden"
  ], "Think about letters and their shapes."));
  c.push(L("Photography composition", [
    "Good photos|📷|Photographers use tricks to make photos interesting.",
    "Leading lines|🛤️|<b>Leading lines</b>, like a path or fence, draw the eye toward the subject. The camera angle matters too: a <b>bird's-eye view</b> is from above, a <b>worm's-eye view</b> is from the ground.",
    "Other tricks|🖼️|Use the rule of thirds, frame the subject, and add something in the foreground for depth."
  ], [
    "A path that draws the eye toward the subject is a...|leading line|frame|border|🛤️",
    "A photo taken from above is a...|bird's-eye view|worm's-eye view,close-up|🐦",
    "A photo taken from the ground looking up is a...|worm's-eye view|bird's-eye view,wide shot|🪱",
    "The rule of thirds puts the subject...|off-center|always dead center,out of the frame",
    "Adding something in the foreground creates...|depth|noise,silence",
    "Framing a subject with a window is a ___ trick.|composition|math,cooking",
    "To photograph a tall building looking up, take a...|worm's-eye view|bird's-eye view,sideways view",
    "Before photographing a person you should...|ask permission|run,hide|🙂"
  ], "Think about where the camera is and what guides the eye."));
  c.push(L("Sculpture techniques", [
    "Two ways|🗿|<b>Subtractive</b> sculpture takes material away, like carving stone or wood. <b>Additive</b> sculpture adds material, like building up clay.",
    "Skeleton|🔩|An <b>armature</b> is a wire or wood skeleton inside a clay sculpture that holds it up.",
    "Casting|🔔|In <b>casting</b>, melted metal is poured into a mold to make a bronze statue. Only trained adults do this."
  ], [
    "Carving stone takes material away. This is...|subtractive|additive|casting|🗿",
    "Building up a figure from clay is...|additive|subtractive|erasing",
    "A wire skeleton inside a clay sculpture is an...|armature|easel|kiln|🔩",
    "A mold is used in...|casting|weaving,stippling",
    "Bronze statues are made by...|casting|knitting,painting only",
    "An armature helps a clay figure...|stand up|melt faster,fly",
    "Which is subtractive?|carving wood|adding clay balls,gluing paper",
    "Which is additive?|building with clay coils|chiseling marble,sanding a stick"
  ], "Subtract means take away."));
  c.push(L("Respecting others' art", [
    "Original work|⭐|Copying someone else's art and saying you made it is wrong. Your own ideas are what make your art special.",
    "Credit|📝|If you use ideas or pictures from another artist, say so. Ask permission before using their work.",
    "Learning is OK|📖|Studying how an artist works and then making something new is a good way to learn."
  ], [
    "Copying someone's art and saying you made it is...|wrong|clever|required|⭐",
    "If you use another artist's work, you should give...|credit|insults,money to nobody",
    "Before using someone's art, you should...|ask permission|hide it,change the name",
    "Art that comes from your own ideas is...|original|stolen,invisible",
    "Studying an artist and then making something new is...|a good way to learn|cheating,against all rules",
    "Credit means saying who ___ the art.|made|bought,sold",
    "Putting your name on a friend's drawing is...|not honest|kind,smart",
    "Sharing where your inspiration came from is...|honest|silly,secret"
  ], "Think about honesty and giving credit."));
  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[5], c[6], c[9], c[12], c[14]]));
  c.push(MIX("Level 9 Challenge", [c[1], c[3], c[7], c[8], c[10], c[11], c[13], c[15], c[16], c[17]]));

  Object.assign(ART_LEVELS, { 7: a, 8: b, 9: c });
})();
