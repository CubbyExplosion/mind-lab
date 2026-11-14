// ext/health-7-9.js  Health & Safety levels 7-9
(() => {
  // item format: "question|answer|wrong1,wrong2|visual(optional)"
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

  // ================= LEVEL 7 =================
  const a = [];
  a.push(L("Cells and organs", "🔬", "Your body is built from tiny parts called <b>cells</b>. Cells make up organs, and organs work together in body systems.", "Trillions of <b>cells</b> make up your body. A group of cells doing one job forms an <b>organ</b>, like the heart or lungs. Organs that team up form a <b>system</b>. Your skin is the largest organ.", "Small to big: cell, organ, system.", [
    "What is the smallest living building block of your body?|A cell|An organ,A system|🔬", "A group of organs that work together is called a...|Body system|Single cell,Fingernail",
    "Which of these is an organ?|Heart|Hair,Fingernail|❤️", "Which organs filter your blood and make urine?|Kidneys|Lungs,Brain",
    "What is the largest organ of your body?|Skin|Heart,Stomach", "Which organs take in oxygen from the air?|Lungs|Kidneys,Stomach|🫁",
    "Your body is made of trillions of tiny...|Cells|Bubbles,Bricks", "Which organ is the control center for thinking?|Brain|Liver,Skin|🧠"]));
  a.push(L("Blood and the heart", "🩸", "Blood travels all around your body in tubes. The heart is the pump that keeps it moving.", "<b>Red blood cells</b> carry oxygen. <b>White blood cells</b> fight germs. <b>Platelets</b> help blood clot to stop bleeding. Blood travels in <b>blood vessels</b>. The heart has <b>four chambers</b>.", "Red carries, white fights, platelets plug.", [
    "Which blood cells carry oxygen?|Red blood cells|White blood cells,Platelets|🩸", "Which blood cells help fight germs?|White blood cells|Red blood cells,Bone cells",
    "What do platelets help your blood do?|Clot to stop bleeding|Digest food,Help you see", "How many chambers does a human heart have?|Four|Two,Six|❤️",
    "Tubes that carry blood are called...|Blood vessels|Airways,Nerves", "Where does blood pick up oxygen?|The lungs|The feet,The stomach|🫁",
    "Regular exercise makes your heart...|Stronger|Weaker,Smaller|🏃", "What pumps blood through your body?|The heart|The lungs,The stomach"]));
  a.push(L("The nervous system", "🧠", "Your nervous system sends messages around your body very fast.", "The <b>brain</b> is the control center. The <b>spinal cord</b> is a bundle of nerves inside your backbone. <b>Nerves</b> carry messages to and from the brain. Your <b>skull</b> protects your brain.", "Brain, spinal cord, nerves: a message highway.", [
    "Nerves carry messages between your body and your...|Brain|Elbow,Toenail|🧠", "What protects your brain?|Skull|Ribs,Knees|💀",
    "What bundle of nerves runs down inside your backbone?|Spinal cord|Windpipe,Stomach tube", "You touch something hot and pull away fast. What carried the message?|Nerves|Bones,Hair",
    "Why do people wear helmets when biking?|To protect the brain and head|To look tall,To stay cool only|🚲", "Does your brain keep working while you sleep?|Yes it keeps working|No it turns off,Only on weekends|😴",
    "Nerves in your fingertips help you...|Feel touch|Hear music,Smell food|☝️", "What is the control center of your body?|The brain|The heart,The lungs"]));
  a.push(L("Skin care", "🧴", "Skin covers your whole body and keeps germs out. Take care of it!", "Skin <b>protects</b> you, keeps in water, and helps you feel touch. Sweat helps you cool down. <b>Sunscreen</b> protects skin from burns. The sun is strongest around <b>midday</b>.", "Cover up, use sunscreen, and rest in the shade.", [
    "What is one job of your skin?|It protects your body|It pumps blood,It digests food", "What does SPF on sunscreen stand for?|Sun Protection Factor|Safe Pool Fun,Skin Peeling Fast|🧴",
    "After swimming, you should...|Put on sunscreen again|Skip sunscreen,Only wear it in winter|🏊", "When is the sun strongest?|Around midday|Early morning,At night|☀️",
    "Sweat helps your body...|Cool down|Grow taller,Hear better", "A scraped knee should be...|Washed gently and covered|Picked at,Rubbed with dirt|🩹",
    "A wide-brim hat helps because it...|Shades your face from the sun|Makes you run faster,Keeps you hungry|👒", "Which one protects your skin the most in strong sun?|Shade plus sunscreen|A dark room only,Nothing|🌳"]));
  a.push(L("Eyes and vision", "👀", "Your eyes are delicate and important. Help them stay healthy.", "See an <b>eye doctor</b> for checkups. <b>Glasses</b> help many people see clearly. Wear <b>goggles</b> for sports that can hit your eyes. Rest your eyes from screens with the <b>20-20-20 rule</b>: every 20 minutes, look 20 feet away for 20 seconds.", "Protect your eyes and give them rests.", [
    "Who checks your eyes and vision?|An eye doctor|A plumber,A mail carrier|👓", "Glasses help people to...|See clearly|Hear better,Taste food",
    "Rubbing your eyes with dirty hands can...|Spread germs|Clean them,Fix your vision", "In the 20-20-20 rule, you look far away for how long?|20 seconds|2 minutes,20 hours|⏱️",
    "Sports goggles protect eyes from...|Hits and flying objects|Hunger,Noise", "You should never look straight at the...|Sun|Grass,Clouds|☀️",
    "Sunglasses protect your eyes from...|Strong sunlight|Hunger,Loud sounds|🕶️", "Reading in very dim light can make your eyes...|Tired|Bigger,Stronger"]));
  a.push(L("Vitamins and minerals", "🍊", "Your body needs small amounts of vitamins and minerals to grow and work well.", "<b>Calcium</b> builds strong bones and teeth. <b>Vitamin C</b> (oranges) helps you heal. <b>Vitamin A</b> (carrots) helps your eyes. <b>Iron</b> helps blood carry oxygen. Your skin makes <b>vitamin D</b> in sunlight. Eat many colorful foods.", "Eat a rainbow of foods.", [
    "Calcium helps build strong...|Bones and teeth|Hair,Voice|🦴", "Which food is rich in vitamin C?|Orange|Butter,Plain rice|🍊",
    "Vitamin A in carrots helps your...|Eyes|Knees,Elbows|🥕", "Your skin can make vitamin D when it gets...|Sunlight|Rain,Darkness",
    "Iron helps your blood carry...|Oxygen|Sugar,Sound", "What is the best way to get vitamins?|Eat many colorful foods|Eat only candy,Skip meals",
    "Which is a mineral your body needs?|Calcium|Candy,Cola", "Milk and yogurt give you lots of...|Calcium|Soda,Added sugar|🥛"]));
  a.push(L("Fiber and whole grains", "🌾", "Fiber is the part of plant foods your body cannot digest, and it is very helpful.", "<b>Fiber</b> helps digestion and keeps you feeling full. It is found in fruits, vegetables, beans and <b>whole grains</b>. Whole grains keep all parts of the grain, so they have more fiber than white bread.", "Choose whole, plant foods.", [
    "Fiber helps your...|Digestion|Hearing,Eyesight", "Which food has lots of fiber?|Beans|Candy,Soda|🫘",
    "Which bread has more fiber?|Whole grain bread|White bread,Cake|🍞", "Fiber comes from...|Plants|Fish,Milk",
    "Which is a whole grain?|Oatmeal|Gummies,Fries|🥣", "Which has more fiber?|A whole apple|Apple juice,Apple soda|🍎",
    "Fiber works best with plenty of...|Water|Sugar,Salt|💧", "Brown rice has more fiber than...|White rice|Beans,Oatmeal"]));
  a.push(L("Protein power", "🥚", "Protein helps your body build and fix itself.", "<b>Protein</b> builds and repairs muscles and other body parts. Animal sources: eggs, fish, chicken, milk. Plant sources: beans, lentils, tofu, nuts. Some people are allergic to nuts, so always check first.", "Mix up your protein foods.", [
    "Protein helps build and repair your...|Muscles|Clothes,Phones|💪", "Which food has protein?|Eggs|Soda,Lollipops|🥚",
    "Which is a plant source of protein?|Beans|Candy,Soda|🫘", "Which one is a protein food?|Tofu|Jelly,Syrup",
    "Which snack has protein?|Yogurt|Fruit punch,Cotton candy", "After exercise, muscles repair using...|Protein|Soda,Candy",
    "Why check before sharing nuts?|Some people are allergic|They are heavy,They are loud|🥜", "Which is a fish dish with protein?|Baked salmon|Frosted cake,Ice pop|🐟"]));
  a.push(L("Strength, flexibility, endurance", "🤸", "Fitness has different parts. Each one helps your body in a different way.", "<b>Strength</b>: how strong your muscles are. <b>Flexibility</b>: how far joints can bend and stretch. <b>Endurance</b>: how long you can keep going. <b>Balance</b> keeps you steady.", "Do a bit of each kind.", [
    "Yoga stretches build...|Flexibility|Endurance,Strength|🧘", "Running a long way builds...|Endurance|Flexibility,Aim|🏃",
    "Touching your toes tests your...|Flexibility|Endurance,Aim", "Pull-ups mainly test your...|Strength|Flexibility,Balance",
    "Endurance means...|Keeping going for a long time|Bending easily,Lifting heavy once", "Flexibility means...|How well your joints bend and stretch|How fast you run,How loud you shout",
    "Which activity builds endurance?|Swimming laps|One short stretch,Sitting|🏊", "Standing on one foot builds...|Balance|Hearing,Vision"]));
  a.push(L("Warm up and cool down", "🔥", "Before and after exercise, your body needs a gentle start and a gentle stop.", "A <b>warm-up</b> gets your muscles ready and helps prevent injuries. A <b>cool-down</b> slows your heart down gently. Stretch slowly, without bouncing. Stop if something hurts sharply.", "Warm up before, cool down after.", [
    "Why should you warm up first?|It gets your muscles ready|It makes you sleepy,It uses up water", "Which is a good warm-up?|Easy jogging in place|Eating a big meal,Sitting still|🏃",
    "A cool-down comes...|After exercise|Before exercise,Never", "A warm-up comes...|Before exercise|After exercise,Never",
    "Slow stretching helps muscles stay...|Loose|Frozen,Tiny", "If a stretch hurts sharply, you should...|Stop|Push harder,Ignore it",
    "After a long run, a good cool-down is...|Walking slowly and drinking water|Lying down at once,Sprinting more", "A cool-down helps your heart rate...|Slow down gently|Jump up,Freeze|❤️"]));
  a.push(L("Teamwork and fair play", "🤝", "Games are more fun when everyone plays fairly and kindly.", "<b>Fair play</b> means following the rules, taking turns and being honest. Good sports say \"good game\" after winning or losing. Encourage teammates, and include everyone.", "Be a good sport.", [
    "After your team loses, a good sport says...|Good game|It was your fault,Nothing and yells", "Fair play means...|Following the rules|Cheating if nobody sees,Pushing|⚽",
    "A teammate makes a mistake. You say...|Nice try! Keep going.|You ruined it.,Nothing and glare", "Teamwork means...|Working together toward a goal|Winning alone,Ignoring others|🤝",
    "A referee's job is to...|Make sure the rules are followed|Pick the winner early,Sell snacks|🧑‍⚖️", "When you win, you should be...|Kind and humble|Loud and bragging,Mean to the losers",
    "Someone is left out of the game. You...|Invite them to join|Ignore them,Tease them", "Why follow the rules in sports?|It keeps the game safe and fair|Rules are boring,They are only for adults"]));
  a.push(L("Worry and coping", "☁️", "Everyone feels worried sometimes. There are healthy ways to cope.", "Worry is a <b>normal</b> feeling. Try <b>slow belly breaths</b>, talk to a trusted adult, draw or write your feelings, and use kind self-talk like \"I can try my best.\"", "Breathe, talk, and be kind to yourself.", [
    "Feeling worried is...|A normal feeling|Something only bad kids feel,Something that never happens", "Which helps when you feel worried?|Slow deep breaths|Hiding forever,Yelling at friends|🌬️",
    "Talking to a trusted adult about worries...|Often helps|Is silly,Makes you weaker", "Drawing or writing about worries can help you...|Sort out your feelings|Forget your name,Grow taller|✏️",
    "In belly breathing you...|Breathe slowly into your belly|Hold your breath,Pant very fast", "You feel nervous before a test. A good plan is to...|Prepare and take calm breaths|Stay up all night,Skip school",
    "Positive self-talk sounds like...|I can try my best.|I always fail.,I give up.", "Who feels worried sometimes?|Everyone|Nobody,Only grown-ups"]));
  a.push(L("Listening and empathy", "👂", "Good friends listen and care about each other's feelings.", "<b>Empathy</b> means understanding how someone else feels. A good listener looks at the speaker, waits their turn and does not <b>interrupt</b>. You can say, \"That sounds hard. Do you want to talk?\"", "Listen first, then answer.", [
    "Empathy means...|Understanding how someone else feels|Being the boss,Winning arguments|💞", "A good listener...|Looks at the speaker|Interrupts,Checks a game",
    "A friend is sad. You can...|Ask if they want to talk|Laugh at them,Walk away", "Interrupting means...|Talking while someone else is speaking|Waiting your turn,Nodding",
    "A friend looks down and sniffles. They might feel...|Sad|Proud,Silly|😢", "Saying \"I understand why you feel that way\" shows...|Empathy|Teasing,Bossiness",
    "Listening to someone who disagrees...|Helps you solve the problem|Wastes time,Starts fights", "To show you are listening, you can...|Nod and repeat back what you heard|Look away,Hum a song"]));
  a.push(L("Electrical safety", "🔌", "Electricity helps us every day, but it can be dangerous.", "Never poke anything into <b>outlets</b>. Keep water away from electric things. Pull a plug by the <b>plug</b>, not the cord. Tell an adult about <b>frayed cords</b>. Stay far from fallen power lines. Go <b>indoors</b> in a thunderstorm.", "Respect electricity.", [
    "What should never go into a wall outlet?|Fingers or objects|Nothing at all is fine,Only plugs are bad|🔌", "Water and electricity...|Do not mix|Are good friends,Make music",
    "To unplug something, you hold...|The plug|The cord,The wire|🔌", "You see a frayed cord. You should...|Tell an adult|Tape it yourself,Chew on it",
    "You see a fallen power line. You should...|Stay far away and tell an adult|Touch it quickly,Walk over it|⚡", "Too many plugs in one outlet can...|Overheat and cause a fire|Save electricity,Make it quiet",
    "Never use electric devices with...|Wet hands|Dry hands,A grown-up helping", "During lightning, where is the safest place?|Indoors|Under a tall tree,In the pool|⛈️"]));
  a.push(L("Bus and walking safety", "🚌", "Getting to school and back safely takes smart habits.", "Wait away from the <b>curb</b>. On the bus, stay seated. Cross where the driver can see you. <b>Look left, right, left</b> before crossing. Wear bright colors at night. Keep headphones low near traffic.", "Stop, look, listen, then go.", [
    "While waiting for the bus you should...|Stand back from the curb|Run alongside the road,Sit in the street|🚏", "On the bus, you should...|Stay seated|Stand on the seats,Lean out the window",
    "Before crossing a street you...|Look left, right and left again|Close your eyes,Run blindly|👀", "A flashing orange hand means...|Do not start crossing|Run faster,Skip across",
    "You drop something near the bus. You should...|Tell the driver and not run under|Crawl under the bus,Grab it quickly", "Bright clothes at night help...|Drivers see you|Make you cold,Annoy people|🧥",
    "Loud headphones near a street make it hard to...|Hear traffic|See colors,Smell food|🎧", "You should cross the street at...|A crosswalk|Between parked cars,Any dark spot|🚸"]));
  a.push(L("Bacteria and viruses", "🦠", "Germs are tiny living things. Two main kinds are bacteria and viruses.", "<b>Bacteria</b> are single cells; many are harmless or helpful, some cause illness. <b>Viruses</b> cause colds and flu. <b>Antibiotics</b> work on bacteria, not on viruses. Washing hands and covering coughs stop germs from spreading.", "Wash, cover, and stay home when sick.", [
    "Antibiotics work on...|Bacteria|Viruses,Rocks|💊", "A cold is caused by a...|Virus|Sugary snack,Cold air alone|🤧",
    "Germs are too small to see without a...|Microscope|Telescope,Ruler|🔬", "Are all bacteria bad?|No, some are helpful|Yes, all are bad,Yes, and they are huge",
    "Helpful bacteria in your gut help with...|Digestion|Seeing,Hearing", "What is the best way to stop germs spreading?|Wash your hands|Share cups,Cough on your hand|🧼",
    "When you cough, you should cover with your...|Elbow|Bare hand,Nothing", "When you have a fever, you should...|Stay home and rest|Go to a party,Play hard outside"]));
  a.push(C("Step counting", "👟", "A pedometer counts steps. Let's use multiplication to find totals.", "Multiply the steps each day by the number of days.", "Same amount each day means multiply.", () => {
    const s = ri(2, 9) * 1000, d = ri(3, 6), n = pick(NM);
    return [`${n} walks ${s} steps every day. How many steps is that in ${d} days?`, s * d, "Each day has the same number of steps. Add the same number again and again, or multiply?", `Think of ${s} as ${s / 1000} thousands. Multiply that by ${d}, then say thousands.`, "Example: 1500 steps a day for 4 days. 15 x 4 = 60, so 6000 steps.", "👟"];
  }));
  a.push(C("Fruit and veggie goal", "🥦", "Healthy plates have fruits and vegetables. Count how many more you need.", "Add what you ate, then subtract from the goal.", "Add first, then subtract.", () => {
    const f = ri(1, 3), v = ri(1, 3), g = f + v + ri(2, 4), n = pick(NM);
    return [`${n}'s goal is ${g} cups of fruit and veggies today. ${n} has had ${f} cup${f > 1 ? "s" : ""} of fruit and ${v} cup${v > 1 ? "s" : ""} of veggies. How many more cups are needed?`, g - f - v, "First find how much has been eaten. Then ask: how far from the goal?", `Add ${f} and ${v}. Then take that away from ${g}.`, "Example: goal 9, ate 2 and 3. 2 + 3 = 5, and 9 - 5 = 4 more.", "🥦"];
  }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 3, 5, 7, 9, 12, 14])));
  a.push(MIX("Level 7 Challenge", pk(a, [2, 4, 6, 8, 10, 11, 13, 15, 16, 17])));

  // ================= LEVEL 8 =================
  const b = [];
  b.push(L("The digestive journey", "🍽️", "Food takes a long trip through your body to give you energy.", "Order: <b>mouth</b> (teeth chew, saliva starts breaking down food), <b>esophagus</b> (a tube to the stomach), <b>stomach</b> (mixes food), <b>small intestine</b> (takes in nutrients), <b>large intestine</b> (takes out water). Waste leaves the body.", "Mouth, esophagus, stomach, small intestine, large intestine.", [
    "Where does digestion begin?|The mouth|The stomach,The large intestine|👄", "Which tube carries food from your mouth to your stomach?|Esophagus|Windpipe,Spinal cord",
    "Where do most nutrients get taken into your blood?|Small intestine|Esophagus,Mouth", "What does the stomach do to food?|Mixes and breaks it down|Stores it forever,Makes it cold|🍽️",
    "Which comes right after the stomach?|Small intestine|Mouth,Esophagus", "The large intestine mostly takes out...|Water|Teeth,Bones",
    "Saliva in your mouth helps to...|Start breaking down food|Make bones,Cool your blood", "Why is chewing important?|It breaks food into smaller pieces|It makes food colder,It uses up water"]));
  b.push(L("Breathing system", "🌬️", "Every cell in your body needs oxygen, and your breathing system brings it in.", "Air goes in through the nose or mouth, down the <b>trachea</b> (windpipe), into the <b>lungs</b>. Tiny air sacs called <b>alveoli</b> pass oxygen to the blood. The <b>diaphragm</b> is a muscle under the lungs that helps you breathe.", "In: oxygen. Out: carbon dioxide.", [
    "The windpipe has another name. What is it?|Trachea|Esophagus,Artery|🌬️", "What muscle under your lungs helps you breathe?|Diaphragm|Biceps,Stomach",
    "What gas does your body need from the air?|Oxygen|Helium,Smoke", "What gas do you breathe out?|Carbon dioxide|Oxygen only,Milk",
    "Tiny air sacs in your lungs are called...|Alveoli|Muscles,Tendons|🫁", "Exercise makes you breathe...|Faster|Slower,Not at all|🏃",
    "Breathing in through your nose helps...|Filter and warm the air|Make you taste,Hide smells", "Which organs are in your breathing system?|Lungs|Kidneys,Liver"]));
  b.push(L("Joints and muscles", "🦾", "Bones cannot move alone. Muscles and joints make motion possible.", "A <b>joint</b> is where two bones meet. <b>Hinge joints</b> (elbow, knee) bend one way. <b>Ball-and-socket joints</b> (shoulder, hip) move in many ways. Muscles work in <b>pairs</b>: one pulls while the other relaxes. <b>Tendons</b> connect muscles to bones.", "Muscles pull, never push.", [
    "A place where two bones meet is a...|Joint|Tendon,Nerve|🦴", "Your elbow is which type of joint?|Hinge|Ball-and-socket,Spinal",
    "Your shoulder is which type of joint?|Ball-and-socket|Hinge,Zipper", "What connects muscles to bones?|Tendons|Nerves,Veins",
    "Muscles move bones by...|Pulling|Pushing,Freezing", "Muscles often work in...|Pairs|Circles,Silence|💪",
    "Which joint lets your arm swing in a big circle?|Shoulder|Knee,Elbow", "Your knee bends mostly like a...|Door hinge|Spinning ball,Rope"]));
  b.push(L("Skeleton facts", "💀", "Your skeleton is your body's frame.", "An adult has <b>206</b> bones. The <b>skull</b> protects the brain. The <b>ribs</b> protect the heart and lungs. The <b>spine</b> holds you upright and protects your spinal cord. Bones stay strong with calcium and exercise.", "Eat well and move to keep bones strong.", [
    "About how many bones does an adult have?|206|50,1000|🦴", "Your ribs protect your...|Heart and lungs|Knees,Ears",
    "What does your spine protect?|Spinal cord|Stomach,Skin", "What protects your brain?|Skull|Ribs,Spine",
    "Which helps bones stay strong?|Calcium and exercise|Skipping meals,Sitting all day", "What is another name for your backbone?|Spine|Skull,Rib cage",
    "Bones are...|Alive and can heal|Dead and cannot change,Made of metal|🦴", "Which is the longest bone in your body?|Thigh bone (femur)|Finger bone,Rib"]));
  b.push(L("Carbohydrates and energy", "🍝", "Your body needs fuel to move, think and grow.", "<b>Carbohydrates</b> are the body's main fuel. Choose <b>whole grains</b>, fruit, beans and vegetables for steady energy. Sugary snacks give a quick burst and then you may feel tired. Energy from food is measured in <b>calories</b>.", "Steady fuel beats a quick sugar burst.", [
    "What is the body's main fuel?|Carbohydrates|Salt,Plastic|🍝", "Which gives steadier energy?|Oatmeal|Candy bar,Soda|🥣",
    "Energy from food is measured in...|Calories|Inches,Volts", "A sugar rush is often followed by feeling...|Tired|Taller,Quieter",
    "Which food is a carbohydrate?|Rice|Chicken,Water|🍚", "Which is a whole grain choice?|Whole wheat pasta|Gummy candy,Soda",
    "Your brain gets most of its energy from...|Sugars from carbohydrates|Salt,Ice", "You need more fuel when you...|Play sports a lot|Sleep,Sit still all day"]));
  b.push(L("Fats and sugars", "🥑", "Not all fats are the same. Choose wisely.", "<b>Healthy fats</b> come from fish, nuts, seeds, avocados and olive oil. Limit <b>fried foods</b> and sugary treats. Too much <b>added sugar</b> can cause cavities and weight problems. Treats are okay sometimes.", "Healthy fats yes, lots of sugar no.", [
    "Which food has healthy fats?|Avocado|Gummy bears,Soda|🥑", "Which is a good source of healthy fats?|Salmon|Lollipop,Cotton candy",
    "Too much added sugar can cause...|Cavities|Taller teeth,Better sleep", "Which of these has the most added sugar?|A can of soda|Plain water,Unsweetened milk|🥤",
    "French fries are...|A sometimes food|A superfood,Good every meal|🍟", "Which is better for you than lots of fried food?|Olive oil in small amounts|Frosting,Candy",
    "A treat once in a while is...|Okay|Never okay,Required every day", "Which snack has healthy fats?|A handful of almonds|Candy,Frosting|🌰"]));
  b.push(L("Plan a balanced day", "🗓️", "Planning meals helps you get what your body needs.", "Plan three meals and one or two snacks. Fill half your plate with <b>fruits and vegetables</b>. Add protein and whole grains. Drink water. Don't skip breakfast.", "Plan ahead for a balanced day.", [
    "How much of your plate should be fruits and vegetables?|About half|A tiny bit,None|🍽️", "Which breakfast is most balanced?|Eggs, toast and fruit|Candy only,A soda|🍳",
    "Which is a smart snack?|Apple slices and cheese|Cookies only,Chips and soda|🍎", "What should you drink with most meals?|Water|Soda,Energy drink",
    "Why not skip breakfast?|It gives you energy to learn|It is boring,It makes you sleepy forever", "Which dinner is balanced?|Chicken, rice and broccoli|Cake only,Fries only|🍗",
    "Protein, whole grains and veggies in a meal show...|Balance|Waste,Danger", "A good plan is to eat...|A variety of foods|The same food only,Only sweets"]));
  b.push(L("Sleep science", "🌙", "Sleep is when your body grows and your brain sorts out the day.", "Kids ages 6 to 12 need about <b>9 to 12 hours</b> of sleep. During sleep your body repairs itself and your brain stores memories. Blue light from screens can make it harder to fall asleep, so turn them off an hour before bed.", "Same bedtime, screens off, calm routine.", [
    "How much sleep do kids ages 6 to 12 need?|9 to 12 hours|2 to 4 hours,15 to 18 hours|😴", "Screens before bed can make it...|Harder to fall asleep|Easier to dream,Faster to grow",
    "During sleep, your body...|Repairs and grows|Stops working,Forgets everything", "A good bedtime routine includes...|Reading a book|Playing loud games,Eating candy",
    "Sleep helps your brain to...|Store memories and learn|Lose homework,Shrink", "Not enough sleep can cause...|Trouble focusing|Super speed,Taller bones",
    "You should turn screens off about...|An hour before bed|Right after waking,During sleep|📱", "A regular bedtime helps your body...|Know when to sleep|Skip sleep,Stay awake"]));
  b.push(L("Moods and mental health", "🌈", "Mental health means taking care of your thoughts and feelings, just as you take care of your body.", "Feelings go <b>up and down</b>, and that is normal. Exercise, sleep, friends and talking about feelings help your <b>mental health</b>. If sad or worried feelings last a long time, tell a trusted adult.", "It is brave to ask for help.", [
    "Mental health is about your...|Thoughts and feelings|Only your bones,Only your teeth|🧠", "Feelings that go up and down are...|Normal|Wrong,Impossible",
    "What can help your mood?|Exercise and sleep|Skipping sleep,Staying alone all day", "If sad feelings last a long time, you should...|Tell a trusted adult|Hide them,Ignore them forever",
    "Asking for help is...|Brave|Weak,Silly|💪", "Which helps you stay mentally healthy?|Spending time with friends|Never talking,Never resting",
    "Doctors can help with...|Mental health and body health|Only broken bones,Only colds", "Which is a healthy way to share feelings?|Talk or draw|Hit,Throw things"]));
  b.push(L("Managing anger", "😠", "Anger is a normal feeling. What you do with it matters.", "Anger is okay; <b>hurting others is not</b>. Try: stop, breathe, count to ten, take a break, or squeeze a stress ball. Then use words to say what's wrong. Notice your body signals, like a fast heartbeat.", "Calm body first, then words.", [
    "Feeling angry is...|Normal|Always bad,Impossible", "Which is a healthy way to calm down?|Take slow breaths|Hit something,Yell at a friend|🌬️",
    "When angry, you should...|Take a break|Throw something,Say mean words", "A body sign of anger can be...|A fast heartbeat|Growing taller,Better hearing|❤️",
    "After you calm down, you can...|Use words to explain|Stay silent forever,Get even", "Counting to ten helps you...|Pause before you act|Run faster,Get taller",
    "Which is NOT okay when angry?|Hurting someone|Walking away,Squeezing a ball", "A quiet place to cool off is...|A calm-down spot|A noisy crowd,A food court"]));
  b.push(L("Using I-messages", "🗣️", "How you say something can change how others hear it.", "An <b>I-message</b> says how you feel without blaming: \"I feel upset when my turn is skipped. Please let me have a turn.\" A \"you\" message like \"You always cheat!\" can start a fight. Stay calm and be specific.", "I feel ... when ... please ...", [
    "Which is an I-message?|I feel upset when I'm left out.|You are so mean.,You never share.", "I-messages help because they...|Do not blame|Start arguments,Hide feelings",
    "Which message is the kindest?|I felt sad when you took my pencil.|You are a thief.,Nobody likes you.", "An I-message starts with...|I feel|You are,Everybody says",
    "A good tone of voice for talking is...|Calm|Shouting,Whispering mean words", "Why be specific, like \"when you took my turn\"?|It explains the real problem|It is longer,It sounds fancy",
    "Which is better for solving a problem?|I need a turn, please.|You're the worst.,Give it now!", "After you share your feelings, you should...|Listen to the other person|Walk away,Interrupt"]));
  b.push(L("Making good decisions", "🧭", "Every day you make choices. Use steps to choose well.", "Use <b>STOP, THINK, CHOOSE</b>. <b>Stop</b> and notice the problem. <b>Think</b> of options and what could happen next (consequences). <b>Choose</b> the safe, kind and honest option. Then check how it went.", "Is it safe, kind and honest?", [
    "The first step in good decision making is to...|Stop and think|Choose fast,Ask nobody", "What is a consequence?|What happens because of a choice|A kind of food,A rule of grammar",
    "A good choice is...|Safe, kind and honest|Fun but risky,Quick to do", "You find a wallet. What is a good choice?|Give it to an adult|Keep the money,Hide it|👛",
    "Before choosing, you should think about...|What could happen next|Only what is fun,Nothing", "A friend dares you to do something unsafe. You...|Say no and walk away|Do it,Dare them back|🛑",
    "After a decision, it helps to...|Check how it went|Forget it,Blame others", "Who can help you decide hard things?|A trusted adult|A stranger online,Nobody"]));
  b.push(L("Setting health goals", "🎯", "Goals help you build healthy habits.", "A good goal is <b>specific</b> (clear), <b>measurable</b> (you can count it), and <b>realistic</b> (you can do it). Break big goals into small steps and track your progress. Celebrate small wins!", "Small steps, tracked every day.", [
    "Which is the most specific health goal?|Drink 5 glasses of water each day|Be healthy,Do good stuff", "A measurable goal is one you can...|Count or track|Never finish,Wish for|📊",
    "A realistic goal is one you...|Can actually do|Cannot do,Never try", "Which goal is realistic for a beginner?|Walk 15 minutes after dinner|Run a marathon tomorrow,Never sleep",
    "Big goals are easier when you...|Break them into small steps|Do them all at once,Give up", "A chart on the fridge can help you...|Track your progress|Cook dinner,Fix the TV|🗓️",
    "When you reach a small goal, you should...|Celebrate|Feel bad,Ignore it|🎉", "Which goal can be measured?|Read for 20 minutes every night|Try to be nicer,Get better"]));
  b.push(L("Ads and food choices", "📺", "Ads are made to make us want things. Smart kids ask questions.", "Companies make ads to <b>sell</b> things. Ads use bright colors, cartoons, music and happy people. An ad does not always tell the full truth about how healthy food is. Check the label and ask: is it good for my body?", "Ads sell. Labels tell.", [
    "Why do companies make ads?|To sell things|To teach you math,To give things away", "A cartoon on a snack box is there to...|Make it appealing to kids|Make it healthier,Teach you history|🧸",
    "A box says 'Fun!' on the front. What should you check?|The nutrition label|The cartoon,The color", "An ad says a cereal is 'part of a balanced breakfast'. You should...|Check the sugar on the label|Believe it fully,Eat it all day",
    "Which is the best way to pick healthy food?|Read labels and think|Choose what ads show,Pick the loudest box", "Ads use music and happy people to...|Get your attention|Prove it is healthy,Cure sickness|📺",
    "Smart shoppers ask...|Is this good for my body?|Is the ad funny?,Is it shiny?", "A celebrity is on a soda ad. Does it make it healthy?|No|Yes,Always"]));
  b.push(L("Game and chat safety", "🎮", "Games are fun, and you can keep them safe.", "Never share your <b>real name, school, address, phone number or photos</b> in games or chat. Use a nickname. Don't open links from strangers. If someone is mean, asks for personal details, or asks you to keep a secret, <b>stop, don't reply, and tell a trusted adult</b>.", "Nickname, no details, tell an adult.", [
    "Which is safe to use as a game name?|A made-up nickname|Your full name,Your school name|🎮", "Someone in a game asks where you live. You...|Don't answer and tell an adult|Tell them,Give a hint",
    "A player asks you to keep a secret from your parents. You...|Tell a trusted adult|Keep it,Reply yes|🚩", "A stranger sends you a link. You...|Don't open it and tell an adult|Open it,Share it",
    "Which is private information?|Your home address|Your favorite color,Your favorite game", "A player is being mean in chat. You can...|Mute or block and tell an adult|Be mean back,Send your address",
    "A person offers free game items if you give your password. You...|Say no and tell an adult|Send it,Ask for more", "Who should you tell if something feels wrong online?|A trusted adult|A stranger,Nobody"]));
  b.push(L("Simple first aid", "🩹", "Knowing a few first-aid steps helps you help in small emergencies.", "<b>Burn</b>: cool it under cool running water and tell an adult. <b>Nosebleed</b>: sit, lean slightly forward and pinch the soft part of your nose for 10 minutes. <b>Bee sting</b>: scrape out the stinger, wash, and use a cold pack; get help right away if breathing is hard. For big injuries, call an adult or 911.", "Stay calm and get an adult.", [
    "A small burn should first be cooled with...|Cool running water|Butter,Ice only forever|🔥", "For a nosebleed, you should lean...|Slightly forward|Back far,Upside down",
    "For a nosebleed, you pinch...|The soft part of your nose|Your forehead,Your ear|👃", "After a bee sting, you should remove the...|Stinger|Shoes,Hat|🐝",
    "After a sting, if breathing gets hard, you...|Get help right away|Wait,Go to sleep", "For a big injury, you should...|Get an adult or call 911|Move the person,Hide",
    "A small scrape should be...|Washed and covered|Left dirty,Picked|🩹", "In first aid, a good first step is to...|Stay calm|Panic,Run away"]));
  b.push(C("Weekly screen time", "📱", "Keeping screen time balanced helps you sleep, move and learn.", "Add the hours each day, then compare with the limit.", "Add first, then compare.", () => {
    const x = ri(1, 3), y = ri(1, 3), z = ri(1, 3), lim = x + y + z + ri(1, 3), n = pick(NM);
    return [`${n}'s family limit is ${lim} hours of screens over three days. ${n} used ${x}, ${y} and ${z} hours. How many hours are left?`, lim - x - y - z, "First find the total used. Then think about what is left.", `Add ${x}, ${y} and ${z}. Take that total away from ${lim}.`, "Example: limit 10 hours. Used 2, 3 and 1. 2 + 3 + 1 = 6, and 10 - 6 = 4 hours left.", "📱"];
  }));
  b.push(C("Sleep hours", "🛏️", "Let's figure out how much sleep you get.", "From bedtime to midnight, add the hours after midnight until wake-up.", "Split the night at midnight.", () => {
    const p = ri(8, 10), w = ri(6, 8), n = pick(NM), pm = 12 - p;
    return [`${n} goes to bed at ${p} o'clock at night and wakes at ${w} o'clock in the morning. How many hours of sleep is that?`, pm + w, "Hours before midnight and hours after midnight are two parts.", `From ${p} o'clock to midnight is ${pm} hours. Now add the hours from midnight until ${w}.`, "Example: bed at 11 and up at 5. 1 hour until midnight, plus 5 is 6 hours.", "🛏️"];
  }));
  b.push(MIX("Mixed practice", pk(b, [0, 1, 4, 7, 9, 11, 13, 15])));
  b.push(MIX("Level 8 Challenge", pk(b, [2, 3, 5, 6, 8, 10, 12, 14, 16, 17])));

  // ================= LEVEL 9 =================
  const c = [];
  c.push(L("Preventing illness", "🛡️", "Many illnesses can be prevented with healthy habits.", "<b>Vaccines</b> train your immune system. <b>Handwashing</b> removes germs. Rest, healthy food and exercise keep you strong. Some illnesses are <b>contagious</b> (they spread from person to person); others, like allergies, are not.", "Prevent first, treat second.", [
    "An illness that spreads from person to person is...|Contagious|Allergic,Sleepy", "Vaccines help by...|Training your immune system|Making you taller,Replacing food|💉",
    "Which action helps stop the spread of flu?|Washing hands|Sharing drinks,Skipping sleep|🧼", "Are allergies contagious?|No|Yes, always,Only in winter",
    "A sick friend sneezes into the air. What helps?|Stay a bit away and wash hands|Hug them,Share their cup", "Which habit helps your body fight illness?|Enough sleep|Staying up all night,Skipping meals",
    "Why stay home when you have a fever?|So you rest and don't spread germs|It is a holiday,Fevers are fun|🤒", "Which is a way to prevent illness?|Getting recommended vaccines|Ignoring symptoms,Touching your face"]));
  c.push(L("How much to eat", "🥗", "Different food groups are needed in different amounts.", "Fill <b>half your plate</b> with fruits and vegetables, about a quarter with grains (half of them whole grains), and about a quarter with protein, plus dairy or a dairy swap. A serving of meat is about the size of a <b>deck of cards</b>.", "Half fruit and veggie, then grains and protein.", [
    "About how much of your plate should be fruits and vegetables?|Half|One tenth,All of it|🥗", "A serving of meat is about the size of...|A deck of cards|A pizza,A soccer ball",
    "Which group takes up about a quarter of your plate along with grains?|Protein|Candy,Soda", "How many of your grains should be whole grains?|At least half|None,Only a pinch",
    "Which is a dairy food?|Yogurt|Bread,Apple|🥛", "Which plate is most balanced?|Fish, rice, salad|Fries only,Cake and soda|🍽️",
    "A serving of cooked pasta is about the size of...|A cupped hand|A bucket,A coin", "Which is a dairy swap with calcium?|Fortified soy milk|Soda,Fruit punch"]));
  c.push(L("Reading ingredient lists", "📋", "The ingredient list tells you what is inside food.", "Ingredients are listed from <b>most to least</b> by weight. If sugar is first, the food has a lot of it. Sugar has many names: syrup, dextrose, fructose. Short lists of whole foods are usually better. Check for allergens like milk, nuts and eggs.", "First ingredient = most.", [
    "In an ingredient list, the first ingredient is the one that...|There is the most of|There is the least of,Tastes the best", "If sugar is the first ingredient, the food has...|A lot of sugar|No sugar,A little sugar",
    "Which is another name for sugar?|Corn syrup|Whole wheat,Olive oil|🍬", "Which snack is probably healthier?|Plain nuts (one ingredient)|A candy with 30 ingredients,Frosting",
    "Where do labels list allergens like milk and nuts?|On the package|On the barcode only,Nowhere|🥜", "Ingredients are ordered by...|Weight, most to least|Alphabet,Color",
    "A cereal lists 'whole grain oats' first. That means...|It has mostly whole grain oats|It is mostly sugar,It is all air|🥣", "Why is a short ingredient list often better?|Fewer added things|It has more candy,It is boring"]));
  c.push(L("Heart-healthy habits", "💓", "A healthy heart can last you a lifetime. Start good habits now.", "Be active every day, eat fruits, vegetables and whole grains, limit salty and fried foods, sleep enough and stay away from smoke. Kids need about <b>60 minutes</b> of activity each day. A resting heart rate for kids is often around 70 to 100 beats a minute.", "Move more, eat well, sleep well.", [
    "How much activity do kids need each day?|About 60 minutes|5 minutes,10 hours|🏃", "Which food is better for your heart?|Fresh vegetables|Fried fast food,Salty chips|🥦",
    "Exercise makes your heart...|Stronger|Weaker,Quieter", "Too much salt and fried food can be hard on your...|Heart|Hair,Nails",
    "Which helps your heart most?|Daily activity|Sitting all day,Skipping sleep", "Breathing in smoke is bad for your...|Heart and lungs|Hair color,Handwriting",
    "Your heart rate usually goes up when you...|Run|Sleep,Sit quietly|❤️", "A resting heart rate for kids is about...|70 to 100 beats per minute|5 to 10 beats,500 beats"]));
  c.push(L("Calcium and growing bones", "🥛", "Childhood is the time to build bones that will last.", "Kids build most of their bone strength before adulthood. <b>Calcium</b> and <b>vitamin D</b> help. Good sources: milk, yogurt, cheese, leafy greens, fortified foods. <b>Weight-bearing exercise</b> like jumping and running makes bones stronger.", "Eat calcium, move, get vitamin D.", [
    "Which mineral builds strong bones?|Calcium|Sugar,Salt|🦴", "Which vitamin helps your body use calcium?|Vitamin D|Vitamin Z,Vitamin Soda",
    "Which exercise makes bones stronger?|Jumping and running|Lying down,Watching TV|🏃", "Which food gives calcium?|Yogurt|Soda,Chips",
    "Leafy greens like kale give...|Calcium|Nothing,Only sugar|🥬", "When do kids build most of their bone strength?|While growing up|Only as old adults,Never",
    "Where does your skin make vitamin D?|In the sunlight|In the dark,In the fridge", "Why is soda poor for bones?|It replaces calcium-rich drinks|It is a bone,It makes bones taller"]));
  c.push(L("Planning your fitness", "📈", "A good fitness plan builds strength, endurance and flexibility.", "<b>FITT</b> helps you plan: <b>F</b>requency (how often), <b>I</b>ntensity (how hard), <b>T</b>ime (how long), <b>T</b>ype (what kind). Aim for 60 minutes of activity daily. Start easy and increase slowly. You can <b>talk but not sing</b> at moderate intensity.", "Frequency, Intensity, Time, Type.", [
    "In FITT, the first F stands for...|Frequency|Fun,Fast|📈", "In FITT, 'Time' means...|How long you do it|What time of day,How loud",
    "In FITT, 'Intensity' means...|How hard you work|How often,How far|💥", "In FITT, 'Type' means...|The kind of activity|The speed,The score",
    "Doing a workout 4 days a week is about...|Frequency|Type,Time", "Walking is usually which intensity?|Light to moderate|Extreme,Zero",
    "At moderate effort, you can usually...|Talk but not sing|Sing easily,Not breathe|🎤", "To stay safe when you start a new routine, you...|Increase slowly|Do the hardest first,Skip warm-up"]));
  c.push(L("Resilience", "🌱", "Resilience is bouncing back after something hard.", "Everyone has setbacks. <b>Resilient</b> people keep trying, learn from mistakes, ask for help and think about what they can control. Say \"I can't do this <b>yet</b>.\" Support from family and friends helps you bounce back.", "Not yet, instead of never.", [
    "Resilience means...|Bouncing back after something hard|Never feeling sad,Giving up quickly|🌱", "After losing a game, a resilient person...|Learns and tries again|Quits forever,Blames the team",
    "'I can't do this yet' shows a...|Growth mindset|Fixed mindset,Sleepy mindset", "What helps you bounce back?|Support from family and friends|Hiding,Staying silent",
    "You fail a test. A good next step is to...|Ask what you missed and study again|Give up,Say you hate school", "Which can you control?|Your effort|The weather,Other people's thoughts",
    "Making mistakes is...|Part of learning|A disaster,Proof you're bad", "Asking for help during a setback is...|A smart choice|Embarrassing,Cheating"]));
  c.push(L("Stress toolbox", "🧰", "Stress is how your body reacts to pressure. Build a toolbox of ways to cope.", "Healthy tools: <b>deep breathing</b>, exercise, music, drawing, talking with someone you trust, and enough sleep. <b>Progressive muscle relaxation</b> means tightening then relaxing each muscle. Unhealthy ways, like yelling or hiding, do not solve problems.", "Pick the right tool for the moment.", [
    "Stress is...|Your body's reaction to pressure|A kind of food,An illness you catch", "Which is a healthy stress tool?|Deep breathing|Yelling at others,Hiding in bed all day|🌬️",
    "Tightening then relaxing each muscle is called...|Progressive muscle relaxation|Stretching sleep,Muscle freezing", "Which can lower stress?|Going for a walk|Skipping sleep,Staying up late",
    "Talking with a trusted person can...|Make a problem feel lighter|Make it heavier,Hide it", "Too much homework piling up. A smart tool is to...|Make a plan with small steps|Ignore it,Panic",
    "Listening to calm music can help you...|Relax|Hear less,Grow", "Which is NOT a healthy way to cope?|Hitting things|Drawing,Exercising"]));
  c.push(L("Self-talk and self-esteem", "💬", "The voice in your head can lift you up or tear you down.", "<b>Self-talk</b> is what you tell yourself. Positive self-talk builds <b>self-esteem</b>, which is how you feel about yourself. Replace \"I'm terrible\" with \"I'm still learning.\" Notice your strengths, and don't compare yourself to others online.", "Talk to yourself like you would a friend.", [
    "Self-talk is...|What you tell yourself|What you say to a friend,A kind of game|💬", "Which is positive self-talk?|I'm still learning.|I'm hopeless.,I hate myself.",
    "Self-esteem is...|How you feel about yourself|How tall you are,Your test score", "Replace 'I'm terrible at this' with...|I can get better with practice.|I quit.,Nobody cares.",
    "Comparing yourself to others online can make you feel...|Worse about yourself|Taller,Smarter right away|📱", "Writing down your strengths can...|Boost your confidence|Hurt your feelings,Waste time",
    "You'd talk to a friend who fails by saying...|You tried hard, try again!|You're bad.,Forget it.", "Everyone has...|Strengths and things to learn|No strengths,Only weaknesses"]));
  c.push(L("Solving conflicts", "⚖️", "Conflicts are normal. Solving them kindly makes friendships stronger.", "Steps: <b>1.</b> Stay calm. <b>2.</b> Each person tells their side with I-messages. <b>3.</b> Listen without interrupting. <b>4.</b> Brainstorm ideas. <b>5.</b> Pick a fair solution (a <b>compromise</b>). If you can't agree, ask a trusted adult to help.", "Calm, share, listen, brainstorm, agree.", [
    "A compromise is when...|Each side gives a little|One side wins everything,Nobody talks|⚖️", "What is the first step in solving a conflict?|Stay calm|Yell your side,Walk away mad",
    "After sharing your side, you should...|Listen to the other person|Interrupt,Leave", "To brainstorm means to...|Think of many ideas|Pick the first idea,Say no to all",
    "Two kids want the same toy. A fair idea is...|Take turns|Grab it,Hide it|🧸", "If you can't agree, you can...|Ask a trusted adult to help|Fight,Give up forever",
    "Which sentence helps solve a conflict?|I feel left out when you don't ask me.|You're a jerk.,Nobody likes you.", "A fair solution is one that...|Works for both people|Helps only you,Helps only them"]));
  c.push(L("Healthy boundaries", "🚧", "A boundary is a limit that keeps you comfortable and safe.", "You are the boss of your <b>body</b>, your <b>space</b> and your <b>privacy</b>. You can say \"no\" to a hug or a touch you don't like. Respect others' boundaries too: ask first, and accept \"no.\" If someone crosses your boundary or asks you to keep a secret that feels bad, tell a trusted adult.", "Ask first, respect no.", [
    "A boundary is...|A limit that keeps you comfortable|A wall in a house,A kind of game|🚧", "A friend does not want a hug. You should...|Respect their no|Hug anyway,Tease them",
    "Who is the boss of your body?|You|A stranger,Nobody", "Someone touches you in a way you don't like. You should...|Say no and tell a trusted adult|Keep it secret,Do nothing",
    "Before borrowing something you should...|Ask first|Take it,Hide it", "Asking someone to keep a bad secret from your parents is...|A warning sign|Normal,Fun",
    "If someone says no to you, you should...|Accept it|Keep asking,Get angry", "Your diary or messages are part of your...|Privacy|Homework,Lunch|📔"]));
  c.push(L("Trusted sources", "🔎", "Not everything you see or read is true. Check before you believe.", "Good sources are written by <b>experts</b>, give evidence, and have no hidden aim to sell you something. Check <b>who</b> made it, <b>when</b>, and <b>whether other trusted places agree</b>. Doctors, health departments and school nurses are trusted for health facts.", "Who made it? Is it true? Who else says so?", [
    "Which is a trusted source for health facts?|A doctor or health department|A random post,A cartoon|🩺", "A video says a pill cures everything. You should...|Be careful and ask an adult|Believe it,Buy it",
    "A trusted source usually gives...|Evidence|Only opinions,Only jokes", "Before sharing a surprising claim, you should...|Check if it is true|Share it fast,Add more drama",
    "An ad sells a 'miracle drink'. The writer may want to...|Sell it to you|Help you for free,Teach you math", "Asking 'Who made this?' helps you...|Judge if it is trustworthy|Make it louder,Delete it",
    "If trusted places don't agree with a claim, it may be...|Not true|Definitely true,Secret", "A school nurse is a good source for...|Health questions|Game cheats,Movie times|🧑‍⚕️"]));
  c.push(L("Emergency kit and plans", "🎒", "Being ready for emergencies helps your family stay safe.", "A family <b>emergency plan</b> includes exits, a meeting place and phone numbers. A <b>kit</b> has water, non-perishable food, flashlight, batteries, first-aid supplies, medicines and blankets. Practice <b>drills</b>. For tornado or earthquake, learn the right moves from your school and family.", "Make a plan, pack a kit, practice.", [
    "What is a meeting place in a plan for?|Finding each other after leaving|Playing games,Doing homework|📍", "Which item belongs in an emergency kit?|Flashlight|Skateboard,Balloon|🔦",
    "How much water is advised per person per day in a kit?|About 1 gallon|1 spoon,100 gallons", "Which food is best for a kit?|Canned or dry food|Fresh ice cream,Lettuce|🥫",
    "Why practice drills?|So you know what to do|To waste time,To scare people", "Emergency phone numbers should be...|Written down and shared|Hidden,Forgotten",
    "Why are batteries in the kit?|For the flashlight and radio|For snacks,For toys", "In an emergency, listen to...|Trusted adults and officials|Rumors,Strangers online"]));
  c.push(L("Heat and cold safety", "🌡️", "Weather extremes can make you sick if you are not careful.", "In heat: drink water, rest in the <b>shade</b>, wear light clothes. Signs of <b>heat exhaustion</b>: dizzy, very sweaty, tired, headache. Tell an adult. Never stay in a parked car. In cold: wear layers, a hat, gloves and warm boots. Signs of <b>frostbite</b>: numb, pale skin. Go inside.", "Water and shade in heat. Layers in cold.", [
    "In hot weather you should...|Drink water and rest in shade|Run all day,Wear thick coats|🥵", "Which is a sign of heat exhaustion?|Feeling dizzy and very sweaty|Feeling cold and shivery,Feeling hungry only",
    "You feel dizzy in the heat. You should...|Tell an adult and cool down|Keep playing,Hide it", "Is it safe to stay in a parked car on a hot day?|No, never|Yes, with windows closed,Yes, with a snack|🚗",
    "In cold weather you should wear...|Layers|One thin shirt,Wet clothes|🧣", "A sign of frostbite is...|Numb and pale skin|Bright red sunburn,Feeling hot",
    "If your fingers feel numb in the cold, you should...|Go inside and warm up|Stay out longer,Rub snow on them", "Which clothing is best in the heat?|Light, loose clothes|Heavy sweaters,Winter boots"]));
  c.push(L("Open water safety", "🏊", "Lakes, rivers and oceans are fun but need extra care.", "Swim only with an <b>adult watching</b> and where there is a lifeguard. Wear a <b>life jacket</b> on boats. A <b>rip current</b> pulls swimmers away from shore: stay calm, don't fight it, swim <b>parallel</b> to the shore, then back in. Never swim during lightning.", "Swim with a buddy and a lifeguard.", [
    "Where should you swim?|With an adult watching|Alone,Far from help|🏊", "What should you wear on a boat?|A life jacket|Sandals only,Nothing",
    "If caught in a rip current, you should swim...|Parallel to shore|Straight against it,Straight down", "A rip current is...|A strong flow pulling away from shore|A warm patch,A school of fish|🌊",
    "If lightning begins, you should...|Get out of the water|Keep swimming,Dive deeper|⛈️", "A good rule is to swim only where there is a...|Lifeguard|Dark cave,Broken dock",
    "A friend is in trouble in the water. You should...|Shout for an adult or call 911|Jump in to save them,Ignore it", "Which is the safest way to enter unknown water?|Feet first, slowly|Diving head first,Running and jumping"]));
  c.push(L("Asthma basics", "😮‍💨", "Asthma makes the airways in the lungs sensitive. Many kids have it and live active lives.", "With asthma, airways can swell and tighten, which makes breathing hard. <b>Triggers</b> include dust, pollen, smoke, cold air and hard exercise. A <b>rescue inhaler</b> helps open the airways. Tell an adult right away if you or a friend has trouble breathing.", "Know the triggers and tell an adult fast.", [
    "Asthma affects your...|Airways and lungs|Ears,Stomach|🫁", "A trigger is something that...|Can set off asthma symptoms|Cures asthma,Is a kind of medicine",
    "Which can be an asthma trigger?|Smoke|Fresh water,Warm socks", "What does a rescue inhaler help do?|Open the airways|Grow bones,Cool the skin",
    "A friend is wheezing and cannot breathe well. You should...|Get an adult right away|Wait and see,Tell a joke", "Who should hold and give a person's medicine?|The person with an adult's guidance|Any friend,A stranger",
    "Is asthma contagious?|No|Yes,Only in winter", "People with asthma can usually...|Be active with a plan|Never move,Never go outside"]));
  c.push(C("Active minutes goal", "⏱️", "Kids aim for 60 minutes of activity a day. Let's see how close you are.", "Add minutes from the day, then subtract from the goal.", "Add, then take away.", () => {
    const x = ri(1, 3) * 10, y = ri(1, 3) * 5, z = ri(1, 2) * 5, n = pick(NM);
    return [`${n} wants 60 active minutes. ${n} played ${x} minutes, danced ${y} minutes and walked ${z} minutes. How many more minutes are needed?`, 60 - x - y - z, "Find out how much activity has been done. Then ask how many minutes are missing.", `Add ${x}, ${y} and ${z}. Then subtract that total from 60.`, "Example: goal 60, done 20 + 15 + 10 = 45. 60 - 45 = 15 more minutes.", "⏱️"];
  }));
  c.push(C("Pulse check", "💓", "To find your heart rate, count beats for 15 seconds and multiply by 4.", "Beats in 15 seconds times 4 equals beats in 1 minute.", "15 seconds is a quarter of a minute.", () => {
    const k = ri(15, 30), n = pick(NM);
    return [`${n} counts ${k} heartbeats in 15 seconds. How many beats per minute?`, k * 4, "A minute is made of four 15-second parts. Do you add or multiply?", `Multiply ${k} by 4, or double ${k} and double again.`, "Example: 10 beats in 15 seconds. 10 x 4 = 40 beats per minute.", "💓"];
  }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 4, 7, 9, 11, 13, 15])));
  c.push(MIX("Level 9 Challenge", pk(c, [2, 3, 5, 6, 8, 10, 12, 14, 16, 17])));

  Object.assign(HEALTH_LEVELS, { 7: a, 8: b, 9: c });
})();
