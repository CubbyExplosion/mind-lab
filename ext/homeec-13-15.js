// ext/homeec-13-15.js  Home Economics & Cooking levels 13-15
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
    const make = () => {
      let q;
      for (let i = 0; i < 40; i++) {
        q = gen();
        const h = (q.hints[0] + " " + q.hints[1]).replace(/<[^>]+>/g, "");
        if (!new RegExp("(^|[^0-9.])" + String(q.answer).replace(".", "\\.") + "([^0-9]|$)").test(h)) break;
      }
      return q;
    };
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const Q = (text, answer, visual, h1, h2, ex) => ({ text, visual, answer, hints: [h1, h2, "Example: " + ex + " Now do yours."] });
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 13 =================
  const a = [];
  a.push(G("Ratios in recipes", [
    "What is a ratio?|⚖️|A <b>ratio</b> compares two amounts. 'Rice to water is 1 to 2' means 2 cups of water for every 1 cup of rice.",
    "Use equal batches|🔁|If you make <b>3 batches</b>, multiply BOTH parts by 3. A ratio of 2 to 1 becomes 6 to 3.",
    "Example|✏️|A sauce uses 3 cups of broth for every 2 cups of lentils. With 6 cups of lentils that is 3 batches, so you need 3 x 3 = <b>9 cups</b> of broth."
  ], () => {
    const R = [[2, 1], [3, 1], [3, 2], [4, 3], [5, 2]], P = [["water", "rice"], ["broth", "lentils"], ["milk", "flour"], ["juice", "oats"]];
    const [A, B] = pick(R), [x, y] = pick(P), k = ri(2, 6);
    if (Math.random() < 0.5) return Q(`A recipe uses ${A} cups of ${x} for every ${B} cups of ${y}. You use ${B * k} cups of ${y}. How many cups of ${x} do you need?`, A * k, "⚖️",
      "First find how many batches you are making.", `Divide the cups of ${y} by ${B} to get the number of batches. Then multiply the ${x} part by the batches.`,
      "2 cups of milk for every 1 cup of oats, and 4 cups of oats: that is 4 batches, so 2 x 4 = 8 cups of milk.");
    return Q(`A recipe uses ${A} cups of ${x} for every ${B} cups of ${y}. You use ${A * k} cups of ${x}. How many cups of ${y} do you need?`, B * k, "⚖️",
      "First find how many batches you are making.", `Divide the cups of ${x} by ${A} to get the number of batches. Then multiply the ${y} part by the batches.`,
      "3 cups of broth for every 1 cup of lentils, and 9 cups of broth: that is 3 batches, so 1 x 3 = 3 cups of lentils.");
  }));
  a.push(G("Percent of calories", [
    "Percent means out of 100|%|<b>Percent</b> means 'out of 100'. 50% is half, 25% is one fourth, 10% is one tenth.",
    "Find a percent of a number|🧮|To find 10%, divide by 10. To find 25%, divide by 4. For 50%, divide by 2. For 20%, find 10% and double it.",
    "Example|✏️|A snack has 200 calories and 25% of them come from sugar. 200 ÷ 4 = <b>50 calories</b> from sugar."
  ], () => {
    const p = pick([10, 20, 25, 50, 75]), C = ri(2, 20) * 40, a2 = C * p / 100;
    const how = { 10: "Divide the total by 10.", 20: "Find 10% first, then double it.", 25: "25% is one fourth, so divide by 4.", 50: "50% is half, so divide by 2.", 75: "Find 25% first by dividing by 4, then multiply by 3." };
    return Q(`A meal has ${C} calories. ${p}% of the calories come from carbohydrates. How many calories is that?`, a2, "🍝",
      "Think of the percent as part of 100.", how[p], "A bar has 80 calories and 50% come from fat. Half of 80 is 40 calories.");
  }));
  a.push(L("Thickening sauces and soups", [
    "Roux|🥄|A <b>roux</b> is flour cooked with fat (like butter) until bubbly. Whisk liquid into it to make a smooth, thick sauce.",
    "Slurry|🌽|A <b>slurry</b> is cornstarch stirred into <b>cold</b> water. Pour it into a simmering sauce and stir. It will thicken in a minute or two.",
    "Reduce and puree|♨️|<b>Reducing</b> means simmering so water turns to steam and the sauce gets thicker. You can also puree beans or potatoes into a soup."
  ], [
    "What is a roux?|flour cooked with fat|🥄|It uses two ingredients.|a cold drink,a type of rice",
    "What do you stir cornstarch into before adding it to a hot sauce?|cold water|🌽|Hot water would make clumps right away.|hot oil,dry flour",
    "What is a mixture of cornstarch and cold water called?|slurry|🥣||roux,reduction",
    "Why does simmering a sauce without a lid make it thicker?|water turns to steam|♨️||more water goes in,the pot gets colder",
    "A roux is made from flour and which other ingredient?|fat|🧈||ice,vinegar",
    "What do we call simmering a sauce down so it gets thicker?|reducing|♨️||sifting,proofing",
    "Which can thicken a soup naturally when pureed?|beans or potatoes|🥔||ice cubes,black pepper",
    "Why mix cornstarch with cold water first?|so it does not form lumps|🥣||to make it sweeter,to make it hotter"
  ], "Think about how each thickener works."));
  a.push(L("Stocks and soups", [
    "Stock|🍲|<b>Stock</b> is made by simmering bones or vegetables, with water, for a long time. It makes a tasty base for soups and sauces.",
    "Mirepoix|🧅|A classic flavor base is <b>mirepoix</b>: onion, carrot and celery. Cook it gently to start many soups. Simmer gently and skim off foam.",
    "Season at the end|🧂|Soup gets saltier as the water cooks away, so add salt a little at a time and taste. Puree a soup to make it smooth and creamy."
  ], [
    "What three vegetables make a classic mirepoix?|onion, carrot and celery|🧅|They are an orange, white and pale-green trio.|tomato and corn and peas,potato and lettuce and kale",
    "A stock is made by simmering what in water?|bones or vegetables|🍲||sugar and flour,ice and salt",
    "How should a stock cook?|at a gentle simmer|♨️|Think slow and calm.|at a hard boil,frozen solid",
    "What do you skim off the top of a simmering stock?|foam|🫧||the water,the pot",
    "How can you make a vegetable soup smooth and creamy?|puree the cooked soup|🥣||leave all the chunks,boil it for a day",
    "Why add salt to soup a little at a time?|it gets saltier as it cooks down|🧂||salt never changes,salt melts away",
    "Which type of soup is clear and thin?|broth|🍜||chowder,stew",
    "How can a stock be rich without bones?|simmer vegetables and herbs|🥕||use plain cold water,add only sugar"
  ], "Soups start with a flavorful base."));
  a.push(L("Browning and flavor", [
    "Maillard reaction|🥩|When proteins and sugars in food meet high heat, they turn brown and taste rich. This is the <b>Maillard reaction</b>. It makes toast, seared meat and cookies tasty.",
    "Caramelization|🍬|Plain sugar turns golden brown and sweet when heated. This is <b>caramelization</b>. Slow-cooked onions caramelize too.",
    "Help it brown|🍳|Pat food dry, use fairly high heat, and do not crowd the pan. A crowded pan makes steam, and food steams instead of browning."
  ], [
    "What is the browning reaction between proteins and sugars called?|Maillard reaction|🥩|It is named for a French scientist.|caramelization,freezing",
    "What is the browning of plain sugar called?|caramelization|🍬||Maillard reaction,fermentation",
    "Why pat meat dry before searing it?|a dry surface browns better|🥩||water adds flavor,paper adds flavor",
    "What happens if you crowd a pan with too many pieces?|they steam instead of brown|🍳||they brown twice as fast,they float away",
    "Which food gets golden brown from the Maillard reaction?|toast|🍞||ice cubes,raw lettuce",
    "How do caramelized onions taste?|sweeter|🧅||more sour,more salty",
    "What kind of heat gives good browning?|fairly high heat|🔥||no heat at all,freezing cold",
    "What gives bread a crispy brown crust?|baking in a hot oven|🍞||storing it in the fridge,slicing it thin"
  ], "Browning needs heat, sugar and protein."));
  a.push(L("Baking soda and baking powder", [
    "Leaveners|🫧|<b>Leaveners</b> make baked goods rise by making gas bubbles. The gas is <b>carbon dioxide</b>. Yeast is a living leavener.",
    "Baking soda|🍋|<b>Baking soda</b> needs an acid in the batter to make bubbles, such as buttermilk, yogurt, lemon juice, vinegar or brown sugar.",
    "Baking powder|🧁|<b>Baking powder</b> already has a dry acid mixed in. It starts to work when it gets wet, and works again with heat."
  ], [
    "Baking soda needs which kind of ingredient to make bubbles?|an acid|🍋|Think lemon juice or vinegar.|a fat,a sweetener",
    "Which gas makes baked goods rise?|carbon dioxide|🫧||helium,steam only",
    "Which one already has an acid mixed in?|baking powder|🧁||baking soda,plain flour",
    "Which ingredient can react with baking soda?|buttermilk|🥛||plain water,vegetable oil",
    "What do we call ingredients that make dough rise?|leaveners|🍞||thickeners,sweeteners",
    "What is yeast?|a living fungus|🍞||a mineral,a metal",
    "What happens if you forget the leavener in a cake?|it turns out flat and dense|🎂||it rises extra tall,it turns blue",
    "What starts baking powder working?|moisture and heat|💧||cold and darkness,a long nap"
  ], "Bubbles lift the batter."));
  a.push(G("Pan sizes and area", [
    "Area of a pan|🍰|A rectangular baking pan has an <b>area</b> = length x width. A 9 by 13 inch pan has 9 x 13 = <b>117 square inches</b>.",
    "Bigger pan, thinner cake|📏|The same batter in a bigger pan spreads thinner and bakes faster. In a smaller pan it is thicker and takes longer.",
    "Missing side|🔍|If you know the area and one side, <b>divide</b> to find the other side. 48 square inches ÷ 6 inches = 8 inches."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const l = ri(6, 13), w = ri(6, 12); return Q(`A rectangular baking pan is ${l} inches long and ${w} inches wide. What is its area in square inches?`, l * w, "🍰",
      "Area of a rectangle comes from its two sides.", "Multiply the length by the width.", "A pan 5 inches by 4 inches has area 5 x 4 = 20 square inches."); }
    if (t === 1) { const l = ri(6, 12), w = ri(5, 9); return Q(`A pan has an area of ${l * w} square inches. One side is ${l} inches. How long is the other side in inches?`, w, "🍰",
      "Area is length times width, so work backward.", "Divide the area by the side you know.", "Area 60 square inches and one side 10 inches: 60 ÷ 10 = 6 inches."); }
    let l1, w1, l2, w2; do { l1 = ri(9, 13); w1 = ri(8, 9); l2 = ri(6, 8); w2 = ri(5, 7); } while (l1 * w1 <= l2 * w2);
    return Q(`Pan A is ${l1} by ${w1} inches. Pan B is ${l2} by ${w2} inches. How many more square inches does Pan A have?`, l1 * w1 - l2 * w2, "🍰",
      "Find the area of each pan first.", "Multiply length by width for each pan, then subtract the smaller area from the larger one.", "Pan A is 10 by 9 (90), Pan B is 6 by 5 (30). The difference is 90 - 30 = 60.");
  }));
  a.push(G("Cooking for a crowd", [
    "Servings per pound|🍖|Cooks plan how much food each guest eats. For some meats a plan is <b>½ pound</b> or <b>¼ pound</b> per person.",
    "Work it out|🧮|With ½ pound each, 2 people need 1 pound. With ¼ pound each, 4 people need 1 pound. Count the groups!",
    "Example|✏️|Meat at ¼ pound per person for 12 guests: 12 ÷ 4 = <b>3 pounds</b>."
  ], () => {
    const F = [["½ pound", 2], ["¼ pound", 4], ["⅓ pound", 3]], [s, d] = pick(F), m = ri(2, 7);
    if (Math.random() < 0.55) return Q(`You plan ${s} of meat per person. There will be ${d * m} guests. How many pounds of meat do you need?`, m, "🍖",
      "Find how many guests share each pound.", `${d} guests share one pound at this serving size. How many groups of ${d} are there?`, "At ¼ pound each, 8 guests: 8 ÷ 4 = 2 pounds.");
    return Q(`You buy ${m} pounds of meat and plan ${s} per person. How many people can you serve?`, m * d, "🍖",
      "How many people does one pound feed?", `Each pound feeds ${d} people. Multiply by the number of pounds.`, "At ½ pound each, 3 pounds feeds 3 x 2 = 6 people.");
  }));
  a.push(L("Reading health claims", [
    "Front of the box|📦|Words on the front, like 'natural' or 'low fat', are marketing. Check the <b>Nutrition Facts</b> and the <b>ingredient list</b> for the facts.",
    "Daily Value shortcuts|📋|A food with <b>5% Daily Value or less</b> of a nutrient is low in it. <b>20% or more</b> is high.",
    "Special words|🏷️|<b>Organic</b> has a government rule about how food was grown. 'Natural' on most foods has no strict rule and does not mean healthy."
  ], [
    "Which label word has a government rule about how food was grown?|organic|🌱||tasty,yummy",
    "Does the word 'natural' always mean a food is healthy?|no|🏷️|A word on the front is not proof.|yes always,only for candy",
    "Where do you find the real facts about a food?|the Nutrition Facts and ingredient list|📋||the cartoon on the front,the brand name",
    "A nutrient with 20% Daily Value or more is...|high|📏||low,empty",
    "A nutrient with 5% Daily Value or less is...|low|📏||high,huge",
    "Can a cookie labeled 'low fat' still be high in sugar?|yes|🍪||never,impossible",
    "A cereal box shows big strawberries. How do you check for real fruit?|read the ingredient list|🍓||trust the picture,smell the box",
    "What do the numbers on a label depend on?|the serving size|🍽️||the box color,the brand"
  ], "Read past the front of the box."));
  a.push(L("Woven and knit fabric", [
    "Woven|🧵|<b>Woven</b> fabric has threads crossing at right angles: the <b>warp</b> runs lengthwise and the <b>weft</b> runs across. Woven fabric is firm and can fray at cut edges. Denim is woven.",
    "Knit|🧶|<b>Knit</b> fabric is made of looping yarn. It stretches and is soft, like T-shirts and sweaters.",
    "Choosing|✂️|Pick a fabric for the job: stretchy knit for sports shirts, firm woven for jeans and bags."
  ], [
    "Which fabric is made of loops of yarn?|knit|🧶||woven,paper",
    "Which fabric stretches more?|knit|👕||woven,wood",
    "Threads running lengthwise in a woven fabric are the...|warp|🧵|It rhymes with 'sharp' a little.|weft,hem",
    "Threads running across a woven fabric are the...|weft|🧵||warp,seam",
    "A T-shirt is usually made from what kind of fabric?|knit|👕||woven,leather",
    "Which kind of fabric usually frays at cut edges?|woven|✂️||knit,neither",
    "Denim jeans are made from what kind of fabric?|woven|👖||knit,paper",
    "Which fabric suits a stretchy sports shirt?|knit|🏃||stiff woven canvas,sheet metal"
  ], "Think of loops or crossing threads."));
  a.push(L("Buttons, snaps and zippers", [
    "Fasteners|🔘|<b>Fasteners</b> close clothes: buttons, snaps, zippers, hook-and-eye, and hook-and-loop tape.",
    "Sewing a button|🧵|Sew through the holes several times. Leave a little room under the button (a <b>shank</b>) so the fabric lies flat when buttoned. Finish with a knot.",
    "Match the job|✅|Zippers close long openings. Snaps and buttons suit shirts. Hook-and-loop tape is easy to open and close."
  ], [
    "Which fastener has two toothed sides that lock together?|zipper|🧥||button,snap",
    "A button goes through what?|a buttonhole|🔘||a zipper,a hem",
    "Which closing is a hook and a small loop?|hook and eye|🪝||button,snap",
    "Which fastener presses together with a click?|snap|🔘||zipper,seam",
    "Why leave room under a sewn-on button?|so the fabric lies flat|🔘||to save thread,to look shiny",
    "Which fastener uses fuzzy loops and tiny hooks?|hook-and-loop tape|🧷||buttonhole,safety pin",
    "How do you finish sewing on a button?|tie a knot to secure it|🧵||leave the thread loose,glue it to a cat",
    "Which waistband needs no button or zipper?|elastic|👖||a belt loop,a buttonhole"
  ], "Each fastener closes in its own way."));
  a.push(G("Simple interest", [
    "Money that grows|🏦|When you save money in a bank, the bank pays you <b>interest</b>. When you borrow, you pay interest.",
    "Simple interest|🧮|<b>Interest = amount x rate x years</b>. 4% means 4 out of every 100 dollars each year.",
    "Example|✏️|$200 saved at 5% for 2 years. 5% of $200 is $10 a year. Over 2 years: <b>$20</b> of interest."
  ], () => {
    const P = ri(1, 10) * 100, r = ri(2, 6), t = ri(1, 5), per = P / 100 * r;
    if (Math.random() < 0.6) return Q(`You save $${P} at ${r}% simple interest a year. How many dollars of interest do you earn in ${t} ${t === 1 ? "year" : "years"}?`, per * t, "🏦",
      "Find the interest for ONE year first.", `Each $100 earns $${r} a year. How many hundreds are in $${P}? Then multiply by the number of years.`, "$300 at 2% for 2 years: 3 hundreds x $2 = $6 a year, so $12.");
    return Q(`You save $${P} at ${r}% simple interest a year. How many dollars of interest do you earn in ONE year?`, per, "🏦",
      "Percent means out of 100.", `Each $100 earns $${r} a year. Count the hundreds in $${P}.`, "$400 at 3%: 4 hundreds x $3 = $12 in one year.");
  }));
  a.push(G("The 50/30/20 budget", [
    "A simple plan|📊|One simple rule splits money: <b>50% needs</b>, <b>30% wants</b>, <b>20% savings</b>.",
    "Find each part|🧮|50% is half. 10% is one tenth. 30% is 3 tenths. 20% is 2 tenths.",
    "Example|✏️|If you get $60, then 10% is $6. Needs: $30. Wants: 3 x 6 = $18. Savings: 2 x 6 = <b>$12</b>."
  ], () => {
    const I = ri(3, 20) * 10, t = ri(0, 2), tenth = I / 10;
    const nm = ["needs (50%)", "wants (30%)", "savings (20%)"][t], ans = [5, 3, 2][t] * tenth;
    return Q(`You get $${I}. Using the 50/30/20 plan, how many dollars go to ${nm}?`, ans, "📊",
      "First find 10% of the money.", `Divide $${I} by 10. Then multiply by ${[5, 3, 2][t]}, because ${nm.split(" ")[1].replace(/[()]/g, "")} is ${[5, 3, 2][t]} tenths.`, "With $50: 10% is $5, so 20% is $10.");
  }));
  a.push(L("Basic home tools", [
    "Common tools|🔧|A <b>hammer</b> drives nails. A <b>screwdriver</b> turns screws: flathead (one slot) or Phillips (a cross). <b>Pliers</b> grip. A <b>tape measure</b> measures. A <b>level</b> shows if something is straight.",
    "Safe use|🥽|Wear safety glasses, keep tools clean and dry, and put them away. Ask an adult before using power tools.",
    "Choose the tool|✅|Match the tool to the job. The wrong tool can slip and hurt you or damage the thing you fix."
  ], [
    "Which tool drives a nail into wood?|hammer|🔨||level,tape measure",
    "Which tool shows if a shelf is straight?|level|📏||pliers,hammer",
    "Which screwdriver has a cross shape at the tip?|Phillips|🪛||flathead,hammer",
    "Which tool measures the length of a board?|tape measure|📏||pliers,screw",
    "Which tool grips and bends wire?|pliers|🔧||level,sponge",
    "What do safety glasses protect?|your eyes|🥽||your toes,your ears",
    "Who should you ask before using a power tool?|an adult|🧑||a pet,a friend your age",
    "Where should tools go after the job?|put away in their place|🧰||left on the floor,left in the bath"
  ], "Match the tool to its job."));
  a.push(L("Electrical safety", [
    "Water and electricity|💧|Water and electricity do NOT mix. Keep cords and devices away from sinks and tubs. Dry your hands before touching a plug.",
    "Outlets and cords|🔌|Do not plug too many things into one outlet. Pull the <b>plug</b>, not the cord. Never use a cord that is frayed or cracked.",
    "Smart outlets|⚡|<b>GFCI outlets</b> near water cut off power fast if something goes wrong. Never poke anything into an outlet. Ask an adult to fix electrical problems."
  ], [
    "What should you do before touching a plug?|dry your hands|🖐️||wet your hands,wave at it",
    "How do you unplug something safely?|pull the plug, not the cord|🔌||yank the cord,pull with wet hands",
    "What should you do with a frayed cord?|stop using it and tell an adult|⚠️||wrap it in tape and keep going,chew on it",
    "Why not plug too many things into one outlet?|it can overheat|🔌||it makes the wall sad,it uses less power",
    "What is a GFCI outlet for?|to cut off power fast near water|⚡||to charge phones faster,to make light bulbs brighter",
    "Where do GFCI outlets belong?|near sinks and tubs|🚰||in a closet,in a garden shed roof",
    "Who fixes electrical problems?|an adult or electrician|🧑‍🔧||a young child,a pet",
    "What should you never put in an outlet?|any object|🚫||a plug,nothing"
  ], "Keep water away from electricity."));
  a.push(L("Babysitting basics", [
    "Be prepared|📞|Before the parents leave, learn their phone numbers, the address, any <b>allergies</b>, bedtime and food rules, and where the first aid kit is.",
    "Stay safe|👀|Always watch the child. Never leave the child alone. Do not open the door to strangers. Call <b>911</b> in an emergency, then call the parents.",
    "Be kind and fun|🎲|Play safe games, read stories and stick to the rules the parents gave you. Write down any problems to tell them."
  ], [
    "What should you learn before the parents leave?|their phone numbers|📞||their favorite show,the weather",
    "What should you do if a stranger knocks?|do not open the door|🚪||open it right away,ask them to dinner",
    "Whom do you call first in an emergency?|911|🚨||the neighbor's dog,a friend",
    "Why ask about allergies?|to keep the child safe from foods or things that harm them|🥜||to pick a snack color,to be fancy",
    "Should you ever leave a child alone?|never|👀||whenever you are bored,for a quick nap",
    "What should you follow about bedtime and food?|the parents' rules|📋||your own rules,no rules",
    "What is good to bring or know about?|where the first aid kit is|🩹||the best video game,the oven's brand",
    "What do you tell the parents when they return?|how the evening went|📝||nothing at all,that you went out"
  ], "Safety first, then fun."));
  a.push(G("Dividing by fractions", [
    "How many fit?|🥣|Dividing by a fraction asks 'how many fit?'. How many ½-cup scoops fit in 3 cups?",
    "Rule of thumb|🔁|Each cup holds 2 halves, 3 thirds or 4 fourths. So multiply the cups by the bottom number of the fraction.",
    "Example|✏️|2 cups of soup in ¼-cup servings: 2 x 4 = <b>8 servings</b>."
  ], () => {
    if (Math.random() < 0.75) { const [s, d] = pick([["½", 2], ["⅓", 3], ["¼", 4]]), c = ri(2, 6);
      return Q(`You have ${c} cups of soup. You serve it in ${s}-cup bowls. How many bowls can you fill?`, c * d, "🥣",
        "How many scoops fit into one whole cup?", `${d} bowls of ${s} cup make 1 cup. Multiply by the number of cups.`, "3 cups in ½-cup bowls: 3 x 2 = 6 bowls."); }
    const c = 3 * ri(1, 4);
    return Q(`You have ${c} cups of rice. Each serving is ¾ cup. How many servings can you make?`, c / 3 * 4, "🍚",
      "Four ¾-cup servings use up exactly 3 cups.", `Count how many groups of 3 cups are in ${c} cups. Each group makes 4 servings.`, "6 cups in groups of 3: 2 groups, so 2 x 4 = 8 servings.");
  }));
  a.push(L("Oil, water and dressings", [
    "Emulsions|🥗|Oil and water do not mix on their own. An <b>emulsion</b> is a mixture where tiny drops of one are spread through the other. Shake or whisk to make one.",
    "Emulsifiers|🥚|An <b>emulsifier</b> helps keep an emulsion together. Egg yolk, mustard and honey are emulsifiers. Mayonnaise has oil and egg yolk.",
    "Vinaigrette|🫒|A basic vinaigrette is about <b>3 parts oil to 1 part vinegar</b>. It will separate unless you shake it again."
  ], [
    "What is an emulsion?|a mix of tiny drops of oil and water|🥗||a type of metal,a kind of rice",
    "Which of these is an emulsifier?|egg yolk|🥚||plain water,sugar cubes",
    "What is mayonnaise mostly made of?|oil and egg yolk|🥚||milk and sugar,flour and water",
    "How much oil is in a basic vinaigrette?|about 3 parts oil to 1 part vinegar|🫒||1 part oil to 3 parts vinegar,all vinegar",
    "Why shake a vinaigrette before using it?|it separates over time|🥗||it gets colder,to make it sing",
    "Oil and vinegar left alone will...|separate|🫙||turn into soup,vanish",
    "How can you make an emulsion?|whisk or shake hard|🥣||freeze it,leave it still",
    "Which helps keep oil and water together?|mustard|🥗||ice,water"
  ], "Oil and water need help to mix."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[4], a[5], a[7], a[9], a[11], a[12], a[14]]));
  a.push(MIX("Level 13 Challenge", [a[3], a[6], a[8], a[10], a[13], a[15], a[16], a[17], a[0], a[1], a[11]]));

  // ================= LEVEL 14 =================
  const b = [];
  b.push(L("Cooking fats and smoke points", [
    "Smoke point|💨|Every fat has a <b>smoke point</b>: the heat at which it starts to smoke and break down. Smoking fat tastes bitter. Butter smokes at a lower heat than refined oils like canola.",
    "Solid and liquid|🧈|Butter is <b>solid</b> at room temperature. Vegetable oils like olive and canola are <b>liquid</b>. Fats from plants, fish and nuts are mostly unsaturated, a healthier choice.",
    "Safety|🔥|If oil starts to smoke, turn off the heat and tell an adult. For a small pan fire, slide a lid on and never use water."
  ], [
    "What is a smoke point?|the heat where a fat starts to smoke|💨|It is about temperature.|the weight of a pan,the color of a pot",
    "Which fat has a lower smoke point?|butter|🧈||refined canola oil,refined avocado oil",
    "What should you do if a pan of oil starts smoking heavily?|turn off the heat and ask an adult|🔥||pour water on it,walk away from it",
    "Which fat is solid at room temperature?|butter|🧈||olive oil,canola oil",
    "Which kind of fat is best to choose most often?|unsaturated|🫒||saturated,burnt",
    "What puts out a small grease fire in a pan?|cover it with a lid|🔥||pour water on it,fan it",
    "Where should oil be stored?|in a cool dark place|🛢️||next to the stove,in the sun",
    "What does rancid oil smell like?|bad or off|👃||fresh and sweet,like flowers"
  ], "Different fats handle heat differently."));
  b.push(L("Acids and bases in cooking", [
    "The pH scale|🧪|<b>pH</b> measures how acidic something is on a 0-14 scale. <b>7 is neutral</b> (pure water). Below 7 is an <b>acid</b>. Above 7 is a <b>base</b>.",
    "Acids in the kitchen|🍋|Lemon juice, vinegar, tomatoes and yogurt are acids. They add a sour taste, help keep apples from browning, and are used for pickling.",
    "Bases and balance|🧂|Baking soda is a base. A little acid can brighten a flat-tasting dish. Marinating too long in acid makes meat mushy."
  ], [
    "What number on the pH scale is neutral?|7|🧪||0,14",
    "Is lemon juice an acid or a base?|acid|🍋||base,neutral",
    "Is baking soda an acid or a base?|base|🧂||acid,neutral",
    "What can you add to apple slices to slow browning?|lemon juice|🍎||baking soda,oil",
    "Which liquid is used for pickling vegetables?|vinegar|🥒||plain milk,olive oil",
    "What happens if you marinate meat in acid for too long?|it gets mushy|🥩||it turns to stone,it grows",
    "Which is a taste of acids?|sour|😋||sweet,sparkly",
    "A pH below 7 means a food is...|acidic|🧪||basic,neutral"
  ], "Sour things are acids."));
  b.push(L("Tender and tough cuts", [
    "Where the meat comes from|🥩|Muscles that work hard, like the leg and shoulder, have more connective tissue and are <b>tougher</b>. Muscles that do less work are <b>more tender</b>.",
    "Match the method|🍲|Tough cuts need <b>slow, moist cooking</b> (braising or stewing) to turn tender. Tender cuts can be cooked quickly with dry heat, such as grilling or pan searing.",
    "Cutting and resting|🔪|Slice meat <b>against the grain</b> (across the fibers) for tenderness. Let cooked meat rest a few minutes so juices stay inside."
  ], [
    "Which muscles are usually tougher?|ones that work hard, like the shoulder|🥩||ones that rest all day,ones inside an egg",
    "Which cooking method turns a tough cut tender?|slow, moist cooking|🍲||very fast frying,eating it raw",
    "What does 'against the grain' mean?|cut across the muscle fibers|🔪||cut along the fibers,cut backwards while spinning",
    "Why let meat rest after cooking?|the juices settle inside|⏲️||it grows bigger,to make it colder",
    "A quick sear on a hot grill suits which cut?|a tender cut|🔥||a tough cut,a bone",
    "What is braising?|cooking slowly in a little liquid|🍲||freezing in ice,frying fast",
    "What makes a tough cut hard to chew?|connective tissue|🥩||sugar,salt",
    "Which cut is likely to need stewing?|a tough shoulder cut|🍖||a tender cut,a lettuce"
  ], "Hardworking muscles are tougher."));
  b.push(G("Grain and pasta yields", [
    "Grains grow when cooked|🍚|Dry grains soak up water and get bigger. 1 cup of dry rice makes about <b>3 cups</b> cooked. 1 cup of dry pasta makes about <b>2 cups</b> cooked.",
    "Dry to cooked|✖️|To find how much you will have, <b>multiply</b> the dry cups by the yield.",
    "Cooked to dry|➗|To find how much to cook, <b>divide</b> the cooked cups you need by the yield."
  ], () => {
    const Y = [["rice", 3], ["pasta", 2], ["oats for oatmeal", 2]], [g, f] = pick(Y);
    if (Math.random() < 0.5) { const d = ri(2, 5); return Q(`1 cup of dry ${g} makes ${f} cups cooked. How many cups cooked do you get from ${d} cups of dry ${g}?`, d * f, "🍚",
      "Each dry cup becomes more cups when cooked.", `Each dry cup makes ${f} cooked cups. Multiply the dry cups by ${f}.`, "1 cup dry makes 2 cups cooked. 4 dry cups give 4 x 2 = 8 cups."); }
    const c = ri(2, 5); return Q(`1 cup of dry ${g} makes ${f} cups cooked. You need ${c * f} cups cooked. How many cups of dry ${g} should you use?`, c, "🍚",
      "You know the cooked amount and want the dry amount.", `Divide the cooked cups by ${f}.`, "1 dry cup makes 3 cooked cups. For 12 cups cooked: 12 ÷ 3 = 4 dry cups.");
  }));
  b.push(G("Edible portion", [
    "Not all food is eaten|🥔|Peels, cores and bones get thrown away. The <b>edible portion</b> is the percent you can really use.",
    "Find the part|🧮|90% edible of 10 pounds = 9 pounds. Find 10% by dividing by 10, then multiply by 9 (or take 10% away).",
    "Why it matters|💡|When you plan a recipe, buy more than you need to allow for trimming. Save peels for stock if you can."
  ], () => {
    const p = pick([90, 80, 50, 70]), P = pick([10, 20, 30, 40, 50]), ans = P * p / 100;
    const tn = ans;
    return Q(`You buy ${P} pounds of a vegetable. About ${p}% is usable after trimming. How many pounds can you use?`, tn, "🥕",
      "Think of the percent as part of 100, not the whole thing.", p === 50 ? "50% is half." : p === 90 ? "Find 10% by dividing by 10, then subtract it from the total." : p === 80 ? "Find 10% by dividing by 10, then multiply by 8." : "Find 10% by dividing by 10, then multiply by 7.",
      "You buy 20 pounds and 50% is usable: half of 20 is 10 pounds.");
  }));
  b.push(G("Store brand savings", [
    "Brand names cost more|🏷️|A <b>store brand</b> often costs less than a name brand and can have the same quality. Compare the labels.",
    "Savings add up|🧮|If you save $2 a week, over 4 weeks you save 4 x $2 = $8. Multiply the savings by the number of weeks.",
    "Example|✏️|Name brand $5, store brand $3: you save $2 each time you buy."
  ], () => {
    const nb = ri(4, 9), sv = ri(1, 3), sb = nb - sv, w = pick([4, 5, 8, 10, 12]);
    return Q(`Name-brand cereal costs $${nb} a box. Store-brand cereal costs $${sb}. You buy one box each week for ${w} weeks. How many dollars do you save with the store brand?`, sv * w, "🥣",
      "First find how much you save on ONE box.", `Subtract the prices, then multiply by ${w}.`, "Name brand $6, store brand $4, for 3 weeks: save $2 each week, so $2 x 3 = $6.");
  }));
  b.push(L("Sodium and salt", [
    "Salt and sodium|🧂|Table salt is made of sodium and chloride. Your body needs a little <b>sodium</b>, but most people eat too much. Too much can raise blood pressure.",
    "Where it hides|🥫|Most sodium comes from packaged and restaurant food: canned soup, chips, deli meats, pizza, and instant noodles. Adults should aim for under about 2,300 mg a day.",
    "Eat less|🌿|Cook at home, use herbs and lemon for flavor, rinse canned beans, and pick 'low sodium' versions."
  ], [
    "What is table salt made of?|sodium and chloride|🧂||sugar and flour,iron and copper",
    "Too much sodium can raise what?|blood pressure|❤️||your height,your shoe size",
    "Where does most of our sodium come from?|packaged and restaurant foods|🥫||fresh fruit,plain water",
    "Which food is often high in sodium?|canned soup|🥫||fresh apples,plain rice",
    "What can add flavor without much sodium?|herbs and lemon|🌿||extra salt,bouillon powder",
    "What can you do to canned beans to lower sodium?|rinse them|🫘||salt them more,freeze them",
    "What does 'low sodium' on a label tell you?|there is less salt|🏷️||there is more salt,there is sugar only",
    "Where can you find the amount of sodium in a food?|the Nutrition Facts label|📋||the barcode,the lid shape"
  ], "Check the label for sodium."));
  b.push(L("Food for growing bodies", [
    "Strong bones|🥛|Tweens and teens build bone for life. <b>Calcium</b> (milk, yogurt, cheese, fortified drinks, leafy greens) and <b>vitamin D</b> help bones grow strong.",
    "Blood and muscle|🥩|<b>Iron</b> (beans, lean meat, spinach, fortified cereal) helps blood carry oxygen. <b>Protein</b> builds and fixes muscles.",
    "Energy|🍞|Whole grains, fruit and vegetables give steady energy. Breakfast helps you focus at school. Drink water through the day."
  ], [
    "Which mineral builds strong bones?|calcium|🦴||sodium,sugar",
    "Which vitamin helps the body use calcium?|vitamin D|☀️||vitamin Z,vitamin Q",
    "Which food is a good source of iron?|beans|🫘||soda,candy",
    "What does iron help blood carry?|oxygen|🩸||sand,sugar",
    "What nutrient builds and repairs muscle?|protein|💪||salt,fiber only",
    "Which meal helps you focus at school?|breakfast|🥣||skipping meals,a bag of candy",
    "Which is a good source of calcium?|yogurt|🥛||ice pops,plain rice cakes",
    "What should you drink through the day?|water|💧||only soda,only candy drinks"
  ], "Growing bodies need many nutrients."));
  b.push(L("Picnic and cooler safety", [
    "Keep cold food cold|🧊|Pack cold food in a cooler with lots of ice or ice packs. Keep it at <b>40°F or below</b>. Keep the cooler in the shade.",
    "Keep hot food hot|♨️|Hot food should stay at <b>140°F or higher</b>. Do not leave food out more than <b>2 hours</b>, or <b>1 hour</b> if it is above 90°F outside.",
    "Clean hands|🧼|Wash hands before you eat. If there is no sink, use clean wipes or hand sanitizer. Keep raw meat packed apart from other foods."
  ], [
    "How cold should food in a cooler stay?|40°F or below|🧊||60°F or below,80°F or below",
    "How long can food sit out on a normal day?|2 hours at most|⏲️||all afternoon,all day",
    "How long can food sit out when it is above 90°F outside?|1 hour at most|☀️||3 hours,5 hours",
    "Where should you put the cooler?|in the shade|🌳||in direct sun,on a hot car seat",
    "Hot food should stay at what temperature or higher?|140°F|♨️||90°F,70°F",
    "How can you keep raw meat from touching other foods?|pack it apart|🥩||mix it in,lay it on top",
    "What should you use if there is no sink?|clean wipes or hand sanitizer|🧴||nothing at all,a muddy towel",
    "What should a cooler be filled with?|lots of ice or ice packs|🧊||warm water,hot rocks"
  ], "Cold stays cold and hot stays hot."));
  b.push(L("Machine stitches", [
    "Straight stitch|🧵|The <b>straight stitch</b> is the basic stitch for seams. <b>Stitch length</b> can be short (strong) or long.",
    "Other stitches|〰️|<b>Zigzag</b> stitches stretch with knit fabric and finish raw edges. <b>Backstitch</b> (reverse) at the start and end locks the seam. <b>Basting</b> uses long temporary stitches. <b>Topstitching</b> shows on the outside.",
    "Be safe|✋|Keep fingers away from the needle. Take your foot off the pedal when you thread the machine, and turn it off when you finish."
  ], [
    "Which is the basic stitch for seams?|straight stitch|🧵||zigzag stitch,basting only",
    "Which stitch stretches with knit fabric?|zigzag|〰️||straight stitch,basting",
    "What does backstitching at the start and end do?|locks the seam|🔒||cuts the thread,adds color",
    "What are long temporary stitches called?|basting|🧵||topstitching,backstitch",
    "Which stitch shows on the outside as a design?|topstitching|✨||basting,backstitch",
    "Which stitch helps stop a raw edge from fraying?|zigzag|〰️||basting,a knot of paper",
    "What should you do with your foot when threading the machine?|take it off the pedal|🦶||hold the pedal down,stomp on it",
    "A shorter stitch length makes a seam...|stronger|💪||weaker,invisible"
  ], "Pick the stitch for the job."));
  b.push(G("Trim and borders", [
    "Going around|📐|<b>Perimeter</b> is the distance around a shape. For a rectangle, add all four sides: <b>2 x (length + width)</b>.",
    "Trim for edges|🎀|Lace or ribbon around a tablecloth edge needs the whole perimeter in feet.",
    "Missing side|🔍|If you know the perimeter and one side, <b>halve</b> the perimeter and subtract the known side."
  ], () => {
    if (Math.random() < 0.6) { const l = ri(3, 9), w = ri(2, 6); return Q(`A rectangular tablecloth is ${l} feet long and ${w} feet wide. You add ribbon all the way around the edge. How many feet of ribbon do you need?`, 2 * (l + w), "🎀",
      "Ribbon goes around all four sides.", "Add the length and the width, then double it.", "A cloth 4 feet by 3 feet: 4 + 3 = 7, doubled is 14 feet."); }
    const l = ri(4, 10), w = ri(2, 6); return Q(`A rectangular placemat has a perimeter of ${2 * (l + w)} inches. It is ${l} inches long. How many inches wide is it?`, w, "🍽️",
      "The perimeter counts the length twice and the width twice.", `Halve the perimeter, then subtract ${l}.`, "Perimeter 20 inches, length 6: half is 10, minus 6 is 4 inches wide.");
  }));
  b.push(L("Ironing and fabric heat", [
    "Check the label|🏷️|The care label tells the right iron heat. <b>Cotton and linen</b> take a hot iron. <b>Polyester and other synthetics</b> need low heat. <b>Silk</b> needs low heat, too.",
    "Press, don't scorch|♨️|Use steam for wrinkles. Keep the iron moving. A cloth between the iron and wool protects it.",
    "Iron safety|🔌|An iron is HOT. Only use one with an adult nearby. Turn it off and unplug it when you finish. Never leave it face down."
  ], [
    "Which fabric can take a hot iron?|cotton|👕||polyester,silk",
    "Which fabric needs low heat?|polyester|🧵||cotton,linen",
    "Where do you find the right iron setting?|the care label|🏷️||the iron's color,the shirt's price tag",
    "What should you do when you finish ironing?|turn it off and unplug it|🔌||leave it face down,leave it on to cool",
    "What helps remove wrinkles?|steam|♨️||ice cubes,glue",
    "What protects wool from a hot iron?|a cloth between them|🧣||nothing,a metal sheet",
    "Should you iron without an adult nearby?|no, an adult should be nearby|🧑||yes always,only at night",
    "Should you leave an iron face down?|never|⚠️||always,on the cat"
  ], "Look at the care label first."));
  b.push(L("Cash, debit and credit", [
    "Cash and debit|💵|<b>Cash</b> is paper money you hand over. A <b>debit card</b> takes money directly from your own bank account, so you can only spend what you have.",
    "Credit|💳|A <b>credit card</b> is borrowing. The bank pays the store, and you must pay the bank back. If you do not pay everything on time, you owe extra <b>interest</b>.",
    "Stay safe|🔒|Never share card numbers or your PIN. Keep receipts. A grown-up should help with banking. Only spend what fits your budget."
  ], [
    "What does a debit card take money from?|your own bank account|🏦||a loan from a store,thin air",
    "What is a credit card?|a way of borrowing money|💳||free money,a coupon",
    "What extra cost can you owe if you do not pay a credit card on time?|interest|📈||a gift,a medal",
    "Which payment method uses paper money?|cash|💵||debit,credit",
    "What should you never share?|your PIN|🔒||your favorite song,your hat size",
    "Why keep receipts?|to check what you spent and bought|🧾||to use as bookmarks,to make paper boats",
    "With a debit card, how much can you spend?|only what is in your account|🏦||as much as you want,nothing",
    "Who should help a kid with banking?|a grown-up|🧑||a stranger online,a pop-up ad"
  ], "Know where the money comes from."));
  b.push(G("Earning and keeping", [
    "Pay for work|💼|Many jobs pay by the hour. <b>Pay = hours x hourly rate</b>. Costs, like supplies, come out of your pay.",
    "What you keep|🧮|<b>Money kept = pay - costs</b>.",
    "Example|✏️|Mowing 3 hours at $8 an hour earns $24. Gas costs $4. You keep $24 - $4 = <b>$20</b>."
  ], () => {
    const r = ri(5, 12), h = ri(2, 6), s = ri(2, 9); const nm = pick(["Zoe", "Leo", "Ava", "Sam"]);
    return Q(`${nm} earns $${r} an hour helping with yard work. ${nm} works ${h} hours and spends $${s} on supplies. How many dollars does ${nm} keep?`, r * h - s, "💼",
      "Find the total pay first.", "Multiply the rate by the hours, then subtract the supplies.", "$7 an hour for 3 hours is $21. Supplies $5. Keep $21 - $5 = $16.");
  }));
  b.push(G("Cleaning solutions by ratio", [
    "Parts|🧴|A cleaning mix is made by <b>parts</b>. '1 part vinegar to 3 parts water' makes 4 parts in all.",
    "Find the total|➕|Add the parts. The total is the sum of every part.",
    "Safety|⚠️|Never mix different cleaners, especially bleach with anything else. Use simple mixes like vinegar and water with an adult."
  ], () => {
    if (Math.random() < 0.5) { const c = ri(2, 5), w = pick([2, 3, 4]); return Q(`A cleaning mix is 1 part vinegar to ${w} parts water. You use ${c} cups of vinegar. How many cups of mix do you make in all?`, c * (w + 1), "🧴",
      "Find how many cups are in ONE batch, then multiply.", `One batch is 1 + ${w} parts. Multiply that by ${c}.`, "1 part vinegar to 3 parts water with 2 cups of vinegar: 2 x 4 = 8 cups.");}
    const w = pick([1, 2, 3, 4]), t = (1 + w) * ri(2, 5); return Q(`A mix is 1 part cleaner to ${w} parts water. You want ${t} cups in all. How many cups of cleaner?`, t / (1 + w), "🧴",
      "Each batch has 1 part cleaner and some parts water.", `One batch has ${1 + w} parts. Divide the total by ${1 + w}.`, "1 part cleaner to 3 parts water, 12 cups total: 12 ÷ 4 = 3 cups of cleaner.");
  }));
  b.push(L("Organizing the pantry", [
    "First in, first out|📦|Put newer groceries behind older ones so you use the <b>oldest first</b>. This is called <b>FIFO</b> (first in, first out) and it cuts waste.",
    "Zones|🗄️|Keep similar things together: baking, snacks, canned goods, breakfast. Label shelves and containers with names and dates.",
    "Fridge order|❄️|Store raw meat on the <b>bottom shelf</b> so drips cannot land on other food. Keep heavy items low."
  ], [
    "What does FIFO stand for?|first in, first out|📦||fast in, fast out,find it, find out",
    "Where should newer groceries go?|behind the older ones|📦||in front of older ones,on the floor",
    "Why store raw meat on the bottom fridge shelf?|drips cannot land on other food|🥩||it looks nicer,it gets warmer",
    "Why label containers with dates?|to know which to use first|🏷️||to decorate,to hide them",
    "Why keep similar foods together in zones?|it is easy to find things|🗄️||it uses more space,it makes mess",
    "Which should be used first?|the oldest item|📅||the newest item,the biggest item",
    "Where do heavy items go?|on low shelves|📦||on the top shelf,in a high cabinet",
    "What does FIFO help cut?|food waste|♻️||electricity only,the grocery list"
  ], "Use older food first."));
  b.push(L("Growing herbs", [
    "What herbs need|🌿|Most herbs like <b>6 hours of sunlight</b>, pots with <b>drainage holes</b>, and water when the top of the soil feels dry.",
    "Popular herbs|🪴|Basil, mint, parsley, chives and rosemary grow well in pots. <b>Mint</b> spreads fast, so give it its own pot.",
    "Harvest|✂️|Pinch off the top leaves to make a plant bushy. Wash herbs before you eat them."
  ], [
    "About how much sunlight do most herbs like?|6 hours a day|☀️||1 hour a day,none",
    "Why do pots need drainage holes?|extra water can drain out|🪴||to let in ants,to make sound",
    "When should you water a herb pot?|when the top of the soil feels dry|💧||every minute,never",
    "Which herb spreads fast, so needs its own pot?|mint|🌿||basil,chives",
    "What does pinching off top leaves do?|makes the plant bushy|✂️||kills the plant,turns it blue",
    "What should you do to herbs before eating them?|wash them|🚰||nothing,freeze them",
    "Which herb is popular in tomato and pasta dishes?|basil|🍝||rosemary only,lettuce only",
    "Where is a good home for a herb pot?|a sunny windowsill|🪟||a dark closet,the freezer"
  ], "Sun, water and a little pinch."));
  b.push(G("Cooking tasks at the same time", [
    "Overlapping tasks|⏱️|When different foods cook <b>at the same time</b>, the meal is ready when the <b>longest</b> one is done.",
    "Add the prep|➕|If you spend prep time first, the total is <b>prep time + longest cooking time</b>.",
    "Example|✏️|Prep 10 minutes. Rice cooks 20 minutes and chicken 30 minutes together. Total: 10 + 30 = <b>40 minutes</b>."
  ], () => {
    let t1, t2, t3; do { t1 = pick([10, 15, 20]); t2 = pick([12, 18, 25]); t3 = pick([22, 28, 35]); } while (false);
    const arr = shuf([t1, t2, t3]), p = pick([5, 10, 15]);
    return Q(`You prep for ${p} minutes. Then three dishes cook at the same time, taking ${arr[0]}, ${arr[1]} and ${arr[2]} minutes. How many minutes until everything is ready?`, p + Math.max(...arr), "⏱️",
      "Cooking at the same time means they overlap.", "Find the longest cooking time, then add the prep time.", "Prep 5 minutes, dishes of 10, 20 and 15 minutes: 5 + 20 = 25 minutes.");
  }));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[4], b[5], b[7], b[9], b[10], b[12], b[16]]));
  b.push(MIX("Level 14 Challenge", [b[2], b[6], b[8], b[11], b[13], b[14], b[15], b[17], b[0], b[1], b[3], b[4]]));

  // ================= LEVEL 15 =================
  const c = [];
  c.push(G("Percent change in recipes", [
    "Increase or decrease|📈|A recipe can go <b>up</b> or <b>down</b> by a percent. 'Add 25% more' means add one fourth of the amount.",
    "Steps|🧮|Find the percent of the amount (10% is one tenth, 25% is one fourth, 50% is half). Then <b>add</b> it for an increase or <b>subtract</b> it for a decrease.",
    "Example|✏️|A recipe uses 40 grams of sugar. Cut it by 25%: 40 ÷ 4 = 10 grams. 40 - 10 = <b>30 grams</b>."
  ], () => {
    const t = ri(0, 2), p = pick([10, 25, 50]), A = ri(1, 8) * 20;
    const part = A * p / 100, how = { 10: "10% is one tenth of the amount.", 25: "25% is one fourth of the amount.", 50: "50% is half of the amount." }[p];
    if (t === 0) return Q(`A recipe uses ${A} grams of flour. You want to increase it by ${p}%. How many grams now?`, A + part, "📈", "An increase means the new amount is bigger.", how + " Add it to the original.", "30 grams increased by 50% is 30 + 15 = 45 grams.");
    if (t === 1) return Q(`A recipe uses ${A} grams of sugar. You want to decrease it by ${p}%. How many grams now?`, A - part, "📉", "A decrease means the new amount is smaller.", how + " Subtract it from the original.", "40 grams decreased by 25% is 40 - 10 = 30 grams.");
    const base = ri(1, 6) * 20; return Q(`A recipe went from ${base} grams to ${base + base * p / 100} grams of oats. By what percent did it increase?`, p, "📈", "Find how much it went up first.", "Compare the change to the starting amount: is it a tenth, a fourth or a half?", "From 20 to 30 is up 10, which is half of 20, so 50%.");
  }));
  c.push(G("Comparing unit prices", [
    "Cents per ounce|🏷️|Unit price = <b>price ÷ amount</b>. Change dollars to cents first when the unit price is small.",
    "Bigger is not always cheaper|⚖️|Compare the price per ounce, not the total price. The lower unit price is the better value if you will use it all.",
    "Example|✏️|A 12-ounce jar costs $3.00. 300 cents ÷ 12 = <b>25 cents per ounce</b>."
  ], () => {
    if (Math.random() < 0.5) { const o = pick([8, 12, 16, 20, 24, 32]), u = ri(5, 30), price = (o * u / 100).toFixed(2); return Q(`A ${o}-ounce jar of sauce costs $${price}. How many cents does one ounce cost?`, u, "🥫",
      "Change dollars to cents first.", `Multiply the dollars by 100 to get cents. Then divide by ${o}.`, "A 10-ounce jar costs $2.00. 200 cents ÷ 10 = 20 cents per ounce."); }
    let u1, u2; do { u1 = ri(5, 25); u2 = ri(5, 25); } while (u1 === u2);
    const o1 = pick([8, 12, 16]), o2 = pick([20, 24, 32]), p1 = (o1 * u1 / 100).toFixed(2), p2 = (o2 * u2 / 100).toFixed(2);
    return { text: `Jar A holds ${o1} ounces for $${p1}. Jar B holds ${o2} ounces for $${p2}. Which jar costs less per ounce?`, visual: "🥫", choices: ["Jar A", "Jar B"], answer: u1 < u2 ? "Jar A" : "Jar B",
      hints: ["Find the cost of ONE ounce in each jar.", "Change each price to cents and divide by the ounces. The smaller result is the better value.", "Example: 10 ounces for $2.00 is 20 cents each. 20 ounces for $5.00 is 25 cents each. The first is cheaper per ounce. Now do yours."] };
  }));
  c.push(L("Fat-soluble and water-soluble vitamins", [
    "Two groups|💊|<b>Fat-soluble</b> vitamins are <b>A, D, E and K</b>. They dissolve in fat and the body can store them. <b>Water-soluble</b> vitamins are <b>C and the B vitamins</b>.",
    "Why it matters|🥦|The body does not store much vitamin C or B vitamins, so you need them often. Fat-soluble vitamins are absorbed better with a little fat in your meal.",
    "Sources|🍊|Vitamin C: oranges and peppers. Vitamin A: carrots and sweet potatoes. Vitamin K: leafy greens. Vitamin D: sunlight, fortified milk, fish."
  ], [
    "Which vitamins are fat-soluble?|A, D, E and K|💊||C and B,only B",
    "Vitamin C dissolves in what?|water|🍊||fat,oil",
    "Which vitamin is found in citrus fruits?|vitamin C|🍊||vitamin A,vitamin K",
    "A little fat in a meal helps your body absorb which vitamins?|fat-soluble vitamins|🥑||water-soluble vitamins,no vitamins",
    "Which vitamin helps blood clot and is in leafy greens?|vitamin K|🥬||vitamin C,vitamin B",
    "Vitamin A in carrots helps which sense?|vision|🥕||hearing,smell",
    "Why do you need water-soluble vitamins often?|the body does not store much of them|🔄||they turn into fat,they are never needed",
    "Vitamin D helps your body absorb which mineral?|calcium|🦴||sodium,sugar"
  ], "Fat or water: where do they dissolve?"));
  c.push(L("How digestion works", [
    "The path|🍎|Food goes <b>mouth</b> (chewing and saliva), <b>esophagus</b> (a tube), <b>stomach</b> (acid and churning), <b>small intestine</b> (absorbs nutrients), <b>large intestine</b> (absorbs water).",
    "Helpers|🫀|The liver, gallbladder and pancreas send juices that help break down food. Nutrients pass into the blood in the small intestine.",
    "Fiber|🥦|Fiber is not digested, but it helps food move along. Drink water and eat fruits, vegetables and whole grains."
  ], [
    "Where does digestion begin?|the mouth|👄||the stomach,the knee",
    "Which tube carries food from mouth to stomach?|esophagus|🍎||windpipe,large intestine",
    "Where does most nutrient absorption happen?|small intestine|🌀||mouth,esophagus",
    "What does the large intestine mostly absorb?|water|💧||vitamins only,iron only",
    "What does the stomach use to break down food?|acid and churning|🫃||sunlight,sandpaper",
    "What does fiber do?|helps food move along|🥦||is fully digested for energy,makes bones",
    "What in your mouth begins to break food down?|saliva|👄||bone,air",
    "What carries absorbed nutrients to the rest of the body?|the blood|🩸||the hair,the nails"
  ], "Follow the food from top to bottom."));
  c.push(L("Food myths and facts", [
    "Check the source|🔎|Many food claims are myths. Check them with trusted sources like a registered dietitian, a doctor or a health agency.",
    "Some myths|🚫|'Fat is bad' (some fats are healthy). 'Detox juice cleans you' (your liver and kidneys do that). 'Sugar makes kids hyper' (studies do not show this).",
    "Good habits|🥗|Eat a variety of whole foods, drink water, and be wary of 'miracle' foods that promise to fix everything."
  ], [
    "Which is the best fact about fat?|some fats, like in nuts and fish, are healthy|🥑||all fat is poison,fat has no calories",
    "Which organs naturally clean your blood?|the liver and kidneys|🫘||the eyes and ears,hair and nails",
    "What do studies say about sugar and hyper kids?|they do not show sugar causes hyperactivity|🍬||sugar always causes it,sugar makes you taller",
    "A 'fat free' food can still have...|lots of sugar and calories|🏷️||no calories at all,no ingredients",
    "Who is a good source for nutrition facts?|a registered dietitian|👩‍⚕️||a stranger online,a catchy ad",
    "A 'miracle' food that fixes everything is probably...|too good to be true|✨||a sure thing,approved by all doctors",
    "Do you need to skip all carbohydrates to be healthy?|no, whole grains and fruit are good carbs|🍞||yes, every carb is bad,only on weekdays",
    "Which is a healthy habit backed by evidence?|eating a variety of whole foods|🥗||eating only one food,skipping meals every day"
  ], "Ask: who says so, and how do they know?"));
  c.push(L("Gluten and dough", [
    "What is gluten?|🌾|<b>Gluten</b> is a stretchy protein network that forms when wheat flour mixes with water and is kneaded. It traps gas bubbles so bread can rise.",
    "Kneading and resting|🍞|Kneading builds gluten for chewy bread. <b>Resting</b> dough lets it relax. Muffins and cakes are mixed gently so gluten does not make them tough.",
    "Different flours|🥖|<b>Bread flour</b> has more protein, so more gluten. <b>Cake flour</b> has less, so cakes are soft. Some people cannot eat gluten and use rice or corn flours."
  ], [
    "What is gluten?|a stretchy protein network in wheat dough|🌾||a type of sugar,a metal",
    "What traps gas bubbles so bread can rise?|gluten|🍞||sugar crystals,salt",
    "Which flour has more protein?|bread flour|🥖||cake flour,corn starch",
    "What does kneading do?|builds gluten|👐||removes gluten,freezes dough",
    "Why mix muffin batter gently?|so gluten does not make them tough|🧁||to make it colder,to make it sweeter",
    "What does resting dough do?|lets gluten relax|⏲️||makes it explode,turns it to glass",
    "Which flour is good for soft cakes?|cake flour|🎂||bread flour,rye bread",
    "Which could a person who avoids gluten use?|rice flour|🍚||wheat flour,barley flour"
  ], "Gluten is a stretchy network."));
  c.push(L("Pasteurization and dairy", [
    "Pasteurization|🥛|<b>Pasteurization</b> heats milk quickly to kill harmful germs. It is named for Louis Pasteur, a scientist. It keeps milk safe to drink.",
    "Homogenized|🧪|<b>Homogenizing</b> breaks fat into tiny drops so cream does not float to the top.",
    "More dairy|🧀|Cheese and yogurt are made by adding helpful cultures to milk. Lactose is milk sugar, and some people cannot digest it."
  ], [
    "What does pasteurization do to milk?|kills harmful germs with heat|🥛||adds sugar,makes it pink",
    "Who is pasteurization named after?|Louis Pasteur|🧑‍🔬||Pat Sturr,a cow named Pat",
    "What does homogenizing milk do?|spreads the fat in tiny drops|🥛||removes all water,adds salt",
    "What is lactose?|milk sugar|🥛||milk fat,milk salt",
    "What helps turn milk into yogurt?|helpful cultures|🥣||sand,paint",
    "Why do some people avoid milk?|they cannot digest lactose|🥛||milk is always sweet,it is made of rock",
    "Why is pasteurized milk safer?|harmful germs are killed|🛡️||it has more fat,it has a new color",
    "What do we call milk's sugar?|lactose|🥛||fructose from fruit,sucrose from cane"
  ], "Heat makes milk safe."));
  c.push(L("Food additives", [
    "What are additives?|🧪|<b>Additives</b> are substances added to food. <b>Preservatives</b> (salt, sugar, vinegar, citric acid) help food last. Others add color, flavor, thickness or vitamins.",
    "Enriched and fortified|💊|<b>Enriched</b> means nutrients lost in processing are put back. <b>Fortified</b> means nutrients are added that were not there before, like vitamin D in milk.",
    "Read the label|📋|Additives are listed in the ingredients. Rules from food agencies control which ones are allowed."
  ], [
    "What does a preservative do?|helps food last longer|⏳||adds a loud noise,makes it heavy",
    "Which is a natural preservative?|salt|🧂||candy sprinkles,hot sauce",
    "What does 'fortified' mean?|extra nutrients are added|💊||nutrients are removed,nothing changes",
    "What does 'enriched' mean?|nutrients lost in processing are added back|🌾||all nutrients are removed,sugar is added",
    "Where do you see additives listed?|the ingredient list|📋||the barcode,the company logo",
    "Which is an example of a fortified food?|milk with added vitamin D|🥛||plain water,a raw apple",
    "Which additive gives food a color?|food coloring|🎨||citric acid,salt",
    "Who sets rules for which additives are allowed?|food safety agencies|🏛️||the cereal box,a cartoon character"
  ], "Additives have jobs."));
  c.push(L("Fresh, frozen and canned", [
    "All forms count|🥦|Fresh, frozen, canned and dried fruits and vegetables can all be part of healthy eating.",
    "Frozen and canned|🧊|Frozen produce is picked ripe and frozen fast, so it keeps nutrients. Canned lasts a long time but may have added salt or sugar, so choose 'no salt added' or fruit in water or juice.",
    "Fresh|🍎|Fresh produce is best in season. Wash it, and store it right so it does not spoil."
  ], [
    "Which form of produce lasts longest?|canned|🥫||fresh and cut,fresh and ripe",
    "Why can frozen produce be nutritious?|it is frozen soon after picking|🧊||it is picked green,it is boiled for hours",
    "What should you choose to cut sodium in canned vegetables?|no salt added|🥫||extra salt,a salty glaze",
    "How should canned fruit be packed?|in water or juice|🍑||in heavy syrup,in oil",
    "When is fresh produce best?|in season|🍓||out of season only,when it is rotten",
    "What should you do to fresh produce before eating?|wash it|🚰||nothing,paint it",
    "Does frozen fruit count as fruit?|yes|🍓||no,only on holidays",
    "What could you do to canned beans to cut sodium?|rinse them|🫘||salt them,freeze them"
  ], "All forms can be healthy."));
  c.push(G("Averaging grocery bills", [
    "The mean|📊|The <b>mean</b> (average) tells the typical amount. Add all the numbers, then divide by how many there are.",
    "Steps|🧮|Add the four bills to get the total. Divide the total by 4.",
    "Example|✏️|Bills of $40, $50, $60 and $50: total $200. 200 ÷ 4 = <b>$50</b> mean."
  ], () => {
    const m = ri(40, 120), d1 = ri(-12, 12), d2 = ri(-12, 12), d3 = ri(-12, 12), d4 = -(d1 + d2 + d3);
    const v = shuf([m + d1, m + d2, m + d3, m + d4]);
    return Q(`A family's four weekly grocery bills were $${v[0]}, $${v[1]}, $${v[2]} and $${v[3]}. What is the mean weekly bill in dollars?`, m, "🛒",
      "The mean needs the total first.", "Add all four amounts, then divide by 4.", "Bills of $30, $20 and $40: total $90, divide by 3 is $30.");
  }));
  c.push(G("Discount, then tax", [
    "Two steps|🧾|A sale price comes first. Then sales tax is added to the sale price.",
    "Steps|🧮|Find the discount and subtract it. Then find the tax on the sale price and add it.",
    "Example|✏️|A $20 toy is 50% off: $10. Add 10% tax ($1) to get <b>$11</b>."
  ], () => {
    const t = ri(0, 2), k = ri(1, 5), cfg = [[50, 20, 10, 1], [20, 50, 40, 4], [25, 40, 30, 3]][t], off = cfg[0], P = cfg[1] * k, sale = cfg[2] * k, tax = cfg[3] * k;
    return Q(`A jacket costs $${P}. It is ${off}% off. Then 10% sales tax is added to the sale price. What is the final price in dollars?`, sale + tax, "🧥",
      "Do the discount first, then the tax.", `Find the sale price. Then take 10% of the sale price (divide by 10) and add it.`, "A $40 shirt, 50% off, is $20. The tax is $2, so $22.");
  }));
  c.push(G("Bake sale profit", [
    "Profit|💰|<b>Profit = money earned - money spent</b>. Money earned is the number sold times the price.",
    "Steps|🧮|Multiply the number sold by the price. Then subtract the cost of ingredients.",
    "Example|✏️|Sell 10 cookies at $2 = $20. Ingredients cost $8. Profit = $20 - $8 = <b>$12</b>."
  ], () => {
    const p = ri(1, 5), n = ri(8, 30), cost = ri(5, Math.max(5, Math.floor(n * p / 2)));
    return Q(`A club sells ${n} cupcakes at $${p} each. The ingredients cost $${cost}. How many dollars of profit?`, n * p - cost, "🧁",
      "Find the money earned first.", "Multiply the number sold by the price, then subtract the cost.", "Sell 6 muffins at $3 = $18. Ingredients cost $7. Profit is $11.");
  }));
  c.push(L("Smart about advertising", [
    "Ads sell things|📺|The goal of an ad is to sell. Ads use catchy music, bright colors, cartoon characters and famous people to get attention.",
    "Tricks|🎯|<b>Bandwagon</b>: 'everyone is buying it'. <b>Testimonial</b>: a famous person says it is great. <b>Urgency</b>: 'buy now, last chance'. <b>Free gift</b>: a toy to hook you.",
    "Think first|🤔|Ask: What are they trying to sell? Do I need it? Compare labels and prices before buying."
  ], [
    "What is the main goal of an ad?|to sell something|📺||to teach math,to be your friend",
    "'Everyone is buying it!' is which trick?|bandwagon|🚌||testimonial,free gift",
    "A famous person saying a product is great is a...|testimonial|⭐||bandwagon,urgency",
    "'Buy now, last chance!' uses...|urgency|⏰||a free gift,a testimonial",
    "Why might a toy come with a food product?|to attract kids to buy it|🧸||to help the food taste better,to make it healthier",
    "What should you do before buying?|compare labels and prices|🏷️||buy it right away,ask the ad if it is good",
    "Does a cartoon character make a food healthy?|no|🐯||yes,only sometimes",
    "A good question to ask about an ad is...|do I really need this?|🤔||how loud is the music?,what color is it?"
  ], "Ask who benefits."));
  c.push(L("Color wheel basics", [
    "Primary and secondary|🎨|The <b>primary</b> colors are red, yellow and blue. Mixing two makes a <b>secondary</b> color: orange, green or purple.",
    "Pairs|🎭|<b>Complementary</b> colors sit across the wheel: red-green, blue-orange, yellow-purple. They stand out together. <b>Analogous</b> colors sit next to each other and look calm.",
    "Warm and cool|🌡️|Red, orange and yellow are <b>warm</b>. Blue, green and purple are <b>cool</b>. Black, white, gray and beige are <b>neutral</b>. Use the color wheel to plan outfits and plates of food."
  ], [
    "Which are the primary colors?|red, yellow and blue|🎨||red and green and purple,orange and green and purple",
    "Mixing blue and yellow makes...|green|🟢||orange,purple",
    "Mixing red and yellow makes...|orange|🟠||green,purple",
    "Which color is complementary to blue?|orange|🔵||red,green",
    "Which color is complementary to red?|green|🔴||blue,orange",
    "Colors next to each other on the wheel are called...|analogous|🎨||complementary,neutral",
    "Which of these is a warm color?|orange|🟠||blue,green",
    "Which of these is a neutral color?|beige|🤍||red,purple"
  ], "Picture the color wheel."));
  c.push(G("Quilt squares and area", [
    "Squares make a quilt|🧵|A quilt is made of equal squares in rows. <b>Squares in all = rows x squares per row</b>.",
    "Size|📏|Each square is a number of inches wide. A row of 6 squares that are 5 inches wide is 6 x 5 = 30 inches long.",
    "Area|🔲|Area = length x width. Or: squares in all x area of one square (side x side)."
  ], () => {
    const r = ri(3, 8), cc = ri(3, 8), s = pick([4, 5, 6]), t = ri(0, 2);
    if (t === 0) return Q(`A quilt has ${r} rows of ${cc} squares. How many squares are in the quilt?`, r * cc, "🧵", "Count rows of equal size.", "Multiply the rows by the squares in each row.", "4 rows of 5 squares make 4 x 5 = 20 squares.");
    if (t === 1) return Q(`Each quilt square is ${s} inches wide. A row has ${cc} squares side by side. How many inches long is the row?`, s * cc, "📏", "Each square adds the same width.", "Multiply the width of one square by the number of squares.", "A row of 7 squares that are 3 inches wide is 21 inches.");
    return Q(`A quilt has ${r} rows of ${cc} squares. Each square is ${s} inches on each side. What is the quilt's area in square inches?`, r * cc * s * s, "🧵", "Find the area of one square first.", "Multiply the squares in the quilt by the area of one square (side x side).", "6 squares, each 2 by 2 (area 4): 6 x 4 = 24 square inches.");
  }));
  c.push(G("Kilowatt-hours", [
    "How power is billed|💡|The electric company charges by the <b>kilowatt-hour</b> (kWh). 1 kWh is 1,000 watts used for 1 hour.",
    "Formula|🧮|<b>kWh = watts x hours ÷ 1,000</b>. A 100-watt bulb running 10 hours uses 1 kWh.",
    "Cost|💵|<b>Cost = kWh x price per kWh</b>. At 12 cents per kWh, 3 kWh costs 3 x 12 = 36 cents."
  ], () => {
    const W = pick([50, 100, 200, 500, 1000]), step = { 50: 20, 100: 10, 200: 5, 500: 2, 1000: 1 }[W], h = step * ri(1, 4), kwh = W * h / 1000, pr = ri(10, 20);
    if (Math.random() < 0.5) return Q(`A ${W}-watt device runs for ${h} hours. How many kilowatt-hours does it use?`, kwh, "💡", "Multiply watts by hours, then change to kilowatts.", "Divide watts x hours by 1,000.", "A 200-watt TV for 10 hours: 200 x 10 = 2,000, divided by 1,000 is 2 kWh.");
    return Q(`A ${W}-watt device runs for ${h} hours. Electricity costs ${pr} cents per kWh. How many cents does it cost?`, kwh * pr, "💵", "Find the kWh first.", `Watts x hours ÷ 1,000 gives kWh. Then multiply by ${pr}.`, "2 kWh at 10 cents per kWh costs 20 cents.");
  }));
  c.push(L("Food banks and sharing", [
    "Food insecurity|🏘️|Some families do not always have enough food. This is called <b>food insecurity</b>. It can happen to anyone.",
    "Food banks|🥫|<b>Food banks</b> collect food and give it to people who need it. Good donations are unopened, unexpired canned goods, pasta, rice and peanut butter.",
    "Helping|🤝|Families can volunteer, join a food drive or grow food in a <b>community garden</b>. Wasting less food also helps."
  ], [
    "What do food banks do?|collect food and give it to people who need it|🥫||sell fancy meals,teach swimming",
    "Which is a good food donation?|an unopened can of beans|🥫||an opened bag of chips,a moldy apple",
    "What should donated canned food be?|unopened and not expired|📅||dented and old,open and half eaten",
    "What is a community garden?|a shared place where neighbors grow food|🌻||a garden only for pets,a type of road",
    "What is a food drive?|an event to collect food donations|🚗||a car race,a cooking contest",
    "Who should you volunteer with?|your family or a trusted adult|🤝||a stranger online,nobody",
    "How can wasting less food help?|more food can be shared or saved|♻️||it makes no difference,it makes food disappear",
    "What does food insecurity mean?|not always having enough food|🏘️||having too much food,liking all foods"
  ], "Sharing helps neighbors."));
  c.push(L("Who checks our food?", [
    "Two agencies|🏛️|In the United States, the <b>USDA</b> inspects meat, poultry and processed egg products. The <b>FDA</b> oversees most other foods, like produce, seafood and packaged goods.",
    "Restaurants|🍽️|Local <b>health departments</b> inspect restaurants and grocery stores. They check temperatures, cleanliness and hand-washing. Some places post a grade.",
    "Recalls|📢|If a food may be unsafe, the company announces a <b>recall</b>. Do not eat recalled food. Throw it away or return it."
  ], [
    "Which agency inspects meat and poultry?|USDA|🥩||FDA,NASA",
    "Which agency oversees most produce and packaged foods?|FDA|🥫||USDA,NFL",
    "Who inspects restaurants?|the local health department|🍽️||the circus,a movie critic",
    "What is a recall?|food taken off shelves because it may be unsafe|📢||a sale on food,a cooking show",
    "What should you do with recalled food?|do not eat it; throw it away or return it|🗑️||eat it quickly,share it with friends",
    "What do inspectors check?|temperatures and cleanliness|🌡️||the menu colors,the music",
    "What does a posted grade in a restaurant show?|how well it passed an inspection|🅰️||how loud it is,how big it is",
    "Does the FDA inspect most seafood?|yes|🐟||no, the circus does,it never does"
  ], "Someone checks the food supply."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[4], c[7], c[8], c[9], c[10], c[12], c[14], c[15]]));
  c.push(MIX("Level 15 Challenge", [c[3], c[5], c[6], c[11], c[13], c[16], c[17], c[0], c[1], c[8], c[9], c[10]]));

  Object.assign(HOMEEC_LEVELS, { 13: a, 14: b, 15: c });
})();
