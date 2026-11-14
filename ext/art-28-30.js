// ext/art-28-30.js  Art & Drawing levels 28-30
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

  // ================= LEVEL 28 =================
  const a = [];
  a.push(L("Bernini and Baroque sculpture", [
    "Master of Rome|⛲|<b>Gian Lorenzo Bernini</b> (1598-1680) was the leading Baroque sculptor and architect in <b>Rome</b>. Popes and nobles hired him to make the city look grand and dramatic.",
    "Marble that seems soft|🗿|Baroque sculpture shows the <b>peak of the action</b>, not a calm pose. Bernini carved hard marble so skillfully that it looks soft, like cloth or hair.",
    "City as a stage|🏛️|He designed the curving colonnade around <b>St. Peter's Square</b>, the huge bronze canopy (<b>baldacchino</b>) over the altar inside St. Peter's, and the <b>Fountain of the Four Rivers</b> in Piazza Navona."
  ], [
    "Bernini worked mostly in which city?|Rome|Paris|Madrid|⛲",
    "Bernini lived in which century (most of his life)?|17th century|15th century|19th century",
    "Baroque sculpture usually shows a moment of...|peak action|calm stillness|a blank pause",
    "Bernini made hard marble look...|soft|rough|invisible",
    "The baldacchino in St. Peter's is a bronze...|canopy|bell|bridge",
    "The Fountain of the Four Rivers is in Piazza...|Navona|Venezia|Duomo",
    "Which river is one of the Four Rivers?|Nile|Thames|Seine",
    "The colonnade of St. Peter's Square forms an oval, or...|ellipse|triangle|spiral"
  ], "Think of the Baroque master who gave Rome fountains and a grand square."));
  a.push(L("Goya: court painter and critic", [
    "Painter to the king|👑|<b>Francisco Goya</b> (1746-1828) became court painter of <b>Spain</b>. His group portrait <i>The Family of Charles IV</i> (1800-01) is a clear homage to Velazquez's <i>Las Meninas</i>.",
    "Silence and sharp eyes|🦻|Around 1792 an illness left Goya <b>deaf</b>. His work grew more personal and questioning.",
    "Satire in prints|🦉|<i>Los Caprichos</i> (1799) is a set of <b>80 etchings</b> that mock the foolishness of society. Goya used <b>aquatint</b> for soft tones. One print is titled <i>The Sleep of Reason Produces Monsters</i>."
  ], [
    "Goya was court painter in which country?|Spain|Italy|Britain|👑",
    "Around 1792 Goya became...|deaf|left-handed|a priest",
    "Los Caprichos is a series of how many prints?|80|8|800",
    "Los Caprichos are mostly...|satire|landscapes|still lifes",
    "The aquatint technique gives prints soft...|tones|frames|scents",
    "The Family of Charles IV pays homage to Velazquez's...|Las Meninas|Mona Lisa|Night Watch",
    "The Sleep of Reason Produces Monsters is a...|print|statue|tapestry",
    "Goya was born in the...|1700s|1500s|1900s"
  ], "Think of the Spanish court painter who went deaf and made satirical prints."));
  a.push(L("Ingres versus Delacroix", [
    "A great debate|⚖️|In 19th-century France, artists argued: is <b>line</b> (careful drawing) or <b>color</b> (feeling and brushwork) more important? The debate echoed an older Poussin-versus-Rubens quarrel.",
    "The champion of line|✏️|<b>Jean-Auguste-Dominique Ingres</b> (1780-1867) followed Neoclassical ideals: smooth surfaces, firm outlines and polished portraits such as <i>Madame Moitessier</i>.",
    "The champion of color|🎨|<b>Eugene Delacroix</b> (1798-1863) led Romanticism. His loose brushwork and rich color fill <i>Liberty Leading the People</i> (1830), where Liberty carries the French tricolor flag. He visited Morocco in 1832."
  ], [
    "Which artist stood for line and careful drawing?|Ingres|Delacroix|Monet|⚖️",
    "Which artist stood for color and feeling?|Delacroix|Ingres|David",
    "Liberty Leading the People was painted in...|1830|1530|1930",
    "In that painting Liberty carries the French...|tricolor flag|violin|ladder",
    "Delacroix is linked to which movement?|Romanticism|Cubism|Pop art",
    "Ingres followed which style?|Neoclassicism|Fauvism|Dada",
    "Delacroix visited which country in 1832?|Morocco|Norway|Peru",
    "The older line-versus-color quarrel set Poussin against...|Rubens|Warhol|Klee"
  ], "Think of the great French quarrel between drawing and color."));
  a.push(L("William Blake", [
    "Poet and printmaker|📖|<b>William Blake</b> (1757-1827) lived in London. He trained as an engraver and was both a poet and a visual artist.",
    "Books he made himself|🖋️|Blake created <b>illuminated books</b> such as <i>Songs of Innocence</i> (1789) and <i>Songs of Experience</i> (1794). He printed words and pictures together from etched copper plates and hand-colored each page.",
    "Visions|🌟|Blake trusted <b>imagination</b> above everything. His image <i>The Ancient of Days</i> (1794) shows a figure leaning out of the sky with compasses to measure the world."
  ], [
    "Blake lived mainly in which city?|London|Vienna|Boston|📖",
    "Blake trained as an...|engraver|architect|sailor",
    "His illuminated books combined words and...|pictures|music|maps",
    "Songs of Innocence appeared in...|1789|1389|1989",
    "In The Ancient of Days the figure holds...|compasses|a violin|a sword",
    "Blake valued most...|imagination|money|speed",
    "Blake hand-colored his pages after printing from...|etched plates|photographs|stencils",
    "Blake was both an artist and a...|poet|pilot|banker"
  ], "Think of the London engraver who also wrote poems and printed both together."));
  a.push(L("Whistler and Aestheticism", [
    "Art for art's sake|🌃|<b>James McNeill Whistler</b> (1834-1903), an American working in London, believed a painting should be enjoyed for its color and harmony, not for a story. This idea is called <b>Aestheticism</b>.",
    "Musical titles|🎼|He named works like music: <i>Arrangement in Grey and Black No. 1</i> (1871, often called Whistler's Mother) and <i>Nocturne in Black and Gold: The Falling Rocket</i> (1875).",
    "Court case|⚖️|The critic John Ruskin said Whistler was asking a high price for flinging a pot of paint at the public. Whistler sued in 1878 and won, but was awarded just a <b>farthing</b> (a tiny coin)."
  ], [
    "Whistler said art should be enjoyed for its harmony of...|color and form|politics|price|🌃",
    "The idea of art for art's sake is called...|Aestheticism|Realism|Futurism",
    "Whistler's Mother has the musical title Arrangement in...|Grey and Black|Red and Gold|Blue and Pink",
    "Which critic attacked Whistler's Nocturne?|Ruskin|Vasari|Hockney",
    "Whistler won his lawsuit but was awarded a...|farthing|castle|medal",
    "Whistler was an American working in...|London|Moscow|Sydney",
    "His night scenes were called...|Nocturnes|Sonatas|Chapters",
    "The lawsuit took place in...|1878|1678|1978"
  ], "Think of the painter who titled pictures like pieces of music."));
  a.push(L("John Singer Sargent", [
    "An international artist|🌍|<b>John Singer Sargent</b> (1856-1925) was born in Florence, Italy, to American parents. He trained in Paris and later worked in London and the United States.",
    "Brilliant portraits|🖌️|Sargent painted glamorous portraits with fast, confident brushstrokes. <i>Madame X</i> (1884) caused a scandal at the Paris Salon, and he moved to London soon after.",
    "Painting light|🌸|In <i>Carnation, Lily, Lily, Rose</i> (1885-86) he painted children lighting paper lanterns at dusk in an English garden, working outdoors at the perfect time of day. Later he turned to <b>watercolor</b> for travel scenes."
  ], [
    "Sargent was born in which Italian city?|Florence|Naples|Turin|🌍",
    "Sargent's parents were...|American|Chinese|Peruvian",
    "Madame X caused a scandal at the Paris...|Salon|Zoo|Circus",
    "Sargent is best known for glamorous...|portraits|maps|totem poles",
    "In Carnation, Lily, Lily, Rose the children light paper...|lanterns|kites|boats",
    "Later in life Sargent often painted...|watercolors|woodcuts|mosaics",
    "Sargent's brushwork is fast and...|confident|hesitant|invisible",
    "Sargent moved to London after the scandal over...|Madame X|The Scream|Guernica"
  ], "Think of the American painter born in Italy who made glamorous portraits."));
  a.push(L("Mannerism and El Greco", [
    "After the High Renaissance|🌀|<b>Mannerism</b> (about 1520-1600) came after Raphael and Michelangelo. Artists made figures long, twisting and elegant, with bright, unusual colors and crowded space.",
    "A famous example|🦢|Parmigianino's <i>Madonna with the Long Neck</i> stretches the figures on purpose to create grace instead of realism.",
    "El Greco|🇬🇷|<b>El Greco</b> (\"the Greek\") was born on Crete in 1541, trained in Venice and settled in <b>Toledo, Spain</b>. His real name was Domenikos Theotokopoulos. His flame-like figures in <i>The Burial of the Count of Orgaz</i> and moody <i>View of Toledo</i> glow with intense color."
  ], [
    "Mannerism features figures that are...|elongated and elegant|tiny and plain|perfectly ordinary|🌀",
    "Mannerism came after the...|High Renaissance|Impressionists|Bauhaus",
    "El Greco means...|the Greek|the Giant|the Gold",
    "El Greco was born on which island?|Crete|Iceland|Malta",
    "El Greco settled in which Spanish city?|Toledo|Seville|Bilbao",
    "El Greco's real surname was...|Theotokopoulos|Rembrandt|Rodriguez",
    "Parmigianino painted Madonna with the...|Long Neck|Red Hat|Golden Shoe",
    "El Greco's colors are known to be...|intense|dull|pale gray"
  ], "Think of stretched, twisting figures in a style that followed the High Renaissance."));
  a.push(L("Donatello and the bronze horseman", [
    "Florence's sculptor|🐴|<b>Donatello</b> (about 1386-1466) was a Florentine sculptor who rediscovered ancient skills. He worked in bronze, marble and wood.",
    "Flat but deep|📏|He invented <b>rilievo schiacciato</b> (\"squashed relief\"), carving figures only a few millimeters deep, yet using perspective to make scenes seem very deep.",
    "A bronze horseman|🏇|His <b>Gattamelata</b> (about 1445-53) in Padua is the first large bronze statue of a rider on a horse since ancient Rome. It honors a mercenary general named Erasmo da Narni, nicknamed Gattamelata."
  ], [
    "Donatello came from which city?|Florence|Berlin|Cairo|🐴",
    "Rilievo schiacciato means...|squashed relief|giant statue|golden frame",
    "Gattamelata is a statue of a...|rider on a horse|dancing couple|flying bird",
    "Gattamelata is made mostly of...|bronze|ice|glass",
    "Gattamelata stands in the city of...|Padua|Athens|Dublin",
    "Gattamelata was the nickname of a...|general|painter|pope",
    "Donatello's horseman was the first big one since...|ancient Rome|the Vikings|the Ice Age",
    "Donatello lived in the...|1400s|1700s|1900s"
  ], "Think of the Florentine sculptor who made a bronze rider in Padua."));
  a.push(L("Papunya Tula painting", [
    "A school wall|🏫|In 1971 a teacher named <b>Geoffrey Bardon</b> at <b>Papunya</b>, in Australia's Northern Territory, encouraged Aboriginal men to paint a mural. It showed a Honey Ant Dreaming.",
    "A new art company|🎨|In 1972 the artists formed <b>Papunya Tula Artists</b>. They began using acrylic paint on boards and then canvas, an important step for modern Aboriginal art.",
    "Dots with meaning|🔴|Paintings often show <b>Dreamings</b>, ancestral stories linked to land. Artists used dots and symbols to tell stories while keeping some sacred meanings private."
  ], [
    "Papunya is in which country?|Australia|Canada|Chile|🏫",
    "Who encouraged the first mural?|Geoffrey Bardon|Tony Hawk|Leonardo da Vinci",
    "The first mural showed a Honey...|Ant Dreaming|Bee Dance|Pot Recipe",
    "The Papunya Tula artists company began in...|1972|1872|1672",
    "The artists soon painted with acrylic paint on...|canvas|glass|bark only",
    "Ancestral stories linked to land are called...|Dreamings|Chapters|Recipes",
    "Dots and symbols let artists tell a story and keep some meanings...|private|loud|secret from nobody",
    "Papunya Tula is an art...|company owned by artists|zoo|bank"
  ], "Think of a desert school mural that started a painting movement."));
  a.push(L("Ndebele house painting", [
    "Walls that speak|🏠|The <b>Ndebele</b> people of South Africa paint the outside walls of their homes with bold <b>geometric patterns</b>. Women traditionally did the painting.",
    "Color and outline|⬛|Early paints used natural earth colors. Today bright commercial paints are used, with thick <b>black outlines</b> around shapes.",
    "A world-famous artist|🚗|<b>Esther Mahlangu</b> carried the style to galleries and even painted a <b>BMW Art Car</b> in 1991. Ndebele women also make colorful beadwork."
  ], [
    "Ndebele house painting comes from which country?|South Africa|Norway|Japan|🏠",
    "The patterns are mostly...|geometric|photographic|invisible",
    "Traditionally the painters were...|women|robots|mayors",
    "Shapes are separated with thick...|black outlines|dotted fog|gold leaf",
    "Which artist painted a BMW Art Car?|Esther Mahlangu|Georgia O'Keeffe|Hilma af Klint",
    "The BMW car was painted in...|1991|1791|1891",
    "Ndebele women also make...|beadwork|oil portraits|stained glass",
    "Early Ndebele paints came from...|earth colors|neon tubes|computers"
  ], "Think of South African walls covered in bold, outlined geometric shapes."));
  a.push(L("Warli painting", [
    "Mud walls|🛖|The <b>Warli</b> people live in Maharashtra, India. They paint on mud walls, often for festivals and weddings, using white paint made from rice paste.",
    "Three shapes|🔺|Warli figures use only a <b>circle</b>, <b>triangle</b> and <b>square</b>. The circle and triangle come from nature (sun and moon, mountains and trees), and the square shows a sacred space.",
    "Dance and daily life|💃|Scenes show farming, hunting, festivals and circle dances. A bamboo stick chewed at the tip works as a brush. <b>Jivya Soma Mashe</b> helped bring Warli art to galleries."
  ], [
    "Warli painting comes from which country?|India|Brazil|Egypt|🛖",
    "Warli painters use white paint made from...|rice paste|snow|chalk dust only",
    "Warli figures are built from circles triangles and...|squares|stars|hearts",
    "In Warli art the square usually shows a...|sacred space|cloud|boat",
    "A traditional Warli brush is a chewed...|bamboo stick|feather|sponge",
    "Warli paintings are traditionally made on...|mud walls|glass|silk screens",
    "Which artist helped bring Warli art to galleries?|Jivya Soma Mashe|Banksy|Andy Warhol",
    "Common Warli scenes include circle...|dances|rocket launches|chess games"
  ], "Think of white stick figures made from simple shapes on mud walls."));
  a.push(L("Frank Gehry and Bilbao", [
    "A museum like a ship|🚢|<b>Frank Gehry</b> (born 1929 in Toronto) designed the <b>Guggenheim Museum Bilbao</b> in Spain. It opened in 1997 with curving shapes covered in thin <b>titanium</b> panels.",
    "Computers help|💻|The twisting forms were worked out with software first made for designing aircraft (called CATIA). Without it, such complicated curves would be very hard to build.",
    "The Bilbao effect|📈|The museum drew so many visitors that cities now talk about the <b>Bilbao effect</b>: a landmark building that revives a city. Gehry also designed the Walt Disney Concert Hall in Los Angeles."
  ], [
    "The Guggenheim Museum Bilbao is in which country?|Spain|Mexico|Italy|🚢",
    "Gehry's Bilbao museum is covered in...|titanium|bricks|grass",
    "It opened in...|1997|1897|2017",
    "The software for its curves was first used for...|aircraft|cookies|music",
    "The Bilbao effect means a landmark building helps...|revive a city|close a city|hide a river",
    "Gehry also designed the Walt Disney...|Concert Hall|Cinema Shop|Water Slide",
    "Gehry was born in...|Toronto|Madrid|Tokyo",
    "Gehry's style has curving and twisting...|forms|boxes only|tents"
  ], "Think of the shiny, curving museum that lifted a Spanish city."));
  a.push(L("David Hockney", [
    "Sunny California|🏊|<b>David Hockney</b> (born 1937 in Bradford, England) moved to California in the 1960s. <i>A Bigger Splash</i> (1967) shows a diving board and a splash, painted in smooth, flat acrylic.",
    "Photo collages|📷|Hockney made \"joiners\", collages of many photos taken from slightly different points. They show how we really see, with eyes that keep moving.",
    "Always experimenting|📱|He painted huge landscapes such as <i>Bigger Trees Near Warter</i> (2007) and later made drawings on an <b>iPad</b>. He often argued that old masters used optical tools."
  ], [
    "Hockney was born in which country?|England|Australia|Egypt|🏊",
    "A Bigger Splash shows a diving board and a...|splash|storm|dragon",
    "A Bigger Splash used flat...|acrylic|charcoal|encaustic",
    "Hockney's photo collages are called...|joiners|bouncers|blenders",
    "Hockney later drew on an...|iPad|abacus|typewriter",
    "Hockney moved to which US state?|California|Maine|Alaska",
    "A Bigger Splash is from...|1967|1867|1987",
    "Hockney's joiners show how our eyes keep...|moving|sleeping|closing"
  ], "Think of the British artist famous for swimming pools and photo collages."));
  a.push(L("Rietveld and the Red Blue Chair", [
    "De Stijl in 3D|🪑|<b>Gerrit Rietveld</b> (1888-1964) was a Dutch designer in the <b>De Stijl</b> group, which used primary colors, straight lines and simple planes.",
    "A chair as sculpture|🔴|His <b>Red Blue Chair</b> (about 1918-23) is made of flat boards and square rods. Each part is a separate piece, and the ends of the rods are painted yellow.",
    "A whole house|🏡|The <b>Schroder House</b> in Utrecht (1924) has sliding walls and flexible rooms. It is a UNESCO World Heritage Site."
  ], [
    "Rietveld was from which country?|Netherlands|Peru|Japan|🪑",
    "Rietveld belonged to which group?|De Stijl|Impressionists|Fauves",
    "The Red Blue Chair is built from flat boards and...|square rods|clay balls|glass bubbles",
    "The Schroder House is in the city of...|Utrecht|Cairo|Oslo",
    "The house has sliding walls and flexible...|rooms|chimneys|dragons",
    "De Stijl uses primary colors and straight...|lines|curls|clouds",
    "The Red Blue Chair looks like a...|sculpture|pillow|tent",
    "The Schroder House is a UNESCO World Heritage...|Site|Pizza|Song"
  ], "Think of the Dutch designer whose chair looks like a De Stijl painting you can sit on."));
  a.push(L("The Memphis Group", [
    "Milan, 1981|🎉|<b>Memphis</b> was a design group in Milan led by <b>Ettore Sottsass</b>. Its first show (1981) was a shock after years of plain, tasteful modern design.",
    "Playful design|🟣|Memphis furniture used bright colors, squiggly patterns, plastic laminate and odd geometric shapes. The Carlton bookcase looks like a colorful robot.",
    "A funny name|🎵|The group is said to have named itself after a Bob Dylan song playing during their first meeting. Memphis is a famous example of <b>postmodern design</b>."
  ], [
    "Memphis design began in which city?|Milan|Sydney|Chicago|🎉",
    "The group was led by...|Ettore Sottsass|Dieter Rams|Charles Eames",
    "Its first show was in...|1981|1881|1951",
    "Memphis furniture looked...|bright and playful|plain and gray|ancient",
    "The Carlton is a famous Memphis...|bookcase|lawnmower|violin",
    "Memphis is an example of...|postmodern design|Gothic design|cave art",
    "Memphis surfaces often use plastic...|laminate|marble|bamboo",
    "The group reacted against design that was too...|plain and tasteful|colorful|playful"
  ], "Think of Milan's group that made furniture look like a party."));
  a.push(L("Gutenberg and movable type", [
    "Printing in Europe|🖨️|<b>Johannes Gutenberg</b> of Mainz, Germany, developed a printing system with <b>movable metal type</b> around 1450. Each letter was a separate piece that could be reused.",
    "The Gutenberg Bible|📕|His famous Bible (about 1455) had two columns of text. Space was left so artists could add colored initials by hand.",
    "A flood of images|🌍|Printing made books cheaper and helped ideas spread fast. Woodcut and engraved pictures could now be printed with text, so images spread too. A few decades later Aldus Manutius in Venice popularized <b>italic</b> type and small, portable books."
  ], [
    "Gutenberg worked in which country?|Germany|Brazil|Egypt|🖨️",
    "His system used movable metal...|type|nails|coins",
    "Gutenberg's printing began around...|1450|1050|1850",
    "The Gutenberg Bible had how many columns per page?|two|nine|none",
    "Printing made books cheaper and helped ideas...|spread|vanish|freeze",
    "Colored initials in the Bible were added by...|hand|robot|photograph",
    "Which printer in Venice popularized italic type?|Aldus Manutius|Johannes Vermeer|Leonardo",
    "Each piece of movable type could be...|reused|eaten|worn"
  ], "Think of movable metal letters in a German workshop."));
  a.push(L("Transferring a drawing", [
    "Cartoons|📄|A <b>cartoon</b> in art means a full-size drawing made as a plan for a painting, tapestry or fresco. Fresco painters often drew it first on paper.",
    "Pouncing|⚫|In <b>pouncing</b> (also called spolvero), tiny holes are pricked along the lines of the cartoon. Powdered charcoal is dabbed through the holes, leaving dotted lines on the wall.",
    "Other ways|🔦|Artists also use graphite or carbon <b>transfer paper</b>, tracing, and <b>projectors</b> to copy a drawing onto a canvas. In fresco, painters worked in one day's section (<b>giornata</b>) while the plaster was wet."
  ], [
    "A full-size drawing used as a plan is a...|cartoon|brochure|logo|📄",
    "Pricking holes and dusting charcoal through them is...|pouncing|etching|casting",
    "Another word for pouncing is...|spolvero|giornata|sfumato",
    "A day's section of wet plaster in fresco is a...|giornata|gesso|glaze",
    "Pouncing leaves a line of...|dots|stripes|stars",
    "Transfer paper moves a drawing using graphite or...|carbon|water|sugar",
    "A projector is useful for copying a drawing to...|a canvas|a river|a cloud",
    "The cartoon is drawn on...|paper|water|sand"
  ], "Think of how a fresco painter gets a drawing onto a wall."));
  a.push(L("Designing an exhibition", [
    "Flow of visitors|🚶|An exhibition designer plans the path visitors take. Layouts may be <b>chronological</b> (by date) or <b>thematic</b> (by idea). Clear sightlines help people decide where to go.",
    "Hanging and lighting|💡|A common rule hangs works with their center about <b>57 inches</b> (145 cm) from the floor, near average eye level. Light must show the art without glare and without harming delicate works.",
    "Avoiding tiredness|🪑|Too many objects cause <b>museum fatigue</b>. Good designers add seating, breaks, and space, and use wall colors and text panels to guide the story."
  ], [
    "A layout arranged by date is...|chronological|thematic|random|🚶",
    "A layout arranged by ideas is...|thematic|chronological|haphazard",
    "A common hanging height centers works at about...|57 inches|7 inches|107 inches",
    "Too many objects can cause museum...|fatigue|snow|music",
    "Lighting should avoid...|glare|color|shadows of everyone",
    "Clear paths for seeing across a room are called...|sightlines|handlines|timelines",
    "Seating and rest spaces help prevent...|fatigue|fashion|color",
    "A designer plans the path visitors...|take|dream|cook"
  ], "Think of how a designer guides people through a gallery."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[3], a[4], a[6], a[8], a[9], a[10], a[12], a[13], a[15], a[17]]));
  a.push(MIX("Level 28 Challenge", [a[2], a[5], a[7], a[8], a[11], a[12], a[14], a[15], a[16], a[17], a[0]]));

  // ================= LEVEL 29 =================
  const b = [];
  b.push(L("Vasari and the first art history", [
    "Lives of the artists|📚|<b>Giorgio Vasari</b> (1511-1574) wrote <i>Lives of the Most Excellent Painters, Sculptors and Architects</i> (1550, enlarged in 1568). It is often called the first major book of art history.",
    "A story of progress|📈|Vasari told the story as a rise: art was reborn (<i>rinascita</i>, the root of \"Renaissance\") with Giotto, grew with later masters and reached perfection with <b>Michelangelo</b>. He favored artists from Tuscany, so his view is biased.",
    "More than a writer|🏛️|Vasari was also an artist and architect. He designed the <b>Uffizi</b> in Florence (begun 1560) and helped found an art academy there in 1563."
  ], [
    "Vasari's famous book is called Lives of the...|Artists|Saints|Kings|📚",
    "Vasari wrote in the...|1500s|1200s|1900s",
    "The word rinascita is the root of...|Renaissance|Baroque|Rococo",
    "Vasari said art reached perfection with...|Michelangelo|Warhol|Cezanne",
    "Vasari favored artists from...|Tuscany|Norway|Mexico",
    "Which Florentine building did Vasari design?|Uffizi|Eiffel Tower|Louvre",
    "Vasari told the story of art as a story of...|progress|decline only|accidents",
    "Vasari's book is biased because he favored...|his own region|no one|robots"
  ], "Think of the sixteenth-century Tuscan who wrote the first big history of artists."));
  b.push(L("Plato and Aristotle on imitation", [
    "Mimesis|🪞|<b>Mimesis</b> is the Greek word for imitation. Early thinkers asked: what is art, if it copies the world?",
    "Plato's worry|🛏️|<b>Plato</b> (about 428-348 BCE) said a painting of a bed copies a real bed, which itself copies the perfect idea (<b>Form</b>) of a bed. So art is a copy of a copy, far from truth.",
    "Aristotle's reply|🎭|<b>Aristotle</b> (384-322 BCE) thought imitation is natural and teaches us. In his <i>Poetics</i> he said tragedy can cause <b>catharsis</b>, a healthy release of strong feelings."
  ], [
    "Mimesis is the Greek word for...|imitation|color|building|🪞",
    "Who said art is a copy of a copy?|Plato|Aristotle|Vasari",
    "Plato's perfect ideas are called...|Forms|Frames|Folds",
    "Who wrote the Poetics?|Aristotle|Plato|Kant",
    "Catharsis means a release of...|feelings|paint|color",
    "Aristotle thought imitation is...|natural and useful|dangerous only|impossible",
    "Plato lived in ancient...|Greece|Peru|Japan",
    "Aristotle wrote about tragedy in the theater, a kind of...|drama|painting|pottery"
  ], "Think of two ancient Greek thinkers who disagreed about copying reality."));
  b.push(L("Kant, beauty and the sublime", [
    "Judging beauty|🌹|<b>Immanuel Kant</b> (1724-1804) wrote <i>Critique of Judgment</i> (1790). He said calling something beautiful feels personal, yet we expect others to agree.",
    "Disinterested pleasure|🧘|Kant said beauty gives a <b>disinterested</b> pleasure: you enjoy it without wanting to own it or use it. He described beauty as having \"purposiveness without a purpose\".",
    "The sublime|🌊|The <b>sublime</b> is a mix of awe and fear in front of something vast, like a storm or mountain range. Edmund Burke wrote about it first in 1757."
  ], [
    "Kant wrote Critique of...|Judgment|Color|Sculpture|🌹",
    "Kant said beauty gives a pleasure that is...|disinterested|expensive|loud",
    "Disinterested means you do not want to...|own or use it|look at it|talk about it",
    "The sublime is awe mixed with...|fear|boredom|humor",
    "Which topic is most sublime?|a huge storm at sea|a tidy desk|a plain cup",
    "Who wrote about the sublime in 1757?|Edmund Burke|Giotto|Rodin",
    "Kant lived in the...|1700s|1200s|2000s",
    "When we call something beautiful we expect others to...|agree|stay silent|buy it"
  ], "Think of the philosopher who separated beauty from wanting."));
  b.push(L("Danto and the artworld", [
    "Brillo Boxes|📦|In 1964 Andy Warhol showed <b>Brillo Boxes</b>, wooden copies of supermarket cartons. Philosopher <b>Arthur Danto</b> asked: why is one art, when the real carton is not?",
    "The artworld|🌐|In <i>The Artworld</i> (1964) Danto said seeing something as art needs a <b>theory</b> and knowledge of art history. George Dickie later proposed the <b>institutional theory</b>: the artworld (museums, critics, artists) grants art status.",
    "Earlier shock|🚰|The idea built on Marcel Duchamp's <b>readymades</b>, such as <i>Fountain</i> (1917), an ordinary object chosen as art. Danto later argued art history's single story of progress had come to an end."
  ], [
    "Warhol's Brillo Boxes were made of...|wood|real soap|ice|📦",
    "Who wrote The Artworld in 1964?|Arthur Danto|Vasari|Kant",
    "Danto said seeing art needs a...|theory|frame|price tag",
    "The institutional theory says art status comes from the...|artworld|weather|lottery",
    "Who proposed the institutional theory?|George Dickie|Plato|Hokusai",
    "Duchamp's ordinary chosen objects are called...|readymades|etchings|mobiles",
    "Duchamp's Fountain is from...|1917|1517|1997",
    "Danto asked why the Brillo Box is art while the real box is...|not|always|a statue"
  ], "Think of the philosopher who asked why a copy of a box can be art."));
  b.push(L("Barthes and the death of the author", [
    "Who decides meaning?|✍️|<b>Roland Barthes</b> (1915-1980) wrote <i>The Death of the Author</i> (1967). He argued that a work's meaning does not come only from what its maker intended, but also from the <b>reader or viewer</b>.",
    "Everyday myths|🍷|In <i>Mythologies</i> (1957) he studied ordinary things such as ads and wrestling as signs carrying hidden cultural messages.",
    "Studium and punctum|📷|In <i>Camera Lucida</i> (1980) Barthes wrote about photographs. The <b>studium</b> is the general interest we feel; the <b>punctum</b> is a small detail that unexpectedly pricks or moves us."
  ], [
    "Barthes wrote The Death of the...|Author|Painter|Museum|✍️",
    "Barthes said meaning also comes from the...|viewer|frame|price",
    "Mythologies studied everyday things as...|signs|animals|recipes",
    "In Camera Lucida the detail that pricks us is the...|punctum|studium|gesso",
    "The general interest in a photo is the...|studium|punctum|cartoon",
    "Camera Lucida is about...|photographs|sculpture|cooking",
    "Barthes was from...|France|Canada|Brazil",
    "The Death of the Author was published in...|1967|1767|1867"
  ], "Think of the French critic who gave viewers power over meaning."));
  b.push(L("Visual rhetoric in advertising", [
    "Three appeals|📣|Aristotle named three ways to persuade: <b>ethos</b> (trust and credibility), <b>pathos</b> (emotion) and <b>logos</b> (logic and facts). Ads use all three with images.",
    "Seeing the tricks|🔍|A celebrity in an ad uses ethos. A puppy or a family dinner uses pathos. A chart of results uses logos. Other tricks include visual metaphor (a car shown as a cheetah) and the <b>bandwagon</b> idea (\"everyone has one\").",
    "Be a critical viewer|🧠|Ask: who made this, who is it for, and what do they want me to do? Noticing the techniques helps you decide for yourself."
  ], [
    "Ethos is an appeal to...|credibility|emotion|numbers|📣",
    "Pathos is an appeal to...|emotion|credibility|numbers",
    "Logos is an appeal to...|logic and facts|fear only|rhythm",
    "A celebrity in an ad mostly uses...|ethos|logos|none of them",
    "A cute puppy in an ad mostly uses...|pathos|logos|ethos",
    "A chart of test results mostly uses...|logos|pathos|ethos",
    "Saying everyone owns one is the...|bandwagon|handlebar|gradient",
    "A car shown as a cheetah is a visual...|metaphor|inventory|receipt"
  ], "Think of the three persuasion types named by Aristotle."));
  b.push(L("The Guerrilla Girls", [
    "Masks and facts|🦍|The <b>Guerrilla Girls</b> formed in New York in 1985. These anonymous artists wear gorilla masks in public so people focus on their message, not on who they are.",
    "Posters with numbers|📊|They paste up posters with statistics showing how few women artists and artists of color were shown in museums and galleries. Humor and bold design made their point hard to ignore.",
    "Honoring others|🖼️|Members take names of past women artists, such as Frida Kahlo and Kathe Kollwitz, as pseudonyms. Their work is an example of <b>institutional critique</b>."
  ], [
    "The Guerrilla Girls formed in which city?|New York|Rome|Cairo|🦍",
    "They appear in public wearing...|gorilla masks|space suits|crowns",
    "They formed in...|1985|1685|1999",
    "Their posters mainly use...|statistics|poetry|maps",
    "They wanted museums to include more women and...|artists of color|robots|buildings",
    "Members take the names of...|past women artists|football teams|planets",
    "Art that questions museums and galleries is called institutional...|critique|sauce|repair",
    "Anonymous means people do not know their...|names|prices|colors"
  ], "Think of the anonymous poster-makers in animal masks."));
  b.push(L("Writing a project proposal", [
    "What a proposal includes|📝|Artists write proposals for grants, residencies and public commissions. A good one has a clear <b>title</b>, a short <b>description</b>, the <b>medium and size</b>, a <b>timeline</b>, a <b>budget</b>, and sample images.",
    "Clear and specific|🎯|Say what you will make, why it matters, and how you will do it. Use plain verbs and avoid vague words. Reviewers read many, so start with your strongest sentence.",
    "Budget and deadlines|💰|A budget lists materials, studio costs, shipping and your time. Check the <b>call for entries</b> and follow its rules exactly, including word counts and the deadline."
  ], [
    "A timeline shows...|when each step happens|how heavy the work is|who the viewers are|📝",
    "A budget lists...|costs|colors|compliments",
    "A call for entries is a...|public invitation to apply|type of paint|museum alarm",
    "Reviewers read many proposals, so start with your...|strongest sentence|longest paragraph|signature",
    "A proposal should say what you will...|make|forget|hide",
    "Rules in the call for entries should be followed...|exactly|loosely|never",
    "Sample images help reviewers see your...|work|lunch|address",
    "Vague words in a proposal are best...|avoided|doubled|capitalized"
  ], "Think of what a reviewer needs to decide whether to fund your project."));
  b.push(L("Surrealism and the unconscious", [
    "Dreams and the mind|💭|<b>Sigmund Freud</b> published <i>The Interpretation of Dreams</i> in 1899-1900, saying dreams reveal hidden thoughts of the <b>unconscious</b>. Artists were fascinated.",
    "The Surrealist manifesto|📜|In 1924 the poet <b>Andre Breton</b> wrote the <i>Manifesto of Surrealism</i>. Surrealists used <b>automatism</b>, drawing or writing without conscious control, and games like <b>exquisite corpse</b>, where each person adds to a drawing without seeing the rest.",
    "Dream images|🕰️|<b>Salvador Dali</b> painted <i>The Persistence of Memory</i> (1931) with melting watches in a strange landscape. He called his method \"paranoiac-critical\" and tried to put dream logic into precise detail."
  ], [
    "Who wrote The Interpretation of Dreams?|Freud|Breton|Dali|💭",
    "Freud said dreams reveal the...|unconscious|weather|price",
    "Who wrote the Manifesto of Surrealism?|Andre Breton|Georgia O'Keeffe|Hokusai",
    "The manifesto came out in...|1924|1824|1990",
    "Drawing without conscious control is called...|automatism|collage|fresco",
    "In exquisite corpse each person adds without seeing the...|rest|paper|clock",
    "The Persistence of Memory shows melting...|watches|candles|bananas",
    "The Persistence of Memory is by...|Dali|Monet|Giotto"
  ], "Think of the movement that tried to paint dreams and the mind's hidden side."));
  b.push(L("The social history of art", [
    "Art and society|👥|A <b>social history of art</b> asks who paid for art, who saw it, who was left out, and how money, class and politics shaped it, instead of focusing only on genius.",
    "The period eye|👁️|<b>Michael Baxandall</b> (1933-2008) wrote <i>Painting and Experience in Fifteenth-Century Italy</i> (1972). His idea of the <b>period eye</b> says the skills and habits of daily life shape how people see paintings.",
    "Example|🛢️|Merchants then judged barrel volumes by quick estimates of shape. Baxandall suggested this trained them to read volumes and proportions in painted figures and buildings."
  ], [
    "A social history of art asks who paid for and who saw...|art|only weather|only sunsets|👥",
    "Baxandall's idea is called the period...|eye|ear|nose",
    "The period eye says daily life shapes how people...|see art|breathe|walk",
    "Baxandall wrote about which century in Italy?|fifteenth|twelfth|twentieth",
    "Merchants in his example judged the volume of...|barrels|clouds|songs",
    "A social approach looks beyond the single...|genius|painting's frame|museum floor",
    "Who wrote Painting and Experience in Fifteenth-Century Italy?|Baxandall|Barthes|Vasari",
    "Class and politics are part of art's...|context|paint|lens cap"
  ], "Think of the approach that looks at money, class and daily life around art."));
  b.push(L("The art market", [
    "Two markets|💼|The <b>primary market</b> is where new work is sold for the first time, usually by galleries. The <b>secondary market</b> is resale, often at auction. Galleries traditionally keep about half of a sale.",
    "Auction houses|🔨|<b>Sotheby's</b> (founded 1744) and <b>Christie's</b> (1766) are famous auction houses in London. The <b>hammer price</b> is the final bid; the buyer pays extra fees called the buyer's premium. A <b>reserve</b> is the secret minimum the seller will accept.",
    "Value and trust|🔎|Prices depend on the artist, condition, rarity, demand and <b>provenance</b> (ownership history). In 2017 <i>Salvator Mundi</i>, attributed to Leonardo, sold at Christie's for about $450 million."
  ], [
    "First-time sales of new work are the...|primary market|secondary market|flea market|💼",
    "Resale at auction belongs to the...|secondary market|primary market|school market",
    "The final bid at an auction is the...|hammer price|brush price|soft price",
    "The secret minimum a seller accepts is the...|reserve|premium|proof",
    "Ownership history is called...|provenance|patina|palette",
    "Which is an auction house?|Christie's|Louvre|Bauhaus",
    "Salvator Mundi is attributed to...|Leonardo|Warhol|Kahlo",
    "Extra fees paid by the buyer are the buyer's...|premium|palette|plinth"
  ], "Think about the difference between selling new work and reselling it."));
  b.push(L("Condition reports and registrars", [
    "Writing down damage|📋|A <b>condition report</b> records an artwork's state: cracks, <b>craquelure</b> (fine crack network), flaking, <b>foxing</b> (brown spots on paper), losses and scratches. It uses photos and clear words.",
    "Who keeps track|🗂️|The <b>registrar</b> manages records, loans, shipping, insurance and the <b>accession number</b>, a unique ID such as 1998.12.3 (year, group, object).",
    "Safe conditions|🌡️|Museums keep temperature near 20 C and humidity near 50 percent. Fragile paper and textiles get low light, about 50 lux. Reports are made when art arrives and leaves, so any change is noticed."
  ], [
    "A condition report records an artwork's...|state|price|audience|📋",
    "Fine networks of cracks in paint are called...|craquelure|glaze|impasto",
    "Brown spots on old paper are called...|foxing|frottage|tinting",
    "The staff member who manages records and loans is the...|registrar|guard|photographer",
    "A unique ID for a museum object is an...|accession number|zip code|phone number",
    "Condition reports are made when art arrives and...|leaves|sleeps|laughs",
    "Fragile paper needs...|low light|bright sun|a heater",
    "Museums keep humidity around...|50 percent|5 percent|95 percent"
  ], "Think of the paperwork that records any damage on a loan."));
  b.push(L("Museum labels and interpretation", [
    "What is on a label|🏷️|A basic label gives the <b>artist</b>, <b>title</b>, <b>date</b>, <b>medium</b>, size and <b>credit line</b> (such as \"Gift of the Smith family\"). Interpretive text adds meaning.",
    "Writing well|✏️|Good labels are short (often 50 to 75 words), use plain language at about an eighth-grade level, and lead with one big idea. They invite looking rather than telling people what to feel.",
    "Easy to read|🔠|Large print (at least 18 point), strong contrast and a good height make labels readable for everyone. Several voices, like artists' quotes, can enrich the story."
  ], [
    "The line that credits a gift is the...|credit line|time line|skyline|🏷️",
    "Labels are often how many words?|50 to 75|500 to 750|5 to 7",
    "A good label leads with one big...|idea|number|price",
    "Large print is at least...|18 point|4 point|9 point",
    "The material of a work is its...|medium|median|margin",
    "Labels should have strong...|contrast|clutter|fog",
    "Interpretive text adds...|meaning|damage|noise",
    "Plain language is about which grade level?|eighth|doctoral|second"
  ], "Think of the short text beside an artwork in a museum."));
  b.push(L("Accessible exhibitions", [
    "Design for everyone|♿|<b>Universal design</b> means planning from the start so as many people as possible can use a space. Ramps, wide paths, seating and clear signs help visitors of all abilities.",
    "More than one way in|👂|Offer <b>audio description</b> for blind visitors, captions and transcripts for deaf visitors, <b>tactile</b> models to touch, large print and plain-language guides. Quiet hours help visitors sensitive to noise and crowds.",
    "Digital too|💻|Websites need <b>alt text</b> for images, readable colors and keyboard navigation. Involve people with disabilities in testing, not after the fact."
  ], [
    "Planning a space for as many people as possible is...|universal design|crowd control|cloud design|♿",
    "Audio description helps visitors who are...|blind|taller|tired of walking",
    "Captions help visitors who are...|deaf|cold|early",
    "Models you can touch are...|tactile|invisible|digital",
    "Alt text describes...|images|prices|rooms",
    "Quiet hours help visitors sensitive to...|noise|color|chairs",
    "People with disabilities should help...|test the design|clean the floor|hide the signs",
    "Ramps and wide paths help visitors...|move through|pay less|see less"
  ], "Think of ways everyone can enjoy an exhibition."));
  b.push(L("The Great Exhibition of 1851", [
    "A world's fair|🎡|The <b>Great Exhibition</b> of 1851 in London's Hyde Park showed products from many nations in the glass-and-iron <b>Crystal Palace</b>, designed by Joseph Paxton. Prince Albert helped organize it, and millions visited.",
    "A design worry|🧵|Many critics thought machine-made objects were overdecorated and badly designed. This led to calls for better design education.",
    "A new museum|🏛️|Henry Cole, an organizer, helped found a museum to teach good design, which began in 1852 and grew into London's <b>Victoria and Albert Museum</b> (V&A)."
  ], [
    "The Great Exhibition was held in which city?|London|Chicago|Vienna|🎡",
    "It took place in...|1851|1751|1951",
    "The exhibition hall was the Crystal...|Palace|Cave|Tower",
    "Who designed the Crystal Palace?|Joseph Paxton|Henry Moore|Gaudi",
    "Which museum grew from this effort?|Victoria and Albert|Prado|Hermitage",
    "Henry Cole wanted better design...|education|weather|prices",
    "Prince Albert helped...|organize it|paint it|burn it",
    "Critics worried that machine objects were too...|overdecorated|invisible|quiet"
  ], "Think of London's glass palace and the museum it inspired."));
  b.push(L("Charles and Ray Eames", [
    "A design couple|🪑|<b>Charles</b> and <b>Ray Eames</b> were American designers working in California from the 1940s. They tested materials and treated design as problem-solving.",
    "Famous chairs|💺|They developed chairs from molded plywood (such as the LCW, 1946). The <b>Eames Lounge Chair and Ottoman</b> (1956) was made for the Herman Miller company with plywood shells and leather cushions.",
    "More than chairs|🎬|They built the <b>Eames House</b> (1949) from factory parts and made films such as <i>Powers of Ten</i> (1977), which zooms in and out by factors of ten."
  ], [
    "The Eameses worked mostly in which state?|California|Texas|Maine|🪑",
    "Their early chairs used molded...|plywood|steel only|clay",
    "The Lounge Chair came out in...|1956|1856|1986",
    "The Lounge Chair was made for Herman...|Miller|Cole|Hopper",
    "Powers of Ten zooms by factors of...|ten|two|nine hundred",
    "The Eames House was built from factory...|parts|ice|bamboo only",
    "The Eameses treated design as...|problem-solving|decoration only|luck",
    "Charles and Ray were a married...|couple|football team|painter's club"
  ], "Think of the California couple behind the famous plywood and leather chairs."));
  b.push(L("Type classification", [
    "Families of type|🔤|Type designers sort serif fonts into groups. <b>Old Style</b> (Garamond, 1530s) has angled stress and soft curves, based on early Renaissance printing.",
    "Transitional and modern|📖|<b>Transitional</b> type (Baskerville, 1757) is sharper. <b>Modern</b> (Didone) type such as Bodoni (1798) has vertical stress and very thin hairline serifs. <b>Slab serif</b> (Clarendon, 1845) has heavy, block-like serifs.",
    "Without serifs|🅰️|<b>Sans-serif</b> type has no serifs. Early examples include Akzidenz-Grotesk (1896), then Futura (1927) with its geometric shapes and Helvetica (1957)."
  ], [
    "Garamond is an example of...|Old Style|Slab serif|Script|🔤",
    "Baskerville is a...|Transitional typeface|Pixel font|Blackletter",
    "Bodoni has thin...|hairline serifs|rounded corners|curly tails",
    "Clarendon is a...|slab serif|sans-serif|script",
    "Fonts with no serifs are...|sans-serif|slab serif|Old Style",
    "Futura is known for...|geometric shapes|handwriting|heavy serifs",
    "Bodoni is from the year...|1798|1498|1998",
    "Old Style type is based on early Renaissance...|printing|robots|calculators"
  ], "Think of the family names that sort typefaces by their serifs."));
  b.push(L("Photography, truth and ethics", [
    "Can a photo lie?|📸|A photograph looks like proof, but choices change meaning: what is framed, what is left out, the <b>caption</b>, and the crop. Photojournalists follow codes of ethics, such as those of the NPPA.",
    "Honest practice|✅|Do not stage events and present them as real. Do not add or remove objects. Basic adjustments like cropping or brightness are allowed; changes that alter facts are not. Respect consent and privacy.",
    "Proving authenticity|🔐|Metadata (the data stored in a file) and standards such as <b>Content Credentials</b> help show where an image came from and how it changed."
  ], [
    "A caption that is wrong can change a photo's...|meaning|weight|temperature|📸",
    "Staging an event and calling it real is...|not ethical|ethical|required",
    "Basic cropping and brightness are usually...|allowed|forbidden always|illegal",
    "Information stored in an image file is...|metadata|margins|mats",
    "Content Credentials help show an image's...|origin and edits|favorite color|price",
    "Adding an object that was never there is...|manipulation|honest editing|framing",
    "Photojournalists should respect consent and...|privacy|speed|flash",
    "The NPPA is an association of...|photojournalists|painters|sculptors"
  ], "Think about what makes a news photograph trustworthy."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[5], b[6], b[8], b[10], b[11], b[13], b[15], b[16]]));
  b.push(MIX("Level 29 Challenge", [b[4], b[7], b[9], b[12], b[14], b[17], b[0], b[3], b[6], b[11], b[16]]));

  // ================= LEVEL 30 =================
  const c = [];
  c.push(L("Jacques-Louis David", [
    "Painter of the Revolution era|🇫🇷|<b>Jacques-Louis David</b> (1748-1825) was the leading French Neoclassical painter. He later became painter to <b>Napoleon</b>.",
    "Oath of the Horatii|⚔️|<i>The Oath of the Horatii</i> (1784) shows three brothers pledging loyalty to Rome. Strong outlines, a shallow stage-like space and a plain Roman setting make the scene clear. Firm male poses contrast with the soft, curved women.",
    "Napoleon's artist|👑|David painted the huge <i>Coronation of Napoleon</i> (1805-07), set in Notre-Dame. After Napoleon fell, David lived in exile in Brussels from 1816."
  ], [
    "David led which style?|Neoclassicism|Impressionism|Dada|🇫🇷",
    "The Oath of the Horatii is from...|1784|1584|1984",
    "The Oath of the Horatii shows brothers pledging loyalty to...|Rome|Spain|Egypt",
    "David became painter to...|Napoleon|Queen Victoria|Nero",
    "The Coronation of Napoleon is set in...|Notre-Dame|Big Ben|Alhambra",
    "David spent his exile in...|Brussels|Lima|Kyoto",
    "The space in Horatii is shallow, like a...|stage|swamp|cloud",
    "David used strong...|outlines|fog|haze"
  ], "Think of the French Neoclassical painter who served Napoleon."));
  c.push(L("Muisca gold of Colombia", [
    "Gold for the gods|🪙|The <b>Muisca</b> lived in the highlands of Colombia. They made small gold figures called <b>tunjos</b> as offerings, and used <b>tumbaga</b>, an alloy of gold and copper.",
    "Lost-wax craft|🕯️|Goldsmiths used <b>lost-wax casting</b>: a wax model coated with clay was heated, the wax melted away, and metal poured in. The result was fine, detailed work.",
    "The raft and El Dorado|🛶|The <b>Muisca Raft</b> (found in 1969) shows a chief with attendants on a boat. It is linked to a ceremony at Lake Guatavita and to the European legend of <b>El Dorado</b> (\"the golden one\"). Colombia's Gold Museum in Bogota holds tens of thousands of pieces."
  ], [
    "The Muisca lived in which country?|Colombia|Kenya|Poland|🪙",
    "Small Muisca offering figures are called...|tunjos|moai|mandalas",
    "Tumbaga is an alloy of gold and...|copper|iron|ice",
    "The Muisca used lost-wax...|casting|weaving|marbling",
    "The Muisca Raft was found in...|1969|1469|1869",
    "The legend linked to the raft is El...|Dorado|Cid|Nino",
    "The ceremony took place at Lake...|Guatavita|Titicaca|Geneva",
    "In lost-wax casting the wax is...|melted away|painted|eaten"
  ], "Think of tiny gold figures and a legend of a golden chief."));
  c.push(L("Poussin and Claude: ideal landscape", [
    "Nature as a stage|🌄|<b>Nicolas Poussin</b> (1594-1665) was a French painter who worked in Rome. His landscapes are ordered, with calm geometry and figures from ancient stories.",
    "Golden light|🌅|<b>Claude Lorrain</b> (about 1600-1682) filled his harbors and valleys with warm glowing light and soft distance. Both painted <b>ideal landscapes</b>, improved versions of nature rather than literal views.",
    "A long influence|🎨|J.M.W. Turner admired Claude so much that he asked for two of his paintings to hang beside Claude's in the National Gallery in London after his death."
  ], [
    "Poussin was a French painter who worked in...|Rome|Dublin|Cairo|🌄",
    "Claude Lorrain is famous for glowing...|light|shadows only|statues",
    "An ideal landscape is an improved version of...|nature|a map|a portrait",
    "Which artist asked to be hung beside Claude?|Turner|Rothko|Warhol",
    "Turner's paintings hang in the National Gallery in...|London|Paris|Prague",
    "Poussin's landscapes feel calm and...|ordered|chaotic|blurry",
    "Poussin lived in the...|1600s|1300s|1900s",
    "Claude often painted harbors and...|valleys|space stations|deserts of ice"
  ], "Think of two seventeenth-century masters of the improved, golden landscape."));
  c.push(L("Corot and the Barbizon school", [
    "Painters in the forest|🌲|Around 1830-1870 a group of painters worked near the village of <b>Barbizon</b>, by the Forest of Fontainebleau, France. They painted nature as it looked, not as an ancient stage set.",
    "Paint in tubes|🧴|Collapsible metal <b>paint tubes</b> (patented in 1841) made it easy to carry paint outdoors. This helped both the Barbizon painters and later the Impressionists.",
    "Corot|🌫️|<b>Camille Corot</b> (1796-1875) painted silvery, misty landscapes with soft grays and greens. He bridged the older landscape tradition and Impressionism, and many younger artists admired him."
  ], [
    "The Barbizon school painted near the Forest of...|Fontainebleau|Sherwood|Black|🌲",
    "Barbizon is a village in...|France|Chile|Nepal",
    "Paint tubes were patented in...|1841|1641|1941",
    "Tubes made painting easier...|outdoors|underwater|in the dark",
    "Corot painted misty landscapes in silvery...|grays and greens|reds and oranges|neon colors",
    "Corot bridged older landscape and...|Impressionism|Pop art|Cubism",
    "Barbizon painters wanted nature to look like...|nature|a stage|a coin",
    "Corot lived in the...|1800s|1500s|2000s"
  ], "Think of the forest village near Paris where landscape painters gathered."));
  c.push(L("Mackintosh and the Glasgow Style", [
    "A Scottish designer|🏴|<b>Charles Rennie Mackintosh</b> (1868-1928) was a Scottish architect and designer. His <b>Glasgow School of Art</b> was designed in 1896 and built in two phases up to 1909.",
    "The Glasgow Style|🌹|With his wife <b>Margaret Macdonald</b>, her sister Frances and Herbert MacNair (the \"Glasgow Four\"), he developed slim, elongated forms, tall chair backs and stylized roses.",
    "Hill House|🏠|Mackintosh designed Hill House in Helensburgh (1902-04), planning rooms, furniture and decoration as one unified design. The Glasgow Style sits between Art Nouveau and early modern design."
  ], [
    "Mackintosh was from which country?|Scotland|Spain|Argentina|🏴",
    "Mackintosh designed the Glasgow School of...|Art|Music|Law",
    "His wife and fellow artist was Margaret...|Macdonald|Mead|Moore",
    "His chairs are known for tall...|backs|wheels|wings",
    "A stylized flower often used was the...|rose|cactus|palm",
    "Hill House is in Helensburgh and was completed around...|1904|1704|1994",
    "The group of four was the Glasgow...|Four|Seven|Dozen",
    "Mackintosh planned rooms and furniture as one...|unified design|collection of mismatched pieces|tent"
  ], "Think of the Scottish designer with tall chairs and stylized roses."));
  c.push(L("Kathe Kollwitz", [
    "Printmaker of people|🖤|<b>Kathe Kollwitz</b> (1867-1945) was a German artist known for prints, drawings and sculpture. She made strong black-and-white lithographs, etchings and woodcuts.",
    "Caring about families|👪|Her subjects included working families, mothers and children, and the grief of loss. The Weavers cycle (1893-97) was inspired by a play about poor weavers.",
    "Public voice|🏛️|In 1919 she became the first woman elected to the Prussian Academy of Arts. Her sculpture <i>Grieving Parents</i> (1932) honors her son Peter, who died in 1914; it stands in a cemetery in Belgium."
  ], [
    "Kollwitz was from which country?|Germany|Japan|Brazil|🖤",
    "Kollwitz is best known for...|prints|stained glass|jewelry",
    "Her Weavers cycle was inspired by a...|play|painting|cartoon",
    "Her subjects included working families and...|mothers and children|rocket ships|sports stars",
    "In 1919 she became the first woman elected to the Prussian...|Academy of Arts|Parliament|Army",
    "Her sculpture Grieving Parents honors her...|son|teacher|dog",
    "Grieving Parents is in a cemetery in...|Belgium|Mexico|India",
    "Kollwitz often worked in black and...|white|gold|pink"
  ], "Think of the German printmaker who showed working families and grief."));
  c.push(L("Hard-edge painting and Post-Painterly Abstraction", [
    "Flat color, sharp edges|🔷|<b>Hard-edge painting</b> (term coined in 1959) uses flat areas of color with crisp edges. There is no visible brushwork and little feeling of depth.",
    "Ellsworth Kelly|🟩|<b>Ellsworth Kelly</b> (1923-2015) turned shapes seen in the world, like shadows and windows, into simple fields of color. In <i>Spectrum Colors Arranged by Chance</i> (1951) he used chance to place color squares.",
    "A new label|🏷️|In 1964 critic Clement Greenberg organized <b>Post-Painterly Abstraction</b>, an exhibition grouping artists like Kenneth Noland and Frank Stella who moved away from the emotional brushwork of Abstract Expressionism. Stella said of his stripes: \"What you see is what you see.\""
  ], [
    "Hard-edge painting has crisp edges and...|flat color|messy blending|heavy impasto|🔷",
    "The term hard-edge appeared in...|1959|1759|1859",
    "Ellsworth Kelly used chance to arrange...|color squares|marble|clay",
    "Post-Painterly Abstraction was organized by critic...|Clement Greenberg|Giorgio Vasari|John Ruskin",
    "Which artist painted Black Paintings with stripes?|Frank Stella|Rembrandt|Goya",
    "Hard-edge painting avoids visible...|brushwork|color|canvas",
    "Kenneth Noland is known for target-like...|circles|portraits|landscapes",
    "Post-Painterly artists moved away from the emotional brushwork of...|Abstract Expressionism|Pop art|Realism"
  ], "Think of paintings with flat color and razor-sharp edges."));
  c.push(L("Joseph Beuys and social sculpture", [
    "Everyone an artist|🌳|<b>Joseph Beuys</b> (1921-1986) was a German artist who said \"every human being is an artist.\" He created a wide idea of art as shaping society.",
    "Social sculpture|🤝|<b>Social sculpture</b> means art that changes how people live together: through teaching, talking, planting and working. His materials included felt and fat, chosen for warmth and energy.",
    "7000 Oaks|🪨|For <b>Documenta 7</b> in Kassel (1982) Beuys began planting 7,000 oak trees, each next to a basalt stone. The project was finished in 1987, after his death."
  ], [
    "Beuys was from which country?|Germany|Egypt|Canada|🌳",
    "Beuys said every human being is an...|artist|astronaut|inventor",
    "Art that shapes how people live together is a social...|sculpture|painting|poster",
    "Two materials he used were felt and...|fat|steel|glass",
    "7000 Oaks began at Documenta in...|Kassel|Venice|Lyon",
    "Each oak was planted next to a...|basalt stone|statue|fountain",
    "7000 Oaks began in...|1982|1682|1882",
    "7000 Oaks was completed after Beuys...|died|moved|retired"
  ], "Think of the German artist who planted thousands of trees as art."));
  c.push(L("Eva Hesse and soft materials", [
    "A childhood journey|🧳|<b>Eva Hesse</b> (1936-1970) was born in Hamburg, Germany. As a child she was sent to safety in the Netherlands and later reached New York with her family in 1939.",
    "Post-Minimalism|🧵|Hesse softened the cold geometry of Minimalism with <b>latex</b>, fiberglass, rope and string. Her work looks handmade, a little fragile and full of repetition.",
    "Famous works|🪣|<i>Hang Up</i> (1966) is an empty frame with a steel rod curving into the room. <i>Repetition Nineteen III</i> (1968) uses 19 fiberglass buckets. She died at only 34, but her work influenced many artists."
  ], [
    "Eva Hesse was born in...|Germany|Spain|Kenya|🧳",
    "She settled in which US city?|New York|Seattle|Denver",
    "Hesse softened Minimalism using materials like...|latex and rope|marble only|gold only",
    "Her style is called Post-...|Minimalism|Impressionism|Cubism",
    "Hang Up is mainly an empty...|frame|bucket|doll",
    "Repetition Nineteen III uses 19...|buckets|chairs|mirrors",
    "Hesse died aged...|34|84|64",
    "Hesse's work looks handmade and a bit...|fragile|sharp|rocky"
  ], "Think of the artist who made soft, repeating forms from latex and fiberglass."));
  c.push(L("Jenny Holzer and text art", [
    "Words as art|💬|<b>Jenny Holzer</b> (born 1950) makes art from <b>text</b>. Her series <i>Truisms</i> (1977-79) lists short statements, printed as posters and pasted on New York streets.",
    "Light and scale|🌃|She later used LED signs, stone benches and giant projections of text on buildings, placing messages where crowds pass by. In 1990 she represented the United States at the Venice Biennale and won the Golden Lion.",
    "Reading in public|👀|Holzer's words are short and often anonymous, so viewers must decide what they think of each line. Her work shows how public space can host ideas."
  ], [
    "Holzer's art is mainly made from...|text|clay|photographs|💬",
    "Her early series is called...|Truisms|Nocturnes|Jingles",
    "The Truisms were first printed as...|posters|statues|coins",
    "Holzer later used LED...|signs|carpets|candles",
    "In 1990 she won the Golden Lion at the Venice...|Biennale|Zoo|Opera",
    "Holzer's work is placed in public...|space|attics|vaults",
    "Her words are short and often...|anonymous|secret codes|very long",
    "Holzer was born in...|1950|1650|1850"
  ], "Think of the artist who uses short written statements in public places."));
  c.push(L("Tarsila do Amaral", [
    "A Brazilian modernist|🇧🇷|<b>Tarsila do Amaral</b> (1886-1973) was a leading painter of Brazilian Modernism. She studied in Paris, including with the Cubist Fernand Leger, then brought bold simplified forms back to Brazil.",
    "Abaporu|🌵|Her painting <i>Abaporu</i> (1928) shows a giant figure with tiny head, huge foot and a cactus. The name comes from Tupi-Guarani and is often translated \"the man who eats.\"",
    "Eating influences|🍽️|The painting inspired the <b>Anthropophagic movement</b> (1928). As a metaphor, Brazilian artists would \"devour\" foreign influences and transform them into something new and their own."
  ], [
    "Tarsila do Amaral was from...|Brazil|Norway|Japan|🇧🇷",
    "She studied in Paris with Fernand...|Leger|Seurat|Warhol",
    "Abaporu was painted in...|1928|1728|1998",
    "In Abaporu a cactus stands beside a...|giant figure|tiny house|boat",
    "The Anthropophagic movement used the idea of devouring foreign...|influences|foods|books",
    "Abaporu comes from the language Tupi-...|Guarani|Latin|Greek",
    "Tarsila helped shape Brazilian...|Modernism|Baroque|Gothic",
    "Anthropophagic ideas were a...|metaphor|recipe|invention for ovens"
  ], "Think of the Brazilian painter whose giant-footed figure inspired a movement."));
  c.push(L("Biennales, Documenta and art fairs", [
    "Big shows|🌐|A <b>biennale</b> is an exhibition held every two years. The <b>Venice Biennale</b> began in 1895; countries show work in national pavilions, and top prizes are called Golden Lions.",
    "More big events|🗓️|<b>Documenta</b> in Kassel, Germany, began in 1955 and takes place every five years. The <b>Sao Paulo Bienal</b> started in 1951 in Brazil. Their curators choose themes and invite artists worldwide.",
    "Art fairs|🛒|An <b>art fair</b> is a market where galleries rent booths to sell work. <b>Art Basel</b> began in Switzerland in 1970. Biennials focus on ideas and art; fairs focus on sales."
  ], [
    "A biennale takes place every...|two years|ten years|day|🌐",
    "The Venice Biennale began in...|1895|1595|1995",
    "Documenta takes place in...|Kassel|Dallas|Seoul",
    "Documenta happens every...|five years|year|week",
    "Venice national exhibits are shown in...|pavilions|igloos|cathedrals",
    "Art Basel began in which country?|Switzerland|Chile|Egypt",
    "Galleries rent booths at an art...|fair|forest|tree",
    "Which event is mainly a market for selling?|an art fair|a biennale|a school play"
  ], "Think of the big international exhibitions that occur on a schedule."));
  c.push(L("Memes, remix and appropriation", [
    "Where memes came from|😂|Richard Dawkins coined the word <b>meme</b> in 1976 for an idea or behavior that spreads and changes. Internet memes are often images with new captions.",
    "Remix culture|🔁|Scholar Lawrence Lessig described <b>remix</b> culture: people create by transforming existing media. Artists have borrowed for a long time: Duchamp, Warhol and Sherrie Levine all used <b>appropriation</b>.",
    "Staying fair|⚖️|Using others' work responsibly means asking if you changed it (<b>transformative use</b>), giving credit, and checking licenses such as <b>Creative Commons</b>, started in 2001."
  ], [
    "Who coined the word meme in 1976?|Richard Dawkins|Andy Warhol|Lawrence Lessig|😂",
    "Making new things by transforming existing media is...|remix|pottery|etching",
    "Borrowing existing images for new art is...|appropriation|perspective|layout",
    "Creative Commons is a set of...|licenses|brushes|museums",
    "Creative Commons started in...|2001|1801|1951",
    "Adding new meaning to existing work is...|transformative use|copying exactly|hiding it",
    "Who described remix culture?|Lawrence Lessig|Kant|Vasari",
    "When you use others' work you should give...|credit|only a nickname|a haircut"
  ], "Think of how ideas and images spread and change online."));
  c.push(L("Propaganda posters", [
    "Posters that persuade|📢|<b>Propaganda</b> posters try to move people to act or believe. Famous examples include <b>James Montgomery Flagg's</b> \"I Want YOU\" Uncle Sam poster (1917) and J. Howard Miller's \"We Can Do It!\" (1943).",
    "Techniques|🎯|Posters use bold simple symbols, direct address (a pointing finger), strong color, large slogans and emotional appeals. A British poster, <i>Keep Calm and Carry On</i> (1939), was printed but hardly ever shown, and was rediscovered around 2000.",
    "Critical reading|🧠|Ask: who made it, who is it for, what do they want me to do, and what is left out? Understanding persuasion helps you read any image carefully."
  ], [
    "Uncle Sam's I Want YOU poster is from...|1917|1717|1990|📢",
    "Who made the Uncle Sam poster?|James Montgomery Flagg|J. Howard Miller|Toulouse-Lautrec",
    "We Can Do It! was made by...|J. Howard Miller|Norman Rockwell|Hokusai",
    "Posters often use direct address, such as a...|pointing finger|long essay|riddle",
    "Keep Calm and Carry On was created in...|1939|1639|1999",
    "Propaganda tries to persuade people to act or...|believe|sleep|vanish",
    "A critical reader asks who made the poster and for...|whom|how loudly|how long",
    "Propaganda posters use simple, bold...|symbols|footnotes|maps"
  ], "Think of the posters that tried to convince crowds to act."));
  c.push(L("Isotype and picture statistics", [
    "A picture language|📊|<b>Otto Neurath</b> (1882-1945), an Austrian thinker, created <b>Isotype</b> in Vienna in the 1920s. The name means International System Of Typographic Picture Education.",
    "The team|🤝|Neurath worked with Marie Reidemeister (later Marie Neurath), who planned the work, and artist <b>Gerd Arntz</b>, who drew thousands of simple pictograms.",
    "Rule of counting|🔢|In Isotype, one icon stands for a fixed number. To show more, <b>repeat the icon</b> instead of making it bigger, so comparisons are fair. These ideas shaped modern infographics and signs."
  ], [
    "Isotype was created by Otto...|Neurath|Rietveld|Warhol|📊",
    "Isotype began in which city?|Vienna|Houston|Osaka",
    "Isotype began in the...|1920s|1820s|1990s",
    "To show more in Isotype you...|repeat the icon|enlarge the icon|erase the icon",
    "Which artist drew many Isotype pictograms?|Gerd Arntz|Egon Schiele|Georges Seurat",
    "In Isotype one icon stands for a...|fixed number|different amount each time|mood",
    "Isotype influenced modern...|infographics|oil painting|ceramics",
    "Pictograms are simple...|pictures|poems|songs"
  ], "Think of the Viennese system that counted with repeated little pictures."));
  c.push(L("Scandinavian design", [
    "Simple and warm|🪵|In the mid-1900s designers in Denmark, Sweden, Finland and Norway created furniture and household goods that were simple, useful and made with natural materials such as wood.",
    "Classic pieces|🥚|<b>Arne Jacobsen</b> (Denmark) designed the Ant chair (1952) and Egg chair (1958). <b>Hans Wegner</b> designed the Wishbone chair (1949). <b>Alvar Aalto</b> (Finland) bent plywood for his Paimio chair (1932).",
    "Design for everyone|🌍|A touring exhibition, <i>Design in Scandinavia</i>, introduced the style to North America in the 1950s. The idea of good design for ordinary homes also shaped IKEA, founded in Sweden in 1943."
  ], [
    "Which is a Scandinavian country?|Denmark|Spain|Peru|🪵",
    "Who designed the Egg chair?|Arne Jacobsen|Dieter Rams|Zaha Hadid",
    "Hans Wegner designed the...|Wishbone chair|Tulip chair|Red Blue Chair",
    "Alvar Aalto was from...|Finland|Italy|Portugal",
    "Aalto bent plywood for his Paimio...|chair|clock|lamp",
    "Scandinavian furniture often uses natural...|wood|neon plastic|tin only",
    "IKEA was founded in...|Sweden|Egypt|Chile",
    "The touring exhibition introduced the style to North...|America|Pole|Moon"
  ], "Think of the northern European style of simple wood furniture."));
  c.push(L("Editions and artist proofs", [
    "Numbering prints|🔢|In a limited edition, each print is numbered like <b>12/50</b>, meaning the twelfth print of an edition of fifty. The number is traditionally written in pencil, with the artist's signature.",
    "Proofs|🧪|<b>Artist's proofs</b> (AP) are a few extra prints kept by the artist outside the numbered edition, often about 10 percent. A <b>BAT</b> (<i>bon a tirer</i>, \"good to print\") is the approved proof that the printer matches.",
    "Closing the edition|🔒|When the edition is complete, many artists cancel the plate or block so no more can be made. This keeps the edition limited and protects its value."
  ], [
    "In 12/50 the number 50 is the edition...|size|date|price|🔢",
    "Edition numbers are traditionally written in...|pencil|neon|chalk on walls",
    "AP stands for artist's...|proof|plate|palette",
    "AP prints are kept outside the numbered...|edition|frame|gallery",
    "BAT means good to...|print|sell|frame",
    "The BAT is the proof the printer must...|match|ignore|burn",
    "Cancelling the plate keeps an edition...|limited|bigger|cheaper",
    "In 12/50 the number 12 means the...|twelfth print|twelfth year|twelfth plate"
  ], "Think of how printmakers number and sign a limited run."));
  c.push(L("Digitizing and sharing collections", [
    "Capturing art|📷|Museums photograph 2D works with even lighting, a color target and a scale bar. 3D objects can be recorded with <b>photogrammetry</b>, combining many photos into a model.",
    "Records and sharing|🗃️|Good <b>metadata</b> (title, artist, date, size) makes images searchable. In 2017 the Metropolitan Museum began <b>Open Access</b>, releasing images of public-domain works to use freely under a CC0 dedication. The <b>IIIF</b> standard lets viewers zoom and compare images from different museums.",
    "Keeping files safe|💾|Preservation uses the <b>3-2-1 rule</b>: three copies, on two kinds of storage, with one stored elsewhere. Archives keep uncompressed <b>TIFF</b> masters and make smaller <b>JPEG</b> copies for the web."
  ], [
    "Combining many photos into a 3D model is...|photogrammetry|fresco|pouncing|📷",
    "Information like title and date is...|metadata|margin|mortar",
    "The Met began Open Access in...|2017|1917|2117",
    "In the 3-2-1 rule you keep how many copies?|three|one|nine",
    "A common uncompressed master file format is...|TIFF|GIF|MP3",
    "Smaller web copies are often...|JPEG|TIFF|SVG",
    "IIIF lets viewers zoom and...|compare images|stir paint|print money",
    "A color target and scale bar help show true...|color and size|price|owner"
  ], "Think of how museums photograph and share their collections."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[3], c[4], c[6], c[8], c[9], c[11], c[12], c[14], c[16], c[17]]));
  c.push(MIX("Level 30 Challenge", [c[2], c[5], c[7], c[10], c[13], c[15], c[16], c[17], c[0], c[4], c[9]]));

  Object.assign(ART_LEVELS, { 28: a, 29: b, 30: c });
})();
