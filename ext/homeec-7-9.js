// ext/homeec-7-9.js  Home Economics & Cooking levels 7-9
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

  // ================= LEVEL 7 =================
  const a = [];
  a.push(L("Dry and liquid measuring", [
    "Two kinds of cups|🥛🥣|Use a <b>dry measuring cup</b> for flour, sugar and oats. Use a <b>liquid measuring cup</b> with a spout and lines for milk and juice.",
    "Dry foods|🥄|Fill the cup a little too full, then <b>level it off</b> with the flat back of a knife. Brown sugar is <b>packed</b> down firmly.",
    "Liquids|👀|Set the liquid cup on a flat counter and bend down so your eyes are level with the line. Then read it."
  ], [
    "Which cup do you use for milk?|liquid measuring cup|🥛||dry measuring cup,mixing bowl",
    "Which cup do you use for flour?|dry measuring cup|🥣||liquid measuring cup,coffee mug",
    "How do you make a cup of flour exact?|level it off with a knife|🔪||shake it hard,press it flat with your hand",
    "Where should your eyes be to read a liquid cup?|level with the line|👀||above the cup,under the table",
    "Where do you set a liquid cup to measure?|on a flat counter|🥛||in the air,on your lap",
    "How do you measure brown sugar?|pack it down firmly|🟤||pour it loosely,sprinkle it",
    "What tool measures weight in grams or ounces?|kitchen scale|⚖️||ladle,whisk",
    "Which is the bigger spoon?|tablespoon|🥄||teaspoon,pinch"
  ], "Dry and wet foods use different cups."));
  a.push(G("Half and third of a recipe", [
    "Making less|➗|To make <b>half</b> a recipe, split each amount into 2 equal parts. To make <b>one third</b>, split into 3 equal parts.",
    "Example|🥄|A recipe needs 6 tablespoons of oil. Half is 3 tablespoons. One third is 2 tablespoons.",
    "Tip|💡|Use division: half means divide by 2. A third means divide by 3."
  ], () => {
    if (Math.random() < 0.5) { const k = ri(2, 9), f = pick(["tablespoons of oil", "cups of milk", "teaspoons of vanilla", "eggs", "cups of oats"]);
      return { text: `A recipe uses ${2 * k} ${f}. You make half of the recipe. How many ${f.split(" ")[0] === "eggs" ? "eggs" : f.split(" ")[0]} do you need?`, visual: "➗", answer: k,
        hints: ["Half means splitting into 2 equal parts.", "Divide the amount by 2.", "Example: 10 scoops, half the recipe. 10 divided by 2 is 5 scoops. Now do yours."] }; }
    const k = ri(2, 6), f = pick(["tablespoons of honey", "cups of flour", "teaspoons of salt", "cups of water"]);
    return { text: `A recipe uses ${3 * k} ${f}. You make one third of the recipe. How many ${f.split(" ")[0]} do you need?`, visual: "➗", answer: k,
      hints: ["One third means splitting into 3 equal parts.", "Divide the amount by 3.", "Example: 12 slices, one third of the recipe. 12 divided by 3 is 4 slices. Now do yours."] };
  }));
  a.push(L("Reading a recipe", [
    "Parts of a recipe|📖|A recipe has a <b>title</b>, a list of <b>ingredients</b>, and <b>steps</b> (directions) in order. It also tells how many it <b>serves</b> or makes (the <b>yield</b>).",
    "Times|⏱️|<b>Prep time</b> is how long to get ready (measure, chop, mix). <b>Cook time</b> is how long it cooks or bakes.",
    "Smart cooks|🧑‍🍳|Read the whole recipe first. Gather all ingredients and tools. Then follow the steps in order."
  ], [
    "What is the list of foods in a recipe called?|ingredients|📝||directions,yield",
    "What tells you what to do, in order?|the steps|📖||the title,the yield",
    "What does yield tell you?|how many it makes|🍪||how hot the oven is,who wrote it",
    "What is prep time?|time to get ready|🔪||time in the oven,time to eat",
    "What is cook time?|time it cooks or bakes|🍳||time to shop,time to wash up",
    "What should you do before you start cooking?|read the whole recipe|👀||skip to the last step,start mixing at once",
    "Why gather your ingredients first?|so you do not run out mid-recipe|🧺||so the food cools,so the oven heats",
    "Should you follow the steps in order?|yes|🔢||no,only the last one"
  ], "A recipe is like a map for cooking."));
  a.push(G("Recipe batches", [
    "Batches|🍪|One <b>batch</b> of a recipe makes a set number of cookies. Two batches make double.",
    "Multiply|✖️|Multiply the yield by the number of batches. 12 cookies in 1 batch, 3 batches make 12 × 3 = 36.",
    "Ingredients too|🥣|If you make more batches, each ingredient is also multiplied. 2 cups of flour per batch, 3 batches need 6 cups."
  ], () => {
    if (Math.random() < 0.5) { const y = pick([6, 8, 12, 24]), b = ri(2, 5), f = pick(["muffins", "cookies", "rolls", "pancakes"]);
      return { text: `One batch makes ${y} ${f}. How many ${f} do you get from ${b} batches?`, visual: "🍪", answer: y * b,
        hints: ["Each batch makes the same number.", "Multiply the yield by the number of batches.", "Example: 1 batch makes 10 and you make 4 batches. 10 × 4 = 40. Now do yours."] }; }
    const c = ri(2, 4), b = ri(2, 5), f = pick(["cups of flour", "eggs", "cups of sugar", "cups of milk"]);
    return { text: `One batch needs ${c} ${f}. How many ${f.split(" ")[0] === "eggs" ? "eggs" : f.split(" ")[0]} do you need for ${b} batches?`, visual: "🥣", answer: c * b,
      hints: ["Every batch needs the same amount.", "Multiply the amount for one batch by the number of batches.", "Example: 3 spoons per batch, 5 batches. 3 × 5 = 15 spoons. Now do yours."] };
  }));
  a.push(L("Protein foods", [
    "Protein|🍗|<b>Protein</b> helps your body build and fix muscles. Meat, poultry, fish, eggs, beans, nuts and tofu are protein foods.",
    "Plant and animal|🫘🐟|Some protein comes from animals, like chicken and fish. Some comes from plants, like lentils, peanuts and tofu.",
    "Mix it up|🥜|Eat different protein foods during the week. Choose lean meat and fish often."
  ], [
    "Which food is a protein food?|lentils|🫘||apple,rice",
    "What does protein help your body do?|build and fix muscles|💪||see in the dark only,make bones glow",
    "Which protein comes from the sea?|salmon|🐟||broccoli,bread",
    "Which is a plant protein?|tofu|🥢||chicken,eggs",
    "Which is a protein food?|egg|🥚||grape,cereal",
    "Which snack has protein?|peanut butter|🥜||fruit juice,jelly",
    "Which is a protein food?|black beans|🫘||celery,pasta sauce",
    "Why eat different protein foods?|they give different good things|🍽️||one is enough forever,they are all the same"
  ], "Think about foods that build muscle."));
  a.push(L("Dairy and calcium", [
    "Dairy|🥛|Milk, yogurt and cheese are <b>dairy</b> foods. They are made from the milk of animals such as cows.",
    "Calcium|🦴|Dairy has <b>calcium</b>. Calcium helps make strong bones and teeth. Kids grow a lot, so they need it.",
    "Other choices|🌱|Some people cannot drink regular milk. They can choose lactose-free milk or soy milk with calcium added."
  ], [
    "Which mineral in milk builds strong bones?|calcium|🦴||iron,salt",
    "Which food is dairy?|yogurt|🥛||toast,carrot",
    "Which food is made from milk?|cheese|🧀||bread,rice",
    "Which animal gives most of our milk?|cow|🐄||hen,fish",
    "Besides bones, what else does calcium help?|teeth|🦷||hair color,shoes",
    "Which is NOT a dairy food?|apple|🍎||cheese,milk",
    "Someone cannot digest regular milk. What can they choose?|lactose-free milk|🥛||salty water,more candy",
    "Which drink is a good choice with lunch?|milk|🥛||soda,sugary punch"
  ], "Think about bones and teeth."));
  a.push(L("Keeping germs apart", [
    "Cross-contamination|🦠|<b>Cross-contamination</b> is when germs move from one food to another, or from hands and tools to food.",
    "Keep apart|🔪|Raw meat, chicken, fish and eggs can have germs. Keep them away from foods that are eaten raw, like salad.",
    "Stay safe|🧼|Use a separate cutting board for raw meat. Wash hands, boards and tools with hot soapy water after touching raw meat."
  ], [
    "What is cross-contamination?|germs moving from one food to another|🦠||cooking two foods together,washing the dishes",
    "You cut raw chicken. What should you do before cutting salad?|wash the board with hot soapy water|🥗||wipe it with your sleeve,do nothing",
    "Which needs its own cutting board?|raw meat|🥩||bread,crackers",
    "Where should cooked chicken go?|on a clean plate|🍗||on the plate that held it raw,on the floor",
    "After touching raw eggs, you should...|wash your hands|🥚||touch the fridge handle,lick your fingers",
    "Which food might have germs when raw?|chicken|🍗||bread,cereal",
    "Should you rinse raw chicken in the sink?|no because it splashes germs|🚰||yes always,yes with juice",
    "Which keeps raw meat juice from dripping on other food?|a bag or covered plate|🛍️||an open bowl,nothing"
  ], "Germs travel on hands, boards and tools."));
  a.push(L("Fridge and freezer", [
    "Cold keeps food safe|🧊|Germs grow slowly in the cold. The fridge should be <b>40°F or colder</b>. The freezer should be <b>0°F</b>.",
    "Two-hour rule|⏰|Do not leave cooked or cold food out for more than <b>2 hours</b>. After that, throw it away.",
    "Smart storing|🧺|Put raw meat on the bottom shelf so it cannot drip on other food. Eat leftovers within about 3 to 4 days."
  ], [
    "How cold should a fridge be?|40°F or colder|🧊||70°F,100°F",
    "How cold should a freezer be?|0°F|❄️||32°F,50°F",
    "How long can food sit out before it is unsafe?|more than 2 hours|⏰||more than 2 days,more than 2 weeks",
    "Where should raw meat go in the fridge?|bottom shelf|🥩||top shelf,door",
    "How long can leftovers stay in the fridge?|3 to 4 days|🥡||3 to 4 weeks,3 to 4 months",
    "Where is the safest place to thaw frozen chicken?|in the fridge|🍗||on the counter all day,in the sun",
    "Why is cold good for food?|germs grow slowly|🦠||germs grow faster,it turns food blue",
    "What should you do with soup left out all night?|throw it away|🍲||eat it cold,reheat it once"
  ], "Think about when germs grow."));
  a.push(L("Pantry staples", [
    "The pantry|🥫|A <b>pantry</b> is a cool, dry place for foods that last a long time. Flour, rice, pasta, oil, sugar and canned beans are <b>staples</b>.",
    "Keep it neat|🗄️|Close containers tightly. Put newer items in the back and older ones in front, so you use the old ones first.",
    "Not for the pantry|🥛|Milk, eggs, fresh meat and cut fruit need the fridge. They spoil fast at room temperature."
  ], [
    "Which food is a pantry staple?|dry pasta|🍝||fresh fish,raw chicken",
    "Which belongs in the fridge, not the pantry?|milk|🥛||rice,flour",
    "A pantry should be...|cool and dry|🗄️||warm and wet,in the sun",
    "Why put old cans in the front?|so you use them first|🥫||to hide them,to make them cold",
    "Why close the flour container tight?|keep out bugs and moisture|🌾||to make it grow,to make it hot",
    "Which keeps a long time in the pantry?|canned beans|🥫||fresh strawberries,ripe avocado",
    "Which is a baking staple?|flour|🌾||lettuce,fish",
    "Which is a pantry staple?|rice|🍚||ice cream,yogurt"
  ], "Does it need cold to stay safe?"));
  a.push(L("Fabric feel and uses", [
    "Fabrics|🧵|Different fabrics feel and work differently. <b>Cotton</b> is soft and lets air through. <b>Wool</b> is warm. <b>Silk</b> is smooth and shiny.",
    "More fabrics|🧥|<b>Denim</b> is tough cotton used for jeans. <b>Fleece</b> is fuzzy and warm. <b>Nylon</b> is strong and dries fast.",
    "Choose well|✅|Pick the fabric that fits the job: light cotton for hot days, wool or fleece for cold days."
  ], [
    "Which fabric is best for a hot summer shirt?|cotton|👕||wool,fleece",
    "Which fabric is warm for a cold winter hat?|wool|🧶||thin silk,mesh",
    "Which tough fabric is used for jeans?|denim|👖||silk,gauze",
    "Which fabric feels smooth and shiny?|silk|✨||denim,burlap",
    "Which fabric is fuzzy and warm?|fleece|🧥||linen,cotton gauze",
    "Which is good for a rain jacket?|nylon|🌧️||paper,loose lace",
    "Which fabric lets air through, so you stay cool?|cotton|🌬️||plastic wrap,thick wool",
    "Why choose wool socks in winter?|they keep feet warm|🧦||they make feet cold,they melt"
  ], "Think about hot days and cold days."));
  a.push(L("Care labels", [
    "What is a care label?|🏷️|A <b>care label</b> is a tag in clothes. It tells how to wash, dry and iron them so they last.",
    "Words to know|🧺|<b>Machine wash cold</b> uses cool water. <b>Tumble dry low</b> uses gentle heat. <b>Line dry</b> means hang it to dry. <b>Do not bleach</b> means no bleach.",
    "Special|🧼|<b>Dry clean only</b> means a special cleaner must wash it. <b>Hand wash</b> means wash gently in the sink."
  ], [
    "Where do you find washing directions on clothes?|the care label|🏷️||the button,the hem",
    "What does line dry mean?|hang it to dry|👕||put it in the hot dryer,bake it",
    "What does hand wash mean?|wash it gently in the sink|🙌||use the hottest machine,never wash it",
    "What does do not bleach mean?|do not use bleach|🚫||bleach it twice,bleach only the sleeves",
    "What does machine wash cold mean?|wash in cool water|🥶||wash in boiling water,wash with a brush",
    "What does dry clean only mean?|a special cleaner must wash it|🧥||wash it in the lake,throw it away",
    "What does tumble dry low mean?|use gentle heat in the dryer|🌀||use the highest heat,do not dry",
    "Why read the care label?|so clothes do not get ruined|✅||to find the price,to count buttons"
  ], "Care labels use short, clear words."));
  a.push(G("Hem math", [
    "What is a hem?|📏|A <b>hem</b> is the bottom edge folded up and sewn so it does not fray.",
    "Extra cloth|➕|A hem uses extra fabric. To cut, add the hem fold to the finished length.",
    "Example|✏️|Finished length 20 inches and a 2 inch hem. Cut 20 + 2 = 22 inches."
  ], () => {
    if (Math.random() < 0.5) { const f = ri(12, 30), h = pick([1, 2, 3]);
      return { text: `A curtain should be ${f} inches long when finished. The hem folds up ${h} inches. How many inches of fabric should you cut?`, visual: "📏", answer: f + h,
        hints: ["The hem folds up, so you need more cloth.", "Add the hem to the finished length.", "Example: 15 inches finished, 2 inch hem. 15 + 2 = 17 inches. Now do yours."] }; }
    const c = ri(24, 40), h = pick([1, 2, 3]);
    return { text: `You cut a skirt piece ${c} inches long. The hem folds up ${h} inches. How long is the finished skirt?`, visual: "📏", answer: c - h,
      hints: ["The hem folds up and uses some cloth.", "Take the hem away from the cut length.", "Example: cut 30 inches, 2 inch hem. 30 - 2 = 28 inches. Now do yours."] };
  }));
  a.push(L("Mending clothes", [
    "Fix it!|🪡|Mending saves money and keeps clothes out of the trash. Many fixes only need a needle and thread.",
    "Common fixes|🔘|Sew on a <b>missing button</b>, close a <b>ripped seam</b> with small stitches, or sew a <b>patch</b> over a hole.",
    "Steps|🧵|Match the thread color, thread the needle, make a knot, stitch neatly, and tie off the thread at the end."
  ], [
    "A button fell off. What can you do?|sew it back on|🔘||throw the shirt out,glue it with tape",
    "A seam is ripped open. What helps?|small stitches|🪡||a bigger hole,a hammer",
    "What can cover a hole in knees of jeans?|a patch|👖||a sticker,a sock",
    "What color thread is best for mending?|one that matches the cloth|🧵||any color you like,no thread",
    "Why mend clothes?|saves money and waste|♻️||to make them smaller,because it is a rule",
    "What do you tie at the end of your stitching?|a knot|🪢||a bow tie,a bell",
    "What do you do before sewing a seam closed?|pin it in place|📌||cut it more,wet it",
    "Which tool helps if a stitch is wrong?|seam ripper|✂️||whisk,rolling pin"
  ], "Fixing clothes is a useful skill."));
  a.push(L("Family budget", [
    "Money in, money out|💵|<b>Income</b> is money that comes in. <b>Expenses</b> are money that goes out, like food and rent.",
    "A plan|📋|A <b>budget</b> is a plan for money. It lists income, needs, wants and <b>savings</b> (money kept for later).",
    "Balance|⚖️|Spend less than you earn. Cover needs first, then wants, and save some."
  ], [
    "What is income?|money that comes in|💵||money you spend,money you owe",
    "What are expenses?|money that goes out|🧾||money you earn,money in a bank only",
    "What is a budget?|a plan for money|📋||a kind of bank,a type of sale",
    "What are savings?|money kept for later|🐷||money you spent,bills",
    "Which is a need?|food|🥦||a video game,a toy car",
    "Which is a want?|a new toy|🧸||rent,medicine",
    "What should you pay first in a budget?|needs|🏠||wants,treats",
    "A family earns 500 and spends 600. What is wrong?|they spend more than they earn|⚠️||they saved too much,nothing is wrong"
  ], "Think about money in and money out."));
  a.push(G("Saving up", [
    "A goal|🎯|A <b>savings goal</b> is something you save for. Put aside a little each week until you reach it.",
    "Count it|🐷|If you save 4 dollars each week for 5 weeks, you have 4 × 5 = 20 dollars.",
    "Find the weeks|🔢|To find how many weeks you need, divide the goal by the weekly amount."
  ], () => {
    if (Math.random() < 0.5) { const s = pick([2, 3, 4, 5]), w = ri(3, 9);
      return { text: `You save ${s} dollars each week. How many dollars do you have after ${w} weeks?`, visual: "🐷", answer: s * w,
        hints: ["The same amount is added each week.", "Multiply dollars per week by the number of weeks.", "Example: 3 dollars a week for 4 weeks. 3 × 4 = 12 dollars. Now do yours."] }; }
    const s = pick([2, 3, 4, 5]), w = ri(3, 9);
    return { text: `A book costs ${s * w} dollars. You save ${s} dollars each week. How many weeks until you can buy it?`, visual: "📚", answer: w,
      hints: ["Ask how many groups of the weekly amount fit in the cost.", "Divide the cost by the dollars saved per week.", "Example: A toy costs 20 dollars and you save 5 a week. 20 ÷ 5 = 4 weeks. Now do yours."] };
  }));
  a.push(L("Cleaning the kitchen", [
    "Clean as you go|🧽|Wipe spills right away and wash tools as you cook. A clean kitchen is a safe kitchen.",
    "Dishes and counters|🍽️|Wash dishes in hot soapy water, rinse, and let them dry. Clean counters with soap and water or a safe kitchen cleaner.",
    "Be careful|⚠️|Never mix cleaning products. Some mixes make dangerous gas. Ask a grown-up and read the label."
  ], [
    "What should you do when you spill milk?|wipe it up right away|🥛||leave it until tomorrow,pour more",
    "How do you wash dishes best?|hot soapy water|🧼||cold plain water,sand",
    "Should you mix cleaning products together?|no|⚠️||yes always,only on Sundays",
    "Who should help with strong cleaners?|a grown-up|🧴||a baby,no one",
    "What do you do after washing a dish?|rinse and let it dry|🍽️||wipe it with a dirty cloth,leave soap on",
    "Why wipe counters after cooking?|to remove germs and crumbs|🧽||to make them sticky,to make bugs welcome",
    "Where should dirty dish towels go?|in the laundry|🧺||on the counter forever,in the fridge",
    "What does cleaning as you go mean?|tidy up while you cook|🧹||clean only next week,never clean"
  ], "A clean kitchen is a safe kitchen."));
  a.push(G("Prep plus cook time", [
    "Total time|⏱️|Total time is <b>prep time</b> plus <b>cook time</b>. Add them to know when food will be ready.",
    "Example|✏️|Prep 15 minutes and cook 30 minutes. 15 + 30 = 45 minutes in all.",
    "Time left|⌛|To find time left, take the minutes that have passed away from the cook time."
  ], () => {
    if (Math.random() < 0.5) { const p = pick([10, 15, 20]), c = pick([25, 30, 35, 40]);
      return { text: `A recipe has ${p} minutes of prep and ${c} minutes of cooking. How many minutes in all?`, visual: "⏱️", answer: p + c,
        hints: ["You need both parts of the time.", "Add the prep time and the cook time.", "Example: 10 minutes of prep and 20 minutes of cooking. 10 + 20 = 30 minutes. Now do yours."] }; }
    const c = pick([40, 45, 50, 60]), e = pick([10, 15, 20, 25]);
    return { text: `A pie bakes for ${c} minutes. It has baked for ${e} minutes. How many minutes are left?`, visual: "🥧", answer: c - e,
      hints: ["Part of the time is already used up.", "Take the time already baked away from the whole time.", "Example: A cake bakes 30 minutes and 10 have passed. 30 - 10 = 20 minutes left. Now do yours."] };
  }));
  a.push(L("Healthy snacks", [
    "Snack smart|🍎|A snack is a small food between meals. Good snacks give you energy and good nutrients.",
    "Mix two|🧀🍇|Pair foods from two groups, like apple slices and cheese, or carrots and hummus. They keep you full longer.",
    "Plan ahead|🥕|Wash and cut veggies ahead of time so healthy snacks are easy to grab."
  ], [
    "Which is a smart snack?|apple slices and cheese|🍎||candy and soda,chips for dinner",
    "Which pair has two food groups?|carrots and hummus|🥕||candy and gum,soda and juice",
    "Why plan snacks ahead?|healthy ones are easy to grab|🥕||to waste food,to skip lunch",
    "Which snack has protein?|yogurt|🥛||lollipop,sugary cereal bar",
    "Which drink goes best with a snack?|water|💧||soda,energy drink",
    "A good snack gives you...|energy and nutrients|⚡||only sugar,nothing",
    "Which is a whole grain snack?|popcorn without lots of butter|🍿||gummy worms,frosting",
    "How big should a snack be?|small, between meals|🥜||bigger than dinner,a whole cake"
  ], "A snack should help your body."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[6], a[9], a[12]]));
  a.push(MIX("Level 7 Challenge", [a[1], a[3], a[5], a[7], a[8], a[10], a[11], a[13], a[14], a[15], a[16], a[17]]));

  // ================= LEVEL 8 =================
  const b = [];
  b.push(G("Adding fractions of cups", [
    "Same-size parts|🥣|A cup cut into 4 equal parts has quarters. 1/4 + 2/4 = 3/4. When the bottom numbers match, add the top numbers.",
    "Keep the bottom|🔢|The bottom number tells the size of the pieces. It stays the same when you add.",
    "Example|✏️|A recipe needs 2/8 cup of milk and 3/8 cup of cream. 2 + 3 = 5, so it is 5/8 cup in all."
  ], () => {
    const d = pick([4, 5, 6, 8, 10]), x = ri(1, d - 2), y = ri(1, d - 1 - x), a = `${x + y}/${d}`;
    return { text: `A recipe needs ${x}/${d} cup of oil and ${y}/${d} cup of honey. How much is that in all?`, visual: "🥣", choices: shuf([a, `${x + y}/${2 * d}`, `${x + y + 1}/${d}`]), answer: a,
      hints: ["The pieces are the same size, so the bottom number stays.", "Add only the top numbers.", "Example: 1/6 cup plus 3/6 cup. 1 + 3 = 4, so it is 4/6 cup. Now do yours."] };
  }));
  b.push(G("Ounces and pounds", [
    "Weight|⚖️|We weigh food in ounces (oz) and pounds (lb). <b>16 ounces = 1 pound</b>.",
    "Pounds to ounces|✖️|To change pounds to ounces, multiply by 16. 2 pounds = 2 × 16 = 32 ounces.",
    "Ounces to pounds|➗|To change ounces to pounds, divide by 16. 48 ounces is 3 pounds."
  ], () => {
    if (Math.random() < 0.5) { const k = ri(2, 6);
      return { text: `1 pound is 16 ounces. How many ounces are in ${k} pounds?`, visual: "⚖️", answer: 16 * k,
        hints: ["Each pound has the same number of ounces.", "Multiply the pounds by 16.", "Example: 3 pounds. 3 × 16 = 48 ounces. Now do yours."] }; }
    const k = ri(2, 6);
    return { text: `A bag of rice weighs ${16 * k} ounces. How many pounds is that?`, visual: "🍚", answer: k,
      hints: ["Group the ounces into pounds.", "Divide the ounces by 16.", "Example: 64 ounces. 64 ÷ 16 = 4 pounds. Now do yours."] };
  }));
  b.push(G("Gallons, quarts and cups", [
    "Big liquid measures|🫙|<b>1 gallon = 4 quarts</b>. <b>1 quart = 2 pints</b>. <b>1 pint = 2 cups</b>.",
    "Chain it|🔗|Since 1 quart is 4 cups, 1 gallon is 4 × 4 = 16 cups.",
    "Use it|🥛|Multiply to go to a smaller unit. Divide to go to a bigger unit."
  ], () => {
    const r = Math.random();
    if (r < 0.34) { const k = ri(2, 6);
      return { text: `1 gallon is 4 quarts. How many quarts are in ${k} gallons?`, visual: "🫙", answer: 4 * k,
        hints: ["Each gallon holds the same number of quarts.", "Multiply gallons by the quarts in one gallon.", "Example: 5 gallons. 5 × 4 = 20 quarts. Now do yours."] }; }
    if (r < 0.67) { const k = ri(2, 6);
      return { text: `1 quart is 2 pints. How many pints are in ${k} quarts?`, visual: "🥛", answer: 2 * k,
        hints: ["Each quart holds the same number of pints.", "Count by 2s, once for each quart.", "Example: 7 quarts. 7 × 2 = 14 pints. Now do yours."] }; }
    const k = ri(2, 3);
    return { text: `1 gallon is 16 cups. How many cups are in ${k} gallons?`, visual: "🫙", answer: 16 * k,
      hints: ["Each gallon is made of many cups.", "Multiply gallons by the cups in one gallon.", "Example: 4 gallons would be 4 × 16 = 64 cups. Now do yours with a different number of gallons."] };
  }));
  b.push(L("Nutrition Facts label", [
    "The label|🏷️|Packaged food has a <b>Nutrition Facts</b> label. It starts with the <b>serving size</b> and how many <b>servings</b> are in the package.",
    "Numbers|🔢|It lists <b>calories</b>, fat, <b>sodium</b> (salt), carbs, fiber, sugars and protein. <b>% Daily Value</b> shows how much of a day's amount one serving gives.",
    "Smart reading|👀|Fiber, calcium and vitamin D are good to get. Choose foods with less added sugar and sodium."
  ], [
    "What does the serving size tell you?|how much counts as one serving|🥣||the price,the color of the box",
    "What is sodium?|salt|🧂||sugar,fiber",
    "Where do you see how many servings are in a package?|the Nutrition Facts label|🏷️||the barcode,the lid",
    "What does % Daily Value show?|how much of a day's amount a serving gives|📊||how much it costs,how old it is",
    "If you eat two servings, the numbers...|double|✌️||stay the same,disappear",
    "Which is good to find more of on a label?|fiber|🌾||added sugar,sodium",
    "What are calories?|a measure of energy|⚡||a kind of vitamin,a type of salt",
    "Which line shows sugar that was put into the food?|added sugars|🍬||fiber,protein"
  ], "The label is a quick fact sheet."));
  b.push(L("Calories and energy", [
    "Fuel|⚡|Your body uses food for energy to move, think and grow. A <b>calorie</b> is a way to measure that energy.",
    "Different foods|🍽️|Some foods have lots of calories in a small amount, like oil and nuts. Others have few, like celery and water.",
    "Balance|⚖️|Active kids need good fuel. Choose foods that give energy and nutrients, not only sugar."
  ], [
    "What do we use calories to measure?|energy in food|⚡||the weight of a plate,the age of a food",
    "Why does your body need energy from food?|to move, think and grow|🏃||to become a statue,to shrink",
    "Which has almost no calories?|water|💧||cooking oil,peanut butter",
    "Which gives more energy in a small amount?|a spoon of oil|🫒||a stalk of celery,a cup of water",
    "A kid plays sports all day. They need...|more fuel from food|⚽||no food at all,only candy",
    "Where do you find calories listed?|the Nutrition Facts label|🏷️||the care label,the receipt",
    "Which food is good energy plus nutrients?|oatmeal with fruit|🥣||frosting,soda",
    "Which has more energy in a spoonful?|nut butter|🥜||plain lettuce,cucumber water"
  ], "Calories are energy, not good or bad."));
  b.push(L("Ingredient lists", [
    "The list|📜|The <b>ingredient list</b> shows what is inside a food. It lists the most plentiful ingredient first (by weight).",
    "Read the order|🔍|If sugar is first or near the top, the food has a lot of sugar. A short list of simple ingredients is often a good sign.",
    "Allergy warning|⚠️|Labels say \"Contains\" followed by common allergens like milk, eggs, peanuts or wheat."
  ], [
    "Which ingredient is listed first?|the most plentiful one|1️⃣||the cheapest one,the oldest one",
    "A cereal lists sugar first. What does that mean?|it has a lot of sugar|🥣||it has no sugar,it is all fruit",
    "Where do you find allergen warnings?|the Contains line|⚠️||the price tag,the barcode",
    "Which ingredient list looks simpler?|oats, raisins, cinnamon|📜||ten long chemical names,only colors",
    "A label says Contains: milk. Who should avoid it?|someone allergic to milk|🥛||someone who loves it,nobody",
    "Why read the ingredient list?|to know what is inside|🔍||to count letters,to find the color",
    "The last ingredient is the...|least plentiful|🔚||most plentiful,only sweet one",
    "Where is the ingredient list?|on the package|📦||in the air,on the sidewalk"
  ], "Order tells how much is in the food."));
  b.push(L("Food allergies", [
    "Allergies|🥜|A <b>food allergy</b> happens when the body reacts badly to a food. Common ones are milk, eggs, peanuts, tree nuts, fish, shellfish, wheat, soy and sesame.",
    "Signs|🚨|An allergic reaction can cause itching, swelling, hives, tummy pain or trouble breathing. Tell a grown-up right away.",
    "Be kind and careful|🤝|Never share food with a friend who has an allergy unless a grown-up says it is safe. Wash hands and tools after using allergy foods."
  ], [
    "Which is a common food allergy?|peanuts|🥜||carrots,apples",
    "A friend has a peanut allergy. What do you do?|check with a grown-up before sharing food|🤝||share your peanut butter bar,hide the food",
    "Someone gets swelling after eating a food. What first?|tell a grown-up right away|🚨||wait and see,eat more",
    "Which is another common allergy?|milk|🥛||lettuce,rice",
    "How does food get safe for an allergic person?|keep their food apart and tools clean|🧼||just pick it out,use the same spoon",
    "What does a food allergy mean?|the body reacts badly to a food|⚠️||the food is old,the food is cold",
    "What should you read to find allergens?|the Contains line|🏷️||the date,the barcode",
    "Is it kind to tease someone about their allergy?|no|💛||yes,only on weekends"
  ], "Stay safe and be kind."));
  b.push(L("Cooking terms", [
    "Heat words|🔥|<b>Preheat</b> means heating the oven before baking. <b>Simmer</b> means cooking gently with small bubbles. <b>Sauté</b> means cooking quickly in a little oil.",
    "Mix words|🥣|<b>Fold</b> means gently turning one mix into another. <b>Knead</b> means pressing and stretching dough. <b>Marinate</b> means soaking in a tasty liquid.",
    "More|🍋|<b>Zest</b> is the colorful outside of a citrus peel. <b>Baste</b> means spooning juices over food as it cooks."
  ], [
    "What does preheat mean?|heat the oven before baking|🔥||cool the oven,wash the oven",
    "What does simmer mean?|cook gently with small bubbles|🍲||boil hard and fast,freeze",
    "What does sauté mean?|cook quickly in a little oil|🍳||bake for an hour,chill overnight",
    "What does knead mean?|press and stretch dough|🥖||slice thinly,pour",
    "What does fold mean?|gently turn one mix into another|🥣||tear in pieces,heat quickly",
    "What does marinate mean?|soak food in a tasty liquid|🍗||peel it,dry it",
    "What is zest?|the colorful outside of a citrus peel|🍋||the juice,the seeds",
    "What does baste mean?|spoon juices over food|🥄||throw out,cut off"
  ], "Picture what the cook does."));
  b.push(L("Baking science", [
    "Ingredient jobs|🧁|<b>Flour</b> gives structure. <b>Eggs</b> hold things together. <b>Sugar</b> adds sweetness and helps browning. <b>Butter or oil</b> makes it tender.",
    "Rising|⬆️|<b>Baking powder</b> and <b>baking soda</b> make bubbles of gas, so cakes get light and fluffy.",
    "Heat|🌡️|The oven heat sets the batter. Too hot and the outside burns. Too cool and it stays pale and flat."
  ], [
    "Which ingredient gives baked goods structure?|flour|🌾||salt,sprinkles",
    "Which ingredient helps hold a cookie together?|egg|🥚||water bottle,nutmeg only",
    "Which makes a cake rise?|baking powder|⬆️||vanilla,cocoa",
    "What does sugar do besides sweeten?|helps browning|🍪||makes it saltier,makes it gray",
    "What makes baked goods tender?|butter or oil|🧈||more flour,less eggs",
    "What should you do before baking?|preheat the oven|🔥||open the oven door,turn the oven off",
    "What happens if the oven is too hot?|the outside can burn|🌡️||it never cooks,it gets cold",
    "Why do bubbles of gas matter in baking?|they make it light and fluffy|🫧||they make it hard,they make it heavy"
  ], "Each ingredient has a job."));
  b.push(G("Temperature change", [
    "Degrees|🌡️|Cooking temperatures are in degrees Fahrenheit (°F). Water boils at 212°F.",
    "Difference|➖|To find how many degrees to go up, take the start temperature away from the goal.",
    "Example|✏️|From 70°F to 100°F: 100 - 70 = 30 degrees."
  ], () => {
    if (Math.random() < 0.5) { const s = pick([60, 65, 70, 72, 75]);
      return { text: `Tap water is ${s}°F. Water boils at 212°F. How many degrees must it rise to boil?`, visual: "🌡️", answer: 212 - s,
        hints: ["Find the gap between two temperatures.", "Take the starting temperature away from 212.", "Example: A pot at 80°F boiling at 212°F. 212 - 80 = 132. Now do yours."] }; }
    const s = pick([325, 350, 375]), t = s + pick([25, 50, 75]);
    return { text: `The oven is at ${s}°F. A recipe needs it at ${t}°F. How many degrees must it go up?`, visual: "🌡️", answer: t - s,
      hints: ["Find how much higher the new temperature is.", "Take the start away from the goal.", "Example: from 300°F to 350°F. 350 - 300 = 50. Now do yours."] };
  }));
  b.push(L("Farm to table", [
    "Where food comes from|🌾|Food starts on farms. Wheat grows in fields and is ground into flour. Cows give milk and hens lay eggs.",
    "The trip|🚚|Farm food is cleaned, packed, and carried by trucks to stores or farmers' markets.",
    "Words|📅|<b>Local</b> means grown nearby. <b>Seasonal</b> means grown in a certain time of the year, like pumpkins in fall."
  ], [
    "What is flour made from?|ground grain like wheat|🌾||ground ice,melted cheese",
    "Where do eggs come from?|hens|🐔||cows,bees",
    "Who makes honey?|bees|🐝||cows,hens",
    "What does local food mean?|grown nearby|📍||grown on the moon,very old",
    "What does seasonal mean?|grown in a certain time of year|🍂||grown only in a freezer,never grows",
    "Where can you buy food straight from farmers?|a farmers' market|🧺||a car wash,a gas pump",
    "What carries food from farms to stores?|trucks|🚚||balloons,boats only",
    "Where does milk come from?|dairy cows|🐄||wheat plants,bees"
  ], "Follow the food back to the farm."));
  b.push(G("Grocery budget", [
    "Adding prices|🛒|To find the total, add the price of each item.",
    "Change|💵|<b>Change</b> is what you get back. Subtract the total from the money you paid.",
    "Example|✏️|Items cost 4, 3 and 5 dollars. Total is 12. Pay with 20 dollars and get 20 - 12 = 8 dollars back."
  ], () => {
    const a1 = ri(2, 6), b1 = ri(2, 6), c1 = ri(2, 6), f = pick(["bread", "cheese", "pasta", "juice", "rice"]), g = pick(["milk", "apples", "eggs", "beans"]), h = pick(["cereal", "yogurt", "carrots", "chicken"]), pay = pick([20, 20, 25, 30]);
    return { text: `${f} costs ${a1} dollars, ${g} costs ${b1} dollars, and ${h} costs ${c1} dollars. You pay with ${pay} dollars. How many dollars do you get back?`, visual: "🛒", answer: pay - a1 - b1 - c1,
      hints: ["First find how much the food costs in all.", "Add the three prices, then take that from what you paid.", "Example: items cost 2, 5 and 6 dollars, paid with 20. 2 + 5 + 6 = 13. 20 - 13 = 7 dollars back. Now do yours."] };
  }));
  b.push(L("Smart shopper", [
    "Think first|🧠|Ads want you to buy. A smart shopper asks: do I need it? Is it a good price?",
    "Tricks|🛍️|Make a list and stick to it. Do not shop while hungry. Compare the price per unit. Store brands often cost less.",
    "Check|✅|Look at the date and the label, not just the picture on the front of the box."
  ], [
    "Why make a shopping list?|buy what you need|📝||buy more candy,forget things",
    "Why not shop when you are very hungry?|you may buy too much|🛒||food tastes bad then,stores are closed",
    "What do ads try to do?|make you want to buy|📺||teach you math,fix your shoes",
    "What often costs less?|store brand|🏷️||fancy packaging,a tiny size",
    "What is a good question before buying?|do I need it|🤔||does it sparkle,is it loud",
    "Where should you check the facts about food?|the label|🔍||the cartoon on the box,the color",
    "What should you compare to find the best deal?|price per unit|💲||the box size only,the picture",
    "What should you check on food before you buy?|the date|📅||the shelf color,the cart"
  ], "Smart shoppers think before they buy."));
  b.push(L("Sewing terms and patterns", [
    "Pattern|📐|A <b>pattern</b> is a paper guide for the shapes of cloth to cut. You pin it to the fabric and cut around it.",
    "Parts|✂️|A <b>seam</b> joins two pieces. A <b>hem</b> is a folded edge. <b>Notions</b> are small supplies like buttons, zippers and thread.",
    "More|📍|The <b>selvage</b> is the finished edge of fabric that does not fray. A <b>seam ripper</b> takes out stitches."
  ], [
    "What is a pattern?|a paper guide for cutting cloth|📐||a kind of stitch,a type of button",
    "What is a seam?|where two pieces are sewn together|🧵||a folded bottom edge,a button hole",
    "What is a hem?|a folded and sewn edge|📏||a thread color,a needle",
    "What are notions?|small supplies like buttons and zippers|🔘||big machines,kinds of cloth",
    "What is the selvage?|the finished edge that does not fray|🧶||the pattern paper,the thread",
    "What takes out wrong stitches?|seam ripper|✂️||ruler,pincushion",
    "What holds pattern paper on fabric?|pins|📌||glue and sand,a stapler only",
    "What do you do after pinning the pattern?|cut around it|✂️||eat it,fold it into a ball"
  ], "Sewing has its own words."));
  b.push(G("Yards of fabric", [
    "Fabric length|📏|Fabric is sold by the <b>yard</b>. <b>1 yard = 3 feet = 36 inches</b>.",
    "Yards to feet|✖️|Multiply the yards by 3 to get feet. 2 yards = 6 feet.",
    "Yards to inches|🔢|Multiply the yards by 36 to get inches. 2 yards = 72 inches."
  ], () => {
    if (Math.random() < 0.5) { const k = ri(2, 9);
      return { text: `1 yard is 3 feet. How many feet are in ${k} yards of fabric?`, visual: "📏", answer: 3 * k,
        hints: ["Each yard is the same number of feet.", "Count by 3s once for each yard.", "Example: 6 yards. Count by 3s: 6 × 3 = 18 feet. Now do yours."] }; }
    const k = ri(2, 4);
    return { text: `1 yard is 36 inches. How many inches are in ${k} yards?`, visual: "🧵", answer: 36 * k,
      hints: ["Each yard is a long number of inches.", "Multiply the yards by the inches in one yard.", "Example: 5 yards. 5 × 36 = 180 inches. Now do yours with your own number of yards."] };
  }));
  b.push(L("Sorting laundry", [
    "Sort first|🧺|Sort laundry into <b>whites</b>, <b>darks</b> and <b>colors</b>. Dark clothes can bleed color onto light ones.",
    "Special loads|🧦|Wash towels and heavy jeans on their own. Wash delicate clothes on a gentle cycle. Check pockets for tissues and coins.",
    "Dryer safety|🔥|Clean the lint trap before every dryer load. Lint can catch fire. Do not overfill the washer."
  ], [
    "Why sort laundry by color?|dark colors can bleed onto light ones|🧺||it is more fun,socks get lonely",
    "Which group should be washed together?|whites|⬜||a red shirt with white socks,a new black shirt with white shirts",
    "What should you check before washing?|pockets|👖||the weather,the sofa",
    "Which cycle is for delicate clothes?|gentle|🧼||heavy,boil",
    "What should you clean before drying?|the lint trap|🔥||the window,the door",
    "Why clean the lint trap?|lint can catch fire|⚠️||it makes clothes sing,to save lint",
    "Why not stuff the washer too full?|clothes will not get clean|🧺||it makes noise stop,clothes grow",
    "Which clothes are best washed alone?|a new red shirt|👕||white socks,old gray towels"
  ], "Keep colors and kinds together."));
  b.push(L("Managing your time", [
    "Plan the work|📝|Make a list of jobs. Guess how long each takes. Do the most important or hardest job first.",
    "Break it up|🧩|Split a big job into small steps. Cleaning a room can be: clothes, trash, then floor.",
    "Helpers|🤝|Set a timer to stay on track. Ask for help when you need it. Teamwork makes work faster."
  ], [
    "What helps you remember jobs to do?|a list|📝||guessing,a loud noise",
    "How can you make a big job easier?|split it into small steps|🧩||ignore it,do it all at once without a plan",
    "What can keep you on track?|a timer|⏲️||a nap,a puzzle",
    "Which job should come first?|the most important one|1️⃣||the one you like least to look at,any silly one",
    "Dinner needs 3 jobs. What helps?|share the jobs with family|👨‍👩‍👧||do nothing,do them all at once yourself",
    "Why guess how long a job takes?|to plan your time|⌛||to scare yourself,to waste time",
    "You are stuck on a job. What do you do?|ask for help|🙋||give up forever,hide",
    "What is a good first step for cleaning a room?|pick up clothes|👕||paint the walls,move out"
  ], "Plan, split, and share."));
  b.push(G("Start cooking on time", [
    "Work backward|🕕|To serve dinner at a certain time, start earlier. Take the cooking minutes away from the dinner time.",
    "Hours and minutes|⌛|There are 60 minutes in an hour. 6:00 minus 15 minutes is 5:45.",
    "Example|✏️|Dinner at 7:00 and cooking takes 30 minutes. Start at 6:30."
  ], () => {
    const h = pick([5, 6, 7]), m = pick([15, 30, 45, 60]), fmt = t => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`, t = h * 60 - m, a = fmt(t);
    return { text: `You want to eat dinner at ${h}:00. The meal takes ${m} minutes to cook. What time should you start?`, visual: "🕕", choices: shuf([a, fmt(t - 15), fmt(t + 15)]), answer: a,
      hints: ["You must start before dinner time.", "Go back from dinner time by the cooking minutes.", "Example: Dinner at 8:00 and cooking takes 30 minutes. 8:00 back 30 minutes is 7:30. Now do yours."] };
  }));
  b.push(MIX("Mixed practice", [b[0], b[3], b[6], b[9], b[12], b[15]]));
  b.push(MIX("Level 8 Challenge", [b[1], b[2], b[4], b[5], b[7], b[8], b[10], b[11], b[13], b[14], b[16], b[17]]));

  // ================= LEVEL 9 =================
  const c = [];
  c.push(G("Eighth cups", [
    "Eighths|⅛|A cup cut into 8 equal parts has eighths. <b>1/2 cup = 4/8</b>. <b>1/4 cup = 2/8</b>. <b>3/4 cup = 6/8</b>.",
    "Equal amounts|🟰|Fractions can look different and still be the same amount. Double the top and bottom of 1/4 to get 2/8.",
    "Use it|🥣|If you only have a 1/8 cup scoop, count how many scoops fill the amount you need."
  ], () => {
    const t = pick([[1, 2, 4], [1, 4, 2], [3, 4, 6], [1, 1, 8], [2, 4, 4]]);
    if (Math.random() < 0.6) { const nm = t[1] === 1 ? "1 whole cup" : `${t[0]}/${t[1]} cup`;
      return { text: `You only have a 1/8 cup scoop. How many scoops fill ${nm}?`, visual: "⅛", answer: t[2],
        hints: ["A whole cup is made of eight scoops this size.", "Change the fraction to eighths by multiplying the top and bottom by the same number.", "Example: 1/2 cup is the same as 4/8 cup. Then 3/4 cup is 6/8 cup, which is 6 scoops. Now do yours."] }; }
    const e = pick([2, 4, 6, 8]);
    return { text: `A recipe uses ${e}/8 cup of milk. How many quarter cups (1/4) is that?`, visual: "⅛", answer: e / 2,
      hints: ["Two eighths make one quarter.", "Put the eighths into groups of 2.", "Example: 6/8 cup. 6 eighths in groups of 2 make 3 quarters. Now do yours with a different number."] };
  }));
  c.push(G("Price times amount", [
    "Cost for many|🛒|If one item costs a price, many items cost price × amount.",
    "Cents and dollars|💲|$1.50 is one dollar and fifty cents. Two of them make $3.00. 4 quarters make $1.00.",
    "Tip|💡|Use easy pairs: $2.50 + $2.50 = $5. Two $1.25 items make $2.50."
  ], () => {
    const o = pick([["0.50", 0.5, [2, 4, 6, 8]], ["1.50", 1.5, [2, 4, 6]], ["2.50", 2.5, [2, 4, 6]], ["1.25", 1.25, [4, 8]], ["0.75", 0.75, [4, 8]], ["0.25", 0.25, [4, 8, 12]]]);
    const n = pick(o[2]), f = pick(["pear", "roll", "muffin", "apple", "pretzel"]);
    return { text: `Each ${f} costs $${o[0]}. How many dollars do ${n} ${f}s cost in all?`, visual: "🛒", answer: o[1] * n,
      hints: ["Buying many means adding the same price again and again.", "Multiply the price by the number you buy, or add easy pairs.", "Example: Each roll costs $0.50. 4 rolls are 4 × $0.50 = $2. Now do yours."] };
  }));
  c.push(G("Half off and quarter off", [
    "Sales|🏷️|<b>Half off</b> means you pay half the price. <b>A quarter off</b> (25% off) means you save one fourth of the price.",
    "Half|➗|Half off $12 means you save $6, so you pay $6.",
    "Quarter off|✏️|A quarter off $8: one fourth of 8 is 2. You save $2, so you pay 8 - 2 = $6."
  ], () => {
    if (Math.random() < 0.5) { const p = pick([6, 8, 10, 12, 16, 20, 30, 40]);
      return { text: `A pot costs $${p}. It is half off. How many dollars do you pay?`, visual: "🏷️", answer: p / 2,
        hints: ["Half off means the price is cut in two parts.", "Divide the price by 2.", "Example: A lamp costs $18 and is half off. 18 ÷ 2 = $9. Now do yours."] }; }
    const p = pick([8, 12, 16, 20, 24, 40]);
    return { text: `A set of bowls costs $${p}. It is a quarter off (25% off). How many dollars do you pay?`, visual: "🏷️", answer: p - p / 4,
      hints: ["First find a quarter of the price.", "Divide the price by 4, then take that from the price.", "Example: $28 with a quarter off. 28 ÷ 4 = 7. 28 - 7 = $21. Now do yours."] };
  }));
  c.push(L("Carbs, protein and fat", [
    "Big three|🥗|Food gives us three big kinds of nutrients: <b>carbohydrates</b>, <b>protein</b> and <b>fat</b>.",
    "Jobs|💪|<b>Carbs</b> give quick energy (bread, rice, fruit). <b>Protein</b> builds and repairs muscles. <b>Fat</b> gives lasting energy and helps the body use some vitamins.",
    "Fiber|🌾|<b>Fiber</b> is a kind of carb the body cannot digest. It helps your tummy work well. Whole grains, beans and fruit have it."
  ], [
    "Which nutrient gives quick energy?|carbohydrates|🍞||vitamin C only,calcium",
    "Which nutrient builds and repairs muscles?|protein|💪||fiber,sugar",
    "Which food is mostly carbs?|rice|🍚||chicken breast,butter",
    "Which nutrient gives lasting energy?|fat|🥑||water,fiber",
    "What does fiber help?|digestion|🌾||eyesight only,hair color",
    "Which food has lots of fiber?|beans|🫘||soda,white sugar",
    "Which is a source of healthy fat?|avocado|🥑||lemonade,jelly",
    "Which is mostly protein?|egg|🥚||bread,jam"
  ], "Each nutrient has a job."));
  c.push(L("Water and drinks", [
    "Why water?|💧|Your body needs water to carry nutrients, keep a steady temperature and get rid of waste. We lose water when we sweat.",
    "Best choice|🥤|Water is the best drink most of the time. Milk helps bones. Juice and soda can have a lot of sugar.",
    "Thirst|☀️|Drink more when it is hot or when you are active. Dark yellow pee, headache or a dry mouth can mean you need more water."
  ], [
    "What is the best drink most days?|water|💧||soda,sweet punch",
    "When should you drink more water?|when it is hot or you are active|☀️||when you are sleeping only,never",
    "How do we lose water?|sweat|😅||laughing only,by cutting hair",
    "Which drink helps bones?|milk|🥛||soda,sports drink",
    "Which can have lots of sugar?|soda|🥤||plain water,plain milk",
    "What does water do in the body?|carries nutrients|🚰||makes you taller instantly,turns food blue",
    "A dry mouth can mean you need...|water|👄||a nap only,more candy",
    "Which is a good drink with dinner?|water or milk|🍽️||soda every time,iced coffee"
  ], "Water does lots of jobs."));
  c.push(L("Sugar, salt and fat on labels", [
    "Added sugar|🍬|<b>Added sugars</b> are sugars put in during making, such as in soda and cookies. Too much can harm teeth and health.",
    "Sodium|🧂|<b>Sodium</b> is the salt in food. Chips, canned soup and fast food can have a lot.",
    "% Daily Value|📊|On a label, <b>5% or less</b> of a nutrient is low. <b>20% or more</b> is high. Aim low for sodium and added sugar."
  ], [
    "What is added sugar?|sugar put in while making the food|🍬||sugar in an apple,sugar in a stone",
    "What does sodium mean?|salt|🧂||sugar,fiber",
    "A label says 25% Daily Value of sodium. Is that high or low?|high|📊||low,none",
    "A label says 3% Daily Value of added sugar. Is that high or low?|low|📊||high,very high",
    "Which snack likely has the most sodium?|salty chips|🥔||fresh grapes,plain oats",
    "Which food has natural sugar, not added?|an orange|🍊||soda,candy",
    "Too much added sugar can harm...|teeth|🦷||eyebrows,shoes",
    "What number means a nutrient is low?|5% or less|🔢||20% or more,50% or more"
  ], "Check the % Daily Value."));
  c.push(L("Dates on food", [
    "Date words|📅|<b>Use by</b> is the last day for best quality or safety. <b>Best by</b> is for best flavor. <b>Sell by</b> tells the store how long to display it.",
    "Check|🔍|Look at dates when you shop and when you cook. Use food with the earliest dates first.",
    "Trust your senses|👃|If food smells bad or looks moldy, do not eat it. Never taste food to see if it is bad. If a can bulges or leaks, throw it away."
  ], [
    "Who is the sell by date mostly for?|the store|🏪||the moon,the cook only",
    "What does best by tell you?|when the flavor is best|📅||when to throw the box,how many it feeds",
    "What should you do with moldy bread?|throw it away|🍞||cut off the mold and eat,toast it",
    "A can is bulging. What do you do?|throw it away|🥫||open and taste it,heat it up",
    "Which do you use first?|the food with the earliest date|📆||the newest one,the one you like least",
    "Should you taste food to see if it is bad?|no|👅||yes,only a tiny bit",
    "Milk smells sour. What do you do?|do not drink it|🥛||drink it fast,give it to a friend",
    "What does use by tell you?|the last day for best quality or safety|⏳||when to buy more,the price"
  ], "Dates help you pick fresh food."));
  c.push(L("Cuts and prep words", [
    "Sizes|🔪|<b>Slice</b> means to cut thin flat pieces. <b>Chop</b> means rough pieces. <b>Dice</b> means small cubes. <b>Mince</b> means very tiny pieces.",
    "More|🥕|<b>Julienne</b> means thin sticks, like matchsticks. <b>Grate</b> means rub on a grater into shreds.",
    "Safety|🧤|Cut with a sharp knife on a stable board, with fingers curled in a <b>claw</b> grip. A grown-up should help kids with big knives."
  ], [
    "What does mince mean?|cut into very tiny pieces|🧄||cut into thin sticks,cut in half",
    "What does dice mean?|cut into small cubes|🧊||cut into long sticks,tear",
    "What does julienne mean?|cut into thin sticks|🥕||cut into cubes,mash",
    "What does chop mean?|cut into rough pieces|🥬||cut into thin sticks,melt",
    "What do you use to make cheese shreds?|a grater|🧀||a ladle,a spatula",
    "What is the claw grip?|fingers curled in while cutting|🖐️||fingers stretched out flat,holding the knife blade",
    "What should be under your food when you cut?|a stable cutting board|🔪||a wobbly plate,your hand",
    "Which is the tiniest cut?|mince|🧄||chop,slice"
  ], "The words tell the size of the pieces."));
  c.push(L("Herbs and spices", [
    "Flavor boosters|🌿|<b>Herbs</b> are leaves of plants, like basil, parsley and mint. <b>Spices</b> come from seeds, bark, roots or fruit, like pepper, cinnamon and ginger.",
    "Use them|🧂|Herbs and spices add flavor without extra salt. Add dried herbs early, but fresh herbs near the end of cooking.",
    "Smell|👃|Smell a spice before you use it. A little goes a long way."
  ], [
    "Which is a leafy herb?|basil|🌿||cinnamon,ginger",
    "Which spice comes from tree bark?|cinnamon|🪵||parsley,mint",
    "Which spice comes from a root?|ginger|🫚||basil,cilantro",
    "What do herbs and spices add?|flavor|😋||salt only,water",
    "When do you add fresh herbs?|near the end of cooking|🌿||at the very start for hours,never",
    "Where does black pepper come from?|dried peppercorns|⚫||tree bark,mint leaves",
    "Which is a herb?|parsley|🌿||cinnamon stick,vanilla bean",
    "Why use herbs and spices?|add taste without extra salt|🧂||to make food heavier,to hide the food"
  ], "Think about leaf or bark or root."));
  c.push(L("Bread and yeast", [
    "Yeast|🍞|<b>Yeast</b> is a tiny living thing. It eats sugar and makes gas bubbles that make bread dough rise.",
    "Steps|🥖|Mix dough, <b>knead</b> it to make it stretchy, let it <b>rise</b> in a warm place, shape it, and bake.",
    "Other breads|🫓|<b>Quick breads</b> like banana bread use baking powder or soda, not yeast. <b>Flatbreads</b> like tortillas do not rise much."
  ], [
    "What makes yeast dough rise?|gas bubbles|🫧||cold air,salt",
    "What does yeast eat?|sugar|🍬||metal,plastic",
    "Why do we knead dough?|to make it stretchy|🤲||to make it pale,to make it shrink",
    "Where should dough rise?|a warm place|🌡️||in the freezer,in the sink",
    "Which bread does not use yeast?|banana bread|🍌||sandwich loaf,pizza dough",
    "Which is a flatbread?|tortilla|🫓||sandwich loaf,dinner roll",
    "What happens if yeast is too hot?|it can die|🔥||it grows faster,it turns pink",
    "What do you do after the dough rises?|shape it and bake|🍞||throw it out,add more yeast and wait a year"
  ], "Yeast is alive."));
  c.push(G("Minutes per pound", [
    "Rules by weight|🍖|Some recipes say to cook a set number of minutes for each pound.",
    "Multiply|✖️|If a roast cooks 20 minutes per pound and weighs 3 pounds, it cooks 20 × 3 = 60 minutes.",
    "Always check|🌡️|Always use a food thermometer to be sure meat is cooked to a safe temperature."
  ], () => {
    const m = pick([10, 15, 20, 25]), p = ri(2, 6), f = pick(["roast", "turkey", "ham", "chicken"]);
    return { text: `A recipe says to cook a ${f} for ${m} minutes per pound. The ${f} weighs ${p} pounds. How many minutes should it cook?`, visual: "🍖", answer: m * p,
      hints: ["Each pound needs the same number of minutes.", "Multiply the minutes per pound by the pounds.", "Example: 15 minutes per pound and 4 pounds. 15 × 4 = 60 minutes. Now do yours."] };
  }));
  c.push(G("Cost per serving", [
    "Share the cost|🍽️|To find the cost of one serving, divide the total cost by the number of servings.",
    "Example|✏️|A pot of chili costs $12 and serves 6. 12 ÷ 6 = $2 per serving.",
    "Compare|⚖️|Cost per serving helps compare meals, like homemade versus take-out."
  ], () => {
    const s = pick([2, 3, 4, 5, 6, 8]), k = ri(2, 6), f = pick(["lasagna", "soup", "stir-fry", "pizza", "casserole"]);
    return { text: `A ${f} costs $${s * k} to make and serves ${s} people. How many dollars is each serving?`, visual: "🍽️", answer: k,
      hints: ["Share the total cost equally among the servings.", "Divide the total cost by the number of servings.", "Example: Pasta costs $15 and serves 5. 15 ÷ 5 = $3 each. Now do yours."] };
  }));
  c.push(L("Kitchen layout", [
    "Work triangle|🔺|Good kitchens have three main spots close together: the <b>sink</b>, the <b>stove</b> and the <b>fridge</b>. Together they form a work triangle.",
    "Safe space|🧰|Keep knives in a block or drawer. Keep cleaning supplies away from food. Keep floors clear so no one trips.",
    "Mise en place|🧑‍🍳|This French term means to set out and prepare all ingredients and tools before you start."
  ], [
    "Which three spots make the work triangle?|sink and stove and fridge|🔺||sofa and bed and TV,door and lamp and rug",
    "Where should knives be stored?|in a block or drawer|🔪||loose on the floor,in the sink",
    "Where should cleaning supplies go?|away from food|🧴||next to the cereal,in the fridge",
    "What does mise en place mean?|get everything ready before cooking|🧑‍🍳||cook very fast,clean the whole house",
    "Why keep the floor clear?|so no one trips|👟||to make a maze,to hide the tiles",
    "Why keep sink and stove and fridge close?|less walking while you cook|🚶||to make the room small,to hide the food",
    "Where do you put a hot pan?|on a heat-safe pad or trivet|🔥||on the plastic counter,on a book",
    "What should you do with pot handles?|turn them inward|🍳||point them out,hold them up"
  ], "A smart kitchen saves steps."));
  c.push(L("Natural and made fibers", [
    "Natural fibers|🐑|<b>Natural fibers</b> come from plants or animals. <b>Cotton</b> grows on a cotton plant. <b>Linen</b> comes from flax. <b>Wool</b> comes from sheep. <b>Silk</b> comes from silkworms.",
    "Made fibers|🧪|<b>Synthetic fibers</b> are made by people in factories. <b>Polyester</b> and <b>nylon</b> are synthetic.",
    "Pros and cons|⚖️|Cotton breathes well. Wool is warm. Polyester dries fast and wrinkles less. Nylon is strong."
  ], [
    "Which fiber grows on a plant?|cotton|☁️||polyester,nylon",
    "Which fiber comes from sheep?|wool|🐑||linen,nylon",
    "Which fiber comes from silkworms?|silk|🐛||cotton,polyester",
    "Which fiber comes from the flax plant?|linen|🌾||wool,nylon",
    "Which is a synthetic fiber?|polyester|🧪||wool,silk",
    "Which synthetic fiber is strong and dries fast?|nylon|🏃||cotton,linen",
    "What does natural fiber mean?|comes from plants or animals|🌿||made in a factory only,made of rock",
    "Which fabric breathes well on hot days?|cotton|🌬️||plastic,rubber"
  ], "Plants and animals versus factories."));
  c.push(G("Packs of buttons", [
    "Packs|🔘|Buttons come in packs. If you need more buttons than one pack has, you must buy more than one pack.",
    "Divide and round up|➗|10 buttons needed and 4 in a pack: 10 ÷ 4 = 2 with 2 left over. You need 3 packs to have enough.",
    "Why up?|⬆️|Two packs would give only 8 buttons. Round up so you have enough."
  ], () => {
    const per = pick([3, 4, 5, 6]), packs = ri(2, 4), need = (packs - 1) * per + ri(1, per - 1), f = pick(["coat", "shirt", "sweater", "vest"]);
    return { text: `A ${f} needs ${need} buttons. Each pack has ${per} buttons. How many packs must you buy?`, visual: "🔘", answer: packs,
      hints: ["You need enough buttons, even if some are left over.", "Divide, and if there is a remainder, go up to the next whole pack.", "Example: 9 buttons needed, 4 per pack. 9 ÷ 4 is 2 with 1 left over, so buy 3 packs. Now do yours."] };
  }));
  c.push(G("Saving goals", [
    "Goal and plan|🎯|To reach a goal, subtract what you have from what you need. Then see how many weeks it takes.",
    "Two steps|🪜|Goal 60 dollars and you have 20. You need 60 - 20 = 40 more.",
    "Weeks|📅|If you save 10 dollars a week, 40 ÷ 10 = 4 weeks."
  ], () => {
    const s = pick([2, 5, 10]), w = ri(3, 8), have = pick([10, 15, 20]), goal = have + s * w;
    return { text: `You want a $${goal} cooking set. You have $${have}. You save $${s} each week. How many weeks until you can buy it?`, visual: "🎯", answer: w,
      hints: ["First find how much more money you need.", "Take what you have away from the goal, then divide by the weekly savings.", "Example: A goal of $50, you have $10, save $5 a week. 50 - 10 = 40. 40 ÷ 5 = 8 weeks. Now do yours."] };
  }));
  c.push(L("Foods around the world", [
    "Food from many places|🌍|People all over the world cook different foods. Many come from their country's farms, weather and history.",
    "Examples|🍜|Tacos are from Mexico. Pasta and pizza are from Italy. Sushi is from Japan. Croissants are from France. Dumplings are from China.",
    "Try new things|😋|Trying new foods is a fun way to learn about other cultures. Always be polite about foods."
  ], [
    "Which country do tacos come from?|Mexico|🌮||Japan,France",
    "Which country is pasta from?|Italy|🍝||Mexico,China",
    "Which country is sushi from?|Japan|🍣||Italy,Spain",
    "Which country do croissants come from?|France|🥐||Japan,Mexico",
    "Which country is paella from?|Spain|🥘||Poland,Thailand",
    "Which country is pad thai from?|Thailand|🍜||Italy,Mexico",
    "Which country is injera flatbread from?|Ethiopia|🫓||France,Japan",
    "How should you act when you try a new food?|be polite|🙂||make a rude face,throw it"
  ], "Where in the world is the food from?"));
  c.push(L("Reduce, reuse, recycle", [
    "Three Rs|♻️|<b>Reduce</b> means use less. <b>Reuse</b> means use again. <b>Recycle</b> means turn old things into new ones.",
    "In the kitchen|🥬|Plan meals so food is not wasted. Use cloth bags and bottles again. Put fruit and veggie scraps in a <b>compost</b> bin so they turn into soil food.",
    "Why?|🌍|Less trash means a cleaner planet and less energy used."
  ], [
    "What does reduce mean?|use less|➖||use more,throw away",
    "What does reuse mean?|use again|🔁||buy new,break it",
    "What does recycle mean?|make old things into new ones|♻️||bury it,hide it",
    "What is compost for?|turning scraps into soil food|🌱||making candy,storing milk",
    "Which can go in a compost bin?|apple core|🍎||plastic bottle,a battery",
    "Which is reusing?|taking a cloth bag to the store|👜||buying a new paper bag every time,throwing the bag away",
    "How can you reduce food waste?|plan meals and use leftovers|🥗||buy twice as much,throw out leftovers",
    "Which is recycling?|putting a clean can in the recycle bin|🥫||putting it in the sink,burying it in the yard"
  ], "Use less, use again, make new."));
  c.push(MIX("Mixed practice", [c[0], c[3], c[6], c[9], c[12], c[15]]));
  c.push(MIX("Level 9 Challenge", [c[1], c[2], c[4], c[5], c[7], c[8], c[10], c[11], c[13], c[14], c[16], c[17]]));

  Object.assign(HOMEEC_LEVELS, { 7: a, 8: b, 9: c });
})();
