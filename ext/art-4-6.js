// ext/art-4-6.js  Art & Drawing levels 4-6
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

  // ================= LEVEL 4 =================
  const a = [];
  a.push(L("Geometric shapes", [
    "Shapes with rules|🔺🟦⚪|<b>Geometric shapes</b> are neat shapes like circles, squares, triangles and rectangles. You can draw them with a ruler or a round lid.",
    "Look around|📚🕐|A book is a rectangle. A clock face is a circle. Many things people build are geometric.",
    "Tip|✏️|Geometric shapes have clear edges and exact sizes. Artists use them to build pictures."
  ], [
    "A circle is a ___ shape.|geometric|organic,messy|⚪",
    "A square is a ___ shape.|geometric|organic,wiggly|🟦",
    "A triangle is a ___ shape.|geometric|organic,random|🔺",
    "Which one is a geometric shape?|a rectangle|a cloud,a puddle",
    "A door is shaped like a...|rectangle|circle,triangle|🚪",
    "A pizza box lid is shaped like a...|square|circle,star|📦",
    "A ruler helps you draw ___ shapes.|geometric|wavy,organic|📏",
    "A wheel from the side looks like a...|circle|square,triangle|🛞"
  ], "Think about neat shapes with exact edges."));
  a.push(L("Organic shapes", [
    "Shapes from nature|🍃☁️|<b>Organic shapes</b> are curvy and uneven, like shapes in nature. No ruler can draw them exactly.",
    "Examples|🌿🪨💧|Leaves, clouds, rocks, puddles and flowers have organic shapes.",
    "Tip|🖍️|You can draw an organic shape freehand, with a loose, flowing line."
  ], [
    "A puddle has a curvy, uneven outline. That is an ___ shape.|organic|geometric,exact|💧",
    "A leaf is usually an ___ shape.|organic|geometric,square|🍃",
    "Which one is an organic shape?|a cloud|a square,a triangle|☁️",
    "Which one is an organic shape?|a rock|a rectangle,a circle|🪨",
    "Organic shapes are often...|curvy and uneven|perfectly straight,all the same size",
    "Which of these comes from nature?|an organic shape|a ruler-made box,a square grid",
    "A splash of paint makes an ___ shape.|organic|geometric,ruler-made|🎨",
    "A blob drawn freehand is...|organic|geometric,exact"
  ], "Think about shapes you find in nature."));
  a.push(L("Line words", [
    "Many kinds of lines|〰️|Lines can be <b>straight</b>, <b>curved</b>, <b>zigzag</b>, <b>wavy</b>, <b>thick</b> or <b>thin</b>.",
    "Describing lines|⚡🌊|A zigzag goes sharply up and down. A wavy line moves softly like water.",
    "Try it|✏️|Press hard for a thick line. Press lightly for a thin line."
  ], [
    "A line that goes sharply up and down, like lightning, is a...|zigzag|curve,straight line|⚡",
    "A line that moves softly up and down like water is...|wavy|zigzag,straight|🌊",
    "A line with no bends is...|straight|curved,wavy",
    "A line shaped like part of a circle is...|curved|straight,zigzag",
    "How do you make a thick line with a pencil?|press harder|press lighter,hold it far away",
    "How do you make a thin line with a pencil?|press lightly|press very hard,use a wide brush",
    "A line that goes round and round is a...|spiral|zigzag,straight line|🌀",
    "A line made of tiny marks with gaps is...|dotted|solid,wavy"
  ], "Picture the line in your mind and trace it with your finger."));
  a.push(L("Line moods", [
    "Lines show feelings|😌😲|Different lines can make a picture feel different.",
    "Soft and sharp|🌊⚡|Smooth, curvy lines feel calm. Sharp, zigzag lines feel busy and exciting.",
    "Flat and tall|➖🌲|Flat lines side to side feel restful. Tall up-and-down lines feel strong."
  ], [
    "Which lines feel calm?|smooth and curvy|sharp zigzags,jagged spikes",
    "Which lines feel busy and exciting?|sharp zigzags|slow soft curves,long flat lines|⚡",
    "Flat lines going side to side feel...|restful|scary,angry|➖",
    "Tall up-and-down lines can feel...|strong|sleepy,floppy|🌲",
    "To draw a sleeping calm sea you would use...|soft wavy lines|jagged spikes,sharp zigzags|🌊",
    "To draw a loud thunderstorm you might use...|jagged lines|slow soft curves,flat lines|⛈️",
    "Spirals can make a picture feel...|swirly and moving|still and flat,empty|🌀",
    "Lines can show...|feelings|only straight edges,nothing at all"
  ], "Think about how the lines would make you feel."));
  a.push(L("Overlap", [
    "Shapes in front|🟦🟥|When one shape covers part of another, it is <b>overlapping</b>.",
    "Which is closer?|🌳⛰️|The shape that is not cut off looks closer. The shape that is partly hidden looks farther away.",
    "Use it|🏠🌳|Draw a tree in front of a house, so the tree covers part of it. The tree looks nearer."
  ], [
    "When one shape covers part of another, it is...|overlapping|erasing,symmetry",
    "A tree covers part of a house. Which looks closer?|the tree|the house,they look the same|🏠",
    "A cat sits in front of a fence. Which looks farther away?|the fence|the cat,the cat's tail|🐱",
    "Overlapping makes a picture look more...|deep|flat,empty",
    "Which shape is in front?|the one that covers the other|the one that is cut off,the smaller one",
    "In front of a mountain, a bird is drawn whole. The mountain is...|behind the bird|in front of the bird,the same as the bird|🏔️",
    "To show a boat is behind a rock, you...|let the rock cover part of the boat|draw the boat on top,draw them far apart|⛵",
    "Overlapping is a way to show...|one thing in front of another|a rhyme,a mirror"
  ], "Which thing is hidden a little bit by the other?"));
  a.push(L("Portrait or landscape?", [
    "Two ways to turn paper|🖼️|Hold the paper tall and it is <b>portrait</b>. Turn it wide and it is <b>landscape</b>.",
    "Matching the picture|🧍🏞️|Tall things, like a standing person, often fit a portrait page. Wide scenes, like a field, fit landscape.",
    "Remember|💡|A <b>portrait</b> picture shows a person. A <b>landscape</b> picture shows a place."
  ], [
    "A paper that is tall is held in ___ position.|portrait|landscape,circle",
    "A paper that is wide is held in ___ position.|landscape|portrait,square",
    "A drawing of a person's face is a...|portrait|landscape,still life|🙂",
    "A drawing of hills, fields and sky is a...|landscape|portrait,self-portrait|🏞️",
    "A drawing of yourself is a...|self-portrait|landscape,still life|🪞",
    "A wide picture of a beach fits best on ___ paper.|landscape|portrait,tiny|🏖️",
    "A tall picture of a giraffe fits best on ___ paper.|portrait|landscape,round|🦒",
    "A picture of fruit in a bowl is a...|still life|portrait,landscape|🍎"
  ], "Is it a picture of a person, a place, or objects?"));
  a.push(L("Collage", [
    "Cut and paste|✂️📰|A <b>collage</b> is art made by gluing pieces of paper or other flat things onto a surface.",
    "What you can use|🎨🍂|Colored paper, tissue paper, old magazines, fabric scraps and dried leaves all work.",
    "Tip|🧴|Spread glue thinly. Arrange the pieces first, then glue them down."
  ], [
    "Art made by gluing pieces onto a surface is a...|collage|sculpture,portrait",
    "Which tool do you need for a collage?|glue|a hammer,a ladder|🧴",
    "Which can you use in a collage?|colored paper|wet sand only,a heavy rock|📰",
    "To cut paper shapes you use...|safe scissors|a hammer,a spoon|✂️",
    "A good first step for a collage is to...|arrange the pieces|glue before cutting,throw them away",
    "A collage can be made from...|many kinds of materials|only paint,only pencil",
    "A leaf collage uses...|dried leaves|only crayons,melted ice|🍂",
    "Before you glue, you should...|plan where pieces go|rush,hide the paper"
  ], "Think about cutting, arranging and gluing."));
  a.push(L("Clay and sculpture", [
    "Art you can walk around|🗿|A <b>sculpture</b> is art in 3D. You can look at it from all sides.",
    "Working with clay|🏺|Clay is soft. You can pinch it, roll it, press it and join pieces with a bit of water.",
    "Drying|☀️🔥|Clay hardens as it dries. Potters bake it in a hot oven called a <b>kiln</b> to make it very strong."
  ], [
    "Art that is 3D and you can walk around is a...|sculpture|painting,drawing|🗿",
    "What can you do with soft clay?|roll and pinch it|fold it flat only,eat it",
    "What is a kiln?|a hot oven for clay|a paintbrush,a kind of paper|🔥",
    "A person who makes pots from clay is a...|potter|painter,baker|🏺",
    "A sculpture can be seen from...|all sides|only the front,only above",
    "How are clay pieces joined?|with a little water|with tape only,with ink",
    "Clay gets hard as it...|dries|melts,freezes|☀️",
    "A rolled clay snake is called a...|coil|spiral staircase,sheet",
  ], "Think about 3D art you can hold and turn."));
  a.push(L("Printmaking", [
    "Make copies|🖨️🐾|<b>Printmaking</b> means making a picture on one surface and pressing it onto paper to get a copy.",
    "Stamping|🍎🎨|You can print with a sponge, a potato stamp or even your fingertip dipped in paint.",
    "Prints repeat|🔁|One stamp can make the same shape again and again. This is great for patterns."
  ], [
    "Pressing a painted surface onto paper to copy it is...|printing|erasing,sculpting",
    "A potato stamp is used for...|printmaking|carving a statue,baking",
    "One stamp can be used...|many times|only once,never|🔁",
    "Printing is good for making...|patterns|clay pots,shadows",
    "To print with a stamp, first you put on...|paint|glue only,water only|🎨",
    "A fingerprint made with paint is a kind of...|print|sculpture,collage|☝️",
    "A stamp makes a ___ of the shape.|copy|hole,shadow only",
    "Printing many times in a row makes a...|repeat pattern|new color,hole"
  ], "Think about a stamp pressed onto paper."));
  a.push(L("Weaving", [
    "Over and under|🧶|<b>Weaving</b> makes cloth or mats by passing strips over and under each other.",
    "Warp and weft|📏🧵|Long threads held tight are the <b>warp</b>. The thread that goes over and under is the <b>weft</b>.",
    "Paper weaving|📄|You can weave strips of paper over and under to make a checker pattern."
  ], [
    "In weaving, strips go...|over and under|only straight|only around",
    "Weaving can make...|cloth|clay|glass",
    "Long threads held tight in weaving are called the...|warp|kiln|easel|🧵",
    "The thread that goes over and under is the...|weft|brush|palette",
    "Paper weaving makes a ___ pattern.|checker|spiral|polka only|📄",
    "Which of these can be woven?|a basket|a rainbow|a shadow|🧺",
    "Yarn is used for...|weaving|printing sand|painting only|🧶",
    "Weaving is a kind of...|craft|math test|weather"
  ], "Picture strips going over, then under."));
  a.push(L("Neutral colors", [
    "Quiet colors|⚫⚪|<b>Neutral colors</b> are black, white, gray and brown (and soft tan colors).",
    "Why use them?|🎨|Neutrals go with almost every color. They let bright colors stand out.",
    "Make them|🖤🤍|Mix black and white to make gray. Add more white to get a light gray."
  ], [
    "Which is a neutral color?|gray|bright red,hot pink|🩶",
    "Which is a neutral color?|brown|orange,purple|🟤",
    "Black mixed with white makes...|gray|yellow,green|⚫",
    "Neutral colors help bright colors...|stand out|disappear,melt",
    "Which one is NOT a neutral color?|bright blue|black,white",
    "Which is a neutral color?|white|red,green|⚪",
    "Neutral colors go with...|almost every color|only blue,no colors",
    "A lot of white added to black makes a ___ gray.|light|dark,red"
  ], "Think of quiet colors that are not bright."));
  a.push(L("Rhythm and repeat", [
    "Repeating makes rhythm|🥁|When a shape, line or color repeats, it makes <b>rhythm</b> in art, like a beat in music.",
    "Kinds of repeats|🔷🔷🔷|Regular rhythm repeats the same way. Changing rhythm mixes sizes or spaces.",
    "Where to see it|🧱🌸|Brick walls, fences and flower borders repeat shapes."
  ], [
    "When shapes repeat in art, it makes...|rhythm|silence,erasing",
    "Rhythm in art is like the ___ in music.|beat|volume knob,words|🥁",
    "Which has rhythm?|a row of the same flowers|one single dot,a blank page|🌸",
    "A brick wall repeats the same...|shape|sky,cloud|🧱",
    "Repeating a shape again and again makes a...|pattern|hole,mistake",
    "A fence with posts spaced evenly shows...|regular rhythm|no rhythm,a mirror|",
    "To add rhythm you can...|repeat a color|use only one shape once,leave blank",
    "Which would NOT make rhythm?|drawing one thing only once|repeating a line,repeating a shape"
  ], "Think about things that repeat like a beat."));
  a.push(L("Balance", [
    "Even weight|⚖️|<b>Balance</b> means the two sides of a picture feel equal in weight, like a seesaw that is level.",
    "Two kinds|🦋|If both sides match, that is <b>symmetrical</b> balance. If they differ but still feel even, it is asymmetrical balance.",
    "Big and small|🐘🐭|One big shape can balance a few small shapes on the other side."
  ], [
    "When both sides of a picture feel equal, the picture has...|balance|noise,glue|⚖️",
    "A butterfly with matching wings shows ___ balance.|symmetrical|none,loud|🦋",
    "A picture with a huge elephant on one side and nothing on the other feels...|unbalanced|balanced,quiet|🐘",
    "One large shape can balance...|a few small shapes|nothing at all,a mirror",
    "A seesaw that is level is like a picture with...|balance|no color,a big mistake|⚖️",
    "Matching sides are...|symmetrical|crooked,sticky",
    "To balance a big tree on the left, you could add ___ on the right.|a house or other shapes|an empty page,nothing at all|🌳",
    "Balance makes a picture feel...|steady|about to fall,blurry"
  ], "Think of a seesaw or scales."));
  a.push(L("The main thing", [
    "Where do eyes go?|👀|The <b>focal point</b> is the first thing your eye sees in a picture.",
    "Make it stand out|🔴|Make it bigger, brighter, or different in color from the rest. A red apple among green leaves pops out.",
    "Tip|⭐|Artists plan one main thing so the picture is not confusing."
  ], [
    "The first thing you notice in a picture is the...|focal point|corner|frame|👀",
    "A bright red balloon in a gray picture is the...|focal point|background|border|🎈",
    "How can you make something stand out?|make it brighter|make it the same as everything else,hide it",
    "A big flower among tiny flowers will...|be noticed first|be hidden,be the same|🌸",
    "A picture with one main thing is easier to...|understand|erase,fold",
    "A yellow duck in a green pond stands out because of...|its different color|its shadow only,its frame|🦆",
    "Where do artists often put the focal point?|where they want you to look|off the paper,under the table",
    "If everything is the same size and color, the focal point is...|hard to see|very clear,glowing"
  ], "Which thing gets your attention first?"));
  a.push(L("Drawing people", [
    "Start with shapes|🧍|To draw a person, begin with simple shapes: an oval for the head, a bigger oval for the body, and lines for arms and legs.",
    "Faces|🙂|Eyes sit about halfway down the head. The nose is below the eyes, and the mouth is below the nose.",
    "Add details last|✏️|Add hair, clothes and a smile after you have the basic shapes."
  ], [
    "What shape can you use for a head to start?|an oval|a triangle,a star|🙂",
    "Where are the eyes on a face?|about halfway down|at the very top,at the chin",
    "The nose is ___ the eyes.|below|above,beside the ear|👃",
    "The mouth is ___ the nose.|below|above,on top of the head",
    "Lines can be used for the person's...|arms and legs|hair color,shadow only|🧍",
    "When do you add hair and clothes?|after the basic shapes|before anything,never",
    "Which shape is good for the body?|a bigger oval|a tiny dot,a spiral",
    "Drawing with simple shapes first helps you...|get the size right|erase the page,run out of paper"
  ], "Think about starting simple and adding details later."));
  a.push(L("Drawing and painting tools", [
    "Dry tools|🖍️✏️|<b>Crayons</b>, <b>colored pencils</b>, <b>chalk</b> and <b>markers</b> are drawing tools. They are dry or marker-style.",
    "Wet tools|🖌️💧|<b>Watercolor</b>, <b>tempera</b> and <b>acrylic</b> are paints. You use brushes and water.",
    "Choose well|💡|Thin brushes make small details. Wide, flat brushes cover big areas."
  ], [
    "Which is a wet paint?|watercolor|crayon,pencil|🎨",
    "A thin brush is best for...|small details|painting a wall,covering big areas|🖌️",
    "A wide flat brush is best for...|covering big areas|tiny eyelashes,thin lines",
    "Which is a drawing tool?|colored pencil|watercolor,tempera|✏️",
    "Chalk is used on a sidewalk or...|a chalkboard|a computer,a stove|🖍️",
    "What do you need to clean a brush used with watercolor?|water|sand,glue",
    "Which makes a bright, bold line with a waxy feel?|a crayon|a watercolor,a chalkboard|🖍️",
    "Paint that you mix with water is...|watercolor|a pencil,a marker cap"
  ], "Think about whether the tool is dry or needs water."));
  a.push(L("Caring for art tools", [
    "Tools last longer|🧽|When we take care of art tools, they last longer and work better.",
    "After painting|🖌️|Wash brushes with water and lay them flat or stand them with bristles up.",
    "Tidy up|🧹|Put lids on markers and glue. Put things back where they belong."
  ], [
    "After painting, you should wash your...|brushes|desk only,shoes|🖌️",
    "Markers need their ___ put back on.|lids|brushes,wheels|🖊️",
    "Brushes are best stored with bristles...|up|in the glue,in the dirt",
    "Why put lids on markers?|so they do not dry out|so they get dirty,to be heavier",
    "When you finish art, you should...|tidy up|leave a mess,hide supplies",
    "Where do art supplies go after you finish?|back where they belong|on the floor,in the trash|🧹",
    "Sharing art supplies is...|kind|rude,silly",
    "A dried-out marker happens when the lid is...|left off|put on,painted"
  ], "Think about keeping things neat and clean."));
  a.push(L("Art materials and uses", [
    "Match it up|🎨|Different materials do different jobs.",
    "Examples|🧶🪵|Yarn is for weaving. Wood can be carved. Paper is for drawing, folding and cutting.",
    "Choose with care|✔️|Pick the material that fits what you want to make."
  ], [
    "Which material is best for weaving?|yarn|sand|stone|🧶",
    "Which material can be carved into a statue?|wood|water|smoke|🪵",
    "Which material is used for paper folding?|paper|clay|metal|📄",
    "Which is best for a hanging mobile?|light paper shapes|heavy bricks|wet sand",
    "Which is best for a snow scene?|white paint or paper|black pencil only|red crayon only|❄️",
    "Which is used on a pottery wheel?|clay|paper|cloth",
    "Which material makes a rubbing of a coin?|a crayon on paper|wet paint|chalk on glass|🪙",
    "Which would you use to cut paper?|safe scissors|a spoon|a pencil|✂️"
  ], "Think about what the material is good at."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[7], a[11], a[14]]));
  a.push(MIX("Level 4 Challenge", [a[1], a[3], a[5], a[6], a[8], a[9], a[10], a[12], a[13], a[15], a[16], a[17]]));

  // ================= LEVEL 5 =================
  const b = [];
  b.push(L("The color wheel", [
    "Twelve colors|🎨|The color wheel has 12 colors. It starts with the 3 <b>primary</b> colors: red, yellow, blue.",
    "Secondary|🟠🟢🟣|Between them are 3 <b>secondary</b> colors: orange, green, purple.",
    "Tertiary|🔴🟠|The last 6 are <b>tertiary</b> colors, made by mixing a primary with the secondary beside it. Red-orange is one."
  ], [
    "How many colors are on the color wheel?|12|6,8|🎨",
    "Red, yellow and blue are called...|primary colors|secondary colors,warm colors only",
    "Orange, green and purple are called...|secondary colors|primary colors,tertiary colors",
    "Red-orange is a...|tertiary color|primary color,neutral",
    "A tertiary color is made by mixing a primary with...|a secondary beside it|black and white,a neutral",
    "How many primary colors are there?|3|2,6",
    "How many tertiary colors are there?|6|3,9",
    "Yellow-green is a...|tertiary color|primary color,secondary color"
  ], "Remember: 3 primary, 3 secondary and 6 tertiary."));
  b.push(L("Complementary colors", [
    "Opposites|🔴🟢|On the color wheel, colors across from each other are <b>complementary</b>.",
    "The pairs|🟠🔵🟡🟣|Red and green. Blue and orange. Yellow and purple.",
    "Why use them?|✨|Side by side, complementary colors look very bright and make each other pop."
  ], [
    "The complement of red is...|green|blue,yellow|🔴",
    "The complement of blue is...|orange|green,purple|🔵",
    "The complement of yellow is...|purple|orange,green|🟡",
    "The complement of green is...|red|blue,yellow|🟢",
    "The complement of orange is...|blue|red,green|🟠",
    "The complement of purple is...|yellow|red,blue|🟣",
    "Complementary colors are found...|across the wheel|next to each other,in the middle only",
    "Complementary colors side by side look...|bright and bold|dull and faded,exactly the same"
  ], "Look at the color across the wheel."));
  b.push(L("Analogous colors", [
    "Neighbors|🟡🟢🔵|<b>Analogous colors</b> sit next to each other on the color wheel.",
    "Smooth look|🌅|Together they blend smoothly. A sunset can use red, orange and yellow.",
    "Compare|↔️|Complementary colors are opposites. Analogous colors are neighbors."
  ], [
    "Colors next to each other on the wheel are...|analogous|complementary,neutral",
    "Which set is analogous?|yellow and orange and red|red and green and blue,black and white and gray|🌅",
    "Which set is analogous?|blue and blue-green and green|red and green,orange and blue",
    "Analogous colors look...|smooth together|opposite and clashing,black and white",
    "Complementary colors are...|opposites|neighbors,gray",
    "A forest picture with greens and yellow-greens uses ___ colors.|analogous|complementary,neutral|🌲",
    "Which pair are neighbors on the wheel?|blue and purple|red and green,yellow and purple",
    "Which pair are NOT neighbors?|red and green|red and orange,yellow and green"
  ], "Neighbors are right beside each other."));
  b.push(L("One color family", [
    "Monochromatic|🔵|<b>Monochromatic</b> means using just one color, plus its lighter and darker versions.",
    "Tints and shades|⚪⚫|Add white to make a lighter tint. Add black to make a darker shade.",
    "Example|🌊|A picture of the sea using light blue, blue and dark blue is monochromatic."
  ], [
    "Using one color with its light and dark versions is...|monochromatic|complementary,analogous",
    "Adding white to a color makes a...|tint|shade,neutral|⚪",
    "Adding black to a color makes a...|shade|tint,rainbow|⚫",
    "A picture using only light, medium and dark green is...|monochromatic|complementary,full rainbow|🌿",
    "Which is a tint of red?|pink|dark maroon,green",
    "Which is a shade of blue?|navy|sky pastel,orange",
    "A monochromatic picture uses how many main colors?|one|three,ten",
    "Which picture is monochromatic?|only blues|red and green,a full rainbow"
  ], "Mono means one."));
  b.push(L("Value", [
    "Light to dark|⚪🩶⚫|<b>Value</b> is how light or dark something is.",
    "Pencil shading|✏️|Press lightly for a light value. Press harder for a dark value.",
    "Value scale|📊|A value scale goes from white through grays to black."
  ], [
    "How light or dark a color is, is its...|value|texture,pattern",
    "To make a light value with pencil you...|press lightly|press hard,use a ruler|✏️",
    "To make a dark value you...|press harder|press lightly,erase",
    "A value scale goes from...|white to black|red to green,small to big",
    "Which has the lightest value?|white|gray,black",
    "Which has the darkest value?|black|gray,white",
    "Gray is ___ than white and ___ than black.|darker and lighter|lighter and darker,the same",
    "Value is about light and...|dark|loud,heavy"
  ], "Think light to dark."));
  b.push(L("Elements of art", [
    "Building blocks|🧱|Artists use seven building blocks called the <b>elements of art</b>.",
    "The seven|1️⃣..7️⃣|<b>Line, shape, form, color, value, texture and space</b>.",
    "Everywhere|🔍|Look at any picture and you can find these elements."
  ], [
    "How many elements of art are there?|7|3,12|7️⃣",
    "Which is an element of art?|line|candy,music",
    "Which is an element of art?|texture|weather,speed",
    "Which is an element of art?|color|time,sound",
    "Which is an element of art?|space|noise,hunger",
    "How light or dark something is, is its...|value|line,form",
    "The way something feels or looks like it feels is...|texture|value,space",
    "A 3D object, like a ball, has...|form|only line,no space"
  ], "Remember: line, shape, form, color, value, texture, space."));
  b.push(L("Positive and negative space", [
    "Two kinds of space|🔲|<b>Positive space</b> is the shape or object. <b>Negative space</b> is the empty area around it.",
    "Look closely|🏺|Between the handles of a vase is negative space.",
    "Flip it|🔄|Sometimes the empty space makes a shape too, like a white vase against a dark page."
  ], [
    "The object in a picture is the...|positive space|negative space,empty frame",
    "The empty area around an object is...|negative space|positive space,the object",
    "A hole in the middle of a donut is...|negative space|positive space,sugar|🍩",
    "The cat in a drawing of a cat is...|positive space|negative space,empty|🐱",
    "The sky around a kite is...|negative space|positive space,the kite|🪁",
    "The kite itself is...|positive space|negative space,the sky|🪁",
    "The space between a chair's legs is...|negative space|positive space,the chair|🪑",
    "Empty spaces can sometimes make...|shapes|bubbles only,heavy things"
  ], "Is it the thing or the space around it?"));
  b.push(L("Horizon line", [
    "Where land meets sky|🌅|The <b>horizon line</b> is where the land (or sea) seems to meet the sky.",
    "High or low|⬆️⬇️|A high horizon shows more ground. A low horizon shows more sky.",
    "Tip|🏞️|Things on the ground sit below the horizon. Clouds sit above."
  ], [
    "The place where land seems to meet sky is the...|horizon line|border|frame|🌅",
    "A low horizon shows more...|sky|ground,water only",
    "A high horizon shows more...|ground|sky,stars",
    "Clouds are drawn ___ the horizon.|above|below,under|☁️",
    "A field is drawn ___ the horizon.|below|above,over|🌾",
    "At sea, the horizon is where the water meets the...|sky|beach,boat|🌊",
    "A picture with a lot of sky has a ___ horizon.|low|high,hidden",
    "If you want to show a huge field, put the horizon...|high|low,at the top edge only"
  ], "Think about where the ground and sky meet."));
  b.push(L("Showing distance", [
    "Near and far|🛣️|Artists use three tricks to show distance: size, placement and detail.",
    "Size and place|🌲🌲|Things that are far away are smaller and sit higher on the page. Near things are bigger and lower.",
    "Detail and color|🏔️|Faraway things have less detail and paler colors."
  ], [
    "Faraway things are drawn...|smaller|bigger,upside down|🏔️",
    "Close things are drawn...|bigger|tiny,invisible",
    "Faraway things sit ___ on the page.|higher|lower,off the page",
    "Faraway mountains have ___ detail.|less|more,spiky",
    "Faraway colors are usually...|paler|brighter,neon",
    "Two trees: one is big and one is small. The small one seems...|farther away|closer,the same|🌲",
    "A road narrowing in the distance makes the picture look...|deep|flat,square|🛣️",
    "Overlapping is also a trick to show...|distance|taste,music"
  ], "Think about what looks far or near."));
  b.push(L("Form and 3D shapes", [
    "Flat vs solid|🔲🧊|A flat shape has length and width. A <b>form</b> also has depth, so it is 3D.",
    "Four forms|⚽📦🥫🍦|<b>Sphere</b> (ball), <b>cube</b> (box), <b>cylinder</b> (can) and <b>cone</b> (ice cream cone).",
    "Draw it|✏️|Add shading to a circle and it can look like a sphere!"
  ], [
    "A ball is a...|sphere|cube,cone|⚽",
    "A box shape is a...|cube|sphere,cylinder|📦",
    "A can of soup is a...|cylinder|cube,cone|🥫",
    "A party hat is a...|cone|sphere,cube|🎉",
    "A circle is flat. Its 3D form is a...|sphere|cube,cone",
    "A square is flat. Its 3D form is a...|cube|cone,sphere",
    "A 3D object has length, width and...|depth|color only,sound",
    "A form can be seen from...|many sides|only one side,no side"
  ], "Think of the real-life object."));
  b.push(L("Light and shadow", [
    "Light source|💡|The <b>light source</b> is where light comes from, like the sun or a lamp.",
    "Where shadows fall|🌞|Shadows fall on the side opposite the light. The side facing the light is bright.",
    "Shading|⚫|To shade a ball, make it lightest near the light and darkest on the far side."
  ], [
    "Where light comes from is the...|light source|shadow|frame|💡",
    "The side facing the light is...|brighter|darker,invisible",
    "A shadow falls on the side ___ the light.|opposite|toward,inside",
    "If the sun is on your right, your shadow falls to your...|left|right,front|🌞",
    "If the lamp is on the left of a ball, the shadow is on the...|right|left,top|💡",
    "When shading a ball, the darkest part is...|farthest from the light|nearest the light,everywhere",
    "Shadows make a drawing look more...|3D|flat,empty",
    "At noon the sun is high, so shadows are...|short|long,none at all|☀️"
  ], "Light and shadow are on opposite sides."));
  b.push(L("Cartoons and animation", [
    "Moving pictures|🎞️|An <b>animation</b> is a set of drawings shown quickly one after another, so they seem to move.",
    "Flipbook|📖|Draw a small change on each page of a notepad. Flip the pages fast and the picture moves!",
    "Cartoons|😀|Cartoon artists make simple, fun drawings with big expressions."
  ], [
    "Drawings shown quickly one after another make an...|animation|echo,sculpture|🎞️",
    "A flipbook works by flipping the pages...|fast|very slowly,backward only|📖",
    "Each page in a flipbook has a ___ change.|small|huge,no|📖",
    "A cartoon often has big...|expressions|walls,shadows only|😀",
    "An animator makes...|moving pictures|statues,pots|🎬",
    "To make a ball bounce in a flipbook, you draw it ___ on each page.|in a new spot|in the same spot,not at all|⚽",
    "Animation tricks your eyes into seeing...|movement|silence,color",
    "Cartoons usually use ___ drawings.|simple|photos only,3D models only"
  ], "Think of pictures changing a little bit each time."));
  b.push(L("Art from nature", [
    "Nature as art supplies|🍂🪨|Artists sometimes use leaves, sticks, stones and flowers to make art outdoors.",
    "Leave no trace|🌍|Use only what has already fallen. Do not pick living plants or hurt animals.",
    "Temporary art|🌬️|Nature art can blow away or melt. Take a photo to remember it."
  ], [
    "Nature art can be made from...|leaves and stones|plastic bags,wet cement|🍂",
    "Which should you use for nature art?|things already fallen|living flowers you pick,animals",
    "Nature art left outside may...|blow away|last forever,turn into metal|🌬️",
    "How can you keep a record of nature art?|take a photo|never see it again,glue it to a rock|📷",
    "A pattern made of pebbles is...|nature art|a computer game,a cartoon|🪨",
    "A leaf rubbing uses...|paper and a crayon|a hammer,a stove|🍃",
    "Why leave plants growing?|they are alive|they are loud,they are blue",
    "Nature art is a way to...|enjoy the outdoors|stay indoors only,avoid art"
  ], "Think about caring for nature while making art."));
  b.push(L("Art around the world", [
    "Many traditions|🌍|People everywhere make art. Each culture has its own special crafts.",
    "Some examples|🎎🪅|Origami is paper folding from Japan. Rangoli is colorful floor art from India. Piñatas are decorated party figures from Mexico.",
    "Respect|🤝|When we learn about art from other places, we look and ask questions with respect."
  ], [
    "Origami is the art of...|folding paper|carving ice,weaving baskets|📄",
    "Origami comes from...|Japan|Antarctica,the moon|🎎",
    "Rangoli is colorful art made on the...|floor|ceiling,sky|🏠",
    "Rangoli comes from...|India|Japan,Canada",
    "A piñata is a decorated figure used at...|parties|swimming pools,libraries|🪅",
    "Piñatas come from a tradition in...|Mexico|Japan,Australia",
    "When we learn about art from other cultures we should be...|respectful|rude,bored",
    "Different cultures have different...|art traditions|only one art tradition,no art"
  ], "Think of the country linked with the craft."));
  b.push(L("Radial symmetry", [
    "Around a center|🌸|<b>Radial symmetry</b> means the pattern spreads out from a center, like petals on a flower.",
    "Mandalas|🕉️|A mandala is a round design repeated around the middle.",
    "In nature|❄️🌼|Snowflakes, daisies and starfish show radial symmetry."
  ], [
    "A pattern that spreads out from a center has ___ symmetry.|radial|no|side only|🌸",
    "Which has radial symmetry?|a daisy|a person's face from the side,a stick|🌼",
    "Which has radial symmetry?|a snowflake|a boot,a pencil|❄️",
    "A round design repeated around the middle is a...|mandala|portrait,collage",
    "Petals around the middle of a flower show...|radial symmetry|no pattern,a straight line|🌸",
    "A starfish has arms spread around its...|center|ear,shoe|⭐",
    "Radial symmetry looks the same when...|you turn it around|you squash it,you cover it",
    "A pizza cut into equal slices has ___ symmetry.|radial|no|upside-down only|🍕"
  ], "Think about patterns around a center point."));
  b.push(L("Lettering", [
    "Letters as art|🔤|Artists decorate letters to make words look special. This is called <b>lettering</b>.",
    "Ideas|🌈|You can make letters bubbly, tall, thin, striped or filled with patterns.",
    "Keep it readable|👓|Fancy letters should still be easy to read."
  ], [
    "Decorating letters to make words special is...|lettering|printing|sculpting|🔤",
    "Bubble letters are...|round and puffy|sharp spikes only,invisible",
    "Fancy letters should still be...|easy to read|hidden,upside down",
    "You can fill letters with...|patterns|nothing only,water|🌈",
    "A poster's title is often drawn with...|big letters|tiny dots,no letters",
    "Which makes a title stand out?|big colorful letters|small pale letters,hidden letters",
    "Tall thin letters feel...|elegant|squashed,round",
    "Lettering is mostly about...|looking good and readable|hiding words,not using letters"
  ], "Think about making words pretty but readable."));
  b.push(L("Sketchbooks", [
    "A place to practice|📓|A <b>sketchbook</b> is a notebook where artists draw ideas and practice.",
    "Mistakes are fine|✏️|A sketch does not need to be perfect. Artists try again and learn.",
    "Draw often|📅|Drawing a little every day helps you get better."
  ], [
    "A notebook for drawing ideas is a...|sketchbook|cookbook|coloring wall|📓",
    "A sketch needs to be...|just an idea|perfect|finished and framed",
    "Mistakes in a sketchbook are...|part of learning|a disaster,against the rules",
    "Drawing a little every day helps you...|get better|forget|tire out the paper|📅",
    "What do artists do with sketches?|try out ideas|throw away the pencil,close the book forever",
    "A quick light drawing is a...|sketch|statue,kiln",
    "What do you do if you do not like a sketch?|try again|give up on art,tear the page and scream",
    "Where could you keep your sketches?|in a sketchbook|in the rain,in a mud puddle"
  ], "Think about practicing and trying again."));
  b.push(L("Seasons in art", [
    "Colors of the year|🍂|Artists pick colors to show the four seasons.",
    "Warm and cool|🌸❄️|Spring uses fresh greens and pinks. Summer uses bright yellows and blues. Autumn uses oranges, reds and browns. Winter uses whites, grays and cool blues.",
    "Try it|🖌️|Choose a season and use only the colors that fit it."
  ], [
    "Which colors fit autumn leaves?|orange and red|icy white only,neon blue|🍂",
    "Which colors fit a snowy winter?|white and cool blue|bright orange,hot pink|❄️",
    "Which colors fit a spring garden?|fresh green and pink|dark gray,black|🌸",
    "Which colors fit a sunny summer beach?|bright yellow and blue|only gray,only brown|🏖️",
    "Which season often uses brown, orange and red?|autumn|spring,winter",
    "Which season often uses white and gray?|winter|summer,spring",
    "A picture with new green buds shows...|spring|autumn,winter|🌱",
    "A picture with a bright hot sun shows...|summer|winter,autumn|☀️"
  ], "Think about the colors outside in that season."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[5], b[8], b[11]]));
  b.push(MIX("Level 5 Challenge", [b[2], b[4], b[6], b[7], b[9], b[10], b[12], b[13], b[14], b[15], b[16], b[17]]));

  // ================= LEVEL 6 =================
  const c = [];
  c.push(L("Famous paintings", [
    "Art that is loved|🖼️|Some paintings are known all over the world. People travel to museums to see them.",
    "Three examples|🎨|<b>Mona Lisa</b> was painted by Leonardo da Vinci. <b>The Starry Night</b> was painted by Vincent van Gogh. <b>Water Lilies</b> was painted by Claude Monet.",
    "More|🌊|<b>The Great Wave</b> is a famous print by the Japanese artist Hokusai."
  ], [
    "Who painted the Mona Lisa?|Leonardo da Vinci|Vincent van Gogh,Claude Monet|🖼️",
    "Who painted The Starry Night?|Vincent van Gogh|Leonardo da Vinci,Claude Monet|🌌",
    "Who painted Water Lilies?|Claude Monet|Vincent van Gogh,Leonardo da Vinci|🪷",
    "The Great Wave is a famous print by...|Hokusai|Monet,Picasso|🌊",
    "The Starry Night shows a swirly...|night sky|kitchen,desert at noon|🌌",
    "Water Lilies shows flowers on a...|pond|mountain top,city street|🪷",
    "The Great Wave shows a huge...|ocean wave|forest,snowman|🌊",
    "The Mona Lisa is a painting of a...|woman|fruit bowl,windmill only"
  ], "Think of the artist's name that goes with the painting."));
  c.push(L("Realistic or abstract?", [
    "Realistic|🌳|<b>Realistic</b> art looks like real life, with accurate colors and shapes.",
    "Abstract|🔷🌀|<b>Abstract</b> art uses shapes, lines and colors to show ideas or feelings, not exact things.",
    "Both are art|✨|Neither one is better. Artists choose the style that fits their idea."
  ], [
    "Art that looks like real life is...|realistic|abstract|invisible|🌳",
    "Art using shapes and colors instead of exact things is...|abstract|realistic|photographic|🔷",
    "A painting that looks like a photo of a dog is...|realistic|abstract|a sculpture|🐕",
    "A picture of swirls and colored blobs showing joy is...|abstract|realistic|a map|🌀",
    "Abstract art can show...|feelings|only photos,only maps",
    "Realistic art uses ___ colors.|true-to-life|only random,no",
    "Which is true?|both are art|only realistic is art,only abstract is art",
    "A very detailed drawing of a real apple is...|realistic|abstract|just lines|🍎"
  ], "Does it look like real life, or like ideas and feelings?"));
  c.push(L("Impressionism", [
    "Dabs of paint|🌅|<b>Impressionist</b> painters used short dabs of paint to show the feeling of light and color.",
    "Outdoors|🌷|They liked painting outside in daylight: gardens, rivers and skies.",
    "Famous|🪷|Claude Monet was a leading impressionist painter."
  ], [
    "Impressionist painters used short...|dabs of paint|pencil lines only,clay coils|🎨",
    "Impressionists loved to paint...|light and color|only robots,maps",
    "Where did many impressionists paint?|outdoors|only in a cave,in a kitchen only|🌷",
    "Which painter was an impressionist?|Claude Monet|Leonardo da Vinci,Hokusai|🪷",
    "Impressionist paintings can look a bit...|soft and sparkly|like a photo,like a sculpture",
    "Up close, an impressionist painting looks like...|many small dabs|a smooth photo,a map",
    "A Monet painting of a pond is likely to show...|water lilies|tall robots,a skyscraper|🪷",
    "Impressionists wanted to catch the ___ of a moment.|feeling|noise,smell"
  ], "Think of small brush dabs and sunlit scenes."));
  c.push(L("Cubism and Picasso", [
    "Shapes from many sides|🧩|<b>Cubism</b> shows a person or object from several viewpoints at once, using shapes like cubes and triangles.",
    "Pablo Picasso|🎨|Pablo Picasso, a Spanish artist, helped start cubism.",
    "Funny faces|😮|In a cubist portrait, a face might show the front and side together."
  ], [
    "Which artist helped start cubism?|Pablo Picasso|Claude Monet,Hokusai|🎨",
    "Cubism uses shapes like...|cubes and triangles|only circles,only stars|🧩",
    "Cubism shows an object from...|several views at once|one view only,no view|🔄",
    "In a cubist portrait, a face might show...|front and side together|only the back,no shapes",
    "Pablo Picasso was from...|Spain|Japan,Egypt|🇪🇸",
    "A cubist painting might look like...|a puzzle of shapes|a photo,a smooth gradient|🧩",
    "Cubism is a type of ___ art.|abstract-style|photo-realistic,music",
    "The word cubism comes from the shape...|cube|cone,star|🧊"
  ], "Think about many viewpoints in one picture."));
  c.push(L("Visual texture", [
    "Real and pretend|🧱|<b>Real texture</b> can be felt with your fingers. <b>Visual texture</b> is a drawing that looks rough or smooth but is flat.",
    "How to show it|✏️|Short, tiny marks can look like fur. Cross-hatched lines can look like rough bark.",
    "Rubbing|🍃|Place paper on a leaf and rub with a crayon to copy its real texture."
  ], [
    "Texture you can feel with your fingers is...|real texture|visual texture,color wheel",
    "A flat drawing that looks rough is...|visual texture|real texture,a statue",
    "Tiny short marks can look like...|fur|water,clouds|🐻",
    "A crayon rubbing copies a leaf's...|texture|color,smell|🍃",
    "Cross-hatched lines can show...|rough bark|smooth glass,clear sky|🌳",
    "Soft smooth shading can show...|smooth skin|a pile of rocks,fur only",
    "A bumpy surface is...|rough|smooth,slippery",
    "A mirror feels...|smooth|rough,prickly|🪞"
  ], "Think how the surface would feel."));
  c.push(L("Mood in art", [
    "Show a feeling|😢😄|Artists use color, line and light to make a mood.",
    "Dark and cold|🌑|Dark blues and grays can feel sad, quiet or lonely.",
    "Bright and warm|🌞|Bright yellows and oranges can feel happy and full of energy."
  ], [
    "Dark blues and grays can feel...|quiet or sad|sunny and silly,hot|🌑",
    "Bright yellows and oranges can feel...|happy|gloomy,frozen|🌞",
    "A stormy sky with dark clouds suggests a ___ mood.|tense|silly,sleepy beach|⛈️",
    "A sunny meadow suggests a ___ mood.|happy|scary,sad|🌼",
    "Which colors might show a calm lake?|soft blues|neon red,black spikes|🏞️",
    "Which lines show excitement?|jagged lines|slow gentle lines,flat lines",
    "Artists make a mood with color and...|line|bath water,batteries",
    "A picture with soft lights and gentle colors feels...|peaceful|angry,thundering"
  ], "Think about what feeling the colors give you."));
  c.push(L("Composition", [
    "Arranging a picture|🖼️|<b>Composition</b> is how things are arranged in a picture.",
    "Rule of thirds|⬜|Imagine the page cut into 3 columns and 3 rows. Put the main thing near where the lines cross, not always in the middle.",
    "Framing|🪟|You can frame a subject with branches, a doorway or a window."
  ], [
    "How things are arranged in a picture is its...|composition|palette|frame size|🖼️",
    "In the rule of thirds the page is split into...|9 parts|2 parts,4 parts",
    "In the rule of thirds the main thing goes...|near where the lines cross|always in the exact center,off the paper",
    "Framing a subject with branches is a way of...|framing|erasing,melting|🌿",
    "A doorway around a view is a type of...|frame|brush,color",
    "Putting the main subject slightly off-center is often more...|interesting|boring,invisible",
    "Composition helps guide your...|eyes|nose,hands",
    "Cropping means...|cutting a picture smaller|painting it bigger,erasing all|✂️"
  ], "Think about arranging things on the page."));
  c.push(L("Light and shadow in drawing", [
    "Contrast of light|🔦|Strong light makes bright spots and dark shadows. This gives drawings a dramatic look.",
    "Cast shadows|🌳|A <b>cast shadow</b> is the dark shape an object throws on the ground.",
    "Highlight|✨|The <b>highlight</b> is the brightest spot where light hits directly."
  ], [
    "The dark shape an object throws on the ground is a...|cast shadow|highlight|reflection|🌳",
    "The brightest spot on a shiny ball is the...|highlight|cast shadow|core",
    "Strong light makes ___ shadows.|dark|invisible|no|🔦",
    "A highlight is where light is...|strongest|weakest,missing|✨",
    "To draw a highlight on an apple, leave a ___ spot.|light|dark black,green only|🍎",
    "A cast shadow falls...|away from the light|toward the light,into the sky",
    "Shadows and highlights make drawings look more...|real and 3D|flat,blank",
    "Which part of a ball is darkest?|the side away from light|the side toward light,the top highlight|⚽"
  ], "Light spots and dark spots work together."));
  c.push(L("Sculpture types", [
    "Ways to make sculptures|🗿|Sculptors <b>carve</b> by cutting away material, <b>model</b> by adding and shaping, and <b>assemble</b> by joining pieces.",
    "Freestanding or relief|🪙|A <b>freestanding</b> sculpture stands on its own. A <b>relief</b> sticks out from a flat background, like a coin.",
    "Materials|🪨🪵|Stone, wood, clay, metal and even recycled things can be used."
  ], [
    "Cutting away material to make a shape is...|carving|modeling|assembling|🗿",
    "Adding clay and shaping it is...|modeling|carving|erasing",
    "Joining separate pieces is...|assembling|carving|weaving",
    "A sculpture that stands on its own is...|freestanding|relief|flat",
    "A coin design that sticks out from a flat surface is a...|relief|statue|collage|🪙",
    "Which is carved?|a wooden animal cut with tools|a paper hat,a puddle|🪵",
    "Which is a sculpture material?|stone|spaghetti sauce,wind|🪨",
    "A sculpture made from joined recycled parts is...|assembled|carved from stone,painted on glass|♻️"
  ], "Think about how the sculpture is made."));
  c.push(L("Buildings as art", [
    "Architecture|🏛️|<b>Architecture</b> is the art and design of buildings.",
    "Parts|🕌|Buildings use parts like <b>columns</b> (tall posts), <b>arches</b> (curved tops) and <b>domes</b> (round roofs).",
    "Form and use|🏠|A good building is useful and also looks good."
  ], [
    "The art and design of buildings is...|architecture|printmaking|animation|🏛️",
    "A person who designs buildings is an...|architect|animator|potter",
    "A tall post that holds up a building is a...|column|dome|palette|🏛️",
    "A curved top over a doorway is an...|arch|easel|cone",
    "A round roof shaped like half a ball is a...|dome|column|triangle|🕌",
    "A good building is useful and also...|looks good|invisible|made of sugar",
    "A tower is usually...|tall|flat,squishy|🗼",
    "Which uses an arch?|a bridge|a pencil,a spoon|🌉"
  ], "Think about the shape of the building part."));
  c.push(L("Photography", [
    "Painting with light|📷|A photographer makes pictures with a camera. The word <b>photograph</b> means writing with light.",
    "Choose your view|🔍|Photographers choose what to put in the frame, how close to stand and where the light is.",
    "Close-up and wide|🌸🏞️|A <b>close-up</b> shows a small thing big. A <b>wide shot</b> shows a large scene."
  ], [
    "A person who takes photos is a...|photographer|potter|sculptor|📷",
    "A photo that shows a small thing big is a...|close-up|wide shot|blur",
    "A photo of a whole valley is likely a...|wide shot|close-up|portrait only|🏞️",
    "Photography uses...|light|clay|yarn",
    "A photo of a person is a...|portrait|landscape|still life|🧑",
    "To show a tiny insect big, take a...|close-up|wide shot|far-away shot|🐞",
    "Photographers think about the ___ when taking a picture.|light|rainbow only,price tag",
    "The best way to ask before photographing someone is to...|ask permission|do it secretly,hide|🙂"
  ], "Think about how far or close the camera is."));
  c.push(L("Digital art", [
    "Art on a screen|💻|<b>Digital art</b> is made on a computer or tablet using a stylus, mouse or finger.",
    "Handy tricks|↩️|You can <b>undo</b> mistakes, use <b>layers</b> like clear sheets stacked up, and zoom in for tiny details.",
    "Pixels|🔲|Screens are made of tiny squares of color called <b>pixels</b>."
  ], [
    "Art made on a computer or tablet is...|digital art|a sculpture|a print|💻",
    "Tiny squares of color on a screen are...|pixels|brushes|pencils|🔲",
    "Undo lets you...|take back a mistake|erase the screen forever,print",
    "Layers are like...|clear sheets stacked up|a single page glued down,a brick wall",
    "A stylus is a...|pen for a tablet|type of paper,paint can|🖊️",
    "Why zoom in on a digital drawing?|to work on tiny details|to make it taller,to fold it",
    "Many pixels together make a...|picture|rock,paper bag",
    "Digital art can be saved as a...|file|jar,sandwich"
  ], "Think about drawing on a screen."));
  c.push(L("Illustration and stories", [
    "Pictures that tell|📚|An <b>illustrator</b> makes pictures for books, magazines and cards.",
    "Tell a story|🐻|Illustrations show characters, settings and feelings, so readers see the story.",
    "Character design|🧸|A good character has a special shape, color and face you remember."
  ], [
    "A person who draws pictures for books is an...|illustrator|architect|photographer|📚",
    "Illustrations help readers see the...|story|price|weather map",
    "A picture book's art shows the characters and...|setting|bus timetable,chemistry|🌳",
    "A memorable character often has a special...|shape and color|number,sound only|🧸",
    "Where might you see illustrations?|in storybooks|only on the moon,inside rocks|📖",
    "A picture that shows a character is sad uses their...|face and body|shoe size,age only|😢",
    "Illustrations can also show the ___ of the story.|mood|word count,page weight",
    "A book cover illustration should make you want to...|read the book|throw it,sleep"
  ], "Think about pictures that go with words."));
  c.push(L("Poster design", [
    "A poster speaks fast|📢|A <b>poster</b> must be read quickly, so it needs big words and a clear picture.",
    "Good parts|🎯|A strong title, one main picture, and only the most important information.",
    "Be careful with space|📐|Leave empty space around words so it is not crowded."
  ], [
    "A poster must be read...|quickly|slowly over an hour,in secret|📢",
    "A poster title should be...|big and clear|tiny and faint,hidden",
    "A poster should have ___ main picture.|one|ten,zero|🖼️",
    "Too many words on a poster make it...|crowded|clearer,quieter",
    "Empty space around words helps them...|stand out|vanish,spin",
    "Which colors are easiest to read on a dark background?|light colors|dark colors,the same dark color",
    "Poster text colors should have strong...|contrast|rhyme,smell",
    "A poster for a school play should include the...|date and place|pet's name,weather forecast for Mars|🎭"
  ], "Think about what people can read at a glance."));
  c.push(L("Pottery steps", [
    "From clay to pot|🏺|Pots can be made by pinching, coiling or using a flat slab, or by throwing clay on a wheel.",
    "Drying and firing|🔥|The pot dries until it is bone-dry, then it is fired in a kiln. Glaze adds color and a shiny coat.",
    "Careful|🧤|Clay is fragile before firing, so handle it gently."
  ], [
    "Making a pot by rolling long snakes of clay is...|coiling|carving|weaving|🏺",
    "Making a pot by squeezing a ball of clay is...|pinching|printing|stamping",
    "A pot is baked in a...|kiln|fridge|cupboard|🔥",
    "Glaze gives a pot color and a ___ coat.|shiny|woolly|paper",
    "Before firing, clay should be...|dry|dripping,frozen",
    "Clay is fragile before firing, so you...|handle it gently|toss it,sit on it",
    "A spinning tool for shaping clay is a potter's...|wheel|ladder,spoon|🛞",
    "After the kiln, the pot is...|hard and strong|soft again,paper"
  ], "Think about the order of making a pot."));
  c.push(L("Art words", [
    "Tools of the trade|🎨|Artists use special words. A <b>medium</b> is what an artist uses to make art, like paint or clay.",
    "Places and tools|🖼️|A <b>canvas</b> is cloth to paint on. A <b>palette</b> holds and mixes paint. An <b>easel</b> holds a canvas up. A <b>studio</b> is an artist's workspace.",
    "Art spaces|🏛️|A <b>gallery</b> or <b>museum</b> shows art for people to see."
  ], [
    "What an artist makes art with, like paint or clay, is the...|medium|palette|studio|🎨",
    "A board for mixing paint is a...|palette|canvas|kiln|🎨",
    "Cloth stretched for painting is a...|canvas|palette|gallery|🖼️",
    "Something that holds a canvas upright is an...|easel|oven|anvil",
    "An artist's workspace is a...|studio|bakery|stadium",
    "Where art is shown for people to visit is a...|gallery|garage|field|🏛️",
    "Paint and clay are each a...|medium|studio|frame",
    "A frame goes around a...|picture|spoon|rock only|🖼️"
  ], "Match the word to its job."));
  c.push(L("Talking about art", [
    "Look closely|🔍|To talk about art, first <b>describe</b>: what do you see? Then <b>analyze</b>: how are colors, lines and shapes used?",
    "Think and feel|💭|Then <b>interpret</b>: what is the artist saying? How does it make you feel?",
    "Be kind|🤝|Everyone sees art differently. Share your ideas politely and listen to others."
  ], [
    "The first step in talking about art is to...|describe what you see|decide it is bad,leave|🔍",
    "To analyze art, you look at how ___ are used.|colors and lines|prices,names only",
    "To interpret art, you ask what the artist is...|saying|eating,paying",
    "A kind thing to say about a classmate's art is...|I like the colors you used|That is ugly,Mine is the best",
    "If someone sees art differently from you, you should...|listen politely|laugh,argue loudly|🤝",
    "Which is a description?|I see a blue house and a tall tree|It is bad|It cost too much",
    "Which sentence analyzes?|The curvy lines feel calm|I want a sandwich|The frame is square and wood",
    "Art can make you feel...|many different things|nothing ever,only one thing for everyone"
  ], "Look, think, then share kindly."));
  c.push(L("Museums and galleries", [
    "Places for art|🏛️|A <b>museum</b> keeps and shows art and other special things. A <b>gallery</b> shows art, and some art in galleries is for sale.",
    "People who help|🧑‍🎨|A <b>curator</b> chooses and cares for the art. An <b>artist</b> makes it.",
    "Visiting|👀|Look with your eyes, stay behind the line and ask before taking photos."
  ], [
    "A person who chooses and looks after art in a museum is a...|curator|baker|pilot|🏛️",
    "A person who makes art is an...|artist|usher|curator only",
    "Where can you see art on display?|a museum|a swimming pool,a car engine|🏛️",
    "In a museum we look with our...|eyes|hands|feet|👀",
    "If a rope or line is in front of art, you should...|stay behind it|step over it,lean on the art",
    "Before taking a photo in a museum you should...|check the rules|run away,shout",
    "A gallery may show art that is...|for sale|made of ice cream,invisible",
    "In museums we use ___ voices.|quiet|loud|singing|🤫"
  ], "Think about caring for art and sharing it."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[4], c[6], c[9], c[12], c[14]]));
  c.push(MIX("Level 6 Challenge", [c[2], c[3], c[5], c[7], c[8], c[10], c[11], c[13], c[15], c[16], c[17]]));

  Object.assign(ART_LEVELS, { 4: a, 5: b, 6: c });
})();
