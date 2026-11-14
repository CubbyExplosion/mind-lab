// ext/pe-16-18.js  PE levels 16-18 (grade 7 second half, grade 8 both halves)
(() => {
  const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben", "Kai", "Eva"];
  const r3 = x => Math.round(x * 1000) / 1000;
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

  // ================= LEVEL 16 =================
  const p1 = T("Energy systems", "⚡", "Muscles need energy all the time. Your body has <b>aerobic</b> (with oxygen) and <b>anaerobic</b> (without oxygen) ways to make it.",
    "Muscles burn a fuel molecule called <b>ATP</b>. Long, steady effort leans on <b>aerobic</b> energy. Short, all-out bursts lean on <b>anaerobic</b> energy.",
    "Ask yourself: is the effort short and powerful, or long and steady?", "A 20-minute easy bike ride is steady, so it uses mostly the oxygen system.", [
    "🏃|A 10-second all-out sprint mostly uses which energy system?~Anaerobic~Aerobic~Digestive~Is the effort short and powerful, or long and steady?",
    "A 5-kilometer easy jog mostly uses which energy system?~Aerobic~Anaerobic~Nervous~Think about how long the effort lasts.",
    "What does the word aerobic mean?~With oxygen~Without oxygen~With water~Look at the start of the word: aero is about air.",
    "What does the word anaerobic mean?~Without oxygen~With oxygen~With sugar~The 'an' at the start means 'not'.",
    "What fuel molecule do muscles use directly for energy?~ATP~DNA~Calcium~It has three letters and stands for adenosine triphosphate.",
    "Which activity is mostly aerobic?~Cycling steadily for 30 minutes~One high jump~One 5-second heavy lift~Look for the one that lasts a long time.",
    "Which activity is mostly anaerobic?~A 50-meter all-out dash~A long, slow hike~A 40-minute easy swim~Look for the shortest, hardest effort.",
    "Why do you breathe harder during a long run?~Working muscles need more oxygen~Your bones need to cool down~Your stomach needs air to digest~Which body part is working harder?"]);
  const p2 = T("Heart chambers", "🫀", "The heart is a muscle pump with <b>four chambers</b>. Blood moves through them in one direction.",
    "The two top chambers are <b>atria</b> (they receive blood). The two bottom chambers are <b>ventricles</b> (they pump blood out). The right side sends blood to the lungs. The left side sends it to the body.",
    "Top = receive. Bottom = pump out. Right = lungs. Left = body.", "The right ventricle pumps blood to the lungs to pick up oxygen.", [
    "How many chambers does the human heart have?~4~2~3",
    "Which chambers are the two top chambers of the heart?~Atria~Ventricles~Valves~They receive blood coming in.",
    "Which chambers do most of the pumping blood out of the heart?~Ventricles~Atria~Capillaries~They are the bottom chambers.",
    "The right side of the heart sends blood to the…~Lungs~Brain~Whole body~Blood needs to pick up oxygen first.",
    "The left side of the heart sends oxygen-rich blood to the…~Whole body~Lungs only~Stomach only~It is the strong side.",
    "Which ventricle is the strongest, because it pushes blood all around the body?~Left~Right~Both are equal~It serves the longer trip.",
    "What do heart valves do?~Keep blood flowing one way~Make oxygen~Store food~Think of a one-way door.",
    "Vessels that carry blood away from the heart are called…~Arteries~Veins~Atria~The word starts with A, like away."]);
  const p3 = T("Seasons of training", "📅", "Athletes plan the year in phases. This is called <b>periodization</b>.",
    "<b>Off-season</b>: rest and build a base with other activities. <b>Pre-season</b>: sport-specific drills and conditioning. <b>In-season</b>: play and keep fitness. <b>Post-season</b>: recover.",
    "Match the job to the phase: base building, sharpening, performing, or recovering.", "A swimmer builds general fitness in the off-season, then practices racing starts before the season.", [
    "Which phase is best for building a general fitness base?~Off-season~In-season~Game day~Think about the time before practice gets sport-specific.",
    "Which phase focuses on sport-specific drills before games begin?~Pre-season~Post-season~Off-season~The word 'pre' means before.",
    "Which phase is when you play games and keep your fitness up?~In-season~Off-season~Pre-season",
    "Which phase is for resting and recovering after the last game?~Post-season~Pre-season~In-season~'Post' means after.",
    "Why do athletes cross-train in the off-season?~To stay fit and avoid overuse~To forget the sport~To skip all exercise~Different activities use different muscles.",
    "What does periodization mean?~Planning training in phases~Training only once~Skipping rest~It involves time periods.",
    "A soccer player does lots of ball drills just before the first match. Which phase is this likely?~Pre-season~Off-season~Post-season",
    "Why is a recovery phase important?~Bodies repair and get stronger~It makes skills disappear~It is wasted time~Muscles rebuild while resting."]);
  const p4 = T("Plyometrics and power", "🦘", "<b>Plyometric</b> training uses quick jumps and bounds to build <b>power</b>.",
    "Power is strength combined with speed. Examples are box jumps and jump squats. Land softly with bent knees, on a safe surface, only after you are warmed up and have a strength base.",
    "Safe landing: soft, quiet, knees bent, on a flat non-slippery surface.", "A 15-minute warm-up comes before jumping drills.", [
    "What is plyometric training?~Quick jumping and bounding exercises~Slow stretching only~Lifting with no movement",
    "Power is strength combined with…~Speed~Size~Sleep~Think about how fast you move.",
    "Which exercise is plyometric?~Box jumps~Wall sit~Slow walking~Which one has a quick explosive jump?",
    "How should you land from a jump?~Softly with bent knees~Stiff with locked knees~On your toes with straight legs~Quiet landings are safe landings.",
    "Why build a strength base first?~Muscles and joints handle landing forces~Jumping is boring without it~Coaches require it~Think about what landing does to your body.",
    "Which surface is best for jump drills?~A soft, flat, non-slippery surface~A wet tile floor~A rocky slope",
    "When should you do plyometrics?~When rested and warmed up~When very tired~Right when you wake up cold~Quality jumps need fresh muscles.",
    "Which sport benefits most from explosive jumping power?~Volleyball~Chess~Bowling on a screen"]);
  const p5 = T("Sleep and the teen brain", "😴", "Sleep is part of training. During sleep your body repairs muscles and your brain stores what you learned.",
    "Most teens need about <b>8 to 10 hours</b>. Screens and caffeine late in the day make sleep harder. A steady bedtime helps.",
    "Think about what helps the body relax and repair, and what keeps the brain alert.", "Putting your phone across the room at night can protect your sleep.", [
    "About how many hours of sleep do most teens need?~8 to 10 hours~4 to 5 hours~12 to 14 hours",
    "When is most growth hormone released?~During sleep~While scrolling~During a sprint only~It happens while you rest.",
    "Bright screens right before bed can…~Make it harder to fall asleep~Make deep sleep come faster~Heal sore muscles~They tell your brain it is daytime.",
    "Which habit helps you sleep well?~Going to bed at about the same time each night~Staying up very late on school nights~Drinking a caffeine drink at bedtime~Look for a steady routine.",
    "Not getting enough sleep makes reaction time…~Slower~Faster~Perfect~Tired brains respond more slowly.",
    "Where is a smart place to charge your phone at night?~Across the room, away from the bed~Under your pillow~In your hand",
    "A nap that helps without hurting nighttime sleep is about…~20 to 30 minutes~3 hours~5 hours~Short is the key.",
    "Which can keep you awake if you have it late in the day?~Caffeine~Water~Fruit"]);
  const p6 = T("Cricket basics", "🏏", "Cricket is a bat-and-ball game played around the world. Teams take turns batting and fielding.",
    "A team has <b>11</b> players. The <b>bowler</b> throws the ball toward the batter, who guards the <b>stumps</b>. An <b>over</b> is <b>6</b> balls. A ball that crosses the boundary on the ground scores <b>4</b>, and in the air scores <b>6</b>.",
    "Remember the numbers: 11 players, 6 balls in an over, 4 and 6 for boundaries.", "A bowler who throws 6 balls has finished one over.", [
    "How many players are on a cricket team on the field?~11~9~15",
    "How many balls are in one over?~6~10~3",
    "Who throws the ball toward the batter in cricket?~The bowler~The umpire~The goalkeeper~Think of the person who delivers the ball.",
    "A shot that crosses the boundary without bouncing scores…~6 runs~1 run~10 runs~It is the biggest hit.",
    "A shot that rolls or bounces to the boundary scores…~4 runs~6 runs~2 runs~It is one less than the big one.",
    "What are the three upright sticks the batter protects called?~Stumps~Bats~Pads~Look at the target behind the batter.",
    "If the ball hits the stumps and knocks the bails off, the batter is…~Out~Given 4 runs~Given an extra over",
    "About how long is a cricket pitch between the wickets?~22 yards (about 20 m)~10 yards~50 yards"]);
  const p7 = T("Rip currents and beach safety", "🌊", "A <b>rip current</b> is a narrow, fast channel of water that pulls away from the shore. It can surprise strong swimmers.",
    "If you are caught: stay calm, do not fight straight against it, <b>swim parallel to the shore</b> until free, then angle back in. Swim near a lifeguard. Red flags mean high danger.",
    "Calm first. Then go sideways, not straight back.", "A swimmer pulled out calmly floats, then swims sideways along the beach.", [
    "What is a rip current?~A narrow, fast flow of water away from shore~A giant wave~A warm patch of water~Think about the word 'rip' as tearing away.",
    "If you are caught in a rip current, what should you do first?~Stay calm~Swim straight against it as hard as you can~Dive down deep~Panic wastes energy.",
    "Which direction should you swim to escape a rip current?~Parallel to the shore~Straight against the current~Straight out to sea~The current is narrow, so move out of its path.",
    "Where is the safest place to swim at a beach?~Near a lifeguard~Far from anyone~Right beside rocks~Someone trained should be watching.",
    "What does a red flag at a beach usually mean?~High danger~Perfect swimming~Lunch time~Red often means stop or warning.",
    "What does a green flag usually mean?~Low hazard, but still be careful~Swimming is banned~Strong currents~Green often means go.",
    "If you cannot get out of a rip current, you should…~Float, wave and call for help~Hide underwater~Stay silent~Make yourself noticed.",
    "You see a friend struggling in the water. What should you do?~Shout for a lifeguard or adult and call for help~Jump in right away to grab them~Walk away"]);
  const p8 = T("Choreography words", "💃", "Dancers use special words to plan a routine, called <b>choreography</b>.",
    "<b>Unison</b>: everyone moves at the same time. <b>Canon</b>: the same move, one dancer after another. <b>Mirroring</b>: facing a partner and copying like a mirror. <b>Levels</b>: low, medium or high. <b>Formation</b>: how dancers are arranged.",
    "Ask: same time, one after another, or facing each other?", "Four dancers doing a wave one after another are in canon.", [
    "Everyone does the same move at exactly the same time. This is…~Unison~Canon~Mirroring~Think 'one' in 'unison'.",
    "The same move passes from one dancer to the next, like a ripple. This is…~Canon~Unison~Formation~Dancers start one after another.",
    "Two dancers face each other and copy each other like a reflection. This is…~Mirroring~Canon~Levels~Think of a mirror.",
    "Low, medium and high are different dance…~Levels~Beats~Costumes~They describe how high you are in space.",
    "The shape or arrangement of dancers on the floor is a…~Formation~Transition~Canon",
    "A move that smoothly links one part of a dance to the next is a…~Transition~Formation~Level~Think of a bridge.",
    "Repeating a move on purpose in a dance is called…~Repetition~Contrast~Unison",
    "Using fast then slow movement, or big then small, creates…~Contrast~Unison~Repetition~It shows a difference."]);
  const p9 = T("Spectators and sidelines", "📣", "People watching a game are part of the sport too. Good <b>sideline behavior</b> makes games fun and safe.",
    "Cheer for your team, not against the other. Respect the officials. Never insult players. Leave the coaching to the coach. Clap for good plays on both sides.",
    "Positive and respectful is the goal: support, do not tear down.", "After the game, a fan thanks both teams for playing.", [
    "Which is good sideline behavior?~Cheering for your team's good plays~Booing the other team~Yelling at the referee~Pick the supportive choice.",
    "A referee makes a call you disagree with. What do you do as a fan?~Stay respectful~Shout insults~Throw things~Officials are people doing a hard job.",
    "The other team makes a great play. What is a sporting reaction?~Clap for it~Stay silent to be rude~Jeer~Good sports notice good play on both sides.",
    "A parent yells instructions that conflict with the coach. Better to…~Cheer and let the coach coach~Keep shouting orders~Walk onto the field",
    "Which message is best for a player who just missed a shot?~'Nice try, keep going!'~'You always mess up!'~Nothing, then laugh",
    "After the game, a good spectator…~Thanks players and cleans up trash~Leaves trash on the bleachers~Blames the other team",
    "Why is calm sideline behavior important?~It keeps games safe and fun for all~It is a rule only for adults~It makes games longer",
    "A fan from the other team is sitting near you. You should…~Be friendly and polite~Argue with them~Ignore the game"]);
  const p10 = T("Bike check and gears", "🚲", "A quick bike check keeps you safe. Use <b>A-B-C</b>: <b>A</b>ir, <b>B</b>rakes, <b>C</b>hain.",
    "<b>Air</b>: tires firm. <b>Brakes</b>: squeeze both and they stop the wheel. <b>Chain</b>: clean and oiled. A helmet sits level, two fingers above the eyebrows. Use a low gear for hills and a high gear for speed on flat ground.",
    "A-B-C first, helmet on, then pick the gear for the road.", "Before riding, press the tire to check the air.", [
    "In the bike check A-B-C, what does A stand for?~Air in the tires~Alarm~Axle~Think of what makes tires firm.",
    "In A-B-C, what does B stand for?~Brakes~Bell~Bolts~You should be able to stop.",
    "In A-B-C, what does C stand for?~Chain~Cargo~Cap~It connects the pedals to the wheel.",
    "Where should a helmet sit on your head?~Level, about two fingers above the eyebrows~Tilted far back~Low over your eyes~Cover the forehead, not the eyes.",
    "Which gear is easiest for climbing a steep hill?~A low gear~A high gear~No gear~Easier pedaling is needed.",
    "Which gear helps you go fast on flat ground?~A high gear~A low gear~Neutral",
    "At night, a bike should have…~Lights and reflectors~Dark clothing only~Nothing special",
    "Which hand signal means you are about to stop?~Left arm pointing down~Both hands on the handlebars~Waving above your head"]);
  const p11 = T("Carbs, protein and fat", "🍝", "Food gives you three big kinds of nutrients, called <b>macronutrients</b>: carbohydrates, protein and fat.",
    "<b>Carbohydrates</b> are the body's main quick fuel. <b>Protein</b> builds and repairs muscle. <b>Fat</b> gives long-lasting energy and helps the body use some vitamins.",
    "Match the nutrient to its job: fuel, repair, or long-lasting energy.", "Pasta is rich in carbohydrates, so it helps fill the fuel tank.", [
    "Which nutrient is the body's main quick fuel?~Carbohydrates~Protein~Water~Think about pasta, rice and fruit.",
    "Which nutrient builds and repairs muscle?~Protein~Carbohydrates~Salt~Muscles are made mostly of it.",
    "Which nutrient gives long-lasting energy and has the most calories per gram?~Fat~Carbohydrates~Fiber~Think of the most concentrated energy.",
    "Which food is mostly protein?~Chicken or beans~White bread~Soda",
    "Which food is mostly carbohydrate?~Rice~Eggs~Butter",
    "Which food is mostly fat?~Olive oil~Apple~Plain rice",
    "After a hard workout, a good snack has…~Carbs and protein~Only candy~Nothing at all~Refuel and repair.",
    "Which of these are all macronutrients?~Carbs, protein, fat~Iron, zinc, calcium~Vitamin A, C, D~Think 'macro' means big amounts."]);
  const p12 = T("Joint movements", "🦵", "Joints move in set ways. Knowing the names helps you describe exercises.",
    "<b>Flexion</b>: bending (angle gets smaller). <b>Extension</b>: straightening. <b>Abduction</b>: moving away from the middle of the body. <b>Adduction</b>: moving toward the middle. <b>Rotation</b>: turning around an axis.",
    "Bend = flexion, straighten = extension, away = abduction, toward = adduction.", "Lifting your arm out to the side is abduction.", [
    "Bending your elbow so your hand moves toward your shoulder is…~Flexion~Extension~Rotation~The angle is getting smaller.",
    "Straightening your knee to kick a ball is…~Extension~Flexion~Adduction~You are opening the angle.",
    "Lifting your leg out to the side is…~Abduction~Adduction~Flexion~Moving away from the body's middle line.",
    "Bringing your arm back down toward your side is…~Adduction~Abduction~Extension~You are moving toward the middle.",
    "Turning your head to look over your shoulder is…~Rotation~Flexion~Abduction~You are turning around an axis.",
    "A squat bends the knees. This knee movement is…~Flexion~Extension~Rotation",
    "Standing up from a squat straightens the knees. This is…~Extension~Flexion~Abduction",
    "Which joint type allows the widest range, like the shoulder?~Ball-and-socket~Hinge~Fixed~Think of a ball turning in a cup."]);
  const p13 = T("Body direction words", "🧭", "Coaches, doctors and trainers use exact words to say where things are on the body.",
    "<b>Anterior</b>: front. <b>Posterior</b>: back. <b>Superior</b>: above. <b>Inferior</b>: below. <b>Medial</b>: toward the middle. <b>Lateral</b>: toward the side. <b>Proximal</b>: closer to the trunk. <b>Distal</b>: farther from the trunk.",
    "Picture a person standing straight. Ask: front or back? above or below? middle or side? near or far from the trunk?", "The shoulder is proximal to the wrist, because it is closer to the trunk.", [
    "Your chest is on the ___ side of your body.~Anterior~Posterior~Lateral~Front is the first word of the choices' meaning.",
    "Your spine is on the ___ side of your body.~Posterior~Anterior~Superior~It is at the back.",
    "Your head is ___ to your chest.~Superior~Inferior~Medial~Superior means above.",
    "Your feet are ___ to your knees.~Inferior~Superior~Proximal~Inferior means below.",
    "Your nose is ___ to your ears.~Medial~Lateral~Distal~Closer to the middle line.",
    "Your ears are ___ to your nose.~Lateral~Medial~Anterior~Farther out to the side.",
    "Your knee is ___ to your ankle.~Proximal~Distal~Lateral~Closer to the trunk.",
    "Your fingers are ___ to your elbow.~Distal~Proximal~Medial~Farther from the trunk."]);

  const q1 = N("Calories from macros", "🍎", "Food energy is measured in <b>calories</b>. Each gram of a nutrient gives a set amount.",
    "<b>Carbohydrate</b>: 4 calories per gram. <b>Protein</b>: 4 calories per gram. <b>Fat</b>: 9 calories per gram. Multiply the grams by the number for each nutrient, then add.",
    "Multiply first, then add. Fat has more than twice the calories per gram.", () => {
    const t = ri(1, 3);
    if (t === 1) { const c = ri(2, 10) * 5, p = ri(1, 6) * 5, f = ri(1, 6) * 2; return { text: `A snack bar has ${c} g of carbohydrate, ${p} g of protein and ${f} g of fat. How many calories is that in all? (carbs 4, protein 4, fat 9 per gram)`, visual: "🍫", answer: c * 4 + p * 4 + f * 9,
      hints: ["Work out each nutrient's calories on its own.", "Carbs and protein are 4 each per gram; fat is 9 per gram. Add the three parts.", "Example: 10 g carbs, 5 g protein, 2 g fat = 40 + 20 + 18 = 78. Now do yours."] }; }
    if (t === 2) { const f = ri(2, 20); return { text: `A meal has ${f} grams of fat. How many calories come from the fat? (9 per gram)`, visual: "🧈", answer: f * 9,
      hints: ["Each gram of fat gives the same number of calories.", "Multiply the grams of fat by 9.", "Example: 4 g of fat × 9 = 36 calories. Now do yours."] }; }
    const g = ri(2, 20); return { text: `How many more calories are in ${g} grams of fat than in ${g} grams of carbohydrate? (fat 9, carbs 4 per gram)`, visual: "⚖️", answer: g * 5,
      hints: ["Find the calories for each, then subtract.", "The difference per gram is 9 minus 4. Multiply by the grams.", "Example: for 3 g, fat is 27 and carbs 12, so 27 − 12 = 15. Now do yours."] };
  });
  const q2 = N("Batting average", "⚾", "A <b>batting average</b> is hits divided by at-bats, written as a decimal.",
    "Average = hits ÷ at-bats. A player with 3 hits in 10 at-bats has 3 ÷ 10 = 0.300. To find hits from an average, multiply the average by the at-bats.",
    "Divide hits by at-bats. Going backward, multiply.", () => {
    const ab = pick([8, 20, 25, 40, 50, 125, 200, 250]), name = pick(NAMES);
    if (Math.random() < 0.65) { const h = ri(1, Math.floor(ab * 0.4)); return { text: `${name} had ${h} hits in ${ab} at-bats. What is the batting average (as a decimal)?`, visual: "⚾", answer: r3(h / ab),
      hints: ["Compare hits to tries with division.", "Divide the hits by the at-bats.", "Example: 3 hits in 10 at-bats is 3 ÷ 10 = 0.3. Now do yours."] }; }
    const h = ri(1, Math.floor(ab * 0.4)), avg = r3(h / ab); return { text: `${name} has a batting average of ${avg} after ${ab} at-bats. How many hits is that?`, visual: "⚾", answer: h,
      hints: ["The average came from dividing hits by at-bats.", "Undo the division: multiply the average by the at-bats.", "Example: 0.3 average in 10 at-bats is 0.3 × 10 = 3 hits. Now do yours."] };
  });
  const q3 = N("Areas of fields", "📐", "Courts and fields come in many shapes. We find the <b>area</b> to know how much space there is.",
    "Triangle: ½ × base × height. Parallelogram: base × height. Trapezoid: ½ × (top + bottom) × height. Area is measured in square units.",
    "Pick the right formula first, then multiply carefully.", () => {
    const t = ri(1, 3);
    if (t === 1) { const b = ri(2, 12) * 2, h = ri(3, 12); return { text: `A triangular flag-football zone has a base of ${b} m and a height of ${h} m. What is its area in square meters?`, visual: "🔺", answer: b * h / 2,
      hints: ["A triangle is half of a rectangle.", "Multiply base by height, then take half.", "Example: base 6, height 5 gives 30, and half is 15. Now do yours."] }; }
    if (t === 2) { const b = ri(4, 15), h = ri(3, 10); return { text: `A parallelogram-shaped mat is ${b} m along its base and ${h} m high (straight up). What is its area in square meters?`, visual: "▱", answer: b * h,
      hints: ["Slide the slanted part over to make a rectangle.", "Multiply base by the straight-up height.", "Example: base 7, height 3 gives 21. Now do yours."] }; }
    const a = ri(3, 10), c = a + ri(1, 3) * 2, h = ri(2, 9); return { text: `A trapezoid-shaped garden for the school has parallel sides of ${a} m and ${c} m, and a height of ${h} m. What is its area in square meters?`, visual: "⏢", answer: (a + c) * h / 2,
      hints: ["Average the two parallel sides, then multiply by the height.", "Add the two parallel sides, multiply by the height, then halve.", "Example: sides 4 and 8, height 5: (4 + 8) × 5 ÷ 2 = 30. Now do yours."] };
  });
  const q4 = N("Gear sales and tax", "🏷️", "Sports gear is often on sale. A <b>discount</b> takes a percent off. <b>Sales tax</b> adds a percent on top.",
    "Discount amount = price × percent ÷ 100. New price = price − discount. With tax, add the tax amount to the price.",
    "Find the percent amount first, then subtract (discount) or add (tax).", () => {
    const price = ri(2, 10) * 20, name = pick(NAMES);
    const t = ri(1, 3);
    if (t === 1) { const d = pick([10, 20, 25, 30, 40, 50]); return { text: `A pair of sneakers costs $${price}. ${name} has a ${d}% off coupon. What is the sale price in dollars?`, visual: "👟", answer: price * (100 - d) / 100,
      hints: ["Take the percent off first, then find what is left.", `Find ${d}% of the price and subtract it, or multiply the price by ${100 - d} ÷ 100.`, "Example: $80 with 25% off: 25% of 80 is 20, so 80 − 20 = $60. Now do yours."] }; }
    if (t === 2) { const d = pick([10, 20, 25, 30, 40, 50]); return { text: `A $${price} jersey is ${d}% off. How many dollars does ${name} save?`, visual: "👕", answer: price * d / 100,
      hints: ["Saving means the discount amount only.", `Find ${d}% of the price.`, "Example: 10% of $50 is $5. Now do yours."] }; }
    const tx = pick([5, 10]); return { text: `A basketball costs $${price} before tax. The sales tax is ${tx}%. What is the total in dollars?`, visual: "🏀", answer: price + price * tx / 100,
      hints: ["The tax is added on top of the price.", `Find ${tx}% of the price, then add it.`, "Example: $40 with 10% tax: tax is $4, total is $44. Now do yours."] };
  });
  const q5 = N("At least inequalities", "📏", "Goals often say <b>at least</b>. That means the amount can be that number or more.",
    "\"At least 100\" is written ≥ 100. To find the smallest whole number that works, divide, then <b>round up</b> if it is not exact.",
    "Divide, then round UP, because rounding down would fall short.", () => {
    const t = ri(1, 2);
    if (t === 1) { const k = ri(3, 9), G = ri(25, 90); return { text: `A challenge needs at least ${G} laps in total. Each practice has ${k} laps. What is the smallest whole number of practices needed?`, visual: "🏃", answer: Math.ceil(G / k),
      hints: ["Practices come in whole numbers only.", "Divide the lap goal by the laps per practice. If there is a remainder, go up to the next whole number.", "Example: 22 laps needed, 5 per practice: 22 ÷ 5 = 4.4, so 5 practices. Now do yours."] }; }
    const m = ri(2, 6), c = ri(5, 30), T = ri(10, 20) * 10; return { text: `Solve for the smallest whole number x: ${m}x + ${c} ≥ ${T}.`, visual: "📏", answer: Math.ceil((T - c) / m),
      hints: ["Get x alone, one step at a time.", "Subtract the constant from both sides, divide by the number with x, then round up if needed.", "Example: 3x + 4 ≥ 20 gives 3x ≥ 16, x ≥ 5.33, so x = 6. Now do yours."] };
  });

  // ================= LEVEL 17 =================
  const r1 = T("Muscle contraction types", "💪", "A muscle can work in three ways. Each one is a different kind of <b>contraction</b>.",
    "<b>Concentric</b>: the muscle shortens while it works (lifting up). <b>Eccentric</b>: the muscle lengthens while it works (lowering slowly). <b>Isometric</b>: the muscle works but stays the same length (a plank).",
    "Ask: shorter, longer, or the same length?", "In a biceps curl, lifting is concentric and lowering slowly is eccentric.", [
    "Lifting a weight up in a biceps curl, your biceps does a ___ contraction.~Concentric~Eccentric~Isometric~The muscle gets shorter.",
    "Slowly lowering the weight, your biceps does a ___ contraction.~Eccentric~Concentric~Isometric~The muscle is lengthening under tension.",
    "Holding a plank still uses ___ contractions.~Isometric~Concentric~Eccentric~Nothing moves and the length stays the same.",
    "A wall sit mostly uses which contraction?~Isometric~Eccentric~Concentric",
    "Lowering into a squat, your thigh muscles work ___ .~Eccentrically~Concentrically~Isometrically~They lengthen as you go down.",
    "Standing up out of a squat, your thigh muscles work ___ .~Concentrically~Eccentrically~Isometrically~They shorten as you rise.",
    "'Iso' means same and 'metric' means length. Which contraction fits?~Isometric~Eccentric~Concentric",
    "Which contraction often causes the most muscle soreness a day later?~Eccentric~Isometric~None of them"]);
  const r2 = T("VO2 max and exercise intensity", "🫁", "<b>VO2 max</b> is the most oxygen your body can use in one minute of hard exercise. It shows how fit your heart, lungs and muscles are.",
    "A higher VO2 max usually means better endurance. Interval training and steady cardio can raise it. The <b>talk test</b>: if you can talk but not sing, it is moderate; if you can say only a few words, it is vigorous.",
    "More oxygen used = bigger engine.", "If you can chat while jogging, you are working at a moderate level.", [
    "What does VO2 max measure?~Most oxygen your body can use in a minute~How high you can jump~How much you weigh~It has the chemical symbol for oxygen in it.",
    "A higher VO2 max usually shows better…~Endurance~Flexibility only~Eyesight~Think heart, lungs and muscles working together.",
    "At a moderate intensity, the talk test says you can…~Talk but not sing~Sing easily~Not speak at all~Not too easy, not too hard.",
    "At a vigorous intensity, you can usually say…~Only a few words~Whole paragraphs~Sing a song~You are breathing hard.",
    "Which can help raise your VO2 max?~Regular cardio training~Staying still all day~Skipping warm-ups",
    "Which sport usually needs a very high VO2 max?~Distance running~Archery~Bowling",
    "VO2 max is measured in…~Milliliters of oxygen per kilogram per minute~Meters per second~Beats per second",
    "Walking slowly while chatting is what intensity?~Light~Vigorous~Maximum"]);
  const r3_ = T("Energy balance", "⚖️", "Your body uses energy all day, and food gives energy in. The difference is called <b>energy balance</b>.",
    "Calories <b>in</b> come from food and drinks. Calories <b>out</b> are used for body functions at rest (your <b>basal metabolism</b>), for digestion, and for movement. Growing teens need enough food for growth and play.",
    "If in equals out, weight stays about steady. Growing bodies need enough fuel.", "A very active teen may need more food than a less active one.", [
    "Calories 'in' come from…~Food and drinks~Sleeping~Exercise~Think about what you eat and drink.",
    "Calories 'out' are used for…~Body functions and movement~Only sports~Only thinking",
    "If calories in equal calories out, body weight tends to…~Stay about the same~Rise quickly~Drop quickly~Think of a balanced scale.",
    "Which part usually uses the most calories per day for most people?~Basal metabolism (body running at rest)~Digestion~Exercise class~It happens all day, even asleep.",
    "A very active teen will likely need…~More food for fuel~Less food~No change ever~More activity means more energy used.",
    "Does a growing teen need extra energy for growing?~Yes~No~Only adults grow~Bodies build new tissue as they grow.",
    "Skipping meals before a workout can make you…~Tired and weak~Stronger~Faster for hours",
    "Which is a way to increase calories out?~More physical activity~Sleeping more hours~Eating a snack"]);
  const r4 = T("Smart choices under pressure", "🧠", "Sometimes friends push you to do something risky. A clear plan helps you make a good decision.",
    "Steps: <b>stop</b>, <b>think</b> of choices, <b>weigh</b> what could happen, <b>decide</b>, then <b>act</b>. To say no: be calm and firm, give a reason, offer another idea, or leave.",
    "Pause, think about the results, then choose what keeps you and others safe.", "A friend dares you to skate without a helmet: you say no, put your helmet on, and suggest a fun trick instead.", [
    "A friend dares you to ride your bike with no helmet. What is the best choice?~Say no and wear your helmet~Do it to fit in~Hide the helmet~Safety first, always.",
    "What is the first step in a good decision?~Stop and think~Act fast~Ask who is watching~A pause helps you see choices.",
    "Which is a good refusal skill?~Say no calmly and offer another idea~Say yes then change your mind~Laugh and give in",
    "A teammate wants to skip warm-up to start the game early. You…~Explain warm-ups prevent injuries and do them~Skip it too~Tell them they are silly",
    "Peer pressure means…~Pressure from people your own age~Pressure inside a ball~Pressure on your muscles",
    "Weighing consequences means…~Thinking about what could happen~Using a scale~Racing to decide",
    "If a friend keeps pushing after you say no, you can…~Walk away and tell a trusted adult~Give in~Keep arguing",
    "A good friend who hears you say no will usually…~Respect it~Make fun of you for years~Make you leave the team"]);
  const r5 = T("Zone and man-to-man defense", "🛡️", "In team sports like basketball, defenders can guard players or guard space.",
    "<b>Man-to-man</b>: each defender guards one opponent. <b>Zone</b>: each defender guards an area of the court. Zone helps protect the basket but can leave outside shooters open. Man-to-man needs good one-on-one effort and talk.",
    "Player or space? That is the difference.", "In a zone, you guard whoever enters your area.", [
    "In man-to-man defense, each defender guards…~One opposing player~One area~Nobody~The name tells you a person.",
    "In a zone defense, each defender guards…~An area of the court~A single player the whole game~The scoreboard~Think about space.",
    "A zone is often used to protect…~The area near the basket~Only the sideline~The bench",
    "A weakness of a zone is that it can leave…~Outside shooters open~The basket unguarded~Everyone tired",
    "Man-to-man defense needs defenders to…~Stay with their player and talk~Stand still~Ignore the ball",
    "When a teammate sets a block to free a shooter, the defense should…~Call it out and switch or fight through~Stop playing~Look away",
    "Talking on defense is helpful because…~Teammates know who is open or where help is needed~It confuses your own team~It is required by law",
    "Which is a team defense idea?~Helping a teammate who gets beaten~Leaving the court~Fouling on purpose every time"]);
  const r6 = T("Archery and target safety", "🎯", "Target sports like archery are safe when everyone follows range rules. Always have an instructor.",
    "Shoot only when the range is clear and everyone is behind the line. Point the bow at the target or the ground, never at people. Never shoot with no target backing. Walk to collect arrows only after the signal that all shooting has stopped.",
    "Safe range = clear line, supervisor, and everyone waits for the signal.", "At the signal, shooters step back and put the bow down before anyone goes forward.", [
    "Where should a bow always be pointed?~At the target or down range~At friends~Straight up~Away from people.",
    "When may you walk to collect arrows?~After the signal that shooting has stopped~While others are still shooting~Whenever you want",
    "Where should people stand while others are shooting?~Behind the shooting line~In front of the targets~Anywhere",
    "Who should supervise a school archery range?~A trained instructor~Nobody~Whoever is closest",
    "What protective gear is common in archery?~Arm guard and finger tab or glove~Football helmet~Swim fins",
    "If someone yells 'stop', you should…~Freeze and put the bow down safely~Keep shooting~Run~Stopping is part of safety.",
    "Is it OK to point a bow at a person 'as a joke'?~No, never~Yes if it is empty~Yes if they agree~Even unloaded, treat it with respect.",
    "Before shooting, you should check that…~The area downrange is clear~Your phone is charged~The target is wet"]);
  const r7 = T("Flexibility and range of motion", "🤸", "<b>Flexibility</b> is how far a joint can move. This is its <b>range of motion</b>.",
    "Warm muscles stretch more easily. Hold a static stretch about <b>15 to 30 seconds</b> to mild tension, never pain. Do not bounce. Flexibility depends on joint shape, muscle length and regular practice.",
    "Warm up first, hold gently, breathe, and never force it.", "Stretching a hamstring after a jog, holding 20 seconds, is a safe plan.", [
    "Flexibility is the ability of a joint to…~Move through a range~Lift heavy things~Stay still~Think about bending.",
    "Range of motion means…~How far a joint can move~How fast you run~How strong you are",
    "When are muscles easiest to stretch?~When they are warm~When they are freezing cold~Right after waking up without moving",
    "How long should you hold a static stretch?~About 15 to 30 seconds~1 second~10 minutes~Long enough to relax, not too long.",
    "How should a stretch feel?~Mild tension~Sharp pain~Numb",
    "Should you bounce in a static stretch?~No~Yes~Only at the end~Bouncing can cause tiny tears.",
    "What helps flexibility improve over time?~Regular stretching practice~Never stretching~Only stretching once",
    "Which joint can move in the most directions?~Shoulder~Knee~Elbow~Think ball-and-socket."]);
  const r8 = T("Overuse injuries", "🦴", "Some injuries do not happen in one hit. They build up from the same stress again and again. These are <b>overuse injuries</b>.",
    "Examples: shin splints, stress fractures, tendinitis (like tennis elbow). Prevent them by building up slowly, cross-training, using good technique and shoes, resting, and telling a coach early if something keeps hurting.",
    "Slow increases and rest days protect you.", "A runner who adds distance slowly and rests after hard days lowers the risk.", [
    "An overuse injury comes from…~Repeated stress over time~One sudden fall~A rule violation~Repeating the same motion again and again.",
    "Pain along the front of the lower leg from running is often called…~Shin splints~A sprain~Writer's cramp~It sounds like a piece of the shin.",
    "A tiny crack in a bone from repeated stress is a…~Stress fracture~Sprain~Blister",
    "Swelling of a tendon from overuse is called…~Tendinitis~Arthritis~Cramp~'-itis' means inflammation.",
    "What helps prevent overuse injuries?~Building up slowly and resting~Doing more every day~Ignoring pain",
    "Cross-training means…~Using different activities~Doing one sport only~Playing twice a day",
    "If a pain keeps coming back, you should…~Tell a coach or adult~Keep it secret~Push harder",
    "Which choice lowers risk for young pitchers?~Limits on how many throws they do~Throwing every day~Throwing when sore"]);
  const r9 = T("Minor first aid", "🩹", "Small injuries are common in sports. Knowing the right first steps helps. Always tell an adult.",
    "<b>Nosebleed</b>: sit up, lean forward, pinch the soft part of the nose for about 10 minutes. <b>Minor burn</b>: cool running water for about 10 minutes or more. <b>Small cut</b>: clean it, press gently, then cover. <b>Blister</b>: cover it; do not pop it.",
    "Stay calm, tell an adult, and for anything serious call for help.", "For a scrape: wash with clean water, press on any bleeding, then cover with a bandage.", [
    "For a nosebleed, you should lean…~Forward and pinch the soft part of the nose~Backward~Flat on your back~Think of keeping blood out of your throat.",
    "How long should you pinch for a nosebleed before checking?~About 10 minutes~2 seconds~1 hour",
    "A minor burn should be cooled with…~Cool running water~Ice cubes for an hour~Butter~Gently cool, not freezing.",
    "A small cut is bleeding slightly. First you…~Clean it and press gently~Ignore it~Pour sugar on it",
    "What should you do about a blister?~Cover it; do not pop it~Pop it immediately~Rub it hard",
    "What do you do first when someone is hurt?~Tell a grown-up~Hide it~Guess a treatment",
    "Which injury needs emergency help right away?~Heavy bleeding that will not stop~A small scrape~A tiny blister",
    "Before touching someone's cut, an adult would ideally…~Wash hands or wear gloves~Skip hand washing~Use dirty cloth"]);
  const r10 = T("Title IX and fair access", "🏅", "A US law called <b>Title IX</b> (passed in <b>1972</b>) says that no one can be left out of school programs, including sports, because of their sex.",
    "Since Title IX, many more girls and women play school sports. Schools must offer fair chances to play. Fair access also means building ramps, adapted gear and inclusive teams.",
    "Fair access = equal chances to take part.", "A school adding a girls' soccer team to match its boys' team is an example of fair access.", [
    "In what year was Title IX passed in the US?~1972~1872~2012~It was in the 1970s.",
    "Title IX says school programs, including sports, cannot exclude people because of…~Their sex~Their height~Their favorite color~It is about fairness for all genders.",
    "After Title IX, the number of girls in school sports…~Grew a lot~Dropped~Stayed exactly 0",
    "Which is an example of fair access to PE?~A ramp so a wheelchair user can join~A locked gym door~A rule only for the tallest students",
    "Fair access means everyone gets…~An equal chance to take part~The same grade~The same shoes",
    "A school has a boys' basketball team and none for girls. Fair access would suggest…~Offering a girls' team too~Closing the boys' team~Doing nothing",
    "Inclusive teams welcome…~Players of different abilities~Only the fastest~Only older students",
    "Which choice shows respect for all players?~Letting everyone use the gym fairly~Saving the gym for friends~Making fun of newcomers"]);
  const r11 = T("Center of gravity and stability", "🎪", "Your <b>center of gravity</b> is the point where your weight is balanced. It controls how stable you are.",
    "You are more stable with a <b>low</b> center of gravity and a <b>wide base</b>. You tip when your center of gravity moves past the edge of your base. Gymnasts spread arms to help balance.",
    "Lower and wider = steadier. Higher and narrower = easier to tip.", "A wrestler bends the knees and spreads the feet to become harder to push over.", [
    "Which stance is more stable?~Feet wide apart~Feet together on tip-toes~Standing on one toe~A wider base helps.",
    "Bending your knees makes your center of gravity…~Lower~Higher~Disappear~You are getting closer to the floor.",
    "A lower center of gravity makes you…~More stable~Less stable~Taller~Think of a squat.",
    "You tip over when your center of gravity moves…~Outside your base~Inside your base~Nowhere",
    "Why do gymnasts spread their arms on a beam?~To help balance~To show off~To save energy",
    "Which object is hardest to tip?~A wide, low box~A tall, thin pole~A pencil on its tip",
    "A football lineman crouches because…~A low stance is harder to push over~It looks cool~He is tired",
    "Your center of gravity is the point where…~Your weight is balanced~You are tallest~You are strongest"]);
  const r12 = T("Soccer formations", "⚽", "Coaches use numbers like <b>4-4-2</b> to show how players are arranged on the field.",
    "A team has <b>11</b> players: 1 goalkeeper and 10 others. The numbers go <b>defenders - midfielders - forwards</b>, and they add up to 10.",
    "Read left to right: defenders, midfielders, forwards. The sum is 10.", "In 4-3-3 there are 4 defenders, 3 midfielders and 3 forwards.", [
    "In a 4-4-2 formation, how many defenders are there?~4~2~10~The first number is for the defenders.",
    "In a 4-3-3 formation, how many forwards are there?~3~4~10~The last number is for the forwards.",
    "In a 3-5-2 formation, how many midfielders are there?~5~3~2~The middle number is for midfielders.",
    "The numbers in a formation add up to…~10~11~12~The goalkeeper is not counted.",
    "How many players does a soccer team have on the field?~11~10~9",
    "Which player may use hands inside their own penalty area?~The goalkeeper~The striker~The midfielder",
    "A 4-4-2 and a 4-3-3 differ in the number of…~Midfielders and forwards~Goalkeepers~Referees",
    "In 5-3-2, how many defenders and midfielders in total?~8~5~7"]);

  const s1 = N("Net energy", "⚖️", "<b>Energy balance</b> compares calories in (food) with calories out (body functions plus activity).",
    "Calories out = resting needs + activity. Difference = the larger number minus the smaller. If you eat more than you use, you have extra energy; if you eat less, you used stored energy.",
    "Add the parts of 'out' first, then compare with 'in'.", () => {
    const bmr = ri(14, 20) * 100, act = ri(2, 8) * 100, name = pick(NAMES), out = bmr + act, t = ri(1, 3);
    if (t === 1) return { text: `${name} uses ${bmr} calories for body functions and ${act} for activity in a day. How many calories does ${name} use in all?`, visual: "🔥", answer: out,
      hints: ["There are two parts of energy used.", "Add the calories for body functions and for activity.", "Example: 1,500 + 300 = 1,800. Now do yours."] };
    const inn = out + ri(1, 6) * 100;
    if (t === 2) return { text: `${name} ate ${inn} calories and used ${bmr} for body functions plus ${act} for activity. How many MORE calories did ${name} eat than use?`, visual: "🍽️", answer: inn - out,
      hints: ["First find the total calories used.", "Add body functions and activity, then subtract that from the food calories.", "Example: ate 2,300, used 1,500 + 400 = 1,900; 2,300 − 1,900 = 400. Now do yours."] };
    const inn2 = out - ri(1, 6) * 100; return { text: `${name} ate ${inn2} calories and used ${bmr} for body functions plus ${act} for activity. How many FEWER calories did ${name} eat than use?`, visual: "🍽️", answer: out - inn2,
      hints: ["Find the total used first.", "Add body functions and activity, then subtract the food calories from that total.", "Example: used 1,500 + 400 = 1,900, ate 1,600; 1,900 − 1,600 = 300. Now do yours."] };
  });
  const s2 = N("Mean from a frequency table", "📊", "When some scores repeat, a <b>frequency table</b> lists each score and how many times it happened.",
    "Mean = (sum of all scores) ÷ (number of scores). Multiply each score by its frequency, add those, then divide by the total count.",
    "Multiply score × count for each row, add, then divide by the total count.", () => {
    for (;;) {
      const vals = [2, 3, 4, 5, 6].map(x => x + ri(0, 4) * 0); const counts = vals.map(() => ri(1, 5));
      const n = counts.reduce((a, b) => a + b, 0), sum = vals.reduce((a, v, i) => a + v * counts[i], 0);
      if (sum % n === 0) {
        const rows = vals.map((v, i) => `${v} points: ${counts[i]} games`).join("; ");
        return { text: `Mia's points per game: ${rows}. What is her mean points per game?`, visual: "📊", answer: sum / n,
          hints: ["Each row stands for several games with the same score.", "Multiply points by games for each row, add them up, then divide by the total number of games.", "Example: 2 points × 3 games + 4 points × 1 game = 10 over 4 games = 2.5. Now do yours."] };
      }
    }
  });
  const s3 = N("Proportional speed", "📈", "At a <b>steady speed</b>, distance and time are proportional. The unit rate (distance for 1 second) never changes.",
    "Distance = rate × time. Rate = distance ÷ time. Time = distance ÷ rate. Use the rate from one pair to find another.",
    "Find the unit rate first.", () => {
    const k = ri(2, 9), t = ri(3, 10), name = pick(NAMES), t2 = ri(2, 12);
    const q = ri(1, 3);
    if (q === 1) return { text: `${name} runs ${k * t} meters in ${t} seconds at a steady speed. How many meters per second?`, visual: "🏃", answer: k,
      hints: ["Rate means the distance for 1 second.", "Divide the distance by the time.", "Example: 40 m in 8 s is 40 ÷ 8 = 5 m/s. Now do yours."] };
    if (q === 2) return { text: `${name} runs ${k * t} meters in ${t} seconds at a steady speed. How far will ${name} run in ${t2} seconds?`, visual: "🏃", answer: k * t2,
      hints: ["Use the unit rate.", "Divide to find meters per second, then multiply by the new time.", "Example: 30 m in 6 s means 5 m/s, so 10 s is 50 m. Now do yours."] };
    return { text: `${name} runs ${k * t} meters in ${t} seconds at a steady speed. How many seconds to run ${k * t2} meters?`, visual: "🏃", answer: t2,
      hints: ["Find the rate first, then see how many seconds fit the new distance.", "Divide the new distance by the meters per second.", "Example: at 5 m/s, 50 m takes 50 ÷ 5 = 10 s. Now do yours."] };
  });
  const s4 = N("Two chances in a row", "🎲", "Sometimes two things must both happen, like making two free throws in a row. These are <b>independent events</b>.",
    "Multiply the chances. As percents, turn each into a decimal, multiply, then change back. 50% × 40% = 0.5 × 0.4 = 0.20 = 20%.",
    "Both must happen → multiply. The answer is smaller than each chance.", () => {
    const a = ri(2, 9), b = ri(2, 9), name = pick(NAMES);
    if (Math.random() < 0.7) return { text: `${name} makes ${a * 10}% of free throws. What is the chance of making two in a row? (answer as a percent number)`, visual: "🏀", answer: a * a,
      hints: ["Both shots must go in.", "Change the percent to a decimal, multiply it by itself, then convert back to a percent.", "Example: 30% → 0.3 × 0.3 = 0.09 = 9%. Now do yours."] };
    return { text: `The chance of ${name} hitting a serve is ${a * 10}%, and the chance of the next point going well is ${b * 10}%. What is the chance of both? (answer as a percent number)`, visual: "🎾", answer: a * b,
      hints: ["Both must happen, so multiply.", "Convert both to decimals, multiply, then convert back to a percent.", "Example: 50% and 40% → 0.5 × 0.4 = 0.2 = 20%. Now do yours."] };
  });
  const s5 = N("Diagonals of fields", "📐", "A rectangle's diagonal makes a right triangle. The <b>Pythagorean theorem</b>: a² + b² = c², where c is the long side.",
    "Common triples: 3-4-5, 5-12-13, 8-15-17 and their multiples. To find the diagonal, add the squares and take the square root. To find a leg, subtract.",
    "Spot the triple! A 30 by 40 field has a 50 m diagonal because it is 3-4-5 times 10.", () => {
    const tr = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15]]), k = pick([1, 2, 3, 4, 5]), a = tr[0] * k, b = tr[1] * k, c = tr[2] * k;
    if (Math.random() < 0.6) return { text: `A rectangular field is ${a} m by ${b} m. How long is the diagonal from corner to corner in meters?`, visual: "📐", answer: c,
      hints: ["The diagonal is the long side of a right triangle.", "Square both sides, add them, then take the square root.", "Example: 6 and 8 give 36 + 64 = 100, and √100 = 10. Now do yours."] };
    return { text: `A field has a diagonal of ${c} m and one side of ${a} m. How long is the other side in meters?`, visual: "📐", answer: b,
      hints: ["Now the diagonal is the long side c.", "Square the diagonal and the known side, subtract, then take the square root.", "Example: c = 10 and a = 6 give 100 − 36 = 64, and √64 = 8. Now do yours."] };
  });
  const s6 = N("Comparing gym plans", "🏊", "Two pool plans can cost different amounts. Using an equation, we can find when they cost the <b>same</b>.",
    "Cost = sign-up fee + price per visit × visits. Set the two costs equal, then solve for the number of visits.",
    "Put cost A = cost B. Subtract fees from one side, differences in per-visit price from the other.", () => {
    const m = ri(3, 12), r2_ = ri(1, 4), d = ri(1, 4), r1_ = r2_ + d, f1 = ri(0, 4) * 5, f2 = f1 + d * m;
    return { text: `Plan A costs $${f1} to join plus $${r1_} per visit. Plan B costs $${f2} to join plus $${r2_} per visit. After how many visits do both plans cost the same?`, visual: "🏊", answer: m,
      hints: ["Write the cost of each plan with the visits as an unknown.", "Set the costs equal. The plan with the higher joining fee has the lower price per visit, so the visit difference makes up the fee difference.", "Example: A is $0 + $3 per visit, B is $12 + $1 per visit. 3v = 12 + v, so 2v = 12, v = 6. Now do yours."] };
  });

  // ================= LEVEL 18 =================
  const t1 = T("Cardiac output", "❤️", "<b>Cardiac output</b> is how much blood the heart pumps each minute.",
    "Cardiac output = <b>heart rate</b> × <b>stroke volume</b>. Stroke volume is the blood pumped in one beat. Training makes the heart stronger, so stroke volume rises and resting heart rate often falls.",
    "Beats per minute × blood per beat.", "A heart that beats 60 times a minute and pumps 80 mL each beat moves 4,800 mL a minute.", [
    "Cardiac output is the blood pumped by the heart in…~One minute~One hour~One day~Think of the rate each minute.",
    "Stroke volume is the blood pumped in…~One beat~One breath~One hour~A stroke here means one heart beat.",
    "Cardiac output equals heart rate times…~Stroke volume~Blood pressure~Lung size~The amount per beat.",
    "With training, stroke volume usually…~Increases~Decreases~Stays at zero~A stronger heart pumps more per beat.",
    "A trained athlete often has a ___ resting heart rate.~Lower~Higher~Impossible to measure~More blood per beat means fewer beats are needed.",
    "During hard exercise, cardiac output…~Goes up~Goes down~Stays zero",
    "Which pair gives cardiac output?~Heart rate × stroke volume~Height × weight~Time ÷ distance",
    "Why does the heart rate rise during exercise?~Muscles need more blood and oxygen~To cool the shoes~Because of the clock"]);
  const t2 = T("Learning a new skill", "🧩", "Learning a skill goes in stages. Knowing the stage helps you practice smartly.",
    "<b>Cognitive stage</b>: you think through every step and make many errors. <b>Associative stage</b>: you practice, errors shrink and you fine-tune. <b>Autonomous stage</b>: the skill is nearly automatic and you can pay attention to the game.",
    "Thinking hard = early. Fine-tuning = middle. Automatic = last.", "A beginner dribbler watches the ball constantly; an expert dribbles while looking up.", [
    "A beginner thinks about each step and makes many errors. This is the ___ stage.~Cognitive~Autonomous~Associative~Think, think, think.",
    "When errors shrink and you fine-tune with practice, you are in the ___ stage.~Associative~Cognitive~Autonomous~Middle stage.",
    "When the skill is nearly automatic, it is the ___ stage.~Autonomous~Cognitive~Associative~'Auto' means by itself.",
    "A player dribbles while scanning the court for teammates. Which stage?~Autonomous~Cognitive~None",
    "A first-time golfer carefully checks each step of the swing. Which stage?~Cognitive~Autonomous~Associative",
    "What helps move from stage to stage?~Quality practice and feedback~Skipping practice~Only watching videos",
    "Why does an expert free up attention?~The skill is automatic~Experts never think~Rules change",
    "Making errors while learning is…~Normal~A sign to quit~Cheating"]);
  const t3 = T("Practice design", "🔁", "How you practice matters as much as how long. Different styles of practice build different strengths.",
    "<b>Blocked practice</b>: repeat one skill again and again. <b>Random practice</b>: mix skills in an unpredictable order. Blocked helps beginners start; random often helps learning last. <b>Part practice</b> breaks a hard skill into pieces. Specific feedback helps most.",
    "Same skill repeating = blocked. Mixed = random.", "Shooting 20 free throws in a row is blocked practice; mixing free throws, layups and passes is random.", [
    "Repeating the same skill many times in a row is…~Blocked practice~Random practice~Rest practice~Think of a block of the same thing.",
    "Mixing different skills in an unpredictable order is…~Random practice~Blocked practice~Part practice",
    "Which type often helps learning last longer once you know the basics?~Random practice~Blocked practice only~No practice~Real games mix skills.",
    "Breaking a hard skill into small pieces is…~Part practice~Blocked practice~Random practice",
    "Which feedback helps most?~Specific and kind, like 'bend your knees more'~'Bad!'~Nothing",
    "A beginner learning to dribble might start with…~Blocked practice~A tournament~Skipping practice",
    "Deliberate practice means…~Focused practice on what you need to improve~Casual play only~Practicing mistakes",
    "A coach saying 'Great hustle, next time follow through' gives…~Specific feedback~No feedback~Random feedback"]);
  const t4 = T("Fueling before and after", "🥣", "What you eat around exercise changes how you feel. Time your fuel.",
    "<b>Before</b>: a meal 2 to 4 hours earlier with carbohydrates and some protein, low in fat. A small carb snack 30 to 60 minutes before. <b>During</b> long events: water and some carbs. <b>After</b>: carbs and protein within about 1 to 2 hours, plus fluids.",
    "Before = carbs for fuel. After = carbs plus protein to refill and repair.", "A banana before a game and chicken with rice after fit the plan.", [
    "Which meal is good 2 to 4 hours before a game?~Pasta with a little chicken~A very greasy burger~Nothing at all~Mostly carbs, some protein, little grease.",
    "A small snack 30 to 60 minutes before exercise could be…~A banana~A large pizza~A big steak",
    "What helps after a hard workout?~Carbs and protein~Only soda~Nothing~Refill and repair.",
    "Why avoid greasy, high-fat food right before exercise?~It digests slowly and may upset your stomach~It gives instant speed~It is illegal",
    "During a long hot event you should…~Drink fluids regularly~Skip drinking~Only drink after",
    "About how soon after exercise should you refuel?~Within 1 to 2 hours~After 2 days~Only the next week",
    "Why are carbs good before exercise?~They are the body's main quick fuel~They build bones only~They cool you",
    "Which food is a good recovery snack?~Yogurt with fruit~Plain sugar~Soda only"]);
  const t5 = T("Dimensions of wellness", "🌈", "Being healthy is more than a strong body. <b>Wellness</b> has several dimensions that work together.",
    "<b>Physical</b>: body and fitness. <b>Emotional</b>: feelings and coping. <b>Social</b>: relationships and teamwork. <b>Intellectual</b>: learning and thinking. <b>Environmental</b>: caring for places around you.",
    "Match the activity to the dimension it helps most.", "Learning the rules of a new sport helps intellectual wellness.", [
    "Doing a run to get fitter mostly helps which dimension?~Physical~Social~Intellectual~It is about the body.",
    "Talking with a trusted friend about a hard day helps which dimension?~Emotional~Physical~Environmental",
    "Joining a team and cheering for others helps which dimension?~Social~Intellectual~Environmental",
    "Learning a new game strategy helps which dimension?~Intellectual~Social~Physical",
    "Picking up litter at a park helps which dimension?~Environmental~Emotional~Intellectual",
    "Deep breathing before a test helps which dimension?~Emotional~Social~Environmental",
    "Which dimension is about caring for places and nature?~Environmental~Physical~Social",
    "Why is wellness described as 'dimensions'?~Many parts work together~Only one matters~It has no parts"]);
  const t6 = T("Your personal fitness plan", "📝", "A good plan has steps you can follow. Anyone can make one.",
    "<b>1</b> Assess where you are. <b>2</b> Set a clear goal. <b>3</b> Plan activities (how often, how hard, how long, what kind). <b>4</b> Do the plan and record it. <b>5</b> Review and adjust.",
    "Test, goal, plan, track, adjust.", "Timing a mile run is a good way to assess before setting a running goal.", [
    "What is the first step in making a fitness plan?~Assess where you are now~Buy new shoes~Set an impossible goal~Know your starting point.",
    "After you assess, you should…~Set a clear goal~Quit~Skip planning",
    "A plan that says how often, how hard, how long, and what kind uses the…~FITT idea~Pizza idea~Reverse idea",
    "Why track your workouts?~To see progress and spot what to change~To show off only~Because tracking is magic",
    "If your plan feels far too easy after weeks, you should…~Adjust it up a bit~Quit~Never change",
    "If a plan is causing pain, you should…~Stop, rest and tell an adult or coach~Push harder~Ignore it",
    "A good goal is…~Clear and doable~Vague~Impossible",
    "Why include rest days in a plan?~Bodies get stronger while recovering~They are wasted time~Coaches forbid exercise"]);
  const t7 = T("Sports statistics", "📈", "Teams and fans use <b>statistics</b> to understand games and players. Numbers reveal patterns.",
    "Per-game average = total ÷ games. <b>Efficiency</b> compares results to tries (like shooting percentage). <b>Assists</b> are passes that lead to scores. <b>Turnovers</b> are lost possessions. Stats help coaches decide what to practice.",
    "Stats tell what happened, not who is a good person or what always happens next.", "A coach who sees many turnovers might add passing drills.", [
    "Total points divided by games played gives…~Points per game~Rebounds~Fouls",
    "A pass that leads straight to a score is a(n)…~Assist~Turnover~Foul~It helps a teammate score.",
    "Losing the ball to the other team is a…~Turnover~Assist~Block",
    "Shooting percentage compares…~Shots made to shots tried~Fouls to minutes~Points to age",
    "Why do coaches use stats?~To find what to practice~To embarrass players~To pick favorites",
    "A player scored 60 points in 5 games. What stat can you find?~Points per game~Age~Weight",
    "A team with many turnovers might practice…~Passing and ball handling~Free throws only~Stretching only",
    "Do stats show everything about a player?~No, they miss effort and teamwork~Yes always~Only when added"]);
  const t8 = T("Emergency action plan", "🚨", "Every field, pool or gym should have an <b>Emergency Action Plan (EAP)</b> so people know what to do fast.",
    "An EAP lists: who is in charge, where the phone is, the address to give, and where to meet the ambulance. In an emergency: <b>check</b> the scene, <b>call</b> emergency services, <b>care</b> until help arrives, and use an AED if trained.",
    "Check, call, care. Stay calm and follow the plan.", "A coach sends one student to unlock the gate and wave the ambulance in.", [
    "What does EAP stand for?~Emergency Action Plan~Easy Activity Plan~Eat A Pizza",
    "In an emergency, what comes first?~Check that the scene is safe~Run away~Take photos~Stay safe first.",
    "Which number do you call for emergencies in the US?~911~411~311~Three digits, all emergency.",
    "What should you tell the emergency operator?~Where you are and what happened~Your favorite sport~Nothing",
    "Why is a plan written down?~Everyone knows what to do quickly~To fill a binder~To scare people",
    "Someone sent to meet the ambulance should…~Show them where the injured person is~Hide~Leave early",
    "An AED is…~A device that can restart a normal heartbeat~A kind of ball~A stretcher",
    "While waiting for help, you should…~Stay with the person and keep them calm~Leave them alone~Move them if they hurt their neck"]);
  const t9 = T("Friction and traction", "👟", "<b>Friction</b> is a force that resists sliding. In sports, we want a lot of it sometimes and very little at other times.",
    "More friction means more grip, or <b>traction</b>: cleats on grass, climbing shoes, chalk on hands. Less friction helps skates and skis glide. Wet or dusty floors have less grip. Air also pushes back, called <b>drag</b>, so cyclists tuck in.",
    "Need grip → more friction. Need glide → less friction.", "Chalk dries sweat so a gymnast's hands grip better.", [
    "Friction is a force that…~Resists sliding~Pushes you up~Makes things lighter~Think about rubbing.",
    "Why do soccer players wear cleats?~For grip on grass~To go faster in the air~To be taller",
    "Why do gymnasts use chalk?~To reduce slipping from sweat~To make hands heavier~To look neat",
    "Which has the least friction?~Ice skate blade on ice~Rubber shoe on dry gym floor~Cleat on grass",
    "A wet gym floor is slippery because…~Water reduces friction~It increases friction~It adds weight",
    "Cyclists tuck low to reduce…~Air drag~Gravity~Weight",
    "Which sport wants less friction for gliding?~Skiing~Rock climbing~Tug of war",
    "Shoe soles with deep grooves are made to…~Increase traction~Reduce traction~Float"]);
  const t10 = T("Fitness for life", "🚶", "Good habits now help your body for the rest of your life. People of all ages can stay active.",
    "Kids and teens need about <b>60 minutes</b> of activity a day. Adults need about <b>150 minutes</b> of moderate activity a week plus muscle-strengthening on 2 days. Balance and strength exercises help older adults prevent falls.",
    "Numbers to remember: 60 a day for kids, 150 a week for adults.", "A 30-minute brisk walk on 5 days adds up to 150 minutes.", [
    "About how many minutes of activity per day do kids and teens need?~60~10~240",
    "About how many minutes of moderate activity per week do adults need?~150~15~500",
    "Adults should do muscle-strengthening on at least how many days a week?~2~0~7",
    "Balance exercises help older adults prevent…~Falls~Hunger~Tall height",
    "Which activity is gentle on joints for lifelong fitness?~Swimming~Jumping off high walls~Heavy contact sports every day",
    "Why do muscles and bones stay stronger when we exercise?~They respond to being used~They don't change~They like rest only",
    "A 30-minute brisk walk 5 days a week gives how many minutes?~150~35~300",
    "Which is a lifetime activity?~Walking or cycling~A one-day event~Waiting for the bus"]);
  const t11 = T("Leave No Trace", "🏕️", "Outdoor sports like hiking and camping depend on clean, healthy places. <b>Leave No Trace</b> guides how to care for them.",
    "Seven ideas: plan ahead; stay on durable surfaces; dispose of waste properly; leave what you find; minimize fire impact; respect wildlife; be considerate of others.",
    "Take only pictures, leave only footprints.", "Packing out your trash after a picnic follows 'dispose of waste properly'.", [
    "What should you do with your trash on a hike?~Pack it out~Bury it~Throw it in the stream~Take it home with you.",
    "Staying on marked trails protects…~Plants and soil~Your shoelaces~Other hikers' hats",
    "You find a cool rock or flower. Leave No Trace says…~Leave it where it is~Take it home~Break it",
    "How should you treat wildlife?~Watch from a distance~Feed them snacks~Chase them",
    "Why plan ahead before a trip?~To be safe and have less impact~To have fewer friends~To pack more trash",
    "Loud noise on a trail is…~Not considerate of others~Always fine~Required",
    "Which is the best campfire choice where allowed?~Use an existing fire ring and keep it small~Build a big fire anywhere~Leave it burning",
    "How many Leave No Trace ideas are there in the list?~Seven~Two~Twenty"]);
  const t12 = T("Interval training", "⏱️", "<b>Interval training</b> mixes harder efforts with easier recovery periods.",
    "You work hard for a short time, then rest or go easy, and repeat. A work-to-rest idea such as 1:2 means rest is twice as long as work. Intervals can build speed and endurance. Beginners should start gently and have a coach.",
    "Hard burst, then recovery. Repeat. Build up slowly.", "Sprint 20 seconds, walk 40 seconds, repeat several times: that's a 1:2 interval.", [
    "Interval training alternates…~Hard efforts with recovery~Only hard efforts~Only rest~Hard, easy, hard, easy.",
    "A 1:2 work-to-rest ratio means rest is…~Twice as long as the work~Half as long~Equal",
    "Sprint for 20 seconds, then walk for 40 seconds. The ratio is…~1:2~2:1~1:1",
    "Which is a benefit of intervals?~They can build speed and endurance~They remove the need for sleep~They always avoid soreness",
    "Beginners doing intervals should…~Start gently and build up~Go all-out immediately~Skip warm-up",
    "Which workout is an interval session?~Run hard for 1 minute, jog 2 minutes, repeat~Walk the whole time at one speed~Stand still",
    "After the hard parts, you should…~Recover with easy movement~Stop breathing~Sprint more",
    "Why is a warm-up needed before intervals?~Hard efforts are risky on cold muscles~To waste time~Warm-ups hurt"]);

  const u1 = N("Cardiac output math", "🫀", "<b>Cardiac output</b> = heart rate × stroke volume. Heart rate is in beats per minute. Stroke volume is the milliliters per beat.",
    "Multiply to get cardiac output in mL per minute. To find stroke volume, divide the output by the heart rate. To find heart rate, divide the output by the stroke volume.",
    "Output = rate × volume per beat. Divide to go backward.", () => {
    const hr = pick([50, 60, 70, 80, 100]), sv = pick([60, 70, 80, 90, 100]), co = hr * sv, name = pick(NAMES), t = ri(1, 2);
    if (t === 1) return { text: `${name}'s heart beats ${hr} times a minute and pumps ${sv} mL each beat. What is the cardiac output in mL per minute?`, visual: "🫀", answer: co,
      hints: ["The heart pumps the same amount every beat.", "Multiply beats per minute by milliliters per beat.", "Example: 60 beats × 80 mL = 4,800 mL a minute. Now do yours."] };
    return { text: `${name}'s cardiac output is ${co} mL per minute at ${hr} beats per minute. What is the stroke volume in mL per beat?`, visual: "🫀", answer: sv,
      hints: ["Think backward from the total.", "Divide the cardiac output by the heart rate.", "Example: 4,800 mL a minute at 60 beats gives 4,800 ÷ 60 = 80 mL. Now do yours."] };
  });
  const u2 = N("Heart rate reserve", "💓", "A better target heart rate uses your <b>resting heart rate</b> too. It is called <b>heart rate reserve</b>.",
    "Reserve = maximum − resting. Target = reserve × intensity percent + resting. This 'Karvonen' method fits each person better.",
    "Subtract, take the percent, then add the resting rate back.", () => {
    const mx = pick([190, 200, 210]), rest = pick([50, 60, 70, 80]), pc = pick([50, 60, 70, 80]), name = pick(NAMES);
    return { text: `${name}'s maximum heart rate is ${mx} and resting heart rate is ${rest}. What is the target heart rate at ${pc}% intensity? (target = (max − rest) × ${pc}% + rest)`, visual: "💓", answer: (mx - rest) * pc / 100 + rest,
      hints: ["There are three steps: subtract, take the percent, add.", "Find the reserve (max − rest), take the percent of it, then add the resting rate.", "Example: max 200, rest 60, 50%: reserve 140, half is 70, plus 60 is 130. Now do yours."] };
  });
  const u3 = N("Speed units", "🚴", "Speeds can be in <b>km per hour</b> or <b>meters per second</b>. Changing units is a common sports skill.",
    "1 km/h = 1000 m ÷ 3600 s ≈ 0.2778 m/s. A handy rule: <b>divide km/h by 3.6</b> to get m/s, and <b>multiply m/s by 3.6</b> to get km/h.",
    "km/h ÷ 3.6 = m/s. m/s × 3.6 = km/h.", () => {
    if (Math.random() < 0.5) { const v = pick([18, 36, 54, 72]); return { text: `A cyclist rides at ${v} kilometers per hour. How many meters per second is that?`, visual: "🚴", answer: v * 5 / 18,
      hints: ["There are 1000 meters in a kilometer and 3600 seconds in an hour.", "Divide the km/h number by 3.6.", "Example: 36 ÷ 3.6 = 10 m/s. Now do yours."] }; }
    const v = pick([5, 10, 15, 20]); return { text: `A sprinter runs at ${v} meters per second. How many kilometers per hour is that?`, visual: "🏃", answer: v * 18 / 5,
      hints: ["Going the other way, the number gets larger.", "Multiply the m/s number by 3.6.", "Example: 10 × 3.6 = 36 km/h. Now do yours."] };
  });
  const u4 = N("Acceleration", "🚀", "<b>Acceleration</b> is how fast speed changes. It is change in speed divided by time.",
    "Acceleration = (final speed − start speed) ÷ time. If a sprinter goes from 0 to 8 m/s in 2 seconds, acceleration is 4 m/s every second (4 m/s²).",
    "Change in speed ÷ time. For final speed: start + (acceleration × time).", () => {
    const a = ri(1, 5), t = ri(2, 6), v1 = ri(0, 4), v2 = v1 + a * t, name = pick(NAMES), q = ri(1, 3);
    if (q === 1) return { text: `${name} speeds up from ${v1} m/s to ${v2} m/s in ${t} seconds. What is the acceleration in m/s²?`, visual: "🚀", answer: a,
      hints: ["First find how much the speed changed.", "Subtract start speed from final speed, then divide by the time.", "Example: 2 to 14 m/s in 4 s gives 12 ÷ 4 = 3 m/s². Now do yours."] };
    if (q === 2) return { text: `${name} starts at ${v1} m/s and accelerates at ${a} m/s² for ${t} seconds. What is the final speed in m/s?`, visual: "🚀", answer: v2,
      hints: ["Acceleration is how much speed is gained each second.", "Multiply acceleration by time, then add the starting speed.", "Example: start 1, 2 m/s² for 3 s gives 6 + 1 = 7 m/s. Now do yours."] };
    return { text: `${name} gains speed at ${a} m/s² from ${v1} m/s up to ${v2} m/s. How many seconds does that take?`, visual: "🚀", answer: t,
      hints: ["Find the total speed gained.", "Divide the gain in speed by the acceleration.", "Example: gain of 12 m/s at 3 m/s² takes 12 ÷ 3 = 4 s. Now do yours."] };
  });
  const u5 = N("Weighted scores", "🏅", "Some scores count more than others. A <b>weighted score</b> multiplies each part by its weight.",
    "Weighted total = (score₁ × weight₁) + (score₂ × weight₂). Weights are percents that add to 100%.",
    "Turn each weight into a decimal, multiply, then add.", () => {
    const w1 = pick([20, 25, 30, 40, 50, 60, 70, 75, 80]), w2 = 100 - w1, s1 = ri(2, 5) * 20, s2 = ri(2, 5) * 20, name = pick(NAMES);
    return { text: `${name}'s PE grade is ${w1}% skills test and ${w2}% participation. ${name} scored ${s1} on skills and ${s2} on participation. What is the weighted grade?`, visual: "🏅", answer: (s1 * w1 + s2 * w2) / 100,
      hints: ["Each score counts according to its weight.", `Find ${w1}% of the skills score and ${w2}% of the participation score, then add them.`, "Example: 60% of 80 plus 40% of 100 is 48 + 40 = 88. Now do yours."] };
  });
  const u6 = N("Counting lineups", "🧮", "Coaches count how many ways they can arrange players. When order matters, multiply the choices.",
    "For choosing a captain then a co-captain from 6 players: 6 choices × 5 choices = 30. To order <b>all</b> n runners, multiply n × (n−1) × … × 1.",
    "Choices shrink by one each time because a person cannot be used twice.", () => {
    const q = ri(1, 3);
    if (q === 1) { const n = ri(4, 8); return { text: `A coach picks a captain and then a co-captain from ${n} players. How many different pairs (captain, co-captain) are possible?`, visual: "🧮", answer: n * (n - 1),
      hints: ["The captain and co-captain are different jobs, so order matters.", "Choices for captain, times the remaining choices for co-captain.", "Example: from 5 players, 5 × 4 = 20. Now do yours."] }; }
    if (q === 2) { const n = pick([3, 4, 5]); return { text: `A relay team has ${n} runners. In how many different orders can they run?`, visual: "🏃", answer: n === 3 ? 6 : n === 4 ? 24 : 120,
      hints: ["The first runner has the most choices.", `Multiply ${n} by every smaller whole number down to 1.`, "Example: 3 runners: 3 × 2 × 1 = 6 orders. Now do yours."] }; }
    const n = ri(5, 7); return { text: `A coach chooses a pitcher, a catcher and a shortstop from ${n} players, each in a different role. How many ways are there?`, visual: "⚾", answer: n * (n - 1) * (n - 2),
      hints: ["Fill the roles one at a time.", "Multiply the choices for each role, which shrink by one each time.", "Example: from 4 players, 4 × 3 × 2 = 24. Now do yours."] };
  });

  Object.assign(PE_LEVELS, {
    16: [
      L("Energy systems", p1), L("Heart chambers", p2), L("Seasons of training", p3), L("Plyometrics and power", p4), L("Sleep and the teen brain", p5),
      L("Cricket basics", p6), L("Rip currents and beach safety", p7), L("Choreography words", p8), L("Spectators and sidelines", p9), L("Bike check and gears", p10),
      L("Carbs, protein and fat", p11), L("Joint movements", p12), L("Body direction words", p13), L("Calories from macros", q1), L("Batting average", q2),
      L("Areas of fields", q3), L("Gear sales and tax", q4), L("At least inequalities", q5),
      L("Mixed practice", MIX(p1, p2, p11, q1, q3, q5)), L("Level 16 Challenge", MIX(p3, p4, p5, p6, p7, p8, p9, p10, p12, p13, q2, q4))
    ],
    17: [
      L("Muscle contraction types", r1), L("VO2 max and exercise intensity", r2), L("Energy balance", r3_), L("Smart choices under pressure", r4), L("Zone and man-to-man defense", r5),
      L("Archery and target safety", r6), L("Flexibility and range of motion", r7), L("Overuse injuries", r8), L("Minor first aid", r9), L("Title IX and fair access", r10),
      L("Center of gravity and stability", r11), L("Soccer formations", r12), L("Net energy", s1), L("Mean from a frequency table", s2), L("Proportional speed", s3),
      L("Two chances in a row", s4), L("Diagonals of fields", s5), L("Comparing gym plans", s6),
      L("Mixed practice", MIX(r1, r3_, r12, s1, s3, s5)), L("Level 17 Challenge", MIX(r2, r4, r5, r6, r7, r8, r9, r10, r11, s2, s4, s6))
    ],
    18: [
      L("Cardiac output", t1), L("Learning a new skill", t2), L("Practice design", t3), L("Fueling before and after", t4), L("Dimensions of wellness", t5),
      L("Your personal fitness plan", t6), L("Sports statistics", t7), L("Emergency action plan", t8), L("Friction and traction", t9), L("Fitness for life", t10),
      L("Leave No Trace", t11), L("Interval training", t12), L("Cardiac output math", u1), L("Heart rate reserve", u2), L("Speed units", u3),
      L("Acceleration", u4), L("Weighted scores", u5), L("Counting lineups", u6),
      L("Mixed practice", MIX(t1, t3, t12, u1, u3, u4)), L("Level 18 Challenge", MIX(t2, t4, t5, t6, t7, t8, t9, t10, t11, u2, u5, u6))
    ]
  });
})();
