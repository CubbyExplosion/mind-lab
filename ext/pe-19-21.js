// ext/pe-19-21.js  PE levels 19-21 (grade 9 both halves, grade 10 first half)
(() => {
  const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben", "Kai", "Eva"];
  // T: topic quiz. row string "q~answer~wrong1~wrong2~optional clue" (q may start "emoji|")
  const T = (title, v, intro, facts, tip, ex, rows, nudge) => {
    const items = rows.map(r => r.split("~"));
    const f = () => {
      const it = pick(items); let q = it[0], vis;
      const bar = q.indexOf("|"); if (bar > 0) { vis = q.slice(0, bar); q = q.slice(bar + 1); }
      const o = { text: q, choices: shuf([it[1], it[2], it[3]]), answer: it[1],
        hints: [nudge || "Read the question slowly, then think about the key idea from the lesson.", it[4] || tip, "Example: " + ex + " Now do yours."] };
      if (vis) o.visual = vis;
      return o;
    };
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "How to think", v: "✏️", t: ex + " " + tip }];
    return f;
  };
  const N = (title, v, intro, facts, tip, gen) => {
    const f = () => gen();
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Tip", v: "🖐️", t: tip }];
    return f;
  };
  const MIX = (...ms) => {
    const f = () => pick(ms)();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ms.slice(0, 4).map(m => m.teach()[0]));
    return f;
  };
  const L = (title, make) => ({ title, make });

  // ================= LEVEL 19 =================
  const a1 = T("How muscles grow", "💪", "When you train, muscles adapt. <b>Hypertrophy</b> means muscle fibers get bigger and stronger.",
    "Growth needs a <b>challenge</b> a little harder than usual, <b>protein</b> for building blocks, enough food energy, and <b>rest and sleep</b> so the body can repair. Muscles that are not used shrink. That is <b>atrophy</b>.",
    "Remember the recipe: challenge, protein, rest.", "After a hard week of pull-ups, the muscles rebuild a little stronger during rest days.", [
    "What is hypertrophy?~Muscle fibers getting bigger~Bones getting longer~Fat turning into muscle~Look at what grows: it is about muscle.",
    "What is atrophy?~Muscle shrinking from not being used~Muscle getting bigger~A broken bone~Think of what happens to a muscle that is never used.",
    "When do muscles mostly repair and grow stronger?~During rest and recovery~Only while lifting~While you are warming up~The body builds after the work is done.",
    "Which nutrient supplies the building blocks for muscle repair?~Protein~Salt~Fiber~Eggs, beans and fish are good sources of it.",
    "Can fat turn into muscle?~No, they are different tissues~Yes, with enough sit-ups~Yes, after one week~Think about whether two different tissues can swap.",
    "An arm is kept in a cast for six weeks. What happens to its muscles?~They shrink (atrophy)~They grow (hypertrophy)~They stay exactly the same~Muscles that are not used lose size.",
    "Which habit helps muscles recover and grow?~Sleeping 8 to 10 hours a night~Staying up late~Skipping meals~Teen bodies do a lot of repair at night.",
    "To keep adapting, training must slowly become…~A little harder over time~Easier every week~Exactly the same forever~Muscles stop changing if nothing new is asked of them."]);
  const a2 = T("Hormones and exercise", "🧪", "<b>Hormones</b> are chemical messengers made by glands and carried in the blood. Exercise changes several of them.",
    "<b>Adrenaline</b> speeds up the heart and breathing. <b>Endorphins</b> help you feel good after exercise. <b>Insulin</b> helps cells take in sugar from the blood. <b>Cortisol</b> is a stress hormone. <b>Growth hormone</b> is released mostly during deep sleep.",
    "Match each hormone to its job.", "Before a big race your heart pounds because adrenaline has been released.", [
    "What are hormones?~Chemical messengers carried in the blood~Types of muscle~Bones in the arm~They are made by glands and travel in the blood.",
    "Which hormone speeds up your heart before a race?~Adrenaline~Insulin~Growth hormone~It is the 'fight or flight' hormone.",
    "Which chemicals help you feel good after exercise?~Endorphins~Cholesterol~Calcium~Their name sounds like 'endogenous morphine' but they are natural and safe.",
    "Which hormone helps cells take sugar out of the blood?~Insulin~Adrenaline~Cortisol~It is made by the pancreas.",
    "Which organ makes insulin?~Pancreas~Lungs~Skin~It sits behind the stomach.",
    "Which hormone is called the stress hormone?~Cortisol~Insulin~Endorphin~Too much of it for too long is not healthy.",
    "When is most growth hormone released?~During deep sleep~During a meal~While watching a screen~It is another reason sleep matters.",
    "Adrenaline is made by glands that sit on top of the…~Kidneys~Lungs~Knees~Their name is a clue: ad-renal means 'near the kidney'."]);
  const a3 = T("Gas exchange in the lungs", "🫁", "In the lungs, oxygen moves into the blood and carbon dioxide moves out. This swap is called <b>gas exchange</b>.",
    "Air reaches tiny sacs called <b>alveoli</b>. Their walls are very thin and covered with <b>capillaries</b>. Gases move by <b>diffusion</b>, from where there is more of them to where there is less. Red blood cells carry oxygen using <b>hemoglobin</b>.",
    "Oxygen goes in, carbon dioxide goes out, and the alveoli are where it happens.", "Oxygen is high in the alveoli and low in the blood arriving from the body, so oxygen moves into the blood.", [
    "What are the tiny air sacs in the lungs called?~Alveoli~Ventricles~Tendons~They look like tiny bunches of grapes.",
    "Which gas moves from the alveoli into the blood?~Oxygen~Carbon dioxide~Helium~Muscles need this gas to make energy.",
    "Which gas moves from the blood into the alveoli to be breathed out?~Carbon dioxide~Oxygen~Nitrogen~It is a waste gas made by working cells.",
    "What is diffusion?~Particles moving from more to less~Particles moving from less to more~Air being pushed by the heart~Think of a smell spreading across a room.",
    "Which part of red blood cells carries oxygen?~Hemoglobin~Insulin~Cartilage~It also makes blood red.",
    "What muscle moves down to help you breathe in?~Diaphragm~Biceps~Heart~It is a dome-shaped muscle under the lungs.",
    "Why are the alveoli walls very thin?~So gases can pass through quickly~So they can store food~So they can make hormones~Think about what has to get across the wall.",
    "Compared with the air you breathe in, the air you breathe out has more…~Carbon dioxide~Oxygen~Nitrogen~The body added a waste gas."]);
  const a4 = T("Body composition", "⚖️", "<b>Body composition</b> describes what the body is made of: fat, muscle, bone, water and organs.",
    "<b>Lean mass</b> is everything that is not fat. Some fat is <b>essential</b> for health. <b>BMI</b> uses only height and weight, so it cannot tell muscle from fat. Waist size and body-fat tests give extra information. Health habits matter more than any one number.",
    "A single number never tells the whole story.", "A rugby player may have a high BMI because of muscle, not extra fat.", [
    "What is lean mass?~Everything in the body that is not fat~Only muscle~Only bone~It includes muscle, bone, organs and water.",
    "Why can BMI be misleading for a very muscular athlete?~It cannot tell muscle from fat~It only measures height~It only measures age~BMI uses height and weight only.",
    "Is some body fat necessary for health?~Yes, essential fat protects organs and helps hormones~No, all fat is harmful~Only for adults~Think about whether the body needs any stored energy.",
    "Which measure gives extra information about fat stored around the middle?~Waist size~Shoe size~Arm length~You measure it with a tape.",
    "BMI is calculated from…~Weight and height~Age and heart rate~Sleep and food~It needs only two measurements.",
    "Which is the best focus for long-term health?~Healthy habits~One number on a scale~Copying a celebrity~Habits are things you do every day.",
    "Which of these is part of lean mass?~Muscle~Stored belly fat~Fat under the skin~Lean means 'not fat'.",
    "Two people weigh the same. What could be different?~Their proportions of fat and muscle~Their number of bones~Their number of lungs~Weight does not show what the body is made of."]);
  const a5 = T("Rugby basics", "🏉", "Rugby is a running and passing team sport with an oval ball. Rugby union has 15 players per side.",
    "Players may only pass <b>backward or sideways</b>. A <b>try</b> is worth 5 points: the ball is put down over the try line. A kick after it, the <b>conversion</b>, is worth 2. Tackles must be below the shoulders. <b>Touch</b> and <b>tag</b> rugby avoid tackling.",
    "Pass backward to go forward as a team.", "A team scores a try (5) and converts it (2), so it earns 7 points.", [
    "In which direction may a rugby ball be passed?~Backward or sideways~Forward only~Any direction~Players run forward but pass the other way.",
    "How many points is a try worth in rugby union?~5~3~1~It is more than a kick at goal.",
    "How many points is a conversion kick worth?~2~5~7~It is less than a try.",
    "How many players are on one rugby union team on the field?~15~11~9~It is more than a soccer team.",
    "How do you score a try?~Ground the ball over the try line~Kick it out of bounds~Pass it forward~You must touch it down.",
    "Tackles in rugby must be made…~Below the shoulders~Around the neck~Above the head~Safety rule: keep the tackle low.",
    "Which version of rugby avoids tackling?~Touch or tag rugby~Union~League~It is a gentler way to play.",
    "A team scores two tries and one conversion. How many points is that?~12~10~7~Add 5 + 5 + 2."]);
  const a6 = T("Table tennis", "🏓", "Table tennis is a fast racket sport played on a table with a light ball.",
    "A game is played to <b>11 points</b>, and you must win by <b>2</b>. The server changes every 2 points. The serve must bounce once on your side and once on the opponent's. <b>Topspin</b> makes the ball dip and jump forward after the bounce; <b>backspin</b> makes it slow down.",
    "Win by two points, serve twice, and watch the spin.", "At 10-10 the game goes on until one player leads by 2, such as 12-10.", [
    "A table tennis game is normally played to how many points?~11~21~7~It is more than 10.",
    "At 10-10, what happens?~Play on until someone leads by 2~The next point wins~The game is a draw~There is a 'win by' rule.",
    "How many points does a player serve before the server changes?~2~5~1~It is a small even number.",
    "On a serve, where must the ball bounce first?~On the server's side of the table~Only on the floor~On the net~The server hits it onto their own half first.",
    "Which spin makes the ball dip and kick forward after bouncing?~Topspin~Backspin~No spin~The top of the ball rolls forward.",
    "Which spin makes the ball slow down after bouncing?~Backspin~Topspin~Sidespin only~The ball spins against its direction.",
    "A player leads 11-9. Who wins the game?~That player~Nobody yet~The other player~Check the win-by-2 rule.",
    "What divides the two halves of a table tennis table?~The net~A line on the floor~A wall~Players hit the ball over it."]);
  const a7 = T("Routines and self-talk", "🧠", "Athletes use mental tools to stay calm. A <b>pre-performance routine</b> is a set of steps you repeat before a skill.",
    "A routine might be: breathe, bounce the ball, pick a target, shoot. <b>Positive self-talk</b> uses helpful words. Focus on the <b>process</b> (what to do) instead of the outcome (winning). <b>Choking</b> is when you perform worse because of pressure.",
    "Same steps, calm breath, helpful words.", "Before a free throw, a player bounces the ball twice, breathes out and looks at the rim every time.", [
    "What is a pre-performance routine?~Steps repeated before doing a skill~A warm-up lap~A type of diet~You do the same steps each time.",
    "Which is the best self-talk before a tough shot?~'Breathe and focus on the target.'~'I always mess this up.'~'Everyone is watching me fail.'~Choose words that help you do the next step.",
    "Focusing on the process means thinking about…~What you will do next~The final score~What the crowd thinks~Process means the steps.",
    "What is 'choking' in sport?~Playing worse because of pressure~Swallowing something wrong~A tackle~It is a mental problem, not a physical one.",
    "Which tool helps you calm down quickly before a skill?~A slow deep breath~Holding your breath~Rushing~Breathing is slow and steady.",
    "Why do athletes repeat the same routine each time?~It builds calm and focus~It wastes time~It tires them out~Repeated habits become automatic.",
    "Which is a process goal?~Keep my eyes on the ball~Win the trophy~Beat last year's rival~You control it fully.",
    "What is visualization?~Picturing yourself doing the skill well~Watching TV~Reading the rules~It happens in your mind."]);
  const a8 = T("RAMP warm-up", "🔥", "A good warm-up has a plan. Coaches use <b>RAMP</b> to remember the order.",
    "<b>R</b>aise: easy jogging or skipping to raise pulse and temperature. <b>A</b>ctivate: wake up key muscles, such as glute bridges. <b>M</b>obilize: move joints through their range with dynamic stretches. <b>P</b>otentiate: sport-specific drills at higher effort.",
    "Raise, Activate, Mobilize, Potentiate.", "A sprinter jogs (R), does bridges (A), swings the legs (M), then does short fast runs (P).", [
    "What does the R in RAMP stand for?~Raise~Rest~Repeat~It is the first, easy step that gets the body going.",
    "What does the A in RAMP stand for?~Activate~Aim~Advance~Think of switching muscles on.",
    "What does the M in RAMP stand for?~Mobilize~Measure~Match~It is about moving joints.",
    "What does the P in RAMP stand for?~Potentiate~Pause~Pass~It means getting ready with sport drills at higher effort.",
    "Which step comes first in a RAMP warm-up?~Raise~Potentiate~Mobilize~It starts easy.",
    "Light jogging to raise pulse belongs to which step?~Raise~Potentiate~Mobilize~It gets the body warm.",
    "Short, fast, sport-specific drills belong to which step?~Potentiate~Raise~Activate~It is the last step before playing.",
    "Leg swings and arm circles through a full range are examples of…~Mobilizing~Raising~Cooling down~They are dynamic moves for the joints."]);
  const a9 = T("Plate and portions", "🍽️", "Healthy eating is about balance and sensible portions.",
    "Aim for about <b>half the plate</b> to be fruits and vegetables, with the rest <b>whole grains</b> and <b>protein</b>. Choose whole grains over refined ones, and limit added sugars. Fullness signals take about 20 minutes, so eat slowly.",
    "Half veggies and fruit, a quarter grains, a quarter protein.", "A balanced dinner may be a big salad, brown rice and chicken or beans.", [
    "About how much of a balanced plate should be fruits and vegetables?~Half~One tenth~All of it~It is the biggest part.",
    "Which is a whole grain choice?~Brown rice~White sugar~Candy~It still has the outer layer of the grain.",
    "Which gives you more fiber?~An apple with skin~Fruit juice with no pulp~A soda~Fiber is found in whole fruits.",
    "Why eat slowly?~Fullness signals take time to reach the brain~It makes food taste worse~It burns more fat~The stomach and brain talk slowly.",
    "What are added sugars?~Sugars put in food during making~Sugars naturally in whole fruit~Salt~They are added, not natural.",
    "Which is a good source of protein?~Beans~Soda~Hard candy~Think of foods that build and repair muscle.",
    "Which drink is best for staying hydrated every day?~Water~Soda~Sweet tea~Sugar-free and simple.",
    "Which meal pattern gives steady energy?~Regular meals and healthy snacks~Skipping breakfast~Only candy~Eating at regular times keeps energy steady."]);
  const a10 = T("Planes of movement", "📐", "Movements are described using three imaginary flat sheets, called <b>planes</b>, that cut through the body.",
    "<b>Sagittal</b> plane splits left from right: movements forward and backward, like running or a squat. <b>Frontal</b> plane splits front from back: side-to-side moves like jumping jacks. <b>Transverse</b> plane splits top from bottom: twisting and rotating.",
    "Forward-back = sagittal. Side-to-side = frontal. Twisting = transverse.", "A golf swing rotates the body, so it mostly happens in the transverse plane.", [
    "Which plane is used for forward and backward movement, like running?~Sagittal~Frontal~Transverse~It splits the body into left and right halves.",
    "Which plane is used for side-to-side movement?~Frontal~Sagittal~Transverse~It splits the body into front and back.",
    "Which plane is used for twisting?~Transverse~Sagittal~Frontal~It splits the body into upper and lower halves.",
    "A jumping jack mostly moves in which plane?~Frontal~Sagittal~Transverse~Arms and legs move out to the side.",
    "A bicep curl mostly moves in which plane?~Sagittal~Frontal~Transverse~The forearm moves forward and up.",
    "A baseball swing mostly uses which plane?~Transverse~Sagittal~Frontal~The body rotates.",
    "A cartwheel mostly moves in which plane?~Frontal~Sagittal~Transverse~It travels sideways.",
    "A sit-up (curling forward) mostly moves in which plane?~Sagittal~Frontal~Transverse~It goes forward and back."]);
  const a11 = T("Balancing school and sport", "📅", "Busy students juggle homework, sports, friends and sleep. Good planning prevents stress.",
    "Use a <b>planner</b>, put the hardest task first, and break big jobs into steps. Protect your <b>sleep</b>. It is okay to say no to extra things. If you feel overwhelmed, talk to a coach, teacher or family member. Too much of one activity can cause <b>burnout</b>.",
    "Plan, prioritize, rest, ask for help.", "Write down practice times and homework deadlines, then place study blocks between them.", [
    "What is a good tool for managing time?~A planner or calendar~Staying up late~Ignoring deadlines~You write tasks and times in it.",
    "What is burnout?~Feeling worn out from doing too much~A kind of sports injury~Sunburn~It comes from too much pressure for too long.",
    "If you are overwhelmed, what is a smart step?~Talk to a trusted adult~Hide it~Quit everything at once~Sharing a problem makes it smaller.",
    "Which task should usually go first when planning?~The most important or hardest one~The easiest one~The one you like most~Prioritize.",
    "How can you handle a big project?~Break it into small steps~Do it all the night before~Skip it~Small steps feel doable.",
    "Which is it okay to do when you already have a full schedule?~Politely say no to more~Say yes to everything~Skip sleep~Protect your time.",
    "Why protect sleep when you are busy?~It helps your brain and body perform~It wastes time~It makes homework harder~Rested students learn better.",
    "Which sign may mean you are doing too much?~Constant tiredness and no fun in your sport~Feeling happy and energetic~Sleeping well~Think about how it makes you feel."]);
  const a12 = T("Being a team captain", "🧢", "A captain leads a team on and off the field. Good leaders help others do well.",
    "Captains <b>lead by example</b>, communicate clearly, listen, include everyone and stay calm. They encourage teammates after mistakes, help settle disagreements fairly and respect coaches and officials.",
    "A great captain lifts others up.", "After a teammate drops a pass, the captain says 'Shake it off, next play!'", [
    "What does 'lead by example' mean?~Do what you ask others to do~Tell others what to do~Stay quiet~Show it through your own actions.",
    "A teammate makes a mistake. What should a captain say?~'Shake it off, next play!'~'That was terrible.'~Nothing, just roll eyes~Encourage, do not blame.",
    "Two teammates argue. A good captain will…~Help them talk calmly and fairly~Pick a side~Ignore it~Fairness matters.",
    "A new player joins the team. The captain should…~Welcome and include them~Leave them out~Make fun of them~Make them feel part of the team.",
    "Which is a key leadership skill?~Listening~Interrupting~Bragging~A leader hears ideas from others.",
    "How should a captain talk to the referee?~Politely and respectfully~Shouting~Ignoring~Respect is part of the job.",
    "Who should a captain pay attention to?~Every teammate~Only the best players~Only friends~Leaders include everyone.",
    "After a loss, a good captain…~Stays positive and focuses on learning~Blames teammates~Gives up~Look for what to improve."]);
  const a13 = T("Cross-training", "🚴", "<b>Cross-training</b> means using a mix of different activities to build fitness.",
    "It works different muscles, lowers the chance of <b>overuse injuries</b>, keeps training fun and lets one area rest. A runner might swim or cycle on some days. Injured athletes can often cross-train to keep their fitness while the injury heals.",
    "Same goal, different activity.", "A runner with a sore knee swims to keep their heart and lungs fit.", [
    "What is cross-training?~Mixing different activities to build fitness~Doing one sport only~Training only on weekends~Cross means across different things.",
    "A runner swims on rest days. Why is this helpful?~Works the heart with less pounding on joints~It makes running illegal~It removes the need to rest~Water supports your weight.",
    "Which injury risk does cross-training reduce?~Overuse injuries~Sunburn~Hiccups~Doing the same motion again and again causes them.",
    "Which activity is a good cross-training choice for a soccer player?~Cycling~Sitting still~Only stretching~Pick the activity that works the legs without the impact of the sport.",
    "A swimmer adds strength training. This is…~Cross-training~Overtraining~Cooling down~It builds a different fitness type.",
    "A basketball player has an ankle injury. A good cross-training idea is…~Upper-body strength work~Running a marathon~Ignoring the injury~Keep other parts working while the ankle heals.",
    "Why can cross-training keep training fun?~It adds variety~It is always easier~It is shorter~Doing new things stops boredom.",
    "Which sport best matches the idea of cross-training itself?~Triathlon (swim, bike, run)~Single sprint~Darts~It combines three activities."]);

  const b1 = N("Body mass index", "⚖️", "<b>BMI</b> = mass in kilograms ÷ (height in meters × height in meters). It is a quick screening number, not a verdict on health.",
    "Square the height first: 1.5 m × 1.5 m = 2.25. Then divide the mass by that number. To go backward, multiply BMI by the squared height to get the mass.",
    "Square the height, then divide (or multiply to go backward).", () => {
    const data = [[1.5, 36], [1.5, 45], [1.5, 54], [1.5, 63], [2, 60], [2, 80], [2, 100]];
    const [h, m] = pick(data), sq = h * h, bmi = m / sq;
    if (ri(1, 2) === 1) return { text: `A person is ${h} m tall and has a mass of ${m} kg. What is the BMI? (BMI = kg ÷ height²)`, visual: "⚖️", answer: bmi,
      hints: ["Multiply the height by itself first.", "Divide the mass by the squared height.", "Example: 50 kg and 2 m: 2 × 2 = 4, then 50 ÷ 4 = 12.5. Now do yours."] };
    return { text: `A person who is ${h} m tall has a BMI of ${bmi}. What is their mass in kg? (mass = BMI × height²)`, visual: "⚖️", answer: m,
      hints: ["Go backward: the opposite of dividing is multiplying.", "Square the height, then multiply by the BMI.", "Example: BMI 20 at 2 m: 2 × 2 = 4, so 20 × 4 = 80 kg. Now do yours."] };
  });
  const b2 = N("MET-minutes", "🔥", "A <b>MET</b> measures how hard an activity is compared with resting. Walking briskly is about 3 METs and running about 8 METs.",
    "<b>MET-minutes</b> = METs × minutes. Health guides suggest roughly 500 to 1000 MET-minutes a week. For a week, multiply the MET-minutes of one session by the number of sessions.",
    "METs times minutes, then times days.", () => {
    const met = pick([3, 4, 5, 6, 8]), min = pick([20, 30, 45, 60]), d = ri(2, 5), name = pick(NAMES);
    if (ri(1, 2) === 1) return { text: `${name} does an activity worth ${met} METs for ${min} minutes. How many MET-minutes is that?`, visual: "🔥", answer: met * min,
      hints: ["Combine how hard it is with how long it lasts.", "Multiply METs by minutes.", "Example: 5 METs for 20 minutes = 100 MET-minutes. Now do yours."] };
    return { text: `${name} does a ${met}-MET activity for ${min} minutes on ${d} days. How many MET-minutes in the week?`, visual: "📅", answer: met * min * d,
      hints: ["First find one session, then count the days.", "Multiply METs × minutes, then multiply by the number of days.", "Example: 4 METs × 30 minutes = 120, over 2 days = 240. Now do yours."] };
  });
  const b3 = N("Fat mass and lean mass", "🧍", "Body-fat percent tells how much of your mass is fat. <b>Fat mass</b> = mass × percent ÷ 100.",
    "Find the fat mass first. Then <b>lean mass</b> = total mass − fat mass.",
    "Percent means 'out of 100'.", () => {
    const m = pick([40, 60, 80, 100]), p = pick([10, 15, 20, 25, 30]), fat = m * p / 100, name = pick(NAMES);
    if (ri(1, 2) === 1) return { text: `${name} has a mass of ${m} kg and ${p}% body fat. How many kg of fat is that?`, visual: "🧍", answer: fat,
      hints: ["Take a percent of the total mass.", "Multiply the mass by the percent, then divide by 100.", "Example: 50 kg with 10% fat: 50 × 10 ÷ 100 = 5 kg. Now do yours."] };
    return { text: `${name} has a mass of ${m} kg and ${p}% body fat. What is the lean mass in kg?`, visual: "🧍", answer: m - fat,
      hints: ["Lean mass is what is left after taking away fat.", "First find the fat mass (mass × percent ÷ 100), then subtract it from the total.", "Example: 50 kg with 10% fat: fat = 5, lean = 50 − 5 = 45. Now do yours."] };
  });
  const b4 = N("Slope is speed", "📈", "On a distance-time graph, the <b>slope</b> of the line is the speed. A steeper line means faster.",
    "Slope = change in distance ÷ change in time. Subtract the two distances, subtract the two times, then divide. To find time, divide the distance covered by the speed.",
    "Rise over run: distance change ÷ time change.", () => {
    const v = ri(2, 8), t1 = ri(0, 5), dt = ri(2, 6), d1 = ri(0, 20), d2 = d1 + v * dt, t2 = t1 + dt;
    if (ri(1, 2) === 1) return { text: `A runner is ${d1} m from the start at ${t1} s and ${d2} m from the start at ${t2} s. What is the speed in m/s?`, visual: "📈", answer: v,
      hints: ["How far did the runner go, and how long did it take?", "Subtract the distances and the times, then divide the distance change by the time change.", "Example: from 4 m at 1 s to 20 m at 5 s: 16 ÷ 4 = 4 m/s. Now do yours."] };
    return { text: `A cyclist rides at ${v} m/s on a flat path. How many seconds does it take to go from ${d1} m to ${d2} m along the path?`, visual: "🚴", answer: dt,
      hints: ["Find how far the cyclist travels.", "Subtract the distances, then divide by the speed.", "Example: from 10 m to 50 m at 5 m/s: 40 ÷ 5 = 8 s. Now do yours."] };
  });
  const b5 = N("Beats over time", "💓", "Your heart works all day. We can use multiplication to count its beats.",
    "Beats = beats per minute × minutes. There are 60 minutes in an hour. To compare two heart rates, find the difference per minute first.",
    "Convert hours to minutes first.", () => {
    const hr = pick([60, 65, 70, 75, 80]), h = ri(2, 4), name = pick(NAMES);
    if (ri(1, 2) === 1) return { text: `${name}'s heart beats ${hr} times a minute while resting. How many beats in ${h} hours?`, visual: "💓", answer: hr * 60 * h,
      hints: ["Change hours to minutes first.", "Multiply the beats per minute by the number of minutes (hours × 60).", "Example: 70 beats a minute for 2 hours = 70 × 120 = 8,400. Now do yours."] };
    const lo = hr - pick([6, 8, 10, 12]);
    return { text: `Training lowers ${name}'s resting heart rate from ${hr} to ${lo} beats a minute. How many fewer beats is that in one hour?`, visual: "💓", answer: (hr - lo) * 60,
      hints: ["Find the difference in beats per minute first.", "Multiply that difference by 60 minutes.", "Example: 72 down to 66 saves 6 beats a minute, 6 × 60 = 360 an hour. Now do yours."] };
  });

  // ================= LEVEL 20 =================
  const c1 = T("Blood pressure", "🩸", "<b>Blood pressure</b> is the push of blood against artery walls. It is written as two numbers, such as 120/80, in mmHg.",
    "The top number, <b>systolic</b>, is the pressure when the heart beats. The bottom number, <b>diastolic</b>, is the pressure between beats. Regular exercise, less salt and a healthy weight help keep it lower. <b>Hypertension</b> means high blood pressure, and it often has no symptoms.",
    "Top = beating, bottom = resting between beats.", "A reading of 120/80 means systolic 120 and diastolic 80.", [
    "In a reading of 118/76, which number is systolic?~118~76~42~It is the top number.",
    "The bottom blood pressure number is called…~Diastolic~Systolic~Pulse~It is the pressure between heartbeats.",
    "Systolic pressure is measured when the heart is…~Beating (squeezing)~Resting between beats~Stopped~Think about the push.",
    "What unit is blood pressure measured in?~mmHg~kg~km/h~It is millimeters of mercury.",
    "What does hypertension mean?~High blood pressure~Low blood sugar~A fast run~'Hyper' means over.",
    "Which habit can help lower blood pressure?~Regular exercise~Eating extra salty snacks~Never moving~Moving the heart helps.",
    "Why is high blood pressure called a 'silent' problem?~It often has no symptoms~It makes loud noises~It only happens at night~You may feel fine.",
    "What is the cuff used to measure blood pressure called?~Sphygmomanometer~Stethoscope~Thermometer~It wraps around the upper arm."]);
  const c2 = T("Inside a muscle", "🔬", "A muscle is made of bundles of long cells called <b>muscle fibers</b>. Inside them are tiny threads that do the pulling.",
    "Fibers contain <b>myofibrils</b>, made of <b>actin</b> and <b>myosin</b> filaments. When a nerve signal arrives, the filaments slide past each other and the muscle shortens. This needs <b>calcium</b> and <b>ATP</b>. A <b>motor unit</b> is one nerve plus all the fibers it controls.",
    "Signal arrives, filaments slide, muscle shortens.", "When you bend your arm, millions of filaments slide to shorten the biceps.", [
    "Muscles are made of bundles of…~Muscle fibers~Alveoli~Neurons only~They are long cells.",
    "Which two proteins slide past each other to contract a muscle?~Actin and myosin~Insulin and glucose~Keratin and collagen~Their names start with A and M.",
    "What gives the energy for filaments to slide?~ATP~Salt~Fiber~It is the energy molecule.",
    "What carries the signal to make a muscle contract?~A nerve (motor neuron)~A bone~A vein~It carries messages from the brain.",
    "What is a motor unit?~A nerve and the fibers it controls~A type of bone~A muscle machine~One nerve plus its fibers.",
    "When a muscle contracts, its filaments…~Slide past each other~Break~Freeze~They glide along.",
    "Which mineral helps start muscle contraction?~Calcium~Iron only~Iodine~Strong bones also need it.",
    "Muscle fibers are bundled together in a muscle like…~Strands in a rope~Beads in a ring~Drops in a pond~Many parallel threads."]);
  const c3 = T("Recovery breathing (EPOC)", "😮‍💨", "After hard exercise you keep breathing hard for a while. Scientists call this <b>EPOC</b>: excess post-exercise oxygen consumption.",
    "Extra oxygen is used to restore ATP and stored energy, remove waste, cool the body and bring the heart rate down. The harder the workout, the longer recovery takes. An <b>active cool-down</b> can help.",
    "The body repays its energy bill after hard work.", "After sprints you pant for minutes even though you have stopped moving.", [
    "Why do you still breathe hard right after stopping a sprint?~The body is repaying oxygen use~Lungs are broken~Muscles are bored~The body is paying back a debt after the effort.",
    "What does EPOC stand for?~Excess post-exercise oxygen consumption~Easy practice of constant exercise~Energy per oxygen cell~Read each word: excess, post, exercise.",
    "Which workout leads to a bigger EPOC?~A hard interval session~A slow stroll~Sitting still~The harder, the more repaying.",
    "What does the extra oxygen help restore?~Energy stores like ATP~Hair~Tooth enamel~The stores used up during exercise need refilling.",
    "What can help the body ease down after hard exercise?~An active cool-down~Stopping suddenly and sitting~Another sprint~Slow movement keeps blood flowing.",
    "As the body recovers, heart rate…~Falls back toward resting~Stays at the top level forever~Doubles~The heart calms down.",
    "Which person will probably recover faster after a hard run?~Someone who is aerobically fit~Someone who never exercises~It is always the same~Fit hearts recover quicker.",
    "EPOC mostly shows that the body…~Keeps working after exercise ends~Stops everything at once~Has no energy~Recovery has costs."]);
  const c4 = T("Rep ranges and goals", "🏋️", "In strength training, the number of <b>reps</b> and the heaviness of the weight point to different goals.",
    "Heavy weight with <b>1 to 5 reps</b> builds maximal strength. <b>6 to 12 reps</b> with a medium weight builds muscle size. <b>15 or more reps</b> with a light weight builds muscular endurance. Always use good form and a spotter or supervisor for heavy lifts.",
    "Heavy and few = strength. Medium = size. Light and many = endurance.", "Someone doing 20 light squats is training endurance, not maximum strength.", [
    "Heavy weight for 1 to 5 reps mainly builds…~Maximal strength~Muscular endurance~Flexibility~The weight is heavy, the reps are few.",
    "6 to 12 reps with a medium weight mainly builds…~Muscle size~Max flexibility~Speed only~It is the middle range.",
    "15 or more light reps mainly builds…~Muscular endurance~Maximal strength~Bone length~Light and many.",
    "Which goal fits 3 reps of a very heavy squat?~Strength~Endurance~Cardio~Few reps, heavy.",
    "Which goal fits 20 reps of a light push-up variation?~Endurance~Max strength~Reaction time~Many easy reps.",
    "A student wants bigger muscles. Which plan fits best?~3 sets of 10 reps~1 rep at maximum~100 reps with no weight~Aim for the middle range.",
    "Why use a spotter for heavy lifts?~For safety~To lift for you~To make it slower~Heavy lifts can go wrong.",
    "What matters most before adding weight?~Good form~Speed~Loud music~Safe technique first."]);
  const c5 = T("Motivation", "🔥", "<b>Motivation</b> is the reason you start and keep going. It can come from inside you or from outside.",
    "<b>Intrinsic</b> motivation: you do it because you enjoy it or it feels meaningful. <b>Extrinsic</b> motivation: you do it for rewards, like trophies or praise. Intrinsic motivation tends to last longer. We feel motivated when we feel <b>capable</b>, have <b>choices</b> and feel <b>connected</b> to others.",
    "Inside reasons last longer than outside rewards.", "A student who skates just because it is fun is intrinsically motivated.", [
    "Playing because it is fun is…~Intrinsic motivation~Extrinsic motivation~No motivation~The reason comes from inside.",
    "Training mainly to win a trophy is…~Extrinsic motivation~Intrinsic motivation~Inner joy~The reason is outside you.",
    "Which type usually lasts longer?~Intrinsic~Extrinsic~They are the same~It does not depend on rewards.",
    "A friend joins you at practice, making it more fun. Which need is met?~Feeling connected~Winning~Trophies~You are not alone.",
    "Choosing your own workout makes you feel…~In control and motivated~Bored~Forced~Choice helps motivation.",
    "A coach praises effort, not just results. This helps you feel…~Capable~Useless~Rushed~Progress is visible.",
    "Which is an extrinsic reward?~A medal~Enjoying the run~Feeling proud~You can hold it.",
    "What can you do when motivation drops?~Set a small goal and find a partner~Quit immediately~Skip rest~Start small."]);
  const c6 = T("Field hockey basics", "🏑", "Field hockey is a team sport played with curved sticks and a hard ball. Eleven players per side, including a goalkeeper, play on the field.",
    "Players use only the <b>flat side</b> of the stick and may not hit the ball dangerously high. Goals must be scored from inside the <b>striking circle</b>. Players cannot play the ball with their feet or body (except the goalkeeper in the circle). Protective gear includes shin guards and a mouthguard.",
    "Flat side only; shoot from the circle.", "A forward must be inside the circle before shooting, or the goal does not count.", [
    "How many players per side are on a hockey field at once?~11~9~15~Same as soccer.",
    "Which side of the stick may a player use to hit the ball?~The flat side~The round side~Either side~The stick has one legal side.",
    "From where must a goal be scored?~Inside the striking circle~From midfield~Anywhere~The area in front of the goal.",
    "Which protective gear is common in field hockey?~Shin guards and mouthguard~Ski goggles~Swimming cap~Think about the body parts that get hit by sticks and balls.",
    "Players may not play the ball with their…~Feet or body~Stick~Hands in a pass only~Only the stick is allowed.",
    "Why must the ball not be hit dangerously high?~It could hurt someone~It is boring~It is slower~Safety rule.",
    "Who may play the ball with their body inside the circle?~The goalkeeper~Any forward~The referee~Their kit allows it.",
    "A shot from outside the circle that crosses the line is…~Not a goal~Two goals~A goal~The circle rule."]);
  const c7 = T("Officials and fair calls", "🧑‍⚖️", "<b>Officials</b> such as referees and umpires keep games safe and fair.",
    "They know the rules, use <b>signals</b> to show decisions, and try to be consistent. The <b>advantage rule</b> lets play continue when stopping would hurt the team that was fouled. Players should accept decisions respectfully. Only the captain should talk to officials, and only politely.",
    "Respect the call, play on.", "A referee shows advantage by waving play on with an arm.", [
    "What is the job of a referee?~Keep the game fair and safe~Help the best team~Sell tickets~They enforce the rules.",
    "What does the advantage rule do?~Lets play continue if stopping would hurt the fouled team~Stops every foul~Gives points~It keeps the game flowing.",
    "How do officials show their decisions?~With signals~By texting~By chanting~They are shown without speaking.",
    "A call goes against you. What should you do?~Accept it respectfully~Argue loudly~Quit~Players show good sportsmanship.",
    "Why do officials try to be consistent?~So the rules apply the same to everyone~So games last longer~To be popular~Fairness for all.",
    "Who should speak politely to officials?~The captain~Every fan~No one~Only one person per team.",
    "Which official name is often used in tennis and baseball?~Umpire~Referee only~Coach~It is not 'referee' in these sports.",
    "If you disagree with a call, the best response is to…~Stay calm and play on~Yell at the referee~Walk off~Keep your focus."]);
  const c8 = T("Hygiene in sports", "🧼", "Teams share spaces, mats and sometimes equipment, so germs can spread easily.",
    "Wash hands with soap, do not share towels or water bottles, wear sandals in showers, and clean mats and equipment. Cover cuts with a bandage. Stay home if you have a fever or are very sick. Wash sports clothes often.",
    "Clean hands, clean gear, no sharing.", "Spraying and wiping a mat after use stops germs from going to the next person.", [
    "Which habit best stops the spread of germs?~Washing hands with soap~Sharing towels~Skipping showers~Think about what you do at a sink.",
    "Why should you not share a water bottle?~Germs can pass through saliva~It tastes different~It is too heavy~Spit travels.",
    "Why wear sandals in the shower room?~To avoid foot infections like athlete's foot~To stay taller~To look stylish~Fungus grows in damp places.",
    "What should you do with a small cut before practice?~Clean and cover it~Ignore it~Rub dirt~Bandages keep germs out.",
    "You have a fever. What should you do?~Stay home and rest~Go to practice anyway~Share a towel~Do not spread it.",
    "Why wipe down shared mats?~To remove germs and sweat~To make them heavier~To make them slippery~Others will use them next.",
    "How often should you wash sports clothes?~After use~Once a year~Never~Sweat grows bacteria.",
    "Which item should be your own?~Water bottle~Goal post~Court~Only one person drinks from it."]);
  const c9 = T("Exercising at altitude", "⛰️", "At high places like mountains the air pressure is lower. The air still has about 21% oxygen, but each breath contains fewer oxygen molecules.",
    "You may breathe faster, tire sooner and feel dizzy or get a headache. Over days to weeks the body <b>acclimatizes</b> by making more red blood cells. Go up slowly, drink water and go back down if you feel very unwell.",
    "Lower pressure means fewer oxygen molecules per breath.", "A runner from sea level feels more tired on a mountain trail than at home.", [
    "Why do people tire quickly at high altitude?~Each breath has fewer oxygen molecules~There is no air~Gravity disappears~Air pressure is lower.",
    "What is acclimatization?~The body adjusting to altitude~A kind of stretch~A warm-up~It adapts over time.",
    "What does the body make more of when adjusting to altitude?~Red blood cells~Bones~Fingernails~They carry oxygen.",
    "What is a smart way to go to high altitude?~Ascend slowly~Run immediately~Skip water~Give the body time.",
    "If you feel a bad headache and dizziness at altitude, you should…~Go down and tell someone~Keep climbing~Eat a huge meal~Safety first.",
    "What percentage of air is oxygen at altitude?~About 21%, the same as sea level~0%~50%~The mix is the same, the pressure is lower.",
    "Why drink plenty of water at altitude?~The air is dry and you breathe faster~Water makes air thicker~It cures sunburn~You lose moisture.",
    "A sea-level athlete will likely perform ___ at altitude at first.~Worse~Better~Exactly the same~Less oxygen is available."]);
  const c10 = T("Amateur and professional sport", "🏟️", "Some athletes play for fun or school, and some earn money. These are <b>amateur</b> and <b>professional</b> sport.",
    "<b>Amateurs</b> compete without being paid. <b>Professionals</b> are paid to play. Many athletes get <b>scholarships</b> that pay for school. Very few high school players become professionals, so education and a backup plan matter. Olympic Games now include both amateur and professional athletes.",
    "Pay makes the difference, but most players are amateurs.", "A school soccer team plays as amateurs; a league player is a professional.", [
    "What is an amateur athlete?~Someone who plays without being paid~Someone paid to play~A coach~They play for love of the sport.",
    "What is a professional athlete?~Someone paid to play~A volunteer~A spectator~They earn a living.",
    "What is a sports scholarship?~Money that helps pay for school~A sports medal~A uniform~It supports education.",
    "Why is a backup plan important?~Few players become professionals~Sports are easy~Sports never end~Education gives other options.",
    "Most school athletes are…~Amateurs~Professionals~Referees~They play for school.",
    "Which statement is true?~Many Olympians are professionals~Olympics ban every professional~Only kids compete~The rules have changed over time.",
    "Why do many athletes study while they play?~Careers in sport are short~Studying makes them faster~It is required in every game~Plan for later life.",
    "A volunteer youth coach who is not paid is…~An amateur coach~A professional~An official~Not paid."]);
  const c11 = T("Air quality and exercise", "🌫️", "Poor air can make exercise harder and harm lungs. The <b>Air Quality Index (AQI)</b> tells how clean the air is.",
    "AQI of <b>0 to 50</b> is good, <b>51 to 100</b> moderate, and above <b>100</b> is unhealthy for sensitive groups and higher. Smoke, smog and high ozone on hot sunny afternoons can irritate the lungs. On bad days exercise indoors or take it easy. People with asthma should carry their inhaler.",
    "Higher AQI number means worse air.", "On a smoky day with AQI 160, a coach moves practice indoors.", [
    "On the AQI, which number means cleaner air?~30~120~180~Lower is better.",
    "What does AQI stand for?~Air Quality Index~Active Quick Index~Air Quantity Indicator~It rates the air.",
    "An AQI of 40 is…~Good~Unhealthy~Dangerous~Between 0 and 50.",
    "On a smoky day with a very high AQI, a smart choice is to…~Exercise indoors~Run extra hard outside~Ignore it~Protect your lungs.",
    "Ozone pollution is usually worse on…~Hot, sunny afternoons~Cool mornings only~Rainy nights~Sunlight helps it form.",
    "A student with asthma should…~Carry their inhaler to practice~Hide it~Never exercise~Keep medicine handy.",
    "What can smoke or smog do to lungs?~Irritate them~Make them stronger~Cool them~They make breathing harder.",
    "Which time may have cleaner air in a city in summer?~Early morning~Mid-afternoon~Rush hour~Ozone builds as the day heats."]);
  const c12 = T("Proprioception", "🧭", "<b>Proprioception</b> is your body's sense of where its parts are without looking.",
    "Sensors called <b>proprioceptors</b> in muscles, tendons and joints send signals to the brain. They help balance, coordination and landing safely. The inner ear helps with balance too. Training on wobble boards or one leg builds this sense, and injuries can reduce it.",
    "Eyes closed, you still know where your hand is.", "Standing on one leg with eyes closed is harder because your eyes are not helping.", [
    "What is proprioception?~Sense of body position~Sense of taste~Sense of smell~You know where your parts are without looking.",
    "Where are proprioceptors found?~Muscles, tendons and joints~Only the eyes~Only the skin~They sense stretch and tension.",
    "Why is standing on one leg with eyes closed harder?~Vision is not helping~The floor is moving~The leg is shorter~Eyes help balance.",
    "Which part of the ear helps balance?~Inner ear~Ear lobe~Ear wax~Deep inside.",
    "Which training can improve proprioception?~Balance board practice~Sitting still~Sleeping~Wobbly surfaces help.",
    "After an ankle sprain, proprioception often…~Gets worse for a while~Becomes perfect~Turns off forever~Injury can damage sensors.",
    "Which activity uses proprioception?~Touching your nose with your eyes closed~Counting~Reading~You know where your finger is.",
    "Good proprioception helps you…~Land safely from a jump~Taste food~Hear music~Body control."]);

  const d1 = N("Work and power", "⚙️", "In science, <b>work</b> is force times distance, measured in joules. <b>Power</b> is how fast you do work.",
    "Work (J) = force (N) × distance (m). Power (W) = work (J) ÷ time (s). Doing the same work in less time means more power.",
    "Work first, then divide by time for power.", () => {
    const F = pick([10, 20, 50, 100, 150]), d = pick([2, 3, 4, 5, 10]), W = F * d, ts = [2, 4, 5, 10].filter(t => W % t === 0), t = pick(ts);
    const k = ri(1, 3);
    if (k === 1) return { text: `A student pushes a crate with a force of ${F} N for ${d} m. How much work is done in joules?`, visual: "📦", answer: W,
      hints: ["Work depends on how hard and how far.", "Multiply the force by the distance.", "Example: 30 N for 4 m = 120 J. Now do yours."] };
    if (k === 2) return { text: `A lifter does ${W} joules of work in ${t} seconds. What is the power in watts?`, visual: "🏋️", answer: W / t,
      hints: ["Power is about speed of doing work.", "Divide the work by the time.", "Example: 200 J in 10 s = 20 W. Now do yours."] };
    return { text: `A rower pulls with ${F} N through ${d} m in ${t} s. What is the power in watts?`, visual: "🚣", answer: W / t,
      hints: ["Find the work first.", "Work = force × distance, then divide by the time.", "Example: 20 N for 5 m is 100 J; in 4 s that is 25 W. Now do yours."] };
  });
  const d2 = N("Blood pressure math", "🩺", "Two useful numbers come from blood pressure: <b>pulse pressure</b> and <b>mean arterial pressure (MAP)</b>.",
    "Pulse pressure = systolic − diastolic. MAP = diastolic + (pulse pressure ÷ 3). The heart spends longer resting than squeezing, so the average is nearer the bottom number.",
    "Subtract first, then divide by 3, then add.", () => {
    const dia = ri(60, 85), pp = pick([30, 33, 36, 39, 42, 45, 48, 51, 54]), sys = dia + pp;
    if (ri(1, 2) === 1) return { text: `A blood pressure reading is ${sys}/${dia}. What is the pulse pressure?`, visual: "🩺", answer: pp,
      hints: ["Compare the top and bottom numbers.", "Subtract the diastolic from the systolic.", "Example: 120/80 gives 120 − 80 = 40. Now do yours."] };
    return { text: `A blood pressure reading is ${sys}/${dia}. What is the mean arterial pressure? (MAP = diastolic + pulse pressure ÷ 3)`, visual: "🩺", answer: dia + pp / 3,
      hints: ["Start by finding the pulse pressure.", "Divide the pulse pressure by 3, then add the diastolic number.", "Example: 129/84: pulse pressure 45, 45 ÷ 3 = 15, MAP = 84 + 15 = 99. Now do yours."] };
  });
  const d3 = N("Percent of your max lift", "🏋️", "Strength plans use a percent of your <b>one-rep max (1RM)</b>, the heaviest weight you can lift once with good form.",
    "Weight = 1RM × percent ÷ 100. To find the 1RM, divide the weight by the percent and multiply by 100.",
    "Percent means 'out of 100'.", () => {
    const rm = pick([40, 50, 60, 80, 100, 120]), p = pick([50, 60, 70, 80, 90]), w = rm * p / 100, name = pick(NAMES);
    if (ri(1, 2) === 1) return { text: `${name}'s one-rep max is ${rm} kg. How many kg is ${p}% of that?`, visual: "🏋️", answer: w,
      hints: ["Take a percent of the max.", "Multiply the max by the percent, then divide by 100.", "Example: 50% of 80 kg = 80 × 50 ÷ 100 = 40 kg. Now do yours."] };
    return { text: `${name} lifts ${w} kg, which is ${p}% of the one-rep max. What is the one-rep max in kg?`, visual: "🏋️", answer: rm,
      hints: ["The lifted weight is only part of the max.", "Divide the weight by the percent, then multiply by 100.", "Example: 40 kg is 50% of max, so max = 40 ÷ 50 × 100 = 80 kg. Now do yours."] };
  });
  const d4 = N("Volume load", "📊", "Coaches track <b>volume load</b>, the total weight lifted in a workout.",
    "Volume load = sets × reps × weight. Total reps = sets × reps. Add exercises together for a full session.",
    "Multiply sets, reps and weight.", () => {
    const s = ri(2, 5), r = pick([5, 8, 10, 12]), w = pick([10, 15, 20, 25, 30, 40, 50]);
    const k = ri(1, 3);
    if (k === 1) return { text: `A lifter does ${s} sets of ${r} reps. How many reps in total?`, visual: "🔁", answer: s * r,
      hints: ["Each set has the same number of reps.", "Multiply the sets by the reps in each set.", "Example: 3 sets of 6 reps = 18 reps. Now do yours."] };
    if (k === 2) return { text: `A lifter does ${s} sets of ${r} reps at ${w} kg. What is the volume load in kg?`, visual: "📊", answer: s * r * w,
      hints: ["Find the total reps first.", "Multiply total reps by the weight.", "Example: 2 sets of 5 at 20 kg = 10 reps × 20 = 200 kg. Now do yours."] };
    const s2 = ri(2, 4), r2 = pick([5, 10]), w2 = pick([20, 30, 40]);
    return { text: `A lifter does ${s} sets of ${r} at ${w} kg, then ${s2} sets of ${r2} at ${w2} kg. What is the total volume load in kg?`, visual: "📊", answer: s * r * w + s2 * r2 * w2,
      hints: ["Find the volume load of each exercise on its own.", "Multiply sets × reps × weight for each, then add them.", "Example: (2×5×10) + (1×5×20) = 100 + 100 = 200 kg. Now do yours."] };
  });
  const d5 = N("Pounds, kilograms and miles", "🔄", "Many sports mix metric and US units, so athletes convert them.",
    "<b>1 kg ≈ 2.2 lb.</b> To go from kg to lb, multiply by 2.2; from lb to kg, divide by 2.2. <b>1 mile ≈ 1.6 km.</b> To go from miles to km, multiply by 1.6.",
    "Multiply to go to the smaller unit, divide to come back.", () => {
    const k = ri(1, 3);
    if (k === 1) { const kg = pick([10, 20, 30, 50, 60, 70, 100]); return { text: `A weight plate is ${kg} kg. About how many pounds is that? (1 kg ≈ 2.2 lb)`, visual: "🏋️", answer: Math.round(kg * 22) / 10,
      hints: ["Pounds are smaller than kilograms, so the number gets bigger.", "Multiply the kilograms by 2.2.", "Example: 5 kg × 2.2 = 11 lb. Now do yours."] }; }
    if (k === 2) { const kg = pick([10, 20, 30, 50, 60, 70, 100]), lb = Math.round(kg * 22) / 10; return { text: `A barbell is ${lb} lb. About how many kilograms is that? (1 kg ≈ 2.2 lb)`, visual: "🏋️", answer: kg,
      hints: ["Kilograms are bigger than pounds, so the number gets smaller.", "Divide the pounds by 2.2.", "Example: 22 lb ÷ 2.2 = 10 kg. Now do yours."] }; }
    const mi = pick([5, 10, 15, 20, 25]); return { text: `A race is ${mi} miles long. About how many kilometers is that? (1 mile ≈ 1.6 km)`, visual: "🏃", answer: mi * 8 / 5,
      hints: ["A kilometer is shorter than a mile, so you get more of them.", "Multiply the miles by 1.6.", "Example: 10 miles × 1.6 = 16 km. Now do yours."] };
  });
  const d6 = N("Water bottle volume", "🧴", "A water bottle is shaped like a <b>cylinder</b>. Its volume is the amount it holds.",
    "Volume = π × radius × radius × height. Use π ≈ 3 to keep it simple. In cm, the answer is in cm³, and 1 cm³ holds 1 milliliter (mL).",
    "Square the radius first.", () => {
    const r = ri(2, 5), h = ri(10, 25), V = 3 * r * r * h;
    if (ri(1, 2) === 1) return { text: `A bottle has a radius of ${r} cm and a height of ${h} cm. Using π = 3, how many mL does it hold?`, visual: "🧴", answer: V,
      hints: ["Use the cylinder formula with the radius squared.", "Multiply 3 × radius × radius × height. One cm³ equals 1 mL.", "Example: r = 2, h = 10: 3 × 2 × 2 × 10 = 120 mL. Now do yours."] };
    return { text: `A bottle holds ${V} mL and has a radius of ${r} cm. Using π = 3, how many cm tall is it?`, visual: "🧴", answer: h,
      hints: ["Work backward from the volume.", "Divide the volume by 3 × radius × radius.", "Example: 120 mL with r = 2: 120 ÷ 12 = 10 cm. Now do yours."] };
  });

  // ================= LEVEL 21 =================
  const e1 = T("Aerobic training adaptations", "❤️‍🔥", "With regular aerobic training, the heart and body change in helpful ways.",
    "The heart muscle gets stronger, so <b>stroke volume</b> rises and <b>resting heart rate</b> falls. Muscles grow more <b>capillaries</b> and <b>mitochondria</b> (tiny energy factories). <b>VO2 max</b> goes up and blood pressure often drops.",
    "Stronger heart, slower resting rate, more oxygen use.", "A runner's resting heart rate may fall from 70 to 58 after months of training.", [
    "After months of aerobic training, resting heart rate usually…~Falls~Rises~Stays exactly the same~A stronger heart does more per beat.",
    "After training, stroke volume usually…~Increases~Decreases~Disappears~Each beat pumps more blood.",
    "What are mitochondria?~Tiny energy factories in cells~Bones~Blood vessels~Cells make ATP in them.",
    "More capillaries around muscles help by…~Delivering more oxygen~Making bones longer~Storing fat only~They are the smallest blood vessels.",
    "VO2 max is a measure of…~Your maximum oxygen use~Your height~Your reaction time~It shows aerobic fitness.",
    "Regular aerobic exercise often makes blood pressure…~Lower~Higher~Unmeasurable~Healthy heart, healthier pressure.",
    "Which person probably has the lowest resting heart rate?~A trained distance runner~Someone who never exercises~All are equal~Fit hearts need fewer beats to do the same job.",
    "A healthy 'athlete's heart' is one that is…~Stronger and pumps more per beat~Weaker~Smaller than average~It adapts to the demand."]);
  const e2 = T("Lactate threshold", "📉", "<b>Lactate</b> is made when muscles use sugar for energy. At easy effort, the body clears it as fast as it makes it.",
    "The <b>lactate threshold</b> is the effort level where lactate starts to build up faster than it is cleared. Above it, you tire quickly. Lactate is also a useful fuel, and it is not the main cause of soreness a day later. Training near the threshold, such as <b>tempo runs</b>, raises it.",
    "Below threshold you can keep going. Above it, you fade.", "A trained runner can hold a faster pace before reaching their lactate threshold.", [
    "What is the lactate threshold?~Effort level where lactate builds faster than it is cleared~The top of a mountain~A type of protein~It is a turning point.",
    "Above the threshold, a person usually…~Tires more quickly~Gets stronger instantly~Stops breathing~Lactate piles up.",
    "Can the body use lactate as fuel?~Yes~No, it is only waste~Only in plants~It can be recycled.",
    "Does lactate cause next-day muscle soreness?~Not mainly~Yes, always~Yes, for a week~Soreness comes from tiny muscle damage.",
    "Which workout trains near the lactate threshold?~A tempo run~A slow stroll~A nap~It is steady and comfortably hard.",
    "Training can make the threshold…~Higher~Lower~Disappear~Fit athletes hold a faster pace.",
    "Below the threshold, effort feels…~Sustainable~Impossible~Painful immediately~You could talk and keep going.",
    "Who can usually hold a faster pace before reaching threshold?~A trained athlete~A beginner~Everyone is the same~Training raises it."]);
  const e3 = T("Glycogen and carb loading", "🍝", "The body stores carbohydrate in muscles and the liver as <b>glycogen</b>. It is the main fuel for hard, long exercise.",
    "When glycogen runs low you may 'hit the wall' and feel very tired. Endurance athletes sometimes <b>carb-load</b> for events over about 90 minutes by eating more carbohydrate for a day or two. After exercise, carbohydrate plus protein helps refill and repair. Short events need only normal healthy meals.",
    "Store it before, refill it after.", "A marathon runner eats pasta and rice the day before a race.", [
    "What is glycogen?~Stored carbohydrate in muscles and liver~A type of fat~A vitamin~It is the body's fuel tank.",
    "What does 'hitting the wall' mean in endurance sport?~Running out of fuel and tiring suddenly~Hitting a building~Cramping from water~Stores ran low.",
    "Carb-loading is mostly useful for…~Events lasting 90+ minutes~A 100-meter dash~Gym class stretching~Long endurance efforts.",
    "Which meal suits carb-loading?~Pasta and rice~Plain butter~Black coffee~Starchy foods.",
    "After exercise, which pairing helps recovery?~Carbohydrate and protein~Only candy~Nothing~Refill and repair.",
    "Where is glycogen stored?~Muscles and liver~Brain only~Bones~Two spots.",
    "Does a 20-minute jog need carb-loading?~No, normal meals are enough~Yes, a week of pasta~Yes, three days~It is short.",
    "What happens when glycogen is low?~Fatigue~Faster speed~More strength~Fuel is empty."]);
  const e4 = T("Bone health", "🦴", "Bones are living tissue. They grow strongest in the teen years and reach <b>peak bone mass</b> around the late 20s.",
    "<b>Weight-bearing</b> activities like running, jumping and sports make bones denser. Swimming and cycling are less weight-bearing. <b>Calcium</b> and <b>vitamin D</b> build bone. <b>Osteoporosis</b> is when bones become weak and brittle later in life. Teens can build a bone bank now.",
    "Load the bones to strengthen them.", "A teen who jumps and plays sports builds denser bones than one who is always sitting.", [
    "Which activity is weight-bearing?~Jumping~Floating in a pool~Sitting~Bones work against gravity.",
    "What is osteoporosis?~Weak, brittle bones~Strong bones~A muscle cramp~It often shows up later in life.",
    "Which nutrient is most important for building bone?~Calcium~Sugar~Caffeine~Dairy foods, leafy greens.",
    "Which vitamin helps the body absorb calcium?~Vitamin D~Vitamin K only~Vitamin Z~Sunshine helps your body make it.",
    "When do we build most of our bone mass?~In the teen years and twenties~After age 70~Only as babies~Build early.",
    "Which activity is less weight-bearing?~Swimming~Skipping rope~Basketball~Water holds you up.",
    "What does the term 'bone bank' mean?~Bone strength built when young~Money in a bank~A broken bone~Savings for later.",
    "How do bones get stronger?~By being loaded and used~By never moving~By only resting~Stress makes them adapt."]);
  const e5 = T("Torque and rotation", "🌀", "<b>Torque</b> is a turning force. Doors, wrenches and a gymnast's body all rotate because of torque.",
    "Torque = force × distance from the pivot. A longer lever arm makes turning easier. <b>Angular momentum</b> stays the same unless a twisting force acts: a skater who pulls arms in spins faster, and a diver who tucks rotates faster.",
    "Far from the pivot = more torque. Pull in = spin faster.", "Pushing on the handle edge of a door is easier than pushing near the hinge.", [
    "What is torque?~A turning force~A heart rate~A type of muscle~Think of a wrench.",
    "To open a heavy door more easily, push…~Far from the hinge~Close to the hinge~At the hinge~Longer arm, more torque.",
    "A skater pulls arms in close while spinning. She…~Spins faster~Spins slower~Stops~Angular momentum is the same.",
    "A diver tucks into a ball. This…~Speeds up rotation~Slows rotation~Stops rotation~Smaller shape, faster spin.",
    "To slow a spin, an athlete should…~Extend arms and legs~Tuck tighter~Close eyes~Spread out.",
    "Torque depends on force and…~Distance from the pivot~Color~Time of day~A longer lever helps.",
    "A longer wrench makes a bolt easier to turn because it…~Increases torque~Reduces friction~Makes it lighter~Longer lever arm.",
    "A batter's hips and shoulders turning is an example of…~Rotation~Falling~Resting~Twisting action."]);
  const e6 = T("Coaching cues", "📣", "Coaches and peer leaders help others learn. Good teaching uses clear, short <b>cues</b>.",
    "A cue is a few words that focus attention, like 'elbow up' or 'eyes on target'. Give <b>one cue at a time</b>, demonstrate the skill, then let the learner try. Pointing at an outside goal ('hit the target') often works better than thinking about body parts. Give specific, kind feedback and check the learner understood.",
    "Show, say a short cue, let them try, give kind feedback.", "To teach a layup, a coach says 'step, step, jump, reach' while showing it.", [
    "What is a coaching cue?~A few words that focus attention~A long speech~A punishment~Short and clear.",
    "How many cues should you give at once?~One~Five~Ten~Too many confuses.",
    "Which feedback is best?~'Good follow-through, keep your elbow up.'~'That was wrong.'~'You are hopeless.'~Specific and kind.",
    "Before the learner tries, it helps to…~Demonstrate the skill~Hide the equipment~Stay silent~Show them how.",
    "Which cue focuses on an outside target?~'Hit the target'~'Bend your left knee'~'Tense your back'~Looks outward, not at body parts.",
    "After teaching, you should…~Check they understood~Walk away~Shout~Ask or watch.",
    "Why be kind when giving feedback?~It keeps learners willing to try~It wastes time~It makes them faster~People learn better when relaxed.",
    "Which is a clear cue for throwing?~'Step and snap the wrist'~'Do it right'~'Whatever'~Short and specific."]);
  const e7 = T("Planning a sports day", "🎽", "Running a school sports day is a team project with many parts.",
    "Make a <b>plan</b>: list events, the schedule, volunteers and roles, equipment, a <b>safety plan</b> with first aid and water, a <b>weather backup</b>, inclusion for all abilities, and a <b>budget</b>. Check the area for hazards before you start and say thank you afterward.",
    "Plan, assign, prepare for problems, include everyone.", "A planner lists who runs each event, where first aid is, and what happens if it rains.", [
    "What should a plan include for safety?~First aid and water~Only trophies~Music~Be ready for injuries.",
    "Why have a weather backup plan?~Conditions can change~Weather never matters~Rain is fun~Plan B.",
    "Why give people roles?~So tasks are covered~To control them~To avoid fun~Everyone knows their job.",
    "To include all abilities, you could…~Offer events with different options~Only run races~Pick the fastest~Fair for everyone.",
    "What does a budget help with?~Staying within available money~Making noise~Winning~It lists costs.",
    "When should you check the area for hazards?~Before the event starts~Never~After the event~Prevent problems.",
    "A good event schedule shows…~Times and locations~Only names~Only prizes~Who and when.",
    "After the event, a good organizer…~Thanks helpers and notes improvements~Leaves a mess~Ignores feedback~Learn for next time."]);
  const e8 = T("Exercise and mental health", "😊", "Movement helps the mind as well as the body.",
    "Exercise can lift mood, ease stress and worry, improve sleep and help focus. It is a helpful tool, but not a cure-all. If you feel sad, anxious or hopeless for weeks, talk to a <b>trusted adult</b>, such as a parent, school counselor or doctor. Asking for help is a sign of strength.",
    "Moving helps, and so does talking to someone.", "A 20-minute walk can help clear your head before a test.", [
    "Which mental benefit can exercise provide?~Better mood~Instant answers~Magic powers~Feel-good chemicals.",
    "Exercise can help sleep by…~Making sleep easier~Making you stay awake~Removing the need for sleep~Tired bodies sleep better.",
    "If you feel very sad for weeks, you should…~Talk to a trusted adult~Hide it~Stop eating~Help is available.",
    "Who can you talk to at school about your worries?~A counselor or teacher~Nobody~Strangers online~Trusted adults at school.",
    "Is asking for help a sign of weakness?~No, it takes courage~Yes~Only for adults~It is smart.",
    "Exercise is best described as…~A helpful tool for mental health~A cure for everything~A replacement for all support~It helps, but is not everything.",
    "A short walk before a test might…~Help you feel calmer~Cause bad grades~Waste energy~Moving can ease stress.",
    "Which is a good habit for emotional wellbeing?~Time with friends and regular movement~Always staying alone~Skipping meals~Connection and activity."]);
  const e9 = T("Risk assessment", "⚠️", "Before an activity, you can think ahead about what could go wrong. This is a <b>risk assessment</b>.",
    "A <b>hazard</b> is something that could cause harm, such as a wet floor. The <b>risk</b> is how likely harm is and how serious it could be. <b>Controls</b> reduce risk: remove the hazard, change the activity, or protect people with rules and gear. Review after any incident.",
    "Spot the hazard, judge the risk, add a control.", "A wet floor in the gym is a hazard; wiping it dry is a control.", [
    "What is a hazard?~Something that could cause harm~A game rule~A warm-up~Like a wet floor.",
    "What does risk describe?~How likely and serious harm could be~The color of equipment~The score~Chance times seriousness.",
    "A puddle on a basketball court is a…~Hazard~Control~Score~It could make someone slip.",
    "Wiping up the puddle is a…~Control~Hazard~Foul~It reduces the risk.",
    "Which is a way to reduce risk?~Wear proper protective gear~Ignore rules~Rush~Protect people.",
    "When should you assess risks?~Before the activity~Never~Only after injuries~Think ahead.",
    "After an accident, a good step is to…~Review what happened and improve~Pretend nothing happened~Blame someone~Learn from it.",
    "Which activity usually has a higher risk?~Rock climbing without ropes~Stretching on a mat~Walking~Think of how serious a fall would be."]);
  const e10 = T("Drag and streamlining", "🏊", "<b>Drag</b> is the force of air or water pushing against a moving object. Athletes try to reduce it.",
    "Water is much denser than air, so swimmers face more drag. <b>Streamlined</b> shapes slip through fluid with less drag. Drag grows quickly as speed rises. Cyclists crouch low, and riders behind another rider are <b>drafting</b> in a pocket of lower drag.",
    "Smooth and small means fast.", "A swimmer pushes off the wall with arms stretched forward and body straight.", [
    "What is drag?~Resistance from air or water~A kind of gravity~A warm-up~It pushes against motion.",
    "Which medium causes more drag at the same speed?~Water~Air~Both equal~Think about which one is thicker to push through.",
    "Why do cyclists crouch low?~To reduce drag~To rest~To brake~Smaller front area.",
    "A streamlined shape means…~Smooth and narrow in the direction of motion~Wide and flat~Rough~Slips through fluid.",
    "What is drafting?~Riding close behind another to reduce drag~Drawing a plan~Racing alone~Think of the cyclist behind another cyclist.",
    "Why do swimmers wear swim caps?~To lower drag~To look taller~To stay warm only~Smooth heads.",
    "As speed increases, drag…~Increases quickly~Decreases~Disappears~Faster means more resistance.",
    "Best push-off position from a pool wall?~Arms stretched, body straight~Curled up~Starfish~Streamline."]);
  const e11 = T("Correlation and causation", "🔍", "Sports and health news often says two things are linked. Be careful: <b>correlation</b> is not <b>causation</b>.",
    "Two things have a correlation when they change together. Causation means one makes the other happen. A third thing may cause both: ice-cream sales and sunburn both rise in hot weather. Bigger samples and tests with a <b>control group</b> give stronger evidence than a few stories.",
    "Ask: could something else explain it?", "Players who wear lucky socks may win more, but the socks do not cause wins.", [
    "What does correlation mean?~Two things change together~One causes the other~They are opposites~Linked, not necessarily causing.",
    "What does causation mean?~One thing makes another happen~They only look similar~Random luck~A real cause.",
    "Ice-cream sales and sunburns both rise in summer. What explains this?~Hot weather~Ice cream causes sunburn~Sunburn causes ice cream~A third factor.",
    "Which evidence is strongest?~A large study with a control group~One friend's story~A rumor~Bigger and fairer.",
    "A claim comes from only 5 people. It is…~Weak evidence~Perfect proof~Law~Small sample.",
    "What is a control group?~A group that does not get the test treatment~The best team~The coach's family~For comparison.",
    "Players with lucky socks win more. Do socks cause wins?~Not necessarily~Always~Only on Fridays~Look for other explanations.",
    "Before trusting a health claim, you should ask…~Where is the evidence?~How popular is it?~How loud is the ad?~Check sources."]);
  const e12 = T("Heart rate recovery", "📉", "<b>Heart rate recovery</b> is how fast your heart rate drops after you stop hard exercise.",
    "Take your heart rate at the end of exercise, then again after <b>one minute</b>. Subtract to see the drop. A bigger drop usually means a fitter heart. A slow drop can be due to tiredness, heat, dehydration or poor fitness.",
    "Fast drop = fit heart.", "If your rate falls from 170 to 140 in a minute, the drop is 30 beats.", [
    "What is heart rate recovery?~How fast heart rate drops after exercise~How fast you run~Your resting pulse~It is a drop.",
    "When is the second heart rate usually measured?~After one minute~After one hour~Before warming up~A short time after stopping.",
    "A bigger drop usually shows…~Better fitness~Worse fitness~Nothing~A stronger heart recovers fast.",
    "A slow drop could be caused by…~Dehydration or heat~Eating vegetables~A good warm-up~Body is stressed.",
    "How do you find the drop?~Subtract the later rate from the earlier rate~Add the rates~Multiply them~Compare two numbers.",
    "Which athlete probably recovers faster?~A well-trained runner~A beginner~They recover equally~Fitness matters.",
    "Heart rate recovery is best measured after…~Hard exercise~Sleep~Meals~Stop at peak effort.",
    "Why might recovery be slower on a very hot day?~The body works to cool down~Air is thinner~Exercise is easier~Heat adds stress."]);

  const f1 = N("Points per 100 possessions", "🏀", "Basketball analysts compare teams by <b>points per 100 possessions</b> so fast and slow teams are fair to compare.",
    "Rating = points ÷ possessions × 100. To find points, multiply the rating by possessions and divide by 100.",
    "Divide first, then scale to 100.", () => {
    let p, r;
    do { p = pick([25, 40, 50, 80, 100]); r = ri(90, 130); } while (!Number.isInteger(r * p / 100));
    const pts = r * p / 100;
    if (ri(1, 2) === 1) return { text: `A team scores ${pts} points in ${p} possessions. How many points per 100 possessions is that?`, visual: "🏀", answer: r,
      hints: ["Scale the team up to 100 possessions.", "Divide the points by the possessions, then multiply by 100.", "Example: 30 points in 25 possessions = 30 ÷ 25 × 100 = 120. Now do yours."] };
    return { text: `A team's rating is ${r} points per 100 possessions. How many points would you expect in ${p} possessions?`, visual: "🏀", answer: pts,
      hints: ["Scale the rating down to this smaller number of possessions.", "Multiply the rating by the possessions, then divide by 100.", "Example: 120 per 100 over 25 possessions = 120 × 25 ÷ 100 = 30. Now do yours."] };
  });
  const f2 = N("Effective field goal percent", "🎯", "A three-pointer is worth more than a two-pointer, so analysts use <b>effective field goal percent (eFG%)</b>.",
    "eFG% = (field goals made + 0.5 × threes made) ÷ shots attempted × 100. Add half of the threes as a bonus, then find the percent.",
    "Give each three a half-make bonus, then divide.", () => {
    let fga, fg, t3;
    do { fga = pick([10, 20, 25, 40, 50]); fg = ri(Math.floor(fga * 0.3), Math.floor(fga * 0.6)); t3 = ri(0, Math.min(fg, 6)); } while (!Number.isInteger((fg + 0.5 * t3) / fga * 100));
    const name = pick(NAMES);
    return { text: `${name} makes ${fg} of ${fga} shots, including ${t3} threes. What is the eFG%? (eFG% = (made + 0.5 × threes) ÷ attempted × 100)`, visual: "🎯", answer: (fg + 0.5 * t3) / fga * 100,
      hints: ["Add the bonus for threes before dividing.", "Compute made + 0.5 × threes, divide by shots attempted, then multiply by 100.", "Example: 8 made, 2 threes, 20 shots: (8 + 1) ÷ 20 × 100 = 45%. Now do yours."] };
  });
  const f3 = N("Calories burned with METs", "🔥", "You can estimate energy used from METs: <b>kcal ≈ MET × body mass (kg) × hours</b>.",
    "Multiply the activity's MET value by the person's mass in kilograms, then by hours. For minutes, convert to hours first: 30 minutes = 0.5 hour.",
    "METs × kg × hours.", () => {
    const met = pick([3, 4, 5, 6, 8]), kg = pick([40, 50, 60, 70, 80]), hrs = pick([0.5, 1, 1.5, 2]), name = pick(NAMES);
    return { text: `${name} has a mass of ${kg} kg and does a ${met}-MET activity for ${hrs} hour${hrs === 1 ? "" : "s"}. About how many kcal does that burn? (kcal = MET × kg × hours)`, visual: "🔥", answer: met * kg * hrs,
      hints: ["Three numbers combine here: effort, body mass and time.", "Multiply the METs, the mass in kg, and the hours.", "Example: 4 METs × 50 kg × 2 hours = 400 kcal. Now do yours."] };
  });
  const f4 = N("Estimating a one-rep max", "🏋️", "You do not need to lift your heaviest weight to estimate your max. The <b>Epley formula</b> uses a lighter lift.",
    "Estimated 1RM = weight × (1 + reps ÷ 30). Choose a weight you can lift a few times with good form, count the reps, and use the formula. It is an estimate only.",
    "Reps ÷ 30, add 1, multiply by the weight.", () => {
    const w = pick([30, 60, 90, 120]), r = pick([3, 6, 9, 12, 15]), est = w * (30 + r) / 30;
    return { text: `A lifter does ${r} reps with ${w} kg. What is the estimated one-rep max? (weight × (1 + reps ÷ 30))`, visual: "🏋️", answer: est,
      hints: ["The formula has a part inside brackets.", "Work out 1 + reps ÷ 30 first, then multiply by the weight.", "Example: 60 kg for 6 reps: 1 + 6 ÷ 30 = 1.2, and 60 × 1.2 = 72 kg. Now do yours."] };
  });
  const f5 = N("Kinetic energy", "⚡", "Moving things have <b>kinetic energy</b>. The faster or heavier they are, the more they have.",
    "KE (joules) = ½ × mass (kg) × speed² (m/s). Square the speed first, then multiply by the mass, then halve.",
    "Square the speed, times the mass, half of it.", () => {
    const m = pick([2, 4, 6, 8, 10, 50, 60, 70]), v = pick([2, 3, 4, 5, 6, 8, 10]);
    return { text: `A ${m} kg object moves at ${v} m/s. What is its kinetic energy in joules? (KE = ½ × m × v²)`, visual: "⚡", answer: m * v * v / 2,
      hints: ["Speed counts twice, so square it.", "Multiply the mass by the speed squared, then take half.", "Example: 4 kg at 3 m/s: 3 × 3 = 9, 4 × 9 = 36, half is 18 J. Now do yours."] };
  });
  const f6 = N("Standard deviations", "📊", "A <b>standard deviation (SD)</b> shows how spread out scores are around the mean.",
    "A score's distance above the mean, measured in SDs, is (score − mean) ÷ SD. A score 2 SDs above the mean is the mean plus 2 × SD. About 95% of scores fall within 2 SDs of the mean in a typical bell-shaped set.",
    "Subtract the mean, then count how many SDs fit.", () => {
    const mean = pick([50, 60, 70, 80, 100]), sd = pick([2, 3, 4, 5, 10]), k = ri(1, 3), x = mean + k * sd;
    if (ri(1, 2) === 1) return { text: `Fitness test scores have a mean of ${mean} and an SD of ${sd}. A student scores ${x}. How many SDs above the mean is that?`, visual: "📊", answer: k,
      hints: ["How far is the score from the mean?", "Subtract the mean from the score, then divide by the SD.", "Example: mean 40, SD 5, score 50: 10 ÷ 5 = 2 SDs. Now do yours."] };
    return { text: `Fitness test scores have a mean of ${mean} and an SD of ${sd}. What score is ${k} SD${k === 1 ? "" : "s"} above the mean?`, visual: "📊", answer: x,
      hints: ["Find the distance first.", "Multiply the number of SDs by the SD, then add to the mean.", "Example: mean 40, SD 5, 2 SDs above: 2 × 5 = 10, 40 + 10 = 50. Now do yours."] };
  });

  Object.assign(PE_LEVELS, {
    19: [
      L("How muscles grow", a1), L("Hormones and exercise", a2), L("Gas exchange in the lungs", a3), L("Body composition", a4), L("Rugby basics", a5),
      L("Table tennis", a6), L("Routines and self-talk", a7), L("RAMP warm-up", a8), L("Plate and portions", a9), L("Planes of movement", a10),
      L("Balancing school and sport", a11), L("Being a team captain", a12), L("Cross-training", a13),
      L("Body mass index", b1), L("MET-minutes", b2), L("Fat mass and lean mass", b3), L("Slope is speed", b4), L("Beats over time", b5),
      L("Mixed practice", MIX(a1, a3, a8, a10, b1, b4)), L("Level 19 Challenge", MIX(a2, a4, a5, a6, a7, a9, a11, a12, a13, b2, b3, b5))
    ],
    20: [
      L("Blood pressure", c1), L("Inside a muscle", c2), L("Recovery breathing (EPOC)", c3), L("Rep ranges and goals", c4), L("Motivation", c5),
      L("Field hockey basics", c6), L("Officials and fair calls", c7), L("Hygiene in sports", c8), L("Exercising at altitude", c9), L("Amateur and professional sport", c10),
      L("Air quality and exercise", c11), L("Proprioception", c12),
      L("Work and power", d1), L("Blood pressure math", d2), L("Percent of your max lift", d3), L("Volume load", d4), L("Pounds, kilograms and miles", d5), L("Water bottle volume", d6),
      L("Mixed practice", MIX(c1, c2, c4, d1, d3, d5)), L("Level 20 Challenge", MIX(c3, c5, c6, c7, c8, c9, c10, c11, c12, d2, d4, d6))
    ],
    21: [
      L("Aerobic training adaptations", e1), L("Lactate threshold", e2), L("Glycogen and carb loading", e3), L("Bone health", e4), L("Torque and rotation", e5),
      L("Coaching cues", e6), L("Planning a sports day", e7), L("Exercise and mental health", e8), L("Risk assessment", e9), L("Drag and streamlining", e10),
      L("Correlation and causation", e11), L("Heart rate recovery", e12),
      L("Points per 100 possessions", f1), L("Effective field goal percent", f2), L("Calories burned with METs", f3), L("Estimating a one-rep max", f4), L("Kinetic energy", f5), L("Standard deviations", f6),
      L("Mixed practice", MIX(e1, e2, e5, f1, f3, f6)), L("Level 21 Challenge", MIX(e3, e4, e6, e7, e8, e9, e10, e11, e12, f2, f4, f5))
    ]
  });
})();
