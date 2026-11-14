// ext/speaking-4-6.js  Mind Lab Speaking & Listening, levels 4-6 (60 lessons)
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, visual: v, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const MIX = (title, ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of some of them, then the quiz." }, ...ls.filter((_, i) => i % Math.ceil(ls.length / 4) === 0).slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make: f };
  };
  const lvl = (n, ls) => [...ls, MIX("Mixed practice", [ls[0], ls[3], ls[5], ls[8], ls[11], ls[14], ls[16]]), MIX(`Level ${n} Challenge`, ls)];

  // ================= LEVEL 4 =================
  const L4 = [
    SC("Talk with expression", "🎭", "Expression means your voice shows feelings. Happy news sounds bright. Sad news sounds slow and soft. A flat, robot voice makes listeners bored.", "Match your voice to the feeling in the words.", "For 'We won the game!' I use a bright, excited voice.", [
      "Which voice fits 'We won the game!'?|Bright and excited|Slow and sad|Flat like a robot",
      "Which voice fits 'My goldfish died.'?|Soft and slow|Loud and giddy|Singing",
      "A flat, robot voice makes listeners feel...|Bored|Excited|Surprised",
      "Expression means your voice shows...|Feelings|Your age|Your address",
      "Which voice fits a spooky story part?|Low and quiet|Squeaky and fast|Cheering",
      "Which voice fits 'Surprise! Happy birthday!'?|Loud and joyful|Whispery and sad|Sleepy",
      "To sound interested in your own talk, you can...|Change your voice|Say it all the same way|Mumble"
    ]),
    SC("Volume for the room", "🔉", "Different rooms need different volume. A big hall needs a strong voice. A small circle of friends needs a soft one. Check the faces: if listeners lean in, speak up.", "Think about how big the room is and how far away the listeners sit.", "In the gym I speak louder than at my kitchen table.", [
      "In a big gym you need...|A strong voice|A tiny whisper|No voice",
      "Talking with one friend at a desk, use...|A quiet voice|A shout|A scream",
      "Listeners are leaning in and frowning. You should...|Speak up a little|Whisper|Stop forever",
      "A microphone helps in a...|Big room|Tiny closet with one person|Bathtub",
      "Yelling at a friend one step away is...|Too loud|Just right|Too quiet",
      "The farthest listener cannot hear. You...|Project your voice more|Talk softer|Turn around",
      "Good speakers change volume to fit...|The room and the listeners|Their shoes|The weather only"
    ]),
    SC("Stress the key word", "⭐", "You can make a word stronger by saying it a little louder or longer. This is called stress. Changing the stressed word changes the meaning of a sentence.", "Find the word the speaker wants you to notice most.", "'I LOVE pizza' shows how much I like it.", [
      "In 'I did NOT take it', which word is stressed?|NOT|did|take",
      "Stress means saying a word...|A bit stronger|Backwards|In a whisper only",
      "'MY dog is brown' tells you whose dog it is. Which word is stressed?|MY|dog|brown",
      "Stressing the right word helps listeners know...|What matters most|Your age|The time",
      "'The cake is HUGE.' The stressed word shows the cake is...|Very big|Very small|Missing",
      "To stress an important word you can say it...|Louder or longer|In another language|Silently",
      "'I said BLUE, not red.' The stress helps show...|Which color is right|It is lunchtime|Nothing at all"
    ]),
    SC("Sequence words", "🔢", "Sequence words tell the order of things: first, next, then, after that, last. They help listeners follow your steps.", "Which word belongs at the beginning, the middle or the end?", "First I wash my hands. Next I dry them. Last I eat.", [
      "Which word starts a list of steps?|First|Last|Finally",
      "Which word ends a list of steps?|Last|First|Begin",
      "Which sequence word fits the middle?|Next|First|Last of all",
      "Sequence words help listeners...|Follow the order|Fall asleep|Count sheep",
      "Put in order: next, first, last. The right order is...|first, next, last|last, next, first|next, last, first",
      "Which word means what comes right after?|Then|Before|Never",
      "Which is NOT a sequence word?|Banana|First|Then"
    ]),
    SC("Explain how to do it", "🛠️", "A how-to talk teaches a skill. Say what you will teach, name what is needed, give the steps in order, and check that listeners understand.", "Think: what, supplies, steps in order, check.", "To make toast: bread and a toaster. First, put the bread in. Next, press down.", [
      "A how-to talk should give steps in...|Order|Random order|Backwards and mixed up",
      "Before the steps, you tell listeners what they...|Need|Dream about|Ate yesterday",
      "A good how-to talk starts by saying...|What you will teach|Nothing|Goodbye",
      "After your steps you can...|Ask if anyone has questions|Run away|Whisper",
      "Which is a how-to topic?|How to plant a seed|My favorite color is blue|The moon is far",
      "To make steps clear, use...|Short sentences|One endless sentence|Only gestures",
      "If a step is missing, listeners may be...|Confused|More excited|Asleep"
    ]),
    SC("Giving directions", "🧭", "Clear directions use left, right, straight, and landmarks like a big tree. Say one step at a time and wait for your listener to keep up.", "Use turn words and landmarks, one step at a time.", "Walk straight past the slide. Then turn left at the swings.", [
      "Which is a clear direction?|Turn left at the big tree.|Go over there, you know.|Somewhere by that thing.",
      "A landmark is...|Something easy to spot, like a tree|A secret code|A shoe",
      "Give directions one...|Step at a time|Hundred at once|Day a month",
      "The opposite of left is...|Right|Up|Round",
      "'Go straight' means...|Keep going forward|Turn around|Sit down",
      "If your listener looks lost, you can...|Say it again slowly|Talk faster|Walk away",
      "Which word helps with 'where'?|Next to|Because|Quickly"
    ]),
    SC("Retell in order", "📖", "To retell a story, name the characters and the place, then tell what happened at the start, in the middle and at the end. Use your own words and keep the order.", "Keep to the beginning, middle and end, and leave out tiny details.", "In The Three Little Pigs, first the pigs build houses, then the wolf comes, and in the end the pigs are safe.", [
      "A retell tells the story...|In order|Mixed up|Only the end",
      "A good retell names the...|Characters and setting|Page numbers only|Author's shoe size",
      "In your retell you use...|Your own words|Only the book's words, letter by letter|No words",
      "What do you leave out when you retell?|Tiny details|The ending|The characters",
      "The beginning of a story tells...|Who and where|How it ends|Nothing",
      "The ending of a story tells...|How it turns out|Who wrote it|The price",
      "Which is a retell?|First a boy found a lost pup, then he found its owner.|Dogs are cute.|I like cake."
    ]),
    SC("Listen for details", "👂", "Good listeners catch important details: who, what, where and when. Listen for numbers, names and colors. Picture them in your mind.", "Listen with your whole brain and make a picture.", "'Sam saw a red kite at the park.' Who: Sam. What: a red kite. Where: the park.", [
      "Sam saw a red kite at the park. What did Sam see?|A red kite|A blue boat|A big fish",
      "Mia ate three apples on Monday. How many apples?|Three|Two|Five",
      "Leo hid a coin under the blue rug. Where was the coin?|Under the blue rug|On the roof|In a shoe",
      "The bus leaves at noon. When does it leave?|Noon|Midnight|Breakfast",
      "Ana's cat is named Pip. What is the cat's name?|Pip|Ana|Max",
      "Details answer who, what, where and...|When|Never|Maybe",
      "Making a picture in your mind helps you...|Remember|Forget|Yawn"
    ]),
    SC("Ask to understand", "❓", "When you do not understand, ask! Use polite words: 'Can you say that again?' or 'What does that word mean?' Asking shows you are listening.", "Use polite words and ask about the part you missed.", "'Could you explain that last step again, please?'", [
      "You missed a word. A good thing to say is...|Can you say that again, please?|Huh? Whatever.|Nothing, just nod",
      "Asking a question shows you are...|Listening|Bored|Rude",
      "You do not know what 'tide' means. You can ask...|What does tide mean?|Why are you talking?|Can we stop?",
      "Which is a polite question?|Could you show me again?|Show me now!|You are unclear!",
      "It is smart to ask a question when you are...|Confused|Never|Asleep",
      "When you ask a question, your face should look...|Friendly|Angry|Hidden",
      "After they explain, you can say...|Thank you, now I get it|Too slow|Boring"
    ]),
    SC("Stay on topic", "🎯", "Staying on topic means your sentences are about the main idea. If the topic is dogs, do not jump to pizza. Ask yourself: does this fit?", "Check whether each sentence is about the topic.", "Topic: my bike. 'My bike has a bell' fits. 'I like soup' does not.", [
      "Topic: my pet cat. Which sentence fits?|My cat likes to nap in the sun.|The moon is far away.|I rode a train.",
      "Topic: the zoo. Which sentence stays on topic?|I saw a tall giraffe.|I fixed my bike.|Pizza has cheese.",
      "Staying on topic means...|Sticking to the main idea|Jumping around|Changing the subject often",
      "Topic: winter. Which sentence does NOT fit?|Strawberries grow in summer gardens.|It snows in winter.|I wear a warm coat.",
      "If you wander off topic, you can say...|Back to my topic|Never mind everything|Let's do something else",
      "Why stay on topic?|Listeners can follow you|It is a secret|It saves paper",
      "Topic: my school. Which fits?|Our library has many books.|Whales are huge.|Volcanoes erupt."
    ]),
    SC("Describe with senses", "👃", "Describe things with your five senses: what you see, hear, smell, taste and feel. Details help listeners imagine it.", "Name a sense, then add a detail.", "The soup was hot and salty, and it smelled like onions.", [
      "Which detail uses the sense of hearing?|The drum went boom, boom.|It was red.|It tasted sweet.",
      "Which detail uses the sense of smell?|It smelled like fresh bread.|It felt fuzzy.|It looked tall.",
      "Which detail uses the sense of touch?|The blanket was soft and warm.|The bell rang.|It smelled like rain.",
      "Which detail uses the sense of taste?|The lemon was sour.|The sky was blue.|The wind howled.",
      "Which detail uses the sense of sight?|A bright yellow sun|A crunchy chip sound|A salty snack",
      "Why add sense details?|Listeners can imagine it|To be silly|To talk longer",
      "How many senses do we use to describe?|Five|Two|Nine"
    ]),
    SC("I think... because...", "💭", "An opinion is what you think or feel. Back it up with a reason using 'because'. Reasons make your opinion stronger.", "Say what you think, then give a reason with because.", "I think recess is the best because we get to play.", [
      "Which is an opinion with a reason?|I like dogs because they are friendly.|I like dogs.|Dogs.",
      "A reason often follows the word...|Because|Maybe|Never",
      "Which is an opinion?|Summer is the best season.|Summer follows spring.|June has thirty days.",
      "Which gives a reason?|...because it is fun.|...and then.|...hello.",
      "'Blue is the best color.' This is...|An opinion|A number|A map",
      "Why give a reason?|It helps listeners understand you|It makes the talk shorter|It hides your idea",
      "Which is the strongest reason for reading daily?|Because it helps me learn new words|Because yes|Because"
    ]),
    SC("Read aloud smoothly", "📚", "When you read aloud, read groups of words together, pause at periods, and lift your voice for questions. Practice makes it smooth.", "Look ahead, and let punctuation guide your voice.", "At a period I stop. At a question mark my voice goes up.", [
      "A period tells your voice to...|Stop and pause|Go up|Shout",
      "A question mark tells your voice to...|Go up a little|Go to sleep|Stay flat",
      "An exclamation mark shows...|Strong feeling|A question|Silence",
      "Reading word by word, slowly, sounds...|Choppy|Smooth|Fancy",
      "Smooth reading groups words into...|Phrases|Single letters|Pictures",
      "Before you read aloud to others, you should...|Practice|Never look at it|Skip lines",
      "A comma usually means...|A tiny pause|A loud shout|The end of the book"
    ]),
    SC("Group talk rules", "💬", "In a group talk, listen first, take turns, speak about the topic, and be kind when you disagree. Everyone gets a chance.", "Think of fair turns and respect.", "I wait until Tia finishes, then I add my idea.", [
      "In group talk, you should...|Take turns|Talk the loudest|Walk away",
      "A friend has a different idea. You...|Listen respectfully|Say it is dumb|Ignore them",
      "Everyone in the group gets...|A chance to speak|Silenced|A prize only for loud kids",
      "Which is a kind way to disagree?|I see it differently.|That is stupid.|You are wrong, always.",
      "A quiet friend has not spoken yet. You can...|Invite them to share|Skip them|Tease them",
      "Group talk is best when we...|Listen and build on ideas|Interrupt|Argue",
      "Your idea was not picked. You...|Stay kind and keep helping|Pout|Quit"
    ]),
    SC("Say it back", "🔁", "Paraphrasing means saying what you heard in your own words: 'So you are saying...' It shows you listened and checks that you understood.", "Use your own words and start with 'So you are saying'.", "Friend: 'I want a dog.' Me: 'So you are saying you want a dog?'", [
      "Which is a paraphrase starter?|So you are saying...|Whatever...|I stopped listening.",
      "Paraphrasing means...|Saying it in your own words|Copying word for word|Changing the topic",
      "Why say it back?|To check you understood|To trick them|To end the talk",
      "'I love soccer, it is so fun.' A paraphrase is...|You really like soccer.|You hate sports.|You like cooking.",
      "If you said it back wrong, the speaker can...|Help fix it|Get angry|Leave",
      "Saying it back shows you were...|Listening|Daydreaming|Sleeping",
      "'My brother is learning piano.' A paraphrase is...|Your brother is learning to play piano.|Your brother sells cars.|Your brother runs a zoo."
    ]),
    SC("Pictures and props", "🖼️", "A prop or a picture helps listeners understand. Hold it up so everyone can see, and talk to the audience, not to the prop.", "Show it clearly, then look back at your listeners.", "I hold up a seashell and say, 'This shell is rough and curly.'", [
      "A prop is...|An object that helps your talk|A mistake|A loud noise",
      "When you show a prop you should...|Hold it up so all can see|Hide it|Keep it behind you",
      "While you talk about a prop, you look mostly at...|Your listeners|The prop only|The floor",
      "A good prop for a talk on bees is...|A picture of a bee|A pair of socks|A spoon",
      "Too many props can be...|Distracting|Required|Boring",
      "A picture helps listeners...|Understand your words|Fall asleep|Forget",
      "After using a prop, you should...|Put it down and keep talking|Throw it|Hide in the room"
    ]),
    SC("A strong start", "🚀", "Start your talk with a hook: a question, a surprising fact or a short story. Then say your topic. A strong start gets listeners ready to hear more.", "A hook makes listeners curious.", "Did you know a snail has thousands of tiny teeth?", [
      "Which is a good hook?|Did you know sharks have been around longer than trees?|Um, so, I guess...|My talk is next.",
      "A hook is used at the...|Start of a talk|End of a talk|Middle of lunch",
      "Which is NOT a hook idea?|Saying 'Um, I forgot'|Asking a fun question|Sharing a surprising fact",
      "After the hook, you say your...|Topic|Address|Bedtime",
      "Why start with a hook?|It gets listeners curious|It makes you tired|It hides the topic",
      "Which is a question hook?|Have you ever seen a rainbow at night?|Rainbows are in the sky.|I like rainbows.",
      "A short story can be a...|Hook|Mistake|Wrong way"
    ]),
    SC("Say thank you well", "🙏", "End a talk by saying the main idea once more, then smile and say, 'Thank you for listening.' Wait for questions or clapping before you sit.", "Finish with your main idea, a thank you and a smile.", "So remember, bees help flowers grow. Thank you for listening!", [
      "A good ending includes...|The main idea and thank you|Running off|Nothing",
      "After 'Thank you', you should...|Wait calmly|Hurry away|Make a face",
      "It is nice to end by looking at...|Your listeners|The floor|Your feet",
      "A finish like 'That is all, I guess' sounds...|Unsure|Strong|Proud",
      "Which is a strong closing?|So remember: recycling helps our planet. Thank you!|Um, done.|I forgot the rest.",
      "People may clap. You can...|Smile and nod|Cover your face|Frown",
      "Repeating the main idea at the end helps listeners...|Remember it|Forget it|Leave"
    ])
  ];

  // ================= LEVEL 5 =================
  const L5 = [
    SC("Plan with a web", "🕸️", "Before you speak, plan with a web. Write your topic in the middle, then add a few main points around it. Each point can have two or three small details.", "Topic in the middle, main points around it.", "Topic: dogs. Points: food, exercise, love.", [
      "In a planning web, the topic goes...|In the middle|Nowhere|At the bottom only",
      "Main points go...|Around the topic|On the ceiling|Out the window",
      "A good web helps you...|Organize your ideas|Lose your ideas|Skip the talk",
      "Topic: pets. Which is a main point?|Food and care|Rocket ships|Volcanoes",
      "Details go with...|A main point|Nothing|The weather",
      "Planning first makes your talk...|Clear|Confusing|Silent",
      "How many main points are good for a short talk?|Two or three|Thirty|Zero"
    ]),
    SC("Topic sentence and details", "🧩", "A topic sentence tells the main idea. Details come next and give facts, examples and descriptions that prove the main idea.", "The topic sentence is the big idea. Details are the small support.", "Topic sentence: Owls are great hunters. Detail: They hear very well.", [
      "A topic sentence tells...|The main idea|A tiny detail|The ending only",
      "Which is a detail for 'Owls hunt at night'?|They see well in the dark.|They are at the zoo.|Pizza is hot.",
      "Which is a topic sentence?|Recycling helps our Earth.|Cans.|Blue.",
      "Details should...|Support the main idea|Change the topic|Be random",
      "Which detail fits 'Fish live in water'?|They breathe with gills.|They climb trees.|They use phones.",
      "Which is the best topic sentence for a talk about bikes?|Bikes are fun and healthy.|My shoe is red.|Hello.",
      "The topic sentence usually comes...|First|Never|In the last second"
    ]),
    SC("Fact or opinion", "⚖️", "A fact can be checked and proven. An opinion is what someone thinks or feels. Words like best, worst, yummy and boring often show an opinion.", "Ask: can I prove it, or is it a feeling?", "'A week has seven days' is a fact. 'Mondays are boring' is an opinion.", [
      "Which is a fact?|A triangle has three sides.|Triangles are pretty.|Triangles are the best.",
      "Which is an opinion?|Pizza is the yummiest food.|Pizza is made with dough.|Pizza can be round.",
      "Which is a fact?|Water freezes into ice.|Winter is the best season.|Ice is boring.",
      "Which word often shows an opinion?|Best|Seven|Round",
      "Which is an opinion?|Cats are better than dogs.|Cats have whiskers.|Dogs bark.",
      "A fact can be...|Checked|Only felt|Never proven",
      "Which is a fact?|The Earth goes around the sun.|Space is scary.|Stars are lovely."
    ]),
    SC("Transition words", "🌉", "Transitions join your ideas. Use 'also' to add, 'but' to show a difference, 'because' to give a reason and 'finally' to finish.", "Think: add, contrast, reason, or end.", "I like apples. Also, I like pears.", [
      "Which word adds an idea?|Also|But|Finally",
      "Which word shows a difference?|But|Also|Because",
      "Which word gives a reason?|Because|However|Finally",
      "Which word signals the last point?|Finally|First|Also",
      "Which word fits? I wanted to play, ___ it rained.|but|also|first",
      "Which word fits? I ate lunch ___ I was hungry.|because|but|finally",
      "Transitions help listeners...|Follow your ideas|Get lost|Forget"
    ]),
    SC("Tone of voice", "🎶", "Tone is the feeling in your voice. A warm tone sounds friendly. A serious tone shows something important. A cranky tone can hurt feelings, even with kind words.", "Match your tone to your message.", "'Thank you' said warmly feels kind. Said with a sigh, it feels rude.", [
      "Which tone fits a warm 'Good morning'?|Friendly|Grumpy|Scary",
      "Which tone fits a safety rule?|Serious and clear|Silly and giggly|Sleepy",
      "'Sorry' said with an eye roll sounds...|Not sincere|Very kind|Funny",
      "Tone means...|The feeling in your voice|The size of your shoes|The color of a word",
      "Kind words in a mean tone can...|Still hurt|Always be nice|Disappear",
      "To sound sincere, make your tone match your...|Words|Shoes|Snack",
      "A warm tone helps listeners feel...|Welcome|Worried|Bored"
    ]),
    SC("Pace and pauses", "⏸️", "Pace is how fast you speak. Slow down for important parts. A pause before a big idea builds interest and lets listeners think.", "Slow down for the big idea and pause for it to sink in.", "'And the winner is... (pause) ... Maya!'", [
      "A pause before a big idea makes listeners...|Pay attention|Fall asleep|Leave",
      "Pace means...|How fast you talk|How loud you talk|How tall you stand",
      "A nervous speaker often talks too...|Fast|Slowly|Backward",
      "Good speakers slow down for the...|Important parts|Unimportant parts|Thank you only",
      "A pause lets listeners...|Think|Giggle at you|Forget",
      "If you notice you are rushing, you can...|Take a breath|Talk faster|Look away",
      "Speaking too slowly for a whole talk can make it...|Dull|Exciting|Short"
    ]),
    SC("Listen for the main idea", "📡", "When you listen, ask: what is this mostly about? The main idea is the big point. Details help prove it. Listen for words said again and again.", "The idea repeated the most is often the main idea.", "A talk about camels' humps, desert feet and long eyelashes is mostly about how camels live in the desert.", [
      "A talk covers apples, oranges, grapes and bananas. It is mostly about...|Fruit|Cars|Weather",
      "A speaker says 'Sleep' again and again. The main idea may be about...|Sleep|Pizza|Planets",
      "The main idea is the...|Big point|Smallest detail|Last word",
      "Details are used to...|Support the main idea|Replace it|Hide it",
      "A talk on lions, tigers and leopards is mostly about...|Big cats|Fish|Trees",
      "A talk on rain, snow and wind is mostly about...|Weather|Animals|Games",
      "To find the main idea, ask:|What is it mostly about?|What is the font?|Who is last?"
    ]),
    SC("Notes while listening", "📝", "When you listen, jot down key words, not whole sentences. Use short words, numbers and little drawings. Notes help you remember later.", "Write only the key words.", "Speaker: 'Frogs lay eggs in water.' My note: frogs, eggs, water.", [
      "Good notes use...|Key words|Every word|Nothing",
      "A good note for 'Penguins live in cold places' is...|penguins, cold|Penguins are the cutest animals ever.|(nothing)",
      "Notes can include...|Little drawings|Complaints|Songs only",
      "Why take notes?|To remember later|To hide|To stop listening",
      "While listening, you should still...|Look at the speaker sometimes|Never look up|Walk around",
      "Which is a short, helpful note?|3 pigs, brick house|A very long paragraph copied word for word|zzz",
      "Numbers in a talk are good to...|Write down|Ignore|Erase"
    ]),
    SC("Follow spoken directions", "📋", "Spoken directions come in steps. Listen to all of them, picture each step, and do them in order. If you forget one, politely ask for it again.", "Listen to every step, then do them in order.", "'Get a pencil, write your name, then line up.' I do the three things in order.", [
      "Directions: touch your nose, clap twice, sit down. What do you do first?|Touch your nose|Sit down|Clap twice",
      "Directions: get paper, fold it, draw a star. What is last?|Draw a star|Get paper|Fold it",
      "Directions: stand, turn around, wave. What is second?|Turn around|Stand|Wave",
      "You forgot a step. You can...|Ask politely to hear it again|Guess|Stop trying",
      "To follow directions well, you should...|Listen to all steps first|Start before they finish|Talk through them",
      "Picturing each step helps you...|Remember|Mix them up|Skip them",
      "Directions: open book, read page two, close book. How many steps?|Three|One|Five"
    ]),
    SC("Five W questions", "🕵️", "Good questions begin with who, what, where, when, why and how. Who asks about a person. Where asks about a place. When asks about time. Why asks for a reason.", "Match the question word to what you want to know.", "'When is the party?' asks about time.", [
      "Which word asks about a person?|Who|Where|When",
      "Which word asks about a place?|Where|Who|Why",
      "Which word asks about time?|When|What|Who",
      "Which word asks for a reason?|Why|Where|Who",
      "'How do you bake bread?' asks about...|Steps|A person|A place",
      "'Where did you go on vacation?' wants to know...|A place|A reason|A time",
      "'Who is your teacher?' wants to know...|A person|A color|A day"
    ]),
    SC("Give reasons to persuade", "📣", "To persuade means to help someone agree with you. State what you want, give two or three good reasons, and end by asking kindly. Use facts and examples.", "Strong reasons make people listen.", "We should have a class garden. It teaches us, it is pretty, and it helps bees.", [
      "To persuade means to...|Help others agree with you|Trick them|Trade seats",
      "A strong reason is...|True and clear|Made up|Rude",
      "A persuasive speaker asks in a...|Kind way|Bossy way|Silent way",
      "Which is a good reason for more recess?|Exercise helps us focus.|Because I said so.|Just do it.",
      "A persuasive talk usually gives...|Two or three reasons|No reasons|A hundred reasons",
      "Which is a persuasive sentence?|We should recycle because it saves resources.|Recycling.|I am hungry.",
      "To end a persuasive talk, you can...|Say again what you want|Run off|Argue"
    ]),
    SC("Tell a true story", "🏞️", "A personal story is about something that happened to you. Tell who, where and when, then the problem, what you did and how you felt at the end.", "Name the setting, the problem and the feeling.", "Last summer at the lake, my kite got stuck in a tree. I was worried, then we got it down.", [
      "A personal story is about...|Something that happened to you|A made-up dragon|A math fact",
      "A story needs a...|Beginning, middle and end|Beginning only|Random words",
      "A problem in a story is...|Something to solve|Always funny|Not needed",
      "Telling your feelings makes a story...|More interesting|Shorter|Confusing",
      "Which starts a story well?|Last summer, at the lake, something strange happened.|So...|The end.",
      "'First', 'then' and 'finally' help tell the story in...|Order|Reverse|Random",
      "The ending tells...|How things turned out|Your address|A recipe"
    ]),
    SC("Read with flow", "🌊", "Fluent reading sounds like talking. Read in phrases, use the punctuation, change your voice for characters and keep a steady pace.", "Read the way you would talk.", "I read 'Wow!' with excitement and 'Why?' with a rising voice.", [
      "Fluent reading sounds like...|Natural talking|A robot|Whispers only",
      "Quotation marks show someone is...|Speaking|Sleeping|Leaving",
      "A reader can show a character by...|Changing their voice|Reading flat|Skipping the lines",
      "Reading in phrases means...|Groups of words together|One letter at a time|Skipping lines",
      "To read well aloud, practice...|Several times|Never|Once while sleeping",
      "At an exclamation mark, your voice shows...|Strong feeling|Doubt|Silence",
      "If a word is hard, you can...|Sound it out calmly|Get upset|Quit"
    ]),
    SC("Bounce back from mistakes", "🔄", "Everyone makes mistakes when speaking. Stay calm, take a breath, fix it simply, and keep going. Most listeners do not even notice.", "Pause, fix it, and keep going.", "'The red... I mean, the blue ball.' Then I just continue.", [
      "You say the wrong word. You can...|Fix it and keep going|Run away|Cry",
      "You forget your next point. A smart move is to...|Take a breath and check your notes|Say nothing for ten minutes|Leave",
      "Most listeners...|Will not mind small mistakes|Will laugh at every one|Will leave",
      "A calm breath helps you...|Think|Giggle|Forget",
      "After a mistake, a speaker should...|Continue the talk|Apologize ten times|Stop",
      "Mistakes in speaking are...|Normal|Terrible|Rare for everyone",
      "Which self-talk helps?|I can keep going.|I am the worst.|I quit."
    ]),
    SC("Disagree respectfully", "🤝", "You can disagree and still be kind. Say 'I see it differently' and share your reason. Listen to the other side. Attack ideas, never people.", "Be kind to the person, even if you do not share the idea.", "'I see it differently. I think the park is better because it has more space.'", [
      "Which is a respectful way to disagree?|I see it differently, because...|That is dumb.|You always get it wrong.",
      "When disagreeing, you talk about the...|Idea|Person's looks|Person's family",
      "While the other person explains, you...|Listen|Interrupt|Roll your eyes",
      "You can disagree and still be...|Friends|Enemies|Strangers",
      "Which phrase is kind?|I understand, but I think...|No way, you are wrong!|Be quiet.",
      "A good reason helps the other person...|Understand your view|Feel small|Leave",
      "Sometimes we agree to...|Disagree kindly|Fight|Shout"
    ]),
    SC("Formal and casual talk", "👔", "We talk in different ways for different people. With friends, casual talk is fine: 'Hey, what's up?' With teachers, visitors and in presentations, use formal words: 'Good morning, how are you?'", "Think about who is listening.", "To the principal: 'Good morning, Ms. Lee.' To a friend: 'Hey!'", [
      "Which is formal?|Good morning, Mr. Ortiz.|Yo, dude!|Sup?",
      "Which is casual?|Hey, what's up?|Good afternoon, ma'am.|Pleased to meet you.",
      "In a class presentation, use...|Formal words|Slang only|Silly noises",
      "Talking to a visitor, you say...|Hello, welcome to our school.|Yo, who are you?|Whatever.",
      "Casual talk is fine with...|Close friends|Every adult you meet|Nobody ever",
      "Which sounds more formal?|I would like some help, please.|Gimme help.|Help me, now.",
      "Choosing words for your listener is...|Respectful|Silly|Useless"
    ]),
    SC("Use visuals well", "📊", "A chart, poster or slide helps explain. Keep words big and few. Point to the part you are talking about, and never read the whole slide word for word.", "Few words, big pictures, and talk to the audience.", "My poster has a big picture of a frog life cycle and four short labels.", [
      "A good poster has...|Big pictures and few words|Tiny writing everywhere|No words at all",
      "When you use a visual, you should...|Explain it in your own words|Read every word|Hide it",
      "Words on a slide should be...|Big and short|Tiny and long|Invisible",
      "Pointing to the part you talk about helps listeners...|Follow along|Look away|Fall asleep",
      "You should face mostly toward...|The audience|The screen|The corner",
      "A chart is great for showing...|Numbers|A smell|A sound",
      "A cluttered slide is...|Hard to read|Easy to read|Required"
    ]),
    SC("Answer questions well", "🙋", "After a talk, listeners may ask questions. Listen to the whole question, think, and answer clearly. If you do not know, say so: 'Good question. I will find out.'", "Listen to the whole question, then answer honestly.", "'I am not sure, but I can look it up and tell you tomorrow.'", [
      "Before you answer a question you should...|Listen to all of it|Interrupt|Turn away",
      "You do not know the answer. You can say...|Good question. I'll find out.|Make something up|Nothing",
      "A clear answer is...|Short and honest|Very long and wandering|A guess presented as fact",
      "Thanking the asker is...|Kind|Silly|Rude",
      "If the question was quiet, you can...|Repeat it for everyone|Ignore it|Whisper",
      "Making up an answer is...|Not honest|The best way|Smart",
      "After a question, a pause to think is...|Fine|Terrible|Forbidden"
    ])
  ];

  // ================= LEVEL 6 =================
  const L6 = [
    SC("Rehearse like a pro", "🔁", "Rehearse out loud, not just in your head. Practice in front of a mirror or a family member, time your talk, and mark the spots where you will pause.", "Out loud, with timing, more than once.", "I said my talk three times and found it took four minutes.", [
      "The best way to rehearse is...|Out loud|Only silently in your head|Never",
      "Rehearsing in front of a mirror helps you see your...|Face and posture|Lunch|Homework",
      "Timing your talk shows if it is...|The right length|The right color|Too tall",
      "Practicing in front of a family member gives you...|Friendly feedback|A prize|Homework",
      "After you rehearse, you can...|Fix the tricky parts|Throw the talk away|Forget it",
      "You should rehearse...|More than once|Never|Only while asleep",
      "Marking pauses in your notes helps you...|Speak with control|Run out of ink|Fall behind"
    ]),
    SC("Introduce a speaker", "🎤", "Introducing someone means telling the audience who they are and why they matter. Say their name clearly, give one or two facts, and invite applause.", "Name, one or two facts, then welcome them.", "Please welcome Jo Park, who has grown a garden for three years.", [
      "An introduction tells the audience...|Who the speaker is|The speaker's secret|The weather",
      "A good introduction is...|Short and friendly|A ten-minute story|Silent",
      "You should say the speaker's name...|Clearly|Quietly so no one hears|Wrongly",
      "At the end of an introduction you can say...|Please welcome...|Go away|Nothing",
      "Before you introduce someone, check how to say their name...|Correctly|Never|Backwards",
      "An introduction should be about the...|Speaker|Introducer's lunch|Next week",
      "Which facts belong in a short introduction?|Their topic and why it matters|Their private business|Their home address"
    ]),
    SC("Facts, examples and reasons", "🧱", "Strong talks use support. A fact is true information. An example shows the idea in real life. A reason tells why. Mix them to explain your point.", "Ask: what proves my point?", "Point: exercise is healthy. Fact: it strengthens your heart. Example: running at recess.", [
      "A fact is...|True information|An opinion|A joke",
      "An example...|Shows the idea in real life|Is always a lie|Has no meaning",
      "A reason tells...|Why|Where|Who",
      "Which is an example of a healthy habit?|Drinking water every day|Staying up all night|Skipping breakfast always",
      "Using facts, examples and reasons makes a point...|Stronger|Weaker|Silent",
      "Which supports 'Reading helps us learn'?|Books teach us new words.|I am tall.|Pizza is hot.",
      "'For example' signals...|An example|A goodbye|A question"
    ]),
    SC("Close with impact", "🏁", "A strong conclusion repeats your main idea in new words, leaves one thought to remember and ends with confidence. Do not add new facts at the end.", "Wrap up the main idea, then stop.", "So remember: every small act of kindness makes our class stronger.", [
      "A conclusion should...|Repeat the main idea|Add brand new facts|Start a new topic",
      "A good last line leaves listeners with...|One idea to remember|Confusion|Nothing",
      "Which is a strong closing?|So remember, kindness makes our school better.|Um, that's it?|I ran out of things to say.",
      "New facts in the closing are...|Not a good idea|Required|Best",
      "After the last line, you...|Say thank you and wait|Run away|Start over",
      "A closing is the same as...|Your ending|Your hook|Your title",
      "The main idea in the conclusion is said in...|New words|A different language|Whispers"
    ]),
    SC("Adjust to your audience", "🎚️", "Different listeners need different talks. For little kids use simple words and stories. For classmates share fun details. For adults use clear, polite language. Watch their faces and adjust.", "Think about age, interest and what they already know.", "To first graders I say 'big cats'. To my class I might say 'lions and tigers'.", [
      "Speaking to little kids, use...|Simple words|Very long words|A whisper",
      "Listeners look lost. You can...|Explain in simpler words|Talk faster|Stop caring",
      "Before your talk, think about what listeners already...|Know|Ate|Wear",
      "Faces that look bored may mean you should...|Add something exciting|Keep it exactly the same|Give up",
      "Speaking to adults, use...|Clear and polite language|Silly baby talk|Slang only",
      "A talk for classmates can include...|Fun details they enjoy|Nothing at all|Only hard words",
      "Adjusting to listeners shows you...|Care about them|Don't care|Are lost"
    ]),
    SC("Interview skills", "🎙️", "In an interview, one person asks questions and the other answers. Ask open questions that need more than yes or no. Listen, and ask a follow-up based on the answer.", "Open questions begin with how, why or what.", "'What is your favorite part of your job?' leads to a longer answer than 'Do you like it?'", [
      "Which is an open question?|Why did you choose this job?|Do you like it?|Is it Monday?",
      "A follow-up question builds on the...|Answer you heard|Weather|Clock",
      "In an interview, the interviewer should...|Listen carefully|Interrupt|Answer for the guest",
      "Which would get a short yes/no answer?|Is your office big?|How did you learn this?|What do you enjoy most?",
      "Before an interview, it helps to...|Prepare questions|Skip questions|Forget the name",
      "At the end, you say...|Thank you for your time|Bye now, quickly|Nothing",
      "Eye contact in an interview shows you are...|Interested|Bored|Late"
    ]),
    SC("Phone and polite requests", "📞", "On the phone, say who you are, speak slowly and clearly, and use polite words like please and thank you. Make requests kindly: 'May I please speak to Grandma?'", "Say who you are, then ask politely.", "'Hello, this is Sam. May I please speak with Grandpa?'", [
      "When you call, first say...|Hello, this is (your first name)|Nothing, just wait|Guess who",
      "Which is a polite request?|May I please have some water?|Give me water.|Water, now.",
      "On the phone, speak...|Slowly and clearly|Mumbling|While eating",
      "At the end of a call say...|Thank you, goodbye|Nothing, then hang up|You talk too much",
      "If you cannot hear, you can say...|Could you repeat that, please?|What?!|Hang up",
      "You should never share private details with...|People you don't know|Your family|Your teacher in class",
      "Polite words include...|Please and thank you|Whatever|Hurry up"
    ]),
    SC("Build on others' ideas", "🧠", "In a discussion, build on what others say: 'I agree with Lena, and I would add...' This connects ideas and shows you were listening.", "Mention the earlier idea, then add yours.", "'Building on Omar's idea, we could also make a poster.'", [
      "Which phrase builds on an idea?|I agree with Ben, and I would add...|Whatever.|Nobody said that.",
      "Building on ideas shows you...|Were listening|Weren't paying attention|Are bored",
      "When you build on an idea, you...|Add something new|Repeat it exactly|Ignore it",
      "A good discussion has ideas that...|Connect to each other|Never match|Are silent",
      "Which starter connects to a friend's idea?|Adding to what Ana said...|Totally unrelated, but...|Stop talking.",
      "When someone shares, you can respond with...|Thanks, that helps|Rude noises|Silence and a frown",
      "Naming who you are building on is...|Respectful|Rude|Silly"
    ]),
    SC("Clarify and confirm", "🔍", "To clarify, ask for a clearer explanation: 'Could you give an example?' To confirm, check you understood: 'Do you mean the second step?' These save time and mistakes.", "Ask for an example, or check what you think you heard.", "'Do you mean we meet at noon, not at one?'", [
      "Which question asks for clarification?|Could you give an example?|Why are you here?|Is it lunch yet?",
      "Which question confirms understanding?|Do you mean Tuesday?|What color is the sky?|Who ate it?",
      "Clarifying helps avoid...|Mistakes|Friends|Learning",
      "You are not sure about the time. You ask...|Did you say 3 o'clock?|Nothing, just show up|Time doesn't matter",
      "'Could you explain that another way?' is...|A polite request|A rude demand|Too long",
      "Confirming means...|Checking you understood correctly|Changing the topic|Ending the talk",
      "Asking to clarify shows you are...|Thinking and listening|Lazy|Rude"
    ]),
    SC("Summarize what you heard", "🗜️", "A summary is a short version with only the most important parts. Say the main idea and one or two key points in your own words. Leave out small details.", "Short, main idea first, no tiny details.", "The talk explained that bees help plants by moving pollen. They also make honey.", [
      "A summary is...|A short version of the main points|A copy of every word|A new story",
      "A summary leaves out...|Small details|The main idea|The topic",
      "A summary is told in...|Your own words|Someone else's exact words|A foreign language",
      "A summary of a long talk should be...|Much shorter|Longer|The same",
      "Summarize: 'Whales are mammals, they breathe air and feed milk to their babies.' The main idea is whales are...|Mammals|Fish|Birds",
      "Summarizing helps you...|Remember the big points|Forget them|Hide",
      "A summary starts with the...|Main idea|Tiniest detail|Last joke"
    ]),
    SC("Rhythm and choral reading", "🥁", "Poems and chants have rhythm: a beat you can feel. In choral reading, a group reads together, so everyone keeps the same pace and volume. Listen to each other.", "Feel the beat and match the group.", "We read 'Row, row, row your boat' on the beat, all together.", [
      "Rhythm is...|A beat in words|A color|A kind of fruit",
      "Choral reading means...|A group reads together|One person whispers|Nobody reads",
      "In choral reading, keep the same...|Pace and volume|Hairstyle|Shoes",
      "To stay together, you should...|Listen to the group|Race ahead|Read silently",
      "Clapping the beat can help you feel the...|Rhythm|Weather|Lunch",
      "A poem that sounds like a song has strong...|Rhythm|Silence|Math",
      "If the group speeds up too much, you can...|Gently slow back down|Shout|Leave"
    ]),
    SC("Vivid word choice", "🎨", "Strong words paint pictures. Say 'sprinted' instead of 'went fast' and 'enormous' instead of 'big'. Choose exact words to make your talk exciting.", "Swap a plain word for a more exact one.", "Instead of 'The dog ran', say 'The dog raced across the yard'.", [
      "Which word is more vivid than 'big'?|Enormous|Nice|Okay",
      "Which is more vivid than 'said'?|Whispered|Went|Did",
      "Which is more vivid than 'looked'?|Stared|Was|Had",
      "Which is more vivid than 'cold'?|Freezing|Fine|Plain",
      "Exact words help listeners...|Picture the scene|Fall asleep|Argue",
      "Which sentence paints a better picture?|The tiny kitten tiptoed across the snow.|The animal went.|It was a thing.",
      "Which is more vivid than 'happy'?|Delighted|Okay|Alright"
    ]),
    SC("Rule of three", "3️⃣", "Ideas often sound strong in threes: 'Ready, set, go!' Use three reasons, three examples or three describing words. Three feels complete, easy to remember and balanced.", "Group your points in threes.", "'Eat well, sleep well, play well.'", [
      "The 'rule of three' says ideas feel strong in...|Groups of three|Groups of fifty|Single words only",
      "Which is a group of three?|Fast, fun and free|Fast and fun|Fast",
      "Why use three points?|They are easy to remember|They are confusing|They are long",
      "'Stop, look, listen' uses...|Three actions|Two actions|One action",
      "A talk with three reasons feels...|Complete|Empty|Rude",
      "Which list is balanced in three?|red, white and blue|red and white|red",
      "Too many points can make listeners...|Forget|Remember all|Cheer"
    ]),
    SC("Compare and contrast", "⚖️", "To compare is to tell how things are alike. To contrast is to tell how they are different. Words like both and also show likeness. Words like but and unlike show differences.", "Alike or different? Look for the signal word.", "Both cats and dogs are pets, but dogs bark and cats purr.", [
      "Which word signals a likeness?|Both|Unlike|But",
      "Which word signals a difference?|Unlike|Both|Same",
      "Both a bike and a scooter...|Have wheels|Are fish|Fly",
      "Unlike a bike, a scooter...|Is usually stood on|Has no wheels|Is a plant",
      "To contrast is to tell how things are...|Different|Alike|Hidden",
      "To compare is to tell how things are...|Alike|Different|Silent",
      "Which sentence compares?|Both apples and pears are fruit.|Apples are red but pears are yellow.|I like snacks."
    ]),
    SC("Keep to the time", "⏱️", "Talks often have a time limit. Plan how long each part takes, practice with a timer and have a part you can shorten if time runs short. Going over the time is unfair to others.", "Use a timer and trim when needed.", "My talk should be two minutes, so the middle gets about one minute.", [
      "A time limit means your talk should...|End by that time|Go forever|Skip the ending",
      "To check your timing, use a...|Timer|Fork|Rug",
      "If you are running out of time, you...|Shorten a part|Talk faster to the end|Skip your thanks",
      "Going far over time is...|Unfair to others|Fine|Required",
      "If a talk is two minutes, one hundred twenty seconds is...|The same time|Longer|Shorter",
      "A sensible way to plan is to give each part...|A time share|No time|All the time",
      "If you finish early, that is...|Fine, as long as you covered everything|A disaster|Wrong"
    ]),
    SC("Glow and grow feedback", "🌟", "Feedback can use glows and grows. A glow is something the speaker did well. A grow is one thing to work on. Be specific and kind, and say the grow as a helpful idea.", "Praise first with a specific glow, then one kind grow.", "Glow: your voice was clear. Grow: try pausing after your big idea.", [
      "A glow is something the speaker did...|Well|Badly|Silently",
      "A grow is...|One thing to work on|A plant|A complaint",
      "Which is a specific glow?|Your pause before the big fact worked well.|Good.|Fine, I guess.",
      "Which is a kind grow?|Try looking at the back row more.|You never look at anyone.|You were awful.",
      "Feedback helps speakers...|Improve|Quit|Get mad",
      "Good feedback is...|Specific and kind|Vague and rude|Loud",
      "How many grows are best to share at once?|One or two|Twenty|None, ever"
    ]),
    SC("Speak up kindly", "🗨️", "You can speak up for yourself with an I-message: 'I feel ___ when ___. Please ___.' It tells how you feel without blaming. Use a calm voice and listen to the answer.", "I feel... when... please...", "'I feel left out when you whisper. Please include me.'", [
      "Which is an I-message?|I feel sad when I'm left out.|You are mean.|Everyone is rude.",
      "I-messages are good because they...|Share feelings without blaming|Blame everyone|Start fights",
      "After an I-message, you should...|Listen to the answer|Shout|Leave",
      "Which is a calm request?|Please share the markers.|Give me those now!|Markers are lame.",
      "Speaking up for yourself is...|Okay and healthy|Always rude|Forbidden",
      "A trusted adult can help when a problem...|Is too big to solve alone|Is tiny|Is funny",
      "Your tone when speaking up should be...|Calm and firm|Mean|Whispering to yourself"
    ]),
    SC("Partner talk", "🧑‍🤝‍🧑", "In partner talk, take turns, listen with your eyes, and respond to what your partner says before adding your own idea. Equal turns keep it fair.", "Listen, respond, then add.", "Partner: 'I like the beach.' Me: 'Cool! I like it too because of the waves.'", [
      "In partner talk, each person gets...|An equal turn|All the turns|No turns",
      "Before adding your idea, first...|Respond to your partner|Interrupt|Change topics",
      "Listening with your eyes means you...|Look at your partner|Look away|Close them",
      "Which is a good response?|That's interesting! Tell me more.|Boring.|Okay whatever.",
      "If your partner talks too long, you can...|Kindly share that you'd like a turn|Walk off|Roll your eyes",
      "Partners show respect by...|Using kind words|Teasing|Ignoring",
      "A partner who shares less may need...|An invitation to speak|To be ignored|To be teased"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 4: lvl(4, L4), 5: lvl(5, L5), 6: lvl(6, L6) });
})();
