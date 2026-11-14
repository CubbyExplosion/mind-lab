// ext/speaking-13-15.js  Mind Lab Speaking & Listening, levels 13-15 (60 lessons)
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

  // ================= LEVEL 13 =================
  const L13 = [
    SC("Strong words and hedges", "💪", "Hedges are soft words like 'maybe', 'kind of' and 'I guess'. A few are fine when you are truly unsure. Too many make a speaker sound unsure of everything. Swap them for firm, honest words when you know the facts.", "Ask: do I know this is true? If yes, say it plainly.", "Instead of 'I kind of think recycling maybe helps', say 'Recycling saves energy.'", [
      "Which sentence sounds most sure?|Recycling saves energy|Recycling might kind of save some energy|I guess recycling is okay|Maybe",
      "Words like 'maybe' and 'sort of' are called...|Hedges|Hooks|Headlines",
      "Too many hedges make a speaker sound...|Unsure|Funny|Louder",
      "When you truly do not know, it is best to...|Say so honestly|Make up a fact|Say it louder",
      "Which opening is firmer?|Our school needs a garden|I guess our school could maybe have a garden|Um, a garden, maybe",
      "Replacing 'I just think' with 'I believe' makes you sound...|More confident|Less honest|Quieter",
      "Hedges are fine when...|The facts are really uncertain|Never|You are in a hurry",
      "Which phrase is a hedge?|Sort of|Definitely|Clearly"
    ]),
    SC("Bandwagon", "🎺", "The bandwagon trick says 'everybody is doing it, so you should too'. A crowd liking something does not make it true or good. Ask for the actual reasons.", "Look for the pressure of 'everyone' instead of a real reason.", "'All the kids have this game, so it must be great' gives no reason about the game itself.", [
      "Which is a bandwagon argument?|Everyone is buying it, so you should too|It is on sale for five dollars|It is made of wood",
      "The bandwagon trick uses the idea of...|Everybody does it|A famous expert|A scary story",
      "A fair way to answer a bandwagon claim is to ask...|What are the real reasons?|How many people?|Who is loudest?",
      "'Millions of people believed it, so it is true' is a problem because...|Crowds can be wrong|Millions is too small|It is rude",
      "Which line gives a real reason instead?|This bike has brakes that work in the rain|Everyone has this bike|Your friends will laugh",
      "A bandwagon appeal tries to make you feel...|Left out|Calm|Bored",
      "Popularity proves that something is...|Popular, not necessarily good|Healthy|Cheap",
      "Which ad slogan uses the bandwagon?|Join the thousands who already switched|Made with real fruit|Now in two sizes"
    ]),
    SC("False either-or", "🔀", "A false either-or says there are only two choices when there are really more. 'Either we build the playground now or the kids will be bored forever' ignores many middle options. Listen for 'either... or' and ask: is there a third way?", "Count the real options. Are there more than the two named?", "'You are either with us or against us' leaves out people who are neutral.", [
      "'Either we ban all games or kids never study' is a...|False either-or|Fair fact|Summary",
      "A false either-or leaves out...|Other choices|The speaker|The title",
      "A good question to ask is...|Is there a third option?|Who is taller?|How long is it?",
      "Which statement offers a fair range of choices?|We could walk, bike, or take the bus|Walk or fail|Bus or nothing",
      "'Study all night or fail the test' skips the choice of...|Studying a little each day|Failing twice|Taking a nap forever",
      "Words that often signal this trick are...|Either... or|First... then|In my opinion",
      "Why is a false either-or unfair?|It hides middle choices|It uses too many facts|It is too polite",
      "To answer it kindly you can say...|There are more options than that|You are wrong and silly|Nothing"
    ]),
    SC("Attacking the person", "🙅", "An ad hominem attack goes after the speaker instead of the idea. 'You cannot trust his recycling plan because he is in sixth grade' says nothing about the plan. Judge the argument by its reasons and evidence.", "Is the comment about the person or about the idea?", "'Her plan is bad because she is new here' attacks her, not the plan.", [
      "An ad hominem attack targets...|The speaker, not the idea|The evidence|The topic",
      "Which is an ad hominem?|You can't be right, you're always late|Your data is from last year|Your plan costs too much",
      "A fair reply to a plan is to talk about its...|Reasons and evidence|Speaker's clothes|Speaker's age",
      "Why does attacking the person fail as an argument?|It does not address the idea|It uses too many facts|It is too quiet",
      "Which comment is fair criticism?|The survey only asked ten students|You are not popular|Nobody likes your voice",
      "Good listeners judge a claim by...|Its support|Who said it first|How loud it was",
      "If someone attacks you instead of your idea, you can say...|Let's talk about the idea itself|You're worse|Nothing ever",
      "A good person can still make a...|Weak argument|Perfect argument every time|Loud argument only"
    ]),
    SC("Too few examples", "🔎", "A hasty generalization jumps to a big conclusion from a tiny sample. 'I met two rude cats, so all cats are rude' is not fair. Strong speakers use enough examples and words like 'some' or 'many' when they have not checked everyone.", "How many examples were really checked?", "Asking 5 of 600 students tells you very little about the whole school.", [
      "A hasty generalization is a big claim based on...|Too few examples|Many studies|A long survey",
      "Which is a hasty generalization?|My two neighbors are loud, so everyone here is loud|Fifty of the sixty rooms were checked|Most plants need light",
      "Words like 'some' and 'many' make claims...|More accurate|Longer|Louder",
      "A survey of 3 students about a school of 500 is...|Too small to trust|Perfect|Very big",
      "To fix a hasty claim, a speaker can...|Gather more examples|Speak faster|Skip evidence",
      "'All teenagers love loud music' is a claim that...|Covers everyone with no proof|Is scientifically tested|Is about one person",
      "Which wording is more careful?|Many students said they like lunch recess|Every student loves recess|No one dislikes it",
      "A fair sample should be...|Large and varied|One friend|Only people who agree"
    ]),
    SC("Cause or coincidence?", "🌦️", "Two things happening together do not always mean one caused the other. Ice cream sales and sunburns both rise in summer, but ice cream does not cause sunburn. The sun causes both. Ask: is there proof of cause, or just a link?", "Look for a hidden third reason that explains both.", "Umbrellas and wet roads show up together because rain causes both.", [
      "Ice cream sales and sunburns both go up in summer because...|Hot sunny weather causes both|Ice cream causes sunburn|Sunburn causes ice cream",
      "Just because B follows A...|It may not be caused by A|A caused B for sure|B is a fact",
      "A good question to ask is...|Is there proof of cause?|Which came first alphabetically?|Is it loud?",
      "'I wore my lucky socks and we won' shows...|A coincidence, not proof|Cause for sure|A scientific law",
      "A hidden third factor is something that...|Explains both events|Is always rude|Is a speaker's name",
      "Which claim gives a real reason for a cause?|The experiment changed only the light and the plants grew taller|The plants and the radio were both on|My cousin said so",
      "Two things happening together is called...|A link or correlation|A conclusion|A hook",
      "To test cause, scientists change...|One thing at a time|Everything at once|Nothing"
    ]),
    SC("Expert or not?", "🎓", "An expert knows a lot about a subject. Quoting a doctor about health is smart. Quoting a famous singer about medicine is not, because fame is not expertise. Ask: is this person an expert on THIS topic?", "Match the expert to the topic.", "A pilot is a good source about flying, not about baking.", [
      "Who is the best source about how bones heal?|A doctor who treats bones|A famous soccer fan|A cartoon character",
      "Fame in one area proves expertise in...|Only that area|Every area|No area",
      "Before trusting an expert, ask if they know this...|Topic|Song|Color",
      "A weather scientist is a good source on...|Storms and climate|Cooking pasta|Football scores only",
      "A speaker says 'a famous actor says this vitamin cures colds'. A careful listener asks...|Is an actor an expert on medicine?|Is the actor tall?|Is it sunny?",
      "Which source shows real expertise on volcanoes?|A volcano scientist|A game show host|A neighbor's cat",
      "Giving a person's job or training when you quote them...|Helps listeners trust the source|Wastes time|Is a rule for poems",
      "An authority is only reliable when they...|Speak about what they actually know|Speak loudly|Are famous"
    ]),
    SC("Spotting bias", "⚖️", "Bias is a leaning to one side. Everyone has some. A sneaker company will say its sneakers are best. When you listen, ask who is speaking, what they want, and what they may have left out.", "Think about what the speaker gains.", "A lemonade seller saying 'my lemonade is the best' wants your money.", [
      "Bias means...|Leaning to one side|Speaking softly|Using notes",
      "Who might be biased about a pizza shop being the best?|The pizza shop owner|A rock|A book",
      "A good listener asks, 'What does the speaker...?'|Want or gain|Wear|Drink",
      "A fair report on a debate would...|Show both sides|Show one side only|Show no facts",
      "Leaving out important facts is called...|Omission|Addition|Rhyme",
      "A bias warning sign is when a speaker uses only...|Positive words about one side|Facts from two sides|Questions",
      "Which source is least likely to be biased about a new park?|A neutral report with both views|A flyer from the builder|A rumor",
      "Being biased always means someone is lying.|False, it can be unintentional|True|Only on Fridays"
    ]),
    SC("Speak to honor someone", "🏅", "A tribute speech honors a person. Name them, say what they did with one clear story or example, show how it helped others, and end with thanks. Be warm and specific, not just 'she is nice'.", "Use a real example, not only big words.", "'Mr. Lee stayed after school to teach three of us chess. Thank you, Mr. Lee.'", [
      "A tribute speech is meant to...|Honor a person|Sell a toy|Argue a point",
      "Which is more specific?|She stayed late to help me finish my project|She is great|She is nice",
      "A good tribute includes...|A real story or example|A list of insults|Only a title",
      "A good ending thanks the person and...|Says how they helped|Changes the topic|Says goodbye to the audience only",
      "Tribute speakers should speak in a tone that is...|Warm and sincere|Sarcastic|Bored",
      "Why use an example instead of just 'she is nice'?|It shows the truth in action|It is longer|It sounds scary",
      "The opening of a tribute usually...|Names the person|Ends the talk|Asks a math question",
      "Who should hear a tribute speech?|The honoree and the audience|No one|Only strangers"
    ]),
    SC("The 30-second pitch", "⏱️", "An elevator pitch is a very short talk that explains your idea in about thirty seconds. Cover the problem, your idea, and why it helps, then end with what you want. Cut every extra word.", "Short means every sentence must earn its place.", "'Our school lacks bike racks. We want to add six. Safe bikes mean more riders. Will you help?'", [
      "An elevator pitch lasts about...|30 seconds|30 minutes|3 hours",
      "A pitch should include the problem, your idea and...|Why it helps|Your life story|A song",
      "To fit in 30 seconds you should...|Cut extra words|Talk faster and faster|Add jokes",
      "The pitch ends with...|What you want from the listener|A long story|Silence",
      "Which is the 'problem' part?|Our hallway gets crowded at lunch|Let's add two lanes|Thanks for listening",
      "Which is the 'idea' part?|We could mark one-way lanes|Everyone is mad|I like hallways",
      "A good pitch is built for...|One clear idea|Ten ideas|No idea",
      "Why practice a pitch aloud?|To check timing|To waste time|To scare yourself"
    ]),
    SC("PREP for quick answers", "🧱", "PREP helps you answer fast: Point (say your opinion), Reason (why), Example (a short case), Point again (repeat it). It keeps an impromptu answer tidy and clear.", "Say the point, back it up, then say the point once more.", "Point: recess matters. Reason: it helps focus. Example: after recess I read better. Point: recess matters.", [
      "In PREP, the P first stands for...|Point|Practice|Pause",
      "In PREP, R stands for...|Reason|Rhyme|Rest",
      "In PREP, E stands for...|Example|Echo|End",
      "The final P in PREP is to...|Restate your point|Start over|Whisper",
      "PREP is best for...|Quick unplanned answers|Reading a book|Taking attendance",
      "Which is a 'reason'?|Because it helps us focus|Last week at school|Please vote",
      "Which is an 'example'?|When I walked to school, I felt more awake|That is why|I believe so",
      "Why repeat the point at the end?|It helps listeners remember|It uses more time|It is a rule for gym"
    ]),
    SC("Flowing a debate", "🗒️", "A flow is a way to take notes in a debate. Make columns, one for each speech, and write each argument in a row so you can see which ones got answered. Short symbols and abbreviations save time.", "Notes should be quick and organized in columns and rows.", "Row 1: 'Uniforms save money' ... answer: 'Costs vary' in the next column.", [
      "A flow is a way to...|Take debate notes|Warm up your voice|Greet a judge",
      "On a flow, each column usually shows...|One speech|One color|One chair",
      "Rows line up...|The same argument across speeches|Different topics|Names of friends",
      "Why flow arguments?|To see which were answered|To draw pictures|To pass time",
      "Which helps you write fast?|Short abbreviations|Whole paragraphs|Silence",
      "An argument nobody answers is called...|Dropped|Winning always|Funny",
      "On a flow you would write...|Key points, not every word|Every word|Only the title",
      "Flowing helps you do what in a rebuttal?|Respond to the right points|Guess|Skip points"
    ]),
    SC("Crisp endings", "✂️", "Mumbling often happens at the ends of words and sentences. Finish consonants like t, d, k and s so listeners can tell 'want' from 'wan'. Slow down just a little and open your mouth.", "Listen for the last sound of each word.", "Say 'first, next, last' and make sure each final t is heard.", [
      "Crisp speech means finishing...|The ends of words|Only the title|The last slide",
      "Mumbling is often caused by...|Not finishing sounds|Speaking too clearly|Standing tall",
      "Which word has a final sound that can disappear when mumbled?|Past|Eye|Oh",
      "Opening your mouth more helps your words be...|Clearer|Quieter|Shorter",
      "To practice, say a tongue twister...|Slowly then faster|Only silently|Never",
      "Which hearing mistake could happen with 'cold' and 'cole'?|Missing the final d|Hearing the song|Seeing the page",
      "Slowing down slightly helps you...|Finish each word|Forget your notes|Whisper",
      "Clear endings matter most for...|Being understood|Being funny|Being quick"
    ]),
    SC("Say numbers so people get them", "🔢", "Numbers fly past listeners. Round big numbers ('about 3,000') and compare them ('twice as many as last year'). Give only a few numbers, and say them slowly with a pause after the key one.", "Make the number meaningful with a comparison.", "Say 'nearly 1,000 students, about the size of two buses full of classes' not '987'.", [
      "A good way to say 987 in a speech is...|Almost 1,000|Nine hundred eighty-seven point zero|Some number",
      "Comparing numbers helps listeners...|Understand size|Skip the talk|Fall asleep",
      "How many numbers should you pack into one sentence?|Only one or two|Ten|None ever",
      "After a key number you should...|Pause|Rush on|Cough",
      "'Twice as many as last year' is a...|Comparison|Joke|Question",
      "Why round 4,982 to about 5,000?|It is easier to hear|It is the exact fact|It is longer",
      "A visual like a chart can help when numbers are...|Many or complicated|Zero|Missing",
      "Which is easier to follow aloud?|Roughly one out of four students|Twenty-four point nine percent of 1,012 students|Number"
    ]),
    SC("Sarcasm and irony", "🙃", "Sarcasm says the opposite of what is meant, usually with a tone: 'Great, it's raining on our picnic.' Listen to the tone and the situation to catch it. Use sarcasm gently, since it can hurt or confuse.", "Match the words to the tone and the situation.", "If you say 'Wonderful' in a flat voice when your pencil breaks, you mean the opposite.", [
      "Sarcasm means saying...|The opposite of what you mean|Exactly what you mean|Nothing",
      "'Oh great, another test!' said in a groan is...|Sarcasm|A compliment|A fact",
      "What helps you catch sarcasm?|Tone and situation|Spelling|Page numbers",
      "Why use sarcasm carefully?|It can confuse or hurt|It is illegal|It is silent",
      "A friend says 'Nice job!' after you drop your tray, with a smile and a laugh. They might be...|Teasing or kind, check their tone|Always angry|Reading",
      "If you are not sure it was sarcasm, a kind step is to...|Ask what they meant|Shout|Walk away",
      "In a formal speech, sarcasm is usually...|Risky|Required|Silent",
      "Irony is when what happens is...|The opposite of what was expected|Exactly planned|Quiet"
    ]),
    SC("Idioms in speech", "🗣️", "An idiom is a phrase whose meaning is different from its words. 'Break the ice' means start a friendly conversation. They add color, but listeners from other places may not know them, so use them thoughtfully.", "Idioms do not mean their words literally.", "'It's a piece of cake' means it is easy.", [
      "'Break the ice' means...|Start a friendly talk|Smash a lake|Get cold",
      "'Piece of cake' means...|Very easy|Delicious|Small",
      "'Hit the books' means...|Study hard|Throw books|Visit a library only",
      "An idiom's meaning is...|Different from its words|The same as its words|Always rude",
      "Why use idioms carefully?|Some listeners may not know them|They are banned|They are boring",
      "'Under the weather' means...|Feeling sick|Standing outside|Looking at clouds",
      "'Spill the beans' means...|Tell a secret|Cook dinner|Drop food",
      "A good speaker might explain an idiom if the audience is...|Not familiar with it|Silent|Standing"
    ]),
    SC("Active voice", "🏃", "Active voice puts the doer first: 'The team won the game.' Passive voice hides the doer: 'The game was won by the team.' Active sentences are shorter and punchier, so they work well in speaking.", "Who does the action? Put them first.", "Change 'The ball was kicked by Mia' to 'Mia kicked the ball.'", [
      "Which sentence is active?|Mia kicked the ball|The ball was kicked by Mia|The ball is kicked",
      "Active voice puts the doer...|First|Last|Nowhere",
      "Active sentences are usually...|Shorter and stronger|Longer and slower|Silent",
      "Which sentence is passive?|The cake was eaten by the class|The class ate the cake|We ate cake",
      "Change 'The song was sung by Leo' to active:|Leo sang the song|Sung was the song|The song Leo",
      "For a powerful speech, which opening is better?|We can clean our beach|The beach can be cleaned by us|Cleaning is a thing that can happen",
      "Passive voice is sometimes useful when...|The doer is unknown|You want to hide nothing|You like long sentences",
      "'Mistakes were made' is passive because it...|Hides who made them|Names the person|Is a question"
    ]),
    SC("Story or proof?", "📖", "An anecdote is a short story that makes a point feel real. Evidence is facts, numbers or research. A story gets attention, but it is only one case. The strongest talks use both: a story to connect and evidence to prove.", "A story shows; evidence proves.", "Open with a story about one student who skipped breakfast, then add a study about many.", [
      "An anecdote is...|A short true or sample story|A chart|A rule",
      "Evidence is...|Facts, numbers or research|A joke|A dream",
      "A story alone is not enough proof because...|It is just one case|It is always false|It is too short",
      "The strongest talks use...|A story and evidence|Only silence|Only jokes",
      "Which is evidence?|A study of 2,000 students found...|My friend said|It happened once to me",
      "Which is an anecdote?|Last week my little sister...|The average rose 5%|The graph shows",
      "Use a story to...|Connect with listeners|Replace all facts|Fill time only",
      "Use evidence to...|Back up your claim|Entertain only|Hide your thesis"
    ])
  ];

  // ================= LEVEL 14 =================
  const L14 = [
    SC("Repeat the start", "🔁", "Anaphora means repeating the same words at the start of sentences for power. 'We will learn. We will help. We will lead.' The repeated beat is easy to remember and builds energy. Use it two or three times, not ten.", "Look for the same opening words again and again.", "'Because we care, because we try, because we can.'", [
      "Anaphora is repeating words at the...|Start of sentences|End of a book|Middle of a word",
      "Which uses anaphora?|We will read. We will write. We will speak|Reading is fun|Reading, writing, speaking",
      "Anaphora helps a speech by adding...|Rhythm and power|Confusion|Silence",
      "How many repeats work best?|Two or three|Thirty|None",
      "'I like soccer. I like swimming. I like chess.' repeats...|I like|Soccer|Chess",
      "Where would anaphora be useful?|A call to action|A grocery list|A phone number",
      "Which line is NOT anaphora?|The dog barked loudly|Together we build, together we grow|Never give up, never give in",
      "Repeating a phrase at the start makes it..|Easy to remember|Hard to say|Rude"
    ]),
    SC("Contrast pairs", "⚖️", "Antithesis puts opposite ideas side by side in similar wording: 'Easy to start, hard to finish.' The balance makes the idea stick. It works well in slogans, openings and closings.", "Look for two opposite ideas in a balanced sentence.", "'Small steps, big change.'", [
      "Antithesis puts opposite ideas...|Side by side|On separate pages|In a list of colors",
      "Which is a contrast pair?|Speak softly but think boldly|Run fast|Blue shirt",
      "'Easy to start, hard to finish' pairs...|Easy with hard|Start with start|Finish with finish",
      "Contrast pairs are good in...|Slogans and closings|Weather reports|Phone numbers",
      "Which is a balanced contrast?|Ask not what you can get, but what you can give|Ask what you want|Give a gift",
      "The balance in the sentence helps listeners...|Remember it|Forget it|Leave",
      "Complete the contrast: 'Many hands, ___ work'|light|heavy|loud",
      "Antithesis uses opposites in...|Similar wording|Random wording|No words"
    ]),
    SC("Big and small claims", "🔊", "Hyperbole is a big exaggeration: 'I've told you a million times.' Understatement makes something big sound small: 'It's a bit chilly' at the North Pole. Both add humor or emphasis, but they should not be mistaken for facts.", "One blows things up, the other shrinks them.", "'This bag weighs a ton' is hyperbole. 'The test was not the easiest' might be understatement.", [
      "'My backpack weighs a ton' is...|Hyperbole|A weighed fact|Understatement",
      "'It's just a little rain,' said during a hurricane, is...|Understatement|Hyperbole|A weather report",
      "Hyperbole is meant to be...|An exaggeration|Taken literally|A fact",
      "Why be careful using hyperbole in a report?|Listeners may think it is fact|It is a secret|It is short",
      "Which is hyperbole?|I'm so hungry I could eat a horse|I'm a bit hungry|I ate lunch",
      "Which is understatement?|That math problem was a tiny bit tricky, said about a super hard one|I'll die of boredom|A million kids",
      "Hyperbole and understatement both add...|Emphasis or humor|Math|Silence",
      "In a science talk, numbers should be...|Accurate, not exaggerated|Made bigger|Skipped"
    ]),
    SC("Allusion", "📚", "An allusion is a quick mention of something well known, like a story, event or character, to add meaning. 'It was a David and Goliath match' suggests a small team facing a big one. It only works if your audience knows the reference.", "Think: does everyone here know what I'm pointing to?", "Calling a cheating game a 'Pandora's box' suggests opening one thing that unleashes many troubles.", [
      "An allusion is a quick mention of...|Something well known|A secret|A new invention",
      "'A David and Goliath match' suggests...|A small side facing a giant|A long game|A tie",
      "An allusion works only if the audience...|Knows the reference|Is asleep|Is very young",
      "Which is an allusion?|He had the Midas touch with business|He ran fast|He had lunch",
      "Before using an allusion, check that listeners will...|Understand it|Laugh|Clap",
      "'Meeting your Waterloo' means...|Facing your final defeat|Going on vacation|Building a bridge",
      "Allusions add...|Extra meaning in a few words|Length|Static",
      "If your audience does not know it, you should...|Explain it or choose another|Use it anyway|Shout"
    ]),
    SC("Fair or sneaky?", "🎭", "Honest persuasion uses true facts, fair reasons and respect. Manipulation uses fear, tricks or hidden facts to push people. Ask yourself: would I be happy if the listener knew exactly how I was trying to persuade them?", "Honest methods can be said out loud.", "'Our plan saves money; here are the numbers' is honest. 'Hurry or something bad will happen' is pressure.", [
      "Honest persuasion uses...|True facts and fair reasons|Tricks|Hidden facts",
      "Which is manipulation?|Scaring people with made-up dangers|Showing a real survey|Asking a question",
      "A test of fairness is to ask: would I be okay if the listener knew...?|How I was persuading|What I ate|My birthday",
      "Leaving out facts that hurt your side is...|Unfair|Smart and fair|Required",
      "Which is respectful?|Letting listeners decide|Rushing them|Calling them names",
      "Fake urgency, like 'only 2 minutes left!', is a...|Pressure tactic|Real reason|Poem",
      "Honest speakers admit...|Limits of their evidence|Nothing|They are always right",
      "Persuasion should help listeners...|Make a good choice|Feel trapped|Not think"
    ]),
    SC("Check before you repeat", "🕵️", "Before sharing a surprising claim, check it. Find where it came from, look for the same fact in two other trustworthy places, and see how recent it is. If you cannot confirm it, say 'I have not been able to verify this'.", "Confirm in more than one trusted source.", "Heard that sharks never get sick? Check two reliable science sources before telling the class.", [
      "A good first check on a claim is to find...|Where it came from|Who shared it fastest|How many likes",
      "How many trusted sources is better than one?|Two or more|Zero|One friend",
      "If you can't verify a claim, you should...|Say it is unverified|Say it is true anyway|Make up proof",
      "Checking the date helps you see if the claim is...|Still current|Funny|Long",
      "A claim with no clear source is...|Hard to trust|Proven|Required",
      "Which source is generally more reliable for science facts?|A science museum or textbook|A rumor|A random comment",
      "Why check before you speak to a group?|Many people may believe you|It is a rule for gym|It takes less time",
      "A shocking claim that makes you angry should make you...|Check it more carefully|Share it right away|Stop reading forever"
    ]),
    SC("Quote people accurately", "🎤", "When you interview someone, listen for exact words and write them down. Use their words fairly, never twist them. If you shorten a quote, do not change its meaning. Say who said it: 'As Ms. Ortiz told me, ...'", "Keep the speaker's meaning, and say who they are.", "Not 'she said we're awful' when she said 'we're not awful yet but we can improve'.", [
      "When you quote someone you must keep their...|Meaning|Hairstyle|Handwriting",
      "It's wrong to shorten a quote so that it says...|Something the person did not mean|A shorter version|Anything",
      "You should say who said the words by using...|Attribution|Applause|Silence",
      "Which attribution is clear?|As Ms. Ortiz told me,|Somebody once said|It is said",
      "Why write down exact words?|To be fair and correct|To fill the page|To look busy",
      "Changing 'not bad' to 'bad' in a quote is...|Twisting it|Fixing it|Poetry",
      "Asking permission before sharing a private interview is...|Respectful|Silly|Banned",
      "If you are not sure you heard it right, you can...|Ask the person to repeat or confirm|Guess|Skip it"
    ]),
    SC("Read body language", "👀", "Listeners can read speakers, and speakers can read listeners. Crossed arms and a frown may mean disagreement; leaning forward may mean interest. But one clue is not proof, so look at several signs and check by asking.", "One sign alone can mislead you.", "Yawning may mean tired, not bored of you. Look for more signs.", [
      "Leaning forward can mean someone is...|Interested|Asleep|Leaving",
      "Looking at the clock many times may mean someone is...|Worried about time|Very happy|Busy cooking",
      "One body-language sign is...|Not proof by itself|Always correct|A rule",
      "If your audience looks confused, you could...|Slow down and explain again|Speed up|Whisper",
      "Reading your listeners' signs while speaking is called...|Reading the room|Reading the page|Rewinding",
      "Smiling and nodding often means...|Agreement or understanding|Anger|Sleep",
      "To check what a sign really means, you can...|Ask a friendly question|Assume the worst|Ignore people",
      "A speaker who notices signs can...|Adjust the talk|Never change|Get lost"
    ]),
    SC("Across cultures", "🌍", "Different families and communities have different speaking habits. Eye contact, how close people stand, and whether to interrupt can mean different things. Be curious, polite and flexible, and never assume one way is the only right way.", "Habits differ; politeness means noticing and respecting them.", "In some places looking elders in the eyes is respectful; in others it is polite to look down.", [
      "Speaking habits like eye contact...|Differ among communities|Are the same everywhere|Do not matter",
      "A respectful attitude toward different habits is to be...|Curious and polite|Mocking|Silent forever",
      "If a classmate looks away while talking, it might mean...|A cultural habit, not rudeness|They hate you|They are lying",
      "Standing distance when talking can be...|Different from family to family|Fixed by law|Measured in meters",
      "When you are unsure what is polite, you can...|Ask kindly|Guess rudely|Leave",
      "Using a few words in a classmate's home language can show...|Respect|Nothing|Trouble",
      "Which is a fair thought?|My way isn't the only way|Everyone must do it my way|Others are wrong",
      "Being flexible with audience habits helps you...|Connect with more people|Stand still|Speak less"
    ]),
    SC("Present an award", "🏆", "When you hand out an award, say what it is for, tell one specific reason the winner earned it, and say their name clearly at the right moment. Keep it short, warm and fair to the other nominees.", "Be specific and kind. Name the winner last.", "'This award is for teamwork. She stayed to help every group clean up. Congratulations, Priya!'", [
      "An award speech should say what the award is...|For|Against|About lunch",
      "A good reason is specific, like...|She helped each group clean up|She is amazing|Everyone loves her",
      "When do you usually say the winner's name?|After the reason, at the end|Never|First of all, twice",
      "Being fair to other nominees means...|Speaking kindly of them too|Ignoring them|Teasing them",
      "How long should it be?|Short|An hour|A few seconds with no words",
      "Your tone should be...|Warm and celebrating|Bored|Angry",
      "Saying the name clearly matters because...|The winner and the audience need to hear it|Names are secret|It's required by math",
      "A presenter may end with...|Congratulations|A quiz|A complaint"
    ]),
    SC("Speak for the ear", "🎧", "In a podcast or radio piece, listeners cannot see you or any slides. Use short sentences, simple words, and sound pictures. Repeat the key idea, signpost clearly, and use your voice to show where one part ends.", "No pictures: your words and voice must do the work.", "Say 'Three tips. First, ...' so ears can follow along.", [
      "In audio-only talks, listeners cannot see...|You or slides|Your voice|The words",
      "Which sentence suits audio better?|Here are three tips. First, rest|The aforementioned parameters are as follows|See slide two",
      "Short sentences help audio listeners...|Keep up|Fall asleep|Lose volume",
      "Signposting like 'next' helps because...|Listeners can't see a page|It's longer|It's required",
      "'As you can see in this picture' works poorly on...|A podcast|A classroom wall|A poster",
      "To show a new part has started you can...|Pause and change your voice|Sneeze|Whisper nothing",
      "Repeating the key idea in audio is...|Helpful|Wasteful always|Banned",
      "Sound pictures use words that help listeners...|Imagine what you describe|Look at a chart|Skip a part"
    ]),
    SC("Compare two visuals", "📊", "Sometimes you must explain two charts or pictures. Tell what each shows, then say how they are alike and different, and what that means. Use words like 'both', 'however', and 'in contrast'.", "Describe each, then compare, then say what it means.", "'Both charts show sales. Chart A rises; chart B stays flat. In contrast, ...'", [
      "First step when explaining two charts:|Say what each shows|Skip to the end|Read all numbers",
      "A compare word is...|Both|Soon|Maybe",
      "A contrast word is...|However|Because|First",
      "After comparing you should explain...|What it means|What you ate|Your age",
      "'Chart A rises while chart B is flat' shows a...|Difference|Likeness|Joke",
      "'Both charts end in December' shows a...|Likeness|Difference|Mistake",
      "If a graph has no label on its axis, a careful speaker...|Says what it measures|Ignores it|Guesses",
      "Good comparison speech avoids reading...|Every single number|The title|Anything"
    ]),
    SC("Seminar talk", "🪑", "A seminar is a group conversation about a text or an idea. Everyone shares and listens. Support your points with the text, ask open questions, build on others' words, and invite quieter voices in.", "Use the text, listen, and include everyone.", "'On page 4 the author says... Mei, what do you think?'", [
      "In a seminar you should support points with...|The text|Your lucky color|Silence",
      "A good open question starts with...|Why or how|Is it|Yes or no",
      "Building on someone's idea sounds like...|Adding to what Sam said|You're wrong|Whatever",
      "Inviting quieter voices means...|Asking them kindly to share|Forcing them|Skipping them",
      "The aim of a seminar is to...|Understand ideas together|Win|Finish first",
      "If you disagree, you...|Respectfully explain why|Roll your eyes|Leave",
      "Using page numbers shows you...|Backed your point with the text|Counted pages|Hurried",
      "Who should do most of the talking?|Everyone, in turns|Only the leader|Nobody"
    ]),
    SC("The tough question", "❓", "Someone may ask a challenging question. Stay calm, pause, and thank them. If it is fair, answer honestly. If you don't know, say so and offer to find out. If it is unfair, calmly restate what you can answer.", "Breathe, be honest, stay respectful.", "'Good question. I haven't studied that part, but I'll check and tell you tomorrow.'", [
      "When asked a tough question, first...|Pause and stay calm|Panic|Argue loudly",
      "If you don't know the answer you should...|Say so and offer to find out|Guess wildly|Ignore it",
      "Thanking the asker shows...|Respect|Weakness|Nothing",
      "A calm tone helps because it...|Keeps you in control|Hides facts|Makes you louder",
      "If a question is unfair, you can...|Calmly restate what you can answer|Be rude|Run",
      "Which is a respectful opener?|That's a good question|What a silly thing to ask|Whatever",
      "Making up an answer you don't know...|Can hurt your trust|Is a good trick|Is required",
      "Repeating the question aloud can help you...|Think and make sure all hear|Waste time|Hide"
    ]),
    SC("Reach agreement", "🤝", "Consensus means finding an answer everyone can live with. Listen to each view, find shared goals, offer options that mix ideas, and check each person: 'Can you live with this?' It takes patience, but people support what they helped build.", "Look for the common goal, then mix ideas.", "'We all want a fun field day. Could we do races in the morning and games in the afternoon?'", [
      "Consensus means a decision that...|Everyone can live with|Only the loudest likes|One person picks",
      "The first step is to...|Listen to each view|Vote at once|Leave",
      "A shared goal helps people...|Work together|Argue more|Quit",
      "To mix ideas you might say...|What if we combine both?|Mine only|Never",
      "Checking 'Can you live with this?' is to...|Make sure no one is left out|Cause a fight|Skip a vote",
      "Why does consensus take patience?|Everyone's view is heard|It is magic|It is silent",
      "People support what they...|Helped build|Were told|Ignored",
      "Which is a bad consensus move?|Pressuring a quiet person to just agree|Asking everyone's views|Finding a compromise"
    ]),
    SC("Costs and benefits", "💰", "To persuade about a plan, compare costs with benefits. List what it costs (money, time, effort) and what it gives (savings, safety, joy). A fair speaker admits the costs and shows why the benefits are worth it.", "Show both sides of the ledger.", "A new recycling bin costs $40, but saves 200 bottles from the trash each month.", [
      "A cost is what you...|Give up or spend|Gain|Say",
      "A benefit is what you...|Gain|Lose|Owe",
      "Admitting the costs makes you seem...|Honest|Weak|Rude",
      "A plan is a good idea when benefits are...|Worth the costs|Hidden|Smaller than costs always",
      "Which is a cost?|Two hours of volunteer time|A cleaner park|Happy neighbors",
      "Which is a benefit?|A safer crossing|Paying for paint|Waiting for a permit",
      "Which line weighs both?|It costs $50 but will protect 300 students|It is great|It is cheap",
      "Hiding costs from listeners is...|Unfair|Smart and honest|Required"
    ]),
    SC("Review your recording", "📹", "Recording yourself shows what you cannot notice while speaking. Watch or listen once for voice (pace, volume), once for words (filler, clarity), and once for body (posture, hands). Choose one thing to improve next time.", "Review in layers and pick one goal.", "Listen once just for pace. Notice you rush. Next time pause between points.", [
      "Recording yourself helps you notice...|What you can't catch while speaking|Nothing|Other speakers",
      "A good way to review is to check...|One layer at a time|Everything at once|Only the ending",
      "Voice layer includes...|Pace and volume|Posture|Color",
      "Body layer includes...|Posture and hands|Pace|Spelling",
      "After review you should choose...|One thing to improve|Fifty goals|To quit",
      "Watching only for filler words checks your...|Words|Posture|Volume",
      "Your attitude toward your recording should be...|Kind and curious|Harsh|Ashamed",
      "Compare the first and later recordings to see...|Progress|Nothing|The weather"
    ]),
    SC("Chunk and map", "🗺️", "Instead of memorizing every word, chunk your talk into 3 to 5 big parts and picture each as a place on a mental map or route. Remember the order of places, then speak naturally about each. You sound real, not robotic.", "Remember the route, not every word.", "Picture the front door (hook), kitchen (point one), hallway (point two), garden (ending).", [
      "Chunking means dividing your talk into...|Big parts|Letters|Pages of a book",
      "Memorizing each word exactly can make you sound...|Robotic|Natural|Loud",
      "A mental map links parts to...|Places in order|Songs|Weather",
      "How many chunks work for a short talk?|About 3 to 5|40|None",
      "If you forget a sentence, a map lets you...|Keep going to the next place|Stop forever|Start again",
      "Speaking naturally about each chunk makes you sound...|Real|Fake|Silent",
      "Which is best to memorize first?|Your order of points|Every comma|The date",
      "Practicing the route out loud...|Builds confidence|Hurts|Is useless"
    ])
  ];

  // ================= LEVEL 15 =================
  const L15 = [
    SC("Claim, evidence, reasoning", "🏛️", "A strong argument has a claim (what you say is true), evidence (facts that support it), and reasoning (explaining why the evidence proves the claim). Reasoning is the bridge. Without it, the evidence is just a fact sitting there.", "Evidence needs a bridge to the claim.", "Claim: later bedtime hurts learning. Evidence: sleepy students scored lower. Reasoning: tired brains remember less.", [
      "A claim is...|What you say is true|A fact from a study|A funny story",
      "Evidence is...|Facts that support the claim|The speaker's age|The title",
      "Reasoning explains...|Why the evidence proves the claim|Who you are|How long you spoke",
      "Without reasoning, evidence is...|A fact with no link|A strong plan|Missing nothing",
      "Which sentence is a claim?|School should start later|The survey had 200 answers|Sleep takes hours",
      "Which sentence is reasoning?|This shows that rested students focus better|Page 12|Second place",
      "Which is evidence?|A study found 30% more errors when students slept under six hours|Everyone knows it|I feel so",
      "A good argument connects the evidence back to the...|Claim|Weather|Name"
    ]),
    SC("Strong or too strong?", "🎚️", "Claims can be too strong: 'Everyone always hates homework.' Use accurate qualifiers like 'often', 'many', 'usually' when the evidence is not about all cases. A well-sized claim is easier to prove and more believable.", "Match the claim's strength to the evidence.", "Say 'Most students in our survey' instead of 'Every student in the world'.", [
      "Which is a qualifier?|Usually|Always|Never",
      "'Everyone always loves pizza' is...|Too strong|Just right|Too weak",
      "A well-sized claim is...|Easier to prove|Impossible|Silent",
      "Evidence from 20 students supports 'Many in our class' better than...|All students everywhere|Most of our group|Some here",
      "Which claim fits a survey of 50 sixth graders?|Many sixth graders at our school prefer later starts|All kids on Earth prefer later starts|Nobody wants early starts",
      "Qualifiers make a speaker seem...|Careful and fair|Weak always|Rude",
      "'Often' is a better word than 'always' when...|There are exceptions|The topic is lunch|You are loud",
      "Overstating your claim can make listeners...|Doubt you|Believe more|Clap"
    ]),
    SC("Concede and counter", "🏳️", "A concession admits that the other side has a fair point, and then you counter with why your view still stands. 'It is true that tablets cost money; however, they replace heavy books.' This shows you listened and builds trust.", "Admit the fair part, then explain the 'however'.", "'True, homework takes time; however, practice builds skills.'", [
      "A concession admits...|The other side has a fair point|You are wrong about everything|Nothing",
      "After conceding, you...|Counter with why you still hold your view|Quit|Whisper",
      "A word that starts the counter is...|However|Because|Thanks",
      "Conceding builds...|Trust|Fear|Noise",
      "Which uses concession?|It is true that it costs money, but it saves time|It's perfect|No one is right",
      "A speaker who ignores strong opposing points seems...|Less fair|More fair|Quiet",
      "'Although' can be used to...|Admit one point before making another|End a speech|Ask a question",
      "Concession shows you've...|Listened to the other side|Given up|Lost"
    ]),
    SC("Enough evidence?", "📏", "Judging a speaker's reasoning means asking: Is there enough evidence? Is it relevant to the claim? Is it from a good source? A single story, an old fact or an unrelated number does not make a strong case.", "Check enough, relevant, reliable.", "A claim about city traffic backed by one friend's story is not enough.", [
      "Relevant evidence is...|Connected to the claim|About something else|Funny",
      "Enough evidence means...|More than one weak example|One story only|Zero facts",
      "Reliable evidence comes from...|A trustworthy source|A rumor|A guess",
      "A claim about school lunches backed by a fact about shoes is...|Not relevant|Relevant|Strong",
      "Old facts may be a problem if the topic...|Changes over time|Never changes|Is about history only",
      "A listener checking reasoning asks...|Does the evidence prove the claim?|Is the speaker tall?|Is it warm?",
      "Which is the weakest support?|My cousin once saw it|A national survey of 5,000 people|A published study",
      "To improve weak evidence, add...|More relevant sources|A louder voice|Another joke"
    ]),
    SC("Propaganda tricks", "📢", "Propaganda tries to sway people with feelings rather than facts. Name-calling attaches bad labels. Glittering generalities use lovely words with no details ('freedom! greatness!'). Testimonial uses a famous person. Plain folks says 'I'm just like you'. Spot them, then ask for facts.", "Look for feelings and labels instead of facts.", "'Join the great, wonderful team!' has glittering words but no details.", [
      "Name-calling uses...|Bad labels for the other side|Facts|Questions",
      "Glittering generalities are...|Lovely words with no details|Real data|Quiet",
      "A testimonial uses...|A famous person's endorsement|A graph|A recipe",
      "'Plain folks' tries to seem...|Just like you|Fancy|Distant",
      "'A wonderful, glorious future for all!' with no plan is...|Glittering generalities|Name-calling|A fact",
      "The best response to propaganda is to ask for...|Facts and details|More slogans|Silence",
      "'Those greedy fools can't be trusted' is...|Name-calling|A testimonial|A statistic",
      "Propaganda mostly appeals to...|Feelings|Evidence|Math"
    ]),
    SC("Tricky statistics", "📉", "Numbers can mislead. A tiny sample ('3 out of 4 dentists' might be only four dentists) can't represent a lot of people. An average can hide big differences. A graph that starts above zero can make small changes look huge. Ask how the number was found.", "Ask about the sample, the average and the scale.", "A bar chart starting at 90 instead of 0 makes 92 versus 96 look like a giant gap.", [
      "'Three out of four people' could be misleading if the group was...|Only four people|Four thousand|Everyone",
      "An average can hide...|Big differences|Nothing|Words",
      "A graph's axis that starts above zero can make changes look...|Bigger than they are|Smaller|The same",
      "A fair sample is...|Large and random|Tiny and handpicked|Only friends",
      "A good listener asks, 'How was this number...?'|Found|Colored|Typed",
      "If one huge number raises the average, the typical value may be...|Lower than the average|Higher|Silent",
      "Which sentence is more careful?|In a random survey of 800 students, 62% said yes|Most people say so|Probably true",
      "Percent of a tiny group can sound...|Impressive but mean little|Always exact|Wrong"
    ]),
    SC("Straw man", "🧍", "A straw man twists someone's idea into a weaker one and then knocks it down. If you say 'We should have less homework' and I reply 'So you want kids to never learn anything?', I attacked something you did not say. Restate fairly before you respond.", "Did they answer what was really said?", "'We need a longer lunch' becomes 'You want to cancel class' in a straw man.", [
      "A straw man argument...|Twists an idea into a weaker version|Quotes it fairly|Ends the talk",
      "'You want less homework? So you hate learning!' is...|A straw man|A fair reply|A story",
      "To avoid a straw man, first...|Restate their view fairly|Exaggerate it|Ignore it",
      "A straw man is unfair because it...|Argues against something not said|Uses facts|Uses a quote",
      "Fair way to respond to 'We need more bike racks':|I see; here is what worries me about cost|So you hate cars|You want to ban everything",
      "When your idea is twisted, you can say...|That is not what I said; here is my point|Fine|Yell",
      "Which is the fair restatement of 'I prefer shorter meetings'?|You want meetings to be shorter|You want no meetings ever|You hate people",
      "A straw man avoids the...|Real argument|Speaker's shoes|Time"
    ]),
    SC("Slippery slope", "⛷️", "A slippery slope claims one small step will unavoidably cause a chain of terrible results: 'If we allow gum, soon students will chew in tests and then class will collapse.' Ask: is each step truly likely, and what's the evidence?", "Check each link in the chain.", "'One later bedtime means no sleep ever' skips many steps.", [
      "A slippery slope claim says one step leads to...|A chain of bad results|A single result|Nothing",
      "A reasonable listener asks:|Is each step really likely?|Is it loud?|Is the chain colored?",
      "Which is a slippery slope?|If we allow one snack, soon nobody will study and school will close|Snacks cost money|Snacks are tasty",
      "The weakness of a slippery slope is that it...|Skips evidence for each step|Uses too many facts|Is polite",
      "A fair prediction has...|Evidence for how it happens|Wild guesses|Fear",
      "Real chains of cause can exist when there is...|Evidence for each link|A scary story|A loud voice",
      "'If we start recycling, soon we will recycle everything and have no trash' is...|Not necessarily a trick, it can be a goal|A trick always|Rude",
      "To answer a slippery slope you could say...|Show me why each step would follow|You are silly|Nothing"
    ]),
    SC("Debate formats", "🏟️", "Debates have formats. In one-on-one formats a single speaker per side builds a case and responds. In team formats partners split jobs: one opens, one rebuts. Each format has time limits, speaking order and a chance for questions. Learn the rules beforehand.", "Know speaking order, time limits and job split.", "In a team debate, speaker one presents the case, speaker two answers the other side.", [
      "In a team debate partners...|Split jobs|Do the same job|Do nothing",
      "A format sets the...|Order and time limits|Weather|Prizes",
      "In one-on-one debate each side has...|A single speaker|A team of ten|A choir",
      "Why learn the rules before?|To use your time well|To confuse judges|To skip practice",
      "Time limits help keep the debate...|Fair|Longer|Silent",
      "A rebuttal speech mostly...|Answers the other side|Introduces a new topic|Thanks the judge only",
      "A constructive speech mostly...|Builds your case|Ends the debate|Greets everyone",
      "Cross-questioning periods let speakers...|Ask each other questions|Rest|Sing"
    ]),
    SC("Crossfire manners", "🔄", "In a crossfire or back-and-forth period, you ask and answer quickly. Keep questions short and clear, let the other person finish, don't talk over them, and stay calm. Aim to learn or to test an argument, not to embarrass.", "Short question, let them finish, stay calm.", "'You said the plan costs $200. Where does that number come from?'", [
      "In crossfire, questions should be...|Short and clear|Very long|Rude",
      "Letting the other person finish is...|Respectful|Weak|Not allowed",
      "The purpose of questions is to...|Learn or test an argument|Embarrass|Waste time",
      "Talking over someone...|Shows poor manners|Is required|Wins automatically",
      "A calm voice during crossfire helps you...|Think clearly|Lose points|Get louder",
      "Which question tests evidence?|Where does that number come from?|Why are you so wrong?|Do you like debate?",
      "If you don't understand the answer, you can...|Ask a follow-up|Roll your eyes|Walk out",
      "Aim for questions that...|Move the discussion forward|Trap the person|Avoid facts"
    ]),
    SC("Speeches for occasions", "🎉", "Some speeches fit special moments: a welcome, a farewell, a memorial, a graduation. Match the tone to the moment, keep it short, speak to the feelings in the room, and include a story or memory. Ask what the people there need to hear.", "Match the mood of the moment.", "At a farewell, thank the person, share a warm memory, and wish them well.", [
      "A farewell speech usually includes...|Thanks and good wishes|A debate|A quiz",
      "At a memorial the tone should be...|Respectful and gentle|Jokey and loud|Angry",
      "A welcome speech should make guests feel...|Included|Lost|Nervous",
      "Occasion speeches are usually...|Short|Very long|Silent",
      "A good way to connect is to share...|A memory or story|A tax form|A complaint",
      "To prepare, ask...|What do these people need to hear?|What is my favorite color?|What time is dinner?",
      "A graduation speech often looks forward to...|The future|Last year's lunch menu|A math test",
      "Which tone fits a celebration of a team win?|Proud and cheerful|Silent|Gloomy"
    ]),
    SC("Dialogue aloud", "💬", "When telling a story aloud, dialogue makes characters real. Change your voice a little for each speaker, use short lines, and use pauses. You don't have to say 'he said' every time if listeners can tell who speaks by your voice.", "Short lines, distinct voices, pauses.", "'Where are you going?' (high, curious) 'To the lake!' (low, quick).", [
      "Dialogue helps stories feel...|Real|Shorter|Quiet",
      "To show two speakers you can...|Change your voice slightly|Say nothing|Read faster",
      "Short lines in dialogue help listeners...|Follow who is talking|Get lost|Sleep",
      "A pause after a surprising line...|Lets it land|Ruins it|Is wrong",
      "You may skip 'he said' when...|Your voice shows who speaks|You forget|Never",
      "Which is better for a sleepy character?|Slow, low voice|Fast, sharp voice|Shout",
      "Too many voice changes can...|Confuse listeners|Help always|Be silent",
      "Dialogue is the words...|Characters say|Narrator thinks|Title says"
    ]),
    SC("Questions or statements?", "↗️", "Pitch is how high or low your voice is. Rising pitch at the end of a sentence can sound like a question, even when it is a statement. If every sentence rises, you may sound unsure. Let statements fall at the end, and rise for real questions.", "Fall for facts, rise for questions.", "'We won the game.' (falls) 'We won the game?' (rises).", [
      "A question usually ends with a pitch that...|Rises|Falls always|Stays silent",
      "A firm statement usually ends with a pitch that...|Falls|Rises|Stays high",
      "If every sentence rises, you may sound...|Unsure|Confident|Loud",
      "Pitch means how...|High or low your voice is|Fast you talk|Long you speak",
      "Which sentence would likely fall at the end?|The meeting starts at noon|Is it noon|Shall we go",
      "To sound sure when giving a name you should...|Let your pitch fall|Let your pitch rise|Mumble",
      "Practice by recording and listening for...|Rising endings|Jokes|Posture",
      "A real question at the end of an interview should...|Rise|Fall flat|Be whispered"
    ]),
    SC("What was left out?", "🕳️", "Careful listeners ask not only what was said but what was left out. Did the speaker mention costs, other views, or where the data came from? An omission can change the whole picture. Ask: whose voice is missing?", "Look for missing facts, costs and voices.", "A talk about a new road that never mentions the homes it will remove has left something out.", [
      "An omission is something...|Left out|Added in|Repeated",
      "A careful listener asks about missing...|Facts and voices|Pages|Pens",
      "A talk on a new mall that never mentions traffic may have...|Left out important information|Said too much|Been perfect",
      "Asking 'whose voice is missing?' helps you find...|Other points of view|Spelling errors|Volume levels",
      "Which question is a good listening question?|What might the speaker be leaving out?|What color is the podium?|Can I leave?",
      "Leaving out costs and risks can...|Change the picture|Never matter|Help clarity",
      "Where data came from is...|Important to know|Never needed|A secret",
      "A balanced report includes...|More than one side|One side|No side"
    ]),
    SC("Speak at a town meeting", "🏘️", "Many communities hold public meetings where people can speak. To give testimony: sign up if needed, state your name only if the rules and a trusted adult agree, say your position first, give one or two strong reasons, stay within the time limit, and thank the board. Always do this with a trusted adult's help, and never share private information.", "Position first, reasons next, thanks last, adult nearby.", "'I support a crosswalk at Maple Street because cars pass quickly near the school. Thank you.'", [
      "At a public meeting you should start with...|Your position|A joke only|Your address",
      "Time limits in public speaking are meant to be...|Respected|Ignored|Doubled",
      "You should speak at a public meeting with...|A trusted adult's help|Nobody knowing|Strangers online",
      "Sharing private details like your address is...|Not a good idea|Required|Helpful always",
      "Which is a clear position?|I support a crosswalk at the school|It is a thing|Maybe",
      "A strong closing is to...|Thank the board|Argue|Walk out",
      "Giving one or two strong reasons is better than...|A rambling list|Evidence|Politeness",
      "Public speaking meetings let citizens...|Share their views|Cut the line|Hide"
    ]),
    SC("Talk it through", "🕊️", "In a conflict conversation, take turns. Each person says what happened, how it felt, and what they need. Listen without interrupting, repeat back what you heard, then look for a fix both can accept. Stay on the problem, not the person.", "Turns, feelings, needs, then a shared fix.", "'When the plan changed without me, I felt left out. I need to be told early.'", [
      "In a calm conflict talk, you take...|Turns|Sides|Seats only",
      "A good statement includes what happened, how you felt, and...|What you need|Who is worst|The weather",
      "Repeating back what you heard shows you...|Listened|Won|Gave up",
      "Stay on the problem, not the...|Person|Topic|Clock",
      "Interrupting during a conflict talk...|Makes it harder|Helps|Is required",
      "Which line is calm and clear?|I felt left out when plans changed|You always ruin things|Whatever",
      "The goal is a fix that is...|Acceptable to both|Only for you|Silent",
      "If feelings get too strong you can...|Take a break and return|Shout|Quit forever"
    ]),
    SC("Spoken media tricks", "📻", "Podcasts and videos can include sponsor messages. Listen for 'brought to you by' and think about why the host recommends something. Also notice dramatic music, cliffhanger lines and urgent voices that push you to keep listening or buy. Stay curious and in control.", "Ask who pays and what they want you to do.", "A host says 'my sponsor makes the best snacks' right after the ad break begins.", [
      "A sponsor is a company that...|Pays to be mentioned|Writes the news|Plays music",
      "'Brought to you by' signals...|A sponsor message|The ending|A quiz",
      "A host recommending a sponsor's product may be...|Paid or encouraged to do so|Always neutral|Silent",
      "Dramatic music can make a message feel...|More urgent|Quieter|Exact",
      "A smart listener asks...|Who benefits from this?|What shade is it?|When is lunch?",
      "A cliffhanger line is meant to make you...|Keep listening|Stop|Sleep",
      "Urgent phrases like 'act now' often try to...|Push a quick decision|Share facts|Teach calmly",
      "Staying in control means you choose...|With a clear head|On impulse|When pushed"
    ]),
    SC("Interview a local expert", "🧑‍🏫", "To learn from an expert, plan open questions, do some homework first, listen closely, and ask follow-ups like 'Can you give an example?' Always arrange the interview with a trusted adult's help, and thank the expert.", "Prepare, ask open questions, follow up, thank.", "'What surprised you most in your job? Can you give an example?'", [
      "Before interviewing, you should...|Do some homework|Skip planning|Memorize nothing",
      "An open question starts with...|How or why|Is or are|Yes",
      "A follow-up question might be...|Can you give an example?|Okay bye|Yes or no?",
      "Arrange an interview with...|A trusted adult's help|A stranger online|No one",
      "After the interview you should...|Thank the expert|Ignore them|Share their private details",
      "Listening closely helps you ask...|Better follow-ups|Fewer notes|No questions",
      "Which question gets a longer answer?|What was your hardest project, and why?|Did you like it?|Is it nice?",
      "Notes during an interview help you...|Quote accurately|Hide|Hurry"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 13: lvl(13, L13), 14: lvl(14, L14), 15: lvl(15, L15) });
})();
