// ext/homeec-28-30.js  Home Economics levels 28-30 (College year 1 second half, College year 2)
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


  // ================= LEVEL 28 =================
  const a = [];
  a.push(L("B vitamins and coenzymes", [
    "Helpers for enzymes|🔋|Many B vitamins work as <b>coenzymes</b>. A coenzyme helps an enzyme release energy from carbohydrates, fats and proteins. B vitamins are water-soluble, so extra is mostly lost in urine.",
    "Famous deficiencies|📋|Too little <b>thiamin</b> (B1) causes <b>beriberi</b>. Too little <b>niacin</b> (B3) causes <b>pellagra</b>. Too little <b>folate</b> (B9) can cause anemia, and in pregnancy raises the risk of neural tube defects.",
    "Vitamin B12|🥛|<b>B12</b> is found naturally only in animal foods, so people who eat no animal foods need fortified foods or a supplement. The stomach makes <b>intrinsic factor</b>, a protein that helps absorb B12."
  ], [
    "What do many B vitamins act as inside cells?|coenzymes|🔋||hormones,storage fats",
    "Which disease comes from too little thiamin?|beriberi|🍚||scurvy,rickets",
    "Which disease comes from too little niacin?|pellagra|🌽||scurvy,rickets",
    "Which B vitamin helps prevent neural tube defects?|folate|🤰||vitamin C,vitamin D",
    "Which vitamin is found naturally only in animal foods?|vitamin B12|🥩||folate,vitamin C",
    "What protein from the stomach helps absorb B12?|intrinsic factor|🧪||lactase,insulin",
    "What happens to most extra water-soluble vitamins?|they leave in urine|💧||they build up in fat,they turn into protein",
    "Which food is a good source of riboflavin (B2)?|milk|🥛||olive oil,table sugar"
  ], "Think about what helps enzymes do their work."));
  a.push(L("Fat-soluble vitamins", [
    "A, D, E and K|🥑|Vitamins <b>A, D, E and K</b> dissolve in fat. They are absorbed with dietary fat and stored in the liver and body fat, so too much can build up and cause harm.",
    "Jobs|🔎|<b>A</b> supports vision and skin. <b>D</b> helps absorb calcium for bones and is made in skin with sunlight. <b>E</b> is an antioxidant. <b>K</b> helps blood clot and is found in leafy greens.",
    "Eating them well|🥕|A little fat in a meal helps absorb these vitamins, such as a drizzle of oil on a carrot and spinach salad."
  ], [
    "Which group of vitamins dissolves in fat?|A, D, E and K|🥑||B and C,B and K",
    "Which vitamin helps blood clot?|vitamin K|🩸||vitamin E,vitamin C",
    "Which vitamin is linked to night vision?|vitamin A|👁️||vitamin K,vitamin C",
    "Which vitamin works as an antioxidant in cell membranes?|vitamin E|🛡️||vitamin D,vitamin K",
    "What does skin need to make vitamin D?|sunlight|☀️||cold wind,cooking heat",
    "Which mineral does vitamin D help the body absorb?|calcium|🦴||sodium,iodine",
    "Why can fat-soluble vitamins reach toxic levels more easily?|the body stores them|📦||they are flushed out fast,they have no calories",
    "Why add a little oil to a carrot salad?|fat helps absorb vitamin A|🥕||to remove the vitamin,to make carrots sweeter"
  ], "Think about where these vitamins dissolve and are kept."));
  a.push(L("Salt, osmosis and curing", [
    "Osmosis|🧂|<b>Osmosis</b> is the movement of water through a cell membrane toward the side with more dissolved salt or sugar. Salt on a cucumber slice pulls water out of its cells.",
    "Preserving with salt and sugar|🍯|Strong salt or sugar pulls water out of microbes, so they cannot grow. That is how salted fish, ham, and jam last a long time.",
    "Curing|🥓|<b>Curing</b> uses salt, and often <b>nitrite</b>, to preserve meat. Nitrite helps stop the toxin-making germ that causes botulism and keeps cured meat pink."
  ], [
    "What is osmosis?|water moving across a membrane toward more dissolved solute|💧||heat moving through metal,gas bubbles forming",
    "What does salt do to sliced cucumber?|draws water out|🥒||pushes water in,turns it to sugar",
    "Why does heavy salting preserve food?|it pulls water out of microbes|🧂||it adds vitamins,it adds air",
    "Why does limp lettuce crisp up in plain water?|its cells take in water|🥬||its cells lose water,its cells freeze",
    "Which food is preserved by a lot of sugar?|jam|🍓||fresh milk,raw fish",
    "What does curing mean?|preserving with salt|🥓||cooking with steam,freezing quickly",
    "What does nitrite in cured meat help prevent?|botulism|☠️||freezer burn,rice sticking",
    "Why is a very salty brine a poor home for microbes?|it dries them out|🫙||it feeds them,it warms them"
  ], "Follow where the water moves."));
  a.push(L("Foodborne pathogens", [
    "Common germs|🦠|<b>Salmonella</b> is linked to raw poultry and eggs. <b>E. coli O157:H7</b> is linked to undercooked ground beef. <b>Listeria</b> can grow even in a refrigerator. <b>Norovirus</b> spreads from sick people, often through unwashed hands.",
    "Toxins|☠️|<b>Clostridium botulinum</b> makes a dangerous toxin in badly canned low-acid food. Cooking to safe temperatures kills most germs but cannot remove every toxin.",
    "Staying safe|🌡️|Cook poultry to 165°F and ground beef to 160°F. Wash hands, keep cold food at 41°F or below, and heat deli meats until steaming for people at high risk, such as pregnant women."
  ], [
    "Which germ can keep growing at refrigerator temperatures?|Listeria|🧊||Norovirus,Hepatitis A",
    "Which germ is often linked to raw chicken and eggs?|Salmonella|🍗||Norovirus,Clostridium botulinum",
    "Which germ spreads mostly from sick people with unwashed hands?|Norovirus|🧼||Clostridium botulinum,Aspergillus",
    "Which germ makes a toxin in badly canned low-acid food?|Clostridium botulinum|🥫||Norovirus,Salmonella",
    "What is the safe internal temperature for ground beef?|160°F|🍔||120°F,100°F",
    "What is the safe internal temperature for poultry?|165°F|🍗||145°F,135°F",
    "Who is at highest risk from Listeria?|pregnant women|🤰||healthy teenagers,marathon runners",
    "What best stops norovirus from spreading?|washing hands well|🧼||adding more salt,using cold water only"
  ], "Match each germ to where it lives or how it spreads."));
  a.push(L("Meat color and myoglobin", [
    "A red pigment|🥩|<b>Myoglobin</b> is the protein that stores oxygen in muscle and gives meat its color. Beef has much more myoglobin than chicken breast or white fish.",
    "Color changes|🎨|With no oxygen (vacuum pack) meat looks <b>purple-red</b>. With oxygen it turns <b>bright red</b>. After a few days the pigment oxidizes and turns <b>brown</b>. Brown does not always mean spoiled.",
    "Cooking and curing|🌡️|Heat turns myoglobin gray-brown. Cured ham stays pink because nitrite fixes the pigment. Color is not a safe test, so use a thermometer."
  ], [
    "Which protein gives meat its red color?|myoglobin|🥩||gluten,collagen",
    "What color is fresh beef after meeting oxygen?|bright red|🥩||gray-green,black",
    "What color is vacuum-packed beef?|purple-red|📦||bright yellow,white",
    "What does brown beef surface often mean?|the pigment oxidized|🟤||it is always spoiled,it is frozen",
    "What is the best test that meat is cooked safely?|a thermometer|🌡️||its color,poking it with a fork",
    "Why can cooked cured ham stay pink?|nitrite fixes the pigment|🍖||it is still raw,it has dye added",
    "Which has the most myoglobin?|beef|🐄||chicken breast,white fish",
    "What color does heat turn myoglobin?|gray-brown|🔥||bright blue,purple"
  ], "Think about the pigment and what changes it."));
  a.push(L("Collagen and tender meat", [
    "Tough or tender|🥩|Muscles that work hard (shank, brisket, chuck) have lots of tough <b>collagen</b>. Muscles that work little (tenderloin) are tender.",
    "Cooking methods|🍲|Tough cuts need <b>slow, moist heat</b>. Over hours, collagen melts into soft <b>gelatin</b>. Tender cuts are cooked quickly with dry heat so they do not dry out.",
    "More tricks|🔪|Slice <b>across the grain</b> to cut the muscle fibers short. Enzymes such as <b>papain</b> from papaya can tenderize. White flecks of fat inside the muscle are called <b>marbling</b>."
  ], [
    "What tough protein is found in connective tissue?|collagen|🥩||glucose,lactose",
    "Slow moist cooking turns collagen into what?|gelatin|🍲||caramel,starch",
    "Which cut is naturally tender?|tenderloin|🥩||shank,brisket",
    "Which cut needs slow moist cooking?|brisket|🍲||tenderloin,ribeye",
    "Which muscles tend to be tougher?|ones used often|💪||ones used rarely,ones with no protein",
    "Why slice meat across the grain?|it shortens the muscle fibers|🔪||to remove the fat,to cook it faster",
    "What is papain used as?|a meat tenderizer|🍈||a food dye,a sweetener",
    "What are the white flecks of fat inside beef called?|marbling|🥩||grain,casing"
  ], "Match the cooking method to the muscle."));
  a.push(L("Food laws and agencies", [
    "Who does what|🏛️|The <b>FDA</b> regulates most packaged foods. The <b>USDA's FSIS</b> inspects meat, poultry and processed egg products. The <b>EPA</b> sets limits for pesticides. The <b>CDC</b> tracks outbreaks of illness.",
    "Rules and labels|📜|<b>GRAS</b> means generally recognized as safe. <b>USDA grades</b> such as Prime and Choice are voluntary quality labels. The <b>FSMA</b> law shifted the focus to preventing problems before they happen.",
    "Recalls|📣|A <b>Class I recall</b> is the most serious kind: the product could cause serious harm or death."
  ], [
    "Which agency inspects meat and poultry?|USDA FSIS|🥩||the EPA,the CDC",
    "Which agency regulates most packaged foods?|the FDA|📦||the EPA,the CDC",
    "Which public health agency tracks outbreaks of illness?|the CDC|📈||the EPA,the Postal Service",
    "What does a Class I recall mean?|risk of serious harm or death|🚨||a spelling mistake on a label,a color change",
    "What does GRAS stand for?|generally recognized as safe|✅||grade rated as standard,good retail and storage",
    "USDA grades such as Choice are what?|voluntary|🏷️||required for all food,only for fish",
    "Which agency sets pesticide limits for food?|the EPA|🌾||the CDC,a grocery store",
    "FSMA focuses on what?|preventing problems before they happen|🛡️||reacting after people get sick,banning all imports"
  ], "Match the agency to its job."));
  a.push(L("Fibers and moisture", [
    "Water lovers and water haters|💧|<b>Hydrophilic</b> fibers (cotton, linen, rayon, wool) absorb water. <b>Hydrophobic</b> fibers (polyester, nylon) absorb very little and dry fast.",
    "Wicking|🏃|<b>Wicking</b> means moving sweat along the surface of a fabric so it can evaporate. Sports clothes use synthetic fibers for this. <b>Moisture regain</b> is how much moisture a fiber takes from the air.",
    "Choosing|🥾|Cotton soaks up water and feels cold when wet, so it is a poor choice for cold, wet hikes. Wool keeps some warmth even when damp."
  ], [
    "What are fibers that absorb water easily called?|hydrophilic|💧||hydrophobic,photophilic",
    "Which fiber absorbs little water and dries quickly?|polyester|🏃||cotton,rayon",
    "What is moving sweat along a fabric surface called?|wicking|🏃||pilling,felting",
    "Why is cotton poor for a cold wet hike?|it holds water and stays wet|🌧️||it is too colorful,it melts",
    "Which fabric keeps some warmth when damp?|wool|🧶||cotton,linen",
    "Which fiber is hydrophobic?|nylon|🧵||linen,rayon",
    "Why are towels made of cotton?|it absorbs lots of water|🛁||it repels water,it is slippery",
    "What does moisture regain measure?|how much moisture a fiber takes from air|💧||how stretchy a fiber is,how long the threads are"
  ], "Think about whether the fiber likes or avoids water."));
  a.push(L("Industrial Revolution and cloth", [
    "From home to factory|🏭|Long ago, thread was spun on a wheel and cloth woven on a hand loom at home. In the 1700s inventions such as the <b>spinning jenny</b> (many threads at once) and the <b>power loom</b> moved cloth making into factories.",
    "More inventions|⚙️|The <b>cotton gin</b> (1793) removed seeds from cotton fiber quickly. The <b>sewing machine</b> (patented in 1846) sped up stitching. Early mills were often built beside rivers for water power.",
    "Results|👚|Cloth became much cheaper and <b>ready-to-wear</b> clothes in standard sizes spread. Harsh factory conditions, including child labor, later led to labor laws."
  ], [
    "What did the spinning jenny do?|spun several threads at once|🧵||separated seeds from cotton,sewed seams",
    "What did the cotton gin do?|removed seeds from cotton|☁️||wove the cloth,dyed the thread",
    "What did the power loom do?|wove cloth using machine power|⚙️||picked cotton,sewed on buttons",
    "Why were early textile mills built beside rivers?|for water power|🌊||for fishing,for shade",
    "Which invention made stitching clothes faster?|the sewing machine|🪡||the cotton gin,the spinning wheel",
    "What does ready-to-wear mean?|clothes made in standard sizes before sale|👕||clothes made only to order,clothes you sew yourself",
    "What happened to cloth prices after factories?|they fell|📉||they rose,they stayed the same",
    "Why were labor laws later passed?|to protect workers including children|⚖️||to raise cotton prices,to ban all machines"
  ], "Think about how machines changed who made cloth."));
  a.push(L("Kohlberg's moral stages", [
    "Three levels|⚖️|Lawrence Kohlberg studied <b>moral reasoning</b> by telling people dilemma stories. He described three levels: <b>preconventional</b>, <b>conventional</b> and <b>postconventional</b>.",
    "What each means|🧒|<b>Preconventional:</b> obey to avoid punishment or get rewards. <b>Conventional:</b> follow rules and laws to keep order and please others. <b>Postconventional:</b> use broad principles such as justice and human rights.",
    "Reasons count|💭|Kohlberg scored the <b>reasons</b> people gave, not whether they said yes or no. Carol Gilligan criticized the theory for stressing justice over care and relationships."
  ], [
    "Kohlberg's levels are preconventional, conventional and what?|postconventional|⚖️||unconventional,subconventional",
    "A child obeys only to avoid punishment. Which level?|preconventional|🧒||conventional,postconventional",
    "Following laws because they keep society orderly is which level?|conventional|🚦||preconventional,postconventional",
    "Choosing by universal principles like human rights is which level?|postconventional|🕊️||preconventional,conventional",
    "What did Kohlberg study?|moral reasoning|💭||memory speed,language sounds",
    "What did Kohlberg use to study people?|moral dilemma stories|📖||blood tests,mazes",
    "Who criticized Kohlberg for overlooking care and relationships?|Gilligan|👩||Pavlov,Skinner",
    "What did Kohlberg score most?|the reasons given|💭||the final yes or no,how fast people answered"
  ], "Think about the reason behind a choice."));
  a.push(L("Language development", [
    "Milestones|👶|Babies coo, then <b>babble</b> around 6 months. First words come near 12 months. At 18 to 24 months many children join two words, and use <b>telegraphic speech</b> such as \"want cookie\".",
    "Understanding first|👂|<b>Receptive language</b> (understanding) grows ahead of <b>expressive language</b> (speaking). A toddler may understand far more words than they can say.",
    "Theories|📚|<b>Skinner</b> said language is learned by reinforcement. <b>Chomsky</b> said humans have an inborn ability for language. <b>Vygotsky</b> stressed social talk. Adults help by talking, reading aloud and answering a child's babbles."
  ], [
    "At about what age does babbling begin?|6 months|👶||18 months,3 years",
    "About when do first words usually appear?|12 months|🗣️||3 months,3 years",
    "When do two-word phrases usually begin?|18 to 24 months|👶||6 months,5 years",
    "Understanding words is called what?|receptive language|👂||expressive language,telegraphic speech",
    "What is short speech like \"want cookie\" called?|telegraphic speech|🍪||babbling,echoing",
    "Who said humans have an inborn ability for language?|Chomsky|🧠||Skinner,Maslow",
    "Skinner said language is mostly learned through what?|reinforcement|⭐||inborn rules,genes only",
    "What helps a child's language most?|talking, reading and responding|📖||letting a screen do the talking,ignoring babbling"
  ], "Think about what comes first: understanding or speaking."));
  a.push(L("Supply, demand and prices", [
    "Two forces|⚖️|<b>Demand</b> is how much buyers want at each price. When price rises, buyers usually want less. <b>Supply</b> is how much sellers offer. When price rises, sellers usually offer more.",
    "Balance|🎯|The <b>equilibrium price</b> is where the quantity demanded equals the quantity supplied. A <b>shortage</b> pushes prices up. A <b>surplus</b> pushes prices down.",
    "Real life|🍊|A frost that ruins orange crops cuts supply, so orange prices rise. <b>Substitutes</b> (butter and margarine) compete. <b>Complements</b> (hot dogs and buns) are bought together."
  ], [
    "When price rises, quantity demanded usually does what?|falls|📉||rises,stays the same",
    "When price rises, sellers usually offer what?|more|📈||less,none",
    "When does a shortage happen?|demand is greater than supply at the price|🛒||supply is greater than demand,prices are zero",
    "A surplus tends to cause prices to do what?|fall|🏷️||rise,double",
    "A frost destroys many oranges. Orange prices likely do what?|rise|🍊||fall,stay at zero",
    "What is the price where supply and demand match called?|equilibrium price|🎯||surplus,markup",
    "Butter gets expensive and people buy margarine. Margarine is a what?|substitute|🧈||complement,surplus",
    "Hot dogs and buns are examples of what?|complements|🌭||substitutes,surpluses"
  ], "Think about what buyers and sellers do as price changes."));
  a.push(L("Lighting design", [
    "Measuring light|💡|<b>Lumens</b> measure how much light a bulb gives. <b>Watts</b> measure the power it uses. <b>Kelvins</b> (K) measure color: about 2700K is warm and yellowish, 5000K and up is cool and bluish like daylight.",
    "Three layers|🛋️|<b>Ambient</b> light fills a room. <b>Task</b> light helps you work, read or cook. <b>Accent</b> light highlights art or plants. Good rooms use all three.",
    "True colors|🎨|<b>CRI</b> (color rendering index) tells how true colors look under a bulb. A higher CRI shows food and fabric colors more accurately."
  ], [
    "Which unit measures how much light a bulb gives?|lumens|💡||watts,kelvins",
    "What do watts measure?|power used|🔌||brightness,light color",
    "What does Kelvin measure on a bulb?|color temperature|🌡️||power,weight",
    "How does 2700K light look?|warm and yellowish|🕯️||cool and bluish,green",
    "How does 5000K light look?|cool and bluish-white|☀️||warm orange,red",
    "Light for reading or chopping at a counter is what?|task lighting|📖||accent lighting,ambient lighting",
    "Light that highlights a painting is what?|accent lighting|🖼️||task lighting,ambient lighting",
    "What does a high CRI show?|colors look more true|🎨||the bulb lasts longer,the bulb is hotter"
  ], "Match each light to its job."));
  a.push(L("Color and room feeling", [
    "Warm and cool|🎨|<b>Warm</b> colors (red, orange, yellow) feel cozy and seem to come closer. <b>Cool</b> colors (blue, green, violet) feel calm and seem to move away, so pale cool colors make a room feel larger.",
    "Hue, value, intensity|🌈|<b>Hue</b> is the color name. <b>Value</b> is how light or dark it is. <b>Intensity</b> is how bright or pure it is. Adding white makes a <b>tint</b>, black a <b>shade</b>, gray a <b>tone</b>.",
    "Schemes|🏠|A <b>monochromatic</b> scheme uses one hue. <b>Complementary</b> colors sit opposite each other on the wheel. The <b>60-30-10 rule</b> uses 60% main color, 30% second color and 10% accent."
  ], [
    "Which colors feel warm?|red, orange and yellow|🔥||blue, green and violet,gray and white",
    "Which colors make a small room feel larger?|pale cool colors|💙||dark warm colors,bright neon colors",
    "Adding white to a color makes a what?|tint|🎨||shade,tone",
    "Adding black to a color makes a what?|shade|🎨||tint,tone",
    "What does value mean in color?|how light or dark it is|🌗||its name,its price",
    "What does intensity mean in color?|how bright or pure it is|✨||how light or dark it is,its cost per can",
    "In the 60-30-10 rule, what does the 10% cover?|the accent color|🎀||the main color,the second color",
    "Colors opposite each other on the wheel are what?|complementary|🔴||analogous,monochromatic"
  ], "Think about what each color word describes."));
  a.push(L("Hunger hormones", [
    "Messengers|🧠|Hormones tell the brain when to eat. <b>Ghrelin</b> from the stomach rises before meals and signals hunger. <b>Leptin</b> from fat cells signals long-term fullness. The <b>hypothalamus</b> in the brain reads the signals.",
    "Fullness|🍽️|<b>Satiation</b> is feeling full during a meal. <b>Satiety</b> is staying full afterward. Protein and fiber help most. Fullness signals take about 20 minutes, so eating slowly helps.",
    "Sleep|😴|Short sleep raises ghrelin and lowers leptin, which can increase appetite."
  ], [
    "Which hormone signals hunger?|ghrelin|🍽️||leptin,insulin",
    "Which hormone from fat cells signals fullness?|leptin|🧈||ghrelin,adrenaline",
    "Where is ghrelin made?|the stomach|🫃||the ears,the knees",
    "Which part of the brain reads hunger signals?|hypothalamus|🧠||the cerebellum,the nose",
    "Feeling full during a meal is called what?|satiation|😋||satiety,starvation",
    "Staying full for hours after a meal is called what?|satiety|⏳||satiation,digestion",
    "Which nutrients make you feel full longest?|protein and fiber|🥦||sugar and soda,plain water ice",
    "What does short sleep do to ghrelin?|raises it|😴||lowers it,removes it"
  ], "Think about which hormone says go and which says stop."));
  a.push(G("Brine strength", [
    "Percent brine|🧂|Brine strength is the salt as a share of the whole mixture: <b>salt ÷ (salt + water) × 100</b>. A 5% brine has 5 g of salt in every 100 g of brine.",
    "Finding salt|⚖️|To find the salt in a batch: <b>total weight × percent ÷ 100</b>. The water is the total minus the salt.",
    "Why it matters|🥒|Pickling and curing recipes depend on exact strength. Too weak will not preserve; too strong tastes bad."
  ], () => {
    const T = pick([200, 400, 500, 1000]), p = pick([2, 3, 4, 5, 8, 10]), s = T * p / 100, w = T - s, t = Math.random();
    if (t < 0.4) return Q(`A brine has ${s} g of salt and ${w} g of water. What is its strength in percent?`, p, "🧂",
      "First add the salt and water to get the total weight.", "Divide the salt by the total, then multiply by 100.",
      "20 g of salt in 480 g of water: total 500 g, 20 ÷ 500 = 0.04, so 4%.");
    if (t < 0.75) return Q(`How many grams of salt are in ${T} g of ${p}% brine?`, s, "🥒",
      "A percent means that many grams in every 100 g.", "Multiply the total weight by the percent, then divide by 100.",
      "In 300 g of 2% brine: 300 × 2 ÷ 100 = 6 g of salt.");
    return Q(`You make ${T} g of ${p}% brine. How many grams of water does it contain?`, w, "💧",
      "Work out the salt first. The rest is water.", "Water = total weight minus the salt weight.",
      "For 500 g of 4% brine: salt = 20 g, so water = 500 - 20 = 480 g.");
  }));
  a.push(G("Straight-line depreciation", [
    "Losing value|🚗|Appliances and cars lose value as they age. <b>Straight-line depreciation</b> spreads the loss evenly: <b>(cost - salvage value) ÷ years of life</b>.",
    "Salvage value|♻️|The <b>salvage value</b> is what it is worth at the end of its useful life. The yearly loss is the same each year.",
    "Value now|📉|Value after some years = cost minus (yearly loss × years)."
  ], () => {
    let C, n, d, S;
    do { C = pick([12000, 18000, 24000, 30000]); n = pick([4, 5, 6, 8]); d = pick([1000, 1500, 2000, 2500, 3000]); S = C - d * n; } while (S < 1000);
    const t = Math.random();
    if (t < 0.4) return Q(`A van costs $${C} and will be worth $${S} after ${n} years. What is the yearly straight-line depreciation in dollars?`, d, "🚐",
      "Find how much value is lost in total first.", "Divide the total loss by the number of years.",
      "A $9000 oven worth $3000 after 3 years loses $6000, and 6000 ÷ 3 = $2000 a year.");
    if (t < 0.75) { const k = ri(1, n - 1);
      return Q(`A machine costs $${C} and loses $${d} each year in straight-line depreciation. What is it worth after ${k} ${k === 1 ? "year" : "years"}?`, C - d * k, "🏭",
        "First work out the total value lost in those years.", "Subtract the total loss from the cost.",
        "A $10000 machine losing $1500 a year is worth 10000 - 1500 × 2 = $7000 after 2 years."); }
    return Q(`A car costs $${C}, loses $${d} a year, and lasts ${n} years. What is its salvage value in dollars?`, S, "🚗",
      "Find the total lost over the whole life.", "Subtract that total from the cost.",
      "A $12000 car losing $1000 a year for 5 years has salvage value 12000 - 5000 = $7000.");
  }));
  a.push(G("Lumens per watt", [
    "Efficiency of a bulb|💡|<b>Efficacy</b> is lumens per watt: <b>lumens ÷ watts</b>. A higher number means more light for the same power. LED bulbs give about 80 to 120 lumens per watt; old incandescent bulbs about 15.",
    "Other ways|🔄|Lumens = watts × efficacy. Watts needed = lumens ÷ efficacy.",
    "Saving power|🔌|A bulb that makes the same lumens with fewer watts costs less to run."
  ], () => {
    const w = pick([6, 8, 9, 10, 12, 15]), e = pick([60, 80, 100, 120]), t = Math.random(), lm = w * e;
    if (t < 0.35) return Q(`A bulb gives ${lm} lumens and uses ${w} watts. How many lumens per watt is that?`, e, "💡",
      "Efficacy compares light output with power used.", "Divide the lumens by the watts.",
      "An 800-lumen bulb using 10 watts gives 800 ÷ 10 = 80 lumens per watt.");
    if (t < 0.7) return Q(`An LED makes ${e} lumens per watt and uses ${w} watts. How many lumens does it give?`, lm, "🔆",
      "Multiply to find the total light.", "Lumens = watts × lumens per watt.",
      "A 5-watt LED at 100 lumens per watt gives 5 × 100 = 500 lumens.");
    return Q(`You want ${lm} lumens from an LED that gives ${e} lumens per watt. How many watts does it need?`, w, "🔌",
      "Divide the light you want by the efficacy.", "Watts = lumens ÷ lumens per watt.",
      "To get 600 lumens at 100 lumens per watt: 600 ÷ 100 = 6 watts.");
  }));
  a.push(MIX("Mixed practice", [a[0], a[1], a[3], a[4], a[6], a[8], a[9], a[11], a[12], a[15], a[16], a[17]]));
  a.push(MIX("Level 28 Challenge", [a[2], a[5], a[7], a[10], a[13], a[14], a[15], a[16], a[17], a[3], a[9], a[12]]));

  // ================= LEVEL 29 =================
  const b = [];
  b.push(L("Nutrition assessment (ABCD)", [
    "Four tools|📋|Dietitians check nutrition status with <b>ABCD</b>: <b>A</b>nthropometric (height, weight, BMI, waist), <b>B</b>iochemical (blood and urine tests), <b>C</b>linical (physical signs in skin, hair, eyes and mouth) and <b>D</b>ietary (what the person eats).",
    "Screening first|🔍|<b>Screening</b> is a quick check to find people at risk. A full <b>assessment</b> is deeper and leads to a care plan.",
    "Why mix methods|🧩|No single test tells the whole story. Blood tests may be normal while the diet is poor, so the four kinds of data are combined."
  ], [
    "What does the A in ABCD stand for?|anthropometric|📏||allergy,absorption",
    "Which ABCD part includes blood tests?|biochemical|🩸||dietary,clinical",
    "Which ABCD part includes physical signs such as pale skin?|clinical|🩺||dietary,anthropometric",
    "Which ABCD part includes a record of what a person eats?|dietary|🍽️||biochemical,anthropometric",
    "Waist circumference is which kind of data?|anthropometric|📏||biochemical,dietary",
    "A hemoglobin test is which kind of data?|biochemical|🧪||clinical,dietary",
    "What is a quick check to find people at risk called?|screening|🔍||a full care plan,a food diary",
    "Why combine all four kinds of data?|no single test tells the whole story|🧩||one test is always wrong,it takes longer"
  ], "Think about what each letter measures."));
  b.push(L("Nitrogen balance", [
    "Protein and nitrogen|🧬|Protein contains about 16% nitrogen, which other nutrients lack. Comparing nitrogen eaten with nitrogen lost (mostly as <b>urea</b> in urine) shows if the body is gaining or losing protein.",
    "Three states|⚖️|<b>Zero balance:</b> in equals out, normal in healthy adults. <b>Positive balance:</b> intake is greater than loss, as in growth, pregnancy and muscle building. <b>Negative balance:</b> loss is greater than intake, as in starvation, burns or severe illness.",
    "Quick math|🧮|Grams of protein = grams of nitrogen × 6.25."
  ], [
    "Which nutrient contains nitrogen?|protein|🧬||fat,starch",
    "In what form is most nitrogen lost in urine?|urea|💧||glucose,fiber",
    "What is it called when nitrogen in equals nitrogen out?|zero balance|⚖️||positive balance,negative balance",
    "Growing children are usually in what balance?|positive nitrogen balance|🧒||negative nitrogen balance,zero balance forever",
    "Starvation or severe burns lead to what?|negative nitrogen balance|🔥||positive nitrogen balance,extra growth",
    "Pregnancy is usually which state?|positive nitrogen balance|🤰||negative nitrogen balance,no nitrogen at all",
    "About what percent of protein is nitrogen?|16%|🧪||2%,60%",
    "A healthy adult usually has what?|zero nitrogen balance|🧑||large positive balance,large negative balance"
  ], "Compare nitrogen going in with nitrogen going out."));
  b.push(L("Electrolytes and fluid balance", [
    "Charged minerals|⚡|<b>Electrolytes</b> such as sodium, potassium, chloride and calcium carry electric charge in body water. They help nerves fire, muscles contract and fluids stay balanced.",
    "Sodium and potassium|🍌|<b>Sodium</b> is the main electrolyte outside cells. <b>Potassium</b> is the main one inside cells. A cell pump keeps the difference. Potassium-rich foods are bananas, potatoes and beans. Most people eat too much sodium (the limit is about 2300 mg a day).",
    "Too much or too little|💧|Heavy sweating can lose water and sodium. Drinking huge amounts of plain water can dilute blood sodium, called <b>hyponatremia</b>. Too much sodium can raise blood pressure in some people."
  ], [
    "What are charged minerals in body fluids called?|electrolytes|⚡||enzymes,antibodies",
    "Which electrolyte is the main one outside cells?|sodium|🧂||potassium,iron",
    "Which electrolyte is the main one inside cells?|potassium|🍌||sodium,chloride",
    "Which food is rich in potassium?|banana|🍌||white sugar,butter",
    "About how much sodium is the daily limit for adults?|2300 mg|🧂||230 mg,23000 mg",
    "Low blood sodium from overdrinking water is called what?|hyponatremia|🥤||dehydration,anemia",
    "What can too much sodium raise in some people?|blood pressure|🩺||height,vitamin D",
    "What do electrolytes help muscles and nerves do?|send signals and contract|💪||change color,make bone"
  ], "Think about charged minerals in body water."));
  b.push(L("Metabolic syndrome", [
    "A cluster of risks|🩺|<b>Metabolic syndrome</b> is a group of conditions that together raise the risk of heart disease and type 2 diabetes. A person has it with <b>3 of these 5</b>: large waist, high triglycerides, low HDL cholesterol, high blood pressure, high fasting blood sugar.",
    "Insulin resistance|🔬|Many cases involve <b>insulin resistance</b>: cells respond poorly to insulin, so blood sugar stays high.",
    "What helps|🏃|Regular activity, losing 5 to 10% of body weight if overweight, and eating whole grains, vegetables, fruit and healthy fats can improve all five signs."
  ], [
    "How many of the 5 signs make a metabolic syndrome diagnosis?|3|🩺||1,5",
    "Which cholesterol type is too low in metabolic syndrome?|HDL|🩸||LDL,total",
    "Which body measure is often too large?|waist|📏||height,foot size",
    "What does insulin resistance mean?|cells respond poorly to insulin|🔬||the body makes too much bone,cells use no energy",
    "Which blood fat is often too high?|triglycerides|🧈||fiber,calcium",
    "Metabolic syndrome raises the risk of what?|heart disease and type 2 diabetes|❤️||colds and flu,broken bones",
    "About how much weight loss can help if overweight?|5 to 10%|⚖️||50 to 60%,0.1%",
    "Which habit helps all five signs?|regular activity|🏃||skipping sleep,sitting more"
  ], "Count the signs and think about blood sugar."));
  b.push(L("Dietary survey methods", [
    "Asking what people eat|📝|A <b>24-hour recall</b> asks someone to list everything eaten yesterday. A <b>food record</b> (diary) is written as people eat, often for 3 to 7 days. A <b>food frequency questionnaire</b> (FFQ) asks how often foods were eaten over months.",
    "Strengths|✅|Recalls are fast. Records are more exact but take effort and can change what people eat. An FFQ shows usual habits, not exact amounts.",
    "Errors|⚠️|People may forget or <b>under-report</b> foods. Large surveys like NHANES in the United States use trained interviewers and portion models to reduce errors."
  ], [
    "Which method asks what someone ate yesterday?|24-hour recall|📝||food frequency questionnaire,weighed trial",
    "Which method asks how often foods were eaten over months?|food frequency questionnaire|📆||24-hour recall,food diary",
    "A diary kept as people eat is called what?|food record|📒||recall,survey",
    "Which method is fastest to collect?|24-hour recall|⏱️||weighed 7-day record,blood test",
    "What problem do people often have in surveys?|forgetting or under-reporting|🤔||eating too fast,no problem",
    "Why can keeping a food record change eating?|people may eat differently when recording|📒||the diary has calories,it removes hunger",
    "Which method shows usual habits instead of exact amounts?|food frequency questionnaire|📆||weighed record,single recall",
    "What does NHANES do?|surveys health and diet of Americans|📊||sells groceries,teaches cooking"
  ], "Match each method to how far back it looks."));
  b.push(L("Irradiation and high-pressure processing", [
    "Cold ways to kill germs|🔬|<b>Food irradiation</b> uses gamma rays, electron beams or X-rays to kill bacteria and insects. It does not make food radioactive. Irradiated foods may carry the <b>Radura</b> symbol.",
    "Pressure|🧃|<b>High-pressure processing (HPP)</b> puts packaged food in water under very high pressure. It kills many microbes without heat, so juice, guacamole and deli meats keep a fresh taste.",
    "Compared with heat|🔥|<b>Pasteurization</b> uses heat to kill harmful microbes. Irradiation and HPP are non-thermal. All of these methods reduce germs but still need good handling and cold storage."
  ], [
    "What does food irradiation use?|gamma rays or electron beams|🔬||microwaves only,strong magnets",
    "Does irradiation make food radioactive?|no|☢️||yes always,only fruit",
    "What does irradiation kill?|bacteria and insects|🦠||vitamins,all flavor",
    "What does HPP use to kill microbes?|very high pressure|🧃||very high heat,sugar",
    "Which food is often treated by HPP?|guacamole|🥑||dry flour,sugar",
    "What is pasteurization?|heat treatment to kill harmful microbes|♨️||pressing food flat,adding sugar",
    "Why are irradiation and HPP called non-thermal?|they use little or no heat|🧊||they only heat food,they are loud",
    "What does the Radura symbol mean?|the food was irradiated|🌱||the food is organic,the food is hot"
  ], "Think about how germs can be killed without much heat."));
  b.push(L("Sweeteners", [
    "Two groups|🍬|<b>Nutritive sweeteners</b> give calories: sugar, honey and <b>sugar alcohols</b> (xylitol, sorbitol) which have about 2 kcal per gram. <b>High-intensity sweeteners</b> such as aspartame, sucralose, stevia extracts and acesulfame K are hundreds of times sweeter than sugar, so tiny amounts are used.",
    "Rules|📜|Each approved sweetener has an <b>ADI</b>, an acceptable daily intake set far below levels of concern. Products with aspartame warn people with <b>PKU</b> because it contains phenylalanine.",
    "Cooking|🍰|Sucralose holds up in baking. Aspartame loses sweetness with long heating. Too many sugar alcohols can cause a laxative effect."
  ], [
    "Which is a sugar alcohol?|xylitol|🍬||sucralose,aspartame",
    "About how many kcal per gram do sugar alcohols have?|2|🔢||9,0",
    "High-intensity sweeteners are how sweet compared with sugar?|hundreds of times sweeter|✨||slightly less sweet,exactly the same",
    "What does ADI stand for?|acceptable daily intake|📏||added dairy ingredient,all daily iron",
    "Why do aspartame products warn people with PKU?|they contain phenylalanine|⚠️||they contain lactose,they contain gluten",
    "Which sweetener holds up well in baking?|sucralose|🍰||aspartame,none do",
    "Too many sugar alcohols can cause what?|a laxative effect|🚽||higher fever,faster hair growth",
    "Which is a nutritive sweetener?|honey|🍯||stevia extract,saccharin"
  ], "Think about calories and sweetness strength."));
  b.push(L("Work, family and time", [
    "Too much to do|⏰|Many families juggle jobs, school, meals and care. Time management tools help. A <b>to-do list</b> lists tasks, and <b>time blocking</b> puts tasks in set parts of the day.",
    "Eisenhower matrix|🧭|Sort tasks by urgent and important. <b>Urgent and important:</b> do now. <b>Important, not urgent:</b> schedule. <b>Urgent, not important:</b> delegate. <b>Neither:</b> drop.",
    "Balance|⚖️|Sharing chores (<b>delegating</b>), setting <b>boundaries</b> for work time and using flexible schedules lower stress and protect family time."
  ], [
    "In the Eisenhower matrix, what do you do with urgent and important tasks?|do them now|🔥||drop them,delegate them",
    "What do you do with important but not urgent tasks?|schedule them|📅||drop them,do them at midnight",
    "What do you do with urgent but not important tasks?|delegate them|🤝||schedule a year ahead,do first",
    "What do you do with tasks that are neither?|drop them|🗑️||do them first,schedule them",
    "What is putting tasks into set parts of the day?|time blocking|🧱||procrastinating,multitasking",
    "What does delegating mean?|giving a task to someone else|🤝||doing it twice,skipping it",
    "What do boundaries do?|protect work time from spilling into family time|🚧||make days shorter,remove all tasks",
    "Why share chores in a family?|it lowers stress for everyone|🏠||it makes more work,it removes meals"
  ], "Sort by urgent and important."));
  b.push(L("Behavioral economics", [
    "Mind tricks in buying|🧠|People do not always act like perfect calculators. <b>Anchoring:</b> the first price you see sways what feels fair. <b>Framing:</b> \"90% fat-free\" sounds better than \"10% fat\". <b>Loss aversion:</b> losing $20 feels worse than gaining $20 feels good.",
    "More patterns|🛒|The <b>default effect</b>: people stick to pre-chosen options. The <b>sunk cost fallacy</b>: continuing something because you already paid. <b>Scarcity</b>: \"only 3 left\" makes buyers hurry.",
    "Defend yourself|🛡️|Pause, compare unit prices, set a budget before shopping, and ask whether you would choose this if you had not already spent money."
  ], [
    "When the first price you see sways your idea of a fair price, it is what?|anchoring|⚓||framing,scarcity",
    "Describing the same fact as \"90% fat-free\" instead of \"10% fat\" is what?|framing|🖼️||anchoring,loss aversion",
    "Feeling a loss more strongly than an equal gain is what?|loss aversion|📉||the default effect,scarcity",
    "Sticking with a pre-chosen option is what?|the default effect|☑️||scarcity,sunk cost",
    "Finishing a bad meal just because you paid for it is what?|the sunk cost fallacy|🍽️||framing,anchoring",
    "\"Only 3 left!\" uses which idea?|scarcity|⏳||framing,the default effect",
    "Which habit helps you resist these tricks?|set a budget before shopping|📝||shop when rushed,buy what is first",
    "Why does a high original price crossed out make a sale look good?|it works as an anchor|🏷️||it is always the true value,it is a law"
  ], "Name the habit of mind the question describes."));
  b.push(L("Advertising techniques", [
    "How ads persuade|📺|<b>Testimonials</b> use a happy customer. <b>Bandwagon</b> says everyone is buying it. <b>Celebrity</b> ads borrow a famous face. <b>Emotional appeals</b> make you feel something. <b>Loaded words</b> like \"natural\" or \"pure\" can sound better than they are.",
    "Warnings|⚠️|<b>Bait and switch</b> advertises a cheap item, then pushes a costlier one. Fine print can hide limits. In the United States the <b>FTC</b> requires ads to be truthful and sponsors of influencers to be disclosed (#ad).",
    "Thinking critically|🔍|Ask who made the ad, what they want, what facts are missing and what the real cost is."
  ], [
    "An ad says \"everyone is buying it\". Which technique is that?|bandwagon|🚌||testimonial,bait and switch",
    "A happy customer tells how great a product is. Which technique?|testimonial|🗣️||bandwagon,fine print",
    "A famous athlete holds a drink in an ad. Which technique?|celebrity endorsement|🏅||bait and switch,loaded words",
    "A store advertises a cheap item then pushes a costlier one. What is that?|bait and switch|🎣||bandwagon,testimonial",
    "What does #ad on an influencer's post mean?|they were paid or sponsored|📱||they bought it themselves,it is a school project",
    "Which agency requires truthful advertising?|the FTC|🏛️||the CDC,the post office",
    "Why can the word \"natural\" mislead?|it has no strict meaning on many labels|🏷️||it always means organic,it means no calories",
    "What should you ask about an ad?|who made it and what they want|🔍||how loud it is,how many colors"
  ], "Look for who is trying to persuade you and how."));
  b.push(L("Cut, make, trim", [
    "From idea to garment|👕|A designer makes a <b>tech pack</b>: drawings, measurements and materials. A <b>pattern</b> is made, a <b>sample</b> is sewn, and the pattern is <b>graded</b> into other sizes.",
    "CMT|🏭|<b>Cut-make-trim (CMT)</b> factories cut the fabric, sew (make) the garment and add trims such as buttons, zippers and labels. A <b>marker</b> is a layout of pattern pieces that saves fabric.",
    "Quality|✅|Garments are pressed and inspected. <b>Quality control</b> checks seams, measurements and color before shipping."
  ], [
    "What is a document of drawings and measurements for a garment?|a tech pack|📐||a receipt,a marker",
    "What does grading a pattern do?|makes it in other sizes|📏||adds color,removes seams",
    "What does CMT stand for?|cut-make-trim|✂️||color-mix-test,cost-market-tag",
    "Which step is the make part?|sewing the garment|🪡||drawing the logo,shipping",
    "Which items are trims?|buttons and zippers|🔘||fabric bolts,sewing machines",
    "What is a marker in cutting?|a layout of pattern pieces on fabric|🗺️||a felt pen,a sale tag",
    "Why plan a marker carefully?|to waste less fabric|♻️||to use more fabric,to hide seams",
    "What does quality control check?|seams and measurements|✅||only price,only advertising"
  ], "Put the steps in order from drawing to shipping."));
  b.push(G("Glycemic load", [
    "Beyond GI|🍞|The <b>glycemic index (GI)</b> ranks how fast a food raises blood sugar, but ignores how much you eat. <b>Glycemic load (GL)</b> fixes that: <b>GL = GI × grams of carbohydrate ÷ 100</b>.",
    "Reading GL|📊|A GL of 10 or less is low, 11 to 19 is medium and 20 or more is high.",
    "Example|🍉|Watermelon has a high GI but few carbs in a serving, so its GL is low."
  ], () => {
    const g = pick([30, 40, 50, 60, 70, 80]), c = pick([10, 20, 30, 40, 50]), gl = g * c / 100, t = Math.random();
    if (t < 0.45) return Q(`A food has a GI of ${g} and a serving with ${c} g of carbohydrate. What is its glycemic load?`, gl, "🍞",
      "Multiply the two numbers and then scale by 100.", "GL = GI × carbs ÷ 100.",
      "GI 60 with 20 g of carbs: 60 × 20 ÷ 100 = 12.");
    if (t < 0.75) return Q(`A food has a glycemic load of ${gl} and a GI of ${g}. How many grams of carbohydrate are in the serving?`, c, "🍚",
      "Work backward from the formula.", "Carbs = GL × 100 ÷ GI.",
      "GL 12 with GI 60: 12 × 100 ÷ 60 = 20 g of carbs.");
    return Q(`A serving has ${c} g of carbohydrate and a glycemic load of ${gl}. What is the GI?`, g, "🍎",
      "Work backward from the formula.", "GI = GL × 100 ÷ carbs.",
      "20 g of carbs and GL 12: 12 × 100 ÷ 20 = GI 60.");
  }));
  b.push(G("The pH scale", [
    "Acid or base|🧪|The <b>pH scale</b> measures acidity. Lower numbers are more acidic: lemon juice is about 2, milk about 6.5, water 7 and baking soda solution about 9.",
    "Powers of ten|🔟|Each whole pH step is a <b>10 times</b> change in acidity. pH 3 is 10 times more acidic than pH 4 and 100 times more acidic than pH 5.",
    "Food safety|🥫|Foods with pH below 4.6 are <b>high-acid</b> and safe for boiling-water canning. Higher pH foods need a pressure canner."
  ], () => {
    const lo = ri(2, 5), d = ri(1, 3), hi = lo + d, t = Math.random();
    if (t < 0.5) return Q(`Food A has pH ${lo} and food B has pH ${hi}. How many times more acidic is food A?`, Math.pow(10, d), "🍋",
      "First find the difference in pH units.", "Each unit is 10 times, so multiply by 10 once per unit.",
      "pH 3 and pH 5 differ by 2 units: 10 × 10 = 100 times.");
    if (t < 0.8) return Q(`Food A has pH ${lo} and food B has pH ${hi}. How many pH units apart are they?`, d, "🧪",
      "Compare the two numbers.", "Subtract the smaller pH from the larger.",
      "pH 3 and pH 6 differ by 6 - 3 = 3 units.");
    return Q(`A sauce has pH ${hi}. Acid is added and the pH drops by ${d}. What is the new pH?`, lo, "🍅",
      "Adding acid makes the number go down.", "Subtract the drop from the starting pH.",
      "A sauce at pH 6 that drops by 2 reaches pH 4.");
  }));
  b.push(G("D-values and log reductions", [
    "Killing germs by degrees|♨️|The <b>D-value</b> is the time at a set temperature to kill 90% of a microbe, which is a <b>1-log reduction</b>. Each extra D-value cuts the count by another 10 times.",
    "Time needed|⏱️|<b>Time = D-value × number of log reductions.</b> A 5-log reduction means 5 D-values.",
    "Remaining germs|📉|Each log reduction divides the count by 10: a 3-log reduction divides by 1000."
  ], () => {
    const D = pick([1, 2, 3, 4, 5]), n = ri(2, 6), t = Math.random();
    if (t < 0.4) return Q(`A germ has a D-value of ${D} ${D === 1 ? "minute" : "minutes"} at a set temperature. How many minutes are needed for a ${n}-log reduction?`, D * n, "♨️",
      `A ${n}-log reduction needs that many D-values.`,"Multiply the D-value by the number of logs.",
      "D-value 2 minutes and a 4-log reduction: 2 × 4 = 8 minutes.");
    if (t < 0.7) return Q(`A germ has a D-value of ${D} ${D === 1 ? "minute" : "minutes"}. How many log reductions occur in ${D * n} minutes?`, n, "🧫",
      "Find how many D-values fit into the time.", "Divide the time by the D-value.",
      "D-value 3 minutes, 12 minutes of heat: 12 ÷ 3 = 4 log reductions.");
    const k = ri(2, 4), s = Math.pow(10, k + ri(1, 3)), r = ri(1, k);
    return Q(`A food has ${s} germs. A ${r}-log reduction is applied. How many germs remain?`, s / Math.pow(10, r), "🔬",
      "Each log reduction divides the count by 10.", "Divide by 10 once for each log.",
      "1000 germs with a 2-log reduction: 1000 ÷ 10 ÷ 10 = 10 germs.");
  }));
  b.push(G("Child care ratios", [
    "Ratios|👶|A <b>staff-to-child ratio</b> sets how many children one adult may watch. Younger children need smaller groups. States set their own rules, so these numbers are examples.",
    "Staff needed|🧮|Divide the number of children by the ratio, and <b>round up</b> because you cannot hire part of a person.",
    "Maximum group|👧|If you have s staff and a ratio of r children per adult, the most children allowed is <b>s × r</b>."
  ], () => {
    const r = pick([4, 6, 8, 10]), t = Math.random();
    if (t < 0.5) { const n = ri(r + 1, 6 * r - 1);
      return Q(`The ratio is 1 adult for every ${r} children. How many adults are needed for ${n} children?`, Math.ceil(n / r), "👩‍🏫",
        "Divide the children by the ratio.", "Round up to the next whole person.",
        "With a ratio of 1 to 5 and 12 children: 12 ÷ 5 = 2.4, so round up to 3 adults."); }
    const s = ri(2, 5);
    return Q(`The ratio is 1 adult for every ${r} children. What is the most children ${s} adults may watch?`, s * r, "🧒",
      "Each adult can watch the ratio number of children.", "Multiply the adults by the ratio.",
      "With a ratio of 1 to 6 and 3 adults: 3 × 6 = 18 children.");
  }));
  b.push(G("Expense ratios", [
    "Fund fees|📈|An <b>expense ratio</b> is the yearly fee a mutual fund or index fund charges, as a percent of your money. Fee = balance × ratio ÷ 100.",
    "Small numbers add up|🔍|A fee of 1% sounds small, but over decades it takes a large share of growth. Low-cost index funds often charge 0.1% or less.",
    "Compare|⚖️|Find each fund's yearly fee in dollars and subtract to compare."
  ], () => {
    const B = pick([10000, 20000, 40000, 100000]), r = pick([0.1, 0.2, 0.25, 0.5, 0.75, 1, 1.5]), t = Math.random();
    const fee = x => Math.round(B * x * 100) / 10000;
    if (t < 0.4) return Q(`A fund has an expense ratio of ${r}%. Your balance is $${B}. What is the yearly fee in dollars?`, fee(r), "📈",
      "A percent means per 100 dollars.", "Multiply the balance by the percent, then divide by 100.",
      "A $10000 balance at 0.5%: 10000 × 0.5 ÷ 100 = $50.");
    if (t < 0.75) { const r2 = pick([2, 3]);
      return Q(`Fund A charges ${r}% and fund B charges ${r2}%. Each holds $${B}. How many more dollars a year does fund B cost?`, fee(r2) - fee(r), "⚖️",
        "Find the yearly fee for each fund.", "Subtract the smaller fee from the larger.",
        "On $10000, 1% costs $100 and 0.5% costs $50, so the difference is $50."); }
    const y = ri(2, 5);
    return Q(`A fund charges ${r}% and your balance stays at $${B}. How many dollars in fees do you pay over ${y} years?`, fee(r) * y, "🗓️",
      "Find one year's fee first.", "Multiply one year's fee by the number of years.",
      "A $10000 balance at 0.5% costs $50 a year, so 3 years cost $150.");
  }));
  b.push(G("Markdowns", [
    "Sale prices|🏷️|A <b>markdown</b> lowers the price. Retailers use markdowns to move slow-selling items. <b>Markdown amount = original price × percent ÷ 100.</b>",
    "Sale price|🛍️|Sale price = original price minus markdown amount. Take 25% off $40: markdown $10, sale price $30.",
    "Finding the percent|🔎|Percent markdown = (original - sale) ÷ original × 100."
  ], () => {
    const P = pick([20, 40, 60, 80, 100, 120, 200]), m = pick([10, 20, 25, 30, 40, 50]), d = P * m / 100, t = Math.random();
    if (t < 0.4) return Q(`A jacket costs $${P}. It is marked down ${m}%. What is the sale price in dollars?`, P - d, "🧥",
      "Find how many dollars come off.", "Sale price = original - (original × percent ÷ 100).",
      "A $40 shirt marked down 25%: $10 off, so the sale price is $30.");
    if (t < 0.7) return Q(`A jacket costs $${P}. It is marked down ${m}%. How many dollars is the markdown?`, d, "🪙",
      "A percent means per 100.", "Multiply the price by the percent, then divide by 100.",
      "20% off a $50 item: 50 × 20 ÷ 100 = $10.");
    return Q(`A $${P} item is on sale for $${P - d}. What percent was the markdown?`, m, "🔎",
      "Find the dollars taken off first.", "Divide the dollars taken off by the original price, then multiply by 100.",
      "A $50 item on sale for $40 lost $10, and 10 ÷ 50 × 100 = 20%.");
  }));
  b.push(G("Floor plan scale", [
    "Reading a plan|📐|A floor plan is drawn smaller than the real room. The <b>scale</b> tells how much real space each inch stands for, such as 1 inch = 4 feet.",
    "Real length|📏|<b>Real length = plan length × scale.</b> A wall that is 3 inches long on a 1 inch = 4 feet plan is 12 feet long.",
    "Area|🏠|To find real area, change both sides to feet first, then multiply: length × width."
  ], () => {
    const k = pick([2, 4, 5, 10]), t = Math.random();
    if (t < 0.4) { const i = ri(2, 9);
      return Q(`On a plan, 1 inch = ${k} feet. A wall measures ${i} inches on the drawing. How many feet long is the real wall?`, i * k, "📐",
        "Each inch on the plan stands for the scale number of feet.", "Multiply the inches by the feet per inch.",
        "On a 1 inch = 5 feet plan, a 4 inch wall is 4 × 5 = 20 feet.");
    }
    if (t < 0.7) { const i = ri(2, 9);
      return Q(`On a plan, 1 inch = ${k} feet. A real hallway is ${i * k} feet long. How many inches long is it on the drawing?`, i, "🧭",
        "Work backward from the scale.", "Divide the real feet by the feet per inch.",
        "On a 1 inch = 5 feet plan, a 30 foot hall is 30 ÷ 5 = 6 inches.");
    }
    const w = ri(2, 5), l = ri(w + 1, 7);
    return Q(`On a plan, 1 inch = ${k} feet. A room measures ${l} inches by ${w} inches on the drawing. What is its real area in square feet?`, l * k * w * k, "🏠",
      "Change each side to real feet first.", "Multiply the two real lengths together.",
      "On a 1 inch = 2 feet plan, a 3 by 2 inch room is 6 ft by 4 ft, so 24 square feet.");
  }));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[6], b[8], b[10], b[11], b[12], b[13], b[15], b[17]]));
  b.push(MIX("Level 29 Challenge", [b[4], b[5], b[7], b[9], b[11], b[12], b[13], b[14], b[15], b[16], b[17], b[1]]));

  // ================= LEVEL 30 =================
  const c = [];
  c.push(L("Planning a community program", [
    "Start with needs|🏘️|A community nutrition program begins with a <b>needs assessment</b>: gather data and listen to the people it will serve. Then set goals and <b>SMART</b> objectives: specific, measurable, achievable, relevant, time-bound.",
    "Plan and run|🗂️|A <b>logic model</b> links <b>inputs</b> (money, staff), <b>activities</b> (classes), <b>outputs</b> (people reached) and <b>outcomes</b> (changes in knowledge or behavior).",
    "Evaluate|📈|<b>Process evaluation</b> asks whether the program ran as planned. <b>Outcome evaluation</b> asks whether participants changed. <b>Impact evaluation</b> looks at long-term health or community change."
  ], [
    "What is the first step in planning a community program?|a needs assessment|🔍||buying supplies,printing certificates",
    "What does the S in SMART stand for?|specific|🎯||sweet,simple",
    "What does the M in SMART stand for?|measurable|📏||meaningful,monthly",
    "In a logic model, classes taught are which part?|activities|🍎||inputs,outcomes",
    "In a logic model, money and staff are which part?|inputs|💵||outputs,outcomes",
    "Asking whether a program ran as planned is what kind of evaluation?|process evaluation|📋||outcome evaluation,impact evaluation",
    "Asking whether participants changed their behavior is what kind of evaluation?|outcome evaluation|📈||process evaluation,financial audit",
    "Which evaluation looks at long-term community health change?|impact evaluation|🌍||process evaluation,pilot evaluation"
  ], "Think about the order: look, plan, run, then check."));
  c.push(L("Behavior change theories", [
    "Health Belief Model|🧠|People act when they feel at risk (<b>susceptibility</b>), think it is serious (<b>severity</b>), see <b>benefits</b> of acting, see few <b>barriers</b>, get a <b>cue to action</b>, and have <b>self-efficacy</b> (belief that they can do it).",
    "Stages of Change|🪜|The <b>Transtheoretical Model</b> has five stages: <b>precontemplation</b> (not thinking about it), <b>contemplation</b> (thinking), <b>preparation</b> (planning), <b>action</b> (doing) and <b>maintenance</b> (keeping it up).",
    "Using theory|🛠️|Programs match their advice to the stage. Someone in contemplation needs reasons and support, not a strict plan."
  ], [
    "In the Health Belief Model, belief that you can do it is called what?|self-efficacy|💪||susceptibility,severity",
    "A reminder like a poster or text that prompts action is called what?|a cue to action|🔔||a barrier,a benefit",
    "Anything that makes a change hard is called what?|a barrier|🚧||a cue to action,a benefit",
    "Which stage means not yet thinking about change?|precontemplation|😴||preparation,action",
    "Which stage means thinking about changing but not yet ready?|contemplation|🤔||maintenance,action",
    "Which stage means making a plan to start soon?|preparation|📝||precontemplation,maintenance",
    "Which stage means keeping the new habit going?|maintenance|🔁||contemplation,preparation",
    "How should advice fit a person in contemplation?|give reasons and support|🤝||give a strict plan,say nothing"
  ], "Match each idea to the step in changing a habit."));
  c.push(L("Spices and herbs", [
    "Which is which|🌿|<b>Herbs</b> are leaves such as basil, parsley and mint. <b>Spices</b> come from seeds, bark, roots or berries: cumin seed, cinnamon bark, ginger root, black peppercorns.",
    "Flavor chemistry|🔥|Flavor comes from <b>volatile oils</b>. Many are fat-soluble, so frying spices briefly in oil (blooming) spreads flavor. <b>Capsaicin</b> gives chiles their heat, and dairy fat helps calm it.",
    "Using them|🧂|Whole spices keep flavor longer than ground ones, and toasting wakes them up. Add dried herbs early and fresh herbs near the end. Fresh herbs are weaker, so 1 tablespoon fresh equals about 1 teaspoon dried."
  ], [
    "Herbs come from which part of a plant?|leaves|🌿||bark,roots",
    "Cinnamon comes from what part of the tree?|bark|🪵||leaves,flowers",
    "Ginger is which plant part?|root|🫚||seed,leaf",
    "What gives herbs and spices their aroma?|volatile oils|💨||fiber,starch",
    "Why fry spices briefly in oil?|their flavor dissolves in fat|🍳||to remove all flavor,to make them heavier",
    "What gives chile peppers their heat?|capsaicin|🌶️||citric acid,lactose",
    "Which helps calm chile heat?|dairy fat|🥛||more chile,plain water only",
    "When should fresh herbs usually be added?|near the end|🌱||first thing,never"
  ], "Think about plant parts and oils that carry flavor."));
  c.push(L("Frying science", [
    "Steam keeps oil out|🍟|When food hits hot oil, its surface water turns to steam and pushes outward. This keeps most oil from soaking in and makes a crisp crust. Ideal frying temperature is about 350 to 375°F.",
    "Temperature control|🌡️|If oil is too cool, food absorbs oil and turns greasy. If it is too hot, the outside burns before the inside cooks. Too much food at once drops the temperature.",
    "Safety|🧯|Never put water on a grease fire. Slide a lid over the pan and turn off the heat. Dry food before frying to avoid spattering. Used oil breaks down, so strain it and replace it."
  ], [
    "About what temperature is best for frying?|350 to 375°F|🍟||150 to 200°F,500 to 600°F",
    "Why does hot oil make a crisp crust?|surface water turns to steam|♨️||the oil freezes the food,the food gets wet",
    "What happens when oil is too cool?|food absorbs oil and turns greasy|🛢️||food burns outside,food stays dry",
    "What happens when oil is too hot?|outside burns before inside cooks|🔥||food turns soft,oil disappears",
    "Why not fry too much food at once?|oil temperature drops|🍤||oil gets hotter,food shrinks to nothing",
    "How should you put out a grease fire?|cover with a lid|🧯||pour water on it,fan it",
    "Why dry food before frying?|water makes oil spatter|💧||to add flavor,to cool the oil",
    "What happens to oil used many times?|it breaks down|♻️||it improves,it turns into butter"
  ], "Think about water, steam and temperature."));
  c.push(L("Feeding infants", [
    "First six months|🍼|Babies need only <b>breast milk or iron-fortified formula</b> for the first 6 months. Breast-fed babies usually also need vitamin D drops.",
    "Starting solids|🥣|Around 6 months, when a baby sits with support, holds the head up and shows interest, begin <b>complementary foods</b> such as iron-rich meats, beans and cereals. Introduce one new food at a time.",
    "Safety|⚠️|No <b>honey</b> before 12 months because of infant botulism. No cow's milk as the main drink before 12 months. Avoid choking foods such as whole nuts, whole grapes and popcorn. Follow a baby's hunger and fullness cues."
  ], [
    "What should babies drink in the first 6 months?|breast milk or iron-fortified formula|🍼||cow's milk,fruit juice",
    "At about what age do babies start solid foods?|6 months|🥣||1 month,2 years",
    "Why is honey avoided before 12 months?|risk of infant botulism|🍯||it is too sweet to digest,it has no calories",
    "Which food is a choking hazard for babies?|whole grapes|🍇||mashed banana,thin cereal",
    "Which iron-rich food suits a baby starting solids?|iron-fortified cereal|🥣||potato chips,soda",
    "How should new foods be introduced?|one at a time|1️⃣||all at once,only at night",
    "What are cues that a baby is full?|turning away and closing the mouth|🙈||crying for more,reaching for the spoon",
    "Which drink should not be the main drink before 12 months?|cow's milk|🥛||formula,breast milk"
  ], "Think about what is safe and nourishing for a baby's age."));
  c.push(L("Consumer protection", [
    "Who helps consumers|🛡️|The <b>FTC</b> fights unfair and deceptive business practices. The <b>CFPB</b> oversees financial products like loans and credit cards. The <b>CPSC</b> handles unsafe products and recalls. State attorneys general also take complaints.",
    "Important rights|📜|The <b>Fair Credit Reporting Act</b> gives you free credit reports each year and the right to dispute errors. The FTC <b>Cooling-Off Rule</b> gives 3 days to cancel many door-to-door sales.",
    "Getting help|📞|Keep records, contact the seller first, then file a complaint with the right agency or use small claims court. The Better Business Bureau is a private group, not a government agency."
  ], [
    "Which agency fights deceptive business practices?|the FTC|🛡️||the CPSC,the CDC",
    "Which agency oversees loans and credit cards?|the CFPB|💳||the CPSC,the EPA",
    "Which agency handles unsafe product recalls like cribs?|the CPSC|🧸||the CFPB,the FTC",
    "What does the Fair Credit Reporting Act let you do?|dispute errors in your credit report|📄||cancel any purchase,borrow without interest",
    "How long is the Cooling-Off Rule for many door-to-door sales?|3 days|🚪||3 months,3 minutes",
    "What should you do before filing a complaint?|contact the seller and keep records|📁||post to everyone,throw away receipts",
    "Which court can handle small money disputes?|small claims court|⚖️||the supreme court only,traffic court",
    "The Better Business Bureau is what kind of group?|a private group|🏢||a government agency,a police force"
  ], "Match each agency or law to its job."));
  c.push(L("Smart and performance textiles", [
    "Fabrics that do more|🧪|<b>Smart textiles</b> sense or react: conductive threads can measure heart rate, and heated jackets warm on demand. <b>Phase-change materials</b> absorb or release heat as they melt and freeze to keep a wearer comfortable.",
    "Strong and protective|🛡️|<b>Aramid</b> fibers such as Kevlar are very strong. <b>Nomex</b> resists flame. <b>UPF</b> fabrics block ultraviolet light. Some finishes slow odor-causing bacteria.",
    "Waterproof and breathable|☔|A membrane such as <b>Gore-Tex</b> has pores too small for water drops but big enough for sweat vapor, so rain stays out and sweat escapes."
  ], [
    "What can conductive thread in a shirt do?|measure heart rate|💓||change a shirt's size,wash itself",
    "What do phase-change materials do in clothing?|absorb or release heat|🌡️||add color,make fabric heavier",
    "Which fiber is known for great strength?|aramid|🦺||cotton,rayon",
    "Which fabric resists flame?|Nomex|🔥||cotton jersey,fleece",
    "What does UPF measure?|protection from ultraviolet light|☀️||how stretchy fabric is,how heavy it is",
    "A waterproof breathable membrane lets what pass through?|sweat vapor|💨||rain drops,wind and rain",
    "Why are pores in the membrane too small for rain?|water drops are larger than vapor|☔||rain is a gas,vapor molecules are larger",
    "What does an antimicrobial finish do?|slows odor-causing bacteria|🦠||adds sparkle,makes fabric waterproof"
  ], "Think about what each fabric does for the wearer."));
  c.push(L("Dress and culture", [
    "Clothes tell stories|🌏|Clothing shows climate, work, religion, status and identity. It can also mark celebrations, schools and teams.",
    "Traditional garments|👘|The <b>kimono</b> is traditional in Japan. The <b>sari</b> is draped cloth worn in South Asia. <b>Kente</b> is woven strip cloth from Ghana. The <b>hanbok</b> is Korean. The <b>kilt</b> is from Scotland. The <b>poncho</b> is from the Andes.",
    "Respect|🤝|Learning about dress means asking who made it and what it means. Wearing something sacred or ceremonial just as a costume can be disrespectful; learning and buying from the makers is a better way to appreciate."
  ], [
    "Which garment is traditional in Japan?|kimono|👘||kilt,poncho",
    "Which garment is draped cloth worn in South Asia?|sari|🥻||hanbok,kilt",
    "Kente cloth comes from which country?|Ghana|🧵||Scotland,Peru",
    "The hanbok is traditional in which country?|Korea|👗||Japan,Brazil",
    "The kilt is traditional in which country?|Scotland|🏴||Ghana,Korea",
    "The poncho is traditional in which region?|the Andes|⛰️||the Arctic,Scandinavia",
    "What does clothing often show about a person?|climate and identity|🌏||only their age,only their weight",
    "What is a respectful way to appreciate another culture's dress?|learn its meaning and support its makers|🤝||wear sacred items as a costume,copy it and say it is yours"
  ], "Match each garment to the place it comes from."));
  c.push(L("Zoning and affordable housing", [
    "Zoning|🗺️|<b>Zoning</b> laws decide how land can be used: residential, commercial, industrial or <b>mixed-use</b>. A <b>variance</b> is special permission to break a zoning rule. <b>Building codes</b> set safety rules for construction.",
    "Affordable|💵|Housing is called <b>affordable</b> when it costs no more than about <b>30% of a household's income</b>. <b>AMI</b> stands for area median income, used to set who qualifies for help.",
    "Ways to help|🏘️|Examples are rental <b>vouchers</b>, public housing, nonprofit builders and <b>community land trusts</b>. Allowing smaller homes and apartments in more zones can add supply."
  ], [
    "What do zoning laws decide?|how land can be used|🗺️||what color to paint,who may vote",
    "A mixed-use zone allows what?|homes and shops together|🏪||only farms,only factories",
    "What is a variance?|special permission to break a zoning rule|📝||a type of paint,a rent increase",
    "What do building codes set?|safety rules for construction|🏗️||land prices,rent due dates",
    "Housing is affordable at about what share of income?|30%|💵||80%,5%",
    "What does AMI stand for?|area median income|📊||annual mortgage interest,average market index",
    "What is a rental voucher?|help paying rent|🎟️||a coupon for paint,a type of lease",
    "How can more housing supply be encouraged?|allow more kinds of homes|🏘️||ban new building,double the rent"
  ], "Think about rules for land and how much income housing should cost."));
  c.push(L("Home styles", [
    "Colonial and Cape Cod|🏠|<b>Colonial</b> homes are symmetrical with a center door and shuttered windows. <b>Cape Cod</b> homes are small, with a steep roof, dormers and a central chimney.",
    "Ornate and simple|🏡|<b>Victorian</b> homes (late 1800s) have towers, trim and bright colors. <b>Craftsman</b> homes (early 1900s) have low roofs and wide porches with tapered columns. <b>Ranch</b> homes (mid 1900s) are long, low and one story.",
    "Others|🏛️|<b>Tudor</b> homes have steep gables and half-timbering. <b>Mission</b> and Spanish styles have stucco walls and clay tile roofs. <b>Modern</b> homes have flat roofs, large windows and little ornament."
  ], [
    "Which style is symmetrical with a center door and shutters?|Colonial|🏠||Ranch,Modern",
    "Which style has a steep roof, dormers and a central chimney?|Cape Cod|🏡||Ranch,Victorian",
    "Which style has towers and ornate trim?|Victorian|🏰||Ranch,Modern",
    "Which style has a low roof and wide porch with tapered columns?|Craftsman|🛖||Tudor,Victorian",
    "Which style is long and low on one story?|Ranch|🏠||Victorian,Colonial",
    "Which style shows half-timbering and steep gables?|Tudor|🏚️||Modern,Ranch",
    "Which style has stucco walls and clay tile roofs?|Mission|🏜️||Tudor,Cape Cod",
    "Which style has flat roofs and large windows?|Modern|🪟||Colonial,Victorian"
  ], "Match each home style to its look."));
  c.push(L("Malnutrition around the world", [
    "Types|🌍|<b>Stunting</b> is low height for age and shows long-term lack of food or nutrients. <b>Wasting</b> is low weight for height and shows recent severe shortage. <b>Hidden hunger</b> means lacking vitamins and minerals such as iron, vitamin A, iodine and zinc.",
    "Double burden|⚖️|Some countries and even households have both undernutrition and overweight. The first <b>1000 days</b>, from pregnancy to age 2, matter most for growth and brain development.",
    "Solutions|🛠️|Examples: breastfeeding support, <b>iodized salt</b> to prevent goiter, vitamin A doses, <b>fortification</b> of flour, <b>oral rehydration</b> for diarrhea, and <b>RUTF</b>, a ready-to-use peanut-based therapeutic food."
  ], [
    "What is low height for age called?|stunting|📏||wasting,obesity",
    "What is low weight for height called?|wasting|⚖️||stunting,fortification",
    "What does hidden hunger mean?|lacking vitamins and minerals|🥦||eating too little at one meal,eating in secret",
    "Lack of which mineral causes goiter?|iodine|🧂||calcium,sodium",
    "What are the first 1000 days?|pregnancy to age 2|👶||the first year of school,age 10 to 13",
    "What does iodized salt help prevent?|goiter|🧂||broken bones,sunburn",
    "What does oral rehydration treat?|loss of fluid from diarrhea|💧||tooth decay,sunburn",
    "What is fortification?|adding nutrients to common foods|🌾||removing nutrients,baking bread"
  ], "Match the term to the problem or fix."));
  c.push(L("Dietitians and evidence", [
    "Credentials|🎓|A <b>registered dietitian nutritionist (RD or RDN)</b> completes an accredited degree, supervised practice and a national exam, then keeps learning. In some places anyone can call themselves a nutritionist.",
    "What they do|🩺|Dietitians work in hospitals (<b>medical nutrition therapy</b>), communities, schools, sports and food service. Each has a <b>scope of practice</b> of what they are trained to do.",
    "Strong evidence|📚|Stronger evidence comes from <b>systematic reviews</b> and <b>randomized controlled trials</b>. Weaker evidence comes from single stories or opinions. Check who paid for a study and whether it was peer reviewed."
  ], [
    "What does RDN stand for?|registered dietitian nutritionist|🎓||regional diet nurse,rapid diet number",
    "What must an RD pass?|a national exam|📝||a cooking contest,nothing",
    "What is medical nutrition therapy?|diet care for a medical condition|🏥||a type of vitamin,a cooking class",
    "What is scope of practice?|what a professional is trained to do|📋||a telescope,a kitchen tool",
    "Which gives stronger evidence?|a randomized controlled trial|🔬||a single story,a social media post",
    "Which is the weakest kind of evidence?|a personal opinion|💬||a systematic review,a clinical trial",
    "What does peer reviewed mean?|experts checked the study|✅||friends liked it,it is free to read",
    "Why check who paid for a study?|funding can create bias|💵||to find the author's age,to count the pages"
  ], "Think about training and how strong the proof is."));
  c.push(L("Online shopping safety", [
    "Safe sites|🔒|Look for <b>https</b> and a padlock in the address, but remember that scam sites can have them too. Check the seller's reviews, contact details and return policy.",
    "Paying|💳|A <b>credit card</b> usually gives stronger fraud protection than a debit card. Never pay by gift card, wire or crypto to a stranger. Use a <b>unique password</b> and two-step sign in on shopping accounts.",
    "Scams|🎣|<b>Phishing</b> messages pretend to be a store and ask you to click a link. If a price is too good to be true it probably is. Avoid shopping on public Wi-Fi. A parent should handle all payments for a young person."
  ], [
    "What does https in an address indicate?|an encrypted connection|🔒||the site is always honest,the site is free",
    "Can scam sites have a padlock?|yes|🎣||never,only on Mondays",
    "What is phishing?|a fake message that tricks you into sharing information|🎣||a way to cook fish,a type of coupon",
    "Which gives stronger fraud protection?|a credit card|💳||a gift card,cash sent by mail",
    "Which payment is a warning sign for a scam?|a gift card to a stranger|🎁||a credit card at a known store,a pay at pickup",
    "What helps protect a shopping account?|a unique password and two-step sign in|🔑||the same password everywhere,sharing it with friends",
    "A price far below every other store likely means what?|it may be a scam|⚠️||it is a great deal for sure,the store likes you",
    "Why avoid shopping on public Wi-Fi?|others may snoop on traffic|📶||it makes prices higher,it is slower only"
  ], "Think about how to check a seller and how to pay safely."));
  c.push(G("Rates and prevalence", [
    "Counting disease|📈|<b>Incidence</b> is the number of <b>new</b> cases in a time period. <b>Prevalence</b> is all the people who have the condition at a given time. Rates are often per 1,000 or per 100,000 people.",
    "Rate formula|🧮|<b>Rate per 1,000 = cases ÷ population × 1,000.</b> To find cases: rate × population ÷ 1,000.",
    "Percent|💯|<b>Prevalence percent = cases ÷ population × 100.</b>"
  ], () => {
    const P = pick([10000, 20000, 50000, 100000, 200000]), k = pick([2, 3, 4, 5, 8, 10, 12]), cs = k * P / 1000, t = Math.random();
    if (t < 0.35) return Q(`A town of ${P} people had ${cs} new cases of an illness in a year. What is the incidence rate per 1,000 people?`, k, "🏙️",
      "Divide cases by the population first.", "Then multiply by 1,000.",
      "20 cases in 10000 people: 20 ÷ 10000 × 1000 = 2 per 1,000.");
    if (t < 0.7) return Q(`The incidence rate is ${k} per 1,000 people. How many new cases are expected in a town of ${P} people?`, cs, "📊",
      "Find how many groups of 1,000 are in the town.", "Multiply that number by the rate.",
      "In 5000 people at 3 per 1,000: 5 groups × 3 = 15 cases.");
    const N = pick([200, 500, 1000, 2000]), pc = pick([2, 4, 5, 8, 10, 12, 15, 20]);
    return Q(`In a school of ${N} students, ${N * pc / 100} have a food allergy. What is the prevalence in percent?`, pc, "🏫",
      "Divide the cases by the total group.", "Multiply by 100 to get a percent.",
      "In a school of 400 students, 20 have asthma: 20 ÷ 400 × 100 = 5%.");
  }));
  c.push(G("As purchased and edible portion", [
    "Trim loss|🥕|Peels, bones and trimmings are thrown away. <b>AP</b> means as purchased. <b>EP</b> means edible portion, what remains. <b>Yield % = EP ÷ AP × 100.</b>",
    "True cost|💲|<b>EP cost = AP cost ÷ (yield % ÷ 100)</b>. A food with low yield costs more per edible pound.",
    "Buying|🛒|To get a needed EP weight, <b>AP weight = EP weight × 100 ÷ yield %</b>."
  ], () => {
    const rows = [[8, 50, 4], [10, 50, 5], [5, 80, 4], [10, 80, 8], [4, 75, 3], [8, 75, 6], [5, 60, 3], [10, 60, 6], [4, 25, 1], [8, 25, 2]];
    const [e, y, ap] = pick(rows), w = pick([20, 40, 60, 100]), t = Math.random();
    if (t < 0.4) return Q(`A vegetable costs $${ap} per pound as purchased and has a ${y}% yield. What is its cost per edible pound in dollars?`, e, "🥕",
      "Remember only part of what you buy is eaten.", "Divide the purchase price by the yield written as a decimal.",
      "A $3 per pound item with a 50% yield costs 3 ÷ 0.5 = $6 per edible pound.");
    if (t < 0.7) return Q(`You buy ${w} lb of food with a ${y}% yield. How many pounds are edible?`, w * y / 100, "⚖️",
      "A percent means per 100.", "Multiply the weight by the yield percent, then divide by 100.",
      "Buying 20 lb at a 50% yield gives 20 × 50 ÷ 100 = 10 lb edible.");
    return Q(`A chef needs ${w * y / 100} lb of edible food. The yield is ${y}%. How many pounds must be purchased?`, w, "🛒",
      "You must buy more than you need, since some is thrown away.", "Multiply the edible weight by 100, then divide by the yield percent.",
      "To get 10 lb edible at a 50% yield: 10 × 100 ÷ 50 = 20 lb.");
  }));
  c.push(G("Price elasticity", [
    "How buyers react|📉|<b>Price elasticity of demand</b> = % change in quantity ÷ % change in price (ignoring the minus sign). If the answer is above 1, demand is <b>elastic</b>: buyers react strongly.",
    "Below 1|🧂|If it is below 1, demand is <b>inelastic</b>: buyers do not change much. Salt and medicine are close to inelastic. Fancy snacks are more elastic because they have many substitutes.",
    "Using it|🧮|Quantity change % = elasticity × price change %."
  ], () => {
    const p = pick([5, 10, 20]), E = pick([1, 2, 3, 4]), q = E * p, t = Math.random();
    if (t < 0.4) return Q(`A price rises ${p}% and the quantity sold falls ${q}%. What is the elasticity?`, E, "📉",
      "Compare the two percent changes.", "Divide the quantity change by the price change.",
      "Price up 10%, quantity down 30%: 30 ÷ 10 = 3.");
    if (t < 0.7) return Q(`A product has elasticity ${E}. Its price rises ${p}%. By what percent does the quantity sold fall?`, q, "🛒",
      "Elasticity tells how many times bigger the quantity change is.", "Multiply the elasticity by the price change.",
      "Elasticity 2 and a price rise of 10%: 2 × 10 = 20%.");
    return Q(`A product has elasticity ${E}. Its quantity sold fell ${q}%. By what percent did the price rise?`, p, "🏷️",
      "Work backward from the formula.", "Divide the quantity change by the elasticity.",
      "Elasticity 2 and a quantity drop of 20%: 20 ÷ 2 = 10% price rise.");
  }));
  c.push(G("Life cycle cost", [
    "Not just the price tag|🧊|<b>Life cycle cost = purchase price + running costs over the years.</b> A cheap appliance that uses lots of energy can cost more in the end.",
    "Comparing|⚖️|Add the price and the yearly cost times the years for each choice, then compare. The extra price of an efficient model is paid back by <b>yearly savings</b>.",
    "Payback|⏳|<b>Payback years = extra price ÷ yearly savings.</b>"
  ], () => {
    const price = pick([300, 400, 500, 600, 800]), run = pick([40, 60, 80, 100]), n = ri(3, 10), t = Math.random();
    if (t < 0.4) return Q(`A refrigerator costs $${price} and uses $${run} of electricity a year. What is its total cost over ${n} years in dollars?`, price + run * n, "🧊",
      "Find the running cost for all the years first.", "Add the price to the total running cost.",
      "A $500 fridge using $50 a year for 4 years costs 500 + 200 = $700.");
    const d = pick([20, 30, 40, 50, 60]), y = pick([3, 4, 5, 6, 8, 10]);
    if (t < 0.7) return Q(`An efficient model costs $${d * y} more but saves $${d} a year. How many years until the savings pay back the extra price?`, y, "💡",
      "Compare the extra price with the yearly saving.", "Divide the extra price by the savings per year.",
      "$300 extra and $50 saved a year: 300 ÷ 50 = 6 years.");
    return Q(`An efficient model saves $${d} a year and costs $${d * y} more. How many dollars have you saved in total after ${y + 2} years, counting the extra price?`, d * 2, "💰",
      "First find the savings across all the years.", "Subtract the extra price from the total savings.",
      "Saving $50 a year for 8 years is $400; with $300 extra price, you are $100 ahead.");
  }));
  c.push(G("Space planning", [
    "Rules of thumb|📐|Designers use clearances. A diner needs about <b>24 inches</b> of table edge. Leave about <b>36 inches</b> between a table and a wall or furniture for chairs and walking.",
    "Table length|🍽️|If p people sit on each long side, the table length is <b>24 × p inches</b>.",
    "Room width|🏠|Room width = table width + 36 inches on each side = table width + 72 inches."
  ], () => {
    const p = ri(2, 5), w = pick([36, 40, 42, 48]), t = Math.random();
    if (t < 0.35) return Q(`Each person needs 24 inches of table edge. ${p} people will sit along one long side. How long must the table be in inches?`, 24 * p, "🍽️",
      "Each person takes the same amount of space.", "Multiply 24 by the number of people on that side.",
      "For 3 people on a side: 24 × 3 = 72 inches.");
    if (t < 0.7) return Q(`A table is ${p * 24} inches long and each person needs 24 inches. How many people fit along one long side?`, p, "👥",
      "Find how many 24-inch spaces fit in the length.", "Divide the length by 24.",
      "A 96 inch table fits 96 ÷ 24 = 4 people per side.");
    return Q(`A dining table is ${w} inches wide. You want 36 inches of clearance on both sides. What is the least room width in inches?`, w + 72, "🏠",
      "There are two sides to leave space on.", "Add 36 twice to the table width.",
      "A 40 inch table needs 40 + 36 + 36 = 112 inches.");
  }));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[5], c[6], c[8], c[9], c[10], c[13], c[14], c[17]]));
  c.push(MIX("Level 30 Challenge", [c[4], c[7], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[0], c[2]]));

  Object.assign(HOMEEC_LEVELS, { 28: a, 29: b, 30: c });
})();
