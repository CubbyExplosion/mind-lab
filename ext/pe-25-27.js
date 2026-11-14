// ext/pe-25-27.js  PE levels 25-27 (grade 12 both halves, college year 1 first half)
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

  // ================= LEVEL 25 =================
  const a1 = T("The gait cycle", "🚶", "Walking and running look simple, but scientists break them into repeating parts called the <b>gait cycle</b>.",
    "One cycle runs from one foot's <b>heel strike</b> to that same foot's next heel strike. It has a <b>stance phase</b> (foot on the ground, about 60% of walking) and a <b>swing phase</b> (foot in the air). A <b>stride</b> is two steps. Running adds a <b>flight phase</b> when both feet are off the ground.",
    "Ask: is the foot on the ground, in the air, or is it about counting steps?", "A physical therapist films a patient on a treadmill and counts how long the left foot stays down compared with the whole cycle.", [
    "One full gait cycle is measured from…~One heel strike to the next heel strike of the same foot~Toe-off of one foot to heel strike of the other~The middle of one step to the middle of the next",
    "In normal walking, about how much of the cycle is the stance phase?~About 60%~About 20%~About 90%~Most of the cycle, but not almost all.",
    "A stride is…~Two steps, from one foot's strike to that same foot's next strike~A single step with one foot~Only the swing phase",
    "Which phase does running have that walking does not?~A flight phase with both feet off the ground~A double support phase~A heel strike",
    "During the swing phase the foot is…~Off the ground and moving forward~Flat on the ground~Pushing hard against the ground",
    "In walking, double support means…~Both feet are on the ground at the same time~Both feet are in the air~The same foot touches the ground twice",
    "The moment the foot leaves the ground at the end of stance is called…~Toe-off~Heel strike~Midswing",
    "Cadence in walking and running is measured in…~Steps per minute~Meters per step~Newtons"]);
  const a2 = T("Anti-doping and supplements", "💊", "Elite sport has rules about what athletes may put in their bodies. Knowing them protects both fairness and health.",
    "The <b>World Anti-Doping Agency (WADA)</b> publishes the Prohibited List. Under <b>strict liability</b>, athletes are responsible for anything found in their body. A <b>TUE</b> (therapeutic use exemption) allows approved medicine for a real medical need. Supplements can be contaminated, so <b>food first</b> is the safest plan.",
    "Think about fairness, health and who is responsible.", "A teen swimmer wants a powder from a website. A sports dietitian checks the label and the independent testing seal first.", [
    "Which organization publishes the Prohibited List used in Olympic sport?~WADA, the World Anti-Doping Agency~WHO, the World Health Organization~FDA, the Food and Drug Administration~The name has the word doping in it.",
    "Strict liability means…~Athletes are responsible for whatever is found in their body~Only coaches are punished~Only intentional use is punished",
    "A TUE lets an athlete…~Use a banned medicine for a real medical need, with approval~Skip all drug tests~Take any supplement they like",
    "Why can a supplement be risky for an athlete?~It may contain an unlisted banned substance~Supplements are always checked by the government before sale~It is guaranteed to work better than food",
    "What is the safest first step to improve nutrition for sport?~Eat a balanced diet first (food first)~Buy a supplement for each goal~Skip meals before training",
    "Which of these has strong research support as a legal supplement for short, powerful efforts?~Creatine~A secret herbal blend~An energy shot with an unknown recipe~Look for the one with many studies behind it.",
    "Anti-doping rules exist mainly to…~Protect fair competition and athletes' health~Make sport more expensive~Stop athletes from training hard",
    "Before taking any supplement, a smart athlete should…~Ask a doctor or sports dietitian and look for independent testing~Trust the biggest claims on the label~Copy what a friend takes"]);
  const a3 = T("Mental imagery", "🧠", "Athletes can practice in their minds. <b>Imagery</b> means creating or re-creating an experience in your imagination.",
    "<b>Internal imagery</b> is seeing it through your own eyes; <b>external imagery</b> is watching yourself like a video. Good imagery uses <b>all senses</b>, is <b>vivid</b> and <b>controllable</b>, and matches real timing. The <b>PETTLEP</b> model says to make it close to real life. Imagery adds to physical practice but does not replace it.",
    "Ask: whose point of view is it, and does it copy the real situation?", "A diver sits by the pool, pictures the board, feels the spring, hears the water and runs the dive in real time.", [
    "Imagery from your own point of view, as if through your own eyes, is called…~Internal imagery~External imagery~Reverse imagery",
    "Watching yourself perform as if on a video screen is…~External imagery~Internal imagery~Physical practice",
    "Which is the best way to make imagery more effective?~Use all your senses and real timing~Imagine only the result, never the movement~Keep it vague and quick",
    "Imagery should be used…~Along with physical practice~Instead of all physical practice~Only after retiring",
    "Which of these is a use of imagery?~Rehearsing a skill and building confidence~Healing a broken bone~Growing muscles without training",
    "Imagining a calm, successful free throw before stepping to the line helps mainly with…~Confidence and focus~Making the hoop higher~Heart size",
    "PETTLEP is a model that tells athletes to make imagery…~Close to the real situation~As unreal as possible~Silent and still",
    "Controllability in imagery means…~You can steer the images the way you want~The images move on their own~You only see still pictures"]);
  const a4 = T("Agonists, antagonists and stabilizers", "💪", "Muscles never work alone. In every move, some muscles do the job, some give way and some hold you steady.",
    "The <b>agonist</b> (prime mover) causes the movement. The <b>antagonist</b> opposes it and relaxes or lengthens. <b>Synergists</b> help the agonist. <b>Stabilizers</b> hold other joints still. In a biceps curl, the biceps is the agonist and the triceps is the antagonist. When you straighten the elbow, the roles switch.",
    "First name the movement, then ask which muscle makes it and which one is on the opposite side.", "In a leg curl, the hamstrings bend the knee and the quadriceps on the front lengthen and let it happen.", [
    "During the upward part of a biceps curl, which muscle is the agonist?~Biceps~Triceps~Deltoid",
    "During a biceps curl, the triceps is the…~Antagonist~Agonist~Origin",
    "In a knee extension (straightening the leg), which muscle group is the agonist?~Quadriceps~Hamstrings~Calves",
    "In a knee extension, the antagonist is…~Hamstrings~Quadriceps~Gluteus maximus only~The muscle group on the back of the thigh.",
    "A muscle that helps the agonist do its job is called a…~Synergist~Antagonist~Tendon",
    "Core muscles that keep your trunk still while your arms press overhead are acting as…~Stabilizers~Antagonists~Agonists",
    "When you lower the weight in a curl, the biceps…~Lengthens under tension~Switches off completely~Becomes the antagonist of itself",
    "The prime mover is another name for the…~Agonist~Stabilizer~Joint capsule"]);
  const a5 = T("Linear and undulating periodization", "📅", "<b>Periodization</b> means planning training in phases. There is more than one way to plan them.",
    "<b>Linear</b> periodization changes slowly: for example, high volume and low load first, then heavier and lower volume. <b>Undulating</b> periodization changes volume and intensity often, daily or weekly. <b>Block</b> periodization focuses on one quality at a time. A <b>taper</b> cuts volume before a big event, and a <b>deload</b> is an easy week to recover.",
    "Ask: does the plan change slowly in one direction, or does it keep switching?", "A lifter does heavy squats Monday, lighter fast squats Wednesday and moderate squats Friday. The load keeps changing within the week.", [
    "A plan that slowly raises intensity and lowers volume over several months is…~Linear periodization~Undulating periodization~Random training",
    "Changing the load and reps every session or week is…~Undulating periodization~Linear periodization~A taper",
    "Cutting training volume in the days before a big competition is a…~Taper~Deload block~Overload",
    "An easy week planned to help the body recover is a…~Deload~Peak~Plateau",
    "Focusing on one main quality for a few weeks, like strength, then another, is…~Block periodization~Undulating only~Detraining",
    "Why do coaches use periodization?~To peak at the right time and avoid overtraining~To make every session identical~To avoid planning",
    "A heavy day, a light day and a medium day in one week is an example of…~Undulating periodization~A taper~Linear periodization",
    "Which describes a good taper?~Keep intensity, cut volume~Double volume~Stop all activity for weeks"]);
  const a6 = T("Team cohesion", "🤝", "A <b>cohesive</b> team sticks together while working toward its goals. Researchers describe two kinds.",
    "<b>Task cohesion</b> is how committed the group is to its shared goal. <b>Social cohesion</b> is how much members like each other and enjoy each other's company. Strong task cohesion is closely linked to better performance. <b>Social loafing</b> is when individuals put in less effort in a group, and clear roles and goals reduce it.",
    "Ask: is it about the goal and the work, or about friendship?", "A relay team keeps its practice goals on a poster and every runner knows her exact job. That builds task cohesion.", [
    "A team that is strongly committed to a shared goal has high…~Task cohesion~Social loafing~Home advantage",
    "A team that has great friendships and enjoys time together has high…~Social cohesion~Task cohesion~Stoppage time",
    "When some players put in less effort because others will do the work, it is called…~Social loafing~Task cohesion~Team building",
    "Which action helps build task cohesion?~Setting clear team goals and roles~Keeping roles secret~Comparing players in public",
    "Which kind of cohesion has the stronger link to winning?~Task cohesion~Social cohesion~Neither has any link",
    "A coach gives each player a clear job in the press. This mainly reduces…~Social loafing~Heart rate~Friendships",
    "A team-building trip with games and meals mainly builds…~Social cohesion~Aerobic fitness~Rule knowledge",
    "Social loafing is more likely when…~Individual effort cannot be seen~Everyone's stats are tracked~Roles are clear"]);
  const a7 = T("Motor units and recruitment", "⚡", "A muscle does not contract all at once. Your nervous system switches on groups of fibers as needed.",
    "A <b>motor unit</b> is one motor neuron plus all the muscle fibers it controls. Units follow the <b>all-or-none</b> rule: when the neuron fires, all its fibers contract. The <b>size principle</b> says small, slow units are recruited first and big, powerful units only when more force is needed. Eye muscles have few fibers per neuron for fine control.",
    "Think small and slow first, big and strong last.", "Picking up a pen uses only small units. Lifting a heavy box calls in the large units too.", [
    "A motor unit is made of…~One motor neuron and the fibers it controls~One whole muscle~A tendon and a bone",
    "The all-or-none rule says that when a motor neuron fires…~All of its muscle fibers contract~Half of its fibers contract~Only the strongest fiber contracts",
    "According to the size principle, which motor units are recruited first?~Small, slow ones~Large, fast ones~The ones in the opposite limb",
    "To produce more force, the body can…~Recruit more motor units~Make each fiber longer~Lower the number of neurons firing",
    "Why do eye muscles have few fibers per motor neuron?~For very fine control~To be as strong as possible~They have no neurons",
    "Large muscles like the quadriceps have motor units with…~Many fibers each~Only a few fibers each~No fibers",
    "Lifting a feather mainly uses…~Small motor units~Large motor units~All motor units at full force",
    "Increasing how fast a neuron fires its signals to raise force is called…~Rate coding~Hypertrophy~Cool-down"]);
  const a8 = T("Compound and isolation exercises", "🏋️", "Strength exercises fall into two big families, and a good program usually uses both.",
    "<b>Compound</b> exercises work several joints and muscle groups together, like squats, pull-ups and bench press. <b>Isolation</b> exercises work one joint, like biceps curls and leg extensions. Compound lifts train more muscle in less time. Isolation lifts help target a weak spot. Do big, demanding lifts early in the workout while you are fresh.",
    "Count the joints that move. More than one means compound.", "A rower's workout starts with deadlifts for the whole body, then ends with a few calf raises.", [
    "Which exercise is a compound exercise?~Squat~Biceps curl~Leg extension",
    "Which exercise is an isolation exercise?~Biceps curl~Deadlift~Pull-up",
    "A compound exercise is one that…~Moves several joints at once~Moves only one joint~Uses no weight",
    "Why do many coaches do compound lifts first in a workout?~They are demanding and need freshness and focus~They are easier than isolation lifts~Isolation lifts always injure muscles",
    "Which is a benefit of isolation exercises?~They can target a weak muscle~They train the whole body at once~They need no technique",
    "A pull-up uses the elbow and shoulder joints, so it is…~Compound~Isolation~Aerobic",
    "A leg extension machine moves only the knee, so it is…~Isolation~Compound~Plyometric",
    "Which gives the most muscle work in the least time?~Compound lifts~Isolation lifts only~Resting between every rep"]);
  const a9 = T("Barriers to taking part", "🚧", "Not everyone has the same chance to play sport. Understanding <b>barriers</b> helps us remove them.",
    "Common barriers are <b>cost</b>, <b>distance or transport</b>, <b>time</b>, lack of <b>facilities</b>, low <b>confidence</b>, safety worries and <b>access</b> for people with disabilities. Communities can reduce them with free or low-cost programs, safe routes, adaptive equipment, welcoming coaches and flexible times.",
    "Match each barrier with a practical fix.", "A town cannot afford fees, so the club offers free sessions after school and lends out gear.", [
    "A family cannot afford fees and equipment. Which barrier is this?~Cost~Confidence~Weather",
    "A teen has no way to get to the sports center. Which barrier is this?~Transport~Time~Rules",
    "Which is a good way to reduce the cost barrier?~Free or low-cost programs with borrowed gear~Raising fees~Closing community courts",
    "A new player feels shy because everyone seems better. This barrier is…~Low confidence~Distance~Cost",
    "A gym with no ramp or adapted equipment creates a barrier of…~Access~Cost~Hunger",
    "Offering sessions at different times of day helps with the barrier of…~Time~Cost~Equipment size",
    "Which action makes a club more welcoming to beginners?~A friendly, no-pressure beginner group~Only holding elite tryouts~Posting results of the weakest players",
    "A park with poor lighting that feels unsafe after dark is a barrier of…~Safety~Skill~Height"]);
  const a10 = T("Lacrosse basics", "🥍", "<b>Lacrosse</b> is one of the oldest team sports in North America. It began with Indigenous peoples, including the Haudenosaunee, who played it for community and spiritual reasons.",
    "Players carry, pass and shoot a small rubber ball using a stick with a net pocket called a <b>crosse</b>. A men's field team has <b>10 players</b> on the field, including a goalkeeper. Field players cannot touch the ball with their hands. The goal is to put the ball in the other team's net. Helmets and padding are important safety gear.",
    "Remember: stick with a pocket, no hands for field players, ball into the net.", "A midfielder cradles the ball in the pocket by rocking the stick gently, then passes to a teammate.", [
    "What do lacrosse players use to carry and throw the ball?~A stick with a net pocket~A paddle with strings~A flat board",
    "Who first played lacrosse?~Indigenous peoples of North America~Medieval sailors~Players in modern gyms",
    "How many players does a men's field lacrosse team have on the field?~10~6~15",
    "The goal of lacrosse is to…~Put the ball into the other team's net~Hit the ball over a net~Carry the ball over a line with your hands",
    "Field players may not touch the ball with their…~Hands~Sticks~Feet~They must use the crosse.",
    "Rocking the stick gently to keep the ball in the pocket is called…~Cradling~Dribbling~Serving",
    "Why do lacrosse players wear helmets and pads?~To prevent injuries from sticks and the hard ball~To look like a team~To run faster",
    "The stick's net pocket is part of the…~Crosse~Crease~Cleat"]);
  const a11 = T("Exercise and the immune system", "🛡️", "Regular exercise helps your body fight germs, but doing too much without recovery can work against you.",
    "<b>Moderate</b> exercise most days is linked to fewer infections. After very long, hard sessions, defenses can dip for a few hours: the <b>open window</b>. Sleep, good food and hand washing help. The <b>neck check</b> rule: symptoms above the neck (a mild stuffy nose) may allow light exercise, but symptoms below the neck or a fever mean rest.",
    "Think moderate and regular is good, extreme and exhausted is risky.", "An athlete with a mild stuffy nose goes for an easy walk, but stays home when she has a fever and body aches.", [
    "Regular moderate exercise is linked to…~Fewer infections~More frequent colds~No change in defenses at all",
    "The open window idea says that after very hard, long exercise…~Defenses can dip for a short time~You become immune to all germs~Your heart stops needing rest",
    "In the neck check rule, which means you should rest?~A fever~A mild stuffy nose~Slightly dry lips~This sign shows the whole body is fighting an illness.",
    "Which habit helps protect athletes from infections?~Washing hands and getting enough sleep~Sharing water bottles~Training on no sleep",
    "Which is a symptom 'below the neck' that suggests skipping training?~Chest congestion~Mild sneezing~A little itchy nose",
    "Overreaching without recovery can…~Lower your defenses~Raise your defenses~Stop sweat",
    "A good choice with a mild stuffy nose and no fever is…~Easy, light exercise~A max-effort test~A long race",
    "Which pair of habits best supports immune health?~Balanced eating and good sleep~Skipped meals and late nights~Only energy drinks"]);
  const a12 = T("Rowing basics", "🚣", "<b>Rowing</b> is a sport where athletes sit facing backward and drive a boat with oars. It trains legs, back, arms and heart at the same time.",
    "In <b>sweep</b> rowing each rower has one oar; in <b>sculling</b> each rower has two. The stroke has four parts: <b>catch</b> (oar enters water), <b>drive</b> (legs, then body swing, then arms), <b>finish</b> (oar leaves) and <b>recovery</b> (slide back). A <b>coxswain</b> steers and calls commands. Races are usually 2000 meters.",
    "On the drive, power starts at the legs, not the arms.", "A beginner on an indoor rowing machine pushes with her legs first, leans back a little, then pulls the handle to her chest.", [
    "In sculling, each rower uses…~Two oars~One oar~No oars",
    "In sweep rowing, each rower uses…~One oar~Two oars~A paddle with a net",
    "On the drive, which body part starts the power?~Legs~Hands~Neck",
    "The part of the stroke when the oar first enters the water is the…~Catch~Finish~Recovery",
    "The person who steers and calls commands in some boats is the…~Coxswain~Referee~Goalkeeper",
    "The usual Olympic race distance in rowing is…~2000 meters~100 meters~10 kilometers",
    "During recovery, the rower…~Slides forward to prepare for the next stroke~Pushes hard with the legs~Leaves the boat",
    "Rowing is mainly considered a…~Full-body endurance and strength sport~Hand-only sport~Sport with no endurance demand"]);

  const b1 = N("Relative strength", "⚖️", "Heavier athletes can usually lift more. <b>Relative strength</b> compares lifting to body mass so athletes of different sizes can be compared.",
    "Relative strength = <b>weight lifted ÷ body mass</b>. A lifter at 70 kg who squats 140 kg lifts 2 times body mass.",
    "Divide for the ratio, multiply to find the load.", () => {
    const m = pick([50, 60, 70, 80, 90]), r = ri(1, 3);
    if (ri(1, 2) === 1) return { text: `An athlete with body mass ${m} kg squats ${m * r} kg. How many times body mass is that?`, visual: "🏋️", answer: r,
      hints: ["You are comparing the lift with the athlete's own mass.", "Divide the lift by the body mass.", "Example: a 60 kg athlete lifts 120 kg. 120 ÷ 60 = 2 times body mass. Now do yours."] };
    return { text: `An athlete with body mass ${m} kg can lift ${r} times body mass. How many kilograms is the lift?`, visual: "🏋️", answer: m * r,
      hints: ["The lift is a multiple of body mass.", "Multiply body mass by the number of times.", "Example: 50 kg × 3 times = 150 kg. Now do yours."] };
  });
  const b2 = N("Work to rest ratio", "⏱️", "Interval training is planned using <b>work</b> time and <b>rest</b> time. The ratio tells you how long the rest is.",
    "A ratio of <b>1:2</b> means rest is twice as long as work. 20 seconds of work with a 1:2 ratio gives 40 seconds of rest. One round = work + rest.",
    "Find rest first, then add work to rest for a full round.", () => {
    const w = pick([10, 15, 20, 30, 40]), k = ri(1, 4), rounds = ri(3, 6);
    if (ri(1, 2) === 1) return { text: `An interval is ${w} seconds of work with a 1:${k} work to rest ratio. How many seconds of rest follow each work interval?`, visual: "⏱️", answer: w * k,
      hints: ["The rest is some number of times the work.", "Multiply the work seconds by the second number in the ratio.", "Example: 30 seconds of work at 1:2 gives 30 × 2 = 60 seconds of rest. Now do yours."] };
    return { text: `A session has ${rounds} rounds. Each round is ${w} seconds of work and ${w * k} seconds of rest. How many seconds is the whole session?`, visual: "⏱️", answer: rounds * (w + w * k),
      hints: ["Find the length of one round first.", "Add work and rest for one round, then multiply by the number of rounds.", "Example: 3 rounds of 10 s work and 20 s rest. 10 + 20 = 30, 30 × 3 = 90 seconds. Now do yours."] };
  });
  const b3 = N("Energy deficit and body fat", "🔥", "Changing body fat takes an energy deficit over time. A common estimate is that about <b>3500 kcal</b> equals about one pound of fat.",
    "This is only an estimate; bodies adapt. <b>Total deficit = daily deficit × days.</b> Pounds ≈ total deficit ÷ 3500. Slow, steady change of about 0.5 to 1 pound a week is a healthy range for adults, and growing teens should not diet without a doctor's advice.",
    "Multiply for the total, divide by 3500 for pounds.", () => {
    const d = pick([250, 500]), k = ri(1, 4), days = d === 500 ? 7 * k : 14 * k;
    if (ri(1, 2) === 1) return { text: `An adult's plan creates a deficit of ${d} kcal a day for ${days} days. Using 3500 kcal per pound, about how many pounds is that?`, visual: "🔥", answer: k,
      hints: ["Find the total deficit first.", "Multiply the daily deficit by the days, then divide by 3500.", "Example: 500 kcal for 14 days = 7000 kcal. 7000 ÷ 3500 = 2 pounds. Now do yours."] };
    return { text: `Using 3500 kcal per pound, how many kilocalories of total deficit equal ${k} pounds of fat?`, visual: "🔥", answer: 3500 * k,
      hints: ["Each pound is a fixed number of kilocalories.", "Multiply the pounds by 3500.", "Example: 3 pounds × 3500 = 10500 kcal. Now do yours."] };
  });
  const b4 = N("Impulse and momentum", "💥", "To change how fast something moves, you need force applied for some time. That combination is <b>impulse</b>.",
    "<b>Impulse = force × time</b> (newton-seconds). Impulse also equals the change in <b>momentum</b>, and momentum = mass × velocity. A longer contact time with the same force gives more impulse, which is why follow-through helps.",
    "Multiply force and time; for momentum multiply mass and speed.", () => {
    if (ri(1, 2) === 1) { const F = pick([100, 200, 300, 400, 500]), t = ri(2, 6); return { text: `A constant force of ${F} N acts on a ball for ${t} seconds. What is the impulse in N·s?`, visual: "💥", answer: F * t,
      hints: ["Impulse combines how hard and how long.", "Multiply the force by the time.", "Example: 50 N for 4 s gives 50 × 4 = 200 N·s. Now do yours."] }; }
    const m = ri(2, 6), v = ri(3, 12); return { text: `A ${m} kg object starts at rest and a force gives it a speed of ${v} m/s. What impulse was applied in N·s?`, visual: "💥", answer: m * v,
      hints: ["Impulse equals the change in momentum.", "The object started at rest, so the change is the final momentum, mass × speed.", "Example: 5 kg reaching 4 m/s: 5 × 4 = 20 N·s. Now do yours."] };
  });
  const b5 = N("Splits and average speed", "🏃", "In a long race, athletes run different speeds in different parts. The <b>average speed</b> uses everything together.",
    "<b>Average speed = total distance ÷ total time.</b> Do not average the part speeds unless the times are equal. Add all distances, add all times, then divide.",
    "Add distances, add times, then divide.", () => {
    const a = pick([8, 10, 12, 14]), t1 = ri(1, 3), t2 = ri(1, 3), T = t1 + t2, D = a * T, d1 = ri(1, D - 1), d2 = D - d1;
    return { text: `A cyclist rides ${d1} km in ${t1} hour${t1 > 1 ? "s" : ""}, then ${d2} km in ${t2} hour${t2 > 1 ? "s" : ""}. What was the average speed in km/h?`, visual: "🚴", answer: a,
      hints: ["Use the whole trip, not just one part.", "Add the distances, add the times, then divide distance by time.", "Example: 10 km in 1 h plus 20 km in 2 h is 30 km in 3 h. 30 ÷ 3 = 10 km/h. Now do yours."] };
  });
  const b6 = N("Weekly training volume", "📊", "Coaches count <b>sets per muscle group per week</b> to see whether the workload fits the athlete's goal.",
    "Weekly sets = (sets per exercise added up) × sessions per week. Many beginners improve with about 10 to 20 hard sets per muscle group each week.",
    "Add the sets in one session, then multiply by sessions.", () => {
    const a = ri(2, 5), b = ri(2, 4), s = ri(2, 3), mus = pick(["leg", "back", "chest"]);
    if (ri(1, 2) === 1) return { text: `In each session a lifter does ${a} sets of one ${mus} exercise and ${b} sets of another. She trains this ${s} times a week. How many ${mus} sets per week?`, visual: "📊", answer: (a + b) * s,
      hints: ["Find the sets in one session first.", "Add the two exercises, then multiply by the sessions per week.", "Example: 3 + 4 = 7 sets a session, 2 sessions: 14 sets. Now do yours."] };
    const g = a * s + b * s + ri(2, 6); return { text: `A lifter does ${(a + b) * s} hard ${mus} sets a week. The goal is ${g}. How many more sets are needed per week?`, visual: "📊", answer: g - (a + b) * s,
      hints: ["Find the gap between the goal and what is done.", "Subtract the current sets from the goal.", "Example: goal 14, now 10. 14 − 10 = 4 more sets. Now do yours."] };
  });

  // ================= LEVEL 26 =================
  const c1 = T("Types of synovial joints", "🦴", "Most of the joints you use in sport are <b>synovial joints</b>, with a fluid-filled space that lets bones glide smoothly.",
    "Synovial joints have a joint capsule, <b>synovial fluid</b> and <b>articular cartilage</b>. <b>Hinge</b> joints (elbow, knee) move mostly in one plane. <b>Ball-and-socket</b> joints (shoulder, hip) move in all directions. <b>Pivot</b> joints rotate (the top of the neck). <b>Gliding</b> joints slide (between wrist bones). The thumb base is a <b>saddle</b> joint.",
    "Picture the shape: hinge door, ball in a cup, a spinning pivot.", "A shoulder joint swings in a circle like a joystick, so it is a ball-and-socket type.", [
    "Which type of joint is the elbow?~Hinge~Ball-and-socket~Pivot",
    "Which type of joint is the hip?~Ball-and-socket~Hinge~Gliding",
    "Which joint type allows movement in the greatest number of directions?~Ball-and-socket~Hinge~Pivot",
    "The joint that lets you turn your head side to side is mainly a…~Pivot joint~Hinge joint~Saddle joint",
    "What does synovial fluid do?~Lubricates the joint and feeds the cartilage~Makes bones longer~Connects muscle to bone",
    "Smooth tissue that covers the ends of bones in a synovial joint is…~Articular cartilage~Tendon~Skin",
    "Which joint type is the knee mainly classified as?~Hinge~Ball-and-socket~Saddle~It mostly bends and straightens.",
    "The joint at the base of the thumb is a…~Saddle joint~Hinge joint~Pivot joint"]);
  const c2 = T("Stretch reflex and the stretch-shortening cycle", "🦘", "Muscles have built-in sensors. Smart training uses them to produce powerful, springy movement.",
    "<b>Muscle spindles</b> detect fast stretch and trigger a reflex contraction, like a knee-jerk. <b>Golgi tendon organs</b> sense high tension and can reduce muscle activation. In the <b>stretch-shortening cycle</b> a muscle is stretched (eccentric) then immediately shortens (concentric), storing and releasing elastic energy. A long pause between the two wastes the stored energy.",
    "Fast stretch then quick shortening means elastic power.", "In a countermovement jump you dip down quickly and spring right back up, instead of pausing at the bottom.", [
    "Which sensor detects how fast a muscle is stretched?~Muscle spindle~Golgi tendon organ~Cartilage",
    "The stretch reflex causes the muscle to…~Contract~Lengthen more~Stop sending signals",
    "A stretch-shortening cycle is…~A quick lengthening followed by a quick shortening~A slow stretch held for a minute~A rest between sets",
    "What happens if you pause for a long time at the bottom of a jump before going up?~Less stored elastic energy is used~More elastic energy is stored~The reflex gets stronger",
    "Which movement strongly uses the stretch-shortening cycle?~Bounding or hopping~Lying still~Slow stretching",
    "The part of the cycle where the muscle lengthens under tension is…~Eccentric~Concentric~Isometric",
    "Golgi tendon organs are sensitive to…~Muscle tension~Light~Heartbeat",
    "Plyometric training aims to improve…~Reactive power~Flexibility only~Hand-eye vision only"]);
  const c3 = T("Types of motor skills", "🎯", "Coaches classify skills to decide how to teach them. Three common ways: by the environment, by the structure and by the size of the movement.",
    "<b>Open skills</b> happen in a changing environment (defending in soccer, returning a serve). <b>Closed skills</b> happen in a stable environment (a free throw, a dive). By structure: <b>discrete</b> skills have a clear start and end (a kick), <b>serial</b> skills string several together (a gymnastics routine), <b>continuous</b> skills repeat (swimming, cycling).",
    "Open means the situation keeps changing; closed means it stays the same.", "A diver repeats the same dive in the same place, so it is closed. A goalkeeper reacting to shots is open.", [
    "A tennis player returning an unpredictable serve is using an…~Open skill~Closed skill~Discrete skill only",
    "A bowler throwing at fixed pins from the same spot is using a…~Closed skill~Open skill~Team skill",
    "Taking a penalty kick has a clear start and finish. It is a…~Discrete skill~Continuous skill~Serial skill",
    "A gymnastics floor routine strings several skills in order, so it is a…~Serial skill~Discrete skill~Continuous skill",
    "Swimming laps repeatedly is a…~Continuous skill~Discrete skill~Closed single move",
    "Which skill is the most open?~Defending a fast break in basketball~A free throw~A golf swing off a tee~The situation changes every second.",
    "Which skill is the most closed?~A free throw~A rebound in a crowd~Intercepting a pass",
    "Why do coaches practice open skills with changing, game-like drills?~So athletes learn to read and adapt~To make training easy~To avoid making decisions"]);
  const c4 = T("Coaching styles", "📣", "How a coach makes decisions changes how athletes feel and learn. There is no single best style for every moment.",
    "<b>Autocratic</b>: the coach decides and gives orders. <b>Democratic</b>: the coach asks for athletes' input and shares decisions. <b>Laissez-faire</b>: the coach steps back and lets athletes manage themselves. Skilled coaches adapt: fast, clear commands in a safety moment, more athlete input when planning with an experienced team.",
    "Ask who makes the decision: the coach, the team together, or nobody in charge?", "During a fire drill the coach gives short commands. In an end-of-season meeting she asks players what to change.", [
    "A coach who makes every decision and gives orders is using…~An autocratic style~A democratic style~A laissez-faire style",
    "A coach who asks athletes for ideas before deciding is using…~A democratic style~An autocratic style~No style",
    "A coach who gives almost no direction and lets athletes do their own thing is…~Laissez-faire~Autocratic~Democratic",
    "In an urgent safety situation, the best approach is usually…~Short, clear commands~A long vote~Silence",
    "An experienced team planning its season is best served by…~Shared, democratic decisions~Orders with no explanation~No planning at all",
    "Which is a strength of democratic coaching?~Athletes feel ownership and buy in~Decisions are always fastest~Nobody has to take responsibility",
    "A risk of laissez-faire coaching with beginners is…~Lack of structure and guidance~Too much feedback~Too much coach control",
    "The best coaches usually…~Adapt their style to the situation and athletes~Never change style~Avoid communicating"]);
  const c5 = T("Long-term athlete development", "🌱", "Developing an athlete is a long process, not a quick race. <b>Long-term athlete development (LTAD)</b> plans training around growth and age.",
    "Early stages build <b>fundamental movement skills</b> through play and many sports (<b>sampling</b>). Later stages add more focused training, then competition. Growth spurts around <b>peak height velocity</b> change coordination and injury risk. Specializing very early can raise burnout and overuse injury risk. The final stage is <b>active for life</b>.",
    "Build the base first, specialize later, stay active forever.", "A ten-year-old tries soccer, swimming and gymnastics, building balance, strength and coordination for whatever she chooses later.", [
    "Early childhood stages of LTAD focus mainly on…~Fundamental movement skills through play~Heavy weightlifting~Elite specialization",
    "Trying many sports as a child is called…~Sampling~Burnout~Tapering",
    "Very early specialization in one sport is linked to higher risk of…~Burnout and overuse injury~Perfect health~Lower injury rates",
    "Peak height velocity is…~The fastest period of growth in height~A sprint record~The tallest a person gets",
    "During fast growth, an athlete may temporarily lose…~Coordination~Bones~Lungs",
    "The last stage of LTAD is…~Active for life~Train to win~Learn to play",
    "Why are fun and variety emphasized in children's sport?~They build skills and keep kids playing~They stop kids from improving~They avoid all rules",
    "The relative age effect means that…~Athletes born early in a selection year are often favored~Older coaches coach better~Younger athletes always win"]);
  const c6 = T("Preventing ACL injuries", "🦵", "The <b>anterior cruciate ligament (ACL)</b> is a strong band inside the knee. It stops the shinbone sliding forward and helps control rotation.",
    "Most sport ACL tears happen without contact, during <b>landing, cutting or pivoting</b>. Neuromuscular programs (like <b>FIFA 11+</b>) lower the risk. Good habits: land softly on both feet with <b>bent knees and hips</b>, keep knees tracking over the toes, strengthen the <b>hamstrings and glutes</b>, and practice balance. Rest and warm up properly.",
    "Soft knees, knees over toes, strong hips and hamstrings.", "A volleyball coach teaches players to land quietly with bent knees and to push the hips back, like sitting into a chair.", [
    "What does the ACL mainly do?~Keeps the shinbone from sliding too far forward~Moves the ankle~Connects the arm to the shoulder",
    "Many ACL injuries in sport happen during…~Landing, cutting or pivoting~Resting~Easy walking",
    "Which landing habit lowers ACL injury risk?~Land softly with bent knees and hips~Land stiff with straight legs~Land on one locked knee",
    "Knees that collapse inward during landing are…~A risk factor~A good technique~Required for cutting",
    "Which muscles help protect the knee when strong?~Hamstrings and glutes~Only the eyelids~Only the wrists",
    "What is FIFA 11+?~A warm-up program that lowers injury risk~A soccer formation~A drink",
    "Neuromuscular training for injury prevention includes…~Balance, landing and strength drills~Only stretching~Only sitting",
    "Why is a proper warm-up part of injury prevention?~It prepares muscles, joints and the nervous system~It replaces the game~It makes ligaments longer"]);
  const c7 = T("Field tests of fitness", "📋", "You do not always need a lab to test fitness. Simple <b>field tests</b> give useful information with little equipment.",
    "The <b>Cooper test</b> measures how far you run in 12 minutes (aerobic fitness). The <b>multistage shuttle (beep) test</b> uses 20-meter runs at increasing speed. The <b>sit-and-reach</b> estimates hamstring and lower-back flexibility. A <b>vertical jump</b> estimates leg power. A <b>grip dynamometer</b> measures hand strength. Always use the same test and conditions to compare over time.",
    "Match the test to the fitness quality it measures.", "To check progress, a team repeats the same shuttle test every term on the same floor, at the same time of day.", [
    "The Cooper test measures…~Aerobic fitness~Flexibility~Grip strength",
    "In the Cooper test you try to…~Cover as much distance as possible in 12 minutes~Run 12 laps as slowly as possible~Run for 20 meters",
    "The multistage shuttle (beep) test uses runs of…~20 meters at increasing speed~100 meters at equal speed~1 mile at once",
    "Which test estimates hamstring and lower-back flexibility?~Sit-and-reach~Vertical jump~Grip test",
    "A vertical jump test mainly estimates…~Leg power~Flexibility~Balance",
    "A grip dynamometer measures…~Hand grip strength~Foot speed~Lung size",
    "To compare results fairly over time, you should…~Use the same test under the same conditions~Change tests each time~Test at random times",
    "Field tests are useful because they…~Need little equipment and can test many people~Always replace a doctor~Work without any effort"]);
  const c8 = T("Self-efficacy", "💪", "<b>Self-efficacy</b> is your belief that you can succeed at a specific task. It powers effort and persistence in sport.",
    "Albert Bandura named four sources: <b>mastery experiences</b> (doing it successfully, the strongest source), <b>vicarious experience</b> (watching similar people succeed), <b>verbal persuasion</b> (encouragement from others) and <b>physical and emotional state</b> (feeling calm and fit). It is task-specific, unlike general self-esteem.",
    "Think: doing, watching, hearing and feeling.", "A beginner climber succeeds on an easy wall, watches a friend of her size climb a harder one and hears coach praise her technique. Her belief grows.", [
    "Self-efficacy is…~Belief in your ability to do a specific task~How much you like yourself overall~How fast you can run",
    "Which source of self-efficacy is generally the strongest?~Mastery experiences~Verbal persuasion~Watching strangers",
    "Seeing a similar teammate succeed builds self-efficacy through…~Vicarious experience~Mastery experience~Physical state",
    "Encouragement from a coach is an example of…~Verbal persuasion~Mastery experience~Imagery",
    "Feeling calm and fit before a test is part of…~Physical and emotional state~Verbal persuasion~Vicarious experience",
    "Who developed the theory of self-efficacy?~Albert Bandura~Isaac Newton~Pierre de Coubertin",
    "A coach can raise self-efficacy by…~Setting achievable goals that lead to success~Setting impossible goals~Giving no feedback",
    "Self-efficacy differs from self-esteem because it is…~About a specific task~About overall worth~Impossible to change"]);
  const c9 = T("Attention and focus", "🔍", "What you pay attention to can make or break a performance. Athletes train their focus like any other skill.",
    "Nideffer described focus by <b>width</b> (broad or narrow) and <b>direction</b> (internal or external). A quarterback scanning the field uses a <b>broad external</b> focus; a golfer lining up a putt uses a <b>narrow external</b> one. Studies show an <b>external focus</b> on the movement's effect often improves performance more than thinking about body parts. <b>Choking</b> happens when overthinking disrupts a skill. Cue words and routines help.",
    "Ask: broad or narrow, inside or outside?", "A free-throw shooter says 'rim' to herself and watches the front of the hoop instead of thinking about her elbow.", [
    "A quarterback scanning the whole field uses a…~Broad external focus~Narrow internal focus~Narrow external focus",
    "A golfer concentrating only on the ball and the hole uses a…~Narrow external focus~Broad internal focus~Broad external focus",
    "Focusing on your own breathing or heartbeat is an…~Internal focus~External focus~Open focus",
    "Choking under pressure is often caused by…~Overthinking an automatic skill~Having no nerves at all~Perfect focus",
    "An external focus means paying attention to…~The effect of your movement on the world~Your own muscles~Your own thoughts only",
    "Which helps refocus after a mistake?~A short cue word or routine~Replaying the mistake over and over~Looking at the crowd",
    "Narrow focus is best for…~Aiming at a target~Reading a whole defense~Scanning a crowded room",
    "A pre-shot routine helps athletes by…~Cueing focus and keeping a steady rhythm~Slowing the ball~Replacing practice"]);
  const c10 = T("Stages of team development", "👥", "Teams change over time. Bruce Tuckman described the path many groups follow.",
    "<b>Forming</b>: members meet and are polite. <b>Storming</b>: disagreements about roles and leadership appear. <b>Norming</b>: members agree on rules, roles and routines. <b>Performing</b>: the team works smoothly toward its goals. <b>Adjourning</b>: the team ends, such as after a season, and members reflect.",
    "Think of the order: meet, clash, agree, achieve, finish.", "A new relay team is shy in September, argues over order in October, settles roles in November and runs smoothly by championships.", [
    "The first stage of team development is…~Forming~Storming~Performing",
    "Conflict about roles and leadership is typical of…~Storming~Forming~Adjourning",
    "When the team agrees on rules and routines, it is in…~Norming~Storming~Forming",
    "The stage where the team works smoothly toward goals is…~Performing~Norming~Forming",
    "The end of a season, when the team breaks up and reflects, is…~Adjourning~Storming~Norming",
    "Who described these stages?~Bruce Tuckman~Albert Bandura~Wilhelm Roentgen",
    "A coach can help a storming team by…~Clarifying roles and encouraging respectful talk~Ignoring conflict forever~Cutting the roster",
    "Players being polite and unsure of each other is the sign of…~Forming~Performing~Storming"]);
  const c11 = T("Stages of behavior change", "🚦", "Becoming active for life is a process. The <b>transtheoretical model</b> describes five stages people move through.",
    "<b>Precontemplation</b>: not thinking about change. <b>Contemplation</b>: thinking about it. <b>Preparation</b>: making a plan and small steps. <b>Action</b>: being active regularly for less than six months. <b>Maintenance</b>: keeping it up for six months or more. Slips are normal. Match advice to the stage: information early, planning in the middle, support later.",
    "Which stage fits what the person says and does?", "Someone who says 'maybe I should start walking' is thinking about it. Someone who bought shoes and set a schedule is preparing.", [
    "A person who has no plans to start exercising is in…~Precontemplation~Preparation~Maintenance",
    "A person who is thinking about becoming active is in…~Contemplation~Action~Maintenance",
    "A person who buys shoes and plans a weekly schedule is in…~Preparation~Contemplation~Maintenance",
    "A person who has exercised regularly for three months is in…~Action~Preparation~Precontemplation",
    "A person who has stayed active for more than six months is in…~Maintenance~Contemplation~Action",
    "Missing a few weeks of exercise (a relapse) is…~A normal part of change~A sign of failure forever~Impossible",
    "Which support fits someone in contemplation?~Information about benefits and ways to start~Marathon tips~Advanced recovery plans",
    "A good tool to stay in maintenance is…~Social support and varied activities~Dropping all goals~Avoiding friends"]);
  const c12 = T("Cycling and drafting", "🚴", "On a flat road at speed, the biggest force a cyclist fights is <b>air resistance</b> (drag).",
    "Drag grows with the <b>square of speed</b>, so doubling speed gives about four times the drag. Riders cut drag by lowering their body (<b>aero position</b>). <b>Drafting</b> means riding close behind another rider, who breaks the air, so you use less effort. A steady <b>cadence</b> of about 80 to 100 rpm is efficient. Power is measured in <b>watts</b>.",
    "Air is the enemy at speed, so hide from it.", "In a road race, a rider tucks behind the leader to rest, then takes a turn in front so others can rest.", [
    "At high speed on a flat road, the biggest resisting force is…~Air resistance~Gravity~Rolling friction",
    "If a cyclist doubles speed, air drag becomes about…~Four times as large~Twice as large~The same",
    "Riding close behind another cyclist to save effort is called…~Drafting~Tapering~Coasting",
    "Why does drafting save energy?~The leader breaks the air for you~The leader pushes you~Gravity gets weaker",
    "A low, tucked body position is meant to…~Reduce drag~Increase drag~Increase rolling friction",
    "Cadence in cycling is measured in…~Revolutions per minute~Kilometers~Watts",
    "Cycling power is measured in…~Watts~Newtons per hour~Beats",
    "Going uphill, the biggest added resistance is…~Gravity~Air only~Cadence"]);

  const d1 = N("Estimating resting energy (BMR)", "🧮", "Your <b>basal metabolic rate (BMR)</b> is the energy you burn at rest. The Mifflin-St Jeor equation estimates it.",
    "<b>Male:</b> BMR = 10 × mass (kg) + 6.25 × height (cm) − 5 × age + 5. <b>Female:</b> same but − 161 at the end. The result is in kcal per day and is only an estimate.",
    "Work each part, add and subtract, then finish with the last number.", () => {
    const w = ri(5, 9) * 10, h = pick([160, 168, 172, 176, 180, 184]), age = ri(4, 8) * 5, male = ri(1, 2) === 1;
    const ans = 10 * w + 6.25 * h - 5 * age + (male ? 5 : -161);
    return { text: `Use BMR = 10 × mass + 6.25 × height − 5 × age ${male ? "+ 5" : "− 161"}. A ${male ? "male" : "female"} is ${w} kg, ${h} cm tall and ${age} years old. What is the BMR in kcal per day?`, visual: "🧮", answer: ans,
      hints: ["Work out each part of the equation one at a time.", "Find 10 × mass and 6.25 × height, add them, subtract 5 × age, then use the last number.", "Example: 60 kg, 160 cm, 20 years (male): 600 + 1000 − 100 + 5 = 1505. Now do yours."] };
  });
  const d2 = N("Protein targets", "🥚", "Athletes who train hard often need more protein than inactive people to repair and build muscle.",
    "A common sport guideline is about <b>1.2 to 2.0 grams of protein per kilogram of body mass per day</b>. Grams per day = <b>rate × body mass</b>. Spread protein across meals.",
    "Multiply grams per kilogram by body mass.", () => {
    const m = ri(5, 9) * 10, r10 = pick([12, 14, 16, 18, 20]);
    return { text: `A ${m} kg athlete aims for ${r10 / 10} g of protein per kg of body mass each day. How many grams of protein a day is that?`, visual: "🥚", answer: r10 * m / 10,
      hints: ["The target depends on body mass.", "Multiply the rate by the athlete's body mass in kilograms.", "Example: 60 kg × 1.5 g/kg = 90 g. Now do yours."] };
  });
  const d3 = N("Estimating maximum heart rate", "❤️", "The old rule 220 − age is only rough. The <b>Tanaka equation</b> fits adults better.",
    "<b>Max heart rate ≈ 208 − 0.7 × age.</b> Multiply the age by 0.7, then subtract from 208. These are estimates; real values vary from person to person.",
    "Multiply age by 0.7 first, then subtract.", () => {
    const a = ri(2, 6) * 10;
    if (ri(1, 2) === 1) { const h = 208 - Math.round(7 * a / 10); return { text: `Using HRmax = 208 − 0.7 × age, an athlete's estimated maximum is ${h} bpm. How old is the athlete?`, visual: "❤️", answer: a,
      hints: ["Work backward: how much was subtracted from 208?", "Subtract the maximum from 208, then divide that result by 0.7.", "Example: max 180: 208 − 180 = 28, 28 ÷ 0.7 = 40 years. Now do yours."] }; }
    return { text: `Using HRmax = 208 − 0.7 × age, what is the estimated maximum heart rate (beats per minute) of a ${a}-year-old?`, visual: "❤️", answer: 208 - Math.round(7 * a / 10),
      hints: ["First find 0.7 times the age.", "Subtract that result from 208.", "Example: age 40: 0.7 × 40 = 28, 208 − 28 = 180 bpm. Now do yours."] };
  });
  const d4 = N("Progressive overload by percent", "📈", "To keep improving, training must slowly get harder. Increasing the load by a small <b>percent</b> is a safe way to progress.",
    "New load = old load + (old load × percent ÷ 100). A common safe step is about 2 to 10 percent, and only when the last session felt manageable.",
    "Find the percent of the old load, then add it.", () => {
    const b = pick([40, 60, 80, 100, 120, 140, 160, 200]), p = pick([5, 10, 25]);
    return { text: `A lifter squats ${b} kg and increases the load by ${p}%. What is the new load in kg?`, visual: "📈", answer: b + b * p / 100,
      hints: ["The increase is a percent of the old load.", "Find the percent of the old load, then add it to the old load.", "Example: 80 kg up 10%: 10% of 80 = 8, so 88 kg. Now do yours."] };
  });
  const d5 = N("Torque at a joint", "🔩", "A muscle makes a joint turn by creating <b>torque</b>. More force or a longer lever arm means more torque.",
    "<b>Torque = force × moment arm</b> (the perpendicular distance from the joint to the line of force), in newton-meters (N·m). Holding a weight farther from the body increases its moment arm and the torque on the shoulder.",
    "Convert centimeters to meters first if needed, then multiply.", () => {
    const F = ri(1, 9) * 10, d10 = ri(2, 5);
    if (ri(1, 2) === 1) return { text: `A force of ${F} N acts ${d10 / 10} m from a joint (moment arm ${d10 / 10} m). What is the torque in N·m?`, visual: "🔩", answer: F * d10 / 10,
      hints: ["Torque combines force and distance.", "Multiply the force by the moment arm in meters.", "Example: 40 N × 0.5 m = 20 N·m. Now do yours."] };
    return { text: `A force of ${F} N acts ${d10 * 10} cm from a joint. What is the torque in N·m? (Convert cm to m first.)`, visual: "🔩", answer: F * d10 / 10,
      hints: ["Change centimeters into meters before multiplying.", "Divide the centimeters by 100, then multiply by the force.", "Example: 20 N at 30 cm: 0.3 m, 20 × 0.3 = 6 N·m. Now do yours."] };
  });
  const d6 = N("Injury rate per 1000 hours", "🩹", "To compare teams fairly, researchers use an <b>injury rate</b> that accounts for how much people played.",
    "<b>Rate = injuries ÷ exposure hours × 1000.</b> A team with 10 injuries in 2000 hours has a rate of 5 per 1000 hours. A larger team that trains more will have more injuries, so the rate gives a fair comparison.",
    "Divide injuries by hours, then multiply by 1000.", () => {
    const h = pick([250, 500, 1000, 2000]), inj = ri(1, 6) * 2;
    return { text: `A club had ${inj} injuries during ${h} hours of training and play. What is the injury rate per 1000 hours?`, visual: "🩹", answer: inj * 1000 / h,
      hints: ["The rate compares injuries with the time people were exposed.", "Divide injuries by hours, then multiply by 1000.", "Example: 6 injuries in 3000 hours: 6 ÷ 3000 × 1000 = 2 per 1000 hours. Now do yours."] };
  });

  // ================= LEVEL 27 =================
  const e1 = T("Anatomical directional terms", "🧭", "Kinesiology uses precise words so everyone describes the body the same way, starting from <b>anatomical position</b> (standing, facing forward, palms forward).",
    "<b>Superior</b> is toward the head, <b>inferior</b> toward the feet. <b>Anterior</b> is the front, <b>posterior</b> the back. <b>Medial</b> is toward the midline, <b>lateral</b> away from it. <b>Proximal</b> is nearer the trunk or attachment, <b>distal</b> farther away. <b>Superficial</b> is nearer the surface, <b>deep</b> farther in. <b>Prone</b> means face down; <b>supine</b> face up.",
    "Picture the body in anatomical position, then follow the word.", "The knee is proximal to the ankle because it is closer to the trunk.", [
    "The wrist is ____ to the elbow.~Distal~Proximal~Superior",
    "The shoulder is ____ to the elbow.~Proximal~Distal~Posterior",
    "The nose is ____ to the ears.~Medial~Lateral~Distal",
    "The sternum (breastbone) is ____ to the spine.~Anterior~Posterior~Inferior",
    "The head is ____ to the chest.~Superior~Inferior~Medial",
    "Lying face up is called…~Supine~Prone~Lateral",
    "Lying face down is called…~Prone~Supine~Proximal",
    "The skin is ____ to the muscles beneath it.~Superficial~Deep~Distal"]);
  const e2 = T("Force-velocity and length-tension", "📉", "Two relationships explain why muscles produce different amounts of force in different situations.",
    "<b>Force-velocity:</b> in a shortening (concentric) contraction, the faster the muscle shortens, the less force it can produce. Eccentric actions can produce more force than isometric ones, and isometric more than fast concentric. <b>Length-tension:</b> a muscle makes the most force near its <b>optimal length</b> where filaments overlap best; too stretched or too shortened reduces force.",
    "Fast means less force; middle length means more force.", "A sprinter's muscles shorten very quickly so each fiber produces relatively little force, while a slow heavy squat uses high force at low speed.", [
    "As a muscle shortens faster, the force it can produce…~Decreases~Increases~Stays exactly the same",
    "A muscle usually produces the most force when it is…~Near its optimal length~Extremely stretched~Extremely shortened",
    "Which kind of action can produce the greatest force?~Eccentric~Fast concentric~They are always equal",
    "A very slow, heavy lift uses…~High force at low speed~Low force at high speed~No muscle at all",
    "Why does force drop when a muscle is stretched far beyond normal length?~Fewer filament connections can form~The muscle grows~The nerves go quiet",
    "Peak power is usually produced at…~Moderate force and moderate speed~Zero speed~Maximum speed with no load",
    "Maximum isometric force happens at…~No shortening or lengthening~Very high speed~Negative speed",
    "Lowering a heavy weight slowly is an example of an…~Eccentric action~Concentric action~Isometric action"]);
  const e3 = T("Cardiovascular drift and steady state", "📈", "During steady exercise the body reaches a balance, but long sessions slowly change it.",
    "At a constant easy or moderate pace, heart rate and oxygen use level off within a few minutes: <b>steady state</b>. In long exercise, especially in heat, heart rate slowly rises even at a fixed pace. This is <b>cardiovascular drift</b>. Sweating lowers blood volume, stroke volume falls, and heart rate rises to keep cardiac output.",
    "Same pace, but fluid loss makes the heart work faster.", "A cyclist rides at exactly 30 km/h for two hours in warm weather. Her heart rate creeps from 140 to 155 though her speed never changes.", [
    "Steady state during exercise means…~Heart rate and oxygen use level off at a constant workload~Heart rate keeps doubling~Oxygen use drops to zero",
    "Cardiovascular drift is…~A gradual rise in heart rate at a constant pace~A drop in blood pressure at rest~A change in running style",
    "A main cause of cardiovascular drift is…~Fluid loss through sweating~Eating more~Cooler weather",
    "During drift, stroke volume usually…~Falls~Rises a lot~Stays the same as heart rate falls",
    "Drift is bigger in…~Hot conditions~Cold, dry conditions~Sleep",
    "To reduce drift, athletes can…~Drink fluids and manage heat~Skip fluids~Wear extra layers",
    "Steady state is usually reached within about…~2 to 3 minutes at easy-moderate pace~2 seconds~2 hours",
    "If heart rate rises while pace stays fixed in a long hot session, the athlete should…~Check hydration and heat stress~Ignore it completely~Add more layers"]);
  const e4 = T("Research design basics", "🔬", "Kinesiology relies on research. Knowing the parts of a study helps you judge whether the claim is solid.",
    "The <b>independent variable</b> is what the researcher changes; the <b>dependent variable</b> is what is measured. A <b>control group</b> does not get the treatment. <b>Random assignment</b> puts people into groups by chance. <b>Blinding</b> keeps participants (or researchers) from knowing who got what. A <b>confounding variable</b> is an outside factor that muddies results. Larger samples give more trustworthy results.",
    "Ask: what was changed, what was measured and what could mislead?", "To test a new warm-up, researchers randomly assign athletes to the new warm-up or the usual one, then measure sprint time.", [
    "In a study of a new warm-up on sprint time, the sprint time is the…~Dependent variable~Independent variable~Control group",
    "The variable that the researcher deliberately changes is the…~Independent variable~Dependent variable~Confounding variable",
    "A control group is a group that…~Does not receive the treatment~Gets the strongest treatment~Is not measured",
    "Random assignment helps by…~Making groups similar by chance~Letting athletes choose~Hiding the results",
    "Blinding is used to…~Reduce bias from expectations~Make studies cheaper~Remove the control group",
    "A factor outside the study that can distort results is a…~Confounding variable~Sample size~Hypothesis",
    "Which study design is generally stronger?~Randomized controlled trial~A single story from one person~A guess from a friend",
    "Why is a larger sample often better?~It reduces the effect of chance~It makes the study shorter~It removes all bias"]);
  const e5 = T("Reliability and validity", "🎚️", "Good measurements are both consistent and meaningful. These are two different qualities.",
    "<b>Reliability</b> means getting consistent results when the test is repeated (test-retest) or by different testers. <b>Validity</b> means the test measures what it claims to measure. A scale that is always 2 kg too heavy is <b>reliable but not accurate</b>. <b>Calibration</b> compares and adjusts equipment to a known standard. <b>Typical error</b> describes normal random variation.",
    "Consistent is reliability; correct is validity.", "A stopwatch that adds exactly 0.5 seconds every time gives the same wrong answer each time, so it is consistent but not accurate.", [
    "A test that gives about the same result each time it is repeated is…~Reliable~Valid~Random",
    "A test that actually measures what it is supposed to measure is…~Valid~Reliable only~Biased",
    "A scale always shows 2 kg too heavy. It is…~Reliable but not accurate~Both reliable and accurate~Neither reliable nor consistent",
    "Test-retest reliability is checked by…~Repeating the test on another day~Using a different test~Averaging unrelated people",
    "Calibration means…~Checking equipment against a known standard~Making the test harder~Skipping the warm-up",
    "Measuring jump height with a ruler held by two different testers who disagree widely lacks…~Inter-rater reliability~Muscle fibers~Warm-up",
    "Typical error describes…~Normal random variation in repeat measures~A big mistake~Cheating",
    "Using a sit-and-reach test to measure aerobic fitness would be…~Not valid~Perfectly valid~More reliable than any test"]);
  const e6 = T("Arousal and performance theories", "📊", "Psychologists have proposed several theories to explain how being 'pumped up' relates to performance.",
    "<b>Drive theory:</b> more arousal always raises performance on well-learned skills. <b>Inverted-U:</b> performance is best at a moderate level and drops when arousal is too low or too high. <b>Catastrophe theory:</b> when anxiety about performing is high, extra arousal can cause a sudden, steep drop. <b>IZOF:</b> every athlete has an individual best zone. Simple, powerful tasks suit higher arousal; fine skills like putting suit lower.",
    "Ask: is it a straight line, a hill or a cliff?", "A weightlifter psyches up before a heavy lift, while an archer takes slow breaths before releasing the arrow.", [
    "The inverted-U hypothesis says performance is best at…~Moderate arousal~Very low arousal~Very high arousal",
    "Catastrophe theory says that high anxiety plus rising arousal can cause…~A sudden drop in performance~A steady improvement~No change",
    "IZOF stands for…~Individual zones of optimal functioning~Intense zones of oxygen flow~Internal zones of obstacles and fear",
    "Which task is likely to suit higher arousal?~A maximal weight lift~Archery~Putting in golf",
    "Which task is likely to suit lower arousal?~Archery~A sprint start~A heavy deadlift",
    "Drive theory predicts that, for a well-learned skill, more arousal…~Raises performance~Always lowers performance~Has no effect",
    "Cognitive anxiety is…~Worry and negative thoughts~Sweaty palms~A fast heartbeat only",
    "Somatic anxiety shows up as…~Physical signs like a racing heart~Only thoughts~Only mood"]);
  const e7 = T("Self-determination theory", "🧭", "Why do people play sport? <b>Self-determination theory</b> by Deci and Ryan says the quality of motivation matters as much as the amount.",
    "People thrive when three needs are met: <b>autonomy</b> (feeling in control of choices), <b>competence</b> (feeling skilled) and <b>relatedness</b> (feeling connected). <b>Intrinsic motivation</b> comes from enjoyment; <b>extrinsic</b> from rewards or pressure. <b>Amotivation</b> means no real reason to act. Controlling rewards can sometimes weaken intrinsic motivation.",
    "Autonomy, competence, relatedness: choose, succeed, belong.", "A coach lets players choose between two drills and explains why each helps, so they feel in control and understand the purpose.", [
    "Which is NOT one of the three basic needs in self-determination theory?~Wealth~Autonomy~Relatedness~Competence",
    "Feeling skilled and able to improve is the need for…~Competence~Autonomy~Relatedness",
    "Feeling in control of your choices is…~Autonomy~Competence~Relatedness",
    "Feeling connected to teammates is…~Relatedness~Autonomy~Amotivation",
    "Playing mainly because it is fun is…~Intrinsic motivation~Extrinsic motivation~Amotivation",
    "Practicing only to earn a prize is…~Extrinsic motivation~Intrinsic motivation~Competence",
    "No clear reason to take part is called…~Amotivation~Autonomy~Persistence",
    "An autonomy-supportive coach would…~Offer choices and explain reasons~Give only orders with no reasons~Ignore athletes' input"]);
  const e8 = T("Leadership in coaching", "🌟", "A coach is a leader as well as a teacher. Researchers describe different kinds of leadership.",
    "<b>Transformational</b> leaders inspire with a vision, treat people as individuals and push them to grow. <b>Transactional</b> leaders focus on exchange: reward good performance, correct mistakes. <b>Formal leaders</b> hold an official role (captain, coach); <b>informal leaders</b> earn influence through respect. Good leaders listen, model behavior and stay consistent.",
    "Ask: inspiring vision, or reward-and-correct exchange?", "A captain who is not officially chosen but is respected by teammates for her work ethic is an informal leader.", [
    "A coach who inspires with a shared vision and cares about each athlete is…~Transformational~Transactional~Laissez-faire only",
    "A leader who mainly rewards good results and corrects mistakes is…~Transactional~Transformational~Informal",
    "A team captain named by the coach is a…~Formal leader~Informal leader~Spectator",
    "A player who earns respect and influence without a title is an…~Informal leader~Formal leader~Official",
    "Which behavior fits good leadership?~Listening and modeling the behavior you ask for~Changing rules constantly~Blaming others",
    "Consistency in a leader means…~Treating similar situations the same way~Changing mood daily~Avoiding feedback",
    "A transformational coach is likely to say…~Here is where we are going and why it matters~Do it because I said so~Work it out alone",
    "Why do athletes leaders matter?~They shape culture and help teammates~They replace the coach~They set no standards"]);
  const e9 = T("Program design variables", "🛠️", "A strong training program is built from a set of adjustable <b>variables</b>. Change one and the training changes.",
    "Key variables: <b>exercise selection and order</b>, <b>volume</b> (sets × reps), <b>intensity</b> (load), <b>rest intervals</b>, <b>tempo</b> (speed of each rep) and <b>frequency</b>. Do the most technical or power-based lifts first when fresh. Long rests of about 2 to 5 minutes suit heavy strength work; short rests suit muscular endurance. Splits: <b>full-body</b>, <b>upper/lower</b> or <b>push/pull/legs</b>.",
    "Pick the variable the question names and think how it should change.", "A beginner trains the whole body three times a week; an advanced lifter splits into upper-body and lower-body days.", [
    "Which should usually come first in a session?~Technical or power exercises~Easy finishers~Cool-down stretches",
    "For heavy strength work, rest between sets is usually…~Long, around 2 to 5 minutes~Very short, 10 seconds~None",
    "Tempo describes…~The speed of each phase of a rep~How many sets are done~Heart rate zone",
    "A push/pull/legs routine splits training by…~Movement pattern~Time of day~Age",
    "Volume is calculated as…~Sets × reps~Load ÷ rest~Weeks × days",
    "A full-body routine trains…~All major muscle groups in each session~Only legs~Only one muscle per month",
    "Muscular endurance training usually uses…~Lighter loads with shorter rests~Maximum loads with long rests~No loads",
    "Frequency means…~How often you train a movement or muscle~How hard each rep is~How long each rep takes"]);
  const e10 = T("Professional ethics in kinesiology", "⚖️", "People who coach, train or study movement are trusted with others' health and information. Ethics are the rules of that trust.",
    "<b>Informed consent</b> means people know the risks and benefits before agreeing to testing or research. <b>Confidentiality</b> keeps health data private. <b>Scope of practice</b> is what a professional is trained and allowed to do; a trainer should not diagnose or prescribe medicine, but <b>refer</b> to a physician. Research ethics require honest data and review by an ethics board.",
    "Ask: consent, privacy, scope, or honesty?", "A trainer notices an athlete's chest pain during testing, stops the session and refers him to a doctor instead of guessing the cause.", [
    "Before a fitness test, participants should give…~Informed consent~A secret~Payment in advance",
    "Keeping clients' health data private is…~Confidentiality~Periodization~Transparency",
    "A personal trainer who suspects a medical problem should…~Refer the client to a physician~Diagnose and treat it themselves~Ignore it",
    "Scope of practice means…~What a professional is trained and allowed to do~How far you can run~How many clients you can have",
    "Which is a breach of research ethics?~Making up or changing data~Reporting honest results~Getting consent",
    "An institutional review board (ethics board) is there to…~Protect the rights and safety of participants~Choose the winners~Approve diets for fans",
    "Which should a coach NOT do?~Share an athlete's private medical details publicly~Ask permission before sharing~Keep notes secure",
    "A conflict of interest happens when…~A personal gain could bias a professional's advice~A client asks a question~Two coaches agree"]);
  const e11 = T("Kinematics and kinetics", "📐", "Biomechanics has two big branches. One describes motion; the other explains the forces behind it.",
    "<b>Kinematics</b> describes motion without asking about forces: position, <b>displacement</b>, velocity, acceleration, angles. <b>Kinetics</b> studies the forces that cause motion. <b>Distance</b> is the total path (a scalar); <b>displacement</b> is the straight-line change in position (a vector). <b>Speed</b> is a scalar; <b>velocity</b> includes direction.",
    "Motion alone is kinematics; forces behind it is kinetics.", "A runner who jogs a lap of 400 m ends where she began, so her distance is 400 m and her displacement is zero.", [
    "Describing how fast a runner moves without talking about forces is…~Kinematics~Kinetics~Physiology",
    "Studying the forces that cause a sprinter to accelerate is…~Kinetics~Kinematics~Nutrition",
    "A runner completes a full 400 m lap and returns to the start. Her displacement is…~Zero~400 m~200 m",
    "Which quantity includes direction?~Velocity~Speed~Distance",
    "Distance is…~The total length of path traveled~The straight-line change in position~A force",
    "Displacement is a…~Vector~Scalar only~Time",
    "A ground reaction force is studied in…~Kinetics~Kinematics~Neither",
    "Joint angles measured on video are part of…~Kinematics~Kinetics~Nutrition"]);
  const e12 = T("Neural adaptations to strength training", "🧠", "A beginner can get stronger quickly with almost no change in muscle size. The nervous system gets better first.",
    "Early strength gains (about the first 4 to 8 weeks) come largely from <b>neural adaptations</b>: better <b>motor unit recruitment</b>, more <b>synchronization</b>, higher <b>firing rates</b>, improved coordination and less opposing (antagonist) activation. Muscle growth (<b>hypertrophy</b>) becomes a bigger part later. <b>Cross-education</b> means training one limb can raise strength in the untrained limb.",
    "Early: brain and nerves. Later: bigger muscles.", "A new lifter adds 10 kg to her squat in six weeks, but a scan shows little change in muscle size.", [
    "Early strength gains in beginners are mostly due to…~Neural adaptations~Large muscle growth~Bone length",
    "Neural adaptations include…~Better motor unit recruitment~Longer bones~Fewer lungs",
    "Hypertrophy becomes a larger factor…~Later in training~Never~Only on day 1",
    "Cross-education is when training one limb…~Improves strength in the other limb~Hurts the other limb~Changes nothing",
    "Less activation of opposing (antagonist) muscles helps because…~Movement is less restricted~Muscles shrink~The heart works less",
    "Synchronization in strength training means motor units…~Fire closer together in time~Fire one at a time randomly~Stop firing",
    "A beginner may gain strength fast without much visible size change because…~The nervous system adapts first~Muscles instantly double~Tendons vanish",
    "Which training idea is best for neural adaptation?~Practicing the specific lift with good technique~Never lifting the real exercise~Random exercises each day"]);

  const f1 = N("Time under tension", "⏲️", "<b>Tempo</b> tells you how long each part of a rep takes, and <b>time under tension</b> adds those seconds up.",
    "A tempo of <b>3-1-2</b> means 3 seconds lowering, 1 second pause and 2 seconds lifting. One rep takes 3 + 1 + 2 = 6 seconds. <b>Time under tension per set = seconds per rep × reps.</b>",
    "Add the tempo numbers first, then multiply by reps.", () => {
    const a = ri(2, 4), b = ri(0, 2), c = ri(1, 2), reps = ri(5, 10), sets = ri(2, 4);
    if (ri(1, 2) === 1) return { text: `A lifter uses a ${a}-${b}-${c} tempo (seconds lowering, pause, lifting) for ${reps} reps. What is the time under tension for one set, in seconds?`, visual: "⏲️", answer: (a + b + c) * reps,
      hints: ["One rep takes the sum of the three tempo numbers.", "Add the three numbers, then multiply by the reps.", "Example: tempo 3-1-2 for 5 reps: 6 s per rep × 5 = 30 s. Now do yours."] };
    return { text: `Each rep takes ${a + b + c} seconds. A lifter does ${sets} sets of ${reps} reps. How many seconds under tension in total?`, visual: "⏲️", answer: (a + b + c) * reps * sets,
      hints: ["Find the reps in total first.", "Multiply sets by reps, then by the seconds per rep.", "Example: 5 s per rep, 2 sets of 4: 8 reps × 5 = 40 s. Now do yours."] };
  });
  const f2 = N("Standard scores (z-scores)", "📏", "A <b>z-score</b> shows how many standard deviations a result is from the average, which lets you compare different tests.",
    "<b>z = (score − mean) ÷ standard deviation.</b> A score one standard deviation above the mean has z = 1. Scores above the mean have positive z.",
    "Subtract the mean first, then divide by the standard deviation.", () => {
    const sd = pick([2, 5, 10]), mean = pick([40, 50, 60, 100]), z = ri(1, 3);
    if (ri(1, 2) === 1) return { text: `A fitness test has mean ${mean} and standard deviation ${sd}. An athlete scores ${mean + z * sd}. How many standard deviations above the mean is that (the z-score)?`, visual: "📏", answer: z,
      hints: ["Compare the score with the mean first.", "Subtract the mean, then divide by the standard deviation.", "Example: mean 50, SD 5, score 60: (60 − 50) ÷ 5 = 2. Now do yours."] };
    return { text: `A test has mean ${mean} and standard deviation ${sd}. What score is ${z} standard deviations above the mean?`, visual: "📏", answer: mean + z * sd,
      hints: ["Each standard deviation is a fixed step above the mean.", "Multiply the standard deviation by the number of steps, then add the mean.", "Example: mean 50, SD 5, 2 steps: 50 + 10 = 60. Now do yours."] };
  });
  const f3 = N("Landing forces", "⬇️", "When you land, the ground pushes back. This <b>ground reaction force (GRF)</b> is often described as a multiple of body weight.",
    "<b>Weight (N) ≈ mass (kg) × 10</b> in these problems (using g ≈ 10 m/s²). Walking has a GRF of about 1 to 1.2 times body weight; running about 2 to 3 times; some landings are higher. <b>GRF = multiple × weight.</b> Bending your knees spreads force over more time and lowers peak force.",
    "Turn mass into newtons first, then multiply.", () => {
    const m = ri(5, 9) * 10, k = ri(2, 4);
    return { text: `A ${m} kg runner has weight about ${m * 10} N (g ≈ 10). The ground reaction force when landing is ${k} times body weight. What is the force in newtons?`, visual: "⬇️", answer: m * 10 * k,
      hints: ["The force is a multiple of the runner's weight.", "Multiply the weight in newtons by the number of times.", "Example: weight 600 N, 2 times body weight = 1200 N. Now do yours."] };
  });
  const f4 = N("Energy cost from oxygen", "🫁", "Scientists estimate energy use from how much oxygen the body uses. About <b>5 kcal</b> of energy are released per liter of oxygen.",
    "<b>Energy (kcal) ≈ liters of O₂ × 5.</b> VO₂ in ml/kg/min can be found from METs: <b>VO₂ = METs × 3.5 ml/kg/min</b>. Multiply by body mass to get ml/min, and divide by 1000 for L/min.",
    "Find liters of oxygen first, then multiply by 5.", () => {
    if (ri(1, 2) === 1) { const l = ri(1, 3), t = pick([10, 20, 30, 60]); return { text: `An athlete uses ${l} liters of oxygen per minute for ${t} minutes. About how many kilocalories (5 kcal per liter) is that?`, visual: "🫁", answer: l * t * 5,
      hints: ["First find the total liters of oxygen.", "Multiply liters per minute by minutes, then by 5 kcal per liter.", "Example: 2 L/min for 10 min = 20 L, 20 × 5 = 100 kcal. Now do yours."] }; }
    const met = ri(4, 10), kg = pick([50, 60, 70, 80, 90]); return { text: `Using VO₂ = METs × 3.5 ml/kg/min, how many ml of oxygen per minute does a ${kg} kg person use at ${met} METs?`, visual: "🫁", answer: met * 3.5 * kg,
      hints: ["First find ml per kilogram per minute.", "Multiply the METs by 3.5, then by body mass in kg.", "Example: 4 METs, 60 kg: 4 × 3.5 = 14, 14 × 60 = 840 ml/min. Now do yours."] };
  });
  const f5 = N("Power to weight ratio", "⚡", "Cyclists often compare riders by <b>watts per kilogram</b>, because climbing speed depends on power compared with mass.",
    "<b>Power-to-weight = power (W) ÷ body mass (kg).</b> A 60 kg rider producing 240 W has 4 W/kg. To find power, multiply W/kg by mass.",
    "Divide watts by kilograms, or multiply to go the other way.", () => {
    const m = pick([50, 60, 70, 80]), r = ri(2, 6);
    if (ri(1, 2) === 1) return { text: `A ${m} kg rider produces ${m * r} watts. What is the power-to-weight ratio in W/kg?`, visual: "🚴", answer: r,
      hints: ["The ratio compares power with body mass.", "Divide the watts by the body mass.", "Example: 300 W from a 75 kg rider is 300 ÷ 75 = 4 W/kg. Now do yours."] };
    return { text: `A ${m} kg rider sustains ${r} W/kg. How many watts is that?`, visual: "🚴", answer: m * r,
      hints: ["The ratio tells you watts for each kilogram.", "Multiply the ratio by the body mass.", "Example: 3 W/kg at 70 kg = 210 W. Now do yours."] };
  });
  const f6 = N("Weeks in a training cycle", "🗓️", "Plans are built from cycles: a <b>macrocycle</b> (often a season or year), <b>mesocycles</b> (blocks of several weeks) and <b>microcycles</b> (usually one week).",
    "Mesocycles are often 4 weeks, with three harder weeks followed by an easier <b>deload</b> week. <b>Number of mesocycles = macrocycle weeks ÷ mesocycle weeks.</b> Hard weeks = mesocycles × 3 in a 3 + 1 pattern.",
    "Divide the weeks by 4 to count blocks.", () => {
    const k = ri(2, 7), W = 4 * k;
    if (ri(1, 2) === 1) return { text: `A ${W}-week macrocycle is split into 4-week mesocycles. How many mesocycles are there?`, visual: "🗓️", answer: k,
      hints: ["Each block is the same length.", "Divide the total weeks by the weeks in one block.", "Example: 20 weeks ÷ 4 = 5 mesocycles. Now do yours."] };
    return { text: `A ${W}-week macrocycle uses 4-week mesocycles with 3 hard weeks and 1 deload week each. How many hard weeks are there in all?`, visual: "🗓️", answer: 3 * k,
      hints: ["First count the mesocycles.", "Multiply the number of mesocycles by 3 hard weeks.", "Example: 8 weeks = 2 mesocycles, 2 × 3 = 6 hard weeks. Now do yours."] };
  });

  Object.assign(PE_LEVELS, {
    25: [
      L("The gait cycle", a1), L("Anti-doping and supplements", a2), L("Mental imagery", a3), L("Agonists, antagonists and stabilizers", a4),
      L("Linear and undulating periodization", a5), L("Team cohesion", a6), L("Motor units and recruitment", a7), L("Compound and isolation exercises", a8),
      L("Barriers to taking part", a9), L("Lacrosse basics", a10), L("Exercise and the immune system", a11), L("Rowing basics", a12),
      L("Relative strength", b1), L("Work to rest ratio", b2), L("Energy deficit and body fat", b3), L("Impulse and momentum", b4), L("Splits and average speed", b5), L("Weekly training volume", b6),
      L("Mixed practice", MIX(a1, a3, a5, a7, b1, b4, b5)), L("Level 25 Challenge", MIX(a2, a4, a6, a8, a9, a11, a12, b2, b3, b6))
    ],
    26: [
      L("Types of synovial joints", c1), L("Stretch reflex and the stretch-shortening cycle", c2), L("Types of motor skills", c3), L("Coaching styles", c4),
      L("Long-term athlete development", c5), L("Preventing ACL injuries", c6), L("Field tests of fitness", c7), L("Self-efficacy", c8),
      L("Attention and focus", c9), L("Stages of team development", c10), L("Stages of behavior change", c11), L("Cycling and drafting", c12),
      L("Estimating resting energy (BMR)", d1), L("Protein targets", d2), L("Estimating maximum heart rate", d3), L("Progressive overload by percent", d4), L("Torque at a joint", d5), L("Injury rate per 1000 hours", d6),
      L("Mixed practice", MIX(c1, c3, c5, c7, d1, d3, d5)), L("Level 26 Challenge", MIX(c2, c4, c6, c8, c9, c10, c11, c12, d2, d4, d6))
    ],
    27: [
      L("Anatomical directional terms", e1), L("Force-velocity and length-tension", e2), L("Cardiovascular drift and steady state", e3), L("Research design basics", e4),
      L("Reliability and validity", e5), L("Arousal and performance theories", e6), L("Self-determination theory", e7), L("Leadership in coaching", e8),
      L("Program design variables", e9), L("Professional ethics in kinesiology", e10), L("Kinematics and kinetics", e11), L("Neural adaptations to strength training", e12),
      L("Time under tension", f1), L("Standard scores (z-scores)", f2), L("Landing forces", f3), L("Energy cost from oxygen", f4), L("Power to weight ratio", f5), L("Weeks in a training cycle", f6),
      L("Mixed practice", MIX(e1, e3, e5, e7, f1, f2, f4)), L("Level 27 Challenge", MIX(e2, e4, e6, e8, e9, e10, e11, e12, f3, f5, f6))
    ]
  });
})();
