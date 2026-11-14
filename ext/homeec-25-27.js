// ext/homeec-25-27.js  Home Economics levels 25-27 (12th grade, College year 1 first half)
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

  // ================= LEVEL 25 =================
  const a = [];
  a.push(L("Energy from food", [
    "ATP, the energy coin|⚡|Cells run on a small molecule called <b>ATP</b>. Digestion breaks carbohydrates into <b>glucose</b>, proteins into <b>amino acids</b> and fats into <b>fatty acids</b>. Cells then use these to make ATP.",
    "Cellular respiration|🔋|Most ATP is made in the <b>mitochondria</b>. The cell uses oxygen to release energy from glucose and gives off carbon dioxide and water.",
    "Storage|🥔|Extra glucose is stored as <b>glycogen</b> in the liver and muscles. Fat stores the most energy: 9 kcal per gram, compared with 4 for carbohydrate and protein."
  ], [
    "What molecule carries usable energy in cells?|ATP|⚡||DNA,fiber",
    "Where do cells make most of their ATP?|mitochondria|🔋||the nucleus,ribosomes",
    "Digestion breaks carbohydrates down into what?|glucose|🍞||amino acids,fatty acids",
    "Digestion breaks proteins down into what?|amino acids|🥚||glucose,fatty acids",
    "What is glucose stored as in the liver and muscles?|glycogen|🥔||cellulose,gelatin",
    "Which gas do cells use in aerobic respiration?|oxygen|🫁||nitrogen,helium",
    "Which gas is given off by cells during respiration?|carbon dioxide|💨||oxygen,hydrogen",
    "Which nutrient stores the most energy per gram?|fat|🥑||carbohydrate,protein"
  ], "Follow the path from food to cell."));
  a.push(L("Protein quality", [
    "Amino acids|🧬|Proteins are chains of <b>amino acids</b>. There are 20 kinds, and 9 are <b>essential</b>, which means the body cannot make them and must get them from food.",
    "Complete proteins|🥚|A <b>complete protein</b> has all nine essential amino acids. Eggs, milk, meat, fish, soy and quinoa are complete.",
    "Complementary proteins|🍚|Most plant foods are low in one or two essential amino acids. Foods like rice and beans fill each other's gaps. You can eat them across the day, not only at one meal."
  ], [
    "How many essential amino acids must come from food?|9|🧬||4,20",
    "What is a complete protein?|it has all nine essential amino acids|🥚||it has no calories,it comes only from plants",
    "Which plant food is a complete protein?|soy|🫘||lettuce,corn",
    "Rice and beans together are an example of what?|complementary proteins|🍚||a food additive,a fat substitute",
    "Which food is a complete protein?|eggs|🥚||apples,white rice",
    "What are proteins made of?|amino acids|🧬||fatty acids,simple sugars",
    "Why are some amino acids called essential?|the body cannot make them|🧬||they taste the best,only athletes need them",
    "When should complementary proteins be eaten?|across the day|🍽️||only in the same bite,never together"
  ], "Think about what the body can and cannot build."));
  a.push(L("Enzymatic browning", [
    "Why apples turn brown|🍎|When you cut an apple, an enzyme called <b>polyphenol oxidase</b> meets oxygen in the air. It makes brown pigments. This is harmless and is not the same as the Maillard reaction, which needs heat.",
    "Slowing it down|🍋|Acid, such as lemon juice, lowers the pH so the enzyme works badly. Cold slows it too. Covering slices with water keeps oxygen away.",
    "Heat stops it|♨️|Heat <b>denatures</b> enzymes, so they stop working. That is why vegetables are blanched before freezing."
  ], [
    "What makes cut apples turn brown?|an enzyme reacting with oxygen|🍎||bacteria growing,sugar melting",
    "What is the browning enzyme called?|polyphenol oxidase|🧪||pepsin,lipase",
    "Which helps stop browning?|lemon juice|🍋||leaving slices in the sun,warm air",
    "Why does acid slow browning?|the enzyme works badly at low pH|🍋||it adds oxygen,it makes fruit warmer",
    "Why does blanching help stop browning?|heat destroys the enzymes|♨️||it adds more sugar,it freezes the enzymes awake",
    "Is enzymatic browning the same as the Maillard reaction?|no, Maillard needs heat|🔥||yes they are identical,yes both need an enzyme",
    "Which method keeps apple slices from browning?|covering them with water|💧||leaving them in open air,warming them up",
    "Which fruit browns quickly when cut?|banana|🍌||watermelon,orange"
  ], "An enzyme plus oxygen causes it."));
  a.push(L("Heat transfer in cooking", [
    "Conduction|🍳|<b>Conduction</b> is heat moving through direct contact, like from a hot pan to a pancake. Metals such as copper conduct heat well. Wood conducts poorly.",
    "Convection|🌬️|<b>Convection</b> is heat carried by moving air or liquid. Boiling water circulates, and a convection oven uses a fan to move hot air.",
    "Radiation|🔥|<b>Radiation</b> is heat carried by waves, like the glowing element of a broiler. It needs no contact."
  ], [
    "Heat moving from a hot pan into a pancake is what?|conduction|🍳||convection,radiation",
    "A fan moving hot air around the oven is what?|convection|🌬️||conduction,radiation",
    "A broiler's glowing element heats food mostly by what?|radiation|🔥||conduction,convection",
    "Currents in boiling water carry heat by what?|convection|♨️||radiation,conduction",
    "A metal spoon left in hot soup warms up by what?|conduction|🥄||radiation,evaporation",
    "Which material conducts heat best?|copper|🥘||wood,silicone",
    "Why do wooden spoon handles stay cooler?|wood conducts heat poorly|🥄||wood reflects all light,wood is always wet",
    "Why does a convection oven cook faster?|a fan moves hot air|🌬️||it uses less heat in total,it is bigger inside"
  ], "Decide: contact, moving fluid or waves?"));
  a.push(L("Antioxidants", [
    "Free radicals|🛡️|Some unstable molecules, called <b>free radicals</b>, can damage cells. <b>Antioxidants</b> calm them down. Vitamin C, vitamin E, beta-carotene and many plant colors act as antioxidants.",
    "In foods|🫐|Berries, oranges, peppers, nuts and leafy greens are rich sources. Antioxidants also keep oils from going <b>rancid</b>, so cooks add vitamin C or E to some products.",
    "Food first|🥗|Studies show that whole foods help health more than high-dose antioxidant pills. A colorful plate is the best plan."
  ], [
    "What do antioxidants do?|calm damaging free radicals|🛡️||add salt to foods,make food sweeter",
    "Which vitamin is an antioxidant?|vitamin C|🍊||vitamin K,vitamin B12",
    "Which food is rich in vitamin C?|oranges|🍊||white bread,butter",
    "Which food is a good source of vitamin E?|almonds|🥜||plain rice,soda",
    "Why might a cook add vitamin C to a product?|to slow spoilage and browning|🧪||to make it salty,to add fat",
    "What is the best way to get antioxidants?|colorful whole foods|🥗||only high-dose pills,only fried foods",
    "What can antioxidants stop cooking oils from doing?|going rancid|🫒||boiling,freezing",
    "Beta-carotene in carrots can become what?|vitamin A|🥕||vitamin D,vitamin K"
  ], "Think about protecting cells and food."));
  a.push(G("Bacteria doubling", [
    "Fast growth|🦠|In the danger zone, some bacteria <b>double</b> about every 20 to 30 minutes. Doubling means multiplying by 2 each time.",
    "Counting doublings|🧮|Find how many doubling periods fit in the time. Then double the starting number that many times: 1 → 2 → 4 → 8.",
    "Why it matters|⏰|After a few hours a tiny number becomes millions. That is why food should not sit out for more than 2 hours."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const s = pick([1, 2, 3, 5, 10]), k = ri(2, 5);
      return Q(`Bacteria double every 20 minutes. The count starts at ${s}. What is the count after ${20 * k} minutes?`, s * Math.pow(2, k), "🦠",
        "First work out how many 20-minute periods fit in the time.", "Double the starting count once for each period.",
        "Start at 3 and wait 40 minutes: that is 2 doublings, 3 → 6 → 12."); }
    if (t < 0.75) { const s = pick([50, 100, 200]), h = ri(1, 3);
      return Q(`Bacteria double every 30 minutes. The count starts at ${s}. What is the count after ${h} ${h === 1 ? "hour" : "hours"}?`, s * Math.pow(2, 2 * h), "🦠",
        "There are two 30-minute periods in an hour.", "Count the periods, then double that many times.",
        "Start at 10 and wait 1 hour: 2 doublings, 10 → 20 → 40.");
    }
    const k = ri(2, 6);
    return Q(`Bacteria double every 15 minutes. How many doublings happen in ${15 * k} minutes?`, k, "⏱️",
      "Divide the total time by the length of one doubling.", "How many 15-minute pieces fit in the total?",
      "In 60 minutes with a 20-minute doubling time, 60 ÷ 20 = 3 doublings.");
  }));
  a.push(G("Cooking yield", [
    "Cooked weight|🥩|Meat loses water and fat when cooked, so it weighs less. <b>Yield % = cooked weight ÷ raw weight × 100</b>.",
    "Planning purchases|🛒|If you know the yield, you can work out how much raw food to buy: <b>raw = cooked needed × 100 ÷ yield %</b>.",
    "Loss|📉|The weight lost is raw weight minus cooked weight. Chefs use yields to cost menus."
  ], () => {
    const R = pick([20, 40, 60, 80]), y = pick([50, 60, 70, 75, 80, 90]), C = R * y / 100, t = Math.random();
    if (t < 0.4) return Q(`A roast weighs ${R} oz raw and ${C} oz after cooking. What is its yield percent?`, y, "🥩",
      "Compare the cooked weight with the raw weight.", "Divide cooked by raw, then multiply by 100.",
      "A 20 oz roast cooks down to 10 oz: 10 ÷ 20 = 0.5, so 50%.");
    if (t < 0.7) return Q(`A roast weighs ${R} oz raw and ${C} oz cooked. How many ounces were lost?`, R - C, "🥩",
      "Lost weight is the difference between the two weights.", "Subtract cooked from raw.",
      "A 30 oz roast cooks to 24 oz: 30 - 24 = 6 oz lost.");
    const y2 = pick([50, 75, 80]), R2 = pick([20, 40, 60, 80]), C2 = R2 * y2 / 100;
    return Q(`You need ${C2} oz of cooked meat. The yield is ${y2}%. How many raw ounces should you buy?`, R2, "🛒",
      "Raw must be more than cooked because meat shrinks.", "Multiply the cooked amount by 100, then divide by the yield percent.",
      "You need 30 oz cooked at 60% yield: 30 × 100 ÷ 60 = 50 oz raw.");
  }));
  a.push(L("Sensory evaluation", [
    "Testing food with the senses|👅|Food scientists judge appearance, aroma, flavor, texture and even sound (crunch). A panel of tasters gives more reliable results than one person.",
    "Fair tests|🧪|Samples are given random codes, not names, so tasters are not influenced. Water or plain crackers clean the palate between samples.",
    "Common tests|📝|A <b>triangle test</b> gives three samples (two alike) and asks which is different. A <b>hedonic scale</b> asks how much you like something, for example from 1 to 9."
  ], [
    "Which senses do food scientists use to judge food?|sight, smell, taste, touch and hearing|👅||only taste,only sight",
    "Why are samples given random codes?|so tasters are not influenced|🔢||to make food cheaper,to hide the price",
    "What is used to clean the palate between samples?|water or plain crackers|💧||strong coffee,candy",
    "In a triangle test, what do tasters find?|which sample is different|🔺||the cheapest sample,the biggest sample",
    "What does a hedonic scale measure?|how much people like a food|😋||how hot a food is,how heavy a food is",
    "Why use a panel instead of one taster?|results are more reliable|👥||it takes less time,tasters never disagree",
    "Which is a texture word?|crunchy|🥨||purple,loud",
    "What is a blind test?|tasters do not know which product is which|🙈||tasters wear sunglasses,the food is hidden in a bag forever"
  ], "Fair testing removes bias."));
  a.push(G("Fabric weight (GSM)", [
    "Grams per square meter|⚖️|<b>GSM</b> tells how heavy a fabric is: grams in one square meter. Light shirting is about 100 GSM. Heavy denim is over 300.",
    "Area first|📐|Area = length × width in meters. Then <b>weight = GSM × area</b>.",
    "Working backward|🔁|To find GSM, divide the weight by the area. To find the area, divide the weight by the GSM."
  ], () => {
    const t = Math.random(), gsm = pick([100, 150, 200, 250]);
    if (t < 0.4) { const l = ri(2, 6), w = pick([1, 2]);
      return Q(`A piece of fabric is ${l} m long and ${w} m wide. It is ${gsm} GSM. How many grams does it weigh?`, gsm * l * w, "🧵",
        "Find the area in square meters first.", "Multiply the area by the grams per square meter.",
        "A piece 2 m by 1 m at 100 GSM: area 2, so 100 × 2 = 200 g."); }
    if (t < 0.7) { const A = ri(2, 8);
      return Q(`A ${A} square meter piece of cloth weighs ${gsm * A} g. What is its GSM?`, gsm, "🧵",
        "GSM means grams for each one square meter.", "Divide the weight by the area.",
        "A 3 m² piece weighs 450 g: 450 ÷ 3 = 150 GSM.");
    }
    const A = ri(2, 8);
    return Q(`A piece of ${gsm} GSM fabric weighs ${gsm * A} g. How many square meters is it?`, A, "🧵",
      "Weight is GSM times area, so work backward.", "Divide the weight by the GSM.",
      "A 100 GSM piece weighs 500 g: 500 ÷ 100 = 5 m².");
  }));
  a.push(L("Erikson's stages", [
    "Eight stages|🪜|Psychologist Erik Erikson said we face a main social challenge at each stage of life. Each is a pair, like trust versus mistrust.",
    "Early life|👶|Infancy: <b>trust vs mistrust</b>. Toddler: <b>autonomy vs shame and doubt</b>. Preschool: <b>initiative vs guilt</b>. School age: <b>industry vs inferiority</b>.",
    "Later life|🧑‍🎓|Adolescence: <b>identity vs role confusion</b>. Young adult: <b>intimacy vs isolation</b>. Middle adult: <b>generativity vs stagnation</b>. Late adult: <b>integrity vs despair</b>."
  ], [
    "Who proposed eight stages of psychosocial development?|Erik Erikson|🧠||Jean Piaget,Albert Bandura",
    "What is the infancy challenge?|trust vs mistrust|👶||industry vs inferiority,identity vs role confusion",
    "What is the adolescent challenge?|identity vs role confusion|🧑‍🎓||trust vs mistrust,initiative vs guilt",
    "What is the school-age challenge?|industry vs inferiority|🎒||intimacy vs isolation,autonomy vs shame and doubt",
    "What is the toddler challenge?|autonomy vs shame and doubt|🧒||integrity vs despair,generativity vs stagnation",
    "What is the young adult challenge?|intimacy vs isolation|🧑||trust vs mistrust,initiative vs guilt",
    "What is the preschool challenge?|initiative vs guilt|🎨||identity vs role confusion,integrity vs despair",
    "What is the late adulthood challenge?|integrity vs despair|🧓||industry vs inferiority,intimacy vs isolation"
  ], "Match the age to the challenge."));
  a.push(L("Piaget's stages", [
    "Four stages of thinking|🧠|Jean Piaget studied how children think. <b>Sensorimotor</b> (birth to about 2): learning by senses and actions. <b>Preoperational</b> (about 2 to 7): pretend play and egocentric thinking.",
    "Later stages|📚|<b>Concrete operational</b> (about 7 to 11): logical thinking about real things, including conservation. <b>Formal operational</b> (about 12 and up): abstract and hypothetical thinking.",
    "Key ideas|🔑|<b>Object permanence</b> means knowing a hidden object still exists. <b>Conservation</b> means knowing an amount stays the same when its shape changes."
  ], [
    "Which stage includes object permanence?|sensorimotor|🧸||preoperational,formal operational",
    "Which stage is full of pretend play and egocentric thinking?|preoperational|👑||concrete operational,sensorimotor",
    "Knowing a tall thin glass and a short wide glass hold the same water shows what?|conservation|🥛||object permanence,egocentrism",
    "Which stage includes abstract and hypothetical thinking?|formal operational|💭||sensorimotor,preoperational",
    "Which stage covers about ages 7 to 11?|concrete operational|🎒||sensorimotor,formal operational",
    "A baby learns mainly through senses and actions in which stage?|sensorimotor|👶||concrete operational,formal operational",
    "Knowing a ball under a blanket is still there is called what?|object permanence|⚽||conservation,egocentrism",
    "Which stage starts around age 12?|formal operational|🧑‍🎓||preoperational,concrete operational"
  ], "Match the kind of thinking to the age."));
  a.push(L("Attachment and parenting styles", [
    "Attachment|🤗|Research by Bowlby and Ainsworth shows that babies who get warm, steady care develop <b>secure attachment</b>. They explore with confidence and seek comfort when upset.",
    "Parenting styles|🏡|Diana Baumrind described four styles. <b>Authoritative</b>: warm and firm with clear rules. <b>Authoritarian</b>: strict, with little warmth. <b>Permissive</b>: warm, with few rules. <b>Uninvolved</b>: little warmth and few rules.",
    "Best outcomes|🌱|The authoritative style is linked with the best outcomes for children's confidence and self-control. No family is perfect, and kids need warmth and limits."
  ], [
    "What does secure attachment come from?|warm and steady care|🤗||being left alone,strict punishments",
    "Which style is warm and firm with clear rules?|authoritative|🏡||authoritarian,permissive",
    "Which style is strict with little warmth?|authoritarian|🏡||authoritative,permissive",
    "Which style is warm but sets few rules?|permissive|🏡||uninvolved,authoritative",
    "Which style has little warmth and few rules?|uninvolved|🏡||authoritative,authoritarian",
    "Who described four parenting styles?|Diana Baumrind|📚||Erik Erikson,Jean Piaget",
    "A securely attached child usually does what?|explores and seeks comfort when upset|🧸||never needs anyone,avoids all new things",
    "Which style is linked with the best outcomes?|authoritative|🌱||authoritarian,uninvolved"
  ], "Think about warmth and rules."));
  a.push(L("Family structures", [
    "Many kinds of families|👨‍👩‍👧‍👦|A <b>nuclear</b> family has parents and children. A <b>single-parent</b> family has one parent. A <b>blended</b> family joins parents and children from earlier families. An <b>extended</b> family includes grandparents, aunts, uncles and cousins.",
    "More structures|🏠|<b>Foster</b> and <b>adoptive</b> families care for children who need a home. <b>Multigenerational</b> households have several generations under one roof.",
    "What families do|💞|Families give care, teach values, share resources and offer emotional support, whatever their shape."
  ], [
    "Which family has two parents and their children?|nuclear family|👨‍👩‍👧||extended family,blended family",
    "Which family has grandparents, aunts and cousins in the circle?|extended family|👵||nuclear family,single-parent family",
    "Which family joins members from earlier families?|blended family|🧩||nuclear family,extended family",
    "Which household has several generations under one roof?|multigenerational|🏡||blended,single-parent",
    "A family with one parent raising children is called what?|single-parent family|🧑‍🍼||nuclear family,extended family",
    "What do adoptive families do?|give a permanent home to a child|🏠||only visit on holidays,rent out rooms",
    "Which is a main function of a family?|care and emotional support|💞||only making money,only moving house",
    "Does every good family have the same shape?|no, families come in many shapes|🌈||yes only one shape,only in cities"
  ], "Count who is in the group."));
  a.push(G("Budget variance", [
    "Plan versus real|📊|<b>Variance</b> is the gap between the planned amount and the actual amount. If you spent more than planned, you are over budget.",
    "Finding it|➖|Over budget: <b>actual - planned</b>. Under budget: <b>planned - actual</b>. Variance % = difference ÷ planned × 100.",
    "Use it|🧭|Checking variance each month shows where to adjust the plan."
  ], () => {
    const t = Math.random(), P = pick([100, 200, 400, 500]);
    if (t < 0.35) { const d = ri(1, 6) * 10;
      return Q(`Your grocery budget was $${P}. You actually spent $${P + d}. By how many dollars are you over budget?`, d, "🛒",
        "Compare the actual with the plan.", "Subtract the planned amount from the actual amount.",
        "Budget $300, spent $340: 340 - 300 = $40 over."); }
    if (t < 0.65) { const d = ri(1, 6) * 10;
      return Q(`Your fun budget was $${P}. You actually spent $${P - d}. By how many dollars are you under budget?`, d, "🎟️",
        "Spent less than planned means a positive savings.", "Subtract the actual amount from the planned amount.",
        "Budget $250, spent $220: 250 - 220 = $30 under.");
    }
    const pct = pick([5, 10, 15, 20, 25]);
    return Q(`Planned: $${P}. Actual: $${P + P * pct / 100}. What is the variance as a percent of the plan?`, pct, "📈",
      "Find the dollar difference first, then compare it with the plan.", "Divide the difference by the planned amount and multiply by 100.",
      "Plan $200, actual $220: difference 20, 20 ÷ 200 × 100 = 10%.");
  }));
  a.push(L("Student loans and aid", [
    "Free money first|🎓|<b>Grants</b> and <b>scholarships</b> do not have to be repaid. Students apply for federal aid with the <b>FAFSA</b> (Free Application for Federal Student Aid). <b>Work-study</b> is a part-time job that helps pay for school.",
    "Loans|💳|A loan must be repaid with interest. The <b>principal</b> is the amount borrowed. On an unsubsidized loan, interest builds up while you are in school. Federal loans usually have more protections than private loans.",
    "Borrow wisely|🧮|Borrow only what you need, and compare the future monthly payment with the pay of the job you expect."
  ], [
    "Which kind of aid does not have to be repaid?|a grant|🎓||a loan,interest",
    "What does FAFSA stand for?|Free Application for Federal Student Aid|📝||First Aid for School Allowances,Federal Aid for Savings Accounts",
    "What is the principal of a loan?|the amount borrowed|💰||the interest only,the school's name",
    "On an unsubsidized loan, what happens during school?|interest builds up|📈||no interest ever grows,the loan is erased",
    "What is work-study?|a part-time job that helps pay for school|🧑‍💼||a free class,a type of grant from a bank",
    "Which usually has more borrower protections?|federal loans|🏛️||private loans,store credit",
    "What should students try first?|grants and scholarships|🎓||the biggest loan possible,credit cards",
    "What is a scholarship?|money for school that is not repaid|🏅||a loan with high interest,a school fee"
  ], "Money you repay versus money you keep."));
  a.push(L("Types of home ownership", [
    "Houses and shared buildings|🏘️|A <b>single-family home</b> stands on its own lot. A <b>townhouse</b> shares side walls with neighbors but has its own entrance. A <b>duplex</b> has two units under one roof.",
    "Condos and co-ops|🏢|In a <b>condominium</b> you own your unit and share the halls and grounds. In a <b>cooperative</b> you buy shares in a company that owns the building.",
    "Fees|💵|Many condos and neighborhoods have a <b>homeowners association (HOA)</b>. Owners pay monthly fees for shared upkeep, such as grounds and building repairs."
  ], [
    "In which home do you own your unit and share the common areas?|condominium|🏢||cooperative,duplex",
    "In which building do you own shares in a company that owns it?|cooperative|🏢||condominium,townhouse",
    "A home on its own lot is called what?|single-family home|🏠||townhouse,duplex",
    "A home with two units under one roof is called what?|duplex|🏘️||townhouse,single-family home",
    "Attached homes with side walls shared and separate entrances are called what?|townhouses|🏘️||duplexes,cooperatives",
    "What does HOA stand for?|homeowners association|📋||house owner approval,home overview account",
    "What do HOA fees often pay for?|shared grounds and building upkeep|🌳||the owner's groceries,income taxes",
    "In a rental, who usually fixes major problems like a broken heater?|the landlord|🔧||the neighbor,the mail carrier"
  ], "Think about what you own and what you share."));
  a.push(G("Cost per square foot", [
    "Area in square feet|📐|Room area = length × width. A 12 ft by 10 ft room is 120 square feet.",
    "Price per square foot|💲|Flooring, paint and rent are often priced per square foot. <b>Cost = area × price per square foot</b>.",
    "Comparing|⚖️|To find the rate, divide the total cost by the area."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const l = ri(8, 16), w = ri(8, 14), p = ri(2, 6);
      return Q(`A room is ${l} ft by ${w} ft. Flooring costs $${p} per square foot. What is the cost?`, l * w * p, "🏠",
        "Find the area of the floor first.", "Multiply the area by the price per square foot.",
        "A 10 ft by 10 ft room at $3: area 100, so 100 × 3 = $300."); }
    if (t < 0.7) { const A = pick([500, 600, 800, 1000]), r = ri(2, 4);
      return Q(`An apartment of ${A} square feet rents for $${A * r} a month. What is the rent per square foot?`, r, "🏢",
        "Rate means cost for each one square foot.", "Divide the rent by the number of square feet.",
        "A 400 sq ft flat rents for $1,200: 1,200 ÷ 400 = $3 per sq ft.");
    }
    const l1 = ri(8, 14), w1 = ri(8, 12), l2 = ri(3, 5), w2 = ri(3, 5);
    return Q(`A room is ${l1} ft by ${w1} ft. A closet attached to it is ${l2} ft by ${w2} ft. What is the total area in square feet?`, l1 * w1 + l2 * w2, "📐",
      "Find the area of each part separately.", "Add the two areas together.",
      "A 10 ft by 10 ft room and a 2 ft by 5 ft nook: 100 + 10 = 110 sq ft.");
  }));
  a.push(L("Reading nutrition studies", [
    "Types of studies|🔬|In an <b>observational study</b> researchers watch what people do. In a <b>randomized controlled trial (RCT)</b> people are randomly put in a test group or a control group. RCTs can show cause and effect.",
    "Careful reading|🧐|<b>Correlation</b> means two things happen together. It does not prove one causes the other. A larger <b>sample size</b> and a <b>control group</b> make results stronger.",
    "Quality checks|✅|Look for <b>peer review</b> (other experts check the work), disclosed funding and results repeated by other studies. A <b>meta-analysis</b> combines many studies."
  ], [
    "Which study type can best show cause and effect?|randomized controlled trial|🔬||a single story,a social media post",
    "What is a control group?|the group that does not get the test treatment|👥||the group that is paid,the oldest group",
    "Two things happen together. What is this called?|correlation|🔗||proof of cause,a placebo",
    "Does correlation prove causation?|no|❌||yes always,only for foods",
    "What does peer review mean?|other experts check the work|📝||the author checks it twice,a company approves it",
    "Which usually gives stronger results?|a larger sample size|📊||a smaller sample size,one person's story",
    "What does a meta-analysis do?|combines the results of many studies|📚||repeats one meal,tastes the food",
    "In an observational study, researchers do what?|watch what people do|👀||give everyone the same pill,pick winners"
  ], "Strong evidence compares groups fairly."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[5], a[6], a[9], a[10], a[12], a[13], a[15], a[17]]));
  a.push(MIX("Level 25 Challenge", [a[4], a[7], a[8], a[11], a[14], a[16], a[17], a[3], a[6], a[13], a[9], a[15]]));

  // ================= LEVEL 26 =================
  const b = [];
  b.push(L("Freezing and ice crystals", [
    "Crystal size|🧊|When food freezes, water turns into ice crystals. <b>Fast freezing</b> makes small crystals. <b>Slow freezing</b> makes large crystals that pierce cell walls, so thawed food can turn mushy.",
    "Freezer burn|🥶|<b>Freezer burn</b> is dried, pale patches on food. Ice at the surface turns directly to vapor. Tight, airtight wrapping prevents it. The food is still safe, but the quality is lower.",
    "Ice cream|🍦|Ice cream is stirred while it freezes so crystals stay tiny. Salt mixed with ice lowers its freezing point, so the ice gets colder."
  ], [
    "Which freezing speed gives smaller ice crystals?|fast freezing|🧊||slow freezing,no freezing at all",
    "Why can thawed food become mushy?|large crystals damaged the cells|💧||the food got more salt,the food grew taller",
    "What is freezer burn?|dried, pale patches from lost moisture|🥶||a bacterial infection,a fire in the freezer",
    "How can you prevent freezer burn?|wrap food airtight|📦||leave it uncovered,thaw and refreeze it",
    "Is freezer-burned food unsafe?|no, but the quality is lower|🥩||yes it is poisonous,yes it turns radioactive",
    "Why is ice cream stirred while freezing?|to keep ice crystals tiny|🍦||to make it hot,to add salt",
    "What does salt do to the freezing point of water?|lowers it|🧂||raises it,keeps it exactly the same",
    "Which freezes food in the best texture?|a fast, very cold freezer|❄️||a warm room,the top of the fridge door"
  ], "Think about crystal size."));
  b.push(L("Gels and thickeners", [
    "Hydrocolloids|🍮|<b>Hydrocolloids</b> are substances that thicken or gel water. <b>Gelatin</b> comes from animal collagen and melts near body temperature. <b>Agar</b> comes from seaweed and is vegetarian.",
    "Pectin|🍓|<b>Pectin</b> is found in fruit. It sets jam when enough sugar and acid are present. Apples and citrus peels are rich in pectin.",
    "Enzyme trap|🍍|Fresh pineapple contains <b>bromelain</b>, an enzyme that breaks down protein, so gelatin will not set. Cooking or canning the fruit destroys the enzyme."
  ], [
    "Which gelling agent comes from seaweed?|agar|🌊||gelatin,pectin",
    "Which gelling agent comes from animal collagen?|gelatin|🍮||agar,pectin",
    "Which fruit substance helps jam set?|pectin|🍓||bromelain,lactose",
    "What does jam need along with pectin to set?|sugar and acid|🍓||oil and salt,flour and yeast",
    "Why does fresh pineapple stop gelatin from setting?|bromelain breaks down protein|🍍||it is too cold,it has too little water",
    "How can you use pineapple in a gelatin dessert?|use canned or cooked pineapple|🥫||use it fresh and frozen,add more ice",
    "Which gel is suitable for a vegetarian dessert?|agar|🌱||gelatin,lard",
    "Gelatin melts near what temperature?|body temperature|🌡️||freezing point of water,boiling point of oil"
  ], "Think about where each thickener comes from."));
  b.push(L("Blood sugar and diabetes", [
    "Insulin|🩸|After a meal, glucose enters the blood. The pancreas releases <b>insulin</b>, a hormone that moves glucose into cells. In <b>type 1 diabetes</b>, the body makes little insulin. In <b>type 2</b>, cells respond poorly to insulin.",
    "Food choices|🌾|Whole grains, beans, vegetables and fiber slow the rise of blood sugar. Sugary drinks raise it quickly. Many people with diabetes count carbohydrates.",
    "Care|🩺|Diabetes is managed with a doctor's advice, healthy habits and sometimes medicine or insulin. Food can support the plan but cannot replace medical care."
  ], [
    "Which hormone moves glucose from the blood into cells?|insulin|🩸||adrenaline,calcium",
    "Which organ releases insulin?|pancreas|🫀||stomach,kidney",
    "In type 1 diabetes, what happens?|the body makes little insulin|🩺||the body makes too much insulin,the body stops digesting protein",
    "Which foods slow the rise of blood sugar?|whole grains and beans|🫘||sugary drinks,candy",
    "Which food raises blood sugar fastest?|a sugary drink|🥤||lentils,broccoli",
    "What do many people with diabetes count?|carbohydrates|🔢||vitamins only,pots and pans",
    "Who should guide diabetes care?|a doctor or health team|👩‍⚕️||a food label only,a friend's advice",
    "What is blood glucose?|sugar in the blood|🩸||salt in the blood,fat in the bones"
  ], "Insulin is the key that lets sugar into cells."));
  b.push(G("Energy balance math", [
    "Calories in, calories out|⚖️|<b>Energy balance</b> compares the calories you eat with the calories your body uses. Eating more than you use stores energy. Using more than you eat draws on stores.",
    "A rough rule|📏|About 3,500 kcal is roughly one pound of body weight change. Real bodies vary, so this is only an estimate.",
    "Daily and weekly|📅|Weekly gap = daily gap × 7. Use food and activity to support health, not extreme changes."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const g = pick([100, 250, 300, 500, 750]);
      return Q(`A person uses ${g} more kcal each day than they eat. What is the gap over 7 days in kcal?`, g * 7, "📅",
        "There are 7 days in a week.", "Multiply the daily gap by 7.",
        "A gap of 200 kcal a day for 7 days: 200 × 7 = 1,400 kcal."); }
    if (t < 0.7) { const k = ri(2, 5);
      return Q(`Using the rough rule of 3,500 kcal per pound, a total gap of ${k * 3500} kcal is about how many pounds?`, k, "⚖️",
        "Find how many groups of 3,500 fit.", "Divide the total gap by 3,500.",
        "A gap of 10,500 kcal ÷ 3,500 = 3 pounds.");
    }
    const burn = ri(20, 26) * 100, d = ri(2, 8) * 100;
    return Q(`A person uses ${burn} kcal a day and eats ${burn - d} kcal. How many kcal is the daily gap?`, d, "🍽️",
      "Compare the energy used with the energy eaten.", "Subtract the smaller number from the larger one.",
      "Uses 2,000 and eats 1,700: 2,000 - 1,700 = 300 kcal.");
  }));
  b.push(G("BMI math", [
    "What BMI is|📏|<b>Body mass index</b> (BMI) = weight in kg ÷ (height in m)². It is a quick screening number, not a full health test. It cannot tell muscle from fat.",
    "Squaring height|🔢|A height of 2.0 m squared is 4. A height of 1.5 m squared is 2.25.",
    "Working backward|🔁|Weight = BMI × height². Doctors look at BMI together with many other measures."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const k = ri(5, 8);
      return Q(`A person is 1.5 m tall and weighs ${9 * k} kg. (1.5 squared is 2.25.) What is the BMI?`, 4 * k, "📏",
        "Divide the weight by the squared height.", "Use weight ÷ 2.25.",
        "A person 2.0 m tall (squared 4) weighing 80 kg: 80 ÷ 4 = BMI 20."); }
    if (t < 0.75) { const bmi = ri(18, 30);
      return Q(`A person is 2.0 m tall. Their BMI is ${bmi}. What is their weight in kg?`, bmi * 4, "⚖️",
        "Height squared for 2.0 m is 4.", "Multiply the BMI by the squared height.",
        "BMI 22 at 2.0 m: 22 × 4 = 88 kg.");
    }
    const k = ri(2, 5);
    return Q(`A person is 2.0 m tall and weighs ${40 * k} kg. What is the BMI?`, 10 * k, "📏",
      "Square the height first.", "Divide the weight by 4.",
      "70 kg at 2.0 m: 70 ÷ 4 = 17.5, so BMI is a little over 17.");
  }));
  b.push(L("Fiber structure", [
    "Staple and filament|🧶|<b>Staple fibers</b> are short, like cotton and wool. They are spun together into yarn. <b>Filament fibers</b> are very long and continuous, like silk and most synthetics.",
    "Yarn and twist|🪢|Spinning twists fibers into <b>yarn</b>. More twist makes stronger, harder yarn. <b>Plied</b> yarn twists two or more yarns together.",
    "Why it matters|🔍|Staple yarns look fuzzy and feel soft and warm. Filament yarns look smooth and shiny. Fabric feel depends on fiber length and yarn structure."
  ], [
    "Which fiber is a long continuous filament?|silk|🪱||cotton,wool",
    "Which is a short staple fiber?|cotton|☁️||silk,nylon filament",
    "What is yarn?|twisted fibers|🧵||a type of dye,a sewing pattern",
    "What does more twist usually make?|stronger, harder yarn|🪢||weaker and fuzzier yarn,transparent yarn",
    "What is plied yarn?|two or more yarns twisted together|🪢||yarn that is dyed,yarn that is washed",
    "Which fabric usually looks smooth and shiny?|filament yarn fabric|✨||fuzzy staple yarn fabric,felt",
    "Why does cotton thread look fuzzy?|short fiber ends stick out|🧶||it is made of glass,it is wet",
    "Which fiber type is spun to make yarn?|staple fibers|🧶||continuous filaments only,smoke"
  ], "Think about how long the fibers are."));
  b.push(L("Testing fabrics", [
    "Why test|🧪|Labs test fabrics to predict how they will behave. <b>Colorfastness</b> checks whether dye stays put when washed or rubbed. <b>Crocking</b> is dye rubbing off onto other cloth.",
    "Wear tests|⚙️|<b>Abrasion resistance</b> tells how well fabric resists rubbing. <b>Pilling</b> tests the small balls of fiber that form. <b>Tensile strength</b> is how much pull the cloth can take before it tears.",
    "Care tests|🧺|Shrinkage and wrinkle recovery tests show what happens after washing and folding. Results help set the care label."
  ], [
    "What does colorfastness test?|whether dye stays in the fabric|🎨||how heavy a fabric is,how cheap a fabric is",
    "What is crocking?|dye rubbing off onto other cloth|🎨||fabric getting longer,thread breaking",
    "What does an abrasion test measure?|how well fabric resists rubbing|⚙️||how well fabric floats,how bright it is",
    "What does a pilling test look for?|small balls of fiber on the surface|🧶||holes from moths,color changes",
    "What is tensile strength?|how much pull fabric can take before tearing|💪||how warm the fabric is,how soft it feels",
    "Why do labs test shrinkage?|to help set care labels|🧺||to make fabric shrink,to change the price",
    "Which test checks if dye bleeds in the wash?|colorfastness to washing|🧼||tensile strength,pilling",
    "What does wrinkle recovery measure?|how well fabric springs back after folding|👔||how fast fabric dries by sun,how loud it is"
  ], "Each test answers one question about the cloth."));
  b.push(L("Flammability and fabric safety", [
    "Fabrics burn differently|🔥|Cotton and rayon catch fire easily and burn quickly. Wool is naturally flame resistant. Synthetic fabrics such as polyester can melt and stick to skin.",
    "Safety rules|👶|In the US, children's sleepwear must be either flame resistant or snug fitting, because loose fabric catches fire more easily. Standards use flammability tests.",
    "Stay safe|🧯|Keep clothing away from stoves and heaters. If clothes catch fire: <b>stop, drop and roll</b>. Never use a fire as a test."
  ], [
    "Which fiber is naturally flame resistant?|wool|🐑||cotton,rayon",
    "Which synthetic fibers can melt when burning?|polyester|🧵||cotton,linen",
    "Why must children's sleepwear be snug or flame resistant?|loose fabric catches fire more easily|👶||loose fabric is more expensive,tight fabric glows",
    "What should you do if clothes catch fire?|stop, drop and roll|🧯||run fast,fan the flames",
    "Which natural fiber burns quickly?|cotton|🔥||wool,silk wool blend",
    "Where should clothing be kept?|away from stoves and heaters|🍳||on top of the heater,over the stove",
    "What do flammability standards use?|fire tests in labs|🧪||guessing,color charts",
    "Which is a safe habit when cooking?|roll up loose sleeves|🍳||wear very long loose sleeves,hang a towel over the burner"
  ], "Fiber type changes how fast fabric burns."));
  b.push(L("Prenatal nutrition", [
    "Growing baby, growing needs|🤰|During pregnancy, a healthy diet supports the baby's growth. <b>Folic acid</b> (a B vitamin) lowers the risk of neural tube defects. Iron and calcium needs also rise.",
    "Foods to avoid|⚠️|Doctors advise avoiding alcohol, raw or undercooked meat and eggs, unpasteurized dairy and fish high in mercury. Caffeine is limited.",
    "Extra energy|🍎|Extra calories are needed mainly in the second and third trimesters, and only a modest amount. A health professional gives personal advice."
  ], [
    "Which B vitamin helps prevent neural tube defects?|folic acid|💊||vitamin C,vitamin K",
    "Which should be avoided during pregnancy?|alcohol|🚫||water,fresh fruit",
    "Why should unpasteurized dairy be avoided?|it may carry harmful germs|🥛||it has no calcium,it is too sweet",
    "Which mineral needs rise in pregnancy?|iron|🩸||plastic,gold",
    "Which fish type is limited because of mercury?|large predator fish|🐟||all vegetables,milk",
    "When are extra calories mostly needed?|the second and third trimesters|📅||only in the first week,never",
    "Who gives personal pregnancy diet advice?|a health professional|👩‍⚕️||a cooking show,a food label",
    "How should meat be cooked in pregnancy?|until fully cooked|🍗||rare and pink,only warmed"
  ], "Safe and rich foods support growth."));
  b.push(L("The teen brain", [
    "A changing brain|🧠|During the teen years the brain keeps developing. The <b>prefrontal cortex</b>, which helps with planning and self-control, keeps maturing into the mid-20s.",
    "Sleep and mood|🌙|Teens need about 8 to 10 hours of sleep. The body clock shifts later in adolescence, so school start times matter. Emotions can be strong.",
    "Learning|📚|The brain strengthens connections that are used and trims ones that are not. Practice, exercise and good sleep build skills."
  ], [
    "Which brain area helps with planning and self-control?|prefrontal cortex|🧠||the heel,the tonsils",
    "Until about what age does the prefrontal cortex keep maturing?|the mid-20s|📅||age 5,age 12",
    "About how many hours of sleep do teens need?|8 to 10|🌙||3 to 4,14 to 16",
    "What happens to the body clock in adolescence?|it shifts later|⏰||it stops completely,it moves earlier by hours",
    "Which helps build brain skills?|practice, exercise and sleep|🏃||never practicing,skipping sleep",
    "Does the brain strengthen connections that are used?|yes|🔗||no never,only in babies",
    "Which habit helps learning the most?|enough sleep|😴||staying up all night,skipping meals",
    "Why do school start times matter for teens?|their body clocks run later|🏫||they dislike mornings only,teachers are tired"
  ], "The teen brain is still being built."));
  b.push(L("Positive guidance", [
    "Guide, do not just punish|🧭|<b>Positive guidance</b> teaches children what to do. Adults set clear, simple limits and stay calm and consistent.",
    "Tools|🧰|<b>Redirection</b> moves a child to a better activity. <b>Logical consequences</b> link to the behavior (spill it, wipe it). <b>Specific praise</b> says exactly what was good. <b>Modeling</b> means showing the behavior you want.",
    "Choices|🔀|Offering two acceptable choices gives a child some control while the adult still sets the limit."
  ], [
    "What does redirection do?|moves a child to a better activity|🔀||ignores the child,punishes harder",
    "Which is a logical consequence of spilling milk?|wiping it up|🥛||no dinner for a week,yelling",
    "Which praise is specific?|You shared your blocks with Sam|🧱||Good,Nice kid",
    "What is modeling?|showing the behavior you want|🧑‍🏫||talking about weather,giving prizes only",
    "Why offer two acceptable choices?|it gives control within limits|🔀||it removes all rules,it ends the day faster",
    "How should an adult set limits?|clear, simple and consistent|📏||changing daily,long and confusing",
    "What is the aim of guidance?|teach self-control|🌱||create fear,win an argument",
    "What helps most when a child is upset?|a calm adult|🧘||a louder adult,leaving the room forever"
  ], "Teach first, then correct."));
  b.push(G("Present value", [
    "Money today|💰|Money you have now can earn interest. So a dollar today is worth more than a dollar later. This idea is called the <b>time value of money</b>.",
    "Future value|📈|Future value = present value × (1 + rate). At 5% for one year, multiply by 1.05.",
    "Working backward|🔁|To find the present value, divide the future value by (1 + rate)."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const pv = ri(5, 50) * 20, r = pick([5, 10]);
      return Q(`You want $${pv + pv * r / 100} in one year. The interest rate is ${r}%. How many dollars must you deposit today?`, pv, "🏦",
        "The deposit grows by the interest rate over a year.", `Divide the goal by ${1 + r / 100}.`,
        "A goal of $210 at 5%: 210 ÷ 1.05 = $200 today."); }
    if (t < 0.7) { const pv = ri(5, 50) * 20, r = pick([5, 10]);
      return Q(`You deposit $${pv} at ${r}% interest for one year. How many dollars of interest do you earn?`, pv * r / 100, "🏦",
        "Interest is a percent of the deposit.", `Find ${r}% of the deposit.`,
        "$300 at 10%: 300 × 0.10 = $30 interest.");
    }
    const pv = ri(1, 9) * 100;
    return Q(`You deposit $${pv} at 10% interest, compounded yearly. How much will you have after 2 years? (Multiply by 1.1 twice.)`, pv * 121 / 100, "📈",
      "Each year grows by 10% of the new balance.", "Multiply by 1.1, then by 1.1 again.",
      "$200 at 10% for 2 years: 200 → 220 → 242.");
  }));
  b.push(G("Inflation", [
    "Rising prices|🏷️|<b>Inflation</b> is a general rise in prices over time. When prices rise, each dollar buys less. This is a loss of <b>purchasing power</b>.",
    "Future prices|📈|New price = old price × (1 + inflation rate). At 3% a year, multiply by 1.03.",
    "Keeping up|💼|If your pay does not rise as fast as prices, you can afford less."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const P = ri(1, 9) * 100, r = ri(2, 6);
      return Q(`A bag of groceries costs $${P}. With ${r}% inflation, what will it cost next year?`, P + P * r / 100, "🛒",
        "Next year's price is the old price plus a percent.", "Find the percent of the old price, then add it.",
        "A $200 cart at 5%: 5% of 200 = 10, so $210."); }
    if (t < 0.7) { const S = ri(3, 9) * 10000, r = pick([2, 3, 4, 5]);
      return Q(`Prices rise ${r}% this year. Your pay is $${S}. How many dollars of raise would just keep up with prices?`, S * r / 100, "💼",
        "To keep up, pay must grow by the same percent as prices.", "Find that percent of the pay.",
        "Pay $40,000 and 2% inflation: 2% of 40,000 = $800.");
    }
    const P = ri(1, 9) * 100;
    return Q(`A product costs $${P}. Prices rise 10% each year for 2 years. What is the price then? (Multiply by 1.1 twice.)`, P * 121 / 100, "🏷️",
      "The second 10% applies to the new price.", "Multiply by 1.1 two times.",
      "$100 → $110 → $121.");
  }));
  b.push(G("Debt-to-income ratio", [
    "What lenders check|🏦|The <b>debt-to-income ratio (DTI)</b> compares your monthly debt payments to your gross monthly income. Lenders use it to judge if you can handle more debt.",
    "The formula|🧮|<b>DTI % = monthly debt payments ÷ gross monthly income × 100</b>. Lower is safer. Many lenders like 36% or less.",
    "Working backward|🔁|Maximum debt = income × the percent limit."
  ], () => {
    const t = Math.random();
    if (t < 0.4) { const I = ri(3, 8) * 1000, pct = ri(10, 40);
      return Q(`Gross monthly income is $${I}. Monthly debt payments are $${I * pct / 100}. What is the DTI percent?`, pct, "🏦",
        "Compare the debt payments with the income.", "Divide the debt payments by the income and multiply by 100.",
        "Income $4,000 and debt $800: 800 ÷ 4,000 × 100 = 20%."); }
    if (t < 0.7) { const I = ri(3, 8) * 1000;
      return Q(`A lender wants DTI of 36% or less. Gross monthly income is $${I}. What is the most debt payment allowed in dollars?`, I * 36 / 100, "🏦",
        "Maximum debt is a percent of income.", "Find 36% of the income.",
        "Income $2,000 and a limit of 30%: 0.30 × 2,000 = $600.");
    }
    const I = ri(3, 8) * 1000, pct = ri(15, 35), D = I * pct / 100, a1 = Math.floor(D / 3 / 10) * 10, a2 = Math.floor(D / 3 / 10) * 10 + 10, a3 = D - a1 - a2;
    return Q(`Monthly payments: car $${a1}, card $${a2}, student loan $${a3}. Gross monthly income is $${I}. What is the DTI percent?`, pct, "📋",
      "Add the three payments first.", "Divide the total by the income and multiply by 100.",
      "Payments $200 and $300 with income $2,500: 500 ÷ 2,500 × 100 = 20%.");
  }));
  b.push(G("Property tax and escrow", [
    "Taxes on property|🏛️|Owners pay <b>property tax</b> each year to the local government. It helps pay for schools, roads and services. Tax = value × tax rate.",
    "Rates|🔢|A rate may be a percent of value, or an amount per $1,000 of value (called mills in some places).",
    "Escrow|🏦|Many lenders collect a monthly share of taxes in an <b>escrow account</b> and pay the bill for the owner. Monthly share = yearly bill ÷ 12."
  ], () => {
    const t = Math.random();
    if (t < 0.35) { const V = ri(10, 50) * 10000, r = pick([1, 2]);
      return Q(`A home is valued at $${V}. The property tax rate is ${r}% of value. What is the yearly tax?`, V * r / 100, "🏠",
        "Tax is a percent of the home's value.", "Find the percent of the value.",
        "A $200,000 home at 1%: 0.01 × 200,000 = $2,000."); }
    if (t < 0.7) { const V = ri(10, 50) * 10000, r = ri(8, 20);
      return Q(`A home is worth $${V}. The tax is $${r} per $1,000 of value. What is the yearly tax?`, V / 1000 * r, "🏠",
        "Count how many thousands are in the value.", "Multiply that count by the rate per thousand.",
        "A $100,000 home at $5 per $1,000: 100 × 5 = $500.");
    }
    const m = ri(2, 10) * 50;
    return Q(`The yearly property tax bill is $${m * 12}. How much goes into escrow each month?`, m, "🏦",
      "There are 12 months in a year.", "Divide the yearly bill by 12.",
      "A $2,400 yearly bill ÷ 12 = $200 a month.");
  }));
  b.push(L("Inspection and appraisal", [
    "Before buying|🔍|A <b>home inspector</b> checks the house's condition: roof, foundation, plumbing, electrical and heating. The buyer usually pays for the inspection.",
    "Appraisal|📊|An <b>appraiser</b> estimates the market value of the home for the lender, so the bank does not lend more than the home is worth.",
    "Closing steps|📝|A <b>contingency</b> lets a buyer back out if a condition is not met. <b>Earnest money</b> shows serious intent. <b>Closing costs</b> are fees paid when the sale is completed."
  ], [
    "Who checks a home's roof, plumbing and wiring?|a home inspector|🔍||an appraiser,a landlord",
    "Who estimates a home's market value for the lender?|an appraiser|📊||an inspector,a mover",
    "Why does a lender want an appraisal?|so it does not lend more than the home is worth|🏦||to pick the paint color,to find the owner's age",
    "What is earnest money?|a deposit showing serious intent to buy|💵||a tax refund,a moving fee",
    "What are closing costs?|fees paid when the sale is completed|📝||the monthly rent,the cost of furniture",
    "What does a contingency allow?|the buyer to back out if a condition is not met|📋||the seller to raise the price,the lender to lose money",
    "Who usually pays for a home inspection?|the buyer|👤||the mail carrier,the city",
    "What may an inspection find?|problems that need repair|🛠️||the buyer's age,the weather next week"
  ], "Inspectors check condition; appraisers check value."));
  b.push(L("Universal design", [
    "Design for everyone|♿|<b>Universal design</b> makes spaces usable by people of all ages and abilities, without special add-ons. It helps children, older adults and people with injuries or disabilities.",
    "Examples|🚪|Zero-step entrances, wide doorways, lever door handles, handrails and grab bars, bright lighting and non-slip floors.",
    "Aging in place|🏡|Many people want to stay at home as they age. Planning ahead for safe, easy access makes that possible."
  ], [
    "What is universal design?|designing spaces usable by people of all abilities|♿||designing only for athletes,designing only for children",
    "Which entrance is part of universal design?|a zero-step entrance|🚪||a tall staircase only,a ladder",
    "Which door handle is easier for many hands?|lever handle|🚪||round knob,high latch",
    "Why are grab bars useful?|they help prevent falls|🛁||they are decorations,they heat the room",
    "Why use wide doorways?|so wheelchairs and walkers fit|🚪||to save wood,to lower sound",
    "Which flooring is safer?|non-slip flooring|🧼||slick polished wax,loose rugs",
    "What does aging in place mean?|staying in one's own home as one ages|🏡||moving every year,building a boat",
    "Who benefits from universal design?|people of all ages|👨‍👩‍👧‍👦||only one age group,no one"
  ], "Think about making a space easy for everyone."));
  b.push(L("Kitchen ergonomics", [
    "Fit the task to the person|🧍|<b>Ergonomics</b> designs tools and spaces to fit the body, reducing strain and injury. Good counter height keeps shoulders and wrists relaxed.",
    "Work triangle|🔺|The kitchen <b>work triangle</b> links the sink, stove and refrigerator. The paths should be short and clear without cabinets or traffic in the way.",
    "Healthy habits|💪|Lift with your legs and keep loads close. Keep wrists straight, use sharp knives and take breaks. Anti-fatigue mats help on hard floors."
  ], [
    "What does ergonomics aim to do?|reduce strain and injury|🧍||make tools more expensive,make rooms smaller",
    "What three things form the kitchen work triangle?|sink, stove and refrigerator|🔺||oven and door and window,table and chair and lamp",
    "How should you lift a heavy pot?|with your legs, keeping it close|🏋️||with a bent back,at arm's length",
    "Why should the work triangle paths be clear?|so cooks move easily and safely|🚶||to hold more furniture,to hide the stove",
    "Which helps on a hard floor?|an anti-fatigue mat|🧘||high heels,wet socks",
    "Why use a sharp knife?|it needs less force and slips less|🔪||it makes more noise,it is lighter in color",
    "Why keep wrists straight?|it reduces strain|✋||to look neat,to be quicker only",
    "What is a good counter height for you?|one that keeps shoulders and wrists relaxed|📏||as high as your head,as low as the floor"
  ], "A good fit prevents strain."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[3], b[4], b[5], b[6], b[9], b[11], b[12], b[14], b[15], b[17]]));
  b.push(MIX("Level 26 Challenge", [b[2], b[7], b[8], b[10], b[11], b[12], b[13], b[14], b[16], b[3], b[4], b[1]]));

  // ================= LEVEL 27 =================
  const c = [];
  c.push(L("Foams and gels", [
    "Colloids|🫧|A <b>colloid</b> is a mixture where tiny particles of one thing are spread through another. A <b>foam</b> is gas in a liquid, like whipped cream. A <b>gel</b> is liquid trapped in a network, like jelly.",
    "Making foams|🥚|Egg whites whip into stiff foam because their proteins unfold and form a net around the air bubbles. Even a trace of fat or yolk keeps them from whipping well.",
    "Stabilizing|🍰|Cream of tartar (an acid) helps egg-white foam stay stable. Heavy cream whips because fat globules gather around the bubbles."
  ], [
    "What is a foam?|gas bubbles in a liquid or solid|🫧||a solid in a solid,only frozen water",
    "What is a gel?|liquid trapped in a network|🍮||gas in a gas,a hot oil",
    "Which food is a foam?|whipped cream|🍦||clear broth,a plain ice cube",
    "Which food is a gel?|gelatin dessert|🍮||plain water,a cracker",
    "What ruins egg-white foam?|a trace of fat or yolk|🥚||a clean glass bowl,a pinch of cream of tartar",
    "Why does cream of tartar help egg whites?|it helps the foam stay stable|🍰||it turns the foam into oil,it adds fat",
    "How do whipped egg whites hold air?|proteins form a net around bubbles|🥚||sugar turns to metal,salt makes bubbles disappear",
    "What is a colloid?|tiny particles spread through another substance|🫧||a type of knife,a very hot oven"
  ], "Think about what is trapped in what."));
  c.push(L("Enzymes in food", [
    "Enzymes|🧪|<b>Enzymes</b> are proteins that speed up reactions. Each works on one kind of molecule. Heat above a certain point <b>denatures</b> them, which stops their action.",
    "Useful enzymes|🍍|<b>Amylase</b> breaks starch into sugar (ripening, saliva). <b>Protease</b> breaks proteins: bromelain in pineapple and papain in papaya tenderize meat. <b>Lactase</b> breaks lactose. <b>Rennet</b> curdles milk for cheese.",
    "Control|🌡️|Cooks control enzymes with temperature, acid and time. Cold slows them, and cooking can stop them."
  ], [
    "What are enzymes?|proteins that speed up reactions|🧪||sugars that sweeten food,fats that melt",
    "Which enzyme breaks starch into sugar?|amylase|🍞||lactase,rennet",
    "Which enzyme breaks down lactose?|lactase|🥛||amylase,papain",
    "Which fruit enzyme tenderizes meat?|papain|🥭||amylase,lactase",
    "What does rennet do in cheesemaking?|curdles milk|🧀||adds fruit flavor,makes it fizz",
    "What does heat do to most enzymes?|denatures them|♨️||doubles them forever,turns them into fat",
    "Which food contains bromelain?|pineapple|🍍||bananas,oats",
    "Why can ripening make fruit sweeter?|enzymes turn starch into sugar|🍌||sugar is added by bees,water turns to sugar"
  ], "Each enzyme works on one type of food molecule."));
  c.push(L("Acidity and safe canning", [
    "Why pH matters|🥫|Food with a pH below about 4.6 is <b>high-acid</b>: fruits, pickles, tomatoes with added acid. Germs cannot grow well in acid. High-acid foods can be canned in a boiling water bath.",
    "Low-acid foods|🫘|Vegetables, meat, poultry and beans are <b>low-acid</b>. They must be canned in a <b>pressure canner</b> that reaches 240°F (116°C). This destroys spores of <i>Clostridium botulinum</i>, which cause botulism.",
    "Safety|⚠️|Botulism spores grow without oxygen in low-acid foods. Use tested recipes. Never taste food from a bulging or leaking can. Throw it away safely."
  ], [
    "Which pH counts as high-acid for canning?|below 4.6|🥫||above 7,exactly 14",
    "Which can high-acid foods be processed in?|a boiling water bath|♨️||a cold bath,a microwave",
    "Which foods need a pressure canner?|low-acid foods like green beans|🫘||pickles,jam",
    "Why is a pressure canner hotter than boiling water?|pressure raises the temperature|🌡️||it uses colder water,it adds cold air",
    "What toxin-making germ do pressure canners prevent?|Clostridium botulinum|🦠||yeast,a mold on bread",
    "What should you do with a bulging can?|do not taste it and dispose of it|🚫||taste a little,feed it to pets",
    "Why do you use tested canning recipes?|they have been proven safe|📋||they are shorter,they use more salt",
    "Why is botulism dangerous in canned food?|spores can grow without oxygen|🥫||it grows only in the light,it needs sunshine"
  ], "Acidity decides the canning method."));
  c.push(L("Food technology", [
    "Heat methods|🏭|<b>Retort</b> processing heats sealed food at high temperature, as in canned tuna. <b>UHT</b> (ultra-high temperature) heats milk to about 138°C for a few seconds, so it keeps for months unopened.",
    "Other methods|❄️|<b>Freeze-drying</b> removes ice as vapor under vacuum, so food keeps its shape and is light. <b>High-pressure processing (HPP)</b> uses very high pressure instead of heat. <b>Irradiation</b> uses energy beams to kill germs and does not make food radioactive.",
    "Packaging|📦|<b>Modified atmosphere packaging</b> replaces air with other gases to slow spoilage."
  ], [
    "What does UHT stand for?|ultra-high temperature|🥛||ultra-heavy tank,under heated twice",
    "What does freeze-drying remove?|ice as vapor under vacuum|❄️||all the protein,the flavor oils",
    "Which method uses high pressure instead of heat?|HPP|🏭||retort,roasting",
    "Does irradiated food become radioactive?|no|✅||yes always,only fruit",
    "What does modified atmosphere packaging change?|the gases around the food|📦||the color of the box,the price tag",
    "What does retort processing do?|heats sealed containers to preserve them|🥫||freezes food,smokes cheese",
    "Why can UHT milk last months unopened?|it is heated hot enough to destroy most germs|🥛||it is full of ice,it has no water",
    "Which food is made light by freeze-drying?|astronaut ice cream|🍦||fresh lettuce,hot soup"
  ], "Each method controls germs in a different way."));
  c.push(L("Dietary Reference Intakes", [
    "DRIs|📖|<b>Dietary Reference Intakes</b> are nutrient goals for healthy people. The <b>EAR</b> meets the needs of half the group. The <b>RDA</b> meets the needs of nearly all (97 to 98 percent).",
    "When data is limited|🔎|When there is not enough data for an RDA, scientists set an <b>AI</b> (Adequate Intake). The <b>UL</b> (Tolerable Upper Intake Level) is the highest daily amount unlikely to cause harm.",
    "Macros|🥗|The <b>AMDR</b> is the healthy range for calories from macronutrients: carbohydrate 45-65%, fat 20-35% and protein 10-35%."
  ], [
    "Which DRI meets the needs of nearly all healthy people?|RDA|📖||UL,EAR",
    "Which DRI meets the needs of half the group?|EAR|📖||RDA,AI",
    "What does UL stand for?|Tolerable Upper Intake Level|⚠️||Under Limit Level,Usual Lunch",
    "When is an AI set?|when there is not enough data for an RDA|🔎||when a food is expensive,when a nutrient is a poison",
    "What does AMDR describe?|a healthy range of calories from macronutrients|🥗||a vitamin pill size,a food's price",
    "What is the AMDR for carbohydrate?|45-65% of calories|🍞||5-10% of calories,90-100% of calories",
    "What is the AMDR for fat?|20-35% of calories|🥑||60-80% of calories,0% of calories",
    "What does the UL warn about?|too much of a nutrient|⚠️||too little of a nutrient,a mistake in cooking"
  ], "Each letter code has a different job."));
  c.push(L("Bioavailability", [
    "Absorbed, not just eaten|🔬|<b>Bioavailability</b> is the share of a nutrient your body actually absorbs. <b>Heme iron</b> (meat) is absorbed better than <b>non-heme iron</b> (plants). Vitamin C eaten with plant iron boosts absorption.",
    "Blockers|🌾|<b>Phytates</b> in whole grains and beans and <b>oxalates</b> in spinach bind minerals and reduce absorption. Soaking, sprouting and fermenting lower phytates.",
    "Helpers|🥑|Vitamins A, D, E and K need some fat to be absorbed. Cooking tomatoes with oil boosts how much lycopene you absorb."
  ], [
    "What does bioavailability mean?|how much of a nutrient the body absorbs|🔬||how much a food costs,how long food keeps",
    "Which iron is absorbed better?|heme iron|🥩||non-heme iron,rust",
    "What helps absorb iron from plants?|vitamin C|🍊||tea only,phytates",
    "What do phytates do?|reduce mineral absorption|🌾||boost mineral absorption,add sweetness",
    "How can you lower phytates in beans?|soaking or sprouting|🫘||adding more bran only,freezing at once",
    "Why is calcium in spinach poorly absorbed?|oxalates bind it|🥬||spinach has no calcium at all,spinach is too cold",
    "Why add some oil to a salad?|fat helps absorb vitamins A, D, E and K|🥗||oil blocks every vitamin,oil adds protein",
    "Which fat-soluble vitamin set needs fat to be absorbed?|A, D, E and K|🥑||B and C,only B12"
  ], "Eaten is not the same as absorbed."));
  c.push(G("Total energy expenditure", [
    "Where energy goes|🔥|<b>Total energy expenditure (TEE)</b> = basal metabolic rate (BMR) × an <b>activity factor</b>. Mostly sitting: about 1.2. Light activity: about 1.4. Moderate activity: about 1.6.",
    "Thermic effect|🍽️|Digesting food uses energy too: the <b>thermic effect of food (TEF)</b> is roughly 10% of the calories eaten.",
    "Step by step|🧮|Multiply BMR by the factor to get TEE. Subtract BMR from TEE to see the energy used by activity."
  ], () => {
    const t = Math.random(), B = ri(12, 20) * 100;
    if (t < 0.4) { const f = pick([1.2, 1.4, 1.6]);
      return Q(`A person's BMR is ${B} kcal and their activity factor is ${f}. What is their TEE in kcal?`, Math.round(B * f), "🔥",
        "TEE is BMR scaled up by activity.", "Multiply the BMR by the activity factor.",
        "BMR 1,500 and factor 1.2: 1,500 × 1.2 = 1,800 kcal."); }
    if (t < 0.7) { const I = ri(15, 30) * 100;
      return Q(`Someone eats ${I} kcal in a day. About how many kcal does the thermic effect of food use (10%)?`, I / 10, "🍽️",
        "TEF is about one tenth of the intake.", "Divide the intake by 10.",
        "Eating 2,500 kcal: 2,500 ÷ 10 = 250 kcal.");
    }
    const f = pick([1.2, 1.4, 1.6]);
    return Q(`A person has a BMR of ${B} kcal and a TEE of ${Math.round(B * f)} kcal. How many kcal does activity add?`, Math.round(B * f) - B, "🏃",
      "Activity energy is the difference between the two numbers.", "Subtract the BMR from the TEE.",
      "BMR 1,500 and TEE 2,100: 2,100 - 1,500 = 600 kcal.");
  }));
  c.push(G("Protein requirements", [
    "Grams per kilogram|🥩|The RDA for protein for most adults is <b>0.8 g per kg</b> of body weight per day. Athletes may need about <b>1.2 to 2.0 g per kg</b>.",
    "Calculating|🧮|Protein (g) = body weight (kg) × grams per kg. Protein gives 4 kcal per gram.",
    "Spreading it out|🍽️|Eating protein across several meals helps the body use it. Divide the daily total by the number of meals."
  ], () => {
    const t = Math.random(), W = ri(10, 16) * 5;
    if (t < 0.35) return Q(`A person weighs ${W} kg. The RDA is 0.8 g per kg. How many grams of protein per day?`, W * 4 / 5, "🥩",
      "Multiply the weight by the rate.", "Weight × 0.8 gives grams.",
      "A 50 kg person: 50 × 0.8 = 40 g.");
    if (t < 0.65) return Q(`An athlete weighs ${W} kg and aims for 1.6 g per kg. How many grams of protein per day?`, W * 8 / 5, "🏋️",
      "Use the athlete's higher rate.", "Weight × 1.6 gives grams.",
      "A 60 kg athlete at 1.6 g/kg: 60 × 1.6 = 96 g.");
    return Q(`A person needs ${W * 4 / 5} g of protein a day, split evenly across 4 meals. How many grams per meal?`, W / 5, "🍽️",
      "Equal sharing means dividing.", "Divide the daily grams by 4.",
      "A need of 60 g across 4 meals: 60 ÷ 4 = 15 g each.");
  }));
  c.push(L("Synthetic fibers", [
    "Made by chemistry|🧪|Synthetic fibers are made from chemicals, often from petroleum. <b>Polyester</b> is strong and resists wrinkles. <b>Nylon</b>, first sold in the 1930s, is strong and elastic. <b>Acrylic</b> feels like wool. <b>Spandex</b> (elastane) stretches a lot.",
    "Semi-synthetic|🌲|<b>Rayon</b> is made from natural cellulose (wood pulp) that is chemically processed. It is called regenerated cellulose.",
    "Tradeoffs|⚖️|Synthetics dry fast and last long but breathe less than cotton. Microfibers and wicking fabrics pull sweat away from the skin."
  ], [
    "Which fiber is strong and wrinkle resistant and is made from petroleum?|polyester|👕||cotton,wool",
    "Which fiber is known for stretching a lot?|spandex|🩱||linen,silk",
    "Which fiber is made from wood pulp?|rayon|🌲||nylon,acrylic",
    "Which fiber feels like wool?|acrylic|🧶||nylon,spandex",
    "Which was the first fully synthetic fiber sold in the 1930s?|nylon|🧵||rayon,cotton",
    "Why do synthetics dry fast?|they absorb little water|💨||they are always wet,they hold lots of water",
    "What do wicking fabrics do?|move sweat away from skin|🏃||block all air,hold sweat in",
    "What is rayon called, since it starts as a natural material?|regenerated cellulose|🌲||pure petroleum,raw cotton"
  ], "Think about where each fiber starts."));
  c.push(L("Textile life cycle", [
    "From fiber to landfill|🌍|A garment's life cycle includes growing or making the fiber, making fabric, sewing, shipping, use, laundering and disposal. Cotton farming can use lots of water. Synthetics use oil.",
    "Microfibers|🌊|Washing synthetics sheds tiny plastic <b>microfibers</b> that flow into waterways. Washing less, washing full loads in cold water and using a filter bag reduces the amount.",
    "Longer life|♻️|The best clothes are the ones already owned. Mending, buying second-hand, buying durable pieces and recycling textiles all cut waste."
  ], [
    "What are microfibers shed by synthetics?|tiny plastic fibers|🌊||tiny cotton seeds,invisible dye",
    "How can you reduce microfiber shedding?|wash full loads in cold water|🧺||wash tiny loads in hot water,never wear synthetics",
    "Which step of the life cycle can use lots of water for cotton?|growing the fiber|🌱||sewing the buttons,folding clothes",
    "What does a garment's life cycle include?|making, use and disposal|♻️||only the store,only the brand name",
    "What is a way to cut textile waste?|buy second-hand or mend|🧵||throw clothes out after one use,buy more each month",
    "Which clothes have the lowest footprint?|the ones you already own|👕||the newest fashion,the cheapest pieces",
    "What does a filter bag do in the wash?|catches microfibers|🛍️||adds dye,makes clothes stiff",
    "Why is durable clothing better for the planet?|it lasts longer|⏳||it is heavier to ship only,it costs more"
  ], "Look at the whole life of a garment."));
  c.push(G("Thread count", [
    "Counting threads|🧵|Woven fabric has <b>warp</b> threads (lengthwise) and <b>weft</b> threads (crosswise). <b>Thread count</b> = warp threads per inch + weft threads per inch.",
    "Why it matters|🛏️|Higher thread counts can feel smoother, but quality also depends on fiber length and weave. Very high counts may use thin, twisted threads.",
    "Using the count|🧮|To find a missing part, subtract. To count threads across a width, multiply threads per inch by the inches."
  ], () => {
    const t = Math.random(), wa = ri(6, 15) * 10, we = ri(6, 15) * 10;
    if (t < 0.35) return Q(`A sheet has ${wa} warp threads and ${we} weft threads per square inch. What is the thread count?`, wa + we, "🛏️",
      "Thread count combines both directions.", "Add the warp and weft threads.",
      "100 warp + 80 weft = 180 thread count.");
    if (t < 0.7) return Q(`A fabric has a thread count of ${wa + we}. There are ${wa} warp threads per inch. How many weft threads per inch?`, we, "🧵",
      "Thread count is the sum of two parts.", "Subtract the warp from the total.",
      "Count 200 with 90 warp: 200 - 90 = 110 weft.");
    const w = ri(2, 6);
    return Q(`A fabric has ${wa} warp threads per inch. How many warp threads are in a strip ${w} inches wide?`, wa * w, "📏",
      "Threads per inch times inches.", "Multiply the threads per inch by the width.",
      "70 threads per inch across 3 inches: 70 × 3 = 210.");
  }));
  c.push(L("Vygotsky and Bronfenbrenner", [
    "Learning with help|🧗|Lev Vygotsky said children learn through social interaction. The <b>zone of proximal development (ZPD)</b> is the gap between what a child can do alone and what they can do with help. <b>Scaffolding</b> is giving the right amount of help, then removing it.",
    "Ecological systems|🌐|Urie Bronfenbrenner described layers around a child. <b>Microsystem</b>: family, school, friends. <b>Mesosystem</b>: links between them. <b>Exosystem</b>: places the child is not in but are affected by, like a parent's workplace.",
    "Wider layers|🌍|<b>Macrosystem</b>: culture, values and laws. <b>Chronosystem</b>: changes over time."
  ], [
    "What is the ZPD?|what a child can do with help but not alone|🧗||the school's playground,a type of exam",
    "What is scaffolding?|giving help and then removing it|🏗️||doing the task for the child always,building a ladder only",
    "Who stressed social interaction in learning?|Vygotsky|📚||Bronfenbrenner,Erikson",
    "Who described ecological systems?|Bronfenbrenner|🌐||Vygotsky,Piaget",
    "Family and school are part of which system?|microsystem|🏫||macrosystem,chronosystem",
    "A parent's workplace affecting a child is which system?|exosystem|🏢||microsystem,mesosystem",
    "Culture, values and laws belong to which system?|macrosystem|🌍||microsystem,exosystem",
    "Which system covers change over time?|chronosystem|⏳||mesosystem,microsystem"
  ], "Match the theorist or the layer."));
  c.push(L("Research methods in human development", [
    "Studying change|🔭|A <b>longitudinal study</b> follows the same people over many years. A <b>cross-sectional study</b> compares different age groups at one time. Cross-sectional is quicker but cannot show how one person changes.",
    "Other methods|📋|Researchers also use <b>observation</b>, <b>surveys</b> and <b>case studies</b> (deep study of one person or family).",
    "Ethics|⚖️|Studies need <b>informed consent</b>: people (or parents) know the risks and agree. Information is kept private, and participants can stop at any time."
  ], [
    "Which study follows the same people over years?|longitudinal|📅||cross-sectional,case-free",
    "Which study compares different age groups at one time?|cross-sectional|👥||longitudinal,observational only",
    "Which method is a deep study of one person or family?|case study|🔍||survey,experiment",
    "What is informed consent?|participants know the risks and agree|✍️||the researcher decides alone,payment only",
    "Why is a longitudinal study slower?|it takes years to follow people|⏳||it has no people,it uses only surveys",
    "What can a cross-sectional study not show?|how one person changes over time|📈||the age of the group,any differences at all",
    "Participants in a study can do what?|stop at any time|🚪||never leave,publish their results",
    "How should private information be handled?|kept private|🔒||posted online,sold"
  ], "Think about whether time is part of the design."));
  c.push(L("Family systems", [
    "A family as a system|🕸️|In <b>family systems</b> thinking, each member affects all the others, like parts of a mobile. A change in one person shifts the whole family.",
    "Parts of the system|🏡|Families have <b>roles</b> (who does what), <b>rules</b> (spoken and unspoken), <b>boundaries</b> (limits that protect privacy and respect) and <b>rituals</b> (shared traditions).",
    "Healthy communication|🗣️|Use <b>I-messages</b> (\"I feel worried when...\"), listen actively and repeat back what you heard. Resilient families adapt to stress together."
  ], [
    "What does family systems thinking say?|each member affects the others|🕸️||only parents matter,families never change",
    "What is an I-message?|I feel worried when...|🗣️||You always are wrong,Because I said so",
    "What is a family ritual?|a shared tradition|🎂||a punishment,a legal document",
    "What are family roles?|who does what|🧹||the family's address,family photos",
    "What do healthy boundaries do?|protect privacy and respect|🚪||make everyone secret,remove all rules",
    "What is active listening?|repeating back what you heard|👂||talking over the speaker,looking at your phone",
    "What is a resilient family?|one that adapts to stress together|💪||one that never has stress,one that avoids talking",
    "If one member's job changes, what may happen?|the whole family feels it|🔄||nothing at all,only the pets notice"
  ], "A change in one part moves the whole."));
  c.push(G("Student loan payments", [
    "Monthly payments|🎓|A standard federal repayment plan is 10 years, which is 120 months. With no interest, monthly payment = loan ÷ number of months.",
    "Interest-only|📈|Interest for a month = balance × yearly rate ÷ 12. If you pay only the interest, the balance does not shrink.",
    "Total repaid|🧮|Total repaid = monthly payment × number of months. It is more than the amount borrowed when interest is charged."
  ], () => {
    const t = Math.random();
    if (t < 0.35) { const yrs = pick([5, 10]), m = ri(10, 40) * 10;
      return Q(`A loan of $${m * yrs * 12} (ignore interest) is repaid evenly over ${yrs} years. What is the monthly payment?`, m, "🎓",
        "Turn the years into months first.", "Divide the loan by the number of months.",
        "A $6,000 loan over 5 years: 60 months, 6,000 ÷ 60 = $100."); }
    if (t < 0.7) { const k = ri(5, 30), r = pick([6, 12]);
      return Q(`A loan balance is $${k * 1000} at ${r}% interest a year. How much interest builds each month?`, k * r * 5 / 6, "📈",
        "Find a year of interest, then split it by months.", "Balance × rate ÷ 12.",
        "$12,000 at 6%: 720 a year, ÷ 12 = $60 a month.");
    }
    const yrs = pick([5, 10]), m = ri(5, 40) * 10;
    return Q(`You pay $${m} a month for ${yrs} years. What is the total you pay in dollars?`, m * yrs * 12, "💵",
      "Count the number of payments first.", "Multiply the payment by the number of months.",
      "$100 a month for 2 years: 24 payments, so $2,400.");
  }));
  c.push(G("Credit utilization", [
    "Using your limit|💳|<b>Credit utilization</b> is the share of your credit limit you are using: <b>balance ÷ limit × 100</b>. Lower is better for your credit score. Under 30% is a common guideline.",
    "Targets|🎯|Maximum balance for a target = limit × the percent. Limit needed = balance × 100 ÷ percent.",
    "Why it matters|📊|High utilization suggests a borrower may be stretched, so it can lower scores."
  ], () => {
    const t = Math.random();
    if (t < 0.35) { const k = ri(2, 10), pct = pick([10, 20, 25, 30, 40, 50]);
      return Q(`A card has a limit of $${k * 1000} and a balance of $${10 * k * pct}. What is the utilization percent?`, pct, "💳",
        "Compare what you owe with the limit.", "Divide the balance by the limit and multiply by 100.",
        "Limit $2,000 and balance $400: 400 ÷ 2,000 × 100 = 20%."); }
    if (t < 0.7) { const k = ri(2, 10);
      return Q(`A card has a limit of $${k * 1000}. To stay at 30% utilization, what is the largest balance in dollars?`, k * 300, "🎯",
        "The balance should be a percent of the limit.", "Find 30% of the limit.",
        "A $2,000 limit at 25%: 0.25 × 2,000 = $500.");
    }
    const bal = ri(2, 12) * 100, pct = pick([10, 20, 25, 50]);
    return Q(`A balance of $${bal} is ${pct}% utilization. What is the credit limit in dollars?`, bal * 100 / pct, "💳",
      "The balance is a part of the limit.", "Multiply the balance by 100, then divide by the percent.",
      "A $300 balance at 10%: 300 × 100 ÷ 10 = $3,000.");
  }));
  c.push(G("The 28/36 housing rule", [
    "A lender's guide|🏠|A common guideline says housing costs should be no more than <b>28%</b> of gross monthly income, and total debt payments no more than <b>36%</b>.",
    "Monthly from yearly|📅|Gross monthly income = yearly income ÷ 12.",
    "Leftover room|🧮|Room left for housing = 36% of income minus other debt payments."
  ], () => {
    const t = Math.random(), k = ri(3, 10);
    if (t < 0.35) return Q(`Gross monthly income is $${k * 1000}. What is the most for housing costs under the 28% rule, in dollars?`, k * 280, "🏠",
      "Take a percent of the monthly income.", "Find 28% of the income.",
      "Income $2,000: 0.28 × 2,000 = $560.");
    if (t < 0.7) return Q(`A household earns $${k * 12000} a year. What is the most per month for housing under the 28% rule, in dollars?`, k * 280, "🏠",
      "Change the yearly income into monthly income first.", "Divide by 12, then find 28%.",
      "$24,000 a year is $2,000 a month; 28% is $560.");
    const Y = ri(2, 6) * 100;
    return Q(`Monthly income is $${k * 1000}. The 36% rule limits total debt. Other debt payments are $${Y}. How many dollars are left for housing?`, k * 360 - Y, "🧮",
      "Find the total debt limit first.", "Subtract the other debts from that limit.",
      "Income $2,000: 36% is $720. Other debts $200 leave $520.");
  }));
  c.push(L("Green building", [
    "Insulation|🧱|<b>R-value</b> measures how well insulation resists heat flow. A higher R-value means better insulation. Sealing air leaks can save as much energy as adding insulation.",
    "Efficient choices|🌞|<b>ENERGY STAR</b> labels mark efficient appliances. Double-pane windows, LED lights, heat pumps and low-flow fixtures cut energy and water use. <b>LEED</b> is a rating for green buildings.",
    "Design|🏡|<b>Passive solar</b> design uses sun in winter and shade in summer. Trees, overhangs and window placement help keep a home comfortable."
  ], [
    "What does a higher R-value mean?|better insulation|🧱||worse insulation,heavier walls",
    "What does R-value measure?|resistance to heat flow|🌡️||wall color,paint cost",
    "What does an ENERGY STAR label mark?|an efficient appliance|⭐||the cheapest brand,the loudest appliance",
    "What is LEED?|a green building rating|🏢||a type of wood,a paint brand",
    "What is passive solar design?|using sun for winter warmth and shade in summer|☀️||solar panels only,a window painting",
    "Why do double-pane windows help?|they reduce heat loss|🪟||they let more heat out,they make rooms darker only",
    "Which saves water?|low-flow fixtures|🚿||leaky faucets,long showers",
    "Why seal air leaks?|to keep heated or cooled air inside|🏠||to remove all fresh air,to make doors louder"
  ], "Think about keeping heat where you want it."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[4], c[5], c[6], c[7], c[8], c[11], c[12], c[14], c[17]]));
  c.push(MIX("Level 27 Challenge", [c[3], c[6], c[7], c[9], c[10], c[13], c[14], c[15], c[16], c[17], c[2], c[5]]));

  Object.assign(HOMEEC_LEVELS, { 25: a, 26: b, 27: c });
})();
