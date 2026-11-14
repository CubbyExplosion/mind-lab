// ext/speaking-7-9.js  Mind Lab Speaking & Listening, levels 7-9 (60 lessons)
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
  const lvl = (n, ls) => [...ls, MIX("Mixed practice", [ls[0], ls[2], ls[4], ls[7], ls[9], ls[12], ls[15], ls[17]]), MIX(`Level ${n} Challenge`, ls)];

  // ================= LEVEL 7 =================
  const L7 = [
    SC("Claim and evidence", "⚖️", "A claim is the point you want listeners to accept. Evidence is a fact, example or number that shows the claim is true. A claim with no evidence is only a guess.", "Ask yourself: is this the point, or is it the proof for the point?", "'Our school needs a garden.' is a claim. 'Gardens help kids learn about plants.' is a reason to support it.", [
      "'Recess helps kids focus.' is a...|Claim|Greeting|Goodbye",
      "Evidence is something that...|Shows a claim is true|Makes the room warm|Fills the time",
      "Which is the best evidence for 'Reading is good for you'?|Reading builds vocabulary, studies show|I just like it|Everyone knows|",
      "A claim with no evidence is only...|An opinion or guess|A proven fact|A story",
      "Which is a claim?|Our class should recycle more|The bin is blue|Paper is made from wood",
      "Which is evidence?|Our class threw out 40 bottles this week|Recycling is cool|I feel like it",
      "After you state a claim, listeners wait to hear...|Your evidence|Your lunch order|A joke",
      "Strong evidence is...|Specific and true|Vague and loud|Long and silly"
    ].map(r => r.replace(/\|$/, ""))),
    SC("Parts of a speech", "🧱", "Most speeches have three parts. The introduction grabs attention and says the topic. The body gives the main points. The conclusion wraps up and leaves a final thought.", "Think about where in the speech each job happens: start, middle or end.", "Telling a fun fact at the very start is part of an introduction.", [
      "Which part tells your main points?|The body|The conclusion only|The title card",
      "Which part comes last?|The conclusion|The introduction|The body",
      "Grabbing attention is the job of the...|Introduction|Conclusion|Questions at the end",
      "A final thought for listeners belongs in the...|Conclusion|Introduction|Middle of the body",
      "Which part usually has the most details?|The body|The title|The thank-you",
      "A speech with no conclusion feels...|Unfinished|Perfect|Extra long",
      "Saying 'Today I will talk about sharks' is part of the...|Introduction|Conclusion|Body",
      "The three parts in order are...|Introduction, body, conclusion|Body, conclusion, introduction|Conclusion, body, introduction"
    ]),
    SC("Hooks that grab", "🎣", "A hook is the first line that makes people want to listen. Good hooks include a surprising fact, a question, a short story or a bold statement.", "Pick the opening that would make a listener lean forward.", "'Did you know a cat can jump five times its height?' is a hook that starts with a question.", [
      "Which is the best hook for a talk about the ocean?|Did you know the ocean covers most of Earth?|Um, so, today, I guess|My talk is next",
      "A hook is used...|At the very start|At the very end|Never",
      "'Imagine waking up on Mars.' is a hook that asks you to...|Picture something|Leave|Sleep",
      "Which is a weak opening?|Uh, I forgot what I was going to say|Here is a surprising fact|Picture this scene",
      "A surprising fact is a good hook because it...|Makes listeners curious|Bores them|Confuses the topic",
      "Which is a question hook?|Have you ever wondered why the sky is blue?|The sky is blue|Blue is nice",
      "A hook should connect to your...|Topic|Shoes|Lunch",
      "Starting a short story as a hook is called a...|Story opening|Final bow|Sneeze"
    ]),
    SC("Gestures that help", "🙌", "Gestures are hand and body movements that match your words. Open hands feel friendly. Counting on your fingers helps listeners follow your points. Too much fidgeting is distracting.", "Choose movements that support the words and stay calm.", "When I say 'three reasons', I hold up three fingers.", [
      "Counting on fingers helps listeners follow your...|Points|Weather|Shoes",
      "Which is a helpful gesture?|Open hands to welcome|Hiding hands in pockets forever|Spinning pens",
      "Fidgeting with your sleeve can be...|Distracting|Helpful|Required",
      "A gesture should match your...|Words|Mood at lunch|Neighbor's shirt",
      "Showing 'big' with wide arms is a gesture that shows...|Size|Time|Color",
      "Pointing at your audience angrily feels...|Rude|Friendly|Funny",
      "Too many gestures can...|Pull attention from your message|Make you taller|Help you rest",
      "Natural gestures happen when you...|Relax and mean what you say|Freeze|Memorize every move"
    ]),
    SC("Posture and stance", "🧍", "Your stance tells listeners how you feel before you say a word. Stand tall with feet apart a little, shoulders relaxed, and face the audience. Slouching or swaying can look unsure.", "Think of standing steady like a tree with both feet on the ground.", "I plant both feet about shoulder-width apart and keep my weight even.", [
      "A good speaking stance is...|Tall and steady|Slouched|Hopping",
      "Swaying side to side can look...|Unsure|Confident|Strong",
      "You should face...|The audience|The wall|The floor",
      "Feet should be...|Planted and a little apart|Crossed in a knot|Dancing",
      "Relaxed shoulders show you are...|Calm|Angry|Asleep",
      "Standing with your back to listeners hides your...|Face and voice|Shoes|Notes only",
      "Good posture also helps your...|Breathing and voice|Eyesight|Handwriting",
      "Leaning on a table the whole time looks...|Too casual for a formal talk|Perfect always|Powerful"
    ]),
    SC("Cut the filler words", "🔇", "Filler words like 'um', 'uh', 'like' and 'you know' sneak in when we are thinking. A short silent pause is stronger than a filler. Practice and slower speech reduce them.", "Replace the sound with a calm pause.", "Instead of saying 'um', I stop for a breath and then continue.", [
      "Which is a filler word?|Um|Because|Today",
      "Instead of a filler, you can use a...|Pause|Shout|Whistle",
      "A silent pause makes you sound...|Thoughtful|Lost|Bored",
      "Which helps reduce fillers?|Practicing your talk|Talking faster|Mumbling",
      "'Like, you know, um' is mostly...|Filler|Evidence|A hook",
      "Fillers often appear when we are...|Thinking of the next words|Sleeping|Eating",
      "Talking more slowly makes fillers...|Less likely|More likely|Louder",
      "A friend can help you by...|Counting your fillers during practice|Laughing at you|Taking your notes"
    ]),
    SC("Listen for point of view", "👀", "Every speaker has a point of view, which is how they see a topic. A pizza shop owner may say pizza is the best food. Listen for who is speaking and what they want.", "Ask: who is talking, and what might they want me to think?", "A toy company says its toy is the best. That is its point of view.", [
      "A shoe seller says shoes are a must-have. This shows their...|Point of view|Age|Home town",
      "To spot point of view, ask...|Who is speaking and what do they want?|What time is it?|Is it raining?",
      "A speaker who earns money from a product may...|Favor that product|Dislike it|Forget it",
      "Two people can describe the same game differently because of...|Their point of view|The rules changing|Gravity",
      "Listening for point of view helps you...|Think carefully about what you hear|Stop listening|Agree with everything",
      "The captain of the winning team and the losing team may...|See the game differently|See it identically|Never watch",
      "A fair listener also listens to...|Other points of view|Only their friends|Nobody",
      "A speaker says 'Every kid loves this show!' You should wonder...|Is that really true for every kid?|What is for lunch?|Who painted the wall?"
    ]),
    SC("Paraphrase it", "♻️", "To paraphrase is to say someone's idea in your own words, keeping the meaning the same. It shows you really understood. Start with 'So you are saying...'.", "Keep the meaning but change the words.", "'It is chilly outside' can be paraphrased as 'The weather is a bit cold.'", [
      "Paraphrasing means saying it...|In your own words|Word for word|Louder",
      "A paraphrase should keep the same...|Meaning|Spelling|Volume",
      "Which phrase starts a paraphrase?|So you are saying...|Whatever...|Tell me later...",
      "Paraphrasing shows you...|Understood|Are bored|Are done",
      "'The movie was fantastic' could be paraphrased as...|The film was great|The film was awful|The film was long",
      "Which is NOT a paraphrase of 'I am very hungry'?|I am not hungry at all|I could eat a lot right now|I really want food",
      "If your paraphrase is wrong, the speaker can...|Correct you|Leave|Ignore you",
      "Copying exact words is called...|Repeating, not paraphrasing|Paraphrasing|Inventing"
    ]),
    SC("Open and closed questions", "❓", "A closed question has a short answer, like yes or no. An open question needs a longer answer and often starts with how, why or what. Open questions help you learn more.", "Check if a single word could answer it.", "'Do you like soccer?' is closed. 'What do you enjoy about soccer?' is open.", [
      "Which is an open question?|How did you learn to swim?|Can you swim?|Is the pool wet?",
      "Which is a closed question?|Did you have breakfast?|Why do you like mornings?|How was your day?",
      "Open questions often begin with...|Why or how|Is or are|Did or do",
      "A closed question usually gets...|A short answer|A long story|A song",
      "To learn more in an interview, ask...|Open questions|Only yes-or-no ones|Nothing",
      "'Tell me about your favorite book' is...|Open|Closed|Silent",
      "Which is an open question?|What was the hardest part of the project?|Was it hard?|Is it done?",
      "'Are you ten years old?' is a...|Closed question|Open question|Poem"
    ]),
    SC("Persuasive words", "🧲", "Persuasive speakers choose strong words that help people care: 'important', 'should', 'imagine', 'together'. They stay truthful and respectful and never trick listeners.", "Choose words that are strong, honest and kind.", "'We should protect our park' is stronger than 'Maybe the park is nice.'", [
      "Which sentence is more persuasive?|We must protect our park|The park is, like, there|Park is okay maybe",
      "Persuasive speakers stay...|Honest|Sneaky|Silent",
      "'Imagine a cleaner street' invites listeners to...|Picture the goal|Leave|Frown",
      "'We' and 'together' help listeners feel...|Included|Left out|Blamed",
      "Which word shows something matters a lot?|Important|Maybe|Whatever",
      "Tricking people with false facts is...|Not allowed in honest speaking|Great persuading|Good evidence",
      "A call to join in starts well with...|Let us|You never|Nobody",
      "Persuasion works best when you also give...|Reasons|Threats|Silence"
    ]),
    SC("Perform a poem", "🎼", "When you perform a poem, you do more than read it. Notice the rhythm, pause at the line breaks that matter, stress key words and let your voice show the feeling.", "Let the poem's feeling guide your speed and volume.", "A quiet, calm poem about night should be read slowly and softly.", [
      "A calm night poem is best read...|Slowly and softly|Fast and loud|In a shout",
      "A line break is a good place to...|Pause if it matters|Skip lines|Hide the page",
      "Rhythm in a poem is its...|Beat|Cover|Author's age",
      "To perform a poem well, show the...|Feeling|Page number|Margin",
      "An exciting poem about a race can be read...|Quicker with energy|Sleepily|Whispering",
      "Rhyming words are often...|Stressed a little|Skipped|Mumbled",
      "Before performing, it helps to...|Read it aloud several times|Read it once silently|Never practice",
      "A poem is spoken to the audience, not to...|The page only|The people|The room"
    ]),
    SC("Talk about numbers", "📊", "Numbers can prove a point, but too many confuse listeners. Round them ('about half'), compare them ('twice as many') and say what they mean.", "Choose the number style that is easy to hear and remember.", "'Nearly half of us walk to school' is easier to hear than '46.37 percent'.", [
      "Which is easiest to hear in a talk?|About half the class|Forty-six point three seven percent|A long list of digits",
      "After you give a number, you should say...|What it means|Nothing|Goodbye",
      "Rounding numbers makes them...|Easier to remember|Harder to remember|Wrong",
      "'Twice as many' is a way to...|Compare numbers|Hide numbers|Spell numbers",
      "Too many numbers in a row can...|Confuse listeners|Excite them|Feed them",
      "Which comparison helps listeners picture it?|It is as tall as a two-story house|It is 7.2 meters, 7.21 meters, 7.22|It is tall",
      "Where could a chart help you?|Showing numbers visually|Adding extra noise|Replacing your voice",
      "Saying 'about 100' instead of '98' is...|Rounding|Cheating|Forgetting"
    ]),
    SC("Cue cards", "🗂️", "Cue cards hold short reminders, not the whole speech. Write key words in big letters, number the cards and glance down quickly. Do not read every word.", "Use only a few words that jog your memory.", "My card says 'Hook: shark fact' so I remember what to say first.", [
      "Cue cards should have...|Key words|Every sentence|Drawings only",
      "Cue cards should be...|Numbered|Shuffled|Stuck together",
      "Writing the whole speech on one card makes it...|Hard to use|Easy to use|Silent",
      "You should look at your cards...|Quickly|For minutes|Never at all",
      "Big letters make notes...|Easy to see|Impossible to read|Heavy",
      "Why number your cards?|To keep the order straight|To count the audience|To save paper",
      "Reading every word from your card makes you...|Lose eye contact|Gain eye contact|Win automatically",
      "If you drop your cards, the numbers help you...|Put them back in order|Find lunch|Start a new talk"
    ]),
    SC("Calm your nerves", "🌬️", "Nervous feelings are normal, even for experts. Slow breathing, practice, a friendly face in the crowd and thinking 'I have something to share' can help.", "Choose the habit that calms your body and mind.", "Before I speak, I breathe in for four counts and out slowly.", [
      "Feeling nervous before speaking is...|Normal|A failure|Rare",
      "Which can calm you down?|Slow deep breaths|Holding your breath|Racing around",
      "Practicing your talk makes nerves...|Smaller|Bigger|Louder",
      "Finding a friendly face helps you feel...|Supported|Lost|Worried",
      "Thinking 'I have something useful to share' builds...|Confidence|Fear|Silence",
      "If you make a mistake, it is best to...|Keep going calmly|Run out|Cry",
      "Shaking hands before speaking can be eased by...|Holding cue cards steady and breathing|Biting nails|Squeezing hard",
      "Most listeners want you to...|Do well|Fail|Quit"
    ]),
    SC("Respectful debate", "🤝", "In a debate you argue about an idea, not about a person. Wait for your turn, use polite words, and say 'I see it differently' instead of 'You are wrong'.", "Attack the idea, never the person.", "I can say 'I see your point, but I think...' and then give my reason.", [
      "In a debate you challenge the...|Idea|Person|Clothes",
      "Which is a respectful way to disagree?|I see it differently because...|That is dumb|You always say silly things",
      "In a debate, you speak when...|It is your turn|You feel like it|Someone sleeps",
      "Calling the other side names is...|Not allowed|Smart|Required",
      "Good debaters listen to the other side to...|Understand and answer them|Ignore them|Copy them",
      "After a debate it is kind to...|Thank everyone|Gloat|Leave angry",
      "If you lose a debate point, you can...|Learn from it|Quit|Be mean",
      "'I see your point, but...' shows you...|Listened|Did not listen|Gave up"
    ]),
    SC("Active listening signals", "👂", "Active listeners show they care. They face the speaker, nod at the right moments, keep their body still and say small things like 'I see'. They wait before they answer.", "Think about what a listener's face and body can show.", "I look at my friend, nod, and wait until she finishes before I talk.", [
      "Active listeners face the...|Speaker|Window|Door",
      "A nod can show that you...|Follow along|Are leaving|Disagree loudly",
      "Checking your phone while someone talks shows...|Poor listening|Good listening|Excitement",
      "Which small response shows you are listening?|I see|Whatever|Hurry up",
      "Interrupting is...|Not active listening|Active listening|Required",
      "Before you answer, you should...|Wait for the speaker to finish|Start early|Walk away",
      "Staying still and calm tells the speaker you...|Care|Are bored|Want to leave",
      "A listener who asks a question about the topic shows they were...|Paying attention|Daydreaming|Sleeping"
    ]),
    SC("Pause for effect", "⏸️", "A pause before or after an important idea gives listeners time to think. It makes the idea feel bigger. Count silently to two and let the idea land.", "Silence is a tool when you use it on purpose.", "'And the winner is... (pause) ... our whole team!' The pause builds excitement.", [
      "A pause before a big idea builds...|Interest|Confusion|Sleepiness",
      "A pause after a key point gives listeners time to...|Think|Leave|Sneeze",
      "How long might you pause silently?|About two counts|Ten minutes|Never",
      "A planned pause is different from a...|Filler like um|Breath|Smile",
      "Pausing in the wrong place can...|Break a sentence apart|Fix a sentence|Grow a tree",
      "Which is a good place to pause?|After an important statement|Mid-word|During a hiccup only",
      "Pauses make a surprise feel...|Bigger|Smaller|Lost",
      "Rushing with no pauses makes listeners...|Miss ideas|Remember everything|Clap"
    ]),
    SC("Tell a story with details", "📖", "A good story has a character, a place, a problem and a solution. Details like sounds, colors and feelings make listeners see it. Start strong and end with how things changed.", "Add a detail that helps listeners see, hear or feel it.", "'The old wooden door creaked loudly' is better than 'I opened the door.'", [
      "A story needs a character and a...|Problem|Receipt|Ruler",
      "Which has better detail?|The wooden door creaked loudly|There was a door|A door",
      "Details help listeners...|Picture the scene|Fall asleep|Check the time",
      "A story usually ends with a...|Solution|Math test|Grocery list",
      "Telling how a character feels adds...|Emotion|Rain|Noise from outside",
      "Which is a detail about sound?|The wind howled|The wind|It was a day",
      "A good story ending shows how things...|Changed|Stayed secretly|Vanished for no reason",
      "Where a story happens is its...|Setting|Rating|Title page"
    ])
  ];

  // ================= LEVEL 8 =================
  const L8 = [
    SC("Trust, feeling and logic", "🔺", "Three ways to persuade: build trust (ethos) by showing you know your topic and are fair; touch feelings (pathos) with stories; use logic (logos) with facts and reasoning. Great speakers mix all three.", "Match the tool to what it does: trust, feelings or logic.", "Telling listeners I coached a team for two years builds trust.", [
      "Ethos is about...|Trust and credibility|Feelings|Numbers",
      "Pathos is about...|Feelings|Logic|Trust",
      "Logos is about...|Logic and facts|Feelings|Looks",
      "A story that makes listeners care uses...|Pathos|Logos|Ethos only",
      "Saying 'I have studied birds for years' builds...|Ethos|Pathos|Logos",
      "Giving a clear step-by-step reason uses...|Logos|Pathos|Ethos",
      "A speaker who is fair and honest gains...|Trust|Distrust|Silence",
      "The best persuasion usually...|Mixes all three|Uses only one|Uses none"
    ]),
    SC("Meet the counterargument", "🛡️", "A counterargument is a reason the other side might give. Strong speakers mention it, answer it fairly and show why their view is still better. This builds trust.", "First say their point, then your answer.", "'Some say homework is too long. But short, focused homework builds habits.'", [
      "A counterargument is a point from the...|Other side|Same side|Back row",
      "Mentioning the other side fairly makes you seem...|More trustworthy|Weaker always|Boring",
      "After naming the counterargument, you should...|Answer it|Ignore it|Hide it",
      "'Some people think... but...' is a way to...|Address a counterargument|End a talk|Start a game",
      "Ignoring the opposite view can make your speech...|Less convincing|More convincing|Shorter forever",
      "Answering a counterargument needs...|A reason or evidence|A louder voice|A longer pause only",
      "Which sentence addresses the other side?|Some may say it costs too much, but it saves money later|It is good|I like it",
      "Being fair to the other side shows...|Respect|Weakness|Confusion"
    ]),
    SC("Signposting", "🪧", "Signposts are words that tell listeners where you are in the talk. 'My first point', 'Now for the second reason', 'To sum up'. They work like road signs.", "Think of a phrase that tells where you are on the road.", "'My second reason is about cost' signals a new point.", [
      "'To sum up' signals that you are...|Wrapping up|Starting|Beginning a new topic",
      "Signposts help listeners...|Follow the structure|Fall asleep|Count words",
      "'My first point' tells listeners...|The talk is starting its list|The talk is over|Nothing",
      "'Now let us look at the other side' signals...|A shift in the talk|The end|A joke",
      "Which phrase signals the last point?|Finally|At the beginning|Once upon",
      "Signposts are like...|Road signs|Cooking pots|Sunglasses",
      "'First, second, third' are...|Signpost words|Weather words|Color words",
      "A talk with no signposts can feel...|Hard to follow|Easy|Musical"
    ]),
    SC("Analogy and metaphor", "🔗", "An analogy explains something new by comparing it to something familiar. 'The heart is like a pump' helps you understand blood flow. A metaphor says one thing is another: 'Time is a thief.'", "Find the familiar thing that works like the new thing.", "'A cell is like a tiny factory' helps listeners picture what cells do.", [
      "'The heart is like a pump' is an...|Analogy|Insult|Rhyme",
      "Analogies explain something new by comparing it to...|Something familiar|Something unknown|Nothing",
      "'Time is a thief' is a...|Metaphor|List|Fact",
      "Which compares a brain to a computer?|The brain is like a computer|The brain is gray|The brain is heavy",
      "Analogies help listeners...|Understand faster|Feel confused|Doubt",
      "A good analogy must be...|Easy to picture and fitting|Strange|Long and silly",
      "Which is a metaphor?|The classroom was a zoo|The classroom was loud|The classroom had desks",
      "'Like' or 'as' often show a...|Simile or analogy|Number|Question"
    ]),
    SC("Repeat to remember", "🔁", "Repetition means saying a key word or phrase more than once on purpose. It helps listeners remember the main idea and adds rhythm. Do not overuse it.", "Repeat the idea that matters most, not everything.", "'We can do it. We will do it. We are doing it.' repeats a powerful idea.", [
      "Repeating a key phrase helps listeners...|Remember it|Forget it|Argue",
      "Repetition also adds...|Rhythm|Rain|Cost",
      "Repeating everything too much can...|Bore listeners|Excite everyone|Shorten the talk",
      "Which repeats a phrase on purpose?|We will learn, we will grow, we will lead|I walked home|It was quiet",
      "You should repeat...|Your main message|Every filler word|Your mistakes",
      "A famous speech repeating 'I have a dream' shows...|Repetition for impact|Forgetfulness|Silence",
      "Repetition works best when it is...|Planned|Accidental|Hidden",
      "A short repeated phrase like a slogan is easy to...|Remember|Lose|Argue"
    ]),
    SC("Register: choose your style", "🎩", "Register is how formal or casual your language is. With a principal or in a speech, use formal language. With friends, casual is fine. Matching register shows respect and clarity.", "Think about who is listening and how serious the moment is.", "In a class presentation, I say 'Thank you for listening' rather than 'Cool, bye'.", [
      "Which is more formal?|Good morning, everyone|Yo, what's up|Hey you guys",
      "At a school assembly speech, use...|Formal language|Slang only|Whispers",
      "With close friends at lunch, it is fine to be...|Casual|Silent|Formal as a king",
      "Matching your style to the audience shows...|Respect|Disrespect|Nothing",
      "Which phrase is casual?|No way, that is awesome|It is a remarkable achievement|I would like to thank you",
      "Slang in a formal speech can...|Distract or confuse|Always help|Win prizes",
      "An interview with a mayor calls for...|Polite, formal words|Texting slang|Jokes only",
      "Register means...|How formal your language is|How loud you are|How tall you are"
    ]),
    SC("Listening between the lines", "🕵️", "An inference is a smart guess based on clues. A speaker may not say everything, but their tone, words and facts can show more. Listen for clues, and check before you decide.", "Use the clues you heard, not guesses with no support.", "She sighed and said 'Fine.' I can infer she is not happy about it.", [
      "An inference is a guess based on...|Clues|Nothing|A coin toss",
      "A sigh and 'Fine...' suggests the speaker is...|Not really happy|Thrilled|Asleep",
      "To infer, you use what is said plus...|What you know|Wild guesses|Silence only",
      "If someone says 'I studied all week' and smiles, you can infer they feel...|Prepared|Lost|Sleepy",
      "It is wise to check an inference by...|Asking a question|Assuming you are right|Arguing",
      "Tone of voice can give clues about...|Feelings|Weather|Addresses",
      "'I guess I can try' said slowly may suggest...|Doubt|Joy|Rage",
      "An inference can be wrong, so you should stay...|Open to being corrected|Stubborn|Silent"
    ]),
    SC("Judge the evidence", "🔍", "Not all evidence is equally strong. Good evidence is specific, recent, from an expert, and checkable. Weak evidence is vague, old, from someone who gains, or 'everyone knows'.", "Ask: who said it, how do they know, and can it be checked?", "A weather office's report is stronger than a rumor about rain.", [
      "Which evidence is strongest?|A science museum's measurement|My cousin heard it once|Everyone says so",
      "'Everyone knows' is...|Weak evidence|Strong evidence|A fact",
      "A good question to ask about a source is...|How do they know?|What is their favorite color?|Where do they sit?",
      "Checkable evidence means others can...|Verify it|Ignore it|Forget it",
      "Old data may be a problem when things...|Have changed|Stay forever|Are boring",
      "A seller's claim about their own product should be...|Checked carefully|Believed at once|Ignored fully",
      "An expert is someone who...|Has deep knowledge of a topic|Talks loudest|Has many friends",
      "Specific evidence has...|Details and numbers|Only opinions|No names"
    ]),
    SC("Say where you learned it", "🏷️", "When you use someone else's facts, tell your listeners where they came from: 'According to the National Weather Service...' This is honest, builds trust and lets others check.", "Name the source briefly before the fact.", "'According to the library's guide, bats are mammals.'", [
      "Naming your source makes your talk more...|Trustworthy|Boring|Silent",
      "Which phrase credits a source?|According to the science textbook|Everybody thinks|I just feel",
      "Using facts without saying where they came from is...|Not honest enough|Required|Polite",
      "Listeners can check a fact if you...|Name the source|Hide the source|Whisper it",
      "A good source is usually...|Reliable and checkable|Anonymous|A rumor",
      "'A study from a university found...' tells listeners...|Where the fact came from|Nothing|The time",
      "Taking someone's ideas and saying they are yours is...|Plagiarism|Credit|Teaching",
      "A short credit before a fact takes...|Only a few words|A full hour|A new speech"
    ]),
    SC("Lead a Q and A", "🎙️", "When answering questions from the audience: listen to the whole question, repeat it so all can hear, answer briefly, and say 'I do not know, but I can find out' when needed. Thank the asker.", "Repeat, answer, stay calm and honest.", "Someone asks about sharks; I say 'Great question about sharks' and answer in two sentences.", [
      "Repeating the question helps...|Everyone hear it|Waste time|Confuse people",
      "If you do not know an answer, say...|I do not know, but I can find out|Anything at all|Nothing and walk away",
      "Answers in Q and A should be...|Brief and clear|Very long|Silent",
      "Thank the person who asked because...|It is polite|It ends the talk|It is a rule from physics",
      "Before answering, you should...|Listen to the whole question|Guess the end|Cut them off",
      "Making up an answer you do not know is...|Not honest|Smart|Normal",
      "A rude question deserves a...|Calm, polite reply|Rude reply|Scream",
      "Q and A comes usually...|After the talk|Before the title|Never"
    ]),
    SC("Speak without prep", "⚡", "Sometimes you must speak with no time to prepare. Use a simple plan: Point (say your answer), Reason (why), Example (a real case), Point (repeat your answer). Breathe first.", "Use the four-step plan: point, reason, example, point.", "'Pets are good. They teach care. My dog needs walks. So pets are good.'", [
      "In the quick plan, you begin with your...|Point|Example|Thank-you",
      "After your point, give a...|Reason|Goodbye|Surprise",
      "An example is a...|Real case or story|Spelling rule|Break",
      "You end the plan by restating your...|Point|Reason|Nap",
      "Before you speak, take a...|Breath|Nap|Run",
      "In an impromptu talk it is okay to...|Pause and think|Panic|Quit",
      "The plan shortcut is...|Point, reason, example, point|Joke, joke, joke|Sing only",
      "Speaking with no prep gets easier with...|Practice|Never speaking|Luck only"
    ]),
    SC("Story arc", "⛰️", "A story arc is the shape of a story: beginning, rising problem, climax (the most exciting moment), then resolution (the ending). Tension rises step by step until the turning point.", "Picture a hill: climb, top, then down.", "In my story, the boat starts to sink (rise), I patch the leak (climax), and we reach shore (resolution).", [
      "The most exciting moment of a story is the...|Climax|Introduction|Title",
      "The ending where problems settle is the...|Resolution|Climax|Setup",
      "A story arc looks like a...|Hill|Straight line|Zigzag only",
      "Rising action means the story...|Builds tension|Ends|Disappears",
      "The beginning that sets up characters is the...|Setup|Resolution|Climax",
      "Where does the biggest turn happen?|At the climax|In the title|In the thank-you",
      "A resolution tells listeners...|How it turned out|The weather|Page numbers",
      "A story with no problem has no...|Tension|Words|Ending"
    ]),
    SC("Look after your voice", "🥤", "Your voice is a tool. Sip water, warm up with gentle humming, speak from your belly breath and avoid shouting or whispering hard for long. Rest if you feel strain.", "Treat your voice like a muscle that needs care.", "Before a big talk I hum softly and drink some water.", [
      "Which helps your voice?|Sipping water|Shouting all day|Whispering harshly",
      "A warm-up can be...|Gentle humming|Screaming|Holding your breath",
      "Breathing from your belly gives...|Steady power|Pain|Silence",
      "If your voice feels strained you should...|Rest it|Push harder|Yell",
      "Long shouting can...|Hurt your voice|Help your voice|Make you tall",
      "A good drink to have before speaking is...|Plain water|Fizzy soda|Hot sauce",
      "Voice care before a big talk includes...|Warming up and resting|Ignoring it|Staying up late yelling",
      "Your voice works best when you are...|Relaxed|Tense|Whispering"
    ]),
    SC("Group discussion roles", "🧩", "A strong group gives roles: a leader to guide, a recorder to write notes, a timekeeper to watch the clock, and a reporter to share the results. Everyone also listens and contributes.", "Match the job to the role name.", "The timekeeper says 'Two minutes left' to keep us on track.", [
      "Who watches the clock?|The timekeeper|The recorder|The reporter",
      "Who writes down ideas?|The recorder|The timekeeper|The leader only",
      "Who shares group results with the class?|The reporter|The recorder|The clock",
      "The leader's job is to...|Guide the discussion|Do all the talking|Hide",
      "Everyone in the group should...|Contribute and listen|Stay silent|Argue",
      "If someone dominates, the leader can...|Invite others to speak|Ignore them|Leave",
      "Roles help the group...|Work together smoothly|Fight|Avoid work",
      "A good recorder writes...|Key ideas|Every word, slowly|Jokes only"
    ]),
    SC("Call to action", "📣", "A call to action tells listeners exactly what to do next: sign up, recycle, vote, read. It should be clear, doable and tied to your reasons.", "Say who should do what, and keep it doable.", "'Bring one can of food to the box by Friday' is clear and doable.", [
      "A call to action tells listeners...|What to do|What you ate|Your age",
      "Which call to action is clearest?|Bring a can of food to the box by Friday|Do something|Maybe help sometime",
      "A good call to action is...|Doable|Impossible|Hidden",
      "A call to action usually appears in the...|Conclusion|Title only|Middle of a joke",
      "Vague requests like 'help the world' are...|Hard to act on|Perfect|Specific",
      "A strong call to action is tied to your...|Reasons|Lunch|Shoes",
      "Which is a call to action?|Join our recycling club today|The sky is wide|Clouds are made of water",
      "Saying when and how makes the request...|Easier to follow|Longer for no reason|Unclear"
    ]),
    SC("When you get interrupted", "🚧", "If someone interrupts, stay calm. You can say 'May I finish my thought?' or 'I will answer that in a moment.' If it keeps happening, ask the leader or teacher for help.", "Stay calm, polite and firm.", "'May I finish this point, and then I will take your question?'", [
      "A calm reply to an interruption is...|May I finish my thought?|Be quiet!|Stop talking forever",
      "If an interruption keeps happening, you can...|Ask a leader for help|Fight|Leave forever",
      "Staying calm shows...|Control|Anger|Fear",
      "If someone asks a question mid-speech, you might say...|I will answer that in a moment|Never ask|Shut up",
      "Shouting back usually...|Makes it worse|Fixes it|Helps",
      "After finishing your point, you should...|Take the question|Ignore it forever|Sit",
      "When you interrupt others you...|Should not|Must|May daily",
      "A polite interruption starts with...|Excuse me|Hey you|Hush"
    ]),
    SC("Words for every listener", "🌍", "In a group with many backgrounds, use clear words. Avoid slang, idioms like 'a piece of cake', and jokes that need special knowledge. Explain unusual words and speak at a steady pace.", "Choose words anyone can understand.", "Instead of 'It's a piece of cake', I say 'It is very easy.'", [
      "Which is clearer to everyone?|It is very easy|It is a piece of cake|It is a breeze",
      "Idioms can confuse listeners who...|Are new to the language|Know the idiom|Are experts",
      "To help all listeners, explain...|Unusual words|Nothing|Only names",
      "A steady pace helps people who are...|Learning the language|Sleeping|Late",
      "Slang can be hard for...|Some listeners|Nobody|Robots only",
      "Jokes that need special knowledge may...|Leave some listeners out|Include all|Always work",
      "Clear speaking helps everyone...|Understand|Guess|Leave",
      "Picture and gestures can also help...|Clarify your meaning|Hide it|Block it"
    ]),
    SC("Judge your own talk", "📝", "After a talk, check yourself with a rubric: Was my message clear? Did I use evidence? Was my voice steady? Did I look at the audience? Pick one thing to improve next time.", "Look for strengths and one thing to improve.", "I noticed I looked at my cards a lot, so next time I will look up more.", [
      "A rubric is a list of...|Things to check|Jokes|Colors",
      "After a talk, a good step is to...|Reflect on what went well|Forget it|Blame others",
      "Picking one thing to improve is...|Smart|Silly|Unneeded",
      "Which is a rubric question?|Was my message clear?|What did I eat?|Where is my coat?",
      "Watching a recording of yourself can...|Show what to improve|Ruin the talk|Cost time only",
      "Reflection should include strengths and...|Next steps|Insults|Nothing",
      "Being kind to yourself while reviewing helps you...|Keep growing|Quit|Hide",
      "Asking a trusted friend for feedback gives you...|Another view|Excuses|Nothing"
    ])
  ];

  // ================= LEVEL 9 =================
  const L9 = [
    SC("How a debate is built", "🏛️", "A formal debate has parts. First each side gives a constructive speech with its main arguments. Next come rebuttals, where each side answers the other. Last, a closing summary. Teams take turns and are timed.", "Think: build your case, answer theirs, then sum up.", "In my constructive speech I give two reasons; in my rebuttal I answer the other team.", [
      "A constructive speech is used to...|Build your own arguments|Only attack|Say thank-you",
      "A rebuttal is used to...|Answer the other side|Introduce yourself|Sing",
      "A closing summary...|Sums up your case|Starts the debate|Is optional noise",
      "In formal debate, speakers are usually...|Timed|Unlimited|Silent",
      "The side supporting an idea is often called the...|Proposition or affirmative|Audience|Judge",
      "The side opposing an idea is the...|Opposition or negative|Timekeeper|Host",
      "The judge listens to decide which side was...|More convincing|Louder|Taller",
      "Turns in a debate are taken...|One side at a time|All at once|By random shouting"
    ]),
    SC("Spot weak reasoning", "🚫", "A fallacy is a mistake in reasoning that sounds convincing. 'Everyone is doing it' (bandwagon) is not proof. Attacking the person instead of the idea is called ad hominem. 'Only two choices' hides other options.", "Ask whether the reason really supports the claim.", "'Everyone wears it, so it must be good' is a bandwagon fallacy.", [
      "'Everyone does it, so it must be right' is a...|Bandwagon fallacy|Strong argument|Fact",
      "Attacking the speaker instead of the idea is...|Ad hominem|Evidence|Courtesy",
      "'You are either with us or against us' ignores...|Other options|Facts|Rules",
      "A fallacy is a mistake in...|Reasoning|Spelling|Volume",
      "Which is an attack on the person?|You are too young to know anything|Here is data against that claim|Let us check the facts",
      "Fallacies can sound...|Convincing but weak|Always silly|Always loud",
      "A good listener asks whether the reason actually...|Supports the claim|Sounds cool|Is short",
      "Spotting a fallacy lets you answer with...|A clear, fair reply|Insults|Silence"
    ]),
    SC("Rebuttal in four steps", "🔧", "To rebut, use four steps: 1) Say their point. 2) Say what is wrong or missing. 3) Give your evidence. 4) Say why it matters. Stay on their argument, not on the person.", "Name it, challenge it, prove it, explain it.", "They said parks cost too much; I show the park saves health costs, and say why that matters.", [
      "The first step of a rebuttal is to...|State their point|Walk off|Make a joke",
      "The second step is to say what is...|Wrong or missing|Funny|Pretty",
      "The third step is to give...|Your evidence|An insult|A cheer",
      "The fourth step says why it...|Matters|Costs|Rhymes",
      "A rebuttal should stay on their...|Argument|Hair|Name",
      "A rebuttal without evidence is...|Only an opinion|Strong proof|A fact",
      "Ignoring their point and repeating yours is not a...|Rebuttal|Speech|Mistake of grammar",
      "Why explain why it matters?|So the judge sees the impact|To waste time|To end early"
    ]),
    SC("Cross-examination", "🔦", "In some debates, one side asks the other short questions to clarify or expose gaps. Ask clear, fair, short questions. Do not make speeches or be rude. Listen to the answers.", "Short, clear and fair questions work best.", "Instead of a long speech I ask, 'What evidence shows that?'", [
      "Cross-examination uses...|Short questions|Long speeches|Songs",
      "A good question there is...|Clear and fair|Tricky and rude|Very long",
      "The aim of questions is often to...|Clarify or find gaps|Insult|Fill time",
      "While the other side answers, you should...|Listen|Interrupt|Pack up",
      "Which is a fair question?|What evidence supports that?|Why are you so silly?|Do you ever think?",
      "Making a speech during your question time is...|Poor use of the time|Smart|Expected",
      "A calm voice during questions shows...|Confidence|Fear|Boredom",
      "If an answer is unclear, a good follow-up is...|Can you explain that?|Never mind|You are wrong"
    ]),
    SC("Inform, persuade, entertain", "🎯", "Speeches have different main purposes. To inform: teach facts clearly. To persuade: change minds or actions. To entertain: delight listeners. Knowing your purpose shapes your words and structure.", "Ask what the speaker wants the listeners to do or feel.", "A speech about how volcanoes work is mainly to inform.", [
      "A speech teaching how volcanoes form is to...|Inform|Persuade|Entertain only",
      "A speech asking people to vote for a project is to...|Persuade|Entertain only|Inform only",
      "A funny story at a party is to...|Entertain|Persuade|Teach math",
      "Knowing the purpose helps you choose...|Words and structure|Your shoes|The weather",
      "An invitation to join a club is mostly to...|Persuade|Mourn|Count",
      "A report on the life cycle of a frog is to...|Inform|Persuade|Dance",
      "A speech can have more than one...|Purpose|Ending only|Speaker only",
      "The purpose should be clear to the...|Speaker and listeners|Doormat|Clock"
    ]),
    SC("Microphone know-how", "🎤", "With a microphone, hold it about a hand-width from your mouth, aim it at your mouth, and speak normally. Do not tap it. Test first. Do not move it away while talking or you will fade out.", "Keep it steady, close and aimed at your mouth.", "I test the mic by saying 'Testing, one, two' before the crowd arrives.", [
      "Keep the mic about...|A hand-width from your mouth|A meter away|Behind your head",
      "Before an event you should...|Test the mic|Tap it hard|Throw it",
      "If you move the mic away mid-sentence, your voice will...|Fade out|Get louder|Rhyme",
      "With a mic, you speak...|Normally, not shouting|By screaming|In whispers only",
      "Tapping the mic can...|Cause loud noise|Improve sound|Fix feedback",
      "The mic should point toward your...|Mouth|Knees|Shoes",
      "Howling noise from a speaker is often caused by...|Mic pointed at the speaker|Silence|Polite voices",
      "A mic lets people at the back...|Hear you|Fall asleep|See you better"
    ]),
    SC("Speaking on video calls", "💻", "On a video call, look at the camera to seem to look at people, mute when not speaking, check your sound, light and background, and speak a little slower. Wait for others to finish because of delay.", "Camera, quiet space, mute, patience.", "I set my camera at eye level and mute until my turn.", [
      "To look like you make eye contact, look at the...|Camera|Corner of the screen|Floor",
      "When not speaking you should...|Mute|Sing|Eat loudly",
      "Lag means you should...|Wait a moment before replying|Interrupt more|Leave the call",
      "Good light should come from...|In front of you|Behind you only|Nowhere",
      "A noisy background can...|Distract listeners|Help you|Mute them",
      "Speak a little...|Slower|Faster|Backwards",
      "Before the call starts, check your...|Sound and camera|Pets' names|Shoes",
      "If you want to talk, you can...|Raise your hand or use the chat|Shout over others|Hide"
    ]),
    SC("Slides that help", "🖼️", "Slides should support you, not replace you. Use few words, large text, one idea per slide and clear pictures. Do not read the slide aloud word for word. Face the audience, not the screen.", "Few words, big text, one idea.", "My slide has a picture of a volcano and three words: 'Heat, Pressure, Eruption'.", [
      "A good slide has...|Few words and a clear picture|A full page of text|Tiny print",
      "You should not...|Read the slide word for word|Use pictures|Practice",
      "Each slide should have about...|One main idea|Ten ideas|No ideas",
      "While presenting, face the...|Audience|Screen|Wall",
      "Large text helps people...|Read from far away|Fall asleep|Shout",
      "Slides are there to...|Support your talk|Replace you|Hide you",
      "Too much animation can...|Distract listeners|Help focus|Fix errors",
      "Colors with low contrast, like pale yellow on white, are...|Hard to read|Easy to read|Fancy"
    ]),
    SC("Quote it right", "💬", "When you quote, say who said it and keep the words exact. Introduce it ('As Maya Angelou wrote...'), read it clearly and then explain why it matters. Keep quotes short.", "Credit the speaker, keep it exact, then explain.", "I say, 'As the poet wrote...' then read the lines and explain what they show.", [
      "A quote must be...|Word for word|Rewritten|Guessed",
      "Before a quote you should say...|Who said it|Nothing|Goodbye",
      "After a quote you should...|Explain why it matters|Run away|Repeat it three times",
      "Quotes in speeches should be...|Short|Endless|Hidden",
      "Changing a quote's words makes it...|Not a true quote|Better|Shorter",
      "Which phrase introduces a quote?|As the author wrote|Whatever|Next slide",
      "Using a quote without credit is...|Not honest|Fine|Polite",
      "A quote works best when it...|Supports your point|Replaces your talk|Confuses"
    ]),
    SC("Humor with care", "😄", "A light joke can warm up a crowd, but never at someone's expense. Keep humor kind, short and related to the topic. If a joke does not land, smile and move on.", "Joke about yourself or ideas, never to hurt.", "I smile and say, 'I practiced this joke on my dog. He liked it.'", [
      "Good humor in a speech is...|Kind and relevant|Mean|Endless",
      "Jokes that make fun of someone are...|Hurtful and wrong|Required|Safe",
      "If a joke gets no laugh you should...|Smile and move on|Repeat it louder|Apologize for ten minutes",
      "A joke should be...|Short|Very long|Silent",
      "Humor can help by making listeners feel...|Relaxed|Angry|Left out",
      "Safe humor is often about...|Yourself or the topic|Others' looks|Private secrets",
      "A joke unrelated to the topic may...|Distract|Help always|Teach",
      "Timing means pausing so that people...|Can laugh|Cannot speak|Leave"
    ]),
    SC("Talking about hard topics", "🕊️", "Some topics are sensitive. Speak calmly and kindly, use respectful words, stick to facts, and warn listeners if the topic is heavy. Never mock someone's loss or struggle.", "Be gentle, factual and respectful.", "'Today I will talk about a sad topic. Please take care of yourself while listening.'", [
      "On a sensitive topic, speak...|Calmly and kindly|With teasing|With shouting",
      "Giving a gentle warning before a heavy topic is...|Considerate|Silly|Rude",
      "You should avoid...|Mocking people's struggles|Using facts|Being kind",
      "Respectful words matter because listeners may have...|Strong feelings about it|No ears|No time",
      "Sticking to facts helps keep the talk...|Fair and calm|Wild|Long",
      "If a listener seems upset, you can...|Pause kindly and offer a break|Laugh|Speed up",
      "Choose a topic that is...|Appropriate for the audience|Random|Scary for fun",
      "Heavy topics are best handled with...|Care|Jokes|Haste"
    ]),
    SC("Take smart notes", "📒", "While listening, split a page: main ideas on the left, details on the right, and a summary box at the bottom. Use short words and symbols. Review soon after to remember more.", "Main ideas, details, summary.", "I write 'Cause: heat' on the left and 'sun warms water' on the right.", [
      "In the split-page method, the left side holds...|Main ideas|Doodles|Dates only",
      "The right side holds...|Details|Titles|Page numbers",
      "A summary box at the bottom has...|A short recap|A joke|A grocery list",
      "Use short words and...|Symbols|Whole paragraphs|Silence",
      "Reviewing notes soon after helps you...|Remember more|Forget more|Lose them",
      "While taking notes, you should still...|Listen actively|Stop listening|Daydream",
      "Writing every word you hear is...|Impossible and unhelpful|Best|Required",
      "Main ideas are usually signaled by phrases like...|The key point is|By the way|Um",
    ].map(r => r.replace(/\|$/, ""))),
    SC("Hear the purpose and tone", "🎧", "Good listeners ask: what is the speaker's purpose, and what is their tone (the attitude)? A serious tone feels formal. An urgent tone says 'act now'. A friendly tone invites you in. Clues are word choice, speed and volume.", "Listen to the words, the speed and the feeling.", "A fast, loud 'Hurry, the bus is leaving!' has an urgent tone.", [
      "A fast, loud 'Hurry!' has a...|Urgent tone|Sleepy tone|Silent tone",
      "A slow, soft voice with kind words feels...|Gentle|Angry|Rushed",
      "Tone means the speaker's...|Attitude|Height|Address",
      "Clues to tone include...|Word choice and voice|Shoe size|Seat number",
      "A formal, serious tone fits...|A solemn ceremony|A pillow fight|A birthday game",
      "Sarcasm means saying the opposite of what you mean, and the tone often sounds...|Mocking|Plain|Quiet",
      "A speaker's purpose is what they...|Want to achieve|Ate|Wear",
      "Noticing tone helps you understand the...|Real message|Weather|Time"
    ]),
    SC("Sound devices", "🎶", "Speakers use sound devices. Alliteration repeats starting sounds ('big bold blue'). Parallelism repeats a grammar pattern ('We came, we saw, we conquered'). A rhetorical question is asked for effect, not for an answer.", "Listen for repeated sounds or patterns.", "'Safe streets, strong schools, stronger futures' uses a pattern.", [
      "'Big, bold, brave' is an example of...|Alliteration|Parallelism|A question",
      "'We learn, we grow, we lead' is...|Parallelism|Alliteration|A count",
      "'Who wouldn't want a cleaner park?' is a...|Rhetorical question|Real question needing an answer|Warning",
      "Alliteration repeats the same...|Starting sound|Ending page|Number",
      "Parallelism repeats a...|Sentence pattern|Eye color|Page",
      "Rhetorical questions are asked to...|Make a point|Get a long answer|Test spelling",
      "Which is alliteration?|Silly snakes slither slowly|The snake was long|Snakes move",
      "These devices make speeches more...|Memorable|Mysterious|Short"
    ]),
    SC("Pace a five-minute speech", "⏱️", "Time your talk with practice. Speaking pace is about 120 to 150 words per minute, so a five-minute speech is roughly 600 to 750 words. Plan time for each part and leave a little spare.", "Rehearse with a timer and check each part.", "A two-minute talk at 130 words a minute is about 260 words.", [
      "A comfortable pace is around...|120 to 150 words per minute|600 words per minute|10 words per minute",
      "A five-minute speech is roughly...|600 to 750 words|50 words|5000 words",
      "To check timing, practice with a...|Timer|Mirror only|Pillow",
      "If you run too long, you can...|Cut a less important point|Talk faster and faster|Skip the ending",
      "Plan time for each...|Part of the speech|Sneeze|Cloud",
      "Leaving some spare time helps if you...|Pause or get a question|Lose your slides|Fall asleep",
      "If you go too fast, listeners may...|Miss ideas|Love it|Sleep",
      "Timing practice is best done...|Out loud|Silently only|Never"
    ]),
    SC("Follow-up questions", "🪜", "A follow-up question digs deeper into an answer: 'Can you give an example?' 'What happened next?' 'How did that feel?' It shows you listened and gets richer information.", "Build on the answer you just heard.", "She said she loves painting, so I ask, 'What do you like most about it?'", [
      "A follow-up question builds on the...|Answer you just heard|Next speaker|Clock",
      "Which is a follow-up?|Can you give an example?|What is your name again?|Where is the exit?",
      "Follow-ups show that you...|Listened|Did not listen|Are late",
      "The aim of a follow-up is to learn...|More|Nothing|Less",
      "'What happened next?' is a follow-up for a...|Story|Math problem|Sneeze",
      "A good follow-up avoids sounding...|Rude or like an attack|Curious|Polite",
      "If an answer was unclear, you might ask...|Could you explain that more?|Never mind|Why bother",
      "Follow-ups work best when you have already...|Listened carefully|Planned to leave|Looked away"
    ]),
    SC("Give useful feedback", "🧭", "Useful feedback is specific, kind and helpful. Name something that worked, point to one change, and suggest how. Instead of 'It was bad', say 'Your voice was strong; try pausing after key facts.'", "Be specific, kind and give a way to improve.", "'Your opening grabbed me. Next time, slow down your last point.'", [
      "Useful feedback is...|Specific and kind|Vague and harsh|Rare",
      "Which is better feedback?|Your hook was vivid; try slowing your last point|It was bad|Whatever",
      "Good feedback names something that...|Worked|Went wrong only|Is private",
      "Good feedback also offers...|A way to improve|An insult|A trick",
      "Feedback about a speech should focus on...|The speech, not the person|The speaker's looks|Their name",
      "When you receive feedback, you should...|Listen and thank them|Argue|Ignore",
      "Vague feedback like 'It was okay' is...|Not very helpful|Very helpful|Specific",
      "Feedback is meant to help someone...|Improve|Quit|Hide"
    ]),
    SC("Run a meeting", "🗓️", "To lead a meeting: share the agenda, start on time, give everyone a chance, keep to the topic and time, summarize decisions and who will do what next. Thank people at the end.", "Plan, include, stay on track, then summarize next steps.", "At the end I say, 'Sam will bring snacks, Lena will book the room.'", [
      "An agenda is a...|List of topics to cover|Snack list|Seating chart",
      "A meeting leader should...|Include everyone|Do all the talking|Hide",
      "Starting on time shows...|Respect for others' time|Nothing|Rudeness",
      "At the end, a leader should summarize...|Decisions and next steps|Jokes|Weather",
      "If the talk drifts off topic, the leader can...|Steer it back kindly|Ignore it|Leave",
      "Saying who will do what is called assigning...|Tasks|Snacks|Seats",
      "A timekeeper helps the meeting...|Stay on schedule|Be late|Be silent",
      "Thanking people at the end is...|Polite|Pointless|Forbidden"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 7: lvl(7, L7), 8: lvl(8, L8), 9: lvl(9, L9) });
})();
