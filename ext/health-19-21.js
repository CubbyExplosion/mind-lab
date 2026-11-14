// ext/health-19-21.js  Health & Safety levels 19-21 (9th grade, 10th grade first half)
(() => {
  // item format: "question|answer|wrong1,wrong2,wrong3"
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

  // ================= LEVEL 19 =================
  const a = [];
  a.push(L("Homeostasis", "🌡️", "Your body works hard to keep its inside conditions steady, even when the outside changes.",
    "<b>Homeostasis</b> means keeping things like temperature, water and blood sugar in a healthy range. It works by <b>negative feedback</b>: when something drifts too far, the body acts to bring it back. The <b>hypothalamus</b> in the brain is like a thermostat. Normal body temperature is about 98.6 degrees F (37 degrees C).",
    "Ask what changed, and then what the body does to bring it back to normal.", [
    "The body keeping things like temperature steady is called...|Homeostasis|Metabolism,Digestion,Immunity",
    "Which part of the brain acts like a body thermostat?|Hypothalamus|Cerebellum,Brain stem,Skull",
    "You get hot and your body sweats. Why?|Evaporating sweat cools you down|To lose bones,To make you hungrier,To store heat",
    "Shivering when you are cold helps by...|Making muscles create heat|Cooling the skin,Using up water,Slowing the heart",
    "Normal body temperature is about...|98.6 degrees F (37 degrees C)|85 degrees F,110 degrees F,60 degrees C",
    "When blood sugar rises after a meal, the body releases...|Insulin|Adrenaline,Melatonin,Bile",
    "A loop that brings the body back toward normal is called...|Negative feedback|Positive thinking,Dehydration,A growth spurt",
    "Feeling thirsty is a signal that helps you...|Keep your water level steady|Make more sweat,Skip food,Fall asleep"]));
  a.push(L("Insulin and glucagon", "🍬", "Two hormones team up to keep your blood sugar steady.",
    "The <b>pancreas</b> makes <b>insulin</b>, which helps cells take in sugar (glucose) from the blood, so blood sugar goes down. <b>Glucagon</b> does the opposite: it tells the liver to release sugar when blood sugar is low. In <b>type 1 diabetes</b> the body makes little or no insulin. In <b>type 2 diabetes</b> the cells do not respond well to insulin. Healthy food and regular activity lower the risk of type 2.",
    "Think of the two hormones as a see-saw: one lowers blood sugar and one raises it.", [
    "Which organ makes insulin?|Pancreas|Stomach,Kidney,Lung",
    "Insulin helps cells...|Take in sugar from the blood|Make bile,Pump blood,Fight germs",
    "Which hormone raises blood sugar when it is low?|Glucagon|Insulin,Melatonin,Thyroxine",
    "In type 1 diabetes the body makes...|Little or no insulin|Too much bile,Extra bone,No blood",
    "In type 2 diabetes the cells...|Do not respond well to insulin|Have too many vitamins,Stop breathing,Grow too fast",
    "Which habits lower the risk of type 2 diabetes?|Healthy food and regular activity|Skipping all exercise,Drinking lots of soda,Eating very little fiber",
    "Blood sugar that is too low can cause...|Shakiness and dizziness|Stronger bones,Better hearing,A sunburn",
    "Glucose is the body's main...|Quick fuel|Bone mineral,Germ fighter,Hormone"]));
  a.push(L("Balancing nutrients", "🥗", "Carbohydrates, proteins and fats are the three big nutrients that give you energy.",
    "Carbohydrates and protein each have <b>4 calories per gram</b>. Fat has <b>9 calories per gram</b>. Teens do well with roughly half their calories from carbohydrates (45 to 65 percent), 25 to 35 percent from fat and 10 to 30 percent from protein. Protein builds and repairs the body. Healthy fats come from foods like nuts, olive oil and fish.",
    "Match each nutrient with its job or its calories per gram.", [
    "How many calories are in 1 gram of fat?|9|4,2,7",
    "How many calories are in 1 gram of carbohydrate?|4|9,7,2",
    "How many calories are in 1 gram of protein?|4|9,6,1",
    "About how much of a teen's calories should come from carbohydrates?|Around half|Almost none,All of them,One tenth",
    "Which has the most calories per gram?|Fat|Protein,Carbohydrate,Water",
    "A main job of protein is...|Building and repairing body tissue|Being the fastest fuel,Making sweat,Storing vitamins only",
    "A balanced plate mostly has...|A mix of fruits, vegetables, grains and protein|Only one food group,Only sweets,Only drinks",
    "Healthy fats come from foods like...|Nuts, olive oil and fish|Candy and soda,Frosting,Fried snacks only"]));
  a.push(L("Metabolism and BMR", "🔥", "Your body burns energy all day, even when you are resting.",
    "<b>BMR</b> (basal metabolic rate) is the energy your body uses at rest to keep you alive: breathing, pumping blood, keeping warm. Your total energy use is BMR plus digesting food plus physical activity. Muscle uses more energy at rest than fat. Teens in a growth spurt need more energy. Extreme dieting is not safe for a growing teen; a doctor or dietitian can help.",
    "Separate the energy you use at rest from the energy you use moving.", [
    "BMR stands for...|Basal metabolic rate|Big muscle ratio,Body mass result,Blood moving rate",
    "BMR is the energy your body uses...|At rest to keep you alive|Only during sports,Only while eating,Only on weekends",
    "Compared with fat, muscle at rest uses...|More energy|Less energy,The same energy,No energy at all",
    "During a teen growth spurt, energy needs usually...|Go up|Go down,Disappear,Stay at zero",
    "Does skipping meals speed up metabolism in a healthy way?|No, your body needs regular fuel|Yes, always,Yes, it burns fat fast,Only at night",
    "Total daily energy use includes BMR, digesting food and...|Physical activity|Hair color,Eye color,Weather",
    "Extreme dieting for a teen is...|Not recommended and can harm growth|Required for health,A good way to grow,Safe if secret",
    "Who can help a teen plan healthy eating?|A doctor or registered dietitian|An advertiser,A random website,A stranger online"]));
  a.push(L("Chronic stress", "😰", "A little stress can help you, but stress that never ends can wear you down.",
    "<b>Acute stress</b> is short, like nerves before a game. <b>Chronic stress</b> lasts weeks or months. During stress the body releases hormones such as <b>cortisol</b> and adrenaline. Long-term stress can cause headaches, poor sleep, stomach upset and lower defenses against illness. Exercise, sleep, slow breathing and talking to someone you trust all help.",
    "Decide whether the stress is short or long-lasting, then pick the healthy response.", [
    "Stress that lasts for weeks or months is called...|Chronic stress|Acute stress,Mild luck,A reflex",
    "Short, quick stress, like before a game, is called...|Acute stress|Chronic stress,An infection,An allergy",
    "Which hormone is released during stress?|Cortisol|Insulin,Melatonin,Calcium",
    "Long-term stress can lead to...|Headaches, poor sleep and stomach upset|Better sleep and stronger bones,Taller height right away,Perfect focus",
    "Which is a healthy way to handle stress?|Exercise, rest and talking to someone|Ignoring it forever,Staying up all night,Blaming others",
    "Slow deep breathing helps because it...|Calms your body's stress response|Raises your heart rate,Gives you vitamins,Makes you hungry",
    "Some stress can be helpful when it...|Gives you energy to focus|Lasts for months,Makes you ill,Hides problems",
    "If stress feels too big to handle, you should...|Talk to a trusted adult|Keep it secret,Ignore it,Stay awake all night"]));
  a.push(L("Anxiety basics", "🌧️", "Feeling worried is normal. Sometimes worry gets so big that it needs extra help.",
    "Nerves before a test or a big event are <b>normal</b>. Anxiety may need help when it is constant, strong and gets in the way of school, sleep or friends. Signs can include a racing heart, a tight stomach and trouble concentrating. Anxiety is <b>treatable</b>. Slow breathing and the <b>5-4-3-2-1 grounding</b> trick (use your senses to notice things around you) can calm you. A counselor, doctor or therapist can teach more skills.",
    "Ask how strong the feeling is, how long it lasts and whether it blocks daily life.", [
    "Feeling nervous before a test is...|Normal and common|Always a disorder,A sign of failure,Very rare",
    "Anxiety may need extra help when it is...|Constant, strong and gets in the way of life|Short and mild,Rare and brief,Helpful and fun",
    "Which skill can calm anxiety in the moment?|Slow breathing|Holding your breath,Skipping sleep,Avoiding every challenge",
    "The 5-4-3-2-1 grounding trick uses your...|Senses|Muscles only,Memory only,Pulse",
    "Avoiding everything that makes you nervous tends to...|Make worry grow over time|Cure it fast,Make you braver at once,Remove all stress",
    "Anxiety problems are...|Treatable|Impossible to treat,Only for adults,Someone's fault",
    "Who can help with anxiety?|A counselor, doctor or therapist|Nobody,Only a video game,Only a stranger online",
    "A body sign of anxiety can be...|A racing heart or a tight stomach|Growing taller overnight,Itchy hair,Sharper hearing"]));
  a.push(L("Time management", "⏰", "Good planning gives you time for school, friends, sleep and fun.",
    "<b>Prioritizing</b> means doing what is most important and urgent first. <b>Procrastination</b> is putting things off, and it often adds stress. Break big projects into small steps and use a planner or calendar. Short focused study blocks with breaks work better than cramming. Keep sleep in your schedule, because tired brains learn less.",
    "Ask what is due soonest and what matters most, then break it into steps.", [
    "Homework due tomorrow is urgent and important, so you should do it...|First|Last,Never,Next month",
    "Putting off a task until later is called...|Procrastination|Prioritizing,Planning,Practicing",
    "Breaking a big project into small steps makes it...|Easier to start|Impossible,Less clear,More stressful",
    "A planner or calendar helps you...|See deadlines and plan your time|Skip sleep,Do everything at once,Forget tasks",
    "Which gives the best study session?|25 minutes of focus, then a short break|Four hours with no break,Studying with a game on,Cramming all night",
    "Prioritizing means...|Choosing what matters most first|Doing only the easiest thing,Doing nothing,Doing everything at once",
    "Why should sleep stay in your schedule?|Tired brains learn and focus worse|Sleep wastes time,Teens do not need it,It stops homework",
    "Trying to do homework and chat at the same time usually...|Makes both take longer|Doubles your speed,Improves memory,Has no effect"]));
  a.push(L("Spotting fake health news", "🔍", "Anyone can post anything online, so health claims need a careful check.",
    "Warning signs: a <b>miracle cure</b>, no author or date, no sources, shocking words meant to grab your feelings, or a seller who profits from the claim. Trust <b>doctors and trusted health organizations</b>. A personal story (testimonial) is not proof. Likes and shares show popularity, not truth. Check a claim with a reliable source before you share it.",
    "Look at who wrote it, what proof they give, and who profits.", [
    "A 'miracle cure' that fixes everything is probably...|Too good to be true|Proven,A doctor's advice,A school rule",
    "Which source is best for health facts?|A trusted health organization or doctor|An anonymous post,A stranger's video,A friend's guess",
    "A health claim with no author, date or sources is...|Not reliable|Always correct,Fully proven,Checked by experts",
    "Posts full of shocking words are often trying to...|Grab your emotions|Teach carefully,Show data,List their sources",
    "A person selling a product says it cures a disease. They may be...|Trying to make money|A researcher,Without any reason,A teacher",
    "A good habit before sharing a health post is to...|Check it with a reliable source|Share it fast,Share it if it looks cool,Count the likes",
    "Lots of likes and shares tell you a claim is...|Popular, not necessarily true|Proven true,Checked by doctors,Safe for everyone",
    "A testimonial like 'it worked for me' is...|One person's story, not proof|Strong evidence,A scientific study,A guarantee"]));
  a.push(L("Posts, screenshots and the future", "🪪", "What you post today can still be there years from now.",
    "Online posts can be <b>copied, saved or screenshotted</b> by others, even if you delete them. Colleges and employers sometimes look at public posts. Before posting, ask: would I be fine with my family and teachers seeing this? Use <b>privacy settings</b>, ask before posting a friend, and never share your home address or daily schedule publicly.",
    "Imagine the post staying public for ten years before you share it.", [
    "Once something is posted online, it can often be...|Copied or saved by others|Erased perfectly forever,Seen by no one,Kept only on your phone",
    "A screenshot lets someone...|Keep a copy even if you delete the post|Make the post vanish,Edit your account,Slow your phone",
    "Colleges and employers may sometimes...|Look at public posts|Never see anything,Read your private thoughts,Check your height",
    "Before posting, a good question is...|Would I be okay if my family and teachers saw this?|Will it get likes?,Is it quick to write?,Is it long?",
    "Posting a photo of a friend should happen...|Only if they are okay with it|Always without asking,Never ever,Only at night",
    "Privacy settings help you control...|Who can see your posts|The weather,Your grades,Your height",
    "If you post something you regret, you should...|Delete it and tell a trusted adult if it caused trouble|Post more,Hide it forever,Blame others",
    "Sharing your home address or daily schedule publicly is...|Risky|Safe,Required,Helpful"]));
  a.push(L("Passenger and new driver safety", "🚗", "Car crashes are a leading danger for teens, and most safety steps are simple choices.",
    "Everyone in the car should wear a <b>seat belt</b> on every ride, front or back. Phones down: using a phone while driving is dangerous even for a moment. <b>Graduated driver licensing</b> lets new drivers build skill step by step, with limits on night driving and passengers. Higher speed means longer stopping distance. If a driver seems unsafe, distracted or has been using alcohol or drugs, do not ride: call a trusted adult for a ride.",
    "Pick the choice that lowers risk for every person in the car.", [
    "How often should everyone in a car wear a seat belt?|Every ride|Only on highways,Only on long trips,Only in the front",
    "If a driver seems unsafe or has used alcohol or drugs, you should...|Not ride, and call a trusted adult for a ride|Ride anyway,Keep quiet,Sit in the back",
    "Using a phone while driving is...|Dangerous, even for a moment|Safe if quick,Fine on empty roads,Required",
    "Why do many places use graduated driver licensing?|New drivers build skill step by step|To slow all traffic,To teach map reading,To sell cars",
    "Which choice makes new drivers safer?|Fewer passengers and no phone|More friends in the car,Higher speed,Loud music at maximum",
    "Going faster makes stopping...|Take longer and be harder|Easier,Instant,Shorter",
    "A bike or scooter helmet protects your...|Head|Elbows only,Shoes,Phone",
    "Back seat riders should...|Also buckle up|Skip the belt,Lie down,Hold the door"]));
  a.push(L("Shock and the recovery position", "🚑", "Knowing a few first aid steps can help while waiting for emergency crews.",
    "Signs of <b>shock</b> include pale, cool, clammy skin, a fast weak pulse and feeling faint. Call emergency services (911 in the US), help the person lie down and keep warm, and give no food or drink. A person who is <b>unresponsive but breathing</b> can be rolled onto their side in the <b>recovery position</b> to keep the airway clear. Do not move someone with a possible neck or back injury unless they are in immediate danger. When you call, stay on the line and give your location.",
    "Call for help first, then do the simple comfort steps.", [
    "Signs of shock can include...|Pale, cool, clammy skin and a fast weak pulse|Warm red skin and a slow pulse,Very loud singing,Hiccups only",
    "A first step for someone who seems to be in shock is to...|Call emergency services|Give them a big meal,Make them walk,Wait a day",
    "A person in shock should be helped to...|Lie down and stay warm|Run around,Drink soda,Stand up",
    "Should you give food or drink to someone in shock?|No|Yes, a big meal,Yes, hot coffee,Only candy",
    "An unresponsive person who is breathing may be placed on their side in the...|Recovery position|Standing position,Sitting position,Handstand",
    "In the US, the number to call for emergencies is...|911|411,811,711",
    "When you call emergency services, stay on the line and give...|Your location and what happened|Only your name,A joke,Your grades",
    "Do not move a person with a possible neck or back injury unless...|They are in immediate danger|You are in a hurry,It is raining,A friend says so"]));
  a.push(L("A healthy view of food", "🍽️", "Food is fuel, and it is also part of culture, family and fun.",
    "A healthy view of food says <b>all foods can fit</b> in a balanced way. Listen to <b>hunger and fullness cues</b>. Be careful with social media diet trends, which often do not come from health experts. Skipping meals to change your body is not healthy for a growing teen. <b>Eating disorders</b> are real health conditions that can be treated. If you or a friend are very worried about food or weight, tell a trusted adult.",
    "Choose the answer that is kind to the body and the mind.", [
    "A healthy view of food says...|All foods can fit in a balanced diet|Some foods are evil,Never eat dessert,Eat the same thing forever",
    "Hunger and fullness cues are...|Signals from your body|Rules from ads,Meaningless,Only for kids",
    "Social media diet trends are often...|Not made by health experts|Always safe,Perfect for teens,Free medical plans",
    "Skipping meals to change your body is...|Not healthy for a growing teen|Smart,Required,Fun",
    "If a friend seems very worried about every bite of food, a kind step is...|Tell a trusted adult who can help|Make fun of them,Compete with them,Say nothing ever",
    "Eating disorders are...|Real health conditions that can be treated|Choices made on purpose,Just diets,Always a short phase",
    "Which comment about bodies is kind?|Everyone's body grows in its own way|Your body is a project,Bodies must look the same,Only one shape is fine",
    "Food is mainly for...|Fuel, growth and enjoyment|Punishment,Earning points,Winning contests"]));
  a.push(L("Allergy or intolerance?", "🥛", "Some foods bother people, but not all reactions are the same.",
    "A <b>food allergy</b> involves the <b>immune system</b> and can cause hives, swelling or <b>anaphylaxis</b>, a severe emergency. An <b>intolerance</b>, like lactose intolerance, causes digestive discomfort but not an immune attack. <b>Celiac disease</b> is a reaction to gluten. An <b>epinephrine auto-injector</b> treats severe allergic reactions, and the person must still get emergency care. Reading labels and asking about ingredients keeps people safe.",
    "Ask whether the immune system is involved and how serious the reaction is.", [
    "A food allergy involves the...|Immune system|Skeletal system,Skin color,Hearing",
    "Lactose intolerance mostly causes...|Stomach discomfort after dairy|Dangerous throat swelling,Broken bones,A fever from germs",
    "Which can cause anaphylaxis?|A severe food allergy|A mild stomach ache,Lactose intolerance,A cold",
    "An epinephrine auto-injector is used for...|Severe allergic reactions|Colds,Headaches,Sprains",
    "After using an epinephrine auto-injector, a person should...|Still get emergency care|Go back to class quietly,Sleep it off,Skip the doctor",
    "Celiac disease means the body reacts to...|Gluten|Lactose,Vitamin C,Salt",
    "Reading labels helps people avoid...|Foods that cause their reaction|All vegetables,Water,Exercise",
    "Sharing food with someone who has an allergy is safe only if...|You check the ingredients and ask them first|It looks clean,It is a small bite,They smell it"]));
  a.push(L("The chain of infection", "🔗", "Germs spread through a chain of steps, and breaking any link stops the spread.",
    "The links: the <b>pathogen</b> (germ), where it lives, how it <b>exits</b> (a cough or sneeze), how it is <b>transmitted</b>, how it <b>enters</b> (eyes, nose, mouth, cuts) and a <b>susceptible host</b> who can catch it. You can break the chain by washing hands, covering coughs with your elbow, staying home when sick, cleaning surfaces and getting vaccines.",
    "Name which link of the chain is being broken or used.", [
    "The germ that causes a disease is the...|Pathogen|Vaccine,Antibody,Bandage",
    "A person who can catch the germ is called a...|Susceptible host|Pathogen,Vaccine,Antibody",
    "A sneeze that sends germs out is a portal of...|Exit|Entry,Rest,Growth",
    "Germs entering through the eyes, nose or mouth use a portal of...|Entry|Exit,Sleep,Growth",
    "Washing hands helps by...|Breaking the chain of spread|Making germs stronger,Feeding germs,Speeding it up",
    "Staying home while sick helps...|Protect others|Spread germs,Raise your fever,Skip homework",
    "Vaccines break the chain by making a person less...|Susceptible|Hungry,Tall,Clean",
    "Covering a cough with your elbow...|Blocks many droplets|Spreads them,Does nothing at all,Makes germs grow"]));
  a.push(L("Heat exhaustion and heatstroke", "☀️", "Hot weather and hard exercise can overheat the body.",
    "<b>Heat exhaustion</b> shows up as heavy sweating, dizziness, nausea and weakness. Move to a cool, shady place, sip water and tell an adult. <b>Heatstroke</b> is a medical emergency: confusion, very hot skin and a very high body temperature, so call 911. Prevent heat illness with water, light loose clothes, breaks, and practice early or late in the day. Never leave a child or pet in a parked car.",
    "Match the signs to how serious they are and pick the cooling step.", [
    "Heavy sweating, dizziness and nausea in the heat may be...|Heat exhaustion|Frostbite,Hiccups,A cold",
    "Heatstroke signs include confusion and very hot skin, and it is a...|Medical emergency|Mild problem,Minor ache,Normal reaction",
    "For heat exhaustion, move to...|A cool, shady place and sip water|Direct sun,A parked hot car,A sauna",
    "Never leave a child or a pet in a...|Parked car|Shady park,Library,Kitchen",
    "Clothing for hot sports should be...|Light-colored and loose|Dark and thick,Wool,Tight layers",
    "On hot days, practice is safest...|Early or late with water breaks|At noon with no water,Without rest,In heavy gear",
    "If you feel dizzy in the heat during practice, you should...|Stop and tell the coach|Push harder,Hide it,Drink nothing",
    "Which drink best prevents heat illness?|Water|Energy drinks,Soda,Coffee"]));
  a.push(C("Calories from nutrients", "🧮", "You can add up the calories in a snack from the grams of each nutrient.",
    "Carbohydrate = 4 calories per gram. Protein = 4 calories per gram. Fat = 9 calories per gram.", "Multiply each nutrient by its own number, then add.", () => {
    const c = ri(10, 40), p = ri(2, 15), f = ri(1, 14);
    return [`A snack has ${c} g carbohydrate, ${p} g protein and ${f} g fat. Carbohydrate and protein have 4 calories per gram, and fat has 9. How many calories are in the snack?`, 4 * c + 4 * p + 9 * f,
      "Each nutrient has its own calories per gram.", "Multiply each amount by its calories per gram, then add the three results.",
      "Example: 10 g carbohydrate, 5 g protein and 2 g fat is 40 + 20 + 18 = 78 calories.", "🧮"];
  }));
  a.push(C("Sleep debt", "😴", "When you sleep less than you need, the missing hours add up like a debt.",
    "Teens need about 8 to 10 hours a night. Sleep debt = (hours needed minus hours slept) times nights.", "Find the nightly shortage first, then multiply by the number of nights.", () => {
    const nm = pick(NM), h = ri(5, 8), d = ri(3, 6);
    return [`${nm} needs 9 hours of sleep a night but slept only ${h} hours each night for ${d} nights. How many hours of sleep is ${nm} short in total?`, (9 - h) * d,
      "First find how many hours are missing on one night.", "Multiply the missing hours on one night by the number of nights.",
      "Example: needing 9 hours but sleeping 7 for 2 nights is (9 - 7) x 2 = 4 hours short.", "😴"];
  }));
  a.push(C("Drinking after sports", "💧", "Athletes can weigh themselves before and after practice to see how much fluid they lost.",
    "A common guide is to drink at least 16 ounces of fluid for every pound lost during exercise.", "Find the pounds lost, then multiply by 16.", () => {
    const b = ri(100, 160), lost = ri(1, 3);
    return [`An athlete weighed ${b} pounds before practice and ${b - lost} pounds after. Using 16 ounces of fluid for each pound lost, how many ounces should the athlete drink?`, lost * 16,
      "Start by finding how many pounds were lost.", "Subtract the weights, then multiply the pounds lost by 16.",
      "Example: 120 pounds before and 118 pounds after means 2 pounds lost, and 2 x 16 = 32 ounces.", "💧"];
  }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 2, 4, 5, 7, 9, 10, 12, 13, 15, 16])));
  a.push(MIX("Level 19 Challenge", pk(a, [3, 6, 8, 11, 14, 17, 12, 10, 5, 1, 2, 13])));

  // ================= LEVEL 20 =================
  const b = [];
  b.push(L("Fitness and resting heart rate", "❤️", "A fit heart does the same work with fewer beats.",
    "Regular cardio exercise strengthens the heart. A stronger heart pumps more blood with each beat (<b>stroke volume</b>), so resting heart rate often goes <b>down</b>. <b>VO2 max</b> measures how well your body uses oxygen in hard exercise. Teens are advised to get about <b>60 minutes</b> of moving most days. Measure resting pulse when you are calm and rested.",
    "Ask what a stronger heart can do with each beat.", [
    "As the heart gets stronger from training, resting heart rate often...|Goes down|Goes up,Stays the same no matter what,Stops",
    "Stroke volume is the amount of blood pumped by...|One heartbeat|One breath,One meal,One hour",
    "A stronger heart pumps more with each beat, so it can beat...|Fewer times at rest|More times at rest,Never,Only at night",
    "VO2 max measures how well your body uses...|Oxygen during hard exercise|Vitamins,Calcium,Water at lunch",
    "Which activity best builds cardio fitness?|Steady swimming, cycling or running|Stretching only,Napping,Light typing",
    "How many minutes of activity a day are advised for teens?|60|15,30,120",
    "Taking a 30 second pulse count and doubling it gives...|Beats per minute|Breaths per hour,Blood pressure,Temperature",
    "Resting pulse is best measured when you are...|Calm and rested|Just after sprinting,Climbing stairs,Very excited"]));
  b.push(L("Antibodies and immune memory", "🧬", "Your immune system can remember germs it has met before.",
    "<b>Antibodies</b> are proteins made by <b>B cells</b> that latch onto specific germs. <b>Memory cells</b> remember a germ so the body reacts faster next time. <b>Vaccines</b> teach the immune system using a harmless piece or version of a germ. Some protection fades, so <b>boosters</b> help. <b>Herd immunity</b> slows spread when enough people are immune. Antibiotics work on bacteria, not viruses.",
    "Link each word to its job: make, remember, protect or treat.", [
    "Antibodies are proteins that...|Latch onto specific germs|Pump blood,Digest food,Make bone",
    "Memory cells help your body...|Respond faster the next time|Forget germs,Digest sugar,Grow hair",
    "Vaccines teach the immune system using...|A harmless piece or version of a germ|Antibiotics,Extra vitamins,Sunshine",
    "Antibodies passed from a mother to a baby give...|Short-term protection|Lifelong protection always,No protection,Allergies",
    "Herd immunity happens when...|Enough people are immune that spread slows|Everyone is sick,Nobody washes hands,Animals are vaccinated",
    "Why do some people need vaccine boosters?|Protection can fade over time|Germs get hungry,To grow taller,To change blood type",
    "Antibiotics work against...|Bacteria, not viruses|Viruses only,Allergies,Every illness",
    "Which cells make antibodies?|B cells|Red blood cells,Skin cells,Bone cells"]));
  b.push(L("Electrolytes and sports drinks", "🥤", "Sweat carries away more than water.",
    "<b>Electrolytes</b> are minerals such as <b>sodium and potassium</b> that help nerves and muscles work. You lose them in sweat. For most activity under an hour, <b>water</b> is best. A sports drink may help during long, hard exercise in the heat. <b>Energy drinks</b> are different: they contain a lot of caffeine and sugar and are not good for teens. Pale yellow urine usually means you are well hydrated.",
    "Match the drink to how long and how hard the activity is.", [
    "Electrolytes are minerals like...|Sodium and potassium|Protein and fat,Fiber and starch,Vitamin A and C",
    "You lose electrolytes mostly in...|Sweat|Hair,Nails,Teeth",
    "For most activity under an hour, the best drink is...|Water|Sports drink,Energy drink,Soda",
    "A sports drink can help during...|Long, hard exercise in the heat|Sitting in class,Watching a game,A short walk",
    "Why avoid energy drinks?|They have a lot of caffeine and sugar|They are too watery,They are full of protein,They lack flavor",
    "Pale yellow urine usually means you are...|Well hydrated|Dehydrated,Overheated,Sleepy",
    "Dark yellow urine often means you need...|More fluids|Less water,More sugar,Sunlight",
    "Drinking a huge amount of water all at once is...|Not needed; sip steadily|Required,Best for speed,Tastier"]));
  b.push(L("Food help in the community", "🥫", "Some families need help getting enough healthy food, and communities work together to provide it.",
    "<b>Food security</b> means having enough food to be healthy. <b>Food insecurity</b> means not always knowing where the next meal will come from. <b>Food banks</b> and <b>school meal programs</b> help. You can volunteer or donate unopened, in-date food. Anyone who needs help can ask a school counselor or local food bank. Community gardens and farmers markets bring fresh produce closer to people.",
    "Think about who is helped and how a community can share.", [
    "A food bank gives out...|Free food to people who need it|Cars,Books,Medicine only",
    "School meal programs help students...|Get healthy meals during the school day|Skip class,Choose teachers,Win prizes",
    "Having enough food to be healthy is called...|Food security|Food waste,Food poisoning,Food coloring",
    "Not always knowing where the next meal will come from is called...|Food insecurity|Food safety,Food labeling,Food science",
    "Which is a good way to help your community with food?|Donate or volunteer at a food bank|Throw food away,Hide extra food,Take lunches",
    "Donated canned food should be...|Unopened and in date|Open and half eaten,Very old,Bulging or leaking",
    "Someone who needs food help can ask...|A school counselor or local food bank|Nobody,A stranger online,A rumor",
    "Community gardens and farmers markets help by...|Giving access to fresh produce|Shrinking all produce,Closing stores,Removing vegetables"]));
  b.push(L("When a friend needs more help", "🤝", "Being a good friend sometimes means getting an adult involved.",
    "Listen kindly and say, 'I care about you and I'm here.' Do not promise to keep a secret when someone's <b>safety is at risk</b>. If a friend talks about hurting themselves, tell a trusted adult right away. In the US, people can call or text <b>988</b>, the Suicide and Crisis Lifeline, for support. You are a supportive friend, not their only helper, and you should take care of your own feelings too.",
    "Choose the answer that is kind and also brings in trained adults.", [
    "If a friend seems very sad for a long time, a kind step is to...|Listen and encourage them to talk to a trusted adult|Tell them to snap out of it,Laugh it off,Avoid them",
    "If a friend says they might hurt themselves, you should...|Tell a trusted adult right away|Keep it a secret,Wait and see,Change the subject",
    "In the US, which number can you call or text for crisis support?|988|411,311,611",
    "A promise to keep a secret does not count when...|Someone's safety is at risk|It is a birthday gift,It is boring,It is a game",
    "Which is a good thing to say to a struggling friend?|I'm here and I care about you|Stop being dramatic,It's nothing,Everyone has it worse",
    "You can help a friend best by being...|Kind and a good listener|A fixer of everything,Silent,Quick to judge",
    "Who should help when a friend has a serious problem?|Trained adults, with you as a supportive friend|You alone,Social media,Nobody",
    "Taking care of your own feelings while helping friends is...|Important too|Selfish,Not allowed,Pointless"]));
  b.push(L("Focus and multitasking", "🎯", "Your brain is not built to do many hard things at once.",
    "What feels like multitasking is really <b>fast task switching</b>, and every switch costs time and causes mistakes. <b>Notifications</b> break your focus, so silence your phone and put it away while studying. Focus gets stronger with practice. Short movement breaks refresh you, and <b>sleep</b> lets your brain organize what you learned.",
    "Ask whether the choice protects your focus or breaks it.", [
    "The brain is best at doing...|One demanding task at a time|Five tasks at once,Nothing,All tasks perfectly",
    "Switching quickly between tasks usually...|Costs time and causes mistakes|Saves time,Boosts memory,Improves accuracy",
    "Phone notifications while studying...|Break your focus|Help you remember,Make homework faster,Help you sleep",
    "A good study setup is...|Phone away or silenced|Phone in your hand,Notifications on,TV on loudly",
    "Focus is like a muscle that improves with...|Practice|Distraction,Skipping rest,Doing nothing",
    "A short break to move your body can...|Refresh your focus|Ruin your focus,Erase memories,Slow the heart",
    "Deep work is easier with...|A clear goal and a set time|Constant pings,A noisy room,No plan",
    "Sleep helps focus because the brain...|Rests and organizes memories|Shuts down for good,Grows new bones,Stops learning"]));
  b.push(L("Exit plans and saying no", "🚪", "A plan made ahead of time makes it easier to leave a risky situation.",
    "An <b>exit plan</b> is a way to leave an uncomfortable situation safely. You and a parent can pick a <b>code word</b> that means 'please pick me up, no questions.' If anyone offers alcohol, drugs or vaping, the plan is simple: <b>say no, leave, and tell a trusted adult</b>. Short refusals work best. A true friend respects your no. If a ride is unsafe, call a trusted adult for a ride.",
    "Choose the answer that gets you away from risk and to a trusted adult.", [
    "An exit plan is...|A way to leave an uncomfortable situation safely|A map of your school,A homework tool,A race",
    "A code word with a parent can mean...|Please pick me up, no questions|Order pizza,Buy a game,Say goodnight",
    "If anyone offers alcohol, drugs or vaping, the safest plan is to...|Say no, leave and tell a trusted adult|Try a little,Hide it,Take it for a friend",
    "A good short refusal is...|No thanks, I'm leaving|Maybe later,I guess,Let me think for hours",
    "Saying 'my parents need me home' to leave a risky situation is...|A fine way to get out|A crime,Not allowed,Rude only",
    "If your ride is unsafe, you can...|Call a trusted adult for a ride|Ride anyway,Walk alone at night,Ask a stranger",
    "A real friend will...|Respect your no|Pressure you,Dare you,Leave you out always",
    "Telling a trusted adult afterwards is...|Smart and brave|Tattling,Embarrassing,Useless"]));
  b.push(L("Online scams", "🎣", "Scammers try to trick people into giving away money or accounts.",
    "Signs of a scam: a prize you must pay for, pressure to <b>act now</b>, requests for <b>gift cards or codes</b>, and websites that ask for your password for 'free game currency.' Never share passwords or verification codes. Do not click suspicious links; tell a trusted adult. If a stranger online asks for pictures or secrets, <b>stop replying and tell a parent</b>. Use only a game's official trade tools.",
    "Look for pressure, secrecy and requests for passwords or payment.", [
    "A message says you won a prize but must pay first. It is probably a...|Scam|Gift,Contest you entered,Receipt",
    "A scammer often asks to be paid with...|Gift cards or codes|A school bus,A library card,A smile",
    "A site offering free game currency that asks for your password is...|Trying to steal your account|An official game site,Safe,A prize",
    "Pressure like 'act now or lose out' is a sign of...|A scam|A good deal,A fair offer,A legal receipt",
    "What should you never share with an online stranger?|Passwords and verification codes|Favorite color,Favorite season,Favorite shape",
    "If you get a suspicious message, you should...|Not click; tell a trusted adult|Reply fast,Click to check,Forward it to friends",
    "If a stranger online asks for pictures or secrets, you should...|Stop replying and tell a parent|Send one picture,Keep it secret,Ask for a gift",
    "Trading game items safely means using...|Only the game's official trade tools|A stranger's link,Any chat site,Gift card codes"]));
  b.push(L("Severe bleeding", "🩸", "Heavy bleeding needs fast action, and the steps are simple.",
    "Press firmly on the wound with a <b>clean cloth</b> and keep pressing. If blood soaks through, add more cloth on top; do not remove it. Call 911 for heavy bleeding that will not stop. Gloves protect you if available. Do not pull out a large object stuck in a wound; press around it. Help the person lie down if faint. Small cuts: wash with water and mild soap, then cover.",
    "Press, keep pressing and call for help if it is heavy.", [
    "For heavy bleeding, first press on the wound with...|A clean cloth and firm pressure|A tissue lightly,Nothing,Water only",
    "If blood soaks through the cloth, you should...|Add more cloth on top and keep pressing|Remove it and look,Stop pressing,Wash it away",
    "Call emergency services for bleeding that...|Is heavy or won't stop|Is a tiny scratch,Stopped already,Is on a drawing",
    "Before helping, it is smart to protect yourself with...|Gloves if available|Nothing,Perfume,Sunglasses",
    "A small cut is cleaned with...|Water and mild soap|Mud,Glue,Hot oil",
    "Should you pull out a large object stuck in a wound?|No, press around it and get help|Yes, pull it out,Yes, twist it,Yes, shake it",
    "If a person feels faint, help them...|Lie down|Stand up,Run,Jump",
    "A bandage or dressing goes on after...|Bleeding is under control|Before washing,Before pressing,Instead of calling for help"]));
  b.push(L("Life jackets and rip currents", "🏊", "Water is fun when you know the safety rules.",
    "A <b>rip current</b> is a strong channel of water that pulls swimmers away from shore. If you are caught, stay calm and swim <b>parallel to the shore</b> until free. Swim near a <b>lifeguard</b> and never alone: use the <b>buddy system</b>. Wear a fitted <b>life jacket</b> on boats and in open water. Cold water can tire you fast. Floating on your back lets you rest and breathe.",
    "Stay calm, stay near help and stay with a buddy.", [
    "A rip current pulls swimmers...|Away from shore|Toward shore,Straight down,Into the sand",
    "If caught in a rip current, swim...|Parallel to the shore|Straight against it,Straight down,In circles",
    "The best place to swim at a beach is near...|A lifeguard|Rocks alone,A pier alone,Nobody",
    "On a boat, a life jacket should be...|Worn and fitted|Used as a pillow,Left in the bag,Tied to the boat",
    "Never swim alone: use the...|Buddy system|Quiet system,Dark system,Silent system",
    "Floating on your back with your face up helps you...|Rest and breathe|Sink,Speed up,Dive",
    "Cold water can cause...|Fast tiring|Extra strength,Warmer arms,Better hearing",
    "Weak swimmers in open water should wear...|A life jacket|Heavy shoes,Nothing,A backpack"]));
  b.push(L("Backpacks and desks", "🎒", "Posture habits at school can prevent aches.",
    "A loaded backpack should weigh no more than about <b>10 to 15 percent</b> of your body weight. Use <b>both straps</b> and put heavy items close to your back. At a computer, keep the screen near eye level, feet flat on the floor and wrists straight. Stand and move often. Looking down at phones for long can cause 'tech neck.'",
    "Picture a straight, balanced body with the weight close in.", [
    "A loaded backpack should weigh no more than about...|10 to 15 percent of body weight|Half of body weight,All of body weight,Double body weight",
    "Carry a backpack with...|Both straps on your shoulders|One strap only,It hanging on a finger,It on your head",
    "The heaviest items should go...|Close to your back|Far from your back,On the top flap,In a side pocket only",
    "While using a computer, your screen should be...|About at eye level|Below your lap,Above your head,Behind you",
    "At a desk, your feet should rest...|Flat on the floor|On the wall,In the air,On the chair",
    "To protect your wrists while typing, keep them...|Straight and relaxed|Bent sharply,Lifted high,Pressed down",
    "When sitting a long time, you should...|Stand and move now and then|Never move,Slouch lower,Hold your breath",
    "Neck pain from looking down at phones is sometimes called...|Tech neck|Brain freeze,Pillow lag,Swimmer's ear"]));
  b.push(L("Health careers", "🧑‍⚕️", "Many different jobs help keep people healthy.",
    "A <b>dietitian</b> helps with food and nutrition. A <b>physical therapist</b> helps people recover movement and strength. <b>EMTs and paramedics</b> give emergency care. A <b>pediatrician</b> is a doctor for children and teens. An <b>optometrist</b> checks eyes. A <b>school nurse</b> helps with minor illness and health needs. A <b>counselor</b> helps with feelings and stress. An <b>epidemiologist</b> studies how diseases spread.",
    "Link each job title with the part of health it looks after.", [
    "A registered dietitian helps with...|Food and nutrition|Teeth only,Bones only,Eyes only",
    "A physical therapist helps people...|Recover movement and strength|Choose snacks,Fix cars,Teach math",
    "An EMT or paramedic...|Gives emergency care and transport|Cooks food,Fixes teeth,Sells cars",
    "A pediatrician is a doctor for...|Children and teens|Older adults only,Pets,Plants",
    "An optometrist checks...|Eyes and vision|Ears,Hearts,Bones",
    "A school nurse can...|Help with minor illness and health needs|Replace teachers,Fix computers,Grade tests",
    "A mental health counselor helps with...|Feelings, stress and coping|Broken bones,Dental fillings,Eye exams",
    "An epidemiologist studies...|How diseases spread in groups|Rocks,Stars,Poems"]));
  b.push(L("Being your own health advocate", "🗣️", "You can take an active part in your own health care.",
    "Bring a <b>list of questions</b> to appointments and ask the doctor to explain anything you do not understand. Write down symptoms: when they started, how long, how bad. Doctors keep most patient information private, but may tell others if someone's <b>safety</b> is in danger. <b>Informed consent</b> means understanding a treatment before agreeing. A <b>second opinion</b> means asking another doctor. Know your medical history: past illnesses, allergies and medicines.",
    "Prepare, ask and keep track of what you learn.", [
    "At a doctor visit, it helps to bring...|A list of questions|Nothing,A pet,A crowd",
    "If you don't understand what a doctor said, you should...|Ask them to explain it again|Nod and leave,Guess,Ignore it",
    "Doctors keep most information private but may tell others when...|Someone's safety is in danger|You are late,You are shy,You ask a question",
    "Informed consent means you understand...|The treatment before you agree|Only the price,Nothing,The waiting room rules",
    "A second opinion is...|Asking another doctor for their view|Taking double medicine,Skipping the first doctor,A refund",
    "Writing down symptoms helps the doctor...|Understand the problem|Skip the exam,Guess,Charge less",
    "Which is a good question to ask a doctor?|What are my options and what do they involve?|Can we skip the explanation?,Can you be quick?,Do I have to listen?",
    "Your medical history includes...|Past illnesses, allergies and medicines|Favorite songs,Test grades,Friends' names"]));
  b.push(L("Air quality index", "🌫️", "Air can be clean or polluted, and there is a number that tells you which.",
    "The <b>Air Quality Index (AQI)</b> runs from 0 to 500. 0 to 50 is <b>good</b> (green); 51 to 100 moderate (yellow); 101 to 150 unhealthy for sensitive groups (orange); 151 to 200 unhealthy (red); 201 to 300 very unhealthy (purple); 301 and up <b>hazardous</b> (maroon). On bad days, people with asthma should limit outdoor activity. Wildfire smoke irritates eyes and lungs. Check a trusted weather or air-quality service.",
    "Higher numbers mean dirtier air and more care outside.", [
    "AQI values from 0 to 50 mean air quality is...|Good|Hazardous,Unhealthy,Very unhealthy",
    "An AQI of 301 or more is...|Hazardous|Good,Moderate,Fine for sports",
    "On a high-AQI day, sensitive people such as those with asthma should...|Limit outdoor activity|Run harder,Ignore it,Open all the windows",
    "Wildfire smoke can...|Irritate eyes and lungs|Clean the air,Help asthma,Improve sports",
    "On smoky days, a good choice is to...|Stay indoors with windows closed|Do hard outdoor sports,Open windows,Bike far",
    "Where can people check air quality?|A trusted weather or air-quality service|A rumor,A random chat,A rap song",
    "Ozone and tiny particles in the air are types of...|Air pollution|Vitamins,Food groups,Hormones",
    "AQI colors go from green up to...|Maroon (hazardous)|Pink (cozy),Blue (cold),Gold (great)"]));
  b.push(L("Loneliness and connection", "🫶", "Feeling lonely happens to many people, and there are healthy ways to build connection.",
    "Loneliness is <b>common</b> and can change. Strong connections improve mood and health. Join a <b>club, team or group</b> with shared interests. Small acts, like saying hi or inviting someone, build friendship. Being alone sometimes is healthy. If loneliness feels heavy for a long time, talk to a trusted adult or counselor. If someone you only know online asks to meet, say no and tell a parent.",
    "Choose the answer that builds real, safe connection.", [
    "Feeling lonely is...|Common and can be changed|A personal failure,Impossible to fix,Rare",
    "Strong social connections can improve...|Mood and health|Eye color,Shoe size,Height",
    "A good way to meet people with shared interests is...|Joining a club, team or group|Staying away from everyone,Waiting alone,Complaining",
    "Someone you only know online asks to meet. You should...|Say no and tell a parent|Go alone,Keep it secret,Bring a gift",
    "Small acts, like saying hi or inviting someone, help...|Build connection|Cause trouble,Waste time,Hide feelings",
    "Time with family, friends and community is part of...|Social health|Dental health,Skin health,Bone health",
    "If loneliness feels heavy for a long time, you should...|Talk to a trusted adult or counselor|Keep it secret,Ignore it forever,Stay awake all night",
    "Being alone sometimes is...|Healthy and normal|Always bad,Dangerous,Wrong"]));
  b.push(C("Backpack weight limit", "🎒", "A backpack should stay under a share of your body weight.",
    "Maximum pack weight = body weight times the percent, divided by 100.", "Multiply body weight by the percent, then divide by 100.", () => {
    const w = pick([60, 80, 100, 120, 140, 160]), p = pick([10, 15]), nm = pick(NM);
    return [`${nm} weighs ${w} pounds. A backpack should weigh no more than ${p}% of body weight. What is the heaviest pack, in pounds, that ${nm} should carry?`, w * p / 100,
      "The limit is a percent of the whole body weight.", "Multiply the body weight by the percent and divide by 100.",
      "Example: 10% of 90 pounds is 90 x 10 / 100 = 9 pounds.", "🎒"];
  }));
  b.push(C("Interrupted homework", "📵", "Each interruption costs more than the few seconds you look at your phone.",
    "Lost time = interruptions per hour times hours times minutes lost each time.", "Find the total number of interruptions first.", () => {
    const k = ri(2, 6), h = ri(2, 3), m = ri(2, 5), nm = pick(NM);
    return [`${nm} gets ${k} notifications every hour while studying for ${h} hours. Each interruption costs ${m} minutes to refocus. How many minutes are lost in all?`, k * h * m,
      "Count the total interruptions across all the hours.", "Total interruptions times the minutes lost each time.",
      "Example: 3 per hour for 2 hours is 6 interruptions, and 6 x 4 minutes = 24 minutes.", "📵"];
  }));
  b.push(C("Median sleep", "🛌", "The median is the middle number when the numbers are in order.",
    "Put the numbers from smallest to largest. With five numbers, the median is the third one.", "Order them first, then pick the middle.", () => {
    const base = ri(6, 8), vals = shuf([base - 1, base, base + ri(0, 1), base + 1, base + 2].map(x => Math.max(x, 5)));
    const sorted = [...vals].sort((x, y) => x - y);
    return [`A student slept ${vals.join(", ")} hours on five nights. What is the median number of hours?`, sorted[2],
      "The median is the middle value, not the total.", "Write the numbers in order from smallest to largest, then find the middle one.",
      "Example: 9, 6, 8, 7, 10 in order is 6, 7, 8, 9, 10, and the middle is 8.", "🛌"];
  }));
  b.push(MIX("Mixed practice", pk(b, [0, 1, 2, 4, 5, 7, 8, 10, 12, 13, 15, 16])));
  b.push(MIX("Level 20 Challenge", pk(b, [3, 6, 9, 11, 14, 17, 12, 10, 5, 1, 2, 13])));

  // ================= LEVEL 21 =================
  const c = [];
  c.push(L("Understanding risk", "📊", "Health news often talks about risk. Knowing what it means helps you decide wisely.",
    "A <b>risk factor</b> raises the chance of a problem; it does not make it certain. <b>Protective factors</b>, like exercise, lower the chance. Some risk factors can be changed, like wearing a helmet, and some cannot, like age. A risk of <b>1 in 100</b> means about 1 person out of every 100. When a headline says a risk 'doubles', ask: <b>doubles from what number?</b>",
    "Use real numbers, and remember likely is not the same as certain.", [
    "A risk of 1 in 100 means about...|1 person out of every 100|100 people out of 1,Half of everyone,Nobody",
    "Risk factors are things that...|Raise the chance of a health problem|Guarantee it,Cure it,Make it vanish",
    "Having a risk factor means a problem is...|More likely, not certain|Certain,Impossible,Cured",
    "Protective factors, like exercise, make problems...|Less likely|More likely,Certain,Invisible",
    "Which risk can you change?|Whether you wear a helmet|Your age,Your genes,Your birthplace",
    "A risk that doubles from 1 in 1000 to 2 in 1000 is still...|A small risk overall|Certain,Huge,Impossible",
    "When a headline says a risk 'doubles', you should ask...|Doubles from what starting number?|Who wrote the headline's font?,How many pictures?,Is it colorful?",
    "To compare risks fairly, use...|Actual numbers, like 5 in 1000|Scary words,Rumors,Feelings only"]));
  c.push(L("Chronic disease risk factors", "🫀", "Many long-term conditions start from habits and traits built over years.",
    "<b>Chronic diseases</b> last a long time, such as heart disease, type 2 diabetes and some cancers. Some risk factors cannot be changed (age, family history). Others can: <b>activity, food, sleep, not using tobacco</b>. <b>Screening tests</b> find problems early. Healthy habits started in the teen years often last into adulthood.",
    "Sort each factor into changeable or not changeable.", [
    "Chronic diseases are conditions that...|Last a long time|Last one day,Are always caught from friends,Are never serious",
    "Which risk factor can you not change?|Your age|Your diet,Your activity,Your sleep habits",
    "Which risk factor can you change?|Your daily activity level|Your age,Your genes,Your birth date",
    "Heart disease risk goes down with...|Regular activity and healthy food|Skipping sleep,Daily soda,Sitting all day",
    "Type 2 diabetes risk is raised by...|Long periods of inactivity and poor diet|Walking daily,Eating fiber,Sleeping well",
    "Tobacco use raises the risk of...|Many cancers and lung disease|Stronger lungs,Better fitness,Faster running",
    "Screening tests help by finding problems...|Early|Late,Never,By accident",
    "Healthy habits started in the teen years...|Often last into adulthood|Never matter,Fade in a week,Only help pets"]));
  c.push(L("Global health wins", "🌍", "People around the world have worked together to beat diseases and improve health.",
    "<b>Smallpox</b> was declared eradicated worldwide in 1980, thanks to vaccination. <b>Polio</b> cases have fallen by over 99 percent since 1988. <b>Clean water, sanitation</b> (safe handling of waste) and <b>handwashing</b> prevent many stomach and breathing infections. Bed nets help prevent <b>malaria</b>. Groups like the World Health Organization work on health for people everywhere.",
    "Match each health win with what made it possible.", [
    "Which disease was declared eradicated worldwide in 1980?|Smallpox|Measles,Flu,Chickenpox",
    "Clean drinking water helps prevent diseases like...|Cholera and typhoid|Broken bones,Sunburn,Hay fever",
    "Handwashing with soap lowers the spread of...|Stomach and breathing infections|Broken bones,Tooth decay,Sunburn",
    "Polio cases have fallen by over 99 percent mostly thanks to...|Vaccination|Candy,Rain,Magnets",
    "Sanitation means safe ways to deal with...|Waste and sewage|Sports,Music,Books",
    "The World Health Organization works on...|Health for people around the world|Only one town,Only one sport,Only video games",
    "Mosquito bed nets help prevent...|Malaria|Cavities,Colds,Sprains",
    "Life expectancy has risen over the last century mostly thanks to...|Better sanitation, nutrition and medicine|Fewer showers,More sugar,Less sleep"]));
  c.push(L("Thoughts, feelings and actions", "🔺", "What you think affects how you feel and what you do.",
    "Thoughts, feelings and actions are <b>connected</b>. An unhelpful thought like 'I always fail' is all-or-nothing thinking. Test it: What is the <b>evidence</b>? A more balanced thought might be 'I didn't get it yet, but I can improve.' Small positive actions, like a walk, can lift mood. <b>Cognitive behavioral therapy (CBT)</b> teaches these skills.",
    "Notice the thought, test it, then choose a balanced version.", [
    "Thoughts, feelings and actions are...|Connected to each other|Totally separate,Always identical,Not related to mood",
    "Changing an unhelpful thought can change how you...|Feel and act|Grow,Hear,See colors",
    "'I always fail' is an example of...|An all-or-nothing thought|A fact,A plan,A hobby",
    "A more balanced thought is...|I didn't get it yet, but I can improve|I am hopeless,Nothing ever works,Why try",
    "Asking 'What is the evidence for this thought?' helps you...|Check if it is true|Ignore it,Believe it more,Argue with a friend",
    "Taking a walk when you feel low can...|Lift your mood|Make it worse always,Erase memories,Cause sleep problems",
    "A talk therapy that teaches these skills is...|Cognitive behavioral therapy (CBT)|Physical therapy,Occupational therapy,Speech therapy",
    "If a thought upsets you a lot, you can...|Pause, breathe and test the thought|Believe it right away,Hide from everyone,Stay awake all night"]));
  c.push(L("What drives you", "🔥", "Why you do something affects whether you keep doing it.",
    "<b>Intrinsic motivation</b> comes from inside: you enjoy it or it matters to you. <b>Extrinsic motivation</b> comes from outside, like prizes or praise. Intrinsic motivation tends to last longer. <b>Tracking progress</b>, a workout buddy and <b>celebrating small wins</b> help. Goals that matter to you personally are more likely to be followed through.",
    "Ask: is the reason inside me, or is it a reward from outside?", [
    "Doing a sport because you enjoy it is...|Intrinsic motivation|Extrinsic motivation,No motivation,A reward",
    "Doing a sport to earn a prize is...|Extrinsic motivation|Intrinsic motivation,Laziness,A feeling",
    "Which kind of motivation tends to last longer for healthy habits?|Intrinsic|Extrinsic,Random,Neither",
    "Tracking progress, like marking a calendar, helps by...|Showing how far you've come|Hiding mistakes,Making goals bigger,Skipping rest",
    "A workout buddy helps because of...|Support and accountability|Magic,Less sleep,Extra homework",
    "When motivation dips, habits help because they...|Run on routine, not mood|Need constant excitement,Never change,Cost money",
    "Celebrating small wins...|Builds confidence|Wastes effort,Lowers energy,Stops progress",
    "A goal that matters to you personally is more likely to be...|Followed through|Forgotten,Ignored,Dropped at once"]));
  c.push(L("The teen brain", "🧠", "Your brain is still under construction, and that is a good thing.",
    "The <b>prefrontal cortex</b>, the part for planning and weighing choices, keeps developing until about age <b>25</b>. Teen brains learn new things quickly and the reward system makes new things feel extra exciting. That is why planning ahead helps with risky choices. <b>Neuroplasticity</b> means the brain forms new connections as you learn. Sleep helps build memory. Harmful substances are especially risky for a developing brain, so the plan is to say no and ask a trusted adult for help.",
    "Link the brain part or fact to its job.", [
    "The part of the brain for planning and weighing choices is the...|Prefrontal cortex|Brain stem,Cerebellum,Spinal cord",
    "The prefrontal cortex keeps developing until about age...|25|10,13,16",
    "Teen brains are very good at...|Learning new things quickly|Never changing,Stopping growth,Forgetting everything",
    "Because judgment is still developing, teens may...|Take more risks, so planning ahead helps|Never take risks,Always plan perfectly,Stop learning",
    "Sleep is important for teens because the brain...|Builds memory and repairs itself overnight|Turns off for good,Grows hair,Gets smaller",
    "The brain's reward system makes new, exciting things feel...|Extra appealing|Boring,Scary always,Invisible",
    "Harmful substances are especially risky for a developing brain, so the safe choice is to...|Say no and ask a trusted adult for help|Try a little,Hide it,Copy friends",
    "Neuroplasticity means the brain can...|Change and form new connections|Never change,Stop growing,Turn into bone"]));
  c.push(L("Reporting and blocking", "🚫", "Online tools can help you stop mean or unsafe behavior.",
    "If someone sends mean or scary messages: <b>do not reply</b>, <b>save proof</b> (screenshots), <b>block</b> them, <b>report</b> them to the app and <b>tell a trusted adult</b>. Reporting is not tattling; it protects people. A bystander can report the post and support the person targeted. If anyone threatens you or asks for private pictures, stop replying, save proof and tell a parent.",
    "Remember the steps: save, block, report, tell.", [
    "If someone sends you mean or scary messages, first...|Do not reply; save proof and tell a trusted adult|Reply angrily,Delete it all,Send it to others",
    "Blocking someone online...|Stops them from contacting you on that app|Deletes your account,Makes them your friend,Hides their name forever",
    "Reporting a post to the platform...|Asks the app to review it|Deletes the internet,Punishes you,Guarantees nothing",
    "Screenshots of harassment are useful as...|Evidence|Decoration,Memes,Punishment",
    "A bystander who sees cyberbullying can...|Report it and support the target|Join in,Laugh,Ignore it",
    "If someone asks for private pictures, you should...|Stop replying, save proof and tell a parent|Send one,Keep it secret,Ask why",
    "Reporting mean content is...|Not tattling; it protects people|Tattling,Rude,Pointless",
    "Choosing who can comment on your posts is a...|Privacy tool|Mistake,Way to spy,Waste of time"]));
  c.push(L("Safe first jobs", "🧰", "A first job is exciting, and your safety comes first.",
    "Young workers have the right to a <b>safe workplace</b>, and laws limit the hours and kinds of work for younger teens. Lift with your <b>knees bent and the load close</b>. Report or mark hazards like wet floors. If a task feels unsafe or you are not trained, <b>ask a supervisor</b> before starting. Take breaks to avoid fatigue. If anyone makes you uncomfortable, tell a trusted adult and report it.",
    "When unsure, stop and ask before you act.", [
    "Young workers have the right to...|A safe workplace|Skip all rules,Work unlimited hours,Ignore safety",
    "Laws limit the hours and kinds of work for...|Younger teens|Nobody,Only adults,Only pets",
    "To lift something heavy safely, bend your...|Knees and keep the load close|Back and twist,Neck,Elbows",
    "If a task feels unsafe or you are not trained, you should...|Ask a supervisor before starting|Try it anyway,Hide it,Rush through it",
    "A wet floor at work should be...|Reported or marked with a sign|Ignored,Used for sliding,Hidden",
    "Breaks at work help prevent...|Fatigue and injuries|Wages,Vitamins,Weather",
    "Safety training is meant to...|Protect workers|Slow everyone down,Waste time,Cost jobs",
    "If a coworker makes you uncomfortable, you should...|Tell a trusted adult and report it|Keep it secret,Quit silently,Ignore it forever"]));
  c.push(L("Safe outings", "🧭", "A little planning makes outings with friends safer and more fun.",
    "Use the <b>buddy system</b>: stay with a partner. Tell a parent <b>where you will be, who with and when you will return</b>. Keep your phone <b>charged</b> with family numbers handy. If plans change, let your parent know right away. At big events pick a <b>meeting spot</b> in case you get separated. If you feel unsafe, go to a busy place with staff, like a store, and call a parent.",
    "Plan ahead: who, where, when and how to reach home.", [
    "The buddy system means...|Staying with a partner so someone is always with you|Going alone,Hiding from friends,Splitting up,Racing ahead",
    "Before going out, tell a parent...|Where you will be, who with and when you will return|Only the weather,Nothing,Only your snack choice",
    "Keep your phone...|Charged, with family numbers handy|Off,At home,Dead",
    "If plans change, you should...|Let your parent know right away|Keep it secret,Wait until tomorrow,Go anyway",
    "At a big event, pick a meeting spot in case...|You get separated|You are hungry,It is sunny,Music plays",
    "Sharing your live location is a safety tool when done with...|Trusted family only|Strangers,Everyone online,Anyone who asks",
    "When walking home, stay alert by...|Keeping headphones low or off|Wearing both earbuds loud,Running blind,Staring at your phone",
    "If you feel unsafe, go to...|A busy place with staff, then call a parent|A dark alley,A stranger's car,An empty lot"]));
  c.push(L("Organic, local and GMO", "🌽", "Food labels use many words. Some have real meaning and some do not.",
    "<b>Organic</b> farming limits many synthetic pesticides and fertilizers and is a regulated label. Organic produce is not shown to be much more nutritious. <b>Wash all produce</b>, organic or not. <b>GMO</b> means genetically modified organism; major science and health groups say approved GMO foods are safe to eat. <b>Local</b> food often travels a shorter distance. Words like 'natural' or 'farm style' have no strict meaning.",
    "Separate what a label legally means from what it only suggests.", [
    "Organic farming limits...|Many synthetic pesticides and fertilizers|All plants,Sunlight,Water",
    "Organic produce is...|Not shown to be much more nutritious|Always twice as nutritious,Free of all germs,Only for adults",
    "You should wash fruits and vegetables...|Whether or not they are organic|Only if organic,Never,Only in winter",
    "GMO stands for...|Genetically modified organism|Good meal option,Green made oil,Grown mostly outdoors",
    "Major science and health groups say approved GMO foods on the market are...|Safe to eat|Poisonous,Illegal,Plastic",
    "Local food often travels...|A shorter distance|A longer distance,Around the globe,Through the air",
    "Eating more fruits and vegetables is healthy...|However they are grown|Only if organic,Only if local,Only in summer",
    "Which food label word has a legal meaning in the US?|Organic|Wholesome,Farm style,Yummy"]));
  c.push(L("Fitness myths", "🏋️", "Some fitness ideas sound true but are not.",
    "<b>Spot reduction</b> is a myth: exercising one area does not burn fat only there. <b>No pain, no gain</b> is a myth: sharp pain is a warning sign. Sweat shows your body is cooling, not how much fat you burned. Lifting with good form and supervision does not stunt growth. Rest days help you recover. Muscle does not turn into fat. A great goal is moving most days in ways you enjoy.",
    "Be careful with promises that sound too easy or too extreme.", [
    "Can you burn fat from only one body area by exercising it?|No, fat loss happens across the body|Yes, with crunches,Yes, with wraps,Yes, by sweating more",
    "'No pain, no gain' is a myth because...|Sharp pain is a warning sign|Pain makes muscle,Exercise never hurts,Pain is required",
    "Sweat shows that...|Your body is cooling itself|You burned extra fat,You are fitter,You are dehydrated",
    "Lifting weights with good form and supervision makes teens...|Stronger|Shorter for sure,Weaker,Slower",
    "Rest days...|Help your body recover and grow stronger|Undo your training,Are lazy,Cause injuries",
    "If you stop working out, muscle turning into fat is...|A myth; they are different tissues|True,Always true,Proven",
    "A great exercise goal for health is...|Moving most days in ways you enjoy|Punishing workouts,Burning off every snack,Hours of daily pain",
    "Are supplement powders needed to get fit?|No, food and training are the base|Yes, always,Yes, for teens,Only the expensive ones"]));
  c.push(L("Purpose and helping others", "🌱", "Helping others is good for them and for you.",
    "Helping others often boosts your own <b>mood</b>. Volunteering builds skills and connection. A sense of <b>purpose</b> is linked to better wellbeing. Examples: cleaning up a park with a group, helping at a food drive. Ask a parent, teacher or school counselor how to find a volunteer role, and always volunteer with a trusted group and an adult leader.",
    "Look for the answer that helps others and keeps you safe.", [
    "Helping others often boosts your own...|Mood|Height,Shoe size,Eye color",
    "Volunteering can build...|Skills and connection|Only free time,Only money,Only noise",
    "A sense of purpose is linked to...|Better wellbeing|Worse sleep,Less friendship,Higher stress",
    "Which is an example of service?|Cleaning up a park with a group|Playing a game alone,Buying a snack,Watching videos",
    "Kindness is good for the person helped and...|The helper too|Nobody,Only strangers,Only teachers",
    "A good first step to find a volunteer role is to ask...|A parent, teacher or school counselor|A stranger online,Nobody,A random ad",
    "Gratitude and giving help people feel...|More connected|More alone,Less rested,More bored",
    "Volunteering safely means working with...|A trusted group and an adult leader|Strangers alone,A hidden chat,No one"]));
  c.push(L("Choosing the right care", "🏥", "Different health problems need different places for help.",
    "For a life-threatening emergency, <b>call 911 or go to the emergency room</b>. <b>Urgent care</b> is for problems that need care soon but are not life-threatening. A regular doctor or clinic handles checkups and mild illness. A <b>pharmacist</b> answers questions about medicines. <b>Telehealth</b> is a visit by video or phone. <b>Nurse help lines</b> can advise whether to seek care.",
    "Match how serious and how urgent the problem is to the place.", [
    "For a life-threatening emergency, go to...|The emergency room or call 911|A friend's house,A store,School only",
    "For a mild sore throat, a good first step is...|Your regular doctor or a clinic|The emergency room,A stranger online,Waiting a year",
    "A pharmacist can answer questions about...|Medicines|Cars,Sports scores,Homework",
    "Urgent care is for problems that need care soon but are...|Not life-threatening|Imaginary,Funny,Free",
    "Telehealth is...|A visit with a health provider by video or phone|A kind of vitamin,A hospital building,A sports team",
    "A yearly checkup is usually a visit when you are...|Well, to stay healthy|Dizzy,Bleeding,Unconscious",
    "Which needs 911 right away?|Trouble breathing or severe bleeding|A small paper cut,A mild itch,A stuffy nose",
    "Nurse help lines can...|Give advice on whether to seek care|Fix homework,Sell medicine,Replace emergency care"]));
  c.push(L("AI and health information", "🤖", "AI chatbots can be handy, but they are not doctors.",
    "AI answers about health can be <b>wrong or out of date</b>, and they can sound very confident. A chatbot cannot examine you or diagnose you. Check health answers with a <b>reliable source or a doctor</b>. Keep your <b>private information private</b>. In an emergency, call emergency services. AI can also make fake health videos and pictures, so check where something came from.",
    "Use AI as a starting point and then check with trusted people and sources.", [
    "An AI chatbot's health answer can be...|Wrong or out of date|Always perfect,A diagnosis,A prescription",
    "Can a chatbot diagnose you like a doctor who examines you?|No, a doctor must examine you|Yes, always,Yes, if it sounds sure,Only on weekends",
    "Before trusting an AI health answer, you should...|Check it with a reliable source or a doctor|Share it right away,Trust it fully,Ignore all facts",
    "Should you type your private details into a chatbot?|No, keep private information private|Yes, everything,Yes, your address,Yes, your passwords",
    "AI can sound confident even when it...|Is mistaken|Is perfect,Is a doctor,Is a pharmacist",
    "A good use of AI is...|Helping you understand a term, then checking a reliable source|Replacing your doctor,Choosing your medicine,Diagnosing a rash",
    "In an emergency you should...|Call emergency services, not ask a chatbot|Chat for an hour,Search for jokes,Wait it out",
    "Fake health videos made by AI can look real, so...|Check where they came from|Share them fast,Trust them all,Never think about them"]));
  c.push(L("Two-factor, updates and public Wi-Fi", "🔐", "Staying safe online protects your accounts and your private information.",
    "<b>Two-factor authentication</b> adds a second proof it is you, such as a code. <b>Software updates</b> often fix security holes. On <b>public Wi-Fi</b> avoid entering passwords or private information. Use a long, unique password for each account, and a <b>password manager</b> can help. Never share a verification code. If an account may be hacked, tell a trusted adult and change the password.",
    "Add layers: strong password, second check, updates, and careful sharing.", [
    "Two-factor authentication adds...|A second proof it's you, like a code|A second password to share,A new username,A louder alarm",
    "Software updates often include...|Security fixes|New passwords,Extra ads,Slower speed",
    "On public Wi-Fi you should avoid...|Entering passwords or private information|Reading the news,Looking at maps,Listening to music",
    "A strong password or passphrase is...|Long and unique|Short and simple,Your name,The same everywhere",
    "Should you reuse one password for everything?|No, use a different one for each account|Yes, it is easier,Yes, if it is long,Only for games",
    "A password manager helps by...|Storing strong unique passwords|Sharing your passwords,Guessing them,Deleting them",
    "A verification code should be shared with...|Nobody|Any friend,Anyone who asks nicely,A website pop-up",
    "If an account may be hacked, you should...|Tell a trusted adult and change the password|Ignore it,Post about it,Share the code"]));
  c.push(C("Risk as a percent", "📈", "A percent shows how many out of every 100.",
    "Percent = (count divided by total) times 100.", "Divide the count by the total, then multiply by 100.", () => {
    let t, p, k;
    do { t = pick([20, 25, 40, 50, 100, 200, 250, 500]); p = pick([2, 4, 5, 8, 10, 20, 25, 40]); k = t * p / 100; } while (!Number.isInteger(k) || k < 1);
    return [`In a survey of ${t} students, ${k} said they sleep less than 7 hours on school nights. What percent of the students is that?`, p,
      "A percent compares the part to the whole group.", "Divide the part by the whole, then multiply by 100.",
      "Example: 5 out of 50 students is 5 / 50 = 0.1, which is 10%.", "📈"];
  }));
  c.push(C("Bacteria doubling", "🦠", "Some bacteria can double in number about every 20 minutes in warm food.",
    "After each doubling the number is multiplied by 2. One hour has three 20 minute periods.", "Count the doublings, then multiply by 2 for each one.", () => {
    const n = pick([3, 4, 5]), s = pick([2, 5, 10]);
    return [`Food left in the danger zone starts with ${s} bacteria. They double every 20 minutes. How many bacteria are there after ${n * 20} minutes?`, s * Math.pow(2, n),
      "First work out how many 20 minute periods have passed.", "Multiply the starting number by 2 once for each period.",
      "Example: starting with 3, after two doublings it is 3 x 2 x 2 = 12.", "🦠"];
  }));
  c.push(C("Cost per serving", "🛒", "Unit price tells you which food is the better deal.",
    "Cost per serving = total price divided by the number of servings.", "Change the price to cents, then divide by the servings.", () => {
    let sv, cp;
    do { sv = pick([4, 5, 8, 10, 12, 20, 25]); cp = pick([20, 25, 30, 40, 50, 60, 75, 80]); } while ((sv * cp) % 100 !== 0);
    return [`A box of oatmeal packets costs $${(sv * cp) / 100} and has ${sv} servings. How many cents does one serving cost?`, cp,
      "Think of the price split equally across the servings.", "Turn dollars into cents (multiply by 100), then divide by the servings.",
      "Example: $3 for 6 servings is 300 cents divided by 6 = 50 cents.", "🛒"];
  }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 3, 4, 5, 7, 9, 11, 12, 13, 15, 16])));
  c.push(MIX("Level 21 Challenge", pk(c, [2, 6, 8, 10, 14, 17, 12, 9, 5, 1, 0, 13])));

  Object.assign(HEALTH_LEVELS, { 19: a, 20: b, 21: c });
})();
