// ext/speaking-22-24.js  Mind Lab Speaking & Listening, levels 22-24 (60 lessons)
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

  // ================= LEVEL 22 =================
  const L22 = [
    SC("Steelmanning", "🛡️", "To steelman is to restate the other side's argument in its strongest, fairest form before you answer it. It is the opposite of a straw man. If you can state their case so well that they say 'yes, exactly', your reply earns real respect.", "Ask: would the other side agree my version is fair and strong?", "Instead of 'they just hate change', I say 'they worry that rushed changes hurt the people who can least adapt'. Then I reply to that.", [
      "Steelmanning means...|Stating the opponent's best version of their case|Making their case sound silly|Ignoring their case",
      "A steelman is the opposite of a...|Straw man|Summary|Question",
      "Why steelman before replying?|Your answer then meets their real argument|It wastes their time|It hides your view",
      "Which is a steelman of 'Schools should start later'?|Teens sleep late biologically, and rested students learn better|Late starts are silly|Schools do not care about sleep",
      "A good test of a steelman is that the other side would say...|'Yes, that is what I mean'|'That is not even close'|'Please stop talking'",
      "Steelmanning shows you are...|Fair and well informed|Afraid to disagree|Unprepared",
      "After steelmanning, you should...|Give your honest reply to it|Pretend you agree|Leave the room"
    ]),
    SC("Framing a message", "🖼️", "A frame is the angle you present something from. 'Ninety percent of patients survive' and 'ten percent of patients die' are the same fact in different frames, but they feel different. Choose a frame that is honest and fits your goal, and notice frames others use.", "Ask what the wording makes the listener notice first.", "'Half full' and 'half empty' describe the same glass. I pick the honest frame that helps my listeners decide well.", [
      "A frame is...|The angle a fact is presented from|A picture border|A type of fallacy",
      "'Ninety percent are satisfied' versus 'ten percent are unhappy' shows...|Two frames for one fact|Two different facts|A mistake in math",
      "Framing becomes dishonest when it...|Hides or distorts the truth|Chooses clear words|Uses a vivid example",
      "A fee called a 'service charge' versus a 'contribution' shows...|Wording changes how it feels|The amount changes|Nothing at all",
      "A smart listener asks of any frame...|What is it leaving out?|Who is the tallest?|How long is it?",
      "Which frame stresses a gain?|'You save two hours a week'|'You lose two hours a week'|'Time is a thing'",
      "Honest framing means the facts are...|Still accurate|Optional|Changed"
    ]),
    SC("Anchoring", "⚓", "The first number or idea people hear becomes an anchor that pulls later judgments toward it. If a seller says 'normally 200 dollars, now 120', 120 feels cheap. As a speaker, set fair anchors. As a listener, ask whether the starting number is real.", "Think about how a first number pulls what comes after it.", "A speaker opens a fundraiser with 'last year one donor gave 1,000 dollars', so a 50-dollar ask feels easy. I check if the anchor is honest.", [
      "An anchor is...|The first number that pulls later judgments|The last word|A loud voice",
      "'Was 200 dollars, now 120' uses...|Anchoring|A syllogism|A pause",
      "To resist anchoring as a listener, ask...|Is the starting number real and fair?|Is it loud?|Is it long?",
      "Opening a negotiation with an extreme number tends to...|Pull the final deal toward it|Make no difference|End the talk",
      "Anchoring works because people...|Judge relative to the first number they hear|Forget numbers|Love round numbers only",
      "Using a made-up anchor to trick people is...|Dishonest|Smart and fair|Required",
      "A fair anchor is one that is...|Based on true, checkable facts|Invented|Random"
    ]),
    SC("No true Scotsman", "🏴", "This fallacy protects a claim by changing the rule when a counterexample appears. 'No true athlete skips practice.' 'My friend is an athlete and skipped.' 'Then he is not a true athlete.' The definition shifted to dodge the evidence.", "Ask whether the speaker redefines the group to escape the counterexample.", "'Real fans never boo.' 'But I saw a fan boo.' 'Then he is no real fan.' The claim can never be wrong, so it says nothing.", [
      "The 'no true Scotsman' move...|Redefines the group to dodge a counterexample|Offers more evidence|Asks a fair question",
      "'No real gamer quits.' 'Sam quit.' 'Then Sam is no real gamer.' This is...|No true Scotsman|A syllogism|Chiasmus",
      "Why is it a problem?|The claim can never be proven wrong|It is too polite|It uses facts",
      "The best response to it is...|Ask what would count as a counterexample|Accept it|Yell",
      "Which is NOT this fallacy?|Updating a claim after finding an exception, openly|Shifting the definition quietly|Declaring any exception fake",
      "A claim nothing could disprove is...|Empty of real information|Very strong|Well supported",
      "This fallacy often uses words like...|'Real', 'true' or 'genuine'|'Maybe' or 'perhaps'|'Data' or 'source'"
    ]),
    SC("Weasel words", "🦡", "Weasel words sound like claims but dodge responsibility: 'some experts say', 'studies show', 'many people believe', 'virtually guaranteed'. They hide who said it and how sure they are. Strong speakers name sources and give numbers.", "Ask who exactly says it, and how many.", "Weak: 'Studies show sleep helps grades.' Strong: 'A school-district study of 800 students found regular bedtimes linked to higher grades.' (Check real sources before using one.)", [
      "A weasel word...|Sounds firm but avoids specifics|Names a source|Gives exact numbers",
      "Which is a weasel phrase?|'Some people say'|'The 2020 census counted 1,200'|'I measured 14 degrees'",
      "'Studies show' is weak unless you...|Name the study|Say it louder|Say it twice",
      "To fix 'many experts agree', you could say...|Which experts, and how many|Many many experts|Experts, probably",
      "Why do speakers use weasel words?|To avoid being held to a claim|To prove something|To show a source",
      "A listener's best question is...|'Who says so, and how do they know?'|'Is that a tall word?'|'Can you shout it?'",
      "'Virtually guaranteed' is weak because...|It sounds sure but is not exact|It is too exact|It has numbers"
    ]),
    SC("Reading from a script", "📜", "Sometimes you must read a speech, as at a ceremony or on a teleprompter. Mark pauses and key words, use large print with wide spacing, keep your thumb at your place, and look up at the end of each phrase. Write short sentences for the ear so it sounds spoken, not read.", "Think about how to sound alive while reading.", "I print in 18-point type, mark a slash for pauses, and glance up at the end of each sentence.", [
      "To sound natural when reading a script, you should...|Look up at the end of phrases|Read with your eyes glued down|Read very fast",
      "Marking a slash in a script means...|A pause|A mistake|A new speaker",
      "A script for speaking should have...|Short sentences for the ear|Long dense paragraphs|Tiny print",
      "Large print and wide spacing help you...|Keep your place|Hide the speech|Speak louder",
      "A teleprompter shows the text...|Near the camera lens so you seem to look at the viewer|Behind the audience|Only after you finish",
      "A script that sounds read aloud, not spoken, often has...|Written-style long sentences|Contractions and short lines|Natural pauses",
      "Rehearsing a script out loud lets you...|Find awkward phrases and fix them|Skip the real speech|Memorize every comma"
    ]),
    SC("The skeptical audience", "🤨", "A skeptical audience doubts you. Do not fight the doubt: name it. Open with common ground, admit the strongest objection, offer evidence they can check, and ask for a small step instead of a giant leap. Respect wins more minds than pressure.", "Think: acknowledge doubts first, then earn trust.", "'You may think a four-day week sounds risky. Here is what three pilot schools found, and here is a small trial we could check.'", [
      "With a skeptical audience, a good start is to...|Acknowledge their doubts and find common ground|Insult their doubts|Rush through facts",
      "Evidence works better when the audience can...|Check it themselves|Only hear about it|Never see it",
      "Asking for a small step instead of a big leap...|Is easier for doubters to accept|Always fails|Hides your goal",
      "Naming the strongest objection yourself shows...|Honesty and confidence|Weakness only|You forgot your notes",
      "Pressure and shouting usually make skeptics...|Dig in harder|Agree faster|Fall asleep",
      "Which opener suits skeptics?|'I know many of you have doubts, and they are fair.'|'You are all wrong.'|'Just trust me.'",
      "Trust grows when your claims are...|Modest and well supported|Huge and unproven|Hidden"
    ]),
    SC("Speaking to a divided crowd", "⚖️", "When the room disagrees, start with what everyone shares: a goal, a value, a place. Use inclusive but honest language, give each side fair weight, and avoid labels that make groups feel attacked. You may not please everyone, but you can keep everyone listening.", "Ask what all groups in the room already agree on.", "'Whatever we think about the plan, we all want our town safe and fair.' Then I describe both worries fairly.", [
      "With a divided crowd, a smart start is to...|Name shared goals or values|Pick a side to mock|Avoid any shared ground",
      "Labels that attack a group tend to...|Make that group stop listening|Win them over|Calm everyone",
      "Giving each side fair weight shows...|Respect|Weakness only|You have no view",
      "A realistic goal with a divided crowd is to...|Keep everyone listening and thinking|Make everyone agree instantly|Silence one side",
      "Which line is inclusive?|'We all want this school to thrive.'|'People like you never care.'|'Half of you are wrong.'",
      "Using humor that targets one group will probably...|Alienate part of the room|Unite the room|Prove a point",
      "A speaker can still share a view while...|Treating others' views fairly|Pretending to have none|Ignoring facts"
    ]),
    SC("Adapting to the judge", "🧑‍⚖️", "In a contest, the judge decides who wins. Some judges like speed and technical detail, others want clear plain talk and strong examples. Check the judge's background or ask before the round, then adjust speed, vocabulary and structure, without changing what is true.", "Think about who is deciding and what they value.", "My judge is a parent volunteer, so I slow down, skip insider shorthand and explain each term.", [
      "Adapting to the judge means...|Adjusting style to what they can follow and value|Changing your facts|Arguing with them",
      "A new volunteer judge probably needs you to...|Slow down and avoid jargon|Speak faster|Use more shorthand",
      "What should NOT change when you adapt?|The truth of your claims|Your speed|Your word choice",
      "How can you learn a judge's preferences?|Ask beforehand or read the judge notes|Guess from their shoes|Never find out",
      "A judge who is an expert may enjoy...|Deeper technical detail|No evidence at all|Only jokes",
      "Ignoring who is judging risks...|Losing them in your delivery|Winning by default|Nothing",
      "Adapting is a form of...|Audience analysis|Cheating|Stalling"
    ]),
    SC("Turn-taking signals", "🚦", "In conversation people trade turns with signals: a falling voice, a pause, eye contact, a question, or a raised hand in meetings. To enter, wait for a pause or raise a finger. To hold your turn, keep a steady pace and avoid long gaps. To pass the turn, ask a question or look at someone.", "Think about what a person does to start, hold and end a turn.", "Maria slows down, drops her voice, and says 'Lee, what do you think?' That passes the turn to Lee.", [
      "A falling voice at the end of a sentence often signals...|You may be finished|You are starting a new topic|You are shouting",
      "Passing the turn can be done by...|Asking someone a question|Staring at the floor|Trailing into a mumble",
      "To join a busy discussion politely, you can...|Wait for a pause or raise a finger|Talk over everyone|Walk away",
      "Long silent gaps while you talk may let others...|Jump in|Hear you better|Fall asleep",
      "Interrupting repeatedly signals...|You are not sharing the turn|Great listening|Good manners",
      "Looking at a person while finishing a thought can...|Invite them to speak|End the meeting|Hide your point",
      "A good group conversation has turns that are...|Shared fairly|Taken by one person|Random"
    ]),
    SC("Acceptance speeches", "🏆", "When you accept an award, keep it short. Thank the people who truly helped, share one meaningful thought, and be gracious. Avoid reading a long list of names, bragging, or complaining. End warmly. Thirty to ninety seconds is plenty.", "Think short, grateful, specific, warm.", "'I'm honored. Thank you to my coach for never giving up on me, and to my team for every early practice. I'll keep working to earn this.'", [
      "A good acceptance speech is usually...|Short and gracious|Very long|Mostly about yourself",
      "Whom should you thank?|People who truly helped|Nobody|Only strangers",
      "A good length is about...|30 to 90 seconds|20 minutes|5 seconds",
      "What should you avoid?|Bragging and long lists|Smiling|Saying thank you",
      "Specific thanks, like 'my coach never gave up on me', are better than...|Vague 'thanks to everybody'|Naming one person|Saying a story",
      "How should it end?|Warmly, with a thank you|Mid-sentence|With a complaint",
      "Humility in a speech shows you...|Value others' help|Do not care|Were lucky only"
    ]),
    SC("The hero's journey", "🗡️", "Many stories follow a pattern: an ordinary world, a call to adventure, a challenge or ordeal, a change in the hero, and a return home with something new. You can shape true stories this way. Make the listener care about the hero's goal and what is at risk.", "Think: ordinary life, a call, a struggle, a change, a return.", "A swimmer afraid of deep water (ordinary world) joins a team (call), nearly quits (ordeal), swims her first lap (change), and teaches a friend (return).", [
      "A hero's journey story begins with...|The ordinary world|The ending|A joke",
      "The 'call to adventure' is...|The event that starts the change|The final bow|The moral",
      "The ordeal is...|The big challenge the hero faces|A nap|A thank-you",
      "At the end, the hero returns...|Changed, with something new|Exactly the same|Without a story",
      "To make listeners care, show the hero's...|Goal and what is at risk|Shoe size|Bank balance",
      "This pattern can shape a true story by...|Choosing which real events to tell, in order|Inventing facts|Skipping the challenge",
      "Which comes first?|Ordinary world|Return home|Final change"
    ]),
    SC("Tension and release", "🎢", "Stories hold attention by building tension, then releasing it. Slow down and lower your voice before a key moment. Hold back one detail, pause, then reveal. A small laugh or a relief after the peak lets listeners breathe. All tension and no release is tiring.", "Think about when to hold back and when to reveal.", "'I opened the envelope... (pause) ... and it said I had made the team.' The pause is the tension, the news is the release.", [
      "Tension in a story is built by...|Holding back a key detail|Telling the ending first|Speaking at one flat pitch",
      "A pause before the reveal...|Makes the reveal land harder|Ruins the story|Is a mistake",
      "Release happens when...|The suspense is resolved|The story starts|You forget the point",
      "Constant tension with no release...|Tires the listener|Delights everyone|Is always best",
      "Before a key moment, many speakers...|Slow down and lower the voice|Rush and shout|Look at the ceiling",
      "A moment of relief or humor after the peak helps...|Listeners breathe|Cancel the story|Prove a fact",
      "Giving away the surprise at the start...|Lowers suspense|Raises suspense|Does nothing"
    ]),
    SC("Vocal warm-ups", "🎵", "Warm up before speaking, like an athlete. Breathe deeply into your belly, hum gently, do lip trills, roll your shoulders and stretch your neck, and say tongue twisters slowly then faster. Sip room-temperature water. Do not shout or whisper hard to warm up.", "Think: breath, hum, lips, tongue, water.", "Before class I hum for a minute, trill my lips, and repeat 'red leather, yellow leather' slowly, then faster.", [
      "A good vocal warm-up is...|Gentle humming and lip trills|Screaming|Whispering hard",
      "Tongue twisters help warm up your...|Mouth and articulation|Hearing|Handwriting",
      "Before speaking, what drink is best?|Room-temperature water|Very cold or very hot drinks|Soda",
      "Breathing deeply into your belly helps your...|Support and calm|Elbows|Eyesight",
      "Shoulder rolls and neck stretches release...|Tension that affects the voice|Your notes|Your script",
      "Straining your voice to warm it up can...|Hurt it|Fix it|Make it famous",
      "Warming up is best done...|Before you speak|After the speech|Never"
    ]),
    SC("Projection and resonance", "📢", "Projection is carrying your voice to the back of the room without shouting. It comes from steady breath support, open posture, clear consonants and aiming your voice at the far wall. Resonance is the richness of tone from your chest, mouth and head. Shouting strains the throat; projecting uses support.", "Think breath support, posture and aim, not squeezing the throat.", "I stand tall, take a belly breath and aim my voice at the back wall so my last sentence is as strong as my first.", [
      "Projection comes mainly from...|Breath support and posture|Squeezing your throat|Speaking faster",
      "Shouting differs from projecting because shouting...|Strains the throat|Is calmer|Uses support",
      "Aiming your voice at the back wall helps...|Reach far listeners|Hide your face|Whisper",
      "Clear consonants help projection because they...|Carry meaning farther|Add volume only|Cut the voice",
      "Slouching tends to...|Reduce breath support|Boost your voice|Warm up your voice",
      "Resonance is the...|Richness of your tone|Number of notes|Length of speech",
      "A microphone does not remove the need for...|Clear speaking and support|Anything at all|A script"
    ]),
    SC("When the tech fails", "🔌", "Projectors die, clickers freeze, mics cut out. Arrive early to test, bring a backup copy of your slides, and be ready to give your talk without them. If it fails, stay calm, say what you will do, and keep going. The audience came for you, not the slides.", "Think: prepare a backup and stay calm.", "The projector fails. I smile, say 'Let me walk you through it', and use my printed outline to give the talk.", [
      "Before a talk, you should...|Test your equipment and bring a backup|Hope it works|Skip rehearsal",
      "If the projector dies mid-talk, a good move is to...|Stay calm and keep speaking|Apologize for ten minutes|Stop the talk",
      "A strong speaker is prepared to...|Present without slides|Need slides to speak|Cancel",
      "Where should your backup copy of slides be?|In a second place, like a drive or printout|Nowhere|Only in your head",
      "The audience mainly came to hear...|You|The projector|The clicker",
      "When tech fails, saying your plan out loud...|Reassures the audience|Confuses them|Hides the problem",
      "Arriving early lets you...|Fix problems before the audience arrives|Skip the speech|Avoid questions"
    ]),
    SC("Voicemail and recorded messages", "📞", "A voicemail should be short and complete: say your name, why you are calling, the key details, your phone number slowly (twice if needed), and the best time to call back. Smile as you speak so you sound friendly. Never record while angry.", "Think: who, why, details, number, next step.", "'Hi, this is Sam Lee calling about the volunteer sign-up. My number is 555-0147, again, 555-0147. Please call after four.'", [
      "A good voicemail begins with...|Your name and reason for calling|A long story|Silence",
      "Say your phone number...|Slowly, and repeat it|Fast and once|Never",
      "A voicemail should be...|Short and complete|Five minutes long|Vague",
      "Including the best time to call back...|Makes a reply easier|Is rude|Wastes space",
      "If you feel angry, you should...|Wait before recording|Record at once|Shout",
      "Smiling as you speak helps you sound...|Friendly|Bored|Rushed",
      "A voicemail that says only 'Call me' is weak because it lacks...|Details and a reason|A greeting|Volume"
    ]),
    SC("Delegating clearly", "📋", "To delegate, say what the task is, why it matters, the deadline, and what done looks like. Ask the person to repeat the plan in their own words and invite questions. Giving a task without details causes mistakes. Thank people and give credit afterwards.", "Think: task, purpose, deadline, definition of done, check-back.", "'Please design the poster by Thursday noon so we can print it. It needs the date, place and our logo. Can you tell me your plan?'", [
      "A clear delegation includes...|What, why, deadline and what done looks like|Only 'do it'|A guess",
      "Asking the person to repeat the plan helps...|Confirm understanding|Embarrass them|Waste time",
      "Explaining why a task matters...|Improves effort and decisions|Is pointless|Slows work",
      "'What done looks like' means...|The result that counts as finished|The color of the paper|The speaker's hat",
      "A vague task with no deadline often leads to...|Mistakes and delays|Perfect work|Silence",
      "After the job is done, a leader should...|Thank and credit the person|Take all credit|Ignore it",
      "Inviting questions shows you...|Welcome clarity|Do not care|Have no plan"
    ])
  ];

  // ================= LEVEL 23 =================
  const L23 = [
    SC("The Toulmin model", "🏗️", "Philosopher Stephen Toulmin described arguments with parts: a claim (what you assert), grounds (the evidence), a warrant (the link between evidence and claim), backing (support for the warrant), a qualifier (how certain, such as 'probably') and a rebuttal (when it might not hold). It helps you see where an argument is strong or weak.", "Ask which part is the claim, which is the evidence, and which is the bridge.", "Claim: we should add bike lanes. Grounds: crashes dropped 30 percent on streets that added them. Warrant: lowering crashes protects riders. Qualifier: likely.", [
      "In the Toulmin model, the claim is...|What you are asserting|The evidence|The audience",
      "The grounds are...|The evidence you offer|The conclusion|The qualifier",
      "The warrant is...|The link explaining why the evidence supports the claim|A search order|The title",
      "A qualifier such as 'probably' shows...|How certain you are|A weak speaker|An error",
      "A rebuttal names...|Conditions where the claim might not hold|The audience's name|The volume",
      "Backing supports the...|Warrant|Microphone|Applause",
      "If the evidence is strong but the warrant is missing, the argument...|Has a gap between evidence and claim|Is perfect|Has no claim"
    ]),
    SC("Rogerian argument", "🤝", "Named after psychologist Carl Rogers, this approach aims at understanding before persuading. You describe the other side's view so well they feel heard, find common ground, then present your view as a way to meet shared goals. It works best when positions are heated and listening is low.", "Think: listen first, find common ground, then propose.", "'I understand you want to protect small shops, and so do I. Here is a plan that adds parking without harming them.'", [
      "A Rogerian argument starts by...|Showing you understand the other view|Attacking the other view|Ignoring the issue",
      "Its main goal is...|Understanding and common ground|Defeating the opponent|Silence",
      "It works best when...|The topic is heated and people are not listening|Everyone already agrees|Nobody cares",
      "Your own position comes...|After you show understanding|First, as a demand|Never",
      "The approach is named after...|Carl Rogers|Isaac Newton|Aristotle",
      "A Rogerian speaker treats the other side as...|A partner in solving a problem|An enemy|Invisible",
      "Which opener is Rogerian?|'I see why this matters to you.'|'You are wrong.'|'Stop talking.'"
    ]),
    SC("Stasis questions", "❓", "Stasis theory sorts a dispute by asking the right kind of question: Did it happen (fact)? What is it (definition)? How good or bad is it (quality or value)? What should we do (policy)? Arguing at the wrong level wastes time. First find where people actually disagree.", "Ask what kind of question the disagreement really is.", "'Did the team break the rule?' is fact. 'Does this count as cheating?' is definition. 'Is it unfair?' is value. 'Should they lose points?' is policy.", [
      "'Did the event actually happen?' is a question of...|Fact|Policy|Value",
      "'Should we change the rule?' is a question of...|Policy|Fact|Definition",
      "'Does this count as cheating?' is a question of...|Definition|Policy|Fact",
      "'Is it fair?' is mostly a question of...|Value or quality|Fact only|Volume",
      "Why use stasis questions?|To find where the real disagreement is|To confuse people|To avoid answering",
      "Arguing about policy before agreeing on the facts...|Can waste time|Always works|Is required",
      "The usual order of stasis questions is...|Fact, definition, quality, policy|Policy, fact, quality, definition|Quality, policy, fact, definition"
    ]),
    SC("Composition and division", "🧱", "Fallacy of composition: assuming what is true of the parts is true of the whole ('every player is great, so the team must be great'). Fallacy of division: assuming what is true of the whole is true of each part ('the school is rich, so each student is rich'). Check whether the property really transfers.", "Ask whether the trait really carries from parts to whole, or whole to parts.", "Every brick is light, but the wall is heavy. A heavy wall does not mean each brick is heavy.", [
      "'Each musician is excellent, so the band must be excellent' is...|Composition|Division|Sound logic",
      "'The company is huge, so every employee is powerful' is...|Division|Composition|Valid",
      "Composition goes from...|Parts to the whole|Whole to parts|Nothing to something",
      "Division goes from...|The whole to its parts|Parts to the whole|One speech to another",
      "Which statement is a safe inference?|This bag of 10 apples weighs more than one apple|Each apple weighs a ton because the bag does|Each apple is an orchard",
      "The key question is...|Does the property transfer?|Is it loud?|Is it short?",
      "'A city is crowded, so every street is crowded' is...|Division|Composition|True"
    ]),
    SC("Survivorship bias", "✈️", "Survivorship bias means judging from the winners that remain while ignoring the ones that dropped out. 'Famous people dropped out of school and became rich' ignores the many who dropped out and struggled. Always ask: who is missing from this story?", "Ask who or what is missing because it did not survive.", "In World War II, planners studied returning planes' bullet holes, but the planes that did not return were the missing data.", [
      "Survivorship bias is...|Judging only from those who succeeded or remained|Counting all cases|Using a survey",
      "'Old buildings are strong, so old buildings are better built' may ignore...|The old buildings that fell down|The new buildings|The paint",
      "The question to ask is...|Who or what is missing?|Who is loudest?|Who is first?",
      "A speaker who shows only success stories may mislead by...|Hiding the failures|Showing numbers|Being brief",
      "Which statement shows survivorship bias?|'Everyone I know who started a company succeeded', ignoring those who closed|'A survey of 1,000 businesses, open and closed, showed...'|'We checked all cases'",
      "Fixing survivorship bias means including...|The cases that did not survive|Only the best cases|Fewer cases",
      "It is a problem of...|Missing data|Too many facts|Too loud a voice"
    ]),
    SC("Sampling bias", "🧪", "A sample is a small group used to learn about a big group. If the sample is not fair, the results mislead. Asking only your friends, or only people who answer a voluntary poll, is biased. A random and large enough sample gives better results. Always ask who was asked.", "Ask who was surveyed and how they were chosen.", "A poll about school lunch given only to the cafeteria line leaves out students who bring lunch.", [
      "A biased sample is one that...|Does not fairly represent the group|Is perfectly random|Is huge",
      "Surveying only your own friends is...|Likely biased|Always fair|Random",
      "A random sample gives each person...|An equal chance of being chosen|No chance|A prize",
      "A poll that only the most excited people choose to answer risks...|Skewed results|Perfect accuracy|No answers",
      "A very tiny sample is a problem because...|Chance can distort it|It is always right|It takes too long",
      "The key question about any survey is...|Who was asked, and how?|What font was it?|Who printed it?",
      "To learn about all students, ask...|A random mix across grades|Only one class|Only seniors"
    ]),
    SC("Persuasion levers", "🔧", "Robert Cialdini described levers that influence people: reciprocity (we return favors), commitment (we stay consistent), social proof (we follow others), authority (we trust experts), liking (we say yes to people we like) and scarcity (rare things seem valuable). Use them honestly and notice when others use them on you.", "Match each description to its lever.", "A cafe gives a free sample, and customers feel they should buy: reciprocity.", [
      "People returning a favor shows...|Reciprocity|Scarcity|Authority",
      "'Over 10,000 people joined' uses...|Social proof|Scarcity|Reciprocity",
      "'Only three left!' uses...|Scarcity|Liking|Commitment",
      "A doctor in a white coat endorsing a product uses...|Authority|Liking|Social proof",
      "Staying consistent with something you already promised is...|Commitment|Reciprocity|Scarcity",
      "Saying yes to a friendly person you like is...|Liking|Authority|Commitment",
      "Using these levers is ethical when you...|Are honest and the offer is real|Invent fake scarcity|Hide the facts"
    ]),
    SC("Foot in the door", "🚪", "The foot-in-the-door technique asks for a small favor first, then a bigger one. People who agree to a small step often agree to a bigger one later to stay consistent. It can be honest (invite someone to one meeting before asking them to join a team) or manipulative if it traps people.", "Think small request first, big request later.", "'Would you sign this petition?' leads later to 'Would you help hand out flyers?' Each step is honest and optional.", [
      "Foot in the door means...|Asking small first, then bigger|Asking big first only|Never asking",
      "Why does it work?|People like to stay consistent|People forget|People hate small tasks",
      "Door-in-the-face asks...|A big request first, then a smaller one|A tiny request only|Nothing",
      "It becomes manipulative when it...|Traps or tricks people|Offers real choices|Is honest",
      "A fair use is...|Inviting someone to one meeting before asking them to join|Hiding costs until they agree|Threatening them",
      "Respecting the listener means they can...|Say no freely|Never refuse|Only agree",
      "The small first step should be...|Honest and genuinely optional|A trick|A secret"
    ]),
    SC("The devil's advocate", "😈", "A devil's advocate argues the other side on purpose, not to be difficult but to test a plan. It exposes weak spots before a real mistake. Say clearly that you are playing the role, argue fairly, and thank the group for engaging. It works only in a team that feels safe.", "Think: a role used to test ideas, announced openly.", "'I'm playing devil's advocate: what if fewer students come than we expect?' The group then fixes the plan.", [
      "A devil's advocate...|Argues the other side to test a plan|Always opposes you|Quits the group",
      "Its purpose is to...|Find weak spots early|Win an argument|Cause a fight",
      "You should...|Say you are playing the role|Hide that you are acting|Attack people personally",
      "It works best in a team that feels...|Safe to disagree|Afraid|Silent",
      "After the exercise, thank the group because...|Everyone helped test the idea|You won|They lost",
      "A devil's advocate argues...|Fairly and with reasons|With insults|Randomly",
      "If a plan survives tough questions, it is probably...|Stronger|Weaker|Finished by luck"
    ]),
    SC("Brainstorming rules", "⚡", "Good brainstorms follow rules: aim for many ideas, defer judgment (no criticizing yet), welcome wild ideas, and build on others' ideas with 'yes, and'. Write everything down. Sort and evaluate only after. Quantity first, quality second.", "Think: many ideas first, judging later.", "'Yes, and we could add a stage' builds on an idea. 'That will never work' kills the flow and comes later in the sorting step.", [
      "During a brainstorm, you should...|Defer judgment|Criticize each idea|Stay silent",
      "The first goal is...|Many ideas|One perfect idea|A final decision",
      "'Yes, and...' means...|Building on someone's idea|Rejecting it|Ending the meeting",
      "Wild ideas are...|Welcome, they can spark good ones|Banned|Mocked",
      "When do you evaluate and sort ideas?|After the brainstorm|During every idea|Never",
      "Writing ideas down helps because...|Nothing is lost and all can see|It slows people|It stops creativity",
      "Tough criticism of ideas is best saved for...|The evaluation stage|The first minute|Never"
    ]),
    SC("Issue trees", "🌳", "An issue tree breaks a big question into smaller branches that do not overlap and together cover everything. 'Why are fewer people coming to our club?' branches into: Do they know about it? Is the time right? Is the activity interesting? Then you check each branch. It keeps talks organized and complete.", "Think: split a big question into separate, complete parts.", "Question: How can we raise 500 dollars? Branches: sell things, ask donors, hold an event. Each branch splits again.", [
      "An issue tree...|Breaks a big question into smaller branches|Lists random ideas|Shows a family",
      "Good branches should be...|Separate and together cover everything|Overlapping and incomplete|Silly",
      "The tree helps you...|Check each part in order|Skip the problem|Talk longer",
      "'Why did attendance drop?' could branch into...|Awareness, timing and interest|Pizza, shoes and weather balloons|Nothing",
      "After building the tree, you...|Investigate each branch|Throw it away|Choose by color",
      "Overlapping branches cause...|Confusion and repeated work|Clarity|Speed",
      "Issue trees make a speech or plan more...|Organized and complete|Confusing|Short only"
    ]),
    SC("Public narrative", "📖", "Organizer Marshall Ganz teaches a three-part story for leading others: the story of self (why I care, a moment that shaped me), the story of us (what we share, our values and experience) and the story of now (the urgent challenge and the choice we face, with a specific action). It turns values into action.", "Think: me, us, now.", "Self: I got lost once and a stranger helped. Us: our town takes care of its own. Now: this month, we can volunteer to help new neighbors.", [
      "The story of self explains...|Why I care|Why you are wrong|What time it is",
      "The story of us shows...|Shared values and experience|Only my goals|Nothing",
      "The story of now names...|The urgent challenge and a choice or action|Old history only|A joke",
      "The three parts in order are...|Self, us, now|Now, self, us|Us, now, self",
      "This structure is used to...|Move people from values to action|Avoid action|Be quiet",
      "A strong story of now includes...|A specific action people can take|A vague hope|A threat",
      "Sharing a personal moment must still be...|True and appropriate|Invented|Full of private details"
    ]),
    SC("College and program interviews", "🎓", "In an admissions or program interview, research the place, prepare stories about your interests and growth, and answer with specific examples. Ask thoughtful questions of your own. Dress neatly, arrive early, be honest, and send a thank-you note. Silence is fine: take a moment to think.", "Think: prepare, be specific, ask questions, thank them.", "Asked 'Why this program?', I mention a course I read about and link it to a project I did. Then I ask what first-year students enjoy most.", [
      "Before an interview you should...|Research the place|Wing it|Memorize a script word for word",
      "Good answers include...|Specific examples|Only vague claims|Boasts that are not true",
      "Asking your own question shows...|Interest and curiosity|You are rude|You are lost",
      "A thank-you note afterwards...|Is a polite, memorable touch|Is required to be long|Is rude",
      "If you need time to think, you can...|Pause briefly before answering|Panic|Change the topic",
      "Honesty matters because...|Interviewers value trust|It never matters|Only grades count",
      "A useful question to ask is...|'What do students enjoy most here?'|'Can I skip the work?'|'When is lunch?'"
    ]),
    SC("Asking for what you need", "✋", "Self-advocacy is asking clearly for help or an opportunity, such as a recommendation letter, extra time, or a role on a project. Be specific, give reasons and time, make it easy to say yes, and accept a no gracefully. Thank people either way.", "Think: specific ask, reason, enough notice, graceful reply.", "'Ms. Ortiz, would you write a recommendation letter for the engineering program? The deadline is March 1. I can send my résumé and a summary of my projects.'", [
      "A good request is...|Specific, with a reason and notice|Vague and last-minute|Demanding",
      "Giving the person plenty of time...|Shows respect|Wastes it|Is unnecessary",
      "To make it easy to say yes, you can...|Provide helpful details|Hide the deadline|Say nothing",
      "If the answer is no, you should...|Thank them politely|Argue|Be rude",
      "'Can you help?' is weaker than...|'Could you review my draft by Friday?'|'Help.'|'Whatever.'",
      "Self-advocacy means...|Speaking up respectfully for your needs|Being pushy|Staying silent",
      "Thanking someone after they help...|Builds good relationships|Is awkward|Is never needed"
    ]),
    SC("Bridging", "🌉", "Bridging is answering a tough question briefly and honestly, then moving to your key message with a phrase like 'and what matters most is...'. It is used in interviews with the media. Use it to stay on topic, not to dodge: answer the question first.", "Think: answer first, then connect to your message.", "'Yes, the trial had setbacks. What matters most is what we learned and how we fixed it.' I answered, then bridged.", [
      "Bridging means...|Answering, then linking to your key message|Ignoring the question|Changing the subject rudely",
      "A bridging phrase is...|'What matters most is...'|'No comment ever'|'I forgot'",
      "Bridging should be used to...|Stay on message honestly|Dodge entirely|Insult the host",
      "You should first...|Give a real brief answer|Skip the question|Walk away",
      "Dodging every question with a bridge...|Loses trust|Builds trust|Wins applause",
      "A key message should be...|Short, clear and repeated|Long and mixed|Hidden",
      "Bridging is useful in...|Interviews and Q and A|Whispering|Silent reading"
    ]),
    SC("Giving bad news", "📨", "When you must give bad news, do it promptly, privately if it is personal, and plainly. Lead with the news, explain briefly, show empathy, and say what happens next. Do not bury it in long preamble or hide behind jargon. Let the person react and ask questions.", "Think: clear, kind, prompt, and a next step.", "'I have to tell you the trip is canceled. I'm sorry, I know you worked hard on it. Here is what we can do instead.'", [
      "Bad news should be given...|Plainly and promptly|After a very long preamble|Through hints only",
      "For personal bad news, a good setting is...|Private|A crowded hall|A loud party",
      "A good order is...|News, brief reason, empathy, next steps|Next steps only|Excuses only",
      "Hiding the news in jargon...|Makes it harder to understand|Helps|Is kind",
      "After the news, you should...|Let them react and ask questions|Rush away|Change the subject",
      "Saying 'I'm sorry' sincerely shows...|Empathy|Weakness|Nothing",
      "Telling bad news late usually...|Makes things worse|Makes things better|Is required"
    ]),
    SC("Reappraising your nerves", "💓", "Fast heartbeat, sweaty hands and butterflies are the same body signals for fear and for excitement. Research suggests that telling yourself 'I'm excited' can help performance more than trying to 'calm down'. Combine with deep breathing, preparation and facing small speaking chances gradually.", "Think: the body signals can be relabeled.", "Before the debate I say, 'I'm excited, my body is getting ready', take three slow breaths, and start my first line.", [
      "Reappraisal means...|Relabeling nerves as excitement|Ignoring the audience|Never feeling anything",
      "Butterflies and a fast heartbeat can mean...|Fear or excitement|Only danger|Nothing",
      "Telling yourself 'I'm excited' can...|Help you perform|Make it worse always|Do nothing",
      "Preparation reduces anxiety because...|You know your material|It deletes nerves|It makes the audience leave",
      "Facing small speaking chances gradually builds...|Confidence|Fear|Silence",
      "Deep breathing helps...|Slow your body down|Speed up your heart|Hide the audience",
      "Trying to completely erase nerves is...|Usually unrealistic|Easy|Required"
    ]),
    SC("Listening with empathy", "💬", "Empathic listening means paying full attention to what someone feels, not rushing to fix. Reflect the feeling ('That sounds frustrating'), ask what they need, and avoid 'at least...' or 'you should...' too soon. Sometimes people want understanding first, advice second.", "Think: feel first, fix later, and only if asked.", "Friend: 'I bombed my audition.' Me: 'That sounds really disappointing. Do you want to talk it through, or would advice help?'", [
      "Empathic listening focuses on...|The speaker's feelings|Your own story|The clock",
      "A reflective response is...|'That sounds really frustrating.'|'Get over it.'|'Anyway, my day was worse.'",
      "Jumping in with advice too fast can...|Make the person feel unheard|Always help|Be perfect",
      "A good question is...|'Do you want advice or just someone to listen?'|'Why are you like this?'|'Who cares?'",
      "'At least it wasn't worse' usually...|Minimizes their feelings|Comforts everyone|Is required",
      "Empathy does not mean you must...|Agree with everything|Listen|Care",
      "Full attention includes putting away...|Distractions like your phone|Your friend|Your ears"
    ])
  ];

  // ================= LEVEL 24 =================
  const L24 = [
    SC("The five canons of rhetoric", "🏛️", "Ancient teachers organized the art of speaking into five canons: invention (finding what to say), arrangement (organizing it), style (choosing the words), memory (learning it) and delivery (voice and body). Use them as a checklist when you prepare any speech.", "Think of the five jobs in preparing a speech.", "For a speech about recycling: find facts (invention), order them (arrangement), pick vivid words (style), learn the key beats (memory), rehearse voice and gestures (delivery).", [
      "Invention is...|Finding what to say|Choosing gestures|Practicing aloud",
      "Arrangement is...|Organizing the parts of a speech|Choosing volume|Memorizing every word",
      "Style is about...|Word choice and language|Where you stand|The room's lights",
      "Memory is the canon of...|Learning and recalling your material|Inventing arguments|Applause",
      "Delivery covers...|Voice and body|Research|Topic choice",
      "There are ... canons of rhetoric.|Five|Three|Eight",
      "Researching your topic belongs to...|Invention|Delivery|Style"
    ]),
    SC("Metonymy and synecdoche", "👑", "Metonymy replaces a thing with something closely linked to it: 'the crown' for a monarchy, 'Washington' for the U.S. government, 'the press' for journalists. Synecdoche uses a part for the whole or the whole for a part: 'all hands on deck', 'new wheels' for a car. They make language compact and vivid.", "Ask whether it names something linked to it, or a part standing for the whole.", "'The White House announced' uses a building for the people in it: metonymy. 'Hired some new hands' uses hands for workers: synecdoche.", [
      "'The crown' meaning the monarchy is...|Metonymy|A syllogism|Chiasmus",
      "'All hands on deck' uses hands for sailors. This is...|Synecdoche|Metonymy only|Literal",
      "Synecdoche uses...|A part for the whole|An opposite|A sound",
      "'The press' meaning journalists is...|Metonymy|Alliteration|A pun",
      "'Nice wheels!' meaning a car is...|Synecdoche|A statistic|Hyperbole",
      "These devices help a speaker be...|Compact and vivid|Longer|Confusing",
      "'Hollywood released a new film' uses a place for an industry. This is...|Metonymy|Literal speech|Rhyme"
    ]),
    SC("Epistrophe and symploce", "🔁", "Anaphora repeats words at the start of lines. Epistrophe repeats words at the end: 'of the people, by the people, for the people' ends each part with 'the people'. Symploce combines both: the same start and the same end. These patterns give a speech rhythm, emphasis and memorability.", "Check where the repeated words are: at the start, the end, or both.", "'When there is a problem, we fix it. When there is a challenge, we face it. When there is a chance, we take it.' Same start, different ends.", [
      "Repeating words at the end of lines is...|Epistrophe|Anaphora|Oxymoron",
      "Repeating words at the start is...|Anaphora|Epistrophe|Metonymy",
      "Repeating both start and end is...|Symploce|Hyperbole|Irony",
      "'We work hard. We play hard. We win hard.' repeats at the...|Start of each line|End of each line|Middle only",
      "'Built by us, owned by us, run by us.' repeats at the...|Ends of the parts|Nowhere|Start only",
      "Why use repetition patterns?|They create rhythm and memory|They fill time|They confuse",
      "'Who wants it? You want it. Who earns it? You earn it.' repeats words...|At the start and the end|Only at the start|Not at all"
    ]),
    SC("Precedent and consequences", "📚", "Two kinds of support: precedent (it worked, or was ruled this way, before) and consequences (what will happen if we do or do not act). Precedent shows it is workable; consequences show why it matters. Check that the precedent is truly similar and the consequences are likely, not exaggerated.", "Ask: is it based on what happened before, or what will happen next?", "Precedent: three nearby towns tried the plan and it worked. Consequences: without it, our river will keep flooding the park.", [
      "Pointing to what happened in a similar past case is...|Precedent|Consequences|A pun",
      "Pointing to what will happen if we act or do not act is...|Consequences|Precedent|Anaphora",
      "A weak precedent is one that...|Is not truly similar|Is closely similar|Has data",
      "A weak consequence argument often...|Exaggerates the danger|Gives probabilities|Cites sources",
      "'This worked in the last ten similar schools' uses...|Precedent|Consequences|Scarcity",
      "'If we do nothing, the pond will dry up' uses...|Consequences|Precedent|Hedging",
      "Strong speakers check that consequences are...|Likely and supported|Terrifying|Made up"
    ]),
    SC("Policy plans and feasibility", "🛠️", "A strong policy proposal has a plan (what exactly we do), a reason (the problem and its cause), solvency (evidence that the plan fixes the problem), and feasibility (cost, time, who does it, and legality). Ideas without a plan sound good but cannot be judged.", "Think: problem, plan, solvency, feasibility.", "Problem: students lack safe bike storage. Plan: install racks by the gym. Solvency: schools with racks saw more biking. Feasibility: costs 800 dollars, funded by the PTA.", [
      "Solvency means...|Evidence that the plan fixes the problem|The cost|The speaker's tone",
      "Feasibility asks...|Can it be done, at what cost and by whom?|Is it exciting?|Is it long?",
      "A plan names...|Exactly what will be done|Only the problem|A feeling",
      "A proposal with no plan is hard to...|Judge and act on|Ignore|Rhyme",
      "Which belongs under feasibility?|Cost, time and who does it|A poem|A joke",
      "Showing the problem's cause helps because...|The plan should address it|It fills time|It scares people",
      "A good policy speech usually ends with...|A clear ask|A long list of doubts|Applause"
    ]),
    SC("Counterplans", "↔️", "A counterplan offers a different way to reach the same goal. If the other side proposes Plan A, you say 'we can solve the problem better with Plan B'. To win, show that Plan B solves the problem as well and avoids a cost or risk of Plan A. Simply being different is not enough.", "Ask whether the alternative solves the same problem and is better.", "Plan A: build a new gym. Plan B: schedule the existing gym more efficiently. If B solves crowding for less money, B beats A.", [
      "A counterplan is...|A different way to reach the same goal|The same plan again|A joke",
      "To win with a counterplan you must show it...|Solves the problem and avoids a cost of the original|Is just different|Is longer",
      "Simply being different...|Is not enough|Always wins|Is rude",
      "A counterplan must still...|Solve the problem|Ignore the problem|Add new problems",
      "Plan B beats Plan A if it...|Works as well and costs less or risks less|Costs more and works less|Is secret",
      "Responding to a counterplan, you can argue it...|Does not solve the problem fully|Is a poem|Has too many words",
      "A fair counterplan shares the other side's...|Goal|Seat|Slides"
    ]),
    SC("Reasons for decision", "🧾", "A judge explains who won and why: the key clash, which arguments were proven, and how they weighed. A good decision names the deciding issues and gives constructive tips. For you, this is a chance to learn: listen without defending, take notes and pick one improvement.", "Think: the deciding issue, the weighing, and a lesson for you.", "Judge: 'The team won because they showed the plan solves the problem, and the other side never answered that.' I note: always answer solvency.", [
      "A reason for decision explains...|Why one side won|Who is taller|Next week's topic",
      "A good decision names...|The key issues that decided the round|Only the score|Nothing",
      "When receiving feedback, a good approach is to...|Listen and take notes|Argue|Leave",
      "A useful takeaway is...|One specific thing to improve|Everything at once|Nothing",
      "Defending yourself during feedback...|Makes it harder to learn|Helps|Is required",
      "Judges weigh arguments by...|Which were proven and mattered most|Volume|Length",
      "Feedback is best used to...|Improve the next speech|Win the argument later|Complain"
    ]),
    SC("Interests versus positions", "🪑", "In a negotiation, a position is what someone says they want ('the window open'). An interest is why they want it ('fresh air'). Find interests and you can find options that meet both. Also know your BATNA: your best alternative to a negotiated agreement, which tells you when to walk away.", "Ask why each person wants it, not just what they asked for.", "Two people want the last orange. One needs the peel for baking, the other wants the juice. Understanding interests lets both win.", [
      "A position is...|What someone says they want|Why they want it|A pause",
      "An interest is...|The reason behind a position|The loudest request|A final offer",
      "Looking for shared interests helps find...|Options that meet both sides|Only one winner|Delays",
      "BATNA stands for...|Best alternative to a negotiated agreement|Big agreement tonight at noon|Better answer to nearly anything",
      "Knowing your BATNA tells you...|When a deal is worse than your alternative|How loud to be|What to wear",
      "Which question uncovers an interest?|'Why is that important to you?'|'Who said so?'|'What is your name?'",
      "A good negotiator focuses on...|Solving the problem together|Winning at any cost|Hiding everything"
    ]),
    SC("Bottom line up front", "⬆️", "When speaking to busy leaders, put the conclusion or request first (BLUF: bottom line up front), then give the reasons, then details. Do not make them wait for the point. Start with 'I recommend...' or 'The main finding is...' and end with a clear ask.", "Think: conclusion first, support after.", "'I recommend we move the fair to October. Three reasons: weather, venue and volunteers.' The ask comes first.", [
      "BLUF means...|Bottom line up front|Big loud useful finish|Blame last",
      "With busy leaders, start with...|The conclusion or request|A long background|A joke",
      "After the bottom line, you give...|Reasons and details|Nothing|A new topic",
      "A BLUF opener sounds like...|'I recommend we move the fair to October.'|'Let me start in 1998...'|'Um, so, well...'",
      "Making a listener wait for your point can...|Lose their attention|Impress them|Save time",
      "BLUF is the opposite of...|Building slowly to a final reveal|Being brief|Being clear",
      "The speech should end with...|A clear ask or next step|A mystery|Silence"
    ]),
    SC("Facilitating group conflict", "🧯", "When a group argues, a facilitator slows things down: set ground rules, let one person speak at a time, restate each view, separate the problem from the person, and look for shared goals. Take a short break if it heats up. The facilitator stays neutral.", "Think: slow, fair, neutral, shared goals.", "'Let's hear Jo first, then Eli. Jo, did I get your point right? What do you both want for the project?'", [
      "A facilitator's role is to...|Guide the conversation fairly|Take sides|Win the argument",
      "Restating each person's view shows...|They have been heard|You agree always|You are bored",
      "Letting one person speak at a time...|Keeps things fair and calm|Wastes time|Silences everybody",
      "When tempers rise, you can...|Call a short break|Shout louder|Ignore it",
      "Separate the problem from...|The person|The project|The room",
      "A neutral facilitator...|Does not take a side|Chooses a favorite|Mocks both",
      "A useful question is...|'What do we all want here?'|'Who is to blame?'|'Who started it?'"
    ]),
    SC("Teach it back", "🧑‍🏫", "The Feynman technique: explain an idea in simple words as if teaching a beginner, find the places where you stumble, go back and study those gaps, and then simplify again. If you cannot explain it simply, you may not understand it yet. Teaching is one of the best ways to learn.", "Think: explain simply, find gaps, review, repeat.", "I explain photosynthesis to my younger cousin. I get stuck on 'chlorophyll', so I look it up, then try again with a clear picture.", [
      "The Feynman technique starts with...|Explaining the idea simply|Memorizing the book|Skipping the topic",
      "When you stumble while explaining, you have found...|A gap in your understanding|A perfect result|Nothing",
      "After finding gaps, you should...|Go back and study them|Give up|Add jargon",
      "Explain it as if to...|A beginner|An expert only|Nobody",
      "Why is teaching a good way to learn?|It shows what you really understand|It is easy|It skips study",
      "Jargon can hide a lack of...|Understanding|Volume|Time",
      "The last step is to...|Simplify again|Stop forever|Add more jargon"
    ]),
    SC("Choose the channel", "📡", "Pick the medium that fits the message. Quick facts fit a text. Complex or emotional topics fit a call or face-to-face talk, where tone and reactions help. Important decisions need written records. Sensitive news should not arrive through a group chat. Ask what the listener will understand and feel.", "Think about how tricky and how emotional the message is.", "A simple 'We start at 3' fits a text. A disagreement about a project is better solved by a call or meeting.", [
      "A quick time and place reminder suits...|A short text|A long speech|A formal ceremony",
      "A tense disagreement is usually better handled...|By talking, in person or on a call|By group chat|By guessing",
      "Written records are useful for...|Important decisions|Jokes|Whispers",
      "Tone is easier to read in...|Voice and face-to-face talk|Short texts|Emoji",
      "Sensitive news should not be shared by...|A group chat|A private conversation|A careful call",
      "The right channel depends on...|The message and the listener|The weather|The font",
      "A complicated explanation is clearer with...|A conversation or a document with visuals|One ambiguous word|A rushed text"
    ]),
    SC("Stakes and change", "🌗", "In true storytelling, a story needs stakes (what could be lost or won) and a change (how you or your view changed). Without stakes, listeners do not care. Without change, it is an anecdote with no point. Tell about a specific moment, not a summary of a year.", "Ask what was at risk and what changed.", "Not 'I did debate for years' but a scene: 'Two minutes before my first round, my notes were gone. I had to speak from what I knew. I learned I knew more than I feared.'", [
      "Stakes are...|What could be won or lost|The ending|The volume",
      "A story with no change often feels...|Pointless|Gripping|Complete",
      "A strong storyteller picks...|One specific moment|A whole year summary|A list",
      "Why do listeners need stakes?|To care what happens|To fall asleep|To be quiet",
      "The change in a story may be in...|The teller's feelings or beliefs|The room temperature|The chairs",
      "Which is stronger?|A scene with a problem and a lesson|A list of dates|A vague summary",
      "Telling true stories means staying...|Honest|Dramatic regardless of facts|Silent about the facts"
    ]),
    SC("Humble confidence", "🌟", "Confident speakers show what they can do without bragging or putting themselves down. State your strengths with facts ('I led our team of five'), credit others, admit limits calmly ('I'm still learning X'), and speak steadily. Both boasting and constant apologizing weaken trust.", "Think: factual strengths, credit to others, calm honesty about limits.", "'I organized the food drive, and the team collected 400 cans. I'm still learning to delegate, so I asked a mentor for tips.'", [
      "Humble confidence means...|Stating strengths factually and admitting limits calmly|Bragging|Putting yourself down",
      "Which sounds humble and confident?|'I led our team of five and we finished early.'|'I'm the best ever.'|'It was nothing, I'm hopeless.'",
      "Giving credit to teammates...|Builds trust|Weakens you|Is never needed",
      "Constant apologizing can...|Weaken your message|Strengthen it|Charm everyone",
      "Admitting a limit calmly shows...|Honesty and maturity|Failure|Fear only",
      "Facts support confidence better than...|Vague boasts|Numbers|Examples",
      "A steady voice helps convey...|Calm confidence|Panic|Boredom"
    ]),
    SC("Leave-behinds and handouts", "📄", "A leave-behind is a short document you give after a talk so people remember and can act: key points, contact details for your team, sources to check, and the next step. Hand it out after your talk, not before, or people read instead of listening. Keep it one page and clear.", "Think: after, short, useful.", "After my talk on composting, I give a one-page sheet with three tips, a sources list, and a sign-up date.", [
      "A leave-behind is best given...|After the talk|Before the talk starts|Never",
      "Why not hand it out first?|People read instead of listening|It is too bright|It is heavy",
      "A good handout is...|One clear page|Twenty crowded pages|Blank",
      "It should include...|Key points, sources and a next step|Only a picture|Only a joke",
      "Listing sources lets listeners...|Check your claims|Skip your talk|Forget the point",
      "A leave-behind helps people...|Remember and act|Avoid the topic|Argue",
      "Handouts should repeat...|Your most important points|Every word of the speech|Nothing"
    ]),
    SC("Mirroring and rapport", "🪞", "Rapport is a feeling of connection. People build it naturally by matching a partner's pace, volume and posture a little, using their key words, and showing real interest. Subtle matching is natural; exact copying looks mocking. Rapport needs sincerity: you are trying to connect, not trick.", "Think: gentle matching plus real interest.", "My partner speaks slowly and calmly, so I slow down too, and I use her phrase 'a fresh start' when I reply.", [
      "Rapport is...|A feeling of connection|A kind of argument|A speech type",
      "Mirroring means...|Gently matching pace, tone or posture|Mimicking exactly|Ignoring them",
      "Exact copying can seem...|Mocking|Sincere|Natural",
      "Using the other person's key words shows...|You are listening|You are bored|You are lost",
      "Rapport should be built with...|Real interest|Tricks|Pressure",
      "If your partner speaks softly and slowly, matching a little can...|Help them feel at ease|Confuse them|Offend them",
      "Rapport helps conversations feel...|Comfortable|Awkward|Short"
    ]),
    SC("Uptalk and sentence endings", "↗️", "Uptalk is rising pitch at the end of a statement so it sounds like a question. It is common and can show friendliness or invite agreement, but in a formal talk it can make you sound unsure. Drop your pitch at the end of key claims for a firmer sound. Context decides what is best.", "Think about where your voice goes at the end of a statement.", "'The deadline is Friday?' sounds unsure. 'The deadline is Friday.' with a falling voice sounds clear.", [
      "Uptalk is...|Rising pitch on statements|Falling pitch on questions|Talking quickly",
      "In a formal talk, uptalk can make you sound...|Unsure|Certain|Aggressive",
      "To sound firm, end key claims with...|A falling pitch|A rising pitch|A giggle",
      "Uptalk can show...|Friendliness or an invitation to agree|Nothing about people|Anger only",
      "Context matters because...|The best style depends on the setting|There is one rule for all|Pitch does not matter",
      "Practice by recording and listening to...|Where your voice goes at sentence ends|Only the words|Only the room",
      "A statement should usually end with...|A clear, falling tone|A rising tone|A whisper"
    ]),
    SC("Making the ask", "🙋", "Many talks fail because they never ask for anything. Make a clear, specific ask: what you want the listener to do, by when, and how. Make it one action, make it easy, and say it near the end, then stop. 'Please sign up by Friday at the table outside' beats 'It would be nice if people helped.'", "Think: one specific action, easy to do, with a time.", "'If you agree, sign the sheet at the door before you leave tonight.' It names an action, a place and a time.", [
      "A strong ask is...|Specific, with an action and a time|Vague|Hidden",
      "Which ask is strongest?|'Please sign up by Friday at the table outside.'|'It would be nice if someone helped.'|'Maybe think about it.'",
      "A good ask makes the action...|Easy to do|Hard|Secret",
      "Where does the ask usually go?|Near the end|Never|Only the middle",
      "How many actions should you ask for?|One main action|Ten|None",
      "After you ask, you should...|Stop and let it land|Keep apologizing|Begin a new topic",
      "A talk without an ask often leaves listeners...|Unsure what to do|Motivated|Active"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 22: lvl(22, L22), 23: lvl(23, L23), 24: lvl(24, L24) });
})();
