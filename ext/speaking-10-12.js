// ext/speaking-10-12.js  Mind Lab Speaking & Listening, levels 10-12 (60 lessons)
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

  // ================= LEVEL 10 =================
  const L10 = [
    SC("Character voices", "🎭", "When you read a story aloud, each character can sound different. A giant might have a deep, slow voice. A mouse might have a high, quick one. Keep each voice the same all the way through so listeners can tell who is talking.", "Match the voice to how the character looks, feels and acts.", "A sleepy bear says 'I am so tired' in a low, slow voice.", [
      "A tiny nervous mouse would probably speak in a...|High, quick voice|Deep, slow voice|Booming voice",
      "A huge friendly giant would probably speak in a...|Deep, slow voice|Squeaky, fast voice|Whisper",
      "Why keep a character's voice the same all through the story?|Listeners can tell who is talking|It saves breath|It is a rule about paper",
      "A grumpy character might sound...|Gruff and short|Sing-song and bubbly|Dreamy and sleepy",
      "The narrator is the...|Voice that tells the story|Main hero only|Last page",
      "Which helps show a character is scared?|A shaky, quiet voice|A bored yawn|A cheerful hum",
      "Switching voices smoothly helps listeners...|Follow the story|Fall asleep|Leave the room",
      "Quotation marks in a story show that...|A character is speaking|The story is over|A word is spelled wrong"
    ]),
    SC("Campaign speech basics", "🗳️", "In a school election, a candidate gives a short speech to win votes. A strong one says who you are, names one or two things you will do, gives a reason people can trust you, and ends by asking for the vote. Promises must be ones you can really keep.", "Think about what voters need to hear: who, what you will do, and why you.", "'I'm Sam. I will start a book swap. I listen to everyone. Please vote Sam.'", [
      "A campaign speech is given to...|Win votes|Take a test|Pick a snack",
      "A good promise in a campaign is one you...|Can really keep|Cannot keep but sounds big|Never mention again",
      "Which line asks for the vote?|Please vote for me on Friday|My shoes are red|Time flies",
      "A good candidate speech names...|One or two clear ideas|Twenty tiny ideas|No ideas",
      "It is unkind and unwise in a campaign to...|Say mean things about other candidates|Be polite|Smile",
      "Telling voters who you are helps them...|Know and trust you|Forget you|Skip the vote",
      "Which promise is realistic for a class president?|Start a weekly kindness board|Cancel all homework forever|Make it snow in July",
      "A campaign speech should be...|Short and clear|Very long and tangled|Silent"
    ]),
    SC("News report voice", "📺", "A news report tells what happened clearly and fairly. Put the most important facts first: who, what, where and when. Then add details. Use a steady voice and stick to facts, not your own opinion.", "Start with the biggest facts, then add smaller details.", "'Today at noon, Room 5 planted ten trees in the school yard. Students dug and watered each one.'", [
      "In a news report the most important facts go...|First|Last|Nowhere",
      "A news report should stick to...|Facts|Guesses|Jokes",
      "Which is a news-style opening?|Today at noon, our class planted ten trees|I think trees are the best ever|Once upon a time",
      "Reporters answer who, what, where and...|When|Maybe|Please",
      "A reporter's voice should be...|Steady and clear|Whispery and silly|Angry",
      "Adding 'I think it was the best event' to a news report is...|An opinion, not news|A fact|The headline",
      "A headline is...|A short title that sums up the story|A long paragraph|A hat",
      "After the big facts, a report adds...|Smaller details|Nothing|Opinions only"
    ]),
    SC("Loaded words", "⚠️", "Some words push listeners to feel a certain way. 'The mob ran in' sounds worse than 'the crowd walked in'. These are loaded words. A careful listener notices them and asks: what are the plain facts?", "Look for words that carry strong feeling instead of just facts.", "'The kids dumped the trash' versus 'the kids put the trash in the bin'.", [
      "Loaded words are words that...|Push a strong feeling|Are always rude|Have no meaning",
      "Which sentence has a loaded word?|The crowd stormed in like wild animals|The crowd entered the room|People came in at 9",
      "A careful listener asks...|What are the plain facts?|How loud is it?|Who is tallest?",
      "'Plain' words about a team win might be...|The team won 3 to 2|The team crushed the helpless losers|The hero team smashed them",
      "Which pair means nearly the same thing but one is more loaded?|Walked / stomped|Cat / feline|Big / large",
      "Loaded words can make a listener...|Feel something before thinking|Understand math|Fall asleep",
      "Spotting loaded words helps you be a better...|Listener|Sleeper|Dancer",
      "To be fair in your own talk you can use...|Neutral words|The scariest words|Only slang"
    ]),
    SC("Give a book talk", "📚", "A book talk is a short speech to make others want to read a book. Say the title and author, tell a little about the setting and main character, hint at the problem without giving away the ending, and say who might enjoy it.", "Tease the story, but keep the ending a secret.", "'In Hatchet by Gary Paulsen, a boy must survive alone in the woods. Fans of adventure will love it.'", [
      "A book talk tries to...|Make people want to read the book|Retell every page|Test spelling",
      "A book talk should NOT...|Give away the ending|Name the title|Mention the main character",
      "Which belongs at the start of a book talk?|The title and author|The last page|The price sticker",
      "Telling who might enjoy the book helps listeners...|Decide if it is for them|Skip it|Sleep",
      "A hint about the problem is a...|Teaser|Spoiler of the ending|Mistake",
      "Which sentence is a spoiler?|In the end, the hero wins the final race|The hero joins a big race|The hero loves running",
      "How long is a typical book talk?|About one to two minutes|Two hours|Ten seconds",
      "A good book talk shows that you...|Care about the book|Did not read it|Hate reading"
    ]),
    SC("Reader's theater", "🎬", "Reader's theater is acting out a script just with your voice. No costumes or memorizing. Each reader takes a part. Read with feeling, watch for your cue, and hold the script low so listeners can see your face.", "Your voice and face do the acting.", "A reader says 'Oh no!' in a worried voice and looks up at the audience.", [
      "In reader's theater you act mostly with your...|Voice|Costume|Scenery",
      "A cue is...|A signal that it is your turn to speak|A type of costume|A final bow",
      "You should hold your script...|Low enough that the audience sees your face|Over your face|Behind your back",
      "A script lists...|Who says what|Only grades|Recipes",
      "If you lose your place you should...|Stay calm and find your line|Run away|Laugh at others",
      "Do readers need to memorize everything?|No, they read from the script|Yes, every word|Yes, but only the title",
      "Which is a good way to prepare?|Practice your lines aloud|Skip practice|Whisper only",
      "Listening to the other readers helps you...|Catch your cue|Grow taller|Forget the story"
    ]),
    SC("Is that a fact?", "🔎", "When someone says something surprising, ask how they know. Check with a trustworthy source, such as a library book, a teacher, or a well-known encyclopedia. Do not just trust a claim because it is loud or repeated.", "A true fact can be checked.", "'Dolphins are mammals' can be checked in a science book.", [
      "A good way to check a fact is to...|Look in a trustworthy source|Ask the loudest person|Guess",
      "A claim is not true just because it is...|Said many times|Written in a science book|Proven by an expert",
      "Which can be checked?|Mount Everest is the tallest mountain above sea level|Mountains are scary|That hill looks lonely",
      "Which is a better source for animal facts?|A science library book|A random rumor|A silly cartoon",
      "If two sources disagree you should...|Check more sources|Pick your favorite|Stop caring",
      "'I heard it somewhere' is...|Not enough proof|Perfect proof|The best source",
      "A fact is something that...|Can be proven|Is only a feeling|Is always new",
      "Asking 'How do you know?' is...|A fair question|Rude always|Against the rules"
    ]),
    SC("Problem and solution talk", "🧩", "One easy way to persuade is to name a problem, show why it matters, and offer a solution. Then say what will get better. Listeners are more likely to agree when the problem feels real and the solution is doable.", "First the trouble, then the fix.", "'Our hallway gets messy. That makes people late. A coat-hook sign-up will keep it tidy.'", [
      "A problem-and-solution talk begins by naming...|The problem|The solution only|The ending",
      "After the problem you should give...|A solution|A joke|A sneeze",
      "Which is a problem statement?|Lunch lines are too long|Let's add more lunch tables|Thank you all",
      "Which solution fits 'The playground is littered'?|Add recycling bins and a cleanup crew|Eat more lunch|Close school",
      "Showing why the problem matters makes listeners...|Care|Argue|Fall asleep",
      "A doable solution is one that...|Can really be tried|Costs a million dollars|Needs magic",
      "At the end you can say what will get...|Better|Lost|Quiet",
      "The order of this talk is...|Problem, why it matters, solution|Solution, thanks, problem|Goodbye, problem, hello"
    ]),
    SC("Demonstration talk", "🧪", "In a demonstration talk you show how to do something while you explain. Gather what you need, say the steps in order, show each step slowly so everyone sees, and finish with the result. Practice so nothing surprises you.", "Show it and say it at the same time, in order.", "To demo a paper airplane: fold in half, fold the corners, fold the wings, then throw gently.", [
      "In a demonstration you should...|Show and explain at the same time|Only talk|Only watch",
      "Before you start a demo you should...|Gather everything you need|Hide supplies|Leave the room",
      "Steps in a demo should be in...|Order|Any mixed-up way|A circle",
      "If listeners cannot see your hands, you should...|Hold things up and go slowly|Hurry|Turn your back",
      "A good last step is to...|Show the finished result|Throw the supplies|Skip it",
      "Which word helps with order?|First|Maybe|Banana",
      "Practicing a demo ahead of time helps avoid...|Surprises|Success|Steps",
      "Which is a good demo topic for fourth grade?|How to make a paper airplane|How to fly a jet|How to run a bank"
    ]),
    SC("Oral history interview", "👵", "An oral history is a spoken record of someone's memories. When you interview a grandparent or neighbor about long ago, ask open questions, listen closely, get permission before recording, and thank them. Their stories are part of history.", "Ask, listen, and respect the storyteller.", "'What was your school like when you were ten?' invites a story, not a yes or no.", [
      "An oral history is...|A spoken record of someone's memories|A kind of dental visit|A math rule",
      "Before you record an interview you should...|Ask permission|Hide the recorder|Skip hello",
      "Which is the best question?|What was your school like when you were ten?|Was it fun?|Yes or no?",
      "During the interview you should mostly...|Listen|Talk about yourself|Look at your shoes",
      "Open questions often begin with...|Tell me about, or What was|Is it, Do you|Yes, No",
      "After the interview you should...|Thank the person|Run away|Edit their words to be funny",
      "Why are oral histories valuable?|They keep memories that books may miss|They are always short|They are free snacks",
      "If a person does not want to answer a question you should...|Respect that and move on|Insist|Laugh"
    ]),
    SC("Pro and con", "⚖️", "Every debate topic has two sides. The pro side agrees with the statement. The con side disagrees. A debater sticks to the side they were given and gives reasons for it, even if their own view is different. It builds fair thinking.", "Pro means for. Con means against.", "On 'Kids should wear uniforms', pro says yes, con says no.", [
      "The pro side of a debate...|Agrees with the statement|Disagrees|Leaves",
      "The con side of a debate...|Disagrees with the statement|Agrees|Is silent",
      "A resolution is...|The statement being debated|The final bow|The winner's prize",
      "In a debate you give your side...|Reasons|Insults|Gifts",
      "Arguing a side you did not choose helps you...|Think fairly and see other views|Win every time|Never listen",
      "'Homework should be banned.' A con speaker would say...|Homework should stay|Homework is banned|Homework is yummy",
      "Debaters speak in turns because...|Everyone deserves to be heard|It is quicker|It is random",
      "After a debate, a good debater says...|Thank you to both sides|You are silly|I never lose"
    ]),
    SC("Speed and volume for emphasis", "🔊", "You can stress big ideas by changing how you speak. Slow down and speak a bit louder for the most important words. Speed up a little for excitement. A sudden whisper can also grab attention.", "Change your voice on purpose where it matters most.", "'The most important rule is... safety first.' Slow down on 'safety first'.", [
      "To stress an important idea you can...|Slow down and say it with more force|Mumble|Say it very fast and flat",
      "Speeding up slightly can show...|Excitement|Sadness|Sleep",
      "A sudden whisper can...|Grab attention|Hide the message|End the talk",
      "A voice that never changes sounds...|Flat|Rich|Musical",
      "Which is best for a scary moment in a story?|Slow and low|Singing|Shouting nonsense",
      "Slowing down before a key phrase gives listeners time to...|Notice it|Leave|Forget",
      "If everything is shouted, nothing stands out because...|It all sounds the same|It is quiet|It is slow",
      "Changing speed and volume is called adding...|Variety|Silence|Homework"
    ]),
    SC("Fables and morals", "🦊", "A fable is a short story, often with animals, that teaches a lesson called a moral. When you tell one, set the scene fast, make the problem clear, show what the characters do, and end with the moral in a short sentence.", "A fable teaches a lesson at the end.", "The tortoise keeps going and wins the race. Moral: slow and steady wins.", [
      "The lesson of a fable is called the...|Moral|Title|Cover",
      "Fables often have characters that are...|Animals that act like people|Only machines|Only kings",
      "Where does the moral usually go?|At the end|Before the title|Nowhere",
      "'Slow and steady wins the race' is a...|Moral|Recipe|Weather report",
      "When telling a fable, set the scene...|Quickly|For ten minutes|Never",
      "Which makes a fable fun to hear?|Different voices for the animals|Reading in a flat voice|Skipping the problem",
      "A fable is usually...|Short|A whole novel|A song only",
      "The ant who works all summer and the grasshopper who plays teach...|Prepare ahead|Never rest|Sing louder"
    ]),
    SC("Talk to 'you'", "🤝", "Speakers connect when they talk to the audience, not at it. Use the word 'you', ask a question, or invite listeners to picture something. Say 'we' to show you are in it together.", "Include your listeners in the talk.", "'Have you ever lost a shoe? Picture hopping home.'", [
      "Using 'you' in a talk makes listeners feel...|Included|Ignored|Confused",
      "Using 'we' shows that...|We are in this together|You are alone|Nobody cares",
      "Which line talks to the audience?|Have you ever felt nervous before a test?|The test was on Monday|Tests exist",
      "Inviting listeners to picture something is...|A way to connect|Rude|Against the rules",
      "A speaker who reads only to the paper...|Loses the audience|Connects well|Is perfect",
      "Asking a question and pausing lets listeners...|Think of their answers|Leave|Argue",
      "Which is more personal?|I want you to imagine this|The following will be imagined|Imagining is a verb",
      "Talking with the audience also means...|Looking at them|Ignoring their faces|Turning away"
    ]),
    SC("Explain a science process", "🌱", "To explain a process like the water cycle, name each stage in order and say how one leads to the next. Use simple words for big ideas, define special words, and point to a diagram if you have one.", "Stages in order, each one leading to the next.", "Water evaporates, rises, condenses into clouds, then falls as rain.", [
      "In explaining a process, you name the stages in...|Order|Alphabet order|Random order",
      "Words like 'then' and 'next' show...|How steps follow each other|The end of school|A new subject",
      "If you use a special science word you should...|Explain what it means|Hide it|Spell it backwards",
      "Water changing into vapor is called...|Evaporation|Eruption|Exercise",
      "A diagram helps you...|Show the stages clearly|Hide the topic|Speak faster",
      "A good order for the water cycle begins with...|Evaporation|Snow day|Thirst",
      "Simple words for big ideas make a talk...|Easier to understand|Harder to follow|Longer",
      "Linking stages with 'which causes' shows...|One step leads to the next|A mistake|Nothing"
    ]),
    SC("Listen to a recording", "🎧", "When you listen to an audio clip or podcast, you cannot ask the speaker questions, so listen carefully the first time. Jot down the main idea and two details. Replay it if you can, and think about what you heard.", "Notes on the main idea and details help you remember.", "After a podcast on bees: main idea 'bees help plants grow', details 'they carry pollen' and 'they live in hives'.", [
      "While listening to a recording, a helpful habit is to...|Jot down the main idea and details|Doze off|Talk over it",
      "A recording usually cannot...|Answer your questions|Be replayed|Be paused",
      "If you missed something you can often...|Replay that part|Make up the answer|Give up",
      "The main idea is...|What the recording is mostly about|The smallest detail|The speaker's age",
      "A detail is...|A small fact that supports the main idea|The title only|The volume",
      "To remember what you heard you can...|Summarize it in your own words|Forget it|Copy another person",
      "Good listeners also notice the speaker's...|Tone|Shoe size|Hair",
      "After listening, it helps to ask yourself...|What did I learn?|Where is lunch?|Who is tallest?"
    ]),
    SC("Make an announcement", "📢", "A school announcement tells people something they need to know. Start by getting attention, then give the key facts: what, when and where. Speak slowly and clearly. Repeat the most important detail at the end.", "What, when, where, then repeat the key detail.", "'Attention, please! Book Fair opens Monday at 9 in the library. Again, Monday at 9, library.'", [
      "An announcement should begin by...|Getting attention|Saying goodbye|Whispering",
      "The key facts include what, when and...|Where|Why not|Who cares",
      "Repeating the important detail at the end helps listeners...|Remember it|Get bored|Leave",
      "Speak announcements...|Slowly and clearly|Mumbling fast|With a mouth full",
      "Which announcement has the needed facts?|Art Club meets Tuesday at 3 in Room 8|Art Club is fun|Come sometime",
      "Which fact is missing: 'Chess club meets in Room 4'?|When|Where|What",
      "Announcements should be...|Short|Very long|Secret",
      "Ending with 'Thank you' is...|Polite|Required by law|A mistake"
    ]),
    SC("Spoken or written?", "✍️", "Speaking is different from writing. Spoken sentences are shorter and simpler. You can repeat key ideas, because listeners cannot re-read. Use everyday words, and add pauses where a writer would add periods and commas.", "Listeners cannot go back, so make it simple and clear.", "Written: 'Consequently, attendance rose.' Spoken: 'So more people came.'", [
      "Spoken sentences are usually...|Shorter and simpler|Longer and tangled|Silent",
      "Why repeat key ideas in a talk?|Listeners cannot re-read|Paper is cheap|Time stands still",
      "A pause in speaking is like...|A comma or period in writing|A spelling mistake|A picture",
      "Which sounds better aloud?|So more people came|Consequently, attendance escalated thereafter|Henceforth ascendancy occurred",
      "Everyday words in a talk help listeners...|Understand easily|Get lost|Sleep",
      "Reading your essay word-for-word can sound...|Stiff|Perfect always|Very casual",
      "Which is a spoken signpost?|Let me say that again|Footnote one|Page three",
      "Speaking from key points makes you sound more...|Natural|Silent|Written"
    ])
  ];

  // ================= LEVEL 11 =================
  const L11 = [
    SC("Write a thesis for your talk", "🎯", "A thesis is one sentence that states the main point of your whole speech. Everything you say should support it. A good thesis is specific, can be argued or explained, and is something you can prove in the time you have.", "One sentence that the rest of the talk supports.", "Weak: 'Dogs.' Better: 'Adopting a shelter dog is a rewarding choice because it saves a life and gains a friend.'", [
      "A thesis is...|The main point of the whole speech in one sentence|A list of names|A closing joke",
      "Which is the strongest thesis?|School gardens teach students science and teamwork|Gardens|I will talk now",
      "Everything in your talk should...|Support the thesis|Be unrelated|Avoid the topic",
      "A thesis that is too broad is...|Hard to prove in a short talk|Easy to prove|Perfect",
      "Which topic is specific enough for five minutes?|Why recess helps students focus|Everything about school|Life",
      "'Sharks are interesting.' is weak because it is...|Vague|Too detailed|Too long",
      "A thesis usually goes in the...|Introduction|Thank-you|Question time",
      "A good thesis can be...|Explained or argued with evidence|Ignored|Changed every sentence"
    ]),
    SC("Ways to organize", "🗺️", "Speakers organize ideas in patterns. Chronological goes in time order. Spatial goes by place. Cause and effect shows what made something happen and what came after. Problem-solution names a trouble and its fix. Pick the pattern that suits your topic.", "Match the topic to the best pattern.", "A talk on how a bill becomes a law fits time order. A talk on the planets fits order by place from the sun.", [
      "A talk on how a seed grows into a plant fits...|Time order|Alphabetical only|Opposites",
      "Describing a room from left to right uses...|Spatial order|Time order|Cause and effect",
      "'Pollution made the river dirty, so fish disappeared' is...|Cause and effect|Chronological|Spatial",
      "A talk about litter and a cleanup plan uses...|Problem-solution|Alphabetical|Spatial",
      "Why choose an organizing pattern?|It helps listeners follow|It makes talks longer|It hides mistakes",
      "A history of your school from 1900 to today is best in...|Time order|Random order|Size order",
      "Telling what happened and the results is...|Cause and effect|Rhyme|Spatial",
      "Planets listed from nearest the Sun outward is...|Spatial order|Chronological|Cause and effect"
    ]),
    SC("The rhetorical question", "❔", "A rhetorical question is asked to make people think, not to get an answer. 'Who doesn't want a safer street?' invites listeners to agree in their heads. Use one or two, not a whole speech of them.", "You ask it so listeners think, and no one has to answer aloud.", "'Wouldn't you rather read outside on a sunny day?'", [
      "A rhetorical question is asked to...|Make people think|Get a vote count|Test spelling",
      "Which is a rhetorical question?|Who doesn't want a safer street?|What time is it?|Where is Room 4?",
      "Rhetorical questions often...|Invite agreement in listeners' minds|Demand a long answer|End the talk",
      "Using too many rhetorical questions can...|Annoy or tire listeners|Impress everyone|Fix mistakes",
      "A genuine question like 'Please raise your hand if you have a pet' asks for...|A real response|Silence only|Applause",
      "Which opening uses a rhetorical question?|Wouldn't a longer recess help us learn?|Recess is at ten|Good morning, class",
      "A rhetorical question works best when the answer seems...|Obvious|Impossible|Secret",
      "It is smart to ask them...|Sparingly|Constantly|Never ever"
    ]),
    SC("Feelings in persuasion", "💓", "Speakers can appeal to emotion by telling a moving story or using vivid words. That is fine when it is honest and the feeling fits the facts. It is unfair when a speaker tries to scare or trick people instead of giving true reasons.", "Honest feelings plus facts are fair. Tricks are not.", "A true story about a lost puppy found with a tag supports the claim that pets need tags.", [
      "An honest emotional appeal is...|A true story that helps listeners care|A made-up scare|A trick",
      "Which is unfair persuasion?|Scaring people with false claims|A true story with facts|Polite reasons",
      "Emotion works best when it is paired with...|Facts|Nothing|Jokes only",
      "A trustworthy speaker uses feelings...|Honestly|To fool people|To confuse them",
      "Which uses an honest appeal?|This real photo shows our crowded bus line|Everyone will be doomed|Only fools disagree",
      "When you hear a strong emotional pitch you should ask...|Is it true and is there evidence?|How fast can I agree?|Who is shouting?",
      "Saying 'If you disagree, you are a bad person' is...|Unfair pressure|A fact|A welcome",
      "Emotion plus evidence makes an argument...|Stronger and fairer|Weaker|Silly"
    ]),
    SC("Primary and secondary sources", "📜", "A primary source is first-hand: a diary, a letter, a photo from the time, or an interview. A secondary source is made later by someone who studied it, like a textbook or encyclopedia. Good speakers use both and say which they are using.", "First-hand versus told later.", "A soldier's letter is primary. A book about the war written years later is secondary.", [
      "A diary written during an event is a...|Primary source|Secondary source|Rumor",
      "A textbook about an event written later is a...|Secondary source|Primary source|Diary",
      "A first-hand interview with a witness is...|Primary|Secondary|Unusable",
      "Which is a secondary source?|An encyclopedia article|A letter from 1920|A photo taken at the event",
      "Why use both types?|Primary shows first-hand view; secondary explains and connects|They are the same|Neither helps",
      "A speaker should tell listeners...|Where information came from|Nothing at all|Only the date",
      "A video you recorded at your school fair is...|Primary|Secondary|Fiction",
      "A museum guide written long after is usually...|Secondary|Primary|A diary"
    ]),
    SC("Outline your speech", "📋", "An outline is a plan with main points and sub-points. Roman numerals or bullets show the order. Each main point has support under it. An outline lets you check that the talk flows before you rehearse.", "Main points first, then support beneath each.", "I. Why bees matter (A. pollination, B. honey). II. Threats to bees. III. How to help.", [
      "An outline shows your...|Main points and sub-points|Grade|Lunch",
      "Sub-points go...|Under their main point|Before the title|Nowhere",
      "An outline helps you check that your talk...|Flows in a good order|Is shiny|Is loud",
      "In an outline, 'I. Introduction, II. Body, III. Conclusion' shows...|The big structure|A secret code|The grading",
      "If a point has no support in your outline you should...|Add support or remove it|Hide it|Leave it blank",
      "Which is best for an outline?|Short phrases|Whole pages of text|Drawings only",
      "Roman numerals mark...|Main points|Page numbers only|Spelling errors",
      "Outline first, rehearse...|Afterwards|Never|Instead"
    ]),
    SC("Speaking styles", "🎤", "Speakers can read from a full script (manuscript), memorize it, or speak from an outline (extemporaneous). Most teachers like extemporaneous: you plan well, practice, and speak naturally from key points. It sounds real and keeps eye contact.", "Plan and practice, then speak from key points.", "A speaker uses cue cards with three key phrases and talks naturally.", [
      "Speaking from an outline you practiced is called...|Extemporaneous|Manuscript|Impossible",
      "Reading a full script word for word is called...|Manuscript style|Impromptu|Improv",
      "A downside of reading a script is...|Less eye contact|More eye contact|Better pacing always",
      "Memorizing everything can be risky because...|You may blank if you lose your place|It is easy|It helps with eye contact",
      "Which style sounds the most natural?|Speaking from key points|Reading every word|Mumbling",
      "To speak well from key points you need...|Plenty of practice|No planning|A louder voice",
      "Cue cards help in which style?|Extemporaneous|Manuscript|None",
      "The goal of any style is to...|Communicate clearly|Fill time|Impress with big words"
    ]),
    SC("Know your audience", "👥", "Before a talk, ask who will listen. What do they already know? What do they care about? What words will they understand? A talk for first graders sounds different from a talk for teachers, even on the same topic.", "Think about what these listeners know and need.", "Explaining the moon to kindergarteners: 'The moon is Earth's night light.' To fifth graders: 'The moon orbits Earth every month.'", [
      "Before preparing a talk, a smart question is...|Who will be listening?|What is on TV?|How far is the door?",
      "Younger listeners need...|Simpler words and short ideas|Longer sentences|Difficult jargon",
      "Why adjust to the audience?|So they understand and care|To fill time|To confuse them",
      "If your audience already knows the basics you can...|Go deeper|Repeat the basics all day|Stop talking",
      "Technical words are best when your audience...|Knows them or you explain them|Has never heard them and you skip explaining|Is asleep",
      "Which is better for teaching a new topic to beginners?|Simple examples|Complex formulas first|Silent slides",
      "An audience survey can tell you...|What listeners already know|Their phone numbers|Their secrets",
      "Same topic, different audience means...|Different words and examples|Exactly the same talk|No talk"
    ]),
    SC("Describe a graph", "📈", "When you show a chart, tell listeners what it is, point to the key part, and say what it means. Say the title, what the axes measure, and the main trend such as 'rises', 'falls' or 'stays steady'. Do not read every number.", "Title, then trend, then what it means.", "'This graph shows daily steps. It rises on weekends, so we walk more on Saturdays.'", [
      "First, when showing a graph you...|Say what it shows|Hide the title|Read nothing",
      "A trend is...|The overall direction of the data|A single mistake|A color",
      "Which phrase describes a trend?|The numbers climb over the week|The paper is white|The graph is square",
      "Do you need to read every number aloud?|No, point to the key ones|Yes, all of them|Never speak",
      "After the trend you should explain...|What it means|Your lunch|Nothing",
      "A line going down means the data is...|Falling|Rising|Flat",
      "The axis labels tell listeners...|What is measured|Who drew it|How old it is",
      "Pointing while you explain helps listeners...|Find the part you mean|Look away|Fall asleep"
    ]),
    SC("Tone and mood", "🌦️", "Tone is the attitude in your voice and words: serious, playful, hopeful, calm. It changes how listeners feel. A talk on a sad topic can still end with a hopeful tone. Shift tone on purpose, not by accident.", "Tone is the feeling you send out with your voice.", "A speech on a storm cleanup begins serious and ends hopeful: 'Together we rebuilt.'", [
      "Tone means...|The attitude in your voice and words|The volume knob|A song",
      "A hopeful tone would sound...|Warm and encouraging|Bored|Angry",
      "A funny joke at a serious moment may seem...|Out of place|Perfect|Required",
      "Shifting tone should be done...|On purpose|By accident|Never",
      "A serious topic is best delivered with...|A steady, respectful tone|Silly voices|Laughing",
      "Ending a hard topic with hope is...|A kind and effective choice|Forbidden|Rude",
      "Which words give a hopeful tone?|Together we can fix this|Nothing will work|It is hopeless",
      "Your tone affects how listeners...|Feel about your message|See the stage|Hear the clock"
    ]),
    SC("Ad tricks", "📺", "Ads use persuasion tricks. The bandwagon says everyone is buying it. A testimonial shows a famous person saying they love it. Repetition says the name again and again. Catchy music and bright colors grab feelings. Smart listeners ask: is it actually good?", "Ask what the ad wants you to feel and what proof it gives.", "'Millions are switching!' is a bandwagon claim. It says nothing about how good the product is.", [
      "'Everyone is buying it!' is an example of...|Bandwagon|Testimonial|Evidence",
      "A testimonial uses...|A person saying they like the product|A graph|A map",
      "Saying the product name again and again is...|Repetition|Truth|Silence",
      "Bright colors and catchy music mostly appeal to...|Feelings|Facts|Math",
      "A smart listener asks...|Where is the proof?|Can I buy it now?|Is it loud?",
      "Which is a bandwagon line?|Join the thousands who already switched!|Please read the label|It is made of cotton",
      "A testimonial from a famous athlete proves...|Only that they were asked to say it|The product is best|Nothing at all",
      "Ads aim to make you...|Want to buy|Study|Sleep"
    ]),
    SC("Discuss with evidence", "💬", "In a text discussion, back up what you say with a quote or detail. Start with phrases such as 'On page 5, it says...' or 'I noticed that...'. Listen to others, build on their ideas, and politely disagree with reasons.", "Point to the text for proof.", "'I think Mia was brave because on page 12 she walks into the dark cave.'", [
      "In a book discussion you support your idea with...|Evidence from the text|A guess|A rumor",
      "Which phrase shows evidence?|On page 8, it says the door was locked|I just feel it|Whatever",
      "Building on someone's idea sounds like...|I agree with Maya and I would add...|You are wrong|Boring",
      "Politely disagreeing includes...|Giving a reason|Insults|Walking out",
      "Listening carefully lets you...|Respond to what was said|Talk over others|Sleep",
      "Quoting the text exactly is...|Strong evidence|Not allowed|A mistake",
      "A good discussion is mostly...|A conversation, not a contest|A race|A shouting match",
      "Questions that begin 'What makes you think...' ask for...|Evidence|Money|Silence"
    ]),
    SC("Class meeting and voting", "🗳️", "In a class meeting, one person speaks at a time. A leader guides. Ideas are suggested, discussed, then decided by voting. In a majority vote, the choice with more than half wins. Everyone should accept the result kindly.", "Listen, discuss, then decide fairly.", "Out of 20 students, 11 vote for the picnic. That is a majority, so the picnic wins.", [
      "In a majority vote the winner has...|More than half the votes|The loudest voice|The fewest votes",
      "In a class of 20, a majority is at least...|11 votes|8 votes|5 votes",
      "In a meeting, how many people speak at a time?|One|All of them|None",
      "After the vote, everyone should...|Respect the result|Argue forever|Leave angry",
      "Before voting, the group should...|Discuss ideas|Hide ideas|Skip talking",
      "Who guides a class meeting?|A chosen leader|Nobody|The loudest",
      "Voting is a fair way to...|Make a group decision|Win by cheating|End the school year",
      "If the vote is tied you can...|Talk more or vote again|Cancel recess|Argue"
    ]),
    SC("Public service announcement", "🚸", "A PSA is a short message that helps the public, like 'Wear a helmet' or 'Recycle'. It has a clear goal, a catchy line, one or two strong facts, and a call to action. Keep it under a minute.", "One goal, one catchy line, one action.", "'Helmets save heads. Buckle up before you ride.'", [
      "A PSA is a message meant to...|Help the public|Sell a toy|Tell a secret",
      "A PSA usually ends with...|A call to action|A riddle|A long story",
      "A catchy line helps the message be...|Remembered|Forgotten|Hidden",
      "How long is a PSA?|Short, often under a minute|An hour|A year",
      "Which is a PSA topic?|Cross at the crosswalk|My favorite cereal|Buy this brand now",
      "A strong fact in a PSA...|Shows why the action matters|Is not needed|Confuses",
      "A PSA focuses on...|One clear goal|Ten different goals|No goal",
      "Which is a call to action?|Wear your helmet every ride|Helmets are made of foam|Bikes have two wheels"
    ]),
    SC("Show, don't just tell", "🎨", "Instead of saying 'the dog was scared', show it: 'The dog shook and hid under the bed.' Dialogue, actions and senses bring a story alive for listeners. Short, vivid scenes keep a storytelling audience hooked.", "Describe what you can see, hear and do, not just the label.", "Tell: 'She was nervous.' Show: 'Her hands trembled as she gripped the note card.'", [
      "Which one SHOWS a feeling?|His knees shook and his voice cracked|He was nervous|He felt nervous",
      "'The sky turned dark and the wind howled' shows...|Stormy weather|A sunny day|Nothing",
      "Dialogue helps stories by...|Letting characters speak|Making them silent|Adding a quiz",
      "Instead of 'happy', you could show...|She skipped and grinned|She was happy|She felt joy",
      "Using senses in stories means describing what you...|See, hear, smell, touch and taste|Wrote|Forgot",
      "Showing keeps listeners...|Interested|Confused|Asleep",
      "Which sentence shows excitement?|He bounced on his toes and shouted 'Yes!'|He was excited|He felt excited",
      "A vivid scene should be...|Short and clear|Endless|Boring"
    ]),
    SC("Present with a partner", "🧑‍🤝‍🧑", "In a partner talk, plan who says what. Hand off smoothly: 'Now Jada will explain...'. Look at whoever is speaking, don't talk over each other, and share the time equally. Practice together at least once.", "Teamwork shows in smooth handoffs.", "'I covered the problem. Now Eli will share our solution.'", [
      "A handoff in a partner talk is when...|One speaker passes the talk to the other|Both talk at once|Someone leaves",
      "Which is a smooth handoff?|Now Jada will explain our solution|Um, your turn I guess|Hurry up|",
      "Partners should share the time...|Fairly|Unequally|Not at all",
      "While your partner speaks you should...|Look at them and listen|Check your nails|Whisper",
      "Why practice together?|To make transitions smooth|To waste time|To hide",
      "Talking over your partner is...|Distracting and rude|Helpful|Required",
      "If your partner forgets a line you can...|Help gently|Laugh|Walk off",
      "Who decides roles in a partner talk?|Both partners plan together|Nobody|The audience"
    ].map(r => r.replace(/\|$/, ""))),
    SC("Say tricky words well", "👄", "Hard words trip up even good speakers. Enunciate: open your mouth, form each syllable, and finish the ends of words. Practice the tough words slowly first, then at normal speed. Check how a new word is said before your talk.", "Slow and clear first, then build speed.", "Say 'li-brar-y' slowly, then smoothly. Do not skip the middle sounds.", [
      "To enunciate is to...|Say each sound clearly|Whisper|Shout",
      "Practice a tough word first...|Slowly|As fast as possible|Never",
      "Before a talk, a new word you are unsure of should be...|Checked for how it is said|Skipped without thought|Guessed loudly",
      "Mumbling the ends of words makes you...|Hard to understand|Easy to understand|Taller",
      "Opening your mouth enough helps your words sound...|Clear|Muffled|Silent",
      "Breaking a long word into syllables helps you...|Say it correctly|Forget it|Spell it wrong",
      "If you trip on a word in a talk you should...|Pause and say it again calmly|Panic|Stop talking forever",
      "Clear speech is most important when your audience is...|Far away or in a large room|Asleep|Absent"
    ]),
    SC("When you don't know", "🤷", "Sometimes a question stumps you. It is honest and strong to say, 'Good question, I'm not sure, but I can find out.' Never make something up. You can say what you do know, or suggest where to look.", "Honesty builds trust.", "'I don't have that number. I'll check and tell you tomorrow.'", [
      "If you don't know an answer, a good reply is...|I'm not sure, but I can find out|Make something up|Run away",
      "Making up an answer can...|Lose trust|Gain trust|Be a good plan",
      "Saying what you DO know can...|Help the questioner|Waste time|Hurt",
      "Offering to look it up shows you are...|Responsible|Lazy|Lost",
      "Which reply is honest?|I don't know yet, but I will find out|Probably, maybe, whatever|That doesn't matter",
      "Admitting you don't know is...|Okay and honest|A disaster|Forbidden",
      "After saying you will find out you should...|Follow up|Forget|Hide",
      "A question you cannot answer is a chance to...|Learn something|Give up|Panic"
    ])
  ];

  // ================= LEVEL 12 =================
  const L12 = [
    SC("Central idea and support", "🏛️", "An informative speech has a central idea and supporting points. The central idea is the one thing listeners should remember. Each supporting point backs it up with facts, examples or explanations. Cut anything that does not help.", "If a point does not support the central idea, trim it.", "Central idea: Recycling saves resources. Supports: it saves energy, it reduces trash, it protects wildlife homes.", [
      "The central idea is...|The one thing listeners should remember|The smallest detail|The title page",
      "Supporting points should...|Back up the central idea|Be unrelated|Replace it",
      "If a fact does not help your central idea you should...|Cut it|Add three more|Say it louder",
      "Which supports 'Exercise keeps you healthy'?|It strengthens your heart|My cat is orange|Clouds are white",
      "A talk with many unrelated facts is...|Unfocused|Perfectly clear|Short",
      "The main idea is usually stated in the...|Introduction and repeated in the conclusion|Middle only|Nowhere",
      "How many central ideas should a short talk have?|One|Ten|None",
      "Supports can be facts, examples and...|Explanations|Mistakes|Silences"
    ]),
    SC("Credibility and honesty", "🛡️", "Credibility means listeners believe you. Build it by being prepared, citing reliable sources, admitting what you do not know, and being fair. Copying someone else's words and calling them yours is plagiarism and destroys trust.", "Trust is earned by preparation and honesty.", "'According to NASA...' tells listeners where the fact comes from.", [
      "Credibility means...|Listeners believe and trust you|Listeners are loud|Listeners clap",
      "Plagiarism is...|Using someone's words as if they were yours|Using a quote with credit|Practicing",
      "To avoid plagiarism you should...|Give credit to your sources|Hide them|Change a few words only",
      "Which builds credibility?|Citing reliable sources|Guessing confidently|Interrupting",
      "Being prepared shows you...|Respect your listeners|Are lucky|Are slow",
      "Admitting a limit on what you know...|Can increase trust|Destroys trust always|Is illegal",
      "A quote with credit sounds like...|As the scientist Marie Curie said...|I made this up myself|Whatever",
      "Fair speakers share...|Both facts that help and facts that complicate|Only what helps them|Nothing"
    ]),
    SC("Match tone to the occasion", "🎖️", "Different events call for different tones. A tribute at an award ceremony is warm and respectful. A pep talk before a game is energetic. A speech at a memorial is calm and gentle. Read the room, then choose.", "What does this moment call for?", "At a retirement party: warm, thankful and a little funny. At a safety briefing: clear and serious.", [
      "A pep talk before a game should sound...|Energetic|Sleepy|Sad",
      "A speech honoring someone's help is best delivered in a...|Warm, respectful tone|Mocking tone|Bored tone",
      "A safety briefing needs a tone that is...|Clear and serious|Silly|Whispery",
      "'Read the room' means to...|Notice the mood and adjust|Read the walls|Read aloud",
      "A joke-filled tone at a serious event is...|Often unsuitable|Always best|Required",
      "A gentle tone fits...|A quiet remembrance|A relay race|A fire drill",
      "Choosing the tone is part of knowing your...|Occasion and audience|Shoe size|Neighbor",
      "Changing tone for each event shows...|Awareness|Confusion|Rudeness"
    ]),
    SC("Parallel structure", "🪜", "Parallel structure repeats the same grammar pattern in a list or series. 'We came, we saw, we conquered' is parallel. 'I like swimming, to run and biking' is not. Parallel phrases sound smooth and are easy to remember.", "Keep list items in the same grammar pattern.", "Parallel: 'She likes reading, writing and drawing.'", [
      "Which sentence is parallel?|I like swimming, running and biking|I like swimming, to run and bikes|I like swim, running, bike",
      "Parallel structure makes speech sound...|Smooth and memorable|Confusing|Slow",
      "'We will learn, we will grow, we will lead.' repeats the same...|Pattern|Spelling mistake|Number",
      "Which phrase is NOT parallel?|To think, to speak, running|To think, to speak, to act|Think, speak, act",
      "Parallel lists are easier to...|Remember|Forget|Hide",
      "Which is parallel?|Be kind, be brave, be curious|Be kind, bravery, curious|Kindly, brave, curiosity",
      "'Of the people, by the people, for the people' is...|Parallel|Random|A mistake",
      "Parallel structure is a tool used by...|Speechwriters and speakers|Nobody|Only mathematicians"
    ]),
    SC("Vocal variety", "🎼", "Great speakers vary pitch (high or low), rate (fast or slow), volume (loud or soft) and use pauses. A monotone voice stays the same and puts listeners to sleep. Plan where to vary: slow for key points, quicker for action, pause before a big reveal.", "Vary your voice with purpose.", "'And the winner is... (pause) ...Room 12!' The pause builds suspense.", [
      "A monotone voice is one that...|Stays the same|Changes a lot|Sings",
      "Pitch means how...|High or low the voice is|Fast the voice is|Loud the voice is",
      "Rate means how...|Fast or slow you speak|High you speak|Pretty you look",
      "A pause before a big reveal creates...|Suspense|Boredom|Noise",
      "Slowing down on key points...|Helps listeners notice|Hides them|Is rude",
      "Which is a vocal variety tool?|Changing volume|Staying flat|Staring at the floor",
      "Speed up a bit when you describe...|Action|A sad moment|A quiet pause",
      "Good variety is used...|On purpose|By accident only|Constantly in every word"
    ]),
    SC("Debate: weigh the impact", "⚖️", "In a debate, it is not enough to list points. Explain how big the impact is. How many people does it affect, how seriously, and for how long? A smaller point with a huge effect can outweigh many tiny points.", "Compare size, seriousness and time.", "A rule that keeps 500 students safe weighs more than one that saves five minutes for ten students.", [
      "To weigh impacts you compare...|How big, serious and lasting each effect is|Who talks longest|Spelling",
      "A point affecting many people is usually...|Larger in impact|Smaller|Irrelevant",
      "A short-lived effect vs a lasting effect: lasting is...|Often weightier|Never weightier|Silly",
      "If your point has big impact you should...|Explain why it matters|Hide it|Rush through it",
      "Many tiny points can sometimes be outweighed by...|One serious point|Nothing|Silence",
      "Which question helps weigh impact?|How many people are affected?|What color is the room?|Who is tallest?",
      "'Safety' vs 'saving five minutes' — safety usually...|Outweighs|Loses|Ties always",
      "Weighing is a skill used by...|Strong debaters|Beginners only|Nobody"
    ]),
    SC("Evaluate a speaker", "🧐", "To evaluate a speaker, ask: What is the claim? Are the reasons logical? Is the evidence strong and up to date? Did the speaker stay fair? Notice delivery, but judge content too. Separate how it was said from what was said.", "Judge ideas by reasons and evidence, not just style.", "A smooth speaker with weak evidence still has a weak argument.", [
      "A first step in evaluating a speech is to find the...|Claim|Door|Clock",
      "A smooth delivery with weak evidence means the argument is...|Still weak|Strong|Unimportant",
      "Strong evidence is...|Specific and reliable|Vague and loud|Missing",
      "Fair speakers...|Represent other views honestly|Make fun of others|Avoid facts",
      "Which question evaluates reasoning?|Do the reasons logically support the claim?|Was the room hot?|Was it Tuesday?",
      "Separating delivery from content means...|Judging how it was said and what was said|Ignoring everything|Only judging looks",
      "Out-of-date evidence is...|A weakness|A strength|Required",
      "Evaluating helps you become a better...|Listener and speaker|Sleeper|Skipper"
    ]),
    SC("Main idea or detail?", "🔭", "In a long talk, listeners must sort what matters most. The main idea is the big point. Details are smaller pieces that support it. Signal words like 'most important', 'in short' or 'the key point is' tell you a main idea is coming.", "Listen for signal words and big-picture statements.", "'The key point is that sleep helps memory.' is a main idea. 'Kids sleep nine to eleven hours' is a supporting detail.", [
      "'The key point is...' tells you a... is coming.|Main idea|Detail|Joke",
      "A detail is...|A smaller piece supporting the main idea|The biggest idea|The title",
      "'In short...' often signals a...|Summary or main idea|New topic|Silence",
      "Which is more likely a main idea?|Teamwork makes projects stronger|Maya brought markers|The table was brown",
      "Listeners should note main ideas and...|A few key details|Every single word|Nothing",
      "Signal words help you...|Find what matters|Fall asleep|Leave",
      "'For example' signals a...|Detail or example|Main idea|Ending",
      "Which is a supporting detail?|Ten teams finished the build in under an hour|Teamwork is valuable|The big takeaway is clear"
    ]),
    SC("Explain a visual aloud", "🖼️", "To describe a diagram or photo for listeners, say what it is first, then describe parts in a logical order like left to right or top to bottom, and tell why it matters. If a person cannot see the image, give enough detail so they could picture it.", "Orient listeners, describe in order, then explain meaning.", "'This diagram shows a plant cell. At the center is the nucleus. It controls the cell.'", [
      "When describing a visual, you start by saying...|What it is|Nothing|Goodbye",
      "Describing parts in order like left to right helps listeners...|Follow along|Get lost|Doze",
      "After describing, you explain...|Why it matters|Your name|The weather",
      "If listeners cannot see the visual you should...|Give enough detail to picture it|Say nothing|Hold it up higher",
      "Which is a good orienting phrase?|Starting at the top left...|Whatever this is|Never mind",
      "Pointing to the part while you speak...|Helps listeners connect words and picture|Distracts always|Is forbidden",
      "'This chart shows rainfall by month' is a...|Clear opening description|Closing remark|Mistake",
      "A visual should...|Support your words|Replace you|Hide your face"
    ]),
    SC("Persuasive structure", "🏗️", "A classic persuasive plan: get Attention, show the Need or problem, give the Solution, picture the Result if people act, then make the Call to action. Each step builds on the one before it.", "Attention, need, solution, result, action.", "Attention: a surprising fact about trash. Need: our school wastes a lot. Solution: composting. Result: cleaner grounds. Action: sign up.", [
      "The first step in this plan is to get...|Attention|Applause|A ticket",
      "After the need you give a...|Solution|Surprise party|Test",
      "Picturing the result shows listeners...|What will get better|Nothing|Your shoes",
      "The final step is a...|Call to action|Cough|Question about lunch",
      "Which is the 'need' step?|Many students arrive late each morning|Let's start a morning bus|Please sign up today",
      "Which is the 'call to action' step?|Sign up at the front office today|The problem is large|Imagine a calmer morning",
      "The steps build...|On each other|Randomly|Backwards",
      "Skipping the solution would leave listeners...|Wondering what to do|Satisfied|Fully persuaded"
    ]),
    SC("Group presentation planning", "👫", "In a group project, divide the talk by topic, not by random sentences. Decide who opens and who closes, agree on key terms, rehearse the handoffs, and put the same style on every slide. One teammate may keep time.", "Plan roles first, then rehearse together.", "Ana opens, Ben covers causes, Cora covers effects, Dev closes and keeps time.", [
      "A good way to split a group talk is by...|Topic sections|Random words|Hair color",
      "Who should know the order of speakers?|Everyone|Only one person|Nobody",
      "Rehearsing together helps with...|Handoffs and timing|Nothing|Sleeping",
      "Using the same slide style across the group makes it look...|Unified|Messy|Late",
      "A timekeeper...|Watches the clock|Controls the weather|Cuts the power",
      "If a teammate is absent the group should...|Adjust and cover the part calmly|Cancel|Blame them",
      "Agreeing on key terms means everyone...|Uses the same words for the same ideas|Uses different words|Uses slang",
      "A strong group talk feels like...|One team|Many solo acts|A fight"
    ]),
    SC("Precise vocabulary", "🔬", "Exact words make you clear and credible. Instead of 'a lot of rain', say 'five inches of rain'. Instead of 'big', say 'enormous' or '40 feet tall'. In a subject like science, use the real term, and explain it if listeners may not know it.", "Swap vague words for exact ones.", "Vague: 'Some animals sleep a lot.' Precise: 'Koalas sleep about 18 hours a day.'", [
      "Which is more precise?|Five inches of rain fell|A lot of rain fell|It rained",
      "Instead of 'big', a precise choice might be...|Enormous|Nice|Thing",
      "Precise words make you sound...|Clear and credible|Vague|Sleepy",
      "If listeners may not know a term you should...|Explain it|Skip the topic|Use it faster",
      "'Koalas sleep about 18 hours a day' is...|Precise|Vague|Silly",
      "Which sentence is vaguest?|Stuff happened at some point|The storm hit at 3 p.m.|The temperature fell 12 degrees",
      "In science talks, use...|The real terms|Made-up words|Only slang",
      "Precision means being...|Exact|Loud|Quick"
    ]),
    SC("Summary versus opinion", "🧾", "A summary retells the main points fairly, without adding your own view. An opinion says what you think about them. When reporting, keep them separate: say 'The author argues...' for summary and 'I think...' for opinion.", "Signal which part is theirs and which is yours.", "Summary: 'The article says bees are declining.' Opinion: 'I think we should plant flowers.'", [
      "A summary is...|A fair retelling of main points|Your personal view|A new argument",
      "'I think the plan is great' is a...|Opinion|Summary|Quote",
      "'The author argues cities need more parks' is a...|Summary|Opinion|Joke",
      "In a summary you should leave out...|Your own opinion|Main points|Names",
      "Phrases like 'I believe' signal...|An opinion|A fact from a book|A summary",
      "Why keep them separate?|So listeners know whose ideas they are|To confuse|To shorten",
      "Which is a summary sentence?|The speaker outlined three steps to save water|That was dull|I would have used pictures",
      "A good summary is usually...|Shorter than the original|Longer|The same length"
    ]),
    SC("Speaking on a panel", "🎙️", "On a panel, several speakers share ideas with a moderator guiding the questions. Keep answers brief, speak to the audience as well as the moderator, build on what others said, and respect the time. Do not hog the microphone.", "Short, respectful, and connected to others' ideas.", "'Building on Tess's point about safety, I'd add that training helps.'", [
      "On a panel, a moderator...|Guides the questions|Plays music|Takes tickets",
      "Answers on a panel should be...|Brief|Endless|Whispered",
      "Building on others' points shows you...|Are listening|Are bored|Are shy",
      "'Hogging the microphone' means...|Talking too long and not sharing|Holding it kindly|Cleaning it",
      "Panelists should speak to...|The audience and moderator|The floor|Nobody",
      "If your time is almost up you should...|Wrap up your point|Start a new topic|Argue",
      "Which phrase builds on someone's idea?|I'd add to what Jon said|That's wrong|Next",
      "A panel works best when speakers are...|Respectful and prepared|Rude|Silent"
    ]),
    SC("I-statements", "🗣️", "An I-statement tells how you feel without blaming. Use the pattern: 'I feel ___ when ___ because ___.' It keeps talks calm and helps the other person listen instead of defend. 'You always ruin everything' blames. 'I feel left out when plans change without me' shares.", "Say how you feel and why, not what they did wrong.", "'I feel nervous when the group moves fast because I want to do my part well.'", [
      "An I-statement begins with...|I feel|You always|Everyone knows",
      "Which is an I-statement?|I feel upset when my idea is ignored because I worked hard on it|You never listen|Nobody ever helps",
      "I-statements help the other person...|Listen instead of defend|Get angrier|Leave",
      "A 'You always' sentence usually...|Blames|Explains kindly|Thanks",
      "The pattern is 'I feel ___ when ___ because ___.' The middle blank tells...|What happened|Who is wrong|Your name",
      "I-statements keep conflicts...|Calmer|Louder|Longer",
      "Which blame sentence could be changed to an I-statement?|You are so annoying|I feel stressed when the room is loud|I feel tired after practice",
      "Using I-statements is a sign of...|Maturity|Weakness|Silence"
    ]),
    SC("Solve a problem together", "🕊️", "When two people disagree, they can solve it together. Each tells their side without interrupting, they restate what they heard, list possible fixes, choose one that works for both, and thank each other. A helper may guide but doesn't take sides.", "Listen first, then fix together.", "A: 'I need quiet to read.' B: 'I need to practice.' Fix: quiet time first, then practice time.", [
      "A first step in solving a disagreement together is to...|Each person tells their side|Walk out|Insult each other",
      "Restating what you heard shows you...|Understood|Were bored|Are done",
      "A fix that works for both is called a...|Compromise or shared solution|Defeat|Punishment",
      "Interrupting during someone's side is...|Unhelpful|Required|Respectful",
      "A neutral helper...|Does not take sides|Wins the argument|Picks a favorite",
      "After agreeing you should...|Thank each other|Gloat|Argue again",
      "Listing possible fixes is called...|Brainstorming|Boasting|Sleeping",
      "The goal is to find a solution that...|Is fair to both|Hurts one side|Hides the issue"
    ]),
    SC("Set speaking goals", "🌟", "Good speakers keep growing. After a talk, pick one thing to improve, like fewer fillers or stronger openings. Set a specific goal, make a plan, practice, and check back. Small steps add up.", "A goal is specific, one step at a time.", "Goal: use no filler words in my next two-minute talk. Plan: practice with a partner who counts.", [
      "A good speaking goal is...|Specific and measurable|Huge and vague|Impossible",
      "Which is a specific goal?|Cut my filler words to three or fewer|Be better|Speak good",
      "After a talk, pick...|One thing to improve|Twenty things|None",
      "To meet a goal you need a...|Plan and practice|Wish|Nap",
      "Checking back on your goal helps you see...|Your progress|Your lunch|Nothing",
      "Small steps...|Add up over time|Never matter|Take away",
      "Feedback from others can help you...|Choose your next goal|Quit|Hide",
      "A growth mindset says that skills...|Grow with practice|Never change|Disappear"
    ]),
    SC("Build a speech start to finish", "🏁", "Putting it all together: choose a topic, think about your audience and purpose, write a thesis, outline main points and support, craft a hook and a conclusion, make notes or cue cards, rehearse out loud and with a timer, then present and reflect.", "Plan, build, rehearse, present, reflect.", "Topic: school gardens. Audience: parents. Purpose: persuade. Thesis: gardens teach science. Outline, hook, rehearse.", [
      "Which comes first in making a speech?|Choose a topic and think about your audience|Rehearse|Take a bow",
      "After you choose a thesis, you build an...|Outline|Applause|Excuse",
      "Rehearsing out loud with a timer helps you...|Check pacing|Skip steps|Forget",
      "The last step after presenting is to...|Reflect on how it went|Delete your notes|Never talk again",
      "A hook and conclusion are crafted...|After the outline|Before choosing a topic|Never",
      "Knowing your purpose means deciding if you will inform, persuade or...|Entertain|Hide|Delay",
      "Which step is for sounding natural?|Practice from key points|Read it once|Skip notes",
      "The whole process shows that good speeches are...|Planned and practiced|Lucky|Instant"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 10: lvl(10, L10), 11: lvl(11, L11), 12: lvl(12, L12) });
})();
