// ext/pe-28-30.js  PE levels 28-30 (college year 1 second half, college year 2): kinesiology
(() => {
  // T: topic quiz. row string "q~answer~wrong1~wrong2~clue" (q may start "emoji|")
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

  // ================= LEVEL 28 =================
  const a1 = T("Center of mass and stability", "🎯", "Your <b>center of mass</b> is the balance point of your whole body. Where it sits decides how stable you are.",
    "Stability is greater with a <b>lower</b> center of mass, a <b>wider base of support</b>, and a line of gravity that stays <b>inside</b> the base. More mobility (easy starting to move) comes from a smaller base and a forward lean. The center of mass can even lie <b>outside</b> the body, as when a high jumper arches over the bar.",
    "Picture a line dropping straight down from the center of mass and ask where it lands compared with the feet.",
    "A table with wide legs is hard to tip, but a tall thin lamp tips easily because its center of mass is high and its base is small.", [
    "Which change makes a standing athlete MORE stable?~Lowering the center of mass and widening the base~Raising the center of mass and narrowing the base~Moving the line of gravity outside the base~Think about how a wrestler crouches.",
    "A body stays balanced while its line of gravity falls…~Inside the base of support~Outside the base of support~Only at the very edge of the toes~The base is the area under and between the feet.",
    "How can a high jumper clear the bar while the center of mass passes below it?~By arching the body around the bar~By keeping the whole body straight~By jumping with locked knees~The center of mass does not have to stay inside the body.",
    "A sprinter leaning forward in the set position trades some stability for…~Mobility, so it is easier to start moving~A larger base~A lower friction force~Ask what a runner wants to do right after the gun.",
    "A wide stance compared with a narrow stance gives…~More stability~Less stability~The same stability~A wider base is harder to tip.",
    "Where is the center of mass of a person standing upright roughly located?~Near the pelvis~In the head~In the feet~It is close to the middle of the body, a little below the navel.",
    "A lineman wants to resist a hard push. Which feature helps most?~A wide base and a low center of mass~A narrow base and high hips~Standing on one foot~Picture the opposite of a lamp that tips easily.",
    "What happens when the line of gravity moves outside the base of support?~The body tips unless it steps or reaches~Stability increases~Nothing changes~Think of a lean that is too far."]);
  const a2 = T("Bone remodeling and Wolff's law", "🦴", "Bone is living tissue. It constantly breaks down and rebuilds, and loads decide how it changes.",
    "<b>Wolff's law</b>: bone adapts to the loads placed on it. <b>Osteoblasts</b> build new bone and <b>osteoclasts</b> break old bone down. Impact and weight-bearing activity (running, jumping, lifting) raise density more than non-weight-bearing activity like swimming. Bone mass usually peaks in young adulthood. Calcium and vitamin D support bone.",
    "Ask what kind of load the bone sees: impact, steady weight, or almost none.",
    "A weightlifter often has denser spine and hip bones than a person who never lifts, because lifting loads those bones again and again.", [
    "Wolff's law says that bone…~Adapts to the loads placed on it~Never changes after childhood~Gets weaker with any exercise~Think about how the skeleton responds to being used.",
    "Which cells build new bone?~Osteoblasts~Osteoclasts~Chondrocytes~One osteo-cell type builds and the other breaks down.",
    "Which cells break down old bone?~Osteoclasts~Osteoblasts~Fibroblasts~The ending clast comes from a word meaning to break.",
    "Which activity loads the bones the most?~Jumping and running~Swimming~Floating in water~Think about which one has the hardest impact.",
    "Bone mass usually reaches its peak…~In young adulthood~At age five~At age seventy~It is after the teen growth spurt but before middle age.",
    "Two nutrients especially important for bone health are…~Calcium and vitamin D~Sodium and vitamin C~Iron and caffeine~One is a mineral in milk and the other is helped by sunlight.",
    "Astronauts lose bone density in space mainly because…~Their bones carry much less load~They eat too much calcium~They exercise too much~Think about what gravity normally does to the skeleton.",
    "A tennis player often has denser bone in…~The racket arm~The non-racket arm~Neither arm~The arm doing the repeated hitting is loaded more."]);
  const a3 = T("Stages of motor learning", "🎓", "Learning a skill goes through stages. <b>Fitts and Posner</b> described three of them.",
    "<b>Cognitive</b>: the learner works out what to do; many errors, lots of thinking, simple instructions help. <b>Associative</b>: practice refines the skill; fewer errors, more consistency, feedback is used to fine-tune. <b>Autonomous</b>: the skill is automatic, smooth and needs little attention, so the performer can notice other things.",
    "Ask how many errors there are and how much conscious thought the performer needs.",
    "A first-time golfer who thinks aloud through every step is far from a tour pro who swings automatically while thinking about the wind.", [
    "Which stage has the most errors and needs the most thinking about each step?~Cognitive~Associative~Autonomous~It is the very first stage.",
    "In the autonomous stage a performer can…~Do the skill automatically while attending to other things~Not yet understand the goal~Only perform with a coach talking~Think about attention being free for other things.",
    "A beginner dribbling a basketball while staring at the ball is in which stage?~Cognitive~Associative~Autonomous~Looking at the ball shows heavy conscious control.",
    "Which stage is marked by smaller, fewer errors and using feedback to fine-tune?~Associative~Cognitive~Autonomous~It is the middle stage, between understanding and automatic.",
    "A veteran point guard reads the defense while dribbling without looking down. Which stage?~Autonomous~Cognitive~Associative~Attention is free for other tasks.",
    "What is the order of the Fitts and Posner stages?~Cognitive, associative, autonomous~Autonomous, cognitive, associative~Associative, cognitive, autonomous~Learners understand before they refine and then automate.",
    "Which coaching approach suits the cognitive stage best?~Simple, clear instructions on one or two main points~Many detailed technical corrections~No feedback at all~Too much information overloads a beginner.",
    "A learner who is now fairly consistent but still has to think about the skill is in the…~Associative stage~Cognitive stage~Autonomous stage~Not a beginner, but not automatic yet."]);
  const a4 = T("Feedback in motor learning", "💬", "Feedback tells a learner how the movement went. The kind of feedback matters.",
    "<b>Intrinsic</b> feedback comes from your own senses. <b>Extrinsic (augmented)</b> feedback comes from outside, like a coach or video. <b>Knowledge of results (KR)</b> tells you the outcome; <b>knowledge of performance (KP)</b> tells you about the movement pattern. Feedback during the move is <b>concurrent</b>; after it, <b>terminal</b>. Too much feedback can make learners dependent on it.",
    "Ask: is it about the outcome, the movement itself, who gives it, or when?",
    "A swimmer hears 'your lap time was 31 seconds' (KR) and 'your kick was too shallow' (KP).", [
    "Telling a thrower 'the javelin landed 3 m short' is…~Knowledge of results (KR)~Knowledge of performance (KP)~Intrinsic feedback~It tells what happened at the end, not how the body moved.",
    "Telling a thrower 'your elbow dropped as you released' is…~Knowledge of performance (KP)~Knowledge of results (KR)~Terminal score~It describes the movement pattern itself.",
    "Feeling that your shot was off balance as you took it is…~Intrinsic feedback~Extrinsic feedback~Knowledge of results~It comes from your own body senses.",
    "Feedback from a coach, video or app is called…~Extrinsic (augmented) feedback~Intrinsic feedback~Proprioception~It comes from outside the performer.",
    "Too much feedback after every attempt can…~Make learners depend on it~Always speed up learning~Remove the need to practice~Think about what happens when the helper is not there.",
    "Feedback given while the movement is happening is…~Concurrent feedback~Terminal feedback~Knowledge of results~The word means at the same time.",
    "Feedback given after the attempt is finished is…~Terminal feedback~Concurrent feedback~Intrinsic feedback~It comes at the end.",
    "Which statement is KR?~'You ran 12.4 seconds'~'Your arm swing was too short'~'Your legs felt heavy'~Look for the one that reports only a result."]);
  const a5 = T("Practice schedules", "🔁", "How you order your practice changes what you learn and how long it lasts.",
    "<b>Blocked</b> practice repeats one skill; <b>random</b> practice mixes skills in an unpredictable order. The <b>contextual interference effect</b>: random practice looks harder and can give worse results in practice, but better <b>retention and transfer</b> later. Complex skills with separable parts suit <b>part practice</b>; tightly linked skills suit <b>whole</b> practice. <b>Distributed</b> practice has rests between sessions; <b>massed</b> has little rest.",
    "Ask whether the order is repeated or mixed, and whether the question is about practice or later testing.",
    "A volleyball team that alternates serves, passes and sets in a mixed order practices randomly, while one that does fifty serves in a row practices blocked.", [
    "Practicing 20 free throws in a row with nothing else is…~Blocked practice~Random practice~Distributed practice~The same skill is repeated.",
    "Mixing free throws, layups and passes in an unpredictable order is…~Random practice~Blocked practice~Whole practice~The skills are shuffled.",
    "The contextual interference effect means random practice often…~Looks harder but improves retention and transfer~Always improves immediate performance~Prevents any learning~It pays off on later tests.",
    "Which schedule usually looks best during practice but worse on a later retention test?~Blocked practice~Random practice~Mental practice~Easy-looking repeats can fool the learner.",
    "A complex skill made of separable parts, such as a gymnastics routine, is often taught with…~Part practice~Whole practice only~No practice~Break it into pieces first.",
    "A tightly linked skill such as a golf swing is usually best practiced as…~A whole~Separate disconnected fragments~Only the first half~The parts depend heavily on each other.",
    "Short sessions with rest between them are called…~Distributed practice~Massed practice~Blocked practice~Think spread out.",
    "Long practice with very little rest is called…~Massed practice~Distributed practice~Random practice~Think packed together."]);
  const a6 = T("Types of goals", "🏁", "Sport psychologists sort goals into three types. Good athletes use all three, but they trust some more than others.",
    "<b>Outcome</b> goals are about results such as winning or rank. <b>Performance</b> goals set a personal standard, like a time or percentage. <b>Process</b> goals focus on technique or actions. Process and performance goals are more under your own control than outcome goals, which opponents and luck affect. Hard but realistic goals beat vague 'do your best' goals.",
    "Ask whether the goal is about beating others, hitting a number, or doing an action well.",
    "'Land my first serve in 65% of the time' is a number you set for yourself, and 'toss the ball a little in front' is a technique action.", [
    "'I want to win the race' is a…~Outcome goal~Performance goal~Process goal~It depends on beating other people.",
    "'Run the 400 m in under 60 seconds' is a…~Performance goal~Outcome goal~Process goal~It is a personal standard with a number.",
    "'Keep my head up and drive my elbows on every stride' is a…~Process goal~Outcome goal~Performance goal~It names actions to do.",
    "Which type of goal is the most under the athlete's own control?~Process goals~Outcome goals~None of them~Opponents cannot change what you do.",
    "Why can outcome goals alone hurt confidence?~Opponents and luck affect the result~They are always too easy~They are always about technique~Ask who else decides the result.",
    "Compared with 'do your best', hard but realistic goals tend to lead to…~Better performance~Worse performance~No difference at all~Specific challenge motivates.",
    "'Raise my first-serve percentage from 55% to 65%' is a…~Performance goal~Outcome goal~Process goal~It sets a measurable personal standard.",
    "Checking progress toward a goal each week provides…~Feedback and monitoring~An outcome goal~Social loafing~It lets you see if you are on track."]);
  const a7 = T("Pressure, choking and coping", "😰", "Sometimes athletes perform below their ability exactly when it matters most. This is called <b>choking</b>.",
    "<b>Explicit monitoring</b> theory: thinking about each step of an automatic skill disrupts it. <b>Distraction</b> theory: worry uses up attention that the task needs. Helpful tools: <b>pre-performance routines</b>, slow breathing, practicing under pressure, and a <b>challenge</b> appraisal (believing you have the resources to meet the demand) instead of a <b>threat</b> appraisal.",
    "Ask whether the idea is about too much conscious control, too much worry, or a coping tool.",
    "A basketball player who counts the same dribbles and breathes the same way before every shot is using a routine to stay steady.", [
    "Choking under pressure means…~Performing worse than your ability because of pressure~A medical choking emergency~Always winning close games~It is a drop in performance, not a body problem.",
    "Explicit monitoring theory says choking happens when an athlete…~Consciously controls steps that were automatic~Stops caring about the result~Practices too much~Think of the autonomous stage being disrupted.",
    "Distraction theory says worry…~Uses attention that the task needs~Improves focus~Has no effect~Attention is limited.",
    "Which helps most against pressure?~Practicing under pressure-like conditions~Skipping practice~Thinking about the crowd~Make practice feel like competition.",
    "Pre-performance routines help by…~Giving a consistent, focused start~Making competition longer~Removing nerves forever~They create a familiar pattern.",
    "Seeing a big match as a chance instead of a danger is…~Cognitive reappraisal~Social loafing~Overlearning~You change how you think about the situation.",
    "In a challenge appraisal, an athlete feels…~They can meet the demands with their resources~The demands exceed their resources~There is no demand at all~Compare what the situation asks with what you believe you have.",
    "Slow deep breathing before a free throw mainly helps to…~Lower arousal and anxiety~Raise body temperature~Build muscle~It calms the body."]);
  const a8 = T("Lactate threshold", "🧪", "Your muscles always make some lactate. At higher intensities the balance changes, and scientists track this with the <b>lactate threshold</b>.",
    "The <b>lactate threshold</b> is the intensity above which blood lactate rises rapidly because production outpaces clearance. A common fixed marker is <b>OBLA</b>, 4 mmol/L. Trained athletes reach it at a higher percent of VO2 max. Lactate is also a <b>fuel</b> that muscles and the heart can use. Training near the threshold raises the pace you can hold.",
    "Ask whether it is about production, clearance, or training effect.",
    "A cyclist's blood lactate stays flat as the test gets faster, then suddenly climbs; the point where it bends upward marks that cyclist's threshold.", [
    "The lactate threshold is the intensity at which…~Blood lactate begins to rise rapidly~Lactate stops being produced~Heart rate reaches zero~It is where the curve bends upward.",
    "Compared with untrained people, trained endurance athletes usually reach threshold at…~A higher percent of VO2 max~A lower percent of VO2 max~Exactly the same percent~Training moves the threshold.",
    "A common fixed marker called OBLA is…~4 mmol/L of blood lactate~40 mmol/L~0.4 mmol/L~It is a small, single-digit number.",
    "Lactate is now understood to be…~Both a fuel and a by-product that muscles and heart can use~Only a poison that causes soreness~Only made when resting~Newer research changed the old idea.",
    "Training near threshold helps raise…~The speed you can sustain before lactate builds up~Your height~Your resting temperature~Think of the pace you can hold.",
    "Above the threshold, lactate builds up because…~Production outpaces clearance~Clearance stops forever~Muscles run out of water~It is a balance of making and removing.",
    "Which test could measure lactate?~Blood samples during a stepped exercise test~A skinfold measurement~A sit-and-reach test~You need to measure something in the blood.",
    "A runner's lactate threshold pace is useful for…~Setting training and racing paces~Measuring bone length~Predicting height~It tells how hard the runner can hold effort."]);
  const a9 = T("Phases of tissue healing", "🩹", "Injured tissue heals in overlapping phases. Knowing them helps rehab progress at the right time.",
    "<b>Inflammation</b> (first days): swelling, heat and redness as cells clean up. <b>Proliferation</b> (about days 3 to 3 weeks): new tissue such as collagen is laid down, still weak. <b>Remodeling</b> (weeks to more than a year): fibers strengthen and line up along stress. Tendons and ligaments heal slowly because of limited blood supply.",
    "Ask which of the three phases the clue matches: clean up, build, or strengthen.",
    "A sprained ankle first swells and warms up, then gets weak new tissue, then slowly gets stronger as it is gently loaded.", [
    "What is the order of healing phases?~Inflammation, proliferation, remodeling~Remodeling, inflammation, proliferation~Proliferation, remodeling, inflammation~Clean up first, strengthen last.",
    "In the inflammatory phase the body…~Sends blood and cells to clean up and protect the area~Builds final scar strength~Stops all blood flow~The area becomes swollen and warm.",
    "In the proliferation phase new tissue such as collagen is…~Laid down but is still weak~Completely mature~Removed entirely~It is a building phase.",
    "The remodeling phase can last…~Months to more than a year~A few minutes~One hour~It is the longest phase.",
    "Controlled loading in later phases helps collagen fibers…~Line up along the lines of stress~Disappear~Become random~Stress guides the tissue.",
    "Swelling, heat, redness and pain are signs of…~Inflammation~Remodeling~Reconditioning~They happen in the first phase.",
    "Why not return to full sport as soon as pain fades?~The tissue may still be weaker than before~Pain always means perfect healing~Healing ends in one day~Feeling better is not the same as being rebuilt.",
    "Compared with muscle, tendons and ligaments usually heal…~More slowly, partly due to limited blood supply~Faster~At exactly the same rate~Think about how much blood these tissues receive."]);
  const a10 = T("How muscles grow (hypertrophy)", "💪", "<b>Hypertrophy</b> is an increase in the size of muscle fibers. Several signals drive it.",
    "Proposed drivers: <b>mechanical tension</b> (the main one), <b>metabolic stress</b> and <b>muscle damage</b>. Growth happens when muscle protein synthesis exceeds breakdown over time. Sets taken close to failure recruit high-threshold motor units. <b>Hyperplasia</b> (more fibers) is debated in humans and likely small. <b>Atrophy</b> is a loss of muscle size.",
    "Ask whether the word means bigger fibers, more fibers, or less muscle.",
    "A beginner who lifts three times a week and eats enough protein shifts the balance toward more protein being built than broken down.", [
    "Three proposed drivers of hypertrophy are mechanical tension, metabolic stress and…~Muscle damage~Heart rate drop~Sleep length~The third is something that happens to the fibers.",
    "Which is usually considered the primary driver?~Mechanical tension~Skin temperature~Shoe size~It is about the force the muscle produces.",
    "For muscle to grow over time, protein synthesis must be…~Greater than protein breakdown~Less than protein breakdown~Zero~Building must beat breaking down.",
    "Training close to failure matters because it…~Recruits many motor units, including high-threshold ones~Stops all adaptation~Guarantees injury~Hard sets use more fibers.",
    "Hypertrophy means…~An increase in muscle fiber size~An increase in bone length~A decrease in strength~Hyper means over.",
    "Which process is still debated in humans and is likely small?~Hyperplasia (more fibers)~Hypertrophy (bigger fibers)~Atrophy~It means a greater number of fibers.",
    "Atrophy is…~A decrease in muscle size~An increase in muscle size~A tendon injury~A- means without.",
    "Spreading protein across the day helps because it…~Repeatedly stimulates muscle protein synthesis~Turns directly into bone~Removes the need to train~Building signals are triggered several times."]);

  // numeric lessons
  const Q = (text, visual, answer, h1, h2, h3) => ({ text, visual, answer, hints: [h1, h2, h3] });
  const f_inertia = N("Moment of inertia", "🌀", "<b>Moment of inertia</b> (I) is how hard it is to change an object's spin. It depends on the mass and on how far the mass is from the axis.",
    "For a small mass: <b>I = m × r²</b> (mass in kg, radius in m, answer in kg·m²). Moving mass farther out makes spinning harder to start or stop. Doubling the radius makes I four times bigger.",
    "Square the radius first, then multiply by the mass.", () => {
    const k = ri(1, 3);
    if (k === 1) { const m = ri(2, 8), r = ri(2, 5); return Q(`A ${m} kg ball swings at a radius of ${r} m. Using I = m × r², what is its moment of inertia in kg·m²?`, "🌀", m * r * r,
      "Square the radius, then multiply by the mass.", "r × r first, then times the mass.", "Example: 3 kg at 2 m: 2 × 2 = 4, then 3 × 4 = 12. Now do yours."); }
    if (k === 2) { const m = ri(2, 8), r = ri(2, 5); return Q(`A mass of ${m} kg has a moment of inertia of ${m * r * r} kg·m². What is its radius in meters?`, "🌀", r,
      "Divide I by the mass to find the squared radius.", "Then find the number that multiplied by itself gives that result.", "Example: I = 20 for 5 kg: 20 ÷ 5 = 4, and 2 × 2 = 4 so r is 2. Now do yours."); }
    const g = ri(2, 3); return Q(`A diver moves her mass ${g} times farther from the axis (radius multiplied by ${g}). By what factor does the moment of inertia grow?`, "🤸", g * g,
      "I depends on the radius squared.", "Multiply the factor by itself.", "Example: radius times 5 gives 5 × 5 = 25 times. Now do yours.");
  });
  const f_rfd = N("Rate of force development", "⚡", "<b>Rate of force development (RFD)</b> measures how quickly a muscle can build force. Explosive sports need a high RFD.",
    "<b>RFD = change in force ÷ time</b>, in newtons per second (N/s). The same peak force reached in less time means a higher RFD.",
    "Divide the force gained by the seconds it took.", () => {
    if (ri(1, 2) === 1) { const F = ri(2, 12) * 100, t = pick([0.1, 0.2, 0.25, 0.5]); return Q(`A jumper's force rises by ${F} N in ${t} s. What is the rate of force development in N/s?`, "⚡", Math.round(F / t),
      "Use force divided by time.", "Dividing by a decimal gives a bigger number than the force.", "Example: 600 N in 0.5 s is 600 ÷ 0.5 = 1200 N/s. Now do yours."); }
    const R = pick([1000, 2000, 3000, 4000, 5000]), t = pick([0.1, 0.2, 0.5]); return Q(`An athlete has an RFD of ${R} N/s. How many newtons does the force rise in ${t} s?`, "⚡", Math.round(R * t),
      "Force gained = RFD × time.", "Multiply the rate by the seconds.", "Example: 2000 N/s for 0.5 s is 2000 × 0.5 = 1000 N. Now do yours.");
  });
  const f_react = N("Distance during reaction time", "⏱️", "Even a very quick reaction takes time, and a fast object keeps moving during it.",
    "<b>distance = speed × time</b>. A ball moving at 20 m/s travels 20 m every second, so in 0.2 s it travels 20 × 0.2 = 4 m before you can react.",
    "Multiply speed by the reaction time.", () => {
    const v = pick([10, 20, 30, 40]), t = pick([0.1, 0.2, 0.5]);
    return Q(`A ball moves at ${v} m/s and a player's reaction time is ${t} s. How many meters does the ball travel during the reaction?`, "🏐", Math.round(v * t),
      "Distance is speed times time.", "Multiply the m/s by the seconds.", "Example: 30 m/s for 0.1 s is 30 × 0.1 = 3 m. Now do yours.");
  });
  const f_vo2 = N("Relative and absolute VO2", "🫁", "VO2 can be written <b>relative</b> to body mass (ml/kg/min) or as an <b>absolute</b> amount (ml/min).",
    "<b>Absolute VO2 = relative VO2 × body mass in kg.</b> Use relative values to compare people of different sizes. To go back, divide by body mass.",
    "Multiply to go absolute, divide to go relative.", () => {
    const rel = pick([40, 45, 50, 55, 60, 65, 70]), kg = pick([50, 60, 70, 80, 90]);
    if (ri(1, 2) === 1) return Q(`An athlete weighing ${kg} kg has a VO2 max of ${rel} ml/kg/min. What is the absolute VO2 max in ml/min?`, "🫁", rel * kg,
      "Multiply the relative value by body mass.", "ml/kg/min × kg gives ml/min.", "Example: 50 ml/kg/min and 60 kg: 50 × 60 = 3000 ml/min. Now do yours.");
    return Q(`An athlete weighing ${kg} kg uses ${rel * kg} ml of oxygen per minute at max. What is the relative VO2 max in ml/kg/min?`, "🫁", rel,
      "Divide by body mass to make it relative.", "Divide the ml/min by the kilograms.", "Example: 3200 ml/min at 80 kg: 3200 ÷ 80 = 40. Now do yours.");
  });
  const f_met = N("Calories from METs", "🔥", "METs can estimate energy use. One MET is about 1 kilocalorie per kilogram of body mass per hour.",
    "<b>kcal ≈ MET × body mass (kg) × hours.</b> It is an estimate, not an exact value. Half an hour is 0.5 hours.",
    "Multiply the three numbers together.", () => {
    const met = ri(3, 10), kg = pick([50, 60, 70, 80, 90]), h = pick([0.5, 1, 2]);
    return Q(`An activity has a MET value of ${met}. A ${kg} kg person does it for ${h} hour${h === 1 ? "" : "s"}. About how many kcal is that (MET × kg × hours)?`, "🔥", Math.round(met * kg * h),
      "Multiply MET by body mass, then by the hours.", "Half an hour means multiply by 0.5.", "Example: 4 METs, 50 kg, 2 hours: 4 × 50 × 2 = 400 kcal. Now do yours.");
  });
  const f_pol = N("Polarized training 80/20", "📊", "In <b>polarized</b> training, most time is easy and a small share is hard. A common split is about <b>80% easy and 20% hard</b>.",
    "Easy minutes = total × 0.8. Hard minutes = total × 0.2. If you know the hard minutes, the total is hard × 5.",
    "Find 10% first, then scale up.", () => {
    const tot = ri(3, 12) * 50, hard = tot / 5, easy = tot - hard;
    const k = ri(1, 3);
    if (k === 1) return Q(`A runner trains ${tot} minutes a week in an 80/20 split. How many minutes are easy?`, "🏃", easy,
      "Easy is 80 percent of the total.", "Find 10% by dividing by 10, then multiply by 8.", "Example: 200 minutes: 10% is 20, so easy is 8 × 20 = 160. Now do yours.");
    if (k === 2) return Q(`A runner trains ${tot} minutes a week in an 80/20 split. How many minutes are hard?`, "🏃", hard,
      "Hard is 20 percent of the total.", "Divide the total by 5, or find 10% and double it.", "Example: 300 minutes: 10% is 30, double is 60. Now do yours.");
    return Q(`A runner does ${hard} hard minutes a week, which is 20% of the plan. How many minutes is the whole plan?`, "🏃", tot,
      "Hard minutes are one fifth of the total.", "Multiply the hard minutes by 5.", "Example: 40 hard minutes is 20%, so the plan is 40 × 5 = 200. Now do yours.");
  });
  const f_angv = N("Angular velocity", "🔄", "<b>Angular velocity</b> tells how fast something rotates, such as a bat, a leg or a pedal.",
    "<b>angular velocity = angle turned ÷ time</b>, often in degrees per second. A full turn is 360°. For revolutions per minute (rpm) × 6 gives degrees per second, since 360 ÷ 60 = 6.",
    "Divide the degrees by the seconds, or multiply rpm by 6.", () => {
    if (ri(1, 2) === 1) { const a = pick([90, 180, 360, 540, 720]), t = pick([0.1, 0.2, 0.5]); return Q(`A bat rotates through ${a}° in ${t} s. What is its angular velocity in degrees per second?`, "⚾", Math.round(a / t),
      "Angle divided by time.", "Dividing by a decimal makes the result bigger.", "Example: 180° in 0.5 s is 180 ÷ 0.5 = 360°/s. Now do yours."); }
    const rpm = pick([60, 80, 90, 100, 110, 120]); return Q(`A cyclist pedals at ${rpm} rpm. How many degrees per second do the pedals turn? (1 rpm = 6 degrees per second)`, "🚴", rpm * 6,
      "Each rpm equals 6 degrees per second.", "Multiply the rpm by 6.", "Example: 50 rpm is 50 × 6 = 300°/s. Now do yours.");
  });
  const f_pow = N("Work and power in a lift", "🏋️", "<b>Work</b> is force times distance. <b>Power</b> is how fast the work is done.",
    "<b>Work (J) = force (N) × distance (m)</b>. Weight in newtons ≈ mass × 10 here. <b>Power (W) = work ÷ time</b>. Same work in less time means more power.",
    "Find the work first, then divide by seconds if power is asked.", () => {
    if (ri(1, 2) === 1) { const m = pick([20, 30, 40, 50, 60]), h = pick([1, 2, 3]); return Q(`A lifter raises a ${m} kg bar ${h} m. Use weight = mass × 10 N. How much work in joules?`, "🏋️", m * 10 * h,
      "Weight in newtons first (mass × 10), then times the height.", "Work = weight × distance.", "Example: 20 kg lifted 2 m: weight 200 N, 200 × 2 = 400 J. Now do yours."); }
    const P = pick([100, 200, 300, 400]), t = pick([2, 4, 5, 10]); return Q(`A rower does ${P * t} joules of work in ${t} seconds. What is the power in watts?`, "🚣", P,
      "Power is work divided by time.", "Divide the joules by the seconds.", "Example: 600 J in 3 s is 600 ÷ 3 = 200 W. Now do yours.");
  });

  // ================= LEVEL 29 =================
  const b1 = T("Muscle spindles and Golgi tendon organs", "📡", "Your muscles and tendons carry tiny sensors that report to the nervous system. This sense of body position is <b>proprioception</b>.",
    "<b>Muscle spindles</b> sense muscle <b>length</b> and how fast it changes; they trigger the stretch reflex. <b>Golgi tendon organs (GTOs)</b> sense <b>tension</b> where muscle meets tendon; very high tension can cause the muscle to relax (autogenic inhibition), which helps protect it. The <b>vestibular</b> system in the inner ear senses head position and balance.",
    "Ask whether the sensor reports stretch, tension, or balance.",
    "When a doctor taps the patellar tendon, the quadriceps stretches a little, a spindle fires and the leg kicks out.", [
    "Muscle spindles detect…~Muscle length and how fast it changes~Tension in the tendon~Blood pressure~They sit inside the muscle and respond to stretch.",
    "Golgi tendon organs detect…~Tension where muscle meets tendon~Muscle length only~Body temperature~They are found near the tendon.",
    "When a GTO senses very high tension, it tends to cause the muscle to…~Relax~Contract harder~Stay exactly the same~It acts as a safety brake.",
    "Which sensor starts the stretch reflex when a muscle is stretched suddenly?~Muscle spindle~Golgi tendon organ~Joint capsule receptor~It reacts to quick changes in length.",
    "Proprioception is…~Your sense of body position and movement~Your sense of smell~The rhythm of your heart~Think of knowing where your arm is with eyes closed.",
    "Why might PNF stretching use a contraction before the stretch?~To use a relaxation reflex so the muscle can lengthen further~To make bones longer~To warm the pool~The contraction uses a reflex that relaxes the muscle.",
    "Balance training improves…~Proprioception and joint control~Eye color~Bone length~It trains the body's position sense.",
    "The vestibular system in the inner ear mainly helps with…~Balance and head position~Digestion~Taste~It senses movement of the head."]);
  const b2 = T("Open-loop and closed-loop control", "🔁", "How does the brain run a movement? Two models describe it.",
    "<b>Closed-loop</b> control uses feedback during the movement to correct it; it suits slow, precise actions like threading a needle. <b>Open-loop</b> control runs a pre-planned <b>motor program</b> without correction; it suits fast actions like a baseball swing. A <b>generalized motor program (GMP)</b> keeps <b>invariant</b> features (order, relative timing, relative force) and lets <b>parameters</b> (overall speed, size, muscles used) change.",
    "Ask whether there is time for feedback to fix the movement mid-way.",
    "A gymnast runs the same vault pattern but adjusts the speed of the run-up, so the pattern stays and a parameter changes.", [
    "A fast movement like a baseball swing is mostly controlled by…~An open-loop motor program~Closed-loop feedback during the swing~Only conscious thought~There is no time to correct it mid-swing.",
    "A slow precise movement like threading a needle uses mainly…~Closed-loop control~Open-loop control only~Reflexes only~It can be corrected as you go.",
    "Closed-loop control needs…~Feedback during the movement~No sensory information~A stopwatch~The loop is closed by information coming back.",
    "A generalized motor program stores…~The invariant pattern, with parameters chosen each time~A separate program for every exact movement~Only the final result~One pattern is used for many versions.",
    "Signing your name small and then large with the same shape shows…~A generalized motor program with a changed size parameter~Closed-loop control only~Learning a new skill each time~The shape stays the same.",
    "Relative timing in a GMP means…~The proportions of time between parts stay the same~Every part always takes the same number of seconds~Time is ignored~It is about proportions, not absolute time.",
    "Why can feedback not fix a very fast ballistic movement mid-way?~There is not enough time to process it~Muscles cannot move~Eyes are always closed~Think about how long the loop takes.",
    "Which is a parameter, not an invariant feature?~Overall movement speed~Order of the actions~Relative timing~Parameters can be changed from one attempt to another."]);
  const b3 = T("Schema theory and variable practice", "🧩", "<b>Schema theory</b> (Richard Schmidt, 1975) explains how we can produce movements we have never done exactly before.",
    "A <b>schema</b> is a rule built from past attempts using four pieces of information: initial conditions, response specifications, sensory consequences and outcome. The <b>recall schema</b> picks parameters to produce a movement. The <b>recognition schema</b> evaluates the movement afterward using feedback. <b>Variable practice</b> builds stronger schemas and better transfer to new situations.",
    "Ask whether it is about producing a movement, judging a movement, or practicing it in varied ways.",
    "A pitcher who throws at many speeds and distances learns a rule for pitching to a new target.", [
    "Schema theory says practicing varied versions of a skill builds…~A flexible rule for producing movements~One fixed movement~Only muscle strength~Variety helps the rule generalize.",
    "The recall schema is used to…~Select parameters to produce a movement~Evaluate a movement afterward~Measure heart rate~It sets up the movement before it begins.",
    "The recognition schema is used to…~Evaluate whether a movement was right using feedback~Choose force before moving~Warm up~It works after the movement.",
    "Practicing throws at many different distances helps most for…~Throwing to a new distance~Throwing to only one exact distance~Resting~Variety prepares you for novel situations.",
    "Who proposed schema theory in 1975?~Richard Schmidt~Isaac Newton~Albert Bandura~He is a motor learning researcher.",
    "Which is one of the four pieces of information stored in a schema?~Sensory consequences~Weather forecast~Crowd size~It relates to how the movement felt.",
    "A tennis player who practiced serves at many speeds has built a…~Generalizable schema~Rigid habit~Reflex~Varied practice builds a flexible rule.",
    "Compared with constant practice, variable practice usually gives…~Better transfer to new situations~Faster early results~No difference~Think about being ready for new conditions."]);
  const b4 = T("Learning, retention and transfer", "🔄", "A great practice session does not always mean the skill is learned. Scientists separate <b>performance</b> from <b>learning</b>.",
    "<b>Performance</b> is what you do right now and can change day to day. <b>Learning</b> is a relatively permanent change in capability. A <b>retention test</b> checks performance after a delay. A <b>transfer test</b> checks a new situation. <b>Positive transfer</b> helps a new skill; <b>negative transfer</b> gets in the way. <b>Bilateral transfer</b> is from one side of the body to the other. <b>Specificity</b>: practice should resemble the real skill.",
    "Ask whether the test comes after a delay, in a new setting, or helps or hurts.",
    "A badminton player can use throwing-arm timing to help learn the overhead clear, which is positive transfer.", [
    "Learning is best defined as…~A relatively permanent change in capability~A temporary change in performance on one day~Feeling tired~It lasts beyond a single session.",
    "A retention test measures…~Performance after a break from practice~Performance during practice only~Heart rate~Retention means keeping what was learned.",
    "A transfer test measures…~Performance in a new situation~The same drill repeated~Strength~It checks how well learning carries over.",
    "Using a tennis forehand to help learn a badminton forehand is probably…~Positive transfer~Negative transfer~No retention~It helps the new skill.",
    "When an old habit gets in the way of a new technique, that is…~Negative transfer~Positive transfer~Bilateral transfer~It makes learning harder.",
    "Learning with the right hand and then doing better with the left hand is…~Bilateral transfer~Negative transfer~Retention loss~The transfer is from one side to the other.",
    "A player looks great at the end of practice but poor a week later. This shows…~Performance was not the same as learning~Great learning~Only bad luck~Short-term results can fool you.",
    "The specificity of learning principle says practice should be…~Similar to the real conditions of the skill~Totally different from the real skill~Very short~Practice what you will actually do."]);
  const b5 = T("Oxygen delivery and extraction", "🩸", "VO2 depends on how much blood the heart pumps and how much oxygen the muscles pull out of it.",
    "The <b>Fick equation</b>: <b>VO2 = cardiac output × a-vO2 difference</b>. The <b>a-vO2 difference</b> is how much oxygen the tissues remove from the blood. Cardiac output is <b>central</b> (the heart); capillaries and mitochondria are <b>peripheral</b>. Max heart rate changes little with training, so a higher VO2 max comes mainly from a bigger <b>stroke volume</b> and better extraction. <b>Hemoglobin</b> carries oxygen.",
    "Ask whether the factor belongs to the heart or the muscles.",
    "If a person pumps more blood and also pulls more oxygen from each liter, VO2 climbs for both reasons.", [
    "The Fick equation says VO2 equals…~Cardiac output × a-vO2 difference~Heart rate ÷ stroke volume~Ventilation × temperature~It multiplies how much blood flows by how much O2 is taken.",
    "The a-vO2 difference measures…~How much oxygen tissues remove from the blood~Blood pressure~Bone density~Arterial minus venous oxygen.",
    "Which part of the Fick equation is mostly central, from the heart?~Cardiac output~a-vO2 difference~Mitochondrial density~Think about pumping.",
    "A peripheral adaptation that raises a-vO2 difference is…~More capillaries and mitochondria in muscle~A larger left ventricle~A higher maximum heart rate~It happens in the muscle, not the heart.",
    "Hemoglobin's main job is to…~Carry oxygen in red blood cells~Make ATP directly~Store calcium~It is in the red cells.",
    "Max heart rate changes little with training, so higher VO2 max mainly comes from higher…~Stroke volume~Height~Resting temperature~Cardiac output has two parts, and one stays almost fixed.",
    "During hard exercise, a-vO2 difference gets…~Larger~Zero~Smaller~Working muscles take more oxygen out of the blood.",
    "Cardiac output equals…~Heart rate times stroke volume~Stroke volume divided by heart rate~Heart rate plus stroke volume~Beats per minute times the amount per beat."]);
  const b6 = T("Ventilation and gas exchange", "🌬️", "Breathing moves air, but the exchange of gases happens in tiny structures called <b>alveoli</b>.",
    "<b>Minute ventilation = tidal volume × breathing rate.</b> Oxygen and carbon dioxide move by <b>diffusion</b> down pressure gradients across the alveoli and capillaries. During hard exercise <b>chemoreceptors</b> detect rising CO2 and acidity and drive breathing faster. At the <b>ventilatory threshold</b> breathing rises faster than oxygen uptake. The <b>diaphragm</b> is the main muscle of quiet breathing.",
    "Ask whether it is about where, how, or how much.",
    "If tidal volume is 1 L and the rate is 10 breaths a minute, minute ventilation is 10 L a minute.", [
    "Gas exchange between lungs and blood happens in the…~Alveoli~Bronchi~Trachea~They are the tiny air sacs.",
    "Oxygen moves from alveoli into blood by…~Diffusion down a pressure gradient~Active pumping using ATP~Muscle squeezing the capillary~Gases spread from high to low pressure.",
    "Minute ventilation equals…~Tidal volume × breathing rate~Heart rate × stroke volume~Vital capacity ÷ time~Volume per breath times breaths per minute.",
    "At the ventilatory threshold, ventilation…~Begins to rise faster than oxygen uptake~Stops rising~Falls to resting levels~There is a break point in the line.",
    "Rising CO2 and acidity drive breathing harder because…~Chemoreceptors sense them~Bones stretch~The skin sweats~Special sensors detect chemicals.",
    "The main muscle of quiet breathing is the…~Diaphragm~Biceps~Deltoid~It sits under the lungs.",
    "Breathing rate rises during exercise to…~Supply oxygen and remove carbon dioxide~Cool the heart only~Grow bones~It handles both gases.",
    "Exercise-induced bronchoconstriction is…~A narrowing of the airways triggered by exercise~A muscle tear~A bone break~It affects breathing tubes."]);
  const b7 = T("Hormones and exercise", "🧬", "Hormones are chemical messengers. Exercise changes many of them.",
    "<b>Epinephrine (adrenaline)</b> raises heart rate and releases fuel. <b>Cortisol</b> is a stress hormone that frees energy but stays harmful if chronically high. <b>Insulin</b> lowers blood glucose, and exercise makes muscles more insulin sensitive. <b>Glucagon</b> raises blood glucose. <b>Growth hormone</b> and <b>testosterone</b> support building tissue. <b>ADH</b> helps the body keep water.",
    "Ask what the hormone does to fuel, heart rate, or water.",
    "During a sprint, epinephrine surges so the heart beats faster and stored fuel is released.", [
    "Which hormone surges to raise heart rate and release fuel in a sprint?~Epinephrine~Insulin~Melatonin~Also called adrenaline.",
    "Insulin mainly…~Lowers blood glucose by helping cells take it up~Raises blood glucose~Raises heart rate~It moves sugar from blood into cells.",
    "Glucagon mainly…~Raises blood glucose~Lowers blood glucose~Builds bone~It does the opposite of insulin.",
    "Regular exercise makes muscles…~More sensitive to insulin~Less sensitive to insulin~Unaffected~Muscle cells respond better.",
    "Cortisol is often called the…~Stress hormone~Sleep hormone~Growth bone hormone~It rises during stress.",
    "Chronically high cortisol from overtraining and stress can…~Impair recovery~Make recovery perfect~Stop all sweating~Too much of a stress signal is not good.",
    "ADH (antidiuretic hormone) helps the body…~Keep water~Burn fat~Build bone~It reduces water loss in urine.",
    "Growth hormone and testosterone support…~Building tissue~Losing hearing~Lowering temperature~They are anabolic."]);
  const b8 = T("Self-talk and cue words", "🗣️", "What you say to yourself can change how you perform.",
    "<b>Instructional</b> self-talk gives technique cues ('elbow high'). <b>Motivational</b> self-talk boosts effort and mood ('keep going'). Instructional talk suits precise, skilled tasks; motivational talk suits strength and endurance tasks. Good cue words are <b>short</b> and linked to the right action. <b>Thought stopping</b> interrupts negative thoughts and replaces them. Negative self-talk tends to lower confidence.",
    "Ask whether the phrase teaches an action or boosts effort.",
    "A swimmer says 'long and smooth' while stroking, which is a short cue tied to the technique she wants.", [
    "Self-talk like 'heels down, smooth swing' is…~Instructional self-talk~Motivational self-talk~Negative self-talk~It tells what technique to use.",
    "'You can do this, keep pushing!' is…~Motivational self-talk~Instructional self-talk~Thought stopping~It lifts effort and mood.",
    "Instructional self-talk suits…~Fine, precise skills like a golf putt~Only endurance tasks~Nothing~It cues technique.",
    "Motivational self-talk often helps with…~Strength and endurance tasks~Precision skills only~Balance only~It helps push effort.",
    "Thought stopping means…~Interrupting a negative thought and replacing it~Thinking only about winning~Stopping practice~You cut in and swap the thought.",
    "A cue word works best when it is…~Short and linked to the right action~Long and complicated~Unrelated to the task~Think about how quickly you can say it mid-skill.",
    "Negative self-talk like 'I always miss' tends to…~Lower confidence and performance~Raise confidence~Improve technique~It undermines belief.",
    "Practicing self-talk in training helps because…~It becomes automatic by competition~It is banned in games~It lowers skill~Rehearsal makes it ready."]);
  const b9 = T("Warm-up science and potentiation", "🔥", "A warm-up is more than a habit. It changes the body in useful ways.",
    "A <b>dynamic warm-up</b> raises muscle temperature, speeds nerve signals and rehearses movement patterns. Holding static stretches for about a minute or more right before power events can <b>slightly reduce</b> power. <b>PAPE</b> (post-activation performance enhancement) means a heavy contraction can improve later explosive work after a suitable rest. <b>RAMP</b> = Raise, Activate and Mobilize, Potentiate.",
    "Ask whether the activity prepares the body or tires it.",
    "A sprinter jogs, does leg swings and bounds, then does a few strides before the race: all dynamic.", [
    "A good dynamic warm-up mainly…~Raises muscle temperature and prepares movement patterns~Lowers heart rate to resting~Uses only long static stretches~It gets the body ready to move.",
    "Long static stretches right before a power event can…~Slightly reduce power output~Greatly increase power~Be dangerous in every case~Research found a small drop in power.",
    "PAPE stands for post-activation…~Performance enhancement~Perspiration exercise~Protein energy~It is about improved performance.",
    "PAPE involves…~A heavy contraction improving later explosive performance~Resting for a week~Doing no activity~It follows a heavy effort.",
    "For potentiation to beat fatigue you usually need…~A suitable rest after the heavy effort~No rest at all~An hour of rest~Fatigue fades faster than potentiation.",
    "A warm muscle contracts and relaxes faster because…~Nerve signals and chemical reactions are faster at higher temperature~Bones get softer~Blood turns into water~Heat speeds chemistry.",
    "RAMP stands for…~Raise, Activate and Mobilize, Potentiate~Run, Aim, Move, Pause~Rest, Adapt, Maximize, Perform~Each letter is a warm-up step.",
    "Which is a dynamic warm-up drill?~Walking lunges with a twist~Holding a hamstring stretch for two minutes~Sitting in a chair~Dynamic means moving."]);
  const b10 = T("Return-to-play protocols", "🚦", "After a concussion or other injury, athletes return step by step, not all at once.",
    "A graded plan raises load slowly while watching for symptoms. A concussion protocol steps through symptom-limited activity, light aerobic exercise, sport-specific drills, non-contact training, full-contact practice and then game play. Each step lasts <b>at least 24 hours</b>. If symptoms come back, drop to the previous step. A <b>qualified health professional</b> clears the athlete. Returning too soon raises the risk of re-injury.",
    "Ask whether the choice is slow and checked or fast and risky.",
    "A runner with a calf strain walks, then jogs, then does hard sprints only when each stage feels fine and the leg passes strength tests.", [
    "In a stepwise return-to-play plan, if symptoms return the athlete should…~Drop back to the previous step after rest~Go forward faster~Ignore it~Return to the stage that was symptom-free.",
    "Each step in a concussion return-to-play protocol usually lasts at least…~24 hours~1 hour~1 minute~Steps are spread over days.",
    "Which step comes before full-contact practice?~Non-contact training drills~Full competition~Nothing comes before it~Contact is built up gradually.",
    "Who should clear an athlete to return after a concussion?~A qualified health professional~The athlete alone~The opposing coach~The decision needs trained medical judgment.",
    "An athlete with a suspected concussion should…~Be removed from play right away~Finish the match~Play only half~When in doubt, sit them out.",
    "A good return criterion for a leg injury is…~Full range of motion, near-equal strength and passing sport tests~Feeling brave~A date on the calendar only~Use measurable tests, not just time.",
    "Returning to play too soon increases the risk of…~Re-injury~Fitness~Sleep quality~The tissue may not be ready.",
    "The aim of a graded return is to…~Rebuild load gradually while monitoring symptoms~Test courage~Skip rehab~Slow and watched."]);
  const b11 = T("Hypothesis testing and p-values", "📈", "Researchers use <b>hypothesis tests</b> to judge whether a result could be due to chance.",
    "The <b>null hypothesis</b> says there is no effect or difference. The <b>p-value</b> is the probability of seeing data at least this extreme <b>if the null hypothesis were true</b>. If p is below the chosen <b>alpha</b> (often 0.05), the result is called <b>statistically significant</b>. A small p does not show the effect is large or important, and a large p does not prove the null.",
    "Ask what p measures and compare it with alpha.",
    "If a study of two warm-ups gives p = 0.30, the difference seen could easily happen by chance, so there is not enough evidence to claim an effect.", [
    "The null hypothesis usually states that…~There is no effect or difference~The treatment works~The sample is large~It is the 'nothing is going on' claim.",
    "A p-value of 0.03 with alpha = 0.05 is…~Statistically significant~Not significant~Impossible~Compare p with alpha.",
    "The p-value is the probability of…~Seeing data this extreme if the null were true~The null hypothesis being true~The result being important~It is about the data, given the null.",
    "A very small p-value does NOT tell you…~How large or important the effect is~That any data were collected~Whether the number is below alpha~It cannot give effect size.",
    "Which p-value gives the strongest evidence against the null?~0.001~0.04~0.40~Smaller p means less compatible with the null.",
    "Alpha (α) is…~The cutoff chosen before the test, often 0.05~The sample size~The mean~It is a threshold.",
    "A non-significant result (p = 0.20) means…~There was not enough evidence to reject the null~The null is proven true~The study is worthless~Absence of evidence is not proof.",
    "With the same true effect, a larger sample makes a significant result…~More likely~Less likely~Impossible~More data gives more power."]);

  const g_fick = N("Fick equation", "🩸", "The <b>Fick equation</b> links oxygen use to blood flow and extraction.",
    "<b>VO2 = cardiac output × a-vO2 difference.</b> With cardiac output in L/min and the a-vO2 difference in ml of O2 per liter of blood, VO2 comes out in ml/min.",
    "Multiply the two numbers, or divide to find the missing one.", () => {
    const Q1 = pick([15, 20, 25, 30]), d = pick([100, 120, 140, 150, 160]);
    if (ri(1, 2) === 1) return Q(`Cardiac output is ${Q1} L/min and the a-vO2 difference is ${d} ml per liter. What is VO2 in ml/min?`, "🩸", Q1 * d,
      "VO2 is cardiac output times a-vO2 difference.", "Multiply the L/min by the ml per liter.", "Example: 20 L/min and 150 ml/L: 20 × 150 = 3000 ml/min. Now do yours.");
    return Q(`VO2 is ${Q1 * d} ml/min and the a-vO2 difference is ${d} ml per liter. What is cardiac output in L/min?`, "🩸", Q1,
      "Rearrange the equation to find the missing part.", "Divide VO2 by the a-vO2 difference.", "Example: 3200 ml/min with 160 ml/L: 3200 ÷ 160 = 20 L/min. Now do yours.");
  });
  const g_rer = N("Respiratory exchange ratio", "💨", "The <b>respiratory exchange ratio (RER)</b> compares CO2 produced to O2 used. It hints at the fuel being burned.",
    "<b>RER = VCO2 ÷ VO2.</b> About 0.7 means mostly fat; about 1.0 means mostly carbohydrate. Values between 0.7 and 1.0 mean a mix.",
    "Divide the CO2 by the O2.", () => {
    const vo2 = pick([2000, 3000, 4000]), r = pick([0.7, 0.8, 0.9, 1]);
    if (ri(1, 2) === 1) return Q(`An athlete uses ${vo2} ml/min of O2 and produces ${Math.round(vo2 * r)} ml/min of CO2. What is the RER? (CO2 ÷ O2)`, "💨", r,
      "RER is a ratio of CO2 to O2.", "Divide the CO2 by the O2; the answer is between 0.7 and 1.", "Example: 1500 CO2 and 2000 O2: 1500 ÷ 2000 = 0.75. Now do yours.");
    return Q(`An athlete uses ${vo2} ml/min of O2 and has an RER of ${r}. How many ml/min of CO2 are produced?`, "💨", Math.round(vo2 * r),
      "CO2 = RER × O2.", "Multiply the RER by the O2.", "Example: RER 0.8 and 2000 O2: 0.8 × 2000 = 1600. Now do yours.");
  });
  const g_d = N("Effect size (Cohen's d)", "📏", "A p-value says whether an effect exists; <b>effect size</b> says how big it is. A common one is <b>Cohen's d</b>.",
    "<b>d = (mean of group A − mean of group B) ÷ standard deviation.</b> Rough guide: 0.2 small, 0.5 medium, 0.8 large.",
    "Subtract the means first, then divide by the SD.", () => {
    const sd = ri(2, 6), d = ri(1, 3), b = ri(30, 60);
    if (ri(1, 2) === 1) return Q(`Group A averaged ${b + d * sd} and group B averaged ${b}. The standard deviation is ${sd}. What is Cohen's d?`, "📏", d,
      "Find the difference between the means.", "Divide that difference by the SD.", "Example: means 50 and 44, SD 3: difference 6, 6 ÷ 3 = 2. Now do yours.");
    return Q(`Cohen's d is ${d} and the standard deviation is ${sd}. How big is the difference between the two means?`, "📏", d * sd,
      "Difference = d × SD.", "Multiply d by the SD.", "Example: d = 2, SD = 4: difference 8. Now do yours.");
  });
  const g_se = N("Standard error", "🎯", "The <b>standard error</b> tells how precisely a sample mean estimates the real mean. Bigger samples give smaller errors.",
    "<b>SE = SD ÷ √n.</b> For a sample of 16, √16 = 4. Square roots to know: √4 = 2, √9 = 3, √16 = 4, √25 = 5, √36 = 6, √49 = 7, √64 = 8, √100 = 10.",
    "Find the square root of n, then divide the SD by it.", () => {
    const n = pick([4, 9, 16, 25, 36, 49, 64, 100]), rt = Math.round(Math.sqrt(n)), se = ri(1, 5);
    return Q(`A sample of n = ${n} athletes has a standard deviation of ${se * rt}. What is the standard error?`, "🎯", se,
      "SE is the SD divided by the square root of n.", `The square root of ${n} is ${rt}; divide the SD by that.`, "Example: SD 12, n = 9: √9 = 3, 12 ÷ 3 = 4. Now do yours.");
  });
  const g_jump = N("Jump height from flight time", "🦘", "Jump height can be estimated from how long you are in the air, with no ruler needed.",
    "From h = g × t² ÷ 8 with g = 10, jump height in centimeters ≈ <b>125 × t²</b>, where t is the flight time in seconds. Square the time first.",
    "Square the time, then multiply by 125.", () => {
    const t = pick([0.2, 0.4, 0.6, 0.8]);
    if (ri(1, 2) === 1) return Q(`A jumper reaches ${Math.round(125 * t * t)} cm. Using height (cm) = 125 × t², how many seconds were they in the air?`, "🦘", t,
      "Divide the height by 125 to find t².", "Then find the decimal that multiplied by itself gives that number (a tenth-of-a-second value).", "Example: for a 125 cm result: 125 ÷ 125 = 1, and 1 × 1 = 1, so t is 1 s. Now do yours.");
    return Q(`A jumper is in the air for ${t} s. Using height (cm) = 125 × t², how high did they jump in cm?`, "🦘", Math.round(125 * t * t),
      "Square the flight time first.", "Multiply that square by 125.", "Example: t = 0.4 s: 0.4 × 0.4 = 0.16, 125 × 0.16 = 20 cm. Now do yours.");
  });
  const g_rr = N("Relative risk", "⚠️", "Researchers compare injury risk between groups with <b>relative risk</b>.",
    "<b>Risk = injured ÷ athletes.</b> <b>Relative risk = risk in group A ÷ risk in group B.</b> A relative risk of 2 means group A has twice the risk.",
    "Find each risk, then divide one by the other.", () => {
    const rb = ri(2, 6), rr = ri(2, 4), ra = rb * rr;
    if (ri(1, 2) === 1) return Q(`Out of 100 athletes who did not warm up, ${ra} were injured. Out of 100 who did the warm-up, ${rb} were injured. What is the relative risk (no warm-up ÷ warm-up)?`, "⚠️", rr,
      "Both groups have 100 athletes, so just compare the injured counts.", "Divide the injuries without the warm-up by the injuries with it.", "Example: 12 vs 4 per 100: 12 ÷ 4 = 3. Now do yours.");
    return Q(`The injury risk is ${rb}% in group B. Group A has a relative risk of ${rr} compared with group B. What is the risk in group A, in percent?`, "⚠️", ra,
      "Relative risk tells how many times bigger the risk is.", "Multiply group B's percent by the relative risk.", "Example: 5% and relative risk 3: 5 × 3 = 15%. Now do yours.");
  });
  const g_dehyd = N("Percent dehydration", "💧", "Athletes can estimate fluid loss by weighing before and after a session.",
    "<b>Percent body mass lost = mass lost ÷ starting mass × 100.</b> Losing about 2% or more of body mass in fluid can reduce performance. 1 kg of lost mass is about 1 liter of fluid.",
    "Divide the loss by the starting mass, then multiply by 100.", () => {
    const start = pick([50, 100, 200]), pct = start === 50 ? pick([2, 4]) : ri(1, 4), loss = start * pct / 100;
    if (ri(1, 2) === 1) return Q(`An athlete weighs ${start} kg before a session and loses ${loss} kg of fluid. What percent of body mass is that?`, "💧", pct,
      "Compare the loss with the starting mass.", "Loss ÷ start × 100.", "Example: 2 kg from 100 kg: 2 ÷ 100 × 100 = 2%. Now do yours.");
    return Q(`An athlete weighs ${start} kg and loses ${pct}% of body mass in sweat. How many kilograms is that?`, "💧", loss,
      "Find the percent of the starting mass.", "Multiply the starting mass by the percent, then divide by 100.", "Example: 4% of 50 kg: 50 × 4 ÷ 100 = 2 kg. Now do yours.");
  });

  // ================= LEVEL 30 =================
  const c1 = T("Sliding filament theory", "🧵", "A muscle fiber is packed with repeating units called <b>sarcomeres</b>. They explain how muscles shorten.",
    "Thin <b>actin</b> and thick <b>myosin</b> filaments slide past each other; the filaments themselves do not shorten. Myosin heads attach to actin and form <b>cross-bridges</b>, then pull. <b>Calcium</b> binds <b>troponin</b> to uncover binding sites. <b>ATP</b> lets the myosin head detach and reset. A sarcomere runs from <b>Z-line to Z-line</b>. The A band stays the same length during contraction.",
    "Ask which part moves, which part stays, and what powers the cycle.",
    "Think of two combs with their teeth interlocked: sliding them together makes the whole shorter without shortening either comb.", [
    "In the sliding filament theory a muscle shortens when…~Actin and myosin filaments slide past each other~The filaments themselves get shorter~Bones slide inside the muscle~Neither filament changes length.",
    "The thick filament is made of…~Myosin~Actin~Collagen~Its heads form cross-bridges.",
    "The thin filament is made mainly of…~Actin~Myosin~Keratin~Troponin sits on it, but it is mostly another protein.",
    "Myosin heads attach to actin and form…~Cross-bridges~Tendons~Ligaments~They bridge the two filaments.",
    "Calcium ions allow contraction by binding to…~Troponin, uncovering binding sites on actin~Bone~Insulin~They open the way for myosin.",
    "ATP is needed to…~Detach the myosin head from actin and reset it~Build bone~Make the Z-line~Without it, muscles stay stuck.",
    "During contraction the A band…~Stays the same length~Gets shorter~Disappears~The thick filaments do not shorten.",
    "A sarcomere is bounded by…~Z-lines~Tendons~Skin~Z-line to Z-line."]);
  const c2 = T("Adaptations to endurance training", "❤️‍🔥", "Months of endurance training change the heart, blood and muscles.",
    "Typical changes: <b>lower resting heart rate</b>, <b>larger stroke volume</b> (bigger left ventricle chamber, called athlete's heart, a healthy adaptation), greater <b>plasma volume</b>, more <b>capillaries</b>, more and larger <b>mitochondria</b>, higher <b>oxidative enzymes</b> and more fat use, which spares muscle glycogen.",
    "Ask whether the change is in the heart, the blood, or the muscle cell.",
    "A recreational runner who trains for months often finds that the same easy pace now has a lower heart rate.", [
    "Endurance training typically changes resting heart rate by…~Lowering it~Raising it~Stopping it~The heart pumps more per beat.",
    "Mitochondria in trained muscle become…~More numerous and larger~Fewer~Unchanged~They make aerobic energy.",
    "Trained athletes use more fat at a given pace, which…~Spares muscle glycogen~Uses glycogen faster~Eliminates carbohydrates~Fat use is an energy saver.",
    "Plasma volume with endurance training…~Increases~Drops to zero~Does not matter~More blood fluid helps stroke volume.",
    "More capillaries around muscle fibers help by…~Improving oxygen delivery and waste removal~Making bones denser~Reducing blood flow~They are tiny vessels.",
    "The left ventricle of an endurance athlete often shows…~A larger chamber volume~A smaller chamber~No change at all~It holds more blood per beat.",
    "The 'athlete's heart' is…~A healthy adaptation to training~A disease~A heart attack~It is a normal response in athletes.",
    "Higher oxidative enzyme levels mean muscles can…~Make ATP aerobically at a higher rate~Make less ATP~Store extra water~Oxidative means using oxygen."]);
  const c3 = T("Altitude and acclimatization", "🏔️", "High places have less oxygen available per breath, and the body adjusts.",
    "Air is still about <b>21% oxygen</b> at altitude, but lower pressure means a lower <b>partial pressure</b> of oxygen. VO2 max drops. The body adapts: faster breathing first, then more <b>EPO</b> and red blood cells over <b>weeks</b>. Athletes may <b>live high, train low</b>. To prevent acute mountain sickness, <b>ascend gradually</b>.",
    "Ask if it is about the percent of oxygen or the pressure pushing it into the blood.",
    "A runner arriving at 2,500 m feels breathless at an easy pace, but after weeks the same pace feels easier.", [
    "At altitude, the percentage of oxygen in the air is about…~21%, the same as at sea level~10%~50%~Only the pressure changes.",
    "Why is it harder to get oxygen at altitude?~Lower pressure gives a lower partial pressure of oxygen~The air has a different percent of oxygen~The air is thicker~Think pressure, not percent.",
    "The hormone that increases red blood cell production at altitude is…~EPO (erythropoietin)~Insulin~Cortisol~It is made mostly by the kidneys.",
    "'Live high, train low' means…~Sleep at altitude and train at lower altitude~Train at altitude only~Live at sea level only~Two places, two heights.",
    "A first adaptation to altitude is…~Faster breathing~A smaller heart~Fewer red cells~Ventilation rises quickly.",
    "Red blood cell increases from altitude take…~Weeks~Seconds~A single breath~It is a slow adaptation.",
    "A key way to prevent acute mountain sickness is to…~Ascend gradually~Climb as fast as possible~Avoid all fluids~Give the body time.",
    "VO2 max at high altitude, compared with sea level, is generally…~Lower~Higher~The same~There is less oxygen pressure."]);
  const c4 = T("Learning curves and plateaus", "📉", "If you plot performance against practice, you get a <b>learning curve</b>.",
    "Gains are usually biggest at the start and get smaller later (the <b>power law of practice</b>). A time or error score goes <b>down</b>; a points score goes up. A <b>plateau</b> is a stretch with little visible gain, often while the learner consolidates or needs a new strategy or challenge. It is not the end of learning.",
    "Ask what happens to the size of improvements as practice goes on.",
    "A new typist jumps from 10 to 25 words a minute in the first weeks, but going from 60 to 65 can take months.", [
    "A typical learning curve shows the biggest gains…~Early in practice~Late in practice~In equal steps~Beginners improve fastest.",
    "The power law of practice says improvement…~Slows as practice builds up~Speeds up forever~Is always the same~Each extra hour gives less.",
    "A plateau in a learning curve is…~A period with little visible improvement~A sudden drop to zero~The end of all learning~The curve goes flat for a while.",
    "A plateau may happen when…~The learner is consolidating or needs a new strategy~The brain stops working~The skill is gone~There are positive explanations.",
    "A curve with gains that get smaller over time is called…~Negatively accelerated~Positively accelerated~Straight~Each step is smaller than the last.",
    "A learning curve plotted as errors per trial usually…~Goes down~Goes up~Stays flat~Fewer mistakes as the skill improves.",
    "Deliberate practice means…~Focused practice on weaknesses with feedback~Just playing games~Resting~It is purposeful.",
    "To break through a plateau, a coach might…~Change the practice or add new challenges~Repeat the exact same drill~Cancel practice~New stimulus can restart progress."]);
  const c5 = T("Social facilitation and social loafing", "👥", "Other people change how hard and how well we perform.",
    "<b>Social facilitation</b> (Zajonc): an audience raises arousal, which usually <b>helps simple or well-learned</b> skills but can <b>hurt new or complex</b> ones. <b>Social loafing</b> is lower individual effort in a group when contributions are not identifiable. The <b>Ringelmann effect</b>: in rope pulling each person pulls less as the group grows. Reduce loafing by recording individual contributions and giving roles.",
    "Ask whether the idea is about being watched, or about hiding in a group.",
    "A relay team that posts each swimmer's split time makes it easy to see everyone's effort.", [
    "Social facilitation says an audience usually…~Helps simple or well-learned tasks~Helps every task~Never matters~Arousal helps tasks that are automatic.",
    "An audience may hurt performance of…~New or complex skills~Well-learned skills~Walking~Extra arousal can disrupt the unfamiliar.",
    "Why would an audience change performance, according to Zajonc?~It raises arousal~It lowers temperature~It removes the rules~Think of a change in body state.",
    "Social loafing is…~Reduced individual effort in a group~Resting after practice~Practicing alone~Effort drops when it is hard to tell who did what.",
    "The Ringelmann effect showed that in rope pulling each person…~Pulled less as the group got bigger~Pulled harder~Pulled the same~Think about effort per person.",
    "A coach can reduce social loafing by…~Recording each player's individual contribution~Stopping all feedback~Giving no roles~Make effort visible.",
    "Social loafing is more likely when…~Individual effort is hard to identify~Everyone is tracked~The athlete is alone~Nobody can tell who did what.",
    "A relay team posts each runner's split time. This most likely…~Reduces social loafing~Increases social loafing~Does nothing~Everyone's effort is visible."]);
  const c6 = T("Tapering and peaking", "🎢", "Before an important event, athletes cut back training on purpose. This is a <b>taper</b>.",
    "A taper usually lasts about <b>one to three weeks</b>. Training <b>volume</b> drops (often about 40 to 60 percent) while <b>intensity</b> and frequency stay mostly the same. The <b>fitness-fatigue model</b> says performance = fitness − fatigue. In a taper fatigue falls faster than fitness, so performance can rise. <b>Peaking</b> means being at best form for the key event.",
    "Ask what is cut, what stays, and what fatigue does.",
    "A swimmer trains 20 hours a week, then drops to 10 hours for the last two weeks but keeps the fast sets.", [
    "In a taper, athletes usually reduce…~Volume while keeping intensity~Intensity while keeping volume~Everything to zero~Cut the amount, keep the quality.",
    "A taper commonly lasts…~One to three weeks~One day~Six months~Long enough to shed fatigue.",
    "The aim of tapering is to…~Reduce fatigue while keeping fitness~Build brand new fitness~Gain weight~Fatigue is the target.",
    "The fitness-fatigue model says performance equals…~Fitness minus fatigue~Fitness plus fatigue~Fatigue only~Fatigue hides fitness.",
    "In a taper, fatigue falls faster than fitness, so performance can…~Improve~Fall sharply~Stay exactly the same~Less tired with the same fitness.",
    "A typical volume reduction during a taper is…~About 40 to 60 percent~About 1 percent~100 percent~About half.",
    "Cutting training frequency to zero in a taper is…~Not usually recommended~Best practice~Required~Keep some training going.",
    "Peaking means…~Being at best form for a key event~Climbing a mountain~The hardest training week~Timing the best performance."]);
  const c7 = T("Concurrent training", "⚖️", "Many athletes need both strength and endurance. Doing both can cause trouble.",
    "Combining high-volume endurance with strength training can blunt strength and power gains. This is the <b>interference effect</b>, first reported by Hickson in 1980. Endurance work activates <b>AMPK</b>, which may suppress <b>mTOR</b>, a pathway for muscle protein synthesis. To reduce interference: separate sessions by several hours, keep endurance volume reasonable, and prioritize the main goal.",
    "Ask which quality the plan prioritizes and how the sessions are spaced.",
    "A rugby player lifts in the morning and runs conditioning in the evening, with a long gap between them.", [
    "The interference effect means…~Endurance training can blunt strength gains~Strength training always ruins endurance~The two always help each other~Doing both can compete.",
    "Who first reported the interference effect in 1980?~Robert Hickson~Isaac Newton~Albert Bandura~He studied combined strength and endurance training.",
    "To reduce interference you can…~Separate sessions by several hours~Do both with no rest~Remove all rest days~Space them out.",
    "Which signaling pathway is linked to endurance adaptations and may suppress mTOR?~AMPK~Insulin only~ATP~Its name starts with an A.",
    "mTOR is a pathway linked to…~Muscle protein synthesis~Hearing~Blood clotting~Building muscle.",
    "Interference is bigger when endurance work is…~High in volume and frequent~Very small~Absent~More endurance, more conflict.",
    "A rugby player who needs both qualities should…~Plan both and manage volume and timing~Do only one~Mix them randomly~Planning is the answer.",
    "For a goal of maximal strength, a coach would likely…~Limit the endurance volume~Maximize running volume~Skip lifting~Protect the main goal."]);
  const c8 = T("Energy availability and RED-S", "🍽️", "Athletes need enough fuel for training <b>and</b> for the body's basic jobs.",
    "<b>Energy availability</b> = (energy eaten − energy used in exercise) ÷ fat-free mass. Low energy availability (below about 30 kcal per kg of fat-free mass per day) can lead to <b>RED-S</b>, Relative Energy Deficiency in Sport. It can affect bone health, hormones, immunity, mood and performance, in athletes of <b>any gender</b>. Help comes from a sports doctor and a dietitian.",
    "Ask what energy is left over after exercise for the body's needs.",
    "A distance runner who trains hard but eats too little may get stress fractures and feel tired all the time.", [
    "RED-S stands for relative energy…~Deficiency in sport~Drink in snacks~Distance in speed~It is about too little energy.",
    "RED-S is caused by…~Low energy availability~Too much sleep~Too much water~The body lacks fuel.",
    "Energy availability is…~Energy intake minus exercise energy, relative to fat-free mass~Training time~Sleep time~Food in, exercise out.",
    "RED-S can affect…~Bone health, immunity and hormones~Only the knees~Nothing~It has many body systems.",
    "RED-S affects…~Athletes of any gender~Only men~Only women~Anyone can be affected.",
    "A warning sign of RED-S is…~Frequent injuries, fatigue and stress fractures~Constant improvement~Gaining speed every week~Look for signs of a worn-down body.",
    "A first step in managing RED-S is…~Raising energy intake and/or lowering training load with professional help~Training more~Eating less~Fix the energy gap.",
    "Which professionals should be involved in care?~A sports doctor and a dietitian~Only an opponent~Nobody~Medical and nutrition experts."]);
  const c9 = T("The evidence pyramid", "🔺", "Not all studies are equally trustworthy. The <b>evidence pyramid</b> ranks them.",
    "From weakest to strongest: expert opinion and <b>case reports</b>, case-control and <b>cohort</b> studies (follow a group over time), <b>randomized controlled trials (RCTs)</b>, and at the top <b>systematic reviews and meta-analyses</b>. A meta-analysis statistically combines many studies. <b>Random assignment</b> balances unknown differences; <b>blinding</b> keeps people from knowing who gets which treatment.",
    "Ask how many people, how well controlled, and whether studies were combined.",
    "One coach saying a drill worked is weaker evidence than a controlled trial with random groups.", [
    "Which sits near the top of the evidence pyramid?~A systematic review or meta-analysis~A single case report~A personal opinion~It combines many studies.",
    "A meta-analysis…~Statistically combines results from several studies~Tests one person~Ignores data~Meta means a study of studies.",
    "RCT stands for…~Randomized controlled trial~Rapid cardio test~Resting count total~Random groups are part of its name.",
    "Random assignment in an RCT helps to…~Balance unknown differences between groups~Make every athlete the same~Remove the need for data~It spreads hidden differences evenly.",
    "A case report describes…~One or a few individuals~Thousands of people~A meta-analysis~It is very small.",
    "Which is usually the weakest evidence?~Expert opinion alone~An RCT~A systematic review~It is not backed by controlled data.",
    "A cohort study…~Follows a group over time~Gives everyone one treatment~Doesn't measure anything~Think of a group followed forward in time.",
    "Blinding in a trial means…~People do not know who gets which treatment~Closing your eyes during lifts~Hiding results forever~It reduces expectation effects."]);
  const c10 = T("Confounding and bias", "🕵️", "Good researchers watch for things that can fool them.",
    "A <b>confounder</b> is linked to both the cause and the effect, creating a false link (hot weather raises both ice cream sales and swimming accidents). <b>Correlation does not show causation.</b> <b>Selection bias</b>: the sample does not represent the group. <b>Survivorship bias</b>: only the successes are studied. <b>Publication bias</b>: positive results are published more. <b>Random assignment</b> reduces confounding.",
    "Ask what hidden third thing could explain both variables.",
    "People who join a gym program may already be healthier, so better health afterward does not prove the program caused it.", [
    "Ice cream sales and swimming accidents rise together in summer. Hot weather is a…~Confounding variable~Placebo~Dependent variable only~It links to both.",
    "Correlation between two variables shows…~They change together, not necessarily that one causes the other~One causes the other~Nothing at all~Be careful about cause.",
    "Survivorship bias occurs when…~Only the successful cases are studied~All cases are included~Groups are random~Failures are left out.",
    "Selection bias occurs when…~The sample does not represent the group~Everyone is included randomly~There is no data~Who is chosen matters.",
    "Studying only runners who finished a marathon to learn about training mistakes ignores those who dropped out. This is…~Survivorship bias~Blinding~Randomization~Dropouts are missing.",
    "Publication bias means…~Studies with positive results are more likely to be published~Journals publish every study~There is no bias~Think about which studies get printed.",
    "The best way to reduce confounding in an experiment is…~Random assignment to groups~Asking friends~Using larger shoes~It spreads hidden differences evenly.",
    "Volunteers who choose a new training program may already be keener, which is…~Self-selection bias~Perfect random sampling~A placebo~They selected themselves."]);
  const c11 = T("Tendinopathy and loading", "🦵", "Tendon pain is one of the most common overuse problems in sport.",
    "<b>Tendinopathy</b> develops when load exceeds what the tendon can handle. Treatment is built around <b>progressive loading</b>, not long complete rest. Isometric holds may ease pain early; heavy slow or eccentric work builds capacity. Sudden jumps in training load are a major risk factor. The <b>Achilles tendon</b> joins the calf muscles to the heel bone.",
    "Ask whether the tendon is being overloaded, or rebuilt gradually.",
    "A runner with sore Achilles tendons cuts mileage a little, adds calf raises and builds the load week by week.", [
    "Tendinopathy usually develops when…~Load exceeds the tendon's capacity~The tendon gets no load at all~Bones heal~Capacity is lower than demand.",
    "A key management principle is…~Progressive loading of the tendon~Complete rest for months~Ignoring symptoms~Rebuild load step by step.",
    "Isometric holds are sometimes used early because they…~May ease pain while still loading the tendon~Tear the tendon~Replace all rehab~They hold position without movement.",
    "Heavy slow resistance and eccentric exercise aim to…~Build the tendon's capacity~Weaken the tendon~Only test the tendon~They train the tendon to take more.",
    "Complete long-term rest of a painful tendon usually…~Lowers its capacity to handle load~Cures it fully~Strengthens it~Tendons need load to stay strong.",
    "A sudden big jump in training load is a common…~Risk factor~Treatment~Cure~It gives the tendon too little time to adapt.",
    "The Achilles tendon connects the…~Calf muscles to the heel bone~Thigh to the knee~Shoulder to the arm~It is at the back of the ankle.",
    "In many tendon rehab plans, mild pain that settles within a day is…~Often acceptable~Always a disaster~Impossible~Plans use pain as a guide."]);

  const h_st = N("Force from muscle size", "💪", "A bigger muscle cross-section can make more force. <b>Specific tension</b> is force per unit of cross-sectional area.",
    "<b>Force = specific tension × cross-sectional area.</b> With specific tension in N/cm² and area in cm², force is in newtons. Doubling the area doubles the maximum force.",
    "Multiply, or divide to find the area.", () => {
    const st = pick([20, 25, 30, 35]), A = ri(2, 12) * 5;
    if (ri(1, 2) === 1) return Q(`A muscle has a cross-sectional area of ${A} cm² and a specific tension of ${st} N/cm². What is its maximum force in newtons?`, "💪", st * A,
      "Force is tension times area.", "Multiply the N/cm² by the cm².", "Example: 40 cm² and 30 N/cm²: 40 × 30 = 1200 N. Now do yours.");
    return Q(`A muscle makes ${st * A} N of force at a specific tension of ${st} N/cm². What is its cross-sectional area in cm²?`, "💪", A,
      "Rearrange the formula to find the area.", "Divide the force by the specific tension.", "Example: 900 N at 30 N/cm²: 900 ÷ 30 = 30 cm². Now do yours.");
  });
  const h_taper = N("Taper volumes", "🎢", "Tapers cut training volume while keeping intensity.",
    "<b>Tapered volume = normal volume × (100 − cut%) ÷ 100.</b> If the plan cuts by the same percent again in week 2, apply it again to the new number. A 50% cut halves the volume.",
    "Find the percent that remains, then take that share.", () => {
    const V = pick([40, 60, 80, 100, 120, 160]), cut = pick([20, 40, 50, 60]);
    if (ri(1, 2) === 1) return Q(`A runner normally runs ${V} km a week and cuts the volume by ${cut}% in the taper. How many km is that week?`, "🏃", V * (100 - cut) / 100,
      "Work out what percent is left.", `${100 - cut}% remains, so take that share of the km.`, "Example: 100 km with a 30% cut: 70% remains, 70 km. Now do yours.");
    const W = pick([80, 120, 160, 240]); return Q(`A swimmer does ${W} km in a normal week. In a two-week taper each week is half the week before (50% cut each time). How many km in week 2 of the taper?`, "🏊", W / 4,
      "Halve once for week 1, then halve again.", "Halving twice equals dividing by 4.", "Example: 80 km: 40 then 20. Now do yours.");
  });
  const h_po2 = N("Oxygen pressure at altitude", "🏔️", "Air is about 21% oxygen at every height. What changes is the total pressure.",
    "<b>Partial pressure of oxygen (PO2) = 0.21 × barometric pressure.</b> At sea level the pressure is about 760 mmHg. Use 0.21 × pressure in mmHg, rounded as given.",
    "Multiply the pressure by 0.21.", () => {
    const P = pick([200, 300, 400, 500, 600, 700, 800, 900, 1000]);
    return Q(`At a certain place the air pressure is ${P} mmHg. Using PO2 = 0.21 × pressure, what is the oxygen partial pressure in mmHg?`, "🏔️", Math.round(P * 21 / 100),
      "Oxygen is 21% of the total pressure.", "Multiply by 21 and divide by 100, or by 0.21.", "Example: 100 mmHg: 0.21 × 100 = 21 mmHg. Now do yours.");
  });
  const h_wmean = N("Weighted mean of studies", "📚", "A meta-analysis gives bigger studies more weight.",
    "<b>Weighted mean = (n₁ × mean₁ + n₂ × mean₂) ÷ (n₁ + n₂).</b> A study with more people pulls the answer closer to its own mean.",
    "Multiply each mean by its group size, add, then divide by the total size.", () => {
    const s = ri(10, 40), k = ri(1, 5), small = 10, big = 30, flip = ri(1, 2) === 1;
    const mBig = s + 4 * k, mSmall = s;
    // weighted mean: (10*s + 30*(s+4k))/40 = s + 3k
    const n1 = flip ? small : big, m1 = flip ? mSmall : mBig, n2 = flip ? big : small, m2 = flip ? mBig : mSmall;
    return Q(`Study A has ${n1} athletes with a mean gain of ${m1}. Study B has ${n2} athletes with a mean gain of ${m2}. What is the weighted mean gain?`, "📚", s + 3 * k,
      "Each study counts in proportion to its size.", `Find ${n1} × ${m1} and ${n2} × ${m2}, add them, then divide by ${n1 + n2}.`, "Example: 10 people with mean 4 and 30 with mean 8: (40 + 240) ÷ 40 = 7. Now do yours.");
  });
  const h_sens = N("Sensitivity of a test", "🔍", "A screening test should catch the athletes who really have the problem. That ability is <b>sensitivity</b>.",
    "<b>Sensitivity = true positives ÷ (true positives + false negatives) × 100.</b> The bottom number is everyone who really has the problem. A high sensitivity means few cases are missed.",
    "Divide the number caught by the number who truly have the problem.", () => {
    const tot = pick([20, 40, 100]), pct = pick([70, 75, 80, 85, 90, 95]), tp = tot * pct / 100;
    if (ri(1, 2) === 1) return Q(`${tot} athletes truly have an injury. A test catches ${tp} of them. What is its sensitivity in percent?`, "🔍", pct,
      "Compare the number caught with the number who truly have the injury.", "Divide caught by total with the injury, then multiply by 100.", "Example: 50 athletes with injury, 40 caught: 40 ÷ 50 = 80%. Now do yours.");
    return Q(`A test has a sensitivity of ${pct}%. Of ${tot} athletes who truly have an injury, how many will it catch?`, "🔍", tp,
      "Find that percent of the people with the injury.", "Multiply the total by the percent and divide by 100.", "Example: 80% of 50 is 40. Now do yours.");
  });
  const h_ea = N("Energy availability", "🍽️", "Energy availability shows how much fuel is left for the body after exercise.",
    "<b>EA = (energy intake − exercise energy) ÷ fat-free mass (kg)</b>, in kcal per kg per day. About 45 is considered adequate, and below about 30 is low.",
    "Subtract the exercise energy first, then divide by fat-free mass.", () => {
    const ffm = pick([40, 45, 50, 60]), ea = pick([20, 25, 30, 35, 40, 45]), ex = pick([500, 600, 800, 1000]), intake = ea * ffm + ex;
    return Q(`An athlete eats ${intake} kcal a day, uses ${ex} kcal in exercise, and has ${ffm} kg of fat-free mass. What is the energy availability in kcal per kg per day?`, "🍽️", ea,
      "Take the exercise energy away from the intake first.", `Divide what is left by ${ffm}.`, "Example: 2600 eaten, 800 exercise, 40 kg: 1800 ÷ 40 = 45. Now do yours.");
  });
  const h_swc = N("Smallest worthwhile change", "🔬", "Is a change big enough to matter? Sports scientists use the <b>smallest worthwhile change (SWC)</b>.",
    "<b>SWC ≈ 0.2 × the between-athlete standard deviation.</b> A change smaller than the SWC may not be meaningful. If you know the SWC, the SD is 5 times larger.",
    "Take one fifth of the SD, or multiply the SWC by 5.", () => {
    const sd = ri(2, 12) * 5, swc = sd / 5;
    if (ri(1, 2) === 1) return Q(`The between-athlete SD of a jump test is ${sd} cm. Using SWC = 0.2 × SD, what is the SWC in cm?`, "🔬", swc,
      "0.2 means one fifth.", "Divide the SD by 5.", "Example: SD 20: 20 ÷ 5 = 4. Now do yours.");
    return Q(`The smallest worthwhile change is ${swc} cm and SWC = 0.2 × SD. What is the SD in cm?`, "🔬", sd,
      "The SD is the number that 0.2 of gives the SWC.", "Multiply the SWC by 5.", "Example: SWC 6 gives SD 30. Now do yours.");
  });

  // ================= lessons =================
  Object.assign(PE_LEVELS, {
    28: [
      L("Center of mass and stability", a1), L("Moment of inertia", f_inertia), L("Bone remodeling and Wolff's law", a2), L("Stages of motor learning", a3),
      L("Rate of force development", f_rfd), L("Feedback in motor learning", a4), L("Practice schedules", a5), L("Types of goals", a6),
      L("Distance during reaction time", f_react), L("Pressure, choking and coping", a7), L("Lactate threshold", a8), L("Relative and absolute VO2", f_vo2),
      L("Phases of tissue healing", a9), L("How muscles grow (hypertrophy)", a10), L("Calories from METs", f_met), L("Polarized training 80/20", f_pol),
      L("Angular velocity", f_angv), L("Work and power in a lift", f_pow),
      L("Mixed practice", MIX(a1, a3, a5, a7, a8, f_inertia, f_vo2)), L("Level 28 Challenge", MIX(a2, a4, a6, a9, a10, f_rfd, f_react, f_met, f_pol, f_angv, f_pow))
    ],
    29: [
      L("Muscle spindles and Golgi tendon organs", b1), L("Fick equation", g_fick), L("Open-loop and closed-loop control", b2), L("Schema theory and variable practice", b3),
      L("Respiratory exchange ratio", g_rer), L("Learning, retention and transfer", b4), L("Oxygen delivery and extraction", b5), L("Ventilation and gas exchange", b6),
      L("Standard error", g_se), L("Hormones and exercise", b7), L("Self-talk and cue words", b8), L("Effect size (Cohen's d)", g_d),
      L("Warm-up science and potentiation", b9), L("Return-to-play protocols", b10), L("Jump height from flight time", g_jump), L("Hypothesis testing and p-values", b11),
      L("Relative risk", g_rr), L("Percent dehydration", g_dehyd),
      L("Mixed practice", MIX(b1, b2, b4, b7, b8, g_fick, g_rer)), L("Level 29 Challenge", MIX(b3, b5, b6, b9, b10, b11, g_se, g_d, g_jump, g_rr, g_dehyd))
    ],
    30: [
      L("Sliding filament theory", c1), L("Force from muscle size", h_st), L("Adaptations to endurance training", c2), L("Altitude and acclimatization", c3),
      L("Oxygen pressure at altitude", h_po2), L("Learning curves and plateaus", c4), L("Social facilitation and social loafing", c5), L("Tapering and peaking", c6),
      L("Taper volumes", h_taper), L("Concurrent training", c7), L("Energy availability and RED-S", c8), L("Energy availability", h_ea),
      L("The evidence pyramid", c9), L("Confounding and bias", c10), L("Weighted mean of studies", h_wmean), L("Tendinopathy and loading", c11),
      L("Sensitivity of a test", h_sens), L("Smallest worthwhile change", h_swc),
      L("Mixed practice", MIX(c1, c2, c3, c4, c6, h_st, h_po2)), L("Level 30 Challenge", MIX(c5, c7, c8, c9, c10, c11, h_taper, h_ea, h_wmean, h_sens, h_swc))
    ]
  });
})();
