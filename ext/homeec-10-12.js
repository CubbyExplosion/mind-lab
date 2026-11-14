// ext/homeec-10-12.js  Home Economics & Cooking levels 10-12
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
  // G: numeric lesson. gen() returns a question; we retry if the answer shows up inside hint 1 or 2.
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

  // ================= LEVEL 10 =================
  const a = [];
  a.push(G("Measuring equivalents", [
    "Bigger and smaller units|📏|Cooks swap units all the time. <b>3 teaspoons = 1 tablespoon</b>. <b>16 tablespoons = 1 cup</b>. <b>2 cups = 1 pint</b>. <b>2 pints = 1 quart</b>. <b>4 quarts = 1 gallon</b>.",
    "Going to smaller units|✖️|When you change a big unit into small units, <b>multiply</b>. 2 pints is 2 x 2 = 4 cups.",
    "Going to bigger units|➗|When you change small units into big units, <b>divide</b>. 8 cups is 8 ÷ 2 = 4 pints."
  ], () => {
    const U = [["teaspoons", "tablespoon", "tablespoons", 3], ["tablespoons", "cup", "cups", 16], ["cups", "pint", "pints", 2], ["pints", "quart", "quarts", 2], ["quarts", "gallon", "gallons", 4]];
    const [sm, bigS, bigP, f] = pick(U); let n;
    do { n = ri(2, 5); } while (n === f);
    if (Math.random() < 0.55) return Q(`How many ${sm} are in ${n} ${bigP}?`, n * f, "📏", `You are changing a big unit into small units. Will the answer be bigger or smaller than ${n}?`, `One ${bigS} equals ${f} ${sm}. Multiply to find the total.`, "How many cups in 3 pints? 1 pint is 2 cups, so 3 x 2 = 6 cups.");
    return Q(`How many ${bigP} are in ${n * f} ${sm}?`, n, "📏", "You are changing small units into big units. Will the answer be bigger or smaller?", `Divide by the number of ${sm} in one ${bigS}. (Hint: it is ${f}.)`, "How many pints in 8 cups? 1 pint is 2 cups, so 8 ÷ 2 = 4 pints.");
  }));
  a.push(G("Scaling recipes", [
    "Same taste, more people|🍲|To feed more people, <b>multiply every ingredient</b> by the same number so the recipe still tastes right.",
    "Find the multiplier|🔍|Divide the new servings by the old servings. A recipe for 4 that you want for 12 needs 12 ÷ 4 = <b>3 times</b> as much.",
    "Example|✏️|The recipe for 4 uses 2 cups of rice. For 12, use 2 x 3 = <b>6 cups</b>."
  ], () => {
    let S, k, A; do { S = pick([2, 3, 4, 5, 6]); k = ri(2, 4); A = ri(2, 7); } while (A === S);
    const f = pick(["cups of rice", "eggs", "tablespoons of butter", "cups of milk", "carrots", "teaspoons of salt"]);
    return Q(`A recipe for ${S} people uses ${A} ${f}. You are cooking for ${S * k} people. How many ${f.split(" ")[0] === "cups" || f.split(" ")[0] === "tablespoons" || f.split(" ")[0] === "teaspoons" ? f.split(" ")[0] : f}?`.replace(/ \?$/, "?"), A * k, "🍲",
      "First ask: how many times bigger is the new group than the old group?", `Find the multiplier by dividing the new number of people by ${S}. Then multiply the ${f.split(" ")[0]} by it.`,
      "A recipe for 2 uses 5 eggs. For 6 people, 6 ÷ 2 = 3 times as much, so 5 x 3 = 15 eggs.");
  }));
  a.push(G("Unit price", [
    "Price for one|🏷️|<b>Unit price</b> is the price for ONE item (or one ounce). It lets you compare packages fairly.",
    "How to find it|➗|Divide the total price by the number of items. A $12 pack of 6 costs $12 ÷ 6 = <b>$2 each</b>.",
    "Better buy|✅|The pack with the <b>lower unit price</b> is the better buy, as long as you will really use it all."
  ], () => {
    if (Math.random() < 0.5) { const n = pick([3, 4, 5, 6, 8, 10]), p = ri(2, 9), it = pick(["juice boxes", "granola bars", "apples", "yogurt cups", "bread rolls"]);
      return Q(`A pack of ${n} ${it} costs $${n * p}. How many dollars does ONE cost?`, p, "🏷️", "Unit price means the price for just one. Should you multiply or divide?", "Share the total price equally among the items in the pack.", "A pack of 5 pears costs $10. $10 ÷ 5 = $2 each."); }
    let n1, p1, n2, p2, u1, u2;
    do { n1 = pick([2, 3, 4, 5]); u1 = ri(2, 6); n2 = pick([6, 8, 10]); u2 = ri(2, 6); } while (u1 === u2);
    p1 = n1 * u1; p2 = n2 * u2;
    const ans = u1 < u2 ? "Pack A" : "Pack B";
    return { text: `Pack A has ${n1} bars for $${p1}. Pack B has ${n2} bars for $${p2}. Which is the better buy (cheaper per bar)?`, visual: "🍫", choices: ["Pack A", "Pack B"], answer: ans,
      hints: ["Find the price for ONE bar in each pack, then compare.", "Divide each pack's price by its number of bars. The smaller result wins.", "Example: 2 for $8 is $4 each. 5 for $15 is $3 each. The 5-pack is cheaper per item. Now do yours."] };
  }));
  a.push(G("Sale prices", [
    "Saving money|🛍️|A sale lowers the price. <b>Half off</b> means divide by 2. <b>$3 off</b> means subtract 3. <b>10% off</b> means take away one tenth.",
    "Easy percents|💡|10% is the same as <b>one tenth</b>. To find 10% of $50, divide by 10 to get $5. A quarter off means take away one fourth.",
    "Example|✏️|A $40 coat is half off. Half of $40 is $20, so you pay <b>$20</b>."
  ], () => {
    const t = ri(0, 3);
    if (t === 0) { const m = ri(3, 30); return Q(`A game costs $${2 * m}. It is half off. How many dollars do you pay?`, m, "🏷️", "Half off means you pay half of the price.", "Divide the price by 2 to find what you pay.", "A hat costs $18 and is half off. 18 ÷ 2 = $9."); }
    if (t === 1) { const m = ri(2, 9); return Q(`A jacket costs $${10 * m}. It is 10% off. How many dollars do you pay?`, 9 * m, "👕", "First find 10% (one tenth) of the price, then take it away.", "Divide the price by 10 to get the amount off. Subtract it from the price.", "A bag costs $30 and is 10% off. 10% is $3. 30 - 3 = $27."); }
    if (t === 2) { const p = ri(12, 40), d = ri(2, 8); return Q(`A book costs $${p}. A coupon takes $${d} off. How many dollars do you pay?`, p - d, "📚", "A coupon with dollars off means you subtract.", "Take the dollars off from the full price.", "A toy costs $15 and a coupon takes $4 off. 15 - 4 = $11."); }
    const m = ri(2, 9); return Q(`A shirt costs $${4 * m}. It is a quarter (one fourth) off. How many dollars do you pay?`, 3 * m, "👚", "A quarter off means you take away one fourth of the price.", "Divide the price by 4 to find the amount off, then subtract it.", "A scarf costs $20 and is a quarter off. 20 ÷ 4 = 5 off. 20 - 5 = $15.");
  }));
  a.push(L("Safe thawing and cooling", [
    "Thaw it safely|🧊|Never thaw food on the counter. Safe ways: in the <b>refrigerator</b>, in <b>cold water</b> (change the water every 30 minutes), or in the <b>microwave</b> (cook it right away).",
    "Cool it quickly|⏰|Put leftovers in the fridge within <b>2 hours</b>. Split big pots of soup into shallow containers so they cool fast.",
    "Cold numbers|🌡️|Keep the fridge at <b>40°F (4°C)</b> or colder and the freezer at <b>0°F (-18°C)</b>."
  ], [
    "Which is NOT a safe way to thaw chicken?|on the kitchen counter|🍗|Germs grow fast when the outside gets warm.|in the refrigerator,in cold water",
    "What is the safest, slowest way to thaw food?|in the refrigerator|🧊|It stays cold the whole time.|on the counter,in warm water",
    "How often should you change the water when thawing in cold water?|every 30 minutes|💧|It is a short time, less than an hour.|once a day,never",
    "When must you cook food thawed in the microwave?|right away|⏲️|Parts of it may already be warm.|next week,tomorrow night",
    "How soon should leftovers go in the fridge?|within 2 hours|🥘|It is a short time after the meal.|by the next morning,within 2 days",
    "Why put hot soup in shallow containers?|it cools faster|🍲|Think about how deep the soup is.|it tastes sweeter,it uses less water",
    "What temperature should a fridge be?|40°F or colder|🌡️|It must be cold enough to slow germs.|60°F,50°F",
    "What temperature should a freezer be?|0°F|❄️|It is much colder than the fridge.|32°F,40°F"
  ], "Keep cold things cold and cool hot things fast."));
  a.push(G("Servings and calories", [
    "Servings in a package|📦|A package often holds more than one <b>serving</b>. The Nutrition Facts label shows the calories in ONE serving.",
    "Multiply|✖️|If a box has 4 servings and each has 120 calories, the whole box has 4 x 120 = <b>480 calories</b>.",
    "Subtract|➖|A bag with 8 servings where you eat 3 leaves 8 - 3 = <b>5 servings</b>."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const s = ri(2, 6), c = pick([50, 60, 80, 90, 100, 120, 150]); return Q(`A box has ${s} servings. Each serving has ${c} calories. How many calories are in the whole box?`, s * c, "📦", "The label gives calories for ONE serving, but you want the whole box.", "Multiply the servings by the calories in one serving.", "A bag has 3 servings of 70 calories. 3 x 70 = 210 calories."); }
    if (t === 1) { const s = ri(2, 4), c = pick([40, 60, 80, 110, 130, 150]); return Q(`One serving of crackers has ${c} calories. You eat ${s} servings. How many calories is that?`, s * c, "🍘", "Eating more servings means more calories.", "Multiply your servings by the calories in one serving.", "One serving is 100 calories and you eat 2. 2 x 100 = 200 calories."); }
    const s = ri(6, 12), e = ri(2, 5); return Q(`A container has ${s} servings. You eat ${e} servings. How many servings are left?`, s - e, "🥣", "Eating servings takes some away from the total.", "Take the servings you ate away from the servings in the container.", "A tub has 10 servings and you eat 4. 10 - 4 = 6 left.");
  }));
  a.push(L("Eat the rainbow", [
    "Colors matter|🌈|Fruits and vegetables come in many colors. Each color often brings different <b>nutrients</b>, so eat a mix.",
    "Examples|🥕|<b>Orange</b> carrots have vitamin A for healthy eyes. <b>Citrus</b> fruits have vitamin C. <b>Bananas</b> have potassium. <b>Dark leafy greens</b> like spinach have iron and vitamin K.",
    "Mix it up|🍽️|Try to put at least two or three colors on your plate at each meal."
  ], [
    "Which vitamin do orange carrots give you?|vitamin A|🥕|It is the first letter of the alphabet.|vitamin C,vitamin D",
    "Which vitamin is plentiful in oranges and lemons?|vitamin C|🍊|Citrus fruits are known for this one.|vitamin A,vitamin K",
    "Which mineral are bananas known for?|potassium|🍌||calcium,iron",
    "Which food is a dark leafy green?|spinach|🥬||corn,cauliflower",
    "Why should you eat many colors of produce?|different colors bring different nutrients|🌈||they all taste the same,only red is healthy",
    "Which nutrient does vitamin A help most?|healthy eyes|👀||strong teeth,loud voice",
    "Which of these is a citrus fruit?|grapefruit|🍊||blueberry,pear",
    "How many colors should you aim for on your plate?|a mix of several|🍽️||just one,only white foods"
  ], "Different colors, different nutrients."));
  a.push(L("Planning a week of meals", [
    "A weekly menu|🗓️|A <b>menu plan</b> lists what you will eat for breakfast, lunch, dinner and snacks. Planning saves money, time and food waste.",
    "Steps|📝|1) Check what you already have. 2) Look at store sales. 3) Plan balanced meals. 4) Write a shopping list. 5) Use leftovers on a later night.",
    "Balance|⚖️|Each day should include fruits, vegetables, grains, protein and dairy. Mix quick meals for busy nights with slower meals for free nights."
  ], [
    "What is the first step in planning meals?|check what you already have|🥫||write the bill,buy everything on sale",
    "How does a menu plan save money?|you buy only what you need|💵||you eat out more,you buy extra snacks",
    "What should you do after planning meals?|write a shopping list|📝||throw away the plan,ignore the fridge",
    "Which night is best for a quick meal?|a busy night|⏱️||a night with lots of free time,never",
    "How can leftovers help your plan?|they make a later meal|🥘||they should always be thrown out,they go bad at once",
    "What should every day include?|foods from several food groups|🥗||only one food group,only desserts",
    "Why look at store sales?|to buy foods for less|🏷️||to buy only candy,to spend more",
    "What is a menu plan?|a list of planned meals and snacks|🍽️||a kind of restaurant bill,a recipe for one dish"
  ], "Plan first, then shop."));
  a.push(L("Mixing methods", [
    "Mixing words|🥄|<b>Stir</b>: mix round and round. <b>Beat</b>: mix fast and hard to make smooth. <b>Whisk</b>: use a wire whisk to add air. <b>Fold</b>: lift gently from the bottom so air stays in.",
    "More methods|🧈|<b>Cream</b>: beat butter and sugar until light and fluffy. <b>Knead</b>: push, fold and turn dough. <b>Sift</b>: shake flour through a sieve to remove lumps. <b>Cut in</b>: work cold butter into flour in small bits.",
    "Why it matters|🎂|Using the right method changes how light, smooth or chewy the food turns out."
  ], [
    "Which method gently lifts the batter so air stays in?|fold|🥣|Think of turning the batter over softly.|beat,knead",
    "Which method mixes butter and sugar until fluffy?|cream|🧈||sift,fold",
    "Which method pushes and folds bread dough?|knead|🍞||whisk,cream",
    "Which tool adds air to eggs when you mix?|whisk|🥚||rolling pin,grater",
    "What does sifting do to flour?|removes lumps|🌾||adds sugar,makes it hot",
    "Which method mixes round and round?|stir|🥄||sift,cut in",
    "Which method works cold butter into flour in small bits?|cut in|🥧||fold,whisk",
    "Which method mixes fast and hard to make smooth?|beat|🥣||fold,sift"
  ], "Match the word to how your hands move."));
  a.push(L("Moist and dry heat", [
    "Two kinds of heat|🔥|<b>Moist heat</b> cooks food with water or steam: boiling, simmering, steaming, poaching. <b>Dry heat</b> cooks with hot air or fat: baking, roasting, broiling, grilling, sautéing.",
    "Boil and simmer|♨️|Water boils at <b>212°F (100°C)</b> with big bubbles. <b>Simmering</b> is gentler, with small bubbles just under boiling.",
    "Which one?|🍳|Steaming vegetables keeps color and nutrients. Roasting gives a brown, crisp outside."
  ], [
    "Which is moist-heat cooking?|steaming|♨️|Water turns into this when it boils.|baking,roasting",
    "Which is dry-heat cooking?|roasting|🍗||boiling,poaching",
    "At what temperature does water boil?|212°F|🫕||100°F,32°F",
    "What is the Celsius boiling point of water?|100°C|🌡️||0°C,50°C",
    "Which has smaller bubbles?|simmering|🍲||boiling,freezing",
    "Which cooks eggs gently in hot liquid?|poaching|🥚||broiling,grilling",
    "Which cooks food quickly in a little hot oil?|sautéing|🍳||steaming,simmering",
    "Which method uses the oven's hot air to cook cookies?|baking|🍪||boiling,steaming"
  ], "Is water or dry air doing the cooking?"));
  a.push(G("Planning cooking time", [
    "Time plan|⏱️|Add the times for prep, cooking and resting to find your <b>total time</b>. Start early enough to eat on time.",
    "Many batches|🍪|If one tray bakes 12 minutes and you bake 3 trays one after another, that is 3 x 12 = <b>36 minutes</b>.",
    "Working backward|⏪|To serve dinner at 6:00, start at 6:00 minus the total time."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const p = pick([10, 15, 20]), c = pick([25, 30, 35, 40, 45]), r = pick([5, 10]); return Q(`Prep takes ${p} minutes, baking takes ${c} minutes, and resting takes ${r} minutes. How many minutes in all?`, p + c + r, "⏱️", "You need all three parts of the time added together.", "Add prep, baking and resting.", "Prep 10, bake 20, rest 5. 10 + 20 + 5 = 35 minutes."); }
    if (t === 1) { const m = pick([8, 10, 12, 15]), n = ri(2, 5); return Q(`One tray of cookies bakes for ${m} minutes. You bake ${n} trays, one after the other. How many minutes of baking is that?`, m * n, "🍪", "Each tray needs its own turn in the oven.", "Multiply the minutes for one tray by the number of trays.", "A tray bakes 6 minutes and you bake 4 trays. 6 x 4 = 24 minutes."); }
    const m = ri(2, 5); return Q(`A soup needs ${60 * m} minutes of cooking. How many hours is that?`, m, "🍲", "An hour has 60 minutes. Will you multiply or divide?", "Divide the minutes by the number of minutes in one hour.", "180 minutes ÷ 60 = 3 hours.");
  }));
  a.push(L("Hand stitches", [
    "Basic stitches|🧵|<b>Running stitch</b>: in and out in a line (fast and simple). <b>Backstitch</b>: each stitch goes back to meet the last (strong). <b>Whipstitch</b>: wraps over an edge to join two pieces.",
    "More stitches|🪡|<b>Basting</b>: long loose stitches that hold fabric for a while, then come out. <b>Blanket stitch</b>: loops along an edge to finish or decorate. <b>Slip stitch</b>: nearly invisible, used to close a gap or a hem.",
    "Tip|💡|Tie a knot in the end of the thread. Use a thimble to protect your finger, and keep needles in a pincushion."
  ], [
    "Which stitch is the strongest by hand?|backstitch|🧵|Each stitch goes backward.|running stitch,basting",
    "Which stitch goes in and out in a straight line?|running stitch|🪡||backstitch,blanket stitch",
    "Which stitches are long, loose and meant to be taken out?|basting|📏||backstitch,whipstitch",
    "Which stitch is almost invisible?|slip stitch|👀||blanket stitch,basting",
    "Which stitch loops along an edge for decoration?|blanket stitch|🧣||running stitch,backstitch",
    "Which stitch wraps over an edge to join two pieces?|whipstitch|🧵||basting,running stitch",
    "What protects your finger when you push a needle?|thimble|🪡||pincushion,scissors",
    "Where should you keep needles when not using them?|in a pincushion|📌||on the floor,in your pocket"
  ], "Picture how the thread travels."));
  a.push(L("Stain first aid", [
    "Act fast|⚡|Treat a stain as soon as you can. <b>Blot</b> (press) with a clean cloth. Do not rub, because rubbing pushes the stain in.",
    "Use the right helper|🧴|Most food and drink stains: rinse with <b>cold water</b>. Grease: dab with <b>dish soap</b>. For others, use a stain remover. Test on a hidden spot first.",
    "Heat sets it|🔥|Do not put a stained item in the dryer until the stain is gone. <b>Heat can set a stain</b> for good."
  ], [
    "Should you blot or rub a stain?|blot|🧽|Pressing lifts the stain up.|rub,scrub hard",
    "What can heat from a dryer do to a stain?|set it for good|🔥||wash it away,make it glow",
    "What can you dab on a grease stain?|dish soap|🍟||cold juice,sugar",
    "Which water is a good first rinse for most food stains?|cold water|💧||very hot water,no water",
    "When should you treat a stain?|as soon as you can|⏰||after a month,never",
    "Where should you test a stain remover first?|on a hidden spot|🔍||on the front of the shirt,on a carpet in the hall",
    "What should you read before cleaning a stain?|the care label|🏷️||the weather report,the price tag",
    "Why not rub a stain?|it pushes the stain deeper|😬||it makes the shirt brighter,it cools the fabric"
  ], "Blot, rinse, treat, then wash."));
  a.push(L("Sewing machine parts", [
    "Main parts|🧵|The <b>needle</b> makes stitches. The <b>bobbin</b> holds the bottom thread. The <b>presser foot</b> holds the fabric down. The <b>feed dogs</b> move the fabric along.",
    "Controls|🦶|The <b>foot pedal</b> controls speed. The <b>handwheel</b> turns the needle by hand. The <b>stitch selector</b> chooses the stitch. <b>Tension</b> controls how tight the thread is.",
    "Safety|⚠️|Keep fingers away from the needle. Do not pull the fabric hard. Turn the machine off and unplug it when threading or cleaning."
  ], [
    "Which part holds the bottom thread?|bobbin|🧵|It is a small spool under the needle plate.|presser foot,handwheel",
    "Which part holds fabric flat while you sew?|presser foot|🦶||bobbin,spool pin",
    "Which part moves fabric along under the needle?|feed dogs|➡️||tension dial,foot pedal",
    "What controls how fast the machine sews?|foot pedal|🦶||stitch selector,bobbin",
    "Which part makes the stitches?|needle|🪡||handwheel,thimble",
    "What does the tension control?|how tight the thread is|🎛️||the speed,the color",
    "What should you do before cleaning the machine?|unplug it|🔌||leave it running,pour water in",
    "What should you NOT do while sewing?|pull the fabric hard|⚠️||keep fingers clear,watch the needle"
  ], "Each part has one job."));
  a.push(L("Cleaning product safety", [
    "Read the label|🏷️|Always read the label before you use a cleaner. Ask a grown-up first. Wear gloves if the label says to.",
    "Never mix|🚫|<b>Never mix cleaners</b>, especially <b>bleach and ammonia</b>. Mixing can make poisonous gas. Use one product at a time.",
    "Store safely|🔒|Keep cleaners in their <b>original bottles</b> with labels, up high or locked away from little kids and pets. Open a window for fresh air."
  ], [
    "Which two cleaners must never be mixed?|bleach and ammonia|⚠️|One of them is bleach.|soap and water,vinegar and water",
    "What should you do before using a cleaner?|read the label|🏷️||mix it with another one,taste it",
    "Who should you ask before using a strong cleaner?|a grown-up|🧑||a stranger,nobody",
    "Where should cleaners be kept?|in original bottles out of reach|🔒||in juice bottles on the floor,in the toy box",
    "Why open a window when cleaning?|for fresh air|🪟||to let bugs in,to cool the soap",
    "Why keep the label on a cleaning bottle?|it tells you what is inside and how to use it|📋||it makes the bottle pretty,it keeps the lid on",
    "What can mixing cleaners make?|poisonous gas|☁️||a better cleaner,a soft bubble bath",
    "What should you wear if the label says so?|gloves|🧤||a hat,sandals"
  ], "Careful cleaners keep you safe."));
  a.push(G("Cost of a recipe", [
    "Add it up|💵|To find a recipe's cost, add the cost of each ingredient you use. Then divide by the servings to get the <b>cost per serving</b>.",
    "Example|✏️|2 eggs at 30 cents each is 60 cents. 3 apples at 40 cents each is 120 cents. Together: 180 cents.",
    "Cost per serving|🍽️|If the whole meal costs $24 and serves 6, each serving costs $24 ÷ 6 = <b>$4</b>."
  ], () => {
    if (Math.random() < 0.55) { const a1 = ri(2, 6), p1 = pick([10, 20, 25, 30, 40, 50]), a2 = ri(2, 5), p2 = pick([10, 15, 20, 30, 60]);
      return Q(`A recipe uses ${a1} eggs at ${p1} cents each and ${a2} apples at ${p2} cents each. What is the total cost in cents?`, a1 * p1 + a2 * p2, "💵", "Find the cost of the eggs and the cost of the apples separately first.", "Multiply amount by price for each food, then add the two costs.", "3 pears at 20 cents and 2 limes at 15 cents. 60 + 30 = 90 cents."); }
    const s = ri(3, 8), c = ri(2, 9); return Q(`A family meal costs $${s * c} and serves ${s} people. How many dollars is each serving?`, c, "🍽️", "Cost per serving means the cost for one person.", "Share the total cost equally by the number of people.", "A $20 meal serves 5. $20 ÷ 5 = $4 each.");
  }));
  a.push(L("Being a good host", [
    "Welcome guests|🏠|A good host greets guests warmly, shows them where things are, and offers a drink or snack.",
    "Think about others|🤝|Ask guests about <b>food allergies</b> and what they like. Let guests choose first. Introduce people who have not met.",
    "Clean up|🧹|Thank guests for coming. Tidy up after the visit. If you are a guest, thank your host too."
  ], [
    "What should a host ask guests about food?|allergies and likes|🍽️|Think of safety and taste.|their shoe size,their age",
    "Who should choose first, host or guest?|the guest|🎁||the host,the dog",
    "What should a host do when guests arrive?|greet them warmly|👋||ignore them,hide",
    "What should you do if two guests have not met?|introduce them|🤝||say nothing,walk away",
    "What should a guest say at the end?|thank you|🙏||that was boring,nothing",
    "What should a host offer?|a drink or snack|🥤||a bill,homework",
    "What is a good way to be a host with a guest who has an allergy?|keep that food out of their meal|⚠️||make them eat it,hide the ingredient",
    "After guests leave, a host should|tidy up|🧹||leave a mess,go to sleep without cleaning"
  ], "A host makes guests feel welcome and safe."));
  a.push(L("Saving energy and water", [
    "Water|💧|Turn off the tap while scrubbing dishes or brushing teeth. Run the dishwasher only when it is <b>full</b>. Fix drips.",
    "Energy|⚡|Put a <b>lid on the pot</b> so it heats faster. Match the pot to the burner size. Keep the fridge door closed. Use a microwave or toaster oven for small meals.",
    "Why?|🌍|Saving energy and water saves money and helps the planet."
  ], [
    "Why put a lid on a pot?|food heats faster|🫕|Heat stays in.|it cools the water,it makes it spill",
    "When should you run the dishwasher?|when it is full|🍽️||with one spoon,never",
    "What can you do with the tap while scrubbing dishes?|turn it off|🚰||leave it on,turn it to hot",
    "Which saves more energy for a small meal?|using a microwave|⚡||heating the big oven,using all four burners",
    "What should you do about a dripping tap?|ask a grown-up to fix it|💧||ignore it,hit it",
    "Why keep the fridge door shut?|to keep the cold in|🧊||to let air out,to save the light",
    "Should a small pot sit on a big burner?|no, match the pot to the burner|🔥||yes always,only on Sundays",
    "Saving water and energy also helps with|saving money|💵||making noise,losing keys"
  ], "Use only what you need."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[4], a[7], a[9], a[11], a[14], a[16]]));
  a.push(MIX("Level 10 Challenge", [a[1], a[3], a[5], a[6], a[8], a[10], a[12], a[13], a[15], a[17]]));

  // ================= LEVEL 11 =================
  const b = [];
  b.push(G("Fractions of a cup", [
    "Cup fractions|🥛|Measuring cups come in <b>1/4, 1/3, 1/2</b> and 1 cup sizes. A recipe may ask for 3/4 cup, which is three 1/4-cup scoops.",
    "Counting scoops|🥄|How many 1/4-cup scoops make 2 cups? Each cup has 4 quarters, so 2 x 4 = <b>8 scoops</b>.",
    "Tip|💡|The bottom number of the fraction tells how many equal scoops fill one cup."
  ], () => {
    const t = ri(0, 2), f = pick([2, 3, 4]), nm = { 2: "1/2", 3: "1/3", 4: "1/4" }[f];
    if (t === 0) { const n = ri(2, 5); return Q(`How many ${nm}-cup scoops fill ${n} cups?`, n * f, "🥛", `One whole cup holds a certain number of ${nm}-cup scoops. Find that number first.`, `The bottom number of ${nm} tells how many scoops fill one cup. Multiply by the number of cups.`, "How many 1/3-cup scoops fill 2 cups? Each cup takes 3 scoops. 2 x 3 = 6 scoops."); }
    if (t === 1) { const k = ri(2, f === 2 ? 3 : f); const kk = Math.min(k, f - 1); const k2 = f === 2 ? 1 : kk; return Q(`A recipe needs ${k2}/${f} cup of flour. Your scoop is 1/${f} cup. How many scoops do you need?`, k2, "🥣", "Look at the top number of the fraction. It counts the pieces.", "The top number tells how many scoops of that size you need.", "A recipe needs 2/3 cup and you have a 1/3 scoop. You need 2 scoops."); }
    const m = ri(2, 4); return Q(`You add 1/${f} cup of milk ${m * f} times. How many whole cups of milk is that?`, m, "🥛", `A group of the fractions makes a whole cup when you have enough of them.`, `Divide the number of times by ${f}, because ${f} of them make one cup.`, "You add 1/2 cup of water 6 times. 6 ÷ 2 = 3 cups.");
  }));
  b.push(L("Temperature scales", [
    "Two scales|🌡️|In the United States we often use <b>Fahrenheit (°F)</b>. Most of the world uses <b>Celsius (°C)</b>. Recipes may use either.",
    "Key numbers|❄️|Water freezes at <b>32°F (0°C)</b> and boils at <b>212°F (100°C)</b>. A fridge is about 40°F (4°C). Normal body temperature is about 98.6°F (37°C).",
    "Ovens|🔥|A common baking temperature is 350°F, which is about 175°C. Use an oven thermometer or the oven's setting carefully with a grown-up."
  ], [
    "At what temperature does water freeze on the Celsius scale?|0°C|❄️|It is the lowest whole number on the scale after negatives.|32°C,100°C",
    "At what temperature does water freeze on the Fahrenheit scale?|32°F|🧊||0°F,100°F",
    "At what temperature does water boil on the Fahrenheit scale?|212°F|♨️||100°F,150°F",
    "At what temperature does water boil on the Celsius scale?|100°C|🫕||212°C,0°C",
    "About what is a normal body temperature in Fahrenheit?|98.6°F|🌡️||68.6°F,120°F",
    "Which scale do most countries use?|Celsius|🌍||Fahrenheit,Kelvin",
    "About what Celsius number is 350°F?|175°C|🔥||75°C,350°C",
    "Which is colder?|0°C|🥶||50°F,40°F"
  ], "Remember the freezing and boiling numbers."));
  b.push(G("Temperature gaps", [
    "Compare temperatures|🌡️|Subtract to find <b>how many degrees</b> you still need to go up or come down.",
    "Cooking goals|🍗|Chicken is safe at 165°F. If the thermometer shows 140°F, you need 165 - 140 = <b>25 more degrees</b>.",
    "Cooling|❄️|Leftovers must drop to 40°F. If they are 70°F, they must cool 70 - 40 = <b>30 degrees</b>."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const cur = ri(100, 150), goal = 165; return Q(`The safe temperature for chicken is 165°F. The thermometer shows ${cur}°F. How many more degrees does it need?`, goal - cur, "🍗", "Find how far the thermometer is from the goal.", "Subtract the thermometer number from the goal number.", "Goal 165°F, thermometer 130°F. 165 - 130 = 35 degrees."); }
    if (t === 1) { const cur = ri(2, 9) * 25, goal = cur + ri(2, 8) * 25; return Q(`The oven is at ${cur}°F. The recipe says to bake at ${goal}°F. How many degrees must the oven heat up?`, goal - cur, "🔥", "The oven must go up. Find the gap between the two numbers.", "Subtract the smaller temperature from the bigger one.", "Oven at 200°F, recipe says 350°F. 350 - 200 = 150 degrees."); }
    const cur = ri(60, 120); return Q(`Soup is ${cur}°F. It must cool to 40°F to go in the fridge. How many degrees must it drop?`, cur - 40, "🍲", "The soup has to get colder. Find how far from the goal it is.", "Subtract the fridge temperature from the soup temperature.", "Soup at 90°F needs to reach 40°F. 90 - 40 = 50 degrees.");
  }));
  b.push(L("Portion sizes", [
    "Serving or portion?|🍽️|A <b>serving</b> is a standard amount listed on a label. A <b>portion</b> is how much you actually choose to eat.",
    "Hand guide|✋|A <b>fist</b> is about 1 cup of fruit or vegetables. A <b>palm</b> (or a deck of cards) is about 3 ounces of meat. The tip of your <b>thumb</b> is about 1 tablespoon.",
    "Plate sense|🥗|Restaurants often give big portions. It's fine to share or save half for later."
  ], [
    "About how much is a fist?|1 cup|✊|It is a cup-sized amount.|1 teaspoon,1 gallon",
    "About how much meat is the size of your palm?|3 ounces|🖐️||1 pound,1 pinch",
    "What is about 1 tablespoon?|the tip of your thumb|👍||your whole hand,your head",
    "What is a portion?|the amount you choose to eat|🍽️||the amount on a label,a price",
    "What is a serving?|a standard amount on a label|📋||the amount you choose,a kind of plate",
    "What can you do with a very big restaurant meal?|share it or save half|🥡||eat it all every time,throw it away",
    "A deck of cards is about the size of how much meat?|3 ounces|🃏||1 pound,10 ounces",
    "Which hand part helps you judge a cup of vegetables?|a fist|🥦||a pinky,an elbow"
  ], "Use your hand as a measuring tool."));
  b.push(L("Percent Daily Value", [
    "What is %DV?|📊|The <b>%DV</b> on a Nutrition Facts label tells how much of a nutrient one serving gives compared with a full day's need.",
    "The 5-20 rule|📏|<b>5% DV or less</b> is LOW. <b>20% DV or more</b> is HIGH.",
    "Choose wisely|✅|Aim for LOW %DV in saturated fat, sodium (salt) and added sugars. Aim for HIGH %DV in fiber, vitamin D, calcium, iron and potassium."
  ], [
    "What percent DV or more counts as HIGH?|20%|📊|The number is bigger than 15.|5%,10%",
    "What percent DV or less counts as LOW?|5%|📉||20%,50%",
    "Do you want LOW or HIGH sodium (salt)?|low|🧂||high,none at all",
    "Do you want LOW or HIGH fiber?|high|🌾||low,none",
    "Which nutrient should be LOW?|added sugars|🍬||calcium,fiber",
    "Which nutrient should be HIGH?|calcium|🥛||added sugars,sodium",
    "A food has 25% DV of iron. Is that high or low?|high|🍽️||low,zero",
    "A food has 3% DV of saturated fat. Is that high or low?|low|🧈||high,medium"
  ], "5% is low, 20% is high."));
  b.push(L("Whole and processed foods", [
    "Whole foods|🍎|<b>Whole foods</b> are close to how they grow: fruits, vegetables, plain nuts, eggs, plain grains. They have few or no added ingredients.",
    "Processed foods|🥫|Foods can be changed a little (frozen peas, canned beans, plain yogurt) or a lot (candy, chips, soda). <b>Ultra-processed</b> foods often have lots of added sugar, salt or fat.",
    "Read to choose|🔍|Short ingredient lists with words you know are usually a good sign. Mostly eat whole and lightly processed foods."
  ], [
    "Which is a whole food?|an apple|🍎|It grows on a tree.|a candy bar,a bag of chips",
    "Which is more processed?|potato chips|🍟||a baked potato,a raw potato",
    "Which is lightly processed?|frozen peas|🫛||soda,candy",
    "What can ultra-processed foods contain a lot of?|added sugar, salt or fat|🧂||fresh water,whole fruits",
    "What is a good sign on an ingredient list?|few ingredients you know|📋||a very long list,words you cannot say",
    "Which is the best choice most days?|whole and lightly processed foods|🥕||only candy,only soda",
    "Which food is closest to how it grows?|carrot|🥕||cookie,fruit snack",
    "Which is lightly processed?|canned beans|🥫||soda,fried snack bars"
  ], "The closer to nature, the more whole."));
  b.push(L("Packing a safe lunch", [
    "Keep it cold|🧊|Pack cold foods with an <b>ice pack</b> in an insulated lunch bag. Cold food should stay at <b>40°F or colder</b>.",
    "Keep it hot|♨️|Pack hot foods in a <b>thermos</b> that has been warmed first. Hot food should stay at <b>140°F or hotter</b>.",
    "Danger zone|⚠️|Between 40°F and 140°F, germs grow fast. Wash your hands, and throw away uneaten perishable food."
  ], [
    "What keeps a lunch cold?|an ice pack|🧊|Put it next to the food in the bag.|a heater,a pillow",
    "What keeps hot soup hot in a lunch?|a thermos|🥣||a paper bag,a plain plastic bag",
    "What is the 'danger zone' for food?|between 40°F and 140°F|⚠️||below 0°F,above 300°F",
    "What temperature should cold food stay at?|40°F or colder|🥪||70°F,90°F",
    "What temperature should hot food stay at?|140°F or hotter|🍲||100°F,60°F",
    "What should you do before you eat your lunch?|wash your hands|🧼||skip it,sneeze on it",
    "What type of bag keeps lunch cooler?|an insulated bag|🎒||a mesh bag,a sunny window",
    "What should you do with uneaten perishable food?|throw it away|🗑️||keep it in your bag for days,give it to a stranger"
  ], "Keep hot foods hot and cold foods cold."));
  b.push(L("Preserving food", [
    "Why preserve?|🥫|Preserving stops germs and molds from spoiling food, so it lasts longer.",
    "Ways|🧂|<b>Freezing</b> makes it too cold for germs to grow. <b>Canning</b> heats food in sealed jars. <b>Drying</b> removes water (raisins, jerky). <b>Pickling</b> uses vinegar or salt water. <b>Fermenting</b> uses friendly microbes (sauerkraut).",
    "Jam|🍓|Jam uses lots of sugar and heat to keep fruit for months. Always follow tested directions with a grown-up when canning."
  ], [
    "Which method removes water from food?|drying|🍇|Raisins are made this way.|freezing,pickling",
    "Which method makes food too cold for germs to grow?|freezing|❄️||canning,drying",
    "Which method uses vinegar or salty water?|pickling|🥒||drying,freezing",
    "Which method heats food in sealed jars?|canning|🫙||drying,fermenting",
    "What is a dried grape called?|raisin|🍇||prune,currant jelly",
    "Why do we preserve food?|so it lasts longer|📅||so it spoils faster,to make it taste worse",
    "Which method uses friendly microbes?|fermenting|🥬||freezing,drying",
    "Who should help when you can foods?|a grown-up|🧑‍🍳||nobody,a stranger"
  ], "Preserving means making food last."));
  b.push(L("Mixtures in the kitchen", [
    "Mixing things|🥗|Some mixtures stay mixed and some separate. Oil and vinegar do not blend, so salad dressing separates unless you shake it.",
    "Emulsions|🥚|An <b>emulsifier</b> helps oil and water stay mixed. Egg yolk is an emulsifier in mayonnaise.",
    "Dissolving|🧂|Sugar and salt <b>dissolve</b> in water and make a solution. Flour in water does not dissolve; it settles to the bottom unless you stir."
  ], [
    "What helps oil and vinegar stay mixed?|an emulsifier|🥗|Egg yolk is one.|more oil,a spoon of flour",
    "Which food uses egg yolk as an emulsifier?|mayonnaise|🥚||lemonade,toast",
    "What happens to oil and vinegar if you stop shaking?|they separate|🫙||they turn solid,they vanish",
    "What does sugar do in warm water?|dissolves|🍬||sinks as a lump,floats forever",
    "What do we call sugar mixed evenly in water?|a solution|🧪||a pie,a crumb",
    "What does flour do if stirred in water then left?|settles to the bottom|🌾||dissolves fully,turns to oil",
    "How can you mix salad dressing again?|shake it|🥣||freeze it,boil it",
    "What does 'dissolve' mean?|spreads evenly into a liquid|💧||turns to ice,burns"
  ], "Does it stay mixed or separate?"));
  b.push(L("All about eggs", [
    "Egg basics|🥚|Eggs are a <b>protein</b> food. Keep them in the refrigerator. Check the date on the carton.",
    "Cooking eggs|🍳|Heat makes egg whites and yolks <b>set</b> (turn firm). Hard-boiled eggs take about 10 to 12 minutes in hot water. Cook eggs until the white and yolk are firm for safety.",
    "Safety|🧼|Raw eggs can carry germs like <b>Salmonella</b>. Wash your hands, tools and counters after touching raw egg."
  ], [
    "What food group are eggs in?|protein|🥚|Eggs help build muscles.|dairy,grains",
    "Where should you keep eggs?|in the refrigerator|🧊||on a sunny shelf,in a hot car",
    "What does heat do to egg whites?|makes them set firm|🍳||makes them disappear,turns them blue",
    "About how long does a hard-boiled egg take?|10 to 12 minutes|⏲️||1 minute,2 hours",
    "What germ can be in raw eggs?|Salmonella|🦠||vitamin C,calcium",
    "What should you do after touching raw egg?|wash your hands|🧼||wipe on your shirt,nothing",
    "How should egg whites and yolks be for safe eating?|cooked until firm|🍳||completely raw,runny and cold",
    "What does the date on the carton help you know?|how fresh the eggs are|📅||the color of the shell,the egg's name"
  ], "Eggs need care."));
  b.push(G("Rice and water", [
    "Ratios|🍚|A <b>ratio</b> compares amounts. Many rice recipes use 1 cup of rice to 2 cups of water. A ratio helps you make more or less.",
    "Rice grows|📈|Cooked rice has about <b>3 times</b> the volume of dry rice. 2 cups dry becomes about 6 cups cooked.",
    "Scale it|✖️|For 3 cups of rice, use 3 x 2 = <b>6 cups</b> of water."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const r = ri(2, 6); return Q(`A recipe says to use 2 cups of water for every 1 cup of rice. You use ${r} cups of rice. How many cups of water?`, 2 * r, "🍚", "Each cup of rice needs the same amount of water.", "Multiply your cups of rice by the water in the recipe for one cup.", "Use 3 cups of rice. 3 x 2 = 6 cups of water."); }
    if (t === 1) { const r = ri(2, 5); return Q(`The package says 1 cup of dry rice makes about 3 cups cooked. How many cups cooked from ${r} cups dry?`, 3 * r, "🍚", "Cooked rice takes up more space than dry rice.", "Multiply the dry cups by the same number the package uses.", "2 cups dry makes 2 x 3 = 6 cups cooked."); }
    const w = ri(2, 6) * 2; return Q(`You used ${w} cups of water. The recipe uses 2 cups of water for each 1 cup of oats or rice. How many cups of grain did you use?`, w / 2, "🥣", "You know the water. Work backward to find the grain.", "Divide the water by the water used per cup of grain.", "8 cups of water at 2 cups per cup of rice is 8 ÷ 2 = 4 cups of rice.");
  }));
  b.push(G("Making change", [
    "Change back|💵|When you pay with more money than the cost, you get <b>change</b> back.",
    "Subtract|➖|Change = money paid - cost. Paid $20 for $13 groceries: 20 - 13 = <b>$7 change</b>.",
    "Count up|⬆️|You can also count up from the cost to the money you paid."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const c = ri(3, 18); return Q(`You pay with a $20 bill for groceries that cost $${c}. How many dollars of change do you get?`, 20 - c, "💵", "Change is what is left after paying the cost.", "Subtract the cost from the money you paid.", "Pay $20 for $12. 20 - 12 = $8 change."); }
    if (t === 1) { const a1 = ri(2, 4), a2 = ri(2, 4); return Q(`Milk costs $${a1} and bread costs $${a2}. You pay with a $10 bill. How many dollars of change?`, 10 - a1 - a2, "🥛", "First find the total cost of both items.", "Add the two prices, then subtract the total from what you paid.", "Eggs $3 and rice $4 paid with $10. 3 + 4 = 7. 10 - 7 = $3 change."); }
    const c = ri(11, 45); return Q(`Your meal costs $${c}. You pay with $50. How many dollars of change do you get?`, 50 - c, "🧾", "Change is the extra money you gave.", "Subtract the cost from what you paid.", "Pay $50 for $32. 50 - 32 = $18 change.");
  }));
  b.push(G("Coupons and deals", [
    "Deals|🏷️|Coupons and sales lower the cost. Always do the math to see if a deal really helps.",
    "Buy 2 get 1 free|🎁|If cereal is $4 and the deal is buy 2 get 1 free, you pay for 2 and get 3 boxes: 2 x $4 = <b>$8</b>.",
    "Compare|⚖️|Store brand is often cheaper than name brand and may be just as good. Multiply the savings by the number you buy."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const p = ri(2, 7); return Q(`Cereal costs $${p} a box. The deal is buy 2 get 1 free. You get 3 boxes. How many dollars do you pay?`, 2 * p, "🥣", "One box is free, so you only pay for some of them.", "You pay for two boxes. Multiply the price by two.", "Soup is $3 with buy 2 get 1 free. You pay 2 x 3 = $6 for 3 cans."); }
    if (t === 1) { const p = ri(8, 20), d = ri(1, 4); return Q(`A box of snacks costs $${p}. You have a $${d} coupon. How many dollars do you pay?`, p - d, "✂️", "A coupon saves you money, so the price gets smaller.", "Subtract the coupon amount from the price.", "A $12 box with a $2 coupon costs 12 - 2 = $10."); }
    const n = ri(2, 5), s = ri(1, 3); return Q(`Store-brand pasta costs $${s} less than name-brand pasta per box. You buy ${n} boxes. How many dollars do you save?`, n * s, "🍝", "You save the same amount on each box.", "Multiply the savings per box by the number of boxes.", "Save $2 a box on 4 boxes. 2 x 4 = $8 saved.");
  }));
  b.push(L("Seams and hems", [
    "Seams|🧵|A <b>seam</b> joins two pieces of fabric. The <b>seam allowance</b> is the extra fabric between the stitching and the edge. Put the pieces <b>right sides together</b> and pin.",
    "Hems|👖|A <b>hem</b> is a folded and sewn edge at the bottom of clothes. It stops the edge from <b>fraying</b> (coming apart in threads).",
    "Finishing|✂️|Backstitch at the start and end to lock the stitches. <b>Press</b> seams flat with an iron (with a grown-up). Trim loose threads."
  ], [
    "What is the extra fabric beyond the stitching line called?|seam allowance|✂️|Starts with the word for a line of stitching.|hem,bobbin",
    "What is a folded and sewn bottom edge called?|hem|👖||seam,pleat",
    "What does fraying mean?|threads coming loose at an edge|🧵||fabric growing,fabric glowing",
    "How do you place fabric pieces to sew a seam?|right sides together|🪡||wrong sides apart,upside down",
    "What do you use to hold pieces in place before sewing?|pins|📌||glue sticks,tape",
    "Why backstitch at the start and end?|to lock the stitches|🔒||to make them longer,to hide the needle",
    "Who should use the iron?|you with a grown-up|♨️||nobody ever,a toddler",
    "What can finish a raw edge so it frays less?|zigzag stitching|〰️||more water,a tight belt"
  ], "A seam joins, a hem finishes."));
  b.push(G("Fabric yardage", [
    "Yards|📏|Fabric is sold by the <b>yard</b>. <b>1 yard = 3 feet = 36 inches</b>.",
    "Convert|✖️|2 yards is 2 x 36 = 72 inches. 72 inches ÷ 36 = 2 yards.",
    "Cutting|✂️|To find how many pieces you can cut, divide the length of the fabric by the length of one piece."
  ], () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 6); return Q(`How many inches are in ${n} yards of fabric?`, 36 * n, "📏", "A yard is much longer than an inch. Will you multiply or divide?", "Multiply the yards by the number of inches in one yard.", "How many inches in 2 yards? 2 x 36 = 72 inches."); }
    if (t === 1) { const n = ri(2, 8); return Q(`How many feet are in ${n} yards of fabric?`, 3 * n, "📏", "A yard is a few feet long.", "Multiply the yards by the number of feet in one yard.", "How many feet in 4 yards? 4 x 3 = 12 feet."); }
    if (t === 2) { const y = ri(2, 4), p = pick([6, 9, 12, 18]); return Q(`You have ${y} yards of fabric. Each pillow cover needs ${p} inches of it. How many covers can you cut?`, y * 36 / p, "🛋️", "First change the yards into inches so the units match.", "Divide the total inches by the inches needed for one cover.", "1 yard is 36 inches. 36 inches ÷ 12 inches = 3 pieces."); }
    const y = ri(2, 4), n = pick([4, 6, 9]); return Q(`A piece of fabric ${y} yards long is cut into ${n} equal strips. How many inches long is each strip?`, y * 36 / n, "✂️", "Change yards into inches first.", "Divide the total inches by the number of strips.", "1 yard (36 inches) cut into 4 strips is 36 ÷ 4 = 9 inches each.");
  }));
  b.push(L("Laundry science", [
    "Water temperature|🧺|<b>Hot water</b> cleans oily dirt best but can shrink or fade clothes. <b>Cold water</b> saves energy and protects colors.",
    "Detergent and loads|🧴|Use the amount on the detergent cap. Too much leaves soap behind. Don't overload the machine, or clothes won't get clean.",
    "Drying|🌬️|Hot dryers can shrink clothes. Use low heat for delicate things. Clean the <b>lint trap</b> every time for fire safety."
  ], [
    "Which water saves the most energy?|cold water|🥶|Think of not needing to heat it.|hot water,boiling water",
    "What can hot water do to some clothes?|shrink or fade them|🔥||make them bigger forever,make them dry",
    "What should you clean from the dryer after each load?|the lint trap|🧹||the door light,the clock",
    "Why not overload the washer?|clothes won't get clean|🧺||it plays music,it makes them dry faster",
    "How much detergent should you use?|the amount on the cap or label|🧴||the whole bottle,none",
    "Why use low heat for delicate clothes?|to protect the fabric|🌬️||to burn them,to make noise",
    "What does too much detergent leave behind?|soap|🫧||sand,sugar",
    "Where does the amount of detergent come from?|the detergent's instructions|📋||a guess,a TV show"
  ], "Water, soap and heat all matter."));
  b.push(L("Kitchen first aid", [
    "Minor burns|💧|Cool a small burn under <b>cool running water</b> for several minutes. Don't use ice or butter. Tell a grown-up right away.",
    "Small cuts|🩹|Wash your hands. Press a clean cloth on the cut to stop the bleeding. Clean it and cover it with a bandage. Tell a grown-up.",
    "Fire|🔥|If grease catches fire, never use water. Slide a lid on the pan and turn off the heat if it is safe. Get a grown-up and call 911 for a big fire."
  ], [
    "What should you put on a small burn first?|cool running water|💧|Think of a gentle stream from the tap.|ice,butter",
    "What should you NOT put on a burn?|butter|🧈||cool water,a clean cloth",
    "What do you press on a cut to stop bleeding?|a clean cloth|🩹||dirt,sugar",
    "What do you cover a small clean cut with?|a bandage|🩹||a leaf,a sock",
    "What should you do first after you get hurt?|tell a grown-up|🧑||hide it,ignore it",
    "What do you NEVER use to put out a grease fire?|water|🚫||a lid on the pan,turning off the heat",
    "What can smother a small pan fire?|a lid|🍳||a wet towel,a spoon",
    "Which number do you call for a big fire?|911|📞||411,123"
  ], "Stay calm and tell a grown-up."));
  b.push(G("Grocery budget", [
    "A budget|💰|A <b>budget</b> is a plan for how much money you can spend. Add up what you pick and subtract it from the budget.",
    "Left over|➖|Budget $50. You spend $18 and then $12. Spent = 30. Left = 50 - 30 = <b>$20</b>.",
    "Weekly meals|🗓️|A meal plan's cost = cost per meal x number of meals."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const bd = ri(40, 80), s1 = ri(8, 20), s2 = ri(8, 20); return Q(`Your grocery budget is $${bd}. You spend $${s1} on vegetables and $${s2} on meat. How many dollars are left?`, bd - s1 - s2, "🛒", "First find how much you spent in all.", "Add the two amounts you spent, then subtract from the budget.", "Budget $60, spend $15 and $20. 15 + 20 = 35. 60 - 35 = $25 left."); }
    if (t === 1) { const n = ri(4, 7), c = ri(3, 12); return Q(`Dinner costs $${c} each night. How many dollars do ${n} dinners cost?`, n * c, "🍽️", "The same cost repeats for each night.", "Multiply the cost per dinner by the number of dinners.", "Lunch costs $4 for 5 days. 4 x 5 = $20."); }
    const bd = ri(3, 9) * 10, w = ri(2, 4); return Q(`A family has $${bd * w} to spend over ${w} weeks. They want to spend the same each week. How many dollars per week?`, bd, "🗓️", "Share the money equally across the weeks.", "Divide the total money by the number of weeks.", "$120 over 4 weeks is 120 ÷ 4 = $30 a week.");
  }));
  b.push(MIX("Mixed practice", [b[0], b[3], b[4], b[6], b[8], b[10], b[13], b[15]]));
  b.push(MIX("Level 11 Challenge", [b[1], b[2], b[5], b[7], b[9], b[11], b[12], b[14], b[16], b[17]]));

  // ================= LEVEL 12 =================
  const c = [];
  c.push(G("Bigger kitchen measures", [
    "Cups everywhere|🥛|<b>1 cup = 8 fluid ounces</b>. <b>1 pint = 2 cups</b>. <b>1 quart = 4 cups</b>. <b>1 gallon = 4 quarts = 16 cups</b>.",
    "Multiply|✖️|3 quarts is 3 x 4 = <b>12 cups</b>. A gallon is 4 x 4 = 16 cups.",
    "Divide|➗|24 fluid ounces is 24 ÷ 8 = <b>3 cups</b>."
  ], () => {
    const t = ri(0, 3);
    if (t === 0) { const n = ri(2, 6); return Q(`How many cups are in ${n} quarts?`, 4 * n, "🥛", "A quart is bigger than a cup. Will you multiply or divide?", "Multiply the quarts by the number of cups in one quart.", "How many cups in 3 quarts? 3 x 4 = 12 cups."); }
    if (t === 1) { const n = ri(2, 5); return Q(`How many cups are in ${n} gallons?`, 16 * n, "🛢️", "A gallon holds 4 quarts and each quart holds some cups.", "Each gallon holds the same number of cups. Multiply.", "How many cups in 2 gallons? 2 x 16 = 32 cups."); }
    if (t === 2) { const n = ri(2, 9); return Q(`How many fluid ounces are in ${n} cups?`, 8 * n, "🥤", "A cup holds a certain number of fluid ounces. Multiply by your cups.", "Multiply the cups by the ounces in one cup.", "How many fluid ounces in 4 cups? 4 x 8 = 32."); }
    const n = ri(2, 6); return Q(`How many pints are in ${4 * n} cups?`, 2 * n, "🥛", "A pint is bigger than a cup, so there will be fewer pints.", "Divide the cups by the number of cups in a pint.", "How many pints in 12 cups? 12 ÷ 2 = 6 pints.");
  }));
  c.push(G("Metric measuring", [
    "Metric units|📏|Most of the world cooks with metric units. <b>1 liter (L) = 1000 milliliters (mL)</b>. <b>1 kilogram (kg) = 1000 grams (g)</b>.",
    "Going smaller|✖️|2 L is 2 x 1000 = <b>2000 mL</b>. 3 kg is <b>3000 g</b>.",
    "Going bigger|➗|4000 g is 4000 ÷ 1000 = <b>4 kg</b>."
  ], () => {
    const t = ri(0, 3), n = ri(2, 9);
    if (t === 0) return Q(`How many milliliters are in ${n} liters?`, n * 1000, "🧪", "Milliliters are tiny compared with liters, so the number gets bigger.", "Multiply the liters by the number of milliliters in one liter.", "How many mL in 3 L? 3 x 1000 = 3000 mL.");
    if (t === 1) return Q(`How many grams are in ${n} kilograms?`, n * 1000, "⚖️", "Grams are small compared with kilograms, so the number gets bigger.", "Multiply by the number of grams in one kilogram.", "How many g in 2 kg? 2 x 1000 = 2000 g.");
    if (t === 2) return Q(`How many liters are in ${n * 1000} milliliters?`, n, "🧪", "Liters are big compared with milliliters, so the number gets smaller.", "Divide by the number of milliliters in one liter.", "How many L in 5000 mL? 5000 ÷ 1000 = 5 L.");
    return Q(`How many kilograms are in ${n * 1000} grams?`, n, "⚖️", "Kilograms are big compared with grams, so the number gets smaller.", "Divide by the number of grams in one kilogram.", "How many kg in 6000 g? 6000 ÷ 1000 = 6 kg.");
  }));
  c.push(G("Scaling to any size", [
    "Find the multiplier|🔍|New servings ÷ old servings = the <b>multiplier</b>. Multiply every ingredient by it.",
    "Example|✏️|A recipe for 4 uses 6 cups of broth. For 6 people the multiplier is 6 ÷ 4 = 1.5. Broth: 6 x 1.5 = <b>9 cups</b>.",
    "Another way|💡|Find the amount for ONE serving first (6 ÷ 4 = 1.5 cups), then multiply by the number of servings."
  ], () => {
    let S, N, A, ans;
    do { S = pick([2, 4, 6, 8]); N = pick([2, 3, 4, 5, 6, 8, 10, 12]); A = ri(2, 12); ans = A * N / S; } while (N === S || ans !== Math.floor(ans));
    const f = pick(["cups of broth", "tablespoons of oil", "ounces of cheese", "cloves of garlic", "cups of beans"]);
    return Q(`A recipe for ${S} servings uses ${A} ${f}. You want to make it for ${N} servings. How many ${f.split(" ").slice(0, f.startsWith("cloves") ? 1 : 1)[0]} of the ingredient do you need?`.replace(/How many .* of the ingredient/, "How many " + f.split(" ")[0]), ans, "🍲",
      "Ask whether you are making the recipe bigger or smaller.", `Find the amount for ONE serving by dividing by ${S}, then multiply by the servings you want.`,
      "A recipe for 4 uses 8 cups. For 6: 8 ÷ 4 = 2 cups each, 2 x 6 = 12 cups.");
  }));
  c.push(L("Energy in, energy out", [
    "Calories|⚡|A <b>calorie</b> is a unit of energy. Food gives your body energy to move, grow and think.",
    "Energy per gram|⚖️|<b>Carbohydrates</b> give 4 calories per gram. <b>Protein</b> gives 4 calories per gram. <b>Fat</b> gives 9 calories per gram.",
    "Balance|🏃|Active bodies need more energy. Growing kids need plenty of healthy food. Water has no calories."
  ], [
    "What is a calorie?|a unit of energy|⚡|Food gives your body this.|a kind of vitamin,a weight of water",
    "Which nutrient has the most calories per gram?|fat|🧈||protein,carbohydrates",
    "How many calories per gram does protein give?|4|🥩||9,0",
    "How many calories per gram does fat give?|9|🧈||4,2",
    "How many calories per gram do carbohydrates give?|4|🍞||9,1",
    "Does water have calories?|no|💧||yes a lot,yes 9 per gram",
    "Who needs more energy from food?|someone very active|🏃||someone asleep all day,nobody",
    "What is the energy from food used for?|moving, growing and thinking|🧠||only for sleeping,nothing"
  ], "Calories are energy."));
  c.push(L("Mindful eating", [
    "Slow down|🐢|Eat slowly and enjoy the taste. Your body needs about 20 minutes to feel full.",
    "Listen|👂|Notice when you are <b>hungry</b> and when you are <b>full</b>. Stop eating when you are comfortably full.",
    "Good habits|🍽️|Sit at a table without screens, eat breakfast, drink water, and try new foods. Eating with family is fun."
  ], [
    "How long does your body need to feel full?|about 20 minutes|⏳|It's about a third of an hour.|about 2 seconds,about 5 hours",
    "How should you eat to notice you are full?|slowly|🐢||as fast as you can,while running",
    "When should you stop eating?|when comfortably full|✋||when the plate is empty no matter what,never",
    "What is a good drink with meals?|water|💧||only soda,only juice",
    "What is good to avoid at the table?|screens|📵||family,napkins",
    "What does 'mindful eating' mean?|paying attention to your food and body|🧘||eating while distracted,skipping meals",
    "Which meal gives energy for the morning?|breakfast|🥣||midnight snack,none",
    "What can you try to expand your tastes?|new foods|🥦||only your favorite,nothing"
  ], "Pay attention to your food and body."));
  c.push(G("Calories from grams", [
    "Calories in a nutrient|🧮|Carbohydrate and protein have <b>4</b> calories per gram. Fat has <b>9</b> calories per gram.",
    "Multiply|✖️|10 grams of fat is 10 x 9 = <b>90 calories</b>. 25 grams of carbohydrate is 25 x 4 = <b>100 calories</b>.",
    "Tip|💡|Fat packs more than twice the energy of the same weight of carbs or protein."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const g = ri(2, 15); return Q(`A snack has ${g} grams of fat. Fat has 9 calories per gram. How many calories come from fat?`, 9 * g, "🧈", "Each gram of fat gives the same number of calories.", "Multiply the grams by the calories in one gram.", "4 grams of fat x 9 = 36 calories."); }
    if (t === 1) { const g = ri(5, 30); return Q(`A bowl of cereal has ${g} grams of carbohydrate. Carbohydrate has 4 calories per gram. How many calories?`, 4 * g, "🥣", "Each gram of carbohydrate gives the same number of calories.", "Multiply the grams by the calories in one gram.", "10 grams of carbohydrate x 4 = 40 calories."); }
    const g = ri(3, 20); return Q(`A chicken meal has ${g} grams of protein. Protein has 4 calories per gram. How many calories?`, 4 * g, "🍗", "Each gram of protein gives the same number of calories.", "Multiply the grams by the calories in one gram.", "15 grams of protein x 4 = 60 calories.");
  }));
  c.push(L("Foodborne illness", [
    "Germs on food|🦠|Some germs (like <b>Salmonella</b> in raw poultry and eggs, and <b>E. coli</b> in some undercooked beef) can make you sick. This is called foodborne illness.",
    "Signs|🤒|Signs can include an upset stomach, vomiting and fever. Tell a grown-up if you feel sick after eating.",
    "Four steps|✅|<b>Clean</b> (wash hands and surfaces). <b>Separate</b> (keep raw meat apart). <b>Cook</b> (to safe temperatures). <b>Chill</b> (refrigerate quickly)."
  ], [
    "What are the four steps to food safety?|clean, separate, cook, chill|✅|Each step is one word.|scrub and rinse only,wait and see",
    "Which germ can be in raw poultry and eggs?|Salmonella|🍗||calcium,fiber",
    "What does 'separate' mean in food safety?|keep raw meat apart from other foods|🥩||mix everything,put it all in one bag",
    "What does 'chill' mean in food safety?|refrigerate food quickly|🧊||leave it out,heat it again",
    "What should you do if you feel sick after eating?|tell a grown-up|🤒||keep it a secret,eat more",
    "What does 'clean' mean in food safety?|wash hands and surfaces|🧼||skip washing,only wipe your shirt",
    "What does 'cook' mean in food safety?|heat food to a safe temperature|🌡️||eat it raw,warm it a little",
    "What is it called when food germs make you sick?|foodborne illness|🦠||sunburn,a snack"
  ], "Clean, separate, cook, chill."));
  c.push(L("Appliance safety", [
    "Microwave|📡|Use only <b>microwave-safe</b> dishes. Never put metal or foil inside. Hot steam can burn, so open lids away from your face.",
    "Other appliances|🔌|Keep cords away from water and hot burners. Unplug a toaster or blender before cleaning. Never put a fork into a toaster. Keep the blender lid on.",
    "Hot stuff|🧤|Use dry oven mitts. Wet mitts let heat through. Turn pot handles inward so no one bumps them."
  ], [
    "What must NEVER go in a microwave?|metal or foil|🚫|Think of sparks.|a microwave-safe bowl,a paper towel",
    "What kind of dishes can go in a microwave?|microwave-safe|📡||any metal pan,anything with gold trim",
    "What should you do before cleaning a blender base?|unplug it|🔌||keep it on,dip it in water",
    "Why open a hot lid away from your face?|steam can burn you|♨️||it smells bad,it makes noise",
    "What is wrong with wet oven mitts?|they let heat through|🧤||they smell,they are too soft",
    "Where should pot handles point?|inward|🍳||outward over the room,toward the door",
    "What must you never put in a toaster?|a fork|🍞||bread,a bagel",
    "What should stay on the blender while it runs?|the lid|🥤||your hand,a spoon"
  ], "Appliances need care."));
  c.push(L("Plant proteins", [
    "Protein from plants|🌱|Plants can give protein too: <b>beans, lentils, chickpeas, tofu</b> (made from soybeans), nuts, seeds and peanut butter.",
    "Vegetarian meals|🥗|People who do not eat meat can get protein from plants, eggs and dairy. A mix of foods through the day works well.",
    "Safety|⚠️|Some people have <b>nut allergies</b>. Check labels and ask before sharing foods with nuts."
  ], [
    "Which food is made from soybeans?|tofu|🟨|Think of white blocks.|chicken,cheese",
    "Which is a plant protein?|lentils|🫘||butter,salt",
    "Which of these is a legume?|chickpeas|🫘||rice,lettuce",
    "What should you check before sharing food with nuts?|allergies|⚠️||the weather,the color",
    "Which spread comes from peanuts?|peanut butter|🥜||jam,honey",
    "What kind of meals skip meat?|vegetarian|🥗||carnivore,seafood",
    "Which gives protein?|beans|🫘||lemonade,ice",
    "What can people with a nut allergy get from nuts?|a serious reaction|🥜||extra energy,a stronger voice"
  ], "Beans, nuts and tofu are proteins."));
  c.push(L("Food traditions", [
    "Food and family|🏮|Many families have special foods for holidays and gatherings. Recipes are often passed down from grandparents to children.",
    "Around the world|🌍|Dumplings are common at Lunar New Year. Sweets are shared at Diwali. Latkes (potato pancakes) are eaten at Hanukkah. Families in the United States often enjoy turkey at Thanksgiving.",
    "Sharing|🤝|A <b>potluck</b> is a meal where each guest brings a dish to share. Always be respectful and curious about other people's foods."
  ], [
    "What is a potluck?|each guest brings a dish to share|🍲|Everyone adds something.|a very hot soup,a restaurant bill",
    "Which food is common at Lunar New Year?|dumplings|🥟||turkey,candy canes",
    "What is shared at Diwali?|sweets|🪔||snowballs,only soup",
    "What are latkes?|potato pancakes|🥔||cookies,soup",
    "Which food do many US families enjoy at Thanksgiving?|turkey|🦃||sushi,tacos",
    "How should you act about other people's foods?|be respectful and curious|🙂||make fun of them,refuse to look",
    "Where do many family recipes come from?|grandparents and relatives|👵||a vending machine,a store sign",
    "Why do families share special foods?|to celebrate together|🎉||to be alone,to save money"
  ], "Foods connect people."));
  c.push(L("Reading a sewing pattern", [
    "Pattern pieces|📄|A sewing pattern has paper pieces you pin to fabric and cut. Markings tell you how.",
    "Markings|➡️|The <b>grainline</b> arrow should run parallel to the <b>selvage</b> (the finished edge of fabric). <b>Notches</b> are little marks that match up pieces. A <b>fold line</b> means place the piece on a fold.",
    "Sizes|📐|Measure your chest, waist and hips, then use the <b>size chart</b>. Many patterns have a seam allowance of 5/8 inch."
  ], [
    "What should the grainline arrow run parallel to?|the selvage|➡️|It is the finished edge of the fabric.|the hem,the pins",
    "What is the selvage?|the finished edge of fabric|🧵||a kind of needle,a thread color",
    "What are notches used for?|matching up pieces|✂️||decorating,cutting extra fabric",
    "What does a fold line mean?|place the piece on a fold|📄||cut off the piece,sew it twice",
    "What do you use to choose your size?|a size chart|📐||the color,the price",
    "What do you measure for a size chart?|chest, waist and hips|📏||eyes and hair,favorite color",
    "What is a common seam allowance on patterns?|5/8 inch|📏||5 feet,5 yards",
    "What do you pin to the fabric?|the paper pattern pieces|📌||the iron,the thimble"
  ], "Pattern marks are directions."));
  c.push(G("Seam allowance math", [
    "Add the extras|➕|Cut pieces must be bigger than the finished piece. Add the <b>seam allowance</b> on each side where you will sew.",
    "Example|✏️|A pillow cover 16 inches wide with a 1-inch seam on both sides: 16 + 1 + 1 = <b>18 inches</b> to cut.",
    "Hems|👖|For a skirt 30 inches long with a 2-inch hem, cut 30 + 2 = <b>32 inches</b>."
  ], () => {
    const t = ri(0, 2);
    if (t === 0) { const w = ri(10, 30), s = ri(1, 2); return Q(`You want a finished piece ${w} inches wide. The seam allowance is ${s} inch on each side. How many inches wide should you cut it?`, w + 2 * s, "✂️", "There is a seam on BOTH sides of the piece.", "Add the seam allowance two times (one for each side) to the finished width.", "Finished 20 inches, 1-inch seams on both sides. 20 + 1 + 1 = 22 inches."); }
    if (t === 1) { const l = ri(20, 40), h = ri(1, 3); return Q(`A skirt will be ${l} inches long when finished. The hem takes ${h} inches. How many inches long should you cut the fabric?`, l + h, "👗", "The hem uses up some fabric, so you need more.", "Add the hem amount to the finished length.", "Finished length 30 inches, hem 2 inches. 30 + 2 = 32 inches."); }
    const t2 = pick([5, 6, 10, 12]), n = ri(3, 8); return Q(`A strip of fabric is ${t2 * n} inches long. You cut it into pieces ${t2} inches long. How many pieces do you get?`, n, "✂️", "Split the strip into equal pieces.", "Divide the strip length by the length of one piece.", "A 30-inch strip cut in 6-inch pieces gives 30 ÷ 6 = 5 pieces.");
  }));
  c.push(G("Cost per wear", [
    "Is it worth it?|👟|<b>Cost per wear</b> = price ÷ number of times you wear it. A higher price can be a good buy if you wear it a lot.",
    "Example|✏️|A $60 jacket worn 30 times costs $60 ÷ 30 = <b>$2 per wear</b>.",
    "Work backward|⏪|To pay $4 per wear for a $48 sweater, you must wear it 48 ÷ 4 = <b>12 times</b>."
  ], () => {
    if (Math.random() < 0.6) { const w = pick([10, 12, 15, 20, 25, 30]), per = ri(2, 6); return Q(`You buy a coat for $${w * per}. You wear it ${w} times. How many dollars is the cost per wear?`, per, "🧥", "Cost per wear means the price for each time you wear it.", "Divide the price by the number of wears.", "A $60 jacket worn 20 times: 60 ÷ 20 = $3 per wear."); }
    const per = ri(2, 6), w = pick([8, 10, 12, 15]); return Q(`A sweater costs $${per * w}. You want the cost per wear to be $${per}. How many times must you wear it?`, w, "🧶", "Think: price divided by wears gives cost per wear. Which part is missing?", "Divide the price by the cost per wear you want.", "A $48 sweater at $4 per wear: 48 ÷ 4 = 12 wears.");
  }));
  c.push(G("Sales tax and tips", [
    "Extra costs|🧾|<b>Sales tax</b> is added to the price at the store. A <b>tip</b> is a thank-you for service, such as 10% or 20% of a restaurant bill.",
    "Easy 10%|🔟|To find <b>10%</b>, divide by 10. 10% of $50 is $5. To find <b>20%</b>, find 10% and double it.",
    "Total|➕|Total = price + tax (or tip)."
  ], () => {
    const t = ri(0, 3);
    if (t === 0) { const m = ri(2, 12); return Q(`Sales tax is 10%. A shirt costs $${10 * m}. How many dollars is the tax?`, m, "🧾", "10% means one tenth.", "Divide the price by 10.", "Tax is 10% on a $30 hat. 30 ÷ 10 = $3."); }
    if (t === 1) { const m = ri(2, 9); return Q(`Sales tax is 10%. A game costs $${10 * m}. What is the total price with tax in dollars?`, 11 * m, "🎮", "Find the tax first, then add it to the price.", "The tax is one tenth of the price. Add it on.", "A $20 toy with 10% tax: tax is $2, total is $22."); }
    if (t === 2) { const m = ri(2, 8); return Q(`The meal costs $${10 * m}. You want to leave a 20% tip. How many dollars is the tip?`, 2 * m, "🍽️", "20% is double 10%.", "Find 10% by dividing by 10, then double it.", "Meal $30, 20% tip: 10% is $3, doubled is $6."); }
    const m = ri(2, 10); return Q(`A tax of 5% is charged on a $${20 * m} bill. How many dollars is the tax?`, m, "🧾", "5% is half of 10%.", "Find 10% by dividing by 10, then take half of that.", "5% of $40: 10% is $4, half is $2.");
  }));
  c.push(L("Home safety basics", [
    "Smoke alarms|🔔|Test smoke alarms every month. Change the batteries when they chirp, and replace alarms as the maker says.",
    "Escape plan|🚪|Plan two ways out of each room. Pick a <b>meeting place</b> outside. Practice the plan together.",
    "In an emergency|📞|Get out fast, stay low under smoke, and call <b>911</b> from outside. Know your address. Never go back in."
  ], [
    "How often should you test a smoke alarm?|every month|🔔|It is shorter than a year.|every ten years,never",
    "What should you do when a smoke alarm chirps?|change the battery|🔋||ignore it,cover it",
    "How many ways out of each room should you plan?|two|🚪||none,twenty",
    "Where is a family meeting place?|outside, away from the house|🏡||under your bed,in the kitchen",
    "What number do you call in an emergency?|911|📞||111,999",
    "Where do you stay if there is smoke?|low to the ground|🧎||standing tall,in a closet",
    "Should you go back inside a burning home?|never|🚫||yes for toys,yes for homework",
    "What should you know in case you call for help?|your address|🏠||your favorite color,your shoe size"
  ], "Plan before an emergency."));
  c.push(L("Clean, sanitize, disinfect", [
    "Clean|🧼|<b>Cleaning</b> uses soap and water to remove dirt and some germs. Always clean first.",
    "Sanitize|🧽|<b>Sanitizing</b> lowers the number of germs to a safe level, like on cutting boards and dishes.",
    "Disinfect|🧴|<b>Disinfecting</b> kills most germs on surfaces using chemicals. They need to stay wet for the time on the label. A grown-up should handle strong products."
  ], [
    "Which step removes dirt with soap and water?|clean|🧼|It is the first step.|disinfect,sanitize",
    "Which step lowers germs to a safe level?|sanitize|🧽||clean only,paint",
    "Which step kills most germs using chemicals?|disinfect|🧴||sweep,rinse",
    "Which step comes first?|clean|🧼||disinfect,none",
    "Why must a disinfectant stay wet on a surface for a while?|so it has time to work|⏳||to make it slippery,to make it smell",
    "Who should handle strong cleaning products?|a grown-up|🧑||a toddler,a stranger",
    "What should you do to a cutting board after raw meat?|clean and sanitize it|🔪||nothing,wipe once with a dry cloth",
    "How often should dish towels be washed?|often|🧺||never,once a year"
  ], "Clean first."));
  c.push(L("Fermented foods", [
    "Helpful microbes|🦠|<b>Fermenting</b> uses tiny living things like bacteria and yeast to change food. It gives new tastes and helps food keep.",
    "Examples|🥛|Yogurt and cheese come from fermented milk. Sourdough bread uses wild yeast and bacteria. Sauerkraut is fermented cabbage. Kimchi is a Korean fermented vegetable dish. Miso is fermented soybeans.",
    "Live cultures|✨|Labels may say 'live and active cultures' for yogurt with living friendly bacteria."
  ], [
    "Which food is fermented cabbage?|sauerkraut|🥬|It's often a topping on sausages.|coleslaw,lettuce",
    "Which food is made from fermented milk?|yogurt|🥛||butter beans,flour",
    "Which is a fermented vegetable dish from Korea?|kimchi|🌶️||sushi,pasta",
    "What is miso made from?|fermented soybeans|🫘||fresh milk,fruit",
    "What do the words 'live cultures' mean?|friendly bacteria are alive|✨||no bacteria,only sugar",
    "Which microbes help bread rise?|yeast|🍞||metal,sand",
    "What does fermenting change in food?|its taste and keeping time|⏳||its shape only,nothing",
    "Which bread uses wild yeast and bacteria?|sourdough|🍞||pancake,tortilla chips"
  ], "Friendly microbes at work."));
  c.push(G("Cooking time by weight", [
    "Time per pound|⚖️|Some recipes say how many minutes to cook per pound. Total time = minutes per pound x pounds.",
    "Example|✏️|A roast needs 20 minutes per pound. A 4-pound roast takes 4 x 20 = <b>80 minutes</b>.",
    "Work backward|⏪|If the total time is 90 minutes at 30 minutes per pound, the roast weighs 90 ÷ 30 = <b>3 pounds</b>."
  ], () => {
    if (Math.random() < 0.65) { const pp = pick([10, 15, 20, 25, 30]), lb = ri(2, 8); return Q(`A recipe says to cook a roast for ${pp} minutes per pound. The roast weighs ${lb} pounds. How many minutes in all?`, pp * lb, "🥩", "Every pound needs the same amount of time.", "Multiply the minutes per pound by the pounds.", "15 minutes per pound for a 3-pound roast: 15 x 3 = 45 minutes."); }
    const pp = pick([10, 15, 20, 30]), lb = ri(2, 8); return Q(`A roast cooked for ${pp * lb} minutes at ${pp} minutes per pound. How many pounds did it weigh?`, lb, "🥩", "You know the total time. Work backward to find the pounds.", "Divide the total minutes by the minutes per pound.", "90 minutes at 30 per pound is 90 ÷ 30 = 3 pounds.");
  }));
  c.push(MIX("Mixed practice", [c[0], c[2], c[4], c[6], c[8], c[10], c[13], c[15]]));
  c.push(MIX("Level 12 Challenge", [c[1], c[3], c[5], c[7], c[9], c[11], c[12], c[14], c[16], c[17]]));

  Object.assign(HOMEEC_LEVELS, { 10: a, 11: b, 12: c });
})();
