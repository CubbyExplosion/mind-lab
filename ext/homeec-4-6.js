// ext/homeec-4-6.js  Home Economics & Cooking levels 4-6
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
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
      return { text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...wr]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`] };
    };
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const G = (title, slides, gen) => {
    const make = () => gen();
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
  a.push(L("Tools and their jobs", [
    "Kitchen tools|🥄🍴🔪|Every tool has a job. A <b>whisk</b> mixes and beats. A <b>spatula</b> flips food. A <b>colander</b> drains water.",
    "More tools|🥣🧂|A <b>rolling pin</b> flattens dough. A <b>grater</b> makes tiny shreds of cheese. A <b>peeler</b> takes off skin.",
    "Pick the tool|✏️|Ask what you need to do, then pick the tool made for that job."
  ], [
    "Which tool drains water from pasta?|colander|🍝||whisk,rolling pin",
    "Which tool flattens cookie dough?|rolling pin|🥖||colander,grater",
    "Which tool flips a pancake?|spatula|🥞||whisk,peeler",
    "Which tool beats eggs?|whisk|🥚||spatula,colander",
    "Which tool shreds cheese?|grater|🧀||rolling pin,whisk",
    "Which tool takes the skin off a carrot?|peeler|🥕||spatula,grater",
    "Which tool measures flour?|measuring cup|🥣||colander,whisk",
    "Which tool serves soup into bowls?|ladle|🍲||rolling pin,peeler"
  ], "Think about what the tool does."));
  a.push(L("Cooking words", [
    "Cooking words|👩‍🍳|<b>Stir</b> means to mix round and round. <b>Pour</b> means to tip a liquid. <b>Spread</b> means to smooth it out.",
    "More words|🧈🥒|<b>Chop</b> means to cut into pieces. <b>Peel</b> means to take off the skin. <b>Mash</b> means to squish until soft.",
    "Match it|✏️|Match the word to the action. Peel a banana. Mash a potato. Spread butter."
  ], [
    "What do you do to a banana before you eat it?|peel|🍌||stir,pour",
    "What do you do to potatoes to make them soft and squished?|mash|🥔||spread,pour",
    "What do you do with a spoon in a bowl of batter?|stir|🥣||peel,mash",
    "What do you do to put butter on toast?|spread|🍞||mash,chop",
    "What do you do to milk to put it in a glass?|pour|🥛||chop,peel",
    "What do you do to a carrot to make small pieces?|chop|🥕||pour,stir",
    "What does it mean to crack an egg?|break the shell open|🥚||mix it round,take off skin",
    "What does it mean to sprinkle?|scatter a little on top|🧂||mix it round,squish it"
  ], "Picture yourself doing the action."));
  a.push(G("Teaspoons and tablespoons", [
    "Two spoons|🥄|A <b>teaspoon</b> (tsp) is small. A <b>tablespoon</b> (Tbsp) is bigger.",
    "The rule|3️⃣|<b>3 teaspoons = 1 tablespoon.</b>",
    "Skip count|✏️|To change tablespoons to teaspoons, count by 3s. 2 tablespoons: 3, 6. That is 6 teaspoons."
  ], () => {
    const k = ri(3, 9);
    return { text: `3 teaspoons make 1 tablespoon. How many teaspoons are in ${k} tablespoons?`, visual: "🥄", answer: 3 * k,
      hints: ["Each tablespoon is the same as a few teaspoons.", "Skip count by 3s, one count for each tablespoon.", "Example: 2 tablespoons. Count by 3s: 3, 6. That is 6 teaspoons. Now do yours."] };
  }));
  a.push(L("Washing hands", [
    "Why wash?|🧼🦠|Tiny germs live on our hands. We cannot see them, but they can make us sick.",
    "How to wash|🚰|Wet your hands, use soap, and rub for <b>20 seconds</b>. Wash fronts, backs, between fingers and under nails. Rinse and dry.",
    "When to wash|⏰|Wash before cooking, after touching raw meat or eggs, after the bathroom, and after sneezing."
  ], [
    "How long should you scrub your hands with soap?|20 seconds|🧼||2 seconds,5 seconds",
    "When should you wash your hands?|Before you cook|🍳||Never,Only on holidays",
    "You touched raw chicken. What next?|Wash your hands with soap|🍗||Wipe them on your shirt,Touch the fridge",
    "What do we use with water to clean our hands?|soap|🚰||juice,sand",
    "Germs are...|too tiny to see|🦠||as big as a bug,only on the floor",
    "Where do germs hide on hands?|Between fingers and under nails|🖐️||Only on the palm,Nowhere",
    "You sneezed into your hands. What should you do?|Wash them|🤧||Keep cooking,Wipe on the towel",
    "What do you use to dry your hands?|A clean towel|🧻||Your pants,The dog"
  ], "Think about germs and soap."));
  a.push(L("Hot and sharp safety", [
    "Hot things|🔥|The <b>stove</b>, <b>oven</b>, pots and pans can burn you. Always ask a grown-up for help.",
    "Sharp things|🔪|Knives and graters can cut. Kids use safe tools and ask a grown-up for knife jobs.",
    "Safe habits|🧤|Use oven mitts, turn pot handles inward, and keep long hair and sleeves back."
  ], [
    "Who takes a hot pan out of the oven?|A grown-up with oven mitts|🧤||A kid alone,Nobody",
    "Which way should a pot handle point?|Inward over the stove|🍳||Out over the edge,Toward the floor",
    "What can you wear to hold a hot dish?|oven mitts|🧤||a scarf,socks",
    "Who uses the big sharp knife?|A grown-up|🔪||A toddler,A pet",
    "What should you do if you touch a hot pan and get a burn?|Run it under cool water and tell a grown-up|🚰||Hide it,Put butter on it",
    "Is it okay to leave the stove on and walk away?|No|🔥||Yes,Only for a day",
    "What should you do with long hair when cooking?|Tie it back|💇||Let it hang over the stove,Cut it",
    "A kid wants to use the oven. What first?|Ask a grown-up|🙋||Turn it to the highest setting,Just start"
  ], "Safe helpers ask a grown-up."));
  a.push(L("Food groups", [
    "Five groups|🍎🥦🍞🥩🥛|Foods come in groups: <b>fruits</b>, <b>vegetables</b>, <b>grains</b>, <b>protein</b> and <b>dairy</b>.",
    "Examples|🥕🍚🍗|Carrots are vegetables. Rice is a grain. Chicken is protein. Yogurt is dairy.",
    "Why?|💪|Each group gives your body different good things to grow and have energy."
  ], [
    "Which group is an apple in?|fruit|🍎||dairy,grain",
    "Which group is broccoli in?|vegetable|🥦||fruit,protein",
    "Which group is bread in?|grain|🍞||dairy,fruit",
    "Which group are eggs in?|protein|🥚||grain,fruit",
    "Which group is cheese in?|dairy|🧀||vegetable,grain",
    "Which group is rice in?|grain|🍚||protein,fruit",
    "Which group are beans in?|protein|🫘||dairy,fruit",
    "Which group is a banana in?|fruit|🍌||vegetable,dairy"
  ], "Think about where the food comes from."));
  a.push(L("Everyday foods and treats", [
    "Everyday foods|🥗|Some foods are for <b>every day</b>: fruits, veggies, whole grains, milk and protein.",
    "Sometimes foods|🍰|Cake, candy and soda are <b>sometimes</b> foods. They taste good, but they have lots of sugar.",
    "Choose|✅|Eat everyday foods most of the time. Enjoy treats once in a while."
  ], [
    "Which is an everyday food?|carrot sticks|🥕||candy,soda",
    "Which is a sometimes food?|cupcake|🧁||apple,broccoli",
    "Which snack is the healthier choice?|an apple|🍎||a candy bar,a lollipop",
    "Which drink is best most days?|water|💧||soda,sugary punch",
    "What has lots of added sugar?|candy|🍬||peas,milk",
    "How often should you eat treats?|Once in a while|🍪||All day,Never ever",
    "Which is the best breakfast choice?|oatmeal with fruit|🥣||donut only,candy",
    "Which is an everyday food?|yogurt|🥛||gummy bears,cake"
  ], "Which food grows from the ground or comes from milk, not a candy shop?"));
  a.push(L("Meals of the day", [
    "Three meals|🌅☀️🌙|We eat <b>breakfast</b> in the morning, <b>lunch</b> in the middle of the day and <b>dinner</b> in the evening.",
    "Snacks|🍎|A <b>snack</b> is a small bite between meals to keep your energy up.",
    "Good choices|🥣|Breakfast gives you energy for the day. Pick foods like oatmeal, eggs or fruit."
  ], [
    "Which meal is eaten first in the day?|breakfast|🌅||dinner,lunch",
    "Which meal is eaten in the evening?|dinner|🌙||breakfast,lunch",
    "Which meal is in the middle of the day?|lunch|☀️||breakfast,dinner",
    "What is a small bite between meals?|a snack|🍎||a dinner,a feast",
    "Which is a good breakfast?|oatmeal and fruit|🥣||only candy,nothing at all",
    "Why do we eat breakfast?|It gives us energy|⚡||It is a rule for no reason,To skip lunch",
    "Which is a healthy snack?|cheese and crackers|🧀||a candy bar,soda",
    "Which meal comes last?|dinner|🍽️||breakfast,lunch"
  ], "Think about the time of day."));
  a.push(G("Double the recipe", [
    "Double|2️⃣|<b>Double</b> means two times as much. If a recipe makes one batch, double makes two batches.",
    "How to double|➕|Add the number to itself. 2 + 2 = 4, so double 2 is 4.",
    "Try it|✏️|A recipe uses 1 egg. Double it: 1 + 1 = 2 eggs."
  ], () => {
    const k = ri(2, 5), f = pick(["eggs", "cups of flour", "scoops of oats", "slices of cheese", "spoons of honey"]);
    return { text: `A recipe uses ${k} ${f}. You want to double the recipe. How many ${f} do you need?`, visual: "👩‍🍳", answer: 2 * k,
      hints: ["Double means two times as much.", "Add the number to itself.", "Example: A recipe uses 7 grapes. Double: 7 + 7 = 14. Now do yours."] };
  }));
  a.push(G("Baking time math", [
    "Time in the kitchen|⏲️|Recipes tell us how many <b>minutes</b> to bake or cool. A timer helps us not forget.",
    "Add the times|➕|Baking 10 minutes and then cooling 5 minutes takes 10 + 5 minutes.",
    "Count on|✏️|Start with the bigger number and count on the smaller one."
  ], () => {
    const x = pick([10, 15, 20]), y = pick([5, 10, 15]), f = pick(["Cookies", "Muffins", "Brownies"]);
    return { text: `${f} bake for ${x} minutes and then cool for ${y} minutes. How many minutes in all?`, visual: "⏲️", answer: x + y,
      hints: ["We are putting two times together.", "Add the baking minutes and the cooling minutes.", "Example: Bake 7 minutes and cool 5 minutes. 7 + 5 = 12 minutes. Now do yours."] };
  }));
  a.push(G("Sharing food equally", [
    "Fair shares|🍕|Sharing equally means everyone gets the same amount.",
    "Divide|➗|If 6 cookies are shared by 2 friends, each gets 3 because 3 + 3 = 6.",
    "Check|✅|Multiply to check. Each share times the number of friends should give the total."
  ], () => {
    const p = ri(2, 5), e = ri(2, 4), em = pick(["🍪", "🍓", "🧁", "🍇"]);
    return { text: `${p * e} snacks are shared equally by ${p} friends. How many snacks does each friend get?`, visual: em.repeat(p * e), answer: e,
      hints: ["Equal shares means everyone gets the same.", "Make groups with the same number in each. How many groups? One for each friend.", "Example: 10 grapes for 2 friends. 5 + 5 = 10, so 5 each. Now do yours."] };
  }));
  a.push(L("Setting a table", [
    "Place setting|🍽️|A plate goes in the middle. The <b>fork</b> goes on the <b>left</b>. The <b>knife</b> and <b>spoon</b> go on the <b>right</b>.",
    "Cup and napkin|🥤|The cup goes at the top right, above the knife. The napkin goes on the left or under the fork.",
    "The knife|🔪|The sharp edge of the knife faces the plate."
  ], [
    "Which side of the plate does the fork go on?|left|🍴||right,top",
    "Which side of the plate does the knife go on?|right|🔪||left,bottom",
    "Which side of the plate does the spoon go on?|right|🥄||left,top",
    "Where does the plate go?|in the middle|🍽️||on the floor,on the chair",
    "Which way does the knife blade face?|toward the plate|🔪||away from the plate,up in the air",
    "Where does the cup go?|top right|🥤||bottom left,on the plate",
    "Where can the napkin go?|on the left or under the fork|🧻||on the knife,in the cup",
    "Who needs a plate, fork and cup?|each person at the table|👨‍👩‍👧||only grown-ups,only one person"
  ], "Remember: fork on the left, knife and spoon on the right."));
  a.push(L("Table manners", [
    "Be polite|🙏|Good manners make meals nice for everyone. Say <b>please</b> and <b>thank you</b>.",
    "At the table|🍽️|Wait for everyone to be served. Chew with your mouth closed. Use your napkin.",
    "Be kind|😊|Do not make fun of food. Say \"No, thank you\" nicely if you do not want something."
  ], [
    "What words are polite when you ask for food?|please and thank you|🙏||give me,hurry up",
    "How should you chew?|with your mouth closed|😁||with your mouth open,loudly",
    "What is the napkin for?|wiping your mouth and hands|🧻||wiping the floor,a hat",
    "Someone gives you food you do not want. What do you say?|No, thank you|🙂||Yuck,Take it away",
    "When should you start eating?|when everyone is served or ready|🍽️||the moment you sit,before the food is made",
    "Where do your elbows stay while eating?|off the table|🧍||on the plate,in the soup",
    "What do you do after the meal?|ask to be excused|✋||run away,throw your plate",
    "If someone cooked for you, you say...|thank you|❤️||nothing,that was boring"
  ], "Pick the kind and polite answer."));
  a.push(G("Shopping math", [
    "At the store|🛒|Things cost money. We add prices to find the total.",
    "Adding prices|➕|Milk costs $3 and eggs cost $2. 3 + 2 = $5 in all.",
    "Stay in budget|💵|A <b>budget</b> is how much money you plan to spend."
  ], () => {
    const x = ri(1, 6), y = ri(1, 6), A = pick(["apples", "bread", "milk", "cheese"]), B = pick(["eggs", "rice", "carrots", "pasta"]);
    return { text: `${A} cost $${x} and ${B} cost $${y}. What is the total in dollars?`, visual: "🛒", answer: x + y,
      hints: ["The total means we put the prices together.", "Add the two prices.", "Example: Juice costs $6 and oats cost $7. 6 + 7 = $13. Now do yours."] };
  }));
  a.push(L("Grocery store aisles", [
    "Sections|🏪|A store has sections. <b>Produce</b> has fruits and vegetables. The <b>dairy</b> section has milk and cheese.",
    "More sections|🥫|The <b>bakery</b> has bread. <b>Canned goods</b> has soup and beans. The <b>freezer</b> aisle has ice cream.",
    "Using a list|📝|A shopping list helps you find what you need fast."
  ], [
    "Where do you find apples?|produce|🍎||dairy,bakery",
    "Where do you find milk?|dairy|🥛||produce,bakery",
    "Where do you find fresh bread?|bakery|🥖||freezer,produce",
    "Where do you find canned beans?|canned goods|🥫||produce,dairy",
    "Where do you find frozen peas?|freezer aisle|🧊||bakery,produce",
    "Where do you find cheese?|dairy|🧀||bakery,canned goods",
    "Where do you find carrots?|produce|🥕||freezer aisle,dairy",
    "What helps you remember what to buy?|a shopping list|📝||a toy,a hat"
  ], "Think about where the store keeps it."));
  a.push(L("Laundry steps", [
    "Laundry|🧺|Clean clothes take steps: <b>sort</b>, <b>wash</b>, <b>dry</b>, <b>fold</b> and <b>put away</b>.",
    "Sorting|👕|Sort <b>whites</b> from <b>colors</b> and <b>darks</b> so colors do not run onto light clothes.",
    "Soap|🫧|Use the right amount of soap. Too much leaves suds behind."
  ], [
    "What is the first step of laundry?|sort the clothes|🧺||fold them,put them away",
    "Which clothes go together in one wash?|all whites|👕||white socks and a red shirt,shoes",
    "After washing, what goes next?|dry them|🌀||sort them again,hide them",
    "What do you do after the clothes are dry?|fold them|👚||throw them in a pile,wash them again",
    "Where do clean clothes go at the end?|in drawers or the closet|🚪||on the floor,under the bed",
    "Why do we sort colors from whites?|so colors do not stain light clothes|🎨||for fun,so they shrink",
    "What does soap do in the washer?|helps get clothes clean|🫧||makes them dirty,nothing",
    "Muddy socks go in...|the laundry basket|🧦||the fridge,the toy box"
  ], "Put the steps in order in your mind."));
  a.push(L("Sewing tools and stitches", [
    "Sewing kit|🧵|A sewing kit has <b>needles</b>, <b>thread</b>, <b>pins</b>, <b>scissors</b> and buttons.",
    "A stitch|🪡|Each in-and-out pass of the needle makes a <b>stitch</b>. A row of simple stitches is a <b>running stitch</b>.",
    "Be careful|⚠️|Needles and pins are sharp. A grown-up helps. Keep pins in a pin cushion."
  ], [
    "What do you pull through the fabric with a needle?|thread|🧵||water,paper",
    "Where do you keep pins and needles?|a pin cushion|📌||your pocket,the floor",
    "What do you call one pass of the needle through fabric?|a stitch|🪡||a crack,a splash",
    "Which tool cuts fabric?|scissors|✂️||a spoon,a whisk",
    "What does a button do on a shirt?|fasten the shirt|🔘||make noise,nothing",
    "Who helps a kid use a needle?|a grown-up|🙋||nobody,a stranger",
    "What is a row of in-and-out stitches called?|a running stitch|🧵||a spaghetti stitch,a skip",
    "What should you do at the end of sewing?|tie a knot|🪢||pull the thread out,throw it"
  ], "Think about sewing safety and tools."));
  a.push(L("Family chores", [
    "Everyone helps|🏠|A family shares jobs. Helping at home is being <b>responsible</b>.",
    "Kid jobs|🧹|Kids can set the table, feed a pet, make a bed or put toys away.",
    "A habit|📅|Doing a chore every day, like making your bed, builds a good habit."
  ], [
    "Which job can a kid do?|put toys away|🧸||drive the car,cut with a sharp knife",
    "What does making your bed help with?|a tidy room|🛏️||a messy room,nothing",
    "Who should help clean up after dinner?|everyone in the family|🍽️||only the dog,nobody",
    "What do pets need every day?|food and water|🐶||homework,a phone",
    "Which is a chore?|taking out the trash|🗑️||playing a game,watching a show",
    "Being responsible means...|doing your job without being nagged|⭐||ignoring jobs,leaving a mess",
    "Where do dirty dishes go?|the sink or dishwasher|🍽️||under the couch,in the yard",
    "What should you do with dirty clothes?|put them in the laundry basket|🧺||hide them,leave them on the stairs"
  ], "Pick the helpful answer."));
  a.push(MIX("Mixed practice", [a[0], a[3], a[5], a[8], a[11]]));
  a.push(MIX("Level 4 Challenge", [a[2], a[4], a[6], a[9], a[10], a[13], a[14], a[16]]));

  // ================= LEVEL 5 =================
  const b = [];
  b.push(G("Cups, pints and quarts", [
    "Bigger measures|🥛|<b>2 cups = 1 pint</b>. <b>2 pints = 1 quart</b>. So <b>4 cups = 1 quart</b>.",
    "Gallon|🫙|<b>4 quarts = 1 gallon</b>. A gallon of milk is a big jug.",
    "Multiply|✖️|To change pints to cups, count by 2s. To change quarts to cups, count by 4s."
  ], () => {
    if (Math.random() < 0.5) { const k = ri(3, 8); return { text: `1 pint is 2 cups. How many cups are in ${k} pints?`, visual: "🥛", answer: 2 * k,
      hints: ["Each pint has the same number of cups.", "Count by 2s once for each pint.", "Example: 2 pints. Count by 2s: 2, 4. That is 4 cups. Now do yours."] }; }
    const k = ri(2, 5); return { text: `1 quart is 4 cups. How many cups are in ${k} quarts?`, visual: "🥛", answer: 4 * k,
      hints: ["Each quart has the same number of cups.", "Count by 4s once for each quart.", "Example: 7 quarts. Count by 4s seven times: 4, 8, 12, 16, 20, 24, 28. That is 28 cups. Now do yours."] };
  }));
  b.push(L("Recipe abbreviations", [
    "Short forms|📖|Recipes use short forms. <b>tsp</b> = teaspoon. <b>Tbsp</b> = tablespoon. <b>c</b> = cup.",
    "More short forms|⚖️|<b>oz</b> = ounce. <b>lb</b> = pound. <b>pt</b> = pint. <b>qt</b> = quart. <b>gal</b> = gallon.",
    "Careful|⚠️|Capital T or Tbsp is the big spoon. Small t or tsp is the small spoon."
  ], [
    "What does tsp mean?|teaspoon|🥄||tablespoon,cup",
    "What does Tbsp mean?|tablespoon|🥄||teaspoon,pound",
    "What does c mean in a recipe?|cup|🥣||can,cook",
    "What does oz mean?|ounce|⚖️||orange zest,ounce of oil only",
    "What does lb mean?|pound|⚖️||liter,ladle",
    "What does qt mean?|quart|🥛||quarter,quick",
    "What does pt mean?|pint|🥛||pot,pound",
    "What does gal mean?|gallon|🫙||gallery,gallop"
  ], "Look at the letters and think what word fits."));
  b.push(G("Quarter cups", [
    "Four quarters|¼|A <b>quarter cup</b> (¼ c) is one of four equal parts of a cup.",
    "Count them|4️⃣|<b>4 quarter cups = 1 cup</b>. Count by 4s to change cups into quarter cups.",
    "Other way|🔁|To change quarter cups into cups, split into groups of 4."
  ], () => {
    if (Math.random() < 0.5) { const k = ri(2, 5); return { text: `You have a ¼ cup scoop. How many scoops fill ${k} cups?`, visual: "¼", answer: 4 * k,
      hints: ["Each whole cup holds the same number of quarter scoops.", "Count by 4s once for every cup.", "Example: 6 cups need 6 groups of 4: 4, 8, 12, 16, 20, 24 scoops. Now do yours."] }; }
    const k = ri(2, 5); return { text: `You added ${4 * k} quarter cups of flour. How many whole cups is that?`, visual: "¼", answer: k,
      hints: ["Every 4 quarter cups make one whole cup.", "Make groups of 4 and count the groups.", "Example: 28 quarter cups. Groups of 4: 7 groups. So 7 cups. Now do yours."] };
  }));
  b.push(G("Fluid ounces", [
    "Ounces of liquid|🥤|We measure liquids in <b>fluid ounces</b> (fl oz).",
    "The rule|8️⃣|<b>1 cup = 8 fluid ounces.</b>",
    "Count by 8s|✏️|2 cups = 8 + 8 = 16 fl oz. For ounces to cups, make groups of 8."
  ], () => {
    if (Math.random() < 0.5) { const k = ri(2, 6); return { text: `1 cup is 8 fluid ounces. How many fluid ounces are in ${k} cups?`, visual: "🥤", answer: 8 * k,
      hints: ["Each cup has the same number of ounces.", "Count by 8s once for every cup.", "Example: 7 cups. Count by 8s: 8, 16, 24, 32, 40, 48, 56. That is 56. Now do yours."] }; }
    const k = ri(2, 6); return { text: `A pitcher holds ${8 * k} fluid ounces. How many cups is that?`, visual: "🥤", answer: k,
      hints: ["One cup is 8 ounces. How many groups of 8 are there?", "Count by 8s until you reach the total. Count how many jumps.", "Example: 56 ounces. 8, 16, 24, 32, 40, 48, 56 is 7 jumps. 7 cups. Now do yours."] };
  }));
  b.push(L("Nutrients", [
    "Nutrients|🥗|<b>Nutrients</b> are the good things in food that our bodies need.",
    "Big three|💪|<b>Carbohydrates</b> give quick energy. <b>Protein</b> builds and fixes muscles. <b>Fats</b> give lasting energy and help the body use some vitamins.",
    "Also|💧|We need <b>water</b>, <b>vitamins</b> and <b>minerals</b> too."
  ], [
    "Which nutrient builds and fixes muscles?|protein|💪||water,sugar only",
    "Which nutrient gives us quick energy?|carbohydrates|⚡||vitamins,protein",
    "Which food is a good source of protein?|chicken|🍗||soda,candy",
    "Which food is full of carbohydrates?|bread|🍞||an egg white,water",
    "What do we call good things in food that our bodies need?|nutrients|🥗||germs,wrappers",
    "What does the body need most to stay hydrated?|water|💧||juice only,soda",
    "Which food has healthy fats?|avocado|🥑||celery,plain water",
    "Which food is a good source of protein?|beans|🫘||lollipops,jelly"
  ], "Think about what each nutrient does."));
  b.push(L("Vitamins and minerals", [
    "Tiny helpers|🍊|<b>Vitamins</b> and <b>minerals</b> are small nutrients with big jobs.",
    "Where to find them|🥛🥕|<b>Calcium</b> in milk and cheese helps bones and teeth. <b>Vitamin A</b> in carrots helps eyes. <b>Vitamin C</b> in oranges helps your body heal.",
    "More|🍌|<b>Potassium</b> in bananas helps muscles. <b>Iron</b> in beans and meat helps blood carry air around the body."
  ], [
    "Which food has lots of vitamin C?|orange|🍊||plain bread,butter",
    "Which mineral builds strong bones?|calcium|🦴||sugar,salt",
    "Which food gives calcium?|milk|🥛||soda,candy",
    "Which food has vitamin A for your eyes?|carrot|🥕||cracker,candy",
    "Which food has potassium?|banana|🍌||lollipop,plain rice cake",
    "Which food has iron?|beans|🫘||soda,ice cubes",
    "What helps teeth and bones?|calcium|🦷||candy,soda",
    "Which food has vitamin C?|strawberries|🍓||white bread,butter"
  ], "Think of the color and the job."));
  b.push(L("Ways to cook", [
    "Cooking methods|🔥|We cook food in different ways. <b>Bake</b> in an oven. <b>Boil</b> in bubbling hot water. <b>Fry</b> in a pan with oil.",
    "More ways|♨️|<b>Steam</b> cooks food with hot steam. <b>Grill</b> cooks over a flame. <b>Roast</b> uses an oven with dry heat. <b>Simmer</b> is gentle bubbles.",
    "Heat safety|🧤|Always have a grown-up help with hot pans, oil and ovens."
  ], [
    "Which way cooks cookies?|bake|🍪||boil,steam",
    "Which way cooks pasta in bubbling water?|boil|🍝||bake,grill",
    "Which way cooks broccoli with hot vapor?|steam|🥦||grill,fry",
    "Which way cooks a burger over a flame?|grill|🍔||boil,simmer",
    "Which way cooks an egg in a pan with a little oil?|fry|🍳||steam,bake",
    "Which way cooks a potato in the oven?|bake|🥔||boil,steam",
    "What is it when soup bubbles gently?|simmer|🍲||freeze,bake",
    "Which method uses lots of water?|boil|💧||bake,grill"
  ], "Think about the heat and what the food sits in."));
  b.push(L("Hot and cold facts", [
    "Water facts|🌡️|Water freezes at <b>32 degrees Fahrenheit</b> (0 Celsius). Water boils at <b>212 degrees F</b> (100 Celsius).",
    "Kitchen cold|❄️|The fridge keeps food at about <b>40 F or colder</b>. The freezer is <b>0 F</b>.",
    "Oven|♨️|Many cookies bake around <b>350 F</b>. That is hot! A grown-up sets the oven."
  ], [
    "At what temperature does water freeze?|32 degrees F|🧊||212 degrees F,100 degrees F",
    "At what temperature does water boil?|212 degrees F|♨️||32 degrees F,0 degrees F",
    "Which is hotter?|an oven at 350 F|🔥||a freezer at 0 F,the fridge",
    "How cold should the fridge be?|40 F or colder|❄️||90 F,150 F",
    "Water freezes at how many Celsius degrees?|0|🧊||50,100",
    "Water boils at how many Celsius degrees?|100|♨️||0,32",
    "Which place keeps food frozen?|freezer|🍦||counter,oven",
    "Who sets the oven temperature?|a grown-up|🙋||the pet,a toddler"
  ], "Think about hot and cold."));
  b.push(L("Germs and clean food", [
    "Cross-contamination|🦠|Raw meat, chicken and eggs can have germs. Keep them away from foods you eat raw. Moving germs is called <b>cross-contamination</b>.",
    "Stay safe|🧼|Use a separate cutting board for raw meat. Wash hands, boards and tools after touching raw meat.",
    "Wash produce|🍎|Rinse fruits and vegetables under running water before you eat them."
  ], [
    "What should you do after touching raw chicken?|wash your hands with soap|🍗||wipe them on a towel,pet the dog",
    "Which cutting board is right for raw chicken?|a separate one|🔪||the one used for salad,any one",
    "What do you do to apples before eating?|rinse them|🍎||nothing,roll them on the floor",
    "Moving germs from one food to another is called...|cross-contamination|🦠||cross-cooking,cross-stitching",
    "Where should raw meat go in the fridge?|the bottom shelf|🥩||the top shelf over fruit,the door",
    "Can you use the same spoon for raw eggs and then the salad without washing?|no|🥚||yes,only on Tuesdays",
    "Why do we wash cutting boards?|to remove germs|🧽||for fun,so they smell",
    "Should you taste raw cookie dough with raw eggs?|no|🍪||yes always,only a lot"
  ], "Think about stopping germs from moving."));
  b.push(L("Storing food", [
    "Fridge or not|🧊|Milk, meat, eggs and cut fruit go in the <b>fridge</b>. Dry foods like pasta and cereal go in a cool, dry <b>pantry</b>.",
    "Dates|📅|A <b>use by</b> or <b>best by</b> date tells when food is at its best. Check it before you eat.",
    "Seal it|🥡|Close bags and containers so food stays fresh and bugs stay out."
  ], [
    "Where does milk go?|the fridge|🥛||the pantry,the sink",
    "Where does uncooked pasta go?|the pantry|🍝||the freezer,the oven",
    "Where does ice cream go?|the freezer|🍦||the pantry,the counter",
    "What does a use by date tell you?|when food is best to eat by|📅||the price,the weight",
    "What should you do with opened chips?|close the bag tight|🥔||leave it open,leave it in the sun",
    "Where do leftovers go?|a covered container in the fridge|🥡||the counter all night,the yard",
    "Where should eggs be kept?|the fridge|🥚||the floor,the car",
    "A carton of milk is past its date and smells bad. What do you do?|ask a grown-up and do not drink it|🥛||drink it fast,pour it on cereal"
  ], "Think about cold or dry."));
  b.push(G("Servings on a label", [
    "Serving size|🥣|A food label says how big one <b>serving</b> is and how many servings are in the package.",
    "Divide|➗|If a bag has 12 crackers and a serving is 3 crackers, there are 12 ÷ 3 = 4 servings.",
    "Multiply|✖️|If one serving has 5 grams of sugar and you eat 2 servings, you eat 5 + 5 = 10 grams."
  ], () => {
    if (Math.random() < 0.5) { const s = pick([2, 3, 4, 5]), k = ri(3, 6); return { text: `A bag has ${s * k} crackers. One serving is ${s} crackers. How many servings are in the bag?`, visual: "🥣", answer: k,
      hints: ["We need to know how many groups of one serving are in the bag.", "Divide the total by the serving size. Or count by the serving size until you reach the total.", "Example: 21 chips and a serving is 3 chips. Count by 3s: 3, 6, 9, 12, 15, 18, 21 is 7 groups. Now do yours."] }; }
    const c = pick([3, 4, 5, 6]), n = ri(2, 4); return { text: `One serving of cereal has ${c} grams of sugar. How many grams of sugar are in ${n} servings?`, visual: "🥣", answer: c * n,
      hints: ["More servings means more sugar. Do we add the same amount again and again?", "Add the grams of one serving to itself, once for each serving.", "Example: 7 grams and 2 servings. 7 + 7 = 14 grams. Now do yours."] };
  }));
  b.push(G("Triple the recipe", [
    "Triple|3️⃣|<b>Triple</b> means three times as much. To triple a recipe, multiply each amount by 3.",
    "Count by 3s|✖️|3 eggs tripled: 3, 6, 9. That is 9 eggs.",
    "Everything changes|📝|When you triple a recipe, change <b>every</b> ingredient, not only one."
  ], () => {
    const k = ri(2, 5), f = pick(["cups of milk", "eggs", "scoops of sugar", "carrots", "slices of bread"]);
    return { text: `A recipe uses ${k} ${f}. You triple the recipe. How many ${f} do you need?`, visual: "👩‍🍳", answer: 3 * k,
      hints: ["Triple means three times as much.", "Add the number to itself, then add it once more, or count by that number three times.", "Example: A recipe uses 1 apple. Triple: 1 + 1 + 1 = 3 apples. Now do yours."] };
  }));
  b.push(G("Making change", [
    "Change|💵|When you pay with more money than the price, the store gives you <b>change</b>.",
    "Count up|➕|Pay $10 for a $7 snack. Count up from 7: 8, 9, 10. That is $3 change.",
    "Or subtract|➖|You can also subtract: $10 - $7 = $3."
  ], () => {
    const p = pick([10, 20]), x = p === 10 ? ri(2, 9) : ri(11, 19);
    return { text: `A snack costs $${x}. You pay with $${p}. How many dollars of change do you get?`, visual: "💵", answer: p - x,
      hints: ["Change is the money that comes back to you.", "Count up from the price to the amount you paid, or take the price away from what you paid.", "Example: You pay $50 for a $35 item. Count up: 35 to 40 is 5, 40 to 50 is 10, so 15. Now do yours."] };
  }));
  b.push(G("Best buy", [
    "Price each|🏷️|To compare, find the price of <b>one</b>. A bag of 3 apples for $6 costs $2 each.",
    "Divide|➗|Price of the pack divided by how many in the pack gives the price for one.",
    "Compare|⚖️|The lower price for one is the better buy."
  ], () => {
    const n = ri(2, 5), p = ri(2, 6), f = pick(["apples", "muffins", "oranges", "rolls", "bananas"]);
    return { text: `${n} ${f} cost $${n * p} in all. Each one costs the same. How many dollars is one?`, visual: "🏷️", answer: p,
      hints: ["We want the price of just one.", "Share the total price equally among the items. What number times the count gives the total?", "Example: 3 pears cost $21. 7 + 7 + 7 = 21, so $7 each. Now do yours."] };
  }));
  b.push(L("Planning a meal", [
    "Plan ahead|📝|A good meal has a main dish, a side, a fruit or veggie and a drink. Plan, shop, cook and clean up.",
    "Make a list|🛒|Check the kitchen for what you have. Write down what is missing.",
    "Think of everyone|👨‍👩‍👧|Remember allergies and foods people cannot eat."
  ], [
    "What is the first step of planning a meal?|decide what to make|📝||wash dishes,eat dessert",
    "Which plate is balanced?|chicken, rice and broccoli|🍽️||only candy,only soda",
    "Someone has a peanut allergy. What do you do?|leave out peanuts|🥜||add peanuts,hide them in food",
    "Why check the kitchen before shopping?|to see what you already have|🔍||for no reason,to hide food",
    "What do you do at the end of the meal?|clean up|🧽||leave the mess,run off",
    "Which is a good side dish?|steamed carrots|🥕||a candle,a napkin",
    "What goes on a shopping list?|things you need to buy|🛒||things you already have lots of,toys",
    "A main dish is...|the biggest part of the meal|🍗||the napkin,the drink"
  ], "Think of what a helpful cook does."));
  b.push(L("Kitchen fire and burn safety", [
    "Fire safety|🔥|Never leave the stove alone. Keep towels and paper away from flames.",
    "Grease fire|🚫|If oil in a pan catches fire, never use water. A grown-up puts a lid on it. Call for help.",
    "Burns|🚰|Cool a small burn under running cool water and tell a grown-up."
  ], [
    "What should you do if you see a fire in the kitchen?|tell a grown-up and get out|🔥||throw water on a grease fire,hide it",
    "Should you leave the stove on and walk away?|no|🍳||yes,sometimes",
    "How do you cool a small burn?|cool running water|🚰||hot water,ice cream",
    "What stays away from the stove?|towels and paper|🧻||oven mitts only,the cook",
    "Does water put out a grease fire?|no, it makes it worse|💧||yes,it helps a lot",
    "Who do you tell if you smell smoke?|a grown-up|🙋||the cat,nobody",
    "Where do you keep dish towels?|away from the burners|🧽||on the burner,over the flame",
    "What is a smoke alarm for?|warns us of smoke|🔔||plays music,tells time"
  ], "Safe answer: tell a grown-up fast."));
  b.push(L("Sewing words", [
    "Parts of clothes|👕|A <b>seam</b> is where two pieces of fabric are sewn together. A <b>hem</b> is the folded edge at the bottom.",
    "Patterns|✂️|A <b>pattern</b> is a guide for cutting fabric. A <b>thimble</b> protects your finger while you push the needle.",
    "Fix it|🔧|A <b>seam ripper</b> takes out stitches. Measure twice, cut once."
  ], [
    "What is the line where two pieces are sewn together?|seam|🧵||hem,collar",
    "What is the folded edge at the bottom of pants?|hem|👖||seam,pocket",
    "What guide helps you cut fabric?|pattern|📐||button,pin",
    "What protects your finger while sewing?|thimble|🪡||sock,glove for baking",
    "What takes out wrong stitches?|seam ripper|🧵||iron,spoon",
    "Why measure twice before you cut?|so you cut the right size|📏||for fun,to waste fabric",
    "What do you use to measure fabric?|tape measure|📏||teaspoon,thermometer",
    "A button hole is where...|the button goes through|🔘||water goes in,the thread ends"
  ], "Think of the part of the clothes."));
  b.push(L("Caring for clothes", [
    "Care labels|🏷️|Clothes have a <b>care label</b> that says how to wash and dry them. Read it first.",
    "Stains|🍝|Treat stains quickly, before they dry. Rinse and tell a grown-up.",
    "Dryer safety|🌀|Clean the lint trap every time. Lint can catch fire."
  ], [
    "Where do you find washing instructions?|the care label|🏷️||the button,the hem",
    "When should you treat a stain?|right away|🍝||after a month,never",
    "What do you clean from the dryer each time?|the lint trap|🌀||the window,the door",
    "Why is lint dangerous?|it can catch fire|🔥||it is shiny,it is cold",
    "Which clothes might shrink in a hot dryer?|wool sweaters|🧶||paper towels,none",
    "How should you sort laundry?|whites, colors and darks|🧺||by size of basket,not at all",
    "What helps clothes smell fresh?|being washed|🫧||staying in a pile,a puddle",
    "Who helps with the washer settings?|a grown-up or the label|🙋||a stranger,a toy"
  ], "Check the label and be safe."));
  b.push(MIX("Mixed practice", [b[0], b[3], b[5], b[7], b[10], b[12]]));
  b.push(MIX("Level 5 Challenge", [b[2], b[4], b[8], b[9], b[11], b[13], b[15], b[16]]));

  // ================= LEVEL 6 =================
  const c = [];
  c.push(G("Scale up a recipe", [
    "Feeding more|🍽️|A recipe says how many it <b>serves</b>. For more people, make more.",
    "Scale|✖️|If a recipe serves 4 and you need 8, that is twice as many. Multiply each amount by 2.",
    "Three times|3️⃣|For 12 people, the recipe is 3 times bigger. 12 ÷ 4 = 3."
  ], () => {
    const k = ri(1, 3), m = pick([8, 12]), f = m / 4;
    return { text: `A recipe for 4 people uses ${k} ${k === 1 ? "cup" : "cups"} of rice. How many cups do you need for ${m} people?`, visual: "🍚", answer: k * f,
      hints: ["First find how many times bigger the group is than 4.", "Divide the new number of people by 4, then multiply the rice by that.", "Example: A recipe for 4 uses 5 cups. For 8 people it is twice as big. 5 + 5 = 10 cups. Now do yours."] };
  }));
  c.push(G("Half a recipe", [
    "Halving|½|<b>Half</b> means split into two equal parts. To make half a recipe, cut each amount in half.",
    "Find half|➗|Half of 8 is 4, because 4 + 4 = 8. Half of 12 is 6.",
    "Odd numbers|🥚|If the number is odd, it is tricky. Pick numbers that split evenly."
  ], () => {
    const k = ri(2, 6), f = pick(["eggs", "cups of milk", "tablespoons of honey", "slices of bread", "scoops of oats"]);
    return { text: `A recipe uses ${2 * k} ${f}. You want to make half the recipe. How many ${f} do you need?`, visual: "½", answer: k,
      hints: ["Half means two equal parts.", "Find the number that plus itself makes the total.", "Example: 14 grapes. 7 + 7 = 14, so half is 7. Now do yours."] };
  }));
  c.push(G("Teaspoons to tablespoons", [
    "Spoon rule|🥄|<b>3 teaspoons = 1 tablespoon</b>. <b>16 tablespoons = 1 cup</b>.",
    "Going down|⬇️|Tablespoons to teaspoons: multiply by 3. Teaspoons to tablespoons: split into groups of 3.",
    "Check|✅|Count by 3s until you get to the total."
  ], () => {
    const k = ri(2, 6);
    if (Math.random() < 0.5) return { text: `A recipe needs ${3 * k} teaspoons of sugar. How many tablespoons is that?`, visual: "🥄", answer: k,
      hints: ["Every 3 teaspoons make 1 tablespoon.", "Make groups of 3 and count the groups.", "Example: 21 teaspoons. Groups of 3: 3, 6, 9, 12, 15, 18, 21 is 7 groups, so 7 tablespoons. Now do yours."] };
    return { text: `A recipe needs ${k} tablespoons of oil. How many teaspoons is that?`, visual: "🥄", answer: 3 * k,
      hints: ["Each tablespoon holds the same number of teaspoons.", "Count by 3s once for each tablespoon.", "Example: 7 tablespoons. Count by 3s: 3, 6, 9, 12, 15, 18, 21. That is 21 teaspoons. Now do yours."] };
  }));
  c.push(L("MyPlate", [
    "MyPlate|🍽️|MyPlate shows a plate with five groups: <b>fruits</b>, <b>vegetables</b>, <b>grains</b>, <b>protein</b> and <b>dairy</b>.",
    "Fill your plate|🥦🍎|Make about <b>half your plate</b> fruits and vegetables. The rest is grains and protein, with dairy on the side.",
    "Make it colorful|🌈|Eat many colors of fruits and vegetables. Each color brings different good things."
  ], [
    "How much of the plate should be fruits and vegetables?|about half|🍽️||none,a tiny speck",
    "Which group is yogurt in?|dairy|🥛||grains,fruits",
    "Which group is whole wheat bread in?|grains|🍞||protein,dairy",
    "Which group is salmon in?|protein|🐟||vegetables,fruits",
    "Which group is spinach in?|vegetables|🥬||dairy,grains",
    "Which group are grapes in?|fruits|🍇||protein,dairy",
    "Which is a way to make a plate healthy?|add many colors|🌈||use only brown foods,use only white foods",
    "Which group is oatmeal in?|grains|🥣||vegetables,dairy"
  ], "Think about the five MyPlate groups."));
  c.push(L("Whole grains, fiber and sugar", [
    "Whole grains|🌾|A <b>whole grain</b> keeps all of the seed. Whole wheat bread, oats and brown rice are whole grains.",
    "Fiber|🥦|<b>Fiber</b> is a part of plants that helps your tummy work well. Beans, fruit and whole grains have lots.",
    "Added sugar and salt|🧂|Soda, candy and many snacks have <b>added sugar</b>. Salt is also called <b>sodium</b>. Too much of either is not good."
  ], [
    "Which is a whole grain?|brown rice|🍚||white sugar,soda",
    "Which has lots of fiber?|beans|🫘||candy,soda",
    "Which has the most added sugar?|soda|🥤||apple,milk",
    "Sodium is another name for...|salt|🧂||sugar,fat",
    "Which bread is whole grain?|whole wheat bread|🍞||white sugar bread,pie",
    "Which snack is lower in added sugar?|plain popcorn|🍿||candy bar,frosting",
    "What does fiber help?|your tummy work well|🥗||your hair color,your shoe size",
    "Which cereal is a whole grain choice?|whole grain oats|🥣||candy bits,frosted sugar"
  ], "Look for the plain, plant-based answer."));
  c.push(L("Safe cooking temperatures", [
    "Cook it enough|🌡️|Use a <b>food thermometer</b>. Chicken must reach <b>165 F</b>. Ground beef must reach <b>160 F</b>.",
    "Danger zone|⚠️|Germs grow fast between <b>40 F and 140 F</b>. Keep cold food cold and hot food hot.",
    "Cold storage|❄️|Fridge: 40 F or lower. Freezer: 0 F."
  ], [
    "What tool checks if chicken is done?|food thermometer|🌡️||ruler,clock",
    "Chicken is safe at what temperature?|165 F|🍗||100 F,90 F",
    "Ground beef is safe at what temperature?|160 F|🍔||100 F,60 F",
    "Germs grow fastest between 40 F and...|140 F|🦠||0 F,300 F",
    "How cold is a freezer?|0 F|🧊||50 F,100 F",
    "Should the fridge be warmer than 40 F?|no|❄️||yes always,only at night",
    "Can you tell chicken is done only by color?|no, use a thermometer|🍗||yes always,only on Mondays",
    "Who handles a hot thermometer test?|a grown-up|🙋||a toddler,the pet"
  ], "Think about safe heat and cold."));
  c.push(L("Leftovers", [
    "Save it|🥡|Put leftovers in the fridge within <b>2 hours</b> after cooking.",
    "How long|📅|Leftovers stay good in the fridge for about <b>3 to 4 days</b>.",
    "Heat again|♨️|Reheat leftovers until they are steaming hot all the way through. A grown-up helps."
  ], [
    "How soon should leftovers go in the fridge?|within 2 hours|⏰||after 2 days,after a week",
    "How long do leftovers last in the fridge?|3 to 4 days|📅||3 months,3 minutes",
    "What do you put leftovers in?|a covered container|🥡||an open bowl in the sun,your pocket",
    "How should leftovers be reheated?|until steaming hot|♨️||barely warm,frozen",
    "Where do leftovers go to stay safe?|the fridge|🧊||the counter,the porch",
    "Who helps with reheating?|a grown-up|🙋||the neighbor kid,no one",
    "A soup was left out all night. What do you do?|throw it away|🍲||eat it,share it",
    "Why do we save leftovers?|to waste less food|♻️||to be silly,to make a mess"
  ], "Think about germs and time."));
  c.push(L("Kitchen equipment", [
    "Pots and pans|🍳|A <b>saucepan</b> heats liquids. A <b>skillet</b> (frying pan) cooks eggs and pancakes. A <b>baking sheet</b> holds cookies.",
    "More|🥄|A <b>ladle</b> serves soup. <b>Tongs</b> grab food. A <b>whisk</b> beats eggs. A <b>colander</b> drains.",
    "Small appliances|🔌|A <b>toaster</b> toasts bread. A <b>blender</b> blends smoothies. A grown-up helps with plugs."
  ], [
    "Which pan cooks pancakes?|skillet|🥞||ladle,colander",
    "Which holds cookies in the oven?|baking sheet|🍪||saucepan,whisk",
    "Which tool serves soup?|ladle|🍲||tongs,whisk",
    "Which appliance toasts bread?|toaster|🍞||blender,microwave bowl",
    "Which appliance blends a smoothie?|blender|🥤||toaster,oven",
    "Which tool grabs hot food?|tongs|🍢||spoon holes,colander",
    "Which heats soup on the stove?|saucepan|🥣||baking sheet,rolling pin",
    "Who plugs in and uses a blender?|a grown-up or a kid with a grown-up|🔌||a toddler alone,nobody"
  ], "Match the tool to its job."));
  c.push(L("Baking ingredients", [
    "What they do|🧁|<b>Flour</b> gives structure. <b>Sugar</b> adds sweetness. <b>Eggs</b> hold things together. <b>Butter</b> or oil adds moisture.",
    "Rising|⬆️|<b>Baking soda</b>, <b>baking powder</b> and <b>yeast</b> make baked goods rise.",
    "Salt|🧂|A pinch of salt makes flavors taste better."
  ], [
    "Which ingredient makes bread rise?|yeast|🍞||sugar,flour",
    "Which ingredient helps hold a cake together?|eggs|🥚||salt,baking soda",
    "Which ingredient makes things sweet?|sugar|🍬||flour,yeast",
    "Which adds moisture?|butter|🧈||baking soda,salt",
    "Which gives cakes their body?|flour|🌾||oil,sugar",
    "Baking powder helps a cake...|rise|🧁||sink,burn",
    "Which makes flavors pop?|a pinch of salt|🧂||a pinch of sand,a pinch of soap",
    "Why measure carefully when baking?|small changes change the result|📏||it does not matter,to waste ingredients"
  ], "Think about the job each ingredient has."));
  c.push(L("Safe cutting", [
    "Cutting words|🔪|<b>Slice</b> is a thin flat piece. <b>Dice</b> is small cubes. <b>Mince</b> is tiny bits. <b>Chop</b> is rough pieces.",
    "Safe hands|🖐️|Use the <b>claw grip</b>: curl your fingertips under, like a claw, so the knife cannot touch them.",
    "Stable board|🪵|Put a damp towel under the cutting board so it does not slide. Cut away from yourself. A grown-up supervises."
  ], [
    "What is a claw grip?|curling your fingertips under|🖐️||sticking fingers out,holding the blade",
    "Which cut makes tiny bits?|mince|🧄||slice,peel",
    "Which cut makes small cubes?|dice|🧅||mince,mash",
    "What stops a cutting board from sliding?|a damp towel underneath|🪵||oil,water on the floor",
    "Which way should you cut?|away from yourself|🔪||toward your hand,toward a friend",
    "What should you do with a knife you finished using?|put it down safely|🔪||wave it,toss it",
    "Which cut makes thin flat pieces?|slice|🍅||dice,mince",
    "Who supervises a kid who is cutting?|a grown-up|🙋||a stranger,a pet"
  ], "Safety first when using knives."));
  c.push(G("Timing a meal", [
    "Time|⏰|There are <b>60 minutes</b> in an hour. A timer counts down.",
    "Time left|➖|Total time minus time used gives the time left. 30 - 10 = 20.",
    "Hours to minutes|🕐|2 hours = 60 + 60 = 120 minutes."
  ], () => {
    if (Math.random() < 0.5) { const t = pick([40, 45, 50, 60]), e = pick([10, 15, 20, 25]); return { text: `A casserole bakes for ${t} minutes. ${e} minutes have passed. How many minutes are left?`, visual: "⏲️", answer: t - e,
      hints: ["We want to know how much time still remains.", "Take the time that has passed away from the total time.", "Example: 30 minutes total, 12 passed. 30 - 12 = 18 minutes left. Now do yours."] }; }
    const h = ri(2, 4); return { text: `A stew simmers for ${h} hours. How many minutes is that?`, visual: "⏲️", answer: 60 * h,
      hints: ["One hour has the same number of minutes each time.", "Add 60 once for every hour.", "Example: 5 hours. 60, 120, 180, 240, 300 minutes. Now do yours."] };
  }));
  c.push(G("Party budget", [
    "A budget|💵|A <b>budget</b> is a plan for how much to spend. Add the costs, then subtract from your money.",
    "Step by step|🧮|You have $20. Pizza costs $8 and juice costs $5. Spend 8 + 5 = 13. Left: 20 - 13 = $7.",
    "Stay under|✅|If the total is more than your money, you need to change the plan."
  ], () => {
    const x = ri(3, 8), y = ri(3, 8), m = x + y + ri(1, 12), A = pick(["fruit", "bread", "cheese", "pasta"]), B = pick(["juice", "milk", "yogurt", "eggs"]);
    return { text: `You have $${m}. ${A} costs $${x} and ${B} costs $${y}. How many dollars are left?`, visual: "💵", answer: m - x - y,
      hints: ["First find how much you spend altogether.", "Add the two prices, then take that away from your money.", "Example: You have $40. Things cost $12 and $9. 12 + 9 = 21. 40 - 21 = $19. Now do yours."] };
  }));
  c.push(G("Price per item", [
    "Unit price|🏷️|The <b>unit price</b> is the price of one thing.",
    "Divide|➗|6 muffins for $12 means $12 ÷ 6 = $2 each.",
    "Smart shopper|🛒|Compare unit prices to find the best buy."
  ], () => {
    const n = ri(3, 6), p = ri(2, 5), f = pick(["muffins", "juice boxes", "rolls", "pears", "bagels"]);
    return { text: `${n} ${f} cost $${n * p}. What does one cost in dollars?`, visual: "🏷️", answer: p,
      hints: ["We want the price of only one.", "Divide the total price by how many there are, or find the number that times the count equals the total.", "Example: 9 rolls cost $63. 7 x 9 = 63, so $7 each. Now do yours."] };
  }));
  c.push(L("Needs and wants", [
    "Needs|🏠|A <b>need</b> is something you must have: food, water, clothes, a home.",
    "Wants|🎮|A <b>want</b> is something nice to have but you can live without it, like a toy or candy.",
    "Choose wisely|🤔|Spend on needs first. Save for wants."
  ], [
    "Is water a need or a want?|need|💧||want",
    "Is a video game a need or a want?|want|🎮||need",
    "Is a warm coat in winter a need or a want?|need|🧥||want",
    "Is candy a need or a want?|want|🍬||need",
    "Is a nutritious meal a need or a want?|need|🍲||want",
    "Is a new toy a need or a want?|want|🧸||need",
    "Is a place to live a need or a want?|need|🏠||want",
    "Is a fancy cake at a party a need or a want?|want|🎂||need"
  ], "Ask: can I live without it?"));
  c.push(L("Waste less", [
    "Reduce, reuse, recycle|♻️|<b>Reduce</b> means use less. <b>Reuse</b> means use again. <b>Recycle</b> means make something new from old.",
    "Food scraps|🍌|Fruit and vegetable scraps can become <b>compost</b>, which helps plants grow.",
    "In the kitchen|🥫|Rinse cans and bottles for the recycling bin. Use leftovers for a new meal."
  ], [
    "Using a jar again for storing buttons is...|reuse|🫙||recycle,reduce",
    "Putting a rinsed can in the recycle bin is...|recycle|🥫||reuse,reduce",
    "Using less paper towel is...|reduce|🧻||recycle,compost",
    "What can banana peels become?|compost|🍌||plastic,glass",
    "Why use leftovers?|to waste less food|🥡||to make more trash,to hide dinner",
    "Where does a clean plastic bottle go?|recycling bin|🧴||the sink,the oven",
    "What helps the planet?|reduce, reuse, recycle|🌎||throw everything out,waste water",
    "A cloth bag instead of a plastic bag is...|reuse|👜||compost,waste"
  ], "Think: use less, use again, or make new?"));
  c.push(L("Clothing care", [
    "Wash and dry|🧺|Cold water is gentle on colors. Hot water can shrink some clothes.",
    "Ironing|♨️|An iron is hot! A grown-up irons. Fold clothes to keep them neat without ironing.",
    "Hang or fold|🧥|Fold t-shirts and sweaters. Hang shirts and coats on hangers."
  ], [
    "Which water is gentle on colors?|cold|🧊||boiling,steaming",
    "Who uses the iron?|a grown-up|♨️||a toddler,the pet",
    "Where do coats go?|on a hanger|🧥||in a puddle,on the floor",
    "How do you keep a sweater from stretching?|fold it|🧶||hang it by the sleeve forever,twist it",
    "What do you do with a loose button?|ask a grown-up to sew it|🔘||pull it off and throw it,eat it",
    "What sorts laundry to protect colors?|whites, colors, darks|🧺||no sorting,only size",
    "Where do dirty clothes go?|the hamper|🧺||under the bed,on the stairs",
    "What can make wool shrink?|hot water|♨️||cold water,a hanger"
  ], "Take care of clothes like a pro."));
  c.push(L("Sewing measurements", [
    "Measure|📏|Use a <b>tape measure</b> or ruler. Fabric is measured in inches. 12 inches = 1 foot.",
    "Mark|✏️|Mark the line with chalk or a washable pen before you cut.",
    "Hand stitches|🪡|A <b>running stitch</b> goes in and out. A <b>backstitch</b> goes back for a stronger line. A knot ends the thread."
  ], [
    "How many inches are in one foot?|12|📏||10,36",
    "What do you use to mark fabric?|chalk|✏️||paint,butter",
    "Which stitch is the strong stitch?|backstitch|🧵||running stitch,loose stitch",
    "What goes in and out in a line?|running stitch|🪡||knot,hem",
    "What do you do before you cut?|measure and mark|📏||guess,close your eyes",
    "What ends your thread?|a knot|🪢||a spill,a bow",
    "A tape measure is made to...|measure around things|📏||heat soup,cut cloth",
    "How long is 12 inches?|1 foot|📏||1 yard,1 mile"
  ], "Measure first, sew second."));
  c.push(G("Leftover pizza", [
    "Parts of a pizza|🍕|A pizza cut into 8 equal slices has 8 parts. Each slice is one eighth.",
    "Eat some|➖|If you have 8 slices and eat 3, there are 8 - 3 = 5 slices left.",
    "More than one eater|👨‍👩‍👧|When two people eat, add what they ate, then subtract."
  ], () => {
    const x = ri(1, 3), y = ri(1, 3);
    return { text: `A pizza has 8 slices. You eat ${x} and a friend eats ${y}. How many slices are left?`, visual: "🍕", answer: 8 - x - y,
      hints: ["First find how many slices were eaten in all.", "Add what you and your friend ate, then take that from 8.", "Example: 9 sandwiches, 5 and 3 are eaten. 5 + 3 = 8. 9 - 8 = 1 left. Now do yours."] };
  }));
  c.push(MIX("Mixed practice", [c[0], c[3], c[5], c[6], c[10], c[12]]));
  c.push(MIX("Level 6 Challenge", [c[1], c[2], c[4], c[7], c[8], c[9], c[11], c[13], c[14], c[16]]));

  Object.assign(HOMEEC_LEVELS, { 4: a, 5: b, 6: c });
})();
