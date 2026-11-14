// Mind Lab Public Speaking. Levels 1-3, 20 lessons each.
const SPEAKING_LEVELS = (() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which one fits?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which one fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly, out loud." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const lvl = (n, ls) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.ceil(arr.length / 4);
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[1])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", [ms[0], ms[3], ms[4], ms[5], ms[9]]), mix(`Level ${n} Challenge`, ms)];
  };

  // ================= LEVEL 1 =================
  const L1 = [
    SC("Big voice, small voice", "📣", "Your voice can be soft or loud. A whisper is for a secret. An inside voice is for the classroom. A big voice is for the playground. Pick the voice that fits.", "Think about where you are and how many people need to hear you.", "In the library, I use a whisper or a quiet voice.", [
      "In the library you use...|A quiet voice|A big yell|A scream",
      "On the playground you can use...|A big outside voice|A whisper only|No voice",
      "A secret to a friend is shared with...|A whisper|A shout|A song",
      "In the classroom, most of the time, you use...|An inside voice|A scream|A roar",
      "Cheering at a game is a good time for...|A big voice|A whisper|A tiny voice",
      "A baby is sleeping. You use...|A soft voice|A loud voice|A shout",
      "A voice that is just right for the room is...|Kind and fitting|Always the loudest|Always silent"
    ]),
    SC("Loud enough for everyone", "🔊", "When you talk to a group, everyone needs to hear you. Use a strong, clear voice. Not a yell, just loud enough for the back row.", "Speak so the person farthest away can hear you, without yelling.", "I take a deep breath and speak so my friend in the back can hear me.", [
      "You are talking to the whole class. Your voice should be...|Loud enough for everyone|Too quiet|Only a whisper",
      "A friend in the back says 'I can't hear you.' You...|Speak a little louder|Stop talking|Whisper",
      "Which is too quiet?|Mumbling to your shoes|Talking clearly|Speaking to the group",
      "Which is just right?|A strong, clear voice|A scream|A whisper",
      "Why use a strong voice in a group?|So everyone can hear|To scare people|To be silly",
      "Yelling at the group is...|Too much|Perfect|Required"
    ]),
    SC("Speak clearly", "🗣️", "To speak clearly, open your mouth and say each word so people can understand you. Do not mumble.", "Say every word so it can be understood. Open your mouth, and keep your hands away from your face.", "I say 'My favorite animal is a dog' slowly and clearly.", [
      "To speak clearly, you should...|Open your mouth and say each word|Mumble|Hide your face",
      "Mumbling means...|Speaking too softly and unclearly|Speaking loud|Singing",
      "A clear speaker...|Says words so people can understand|Whispers into a sleeve|Talks while eating",
      "Talking with food in your mouth is...|Hard to understand|Clear|Polite",
      "If people say 'What?', you can...|Say it again clearly|Give up|Run away",
      "Covering your mouth with your hand makes it...|Harder to understand you|Easier to hear|Louder"
    ]),
    SC("Not too fast", "🐢", "If you talk too fast, people cannot follow. Slow down and breathe. Take small pauses between ideas.", "Go slower than you think you need. Pause at the end of a sentence.", "I say one idea, take a breath, then say the next idea.", [
      "Talking too fast makes it...|Hard to follow|Easy to follow|Silly",
      "A good speed is...|Slow and steady|Super fast|Frozen",
      "A pause is...|A short stop to breathe|A song|A shout",
      "When should you pause?|At the end of a sentence|Never|In the middle of every word",
      "Your friend talks very fast. They can...|Slow down and breathe|Talk faster|Whisper",
      "A good speaker...|Takes their time|Rushes|Runs around"
    ]),
    SC("Eyes on your listeners", "👀", "When you talk, look at your listeners. This is called eye contact. It shows you care and helps them listen.", "Look at the faces of your listeners, not just the floor.", "I look at my friends' faces while I talk, and smile.", [
      "When you talk to a group, you look at...|Your listeners|The floor only|The ceiling only",
      "Eye contact means...|Looking at the people you talk to|Closing your eyes|Staring at the wall",
      "Looking at your listeners shows you...|Care about them|Are bored|Are mad",
      "Where should a speaker look?|At the audience|At their shoes|At the clock",
      "If you feel shy, you can look at...|A friendly face|The floor the whole time|Nothing",
      "Eye contact helps people...|Feel included|Feel ignored|Fall asleep"
    ]),
    SC("Stand tall", "🧍", "Stand tall with your feet on the floor and your back straight. Keep your hands calm. Good posture helps your voice and helps you feel brave.", "Think: tall, steady, calm. Not slumping or wiggling.", "I stand with both feet on the floor and my shoulders back.", [
      "A good speaker stands...|Tall and steady|Slumped over|On one foot",
      "Your feet should be...|On the floor, steady|Dancing|In the air",
      "Wiggling and swaying can...|Distract listeners|Help everyone|Be required",
      "Good posture helps your...|Voice and confidence|Shoe size|Lunch",
      "While you speak, your hands should be...|Calm|Waving wildly|In your mouth",
      "Standing tall can help you feel...|Brave|Sleepy|Hungry"
    ]),
    SC("Good listening", "👂", "Good listeners use their eyes, ears and quiet bodies. They look at the speaker, stay quiet and think about what is said.", "A good listener's eyes look, ears hear, mouth is quiet and body is calm.", "I look at my friend and keep my mouth quiet while she speaks.", [
      "A good listener...|Looks at the speaker and stays quiet|Talks over the speaker|Looks away",
      "While someone talks, your mouth should be...|Quiet|Chattering|Eating gum loudly",
      "Which shows good listening?|Looking at the speaker|Whispering to a friend|Playing with toys",
      "When the speaker finishes you can...|Clap or say thank you|Boo|Walk off",
      "Your ears are for...|Listening|Eating|Writing",
      "Your eyes help you listen by...|Watching the speaker|Looking at the floor|Closing"
    ]),
    SC("Take turns", "🔄", "Taking turns means one person talks at a time. We wait for our turn, and then we share.", "One speaker at a time. Wait until the speaker is done.", "My friend finishes talking, and then it is my turn.", [
      "Taking turns means...|One person talks at a time|Everyone talks at once|Only the loudest talks",
      "Someone is talking. You...|Wait for your turn|Talk over them|Run away",
      "If you really want to speak, you can...|Raise your hand|Shout|Poke someone",
      "Who gets a turn?|Everyone|Only one kid|Nobody",
      "A friend takes a long turn. You...|Wait patiently|Interrupt|Leave",
      "Interrupting means...|Talking while someone else is talking|Waiting|Listening"
    ]),
    SC("Raise your hand", "🙋", "In class, we raise our hand when we want to talk. We wait to be called on. Then we speak.", "Raise a quiet hand and wait for the teacher to pick you.", "I raise my hand and wait until my teacher says my name.", [
      "To speak in class you first...|Raise your hand|Shout|Stand on a chair",
      "Your teacher has not called on you yet. You...|Keep waiting calmly|Yell out|Walk around",
      "Who picks who speaks?|The teacher|The loudest kid|Nobody",
      "A quiet raised hand shows you...|Have something to say|Are mad|Are asleep",
      "If you are called on, you...|Stand tall and speak clearly|Hide|Whisper",
      "If you are not called on, you...|Stay patient|Shout|Cry"
    ]),
    PL("Polite words", "🙏", "Polite words make people feel good. Use them when you speak.", "Use polite words every day, at home, school and with friends.", [
      "please::the word you use when you ask for something::🙏", "thank you::the words you say when someone helps you::😊", "excuse me::the words you say to get attention politely::🙋", "you're welcome::the words you say after someone says thanks::💛", "sorry::the word you say when you made a mistake::😔"
    ], { qd: "Which polite word fits?", qt: "When do we say this?" }),
    SC("Say hello", "👋", "Start with a friendly hello. Smile, look at the person, and say hello in a clear voice.", "A good hello has a smile, eyes and a clear voice.", "I smile, look at my teacher and say 'Good morning!'", [
      "A good hello has...|A smile and a clear voice|A frown|No sound",
      "When you meet a friend, you can say...|Hello!|Go away|Nothing",
      "A friendly hello starts with...|A smile|A frown|A yawn",
      "When you walk into class, you say...|Good morning|Grumble|Nothing at all",
      "A new student arrives. You say...|Hi, welcome!|Who are you?|Go back",
      "To say hello nicely, you look at...|The person|Your shoes|The ceiling"
    ]),
    SC("Introduce yourself", "😊", "To introduce yourself, say hello, then say your first name. You can add one thing you like. Share only what is safe and kind.", "Say hello, your first name and something you like. Do not share private things.", "'Hi, my name is Sam. I like soccer.'", [
      "To introduce yourself you can say...|Hi, my name is Sam|Go away|Nothing",
      "A good introduction starts with...|Hello|A yawn|A frown",
      "You can add something you like, such as...|I like soccer|My home address|My secret password",
      "In a group introduction, you share your...|First name|Phone number|Home address",
      "A friendly introduction is said...|With a smile|With a scowl|In a mumble",
      "After the introduction you can say...|Nice to meet you|Go away|Whatever"
    ]),
    PL("Show and tell steps", "🎒", "Show and tell has steps. Follow them in order to give a great talk.", "Practice your show and tell at home first.", [
      "First::choose something you love to share::🎁", "Next::practice what you will say::🗣️", "Then::stand tall and show it to everyone::🙌", "Last::say thank you and answer questions::😊"
    ], { qd: "Which step is this?", qt: "What do you do at this step?" }),
    SC("Full sentence answers", "💬", "When someone asks a question, answer with a full sentence. A full sentence has a who and a what, and it tells the whole idea.", "Say your answer as a whole sentence, using words from the question.", "Question: 'What is your pet's name?' Answer: 'My pet's name is Rex.'", [
      "What is your favorite color? Pick the best answer.|My favorite color is blue.|Blue|Color",
      "What do you like to eat? Pick the best answer.|I like to eat apples.|Apples|Eat",
      "What is your favorite animal? Pick the best answer.|My favorite animal is a dog.|Dog|Animal",
      "Where do you live? Pick the best answer.|I live in a house.|House|Live",
      "What do you do at recess? Pick the best answer.|I play on the swings.|Swings|Play",
      "What do you like to read? Pick the best answer.|I like to read funny books.|Books|Read",
      "What is your favorite game? Pick the best answer.|My favorite game is tag.|Tag|Game"
    ]),
    SC("Calm down and breathe", "🌬️", "If you feel nervous before you talk, take a deep breath. Breathe in slowly through your nose, hold it a moment, then breathe out slowly.", "Slow breaths calm your body. Fast, tiny breaths do not.", "I breathe in as if I smell a flower, and out as if I blow out a candle.", [
      "When you feel nervous, a good thing to do is...|Take a deep breath|Run away|Scream",
      "A deep breath is...|Slow and calm|Fast and tiny|Loud",
      "You breathe in through your...|Nose|Ears|Elbow",
      "Nervous feelings are...|Normal|Bad|Shameful",
      "Before speaking you can also...|Smile and stand tall|Hide|Tell yourself you can't",
      "A calm voice comes after...|Slow breaths|Running|Shouting"
    ]),
    SC("Be kind to speakers", "💛", "Everyone feels nervous sometimes. Be kind when someone is speaking. Listen, smile, and clap at the end. Never tease.", "Treat speakers the way you want to be treated.", "When my friend finishes, I clap and say 'Good job!'", [
      "A friend is nervous while speaking. You...|Smile kindly|Make fun|Laugh",
      "When a speaker finishes you...|Clap|Boo|Leave",
      "If a speaker makes a mistake, you...|Stay kind|Laugh|Point",
      "A kind thing to say after a talk is...|Good job!|That was bad|Boring",
      "Teasing a speaker is...|Not okay|Fun|Required",
      "You want others to be kind when you speak. So you...|Are kind to them|Tease them|Ignore them"
    ]),
    PL("Beginning, middle, end", "📖", "A short talk has a beginning, a middle and an end.", "Start strong, share your idea, and finish with thank you.", [
      "Beginning::say hello and tell your topic::🌅", "Middle::share your facts or story::🍕", "End::say thank you for listening::🌇"
    ], { qd: "Which part of a talk is this?", qt: "What do you do in this part?" }),
    SC("Hands and face", "🤲", "Your face and hands can help your words. A smile shows you are happy. A pointing hand can show something. But keep your movements calm.", "Use small, calm gestures that match your words.", "I smile when I talk about my pet, and I hold my hands wide to show 'big'.", [
      "A smile can show you are...|Happy|Angry|Bored",
      "A gesture can help you...|Show what you mean|Make noise|Hide",
      "Gestures should be...|Calm and matching your words|Wild and silly|Hidden",
      "To show 'big' you could...|Hold your hands wide|Cover your eyes|Cross your arms",
      "To show 'small' you could...|Hold your fingers close|Stretch your arms|Jump",
      "Waving your hands wildly while you talk is...|Distracting|Required|Best"
    ])
  ];

  // ================= LEVEL 2 =================
  const L2 = [
    SC("Four kinds of voices", "🎚️", "A whisper is very quiet. An inside voice is for the room. A speaking voice is strong and clear for a group. An outside voice is big and loud for playing outdoors.", "Match your voice to the place and the people.", "In a big room, I use my strong speaking voice so everyone can hear.", [
      "For a talk to your class, use...|A strong speaking voice|A whisper|A scream",
      "For telling a secret, use...|A whisper|An outside voice|A shout",
      "For a game outside, you may use...|An outside voice|A whisper only|No voice",
      "In a quiet library, you use...|A whisper or quiet voice|An outside voice|A shout",
      "Your speaking voice is...|Strong and clear|Tiny|Shouting",
      "When your listeners are far away, you should...|Speak louder, not yell|Whisper|Stop"
    ]),
    SC("Pause and breathe", "⏸️", "Pausing helps listeners think about what you said. It also helps you breathe and remember your next idea.", "Pause after a big idea or at the end of a sentence.", "I say 'Dogs can run fast.' Then I pause before my next fact.", [
      "Pausing helps listeners...|Think about what you said|Fall asleep|Run away",
      "A good time to pause is...|After an important idea|In the middle of a word|Never",
      "If you forget what to say, you can...|Take a breath and pause|Run away|Cry",
      "A pause is a short...|Rest in your talking|Song|Jump",
      "Talking without any pauses can feel...|Too fast|Just right|Silent",
      "A pause also helps you...|Breathe and remember|Hide|Dance"
    ]),
    SC("Eye contact around the room", "👀", "Look at different people in the room, not just one. This makes everyone feel included. Look at one person for a moment, then move to another.", "Share your looks. Spread them around the room.", "I look at the left side, the middle, and then the right side of the room.", [
      "Eye contact in a group means...|Looking at different people|Looking at one person only|Looking at the clock",
      "Looking around the room helps listeners...|Feel included|Feel ignored|Fall asleep",
      "A good way to look around is...|Look at one person, then another|Stare at the floor|Close your eyes",
      "If looking is hard, you can look at...|A friendly face|The floor the whole time|Your hands only",
      "Staring at one person for the whole talk is...|Not best|Best|Required",
      "Where do you look first?|At your listeners|At your shoes|At the ceiling"
    ]),
    SC("Talking to a group or a friend", "👥", "Talking to a friend is quiet and close. Talking to a group is louder, slower and clearer, because many people need to hear.", "More people means a stronger voice and slower speed.", "At a talk, I speak louder and slower than I do at the lunch table.", [
      "A talk to the class should be...|Louder and clearer than talking to a friend|Quieter|Silent",
      "A friend talk is...|Close and quiet|Loud like a stadium|Silent",
      "With a group, your speed should be...|A bit slower|Faster|Frozen",
      "Why speak slower to a group?|So everyone can follow|So it takes forever|To bore them",
      "Which is a group talk?|Telling the class about your pet|Whispering to a friend|Humming alone",
      "Where do you aim your voice in a group?|To the back of the room|At the floor|At your hand"
    ]),
    SC("Listening manners", "🙉", "A good listener does not interrupt. They wait until the speaker is finished, nod, and can ask a question after.", "Wait, look, nod, ask later.", "I nod when my friend shares a fact, and I ask a question when she is done.", [
      "A good listener...|Waits and does not interrupt|Interrupts|Leaves",
      "Nodding shows you...|Are listening|Are sleepy|Are mad",
      "When you have a question, you...|Wait until the speaker is done|Shout it out|Say nothing ever",
      "While listening, your hands should be...|Still and calm|Making noise|Throwing things",
      "A speaker finishes. You can...|Ask a question or say thanks|Boo|Walk out",
      "Talking while someone else talks is...|Interrupting|Listening|Helping"
    ]),
    SC("Choose a show and tell", "🎁", "Pick something safe and fun to share. It should be easy to carry, kind, and something you can talk about. It should not be dangerous or private.", "Choose something safe and easy to talk about that belongs to you.", "A favorite toy, a rock you found, or a book are great choices.", [
      "A good show and tell item is...|A favorite book|A sharp knife|A secret",
      "A safe item is one that...|Cannot hurt anyone|Is dangerous|Is loud and scary",
      "Which is a good thing to talk about?|A shell from the beach|A password|Your home address",
      "Before bringing something, you ask...|A grown-up|Nobody|A stranger",
      "Something you can easily carry is...|A good choice|Impossible|A car",
      "Your item should be something you...|Can say a lot about|Know nothing about|Found on the road"
    ]),
    PL("Describing words", "🔍", "When you describe something, tell about its size, color, shape and feel. This helps your listeners picture it.", "Use at least two describing words when you talk about an item.", [
      "size::how big or small it is::📏", "color::what it looks like, like red or blue::🎨", "shape::round, square or long::🔷", "texture::how it feels, like soft or bumpy::✋"
    ], { qd: "Which describing word is this?", qt: "What does this describing word tell?" }),
    SC("Introduce a friend", "🤝", "To introduce a friend, say their name and one kind thing about them. Say 'This is my friend Mia. She likes to draw.' Always be kind.", "Use their first name, say something kind, and look at both people.", "'This is Leo. He is good at puzzles.'", [
      "To introduce a friend you say...|This is my friend Mia|Hey you|Nothing",
      "A good thing to add is...|She likes to draw|She is weird|He is boring",
      "When introducing, you should be...|Kind|Mean|Silent",
      "Should you share a friend's home address?|No|Yes|Only if asked",
      "A friend feels shy. You...|Smile and help|Tease|Push",
      "After the introduction, the people say...|Nice to meet you|Go away|Nothing"
    ]),
    SC("Polite words in action", "🙏", "Polite words show respect. Say please when you ask, thank you when someone helps, and excuse me when you need to pass or speak up.", "Pick the answer that uses polite words.", "'Excuse me, may I ask a question, please?'", [
      "You want a turn. Which is polite?|May I have a turn, please?|Give it!|Move!",
      "Someone gives you a pencil. You say...|Thank you|Nothing|Give me more",
      "You need to walk past someone. You say...|Excuse me|Move it|Out of the way",
      "Someone thanks you. You say...|You're welcome|Whatever|Nothing",
      "You bump a friend by accident. You say...|I'm sorry|Not my problem|Watch out",
      "You want to ask a question. You say...|Excuse me, may I ask a question?|Hey!|Tell me!"
    ]),
    SC("Full sentence answers", "💬", "A full sentence answer repeats part of the question and gives the whole idea. 'What is your favorite season?' 'My favorite season is summer.'", "Say the whole thought, using words from the question.", "Question: 'Where do you sit?' Answer: 'I sit next to the window.'", [
      "What is your favorite season? Pick the best answer.|My favorite season is summer.|Summer|Season",
      "What do you do after school? Pick the best answer.|After school I play outside.|Play|Outside",
      "Who is your best friend? Pick the best answer.|My best friend is Mia.|Mia|Friend",
      "What is your favorite food? Pick the best answer.|My favorite food is pasta.|Pasta|Food",
      "What is the weather today? Pick the best answer.|Today the weather is sunny.|Sunny|Weather",
      "How was your weekend? Pick the best answer.|My weekend was fun.|Fun|Weekend",
      "What is your favorite sport? Pick the best answer.|My favorite sport is soccer.|Soccer|Sport"
    ]),
    SC("A great first sentence", "🚀", "Start your talk with a sentence that gets people interested. You can say hello and tell your topic, ask a question, or share a fun fact.", "A good start is clear, friendly and short.", "'Hello! Today I will tell you about my pet turtle.'", [
      "Which is a good first sentence?|Hello! Today I will tell you about my turtle.|Um... I forgot.|Uh... yeah.",
      "Which is a good first sentence?|Did you know a turtle can live a long time?|I don't want to be here.|Never mind.",
      "A good first sentence is...|Clear and friendly|Mumbled|Rude",
      "Which is a good start?|Hi, I'm going to share my favorite book.|Can I stop?|I have nothing.",
      "Starting with a question can...|Get people interested|Bore people|Scare people",
      "A great start gets your listeners to...|Pay attention|Fall asleep|Leave"
    ]),
    SC("A great ending", "🏁", "End your talk with a short wrap-up and a thank you. You can say the big idea again and then say 'Thank you for listening.'", "A good ending is short and polite.", "'That is why turtles are special. Thank you for listening!'", [
      "A good ending includes...|Thank you for listening|I'm done, bye!|Nothing",
      "At the end you can...|Say the main idea again|Run off|Say nothing",
      "Which is a good ending?|That is why I love dogs. Thank you!|Um, I don't know.|Whatever.",
      "After you say thank you, listeners...|Clap|Boo|Leave",
      "A short ending is...|Clear and polite|Long and rambling|Silent",
      "Ending with 'thank you' shows you are...|Polite|Rude|Mad"
    ]),
    PL("Order of a talk", "🪜", "A talk goes in order: beginning, middle and end. Each part has a job.", "Plan the three parts before you speak.", [
      "Beginning::say hello and tell your topic::🌅", "Middle::share your main ideas and facts::🍕", "End::wrap up and say thank you::🌇", "Practice::saying it out loud before the day::🗣️"
    ], { qd: "Which part is this?", qt: "What is this part for?" }),
    SC("Nervous is normal", "🦋", "Many people feel butterflies in their tummy before speaking. That is normal. Breathe slowly, smile, and remember that your listeners want you to do well.", "Calm tricks: slow breathing, standing tall, and thinking kind thoughts.", "I breathe in slowly three times, and tell myself 'I can do it.'", [
      "Feeling nervous before a talk is...|Normal|Very rare|A bad sign",
      "Which helps when you feel nervous?|Slow breaths|Running|Yelling",
      "Your listeners usually want you to...|Do well|Fail|Hurry",
      "A kind thought to tell yourself is...|I can do it|I will fail|I hate this",
      "Practicing can make you...|Feel braver|Feel worse|Feel dizzy",
      "Butterflies in the tummy are a sign that you...|Care about doing well|Are sick|Are in trouble"
    ]),
    SC("Gestures and your face", "🙂", "Use your face and hands to show your meaning. A smile, a pointing finger or wide arms can help. Keep gestures calm and matching your words.", "Match your face and hands to your words.", "When I say 'This is huge,' I open my arms wide.", [
      "When you talk about something happy, your face can...|Smile|Frown|Yawn",
      "To show 'up', you could...|Point up|Point down|Cover your eyes",
      "Too many big gestures can be...|Distracting|Perfect|Needed",
      "To show a small thing, you can...|Hold your fingers close together|Stretch your arms wide|Stomp",
      "A gesture should...|Match your words|Hide your words|Be random",
      "A calm, friendly face makes listeners feel...|Welcome|Worried|Bored"
    ]),
    SC("Ask a good question", "❓", "A good question is kind, clear and about the talk. Start with who, what, where, when, why or how. Raise your hand and wait.", "Make it polite and about what the speaker said.", "'How did you find that shell?'", [
      "Which is a good question after a talk?|How did you make it?|Why are you so silly?|Can I go home?",
      "A good question is about...|What the speaker said|Something unrelated|A secret",
      "Before asking, you...|Raise your hand|Shout|Run",
      "Which is kind?|What is your favorite part?|You are bad at this.|That was boring.",
      "Question words are...|Who, what, where, when, why, how|Fish, cat, dog|Red, blue, green",
      "After a speaker answers, you say...|Thank you|Nothing|That's wrong"
    ]),
    SC("Kind comments", "👏", "After a talk, say something kind and true. 'I liked your picture!' or 'I learned something new.' Kind comments help speakers feel brave.", "Say something true and kind about the talk.", "'I liked how you spoke clearly.'", [
      "Which is a kind comment?|I liked your story!|That was dull.|You talk funny.",
      "Which is kind and true?|I learned something new.|You are the worst.|Boring.",
      "A kind comment makes a speaker feel...|Proud and brave|Sad|Scared",
      "After a talk you can say...|Great job!|Booo!|Nothing|",
      "A good comment is about...|Something you liked|Something mean|Something private",
      "If you did not enjoy a talk, you can still say...|Thank you for sharing|It was bad|I hated it"
    ].map(r => r.replace(/\|$/, ""))),
    SC("Practice makes brave", "💪", "The more you practice, the braver you feel. Say your talk out loud to a mirror, a stuffed animal, or a family member. Practice a few times, not just once.", "Practice out loud, a little at a time.", "I practice my talk three times before the big day.", [
      "Practice makes you...|Braver and better|More nervous|Quieter",
      "A good way to practice is...|Say it out loud|Think it only once|Never practice",
      "You can practice with...|A mirror or family|A stranger online|Nobody",
      "How many times should you practice?|A few times|Never|Once at the last minute",
      "After you practice, you feel...|More ready|Less ready|Silly",
      "If you make a mistake while practicing...|Try again|Quit|Cry"
    ])
  ];

  // ================= LEVEL 3 =================
  const L3 = [
    SC("Know your listeners", "👥", "Before a talk, think about who is listening. What do they know? What will they enjoy? Use words they understand.", "Choose simple words and topics that your listeners will enjoy.", "To talk to kindergarteners, I use simple words and a picture.", [
      "Before a talk, you think about...|Who will listen|Nothing|Only yourself",
      "For young kids you use...|Simple words|Huge hard words|Whispers",
      "Your listeners like talks that are...|Interesting and clear|Confusing|Silent",
      "If listeners look confused, you can...|Explain more simply|Speak faster|Give up",
      "A good speaker...|Cares about the listeners|Ignores them|Hides",
      "Using words your listeners understand is...|Kind and helpful|Silly|Not needed"
    ]),
    SC("The main idea", "🎯", "Every talk has one main idea: what you most want people to remember. Say it clearly at the start and at the end.", "Ask: what is the one big thing I want them to know?", "My main idea is: dogs make great pets.", [
      "A main idea is...|The big point of your talk|A small detail|A joke only",
      "Where do you say your main idea?|At the start and the end|Never|Only in the middle",
      "A talk with a clear main idea is...|Easy to follow|Hard to follow|Silent",
      "Which is a main idea?|Dogs make great pets.|My dog is brown.|Hi.",
      "Details in your talk should...|Support the main idea|Have nothing to do with it|Be hidden",
      "If you have too many ideas, you...|Pick the most important one|Say them all|Skip the talk"
    ]),
    PL("Parts of a talk", "🧱", "A talk has an opening, a body and a closing. The body has your main points.", "Plan each part before you speak.", [
      "opening::the start, with a hello and your topic::🌅", "body::the middle, with your main points::🍕", "closing::the end, with a wrap-up and thank you::🌇", "topic::what your talk is about::💡", "main point::an important idea in your talk::📌"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Fun facts to share", "🤩", "A fun fact makes your talk exciting. Make sure it is true! Share facts you are sure about, and say them in your own words.", "A fun fact must be true. Pick the one that is.", "A true fun fact: an octopus has three hearts.", [
      "Which is a true fun fact?|An octopus has three hearts.|An octopus has no brain and no arms.|An octopus has ten hearts.",
      "Which is a true fun fact?|A butterfly tastes with its feet.|A butterfly eats rocks.|A butterfly has a tail like a fish.",
      "Which is a true fun fact?|Honey can last a very long time.|Honey is made of rocks.|Honey grows on trees like apples.",
      "Which is a true fun fact?|A banana is a kind of berry.|A banana is a kind of fish.|A banana is made of plastic.",
      "Which is a true fun fact?|The sun is a star.|The sun is a planet.|The sun is a moon.",
      "Which is a true fun fact?|A giraffe has seven neck bones, like you.|A giraffe has a hundred neck bones.|A giraffe has no neck.",
      "Before you share a fun fact, you should...|Make sure it is true|Make it up|Hide where you read it"
    ]),
    SC("Say a fact in a sentence", "🗣️", "Share a fact in a full sentence. Speak clearly. 'A butterfly tastes with its feet.' Then pause so listeners can think.", "Use a full sentence with a who and a what, then pause.", "Instead of 'bees', say 'Bees make honey.'", [
      "Which is the best way to share a fact?|Bees make honey.|Bees|Honey|",
      "Which is a full sentence?|Owls hunt at night.|Owls night|Night hunt",
      "Which is the best way to share a fact?|A giraffe is very tall.|Giraffe tall|Tall",
      "Which is a full sentence?|The moon goes around Earth.|Moon Earth|Around",
      "After a fact, a good speaker...|Pauses|Rushes on|Whispers",
      "A full sentence has...|A who or what and an action|Only one word|Only a color"
    ].map(r => r.replace(/\|$/, ""))),
    SC("Voice and speed check", "🎚️", "Check your voice: Is it strong enough? Clear? Not too fast? Do you pause? A great speaker checks all of these.", "Think: loud enough, clear, slow enough, with pauses.", "I check: can the back row hear me, and am I going slowly?", [
      "A good speaker's voice is...|Strong and clear|Tiny|Shouty",
      "Speed should be...|Not too fast|Super fast|Frozen",
      "Pauses help...|Listeners think|Nothing|The clock",
      "If someone says 'I can't hear you,' you...|Speak up a little|Whisper|Run off",
      "If people look lost, you may be going...|Too fast|Too slow|Just right",
      "A clear voice means...|Words are easy to understand|Mumbling|Yelling"
    ]),
    SC("Note cards", "🗒️", "Note cards help you remember. Write only a few key words, large enough to read. Do not read every word. Look up at your listeners.", "Key words only, big writing, and look at your audience.", "My card says 'dogs - fur - tail - bark' instead of whole sentences.", [
      "A note card should have...|A few key words|Every word of the talk|A drawing only",
      "Your writing on a note card should be...|Big and neat|Tiny|Messy",
      "While you speak you should...|Look up at your listeners|Read the whole time|Hide behind the card",
      "A note card helps you...|Remember your ideas|Skip the talk|Fall asleep",
      "Which is a good card?|dogs - fur - bark|A whole page of sentences|A blank card",
      "When you glance at your card, you then...|Look back up|Keep reading|Put your head down"
    ]),
    SC("Practice steps", "🔁", "Practice in steps: say it to a mirror, then to a family member, then stand up and say it all the way through. Ask for kind tips.", "Practice out loud, standing up, a few times.", "I practice in front of my mom and ask her for one kind tip.", [
      "A good way to practice is...|Say it out loud|Think it only|Never practice",
      "Practice with someone, then ask for...|A kind tip|A prize|Nothing",
      "Practicing standing up helps you...|Feel ready|Feel worse|Forget",
      "How many times should you practice?|A few times|Never|Once",
      "A mirror helps you see...|Your face and body|Your homework|Your lunch",
      "After practice, you feel...|More confident|Less ready|Sleepy"
    ]),
    SC("Look around the room", "👁️", "Scan the room as you speak. Look at one person for a moment, then another. Cover the left, middle and right. This is called scanning.", "Scan slowly like a lighthouse: left, middle, right.", "I look left, then middle, then right while I speak.", [
      "Scanning means...|Looking around the room|Staring at the floor|Closing your eyes",
      "A good scan covers...|Left, middle and right|Only the left|Only the floor",
      "Looking at one person for a moment helps them...|Feel included|Feel scared|Fall asleep",
      "If you get nervous you can look at...|A friendly face|Nothing|The floor only",
      "Eye contact makes your talk feel...|Friendly|Mean|Silent",
      "Staring at the clock the whole time is...|Not helpful|Best|Needed"
    ]),
    SC("Body language", "🧍", "Your body speaks too. Stand tall, keep your hands out of your pockets, and face your listeners. Do not turn your back or hide.", "A tall, open and calm body tells listeners you are ready.", "I stand tall, face the class and keep my hands calm.", [
      "Good body language is...|Tall and open|Slumped and hidden|Wiggly",
      "You should face...|Your listeners|The wall|The floor",
      "Hands in pockets or behind your back can look...|Less open|More friendly|Perfect",
      "Turning your back to the class is...|Not okay|Great|Required",
      "Calm hands help you...|Look steady|Look silly|Look sleepy",
      "A friendly body language includes...|A smile|A scowl|A yawn"
    ]),
    SC("Say why with because", "💡", "When you share an idea, you can explain why with 'because'. 'I like dogs because they are friendly.'", "Add because and a reason to your sentence.", "'I like rainy days because I can read inside.'", [
      "Which sentence has a reason?|I like dogs because they are friendly.|I like dogs.|Dogs.",
      "Which sentence has a reason?|I like soccer because it is fun.|I like soccer.|Soccer.",
      "The word that gives a reason is...|because|and|then",
      "Which is a good answer to 'Why do you like summer?'|I like summer because I can swim.|Summer.|Yes.",
      "Why give a reason?|It helps listeners understand|It makes the talk longer|It is a trick",
      "Which sentence has a reason?|I read books because I love stories.|I read books.|Books."
    ]),
    SC("Class discussion", "🪑", "In a discussion, we take turns. We listen, wait, and build on what others said. We say 'I agree' or 'I see it differently' politely.", "Listen first, then add your idea kindly.", "'I agree with Mia, and I also think...'", [
      "In a discussion we...|Take turns|Talk all at once|Stay silent",
      "A polite way to disagree is...|I see it differently|You're wrong|That's silly",
      "Before adding your idea, you...|Listen|Interrupt|Yell",
      "Which is polite?|I agree with Sam, and I think...|Sam is wrong!|Be quiet!",
      "If you disagree, you stay...|Kind|Mean|Silent forever",
      "Building on an idea means...|Adding to what was said|Ignoring it|Making fun"
    ]),
    SC("Active listening", "👂", "Active listeners look at the speaker, nod, and think about the message. After, they can say one thing they learned.", "Eyes, ears, brain and a kind heart.", "I tell my friend: 'I learned that owls hunt at night.'", [
      "An active listener...|Thinks about what is said|Daydreams|Talks over the speaker",
      "Nodding shows you are...|Listening|Sleepy|Mad",
      "After a talk you can say...|One thing you learned|Nothing at all|Something mean",
      "Looking at the speaker shows...|Respect|Boredom|Anger",
      "Daydreaming while someone speaks is...|Not good listening|Good listening|Required",
      "A good listener remembers...|Key ideas|Nothing|Only the first word"
    ]),
    SC("Open questions", "🔑", "Some questions have a short answer, like yes or no. Open questions need a longer answer, like 'How did you make it?' Open questions help us learn more.", "Open questions start with how, why or what.", "Instead of 'Do you like dogs?' ask 'Why do you like dogs?'", [
      "Which is an open question?|How did you make it?|Is it red?|Is it big?",
      "Which is an open question?|Why do you like turtles?|Do you like turtles?|Is it a turtle?",
      "Open questions often start with...|How, why or what|Yes or no|Silence",
      "Which question gives a longer answer?|What did you learn?|Did you learn?|Okay?",
      "A yes or no question has...|A short answer|A very long answer|No answer",
      "Good questions are always...|Kind|Mean|Silly"
    ]),
    SC("Mistakes happen", "🌱", "Everyone makes mistakes when they speak. If you stumble, take a breath, smile, and keep going. Listeners usually do not mind.", "Pause, breathe and go on. Be kind to yourself.", "I say the wrong word, smile, fix it and continue.", [
      "You mix up a word. You...|Take a breath and keep going|Run away|Stop forever",
      "Everyone makes mistakes when...|They speak|Never|On Mondays only",
      "Listeners usually...|Are kind about mistakes|Laugh meanly|Leave",
      "A good thing to tell yourself is...|It's okay, I'll keep going|I'm terrible|I quit",
      "If you forget your next idea, you can...|Pause and look at your card|Run|Cry",
      "Trying again is...|Brave|Silly|Bad"
    ]),
    PL("Calm-down toolbox", "🧰", "When you feel nervous, you can use tools to calm down. Here are some good ones.", "Pick one or two tools that work best for you.", [
      "deep breath::breathe in slowly and out slowly::🌬️", "stand tall::feet steady and shoulders back::🧍", "smile::a friendly face helps you relax::😊", "positive thought::tell yourself 'I can do it'::💬", "practice::saying the talk out loud many times::🔁"
    ], { qd: "Which tool is this?", qt: "What does this tool do?" }),
    SC("Kind feedback", "💬", "Feedback helps a speaker get better. Be kind, specific and helpful. Say something you liked first, then one idea to try.", "Start with something good, then offer one friendly idea.", "'I liked your loud voice. Next time you could try a pause.'", [
      "Kind feedback begins with...|Something you liked|A complaint|A joke at their expense",
      "Which is kind feedback?|I liked your clear voice.|You were bad.|Boring.",
      "Which is helpful?|Try one pause after each fact.|You stink.|No one cares.",
      "Feedback should be...|Kind and specific|Mean|Vague and rude",
      "After you say what you liked, you can say...|One idea to try|Nothing else|Something mean",
      "Why give feedback?|To help the speaker grow|To make them sad|To be loud"
    ]),
    SC("A great speaker checklist", "✅", "A great speaker has a clear main idea, speaks clearly and not too fast, looks at the audience, stands tall, is kind, and says thank you.", "Run through the checklist: voice, eyes, body, kindness, thank you.", "Before I start, I check: strong voice, eye contact, tall body.", [
      "A great speaker's voice is...|Strong and clear|Tiny|Rushed",
      "A great speaker looks at...|The audience|The floor|The ceiling",
      "A great speaker's body is...|Tall and calm|Slumped and wiggly|Hidden",
      "A great speaker ends by saying...|Thank you for listening|Nothing|Bye, losers",
      "A great speaker is kind to...|Everyone|Nobody|Only themselves",
      "A great speaker's talk has...|A clear main idea|No point|Only jokes"
    ])
  ];

  return { 1: lvl(1, L1), 2: lvl(2, L2), 3: lvl(3, L3) };
})();
