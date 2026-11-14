// ext/pe-22-24.js  PE levels 22-24 (grade 10 second half, grade 11 both halves)
(() => {
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

  // ================= LEVEL 22 =================
  const a1 = T("Newton's laws in sport", "🍎", "Sir Isaac Newton described how forces change motion. His three laws explain every kick, throw and sprint.",
    "<b>First law (inertia):</b> things stay still or keep moving the same way unless a force acts. <b>Second law:</b> force = mass × acceleration, so the same push speeds up a light object more. <b>Third law:</b> forces come in equal and opposite pairs.",
    "Ask: is it about staying the same, about force and mass, or about a pair of forces?", "A swimmer pushes the wall one way and glides the other way, because the wall pushes back.", [
    "A soccer ball sits still until someone kicks it. Which law says it stays at rest unless a force acts?~Newton's first law~Newton's second law~Newton's third law~It is also called the law of inertia.",
    "A swimmer pushes backward on the wall and shoots forward. Which law explains this?~Newton's third law~Newton's first law~Newton's second law~Look for the one about forces in pairs.",
    "Force = mass × acceleration is which law?~Newton's second law~Newton's first law~Newton's third law~It is the law with a formula in it.",
    "The same kick is given to a light ball and a heavy ball. Which one speeds up more?~The light ball~The heavy ball~Both speed up the same~Acceleration = force ÷ mass, so think about what a bigger mass does.",
    "A bike stops suddenly and the rider lurches forward. Which idea explains it?~Inertia~Friction pulling them forward~The bike pushing them~The body tends to keep the motion it already has.",
    "A bat hits a ball. The ball pushes back on the bat with a force that is…~Equal in size and opposite in direction~Zero~Bigger than the force from the bat~Action and reaction forces match in size.",
    "Two sleds are pushed with the same force. One is empty and one is full of people. Which accelerates less?~The full sled~The empty sled~They accelerate the same~More mass means a harder job for the same force.",
    "A runner keeps gliding forward after letting go of a rope until friction slows them. This shows…~Inertia~Newton's third law only~That force makes speed constant~Moving things tend to keep moving."]);
  const a2 = T("Electrolytes and sweat", "🧂", "Sweat is not just water. It also carries away <b>electrolytes</b>, minerals your nerves and muscles need.",
    "The main electrolytes are <b>sodium</b>, <b>potassium</b>, <b>calcium</b> and <b>magnesium</b>. Water is enough for short, easy activity. For long, hot, hard sessions, replacing salts helps. Sweat cools you because it <b>evaporates</b> and carries heat away.",
    "Short and easy: water. Long, hot and hard: water plus electrolytes.", "After a two-hour tournament in the heat, a salty snack and a drink replace what the sweat took.", [
    "What are electrolytes?~Minerals that carry small electrical charges~Types of muscle fiber~Vitamins that burn fat~They are things like potassium and calcium dissolved in body fluids.",
    "Which electrolyte is lost in the largest amount in sweat?~Sodium~Iron~Vitamin C~Table salt is made mostly of it.",
    "When is a drink with electrolytes most useful?~During a long, hard session in the heat~Before a 10-minute walk~While sleeping~Think about when you lose a lot of sweat.",
    "How does sweat cool the body?~By evaporating and taking heat away~By freezing on the skin~By adding heat~Cooling happens when a liquid turns into a gas.",
    "Which food is a good source of potassium?~Banana~White sugar~Plain ice~Many fruits and potatoes contain it.",
    "Dark yellow urine most likely means…~You need more fluids~You are very well hydrated~Your muscles are growing~A pale straw color is the goal.",
    "Drinking huge amounts of plain water over many hours can dilute the blood's salt. This is called…~Hyponatremia~Hypertrophy~Hypothermia~The word means low blood sodium.",
    "Muscle cramps in a long hot game can be linked to…~Fluid and electrolyte loss~Eating vegetables~Too much sleep~Sweat carries away more than water."]);
  const a3 = T("Handball", "🤾", "<b>Team handball</b> is a fast indoor sport. Two teams pass the ball by hand and throw it into the other team's goal.",
    "Each team has <b>7 players</b> on the court, one of them the goalkeeper. You may take <b>3 steps</b> holding the ball and keep it for <b>3 seconds</b>, or you can dribble. Only the goalkeeper may stand in the <b>6-meter goal area</b>. A foul in a scoring chance gives a <b>7-meter throw</b>.",
    "Think: hands only, no entering the goal area, and short holding limits.", "Pass fast, move without the ball, and shoot from outside the goal area line by jumping over it.", [
    "How many players per team are on the court in handball, counting the goalkeeper?~7~5~11~It is six court players plus someone in goal, so add them.",
    "How far from the goal is the goal-area line?~6 meters~3 meters~10 meters~It is more than a few steps but much less than the court length.",
    "How many steps may a player take while holding the ball without dribbling?~3~1~6~The same number limits how many seconds you can hold the ball.",
    "What is the penalty shot in handball called?~A 7-meter throw~A free kick~A corner~Its name includes how far away the shooter stands.",
    "Who may stand in and touch the ball inside the goal area?~The goalkeeper~Any defender~Nobody at all~Only one special player is allowed.",
    "In handball the ball is mainly played with…~The hands~The feet~A stick~The name of the sport gives it away.",
    "How long is each half in a senior handball match?~30 minutes~45 minutes~20 minutes~There are two halves and the whole game is an hour.",
    "A defender grabs the shooter's arm. This is…~A foul~Good defense~Allowed in the last minute~Holding a shooter is not part of fair play."]);
  const a4 = T("Projectile motion", "🏹", "A <b>projectile</b> is anything thrown or launched, like a javelin or basketball. Once released, only gravity (and air) acts on it.",
    "Gravity pulls it down at the same rate whatever its sideways speed. A faster release goes farther. On level ground, about <b>45°</b> gives the longest range if air is ignored. Releasing from a higher point gives it more time in the air.",
    "Sideways motion and falling motion happen at the same time and do not affect each other.", "A shot put thrown at 40° from shoulder height lands farther than the same throw from the ground.", [
    "Which force pulls a thrown ball down on its way?~Gravity~Friction with the ground~Magnetism~It is the same force that makes things fall.",
    "At the very top of its arc, a ball's upward speed is…~Zero for a moment~At its greatest~Doubled~It stops going up before it starts coming down.",
    "On level ground with no air, which launch angle gives the longest range?~About 45 degrees~90 degrees~10 degrees~It is neither very flat nor very steep.",
    "A ball is thrown straight up (90 degrees). Where does it land?~Close to where it was thrown~Very far away~It never comes back~It has no sideways speed.",
    "One ball is dropped and another is thrown sideways from the same height at the same moment. Which lands first (no air)?~They land together~The dropped one~The sideways one~Sideways speed does not change how fast gravity pulls down.",
    "What is a projectile?~An object moving through the air under gravity~An object resting on the ground~A machine that throws~Think of a javelin after it leaves the hand.",
    "A faster release speed makes the ball go…~Farther~Shorter~The same distance~More speed means more distance covered before landing.",
    "A higher release point gives the ball…~More time in the air~Less time in the air~No change at all~It has farther to fall."]);
  const a5 = T("Principles of training", "📈", "Good training follows a few rules so the body adapts safely.",
    "<b>Overload:</b> work a little harder than usual. <b>Progression:</b> increase the load gradually, often by about 10 percent a week. <b>Specificity:</b> train what the sport needs. <b>Reversibility:</b> fitness fades if you stop. <b>Individuality:</b> bodies respond differently. <b>Diminishing returns:</b> gains slow down as you get fitter.",
    "Match the situation to the one-word principle.", "A runner adds a few minutes each week. That is progression, and the extra work is overload.", [
    "What does overload mean?~Working a bit harder than usual so the body adapts~Doing the same workout every day~Resting completely~It is the push that makes the body change.",
    "Specificity means training should match…~The demands of your sport or goal~Every sport equally~Nothing in particular~A swimmer's best practice looks like swimming.",
    "A teen stops training for two months and fitness drops. Which principle?~Reversibility~Overload~Specificity~Use it or lose it.",
    "A common safe guideline is to raise weekly running volume by about…~10 percent~50 percent~100 percent~It is a small step, not a leap.",
    "Two teens follow the same plan but improve by different amounts. Which principle?~Individuality~Reversibility~Overload~It is about each person being unique.",
    "Fitness gains come fast for a beginner, then slow down. This is called…~Diminishing returns~Reversibility~Overload~The rewards for each extra hour shrink.",
    "Which does NOT apply overload?~Repeating the same easy workout forever~Adding a little weight~Running slightly longer~Overload needs a new challenge.",
    "A marathon runner trains only by lifting heavy weights. Which principle is being ignored?~Specificity~Reversibility~Individuality~The training does not match the event."]);
  const a6 = T("Core stability and Pilates", "🧘", "Your <b>core</b> is the group of muscles around your trunk. It keeps your spine steady while your arms and legs move.",
    "The core includes the abdominal muscles, the deep <b>transversus abdominis</b> that wraps around the trunk like a belt, back muscles, hips and the pelvic floor. <b>Pilates</b> trains the core with slow, controlled moves and steady breathing. In a good plank the body is in a straight line.",
    "A strong core passes force between legs and arms and protects the spine.", "In a plank, squeeze the stomach, keep the hips level and breathe steadily.", [
    "The core includes muscles of the…~Abdomen, back, hips and pelvis~Only the six-pack~Only the arms~It is the middle of the body, all the way around.",
    "Which deep muscle wraps around the trunk like a belt?~Transversus abdominis~Biceps~Deltoid~Its name says it runs across the abdomen.",
    "Plank holds mainly train…~Core endurance~Hand speed~Ankle flexibility~You hold still for as long as you can.",
    "Pilates focuses on controlled movements, breathing and…~Core strength~Maximum weight lifting~Running speed~It is not about big heavy lifts.",
    "A strong core helps by…~Passing force between legs and arms and protecting the spine~Making you taller~Replacing sleep~Think about the link between upper and lower body.",
    "Which exercise targets the core?~Bird-dog~Calf raise~Wrist curl~You lift opposite arm and leg while keeping the trunk steady.",
    "In a good plank the body forms…~A straight line from head to heels~A tall hill with hips up~A sag with hips low~Both a high or a low hip puts stress on the back.",
    "During core exercises you should…~Breathe steadily~Hold your breath the whole time~Breathe only in~Holding the breath raises pressure and makes you tense."]);
  const a7 = T("Cold-weather safety", "🥶", "Exercising outside in winter is fun if you stay warm and dry. In very cold conditions the body can lose heat faster than it makes it.",
    "<b>Hypothermia</b> is a dangerously low body temperature, below about <b>35°C (95°F)</b>. Early signs are shivering, numb fingers and clumsiness. <b>Frostbite</b> is freezing of skin and tissue, often on toes, fingers, nose and ears. Dress in <b>layers</b>: a base layer, a warm middle layer and a windproof shell.",
    "Stay dry, cover skin, layer up, and come inside if you cannot stop shivering.", "On a windy winter run, wear a base layer that moves sweat away and a shell that blocks the wind.", [
    "Hypothermia is when body temperature falls…~Dangerously low, below about 35°C~Slightly to 37°C~To exactly normal~Normal is about 37°C and this is lower than that.",
    "Which clothing plan works best for cold weather?~Several thin layers~One thick cotton shirt~Shorts and a T-shirt~You can add or remove them as you heat up.",
    "Why is wet cotton a poor choice in the cold?~It stays wet and pulls heat from the body~It is too bright~It is too light~Water carries heat away faster than air.",
    "You feel shivering, numb fingers and confusion outdoors. What should you do?~Get warm and dry and tell an adult~Keep exercising harder~Take a cold shower~Rewarm the body safely.",
    "Frostbite is…~Freezing of skin and tissue~A broken bone~A pulled muscle~Fingers, toes, ears and noses are most at risk.",
    "Wind chill means…~Wind makes it feel colder than the thermometer says~The temperature really falls~The air is humid~Moving air takes heat from the skin.",
    "Which layer should touch your skin in winter exercise?~A base layer that moves sweat away~The windproof shell~A scarf only~It sits closest to the body.",
    "Before a winter run you should…~Warm up indoors and dress in removable layers~Skip the warm-up~Wear one tight jacket~Warm muscles work better in the cold."]);
  const a8 = T("Wearables and data", "⌚", "Fitness watches and trackers collect data on steps, heart rate and sleep. They can help, but only if you read the data wisely.",
    "A step counter uses an <b>accelerometer</b>. Heart rate sensors shine light on the skin to see blood flow. <b>GPS</b> tracks location and pace. Numbers are <b>estimates</b>. Look at <b>trends</b> over weeks. Hide your home location when sharing routes, and never share maps that show where you live.",
    "Use data as a guide, not a judge, and keep your privacy.", "A resting heart rate that is higher than usual for several days can be a sign you need more rest.", [
    "A step counter uses a sensor called an…~Accelerometer~Thermometer~Barometer~It measures how your movement speeds up and slows down.",
    "Wrist heart-rate sensors mostly work by…~Shining light on the skin to see blood flow~Listening to sound waves~Using magnets~They look at the color changes as blood pulses.",
    "A limit of wrist trackers is that…~Their numbers are estimates and can be off~They are always perfectly exact~They never need charging~Think about intense, jerky movement.",
    "A watch's GPS measures…~Location, distance and pace~Heart chamber size~Muscle fiber type~It tracks where you move.",
    "Which privacy tip is best when sharing a run on a map?~Hide the start and end near your home~Post your exact home address~Share it with everyone~Do not show where you live.",
    "Data from a tracker is most useful when you…~Look at trends over weeks~Check it once a year~Ignore it completely~A single day can be misleading.",
    "A resting heart rate that stays above your normal for several days may mean…~You are tired or fighting illness and need rest~Your legs are stronger~Nothing at all~Your body may be asking for recovery.",
    "The 10,000-steps-a-day goal is…~A popular target, not a magic number~A medical law~Required by schools~Any regular movement counts."]);
  const a9 = T("Ergonomics and posture", "🪑", "<b>Ergonomics</b> means fitting your space and gear to your body so you can work and play without strain.",
    "Sit with feet flat and back supported, and put the top of the screen near eye level about an arm's length away. Stand up and move every 30 minutes. Carry a backpack on <b>both shoulders</b>, at no more than about 10 to 15 percent of your body weight. Long periods of sitting with little movement are called <b>sedentary behavior</b>.",
    "Support the back, level the screen, and break up sitting.", "A tablet on a stand at eye level is kinder to the neck than holding it in your lap.", [
    "Ergonomics is about…~Fitting tasks and equipment to the body~A type of sport~A food group~It is design for comfort and safety.",
    "Where should the top of a computer screen be?~Near eye level~Below your lap~Above your head~It should not make you bend or stretch your neck.",
    "How often should you break up long sitting?~About every 30 minutes~Once a day~Never~Frequent short breaks are best.",
    "How should you carry a school backpack?~On both shoulders at a light weight~On one shoulder, very heavy~Hanging from the hand~Spread the load evenly.",
    "Looking down at a phone for long periods strains the…~Neck and upper back~Knees~Elbows only~Your head tilts forward.",
    "The 20-20-20 rule is for…~Resting your eyes~Building muscle~Fixing your backpack~Think about screens and tired eyes.",
    "Sedentary behavior means…~Long periods of sitting with little movement~Hard exercise~Playing sports~It is the opposite of being active.",
    "A good sitting position has…~Feet flat and the back supported~Legs tucked under and back curved~Slouching forward~Think of both feet on the floor."]);
  const a10 = T("Fitness tests", "📋", "Fitness tests give numbers for different parts of fitness so you can set goals and see progress.",
    "<b>12-minute Cooper run:</b> aerobic fitness. <b>Beep (shuttle) test:</b> aerobic fitness. <b>Sit-and-reach:</b> flexibility. <b>Push-ups:</b> upper-body muscular endurance. <b>Standing long jump:</b> leg power. <b>Plank hold:</b> core endurance. <b>Handgrip test:</b> grip strength. Retest every 6 to 8 weeks to see change.",
    "Match the test to the fitness part it measures.", "A student does push-ups for one minute. The count shows muscular endurance.", [
    "The Cooper test measures how far you can run in 12 minutes. It tests…~Aerobic fitness~Flexibility~Grip strength~It is about how long you can keep going.",
    "The sit-and-reach test measures…~Flexibility of the hamstrings and lower back~Leg power~Speed~You reach toward your toes.",
    "A standing long jump mainly tests…~Leg power~Flexibility~Core endurance~You push off and cover as much distance as possible in one burst.",
    "The beep test is a shuttle run that measures…~Aerobic fitness~Flexibility~Grip strength~The beeps get faster until you cannot keep up.",
    "A handgrip dynamometer measures…~Grip strength~Balance~Lung size~It is squeezed by the hand.",
    "A plank hold test shows…~Core endurance~Running speed~Aerobic fitness~It is about how long the middle of the body can stay steady.",
    "Why retest every 6 to 8 weeks?~To see progress~To compare with adults~To win a prize~Training takes some weeks to show.",
    "A one-minute push-up count shows…~Upper-body muscular endurance~Flexibility~Balance~It is the number of repeated efforts."]);
  const a11 = T("Heat illness", "🌡️", "Hot weather can make exercise unsafe. Heat illness comes in three stages.",
    "<b>Heat cramps:</b> painful muscle spasms. <b>Heat exhaustion:</b> heavy sweating, weakness, dizziness and nausea. Move to a cool place and sip fluids. <b>Heat stroke:</b> body temperature above 40°C (104°F), confusion or fainting. This is an <b>emergency</b>: call for help and cool the person right away. High humidity makes it riskier. Get used to heat slowly over 1 to 2 weeks.",
    "Know the signs, rest early and never ignore confusion.", "If a teammate is dizzy and pale, stop play, move to shade and sip cool water.", [
    "Which is the most serious type of heat illness?~Heat stroke~Heat cramps~Sweating~It is the stage that comes after exhaustion.",
    "Heavy sweating, weakness, dizziness and nausea are signs of…~Heat exhaustion~Frostbite~A broken bone~Move to a cool place.",
    "Which condition makes heat illness MORE likely?~High humidity~A cool dry breeze~Shade~Sweat cannot evaporate well in damp air.",
    "A player is confused and very hot after a game. What should you do?~Call emergency help and cool them down~Make them run more~Give a big meal~It could be heat stroke.",
    "How long does it take to get used to exercising in heat?~About 1 to 2 weeks~One hour~Never~The body adapts over days.",
    "Heat cramps are…~Painful muscle spasms~A fever from germs~A broken tendon~They often come with heavy sweating.",
    "Heat stroke happens when body temperature goes above about…~40°C (104°F)~37°C (98.6°F)~35°C (95°F)~It is far above normal.",
    "A good response to heat exhaustion is to…~Rest in a cool place and sip fluids~Keep playing~Wear extra layers~Cool the body and rehydrate."]);
  const a12 = T("Fair play and integrity", "🤝", "Sport only works when everyone plays by the rules. <b>Integrity</b> means being honest even when nobody is watching.",
    "<b>Fair play</b> means following the rules, respecting opponents and officials, and being honest. Some sports, like ultimate, have no referee and rely on the <b>Spirit of the Game</b>. Fake injuries, time-wasting and hiding fouls are <b>unsporting</b>. Honest losers shake hands.",
    "Ask: would I be proud if everyone saw exactly what I did?", "If your foot touched the line and nobody saw, a fair player says so.", [
    "Fair play means…~Following the rules and respecting others~Winning no matter what~Only playing friends~It is about how you play, not only who wins.",
    "Ultimate frisbee players call their own fouls. This idea is called…~Spirit of the Game~Zero tolerance~Penalty box~It is a trust-based tradition.",
    "Pretending to be hurt to waste time is…~Unsporting~Smart tactics~Required~It is dishonest.",
    "You notice the referee missed that the ball went out off your hand. A fair player…~Admits it honestly~Hides it~Blames a teammate~Honesty counts.",
    "Integrity means…~Being honest even when nobody is watching~Being the strongest~Being the loudest~It is about your values, not the score.",
    "After losing a close match, good sportsmanship is…~Congratulating the winners~Blaming the officials~Leaving without a word~Respect the other team's effort.",
    "A good way to question a referee's call is to…~Stay calm and let the captain ask~Shout loudly~Ignore the rules~Respect and manners help.",
    "A 'win at all costs' mindset can lead to…~Cheating and burnout~More friends~Better teamwork~Putting the result above everything is risky."]);

  const b1 = N("Stride and cadence", "👟", "Running speed comes from two things: how long each step is (<b>stride length</b>) and how many steps you take each second (<b>cadence</b>).",
    "<b>Speed = stride length × steps per second.</b> Distance covered = speed × time.",
    "Multiply stride by steps per second to get meters per second.", () => {
    const s = ri(1, 2), c = ri(3, 5), t = pick([5, 10, 20]), r = ri(1, 3);
    if (r === 1) return { text: `A runner's stride is ${s} m and they take ${c} steps every second. What is their speed in m/s?`, visual: "👟", answer: s * c,
      hints: ["Speed depends on how long each step is and how fast you step.", "Multiply stride length by steps per second.", "Example: stride 2 m, 2 steps per second: 2 × 2 = 4 m/s. Now do yours."] };
    if (r === 2) return { text: `A runner's stride is ${s} m with ${c} steps per second. How far do they run in ${t} seconds?`, visual: "🏃", answer: s * c * t,
      hints: ["Find the speed first, then use time.", "Speed = stride × steps per second, then multiply by the seconds.", "Example: stride 1 m, 3 steps per second, 4 seconds: speed 3 m/s, 3 × 4 = 12 m. Now do yours."] };
    return { text: `A runner moves at ${s * c} m/s with a stride of ${s} m. How many steps per second is that?`, visual: "👟", answer: c,
      hints: ["Speed is stride times steps per second, so work backwards.", "Divide the speed by the stride length.", "Example: speed 8 m/s, stride 2 m: 8 ÷ 2 = 4 steps per second. Now do yours."] };
  });
  const b2 = N("Training load", "📅", "Coaches measure how hard a session was with <b>RPE</b>, the rating of perceived exertion, from 1 (very easy) to 10 (maximum).",
    "<b>Session load = RPE × minutes.</b> Add the loads of all sessions to get the week's load.",
    "Multiply, then add the sessions up.", () => {
    const r1 = ri(3, 8), m1 = pick([20, 30, 40, 45, 60]), r2 = ri(2, 7), m2 = pick([20, 30, 40, 60]);
    const k = ri(1, 3);
    if (k === 1) return { text: `A practice was rated RPE ${r1} and lasted ${m1} minutes. What is the session load (RPE × minutes)?`, visual: "📅", answer: r1 * m1,
      hints: ["Load combines how hard and how long.", "Multiply the rating by the minutes.", "Example: RPE 5 for 30 minutes: 5 × 30 = 150. Now do yours."] };
    if (k === 2) return { text: `Monday was RPE ${r1} for ${m1} minutes. Wednesday was RPE ${r2} for ${m2} minutes. What is the total load for the two sessions?`, visual: "📅", answer: r1 * m1 + r2 * m2,
      hints: ["Find each session's load first.", "Multiply RPE by minutes for each session, then add them.", "Example: 4 × 20 = 80 and 6 × 30 = 180, so the total is 260. Now do yours."] };
    return { text: `A session lasted ${m1} minutes and had a load of ${r1 * m1}. What was the RPE?`, visual: "📅", answer: r1,
      hints: ["Load = RPE × minutes, so work backwards.", "Divide the load by the minutes.", "Example: load 240 over 40 minutes: 240 ÷ 40 = RPE 6. Now do yours."] };
  });
  const b3 = N("Sweat rate", "💧", "Athletes can find out how much they sweat by weighing themselves before and after exercise.",
    "Fluid lost in kg equals about liters (1 kg ≈ 1 L). <b>Sweat loss = weight lost + fluid drunk.</b> <b>Sweat rate = sweat loss ÷ hours.</b>",
    "Add what you drank back in, then divide by the hours.", () => {
    const r = ri(1, 2), h = ri(1, 3), tot = r * h, l = ri(1, tot), d = tot - l, w = ri(45, 70);
    const kind = ri(1, 2);
    if (kind === 1) return { text: `A player weighs ${w} kg before a ${h}-hour practice and ${w - l} kg after. She drank ${d} L of water. What was her sweat loss in liters? (1 kg ≈ 1 L)`, visual: "💧", answer: tot,
      hints: ["Some of the loss was replaced by drinking.", "Weight lost plus the fluid she drank equals sweat loss.", "Example: lost 2 kg and drank 1 L: 2 + 1 = 3 L. Now do yours."] };
    return { text: `A player weighs ${w} kg before a ${h}-hour practice and ${w - l} kg after. She drank ${d} L of water. What was her sweat rate in liters per hour?`, visual: "💧", answer: r,
      hints: ["First find the total sweat loss, then use the hours.", "Total loss = weight lost + fluid drunk, then divide by hours.", "Example: lost 3 kg, drank 1 L, 2 hours: 4 ÷ 2 = 2 L per hour. Now do yours."] };
  });
  const b4 = N("Levers and mechanical advantage", "🔧", "A lever turns around a pivot. <b>Mechanical advantage</b> tells how much a lever multiplies your effort.",
    "<b>Mechanical advantage = effort arm ÷ load arm.</b> The effort needed = load ÷ mechanical advantage. The arm is the distance from the pivot.",
    "Long effort arm, short load arm: less effort is needed.", () => {
    const la = ri(1, 3), ma = ri(2, 5), ea = la * ma, load = ma * pick([5, 10, 15, 20]);
    if (ri(1, 2) === 1) return { text: `A lever has an effort arm of ${ea} units and a load arm of ${la} unit${la === 1 ? "" : "s"}. What is its mechanical advantage?`, visual: "🔧", answer: ma,
      hints: ["Compare the two arms.", "Divide the effort arm by the load arm.", "Example: effort arm 6, load arm 2: 6 ÷ 2 = 3. Now do yours."] };
    return { text: `A lever has a mechanical advantage of ${ma}. How much effort (in N) lifts a ${load} N load?`, visual: "🔧", answer: load / ma,
      hints: ["A larger advantage means less effort.", "Divide the load by the mechanical advantage.", "Example: advantage 4, load 80 N: 80 ÷ 4 = 20 N. Now do yours."] };
  });
  const b5 = N("Percent change in performance", "📊", "Percent change shows how much a result grew compared with where you started.",
    "<b>Percent change = change ÷ starting value × 100.</b> A new value after a percent increase = start + (start × percent ÷ 100).",
    "Always compare to the starting value.", () => {
    const base = pick([20, 40, 60, 80, 100, 200]), p = pick([10, 20, 25, 50]), ch = base * p / 100;
    if (ri(1, 2) === 1) return { text: `A student did ${base} sit-ups and later did ${base + ch}. By what percent did it increase?`, visual: "📊", answer: p,
      hints: ["Find the change, then compare it to the start.", "Divide the change by the starting value and multiply by 100.", "Example: 40 up to 50 is a change of 10. 10 ÷ 40 = 0.25, which is 25 percent. Now do yours."] };
    return { text: `A runner's weekly distance was ${base} km and rose by ${p} percent. What is the new weekly distance in km?`, visual: "📊", answer: base + ch,
      hints: ["First find how much the distance rose.", `Find ${p} percent of the start, then add it to the start.`, "Example: 80 km up 25 percent: 25 percent of 80 is 20, so 100 km. Now do yours."] };
  });
  const b6 = N("Median and range", "📏", "Sports data is easier to read with two simple numbers: the middle score (<b>median</b>) and the spread (<b>range</b>).",
    "<b>Median:</b> put the numbers in order and pick the middle one. <b>Range = highest − lowest.</b>",
    "Sort first. The median is the middle, the range uses the ends.", () => {
    const n = pick([5, 7]); let a;
    do { a = []; for (let i = 0; i < n; i++) a.push(ri(5, 40)); } while (new Set(a).size < n);
    const s = [...a].sort((x, y) => x - y);
    if (ri(1, 2) === 1) return { text: `Sprint times for ${n} runs (seconds): ${a.join(", ")}. What is the median?`, visual: "📏", answer: s[(n - 1) / 2],
      hints: ["Put the numbers in order first.", "The median is the middle number once they are in order.", "Example: 9, 3, 7, 5, 1 in order is 1, 3, 5, 7, 9. The middle is 5. Now do yours."] };
    return { text: `Jump heights for ${n} tries (cm): ${a.join(", ")}. What is the range?`, visual: "📏", answer: s[n - 1] - s[0],
      hints: ["The range shows how spread out the numbers are.", "Subtract the lowest from the highest.", "Example: 12, 20, 15: 20 − 12 = 8. Now do yours."] };
  });

  // ================= LEVEL 23 =================
  const c1 = T("Heart rate zones", "❤️", "Coaches split effort into <b>heart rate zones</b>, based on a percent of your maximum heart rate.",
    "A quick estimate of max heart rate is <b>220 minus your age</b>. <b>Zone 1:</b> 50 to 60 percent, very light. <b>Zone 2:</b> 60 to 70 percent, easy, you can chat. <b>Zone 3:</b> 70 to 80 percent, steady. <b>Zone 4:</b> 80 to 90 percent, hard. <b>Zone 5:</b> 90 to 100 percent, all-out sprints.",
    "Higher zone means harder effort and shorter time you can last.", "If you can talk in full sentences but not sing, you are probably in the easy-to-steady zones.", [
    "Which zone is a very light warm-up effort (50 to 60 percent)?~Zone 1~Zone 3~Zone 5~It is the lowest zone.",
    "Which zone is an all-out sprint effort (90 to 100 percent)?~Zone 5~Zone 2~Zone 3~It is the top zone.",
    "In which zone can you hold a full conversation easily while exercising?~Zone 2~Zone 5~Zone 4~It is an easy effort, above a warm-up.",
    "A quick estimate of maximum heart rate is…~220 minus your age~100 plus your age~Your age times two~It gets lower as you get older.",
    "Zone 4 covers about what percent of max heart rate?~80 to 90 percent~50 to 60 percent~60 to 70 percent~It is a hard effort, just under the top zone.",
    "As you move from Zone 1 to Zone 5, you can keep going for…~Less time~More time~The same time~Harder effort tires you faster.",
    "Which zone is best for long, easy base-building runs?~Zones 1 and 2~Zone 5~Maximum effort only~Think of a pace you could keep for an hour.",
    "A heart rate monitor is useful for training zones because it shows…~How hard your body is working~How tall you are~How much you slept~Your heart works harder with more effort."]);
  const c2 = T("Flow and arousal", "🌊", "Your best performances happen when your mind is switched on just enough. Too little and you drift, too much and you panic.",
    "<b>Arousal</b> is how alert and energized you feel. Performance is usually best at a medium level, like an upside-down U. <b>Flow</b> is a state of full focus when the challenge matches your skill. A challenge much harder than your skill brings <b>anxiety</b>. One much easier brings <b>boredom</b>.",
    "Aim for a challenge a little above your skill.", "A tennis player uses slow breathing to calm down when nerves are too high.", [
    "Flow is a state when you feel…~Fully focused and absorbed~Bored and sleepy~Frozen with worry~Time seems to disappear.",
    "A task far harder than your skill usually brings…~Anxiety~Flow~Boredom~You feel overwhelmed.",
    "A task far easier than your skill usually brings…~Boredom~Flow~Anxiety~There is no challenge to hold your attention.",
    "For most tasks, performance is best at…~A medium level of arousal~Zero arousal~Maximum arousal~Think of an upside-down U.",
    "Which tool lowers arousal when you are too nervous?~Slow deep breathing~Jumping up and down faster~Shouting~Calm the body to calm the mind.",
    "Which can raise arousal when you feel flat before a game?~Upbeat music and a quick energetic warm-up~Lying down~Skipping the warm-up~Wake the body up.",
    "To reach flow in practice, set a challenge that is…~A little above your current skill~Impossible~Too easy~Stretch, but do not break.",
    "Arousal means…~How alert and energized you feel~How tall you are~How many points you scored~It is about your level of activation."]);
  const c3 = T("Sprint phases", "⚡", "A 100 m sprint has clear parts, and each part has its own technique.",
    "<b>Start:</b> react to the gun and push from the blocks. <b>Drive (acceleration) phase:</b> low body angle, powerful pushes, first 20 to 30 m. <b>Maximum velocity:</b> tall posture, high knees, relaxed face. <b>Speed endurance:</b> keep form as fatigue builds near the end.",
    "Low and powerful at first, then tall and quick.", "A sprinter stays low for the first few steps, then slowly rises to a tall running posture.", [
    "At the start of a sprint, the body angle in the first steps should be…~Low and leaning forward~Fully upright~Leaning backward~You are pushing hard to speed up.",
    "The first 20 to 30 meters of a sprint is called the…~Drive (acceleration) phase~Cool-down~Maximum velocity phase~Speed is still building.",
    "During maximum velocity, a sprinter's posture is…~Tall with high knees~Hunched low~Sitting back~Top speed needs an efficient upright stride.",
    "Near the end of a 100 m race, sprinters mainly try to…~Keep their form as they get tired~Stop pushing~Change their technique completely~Speed endurance.",
    "A runner sprints with the arms moving…~Quickly front-to-back~Side to side across the chest~Hanging still~Arms balance the legs.",
    "The reaction time in a sprint start is measured from…~The gun to the first push on the blocks~The finish line to the cool-down~Warm-up to start~It is how fast you respond to the signal.",
    "Which cue helps during the drive phase?~Push the ground away behind you~Reach your foot far in front~Stand up straight~Think of a powerful push.",
    "A sprinter should keep the face and shoulders…~Relaxed~Tight~Raised to the ears~Tension slows you down."]);
  const c4 = T("Muscle soreness (DOMS)", "😖", "After new or hard exercise your muscles can ache a day or two later. This is called <b>DOMS</b>, delayed onset muscle soreness.",
    "DOMS usually peaks <b>24 to 72 hours</b> after unfamiliar exercise, especially movements where the muscle lengthens under load (<b>eccentric</b> actions, like lowering a weight or running downhill). Gentle movement, sleep and food help. DOMS fades as you adapt. <b>Sharp pain, swelling or joint pain</b> is different and may be an injury.",
    "Dull, even soreness in muscles is normal. Sharp or joint pain is a warning.", "After a first downhill hike, the thigh muscles feel sore for two days, then recover.", [
    "DOMS stands for…~Delayed onset muscle soreness~Daily overload muscle stretch~Direct overuse muscle strain~The soreness arrives after a delay.",
    "DOMS usually peaks about…~24 to 72 hours after exercise~Within 5 minutes~After 2 weeks~It takes a day or two.",
    "Which type of movement most often causes DOMS?~Eccentric, when the muscle lengthens under load~A long rest~Slow breathing~Think of lowering a weight slowly.",
    "What helps with DOMS?~Gentle movement, sleep and good food~Doing a maximum lift~Ignoring sleep~Stay light and let the body repair.",
    "Which feeling is a warning sign rather than normal DOMS?~Sharp joint pain~Dull even muscle soreness~Mild tiredness~Pain in a joint is different from sore muscles.",
    "Why does DOMS fade with repeated training?~The body adapts to the movement~The muscle disappears~Gravity changes~Practice makes muscles more resistant.",
    "Running downhill for the first time often causes soreness in the…~Thigh muscles~Eyes~Teeth~The quads work while lengthening.",
    "A new exercise leaves you stiff two days later. This is most likely…~Normal DOMS~A broken bone~Heat stroke~It is a delayed ache in the muscles."]);
  const c5 = T("Spin and the Magnus effect", "🎾", "A spinning ball in the air curves because spin changes the air pressure on its sides. This is the <b>Magnus effect</b>.",
    "The ball is pushed toward the side where the air is moving more slowly relative to the ball. <b>Topspin</b> pushes the ball down so it dips faster. <b>Backspin</b> gives lift so it floats longer. <b>Sidespin</b> curves the ball left or right, like a curveball or a bending free kick.",
    "Spin shapes the path: top dips, back floats, side curves.", "A tennis player hits topspin so a fast shot still drops inside the baseline.", [
    "Topspin on a tennis ball makes it…~Dip down sooner~Float longer~Stop in mid-air~The ball is pushed downward.",
    "Backspin on a golf ball makes it…~Stay up longer with extra lift~Drop quickly~Curve sideways~It gives upward force.",
    "A soccer free kick that bends around the wall uses…~Sidespin~No spin~Only a high kick~Spin around an up-and-down axis.",
    "The Magnus effect is caused by…~Spin changing air pressure on the sides of the ball~Magnets~The ground~The air moves differently on each side.",
    "A ball with no spin tends to fly…~Along a smoother, more predictable path~In a spiral~Straight up~Without spin there is no sideways push.",
    "Why do tennis players use topspin on hard shots?~It helps the ball dip into the court~It makes the ball heavier~It stops the ball from bouncing~The ball drops sooner.",
    "A baseball curveball breaks because of…~Spin~A magnet inside~Wind from the ground~The ball is pushed sideways by air pressure.",
    "In which direction does backspin push a ball?~Up~Down~Straight back toward the thrower~It acts against gravity."]);
  const c6 = T("Fitness myths", "🕵️", "Not everything you hear about exercise is true. Good thinkers test claims against evidence.",
    "<b>Spot reduction</b> is a myth: you cannot burn fat from just one body part by exercising it. <b>No pain, no gain</b> is false: sharp pain means stop. Muscle and fat weigh the same per kilogram, but muscle takes up less space. Lifting weights does not make teens 'bulky' overnight. Short bouts of activity add up.",
    "Ask: what evidence supports this claim?", "A thousand crunches do not remove belly fat, but regular activity and healthy eating change body composition overall.", [
    "Can doing crunches burn fat only from the stomach?~No, fat loss happens across the whole body~Yes, exactly there~Only with a belt~Spot reduction is a myth.",
    "'No pain, no gain' is…~A myth, since sharp pain is a warning~Always true~A law~Hard effort is fine, but pain means a problem.",
    "Which is true about 1 kg of muscle and 1 kg of fat?~They weigh the same, but muscle takes less space~Muscle is heavier~Fat is lighter~The same mass is the same mass.",
    "Do short 10-minute bouts of activity count?~Yes, they add up through the day~No, only an hour counts~Only at night~Every minute adds up.",
    "Sweating a lot means you are very fit.~False: sweat is mostly about heat and body temperature~True~True only for girls~Sweating cools the body in many situations.",
    "Does stretching before a run prevent all injuries?~No, a dynamic warm-up helps but nothing prevents all injuries~Yes, completely~Never helps~Be careful with words like all and never.",
    "Does lifting weights as a teen stunt your growth when taught well?~No, it is safe with good form and supervision~Yes, always~Only on Mondays~Good technique matters most.",
    "Which claim should you trust most?~One backed by many well-designed studies~A friend's post~An ad with a famous face~Evidence beats opinion."]);
  const c7 = T("Exercise through life", "🧓", "Staying active helps at every age. Your body changes, but movement keeps it working well.",
    "Most <b>bone mass</b> is built in the teen years and twenties, so activity now protects your skeleton for life. Maximum heart rate slowly <b>falls with age</b>. Older adults benefit from <b>strength</b> and <b>balance</b> training, which lowers the chance of falls. Regular activity lowers the risk of heart disease and type 2 diabetes at any age.",
    "It is never too early or too late to start moving.", "A grandparent doing gentle strength and balance work keeps their muscles and independence.", [
    "When is most bone mass built up?~Teen years and twenties~After age 70~At age 5 only~Weight-bearing activity helps then.",
    "Max heart rate generally…~Falls slowly with age~Rises with age~Stays the same forever~The old estimate is 220 minus age.",
    "Which training helps older adults avoid falls?~Balance and strength~Only sleeping~Only sitting~Muscles and balance keep you steady.",
    "Regular activity lowers the risk of…~Heart disease~Growing taller~Getting hiccups~It helps keep the heart strong.",
    "For older adults, a safe start to exercise is…~Gentle activity that slowly increases~Maximum effort on day one~Nothing, they should rest~Build up gradually.",
    "Weight-bearing activity such as walking and jumping helps…~Bones~Hair~Eyesight~Bones respond to load.",
    "Is it too late to start exercising at 60?~No, benefits come at any age~Yes~Only at 20~Muscles can still adapt.",
    "Muscle strength without training tends to…~Slowly decline with age~Increase with age~Stay constant~Use it or lose it."]);
  const c8 = T("Compass bearings", "🧭", "In orienteering and hiking, a <b>bearing</b> is a direction measured in degrees clockwise from north.",
    "North is <b>0°</b> (also 360°), east is <b>90°</b>, south is <b>180°</b>, west is <b>270°</b>. Northeast is 45°. A <b>back bearing</b> points the opposite way: add or subtract 180°. The compass needle points to <b>magnetic north</b>.",
    "Turn the dial, line up the needle, then follow the arrow.", "Walking on a bearing of 90° means heading due east. The way back is 270°.", [
    "What bearing is due east?~90°~0°~270°~A quarter turn clockwise from north.",
    "What bearing is due south?~180°~90°~270°~Half a turn from north.",
    "What bearing is due west?~270°~90°~180°~Three quarters of a turn from north.",
    "Which direction is a bearing of 45°?~Northeast~Southwest~Northwest~Halfway between north and east.",
    "The back bearing of 90° is…~270°~0°~180°~Turn around by 180°.",
    "The needle of a compass points to…~Magnetic north~The nearest tree~The sun~Earth's magnetic field pulls it.",
    "Bearings are measured…~Clockwise from north~Counter-clockwise from east~From the sun~North is the starting line.",
    "A bearing of 0° means heading…~North~South~East~The starting direction on the dial."]);
  const c9 = T("Adaptive sport and inclusion", "♿", "Sport is for everyone. <b>Adaptive sport</b> changes rules, equipment or spaces so that people with different bodies can play.",
    "The <b>Paralympic Games</b> follow the Olympic Games in the same host city. Athletes are placed in <b>classes</b> so competition is fair. <b>Wheelchair basketball</b> uses a regular-height hoop. In <b>goalball</b>, players wear eyeshades and listen for a ball with bells. <b>Boccia</b> is a precision ball sport. <b>Inclusion</b> means everyone gets a real chance to take part.",
    "Change the game, not the person.", "A school can make a game inclusive with a lighter ball, bigger goals or wider space.", [
    "Adaptive sport means…~Changing rules or equipment so more people can play~Only for professionals~A new fitness test~Make sport open to everyone.",
    "The Paralympic Games are…~For athletes with disabilities, held after the Olympics~A school day~A cooking contest~They have the same host city.",
    "In goalball, players listen for the ball because it has…~Bells inside~Bright lights~A whistle~It helps players who cannot see.",
    "Why do Paralympic athletes compete in classes?~So competition is fair between similar abilities~To keep fans quiet~To save money~Groups are matched.",
    "A wheelchair basketball hoop is…~The same height as in standard basketball~Half the height~Twice the height~The rule is the same as other basketball.",
    "Inclusion means…~Everyone gets a real chance to take part~Only the best take part~Rules never change~It is about welcome.",
    "Which change helps make a class game more inclusive?~A lighter ball and bigger goals~Taking out the ball~Banning the game~Adjust equipment.",
    "Boccia is a game of…~Precision, rolling or throwing balls close to a target~Speed running~Contact tackling~It is similar to bowling skill."]);
  const c10 = T("Judging research claims", "🔬", "Headlines say things like 'Study shows…'. Before trusting one, check how the study was done.",
    "Bigger <b>sample sizes</b> are more reliable than very small ones. A <b>control group</b> gives a comparison. <b>Random assignment</b> makes groups fair. <b>Blinding</b> keeps people from guessing which group they are in, and a <b>placebo</b> is a fake treatment used for comparison. <b>Peer review</b> means other experts check the work. Be careful when the sponsor sells a product.",
    "Ask: how many people, compared with what, and who paid?", "A study of 8 people by a supplement company is weaker than a study of 2,000 people reviewed by independent experts.", [
    "Which study is more reliable?~One with 2,000 people~One with 3 people~One with 1 person~Bigger samples reduce luck.",
    "A control group is…~A comparison group that does not get the treatment~The winners~The coaches~It shows what happens without the change.",
    "A placebo is…~A fake treatment used for comparison~A new medicine~A sports drink~It looks real but does nothing.",
    "Random assignment helps make sure…~The groups are fair and similar~Everyone wins~The study is short~Chance, not choice, decides who goes where.",
    "Peer review means…~Other experts check the study before it is published~Friends vote~The sponsor reads it~Independent checking.",
    "A study paid for by the company that sells the product should be…~Read with extra care~Trusted without question~Ignored forever~Ask about bias.",
    "One person saying 'it worked for me' is called an…~Anecdote~Experiment~Control~It is a story, not strong evidence.",
    "Blinding means participants…~Do not know which group they are in~Wear blindfolds~Cannot see results~It prevents expectations from changing results."]);
  const c11 = T("Thermoregulation", "🌡️", "Your body keeps its core temperature near <b>37°C (98.6°F)</b> using a control center in the brain called the <b>hypothalamus</b>.",
    "When you get too warm, blood vessels near the skin widen (<b>vasodilation</b>) so heat escapes, and you <b>sweat</b>. When you get cold, skin vessels narrow, and you <b>shiver</b> to make heat. Humid air slows evaporation, so you cool less well. Exercise can raise core temperature by several degrees.",
    "The brain senses temperature and adjusts sweating, blood flow and shivering.", "On a humid day sweat drips off instead of evaporating, so cooling is poor.", [
    "What part of the brain controls body temperature?~The hypothalamus~The ear~The heart~It works like a thermostat.",
    "Normal core temperature is about…~37°C (98.6°F)~30°C~45°C~Close to the number in a healthy fever check.",
    "When you overheat, blood vessels near the skin…~Widen~Narrow~Close completely~This lets heat escape.",
    "Shivering helps because it…~Makes heat from muscle activity~Cools the skin~Stops sweating~The muscles work rapidly.",
    "Why does humid air make exercise feel harder?~Sweat evaporates more slowly~There is more oxygen~It is windy~Cooling depends on evaporation.",
    "Sweat cools you when it…~Evaporates~Freezes~Runs off~A liquid changing to gas takes energy.",
    "In cold weather skin blood vessels…~Narrow to keep heat inside~Widen~Disappear~Save the heat in the core.",
    "During hard exercise your core temperature…~Rises~Falls to 30°C~Stays frozen~Muscles produce lots of heat."]);
  const c12 = T("Triathlon and multisport", "🏊", "A <b>triathlon</b> joins three sports in one race: swim, bike, then run. The change between them is called a <b>transition</b>.",
    "The order is <b>swim, bike, run</b>, with <b>T1</b> (swim to bike) and <b>T2</b> (bike to run). An Olympic-distance race is a <b>1.5 km</b> swim, <b>40 km</b> bike and <b>10 km</b> run. A sprint race is roughly <b>750 m, 20 km and 5 km</b>. A <b>brick workout</b> is a bike ride followed straight away by a run to train the transition. Riders must wear a helmet.",
    "Pace yourself in the swim so you have energy for the bike and run.", "In T1 you take off swim gear, put on your helmet and shoes and head out on the bike.", [
    "What is the order of a triathlon?~Swim, bike, run~Run, swim, bike~Bike, swim, run~It starts in the water.",
    "What is T1 in a triathlon?~The change from swim to bike~The change from bike to run~The start gun~The first transition.",
    "What is T2 in a triathlon?~The change from bike to run~The change from swim to bike~The finish line~The second transition.",
    "In an Olympic-distance triathlon, the run is…~10 km~42 km~1.5 km~It is shorter than a marathon.",
    "In an Olympic-distance triathlon, the bike is…~40 km~10 km~1.5 km~It is the longest part.",
    "A brick workout is…~Bike followed immediately by a run~Lifting a brick~Swim only~It trains the legs for the switch.",
    "What must riders wear on the bike in a triathlon?~A helmet~Flippers~Goggles~It protects the head.",
    "What do triathletes often wear in cold open water?~A wetsuit~A winter coat~Boots~It keeps swimmers warm and floating."]);

  const d1 = N("Heart rate zone targets", "❤️", "You can find a training zone in beats per minute (bpm) from your estimated maximum heart rate.",
    "<b>Max heart rate ≈ 220 − age.</b> Target = max × percent ÷ 100.",
    "Find max first, then take the percent.", () => {
    let age, p, mx;
    do { age = pick([10, 15, 16, 18, 20, 25, 30, 40, 50]); p = pick([50, 60, 70, 80, 90]); mx = 220 - age; } while ((mx * p) % 100 !== 0);
    if (ri(1, 2) === 1) return { text: `A ${age}-year-old uses 220 − age as max heart rate. What is their maximum heart rate in bpm?`, visual: "❤️", answer: mx,
      hints: ["The estimate takes age away from a fixed number.", "Subtract the age from 220.", "Example: age 12: 220 − 12 = 208 bpm. Now do yours."] };
    return { text: `A ${age}-year-old has a maximum heart rate of ${mx} bpm (220 − age). What is ${p} percent of that in bpm?`, visual: "❤️", answer: mx * p / 100,
      hints: ["Take a percent of the maximum.", `Multiply the maximum by ${p} and divide by 100.`, "Example: max 200, 60 percent: 200 × 60 ÷ 100 = 120 bpm. Now do yours."] };
  });
  const d2 = N("Bearings and turns", "🧭", "Bearings are angles from 0° to 360°. When you turn or go back, you add or subtract degrees.",
    "A <b>back bearing</b> is the original bearing ±180° (add 180° if the bearing is under 180°, otherwise subtract). A <b>turn right</b> adds degrees, a <b>turn left</b> subtracts. A bearing is always kept between 0° and 360°.",
    "Add for right, subtract for left, and keep the answer between 0 and 360.", () => {
    if (ri(1, 2) === 1) { const b = pick([30, 45, 60, 90, 120, 150, 210, 240, 270, 300, 330]); return { text: `You walk on a bearing of ${b}°. What is the back bearing to return to the start?`, visual: "🧭", answer: b < 180 ? b + 180 : b - 180,
      hints: ["The way back points the opposite direction.", "The opposite direction is half a turn, which is 180 degrees away.", "Example: bearing 100° has a back bearing of 280°. Now do yours."] }; }
    const b = pick([30, 60, 90, 120, 150]), t = pick([30, 45, 60, 90]);
    return { text: `You face a bearing of ${b}° and turn right by ${t}°. What bearing are you facing now?`, visual: "🧭", answer: b + t,
      hints: ["Turning right moves clockwise.", "Clockwise adds degrees to the bearing.", "Example: facing 40° and turn right 20° gives 60°. Now do yours."] };
  });
  const d3 = N("Triathlon timing", "⏱️", "A triathlon's finish time is the sum of five parts: swim, T1, bike, T2 and run.",
    "<b>Total = swim + T1 + bike + T2 + run.</b> To find one missing part, subtract the others from the total.",
    "Add all five parts, or take the known ones away from the total.", () => {
    const sw = ri(8, 20), t1 = ri(1, 3), bk = ri(20, 40), t2 = ri(1, 3), rn = ri(15, 30), tot = sw + t1 + bk + t2 + rn;
    if (ri(1, 2) === 1) return { text: `A kids' triathlon: swim ${sw} min, T1 ${t1} min, bike ${bk} min, T2 ${t2} min, run ${rn} min. What is the total time in minutes?`, visual: "🏊", answer: tot,
      hints: ["Add every part of the race.", "There are five numbers to add together.", "Example: 10 + 2 + 30 + 1 + 20 = 63 minutes. Now do yours."] };
    return { text: `A triathlete finished in ${tot} minutes. Swim ${sw}, T1 ${t1}, bike ${bk}, T2 ${t2}. How many minutes was the run?`, visual: "🏃", answer: rn,
      hints: ["Add up the parts you know, then compare with the total.", "Total minus the other four parts leaves the run.", "Example: total 60, other parts add up to 45, so the missing part is 15 minutes. Now do yours."] };
  });
  const d4 = N("Cycling time", "🚴", "Speed, distance and time are linked: <b>time = distance ÷ speed</b>.",
    "Speed in km/h and distance in km give time in hours. Multiply hours by 60 for minutes.",
    "Divide, then multiply by 60 to get minutes.", () => {
    let sp, dist, mins;
    do { sp = pick([10, 12, 15, 20, 24, 30]); dist = ri(5, 40); mins = dist * 60 / sp; } while (mins !== Math.floor(mins));
    if (ri(1, 2) === 1) return { text: `A cyclist rides ${dist} km at ${sp} km/h. How many minutes does it take?`, visual: "🚴", answer: mins,
      hints: ["Time is distance divided by speed, in hours.", "Change the hours into minutes by multiplying by 60.", "Example: 10 km at 20 km/h is 0.5 hours, which is 30 minutes. Now do yours."] };
    const h = pick([1, 2, 3]);
    return { text: `A cyclist rides at ${sp} km/h for ${h} hour${h === 1 ? "" : "s"}. How far do they go in km?`, visual: "🚴", answer: sp * h,
      hints: ["Distance is speed times time.", "Multiply the speed by the hours.", "Example: 15 km/h for 2 hours is 30 km. Now do yours."] };
  });
  const d5 = N("Weekly activity minutes", "🗓️", "Health guidelines suggest teens get about <b>60 minutes</b> of moderate to vigorous activity <b>every day</b>, which is <b>420 minutes</b> a week.",
    "Add up your minutes. To see what is missing, subtract your total from the goal.",
    "Add the days, then compare with 420.", () => {
    const d = []; for (let i = 0; i < 5; i++) d.push(pick([30, 40, 45, 50, 60, 70]));
    const sum = d.reduce((a, b) => a + b, 0);
    if (ri(1, 2) === 1) return { text: `Over five days a student was active for ${d.join(", ")} minutes. How many minutes is that in total?`, visual: "🗓️", answer: sum,
      hints: ["Add the minutes from each day.", "Add them one by one to keep track.", "Example: 30 + 40 + 50 = 120 minutes. Now do yours."] };
    return { text: `A student has been active for ${sum} minutes this week. The weekly goal is 420 minutes. How many more minutes are needed?`, visual: "🗓️", answer: 420 - sum,
      hints: ["How far is the student from the goal?", "Subtract the minutes done from 420.", "Example: goal 100, done 60, so 40 more. Now do yours."] };
  });
  const d6 = N("Weekly build-up", "🌱", "Many coaches increase training by about 10 to 20 percent a week. The gains stack up week by week.",
    "Each week's amount = last week's amount + the percent of last week's amount.",
    "Find the percent of the week before, then add it.", () => {
    const [b, p] = pick([[100, 10], [200, 10], [50, 20], [100, 20], [200, 20], [100, 50]]);
    const w2 = b + b * p / 100, w3 = w2 + w2 * p / 100;
    if (ri(1, 2) === 1) return { text: `A runner does ${b} minutes in week 1 and adds ${p} percent each week. How many minutes is week 2?`, visual: "🌱", answer: w2,
      hints: ["Find the extra amount first.", `Take ${p} percent of the week 1 minutes, then add it on.`, "Example: 80 minutes with 25 percent more: 20 extra, so 100 minutes. Now do yours."] };
    return { text: `A runner does ${b} minutes in week 1 and adds ${p} percent each week. How many minutes is week 3?`, visual: "🌱", answer: w3,
      hints: ["Week 3 grows from week 2, not week 1.", `Find week 2 first, then add ${p} percent of week 2.`, "Example: 40 minutes with 50 percent more each week: week 2 is 60, week 3 is 90. Now do yours."] };
  });

  // ================= LEVEL 24 =================
  const e1 = T("Needs assessment", "📝", "Before you plan activity for someone else, you first find out what they need. This is a <b>needs assessment</b>.",
    "Ask about their <b>goals</b>, current activity, health history, <b>time</b> and equipment, what they enjoy, and barriers like cost or transport. Then choose a plan that fits. Re-check after a few weeks. A plan built for a different person may not work for this one.",
    "Listen first, plan second.", "A new group wants to get fit but only has 20 minutes after school, so the plan uses short, equipment-free sessions.", [
    "What is the first step when planning activity for a friend or client?~Find out their goals and needs~Hand them your own plan~Pick the hardest workout~Planning starts with listening.",
    "Which question is part of a needs assessment?~How much time do you have each week?~What is your favorite color?~How tall is your teacher?~Think about what changes the plan.",
    "A client says they have a sore knee. You should…~Ask about it and adapt the plan or refer them to a health professional~Ignore it~Make them run more~Safety first.",
    "A barrier to activity could be…~Cost, time or transport~Fresh air~A good park~Something that stops people from taking part.",
    "Why re-check progress after a few weeks?~To adjust the plan as the person changes~To make the plan longer for no reason~To compare with strangers~People improve and needs change.",
    "A good plan for a busy beginner is…~Short, simple sessions they enjoy~A two-hour daily workout~Only extreme workouts~It must fit their life.",
    "Why ask what activities someone enjoys?~People stick with what they enjoy~To choose the most expensive option~It does not matter~Enjoyment keeps habits going.",
    "A plan copied from a pro athlete may fail for a beginner because…~Their needs, level and time are different~Pros are always wrong~Beginners cannot move~Everyone starts from a different place."]);
  const e2 = T("Health screening (PAR-Q)", "✅", "Before starting a new exercise program, people can answer a short <b>health screening</b> questionnaire such as the <b>PAR-Q</b>.",
    "PAR-Q means <b>Physical Activity Readiness Questionnaire</b>. It asks about chest pain, dizziness, bone or joint problems, and medicines. If any answer is <b>yes</b>, talk to a doctor before starting. It does not replace a doctor.",
    "Yes to any question means check with a doctor first.", "A student answers yes to 'Do you feel dizzy or faint when you exercise?' and is told to see a doctor first.", [
    "PAR-Q stands for…~Physical Activity Readiness Questionnaire~Personal Action Rating Quiz~Power And Resistance Quotient~It checks if you are ready.",
    "What is the main purpose of a PAR-Q?~To spot health risks before exercise~To rank athletes~To count steps~It is a safety check.",
    "A person answers yes to a PAR-Q question about chest pain during exercise. What next?~Talk to a doctor before starting~Start a hard program anyway~Skip the form~A professional should decide.",
    "Which question might be on a PAR-Q?~Do you feel dizzy when you exercise?~What is your favorite song?~Do you like pizza?~It asks about symptoms and conditions.",
    "A PAR-Q replaces visiting a doctor.~False~True~Only on weekends~It is a first check, not a diagnosis.",
    "Which medicine information matters on a PAR-Q?~Medicines for the heart or blood pressure~The brand of your shoes~Your lunch~Some medicines affect exercise.",
    "When is screening most useful?~Before starting a new program~After you finish a race~Never~It helps with planning ahead.",
    "If all answers are no, you can…~Usually start slowly and build up~Do the hardest workout right away~Never exercise~Start gently and progress."]);
  const e3 = T("Duty of care", "🛡️", "Coaches, teachers and organizers have a <b>duty of care</b>: a responsibility to keep participants reasonably safe.",
    "That means checking equipment and space, giving clear instructions and warnings, matching activities to ability, supervising properly, having an <b>emergency plan</b>, and recording injuries in an <b>incident report</b>. <b>Negligence</b> means failing to take reasonable care and causing harm.",
    "Think: prevent, supervise, respond, record.", "Before a game, the coach checks for puddles on the floor and removes broken equipment.", [
    "A duty of care is…~A responsibility to keep others reasonably safe~A type of exercise~A prize~It is a duty owed to participants.",
    "Which action shows duty of care?~Checking equipment before use~Letting anyone use broken gear~Ignoring weather~Preventing hazards.",
    "Negligence means…~Failing to take reasonable care and causing harm~Being too careful~Winning a game~Being careless in a way that hurts someone.",
    "What should a coach do after an injury?~Help, call for assistance if needed, and write an incident report~Hide it~Blame the player~Record what happened.",
    "Why have an emergency action plan?~So everyone knows what to do if something goes wrong~To make practice longer~For decoration~Think about being ready.",
    "Matching an activity to ability helps…~Prevent injuries~Make games longer~Reduce fun~Too hard too soon is risky.",
    "Supervising children means…~Keeping watch and being able to step in~Leaving the area~Playing with your phone~Be present and attentive.",
    "Warning players about known risks is…~Part of duty of care~Never needed~A form of cheating~Safe practice includes clear information."]);
  const e4 = T("Tournament formats", "🏆", "Organizers choose a format that fits the time, courts and number of teams.",
    "<b>Single elimination:</b> lose once and you are out, the quickest format. <b>Double elimination:</b> you must lose twice to go out. <b>Round robin:</b> every team plays every other team, the fairest but longest. A <b>bye</b> is a free pass to the next round when teams do not fill the bracket. <b>Seeding</b> places the strongest teams so they meet later.",
    "Quick means elimination. Fair and full means round robin.", "A school with one afternoon and 8 teams chooses single elimination to finish on time.", [
    "In a single-elimination tournament, a team that loses…~Is out~Plays again~Gets a bye~One loss ends the run.",
    "Which format has every team play every other team?~Round robin~Single elimination~Bracket seeding~It is the most complete schedule.",
    "Which format is the quickest for many teams?~Single elimination~Round robin~Double round robin~Fewer games are played.",
    "In double elimination a team is out after…~Two losses~One loss~Three wins~It gets a second chance.",
    "A bye means…~A free pass to the next round~A lost game~A tie~You do not have to play that round.",
    "Seeding is used to…~Keep the strongest teams from meeting early~Hide the scores~Remove teams~The best are spread out.",
    "Which format is the fairest because everyone plays everyone?~Round robin~Single elimination~Coin toss~You get a full picture of strength.",
    "A school has little time and many teams. The best choice is…~Single elimination~Round robin~Double round robin~Time is short."]);
  const e5 = T("Teaching progressions", "🧗", "Teaching a skill well means breaking it into steps and building up slowly. These steps are a <b>progression</b>.",
    "Good steps: <b>demonstrate</b>, explain with a few key cues, let learners <b>practice</b>, give <b>specific, positive feedback</b>, then make it harder. Move from <b>easy to hard</b>, slow to fast, and still to moving. Use the <b>whole-part-whole</b> method: show the whole skill, practice parts, then put it back together.",
    "Show, say, try, fix, then challenge.", "A coach teaches a layup: first the footwork without a ball, then with the ball, then with a defender.", [
    "What is a progression in teaching?~Steps from easy to harder~Teaching everything at once~A final test~Build skills in order.",
    "Whole-part-whole teaching means…~Show the whole skill, practice parts, then put it together~Practice only the ending~Skip the whole~Start and end with the full picture.",
    "Which feedback is most helpful?~Specific and positive, like 'Great arm swing, now extend your follow-through'~'Wrong'~'Not good'~Say what worked and what to change.",
    "Why give only a few cues at a time?~Learners can only focus on a few things~Cues are expensive~Silence is best~Too many instructions confuse.",
    "A good first step to teach a new throw is…~Practice the movement slowly without a ball~Play a full game immediately~Throw as hard as you can~Start simple.",
    "What should a coach do after learners master a step?~Make it a bit harder~Stop practicing~Repeat the same step forever~Add a challenge.",
    "Demonstrating a skill helps because…~Learners see how it looks~It saves time~It replaces practice~Many people learn by watching.",
    "Practicing a skill while moving, with a defender, comes…~Later in the progression~First~Never~Add pressure after the basics."]);
  const e6 = T("Returning after injury", "🩹", "After an injury the body needs time. Jumping back in too fast is one of the main causes of re-injury.",
    "A safe return is <b>graded</b>: first <b>medical clearance</b>, then pain-free everyday movement, light activity, sport-specific drills, non-contact practice, and last full contact. Each step should be free of pain. If symptoms return, <b>step back</b>. Never play through sharp pain.",
    "Small safe steps, pain-free, with a go-ahead from a professional.", "After a sprained ankle, an athlete moves from walking to jogging to cutting drills to full practice over several weeks.", [
    "What is a graded return to sport?~Slowly adding activity step by step~Going back to full play at once~Skipping rehab~Increase in stages.",
    "What comes first before returning after a serious injury?~Medical clearance~A hard game~A big meal~A professional should approve.",
    "If pain comes back during a step, you should…~Step back to the previous level~Push harder~Ignore it~Back off and rest.",
    "Which usually comes LAST in a return plan?~Full-contact competition~Walking~Light drills~It carries the most risk.",
    "Why does returning too fast cause problems?~The tissue is not ready, so re-injury is more likely~It makes you slower~It improves recovery~Healing takes time.",
    "Which is a sign you can move to the next stage?~No pain during the current stage~Pain at rest~Swelling~Everything feels normal.",
    "A good early step in rehab is…~Gentle pain-free movement~Heavy lifting~Sprinting~Start easy.",
    "Playing through sharp pain is…~Unsafe~A sign of toughness~Required~Pain is a signal to stop."]);
  const e7 = T("Activity and long-term health", "🫀", "Regular physical activity helps prevent many long-term health problems, called <b>chronic diseases</b>.",
    "Activity lowers the risk of <b>heart disease</b>, <b>high blood pressure</b>, <b>type 2 diabetes</b> (muscles take up sugar better), some cancers, and weak bones (<b>osteoporosis</b>). It also supports mental health. Inactivity, poor food and smoking raise risk. Healthy habits built in the teen years last.",
    "Small daily habits add up to big long-term protection.", "A teen who walks and plays sports daily builds strong bones and a healthy heart for later life.", [
    "A chronic disease is one that…~Lasts a long time~Goes away in a day~Is only a cold~Think long term.",
    "Regular activity helps lower the risk of…~Heart disease~Becoming taller by magic~Getting hiccups~It is about the heart and blood vessels.",
    "Weight-bearing activity helps prevent…~Weak bones (osteoporosis)~Colds~Sunburn~Bones get stronger with load.",
    "Type 2 diabetes is linked to…~How the body handles sugar in the blood~Broken bones~Eyesight only~Exercise helps muscles use sugar.",
    "Which habit raises long-term health risk?~Being inactive for years~Daily walks~Eating vegetables~Moving less is a risk.",
    "Exercise also benefits…~Mood and mental health~Only muscles~Nothing else~The brain too.",
    "Why start healthy habits as a teen?~They tend to last into adulthood~They stop growth~They are only for pros~Early habits stick.",
    "High blood pressure can be helped by…~Regular aerobic activity~Never moving~Skipping sleep~Moving the heart gently strengthens it."]);
  const e8 = T("Exercising safely with health conditions", "🌬️", "Many people with health conditions can enjoy sport with some planning. They should follow the advice of their doctor.",
    "People with <b>asthma</b> should warm up well, carry their reliever inhaler as prescribed, tell the coach and avoid known triggers. People with <b>diabetes</b> follow their care plan, check blood sugar and keep a quick snack available. Coaches should know the condition and the emergency plan, and keep information private.",
    "Plan ahead, know the emergency steps, and respect privacy.", "Before a long hike, a student with asthma packs the inhaler and tells the leader where it is.", [
    "Why should a player with asthma carry their inhaler?~To use it if breathing becomes difficult as prescribed~For decoration~To give to friends~It is their reliever.",
    "A good habit for someone with asthma is to…~Warm up gradually~Skip the warm-up~Ignore symptoms~Gradual warm-ups help the airways.",
    "A person with diabetes should keep nearby…~A quick snack for low blood sugar~A heavy backpack~Nothing~Sport can lower sugar.",
    "Who should a coach tell about an important medical plan?~Only people who need to know to keep the athlete safe~Everyone on social media~Strangers~Keep personal information private.",
    "A player with a health condition should follow…~Their doctor's advice~Rumors~Whatever is popular~Experts know the plan.",
    "A coach should know…~The emergency steps for the group~Nothing~Only the scores~Be prepared.",
    "Which is a trigger that can make asthma worse?~Cold dry air or heavy pollen~A warm shower~Reading~Some conditions bring on symptoms.",
    "Having a health condition means…~You can often still be active with a good plan~You can never play~You must hide it~Many athletes manage conditions."]);
  const e9 = T("Performance analysis", "🎥", "Coaches use data and video to see what really happens in a game, not just what it felt like.",
    "<b>Key performance indicators (KPIs)</b> are the numbers that matter, like pass completion or shots on target. A <b>tally chart</b> counts events. <b>Video</b> in slow motion shows technique. Compare with a model performance and with your past results. Always ask permission before filming, and share videos only with people who should see them.",
    "Pick a few measures, collect them fairly, and use them to improve.", "A team counts turnovers in every quarter to find when they tire.", [
    "A KPI is…~A key number that shows how well something is going~A type of kick~A fitness test~It is a key performance indicator.",
    "A tally chart is used to…~Count how often events happen~Draw a picture~Measure height~Mark one stroke for each event.",
    "Why watch video in slow motion?~To study technique details~To skip warm-ups~To hide mistakes~Fast actions are easier to see slowed down.",
    "Before filming players you should…~Ask permission~Keep it secret~Post it publicly~Respect privacy.",
    "Comparing your serve to a model video helps you see…~What to change~Nothing~The weather~A model shows a target.",
    "Why track a few KPIs instead of fifty?~It keeps the focus clear~Computers cannot count~Fifty is illegal~Too many numbers confuse.",
    "Which is a good KPI for a soccer midfielder?~Pass completion rate~Hair length~Water bottle color~It is related to the job.",
    "Data from several games is better than from one because…~It shows a pattern, not luck~It is shorter~One game is a rule~Trends are reliable."]);
  const e10 = T("Youth sport and burnout", "🔥", "Sport should be fun and healthy. Too much pressure or training can lead to <b>burnout</b>.",
    "Signs include losing enjoyment, constant tiredness, dropping performance, mood changes and frequent illness. Playing many sports, taking rest days and having the freedom to choose help prevent it. <b>Early specialization</b> in one sport at a young age can raise injury and burnout risk. Coaches and parents should praise effort, not only wins.",
    "Enjoyment, rest and variety keep athletes healthy.", "A teen who plays three sports across the year often stays fresher than one who does one sport all year.", [
    "Burnout in sport is…~Exhaustion and loss of interest from too much pressure or training~Getting hot~A kind of stretch~It is a drained feeling.",
    "A sign of burnout is…~No longer enjoying the sport~Wanting to practice more~Sleeping well~Look at the feelings.",
    "A good way to prevent burnout is…~Taking rest days~Training twice daily without breaks~Never sleeping~Recovery protects against it.",
    "Playing many sports as a teen can…~Lower injury and burnout risk~Guarantee burnout~Stop growth~Variety gives the body a break.",
    "Early specialization means…~Focusing on only one sport at a young age~Playing many sports~Never playing~It means narrowing down early.",
    "Adults should praise young athletes for…~Effort and improvement~Only winning~Only goals~Effort is in the athlete's control.",
    "If a friend seems to hate a sport they once loved and is always tired, you could…~Talk kindly and suggest they speak to a trusted adult~Laugh~Tell them to quit forever~Support them gently.",
    "Rest is…~Part of training~A waste of time~Cheating~The body adapts during recovery."]);
  const e11 = T("Community and lifelong activity", "🏞️", "You can stay active long after school by knowing what your community offers and choosing activities you enjoy.",
    "Look for <b>parks, trails, recreation centers, pools, clubs and leagues</b>, walking groups and school facilities. <b>Lifetime activities</b> are those you can enjoy for decades, like walking, swimming, cycling, hiking, yoga and tennis. Overcome barriers such as cost or distance with free options, friends and carpools. Volunteering as a coach or referee is also a way to stay involved.",
    "Pick something you enjoy and can afford in time and money.", "A group of friends starts a weekly walk in a local park, which costs nothing.", [
    "Which is a lifetime activity?~Walking~A sport you can only do at 16~A single tournament~Something you can do for many decades.",
    "Where might you find free places to be active?~Parks and trails~Only expensive gyms~Nowhere~Look outdoors in your community.",
    "A barrier like cost can be solved by…~Choosing free activities like walking or park games~Giving up~Doing nothing~There are often free options.",
    "Joining a club or league helps because…~It gives routine, friends and coaching~It costs nothing~It stops all injuries~Others make it easier to attend.",
    "Volunteering as a youth coach is a way to…~Stay involved and give back~Avoid all activity~Avoid people~You share your skills.",
    "Why choose activities you enjoy?~You are more likely to keep doing them~They are always easier~No reason~Fun leads to habits.",
    "Which is a barrier to being active?~Not having transport to the field~A nearby park~A friend who invites you~Think of what gets in the way.",
    "A walking group is useful because…~It gives company and encouragement~It is loud~It needs expensive gear~People motivate each other."]);
  const e12 = T("Physical activity guidelines", "📜", "Health experts publish guidelines for how much activity people need.",
    "Children and teens: about <b>60 minutes a day</b> of moderate to vigorous activity, with <b>muscle- and bone-strengthening</b> activity at least 3 days a week. Adults: <b>150 minutes a week</b> of moderate activity (or 75 minutes of vigorous) plus <b>2 days</b> of muscle strengthening. The <b>talk test</b>: on moderate effort you can talk but not sing. Sit less and move more.",
    "Teens: 60 a day. Adults: 150 a week.", "A teen who is active an hour each day meets the daily guideline.", [
    "About how much activity do teens need each day?~60 minutes~5 minutes~3 hours~It is about an hour.",
    "About how much moderate activity do adults need each week?~150 minutes~15 minutes~10 hours~It is a bit more than two hours.",
    "How many days a week should teens do muscle- and bone-strengthening activity?~At least 3~0~Only 1 day a month~More than once or twice a week.",
    "The talk test says that at moderate effort you can…~Talk but not sing~Sing easily~Not talk at all~Between easy and hard.",
    "Which counts as vigorous activity?~Running fast~Strolling~Standing~You breathe hard and can only say a few words.",
    "Adults get the same benefit from 75 minutes of…~Vigorous activity~Sleeping~Sitting~Harder effort needs half the time.",
    "Besides moving more, guidelines suggest you should…~Sit less~Sit more~Skip sleep~Break up long sitting.",
    "Which is moderate-intensity activity?~Brisk walking~Resting in bed~A maximum sprint~Your heart rate goes up but you can still talk."]);

  const f1 = N("Games in a tournament", "🏆", "Organizers count games to plan courts and time.",
    "<b>Single elimination</b> with n teams needs <b>n − 1</b> games (every team except the champion loses once). <b>Round robin</b> needs <b>n × (n − 1) ÷ 2</b> games because each pair plays once.",
    "Elimination: one less than teams. Round robin: pairs of teams.", () => {
    const n = ri(4, 10);
    if (ri(1, 2) === 1) return { text: `${n} teams play a single-elimination tournament. How many games are played in total?`, visual: "🏆", answer: n - 1,
      hints: ["Each game knocks out one team.", "Everyone except the champion has to lose once.", "Example: 8 teams means 7 games, since 7 teams are knocked out. Now do yours."] };
    return { text: `${n} teams play a round robin where every team plays every other team once. How many games are played?`, visual: "🏆", answer: n * (n - 1) / 2,
      hints: ["Count pairs of teams.", "Multiply the teams by one fewer, then halve it.", "Example: 5 teams: 5 × 4 = 20, half is 10 games. Now do yours."] };
  });
  const f2 = N("Rounds and byes", "🧩", "A bracket works best with 2, 4, 8, 16 or 32 teams. Other numbers need <b>byes</b>.",
    "A bracket of 2 to the power k teams has <b>k rounds</b>: 8 teams = 3 rounds, 16 teams = 4 rounds. If the team count is not a power of 2, <b>byes = bracket size − teams</b>.",
    "Halve the teams each round, or fill up to the next bracket size.", () => {
    if (ri(1, 2) === 1) { const k = ri(2, 6); return { text: `A single-elimination bracket has ${2 ** k} teams. How many rounds does it take to find the champion?`, visual: "🧩", answer: k,
      hints: ["Each round cuts the number of teams in half.", "Count how many times you can halve the teams until one is left.", "Example: 16, 8, 4, 2, 1 takes 4 rounds. Now do yours."] }; }
    const t = pick([5, 6, 7, 9, 10, 11, 12, 13, 14, 15]), size = t < 8 ? 8 : 16;
    return { text: `${t} teams enter a single-elimination bracket that has ${size} spots. How many byes are needed?`, visual: "🧩", answer: size - t,
      hints: ["Byes fill the empty spots.", "Subtract the number of teams from the bracket size.", "Example: 6 teams in 8 spots needs 2 byes. Now do yours."] };
  });
  const f3 = N("Team budget", "💰", "Running a team costs money. A <b>budget</b> compares what comes in with what goes out.",
    "<b>Costs = players × cost per player + shared costs.</b> <b>Money still needed = total cost − money raised.</b>",
    "Multiply, add, then subtract what you have.", () => {
    const p = ri(8, 15), c = pick([10, 15, 20, 25]), sh = pick([50, 80, 100, 120]), tot = p * c + sh;
    const raised = pick([20, 50, 100]);
    if (ri(1, 2) === 1) return { text: `${p} players each pay $${c} for uniforms and the team pays $${sh} for field fees. What is the total cost in dollars?`, visual: "💰", answer: tot,
      hints: ["Find the uniforms cost first.", "Multiply players by the price each, then add the field fees.", "Example: 5 players × $10 + $20 fees = $70. Now do yours."] };
    return { text: `A team's costs are $${tot} and a car wash raised $${raised}. How many more dollars does the team need?`, visual: "💰", answer: tot - raised,
      hints: ["Compare the cost with the money raised.", "Subtract the money raised from the cost.", "Example: cost $200, raised $50: 200 − 50 = $150 needed. Now do yours."] };
  });
  const f4 = N("Activity minutes counted", "🧮", "Experts count <b>vigorous</b> minutes as <b>double</b> moderate minutes.",
    "<b>Moderate-equivalent minutes = moderate minutes + 2 × vigorous minutes.</b> The adult guide is 150 moderate-equivalent minutes per week.",
    "Double the vigorous minutes, then add the moderate ones.", () => {
    const m = pick([20, 30, 40, 50, 60]), v = pick([10, 15, 20, 25, 30]), tot = m + 2 * v;
    if (ri(1, 2) === 1) return { text: `In a week an adult does ${m} minutes of moderate activity and ${v} minutes of vigorous activity. How many moderate-equivalent minutes is that (vigorous counts double)?`, visual: "🧮", answer: tot,
      hints: ["Vigorous minutes count twice.", "Double the vigorous minutes, then add the moderate minutes.", "Example: 40 moderate and 10 vigorous: 40 + 20 = 60. Now do yours."] };
    return { text: `An adult has done ${m} minutes of moderate and ${v} minutes of vigorous activity this week (vigorous counts double). How many more moderate-equivalent minutes are needed to reach 150?`, visual: "🧮", answer: 150 - tot,
      hints: ["Find the total so far first.", "Total = moderate + 2 × vigorous, then take it from 150.", "Example: 30 moderate and 10 vigorous is 50, so 100 more. Now do yours."] };
  });
  const f5 = N("Pass completion and assist ratio", "📈", "Analysts turn counts into simple numbers that are easy to compare.",
    "<b>Completion % = completed ÷ attempted × 100.</b> <b>Assist-to-turnover ratio = assists ÷ turnovers.</b>",
    "Divide the part by the whole, or assists by turnovers.", () => {
    const att = pick([10, 20, 25, 50]), pc = pick([40, 50, 60, 70, 80, 90]), comp = att * pc / 100;
    const k = ri(1, 3);
    if (k === 1) return { text: `A player completed ${comp} of ${att} passes. What is the completion percentage?`, visual: "📈", answer: pc,
      hints: ["Compare completed passes with attempted passes.", "Divide completed by attempted, then multiply by 100.", "Example: 15 of 20: 15 ÷ 20 = 0.75, which is 75 percent. Now do yours."] };
    if (k === 2) return { text: `A player completes ${pc} percent of ${att} attempted passes. How many were completed?`, visual: "📈", answer: comp,
      hints: ["Find a percent of the attempts.", "Multiply the attempts by the percent and divide by 100.", "Example: 80 percent of 10 is 8. Now do yours."] };
    const to = ri(2, 6), r = ri(2, 4);
    return { text: `A guard had ${to * r} assists and ${to} turnovers. What is the assist-to-turnover ratio?`, visual: "🏀", answer: r,
      hints: ["The ratio compares assists with turnovers.", "Divide the assists by the turnovers.", "Example: 12 assists and 4 turnovers: 12 ÷ 4 = 3. Now do yours."] };
  });
  const f6 = N("Race pacing", "⏱️", "Pace is how many minutes it takes for each kilometer.",
    "<b>Finish time = pace × distance.</b> <b>Pace needed = target time ÷ distance.</b> A <b>negative split</b> means running the second half faster than the first.",
    "Multiply for time, divide for pace.", () => {
    const p = ri(4, 8), p2 = p - 1; let d = pick([5, 10]);
    const k = ri(1, 3);
    if (k === 1) return { text: `A runner holds a pace of ${p} minutes per km for a ${d} km race. What is the finish time in minutes?`, visual: "⏱️", answer: p * d,
      hints: ["Every kilometer takes the same time.", "Multiply the pace by the distance.", "Example: 6 min per km over 3 km is 18 minutes. Now do yours."] };
    if (k === 2) return { text: `A runner wants to finish a ${d} km race in ${p * d} minutes. What pace in minutes per km is needed?`, visual: "⏱️", answer: p,
      hints: ["Share the total time over the kilometers.", "Divide the target time by the distance.", "Example: 24 minutes for 4 km is 6 minutes per km. Now do yours."] };
    d = 10; const half = d / 2;
    return { text: `In a ${d} km race a runner covers the first ${half} km at ${p} min/km and the second ${half} km at ${p2} min/km (a negative split). What is the total time in minutes?`, visual: "⏱️", answer: half * p + half * p2,
      hints: ["Work out each half separately.", "Multiply each half's distance by its pace, then add the two times.", "Example: 2 km at 6 min/km and 2 km at 5 min/km: 12 + 10 = 22 minutes. Now do yours."] };
  });

  Object.assign(PE_LEVELS, {
    22: [
      L("Newton's laws in sport", a1), L("Electrolytes and sweat", a2), L("Handball", a3), L("Projectile motion", a4), L("Principles of training", a5),
      L("Core stability and Pilates", a6), L("Cold-weather safety", a7), L("Wearables and data", a8), L("Ergonomics and posture", a9), L("Fitness tests", a10),
      L("Heat illness", a11), L("Fair play and integrity", a12),
      L("Stride and cadence", b1), L("Training load", b2), L("Sweat rate", b3), L("Levers and mechanical advantage", b4), L("Percent change in performance", b5), L("Median and range", b6),
      L("Mixed practice", MIX(a1, a4, a5, b1, b3, b5)), L("Level 22 Challenge", MIX(a2, a3, a6, a7, a8, a9, a10, a11, a12, b2, b4, b6))
    ],
    23: [
      L("Heart rate zones", c1), L("Flow and arousal", c2), L("Sprint phases", c3), L("Muscle soreness (DOMS)", c4), L("Spin and the Magnus effect", c5),
      L("Fitness myths", c6), L("Exercise through life", c7), L("Compass bearings", c8), L("Adaptive sport and inclusion", c9), L("Judging research claims", c10),
      L("Thermoregulation", c11), L("Triathlon and multisport", c12),
      L("Heart rate zone targets", d1), L("Bearings and turns", d2), L("Triathlon timing", d3), L("Cycling time", d4), L("Weekly activity minutes", d5), L("Weekly build-up", d6),
      L("Mixed practice", MIX(c1, c3, c8, d1, d3, d6)), L("Level 23 Challenge", MIX(c2, c4, c5, c6, c7, c9, c10, c11, c12, d2, d4, d5))
    ],
    24: [
      L("Needs assessment", e1), L("Health screening (PAR-Q)", e2), L("Duty of care", e3), L("Tournament formats", e4), L("Teaching progressions", e5),
      L("Returning after injury", e6), L("Activity and long-term health", e7), L("Exercising safely with health conditions", e8), L("Performance analysis", e9), L("Youth sport and burnout", e10),
      L("Community and lifelong activity", e11), L("Physical activity guidelines", e12),
      L("Games in a tournament", f1), L("Rounds and byes", f2), L("Team budget", f3), L("Activity minutes counted", f4), L("Pass completion and assist ratio", f5), L("Race pacing", f6),
      L("Mixed practice", MIX(e4, e5, e12, f1, f4, f6)), L("Level 24 Challenge", MIX(e1, e2, e3, e6, e7, e8, e9, e10, e11, f2, f3, f5))
    ]
  });
})();
