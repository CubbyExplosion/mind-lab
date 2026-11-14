// ext/health-16-18.js  Health & Safety levels 16-18
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

  // ================= LEVEL 16 =================
  const a = [];
  a.push(L("Parts of the brain", "🧠", "Your brain has parts, and each part has a different job.", "The <b>cerebrum</b> is the biggest part. It handles thinking, memory, senses and choosing to move. The <b>cerebellum</b> helps balance and smooth movement. The <b>brain stem</b> keeps automatic jobs going, like breathing and heartbeat. The <b>spinal cord</b> carries messages between the brain and body.", "Ask yourself: is the job thinking, balance, or something automatic?", [
    "Which part of the brain keeps your balance and smooth movement?|Cerebellum|Cerebrum,Brain stem,Spinal cord",
    "Which part controls automatic jobs like breathing?|Brain stem|Cerebrum,Cerebellum,Stomach",
    "Which is the largest part of the brain?|Cerebrum|Cerebellum,Brain stem,Spinal cord",
    "Riding a bike without wobbling mostly uses the...|Cerebellum|Brain stem,Tonsils,Skull",
    "What carries messages between your brain and your body?|Spinal cord|Skull,Lung,Cerebellum",
    "Solving a puzzle and remembering names mostly uses the...|Cerebrum|Brain stem,Cerebellum,Spinal cord",
    "What protects the brain from bumps?|Skull|Skin only,Hair only,Ribs",
    "The cells that send messages in the brain are called...|Neurons|Platelets,Tonsils,Alveoli"]));
  a.push(L("Glands and adrenaline", "🦋", "Glands make hormones, which are chemical messengers carried in your blood.", "The <b>thyroid</b> gland in your neck helps control how fast your body uses energy. The <b>adrenal glands</b>, on top of your kidneys, make <b>adrenaline</b> when you are excited or scared. The <b>pituitary</b> gland in the brain is called the master gland because it signals other glands.", "Match each gland to its place and its job.", [
    "Which gland in your neck helps control how fast your body uses energy?|Thyroid|Pituitary,Adrenal,Salivary",
    "Which hormone speeds up your heart when you are scared or excited?|Adrenaline|Insulin,Melatonin,Bile",
    "The adrenal glands sit on top of the...|Kidneys|Lungs,Knees,Eyes",
    "Which gland is called the master gland?|Pituitary|Thyroid,Adrenal,Tonsil",
    "Hormones travel through the body in the...|Blood|Hair,Nails,Teeth",
    "Where is the pituitary gland?|In the brain|In the foot,In the elbow,In the nose",
    "Hormones are best described as...|Chemical messengers|Tiny muscles,Kinds of bone,Types of food",
    "Which hormone helps you feel sleepy at night?|Melatonin|Adrenaline,Insulin,Bile"]));
  a.push(L("How wounds heal", "🩹", "Your body has a clever repair crew for cuts and scrapes.", "When you get a cut, <b>platelets</b> in your blood stick together to form a <b>clot</b>, which dries into a <b>scab</b>. White blood cells fight germs. Redness and swelling are part of healing. Keep a wound clean and covered. Tell an adult about deep cuts or a wound that gets more red, hot or sore.", "Think about what the body does first, and what an adult should check.", [
    "Which blood parts stick together to form a clot?|Platelets|Neurons,Bile,Alveoli",
    "A scab is made from...|A dried blood clot|Extra skin cream,A bandage,Sweat",
    "Why is a wound washed with clean water and soap?|To remove dirt and germs|To make it bleed more,To make a scab bigger",
    "Some redness and swelling around a small cut are...|A normal part of healing|A sign of magic,Never real",
    "Which wound needs an adult right away?|A deep cut that keeps bleeding|A tiny scratch,A dry scab,A fading bruise",
    "Should you pick at a scab?|No, let it fall off on its own|Yes, as soon as you can,Yes, with dirty hands",
    "A wound that gets more red, hot and sore may be...|Infected, so tell an adult|Healing perfectly,Finished healing",
    "A covering that keeps a clean wound safe is a...|Bandage|Sunscreen,Ice cube,Marker"]));
  a.push(L("Bone growth and breaks", "🦴", "Kids' bones are still growing, and they are great at healing.", "Long bones grow at the <b>growth plates</b>, soft areas near the ends of the bones. A <b>fracture</b> is a broken bone. A doctor may use an <b>X-ray</b> to see it, and a cast holds it still while it heals. <b>Calcium</b>, vitamin D and weight-bearing exercise like running help build strong bones.", "Think about what helps bones grow and how doctors check them.", [
    "A fracture is...|A broken bone|A stretched muscle,A bruise on skin,A sore throat",
    "What do doctors use to see inside a bone?|X-ray|Thermometer,Ruler,Microphone",
    "Where do long bones in kids grow?|Growth plates|Fingernails,Skin,Eyes",
    "A cast helps a broken bone by...|Holding it still while it heals|Making it grow faster,Making it softer",
    "Which mineral helps build strong bones?|Calcium|Sodium,Iodine,Zinc",
    "Which activity helps make bones stronger?|Running and jumping|Lying still all day,Skipping meals,Watching videos nonstop",
    "Which vitamin helps your body use calcium?|Vitamin D|Vitamin C,Vitamin B12,Vitamin E",
    "If you think you broke a bone you should...|Keep it still and tell an adult|Walk on it harder,Hide it,Keep playing"]));
  a.push(L("The lymph system", "🛡️", "Besides blood, your body has another network that helps fight germs.", "The <b>lymph system</b> carries a clear fluid called lymph and holds white blood cells. <b>Lymph nodes</b> are small bean shapes that filter germs, and they can swell when you are sick. The <b>tonsils</b> and <b>spleen</b> are also part of it. It helps your immune system and drains extra fluid.", "Think about germs, filters and the immune system.", [
    "What do lymph nodes do?|Filter germs|Make bile,Pump blood,Digest food",
    "Why might lumps in your neck feel swollen when you are sick?|Lymph nodes are fighting germs|Your bones are growing,Your hair is growing",
    "Which of these is part of the lymph system?|Tonsils|Cerebellum,Stomach,Kidney",
    "Lymph is a...|Clear fluid|Solid bone,Kind of vitamin,Kind of hair",
    "Which cells live in the lymph system?|White blood cells|Hair cells,Bone cells,Fat cells",
    "The lymph system mainly helps the...|Immune system|Skeletal system,Hearing,Eyesight",
    "Which organ in the upper left belly helps filter blood and fight germs?|Spleen|Appendix,Bladder,Pancreas",
    "Swollen glands that stay for a long time should be checked by...|A doctor|A friend only,Nobody,A pet"]));
  a.push(L("Blood sugar and energy", "🍞", "Some foods give quick energy and others give steady energy.", "Foods with lots of plain sugar, like candy, raise blood sugar quickly and may be followed by a crash. <b>Whole grains</b>, beans, fruit and foods with <b>fiber</b> or <b>protein</b> release sugar more slowly, so your energy lasts. Pairing a carb with protein, like an apple with peanut butter, helps.", "Think about how fast each food releases its sugar.", [
    "Which food gives the steadiest energy?|Oatmeal with fruit|Candy bar,Soda,Frosting",
    "A big dose of plain sugar often leads to a...|Quick rise then a crash|Steady energy all day,Taller body",
    "What slows down how fast sugar enters your blood?|Fiber|Soda,Syrup,Candy",
    "Which snack pairing helps steady energy?|Apple with peanut butter|Candy with soda,Cookies alone,Juice alone",
    "Whole grains compared with white bread usually have more...|Fiber|Sugar,Candy,Dye",
    "Which hormone helps move sugar from blood into cells?|Insulin|Adrenaline,Melatonin,Bile",
    "Which breakfast is best for lasting energy?|Eggs and whole-grain toast|Sugary cereal only,Donut only,Fruit snacks only",
    "Beans are helpful because they have fiber and...|Protein|Candy,Soda,Frosting"]));
  a.push(L("Iron, potassium and zinc", "🥔", "Minerals are small amounts of nutrients your body needs to work well.", "<b>Iron</b> helps red blood cells carry oxygen. Beans, lean meat and spinach have iron. <b>Potassium</b> helps muscles and the heart, and is in bananas and potatoes. <b>Zinc</b> helps you heal and fight germs, and is in meat, beans and nuts. Eating a mix of foods gives you all of them.", "Link each mineral to its job and a food.", [
    "Which mineral helps red blood cells carry oxygen?|Iron|Potassium,Zinc,Salt",
    "Which mineral in bananas helps muscles and the heart?|Potassium|Iron,Iodine,Fluoride",
    "Which mineral helps you heal and fight germs?|Zinc|Potassium,Calcium,Iron",
    "Which food is a good source of iron?|Beans|Soda,Candy,Butter",
    "Which food has lots of potassium?|Potato|Sugar,Plain soda,Hard candy",
    "Feeling very tired and pale can be a sign of too little...|Iron|Sugar,Screen time,Salt",
    "Where does iron do its work in your body?|In red blood cells|In your hair color,In your nails,In your tooth enamel",
    "How do you get enough minerals?|Eat a variety of foods|Eat only one food,Skip meals,Drink only soda"]));
  a.push(L("Ways of cooking", "🍳", "How you cook food changes how healthy it is.", "<b>Steaming, baking, roasting and grilling</b> add little fat. <b>Frying</b> in lots of oil adds extra fat and calories. <b>Boiling</b> can wash some vitamins into the water. Raw veggies keep all their vitamins. Whatever you do, cook meat until it is safe, and always have an adult help with heat.", "Ask: does this method add lots of oil, or wash away nutrients?", [
    "Which cooking method adds the most extra fat?|Deep frying|Steaming,Baking,Roasting",
    "Which method keeps most vitamins and adds no fat?|Steaming|Deep frying,Frying in butter,Dipping in sugar",
    "Boiling vegetables for a long time can...|Wash vitamins into the water|Add vitamins,Add candy",
    "Which is a lower-fat way to cook chicken?|Baking|Deep frying in oil,Covering in sugar",
    "Which method uses dry heat in an oven?|Baking|Steaming,Boiling,Freezing",
    "Raw carrots keep all their...|Vitamins|Cooking oil,Salt,Candy",
    "Who should help you when cooking with hot oil?|An adult|Nobody,A pet,A younger kid",
    "To keep the water-soluble vitamins from vegetable soup you can...|Drink the broth too|Pour it out,Add candy,Boil it for hours"]));
  a.push(L("Low mood and getting help", "💙", "Everyone feels sad sometimes. It is part of being human.", "Sadness usually passes. If a low mood lasts for <b>weeks</b>, or you stop enjoying things, tell a <b>trusted adult</b> or doctor. Feeling this way is not weakness or your fault, and help works. Sleep, movement, sunlight and talking to someone all help. If a friend seems very down, tell an adult.", "Think about who can help, and what a long low mood means.", [
    "Feeling sad sometimes is...|Normal for everyone|Wrong,Rare,A sign of a bad person",
    "If a low mood lasts for weeks you should...|Tell a trusted adult or doctor|Hide it,Ignore it,Never talk to anyone",
    "Asking for help with feelings is a sign of...|Strength|Weakness,Failing,Silliness",
    "Which can help a low mood?|Sleep, movement and talking|Staying up all night,Staying alone always,Skipping meals",
    "If a friend seems very down for a long time you should...|Tell a trusted adult|Keep it a secret forever,Make fun of them,Ignore it",
    "Low mood that lasts is...|Treatable with help|Impossible to help,Just laziness,Contagious like a cold",
    "Who is a good person to talk to about feelings?|A parent, counselor or other trusted adult|A stranger online,A stranger on the street,Nobody",
    "Losing interest in everything you used to enjoy for weeks is a sign to...|Talk to a trusted adult|Wait silently,Stay up late,Skip school work"]));
  a.push(L("Rumors and gossip", "🗣️", "A rumor is a story that spreads without being checked.", "Rumors can be untrue and can really hurt feelings. Before you repeat something, <b>pause</b> and ask: Is it true? Is it kind? Is it mine to share? You can say \"I don't want to talk about that\" or change the subject. If a rumor is hurting someone, tell a trusted adult.", "Think about truth and kindness before sharing anything.", [
    "A rumor is...|A story spread without being checked|A proven fact,A school rule,A kind of game",
    "Before repeating something about someone, you should ask if it is...|True and kind|Exciting,Secret,Funny",
    "A good way to stop gossip is to...|Change the subject or say you don't want to talk about it|Add to it,Text it to everyone,Make a bigger story",
    "Spreading a rumor can...|Hurt someone's feelings|Make a person stronger,Be harmless always",
    "If a rumor is hurting someone you should...|Tell a trusted adult|Spread it faster,Laugh about it,Add details",
    "Why should you not forward a message about a classmate?|It may be false and unkind|It uses battery only,It is too short",
    "If you are the target of a rumor, a good first step is to...|Tell a trusted adult|Seek revenge,Spread another rumor,Hide forever",
    "Which is a kind response to hearing gossip?|\"Let's not talk about people behind their backs.\"|\"Tell me more!\",\"Let's post it!\",\"I will tell everyone.\""]));
  a.push(L("Storm safety", "⛈️", "Weather can change fast. Know what to do before a storm hits.", "For thunderstorms: <b>when thunder roars, go indoors</b>, and wait <b>30 minutes</b> after the last thunder. Stay away from water and tall trees. For a tornado, go to the lowest floor, in an inside room with no windows. In a flood, <b>turn around, don't drown</b>: never walk or drive through floodwater.", "Think about what keeps you away from lightning, wind and water.", [
    "When you hear thunder outside you should...|Go indoors|Climb a tree,Swim,Fly a kite",
    "How long should you wait after the last thunder before going back out?|30 minutes|1 minute,5 minutes,2 seconds",
    "During a tornado warning the safest place is...|Lowest floor in a room with no windows|Next to a big window,On the roof,In a car beside a tree",
    "What should you never do in floodwater?|Walk or drive through it|Stay home,Listen to the alerts,Move to higher ground",
    "During a thunderstorm you should stay away from...|Water and tall trees|Your couch,Your blanket,Your kitchen table",
    "If a storm alert warns of danger, you should...|Listen and follow the plan|Ignore it,Go outside to look,Take a bath",
    "Why is a tall lone tree unsafe in lightning?|Lightning often strikes the tallest object|Trees are slippery,It is shady",
    "Where is a good place to shelter from lightning?|Inside a building|Under a tree,In a pool,On a hilltop"]));
  a.push(L("Protective gear", "🪖", "The right gear helps you stay safe while you play and train.", "A <b>helmet</b> should sit level on your head, snug, with the strap buckled. Replace it after a hard crash. Use a <b>mouthguard</b> in contact sports, <b>wrist guards</b> and pads for skating, and eye protection when needed. Gear only works when you wear it every time, and when it fits.", "Think about fit, and when gear needs to be replaced.", [
    "A bike helmet should sit...|Level and snug|Tilted back,Loose,On top of a hat",
    "What should you do with a helmet after a hard crash?|Replace it|Keep using it,Paint it,Share it",
    "Which gear protects your teeth in contact sports?|Mouthguard|Sunglasses,Gloves,Knee pads",
    "Which gear helps protect your hands when skating?|Wrist guards|Earmuffs,Sunscreen,Scarf",
    "When should you wear protective gear?|Every time|Only on weekends,Only when adults watch,Never",
    "A helmet strap should be...|Buckled|Loose,Left undone,Tied to the bike",
    "Gear that is too big or too loose...|May not protect you|Protects better,Works the same",
    "Which sport usually needs shin guards?|Soccer|Swimming,Chess,Reading club"]));
  a.push(L("Say no to vaping and smoking", "🚭", "Smoke and vapor are not harmless. They can hurt a growing body.", "Cigarettes and vapes often contain <b>nicotine</b>, which is addictive and can harm a growing brain and lungs. Vapor is not just water. If someone offers it, you can say \"no thanks\", <b>leave</b>, and <b>tell a trusted adult</b>. Smoke around you (secondhand smoke) can hurt your lungs too.", "Think about what keeps your body safe and who can back you up.", [
    "Nicotine is...|An addictive chemical|A vitamin,A kind of water,A healthy mineral",
    "If someone offers you a vape you should...|Say no, leave, tell a trusted adult|Try it quietly,Hide it for them,Join them",
    "Vapor from a vape is...|Not just harmless water|Pure water,Good for lungs,Fresh air",
    "Smoking and vaping can harm your...|Lungs|Fingernail color,Shoe size,Knee caps",
    "What is secondhand smoke?|Smoke you breathe in from other people's smoking|Smoke from a toaster,Smoke from a candle only",
    "Nicotine can harm a young person's...|Growing brain|Fingernails,Hair color,Shoe size",
    "Which is a good way to say no?|\"No thanks, I'm not into that.\"|\"Maybe later.\",\"Okay, one try.\"",
    "Who can you tell if a friend is pressuring you to try it?|A trusted adult|Nobody,Only the friend,Strangers online"]));
  a.push(L("Aerobic and anaerobic", "🏃", "Exercise uses energy in two main ways.", "<b>Aerobic</b> exercise means \"with oxygen\": you can keep going a long time, like jogging, swimming or biking. <b>Anaerobic</b> exercise is short, powerful bursts, like sprinting or lifting. Aerobic builds the heart and lungs. Anaerobic builds muscle power. A mix of both is great.", "Think about oxygen and how long the effort lasts.", [
    "Which is aerobic exercise?|Jogging for 30 minutes|A 5-second jump,Lifting a heavy weight once,A short sprint",
    "A short all-out sprint is mostly...|Anaerobic|Aerobic,Resting,Sleeping",
    "Aerobic means exercising...|With oxygen|Without any breathing,With a ball only",
    "Swimming laps steadily is...|Aerobic|Anaerobic,Not exercise,Only resting",
    "Which builds the heart and lungs?|Aerobic exercise|Standing still,Sitting,Sleeping",
    "Quick bursts of power like a sprint help build...|Muscle power|Only height,Only hair,Only sleep",
    "A long bike ride is mostly...|Aerobic|Anaerobic,A rest,A nap",
    "Lifting a heavy weight a few times is mostly...|Anaerobic|Aerobic,Resting,Digesting"]));
  a.push(L("Nature and health", "🌳", "Time outdoors is good for body and mind.", "Spending time in <b>green spaces</b> can lower stress and improve mood. Sunlight helps your body make vitamin D, and outdoor play gives you exercise. Remember sunscreen, water, bug protection and a plan. Never go to wild places alone: tell an adult where you are going.", "Think about the benefits of outdoor time and how to stay safe.", [
    "Time in green spaces can...|Lower stress|Raise bills,Make you sleepy forever,Cause colds",
    "Your skin makes vitamin D from...|Sunlight|Moonlight,Wind,Rain",
    "Before going out to play in nature you should...|Tell an adult where you are going|Hide where you are,Go alone secretly",
    "What should you bring on a long outdoor day?|Water and sunscreen|Only candy,Nothing,A heavy TV",
    "Playing outside gives you...|Exercise and fresh air|Only boredom,Dirty screens,Nothing",
    "Which is a safe outdoor habit?|Stay with a buddy|Wander off alone,Touch unknown plants,Drink from a stream",
    "Walking in a park can help your mood because it...|Helps you relax and move|Makes you tired of everything,Is always loud",
    "If you will be in the sun for a long time you should...|Wear sunscreen and drink water|Wear nothing,Skip drinks,Stay in direct sun all day"]));
  a.push(C("Sleep debt", "😴", "If you get less sleep than you need, it adds up.", "Sleep debt = (needed hours minus hours slept) times the number of nights.", "Subtract, then multiply.", () => {
    const need = pick([9, 10]), got = ri(6, need - 1), n = ri(3, 5), nm = pick(NM);
    return [`${nm} needs ${need} hours of sleep a night but gets only ${got} hours for ${n} nights. How many hours of sleep is ${nm} short in total?`, (need - got) * n, "First find how many hours are missing each night.", "Multiply the missing hours each night by the number of nights.", "Example: needs 9, sleeps 7 for 4 nights. Short 2 each night, 2 x 4 = 8 hours.", "😴"];
  }));
  a.push(C("Calories from fat", "🧈", "Fat has 9 calories in every gram.", "Calories from fat = grams of fat times 9. (Carbs and protein have 4 calories per gram.)", "Multiply by 9 for fat.", () => {
    const g = ri(2, 12), f = pick(["a bag of chips", "a muffin", "a slice of pizza", "a granola bar"]);
    return [`${f[0].toUpperCase() + f.slice(1)} has ${g} grams of fat. Fat has 9 calories per gram. How many calories come from the fat?`, g * 9, "Each gram of fat gives the same number of calories.", "Multiply the grams of fat by the calories in one gram.", "Example: 5 grams of fat is 5 x 9 = 45 calories.", "🧈"];
  }));
  a.push(C("Recovery heart rate", "💓", "A fit heart slows down quickly after exercise.", "Recovery drop = heart rate at the end of exercise minus heart rate one minute later.", "Subtract the smaller from the bigger.", () => {
    const peak = ri(150, 185), drop = ri(18, 40), nm = pick(NM);
    return [`${nm}'s heart rate is ${peak} beats per minute right after a run and ${peak - drop} one minute later. How many beats per minute did it drop?`, drop, "Compare the two numbers. Which is bigger?", "Subtract the later rate from the first rate.", "Example: 170 at the end and 140 a minute later. 170 - 140 = 30 beats.", "💓"];
  }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 3, 4, 5, 7, 9, 10, 12, 13, 15, 17])));
  a.push(MIX("Level 16 Challenge", pk(a, [2, 6, 8, 11, 14, 16, 17, 15, 12, 1, 4, 0])));

  // ================= LEVEL 17 =================
  const b = [];
  b.push(L("Cholesterol and arteries", "❤️", "Cholesterol is a waxy fat in your blood. Your body needs some, but too much can cause trouble.", "<b>HDL</b> is the \"good\" kind: it helps carry extra cholesterol away. <b>LDL</b> is the \"bad\" kind: too much can build up as <b>plaque</b> inside arteries and narrow them. Fiber, plenty of movement and limiting saturated fat help. A doctor can check cholesterol with a blood test.", "Think: H for helpful, L for lousy.", [
    "Which kind of cholesterol is called the good kind?|HDL|LDL,Plaque,Sodium",
    "Which kind can build up in the arteries?|LDL|HDL,Fiber,Water",
    "Plaque in arteries can...|Narrow them|Make them wider,Make bones stronger,Cool the blood",
    "Which habit helps keep cholesterol healthy?|Exercise and eating fiber|Eating lots of fried food,Never moving,Skipping sleep",
    "How can a doctor check cholesterol?|Blood test|X-ray of the foot,Eye chart,Hearing test",
    "Which food is high in the kind of fiber that helps cholesterol?|Oatmeal|Butter,Fried chicken skin,Candy",
    "Arteries carry blood...|Away from the heart|Into the stomach,Only to the toes",
    "Too much saturated fat can raise...|LDL cholesterol|HDL cholesterol,Your height,Vitamin C"]));
  b.push(L("Blood types and donation", "🩸", "Blood comes in groups called blood types.", "The main blood types are <b>A, B, AB and O</b>. Each can be Rh positive or negative. Blood is made in <b>bone marrow</b>. People who give blood help patients in hospitals. Donors must meet age and health rules and need permission from a parent when young. Donating is done by trained staff with clean, new equipment.", "Remember the four letters of the main groups.", [
    "Which is NOT a main blood type?|C|A,B,O",
    "Where is blood made in your body?|Bone marrow|Stomach,Skin,Hair",
    "Who gives blood in a blood drive?|Healthy donors who meet the rules|Anyone at all,Only babies,Only sick people",
    "Blood donations help...|Patients in hospitals|Only dentists,Nobody,Only birds",
    "Blood donation equipment is...|New and sterile|Used by others,Dirty,Borrowed",
    "Which blood type has both A and B?|AB|O,A,B",
    "Before a young person gives blood they need...|Permission and to meet the rules|Nothing at all,To skip eating all day,A secret code",
    "Which cells in blood carry oxygen?|Red blood cells|White blood cells,Skin cells,Neurons"]));
  b.push(L("DNA and genes", "🧬", "DNA is the instruction book of life, stored in nearly every cell.", "<b>DNA</b> is shaped like a twisted ladder (a double helix). A <b>gene</b> is a section of DNA that holds an instruction. People have 46 <b>chromosomes</b> (23 pairs) in most cells, half from each parent. Identical twins share the same DNA. Your genes plus your habits and surroundings shape who you are.", "Think: DNA holds instructions, and genes are sections of it.", [
    "What shape is DNA?|A twisted ladder|A square,A circle,A star",
    "A gene is...|A section of DNA with an instruction|A kind of muscle,A vitamin,A kind of bone",
    "How many chromosomes are in most human cells?|46|10,100,92",
    "You get your chromosomes from...|Both parents|Only a friend,Only your teacher,Your pet",
    "Identical twins have...|The same DNA|Totally different DNA,No DNA",
    "DNA is found in...|Nearly every cell|Only hair,Only teeth,Only the brain",
    "Besides genes, what shapes your health?|Habits and surroundings|Nothing at all,Only your name,Only the weather",
    "Genes are instructions for...|Building and running your body|Choosing your homework,Picking your clothes,Making the weather"]));
  b.push(L("Acne and skin changes", "🧴", "Skin changes during puberty are normal, and acne is very common.", "Hormones can make oil glands produce more oil, which can clog <b>pores</b> and cause pimples. Wash gently <b>twice a day</b> with mild soap, avoid squeezing or picking (it can scar), keep hair and hands clean, and use oil-free products. If it is bothering you, ask a doctor.", "Think about gentle care, and what could make skin worse.", [
    "Acne starts when...|Oil and dead skin clog pores|You skip a word,You eat air,Your hair is too long",
    "How should you wash your face?|Gently, twice a day|Scrub hard all day,Never,With a rough brush",
    "Should you squeeze pimples?|No, it can scar|Yes, always,Yes, with dirty hands",
    "Acne is very common in...|Puberty|Babies,Pets,Plants",
    "If acne is bothering you who can help?|A doctor|A stranger online,Nobody,A magazine",
    "Which products are best for oily skin?|Oil-free products|Heavy greasy creams,Sugar scrubs,Motor oil",
    "What changes in your body can cause more oil?|Hormones|Soap,Water,Socks",
    "Touching your face with dirty hands can...|Spread germs and oil|Clean your skin,Cure acne,Do nothing at all"]));
  b.push(L("Fight or flight", "⚡", "When your brain senses danger, your body gets ready in seconds.", "The <b>fight-or-flight</b> response makes your heart race, breathing speed up, and muscles tense so you can act fast. It is driven by <b>adrenaline</b>. It is helpful in real danger, but long-lasting stress can hurt sleep and mood. <b>Slow breathing</b> helps your body switch back to calm.", "Think about what the body needs in a hurry, and how it calms down.", [
    "In fight-or-flight your heart rate...|Speeds up|Slows to zero,Stays the same,Stops",
    "Which hormone drives the fight-or-flight response?|Adrenaline|Insulin,Melatonin,Bile",
    "What helps your body calm down afterwards?|Slow deep breathing|Holding your breath,Fast panting,Skipping sleep",
    "Fight-or-flight is helpful because it...|Prepares you to act quickly|Puts you to sleep,Makes you hungry",
    "Long-lasting stress can hurt your...|Sleep and mood|Fingernails,Shoe size,Voice color",
    "During the response your breathing...|Gets faster|Stops,Gets very slow,Stays the same",
    "Your muscles in the response...|Tense up and get ready|Go limp,Fall asleep",
    "A good way to cope with ongoing stress is to...|Move, breathe and talk to someone|Hide it,Stay up late,Skip meals"]));
  b.push(L("Perfectionism and mistakes", "🌱", "Trying to be perfect can make you more stressed, not better.", "<b>Perfectionism</b> means expecting everything to be flawless. It can lead to worry and giving up. Mistakes are how brains learn. Try \"good enough\" goals, treat yourself as kindly as you would a friend, and celebrate progress. Ask: what can I learn from this?", "Think about learning, kindness and progress.", [
    "Perfectionism means...|Expecting everything to be flawless|Trying new things,Being lazy,Being silly",
    "Mistakes help your brain...|Learn|Forget everything,Stop growing,Hurt",
    "A kind thing to say to yourself after a mistake is...|\"What can I learn from this?\"|\"I'm terrible.\",\"I quit forever.\"",
    "Perfectionism can make people feel...|Extra stress and worry|Always relaxed,Sleepier,Taller",
    "A \"good enough\" goal means...|Doing your best without needing perfect|Never trying,Doing nothing",
    "Celebrating progress means...|Noticing how far you have come|Ignoring steps,Waiting for perfect",
    "You should treat yourself like...|A good friend|A rival,An enemy,A robot",
    "If you make a mistake you should...|Learn and try again|Hide and quit,Blame others"]));
  b.push(L("Alcohol facts", "🚫", "Alcohol is a drug that affects the brain, and it is not safe for kids.", "Alcohol slows the brain and body. A kid's growing brain is harmed by it, and it is illegal for young people to drink. If someone offers you alcohol, <b>say no, leave, and tell a trusted adult</b>. Never ride in a car with a driver who has been drinking. Call a parent for a safe ride.", "Think about what protects a growing brain and who can help.", [
    "Alcohol is a drug that...|Slows down the brain and body|Makes you taller,Is a vitamin,Helps you study",
    "If a kid is offered alcohol they should...|Say no, leave, tell a trusted adult|Take a sip,Hide it,Pass it on",
    "Is alcohol safe for a growing brain?|No|Yes, a little,Yes, always",
    "Should you ride with a driver who drank alcohol?|No, call a parent for a ride|Yes if it is close,Yes if it is quiet",
    "Alcohol can make people...|Lose coordination and judgment|Smarter,Better at sports,Wiser",
    "Who can you tell if someone offers you alcohol?|A trusted adult|Nobody,A stranger online,Only the person offering",
    "Young people drinking alcohol is...|Against the law|Required,Healthy,Encouraged",
    "A good way to say no is...|\"No thanks, I'm not interested.\"|\"Maybe next time.\",\"Okay.\""]));
  b.push(L("Food dates and waste", "♻️", "Date labels on food can be confusing.", "<b>Best by</b> or <b>best before</b> is about quality, not safety. <b>Use by</b> is about safety, so follow it. Refrigerate leftovers within <b>2 hours</b> and eat them within <b>3 to 4 days</b>. When in doubt, throw it out. Plan meals and use leftovers to waste less food.", "Think about the difference between quality and safety.", [
    "A \"best by\" date is mostly about...|Quality|Safety,Price,Color",
    "A \"use by\" date is about...|Safety|Colors,Packaging,Price",
    "How soon should leftovers go in the fridge?|Within 2 hours|Next week,After 2 days,Whenever",
    "How long can leftovers usually stay in the fridge?|3 to 4 days|2 weeks,A month,A year",
    "If you are not sure a food is safe you should...|Throw it out|Taste it,Hope for the best,Feed it to a pet",
    "How can you waste less food?|Plan meals and use leftovers|Throw out half,Buy extra always,Never eat leftovers",
    "Moldy bread should be...|Thrown away|Eaten,Toasted,Shared",
    "Freezing food...|Keeps it from spoiling for longer|Makes it older,Always ruins it,Makes it unsafe"]));
  b.push(L("Allergic emergencies", "🚨", "A serious allergic reaction can be an emergency.", "<b>Anaphylaxis</b> is a severe allergic reaction. Signs: hives, swelling of the face or throat, trouble breathing, vomiting or dizziness. A person may carry an <b>epinephrine auto-injector</b>. Call <b>911</b> right away and get an adult. Never ignore symptoms or wait to see if they pass. Do not share food with someone who has an allergy.", "Think about speed: who do you get, and who do you call?", [
    "A severe allergic reaction is called...|Anaphylaxis|Gastritis,Hiccups,Growing pains",
    "Which medicine can a person carry for severe reactions?|Epinephrine auto-injector|Cough drops,Bandage,Sunscreen",
    "A sign of a severe reaction is...|Trouble breathing|A hungry stomach,A yawn,A wink",
    "What should you do if a friend has trouble breathing after eating?|Get an adult and call 911|Wait and see,Give more food,Tell them to sleep",
    "Should you share your snack with someone who has a food allergy?|No, not unless an adult says it's safe|Yes, always,Yes, secretly",
    "Hives are...|Itchy raised bumps on skin|A kind of vitamin,A bone,A song",
    "Swelling of the throat after eating is a sign to...|Call 911|Hum a song,Go for a run",
    "Allergic reactions can be set off by...|Foods, insect stings or medicine|Only music,Only weather,Only socks"]));
  b.push(L("Choking help", "🆘", "Someone who is choking cannot breathe well. Quick action can save a life.", "If a person can cough, speak or breathe, encourage them to <b>keep coughing</b>. If they cannot cough, speak or breathe, or hold their hands at their throat, <b>yell for an adult and call 911</b>. A trained adult gives <b>abdominal thrusts</b> (the Heimlich maneuver). To prevent choking, chew well and do not talk or run with food in your mouth.", "Think about getting help fast and preventing it in the first place.", [
    "A common sign of choking is...|Hands at the throat and unable to speak|Laughing loudly,Sleeping,Humming",
    "If someone is choking and cannot breathe you should...|Yell for an adult and call 911|Give them water,Wait quietly,Pat their head",
    "A person who is coughing forcefully should...|Keep coughing|Be told to stop,Eat more",
    "The Heimlich maneuver is also called...|Abdominal thrusts|Back massage,Foot rub",
    "To avoid choking you should...|Chew well and sit while eating|Run while eating,Talk with a full mouth,Eat very fast",
    "Which number do you call in a US emergency?|911|411,311,211",
    "Who should give abdominal thrusts?|A trained adult|Anyone with no training,A baby",
    "Which food is a common choking risk for young children?|Whole grapes or hard candy|Soup,Water,Milk"]));
  b.push(L("Gaming wisely", "🎮", "Games are fun. Smart habits keep them healthy and safe.", "Take <b>breaks</b> every hour to move and rest your eyes. Set time limits. Do not share your real name, school or address in chat. <b>Mute or block</b> rude players and tell an adult. Only download games from trusted stores and <b>ask a parent before buying</b> anything in a game.", "Think about short sessions, privacy and asking before buying.", [
    "How often should you take a break from gaming?|About every hour|Never,Once a month,Every 10 hours",
    "In game chat you should not share your...|Real name, school or address|Favorite color,Level number,Score",
    "If a player is rude you should...|Mute or block and tell an adult|Argue back,Share your password,Give personal info",
    "Before buying something in a game you should...|Ask a parent|Use any card,Buy secretly,Share the code",
    "Where should you download games?|A trusted store with a parent's help|Any website,Links from strangers,Unknown pop-ups",
    "Too much gaming late at night can hurt your...|Sleep|Hair length,Shoe size,Fingerprints",
    "A good habit during long play is to...|Stretch and rest your eyes|Hold your breath,Sit tighter,Play louder",
    "Your game password should be shared with...|Only a parent|Everyone in chat,Your teammates,Any stranger"]));
  b.push(L("Fake profiles", "🎭", "Online, anyone can pretend to be someone else.", "People can use <b>fake photos and names</b> to seem friendly. A \"new friend\" might not be who they say. Do not give private information, do not move to secret chats, and <b>never meet an online-only friend</b>. If someone makes you uncomfortable or asks for secrets, stop replying, <b>save the messages, block them, and tell a trusted adult</b>.", "Think about what you can know for sure about a person online.", [
    "Online profiles can be...|Faked|Always true,Checked by magic",
    "A person you only know online might not be...|Who they say they are|A real keyboard user,Online",
    "If a new online friend asks you to keep a secret from your parents you should...|Tell a trusted adult|Keep the secret,Send them money,Give your address",
    "Should you meet an online-only friend in person on your own?|No, never|Yes at once,Yes if they ask nicely",
    "What should you do if someone online makes you uncomfortable?|Stop replying, block, tell an adult|Keep chatting,Send photos,Share your school",
    "Someone online asking for photos of you is a sign to...|Stop and tell a trusted adult|Send them,Ask why quietly,Hide it",
    "A stranger offering gifts online is a...|Warning sign|Good deal,Free present,New friend",
    "A safe online friend is someone who...|You also know in real life|Asks for your address,Wants secrets,Offers gifts"]));
  b.push(L("Consent and respect", "🤝", "Respect means asking first and listening to the answer.", "<b>Consent</b> means clearly agreeing. You can say \"no\" to a hug, a high-five, a photo or sharing something of yours, and others can say no to you. <b>No means no</b>. Ask before taking or posting someone's picture. Respect someone who changes their mind. If anyone makes you feel unsafe, tell a trusted adult.", "Think about asking first and listening to the answer.", [
    "Consent means...|Clearly agreeing|Guessing,Staying silent,Being pushed",
    "If a friend says no to a hug you should...|Respect it|Hug anyway,Ask ten times,Get annoyed",
    "Before posting a photo of a classmate you should...|Ask them|Post it fast,Edit it first,Tag everyone",
    "Can you say no to something that makes you uncomfortable?|Yes|No, never,Only on Tuesdays",
    "If someone changes their mind you should...|Respect it|Argue,Pressure them,Ignore it",
    "A clear \"no\" means...|No|Maybe,Yes later,Ask again twenty times",
    "If someone makes you feel unsafe you should...|Tell a trusted adult|Keep quiet,Hide,Pretend it is fine",
    "A respectful way to ask for a photo is...|\"Is it okay if I take your picture?\"|\"Pose for me.\",Take it secretly"]));
  b.push(L("Stretching smart", "🤸", "Stretching keeps your body flexible and helps prevent injuries.", "<b>Dynamic stretches</b> (arm circles, leg swings) keep you moving and suit a <b>warm-up</b>. <b>Static stretches</b> hold a position for 15 to 30 seconds and are best <b>after</b> exercise when muscles are warm. Never bounce, and stop if it hurts: stretching should feel like gentle pulling, not pain.", "Think about moving versus holding, and what feels safe.", [
    "Arm circles and leg swings are...|Dynamic stretches|Static stretches,Cooling snacks",
    "Holding a stretch still for 15 to 30 seconds is...|Static stretching|Dynamic stretching,Jumping",
    "When are static stretches best?|After exercise|Never,Only before a sprint,While sleeping",
    "A stretch should feel like...|A gentle pull|Sharp pain,A hard bounce,Nothing",
    "Should you bounce in a stretch?|No|Yes, as hard as possible,Yes, always",
    "If a stretch hurts you should...|Stop|Push harder,Bounce,Ignore it",
    "Why stretch when muscles are warm?|They stretch more safely|They are colder then,It is a rule only",
    "Dynamic stretches are good for...|A warm-up|Falling asleep,Cooling the soup"]));
  b.push(L("Intervals and variety", "⏱️", "Mixing hard and easy bursts, and different activities, builds fitness.", "<b>Interval training</b> alternates short hard efforts with rest or easy effort, like sprint for 30 seconds, jog for 60. <b>Cross-training</b> means doing different kinds of activity, such as running, swimming and biking, to work different muscles and avoid overuse injuries. Add new things slowly and rest between hard days.", "Think about alternating effort and mixing activities.", [
    "Interval training alternates...|Hard effort and rest or easy effort|Sleeping and eating,Sitting and standing,Two meals",
    "Cross-training means...|Doing different kinds of activity|Doing one thing forever,Only watching",
    "A benefit of cross-training is...|Working different muscles|Skipping rest,Doing less,More injuries",
    "Which is an interval workout?|Sprint 30 seconds then jog 60 seconds|Sit for an hour,Walk the same pace,Lie down",
    "How should you add new exercise?|Slowly|All at once,Never,Only max effort",
    "Resting between hard days helps...|Your body recover|Make you weaker,Waste time,Cause sickness",
    "A mix of running, swimming and biking is...|Cross-training|A single sport,A sleep plan",
    "In intervals, the easy part lets you...|Catch your breath|Stop forever,Skip water"]));
  b.push(C("Interval workout", "⏱️", "Intervals repeat a work part and a rest part.", "Total minutes = number of rounds times (work minutes plus rest minutes).", "Add work and rest first, then multiply.", () => {
    const w = ri(1, 3), r = ri(1, 2), n = ri(3, 6), nm = pick(NM);
    return [`${nm} does ${n} rounds. Each round has ${w} minute${w > 1 ? "s" : ""} of hard work and ${r} minute${r > 1 ? "s" : ""} of rest. How many minutes is the workout?`, n * (w + r), "How long is one full round?", "Add the work and rest minutes, then multiply by the rounds.", "Example: 4 rounds of 2 minutes work and 1 minute rest. One round is 3, so 4 x 3 = 12 minutes.", "⏱️"];
  }));
  b.push(C("Carb and protein calories", "🍞", "Carbs and protein each give 4 calories per gram.", "Calories = grams times 4 for carbs or protein. Add the totals.", "Add the grams, then multiply by 4.", () => {
    const c = ri(10, 40), p = ri(5, 20), f = pick(["a meal bar", "a bowl of oatmeal", "a sandwich", "a yogurt cup"]);
    return [`${f[0].toUpperCase() + f.slice(1)} has ${c} grams of carbs and ${p} grams of protein. Carbs and protein have 4 calories per gram. How many calories come from carbs and protein together?`, (c + p) * 4, "Both nutrients use the same calories per gram.", "Add the grams together, then multiply by 4.", "Example: 10 g carbs and 5 g protein is 15 g, and 15 x 4 = 60 calories.", "🍞"];
  }));
  b.push(C("Cups and ounces", "🥤", "A cup holds 8 fluid ounces.", "Cups = fluid ounces divided by 8.", "Divide by 8.", () => {
    const cups = ri(2, 8), nm = pick(NM);
    return [`${nm} drinks ${cups * 8} fluid ounces of water in a day. There are 8 fluid ounces in a cup. How many cups is that?`, cups, "Think: how many 8s fit into the total?", "Divide the ounces by 8.", "Example: 32 ounces divided by 8 is 4 cups.", "🥤"];
  }));
  b.push(MIX("Mixed practice", pk(b, [0, 2, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17])));
  b.push(MIX("Level 17 Challenge", pk(b, [1, 3, 6, 9, 11, 14, 15, 16, 17, 12, 0, 8])));

  // ================= LEVEL 18 =================
  const c = [];
  c.push(L("Health care and insurance", "🏥", "Many people help you stay healthy, and insurance helps pay for care.", "<b>Health insurance</b> helps pay medical costs. A <b>pediatrician</b> cares for kids, and a <b>specialist</b> focuses on one area like hearts or skin. A <b>pharmacist</b> prepares medicine. <b>Urgent care</b> treats problems that are not life-threatening. The <b>emergency room</b> is for serious emergencies. Your medical information is private.", "Match the helper to the problem.", [
    "Health insurance helps with...|Paying medical costs|Buying homework,Building houses,Making food",
    "A doctor who focuses on one area, like the heart, is a...|Specialist|Pharmacist,Bus driver,Coach",
    "Who prepares and explains medicine?|Pharmacist|Barber,Coach,Chef",
    "A serious emergency like trouble breathing needs...|The emergency room|A waiting room only,Email,A library",
    "A sprained ankle that is not an emergency might go to...|Urgent care|A bakery,A library,A bus stop",
    "A pediatrician is a doctor for...|Children and teens|Pets only,Plants,Cars",
    "Your medical information is...|Private|Public on the internet,Posted at school",
    "Regular checkups are for...|Staying healthy and catching problems early|Only when very sick,Doing homework,Winning games"]));
  c.push(L("Vital signs", "🌡️", "Vital signs are quick measurements that show how your body is doing.", "The main <b>vital signs</b> are body temperature, pulse (heart rate), breathing rate and blood pressure. Normal body temperature is about <b>98.6 degrees Fahrenheit (37 degrees Celsius)</b>. A resting pulse for teens is usually about <b>60 to 100</b> beats per minute. Doctors compare your numbers with healthy ranges.", "Normal is a range, not one exact number.", [
    "Normal body temperature is about...|98.6 degrees Fahrenheit|68 degrees Fahrenheit,120 degrees Fahrenheit,10 degrees Fahrenheit",
    "Normal body temperature in Celsius is about...|37 degrees|57 degrees,10 degrees,90 degrees",
    "Which is a vital sign?|Pulse|Hair length,Shoe size,Favorite color",
    "A typical resting pulse for a teen is about...|60 to 100 beats per minute|5 to 10 beats per minute,300 to 400 beats per minute",
    "A device that measures temperature is a...|Thermometer|Ruler,Compass,Magnet",
    "A stethoscope is used to listen to...|Heart and lungs|Eyes,Hair,Bones in the foot",
    "Blood pressure measures the force of blood against...|Artery walls|Skin,Hair,Teeth",
    "Vital signs are usually checked by...|A doctor or nurse|A stranger,Nobody,A pet"]));
  c.push(L("How studies work", "🔬", "Good health advice comes from careful tests, not just a headline.", "A fair study compares a <b>test group</b> with a <b>control group</b> that does not get the treatment. More people (a bigger <b>sample</b>) gives stronger results. Results should be <b>repeated</b> by other scientists. Be careful with headlines that say \"miracle cure\". A study on a few animals or a few people may not apply to everyone.", "Think about fairness, numbers and repeating a test.", [
    "A control group is a group that...|Does not get the treatment|Gets double treatment,Is hidden,Is always the biggest",
    "A bigger sample size makes results...|More trustworthy|Less trustworthy,Always wrong",
    "Strong results are often...|Repeated by other scientists|Never checked,Only told to friends",
    "A headline that says \"miracle cure\" should make you...|Careful and curious|Buy it at once,Believe it,Share it",
    "A study on only 5 people is...|Too small to be sure|Perfect proof,The best kind",
    "A fair test changes...|One thing at a time|Everything,Nothing",
    "Where can you find reliable health facts?|Doctors and trusted health groups|Random ads,Rumors,Strangers online",
    "Comparing a group with a treatment and a group without helps show...|If the treatment really works|Who is tallest,What color to paint"]));
  c.push(L("Mental health is health", "🤝", "Mental health is just as important as physical health.", "Mental health conditions are health conditions, like asthma or a broken arm. They are common and treatable. <b>Stigma</b> means unfair shame, and it can stop people from getting help. You can help by being kind and by learning the facts. A school counselor, doctor or therapist can help. If you or a friend ever feels unsafe, tell a trusted adult right away.", "Think about kindness, facts and who can help.", [
    "Mental health conditions are...|Real health conditions|Made up,A choice,Contagious like a cold",
    "Stigma means...|Unfair shame|A kind of medicine,A hospital,A game",
    "Mental health conditions are generally...|Common and treatable|Impossible to help,Rare and hopeless",
    "Who can help with mental health?|Counselor, doctor or therapist|A random stranger,Nobody,A vending machine",
    "Being kind about mental health helps people...|Feel safe asking for help|Hide their feelings,Feel shame",
    "If a friend says they feel unsafe you should...|Tell a trusted adult right away|Keep it secret,Make a joke,Wait a month",
    "Mental health is...|Just as important as physical health|Less important,Not important",
    "Talking about feelings is...|Healthy|Weak,Wrong,Silly"]));
  c.push(L("Healthy relationships", "🚩", "Healthy friendships and family bonds make you feel safe and respected.", "Healthy relationships have <b>respect, trust, honesty and support</b>. <b>Red flags</b> include controlling you, constant put-downs, pressure to do things you don't want, cutting you off from other friends, demanding secrets, or threats. If you see red flags, talk to a <b>trusted adult</b>. You deserve to be treated well.", "Respect and kindness are green flags. Pressure and control are red flags.", [
    "Which is a sign of a healthy friendship?|Respect and trust|Control,Threats,Pressure",
    "Which is a red flag?|A friend who controls who you talk to|A friend who listens,A friend who shares,A friend who says sorry",
    "If a friend pressures you to do something unsafe you should...|Say no and tell a trusted adult|Do it,Hide it,Agree",
    "Which is a green flag?|Honesty|Put-downs,Pressure,Threats",
    "A friend who demands you keep secrets from your parents is...|A warning sign|Normal,Fun,A great friend",
    "Constant put-downs are a sign of...|An unhealthy relationship|A healthy joke,Good friendship",
    "Healthy relationships involve...|Support and kindness|Fear,Control,Threats",
    "Who can help if a relationship is unhealthy?|A trusted adult|Nobody,Only the person causing it,A stranger online"]));
  c.push(L("Algorithms and attention", "📱", "Many apps are designed to keep you looking.", "An <b>algorithm</b> is a set of steps a computer follows. Social apps use them to show you more of what you tend to watch. Features like <b>infinite scroll, autoplay and notifications</b> make it easy to keep going. You are in charge: set time limits, turn off extra notifications, and take breaks.", "Notice the tricks, then think about how you can set limits.", [
    "An algorithm is...|A set of steps a computer follows|A snack,A game piece,A kind of battery",
    "Infinite scroll makes it easy to...|Keep looking without stopping|Stop looking,Fall asleep,Wash dishes",
    "Autoplay does what?|Starts the next video for you|Turns off the screen,Deletes the app",
    "A good way to take control of your attention is...|Set time limits|Keep notifications on all day,Never take breaks",
    "Apps show you more of what you...|Watch and click|Never see,Dislike on purpose",
    "Notifications are designed to...|Pull your attention back|Make your phone cold,Save battery",
    "Which helps you use screens in a healthy way?|Turn off extra notifications|Check constantly,Scroll in bed",
    "Taking breaks from screens helps your...|Eyes, mood and sleep|Hair color,Shoe size,Voice"]));
  c.push(L("Advertising tricks", "📢", "Ads try to change what you want and buy.", "Common tricks: <b>celebrity endorsements</b>, <b>\"everyone has one\"</b> (bandwagon), <b>limited time</b> pressure, cute characters, and edited before-and-after pictures. Influencers may be paid; look for words like <b>#ad</b> or <b>sponsored</b>. Before wanting something, ask: who is selling this and why?", "Think about who is selling and what they want you to feel.", [
    "\"Only 2 left, buy now!\" is an example of...|Pressure to hurry|A fact,A recipe,A science test",
    "\"Everyone is buying it!\" is the...|Bandwagon trick|Science trick,Health fact",
    "If an influencer is paid to show a product it may be labeled...|#ad or sponsored|#fact only,#quiet",
    "A celebrity in an ad is there to...|Make you want the product|Prove it works,Tell the whole truth",
    "Before-and-after photos can be...|Edited or misleading|Always true,Always plain",
    "A smart question about an ad is...|Who is selling this and why?|How loud is it?,What is the font?",
    "Cartoon characters on cereal boxes are used to...|Attract kids|Teach nutrition,Count calories",
    "An ad that says \"fast results, no work\" is probably...|Too good to be true|A health fact,Perfect advice"]));
  c.push(L("Organ donation", "💚", "Some people can save lives by donating organs after death or, for some organs, while alive.", "Organs like the <b>heart, lungs, liver and kidneys</b> can be donated. Doctors match donor and patient by blood type and size. A person can have two kidneys but live well with one, so a living person can donate a kidney. People can <b>register</b> to be donors when they are adults. Families are told about the choice.", "Think about matching and about who can choose.", [
    "Organ donation can help save...|Lives|Hair,Homework,Fingernails",
    "Which organ can a living person donate?|A kidney|Their brain,Their heart,Their whole skin",
    "Doctors match donor and patient by...|Blood type and size|Hair color,Eye color,Shoe size",
    "Adults can sign up to be donors by...|Registering|Guessing,Waiting silently",
    "How many kidneys do most people have?|Two|One,Three,Ten",
    "Which of these can be donated?|Liver|Voice,Memory,Name",
    "A person waiting for an organ is called a...|Patient on a waiting list|Winner,Coach",
    "Why do patients need donor organs?|Their own organ is not working well|They are bored,They want extra"]));
  c.push(L("Disability and inclusion", "♿", "People of all abilities belong everywhere.", "A disability may affect moving, seeing, hearing, learning or thinking. People with disabilities have the same worth as everyone. <b>Accessibility</b> includes ramps, elevators, captions and braille. Speak to the person, not about them. Ask <b>\"Would you like help?\"</b> before helping, and listen to the answer. Include everyone in play.", "Think about asking, listening and including.", [
    "A ramp or elevator helps people who...|Cannot use stairs easily|Like stairs,Lost a toy",
    "Captions on a video help people who...|Are deaf or hard of hearing|Cannot see,Are asleep",
    "Before helping someone with a disability you should...|Ask if they want help|Grab their things,Ignore them",
    "Braille is a reading system for people who are...|Blind or have low vision|Deaf,Fast readers",
    "Inclusion means...|Making everyone feel they belong|Leaving some out,Picking teams by skill only",
    "When talking to a person who uses a wheelchair you should...|Speak to them directly|Talk only to their friend,Ignore them",
    "People with disabilities have...|The same worth as everyone|Less worth,Special rules for friendship",
    "Accessibility features are made to...|Help everyone take part|Slow things down,Hide people"]));
  c.push(L("Stroke and heart attack signs", "🚑", "Knowing the signs of an emergency can help you act fast.", "A stroke happens when blood flow to the brain is blocked or a vessel bursts. Remember <b>FAST</b>: <b>F</b>ace drooping, <b>A</b>rm weakness, <b>S</b>peech trouble, <b>T</b>ime to call 911. Heart attack signs include chest pain or pressure, shortness of breath, sweating, and pain in the arm or jaw. Call 911 right away.", "Think about the letters in FAST and about speed.", [
    "In FAST, the F stands for...|Face drooping|Fever,Food,Fear",
    "In FAST, the T stands for...|Time to call 911|Tired,Tall,Tickle",
    "In FAST, the S stands for...|Speech trouble|Sleep,Snack,Sweat",
    "A sign of a heart attack can be...|Chest pain or pressure|A new haircut,A good mood,Itchy socks",
    "If you see signs of a stroke you should...|Call 911 right away|Wait to see,Give food,Go to sleep",
    "A stroke affects the...|Brain|Toes,Hair,Fingernails",
    "In FAST, the A stands for...|Arm weakness|Allergy,Ankle,Apple",
    "Who should you get quickly in an emergency?|An adult, and call 911|Nobody,Only a pet,A stranger online"]));
  c.push(L("Safe cooking temperatures", "🍗", "Heat kills germs in food, but only if it gets hot enough.", "Use a food thermometer. Cook <b>poultry to 165 degrees Fahrenheit</b> (74 Celsius), <b>ground beef to 160</b> (71 Celsius), and <b>fish to 145</b> (63 Celsius). The fridge should be <b>40 degrees Fahrenheit or colder</b>. Between 40 and 140 degrees is the \"danger zone\" where germs grow fast. Always have an adult help.", "Use a thermometer, not guesswork. Think about which food needs which temperature.", [
    "Chicken should be cooked to...|165 degrees Fahrenheit|100 degrees Fahrenheit,120 degrees Fahrenheit,200 degrees Fahrenheit",
    "Ground beef should be cooked to...|160 degrees Fahrenheit|100 degrees Fahrenheit,130 degrees Fahrenheit,220 degrees Fahrenheit",
    "Fish should be cooked to...|145 degrees Fahrenheit|90 degrees Fahrenheit,100 degrees Fahrenheit,200 degrees Fahrenheit",
    "The fridge should be at or below...|40 degrees Fahrenheit|60 degrees Fahrenheit,80 degrees Fahrenheit,100 degrees Fahrenheit",
    "The \"danger zone\" for food is between...|40 and 140 degrees Fahrenheit|0 and 20 degrees Fahrenheit,200 and 300 degrees Fahrenheit,300 and 400 degrees Fahrenheit",
    "A tool that checks if food is cooked safely is a...|Food thermometer|Ruler,Compass,Magnet",
    "In the danger zone, germs...|Grow fast|Freeze,Disappear,Take a nap",
    "Who should help when cooking meat?|An adult|Nobody,A pet,A toddler"]));
  c.push(L("Babysitting safety", "🧸", "Looking after a younger child is a big responsibility.", "Before the parents leave, get their <b>phone numbers</b>, the address, allergies and rules. Never leave a child alone, keep small objects, medicine and cleaners out of reach, and do not open the door to strangers. Know the emergency number and where the first aid kit is. A <b>safety course</b> (such as Red Cross babysitting training) helps.", "Think about being prepared and staying close.", [
    "The first thing to get from parents is...|Their phone numbers and rules|Their snacks,Their car,A gift",
    "Should you leave a young child alone?|No, never|Yes for a long time,Yes while you nap",
    "Who should you open the door for?|Only people the parents said can come|Anyone who knocks,Delivery strangers",
    "Medicine and cleaners should be kept...|Out of reach|On the floor,In reach,Next to the toys",
    "In an emergency a babysitter should...|Call 911 and the parents|Hide,Wait,Call a friend only",
    "What helps a new babysitter prepare?|A safety course|Nothing,Guessing,Watching a movie",
    "Food allergies of the child are...|Important to know about|Not important,A secret",
    "Small objects like coins are dangerous for little kids because they...|Can cause choking|Are shiny,Are heavy"]));
  c.push(L("Building habits", "🔁", "Small habits repeated every day add up to big changes.", "A habit has a <b>cue</b> (a trigger), a <b>routine</b> (the action) and a <b>reward</b>. Start tiny and be specific, like \"after I brush my teeth, I stretch for one minute\". Track your progress. It takes <b>weeks</b>, not days, and missing a day is okay: just restart the next day.", "Think about the three parts of a habit and starting small.", [
    "A habit's trigger is called the...|Cue|Reward,Routine",
    "The action part of a habit is the...|Routine|Cue,Reward",
    "A good way to start a new habit is...|Start tiny|Change everything at once,Wait for perfect",
    "If you miss a day of your habit you should...|Start again the next day|Quit forever,Hide it",
    "Linking a new habit to an old one is helpful because...|The old one is a reminder|It is longer,It is silly",
    "Tracking your habit helps you...|See progress|Forget it,Feel worse",
    "Making a habit stick usually takes...|Weeks|One minute,One second,Never",
    "A reward for a healthy habit can be...|A good feeling or small harmless treat|Skipping sleep,Spending lots of money"]));
  c.push(L("Refusal skills", "🙅", "Knowing how to say no helps you stay safe from pressure.", "Use <b>S-L-T</b>: <b>Say no</b> clearly, <b>Leave</b> the situation, <b>Tell</b> a trusted adult. You can give a reason, make a joke, suggest another activity, or just walk away. Trust your gut: if something feels wrong, it probably is. A real friend will respect your \"no\". This works for dares, risky stunts, smoking, alcohol or anything unsafe.", "Think about the three steps and what a real friend does.", [
    "In S-L-T, the S stands for...|Say no|Stay,Share,Sing",
    "In S-L-T, the L stands for...|Leave|Laugh,Lie,Lend",
    "In S-L-T, the T stands for...|Tell a trusted adult|Try it,Talk loudly,Trade",
    "A real friend will...|Respect your no|Pressure you,Laugh at you",
    "If something feels wrong you should...|Trust your gut and leave|Ignore it,Go along",
    "A good way to refuse a risky dare is...|Say no and suggest another activity|Do it fast,Pretend to agree",
    "Refusal skills can be used for...|Dares, stunts or unsafe offers|Only birthdays,Only weather",
    "After leaving an unsafe situation you should...|Tell a trusted adult|Keep it secret,Go back"]));
  c.push(L("Prevention and checkups", "🩺", "Preventing problems is better than fixing them.", "<b>Preventive care</b> includes regular checkups, vaccines, dental visits (usually twice a year), vision and hearing tests, and healthy habits. Checkups find problems early when they are easier to treat. Knowing your <b>family health history</b> helps your doctor know what to watch for.", "Think about stopping problems early.", [
    "Preventive care means...|Stopping problems before they start|Fixing only emergencies,Avoiding doctors",
    "How often are dental visits usually advised?|Twice a year|Once in ten years,Never,Every week",
    "Why do doctors do regular checkups?|To find problems early|To scare you,To waste time",
    "Family health history can help your doctor...|Know what to watch for|Choose your homework,Guess your age",
    "Which is preventive care?|Getting vaccines|Skipping checkups,Ignoring pain,Staying up all night",
    "A vision test checks your...|Eyesight|Hearing,Heart rate,Balance",
    "A hearing test checks your...|Hearing|Eyesight,Pulse,Flexibility",
    "Early treatment is often...|Easier|Harder,Impossible"]));
  c.push(C("Cooking temperature gap", "🌡️", "A food thermometer tells you how much hotter the food still needs to get.", "Degrees to go = target temperature minus current temperature.", "Subtract the current temperature from the target.", () => {
    const t = pick([[165, "chicken"], [160, "ground beef"], [145, "fish"]]), cur = t[0] - ri(10, 60);
    return [`The safe temperature for ${t[1]} is ${t[0]} degrees Fahrenheit. The thermometer reads ${cur} degrees. How many more degrees does it need?`, t[0] - cur, "Compare the target with what the thermometer shows.", "Subtract the current reading from the target.", "Example: target 165, reading 140. 165 - 140 = 25 degrees to go.", "🌡️"];
  }));
  c.push(C("Average resting pulse", "💓", "An average (mean) is the total divided by how many numbers.", "Mean = sum of the readings divided by the number of readings.", "Add them all, then divide.", () => {
    const m = ri(66, 80), off = [ri(1, 5), -ri(1, 5), ri(1, 4), -ri(1, 4)];
    const vals = off.map(o => m + o); vals.push(m - off.reduce((x, y) => x + y, 0));
    return [`A student's resting pulse on five mornings was ${vals.join(", ")} beats per minute. What is the average (mean) pulse?`, m, "The average needs the total of all five readings.", "Add all five readings and divide by 5.", "Example: 70, 72, 74 add to 216, divided by 3 is 72.", "💓"];
  }));
  c.push(C("Percent of a goal", "🎯", "Percent tells how much of a goal you have done.", "Part = goal times percent divided by 100.", "Find 10 percent first, then build up.", () => {
    const g = pick([20, 40, 60, 80, 100, 200]), p = pick([10, 25, 50, 75]), nm = pick(NM);
    return [`${nm}'s goal is ${g} minutes of exercise this week. ${nm} has done ${p}% of the goal. How many minutes is that?`, g * p / 100, "Think about the part of the whole goal.", "Multiply the goal by the percent, then divide by 100.", "Example: 10% of 50 minutes is 50 x 10 / 100 = 5 minutes.", "🎯"];
  }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 3, 4, 6, 8, 10, 11, 13, 14, 16, 17])));
  c.push(MIX("Level 18 Challenge", pk(c, [2, 5, 7, 9, 12, 15, 16, 17, 14, 10, 1, 4])));

  Object.assign(HEALTH_LEVELS, { 16: a, 17: b, 18: c });
})();
