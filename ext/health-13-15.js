// ext/health-13-15.js  Health & Safety levels 13-15
(() => {
  // item format: "question|answer|wrong1,wrong2,wrong3|visual(optional)"
  const L = (title, v, intro, key, tip, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p[2].split(/,(?=\S)/), v: p[3] || "" }; });
    const make = () => {
      const it = pick(its);
      const ex = pick(its.filter(x => x.a !== it.a && x.q !== it.q));
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...shuf(it.w).slice(0, 2)]), answer: it.a,
        hints: [nudge || "Read the question slowly, then look at every choice. Cross out any that sound unsafe or untrue.", tip, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: key }, { h: "Remember", v: "✏️", t: tip }];
    return { title, make };
  };
  const C = (title, v, intro, key, tip, gen) => {
    const make = () => { const g = gen(); return { text: g[0], answer: g[1], visual: g[5], hints: [g[2], g[3], g[4] + " Now do yours."] }; };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: key }, { h: "Remember", v: "✏️", t: tip }];
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const pk = (arr, idx) => idx.map(i => arr[i]);

  // ================= LEVEL 13 =================
  const a = [];
  a.push(L("Liver and pancreas", "🫀", "Two organs in your belly help your body use the food you eat.", "The <b>liver</b> makes bile that helps break down fats, stores energy, and cleans your blood. The <b>pancreas</b> makes digestive juices and makes <b>insulin</b>, which helps your cells use sugar from food. Both are part of the digestive team.", "Match each organ to its job.", [
    "Which organ makes bile to help break down fats?|Liver|Pancreas,Heart,Lung",
    "Which organ makes insulin?|Pancreas|Liver,Stomach,Kidney",
    "What does insulin help your cells use?|Sugar from food|Air,Bile,Salt",
    "Besides helping with digestion, the liver also...|Cleans the blood|Pumps the blood,Makes you taller,Sends sound to the brain",
    "Where does bile get stored before it is used?|Gallbladder|Brain,Bladder,Tonsils",
    "Which organ makes juices that flow into the small intestine?|Pancreas|Heart,Skin,Eye",
    "The liver can store...|Extra energy|Plastic,Sound,Light",
    "The liver and pancreas belong to which body system?|Digestive|Nervous,Skeletal,Respiratory"]));
  a.push(L("Heart rate zones", "💓", "Your heart beats faster when you exercise. Different effort levels are called zones.", "<b>Resting heart rate</b> is your pulse when calm. <b>Maximum heart rate</b> is about 220 minus your age. Light effort is about 50 to 60 percent of max, moderate is about 60 to 70 percent, and hard effort is above that. Most days, aim for moderate to vigorous activity.", "Faster beats mean harder work.", [
    "Pulse taken while you are calm and resting is called...|Resting heart rate|Maximum heart rate,Target speed",
    "A simple estimate of max heart rate is 220 minus your...|Age|Weight,Height,Shoe size",
    "During a hard sprint your heart rate is...|Higher than at rest|Lower than at rest,Stopped",
    "A fit heart usually has a resting rate that is...|Lower|Much higher,Zero,Skipping",
    "Where can you feel your pulse easily?|Wrist or neck|Knee,Elbow,Toe",
    "Why does your heart beat faster during exercise?|Muscles need more oxygen|It is nervous,It is bored,It is sleepy",
    "A walk where you can chat easily is...|Light effort|Maximum effort,Dangerous effort",
    "After exercise, your heart rate should...|Slowly return toward resting|Stay at maximum,Stop",
    ]));
  a.push(L("Muscle and fat", "💪", "Your body is made of muscle, bone, fat, water and more. Each has a job.", "<b>Body fat</b> stores energy, keeps you warm and cushions organs. You need some. <b>Muscle</b> moves your body and burns energy. Healthy bodies come in many shapes. Healthy habits (food, movement, sleep) matter more than how you look.", "A healthy body needs both muscle and some fat.", [
    "Why does your body need some fat?|Stores energy and keeps you warm|To slow you down,It has no use",
    "What does muscle do?|Moves your body|Stores bile,Makes blood sugar",
    "Do healthy bodies all look the same?|No, they come in many shapes|Yes, exactly alike,Only on Tuesdays",
    "What matters most for a healthy body?|Healthy habits|Having a certain look,Wearing a certain brand",
    "Fat cushions and protects your...|Organs|Fingernails,Hair,Teeth",
    "Which helps build strong muscles?|Activity and enough protein|Never moving,Skipping all meals",
    "Muscle uses energy even...|At rest, a little|Never,Only on holidays",
    "Which is a good way to treat your body?|Be kind to it and care for it|Compare it with others all day,Hide from all activity"]));
  a.push(L("Gut bacteria", "🦠", "Trillions of tiny microbes live in your intestines. Many are your helpers.", "Your <b>gut microbiome</b> is the community of bacteria in your intestines. Helpful ones aid digestion and help your immune system. <b>Fiber</b> feeds them. Foods like yogurt with live cultures contain <b>probiotics</b>. Not all bacteria are bad.", "Feed your helpful bacteria with fiber.", [
    "What is the gut microbiome?|Community of microbes in your intestines|A kind of muscle,A vitamin pill",
    "Are all bacteria harmful?|No, many are helpful|Yes, all of them,They are only harmful at night",
    "What do gut bacteria feed on?|Fiber|Plastic,Soap,Metal",
    "Which food may contain probiotics?|Yogurt with live cultures|Plain water,Hard candy,Ice cubes",
    "Helpful gut bacteria can help your...|Digestion and immune system|Eyesight only,Hair color,Height only",
    "Which is a high-fiber food?|Beans|White sugar,Soda,Butter",
    "Where do most of these microbes live?|Large intestine|Eyes,Brain,Lungs",
    "Which habit helps keep gut microbes happy?|Eating many plant foods|Eating only candy,Never eating vegetables"]));
  a.push(L("Water and fat vitamins", "🍊", "Vitamins are grouped by how your body stores them.", "<b>Water-soluble</b> vitamins (like vitamin C and the B vitamins) dissolve in water and are not stored much, so you need them every day. <b>Fat-soluble</b> vitamins (A, D, E and K) are stored in body fat and the liver. Eating a variety of foods gives you all of them.", "Think: dissolves in water, or in fat?", [
    "Vitamin C is...|Water-soluble|Fat-soluble,Not a vitamin",
    "Vitamin A is...|Fat-soluble|Water-soluble,A mineral",
    "Which vitamin helps your body take in calcium for bones?|Vitamin D|Vitamin C,Vitamin B",
    "Water-soluble vitamins need to be eaten...|Often, every day|Once a year,Never",
    "Which is a fat-soluble vitamin?|Vitamin K|Vitamin C,Biotin only",
    "Where are fat-soluble vitamins stored?|Body fat and liver|Hair,Nails,Teeth enamel",
    "Which food is rich in vitamin C?|Orange|Butter,Plain rice,Salt|🍊",
    "Your skin makes vitamin D when exposed to...|Sunlight|Moonlight,Cold air,Water"]));
  a.push(L("Sleep clock", "⏰", "Your body has a built-in clock that tells you when to feel awake or sleepy.", "The body clock is called the <b>circadian rhythm</b>. When it gets dark, your brain makes <b>melatonin</b>, which makes you sleepy. Bright light, especially from screens, can delay melatonin. Kids your age need about <b>9 to 12 hours</b> of sleep. Keep a regular bedtime.", "Dark helps sleep, bright light says wake up.", [
    "What is the body's built-in clock called?|Circadian rhythm|Heart rate,Digestion",
    "Which chemical makes you feel sleepy?|Melatonin|Insulin,Bile,Vitamin C",
    "What can delay sleepiness at night?|Bright screen light|Dim lights,A quiet room",
    "About how many hours of sleep do kids ages 6 to 12 need?|9 to 12|3 to 4,5 to 6,14 to 16",
    "Which habit helps you fall asleep?|Regular bedtime|Playing games in bed,Drinking a large soda at night",
    "Does your brain stop working while you sleep?|No, it sorts memories|Yes, completely,It turns into a muscle",
    "Why should screens be off before bed?|Light can make it harder to sleep|They get too hot,They use water",
    "Which makes a good bedroom for sleep?|Dark, quiet and cool|Bright and noisy,Full of lit screens"]));
  a.push(L("Thinking traps", "🧠", "Sometimes our thoughts trick us. Spotting a thinking trap helps you feel better.", "Common traps: <b>all-or-nothing</b> thinking (\"I always fail\"), <b>catastrophizing</b> (imagining the worst), and <b>mind reading</b> (guessing others think badly of you). Fix a trap by asking: \"Is this really true? What is a fairer way to see it?\"", "Look for words like always, never and everyone.", [
    "\"I failed one quiz, so I am bad at everything.\" This trap is...|All-or-nothing thinking|A fair thought,A fact",
    "Imagining the worst thing will surely happen is called...|Catastrophizing|Planning,Relaxing",
    "\"Everyone thinks I'm weird\" without asking anyone is...|Mind reading|A fact,A hint",
    "A good question to challenge a thought is...|Is this really true?|Who can I blame?,How can I hide?",
    "Which thought is fairer and kinder?|I made a mistake, and I can learn from it|I always ruin everything,Nobody likes me",
    "Words like always and never often show...|A thinking trap|A proven fact,A weather report",
    "Replacing a trap with a balanced thought helps you feel...|Calmer|Worse,Nothing at all",
    "When your thoughts feel stuck and heavy, it helps to...|Talk with a trusted adult|Hide them forever,Stop eating"]));
  a.push(L("Ways of speaking up", "🗣️", "How you say something matters as much as what you say.", "<b>Passive</b> means not saying what you need. <b>Aggressive</b> means being loud or unkind. <b>Assertive</b> means calmly and respectfully saying what you think or need. Assertive talk uses \"I\" statements, steady voice and eye contact.", "Assertive = calm, clear and respectful.", [
    "Calmly and respectfully saying what you need is...|Assertive|Passive,Aggressive",
    "Staying silent when you disagree is...|Passive|Assertive,Helpful teamwork",
    "Yelling and insulting someone is...|Aggressive|Assertive,Passive",
    "Which is an assertive sentence?|I don't like that, please stop.|Whatever, never mind.,You are so dumb!",
    "Which body language shows assertiveness?|Steady voice and eye contact|Looking at the floor and mumbling,Clenched fists and yelling",
    "Why is assertive talk useful?|It solves problems respectfully|It always wins an argument,It hides your needs",
    "If a friend asks you to do something unsafe, an assertive reply is...|No, I won't do that.|Okay, I guess...,Make me!",
    "An \"I statement\" starts with...|I feel...|You always...,Everybody says..."]));
  a.push(L("Edited pictures", "🖼️", "Pictures and videos online are not always real. They can be edited.", "Photos can be <b>edited</b> or made by computers. Filters and editing apps can change faces, bodies and backgrounds, so what you see may not be real life. Before believing or sharing, ask: <b>Who made this? Is it real? Does it feel too perfect or too shocking?</b>", "Pause and check before you trust or share.", [
    "Are all online photos real and untouched?|No, many are edited|Yes, always,Only on weekends",
    "A filter on a face photo can...|Change how the person looks|Make the person healthier,Show the true photo",
    "Before sharing a shocking picture you should...|Check if it is real|Share it fast,Add more edits",
    "Which is a smart question to ask about a picture?|Who made this and why?|How many hearts did it get?,Is it my color?",
    "Perfect-looking bodies online are often...|Edited or posed|Always natural,Required for health",
    "Comparing yourself to edited photos can make you feel...|Worse about yourself|Taller,Smarter",
    "Who can help you decide if something online is real?|A trusted adult|A stranger,A pop-up ad",
    "A picture that looks too good to be true might be...|Edited|Always proof,A law"]));
  a.push(L("Kitchen fire safety", "🧯", "Cooking is a leading cause of home fires, so know what to do.", "Stay in the kitchen when cooking. Keep towels and paper away from the stove. For a <b>grease fire</b>, never use water: slide a lid over the pan and turn off the heat. Know how to use a fire extinguisher with <b>PASS</b>: Pull, Aim, Squeeze, Sweep. If a fire grows, get out and call for help.", "Water and grease fires do not mix.", [
    "How do you smother a small grease fire in a pan?|Cover it with a lid|Pour water on it,Fan it with a towel",
    "Should you leave the kitchen with a pan heating?|No, stay close|Yes, it is fine,Only for an hour",
    "In PASS, the first P stands for...|Pull the pin|Pour water,Push people",
    "In PASS, you aim at the...|Base of the fire|Top of the flames,Ceiling",
    "If a fire grows quickly you should...|Get out and call for help|Fight it alone,Hide in a closet",
    "Which should be kept away from the stove?|Towels and paper|Pot lids,Metal spoons",
    "Who should you tell if you smell smoke while cooking?|An adult right away|No one,Only a pet",
    "What should you turn off for a pan fire?|The heat|The lights,The sink|🔥"]));
  a.push(L("Getting around safely", "🚌", "Buses, trains and rides with others each have their own safety habits.", "Wait for the bus or train <b>behind the line</b> and let people off first. Hold on, stay seated and keep bags out of the aisle. Only ride in a car with someone your family has approved, and always wear a <b>seat belt</b>. Tell a trusted adult where you are going.", "Plan the trip and tell an adult.", [
    "Where do you wait for a train?|Behind the safety line|On the edge of the platform,On the tracks",
    "When the bus stops, you should let who go first?|People getting off|Everyone pushing in,Nobody",
    "Whose car may you ride in?|Someone your family approved|Anyone who offers,Any friendly stranger",
    "What should you always do in a car?|Wear a seat belt|Stand up,Open the window and lean out",
    "On a moving bus you should...|Hold on or stay seated|Run in the aisle,Stand at the door",
    "Why tell an adult where you are going?|They know where to find you|To get a prize,It is a secret",
    "A stranger offers you a ride. You should...|Say no and walk away|Hop in,Ask for candy",
    "Where should bags go on public transport?|Out of the aisle|In the doorway,On the seat of a passenger"]));
  a.push(L("Sun safety", "☀️", "Sunlight feels great, but too much UV light can harm your skin and eyes.", "<b>UV rays</b> can cause sunburn and raise the risk of skin damage later. The <b>UV index</b> tells how strong the sun is: higher number means more careful. Use <b>sunscreen SPF 30 or higher</b>, wear a hat and sunglasses, find shade, and re-apply every 2 hours. UV is strong even on cloudy days.", "Cover up, shade up, slather up.", [
    "What does UV stand for?|Ultraviolet|Ultra volume,Under vision",
    "A UV index of 9 means the sun is...|Very strong|Very weak,Not shining",
    "How often should you re-apply sunscreen?|About every 2 hours|Once a month,Never",
    "Can you get sunburned on a cloudy day?|Yes, UV passes through clouds|No, never,Only in winter",
    "A good sunscreen is SPF...|30 or higher|1,Zero",
    "When is the sun usually strongest?|Around midday|At sunrise,At midnight",
    "What protects your eyes from UV?|Sunglasses|Sleeping masks,Earmuffs|😎",
    "Besides sunscreen, what else helps?|A hat and shade|A heavy coat in the summer,Bare skin"]));
  a.push(L("Burns and nosebleeds", "🩹", "Small injuries are common. Knowing first aid can help you stay calm.", "For a minor <b>burn</b>, cool the area under cool running water for 10 minutes. Do not use ice or butter. Tell an adult. For a <b>nosebleed</b>, sit up, lean slightly forward, and pinch the soft part of your nose for 10 minutes. Do not tilt your head back.", "Stay calm and get an adult.", [
    "What should you do first for a minor burn?|Cool it under running water|Cover it with butter,Rub it hard",
    "For about how long should you cool a minor burn?|10 minutes|10 seconds,2 hours",
    "For a nosebleed you should...|Lean forward and pinch your nose|Tilt your head back,Lie flat",
    "Where do you pinch for a nosebleed?|The soft part of the nose|The bridge near the eyes,The forehead",
    "Should you put ice or butter on a burn?|No|Yes, butter,Yes, ice only",
    "Who should you tell about an injury?|A trusted adult|No one,A stranger",
    "A nosebleed that does not stop after 10 minutes needs...|Help from an adult or doctor|More ignoring,Cold soda",
    "Why shouldn't you tilt your head back for a nosebleed?|Blood can run down your throat|Your nose will grow,It stops the flow instantly"]));
  a.push(L("Social media and mood", "📱", "Social apps can connect people, but they can also affect how we feel.", "Many apps have <b>age rules</b>, often 13 and older. Posts show the best moments, not real life. Scrolling for long can make people feel left out or tired. Take <b>breaks</b>, turn off alerts at night, and follow kind accounts. If something online upsets you, tell a trusted adult.", "Notice how you feel after using an app.", [
    "Why do many social apps have age rules?|To help protect younger kids|To decorate the app,To make them slower",
    "Posts usually show...|The best moments|Every boring moment,Everything honestly",
    "Scrolling a long time can make you feel...|Tired or left out|Stronger,Taller",
    "A smart habit is to...|Take breaks from screens|Never sleep,Always reply instantly",
    "If something online upsets you, you should...|Tell a trusted adult|Hide it,Argue with strangers",
    "Turning off alerts at night helps you...|Sleep better|Hear more,Grow taller",
    "Who is best to follow?|Kind, positive accounts|Accounts that tease people,Strangers who message you privately",
    "Likes tell you...|Very little about your worth|How smart you are,How healthy you are"]));
  a.push(L("FITT rule", "📈", "To get fitter safely, plan your exercise with the FITT rule.", "<b>F</b>requency: how often. <b>I</b>ntensity: how hard. <b>T</b>ime: how long. <b>T</b>ype: what kind of activity. Increase just one part at a time, a little each week, so your body can adapt and you avoid injury.", "Change one thing at a time.", [
    "In FITT, the first F stands for...|Frequency|Fat,Fitness",
    "Intensity means...|How hard you work|How long you play,How often you play",
    "Time means...|How long each session lasts|How tall you are,How hard it feels",
    "Type means...|Which kind of activity|Your blood type,Your shoes",
    "Walking 3 days a week then 4 days changes your...|Frequency|Type,Intensity",
    "Why increase only one part at a time?|It helps avoid injury|It makes you tired faster,It is a rule of math",
    "Swimming instead of running changes the...|Type|Time,Frequency",
    "Running faster for the same time changes the...|Intensity|Type,Frequency"]));
  a.push(L("Reading the % Daily Value", "🏷️", "Nutrition labels show how a serving fits into a whole day of eating.", "The <b>% Daily Value</b> tells how much of a nutrient is in one serving compared to a day. Rule of thumb: <b>5% or less is low</b>, <b>20% or more is high</b>. Choose foods high in fiber and vitamins, and lower in added sugar and sodium.", "Low is 5 or less. High is 20 or more.", [
    "A label shows 25% DV for sodium. That is...|High|Low,Zero",
    "A label shows 4% DV for added sugar. That is...|Low|High,Very high",
    "Which would you want HIGH in your food?|Fiber|Added sugar,Sodium",
    "Which would you want LOW in your food?|Added sugar|Fiber,Vitamin D",
    "% Daily Value compares one serving to...|A whole day of eating|A whole year,One meal only",
    "20% DV or more counts as...|High|Low,Negative",
    "If you eat two servings, the % DV is...|Doubled|Halved,The same",
    "Where on a package do you find the serving size?|Nutrition Facts label|The brand name,The barcode"]));
  a.push(C("Estimate max heart rate", "💓", "Max heart rate is about 220 minus your age.", "Max heart rate (beats per minute) = 220 minus age.", "Subtract.", () => {
    const age = ri(10, 14), n = pick(NM);
    return [`${n} is ${age} years old. Estimate ${n}'s maximum heart rate in beats per minute (220 minus age).`, 220 - age, "Use the rule: 220 minus age.", "Subtract the age from 220.", "Example: a 12-year-old has 220 - 12 = 208 beats per minute.", "💓"];
  }));
  a.push(C("Daily value math", "🏷️", "If one serving has some % of a nutrient, more servings add up.", "Total % = % per serving times the number of servings.", "Multiply.", () => {
    const p = pick([5, 10, 15, 20]), s = ri(2, 4), f = pick(["cereal", "crackers", "soup", "granola bars"]);
    return [`One serving of ${f} has ${p}% of your daily sodium. If you eat ${s} servings, what % of the daily value is that?`, p * s, "Think about how many servings you are eating.", "Multiply the percent in one serving by the number of servings.", "Example: 10% per serving and 3 servings is 10 x 3 = 30%.", "🏷️"];
  }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 3, 4, 6, 8, 9, 10, 12, 13, 16, 17])));
  a.push(MIX("Level 13 Challenge", pk(a, [2, 5, 7, 11, 12, 14, 15, 16, 17, 9, 10, 1])));

  // ================= LEVEL 14 =================
  const b = [];
  b.push(L("Plant protein", "🌱", "Protein builds and repairs your body. It comes from plants and animals.", "Protein sources include beans, lentils, nuts, tofu, eggs, fish, poultry and dairy. Plant foods can give all the protein you need when you eat a variety. Some people choose <b>vegetarian</b> diets (no meat). Whatever you eat, balance is the key.", "Mix up your protein sources.", [
    "Which is a plant source of protein?|Lentils|White sugar,Lemonade,Hard candy",
    "A vegetarian does not eat...|Meat|Vegetables,Fruit,Rice",
    "Which food gives protein?|Beans|Soda,Cotton candy,Ice cubes|🫘",
    "What does protein do for your body?|Builds and repairs|Wastes energy,Blocks sleep",
    "Tofu is made from...|Soybeans|Potatoes,Corn only,Rice only",
    "Nuts are a good source of protein, but some people are...|Allergic to them|Made of them,Afraid of them only",
    "Eating a variety of plant foods helps you get...|All the nutrients you need|Fewer vitamins,Nothing",
    "Which pair makes a protein-rich meal?|Rice and beans|Soda and chips,Candy and cake"]));
  b.push(L("Sharing food", "🥫", "Not everyone has enough to eat. Communities help each other.", "<b>Food insecurity</b> means not always having enough healthy food. Food banks, school meals and community gardens help. You can help by donating unexpired food, volunteering with a family member, and not wasting food. Kindness and fairness keep communities healthy.", "Small actions can help many people.", [
    "Food insecurity means...|Not always having enough food|Having too many snacks,Disliking vegetables",
    "What does a food bank do?|Collects and shares food|Sells candy,Grows no food",
    "Which helps reduce food waste?|Saving leftovers|Throwing out plates,Over-buying snacks",
    "A community garden helps people...|Grow food together|Avoid sunlight,Skip meals",
    "Before donating canned food you should check...|The expiration date|The weight of the car,The cashier's name",
    "Volunteering is best done...|With a family member's help|Alone with strangers,Secretly at night",
    "School meal programs give kids...|Healthy food at school|Free homework,Sports gear",
    "Why is kindness part of community health?|People help each other stay well|It makes noise,It costs money"]));
  b.push(L("Kitchen know-how", "🍳", "Cooking is a life skill. Learn the words and the safety steps.", "<b>Measure</b> carefully: a cup, a tablespoon, a teaspoon. <b>Simmer</b> means gentle bubbles, <b>boil</b> means rolling bubbles, <b>chop</b> means cut into pieces. Wash hands first, point pot handles inward, use oven mitts and keep raw meat away from other foods. Ask an adult before using heat or sharp tools.", "Safe habits come first.", [
    "Which must you do before cooking?|Wash your hands|Run around the kitchen,Eat the raw eggs",
    "Pot handles should point...|Inward, away from the edge|Out over the floor,Toward the crowd",
    "Gentle bubbles in a liquid is called...|Simmer|Freeze,Whisk,Chop",
    "Cut into small pieces is...|Chop|Boil,Mix,Bake",
    "What protects your hands from a hot pan?|Oven mitts|Wet paper,Bare fingers",
    "Raw meat should be kept...|Away from other foods|Mixed with salad,On the counter all day",
    "Which is a smaller measure?|Teaspoon|Cup,Gallon",
    "Before using the stove or a knife you should...|Ask an adult|Rush,Skip steps|🔪"]));
  b.push(L("White blood cells", "🛡️", "Your immune system has defenders that fight germs.", "<b>White blood cells</b> find and destroy germs. Some make <b>antibodies</b>, special proteins that attach to a specific germ. After an infection or vaccine, your body remembers the germ, so it can fight faster next time. Your skin is also a barrier that keeps germs out.", "Defenders: cells, antibodies and skin.", [
    "Which cells fight germs?|White blood cells|Red blood cells only,Bone cells",
    "What do antibodies do?|Attach to specific germs|Make you tall,Carry oxygen",
    "How do vaccines help the immune system?|Teach it to recognize a germ|Replace the skin,Turn off immunity",
    "Your skin protects you by...|Acting as a barrier to germs|Pumping blood,Making bones",
    "Red blood cells mostly carry...|Oxygen|Antibodies,Light",
    "After you recover, your immune system...|Remembers the germ|Forgets everything,Gets weaker",
    "A fever can be a sign that your body is...|Fighting an infection|Ready to sleep forever,Growing taller",
    "Which habit helps your immune system?|Sleep and good food|Skipping meals,Staying up all night"]));
  b.push(L("Staying away from harmful stuff", "🚫", "Some things are harmful to growing bodies and brains.", "Tobacco, vapes, alcohol and drugs (other than medicine from a doctor given by a parent) can harm your lungs, brain and heart. The safest choice is to <b>stay away</b>. Never take someone else's pills or drinks. If you are offered something, <b>say no, leave, and tell a trusted adult</b>.", "Say no, leave, tell an adult.", [
    "If someone offers you something harmful, you should...|Say no and tell a trusted adult|Try it quietly,Keep it a secret",
    "Medicine should only be taken...|As directed by a doctor and parent|Whenever you like,From a friend",
    "Is it safe to take someone else's pills?|No, never|Yes, if they look fine,Yes, if it's a small one",
    "Harmful substances can damage your...|Lungs, brain and heart|Shoe laces,Pencils",
    "A good way to leave a risky situation is to...|Walk away and find a trusted adult|Stay and watch,Pretend nothing happened",
    "Who counts as a trusted adult?|A parent, teacher or counselor|A random online stranger,Someone who asks you to keep secrets",
    "You are asked to keep something dangerous secret. You should...|Tell a trusted adult|Keep it secret,Join in",
    "Which is a healthy way to feel good?|Exercise and time with friends|Trying harmful things,Staying up all night"]));
  b.push(L("Middle school skills", "🎒", "Moving to a new school brings new rooms, teachers and routines.", "Use a <b>planner</b> to track classes and homework. Pack your bag the night before. Break big tasks into small steps. Ask a teacher, counselor or friend for help if you feel lost. Feeling nervous is normal, and a few weeks of routine often helps.", "Plan ahead and ask for help.", [
    "A planner helps you...|Track homework and classes|Hide assignments,Skip school",
    "Packing your bag the night before helps you...|Feel prepared|Stay up late,Be tired",
    "Big projects are easier when you...|Break them into small steps|Wait until the last minute,Skip the middle",
    "If you feel lost at a new school you can...|Ask a teacher or counselor|Hide in the hallway,Say nothing",
    "Feeling nervous about a big change is...|Normal|A bad sign always,Wrong",
    "A good routine helps your...|Body and mind feel steady|Shoes squeak,Backpack shrink",
    "Which tool helps you remember due dates?|A calendar or planner|A pillow,A soda",
    "Making a new friend can start with...|Smiling and saying hello|Teasing,Ignoring them"]));
  b.push(L("Study habits", "📚", "Healthy study habits help you learn without burning out.", "Study in short blocks with <b>breaks</b> (for example 25 minutes, then 5 minutes). Keep a tidy, quiet space. Do the hardest task first while your mind is fresh. Sleep helps memory, so avoid cramming all night. Water and snacks help too.", "Work, rest, repeat.", [
    "A good study pattern is...|Work in short blocks with breaks|Study 8 hours without stopping,Never study",
    "Which helps memory the most?|Enough sleep|Staying up all night,Skipping lunch",
    "A good study space is...|Tidy and quiet|Loud and messy,Crowded with screens",
    "When should you do the hardest task?|When your mind is fresh|Last when you're tired,Never",
    "Cramming all night before a test usually...|Makes learning harder|Is best,Makes you taller",
    "A short break can help you...|Recharge your focus|Forget everything,Fall behind",
    "Which snack is good during study?|Fruit and water|Giant soda,Whole bag of candy",
    "If you do not understand something you should...|Ask for help|Pretend,Quit"]));
  b.push(L("Group chats", "💬", "Group chats are fun, but tone and kindness are harder to read in text.", "Words in text can feel different than face to face because you can't see a face or hear a voice. Think before you send. Don't share private info about others. If a chat turns mean, <b>leave, save the messages, and tell a trusted adult</b>. Don't spread rumors.", "Send only what is kind and true.", [
    "Why is tone hard to read in text?|You can't see faces or hear voices|Text is always kind,It is too colorful",
    "Before sending a message you should...|Think about how it feels to read|Send fast,Add insults",
    "If a group chat turns mean, you can...|Leave and tell a trusted adult|Join in,Delete your phone's battery",
    "Should you share someone else's private info?|No|Yes, if it's funny,Only if no one sees",
    "A rumor spreads by...|Passing it on|Ignoring it,Telling the truth only",
    "Screenshots of mean messages can help you...|Show a trusted adult|Embarrass the sender publicly,Get more likes",
    "A kind message...|Helps others feel good|Starts fights,Hurts feelings",
    "Using ALL CAPS may seem like...|Shouting|Whispering,Laughing"]));
  b.push(L("Strong passwords", "🔑", "Passwords and two-step checks keep your accounts safe.", "A strong password is long and uses a mix of words, numbers and symbols. Do not reuse passwords or share them with friends. <b>Two-step verification</b> asks for a code in addition to your password. Share passwords only with a parent. Never tell your password to anyone who asks online.", "Long, unique and secret.", [
    "A strong password is...|Long and mixed|Your name,1234",
    "Who can you share passwords with?|A parent or guardian|Any friend,A stranger online",
    "Reusing the same password everywhere is...|Risky|Smart,Required",
    "Two-step verification adds...|A code or extra check|A second face,A second password for friends",
    "A message asks for your password. You should...|Not give it and tell an adult|Send it right away,Post it",
    "Which password is stronger?|Tr33-Bus-Moon-8|password,mia2012",
    "Where should passwords NOT be written?|Public places like a shared board|A safe place at home,A password manager approved by a parent",
    "A pop-up says your account is locked and asks for your password. It may be...|A scam|A prize,A friend"]));
  b.push(L("Falls and trips", "🪜", "Falls are a common cause of injuries at home. Prevent them.", "Keep floors clear of toys, cords and spills. Use a stable step stool instead of chairs. Wear shoes with grip. Use handrails on stairs and never run on them. Use ladders only with an adult and keep three points of contact. Good lighting helps too.", "Clear the path, climb carefully.", [
    "Which is safer to reach high shelves?|A stable step stool|A rolling chair,Stacked books",
    "What should you do with a spill on the floor?|Clean it up or warn others|Leave it,Walk over it",
    "On stairs you should...|Use the handrail|Run,Slide down",
    "Toys on the floor can cause...|Trips|Warm weather,Lunch",
    "A ladder should be used...|With an adult's help|Alone on a high roof,While running",
    "Good lighting helps prevent...|Falls|Smiles,Thirst",
    "Shoes for activity should have...|Good grip|Slippery soles,Wet laces",
    "A cord across the room can...|Cause a trip|Make music,Cool the room"]));
  b.push(L("Hiking and camping", "⛺", "Outdoor adventures are fun with a safety plan.", "Tell someone your route and return time. Bring <b>water, snacks, a map, a whistle, sunscreen and a first-aid kit</b>. Stay on the trail and stay with your group. If lost, stay put and blow your whistle in groups of three. Never eat wild plants or berries unless an adult confirms they are safe.", "Plan, pack, stay together.", [
    "If you get lost while hiking you should...|Stay put and use a whistle|Wander into the woods,Hide",
    "Before a hike you should...|Tell someone your route|Keep it secret,Skip packing",
    "Which item helps you signal for help?|Whistle|Pillow,Plastic fork",
    "You should hike...|With your group on the trail|Alone off the trail,At night with no light",
    "Wild berries should be eaten only if...|An adult confirms they are safe|They look pretty,They taste sweet",
    "Which is a must-pack item?|Water|A big speaker,Extra chips only",
    "Three whistle blasts is a signal for...|Help|A game,A snack",
    "A first-aid kit helps with...|Small injuries|Rain,Flat tires"]));
  b.push(L("Strength training basics", "🏋️", "Strength activities build muscles and bones when done safely.", "Kids can build strength with <b>body-weight</b> exercises like push-ups, squats and planks. Use good form, start with light effort, and rest between sets. Have an adult guide any weights. Never hold your breath. Stop if something hurts sharply.", "Form first, weight later.", [
    "Which is a body-weight exercise?|Push-up|Reading,Sleeping",
    "What should come first in strength training?|Good form|Heaviest weight,Showing off",
    "Should kids lift heavy weights without a trained adult?|No|Yes, always,Only on weekends",
    "If an exercise causes sharp pain you should...|Stop and tell an adult|Push harder,Ignore it",
    "Between sets, you should...|Rest|Run in circles,Hold your breath",
    "Squats work mostly your...|Legs|Ears,Eyes",
    "Planks help build your...|Core|Fingernails,Hair",
    "While exercising, breathing should be...|Steady|Held tight,Skipped"]));
  b.push(L("Activities for life", "🚴", "The best activity is one you enjoy and can do for many years.", "<b>Lifetime activities</b> like walking, swimming, cycling, hiking, dancing and yoga can be done at any age. Team sports build teamwork, and individual sports build self-discipline. Try several to find what you love. Being active with friends or family makes it fun.", "Find your fun and keep moving.", [
    "Which is a lifetime activity?|Swimming|Counting stairs only,Standing still",
    "Dancing is a good form of...|Aerobic exercise|Sleeping,Reading",
    "Team sports help build...|Teamwork|Silence,Loneliness",
    "Why try different activities?|To find what you enjoy|To avoid exercise,To waste time",
    "Walking can be done...|At any age|Only as a kid,Only in gyms",
    "Being active with others can make it...|More fun|Boring,Impossible",
    "Which builds flexibility?|Yoga|Sitting,Napping",
    "Cycling needs which safety item?|Helmet|Umbrella,Pillow|🚴"]));
  b.push(L("Personal space and respect", "🤝", "Everyone has a right to feel comfortable around others.", "<b>Personal space</b> is the area around your body. Different people feel comfortable with different amounts. Always ask before hugging or touching, and respect a \"no\". If someone makes you uncomfortable, say stop, leave, and <b>tell a trusted adult</b>. You are never in trouble for telling.", "Ask first, respect no.", [
    "Personal space is...|The area around your body|A faraway planet,A game",
    "Before a hug you should...|Ask if they want one|Grab them,Assume yes",
    "If someone says no to a high five, you should...|Respect it|Do it anyway,Laugh at them",
    "If you feel uncomfortable around someone, you can...|Say stop, leave, tell a trusted adult|Keep it secret,Stay quiet",
    "Are you in trouble for telling a trusted adult?|No, never|Yes, always,Only sometimes",
    "Do all people like the same amount of space?|No|Yes,Only kids do",
    "Respecting boundaries shows...|Kindness|Meanness,Silliness",
    "Who is a trusted adult?|Parent, teacher or counselor|A stranger,A person who says keep secrets"]));
  b.push(L("Healthy friendships", "🧑‍🤝‍🧑", "Good friends make you feel safe and respected.", "A healthy friend is kind, honest, listens and respects your \"no\". They celebrate your wins and apologize when wrong. Unhealthy signs: pressure, put-downs, excluding you, or making you feel afraid. You can change or end a friendship that hurts.", "Friends should lift you up.", [
    "A healthy friend...|Listens and respects you|Pressures you,Makes fun of you",
    "Which is a sign of an unhealthy friendship?|Constant put-downs|Sharing and laughing,Being honest",
    "A good friend apologizes when...|They hurt you|Never,Only when caught",
    "If a friend makes you feel afraid you should...|Tell a trusted adult|Keep quiet,Act brave alone",
    "Celebrating a friend's win shows...|Support|Jealousy,Rudeness",
    "A friend who respects your \"no\"...|Is healthy|Is unhealthy,Doesn't care",
    "Excluding someone on purpose is...|Unkind|Fair,Helpful",
    "You may need to ... a friendship that keeps hurting you.|Step away from|Never leave,Hide"]));
  b.push(L("Braces and mouth care", "😁", "Some kids get braces or retainers to line up their teeth. They need extra care.", "<b>Braces</b> gently move teeth into place over time. Brush after meals and use a small brush or floss threader around the wires. Avoid very sticky or hard foods that can bend wires. Wear a <b>retainer</b> as your orthodontist says. See the dentist regularly.", "Clean around the hardware every day.", [
    "What do braces do?|Move teeth into better positions|Whiten teeth instantly,Replace teeth",
    "A retainer helps to...|Keep teeth in place|Remove cavities,Grow teeth",
    "Which food is best avoided with braces?|Sticky caramel|Soft banana,Yogurt",
    "When should you brush with braces?|After meals|Never,Once a month",
    "What tool helps clean between wires?|A small interdental brush|A butter knife,A pencil",
    "A dentist who straightens teeth is an...|Orthodontist|Optometrist,Oculist",
    "If a wire pokes your cheek you should...|Tell an adult so it can be fixed|Bend it yourself with pliers,Ignore it forever",
    "Regular dentist visits help catch...|Problems early|Nothing,Only jokes"]));
  b.push(C("Scale the recipe", "🥣", "Recipes can be made bigger or smaller by multiplying the amounts.", "Multiply each amount by how many batches you want.", "Multiply.", () => {
    const x = pick([2, 3, 4]), batches = ri(2, 4), n = pick(NM), f = pick(["flour", "oats", "rice", "milk"]);
    return [`${n}'s recipe uses ${x} cups of ${f}. ${n} wants to make ${batches} batches. How many cups of ${f} are needed in all?`, x * batches, "Think about how many batches there are.", "Multiply the cups per batch by the number of batches.", "Example: 3 cups per batch and 2 batches need 3 x 2 = 6 cups.", "🥣"];
  }));
  b.push(C("Hours left in the day", "🕒", "Planning a day means adding up your activities and finding what is left.", "Add the hours used, then subtract from the total hours.", "Add, then subtract.", () => {
    const sch = ri(6, 8), sl = ri(9, 10), act = ri(1, 3), n = pick(NM);
    return [`${n} spends ${sch} hours at school, ${sl} hours sleeping and ${act} hours being active. How many hours are left in the 24-hour day?`, 24 - sch - sl - act, "First find the total hours already planned.", "Add the three numbers, then subtract the total from 24.", "Example: 7 + 9 + 2 = 18. Then 24 - 18 = 6 hours left.", "🕒"];
  }));
  b.push(MIX("Mixed practice", pk(b, [0, 1, 3, 4, 6, 8, 9, 10, 11, 12, 16, 17])));
  b.push(MIX("Level 14 Challenge", pk(b, [2, 5, 7, 13, 14, 15, 16, 17, 9, 10, 11, 12])));

  // ================= LEVEL 15 =================
  const c = [];
  c.push(L("Energy density", "⚡", "Foods differ in how much energy (calories) they pack per bite.", "Carbs and protein give about <b>4 calories per gram</b>, and fat gives about <b>9 calories per gram</b>. Foods with lots of water and fiber, like fruits and vegetables, have <b>low energy density</b>. Fried and sugary foods have high energy density. A balance of both is healthy.", "Fat has the most calories per gram.", [
    "How many calories per gram does fat give?|About 9|About 1,About 4,About 20",
    "How many calories per gram do carbs give?|About 4|About 9,About 0",
    "Which nutrient has the most calories per gram?|Fat|Protein,Carbohydrate",
    "A food with lots of water and fiber has...|Low energy density|High energy density,No nutrients",
    "Which is lower in energy density?|An apple|A deep-fried snack,Candy bar",
    "Which pair gives about the same calories per gram?|Carbs and protein|Fat and carbs,Fat and protein",
    "Calories measure...|Energy in food|Weight of food,Color of food",
    "Which food is high in energy density?|Nuts|Cucumber,Watermelon"]));
  c.push(L("Fitness tests", "🏅", "Fitness tests show how your body is doing and where to improve.", "The five parts of fitness: <b>aerobic endurance</b>, <b>muscular strength</b>, <b>muscular endurance</b>, <b>flexibility</b> and <b>body composition</b>. Tests like a timed mile, push-ups, sit-and-reach test each part. Compare yourself with your own past scores, not with others.", "Beat your own best.", [
    "A timed mile run tests...|Aerobic endurance|Flexibility,Muscular strength only",
    "The sit-and-reach test measures...|Flexibility|Speed,Aerobic endurance",
    "Push-ups test...|Muscular strength and endurance|Flexibility,Balance only",
    "How many parts of fitness are listed?|Five|Two,Ten,Eight",
    "Who should you compare your fitness scores with?|Your own past scores|Everyone in the school,Pro athletes",
    "Muscular endurance means...|Using muscles for a long time|Lifting once,Being flexible",
    "Why do fitness tests help?|They show goals to work on|They decide who is better,They are a punishment",
    "Which is a part of fitness?|Body composition|Hair color,Shoe size"]));
  c.push(L("Cause or coincidence", "🔬", "Health news can be confusing. Learn to read claims carefully.", "<b>Correlation</b> means two things happen together. <b>Causation</b> means one makes the other happen. Ice cream sales and sunburns both rise in summer, but ice cream does not cause sunburns: heat and sunshine do. Look for <b>experiments</b>, <b>large groups</b> and <b>repeated results</b>.", "Together does not mean caused.", [
    "Correlation means two things...|Happen together|Are always the same,Never happen",
    "Does ice cream cause sunburn?|No, sunshine and heat are the reason|Yes, it melts onto the skin,Only vanilla does",
    "Causation means one thing...|Makes the other happen|Sits next to it,Looks like it",
    "A strong study uses...|Many people|One person,Just one story",
    "Repeating an experiment with the same result shows...|The result is more reliable|Nothing,A mistake",
    "A friend says a food cured their cold. This is one...|Story, not proof|Large experiment,Law of nature",
    "Which is the best source for health facts?|A trusted health organization|A rumor on social media,An ad",
    "Before believing a claim, you should...|Check the evidence|Share it,Ignore all science"]));
  c.push(L("Supplements and fads", "💊", "Many ads promise quick fixes. Real health takes steady habits.", "A <b>fad diet</b> promises fast results but is hard to keep and may lack nutrients. <b>Supplements</b> (pills, powders) do not replace real food, and some can be harmful for kids. Kids should only take supplements if a doctor says so. A balanced plate, activity and sleep are the real keys.", "If it sounds too good to be true, it probably is.", [
    "A fad diet usually...|Promises quick results|Is balanced,Lasts for years",
    "Supplements can replace healthy meals.|False|True,Only for kids",
    "Who should decide if a kid takes a supplement?|A doctor|An influencer,A friend",
    "An ad promises you will lose weight in a week. This is probably...|A trick|Reliable science,A law",
    "What are the real keys to health?|Balanced food, activity and sleep|Magic pills,Skipping meals",
    "Why can fad diets be harmful?|They may lack important nutrients|They add too many vitamins,They are free",
    "Energy drinks and powders for kids are...|Not recommended|Required,A great snack",
    "Who might sell a supplement to make money?|An advertiser|A librarian,Your shadow"]));
  c.push(L("Antibiotics", "🧫", "Antibiotics are strong medicines, but they only work on certain germs.", "<b>Antibiotics</b> kill or stop <b>bacteria</b>. They do not work on <b>viruses</b>, like colds and flu. Only take them when a doctor prescribes them, and finish the whole course. Misuse helps bacteria become <b>resistant</b>, which makes infections harder to treat.", "Right medicine, right germ.", [
    "Antibiotics work against...|Bacteria|Viruses,Both always",
    "Do antibiotics treat a cold?|No, a cold is caused by a virus|Yes, always,Only for kids",
    "Who decides if you need antibiotics?|A doctor|A friend,An ad",
    "Antibiotic resistance means...|Bacteria no longer die from the medicine|Medicine gets stronger,Bacteria disappear",
    "Misusing antibiotics can make bacteria...|Resistant|Weaker,Happy",
    "If a doctor prescribes antibiotics you should...|Finish the whole course|Stop when you feel okay,Share them",
    "Which germ causes the flu?|A virus|Bacteria,Mold",
    "Sharing antibiotics with a sibling is...|Unsafe|Smart,Kind"]));
  c.push(L("Outbreak words", "🌍", "Health helpers use special words to describe how diseases spread.", "An <b>outbreak</b> is a sudden rise in cases in one place. An <b>epidemic</b> is a larger rise across a region. A <b>pandemic</b> spreads across many countries. <b>Herd immunity</b> happens when enough people are protected (often by vaccines) that a disease spreads less, protecting even those who can't be vaccinated.", "Words grow in size: outbreak, epidemic, pandemic.", [
    "A disease spreading across many countries is a...|Pandemic|Outbreak,Hobby",
    "A sudden rise of cases in a small place is an...|Outbreak|Pandemic,Immunity",
    "Herd immunity happens when...|Enough people are protected|Everyone is sick,No one is vaccinated",
    "Vaccines help create...|Protection for the community|More germs,Fewer doctors",
    "Who is protected by herd immunity besides the vaccinated?|People who cannot be vaccinated|No one,Only adults",
    "Which is bigger in scale?|Pandemic|Outbreak,A sneeze",
    "Washing hands and staying home when sick help...|Slow the spread|Spread germs,Make a cold stronger",
    "Who tracks diseases for public health?|Health departments|Game designers,Pet shops"]));
  c.push(L("Mental health facts", "💬", "Mental health is part of overall health, just like physical health.", "Everyone has mental health. Feeling sad or worried sometimes is normal. If feelings last for weeks or make daily life hard, help from a counselor or doctor can make a difference. <b>Asking for help is a sign of strength.</b> Mental health conditions are not anyone's fault, and people can recover.", "Talking helps.", [
    "Who has mental health?|Everyone|Only adults,Only some people",
    "Asking for help is...|A sign of strength|A weakness,Embarrassing",
    "Is it normal to feel sad sometimes?|Yes|No,Only in winter",
    "If hard feelings last for weeks you should...|Talk to a trusted adult|Hide it,Ignore it forever",
    "Are mental health conditions anyone's fault?|No|Yes,Only kids'",
    "Who can support mental health?|Counselors and doctors|Pop-up ads,Random strangers online",
    "Treating mental health is as important as treating...|A broken bone|A pencil,A toy",
    "People who struggle with feelings can often...|Get better with support|Never improve,Stay silent"]));
  c.push(L("Emotional intelligence", "🎭", "Emotional intelligence means understanding feelings in yourself and others.", "Four skills: <b>self-awareness</b> (knowing what you feel), <b>self-management</b> (handling feelings well), <b>social awareness</b> (noticing how others feel), and <b>relationship skills</b> (communicating and cooperating). You can practice these every day.", "Notice, name, then choose your response.", [
    "Knowing what you are feeling is...|Self-awareness|Self-management,Social awareness",
    "Using a deep breath when angry is...|Self-management|Self-awareness,A game",
    "Noticing a friend looks sad is...|Social awareness|Self-management,A guess",
    "Cooperating and communicating well is...|Relationship skills|Self-awareness,Social awareness",
    "Naming a feeling helps you...|Understand and handle it|Make it stronger,Hide it",
    "Which shows empathy?|Asking a sad friend if they're okay|Ignoring them,Laughing",
    "Is emotional intelligence something you can practice?|Yes|No,Only adults",
    "How many EI skills are listed here?|Four|One,Nine,Twenty"]));
  c.push(L("Memory and learning", "🧩", "Your brain learns best with the right habits.", "<b>Sleep</b> locks memories in. <b>Spaced practice</b> (a little each day) beats cramming. <b>Testing yourself</b> helps more than rereading. Teaching someone else also helps. Exercise and water keep your brain alert. Multitasking makes learning worse.", "Little and often, and test yourself.", [
    "Spaced practice means...|A little each day|All at once,Never",
    "Which helps learning more than rereading?|Testing yourself|Staring at the page,Skipping",
    "Sleep helps your brain...|Lock in memories|Forget them,Stop",
    "Teaching a friend what you learned...|Helps you remember|Makes you forget,Is cheating",
    "Does multitasking help learning?|No, it makes it worse|Yes, a lot,Only a little",
    "Exercise helps your brain by...|Sending more blood and oxygen|Making you sleepy,Blocking memory",
    "Cramming all night is...|Less effective than spaced practice|Best,Required",
    "Which is a good study habit?|Quizzing yourself|Scrolling your phone while studying,Studying with the TV on"]));
  c.push(L("Making big decisions", "🧭", "A step-by-step plan helps you decide well, especially when it is hard.", "Use steps: <b>Identify</b> the problem, <b>list</b> choices, <b>think about consequences</b> for you and others, check your <b>values</b> and safety, <b>choose</b>, then <b>review</b> how it went. A good choice is safe, legal, respectful and follows family rules.", "Stop, think, choose, review.", [
    "What is the first step in decision making?|Identify the problem|Pick fast,Blame someone",
    "Before choosing, you should think about...|Consequences|Only fun,Nothing",
    "A good choice is...|Safe and respectful|Quick and rude,Secret and risky",
    "After deciding, a good last step is to...|Review how it went|Forget it,Argue",
    "Values are...|What matters most to you|A kind of snack,Your age",
    "If a choice is unsafe you should...|Choose another option|Do it anyway,Hide it",
    "Who can help you make big choices?|A trusted adult|A random pop-up,A stranger",
    "Listing options helps you...|See more ways to solve it|Avoid thinking,Panic"]));
  c.push(L("Credit and copying", "©️", "Using other people's work fairly is part of being a good digital citizen.", "Music, pictures, stories and videos belong to their creators. <b>Plagiarism</b> is presenting someone else's work as yours. Give <b>credit</b> by naming the source. Some work is free to use with credit. Text or pictures made by <b>AI tools</b> should be labeled and checked, since they can contain mistakes.", "Give credit and check facts.", [
    "Presenting someone else's work as yours is...|Plagiarism|Research,Teamwork",
    "How do you give credit?|Name the source|Hide the source,Change the font",
    "AI-written text can contain...|Mistakes|Only perfect facts,Nothing",
    "You should label AI-made work as...|AI-made|Hand-drawn,Secret",
    "Pictures online belong to...|Their creators|Everyone,Nobody",
    "Which is fair?|Using a quote and naming the source|Copying a whole essay,Copying a friend's homework",
    "Why check AI answers?|They can be wrong|They are always right,They hurt",
    "Copying a song to sell it without permission is...|Not allowed|Fine,Required"]));
  c.push(L("Location and data", "📍", "Apps and websites collect data. You can limit what you share.", "Apps may collect your <b>location</b>, contacts and habits. Turn off location sharing in posts and photos unless needed. Review <b>app permissions</b> with a parent and delete apps you don't use. Never post your address, school or schedule publicly.", "Share less, ask a parent.", [
    "Which should you NOT post publicly?|Your address and schedule|A drawing you made,A book you like",
    "App permissions let you control...|What an app can access|App colors,Game levels",
    "Location tags on photos can reveal...|Where you are|Your lunch,Your grade",
    "Who should help review app permissions?|A parent|A stranger,A pop-up",
    "An unused app should be...|Deleted|Left forever with all permissions,Shared",
    "Why limit data sharing?|It protects your privacy|It costs money,It is required",
    "A game asks for your contacts. You should...|Ask a parent before saying yes|Say yes right away,Ignore the question",
    "Where is it safest to share personal info?|Only with trusted people offline or with a parent|On any public page,In a comment"]));
  c.push(L("Calling for help", "📞", "Knowing how to call for help can save a life.", "Call your local <b>emergency number</b> (911 in the United States). Stay calm and say <b>where you are</b>, <b>what happened</b>, and <b>who needs help</b>. Answer the dispatcher's questions and don't hang up until told. Calling for a false alarm is wrong, but if you are unsure, it is better to call.", "Place, problem, people.", [
    "What number is the emergency number in the United States?|911|411,999 only,311",
    "What should you tell the dispatcher first?|Where you are|Your favorite color,Joke",
    "You should stay on the line until...|The dispatcher says you can hang up|You are bored,A friend calls",
    "Is it okay to call 911 as a prank?|No, never|Yes,Only on weekends",
    "If you are unsure whether it's an emergency, it's best to...|Call or ask an adult|Wait,Hide",
    "Which is something to describe?|What happened|The weather on Mars,Your homework",
    "Should you stay calm when calling?|Yes, speak clearly|No, shout,Whisper",
    "Who needs help is something to...|Tell the dispatcher|Hide,Forget"]));
  c.push(L("Distracted travel", "🚦", "Distractions are dangerous for walkers, riders and drivers.", "Phones and headphones can hide traffic sounds. <b>Look up</b>, stop, look both ways, and cross at crossings. <b>Distracted driving</b> causes many crashes, so never distract a driver. Always wear a seat belt, and sit in the back seat until you're old enough for the front, following local rules.", "Eyes up, ears open.", [
    "Why remove headphones when crossing the street?|You can hear traffic|It is fashionable,It makes music louder",
    "Looking at a phone while crossing is...|Dangerous|Safe,Required",
    "A good rule before crossing is...|Stop and look both ways|Run,Close your eyes",
    "Distracted driving means the driver is...|Not focusing on the road|Wearing a seat belt,Driving slowly",
    "You should never...|Distract a driver|Wear a seat belt,Sit in the back",
    "Where do you cross the road?|At a crossing|Between parked cars,In the middle",
    "Younger kids are safest in the...|Back seat|Trunk,Driver's lap",
    "A seat belt helps in a crash by...|Holding you safely in the seat|Making the car faster,Doing nothing"]));
  c.push(L("Public health", "🏥", "Public health keeps whole communities healthy, not only single people.", "Public health includes <b>clean water systems</b>, <b>sewage treatment</b>, <b>vaccination programs</b>, <b>food inspections</b>, and laws like seat belt and helmet rules. These steps prevent illness and injury for everyone. Health workers also teach about nutrition, safety and disease prevention.", "Prevention helps everyone.", [
    "Which is a public health measure?|Clean water systems|Candy shops,Playgrounds only",
    "Seat belt laws aim to...|Prevent injuries|Slow cars forever,Make roads colorful",
    "Food inspections help ensure...|Food is safe|Food is expensive,Food is salty",
    "Vaccination programs help...|Protect the whole community|Spread diseases,Close schools",
    "Sewage treatment helps keep...|Water and people healthy|Cars shiny,Parks loud",
    "Public health focuses on...|Whole communities|Only one person,Only athletes",
    "Who might do public health work?|A health inspector|A game character,A pet",
    "Prevention means...|Stopping problems before they start|Waiting until it hurts,Ignoring"]));
  c.push(L("Blood pressure", "🩺", "Your heart pushes blood through vessels. The force is called blood pressure.", "<b>Blood pressure</b> is the force of blood pushing on artery walls. High blood pressure strains the heart over time. <b>Cholesterol</b> is a fatty substance; too much \"bad\" LDL can clog arteries. Active lifestyles, healthy fats, fiber and low salt help protect the heart. Doctors check blood pressure with a cuff.", "Protect your heart early.", [
    "Blood pressure is the force of blood on...|Artery walls|Skin,Lungs",
    "What device checks blood pressure?|A cuff|A ruler,A thermometer",
    "Too much bad cholesterol can...|Clog arteries|Strengthen bones,Improve eyesight",
    "Which habit helps protect your heart?|Regular exercise|Never moving,Large amounts of salt",
    "Which food helps heart health?|Oats and vegetables|Deep-fried snacks,Sugary soda",
    "High blood pressure over time can...|Strain the heart|Cure colds,Grow hair",
    "Cholesterol is a...|Fatty substance|Mineral rock,Virus",
    "Who measures blood pressure?|A doctor or nurse|A librarian,A baker"]));
  c.push(C("Target heart rate", "🎯", "A common moderate-effort target is about half of your maximum heart rate.", "Max heart rate = 220 - age. Half of max = max divided by 2.", "Subtract, then divide by two.", () => {
    const age = pick([10, 12, 14]), n = pick(NM);
    return [`${n} is ${age}. Max heart rate is 220 minus age. What is half of ${n}'s max heart rate (50%)?`, (220 - age) / 2, "First find max heart rate.", "Subtract the age from 220, then divide the result by 2.", "Example: age 16 gives 220 - 16 = 204. Half of 204 is 102.", "🎯"];
  }));
  c.push(C("Water plan", "💧", "A daily plan helps you drink enough water.", "Total = bottles x size of each bottle.", "Multiply.", () => {
    const k = ri(3, 6), ml = pick([250, 400, 500]), n = pick(NM);
    return [`${n} drinks ${k} bottles of water a day. Each bottle holds ${ml} milliliters. How many milliliters is that in total?`, k * ml, "Think about how many bottles there are and how much each holds.", "Multiply the number of bottles by the milliliters in each bottle.", "Example: 4 bottles of 500 ml is 4 x 500 = 2000 ml.", "💧"];
  }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 4, 5, 6, 8, 10, 12, 14, 15, 16, 17])));
  c.push(MIX("Level 15 Challenge", pk(c, [2, 3, 7, 9, 11, 13, 14, 15, 16, 17, 6, 1])));

  Object.assign(HEALTH_LEVELS, { 13: a, 14: b, 15: c });
})();
