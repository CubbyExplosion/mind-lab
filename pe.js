// Mind Lab Physical Education. Levels 1-3 have 20 lessons each (60 lessons).
// Quiz-based (kids are at a screen). Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints.
// Needs math.js and spelling.js loaded first (uses ri, pick, shuf).
const PE_LEVELS = (() => {
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
  // N: a numeric lesson. gen() returns {text, visual?, answer, hints}
  const N = (title, v, intro, facts, tip, gen) => {
    const f = () => gen();
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Tip", v: "🖐️", t: tip }];
    return f;
  };

  // ---------- computed lessons ----------
  const countJumps = N("Count the jumps", "🤸", "We count to keep track of how many times we move. Counting is a PE skill!", "Point to each picture and say the next number. The last number you say is the total.", "Touch each one just once so you do not skip or double-count.", () => {
    const e = pick(["⭐", "🤸", "🦘", "👏"]), n = ri(2, 10), what = { "⭐": "stars", "🤸": "jumping jacks", "🦘": "jumps", "👏": "claps" }[e];
    return { text: `How many ${what} are there? Count them.`, visual: e.repeat(n), answer: n,
      hints: ["Point to each picture one at a time.", "Say the next number for each picture. Do not skip any.", "Example: 👏👏👏 is 3, because 1, 2, 3. Now do yours."] };
  });
  const laps = N("Counting laps", "🏃", "A lap is one trip all the way around the track or the gym. We count laps to know how far we ran.", "Add laps together when you run more. Take away when you are asking how many are left.", "Write down the numbers, then add or take away.", () => {
    const n = pick(NAMES), r = Math.random();
    if (r < 0.4) { const a = ri(2, 6), b = ri(1, 4); return { text: `${n} runs ${a} laps in the morning and ${b} more laps in the afternoon. How many laps in all?`, visual: "🏃", answer: a + b,
      hints: ["Does the story put laps together or take some away?", "Putting laps together means you add the two numbers.", "Example: 3 laps and then 2 more laps. 3 + 2 = 5 laps. Now do yours."] }; }
    if (r < 0.8) { const g = ri(5, 10), d = ri(1, g - 1); return { text: `The class wants to run ${g} laps. ${n} has run ${d}. How many laps are left?`, visual: "🏟️", answer: g - d,
      hints: ["Find out how far you are from the goal.", `Count up from ${d} to ${g}, or take away ${d} from ${g}.`, "Example: goal 6 laps, ran 4. Count up: 5, 6. That is 2 laps left. Now do yours."] }; }
    const a = ri(2, 5); return { text: `${n} runs ${a} laps. Then ${n} runs the same number again. How many laps in all?`, visual: "🏃", answer: a * 2,
      hints: ["The same number again means a double.", "Add the number to itself.", "Example: 4 laps, then 4 laps again. 4 + 4 = 8 laps. Now do yours."] };
  });
  const reps = N("Counting reps", "🔢", "A <b>rep</b> is doing one move one time, like one jumping jack. We count reps to see how much we did.", "Add reps when you do more. Each jump is one rep.", "Count out loud: 1, 2, 3 as you move.", () => {
    const n = pick(NAMES), a = ri(2, 9), b = ri(1, 10 - a + 1), mv = pick(["jumping jacks", "hops", "squats", "toe touches", "arm circles"]);
    if (Math.random() < 0.5) return { text: `${n} does ${a} ${mv} and then ${b} more. How many ${mv} is that?`, answer: a + b,
      hints: ["Does the story add more or take some away?", "More reps means you add the numbers together.", "Example: 4 hops and then 3 more hops. 4 + 3 = 7 hops. Now do yours."] };
    const g = ri(a + 1, 12); return { text: `The goal is ${g} ${mv}. ${n} has done ${a}. How many more to reach the goal?`, answer: g - a,
      hints: ["How far is the child from the goal?", `Count up from ${a} to ${g}, or take away ${a} from ${g}.`, "Example: goal 8, done 5. Count up: 6, 7, 8. That is 3 more. Now do yours."] };
  });
  const sets2 = N("Groups of reps", "✖️", "We often do the same move in groups called <b>sets</b>. Skip counting finds the total fast.", "3 sets of 5 jumps: count by 5s three times: 5, 10, 15.", "Skip count by the size of the group, one time for each group.", () => {
    const per = pick([2, 5, 10]), k = ri(2, 5), n = pick(NAMES);
    return { text: `${n} does ${per} jumps in each set. ${n} does ${k} sets. How many jumps in all?`, visual: "🦘", answer: per * k,
      hints: ["Each set has the same number of jumps.", `Skip count by ${per}s, ${k} times.`, "Example: 5 squats in a set, 2 sets. Count by 5s: 5, 10. That is 10 squats. Now do yours."] };
  });
  const setsReps3 = N("Sets and reps", "💪", "Strong moves come in sets. You can multiply or skip count to find the total.", "<b>Sets × reps</b>: 4 sets of 5 squats is 4 × 5 = 20 squats.", "Skip count by the reps, once for each set. Add any extra reps at the end.", () => {
    const s = ri(2, 5), r = pick([3, 4, 5, 10]), e = ri(0, 3), n = pick(NAMES);
    if (e) return { text: `${n} does ${s} sets of ${r} squats and then ${e} extra squats. How many squats in all?`, answer: s * r + e,
      hints: ["First find the squats in the sets. Then add the extras.", `Skip count by ${r}s, ${s} times. Then add ${e} more.`, "Example: 2 sets of 5 and 3 extra. 5, 10, then 11, 12, 13. That is 13. Now do yours."] };
    return { text: `${n} does ${s} sets of ${r} push-ups against the wall. How many push-ups in all?`, answer: s * r,
      hints: ["Each set has the same number.", `Skip count by ${r}s, ${s} times.`, "Example: 3 sets of 4: 4, 8, 12. That is 12. Now do yours."] };
  });
  const minutes3 = N("Time to move", "⏱️", "A good PE time has a warm-up, play and a cool-down. We add the minutes to find the total.", "Warm-up 5 minutes + play 20 minutes + cool-down 5 minutes = 30 minutes.", "Add the three parts: warm-up, play and cool-down.", () => {
    const w = pick([5, 10]), p = pick([15, 20, 25, 30]), c = pick([5, 10]);
    return { text: `Warm-up is ${w} minutes. Play time is ${p} minutes. Cool-down is ${c} minutes. How many minutes is the whole PE time?`, answer: w + p + c,
      hints: ["The whole time is all three parts put together.", "Add the warm-up, the play and the cool-down. Start with the biggest number.", "Example: 5 + 10 + 5. 10 + 5 = 15, and 15 + 5 = 20 minutes. Now do yours."] };
  });
  const lapSteps3 = N("Laps and steps", "👟", "If every lap is the same size, you can multiply or skip count to find the total.", "One lap is 20 steps. 3 laps is 20, 40, 60 steps.", "Skip count by the steps in one lap, once for each lap.", () => {
    const st = pick([10, 20, 5]), k = ri(2, 5), n = pick(NAMES);
    if (Math.random() < 0.5) return { text: `One lap around the gym is ${st} steps. ${n} walks ${k} laps. How many steps in all?`, visual: "🏃", answer: st * k,
      hints: ["Each lap has the same number of steps.", `Skip count by ${st}s, ${k} times.`, "Example: 1 lap is 10 steps, so 3 laps is 10, 20, 30 steps. Now do yours."] };
    const g = ri(8, 12), d = ri(3, g - 2); return { text: `${n}'s goal is ${g} laps. ${n} ran ${d} laps. How many laps are left?`, visual: "🏟️", answer: g - d,
      hints: ["How far is it to the goal?", `Count up from ${d} to ${g}.`, "Example: goal 10, ran 7. Count up: 8, 9, 10. That is 3 left. Now do yours."] };
  });

  // ---------- topics ----------
  const P = {
    // ===== LEVEL 1 =====
    bodyMove: T("Body parts that move", "🦵", "Our bodies have parts that help us move. Each part has a job in PE.", "<b>Legs</b> and <b>feet</b> run, hop and kick. <b>Arms</b> and <b>hands</b> throw and catch. <b>Knees</b> bend. <b>Head</b> nods.", "Picture the move and ask: which body part is doing the work?", "To clap, you use your hands.", [
      ["⚽|Which body part do we use to kick a ball?", "Leg and foot", ["Ear", "Elbow"]], ["🏀|Which body part do we use to throw a ball?", "Arm and hand", ["Knee", "Toes"]], ["👏|Which body part do we use to clap?", "Hands", ["Feet", "Knees"]],
      ["🦘|Which body parts help us jump?", "Legs", ["Ears", "Arms only"]], ["🙆|Which body part bends when we sit down?", "Knees", ["Eyes", "Nose"]], ["🙂|Which body part do we nod?", "Head", ["Feet", "Hands"]],
      ["🏃|Which body parts swing when we run?", "Arms and legs", ["Ears", "Eyebrows"]], ["🙌|Which body parts do we raise high to stretch up?", "Arms", ["Knees", "Toes"]]]),
    walkRun: T("Walk, run and hop", "🏃", "Moving from place to place is called <b>traveling</b>. There are many ways to travel with your body.", "<b>Walk</b>: one foot after the other, slowly. <b>Run</b>: fast, with a tiny float in the air. <b>Hop</b>: on one foot only.", "Count the feet used and think about how fast the move is.", "A turtle walks slowly. A rabbit hops.", [
      ["🐢|Which move is slow and steady, with one foot after the other?", "Walk", ["Run", "Hop"]], ["💨|Which move is fast, with both feet leaving the ground for a moment?", "Run", ["Walk", "Hop"]],
      ["🦵|Which move uses only one foot and lands on the same foot?", "Hop", ["Walk", "Run"]], ["🐇|Which move is like a rabbit, on one foot?", "Hop", ["Walk", "Run"]],
      ["🚶|Which move is the slowest?", "Walk", ["Run", "Hop"]], ["🏁|Which move helps you win a race?", "Run", ["Walk", "Stand"]],
      ["👣|When you walk, how many feet are on the ground at the same time?", "At least one", ["Always none", "Always five"]], ["🦶|How many feet do you use to hop?", "One foot", ["Two feet", "Three feet"]]]),
    jumpSkip: T("Jump and skip", "🤸", "Jumping and skipping are fun ways to travel, and they both lift your body off the ground.", "<b>Jump</b>: bend your knees, push off with <b>two feet</b> and land on two feet. <b>Skip</b>: step, then hop, switching feet.", "Think about how many feet push off and what rhythm the move has.", "A jump goes straight up on two feet. A skip is step-hop, step-hop.", [
      ["🦘|Which move pushes off with two feet and lands on two feet?", "Jump", ["Hop", "Walk"]], ["🎵|Which move is step-hop, step-hop?", "Skip", ["Jump", "Run"]],
      ["How do you get ready to jump?", "Bend your knees", ["Lock your knees", "Close your eyes"]], ["How should we land after a jump?", "Softly, with bent knees", ["Stiff and loud", "On our hands"]],
      ["Which move switches feet each time?", "Skip", ["Jump", "Stand still"]], ["Which move can go very high straight up?", "Jump", ["Skip", "Slow walk"]],
      ["✨|Which move feels bouncy and happy?", "Skip", ["Lie down", "Freeze"]], ["Which move uses a swinging of arms to help?", "Jump", ["Sit", "Roll"]]]),
    gallop: T("Gallop and slide", "🐴", "Horses gallop! You can gallop too, and you can also slide to the side.", "<b>Gallop</b>: one foot leads and the other foot chases it. <b>Slide</b>: move sideways, step-together, step-together.", "Think about which direction you travel and which foot is in front.", "A horse gallops forward with one foot in front. A slide goes to the side.", [
      ["🐴|Which move is like a horse, with one foot leading?", "Gallop", ["Slide", "Hop"]], ["➡️|Which move goes sideways?", "Slide", ["Gallop", "Skip"]],
      ["In a gallop, one foot is always…", "In front", ["Behind everyone", "Off the floor"]], ["In a slide, you move…", "To the side", ["Straight up", "Backwards only"]],
      ["Which move do you do with your eyes on where you are going, forward?", "Gallop", ["Slide", "Crawl"]], ["Which move is good for moving along a line sideways?", "Slide", ["Gallop", "Hop"]],
      ["🦄|Pretend to be a unicorn. Which move fits?", "Gallop", ["Sleep", "Freeze"]], ["In a slide, your feet…", "Come together after each step", ["Never move", "Leave the gym"]]]),
    balls: T("Sports balls", "⚽", "Many sports use balls. Each sport has its own kind of ball!", "⚽ soccer ball, 🏀 basketball, ⚾ baseball, 🎾 tennis ball, 🏐 volleyball, 🏈 football.", "Look at the picture, or think which sport you play with that ball.", "A basketball is orange and you bounce it, called dribbling.", [
      ["⚽|What is this ball?", "Soccer ball", ["Basketball", "Baseball"]], ["🏀|What is this ball?", "Basketball", ["Soccer ball", "Tennis ball"]], ["⚾|What is this ball?", "Baseball", ["Basketball", "Volleyball"]],
      ["🎾|What is this ball?", "Tennis ball", ["Soccer ball", "Football"]], ["🏐|What is this ball?", "Volleyball", ["Baseball", "Basketball"]], ["🏈|What is this?", "Football", ["Basketball", "Tennis ball"]],
      ["Which ball do you kick?", "Soccer ball", ["Basketball", "Baseball"]], ["Which ball goes in a hoop?", "Basketball", ["Soccer ball", "Football"]]]),
    equipment: T("Sports equipment", "🥅", "Equipment is the gear we use to play a sport.", "A <b>bat</b> hits a baseball. A <b>net</b> catches a ball or divides a court. A <b>racket</b> hits a tennis ball. A <b>helmet</b> protects the head.", "Think about what the tool does in the game.", "You use a racket to hit a tennis ball.", [
      ["⚾|What do you use to hit a baseball?", "A bat", ["A net", "A helmet"]], ["🥅|What catches the ball when you score in soccer?", "A goal net", ["A bat", "A racket"]],
      ["🎾|What do you use to hit a tennis ball?", "A racket", ["A bat", "A goal"]], ["⛑️|What protects your head on a bike?", "A helmet", ["A racket", "A net"]],
      ["🏐|What goes over the middle in volleyball?", "A net", ["A bat", "A helmet"]], ["🧤|What do you wear to catch a baseball?", "A glove", ["A helmet", "Goggles"]],
      ["🏀|What do you shoot a basketball into?", "A hoop", ["A net on the floor", "A bat"]], ["🧢|What helps keep sun out of your eyes?", "A cap", ["A racket", "A net"]]]),
    fastSlow: T("Fast and slow", "🐢", "We can move our bodies fast or slow. A good mover can do both.", "<b>Fast</b>: like a cheetah or race car. <b>Slow</b>: like a turtle or a sloth. We change our speed to match the game.", "Think about how quickly the animal or thing moves.", "A cheetah is fast. A turtle is slow.", [
      ["🐢|Which is slow?", "A turtle", ["A cheetah", "A race car"]], ["🐆|Which is fast?", "A cheetah", ["A turtle", "A snail"]], ["🐌|Which is slow?", "A snail", ["A rabbit", "A horse"]],
      ["🚗|Which is fast?", "A race car", ["A sloth", "A snail"]], ["Slow motion means moving…", "Very slowly", ["Very fast", "Not at all"]], ["To stop quickly, you should…", "Slow down and stop", ["Keep going fast", "Run into a wall"]],
      ["🐇|Which move is faster?", "Running", ["Walking slowly", "Standing"]], ["When the music is slow, we move…", "Slowly", ["Super fast", "Backwards"]]]),
    balance: T("Balance", "🧍", "<b>Balance</b> means staying steady without falling over. Good balance helps us in every sport.", "To balance, <b>look at one spot</b>, hold your arms out and keep your tummy tight. Standing on one foot is harder than two.", "Think about what helps your body stay still and steady.", "To stand on one foot, you look at one spot and hold your arms out.", [
      ["What does balance mean?", "Staying steady", ["Falling down", "Running fast"]], ["Which is harder?", "Standing on one foot", ["Standing on two feet", "Sitting on a chair"]],
      ["What helps you balance?", "Looking at one spot", ["Closing your eyes and spinning", "Wiggling hard"]], ["Where do you put your arms to balance?", "Out to the sides", ["Behind your back tied up", "Over your face"]],
      ["🤸|Which is a balance move?", "Standing like a flamingo", ["Running", "Falling"]], ["🧗|On a balance beam, you should…", "Go slowly and carefully", ["Run fast", "Jump off randomly"]],
      ["You feel wobbly. What can you do?", "Slow down and widen your feet", ["Keep spinning", "Close your eyes"]]]),
    stretch: T("Stretching", "🧘", "Stretching makes our muscles loose and ready to move.", "Stretch <b>slowly</b> and gently. <b>Hold</b> a stretch for a few seconds. Never bounce hard or pull until it hurts.", "Think: slow, gentle and no pain.", "Reach up high to the sky and hold for 5 seconds.", [
      ["How should we stretch?", "Slowly and gently", ["Very fast", "As hard as we can"]], ["Stretching helps our…", "Muscles", ["Hair", "Shoes"]], ["How long might we hold a stretch?", "A few seconds", ["Zero seconds", "All day"]],
      ["🙆|Reaching your arms up high is a…", "Stretch", ["Nap", "Snack"]], ["It hurts when you stretch. What do you do?", "Ease off", ["Pull harder", "Bounce"]], ["When do we usually stretch?", "Before and after exercise", ["Never", "Only while sleeping"]],
      ["🦵|Touching your toes stretches your…", "Legs", ["Ears", "Teeth"]]]),
    warmCool: S("Warm-up or cool-down?", "🌡️", "Before PE we <b>warm up</b> to wake up our muscles. After PE we <b>cool down</b> to slow our body.", "<b>Warm-up</b>: gentle moves before you play. <b>Cool-down</b>: slow moves and deep breaths after you play.", "Ask: does this get my body ready, or help it slow down?", "Slow, deep breaths after running are a cool-down.", {
      "Warm-up": ["arm circles", "marching in place", "light jogging", "leg swings", "shoulder rolls", "gentle jumping jacks"],
      "Cool-down": ["slow walking", "deep breaths", "slow stretches", "walking slowly in a circle", "shaking out your arms gently", "sitting and breathing slowly"] }, n => `Is <b>${n}</b> a warm-up or a cool-down?`),
    turns: T("Taking turns", "🔄", "Games are more fun when everyone gets a turn.", "Wait in line. <b>Don't cut</b>. Let others have a turn. Count or use a timer to share.", "Think about what is fair for everyone.", "At the swing, each child gets a turn and waits patiently.", [
      ["Everyone wants the ball. What is fair?", "Take turns", ["Grab it", "Hide it"]], ["There is a line for the slide. Where do you stand?", "At the back of the line", ["At the front", "In the middle of the slide"]],
      ["It's not your turn yet. What do you do?", "Wait patiently", ["Push ahead", "Yell"]], ["How can we share a jump rope?", "Count turns", ["Take it away", "Run off with it"]],
      ["Taking turns is…", "Fair", ["Unfair", "Silly"]], ["A friend is taking a long time. What do you do?", "Wait kindly", ["Take the ball", "Complain loudly"]],
      ["After your turn, you…", "Let the next person go", ["Stay forever", "Skip lines"]]]),
    fairPlay: T("Playing fair", "⚖️", "Playing fair means following the rules and being honest.", "Follow the rules. <b>Don't cheat</b>. Tell the truth if you tag yourself out. Keep hands to yourself.", "Ask: is it the same rules for everyone?", "If you step out of bounds, you say so, even if no one saw.", [
      ["What does playing fair mean?", "Following the rules", ["Cheating", "Winning at any cost"]], ["You stepped out of bounds. What do you do?", "Be honest and say so", ["Say nothing", "Blame someone"]],
      ["Is it okay to cheat to win?", "No", ["Yes", "Yes, if no one sees"]], ["Rules are for…", "Everyone", ["Only little kids", "Only the winners"]],
      ["Someone makes a mistake. What do you do?", "Help them kindly", ["Laugh at them", "Yell"]], ["The referee makes a call. What do you do?", "Listen and follow", ["Argue loudly", "Walk off"]],
      ["Fair play makes games…", "More fun for all", ["Boring", "Scary"]]]),
    include: T("Including everyone", "🤗", "A good team makes room for everyone, even if they are new or still learning.", "<b>Invite</b> others to play. <b>Pick</b> every child for teams. Encourage with kind words.", "Ask: is anyone left out? Can I invite them?", "A new student stands alone at recess, so you ask, \"Do you want to play?\"", [
      ["A new child stands alone. What do you do?", "Invite them to play", ["Ignore them", "Say \"no\""]], ["You're picking teams. What is kind?", "Pick everyone, even those you don't know", ["Pick only your best friends", "Pick no one"]],
      ["A friend can't run fast. What do you do?", "Cheer and include them", ["Leave them out", "Make fun"]], ["A game can be changed so that…", "Everybody can play", ["Only fast kids can play", "Only one child plays"]],
      ["A child is shy. What can you say?", "Want to join us?", ["Go away", "We don't need you"]], ["Everyone is different. That means…", "We can all play together", ["Only some can play", "Nobody plays"]],
      ["Including others makes you…", "A kind teammate", ["A bad sport", "Someone alone"]]]),
    goodSport: T("Being a good sport", "🤝", "A good sport is kind whether they win or lose.", "Say <b>\"Good game!\"</b>. Don't brag or pout. Cheer for others. Say thank you to your coach and referee.", "Be kind when you win and kind when you lose.", "After the game, you shake hands and say, \"Good game.\"", [
      ["You won! What do you say?", "Good game!", ["I'm the best, you're bad", "Ha ha"]], ["You lost. What do you do?", "Say \"good game\" and try again", ["Pout and throw the ball", "Blame others"]],
      ["A teammate misses. What do you say?", "Nice try!", ["That was awful", "You're out"]], ["A good sport…", "Is kind to everyone", ["Brags a lot", "Quits when losing"]],
      ["After the game, we…", "Say thank you", ["Tease the other team", "Leave a mess"]], ["Winning is…", "Not the only thing; fun and fair play matter", ["Everything", "All that counts"]],
      ["You see a player fall. What do you do?", "Check if they're okay", ["Laugh", "Keep playing and ignore"]]]),
    hydrate: T("Water in PE", "🚰", "When we move, we sweat and lose water. We drink water to feel good.", "Drink water <b>before</b>, <b>during</b> breaks, and <b>after</b> you play. Water is the best drink for sports.", "Think about what your body loses when it moves a lot.", "After running, you take a drink of water to feel better.", [
      ["What is the best drink when you play?", "Water", ["Soda", "Syrup"]], ["When do you drink water?", "Before, during breaks and after", ["Never", "Only when sleeping"]],
      ["Why do we drink water when we exercise?", "Because we lose water when we sweat", ["To make us wetter", "For no reason"]], ["It's a hot day. What do you do?", "Drink water and rest in the shade", ["Skip drinks", "Run harder"]],
      ["Where can you get water at school?", "A water fountain or bottle", ["A mud puddle", "A toilet"]], ["Water helps our body…", "Stay cool and work well", ["Freeze", "Get sleepy"]],
      ["You feel very thirsty. You should…", "Tell a teacher and drink water", ["Keep quiet", "Go faster"]]]),
    gear: T("Safety gear", "⛑️", "Safety gear protects our bodies when we play and ride.", "Wear a <b>helmet</b> on bikes and scooters. Wear <b>sneakers</b> and tie them. Wear a <b>life jacket</b> on boats. Use sunscreen outside.", "Think about what could get hurt and what protects it.", "On a bike, you buckle your helmet to protect your head.", [
      ["⛑️|What protects your head on a bike?", "A helmet", ["A scarf", "A bandana"]], ["👟|What should you wear for PE?", "Sneakers", ["Flip-flops", "Socks only on a slippery floor"]],
      ["Shoelaces should be…", "Tied", ["Loose", "Tied to a friend's"]], ["🛶|What do you wear in a boat?", "A life jacket", ["A big coat", "Backpack"]],
      ["🧴|What protects your skin outside?", "Sunscreen", ["Mud", "Glitter"]], ["🛹|What do you wear on a scooter?", "A helmet", ["A cape", "Nothing"]],
      ["Why do we wear safety gear?", "To keep us safe", ["To look funny", "It doesn't matter"]]]),
    countJumps: countJumps,
    heartBeat: T("Your heart", "❤️", "Your <b>heart</b> beats all day. It pumps blood around your body.", "When you run or jump, your heart beats <b>faster</b>. When you rest, it beats <b>slower</b>.", "Think: when you move a lot, what does your heart do?", "After you rest, your heart beats slowly.", [
      ["❤️|What does your heart do?", "Pumps blood", ["Chews food", "Helps you hear"]], ["🏃|What happens to your heart when you run?", "It beats faster", ["It stops", "It beats slower"]],
      ["😴|What happens to your heart when you rest?", "It beats slower", ["It beats faster", "It stops"]], ["How can you feel your heartbeat?", "Put a hand on your chest", ["Put a hand on your toe", "Hold your nose"]],
      ["After exercise, your heart…", "Slowly calms down", ["Stays super fast forever", "Disappears"]], ["Exercise makes your heart…", "Strong", ["Weak", "Sleepy"]],
      ["Does your heart ever take a day off?", "No, it works all the time", ["Yes, on weekends", "Yes, at night"]]])
  };
  Object.assign(P, {
    // ===== LEVEL 2 =====
    loco: S("Travel or stay in place?", "🧭", "Some moves <b>travel</b> from place to place. Others happen in one spot.", "Travel moves: walk, run, hop, skip, gallop, slide. Stay-in-place moves: stretch, twist, bend, shake, sway.", "Ask: do my feet go somewhere, or do I stay in my spot?", "Hopping goes across the floor. Twisting stays in one spot.", {
      "Travels": ["running", "hopping", "skipping", "galloping", "walking", "sliding"],
      "Stays in place": ["twisting", "bending", "stretching up", "swaying", "shaking", "spinning in one spot"] }, n => `Does <b>${n}</b> travel or stay in place?`),
    throwCatch: T("Throwing and catching", "🤲", "Throwing and catching are skills we practice to get better.", "To throw: <b>step</b> forward, <b>look</b> at the target and swing your arm. To catch: <b>eyes on the ball</b>, hands ready, and bring it in.", "Think about where your eyes and hands should be.", "To catch, you keep your eyes on the ball and hold your hands out.", [
      ["Where do your eyes go when you catch?", "On the ball", ["On your shoes", "On the sky far away"]], ["How do your hands look to catch?", "Ready and open", ["In your pockets", "Behind you"]],
      ["Before you throw, you…", "Look at your target", ["Close your eyes", "Turn around"]], ["After you catch, you…", "Bring the ball in to your body", ["Throw it away", "Drop it"]],
      ["Which foot steps forward when you throw with your right hand?", "Your left foot", ["Your right foot", "Neither"]], ["Who do you throw to?", "A partner who is ready", ["Someone looking away", "A window"]],
      ["Throwing underhand means your arm swings…", "From low", ["From high over the head", "Behind the head"]]]),
    kickDribble: T("Kicking and dribbling", "⚽", "Kicking and dribbling help us move a ball where we want.", "To <b>kick</b>, plant one foot beside the ball and swing the other. To <b>dribble</b> in basketball, bounce with your <b>hand</b>. In soccer, dribble with your <b>feet</b>.", "Think about which body part moves the ball in each game.", "In basketball, you push the ball down with your fingertips to dribble.", [
      ["⚽|Which part do you use to kick?", "Your foot", ["Your hand", "Your head only"]], ["🏀|How do you dribble a basketball?", "Bounce it with your hand", ["Kick it", "Carry it and run"]],
      ["⚽|How do you dribble in soccer?", "With your feet", ["With your hands", "With your teeth"]], ["Before you kick, where is your other foot?", "Next to the ball", ["In the air", "Far away"]],
      ["🏀|Which part of your hand do you use to dribble?", "Fingertips", ["Fist", "Elbow"]], ["Do you look at the ball the whole time while dribbling?", "Not all the time; look up sometimes", ["Never", "Always the ground only"]],
      ["Which is a kicking game?", "Soccer", ["Basketball", "Volleyball"]]]),
    sports: T("Sports and games", "🏅", "Kids around the world play lots of different sports.", "Swimming, gymnastics, running, biking, soccer and basketball are sports. Some are team sports, some you do alone.", "Look at the picture and think about the sport you have seen.", "Someone in a pool doing laps is swimming.", [
      ["🏊|Which sport is this?", "Swimming", ["Tennis", "Golf"]], ["🚴|Which sport is this?", "Biking", ["Swimming", "Baseball"]], ["🤸|Which sport is this?", "Gymnastics", ["Soccer", "Fishing"]],
      ["⛸️|Which sport is this?", "Ice skating", ["Swimming", "Biking"]], ["🏐|Which sport is this?", "Volleyball", ["Gymnastics", "Bowling"]], ["🏓|Which sport is this?", "Table tennis", ["Swimming", "Biking"]],
      ["⛳|Which sport is this?", "Golf", ["Soccer", "Gymnastics"]], ["🥋|Which sport is this?", "Karate", ["Swimming", "Golf"]]]),
    whereSport: T("Where do we play?", "🏟️", "Each sport has its own place to play.", "Soccer: <b>field</b>. Basketball: <b>court</b>. Swimming: <b>pool</b>. Ice skating: <b>rink</b>. Running races: <b>track</b>.", "Think about the surface: grass, floor, water or ice.", "You swim in a pool.", [
      ["⚽|Where do you play soccer?", "On a field", ["In a pool", "On an ice rink"]], ["🏀|Where do you play basketball?", "On a court", ["In a pool", "On a track"]],
      ["🏊|Where do you swim for a race?", "In a pool", ["On a court", "On a field"]], ["⛸️|Where do you ice skate?", "On a rink", ["On a track", "In a pool"]],
      ["🏃|Where do you run races?", "On a track", ["In a pool", "On an ice rink"]], ["🤸|Where do you do gymnastics?", "In a gym", ["In a pool", "On a bus"]],
      ["⚾|Where do you play baseball?", "On a baseball field", ["In a pool", "On a rink"]]]),
    warmUp: T("Warm-up steps", "🔥", "A good warm-up gets your heart, muscles and brain ready.", "Start with <b>easy moves</b>: march, swing arms, do shoulder rolls. Go from easy to a little harder. Warm up <b>before</b> you play.", "Think: easy first, then a bit harder.", "You march in place first, and then you do gentle jumping jacks.", [
      ["When do we warm up?", "Before we play", ["After we play", "Never"]], ["How should a warm-up start?", "With easy moves", ["With the hardest move", "With a fast race"]],
      ["Which is a good warm-up move?", "Marching in place", ["A long sprint", "Sitting"]], ["A warm-up wakes up our…", "Muscles", ["Toys", "Shoes"]], ["How long is a warm-up?", "A few minutes", ["All day", "One second"]],
      ["Which move is a warm-up?", "Arm circles", ["Eating lunch", "Napping"]], ["Warming up helps us…", "Get ready to play", ["Skip PE", "Get tired first"]]]),
    coolDown: T("Cooling down", "❄️", "After hard play, we slow down to help our body relax.", "A <b>cool-down</b> is slow walking, deep breaths and gentle stretches. It helps your heart slow down.", "Think: slow moves after you play.", "After a race, you walk slowly and take deep breaths.", [
      ["When do we cool down?", "After we play", ["Before we play", "Never"]], ["Which is a cool-down?", "Slow walking", ["A sprint", "Jumping jacks"]],
      ["What breathing helps us cool down?", "Slow, deep breaths", ["Fast, short breaths", "Holding our breath"]], ["Cool-down helps your heart…", "Slow down", ["Race faster", "Stop"]],
      ["Which stretch is good for a cool-down?", "Slow stretches", ["Fast jumping", "Hard bouncing"]], ["After a cool-down, you can…", "Drink water", ["Run another race", "Skip drinking"]],
      ["Who needs a cool-down?", "Everyone after exercise", ["Nobody", "Only dogs"]]]),
    laps: laps,
    reps: reps,
    sets: sets2,
    heartRate: T("Heart rate in kid words", "💓", "Your <b>heart rate</b> is how fast your heart beats. You can feel it in your chest or your wrist.", "Resting: slow beats. <b>Running</b>: fast beats. After a rest, it slows back down. A strong heart pumps blood well.", "Ask: is the body resting or working hard?", "After sprinting, your heart beats fast. After a rest, it slows down.", [
      ["💓|What is your heart rate?", "How fast your heart beats", ["How tall you are", "How loud you are"]], ["🏃|When you run, your heart beats…", "Faster", ["Slower", "Not at all"]],
      ["😴|When you sleep, your heart beats…", "Slowly", ["Super fast", "Not at all"]], ["Where can you feel your heartbeat?", "On your chest or wrist", ["On your hair", "On your ear"]],
      ["After a hard game, what happens to your heart in a few minutes?", "It slows down", ["It beats faster and faster", "It stops"]], ["Why does your heart beat faster when you run?", "Your body needs more blood and air", ["It gets bored", "It wants to play"]],
      ["Exercise helps your heart become…", "Stronger", ["Weaker", "Shaky"]]]),
    tag: T("Playing tag", "🏃", "Tag is a game where one player chases others. It is great exercise!", "The <b>chaser</b> tries to tag a runner. When tagged, you become the chaser. <b>Tag gently</b> with a light touch. Stay in the <b>boundaries</b>.", "Remember: gentle touch, stay safe, stay inside the boundary.", "If you are tagged, you take a turn being the chaser.", [
      ["In tag, what does the chaser do?", "Tries to tag a runner", ["Sits down", "Hides forever"]], ["How do you tag someone?", "With a gentle touch", ["With a hard push", "With a throw"]],
      ["You are tagged. What now?", "You become the chaser", ["You leave the game forever", "You cry"]], ["Where do we play tag?", "Inside the boundaries", ["In the street", "On the stairs"]],
      ["In freeze tag, what happens when you are tagged?", "You freeze until freed", ["You win", "You eat"]], ["Is it okay to push in tag?", "No, tag gently", ["Yes", "Only when winning"]],
      ["Tag is a good way to…", "Run and have fun", ["Sit still", "Sleep"]]]),
    relay: T("Relay races", "🏁", "In a relay, a team takes turns running. Each runner does a part of the race.", "One runner goes, then <b>passes</b> or tags the next teammate. Wait for your turn behind the line. The team wins by working together.", "Think: one at a time, then pass.", "A runner finishes their lap and tags the next runner on the team.", [
      ["In a relay, how do runners go?", "One at a time", ["All at once on one lane", "Only one team member runs"]], ["What does a runner do at the end of their turn?", "Tags or passes to the next teammate", ["Sits and rests forever", "Leaves the team"]],
      ["Where do you wait for your turn?", "Behind the line", ["In the way", "On the course"]], ["A relay is a…", "Team race", ["Nap", "Lunch"]],
      ["A teammate drops the baton. What do you do?", "Wait, then keep going; be kind", ["Yell at them", "Quit"]], ["What helps a team win?", "Working together", ["Pushing", "Skipping turns"]],
      ["What can be passed in a relay?", "A baton", ["A pizza", "A pillow"]]]),
    teamRules: T("Team rules", "👥", "A team works together. A few rules keep the team happy.", "Listen to the <b>coach</b>. <b>Cheer</b> for teammates. Share the ball. <b>Include</b> everyone and play fair.", "Think: is it kind, fair and team-friendly?", "A good teammate passes the ball so others can play.", [
      ["A good teammate…", "Shares and cheers", ["Hogs the ball", "Teases"]], ["The coach is talking. You should…", "Listen", ["Talk loudly", "Run off"]], ["A teammate scores. What do you do?", "Cheer", ["Frown", "Walk away"]],
      ["You have the ball and a friend is open. What can you do?", "Pass it", ["Keep it forever", "Throw it away"]], ["Your team loses. What do you do?", "Say good game", ["Blame a teammate", "Quit"]],
      ["What is fair on a team?", "Everyone gets to play", ["Only the best play", "Nobody plays"]], ["When you disagree, you…", "Talk kindly", ["Yell", "Push"]]]),
    safety2: T("Staying safe in PE", "🦺", "A few simple rules keep everyone safe in PE.", "<b>Tie your shoes</b>. Stay in your own space. Listen for the whistle. <b>Stop</b> and tell the teacher if you get hurt. Use equipment the right way.", "Think: what could cause an ouch? What keeps you safe?", "Before running, you check that your shoes are tied.", [
      ["Before running, you should…", "Tie your shoes", ["Close your eyes", "Take your shoes off"]], ["You hear the whistle. What do you do?", "Stop and listen", ["Run faster", "Keep playing"]],
      ["You get hurt. What do you do?", "Tell the teacher", ["Hide it", "Keep it a secret"]], ["You have a ball. How do you use it?", "The right way, in the right place", ["Throw it at people", "Kick it at windows"]],
      ["How do we stay safe in a crowd?", "Keep in our own space", ["Bump into others", "Push"]], ["Is it safe to run with a jump rope around your neck?", "No", ["Yes", "Yes, if fast"]],
      ["When you feel dizzy, you…", "Stop and sit down; tell the teacher", ["Spin more", "Run"]]]),
    whyEx2: T("Why exercise helps", "🌟", "Exercise is good for your whole body, and for your mood too.", "Exercise makes your <b>heart</b>, <b>lungs</b>, <b>bones</b> and <b>muscles</b> strong. It helps you <b>sleep</b>, learn and feel happy.", "Think: how does moving make my body or mind better?", "Running makes your heart and legs stronger.", [
      ["Exercise makes our hearts…", "Stronger", ["Smaller", "Quieter"]], ["Exercise helps us…", "Sleep better", ["Stay up all night", "Forget our names"]],
      ["After exercise, many kids feel…", "Happier", ["Sad forever", "Sick"]], ["Jumping helps make our… strong.", "Bones", ["Shoes", "Toys"]],
      ["Exercise helps our brain…", "Focus", ["Sleep through class", "Shrink"]], ["Which is a way to exercise?", "Dancing", ["Sitting on a couch", "Sleeping in"]],
      ["How often should kids move?", "Every day", ["Once a year", "Never"]]]),
    balanceFlex: T("Balance and flexibility", "🤸", "Balance helps us stay steady. Flexibility helps us bend and stretch.", "<b>Balance</b>: standing on one foot. <b>Flexibility</b>: touching your toes. Both get better with practice.", "Think: steady (balance) or bendy (flexibility)?", "Touching your toes shows flexibility.", [
      ["Which shows balance?", "Standing on one foot", ["Touching your toes", "Running"]], ["Which shows flexibility?", "Touching your toes", ["Standing on one foot", "Throwing a ball"]],
      ["Flexibility means your body can…", "Bend and stretch", ["Fly", "Run fast"]], ["How do you get better at balance?", "Practice", ["Skip PE", "Sleep more"]], ["A yoga tree pose helps with…", "Balance", ["Fast running", "Throwing"]],
      ["Which helps balance?", "A strong tummy and looking at a spot", ["Looking all around", "Wiggling"]], ["Slow stretches help…", "Flexibility", ["Speed", "Counting"]]]),
    sportGear: T("Gear by sport", "🎒", "Each sport has its own special gear.", "Swimming: <b>goggles</b> and a swim cap. Baseball: <b>bat</b> and glove. Hockey: <b>stick</b>. Tennis: <b>racket</b>. Gymnastics: a <b>mat</b>.", "Think about what the player holds or wears in that sport.", "A tennis player holds a racket.", [
      ["🏊|What do swimmers wear on their eyes?", "Goggles", ["Sunglasses", "Helmets"]], ["🤸|What do gymnasts land on?", "A mat", ["A bat", "A net"]], ["🎾|What does a tennis player hold?", "A racket", ["A stick", "A bat"]],
      ["⚾|What does a baseball player hit with?", "A bat", ["A racket", "A stick"]], ["⛸️|What goes on your feet to ice skate?", "Skates", ["Goggles", "Fins"]], ["🥅|What do you need to score in soccer?", "A goal", ["A hoop", "A basket"]],
      ["🏀|What do you aim at in basketball?", "A hoop", ["A goal", "A pocket"]]])
  });
  Object.assign(P, {
    // ===== LEVEL 3 =====
    muscles: T("Muscles", "💪", "<b>Muscles</b> are the parts of your body that make you move. They pull on your bones.", "Your <b>biceps</b> are in your upper arm. Your <b>calves</b> are in the back of your lower leg. Even your <b>heart</b> is a muscle. Muscles get stronger when you use them.", "Think: which muscles do you use for the move?", "When you bend your arm, your biceps squeeze and pull.", [
      ["What do muscles do?", "Make our body move", ["Help us see", "Make us hungry"]], ["Where are your biceps?", "In your upper arm", ["In your foot", "In your ear"]],
      ["Which of these is a muscle?", "Your heart", ["Your fingernail", "Your hair"]], ["How do muscles get stronger?", "By being used", ["By not moving", "By sleeping all day"]],
      ["Muscles pull on…", "Bones", ["Hair", "Clothes"]], ["Which muscles help you jump?", "Leg muscles", ["Ear muscles", "Eyebrow muscles"]],
      ["Which helps muscles grow strong?", "Exercise, food and rest", ["Only candy", "Only TV"]], ["When you squeeze your muscle, it feels…", "Firm", ["Melted", "Frozen"]]]),
    bonesMuscles: T("Bones and muscles", "🦴", "Bones and muscles work together like a team.", "<b>Bones</b> hold our body up and protect parts inside. <b>Muscles</b> pull on bones to move. <b>Joints</b> (like knees and elbows) let us bend.", "Think: bones are the frame, muscles are the movers, joints bend.", "Your knee is a joint that lets your leg bend.", [
      ["What do bones do?", "Hold our body up", ["Pump blood", "Make us think"]], ["What are joints?", "Places where bones meet and bend", ["Places that are hard", "Types of food"]],
      ["Which is a joint?", "Your knee", ["Your nose", "Your hair"]], ["Which part of you protects your brain?", "Your skull", ["Your toes", "Your elbows"]], ["What helps bones grow strong?", "Milk and jumping", ["Soda", "Lying down"]],
      ["Muscles and bones work…", "Together", ["Alone", "Never"]], ["Which bone helps protect your heart and lungs?", "Ribs", ["Toes", "Fingers"]]]),
    heartLungs: T("Heart and lungs", "🫁", "When you exercise, your heart and lungs work together to give your body air and energy.", "The <b>lungs</b> take in air. The <b>heart</b> pumps blood that carries air around the body. When you run, you breathe <b>faster</b>.", "Think about what you breathe and where the blood goes.", "After running, you breathe fast to take in more air.", [
      ["What do your lungs do?", "Take in air", ["Pump blood", "Chew food"]], ["What does your heart do?", "Pumps blood", ["Takes in air", "Digests food"]], ["When you run, you breathe…", "Faster", ["Slower", "Not at all"]],
      ["Why do you breathe faster when you run?", "Your body needs more air", ["Your shoes are tight", "You are bored"]], ["Which pair works together?", "Heart and lungs", ["Hair and nails", "Eyes and toes"]],
      ["After you rest, your breathing…", "Slows down", ["Gets faster", "Stops"]], ["Blood carries… around the body.", "Air and energy", ["Toys", "Homework"]]]),
    hrFast: T("Fast or slow heartbeat?", "💗", "Your heartbeat changes with what you do.", "<b>Resting or sleeping</b>: slow. <b>Walking</b>: a bit faster. <b>Running or jumping</b>: fast. After you stop, it slows down.", "Rank the activities from calm to very active.", "Sleeping is slower than walking, and walking is slower than running.", [
      ["Which gives you the fastest heartbeat?", "Running hard", ["Sleeping", "Sitting"]], ["Which gives you the slowest heartbeat?", "Sleeping", ["Running", "Jumping jacks"]],
      ["Walking makes your heart beat…", "A little faster than resting", ["Slower than sleeping", "Not at all"]], ["After a sprint, your heart…", "Beats fast, then slows down", ["Stops", "Beats slower right away"]],
      ["Which activity raises your heart rate more?", "Jumping rope", ["Sitting at a desk", "Lying on the floor"]], ["Slow, deep breaths make your heart…", "Calm down", ["Race", "Stop"]],
      ["To raise your heart rate, you can…", "Dance and jump", ["Sit still", "Lie down"]]]),
    lapSteps: lapSteps3,
    setsReps: setsReps3,
    minutes: minutes3,
    sportRules: T("Sport rules", "📋", "Every sport has rules that make the game fair and safe.", "<b>Soccer</b>: kick the ball into the goal, only the goalie can use hands. <b>Basketball</b>: shoot into the hoop and dribble when you move. <b>Volleyball</b>: hit the ball over the net. <b>Baseball</b>: hit the ball and run the bases.", "Think about the main goal of the sport.", "In soccer you move the ball with your feet, not your hands.", [
      ["⚽|In soccer, who can use hands during play?", "The goalie", ["Everyone", "No one at all"]], ["⚽|What is the goal in soccer?", "Kick the ball into the net", ["Throw it over a fence", "Hit it with a bat"]],
      ["🏀|In basketball, what do you shoot at?", "A hoop", ["A net on the ground", "A wall"]], ["🏀|When you move with the ball in basketball, you…", "Dribble", ["Kick", "Carry it only"]],
      ["🏐|In volleyball, you hit the ball…", "Over the net", ["Under the floor", "Into a goal"]], ["⚾|In baseball, after you hit the ball you…", "Run to the bases", ["Sit down", "Kick it"]],
      ["Who makes sure the rules are followed?", "A referee or umpire", ["The loudest player", "A mascot"]], ["Why do sports have rules?", "To keep the game fair and safe", ["To be boring", "To end fun"]]]),
    gameRules: T("Playground game rules", "🎲", "Simple games have simple rules that help everyone have fun.", "<b>Simon Says</b>: do the move only if \"Simon says\". <b>Red Light, Green Light</b>: go on green, stop on red. <b>Freeze dance</b>: dance until the music stops, then freeze.", "Listen carefully for the clue words.", "In Red Light, Green Light, you stop when the leader says red light.", [
      ["🟥|In Red Light, Green Light, what do you do on red?", "Stop", ["Go faster", "Spin"]], ["🟩|On green light you…", "Go", ["Freeze", "Sit"]],
      ["In Simon Says, when do you do the move?", "Only if Simon says", ["Always", "Never"]], ["🎵|In freeze dance, what do you do when the music stops?", "Freeze", ["Keep dancing", "Run"]],
      ["In tag, the chaser…", "Tries to tag others", ["Hides from everyone", "Sits down"]], ["🏃|In a relay, a runner passes to…", "The next teammate", ["The referee", "The crowd"]],
      ["A game is more fun when everyone…", "Follows the rules", ["Makes up their own", "Quits"]]]),
    teamwork: T("Teamwork", "🧩", "Teams win when everyone works together.", "Good teams <b>communicate</b>, share, encourage and help. Each player has a job. You don't need to be the best to help the team.", "Think: how can I help my team?", "A teammate passes the ball so another can score. That is teamwork.", [
      ["What is teamwork?", "Working together", ["Doing it all yourself", "Not helping"]], ["How can you help your team?", "Cheer and pass", ["Hog the ball", "Argue"]],
      ["A teammate is struggling. What do you do?", "Encourage them", ["Laugh", "Yell"]], ["A good team talks to each other. This is called…", "Communication", ["Hiding", "Whispering secrets only"]],
      ["Each player on a team has…", "A job to do", ["Nothing to do", "All the jobs"]], ["When the team wins, you…", "Celebrate together", ["Boast alone", "Ignore others"]],
      ["Teamwork makes the game…", "More fun and fair", ["Worse", "Shorter"]]]),
    sportsmanship: T("Sportsmanship", "🏆", "Sportsmanship means being kind, honest and respectful in sports.", "Respect <b>teammates</b>, <b>opponents</b>, <b>coaches</b> and <b>referees</b>. Win with kindness and lose with grace.", "Ask: am I being respectful and honest?", "You shake hands and say \"good game\" even if you lost.", [
      ["Good sportsmanship means…", "Being kind and fair", ["Winning at any cost", "Being rude"]], ["The other team wins. What do you do?", "Congratulate them", ["Shout at them", "Stomp off"]],
      ["Who do we respect in a game?", "Everyone", ["Only the winners", "Only our team"]], ["A referee makes a call you don't like. You…", "Accept it politely", ["Argue loudly", "Throw the ball"]],
      ["After the game, we…", "Shake hands or high-five", ["Tease the other team", "Leave without saying a word"]], ["When you lose, you can…", "Learn and try again", ["Quit forever", "Blame others"]],
      ["Respect for the coach means…", "Listening", ["Ignoring", "Interrupting"]]]),
    fairRules: T("Fair play", "🧑‍⚖️", "Fair play means following the same rules as everyone else and being honest.", "<b>Fair</b>: same rules for all. No cheating. Admit mistakes. Let others have a turn. Referees help keep the game fair.", "Think: would this be okay if it was done to me?", "If you touch the ball with your hand in soccer, you tell the referee honestly.", [
      ["What is fair?", "The same rules for everyone", ["Rules only for others", "No rules"]], ["You make a mistake in a game. What do you do?", "Admit it", ["Hide it", "Blame others"]],
      ["Is cheating okay if you win?", "No", ["Yes", "Yes, if nobody knows"]], ["Who helps the game stay fair?", "The referee", ["The loudest fan", "The mascot"]],
      ["A friend breaks a rule. What can you say?", "Remember the rule?", ["I'm telling everyone", "Do it again"]], ["Playing fair earns…", "Respect", ["Anger", "Nothing"]],
      ["Taking turns is…", "Fair", ["Mean", "Silly"]]]),
    fuel: T("Water and food for energy", "🍌", "Your body needs fuel to move. Water and healthy food give you energy.", "Drink <b>water</b> often. Healthy foods like fruit, whole grains and protein give you energy. Eat a small snack before big play if you are hungry.", "Think: which choices give your body steady energy?", "A banana is a quick, healthy snack before play.", [
      ["What is the best drink for sports?", "Water", ["Soda", "Sugary juice"]], ["Which snack gives good energy?", "A banana", ["A bag of candy", "A cupcake"]],
      ["Why do we need food?", "It gives our body energy", ["To feel sleepy", "To be messy"]], ["After playing hard, you should…", "Drink water", ["Skip drinks", "Drink only soda"]],
      ["Which helps muscles grow strong?", "Protein like eggs and beans", ["Only chips", "Only candy"]], ["You feel dizzy and tired. What should you do?", "Rest, drink water and tell a teacher", ["Keep running", "Hide"]],
      ["Breakfast helps you…", "Have energy for the day", ["Fall asleep", "Get slower"]]]),
    equipSafety: T("Using equipment safely", "🔧", "Equipment is for playing, and we use it the right way so no one gets hurt.", "<b>Check</b> equipment before you use it. Use it only for its job. <b>Tell</b> the teacher if it is broken. Put it away after.", "Ask: am I using this the way it was meant to be used?", "A jump rope is for jumping, not for swinging at people.", [
      ["Before using equipment, you should…", "Check it", ["Throw it", "Break it"]], ["You see a broken ball or mat. What do you do?", "Tell the teacher", ["Use it anyway", "Hide it"]],
      ["A jump rope is for…", "Jumping", ["Tying friends", "Whipping"]], ["After class, you…", "Put equipment away", ["Leave it on the floor", "Throw it"]],
      ["A bat is for…", "Hitting a ball", ["Hitting people", "Digging"]], ["You use a scooter. What do you wear?", "A helmet", ["Nothing", "A hat"]],
      ["Where do you keep the ball when the teacher is talking?", "Hold it still or put it down", ["Throw it at friends", "Kick it away"]]]),
    fitTypes: T("Kinds of fitness", "🏋️", "Being fit has different parts. We can train each one.", "<b>Strength</b>: strong muscles. <b>Endurance</b>: moving for a long time. <b>Flexibility</b>: bending and stretching. <b>Balance</b>: staying steady.", "Match the activity to the kind of fitness it builds.", "Running a long way builds endurance.", [
      ["🏃|Running for a long time builds…", "Endurance", ["Flexibility", "Strength"]], ["🧘|Reaching to touch your toes builds…", "Flexibility", ["Endurance", "Speed"]],
      ["🧍|Standing on one foot builds…", "Balance", ["Strength", "Endurance"]], ["💪|Doing push-ups builds…", "Strength", ["Balance", "Flexibility"]],
      ["Endurance means…", "Moving for a long time", ["Moving once", "Sitting still"]], ["Flexibility means…", "Bending and stretching", ["Running fast", "Lifting heavy"]],
      ["Strength means…", "Having strong muscles", ["Being very short", "Standing still"]], ["Which activity builds many kinds of fitness?", "Playing many sports", ["Sitting all day", "Napping"]]]),
    healthyHabits: T("Healthy habits", "🌈", "Moving is one healthy habit. Others work with it to keep us well.", "Be active, <b>eat well</b>, <b>drink water</b>, <b>sleep</b> enough and <b>wash your hands</b>. Do a little each day.", "Think of a habit that keeps your body healthy.", "Going to bed on time helps you have energy for PE.", [
      ["Which is a healthy habit?", "Playing outside", ["Staying up all night", "Skipping meals"]], ["How much should kids move each day?", "About 60 minutes", ["0 minutes", "1 minute"]],
      ["Which helps you have energy?", "Sleeping enough", ["Skipping sleep", "Soda all day"]], ["Which is a healthy drink?", "Water", ["Sugary soda", "Syrup"]],
      ["Which keeps germs away after PE?", "Washing hands", ["Wiping on your shirt", "Touching your face"]], ["Screen time should be…", "Balanced with moving", ["All day", "Never allowed"]],
      ["A healthy habit is something you…", "Do often", ["Do once a year", "Never do"]]]),
    moves3: T("More ways to move", "🐸", "There are even more ways to travel and move your body.", "<b>Leap</b>: a big jump from one foot to the other. <b>Crawl</b>: move on hands and knees. <b>Roll</b>: lie on your side and turn. <b>Tiptoe</b>: walk on your toes.", "Think: how do the feet or hands move?", "A frog leaps across a pond.", [
      ["🐸|Which move is a big jump from one foot to the other?", "Leap", ["Crawl", "Tiptoe"]], ["👶|Which move is on hands and knees?", "Crawl", ["Leap", "Gallop"]],
      ["🤫|Which move is walking on your toes?", "Tiptoe", ["Roll", "Leap"]], ["🛢️|Which move is turning your body over on the ground?", "Roll", ["Hop", "Skip"]],
      ["Which move is quiet and sneaky?", "Tiptoe", ["Gallop", "Stomp"]], ["Which move do you use to clear a puddle?", "Leap", ["Roll", "Crawl"]],
      ["Which move helps in a low tunnel?", "Crawl", ["Leap", "Gallop"]], ["Which move is a log roll?", "Roll", ["Skip", "Hop"]]]),
    outdoor: T("Playing outside safely", "🌳", "Playing outside is great. A few rules keep us safe in the sun and in the park.", "Wear <b>sunscreen</b> and a hat. Drink <b>water</b>. Stay where a grown-up can see you. Watch for cars and be careful near water.", "Ask: is a grown-up nearby, and am I protected from the sun?", "At the park, you stay where your grown-up can see you.", [
      ["Where should you stay at the park?", "Where a grown-up can see you", ["Far away alone", "Near the road"]], ["It's sunny. What do you wear?", "Sunscreen and a hat", ["A heavy winter coat", "Nothing"]],
      ["You are hot. What do you do?", "Drink water and rest in the shade", ["Run harder", "Skip water"]], ["A ball rolls into the street. What do you do?", "Ask a grown-up for help", ["Run after it", "Kick it harder"]],
      ["When can you swim?", "With a grown-up watching", ["Alone", "At night alone"]], ["Thunder rumbles. What do you do?", "Go inside", ["Keep playing", "Climb a tree"]],
      ["When someone you don't know offers a ride, you…", "Say no and tell a grown-up", ["Go with them", "Take candy"]]])
  });

  const L = (title, make) => ({ title, make });
  return {
    1: [
      L("Body parts that move", P.bodyMove), L("Walk, run and hop", P.walkRun), L("Jump and skip", P.jumpSkip), L("Gallop and slide", P.gallop),
      L("Sports balls", P.balls), L("Sports equipment", P.equipment), L("Fast and slow", P.fastSlow), L("Balance", P.balance),
      L("Stretching", P.stretch), L("Warm-up or cool-down?", P.warmCool), L("Taking turns", P.turns), L("Playing fair", P.fairPlay),
      L("Including everyone", P.include), L("Being a good sport", P.goodSport), L("Water in PE", P.hydrate), L("Safety gear", P.gear),
      L("Count the jumps", P.countJumps), L("Your heart", P.heartBeat),
      L("Mixed practice", MIX(P.bodyMove, P.walkRun, P.balls, P.turns)), L("Level 1 Challenge", MIX(P.jumpSkip, P.equipment, P.warmCool, P.goodSport, P.gear, P.countJumps))
    ],
    2: [
      L("Travel or stay in place?", P.loco), L("Throwing and catching", P.throwCatch), L("Kicking and dribbling", P.kickDribble), L("Sports and games", P.sports),
      L("Where do we play?", P.whereSport), L("Warm-up steps", P.warmUp), L("Cooling down", P.coolDown), L("Counting laps", P.laps),
      L("Counting reps", P.reps), L("Groups of reps", P.sets), L("Heart rate in kid words", P.heartRate), L("Playing tag", P.tag),
      L("Relay races", P.relay), L("Team rules", P.teamRules), L("Staying safe in PE", P.safety2), L("Why exercise helps", P.whyEx2),
      L("Balance and flexibility", P.balanceFlex), L("Gear by sport", P.sportGear),
      L("Mixed practice", MIX(P.loco, P.warmUp, P.sports, P.laps)), L("Level 2 Challenge", MIX(P.throwCatch, P.heartRate, P.relay, P.reps, P.sets, P.safety2))
    ],
    3: [
      L("Muscles", P.muscles), L("Bones and muscles", P.bonesMuscles), L("Heart and lungs", P.heartLungs), L("Fast or slow heartbeat?", P.hrFast),
      L("Laps and steps", P.lapSteps), L("Sets and reps", P.setsReps), L("Time to move", P.minutes), L("Sport rules", P.sportRules),
      L("Playground game rules", P.gameRules), L("Teamwork", P.teamwork), L("Sportsmanship", P.sportsmanship), L("Fair play", P.fairRules),
      L("Water and food for energy", P.fuel), L("Using equipment safely", P.equipSafety), L("Kinds of fitness", P.fitTypes), L("Healthy habits", P.healthyHabits),
      L("More ways to move", P.moves3), L("Playing outside safely", P.outdoor),
      L("Mixed practice", MIX(P.muscles, P.heartLungs, P.sportRules, P.setsReps)), L("Level 3 Challenge", MIX(P.bonesMuscles, P.fitTypes, P.lapSteps, P.minutes, P.sportsmanship, P.hrFast))
    ]
  };
})();
