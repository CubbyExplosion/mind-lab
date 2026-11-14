// ext/homeec-19-21.js  Home Economics & Cooking levels 19-21
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

  // ================= LEVEL 19 =================
  const a = [];
  a.push(L("Proteins change when cooked", [
    "Denaturing|🍳|Proteins are long, folded chains. Heat, acid or whisking makes them unfold. This is called <b>denaturing</b>. Then the proteins bond together, which is called <b>coagulation</b>.",
    "Everyday examples|🥚|A clear egg white turns white and firm in a hot pan. Meat goes from soft and pink to firm and brown. Milk curdles when you add lemon juice.",
    "Too much heat|🔥|Proteins keep tightening as they heat. Overcooked eggs turn rubbery and overcooked meat gets tough and dry. Gentle heat keeps them tender."
  ], [
    "What is it called when heat makes a protein unfold?|denaturing|🍳||freezing,melting into sugar",
    "What happens to a clear egg white in a hot pan?|it turns white and firm|🥚||it turns into oil,it gets bigger and clear",
    "Which can make proteins unfold besides heat?|acid|🍋||a cold breeze,a bright light",
    "What does overcooking do to eggs?|makes them rubbery|🍳||makes them sweeter,makes them lighter",
    "Why does milk curdle when lemon juice is added?|the acid changes the milk proteins|🥛||the lemon adds meat,the milk gets too cold",
    "Which sets (coagulates) when heated?|egg protein|🥚||plain water,table salt",
    "What happens to overcooked meat?|it gets tough and dry|🥩||it gets soft and juicy,it turns into butter",
    "Whisking egg whites into foam mainly does what to the proteins?|unfolds them|🥣||turns them into fat,freezes them"
  ], "Think about what heat, acid and whisking do to protein chains."));
  a.push(L("Emulsions", [
    "Oil and water|🫙|Oil and water do not mix by themselves. An <b>emulsion</b> is a mixture where tiny drops of one liquid are spread through another.",
    "Emulsifiers|🥚|An <b>emulsifier</b> helps oil and water stay together. Egg yolk, mustard and honey are emulsifiers. Mayonnaise is oil, egg yolk and acid.",
    "Making it work|🥄|Add the oil slowly while whisking hard. If the oil goes in too fast, the emulsion <b>breaks</b> and looks greasy and split."
  ], [
    "What is an emulsion?|a mix of tiny drops of oil and water|🫙||a solid block of salt,a boiling liquid",
    "Which ingredient in mayonnaise is the emulsifier?|egg yolk|🥚||the salt,the plastic jar",
    "Why add oil slowly when making mayonnaise?|so the emulsion does not break|🥄||so it turns blue,so it cooks",
    "What does a broken emulsion look like?|greasy and split|🫙||thick and smooth,frozen and hard",
    "Which of these is a common emulsifier?|mustard|🌭||plain flour water,black pepper only",
    "Which sauce is an emulsion of butter and egg yolk?|hollandaise|🍳||tomato sauce,soy sauce",
    "What do you do to help oil and vinegar mix in a dressing?|whisk or shake hard|🥗||leave it still,heat it until dry",
    "Which is an emulsion?|mayonnaise|🥪||plain water,table salt"
  ], "An emulsion needs an emulsifier and a lot of mixing."));
  a.push(L("Sugar stages", [
    "Sugar and heat|🍬|When sugar is heated it melts, and then it <b>caramelizes</b> into brown, nutty-tasting liquid at about 170 degrees Celsius (338 F).",
    "Candy stages|🌡️|Cooks heat sugar syrup to different temperatures. <b>Soft ball</b> makes fudge, <b>hard ball</b> makes nougat and <b>hard crack</b> makes lollipops and brittle. A hotter syrup makes a harder candy.",
    "Be careful|⚠️|Hot sugar is far hotter than boiling water and sticks to skin. Keep children and pets away and never touch it. Use a candy thermometer."
  ], [
    "What is it called when sugar melts and turns brown?|caramelizing|🍬||freezing,fermenting",
    "Which sugar stage makes lollipops?|hard crack|🍭||soft ball,thread",
    "Which tool measures sugar syrup temperature?|candy thermometer|🌡️||ruler,measuring spoon",
    "A hotter sugar syrup makes a candy that is what?|harder|🍬||softer,wetter",
    "Why is hot sugar dangerous?|it is very hot and sticks to skin|⚠️||it is too cold,it is poisonous",
    "Which candy is made at soft ball stage?|fudge|🍫||brittle,lollipops",
    "What does caramelized sugar taste like?|nutty and a little bitter|🍯||sour like lemon,salty like chips",
    "What should you never do with hot sugar syrup?|touch it|🥄||stir it with a long spoon,measure it with a thermometer"
  ], "More heat means less water is left in the sugar."));
  a.push(L("Eggs and custards", [
    "Egg jobs|🥚|Eggs can bind, thicken, add structure, make foam and add color. In a <b>custard</b>, eggs thicken milk into a smooth, soft set when gently heated.",
    "Gentle heat|♨️|Custards like crème caramel are baked in a <b>water bath</b> (a pan of hot water around the dish). The water keeps the heat gentle so the eggs do not turn rubbery or curdled.",
    "Doneness|🥄|A baked custard is done when the edge is set but the center still wobbles a little. It finishes setting as it cools. Chill it promptly in the fridge."
  ], [
    "What does a water bath do for a baked custard?|keeps the heat gentle|♨️||makes the oven hotter,adds more sugar",
    "Which ingredient thickens a custard?|eggs|🥚||oil,baking soda",
    "When is a baked custard done?|edge set and center slightly wobbly|🍮||when it is completely hard,when it is bubbling over",
    "What happens if a custard is heated too fast?|it curdles|🥛||it turns to ice,it gets sweeter",
    "Where should a finished custard be stored?|in the refrigerator|🧊||on the counter overnight,in a warm window",
    "Which job do eggs do in a custard?|thicken and set it|🥚||make it fizzy,make it salty",
    "Which of these is a custard dessert?|crème caramel|🍮||plain toast,potato chips",
    "What does a pan of hot water around a dish protect against?|uneven strong heat|🥘||rain,bright light"
  ], "Eggs like gentle heat."));
  a.push(L("Allergens on labels", [
    "Big allergens|🏷️|In the United States nine foods are named as major allergens: milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy and sesame. Packaged foods must show these on the label.",
    "Reading labels|🔍|Check the ingredient list and the <b>Contains</b> statement. Look for hidden names, such as casein (from milk) or albumin (from eggs). Also check for warnings like 'may contain traces of peanuts'.",
    "Cross-contact|🧼|<b>Cross-contact</b> happens when an allergen touches another food through a shared knife, board or pan. Clean tools well and use separate ones for allergy-safe food."
  ], [
    "Which of these is a major allergen?|peanuts|🥜||carrots,rice",
    "Casein comes from which food?|milk|🥛||eggs,wheat",
    "What is cross-contact?|an allergen touching another food|🧼||cooking food twice,cooling food fast",
    "What does a Contains statement list?|major allergens in the food|🏷️||how much it costs,the cooking time",
    "Why use a separate board for allergy-safe food?|to avoid cross-contact|🔪||to make the food salty,to save money",
    "Albumin comes from which food?|eggs|🥚||soy,fish",
    "Which of these is a tree nut?|almond|🌰||peanut,sesame seed",
    "Where should you read for allergens?|the ingredient list and Contains statement|🔍||only the front picture,only the price"
  ], "Look at both the ingredient list and the warning words."));
  a.push(L("Allergy or intolerance?", [
    "Two different things|🤧|A <b>food allergy</b> involves the immune system and can be severe. A <b>food intolerance</b> is a digestion problem and is usually not life-threatening.",
    "Examples|🥛|Lactose intolerance means the body lacks enough of the enzyme that digests milk sugar, so the person gets gas or stomach ache. A peanut allergy can cause swelling and trouble breathing.",
    "Take it seriously|🚑|If a person has signs of a serious allergic reaction (trouble breathing, swelling of face, throat tightness), call emergency services right away. People may carry an epinephrine auto-injector."
  ], [
    "Which one involves the immune system?|food allergy|🤧||food intolerance,both are the same",
    "Lactose intolerance is a problem digesting what?|milk sugar|🥛||egg protein,peanut oil",
    "What should you do if someone has trouble breathing after eating?|call emergency services|🚑||wait and see,give them more of the food",
    "Which is usually a digestion problem and not life-threatening?|food intolerance|🥛||food allergy,anaphylaxis",
    "Which medicine do some allergic people carry?|epinephrine auto-injector|💉||vitamin gummy,cough drop",
    "Which sign points to a serious allergy?|swelling of the face|⚠️||a good appetite,a mild yawn",
    "Which condition can be caused by missing an enzyme?|lactose intolerance|🧪||peanut allergy,shellfish allergy",
    "Can a very small amount of an allergen be dangerous?|yes for some people|🥜||never,only if cooked"
  ], "Ask: does it involve the immune system or just digestion?"));
  a.push(L("Seams and hems", [
    "Seams|🧵|A <b>seam</b> joins two pieces of fabric. The usual <b>seam allowance</b> is 5/8 inch (1.5 cm) in clothing patterns. Sew right sides together, then press the seam open or to one side.",
    "Finishing edges|✂️|Raw edges can fray. Finish them with a zigzag stitch, pinking shears, a serger or a French seam that hides the raw edge inside.",
    "Hems|📏|A <b>hem</b> is a folded and stitched bottom edge. Fold up, press, then stitch. Hand stitches like the blind hem stitch are almost invisible from the right side."
  ], [
    "What does a seam do?|joins two pieces of fabric|🧵||measures fabric,cuts fabric",
    "What is a common seam allowance in clothing patterns?|5/8 inch|📏||5 feet,1 mile",
    "What can you use to stop raw edges from fraying?|a zigzag stitch|✂️||a glue stick,a rubber band",
    "Which seam hides the raw edge inside?|French seam|🧵||open seam,basting",
    "What is a hem?|a folded and stitched bottom edge|👗||a pocket,a button",
    "What should you do before stitching a hem?|fold up and press|♨️||cut it off,wash it twice",
    "Which tool has zigzag blades to stop fraying?|pinking shears|✂️||a ruler,a thimble",
    "Which stitch is nearly invisible on the right side?|blind hem stitch|🪡||basting stitch,a zigzag on top"
  ], "Seams join; hems finish the bottom."));
  a.push(L("Fixed and variable costs", [
    "Two kinds of spending|💵|<b>Fixed expenses</b> are the same each month, like rent or a phone plan. <b>Variable expenses</b> change from month to month, like food, gas or entertainment.",
    "Tracking|📒|To see where money goes, write down or record every purchase for a month. Sort them into groups. This shows places where you can cut back.",
    "Irregular costs|📅|Some costs come only once or twice a year, like insurance or car repairs. Save a little each month in a <b>sinking fund</b> so you are ready."
  ], [
    "Which is a fixed expense?|monthly rent|🏠||restaurant meals,a new game",
    "Which is a variable expense?|groceries|🛒||a loan payment of the same amount,fixed rent",
    "Why track your spending?|to see where your money goes|📒||to make prices lower,to earn interest",
    "What is a sinking fund?|money saved for a future expense|📅||a leaking pipe,a type of loan",
    "Which cost changes most from month to month?|entertainment|🎬||rent,a fixed phone plan",
    "Which is a good use of a sinking fund?|yearly car insurance|🚗||a daily snack,a yawn",
    "A phone plan costs the same every month. It is what kind of cost?|fixed|📱||variable,free",
    "What can you do after sorting your spending?|find places to cut back|✂️||spend more,hide the receipts"
  ], "Does the amount stay the same or change?"));
  a.push(L("Banking basics", [
    "Accounts|🏦|A <b>checking account</b> is for everyday spending with a debit card or checks. A <b>savings account</b> keeps money safe and pays <b>interest</b>.",
    "Bank safety|🔐|Banks in the United States are usually insured up to a limit by the FDIC. Watch for fees, like monthly fees or overdraft fees when you spend more than you have.",
    "Good habits|📱|Check your balance often, set up alerts, never share your PIN or password, and keep your card safe."
  ], [
    "Which account is best for everyday spending?|checking|💳||savings,retirement",
    "Which account usually pays interest for saving?|savings|💰||a gift card,a wallet",
    "What is an overdraft fee?|a fee for spending more than your balance|⚠️||a reward for saving,a free gift",
    "What should you never share?|your PIN|🔐||the bank's opening hours,your favorite color",
    "What does a bank account alert do?|tells you about account activity|📱||adds money for free,cancels your card",
    "What does FDIC insurance protect?|bank deposits|🏦||your phone,your car",
    "Interest is what?|money the bank pays you for keeping your money|💰||a type of fee you pay every day,a kind of card",
    "How often should you check your balance?|regularly|📱||never,only once a decade"
  ], "Everyday spending and saving go in different places."));
  a.push(L("Carbon monoxide and gas safety", [
    "The invisible danger|🏠|<b>Carbon monoxide (CO)</b> is a gas with no color or smell. It comes from burning fuel in furnaces, stoves, fireplaces, generators and cars. It can make people very sick.",
    "Alarms|🔔|Install CO alarms on every level of the home and near sleeping areas. Test them each month and replace batteries. Never use a grill or generator inside a house or garage.",
    "If it sounds|🚪|If the CO alarm goes off, get everyone outside to fresh air right away and call emergency services. If you smell gas (like rotten eggs), leave and call the gas company from outside."
  ], [
    "What does carbon monoxide smell like?|nothing|🏠||roses,burnt toast",
    "Where should you never use a grill?|inside the house or garage|🍖||in the yard,in an open park",
    "What should you do first if a CO alarm sounds?|go outside to fresh air|🚪||open the oven,go back to sleep",
    "Where do you put CO alarms?|near sleeping areas and on every level|🔔||only in the attic,only in the garden",
    "What is added to natural gas so you can smell leaks?|a rotten-egg smell|👃||vanilla scent,a pretty color",
    "How often should you test a CO alarm?|every month|🔔||every ten years,never",
    "Which can make carbon monoxide?|a gas furnace with a problem|🔥||a glass of water,a closed book",
    "If you smell gas, where do you call from?|outside|📞||standing next to the stove,the kitchen"
  ], "You cannot see or smell this gas, so alarms matter."));
  a.push(L("Kitchen first aid", [
    "Burns|🔥|For a small burn, cool it with cool (not icy) running water for about 10 to 20 minutes. Do not put butter, oil or ice on it. Cover it with a clean, loose bandage. Get help for large or deep burns.",
    "Cuts|🩹|For a small cut, wash your hands, press with a clean cloth to stop the bleeding, rinse the cut with clean water and cover it with a bandage. For deep or heavy bleeding, press firmly and get adult help or call emergency services.",
    "Be ready|🧰|Keep a first aid kit in the kitchen. Tell an adult right away about any injury, and know where the kit is."
  ], [
    "What should you use first on a small burn?|cool running water|💧||butter,ice for an hour",
    "How long should you cool a small burn?|10 to 20 minutes|⏱️||2 seconds,all day",
    "What should you put on a small cut to stop bleeding?|press with a clean cloth|🩹||flour,a hot pan",
    "What should you not put on a burn?|butter|🔥||cool water,a clean bandage",
    "What do you do for a deep cut that bleeds heavily?|press firmly and get adult help|🚑||ignore it,wash it in hot water",
    "What should you do after a small cut is clean?|cover it with a bandage|🩹||leave it open in dirt,wrap it in foil",
    "Where should a first aid kit be kept?|where it is easy to find|🧰||locked far away,in the freezer",
    "Whom should you tell about a kitchen injury?|an adult|👩‍🍳||no one,only a pet"
  ], "Cool for burns and press for cuts."));
  a.push(L("Clean, sanitize, disinfect", [
    "Three steps|🧽|<b>Cleaning</b> removes dirt using soap and water. <b>Sanitizing</b> lowers germs to a safe level. <b>Disinfecting</b> kills most germs on surfaces and is stronger.",
    "Order matters|🧴|Clean first, because dirt blocks sanitizers. Then sanitize or disinfect and follow the label for the <b>contact time</b>, the time the surface must stay wet.",
    "Never mix|⚠️|Never mix bleach with ammonia or other cleaners. It makes dangerous fumes. Ventilate and wear gloves if the label says so."
  ], [
    "Which step removes dirt with soap and water?|cleaning|🧽||disinfecting,sanitizing",
    "What should you do first?|clean|🧼||disinfect,rinse with nothing",
    "What is contact time?|how long the surface stays wet|⏱️||how long you shop,the price of a product",
    "Which cleaners must never be mixed with bleach?|ammonia cleaners|⚠️||plain water,a dry sponge",
    "Which step kills most germs on a surface?|disinfecting|🧴||sweeping,drying",
    "Why clean before sanitizing?|dirt blocks sanitizers|🧽||dirt is a sanitizer,it is faster",
    "Where do you find the contact time?|on the product label|🏷️||on the moon,in a joke",
    "Which is the best choice for a cutting board after raw chicken?|wash, then sanitize|🔪||wipe once with a dry cloth,leave it out"
  ], "Dirt first, germs second."));

  a.push(G("Calories from macros", [
    "Calories in food|🔥|Carbohydrates have <b>4</b> calories per gram, protein has <b>4</b> and fat has <b>9</b>. Fat has more than twice as much energy per gram.",
    "Example|✏️|A snack with 10 g carbs and 2 g fat has 10 × 4 = 40 plus 2 × 9 = 18, so <b>58</b> calories.",
    "Tip|🖐️|Multiply each nutrient by its number first, then add the results."
  ], () => {
    const t = ri(1, 3), c = ri(3, 30), p = ri(2, 20), f = ri(1, 15);
    if (t === 1) return Q(`A snack has ${c} g of carbohydrates and ${f} g of fat. How many calories does it have?`, c * 4 + f * 9, "🍪",
      "Carbs and fat have different calories per gram.", "Multiply carbs by the carb number, fat by the fat number, then add.",
      "5 g carbs and 2 g fat: 5 × 4 = 20 and 2 × 9 = 18, so 38.");
    if (t === 2) return Q(`A food has ${p} g of protein. How many calories come from the protein?`, p * 4, "🍗",
      "Protein gives the same energy per gram as carbs.", "Multiply the grams of protein by the calories in one gram.",
      "6 g of protein: 6 × 4 = 24 calories.");
    return Q(`A spoon of oil has ${f} g of fat. How many calories come from the fat?`, f * 9, "🫒",
      "Fat is the most energy-rich nutrient.", "Multiply the grams of fat by the calories in one gram of fat.",
      "3 g of fat: 3 × 9 = 27 calories.");
  }));
  a.push(G("Calories per serving", [
    "Servings|🍽️|Labels list calories <b>per serving</b>. A recipe's total calories divided by the number of servings gives calories in one serving.",
    "Example|✏️|A pan of lasagna has 1200 calories and makes 6 servings. 1200 ÷ 6 = <b>200</b> calories each.",
    "Tip|🖐️|Divide when you want one share. Multiply when you want many."
  ], () => {
    const s = pick([4, 5, 6, 8, 10]), per = ri(8, 40) * 10, tot = s * per, e = pick([2, 3, 4]);
    if (Math.random() < 0.5) return Q(`A pot of soup has ${tot} calories in all and makes ${s} servings. How many calories in one serving?`, per, "🍲",
      "Share the total equally among the servings.", "Divide the total calories by the number of servings.",
      "A cake has 1600 calories and makes 8 slices. 1600 ÷ 8 = 200.");
    return Q(`One serving of rice has ${per} calories. You eat ${e} servings. How many calories is that?`, per * e, "🍚",
      "More servings means more calories.", "Multiply the calories in one serving by how many servings you eat.",
      "One serving has 150 calories and you eat 2. 150 × 2 = 300.");
  }));
  a.push(G("Fabric yardage and cost", [
    "Buying fabric|🧵|Patterns tell how many yards of fabric you need. The cost is the price per yard times the yards. Always buy a little extra for mistakes and shrinkage.",
    "Example|✏️|A skirt needs 2 yards and fabric costs $6 per yard. 2 × 6 = <b>$12</b>.",
    "Tip|🖐️|Several items? Multiply the yards for one by how many you make."
  ], () => {
    const y = ri(2, 6), p = ri(3, 12), k = ri(2, 5);
    if (Math.random() < 0.5) return Q(`A pattern needs ${y} yards of fabric. The fabric costs $${p} per yard. What is the cost?`, y * p, "🧵",
      "Cost is price times amount.", "Multiply the yards by the price for one yard.",
      "3 yards at $4 per yard: 3 × 4 = $12.");
    return Q(`Each tote bag uses ${y} yards of fabric. How many yards for ${k} bags?`, y * k, "👜",
      "Each bag needs the same amount.", "Multiply the yards for one bag by the number of bags.",
      "2 yards per bag and 3 bags: 2 × 3 = 6 yards.");
  }));
  a.push(G("Overtime pay", [
    "Overtime|⏰|Many workers earn <b>overtime pay</b> for hours over 40 in a week. Overtime is often paid at <b>1.5 times</b> the normal rate, called time-and-a-half.",
    "Example|✏️|Pay is $10 per hour. An overtime hour pays 10 × 1.5 = $15. Three overtime hours pay <b>$45</b>.",
    "Tip|🖐️|Find the overtime rate first, then multiply by the overtime hours."
  ], () => {
    const r = pick([10, 12, 14, 16, 18, 20]), h = pick([2, 4, 6]);
    if (Math.random() < 0.5) return Q(`A worker earns $${r} per hour. What is the time-and-a-half rate for one overtime hour?`, r * 3 / 2, "💼",
      "Time-and-a-half means the pay plus half again.", "Take half of the hourly pay and add it to the pay.",
      "$8 per hour: half is $4, and 8 + 4 = $12.");
    return Q(`A worker earns $${r} per hour and works ${h} overtime hours at time-and-a-half. How much overtime pay is that?`, r * 3 / 2 * h, "💼",
      "Find the overtime hourly rate first.", "Multiply the pay for one overtime hour by the number of overtime hours.",
      "$10 per hour, 2 overtime hours: rate is $15, 15 × 2 = $30.");
  }));
  a.push(G("Saving for a goal", [
    "Goal planning|🎯|To reach a savings goal, subtract what you already have, then divide by the amount you save each week.",
    "Example|✏️|A bike costs $120. You have $40 and save $10 a week. 120 − 40 = 80, and 80 ÷ 10 = <b>8</b> weeks.",
    "Tip|🖐️|Always find how much is still needed before dividing."
  ], () => {
    const w = pick([5, 10, 15, 20, 25]), n = ri(3, 12), have = w * ri(0, 4), goal = have + w * n;
    if (Math.random() < 0.6) return Q(`A game costs $${goal}. You have $${have} and save $${w} each week. How many weeks will you need?`, n, "🎮",
      "First find how much you still need.", "Subtract your savings from the price, then divide by the weekly amount.",
      "A bike costs $120. You have $40 and save $10 a week. 120 − 40 = 80, 80 ÷ 10 = 8.");
    return Q(`You save $${w} each week for ${n} weeks. How much do you have saved?`, w * n, "🐷",
      "Add the same amount many times.", "Multiply the weekly savings by the number of weeks.",
      "$5 for 4 weeks: 5 × 4 = $20.");
  }));
  a.push(G("Laundry cost", [
    "Cost per load|🧺|At a laundromat each load costs money to wash and money to dry. Add them to find the cost of one load, then multiply by the number of loads.",
    "Example|✏️|Washing costs $3 and drying costs $2. One load costs $5. Four loads cost <b>$20</b>.",
    "Tip|🖐️|Doing full loads saves money."
  ], () => {
    const w = ri(2, 5), d = ri(1, 4), k = ri(2, 6);
    if (Math.random() < 0.5) return Q(`Washing costs $${w} and drying costs $${d}. What does one full load cost?`, w + d, "🧺",
      "A load needs both steps.", "Add the washing cost and the drying cost.",
      "Wash $3 and dry $2: 3 + 2 = $5.");
    return Q(`One load costs $${w + d} to wash and dry. How much for ${k} loads?`, (w + d) * k, "🧺",
      "Each load costs the same.", "Multiply the cost of one load by the number of loads.",
      "$5 a load for 3 loads: 5 × 3 = $15.");
  }));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[6], a[7], a[8], a[9], a[10], a[12], a[13], a[15], a[17]]));
  a.push(MIX("Level 19 Challenge", [a[5], a[11], a[12], a[14], a[16], a[17], a[0], a[3], a[8], a[10], a[13], a[15]]));

  // ================= LEVEL 20 =================
  const b = [];
  b.push(L("Fermentation", [
    "Helpful microbes|🥛|<b>Fermentation</b> is when tiny living things like bacteria and yeast change food. It gives sour or tangy flavors and can keep food longer.",
    "Fermented foods|🥬|Yogurt, cheese, sourdough bread, kimchi, sauerkraut, miso, kombucha and pickles made with salt brine are fermented foods.",
    "Make it safe|🧼|Use clean jars and tools, measure salt correctly and follow a trusted recipe. Throw away food with fuzzy mold or a bad smell."
  ], [
    "What does fermentation use to change food?|bacteria and yeast|🥛||metal and glass,wind and rain",
    "Which food is fermented?|yogurt|🥛||fresh apple,plain rice",
    "What does yeast make in bread dough?|carbon dioxide gas|🍞||oxygen only,sugar crystals",
    "Which is a fermented cabbage food?|sauerkraut|🥬||french fries,applesauce",
    "What should you do if fermenting food has fuzzy mold?|throw it away|🗑️||eat it quickly,scrape and ignore it",
    "Fermentation often gives food what flavor?|tangy or sour|😋||only sweet,no flavor",
    "Why use clean jars for fermenting?|to avoid harmful germs|🫙||to make the jar shiny,to save money",
    "Which of these is a fermented soy food?|miso|🍲||tofu water only,plain soybeans"
  ], "Think about helpful microbes."));
  b.push(L("Knife cuts", [
    "Shape matters|🔪|Cutting food into same-size pieces helps it cook evenly. Common cuts: <b>dice</b> (small cubes), <b>julienne</b> (thin matchsticks) and <b>chiffonade</b> (thin ribbons of leafy herbs).",
    "Sizes|📏|A <b>small dice</b> is about 1/4 inch. A <b>medium dice</b> is about 1/2 inch. A <b>large dice</b> is about 3/4 inch.",
    "Safety|🛡️|Keep a flat side on the board, curl your fingers into a claw grip and use a sharp knife. A sharp knife is safer than a dull one."
  ], [
    "Which cut makes thin matchsticks?|julienne|🥕||dice,mince",
    "Which cut makes thin ribbons of basil?|chiffonade|🌿||dice,wedge",
    "Which cut makes small cubes?|dice|🧅||julienne,chiffonade",
    "Why cut pieces the same size?|so they cook evenly|🔪||so they look colorful,so they float",
    "What is the claw grip for?|protecting your fingertips|🖐️||spinning the knife,holding a spoon",
    "Which is safer?|a sharp knife|🔪||a dull knife,a bent knife",
    "About how big is a medium dice?|1/2 inch|📏||5 inches,1/100 inch",
    "What should the food have on the board for safety?|a flat side|🪵||a round side,a wet side"
  ], "Match the shape to its name."));
  b.push(L("Dry heat and moist heat", [
    "Two families|🔥|<b>Dry-heat</b> cooking uses hot air, fat or direct heat: roasting, baking, grilling, sautéing and frying. <b>Moist-heat</b> cooking uses water or steam: boiling, simmering, steaming, poaching and braising.",
    "What each does|🥘|Dry heat browns food and gives crisp surfaces. Moist heat softens tough foods like beans and tough meat and keeps them juicy.",
    "Combination|🍲|<b>Braising</b> mixes both: brown the meat in fat, then cook it slowly in a little liquid in a covered pot."
  ], [
    "Which is a dry-heat method?|roasting|🍗||steaming,poaching",
    "Which is a moist-heat method?|simmering|🍲||grilling,frying",
    "Which method browns food most?|dry heat|🔥||moist heat,no heat",
    "Which method softens tough cuts of meat?|braising|🥘||quick grilling,raw slicing",
    "What does steaming use?|steam|💨||hot oil,hot air",
    "Which uses water as the cooking medium?|boiling|♨️||baking,sautéing",
    "Braising combines browning with what?|slow cooking in liquid|🥘||freezing,raw salad",
    "Which makes a crisp surface?|baking|🍞||poaching,steaming"
  ], "Is the heat carried by air and fat, or by water and steam?"));
  b.push(L("The kitchen team", [
    "The brigade|👩‍🍳|Professional kitchens use a team system. The <b>executive chef</b> leads the kitchen, the <b>sous chef</b> is second in command and <b>line cooks</b> handle stations like grill or sauté.",
    "Stations|🧑‍🍳|A <b>pastry chef</b> bakes desserts and breads. A <b>prep cook</b> gets ingredients ready. A <b>dishwasher</b> keeps tools clean, which is vital to safety.",
    "Teamwork|🤝|Cooks call out 'behind' or 'hot' when passing, keep stations clean and speak clearly so no one gets hurt."
  ], [
    "Who leads a professional kitchen?|executive chef|👩‍🍳||dishwasher,customer",
    "Who is second in command?|sous chef|🧑‍🍳||prep cook,pastry cook",
    "Who makes desserts and breads?|pastry chef|🍰||grill cook,server",
    "What does a prep cook do?|gets ingredients ready|🥕||leads the kitchen,pays the bills",
    "Why do cooks say 'behind'?|to warn others they are passing|⚠️||to ask for lunch,to start a song",
    "Who handles a station like the grill?|line cook|🔥||manager,delivery driver",
    "Why is a dishwasher job important?|clean tools keep food safe|🧼||it makes food spicy,it saves oven heat",
    "What is good communication in a kitchen?|speaking clearly|🗣️||whispering,saying nothing"
  ], "Match each job to what it does."));
  b.push(L("Calcium and vitamin D", [
    "Strong bones|🦴|Bones are living and keep growing through the teen years. <b>Calcium</b> builds and keeps them strong. <b>Vitamin D</b> helps the body absorb calcium.",
    "Sources|🥛|Calcium is in milk, yogurt, cheese, fortified plant milks, tofu made with calcium and leafy greens like kale. Vitamin D is in fatty fish, eggs and fortified foods, and the body makes it when skin gets sunlight.",
    "Habits|🏃|Weight-bearing activity like walking, running and dancing also builds bone. Teens build most of their bone mass, so these habits matter."
  ], [
    "Which mineral builds strong bones?|calcium|🦴||sugar,sodium",
    "Which vitamin helps the body absorb calcium?|vitamin D|☀️||vitamin C,vitamin B12",
    "Which food is a good source of calcium?|yogurt|🥛||soda,plain rice",
    "How can the body get vitamin D?|from sunlight on skin|☀️||from moonlight only,from rocks",
    "Which activity helps build bone?|walking or running|🏃||sitting all day,sleeping all day",
    "Which food is fortified with vitamin D?|some milk|🥛||raw flour,black pepper",
    "When do people build most of their bone mass?|childhood and teen years|🧒||old age,after 80",
    "Which leafy green gives calcium?|kale|🥬||candy,paper"
  ], "Bones need a mineral and a helper vitamin."));
  b.push(L("Hydration", [
    "Why water|💧|Your body is more than half water. Water carries nutrients, controls temperature and removes waste. Even slight dehydration can cause headaches, tiredness and poor focus.",
    "Signs|🌡️|Dark yellow urine, thirst, dry mouth and dizziness are signs you need more fluid. Pale yellow urine usually means you are well hydrated.",
    "How to drink|🥤|Water is best. Fruits and vegetables add water too. Sports drinks are only needed for long, hard exercise. Sugary drinks add many calories."
  ], [
    "What is one job of water in the body?|controls temperature|💧||makes bones glow,holds the bed up",
    "Which can be a sign of dehydration?|dark yellow urine|🌡️||pale yellow urine,a warm smile",
    "Which drink is usually best for daily hydration?|water|💧||soda,energy drink",
    "Which foods add water to the diet?|fruits and vegetables|🍉||potato chips,hard candy",
    "When are sports drinks mainly useful?|during long, hard exercise|🏃||while sitting in class,with breakfast cereal",
    "What can slight dehydration cause?|headache and tiredness|😴||super speed,taller height",
    "What does water help carry?|nutrients|🩸||bricks,electricity",
    "What does pale yellow urine usually mean?|good hydration|✅||no need for any drink at all,a broken kidney"
  ], "Think about what the body uses water for."));
  b.push(L("Eating patterns", [
    "Different ways to eat|🥗|People choose eating patterns for health, culture, beliefs or taste. A <b>vegetarian</b> pattern skips meat. A <b>vegan</b> pattern skips all animal products, including milk, eggs and honey.",
    "Mediterranean|🫒|The Mediterranean pattern uses lots of vegetables, fruit, whole grains, beans, nuts, fish and olive oil, with little red meat.",
    "Plan well|📋|Any pattern can be healthy when it is planned. Vegans should find a reliable vitamin B12 source because B12 is mainly in animal foods."
  ], [
    "Which pattern skips all animal products?|vegan|🥗||vegetarian,Mediterranean",
    "Which pattern includes lots of olive oil, fish and vegetables?|Mediterranean|🫒||vegan,fast food",
    "A vegetarian does not eat what?|meat|🥬||vegetables,rice",
    "Which vitamin do vegans need a reliable source for?|vitamin B12|💊||vitamin pizza,vitamin salt",
    "Which food does a vegan skip?|honey|🍯||apples,rice",
    "What makes any eating pattern healthy?|good planning|📋||skipping meals,eating only snacks",
    "Which protein is plant-based?|beans|🫘||cheese,eggs",
    "Which foods are common in the Mediterranean pattern?|beans and nuts|🥜||soda and candy,fried candy bars"
  ], "Match each name to what it includes or skips."));
  b.push(L("Dyeing and printing", [
    "Adding color|🎨|<b>Dyeing</b> soaks fabric in color so the whole cloth changes. <b>Printing</b> puts colored designs on the surface. Tie-dye, batik and block printing are hand methods.",
    "Natural dyes|🌿|Plants such as onion skins, turmeric, indigo leaves and beets have been used as natural dyes. A <b>mordant</b> helps a dye stick to the fabric.",
    "Care|🧺|Wash new colored fabric separately in cold water until the dye stops running. Bright dyes can fade in strong sun."
  ], [
    "Which method colors the whole cloth?|dyeing|🎨||block printing,hemming",
    "What helps a dye stick to fabric?|a mordant|🧪||a button,a needle",
    "Which is a natural dye plant?|indigo|🌿||plastic,steel",
    "Batik uses what to resist the dye?|wax|🕯️||paper clips,sand",
    "Why wash new colored fabric separately?|the dye may run|🧺||it will shrink to nothing,it gets heavier",
    "Which method uses a carved block?|block printing|🟦||tie-dye,darning",
    "Which technique uses folded and tied cloth?|tie-dye|🌈||batik,quilting",
    "What can bright dyes do in strong sun?|fade|☀️||grow,sing"
  ], "Dyeing covers the whole cloth; printing sits on top."));
  b.push(L("Sewing machine trouble", [
    "Common problems|🧵|If the thread keeps breaking or the stitches look bad, check the basics: is the machine <b>threaded correctly</b> (with the presser foot up), is the needle new and put in right, and is the bobbin wound and placed correctly?",
    "Fixes|🛠️|Skipped stitches often mean a bent or dull needle. Loopy stitches on top often mean the top thread is not in the tension discs. Puckered fabric often means the stitch length or tension is wrong.",
    "Safety|🔌|Turn the machine off or unplug it before changing the needle. Keep fingers away from the needle and cut threads with scissors."
  ], [
    "What is a common cause of skipped stitches?|a bent or dull needle|🪡||too much sunshine,a clean bobbin",
    "When threading, the presser foot should be what?|up|🧵||down,off the table",
    "What should you do before changing the needle?|turn off or unplug the machine|🔌||keep it running,pour on water",
    "Loopy top stitches may mean what?|top thread is not in the tension discs|🧵||the fabric is the wrong color,the room is cold",
    "Puckered fabric can be fixed by changing what?|stitch length or tension|⚙️||the thread color only,the floor",
    "What should you check if thread keeps breaking?|threading and needle|🔍||the weather,the news",
    "What do you cut thread with?|scissors|✂️||fingers,the needle",
    "How should the needle be in the machine?|new and inserted correctly|🪡||as bent as possible,pointing up"
  ], "Start with threading, needle and bobbin."));
  b.push(L("Insurance basics", [
    "Sharing risk|🛡️|<b>Insurance</b> is a plan where many people pay small amounts so a few can be covered for big losses. You pay a <b>premium</b> regularly.",
    "Terms|📄|A <b>deductible</b> is the amount you pay before insurance starts to pay. A <b>claim</b> is a request for the insurer to pay for a loss.",
    "Kinds|🏠|Common types: health, car, renters or home, and life insurance. Renters insurance covers belongings if there is fire or theft."
  ], [
    "What is a premium?|the regular payment for insurance|💵||a prize,a discount coupon",
    "What is a deductible?|what you pay before insurance pays|📄||a tax refund,a free gift",
    "What is a claim?|a request for the insurer to pay|📨||a type of food,a school lesson",
    "Which insurance protects belongings in a rented home?|renters insurance|🏠||pet food,bus pass",
    "Why do people buy insurance?|to be covered for big losses|🛡️||to buy snacks,to avoid all costs forever",
    "Which type covers a car crash?|car insurance|🚗||life insurance,dental floss",
    "Who pays a premium?|the insured person|💳||the neighbor,the weather",
    "If a deductible is higher, the premium is often what?|lower|📉||higher,the same always"
  ], "Insurance is shared protection."));
  b.push(L("Home energy savings", [
    "Heating and cooling|🌡️|Heating and cooling can be about half of a home's energy use. Set the thermostat lower in winter and higher in summer when you are away or asleep.",
    "Leaks|🏠|Seal gaps around windows and doors with weatherstripping or caulk. Add insulation in attics and walls. Close curtains to block summer sun and open them for winter sun.",
    "Small habits|💡|Turn off lights and devices not in use. Wash clothes in cold water. Use LED bulbs and ENERGY STAR appliances."
  ], [
    "What can seal gaps around a door?|weatherstripping|🚪||paint thinner,wrapping paper",
    "What does insulation do?|slows heat moving in or out|🏠||makes the walls louder,adds more windows",
    "In winter, a lower thermostat setting while asleep does what?|saves energy|🌡️||wastes energy,breaks the furnace",
    "Which bulb uses less energy?|LED|💡||old incandescent,candle",
    "Washing clothes in cold water does what?|saves energy|🧺||uses more energy,breaks the machine",
    "Why close curtains on a hot sunny day?|to keep heat out|☀️||to let more heat in,to turn on the lights",
    "Where is insulation important?|attic and walls|🏠||the refrigerator door only,the front lawn",
    "What does ENERGY STAR mark?|efficient appliances|⭐||louder appliances,the oldest appliances"
  ], "Keep heat in during winter and out during summer."));
  b.push(L("Jobs and interviews", [
    "Resume|📄|A <b>resume</b> is a short page listing your contact info, skills, school, volunteer work and experience. Use clear words, no mistakes and be honest.",
    "Interview|🤝|Arrive a bit early, dress neatly, greet the interviewer, make eye contact and answer clearly. Prepare short stories showing teamwork and responsibility.",
    "After|✉️|Send a short thank-you note. Ask good questions, such as about training or the schedule."
  ], [
    "What is a resume?|a short page about your skills and experience|📄||a recipe card,a bank card",
    "When should you arrive for an interview?|a little early|⏰||an hour late,the next day",
    "What should you do with your resume information?|be honest|✅||make things up,hide your skills",
    "What shows responsibility in an interview?|a story about a job you did well|🗣️||staying silent,looking away",
    "What can you send after an interview?|a thank-you note|✉️||a bill,a joke",
    "What can you ask in an interview?|about training or the schedule|❓||how to skip work,nothing is allowed",
    "What should you check on a resume?|spelling and mistakes|🔎||nothing,only the font size",
    "How should you look at the interviewer?|make eye contact|👀||look at your shoes,look at the ceiling"
  ], "Be prepared, polite and honest."));

  b.push(G("Scaling recipes", [
    "Scale factor|⚖️|To change a recipe, find the <b>scale factor</b> = servings wanted ÷ servings in the recipe. Multiply every ingredient by it.",
    "Example|✏️|A recipe for 4 uses 6 eggs. For 8 servings the factor is 2, so use <b>12</b> eggs.",
    "Tip|🖐️|Find the factor first, then multiply."
  ], () => {
    const s = pick([2, 4, 6]), f = pick([2, 3, 4, 5]), amt = ri(1, 6) * 2;
    if (Math.random() < 0.5) return Q(`A recipe for ${s} people uses ${amt} cups of flour. How many cups for ${s * f} people?`, amt * f, "🥣",
      "Find how many times bigger the batch is.", "Multiply the flour by the scale factor.",
      "A recipe for 2 uses 3 cups. For 6, the factor is 3, so 3 × 3 = 9.");
    return Q(`A recipe for ${s * f} servings uses ${amt * f} eggs. How many eggs for ${s} servings?`, amt, "🥚",
      "The batch is getting smaller.", "Divide the eggs by the number you divided the servings by.",
      "A recipe for 12 uses 6 eggs. For 4 servings, divide both by 3: 6 ÷ 3 = 2 eggs.");
  }));
  b.push(G("Cost per serving", [
    "Per serving|🧾|Cost per serving = total cost of ingredients ÷ number of servings. It helps compare homemade and store-bought food.",
    "Example|✏️|Ingredients cost $12 and make 6 servings. 12 ÷ 6 = <b>$2</b> per serving.",
    "Tip|🖐️|Add all ingredient costs first, then divide."
  ], () => {
    const s = pick([4, 5, 6, 8, 10]), per = ri(1, 6), c1 = ri(1, s * per - 1) , tot = s * per, c2 = tot - c1;
    if (Math.random() < 0.5) return Q(`Ingredients cost $${tot} and make ${s} servings. What is the cost per serving?`, per, "🍝",
      "Share the cost equally.", "Divide the total cost by the number of servings.",
      "$15 for 5 servings: 15 ÷ 5 = $3.");
    return Q(`Pasta costs $${c1} and sauce costs $${c2}. Together they make ${s} servings. What is the cost per serving?`, per, "🍝",
      "Add the costs before sharing.", "Add the two costs, then divide by the number of servings.",
      "Rice $4 and beans $2 make 3 servings. 4 + 2 = 6, 6 ÷ 3 = $2.");
  }));
  b.push(G("Percent Daily Value", [
    "Daily Value|🏷️|The <b>% Daily Value</b> on a label says how much of a day's recommended amount one serving gives. 5% or less is low. 20% or more is high.",
    "Example|✏️|If the daily value is 50 g and a serving has 10 g, then 10 ÷ 50 = 0.2, so it is <b>20%</b>.",
    "Tip|🖐️|Divide the amount by the daily value, then change to a percent."
  ], () => {
    const dv = pick([20, 25, 50, 100]), pct = pick([10, 20, 30, 40, 50]), amt = dv * pct / 100;
    if (Math.random() < 0.6) return Q(`Pretend a daily value is ${dv} g. A serving has ${amt} g. What is the % Daily Value?`, pct, "🏷️",
      "Compare the serving amount with the whole day's amount.", "Divide the serving amount by the daily value and multiply by 100.",
      "Daily value is 40 g and a serving has 10 g. 10 ÷ 40 = 0.25, so 25%.");
    return Q(`Pretend a daily value is ${dv} g. A serving gives ${pct}% of it. How many grams are in a serving?`, amt, "🏷️",
      "Find a percent of the daily value.", "Change the percent to a decimal and multiply by the daily value.",
      "Daily value is 40 g and a serving gives 25%. 0.25 × 40 = 10 g.");
  }));
  b.push(G("Kitchen unit conversions", [
    "Handy facts|📏|3 teaspoons = 1 tablespoon. 16 tablespoons = 1 cup. 2 cups = 1 pint. 4 cups = 1 quart. 4 quarts = 1 gallon. 8 fluid ounces = 1 cup.",
    "Example|✏️|2 cups of milk is 2 × 8 = <b>16</b> fluid ounces.",
    "Tip|🖐️|Multiply to go to a smaller unit, divide to go to a bigger unit."
  ], () => {
    const t = ri(1, 4);
    if (t === 1) { const c = ri(2, 6); return Q(`How many fluid ounces are in ${c} cups?`, c * 8, "🥛", "One cup holds a fixed number of ounces.", "Multiply the cups by the ounces in one cup.", "3 cups: 3 × 8 = 24 fluid ounces."); }
    if (t === 2) { const q = ri(2, 6); return Q(`How many cups are in ${q} quarts?`, q * 4, "🥛", "A quart is bigger than a cup.", "Multiply the quarts by the cups in one quart.", "2 quarts: 2 × 4 = 8 cups."); }
    if (t === 3) { const tb = ri(2, 8); return Q(`How many teaspoons are in ${tb} tablespoons?`, tb * 3, "🥄", "A teaspoon is smaller than a tablespoon.", "Multiply the tablespoons by the teaspoons in one tablespoon.", "2 tablespoons: 2 × 3 = 6 teaspoons."); }
    const g = ri(2, 5); return Q(`How many quarts are in ${g} gallons?`, g * 4, "🥛", "A gallon is bigger than a quart.", "Multiply the gallons by the quarts in one gallon.", "3 gallons: 3 × 4 = 12 quarts.");
  }));
  b.push(G("Hem allowance", [
    "Cutting longer|📏|Before sewing, cut the fabric longer than the finished length. The extra is the <b>hem allowance</b>.",
    "Example|✏️|A skirt will be 20 inches long and the hem allowance is 2 inches. Cut it <b>22</b> inches.",
    "Tip|🖐️|Cut length = finished length + hem allowance."
  ], () => {
    const fl = ri(12, 36), h = ri(1, 3);
    if (Math.random() < 0.5) return Q(`A curtain will be ${fl} inches long. The hem allowance is ${h} inches. How long should you cut the fabric?`, fl + h, "📏",
      "The fabric must be longer than the finished curtain.", "Add the hem allowance to the finished length.",
      "A curtain 30 inches long with a 2 inch hem: cut 30 + 2 = 32 inches.");
    return Q(`A skirt panel was cut ${fl + h} inches long with a ${h} inch hem allowance. What is the finished length?`, fl, "📏",
      "The hem folds up and is used up.", "Take the hem allowance away from the cut length.",
      "A panel cut 25 inches with a 3 inch hem: 25 − 3 = 22 inches.");
  }));
  b.push(G("Cost of a loan", [
    "Paying back|🏦|When you borrow, you repay the loan plus <b>interest</b>. Total repaid = payment × number of payments. Interest = total repaid − amount borrowed.",
    "Example|✏️|Borrow $200 and pay $25 a month for 10 months. You repay 25 × 10 = $250, so the interest is <b>$50</b>.",
    "Tip|🖐️|First find the total repaid. Then subtract the loan."
  ], () => {
    const n = pick([6, 8, 10, 12]), m = ri(10, 40), P = Math.floor(m * n * ri(70, 95) / 100 / 10) * 10, tot = m * n;
    if (Math.random() < 0.5) return Q(`You pay $${m} a month for ${n} months on a loan. How much do you repay in all?`, tot, "💳",
      "Add up every payment.", "Multiply the monthly payment by the number of months.",
      "$20 for 6 months: 20 × 6 = $120.");
    return Q(`You borrow $${P} and repay $${m} a month for ${n} months. How much interest do you pay?`, tot - P, "💳",
      "Interest is the extra you pay.", "Find the total repaid, then subtract the amount borrowed.",
      "Borrow $100, pay $12 a month for 10 months: 120 − 100 = $20.");
  }));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[8], b[9], b[10], b[12], b[13], b[15], b[16]]));
  b.push(MIX("Level 20 Challenge", [b[7], b[11], b[12], b[14], b[16], b[17], b[1], b[2], b[4], b[9], b[10], b[13]]));

  // ================= LEVEL 21 =================
  const c = [];
  c.push(L("Starch and gelatinization", [
    "Starch thickens|🥔|Starch grains swell and burst when heated in liquid. This is <b>gelatinization</b>. It happens around 60 to 80 degrees Celsius and thickens sauces, puddings and gravies.",
    "Helpers|🥄|Cornstarch mixed first with cold water (a slurry) avoids lumps. Too much stirring or boiling for too long can break the thickness. Acid can also thin some starch sauces.",
    "Staling|🍞|Starch in baked bread slowly crystallizes and the bread goes stale. This is called <b>retrogradation</b>. Bread goes stale faster in the fridge than at room temperature."
  ], [
    "What is it called when starch swells and thickens in hot liquid?|gelatinization|🥔||evaporation,fermentation",
    "How do you avoid lumps with cornstarch?|mix it with cold water first|🥄||add it dry to boiling liquid,freeze it",
    "A mix of starch and cold water is called what?|a slurry|🥣||a brine,a roux of fat only",
    "Which food is thickened by starch?|gravy|🍲||plain water,black coffee",
    "What does retrogradation cause?|stale bread|🍞||fresher bread,fizzy bread",
    "Where does bread go stale fastest?|in the fridge|🧊||at room temperature,in a warm oven",
    "What can break down a starch sauce?|long boiling or too much stirring|♨️||a short rest,a lid",
    "Which is mostly starch?|potato|🥔||olive oil,egg white"
  ], "Starch grains soak up water as they heat."));
  c.push(L("Preserving food", [
    "Why preserve|🫙|Preserving slows spoilage so food lasts longer. Methods include <b>canning</b>, <b>pickling</b>, <b>drying</b>, <b>freezing</b>, <b>smoking</b>, and <b>salting</b>.",
    "How it works|🔬|Germs need water, warmth, air and the right acidity. Drying removes water, pickling adds acid, salting pulls out water, freezing stops growth and canning seals jars after heating.",
    "Safety|⚠️|Low-acid foods like green beans and meat need a pressure canner for safe canning. Never taste food from a bulging or leaking can or jar. Follow tested recipes."
  ], [
    "Which method removes water from food?|drying|🍇||freezing,pickling in sugar water",
    "Pickling uses what to keep food?|acid|🥒||sunlight,dust",
    "What stops microbes from growing in the freezer?|cold|🧊||sunlight,heat",
    "Low-acid foods need what for safe canning?|a pressure canner|🥫||a microwave,a toaster",
    "What should you do with a bulging can?|do not taste it|🥫||open and taste,share it",
    "What does salting do to food?|pulls out water|🧂||adds water,adds ice",
    "Which is a preserved food?|raisins|🍇||fresh lettuce,milk left out",
    "Why use tested canning recipes?|they are safe|📘||they look pretty,they are shorter"
  ], "Microbes need water, warmth and low acid."));
  c.push(L("Mother sauces", [
    "Five families|🍲|In classic French cooking, five <b>mother sauces</b> are the starting points: béchamel, velouté, espagnole, hollandaise and tomato sauce.",
    "What they are made from|🥄|<b>Béchamel</b> is milk thickened with a roux (flour and butter). <b>Velouté</b> is light stock with a roux. <b>Espagnole</b> is brown stock with a roux. <b>Hollandaise</b> is an emulsion of egg yolk and butter. Tomato sauce is based on tomatoes.",
    "Daughters|👩‍🍳|Add cheese to béchamel and you get a cheese sauce (a 'daughter' sauce). Many sauces grow from the mothers."
  ], [
    "Which mother sauce is milk with a roux?|béchamel|🥛||hollandaise,tomato",
    "Which sauce is an emulsion of egg yolk and butter?|hollandaise|🥚||béchamel,velouté",
    "A roux is made from what?|flour and fat|🥣||sugar and water,eggs and vinegar",
    "Which sauce uses light stock and a roux?|velouté|🍲||hollandaise,tomato",
    "Which mother sauce is based on tomatoes?|tomato sauce|🍅||béchamel,espagnole",
    "Adding cheese to béchamel makes what?|cheese sauce|🧀||hollandaise,brown gravy",
    "What is a daughter sauce?|a sauce made from a mother sauce|👩‍🍳||a sauce for sleeping,a frozen sauce",
    "Which sauce uses brown stock?|espagnole|🍖||béchamel,hollandaise"
  ], "Think about the liquid used with each sauce."));
  c.push(L("Food around the world", [
    "Cooking traditions|🌍|People everywhere cook with what grows near them. Rice is central in East and South Asian cuisines, corn in Mexican food, wheat pasta in Italy and olive oil around the Mediterranean.",
    "Techniques|🥘|Stir-frying is common in China, slow stews in Morocco use a conical clay pot called a <b>tagine</b>, and Mexican cooks use <b>nixtamalization</b> (soaking corn in limewater) to make masa for tortillas.",
    "Respect|🤝|Learning other cuisines teaches about other cultures. Try new dishes with an open mind and respect the traditions behind them."
  ], [
    "Which grain is central in many Asian cuisines?|rice|🍚||oats,rye bread only",
    "What is a tagine?|a clay pot for slow stews|🥘||a type of knife,a type of rice",
    "What is masa used to make?|tortillas|🌽||pizza dough,noodle soup",
    "Which oil is common around the Mediterranean?|olive oil|🫒||palm kernel only,motor oil",
    "Which cooking style is common in China?|stir-frying|🥢||only baking,only smoking",
    "Which country is famous for pasta?|Italy|🍝||Brazil only for pasta,Egypt only for pasta",
    "What is nixtamalization?|soaking corn in limewater|🌽||drying fish,fermenting milk",
    "Why do cuisines differ?|people cook with local ingredients|🌍||all food is identical,no reason at all"
  ], "Cuisines grow from local ingredients and traditions."));
  c.push(L("Glycemic index", [
    "Blood sugar|🩸|Carbohydrates become sugar in the blood. The <b>glycemic index (GI)</b> ranks foods by how quickly they raise blood sugar. High-GI foods raise it fast and low-GI foods raise it slowly.",
    "Examples|🍎|Low-GI foods include beans, oats, most fruits and non-starchy vegetables. High-GI foods include white bread, sugary drinks and instant mashed potato.",
    "Balance|⚖️|Fiber, protein and fat slow digestion. A meal of whole foods keeps energy steadier. People with diabetes watch carbs and blood sugar closely with a doctor's help."
  ], [
    "What does the glycemic index measure?|how fast a food raises blood sugar|🩸||how hot a food is,how much a food costs",
    "Which food is low GI?|beans|🫘||sugary soda,white bread",
    "Which food is high GI?|sugary drink|🥤||oats,lentils",
    "What slows digestion?|fiber, protein and fat|🥗||only sugar,only water",
    "Which carbohydrates become what in the blood?|sugar|🩸||salt,oil",
    "A steady-energy meal uses what?|whole foods|🍎||only candy,no food",
    "Who should plan carbs with a doctor?|people with diabetes|🩺||no one,only chefs",
    "Which breakfast is steadier for energy?|oatmeal with fruit|🥣||sugary cereal only,a soda"
  ], "Slow digestion means a slow rise in blood sugar."));
  c.push(L("Child development", [
    "Stages|🧒|Children grow in stages: infant (0 to 1), toddler (1 to 3), preschool (3 to 5), school age (5 to 12). Each stage has physical, mental, social and emotional growth.",
    "Needs|🧸|Children need love, safe places, healthy food, sleep, play and routines. Play is how young children learn. Reading and talking help language grow.",
    "Safe care|🛡️|Never leave young children alone near water, stairs, hot things or small objects they could swallow. Keep medicine and cleaners locked away."
  ], [
    "What age group is a toddler?|1 to 3 years|🧒||10 to 12 years,16 to 18 years",
    "How do young children mostly learn?|through play|🧸||by sitting still all day,by tests only",
    "Which helps language grow?|reading and talking|📚||silence,loud noise",
    "Which should be locked away from small children?|medicine and cleaners|🔒||toys,books",
    "What should you never allow near small children alone?|water|🌊||blocks,crayons",
    "Which is a basic need for children?|safe place and sleep|🛏️||unlimited sweets,no rules",
    "What age group is an infant?|0 to 1 year|👶||5 to 8 years,12 to 15 years",
    "What helps young children feel secure?|routines|⏰||surprises all day,no schedule"
  ], "Think about safety and play."));
  c.push(L("Care labels", [
    "Reading symbols|🧺|A care label shows how to wash, bleach, dry, iron and dry-clean a garment. A tub symbol means washing, a triangle means bleach, a square means drying, an iron means ironing and a circle means dry cleaning.",
    "Numbers and dots|🌡️|Dots or numbers show temperature. One dot means low and more dots mean hotter. A line under a symbol means a gentler cycle. An X across a symbol means <b>do not</b> do that.",
    "Why it matters|⚠️|Ignoring care labels can shrink, fade or damage clothes. When you are not sure, wash cold and air dry."
  ], [
    "What does a tub symbol show?|washing|🧺||ironing,bleaching",
    "What does a circle symbol show?|dry cleaning|⭕||washing,drying in a square",
    "What does an X across a symbol mean?|do not do it|❌||use more of it,do it twice",
    "What does an iron symbol show?|ironing|♨️||bleaching,drying outside",
    "More dots on a temperature symbol mean what?|hotter|🌡️||colder,no heat",
    "What does a triangle show?|bleaching|🔺||ironing,washing",
    "What is the safest choice when unsure?|wash cold and air dry|🧺||wash hot and tumble hot,iron it first",
    "Where is the care label usually found?|inside the garment|👕||on the front pocket's outside only,on the hanger tag only"
  ], "Each shape stands for one job."));
  c.push(L("Darts, linings and interfacing", [
    "Shaping|🪡|A <b>dart</b> is a folded, stitched wedge that shapes fabric to fit curves of the body. It narrows to a point.",
    "Support|🧵|<b>Interfacing</b> is a layer fused or sewn inside to stiffen collars, cuffs and waistbands. A <b>lining</b> is a second layer inside a garment that hides seams and feels smooth.",
    "Press as you go|♨️|Press each seam or dart before the next step. Use the right heat for the fabric and a pressing cloth to protect it."
  ], [
    "What does a dart do?|shapes fabric to fit curves|🪡||adds a pocket,hides a zipper",
    "What does interfacing do?|stiffens and supports|🧵||adds color,makes it wet",
    "What is a lining?|a second layer inside a garment|👗||a type of needle,a button",
    "Where is interfacing often used?|collars and cuffs|👔||on shoelaces,on the buttons only",
    "What does a pressing cloth do?|protects the fabric from heat|♨️||adds heat,cuts the fabric",
    "Which gives a smooth inside finish?|lining|👗||dart,pin",
    "When should you press seams?|as you sew|⏱️||never,only at the very end",
    "A dart narrows to what?|a point|📐||a circle,a square"
  ], "Dart shapes, interfacing supports, lining hides."));
  c.push(L("Design principles", [
    "Elements|🎨|Design elements are the building blocks: <b>line</b>, <b>shape</b>, <b>color</b>, <b>texture</b> and <b>space</b>. They are used in clothing, rooms and food plating.",
    "Principles|🖼️|Principles guide how we use them: <b>balance</b>, <b>emphasis</b> (a focal point), <b>rhythm</b> (repeat), <b>proportion</b> and <b>harmony</b> (everything fits).",
    "Use them|🏠|A room with one bold cushion draws the eye (emphasis). Matching stripes repeated across a dress create rhythm."
  ], [
    "Which is a design element?|texture|🧶||harmony,balance",
    "Which principle gives a focal point?|emphasis|🎯||rhythm,line",
    "Which principle repeats shapes or colors?|rhythm|🔁||emphasis,shape",
    "Which design element is a color or a hue?|color|🌈||proportion,balance",
    "What is balance?|equal visual weight|⚖️||one huge thing,no pattern",
    "What does harmony mean?|everything fits together|🤝||everything clashes,no design",
    "Which is a design principle?|proportion|📐||line,texture",
    "A single bold pillow in a calm room shows what?|emphasis|🛋️||rhythm,balance of ten pillows"
  ], "Elements are parts; principles are guidelines."));
  c.push(L("Identity theft safety", [
    "What it is|🔐|<b>Identity theft</b> is when someone uses your personal information, like your name, birth date or numbers, to cheat. Keep private details private.",
    "Protect yourself|🛡️|Use strong, different passwords. Turn on two-step login. Do not share account numbers or passwords. Do not click links in surprise messages asking for personal information. Shred papers with private numbers.",
    "If something looks wrong|📣|Tell a trusted adult. They can check accounts, change passwords, and place a fraud alert or freeze on a credit report."
  ], [
    "What is identity theft?|using someone's personal information to cheat|🔐||borrowing a pencil,making a new friend",
    "What should you do with surprise links asking for private details?|do not click them|⚠️||click and answer,share them widely",
    "What makes a strong password?|long and different for each account|🔑||your name,the same for all sites",
    "What does two-step login add?|an extra check|📱||a free gift,nothing",
    "What should you do with papers with private numbers?|shred them|📄||toss them whole,post them",
    "Who do you tell if something looks wrong?|a trusted adult|👩||a stranger online,no one",
    "What can adults place on a credit report to protect it?|a freeze|🧊||a sticker,a new color",
    "Should you share passwords?|no|🙅||yes with friends,yes in public"
  ], "Keep private details private."));
  c.push(L("Taxes and paperwork", [
    "Paycheck forms|📄|When you start a job you fill in a <b>W-4</b> so your employer knows how much income tax to take out of your pay. Your employer sends a <b>W-2</b> after the year ends, showing your pay and tax withheld.",
    "Filing|🗓️|You use your W-2 to file an income tax return, usually by mid-April in the United States. If too much tax was withheld you may get a refund. If too little, you may owe more.",
    "Keep records|🗂️|Keep tax papers and receipts safely for several years. Free help is often available for people with lower incomes."
  ], [
    "Which form tells your employer how much tax to withhold?|W-4|📄||W-2,receipt",
    "Which form shows your yearly pay and tax withheld?|W-2|📄||W-4,menu",
    "When is the tax return usually due in the United States?|mid-April|🗓️||mid-December,never",
    "What can happen if too much tax was withheld?|you get a refund|💵||you owe a fine,nothing at all",
    "Who sends a W-2?|your employer|🏢||your teacher,your bank on its own",
    "Why keep tax records?|to prove your income and deductions|🗂️||to fill a drawer,to bake with",
    "What do you file with your W-2?|an income tax return|📝||a grocery list,a school form",
    "How long should tax papers be kept?|several years|⏳||one hour,never keep them"
  ], "W-4 comes at the start; W-2 at the end."));
  c.push(L("Living with others", [
    "Sharing a home|🏠|Living with family, friends or roommates works best with clear rules about chores, noise, guests, food and money. Talk about them before problems start.",
    "Good conflict skills|🗣️|Stay calm, listen, use 'I' statements ('I feel tired when the sink is full'), look for a compromise and agree on a plan. Avoid yelling and blaming.",
    "Be fair|📝|A chore chart or a list of shared bills helps everyone see what is fair. Respect others' privacy and belongings."
  ], [
    "What is a good start to sharing a home?|agree on rules early|🏠||wait for a fight,hide all chores",
    "Which is an 'I' statement?|I feel tired when the sink is full|🗣️||You are lazy,You never do anything",
    "What is a compromise?|each person gives a little|🤝||one person wins everything,nobody speaks",
    "What helps chores feel fair?|a chore chart|📝||guessing,surprise punishments",
    "What should you do when you are upset?|stay calm and listen|🧘||yell,leave a mean note",
    "Should you use a roommate's food without asking?|no|🍽️||yes always,only at night",
    "What should shared bills have?|a clear list of who pays what|💵||no list,secret amounts",
    "What helps solve a conflict?|a plan everyone agrees on|✅||blaming,ignoring it forever"
  ], "Fair, calm and clear."));

  c.push(G("Roasting times", [
    "Cooking time|🍗|Many roasts are timed by weight: minutes per pound × pounds. Always check the safe inside temperature with a food thermometer, because time is only a guide.",
    "Example|✏️|A 4 pound roast at 30 minutes per pound needs 4 × 30 = <b>120</b> minutes.",
    "Tip|🖐️|Multiply first. Divide by 60 to turn minutes into hours."
  ], () => {
    const lb = ri(2, 8), m = pick([15, 20, 25, 30]);
    if (Math.random() < 0.6) return Q(`A roast needs ${m} minutes per pound. It weighs ${lb} pounds. How many minutes should it roast?`, lb * m, "🍗",
      "Each pound needs the same time.", "Multiply the pounds by the minutes per pound.",
      "3 pounds at 20 minutes per pound: 3 × 20 = 60 minutes.");
    return Q(`A roast takes ${lb * m} minutes in all at ${m} minutes per pound. How many pounds is it?`, lb, "🍗",
      "Share the total time into pound-sized parts.", "Divide the total minutes by the minutes per pound.",
      "A roast takes 90 minutes at 30 per pound: 90 ÷ 30 = 3 pounds.");
  }));
  c.push(G("Weekly meal plan cost", [
    "Planning meals|📅|Planning meals saves money. Add up the cost of each meal or day to find the cost of the week.",
    "Example|✏️|If dinners cost $8 each for 5 nights, the total is 8 × 5 = <b>$40</b>.",
    "Tip|🖐️|Same cost each time? Multiply. Different costs? Add."
  ], () => {
    const d = ri(3, 9), n = ri(3, 7), x = ri(10, 30), y = ri(10, 30), z = ri(10, 30);
    if (Math.random() < 0.5) return Q(`Dinners cost $${d} each. How much do ${n} dinners cost?`, d * n, "🍽️",
      "All the dinners cost the same.", "Multiply the cost of one dinner by the number of dinners.",
      "Each dinner costs $6. For 4 dinners: 6 × 4 = $24.");
    return Q(`A meal plan costs $${x} on Monday, $${y} on Tuesday and $${z} on Wednesday. How much is it altogether?`, x + y + z, "📅",
      "Each day costs a different amount.", "Add the costs of all three days.",
      "Costs of $12, $15 and $9: 12 + 15 + 9 = $36.");
  }));
  c.push(G("Servings per container", [
    "Reading the label|📦|Labels list <b>servings per container</b> and calories per serving. Multiply them to find the whole package.",
    "Example|✏️|A bag has 4 servings and 150 calories per serving. 4 × 150 = <b>600</b> calories in the bag.",
    "Tip|🖐️|Eating the whole package means eating all the servings."
  ], () => {
    const s = ri(2, 8), cal = ri(5, 30) * 10, g = ri(2, 12), e = ri(2, 3);
    if (Math.random() < 0.5) return Q(`A box has ${s} servings with ${cal} calories each. How many calories in the whole box?`, s * cal, "📦",
      "Add up all the servings.", "Multiply the servings by the calories in one serving.",
      "3 servings at 100 calories each: 3 × 100 = 300.");
    return Q(`One serving has ${g} g of sugar. You eat ${e} servings. How many grams of sugar is that?`, g * e, "🍬",
      "More servings mean more grams.", "Multiply the grams in one serving by the number of servings.",
      "4 g sugar per serving and 2 servings: 4 × 2 = 8 g.");
  }));
  c.push(G("Net worth", [
    "What you own and owe|💼|<b>Assets</b> are things of value that you own. <b>Liabilities</b> are debts you owe. <b>Net worth</b> = assets − liabilities.",
    "Example|✏️|You have $500 in savings and a $200 bike, and you owe $100. Assets are $700. Net worth is 700 − 100 = <b>$600</b>.",
    "Tip|🖐️|Add the assets first, then subtract the debts."
  ], () => {
    const a1 = ri(2, 20) * 50, a2 = ri(1, 10) * 50, d = ri(1, 8) * 50;
    if (Math.random() < 0.6) return Q(`You have $${a1} in savings and a computer worth $${a2}. You owe $${d}. What is your net worth in dollars?`, a1 + a2 - d, "💼",
      "Add what you own first.", "Subtract the debt from the total of your assets.",
      "Savings $300, a bike $100, debt $50: 300 + 100 = 400, 400 − 50 = 350.");
    return Q(`Your assets are $${a1 + a2} and your debts are $${d}. What is your net worth in dollars?`, a1 + a2 - d, "💼",
      "Compare what you own with what you owe.", "Subtract the debts from the assets.",
      "Assets $500, debts $120: 500 − 120 = 380.");
  }));
  c.push(G("Down payment", [
    "Buying a home|🏡|A <b>down payment</b> is a percent of the price you pay up front. A mortgage loan covers the rest. A bigger down payment means a smaller loan.",
    "Example|✏️|A home costs $200,000 and the down payment is 10%. 10% of 200,000 is <b>$20,000</b>. The loan is $180,000.",
    "Tip|🖐️|Find the percent of the price first."
  ], () => {
    const price = pick([100, 150, 200, 250, 300, 400]) * 1000, pct = pick([5, 10, 20]), dp = price * pct / 100;
    if (Math.random() < 0.5) return Q(`A home costs $${price}. The down payment is ${pct}%. How many dollars is the down payment?`, dp, "🏡",
      "Take a percent of the price.", "Multiply the price by the percent written as a decimal.",
      "A home costs $100,000 with a 10% down payment. 10% of 100,000 is $10,000.");
    return Q(`A home costs $${price} and the down payment is ${pct}%. How many dollars must the loan cover?`, price - dp, "🏡",
      "The loan covers what is left after the down payment.", "Find the down payment, then subtract it from the price.",
      "A home costs $100,000, 10% down is $10,000, so the loan is $90,000.");
  }));
  c.push(G("Sharing household costs", [
    "Splitting bills|🏠|Roommates often split rent and bills equally. Add the costs, then divide by the number of people.",
    "Example|✏️|Rent is $900 and utilities are $150 for 3 roommates. 900 + 150 = 1050, and 1050 ÷ 3 = <b>$350</b> each.",
    "Tip|🖐️|Add first, then divide."
  ], () => {
    const p = pick([2, 3, 4]), each = ri(2, 8) * 50, r = each * p - ri(1, 3) * p * 10, u = each * p - r;
    if (Math.random() < 0.5) return Q(`Three friends share a $${each * 3} bill equally. How much does each person pay?`, each, "🏠",
      "Share it equally.", "Divide the bill by the number of people.",
      "A $90 bill shared by 3 friends: 90 ÷ 3 = $30.");
    return Q(`Rent is $${r} and utilities are $${u} for ${p} roommates. What does each person pay if they split equally?`, each, "🏠",
      "Find the total bills first.", "Add rent and utilities, then divide by the number of roommates.",
      "Rent $400 and utilities $80 for 4 roommates: 480 ÷ 4 = $120.");
  }));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[9], c[10], c[12], c[13], c[15], c[16]]));
  c.push(MIX("Level 21 Challenge", [c[8], c[11], c[12], c[14], c[16], c[17], c[1], c[2], c[4], c[9], c[10], c[13]]));

  Object.assign(HOMEEC_LEVELS, { 19: a, 20: b, 21: c });
})();
