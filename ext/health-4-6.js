// ext/health-4-6.js  Health & Safety levels 4-6
(() => {
  // item format: "question|answer|wrong1,wrong2|visual(optional)"
  const L = (title, v, intro, key, tip, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p[2].split(/,(?=\S)/), v: p[3] || "" }; });
    const make = () => {
      const it = pick(its);
      const ex = pick(its.filter(x => x.a !== it.a && x.q !== it.q));
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...shuf(it.w).slice(0, 2)]), answer: it.a,
        hints: [nudge || "Read the question slowly, then look at every choice. Which ones are unsafe or unhealthy?", tip, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: key }, { h: "Remember", v: "✏️", t: tip }];
    return { title, make };
  };
  // computed: gen() returns [text, answer, hint1, hint2, exampleText, visual]
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

  // ================= LEVEL 4 =================
  const a = [];
  a.push(L("Body systems", "🫀", "Your body has parts that work together as <b>systems</b>. Each system has a job.", "The <b>heart</b> pumps blood. The <b>lungs</b> bring in air. The <b>brain</b> is the boss that thinks. The <b>stomach</b> breaks down food. <b>Bones</b> hold you up and <b>muscles</b> move you.", "Ask: what job does this body part do?", [
    "Which part pumps blood around your body?|Heart|Lungs,Stomach|❤️", "Which parts help you breathe air in and out?|Lungs|Heart,Bones|🫁",
    "Which part is the boss that helps you think?|Brain|Stomach,Elbow|🧠", "Which part breaks down the food you eat?|Stomach|Brain,Lungs|🍽️",
    "What holds your body up and gives it shape?|Bones|Hair,Skin|🦴", "What helps your body move?|Muscles|Teeth,Nails|💪",
    "Which part do you use to see?|Eyes|Ears,Nose|👀", "Which part do you use to hear?|Ears|Eyes,Elbows|👂"]));
  a.push(L("Doctor and checkups", "🩺", "A checkup is a visit to the doctor when you are <b>not</b> sick. It helps keep you healthy.", "At a checkup the doctor measures how tall you are, checks your heart and ears, and answers your questions. <b>Vaccines</b> are shots that help your body fight bad germs.", "Doctors and nurses are helpers. Tell them if something hurts.", [
    "What is a checkup?|A visit to keep you healthy|A kind of game,A trip to the zoo|🩺", "What does a doctor use to listen to your heart?|A stethoscope|A telescope,A microscope|🩺",
    "What do vaccines help your body do?|Fight bad germs|Grow taller overnight,Sleep longer|💉", "Should you tell the doctor when something hurts?|Yes, tell the truth|No, stay quiet,Only if you cry",
    "Who can you ask questions at a checkup?|The doctor or nurse|Nobody,Only strangers", "How often do most kids go for a checkup?|About once a year|Never,Every minute",
    "A shot from the doctor may pinch. What helps?|Taking slow deep breaths|Holding your breath,Running away", "Doctors and nurses are...|Helpers who care for us|Scary monsters,Only for adults|👩‍⚕️"]));
  a.push(L("Healthy teeth", "🦷", "Your teeth help you chew and talk. Caring for them keeps them strong.", "Brush <b>2 times a day</b> for 2 minutes. Floss between teeth. See the <b>dentist</b> for checkups. Sugary snacks and drinks can cause <b>cavities</b>, which are little holes in teeth.", "Brush, floss, eat well and visit the dentist.", [
    "What is a cavity?|A little hole in a tooth|A new tooth,A kind of toothpaste|🦷", "How many minutes should you brush each time?|2 minutes|10 seconds,1 hour|🪥",
    "Which snack is best for your teeth?|Crunchy carrot sticks|Sticky candy,Sugary soda|🥕", "Who checks your teeth for problems?|The dentist|The baker,The mail carrier|🦷",
    "What cleans between your teeth?|Floss|A spoon,A pencil", "How many times a day should you brush?|2 times|0 times,1 time every week",
    "Which drink is best for teeth?|Water|Soda,Sweet juice drink|💧", "Sugar can make...|Cavities|Muscles,Taller bones|🍬"]));
  a.push(L("Water or sugary drinks?", "💧", "What we drink matters. Our bodies are made of mostly water!", "<b>Water</b> is the best drink. <b>Milk</b> is good for bones. Soda, energy drinks and sweet drink mixes have lots of <b>added sugar</b>. Juice is sweet too, so drink only a little.", "When you are thirsty, pick water first.", [
    "What is the best drink when you are thirsty?|Water|Soda,Sweet drink mix|💧", "Which drink helps make strong bones?|Milk|Soda,Sports drink|🥛",
    "Which drink has lots of added sugar?|Soda|Water,Plain milk|🥤", "Which drink is healthiest for every day?|Water|Soda,Candy punch",
    "Your body is made of mostly...|Water|Candy,Air", "After running outside, you should drink...|Water|Soda,Nothing|🏃",
    "Which is a sometimes drink?|Soda|Water,Milk", "Too much sugary drink can hurt your...|Teeth|Eyebrows,Elbows|🦷"]));
  a.push(L("A good breakfast", "🍳", "Breakfast means \"break the fast\". You have not eaten all night, so it gives you energy.", "A good breakfast has <b>protein</b> (eggs, yogurt), <b>whole grains</b> (oatmeal, toast) and <b>fruit</b>. It helps you think and learn at school.", "Pick foods from more than one group.", [
    "Why is breakfast important?|It gives you energy for the day|It makes you sleepy,It is only for adults|🍳", "Which is a healthy breakfast?|Oatmeal with fruit|A bag of candy,Cake and soda|🥣",
    "Which breakfast food has protein?|An egg|A gummy bear,Syrup|🥚", "Which is a whole grain?|Oatmeal|Lollipop,Soda|🥣",
    "Breakfast helps you do better at...|School|Sleeping in,Nothing|🏫", "Which fruit goes well with breakfast?|Banana|Candy bar,Chips|🍌",
    "Which is the best breakfast drink?|Milk or water|Soda,Energy drink|🥛", "What does \"breakfast\" help you break?|The night's fast|A window,A promise"]));
  a.push(L("Bones and muscles", "🦴", "Bones and muscles work as a team. Bones are the frame and muscles pull on them to make you move.", "Bones grow strong with <b>calcium</b> (milk, cheese, yogurt) and with exercise. Muscles get stronger when you run, climb and play. A skull protects your brain.", "Eat well and play hard to build strong bones and muscles.", [
    "Which food helps build strong bones?|Milk|Soda,Candy|🥛", "What protects your brain?|Your skull|Your hair,Your sock|💀",
    "What makes muscles stronger?|Running and playing|Sitting all day,Sleeping all day|💪", "What do muscles do?|Pull on bones to move you|Make you sneeze,Hold water",
    "What mineral helps bones grow strong?|Calcium|Sugar,Salt|🦴", "Which activity builds strong bones?|Jumping and climbing|Lying still,Watching TV|🧗",
    "Your ribs protect your...|Heart and lungs|Feet,Knees", "Bones and muscles work...|Together as a team|Alone,Against each other"]));
  a.push(L("Three kinds of exercise", "🏃", "There is more than one way to exercise. A healthy body needs all three.", "<b>Cardio</b> makes your heart beat faster (running, biking). <b>Strength</b> builds muscles (climbing, push-ups). <b>Stretching</b> keeps your body bendy (touching your toes, yoga).", "Think: heart faster = cardio, strong = strength, bendy = stretching.", [
    "Running fast is which kind of exercise?|Cardio|Stretching,Strength|🏃", "Touching your toes is mostly...|Stretching|Cardio,Strength|🧘",
    "Climbing the monkey bars builds...|Strength|Stretching,Sleep|🧗", "Which exercise makes your heart beat faster?|Jumping rope|Napping,Reading|🪢",
    "Yoga helps your body be...|Bendy|Louder,Cooler|🧘", "Push-ups build...|Strength|Sleep,Speed only|💪",
    "Riding a bike is a kind of...|Cardio|Stretching,Resting|🚴", "Which kind keeps muscles loose and bendy?|Stretching|Cardio,Candy"]));
  a.push(L("Your heartbeat", "💓", "Your heart is a strong muscle about as big as your fist. It beats all day and all night.", "When you run or play hard, your heart beats <b>faster</b> to bring more air to your muscles. When you rest, it beats <b>slower</b>. You can feel your pulse on your wrist or neck.", "Moving more = faster heartbeat. Resting = slower heartbeat.", [
    "When you run, your heartbeat gets...|Faster|Slower,Stops|🏃", "When you rest, your heartbeat gets...|Slower|Faster,Louder than a drum|😴",
    "Your heart is about as big as...|Your fist|A car,A pea|✊", "Where can you feel your pulse?|On your wrist|On your hair,On your shoe",
    "Your heart is a...|Muscle|Bone,Tooth|❤️", "Why does your heart beat faster when you play?|Muscles need more air|You are sleepy,It is bored",
    "Which activity makes your heart beat slowest?|Lying still|Sprinting,Jumping jacks", "Exercise makes your heart...|Stronger|Weaker,Smaller|💪"]));
  a.push(L("Dress for the weather", "🌦️", "Our clothes help us stay safe and comfortable outside.", "On hot, sunny days wear light clothes, a <b>hat</b> and <b>sunscreen</b>. In the cold, wear a coat, hat and gloves. In rain, use a raincoat and boots. Always drink water in the heat.", "Check the weather, then choose clothes to match.", [
    "It is snowing. What should you wear?|A warm coat and gloves|Shorts,Flip-flops|❄️", "It is very hot and sunny. What protects your skin?|Sunscreen and a hat|A scarf,Mittens|☀️",
    "It is raining. What helps keep you dry?|A raincoat|Sandals,A swimsuit|🌧️", "On a hot day you should drink...|Lots of water|No water,Only hot cocoa|💧",
    "In winter, why wear a hat?|It keeps heat in|It makes you hot,It is for rain only|🧢", "Your feet are wet from snow. You should...|Change into dry socks|Keep them wet,Take off your coat",
    "Where is it safe to rest on a hot day?|In the shade|On hot pavement,In a closed hot car|🌳", "Which shoes are best for a rainy day?|Rain boots|Roller skates,Bare feet|🥾"]));
  a.push(L("Big feelings", "😠", "Everyone has big feelings like anger, worry and sadness. Feelings are okay. It matters what we <b>do</b> with them.", "When you feel angry, try: <b>stop</b>, <b>take slow breaths</b>, count to 10, and tell someone how you feel using words. Hitting or yelling hurts others.", "All feelings are okay, but not every action is okay.", [
    "Is it okay to feel angry?|Yes, all feelings are okay|No, never|😠", "What can you do first when you feel very angry?|Take slow breaths|Hit something,Yell at a friend|🌬️",
    "You feel worried. What helps?|Telling a trusted grown-up|Hiding it forever,Being mean|😟", "Counting to 10 helps you...|Calm down|Get angrier,Get taller|🔢",
    "When upset, you can use your...|Words|Fists,Feet to kick|🗣️", "Which is a safe way to let anger out?|Squeeze a pillow|Break a toy,Push a friend",
    "Feeling sad is...|Normal and okay|Wrong,Silly|😢", "Feelings can feel big, but they...|Pass with time|Last forever,Never change"]));
  a.push(L("Making friends", "🤝", "Friends make life fun. Good friends are kind, share and listen.", "To make a friend: say hello, smile, ask them to play and take turns. A good friend is <b>kind</b>, tells the truth and says sorry when wrong.", "Be the kind of friend you would want to have.", [
    "How can you start a friendship?|Say hello and smile|Ignore people,Grab their toy|🤝", "A good friend is...|Kind and fair|Always bossy,Mean on purpose|😊",
    "A new kid is alone at recess. You could...|Invite them to play|Laugh at them,Walk away|🧒", "When you do something wrong to a friend, you...|Say sorry|Blame them,Hide|🙏",
    "Taking turns means...|Everyone gets a chance|Only you go,Nobody plays|🔁", "Good friends...|Listen to each other|Always tease,Keep secrets that hurt|👂",
    "A friend feels sad. You can...|Ask if they are okay|Make fun of them,Ignore them", "Sharing is...|Kind and helps friendship|Bad,Never allowed"]));
  a.push(L("Bullying and what to do", "🛑", "Bullying is when someone hurts or bothers another person <b>again and again</b> on purpose.", "If you are bullied, say \"<b>Stop!</b>\" in a strong voice, walk away and <b>tell a trusted adult</b>. Telling is not tattling: it keeps people safe. Help the person who is hurt.", "Stop, walk away, tell an adult.", [
    "What should you do if someone bullies you?|Tell a trusted adult|Keep it secret,Bully back|🛑", "Is telling an adult about bullying tattling?|No, it keeps people safe|Yes, never tell,Only on Fridays",
    "Bullying happens...|Again and again on purpose|Once by accident,Only in games", "You see a kid being picked on. You can...|Be kind and get help|Join in,Laugh|🧒",
    "A strong way to say no is...|\"Stop!\" in a firm voice|Hitting,Crying and giving up", "After telling, an adult can...|Help make it stop|Ignore you,Make it worse",
    "A bystander is someone who...|Sees it happen|Starts it,Is not there|👀", "Hurting someone with words is...|Still bullying|Always okay,Just a joke"]));
  a.push(L("Fire escape plan", "🔥", "A fire can be scary, but a plan helps your family stay safe.", "Know <b>two ways out</b> of each room. If your clothes catch fire: <b>Stop, Drop and Roll</b>. In smoke, <b>get low and go</b>. Never hide. Get out and call 911 from outside. Smoke alarms need working batteries.", "Get out, stay out, call for help.", [
    "If your clothes catch fire, you...|Stop, drop and roll|Run fast,Jump up and down|🔥", "Smoke rises, so in a fire you...|Crawl low under the smoke|Stand tall,Hide under the bed",
    "Where do you go after you get out?|To your family's meeting place|Back inside for toys,To a neighbor's roof|🏠", "How many ways out should you know?|Two|Zero,Ten|🚪",
    "What makes a loud beep to warn of fire?|A smoke alarm|A teapot,A clock|🔔", "Who do you call in a fire?|911|A friend,Your teacher|📞",
    "Should you go back inside for a toy?|No, stay out|Yes, quickly,Yes, if it is small", "Before opening a door in a fire, you...|Feel it with the back of your hand|Kick it,Open it wide"]));
  a.push(L("Safe adults and secrets", "🧑‍🤝‍🧑", "A <b>safe adult</b> is someone you trust, like a parent, teacher or doctor. You can go to them when you are scared or confused.", "Some secrets are fun, like a birthday surprise. But a secret that makes you feel <b>scared, sad or uncomfortable</b> is NOT okay to keep. Always tell a safe adult. Your body belongs to you.", "Surprises are happy. Secrets that feel bad get told.", [
    "Which is a safe adult?|Your parent|A stranger online,Someone who asks for pictures|🧑‍🤝‍🧑", "A birthday surprise secret is...|Happy and okay|Scary,Something to hide forever|🎁",
    "A secret that makes you scared should be...|Told to a safe adult|Kept forever,Told to a stranger|😟", "Your body belongs to...|You|Anyone who asks,A stranger",
    "If someone makes you uncomfortable, you...|Tell a safe adult|Say nothing,Keep it secret", "A stranger offers you a ride. You say...|No, and tell a safe adult|Yes,Maybe|🚗",
    "Who could be a safe adult at school?|Your teacher|A kid you don't know,A person online|🏫", "Telling a safe adult about a bad secret is...|The right thing to do|Wrong,Embarrassing and useless"]));
  a.push(L("Kitchen safety", "🍳", "Kitchens have hot and sharp things. Kids need a grown-up to help.", "Never touch a <b>hot stove</b> or oven. Pot handles should point inward. Wash hands before cooking. Wash fruit and vegetables. Only use knives with a grown-up. Clean up spills so nobody slips.", "In the kitchen: ask a grown-up first.", [
    "Who should help you use the stove?|A grown-up|A friend,Nobody|🍳", "Pot handles should point...|Inward, toward the stove|Out over the floor,Toward the door",
    "Before cooking, you should...|Wash your hands|Run around,Lick the spoon|🧼", "You spill water on the floor. You...|Wipe it up|Leave it,Run through it|💦",
    "Who can use a sharp knife with you?|A grown-up helper|A little brother,Nobody ever|🔪", "What should you do with fruit before eating?|Wash it|Nothing,Hide it|🍎",
    "An oven is...|Hot|Cold,Safe to touch", "A hot pan is cooling. Is it safe to touch?|No, wait for a grown-up|Yes,Yes, if you are quick"]));
  a.push(L("Car and seat belt safety", "🚗", "Cars are fast and heavy. Seat belts keep you safe.", "Always <b>buckle up</b> before the car moves. Kids sit in the <b>back seat</b> until age 13. Younger kids need a car seat or booster. Get out on the curb side. Never play in a parking lot.", "Buckle up, sit in back, stay safe near cars.", [
    "What do you do first when you get in a car?|Buckle your seat belt|Open the window and shout,Take off your shoes|🚗", "Where should kids sit in a car?|The back seat|On the roof,The driver's lap",
    "Why do we wear seat belts?|To stay safe if the car stops fast|To look nice,For fun", "A parking lot is a place to...|Hold a grown-up's hand|Play tag,Race|🅿️",
    "Which side should you get out on?|The curb side|The traffic side,Either one", "Smaller kids sit in a...|Car seat or booster|Free seat,Trunk",
    "Should you stick your head out the window?|No, keep it inside|Yes,Only on highways", "The car is moving. Should you unbuckle?|No|Yes, to stretch,Yes, to play"]));
  a.push(C("Water math", "💧", "Staying hydrated is good for you. Let's count the glasses of water!", "Add the glasses you drink at different times of the day to find the total.", "Add all the numbers together.", () => {
    const n = pick(NM), x = ri(1, 3), y = ri(1, 3), z = ri(1, 3);
    return [`${n} drinks ${x} glasses of water at breakfast, ${y} at school and ${z} at home. How many glasses in all?`, x + y + z, "Put all the glasses together. Is it adding or taking away?", "Add the three numbers one pair at a time.", "Example: 2 glasses + 1 glass + 3 glasses. 2 + 1 = 3, then 3 + 3 = 6.", "💧"];
  }));
  a.push(C("Exercise minutes", "⏱️", "Kids need about 60 minutes of play and exercise each day.", "Skip count or multiply to find how many minutes you move in a few days.", "Each day adds the same number of minutes.", () => {
    const d = ri(2, 6), m = pick([10, 15, 20, 30]);
    return [`Leo plays outside ${m} minutes each day for ${d} days. How many minutes in all?`, m * d, "Each day adds the same amount. Use repeated adding.", `Add ${m} again and again, or multiply ${m} by ${d}.`, "Example: 10 minutes a day for 3 days is 10, 20, 30. That is 30 minutes.", "🏃"];
  }));
  const a1 = pk(a, [0, 2, 12, 11, 13]), a2 = pk(a, [1, 3, 6, 9, 14, 15, 16, 17]);
  a.push(MIX("Mixed practice", a1));
  a.push(MIX("Level 4 Challenge", a2));

  // ================= LEVEL 5 =================
  const b = [];
  b.push(L("Nutrients", "🥦", "Food gives us <b>nutrients</b>. Nutrients are the good stuff our bodies use to grow and have energy.", "<b>Protein</b> builds muscles (meat, beans, eggs). <b>Carbohydrates</b> give quick energy (bread, rice, fruit). <b>Fats</b> store energy. <b>Vitamins and minerals</b> keep you healthy (fruits and vegetables).", "Match the nutrient to its job.", [
    "Which nutrient helps build muscles?|Protein|Sugar only,Salt|🥩", "Which nutrient gives quick energy?|Carbohydrates|Protein,Water|🍞",
    "Fruits and vegetables are rich in...|Vitamins|Candy,Soda|🥕", "Which food is a good source of protein?|Beans|Lollipop,Soda|🫘",
    "Bread and rice give us...|Carbohydrates|Vitamins only,Salt|🍚", "What are nutrients?|The good stuff in food that our bodies use|Types of trash,Kinds of clothes",
    "Which is a source of protein?|Eggs|Gum,Candy|🥚", "Vitamins and minerals help keep you...|Healthy|Sleepy,Silly"]));
  b.push(L("MyPlate food groups", "🍽️", "A healthy plate has many foods. The five food groups are fruits, vegetables, grains, protein and dairy.", "Make <b>half your plate</b> fruits and vegetables. A quarter is grains and a quarter is protein, with dairy on the side. Try different colors!", "Half the plate is fruits and veggies.", [
    "How much of your plate should be fruits and vegetables?|About half|None,A tiny bit|🍽️", "Cheese and yogurt are in which group?|Dairy|Grains,Protein|🧀",
    "Rice and pasta are in which group?|Grains|Fruits,Dairy|🍝", "Chicken and fish are in which group?|Protein|Dairy,Fruits|🍗",
    "An orange belongs to which group?|Fruits|Grains,Protein|🍊", "Broccoli belongs to which group?|Vegetables|Fruits,Dairy|🥦",
    "How many food groups are there on MyPlate?|Five|Two,Nine|5️⃣", "Eating many colors of food helps you get...|Different nutrients|Only sugar,Nothing|🌈"]));
  b.push(L("Sometimes foods", "🍰", "Treats are okay now and then. We call them <b>sometimes foods</b>.", "Cake, candy, chips and soda have lots of sugar, salt or fat and not many nutrients. Enjoy them <b>in small amounts</b> on special days. Eat <b>everyday foods</b> most of the time.", "Everyday foods are the main meal, sometimes foods are small treats.", [
    "Which is an everyday food?|An apple|Candy,Soda|🍎", "Which is a sometimes food?|Cake|Carrot,Broccoli|🍰",
    "How often should you eat treats?|Once in a while|At every meal,Instead of dinner|🍭", "Why do we limit sugary foods?|They don't have many nutrients|They are too healthy,They are made of rocks",
    "Which snack is better for every day?|Yogurt with fruit|Candy bar,Chips and soda|🍓", "Chips are high in...|Salt and fat|Vitamin water,Fiber only",
    "A birthday cake is...|Okay as a special treat|Never allowed,Good every day|🎂", "A good swap for soda is...|Water|Another soda,Sugary juice|💧"]));
  b.push(L("Healthy snacks", "🥕", "Snacks fill the gap between meals. Smart snacks give you energy.", "Choose snacks with <b>fiber and protein</b>: apple slices with peanut butter, cheese and crackers, veggies and hummus, yogurt, or nuts (if you have no allergy). They keep you full.", "Pair a fruit or veggie with a protein.", [
    "Which is a smart snack?|Carrots and hummus|Candy bar,Soda|🥕", "Which snack has protein?|Cheese|Gummy worms,Lollipops|🧀",
    "Fiber helps you feel...|Full longer|Hungrier,Sleepy|🍎", "Which is a healthy snack?|Yogurt with berries|Cupcake with frosting,Fried chips|🍓",
    "Apple slices go well with...|Peanut butter|Syrup,Soda|🍎", "When should you snack?|When you are hungry between meals|All day long,During dinner|⏰",
    "Which snack is a fruit?|Banana|Pretzel,Cookie|🍌", "A healthy snack has...|Nutrients that keep you going|Only sugar,Only grease"]));
  b.push(L("Digestion", "🍽️", "Digestion is how your body turns food into energy.", "Food goes into your <b>mouth</b> (teeth chew, saliva starts breaking it down), down the <b>esophagus</b>, to the <b>stomach</b>, then through the <b>intestines</b> where nutrients go into your blood. Waste leaves your body.", "Mouth, esophagus, stomach, intestines.", [
    "Where does digestion begin?|In the mouth|In the foot,In the ear|👄", "What tube carries food to the stomach?|Esophagus|Windpipe,Arm",
    "Where do most nutrients go into your blood?|Intestines|Elbows,Nose", "What do your teeth do to food?|Chew it into small pieces|Make it taller,Freeze it|🦷",
    "Which part churns and mixes food?|Stomach|Knee,Toe", "Why is it good to chew slowly?|It helps digestion|It makes food disappear,It tires your ears",
    "What happens to waste your body doesn't need?|It leaves the body|It turns into bones,It stays forever", "Fiber from fruit and vegetables helps...|Digestion|Hearing,Seeing|🥦"]));
  b.push(L("Sleep and your brain", "😴", "Sleep is when your brain and body rest, repair and grow.", "Kids aged 6 to 12 need <b>9 to 12 hours</b> of sleep. A good bedtime routine helps: same bedtime, no screens, quiet time, book. Not enough sleep makes it hard to focus and be kind.", "Same bedtime, screens off.", [
    "How much sleep do kids need?|9 to 12 hours|2 hours,15 hours|😴", "What should you turn off before bed?|Screens|Your pajamas,Your socks|📱",
    "Too little sleep can make it hard to...|Focus at school|Breathe,Blink", "A good bedtime routine is...|The same steps each night|Different every night,Eating candy|🌙",
    "During sleep your body...|Rests and repairs|Stops growing,Gets sick", "Which helps you fall asleep?|A quiet book|Loud video games,Soda|📖",
    "When you sleep well, you feel...|Rested and ready|Grumpier,Dizzy", "Bedtime should be...|About the same each night|Random,After midnight"]));
  b.push(L("Growing and changing", "🌱", "Your body is always growing and changing. Everyone grows at their own speed.", "You grow taller, lose baby teeth and get stronger. Some kids grow fast, others slowly: both are normal. Food, sleep and play help you grow. Never tease someone about their body.", "Different is normal.", [
    "Do all kids grow at the same speed?|No, everyone is different|Yes,Only boys do|🌱", "What do you lose when you are about 6 to 12?|Baby teeth|Your toes,Your eyes|🦷",
    "What helps you grow?|Food, sleep and play|Skipping meals,Staying up late", "Teasing a kid about their body is...|Unkind|Funny,Healthy",
    "Being taller or shorter than classmates is...|Normal|Wrong,A problem", "Your body gets stronger when you...|Eat well and move|Only sit,Skip sleep",
    "Baby teeth are replaced by...|Adult teeth|Wooden teeth,Nothing", "Growing happens...|All your childhood|Only at night once,Never"]));
  b.push(L("Stress and calm", "🧘", "Stress is the tight, worried feeling you get when things are hard, like tests or changes.", "Ways to calm down: <b>belly breathing</b> (in through the nose, out slowly), stretching, drawing, a walk, talking to someone, listening to quiet music.", "Breathe slowly and talk about it.", [
    "Which helps when you feel stressed?|Slow belly breaths|Holding your breath,Yelling|🧘", "Before a test you feel nervous. You can...|Take deep breaths|Skip the test,Give up|📝",
    "Talking to someone you trust can...|Make worries smaller|Make them bigger,Hide them|🗣️", "Which activity can calm you?|Drawing|Fighting,Running into traffic|🎨",
    "In belly breathing, you breathe out...|Slowly|Super fast,Never|🌬️", "Stress is...|A normal feeling|A sickness from candy,A crime",
    "A walk outside can help you...|Feel calmer|Feel worse,Get lost|🚶", "A stretch can help release...|Tight muscles|Hair,Colors"]));
  b.push(L("Understanding others' feelings", "💞", "<b>Empathy</b> means understanding how someone else feels and caring about it.", "Look at faces, listen to words and think about how you would feel. Then be kind: ask \"Are you okay?\", offer help or just listen.", "Imagine being in their shoes.", [
    "What is empathy?|Understanding how someone else feels|Winning a game,Being loud|💞", "A friend drops their lunch and is sad. What's kind?|Offer to share|Laugh|🥪",
    "How can you tell someone is sad?|Look at their face and listen|Guess a random thing,Ignore them|😢", "A kid is crying after falling. You could...|Ask if they're okay|Walk past,Tease",
    "Showing empathy helps people feel...|Cared for|Alone,Worse", "Your teammate lost the game and is upset. You say...|\"Good try, you did your best\"|\"You're terrible\",Nothing, and walk off|⚽",
    "Listening to a friend means...|Paying attention|Talking over them,Looking away|👂", "Thinking \"How would I feel?\" is...|Empathy|Bragging,Teasing"]));
  b.push(L("Solving conflicts", "🕊️", "Friends sometimes disagree. We can solve problems without fighting.", "Steps: <b>calm down</b>, say how you feel with \"I\" words (\"I feel sad when...\"), <b>listen</b>, think of ideas and <b>compromise</b> (each gets a little of what they want). If it stays hard, ask an adult.", "Calm, talk, listen, compromise.", [
    "What do you do first in a conflict?|Calm down|Yell,Hit|🕊️", "A good \"I\" message is...|\"I feel sad when you take my toy\"|\"You are mean\",\"Give me that\"",
    "Compromise means...|Each person gives a little|One person wins everything,Nobody plays|🤝", "Both kids want the same swing. A fair idea is...|Take turns|Fight for it,Break the swing",
    "If you cannot solve it, you can...|Ask a trusted adult|Keep fighting,Give up friendship", "Listening means...|Hearing the other side|Interrupting,Looking away|👂",
    "Name-calling in a fight is...|Not helpful|Smart,Required", "Solving problems with words is...|A strong thing to do|Weak,Pointless"]));
  b.push(L("Saying no to peer pressure", "🙅", "<b>Peer pressure</b> is when friends or classmates push you to do something. It can be good or bad.", "If it's unsafe, unkind or against the rules, you can say \"<b>No thanks</b>\", give a reason, walk away, or find a safe adult. Real friends respect your choice. Pick friends who help you do good things.", "It's okay to say no.", [
    "Friends dare you to jump off a high wall. You say...|\"No thanks, it's not safe\"|\"Okay\",\"Let me try\"|🙅", "Peer pressure is...|Pressure from kids your age|A kind of math,A food",
    "If a friend asks you to be mean to a kid, you...|Say no|Join in,Tell a lie", "A true friend will...|Respect your \"no\"|Make fun of you,Keep pushing",
    "You can leave a bad situation by...|Walking away|Staying quiet,Doing it|🚶", "Peer pressure can sometimes be...|Positive, like joining a clean-up|Always bad,Never exists",
    "Who can help if you feel pressured?|A trusted adult|A stranger,Nobody", "It is okay to say no when something feels...|Wrong or unsafe|Fun,Easy"]));
  b.push(L("Privacy online", "🔐", "Some information is <b>private</b>. Sharing it online with strangers can be dangerous.", "Never share your full name, address, school, phone number, passwords or photos with people you don't know. Ask a parent before downloading or signing up. Use <b>strong passwords</b> and keep them secret.", "If in doubt, ask a trusted adult.", [
    "Which is OK to share online with strangers?|Nothing personal|Your address,Your school|🔐", "Who can you tell your password to?|Only a parent|Your best friend,Anyone online",
    "A stranger asks where you live. You...|Don't answer and tell an adult|Tell them,Give a hint", "Before downloading a game, you...|Ask a parent|Download it quickly,Click all the buttons|⬇️",
    "A strong password is...|Long with letters, numbers and symbols|Your name,1234", "A stranger online sends you a link. You...|Don't click it and tell an adult|Click it,Send it on",
    "Your photo online can be...|Seen by many people|Only seen by you,Deleted forever instantly|📸", "Your phone number is...|Private|Public,A good username"]));
  b.push(L("Cyberbullying", "📱", "Cyberbullying is bullying that happens on phones, games or computers.", "If someone sends mean messages: <b>don't answer</b>, <b>save the proof</b> (take a screenshot), <b>block</b> them and <b>tell a trusted adult</b>. Never forward mean messages. Be kind online.", "Don't reply, save it, block, tell.", [
    "What is cyberbullying?|Mean behavior online|A game score,A computer virus|📱", "You get a mean message. What do you do first?|Tell a trusted adult|Reply with something mean,Delete it and say nothing",
    "Why save the evidence?|It shows an adult what happened|It makes you famous,It's required by games", "Should you pass on a mean message?|No|Yes,Only to a friend",
    "Blocking someone means...|They can't contact you|They can see more,You become friends|🚫", "A kind thing to do online is...|Say something nice|Post mean jokes,Share secrets",
    "If you see someone being cyberbullied, you can...|Support them and tell an adult|Join in,Ignore it", "Mean words online can...|Hurt real feelings|Not hurt anyone,Not matter"]));
  b.push(L("Small first aid", "🩹", "Little injuries happen. You can learn to help, and know when to get an adult.", "<b>Scrape or cut:</b> wash with soap and water, cover with a bandage. <b>Nosebleed:</b> sit, lean forward, pinch the soft part of the nose. <b>Burn:</b> cool with cool running water, tell an adult. For big injuries call 911.", "Clean, cover, tell an adult.", [
    "You scrape your knee. First you...|Wash it with soap and water|Ignore it,Rub dirt in it|🩹", "After washing a cut, you...|Cover it with a bandage|Leave it open in the dirt,Pick at it",
    "For a nosebleed, you...|Sit and pinch your nose|Tilt your head back,Lie flat|👃", "For a small burn, use...|Cool running water|Butter,Hot water|🔥",
    "A bad injury needs you to...|Call 911 or get an adult|Wait quietly,Hide it|🚑", "Who should you tell about an injury?|A grown-up|No one,A stranger",
    "A bandage helps keep a cut...|Clean|Wet,Open", "Dirt in a cut is...|Bad; wash it out|Fine,Healthy"]));
  b.push(L("Allergies", "🤧", "An <b>allergy</b> is when the body reacts badly to something harmless to most people, like peanuts, bee stings or pollen.", "Signs: itching, rash, sneezing, swelling, trouble breathing. <b>Tell an adult right away</b>. Never share food with a friend who has an allergy. Always read what is in food.", "Allergy: tell an adult fast.", [
    "An allergy is...|A bad reaction to something|A game,A haircut|🤧", "A friend has a peanut allergy. You should...|Not share peanut foods|Share your snack,Hide peanuts in their lunch|🥜",
    "If you feel itchy and swollen after eating, you...|Tell an adult right away|Wait,Eat more", "Which could be an allergy sign?|Sneezing and itchy eyes|Giggling,Hiccups only",
    "Trouble breathing after a bee sting needs...|Emergency help|Sleep,A snack|🐝", "Some allergies are caused by...|Pollen, foods or stings|Colors,Sounds|🌼",
    "A kid with a food allergy can eat...|Only safe foods|Anything,Their friend's snacks", "Reading labels helps people with allergies...|Avoid certain foods|Make friends,Grow"]));
  b.push(L("Bike, scooter and sports safety", "🚲", "Wearing the right gear helps keep your body safe during sports.", "Wear a <b>helmet</b> on bikes, scooters and skateboards, plus pads for skating. Ride where adults say, stay off busy streets, use hand signals. Warm up before sports and drink water. Play fair.", "Gear first, then play.", [
    "What do you wear on a bike?|A helmet|A hat for fashion,Slippers|🚲", "Which gear is important for skating?|Knee and elbow pads|Sunglasses only,Mittens|🛼",
    "Where is it safe to ride?|A park or bike path|A busy road,A parking lot at night", "Before sports, you should...|Warm up|Eat candy,Stay still|🤸",
    "You are thirsty during sports. You...|Take a water break|Keep going without water,Drink soda|💧", "A helmet should fit...|Snugly on your head|Loosely on the back,On your knees|⛑️",
    "Playing fair means...|Following the rules|Cheating,Pushing", "Hand signals tell others...|Where you are turning|Your name,Your age"]));
  b.push(C("Sleep math", "🌙", "Let's practice counting hours of sleep.", "Count from bedtime to midnight, then from midnight to wake-up time, and add.", "Split the night into two parts.", () => {
    const bed = ri(7, 9), up = ri(6, 7), n = pick(NM);
    return [`${n} goes to bed at ${bed}:00 at night and wakes up at ${up}:00 in the morning. How many hours of sleep?`, 12 - bed + up, "Count to midnight first, then from midnight to the morning.", "Add the hours before midnight to the hours after midnight.", "Example: bed at 10, up at 8. 10 to 12 is 2 hours, 12 to 8 is 8 hours. 2 + 8 = 10 hours.", "😴"];
  }));
  b.push(C("Fruit and veggie count", "🥗", "Health experts say eat lots of fruits and vegetables every day.", "Add the servings of fruit and veggies to see how many you ate.", "Add them all.", () => {
    const f = ri(1, 3), v = ri(1, 3), s = ri(1, 2);
    return [`Ava ate ${f} fruit servings and ${v} vegetable servings today. She also had ${s} candy treats. How many fruit and vegetable servings did she have in all?`, f + v, "Does candy count as fruit or vegetables?", "Add only the fruit and vegetable servings. Skip the candy.", "Example: 2 fruits, 1 veggie and 3 candies. Fruits and veggies: 2 + 1 = 3.", "🥗"];
  }));
  const b1 = pk(b, [0, 1, 11, 13, 5]), b2 = pk(b, [2, 3, 4, 6, 7, 9, 10, 12, 14, 15, 16, 17]);
  b.push(MIX("Mixed practice", b1));
  b.push(MIX("Level 5 Challenge", b2));

  // ================= LEVEL 6 =================
  const c = [];
  c.push(L("Reading a food label", "🏷️", "A <b>Nutrition Facts label</b> tells you what is in packaged food.", "Check the <b>serving size</b> first: the numbers are for one serving, not the whole package. Look at calories, sugar, sodium (salt) and fiber. The ingredient list is in order from most to least.", "Serving size comes first.", [
    "What do you look at first on a label?|Serving size|Brand name,Color|🏷️", "Ingredients are listed from...|Most to least|Least to most,A to Z only",
    "Sodium is another word for...|Salt|Sugar,Fat|🧂", "Calories measure...|Energy in food|Weight of the box,Price",
    "If a package has 2 servings and you eat it all, the numbers...|Double|Stay the same,Disappear", "Which nutrient should you eat more of?|Fiber|Added sugar,Sodium",
    "If sugar is the first ingredient, the food has...|Mostly sugar|Mostly fruit,Mostly water", "A label helps you...|Make smart food choices|Pick a toy,Count steps"]));
  c.push(L("Whole foods vs processed", "🌾", "Some foods are close to how they grow. Others are changed a lot in factories.", "<b>Whole foods</b> (an apple, plain oats, eggs) have simple ingredients. <b>Processed foods</b> (chips, sugary cereal, snack cakes) often have extra sugar, salt and fat. Choose whole foods most of the time.", "Fewer ingredients is usually healthier.", [
    "Which is a whole food?|An apple|Potato chips,Snack cake|🍎", "Which is more processed?|Cookies|Carrots,Plain rice|🍪",
    "Whole grain bread has...|The whole grain|Only white flour,Candy|🍞", "Processed foods often have extra...|Sugar, salt and fat|Vitamins,Water",
    "A healthy swap for chips is...|Plain popcorn|Candy,Sodas|🍿", "Which has a shorter ingredient list?|Plain yogurt|Cream-filled snack,Gummy candy",
    "Brown rice is a...|Whole grain|Candy,Drink|🍚", "Most of your food should be...|Whole foods|Processed snacks,Soda"]));
  c.push(L("Hydration", "🚰", "Your body needs water for everything: moving, thinking, digesting and staying cool.", "When you sweat, you lose water. Drink water <b>through the day</b> and especially during exercise and hot weather. Pale yellow pee is a sign you are hydrated. Dizzy or headache can mean you need water.", "Sip water all day.", [
    "Why do we need water?|Our body uses it for everything|To change color,It's only for taste|💧", "When should you drink extra water?|When exercising or hot|Never,Only at bedtime|☀️",
    "A sign of needing water is...|Feeling thirsty or dizzy|Feeling happy,Hearing music", "Sweating helps...|Cool your body|Warm you,Make you thirsty on purpose",
    "Pale yellow pee means you are...|Hydrated|Thirsty,Sick", "The best drink for hydration is...|Water|Energy drinks,Soda",
    "You should sip water...|Through the day|Only at dinner,Only at school", "Water helps your body...|Stay cool and work well|Stay sleepy,Weigh more"]));
  c.push(L("Your immune system", "🛡️", "Your <b>immune system</b> is your body's defense team against germs.", "White blood cells fight germs. <b>Vaccines</b> teach your body how to defend against a germ. Sleep, healthy food and handwashing help. <b>Bacteria</b> and <b>viruses</b> are two kinds of germs.", "Defense: rest, food, vaccines, clean hands.", [
    "What is your immune system?|Your body's defense against germs|A muscle,A kind of food|🛡️", "What do white blood cells do?|Fight germs|Carry food,Make hair|🩸",
    "What does a vaccine do?|Helps your body learn to fight a germ|Makes you sick,Makes you tall|💉", "Which two are kinds of germs?|Bacteria and viruses|Fruits and nuts,Bones and muscles|🦠",
    "Which helps your immune system?|Sleep and good food|Staying up late,Eating only sweets", "Which stops germs spreading?|Washing hands|Sharing cups,Touching your face|🧼",
    "When you're sick, your body is...|Fighting germs|Giving up,Growing taller", "A cough should be covered with...|Your elbow|Your hand,Nothing"]));
  c.push(L("Posture and screens", "🖥️", "Sitting for long times and looking at screens can strain your body.", "Sit up straight, feet flat. Take a break every <b>20 minutes</b>: look far away for 20 seconds. Limit screen time and play outside. Screens before bed make it harder to sleep.", "Take breaks, move, and look away.", [
    "How should you sit at a table?|Back straight, feet flat|Slouched,On the floor with your neck bent|🪑", "To rest your eyes, you should...|Look far away for a bit|Stare harder,Close both eyes for an hour|👀",
    "Too much screen time can cause...|Tired eyes and less sleep|Super strength,Taller bones|📱", "How often should you take a break?|About every 20 minutes|Every 5 hours,Never|⏰",
    "A screen before bed can...|Make sleep harder|Make you sleep better,Make you taller", "A good break from screens is...|Playing outside|More videos,Staring at a wall",
    "Carrying a heavy backpack well means...|Use both straps|Hang it off one shoulder,Drag it|🎒", "Moving around often keeps your body...|Healthy|Stiff,Tired on purpose"]));
  c.push(L("Protect your hearing", "🎧", "Your ears are delicate. Very loud sounds can damage hearing forever.", "Keep volume low on headphones. A good rule: you should still hear people talking to you. Move away from loud noises, and wear ear protection at very loud events. Never put anything in your ears.", "Turn it down to protect your ears.", [
    "What can damage your hearing?|Very loud sounds|Quiet music,Silence|🎧", "On headphones, the best volume is...|Low enough to hear people|As loud as possible,Full",
    "At a very loud concert, wear...|Ear protection|A hat,Sunglasses|🎵", "Should you put sticks in your ears?|No, never|Yes,Only a pencil",
    "Hearing damage from loud noise can be...|Permanent|Gone in a minute,Only a joke", "A loud fire truck siren is close. You can...|Cover your ears|Stare at it,Poke your ears|🚒",
    "A safe volume lets you still hear...|People talking|Nothing,Only music", "Which is a loud sound to avoid for long?|A very loud speaker|A whisper,A bird song|🔊"]));
  c.push(L("Growth mindset", "🌟", "A <b>growth mindset</b> means believing you can get better with practice and effort.", "Mistakes help you learn. Say \"I can't do it <b>yet</b>.\" Try new ways, ask for help, and keep going. Praise effort, not only winning.", "Not yet, but I'm learning.", [
    "A growth mindset says:|\"I can get better with practice\"|\"I'm just bad at it\",\"Why bother?\"|🌟", "You make a mistake. A helpful thought is...|\"I can learn from this\"|\"I'm stupid\",\"I quit\"",
    "What word can you add to \"I can't do it\"?|Yet|Never,Ever", "When something is hard, you...|Try again and ask for help|Quit at once,Cheat",
    "Practice helps your brain...|Grow stronger|Fall asleep,Shrink|🧠", "Praising effort means saying...|\"You worked hard!\"|\"You're perfect\",\"Whatever\"",
    "Mistakes are...|Chances to learn|Disasters,Reasons to hide", "Learning to ride a bike takes...|Practice|Magic,No effort|🚲"]));
  c.push(L("Gratitude and kindness", "🙏", "Being thankful and kind makes you and others feel good.", "<b>Gratitude</b> means noticing what you're thankful for. Saying thank you, writing a note or doing a kind act can lift moods. Kindness is good for your <b>mental health</b> too.", "Thank someone today.", [
    "Gratitude means...|Being thankful|Being angry,Being bored|🙏", "A kind act could be...|Helping a classmate carry books|Taking their lunch,Ignoring them|📚",
    "Saying thank you shows...|Appreciation|Anger,Fear", "Doing a kind thing can make you feel...|Happy too|Worse,Sleepy|😊",
    "A thank-you note is a way to...|Show gratitude|Pick a fight,Go to bed|✉️", "Writing 3 good things each day can...|Boost your mood|Cause trouble,Break pencils|📝",
    "When someone helps you, you...|Say thank you|Walk away,Complain", "Mental health means taking care of your...|Feelings and thoughts|Shoes,Pencils|🧠"]));
  c.push(L("Asking for help", "🙋", "Everyone needs help sometimes. Asking is brave, not weak.", "You can ask a parent, teacher, school counselor, doctor or another trusted adult. Say what's wrong plainly: \"I need help with...\". If the first adult doesn't listen, <b>tell another</b>.", "Keep asking until someone helps.", [
    "Asking for help is...|Brave|Weak,Silly|🙋", "Who is a school helper for feelings?|The school counselor|The bus,The lunch tray|🏫",
    "If an adult doesn't listen, you...|Tell another trusted adult|Give up,Keep quiet", "A good way to ask is...|\"I need help with something\"|Hide it,Make a joke",
    "You feel very sad for many days. You...|Talk to a trusted adult|Hide it forever,Ignore it|😔", "Which is a trusted adult?|A parent|A stranger online,Someone who wants secrets",
    "A doctor can help if you...|Are sick or worried|Lose a sock,Like pizza|🩺", "Needing help means you are...|Human, just like everyone|Alone,Bad"]));
  c.push(L("Be an upstander", "🦸", "An <b>upstander</b> is someone who helps when they see bullying instead of just watching.", "Safe ways to help: say \"Stop, that's not cool\" if safe, <b>include</b> the kid, be their friend, and <b>tell an adult</b>. Don't laugh or join in. Don't fight: that can get you hurt.", "Be kind and get an adult.", [
    "An upstander is someone who...|Helps when bullying happens|Watches and laughs,Starts it|🦸", "You see a kid being left out. You could...|Invite them to join|Ignore them,Laugh",
    "A safe way to help a bullied kid is...|Tell an adult|Fight the bully,Film it for fun", "If you laugh at bullying, you...|Make it worse|Help the kid,Fix it",
    "Being an upstander is a way of being...|Brave and kind|Mean,Quiet and guilty", "After bullying, you can...|Check on the kid|Spread rumors,Forget it",
    "A bystander who does nothing...|Doesn't help|Always helps,Is a hero", "You say \"Stop\" only when...|It's safe|You're angry,You're alone"]));
  c.push(L("Respecting differences", "🌍", "People differ in how they look, talk, eat, learn and what they believe. These differences make the world interesting.", "Treat everyone with <b>respect</b>. Don't judge by looks. Ask polite questions. Be a friend to all. Include kids with disabilities and help them take part.", "Different does not mean less.", [
    "How should we treat people who are different?|With respect|Tease them,Ignore them|🌍", "A kid uses a wheelchair. In games you...|Include them|Leave them out,Stare|♿",
    "We should not judge a person by...|How they look|How they act kindly,What they say", "A kid speaks another language. You could...|Be friendly and learn words|Make fun of them,Avoid them|🗣️",
    "Respect means...|Treating others kindly|Bossing others,Copying others", "Differences in people make the world...|Interesting|Boring,Wrong",
    "Everyone deserves to be...|Included|Teased,Left out", "If someone eats different foods than you, you...|Respect it|Make a face,Laugh|🍱"]));
  c.push(L("Digital footprint", "👣", "Everything you post online leaves a <b>digital footprint</b>, a trail that can stay for a long time.", "Before you post, <b>THINK</b>: Is it True, Helpful, Inspiring, Necessary, Kind? Once posted, it can be copied. Don't post when angry. Ask a parent before sharing photos.", "Think before you post.", [
    "A digital footprint is...|A trail of what you do online|A shoe print,A video game|👣", "Before posting you should...|Think about it|Post quickly,Post when mad|🤔",
    "Things you post online can...|Stay a long time|Disappear at once,Be seen only by you", "In THINK, the K stands for...|Kind|Kick,Karate",
    "Should you post when you're angry?|No, calm down first|Yes,Always", "Before sharing a photo of a friend, you...|Ask them and a parent|Post it,Tag everybody|📸",
    "A good post is...|Kind and true|Mean,A lie", "Anyone can copy your post. So you should...|Be careful what you share|Share everything,Not care"]));
  c.push(L("Medicine safety", "💊", "Medicine can help when used correctly. Used wrongly, it can be dangerous.", "Only take medicine <b>from a trusted adult</b> who gives the right amount. Read the label together. Never take someone else's medicine. Keep medicine locked up and away from little kids. Vitamins are medicine too.", "Medicine: adult only, right amount.", [
    "Who can give you medicine?|A trusted adult|A friend,Nobody, you pick it|💊", "Can you take a friend's medicine?|No, never|Yes,If it looks the same",
    "The right amount of medicine is on the...|Label or doctor's directions|Candy wrapper,Toy box", "Is taking extra medicine better?|No, it can be harmful|Yes, always,Only for kids",
    "Where should medicine be stored?|Up high or locked away|On the table,In a lunch box", "Vitamins should be...|Taken only as an adult says|Eaten like candy,Shared",
    "You find pills on the floor. You...|Tell an adult and don't touch|Taste them,Hide them", "Medicine labels tell you...|How much to take|Your age,What movie to watch|🏷️"]));
  c.push(L("Emergency and weather safety", "🌪️", "Storms, earthquakes and floods can happen. Being prepared keeps families safe.", "Know your family's <b>emergency plan</b>: meeting place and phone numbers. In a <b>tornado</b>, go to the lowest inside room. In an <b>earthquake</b>: drop, cover, hold on. In a <b>thunderstorm</b>, go indoors. An emergency kit has water, food, flashlight and first aid.", "Plan ahead, stay calm.", [
    "In an earthquake, you...|Drop, cover and hold on|Run outside fast,Stand near a window|🌍", "In a tornado, go to...|The lowest inside room|The roof,A window|🌪️",
    "In a thunderstorm, you should...|Go indoors|Swim,Climb a tree|⛈️", "An emergency kit includes...|Water and a flashlight|Toys only,Candy only|🔦",
    "A family meeting place helps if...|You get separated|You are bored,It's lunch", "Who do you call in an emergency?|911|A pizza shop,A friend|📞",
    "In an emergency you should stay...|Calm and follow adults|Hidden alone,Loud", "If lightning is near, you can...|Stay inside until the storm is over|Go out right away,Play in puddles"]));
  c.push(L("Poison and chemical safety", "☣️", "Some household items and plants are poisonous. Know the warning signs.", "Look for warning labels like a skull or \"Danger\". Never mix cleaning products. If someone swallows something harmful, call <b>Poison Control</b> or 911 and tell an adult. Stay away from unknown plants and mushrooms.", "Read labels and ask first.", [
    "A skull sign on a bottle means...|Poison, don't touch|A tasty drink,A toy|☣️", "Cleaning products should be...|Used by adults with care|Mixed for fun,Tasted",
    "If someone swallowed something harmful, call...|Poison Control or 911|A cousin,A game site|📞", "Wild mushrooms or berries are...|Not safe to eat unless an adult knows|Great snacks,Always sweet|🍄",
    "Never mix cleaning products because...|They can make harmful fumes|They make soup,They get colorful", "Labels with \"Danger\" or \"Warning\" mean...|Be careful|Eat now,Play with it",
    "Where should chemicals be kept?|Locked up high|By the sink,In your backpack", "A bottle with no label should be...|Left alone; tell an adult|Opened,Smelled closely"]));
  c.push(L("Food safety", "🧽", "Germs can grow on food. Safe food habits stop you getting sick.", "<b>Clean</b>: wash hands and surfaces. <b>Separate</b>: keep raw meat away from other food. <b>Cook</b>: cook food all the way. <b>Chill</b>: put leftovers in the fridge. Check dates and throw out smelly food.", "Clean, separate, cook, chill.", [
    "Before touching food, you should...|Wash your hands|Wipe them on a towel only,Nothing|🧼", "Raw chicken should be kept...|Away from other foods|On the salad,Touching fruit|🍗",
    "Leftovers go in the...|Fridge|Sunny window,Backpack|🧊", "A food smells bad. You...|Don't eat it|Taste it,Share it",
    "Why cook meat all the way?|To kill harmful germs|To make it bigger,To make it loud", "You should wash fruit and veggies...|Before eating|Never,After eating",
    "Food left out all day is...|Not safe to eat|Fresher,Healthier", "Which keeps food cold?|Refrigerator|Oven,Toaster|🧊"]));
  c.push(C("Sugar in drinks", "🥤", "Reading labels can show how much sugar is in a drink.", "Multiply the grams of sugar in one serving by the number of servings.", "Grams times servings.", () => {
    const g = ri(5, 15), s = ri(2, 4), n = pick(NM);
    return [`A bottle has ${s} servings. Each serving has ${g} grams of sugar. If ${n} drinks the whole bottle, how many grams of sugar is that?`, g * s, "Every serving has the same amount of sugar. Do you add or multiply?", `Multiply ${g} by ${s}, or add ${g} again and again.`, "Example: 3 servings with 4 grams each. 4 + 4 + 4 = 12 grams.", "🥤"];
  }));
  c.push(C("Active week", "👟", "Staying active every day adds up!", "Add the minutes from each day to find the total.", "Add all the days.", () => {
    const x = ri(2, 6) * 10, y = ri(2, 6) * 10, z = ri(2, 6) * 10, n = pick(NM);
    return [`${n} was active ${x} minutes on Monday, ${y} on Tuesday and ${z} on Wednesday. How many minutes in total?`, x + y + z, "You are putting days together. Add or subtract?", "Add the three numbers. Tens are easy: add the tens digits and then put a zero back.", "Example: 20 + 30 + 40 minutes. 2 + 3 + 4 = 9 tens, which is 90 minutes.", "👟"];
  }));
  const c1 = pk(c, [0, 3, 8, 11, 13]), c2 = pk(c, [1, 2, 4, 5, 6, 7, 9, 12, 14, 15, 16, 17]);
  c.push(MIX("Mixed practice", c1));
  c.push(MIX("Level 6 Challenge", c2));

  Object.assign(HEALTH_LEVELS, { 4: a, 5: b, 6: c });
})();
