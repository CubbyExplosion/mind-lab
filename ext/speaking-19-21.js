// ext/speaking-19-21.js  Mind Lab Speaking & Listening, levels 19-21 (60 lessons)
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

  // ================= LEVEL 19 =================
  const L19 = [
    SC("Kairos: the right moment", "⏰", "Kairos is the Greek idea of the right moment. The same message can land well or badly depending on when you say it. A good speaker asks: is this the time, and is this audience ready to hear it?", "Ask whether the timing helps or hurts the message.", "A plea to join the cleanup crew works better right after a storm than in the middle of a holiday party.", [
      "Kairos means...|Choosing the fitting moment|Choosing the loudest voice|Choosing the longest speech",
      "Which is a kairos question?|Is now the right time for this message?|How many slides do I have?|What color is the podium?",
      "You want a later bedtime. Which timing shows good kairos?|Ask when everyone is calm and rested|Ask during an argument|Ask while the adult is rushing out the door",
      "Why can a great speech fail at the wrong time?|The audience may not be ready to listen|The words become false|The facts change shape",
      "A class is stressed the day before a big test. A fundraiser pitch is best...|Held until after the test|Made right then|Shouted at the start of class",
      "A news event makes your topic suddenly important. Using that is...|Good use of kairos|A mistake|Always unfair",
      "Kairos is mostly about...|Timing and circumstances|Facts only|Volume only",
      "Which speaker ignores kairos?|One who jokes at a moment of sad news|One who waits for a calm moment|One who checks the mood first"
    ]),
    SC("Deductive and inductive", "🧩", "Deductive reasoning starts with a general rule and applies it to a case. Inductive reasoning starts with many cases and builds a general pattern. Deduction can be certain if its rules are true. Induction gives a likely, not a certain, conclusion.", "Ask: does it go from a rule to a case, or from cases to a pattern?", "Rule to case: all mammals breathe air, a whale is a mammal, so a whale breathes air. Cases to rule: the sun rose every morning I remember, so it will probably rise tomorrow.", [
      "Going from a general rule to a specific case is...|Deductive reasoning|Inductive reasoning|Guessing",
      "Going from many examples to a general pattern is...|Inductive reasoning|Deductive reasoning|Rewording",
      "Every bird I have seen at this feeder has a beak, so all birds probably have beaks. This is...|Inductive|Deductive|Circular",
      "All squares have four sides. This shape is a square. So it has four sides. This is...|Deductive|Inductive|A red herring",
      "Which kind of conclusion is only 'probably' true?|Inductive|Deductive with true rules|A definition",
      "A speaker lists five stores that closed and says shops are struggling. That is...|Inductive|Deductive|Neither",
      "Deductive arguments can be certain when...|The starting rules are true and the logic is valid|The speaker is loud|There are many examples",
      "A weakness of induction is that...|New cases may break the pattern|It uses rules|It can never be useful"
    ]),
    SC("Syllogisms", "🔗", "A syllogism has two premises and a conclusion. 'All mammals are warm-blooded. A dolphin is a mammal. So a dolphin is warm-blooded.' If the premises are true and the logic is valid, the conclusion must be true. Check both the facts and the form.", "Check the premises first, then check whether the conclusion really follows.", "All rivers flow downhill. This stream is a river. So this stream flows downhill. The form is valid.", [
      "A syllogism has...|Two premises and a conclusion|One claim only|Three questions",
      "The conclusion of 'All fish swim. A trout is a fish.' is...|A trout swims|A trout is a mammal|All swimmers are fish",
      "'All dogs bark. Rex barks. So Rex is a dog.' This is...|Invalid, other animals bark too|Perfectly valid|A definition",
      "A valid argument with a false premise can still have a...|False conclusion|Perfect truth|Silent ending",
      "Which premise pair gives a valid conclusion about Mia?|All swimmers wear goggles; Mia is a swimmer|Some swimmers wear goggles; Mia wears goggles|Goggles are blue",
      "To test a syllogism you check...|Whether the premises are true and the form is valid|Only how long it is|Only the first word",
      "'All birds have feathers. A penguin is a bird.' What follows?|A penguin has feathers|A penguin flies|Feathers make birds",
      "'Some athletes are students. Ben is an athlete.' Can we say Ben is a student?|No, only that he might be|Yes, for sure|Yes, he is a coach"
    ]),
    SC("Equivocation", "🎭", "Equivocation is using a word in two meanings during one argument, so it seems to prove something it does not. 'Nothing is better than a good friend. A sandwich is better than nothing. So a sandwich is better than a good friend.' The word 'nothing' switches meaning.", "Underline the key word and ask if it means the same thing both times.", "'A bank is where you save money. A river has a bank. So you can save money at a river.' The word 'bank' changed meaning.", [
      "Equivocation is...|Shifting a word's meaning mid-argument|Repeating a word for rhythm|Whispering a key word",
      "'Light is easy to carry. Cheese is a light food. So cheese is easy to carry.' What goes wrong?|'Light' switches meaning|The cheese is heavy|Nothing, it is valid",
      "The fix for equivocation is to...|Define the word and keep it steady|Use bigger words|Avoid all words",
      "Which sentence uses a word with two meanings to trick?|A pen is a place for pigs; I write with a pen; so I write with a pigpen|The pen is blue|I like pens",
      "Why does equivocation fool people?|The word looks the same each time|It uses real numbers|It is very short",
      "Spotting it begins with finding...|The key term the argument depends on|The loudest sentence|The last sentence",
      "'Only people who are critical get good grades; she criticized the cafeteria; so she gets good grades.' This...|Switches the meaning of 'critical'|Is solid|Uses numbers",
      "A speaker who clarifies 'by fair I mean equal, not pretty' is...|Preventing equivocation|Causing it|Changing the topic"
    ]),
    SC("Non sequitur", "↗️", "Non sequitur is Latin for 'it does not follow.' The conclusion has no real connection to the reasons given. 'She is a great singer, so she will be a great mayor.' Singing and governing are different skills.", "Ask: do the reasons actually lead to this conclusion?", "'He owns a fast car, so he must be honest.' Speed has nothing to do with honesty.", [
      "Non sequitur means...|It does not follow|It follows closely|It is repeated",
      "Which is a non sequitur?|He is tall, so he is good at chess|He studied, so he did well|She trained, so she ran faster",
      "A non sequitur's problem is that the reason...|Is unconnected to the conclusion|Is too long|Is too polite",
      "'The team has great uniforms, so it will win.' This is...|A weak link between reason and conclusion|A strong proof|A definition",
      "How do you test whether a conclusion follows?|Ask if the reasons truly support it|Count the words|Check the tone of voice",
      "Which conclusion follows from 'It has rained all week and the field is flooded'?|Practice may be moved indoors|The coach is unfair|Cats are happy",
      "'She writes great essays, so she must be a good swimmer.' This is a...|Non sequitur|Valid deduction|Rule of three",
      "A speaker can avoid non sequiturs by...|Linking each reason clearly to the claim|Speaking faster|Adding jokes"
    ]),
    SC("Whataboutism", "↪️", "Whataboutism answers a criticism by pointing at someone else's faults instead of answering. 'Why were you late?' 'What about her? She is late all the time!' Other people's mistakes do not erase yours, and the real question stays unanswered.", "Ask whether the answer deals with the original criticism or dodges it.", "'You littered.' 'But the other group littered more!' The original point was never answered.", [
      "Whataboutism responds to criticism by...|Pointing at other people's faults|Admitting the error|Asking a clarifying question",
      "Asked about a broken promise, a speaker says 'What about when you broke yours?' This is...|Whataboutism|A strong rebuttal|An apology",
      "Does someone else's mistake excuse yours?|No, the issue still needs an answer|Yes, always|Only on weekdays",
      "A fair way to respond to criticism is to...|Address it directly|Change the topic to another person|Raise your voice",
      "Another name for the dodge is...|Deflection|Rhyme|Hyperbole",
      "A listener says 'That does not answer my question.' This is...|A fair call to refocus|Rude|A compliment",
      "Which reply avoids whataboutism?|You are right, I missed the deadline and here is my plan|But what about the other team?|Everybody does it",
      "Raising a related point can be fine if it...|Also answers the original criticism|Replaces the answer completely|Is louder"
    ]),
    SC("Genetic fallacy", "🌱", "The genetic fallacy judges an idea by where it came from instead of whether it is true. 'That fact came from a kid, so it is wrong.' Origins can be a reason to double-check, but an idea has to be tested on its own merits.", "Ask if the claim is being judged on its evidence or only on its source.", "'That recipe is from an old cookbook, so it cannot be good.' The age of the book does not decide the taste.", [
      "The genetic fallacy judges a claim by...|Its source or origin alone|Its evidence|Its logic",
      "'The idea came from a younger student, so ignore it.' This is...|A genetic fallacy|Careful testing|A fair rebuttal",
      "How should you judge an idea fairly?|By its evidence and reasoning|By who said it|By how loud it was",
      "Checking a source's track record before trusting a claim is...|A reasonable first step, not the final word|A fallacy always|Banned in debate",
      "'That medicine was found in a plant, so it cannot be real science.' This is...|A genetic fallacy|Valid logic|An alliteration",
      "A true fact from a person you dislike is still...|True|False|Illegal",
      "Which response avoids the fallacy?|Let us check the data behind that claim|I do not like where it came from|That sounds old",
      "A speaker who dismisses a study only because a company paid for it...|Should also check the study's methods|Has proven it wrong|Cannot be questioned"
    ]),
    SC("Confirmation bias", "🔍", "Confirmation bias is our habit of noticing and remembering what agrees with us and ignoring what does not. As a listener, it can make you hear only the parts you already like. Good listeners deliberately look for evidence that could change their mind.", "Think about whether the listener is seeking truth or only agreement.", "If you believe a team is unlucky, you remember every loss and forget the wins. That is confirmation bias at work.", [
      "Confirmation bias is favoring information that...|Matches what you already think|Surprises you|Comes from strangers",
      "A good defence against it is to...|Look for evidence against your own view|Listen only to friends|Avoid all debate",
      "A listener who tunes out every point against their side is showing...|Confirmation bias|Active listening|Paraphrasing",
      "Which question fights confirmation bias?|What would change my mind?|How can I prove them wrong quickly?|Who agrees with me?",
      "Why is it a problem in a debate?|You may miss strong points from the other side|It makes you speak too softly|It shortens speeches",
      "Reading only websites that agree with you is...|Feeding confirmation bias|Wide research|A good habit",
      "Bias like this is usually...|Natural, so we must watch for it|Rare and obvious|Only found in adults",
      "Which listener practices fairness?|One who restates the opposing point before answering|One who hears only the first sentence|One who looks at the clock"
    ]),
    SC("Listening for assumptions", "🧱", "An assumption is something a speaker takes for granted without proving it. 'We should switch to online voting because everyone has internet.' The hidden assumption is that everyone has internet. Good listeners spot assumptions and ask whether they are true.", "Ask what must be true for the argument to work.", "'We will win because our rival is tired.' The assumption is that tired teams play worse and the rival really is tired.", [
      "An assumption is a belief the speaker...|Takes for granted without proof|Proves with data|Quotes from an expert",
      "'We should build a skate park because everyone loves skating.' The assumption is...|Everyone loves skating|Parks cost money|Skating is hard",
      "A good listener asks about an assumption by saying...|What makes you sure that is true?|Stop talking|That is boring",
      "An unstated assumption is also called...|A hidden premise|A rhyme|A hook",
      "'Since it is sunny, the picnic will be fun.' The assumption is...|Sunny weather makes picnics fun|It is Friday|Food is tasty",
      "If the assumption is false, the argument...|Becomes weak|Becomes stronger|Becomes a poem",
      "Why spot assumptions?|They show where an argument may break|They make speeches shorter|They make people agree",
      "A speaker can strengthen an argument by...|Backing up the assumption with evidence|Hiding it|Repeating it louder"
    ]),
    SC("Cornell notes", "📝", "Cornell notes split a page into a wide notes column, a narrow cue column, and a summary at the bottom. During a talk you write notes on the right. After it, you add cue words or questions on the left and a short summary below. It turns notes into a study tool.", "Picture the page: which part holds notes, cues, and summary?", "While listening to a science talk you write facts on the right. Afterwards you add the cue 'What causes tides?' on the left and a two-line summary at the bottom.", [
      "In Cornell notes, the wide column is for...|Notes taken during the talk|Cues and questions|The title only",
      "The narrow column is for...|Cue words or questions|Pictures only|Page numbers",
      "The summary goes...|At the bottom|At the top of the cue column|On the back of the page",
      "When do you add cues?|After the talk, while reviewing|Never|Before the talk starts",
      "Why write a summary in your own words?|It checks that you understood|It fills space|It makes notes longer",
      "Cue questions help you later by...|Letting you quiz yourself|Hiding the notes|Replacing the notes",
      "While the speaker talks, you should...|Write key ideas, not every word|Copy every word|Draw only",
      "A good note-taker reviews notes...|Soon after the talk|A year later|Never"
    ]),
    SC("Enunciation", "👄", "Enunciation means shaping each sound with your lips, tongue and jaw so words come out clear. Mumbled endings, swallowed syllables and a tight jaw blur your message. Tongue twisters and slow, over-exaggerated practice build clear speech.", "Think about which part of the mouth or word the problem is in.", "Practice 'red leather, yellow leather' slowly first, then at speed, keeping every consonant crisp.", [
      "Enunciation is...|Shaping each sound clearly|Speaking as softly as possible|Speaking as fast as possible",
      "Which helps practice enunciation?|Tongue twisters said slowly then faster|Whispering without moving the mouth|Speaking with a clenched jaw",
      "A speaker says 'wanna' and 'gonna' in a formal talk. A clearer choice is...|Want to and going to|Wun and gun|Skipping the words",
      "Dropping the ends of words, like saying 'goin' for 'going', makes speech...|Less clear|Clearer|Louder",
      "Opening your mouth more when you talk helps...|Sounds come out clearly|You forget words|You sing",
      "Exaggerating mouth movements during practice...|Builds habits that stay clear on stage|Is only for actors|Wastes breath",
      "Which part often gets swallowed when someone mumbles?|Word endings|Word beginnings only|Punctuation",
      "Clear enunciation matters most when...|The room is big or the audio is poor|Nobody is listening|You are alone"
    ]),
    SC("Vocal habits", "🗣️", "Vocal habits are patterns that sneak into speech: rising pitch at the end of statements (uptalk), trailing off, mumbling, or a flat monotone. They can make you sound unsure even when you are certain. Record yourself, notice the habit, and practice ending statements with a downward, steady tone.", "Listen for how the pitch moves at the end of a sentence.", "'I recommend the new schedule' should end on a steady, falling pitch. A rising pitch sounds like a question.", [
      "Uptalk is...|Ending statements with a rising pitch|Speaking extra slowly|Reading loudly",
      "A rising pitch at the end of a statement can make a speaker sound...|Unsure|Very certain|Angry",
      "Trailing off at the end of sentences makes listeners...|Miss your last words|Remember more|Clap",
      "A good way to find your vocal habits is to...|Record yourself and listen|Speak louder|Avoid talking",
      "A monotone voice is one that...|Stays on one pitch|Changes pitch a lot|Is always loud",
      "For a confident statement, end with...|A steady falling tone|A question lift|A whisper",
      "Why change a habit slowly?|Habits take repeated practice to replace|Habits cannot change|It saves breath",
      "Which fixes trailing off?|Finish the sentence with full breath and energy|Stop mid-sentence|Whisper the end"
    ]),
    SC("The power of silence", "🤫", "Silence is a tool. A pause before a key point builds attention. A pause after it gives listeners time to think. Many nervous speakers rush to fill every gap, but planned silence makes you sound confident and makes your words land harder.", "Think about what a pause gives the listeners.", "Say 'The answer is...' then pause for two seconds before the reveal. Listeners lean in.", [
      "A pause before a key point...|Builds anticipation|Shows you forgot|Wastes time",
      "A pause after a key point lets listeners...|Absorb it|Leave|Interrupt",
      "Nervous speakers often...|Rush to fill every silence|Use too many pauses|Never speak",
      "A planned pause usually lasts about...|One to three seconds|Ten minutes|No time at all",
      "Filling silence with 'um' and 'like' makes a speaker sound...|Less confident|More polished|Quieter",
      "After asking a tough question to the audience, you should...|Wait so people can think|Answer at once|Change the slide",
      "Silence in a speech is best when it is...|Planned and purposeful|Random|Very long",
      "Which shows good use of silence?|Pausing before the main conclusion|Pausing mid-word|Pausing for a minute"
    ]),
    SC("Pace in words per minute", "⏱️", "Most people speak comfortably at about 120 to 160 words per minute. Too fast and listeners cannot keep up; too slow and they drift. Slow down for hard ideas and speed up a little for exciting parts. Time a practice run to know your pace.", "Think about a comfortable middle range, then adjust for the idea.", "A 3-minute talk at 140 words per minute needs about 420 words, since 3 times 140 is 420.", [
      "A comfortable speaking pace is about...|120 to 160 words per minute|400 words per minute|20 words per minute",
      "A 2-minute talk at 150 words per minute needs about...|300 words|150 words|600 words",
      "You should slow down when...|Explaining a hard idea|Reading the title|Saying thanks",
      "Speaking too fast makes it hard for listeners to...|Keep up|Hear the room|Clap",
      "How can you learn your pace?|Time a practice run|Guess|Ask the clock",
      "A 5-minute talk at 120 words per minute is about...|600 words|240 words|1,200 words",
      "Slightly faster speech suits...|Exciting or lively moments|Safety instructions|Complex definitions",
      "A speaker who is always slow risks...|Losing attention|Being too clear|Speaking too well"
    ]),
    SC("Chiasmus", "🪞", "Chiasmus reverses the order of two parts in a mirror pattern: A-B, B-A. 'Ask not what your team can do for you, ask what you can do for your team.' It is memorable because the ideas swap places and make a point about their relationship.", "Look for two ideas that appear in order and then in reverse.", "'We do not live to eat, we eat to live.' The words eat and live trade places.", [
      "Chiasmus repeats ideas in...|Reverse order|The same order|Alphabetical order",
      "Which is a chiasmus?|Work hard, play hard, hard play, hard work|Fresh and fast and fine|Slow and steady wins the race",
      "'Never let a fool kiss you or a kiss fool you' is a chiasmus because...|The key words swap places|It has three parts|It rhymes",
      "The pattern of chiasmus can be written as...|A-B-B-A|A-A-A|A-B-C",
      "Why do speakers use chiasmus?|It makes a line catchy and memorable|It adds numbers|It makes talks longer",
      "'Quality is not an accident; accidents ruin quality' is...|A chiasmus-style swap|A list of three|A question",
      "Chiasmus is closest to which device?|Reversal of parallel parts|Sound repetition|Exaggeration",
      "Which is NOT a chiasmus?|Fast cars, fast boats, fast planes|Eat to live, not live to eat|Ask not what you can take, but what you can give"
    ]),
    SC("Strong verbs", "💪", "Strong verbs carry action in one word: 'sprinted' instead of 'ran very fast.' In speech, strong verbs make you sound clear and keep sentences short for the ear. Replace weak verbs plus adverbs with one precise verb.", "Find a verb that already carries the extra meaning.", "'She walked quickly' becomes 'She hurried.' One strong verb replaced two words.", [
      "A strong verb is one that...|Carries a precise action|Needs many adverbs|Is the longest word",
      "Which is the strongest replacement for 'looked at closely'?|Examined|Saw|Did a look",
      "'The crowd made a loud noise' can become...|The crowd roared|The crowd was loud|The crowd did noise",
      "Replacing 'said angrily' with a single verb gives...|Snapped|Said|Spoke some",
      "Strong verbs help speech because they...|Keep sentences short and vivid|Add filler|Slow the pace",
      "Which sentence uses the strongest verb?|The storm battered the coast|The storm was bad to the coast|The storm went at the coast",
      "'Walk slowly and quietly' is best tightened to...|Creep|Walk|Go",
      "Too many 'is', 'was' and 'be' verbs can make speech...|Flat|Sharper|Faster"
    ]),
    SC("I, you, we", "👥", "Pronouns shape the relationship with listeners. 'I' shares your own view or story. 'You' speaks straight to the listener but can sound blaming. 'We' includes everyone and builds teamwork. Pick the pronoun that matches your purpose.", "Ask whom each pronoun includes or points at.", "'You never clean up' blames. 'We could all clean up' invites teamwork.", [
      "Which pronoun builds a sense of teamwork?|We|You|They",
      "Which pronoun can sound like blaming?|You|We|I",
      "'I' is best for...|Sharing your own view or experience|Speaking for a whole nation|Pointing at others",
      "A coach says 'We can do this.' The effect is...|Includes everyone|Excludes the team|Blames a player",
      "'They always get it wrong' puts distance between...|The speaker and a group|The speaker and the speaker|Two friends",
      "To make a request less blaming, use...|I-statements|You-statements|Orders only",
      "A speaker who says 'we' for a group they are not part of may...|Seem to claim too much|Be perfectly accurate always|Lose their voice",
      "Which sentence addresses the audience directly?|You can try this tonight|We hope it works|They tried it last night"
    ]),
    SC("Motivated sequence", "🪜", "Monroe's motivated sequence is a five-step plan for persuasion: get attention, show the need (the problem), satisfy the need (your solution), visualize the results, then call to action. It follows how people decide to act.", "Remember the order: attention, need, satisfy, visualize, action.", "Attention: a surprising fact about lunch waste. Need: tons wasted. Satisfy: a share table. Visualize: less waste and more food for others. Action: sign up to help.", [
      "The first step of the motivated sequence is...|Attention|Action|Visualization",
      "The last step is...|Call to action|Attention|Need",
      "Showing the problem is the...|Need step|Visualization step|Attention step",
      "Describing the future if your plan works is...|Visualization|Need|Satisfaction",
      "Presenting your solution is the...|Satisfaction step|Attention step|Action step",
      "How many steps does the sequence have?|Five|Two|Nine",
      "A story that makes people care about the problem is best placed in...|The attention step|The call to action|The credits",
      "'Sign the petition today' belongs to the...|Action step|Need step|Attention step"
    ])
  ];

  // ================= LEVEL 20 =================
  const L20 = [
    SC("Primacy and recency", "🥇", "Listeners remember the beginning (primacy) and the end (recency) of a talk best, and the middle least. Put your biggest idea first, finish with your strongest point, and use signposts and repetition to keep the middle alive.", "Think about which parts of a talk stick in memory.", "In a 10-minute talk, state your main idea in minute one and restate it in the closing minute.", [
      "Primacy is the effect of remembering...|The beginning|The middle|Nothing",
      "Recency is the effect of remembering...|The end|The start only|The title",
      "Which part of a talk is easiest to forget?|The middle|The very end|The first sentence",
      "To use primacy, a speaker should...|Open with a strong main idea|Hide the point|Start with filler",
      "To use recency, a speaker should...|End with the strongest point|Fade out softly|Add a new topic last",
      "What helps the forgettable middle?|Signposts and repetition|Silence|Fewer facts",
      "A great closing line matters because...|Listeners remember the last thing best|Nobody listens|It is the shortest part",
      "Where would you put your most important statistic?|Near the start or the end|Hidden in the middle|Nowhere"
    ]),
    SC("Problem, cause, solution", "🛠️", "This structure explains a problem, why it happens, and how to fix it. Naming the cause matters: a solution that ignores the cause will not work. Strong talks show the cause and link the solution to it directly.", "Match each part to its job: what, why, fix.", "Problem: students are tired. Cause: late-night screen time. Solution: a no-devices rule after 9 pm.", [
      "In problem-cause-solution, the cause explains...|Why the problem happens|How to celebrate|Who to blame",
      "The solution should be tied to...|The cause|The title|The date",
      "Plants in the school garden keep dying. Which is a cause?|Nobody waters them on weekends|Plants are green|The garden is large",
      "Which is the solution to the weekend watering cause?|A weekend watering rota|Buying more gnomes|Painting the fence",
      "Why name the cause before the solution?|A fix that ignores the cause may fail|It makes the talk longer|It is optional and useless",
      "The first part to present is usually...|The problem|The call to action|The thank you",
      "Which is a problem statement?|Many students arrive late to first period|Let us buy bikes|Because buses are slow",
      "A speaker who skips the cause risks...|Offering a solution that misses the point|Being too clear|Being too short"
    ]),
    SC("An idea worth sharing", "💡", "Talks in the style of short, big-idea talks are built around one clear idea. Ask: what is the one thing I want the audience to remember or do? Then choose stories, facts and visuals that serve that idea and cut the rest.", "Check every part against the single central idea.", "Idea: sleep improves learning. A story about an exam-week nap, one study result, and one tip all serve that idea.", [
      "A big-idea talk is built around...|One clear central idea|Ten equal ideas|No idea",
      "To keep a talk focused, you should...|Cut anything that does not serve the idea|Add more topics|Speak faster",
      "A good test question is...|What is the one thing I want them to remember?|How long can I talk?|How many slides can I add?",
      "Which is the clearest central idea?|Kindness spreads when we model it|Many things about school|Stuff that happens",
      "A story in such a talk should...|Support the main idea|Stand alone, unrelated|Replace the idea",
      "A talk with too many ideas often leaves listeners...|Remembering little|Remembering all|Silent",
      "An idea worth sharing is usually...|Specific and useful or surprising|Vague|Hidden",
      "The closing of such a talk often returns to...|The central idea|A new topic|A joke about nothing"
    ]),
    SC("Memory palace", "🏰", "The memory palace (method of loci) links each point of your talk to a place you know well, like rooms in your home. When speaking, you walk through the places in your mind and each one reminds you of a point. Vivid images make it stick.", "Think of the order of places you already know by heart.", "Point 1 (hook) sits at the front door, point 2 (evidence) on the sofa, point 3 (call to action) in the kitchen.", [
      "A memory palace links speech points to...|Familiar places|Random numbers|Slides only",
      "Another name for the method is...|Method of loci|Method of tone|Method of pitch",
      "Why use vivid, odd images?|They are easier to remember|They are quieter|They are shorter",
      "In the method, the order of the rooms gives...|The order of your points|A rhyme|The volume",
      "The place you choose should be...|Very familiar to you|A place you have never seen|A moving car",
      "To recall your talk, you...|Mentally walk through the places|Read the dictionary|Skip rooms",
      "This technique is most useful for...|Remembering the order of ideas|Fixing your posture|Choosing a microphone",
      "If you have five points, you need about...|Five places|One place only|Fifty places"
    ]),
    SC("Cold open", "🎬", "A cold open starts the talk right in the middle of something interesting, with no greeting or warm-up: a scene, a surprising sentence or a bold question. After it hooks attention, you then explain who you are and what the talk covers.", "A cold open begins before introductions.", "'Three seconds before the buzzer, the ball left my hands.' Then, after the story, 'Today I want to talk about pressure.'", [
      "A cold open begins with...|Action or a hook, not a greeting|A long thank-you|A list of rules",
      "Which is a cold open?|The lights went out and everyone froze|Hello, my name is Sam and today I will speak|Thank you all for being here",
      "After a cold open you usually...|Explain who you are and your topic|Stop|Apologize",
      "The main goal of a cold open is...|Grab attention at once|Waste time|Hide the topic",
      "A risk of a cold open is that it...|May confuse if never connected to the topic|Is too honest|Is silent",
      "Which line is least like a cold open?|Good morning, thank you for having me|Imagine a door that never opens|The bridge shook beneath my feet",
      "A cold open works best when it is...|Short and relevant|Long and random|Mumbled",
      "To make a cold open connect, you...|Tie it back to your main idea|Never mention it again|Use a different language"
    ]),
    SC("Anecdote or example", "📖", "An anecdote is a short true story from real life, usually personal. An example is any case that illustrates a point and may be general. Anecdotes build feeling and connection, while examples give clear support. Strong talks use both, and say whether the story is typical.", "Ask: is it a brief story with people in it, or just an illustration of the point?", "Anecdote: 'Last winter my neighbor shoveled our walk before dawn.' Example: 'Neighbors often help in snowstorms.'", [
      "An anecdote is...|A short true story|A statistic|A rhyme",
      "Which is an anecdote?|Last spring, my team lost, and our coach stayed to help us pack up|Teams often lose|Sports have rules",
      "Anecdotes mainly help build...|Connection and feeling|Charts|Silence",
      "An anecdote alone is weak proof because...|One story may not be typical|Stories are always false|It is too long",
      "A general illustration of a point is...|An example|An anecdote|A pause",
      "Strong talks often...|Pair stories with data|Use only stories|Skip both",
      "A fair speaker will say a story is...|One case, not the whole picture|Proof for everything|A law of nature",
      "Which opener is most anecdotal?|When I was nine, I got lost in a market|Lost children are a problem|Markets are busy"
    ]),
    SC("Extended metaphor", "🌉", "An extended metaphor continues one comparison through several sentences or a whole talk. 'Our school is a ship: the teachers steer, the crew works together, and storms test us.' Keep it consistent and simple, so the comparison clarifies instead of confusing.", "Check whether the comparison keeps going and stays consistent.", "'Learning is a garden: seeds are questions, practice is water, and patience is sunshine.'", [
      "An extended metaphor...|Continues one comparison for a while|Is a single word|Is a statistic",
      "Which is an extended metaphor?|Life is a road with bends, hills and rest stops|Her voice was loud|He ran fast",
      "Extended metaphors help listeners by...|Making an idea picture-like|Hiding the idea|Adding noise",
      "A metaphor that mixes ships and gardens at once is...|Confusing|Perfect|Required",
      "In 'a team is an engine', the pistons might stand for...|Players working together|The scoreboard|The weather",
      "A literal statement says...|Exactly what is meant|A hidden comparison|A joke",
      "When using an extended metaphor, you should...|Keep the comparison consistent|Change it every line|Explain nothing",
      "Which part of 'an argument is a building' makes sense?|Evidence is the foundation|Evidence is the weather|Evidence is a sofa cushion"
    ]),
    SC("Assertion and evidence slides", "🖥️", "Instead of a title plus bullet list, an assertion-evidence slide has a full-sentence claim as the headline and a picture, chart or diagram below as proof. You then explain it aloud. It helps listeners see the point instead of reading walls of text.", "Think: sentence on top, visual proof below.", "Headline: 'Sleep helps memory.' Below it, a bar chart comparing scores after 8 hours versus 4 hours of sleep.", [
      "An assertion-evidence slide has a headline that is...|A full-sentence claim|A single word|Blank",
      "The main body of such a slide is usually...|A visual that supports the claim|Paragraphs of text|A long list of bullets",
      "Compared to bullet slides, this style...|Reduces reading and shows proof|Adds text|Hides the claim",
      "The speaker should...|Explain the visual out loud|Read the slide word-for-word|Turn away silently",
      "Which headline is an assertion?|Recycling cuts waste in our school|Recycling|Waste data",
      "A good visual for this slide is...|A relevant chart or photo|A random clip|Nothing",
      "Why avoid dense text on slides?|Listeners read instead of listen|It is too colorful|It is illegal",
      "The visual should...|Directly support the headline claim|Be decoration only|Hide the claim"
    ]),
    SC("Honest visuals", "📊", "Charts can mislead. A bar chart whose axis starts at a high number makes small differences look huge. Pie slices that do not add to 100 percent, cropped data and unlabeled axes all trick listeners. When you present, show the full scale and label everything.", "Check the axis start, labels and totals.", "A chart with the axis starting at 90 makes scores of 92 and 95 look very different. Starting at 0 shows they are close.", [
      "A bar chart whose axis starts high can...|Exaggerate small differences|Show true proportions|Reduce bias",
      "An honest chart always has...|Labeled axes|Hidden axes|Only colors",
      "Pie slices should add up to...|100 percent|50 percent|200 percent",
      "Cropping out part of the data to hide a trend is...|Misleading|Honest|Required",
      "When describing a chart aloud, mention...|What the axes and units are|Nothing about it|Only the colors",
      "If a chart starts at 50 instead of 0, you should...|Point that out so people are not misled|Hide it|Make it bigger",
      "A fair chart helps listeners...|See the real size of differences|Be confused|Feel rushed",
      "Which choice makes a chart more honest?|Showing the full scale|Zooming in only on the biggest bar|Removing labels"
    ]),
    SC("Job interview basics", "💼", "In an interview, prepare by learning about the place, practice answers to common questions, arrive a little early, greet people with a firm voice and eye contact, and ask one or two thoughtful questions at the end. Be honest, specific and polite.", "Think about what preparation shows the interviewer.", "Asked 'Why do you want this job at the library?', a prepared answer mentions loving books and helping people find them.", [
      "Before an interview, you should...|Learn about the place|Skip preparation|Hope for luck",
      "Arriving a few minutes early shows...|Respect and reliability|Nervousness only|Nothing",
      "At the end of an interview, it is good to...|Ask a thoughtful question|Leave silently|Argue",
      "When answering, it helps to be...|Honest and specific|Vague|Overly long",
      "How do you greet the interviewer?|Clearly, with eye contact and a polite hello|By looking away|By mumbling",
      "A common interview question is...|Tell me about yourself|What is your password?|Who is your friend?",
      "A good way to practice is to...|Rehearse answers aloud|Memorize nothing|Avoid questions",
      "After an interview, a polite step is to...|Say thank you|Complain|Disappear"
    ]),
    SC("The STAR method", "⭐", "STAR helps you answer 'tell me about a time when...' questions. Situation: set the scene. Task: what you needed to do. Action: what you did. Result: what happened. It keeps your answer short, clear and about your own actions.", "Match each answer part to S, T, A or R.", "S: Our group project was falling behind. T: I needed to organize us. A: I made a task list. R: We finished a day early.", [
      "The S in STAR stands for...|Situation|Speech|Silence",
      "The R in STAR stands for...|Result|Rhythm|Rule",
      "'I made a schedule and shared jobs' is the...|Action|Situation|Result",
      "'The team finished on time' is the...|Result|Task|Action",
      "STAR is useful for answering...|Questions about past experiences|Math questions|Yes-or-no questions",
      "'The group had an argument about the project' sets the...|Situation|Result|Task",
      "'My job was to keep us on schedule' is the...|Task|Result|Situation",
      "A STAR answer should focus on...|What you did|What you wish you did|Other people's mistakes"
    ]),
    SC("Small talk", "☕", "Small talk is light conversation that builds comfort before bigger topics. Good small talk asks open questions ('What got you into robotics?'), listens, shares a little back, and finds common ground. It also includes a graceful way to end the chat.", "Think about questions that invite more than a yes or no.", "Instead of 'Did you like the talk?', ask 'What was the most surprising part for you?'", [
      "A good small talk question is usually...|Open and easy to answer|A yes-or-no interrogation|Very personal",
      "Which is the best opener at an event?|What brought you here today?|Why are you boring?|How much do you earn?",
      "Good small talk includes...|Listening and sharing back|Only talking about yourself|Only asking questions",
      "Finding common ground means...|Discovering shared interests|Arguing|Changing the subject at once",
      "A graceful way to end a chat is...|It was nice talking, I will go say hello to a friend|Walking off mid-sentence|Staring at the floor",
      "A topic to avoid with new acquaintances is...|Anything that may cause conflict or embarrass them|The weather|Hobbies",
      "When someone shares something, a good response is...|A follow-up question|Silence|Your own long story at once",
      "Small talk is useful because it...|Builds comfort and connection|Replaces every other talk|Is required by law"
    ]),
    SC("Assertive, not aggressive", "🛡️", "Assertive speaking states your needs clearly and respectfully. Passive speaking hides them; aggressive speaking attacks. Assertive words are calm, direct and use 'I': 'I need quiet to study; could we talk later?' It respects you and the other person.", "Sort the style: hiding, attacking, or clear and respectful.", "Instead of 'You are so loud!' (aggressive) or silence (passive), say 'I can't concentrate with this noise. Could you lower it?'", [
      "Assertive speech is...|Clear, calm and respectful|Hiding your needs|Attacking the other person",
      "Which statement is assertive?|I would like a turn, please|Give me that or else|Never mind, it is fine (when it is not)",
      "Passive communication usually...|Avoids stating needs|States them with threats|Uses calm facts",
      "Aggressive communication...|Disrespects the other person|Respects both|Uses a gentle tone",
      "A good body stance for assertiveness is...|Steady, upright, calm face|Slouched and silent|Pointing and glaring",
      "A polite way to say no is...|I can't do that, but I can help with something else|You are wrong to ask|No way, ever",
      "Assertive speakers use...|I statements|Blaming labels|Sarcasm",
      "Being assertive means you can...|Say no and stay kind|Never disagree|Always give in"
    ]),
    SC("Say it without blame", "🧭", "Nonviolent communication has four parts: observation (what happened, no judgment), feeling, need, and request. 'When the notes are left out (observation), I feel worried (feeling) because I need things organized (need). Could we put them back (request)?' It lowers defensiveness.", "Match the parts: see, feel, need, ask.", "'When the meeting started late, I felt anxious because I need time to finish. Could we start on time?'", [
      "The four parts begin with...|Observation|Insult|Excuse",
      "Which is an observation, not a judgment?|The dishes were in the sink this morning|You are so lazy|You always forget",
      "A request should be...|Specific and possible|Vague|A demand with a threat",
      "'I need rest' states a...|Need|Observation|Request",
      "'Could you text me when you are late?' is a...|Request|Feeling|Observation",
      "'I feel frustrated' names a...|Feeling|Request|Need",
      "This method helps because it...|Lowers defensiveness|Starts fights|Ends the talk",
      "Which opening avoids blame?|When the project was handed in late, I felt stressed|You ruined everything|Nobody ever helps me"
    ]),
    SC("Active constructive responding", "🎉", "When someone shares good news, how you respond matters. Active constructive responding shows real interest: eye contact, enthusiasm and a follow-up question ('That's amazing! How did you feel when you heard?'). Dismissing, ignoring or turning it into your story weakens friendships.", "Pick the response that is both warm and curious.", "A friend says 'I made the team!' You say 'Congratulations! What was the tryout like?'", [
      "A friend shares great news. The best response is...|Enthusiasm and a follow-up question|A shrug|Switching to your own news",
      "Which is active and constructive?|Wow, tell me more about how it happened|Cool, whatever|That reminds me of my own thing",
      "Changing the subject to yourself is...|Less supportive|Very supportive|A question",
      "A warm voice and eye contact show...|Real interest|Boredom|Anger",
      "A follow-up question like 'How did you feel?' helps the friend...|Relive and share the moment|Stop talking|Feel ignored",
      "Responding with 'Hmm, ok' and looking at your phone is...|Passive and dismissive|Constructive|Active",
      "Celebrating with others usually...|Strengthens friendships|Weakens them|Has no effect",
      "Which shows the response is active?|Matching their excitement|Staying neutral and silent|Criticizing the news"
    ]),
    SC("Giving and receiving criticism", "🔧", "When you give feedback, be specific, focus on the work or action, and offer an improvement. When you receive it, listen fully, breathe, ask questions to understand, and thank the person. You can decide later which parts to use.", "Think about listening first and judging later.", "Giving: 'Your slides were clear; try fewer words on slide three.' Receiving: 'Thanks. Could you tell me which words to cut?'", [
      "Useful feedback is...|Specific and about the work|Personal insults|Vague",
      "When receiving criticism first...|Listen fully|Defend yourself|Walk away",
      "A good question after hearing feedback is...|Can you give an example?|Why do you hate me?|That is wrong",
      "Which is better feedback?|The ending needed a stronger last line|You are bad at this|Meh",
      "Saying thank you for feedback...|Shows maturity|Admits defeat|Is rude",
      "You can decide later...|Which feedback to use|Whether the speaker exists|Nothing",
      "Feedback should include...|A way to improve|Only problems|Only praise",
      "Reacting defensively usually...|Blocks you from learning|Helps you learn|Impresses the speaker"
    ]),
    SC("Helping friends make peace", "🕊️", "A mediator helps two people solve a conflict without taking sides. The mediator invites each person to speak without interruption, restates what was said, finds shared goals, and helps them choose their own solution. Staying neutral builds trust.", "Think about being neutral and helping each side feel heard.", "Mediator: 'Sam, you felt left out. Jo, you wanted quiet. You both want a fair plan. What could work for both?'", [
      "A mediator should be...|Neutral|On one side|Silent",
      "Each person should get a chance to...|Speak without interruption|Shout|Hide",
      "Restating what each person said shows...|You understood them|You are bored|You are right",
      "A shared goal is something...|Both people want|Only one wants|Nobody wants",
      "The solution should come from...|The two people involved|The mediator alone|A coin flip",
      "Which sentence sounds neutral?|Let us hear both sides before deciding|You are obviously wrong|I already know who is to blame",
      "If voices rise, a mediator can...|Slow things down and set a calm tone|Join the shouting|Leave",
      "Mediation works best when people feel...|Heard and respected|Judged|Rushed"
    ]),
    SC("Value debate", "⚖️", "Value debates, like Lincoln-Douglas style, argue about what is right or more important: justice versus order, liberty versus safety. Each side offers a value and a criterion, which is the standard for judging the debate. Arguments then show how they best uphold that value.", "A value is what matters; the criterion is how to measure it.", "Value: justice. Criterion: fair treatment for all. The case argues that its side best achieves fair treatment.", [
      "A value debate is mostly about...|What is right or more important|Pure numbers|Who is tallest",
      "A value in debate is...|A core good such as justice|A statistic|A time limit",
      "The criterion is...|The standard for judging which side upholds the value|The speaker's name|A rebuttal",
      "Which topic fits a value debate?|Is liberty more important than security?|How many students ride the bus?|What is lunch cost?",
      "In a value debate, arguments should show...|How they support the value and criterion|Only jokes|Only long quotes",
      "A 'value' differs from a 'policy' because it...|Judges worth, not a specific action plan|Always has a budget|Needs no evidence",
      "A criterion makes the debate easier to judge because...|Both sides compare against the same standard|It removes arguments|It adds noise",
      "Which is a value?|Fairness|Tuesday|Forty-two"
    ])
  ];

  // ================= LEVEL 21 =================
  const L21 = [
    SC("Stock issues", "📋", "In policy debate the affirmative must prove the stock issues: harms (there is a problem), inherency (the problem will not fix itself), solvency (the plan fixes it), and topicality (the plan fits the resolution). If the other side defeats one, the case is in trouble.", "Match the question to the issue: problem, will it persist, does the plan work, does it fit the topic.", "Harms: crowded buses make students late. Inherency: the district has no plan to fix it. Solvency: extra buses cut the crowding.", [
      "Harms asks...|Is there a real problem?|Is the plan topical?|Who is tallest?",
      "Inherency asks whether the problem...|Will continue without the plan|Is already solved|Is imaginary",
      "Solvency asks whether the plan...|Actually fixes the problem|Costs money only|Is long",
      "Topicality asks whether the plan...|Fits the resolution|Rhymes|Is brief",
      "If the other side shows the plan does not fix the problem, they attack...|Solvency|Harms|Greetings",
      "Which is a harms argument?|Many students go hungry before first period|Our plan is topical|The negative is wrong",
      "The affirmative must prove...|All the stock issues|One issue only|Nothing",
      "If a problem will fix itself soon, the affirmative has trouble with...|Inherency|Topicality|Solvency only"
    ]),
    SC("Parliamentary debate", "🏛️", "Parliamentary debate has two teams, Government and Opposition, and a new topic given shortly before the round, so there is little research time. Debaters rely on logic, examples and quick thinking. Speakers may be offered a point of information, a short question from the other team.", "Think: short prep, no research binders, logic and examples.", "Given 15 minutes to prep, the Government defines the topic, offers a plan, and builds two arguments with everyday examples.", [
      "The two sides in parliamentary debate are...|Government and Opposition|Red and Blue|Left and Right only",
      "Prep time before a round is usually...|Short|Weeks|None at all and no topic",
      "A point of information is...|A brief question from the other team during a speech|A formal break|A cheer",
      "Because there is little research time, debaters rely on...|Logic and examples|Long quotes|Heavy books",
      "Taking a point of information shows...|Confidence and engagement|Weakness|A mistake",
      "Which skill matters most here?|Quick thinking|Memorizing a script|Silent waiting",
      "The Government's job is generally to...|Support the motion|Reject the motion|Judge",
      "A good Opposition speaker will...|Challenge the Government's points directly|Ignore them|Repeat the motion"
    ]),
    SC("Extemporaneous speaking", "🎲", "In extemporaneous speaking you draw a question about current events or a topic, get about 30 minutes to prepare, then give a short speech from notes. A clear structure helps: an attention getter, the question restated, two or three points with sources, and a conclusion.", "Think: short prep, notes only, clear structure.", "Question: 'Should cities add more bike lanes?' Answer in three points: safety, health, traffic, each with a source, then a conclusion.", [
      "In extemporaneous speaking, you prepare...|Briefly, after getting the question|For weeks beforehand|Never",
      "You usually speak from...|Short notes|A full script read aloud|Nothing at all",
      "Answering the question directly is called...|Staying on the prompt|Wandering|Rambling",
      "A good structure includes...|Intro, points with sources, conclusion|Only jokes|Only a title",
      "What do sources add?|Credibility|Length|Noise",
      "If you forget a point you...|Glance at your notes and continue calmly|Stop talking|Apologize repeatedly",
      "The topics usually relate to...|Current events and issues|Secret recipes|Nonsense",
      "To keep to time, practice...|Timing yourself with different questions|Only one question|Never"
    ]),
    SC("Original oratory", "🎤", "Original oratory is a speech you write yourself on a topic you care about, usually persuasive and memorized, with a clear message and a call to action. It blends stories, evidence and style. Your own voice and sincerity are essential.", "Think: your own words, memorized, with a purpose.", "A speech on kindness online opens with a short story, shares data on its effect, and ends with a call to act.", [
      "Original oratory is...|A self-written speech on a topic you care about|A copied speech|A random list",
      "It is usually delivered...|From memory|By reading a screen|Silently",
      "A strong oration has...|A clear message and call to action|No point|Only jokes",
      "Why include a story?|It connects emotionally|It uses time|It confuses",
      "Sincerity matters because...|Audiences trust honest speakers|It adds words|It hides the message",
      "Which topic fits well?|Why teens should volunteer|A list of colors|A long math table",
      "Compared with a speech from a book, original oratory is...|Your own writing|Someone else's|Impossible",
      "A good ending includes...|A memorable call to action|A shrug|A new, unrelated topic"
    ]),
    SC("Interpretation of literature", "📚", "In interpretation events, a performer reads or acts a piece of literature, like a poem or scene, using voice and gesture to bring out meaning. You choose what the piece says, then show it with pacing, pitch, pauses and small movements, without props or costumes.", "Think: meaning first, then voice and gesture to show it.", "For a poem about a storm, you slow down for calm lines and speed up and raise volume as the storm builds.", [
      "Interpretation means...|Performing literature to show its meaning|Writing your own essay|Reading silently",
      "A performer's first step is...|Understanding what the piece means|Choosing a costume|Picking a color",
      "Tools used include...|Voice, pacing and gesture|Props and costumes only|A script and nothing else",
      "A slow, soft voice might show...|Calm or sadness|Excitement|Anger",
      "A fast, loud section might show...|Urgency or excitement|Quiet|Boredom",
      "Pauses help by...|Letting important lines land|Making the piece longer for no reason|Hiding the lines",
      "Gestures in interpretation should be...|Purposeful and controlled|Constant and wild|Absent",
      "Choosing the piece, you should look for...|Something you connect with|Something boring|Something with no ending"
    ]),
    SC("Informative speaking", "🔭", "An informative speech teaches the audience something new without arguing for a side. It uses a clear topic, an organized structure, accurate sources and examples, and plain language. Success means the audience understands and remembers.", "Think: teach, don't sell.", "A talk on how bees make honey uses a time order, a simple diagram, and facts from reliable sources.", [
      "The goal of an informative speech is to...|Teach something|Argue for a side|Entertain only",
      "Which is an informative topic?|How volcanoes form|Why volcanoes are the best|Why you must vote for volcanoes",
      "A good informative speech uses...|Accurate sources|Guesses|Rumors",
      "Language for this speech should be...|Plain and clear|Full of jargon|Insulting",
      "Check for success by asking whether the audience...|Understood and remembered|Applauded loudly|Left early",
      "Organization helps because it...|Makes ideas easy to follow|Hides ideas|Adds length",
      "Visual aids should...|Clarify the topic|Distract|Replace the speaker",
      "An informative speech differs from a persuasive one because it...|Does not push a position|Has no facts|Is always short"
    ]),
    SC("Socratic questioning", "❓", "Socratic questioning helps people think by asking questions instead of telling. Types include clarifying ('What do you mean by...?'), probing assumptions ('What are you assuming?'), asking for evidence ('How do you know?'), and exploring consequences ('What follows if that is true?').", "Think about which type of question matches the purpose.", "To a friend who says 'Homework is useless': 'What do you mean by useless? What evidence have you seen?'", [
      "Socratic questioning mostly...|Asks questions to guide thinking|Lectures|Orders",
      "'What do you mean by that term?' is a...|Clarifying question|Consequence question|Assumption challenge",
      "'How do you know that?' asks for...|Evidence|A joke|Agreement",
      "'What follows if that is true?' explores...|Consequences|Greetings|Rhymes",
      "'What are you assuming?' probes...|Assumptions|Volume|Pace",
      "The tone of a good Socratic question is...|Curious and respectful|Mocking|Angry",
      "Why use it in discussion?|It deepens everyone's thinking|It ends talk|It makes one person win",
      "Which is a clarifying question?|Could you say more about what you mean?|Why are you wrong?|Who cares?"
    ]),
    SC("Hosting a podcast", "🎧", "A podcast host guides listeners with a clear opening, a topic promise, smooth transitions and a closing. Because there is no picture, voice, pacing and sound do all the work. Prepare an outline, speak as if to one friend, and keep your recording quiet and clean.", "Everything depends on sound, so think about voice and clarity.", "Start with 'Today we explore how bridges stay up.' Then give three parts with transitions, and end with a short recap.", [
      "A podcast depends mostly on...|Sound and voice|Pictures|Costumes",
      "A good opening...|Tells listeners what the episode is about|Hides the topic|Reads the credits only",
      "Speaking 'as if to one friend' makes the host sound...|Natural|Cold|Confusing",
      "Transitions help listeners...|Follow the shift between parts|Get lost|Stop",
      "An outline helps the host...|Stay organized|Fill silence with nonsense|Avoid planning",
      "A clean recording needs...|A quiet room and a steady mic distance|A noisy cafeteria|Wind",
      "At the end, a host should usually...|Recap and say goodbye|Leave suddenly|Start a new topic",
      "Compared with a stage talk, a podcast has no...|Visual aids or body language to see|Voice|Topic"
    ]),
    SC("Radio-style interviews", "📻", "In a recorded interview, plan open questions, listen closely, and ask follow-ups. Keep your own comments short. Say your guest's name and role at the start. Leave brief pauses so edits are easy, and thank the guest at the end.", "Think about guest first, host second.", "Start: 'Joining me is Ms. Lee, a community gardener.' Then ask 'What made you start the garden?' and follow up on the answer.", [
      "In an interview the guest should talk...|Most of the time|Almost never|Only to say yes",
      "Open questions begin with words like...|How and why|Is and are|Do and did",
      "A follow-up question builds on...|The guest's last answer|Your list only|Nothing",
      "At the start, the host should...|Introduce the guest|Skip introductions|Argue",
      "Brief pauses help because...|They make editing easier|They confuse the guest|They save time",
      "A host who interrupts often...|Makes the guest less comfortable|Improves the talk|Helps listeners",
      "Which is the best question?|What was the hardest part of building it?|You like it, right?|Did you build it?",
      "At the end, a courteous host...|Thanks the guest|Leaves silently|Corrects the guest"
    ]),
    SC("Audio fakes", "🎙️", "Software can now copy voices and make recordings that sound real but are fake. Listeners should be careful: a surprising audio clip, especially one asking for money or urging fast action, should be checked. Look for the original source, other reports, and signs like strange pauses or flat emotion.", "Think: pause and verify before trusting or sharing.", "A clip of a famous voice making a shocking claim. Before sharing, you search for the full original recording and trusted news reports.", [
      "Voice-copying software can make a clip that is...|Fake but convincing|Always true|Impossible to hear",
      "Before sharing a shocking clip, you should...|Check its source|Share at once|Add dramatic music",
      "A clip urging you to send money quickly is a sign to...|Be extra careful|Act fast|Ignore your doubts",
      "A good way to verify is to...|Look for the original and trusted reports|Trust the loudest comment|Guess",
      "Odd pauses or flat emotion may suggest...|A fake|A real, perfect clip|Nothing ever",
      "If a family member's voice asks for emergency money, you should...|Hang up and call them on a known number|Send it quickly|Keep it secret",
      "Is a recording alone proof?|No, it can be altered|Yes, always|Only if it is loud",
      "Good listeners are...|Skeptical but fair|Gullible|Always angry"
    ]),
    SC("Fact-checking on the fly", "✅", "When a speaker makes a big claim, ask quick questions: who says so, what is the source, is it recent, is it the full picture? Note the claim, then check it later in reliable sources. In a live discussion, you can politely ask, 'Where does that figure come from?'", "Think: note it, ask about the source, then verify.", "A speaker says '90 percent of kids agree.' You jot it down and later check the source and sample size.", [
      "First, when you hear a big claim, you should...|Note it and ask about the source|Accept it instantly|Reject it instantly",
      "A polite question is...|Where does that figure come from?|You're lying|Prove it or leave",
      "Checking if a source is recent helps because...|Old data may be out of date|Dates are decoration|Newer is always wrong",
      "'Is it the full picture?' asks whether...|Important facts are missing|The speaker is tall|The room is full",
      "A reliable source typically...|Shows evidence and is accountable|Has no author|Only repeats rumors",
      "A claim with no source should be treated as...|Unverified|Proven|Unimportant forever",
      "In a live setting, note-taking helps you...|Check the claim afterwards|Interrupt more|Avoid the topic",
      "Which stat needs the most checking?|A shocking number with no source|A cited number from a named study|A number you checked"
    ]),
    SC("Code-switching", "🔀", "Code-switching is changing how you speak to fit the situation: vocabulary, tone, accent or even language. People do it between home, friends, school and work. It is a normal, skillful way to communicate, not fake, and it helps you connect with different listeners.", "Think about adapting to the listener, not hiding who you are.", "You chat casually with friends but use full sentences and a calm tone when presenting to a committee.", [
      "Code-switching means...|Adjusting how you speak to the setting|Hiding who you are|Speaking only one way",
      "A student speaking casually with friends and formally to a judge is...|Code-switching|Lying|Confused",
      "Code-switching often changes...|Vocabulary and tone|Your name|Your age",
      "People who speak two languages may switch...|Between languages by setting|Never|Only in dreams",
      "Is it a skill?|Yes, a useful communication skill|No, it is a flaw|Only for adults",
      "Why might you use a formal register at a job interview?|It fits the situation|You must|It is a law",
      "Respectful listeners treat code-switching as...|Normal and valid|Suspicious|Rude",
      "Switching styles shows you can...|Connect with different listeners|Forget your identity|Avoid people"
    ]),
    SC("Politeness strategies", "🤝", "Politeness is a set of strategies to protect people's feelings and dignity. Positive politeness shows friendliness ('Great work, can I add an idea?'). Negative politeness respects freedom ('If you have a moment, could you...?'). Softening requests with 'could' and 'would' makes them easier to accept.", "Think: friendliness or respectful distance.", "'I really liked your plan! Would you mind if we tried an extra step?' softens the suggestion.", [
      "Positive politeness shows...|Friendliness and appreciation|Distance only|Orders",
      "Negative politeness shows...|Respect for the other person's freedom|Insults|Pressure",
      "Which request is more polite?|Could you pass the notes, please?|Give me the notes|Notes. Now",
      "Softeners include words like...|Could, would, perhaps|Never, always|Now, immediately",
      "A polite refusal could be...|I'd love to, but I can't this time|No. Stop asking|Go away",
      "Why use polite strategies?|They protect relationships|They make speeches longer|They hide the facts",
      "Which phrase is an example of positive politeness?|That was a great idea, thanks!|Excuse me for interrupting|Please stop",
      "Which is the most direct and least polite?|Move over|Would you mind making some room?|If it's okay, could I sit here?"
    ]),
    SC("Access for all listeners", "♿", "A talk should be accessible to everyone. Use a microphone so people can hear, describe your visuals aloud, provide captions or a transcript, speak at a clear pace, and allow time for sign-language interpreters. Ask in advance what listeners need.", "Think: can everyone hear, see and follow?", "Saying 'the chart shows sales rising from 10 to 30' helps listeners who cannot see the slide.", [
      "Describing your visuals aloud helps...|Listeners who cannot see them|No one|Only the front row",
      "Captions help people who...|Cannot hear well or want to read|Love silence|Hate words",
      "When an interpreter is present, speak...|At a steady pace and face the audience|Super fast|Away from them",
      "A microphone is useful because it...|Helps everyone hear|Hides your voice|Replaces slides",
      "A transcript is...|A written copy of what was said|A kind of microphone|A seating chart",
      "Asking listeners ahead of time what they need is...|Considerate planning|A waste|Rude",
      "'As you can see here' is a problem because...|Not everyone can see|It is polite|It is too long",
      "Accessible talks benefit...|Everyone|Nobody|Only the speaker"
    ]),
    SC("Leading a team huddle", "🏈", "A huddle is a short team talk before action. Leaders state the goal in one sentence, assign roles, remind everyone of the plan, and end with energy. Keep it under a minute or two, use 'we', and invite quick questions. Clear and calm beats loud.", "Think short, clear, together.", "'Our goal: finish the display by 3. Mia sets up, Ben labels, Sara checks. We've got this.'", [
      "A huddle talk should be...|Short and clear|Very long|Silent",
      "A good leader starts by stating...|The goal|A joke only|Past mistakes",
      "Assigning roles ensures...|Everyone knows their job|Confusion|Delay",
      "Using 'we' builds...|Team spirit|Distance|Blame",
      "The best tone for a huddle is...|Calm and energizing|Angry|Sleepy",
      "A good huddle ends with...|A confident call to action|A shrug|A new problem",
      "Inviting quick questions shows...|You value input|You are unsure|Time is endless",
      "Which sentence is a clear goal?|We finish the posters by noon|Let's do some stuff|Maybe things will go fine"
    ]),
    SC("Ethics of persuasion", "🧭", "Ethical persuasion respects the audience's right to choose. It uses true facts, fair reasoning and honest emotion. It does not trick, hide key facts, invent threats or exploit fears. Ask: would I be comfortable if the audience knew exactly how I am persuading them?", "Ask whether the method respects the listener's choice.", "Showing real data and a true story is ethical. Inventing a fake emergency to rush people into agreeing is not.", [
      "Ethical persuasion respects...|The audience's right to choose|Only the speaker's win|Nobody",
      "Which is ethical?|Sharing accurate facts|Making up statistics|Hiding the facts",
      "Using fear that is invented is...|Unethical|Required|A form of evidence",
      "A good test is to ask whether you'd be comfortable if the audience...|Knew exactly how you persuaded them|Never learned about it|Was asleep",
      "Honest emotion in a speech is...|Fine when it is true|Always wrong|Never effective",
      "Leaving out a key fact to win is...|Misleading|Honest|Polite",
      "A persuader who admits limits of their evidence is...|Building trust|Weak|Failing",
      "Rushing people with 'only one minute left' when it is false is...|Manipulative|Fair|Wise"
    ]),
    SC("Rhetorical analysis", "🔬", "To analyze a speech, ask SOAPS: Speaker, Occasion, Audience, Purpose, Subject, and then how the speaker uses choices like ethos, pathos, logos, tone and structure. Don't just say what the speech says; explain how and why its choices work.", "Think: who, when, for whom, why, about what, and how it works.", "Speaker: a coach. Occasion: before the final. Audience: the team. Purpose: build confidence. The coach uses short, strong sentences to set an energetic tone.", [
      "SOAPS begins with...|Speaker|Slides|Silence",
      "The 'O' in SOAPS stands for...|Occasion|Opinion|Order",
      "The 'A' stands for...|Audience|Argument|Action",
      "The 'P' stands for...|Purpose|Pause|Pitch",
      "Analysis should explain...|How and why choices work|Only what was said|Only the length",
      "A statement of purpose is...|The speaker wants to inspire the team|The speech was long|The room was cold",
      "Which is analysis, not summary?|The repetition builds urgency|The speaker talked about sports|It was at 9 am",
      "Looking at ethos, pathos and logos checks the speaker's...|Appeals to the audience|Seat|Shoes"
    ]),
    SC("Your speaking plan", "🗺️", "Great speakers keep improving by setting goals, practicing deliberately, getting feedback, and recording progress. Pick one skill at a time, such as pacing or eye contact. Seek chances to speak, from class to clubs, and reflect after each: what worked, what to change.", "Think goals, practice, feedback, reflect.", "Goal: reduce filler words. Practice: record a one-minute talk daily. Feedback: ask a friend to count fillers. Reflect: note progress weekly.", [
      "To improve, you should set...|Specific goals|Vague wishes|No goals",
      "Working on one skill at a time helps because...|You can focus|It is slower|It is boring",
      "Deliberate practice means...|Practicing with a clear aim and feedback|Practicing randomly|Never practicing",
      "Recording yourself shows...|What to change|Nothing|Only your face",
      "After a talk, a good reflection asks...|What worked and what to change?|Who was worse?|Why bother?",
      "Seeking chances to speak, like clubs, helps you...|Gain experience|Avoid growth|Hide",
      "Which is the best goal?|Use three pauses in my next talk|Be perfect|Speak somehow",
      "Progress is clearest when you...|Track it over time|Ignore it|Forget it"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 19: lvl(19, L19), 20: lvl(20, L20), 21: lvl(21, L21) });
})();
