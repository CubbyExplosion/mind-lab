// Mind Lab Drama & Theater. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
// Needs math.js loaded first (uses ri, pick, shuf).

const DRAMA_LEVELS = (() => {
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  // multiple-choice lesson: items = [question, right answer, [wrong answers], visual?]
  const L = (title, slides, items, hints) => {
    const make = () => { const [q, a, w, v] = pick(items); return { text: q, visual: v, choices: shuf([a, ...w]), answer: a, hints }; };
    make.teach = () => slides.map(S);
    return { title, make };
  };
  const F = (title, slides, fn) => { const make = () => fn(); make.teach = () => slides.map(S); return { title, make }; };
  const MIX = (title, ...ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ---------- script lines: who says it? ----------
  const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const LINES = ["Look at the big moon!", "I found a shiny key.", "It is time for lunch.", "Let us build a sandcastle.", "Thank you for helping me.", "Can I play too?", "The garden is full of flowers.", "I made a paper boat."];
  const whoSays = () => {
    const [a, b] = shuf(NAMES).slice(0, 2), [l1, l2] = shuf(LINES).slice(0, 2), first = Math.random() < 0.5;
    const wr = shuf(NAMES.filter(x => x !== a && x !== b)).slice(0, 1);
    const who = first ? a : b, line = first ? l1 : l2;
    return {
      text: `Who says: "${line}"?`, visual: `<b>${a.toUpperCase()}:</b> ${l1}<br><b>${b.toUpperCase()}:</b> ${l2}`, choices: shuf([who, first ? b : a, ...wr]), answer: who,
      hints: ["In a script, a name comes first and the words that person says come after the colon.", "Find the line in the script. Look at the name just before it.", "Example: in 'KIM: Hello!' the name Kim is the one who says Hello. Now find your line."]
    };
  };

  // ======================= LEVEL 1 =======================
  const l1 = [
    L("Faces and feelings", [
      ["Feelings", "😊 😢 😠", "We have many feelings. Happy, sad and angry are three of them."],
      ["Faces show feelings", "😲 😴 😨", "Our faces change with our feelings. Surprised eyes are wide. Sleepy eyes are heavy."],
      ["Actors use faces", "🎭", "Actors use their faces to show how a character feels."]
    ], [
      ["How does this face feel?", "Happy", ["Sad", "Angry"], "😊"],
      ["How does this face feel?", "Sad", ["Happy", "Surprised"], "😢"],
      ["How does this face feel?", "Angry", ["Happy", "Sleepy"], "😠"],
      ["How does this face feel?", "Surprised", ["Sleepy", "Sad"], "😲"],
      ["How does this face feel?", "Sleepy", ["Surprised", "Angry"], "😴"],
      ["How does this face feel?", "Scared", ["Happy", "Sleepy"], "😨"],
      ["When you are happy, your mouth makes a...", "smile", ["frown", "yawn"]],
      ["When you are sad, your mouth turns...", "down", ["up", "into a smile"]]
    ], ["Look at the eyes and the mouth.", "Smiles are happy. Frowns are sad or angry. Wide eyes mean surprise.", "Example: 😴 has closed, heavy eyes, so it's sleepy. Now look at yours."]),

    L("What do they feel?", [
      ["Feelings in stories", "📖", "Characters in stories have feelings too."],
      ["Why?", "🤔", "A reason comes first, then the feeling. A birthday party makes you feel happy."],
      ["Guess", "🧠", "Think about what happened. How would you feel?"]
    ], [
      ["Mia got a new puppy. She feels...", "happy", ["sad", "angry"], "🐶"],
      ["Leo dropped his ice cream. He feels...", "sad", ["happy", "sleepy"], "🍦"],
      ["Someone took Ava's toy. She feels...", "upset", ["happy", "sleepy"], "🧸"],
      ["Sam heard a loud BOOM! He feels...", "surprised", ["sleepy", "bored"], "💥"],
      ["Zoe stayed up very late. She feels...", "sleepy", ["excited", "angry"], "🌙"],
      ["Max got a hug from his mom. He feels...", "loved", ["angry", "sad"], "🤗"],
      ["Ivy is lost in a store. She feels...", "worried", ["happy", "silly"], "🛒"],
      ["Ben won a game. He feels...", "proud", ["sad", "sleepy"], "🏆"]
    ], ["Think about what just happened. How would you feel?", "Good things make people happy. Losing things makes people sad.", "Example: when it rains on a picnic, you might feel disappointed. Now think about yours."]),

    L("Feelings in voices", [
      ["Voices show feelings", "🗣️", "Our voices change with our feelings too."],
      ["Happy and sad", "😊 😢", "A happy voice is bright and bouncy. A sad voice is slow and quiet."],
      ["Try it", "🎤", "Say \"hello\" in a happy voice. Say it in a sad voice."]
    ], [
      ["A happy voice sounds...", "bright and bouncy", ["slow and sad", "silent"], "😊"],
      ["A sad voice sounds...", "slow and quiet", ["fast and loud", "bouncy"], "😢"],
      ["An angry voice is often...", "loud and strong", ["tiny and sleepy", "cheerful"], "😠"],
      ["A sleepy voice is...", "slow and soft", ["fast and loud", "shouting"], "😴"],
      ["A scared voice might be...", "small and shaky", ["booming", "silly"], "😨"],
      ["A surprised voice is often...", "high and quick", ["low and slow", "silent"], "😲"],
      ["A whisper is a...", "soft voice", ["loud voice", "singing voice"]],
      ["A shout is a...", "loud voice", ["quiet voice", "whisper"]]
    ], ["Think about how your voice changes when you feel that way.", "Happy is bright. Sad is slow. Angry is strong. Sleepy is soft.", "Example: a happy voice is high and bouncy. Now think about yours."]),

    L("Loud and quiet voices", [
      ["Loud voice", "📢", "A <b>loud voice</b> is strong. Use it outside or on a stage so everyone can hear you."],
      ["Quiet voice", "🤫", "A <b>quiet voice</b> is soft. Use it inside, or when someone is sleeping."],
      ["Choose", "👂", "Actors choose the right voice for the character and the place."]
    ], [
      ["Which voice for a library?", "Quiet", ["Loud", "Shouting"], "📚"],
      ["Which voice to call a friend across the playground?", "Loud", ["Whisper", "Silent"], "🏞️"],
      ["Which voice when a baby is sleeping?", "Quiet", ["Loud", "Yelling"], "👶"],
      ["Which voice for an actor on a big stage?", "Loud and clear", ["A tiny whisper", "No voice"], "🎭"],
      ["Which voice for telling a secret?", "A whisper", ["A shout", "A scream"], "🤫"],
      ["Which voice for a lion?", "Big and loud", ["Tiny", "Silent"], "🦁"],
      ["Which voice for a tiny mouse?", "Small and soft", ["Booming", "Roaring"], "🐭"],
      ["Which voice for a giant?", "Big and deep", ["Tiny", "Squeaky"], "🧌"]
    ], ["Think about where you are and who is there.", "Quiet places need quiet voices. Big places need loud voices.", "Example: in a quiet museum you use a whisper. Now think about yours."]),

    L("Fast and slow", [
      ["Fast and slow", "🐇 🐢", "You can talk or move <b>fast</b> or <b>slow</b>."],
      ["Choose", "🎭", "A rabbit moves quickly. A turtle moves slowly. Acting fast or slow tells the audience about the character."],
      ["Try it", "🚶", "Walk like a snail, then like a speedy rabbit."]
    ], [
      ["How does a turtle move?", "Slowly", ["Quickly", "Zoom"], "🐢"],
      ["How does a rabbit hop?", "Quickly", ["Slowly", "Not at all"], "🐇"],
      ["How would a sleepy sloth move?", "Very slowly", ["Very fast", "Jumping"], "🦥"],
      ["How would a race car drive?", "Fast", ["Slowly", "Backwards only"], "🏎️"],
      ["How would you walk in slow motion?", "Very slowly", ["Very fast", "Running"]],
      ["How would a hurried person walk?", "Fast", ["Slow", "Backwards"]],
      ["A tired person moves...", "slowly", ["quickly", "zig-zag"], "😴"],
      ["An excited puppy moves...", "quickly", ["slowly", "not at all"], "🐶"]
    ], ["Think about how that person or animal moves.", "Tired, heavy things move slowly. Excited, light things move fast.", "Example: a snail moves slowly. Now think about yours."]),

    L("Body shapes", [
      ["Use your body", "🧍", "Actors tell stories with their bodies, even without words."],
      ["Tall and small", "🌳 🐭", "To show a <b>tall tree</b>, stand up straight and reach up high. To show a <b>tiny mouse</b>, curl up small."],
      ["Try it", "🤸", "Can you show a wide ocean? A round ball?"]
    ], [
      ["How do you show a tall tree?", "Stand tall and reach up", ["Curl up on the floor", "Lie down flat"], "🌳"],
      ["How do you show a tiny mouse?", "Curl up small", ["Stretch tall", "Open arms wide"], "🐭"],
      ["How do you show a big ball?", "Make a big round shape with your arms", ["Make yourself flat", "Lie down"], "⚽"],
      ["How do you show a tall giraffe?", "Stretch your neck up high", ["Crouch low", "Roll up small"], "🦒"],
      ["How do you show a flower growing?", "Start small and slowly stretch up", ["Fall down", "Jump in place"], "🌷"],
      ["How do you show a rock?", "Be still and round", ["Wave your arms", "Spin fast"], "🪨"],
      ["How do you show a wide ocean?", "Spread your arms wide", ["Hug yourself small", "Sit hidden"], "🌊"],
      ["How do you show a melting snowman?", "Slowly sink down", ["Jump high", "Stand tall"], "⛄"]
    ], ["Think about the shape of the thing.", "Tall things stretch up. Small things curl up. Round things make circles.", "Example: a mountain is big and wide. Show it with your arms wide. Now think about yours."]),

    L("Move like an animal", [
      ["Animal moves", "🐸 🐍 🐦", "Actors can move like animals!"],
      ["Different ways", "🐘", "A bird flaps its arms. A frog jumps. A snake slithers. An elephant walks slowly with heavy steps."],
      ["Try it", "🎭", "Choose an animal and move like it."]
    ], [
      ["How does a bird move?", "Flaps its wings", ["Slithers", "Hops on one foot"], "🐦"],
      ["How does a frog move?", "Hops and jumps", ["Slithers", "Flies"], "🐸"],
      ["How does a snake move?", "Slithers on the ground", ["Hops", "Flaps"], "🐍"],
      ["How does an elephant walk?", "Slowly with heavy steps", ["Light and quick", "Slithering"], "🐘"],
      ["How does a fish move?", "Swims", ["Gallops", "Flaps wings"], "🐟"],
      ["How does a horse move?", "Gallops", ["Slithers", "Swims"], "🐴"],
      ["How does a kangaroo move?", "Hops with big jumps", ["Slithers", "Swims"], "🦘"],
      ["How does a butterfly move?", "Floats lightly", ["Stomps", "Digs"], "🦋"]
    ], ["Picture how the animal moves in real life.", "Heavy animals stomp. Light animals float. Snakes slide.", "Example: a bunny hops with quick small jumps. Now think about yours."]),

    L("Freeze!", [
      ["Freeze", "🧊", "In drama we play <b>freeze</b>: when the leader says \"freeze,\" you stop and stay completely still like a statue."],
      ["Stay still", "🗿", "Don't wiggle. Keep your face and body still."],
      ["Start again", "▶️", "When the leader says \"go,\" you move again."]
    ], [
      ["The leader says \"freeze!\" What do you do?", "Stop and stay still", ["Keep running", "Shout"], "🧊"],
      ["While frozen, you should...", "stay still like a statue", ["wiggle", "talk loudly"], "🗿"],
      ["When do you move again?", "When the leader says go", ["Never", "When you feel like it"]],
      ["Freeze is a game where you...", "stop moving", ["sing a song", "sleep"]],
      ["A statue is...", "very still", ["very loud", "always running"], "🗿"],
      ["If your friend wobbles while frozen, you...", "stay frozen yourself", ["laugh and shout", "knock them over"]],
      ["Who tells you when to freeze?", "The leader", ["Nobody", "The floor"]],
      ["What do you do with your face when frozen?", "Keep it still", ["Make lots of noise", "Run around"]]
    ], ["Think about being a statue.", "Freeze means stop everything and hold still.", "Example: if the leader says freeze while you are hopping, you stop mid-hop. Now think about yours."]),

    L("Let's pretend", [
      ["Pretend play", "🍦", "In drama we <b>pretend</b>. We act as if we're doing something, even with nothing in our hands."],
      ["Show it", "🎭", "To pretend to eat ice cream, hold a cone and lick it slowly with a happy face."],
      ["Use your whole body", "🙌", "Your hands, face and body all help us believe you."]
    ], [
      ["Pretend you are eating ice cream. What do you do?", "Lick a pretend cone", ["Drive a car", "Brush your hair"], "🍦"],
      ["Pretend you are brushing your teeth. What do you do?", "Move a pretend brush", ["Swim", "Climb a tree"], "🪥"],
      ["Pretend you are climbing a ladder. What do you do?", "Reach up with your hands and feet", ["Roll on the ground", "Sleep"], "🪜"],
      ["Pretend you are swimming. What do you do?", "Move your arms like swimming", ["Hop like a rabbit", "Pat your head"], "🏊"],
      ["Pretend you are blowing out birthday candles. What do you do?", "Take a breath and blow", ["Clap loudly", "Stomp"], "🎂"],
      ["Pretend you are holding a heavy box. What do you do?", "Strain a little and walk slowly", ["Skip lightly", "Hold nothing"], "📦"],
      ["Pretend you are cold. What do you do?", "Shiver and hug yourself", ["Sweat", "Dance"], "🥶"],
      ["Pretend you are throwing a ball. What do you do?", "Swing your arm", ["Wave goodbye", "Sit down"], "⚾"]
    ], ["Think about how the real thing looks.", "Use your hands and body just like you would if the object was real.", "Example: to pretend to ride a bike, you hold handlebars and pedal. Now think about yours."]),

    L("Good listeners", [
      ["Listen in drama", "👂", "Actors listen carefully to their partners and to the leader."],
      ["Look and wait", "👀", "Look at the person who is speaking. Wait until they finish."],
      ["Quiet when asked", "🤫", "When the leader raises a hand, we stop and listen."]
    ], [
      ["Your partner is talking. What do you do?", "Listen and wait", ["Talk over them", "Look away"], "👂"],
      ["The leader raises a hand. What do you do?", "Stop and look", ["Keep chatting", "Run"], "✋"],
      ["Who do you look at when someone speaks?", "The speaker", ["The ceiling", "Your shoes"]],
      ["A good listener's mouth is...", "quiet", ["loud", "full of food"]],
      ["A good listener's eyes are...", "on the speaker", ["closed", "on the floor"], "👀"],
      ["When you do not understand, you can...", "raise your hand and ask", ["shout", "give up"]],
      ["Good listeners use their...", "ears and eyes", ["feet only", "elbows"], "👂"],
      ["When your turn comes, you...", "speak clearly", ["stay silent forever", "run away"]]
    ], ["Think about how you like to be listened to.", "Good listeners look, listen and wait.", "Example: when a friend speaks, you stay quiet until they finish. Now think about yours."]),

    L("Taking turns", [
      ["Turns", "🔄", "On a stage everyone gets a turn to talk and a turn to listen."],
      ["No interrupting", "🛑", "Wait for your partner to finish before you speak."],
      ["Fair play", "🤝", "Share the best parts. Everyone gets to shine."]
    ], [
      ["Two friends want to be the king. What is fair?", "Take turns being the king", ["One always does it", "Argue loudly"], "👑"],
      ["Your friend is speaking in a scene. You...", "wait for your turn", ["talk too", "walk away"]],
      ["It is not your turn. You...", "watch and listen", ["push in", "yell"]],
      ["After your turn, you...", "step aside for a friend", ["stay in front forever", "block them"]],
      ["Taking turns is...", "fair", ["unfair", "boring only"]],
      ["Everyone in the class gets...", "a turn", ["no turn", "only some turns"]],
      ["Interrupting means...", "talking while someone else speaks", ["listening", "waiting"]],
      ["What can you say to be fair?", "You go first, then I will", ["Only me!", "Move away!"]]
    ], ["Think about how it feels to wait and to have your turn.", "Everyone deserves a turn. Wait politely.", "Example: if two kids want the same part, they can swap in the next round. Now think about yours."]),

    L("Beginning, middle, end", [
      ["Three parts", "1️⃣ 2️⃣ 3️⃣", "Every story has a <b>beginning</b>, a <b>middle</b> and an <b>end</b>."],
      ["Example", "🌱 → 🌿 → 🌸", "Beginning: a seed is planted. Middle: it grows. End: it blooms."],
      ["Order", "📖", "The parts go in order. The beginning comes first."]
    ], [
      ["A seed is planted, it grows, it blooms. What comes first?", "The seed is planted", ["It blooms", "It grows"], "🌱"],
      ["What part comes last in a story?", "The end", ["The beginning", "The middle"]],
      ["What part comes first in a story?", "The beginning", ["The end", "The middle"]],
      ["Which part is in the middle?", "The middle", ["The beginning", "The end"]],
      ["Kim wakes up. Kim eats breakfast. Kim goes to school. What is the last thing?", "Kim goes to school", ["Kim wakes up", "Kim eats breakfast"]],
      ["Which part tells how the story finishes?", "The end", ["The beginning", "The title"]],
      ["Which part tells who and where?", "The beginning", ["The end", "The cover"]],
      ["A story has how many main parts?", "3", ["1", "7"]]
    ], ["Stories go in order, like steps on a stair.", "First comes the beginning, then the middle, then the end.", "Example: First a bird builds a nest (beginning), then eggs hatch (middle), then baby birds fly (end). Now do yours."]),

    L("Characters", [
      ["Characters", "🧙 🐷 🐺", "A <b>character</b> is a person or animal in a story."],
      ["Story friends", "🐷🐷🐷", "In \"The Three Little Pigs,\" the characters are three pigs and a wolf."],
      ["Acting a character", "🎭", "An actor pretends to be a character."]
    ], [
      ["Who are the characters in \"The Three Little Pigs\"?", "Pigs and a wolf", ["Fish and a whale", "Cats and a mouse"], "🐷"],
      ["A person or animal in a story is a...", "character", ["castle", "carpet"]],
      ["In \"Goldilocks and the Three Bears\", who is Goldilocks?", "A girl", ["A bear", "A wolf"], "👧"],
      ["Who plays a character?", "An actor", ["A chair", "The sun"], "🎭"],
      ["In \"The Three Little Pigs\", who builds the houses?", "The pigs", ["The wolf", "The bears"], "🏠"],
      ["A character can be a...", "person or an animal", ["only a rock", "only a house"]],
      ["In \"Goldilocks\", how many bears are there?", "Three", ["One", "Ten"], "🐻"],
      ["In \"Little Red Riding Hood\", who wears a red hood?", "A girl", ["A wolf", "A bear"], "🧣"]
    ], ["Think of the story and who is in it.", "Characters are the people and animals the story is about.", "Example: in 'The Ugly Duckling', the duckling is a character. Now think about yours."]),

    L("Where is it?", [
      ["Setting", "🏞️", "The <b>setting</b> is where and when a story happens."],
      ["Examples", "🏖️ 🏫 🌲", "A story can happen at the beach, at school or in a forest."],
      ["Show it", "🎭", "Actors and sets show the setting. A tree can show a forest."]
    ], [
      ["Where and when a story happens is the...", "setting", ["title", "ending"]],
      ["A story with sand and waves takes place at the...", "beach", ["school", "kitchen"], "🏖️"],
      ["A story with desks and a teacher takes place at...", "school", ["the beach", "the moon"], "🏫"],
      ["A story with many trees takes place in a...", "forest", ["swimming pool", "bakery"], "🌲"],
      ["A story with cows and a barn takes place on a...", "farm", ["spaceship", "ship"], "🚜"],
      ["A story with stars and rockets takes place in...", "space", ["a kitchen", "a garden"], "🚀"],
      ["A story with a cake oven takes place in a...", "kitchen", ["forest", "desert"], "🍰"],
      ["A story with snow and sleds takes place in...", "winter", ["summer", "desert"], "🛷"]
    ], ["Look at the clues: what things are there?", "Sand = beach. Desks = school. Trees = forest.", "Example: a story with a lighthouse and boats takes place at the sea. Now do yours."]),

    L("Theater words", [
      ["At the theater", "🎭", "The <b>stage</b> is where actors perform. The <b>audience</b> watches. The <b>curtain</b> opens and closes."],
      ["Actors", "🧑‍🎤", "An <b>actor</b> plays a character."],
      ["Dress-up", "👑 🪄", "A <b>costume</b> is what an actor wears. A <b>prop</b> is something an actor holds."]
    ], [
      ["Where do actors perform?", "On the stage", ["In the audience", "In the lobby"], "🎭"],
      ["Who watches the play?", "The audience", ["The actors", "The curtain"]],
      ["What opens and closes at the front of the stage?", "The curtain", ["The costume", "The prop"]],
      ["Who plays a character?", "An actor", ["A seat", "A spotlight"]],
      ["What does an actor wear?", "A costume", ["A prop", "A curtain"], "👑"],
      ["What does an actor hold, like a magic wand?", "A prop", ["A costume", "A curtain"], "🪄"],
      ["Where do the audience members sit?", "In seats", ["On the stage", "Behind the curtain"]],
      ["What word means a play or show?", "Performance", ["Recess", "Lunch"]]
    ], ["Think of a theater: who is up front, who is watching?", "Stage = where they perform. Audience = watchers. Costume = clothes. Prop = held thing.", "Example: a crown worn by a king is a costume, and a magic wand is a prop. Now do yours."]),

    L("Costumes and props", [
      ["Costumes", "👑 🎩", "A costume helps us know who a character is."],
      ["Props", "🪄 📖", "A prop is a thing the actor holds or uses, like a wand, a book or a toy telephone."],
      ["Match", "🧙", "A wizard may wear a pointy hat and hold a wand."]
    ], [
      ["Which would a king wear?", "A crown", ["A swimsuit", "Sneakers only"], "👑"],
      ["Which prop might a pirate hold?", "A treasure map", ["A teacup", "A pillow"], "🗺️"],
      ["Which prop might a baker use?", "A rolling pin", ["A magic wand", "A hammer"], "🥖"],
      ["What would a farmer wear?", "A straw hat", ["A crown", "A diving mask"], "👒"],
      ["What prop might a doctor have?", "A toy stethoscope", ["A rake", "A football"], "🩺"],
      ["What would a firefighter wear?", "A helmet", ["A tiara", "A bathrobe"], "⛑️"],
      ["Which is a prop?", "A pretend telephone", ["A stage", "An audience"], "📞"],
      ["Which is a costume?", "A cat hat with ears", ["A paintbrush", "A broom"], "🐱"]
    ], ["Think about what that person uses or wears in real life.", "Costume = worn. Prop = held or used.", "Example: a witch wears a pointy hat (costume) and holds a broom (prop). Now do yours."]),

    L("Being an audience", [
      ["Audience manners", "👏", "A good audience is quiet and kind."],
      ["How to watch", "👀", "Sit still, watch and listen. Laugh when it's funny, but don't talk over the actors."],
      ["Clap", "🙌", "When the show ends, clap to say thank you."]
    ], [
      ["During a play, a good audience...", "watches quietly", ["talks loudly", "runs around"], "🎭"],
      ["When the play ends, you...", "clap", ["boo", "leave quietly without a thank you"], "👏"],
      ["A funny part makes you...", "laugh kindly", ["laugh at a mistake", "shout"]],
      ["If you need to talk, you...", "wait until after the show", ["talk during the show", "shout"]],
      ["Who is the audience?", "The people watching", ["The people acting", "The curtain"]],
      ["How do you show you liked the play?", "Clap and smile", ["Yell mean words", "Walk away mid-show"]],
      ["You see a friend on stage. You...", "wave later, not during", ["shout their name", "go on stage"]],
      ["Where should your eyes be?", "On the stage", ["On the ceiling", "On your lap"]]
    ], ["Think about how you want people to act when you perform.", "Quiet watching and polite clapping make a good audience.", "Example: when the lights dim, a good audience gets quiet. Now think about yours."]),

    L("Calm and brave", [
      ["Nervous is normal", "😬", "Many people get butterflies in their tummies before a show. Even actors do!"],
      ["Breathe", "🌬️", "Take a slow breath in through your nose and out through your mouth."],
      ["Smile and try", "😊", "A smile helps you relax. Remember that the audience wants you to do well."]
    ], [
      ["Feeling nervous before a show is...", "normal", ["bad", "a big problem"], "😬"],
      ["What can help you calm down?", "Take slow deep breaths", ["Hold your breath", "Run away"], "🌬️"],
      ["What helps you relax your face?", "A smile", ["A frown", "A scream"], "😊"],
      ["The audience wants you to...", "do well", ["fail", "go away"]],
      ["What helps before a show?", "Practice", ["Not trying", "Hiding"]],
      ["If you forget a line, you can...", "take a breath and keep going", ["run off", "cry and stop"]],
      ["Butterflies in your tummy mean you feel...", "nervous", ["hungry only", "sleepy only"], "🦋"],
      ["Who can you talk to if you feel nervous?", "A teacher or friend", ["No one", "A stranger"]]
    ], ["Everyone feels nervous sometimes. What helps your body relax?", "Slow breaths and a smile help. Practicing helps too.", "Example: before you speak, breathe in 3 seconds and out 3 seconds. Now think about yours."])
  ];
  l1.push(
    MIX("Mixed practice", l1[0], l1[2], l1[5], l1[11]),
    MIX("Level 1 Challenge", l1[1], l1[3], l1[6], l1[12], l1[14], l1[15])
  );

  // ======================= LEVEL 2 =======================
  const l2 = [
    L("More feelings", [
      ["Feeling words", "🤩 😌 😬", "There are many feeling words: <b>excited, calm, nervous, proud, shy, silly, lonely</b>."],
      ["Why we feel", "💭", "Events cause feelings. Winning a game can make you feel proud."],
      ["Actors", "🎭", "Actors show a feeling so the audience can understand the character."]
    ], [
      ["You won a prize. You feel...", "proud", ["lonely", "sleepy"], "🏆"],
      ["You are about to go on stage. You might feel...", "nervous", ["sleepy", "silly only"], "🎭"],
      ["It is the last day before a big trip. You feel...", "excited", ["bored", "sad"], "🧳"],
      ["You are sitting alone with no one to play with. You feel...", "lonely", ["proud", "excited"]],
      ["You are lying down quietly with soft music. You feel...", "calm", ["angry", "scared"], "😌"],
      ["You are meeting new kids for the first time. You might feel...", "shy", ["angry", "sleepy"]],
      ["You are making silly faces with a friend. You feel...", "silly", ["lonely", "sad"], "🤪"],
      ["You lost your balloon. You feel...", "disappointed", ["proud", "excited"], "🎈"]
    ], ["Think about what you would feel in that moment.", "Good things bring happy feelings. Hard or lonely things bring sad ones.", "Example: getting a hug makes you feel loved. Now think about yours."]),

    L("Act the feeling", [
      ["Show it", "🎭", "To show a feeling you can use your <b>face</b>, <b>voice</b> and <b>body</b> together."],
      ["Sad", "😢", "For sad: frown, slump your shoulders, speak softly and slowly."],
      ["Excited", "🤩", "For excited: big smile, wide eyes, bouncy body, fast and bright voice."]
    ], [
      ["To act sad, you might...", "slump your shoulders and speak softly", ["jump and shout", "stand tall and laugh"], "😢"],
      ["To act excited, you might...", "bounce and speak brightly", ["curl up quietly", "slump"], "🤩"],
      ["To act angry, you might...", "frown and cross your arms", ["smile and skip", "yawn"], "😠"],
      ["To act sleepy, you might...", "yawn and move slowly", ["jump high", "run fast"], "😴"],
      ["To act proud, you might...", "stand tall with a big smile", ["hide your face", "slump"], "🏆"],
      ["To act scared, you might...", "step back with wide eyes", ["clap and cheer", "yawn"], "😨"],
      ["To act surprised, you might...", "gasp with wide eyes", ["yawn", "snore"], "😲"],
      ["To act shy, you might...", "look down and speak quietly", ["shout loudly", "dance wildly"]]
    ], ["Use your face, voice and body together.", "Think of how the feeling shows on the outside.", "Example: to act cold, you shiver and hug yourself. Now act yours."]),

    L("Voice tricks", [
      ["Volume", "🔊", "Your voice can be loud, quiet or a whisper."],
      ["Speed", "⏩", "It can be fast or slow."],
      ["Pitch", "🎵", "It can be high or low."]
    ], [
      ["A mouse might talk in a voice that is...", "high and small", ["low and booming", "silent"], "🐭"],
      ["A giant might talk in a voice that is...", "low and loud", ["tiny and squeaky", "silent"], "🧌"],
      ["A very sleepy character talks...", "slowly", ["quickly", "fast and loud"], "😴"],
      ["A hurried character talks...", "fast", ["slowly", "in a whisper only"], "🏃"],
      ["A secret is told in a...", "whisper", ["shout", "scream"], "🤫"],
      ["An excited character may talk...", "fast and high", ["slow and low", "silent"], "🤩"],
      ["A grumpy bear might talk...", "low and grumbly", ["high and tiny", "squeaky"], "🐻"],
      ["A fairy might talk in a voice that is...", "light and soft", ["booming", "grumbling"], "🧚"]
    ], ["Think about the size and mood of the character.", "Big and strong = low and loud. Small and light = high and soft.", "Example: a baby bird peeps in a tiny high voice. Now think about yours."]),

    L("Character voices", [
      ["Voices for characters", "🎤", "Actors use different voices for different characters."],
      ["Examples", "🧌 🐭 🐸", "A giant has a booming voice. A mouse has a squeaky voice. A frog may croak."],
      ["Try it", "🎭", "Say \"hello\" like a giant. Then like a mouse."]
    ], [
      ["Which voice fits a big bear?", "Deep and slow", ["Tiny and squeaky", "Squeaky and fast"], "🐻"],
      ["Which voice fits a tiny kitten?", "Soft and high", ["Deep and booming", "Roaring"], "🐱"],
      ["Which voice fits a grumpy troll?", "Rough and low", ["Bright and sparkly", "Squeaky"], "🧌"],
      ["Which voice fits a sparkling fairy?", "Light and tinkly", ["Heavy and rough", "Booming"], "🧚"],
      ["Which voice fits a sleepy cat?", "Slow and soft", ["Fast and loud", "Shouting"], "😸"],
      ["Which voice fits a proud king?", "Strong and slow", ["Giggly and fast", "Tiny"], "👑"],
      ["Which voice fits a silly clown?", "Bouncy and funny", ["Slow and flat", "Silent"], "🤡"],
      ["Which voice fits a robot?", "Flat and steady", ["Bouncy and giggly", "Loud and sloppy"], "🤖"]
    ], ["Think about how big, old, kind or silly the character is.", "Big things sound low. Light things sound high. Match the voice to the mood.", "Example: a bumblebee might buzz in a fast, high voice. Now think about yours."]),

    L("Body language", [
      ["Say it with your body", "🙌", "Your body can say things without words. This is <b>body language</b>."],
      ["Examples", "😞 💪 🙅", "Slumped shoulders show sad. A tall chest shows proud. Crossed arms and a frown show grumpy."],
      ["Waving", "👋", "A wave says hello or goodbye."]
    ], [
      ["Slumped shoulders and a hanging head show...", "sad", ["proud", "excited"], "😞"],
      ["Standing tall with your chest out shows...", "proud", ["sad", "shy"], "💪"],
      ["Crossed arms and a frown show...", "grumpy", ["happy", "silly"], "🙅"],
      ["A big wave shows...", "hello or goodbye", ["angry", "hungry"], "👋"],
      ["Jumping up and down shows...", "excitement", ["sleepiness", "sadness"]],
      ["Hiding behind your hands can show...", "shyness", ["boldness", "pride"]],
      ["Pointing shows you are...", "showing something", ["sleeping", "crying"], "👉"],
      ["A shrug can mean...", "I do not know", ["I am angry", "I am sleeping"], "🤷"]
    ], ["Think about how bodies look when people feel that way.", "Open and tall = confident. Small and slumped = sad or shy.", "Example: a thumbs up means 'good job'. Now think about yours."]),

    L("Heavy and light", [
      ["Heavy moves", "🐘", "To move <b>heavy</b>, take slow, strong steps. Plant your feet down."],
      ["Light moves", "🪶", "To move <b>light</b>, tiptoe or float. Keep your arms gentle."],
      ["Try it", "🎭", "Walk like a giant, then walk like a feather."]
    ], [
      ["How would an elephant walk?", "Heavy and slow", ["Light and floaty", "Tiptoe"], "🐘"],
      ["How would a feather move?", "Light and floaty", ["Heavy", "Stomping"], "🪶"],
      ["How would you carry a heavy box?", "With strong, slow steps", ["Skipping", "Tiptoe"], "📦"],
      ["How would a fairy move?", "Light and quick", ["Heavy and stomping", "Heavy and slow"], "🧚"],
      ["How would a dinosaur move?", "Heavy with big steps", ["Floating", "Tiptoeing"], "🦖"],
      ["How would a butterfly move?", "Light and floating", ["Stomping", "Marching"], "🦋"],
      ["How would a giant robot walk?", "Heavy and stiff", ["Light and quick", "Floating"], "🤖"],
      ["How would a ballerina move?", "Light and graceful", ["Stomping", "Dragging"], "🩰"]
    ], ["Picture the weight of the thing.", "Heavy = slow, strong, stomping. Light = floating, tiptoe.", "Example: a snowflake floats gently. A bear stomps. Now think about yours."]),

    L("Mirror game", [
      ["Mirror game", "🪞", "In the mirror game, two people face each other. One <b>leads</b> and the other copies, like a mirror."],
      ["Move slowly", "🐢", "Go slowly so your partner can follow."],
      ["Trade", "🔄", "After a while, switch who leads."]
    ], [
      ["In the mirror game, the follower...", "copies the leader", ["does the opposite", "closes their eyes"], "🪞"],
      ["How should the leader move?", "Slowly", ["Super fast", "Jerky"]],
      ["Who looks at whom?", "Partners look at each other", ["They look away", "They face a wall"]],
      ["After a while, you can...", "switch who leads", ["quit", "yell"]],
      ["A mirror shows...", "a copy of you", ["a different person", "nothing"], "🪞"],
      ["If the leader waves, the follower...", "waves too", ["sits down", "spins"]],
      ["The mirror game helps you practice...", "watching and following", ["shouting", "sleeping"]],
      ["In the game, the follower should keep their eyes on...", "the leader", ["the floor", "the door"]]
    ], ["Think about what a mirror does.", "A mirror copies you exactly. The follower copies the leader.", "Example: if the leader raises her right hand, the follower raises his left (it looks like a mirror). Now think about yours."]),

    L("Act without words", [
      ["Mime", "🤐", "<b>Mime</b> means acting without talking."],
      ["Use your body", "🙌", "Use your hands, face and body to show what you are doing."],
      ["Guess", "🤔", "The audience guesses what the actor is doing."]
    ], [
      ["Mime means acting...", "without words", ["with songs", "while asleep"], "🤐"],
      ["How would you mime eating soup?", "Lift a pretend spoon to your mouth", ["Wave a flag", "Jump rope"], "🥣"],
      ["How would you mime riding a bike?", "Hold handlebars and pedal", ["Lick an ice cream", "Sleep"], "🚲"],
      ["How would you mime opening a door?", "Turn a pretend knob and pull", ["Throw a ball", "Hug yourself"], "🚪"],
      ["How would you mime playing the drums?", "Hit pretend drums", ["Climb a ladder", "Swim"], "🥁"],
      ["How would you mime reading a book?", "Hold pretend pages and look down", ["Throw a ball", "Dig a hole"], "📖"],
      ["How would you mime pulling a rope?", "Pull hand over hand", ["Wave goodbye", "Sleep"]],
      ["How would you mime blowing bubbles?", "Puff softly and watch them float", ["Stomp", "Hop"], "🫧"]
    ], ["Picture the real action and what your hands do.", "Show the object with your hands. Use your face too.", "Example: to mime brushing hair, hold a pretend brush and sweep it down. Now do yours."]),

    L("Story order", [
      ["Order matters", "1️⃣ 2️⃣ 3️⃣", "A story's events go in order: beginning, middle and end."],
      ["Clue words", "first · next · then · last", "Words like <b>first</b>, <b>next</b>, <b>then</b> and <b>last</b> help us put events in order."],
      ["Retell", "🗣️", "Retell the story using these words."]
    ], [
      ["A seed was planted. It grew. Then it bloomed. What happened last?", "It bloomed", ["It was planted", "It grew"], "🌸"],
      ["Mia put on shoes, then went outside. What happened first?", "She put on shoes", ["She went outside", "She slept"]],
      ["Which word means the very first thing?", "First", ["Last", "Then"]],
      ["Which word means the final thing?", "Last", ["First", "Next"]],
      ["Sam mixed batter, baked a cake, then ate it. What happened in the middle?", "He baked the cake", ["He mixed batter only", "He ate it"], "🎂"],
      ["Which word shows what comes after something?", "Then", ["First", "Never"]],
      ["Leo saw rain, got his umbrella, and went out. What is the beginning?", "He saw rain", ["He went out", "He got his umbrella"], "🌧️"],
      ["The kitten woke up, stretched, and ate. What came first?", "It woke up", ["It ate", "It stretched"], "🐱"]
    ], ["Think of the story from start to finish.", "First = beginning. Then/next = middle. Last = end.", "Example: First a bird laid an egg. Then it hatched. Last the chick flew. Now do yours."]),

    L("Problem and fix", [
      ["Problem", "😟", "Most stories have a <b>problem</b>: something that goes wrong."],
      ["Solution", "💡", "The <b>solution</b> is how the problem is fixed."],
      ["In plays", "🎭", "Actors show the problem and how the characters solve it."]
    ], [
      ["Lola lost her mitten. What solves the problem?", "She finds it", ["She loses another", "She cries forever"], "🧤"],
      ["A kite is stuck in a tree. What solves it?", "Ask a grown-up to help", ["Climb alone high", "Leave it forever"], "🪁"],
      ["A friend feels left out. What solves it?", "Invite them to play", ["Ignore them", "Tease them"]],
      ["What is a problem?", "Something that goes wrong", ["Something that goes right", "A prize"]],
      ["What is a solution?", "How a problem is fixed", ["A new problem", "A song"]],
      ["The cake fell on the floor. What can the baker do?", "Bake a new one", ["Hide it", "Eat it off the floor"], "🎂"],
      ["Two kids want one swing. A fair solution is to...", "take turns", ["fight", "break it"]],
      ["The pig's house of straw blew down. A smarter plan is to...", "build with bricks", ["use more straw", "do nothing"], "🧱"]
    ], ["Find what went wrong first. Then think about how to fix it.", "A good solution is kind, fair and helpful.", "Example: a spilled drink is fixed by wiping it up. Now do yours."]),

    L("What do they want?", [
      ["Wants", "💭", "Characters want things. A character might want a friend, a treat or to go home."],
      ["Wants drive stories", "🎬", "What the character wants makes the story move."],
      ["Ask", "🤔", "Ask: What does this character want?"]
    ], [
      ["A hungry bear wants...", "food", ["a bath", "a nap only"], "🐻"],
      ["A lost duckling wants...", "to find its mother", ["to fly away", "to swim away from home"], "🦆"],
      ["A lonely child wants...", "a friend", ["a storm", "a rock"], "🧒"],
      ["A sleepy kitten wants...", "a nap", ["to run a race", "a bath"], "😺"],
      ["A cold snowman wants...", "to stay cool", ["a hot bath", "a campfire"], "⛄"],
      ["A thirsty puppy wants...", "water", ["a hat", "a book"], "🐶"],
      ["A bird that can't fly wants...", "to learn to fly", ["to sleep", "to eat sand"], "🐦"],
      ["A shy bunny wants...", "to make a friend", ["to hide forever", "to roar"], "🐰"]
    ], ["Think about what the character needs or feels.", "Hungry → food. Lost → home. Lonely → friend.", "Example: a thirsty horse wants water. Now do yours."]),

    L("Time and place", [
      ["When", "🌅 🌙", "A <b>setting</b> includes <b>when</b> (morning, night, winter) and <b>where</b>."],
      ["Show the time", "💡", "Lights and sounds can show morning or night."],
      ["Show the place", "🏞️", "A background painting or a few props can show the place."]
    ], [
      ["Birds singing and a bright sun show...", "morning", ["midnight", "a storm"], "🌅"],
      ["Stars and a moon show...", "night", ["noon", "morning"], "🌙"],
      ["Snow and scarves show...", "winter", ["summer", "spring only"], "❄️"],
      ["Sand, shells and waves show the...", "beach", ["kitchen", "attic"], "🏖️"],
      ["Falling leaves and pumpkins show...", "fall", ["spring", "summer"], "🍂"],
      ["Flowers popping up and baby birds show...", "spring", ["winter", "fall"], "🌷"],
      ["Sunscreen and swimsuits show...", "summer", ["winter", "fall"], "🏊"],
      ["Rain and thunder show...", "a storm", ["a sunny picnic", "a snowman"], "⛈️"]
    ], ["Look at the clues: light, weather, objects.", "Moon = night. Snow = winter. Sand = beach.", "Example: a bright sun and a rooster tell us it's morning. Now do yours."]),

    L("Parts of the theater", [
      ["Backstage and front", "🎭", "The <b>stage</b> is where actors perform. <b>Backstage</b> is the area behind the stage where actors wait."],
      ["Lights", "💡", "A <b>spotlight</b> shines on one actor. The <b>curtain</b> hides the stage."],
      ["Seats", "💺", "The audience sits in <b>seats</b> in front of the stage."]
    ], [
      ["The area behind the stage is called...", "backstage", ["front row", "lobby"]],
      ["A light that shines on one actor is a...", "spotlight", ["moon", "flashlight tag"], "🔦"],
      ["What hides the stage until the show starts?", "The curtain", ["The seats", "The spotlight"]],
      ["Where does the audience sit?", "In the seats", ["On the stage", "Backstage"], "💺"],
      ["Actors wait for their turn...", "backstage", ["in the seats", "on the roof"]],
      ["The place for the performance is the...", "stage", ["lobby", "parking lot"]],
      ["What lights up the stage?", "Stage lights", ["Street lamps", "Candles only"], "💡"],
      ["The curtain opens when the show...", "begins", ["is over only", "is cancelled"]]
    ], ["Picture a theater from the audience's seat.", "Front: stage and seats. Behind: backstage.", "Example: the actors' costumes are kept backstage. Now do yours."]),

    L("Theater jobs", [
      ["People in a play", "🧑‍🎤", "<b>Actors</b> play the characters. The <b>director</b> tells everyone how to act and where to move."],
      ["Helpers", "🧑‍🔧", "A <b>costume designer</b> makes the costumes. A <b>stage crew</b> moves props and sets."],
      ["Lights and sound", "💡 🎵", "A <b>lighting person</b> controls the lights, and a <b>sound person</b> plays the music."]
    ], [
      ["Who tells actors where to move?", "The director", ["The audience", "The curtain"], "🎬"],
      ["Who plays the characters?", "Actors", ["Directors only", "The audience"], "🎭"],
      ["Who makes the costumes?", "The costume designer", ["The audience", "The bus driver"], "🧵"],
      ["Who controls the lights?", "A lighting person", ["An actor", "A baker"], "💡"],
      ["Who moves props and sets?", "The stage crew", ["The audience", "A baker"]],
      ["Who plays the music?", "A sound person or musician", ["A costume", "The curtain"], "🎵"],
      ["A play needs how many kinds of helpers?", "Many", ["None", "Only one ever"]],
      ["Who watches the show?", "The audience", ["The director only", "The stage crew only"]]
    ], ["Think about who does which job.", "Director guides, actors perform, crew helps, audience watches.", "Example: the person who sews costumes is the costume designer. Now do yours."]),

    L("Match the costume", [
      ["Costumes and props", "👑 🪄 🍳", "Costumes and props tell us who a character is."],
      ["Examples", "🍳", "A chef wears a tall white hat and holds a spoon."],
      ["Choose", "🤔", "Think about the character. What would they wear and hold?"]
    ], [
      ["Which fits a chef?", "A tall white hat", ["A crown", "Flippers"], "🧑‍🍳"],
      ["Which fits a pirate?", "An eye patch", ["A tutu", "A chef hat"], "🏴‍☠️"],
      ["Which fits a wizard?", "A pointy hat and a wand", ["A swimsuit", "A baseball cap"], "🧙"],
      ["Which fits a doctor?", "A white coat", ["A crown", "A tutu"], "🥼"],
      ["Which fits a firefighter?", "A helmet", ["A bonnet", "A tutu"], "🚒"],
      ["Which fits a queen?", "A crown", ["A pot", "Swim flippers"], "👸"],
      ["Which fits a farmer?", "Overalls and a hat", ["A tuxedo", "A cape"], "🧑‍🌾"],
      ["Which is a fun, friendly costume?", "A bunny costume with ears", ["A frying pan", "A fire hose"], "🐰"]
    ], ["Picture the character at work.", "What do they wear and hold?", "Example: a bee costume has wings and stripes. Now do yours."]),

    L("Partner scenes", [
      ["Working together", "👫", "In a scene, partners share the stage."],
      ["Listen first", "👂", "Listen to your partner, then answer."],
      ["Help each other", "🤝", "A good partner makes the other person look good."]
    ], [
      ["Your partner finishes a line. You...", "answer with your line", ["walk away", "shout"], "👫"],
      ["Your partner forgets a line. You...", "help them gently", ["laugh", "walk off"]],
      ["In a scene, both partners should...", "share the stage", ["hog the stage", "hide"]],
      ["When your partner speaks, you...", "look at them", ["look away", "talk"]],
      ["A good partner is...", "kind and helpful", ["bossy", "grumpy"]],
      ["If you make a mistake, you can...", "keep going and smile", ["stop and cry", "run away"]],
      ["Partners should face...", "each other and the audience", ["only the wall", "only the floor"]],
      ["If a partner says something funny, you...", "laugh with them kindly", ["mock them", "ignore them"]]
    ], ["Think about teamwork.", "Listen, help, share, be kind.", "Example: if your partner misses a line, whisper it to them. Now do yours."]),

    L("Speak up", [
      ["Be heard", "📢", "On stage, speak up so the back row can hear you."],
      ["Clear words", "🗣️", "Open your mouth and say each word clearly."],
      ["Face the audience", "🎭", "Turn your face to the audience so the sound reaches them."]
    ], [
      ["Where do you face when you speak on stage?", "Toward the audience", ["Toward the back wall", "Toward the floor"], "🎭"],
      ["How should your voice be?", "Loud enough for the back row", ["A whisper", "Silent"]],
      ["To be clear, you should...", "open your mouth wide", ["mumble", "cover your mouth"], "🗣️"],
      ["If the audience cannot hear you, you should...", "speak louder", ["speak softer", "stop speaking"]],
      ["Speaking slowly helps people...", "understand you", ["miss your words", "fall asleep only"]],
      ["Which is clearer?", "Saying each word carefully", ["Mumbling fast", "Whispering fast"]],
      ["Standing up straight helps your voice...", "carry", ["disappear", "get quieter"], "🧍"],
      ["Projecting your voice means...", "making it reach the back", ["whispering", "singing a lullaby"]]
    ], ["Think about the person sitting far away.", "Face the audience, stand tall, speak clearly.", "Example: to be heard, take a breath and project to the back row. Now do yours."]),

    L("Great audience", [
      ["Kind audience", "👏", "A great audience watches, listens and claps."],
      ["Laugh kindly", "😂", "Laugh at funny parts but never at a mistake."],
      ["Say thanks", "🙏", "After the show, say \"Good job!\""]
    ], [
      ["At a puppet show, you...", "watch quietly", ["talk the whole time", "shout at the puppets"], "🎭"],
      ["After the show, you can say...", "Good job!", ["That was bad", "Boring!"]],
      ["An actor forgets a line. You...", "stay kind and wait", ["laugh at them", "boo"]],
      ["You clap to say...", "thank you", ["go away", "be quiet"], "👏"],
      ["A great audience member...", "stays in their seat", ["wanders", "climbs on stage"]],
      ["If you need the bathroom, you...", "quietly leave and return", ["shout", "run on stage"]],
      ["Which helps the actors?", "Quiet attention", ["Loud talking", "Throwing things"]],
      ["You liked the show. You can...", "clap and smile", ["frown", "yawn loudly"]]
    ], ["Be the kind of audience you want.", "Quiet, kind, clapping at the end.", "Example: during the show you stay quiet, and at the end you clap. Now do yours."])
  ];
  l2.push(
    MIX("Mixed practice", l2[0], l2[2], l2[7], l2[12]),
    MIX("Level 2 Challenge", l2[1], l2[4], l2[8], l2[9], l2[13], l2[16])
  );

  // ======================= LEVEL 3 =======================
  const l3 = [
    F("Who says it?", [
      ["A script", "📜", "A <b>script</b> is the written words of a play. It shows who says each line."],
      ["Names first", "MIA: Hello!", "A character's name comes first, then a colon, then the words they say."],
      ["Find the speaker", "🔍", "To find who says a line, look at the name before it."]
    ], whoSays),

    L("Reading a script", [
      ["Script format", "📜", "A script shows <b>NAME:</b> then the line. Each character has their own name."],
      ["Stage directions", "(smiles)", "Words in (parentheses) are <b>stage directions</b>. They tell you what to DO, not what to say."],
      ["Read aloud", "🗣️", "Read the line aloud with feeling, and do the action."]
    ], [
      ["In a script, the name before the colon tells you...", "who is speaking", ["what time it is", "the weather"], "📜"],
      ["Words in (parentheses) are...", "stage directions", ["lines to say aloud", "the title"]],
      ["(jumps up) means you...", "jump up", ["say 'jumps up'", "go to sleep"]],
      ["If a script says (whispers), you...", "whisper the line", ["shout", "stay silent for the whole play"]],
      ["Do you say the stage direction out loud?", "No", ["Yes", "Always"]],
      ["A script is...", "the written words of a play", ["a stage", "a costume"], "📜"],
      ["Who reads the lines for a character?", "The actor", ["The audience", "The curtain"]],
      ["MAX: (waves) Hello! — what do you do?", "Wave and say Hello", ["Only wave", "Say 'waves'"]]
    ], ["Look at how the script is written.", "Names tell who speaks. (Parentheses) tell what to do.", "Example: 'KIM: (laughs) That is funny!' means laugh, then say 'That is funny!' Now do yours."]),

    L("Stage directions", [
      ["Directions", "🧭", "Stage directions tell actors how to move and speak."],
      ["Examples", "(sits) (runs to the door) (sadly)", "(sits) means sit down. (sadly) means say it in a sad way."],
      ["Do them", "🎭", "Read them, then act them out."]
    ], [
      ["(sadly) tells you how to...", "say the line", ["leave the room", "turn off the lights"]],
      ["(runs to the door) tells you to...", "run to the door", ["say 'run'", "sit"]],
      ["(whispers) tells you to...", "speak softly", ["shout", "dance"]],
      ["(yawns) tells you to...", "yawn", ["shout", "clap"], "🥱"],
      ["(claps) tells you to...", "clap", ["sleep", "whisper"], "👏"],
      ["(shouts) tells you to...", "speak very loudly", ["whisper", "sing softly"]],
      ["(sits on a chair) means you...", "sit down", ["jump up", "fly"], "🪑"],
      ["(happily) tells you to speak...", "in a happy way", ["in a sad way", "very slowly and sadly"]]
    ], ["Think about what the word in parentheses is asking you to do.", "Directions are things to do, not to say.", "Example: (stomps) means stomp your feet. Now do yours."]),

    L("Stage left and right", [
      ["Stage spots", "🎭", "Actors use special words for places on the stage. Center is the middle."],
      ["Left and right", "⬅️ ➡️", "<b>Stage left</b> is the actor's left side when facing the audience. <b>Stage right</b> is the actor's right side."],
      ["Front and back", "⬇️ ⬆️", "<b>Downstage</b> is closer to the audience. <b>Upstage</b> is farther back."]
    ], [
      ["The middle of the stage is...", "center stage", ["stage left", "downstage only"]],
      ["Actors facing the audience point to their left hand. That side is...", "stage left", ["stage right", "upstage"]],
      ["Actors facing the audience point to their right hand. That side is...", "stage right", ["stage left", "downstage"]],
      ["The part of the stage closest to the audience is...", "downstage", ["upstage", "backstage"]],
      ["The part of the stage farthest from the audience is...", "upstage", ["downstage", "center"]],
      ["Walk to the middle of the stage. You go to...", "center stage", ["stage left", "upstage right corner only"]],
      ["Stage right and stage left are named from the...", "actor's point of view", ["audience's point of view", "ceiling"]],
      ["To get closer to the audience, you move...", "downstage", ["upstage", "backstage"]]
    ], ["Stage directions use the actor's own left and right.", "Stage left = actor's left (facing the audience). Downstage = near audience.", "Example: an actor steps to their right and goes stage right. Now do yours."]),

    L("Rehearsal", [
      ["Practice", "🔁", "A <b>rehearsal</b> is practice before a show."],
      ["Learn lines", "📜", "Actors learn their lines by reading them again and again."],
      ["Try again", "🌱", "Mistakes in rehearsal are fine. That is how we get better!"]
    ], [
      ["Practice before a show is called...", "rehearsal", ["recess", "dinner"], "🔁"],
      ["How can you learn your lines?", "Read them many times", ["Skip rehearsals", "Never look at them"], "📜"],
      ["Mistakes in rehearsal are...", "okay", ["terrible", "forbidden"]],
      ["Why do actors rehearse?", "To get ready for the show", ["To waste time", "To avoid acting"]],
      ["During a rehearsal, you should...", "listen to the director", ["talk the whole time", "run around"]],
      ["Is it okay to ask for help with your lines?", "Yes", ["No", "Never"]],
      ["Rehearsals happen...", "before the show", ["after the show", "never"]],
      ["Saying your lines out loud many times helps you...", "remember them", ["forget them", "lose your voice"]]
    ], ["Think about practicing a sport or an instrument.", "Practice makes the show better.", "Example: before a concert, a band rehearses its songs. Now do yours."]),

    L("Plot order", [
      ["Story steps", "1️⃣ 2️⃣ 3️⃣", "A plot is the order of events in a story."],
      ["Beginning", "🌱", "At the beginning we meet the characters and the setting."],
      ["Middle and end", "⚡ → 😊", "In the middle there is a problem. At the end it is solved."]
    ], [
      ["Where do we meet the characters?", "At the beginning", ["At the end", "Never"]],
      ["Where does the problem usually happen?", "In the middle", ["Before the title", "After the end"]],
      ["Where is the problem solved?", "At the end", ["At the beginning", "Before the story"]],
      ["The order of events in a story is the...", "plot", ["pot", "plug"]],
      ["Mia finds a lost kitten (problem). She takes it home (solution). Where is the solution?", "Near the end", ["At the very start", "Before the kitten"], "🐱"],
      ["Leo's balloon floats away. A friend lends him one. What is the problem?", "His balloon floated away", ["A friend lent him one", "He is happy"], "🎈"],
      ["A snowman melts in the sun. Kids build a new one. What is the solution?", "They build a new one", ["The sun shines", "The snowman melts"], "⛄"],
      ["A story has a beginning, middle and...", "end", ["lunch", "nap"]]
    ], ["Think about the parts of a story in order.", "Beginning: meet the characters. Middle: a problem. End: solved.", "Example: a bear can't find honey (problem) then finds a beehive (solution). Now do yours."]),

    L("Changing feelings", [
      ["Feelings change", "😢 → 😊", "A character's feelings can change during a story."],
      ["Why they change", "💡", "Something happens, and the character feels differently."],
      ["Show the change", "🎭", "Actors show the change with face, voice and body."]
    ], [
      ["Mia is sad. Her friend gives her a hug. Now she feels...", "better", ["worse", "sleepy"], "🤗"],
      ["Sam is nervous. He finishes his show well. Now he feels...", "proud", ["worried", "angry"], "🏆"],
      ["Zoe is angry. She takes a deep breath. She starts to feel...", "calmer", ["angrier", "silly"], "🌬️"],
      ["Leo is bored. A friend invites him to play. He feels...", "excited", ["bored", "angry"]],
      ["Ivy is worried. Her lost dog comes home. She feels...", "relieved and happy", ["more worried", "angry"], "🐶"],
      ["Max is lonely. He makes a new friend. He feels...", "happier", ["lonelier", "sleepy"], "🤝"],
      ["Ava is scared of the dark. A night-light helps. She feels...", "safer", ["more scared", "angry"], "💡"],
      ["Ben is shy. His class cheers for him. He feels...", "braver", ["shyer", "hungry"], "👏"]
    ], ["What happened to change the character's feeling?", "Kind things and good news make feelings better.", "Example: a cold child gets a warm blanket and feels cozy. Now do yours."]),

    L("Voice and punctuation", [
      ["Marks tell us how", "! ? .", "Punctuation tells actors how to say a line."],
      ["Excited and asking", "Wow! / Really?", "An exclamation mark (!) means say it with excitement. A question mark (?) means your voice goes up at the end."],
      ["A period", ".", "A period (.) means say it calmly and stop."]
    ], [
      ["\"Hooray!\" should be said...", "with excitement", ["in a whisper", "in a sleepy voice"]],
      ["\"Are you coming?\" has a voice that goes...", "up at the end", ["down at the end", "silent"]],
      ["\"I am going home.\" is said...", "calmly", ["very excited", "with a question"]],
      ["The mark ! means...", "excited or strong", ["a question", "a stop"]],
      ["The mark ? means...", "a question", ["excitement", "the end of everything"]],
      ["\"Look out!\" is said...", "loud and urgent", ["slowly and softly", "in a lullaby voice"]],
      ["\"Shh.\" is said...", "softly", ["loudly", "with a shout"]],
      ["\"What was that?\" is said...", "with a rising voice", ["with a falling flat voice", "in a deep growl"]]
    ], ["Look at the punctuation mark at the end.", "! = excited or strong. ? = voice goes up. . = calm.", "Example: 'Yay!' is shouted with joy. Now do yours."]),

    L("Puppets", [
      ["Puppets", "🧸", "A <b>puppet</b> is a toy that an actor moves to tell a story."],
      ["Types", "🧦 🖐️", "A <b>hand puppet</b> fits over your hand. A <b>finger puppet</b> fits on a finger. A <b>stick puppet</b> is on a stick. A <b>sock puppet</b> is made from a sock."],
      ["Make a voice", "🎤", "Give the puppet a voice that fits it."]
    ], [
      ["A puppet made from a sock is a...", "sock puppet", ["finger puppet", "stick puppet"], "🧦"],
      ["A puppet that goes on one finger is a...", "finger puppet", ["hand puppet", "sock puppet"]],
      ["A puppet on a stick is a...", "stick puppet", ["hand puppet", "finger puppet"]],
      ["A puppet that fits over your hand is a...", "hand puppet", ["finger puppet", "stick puppet"], "🖐️"],
      ["What does an actor do with a puppet?", "Moves it and gives it a voice", ["Hides it", "Eats it"]],
      ["A puppet show needs a...", "story", ["bathtub", "boat"]],
      ["Where do puppeteers often stand?", "Behind a screen or stage", ["In the audience only", "On the roof"], "🎭"],
      ["Which puppet would be quickest to make from an old clean sock?", "Sock puppet", ["Stick puppet", "Finger puppet"]]
    ], ["Think about how each puppet is held or worn.", "Hand puppets fit on hands, finger puppets on fingers, stick puppets on sticks.", "Example: a puppet on a wooden spoon is a stick puppet. Now do yours."]),

    L("Puppet moves", [
      ["Moving puppets", "🧸", "When your puppet speaks, move it a little. When it listens, keep it still."],
      ["Face the audience", "👀", "Turn the puppet toward the audience, or toward the puppet it talks to."],
      ["Give it a character", "🎭", "Make the puppet walk, hop or wave in its own way."]
    ], [
      ["When your puppet is talking, you...", "move it a little", ["hold it still", "put it down"]],
      ["When your puppet is listening, you...", "keep it still", ["shake it hard", "throw it"]],
      ["Where should the puppet face?", "Toward the audience", ["Away", "The floor"]],
      ["A hopping bunny puppet...", "hops up and down", ["slides flat", "stays frozen"], "🐰"],
      ["A sleepy puppet moves...", "slowly", ["fast", "jumping"]],
      ["A happy puppet can...", "bounce and wave", ["lie still", "turn away"]],
      ["Two puppets in a scene should...", "take turns talking", ["talk at once", "never talk"]],
      ["To make a puppet look scared, you can...", "make it shake and step back", ["make it dance", "make it clap"]]
    ], ["Think about how a real animal or person would move.", "Move the speaker, freeze the listener.", "Example: a puppet that hears a loud noise jumps back. Now do yours."]),

    L("Shadows", [
      ["Shadows", "🌑", "A <b>shadow</b> is made when something blocks light."],
      ["Closer or farther", "🔦", "If you move the object <b>closer to the light</b>, the shadow gets <b>bigger</b>. Move it <b>farther</b>, and the shadow gets <b>smaller</b>."],
      ["Shadow play", "🎭", "In shadow play, shapes move between a light and a screen."]
    ], [
      ["A shadow is made when something blocks...", "light", ["sound", "smell"], "🔦"],
      ["Move a puppet closer to the light. The shadow gets...", "bigger", ["smaller", "disappears"]],
      ["Move a puppet farther from the light. The shadow gets...", "smaller", ["bigger", "louder"]],
      ["Shadow play needs a light and a...", "screen", ["bathtub", "boat"]],
      ["Which is a good light for shadow play?", "A flashlight", ["A campfire", "A candle near paper"], "🔦"],
      ["If there is no light, there is...", "no clear shadow", ["a huge shadow", "a rainbow"]],
      ["A shadow looks like...", "a dark shape", ["a bright shape", "a rainbow"]],
      ["To make a tiny shadow, hold the puppet...", "far from the light", ["right by the light", "inside the light"]]
    ], ["Think about holding your hand near and far from a flashlight.", "Closer to the light = bigger shadow. Farther = smaller.", "Example: a hand near a lamp makes a big shadow on the wall. Now do yours."]),

    L("Shadow puppets", [
      ["Make shapes", "✂️", "Cut shapes from cardboard or paper to make shadow puppets, like a bird or a tree."],
      ["The setup", "🛏️ 🔦", "Put a flashlight behind the puppets, pointing at a plain sheet. The audience sits on the other side."],
      ["Safety", "👀", "Use a flashlight, not a candle. Ask a grown-up to help with scissors."]
    ], [
      ["What can you cut shadow puppets from?", "Cardboard", ["Water", "Soap bubbles"], "✂️"],
      ["Which light is safe for shadow puppets?", "A flashlight", ["A candle", "A fire"], "🔦"],
      ["Where does the light go?", "Behind the puppets", ["In the audience's eyes", "Under the floor"]],
      ["What do the shadows show up on?", "A plain screen or sheet", ["A mirror", "A fishbowl"]],
      ["Who should help with the scissors?", "A grown-up", ["A stranger", "Nobody"]],
      ["A shadow puppet shaped like a bird shows up as a...", "dark bird shape", ["bright bird shape", "rainbow bird"], "🐦"],
      ["The audience sits...", "on the other side of the screen", ["behind the light", "in the dark kitchen"]],
      ["To be safe with a flashlight, you...", "keep it pointed at the screen", ["shine it in someone's eyes", "throw it"]]
    ], ["Think about the setup: light, puppet, screen.", "Light behind the puppet, screen in front, audience on the other side.", "Example: a flashlight shining on a paper cat makes a cat shadow on the wall. Now do yours."]),

    L("Yes, and...", [
      ["Make it up", "💡", "<b>Improvisation</b> (improv) means making up a scene as you go."],
      ["Yes, and", "🤝", "A good rule is \"<b>Yes, and...</b>\". Accept your partner's idea (\"yes\") and add to it (\"and\")."],
      ["Be kind", "😊", "Never say \"no\" to your partner's idea. Build on it!"]
    ], [
      ["Improv means making up a scene...", "as you go", ["from a script", "in your sleep"], "💡"],
      ["Your partner says \"We are at the beach!\" A good answer is...", "Yes, and the sand is so warm!", ["No, we are not.", "This is silly."], "🏖️"],
      ["The 'yes' in 'yes, and' means you...", "accept their idea", ["argue", "quit"]],
      ["The 'and' in 'yes, and' means you...", "add something new", ["say nothing", "walk away"]],
      ["Your partner says \"I'm a pirate!\" You say...", "Yes, and I'm your parrot!", ["No you're not", "Stop it"], "🏴‍☠️"],
      ["In improv, mistakes are...", "fine", ["terrible", "forbidden"]],
      ["Improv helps you practice...", "listening and creativity", ["sleeping", "complaining"]],
      ["A good improv partner is...", "kind and creative", ["bossy", "negative"]]
    ], ["Think about accepting and adding.", "Say yes to the idea and add to it.", "Example: if a friend says 'It's snowing!', you say 'Yes, and let's build a snowman!' Now do yours."]),

    L("Group scenes", [
      ["Share the stage", "👥", "In a group scene everyone should be seen and heard."],
      ["Make space", "↔️", "Spread out. Don't stand behind others."],
      ["Face out", "🎭", "Turn a little toward the audience, so they can see your face."]
    ], [
      ["In a group scene, you should...", "stand where the audience can see you", ["hide behind a friend", "turn your back"], "👥"],
      ["Everyone should...", "get a turn to speak", ["only the loudest speaks", "no one speaks"]],
      ["When you are not speaking, you...", "stay in character and listen", ["chat with a friend", "wander off"]],
      ["If someone is in front of you, you can...", "step to the side kindly", ["push them", "shout"]],
      ["Turn your body slightly toward the...", "audience", ["wall", "curtain"]],
      ["If a friend freezes, you can...", "help them quietly", ["laugh", "leave"]],
      ["A good team scene has...", "everyone working together", ["one boss", "people running away"]],
      ["After the scene, you...", "bow or smile together", ["argue", "leave one by one without a word"]]
    ], ["Think about being a team on the stage.", "Everyone should be seen and heard.", "Example: if you cannot see the audience, step to the side. Now do yours."]),

    L("Theater team", [
      ["The writer", "✍️", "A <b>playwright</b> writes the play. The <b>director</b> leads the rehearsals."],
      ["The cast and crew", "🧑‍🤝‍🧑", "The <b>cast</b> is all the actors. The <b>crew</b> works behind the scenes."],
      ["Intermission", "⏸️", "An <b>intermission</b> is a break in the middle of a long show."]
    ], [
      ["Who writes the play?", "The playwright", ["The audience", "The curtain"], "✍️"],
      ["All the actors together are the...", "cast", ["crew", "audience"]],
      ["People who work behind the scenes are the...", "crew", ["cast", "audience"]],
      ["A break in the middle of a long show is an...", "intermission", ["insertion", "illustration"]],
      ["Who leads the rehearsals?", "The director", ["The playwright only", "The curtain"], "🎬"],
      ["The people who watch are the...", "audience", ["cast", "crew"]],
      ["Who plays the characters?", "The cast", ["The crew", "The audience"]],
      ["During an intermission, the audience can...", "take a short break", ["be forced to go home", "go on stage"]]
    ], ["Think about each person's job.", "Playwright writes. Director leads. Cast acts. Crew helps behind the scenes.", "Example: the people who sew costumes are part of the crew. Now do yours."]),

    L("Staying calm on stage", [
      ["Nerves", "🦋", "Butterflies in your tummy are a normal feeling before a show."],
      ["Tools", "🌬️ 😊", "Take slow breaths. Relax your shoulders. Smile. Practice helps too."],
      ["If you forget", "🤔", "If you forget a line, take a breath and keep going. The audience will not mind!"]
    ], [
      ["What can you do right before going on stage?", "Take slow breaths", ["Hold your breath", "Run away"], "🌬️"],
      ["If you forget a line, you can...", "take a breath and keep going", ["stop and cry", "leave the stage"]],
      ["What helps your shoulders relax?", "Take a deep breath and drop them", ["Lift them up high", "Clench your fists"]],
      ["What face helps you feel braver?", "A smile", ["A frown", "A scowl"], "😊"],
      ["Who feels nervous sometimes?", "Everyone", ["No one", "Only kids"]],
      ["Practice helps you feel...", "more ready", ["more worried", "sleepy"]],
      ["It's okay to ask for...", "help", ["trouble", "a nap"]],
      ["If your friend is nervous, you can...", "say something kind", ["tease them", "ignore them"]]
    ], ["Everyone feels nervous. What helps your body relax?", "Slow breaths, a smile and practice help.", "Example: before a speech, breathe slowly three times. Now do yours."]),

    L("Audience manners", [
      ["Kind audience", "👏", "A good audience is kind, quiet and thankful."],
      ["During the show", "🤫", "Don't talk. Turn off or put away devices."],
      ["After", "🙌", "Clap loudly at the end. You can say \"Great job!\" to the actors."]
    ], [
      ["During a show, devices should be...", "turned off or put away", ["used loudly", "shared with the actors"], "📵"],
      ["During the show you...", "stay quiet", ["talk to friends", "run in the aisle"]],
      ["After the show, the actors would love to hear...", "Great job!", ["That was bad", "I am bored"]],
      ["You laugh when it is...", "funny", ["someone's mistake", "someone is sad"]],
      ["Applause means...", "clapping", ["booing", "leaving"], "👏"],
      ["If you need to cough, you...", "cover your mouth quietly", ["cough loudly on purpose", "yell"]],
      ["Standing in your seat blocks...", "other people's view", ["the sun", "the curtain"]],
      ["Which is a kind audience action?", "Smiling at the actors", ["Making faces", "Throwing paper"]]
    ], ["Think about being polite and kind.", "Quiet during the show, loud clapping after.", "Example: you whisper your thank you and clap afterwards. Now do yours."]),

    L("Safe acting", [
      ["Pretend is pretend", "🎭", "In drama, fights and scary things are only pretend. We never really hurt anyone."],
      ["Respect", "🤝", "Keep your hands to yourself. Stay inside your own space."],
      ["Stop means stop", "✋", "If anyone says \"stop,\" the game stops right away."]
    ], [
      ["In a pretend fight, you...", "never touch anyone", ["hit for real", "kick"], "🎭"],
      ["Someone says \"stop.\" You...", "stop right away", ["keep going", "laugh"], "✋"],
      ["During games, you keep your hands...", "to yourself", ["on other people", "around necks"]],
      ["Pretend scary monsters should be...", "silly, not frightening", ["truly mean", "real"]],
      ["If you feel uncomfortable, you can...", "say stop and tell a teacher", ["keep quiet and suffer", "run out alone"]],
      ["Drama is a place where everyone is...", "respected", ["teased", "left out"]],
      ["Costumes and props should be...", "treated with care", ["thrown", "torn"]],
      ["A safe space for acting means...", "everyone feels safe and welcome", ["only some are welcome", "no rules"]]
    ], ["Think about keeping everyone safe.", "Pretend is not real. Respect bodies and feelings.", "Example: when acting out a storm, you pretend with sounds, not by pushing anyone. Now do yours."])
  ];
  l3.push(
    MIX("Mixed practice", l3[0], l3[1], l3[3], l3[7]),
    MIX("Level 3 Challenge", l3[2], l3[5], l3[6], l3[10], l3[12], l3[14])
  );

  return { 1: l1, 2: l2, 3: l3 };
})();
