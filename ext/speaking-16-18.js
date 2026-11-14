// ext/speaking-16-18.js  Mind Lab Speaking & Listening, levels 16-18 (60 lessons)
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, visual: v, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and think about what the lesson said.", clue, `Example: ${example} Now do yours.`] };
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

  // ================= LEVEL 16 =================
  const L16 = [
    SC("The rhetorical situation", "🎯", "Every talk happens in a situation with a speaker, an audience, a purpose and a setting. Change any one of them and the best talk changes too. Before you plan, ask: who, why, and where?", "Name the four parts of the situation and see which one the question is about.", "A talk about recycling for second graders at an assembly sounds very different from one for the city council.", [
      "The four parts of a rhetorical situation include speaker, purpose, setting and...|Audience|Weather|Slides",
      "Your purpose is...|What you want the talk to do|Where you stand|How long the clock is",
      "Who is the audience for a talk to your class about school lunch?|Your classmates|Only the principal|Nobody",
      "A talk is moved from a small room to a huge hall. What changes most?|Voice and gestures need to get bigger|The facts become false|The topic must change",
      "Why ask about the setting before planning?|It affects length, volume and tools|It decides your name|It sets the grade",
      "A speech to persuade has a purpose to...|Change minds or actions|Only entertain|Only list facts",
      "Same topic, two audiences. A smart speaker...|Adjusts words and examples for each|Gives the exact same talk|Skips the audience",
      "Which is a question about audience?|What do these listeners already know?|How tall is the stage?|What time is lunch?"
    ]),
    SC("Red herring", "🐟", "A red herring is a detour. The speaker brings up something that sounds related but pulls attention away from the real question. 'Why was the homework late?' 'Well, look at how much homework other classes get!' Keep your eye on the original question.", "Ask: does this answer the question that was actually asked?", "Asked why the room is messy, a student says 'The hallway is messier.' The hallway is a detour.", [
      "A red herring is...|A detour from the real issue|A strong proof|A kind of joke",
      "Asked 'Did you finish the chores?', which answer is a red herring?|But my brother never does any chores|Yes, they are done|Not yet, I need ten more minutes",
      "The best way to respond to a red herring is to...|Gently return to the original question|Follow the detour forever|Raise your voice",
      "A red herring is a problem because it...|Changes the subject without answering|Gives too many facts|Is too short",
      "In a debate on school uniforms, which point is off topic?|The cafeteria pizza was cold today|Uniforms can cost families money|Uniforms may reduce distractions",
      "How can you spot a red herring?|The point does not connect to the question|It has numbers in it|It is polite",
      "A listener says, 'That is interesting, but how does it answer my question?' This is...|A fair way to steer back|Rude and wrong|A red herring",
      "Which is NOT a red herring when asked why you were late?|The bus broke down at the corner|The weather is nice on Fridays|Other people are late all the time"
    ]),
    SC("Circular reasoning", "🔁", "Circular reasoning uses the claim as its own proof. 'This band is the best because it is better than all the others.' The reason just says the same thing again. A real reason gives new information.", "Check whether the reason says anything new or only repeats the claim.", "'The rule is fair because it is the fair thing to do' goes in a circle. 'The rule is fair because it applies to everyone equally' gives a reason.", [
      "Which is circular reasoning?|He is trustworthy because you can trust him|He is trustworthy because he returned the lost wallet|He is trustworthy because he is on time",
      "Circular reasoning is when the reason...|Repeats the claim|Gives a fresh fact|Quotes an expert",
      "A real reason should...|Add new information|Say the same words again|Be as short as possible",
      "'Reading is good for you because it benefits you.' What is wrong?|It only repeats the claim|It has no verbs|It is too long",
      "Which gives a real reason?|Exercise helps because it strengthens the heart|Exercise helps because it is helpful|Exercise helps because it does good",
      "Another name people use for going in circles is...|Begging the question|Counting the votes|Taking a pause",
      "To fix a circular argument you can...|Add evidence from outside the claim|Say it louder|Say it twice",
      "'This law is right because laws should be obeyed, and this is a law.' This is...|A circle that proves nothing new|A strong proof|A statistic"
    ]),
    SC("Loaded questions", "🧨", "A loaded question hides an assumption inside it. 'Why do you always forget your homework?' assumes you always forget. Whatever you answer, you seem to agree. You can pause and say 'That question assumes something that is not true.'", "Look for a hidden claim packed inside the question.", "'When did you stop skipping practice?' assumes you skipped. You can reply, 'I have not skipped practice.'", [
      "A loaded question...|Hides an assumption inside it|Has exactly two words|Asks for a number",
      "Which question is loaded?|Why are you so lazy?|What time does the bus come?|Which book did you read?",
      "A good way to respond to a loaded question is to...|Point out the hidden assumption politely|Agree quickly|Walk away silently",
      "Which is a fair, neutral question?|How did you prepare for the quiz?|Why did you fail the quiz again?|How lazy were you before the quiz?",
      "'Have you stopped cheating on tests?' assumes you...|Cheated before|Like tests|Have free time",
      "Why are loaded questions unfair?|Any short answer seems to admit something|They are too polite|They are too quiet",
      "To make a question neutral, you should...|Remove the hidden claim|Add more words|Ask it twice",
      "When you ask questions to learn, it is best to be...|Open and neutral|Tricky|Fast"
    ]),
    SC("Plain language over jargon", "🔤", "Jargon is the special vocabulary of a group, such as doctors or gamers. It helps experts but confuses everyone else. When your listeners are outside the group, say it in plain language or explain the term the first time you use it.", "Ask: would everyone in the room know this word?", "Instead of 'We need to optimize the pipeline', say 'We need to make the steps faster.'", [
      "Jargon is...|Special words used inside a group|A short speech|A kind of rhyme",
      "When talking to a general audience, you should...|Explain or replace jargon|Use more jargon|Whisper the jargon",
      "Which is plainer?|Use the word again|Reiterate the lexical item|Utilize repetition of terminology",
      "If you must use a technical word, you can...|Define it in a few simple words|Skip the meaning|Hope no one asks",
      "Why do speakers sometimes use too much jargon?|To sound smart, but listeners get lost|Because it is always clearer|Because it is shorter always",
      "Which sentence fits a talk to younger students?|Plants make food from sunlight|Photosynthesis facilitates autotrophic nutrition|Chlorophyll-mediated glucose synthesis occurs",
      "Plain language means...|Clear, simple words for your audience|Boring facts|Never using any long word",
      "Using jargon with other experts is...|Often fine, since they know it|Always rude|Against the rules"
    ]),
    SC("Denotation and connotation", "💭", "Denotation is the dictionary meaning of a word. Connotation is the feeling or idea that comes with it. 'Thrifty' and 'cheap' both mean spending little, but 'thrifty' sounds good and 'cheap' sounds bad. Speakers pick words for both meaning and feeling.", "Separate what the word means from how the word feels.", "'Curious' feels friendlier than 'nosy', though both describe someone who asks questions.", [
      "The dictionary meaning of a word is its...|Denotation|Connotation|Rhythm",
      "The feeling that comes with a word is its...|Connotation|Denotation|Volume",
      "Which word has a more positive feeling?|Slim|Skinny|Bony",
      "Which word has a more negative feeling?|Stubborn|Determined|Persistent",
      "'Thrifty' and 'cheap' have about the same...|Denotation|Connotation|Spelling",
      "A speaker who wants a warm feeling picks words with...|Positive connotations|No meaning|Many syllables",
      "Which word feels most friendly?|Confident|Arrogant|Bossy",
      "Why does connotation matter in a speech?|Words change how listeners feel|It changes the dictionary|It makes you louder"
    ]),
    SC("Barriers to listening", "🚧", "Good listening has enemies. Noise outside is one. Inside, we may plan our reply instead of hearing, judge the speaker too soon, or let our mind wander. Name the barrier and you can work around it.", "Find what is getting in the way: outside noise, inside thoughts, or a quick judgment.", "If you notice yourself rehearsing your answer, gently drop it and go back to the speaker's words.", [
      "Planning your reply while someone talks is a barrier because...|You stop hearing them|It saves time|It shows respect",
      "A noisy hallway is an example of...|An outside barrier|An inside barrier|A good habit",
      "Which is an inside barrier?|Daydreaming|A slamming door|A loud fan",
      "A good fix for a noisy place is to...|Move closer or find a quieter spot|Talk over the speaker|Stop listening",
      "Deciding you dislike a speaker before they finish is called...|Judging too soon|Active listening|Note taking",
      "When your mind wanders, the best move is to...|Bring your attention back to the speaker|Give up completely|Interrupt",
      "Which helps you beat a listening barrier?|Eye contact and a few notes|Looking at your phone|Finishing their sentences",
      "Being very tired is a barrier since...|It is hard to focus|It makes you louder|It makes you faster"
    ]),
    SC("Reflective listening", "🪞", "Reflective listening means saying back what you heard, including the feeling. 'It sounds like you were frustrated when the group left you out.' It shows you understood, and the speaker can correct you if you missed something.", "A reflection mirrors the speaker's meaning and feeling without adding advice.", "Friend: 'My team lost and I missed the shot.' You: 'You sound disappointed about the game.'", [
      "Reflective listening means...|Saying back the meaning and feeling you heard|Giving advice at once|Changing the subject",
      "Which is a reflective statement?|You sound worried about the test|You should just study more|That reminds me of my trip",
      "Why reflect the feeling as well as the facts?|It shows you understood the person|It uses more time|It hides your opinion forever",
      "If your reflection is wrong, the speaker can...|Correct you|Do nothing|Be unfairly blamed",
      "A reflection should NOT include...|A lecture|A feeling word|A restatement",
      "A friend says, 'Nobody picked me for the team.' A good reflection is...|That sounds really hurtful|Just pick another team|Everybody gets left out",
      "Which phrase starts a reflection?|It sounds like you...|You must...|Obviously you...",
      "The goal of reflective listening is to...|Make the speaker feel heard|Win the talk|Finish quickly"
    ]),
    SC("Concrete words", "🧱", "Abstract words name ideas, like 'success' or 'fairness'. Concrete words name things we can see, hear or touch, like 'a gold medal' or 'a shared sandwich'. Listeners remember concrete pictures. Pair each big idea with a concrete example.", "Which choice could you see or touch in real life?", "Instead of 'The storm was bad', say 'Rain hammered the roof and the lights flickered.'", [
      "Which phrase is more concrete?|A cracked red bicycle|A bad situation|A thing of value",
      "An abstract word names...|An idea you cannot touch|Only animals|A color",
      "Which word is abstract?|Freedom|Table|Backpack",
      "Why use concrete details in a talk?|They help listeners picture it|They make it quieter|They lengthen words",
      "To make 'kindness' concrete, you could say...|She shared her umbrella in the rain|Kindness is a good thing|Being nice matters",
      "Which sentence paints a clearer picture?|Steam curled from the hot cocoa|The drink was nice|Something warm was there",
      "A good pattern is to state an idea, then give...|A concrete example|A longer idea|A new topic",
      "Which word is concrete?|Lantern|Honesty|Importance"
    ]),
    SC("Cut the clutter", "✂️", "Wordy speech buries your point. Clutter words like 'really', 'in order to' and 'the fact that' can often go. 'Due to the fact that it rained' becomes 'Because it rained.' Shorter is stronger for the ear.", "Find the version that keeps the meaning with the fewest words.", "'At this point in time' can just be 'now'.", [
      "Which is the tightest way to say 'in the event that it rains'?|If it rains|In case of the possibility of rain|When there is rain possible",
      "'Due to the fact that' can be replaced by...|Because|Whereas|Therefore indeed",
      "Which sentence is tighter?|We left early|We made a decision to leave at an early time|We did leave at early times",
      "Cutting clutter helps listeners because...|The main point stands out|There is less sound|There are fewer questions",
      "Which word is often clutter?|Really really|Because|Tomorrow",
      "'In order to win' can become...|To win|In an effort of winning|For the winning",
      "Which is NOT clutter?|The key fact the listener needs|A repeated empty phrase|A long warm-up that says nothing",
      "Tightening a speech means you...|Remove words that add nothing|Remove all details|Talk faster"
    ]),
    SC("The callback", "📞", "A callback brings back an earlier joke, image or phrase near the end. It ties the talk together and rewards listeners who were paying attention. If you opened with a story about a lost umbrella, you might finish by returning to that umbrella.", "A callback returns to something from earlier, with a new meaning.", "Open: 'I almost missed the bus.' Close: 'And today I am glad I caught this bus to a new idea.'", [
      "A callback is...|Returning to an earlier image or phrase|Calling the audience on the phone|Reading the title again",
      "Where does a callback usually work best?|Near the end|Only in the middle of a word|Before you start",
      "Why use a callback?|It ties the talk together|It shortens your speech to zero|It hides the topic",
      "If your opening was about a puzzle, a callback might be...|Ending with the last piece clicking in|Starting a new unrelated story|Skipping the ending",
      "A callback works best when it...|Adds new meaning|Repeats a whole paragraph|Contradicts your point",
      "Listeners enjoy callbacks because...|They notice the connection|They are confused|They can sleep",
      "Which is a callback?|And that, friends, is how the tiny seed from my first story became a tree|Next topic: sports|I forgot what I was saying",
      "A callback is a kind of...|Structure that echoes the beginning|Mistake|Costume"
    ]),
    SC("Script, outline or memory?", "📝", "You can deliver a talk three ways. A full script keeps wording exact but can sound stiff. An outline of key points sounds natural. Full memorization can look smooth but can fall apart if you forget a line. Many speakers use an outline and memorize only the opening and closing.", "Think about what each method gives you and what it costs you.", "For a ten-minute class talk I might use a one-page outline and know my first and last lines by heart.", [
      "Which method is most likely to sound natural and flexible?|An outline of key points|Reading a script word for word|Reciting without practice",
      "A risk of full memorization is...|Losing your place if you forget a line|Using too many cards|Speaking too clearly",
      "A full script is best when...|Exact wording matters, like an official statement|You want to chat|You have no time to prepare",
      "Many speakers memorize only...|The opening and closing|Every comma|The slide numbers",
      "Reading a script word for word can make a talk sound...|Stiff|Free|Rushed always",
      "Which tool fits an outline talk?|A few cue cards with key points|A page of paragraphs|Nothing at all",
      "If you lose your place in an outline talk, you can...|Check your next key point|Start over from the very top|Stop talking",
      "The best way to feel ready with any method is to...|Practice out loud|Skip practice|Read it once silently"
    ]),
    SC("Using the stage", "🎭", "Where you stand is a message. Move with purpose: step forward for an important point, move to a new spot for a new idea, and stand still when you want weight. Pacing back and forth without reason distracts the audience.", "Ask whether a movement has a reason or is only a nervous habit.", "I step to the left for the 'before' story and to the right for the 'after' story.", [
      "A purposeful move might be...|Stepping forward for a key point|Pacing during every sentence|Turning your back",
      "Pacing without a reason is...|Distracting|Powerful|Required",
      "Standing still during a key sentence can show...|Weight and confidence|Boredom only|Fear always",
      "Moving to a new spot for a new idea helps listeners...|Notice the change of topic|Forget the point|Fall behind",
      "Which is a nervous habit?|Rocking side to side|Stepping forward to make a point|Pausing between ideas",
      "Where should most of your body face?|The audience|The screen|The wall",
      "When you use slides, you should avoid...|Talking to the screen with your back to people|Looking at listeners|Standing near the side",
      "Planning your movement in practice helps you...|Look steady and intentional|Forget your words|Speak less"
    ]),
    SC("Plan your breath", "🌬️", "Breath is the fuel for your voice. Breathe low, with your belly and ribs, not just your upper chest. Plan breaths at natural stops, like the end of a sentence or idea. Running out of air makes your voice thin and rushed.", "Think about where a natural stop is and how deep the breath should be.", "I mark small slashes at the end of each sentence in my notes to remind me to breathe.", [
      "Where is the best place to breathe in a speech?|At natural stops between ideas|In the middle of a word|Only at the end of the talk",
      "A deep low breath uses...|Your belly and ribs|Only your shoulders|Only your nose tip",
      "Running out of air makes a voice...|Thin and rushed|Richer and steady|Louder always",
      "Which helps you plan breaths?|Marking pauses in your notes|Reading faster|Skipping punctuation",
      "Breathing high in the chest with raised shoulders often means...|Shallow breath|Deep breath|No breath",
      "A long sentence is easier if you...|Break it into smaller breath groups|Read it faster|Whisper it",
      "A slow breath before you begin can...|Calm your nerves|Make you forget|Make you tired",
      "Which sign tells you to breathe?|A period or comma|A page number|A picture"
    ]),
    SC("Apology and repair", "🤝", "A good apology is short and sincere. Say what you did, say that it was wrong, and say how you will fix it or do better. Avoid 'I'm sorry you felt that way', which puts the problem on the other person. Speak calmly and look at the person.", "Check that the apology owns the mistake and offers repair.", "'I'm sorry I interrupted you. That was rude. Please go on and I will listen.'", [
      "A strong apology includes...|What you did and how you will make it better|An excuse and a joke|Blame for the other person",
      "Which is the better apology?|I'm sorry I took your pen without asking. I will buy you a new one|I'm sorry if you were upset|Sorry, but you never told me",
      "'I'm sorry you felt that way' is weak because...|It does not own what you did|It is too long|It is too kind",
      "A good apology is usually...|Short and sincere|Very long and dramatic|Delivered as a joke",
      "After you apologize, you should...|Follow through on how you will do better|Expect instant forgiveness|Move on without a word",
      "Making excuses in an apology...|Weakens it|Strengthens it|Is needed",
      "Your tone when apologizing should be...|Calm and sincere|Bored|Angry",
      "The word 'but' in an apology often...|Cancels the sorry before it|Makes it clearer|Makes it kinder"
    ]),
    SC("A hard truth, kindly", "💬", "Sometimes you must say something the listener may not want to hear. Pick a private moment, start with respect, describe what you saw rather than judging the person, and offer help. Honest and kind can go together.", "Ask how to be honest about the situation without attacking the person.", "'I noticed the group project was late, and I want us to finish it together' is better than 'You are lazy.'", [
      "A kind way to share a hard truth is to...|Describe what you saw and offer help|Insult the person's character|Say it in front of everyone",
      "Where is the best place for a hard conversation?|In private|In the middle of lunch with everyone|On a loud stage",
      "Which opening is kinder?|I want to talk about something that might be hard to hear|You always mess everything up|Everyone is tired of you",
      "Describing what you saw is better than...|Judging the person|Using facts|Staying calm",
      "Honesty and kindness...|Can go together|Cannot go together|Mean the same thing",
      "After sharing a hard truth, you can...|Listen to the other person's side|Walk away|Raise your voice",
      "Which tone fits?|Calm and caring|Sneering|Shouting",
      "A good reason to speak up is...|To help the situation improve|To embarrass someone|To win"
    ]),
    SC("Three-minute public comment", "🏛️", "Town meetings often give each speaker a short time, like three minutes. Make it count. Say who you are in a sentence, state your request in the first moments, give two strong reasons, and end by repeating your request. Practice with a timer.", "Short time means one clear request supported by a few strong points.", "Opening: 'I ask the council to add crosswalk lights on Oak Street.' Then two reasons, then the same ask again.", [
      "With only three minutes, you should state your request...|Early|At the very end only|Never",
      "How many main reasons fit well in three minutes?|Two or three|Fifteen|None",
      "Which is a clear request?|Please add a crosswalk light on Oak Street|Things are tough|Someone should do something",
      "Ending by repeating your request helps listeners...|Remember your ask|Forget the topic|Doubt you",
      "Why practice with a timer?|To fit the time limit|To make you faster at silence|To use more slides",
      "When your time is up, you should...|Wrap up and thank the listeners|Keep talking louder|Walk off without a word",
      "Which belongs in a public comment?|A specific fact about the problem|A long list of unrelated complaints|An insult to a leader",
      "Speaking respectfully to leaders you disagree with...|Makes you more persuasive|Is unnecessary|Weakens your point"
    ]),
    SC("The lightning talk", "⚡", "A lightning talk is a very short talk, often five minutes or less, built around one idea. There is no room for a long warm-up. Hook early, make one point, give one strong example, and finish with a clear takeaway.", "One talk, one idea, one memorable ending.", "Idea: 'Small habits add up.' Example: a student who reads ten minutes a night. Takeaway: start with one small habit.", [
      "A lightning talk focuses on...|One main idea|Ten different topics|A long history",
      "In a very short talk you should...|Skip the long warm-up|Add a long introduction|Read everything on slides",
      "A takeaway is...|The one thing you want listeners to remember|A snack|A title slide",
      "How many strong examples fit in a five-minute lightning talk?|One or two|Twenty|None",
      "What helps a lightning talk stay on time?|Practicing with a timer|Adding more topics|Speaking slower and slower",
      "Which is a good lightning-talk topic?|Why a five-minute walk helps me think|Everything about science|The whole story of my life",
      "The opening of a lightning talk should be...|Quick and interesting|Slow and vague|Skipped",
      "If you run short on time, you should...|Cut a detail, not your main point|Cut the ending entirely|Speak twice as fast"
    ])
  ];

  // ================= LEVEL 17 =================
  const L17 = [
    SC("Cherry-picking", "🍒", "Cherry-picking means choosing only the facts that support your side and hiding the rest. If a speaker shows three sunny days and says 'It never rains here', they ignored the rainy ones. Fair speakers show the whole picture, even the facts that complicate their view.", "Ask what facts might be missing from the story being told.", "'Our test scores went up in math!' might skip that reading scores went down.", [
      "Cherry-picking is...|Showing only the facts that fit your side|Using a lot of examples|Reading slowly",
      "Which question helps spot cherry-picking?|What evidence is left out?|How loud was it?|Who spoke first?",
      "A speaker says 'Sales rose in June' but skips the other eleven months. This is...|Cherry-picking|Full evidence|A joke",
      "Fair speakers...|Mention facts that complicate their claim|Hide all opposing facts|Use only one fact",
      "Why is cherry-picking dishonest?|It gives a one-sided picture|It uses too many facts|It is too short",
      "To check a claim for cherry-picking, you can...|Look at the whole set of data|Trust the first example|Ignore the numbers",
      "A single great example presented as the whole story is...|Not enough|Always enough|A conclusion",
      "A speaker who admits some limits in their evidence often seems...|More trustworthy|Less honest|Quieter"
    ]),
    SC("False equivalence", "⚖️", "A false equivalence says two things are the same when they are very different in size or kind. 'Forgetting to push in a chair is just like breaking a window.' Comparing them equally ignores the real difference. Notice what the comparison leaves out.", "Ask whether the two things are really equal in size, kind or effect.", "Saying a small spelling slip and a major cover-up are 'both mistakes, so the same' ignores how different they are.", [
      "A false equivalence treats two different things as...|The same|Opposites|Unknown",
      "Which is a false equivalence?|Spilling a drop of juice is the same as ruining the whole house|A square and a rectangle both have four sides|Rain and snow are both weather",
      "What does a false equivalence ignore?|Important differences|The speaker|The title",
      "A fair comparison considers...|Size, kind and effect|Only the names|Only the feelings",
      "'Both are sports, so they are equally dangerous' is weak because...|Sports differ a lot in risk|Sports are never dangerous|It has too many words",
      "A fair response to a false equivalence is...|Name the difference that matters|Agree and move on|Say nothing",
      "Which statement is a fair comparison?|Both a bike and a car carry people, but they differ in speed and risk|A pebble and a mountain are exactly the same|Walking a dog is the same as flying a plane",
      "The word 'just' as in 'it's just the same' can signal...|A possible false equivalence|A fact|A greeting"
    ]),
    SC("Appeal to tradition", "🏰", "An appeal to tradition says 'we have always done it this way, so it must be right.' Old habits can be wise, but age alone is not a reason. Ask whether the old way still works and whether a new way would be better.", "A tradition needs a reason beyond how old it is.", "'We have always held the meeting at 7 a.m.' is not a reason. 'Most members can attend at 7 a.m.' is.", [
      "An appeal to tradition argues that something is good because...|It is old or familiar|It has evidence|It is cheaper",
      "Which statement is an appeal to tradition?|We have always done it this way, so we should not change|This change will save us two hours|Studies show the new way works",
      "Is an old way always wrong?|No, but age alone is not proof|Yes always|Only on Tuesdays",
      "A better reason to keep a practice is...|It still works well|It is old|Nobody asked",
      "A fair question to ask about a tradition is...|Does it still serve us?|How old is the oldest person?|Who spoke first?",
      "Treating something as new, so it must be better, is the opposite mistake. It ignores...|Evidence|Dates|Names",
      "'Our school has always had a bake sale, so it must be the best way to raise money' is weak because...|It gives no evidence of results|Bake sales are bad|It is too short",
      "A balanced speaker honors tradition and...|Checks if it still works|Ignores it|Bans it"
    ]),
    SC("Burden of proof", "📦", "In a debate, the side that makes a claim must support it. That duty is the burden of proof. 'Prove me wrong' tries to flip it. Saying 'Nobody has shown aliens do not exist' does not show they do. If you claim it, you carry the proof.", "Who made the claim? That person needs the evidence.", "If I say 'longer recess improves grades', it is my job to bring evidence, not yours to disprove me.", [
      "The burden of proof usually rests on the side that...|Makes the claim|Stays silent|Speaks last",
      "'You cannot prove me wrong, so I am right' is a problem because...|The claimer must give support|It is too polite|It has numbers",
      "If you claim a new rule will help, you should...|Bring reasons and evidence|Ask others to disprove it|Say it louder",
      "A debater says 'Prove it' to a speaker with no evidence. This is...|A fair challenge|Always rude|A red herring",
      "Which is the stronger claim?|Homework tracking boosts completion, according to a school survey|Homework tracking just obviously works|Nobody can show it does not work",
      "Flipping the burden means...|Making others disprove your claim|Giving your own proof|Sharing evidence",
      "The side asking for a change usually needs to show...|Why the change is needed|That nobody disagrees|Nothing",
      "Good debaters support claims with...|Evidence|Dares|Volume"
    ]),
    SC("Define your terms", "📖", "Words can mean different things to different people. Before arguing about 'fair' or 'healthy' or 'late', say what you mean. A clear definition keeps you and your opponent from talking past each other.", "Pick the answer that makes the meaning of a word clear and specific.", "'By healthy lunch, I mean one with a fruit or vegetable and no sugary drink.'", [
      "Why define key terms at the start?|So everyone argues about the same thing|To use up time|To confuse the opponent",
      "Which is a clear definition of 'late' for a school rule?|Arriving after the 8:30 bell|Not being on time-ish|Whenever|",
      "When two sides use a word differently, they may be...|Talking past each other|Agreeing perfectly|Finished",
      "A definition should be...|Clear and specific|Secret|Tricky",
      "Changing a word's meaning halfway through an argument is...|Unfair|Smart|Required",
      "Which sentence offers a definition?|By 'screen time' I mean time on phones, tablets and TV|Screens are everywhere|Time passes",
      "Where do definitions usually go in a speech?|Near the start|After the thanks|Nowhere",
      "A definition that is too broad can make a claim...|Hard to prove or test|Perfectly clear|Short"
    ].map(r => r.replace(/\|$/, "")).slice(0, 8)),
    SC("Criteria for judging", "📏", "In a values debate, both sides need a measuring stick, called a criterion. If the value is 'justice', the criterion could be 'treating people fairly'. Then you show how your side meets the measuring stick better. The judge compares the sides using it.", "A criterion is the yardstick used to decide who is winning.", "Value: health. Criterion: how many students stay well. Then show your plan keeps more students well.", [
      "A criterion in a values debate is...|A measuring stick for the value|A prize|A time limit",
      "The value is the big goal. The criterion is...|How you measure that goal|The speaker's name|The room",
      "If the value is 'safety', a fitting criterion is...|Fewer injuries|More noise|Longer speeches",
      "After presenting a criterion, you should show that...|Your side meets it better|Your side ignores it|Nobody cares",
      "Why share a criterion at the start?|It tells the judge how to decide|It hides your case|It lengthens the break",
      "Two sides can disagree about...|Which criterion is best|Nothing at all|Only the date",
      "Which pair fits best?|Value: fairness, criterion: equal chances for everyone|Value: fairness, criterion: the color blue|Value: fairness, criterion: lunch",
      "A good criterion is...|Clear and connected to the value|Random|Hidden"
    ]),
    SC("Contentions and tags", "🏷️", "A contention is a main argument in your case. Each one gets a short label called a tag, like 'It saves money' or 'It protects people'. Under each tag you give a claim, evidence and a reason. Tags help listeners follow along and help judges take notes.", "A tag is a short label for a bigger argument.", "Tag: 'Bike lanes reduce crashes.' Then evidence, then why it matters.", [
      "A contention is...|A main argument in your case|A mistake|A time signal",
      "A tag is...|A short label for an argument|A name tag|A joke",
      "Which makes the best tag?|Recycling cuts waste|Stuff about recycling and other things I know|Maybe",
      "Why do tags help listeners?|They signal where you are in the case|They make speeches longer|They hide the claim",
      "Under a tag you usually give...|Claim, evidence and reasoning|Only a quote|A song",
      "How many main contentions fit a short speech?|Two or three|Twelve|Zero",
      "Speaking your tag clearly lets a judge...|Write it down|Fall asleep|Skip your evidence",
      "A tag should be...|Short and clear|Long and vague|Spoken quietly"
    ]),
    SC("Roadmaps and clash", "🗺️", "A roadmap is a quick preview of the order of your speech: 'First I will answer their point, then I will present two new arguments.' Clash is when your arguments directly meet the other side's arguments. Without clash, speeches pass by each other like ships in the night.", "A roadmap says the order; clash means answering the other side's actual points.", "Roadmap: 'I will rebuild my case, then rebut their cost argument.' Clash: 'Their cost number leaves out savings.'", [
      "A roadmap is...|A preview of your speech order|A map of the school|A list of snacks",
      "Clash means...|Answering the other side's actual arguments|Arguing loudly|Agreeing with everyone",
      "A debate without clash feels like...|Speeches that never meet|A strong debate|A short debate",
      "Where does a roadmap go?|At the beginning of the speech|After the thank you|In the footnotes",
      "Which is a roadmap?|First I will respond to cost, then I will add two new points|Cost is bad|Thank you everyone",
      "Which shows clash?|Their savings figure ignores repair costs|Let me move on to my own favorite topic|I did not hear them",
      "Why give a roadmap?|It helps listeners follow|It shortens your talk to zero|It confuses opponents",
      "Responding to an argument you actually heard is...|Good clash|Rude|A red herring"
    ]),
    SC("The final focus", "🏁", "The last speech in a debate is not the time for new arguments. It tells the judge why you win. Pick the two or three issues that matter most, say who won each one and why, and end with a clear reason to vote for your side.", "A final speech selects and weighs; it does not start something new.", "'The most important question was safety. Our evidence shows safety improves. That is why you should vote for us.'", [
      "A final speech should...|Explain why you win|Add brand new arguments|Read the whole case again",
      "How many key issues should a final speech choose?|Two or three|All fifty|None",
      "Which fits a final speech?|The biggest issue was safety, and we won it because of the crash data|Here is a totally new point I forgot|I have no idea",
      "Adding new arguments at the very end is unfair because...|The other side cannot answer|It is too short|It is polite",
      "Weighing in a final speech means...|Explaining which points matter most|Counting words|Measuring the room",
      "A good ending line gives the judge...|A clear reason to choose your side|A joke only|A new topic",
      "Why summarize in the final speech?|It brings the judge back to your best points|It buries your points|It adds time",
      "The tone of a final speech should be...|Clear and confident|Confused|Hurried"
    ]),
    SC("Impromptu prep time", "⏱️", "Impromptu speaking gives you a topic with only a minute or so to prepare. Use the time to choose one main point, one example and a closing line. Skip the urge to plan everything. A simple structure carries you.", "With a minute, plan the skeleton, not the whole body.", "Topic: 'A good friend.' Point: they listen. Example: my friend who stayed after class. Close: listen first.", [
      "In impromptu prep you should plan...|One point, one example and a close|Every word|Nothing",
      "A good use of a one-minute prep is to...|Jot a few key words|Write a full script|Practice a long joke",
      "A simple structure helps because...|It gives you a path to follow|It makes you quiet|It hides mistakes",
      "If you blank mid-talk, you can...|Pause and return to your point|Run away|Repeat the first line forever",
      "Which is the best opening for an impromptu talk?|State your main point clearly|Apologize for not being ready|Say 'um' several times",
      "Speaking time should be...|About what was assigned|As long as you can|Silent",
      "Which closing works?|Restate the main point in a fresh way|Fade into mumbling|Say you are done",
      "Impromptu speaking improves with...|Practice on random topics|No practice|Only reading"
    ]),
    SC("Moderating a discussion", "🎙️", "A moderator guides a talk without taking sides. They introduce the topic, ask clear questions, keep time, invite quieter voices and politely stop anyone who goes on too long. A moderator's job is the conversation, not their own opinion.", "A moderator is a fair guide, not a participant on a side.", "'Thanks, Sam. Let's hear from someone who has not spoken yet.'", [
      "A moderator should...|Stay fair and guide the talk|Argue for one side|Do all the talking",
      "A good moderator invites...|Quieter voices|Only the loudest|Only friends",
      "When someone talks too long, a moderator can...|Politely move things along|Yell|Ignore the clock",
      "Which is a good moderator question?|What evidence supports your view?|Don't you think they are wrong?|Why are you so silly?",
      "A moderator who shares strong personal opinions...|Weakens their fairness|Improves the talk|Is required",
      "Keeping time helps by...|Giving everyone a turn|Making it boring|Stopping all questions",
      "A good start to a discussion is...|State the topic and the ground rules|Jump into an argument|Read nothing",
      "If two people argue over each other, the moderator can...|Ask them to take turns|Join in|Leave"
    ]),
    SC("Euphemism and doublespeak", "🎭", "A euphemism is a softer word for something harsh, like 'passed away' for 'died'. Kind euphemisms are fine. Doublespeak twists words to hide the truth, like calling a price hike a 'revenue enhancement'. Ask: is the soft word being kind, or hiding something?", "Does the soft wording protect feelings or hide the facts?", "'We are rightsizing' may really mean people lost their jobs. Ask what really happened.", [
      "A euphemism is...|A softer word for something harsh|A loud word|A made-up fact",
      "Doublespeak is language that...|Hides or twists the truth|Is spoken twice|Is very quiet",
      "'Passed away' for 'died' is usually...|A kind euphemism|Doublespeak|A statistic",
      "'Revenue enhancement' for 'higher prices' may be...|Doublespeak|Poetry|A fact",
      "A good question to ask about vague phrases is...|What does that actually mean?|How many letters?|Who is shortest?",
      "A speaker who wants to be honest uses...|Clear words|Fancy words to hide facts|No words",
      "Which sentence is the clearest?|The company is closing the store|The company is optimizing its footprint|The store is entering a transition",
      "Euphemisms can be fine when they...|Show care without hiding the truth|Fool people|Replace facts"
    ]),
    SC("Understatement and hyperbole", "📏", "Hyperbole is dramatic exaggeration: 'I've told you a million times.' Understatement plays something down: 'It's a bit chilly' during a blizzard. Both are used for humor or emphasis. Listeners should know they are not literal.", "One makes it bigger, the other makes it smaller. Check which direction.", "'This backpack weighs a ton' is hyperbole. 'That test was a little tricky' after a very hard one is understatement.", [
      "'I've waited forever' is an example of...|Hyperbole|Understatement|A statistic",
      "Playing something down on purpose is...|Understatement|Hyperbole|Rhyme",
      "'It is a little damp,' said after a flood, is...|Understatement|Hyperbole|A proof",
      "Why do speakers use hyperbole?|For humor or emphasis|To prove facts|To lie",
      "A problem with using hyperbole in a serious fact claim is...|Listeners may think you are exaggerating|It sounds too quiet|It is too short",
      "'My bag weighs a ton' is hyperbole because...|It is not literally true|It is a fact|It is a question",
      "Which is understatement?|The fire alarm was slightly noticeable|The alarm shook the universe|The alarm lasted a million years",
      "When you want to be exact, avoid...|Exaggeration|Numbers|Details"
    ]),
    SC("Climax and order", "📈", "Climactic order arranges ideas from least to most important so the talk builds. 'It will save time, save money, and save lives.' The strongest point lands last. In some talks you may open with your strongest point, but a build to the end is a classic move.", "Look for the order that grows in importance.", "'It is cheap, it is useful, and it can change lives' climbs to the biggest idea.", [
      "Climactic order moves from...|Least important to most important|Most important to least|Short to long only",
      "Which sentence builds in climactic order?|It will save time, save money, and save lives|It will save lives, save money, and save a minute|It will save a minute, then lives, then nothing",
      "In a build to the end, the strongest point goes...|Last|First only|In the middle forever",
      "Why does a build keep listeners interested?|They want to see where it goes|It makes the talk shorter|It repeats facts",
      "Which list climbs?|A drop, a puddle, an ocean|An ocean, a puddle, a drop|A puddle, a drop, a puddle",
      "Listeners often remember best what comes...|At the end|Only the title|Nothing",
      "A weak ending after a strong build...|Lets the energy fall|Raises the energy|Is required",
      "Climactic order is most like a...|Staircase going up|Flat road|Circle"
    ]),
    SC("The press conference", "📸", "At a press conference a speaker shares news and then answers questions from reporters. Begin with a short, clear statement of the main facts. Stay calm, answer the question you were asked, and say 'I will find out' rather than guessing.", "A short clear statement first, then honest, calm answers.", "'Here is what we know. Here is what we do not know yet. We will update you tomorrow.'", [
      "A press conference statement should start with...|The main facts, clearly|A long joke|The last question",
      "If you do not know an answer, you should say...|I do not know yet, I will find out|Make up something|Nothing at all",
      "Reporters ask questions to...|Learn and share information|Embarrass you only|Waste time",
      "A good speaker keeps their tone...|Calm|Defensive|Angry",
      "Which is a fair answer to a question you do not have facts for?|I do not have that information right now|It is definitely true|No comment forever",
      "Answering the question you were asked is better than...|Dodging with a different topic|Giving facts|Staying brief",
      "Sharing what is known and what is not known builds...|Trust|Confusion|Delay",
      "A short opening statement helps because...|Reporters can focus on key points|It hides the facts|It takes an hour"
    ]),
    SC("Pitching an idea", "💡", "A pitch asks listeners to say yes to your idea. A strong order is: the problem, your solution, why it works, what you need, and the ask. Keep it honest. Promises you cannot keep will cost you trust.", "Follow the path from problem to solution to a clear ask.", "'Our hallway is crowded. A one-way sign fixes it. Teachers tested it. We ask for permission to try it for two weeks.'", [
      "A strong pitch begins with...|The problem|The thank you|The credits",
      "The final part of a pitch is...|A clear ask|A mystery|An apology",
      "Which order works best?|Problem, solution, proof, ask|Ask, ask, ask|Proof, thank you, problem",
      "Making promises you cannot keep...|Loses trust|Wins trust|Improves the pitch",
      "A good pitch is also...|Honest about limits|Full of exaggerated claims|Silent about costs",
      "What does 'the ask' mean?|What you want the listeners to do|A question to the clock|A joke",
      "To prove your solution works, you can...|Share a test or an example|Say it works louder|Skip proof",
      "Practicing a pitch aloud helps you...|Smooth out the timing|Forget the idea|Lengthen it"
    ]),
    SC("Negotiation basics", "🤝", "Negotiation is talking to reach a deal both sides can accept. Start by understanding what each person really needs. Look for trades: you give a little and get a little. Staying respectful keeps the door open.", "Think of what each side needs and a fair trade that helps both.", "I want the computer on Monday and Wednesday. My sister wants Tuesday and Thursday. We can split the week.", [
      "A good negotiation aims for...|A deal both sides can accept|Winning everything|Silence",
      "The first step is often to...|Understand what each side needs|Demand your way|Walk out",
      "A trade means...|Each side gives a little and gets a little|One side gives everything|Nobody gives",
      "Which is a respectful opening?|Let's find a plan that works for both of us|You have to do what I say|This is your fault",
      "When two people want the last cookie, a fair negotiation might be...|Split it or take turns|Fight|Throw it away",
      "Staying respectful during a negotiation...|Keeps the talk going|Slows everything|Is optional",
      "Asking 'What matters most to you?' helps by...|Revealing needs|Starting an argument|Ending the talk",
      "A deal that only helps one person usually...|Does not last|Lasts forever|Is best"
    ]),
    SC("Calming a tense talk", "🕊️", "When a conversation gets heated, you can lower the temperature. Slow down, speak softly, name what you agree on, and reflect the other person's feeling. Take a break if needed. You do not have to win the moment to solve the problem.", "Slow and soft moves tension down; fast and loud moves it up.", "'I can see this matters a lot to you. Can we take a short break and come back?'", [
      "To calm a heated talk, you can...|Slow down and speak softly|Speak faster|Raise your voice",
      "Naming something you agree on...|Helps lower tension|Makes it worse|Is silly",
      "When emotions are too high, a good move is...|Take a short break|Keep arguing harder|Insult the other person",
      "Which sentence helps calm things?|I can see this really matters to you|You are being ridiculous|Whatever",
      "You do not need to win the moment because...|The goal is to solve the problem|Winning is rude|Talks have no goals",
      "Loud, fast speech usually makes tension...|Rise|Fall|Disappear",
      "Reflecting the other person's feeling shows...|You are listening|You are scared|You are bored",
      "If someone is yelling, a calm reply...|Often helps them settle|Never works|Is rude"
    ])
  ];

  // ================= LEVEL 18 =================
  const L18 = [
    SC("Appeal to ignorance", "❓", "An appeal to ignorance says 'nobody has proved it false, so it must be true' or 'nobody has proved it true, so it must be false.' Not knowing is not proof either way. Good speakers say 'we do not know yet' and look for evidence.", "Absence of proof is not the same as proof of the opposite.", "'No one has shown the new cafeteria plan fails, so it must work' skips actual evidence.", [
      "An appeal to ignorance says something is true because...|It has not been proved false|It has been tested many times|An expert said so",
      "Which statement is an appeal to ignorance?|No one has proved ghosts do not exist, so they must|The test results show a clear trend|The study had two hundred students",
      "A better move when you do not know is to say...|We do not know yet|It is surely true|It is surely false",
      "Not having proof of something means...|You still need evidence|It is automatically true|It is automatically false",
      "A good response to this trick is...|Ask what the actual evidence is|Agree quietly|Change the topic",
      "Which sentence is honest about uncertainty?|The evidence is not clear yet|Everyone knows it is true|It is false because no one proved it",
      "Why is this trick tempting?|Gaps in knowledge feel like space to fill|It gives real facts|It is short and funny",
      "Science handles unknowns by...|Testing and gathering evidence|Guessing loudly|Ignoring questions"
    ]),
    SC("Moving the goalposts", "🥅", "Moving the goalposts means changing what counts as proof after someone meets the first standard. 'Show me one example.' Then, when you do: 'Well, I meant ten.' Fair debates keep the standard the same. Name the rule at the start so it cannot slide.", "Check whether the standard of proof stayed the same.", "If we agree that three sources are enough, we should not ask for ten after I bring three.", [
      "Moving the goalposts means...|Changing the standard after it is met|Walking around the room|Starting over politely",
      "Which is moving the goalposts?|Fine, you showed one, but now I demand a hundred|You showed one, so I accept the point|Let us agree on how much proof we need",
      "A fair way to prevent it is to...|Agree on the standard first|Ignore the standard|Shout",
      "This tactic is unfair because...|The other side can never win|It is too quiet|It uses facts",
      "When someone does it, you can say...|We agreed on a different standard earlier|You are right again|I give up",
      "A speaker who keeps changing the rules is hard to...|Trust|Hear|See",
      "Asking for more evidence is fine when...|The need is reasonable and stated fairly|You just want to avoid losing|It keeps changing",
      "Which statement keeps the standard steady?|Three examples were the agreement, and you gave three|I only count the ones that disagree|Whatever I feel today"
    ]),
    SC("Weak analogy", "🔗", "An analogy compares two things to explain an idea. A weak analogy compares things that are alike in some ways but different in the way that matters. 'A school is like a business, so students are customers' may leave out that learning is not a purchase. Ask how alike the two really are.", "Test the comparison: is it similar where it counts?", "'A team is like a family' is useful for loyalty but weak for decisions about who gets hired.", [
      "An analogy is...|A comparison used to explain|A made-up statistic|A loud pause",
      "A weak analogy compares two things that are...|Different in the way that matters|Identical in every way|Never discussed",
      "A fair test for an analogy is to ask...|How alike are they where it counts?|How long is it?|Who said it?",
      "A strong analogy usually...|Matches the key features|Matches the color only|Ignores the topic",
      "'A brain is like a computer, so thinking is just calculation' may be weak because...|Brains do much more than calculate|Brains are quiet|Computers are rare",
      "Analogies help listeners by...|Linking new ideas to familiar ones|Hiding the point|Adding fog",
      "Which analogy explains a battery well for kids?|A battery is like a water tank that holds energy to be used later|A battery is like a broccoli|A battery is a cloud",
      "When an analogy breaks down, you can say...|They are alike here but not there|It is perfect|Nothing"
    ]),
    SC("Critical listening checklist", "✅", "Critical listening means hearing a message and weighing it. Ask: What is the main claim? What evidence supports it? Who is speaking and why? What is missing? Does the conclusion follow? You can respect a speaker and still check their reasoning.", "Run through the questions: claim, evidence, source, missing parts, conclusion.", "'The speaker says the app is safe. What evidence? Who made the app? What risks were not mentioned?'", [
      "The first step in critical listening is to find...|The main claim|The speaker's shoes|The clock",
      "Which is a critical listening question?|What evidence supports this?|How tall is the speaker?|Did I like the music?",
      "Asking who is speaking and why helps you spot...|Possible bias|The weather|The time",
      "Critical listening means you...|Weigh what you hear|Disagree with everything|Stop listening",
      "Can you respect a speaker and still question their reasoning?|Yes|No|Only on Fridays",
      "Which question checks the conclusion?|Does the conclusion follow from the evidence?|Is it long?|Is it loud?",
      "What might be missing from a one-sided speech?|Facts that favor the other side|The title|The speaker's name",
      "Writing a few notes while listening helps you...|Check claims later|Forget the topic|Skip thinking"
    ]),
    SC("Structure of a lecture", "🏫", "Long talks have a shape. Listen for the preview of main points, signal words like 'first', 'on the other hand' and 'in summary', and repeated ideas. These clues tell you what matters most, so your notes can follow the lecture's skeleton.", "Spot the signals that tell you where you are in the talk.", "When the speaker says 'There are three causes', I draw three lines in my notes and fill them as I hear them.", [
      "A preview near the start tells you...|The main points coming|The ending|The speaker's age",
      "'In summary' signals that the speaker is...|Wrapping up key points|Starting a new topic|Taking a break",
      "'On the other hand' usually signals...|A contrast|An example|A repeat",
      "If a speaker says 'There are three causes', you should...|Listen for three items|Stop listening|Count the people",
      "Repeated ideas in a lecture are often...|Important|Mistakes|Jokes",
      "Signal words help your notes because...|They show how ideas connect|They make the speaker quieter|They stop the lecture",
      "A good way to keep notes is to...|Use the lecture's structure as your outline|Write every word|Write nothing",
      "Missing the first point, you can...|Leave a gap and fill it in later|Panic|Quit"
    ]),
    SC("Spoken word poetry", "🎤", "Spoken word poetry is poetry made to be performed. Rhythm, repetition, pauses and a strong voice carry the meaning. Unlike a poem you only read quietly, it lives in the sound and the performance. Write for the ear and practice with feeling.", "Spoken word is meant to be heard, so listen for sound and rhythm.", "I repeat my strongest line three times, each with a different pause, to make it land.", [
      "Spoken word poetry is meant to be...|Performed aloud|Read silently only|Never shared",
      "Which tool is especially strong in spoken word?|Rhythm and repetition|Footnotes|Tables",
      "A pause in a performance can...|Let a line sink in|Break the poem for good|Hide the words",
      "Writing 'for the ear' means...|Choosing sounds and phrases that work when heard|Using only long words|Skipping rhythm",
      "A performer can show feeling by...|Changing pace and volume|Staying flat|Looking away",
      "Repeating a key line can...|Make it memorable|Cancel it|Confuse everyone",
      "Which is a good practice step?|Read it aloud and mark pauses|Never rehearse|Speak as fast as possible",
      "Spoken word poems often tell...|Personal or community stories|Only tax rules|Nothing"
    ]),
    SC("Speaking verse", "📜", "Poetry in verse often follows a beat. A line of iambic pentameter has ten syllables in five pairs, soft then strong, like 'da-DUM da-DUM da-DUM da-DUM da-DUM'. When you speak verse, follow the sense first, then let the rhythm help. Do not stop at line ends unless there is punctuation.", "Follow the meaning and punctuation, and let the beat support it.", "In verse, I pause where there is a comma or period, not just where the line ends.", [
      "Iambic pentameter has how many syllables per line?|Ten|Five|Twenty",
      "An iamb is a pair of syllables that goes...|Soft then strong|Strong then soft|Both silent",
      "When speaking verse you should pause where...|The punctuation tells you|Every line ends no matter what|You feel nervous",
      "Following the sense means you...|Speak so the meaning is clear|Ignore the words|Rush",
      "Pentameter means a line has...|Five beats|Ten words|Two stanzas",
      "A good first step with a verse passage is to...|Read it for meaning|Memorize the page number|Skip the poem",
      "Reading each line as a separate sentence can...|Break the meaning|Always help|Make you faster",
      "Rhythm in verse should...|Support the meaning|Hide the meaning|Replace words"
    ]),
    SC("Audio storytelling", "🎧", "Audio stories have no pictures, so sound does the work. Use specific details, vary your voice, add short pauses and sound that fits the scene. Introduce who and where early. Keep sentences short, because listeners cannot reread.", "In audio, the listener builds the picture from sound and words.", "Instead of 'It was spooky', say 'A door creaked. Then it was quiet.'", [
      "In audio storytelling, listeners cannot...|See pictures|Hear your voice|Follow ideas",
      "Short sentences help audio listeners because...|They cannot reread|They are boring|They are loud",
      "Which detail works well in audio?|A door creaked slowly|It was a thing|Stuff happened",
      "Introduce who and where...|Early|At the very end|Never",
      "Varying your voice helps...|Keep attention|Hide the story|Hurt the story",
      "Sound effects should be...|Few and fitting|Constant and loud|Random",
      "Pausing before a surprise can...|Build suspense|Spoil it|Slow nothing",
      "Compared to a printed story, a spoken story needs...|More repetition of key ideas|Less clarity|More footnotes"
    ]),
    SC("Mock trial roles", "⚖️", "A mock trial is a practice court. Roles include attorneys who argue each side, witnesses who answer questions, and a judge who runs the room. Attorneys ask questions to build the case; the other side may ask follow-up questions. Everyone must speak respectfully and stick to the facts of the case file.", "Match each role to its job in the practice court.", "The attorney asks, 'Where were you at three o'clock?' The witness answers from the case file.", [
      "In a mock trial, the judge...|Runs the room and applies the rules|Argues one side|Sells tickets",
      "An attorney's job is to...|Argue and question for one side|Decide the winner alone|Hide the facts",
      "A witness should answer...|From the facts in the case file|With made-up stories|With long speeches",
      "A mock trial is...|A practice court for learning|A real court|A game with no rules",
      "Good attorneys ask questions that are...|Clear and fair|Tricky and rude|Loud",
      "If the other side objects, you should...|Listen to the judge's decision|Argue back at once|Leave",
      "Everyone in a mock trial should be...|Respectful|Silly|Quick to interrupt",
      "A cross-examination is when...|The other side questions a witness|A witness leaves|The judge speaks"
    ]),
    SC("Rules of order", "🔨", "Formal meetings use rules of order so everyone can be heard. To suggest something, a member makes a motion: 'I move that we hold a bake sale.' Another member seconds it. Then the group discusses and votes. Only one thing is discussed at a time, and the chair keeps order.", "Motion, second, discussion, vote: the steps follow in order.", "Member: 'I move that we meet on Fridays.' Second: 'I second.' Then discussion, then a vote.", [
      "A motion is...|A formal suggestion for the group to decide|A kind of dance|A speech ending",
      "After a motion is made, someone usually...|Seconds it|Walks out|Shouts",
      "The usual order is motion, second, discussion and...|Vote|Snack|Nap",
      "The chair's job is to...|Keep order and be fair|Argue every point|Decide alone",
      "How many main topics should be discussed at once?|One|Five|All",
      "Which sentence is a motion?|I move that we hold a cleanup day|The day was fun|Everyone was loud",
      "Why use rules of order?|So everyone can be heard fairly|To slow nothing|To silence people",
      "To speak in a meeting, you usually...|Wait to be recognized by the chair|Shout over others|Stand on a chair"
    ]),
    SC("The keynote or graduation speech", "🎓", "Big-occasion speeches celebrate and inspire. Look back at a shared experience, share one lesson, look forward with hope, and thank the people who helped. Keep it warm, honest and not too long. A personal story makes the lesson real.", "Look back, share a lesson, look forward, and say thanks.", "'We learned that small steps count. As we move on, let us keep taking them. Thank you, teachers and families.'", [
      "A good graduation speech often includes...|A lesson and hope for the future|A list of complaints|A secret",
      "Which element makes the lesson feel real?|A short personal story|A long list of rules|A pile of numbers",
      "A speech for a big occasion should be...|Warm and not too long|Very long|Mean",
      "Thanking people who helped...|Shows gratitude|Wastes time|Hurts the speech",
      "'Looking back' means you...|Remember what the group shared|Predict the future only|Skip the past",
      "Which closing fits?|Thank you, and good luck on the road ahead|I am out of ideas|Please clap harder",
      "The tone of such a speech should be...|Hopeful|Gloomy|Sarcastic",
      "A strong single message is better than...|Ten messages squeezed together|One clear idea|A story"
    ]),
    SC("Emcee and host", "🎪", "An emcee, or master of ceremonies, keeps an event moving. Welcome the crowd, tell them what is coming, introduce each act with energy and accuracy, and fill transitions smoothly. Keep your own remarks short; the stars are the performers.", "A host connects the pieces and keeps the focus on the performers.", "'Next up, please welcome the fourth-grade choir, singing a song about spring!'", [
      "An emcee's main job is to...|Keep the event moving|Perform every act|Leave early",
      "When introducing an act, an emcee should be...|Accurate and enthusiastic|Silent|Rude",
      "The emcee's remarks should be...|Short|Longer than the show|Secret",
      "Between acts, the emcee can...|Fill the transition smoothly|Disappear|Argue",
      "Names should be...|Checked and pronounced correctly|Guessed|Skipped",
      "Welcoming the crowd at the start...|Sets a friendly tone|Wastes time|Is unnecessary",
      "If something goes wrong, a good emcee...|Stays calm and keeps going|Panics|Blames people",
      "The spotlight should mostly stay on...|The performers|The emcee|The clock"
    ]),
    SC("Presenting research", "🔬", "When you present research, state your question, how you looked for the answer, what you found, and what it means. Show only the most important data. Be honest about limits, such as a small sample, and say what you would do next.", "Question, method, findings, meaning, limits.", "'We asked whether plants grow faster with music. We tested two groups. Both grew about the same. With more plants we could test again.'", [
      "A research talk starts with...|Your question|The conclusion only|A joke",
      "Describing your method tells listeners...|How you found the answer|Your age|The weather",
      "Findings are...|What you discovered|What you hoped|What you ignored",
      "Being honest about limits means...|Saying what your study could not show|Hiding problems|Making more claims",
      "A small sample means...|Fewer people or items were tested|The test was huge|There was no test",
      "Which is a good next step to mention?|Repeat with a bigger group|Delete the data|Stop forever",
      "Showing every number is usually...|Too much|Perfect|Required",
      "What the data means is called...|The conclusion|The title|The tag"
    ]),
    SC("The poster talk", "🪧", "In a poster session you stand by your poster and talk with small groups. Prepare a thirty-second summary, then be ready to go deeper for anyone curious. Point to the key figure, ask what the visitor wants to know, and welcome questions. The poster is your aid, not a script.", "Short summary first, then follow the visitor's interest.", "'In short, we found that shade lowered temperature by five degrees. Want to see the graph?'", [
      "A poster session talk begins with...|A short summary|A long lecture|Silence",
      "While talking, you should point to...|The key figure on the poster|Your shoes|The ceiling",
      "A good way to engage a visitor is to...|Ask what they want to know|Read the poster aloud|Turn away",
      "The poster is your...|Aid|Script|Opponent",
      "If someone asks a deep question, you can...|Go deeper on that part|Skip it|Repeat the title",
      "How big should poster text be?|Large enough to read from a short distance|Tiny|Hidden",
      "Why prepare a thirty-second summary?|Visitors may only stop briefly|It fills the time|It is a rule",
      "If a visitor asks something you do not know, you can say...|I do not know, but here is how I might find out|Anything|Nothing"
    ]),
    SC("The hostile question", "🌩️", "Sometimes a question is rude or unfair. Stay calm. Pause. Answer the fair part of it. You can reframe it: 'I think what you are asking is whether the plan costs too much.' Do not trade insults, and do not be afraid to say 'That is not accurate, and here is why.'", "Stay calm and answer the real issue behind the question.", "Rude: 'Isn't your idea a waste of money?' Reply: 'Cost is a fair concern. Here are the numbers.'", [
      "When asked a hostile question, you should first...|Stay calm and pause|Insult the person|Run away",
      "Reframing a rude question means...|Restating the fair issue inside it|Repeating the insult|Ignoring it",
      "Which is a calm reply?|That is a fair concern about cost, so here are the numbers|That is a silly question|No comment",
      "If a question has a false claim in it, you can say...|That is not accurate, and here is why|You are dumb|Sure, it's true",
      "Trading insults usually...|Hurts your credibility|Helps you|Wins the crowd",
      "A pause before answering can...|Give you time to think|Look weak always|Show nothing",
      "Answering the fair part of a question shows you are...|Open and honest|Defensive|Rude",
      "Staying respectful to a hostile questioner...|Makes you look stronger|Weakens you|Hurts the facts"
    ]),
    SC("Inclusive language", "🌈", "Inclusive language makes everyone feel welcome. Use words that do not leave people out: 'everyone' instead of 'guys', 'firefighter' instead of 'fireman', and 'person with a disability' when naming a group respectfully. When unsure, ask people how they like to be described.", "Choose words that welcome the whole group.", "Instead of 'Good morning, boys and girls', I might say 'Good morning, everyone.'", [
      "Inclusive language aims to...|Make everyone feel welcome|Leave people out|Sound fancy",
      "Which greeting includes the whole group?|Hello, everyone|Hey, guys|Listen up, boys",
      "A job title that works for anyone is...|Firefighter|Fireman|Fire boy",
      "When unsure how someone wants to be described, you can...|Ask them respectfully|Guess|Assume",
      "Using respectful language shows...|Care for listeners|Weakness|Nothing",
      "Which word choice is more inclusive?|Chair|Chairman|Chair-boy",
      "Why does inclusive language matter in a speech?|More listeners feel included|It is longer|It is trendy",
      "If you make a language mistake, the best move is to...|Correct it kindly and keep going|Pretend nothing happened|Blame others"
    ]),
    SC("Accents and dialects", "🗺️", "Everyone speaks with an accent, and many places have dialects with their own words and grammar. A different accent is not wrong or less smart. Clear speech is about being understood. Listeners can slow down, ask kindly for repeats, and focus on the ideas.", "An accent is a way of speaking, not a mistake.", "If I do not catch a word, I say, 'Could you say that again?' and keep listening for the idea.", [
      "An accent is...|A way of speaking linked to a place or group|A mistake|A secret code",
      "Having an accent means a person is...|Just as smart as anyone|Less smart|Not paying attention",
      "A dialect can include...|Different words and grammar patterns|Only volume|Nothing",
      "If you cannot understand a word, you can kindly ask...|Could you say that again?|Speak like me|What is wrong with you?",
      "Making fun of how someone talks is...|Hurtful and unfair|Funny and fair|Required",
      "Clear speech means...|Being understood|Having no accent|Being very loud",
      "A listener helps understanding by...|Focusing on the ideas|Frowning|Stopping the talk",
      "Everyone has an accent. This means...|No accent is the standard of being right|Only some people|Nobody"
    ]),
    SC("Your speaker's toolkit", "🧰", "By now you know many tools: structure, evidence, voice, listening and kindness. A great speaker knows their strengths and picks tools to fit each audience. Reflect after each talk: what worked, what to try next, and what you want to practice. A growth plan makes you better.", "Think about strengths, next steps, and fitting the tool to the audience.", "'My story openings work well. Next I will practice cutting filler and breathing at pauses.'", [
      "After a talk, a helpful reflection asks...|What worked and what to try next|Who was wrong|How loud was I|",
      "Knowing your strengths helps you...|Use them on purpose|Ignore them|Hide them",
      "Choosing tools to fit the audience is part of...|Being a flexible speaker|Giving up|Copying others",
      "A growth plan includes...|Small goals to practice|A list of excuses|No plan",
      "A good practice goal is...|Specific, like cutting filler words|Vague, like be better|Impossible",
      "Feedback from others is useful when you...|Listen and pick what helps|Argue with it|Ignore it",
      "A talk that did not go perfectly...|Still teaches you something|Means you should quit|Is a total failure",
      "Recording yourself lets you...|Notice habits you might miss|Hide mistakes|Lose the talk"
    ].map(r => r.replace(/\|$/, "")).slice(0, 8))
  ];

  Object.assign(SPEAKING_LEVELS, { 16: lvl(16, L16), 17: lvl(17, L17), 18: lvl(18, L18) });
})();
