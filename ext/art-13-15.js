// ext/art-13-15.js  Art & Drawing levels 13-15
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

  // ================= LEVEL 13 =================
  const a = [];
  a.push(L("Cross-contour lines", [
    "Lines that wrap|🍐|<b>Cross-contour lines</b> are curved lines that run across a form, like rings around a pear. They show how the surface bends.",
    "Round or flat|🎾|On a round object the lines curve. On a flat surface they stay straight. The curve tells the eye which way the form turns.",
    "Close together|〰️|Draw the lines closer together where the form turns away from you. They help you feel the 3D shape."
  ], [
    "Curved lines that run across a form to show its shape are...|cross-contour lines|horizon lines|border lines|🍐",
    "Cross-contour lines on a ball look like...|curved bands around it|straight rulers|random zigzags|⚽",
    "Cross-contour lines help show that an object is...|3D|far away|made of metal",
    "On a flat box side, cross-contour lines are...|straight|round like a ball|missing and curly",
    "Where a form turns away from you, the lines are drawn...|closer together|farther apart|as dots",
    "Imagine thin hoops around a bottle. Those hoops are like...|cross-contour lines|a signature|a frame|🍼",
    "Which drawing tool idea shows the bend of a cylinder?|curved lines across it|a flat color fill|a thick outline only",
    "Cross-contour lines are different from outlines because they go...|across the inside of a form|only around the edge|off the page"
  ], "Think of lines wrapping around a shape like a ribbon."));
  a.push(L("Drawing reflections", [
    "Mirror image|🏞️|On still water, a reflection is a flipped copy of what is above it. A tree standing up is reflected hanging down.",
    "Ripples|🌊|Wind and ripples make a reflection wobbly and broken. Calm water gives a clear mirror image.",
    "Same distance|📏|The reflection is as far below the water line as the object is above it, so it is about the same size."
  ], [
    "A reflection in still water is a ___ copy.|flipped|sideways|much smaller|🏞️",
    "A tree on the shore is reflected in the water...|upside down|rightside up|sideways",
    "Calm water makes a reflection that is...|clear|wobbly and broken|invisible",
    "Ripples make a reflection look...|wobbly and broken|perfectly sharp|brighter than the tree|🌊",
    "A reflection of a boat is about the ___ size as the boat.|same|tiny|giant",
    "The reflection of a mountain is found...|below it in the water|above it in the sky|beside it in the grass|🏔️",
    "To draw a reflection, you start from the...|water line|top of the page|signature",
    "Which weather gives the clearest reflection in a lake?|no wind|a strong breeze|a heavy rain|🌤️"
  ], "Imagine folding the picture along the water line."));
  a.push(L("Frottage and rubbings", [
    "Rubbing textures|🪙|<b>Frottage</b> comes from a French word that means rubbing. You put paper on a rough surface and rub with a crayon or pencil.",
    "Hidden patterns|🍃|Leaves, coins, tree bark and bricks leave a pattern on the paper. The surface texture shows through.",
    "Make art|🖍️|Artists cut and mix rubbings to make new pictures. Max Ernst, a German artist, made frottage popular in the 1920s."
  ], [
    "Making a texture picture by rubbing over a surface is called...|frottage|stippling|fresco|🖍️",
    "The word frottage comes from the French word for...|rubbing|painting|cutting",
    "For a rubbing, you place the paper...|on top of a textured surface|inside a frame|under a cold tap",
    "Which tool works well for a rubbing?|the side of a crayon|a wet sponge|a hammer|🖍️",
    "Which would make a good rubbing?|a leaf with veins|a smooth mirror|a flat sheet of glass|🍃",
    "Which artist helped make frottage famous?|Max Ernst|Leonardo|Johannes Vermeer",
    "Frottage shows a surface's...|texture|temperature|price",
    "A rubbing of tree bark would show...|rough lines and ridges|a smooth shine|bright colors only|🌳"
  ], "Think of what you do with a coin and a pencil."));
  a.push(L("Gouache and tempera", [
    "Gouache|🎨|<b>Gouache</b> (say it gwash) is water-based paint that is <b>opaque</b>, so it covers what is under it. You can paint light colors over dark ones.",
    "Egg tempera|🥚|<b>Egg tempera</b> mixes colored powder with egg yolk. Artists used it for hundreds of years before oil paint took over.",
    "Compare|🔍|Watercolor is see-through. Gouache is flat and matte. School paint called tempera is a cheap, bright, water-based paint."
  ], [
    "Water-based paint that is opaque is called...|gouache|watercolor|charcoal|🎨",
    "Egg tempera is made with colored powder and...|egg yolk|milk|honey|🥚",
    "Gouache can paint light colors over dark because it is...|opaque|see-through|oily",
    "Watercolor is usually...|transparent|opaque|made of egg",
    "Gouache dries to a ___ finish.|flat and matte|very glossy|sticky",
    "Which paint did artists use before oil paint became popular?|egg tempera|spray paint|acrylic",
    "The word gouache is pronounced...|gwash|goo-ache|go-ash",
    "What do you clean gouache brushes with?|water|oil thinner|sand"
  ], "Think about whether you can see through the paint."));
  a.push(L("Charcoal drawing", [
    "Burnt sticks|🖤|<b>Charcoal</b> is made from burnt wood, often willow or vine. It makes deep, soft blacks and smudges easily.",
    "Smudge and lift|🧽|You can smudge it with a finger or tissue to make soft shadows. A <b>kneaded eraser</b> lifts the charcoal off to make highlights.",
    "Keep it safe|💨|Charcoal drawings smear, so artists spray them with <b>fixative</b>. Work on paper with a little tooth, or texture, so it grips."
  ], [
    "Charcoal is made from burnt...|wood|rubber|glass|🖤",
    "Which eraser lifts charcoal to make highlights?|kneaded eraser|pencil-top eraser|none can|🧽",
    "A spray that keeps a charcoal drawing from smearing is...|fixative|primer|glaze",
    "Charcoal is famous for deep, soft...|blacks|yellows|metallics",
    "To make soft shadows with charcoal, you can...|smudge it|dip it in water|freeze it",
    "Charcoal drawings smear easily, so you should...|spray fixative on them|rub them hard|leave them in the sun",
    "Which paper grips charcoal best?|paper with some tooth|very shiny paper|plastic wrap",
    "Charcoal sticks often come from which plant?|willow|cactus|rose|🌿"
  ], "Think about what charcoal is made from."));
  a.push(L("Pastels", [
    "Pigment sticks|🖍️|<b>Pastels</b> are sticks of pure pigment. <b>Soft pastels</b> are chalky and blend well. <b>Oil pastels</b> are creamy and do not turn to dust.",
    "Blending|👆|You can blend soft pastels with a finger or a paper stump. Layer one color over another to mix them right on the paper.",
    "Paper matters|📄|Pastel needs paper with tooth, a slightly rough surface that grabs the dust. Smooth paper will not hold it."
  ], [
    "Which pastel is creamy and made with oil and wax?|oil pastel|soft pastel|charcoal pastel|🖍️",
    "Which pastel is chalky and blends into soft colors?|soft pastel|oil pastel|pen",
    "Pastel works best on paper with...|tooth|a shiny coating|water drops",
    "Artists blend soft pastel with a...|finger or paper stump|hammer|garden hose",
    "Pastels are sticks of...|pure pigment|liquid paint|clay only",
    "Layering one pastel color over another is a way to...|mix colors on the paper|clean the paper|print the page",
    "A paper stump is a tool for...|blending|erasing the whole page|cutting",
    "Which pastel would you wipe away more easily as dust?|soft pastel|oil pastel|paint marker"
  ], "Think about how chalky or creamy each kind is."));
  a.push(L("Byzantine art", [
    "A golden empire|⛪|The <b>Byzantine Empire</b> had its capital at Constantinople, now called Istanbul. Its art mixed Roman and Greek styles with a strong faith.",
    "Mosaics and icons|✨|Artists covered church walls with <b>mosaics</b> that had shiny gold backgrounds. <b>Icons</b> were flat, serious painted images of holy people with gold halos.",
    "Hagia Sophia|🕌|The huge church of <b>Hagia Sophia</b> in Constantinople was finished in the year 537. Its great dome seems to float on a ring of windows."
  ], [
    "The capital of the Byzantine Empire was...|Constantinople|Athens|Paris|⛪",
    "Constantinople is now called...|Istanbul|Rome|Cairo",
    "Byzantine artists covered church walls with shiny...|mosaics|neon lights|photographs|✨",
    "A flat painted image of a holy person with a gold halo is an...|icon|etching|emoji",
    "A famous Byzantine church with a great dome is...|Hagia Sophia|Machu Picchu|the Taj Mahal",
    "Byzantine mosaics often had a background of...|gold|bright pink|plain gray",
    "Byzantine icons look...|flat and serious|very 3D and funny|messy and sketchy",
    "Hagia Sophia was finished in the year...|537|1537|1937|🕌"
  ], "Picture shining gold squares on a church wall."));
  a.push(L("Stained glass", [
    "Colored light|🪟|<b>Stained glass</b> is made from pieces of colored glass joined with strips of lead. Light shines through and glows like jewels.",
    "Rose windows|🌹|Gothic cathedrals have giant round <b>rose windows</b> filled with stained glass. They often show stories in pictures.",
    "How it is made|🔥|Glass gets its color when metal oxides are melted into it. The pieces are cut, fitted and held by the lead strips."
  ], [
    "Pieces of colored glass joined by lead strips make...|stained glass|a mosaic wall|a fresco|🪟",
    "Stained glass looks best when ___ shines through it.|light|water|snow",
    "The strips that hold the glass pieces are made of...|lead|paper|wool",
    "A large round stained glass window is a...|rose window|porthole|mirror|🌹",
    "Stained glass is often found in...|cathedrals|garages|space ships",
    "Glass gets its color from melted-in...|metal oxides|crayon wax|sugar",
    "Stained glass windows often tell...|stories in pictures|the weather|math tests",
    "Compared with a painting, stained glass glows because of...|light passing through|thick paint|a hidden lamp inside"
  ], "Think about what must shine through for it to glow."));
  a.push(L("Henri Rousseau", [
    "Self-taught|🐅|<b>Henri Rousseau</b> was a French artist who worked as a toll collector. He taught himself to paint and was nicknamed <b>Le Douanier</b>, the customs officer.",
    "Dream jungles|🌴|He painted lush jungles with huge leaves, flowers and animals. He never visited a jungle. He studied plants in a Paris garden and glasshouse.",
    "Flat and bold|🌿|His style looks flat and dreamlike, with many shades of green. Later artists, like Picasso, admired him."
  ], [
    "Henri Rousseau came from which country?|France|Japan|Mexico|🐅",
    "Rousseau's day job before painting was as a...|toll collector|baker|teacher",
    "Rousseau is best known for painting...|dreamlike jungles|spaceships|city streets|🌴",
    "Rousseau learned to paint mostly by...|teaching himself|attending a long art school|copying cartoons",
    "To study plants for his jungles, Rousseau visited a...|Paris garden|desert|ice cave",
    "Rousseau used many shades of which color in his jungles?|green|gray|purple",
    "His nickname Le Douanier means the...|customs officer|green painter|jungle king",
    "Rousseau's style is described as...|flat and dreamlike|messy and blurry|black and white only"
  ], "Think of a self-taught painter of dream jungles."));
  a.push(L("Alma Thomas", [
    "A teacher first|🍎|<b>Alma Thomas</b> (1891-1978) was an American artist who taught art in a Washington, D.C. school for 35 years. She became a full-time painter after she retired.",
    "Dabs of color|🎨|She painted abstract pictures made from short strokes of bright color, like a mosaic. Many were inspired by flowers and trees in her garden.",
    "Joy in color|🌸|Her work shows how nature can inspire art without drawing exactly what you see. She kept painting into her 80s."
  ], [
    "Before painting full time, Alma Thomas worked as an art...|teacher|pilot|doctor|🍎",
    "Alma Thomas painted using short strokes that look like a...|mosaic|photograph|cartoon strip|🎨",
    "Alma Thomas was inspired by...|flowers and trees|machines|cars",
    "Her paintings are mostly...|abstract|realistic portraits|maps",
    "Alma Thomas lived in which country?|the United States|Italy|India",
    "She became a full-time painter after she...|retired from teaching|won a race|sailed around the world",
    "Her paintings are known for...|bright colors|only black and white|tiny details like photos|🌸",
    "Alma Thomas taught art for about how many years?|35|3|90"
  ], "Think of bright dabs of color arranged like a mosaic."));
  a.push(L("Faith Ringgold", [
    "Story quilts|🧵|<b>Faith Ringgold</b> (1930-2024) was an American artist from Harlem, New York. She made <b>story quilts</b> that join painting, sewing and writing.",
    "Tar Beach|🌃|Her children's book <b>Tar Beach</b> follows a girl who dreams of flying over the city from her family's rooftop. It began as a quilt.",
    "Telling stories|📖|Ringgold used fabric, a craft often done at home, to tell big stories about family, history and hope."
  ], [
    "Faith Ringgold is known for her story...|quilts|statues|mosaics|🧵",
    "Her art joins painting, sewing and...|writing|welding|photography",
    "In Tar Beach, the girl dreams of...|flying over the city|living on a boat|digging for gold|🌃",
    "Ringgold came from which New York neighborhood?|Harlem|Hollywood|Venice",
    "Tar Beach is a children's...|book|opera|puzzle",
    "A story quilt tells a story using...|fabric and pictures|only music|clay",
    "Tar Beach began as a...|quilt|video game|building",
    "Ringgold's work is by an artist from which country?|the United States|Egypt|Peru"
  ], "Think of art stitched from fabric that tells a story."));
  a.push(L("Calligraphy", [
    "Beautiful writing|🖋️|<b>Calligraphy</b> means beautiful writing. The word comes from Greek words for beauty (kallos) and write (graphein).",
    "Around the world|🈶|Chinese calligraphy uses a brush and ink. Arabic calligraphy flows in graceful curves. Western calligraphy often uses a flat, <b>broad-edge pen</b>.",
    "Thick and thin|✒️|A broad-edge pen makes thick strokes and thin strokes depending on the angle. Keeping that angle steady gives even, lovely letters."
  ], [
    "Calligraphy means...|beautiful writing|fast writing|secret writing|🖋️",
    "A pen with a flat, wide tip is a ___ pen.|broad-edge|ballpoint|felt-dot",
    "Chinese calligraphy is usually made with a...|brush and ink|sewing needle|chisel",
    "A broad-edge pen makes thick and thin strokes depending on the...|angle|price|weight",
    "Which language tradition is famous for graceful curved calligraphy?|Arabic|Morse|Binary",
    "Calligraphy is a kind of...|art of lettering|mathematics|cooking",
    "To get even letters with a broad pen, keep the pen angle...|steady|changing every letter|upside down",
    "The Greek word kallos in calligraphy means...|beauty|ink|paper|✒️"
  ], "Break the word into 'beauty' and 'write'."));
  a.push(L("Batik and tie-dye", [
    "Wax resist|🕯️|<b>Batik</b> is a way to dye cloth using wax. Wax blocks the dye, so the waxed parts keep their old color. It is famous in Indonesia.",
    "The steps|🖌️|You draw with hot wax, often using a pen-like tool called a <b>canting</b>. You dye the cloth, then remove the wax to show your design.",
    "Tie-dye|🌈|In <b>tie-dye</b> you fold, twist and tie cloth with string before dyeing. The tied parts resist the dye, leaving patterns."
  ], [
    "Batik is a dye method that uses...|wax|glue|sand|🕯️",
    "Batik is famous in which country?|Indonesia|Norway|Canada",
    "In batik, the waxed parts of the cloth...|stay the old color|turn the darkest|shrink",
    "The pen-like tool for hot wax in batik is a...|canting|trowel|hammer",
    "In tie-dye you tie cloth with ___ before dyeing.|string|nails|tape measures|🌈",
    "A method where one material blocks the dye is called a...|resist|brush stroke|frame",
    "At the end of batik, the wax is...|removed|painted gold|buried",
    "Tie-dye patterns come from folding and...|twisting|cutting|freezing"
  ], "Think about what blocks the dye from soaking in."));
  a.push(L("Antoni Gaudi", [
    "Barcelona's builder|🏰|<b>Antoni Gaudi</b> (1852-1926) was a Spanish architect who worked in Barcelona. He drew ideas from nature: trees, bones, shells and waves.",
    "Sagrada Familia|⛪|His giant church, the <b>Sagrada Familia</b>, began in 1882 and is still being finished today. Its columns branch like trees.",
    "Broken tile|🦎|He covered benches and a famous lizard fountain in Park Guell with <b>trencadis</b>, a mosaic made from broken tile pieces."
  ], [
    "Antoni Gaudi worked in which city?|Barcelona|London|Tokyo|🏰",
    "Gaudi was an...|architect|astronaut|opera singer",
    "Gaudi's famous church is the...|Sagrada Familia|Hagia Sophia|Notre-Dame|⛪",
    "Gaudi took ideas from...|nature|computers|robots",
    "Mosaic made from broken tile pieces is called...|trencadis|origami|batik|🦎",
    "Gaudi's church columns branch like...|trees|steel pipes|tents",
    "Gaudi's Park Guell has a famous ___ fountain.|lizard|dragon-boat|dolphin",
    "Gaudi's buildings are known for being...|curvy and colorful|plain and boxy|all gray"
  ], "Think of curvy buildings inspired by nature."));
  a.push(L("Your art portfolio", [
    "What it is|📁|A <b>portfolio</b> is a collection of your best art. Artists use it to show their skills to teachers, schools and clients.",
    "Choose well|⭐|Pick your strongest pieces, not every piece. Show variety: drawing, painting, color and design. Add a date and title to each one.",
    "Keep it safe|📸|Store flat work in a folder so it does not bend. Take photos of art you cannot keep, such as a big sculpture."
  ], [
    "A collection of an artist's best work is a...|portfolio|palette|sketch frame|📁",
    "A good portfolio shows your...|best and varied work|worst work|only one picture",
    "To keep flat art from bending, store it in a...|folder|pocket|wet box",
    "For a large sculpture you cannot carry, you can add a...|photo of it|rock from it|smell of it|📸",
    "Adding a date and title to each piece helps show your...|progress|age in pounds|bad moods",
    "Who might look at an art portfolio?|an art school|a train|a pet",
    "Should a portfolio include every piece you ever made?|no, only the strongest|yes, all of them|only the very first one",
    "Variety in a portfolio means showing...|different kinds of work|the same picture ten times|only blank pages"
  ], "Think about showing your best and most varied work."));
  a.push(L("Camera basics", [
    "Aperture|📷|The <b>aperture</b> is the opening in a lens that lets in light. A wide opening gives a blurry background. A small opening keeps more of the picture sharp.",
    "Shutter speed|⏱️|The <b>shutter speed</b> is how long the camera lets in light. A fast shutter freezes motion. A slow shutter makes moving things blur.",
    "Light level|☀️|<b>ISO</b> sets how sensitive the camera is to light. A high ISO helps in dim places but can add grainy dots."
  ], [
    "The opening in a lens that lets in light is the...|aperture|tripod|flash card|📷",
    "How long the camera lets in light is the...|shutter speed|zoom bar|strap",
    "A fast shutter speed will...|freeze motion|blur motion|turn it black and white",
    "A slow shutter speed makes moving things look...|blurred|frozen|bigger",
    "A wide aperture gives a ___ background.|blurry|sharper and clearer|missing",
    "A high ISO in a dim room can add...|grainy dots|extra color|water spots|☀️",
    "A fast shutter would be best to photograph...|a running dog|a sleeping rock|a closed book|🐕",
    "A very bright sunny day usually needs...|less light let in|more light let in|no camera"
  ], "Think about light and time: opening and speed."));
  a.push(L("Installation art", [
    "Art you enter|🚪|<b>Installation art</b> fills a whole room or space. You do not just look at it. You walk through it and become part of the experience.",
    "Site-specific|📍|Some installations are made for one place only and are called <b>site-specific</b>. Many are temporary and are taken down afterward.",
    "Any materials|🧰|Artists may use light, sound, plants, fabric, mirrors or found objects. The way the space feels is the artwork."
  ], [
    "Art that fills a room and that you walk through is called...|installation art|a miniature|a sketch|🚪",
    "An installation made for one place only is...|site-specific|portable|digital",
    "Many installations are...|temporary|carved in stone forever|only on paper",
    "In an installation, the viewer can...|walk through it|only see it from far away|never enter",
    "Installation artists can use materials like...|light and sound|only pencil|only oil paint",
    "The artwork in an installation includes the...|whole space|only the frame|only the signature|📍",
    "Installation art is different from a painting because it...|surrounds you|hangs flat on a wall|is very small",
    "A room full of hanging paper stars you can walk under is...|an installation|a portrait|a photograph|⭐"
  ], "Think of art you can step inside."));
  a.push(L("Glazes and firing", [
    "Two firings|🏺|First, clay is dried to <b>greenware</b>. A first firing in a <b>kiln</b> makes it hard <b>bisque</b>. It is still a bit porous, like a sponge.",
    "Glaze|🧴|A <b>glaze</b> is a glassy coating painted on bisque. Before firing, glazes look dull and chalky, and colors can look different from the final result.",
    "Second firing|🔥|In the glaze firing, the glaze melts into a smooth, shiny skin. It makes pots waterproof and easier to clean."
  ], [
    "Dry, unfired clay is called...|greenware|bisque|glaze|🏺",
    "Clay after its first firing is called...|bisque|greenware|slip",
    "A special oven for firing clay is a...|kiln|stove|toaster|🔥",
    "A glassy coating on a pot is a...|glaze|sketch|frame",
    "Glaze is usually painted on the...|bisque pot|wet mud|finished shiny pot",
    "Glaze melts and turns shiny during the...|second firing|first drying|sculpting",
    "Glaze helps make a pot...|waterproof|lighter than air|invisible",
    "Before firing, glaze often looks...|dull and chalky|shiny and wet|clear like water"
  ], "Think about the order: dry, fire, glaze, fire."));

  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[6], a[8], a[10], a[12], a[14]]));
  a.push(MIX("Level 13 Challenge", [a[1], a[3], a[5], a[7], a[9], a[11], a[13], a[15], a[16], a[17]]));

  // ================= LEVEL 14 =================
  const b = [];
  b.push(L("Drawing hands", [
    "Start with shapes|✋|Hands look hard, so begin with simple shapes: a box or rounded square for the palm, and long tube shapes for the fingers.",
    "Counting parts|🖐️|Each finger has <b>3 sections</b>. The thumb has only <b>2</b> and starts lower on the palm. The middle finger is the longest.",
    "Size|📏|A hand is about as long as your face, from chin to hairline. The wrist is narrower than the palm. Study your own hand as a model."
  ], [
    "How many sections does a finger have?|3|1|5|🖐️",
    "How many sections does a thumb have?|2|3|4",
    "Which finger is usually the longest?|middle|pinky|thumb|✋",
    "A good way to start drawing a hand is with...|simple shapes|tiny fingernails|a signature",
    "A hand is about as long as your...|face|foot|whole arm",
    "Compared with the palm, the wrist is...|narrower|much wider|exactly the same",
    "The palm can be drawn first as a...|rounded box|spiral|flag",
    "Who is the easiest model for hand drawing?|your own hand|a cloud,a puddle|📸"
  ], "Think about how many bones sections each part has."));
  b.push(L("Drawing trees", [
    "Trunk and branches|🌳|A tree is wider at the bottom and gets thinner as it grows up. Every branch splits into smaller branches.",
    "Leaf clumps|🍃|Do not draw every leaf. Draw clumps of leaves as big shapes, and add a few leaf details at the edge.",
    "Light and shade|🌤️|The side facing the light is lighter. The underside of the leaves and the trunk's far side are darker. Add roots that flare out at the base."
  ], [
    "A tree trunk is ___ at the bottom than the top.|wider|thinner|exactly the same|🌳",
    "Branches get ___ as they split away from the trunk.|thinner|thicker|fatter and flatter",
    "To draw leaves, it is easier to draw...|clumps|each leaf in detail|a single huge leaf|🍃",
    "The underside of leaf clumps is usually...|darker|brighter|invisible",
    "The side of the tree facing the sun is...|lighter|darker|bright blue",
    "Roots at the base of a trunk usually...|flare out|point to the sky|disappear",
    "When you draw a tree, you should start with the...|trunk|last leaf|ground texture",
    "Branches split in a pattern like...|a family tree|a grid|a straight line"
  ], "Think of how a real tree gets thinner as it goes up."));
  b.push(L("Painting techniques", [
    "Wet and dry|💧|<b>Wet-on-wet</b> means painting onto a wet surface, so colors melt together softly. <b>Wet-on-dry</b> gives crisp, sharp edges.",
    "Dry brush|🖌️|<b>Dry brush</b> uses a brush with very little paint. It leaves a scratchy, broken texture, good for grass or wood.",
    "Glaze and scumble|🪞|A <b>glaze</b> is a thin see-through layer over dry paint. <b>Scumbling</b> is a thin, broken layer of a lighter color over a darker one."
  ], [
    "Painting onto a wet surface so colors blend softly is...|wet-on-wet|dry brush|scumbling|💧",
    "Painting on dry paper gives edges that are...|crisp|soft and blurry|invisible",
    "A brush with very little paint makes a ___ texture.|scratchy|smooth and wet|glossy",
    "A thin see-through layer of paint over dry paint is a...|glaze|stencil|sketch",
    "Scumbling uses a thin, broken layer of...|lighter paint over darker|wet sponge|clear tape",
    "Dry brush is good for painting...|grass or wood grain|a flat smooth sky|a shiny mirror|🌾",
    "For a soft sunset sky, you would likely use...|wet-on-wet|dry brush|stippling",
    "A glaze changes the color underneath by making it...|richer and deeper|totally covered|rough"
  ], "Think about whether the surface is wet or dry."));
  b.push(L("Screens versus printers", [
    "Light colors|🖥️|Screens make color with light. They use <b>RGB</b>: red, green and blue. Mixing all three lights makes white.",
    "Ink colors|🖨️|Printers use <b>CMYK</b> ink: cyan, magenta, yellow and K for black (key). Mixing inks makes darker colors.",
    "Colors change|🔄|Bright screen colors can look duller when printed, because ink cannot glow. Artists check how their work will look in print."
  ], [
    "Screens make color using...|light|ink|clay|🖥️",
    "RGB stands for red, green and...|blue|brown|beige",
    "CMYK is used by...|printers|campfires|cameras only|🖨️",
    "In CMYK, K stands for...|black|kite|kiln",
    "Mixing red, green and blue light makes...|white|black|brown",
    "Printed colors often look ___ than on a bright screen.|duller|glowing|invisible",
    "Which two letters in CMYK stand for colors besides black?|cyan and magenta|pink and gold|silver and brown",
    "Making a poster to print is a job for...|CMYK|RGB lights only|neon signs"
  ], "Think about which one glows and which one soaks in paper."));
  b.push(L("Concept art", [
    "Early designs|🎬|<b>Concept art</b> shows the first ideas for characters, places and props in films and games, before they are built or animated.",
    "Silhouette test|🌑|A strong character can be recognized from its solid black shape alone. This is the <b>silhouette test</b>.",
    "Model sheets|🔄|A <b>turnaround</b> shows a character from the front, side and back so everyone draws it the same way. Artists make many quick <b>thumbnails</b> first."
  ], [
    "First idea drawings for a film or game are called...|concept art|final art|trading cards|🎬",
    "Telling a character apart by its solid black shape is the...|silhouette test|ink test|speed test|🌑",
    "A sheet showing a character from front, side and back is a...|turnaround|signature page|postcard",
    "Tiny quick sketches of many ideas are...|thumbnails|murals|fixative",
    "Concept art is made before the character is...|built or animated|dreamed up by anyone|released to everyone",
    "Why do teams use a turnaround?|so everyone draws it the same|to hide the character|to use less paper",
    "A hero with a clear silhouette is easy to...|recognize|forget|erase",
    "Game and film artists often start with many quick...|sketches|statues|windows"
  ], "Think of the very first drawings before the final design."));
  b.push(L("Albrecht Durer", [
    "German master|🖋️|<b>Albrecht Durer</b> (1471-1528) was a German artist famous for prints. He made woodcuts and engravings that were copied many times and sold across Europe.",
    "Nature study|🐇|His watercolor <b>Young Hare</b> is so detailed that you can almost count the hairs. He studied animals and plants very closely.",
    "Rhinoceros|🦏|He made a famous woodcut of a rhinoceros in 1515, using only a description and a sketch, since he never saw one. Some of its plates look like armor."
  ], [
    "Albrecht Durer came from...|Germany|Japan|Brazil|🖋️",
    "Durer was famous for his prints like woodcuts and...|engravings|photographs|sand sculptures",
    "His careful watercolor of a rabbit-like animal is called Young...|Hare|Fox|Owl|🐇",
    "Durer made his famous rhinoceros woodcut from a...|description and sketch|live model in his room|photograph",
    "Prints were useful because the art could be...|copied many times|only seen once|eaten",
    "Durer lived mostly in which period?|the Renaissance|the Stone Age|the Space Age",
    "Durer is known for studying nature in great...|detail|secret|silence",
    "Which animal did Durer draw in 1515?|rhinoceros|giraffe|penguin|🦏"
  ], "Think of a German printmaker from the Renaissance."));
  b.push(L("Hokusai and The Great Wave", [
    "Japanese master|🌊|<b>Katsushika Hokusai</b> (1760-1849) was a Japanese artist. His most famous print is <b>The Great Wave off Kanagawa</b>, made around 1831.",
    "Mount Fuji|🗻|The wave towers over small boats, while snowy Mount Fuji sits small in the background. It belongs to his series Thirty-Six Views of Mount Fuji.",
    "A restless artist|✍️|Hokusai kept changing his name and kept learning. He said he hoped to keep improving until he was very old. His prints were made with woodblocks."
  ], [
    "The Great Wave off Kanagawa was made by...|Hokusai|Rembrandt|Monet|🌊",
    "Hokusai was from which country?|Japan|Peru|Spain",
    "In The Great Wave, the mountain in the background is...|Mount Fuji|Mount Everest|Machu Picchu|🗻",
    "The Great Wave is a woodblock...|print|statue|quilt",
    "Hokusai's series is called Thirty-Six Views of...|Mount Fuji|Tokyo Tower|the Sea",
    "In the print, the wave towers over small...|boats|castles|cars",
    "Hokusai hoped to keep ___ as he grew older.|improving|sleeping|hiding",
    "The Great Wave was made around the year...|1831|1131|1991"
  ], "Think of the famous Japanese wave print."));
  b.push(L("Paul Klee", [
    "Line walking|🚶|<b>Paul Klee</b> (1879-1940) was a Swiss-German artist. He said that drawing is like taking a line for a walk.",
    "Music and color|🎻|Klee played the violin and loved music. His paintings often use grids of color that feel like rhythm and harmony.",
    "Playful art|🐦|He made childlike pictures such as <b>Cat and Bird</b> and <b>Senecio</b>, which turns a face into simple colored shapes. He later taught at the Bauhaus school."
  ], [
    "Klee said drawing is like taking a ___ for a walk.|line|dog|brush|🚶",
    "Klee loved to play the...|violin|trumpet|drums|🎻",
    "Klee's paintings often feel like...|music|stone|weather",
    "Klee's art can look playful and...|childlike|photographic|dark and angry",
    "Senecio is a painting that turns a face into...|colored shapes|a photograph|a map",
    "Klee taught at the Bauhaus, which was a...|design school|bakery|railway",
    "Klee came from Switzerland and...|Germany|Egypt|Korea",
    "Cat and Bird is a painting by...|Klee|Hokusai|Durer|🐦"
  ], "Think of a violin-playing artist with playful lines."));
  b.push(L("Joan Miro", [
    "Spanish dreamer|⭐|<b>Joan Miro</b> (1893-1983) was a Spanish artist from Catalonia. He is linked with Surrealism, art that shows imagination and dreams.",
    "Playful symbols|🌙|His paintings use stars, moons, birds, eyes and squiggly lines. He used bold black lines and bright red, blue and yellow.",
    "Free play|🎨|Miro said he wanted to move away from ordinary painting. He also made sculptures, ceramics and giant public art."
  ], [
    "Joan Miro was from...|Spain|Norway|Mexico|⭐",
    "Miro's art is connected with...|Surrealism|Realism|Cubism",
    "Which shapes often appear in Miro's art?|stars and moons|train tickets|photographs|🌙",
    "Miro used bold ___ lines.|black|invisible|glass",
    "Miro often used bright red, blue and...|yellow|beige|gray",
    "Surrealism shows imagination and...|dreams|math tests|maps",
    "Besides painting, Miro made...|ceramics and sculptures|no art|only photos",
    "Miro's style feels...|playful|strict and dull|photo-realistic"
  ], "Think of stars, moons and squiggles."));
  b.push(L("Rene Magritte", [
    "Belgian surrealist|🎩|<b>Rene Magritte</b> (1898-1967) was a Belgian painter. He painted ordinary things in surprising ways, such as men in bowler hats and floating rocks.",
    "Not a pipe|🚭|His painting <b>The Treachery of Images</b> shows a pipe with the words in French that mean 'This is not a pipe.' It is a painting of a pipe, not a real pipe.",
    "Think twice|🤔|Magritte wanted viewers to ask questions about what they see. In <b>Son of Man</b>, a green apple floats in front of a man's face."
  ], [
    "Rene Magritte came from...|Belgium|Italy|Kenya|🎩",
    "Magritte is best known as a...|surrealist|cave painter|sculptor of ice",
    "In The Treachery of Images, the painting says it is not a real...|pipe|apple|castle",
    "Magritte painted ordinary things in ___ ways.|surprising|boring|invisible",
    "In Son of Man, a ___ floats in front of the man's face.|green apple|red balloon|blue fish|🍏",
    "Magritte often painted men wearing...|bowler hats|crowns|space helmets",
    "Magritte wanted viewers to ask...|questions|for a snack|for a map",
    "The Treachery of Images reminds us that a picture of something is not the...|real thing|artist|frame"
  ], "Think of a pipe that is 'not a pipe'."));
  b.push(L("Henry Moore", [
    "English sculptor|🗿|<b>Henry Moore</b> (1898-1986) was an English sculptor. He made large, smooth, simple figures in bronze, stone and wood.",
    "Holes as shapes|⭕|His figures often have holes through them. The empty space is part of the sculpture, like negative space in a drawing.",
    "In nature|⛰️|Moore wanted his big sculptures to sit outdoors, among hills and trees. He took ideas from bones, pebbles and rocks."
  ], [
    "Henry Moore was a...|sculptor|photographer|architect|🗿",
    "Henry Moore was from which country?|England|Brazil|Japan",
    "Moore's figures often have...|holes through them|bright neon lights|moving parts",
    "In his sculptures, the empty space is...|part of the art|a mistake|always filled in later|⭕",
    "Moore took ideas from bones, pebbles and...|rocks|computers|glass cups",
    "Moore wanted his big works to sit...|outdoors|inside a tiny box|under water forever",
    "Moore's figures look...|smooth and simple|tiny and busy|made of paper",
    "Moore often used which material for large work?|bronze|chocolate|ice"
  ], "Think about sculptures with holes in them."));
  b.push(L("Alexander Calder", [
    "American inventor|🎪|<b>Alexander Calder</b> (1898-1976) was an American artist. He first trained as an engineer, and then turned to art.",
    "Mobiles|🪁|He invented hanging sculptures that move in the air. The artist Marcel Duchamp named them <b>mobiles</b>.",
    "Stabiles|🏗️|His big standing sculptures that do not move are called <b>stabiles</b>. He also built a tiny wire circus he performed with."
  ], [
    "Alexander Calder first trained as an...|engineer|chef|dentist|🪁",
    "A hanging sculpture that moves in the air is a...|mobile|stabile|mosaic",
    "A big standing sculpture that does not move is a...|stabile|mobile|kite",
    "Calder came from which country?|the United States|Greece|Nigeria",
    "The word mobile was suggested by Marcel...|Duchamp|Monet|Rousseau",
    "Calder also built a tiny wire...|circus|castle|rocket|🎪",
    "Calder's mobiles are balanced so they can...|move gently|stay frozen|float away",
    "Mobiles move because of...|air currents|batteries|magic"
  ], "Think of hanging shapes that turn slowly."));
  b.push(L("Ansel Adams", [
    "Photographing nature|🏞️|<b>Ansel Adams</b> (1902-1984) was an American photographer. He took black-and-white pictures of Yosemite and other national parks.",
    "Sharp focus|🔍|He wanted everything from near rocks to far mountains to be sharp. He used a very small aperture, called f/64, and started a group with that name.",
    "Protecting places|🌲|His photos helped people care about wild places. He worked carefully with light and shadow, and printed his photos in a darkroom."
  ], [
    "Ansel Adams took photos mostly in...|black and white|neon colors|cartoon style|🏞️",
    "He is famous for photographing...|national parks|cartoons|underwater cities",
    "Adams wanted the whole scene to be...|sharp|blurry|invisible",
    "A very small aperture helps keep more of the scene in...|focus|a bag|the dark",
    "Adams's photography group was named...|f/64|ISO 1|Shutter Club",
    "Ansel Adams's photos helped people care about...|wild places|fast cars|video games|🌲",
    "Adams printed photos in a...|darkroom|garden shed|kitchen oven",
    "Yosemite is a national park in...|California|Brazil|Norway"
  ], "Think of a famous photographer of Yosemite."));
  b.push(L("Art Nouveau", [
    "A new art|🌿|<b>Art Nouveau</b> means new art in French. It was popular around 1890 to 1910 in Europe and America.",
    "Flowing lines|🌸|Its style uses long, curving lines like vines and flower stems. Plants, flowers and birds were favorite subjects.",
    "Everyday things|🏮|Artists decorated posters, furniture, lamps and buildings. Alphonse Mucha made famous posters. Louis Comfort Tiffany made colorful glass lamps."
  ], [
    "Art Nouveau is French for...|new art|old art|blue art|🌿",
    "Art Nouveau lines are mostly...|flowing and curved|straight and boxy|random dots",
    "A favorite subject of Art Nouveau was...|plants and flowers|robots|spaceships|🌸",
    "Alphonse Mucha was famous for his...|posters|bridges|bronze horses",
    "Tiffany made colorful glass...|lamps|plates|bricks",
    "Art Nouveau was popular around...|1900|1200|2000",
    "Art Nouveau artists decorated things like...|furniture and buildings|only museums|only paper clips",
    "Long curving lines that look like vines are typical of...|Art Nouveau|Pointillism|Pop art"
  ], "Think of curving vines and flowers."));
  b.push(L("The Bauhaus", [
    "A design school|🏫|The <b>Bauhaus</b> was a German art and design school started in 1919 by the architect Walter Gropius. It was closed in 1933.",
    "Art meets craft|🪑|It taught that art, craft and design belong together. Students made chairs, lamps, posters and buildings that were simple and useful.",
    "Simple shapes|🔺🟡|Bauhaus design often used basic shapes (circle, square, triangle), primary colors and clean letters. Kandinsky and Klee taught there."
  ], [
    "The Bauhaus was a school in...|Germany|Brazil|Egypt|🏫",
    "The Bauhaus was started in...|1919|1019|2019",
    "It was started by the architect Walter...|Gropius|Disney|Newton",
    "The Bauhaus taught that art and ___ belong together.|design|sleep|sand",
    "Bauhaus designs are usually...|simple and useful|very fancy and heavy|covered with tiny flowers|🪑",
    "Basic Bauhaus shapes include circle, square and...|triangle|dragon|spiral flower",
    "Which painter taught at the Bauhaus?|Kandinsky|Rousseau|Degas",
    "Bauhaus students made chairs, lamps and...|posters|dinosaur bones|sand castles"
  ], "Think of a German school that mixed art and design."));
  b.push(L("Art Deco", [
    "Glamour of the 1920s|🏙️|<b>Art Deco</b> was a style of the 1920s and 1930s. The name comes from a big 1925 design show in Paris.",
    "Bold patterns|⚡|It uses zigzags, sunbursts, fans and straight, shiny lines, often in gold, black and bright colors.",
    "Tall buildings|🏢|New York's Chrysler Building and Empire State Building are Art Deco towers. It also shaped posters, trains and radios."
  ], [
    "Art Deco was popular in the...|1920s and 1930s|1600s|2000s|🏙️",
    "The name Art Deco comes from a design show in...|Paris|Sydney|Cairo",
    "Art Deco patterns often use...|zigzags and sunbursts|messy splatters|only a plain white color|⚡",
    "Which building is Art Deco?|Chrysler Building|Great Pyramid|Parthenon",
    "Art Deco often uses gold and...|black|only brown|invisible ink",
    "Art Deco is known for being...|glamorous and geometric|soft and blurry|plain and rough",
    "Art Deco also shaped posters, trains and...|radios|dinosaurs|rivers",
    "The Empire State Building is in...|New York|Texas|Moscow"
  ], "Think of glamorous towers with zigzags and gold."));
  b.push(L("Alebrijes and folk art", [
    "Fantasy creatures|🦎|<b>Alebrijes</b> are bright, imaginary animals from Mexico. They were first made by <b>Pedro Linares</b> in Mexico City in the 1930s. He said he dreamed them while ill.",
    "Wood and paper|🪵|Linares made them from papier-mache (paper and paste). In Oaxaca, artists carve and paint wood alebrijes with tiny dots and stripes.",
    "More folk art|✂️|Mexican <b>papel picado</b> are cut-paper banners. <b>Talavera</b> is colorful painted pottery. Folk art is made by communities and passed down."
  ], [
    "Alebrijes come from...|Mexico|Iceland|Canada|🦎",
    "Alebrijes are brightly painted...|imaginary creatures|real birds|rocks",
    "Pedro Linares first made them from...|papier-mache|metal|candy",
    "Oaxaca artists often carve alebrijes from...|wood|ice|glass|🪵",
    "Papel picado is cut...|paper|metal|stone",
    "Talavera is a kind of painted...|pottery|photograph|quilt",
    "Folk art is usually passed down by...|communities|only museums|machines",
    "Alebrijes are covered with bright dots and...|stripes|photos|news|✂️"
  ], "Think of colorful imaginary creatures from a dream."));
  b.push(L("Conserving art", [
    "Art doctors|🧑‍🔬|<b>Conservators</b> care for old art. They clean it, mend it and study it, using methods that can be undone, called <b>reversible</b>.",
    "Enemies of art|☀️|Strong sunlight can fade colors. Heat, damp air and dust can harm paper and canvas. Museums keep rooms at steady temperature and humidity.",
    "Handle with care|🧤|People may use clean hands or gloves, carry art with both hands, and never touch the painted surface. Frames can have glass that blocks harmful light."
  ], [
    "People who care for old artworks are called...|conservators|critics|tourists|🧑‍🔬",
    "A conservation method that can be undone is called...|reversible|permanent|invisible",
    "Strong sunlight can ___ colors.|fade|add|cool",
    "Damp air can harm paper and...|canvas|steel|air|☀️",
    "Museums keep rooms at a steady temperature and...|humidity|speed|music",
    "When carrying art, you should never touch the...|painted surface|frame edge only|wall label",
    "Why is a reversible method good for conservators?|it can be undone later|it makes the art bigger|it hides the art",
    "Art on paper is especially harmed by...|water and sunlight|friendly smiles|quiet rooms"
  ], "Think of people who protect old art from harm."));

  b.push(MIX("Mixed practice", [b[1], b[2], b[3], b[5], b[7], b[9], b[12], b[14]]));
  b.push(MIX("Level 14 Challenge", [b[0], b[4], b[6], b[8], b[10], b[11], b[13], b[15], b[16], b[17]]));

  // ================= LEVEL 15 =================
  const c = [];
  c.push(L("Brunelleschi and perspective", [
    "Florence genius|⛪|<b>Filippo Brunelleschi</b> (1377-1446) was an Italian architect from Florence. He built the great dome of the Florence Cathedral, finished in 1436.",
    "A mirror trick|🪞|Around 1415 he showed how lines can meet at a single point in a painting. This helped artists invent <b>linear perspective</b>.",
    "Spreading the idea|📚|In 1435 the writer Alberti explained perspective in a book on painting. Soon artists used it to make flat pictures look deep."
  ], [
    "Brunelleschi was from which Italian city?|Florence|Venice|Naples|⛪",
    "Brunelleschi was a famous...|architect|violinist|photographer",
    "He built the great dome of Florence...|Cathedral|Airport|Market",
    "Brunelleschi helped invent linear...|perspective|calligraphy|mosaic|🪞",
    "In linear perspective, parallel lines meet at a...|vanishing point|border|signature",
    "Perspective makes a flat picture look...|deep|round like a ball|upside down",
    "The dome was finished in the year...|1436|1036|1936",
    "Alberti wrote a book about...|painting|cooking|space travel"
  ], "Think of the Renaissance architect with the huge dome."));
  c.push(L("Titian and Venetian color", [
    "Venice|🚤|<b>Titian</b> (about 1488-1576) lived in Venice, Italy, a city on the water. Venetian artists were famous for rich, glowing color.",
    "Layers of paint|🎨|Titian used oil paint in many thin layers, called glazes. His reds, golds and blues seem to glow. He painted people, myths and royal portraits.",
    "Color versus line|🖌️|Artists in Florence stressed drawing and line. Artists in Venice stressed color. Titian became the most famous of the Venetian colorists."
  ], [
    "Titian lived mostly in...|Venice|Madrid|Athens|🚤",
    "Venetian artists were famous for rich...|color|stone|bronze",
    "Titian built up color using many thin layers called...|glazes|casts|tiles|🎨",
    "Titian mainly painted with...|oil paint|crayons|chalk",
    "Florence artists stressed drawing, while Venice stressed...|color|printing|photography",
    "Titian lived during the...|Renaissance|Stone Age|Space Age",
    "Venice is a city built on...|the water|a desert|a volcano",
    "Oil glazes make colors seem to...|glow|vanish|freeze"
  ], "Think of the glowing colors of a canal city."));
  c.push(L("Velazquez and Las Meninas", [
    "Court painter|👑|<b>Diego Velazquez</b> (1599-1660) was a Spanish painter. He worked for King Philip IV in Madrid and became the king's favorite artist.",
    "A tricky picture|🖼️|His giant painting <b>Las Meninas</b> (1656) shows a young princess with her helpers in a large room. The painter himself stands at an easel inside the picture.",
    "Mirror|🪞|A small mirror on the back wall shows the king and queen, who seem to stand where we stand. The painting asks who is looking at whom. It hangs in the Prado Museum."
  ], [
    "Velazquez was a painter from...|Spain|Poland|China|👑",
    "He worked for King...|Philip IV|Tutankhamun|Louis the Great",
    "Las Meninas shows a young...|princess|knight|farmer|🖼️",
    "Las Meninas was painted in...|1656|1256|1956",
    "In the painting, a small mirror shows the king and...|queen|princess's dog|painter's mother|🪞",
    "Velazquez put ___ into the scene.|himself|a spaceship|a dinosaur",
    "Las Meninas is in the Prado Museum in...|Madrid|Paris|Lima",
    "The painting is famous for being a clever...|puzzle of looking|math diagram|cartoon"
  ], "Think of a Spanish court painter and a clever mirror."));
  c.push(L("Post-Impressionism", [
    "After Impressionism|🌻|<b>Post-Impressionism</b> means after Impressionism. From the 1880s, artists wanted more feeling, structure and personal ideas than pure light effects.",
    "Different paths|🧭|Van Gogh used swirling strokes to show feelings. Cezanne built shapes with color. Seurat used dots. Gauguin used flat, bold, symbolic color.",
    "Gauguin|🌴|<b>Paul Gauguin</b> painted in Tahiti, using large flat areas of bright color and simple outlines. These ideas inspired later modern artists."
  ], [
    "Post-Impressionism came ___ Impressionism.|after|before|instead of|🌻",
    "Which artist used swirling strokes to show feelings?|Van Gogh|Raphael|Durer",
    "Which artist built shapes with color?|Cezanne|Mucha|Moore",
    "Which artist painted using dots?|Seurat|Gauguin|Magritte",
    "Gauguin painted in the island of...|Tahiti|Greenland|Iceland|🌴",
    "Gauguin used large areas of flat...|bright color|pencil lines only|gray mist",
    "Post-Impressionists wanted more personal...|feeling|rules|numbers",
    "The painter Seurat is linked with...|pointillism|origami|etching"
  ], "Think about artists who came right after the Impressionists."));
  c.push(L("Expressionism", [
    "Feeling first|😱|<b>Expressionism</b> began in Germany in the early 1900s. Artists showed inner feelings, not just what things look like.",
    "Bold distortion|🎨|They used strong colors and bent shapes. Edvard Munch of Norway painted <b>The Scream</b> in 1893 to show anxiety through swirling lines and colors.",
    "Groups|🐴|Two German groups were <b>Die Brucke</b> (The Bridge) and <b>The Blue Rider</b>. Franz Marc of the Blue Rider painted bright blue horses."
  ], [
    "Expressionism shows mostly...|inner feelings|exact photographs|numbers|😱",
    "Expressionism began in the early...|1900s|1500s|2000s",
    "Who painted The Scream?|Munch|Vermeer|Moore",
    "Munch came from which country?|Norway|Egypt|Chile",
    "Expressionists often used strong colors and ___ shapes.|bent|perfectly photographic|invisible",
    "The Blue Rider painter Franz Marc is known for blue...|horses|trees|boats|🐴",
    "Die Brucke means...|The Bridge|The Bell|The Brush",
    "Expressionists cared more about feelings than...|looking exactly real|having any color|signing their names"
  ], "Think of feelings shown through bent shapes and strong color."));
  c.push(L("Fauvism", [
    "Wild beasts|🦁|<b>Fauvism</b> came from the French word fauves, meaning wild beasts. A critic used the name in 1905 because the paintings seemed so wild with color.",
    "Colors free|🌈|Fauves used bright, pure colors that do not match real life. A face might be green and a tree might be red.",
    "Leaders|🎨|<b>Henri Matisse</b> and <b>Andre Derain</b> led the group. They painted quickly with bold brushstrokes and simple shapes."
  ], [
    "Fauvism comes from a French word meaning wild...|beasts|waves|words|🦁",
    "Fauvism became a named movement in...|1905|1505|1995",
    "Fauves used colors that were...|bright and unrealistic|dull and gray|only brown",
    "A Fauve painter might paint a tree...|red|always realistic green|invisible|🌳",
    "A leader of Fauvism was Henri...|Matisse|Rousseau|Calder",
    "Another Fauve leader was Andre...|Derain|Gaudi|Linares",
    "Fauves painted with bold...|brushstrokes|tiny dots only|stitches",
    "Fauvism started in which country?|France|Peru|Kenya"
  ], "Think of the 'wild beasts' of bright color."));
  c.push(L("Futurism", [
    "Speed and machines|🚄|<b>Futurism</b> started in Italy in 1909. Artists loved speed, new machines, cars, trains and modern cities.",
    "Showing motion|💨|They painted movement by repeating shapes, like a dog with many legs or a cyclist with many wheels. Giacomo Balla painted <b>Dynamism of a Dog on a Leash</b> in 1912.",
    "Look forward|🔮|The name Futurism means looking to the future. These artists wanted to leave old styles behind and show energy."
  ], [
    "Futurism started in which country?|Italy|Mexico|Norway|🚄",
    "Futurism started in...|1909|1809|1999",
    "Futurists were excited about speed and...|machines|sleepy villages|ancient ruins",
    "To show motion, Futurists repeated...|shapes|only the background|nothing at all|💨",
    "Giacomo Balla painted Dynamism of a Dog on a...|Leash|Bicycle|Boat",
    "In that painting, the dog's legs look like they are...|moving fast|sleeping|made of stone",
    "The name Futurism looks toward the...|future|past|weather",
    "Futurists wanted to show...|energy|silence|old styles"
  ], "Think of art about speed and the future."));
  c.push(L("Dada", [
    "Breaking rules|🎭|<b>Dada</b> began in 1916 in Zurich, Switzerland, during a time of war. Artists wanted to make fun of old rules and show that art could be playful and surprising.",
    "Found objects|🚲|Marcel Duchamp made <b>readymades</b>, ordinary objects chosen as art, like a bicycle wheel fixed on a stool in 1913.",
    "Cut and paste|✂️|Dada artists made collages from newspapers and photos. Hannah Hoch cut up magazines to make funny, surprising pictures."
  ], [
    "Dada began in which year?|1916|1716|2016|🎭",
    "Dada began in the Swiss city of...|Zurich|Madrid|Cairo",
    "An ordinary object chosen as art is called a...|readymade|stained glass|fresco|🚲",
    "Marcel Duchamp fixed a bicycle wheel on a...|stool|boat|tree",
    "Dada artists made collages from newspapers and...|photos|steel|chalk|✂️",
    "Dada artists wanted art to be...|playful and surprising|only serious|invisible",
    "Hannah Hoch used cut-up...|magazines|candles|leaves",
    "The Dada movement began during a time of...|war|a big festival|a space race"
  ], "Think of playful art that breaks the rules."));
  c.push(L("Harlem Renaissance", [
    "A cultural bloom|🎷|The <b>Harlem Renaissance</b> was a burst of African American art, music and writing in Harlem, New York, in the 1920s and 1930s.",
    "Aaron Douglas|🌙|<b>Aaron Douglas</b> (1899-1979) painted murals with graceful silhouettes, circles of light and layers of blue and green. He helped shape the look of the era.",
    "Many voices|📖|Poet Langston Hughes, sculptor Augusta Savage and musician Duke Ellington were part of it. It showed pride in Black history and culture."
  ], [
    "The Harlem Renaissance took place mostly in...|Harlem, New York|Paris|Tokyo|🎷",
    "It happened in the 1920s and...|1930s|1830s|2030s",
    "Aaron Douglas painted graceful...|silhouettes|cartoons|seashells|🌙",
    "Langston Hughes was a famous...|poet|pilot|chef",
    "Augusta Savage was a...|sculptor|astronaut|banker",
    "Duke Ellington was a famous...|musician|painter of fresco|architect",
    "The Harlem Renaissance showed pride in Black...|history and culture|trading cards|volcano science",
    "Aaron Douglas often used layers of blue and...|green|pink|yellow"
  ], "Think of art, music and writing in Harlem."));
  c.push(L("Minimalism", [
    "Less is more|⬜|<b>Minimalism</b> began in the 1960s. Artists used the simplest shapes, colors and materials, leaving out anything extra.",
    "Names|🔲|Donald Judd made clean metal boxes in rows. Dan Flavin made art from fluorescent light tubes. Frank Stella painted simple black stripes.",
    "Looking carefully|👀|Minimalist art wants you to notice the object itself, its size, its material and the space around it."
  ], [
    "Minimalism uses the ___ shapes and materials.|simplest|most complicated|tiniest decorated|⬜",
    "Minimalism began in the...|1960s|1160s|2060s",
    "Donald Judd made clean metal...|boxes|flowers|clocks",
    "Dan Flavin made art from...|light tubes|chocolate|marble statues",
    "Frank Stella painted simple black...|stripes|portraits|clouds",
    "A saying linked with minimalism is 'less is ___'.|more|messy,small",
    "Minimalist art leaves out anything...|extra|simple|metal",
    "Minimalism asks us to notice the object and its...|space|rumors|price|👀"
  ], "Think of super simple, clean art."));
  c.push(L("Photorealism", [
    "Like a photo|📸|<b>Photorealism</b> began in the 1960s and 1970s. Artists paint or draw so exactly that the picture looks like a photograph.",
    "Starting with photos|🖼️|Artists often start from photos and copy them with a grid or with projectors. Chuck Close painted huge faces by working square by square.",
    "Everyday subjects|🚕|Photorealists painted city streets, shiny cars, shop windows and diners, with very sharp detail and many reflections."
  ], [
    "Photorealism makes paintings look like...|photographs|cartoons|statues|📸",
    "Photorealism began in the 1960s and...|1970s|1870s|2070s",
    "Photorealists often start from a...|photo|dream|blank mind",
    "Chuck Close worked square by square using a...|grid|stencil|kiln",
    "Photorealists painted shiny things like...|cars|mud|fog|🚕",
    "Photorealist paintings have lots of...|sharp detail|loose sketches|empty space",
    "Photorealism is the opposite of...|abstract art|portraits|landscapes",
    "A photorealist would pick which subject?|a city street|a swirl of random color|a plain white wall"
  ], "Think of paintings that fool you into thinking they are photos."));
  c.push(L("Persian and Mughal miniatures", [
    "Tiny paintings|📜|<b>Miniatures</b> are small, very detailed paintings made for books. Persian artists painted gardens, poems and stories with tiny brushes.",
    "Rich materials|✨|They used pigments from minerals and plants, plus real gold leaf. Colors stayed bright for hundreds of years.",
    "The Mughals|🕌|The <b>Mughal Empire</b> in India (1526-1857) mixed Persian style with Indian ideas. Mughal miniatures show courts, animals and flowers in careful detail."
  ], [
    "A small, very detailed painting for a book is a...|miniature|mural|statue|📜",
    "Persian miniatures were painted with very ___ brushes.|tiny|giant|wooden",
    "Persian painters used real gold...|leaf|boots|clocks|✨",
    "Their pigments came from minerals and...|plants|plastic|metal bars",
    "The Mughal Empire was in...|India|Brazil|Finland|🕌",
    "Mughal art blended Persian style and...|Indian ideas|Aztec ideas only|space designs",
    "Miniatures were often made for...|books|billboards|sidewalks",
    "Mughal miniatures show animals, flowers and...|royal courts|space ships|computers"
  ], "Think of tiny, jewel-like paintings in books."));
  c.push(L("Inuit art", [
    "Arctic people|🐻‍❄️|The <b>Inuit</b> are Indigenous people of the Arctic, including northern Canada. They have made art for thousands of years.",
    "Stone carving|🪨|Carvers shape soft stone, such as soapstone, into animals like polar bears, seals and birds. The carvings show strong, smooth forms.",
    "Prints and stone markers|🗿|Artists in Kinngait (Cape Dorset) have made prints since the 1950s. An <b>inuksuk</b> is a stone landmark built to guide travelers."
  ], [
    "The Inuit live in the...|Arctic|rainforest|desert|🐻‍❄️",
    "Inuit carvers often use soft stone called...|soapstone|glass|steel",
    "A common animal carved by Inuit artists is the...|polar bear|elephant|kangaroo",
    "An inuksuk is a stone...|landmark|bowl|toy",
    "Kinngait is also known as Cape...|Dorset|Canaveral|Town",
    "Kinngait artists have made ___ since the 1950s.|prints|skyscrapers|movies",
    "Soapstone is easy to carve because it is...|soft|as hard as steel|made of ice|🪨",
    "Inuit art often shows animals of the...|Arctic|jungle|desert"
  ], "Think of carved stone animals from the far north."));
  c.push(L("Korean celadon", [
    "Jade-green pottery|🍵|<b>Celadon</b> is pottery with a pale blue-green glaze. Korean potters of the Goryeo period (918-1392) made some of the finest celadon in the world.",
    "Inlay|🕊️|The potters invented <b>sanggam</b>: they carved designs, filled the lines with white or black clay, then glazed. Cranes and clouds were favorite patterns.",
    "The color|🔥|The green-gray color comes from a little iron in the glaze, fired with less oxygen in the kiln."
  ], [
    "Celadon glaze is usually pale...|blue-green|bright red|pure white|🍵",
    "Fine celadon was made in the Goryeo period in...|Korea|Italy|Mexico",
    "The inlay technique is called...|sanggam|batik|frottage|🕊️",
    "Sanggam designs are filled with white or black...|clay|water|sand",
    "A favorite celadon pattern is a...|crane|robot|rocket",
    "The color of celadon comes from a little...|iron|gold|ink",
    "Celadon is a kind of...|pottery|painting|weaving",
    "Celadon needs a ___ to be fired.|kiln|freezer|microwave"
  ], "Think of green-gray pottery from Korea."));
  c.push(L("Lost-wax casting", [
    "Wax first|🕯️|In <b>lost-wax casting</b>, the artist makes a model in wax and coats it in a thick clay mold.",
    "Wax is lost|🔥|The mold is heated. The wax melts and runs out, so it is 'lost.' That leaves an empty space in the shape of the model.",
    "Metal in|🏺|Melted bronze is poured into the space. When it cools, the mold is broken and the artist cleans up the bronze sculpture."
  ], [
    "In lost-wax casting, the first model is made from...|wax|iron|ice|🕯️",
    "The wax melts and runs out, so it is...|lost|saved|colored",
    "The empty space left in the mold is poured with melted...|bronze|paint|chocolate|🏺",
    "After the metal cools, the mold is...|broken|painted|kept to reuse",
    "A mold for this casting is mostly made of...|clay|glass|bubbles",
    "This method is often used to make...|bronze sculptures|paintings|posters",
    "Heat is needed to melt the wax and the...|metal|clay's shadow|color",
    "The empty space in the mold has the shape of the...|wax model|artist's hand|tool box"
  ], "Think about what disappears from the mold."));
  c.push(L("Screen printing", [
    "Ink through a mesh|🖨️|In <b>screen printing</b>, a stretched mesh screen has a stencil that blocks parts of it. Ink is pushed through the open parts with a rubber <b>squeegee</b>.",
    "One screen per color|🎨|Each color needs its own screen. Printers line them up carefully so the layers match, called <b>registration</b>.",
    "Everywhere|👕|It is used for posters, T-shirts and art prints. Andy Warhol used screen printing to make many copies of one picture in different colors."
  ], [
    "Ink is pushed through a mesh screen with a...|squeegee|hammer|compass|🖨️",
    "A stencil on the screen ___ part of the ink.|blocks|adds|burns",
    "For a print with 3 colors, you typically need ___ screens.|3|1|0",
    "Lining up the layers is called...|registration|glazing|burnishing",
    "Screen printing is often used to make...|T-shirts|bronze statues|stained glass|👕",
    "Which artist used screen printing a lot?|Andy Warhol|Brunelleschi|Titian",
    "The mesh in a screen lets ink pass through the...|open parts|solid stencil parts|frame",
    "Screen printing can make ___ of the same picture.|many copies|only one copy|zero copies"
  ], "Think of ink being pulled through a stencil."));
  c.push(L("Etching and engraving", [
    "Lines in metal|⚙️|In <b>engraving</b>, an artist cuts lines straight into a metal plate with a sharp tool called a <b>burin</b>.",
    "Acid bites|🧪|In <b>etching</b>, the plate is coated with a waxy ground. The artist scratches the drawing through the wax, and acid bites the lines into the metal.",
    "Printing|📄|Ink is wiped over the plate and stays in the lines. A press squeezes damp paper onto it. This is called <b>intaglio</b> printing."
  ], [
    "Cutting lines into metal with a burin is...|engraving|batik|mosaic|⚙️",
    "In etching, what bites the lines into the plate?|acid|wax|ink",
    "Before etching, the plate is coated with a waxy...|ground|glue|sand|🧪",
    "In intaglio printing, ink stays in the...|lines|raised parts|paper edge",
    "The sharp tool used for engraving is a...|burin|brush|squeegee",
    "A press squeezes ___ paper onto the plate.|damp|burning|sandy",
    "Rembrandt made many...|etchings|mobiles|installations",
    "Intaglio printing prints from lines that are...|cut below the surface|raised on top|painted on silk"
  ], "Think of lines cut or bitten into a metal plate."));
  c.push(L("Grisaille and underpainting", [
    "Gray first|🩶|<b>Grisaille</b> (gree-ZIGH) is painting in shades of gray. The word comes from the French word for gray, <b>gris</b>.",
    "Values first|🌓|Many artists make an <b>underpainting</b> first. It settles the light and dark values so the picture looks 3D before color goes on.",
    "Color on top|🎨|Then thin see-through glazes of color are painted over the gray. The light and dark underneath shine through."
  ], [
    "Painting in shades of gray is called...|grisaille|fresco|collage|🩶",
    "The French word gris means...|gray|green|gold",
    "An underpainting helps set the...|values|signature|frame size",
    "Underpainting is done...|first|last|never",
    "Thin see-through layers of color on top are...|glazes|chalks|stencils|🎨",
    "After a grisaille underpainting, the picture already looks...|3D|blank|finished in color",
    "The light and dark underneath helps color look...|rich and solid|messy|invisible",
    "Painters can use a grisaille to practice...|light and shadow|spelling|math"
  ], "Think about working out the lights and darks before color."));

  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[6], c[8], c[10], c[12], c[14]]));
  c.push(MIX("Level 15 Challenge", [c[1], c[3], c[5], c[7], c[9], c[11], c[13], c[15], c[16], c[17]]));

  Object.assign(ART_LEVELS, { 13: a, 14: b, 15: c });
})();
