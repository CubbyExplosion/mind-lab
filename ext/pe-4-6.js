// ext/pe-4-6.js  PE levels 4-6 (grade 1 second half, grade 2)
(() => {
  const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben", "Kai", "Eva"];
  // T: topic quiz. row string "q~answer~wrong1~wrong2" (q may start "emoji|")
  const T = (title, v, intro, facts, tip, ex, rows, nudge) => {
    const items = rows.map(r => r.split("~"));
    const f = () => {
      const it = pick(items); let q = it[0], vis;
      const bar = q.indexOf("|"); if (bar > 0) { vis = q.slice(0, bar); q = q.slice(bar + 1); }
      const o = { text: q, choices: shuf([it[1], it[2], it[3]]), answer: it[1],
        hints: [nudge || "Read the question slowly, then look at every choice.", tip, "Example: " + ex + " Now do yours."] };
      if (vis) o.visual = vis;
      return o;
    };
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Example", v: "✏️", t: ex + " " + tip }];
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

  // ================= LEVEL 4 =================
  const a1 = T("Ways to travel", "🏃", "<b>Locomotor</b> moves take your whole body from one place to another.", "Walk, run, hop, jump, skip, gallop, slide and leap are all locomotor moves. A <b>hop</b> is one foot to the same foot. A <b>jump</b> is two feet to two feet.", "Ask: do I travel? Which feet do I use?", "Hop means landing on the same foot you took off from.", [
    "A hop lands on…~the same foot~both feet~the other foot every time", "A jump takes off with…~two feet~one foot only~no feet", "Which move uses a long step in the air?~Leap~Hop~Slide",
    "Which move goes sideways with feet together?~Slide~Skip~Leap", "A skip is a step and a…~hop~jump~slide", "Which is a locomotor move?~Gallop~Standing still~Balancing on one foot",
    "A gallop has one foot that stays…~in front~behind the other~high in the air", "Which move is the fastest travel?~Run~Walk~Tiptoe"]);
  const a2 = T("Moves in place", "🧍", "<b>Non-locomotor</b> moves happen in one spot. You do not travel anywhere.", "Bend, stretch, twist, swing, push, pull and balance are all non-locomotor moves.", "If your feet stay in the same spot, it is a non-locomotor move.", "Twisting your body while your feet stay put is non-locomotor.", [
    "Which move stays in one place?~Twist~Gallop~Run", "Which is NOT a move in place?~Skip~Bend~Stretch", "Reaching up high is a…~stretch~skip~leap",
    "Standing on one foot is called…~balancing~galloping~sliding", "Bending your knees is a…~bend~hop~slide", "Swinging your arms is a move…~in place~that travels far~with no body at all", "Which pair are both in-place moves?~Twist and bend~Run and hop~Skip and slide"]);
  const a3 = T("Throwing", "🤾", "We throw with our arms and our whole body. Good throws help games.", "For an <b>underhand</b> throw, swing your arm low like bowling. For an <b>overhand</b> throw, bring your arm up past your ear. Step toward your target.", "Look at the target and step with the foot opposite your throwing arm.", "A bowling-style swing from low to high is underhand.", [
    "A low swing like bowling is…~underhand~overhand~sideways spin", "Your arm goes up past your ear in…~an overhand throw~an underhand roll~a slide", "Where do your eyes look when you throw?~At the target~At your feet~At the sky",
    "Which way should your front foot step?~Toward the target~Away from it~Backward", "To throw hard and far you use…~your whole body~only your fingers~only your eyes", "Rolling a ball along the floor is best with…~an underhand motion~an overhand motion~a jump", "Before you throw, you must check that…~nobody is in the way~the ball is wet~the ball is flat"]);
  const a4 = T("Catching", "🧤", "Catching means stopping a ball with your hands. Watch the ball all the way in.", "Keep your eyes on the ball. Reach out with <b>soft hands</b>, and pull the ball in toward your body.", "Eyes on the ball, hands ready, and give a little as it lands.", "Pulling the ball to your chest keeps it from bouncing away.", [
    "Where do your eyes look when you catch?~At the ball~At your shoes~At the crowd", "Soft hands means…~pulling the ball in gently~keeping fingers stiff~closing your eyes", "After you catch, pull the ball toward…~your body~the ground~the sky",
    "To catch a ball coming high, your hands go…~up~down~behind you", "To catch a low ball, your hands go…~down~far above your head~behind your back", "Being ready to catch means…~hands out in front~arms crossed~hands in pockets", "Which helps most?~Watching the ball~Looking away~Talking loudly"]);
  const a5 = T("Kicking and dribbling", "⚽", "We kick with our feet and dribble by tapping a ball again and again.", "To kick, plant your non-kicking foot beside the ball and swing your leg. To dribble with your hands, push the ball down with your fingertips. In soccer, dribble with small taps of your feet.", "Use control: small taps, head up, ball close.", "Small taps keep the soccer ball close to your feet.", [
    "When dribbling a basketball, you push with your…~fingertips~palm slapped flat~elbow", "In soccer, dribbling uses small…~taps~throws~hand pushes", "Before a kick, your other foot goes…~beside the ball~far behind~on top of the ball",
    "Good dribblers keep the ball…~close~far away~in the air", "A big, hard kick is for…~passing far or shooting~tiny taps~standing still", "In basketball you may dribble with your…~hands~feet only~head", "Keeping your head up while dribbling helps you…~see players around you~look at your shoes~not move"]);
  const a6 = T("Striking with tools", "🏏", "Some games use a bat or racket to hit a ball. This is called <b>striking</b>.", "Keep your eye on the ball. Stand sideways. Swing the bat level and follow through.", "Eyes on the ball, sideways stance, swing, and finish.", "A sideways stance helps your swing turn.", [
    "In striking, you hit a ball with…~a bat or racket~your teeth~your knee only", "Where do you look when you swing?~At the ball~At the bat handle~Away", "Following through means…~finishing your swing~stopping early~dropping the bat",
    "Your stance should be…~sideways~facing the pitcher with feet together~lying down", "A racket is used in…~tennis~soccer~swimming", "A bat is used in…~baseball~basketball~gymnastics", "Which is the safest place to swing a bat?~Where nobody is near~Close to friends~In the hallway"]);
  const a7 = T("Space bubbles", "🫧", "<b>Personal space</b> is the bubble around you. <b>General space</b> is the whole room.", "Move in general space without bumping anyone. Keep your bubble when you stop.", "Look for open spaces and keep your bubble free.", "When you stop, your arms should not touch anyone.", [
    "Personal space is…~the bubble around you~the whole gym~the teacher's desk", "General space is…~the whole area you can move in~your pocket~one small spot", "Moving in general space, you should…~avoid bumping others~run into friends~close your eyes",
    "A good way to check your bubble is…~stretch your arms out~hold your breath~jump on someone", "If someone is in your way, you…~go around~push through~stop and yell", "When your arms can't touch anyone, your space is…~free~too small~broken", "Where is it safe to go?~An open space~Right behind someone~Crowded corner"]);
  const a8 = T("Directions and levels", "🧭", "We can move in different directions and at different levels.", "Directions: forward, backward, sideways, up, down. Levels: <b>high</b>, <b>middle</b> and <b>low</b>.", "Think of floor, waist and head height for levels.", "Crawling on the floor is a low level.", [
    "Reaching to the ceiling is a…~high level~low level~backward move", "Crawling is a…~low level~high level~middle level", "Walking behind you is…~backward~forward~upward",
    "Moving to your side is…~sideways~forward~backward", "Tiptoeing with arms up is…~high~low~below the floor", "A crab walk is mostly…~low~high~above your head", "If you face the door and walk to it, you move…~forward~backward~sideways"]);
  const a9 = T("Pathways", "〰️", "A <b>pathway</b> is the line you make on the floor when you move.", "Straight, curved and zigzag are pathways. A zigzag goes sharp left and right.", "Picture the line your feet leave behind.", "Going around cones in an S shape is a curved pathway.", [
    "Going from A straight to B is a…~straight pathway~zigzag pathway~circle", "Sharp turns left, right, left make a…~zigzag~straight line~dot", "A wavy S shape is…~curved~straight~zigzag only",
    "Running in a round loop makes a…~circle~square~dot", "Which pathway has sharp corners?~Zigzag~Curved~Circle", "A path is…~a line you move along~a type of ball~a kind of sport", "To go quickly to a far cone, which path is shortest?~Straight~Zigzag~Circle around"]);
  const a10 = T("Exercise and your heart", "❤️", "Your heart is a muscle. Exercise makes it stronger.", "When you run, your heart beats faster. When you rest, it slows. A strong heart pumps blood to your body.", "Think: active means fast heartbeat, rest means slow.", "After a fast run, your heart beats faster than at rest.", [
    "After a fast run, your heartbeat is…~faster~slower~stopped", "When you rest, your heart beats…~slower~faster than running~not at all", "Your heart is a…~muscle~bone~toy",
    "Exercise makes your heart…~stronger~weaker~smaller forever", "Blood carries oxygen to…~your body~only your hair~the floor", "Which makes your heart beat fastest?~Sprinting~Sleeping~Sitting", "Where can you feel your pulse?~Wrist or neck~Knee~Elbow bone"]);
  const a11 = T("Strong bones and muscles", "🦴", "Bones hold your body up and muscles move your bones.", "Jumping, running and climbing help bones and muscles grow strong. Milk and other healthy foods help too.", "Moving and healthy food build strength.", "Playing outside helps muscles get stronger.", [
    "What moves your bones?~Muscles~Hair~Skin only", "What holds your body up?~Bones~Water~Air", "Which helps your bones grow strong?~Jumping and running~Sitting all day~Skipping meals",
    "Using muscles often makes them…~stronger~weaker~vanish", "Which food helps bones?~Milk~Soda pop~Candy", "Your skull protects your…~brain~stomach~toes", "Muscles get tired and need…~rest~nothing~more homework"]);
  const a12 = T("Warm up, then cool down", "🔥", "A warm-up gets your body ready. A cool-down helps it calm.", "Warm up before play with easy moves like marching and arm circles. After play, walk slowly and stretch.", "Easy and slow at the start and at the end.", "Marching in place is a good warm-up.", [
    "Which comes first?~Warm-up~Cool-down~Cheering", "Marching in place is a…~warm-up~sprint~cool-down only", "Slow walking after a game is a…~cool-down~warm-up~race",
    "A warm-up makes your body…~ready~sleepy~hurt", "A cool-down helps your heart…~slow down~go faster~stop", "Stretching gently after play is…~good~dangerous~rude", "Which is a warm-up move?~Arm circles~Hard sprints~Napping"]);
  const a13 = T("Play it safe", "🦺", "Safe play keeps everyone happy and unhurt.", "Listen to your teacher. Wear the right shoes. Keep the area clear. Stop if you feel pain.", "Think: could someone get hurt? Then stop and fix it.", "Tie your shoes so you do not trip.", [
    "What shoes are best for PE?~Tied sneakers~Flip-flops~Bare feet on gravel", "If you feel pain, you should…~tell your teacher~keep going hard~hide it", "Before a game, check the area is…~clear~full of toys~wet",
    "When the teacher says stop, you…~stop right away~keep playing~run faster", "If a ball goes out of the gym, you…~ask before getting it~dash into traffic~throw another", "A loose shoelace can make you…~trip~jump higher~fly", "Safe throwing means…~throw where it's clear~throw at people~throw up inside"]);
  const a14 = T("Drink and eat to play", "💧", "Your body needs water and healthy food for energy.", "Water keeps you cool and helps you feel good. Fruits, veggies and protein give long-lasting energy.", "Water first when you are hot and thirsty.", "Drinking water after running helps you cool down.", [
    "What should you drink when you are hot and thirsty?~Water~A soda~Syrup", "Which snack gives healthy energy?~Apple slices~A candy bar~Frosting", "When should you drink water?~Before, during and after play~Never~Only at night",
    "Sweating means you should…~drink more water~stop drinking~wear a heavy coat", "Fruits and vegetables help give…~energy~homework~bad luck", "A good breakfast before PE is…~oatmeal with fruit~nothing~candy", "Why do athletes drink water?~To replace what they sweat out~To get taller~To make noise"]);
  const a15 = T("Sportsmanship", "🤝", "A good sport is kind to teammates and opponents.", "Say 'good game'. Cheer for good plays. Follow the rules. Be a good loser and a humble winner.", "Be kind first, whatever the score.", "After a game, shake hands or say good game.", [
    "After the game you say…~good game~you were bad~nothing mean", "If your team loses, you…~stay kind~yell~quit", "If your team wins, you…~stay humble~brag loudly~laugh at others",
    "A teammate drops the ball. You say…~Nice try!~You messed up~Why?", "Following the rules is…~fair~optional~silly", "A good sport helps someone who…~falls down~is winning~is far away", "Cheating is…~not allowed~clever~fun for all"]);
  const a16 = N("Keep score", "🏆", "Many games have a score. We add points to keep track.", "Each goal or basket adds points. The team with more points leads.", "Add the two scores, or find which is bigger.", () => {
    const n = pick(NAMES), a = ri(2, 9), b = ri(2, 9), r = Math.random();
    if (r < 0.5) return { text: `${n} scores ${a} goals in the first half and ${b} goals in the second half. How many goals in all?`, visual: "⚽", answer: a + b,
      hints: ["Do you add or take away?", "Put the two goal amounts together.", "Example: 3 goals and 4 goals. 3 + 4 = 7. Now do yours."] };
    const x = ri(8, 20), y = ri(1, x - 1); return { text: `The Blue team has ${x} points. The Red team has ${y}. How many more points does Blue have?`, visual: "🏆", answer: x - y,
      hints: ["You want the difference between the scores.", `Count up from ${y} to ${x}, or take ${y} away from ${x}.`, "Example: 10 and 6. 10 - 6 = 4 more. Now do yours."] };
  });
  const a17 = N("Sets and reps", "💪", "A <b>rep</b> is one time you do a move. A <b>set</b> is a group of reps.", "3 sets of 4 squats: add 4 three times, 4 + 4 + 4 = 12.", "Skip count by the reps, once for each set.", () => {
    const s = ri(2, 4), r = pick([2, 3, 4, 5, 10]), mv = pick(["squats", "jumping jacks", "hops", "arm circles"]);
    return { text: `A class does ${s} sets of ${r} ${mv}. How many ${mv} in all?`, answer: s * r,
      hints: ["Each set has the same number.", "Add the reps once for each set, or skip count.", "Example: 2 sets of 5. 5 + 5 = 10. Now do yours."] };
  });
  const a18 = N("Minutes of play", "⏱️", "We measure exercise time in minutes. It is good to be active every day.", "10 minutes and 5 more minutes is 10 + 5 = 15 minutes.", "Add up minutes, or take away what is left.", () => {
    const n = pick(NAMES), a = ri(5, 20), b = ri(5, 20);
    if (Math.random() < 0.5) return { text: `${n} plays ${a} minutes before lunch and ${b} minutes after lunch. How many minutes of play?`, visual: "⏱️", answer: a + b,
      hints: ["Is the total more or less than each part?", "Add the two times.", "Example: 10 minutes and 15 minutes is 25 minutes. Now do yours."] };
    const t = a + b + ri(1, 5); return { text: `Recess is ${t} minutes. ${n} has played for ${a} minutes. How many minutes are left?`, visual: "⏱️", answer: t - a,
      hints: ["You need the part that remains.", `Take ${a} away from ${t}.`, "Example: 20 minutes, 8 played. 20 - 8 = 12 left. Now do yours."] };
  });

  // ================= LEVEL 5 =================
  const b1 = T("Parts of fitness", "🏅", "Being fit has parts. Each part helps in a different way.", "<b>Strength</b> is how strong your muscles are. <b>Endurance</b> is how long you can keep going. <b>Flexibility</b> is how far you can bend and stretch. <b>Balance</b> is staying steady.", "Match the job to the word.", "Running a long time uses endurance.", [
    "Running for a long time shows…~endurance~flexibility~strength only", "Touching your toes shows…~flexibility~strength~luck", "Lifting your body in a push-up needs…~strength~balance~rhythm",
    "Standing on one foot tests…~balance~endurance~flexibility", "How long you can keep going is…~endurance~strength~speed", "A gymnast doing a split shows…~flexibility~endurance~score", "Carrying a heavy backpack uses…~strength~dance~luck"]);
  const b2 = T("Rhythm and beat", "🥁", "Many PE games and dances move to a beat.", "A <b>beat</b> is the steady pulse in music. Clap, step or hop along with it. Fast beats mean fast moves.", "Count the beats: 1, 2, 3, 4.", "Clapping once per beat keeps time.", [
    "A steady pulse in music is the…~beat~lyric~echo", "If the beat is fast, your moves are…~faster~slower~still", "Clapping in time means you clap on the…~beat~silence~wrong note",
    "Counting 1, 2, 3, 4 along with music keeps…~the beat~the score~the time out", "A slow beat suits…~slow walking~sprinting~fast jumping jacks", "Marching to music means stepping on the…~beat~rest~wall", "Dancing to rhythm needs…~listening~covering your ears~yelling"]);
  const b3 = T("Jump rope", "🪢", "Jumping rope is great exercise for your heart and legs.", "Hold handles at hip height. Turn with your wrists, not your whole arms. Jump low, just a little off the ground.", "Small jumps, turning from the wrists.", "Jumping just an inch off the floor saves energy.", [
    "Turn the rope with your…~wrists~shoulders only~feet", "Jump rope is good for your…~heart~eyebrows~pencil", "Jump…~just a little~as high as you can~with your eyes shut",
    "Hold the handles at about your…~hips~ears~knees", "Land on your…~toes with soft knees~heels only~hands", "Jumping rope fast makes your heartbeat…~faster~slower~stop", "Where is the safest place to jump rope?~On a flat clear surface~Near a road~On stairs"]);
  const b4 = T("Gymnastics basics", "🤸", "Gymnastics moves use balance, strength and control.", "A <b>log roll</b> is rolling sideways, straight like a log. A <b>forward roll</b> tucks your chin. A <b>shape</b> like a pike, tuck or straddle is held still.", "Keep your body tight and your moves slow and controlled.", "In a forward roll, tuck your chin to your chest.", [
    "In a forward roll you tuck your…~chin~elbows only~toes up high", "Rolling sideways straight like a log is a…~log roll~tuck jump~cartwheel", "Gymnastics needs…~control~luck only~speed only",
    "A tuck shape curls your body…~small~long~wide", "A straddle shape has legs…~wide apart~together~crossed", "Gymnasts land with…~bent knees~locked knees~stiff toes", "Which place is best for rolling?~A soft mat~Hard floor~A pool"]);
  const b5 = T("Passing a ball", "🏀", "Passing sends the ball to a teammate.", "A <b>chest pass</b> goes straight from your chest. A <b>bounce pass</b> hits the floor first. An <b>overhead pass</b> starts above your head. Step toward your target.", "Aim for your teammate's hands or chest.", "Push the ball out with both hands and step forward.", [
    "A pass that starts at your chest is a…~chest pass~bounce pass~kick", "A pass that hits the floor first is a…~bounce pass~chest pass~overhead lob", "You pass to a…~teammate~wall~referee",
    "Where do you aim a chest pass?~At a teammate's chest~At the floor behind them~At the ceiling", "Before you pass, you should…~look for an open teammate~close your eyes~turn around", "A pass starting above your head is…~overhead~underhand~bounce", "Good passing means the ball is…~easy to catch~too hard to catch~always high"]);
  const b6 = T("Soccer", "⚽", "Soccer is played with the feet, with two teams and two goals.", "You cannot use your hands, except the <b>goalkeeper</b> in the penalty area. A team has 11 players on a big field. Pass to teammates.", "Hands off the ball, feet on it.", "Only the goalkeeper may use hands to stop the ball.", [
    "Who may use hands in soccer?~The goalkeeper~Everyone~Nobody ever", "Soccer teams score by getting the ball in the…~goal~net hoop~basket", "In soccer you move the ball with your…~feet~racket~bat",
    "Players on the field mostly use…~feet and body~bats~rackets", "A throw-in is done with…~two hands~one foot~your head", "The goalkeeper defends the…~goal~scoreboard~sidelines", "Passing in soccer helps you…~work as a team~play alone~lose"]);
  const b7 = T("Basketball", "🏀", "Basketball is played on a court with hoops at each end.", "You score by shooting the ball through the hoop. You must dribble when you move with the ball. Shoot with a bent elbow and follow through.", "Dribble, pass, shoot, and keep your eyes up.", "You cannot run while holding the ball without dribbling.", [
    "You score by shooting the ball into the…~hoop~goal net~box", "To move with the ball you must…~dribble~carry it~kick it", "A good shot uses a bent…~elbow~knee only~ankle",
    "Basketball is played on a…~court~lake~roof", "A pass is sent to a…~teammate~hoop~referee", "Dribbling is bouncing the ball with your…~hand~foot~knee", "Following through after a shot means…~keep your arm up~drop it fast~run"]);
  const b8 = T("Baseball and softball", "⚾", "These games use a bat, a ball and four bases.", "A batter hits the ball and runs to <b>first base</b>, then second, third and home. A fielder catches with a glove.", "Bases go around in a diamond.", "A run is scored when a player touches home.", [
    "A batter hits with a…~bat~racket~glove", "Fielders catch with a…~glove~net~hat", "A run is scored when a player reaches…~home~first~the dugout",
    "How many bases do players touch before home?~3~1~6", "The first base comes…~first~last~never", "The diamond has…~four bases~two bases~ten bases", "The player who throws the ball to the batter is the…~pitcher~goalie~umpire"]);
  const b9 = T("Net games", "🏐", "In volleyball and tennis, a net splits the court.", "Volleyball sends the ball over the net with hands or arms. Tennis sends it with a racket. The ball must stay in bounds.", "Over the net and inside the lines.", "A ball landing outside the line is out of bounds.", [
    "In volleyball, the ball goes over the…~net~goal~bleachers", "A tennis player hits with a…~racket~bat~hand glove", "The ball must stay inside the…~lines~dugout~tree",
    "A serve starts a…~point~nap~dance", "Volleyball is played with…~hands and arms~feet only~racket", "A net game ends a point when the ball…~hits the floor~stays in the air~is tiny", "Teamwork in volleyball means…~passing to teammates~keeping the ball~ignoring them"]);
  const b10 = T("Target games", "🎯", "In target games you aim at a spot, like soft-ball bowling or bean bag toss.", "Eyes on the target. Smooth swing. Release at the right time. Follow through toward the goal.", "Aim first, then throw.", "Looking at the target before you throw helps your aim.", [
    "To aim well you look at the…~target~floor~crowd", "A smooth swing helps your…~accuracy~dancing~hat", "Following through means your hand points to the…~target~back wall~sky",
    "Bowling is a…~target game~net game~chasing game", "To hit a far target, you throw…~with more force~with no force~backward", "A soft toss is for…~close targets~far targets~no targets", "Before throwing, check that…~the area is clear~someone stands in front~the lights are off"]);
  const b11 = T("Resting and working heart", "💓", "Your heart rate changes with what you do.", "Your <b>resting heart rate</b> is how fast your heart beats when you sit still. Your <b>working heart rate</b> is faster, during exercise.", "Resting is slow, working is fast.", "Your heart beats slower while you read than while you sprint.", [
    "Resting heart rate is when you…~sit still~sprint~jump rope", "Working heart rate is…~faster than resting~slower than resting~zero", "After you sprint, your heart rate is…~high~low~off",
    "Which has the slowest heart rate?~Sleeping~Running~Jumping", "Your pulse can be felt on your…~wrist~elbow~hair", "A fit heart returns to resting…~quickly~never~backward", "After a rest, your heart rate goes…~down~up forever~sideways"]);
  const b12 = T("Name that muscle", "💪", "Muscles have names. Let's learn a few.", "The <b>biceps</b> is on the front of your upper arm. The <b>quadriceps</b> is the front of your thigh. The <b>calf</b> is at the back of your lower leg. Your heart is also a muscle.", "Think where it is on your body.", "Your biceps bends your elbow when you lift something.", [
    "Which muscle is on the front of your upper arm?~Biceps~Calf~Quadriceps", "Quadriceps are in your…~thigh~hand~neck", "Calf muscles are in your…~lower leg~arm~back",
    "Your heart is a…~muscle~bone~joint", "Biceps help you…~bend your arm~blink~blow bubbles", "Which muscles help you jump?~Leg muscles~Eyebrows~Nose", "Muscles are joined to bones by…~tendons~shoelaces~hair"]);
  const b13 = T("Be a good teammate", "👫", "Teamwork means everyone helps to reach a goal.", "Talk kindly, pass to others, and take turns. Say 'nice job' and help teammates learn.", "Think: how can I help my team?", "If a teammate is open, pass to them.", [
    "A good teammate…~shares the ball~hogs the ball~ignores others", "If a teammate makes a mistake, you say…~you'll get it next time~that's your fault~nothing mean", "Teamwork is…~working together~doing it alone~giving up",
    "Everyone should get a…~turn~medal first~lecture", "A teammate asks for help. You…~help~laugh~walk away", "Cheering for others is…~kind~rude~tiring", "Calling for the ball politely uses…~a clear, kind voice~screaming~whispering"]);
  const b14 = T("Rules and referees", "🧑‍⚖️", "Rules keep a game fair. A referee or umpire helps.", "Everyone follows the same rules. The referee blows a whistle to stop play. A <b>foul</b> is breaking a rule.", "Respect the referee and the rules.", "If the whistle blows, stop and listen.", [
    "Who helps keep a game fair?~Referee~Mascot~Fan only", "A foul is…~breaking a rule~a prize~a cheer", "When the whistle blows, you…~stop~run faster~ignore it",
    "Rules are for…~everyone~just you~just the other team", "If you disagree with a call, you…~stay calm and respectful~yell~quit", "Why do games have rules?~To be fair and safe~To be confusing~To end the game", "Out of bounds means…~outside the lines~in the net~on the bench"]);
  const b15 = T("Habits of healthy kids", "🌟", "Healthy habits keep your body strong for play.", "Move for at least an hour every day. Sleep enough. Eat fruits and vegetables. Drink water. Limit screen time.", "Move, sleep, eat well, drink water.", "A walk after dinner is a healthy habit.", [
    "How much active play is good each day?~About an hour~None~One minute", "Sleep helps your body…~recover~shrink~go dark", "Too much screen time takes away from…~moving~breathing~eating only",
    "Which drink is best?~Water~Soda~Energy drink", "A healthy habit is…~playing outside~skipping dinner~staying inside all day", "Fruits and vegetables help you…~grow strong~sleep less~forget", "Brushing your teeth is a habit for…~your health~your shoes~your ball"]);
  const b16 = N("Laps around the track", "🏟️", "A track lap takes about the same time every time. We multiply to find the total.", "4 laps at 2 minutes each: add 2 four times, or multiply 4 × 2.", "Add the lap time once for each lap.", () => {
    const k = ri(2, 6), len = pick([2, 3, 4, 5, 10]), n = pick(NAMES);
    return { text: `One lap of the field takes ${len} minutes of walking. ${n} walks ${k} laps. How many minutes in all?`, visual: "🏟️", answer: k * len,
      hints: ["Every lap takes the same time.", `Add ${len} once for each of the ${k} laps.`, "Example: 3 laps at 2 minutes each. 2 + 2 + 2 = 6. Now do yours."] };
  });
  const b17 = N("Counting beats", "🫀", "A pulse is one heartbeat. Counting beats is a good math skill.", "If you count 12 beats resting and 15 after a jog, that is 12 + 15 = 27 beats.", "Add the counts, or take away to find how many more.", () => {
    const n = pick(NAMES), a = ri(10, 25), b = ri(10, 25);
    if (Math.random() < 0.5) return { text: `${n} counts ${a} heartbeats resting and ${b} more after a short jog. How many beats counted?`, visual: "🫀", answer: a + b,
      hints: ["Are the beats joined or compared?", "Put the two beat counts together.", "Example: 12 and 15 beats. 12 + 15 = 27. Now do yours."] };
    const hi = a + b; return { text: `After running, ${n}'s pulse count is ${hi}. At rest it is ${a}. How many more beats after running?`, visual: "🫀", answer: hi - a,
      hints: ["You need the difference.", `Take ${a} away from ${hi}.`, "Example: 30 and 20. 30 - 20 = 10 more. Now do yours."] };
  });
  const b18 = N("Daily exercise", "📅", "Kids need to be active every day. We can add up the week.", "5 days at 20 minutes: 20 + 20 + 20 + 20 + 20 = 100 minutes.", "Skip count by the minutes each day.", () => {
    const d = ri(2, 5), m = pick([10, 20, 30, 5]), n = pick(NAMES);
    return { text: `${n} plays ${m} minutes each day for ${d} days. How many minutes in all?`, visual: "📅", answer: d * m,
      hints: ["Every day has the same time.", `Skip count by ${m}, ${d} times.`, "Example: 3 days at 10 minutes is 10, 20, 30. Now do yours."] };
  });

  // ================= LEVEL 6 =================
  const c1 = T("Why warm up?", "🌡️", "A warm-up gets blood flowing and muscles loose.", "<b>Dynamic</b> warm-ups use movement, like leg swings and jogging. They lower the chance of getting hurt.", "Easy moves first, then harder moves.", "Light jogging warms your muscles.", [
    "A warm-up helps prevent…~getting hurt~homework~hunger", "A dynamic warm-up uses…~movement~sitting still~sleep", "Which is a dynamic warm-up?~Jogging~Lying down~Reading",
    "Warm muscles are…~ready to work~tight and stiff~broken", "Warm-ups take about…~5 to 10 minutes~one second~one hour", "Leg swings are…~warm-up moves~cool-down only~a game", "You should warm up…~before hard exercise~after waking only~never"]);
  const c2 = T("Cardio endurance", "🏃", "<b>Cardio</b> exercise makes your heart and lungs work harder for a long time.", "Running, swimming, biking and dancing build cardio fitness. You breathe harder and your heart beats faster. Keep a pace you can talk at.", "Steady pace, deep breaths.", "A good test: you can talk in short sentences while exercising.", [
    "Cardio exercise works your…~heart and lungs~eyes~hair", "Which is cardio?~Running~Reading~Napping", "Cardio is also called…~endurance~strength only~flexibility only",
    "During cardio, you breathe…~harder~slower than sleeping~not at all", "A steady pace helps you…~go longer~stop sooner~trip", "Biking is…~cardio~table work~a nap", "A good cardio pace lets you…~talk a little~hold your breath~stay silent"]);
  const c3 = T("Strength moves", "🏋️", "Strength moves make your muscles work against weight, often your own body.", "A <b>squat</b> works legs. A <b>push-up</b> works arms and chest. A <b>plank</b> works your core. Move slowly with good form.", "Slow and controlled beats fast and sloppy.", "In a plank, keep your body in a straight line.", [
    "Which move works your legs?~Squat~Plank only~Eye roll", "A push-up works your…~arms and chest~toes only~hair", "A plank works your…~core~eyes~feet only",
    "Your core is your…~middle~hand~ear", "Good form means…~correct, careful moves~doing it fast~skipping steps", "In a plank, your back is…~straight~curved down~twisted", "Strength moves should be…~slow and controlled~jerky~random"]);
  const c4 = T("Stretching safely", "🧘", "Stretching keeps your body flexible.", "Stretch until you feel a gentle pull, not pain. Hold for 15 to 30 seconds. Do not bounce. Breathe slowly.", "Gentle pull, no bounce.", "Hold a hamstring stretch still for a slow count.", [
    "A good stretch feels like a…~gentle pull~sharp pain~tickle", "While stretching, do not…~bounce~breathe~hold still", "How long should you hold a stretch?~About 15 to 30 seconds~1 second~10 minutes",
    "If a stretch hurts, you…~ease off~push harder~yank", "Stretching helps you stay…~flexible~stiff~bent forever", "While stretching, breathe…~slowly~not at all~very fast", "Best time for gentle stretching is…~when muscles are warm~when you are cold and stiff~never"]);
  const c5 = T("Balance and coordination", "⚖️", "Balance keeps you steady. Coordination makes body parts work together.", "To balance, keep a low center, look at one spot and keep your core tight. Hand-eye coordination helps you catch.", "Find a spot, stay tall, breathe.", "Staring at one spot helps you stay steady.", [
    "Looking at one still spot helps your…~balance~voice~speed", "Hand-eye coordination helps you…~catch~sleep~whisper", "A wide stance makes balance…~easier~harder~impossible",
    "A balance beam walk uses…~balance~noise~juggling only", "Coordination means body parts work…~together~apart~in the dark", "To balance on one foot, tighten your…~core~eyebrows~shoes", "Practice makes your coordination…~better~worse~fade"]);
  const c6 = N("Taking your pulse", "🫀", "You can count your pulse for 10 seconds, then multiply by 6 to estimate a minute.", "If you count 12 beats in 10 seconds, 12 × 6 = 72 beats in a minute.", "Multiply the 10-second count by 6.", () => {
    const b = ri(10, 20);
    return { text: `${pick(NAMES)} counts ${b} beats in 10 seconds. About how many beats in a minute? (multiply by 6)`, visual: "🫀", answer: b * 6,
      hints: ["There are six 10-second parts in a minute.", "Multiply the count by 6, or add it six times.", "Example: 11 beats in 10 seconds. 11 × 6 = 66. Now do yours."] };
  });
  const c7 = T("Track and field", "🏃", "Track and field has races, jumps and throws.", "Races: sprint and relay. Jumps: long jump and high jump. A relay passes a <b>baton</b>.", "Name the group: run, jump or throw.", "Long jump measures how far you jump.", [
    "A relay race passes a…~baton~ball~rope", "The long jump measures how…~far~high~heavy", "The high jump measures how…~high~far~fast",
    "A sprint is a…~short fast race~very slow walk~team dance", "Which is a running event?~100 meter dash~Long jump~High jump", "Relay teams have…~several runners~one runner~no runners", "Track events happen on a…~track~lake~mountain"]);
  const c8 = T("Swimming and water safety", "🏊", "Swimming is great exercise. Water needs extra care.", "Swim only with a grown-up watching. Never swim alone. Learn to float. Wear a life jacket on boats. Walk, don't run, near a pool.", "A grown-up must always watch you swim.", "Walk by the pool so you do not slip.", [
    "You swim only when…~a grown-up is watching~you are alone~at night alone", "Near the pool you should…~walk~run~dive in shallow", "On a boat you wear a…~life jacket~helmet~cape",
    "If a friend is in trouble in water you…~shout for a grown-up~jump in~ignore it", "Floating on your back is a…~safe skill~bad idea~trick", "Never swim…~alone~with a lifeguard~in a class", "A lifeguard…~watches swimmers~sells snacks~plays music"]);
  const c9 = T("Bike safety", "🚲", "Biking is fun when you stay safe.", "Always wear a <b>helmet</b>. Ride in safe places and follow signs. Use hand signals. Be seen with bright clothes.", "Helmet on, eyes up, follow the rules.", "Buckle your helmet before every ride.", [
    "Before biking you put on a…~helmet~swim cap~scarf", "A hand signal tells others you will…~turn~eat~sleep", "Bright clothes help others…~see you~hear you~avoid you",
    "Ride on…~safe paths~busy roads alone~stairs", "At a stop sign you…~stop~speed up~close your eyes", "You should check your bike's…~brakes~radio~colors only", "Never ride without…~a helmet~a snack~music"]);
  const c10 = T("Hiking and sun safety", "🥾", "Outdoor activities need planning.", "Tell a grown-up your plan. Bring water. Wear sunscreen, a hat and good shoes. Stay on the path. Leave nature as you found it.", "Plan, pack, protect.", "Pack water before a hike.", [
    "On a hike, stay on the…~trail~cliff edge~road alone", "Sunscreen protects your…~skin~shoes~water", "Hikers should carry…~water~a TV~a pillow",
    "Good shoes for hiking are…~sturdy sneakers or boots~sandals~slippers", "Before hiking tell…~a grown-up~nobody~a stranger", "In nature you should…~not litter~pick everything~scare animals", "Hats help against…~the sun~hunger~boredom"]);
  const c11 = T("Playing tag games", "🏃", "Chasing and dodging games build speed and thinking.", "Dodge by changing direction fast. Fake one way, go the other. Look for open space. Tag gently with a light touch.", "Eyes up, change direction, tag gently.", "A quick fake can help you dodge a tagger.", [
    "To dodge, you…~change direction~stand still~run straight", "Tagging should be…~a gentle touch~a hard shove~a trip", "Open space is…~a place without players~a crowd~a wall",
    "A fake means…~pretend one way then go another~stop~hide", "A good chaser keeps eyes on the…~runner~sky~shoes", "Safe tag games keep players…~not pushing~pushing hard~tripping", "If you are tagged, you…~follow the game rules~argue~run away"]);
  const c12 = T("Out of bounds and fouls", "🚩", "Every game has lines and rules.", "<b>Out of bounds</b> is outside the lines. A <b>foul</b> is breaking a rule, like pushing. After a foul, play restarts fairly.", "Know the lines and keep hands to yourself.", "Pushing is a foul in many games.", [
    "Pushing in a game is a…~foul~goal~pass", "Outside the line means…~out of bounds~in bounds~halftime", "After a foul, play restarts…~fairly~unfairly~never",
    "If the ball goes out of bounds…~play stops~the game ends~everyone cheers", "The lines show the…~edges of the playing area~score~time", "Fair play means…~following rules~hiding rules~changing rules", "Who calls fouls?~Referee~Mascot~Fans"]);
  const c13 = T("Solving problems fairly", "🕊️", "Sometimes friends disagree in games. We can solve it kindly.", "Stay calm. Listen to each other. Use <b>rock paper scissors</b> or take turns. Ask a teacher if you cannot agree.", "Use kind words and fair ways to decide.", "Rock paper scissors can pick who goes first.", [
    "If friends disagree, you first…~stay calm~shout~walk away angry", "A fair way to choose is…~rock paper scissors~whoever is loudest~bigger kid", "Listening means…~hearing the other person~talking louder~ignoring",
    "If you can't agree, ask a…~teacher~stranger~stuffed toy", "Kind words sound like…~Let's take turns~You're wrong~Go away", "Taking turns is…~fair~unfair~a mistake", "A good solution is when…~both sides feel OK~one side wins~everyone is upset"]);
  const c14 = T("Food for athletes", "🥗", "Different foods help different jobs.", "<b>Protein</b> (eggs, beans, fish) builds muscles. <b>Carbs</b> (whole grains, fruit) give energy. Veggies give vitamins. Water keeps you hydrated.", "Eat a rainbow and add water.", "Whole-grain toast gives energy for play.", [
    "Which food builds muscles?~Eggs~Soda~Frosting", "Carbs give your body…~energy~homework~armor", "Vegetables give you…~vitamins~sugar only~nothing",
    "A good snack before play is…~banana~candy~chips every day", "What should you drink during sports?~Water~Soda~Syrup", "Beans are a source of…~protein~bone~rubber", "Eating a variety of foods is…~healthy~boring~harmful"]);
  const c15 = T("Rest and sleep", "😴", "Muscles grow and heal while you rest.", "Kids need about 9 to 12 hours of sleep. Take rest days. If you feel dizzy or hurt, stop and tell a grown-up.", "Rest is part of getting stronger.", "Sleeping helps you feel ready for PE.", [
    "Muscles recover when you…~rest and sleep~never stop~skip meals", "Kids need about…~9 to 12 hours of sleep~2 hours of sleep~20 hours of sleep", "Rest days help your body…~heal~shrink~stop",
    "If you feel dizzy, you…~stop and tell a grown-up~keep going~run faster", "Sleep helps your…~energy~hat~shoes", "Too little sleep can make you…~tired~stronger~taller overnight", "A cool-down helps you…~recover~sprint~wake"]);
  const c16 = T("Setting goals", "🎯", "A goal helps you improve. Small steps work best.", "A good goal is clear and small, like 'jump rope 20 times'. Track your progress. Celebrate trying hard.", "Make it small, clear and doable.", "Write down how many you did each day.", [
    "A good goal is…~clear and doable~impossible~secret", "Tracking progress means…~writing down your results~hiding them~guessing", "Which is a clear goal?~Jump rope 20 times~Be good~Run somewhere",
    "If you miss a goal, you…~try again~quit forever~blame others", "Small steps help you…~reach big goals~give up~skip", "Practice makes you…~better~worse~sleepy", "Celebrate your…~effort~excuses~scoreboard only"]);
  const c17 = N("Weekly minutes", "📆", "Add up the minutes you are active across the week.", "Add each day. If a week has 20 + 30 + 10 minutes, that is 60 minutes.", "Add them in two parts if the list is long.", () => {
    const a = ri(10, 30), b = ri(10, 30), c = ri(10, 30), n = pick(NAMES);
    return { text: `${n} exercises ${a} minutes on Monday, ${b} on Tuesday and ${c} on Wednesday. How many minutes in all?`, visual: "📆", answer: a + b + c,
      hints: ["Are you adding or taking away?", "Add the three days together.", "Example: 10, 20, 15 minutes. 10 + 20 = 30, then 30 + 15 = 45. Now do yours."] };
  });
  const c18 = N("Team math", "👥", "Teams need numbers. We split players into groups.", "12 players on 3 teams: 12 ÷ 3 = 4 each. Count by the team size to check.", "Divide fairly, or count equal groups.", () => {
    const teams = ri(2, 5), size = ri(2, 6), n = pick(NAMES);
    if (Math.random() < 0.5) return { text: `${teams * size} kids are split into ${teams} equal teams. How many kids on each team?`, visual: "👥", answer: size,
      hints: ["Equal teams share the kids fairly.", `Which number times ${teams} makes ${teams * size}?`, "Example: 8 kids, 2 teams. 4 + 4 = 8, so 4 each. Now do yours."] };
    return { text: `${n}'s class has ${teams} teams with ${size} kids on each. How many kids in all?`, visual: "👥", answer: teams * size,
      hints: ["All the teams are the same size.", `Add ${size} once for each of the ${teams} teams.`, "Example: 3 teams of 2. 2 + 2 + 2 = 6. Now do yours."] };
  });

  // ================= assemble =================
  Object.assign(PE_LEVELS, {
    4: [
      L("Ways to travel", a1), L("Moves in place", a2), L("Throwing", a3), L("Catching", a4), L("Kicking and dribbling", a5), L("Striking with tools", a6),
      L("Space bubbles", a7), L("Directions and levels", a8), L("Pathways", a9), L("Exercise and your heart", a10), L("Strong bones and muscles", a11),
      L("Warm up, then cool down", a12), L("Play it safe", a13), L("Drink and eat to play", a14), L("Sportsmanship", a15), L("Keep score", a16),
      L("Sets and reps", a17), L("Minutes of play", a18),
      L("Mixed practice", MIX(a1, a3, a10, a12, a16)), L("Level 4 Challenge", MIX(a2, a4, a6, a8, a11, a13, a14, a15, a17, a18))
    ],
    5: [
      L("Parts of fitness", b1), L("Rhythm and beat", b2), L("Jump rope", b3), L("Gymnastics basics", b4), L("Passing a ball", b5), L("Soccer", b6),
      L("Basketball", b7), L("Baseball and softball", b8), L("Net games", b9), L("Target games", b10), L("Resting and working heart", b11),
      L("Name that muscle", b12), L("Be a good teammate", b13), L("Rules and referees", b14), L("Habits of healthy kids", b15), L("Laps around the track", b16),
      L("Counting beats", b17), L("Daily exercise", b18),
      L("Mixed practice", MIX(b1, b5, b6, b11, b16)), L("Level 5 Challenge", MIX(b2, b3, b4, b7, b8, b9, b12, b13, b14, b15, b17, b18))
    ],
    6: [
      L("Why warm up?", c1), L("Cardio endurance", c2), L("Strength moves", c3), L("Stretching safely", c4), L("Balance and coordination", c5), L("Taking your pulse", c6),
      L("Track and field", c7), L("Swimming and water safety", c8), L("Bike safety", c9), L("Hiking and sun safety", c10), L("Playing tag games", c11),
      L("Out of bounds and fouls", c12), L("Solving problems fairly", c13), L("Food for athletes", c14), L("Rest and sleep", c15), L("Setting goals", c16),
      L("Weekly minutes", c17), L("Team math", c18),
      L("Mixed practice", MIX(c1, c2, c3, c6, c12)), L("Level 6 Challenge", MIX(c4, c5, c7, c8, c9, c11, c13, c14, c15, c16, c17, c18))
    ]
  });
})();
