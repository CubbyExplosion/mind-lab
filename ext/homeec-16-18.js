// ext/homeec-16-18.js  Home Economics & Cooking levels 16-18
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

  // ================= LEVEL 16 =================
  const a = [];
  a.push(L("Marinades and brines", [
    "Marinade|🥣|A <b>marinade</b> is a flavorful liquid that food soaks in before cooking. It often has an acid (like lemon juice or vinegar), oil and spices.",
    "Brine|🧂|A <b>brine</b> is salty water. Soaking meat in brine helps it stay juicy when cooked.",
    "Stay safe|🧊|Always marinate food in the <b>refrigerator</b>, never on the counter. Do not use leftover marinade from raw meat as a sauce unless you boil it first."
  ], [
    "Where should food marinate?|in the refrigerator|🧊|Bacteria grow fast at room temperature.|on the counter,in the sunshine",
    "What is a brine?|salty water|🧂|Think of the name of a pickle liquid.|sweet syrup,hot oil",
    "What does a brine help meat do?|stay juicy|🍗||turn blue,become frozen",
    "Which ingredient in a marinade is an acid?|lemon juice|🍋||olive oil,black pepper",
    "Why not soak food in an acid marinade for days?|the texture can turn mushy|⏰||it turns into candy,it gets colder",
    "What must you do before using leftover raw-meat marinade as a sauce?|boil it first|♨️||nothing at all,freeze it",
    "A marinade usually adds what to food?|flavor|🥣||bones,electricity",
    "Which tool is good for marinating food in the fridge?|a covered dish or sealed bag|🥡||an open bowl on the counter,a hot pan"
  ], "Think about both flavor and food safety."));
  a.push(L("Knife safety and grips", [
    "The claw grip|🖐️|Curl your fingertips under, like a claw, on the food you are cutting. Your knuckles guide the flat of the blade and your fingertips stay safe.",
    "A sharp knife is safer|🔪|A <b>dull</b> knife slips more easily. A sharp knife cuts with less push. Keep the cutting board steady with a damp towel under it.",
    "Handle with care|🧽|Carry a knife with the tip pointing down, close to your side. Never try to catch a falling knife. Wash knives by hand, one at a time, not in a sink full of soapy water."
  ], [
    "What is the safe way to hold the food you are cutting?|curl your fingertips under|🖐️|Think of a claw.|keep your fingers flat and straight,hold it with your thumb on top",
    "Which knife is safer to use?|a sharp knife|🔪|It needs less force.|a dull knife,a bent knife",
    "What can you put under a cutting board to keep it from sliding?|a damp towel|🧻||a sheet of ice,a pan lid",
    "How should you carry a knife?|tip pointing down at your side|🔪||tip pointing up in front of you,swinging it in one hand",
    "What should you do if a knife falls?|step back and let it fall|⚠️||try to catch it,kick it away",
    "How should you wash a knife?|by hand and carefully|🧽|Do not hide it in the soap bubbles.|toss it in a sink of soapy water,leave it on the counter dirty",
    "Which part of the hand guides the side of the blade in a claw grip?|the knuckles|🖐️||the palm,the wrist",
    "Why does a dull knife cause accidents?|it slips more easily|⚠️||it is too shiny,it is too light"
  ], "Safety first when cutting."));
  a.push(L("Deglazing and pan sauces", [
    "The fond|🍳|When you sear meat or vegetables, tasty brown bits stick to the pan. These bits are called the <b>fond</b> (French for 'base'). They are full of flavor.",
    "Deglaze|🥄|To <b>deglaze</b>, pour liquid such as broth, juice or vinegar into the hot pan and scrape up the brown bits with a spoon. The liquid melts the flavor into a sauce.",
    "Finish it|🧈|Let the sauce simmer so it <b>reduces</b> and gets thicker. Stir in a little butter or herbs at the end. Taste before adding salt."
  ], [
    "What are the brown bits stuck to the pan called?|fond|🍳|It is a French word.|syrup,foam",
    "What does it mean to deglaze a pan?|add liquid and scrape up the brown bits|🥄||wash the pan with soap,burn the food on purpose",
    "Which liquid works well for deglazing?|broth|🍲||dry flour,melted plastic",
    "Why do cooks keep the brown bits?|they are full of flavor|😋||they are decoration,they are the dishes",
    "What do you do after deglazing to make the sauce thicker?|simmer it to reduce it|♨️||freeze it,add ice",
    "What tool helps scrape the pan?|a wooden spoon|🥄||a balloon,a paper towel",
    "When is a good time to taste for salt in a pan sauce?|before adding more salt|🧂|Reducing makes it saltier.|never,only before cooking",
    "Which tasty finish can go in a pan sauce at the end?|a little butter or fresh herbs|🌿||a handful of sand,a cup of ice"
  ], "A pan sauce starts from what stays in the pan."));
  a.push(L("Ripeness and produce storage", [
    "Ethylene|🍌|Some fruits, like bananas and apples, give off a gas called <b>ethylene</b> that makes nearby produce ripen faster. A paper bag traps it to ripen hard fruit.",
    "Where to store|🥔|Tomatoes taste best at room temperature. Keep potatoes and onions in a cool, dark, dry place, but not touching each other. Wrap leafy greens in a paper towel in the fridge.",
    "Wash later|🫐|Berries last longer if you wash them right before eating, not before storing. Moisture makes mold grow."
  ], [
    "What gas makes fruit ripen faster?|ethylene|🍌|It rhymes a bit with a gas used in balloons.|oxygen only,helium",
    "How can you ripen a hard avocado quickly?|put it in a paper bag|🥑||put it in the freezer,wash it with soap",
    "Where do potatoes keep best?|a cool dark dry place|🥔||in the sunny window,in a wet bowl",
    "When should you wash berries?|right before eating them|🫐|Moisture grows mold.|a week before storing,never,they are always clean",
    "Which fruit gives off lots of ethylene?|banana|🍌||blueberry,cherry",
    "Where do tomatoes taste best?|at room temperature|🍅||frozen solid,in a cold dark freezer",
    "How do you keep leafy greens fresh in the fridge?|wrap them in a paper towel|🥬||soak them in a bowl of water for days,leave them in the sun",
    "Why should onions and potatoes be stored apart?|they can spoil each other faster|🧅||they get lonely,they turn into apples"
  ], "Think about gas, moisture and temperature."));
  a.push(G("Food cost percentage", [
    "Food cost percent|🧾|Restaurants track <b>food cost percent</b>: the cost of the ingredients divided by the price the dish sells for, times 100.",
    "Example|✏️|A bowl of soup sells for $10 and the ingredients cost $3. 3 ÷ 10 = 0.30, so the food cost is <b>30%</b>.",
    "Going backward|🔁|If the food cost is 25% and the price is $20, find 25% of 20: 20 ÷ 4 = <b>$5</b>."
  ], () => {
    let P, pct, c;
    do { P = pick([10, 20, 25, 40, 50]); pct = pick([10, 20, 25, 30, 40, 50]); c = P * pct / 100; } while (c % 1);
    if (Math.random() < 0.5) return Q(`A dish sells for $${P}. The ingredients cost $${c}. What percent of the price is the food cost?`, pct, "🧾",
      "Compare the ingredient cost to the selling price.", "Divide the food cost by the price, then multiply by 100 to make a percent.",
      "A salad sells for $20 and the food costs $5. 5 ÷ 20 = 0.25, so it is 25%.");
    return Q(`A dish sells for $${P} and its food cost is ${pct}%. How many dollars do the ingredients cost?`, c, "🧾",
      "You need a percent of the selling price.", "Change the percent to a fraction or decimal, then multiply by the price.",
      "A sandwich sells for $10 with a 40% food cost. 40% of 10 is 4, so $4.");
  }));
  a.push(L("Fiber and whole grains", [
    "What is fiber?|🌾|<b>Fiber</b> is the part of plant foods your body cannot fully digest. It helps digestion and keeps you feeling full. Only plant foods have fiber.",
    "Whole vs refined|🍞|A <b>whole grain</b> keeps all three parts: the bran, the germ and the endosperm. <b>Refined</b> grains lose the bran and germ, and most of the fiber with them.",
    "Good sources|🫘|Beans, lentils, oats, brown rice, whole wheat bread, fruits with skin and vegetables all give fiber. Drink water as you eat more fiber."
  ], [
    "Which foods contain fiber?|plant foods|🌾||meat and milk,only candy",
    "Which grain part is removed when grain is refined?|the bran|🌾||the water,the box",
    "Which bread has more fiber?|whole wheat bread|🍞|Look for the word whole.|white bread,a plain cracker",
    "Which of these is a whole grain?|oats|🥣||white sugar,butter",
    "What does fiber help with?|digestion|🫘||growing taller overnight,glowing in the dark",
    "Which food is a good source of fiber?|lentils|🫘||chicken broth,cheese",
    "How many parts does a whole grain keep?|three|🌾|Bran, germ and endosperm.|one,seven",
    "What should you drink more of when you eat more fiber?|water|💧||soda only,nothing"
  ], "Fiber comes from plants."));
  a.push(L("Minerals in food", [
    "What are minerals?|🧂|<b>Minerals</b> are nutrients from the earth that your body needs in small amounts. They are in many foods.",
    "Four to know|🦴|<b>Calcium</b> builds strong bones and teeth. <b>Iron</b> helps blood carry oxygen. <b>Potassium</b> helps muscles and the heart. <b>Zinc</b> helps the body heal.",
    "Pair them well|🍊|Vitamin C from foods like oranges helps your body take in iron from plant foods like beans and spinach. Too much sodium (salt) is not good for the heart."
  ], [
    "Which mineral builds strong bones and teeth?|calcium|🦴|Milk and yogurt have lots of it.|iron,sodium",
    "Which mineral helps blood carry oxygen?|iron|🩸|Beans and lean meat have it.|calcium,potassium",
    "Which food is a good source of potassium?|banana|🍌||plain butter,soda",
    "Which vitamin helps you take in iron from beans?|vitamin C|🍊||vitamin Z,vitamin Sugar",
    "Which mineral can be too high in salty snacks?|sodium|🧂||iron,calcium",
    "Which food gives calcium?|yogurt|🥛||apple juice with no added minerals,plain rice cakes",
    "Which mineral helps the body heal?|zinc|🩹||sodium,butter",
    "Are minerals needed in small amounts?|yes|🧂|Think of the word trace.|no and in huge amounts,only on holidays"
  ], "Match the mineral to its job."));
  a.push(G("Baker's percentages", [
    "Flour is 100%|🍞|Bakers write recipes as percents of the <b>flour weight</b>. Flour is always <b>100%</b>. Water, salt and yeast are percents of the flour.",
    "Example|✏️|With 500 g of flour, a dough with <b>70%</b> water has 500 x 0.70 = <b>350 g</b> of water.",
    "Going backward|🔁|If 60% water is 300 g, then the flour is 300 ÷ 0.60 = <b>500 g</b>."
  ], () => {
    const F = pick([200, 300, 400, 500, 600, 1000]), r = Math.random();
    if (r < 0.4) { const p = pick([50, 60, 65, 70, 75]); return Q(`A bread dough uses ${F} g of flour. The water is ${p}% of the flour weight. How many grams of water?`, F * p / 100, "🍞",
      "The percent is out of the flour weight.", "Change the percent to a decimal and multiply by the grams of flour.", "A dough with 400 g of flour and 50% water uses half as much water: 200 g."); }
    if (r < 0.7) { const p = pick([50, 60, 70, 75]); return Q(`The water in a dough is ${p}% of the flour weight. The recipe uses ${F * p / 100} g of water. How many grams of flour?`, F, "🍞",
      "The water is a smaller number than the flour.", "Divide the water weight by the percent written as a decimal.", "If 50% water is 150 g, then flour is 150 ÷ 0.50 = 300 g."); }
    const F2 = pick([500, 600, 1000, 1500, 2000]); return Q(`A bread recipe uses salt at 2% of the flour weight. With ${F2} g of flour, how many grams of salt?`, F2 * 2 / 100, "🧂",
      "Find 2 percent of the flour weight.", "Find 1% by dividing by 100, then double it.", "With 500 g flour, 1% is 5 g, so 2% is 10 g.");
  }));
  a.push(L("Choosing fabric for a project", [
    "Match the fabric|🧵|Think about what the project needs. <b>Weight</b> is how thick the fabric is. <b>Drape</b> is how it hangs. <b>Stretch</b> is how much it gives.",
    "Good matches|👖|Sturdy <b>denim</b> suits jeans and tote bags. Soft <b>knit</b> with stretch suits T-shirts. Light <b>cotton</b> suits summer shirts. <b>Fleece</b> is warm.",
    "Before you sew|🧺|<b>Pre-wash</b> fabric so it shrinks before you cut it. If the print has a direction, like trees growing up, cut all pieces facing the same way."
  ], [
    "Which fabric is a good choice for a sturdy tote bag?|denim|👜||tissue paper,gauze",
    "Which fabric stretches, so it suits a T-shirt?|knit|👕||stiff canvas,woven denim",
    "Why pre-wash fabric before sewing?|so it shrinks before you cut|🧺|Think about what happens in the washer later.|so it smells like the store,to make it bigger",
    "What does drape mean?|how the fabric hangs|🧣||how much the fabric costs,how loud it is",
    "Which fabric is warm for a winter blanket?|fleece|🧸||thin gauze,mesh",
    "A print has arrows pointing up. What should you do when cutting?|cut all pieces facing the same way|⬆️||cut pieces in any direction,cut only one piece",
    "Which is lightweight and cool for summer?|light cotton|☀️||thick wool,heavy canvas",
    "What does fabric weight mean?|how thick and heavy it is|⚖️||its color,its smell"
  ], "Pick fabric to fit the job."));
  a.push(L("Needles and thread", [
    "Needle sizes|🪡|Sewing machine needles come in sizes. A <b>higher number</b> means a thicker needle, used for heavy fabric. Use thin ones for thin fabric.",
    "Needle types|🧵|A <b>ballpoint</b> needle slides between the loops of knit fabric. A <b>denim</b> needle is strong for thick fabric. Change your needle often, because a dull or bent needle skips stitches.",
    "Thread|🎨|All-purpose <b>polyester</b> thread works for most projects. Match the thread color to the fabric, or pick one a little darker. If the stitches pucker, check the thread tension."
  ], [
    "What does a higher needle size number mean?|a thicker needle|🪡||a shorter needle,a pink needle",
    "Which needle is best for knit fabric?|ballpoint|👕||denim needle,sharp pointed leather needle",
    "What should you do when a needle is dull or bent?|change it|⚠️||keep sewing,paint it",
    "What can cause puckered stitches?|wrong thread tension|🧵||too much music,a loud room",
    "If a thread color does not match exactly, which is better?|one a little darker|🎨|Darker blends in better.|a bright neon one,a lighter shade of white",
    "Which thread works for most sewing projects?|all-purpose polyester|🧵||fishing line,yarn",
    "Which needle is strong enough for thick denim?|denim needle|👖||ballpoint needle,tiny embroidery needle",
    "A thin silky fabric needs what kind of needle?|a thin one|🪡||a very thick one,a nail"
  ], "Fit the needle and thread to the fabric."));
  a.push(L("Repair and upcycle clothes", [
    "Repair first|🧷|Fixing a small problem costs far less than buying new. Sew on a loose <b>button</b>, close a <b>seam</b> that opened, or add a <b>patch</b> over a hole.",
    "Darning|🧦|<b>Darning</b> means weaving thread across a hole in a sock or sweater to fill it. A new zipper can save a favorite jacket.",
    "Upcycle|♻️|To <b>upcycle</b> is to turn something old into something new and useful, like jeans into shorts or a T-shirt into a tote bag. Clothes still in good shape can be donated."
  ], [
    "What does upcycle mean?|turn old things into something new and useful|♻️||throw things in the trash,buy more things",
    "What can you add over a small hole in jeans?|a patch|🧷||a balloon,a sticker of ice",
    "Which repair is for a hole in a sock?|darning|🧦||ironing only,bleaching",
    "What can an old T-shirt become?|a tote bag|👜||a car,a refrigerator",
    "If clothes are still in good shape but do not fit, what can you do?|donate them|🎁||bury them,burn them",
    "Why is repairing often a good idea?|it costs less than buying new|💰||it costs more,it makes holes bigger",
    "What do you do if a button is loose?|sew it back on|🔘||throw out the shirt,glue it to the wall",
    "Which can old jeans become?|shorts|👖||a cloud,a book of paper"
  ], "Repair, reuse, and give away."));
  a.push(G("Paychecks and deductions", [
    "Gross and net|💵|<b>Gross pay</b> is all the money earned. <b>Deductions</b>, like taxes, are taken out. <b>Net pay</b> is what you take home: gross minus deductions.",
    "Example|✏️|Earning $15 an hour for 20 hours gives 15 x 20 = $300 gross. If 10% is taken out, that is $30. Net pay is 300 - 30 = <b>$270</b>.",
    "Why it matters|🧾|Plan your budget with your <b>net</b> pay, because that is the money you actually get."
  ], () => {
    let r, h, pct, gross;
    do { r = pick([10, 12, 15, 18, 20]); h = pick([10, 15, 20, 25, 30, 40]); pct = pick([10, 20]); gross = r * h; } while ((gross * pct / 100) % 1);
    const ded = gross * pct / 100;
    if (Math.random() < 0.5) return Q(`A worker earns $${r} an hour and works ${h} hours. What is the gross pay in dollars?`, gross, "💵",
      "Gross pay is the total before anything is taken out.", "Multiply the hourly pay by the number of hours.", "$10 an hour for 5 hours is 10 x 5 = $50.");
    return Q(`A worker has $${gross} gross pay. ${pct}% is taken out for taxes. What is the net pay in dollars?`, gross - ded, "💵",
      "Net pay is less than gross pay.", "Find the percent amount first, then subtract it from the gross pay.", "Gross $200 with 10% taken out: 10% is $20, so net is 200 - 20 = $180.");
  }));
  a.push(L("Needs, wants and trade-offs", [
    "Needs and wants|🛒|A <b>need</b> is something you must have to live and stay healthy, like food, water, shelter and clothes. A <b>want</b> is something nice to have, like a new game.",
    "Trade-offs|⚖️|You can't buy everything, so you choose. When you choose one thing, you give up another. What you give up is the <b>opportunity cost</b>.",
    "Decide|🤔|Ask: Do I need it? What will I give up? Can I wait or save for it? Comparing choices helps you spend wisely."
  ], [
    "What is opportunity cost?|the next best thing you give up|⚖️||the price tag only,a discount",
    "Which is a need?|food|🍎||a new video game,a fancy toy",
    "Which is a want?|a new video game|🎮||water,a warm coat in winter",
    "You spend $20 on a game, so you can't buy a book. What is the opportunity cost?|the book|📚||the game,nothing",
    "Why do we make trade-offs?|we can't buy everything|🛒||we have unlimited money,stores are closed",
    "Which question helps you decide whether to buy something?|Do I need it?|🤔||Is it shiny?,Is my friend buying it?",
    "Is a winter coat in a cold place a need or a want?|a need|🧥||a want,neither",
    "What is a good way to afford a want?|save up for it|🐷||ignore your needs,spend it all today"
  ], "Choosing one thing means giving up another."));
  a.push(G("Water use math", [
    "Water adds up|💧|Showers, faucets and toilets use a lot of water. You can multiply a rate by time to find the total, and a small leak adds up over days.",
    "Example|✏️|A shower uses 2 gallons a minute. A 5-minute shower uses 2 x 5 = <b>10 gallons</b>.",
    "Savings|🚿|Shorter showers save water: 3 fewer minutes at 2 gallons a minute saves <b>6 gallons</b> each shower."
  ], () => {
    const r = pick([2, 3, 4]), m = ri(4, 12), r2 = Math.random();
    if (r2 < 0.4) return Q(`A shower uses ${r} gallons of water each minute. How many gallons are used in a ${m}-minute shower?`, r * m, "🚿",
      "Water used is the rate times the time.", "Multiply gallons per minute by the number of minutes.", "A tap uses 2 gallons a minute. In 4 minutes: 2 x 4 = 8 gallons.");
    if (r2 < 0.75) { const s = ri(2, Math.min(4, m - 1)), d = ri(2, 7); return Q(`A shower uses ${r} gallons a minute. Cutting ${s} minutes off each shower for ${d} days saves how many gallons in all?`, r * s * d, "🚿",
      "First find the savings in one shower.", "Savings per shower times the number of days gives the total.", "At 2 gallons a minute, cutting 3 minutes for 2 days: 2 x 3 = 6 each day, so 12 gallons."); }
    const g = ri(3, 10), d2 = ri(5, 14); return Q(`A leaky faucet drips away ${g} gallons each day. How many gallons does it waste in ${d2} days?`, g * d2, "🚰",
      "Waste per day times number of days.", "Multiply the daily waste by the number of days.", "A leak wastes 4 gallons a day. In 3 days that is 12 gallons.");
  }));
  a.push(L("Fire and smoke safety", [
    "Alarms|🚨|<b>Smoke alarms</b> save lives. Test them every month and change the batteries when needed. Put them on every floor and near sleeping areas.",
    "Extinguisher|🧯|To use a fire extinguisher, remember <b>PASS</b>: <b>P</b>ull the pin, <b>A</b>im at the base of the fire, <b>S</b>queeze the handle, <b>S</b>weep side to side. Only fight a small fire, with an adult, and keep your exit behind you.",
    "Escape|🚪|Plan <b>two ways out</b> of every room and pick a meeting place outside. If you catch fire: <b>stop, drop and roll</b>. Cool a burn under cool running water."
  ], [
    "How often should you test smoke alarms?|every month|🚨||once every 10 years,never",
    "What does the P in PASS stand for?|pull the pin|🧯||push the button,put it down",
    "Where do you aim an extinguisher?|at the base of the fire|🧯||at the top of the flames,at the ceiling",
    "How many ways out of a room should you plan?|two|🚪|Plan a backup.|one,none",
    "What should you do if your clothes catch fire?|stop, drop and roll|🔥||run fast,wave your arms",
    "If a fire grows big, what should you do?|get out and call for help|📞||fight it alone,hide in a closet",
    "What should a family pick outside the home?|a meeting place|🏡||a new car,a fire pit",
    "How should you cool a small burn?|cool running water|💧||butter,ice for a long time"
  ], "Plan ahead and stay low and safe."));
  a.push(L("Cooking for dietary needs", [
    "Different diets|🥗|A <b>vegetarian</b> does not eat meat. A <b>vegan</b> eats no animal products at all, including milk, eggs and honey. Many families also follow food rules for their faith or culture.",
    "Health needs|🌾|Someone with <b>celiac disease</b> or a gluten allergy cannot eat <b>gluten</b>, found in wheat, barley and rye. People with <b>lactose intolerance</b> have trouble digesting milk sugar.",
    "Be a good cook|🤝|Ask guests about their needs before you plan the menu. Read labels, keep safe foods separate, and never guess about allergies."
  ], [
    "What does a vegan not eat?|any animal products|🌱||only vegetables,only sugar",
    "Which grain has gluten?|wheat|🌾||rice,corn",
    "Which is a gluten-free choice?|rice|🍚||barley soup,whole wheat bread",
    "What is lactose?|the sugar in milk|🥛||a kind of salt,a vitamin from fish",
    "What should you do before cooking for a guest?|ask about their food needs|🙋||guess what they like,hide the ingredients",
    "A vegetarian guest comes. Which main dish fits?|bean chili|🫘||chicken soup,beef tacos",
    "Why read food labels for a guest with an allergy?|to find ingredients they cannot eat|🏷️||to see the price,to find the color",
    "Are plain eggs vegan?|no|🥚||yes,only on weekends"
  ], "Respect each person's food needs."));
  a.push(L("The five tastes", [
    "Tastes|👅|Your tongue and nose sense five basic tastes: <b>sweet</b>, <b>salty</b>, <b>sour</b>, <b>bitter</b> and <b>umami</b> (a savory, meaty taste).",
    "Where found|🍋|Lemons are sour. Honey is sweet. Dark chocolate and coffee can be bitter. Mushrooms, tomatoes, parmesan cheese and soy sauce are rich in umami.",
    "Balance|⚖️|Good cooks balance tastes. Too salty? Add something unsalted, like more rice or water. Too sour? A pinch of sugar helps. Too flat? A squeeze of lemon can brighten it. Taste with a clean spoon as you go."
  ], [
    "Which taste is a lemon?|sour|🍋||sweet,bitter",
    "Which taste is called savory or meaty?|umami|🍄||sweet,sour",
    "Which food is rich in umami?|mushrooms|🍄||plain water,a lollipop",
    "A soup tastes too salty. What helps?|add water or unsalted ingredients|🍲||add more salt,add soy sauce",
    "A sauce is too sour. What might help?|a small pinch of sugar|🍬||more lemon juice,more vinegar",
    "A dish tastes flat. What brightens it?|a squeeze of lemon|🍋||nothing at all,burn it",
    "How should you taste food as you cook?|with a clean spoon|🥄||with a used spoon from your mouth,never taste",
    "Which taste is common in dark coffee?|bitter|☕||sweet,sour"
  ], "Five tastes work together."));
  a.push(L("Home maintenance schedule", [
    "Small jobs|🏠|Regular care keeps a home safe and saves money. Make a list of jobs and when to do them. Daily: dishes and wiping counters. Weekly: trash, floors and laundry.",
    "Monthly and yearly|📅|Monthly: test smoke alarms and wipe the fridge. Every one to three months: check the furnace or air filter. Every load: clean the dryer lint trap. In fall: clear gutters of leaves.",
    "Know your home|🔧|Learn where the main water shutoff and the electric panel are. A small repair now can prevent a big one later."
  ], [
    "What should be cleaned after every dryer load?|the lint trap|🧺||the roof,the sidewalk",
    "How often should smoke alarms be tested?|monthly|🚨||every 20 years,only in summer",
    "When should leaves be cleared from gutters?|in the fall|🍂||in the middle of summer,never",
    "What do you check every one to three months?|the air filter|🌬️||the garden gnome,the stairs",
    "Why keep a maintenance list?|to prevent big problems|📝||to make chores last longer,to waste time",
    "What should every family member know?|where the main water shutoff is|🚰||the neighbors' passwords,how to unplug the street light",
    "Which is a weekly job?|taking out the trash|🗑️||clearing gutters,replacing the roof",
    "What can a small repair now prevent?|a bigger repair later|🔧||dinner,sunshine"
  ], "A little care often prevents big trouble."));
  a.push(MIX("Mixed practice", [a[0], a[2], a[3], a[5], a[6], a[9], a[10], a[11], a[13], a[14], a[15]]));
  a.push(MIX("Level 16 Challenge", [a[1], a[4], a[7], a[8], a[12], a[16], a[17], a[0], a[3], a[11], a[13], a[15]]));

  // ================= LEVEL 17 =================
  const b = [];
  b.push(L("Temperature chart and resting", [
    "Use a thermometer|🌡️|You can't tell if meat is safe by color. Push a food thermometer into the thickest part, not touching bone. Safe temperatures: <b>165 F</b> for poultry and leftovers, <b>160 F</b> for ground meats, <b>145 F</b> for steaks, chops and fish.",
    "Rest it|⏱️|Whole cuts of beef, pork and lamb also need to <b>rest</b> for 3 minutes after cooking. Resting lets juices settle so the meat is juicier.",
    "Carryover cooking|♨️|Hot food keeps cooking after you take it off the heat. This is <b>carryover cooking</b>. A roast can rise several degrees while it rests."
  ], [
    "What is the safe temperature for poultry?|165 F|🍗|It is the highest number on the chart.|145 F,160 F",
    "What is the safe temperature for ground beef?|160 F|🍔||145 F,165 F",
    "What is the safe temperature for fish?|145 F|🐟||165 F,100 F",
    "Where do you place a food thermometer?|in the thickest part|🌡️||on the outside skin,in the air above the food",
    "What is carryover cooking?|food keeps cooking after leaving the heat|♨️||food getting colder at once,cooking in the fridge",
    "Why let a roast rest?|juices settle and it stays juicier|⏱️||it turns blue,it gets colder faster",
    "To what temperature should leftovers be reheated?|165 F|🍲||100 F,130 F",
    "Can you tell if chicken is safe just by its color?|no, use a thermometer|🍗||yes always,only if it smells nice"
  ], "A thermometer tells the truth."));
  b.push(L("HACCP and the flow of food", [
    "What is HACCP?|📋|<b>HACCP</b> stands for Hazard Analysis and Critical Control Points. It is a plan that finds where food could become unsafe and sets checks to stop it.",
    "Flow of food|➡️|Food moves through steps: receiving, storing, prepping, cooking, holding, cooling and reheating. At each step, workers check temperatures and keep clean.",
    "Rules to remember|🌡️|The <b>danger zone</b> is 40 to 140 F, where bacteria grow fast. Keep cold foods cold and hot foods hot. Use <b>first in, first out</b>: older food gets used first."
  ], [
    "What is the danger zone for food?|40 to 140 F|🌡️|Bacteria grow quickly here.|0 to 20 F,200 to 300 F",
    "What does first in, first out mean?|use the oldest food first|📦||throw out new food,eat only dessert first",
    "What does HACCP help find?|where food could become unsafe|📋||new recipes,fashion trends",
    "Which is one step in the flow of food?|cooling|❄️||dancing,painting",
    "Why check temperatures often?|to stop bacteria from growing|🌡️||to decorate food,to hear a beep",
    "What should hot food be kept above?|140 F|♨️||90 F,60 F",
    "What should cold food be kept at or below?|40 F|🧊||80 F,100 F",
    "What do workers write in a log?|temperature checks|📝||jokes,drawings"
  ], "Safety plans track food through every step."));
  b.push(L("Nutrient density", [
    "What it means|🥦|A <b>nutrient-dense</b> food has lots of vitamins, minerals, fiber or protein for its calories. Vegetables, fruits, beans, whole grains and lean proteins are nutrient-dense.",
    "Empty calories|🍬|Foods like soda and candy have calories but few nutrients. They are fine as an occasional treat, but they should not fill your day.",
    "Smart swaps|🔄|Swap a sugary drink for water or milk, or chips for carrot sticks and hummus. Small swaps give more nutrients for the same fullness."
  ], [
    "What does nutrient-dense mean?|lots of nutrients for the calories|🥦||lots of salt,very large portions",
    "Which food is more nutrient-dense?|spinach|🥬||candy,soda",
    "Which has mostly empty calories?|soda|🥤||bean soup,plain yogurt",
    "A smart swap for chips is...|carrot sticks and hummus|🥕||more chips,candy bars",
    "Which food gives fiber and protein together?|beans|🫘||gummy candy,soda",
    "Which drink swap adds more nutrients than soda?|milk or water|🥛||sports candy,sugar syrup",
    "Are treats allowed in a healthy diet?|yes, once in a while|🍪||never ever,all day long",
    "Which is a whole grain, nutrient-dense choice?|oatmeal|🥣||cotton candy,frosting"
  ], "More nutrients for the calories."));
  b.push(L("Leftovers and food waste", [
    "Store them well|🥡|Put leftovers in shallow, covered containers and into the fridge within <b>2 hours</b>. Eat them within <b>3 to 4 days</b>, or freeze them. Reheat to 165 F.",
    "Use it up|🍞|Stale bread becomes croutons or breadcrumbs. Veggie scraps make broth. Ripe bananas make banana bread. Plan meals and write a shopping list so you buy only what you need.",
    "Compost|🌱|Scraps that can't be eaten, like peels and coffee grounds, can go in a compost bin to become soil food instead of trash."
  ], [
    "Within how many hours should leftovers go in the fridge?|2 hours|⏰||10 hours,24 hours",
    "How long can most leftovers stay in the fridge?|3 to 4 days|📅||2 weeks,2 months",
    "What can stale bread become?|croutons|🍞||glass,paint",
    "What can veggie scraps make?|broth|🥕||plastic,cement",
    "What should you do with leftovers you won't eat soon?|freeze them|🧊||leave them on the counter,hide them in a drawer",
    "What helps you avoid buying too much food?|a shopping list|📝||shopping while very hungry,buying huge amounts",
    "Where can peels and coffee grounds go?|a compost bin|🌱||down the toilet,into the ice tray",
    "To what temperature should you reheat leftovers?|165 F|🌡️||90 F,100 F"
  ], "Use food before it's lost."));
  b.push(L("Quick breads and yeast breads", [
    "Quick breads|🧁|<b>Quick breads</b> like muffins, banana bread and biscuits rise with baking soda or baking powder. They need no waiting time.",
    "Muffin method|🥣|Mix dry and wet ingredients in separate bowls. Combine them and stir <b>just until mixed</b>. Over-mixing builds gluten and makes muffins tough.",
    "Yeast breads|🍞|<b>Yeast</b> is a living organism that makes gas, so the dough rises. <b>Kneading</b> builds gluten for chewy bread. The dough rests while it proofs, which takes an hour or more."
  ], [
    "Which bread rises with baking powder?|a quick bread|🧁||a sourdough loaf,a flatbread made with yeast",
    "What happens if you over-mix muffin batter?|the muffins get tough|🥣||the muffins glow,the muffins float away",
    "What makes yeast dough rise?|gas made by yeast|🍞||ice cubes,glue",
    "What does kneading build?|gluten|💪||sugar,color",
    "What is proofing?|letting dough rest and rise|⏱️||burning the crust,slicing the loaf",
    "Which needs no rising time?|banana bread|🍌||yeast rolls,sourdough",
    "How should you mix muffin batter?|just until combined|🥄||for ten minutes,with a blender at full speed",
    "Is yeast alive?|yes it is a living organism|🔬||no it is a rock,no it is plastic"
  ], "Quick or yeast: different leaveners."));
  b.push(L("Pastry basics", [
    "Flaky crust|🥧|Pie crust is made with <b>cold</b> butter or shortening and ice water. Little pieces of fat stay in the dough. When baked, they melt and make steam, which creates flaky layers.",
    "Handle gently|🙌|Don't overwork the dough, or it gets tough. Let the dough <b>rest</b> in the fridge so the gluten relaxes and the crust doesn't shrink.",
    "Other pastry|🥐|Puff pastry has many thin layers of butter that puff up with steam. <b>Blind baking</b> means baking a crust before adding a wet filling so it stays crisp."
  ], [
    "Should butter for pie crust be warm or cold?|cold|🧈||warm,melted",
    "Why does cold fat make a flaky crust?|it melts into steam pockets|♨️||it turns to ice cubes,it makes the dough blue",
    "What happens if you overwork pie dough?|it gets tough|🙌||it gets more flaky,it floats",
    "What is blind baking?|baking the crust before adding filling|🥧||baking in the dark,baking without an oven",
    "Why chill pastry dough?|the gluten relaxes|🧊||to make it sweeter,to color it",
    "What puffs puff pastry?|steam from butter layers|🥐||helium,sunshine",
    "What kind of water goes in pie crust?|ice water|🧊||hot water,boiling soup",
    "What does a wet filling do to a crust that wasn't blind baked?|can make it soggy|🥧||makes it crispier,makes it metal"
  ], "Cold fat and gentle hands."));
  b.push(G("Bulk buying", [
    "Is it a deal?|🛒|Big packs often cost less per item, but only if you use them all before they spoil. Savings come from comparing total prices.",
    "Example|✏️|Singles cost $2 each, so 6 would cost $12. A 6-pack costs $9. You save 12 - 9 = <b>$3</b>.",
    "Waste matters|🗑️|If you throw away 1 item worth $2, your savings drop by $2. Real savings = savings - cost of what you waste."
  ], () => {
    const n = pick([6, 8, 10, 12, 20]), u = ri(2, 5), save = ri(3, Math.min(12, n * u - 1)), P = n * u - save;
    if (Math.random() < 0.5) return Q(`Singles cost $${u} each. A pack of ${n} costs $${P}. How many dollars do you save by buying the pack instead of ${n} singles?`, save, "🛒",
      "Find what the singles would cost in all.", "Multiply the price of one by the number of items, then subtract the pack price.", "Singles are $3 each, so 4 cost $12. A pack of 4 costs $10. You save $2.");
    const w = ri(1, Math.max(1, Math.floor(save / u))), sv = Math.max(save, w * u);
    return Q(`A big pack saves $${sv} compared with buying singles at $${u} each. But ${w} ${w === 1 ? "item" : "items"} will spoil and be thrown out. What is the real savings in dollars?`, sv - w * u, "🛒",
      "The wasted items cost money too.", "Multiply the wasted items by the price of one, then subtract that from the savings.", "A pack saves $10, but 2 items worth $3 each spoil: 10 - 6 = $4 real savings.");
  }));
  b.push(G("Party budget", [
    "Plan the cost|🎉|To budget a party, add up the cost for each guest and any fixed costs, like decorations that don't depend on how many people come.",
    "Example|✏️|8 guests at $4 each is 8 x 4 = $32. Add $10 for decorations: 32 + 10 = <b>$42</b>.",
    "Work backward|🔁|If your budget is $50, with $10 for decorations and $5 per guest, you have $40 left for food. 40 ÷ 5 = <b>8 guests</b>."
  ], () => {
    const g = ri(4, 16), c = ri(2, 6), f = ri(5, 25);
    if (Math.random() < 0.5) return Q(`A party costs $${c} for each guest plus $${f} for decorations. How many dollars for ${g} guests?`, g * c + f, "🎉",
      "Find the cost of the guests first, then add the fixed cost.", "Multiply guests by the cost for each guest, then add the decorations.", "5 guests at $3 each is $15. Add $4 for balloons: $19.");
    return Q(`You have $${g * c + f} for a party. Decorations cost $${f} and each guest costs $${c}. How many guests can you invite?`, g, "🎉",
      "Take out the fixed cost first.", "Subtract the decorations from the budget, then divide by the cost for each guest.", "Budget $30, balloons $6, $4 per guest: 30 - 6 = 24, and 24 ÷ 4 = 6 guests.");
  }));
  b.push(L("Fabric blends and finishes", [
    "Blends|🧵|A <b>blend</b> mixes fibers. Cotton-polyester dries faster and wrinkles less than pure cotton. <b>Spandex</b> adds stretch. <b>Wool</b> is warm but can shrink in hot water.",
    "Finishes|✨|A <b>finish</b> is a treatment added to fabric. Examples: wrinkle-resistant, water-repellent and stain-resistant finishes. Children's sleepwear must be flame resistant by law.",
    "Where fibers come from|🌱|Cotton and linen come from plants. Wool and silk come from animals. Polyester and nylon are made from chemicals. Rayon is made from plant material that is processed."
  ], [
    "What does a cotton-polyester blend do well?|dries fast and wrinkles less|👕||melts in water,turns invisible",
    "Which fiber adds stretch?|spandex|🩱||linen,cotton",
    "Which fiber comes from sheep?|wool|🐑||nylon,polyester",
    "What can happen to wool in hot water?|it can shrink|♨️||it turns to silk,it grows bigger",
    "What is a finish on fabric?|a treatment added to it|✨||a kind of needle,a pattern piece",
    "Which fiber comes from the cotton plant?|cotton|🌱||silk,wool",
    "Which is made from chemicals?|polyester|⚗️||linen,wool",
    "Which finish helps in the rain?|water-repellent|🌧️||wrinkle-making,sparkle-making"
  ], "Fibers and finishes change how fabric behaves."));
  b.push(G("Resizing patterns", [
    "Scale by percent|📐|Patterns can be made bigger or smaller by a percent. <b>100%</b> is the same size. <b>150%</b> is one and a half times as big. <b>50%</b> is half as big.",
    "Example|✏️|A pattern piece is 20 cm wide. At 150% it becomes 20 x 1.5 = <b>30 cm</b>.",
    "Part bigger|➕|To make something 10% bigger, multiply by 1.10. A 50 cm piece becomes 55 cm."
  ], () => {
    let len, pct, r = Math.random();
    if (r < 0.65) {
      do { len = pick([10, 20, 30, 40, 50, 60]); pct = pick([50, 75, 150, 200]); } while ((len * pct / 100) % 1);
      return Q(`A pattern piece is ${len} cm long. You print it at ${pct}%. How long is the new piece in cm?`, len * pct / 100, "📐",
        "Compare the percent to 100.", "Turn the percent into a decimal and multiply by the length.", "A 40 cm piece at 50% is half as long: 20 cm.");
    }
    len = pick([20, 40, 50, 100, 200]); pct = pick([10, 20, 25, 50]);
    return Q(`You make a ${len} cm pattern piece ${pct}% bigger. How many cm longer is it?`, len * pct / 100, "📐",
      "You need just the extra part.", "Find the percent of the length. That is the amount added.", "Making a 60 cm piece 10% bigger adds 6 cm.");
  }));
  b.push(L("Fast fashion and sustainable clothes", [
    "Fast fashion|👕|<b>Fast fashion</b> means cheap clothes made quickly to follow trends. People wear them only a few times and then throw them away, which creates a lot of textile waste.",
    "Better choices|♻️|Buy fewer, better-made clothes. Shop secondhand, swap clothes with friends, repair what you own and rent special-occasion outfits.",
    "Care matters|🧺|Wash in cold water, run full loads and air-dry to save energy. Polyester can shed tiny plastic fibers, so a laundry bag that catches them can help."
  ], [
    "What is fast fashion?|cheap clothes made quickly to follow trends|👕||clothes that run fast,clothes that last for decades",
    "What is a good way to shop more sustainably?|buy secondhand|🛍️||buy a new outfit every day,buy only trends",
    "How can washing save energy?|use cold water|🧺||use the hottest water,wash one sock",
    "What can you do with clothes that no longer fit?|swap or donate them|🎁||throw them away,bury them",
    "Why repair clothes?|they last longer and waste less|🧷||it makes holes bigger,it uses more water",
    "How can you dry clothes with less energy?|air-dry them|🌬️||use the dryer on high all day,leave them wet in a bag",
    "Why is it good to buy fewer, better-made clothes?|they last longer|✨||they fall apart faster,they cost more to wash",
    "Which choice makes less waste for a one-time party outfit?|rent it|👗||buy and throw it out,buy three of them"
  ], "Wear clothes longer."));
  b.push(G("Compound interest", [
    "Interest on interest|📈|With <b>compound interest</b>, you earn interest on your money AND on the interest you earned before. Simple interest only pays on the starting amount.",
    "Example|✏️|$100 at 10% a year. Year 1 adds $10, so you have $110. Year 2 adds 10% of 110, which is $11. Total: <b>$121</b>.",
    "Compare|⚖️|Simple interest for 2 years would add just $10 + $10 = $20, giving $120. Compounding earned $1 more. Over many years the difference grows a lot. (These rates are only pretend numbers.)"
  ], () => {
    const P = pick([100, 200, 500, 1000]), r = pick([10, 20]), y1 = P * (100 + r) / 100, y2 = y1 * (100 + r) / 100, t = Math.random();
    if (t < 0.4) return Q(`You put $${P} in an account that earns ${r}% a year, compounded. How many dollars will you have after 2 years?`, y2, "📈",
      "Do one year at a time.", "Find the amount after year 1, then find the percent of that new amount for year 2.", "$100 at 10%: year 1 gives 110. Year 2 adds 11 to make 121.");
    if (t < 0.7) return Q(`You start with $${P} at ${r}% interest compounded each year. How much interest is earned in the second year only?`, y1 * r / 100, "📈",
      "The second year starts with a bigger amount.", "Find the amount after year 1, then take the percent of that amount.", "$100 at 10%: after year 1 it is 110. Second year interest is 10% of 110, which is 11.");
    return Q(`With $${P} at ${r}% for 2 years, how many more dollars does compound interest earn than simple interest?`, y2 - P - 2 * (P * r / 100), "📈",
      "Find the total each way.", "Simple interest is the same each year. Compound grows. Subtract the simple total from the compound total.", "$100 at 10% for 2 years: compound total 121, simple total 120, so $1 more.");
  }));
  b.push(G("Credit card costs", [
    "Borrowing money|💳|When you pay with a credit card, you borrow money. If you don't pay the whole bill, the bank charges <b>interest</b> on what you still owe.",
    "Example|✏️|You owe $200 and the card charges 2% a month. Interest is 2% of 200 = <b>$4</b>. If you pay $50, you owe 200 + 4 - 50 = $154.",
    "The best habit|✅|Paying the <b>full balance</b> each month means no interest. Paying only the minimum means interest keeps adding up."
  ], () => {
    const B = pick([100, 200, 300, 400, 500, 1000]), i = pick([1, 2, 3, 5]), I = B * i / 100;
    if (Math.random() < 0.5) return Q(`A credit card balance is $${B}. The card charges ${i}% interest a month. How many dollars of interest is that?`, I, "💳",
      "Interest is a percent of the balance.", "Find the percent of the balance by dividing by 100 and multiplying by the percent.", "A balance of $200 at 1% is $2 interest.");
    const p = ri(1, 4) * 20 + 0;
    return Q(`You owe $${B} and the card adds ${i}% interest. You then pay $${p}. How many dollars do you owe now?`, B + I - p, "💳",
      "Add the interest first, then subtract your payment.", "Interest is a percent of what you owed. Add it, then take away the payment.", "Owe $100 with 2% interest, pay $30: 100 + 2 - 30 = $72.");
  }));
  b.push(L("Receipts and records", [
    "Keep receipts|🧾|A <b>receipt</b> proves what you bought and what you paid. Keep it for returns, warranties and tracking spending. Check that each price matches the tag.",
    "Track your money|📊|Write purchases in a notebook, spreadsheet or app. Look at your bank statement every month for charges you don't recognize.",
    "Keep it safe|🔒|Store important papers in a safe place. Shred papers that show account numbers before you throw them away. Never share account numbers with someone you don't know."
  ], [
    "What does a receipt prove?|what you bought and paid|🧾||the weather,your age",
    "Why check a receipt in the store?|to catch price mistakes|🔍||to decorate it,to count the pages",
    "What should you do with papers that show account numbers?|shred them|✂️||post them online,leave them on the sidewalk",
    "Why look over a bank statement?|to spot charges you don't recognize|🏦||to find movies,to learn recipes",
    "Which tool can track spending?|a spreadsheet or notebook|📒||a spoon,a fork",
    "Who can you share account numbers with?|only trusted adults who need them|🔒||anyone who asks,strangers online",
    "Why keep receipts for big purchases?|for returns and warranties|📦||to build a paper tower,to wrap gifts",
    "Where should important papers be stored?|in a safe place|🗄️||on the front lawn,in the trash"
  ], "Records protect your money."));
  b.push(G("LED bulb savings", [
    "Watts matter|💡|An old <b>incandescent</b> bulb wastes energy as heat. An <b>LED</b> bulb gives similar light using far fewer watts. Energy used in <b>watt-hours</b> is watts x hours.",
    "Example|✏️|A 60-watt bulb and a 10-watt LED each run for 20 hours. The difference is 60 - 10 = 50 watts. 50 x 20 = <b>1,000 watt-hours</b> saved, which is 1 kWh.",
    "Cost|💵|If electricity costs 15 cents per kWh, saving 1 kWh keeps <b>15 cents</b> in your pocket."
  ], () => {
    const W1 = pick([60, 75, 100]), W2 = pick([8, 10, 12, 15]), h = pick([10, 20, 40, 100, 200]);
    if (Math.random() < 0.55) return Q(`An old ${W1}-watt bulb and a ${W2}-watt LED each run for ${h} hours. How many watt-hours does the LED save?`, (W1 - W2) * h, "💡",
      "First find the difference in watts.", "Multiply the watt difference by the hours.", "A 40-watt bulb and a 10-watt LED for 5 hours: 30 x 5 = 150 watt-hours.");
    const pr = pick([10, 12, 15, 20]), kwh = (W1 - W2) * h / 1000;
    if (kwh % 1) return Q(`A ${W1}-watt bulb and a ${W2}-watt LED each run for ${h} hours. How many watt-hours does the LED save?`, (W1 - W2) * h, "💡",
      "First find the difference in watts.", "Multiply the watt difference by the hours.", "A 40-watt bulb and a 10-watt LED for 5 hours: 30 x 5 = 150 watt-hours.");
    return Q(`The LED saves ${kwh} kWh. Electricity costs ${pr} cents per kWh. How many cents are saved?`, kwh * pr, "💡",
      "Multiply the energy saved by the price.", "kWh times the cents per kWh gives cents.", "Saving 2 kWh at 10 cents per kWh gives 20 cents.");
  }));
  b.push(L("Plumbing basics", [
    "Know your shutoff|🚰|Every home has a <b>main water shutoff valve</b>. If a pipe bursts, turn it off right away. Sinks and toilets also have small shutoff valves.",
    "Clogs and drains|🪠|Try a <b>plunger</b> first for a clogged sink or toilet. Do not pour fat, oil or grease down the drain, because it hardens and blocks pipes. Never mix drain cleaners.",
    "Leaks and cold|❄️|A dripping faucet often needs a new washer, and drips waste water. In very cold weather, let a faucet drip a little to help keep pipes from freezing."
  ], [
    "What do you turn off first if a pipe bursts?|the main water shutoff|🚰||the television,the porch light",
    "What is the first tool to try on a clogged sink?|a plunger|🪠||a hammer,a saw",
    "What should not go down the drain?|cooking grease|🛢️||plain water,a little soap and water",
    "Why avoid mixing drain cleaners?|fumes and reactions can be dangerous|⚠️||it makes bubbles for fun,it makes water sweet",
    "What often fixes a dripping faucet?|a new washer|🔧||a new roof,a bigger sink",
    "What can help prevent frozen pipes?|letting a faucet drip|❄️||turning the heat off for a month,pouring salt on the sink",
    "Why fix a dripping faucet?|it wastes water|💧||it makes music,it makes the sink cold",
    "Who should you call for a large leak?|a plumber|☎️||a clown,a stranger on the street"
  ], "Know where to turn the water off."));
  b.push(L("Emergency kit", [
    "Be ready|🎒|An <b>emergency kit</b> helps your family if the power goes out or you can't leave home. Plan for at least <b>3 days</b>.",
    "What goes in|🔦|Water (<b>1 gallon per person per day</b>), non-perishable food, a flashlight and batteries, a first aid kit, a battery or hand-crank radio, a manual can opener and important medicines.",
    "Plan too|📋|Write a list of phone numbers. Pick a family meeting place. Check the kit twice a year and replace old food and batteries."
  ], [
    "How much water per person per day is advised?|1 gallon|💧||1 teaspoon,10 gallons",
    "For about how many days should a kit plan?|at least 3 days|📅||one hour,one second",
    "Which food is good in an emergency kit?|canned or dry food|🥫||fresh ice cream,fresh lettuce",
    "Which item helps when the power is out?|a flashlight and batteries|🔦||a television,a blender",
    "Why include a manual can opener?|electric ones need power|🥫||it is shiny,it makes noise",
    "How often should you check the kit?|twice a year|🔄||every 50 years,never",
    "Why write down phone numbers?|your phone may not work|📞||to practice handwriting only,to hide them",
    "What does a family pick outside the home?|a meeting place|🏡||a new pet,a new car"
  ], "Prepare before you need it."));
  b.push(L("Consumer rights", [
    "Know your rights|🛍️|As a <b>consumer</b> you have rights: to honest ads, to safe products and to ask for help when something is wrong. Read return policies before you buy.",
    "Warranties|📜|A <b>warranty</b> is a promise that a seller will repair or replace a product within a time period. Keep the receipt as proof. Read the fine print about what is NOT covered.",
    "Be smart|🔎|A <b>refund</b> returns your money. <b>Store credit</b> can only be spent in that store. If a deal sounds too good to be true, it often is. Stay polite when you contact customer service."
  ], [
    "What is a warranty?|a promise to fix or replace a product|📜||a coupon for pizza,a type of receipt",
    "What do you keep to prove you bought something?|the receipt|🧾||the box only,nothing",
    "What is a refund?|money returned to you|💵||a new coupon only,a thank you note",
    "What is store credit?|money you can spend only at that store|🏬||cash you can spend anywhere,a free pizza",
    "Why read the fine print?|it shows what is not covered|🔎||to practice reading small,it is always blank",
    "A deal sounds too good to be true. What should you do?|be careful and check it out|⚠️||buy it right away,share your account number",
    "How should you talk to customer service?|politely and clearly|📞||by yelling,by hanging up",
    "What should you do before buying?|read the return policy|📄||ignore it,throw it out"
  ], "Know your rights and keep proof."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[5], b[6], b[7], b[11], b[12], b[14], b[15], b[17]]));
  b.push(MIX("Level 17 Challenge", [b[2], b[4], b[8], b[9], b[10], b[13], b[16], b[0], b[7], b[11], b[12], b[14]]));

  // ================= LEVEL 18 =================
  const c = [];
  c.push(L("Menu design", [
    "Plan a balanced menu|📋|A good menu has a starter, a main dish, sides and a dessert. Include a protein, a vegetable and a grain. Think about the guests' needs, your time and your budget.",
    "Contrast|🎨|Mix colors, textures and flavors. Pair something crunchy with something creamy, and something rich with something fresh. Avoid repeating the same ingredient or cooking method in every dish.",
    "Use the season|🍂|Foods in season cost less and taste better. Choose dishes you can make ahead so you can enjoy your guests."
  ], [
    "What makes a menu feel balanced?|different colors textures and flavors|🎨||five dishes of the same food,all one color",
    "Why use seasonal foods?|they cost less and taste better|🍅||they are always frozen,they are plastic",
    "A rich creamy soup goes well with...|a crunchy fresh salad|🥗||another creamy soup,a bowl of butter",
    "What should you think about first for guests?|their food needs|🙋||your favorite color,the weather in space",
    "Why choose make-ahead dishes?|you have more time with guests|⏱️||they take longer,they taste worse",
    "Which main dish plus sides makes a complete plate?|baked fish with rice and vegetables|🍽️||a bowl of frosting,three kinds of candy",
    "What is a problem if every dish is fried?|no variety in texture or cooking method|🍟||too colorful,too healthy",
    "What does a starter come before?|the main dish|🍽️||the shopping,the dessert"
  ], "Think balance and contrast."));
  c.push(L("Stir-frying", [
    "Hot and fast|🥘|<b>Stir-frying</b> cooks small pieces of food quickly in a very hot pan or wok while you keep them moving. It keeps vegetables crisp and bright.",
    "Prep first|🔪|Cut food into small, even pieces and have everything ready before you turn on the heat. Dry food well, because water makes it steam instead of sear.",
    "Order and space|🥦|Use oil with a high smoke point. Cook in <b>batches</b> so the pan is not crowded. Add hard vegetables first, then soft ones, and add the sauce near the end."
  ], [
    "How hot should the pan be for stir-frying?|very hot|🔥||cool,only lukewarm",
    "Why cut food into small even pieces?|so it cooks quickly and evenly|🔪||so it never cooks,so it freezes",
    "Why dry food before stir-frying?|wet food steams instead of sears|💧||to make it heavier,to wash it twice",
    "Why cook in batches?|a crowded pan steams the food|🥘||to waste time,to cool the pan",
    "When is the sauce usually added?|near the end|🥄||before the pan is hot,never",
    "Which vegetable goes in first?|carrots, which are hard|🥕||soft spinach,fresh herbs",
    "What kind of oil works for stir-frying?|oil with a high smoke point|🛢️||butter alone,cold-pressed finishing oil",
    "Why prepare everything first?|stir-frying is very fast|⏱️||it is very slow,it is a secret"
  ], "Stir-frying is quick, hot and organized."));
  c.push(G("Batch cooking and freezing", [
    "Cook once, eat often|🍲|<b>Batch cooking</b> means making a big amount at once and freezing portions for later. It saves time and often money.",
    "Freezing tips|🧊|Cool food first, then pack it in portion-size containers. Leave a little room because food expands as it freezes. Label with the name and date. Thaw in the fridge.",
    "Example|✏️|A pot makes 10 servings. You eat 2 tonight and freeze the rest in 2-serving containers: 10 - 2 = 8, and 8 ÷ 2 = <b>4 containers</b>."
  ], () => {
    const n = pick([8, 10, 12, 14, 16, 20]), eat = pick([2, 4]), cs = 2;
    const r = Math.random();
    if (r < 0.5) return Q(`A pot of chili makes ${n} servings. You eat ${eat} tonight and freeze the rest in containers that hold 2 servings each. How many containers do you need?`, (n - eat) / cs, "🍲",
      "First find how many servings are left.", "Subtract what you ate, then divide the rest by the servings in each container.", "A pot makes 10 servings. Eat 2, leaving 8. In 2-serving boxes that is 8 ÷ 2 = 4 boxes.");
    const cost = pick([2, 3, 4, 5]) * n;
    if (r < 0.8) return Q(`The ingredients for a batch of ${n} servings cost $${cost}. How many dollars is each serving?`, cost / n, "🍲",
      "Cost per serving means the total divided by the servings.", "Divide the total cost by the number of servings.", "A batch of 5 servings costs $15. 15 ÷ 5 = $3 each.");
    const days = pick([2, 3, 4, 5]), m = days * ri(2, 4);
    return Q(`You freeze ${m} lunches and eat ${days} lunches per week. For how many weeks will they last?`, m / days, "🧊",
      "Weeks times lunches a week gives the total lunches.", "Divide the lunches by the lunches eaten each week.", "20 lunches at 4 a week lasts 5 weeks.");
  }));
  c.push(L("Food labels and certifications", [
    "Meaning behind labels|🏷️|Some labels follow rules. <b>USDA Organic</b> has rules about how food is grown and handled. <b>Fair Trade</b> means farmers and workers get fair pay and conditions. <b>Non-GMO</b> means no genetically modified ingredients.",
    "Faith-based labels|✡️|<b>Kosher</b> and <b>halal</b> labels show food meets certain religious food rules. A <b>gluten-free</b> label helps people who cannot eat gluten.",
    "Be careful|🔍|Words like 'natural' or 'farm fresh' may have no strict rule. Read the ingredient list and the nutrition facts too."
  ], [
    "Which label has government rules about how food is grown?|USDA Organic|🌱||farm fresh,tasty",
    "What does Fair Trade help ensure?|fair pay for farmers and workers|🤝||the food is free,the food is bigger",
    "What does Non-GMO mean?|no genetically modified ingredients|🌽||no water,no flavor",
    "Why do some families look for kosher or halal labels?|the food meets their religious rules|🕊️||the food is cheaper,it is made of plastic",
    "Who needs a gluten-free label?|people who can't eat gluten|🌾||people who love sugar,people who like salt",
    "What should you also read besides a front-of-package claim?|the ingredient list|📄||the barcode picture,the shelf color",
    "Does the word 'natural' always mean healthy?|no|🌿||yes always,only on Fridays",
    "Which phrase may have no strict rule?|farm fresh|🚜||USDA Organic,gluten-free"
  ], "Labels tell different stories."));
  c.push(L("Trusting nutrition information", [
    "Good sources|📚|Reliable nutrition information comes from <b>registered dietitians</b>, doctors, government health agencies and universities. Check who wrote it and when.",
    "Red flags|🚩|Be careful if it promises a miracle cure, sells a special product, says a food is 'toxic' or 'detox' with no proof, or uses only one person's story or a celebrity.",
    "Think like a scientist|🔬|Look for many studies, not just one. Remember: two things happening together doesn't mean one caused the other. Ask a trusted adult or a doctor before changing how you eat."
  ], [
    "Who is a reliable source for nutrition advice?|a registered dietitian|🩺||an ad for a magic pill,a random post with no author",
    "What is a red flag?|a promise of a miracle cure|🚩||a list of sources,an author with training",
    "Which clue shows a claim may be weak?|it is only based on one person's story|🗣️||many studies agree,an expert reviewed it",
    "What should you check about an article?|who wrote it and when|📅||the color of the page,how many ads",
    "Why not trust one study alone?|more studies are needed to be sure|🔬||studies are never real,one is always perfect",
    "Who should you ask before changing how you eat?|a trusted adult or doctor|👨‍⚕️||a stranger online,a company selling pills",
    "Does 'happening together' mean one caused the other?|no|🔗||yes always,only in winter",
    "A product that cures everything is probably...|too good to be true|⚠️||a proven medicine,a safe bet"
  ], "Check the source and the evidence."));
  c.push(G("Protein per dollar", [
    "Compare value|🫘|To compare foods, find <b>grams of protein per dollar</b>: total protein divided by price.",
    "Example|✏️|A can has 3 servings with 6 g of protein each, so 18 g total. It costs $2. 18 ÷ 2 = <b>9 g per dollar</b>.",
    "Higher is better|📈|The food with more grams of protein per dollar gives more protein for your money."
  ], () => {
    let s, g, p, tot;
    do { s = pick([2, 3, 4, 5, 6]); g = pick([5, 6, 7, 8, 10, 12]); p = pick([1, 2, 3, 4, 5]); tot = s * g; } while (tot % p);
    if (Math.random() < 0.5) return Q(`A package has ${s} servings with ${g} grams of protein each. It costs $${p}. How many grams of protein per dollar?`, tot / p, "🫘",
      "Find the total protein first.", "Multiply servings by grams in a serving, then divide by the dollars.", "A box has 2 servings with 5 g each and costs $2. Total is 10 g, and 10 ÷ 2 = 5 g per dollar.");
    return Q(`A bag of lentils costs $${p} and has ${tot} grams of protein in all. How many grams of protein per dollar?`, tot / p, "🫘",
      "Divide the protein by the price.", "Total grams divided by dollars gives grams per dollar.", "A bag with 24 g of protein costs $4: 24 ÷ 4 = 6 g per dollar.");
  }));
  c.push(G("Catering for an event", [
    "Plan by portions|🍽️|Caterers plan how much food each guest eats. For example, 6 ounces of meat per guest. <b>16 ounces make 1 pound</b>.",
    "Example|✏️|For 8 guests at 6 ounces each: 8 x 6 = 48 ounces. 48 ÷ 16 = <b>3 pounds</b>.",
    "Batches and extras|➕|If a recipe feeds 8 and you have 20 guests, you need 3 batches (2 batches feed only 16). Add 10% extra for surprises."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const g = pick([8, 16, 24, 32, 40]); return Q(`You plan 6 ounces of meat per guest for ${g} guests. How many pounds of meat is that? (16 ounces = 1 pound)`, g * 6 / 16, "🍖",
      "Find total ounces first.", "Multiply guests by ounces each, then divide by 16 to change ounces to pounds.", "Try 8 guests at 4 ounces: 32 ounces ÷ 16 = 2 pounds."); }
    if (t < 0.75) { const per = pick([6, 8, 10, 12]), k = ri(2, 5), extra = ri(1, per - 1), g = per * k + extra; return Q(`One batch of a recipe feeds ${per} people. You have ${g} guests. How many whole batches do you need?`, k + 1, "🥘",
      "A part of a batch still means a whole batch.", "Divide guests by the people per batch and round UP to the next whole number.", "A batch feeds 8 and you have 20 guests. 20 ÷ 8 is 2.5, so round up to 3 batches."); }
    const g2 = pick([20, 30, 40, 50, 60, 80]); return Q(`You have ${g2} guests and add 10% extra food for surprises. For how many guests do you plan?`, g2 + g2 / 10, "🍽️",
      "Find 10 percent of the number of guests.", "Divide by 10 to get 10%, then add it to the guest count.", "With 30 guests, 10% is 3, so plan for 33.");
  }));
  c.push(G("Pricing with markup", [
    "What is markup?|🏷️|A seller adds a <b>markup</b>, an extra percent on top of cost, to cover other expenses and profit.",
    "Example|✏️|A cake costs $10 to make. With a 50% markup, add 50% of 10 = $5. The price is $10 + $5 = <b>$15</b>.",
    "Profit|💰|<b>Profit</b> is the selling price minus the cost. Here profit is $15 - $10 = <b>$5</b>, which equals the markup amount."
  ], () => {
    let cost, m;
    do { cost = pick([2, 4, 5, 8, 10, 12, 20, 40]); m = pick([25, 50, 100]); } while ((cost * m / 100) % 1);
    const extra = cost * m / 100;
    if (Math.random() < 0.55) return Q(`A treat costs $${cost} to make. You add a ${m}% markup. What is the selling price in dollars?`, cost + extra, "🏷️",
      "The price is the cost plus the markup.", "Find the percent of the cost, then add it to the cost.", "A snack costs $20 with a 25% markup: 25% of 20 is 5, so the price is $25.");
    return Q(`A treat costs $${cost} to make and you add a ${m}% markup. How many dollars of profit do you make on each treat?`, extra, "💰",
      "Profit equals the markup amount.", "Find the percent of the cost.", "A snack costs $20 with a 25% markup, so profit is 25% of 20, which is $5.");
  }));
  c.push(G("Break-even", [
    "Break even|⚖️|You <b>break even</b> when your sales exactly cover your costs. After that, every sale is profit.",
    "Example|✏️|You spend $30 on supplies. Each item sells for $5 and costs $2 to make, so each sale earns $3. 30 ÷ 3 = <b>10 items</b> to break even.",
    "After break-even|🎯|If you sell 14 items, you sold 4 beyond break-even, so your profit is 4 x 3 = <b>$12</b>."
  ], () => {
    const d = pick([1, 2, 3, 4, 5]), n = ri(6, 24), F = d * n;
    if (Math.random() < 0.55) return Q(`A stand has $${F} in setup costs. Each item earns $${d} after its own cost. How many items must you sell to break even?`, n, "⚖️",
      "Divide the setup cost by what each item earns.", "Setup cost divided by the earnings from one item.", "Setup is $24 and each item earns $3. 24 ÷ 3 = 8 items.");
    const m = n + ri(2, 8);
    return Q(`A stand has $${F} in setup costs. Each item earns $${d} after its own cost. You sell ${m} items. How many dollars of profit do you have?`, m * d - F, "🎯",
      "Total earnings minus setup cost is the profit.", "Multiply the items by what each earns, then subtract the setup cost.", "Setup is $20, each earns $2, and you sell 15: 15 x 2 = 30, then 30 - 20 = $10 profit.");
  }));
  c.push(L("Fit and alterations", [
    "Measurements|📏|Key body measurements for clothes are <b>chest</b>, <b>waist</b>, <b>hip</b>, <b>inseam</b> (inside leg) and <b>sleeve length</b>. Use a soft tape measure, snug but not tight.",
    "Ease|👗|<b>Ease</b> is the extra room in clothes so you can move and sit. A garment with no ease feels tight. Patterns list the finished size and the ease.",
    "Alter|🪡|Easy alterations: shorten a hem, take in a side seam, move a button. Pin and try it on before sewing. Measure twice, cut once."
  ], [
    "What is the inseam?|the inside leg length|📏||the width of the sleeve,the neck size",
    "What does ease mean in sewing?|extra room for movement|👗||a type of stitch,a color",
    "What kind of tape measure is used for body measurements?|a soft tape|📏||a metal construction tape,a ruler of wood",
    "What should you do before sewing an alteration?|pin and try it on|📌||sew with no check,cut the fabric first",
    "Which alteration is easy for beginners?|shortening a hem|🪡||rebuilding the shoulder,changing the collar shape",
    "How snug should you hold the tape measure?|snug but not tight|📏||as tight as possible,loose and drooping",
    "What does the saying measure twice cut once mean?|check before you cut|✂️||cut twice,measure only once and guess",
    "Which measurement goes around the middle of the body?|waist|📏||inseam,sleeve"
  ], "Measure, pin and check."));
  c.push(L("Caring for kitchen tools", [
    "Cast iron|🍳|<b>Cast iron</b> pans last for generations. Dry them right away so they don't rust, and rub on a thin layer of oil to keep the surface seasoned.",
    "Knives and boards|🔪|Use a <b>honing steel</b> to keep a blade straight, and have it sharpened now and then. Wash wooden boards and spoons by hand, because the dishwasher can crack them.",
    "Nonstick and more|🧽|Use wooden or silicone tools on nonstick pans, not metal. Don't heat an empty nonstick pan. Check tools for damage and replace cracked ones."
  ], [
    "Why dry a cast iron pan right away?|so it doesn't rust|🍳||so it gets wet again,to make it bigger",
    "What do you rub on cast iron to keep it seasoned?|a thin layer of oil|🛢️||a cup of water,glue",
    "Which tool keeps a knife blade straight?|a honing steel|🔪||a rolling pin,a whisk",
    "Why avoid the dishwasher for wooden spoons?|it can crack them|🥄||it makes them sparkle,it turns them to plastic",
    "What should you use on a nonstick pan?|wooden or silicone tools|🥘||sharp metal forks,steel wool",
    "What should you do with a cracked tool?|replace it|🔧||keep using it,hide it",
    "Does a well-cared-for cast iron pan last a long time?|yes for generations|⏳||no only one day,no it melts",
    "Why not heat an empty nonstick pan?|it can damage the coating|🔥||it saves energy,it makes food faster"
  ], "Good care makes tools last."));
  c.push(L("Credit scores and borrowing", [
    "Credit score|📊|A <b>credit score</b> is a number that shows lenders how reliably you pay back money. Paying bills on time and using only a small part of your credit limit raise it.",
    "Loans and interest|🏦|When you borrow, you pay back the money plus <b>interest</b>. The <b>APR</b> is the yearly cost of borrowing. A lower APR costs less.",
    "Borrow wisely|⚠️|Missing payments hurts your score. Be careful with 'buy now, pay later'. Never co-sign a loan unless you can pay it, because you become responsible too."
  ], [
    "What does a credit score show?|how reliably you repay money|📊||how tall you are,how many friends you have",
    "What helps raise a credit score?|paying bills on time|⏰||missing payments,hiding bills",
    "What is interest on a loan?|the cost of borrowing|💵||a free gift,a coupon",
    "What does a lower APR mean?|borrowing costs less|📉||borrowing costs more,no payment is needed",
    "What happens if you miss payments?|your score can drop|⬇️||your score goes up,nothing ever",
    "What does co-signing a loan mean?|you promise to pay if the other person doesn't|✍️||you get a gift,you get free money",
    "Who needs to be careful with buy now pay later?|everyone, since costs can add up|🛍️||no one,only people on the moon",
    "Using a small part of your credit limit is...|good for your score|✅||bad for your score,illegal"
  ], "Borrowing has a cost."));
  c.push(G("Rule of 72", [
    "Money doubles|⏳|The <b>Rule of 72</b> estimates how long money takes to double: <b>72 ÷ the yearly interest rate</b> gives the years.",
    "Example|✏️|At 6% a year, 72 ÷ 6 = <b>12 years</b> to double. $500 would become about $1,000 in 12 years.",
    "Going backward|🔁|To double in 9 years you need a rate of 72 ÷ 9 = <b>8%</b>. A bigger rate doubles faster."
  ], () => {
    const r = pick([2, 3, 4, 6, 8, 9, 12]), t = Math.random();
    if (t < 0.45) return Q(`Money earns ${r}% a year. By the Rule of 72, about how many years until it doubles?`, 72 / r, "⏳",
      "Use the number 72 divided by the rate.", "Divide 72 by the yearly percent.", "At 4%, 72 ÷ 4 = 18 years.");
    if (t < 0.8) { const y = 72 / r; return Q(`You want your money to double in ${y} years. By the Rule of 72, what yearly rate (percent) do you need?`, r, "⏳",
      "Divide 72 by the years.", "The rule is rate times years is about 72.", "To double in 12 years, 72 ÷ 12 = 6%."); }
    const P = pick([100, 200, 500, 1000]); return Q(`$${P} doubles once (about ${72 / r} years at ${r}%). How many dollars do you have after it doubles once?`, P * 2, "💰",
      "Doubling means times two.", "Multiply by 2.", "$300 that doubles once becomes $600.");
  }));
  c.push(L("Renting a first home", [
    "The lease|📄|A <b>lease</b> is a contract with the landlord. It lists the rent, the dates and the rules. Read it fully before you sign.",
    "Deposit and insurance|🔑|A <b>security deposit</b> is money held in case of damage and is returned if the home is left in good shape. <b>Renter's insurance</b> protects your belongings.",
    "Be a good renter|🏢|Take photos of the home's condition when you move in. Pay rent on time. Know who to call for repairs. Utilities such as power and internet may cost extra. Give notice before you move out."
  ], [
    "What is a lease?|a contract with the landlord|📄||a kind of key,a pet",
    "What is a security deposit?|money held in case of damage|🔑||a gift for the landlord,free rent",
    "What does renter's insurance protect?|your belongings|🛋️||the landlord's car,the street",
    "Why take photos when moving in?|to show the home's condition|📸||to decorate walls,to post on a map",
    "When should you read a lease?|before you sign|✍️||after you move out,never",
    "Which cost may be extra?|utilities|💡||the walls,the front door",
    "What should you give before moving out?|notice|📅||a surprise,a new couch",
    "Who do you call for a broken sink?|the landlord or property manager|🔧||a random stranger,a neighbor's pet"
  ], "Rent with your eyes open."));
  c.push(G("First apartment budget", [
    "Monthly budget|🏠|List monthly costs: rent, utilities, food and transportation. Add them for the total. Income minus total costs is what's left.",
    "The 30% guide|📏|Many people try to keep rent near <b>30% of income</b>. With $2,000 income, 30% is $600.",
    "Example|✏️|Rent $700, utilities $100, food $200, transport $100 totals $1,100. With $1,500 income, $400 is left."
  ], () => {
    const t = Math.random();
    if (t < 0.6) { const rent = ri(5, 9) * 100, ut = ri(1, 3) * 50, food = ri(2, 4) * 100, tr = ri(1, 3) * 50, inc = ri(15, 25) * 100; const tot = rent + ut + food + tr; if (inc >= tot) return Q(`A first apartment costs $${rent} rent, $${ut} utilities, $${food} food and $${tr} transport each month. Income is $${inc}. How many dollars are left?`, inc - tot, "🏠",
      "Add all the costs first.", "Subtract the total costs from income.", "Costs are 500 + 50 + 100 + 50 = 700. Income 1,000 leaves 300.");
    }
    const inc = pick([1000, 1500, 2000, 2500, 3000, 4000]); return Q(`If you follow the 30% guide, what is the most you should pay in rent on an income of $${inc}?`, inc * 30 / 100, "📏",
      "Find 30 percent of the income.", "Find 10% by dividing by 10, then multiply by 3.", "On $1,000, 10% is 100, so 30% is 300.");
  }));
  c.push(G("Backward planning", [
    "Work backward|⏱️|To serve dinner on time, start with the serving time and work <b>backward</b>. Add up the steps that must happen one after the other.",
    "Example|✏️|Prep 20 minutes, bake 60, rest 10. Total: 20 + 60 + 10 = <b>90 minutes</b> before dinner.",
    "Overlap|🔁|Jobs you do while something bakes overlap. If sides take 25 minutes while the roast bakes for 60, they don't add extra time."
  ], () => {
    const a1 = pick([10, 15, 20, 25, 30]), b1 = pick([30, 45, 60, 75, 90]), c1 = pick([5, 10, 15]), t = Math.random();
    if (t < 0.55) return Q(`Dinner is at 6:00. Prep takes ${a1} minutes, baking takes ${b1} minutes and resting takes ${c1} minutes, one after another. How many minutes before dinner must you start?`, a1 + b1 + c1, "⏱️",
      "These steps happen one after another.", "Add the times of all three steps.", "Prep 10, bake 40, rest 5: 10 + 40 + 5 = 55 minutes.");
    const s = ri(10, b1 - 5);
    return Q(`A casserole bakes for ${b1} minutes. Meanwhile you make a salad that takes ${s} minutes. How many minutes of the baking time are left after the salad is done?`, b1 - s, "🥗",
      "The salad happens during the baking.", "Subtract the salad time from the baking time.", "A pie bakes 50 minutes. A sauce takes 15 during that time, so 35 minutes remain.");
  }));
  c.push(L("Careers in food and home", [
    "Food careers|👩‍🍳|A <b>chef</b> plans and cooks meals. A <b>dietitian</b> helps people eat well for health. A <b>food scientist</b> tests and improves foods. A <b>food inspector</b> checks safety.",
    "Home and design|🧵|A <b>fashion designer</b> creates clothes. A <b>tailor</b> alters and repairs them. An <b>interior designer</b> plans how rooms look and work. A <b>family and consumer sciences teacher</b> teaches life skills.",
    "Money and people|💼|A <b>financial counselor</b> helps people plan budgets. A <b>caterer</b> cooks for events. A <b>restaurant manager</b> leads the team. Many jobs here need teamwork and careful math."
  ], [
    "Who plans and cooks meals in a restaurant?|a chef|👨‍🍳||a tailor,a pilot",
    "Who helps people eat well for health?|a dietitian|🥗||an interior designer,a plumber",
    "Who tests and improves foods in a lab?|a food scientist|🔬||a fashion designer,a caterer",
    "Who alters and repairs clothes?|a tailor|🧵||a chef,a dietitian",
    "Who plans how a room looks and works?|an interior designer|🛋️||a food inspector,a baker",
    "Who cooks for weddings and parties?|a caterer|🎂||a financial counselor,a dentist",
    "Who helps people plan a budget?|a financial counselor|💼||a pastry chef,a tailor",
    "Who checks that food is safe?|a food inspector|🔍||a fashion designer,a florist"
  ], "Match the job to what the person does."));
  c.push(L("Food security and sustainable farming", [
    "Feeding everyone|🌍|Food security means everyone has enough safe, healthy food. Some areas have a <b>food desert</b>: few stores that sell affordable fresh food nearby.",
    "Farming for the future|🚜|<b>Sustainable farming</b> protects soil and water. Farmers use <b>crop rotation</b> (changing crops each season) and <b>cover crops</b> to keep soil healthy.",
    "What we can do|🌱|Waste less food, buy local and seasonal food when you can, and eat more plant-based meals. Plants often need less land and water than meat. Support food banks and gardens."
  ], [
    "What is a food desert?|an area with few stores selling fresh affordable food|🏜️||a place with only sand,a very dry recipe",
    "What is crop rotation?|changing which crops grow in a field each season|🌾||planting the same crop forever,moving the farm",
    "What does sustainable farming protect?|soil and water|💧||only the tractor,nothing",
    "How does wasting less food help?|less food and resources are wasted|♻️||it creates more waste,it changes nothing",
    "Why do cover crops help?|they protect and feed the soil|🌱||they paint the field,they scare the farmer",
    "Which choice often needs less land and water?|plant-based meals|🥬||more meat only,throwing food out",
    "What does food security mean?|everyone has enough safe healthy food|🍞||one person has all the food,food is never eaten",
    "Where can people get help with food?|a food bank|🥫||a toy store,a car wash"
  ], "Healthy farms and fair access matter."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[8], c[9], c[11], c[13], c[15], c[16]]));
  c.push(MIX("Level 18 Challenge", [c[6], c[7], c[10], c[12], c[14], c[17], c[1], c[2], c[5], c[9], c[13], c[16]]));

  Object.assign(HOMEEC_LEVELS, { 16: a, 17: b, 18: c });
})();
