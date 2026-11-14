// Mind Lab Health & Safety. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints.
// Needs math.js and spelling.js loaded first (uses ri, pick, shuf).
const HEALTH_LEVELS = (() => {
  // ---------- makers ----------
  // T: question-and-answer topic. item = [question, answer, optional wrong answers]. "emoji|question" shows the emoji big.
  const T = (title, v, intro, facts, tip, ex, items, nudge) => {
    const f = () => {
      const it = pick(items); let q = it[0], vis;
      const bar = q.indexOf("|"); if (bar > 0) { vis = q.slice(0, bar); q = q.slice(bar + 1); }
      const a = it[1], pool = it[2] || items.map(x => x[1]);
      const wr = shuf([...new Set(pool.filter(x => x !== a))]).slice(0, 2);
      const o = { text: q, choices: shuf([a, ...wr]), answer: a, hints: [nudge || "Read the question slowly, then look at every choice.", tip, "Example: " + ex + " Now do yours."] };
      if (vis) o.visual = vis;
      return o;
    };
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Example", v: "✏️", t: ex + " " + tip }];
    return f;
  };
  // S: sort things into groups. groups = { "Label": ["emoji|name", ...] }
  const S = (title, v, intro, facts, tip, ex, groups, qfmt, nudge) => {
    const labels = Object.keys(groups), all = [];
    labels.forEach(l => groups[l].forEach(n => all.push([n, l])));
    const f = () => {
      const [n, l] = pick(all); let name = n, vis;
      const bar = n.indexOf("|"); if (bar > 0) { vis = n.slice(0, bar); name = n.slice(bar + 1); }
      const ch = shuf([l, ...shuf(labels.filter(x => x !== l)).slice(0, 2)]);
      const o = { text: qfmt(name), choices: ch, answer: l, hints: [nudge || "Think about what this thing is and what it does.", tip, "Example: " + ex + " Now do yours."] };
      if (vis) o.visual = vis;
      return o;
    };
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Example", v: "✏️", t: ex + " " + tip }];
    return f;
  };
  const MIX = (...ms) => {
    const f = () => pick(ms)();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ms.slice(0, 4).map(m => m.teach()[0]));
    return f;
  };
  const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];

  // ---------- computed lessons ----------
  const countFruit = () => {
    const f = () => {
      const fr = ["🍎", "🍌", "🍇", "🍓"], sw = ["🍬", "🍭", "🍩", "🍪"];
      const nf = ri(1, 5), ns = ri(1, 4), arr = [];
      for (let i = 0; i < nf; i++) arr.push(pick(fr));
      for (let i = 0; i < ns; i++) arr.push(pick(sw));
      return { text: "How many <b>fruits</b> are there? (Candy and sweets are not fruit!)", visual: shuf(arr).join(" "), answer: nf,
        wrong: g => (g === nf + ns ? "That counts everything. Count only the fruits." : null),
        hints: ["Look at each picture. Is it a fruit or a sweet?", "Touch the fruits one at a time as you count. Skip the sweets. Fruits are apples, bananas, grapes and strawberries.", "Example: 🍎 🍬 🍌 🍩 has 2 fruits (the apple and the banana). Now do yours."] };
    };
    f.teach = () => [{ h: "Count the fruits", v: "🍎 🍌 🍇", t: "Some foods are healthy every day, like fruit. Today we will count them." },
      { h: "Fruits and sweets", v: "🍎 🍓 vs 🍬 🍩", t: "Apples, bananas, grapes and strawberries are <b>fruit</b>. Candy and donuts are <b>sometimes foods</b>." },
      { h: "Count carefully", v: "🖐️", t: "Point to each fruit and say the next number. Do not count the sweets." }];
    return f;
  };
  const sleepHours = () => {
    const f = () => {
      const b = ri(7, 9), w = ri(5, 7), n = pick(NAMES);
      const eb = (b === 9 && w === 6) ? 10 : 9, ew = (b === 9 && w === 6) ? 5 : 6;
      return { text: `${n} goes to bed at ${b} o'clock at night and wakes up at ${w} o'clock in the morning. How many hours of sleep is that?`, answer: (12 - b) + w,
        hints: ["Break the night into two parts: bedtime until midnight (12), then midnight until the morning.", "Count the hours from bedtime up to 12. Then count the hours from 12 up to the wake-up time. Add the two parts.", `Example: bed at ${eb}, up at ${ew}. From ${eb} to 12 is ${12 - eb} hours. From 12 to ${ew} is ${ew} hours. ${12 - eb} + ${ew} = ${12 - eb + ew}. Now do yours.`] };
    };
    f.teach = () => [{ h: "Sleep time", v: "😴", t: "Kids need lots of sleep, about <b>9 to 12 hours</b> every night, to grow and learn." },
      { h: "Count the hours", v: "8 → 12 → 7", t: "Bed at 8 and up at 7? Count 8 to 12 (4 hours). Then 12 to 7 (7 hours). Add them: 4 + 7 = 11 hours." },
      { h: "Tip", v: "🌙", t: "Split the night into two parts, count each part, then add." }];
    return f;
  };
  const playLeft = () => {
    const f = () => {
      const a = ri(2, 8) * 5, b = ri(2, 8) * 5; const aa = a + b >= 60 ? 20 : a, bb = a + b >= 60 ? 25 : b, n = pick(NAMES);
      const ea = aa === 10 ? 15 : 10, eb = 30;
      return { text: `Kids need about 60 minutes of play and exercise a day. ${n} plays ${aa} minutes at recess and ${bb} minutes after school. How many more minutes to reach 60?`, answer: 60 - aa - bb,
        hints: ["First find how much exercise was already done. Then see how far that is from 60.", "Add the two times together. Then count up (or take away) to reach 60.", `Example: ${ea} + ${eb} = ${ea + eb} minutes done. 60 - ${ea + eb} = ${60 - ea - eb} more. Now do yours.`] };
    };
    f.teach = () => [{ h: "Move every day", v: "🏃", t: "Kids need about <b>60 minutes</b> of moving and playing every day. That can be recess, sports and playing outside." },
      { h: "Add it up", v: "20 + 25 = 45", t: "Add the minutes you already did. Then see how many more you need to get to 60." },
      { h: "Tip", v: "⏱️", t: "Take away: 60 - 45 = 15 more minutes." }];
    return f;
  };
  const brushMin = () => {
    const f = () => {
      const d = ri(2, 7);
      if (Math.random() < 0.4) return { text: "You brush your teeth for 2 minutes in the morning and 2 minutes at night. How many minutes do you brush in one day?", visual: "🪥", answer: 4,
        hints: ["There are two brushing times each day.", "Add the minutes for the morning and the night.", "Example: 3 minutes + 3 minutes = 6 minutes. Now do yours with 2 and 2."] };
      return { text: `You brush for 4 minutes each day. How many minutes do you brush in ${d} days?`, visual: "🪥", answer: 4 * d,
        hints: ["Each day is another 4 minutes. Think of adding 4 again and again.", `Skip count by 4s, ${d} times.`, "Example: 3 minutes a day for 3 days: 3, 6, 9. That is 9 minutes. Now do yours."] };
    };
    f.teach = () => [{ h: "Brushing time", v: "🪥", t: "We brush our teeth <b>2 times a day</b> (morning and night) for <b>2 minutes</b> each time." },
      { h: "Add the minutes", v: "2 + 2 = 4", t: "Two brushing times of 2 minutes each is 4 minutes every day." },
      { h: "Tip", v: "⏱️", t: "Skip count by 4s to find the minutes over many days: 4, 8, 12, 16." }];
    return f;
  };

  // ---------- topics ----------
  const H = {
    // ===== LEVEL 1 =====
    wash: T("Washing hands", "🧼", "Our hands touch lots of things all day, so they pick up tiny <b>germs</b>. Washing sends the germs down the drain.", "Use <b>soap and water</b>. Scrub for <b>20 seconds</b>. Rinse, then dry your hands.", "Think about what really cleans hands, and how long it takes.", "To clean sticky hands after lunch, you would use soap, rub them, rinse them and dry them.", [
      ["🧼|What do we use with water to wash our hands?", "Soap", ["Sand", "Juice"]], ["How long should we scrub our hands?", "20 seconds", ["2 seconds", "5 seconds"]],
      ["What do we do after we scrub?", "Rinse and dry", ["Wipe on our shirt", "Walk away"]], ["Where do the germs go when we rinse?", "Down the drain", ["Into our mouth", "Onto our face"]],
      ["Which parts do we scrub?", "Fronts, backs and between fingers", ["Only our thumbs", "Only our elbows"]], ["What can we sing to count to 20 seconds?", "Happy Birthday, two times", ["One tiny word", "Nothing at all"]],
      ["Why do we wash our hands?", "To get rid of germs", ["To make them cold", "To make them bigger"]], ["💧|What do we need besides soap?", "Water", ["Glue", "Paint"]]]),
    whenWash: T("When to wash hands", "🚰", "Some times are extra important for washing hands. Can you spot them?", "Wash <b>before eating</b>, <b>after the bathroom</b>, after playing outside, after petting animals and after sneezing.", "Ask: could my hands have germs right now, or am I about to eat?", "After you play in the dirt, your hands are dirty, so you wash them.", [
      ["🍎|You are about to eat a snack. What should you do first?", "Wash your hands", ["Rub your eyes", "Wipe them on the floor"]], ["🚽|You just used the bathroom. What do you do?", "Wash your hands", ["Skip it", "Touch your food"]],
      ["🐕|You just petted a dog. What should you do?", "Wash your hands", ["Put them in your mouth", "Hide them"]], ["🤧|You sneezed into your hands. What now?", "Wash your hands", ["Wave at a friend", "Eat a cookie"]],
      ["🌳|You played outside in the dirt. What now?", "Wash your hands", ["Go straight to eat", "Rub your nose"]], ["🍪|You will help bake cookies. What first?", "Wash your hands", ["Lick the spoon", "Touch the floor"]],
      ["🎨|Your hands are covered in paint. What do you use?", "Soap and water", ["Dry paper only", "Your shirt"]]]),
    teeth: T("Brushing teeth", "🪥", "Our teeth help us bite, chew and smile. We need to keep them clean and strong!", "Brush <b>2 times a day</b> for <b>2 minutes</b>. Use a <b>pea-sized</b> bit of toothpaste. Spit it out when you are done.", "Think about how often and how long a healthy brush is.", "In the morning and at night you brush, so that is two times a day.", [
      ["🪥|How many times a day should we brush?", "2 times", ["0 times", "20 times"]], ["How long should we brush each time?", "2 minutes", ["2 seconds", "20 minutes"]],
      ["How much toothpaste do we use?", "A pea-sized bit", ["The whole tube", "None at all"]], ["What do we do with the toothpaste when we finish?", "Spit it out", ["Swallow it all", "Save it for later"]],
      ["When is one good time to brush?", "Before bed", ["Never", "Only on holidays"]], ["Which tool brushes our teeth?", "A toothbrush", ["A hairbrush", "A paintbrush"]],
      ["What helps keep teeth strong?", "Brushing and visiting the dentist", ["Chewing on toys", "Eating candy all day"]], ["Who checks our teeth to keep them healthy?", "A dentist", ["A pilot", "A baker"]]]),
    everyday: S("Everyday or sometimes food?", "🥦", "Some foods help our bodies grow strong. Other foods are fun treats for <b>sometimes</b>.", "<b>Everyday foods</b> are fruits, veggies, milk and whole grains. <b>Sometimes foods</b> are candy, soda, chips and sweets.", "Ask: does it grow from the ground or come from a healthy source? Or is it a sugary treat?", "An apple is an everyday food. A candy bar is a sometimes food.", {
      "Everyday food": ["🍎|an apple", "🥕|a carrot", "🥦|broccoli", "🍌|a banana", "🥛|milk", "🍞|whole grain bread", "🍇|grapes"],
      "Sometimes food": ["🍬|candy", "🍩|a donut", "🍪|a cookie", "🥤|soda", "🍰|cake", "🍟|french fries", "🍦|ice cream"] }, n => `Is <b>${n}</b> an everyday food or a sometimes food?`),
    fruitVeg: S("Fruit or vegetable?", "🍓", "Fruits and vegetables come from plants and are full of vitamins. They are great for our bodies.", "<b>Fruits</b> are often sweet, like apples and bananas. <b>Vegetables</b> are things like carrots, broccoli and lettuce.", "Think about the taste and where it grows. Sweet and juicy is often a fruit.", "A strawberry is a fruit. A carrot is a vegetable.", {
      "Fruit": ["🍎|an apple", "🍌|a banana", "🍇|grapes", "🍓|a strawberry", "🍊|an orange", "🍉|a watermelon", "🍐|a pear", "🍒|cherries"],
      "Vegetable": ["🥕|a carrot", "🥦|broccoli", "🥬|lettuce", "🥔|a potato", "🌽|corn", "🧅|an onion"] }, n => `Is <b>${n}</b> a fruit or a vegetable?`),
    water: T("Drinking water", "💧", "Our bodies are made up of lots of water. We need to drink it every day to feel good.", "Water is the best drink for our bodies. Drink water when you are <b>thirsty</b> and after you <b>play or run</b>.", "Think about which drink our body needs most, and when we feel thirsty.", "After running around at recess, you feel hot and thirsty, so you drink water.", [
      ["💧|Which drink is best for our bodies?", "Water", ["Soda", "Syrup"]], ["When should we drink water?", "When thirsty and after playing", ["Never", "Only on birthdays"]],
      ["🏃|You just ran hard. What does your body want?", "A drink of water", ["More candy", "A nap on the floor"]], ["Why do we need water?", "Our body needs it to work", ["To get dirty", "It is not needed"]],
      ["Which of these has water?", "A glass of water", ["A dry sock", "A rock"]], ["☀️|It is a hot day. What should you do?", "Drink water", ["Skip drinks", "Eat only sweets"]],
      ["How can you bring water to school?", "In a water bottle", ["In a paper bag", "In your pocket"]]]),
    sleep: T("Sleep", "😴", "Sleep gives our body and brain a rest. While we sleep, we grow!", "Kids need lots of sleep every night. A <b>quiet, dark room</b> helps us sleep well.", "Think about what helps our body feel calm and ready to rest.", "Before bed you brush your teeth and read a story, and then you fall asleep.", [
      ["🌙|When do we sleep?", "At night", ["At lunch", "At recess"]], ["What helps us fall asleep?", "A quiet, dark room", ["Loud music", "Bright lights"]],
      ["What is a good thing to do before bed?", "Read a book", ["Run laps", "Drink soda"]], ["Why do we sleep?", "Our body rests and grows", ["To get taller than a tree", "For no reason"]],
      ["😴|How do you feel when you did not sleep enough?", "Tired", ["Super strong", "Ready to run"]], ["Where do we usually sleep?", "In a bed", ["On a bus", "In the bathtub"]],
      ["After a good sleep, how do you feel?", "Rested and ready", ["Sleepy all day", "Sick"]]]),
    exercise: T("Moving our bodies", "🏃", "Exercise means moving your body so it gets strong. Playing is exercise too!", "Running, jumping, dancing, swimming and riding a bike are all exercise. Sitting all day is not.", "Ask: is my body moving a lot, or sitting still?", "Dancing to music gets your whole body moving, so it is exercise.", [
      ["🏃|Which one is exercise?", "Running at the park", ["Watching TV", "Sleeping"]], ["💃|Which one is exercise?", "Dancing", ["Sitting still", "Looking at a screen"]],
      ["🚲|Which one is exercise?", "Riding a bike", ["Lying on the couch", "Eating dinner"]], ["🏊|Which one is exercise?", "Swimming", ["Napping", "Reading in bed"]],
      ["Exercise makes our bodies…", "Strong", ["Sleepy forever", "Smaller"]], ["Where can we play and move?", "At the park", ["In a closet", "Under a blanket all day"]],
      ["🤸|Which one is exercise?", "Jumping rope", ["Sitting in a chair", "Standing still"]]]),
    faces: T("Feelings faces", "😊", "Everybody has feelings. Feelings are okay! Faces can show us how someone feels.", "Feelings have names: <b>happy, sad, angry, scared, surprised, tired</b>.", "Look at the eyes and the mouth. They tell you the feeling.", "A big smile means a person feels happy.", [
      ["😊|How does this face feel?", "Happy", ["Sad", "Angry"]], ["😢|How does this face feel?", "Sad", ["Happy", "Surprised"]], ["😠|How does this face feel?", "Angry", ["Happy", "Sleepy"]],
      ["😨|How does this face feel?", "Scared", ["Happy", "Angry"]], ["😴|How does this face feel?", "Tired", ["Excited", "Scared"]], ["😲|How does this face feel?", "Surprised", ["Sad", "Sleepy"]],
      ["🤩|How does this face feel?", "Excited", ["Sad", "Tired"]], ["😟|How does this face feel?", "Worried", ["Excited", "Silly"]]]),
    kind: T("Kind words", "💬", "Words can make people smile or feel sad. We choose kind words!", "Kind words are <b>please, thank you, sorry</b> and \"Do you want to play?\". Unkind words hurt feelings.", "Ask: would this make someone feel good or feel bad?", "Saying \"thank you\" for a gift is a kind thing to say.", [
      ["Which is a kind thing to say?", "Thank you for helping me", ["Go away", "That is a silly drawing"]], ["Which is a kind thing to say?", "Do you want to play with me?", ["You can't play", "I don't like you"]],
      ["You bump into a friend. What do you say?", "I'm sorry", ["Move!", "Nothing, and run"]], ["You want a crayon. What do you say?", "May I have it, please?", ["Give me that!", "It's mine!"]],
      ["Someone shares with you. What do you say?", "Thank you", ["Whatever", "Nothing"]], ["A friend is sad. What is kind to say?", "Do you want a hug or help?", ["Stop crying", "That is boring"]],
      ["Which one makes people feel good?", "Nice words", ["Mean words", "Yelling"]]]),
    safeUnsafe: S("Safe or not safe?", "🦺", "We want to stay safe every day. Some things keep us safe and some things can hurt us.", "<b>Safe</b>: seat belts, helmets, holding a grown-up's hand. <b>Not safe</b>: running into the street, playing with matches, touching hot things.", "Ask: could I get hurt doing this? If yes, it is not safe.", "Wearing a seat belt is safe. Running into the street is not safe.", {
      "Safe": ["🚗|wearing a seat belt", "🚲|wearing a helmet on a bike", "👨‍👧|holding a grown-up's hand in a parking lot", "🧴|putting on sunscreen", "🚦|crossing at the crosswalk", "🏊|swimming with a grown-up"],
      "Not safe": ["🔥|playing with matches", "🏃|running into the street", "♨️|touching a hot stove", "🍄|eating a berry you found", "🏊|swimming all alone", "🪜|climbing up on a high shelf"] }, n => `Is <b>${n}</b> safe or not safe?`),
    street: T("Crossing the street", "🚦", "Streets have cars, so we need to be extra careful when we cross.", "<b>Stop</b> at the curb. <b>Look</b> both ways. Cross with a grown-up at the crosswalk. Red means <b>stop</b>.", "Think about stopping, looking, and holding a grown-up's hand.", "At the curb, you stop and look left and right before you step into the street.", [
      ["What do we do first at the curb?", "Stop", ["Run", "Close our eyes"]], ["What do we look for?", "Cars coming both ways", ["Only clouds", "Only birds"]],
      ["🚦|A red light means…", "Stop", ["Go fast", "Dance"]], ["Where do we cross the street?", "At the crosswalk", ["Anywhere in the middle", "Between parked cars"]],
      ["Who do we cross with when we are little?", "A grown-up", ["Nobody", "A toy"]], ["Your ball rolls into the street. What do you do?", "Ask a grown-up to help", ["Run after it", "Throw another ball"]],
      ["🚶|The walk signal shows a walking person. What does it mean?", "We can walk when it is safe", ["We must run", "Stay forever"]]]),
    trusted: T("Trusted grown-ups", "🧑‍🏫", "A <b>trusted grown-up</b> is someone who keeps you safe and helps you, like a parent, grandparent or teacher.", "If something feels <b>wrong, scary or unsafe</b>, tell a trusted grown-up. You will never get in trouble for asking for help.", "Think about who keeps you safe: family, teachers and school helpers.", "If you get hurt at school, you tell your teacher.", [
      ["Who is a trusted grown-up?", "A parent or a teacher", ["Someone you never met", "A pretend friend online"]], ["Something feels scary. What do you do?", "Tell a trusted grown-up", ["Keep it a secret", "Hide it"]],
      ["You get a scrape at school. Who do you tell?", "Your teacher", ["No one", "A stranger"]], ["Do trusted grown-ups want to help you?", "Yes, they do", ["Never", "Only on Mondays"]],
      ["You feel lost in a store. Who can help?", "A worker in the store", ["Someone who offers candy in a car", "Nobody"]], ["Who can you ask if you are not sure something is safe?", "A trusted grown-up", ["Anyone online", "A stranger"]],
      ["👩‍🏫|Which of these is a trusted grown-up at school?", "Your teacher", ["A person you don't know", "A voice in a video game"]]]),
    germs: T("Germs and sneezes", "🤧", "Germs are tiny living things we cannot see. Some can make us sick, and they travel when we cough and sneeze.", "Cover a sneeze or cough with your <b>elbow</b> or a <b>tissue</b>. Then wash your hands.", "Think about how to keep germs from flying onto other people.", "If you feel a sneeze coming, sneeze into your elbow so the germs stay with you.", [
      ["🤧|Where should you sneeze?", "Into your elbow", ["Onto a friend", "Into the air"]], ["What do you use to blow your nose?", "A tissue", ["Your sleeve and your hand", "A leaf"]],
      ["What do you do after you use a tissue?", "Throw it away and wash hands", ["Put it in your pocket", "Give it to a friend"]], ["Can we see germs?", "No, they are too small", ["Yes, they are big", "Only at night"]],
      ["How do germs travel?", "On hands and in coughs", ["By jumping to the moon", "By cars only"]], ["What stops germs?", "Washing hands", ["Wiping with dirty hands", "Touching our face"]],
      ["Sam has a cold. What helps?", "Rest and tell a grown-up", ["Run a race", "Hug everyone"]]]),
    sun: T("Sun safety", "☀️", "The sun is wonderful, but too much sun can hurt our skin.", "Wear <b>sunscreen</b>, a <b>hat</b> and sunglasses. Play in the <b>shade</b> when the sun is strong. Drink water.", "Think about what blocks the sun from your skin.", "At the beach, you put on sunscreen and a hat before you play.", [
      ["🧴|What protects our skin from the sun?", "Sunscreen", ["Mud", "Glitter"]], ["👒|What can you wear on your head in the sun?", "A hat", ["A bowl of soup", "Boots"]],
      ["Where can you rest on a hot sunny day?", "In the shade", ["On hot pavement", "In the sun all day"]], ["🕶️|What protects our eyes?", "Sunglasses", ["Mittens", "A scarf"]],
      ["What should we drink when it is hot?", "Water", ["Nothing", "Syrup"]], ["When do we put on sunscreen?", "Before we go outside", ["After we go home", "Never"]],
      ["Is it okay to look right at the sun?", "No, never", ["Yes, for a long time", "Only with a spoon"]]]),
    senses: T("Our five senses", "👀", "We learn about the world with our five senses: sight, hearing, smell, taste and touch.", "<b>Eyes</b> see. <b>Ears</b> hear. <b>Nose</b> smells. <b>Tongue</b> tastes. <b>Skin</b> touches.", "Match the body part to its job.", "We use our nose to smell a flower.", [
      ["👀|What do we use to see?", "Eyes", ["Ears", "Nose"]], ["👂|What do we use to hear?", "Ears", ["Eyes", "Tongue"]], ["👃|What do we use to smell?", "Nose", ["Ears", "Hands"]],
      ["👅|What do we use to taste?", "Tongue", ["Nose", "Knees"]], ["✋|What do we use to feel something soft?", "Skin and hands", ["Eyes only", "Ears only"]],
      ["🌹|Which sense do we use to smell a flower?", "Smell", ["Hearing", "Sight"]], ["🎵|Which sense do we use to listen to music?", "Hearing", ["Taste", "Smell"]], ["🍋|Which sense tells us a lemon is sour?", "Taste", ["Hearing", "Sight"]]]),
    countFruit: countFruit(),
    playground: T("Playground safety", "🛝", "The playground is a place for fun. We follow rules so everyone stays safe.", "Go down the slide <b>sitting, feet first</b>. <b>Wait your turn</b>. Keep hands and feet to yourself. Tell a grown-up if someone is hurt.", "Think about what keeps you and your friends safe on the equipment.", "On the swing you sit down, hold on tight and wait for it to stop before you hop off.", [
      ["How do we go down the slide?", "Sitting, feet first", ["Head first", "Standing up"]], ["Someone is on the ladder. What do you do?", "Wait your turn", ["Push past", "Pull them down"]],
      ["How do we sit on a swing?", "Sit down and hold on", ["Stand up on it", "Swing sideways"]], ["Should we walk close in front of swings?", "No, stay away", ["Yes, always", "Only if running"]],
      ["Your friend gets hurt. What do you do?", "Get a grown-up", ["Laugh", "Leave"]], ["What shoes are best for the playground?", "Sneakers", ["Slippery socks", "No shoes on hot ground"]],
      ["Is pushing on the playground okay?", "No, keep hands to yourself", ["Yes, it's fun", "Only on the slide"]]])
  };
  Object.assign(H, {
    // ===== LEVEL 2 =====
    foodGroups: S("Food groups", "🍽️", "Food comes in groups. Eating from every group gives our bodies what they need.", "<b>Fruits</b>, <b>vegetables</b>, <b>grains</b> (bread, rice), <b>protein</b> (eggs, chicken, beans) and <b>dairy</b> (milk, cheese).", "Think about where the food comes from, or what it is made of.", "Bread is made from grains, so it is in the grains group.", {
      "Fruits": ["🍎|an apple", "🍌|a banana", "🍇|grapes", "🍊|an orange"],
      "Vegetables": ["🥕|carrots", "🥦|broccoli", "🥬|lettuce", "🌽|corn"],
      "Grains": ["🍞|bread", "🍚|rice", "🍝|pasta", "oatmeal"],
      "Protein": ["🥚|an egg", "🍗|chicken", "🐟|fish", "🫘|beans"],
      "Dairy": ["🥛|milk", "🧀|cheese", "yogurt"] }, n => `Which food group is <b>${n}</b> in?`),
    snacks: T("Healthy snacks", "🥕", "A snack gives us energy between meals. A healthy snack helps us feel good.", "Healthy snacks: <b>fruit, veggies with dip, yogurt, cheese, nuts (if allowed), popcorn</b>. Candy and soda are sometimes treats.", "Pick the snack that is a fruit, vegetable, dairy or whole grain.", "A bowl of strawberries is a healthy snack.", [
      ["Which is a healthy snack?", "Apple slices", ["A candy bar", "A soda"]], ["Which is a healthy snack?", "Carrots and dip", ["A bag of gummy worms", "Frosting"]],
      ["Which is a healthy snack?", "Yogurt with berries", ["A big bag of candy", "A lollipop"]], ["Which is a healthy snack?", "A cheese stick", ["Cotton candy", "Chocolate syrup"]],
      ["Which is a healthy snack?", "Banana slices", ["Fried chips every day", "Sugary cereal bars"]], ["Which drink is the best with a snack?", "Water or milk", ["Soda", "Sugar punch"]],
      ["Which is a sometimes treat?", "Cake", ["Carrot sticks", "An orange"]]]),
    bedtime: T("Bedtime routine", "🛏️", "A bedtime routine is the same steps every night that help us get ready to sleep.", "Bath, <b>brush teeth</b>, pajamas, a story, lights out. Screens off before bed helps us rest.", "Think about what you do in order each night.", "After you put on pajamas, you brush your teeth and read a story.", [
      ["Which is part of a bedtime routine?", "Brushing teeth", ["Playing a loud game", "Running outside"]], ["What helps us feel calm before bed?", "Reading a story", ["Jumping on the bed", "Watching a long show"]],
      ["Which should be off before bed?", "Screens", ["Pajamas", "The blanket"]], ["What do you put on to sleep?", "Pajamas", ["A raincoat", "Boots"]],
      ["Lights should be…", "Low or off", ["Super bright", "Flashing"]], ["Why is a routine good?", "It helps your body know it is time to sleep", ["It makes you louder", "It is a game"]],
      ["Which is a good bedtime snack choice?", "Nothing big, maybe a small drink of water", ["A huge sugary dessert", "Soda"]]]),
    whyExercise: T("Why we exercise", "💪", "Exercise helps our bodies and our minds. It can even make us feel happy!", "Exercise makes our <b>heart, bones and muscles strong</b>. It helps us <b>sleep well</b> and feel happy.", "Ask: does this help my body get stronger or feel better?", "Running makes your heart strong, so exercise helps your heart.", [
      ["What does exercise make strong?", "Our muscles and heart", ["Only our hair", "Our shoes"]], ["Exercise can help us…", "Sleep well", ["Forget everything", "Never get tired"]],
      ["How does exercise make us feel?", "Happier", ["Always grumpy", "Invisible"]], ["Which is good for our bones?", "Jumping and playing", ["Lying still all day", "Skipping meals"]],
      ["What should we do every day?", "Move and play", ["Sit for 12 hours", "Hide from the sun"]], ["Which is a fun way to exercise?", "Playing tag", ["Watching more TV", "Sleeping late"]],
      ["Exercise helps our brains to…", "Focus and learn", ["Stop working", "Become smaller"]]]),
    feelAction: T("What can I do?", "🧡", "Big feelings are okay. What matters is what we do with them.", "When you feel mad or sad, you can <b>breathe</b>, <b>take a break</b>, <b>talk to someone</b> or <b>draw</b>. We do not hurt anyone.", "Pick the choice that is safe and kind to everyone.", "If you feel angry, you can take a deep breath instead of yelling.", [
      ["😠|You feel angry. What can you do?", "Take deep breaths", ["Yell at a friend", "Throw your toys at people"]], ["😢|You feel sad. What can you do?", "Tell a grown-up how you feel", ["Hide it forever", "Say mean things"]],
      ["😨|You feel scared. What can you do?", "Tell someone you trust", ["Pretend nothing is wrong", "Run away alone"]], ["😟|You feel worried about a test. What helps?", "Talk about it", ["Never speak", "Stay up all night"]],
      ["😤|You are frustrated with a puzzle. What helps?", "Take a break and try again", ["Break the puzzle", "Give up forever"]], ["😔|A friend feels left out. What can you do?", "Ask them to play", ["Ignore them", "Laugh"]],
      ["😊|You feel really happy. What can you do?", "Share it with a friend", ["Keep it a secret", "Be mean"]]]),
    calm: T("Calm-down tools", "🧘", "We all get upset sometimes. Calm-down tools help our bodies and minds relax.", "Try <b>belly breaths</b> (breathe in slowly, then out), <b>counting to 10</b>, a quiet corner, or a drink of water.", "Choose the thing that helps your body slow down.", "Smell a flower (breathe in), blow out the candle (breathe out). Do it three times.", [
      ["Which helps us calm down?", "Slow, deep breaths", ["Yelling louder", "Running in circles"]], ["Which helps us calm down?", "Counting to 10", ["Counting to 1 and shouting", "Stomping"]],
      ["Which helps us calm down?", "A quiet corner", ["A loud room", "A bumpy ride"]], ["Which helps us calm down?", "Squeezing a soft pillow", ["Squeezing your friend", "Throwing the pillow at someone"]],
      ["🌬️|Belly breathing means we…", "Breathe in slowly and out slowly", ["Hold our breath forever", "Breathe very fast"]], ["Which helps us calm down?", "Drawing a picture", ["Slamming a door", "Saying mean words"]],
      ["After you calm down, you can…", "Talk about what happened", ["Be even angrier", "Pretend it's fine"]]]),
    space: T("Personal space and asking", "🤝", "Everyone has <b>personal space</b>, the bubble of room around them. Our bodies belong to us!", "Stay about an <b>arm's length</b> away when you talk. <b>Ask first</b> before hugging. Say <b>\"stop\"</b> if you don't like it, and stop when someone says it.", "Ask: did the other person say yes? If not, give them space.", "Before you hug a friend, you ask \"Can I give you a hug?\" and wait for yes.", [
      ["How far away is a good personal space?", "About an arm's length", ["Nose to nose", "Standing on their toes"]], ["Before you hug a friend, you should…", "Ask first", ["Just do it", "Hug very tight"]],
      ["Someone says \"stop.\" What do you do?", "Stop right away", ["Keep going", "Laugh"]], ["You don't want a hug. What can you say?", "No thank you, a high five is good", ["Nothing, ever", "Hit them"]],
      ["Whose body is it?", "Your own body is yours", ["Everybody's", "Nobody's"]], ["Something touches you in a way that feels wrong. What do you do?", "Say stop and tell a trusted grown-up", ["Keep it a secret", "Say nothing"]],
      ["A friend wants space. You can…", "Give them room", ["Follow them closely", "Stand on them"]]]),
    bikeSafe: T("Bikes and helmets", "🚲", "Riding a bike is fun. A helmet protects the head that holds our brain!", "Always wear a <b>helmet</b>. Ride where a grown-up says it is safe. Stop and look at corners and driveways.", "Think about what protects your head and where is safe to ride.", "Before you hop on your bike, you buckle your helmet.", [
      ["⛑️|What do you wear on your head on a bike?", "A helmet", ["A paper hat", "A scarf"]], ["Where is a safe place to learn to ride?", "A flat, safe path with a grown-up", ["A busy road", "A steep hill alone"]],
      ["Your helmet should be…", "Buckled snugly", ["Off", "On the handlebars"]], ["At a corner you should…", "Stop and look", ["Speed up", "Close your eyes"]],
      ["Which is the safe choice?", "Wear shoes, not flip-flops", ["Ride barefoot on a road", "Ride in the dark with no lights"]], ["Does a helmet also help on a scooter?", "Yes", ["No", "Only on Tuesdays"]],
      ["Who should you ride with when you are little?", "A grown-up nearby", ["A stranger", "Nobody and fast"]]]),
    fire: T("Fire safety", "🧯", "Fire can be useful, like in a stove, but it can also be dangerous. Kids stay safe by letting grown-ups handle it.", "<b>Matches and lighters</b> are for grown-ups only. A <b>smoke alarm</b> beeps to warn us. If it goes off, <b>get out</b> and meet outside.", "Think: fire tools are for grown-ups. If an alarm beeps, go outside.", "If you find matches, you leave them alone and tell a grown-up.", [
      ["🔥|Who may use matches and lighters?", "Only grown-ups", ["Kids who are careful", "Anyone who wants to"]], ["You find matches. What do you do?", "Leave them and tell a grown-up", ["Play with them", "Hide them in your room"]],
      ["🔔|The smoke alarm beeps. What do you do?", "Go outside to your meeting spot", ["Hide under the bed", "Turn it off and go back to play"]], ["What does a smoke alarm do?", "Warns us with a loud beep", ["Plays music", "Makes toast"]],
      ["If there is smoke, you should stay…", "Low to the ground", ["Standing very tall", "Dancing"]], ["Where is a meeting spot?", "A safe place outside your home", ["Inside a closet", "On the roof"]],
      ["🚒|Who helps in a fire?", "Firefighters", ["Bakers", "Clowns"]]]),
    call911: T("Calling 911", "📞", "In an <b>emergency</b>, when someone needs help right away, you can call <b>911</b> (in the United States).", "Call 911 for a <b>fire</b>, if someone is <b>badly hurt</b> or very sick, or if you need help right away. It is <b>not</b> for fun or prank calls.", "Ask: is it a real emergency that needs help right now?", "A grown-up fell and cannot get up. That is an emergency, so you call 911.", [
      ["Which number do you call in an emergency?", "911", ["123", "555"]], ["When should you call 911?", "Someone is badly hurt", ["You are bored", "You want to say hello"]],
      ["When should you call 911?", "There is a fire", ["Your toy is broken", "You lost a sock"]], ["Is 911 for jokes?", "No, only emergencies", ["Yes, it's funny", "Yes, at night"]],
      ["Who answers when you call 911?", "A helper who sends help", ["A robot clown", "A pizza cook"]], ["After you call, you should…", "Stay on the phone and answer questions", ["Hang up right away", "Put the phone in the fridge"]],
      ["Which is NOT an emergency?", "You want a snack", ["Someone is choking", "There is a fire"]]]),
    stranger: T("Strangers and safe grown-ups", "🛡️", "A <b>stranger</b> is someone you do not know. Most people are kind, but kids need a plan to stay safe.", "Never go anywhere with someone you don't know. Don't take gifts or rides without a grown-up's yes. <b>No secrets</b> from your parents. Tell a trusted grown-up.", "Check with your trusted grown-up first. If something feels wrong, say no and get help.", "A stranger offers candy. You say no, walk away and tell your grown-up.", [
      ["A stranger asks you to come see a puppy. What do you do?", "Say no and tell a trusted grown-up", ["Go with them", "Follow quietly"]], ["A stranger offers you a ride. What do you do?", "Say no and walk to a safe grown-up", ["Hop in", "Ask for a snack"]],
      ["Someone says, \"Keep this a secret from your parents.\" What do you do?", "Tell a trusted grown-up", ["Keep the secret", "Do what they say"]], ["Who should you check with before going anywhere?", "Your parent or trusted grown-up", ["A stranger", "Nobody"]],
      ["You feel unsafe. What can you do?", "Get to a safe place and tell a grown-up", ["Stay quiet", "Hide alone"]], ["A stranger knows your name from your backpack. Should you go with them?", "No", ["Yes", "Maybe, if they smile"]],
      ["Can strangers give you gifts without asking your grown-up?", "No, check first", ["Yes, always", "Only candy"]]]),
    waterSafe: T("Water safety", "🏊", "Pools, lakes and the ocean are fun, but water can be dangerous. A few rules keep us safe.", "Swim <b>with a grown-up</b> watching. Wear a <b>life jacket</b> on boats. <b>Walk</b> by the pool, don't run. Never go in alone.", "Think: who is watching you, and are you wearing the right gear?", "At the lake you put on a life jacket and swim where a grown-up can see you.", [
      ["🏊|Who should be with you when you swim?", "A grown-up watching", ["Nobody", "A toy boat"]], ["⛵|What do you wear on a boat?", "A life jacket", ["A sweater", "A backpack"]],
      ["How do you move around the pool?", "Walk", ["Run fast", "Slide on your belly"]], ["Is it okay to swim alone?", "No, never", ["Yes, if it's sunny", "Yes, if you're quick"]],
      ["You see a pool with no grown-up. What do you do?", "Stay out and tell a grown-up", ["Jump in", "Dare a friend"]], ["Before swimming, you should…", "Ask a grown-up", ["Hide your towel", "Skip the rules"]],
      ["Which keeps you safer at the beach?", "Staying where the grown-up can see you", ["Swimming far away", "Chasing waves alone"]]]),
    medicine: T("Medicine safety", "💊", "Medicine helps sick people feel better, but it can be dangerous if we use it the wrong way.", "Take medicine <b>only from a trusted grown-up</b>. Medicine is <b>not candy</b>. If you find pills, <b>don't touch</b> them and tell a grown-up.", "Ask: did a trusted grown-up give this to me?", "You feel sick, so a parent gives you the right medicine in the right amount.", [
      ["Who can give you medicine?", "A trusted grown-up", ["A friend", "Nobody, take it yourself"]], ["Is medicine candy?", "No, never", ["Yes", "Only the colorful ones"]],
      ["💊|You find pills on the floor. What do you do?", "Don't touch them and tell a grown-up", ["Taste one", "Give one to a friend"]], ["Where should medicine be kept?", "Up high, away from kids", ["In your backpack", "On the playground"]],
      ["A friend offers you a pill. What do you do?", "Say no and tell a grown-up", ["Take it", "Hide it"]], ["Vitamins should be taken…", "When a grown-up says so", ["Whenever you like", "By the handful"]],
      ["Why do we follow medicine rules?", "To stay safe", ["To be silly", "For no reason"]]]),
    germs2: T("How germs spread", "🦠", "Germs hop from person to person on hands, coughs and shared things.", "Germs spread by <b>touching</b>, <b>coughing</b> and sharing cups. Stop them by washing hands and covering coughs. Stay home when sick.", "Think about what stops the germ from jumping to someone else.", "If you cough into your elbow, germs stay on your sleeve and not on your friend.", [
      ["How can germs spread?", "On hands and through coughs", ["Through a rainbow", "Through a song"]], ["What helps stop germs?", "Washing hands", ["Sharing a cup", "Touching your face"]],
      ["Should you share a drink cup with a friend?", "No, not when germs may be there", ["Yes, always", "Yes, with 10 friends"]], ["You are sick. What is kind to others?", "Stay home and rest", ["Go hug everyone", "Sneeze on people"]],
      ["Which germ-stopper is for a cough?", "Cough into your elbow", ["Cough into your hand and touch others", "Cough at a friend"]], ["What cleans doorknobs and tables?", "A grown-up wiping them", ["Nothing", "Wiping with your sleeve"]],
      ["When should you wash your hands?", "Before eating and after the bathroom", ["Only on holidays", "Never"]]]),
    teethSugar: T("Strong teeth", "🦷", "Sugar can make holes in our teeth called <b>cavities</b>. We protect our teeth every day.", "Brush 2 times a day, <b>limit sweets and soda</b>, drink water, and see the <b>dentist</b> for check-ups.", "Think about what helps teeth and what hurts them.", "After a sweet treat you can drink water and brush later to help your teeth.", [
      ["What can hurt our teeth?", "Too much sugar", ["Water", "Carrots"]], ["What helps teeth stay strong?", "Brushing and the dentist", ["Candy all day", "Chewing hard rocks"]],
      ["Which drink is best for teeth?", "Water", ["Soda", "Sugary juice every hour"]], ["🦷|What is a cavity?", "A little hole in a tooth", ["A kind of toy", "A candy"]], ["Who looks at your teeth?", "A dentist", ["A mailman", "A farmer"]],
      ["Which snack is better for teeth?", "Crunchy apple slices", ["Sticky taffy", "Lollipops"]], ["How often is a check-up?", "A few times a year, as the dentist says", ["Never", "Every minute"]]]),
    unkind: T("When someone is unkind", "🛑", "Sometimes people say or do unkind things. You know what to do.", "Say <b>\"Stop, I don't like that\"</b> in a strong voice. <b>Walk away</b>, and <b>tell a trusted grown-up</b>. Never be mean back, and be kind to the person who is hurt.", "Use words, walk away, and get help from a grown-up.", "If someone calls you a name, you say \"Stop\" and tell your teacher.", [
      ["Someone says something mean to you. What can you do?", "Say \"Stop\" and tell a teacher", ["Say something meaner", "Push them"]], ["You see someone being left out. What can you do?", "Invite them to play", ["Laugh", "Ignore them"]],
      ["A friend is being picked on. What can you do?", "Be kind and tell a grown-up", ["Join in", "Watch and laugh"]], ["Bullying means…", "Being mean again and again", ["Playing a game", "Sharing"]],
      ["You feel hurt by words. Who can help?", "A trusted grown-up", ["No one", "A stranger"]], ["After you tell a grown-up, you are…", "Brave", ["In trouble", "A tattletale"]],
      ["Is it okay to be mean back?", "No, use words and get help", ["Yes", "Yes, always"]]]),
    homeSafe: T("Safe at home", "🏠", "Home is where we feel safe, and we follow a few rules to keep it that way.", "Don't open the door for visitors without a grown-up. Stay away from <b>outlets</b>, <b>cleaners</b> and hot things. Know a grown-up's phone number.", "Ask: would a grown-up say this is safe to touch or do?", "If someone knocks, you get a grown-up and don't open the door yourself.", [
      ["Someone knocks on the door. What do you do?", "Get a grown-up", ["Open it right away", "Yell hello"]], ["Cleaning sprays are…", "For grown-ups only", ["Good to drink", "Toys"]],
      ["Electrical outlets are…", "Not for touching", ["For sticking things in", "For toys"]], ["The oven is hot. What do you do?", "Stay away and ask for help", ["Touch it", "Put your hand inside"]],
      ["You see something broken, like glass. What do you do?", "Don't touch it; tell a grown-up", ["Pick it up", "Sweep it with your hands"]], ["Whose phone number should you know?", "A parent or trusted grown-up", ["A stranger", "A toy store"]],
      ["Are stairs a good place to play tag?", "No, it is not safe", ["Yes", "Yes, with socks"]]]),
    net: T("Using the internet safely", "💻", "The internet is a big place with games and videos. A few rules keep you safe.", "Ask a grown-up <b>before</b> you go online or click. <b>Never share</b> your name, address, school or password. If something feels wrong, <b>tell a grown-up</b>.", "Check with a grown-up before you do anything new online.", "A game asks for your address. You don't type it and you tell a parent.", [
      ["💻|Before you go online, you should…", "Ask a grown-up", ["Do whatever you like", "Tell a stranger"]], ["A website asks for your home address. What do you do?", "Don't share it; tell a grown-up", ["Type it in", "Ask a friend for it"]],
      ["Something online feels weird or scary. What do you do?", "Tell a grown-up", ["Keep clicking", "Hide it"]], ["Who can know your password?", "You and your parents", ["Your friends", "Anyone online"]],
      ["A pop-up says you won a prize. What do you do?", "Don't click; ask a grown-up", ["Click it", "Share it"]], ["Someone you don't know sends you a message. What do you do?", "Don't reply; tell a grown-up", ["Reply with your name", "Send a photo"]],
      ["Is everything online true?", "No, ask a grown-up if unsure", ["Yes, everything", "Only on weekends"]]]),
    brushMin: brushMin()
  });
  Object.assign(H, {
    // ===== LEVEL 3 =====
    groups5: T("The five food groups", "🥗", "The five food groups give our body different gifts. We need foods from all of them.", "<b>Fruits</b> and <b>vegetables</b> give vitamins. <b>Grains</b> give energy. <b>Protein</b> builds muscles. <b>Dairy</b> gives calcium for strong bones.", "Match what the food gives to the group.", "Milk and cheese have calcium, so dairy helps bones.", [
      ["Which group helps build strong muscles?", "Protein", ["Dairy", "Sweets"]], ["Which group gives calcium for strong bones?", "Dairy", ["Grains", "Candy"]], ["Which group gives us a lot of energy, like bread and rice?", "Grains", ["Protein", "Dairy"]],
      ["Which groups are full of vitamins?", "Fruits and vegetables", ["Candy and soda", "Salt and sugar"]], ["Eggs and beans are in which group?", "Protein", ["Dairy", "Fruits"]], ["Cheese and yogurt are in which group?", "Dairy", ["Grains", "Vegetables"]],
      ["Rice, bread and pasta are in which group?", "Grains", ["Protein", "Fruits"]], ["Why do we eat from all the groups?", "Each gives our body something it needs", ["They all taste the same", "To be silly"]]]),
    plate: T("A balanced plate", "🍽️", "A balanced plate has a little of each food group. It helps us grow and play.", "Fill <b>half your plate</b> with fruits and vegetables. The other half is grains and protein, with some dairy on the side.", "Think about what takes the biggest part of a healthy plate.", "If your plate has only french fries, add some fruit and veggies to balance it.", [
      ["What takes about half of a healthy plate?", "Fruits and vegetables", ["Cookies", "Candy"]], ["Which plate is more balanced?", "Chicken, rice, broccoli and an apple", ["Only fries", "Only cake"]],
      ["A plate has bread and cheese. What could you add?", "Some fruit or veggies", ["More cake", "Soda"]], ["How much should we eat in one sitting?", "Enough to feel full, not stuffed", ["Everything in sight", "Nothing"]],
      ["Which meal is balanced?", "Fish, carrots, rice and milk", ["Candy and chips", "A bowl of sprinkles"]], ["Which drink goes well with meals?", "Water or milk", ["Soda", "Syrup"]],
      ["What can you do if you don't like a food?", "Try one bite", ["Throw it", "Never try anything"]]]),
    sleepHours: sleepHours(),
    playLeft: playLeft(),
    body: T("Our body helpers", "🫀", "Our body has many helpers that work all day and all night.", "The <b>heart</b> pumps blood. The <b>lungs</b> help us breathe. The <b>brain</b> thinks. <b>Bones</b> hold us up. <b>Muscles</b> help us move.", "Match the body helper to its job.", "Your lungs fill with air each time you breathe in.", [
      ["🫀|What does the heart do?", "Pumps blood", ["Digests food", "Makes you sneeze"]], ["🫁|What do the lungs do?", "Help us breathe", ["Pump blood", "Help us hear"]],
      ["🧠|What does the brain do?", "Helps us think and learn", ["Pumps blood", "Holds us up"]], ["🦴|What do bones do?", "Hold our body up", ["Think", "Breathe"]],
      ["💪|What do muscles do?", "Help us move", ["Help us see", "Help us smell"]], ["Which helper is in our head?", "The brain", ["The heart", "The lungs"]],
      ["Which body helper breathes in air?", "The lungs", ["The bones", "The brain"]], ["What takes food and turns it into energy?", "The stomach and tummy helpers", ["The knees", "The nose"]]]),
    feelWords: T("Feeling words", "🎭", "There are many feeling words besides happy and sad. The more words you know, the easier it is to say how you feel.", "<b>Proud</b>: you did something good. <b>Nervous</b>: worried about something new. <b>Lonely</b>: you want a friend. <b>Frustrated</b>: it is hard and you want to give up.", "Think about the story. How would you feel?", "If you tied your shoes for the first time, you might feel proud.", [
      ["You won a ribbon at the fair. You feel…", "Proud", ["Lonely", "Nervous"]], ["Tomorrow is your first day at a new school. You may feel…", "Nervous", ["Proud", "Sleepy"]],
      ["Nobody is playing with you at recess. You may feel…", "Lonely", ["Excited", "Silly"]], ["Your tower keeps falling down. You may feel…", "Frustrated", ["Calm and sleepy", "Proud"]],
      ["It's your birthday! You feel…", "Excited", ["Lonely", "Worried"]], ["You broke a friend's toy by accident. You may feel…", "Sorry", ["Proud", "Silly"]],
      ["You are going to a fun party tomorrow. You feel…", "Excited", ["Nervous about nothing", "Sad"]], ["You hear a loud thunder. You may feel…", "Scared or startled", ["Proud", "Very silly"]]]),
    talkFeel: T("Talking about feelings", "🗣️", "Using words about your feelings helps others understand and help you.", "Try saying: <b>\"I feel ___ when ___.\"</b> Talk to a trusted grown-up or a friend. Listen to others, too.", "Look for the choice that names a feeling and says why.", "\"I feel sad when my friend is away\" tells someone how you feel.", [
      ["Which sentence tells how you feel?", "I feel sad when my friend is away", ["You always make me mad", "Whatever"]], ["Which is a kind way to say you are upset?", "I feel upset when you take my turn", ["You're the worst", "I will never talk to you"]],
      ["Your friend says they feel sad. What can you do?", "Listen and be kind", ["Laugh", "Walk away"]], ["Who can you talk to about big feelings?", "A trusted grown-up", ["Nobody", "A stranger online"]],
      ["Is it okay to have a big feeling?", "Yes, all feelings are okay", ["No, never", "Only happy ones"]], ["What do good listeners do?", "Look at the speaker and wait", ["Interrupt", "Look away and yell"]],
      ["After you say how you feel, you can…", "Ask for help or a hug", ["Stay silent forever", "Break things"]]]),
    fixProblem: T("Solving problems kindly", "🕊️", "Friends sometimes disagree. We can solve problems with kind words and fairness.", "Ways to solve it: <b>take turns</b>, <b>share</b>, <b>talk it out</b>, flip a coin, or ask a grown-up to help.", "Look for the answer that is fair to both people.", "Two friends want the same ball, so they take turns.", [
      ["Two friends want the same toy. What is fair?", "Take turns", ["Grab it", "Yell"]], ["You disagree with a friend. What can you do?", "Talk calmly about it", ["Walk away and sulk", "Say mean things"]],
      ["Nobody can agree on a game. What can you do?", "Take a vote or take turns choosing", ["Quit playing", "Push others"]], ["You can't solve it alone. What do you do?", "Ask a grown-up for help", ["Keep fighting", "Hide"]],
      ["You made a mistake and hurt someone. What do you do?", "Say sorry and try to help", ["Pretend it didn't happen", "Blame someone else"]], ["Your friend says sorry. What can you do?", "Say thank you and forgive", ["Stay mad forever", "Say nothing and glare"]],
      ["What does fair mean?", "Everyone gets a turn", ["Only I get one", "The loudest wins"]]]),
    privateInfo: S("Private or okay to share?", "🔒", "Some information is <b>private</b>. Online, you keep private things to yourself and your family.", "<b>Keep private</b>: full name, address, phone number, school name, passwords, and photos of you. <b>Okay to share</b> (with a grown-up's help): your favorite color, animal or food.", "Ask: could a stranger use this to find me? If yes, keep it private.", "Your home address is private. Your favorite color is okay to share.", {
      "Keep private": ["📍|your home address", "📞|your phone number", "🏫|your school name", "🔑|your password", "🪪|your full name", "📸|a photo of yourself"],
      "Okay to share": ["🎨|your favorite color", "🐶|your favorite animal", "🍕|your favorite food", "📚|your favorite story"] }, n => `Is <b>${n}</b> private or okay to share online?`),
    passwords: T("Strong passwords", "🔑", "A password is a secret that keeps an account safe, like a key for a lock.", "Keep passwords <b>secret</b>. Only you and your parents know. Make them <b>long</b>, and don't use your name or birthday. Never type a password because a message asks for it.", "Think of a password like a toothbrush: it is yours, and you do not share it.", "A password like blue-tiger-moon-27 is stronger than your first name.", [
      ["Who may know your password?", "You and your parents", ["Your friends", "A stranger online"]], ["Which password is the strongest?", "blue-tiger-moon-27", ["abc", "my name"]],
      ["A message says, \"Tell me your password to win!\" What do you do?", "Don't tell; ask a grown-up", ["Tell it", "Share it"]], ["Should you use your birthday as a password?", "No, it is too easy to guess", ["Yes, always", "Yes, it's secret"]],
      ["A friend asks for your password. What do you do?", "Say no politely", ["Tell them", "Write it on their hand"]], ["Where should you NOT write your password?", "Where others can see it", ["In a secret place at home your parents know", "In your head"]],
      ["A password is like…", "A key you keep safe", ["A toy to share", "A poster"]]]),
    onlineStrangers: T("People online", "🌐", "Online, people can pretend to be someone they are not. We stay careful and keep a grown-up in the loop.", "Don't chat privately with people you don't know. <b>Never meet</b> someone you only know online. If someone asks for private things or says \"keep it secret,\" <b>stop and tell a parent</b>.", "If it feels wrong, stop replying and tell a parent. You will not be in trouble.", "A stranger in a game says, \"Let's talk in private.\" You stop replying and tell a parent.", [
      ["Someone you don't know wants to chat privately. What do you do?", "Stop and tell a parent", ["Chat with them", "Give your name"]], ["An online \"friend\" wants to meet you. What do you do?", "Say no and tell a parent", ["Go meet them", "Sneak out"]],
      ["Someone online says, \"Don't tell your parents.\" What do you do?", "Tell your parents right away", ["Keep the secret", "Send a picture"]], ["Someone online asks where you live. What do you do?", "Don't answer; tell a parent", ["Tell them", "Give the street only"]],
      ["Can people online pretend to be someone else?", "Yes, they can", ["No, never", "Only on weekends"]], ["A stranger offers you gifts in a game. What do you do?", "Say no and tell a parent", ["Accept", "Ask for more"]],
      ["Who should you tell if something online feels wrong?", "A parent or trusted grown-up", ["The stranger", "No one"]]]),
    kindOnline: T("Being kind online", "💌", "Our words matter online too. Be as kind there as you are in person.", "<b>Think before you send.</b> Use kind words. Do not share someone's picture without a grown-up. Tell a grown-up about mean messages.", "Ask: would I say this to someone's face? Would it make them smile?", "Before sending a message, you read it and make sure it is kind.", [
      ["Before you send a message, you should…", "Think if it is kind", ["Hit send fast", "Add mean words"]], ["You get a mean message. What do you do?", "Don't answer; tell a grown-up", ["Send a meaner one", "Forward it to everyone"]],
      ["Is it okay to share a friend's picture without asking?", "No, ask a grown-up first", ["Yes", "Yes, if it's funny"]], ["Which is a kind comment?", "Great job on your drawing!", ["That's terrible", "You're no good"]],
      ["Words online can…", "Hurt or help", ["Never matter", "Disappear forever"]], ["A friend is sad because of an online message. You…", "Be kind and help them tell a grown-up", ["Tease them", "Ignore them"]],
      ["Be kind online means…", "Treat people the way you want to be treated", ["Only be kind in person", "Say anything"]]]),
    screens: T("Balancing screen time", "📱", "Screens can be fun, but our bodies need other things too.", "Take <b>breaks</b> from screens. Play outside, read, sleep and spend time with family. Ask a grown-up how long you can use a screen.", "Think about what your body and eyes need besides screens.", "After watching a show, you go outside to play and move your body.", [
      ["Your eyes feel tired from the screen. What do you do?", "Take a break", ["Stare longer", "Move closer"]], ["What is a good thing to do after screens?", "Play outside", ["Watch more", "Stay up late"]],
      ["Who decides how long you use a screen?", "You and your grown-up together", ["Nobody", "A stranger"]], ["Screens before bed can…", "Make it hard to sleep", ["Help you grow", "Make you stronger"]],
      ["Which is better for your body?", "Moving and playing", ["Sitting all day", "Lying down all day"]], ["Where should you use screens?", "Where a grown-up can see", ["Hidden under the blanket", "In the dark alone"]],
      ["Balance means…", "A little of many things", ["Only one thing", "Nothing"]]]),
    handOrder: T("Handwashing in order", "🧼", "Washing hands has steps. Doing them in order works best.", "<b>1. Wet</b> your hands. <b>2. Soap</b>. <b>3. Scrub</b> for 20 seconds. <b>4. Rinse</b>. <b>5. Dry</b>.", "Think about the five steps in order: wet, soap, scrub, rinse, dry.", "After you rinse the soap off, the next step is to dry your hands.", [
      ["What is the FIRST step in washing hands?", "Wet your hands", ["Dry your hands", "Rinse"]], ["What comes right after you wet your hands?", "Add soap", ["Dry them", "Leave"]],
      ["What comes after you add soap?", "Scrub for 20 seconds", ["Dry", "Turn off the light"]], ["What comes after you scrub?", "Rinse the soap off", ["Wet again", "Add more dirt"]],
      ["What is the LAST step?", "Dry your hands", ["Add soap", "Scrub"]], ["How long is the scrub step?", "20 seconds", ["2 seconds", "2 hours"]],
      ["What do you use to dry your hands?", "A clean towel", ["Your shoes", "The dirty floor"]]]),
    safeChoices: T("Making safe choices", "🧠", "Every day you make choices. A smart choice keeps you and others safe.", "<b>Stop and think</b>: is this safe? Does a grown-up know? If not, ask first.", "Pick the choice that is safe and kind.", "Before you climb something high, you stop and think, and then you choose a safer way.", [
      ["You want to cross the road. What is the safe choice?", "Wait for a grown-up and use the crosswalk", ["Run across", "Dart between cars"]], ["A friend dares you to jump from a high place. What do you do?", "Say no and stay safe", ["Jump", "Climb higher"]],
      ["You find something sharp. What do you do?", "Leave it and tell a grown-up", ["Pick it up", "Throw it"]], ["It's cold outside. What is the safe choice?", "Wear a coat", ["Go without one", "Wear a swimsuit"]],
      ["A friend wants you to go somewhere without telling a grown-up. What do you do?", "Say no and tell a grown-up", ["Sneak off", "Go anyway"]], ["You smell smoke. What do you do?", "Tell a grown-up and go outside", ["Hide", "Keep playing"]],
      ["Smart choices are…", "Safe and kind", ["Silly and risky", "Fast and loud"]]]),
    emergency: T("What to say in an emergency", "🚑", "If you ever call 911, a helper will ask you questions. Stay calm and answer slowly.", "Say <b>what happened</b> and <b>where you are</b>. Listen and answer the helper's questions. Do not hang up until they tell you.", "Think about what the helper needs to send help.", "You say, \"My grandma fell and she can't get up. We are at our house.\"", [
      ["What number do you call?", "911", ["000", "321"]], ["What do you tell the helper?", "What happened and where you are", ["What your favorite game is", "A joke"]],
      ["How should you talk?", "Calmly and clearly", ["Giggling", "In a whisper only"]], ["When can you hang up?", "When the helper says it's okay", ["Right away", "After you count to 1"]],
      ["Is it okay to call just to see what happens?", "No, only for real emergencies", ["Yes", "Yes, once"]], ["Who comes to help?", "Firefighters, police or ambulance helpers", ["Clowns", "Chefs"]],
      ["Whose phone number is good to know?", "A parent's", ["A stranger's", "No one's"]]]),
    sickDay: T("Taking care when sick", "🤒", "Everyone gets sick sometimes. Taking care of ourselves helps us get well.", "Tell a grown-up. <b>Rest</b>, drink water, stay home so germs don't spread, and take medicine only from a trusted grown-up.", "Think about what helps your body get better and keeps others safe.", "If you have a fever, you tell a parent and rest at home.", [
      ["You feel sick. What do you do first?", "Tell a grown-up", ["Hide it", "Run a race"]], ["What helps your body get better?", "Rest and water", ["Staying up late", "Soda only"]],
      ["Should you go to school with a fever?", "No, stay home and rest", ["Yes", "Yes, with a hat"]], ["Who gives you medicine?", "A trusted grown-up", ["You, alone", "A friend"]],
      ["When you're sick, you should cover coughs with…", "Your elbow or a tissue", ["Your hands then touch friends", "Nothing"]], ["Who can help you get better?", "A doctor or nurse and your family", ["A stranger", "Nobody"]],
      ["When you feel better, you can…", "Slowly get back to playing", ["Forget everything", "Skip handwashing"]]]),
    poison: T("Not-for-eating things", "⚠️", "Some things are not food and can hurt us if we taste or drink them.", "Cleaning sprays, soaps, plants and berries you find, and pills are <b>not for eating or drinking</b>. If you taste something by mistake, tell a grown-up right away.", "Look for the sign: if it is not food from a grown-up, don't taste it.", "A bright berry on a bush looks yummy, but you don't eat it without a grown-up.", [
      ["You find a pretty berry. Can you eat it?", "No, ask a grown-up", ["Yes", "Only a small bite"]], ["Cleaning sprays are for…", "Cleaning, with grown-ups", ["Drinking", "Painting your face"]],
      ["You tasted something you shouldn't. What do you do?", "Tell a grown-up right away", ["Hide it", "Say nothing"]], ["Which is food?", "An apple", ["Soap", "Laundry liquid"]],
      ["Where should cleaning supplies be kept?", "Up high, away from kids", ["On the floor", "In your lunch bag"]], ["A colorful bottle isn't juice. What do you do?", "Don't drink it; ask a grown-up", ["Taste it", "Share it"]],
      ["Plants in the garden are…", "Not for eating unless a grown-up says", ["All yummy", "All safe"]]])
  });

  // ---------- lessons ----------
  const L = (title, make) => ({ title, make });
  return {
    1: [
      L("Washing hands", H.wash), L("When to wash hands", H.whenWash), L("Brushing teeth", H.teeth), L("Everyday or sometimes food?", H.everyday),
      L("Fruit or vegetable?", H.fruitVeg), L("Drinking water", H.water), L("Sleep", H.sleep), L("Moving our bodies", H.exercise),
      L("Feelings faces", H.faces), L("Kind words", H.kind), L("Safe or not safe?", H.safeUnsafe), L("Crossing the street", H.street),
      L("Trusted grown-ups", H.trusted), L("Germs and sneezes", H.germs), L("Sun safety", H.sun), L("Our five senses", H.senses),
      L("Count the fruits", H.countFruit), L("Playground safety", H.playground),
      L("Mixed practice", MIX(H.wash, H.teeth, H.faces, H.street)), L("Level 1 Challenge", MIX(H.everyday, H.safeUnsafe, H.trusted, H.sun, H.kind, H.countFruit))
    ],
    2: [
      L("Food groups", H.foodGroups), L("Healthy snacks", H.snacks), L("Bedtime routine", H.bedtime), L("Why we exercise", H.whyExercise),
      L("What can I do?", H.feelAction), L("Calm-down tools", H.calm), L("Personal space and asking", H.space), L("Bikes and helmets", H.bikeSafe),
      L("Fire safety", H.fire), L("Calling 911", H.call911), L("Strangers and safe grown-ups", H.stranger), L("Water safety", H.waterSafe),
      L("Medicine safety", H.medicine), L("How germs spread", H.germs2), L("Strong teeth", H.teethSugar), L("When someone is unkind", H.unkind),
      L("Safe at home", H.homeSafe), L("Using the internet safely", H.net),
      L("Mixed practice", MIX(H.foodGroups, H.fire, H.call911, H.net)), L("Level 2 Challenge", MIX(H.snacks, H.calm, H.stranger, H.medicine, H.brushMin, H.bikeSafe))
    ],
    3: [
      L("The five food groups", H.groups5), L("A balanced plate", H.plate), L("Sleep math", H.sleepHours), L("Move for 60 minutes", H.playLeft),
      L("Our body helpers", H.body), L("Feeling words", H.feelWords), L("Talking about feelings", H.talkFeel), L("Solving problems kindly", H.fixProblem),
      L("Private or okay to share?", H.privateInfo), L("Strong passwords", H.passwords), L("People online", H.onlineStrangers), L("Being kind online", H.kindOnline),
      L("Balancing screen time", H.screens), L("Handwashing in order", H.handOrder), L("Making safe choices", H.safeChoices), L("What to say in an emergency", H.emergency),
      L("Taking care when sick", H.sickDay), L("Not-for-eating things", H.poison),
      L("Mixed practice", MIX(H.groups5, H.privateInfo, H.onlineStrangers, H.body)), L("Level 3 Challenge", MIX(H.plate, H.sleepHours, H.playLeft, H.passwords, H.emergency, H.feelWords))
    ]
  };
})();
