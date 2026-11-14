// Mind Lab Physics. Levels 1-3, 20 lessons each.
// Needs math.js and spelling.js loaded first (uses pick, shuf).
const PHYSICS_LEVELS = (() => {
  // item = [question, rightAnswer, wrong1, wrong2?]  (use "emoji§question" to show a big picture)
  const les = (title, slides, hints, items) => {
    const make = () => {
      const it = pick(items), parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1)), answer: it[1], hints };
    };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: s[2] }));
    make.slide = slides[0];
    return { title, make };
  };
  const mix = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => {
      const out = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some ideas, then the quiz." }];
      ls.filter((_, i) => i % Math.ceil(ls.length / 4) === 0).slice(0, 4).forEach(l => out.push({ h: l.make.slide[0], v: l.make.slide[1], t: l.make.slide[2] }));
      return out;
    };
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);

  // ================= LEVEL 1 =================
  const a = [
    les("Pushing", [
      ["What is a push?", "🛒 ➡️", "A <b>push</b> moves something away from you. You push a door, a swing or a shopping cart."],
      ["Push to move", "⚽", "When you kick a ball, you push it. The ball rolls away from you."],
      ["Tip", "💡", "A push sends things <b>away</b> from you."]
    ], ["A push sends something away from you.", "Think: does the thing move away from you or toward you?", "Example: pushing a toy car sends it rolling away. Now think about yours."], [
      ["You push a toy car. Which way does it go?", "Away from you", "Toward you", "Nowhere"], ["Kicking a ball is a...", "Push", "Pull", "Sleep"],
      ["Which one is a push?", "Pushing a swing", "Pulling a wagon", "Pulling a rope"], ["Pushing a door open sends it...", "Away from you", "Toward you", "Into the floor"],
      ["Which one needs a push?", "Moving a shopping cart forward", "Pulling a sled", "Pulling a drawer"], ["A push moves a thing...", "Away", "Closer", "Up and down only"],
      ["Which one is a push?", "Pushing a box across the floor", "Pulling a toy on a string", "Pulling a tooth"]
    ]),
    les("Pulling", [
      ["What is a pull?", "🧺 ⬅️", "A <b>pull</b> brings something closer to you. You pull a wagon, a rope or a drawer."],
      ["Pull to move", "🛷", "When you pull a sled on a string, it comes along behind you."],
      ["Tip", "💡", "A pull brings things <b>toward</b> you."]
    ], ["A pull brings something closer to you.", "Think: does the thing come toward you?", "Example: pulling a drawer open brings it toward you. Now think about yours."], [
      ["You pull a wagon. Which way does it go?", "Toward you", "Away from you", "Nowhere"], ["Opening a drawer by its handle is a...", "Pull", "Push", "Jump"],
      ["Which one is a pull?", "Pulling a sled", "Pushing a swing", "Kicking a ball"], ["A tug-of-war uses...", "Pulls", "Pushes only", "Jumps"],
      ["A pull moves a thing...", "Toward you", "Away from you", "Nowhere"], ["Which one is a pull?", "Pulling on a rope", "Pushing a cart", "Pushing a door"],
      ["Which one is a pull?", "Pulling a toy by a string", "Throwing a ball", "Pushing a wheelbarrow"]
    ]),
    les("Push or pull?", [
      ["Push or pull", "↔️", "Every time something moves, there is a <b>push</b> or a <b>pull</b>."],
      ["Sort them", "🚪 🧺", "Pushing a door is a push. Pulling a wagon is a pull."],
      ["Ask", "🤔", "Ask: is it going away from me (push) or coming to me (pull)?"]
    ], ["Does it go away from you or toward you?", "Away = push. Toward you = pull.", "Example: closing a drawer is a push because it moves away from you. Now try yours."], [
      ["Pushing a swing: push or pull?", "Push", "Pull"], ["Pulling a wagon: push or pull?", "Pull", "Push"], ["Kicking a ball: push or pull?", "Push", "Pull"],
      ["Opening a drawer: push or pull?", "Pull", "Push"], ["Tug-of-war: push or pull?", "Pull", "Push"], ["Pushing a shopping cart: push or pull?", "Push", "Pull"],
      ["Pulling a sled by a rope: push or pull?", "Pull", "Push"], ["Pushing a door shut: push or pull?", "Push", "Pull"]
    ]),
    les("Fast and slow", [
      ["Fast", "🐆 🚀", "Things that move <b>fast</b> cover a lot of ground quickly. A cheetah and a rocket are fast."],
      ["Slow", "🐌 🐢", "Things that move <b>slow</b> take a long time. A snail and a turtle are slow."],
      ["Compare", "🏁", "In a race the fastest one gets there first."]
    ], ["Think about which gets there first in a race.", "Cheetahs, jets and race cars are fast. Snails, sloths and turtles are slow.", "Example: a sloth is slow, an airplane is fast. Now try yours."], [
      ["Which is fast?", "A cheetah", "A snail", "A turtle"], ["Which is slow?", "A snail", "A rocket", "A race car"], ["Which is fast?", "A jet plane", "A sloth", "A turtle"],
      ["Which is slow?", "A turtle", "A cheetah", "A train"], ["Which is fast?", "A race car", "A snail", "A sloth"], ["Which is slow?", "A sloth", "A fire truck", "A speedboat"],
      ["Who wins a race?", "The fastest one", "The slowest one", "The one that sits"]
    ]),
    les("Heavy or light?", [
      ["Heavy", "🐘 🪨", "A <b>heavy</b> thing is hard to lift. An elephant and a big rock are heavy."],
      ["Light", "🪶 🎈", "A <b>light</b> thing is easy to lift. A feather and a balloon are light."],
      ["Lift to find out", "💪", "Heavy things need a big push or pull to move. Light things move easily."]
    ], ["Imagine lifting it. Is it hard or easy?", "Elephants, rocks and cars are heavy. Feathers and balloons are light.", "Example: a bowling ball is heavy, a cotton ball is light. Now try yours."], [
      ["Which one is heavy?", "An elephant", "A feather", "A balloon"], ["Which one is light?", "A feather", "A rock", "A car"], ["Which one is heavy?", "A big rock", "A leaf", "A bubble"],
      ["Which one is light?", "A balloon", "A truck", "An elephant"], ["Which one is heavy?", "A car", "A cotton ball", "A paper cup"], ["Which one is light?", "A paper cup", "A big rock", "A bus"],
      ["Which is hard to lift?", "A heavy thing", "A light thing"]
    ]),
    les("Rolling and sliding", [
      ["Rolling", "⚽ 🛞", "Round things <b>roll</b>. Balls, wheels and marbles roll."],
      ["Sliding", "📦 🛷", "Flat things <b>slide</b>. A book slides on a table. A sled slides on snow."],
      ["Which one?", "🤔", "Round = roll. Flat = slide."]
    ], ["Is it round, or flat?", "Round things roll. Flat things slide.", "Example: a can can roll on its side. A flat box slides. Now try yours."], [
      ["Does a ball roll or slide?", "Rolls", "Slides"], ["Does a book on a table roll or slide?", "Slides", "Rolls"], ["Does a wheel roll or slide?", "Rolls", "Slides"],
      ["Does a sled on snow roll or slide?", "Slides", "Rolls"], ["Does a marble roll or slide?", "Rolls", "Slides"], ["Does a skater on ice slide or roll?", "Slides", "Rolls"],
      ["Does a log on its side roll or slide?", "Rolls", "Slides"]
    ]),
    les("Spinning", [
      ["Spin", "🌀", "Something that <b>spins</b> turns around and around, like a top or a wheel."],
      ["Spinners", "🪀 🎡 🌬️", "A top spins. A merry-go-round spins. Fan blades spin."],
      ["Spin a coin", "🪙", "You can spin a coin on a table. It goes round and round, then slows down."]
    ], ["Spinning is turning around and around.", "Tops, fan blades and wheels spin.", "Example: a pinwheel spins when you blow on it. Now try yours."], [
      ["Which one can spin around and around?", "A top", "A rock", "A book"], ["What happens to a pinwheel when you blow on it?", "It spins", "It melts", "It floats away"],
      ["A fan has blades that...", "Spin", "Melt", "Sing"], ["Which one spins?", "A merry-go-round", "A brick", "A sock"], ["A car wheel...", "Spins", "Sleeps", "Melts"],
      ["Spinning means turning...", "Around and around", "Up only", "Not at all"], ["Which one can you spin?", "A top", "A cloud", "A shadow"]
    ]),
    les("Things fall down", [
      ["Falling", "🍎 ⬇️", "When you let go of something, it <b>falls down</b>. A ball, an apple and rain all fall down."],
      ["Gravity", "🌍", "A pull from the Earth called <b>gravity</b> pulls things down toward the ground."],
      ["We stay down", "🧍", "Gravity keeps our feet on the ground, too."]
    ], ["Think about what happens when you drop something.", "Gravity pulls things down toward the ground.", "Example: when you drop a crayon, it falls to the floor because of gravity. Now try yours."], [
      ["You let go of a ball. Which way does it go?", "Down", "Up", "Sideways"], ["What pulls things down?", "Gravity", "Wind", "Music"], ["An apple falls from a tree. It goes...", "Down", "Up", "Away to the sky"],
      ["Rain falls...", "Down", "Up", "Sideways always"], ["Gravity pulls things toward the...", "Ground", "Clouds", "Moon only"], ["You jump up. What happens next?", "You come back down", "You float away", "You stay up"],
      ["What keeps our feet on the ground?", "Gravity", "Glue", "Magic"]
    ]),
    les("Light", [
      ["Light helps us see", "☀️ 💡", "<b>Light</b> lets us see. Without light, everything is dark."],
      ["Where light comes from", "☀️ 🔦 💡", "The Sun, a flashlight, a lamp and a fire give off light."],
      ["Never look at the Sun", "🕶️", "The Sun is so bright it can hurt your eyes. Never look straight at it."]
    ], ["Light comes from things that glow or shine.", "The Sun, lamps and flashlights make light. Books and rocks do not.", "Example: a candle flame makes light, a spoon does not. Now try yours."], [
      ["Which one gives off its own light?", "The Sun", "A book", "A rock"], ["Which one makes light?", "A flashlight", "A chair", "A shoe"], ["What do we need to see in a dark room?", "Light", "Noise", "Water"],
      ["Which one makes light?", "A lamp", "A pillow", "A spoon"], ["Should you look straight at the Sun?", "No, never", "Yes, always", "Only with eyes closed"], ["Which one is NOT a light source?", "A rock", "The Sun", "A lamp"],
      ["In a very dark room with no light you can see...", "Almost nothing", "Everything clearly", "Only colors"]
    ]),
    les("Shadows", [
      ["What is a shadow?", "🧍 ⬛", "A <b>shadow</b> is a dark shape made when something blocks the light."],
      ["Need light", "🔦", "You need light to make a shadow. In the dark there are no shadows."],
      ["Move it", "🕺", "When you move, your shadow moves with you."]
    ], ["A shadow forms when something is in the way of the light.", "No light, no shadow.", "Example: a tree blocks the sun and makes a shadow on the grass. Now try yours."], [
      ["What makes a shadow?", "Something blocking light", "Something hot", "Something loud"], ["Can you make a shadow with no light?", "No", "Yes"],
      ["When you move, your shadow...", "Moves with you", "Stays still", "Disappears"], ["A shadow is...", "A dark shape", "A bright light", "A sound"], ["Where do you see a shadow?", "Where light is blocked", "In a dark room only", "In the sky only"],
      ["You stand in the sun with the sun behind you. Your shadow is...", "In front of you", "Behind you", "Gone"], ["Which makes a shadow?", "A tree in the sun", "A clear glass of water in the dark", "A song"]
    ]),
    les("Magnets pull", [
      ["Magnets", "🧲", "A <b>magnet</b> can pull some things toward it. We say it <b>attracts</b> them."],
      ["Metal things", "📎 🔩", "Magnets pull on things made of iron or steel, like paper clips and nails."],
      ["Not everything", "🚫", "Magnets do not pull on paper, plastic or wood."]
    ], ["A magnet pulls special things toward it.", "Magnets pull iron and steel things, like paper clips and nails.", "Example: a magnet picks up a steel screw but not a wooden block. Now try yours."], [
      ["A magnet can pick up a...", "Paper clip", "Piece of paper", "Wooden block"], ["Attract means to...", "Pull toward", "Push away", "Break"], ["Which one will a magnet pull?", "An iron nail", "A plastic spoon", "A feather"],
      ["A magnet is a...", "Thing that pulls some metals", "Kind of food", "Kind of cloud"], ["Which one does a magnet NOT pull?", "A wooden block", "A steel nail", "A paper clip"], ["Magnets pull things made of...", "Iron or steel", "Paper", "Wood"],
      ["A magnet will pull a...", "Steel screw", "Rubber band", "Piece of cloth"]
    ]),
    les("Magnetic or not?", [
      ["Test it", "🧲 🔍", "Hold a magnet near a thing. If it sticks or pulls, it is <b>magnetic</b>."],
      ["Magnetic things", "🔩 📎", "Iron nails, steel paper clips and steel cans are magnetic."],
      ["Not magnetic", "🪵 🧸 🪟", "Wood, plastic, rubber, glass and cloth are not magnetic."]
    ], ["Magnetic things are made of iron or steel.", "Wood, plastic, glass, cloth and rubber are not magnetic.", "Example: a steel screw sticks to a magnet, a pencil does not. Now try yours."], [
      ["Is an iron nail magnetic?", "Yes", "No"], ["Is a plastic spoon magnetic?", "No", "Yes"], ["Is a steel paper clip magnetic?", "Yes", "No"], ["Is a wooden block magnetic?", "No", "Yes"],
      ["Is a rubber band magnetic?", "No", "Yes"], ["Is a glass marble magnetic?", "No", "Yes"], ["Is a steel can magnetic?", "Yes", "No"], ["Is a cloth sock magnetic?", "No", "Yes"]
    ]),
    les("Loud and soft sounds", [
      ["Loud", "🚒 🥁", "A <b>loud</b> sound is easy to hear from far away, like a fire truck siren or a drum bang."],
      ["Soft", "🤫 🐭", "A <b>soft</b> sound is quiet, like a whisper or a mouse walking."],
      ["Protect your ears", "👂", "Very loud sounds can hurt your ears. Cover them or move away."]
    ], ["Loud sounds are strong. Soft sounds are quiet.", "Sirens, thunder and drums are loud. Whispers and tiptoes are soft.", "Example: a jet taking off is loud, a clock ticking is soft. Now try yours."], [
      ["Which is loud?", "A fire truck siren", "A whisper", "A mouse walking"], ["Which is soft?", "A whisper", "Thunder", "A drum bang"], ["Which is loud?", "Thunder", "A pin dropping", "A sleeping cat"],
      ["Which is soft?", "A pin dropping", "A jet plane", "A drum bang"], ["Which is loud?", "A big drum", "A whisper", "A feather landing"], ["What can you do about very loud noise?", "Cover your ears", "Make it louder", "Put your hands on your eyes"],
      ["Which is soft?", "A sleeping kitten purring", "A siren", "A fireworks bang"]
    ]),
    les("High and low sounds", [
      ["High sounds", "🐭 🐦", "A <b>high</b> sound is thin and squeaky, like a mouse squeak or a bird tweet."],
      ["Low sounds", "🦁 🥁", "A <b>low</b> sound is deep, like a lion roar or a big drum."],
      ["Sing it", "🎵", "Sing a high note, then a low one. Can you feel the difference?"]
    ], ["Is it a squeaky sound or a deep rumbly sound?", "Squeaks, tweets and whistles are high. Roars, rumbles and big drums are low.", "Example: a flute is high, a tuba is low. Now try yours."], [
      ["Is a mouse squeak high or low?", "High", "Low"], ["Is a lion's roar high or low?", "Low", "High"], ["Is a bird's tweet high or low?", "High", "Low"],
      ["Is a big bass drum high or low?", "Low", "High"], ["Is a whistle high or low?", "High", "Low"], ["Is thunder's rumble high or low?", "Low", "High"],
      ["Is a cow's moo high or low?", "Low", "High"]
    ]),
    les("Sound shakes", [
      ["Sound is shaking", "🥁", "When something <b>vibrates</b> (shakes back and forth very fast), it makes sound."],
      ["Feel it", "🗣️", "Put your fingers on your throat and hum. You feel a buzz. That is your throat vibrating."],
      ["Stop the shake", "✋", "Touch a ringing bell and it goes quiet. When the shaking stops, the sound stops."]
    ], ["Sound comes from shaking.", "A drum skin shakes when you hit it. A guitar string shakes when plucked.", "Example: a rubber band wiggles when you pluck it, and you hear a sound. Now try yours."], [
      ["Sound is made when things...", "Vibrate (shake)", "Stay perfectly still", "Freeze"], ["You hum with your fingers on your throat. You feel...", "A buzz", "Cold", "Wet"],
      ["When you hit a drum, the drum skin...", "Shakes", "Melts", "Disappears"], ["A guitar string makes sound when it...", "Is plucked and shakes", "Is held still", "Is frozen"],
      ["If a ringing bell stops shaking, the sound...", "Stops", "Gets louder", "Turns to light"], ["Can a still, not-shaking drum make sound?", "No", "Yes"],
      ["A plucked rubber band wiggles and makes...", "A sound", "A color", "A smell"]
    ]),
    les("Hot and cold", [
      ["Hot", "☀️ 🍲", "The Sun, fresh soup and a stove are <b>hot</b>. Hot things can burn you."],
      ["Cold", "🧊 ❄️", "Ice, snow and a freezer are <b>cold</b>."],
      ["Thermometer", "🌡️", "A <b>thermometer</b> shows how hot or cold something is."]
    ], ["Ice and snow are cold. The Sun and fresh soup are hot.", "A thermometer tells how hot or cold.", "Example: a hot bath is hot, an ice pop is cold. Now try yours."], [
      ["Is ice hot or cold?", "Cold", "Hot"], ["Is fresh soup hot or cold?", "Hot", "Cold"], ["Is the Sun hot or cold?", "Hot", "Cold"], ["Is snow hot or cold?", "Cold", "Hot"],
      ["Is a freezer hot or cold?", "Cold", "Hot"], ["Is a stove that is on hot or cold?", "Hot", "Cold"], ["What tool shows how hot or cold something is?", "Thermometer", "Ruler", "Clock"]
    ]),
    les("Staying safe near hot things", [
      ["Hot can hurt", "🔥", "Stoves, ovens, kettles and hot water can burn you. Be careful!"],
      ["Ask for help", "🧑‍🍳", "Always ask a grown-up to handle hot food, hot water and anything on the stove."],
      ["Safe rule", "✋", "If it is hot or you are not sure, don't touch. Tell a grown-up."]
    ], ["Hot things can burn skin.", "Don't touch. Ask a grown-up.", "Example: a pot on the stove might be hot. You stay back and ask a grown-up. Now try yours."], [
      ["A stove is on. Should you touch it?", "No", "Yes"], ["Who should pour hot water?", "A grown-up", "A little kid", "A pet"], ["Can a kettle be hot?", "Yes, it can burn you", "No, never"],
      ["You're not sure if a pan is hot. What do you do?", "Don't touch it, ask a grown-up", "Touch it fast", "Pick it up"], ["Can hot food burn your mouth?", "Yes", "No"],
      ["The oven is on. What do you do?", "Stay back and ask a grown-up", "Open it and put your hand in", "Sit on it"], ["Is it safe to play near a hot stove?", "No", "Yes"]
    ]),
    les("Energy from the Sun", [
      ["The Sun", "☀️", "The <b>Sun</b> gives us light and heat. It is our biggest source of energy."],
      ["Plants need it", "🌱", "Plants use sunlight to grow. Plants give us food, and many animals eat plants."],
      ["Sun safety", "🧴", "Wear a hat and sunscreen when you play in strong sun. Never look straight at the Sun."]
    ], ["The Sun gives us two things: light and warmth.", "Plants use sunlight to grow.", "Example: a sunflower turns toward the Sun to get light. Now try yours."], [
      ["What does the Sun give us?", "Light and heat", "Only cold", "Only music"], ["Plants need sunlight to...", "Grow", "Sleep", "Sing"], ["Is it warmer in the sun or in the shade?", "In the sun", "In the shade"],
      ["Which one needs sunlight to grow?", "A flower", "A rock", "A spoon"], ["Why do we wear a hat and sunscreen?", "To protect our skin", "To get colder", "To go faster"],
      ["The Sun is a big source of...", "Energy", "Cold", "Clouds"], ["Should you look straight at the Sun?", "No, never", "Yes"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [2, 3, 4, 5, 7, 11, 12])),
    mix("Level 1 Challenge", at(a, [0, 1, 6, 8, 9, 10, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 2 =================
  const b = [
    les("Push harder, go farther", [
      ["A bigger push", "💪 ➡️", "A <b>bigger push</b> makes a thing move <b>faster</b> and <b>farther</b>."],
      ["A gentle push", "🤏", "A gentle push moves it a little way and slowly."],
      ["Try it", "🚗", "Push a toy car softly, then harder. Which goes farther?"]
    ], ["Think about how hard you push.", "More push = faster and farther. Less push = slower and shorter.", "Example: kick a ball hard and it flies far. Tap it and it goes a little way. Now try yours."], [
      ["You push a ball harder. It goes...", "Farther", "Not as far"], ["A gentle push makes a toy car go...", "Not far", "Very far"], ["To make a swing go higher, push...", "Harder", "Softer"],
      ["A bigger push makes a thing go...", "Faster", "Slower"], ["Which push moves a box farther?", "A big push", "A tiny push"], ["You want a ball to go far. Kick it...", "Hard", "Barely"],
      ["A very soft tap on a ball makes it go...", "Slowly and not far", "Super fast"]
    ]),
    les("Heavy things need more", [
      ["Heavy needs more", "📦", "A <b>heavy</b> thing needs a <b>bigger</b> push or pull to move than a light thing."],
      ["Compare", "🪶 🪨", "A feather moves with a tiny puff. A big rock needs a big push."],
      ["Many hands", "🤝", "If something is too heavy, ask a grown-up to help."]
    ], ["Think about which one is easier to move.", "Light things move easily. Heavy things need more push.", "Example: an empty wagon is easy to pull, a full wagon is harder. Now try yours."], [
      ["Which is easier to push?", "An empty box", "A box full of books"], ["A heavy wagon needs a...", "Bigger pull", "Smaller pull"], ["Which needs more push to move?", "A real car", "A toy car"],
      ["Light things are...", "Easier to move", "Harder to move"], ["Which is harder to lift?", "A bag of oranges", "A pencil"], ["A full backpack is ___ to lift than an empty one.", "Harder", "Easier"],
      ["If something is too heavy, you should...", "Ask for help", "Hurt yourself trying"]
    ]),
    les("Fast, faster, fastest", [
      ["Compare speeds", "🚲 🚗 ✈️", "A bike is fast. A car is faster. An airplane is even faster."],
      ["Slow ones", "🐌 🐢", "A snail is slower than a turtle. A turtle is slower than a person."],
      ["Fastest", "🏆", "The <b>fastest</b> is the quickest of all. The <b>slowest</b> is the one that takes longest."]
    ], ["Think about which gets there first.", "Snail < turtle < person < bike < car < airplane < rocket.", "Example: a horse is faster than a person walking. Now try yours."], [
      ["Which is faster?", "A car", "A bike"], ["Which is faster?", "An airplane", "A car"], ["Which is faster?", "A turtle", "A snail"], ["Which is faster?", "A cheetah", "A horse"],
      ["Which is the slowest?", "A snail", "A bike", "A car"], ["Which is faster?", "Running", "Walking"], ["Which is the fastest?", "A rocket", "A bike", "A person"]
    ]),
    les("Start, stop and turn", [
      ["Start", "⚽", "A push can <b>start</b> something moving. A ball sits still until you kick it."],
      ["Stop", "🛑", "A force can <b>stop</b> something, like brakes on a bike or a goalie's hands."],
      ["Turn", "↪️", "A push can also <b>change direction</b>, like when a bat hits a ball back."]
    ], ["Pushes and pulls can start, stop or turn things.", "Brakes stop. A kick starts. A bat hit can turn a ball around.", "Example: a hockey stick hits a puck and sends it a new way. Now try yours."], [
      ["Brakes on a bike make it...", "Stop", "Start", "Fly"], ["Kicking a ball that sits still makes it...", "Start moving", "Stop", "Turn into light"], ["To turn a bike you turn the...", "Handlebars", "Seat", "Bell"],
      ["A goalie catching a ball makes it...", "Stop", "Go faster", "Fly up forever"], ["A bat hitting a ball can change its...", "Direction", "Color", "Name"], ["A push or pull can...", "Start, stop or turn things", "Only start things", "Do nothing"],
      ["A ball rolls to a wall and bounces back. The wall changed its...", "Direction", "Smell", "Color"]
    ]),
    les("Friction", [
      ["Rubbing slows things", "🖐️", "<b>Friction</b> is a force that happens when two things rub together. It slows them down."],
      ["Rough and smooth", "🧱 🧊", "Rough things have lots of friction. Smooth, slippery things have little."],
      ["Helpful", "👟", "Friction lets shoes grip and brakes stop. It also makes your hands warm when you rub them."]
    ], ["Friction is when things rub.", "Rough = more friction (slows more). Slippery = less friction.", "Example: a sock slides on a smooth floor but not on a rough carpet. Now try yours."], [
      ["Which has more friction?", "A rug", "Ice"], ["Which is more slippery?", "Ice", "Sandpaper"], ["Friction slows things that...", "Rub together", "Float in the air"], ["Brakes use friction to...", "Stop the wheel", "Make the bike taller"],
      ["Rubbing your hands fast makes them...", "Warm", "Cold"], ["A toy car on a rough ramp goes...", "Slower", "Faster"], ["Why do shoes have grippy bottoms?", "So we don't slip", "To look silly"]
    ]),
    les("Gravity pulls down", [
      ["Gravity", "🌍 ⬇️", "<b>Gravity</b> is the Earth pulling things toward it. That is why things fall down."],
      ["Up and down", "⚾", "Throw a ball up. It slows, stops, then falls back to you."],
      ["Can't see it", "👀", "We cannot see gravity, but we can see what it does."]
    ], ["Gravity always pulls toward the ground.", "What goes up must come back down.", "Example: a paper airplane you toss up lands on the floor. Now try yours."], [
      ["You throw a ball up. What happens next?", "It comes back down", "It stays up", "It flies to the Sun"], ["Gravity pulls things toward the...", "Earth", "Clouds", "Stars"],
      ["Which way does rain fall?", "Down", "Up"], ["Why do we stay on the ground?", "Gravity", "Glue"], ["An apple on a tree falls...", "Down", "Up"], ["You jump. Gravity brings you...", "Back down", "Higher up"],
      ["Can we see gravity?", "No, but we see what it does", "Yes, it's a blue line"]
    ]),
    les("Slowing a fall", [
      ["Air pushes up", "🪂", "Air pushes back on things that fall. A <b>parachute</b> catches lots of air, so you fall slowly."],
      ["Wide and flat", "🍃", "A leaf or a flat paper falls slowly because it catches air. A rock falls fast."],
      ["Try it", "📄", "Drop a flat sheet of paper and a crumpled ball. The crumpled one falls faster."]
    ], ["Air can push up on a falling thing.", "Wide, flat things catch more air and fall slower.", "Example: a feather falls slower than a stone because it catches more air. Now try yours."], [
      ["A parachute slows a fall because it catches...", "Air", "Rain", "Light"], ["Which falls faster?", "A crumpled paper ball", "A flat sheet of paper"], ["Which falls faster?", "A rock", "A feather"],
      ["A skydiver opens a parachute to...", "Slow down", "Speed up"], ["A flat leaf falls...", "Slowly", "Like a bullet"], ["Which falls slowest?", "A leaf", "A rock", "A marble"],
      ["Why does a parachute help a person land softly?", "It makes them fall slowly", "It makes them heavier", "It makes them glow"]
    ]),
    les("Magnet poles", [
      ["Two ends", "🧲", "A magnet has two ends called <b>poles</b>: a north pole and a south pole."],
      ["Different ends pull", "N ↔ S", "A north end and a south end <b>attract</b> (pull together)."],
      ["Same ends push", "N ↔ N", "Two north ends, or two south ends, <b>repel</b> (push apart)."]
    ], ["Magnet ends are called poles.", "Different poles attract. Same poles repel.", "Example: two south poles push apart, a south and a north stick together. Now try yours."], [
      ["A magnet's ends are called...", "Poles", "Wheels", "Bells"], ["A north pole and a south pole...", "Pull together", "Push apart"], ["Two north poles...", "Push apart", "Pull together"],
      ["Repel means to...", "Push away", "Pull closer"], ["Attract means to...", "Pull closer", "Push away"], ["Two south poles...", "Push apart", "Pull together"],
      ["Different poles (north and south)...", "Attract", "Repel"]
    ]),
    les("Magnets at work", [
      ["Everyday magnets", "🧲 🧊", "Magnets hold notes on the fridge and keep cabinet doors closed."],
      ["Through things", "📄", "A magnet can pull through thin paper or a cup of water."],
      ["Compass", "🧭", "A compass has a little magnet that points north. It helps people find their way."]
    ], ["Magnets are useful in many places.", "A fridge door is made of steel, so magnets stick to it.", "Example: a magnet can pick up a pin through a sheet of paper. Now try yours."], [
      ["Fridge magnets stick because the door has...", "Steel or iron", "Plastic", "Wood"], ["A compass needle is a small...", "Magnet", "Spoon", "Balloon"], ["A compass needle points...", "North", "Down", "At you"],
      ["Can a magnet pull a paper clip through a sheet of paper?", "Yes", "No"], ["Magnets can hold cabinet doors...", "Shut", "Hot", "Loud"], ["Which can a magnet pick up from a pile?", "A steel nail", "A plastic button", "A wooden spoon"],
      ["A compass helps people...", "Find direction", "Cook food", "See in the dark"]
    ]),
    les("How we see", [
      ["Light bounces", "💡 ➡️ 👁️", "We see things because <b>light</b> bounces off them and goes into our eyes."],
      ["Dark", "🌑", "In a totally dark room there is no light to bounce, so we cannot see."],
      ["Moon", "🌙", "The Moon does not make its own light. It shines because it bounces light from the Sun."]
    ], ["Seeing needs light.", "Light bounces off things into our eyes.", "Example: a red ball looks red because light bounces off it to your eyes. Now try yours."], [
      ["We see things because light bounces into our...", "Eyes", "Feet", "Elbows"], ["In a totally dark room you can see...", "Nothing", "Everything"], ["Which gives off its own light?", "The Sun", "The Moon", "A mirror"],
      ["The Moon shines because it bounces light from the...", "Sun", "Sea", "Trees"], ["A night light helps us...", "See in the dark", "Hear better"], ["Which makes its own light?", "A flashlight", "A book", "A rock"],
      ["Without light, we can't...", "See", "Breathe"]
    ]),
    les("Light goes straight", [
      ["Straight lines", "🔦", "Light travels in <b>straight lines</b>. A flashlight beam is straight."],
      ["Mirrors bounce it", "🪞", "A <b>mirror</b> bounces light back, so you see a <b>reflection</b> of yourself."],
      ["Shiny helps", "✨", "Shiny things bounce more light than dull things."]
    ], ["Light goes straight until it hits something.", "Mirrors bounce light back to you.", "Example: foil bounces light, so it looks shiny. Now try yours."], [
      ["Light travels in a...", "Straight line", "Zigzag always", "Circle always"], ["A mirror makes light...", "Bounce back", "Disappear"], ["In a mirror you see your...", "Reflection", "Shadow"],
      ["A flashlight beam is...", "Straight", "Curly"], ["Which bounces more light?", "A shiny spoon", "A black wool sock"], ["Which is a good reflector?", "A mirror", "A dark cloth"],
      ["Shiny things look shiny because they...", "Bounce lots of light", "Make sound"]
    ]),
    les("Shadows change", [
      ["Long and short", "🌅 ☀️", "In the morning and evening the Sun is low, so shadows are <b>long</b>. At noon the Sun is high, so shadows are <b>short</b>."],
      ["Near or far", "🔦 🧸", "Move a toy closer to a lamp and its shadow gets <b>bigger</b>. Move it farther and the shadow gets <b>smaller</b>."],
      ["Needs light", "☁️", "On a cloudy day shadows are faint because there is less strong light."]
    ], ["The size of a shadow depends on where the light is.", "Low Sun = long shadow. High Sun = short shadow. Closer to the lamp = bigger shadow.", "Example: at sunset your shadow stretches far. Now try yours."], [
      ["At noon, shadows are...", "Short", "Long"], ["In the evening, shadows are...", "Long", "Short"], ["Move a toy closer to a lamp. The shadow gets...", "Bigger", "Smaller"],
      ["Move a toy farther from a lamp. The shadow gets...", "Smaller", "Bigger"], ["Do shadows need light?", "Yes", "No"], ["On a cloudy day, shadows are...", "Faint", "Very dark"],
      ["The Sun is low in the morning, so shadows are...", "Long", "Short"]
    ]),
    les("Lets light through?", [
      ["See-through", "🪟", "Clear glass and clear plastic let light <b>through</b>, so you can see through them."],
      ["Blocks light", "🚪", "Wood, metal and cardboard <b>block</b> light. They make dark shadows."],
      ["A little light", "🕶️", "Waxed paper or sunglasses let some light through."]
    ], ["Ask: can light get through?", "Clear = lets light through. Solid = blocks it.", "Example: a wooden door blocks light. A clear window lets it in. Now try yours."], [
      ["Does clear glass let light through or block it?", "Lets light through", "Blocks light"], ["Does a wooden board let light through or block it?", "Blocks light", "Lets light through"],
      ["Does clear plastic let light through or block it?", "Lets light through", "Blocks light"], ["Does a metal tray let light through or block it?", "Blocks light", "Lets light through"],
      ["Which makes the darkest shadow?", "A cardboard square", "A clear plastic sheet", "A clean window"], ["Does cardboard let light through or block it?", "Blocks light", "Lets light through"],
      ["Does a clear water glass let light through?", "Yes", "No"]
    ]),
    les("How sound travels", [
      ["Through air", "🔊 ➡️ 👂", "Sound travels through the <b>air</b> to your ears. It can travel through water and solids, too."],
      ["Far away", "📣", "The farther away a sound is, the quieter it gets."],
      ["Echo", "⛰️", "An <b>echo</b> is a sound that bounces off a hard surface and comes back."]
    ], ["Sound needs something to travel through.", "It goes through air, water and solid things. Far away = quieter.", "Example: you shout in a big empty hall and hear it again. That is an echo. Now try yours."], [
      ["Sound travels through...", "Air", "Nothing"], ["A faraway sound is...", "Quieter", "Louder"], ["An echo is sound that...", "Bounces back", "Gets stuck"], ["Where might you hear an echo?", "A big empty hall", "A pillow"],
      ["You hear a friend across the room because sound travels through the...", "Air", "Floor only"], ["Can sound travel through water?", "Yes", "No"], ["Which is louder?", "A sound close to you", "A sound very far away"]
    ]),
    les("High, low and loud", [
      ["Pitch", "🎵", "<b>Pitch</b> is how high or low a sound is. Short or tight strings make high sounds. Long or loose strings make low sounds."],
      ["Big and small", "🥁 🔔", "Big things make low sounds, like a tuba or a big drum. Small things make high sounds, like a tiny bell or whistle."],
      ["Loud", "💥", "Hit a drum harder and it gets <b>louder</b>."]
    ], ["Think big or small, hard or gentle.", "Small = higher. Big = lower. Harder hit = louder.", "Example: a small whistle is higher than a big horn. Now try yours."], [
      ["A tiny bell makes a ___ sound.", "High", "Low"], ["A big tuba makes a ___ sound.", "Low", "High"], ["Hit a drum harder. The sound is...", "Louder", "Quieter"],
      ["A short string makes a ___ sound.", "Higher", "Lower"], ["A thick bass string makes a ___ sound.", "Lower", "Higher"], ["Pitch means how ___ a sound is.", "High or low", "Wet or dry"],
      ["Hit a drum gently. The sound is...", "Quieter", "Louder"]
    ]),
    les("Vibrations make sound", [
      ["Shake and sound", "🎸", "A plucked guitar string shakes back and forth. That <b>vibration</b> makes sound."],
      ["Feel it", "🔊", "Touch a speaker playing music. You feel a buzz."],
      ["Stop it", "✋", "Touch the string and the shaking stops. The sound stops, too."]
    ], ["Every sound comes from something shaking.", "Vibration = shaking back and forth. Stop the shake, stop the sound.", "Example: a rubber band buzzes when plucked. Hold it still and it is silent. Now try yours."], [
      ["Sound is made by...", "Vibrations", "Colors"], ["A plucked rubber band makes sound while it...", "Wiggles back and forth", "Sits still"], ["Touch a speaker playing music. You feel...", "A buzz", "Ice"],
      ["When something stops vibrating, the sound...", "Stops", "Gets louder"], ["Humming with your fingers on your throat, you feel...", "Vibrations", "Fire"], ["If you touch a guitar string while it rings, the sound...", "Stops", "Doubles"],
      ["Which makes a sound?", "A shaking drum skin", "A still drum skin"]
    ]),
    les("Heat moves", [
      ["Hot to cold", "☕ ➡️", "Heat moves from hot things to colder things."],
      ["Cooling down", "🥣", "Hot cocoa left on a table cools down because its heat moves into the air."],
      ["Melting in your hand", "🧊 ✋", "An ice cube melts in your hand because heat moves from your warm hand into the ice."]
    ], ["Heat always moves from hot to cold.", "Hot things lose heat to cooler things around them.", "Example: a warm bath cools as heat moves into the air. Now try yours."], [
      ["Heat moves from hot things to ___ things.", "Colder", "Hotter"], ["Hot cocoa left alone gets...", "Cooler", "Hotter"], ["An ice cube in your hand melts because heat moves from your hand to...", "The ice", "The floor only"],
      ["A metal spoon in hot soup gets...", "Hot", "Icy"], ["Soup cools down because its heat goes into the...", "Air", "Spoon only"], ["Cold lemonade left outside gets...", "Warmer", "Colder"],
      ["Which way does heat move?", "From hot to cold", "From cold to hot"]
    ]),
    les("Keeping warm", [
      ["Keep heat in", "🧥", "A coat keeps your body heat <b>in</b> so you stay warm."],
      ["Good keepers", "🧶 🧤", "Wool, fur and puffy materials trap heat. Mittens keep your hands warm."],
      ["Thermos", "🥤", "A thermos keeps soup hot by slowing heat from getting out."]
    ], ["Warm clothes keep your heat from escaping.", "Wool and puffy stuff are good at keeping heat in.", "Example: a hat keeps heat from leaving your head. Now try yours."], [
      ["A coat keeps you warm by keeping your body heat...", "In", "Out"], ["Which keeps hands warm?", "Mittens", "Wet socks"], ["Which keeps heat in better?", "Wool", "Thin metal"],
      ["A blanket helps keep you...", "Warm", "Cold"], ["Why do we wear hats in winter?", "To keep heat in", "To make it snow"], ["A thermos keeps soup...", "Hot", "Frozen"],
      ["Which is best for a winter coat?", "Thick puffy stuff", "Thin paper"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 3, 5, 7, 11, 14])),
    mix("Level 2 Challenge", at(b, [2, 4, 6, 8, 9, 10, 12, 13, 15, 16, 17]))
  );

  // ================= LEVEL 3 =================
  const c = [
    les("What is a force?", [
      ["Force", "💪", "A <b>force</b> is a push or a pull. Forces make things start, stop, speed up, slow down or turn."],
      ["Forces everywhere", "🚪 ⚽ 🌍", "Opening a door, kicking a ball and gravity are all forces."],
      ["Strong and weak", "⚖️", "A bigger force makes a bigger change in how something moves."]
    ], ["A force is a push or a pull.", "If something starts, stops or turns, a force did it.", "Example: wind pushing a sail is a force. Now try yours."], [
      ["A force is a push or a...", "Pull", "Song"], ["Which one is a force?", "Kicking a ball", "Thinking about a ball", "A rainbow"], ["Gravity is a force that...", "Pulls things down", "Pushes things up"],
      ["A force can make a thing...", "Start, stop or turn", "Only glow"], ["To open a door you need a push or a...", "Pull", "Whisper"], ["A bigger force makes a ___ change in motion.", "Bigger", "Smaller"],
      ["Wind pushing a sailboat is a...", "Force", "Color"]
    ]),
    les("Forces change motion", [
      ["Speed up, slow down", "🚴", "Pedaling pushes a bike to go faster. Braking slows it down."],
      ["Change direction", "🏏", "A bat hits a ball and sends it a new way. A force changed its direction."],
      ["Still stays still", "⚽", "A ball sitting still stays still until a force acts on it. A moving ball keeps going until a force slows it."]
    ], ["Forces start, stop and change motion.", "Without a push or pull, still things stay still.", "Example: a rolling ball slows down because of friction. Now try yours."], [
      ["A ball rolling on grass slows down because of...", "Friction", "Color", "Music"], ["Hitting a ball with a bat changes its...", "Direction", "Name", "Smell"], ["Pushing a swing makes it go...", "Back and forth", "Stay still"],
      ["Without any force, a still ball stays...", "Still", "Spinning"], ["To stop a moving bike use the...", "Brakes", "Pedals only"], ["Squishing play dough changes its...", "Shape", "Weight to zero"],
      ["Pedaling harder makes a bike...", "Speed up", "Fall asleep"]
    ]),
    les("Gravity everywhere", [
      ["Pull to the center", "🌍", "Gravity pulls everything toward the <b>center of the Earth</b>. That is why things fall down wherever you are on Earth."],
      ["Weight", "⚖️", "Your <b>weight</b> is how hard gravity pulls on you."],
      ["The Moon", "🌙", "The Moon is smaller than Earth, so its gravity is weaker. Astronauts can jump much higher there."]
    ], ["Gravity pulls toward the center of Earth.", "Smaller worlds have weaker gravity.", "Example: you'd weigh less on the Moon because its gravity is weaker. Now try yours."], [
      ["Gravity pulls things toward the center of the...", "Earth", "Sky", "Clouds"], ["On the Moon, astronauts can jump...", "Higher", "Lower"], ["Is the Moon's gravity weaker or stronger than Earth's?", "Weaker", "Stronger"],
      ["What keeps our feet on the ground?", "Gravity", "Wind"], ["Your weight is how hard ___ pulls on you.", "Gravity", "Music"], ["Does gravity work on top of a tall mountain?", "Yes", "No"],
      ["Gravity keeps the Moon going around the...", "Earth", "Sun only"]
    ]),
    les("Friction in action", [
      ["More friction", "🧱", "Rough surfaces have <b>more friction</b>. They slow things faster."],
      ["Less friction", "🛢️ 🧊", "Oil, ice and soap make surfaces slippery. Less friction means things slide far."],
      ["Warm hands", "🙌", "Rub your hands together fast. Friction makes heat!"]
    ], ["Friction happens when surfaces rub.", "Rough = more friction. Slippery = less friction.", "Example: a bike chain with oil has less friction and moves smoothly. Now try yours."], [
      ["Friction is a force when two things...", "Rub together", "Float apart"], ["Which has more friction?", "Sandpaper", "Glass"], ["Oil on a bike chain makes friction...", "Less", "More"],
      ["Rubbing hands fast makes them...", "Warm", "Wet"], ["Without friction, your shoes would...", "Slip a lot", "Stick to the floor"], ["A sliding toy stops faster on...", "A rough carpet", "Slippery ice"],
      ["Brakes work because of...", "Friction", "Color"]
    ]),
    les("Simple machines", [
      ["Helpers", "🛠️", "A <b>simple machine</b> is a tool that makes work easier. It helps us push or pull in a smarter way."],
      ["The six", "📐", "Ramp (inclined plane), lever, wheel and axle, pulley, wedge and screw."],
      ["Around us", "🔍", "A seesaw is a lever. A slide is a ramp. A bike wheel is a wheel and axle."]
    ], ["A simple machine helps you do work with less effort.", "Ramp, lever, wheel and axle, pulley, wedge and screw.", "Example: a flagpole rope uses a pulley. Now try yours."], [
      ["A simple machine makes work...", "Easier", "Harder"], ["Which is a simple machine?", "A ramp", "A cloud", "A shadow"], ["A seesaw is a...", "Lever", "Pulley", "Screw"],
      ["A wheelchair ramp is a kind of...", "Simple machine", "Cloud", "Food"], ["A wagon wheel is a...", "Wheel and axle", "Lever"], ["A flagpole rope uses a...", "Pulley", "Ramp"],
      ["A playground slide is a...", "Ramp", "Lever", "Pulley"]
    ]),
    les("Ramps", [
      ["Slanted ground", "📦", "A <b>ramp</b> is a flat surface that slopes up. It is also called an inclined plane."],
      ["Easier lifting", "♿", "A ramp lets you slide or roll a heavy thing up gently instead of lifting it straight up."],
      ["Long and gentle", "📏", "A longer, gentler ramp needs less push. A short, steep ramp needs more."]
    ], ["A ramp is a slope.", "A long gentle ramp is easier than a steep short one.", "Example: it's easier to roll a barrel up a long board than to lift it. Now try yours."], [
      ["A ramp helps you lift a heavy box by letting you...", "Roll or slide it up", "Throw it"], ["A longer, gentler ramp needs ___ push.", "Less", "More"], ["A slide in a park is a...", "Ramp", "Lever"],
      ["Which is easier for moving a heavy barrel up?", "A long ramp", "A steep short ramp"], ["A wheelchair ramp replaces...", "Stairs", "Doors"], ["A ramp is a...", "Slope", "Rope", "Ball"],
      ["Moving a heavy box with a ramp is...", "Easier than lifting it straight up", "Impossible"]
    ]),
    les("Levers", [
      ["Seesaw", "⚖️", "A <b>lever</b> is a bar that turns on a point called the <b>pivot</b>. A seesaw is a lever."],
      ["Push down, lift up", "⬇️⬆️", "Pushing down on one end of a lever lifts the other end."],
      ["Balance", "🧒 🧒", "A heavy kid sits closer to the pivot, and a light kid sits farther away, to balance a seesaw."]
    ], ["A lever turns on a pivot.", "Push one end down and the other goes up.", "Example: a crowbar pries open a crate. Now try yours."], [
      ["A seesaw is a...", "Lever", "Ramp"], ["The point a lever turns on is the...", "Pivot", "Wheel"], ["Pushing down one end of a lever lifts the...", "Other end", "Floor"],
      ["A crowbar is a...", "Lever", "Pulley"], ["To balance a seesaw, a heavy kid sits...", "Closer to the pivot", "Farther from the pivot"], ["Which is a lever?", "A bottle opener", "A pillow", "A sock"],
      ["A spoon used to pry up a lid acts like a...", "Lever", "Ramp"]
    ]),
    les("Wheel and axle", [
      ["Wheels", "🛞", "A <b>wheel</b> rolls, which is much easier than sliding something heavy."],
      ["Axle", "🪛", "The <b>axle</b> is the rod through the middle of a wheel. The wheel turns around it."],
      ["Everywhere", "🚲 🚪", "Bikes, wagons and cars have wheels and axles. A doorknob is a wheel and axle, too."]
    ], ["A wheel turns around an axle.", "Rolling is easier than sliding.", "Example: a skateboard has wheels on axles so it rolls. Now try yours."], [
      ["A wheel rolls more easily than a box...", "Slides", "Flies"], ["The rod through the middle of a wheel is the...", "Axle", "Lever"], ["Which has wheels and axles?", "A wagon", "A pillow", "A book"],
      ["A doorknob is a...", "Wheel and axle", "Ramp"], ["Wheels help carry heavy things by...", "Rolling", "Melting"], ["A bike has ___ wheels.", "2", "7"],
      ["A steering wheel in a car is a...", "Wheel and axle", "Wedge"]
    ]),
    les("Pulleys", [
      ["Wheel and rope", "🪢", "A <b>pulley</b> is a wheel with a groove for a rope. You pull the rope to lift something."],
      ["Changes direction", "⬇️⬆️", "With a pulley, you pull <b>down</b> to lift something <b>up</b>. That is easier than lifting."],
      ["In the world", "🏗️ 🚩", "Cranes, flagpoles and window blinds use pulleys."]
    ], ["A pulley has a wheel and a rope.", "It changes the direction of your pull.", "Example: you pull a rope down to raise a bucket up. Now try yours."], [
      ["A pulley is a wheel with a groove for a...", "Rope", "Ball"], ["A flagpole uses a...", "Pulley", "Ramp"], ["With a pulley you pull down to lift something...", "Up", "Sideways"],
      ["A crane uses pulleys to lift...", "Heavy things", "Rainbows"], ["Which is a pulley job?", "Raising a flag", "Rolling a ball"], ["A pulley can change the direction of a...", "Pull", "Color"],
      ["Window blinds use a...", "Pulley", "Magnet"]
    ]),
    les("Magnet powers", [
      ["Pull from far", "🧲", "A magnet can pull without touching. This works through air, paper and water."],
      ["Closer is stronger", "↔️", "A magnet pulls harder when it is closer to the thing."],
      ["Two poles", "N S", "Cut a magnet in half and each piece still has a north and a south pole. Opposites attract. Like poles repel."]
    ], ["Magnet forces work without touching.", "Opposites attract. Likes repel.", "Example: bring two magnets close and one jumps toward the other. Now try yours."], [
      ["A magnet can pull without...", "Touching", "Light"], ["A magnet pulls harder when it is...", "Closer", "Farther"], ["Opposite poles...", "Attract", "Repel"], ["Like poles (N and N)...", "Repel", "Attract"],
      ["Does a magnet pull on plastic?", "No", "Yes"], ["Cut a magnet in half. Each piece has...", "Two poles", "One pole only"], ["Earth acts like a giant...", "Magnet", "Ball of cotton"]
    ]),
    les("Light bounces and bends", [
      ["Reflecting", "🪞", "A smooth shiny surface like a mirror <b>reflects</b> light. We see a clear picture of ourselves."],
      ["Bending", "🥤✏️", "Light <b>bends</b> when it goes from air into water. A pencil in a glass of water can look bent."],
      ["Magnifier", "🔍", "A magnifying glass bends light so small things look bigger."]
    ], ["Light bounces off shiny things and bends in clear things.", "A magnifying glass makes things look bigger.", "Example: a spoon in a glass of water looks bent. Now try yours."], [
      ["A mirror shows your...", "Reflection", "Weight"], ["A pencil in a glass of water looks bent because light...", "Bends", "Stops"], ["A magnifying glass makes small things look...", "Bigger", "Quieter"],
      ["Which reflects light best?", "A mirror", "A black cloth"], ["Smooth, shiny surfaces ___ light.", "Reflect", "Eat"], ["Water can ___ light.", "Bend", "Freeze solid"],
      ["Foil bounces light, so it looks...", "Shiny", "Wet"]
    ]),
    les("Rainbow colors", [
      ["White light", "☀️", "Sunlight looks white, but it is made of <b>all the colors</b> mixed together."],
      ["Seven colors", "🌈", "A rainbow has 7 colors: red, orange, yellow, green, blue, indigo and violet."],
      ["How it forms", "🌧️", "A rainbow forms when sunlight goes through raindrops and splits into colors."]
    ], ["Rainbows come from sunlight and water drops.", "The colors always come in the same order: red first.", "Example: sunlight through a glass prism makes a rainbow on the wall. Now try yours."], [
      ["How many colors are in a rainbow?", "7", "3", "12"], ["The first color in a rainbow is...", "Red", "Pink", "Black"], ["Sunlight is made of...", "All the colors mixed", "Only red"],
      ["A rainbow forms when sunlight goes through...", "Raindrops", "Snow only"], ["A glass prism splits white light into...", "A rainbow", "A shadow"], ["Which is a color in a rainbow?", "Orange", "Pink", "Brown"],
      ["The last color in a rainbow is...", "Violet", "Red", "White"]
    ]),
    les("Sound waves", [
      ["Vibrations travel", "🔊 〰️", "Sound travels as <b>waves</b> of vibrations through air, water and solids."],
      ["No air, no sound", "🚀", "In space there is no air, so sounds cannot travel. Space is silent."],
      ["Light is faster", "⚡", "Light travels much faster than sound. We see lightning before we hear the thunder."]
    ], ["Sound needs something to travel through.", "Light is faster than sound.", "Example: you see a firework flash first and hear the bang later. Now try yours."], [
      ["Sound travels as...", "Waves", "Pictures"], ["Sound cannot travel through...", "Empty space", "Air"], ["We see lightning before we hear thunder because light is...", "Faster than sound", "Slower than sound"],
      ["Can sound travel through water?", "Yes", "No"], ["A tin can telephone works because sound travels through the...", "String", "Moon"], ["In space, sounds are...", "Silent", "Super loud"],
      ["Which is faster?", "Light", "Sound"]
    ]),
    les("Volume and pitch", [
      ["Volume", "🔊", "<b>Volume</b> is how loud or quiet a sound is. Bigger vibrations make louder sounds."],
      ["Pitch", "🎶", "<b>Pitch</b> is how high or low a sound is. Faster vibrations make higher sounds."],
      ["Ear care", "👂", "Very loud sounds can hurt your ears. Keep the volume low and cover your ears around loud noise."]
    ], ["Volume is loud vs quiet. Pitch is high vs low.", "Big vibrations = louder. Fast vibrations = higher.", "Example: a quickly shaking string sounds high. Now try yours."], [
      ["Bigger vibrations make a ___ sound.", "Louder", "Quieter"], ["Faster vibrations make a ___ sound.", "Higher", "Lower"], ["Slower vibrations make a ___ sound.", "Lower", "Higher"],
      ["Volume means how ___ a sound is.", "Loud or quiet", "High or low"], ["Pitch means how ___ a sound is.", "High or low", "Loud or quiet"], ["A tiny whistle has a ___ pitch.", "High", "Low"],
      ["How do you protect your ears from very loud sounds?", "Cover them or move away", "Get closer"]
    ]),
    les("What is energy?", [
      ["Energy", "⚡", "<b>Energy</b> is what makes things move, get warm, light up or make sound."],
      ["Where from", "☀️ 🍎 🔌", "Energy comes from the Sun, from food, from wind and from electricity."],
      ["You need it", "🏃", "Your body gets energy from food. That is why you eat before you play."]
    ], ["Energy makes things happen.", "The Sun, food, wind and electricity give energy.", "Example: wind has energy that can turn a windmill. Now try yours."], [
      ["Where does most of Earth's energy come from?", "The Sun", "The Moon"], ["We get energy from...", "Food", "Shadows"], ["A toaster uses electricity to make...", "Heat", "Snow"],
      ["Wind has energy that can turn a...", "Windmill", "Shadow"], ["Plants get energy from...", "Sunlight", "Plastic"], ["A battery stores...", "Energy", "Rain"],
      ["Energy makes things move, glow or...", "Get warm", "Disappear"]
    ]),
    les("Forms of energy", [
      ["Light, heat, sound", "💡 🔥 🔊", "Energy shows up as light, heat, sound and motion."],
      ["Changing forms", "🔄", "A lamp changes electricity into light. A heater changes electricity into heat. A speaker changes electricity into sound."],
      ["Motion", "🚲", "A rolling ball has motion energy. Your bike moves with energy from the food you eat."]
    ], ["Energy can change from one form to another.", "Ask what comes out: light, heat, sound or motion.", "Example: a fan changes electricity into moving air. Now try yours."], [
      ["A lamp changes electricity into...", "Light", "Sound"], ["A speaker changes electricity into...", "Sound", "Heat only"], ["A heater changes electricity into...", "Heat", "Music"],
      ["A rolling ball has ___ energy.", "Motion", "Cold"], ["You ride a bike using energy from...", "Food", "Shadows"], ["Solar panels turn sunlight into...", "Electricity", "Rain"],
      ["A campfire gives light and...", "Heat", "Snow"]
    ]),
    les("Electricity safety", [
      ["Stay safe", "🔌", "Electricity is useful but dangerous. <b>Never</b> poke anything into a wall outlet."],
      ["Keep away", "⚡", "Stay away from power lines and keep electric things away from water."],
      ["Circuits", "🔋💡", "A <b>circuit</b> is a loop. A battery, wires and a bulb in a loop make the bulb light. A switch can open the loop and turn it off."]
    ], ["Electricity can hurt. Only grown-ups plug things in.", "A circuit must be a complete loop to work.", "Example: if a wire comes off, the loop is broken and the bulb goes off. Now try yours."], [
      ["Should you poke things into a wall outlet?", "No, never", "Yes"], ["Who plugs in and unplugs big electric things?", "A grown-up", "A baby"], ["Keep electric things away from...", "Water", "Pillows"],
      ["You see a fallen power line. What do you do?", "Stay far away and tell a grown-up", "Touch it with a stick", "Play near it"], ["A circuit must be a complete...", "Loop", "Line with a gap"],
      ["A switch that is open makes the light go...", "Off", "On"], ["A bulb lights when the battery, wires and bulb make a...", "Complete loop", "Pile"]
    ]),
    les("Heat and materials", [
      ["Good conductors", "🥄", "Metal moves heat fast. A metal spoon in hot soup gets hot quickly. We call it a <b>conductor</b>."],
      ["Good insulators", "🪵 🧶", "Wood, plastic, wool and foam move heat slowly. They keep heat in or out. We call them <b>insulators</b>."],
      ["Hot to cold", "☕ ➡️", "Heat always moves from hot to cold. A thermometer measures temperature."]
    ], ["Metals pass heat quickly. Wool, wood and foam pass it slowly.", "Pick a conductor for fast heat and an insulator for slow heat.", "Example: pot handles are often wood or plastic so they stay cooler. Now try yours."], [
      ["Heat moves from hot to...", "Cold", "Hot"], ["Which is a good conductor of heat?", "Metal", "Wool", "Foam"], ["Which is a good insulator?", "Wool", "Metal"],
      ["A metal spoon in hot soup...", "Gets hot fast", "Stays cold"], ["A wooden spoon in hot soup...", "Stays cooler than metal", "Gets hot faster than metal"], ["A thermometer measures...", "Temperature", "Length"],
      ["An ice cube melts in your hand because heat moves into the...", "Ice", "Wall"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [0, 1, 2, 3, 4, 5, 6, 7])),
    mix("Level 3 Challenge", at(c, [0, 2, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]))
  );

  return { 1: a, 2: b, 3: c };
})();
