// ext/homeec-22-24.js  Home Economics levels 22-24 (10th grade 2nd half, 11th grade)
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
        if (q.answer >= 0 && !new RegExp("(^|[^0-9.])" + String(q.answer).replace(".", "\\.") + "([^0-9]|$)").test(h)) break;
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

  // ================= LEVEL 22 =================
  const a = [];
  a.push(L("Water activity and shelf life", [
    "Free water|💧|<b>Water activity</b> (aw) measures how much water in a food is free for microbes to use. Pure water is 1.0. The lower the number, the harder it is for germs to grow.",
    "Why it works|🍯|Sugar and salt hold on to water, so less is free. That is why honey, jam, jerky and dried pasta keep for a long time. Most bacteria stop growing below about 0.90.",
    "Shelf-stable|📦|Foods with low water activity can sit in a pantry. Foods with high water activity, like fresh meat, milk and cooked rice, must be kept cold."
  ], [
    "What does water activity measure?|how much water is free for microbes|💧||the weight of the food,how cold the food is",
    "What is the water activity of pure water?|1.0|💧||0.5,0.1",
    "Which has lower water activity?|raisins|🍇||grapes,they are the same",
    "Why does lots of sugar help preserve jam?|it holds water so microbes cannot use it|🍓||it adds more water,it makes the jam colder",
    "Which food is shelf-stable thanks to low water activity?|dry pasta|🍝||fresh milk,cooked rice",
    "Which spoils faster at room temperature?|fresh meat|🥩||jerky,dried beans",
    "Most bacteria stop growing below about what water activity?|0.90|🦠||0.99,1.0",
    "Why can honey last for years?|little free water is left|🍯||it is always frozen,it is full of fresh fruit"
  ], "Think about water that microbes can reach."));
  a.push(L("Baking without gluten", [
    "Why gluten matters|🌾|Gluten is a protein in wheat, barley and rye. It makes dough stretchy and holds in gas. People with <b>celiac disease</b> must avoid gluten completely, because it harms their gut.",
    "Gluten-free flours|🥧|Rice flour, almond flour, tapioca starch and corn flour have no gluten. Bakers add a binder such as <b>xanthan gum</b> to give the dough structure.",
    "Stay safe|⚠️|Cross-contact matters: use clean tools and pans. Oats are naturally gluten-free but are often mixed with wheat, so look for a gluten-free label."
  ], [
    "Which grain contains gluten?|wheat|🌾||rice,corn",
    "Which flour is gluten-free?|almond flour|🥜||rye flour,barley flour",
    "What does xanthan gum do in gluten-free baking?|acts as a binder|🥣||adds gluten,turns the dough blue",
    "Why must a person with celiac disease avoid gluten?|it harms their gut|🩺||it makes them thirsty,it turns food bitter",
    "What does gluten do in bread dough?|makes it stretchy and traps gas|🍞||melts it into oil,keeps it cold",
    "Why should oats be labeled gluten-free?|they may be mixed with wheat|🥣||they contain meat,they are poisonous",
    "Which of these has gluten?|rye bread|🍞||corn tortilla,rice noodles",
    "Which is a good way to avoid cross-contact?|use clean tools and pans|🧽||use the same toaster as wheat bread,share the same cutting board"
  ], "Gluten comes from certain grains."));
  a.push(L("Creaming and folding", [
    "Creaming|🧈|In the <b>creaming method</b>, you beat soft butter with sugar until pale and fluffy. The sugar crystals cut tiny air pockets into the butter. Those air pockets help a cake rise.",
    "Folding|🥣|<b>Folding</b> means using a spatula to gently turn whipped egg whites or cream into a batter, so the air stays in. Stirring hard would knock the air out.",
    "Muffin method|🧁|In the <b>muffin method</b>, you mix the dry and wet ingredients separately and then stir just until combined. Over-mixing makes tough muffins with long holes."
  ], [
    "What is the creaming method?|beating butter and sugar until fluffy|🧈||boiling sugar in water,freezing flour",
    "Why beat butter and sugar together?|to trap air pockets|🧁||to make it salty,to melt the sugar",
    "What does folding do?|keeps air in the batter|🥣||knocks out all the air,boils the batter",
    "Which tool is best for folding?|a rubber spatula|🥄||an electric mixer on high,a meat grinder",
    "What happens if muffin batter is over-mixed?|they turn out tough|🧁||they turn out fluffier,they turn green",
    "In the muffin method, when do wet and dry ingredients meet?|at the end|🥣||never,they stay separate forever",
    "Which cake depends on whipped egg whites?|angel food cake|🍰||pound cake,brownies",
    "What does fluffy creamed butter look like?|pale and light|🧈||dark brown and runny,clear and hard"
  ], "Air is what makes baked goods light."));
  a.push(L("Yogurt and cheese science", [
    "Milk to yogurt|🥛|Helpful bacteria eat the milk sugar, <b>lactose</b>, and make <b>lactic acid</b>. The acid makes milk proteins clump, so milk thickens into yogurt. This is fermentation.",
    "Cheese|🧀|To make cheese, milk is curdled with acid or an enzyme called <b>rennet</b>. The solid clumps are <b>curds</b>. The liquid left over is <b>whey</b>. Curds are pressed and often aged.",
    "Why age it|⏳|Aging lets bacteria and enzymes build flavor. Soft cheeses are aged briefly. Hard cheeses like Parmesan are aged for a year or more."
  ], [
    "What do yogurt bacteria turn lactose into?|lactic acid|🥛||vinegar only,plain sugar",
    "What is the liquid left after curds form?|whey|🧀||cream,rennet",
    "What are the solid clumps in cheese making called?|curds|🧀||whey,brine",
    "Which enzyme helps milk form curds?|rennet|🧪||yeast,baking soda",
    "Why does milk thicken into yogurt?|acid makes the proteins clump|🥛||fat turns to ice,water boils off",
    "Which cheese is aged the longest?|Parmesan|🧀||fresh mozzarella,cream cheese",
    "What sugar is found in milk?|lactose|🥛||fructose,maltose",
    "What does aging do for cheese?|builds flavor|⏳||removes all the flavor,makes it fizzy"
  ], "Bacteria and acid change the milk proteins."));
  a.push(L("Deficiency diseases", [
    "Too little of a nutrient|🍊|A <b>deficiency</b> happens when the body does not get enough of a nutrient for a long time. Sailors long ago got <b>scurvy</b> from too little vitamin C.",
    "Common ones|🩸|Low iron causes <b>anemia</b> (tired, pale). Low vitamin D can cause <b>rickets</b>, which softens bones in children. Low iodine can cause a swollen thyroid called <b>goiter</b>.",
    "Prevention|🥗|A varied diet prevents most deficiencies. Iodized salt, fortified milk and fortified cereal were created to fix common gaps."
  ], [
    "Too little vitamin C causes what?|scurvy|🍊||rickets,anemia",
    "Too little iron can cause what?|anemia|🩸||scurvy,goiter",
    "Too little vitamin D can cause what in children?|rickets|🦴||scurvy,goiter",
    "Too little iodine can cause what?|goiter|🧂||anemia,rickets",
    "Why is salt often iodized?|to prevent iodine deficiency|🧂||to make it blue,to make it sweeter",
    "What does fortified mean?|nutrients were added|🥣||nutrients were removed,it was frozen",
    "What best prevents most deficiencies?|a varied diet|🥗||eating one food only,skipping meals",
    "Which food is rich in vitamin C?|oranges|🍊||white rice,butter"
  ], "Match the missing nutrient to its disease."));
  a.push(L("Sports nutrition", [
    "Fuel|🏃|Carbohydrates are stored in muscles as <b>glycogen</b> and give quick energy. Protein helps repair muscle. Fat gives long-lasting energy.",
    "Fluids|💧|Sweat loses water and <b>electrolytes</b> such as sodium and potassium. Water is enough for short activity. Long, hard workouts may need electrolytes too.",
    "Timing|⏰|Eat a meal with carbs and some protein two to three hours before exercise. Afterward, eat carbs and protein to refuel. Teens do not need protein powders or supplements."
  ], [
    "What is stored carbohydrate in muscle called?|glycogen|💪||gluten,lactose",
    "Which nutrient mainly repairs muscle?|protein|🥚||sugar only,water only",
    "What are sodium and potassium called in sweat?|electrolytes|💧||allergens,proteins",
    "What is enough for a short easy workout?|water|🚰||a sugary soda,a coffee",
    "Which food is a good meal before exercise?|pasta with chicken|🍝||a bag of candy only,nothing at all",
    "Which nutrient gives quick energy?|carbohydrate|🍌||vitamin C,fiber only",
    "Do most teens need protein powder?|no|🥤||yes every day,only at night",
    "Why drink after exercise?|to replace fluids lost in sweat|🚰||to get hotter,to lose muscle"
  ], "Think about energy, repair and fluids."));
  a.push(G("Energy needs and BMR", [
    "Resting energy|🔥|<b>BMR</b> (basal metabolic rate) is the energy your body burns just to stay alive at rest. Your daily needs are BMR times an activity factor: about 1.2 if you are mostly seated and about 1.5 if you are active.",
    "Example|✏️|BMR 1400 and an activity factor of 1.2: 1400 × 1.2 = <b>1680</b> calories a day.",
    "Balance|⚖️|If you eat more than you need, you are in a surplus. If you eat less, you are in a deficit."
  ], () => {
    const b = ri(12, 18) * 100, f = pick([1.2, 1.5]);
    if (Math.random() < 0.6) return Q(`A teen has a BMR of ${b} calories. The activity factor is ${f}. How many calories a day does the teen need?`, Math.round(b * f), "🔥",
      "Multiply the BMR by the activity factor.", "Daily needs equal BMR times the activity factor.",
      "BMR 1300 times 1.2 equals 1560.");
    const need = ri(18, 26) * 100, extra = ri(2, 9) * 50;
    return Q(`A person needs ${need} calories a day but eats ${need + extra}. How many extra calories is that?`, extra, "⚖️",
      "Compare the two numbers by subtracting.", "Take the calories eaten and subtract the calories needed.",
      "Needs 2000, eats 2300: 2300 - 2000 = 300.");
  }));
  a.push(L("Sous vide cooking", [
    "Water bath|🛁|<b>Sous vide</b> (French for 'under vacuum') seals food in a bag and cooks it in a water bath held at an exact temperature, often for one to several hours.",
    "Even cooking|🥩|Because the water is never hotter than the target, the food cooks the same all the way through, with no gray overcooked edge. Many cooks sear the food briefly afterward for a brown crust.",
    "Safety|⚠️|Time and temperature both matter for safety. Food must not sit in the danger zone (4 to 60 degrees Celsius) for too long. Use a reliable thermometer and follow tested guides."
  ], [
    "What does sous vide mean in French?|under vacuum|🛁||over the fire,very sweet",
    "What equipment holds the temperature steady?|a water bath circulator|🛁||a toaster,a blender",
    "What is a benefit of sous vide?|even doneness edge to edge|🥩||burns the outside,uses no water at all",
    "Why sear food after sous vide?|to add a brown crust|🍳||to make it raw,to freeze it",
    "How is the food kept in the water?|sealed in a bag|📦||floating loose,wrapped in paper only",
    "What matters for sous vide safety?|both time and temperature|⏱️||only the color,only the brand of bag",
    "How long does sous vide cooking often take?|one to several hours|⏲️||two seconds,one week",
    "What is the danger zone?|4 to 60 degrees Celsius|🌡️||80 to 100 degrees Celsius,below minus 20 degrees"
  ], "Think low and steady temperature."));
  a.push(L("Plating and presentation", [
    "We eat with our eyes|🍽️|Good presentation makes food more appealing. Plate food on a clean, simple plate. Wipe any drips from the rim.",
    "Design tips|🎨|Use <b>color contrast</b> (green herbs on a pale sauce), build some <b>height</b>, and use odd numbers like three shrimp. Leave empty space so the plate does not look crowded.",
    "Garnish|🌿|A garnish should be edible and fit the dish, like parsley on pasta or a lemon wedge with fish. It is a finishing touch, not clutter."
  ], [
    "What does color contrast do on a plate?|makes food stand out|🎨||hides the food,makes food cold",
    "What should you do to the plate rim before serving?|wipe off drips|🧽||add more sauce,leave the drips",
    "Why use odd numbers like three items?|they look more balanced|🍤||they are cheaper,they cook faster",
    "What should a garnish be?|edible and fitting|🌿||plastic,a flower from the yard",
    "What does adding height do?|adds interest|🥗||spills the food,makes it taste bad",
    "Why leave empty space on the plate?|so it does not look crowded|🍽️||to save food for later,to cool the plate",
    "Which garnish suits fish?|a lemon wedge|🍋||chocolate chips,marshmallows",
    "What kind of plate is best?|a clean simple plate|🍽️||a cracked dirty plate,a very busy plate"
  ], "Think about how it looks to the eye."));
  a.push(L("Weave patterns", [
    "Warp and weft|🧵|Woven cloth has <b>warp</b> threads running lengthwise and <b>weft</b> threads crossing over and under them. The finished edge is the <b>selvage</b>.",
    "Three basic weaves|👖|<b>Plain weave</b> is over one, under one (shirts, sheets). <b>Twill</b> makes diagonal ridges and is strong (denim). <b>Satin</b> lets threads float over several others for a smooth, shiny surface.",
    "Knit vs woven|🧶|Knit fabric is made of interlocking loops, so it stretches. Woven fabric stretches little unless it is cut on the bias."
  ], [
    "Which threads run lengthwise in woven cloth?|warp|🧵||weft,selvage",
    "Which weave makes diagonal ridges?|twill|👖||plain,satin",
    "Which weave is shiny and smooth?|satin|✨||twill,plain",
    "What is the finished edge of fabric called?|selvage|🧵||weft,hem",
    "Which weave is over one and under one?|plain weave|🧵||twill,satin",
    "Denim is usually which weave?|twill|👖||satin,knit",
    "Why does knit fabric stretch?|it is made of loops|🧶||it is wet,it is thicker",
    "Which threads cross the warp?|weft|🧵||selvage,warp"
  ], "Picture how the threads cross."));
  a.push(L("Grainline and pattern layout", [
    "Grain|📐|<b>Grain</b> is the direction of the threads. The <b>lengthwise grain</b> runs parallel to the selvage and is strongest. The <b>crossgrain</b> goes across and has a little give.",
    "Pattern pieces|✂️|Each pattern piece has a <b>grainline arrow</b>. Place it parallel to the selvage. Measure from the arrow to the selvage at both ends to check.",
    "Before cutting|🧺|Pre-wash the fabric so it shrinks first, press it, then pin the pieces. For fabrics with a <b>nap</b> (like velvet), all pieces must point the same way."
  ], [
    "Which grain runs parallel to the selvage?|lengthwise|📐||bias,crossgrain",
    "Where do you place the grainline arrow?|parallel to the selvage|📐||across the fabric,at a 45 degree angle",
    "Why pre-wash fabric before cutting?|so it shrinks first|🧺||to make it shinier,to add dye",
    "What is a nap?|a raised pile that has a direction|🧸||a type of seam,a sleeping bag",
    "How do you check the arrow is straight?|measure to the selvage at both ends|📏||guess by eye only,use a mirror",
    "What do you do to fabric before laying out the pattern?|press it|♨️||fold it into a ball,dye it",
    "Which grain is strongest?|lengthwise|🧵||crossgrain,bias",
    "For velvet, how should all pieces face?|the same direction|🧸||opposite directions,random directions"
  ], "The arrow lines up with the fabric's edge."));
  a.push(L("Seam finishes", [
    "Why finish|✂️|Cut fabric edges <b>fray</b>. A seam finish keeps the raw edges from unravelling and makes the inside neat and strong.",
    "Options|🧵|A <b>serger</b> trims and wraps the edge with thread in one pass. <b>Pinking shears</b> cut a zigzag edge that frays less. A <b>zigzag stitch</b> along the edge works on a regular machine.",
    "Enclosed seams|✨|A <b>French seam</b> hides the raw edges inside a seam, good for sheer fabric. Always press each seam as you sew."
  ], [
    "What does a serger do?|trims and wraps the edge in one pass|🧵||only cuts fabric,only dyes fabric",
    "What do pinking shears make?|a zigzag cut edge|✂️||a straight cut,a curved hem",
    "Why finish seams?|to stop fraying|🧵||to add color,to shrink the cloth",
    "Which seam hides the raw edges inside?|French seam|✨||plain seam,basting",
    "Which stitch on a regular machine finishes an edge?|zigzag|🪡||straight stitch,basting stitch",
    "What happens to a cut edge without a finish?|it frays|🧶||it grows,it dyes itself",
    "When should you press a seam?|as you sew|♨️||only at the end,never",
    "Which fabric suits a French seam?|sheer fabric|🪟||thick denim,leather"
  ], "Raw edges need to be protected."));
  a.push(G("Fabric shrinkage", [
    "Shrinking|🧺|Natural fabrics like cotton can shrink when washed. Shrinkage is a percent of the length. A 10% shrink on 50 inches loses 50 × 0.10 = <b>5 inches</b>.",
    "Remaining length|📏|After shrinking, the fabric is shorter. Subtract the shrinkage from the starting length to find the new length.",
    "Tip|🖐️|Pre-wash fabric so the shrinking happens before you cut."
  ], () => {
    const len = ri(2, 10) * 20, p = pick([5, 10]), sh = len * p / 100;
    if (Math.random() < 0.5) return Q(`A piece of cotton is ${len} inches long and shrinks ${p}% in the wash. How many inches does it shrink?`, sh, "🧺",
      "Find the percent of the length.", `Multiply the length by ${p} and divide by 100.`,
      "A 60 inch piece shrinks 5%: 60 × 5 ÷ 100 = 3 inches.");
    return Q(`A piece of cotton is ${len} inches long and shrinks ${p}%. How long is it after washing?`, len - sh, "📏",
      "Find how much it shrinks, then take it away.", "Subtract the shrinkage from the starting length.",
      "A 40 inch piece shrinks 10%, so it loses 4 inches and ends at 36.");
  }));
  a.push(G("Budgeting variable income", [
    "Uneven pay|📅|Some jobs, like babysitting or tips, pay different amounts each month. To plan, find the <b>average</b>: add the months and divide by how many months.",
    "Example|✏️|Three months of $300, $400 and $500 add to $1200. Divide by 3 to get <b>$400</b> a month.",
    "Buffer|🛟|In a big month, set aside the extra above your average. Use it to cover a small month."
  ], () => {
    const avg = ri(6, 15) * 50, d = ri(1, 4) * 50;
    if (Math.random() < 0.6) {
      const m = shuf([avg - d, avg, avg + d]);
      return Q(`Over three months, Sam earned $${m[0]}, $${m[1]} and $${m[2]}. What is the average per month?`, avg, "📅",
        "Add the three months and share equally.", "Add all three amounts, then divide by 3.",
        "Months of $200, $300 and $400 add to $900. 900 ÷ 3 = $300.");
    }
    return Q(`Lena's average month is $${avg}. This month she earned $${avg + d}. How much extra should she put in her buffer?`, d, "🛟",
      "Compare this month with the average.", "Subtract the average from this month's pay.",
      "Average $400, earned $460: 460 - 400 = $60.");
  }));
  a.push(G("Checkbook balance", [
    "Balancing|📒|Keep a running <b>balance</b>. Subtract each payment and add each deposit. Compare with the bank statement to catch mistakes.",
    "Example|✏️|Balance $200. Pay $50, then deposit $30. 200 - 50 + 30 = <b>$180</b>.",
    "Tip|🖐️|Write every purchase down right away so you do not overspend."
  ], () => {
    const s = ri(30, 60) * 10;
    if (Math.random() < 0.5) {
      const p = ri(2, 15) * 10, d = ri(2, 20) * 10;
      return Q(`Your account has $${s}. You spend $${p} and then deposit $${d}. What is the new balance?`, s - p + d, "📒",
        "Spending lowers the balance and deposits raise it.", "Subtract the payment and then add the deposit.",
        "Start with $300. Spend $40, deposit $20: 300 - 40 + 20 = $280.");
    }
    const p1 = ri(2, 12) * 10, p2 = ri(2, 12) * 10;
    return Q(`Your account has $${s}. You write checks for $${p1} and $${p2}. What is the balance left?`, s - p1 - p2, "💳",
      "Take away both payments.", "Subtract each check from the starting balance.",
      "Start with $250. Checks of $30 and $50: 250 - 30 - 50 = $170.");
  }));
  a.push(L("Warranties and returns", [
    "Warranty|📜|A <b>warranty</b> is a promise from the seller or maker to repair or replace a product that fails within a set time. It covers defects, not damage you cause.",
    "Returns|🧾|A <b>return policy</b> says how long you have to bring an item back, and whether you need the receipt. Some stores give only store credit or charge a restocking fee.",
    "Be smart|🔍|Read the policy before you buy and keep your receipts. An <b>extended warranty</b> costs extra and is often not worth it for cheap items."
  ], [
    "What does a warranty promise?|repair or replacement if it fails|📜||free food forever,a lower price tomorrow",
    "Does a warranty cover damage you caused?|usually not|🔨||always,only on weekends",
    "What should you keep to return an item?|the receipt|🧾||the box lid only,a photo of the store",
    "What is store credit?|money you can only spend at that store|🏬||cash you can spend anywhere,a free coupon",
    "When should you read the return policy?|before buying|🔍||after it breaks,never",
    "What is a restocking fee?|a charge for returning an item|💲||a free gift,a type of tax",
    "What does 'as is' mean?|you accept it with its flaws|📦||full refund guaranteed,brand new",
    "What is an extended warranty?|extra coverage that costs more|📜||a free return,a store coupon"
  ], "Think about promises and paperwork."));
  a.push(G("Leases and deposits", [
    "Move-in costs|🔑|A <b>lease</b> is a contract to rent a home. Many landlords ask for the first month's rent plus a <b>security deposit</b>, often equal to one month's rent.",
    "Example|✏️|Rent $800 with a deposit of one month. At signing you pay 800 + 800 = <b>$1600</b>.",
    "Getting it back|📤|The deposit is returned when you move out, minus any costs to fix damage beyond normal wear."
  ], () => {
    const r = ri(6, 15) * 100;
    const t = Math.random();
    if (t < 0.34) return Q(`Rent is $${r} a month. At signing you pay the first month plus a deposit of one month's rent. How much is due?`, 2 * r, "🔑",
      "You pay two things at signing.", "Add the first month's rent and the deposit.",
      "Rent $700: first month 700 plus deposit 700 is $1400.");
    if (t < 0.67) return Q(`A lease costs $${r} per month for 12 months. What is the total rent for the lease?`, r * 12, "📅",
      "Multiply the monthly rent by the number of months.", "A year has 12 months.",
      "Rent $500 for 12 months: 500 × 12 = $6000.");
    const dm = ri(1, 4) * 50;
    return Q(`Your deposit was $${r}. The landlord keeps $${dm} for damage. How much is returned to you?`, r - dm, "📤",
      "Take the damage charge away from the deposit.", "Subtract the damage charge from the deposit.",
      "Deposit $900, damage $100: 900 - 100 = $800.");
  }));
  a.push(L("Family life stages", [
    "Many kinds of families|👨‍👩‍👧|Families come in many forms: <b>nuclear</b> (parents and children), <b>extended</b> (with grandparents or relatives), <b>single-parent</b> and <b>blended</b> (families joined together).",
    "Life stages|🔄|Families change over time. They begin, expand when children arrive, launch when children grow up, and later care for aging members.",
    "What families do|🏠|Families provide care, teach values, protect and support one another, and share resources like money and time."
  ], [
    "Which family includes grandparents living together?|extended family|👵||nuclear family,blended family",
    "Which family is parents and their children only?|nuclear family|👨‍👩‍👧||extended family,single-parent family",
    "What is a blended family?|two families joined together|🧩||one person alone,a sports team",
    "What is the 'launching' stage?|children grow up and leave home|🚀||the first day of school,the birth of a baby",
    "What is one job of a family?|care and support|❤️||ignore each other,compete for money",
    "Do families stay the same forever?|no they change over time|🔄||yes always,only at holidays",
    "Which family has one adult raising children?|single-parent family|👨‍👧||nuclear family,blended family",
    "What stage comes when babies and children are added?|expanding|👶||launching,retirement"
  ], "Families have many forms and stages."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[9], a[10], a[12], a[13], a[15]]));
  a.push(MIX("Level 22 Challenge", [a[8], a[11], a[12], a[14], a[15], a[16], a[17], a[1], a[3], a[5], a[6], a[13]]));

  // ================= LEVEL 23 =================
  const b = [];
  b.push(L("Sugars in food", [
    "Kinds of sugar|🍬|<b>Glucose</b> is the body's main fuel. <b>Fructose</b> is in fruit and honey. <b>Sucrose</b> is table sugar, made of glucose plus fructose. <b>Lactose</b> is milk sugar. <b>Maltose</b> is made of two glucose units.",
    "Natural or added|🍎|Sugars in fruit and milk come with fiber, water or protein. <b>Added sugars</b> are put in during making, such as in soda and candy.",
    "Guideline|📏|Dietary guidelines advise getting less than 10 percent of daily calories from added sugars. Each gram of sugar has 4 calories."
  ], [
    "What is table sugar called?|sucrose|🍚||lactose,maltose",
    "Which sugar is found in milk?|lactose|🥛||fructose,sucrose",
    "Which sugar is the body's main fuel?|glucose|⚡||lactose,sucrose",
    "Sucrose is made of glucose and what?|fructose|🍬||lactose,starch",
    "Which is an added sugar?|sugar in soda|🥤||sugar inside a whole apple,lactose in plain milk",
    "Guidelines suggest less than what share of calories from added sugars?|10 percent|📏||50 percent,75 percent",
    "How many calories are in a gram of sugar?|4|🔢||9,0",
    "Which sugar is found in fruit and honey?|fructose|🍯||lactose,maltose"
  ], "Each sugar has its own name and source."));
  b.push(L("Types of fat", [
    "Saturated and unsaturated|🧈|<b>Saturated fats</b> (butter, fatty meat, coconut oil) are usually solid at room temperature. <b>Unsaturated fats</b> (olive oil, nuts, fish) are usually liquid.",
    "Trans fat|🚫|<b>Trans fats</b> came from partially hydrogenated oils. They raise LDL cholesterol and are now banned or limited in many places. Read labels for 'partially hydrogenated'.",
    "Healthy choices|🐟|Omega-3 fats in salmon, walnuts and flax are helpful. Fats have 9 calories per gram, more than double carbohydrates and protein."
  ], [
    "Which fat is usually solid at room temperature?|saturated fat|🧈||unsaturated fat,omega-3 fat",
    "Which food is rich in unsaturated fat?|olive oil|🫒||butter,lard",
    "How many calories are in a gram of fat?|9|🔢||4,2",
    "Which label words warn of trans fat?|partially hydrogenated|🏷️||whole grain,fortified",
    "Where are omega-3 fats found?|salmon and walnuts|🐟||soda and candy,white bread",
    "Which fat does health advice say to avoid?|trans fat|🚫||omega-3 fat,olive oil",
    "Which is usually liquid at room temperature?|unsaturated fat|🫒||saturated fat,trans fat",
    "Which food has mostly saturated fat?|butter|🧈||canola oil,almonds"
  ], "Solid or liquid at room temperature is a clue."));
  b.push(L("Cholesterol and heart health", [
    "What it is|❤️|<b>Cholesterol</b> is a waxy substance your liver makes. Your body needs some, but too much in the blood can build up in the arteries.",
    "LDL and HDL|🩺|<b>LDL</b> is called 'bad' cholesterol because it can clog arteries. <b>HDL</b> is called 'good' because it carries cholesterol away. A doctor can check levels with a blood test.",
    "Healthy habits|🏃|Fiber (oats and beans), unsaturated fats, exercise, and less saturated fat and salt help protect the heart."
  ], [
    "Which organ makes cholesterol?|the liver|🫀||the stomach,the lungs",
    "Which cholesterol is called 'bad'?|LDL|🩺||HDL,BMI",
    "Which cholesterol is called 'good'?|HDL|🩺||LDL,BMI",
    "What can too much cholesterol do?|build up in arteries|❤️||make bones longer,improve eyesight",
    "How can a doctor check cholesterol?|a blood test|🩸||an eye test,a hearing test",
    "Which food fiber helps lower LDL?|oats|🥣||sugary cereal,butter",
    "What habit helps raise HDL?|regular exercise|🏃||sitting all day,skipping sleep",
    "Which fat raises LDL the most?|saturated and trans fat|🍟||olive oil,fish oil"
  ], "Think about the heart and arteries."));
  b.push(L("Dietary Guidelines", [
    "Advice from experts|📘|The <b>Dietary Guidelines for Americans</b> are updated every five years. They give advice for a healthy eating pattern at every life stage.",
    "Key points|🥗|Eat nutrient-dense foods: fruits, vegetables, whole grains, lean protein and low-fat dairy. Keep added sugars under 10 percent of calories, saturated fat under 10 percent, and sodium under 2300 milligrams a day.",
    "MyPlate|🍽️|MyPlate shows a plate with fruits and vegetables filling about half, plus grains, protein and dairy."
  ], [
    "How often are the Dietary Guidelines updated?|every five years|📘||every day,every century",
    "How much of the plate should be fruits and vegetables?|about half|🍽️||a tiny corner,none",
    "What is the daily sodium limit in the guidelines?|2300 milligrams|🧂||23 milligrams,23000 milligrams",
    "Limit added sugars to less than what share of calories?|10 percent|🍬||40 percent,60 percent",
    "Which is nutrient-dense?|vegetables|🥦||candy,soda",
    "Who are the guidelines for?|every life stage|👪||only adults,only athletes",
    "Which tool shows the plate?|MyPlate|🍽️||MyPhone,MyBank",
    "Saturated fat should be under what share of calories?|10 percent|🧈||50 percent,80 percent"
  ], "These are national advice numbers."));
  b.push(L("Allergen cross-contact", [
    "Cross-contact|🥜|<b>Cross-contact</b> is when an allergen touches a safe food and spreads. Even a tiny amount can cause a reaction. Cooking does not remove it.",
    "Top allergens|⚠️|Nine foods cause most reactions: milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy and sesame.",
    "Prevent it|🧼|Wash hands, tools and surfaces with soap and water. Use separate utensils and cutting boards. Sanitizer does not remove allergens."
  ], [
    "What is allergen cross-contact?|an allergen spreading to a safe food|🥜||cooking food twice,freezing food",
    "Does cooking remove an allergen?|no|🔥||yes completely,only if it is spicy",
    "What cleans allergens off surfaces?|soap and water|🧼||hand sanitizer only,a damp towel only",
    "Which is one of the nine top allergens?|sesame|🌰||lettuce,apple",
    "What helps prevent cross-contact?|separate utensils|🍴||sharing one spoon,using the same cutting board",
    "How much allergen can cause a reaction?|even a tiny amount|⚠️||only a big bite,none at all",
    "Which is a top allergen?|milk|🥛||carrot,rice",
    "Does hand sanitizer remove allergens?|no|🧴||yes always,only on Fridays"
  ], "Think about how allergens travel."));
  b.push(G("Brewing ratio", [
    "Ratio|☕|Brewing guides use a <b>ratio</b> of coffee to water by weight. A common starting ratio is 1 gram of coffee to 16 grams of water (1:16).",
    "Example|✏️|20 grams of coffee uses 20 × 16 = <b>320 grams</b> of water.",
    "Tip|🖐️|Weighing is more accurate than scooping, because beans differ in size and density."
  ], () => {
    const c = ri(10, 40);
    if (Math.random() < 0.5) return Q(`A brew uses a 1:16 ratio. You use ${c} grams of coffee. How many grams of water?`, c * 16, "☕",
      "Each gram of coffee needs the same amount of water.", "Multiply the coffee grams by 16.",
      "15 grams of coffee at 1:16: 15 × 16 = 240 grams of water.");
    return Q(`A brew uses ${c * 16} grams of water at a 1:16 ratio. How many grams of coffee are needed?`, c, "⚖️",
      "Go the other way: share the water into equal parts.", "Divide the water grams by 16.",
      "320 grams of water at 1:16: 320 ÷ 16 = 20 grams.");
  }));
  b.push(L("Plant-based swaps", [
    "Egg swaps|🌱|A <b>flax egg</b> is 1 tablespoon ground flaxseed mixed with 3 tablespoons water, left to thicken. <b>Aquafaba</b> is the liquid from canned chickpeas and can be whipped like egg whites.",
    "Other swaps|🥛|Oat, soy or almond milk can replace dairy milk. Unsweetened applesauce can replace some oil or egg in baking. <b>Nutritional yeast</b> adds a cheesy flavor. Silken tofu blends into creamy desserts.",
    "Watch the results|🔍|Swaps change texture and flavor. Check protein, calcium and B12 when milk, egg or meat are replaced."
  ], [
    "What is aquafaba?|liquid from canned chickpeas|🥫||juice from lemons,melted butter",
    "What is a flax egg made from?|ground flax and water|🌱||milk and sugar,flour and salt",
    "What gives a cheesy flavor without dairy?|nutritional yeast|🧀||baking soda,vanilla",
    "Which can replace some oil in baking?|unsweetened applesauce|🍎||vinegar,water only",
    "Which can replace dairy milk?|oat milk|🥛||egg whites,cream cheese",
    "What can whip like egg whites?|aquafaba|🥣||water,flour",
    "What blends into creamy desserts?|silken tofu|🍮||dry beans,rice grains",
    "What should you check after swapping milk?|calcium and protein|🔍||nothing at all,the color of the box"
  ], "Plants can imitate the jobs of eggs and milk."));
  b.push(L("Chocolate science", [
    "From bean to bar|🍫|Chocolate comes from <b>cacao</b> beans, which are fermented, dried, roasted and ground. The result has <b>cocoa solids</b> and <b>cocoa butter</b>.",
    "Types|🍫|Dark chocolate has more cocoa solids. Milk chocolate adds milk and more sugar. White chocolate has cocoa butter but no cocoa solids.",
    "Tempering|✨|<b>Tempering</b> is heating and cooling melted chocolate to make stable crystals. It gives shine and a snap. Without it, chocolate can show white streaks called <b>bloom</b>. Never let water touch melting chocolate, because it can seize."
  ], [
    "What does chocolate come from?|cacao beans|🫘||coffee beans,vanilla pods",
    "What is the fat in chocolate called?|cocoa butter|🧈||peanut butter,lard",
    "What does tempering give chocolate?|shine and snap|✨||a sour taste,a green color",
    "What are white streaks on chocolate called?|bloom|🌸||seize,glaze",
    "Which chocolate has no cocoa solids?|white chocolate|🍫||dark chocolate,milk chocolate",
    "What can make melting chocolate seize?|a drop of water|💧||a clean spoon,gentle stirring",
    "Which has the most cocoa solids?|dark chocolate|🍫||milk chocolate,white chocolate",
    "Tempering uses what kind of temperature change?|heating and cooling|🌡️||only freezing,only boiling"
  ], "Think about the cacao tree and crystals."));
  b.push(L("Bias and drape", [
    "The bias|📐|The <b>bias</b> runs at a 45 degree angle to the lengthwise and crossgrain threads. Fabric cut on the bias has the most stretch.",
    "Drape|👗|<b>Drape</b> is how fabric hangs. Soft fabrics such as rayon and silk drape well. Stiff fabrics like denim hold a shape. Bias-cut skirts and dresses swing and flow.",
    "Using bias|🧵|<b>Bias tape</b> is a strip cut on the bias that bends around curves, so it is used to finish necklines and armholes. Bias garments can stretch if hung, so lay them flat."
  ], [
    "At what angle is the bias?|45 degrees|📐||90 degrees,10 degrees",
    "Which direction has the most stretch?|bias|🧵||lengthwise grain,selvage",
    "What is drape?|how fabric hangs|👗||how fabric is washed,how thick thread is",
    "Why is bias tape used on curves?|it bends smoothly|🧵||it is stiff,it is sticky",
    "Which fabric drapes well?|silk|✨||canvas,cardboard",
    "How should you store a bias-cut dress?|flat|📦||hung by the shoulders for years,rolled in a ball",
    "Which fabric is stiff?|denim|👖||rayon,silk",
    "Bias-cut skirts do what?|swing and flow|💃||stand rigid,never move"
  ], "Think about the angle of the cut."));
  b.push(L("Knitting and crochet", [
    "Two crafts|🧶|<b>Knitting</b> uses two needles and holds many loops at once. <b>Crochet</b> uses one hook and works one loop at a time. Both turn yarn into stretchy fabric.",
    "Basic stitches|🪡|Knit and purl are the two basic knit stitches. Alternating them in rows makes <b>ribbing</b> that stretches, used for cuffs. Stockinette is knit rows then purl rows.",
    "Gauge|📏|<b>Gauge</b> is how many stitches fit in one inch. Knit a small swatch and measure it before starting, so the finished piece is the right size."
  ], [
    "How many hooks does crochet use?|one|🪝||two,three",
    "How many needles does knitting commonly use?|two|🧶||one,five hundred",
    "What is gauge?|stitches per inch|📏||yarn color,needle length only",
    "Why make a gauge swatch?|to check the size before starting|🧪||to waste yarn,to dye the yarn",
    "What does ribbing do?|stretches well|🧦||stays flat and stiff,melts",
    "What are the two basic knit stitches?|knit and purl|🪡||hem and baste,pin and tuck",
    "Which is used for cuffs?|ribbing|🧦||satin weave,twill",
    "Which craft works one loop at a time?|crochet|🪝||knitting with many loops,weaving only"
  ], "Think about needles, hooks and loops."));
  b.push(G("Costing a sewn product", [
    "True cost|🧵|To price a handmade item, add the <b>materials</b> to the value of your <b>time</b>. Time is hours worked times an hourly pay rate you choose.",
    "Example|✏️|Materials $15 plus 2 hours at $10 an hour: 15 + 20 = <b>$35</b>.",
    "Profit|💵|Profit is the selling price minus the total cost."
  ], () => {
    const m = ri(8, 30), h = ri(2, 5), w = pick([8, 10, 12]);
    if (Math.random() < 0.55) return Q(`A bag has $${m} of materials and takes ${h} hours to sew. Your time is worth $${w} an hour. What is the total cost?`, m + h * w, "👜",
      "Cost is materials plus time.", "Multiply the hours by the hourly rate, then add the materials.",
      "Materials $12 plus 3 hours at $10: 12 + 30 = $42.");
    const cost = m + h * w, pr = cost + ri(5, 25);
    return Q(`A bag costs $${cost} to make and sells for $${pr}. What is the profit?`, pr - cost, "💵",
      "Profit is what is left after costs.", "Subtract the cost from the selling price.",
      "Sells for $50, cost $38: 50 - 38 = $12.");
  }));
  b.push(G("Deductibles and copays", [
    "Insurance words|🩺|A <b>premium</b> is what you pay regularly to have insurance. A <b>deductible</b> is what you pay first before insurance helps. A <b>copay</b> is a flat fee per visit.",
    "Example|✏️|A bill is $900 and the deductible is $300. You pay $300, and the insurer (if it covers the rest) pays 900 - 300 = <b>$600</b>.",
    "Tip|🖐️|A yearly cost is the monthly premium times 12."
  ], () => {
    const t = Math.random();
    if (t < 0.34) { const p = ri(10, 40) * 10; return Q(`Health insurance has a premium of $${p} a month. How much is that for a year?`, p * 12, "📅",
      "A year has 12 months.", "Multiply the monthly premium by 12.",
      "Premium $150 a month: 150 × 12 = $1800."); }
    if (t < 0.67) { const d = ri(2, 6) * 100, bill = d + ri(3, 12) * 100; return Q(`Your bill is $${bill}. Your deductible is $${d}. After you pay the deductible, the insurer covers the rest. How much does the insurer pay?`, bill - d, "🧾",
      "You pay the deductible first.", "Subtract the deductible from the bill.",
      "Bill $700, deductible $200: 700 - 200 = $500."); }
    const c = pick([20, 25, 30, 40]), v = ri(2, 6);
    return Q(`Your copay is $${c} per visit. You go ${v} times. How much copay do you pay in all?`, c * v, "🩺",
      "Each visit has the same fee.", "Multiply the copay by the number of visits.",
      "Copay $20, 3 visits: 20 × 3 = $60.");
  }));
  b.push(G("Costs of a car", [
    "Beyond the price|🚗|Owning a car costs more than the purchase: <b>payment</b>, <b>insurance</b>, <b>gas</b>, repairs and parking all add up each month.",
    "Gas math|⛽|Miles ÷ miles-per-gallon = gallons used. Gallons × price per gallon = gas cost. 300 miles at 30 mpg uses 10 gallons.",
    "Tip|🖐️|Add all monthly costs to see the true cost of owning a car."
  ], () => {
    if (Math.random() < 0.5) {
      const p = ri(15, 30) * 10, i = ri(8, 20) * 10, g = ri(5, 12) * 10;
      return Q(`A car costs $${p} for the payment, $${i} for insurance and $${g} for gas each month. What is the monthly total?`, p + i + g, "🚗",
        "Add every cost.", "Add the payment, insurance and gas amounts.",
        "$200 + $100 + $60 = $360 a month.");
    }
    const mpg = pick([20, 25, 30]), gal = ri(2, 12), price = ri(3, 5);
    return Q(`A car drives ${mpg * gal} miles and gets ${mpg} miles per gallon. Gas costs $${price} a gallon. What does the gas cost?`, gal * price, "⛽",
      "First find how many gallons were used.", "Divide miles by mpg to get gallons, then multiply by the price.",
      "150 miles at 30 mpg is 5 gallons. At $4 a gallon: 5 × 4 = $20.");
  }));
  b.push(G("Mortgage interest", [
    "Borrowing for a home|🏠|A <b>mortgage</b> is a loan to buy a home. You pay back the <b>principal</b> (amount borrowed) plus <b>interest</b> (the cost of borrowing).",
    "Example|✏️|Borrow $100,000 at 5% interest. First-year interest is about 100,000 × 0.05 = <b>$5000</b>.",
    "Long loans|📆|A 30-year mortgage has 30 × 12 = 360 monthly payments. Longer loans mean smaller payments but more interest overall."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const p = ri(10, 30) * 10000, r = pick([3, 4, 5, 6]); return Q(`You borrow $${p} at ${r}% a year. About how much interest is that for the first year?`, p * r / 100, "🏠",
      "Interest is a percent of the amount borrowed.", `Multiply the amount by ${r} and divide by 100.`,
      "Borrow $200,000 at 4%: 200000 × 4 ÷ 100 = $8000."); }
    if (t < 0.7) { const y = ri(15, 30); return Q(`A mortgage lasts ${y} years with monthly payments. How many payments is that?`, y * 12, "📆",
      "There is one payment each month.", "Multiply the years by 12.",
      "A 10 year loan has 10 × 12 = 120 payments."); }
    const m = ri(3, 12) * 100;
    return Q(`A loan has $${m * 12} of interest in a year. About how much is that per month?`, m, "🗓️",
      "Share the year across its months.", "Divide the yearly interest by 12.",
      "$2400 a year ÷ 12 = $200 a month.");
  }));
  b.push(G("Retirement and the employer match", [
    "Saving for later|🏦|A <b>retirement account</b> such as a 401(k) holds savings for when you stop working. Many employers add a <b>match</b>: free money added when you contribute.",
    "Example|✏️|If you put in $50 and the employer matches dollar for dollar, you get 50 + 50 = <b>$100</b>.",
    "Why start early|⏳|Money invested early has many years to grow, so even small amounts matter."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const c = ri(2, 12) * 10; return Q(`You put $${c} in your retirement account and your employer matches dollar for dollar. How much is added in all?`, c * 2, "🏦",
      "The employer adds the same amount you add.", "Add your amount to the matching amount.",
      "You add $30 and the employer matches $30: total $60."); }
    if (t < 0.7) { const c = ri(2, 12) * 20; return Q(`Your employer matches 50% of your $${c} contribution. How much does the employer add?`, c / 2, "🤝",
      "50 percent means half.", "Divide your contribution by 2.",
      "You put in $80, the employer adds half: $40."); }
    const s = ri(2, 6) * 10000, r = pick([3, 5]);
    return Q(`Your salary is $${s}. You contribute ${r}% of it. How many dollars is that in a year?`, s * r / 100, "💼",
      "Find a percent of the salary.", `Multiply the salary by ${r} and divide by 100.`,
      "Salary $40,000 at 4%: 40000 × 4 ÷ 100 = $1600.");
  }));
  b.push(G("Emergency funds", [
    "A safety cushion|🛟|An <b>emergency fund</b> is savings for surprises like a car repair or a lost job. A common goal is three to six months of living expenses.",
    "Example|✏️|If your expenses are $1500 a month, a three-month fund is 1500 × 3 = <b>$4500</b>.",
    "Keep it handy|🏧|Keep it in a savings account you can reach quickly, and use it only for real emergencies."
  ], () => {
    const e = ri(8, 25) * 100;
    const t = Math.random();
    if (t < 0.4) { const k = pick([3, 4, 6]); return Q(`Your monthly expenses are $${e}. How much is a ${k}-month emergency fund?`, e * k, "🛟",
      "Multiply by the number of months.", "Monthly expenses times the number of months.",
      "Expenses $1000, 4 months: 1000 × 4 = $4000."); }
    if (t < 0.7) { const k = ri(2, 6); return Q(`You have $${e * k} saved and your expenses are $${e} a month. How many months does it cover?`, k, "🗓️",
      "See how many times the monthly cost fits into the savings.", "Divide the savings by the monthly expenses.",
      "$3000 saved, $1000 a month: 3000 ÷ 1000 = 3 months."); }
    const sv = ri(1, 4) * 500, goal = sv + ri(2, 8) * 500;
    return Q(`Your goal is $${goal} and you have saved $${sv}. How much more do you need?`, goal - sv, "🎯",
      "Compare the goal with what you have.", "Subtract what you saved from the goal.",
      "Goal $3000, saved $1000: 3000 - 1000 = $2000.");
  }));
  b.push(L("Caring for older adults", [
    "Aging|👵|As people age, they may move slower, hear or see less well, or take several medicines. Most want to stay independent and respected.",
    "Safe homes|🏠|Falls are a big risk. Good lighting, grab bars in bathrooms, no loose rugs, and clear walkways help older adults stay safe at home.",
    "Support|🤝|Listen patiently, speak clearly, include them in decisions, and visit often. A pill organizer helps with medicine. Staying connected with friends and family protects health."
  ], [
    "What helps prevent falls at home?|grab bars and good lighting|💡||polished slippery floors,piles of loose rugs",
    "Why use a pill organizer?|to take medicines on time|💊||to hide the medicine,to make pills bigger",
    "How should you speak to an older adult?|clearly and with respect|🗣️||loudly and bossy,only in whispers",
    "What is a big home risk for older adults?|falls|⚠️||boredom only,too much rain",
    "What do most older adults want?|independence|🧓||to be ignored,to be told everything",
    "Which helps health in later years?|staying connected with others|👥||staying alone always,skipping meals",
    "Which rug is safest?|a rug with a non-slip backing|🧶||a loose small rug,a rolled-up rug",
    "Where are grab bars most useful?|in the bathroom|🚿||on the ceiling,in the garden"
  ], "Think about safety and respect."));
  b.push(L("Resolving conflict", [
    "Conflict is normal|🗣️|Everyone disagrees sometimes. What matters is how we handle it. Stay calm, listen, and focus on the problem, not the person.",
    "I-statements|💬|An <b>I-statement</b> shares your feeling without blaming: 'I feel worried when the dishes pile up.' It works better than 'You never help.'",
    "Win-win|🤝|<b>Compromise</b> means each side gives a little. Take a break if you are too upset. Apologize sincerely when you are wrong. If you cannot agree, ask a trusted adult to help."
  ], [
    "What is an I-statement?|sharing your feeling without blaming|💬||blaming the other person,staying silent",
    "What should you focus on during conflict?|the problem|🎯||the person's faults,old mistakes",
    "What is a compromise?|each side gives a little|🤝||one side always wins,nobody talks",
    "What should you do if you are too upset?|take a break|⏸️||yell louder,slam the door",
    "Which is a good way to listen?|let the person finish|👂||interrupt often,roll your eyes",
    "Which is an I-statement?|I feel upset when plans change|💬||You always ruin plans,Everyone hates you",
    "Who can help if you cannot agree?|a trusted adult|🧑‍🏫||a stranger online,nobody",
    "What makes an apology sincere?|admitting what you did wrong|🙏||blaming someone else,saying it jokingly"
  ], "Calm and respectful talking solves more."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[9], b[10], b[11], b[13], b[16]]));
  b.push(MIX("Level 23 Challenge", [b[8], b[11], b[12], b[13], b[14], b[15], b[16], b[17], b[2], b[4], b[6], b[9]]));

  // ================= LEVEL 24 =================
  const c = [];
  c.push(L("Gut health and probiotics", [
    "Your microbiome|🦠|Trillions of microbes live in your gut. This community is your <b>microbiome</b>. It helps digest fiber and supports the immune system.",
    "Probiotics and prebiotics|🥛|<b>Probiotics</b> are live helpful bacteria in foods like yogurt, kefir and kimchi. <b>Prebiotics</b> are fibers, in foods like onions, garlic, bananas and oats, that feed the good microbes.",
    "Habits|🥦|Eating many different plants helps a varied microbiome. Antibiotics are important medicines, but they can disturb gut bacteria, so use them only as a doctor directs."
  ], [
    "What is the community of microbes in your gut called?|the microbiome|🦠||the pantry,the bloodstream",
    "What are probiotics?|live helpful bacteria|🥛||fiber that feeds bacteria,medicine to kill germs",
    "What are prebiotics?|fibers that feed good microbes|🍌||live yogurt cultures,sugar syrups",
    "Which food is a source of probiotics?|yogurt|🥛||white bread,plain rice",
    "Which food is a source of prebiotic fiber?|onions|🧅||ice cubes,cooking oil",
    "What can disturb gut bacteria?|antibiotics|💊||fiber,water",
    "What helps a varied microbiome?|eating many kinds of plants|🥦||eating one food only,skipping vegetables",
    "Which is a fermented food?|kimchi|🥬||fresh apple,plain water"
  ], "Think about the microbes in your digestive system."));
  c.push(L("Nutrient gaps in plant-based diets", [
    "Planning matters|🌱|A well-planned vegetarian or vegan diet can be healthy. A few nutrients need attention because they are scarce in plants.",
    "Key nutrients|💊|<b>Vitamin B12</b> is found reliably only in animal foods, so vegans need fortified foods or a supplement. Plant iron is absorbed better with vitamin C. <b>Omega-3</b> comes from flax, chia and walnuts. Calcium comes from fortified plant milks and tofu set with calcium.",
    "Protein|🫘|Beans, lentils, tofu, nuts and whole grains give protein. Eating a variety through the day covers all the amino acids."
  ], [
    "Which vitamin do vegans need from fortified food or a supplement?|B12|💊||vitamin C,vitamin K",
    "What helps the body absorb plant iron?|vitamin C|🍊||tea with the meal,sugar",
    "Which food gives plant omega-3?|flaxseed|🌱||white sugar,soda",
    "Which food can provide calcium?|fortified soy milk|🥛||plain water,candy",
    "Which gives protein?|lentils|🫘||lettuce only,fruit juice",
    "Can a well-planned vegan diet be healthy?|yes with planning|🌱||never,only for athletes",
    "Which food has natural B12?|eggs|🥚||apples,rice",
    "What covers all the amino acids?|a variety of plant proteins|🫘||eating the same one food,skipping protein"
  ], "Some nutrients are hard to get from plants alone."));
  c.push(L("Nutrition through life", [
    "Babies and toddlers|👶|Babies get all they need from breast milk or formula for about the first six months. Honey must not be given before age one, because it can carry spores that cause infant botulism.",
    "Teens and adults|🧑|Teens need calcium and protein for fast growth. During pregnancy, folate helps prevent birth defects of the baby's brain and spine. Adults need balanced meals.",
    "Older adults|👵|Older adults need fewer calories but just as many nutrients, and often more vitamin D, calcium and B12. They should stay hydrated even when not thirsty."
  ], [
    "Which food should babies under age one not have?|honey|🍯||mashed banana,iron-fortified cereal",
    "What do babies need in their first six months?|breast milk or formula|🍼||solid steak,coffee",
    "Which mineral helps teens build strong bones?|calcium|🦴||sodium,fat",
    "Which vitamin helps prevent birth defects in pregnancy?|folate|🤰||vitamin K,vitamin E",
    "Do older adults need fewer calories?|yes but the same nutrients|👵||no more calories than teens,no nutrients at all",
    "Which nutrient is often needed more as people age?|vitamin D|☀️||sugar,caffeine",
    "What should older adults do even when not thirsty?|drink fluids|🚰||skip water,only drink soda",
    "Why do teens need extra protein and calcium?|fast growth|📈||to stop growing,to lose bones"
  ], "Different ages have different nutrition needs."));
  c.push(L("Food miles and seasonal eating", [
    "Where food comes from|🚚|<b>Food miles</b> are the distance food travels from farm to plate. Fresh produce flown across the world uses a lot of fuel.",
    "Seasonal and local|🍅|Foods in season are picked at their best and often cost less. Farmers markets and CSAs (community supported agriculture, where you buy a share of a farm's harvest) shorten the trip.",
    "The full picture|🌍|Transport is only one part of a food's impact. How it is grown and wasted matters too. Frozen and canned produce can be fresh-picked and nutritious, and reduce waste."
  ], [
    "What are food miles?|distance food travels to you|🚚||calories counted per mile,miles of kitchen floor",
    "Why can seasonal produce cost less?|it is plentiful|🍓||it is rare,it is made in a factory",
    "What is a CSA?|a share of a local farm's harvest|🧺||a type of cooking pan,a cleaning product",
    "Where can you buy food that traveled less?|a farmers market|🧑‍🌾||only far away stores,vending machines only",
    "Is transport the only part of food's impact?|no|🌍||yes always,only on Mondays",
    "What is a benefit of frozen vegetables?|picked ripe and reduce waste|🧊||always spoiled,no nutrients",
    "When is a strawberry best in many places?|in its local season|🍓||in the middle of winter,never",
    "What does buying locally help?|shortens the trip|🚜||lengthens the trip,adds more packaging"
  ], "Think about distance and seasons."));
  c.push(G("Labor and prime cost", [
    "Restaurant costs|🍽️|<b>Labor cost percent</b> = labor cost ÷ sales × 100. <b>Prime cost</b> is food cost plus labor cost, the two biggest expenses. Managers watch it closely.",
    "Example|✏️|Labor $3000 on sales of $10,000: 3000 ÷ 10000 × 100 = <b>30%</b>.",
    "Prime cost|➕|Food $3200 plus labor $3000 gives a prime cost of $6200."
  ], () => {
    if (Math.random() < 0.55) {
      const pct = pick([25, 30, 35, 40]), s = ri(2, 10) * 5000, lab = s * pct / 100;
      return Q(`A restaurant had sales of $${s} and labor costs of $${lab}. What is the labor cost percent?`, pct, "👩‍🍳",
        "Compare labor to sales as a percent.", "Divide labor by sales, then multiply by 100.",
        "Labor $2500 on sales of $10,000: 2500 ÷ 10000 = 25%.");
    }
    const f = ri(20, 45) * 100, l = ri(20, 45) * 100;
    return Q(`In a week a restaurant spent $${f} on food and $${l} on labor. What is its prime cost?`, f + l, "➕",
      "Prime cost has two parts.", "Add the food cost and the labor cost.",
      "Food $2000 and labor $1500: prime cost is $3500.");
  }));
  c.push(L("Inventory: FIFO and par levels", [
    "FIFO|📦|<b>FIFO</b> means first in, first out. Put newer deliveries behind older stock and use the older items first. Label items with dates.",
    "Par levels|📋|A <b>par level</b> is the amount of an item you want on hand. When stock falls to the reorder point, you order enough to get back to par.",
    "Storage rules|🧊|Store food at least 15 centimeters (6 inches) off the floor, keep raw meat below ready-to-eat foods, and count stock regularly to spot waste and theft."
  ], [
    "What does FIFO stand for?|first in first out|📦||fresh in fresh out,fast in fast out",
    "Which stock do you use first with FIFO?|the oldest|📅||the newest,the most expensive",
    "What is a par level?|the amount you want on hand|📋||the price of a dish,the oven temperature",
    "Where should you put new deliveries?|behind older stock|📥||in front of older stock,on the floor",
    "How high off the floor should food be stored?|at least 15 centimeters|📏||1 centimeter,on the floor",
    "Why label food with dates?|to know which to use first|🏷️||to make it taste better,to hide it",
    "Why count inventory regularly?|to spot waste|🔢||to slow cooking,to cool the room",
    "Where is raw meat stored in a fridge?|on the bottom shelf|🥩||on the top shelf,above salad"
  ], "Old stock goes out before new stock."));
  c.push(L("Cooking fish and seafood", [
    "Cook gently|🐟|Fish has little connective tissue, so it cooks fast. It is done at 63 degrees Celsius (145 F) when it turns <b>opaque</b> and flakes easily with a fork. Overcooked fish is dry.",
    "Shellfish|🦐|Shrimp turn pink and curl into a C shape. Clams and mussels open when cooked; throw away any that stay shut. Shellfish are a top allergen.",
    "Buying and storing|🧊|Fresh fish should smell mild and clean, not strongly fishy, with firm flesh. Keep it on ice or in the coldest part of the fridge and cook it within a day or two. Choose lower-mercury fish like salmon and shrimp more often."
  ], [
    "What temperature makes fish safe?|63 degrees Celsius|🌡️||30 degrees Celsius,100 degrees Celsius",
    "How can you tell fish is done?|it flakes easily|🐟||it is hard as a rock,it floats",
    "What should you do with a clam that stays shut after cooking?|throw it away|🐚||eat it first,save it for later",
    "What color do cooked shrimp turn?|pink|🦐||blue,black",
    "How should fresh fish smell?|mild and clean|👃||very strong and sour,like soap",
    "Why does fish cook quickly?|little connective tissue|⏱️||it is very thick,it is frozen",
    "Where should fresh fish be stored?|on ice or in the coldest fridge spot|🧊||on the counter,near the stove",
    "What does overcooked fish become?|dry|🐟||juicier,sweeter"
  ], "Fish is tender and cooks fast."));
  c.push(L("Vegetable color and cooking", [
    "Pigments|🥬|Vegetable colors come from pigments. <b>Chlorophyll</b> makes greens. <b>Carotenoids</b> make orange and yellow. <b>Anthocyanins</b> make red, purple and blue.",
    "Changes when cooked|🥕|Acid turns green vegetables dull olive; overcooking does too. Carotenoids stay stable. Anthocyanins stay red in acid like vinegar and turn blue-green in baking soda.",
    "Keep them bright|🧊|Cook green vegetables briefly in boiling water, then <b>shock</b> them in ice water to stop cooking and keep the color. Add vinegar to red cabbage to keep it red."
  ], [
    "Which pigment makes vegetables green?|chlorophyll|🥦||carotenoid,anthocyanin",
    "Which pigment makes carrots orange?|carotenoid|🥕||chlorophyll,anthocyanin",
    "Which pigment makes red cabbage purple?|anthocyanin|🥬||chlorophyll,carotenoid",
    "What does acid do to green vegetables?|dulls them to olive|🥦||makes them brighter,turns them red",
    "How can you keep red cabbage red?|add vinegar|🍷||add baking soda,add more water",
    "What is shocking vegetables?|cooling them quickly in ice water|🧊||frying them,drying them",
    "Why shock green beans?|to keep them bright green|🫛||to burn them,to make them rubbery",
    "What happens to anthocyanins with baking soda?|they turn blue-green|🧪||they stay bright red,they vanish forever"
  ], "Pigments respond to acid and heat."));
  c.push(G("Reduction math", [
    "Reducing|🍲|To <b>reduce</b> a sauce, simmer it so water evaporates. It gets thicker and more flavorful. Reducing by half leaves half the volume.",
    "Example|✏️|Start with 4 cups and reduce by half: 4 ÷ 2 = <b>2 cups</b>. Reduce to a quarter: 4 ÷ 4 = 1 cup.",
    "Evaporated|💨|The water that left is the starting amount minus the amount left."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const s = ri(2, 10) * 2; return Q(`You simmer ${s} cups of stock until it is reduced by half. How many cups are left?`, s / 2, "🍲",
      "Half of the starting amount stays.", "Divide the starting cups by 2.",
      "8 cups reduced by half leaves 4 cups."); }
    if (t < 0.7) { const s = ri(1, 5) * 4; return Q(`A sauce starts at ${s} cups and is reduced to one quarter. How many cups are left?`, s / 4, "🥄",
      "One quarter means divide into four parts.", "Divide the starting cups by 4.",
      "12 cups reduced to a quarter leaves 3 cups."); }
    const s = ri(6, 12), e = ri(1, 5);
    return Q(`A sauce starts at ${s} cups and ends at ${s - e} cups. How many cups of water evaporated?`, e, "💨",
      "Compare the start with the end.", "Subtract the ending amount from the starting amount.",
      "From 10 cups to 7 cups: 10 - 7 = 3 cups evaporated.");
  }));
  c.push(L("Fair trade and ethical fashion", [
    "Behind the label|🏷️|Every garment passes through a <b>supply chain</b>: growing fiber, spinning, sewing and shipping. Workers deserve safe conditions and fair pay.",
    "Certifications|✅|<b>Fair Trade</b> certification promises fair prices and wages to farmers and workers. <b>GOTS</b> marks organic textiles. Companies that show where clothes are made are being <b>transparent</b>.",
    "What you can do|♻️|Buy fewer, better-made items, wear them longer, repair them and buy second-hand. Cotton uses a lot of water, so keeping clothes longer reduces that cost."
  ], [
    "What is a supply chain?|all the steps from fiber to store|🏭||a chain used for bikes,a store's sale rack",
    "What does Fair Trade certification promise?|fair prices and wages|✅||the lowest price,free clothes",
    "What does GOTS certify?|organic textiles|🌱||fast shipping,bright dyes",
    "What does transparent mean for a company?|it shows how and where things are made|🔍||it hides its factories,it sells see-through clothes",
    "Which habit helps the planet most?|wearing clothes longer|♻️||buying a new outfit weekly,throwing clothes away",
    "Why does cotton matter for water?|it needs a lot of water to grow|💧||it grows without water,it is made from rain only",
    "What is buying second-hand?|buying used clothes|🛍️||stealing clothes,buying very new items only",
    "What should workers get?|safe conditions and fair pay|👷||no breaks,unsafe rooms"
  ], "Think about the people and steps behind clothes."));
  c.push(L("From fiber to fabric", [
    "Steps|🧵|Fabric is made in stages: get the <b>fiber</b>, <b>spin</b> it into yarn, <b>weave or knit</b> the yarn into cloth, then <b>finish</b> it with dyeing and treatments.",
    "Fibers|🌾|Cotton bolls are picked and <b>ginned</b> to remove seeds. Wool is sheared from sheep, which does not hurt them. Linen comes from flax stems. Polyester is made from petroleum chemicals.",
    "Spinning|🌀|<b>Spinning</b> twists short fibers together into a long strong yarn. Twist makes yarn stronger."
  ], [
    "What is the first step in making fabric?|getting fiber|🌾||dyeing,hemming",
    "What does spinning do?|twists fibers into yarn|🌀||cuts cloth,paints cloth",
    "What is ginning?|removing seeds from cotton|🌱||dyeing wool,washing silk",
    "Linen comes from which plant?|flax|🌾||cotton,corn",
    "Polyester is made from what?|petroleum chemicals|🛢️||sheep wool,flax stems",
    "Which comes after making yarn?|weaving or knitting|🧶||picking cotton,shearing",
    "Does shearing hurt a sheep?|no|🐑||yes a lot,only in winter",
    "What does finishing include?|dyeing and treatments|🎨||growing the plant,planting seeds"
  ], "Follow the path from plant or chemical to cloth."));
  c.push(L("Garment construction order", [
    "Plan the order|📋|Sewing goes in a sensible order so each step is easy. Prepare first: pre-wash and press the fabric, cut the pieces and transfer the markings.",
    "Typical order|🧵|Stitch darts first, then sew shoulder and side seams. Attach collars and sleeves, add zippers or buttons, and make the <b>hem</b> last. <b>Press</b> each seam as you go.",
    "Handy tricks|🪡|<b>Baste</b> (long temporary stitches) to hold pieces together before sewing for real. <b>Staystitching</b> keeps curved edges from stretching. Try the garment on before hemming."
  ], [
    "What comes first when sewing a garment?|prepare and cut the fabric|✂️||sew the hem,add the buttons",
    "Which step usually comes last?|the hem|📏||the darts,pre-washing",
    "What is basting?|long temporary stitches|🪡||a type of fabric,a strong glue",
    "What does staystitching prevent?|stretching of curved edges|📐||fraying of buttons,shrinking of yarn",
    "When do you press?|after each seam|♨️||only before washing,never",
    "When should darts be stitched?|early before the seams are joined|🧵||after the hem,after wearing",
    "Why try the garment on before hemming?|to check the length and fit|👗||to dirty it,to dye it",
    "Which are joined before sleeves?|shoulder and side seams|👕||buttonholes,pockets only"
  ], "Order helps each step stay easy."));
  c.push(G("Capsule wardrobe", [
    "Mix and match|👚|A <b>capsule wardrobe</b> is a small set of clothes that all go together. The number of outfits is found by multiplying: tops × bottoms.",
    "Example|✏️|4 tops and 3 bottoms make 4 × 3 = <b>12</b> outfits. Add 2 pairs of shoes and it is 4 × 3 × 2 = 24 outfits.",
    "Budget|💵|Fewer, well-chosen pieces can save money and closet space."
  ], () => {
    const t = ri(3, 7), bt = ri(2, 5);
    if (Math.random() < 0.5) return Q(`A capsule wardrobe has ${t} tops and ${bt} bottoms that all match. How many outfits can you make?`, t * bt, "👚",
      "Pair each top with each bottom.", "Multiply the tops by the bottoms.",
      "3 tops and 3 bottoms make 3 × 3 = 9 outfits.");
    const s = ri(2, 3);
    return Q(`You have ${t} tops, ${bt} bottoms and ${s} pairs of shoes that all match. How many full outfits are possible?`, t * bt * s, "👟",
      "Each outfit has a top, a bottom and shoes.", "Multiply all three numbers.",
      "2 tops, 2 bottoms and 2 shoes: 2 × 2 × 2 = 8 outfits.");
  }));
  c.push(G("Income tax brackets", [
    "Marginal tax|🧾|With <b>tax brackets</b>, each slice of income is taxed at its own rate. Only the part inside a higher bracket is taxed at the higher rate.",
    "Example|✏️|In this made-up system: the first $10,000 is taxed at 10% and income above it at 20%. On $30,000: 1000 + (20,000 × 0.20 = 4000) = <b>$5000</b>.",
    "Deduction|📉|A <b>standard deduction</b> lowers the income that is taxed: taxable income = income - deduction."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const k = ri(1, 5), inc = 10000 + k * 10000; return Q(`Use this example system: the first $10000 is taxed at 10 percent and income above $10000 at 20 percent. What is the tax on $${inc}?`, 1000 + k * 2000, "🧾",
      "Tax the first slice and the rest separately.", "The first slice is taxed at 10 percent. Then take 20 percent of the income above the first slice.",
      "On $20,000: the first $10,000 gives $1000, and 20% of the other $10,000 is $2000, so $3000."); }
    if (t < 0.7) { const ded = ri(8, 14) * 1000, inc = ded + ri(5, 40) * 1000; return Q(`Your income is $${inc} and the standard deduction is $${ded}. What is the taxable income?`, inc - ded, "📉",
      "The deduction lowers the income that is taxed.", "Subtract the deduction from the income.",
      "Income $40,000, deduction $12,000: taxable income is $28,000."); }
    const owed = ri(10, 40) * 100, back = ri(2, 9) * 100;
    return Q(`Your employer withheld $${owed + back} but you owe only $${owed}. How much is your refund?`, back, "💵",
      "A refund is the extra you paid.", "Subtract the tax owed from the tax withheld.",
      "Withheld $2500, owed $2200: refund is $300.");
  }));
  c.push(G("College net price", [
    "Real cost|🎓|The <b>cost of attendance</b> includes tuition, housing, food and books. The <b>net price</b> is the cost minus grants and scholarships, which you do not repay.",
    "Example|✏️|Cost $24,000 minus $9,000 of grants gives a net price of <b>$15,000</b>.",
    "Loans|🏦|Loans must be repaid with interest, so borrow as little as possible. Savings and work income reduce what you need to borrow."
  ], () => {
    const cost = ri(15, 40) * 1000, gr = ri(3, 10) * 1000;
    const t = Math.random();
    if (t < 0.4) return Q(`A school costs $${cost} a year. A student gets $${gr} in grants and scholarships. What is the net price?`, cost - gr, "🎓",
      "Grants lower the price.", "Subtract the grants from the cost.",
      "Cost $20,000, grants $6,000: net price $14,000.");
    if (t < 0.7) { const sv = ri(1, 5) * 1000; return Q(`The net price is $${cost - gr}. The family has $${sv} in savings to put toward it. How much is left to cover?`, cost - gr - sv, "🏦",
      "Savings reduce what is left.", "Subtract the savings from the net price.",
      "Net price $12,000, savings $3,000: $9,000 left."); }
    const n = ri(2, 6) * 2000;
    return Q(`A net price of $${n * 2} is paid in two equal semesters. How much is each semester?`, n, "📅",
      "Share equally between two.", "Divide the net price by 2.",
      "$10,000 in two equal parts is $5,000 each.");
  }));
  c.push(L("Investing basics", [
    "Ways to grow money|📈|A <b>stock</b> is a small share of ownership in a company. A <b>bond</b> is a loan to a company or government that pays interest. Savings accounts are the safest but grow slowly.",
    "Risk and return|⚖️|Higher possible returns usually come with higher risk, which means you can lose money. <b>Diversification</b> means spreading money across many investments. An <b>index fund</b> holds many stocks at once and has low fees.",
    "Time|⏳|Time in the market helps because growth compounds. Be careful of anyone promising quick, guaranteed riches, and always learn the fees. This is general education, not personal advice."
  ], [
    "What is a stock?|a share of ownership in a company|📈||a loan to a company,a savings account",
    "What is a bond?|a loan that pays interest|🏛️||a share of ownership,a type of coin",
    "What does diversification mean?|spreading money across many investments|🧺||putting everything in one place,hiding money at home",
    "What usually comes with higher possible returns?|higher risk|⚖️||no risk,guaranteed gains",
    "What does an index fund hold?|many stocks at once|📊||one single stock,only cash",
    "Why does starting early help?|growth compounds over time|⏳||money shrinks over time,fees disappear",
    "How should you treat promises of quick guaranteed riches?|be careful|🚩||trust them,send money fast",
    "Which is usually the safest place for money?|a savings account|🏦||a single risky stock,a lottery ticket"
  ], "Think about risk and time."));
  c.push(L("Scams and contracts", [
    "Spot a scam|🚩|Red flags: pressure to act now, requests for gift cards or wire transfers, offers that are too good to be true, and requests for passwords or codes. Real organizations do not ask for these.",
    "If you suspect one|🛑|Stop, do not click links or send money, and talk to a trusted adult. Contact the real company using a number you find yourself, not one in the message. Report it.",
    "Contracts|📝|A <b>contract</b> is a binding agreement. Read all of it before signing, including fees and how to cancel. Never sign something you do not understand, and ask a trusted adult to read it too."
  ], [
    "Which is a scam red flag?|pressure to act right now|🚩||a friendly hello,a clear receipt",
    "Which payment method do scammers often demand?|gift cards|🎁||a check from your own bank,a clear invoice",
    "What should you do about a suspicious message?|do not click and tell a trusted adult|🛑||click the link fast,send your password",
    "What should you read before signing a contract?|all of it|📝||only the title,nothing",
    "How can you contact a real company safely?|use a number you find yourself|☎️||use the number in the message,reply to the message",
    "Do real organizations ask for your password?|no|🔐||yes always,only on weekends",
    "What does 'too good to be true' suggest?|it may be a scam|🚩||it must be real,it is a gift",
    "Who can help read a contract?|a trusted adult|🧑‍🏫||a stranger online,no one"
  ], "Pressure and secrecy are warning signs."));
  c.push(G("Pet care costs", [
    "A big responsibility|🐕|A pet needs food, vet care, supplies and time for years. Before getting one, work out the yearly cost.",
    "Example|✏️|Food is $40 a month. 40 × 12 = <b>$480</b> a year. Add a vet visit of $120 and supplies of $60 and the total is 480 + 120 + 60 = $660.",
    "Weekly to yearly|📅|A weekly cost times 52 gives the yearly cost."
  ], () => {
    const t = Math.random();
    if (t < 0.34) { const f = ri(2, 10) * 10; return Q(`Pet food costs $${f} a month. What is the cost for a year?`, f * 12, "🐕",
      "A year has 12 months.", "Multiply the monthly cost by 12.",
      "$30 a month: 30 × 12 = $360."); }
    if (t < 0.67) { const f = ri(20, 50) * 10, v = ri(8, 20) * 10, s = ri(3, 10) * 10; return Q(`In one year a pet needs $${f} of food, $${v} of vet care and $${s} of supplies. What is the total?`, f + v + s, "🐈",
      "Add the three parts.", "Add food, vet care and supplies.",
      "$300 + $100 + $50 = $450."); }
    const w = ri(2, 10);
    return Q(`Cat litter costs $${w} a week. What does it cost for a year of 52 weeks?`, w * 52, "🐱",
      "Weekly cost repeats all year.", "Multiply the weekly cost by 52.",
      "$3 a week: 3 × 52 = $156.");
  }));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[9], c[10], c[12], c[13], c[15]]));
  c.push(MIX("Level 24 Challenge", [c[8], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[2], c[5], c[6], c[9]]));

  Object.assign(HOMEEC_LEVELS, { 22: a, 23: b, 24: c });
})();
