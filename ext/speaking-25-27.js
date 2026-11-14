// ext/speaking-25-27.js  Mind Lab Speaking & Listening, levels 25-27 (60 lessons)
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

  // ================= LEVEL 25 =================
  const L25 = [
    SC("Three kinds of speeches", "🏛️", "Aristotle sorted speeches into three kinds. Deliberative speeches argue about the future: what should we do? Forensic (judicial) speeches argue about the past: what happened, and was it just? Epideictic speeches deal with the present: they praise or blame, as in a tribute.", "Match the time frame: future, past or present.", "A speech asking the town to build a bridge next year looks ahead, so it is the kind about choices for the future.", [
      "A speech urging a city council to adopt a new bus plan is...|Deliberative|Forensic|Epideictic",
      "A speech arguing about who was responsible for a past event is...|Forensic|Deliberative|Epideictic",
      "A tribute that praises a retiring teacher is...|Epideictic|Forensic|Deliberative",
      "Deliberative speeches focus mainly on the...|Future|Past|Dream world",
      "Forensic speeches focus mainly on the...|Past|Future|Weather",
      "Epideictic speeches usually focus on...|Praise or blame in the present|Votes in a legislature|Statistics only",
      "Which question belongs to a deliberative speech?|'What should we do next?'|'Who did it?'|'How great was she?'"
    ]),
    SC("The enthymeme", "🧩", "An enthymeme is an argument with one part left unsaid, because the audience already supplies it. 'Marta trained for months, so she will do well' hides the premise 'training leads to success'. Enthymemes are efficient, but you must make sure the hidden premise is one your audience really shares.", "Look for the missing step that the speaker expects you to fill in.", "'It is raining, so bring a jacket' leaves out 'rain makes you wet and cold'.", [
      "An enthymeme is an argument with...|An unstated premise|No conclusion at all|Only statistics",
      "In 'He volunteers weekly, so he cares about others', the hidden premise is...|People who volunteer care about others|He is busy|Weekly means often",
      "Enthymemes work best when the audience...|Shares the hidden premise|Disagrees with it|Has not heard of it",
      "A risk of enthymemes is that the hidden premise may be...|Weak or not shared|Too short|Too polite",
      "Aristotle saw the enthymeme as the rhetorical form of the...|Syllogism|Metaphor|Pause",
      "To test an enthymeme, you should...|State the missing premise out loud|Ignore it|Repeat it louder",
      "'Dark clouds are gathering, so cancel the picnic' hides the premise...|Dark clouds mean rain is likely|Picnics are fun|Clouds are gray"
    ]),
    SC("Identification", "🤝", "Rhetorician Kenneth Burke said persuasion works through identification: showing your audience that you share their values, experiences or goals. Common ground opens people up. But identification should be honest, and it never erases real differences.", "Ask what you truly share with these listeners.", "A coach says to a nervous team, 'I lost my first big match too.' That shared experience builds trust.", [
      "In Burke's view, persuasion depends on...|Identification with the audience|Speaking quickly|Using long words",
      "Which move builds identification?|Naming a value you truly share|Pretending to be someone else|Insulting the other side",
      "Using 'we' in a speech can build...|A sense of shared goals|Confusion|Distance",
      "Honest identification means you...|Stress real common ground|Invent fake similarities|Hide your views",
      "A speaker who ignores what the audience cares about risks...|Having no connection|Being too clear|Being too short",
      "Identification does not mean...|Erasing real differences|Finding shared values|Telling shared stories",
      "Telling a story from your listeners' world is a way to...|Show you understand them|Waste time|Avoid evidence"
    ]),
    SC("Audience analysis", "👥", "Good speakers study their listeners. Demographic analysis looks at age, education, background and group membership. Psychographic analysis looks at values, beliefs and attitudes. Situational analysis looks at size, setting, time of day and mood. Use all three to choose examples, language and tone.", "Decide whether the fact is about who they are, what they believe, or the setting.", "Learning that most listeners are teenagers is one kind of fact. Learning that they distrust advertising is a different kind.", [
      "A listener's age and education belong to...|Demographic analysis|Psychographic analysis|Situational analysis",
      "Values, beliefs and attitudes belong to...|Psychographic analysis|Demographic analysis|Situational analysis",
      "Room size, time of day and group mood belong to...|Situational analysis|Demographic analysis|Psychographic analysis",
      "Why analyze your audience?|To choose fitting examples and tone|To pick your clothes only|To avoid practice",
      "An audience that is tired after a long day calls for...|A shorter, livelier talk|A longer, denser talk|No talk at all",
      "Assuming everyone in a group thinks alike is a form of...|Stereotyping|Good analysis|Preparation",
      "Surveying listeners before a talk helps you learn their...|Attitudes and knowledge|Heights|Shoe sizes"
    ]),
    SC("The spotlight effect", "🔦", "The spotlight effect is our habit of overestimating how closely other people notice us. In studies, people feel that everyone saw their small slip, but most listeners barely noticed. Knowing this can lower stage fright and help you keep going after a mistake.", "Think about how much attention listeners really give to small errors.", "I stumble on a word and feel everyone saw. In truth, the room is mostly thinking about my message and their own worries.", [
      "The spotlight effect is overestimating how much...|Others notice you|Others hear you|Others like you",
      "After a small slip, most listeners...|Barely notice it|Remember it for years|Leave the room",
      "Knowing about the spotlight effect can help you...|Feel less anxious|Talk faster|Skip practice",
      "Who is thinking about your slip the most?|Usually you|Everyone in the room|The people far away",
      "A good response to a small mistake is to...|Fix it simply and continue|Apologize at length|Stop the talk",
      "The audience is mostly focused on...|Your message and their own thoughts|Every word you mispronounce|Your shoes",
      "The spotlight effect shows that our fears can be...|Bigger than reality|Always correct|Useless to examine"
    ]),
    SC("Internal previews and summaries", "🧭", "In a long speech, listeners cannot reread. An internal preview tells them what is coming in the next section ('Next I will show two causes'). An internal summary wraps up a section before moving on ('So we have seen that cost and time both matter'). Both act like road signs inside your talk.", "Decide whether the sentence looks ahead or looks back.", "'We have covered the problem. Now let us turn to solutions' sums up one part and previews the next.", [
      "An internal preview...|Tells what the next section will cover|Repeats the whole speech|Ends the talk",
      "An internal summary...|Recaps a section just finished|Introduces a brand new topic|Asks a question",
      "'Next, I will show you three ways to fix this' is a...|Preview|Summary|Quote",
      "'So, both cost and safety matter' is a...|Summary|Preview|Hook",
      "Why use them in long speeches?|Listeners cannot reread and need guidance|They make speeches longer for fun|They hide weak points",
      "Internal previews and summaries are most like...|Road signs|Decorations|Footnotes",
      "A good place for an internal summary is...|At the end of a main point|In the middle of a word|Before the title"
    ]),
    SC("The classical oration", "📜", "Roman and Greek teachers described six parts of a speech. The exordium opens and wins attention. The narratio gives background. The partitio previews the points. The confirmatio presents proofs. The refutatio answers objections. The peroratio concludes with a powerful close.", "Match each Latin name to its job in the speech.", "A speaker who spends two minutes answering objections is in the part called the refutatio.", [
      "The exordium is the...|Opening that gains attention|Closing appeal|Set of proofs",
      "The narratio gives...|Background on the issue|The final plea|A list of questions",
      "The partitio...|Previews the main points|Ends the speech|Tells a joke",
      "The confirmatio presents...|The proofs for your case|The greeting|The thank-you",
      "The refutatio answers...|Objections|The weather|Applause",
      "The peroratio is the...|Conclusion|Preview|Background",
      "Which part would explain how a problem began?|Narratio|Peroratio|Exordium"
    ]),
    SC("Models of communication", "🔁", "The linear model sees communication as a message traveling one way, from sender to receiver. The interactive model adds feedback, so the receiver responds. The transactional model says both people send and receive at the same time, shaped by a shared context. Real conversation is closest to the transactional model.", "Count how many directions the message and feedback move.", "A phone voicemail is nearly one-way. A lively talk, where both people react as they speak, is transactional.", [
      "Which model shows a message going one way only?|Linear|Transactional|Interactive",
      "Which model adds feedback from the receiver?|Interactive|Linear|None",
      "In the transactional model, people...|Send and receive at the same time|Take strict turns|Never respond",
      "A face-to-face chat with nods and replies fits the...|Transactional model|Linear model only|Telegraph model",
      "A recorded announcement with no reply fits the...|Linear model|Transactional model|Feedback model",
      "Feedback means...|The receiver's response to the message|The first draft|A microphone squeal",
      "Why is the transactional model realistic?|Roles overlap as people react while talking|People never respond|Only one person ever speaks"
    ]),
    SC("Kinds of noise", "📻", "Noise is anything that interferes with a message. Physical (external) noise is sound or distraction in the environment. Physiological noise comes from the body, like hunger or a headache. Psychological noise is worry or bias in the mind. Semantic noise is confusing words or jargon.", "Ask where the interference comes from: the room, the body, the mind or the words.", "A listener who is thinking about tomorrow's exam hears less of the talk. That is noise in the mind.", [
      "A loud lawn mower outside is...|Physical noise|Psychological noise|Semantic noise",
      "A pounding headache is...|Physiological noise|Physical noise|Semantic noise",
      "Worrying about a test during a talk is...|Psychological noise|Physical noise|Physiological noise",
      "Unexplained jargon is...|Semantic noise|Physiological noise|Physical noise",
      "To fight semantic noise, you should...|Define or replace hard terms|Speak faster|Add more jargon",
      "Noise in communication means...|Anything that interferes with the message|Only loud sounds|Only microphone problems",
      "Closing a window to block street sound reduces...|Physical noise|Semantic noise|Psychological noise"
    ]),
    SC("Listening styles", "👂", "Researchers describe four listening preferences. People-oriented listeners focus on feelings and relationships. Action-oriented listeners want clear, efficient points. Content-oriented listeners enjoy details and testing ideas. Time-oriented listeners want brevity. A flexible listener can shift styles to fit the situation.", "Think about what each listener cares about most.", "A friend shares bad news. The listener who first asks how you feel is using the people-oriented style.", [
      "A listener who focuses on feelings and relationships is...|People-oriented|Action-oriented|Time-oriented",
      "A listener who wants clear, efficient points is...|Action-oriented|People-oriented|Content-oriented",
      "A listener who loves details and tests ideas is...|Content-oriented|Time-oriented|People-oriented",
      "A listener who cares most about brevity is...|Time-oriented|Content-oriented|People-oriented",
      "A skilled listener will...|Shift styles to fit the situation|Use one style always|Stop listening",
      "To reach action-oriented listeners, a speaker should...|Get to the point and state next steps|Tell very long stories|Skip the main idea",
      "Knowing your own listening style helps you...|Notice your blind spots|Avoid all talks|Stop learning"
    ]),
    SC("Selective attention", "🎧", "At a noisy party you can follow one voice and tune out the rest. Yet if someone across the room says your name, you suddenly notice. This is the cocktail party effect, an example of selective attention: the brain filters what it attends to. Speakers need to earn attention, and listeners can choose where to put it.", "Think about how the brain filters sounds and what breaks through.", "A student in a busy cafeteria tunes out the noise but hears their own name mentioned at another table.", [
      "Selective attention means...|Focusing on some input and filtering other input|Hearing everything equally|Ignoring all sound",
      "The cocktail party effect is when you...|Notice your name in a noisy room|Cannot hear anyone|Hear only music",
      "Why do speakers need to earn attention?|Listeners filter what they attend to|Listeners never filter|Rooms are always quiet",
      "A listener can improve focus by...|Reducing distractions|Checking messages often|Looking away",
      "Using a listener's concerns in your opening...|Helps break through the filter|Makes them ignore you|Has no effect",
      "Multitasking while listening usually...|Lowers understanding|Raises understanding|Does not change anything",
      "Hearing your name across a room shows that attention is...|Filtered but flexible|Fixed forever|Random noise"
    ]),
    SC("The Johari window", "🪟", "The Johari window is a model of self-awareness with four panes. The open area is known to you and others. The blind area is known to others but not to you. The hidden area is known to you but not to others. The unknown area is known to neither. Asking for feedback shrinks the blind area; sharing appropriately shrinks the hidden one.", "Ask who knows the information: you, others, both or neither.", "A friend notices you often say 'um' when nervous, but you have never noticed. That sits in the pane known to others only.", [
      "Something known to you and to others is in the...|Open area|Blind area|Hidden area",
      "Something others see in you that you do not is in the...|Blind area|Open area|Unknown area",
      "Something you know but keep private is in the...|Hidden area|Blind area|Open area",
      "Something nobody has discovered yet is in the...|Unknown area|Open area|Hidden area",
      "Asking for feedback helps shrink the...|Blind area|Open area|Window frame",
      "The Johari window is a model of...|Self-awareness|Voice volume|Slide design",
      "Sharing information appropriately shrinks the...|Hidden area|Blind area|Unknown area"
    ]),
    SC("Self-disclosure", "🔓", "Self-disclosure is sharing information about yourself. Trust usually deepens when disclosure grows gradually and both people share at a similar level. Sharing too much too soon can make others uncomfortable. In public speaking, a carefully chosen personal story builds connection without oversharing, and you should never reveal private details that are not yours to share.", "Think about pace, balance and what is appropriate to share.", "A speaker shares a story about failing a first driving test to show persistence, and leaves out private family details.", [
      "Self-disclosure means...|Sharing information about yourself|Asking only questions|Keeping everything secret",
      "Trust tends to grow when disclosure is...|Gradual and mutual|Sudden and one-sided|Always dramatic",
      "Sharing too much too soon can make others feel...|Uncomfortable|Closer|Bored of silence",
      "In a speech, a personal story should be...|Chosen to serve your message|Packed with private details|Made up entirely",
      "Whose private details should you avoid revealing?|Other people's, without permission|Your own favorite food|Your opinion on a book",
      "Reciprocity in disclosure means...|Each person shares at a similar level|Only one person talks|Nobody shares",
      "Online, safe self-disclosure means...|Never posting private contact details|Posting your address|Sharing passwords"
    ]),
    SC("Confirming and disconfirming messages", "💬", "Confirming messages show that a person is seen and valued: listening, using their name, responding to what they said. Disconfirming messages ignore, dismiss or belittle them: interrupting, changing the subject, or saying 'you're overreacting'. Confirming does not mean agreeing; you can disagree and still acknowledge the person.", "Ask whether the person's worth and message were acknowledged.", "'I see why that upset you, and I would like to look at it differently' confirms the person while disagreeing with the view.", [
      "A confirming message shows the person is...|Seen and valued|Ignored|Wrong",
      "Which is disconfirming?|Changing the subject when someone shares a worry|Asking a follow-up question|Saying 'tell me more'",
      "Can you confirm a person and still disagree with them?|Yes, by acknowledging them while disagreeing|No, confirming means always agreeing|No, confirming means staying silent",
      "'You're overreacting' is usually...|Dismissing|Validating|Neutral",
      "Using someone's name and responding to what they said is...|Confirming|Disconfirming|Impossible",
      "Looking at your phone while a friend talks tends to feel...|Disconfirming|Confirming|Helpful",
      "A supportive climate grows from...|Mostly confirming messages|Mostly dismissive messages|Silence"
    ]),
    SC("Five conflict styles", "🧮", "Thomas and Kilmann described five ways people handle conflict. Competing pushes your own goal. Collaborating works with others to meet both goals. Compromising splits the difference. Avoiding sidesteps the issue. Accommodating gives in to the other person. No style is always best; choose by how important the issue and the relationship are.", "Ask how much the person cares about their goal and the relationship.", "Two friends who split a pizza evenly because they like different toppings are compromising.", [
      "Working together to meet both sides' goals is...|Collaborating|Competing|Avoiding",
      "Pushing for your own way is...|Competing|Accommodating|Compromising",
      "Each side giving up a little, to meet in the middle, is...|Compromising|Collaborating|Competing",
      "Sidestepping the issue is...|Avoiding|Accommodating|Collaborating",
      "Giving in to keep the peace is...|Accommodating|Competing|Compromising",
      "Which style fits a tiny issue not worth a fight?|Avoiding|Competing|Collaborating",
      "Which style suits an important issue where both sides' needs matter?|Collaborating|Avoiding|Accommodating"
    ]),
    SC("Personal space zones", "📏", "Anthropologist Edward Hall named four distance zones in North American settings. Intimate distance is very close, up to about 18 inches. Personal distance runs roughly 1.5 to 4 feet, for friends. Social distance, about 4 to 12 feet, suits business and classroom talk. Public distance is beyond about 12 feet, for speakers and large groups. Cultures differ, so watch for signals of comfort.", "Match the setting to how far apart people usually stand.", "A teacher addressing the class from the front of the room usually stands in the social zone, not the intimate one.", [
      "The study of how people use space and distance is...|Proxemics|Kinesics|Semantics",
      "Public speaking to a large audience falls in the...|Public zone|Intimate zone|Personal zone",
      "Chatting with a friend usually uses the...|Personal zone|Public zone|Social zone",
      "Business and classroom talk usually use the...|Social zone|Intimate zone|Public zone",
      "The closest zone is the...|Intimate zone|Public zone|Social zone",
      "If a listener steps back, a good response is to...|Give them more space|Move closer|Ignore it",
      "Comfortable distances...|Differ across cultures|Are identical everywhere|Never matter"
    ]),
    SC("Cognitive load and slides", "🧠", "Working memory can hold only a little at once. Slides with lots of text, busy backgrounds and decorative extras overload listeners, so they understand less. Research on multimedia learning suggests: remove extras, highlight what matters, and avoid reading dense text aloud while the same text sits on the screen, because listeners read faster than you speak and the two compete.", "Think about what makes listeners work harder than they need to.", "A slide with one clear chart and a short title is easier to absorb than the same chart buried beside paragraphs and clip art.", [
      "Cognitive load is the...|Mental effort needed to process information|Weight of the laptop|Length of the speech",
      "A slide crowded with text tends to...|Overload listeners|Help memory|Cut down on effort",
      "Reading paragraphs aloud from a slide often...|Competes with what listeners are reading|Improves recall|Impresses all listeners",
      "To lower cognitive load, you should...|Remove decoration that does not teach|Add more animations|Use tiny fonts",
      "A good slide supports...|One main idea|Ten ideas at once|No ideas",
      "Highlighting the key part of a chart helps by...|Guiding attention|Hiding the data|Adding noise",
      "Working memory is...|Limited|Unlimited|Not used in listening"
    ]),
    SC("Base rate neglect", "🎲", "Base rate neglect is ignoring how common something is in the first place. Suppose a test for a rare condition is 90 percent accurate but only 1 in 100 people have it. Most positive results will then be false alarms, because so many healthy people are tested. Speakers and listeners should ask: out of how many?", "Ask how common the event is overall before judging a single case.", "A test flags 5 percent of healthy people wrongly. In a group of 1,000 healthy people, that is about fifty false alarms.", [
      "Base rate neglect is ignoring...|How common something is overall|The speaker's age|The room temperature",
      "A test for a very rare condition will often give...|Many false alarms|No errors|Only true results",
      "The best question to ask is...|Out of how many?|How loud is it?|Who said it first?",
      "A vivid story about one case can hide the...|Overall rate|Speaker's name|Time of day",
      "A trustworthy speaker presents...|Rates along with stories|Stories only|Neither",
      "If a condition affects 1 in 10,000 people, a single positive test is...|Less certain than it sounds|Always certain|Impossible",
      "Giving both the story and the base rate helps listeners...|Judge more fairly|Get confused|Stop thinking"
    ])
  ];

  // ================= LEVEL 26 =================
  const L26 = [
    SC("The elaboration likelihood model", "🛣️", "Petty and Cacioppo's model says there are two routes to persuasion. On the central route, people think carefully about the arguments, which happens when they care and can follow. On the peripheral route, they rely on cues like a speaker's style, fame or the sheer number of reasons. Central-route changes tend to last longer.", "Ask whether listeners are weighing arguments or following surface cues.", "A listener who studies a report's evidence is on the central route. One who buys because a celebrity endorsed it is on the other route.", [
      "Careful thinking about arguments is the...|Central route|Peripheral route|Silent route",
      "Reacting to a speaker's fame or style is the...|Peripheral route|Central route|Logical route",
      "Which route usually gives longer-lasting change?|Central|Peripheral|Neither",
      "People take the central route more when they...|Care about the topic and can follow it|Are bored and distracted|Are not listening",
      "A speaker facing an expert audience should rely on...|Strong evidence and reasoning|Only charm|Only fame",
      "Counting how many reasons were given, without checking them, is a...|Peripheral cue|Central argument|Proof",
      "ELM stands for...|Elaboration Likelihood Model|Eloquent Listening Method|Extended Logic Map"
    ]),
    SC("Cognitive dissonance", "⚖️", "Leon Festinger found that people feel uncomfortable when their beliefs and actions clash, such as caring about health yet skipping exercise. This discomfort is cognitive dissonance. People reduce it by changing the behavior, changing the belief, or adding a justification. Persuaders can raise awareness of the gap, but should then offer a real, honest path to resolve it.", "Look for a clash between what someone believes and what they do.", "A person who values the environment but never recycles may feel uneasy; a speaker can point to an easy first step.", [
      "Cognitive dissonance is the discomfort of...|Conflicting beliefs and actions|Speaking quickly|Losing a debate",
      "A way to reduce dissonance is to...|Change the behavior|Ignore the discomfort forever|Stop thinking entirely",
      "Another way to reduce dissonance is to...|Add a justification|Raise the volume|Leave a pause",
      "Who proposed the theory?|Leon Festinger|Aristotle|Edward Hall",
      "A persuader who points to a gap and offers a real solution is...|Using dissonance responsibly|Cheating|Wasting time",
      "Someone who values honesty but told a lie may feel...|Dissonance|Perfect calm|Applause",
      "Dissonance helps explain why people...|Defend choices they already made|Never change|Always agree"
    ]),
    SC("Inoculation against misinformation", "💉", "Inoculation theory, from William McGuire, works like a vaccine. If you preview a weakened form of a misleading argument and show why it fails, people resist the real version later. This is sometimes called pre-bunking. It works better than waiting until a false claim has spread and then trying to correct it.", "Think of a vaccine: a small safe dose builds resistance.", "A teacher warns, 'You may see ads claiming one trick fixes everything. Here is how that trick works,' before students meet the real ads.", [
      "Inoculation in persuasion means...|Previewing and answering a weak version of a counterargument|Hiding opposing ideas|Repeating your claim",
      "Pre-bunking happens...|Before a false claim spreads|After everyone believes it|Never",
      "Inoculation is compared to a...|Vaccine|Megaphone|Podium",
      "Who developed inoculation theory?|William McGuire|Kenneth Burke|Edward Hall",
      "Why preview a weak version?|It builds resistance to the real thing|It confuses listeners|It ends the talk",
      "Explaining the technique behind a misleading ad helps listeners...|Spot it later|Forget it|Believe it more",
      "Compared with correcting afterward, pre-bunking can be...|More protective|Useless|Longer"
    ]),
    SC("One-sided or two-sided?", "↔️", "A one-sided message gives only your case. A two-sided message mentions the opposing view too. Studies find that two-sided messages that also refute the other side are usually more persuasive, especially with informed or skeptical listeners, because they signal fairness. A one-sided message is more suitable when listeners already agree and know little about the counterarguments.", "Think about who is listening: informed, skeptical or already convinced.", "To a skeptical town board, a proposal that names two objections and answers them tends to be taken more seriously.", [
      "A two-sided message...|Mentions the other view too|Hides the other view|Uses only questions",
      "Two-sided messages that refute the other side tend to be...|More persuasive with skeptics|Less fair|Always weaker",
      "With a skeptical, informed audience, which works better?|Two-sided and refuted|One-sided only|No evidence",
      "A two-sided message signals...|Fairness|Weakness|Fear",
      "Mentioning an opposing view without answering it can...|Leave listeners unconvinced|Always win|Remove the topic",
      "A one-sided message may be fine when the audience...|Already agrees and knows little of the other side|Strongly disagrees|Is expert in the opposing view",
      "Presenting the other side honestly requires you to describe it...|Fairly, in its stronger form|As a joke|In one word"
    ]),
    SC("Latitudes of acceptance", "🎯", "Sherif and Hovland's social judgment theory says everyone has a latitude of acceptance (positions they could accept), a latitude of rejection (positions they refuse) and a latitude of non-commitment. A message close to a listener's view can pull them closer. A message too far away lands in rejection and may push them further away. Big changes usually come in small steps.", "Ask how far the message is from where the listener already stands.", "To move a listener who strongly opposes a plan, a speaker may ask only for a small trial of it.", [
      "The positions a listener could accept are the...|Latitude of acceptance|Latitude of rejection|Latitude of silence",
      "Positions a listener refuses are in the...|Latitude of rejection|Latitude of acceptance|Latitude of speed",
      "A message far from the listener's view often...|Falls in rejection|Wins them over fast|Is ignored completely",
      "A good strategy for a very resistant audience is to...|Move in small steps|Demand total change|Insult their view",
      "Social judgment theory was developed by...|Sherif and Hovland|Aristotle and Plato|Grice and Austin",
      "A message near a listener's views can...|Pull them closer|Never work|Make them leave",
      "The latitude of non-commitment holds positions the listener is...|Neutral about|Certain about|Offended by"
    ]),
    SC("Argument schemes", "🧱", "Douglas Walton described common patterns of everyday argument. Argument from authority: an expert says so. From cause: this led to that. From example: here is a case that shows the rule. From analogy: two things are alike, so what holds for one holds for the other. From sign: a clue points to a conclusion. Each pattern has its own questions to test it.", "Name the pattern: expert, cause, example, analogy or sign.", "'Smoke is rising, so there is a fire' is a reasoning pattern that treats smoke as a clue.", [
      "'Dr. Lee, a heart specialist, says walking helps the heart' is an argument from...|Authority|Analogy|Sign",
      "'Heavy rain made the river flood' is an argument from...|Cause|Authority|Example",
      "'Town A cut waste with a recycling program, so Town B can too' is an argument from...|Analogy|Sign|Authority",
      "'The sky is red at dawn, so a storm may come' is an argument from...|Sign|Example|Cause",
      "'This school started a garden and grades rose, so gardens help' is an argument from...|Example|Authority|Sign",
      "Why name the scheme of an argument?|To know which questions to ask about it|To make it longer|To skip checking",
      "Argument from analogy depends on the two cases being...|Alike in relevant ways|Exactly equal in size|From the same year"
    ]),
    SC("Critical questions", "❓", "Each argument pattern comes with critical questions that test it. For authority: Is the person an expert in this specific field? Do other experts agree? Do they have a bias or stake? For cause: Could something else explain it, or is it just coincidence? For analogy: Are the cases similar in the ways that matter? A good listener asks these before accepting the claim.", "Choose the question that checks the weak point of the pattern.", "Before trusting a famous athlete about medicine, ask whether sports fame makes them an expert in medicine.", [
      "A good question to test an argument from authority is...|Is this person an expert in this exact field?|Is the person famous?|Is the person tall?",
      "Another test for authority is...|Do other experts agree?|Is the quote long?|Is it in bold?",
      "A good question for an argument from cause is...|Could something else explain it?|Was it said loudly?|Is it recent?",
      "A good question for an argument from analogy is...|Are the cases alike in the ways that matter?|Do both begin with the same letter?|Are they near each other?",
      "A bias check asks whether the source has...|A stake in the result|A nice voice|A long title",
      "Critical questions help listeners...|Evaluate before accepting|Reject everything|Interrupt constantly",
      "Asking 'Is this just coincidence?' tests an argument from...|Cause|Authority|Sign"
    ]),
    SC("Reductio ad absurdum", "🪞", "Reductio ad absurdum means reducing to the absurd. You take your opponent's principle, follow it to its logical consequences, and show that it leads to something nobody would accept. It is a legitimate form of reasoning when the consequences truly follow. It becomes a slippery slope fallacy if the steps are exaggerated or unlikely.", "Check whether the absurd result truly follows from the principle.", "'If anything unsafe must be banned, then ladders, stairs and bicycles must go. Surely we want a better rule.' That tests the principle.", [
      "Reductio ad absurdum shows that a principle...|Leads to an unacceptable result|Is popular|Is old",
      "It is a fair argument when the consequences...|Truly follow from the principle|Are exaggerated|Are invented",
      "It becomes a fallacy when the steps are...|Exaggerated or unlikely|Careful|Logical",
      "The Latin phrase means reducing to...|The absurd|The brief|The loud",
      "A speaker using it should state the principle...|Fairly and accurately|As a caricature|In code",
      "The best reply to a weak reductio is to...|Show the absurd result does not follow|Shout|Leave",
      "Reductio is used to challenge a...|Rule or principle|Speaker's clothing|Microphone"
    ]),
    SC("Appeal to nature", "🌿", "The appeal to nature fallacy assumes that natural means good and unnatural means bad. But arsenic and poison ivy are natural, and vaccines and eyeglasses are made by people yet help. Whether something is natural does not decide whether it is safe, healthy or right. Ask for evidence about the thing itself.", "Ask what the evidence shows about the thing, not whether it is natural.", "'It is all natural' on a label tells you the source of an ingredient, not whether it is safe.", [
      "The appeal to nature assumes natural things are...|Good|Always rare|Always cheap",
      "Which shows the fallacy?|'It is natural, so it must be safe'|'Studies show it is safe'|'It was tested twice'",
      "Is poison ivy natural?|Yes, and harmful|No, and harmless|No, and harmful",
      "Man-made things like vaccines can be...|Helpful|Always harmful|Always natural",
      "What should replace 'it is natural'?|Evidence about safety and effect|A louder claim|A famous name",
      "A label saying 'all natural' tells you...|Very little about safety|That it is healthy|That it is tested",
      "The best response to this fallacy is to ask...|What does the evidence show?|Is it old?|Is it pretty?"
    ]),
    SC("The Texas sharpshooter", "🎯", "The Texas sharpshooter fallacy is named for a person who fires at a barn wall and then paints a target around the tightest cluster of bullet holes. In reasoning, it means searching through data, finding a pattern, and then claiming the pattern was predicted. Honest researchers state their question first, then test it, preferably on fresh data.", "Ask whether the claim was made before or after looking at the data.", "A speaker scans fifty statistics, finds one that lines up, and says it proves their theory. The target was painted after the shots.", [
      "The Texas sharpshooter fallacy is finding a pattern and then...|Claiming it was the plan all along|Testing it on new data|Dropping it",
      "The fallacy gets its name from painting a target...|After the shots are fired|Before the shots|On a different wall",
      "To avoid it, state your question...|Before looking at the data|After seeing the results|Never",
      "Testing a pattern on fresh data helps to...|Check if it holds up|Hide the pattern|Make it larger",
      "Looking at fifty statistics and picking the best match is...|Risky for false patterns|Always rigorous|Illegal",
      "Which is an honest approach?|Predict, then test|Search, then say you predicted|Delete misses quietly",
      "With enough data, random patterns will...|Appear by chance|Never appear|Be perfect"
    ]),
    SC("Hypophora and prolepsis", "🗣️", "Hypophora is asking a question and answering it yourself: 'Why does this matter? Because every vote counts.' Prolepsis is raising an objection before the audience does and answering it: 'Some of you may say this costs too much. Consider the price of doing nothing.' Both keep the audience engaged and show you have thought about the other side.", "Notice whether the speaker answers their own question or heads off an objection.", "'You may wonder: who will pay? The answer is the people who benefit.' This asks and answers in one breath.", [
      "Asking a question and answering it yourself is...|Hypophora|Prolepsis|Apostrophe",
      "Raising and answering an objection before it is voiced is...|Prolepsis|Hypophora|Zeugma",
      "'Some will say it is too late. It is not.' is an example of...|Prolepsis|Hypophora|Allusion",
      "'What do we need? Courage.' is an example of...|Hypophora|Prolepsis|Chiasmus",
      "How is hypophora different from a rhetorical question?|The speaker supplies the answer|It has no question mark|It is silent",
      "Prolepsis shows the speaker has...|Considered other views|Forgotten the topic|Given up",
      "Both devices help to...|Keep listeners engaged|Lengthen the pauses|Hide the argument"
    ]),
    SC("Apostrophe and personification", "💫", "In rhetoric, apostrophe means turning to address someone or something absent or not human: 'O freedom, how long we have waited for you!' Personification gives human qualities to ideas or objects: 'the city never sleeps'. Both create emotion and vivid images, but they are best used sparingly in a speech so they do not sound forced.", "Notice who or what is being addressed, or which thing acts like a person.", "'Wind, carry my greetings' addresses the wind directly. 'The wind whispered' gives it a human action.", [
      "Speaking directly to an absent person or thing is...|Apostrophe|Hypophora|Metonymy",
      "Giving human qualities to an idea is...|Personification|Understatement|Allusion",
      "'The city never sleeps' is...|Personification|Apostrophe|Simile",
      "'O time, slow down!' is...|Apostrophe|Hypophora|Symploce",
      "In rhetoric, apostrophe does not mean...|A punctuation mark|Direct address|An emotional effect",
      "Overusing these devices can make a speech sound...|Forced|Plain|Quiet",
      "Both devices help create...|Emotion and vivid images|Statistics|Silence"
    ]),
    SC("The stages of a team", "🪜", "Bruce Tuckman described stages of team development. In forming, members meet and are polite. In storming, differences and conflict surface. In norming, they agree on rules and ways of working. In performing, the team works well toward its goal. Adjourning is when the project ends. Conflict in storming is normal, and good communication helps a group move forward.", "Think about the order: meet, clash, agree, perform, finish.", "A new project team that spends its first week being polite and unsure is in the first stage.", [
      "The first stage, when members meet politely, is...|Forming|Storming|Norming",
      "The stage where differences and conflict appear is...|Storming|Forming|Performing",
      "The stage where the group sets rules and ways of working is...|Norming|Adjourning|Storming",
      "The stage where the team works well toward its goal is...|Performing|Forming|Storming",
      "The stage when the project ends is...|Adjourning|Norming|Forming",
      "Conflict in the storming stage is...|Normal and workable|A sign to quit|Never present",
      "Who described these stages?|Bruce Tuckman|Edward Hall|Kenneth Burke"
    ]),
    SC("Groupthink", "🐑", "Irving Janis used the word groupthink for the way cohesive groups can drift into poor decisions because members want agreement more than honest evaluation. Warning signs include self-censorship, pressure on dissenters and an illusion that everyone agrees. Remedies include inviting outside views, assigning a critic, letting the leader speak last, and collecting opinions privately first.", "Ask whether the group values agreement over honest evaluation.", "A team that stays silent about doubts because the leader seems certain may be heading for groupthink.", [
      "Groupthink is when groups prioritize...|Agreement over honest evaluation|Speed over taste|Fun over work",
      "A warning sign of groupthink is...|Self-censorship|Open debate|Written minutes",
      "One remedy is to...|Assign someone to challenge the plan|Silence dissenters|Vote by shouting",
      "Having the leader speak last helps because...|Others share views without being influenced|It saves time|It is polite",
      "Who named groupthink?|Irving Janis|Sherif|Burke",
      "Collecting opinions privately first helps to...|Reveal true views|Delay the vote|Confuse members",
      "An illusion of unanimity is believing...|Everyone agrees when some may not|Everyone is absent|Nobody is listening"
    ]),
    SC("Social loafing", "🛋️", "Social loafing is the tendency to put in less effort in a group, especially when individual contributions cannot be seen. Max Ringelmann noticed that people pulling a rope in a group pulled less than the sum of what each could alone. To reduce loafing, give each person a clear role, keep groups small, and make progress visible.", "Ask whether each person's effort is visible and clearly assigned.", "In a group project with one shared grade and no assigned jobs, it is easy to assume someone else will do the work.", [
      "Social loafing is...|Putting in less effort in a group|Working harder in a group|Speaking more slowly",
      "Loafing is more likely when contributions are...|Hard to identify|Clearly tracked|Rewarded separately",
      "One way to reduce loafing is to...|Give each person a clear role|Make the group bigger|Hide the tasks",
      "Smaller groups tend to have...|Less loafing|More loafing|No leaders",
      "Making progress visible...|Helps accountability|Hurts motivation always|Is pointless",
      "A group project with no assigned parts risks...|Uneven effort|Perfect balance|Nothing",
      "Naming each person's piece of the presentation helps to...|Show who is responsible|Cut the time|Remove the topic"
    ]),
    SC("Consensus decision-making", "🖐️", "Consensus means working until everyone can live with a decision and support it, even if it is not their first choice. It is slower than a majority vote but can build commitment. Tools include going around the circle, and a 'fist to five' check where each person shows how strongly they support the idea. Consensus is not the same as unanimous delight.", "Think about whether everyone can support the decision, not whether everyone loves it.", "If a group's fist-to-five check shows several people at one finger, the group should keep discussing before deciding.", [
      "Consensus means everyone can...|Live with and support the decision|Vote against it|Skip the meeting",
      "Compared with a majority vote, consensus is usually...|Slower but builds commitment|Faster and weaker|The same",
      "A fist-to-five check shows each member's...|Level of support|Age|Height",
      "A low score in a fist-to-five check means the group should...|Keep discussing|End at once|Take a vote anyway",
      "Consensus does not require...|Everyone's first choice|Respectful listening|Shared understanding",
      "In a majority vote, a decision is made when...|More than half agree|All applaud|Nobody objects",
      "Going around the circle helps make sure...|Everyone has a say|Only leaders speak|Nobody talks"
    ]),
    SC("High-context and low-context", "🌐", "Edward Hall described communication styles on a spectrum. In high-context communication, much of the meaning is carried by the situation, relationships, tone and what is left unsaid. In low-context communication, meaning is put into explicit words. Neither is better, and individuals vary, so check understanding and avoid stereotyping a whole culture.", "Ask how much of the meaning is in the words versus the situation.", "A speaker who says 'that might be difficult' to mean 'no' is relying on the listener to read the context.", [
      "Meaning carried by situation, tone and what is unsaid is...|High-context|Low-context|No-context",
      "Meaning put into direct, explicit words is...|Low-context|High-context|Silent",
      "Who described this spectrum?|Edward Hall|Irving Janis|Bruce Tuckman",
      "Across the two styles, which is better?|Neither is better|High-context always|Low-context always",
      "With a mixed audience, a speaker should...|Check understanding|Assume everyone shares their style|Speak faster",
      "Stereotyping a whole culture by style is...|Unwise because individuals vary|Always correct|Required",
      "'That might be difficult' as a polite 'no' relies on...|Context to be understood|Exact numbers|Loudness"
    ]),
    SC("Supportive and defensive climates", "☂️", "Jack Gibb found that some messages make people defensive and others make them open. Evaluation ('you always get this wrong') invites defense; description ('I noticed three errors') invites problem solving. Control invites resistance; problem orientation invites teamwork. Superiority and certainty close people off; equality and open-mindedness invite them in.", "Choose the wording that describes and invites, rather than judges and commands.", "Instead of 'You are so careless', try 'The numbers on page two do not match. Can we check them together?'", [
      "Which wording is more likely to make someone defensive?|'You always get this wrong'|'I noticed three errors'|'Let us check together'",
      "Describing what you observed tends to create a...|Supportive climate|Defensive climate|Silent climate",
      "Problem orientation means...|Working on the problem together|Telling others what to do|Finding someone to blame",
      "Which signals equality?|'I would like your view'|'I know best'|'Do it my way'",
      "Certainty in tone, like 'There is no other way', tends to...|Close people off|Invite discussion|Build trust",
      "Gibb studied how communication affects...|Defensiveness and openness|Voice volume|Slide length",
      "'Can we find a fix together?' is an example of...|Problem orientation|Control|Superiority"
    ])
  ];

  // ================= LEVEL 27 =================
  const L27 = [
    SC("Grice's maxims", "📐", "Philosopher Paul Grice said cooperative conversation follows four maxims. Quantity: give enough information, not too much. Quality: say what you believe is true. Relation: be relevant. Manner: be clear and orderly. When a speaker deliberately breaks a maxim, listeners infer extra meaning: answering 'Is he a good cook?' with 'He has a nice smile' hints the answer is no.", "Match the problem to the maxim: how much, how true, how relevant, how clear.", "Answering 'What time is it?' with a history of clocks breaks the maxim about giving the right amount.", [
      "Giving the right amount of information is the maxim of...|Quantity|Quality|Manner",
      "Saying only what you believe to be true is the maxim of...|Quality|Relation|Quantity",
      "Staying relevant is the maxim of...|Relation|Manner|Quality",
      "Being clear and orderly is the maxim of...|Manner|Quantity|Relation",
      "Who proposed the maxims?|Paul Grice|John Austin|Kenneth Burke",
      "Rambling in a confusing order breaks the maxim of...|Manner|Quality|Relation",
      "When a speaker deliberately breaks a maxim, listeners often...|Infer extra meaning|Stop listening|Assume it was random"
    ]),
    SC("Speech acts", "🎬", "J. L. Austin noticed that words can do things, not just describe. Saying 'I promise' creates a promise; saying 'I apologize' performs an apology. Searle sorted speech acts: assertives state facts, directives try to get someone to act, commissives commit the speaker, expressives show feelings, and declarations change a status. The effect on a listener is the perlocutionary effect.", "Ask what the words are doing: stating, asking, promising, feeling or declaring.", "'I will meet you at noon' commits the speaker to a future action, so it is a promise-type act.", [
      "'I promise to finish the report' is a...|Commissive|Directive|Assertive",
      "'Please close the door' is a...|Directive|Expressive|Commissive",
      "'The meeting starts at noon' is an...|Assertive|Directive|Expressive",
      "'Thank you so much!' is an...|Expressive|Directive|Declaration",
      "Words that change a status, like 'This meeting is adjourned', are...|Declarations|Assertives|Directives",
      "Speech act theory says that words can...|Do things as well as describe|Only describe|Never matter",
      "Who first developed speech act theory?|J. L. Austin|Kenneth Burke|Edward Hall"
    ]),
    SC("Uncertainty reduction", "🔎", "Berger and Calabrese's uncertainty reduction theory says that when we meet someone new, we feel uncertain and try to predict their behavior. We reduce uncertainty by watching, asking questions and sharing information. As uncertainty falls, we usually feel more comfortable. A speaker can lower an audience's uncertainty by stating the plan and purpose early.", "Think about how asking and observing make new situations feel safer.", "A new student asks classmates a few simple questions to figure out the group's habits. That is reducing uncertainty.", [
      "According to the theory, strangers first try to...|Reduce uncertainty about each other|Win an argument|Avoid all talk",
      "One way to reduce uncertainty is to...|Ask questions|Stay silent|Refuse to share",
      "A speaker can lower audience uncertainty by...|Stating the plan and purpose early|Hiding the topic|Starting with noise",
      "As uncertainty drops, people usually feel...|More comfortable|More confused|Colder",
      "Observing how others behave is an example of...|Passive information seeking|Fixing a microphone|Reading a script",
      "Who proposed the theory?|Berger and Calabrese|Sherif and Hovland|Janis and Tuckman",
      "Sharing information about yourself appropriately...|Helps others predict you|Reduces trust|Is never useful"
    ]),
    SC("Expectancy violations", "😮", "Judee Burgoon's theory says people hold expectations about how others will behave, such as how close they stand or how they greet. When someone breaks an expectation, we pay close attention. Whether the violation is judged good or bad depends on how much we value the person: a violation by a respected speaker may be seen as positive, while the same act by a disliked person may be negative.", "Ask whether the expectation was broken, and how the person is valued.", "If a manager normally sends long formal emails and suddenly sends a short friendly note, people notice and interpret it.", [
      "Expectancy violations theory says broken expectations...|Draw attention|Go unnoticed|Always please people",
      "How a violation is judged depends partly on how much we...|Value the person|Dislike the room|Know the date",
      "Expectations include things like...|Personal space and greetings|Zip codes|Shoe brands",
      "A violation by a respected person is more likely to be seen as...|Positive|Negative always|Meaningless",
      "Who developed the theory?|Judee Burgoon|Paul Grice|Irving Janis",
      "A speaker who surprises the audience with a bold start is...|Violating expectations on purpose|Reading a script|Being invisible",
      "Violating expectations can be risky because it...|May be judged negatively|Always helps|Is illegal"
    ]),
    SC("Communication accommodation", "🎚️", "Howard Giles's communication accommodation theory describes how speakers adjust their speech to others. Convergence means becoming more like the other person's style, such as pace or vocabulary, which often builds rapport. Divergence emphasizes differences. Maintenance means keeping your own style. Over-accommodating, like speaking in an exaggerated slow way to adults, can offend.", "Ask whether the speaker is moving toward, away from or staying with the other's style.", "A doctor who slows down and uses simpler words with a nervous patient is converging, as long as she is respectful and not talking down.", [
      "Becoming more like the other person's speech style is...|Convergence|Divergence|Maintenance",
      "Emphasizing differences in how you speak is...|Divergence|Convergence|Rapport",
      "Keeping your own style regardless of the listener is...|Maintenance|Convergence|Noise",
      "Convergence often builds...|Rapport|Distance|Confusion",
      "Over-accommodating, such as talking down to someone, can...|Offend|Always help|Be invisible",
      "Who proposed the theory?|Howard Giles|Kenneth Burke|Berger",
      "A speaker who adjusts pace and vocabulary to the listener is using...|Accommodation|Distortion|Interruption"
    ]),
    SC("Agenda setting and priming", "📰", "Maxwell McCombs and Donald Shaw found that news media may not tell people what to think, but strongly shape what they think about: topics covered often seem more important. Priming goes a step further: heavy coverage of an issue makes it the yardstick people use to judge leaders or events. Knowing this helps listeners ask what is missing from the coverage.", "Separate what to think about from what to think.", "If a news site runs many stories about traffic and few about housing, readers may judge local leaders mostly by traffic.", [
      "Agenda setting says the media influence...|What people think about|What people have for lunch|How tall people are",
      "Heavy coverage of a topic makes it seem...|More important|Less important|Fictional",
      "Priming means coverage shapes the...|Standards used to judge leaders|Weather forecast|Size of headlines only",
      "Who studied agenda setting?|McCombs and Shaw|Sherif and Hovland|Grice and Searle",
      "A smart media consumer asks...|What is missing from the coverage?|Which font is used?|How many ads?",
      "Agenda setting is mostly about which topics get attention, not about...|Telling people what conclusion to hold|Which stories get time|Which topics are covered",
      "A topic ignored by many outlets may seem...|Less urgent than it is|More urgent|Invisible to everyone"
    ]),
    SC("Gatekeepers and filter bubbles", "🚪", "A gatekeeper decides what information reaches an audience: an editor choosing stories, or an algorithm choosing what appears in your feed. A filter bubble forms when personalization shows you mostly what you already like. An echo chamber is a group in which the same views are repeated. Breaking out means looking for credible sources with different perspectives.", "Ask who or what chooses what you see, and whether it is varied.", "A feed that shows only topics a person has clicked before can narrow their view without them noticing.", [
      "A gatekeeper is someone or something that...|Controls what information reaches an audience|Fixes the stage door|Writes all speeches",
      "A filter bubble forms when personalization shows you...|Mostly what you already like|Everything equally|Nothing",
      "An echo chamber is a place where...|The same views are repeated|Many views are compared|Sound is perfect",
      "A good way to break out of a bubble is to...|Seek credible sources with other perspectives|Share only your favorites|Stop reading",
      "An algorithm that chooses your feed acts as...|A gatekeeper|A microphone|A critic",
      "Filter bubbles can leave people...|Unaware of other views|Aware of all views|Better informed always",
      "An editor deciding which stories run is a...|Traditional gatekeeper|Podcast host|Stagehand"
    ]),
    SC("The spiral of silence", "🌀", "Elisabeth Noelle-Neumann proposed the spiral of silence: people who think their opinion is in the minority may stay quiet to avoid isolation, which makes that opinion seem even rarer, so others also stay quiet. The result can be a public picture that does not match what people really think. Leaders and facilitators can counter this by inviting private or anonymous input.", "Think about how silence can make a view look smaller than it is.", "In a meeting, nobody speaks against a popular plan; a quiet poll later shows several people had doubts.", [
      "The spiral of silence says people may stay quiet if they think their view is...|In the minority|In the majority|Obvious",
      "Staying quiet makes the view seem...|Even rarer|More common|Louder",
      "The public picture of opinion may then be...|Different from real views|Perfectly accurate|Illegal",
      "Who proposed the theory?|Elisabeth Noelle-Neumann|Judee Burgoon|Howard Giles",
      "A way to counter it is to...|Invite private or anonymous input|Ask for loud applause|Close the meeting",
      "The fear behind the spiral is of...|Social isolation|Hunger|Cold weather",
      "A facilitator who asks quiet people for views helps...|Reveal real opinions|Silence the room|Pick favorites"
    ]),
    SC("Uses and gratifications", "📺", "Uses and gratifications theory flips the usual question. Instead of asking what media does to people, it asks what people do with media. Audiences are active: they choose media to meet needs such as information, entertainment, social connection and identity. A speaker can think the same way: what need is my audience trying to meet by listening?", "Ask what need the audience is trying to satisfy.", "A student who watches a documentary to learn and a student who watches comedy to relax are meeting different needs.", [
      "Uses and gratifications asks what people...|Do with media|Wear to media events|Pay for ads",
      "In this theory, audiences are seen as...|Active|Passive|Absent",
      "Which is a gratification people seek?|Information|Heavier screens|A taller microphone",
      "Another common need is...|Social connection|A louder room|Smaller fonts",
      "A speaker can use this idea by asking...|What need will my audience meet by listening?|How long can I talk?|Which slide is prettiest?",
      "People using social media to feel part of a community show the need for...|Connection and identity|Silence|Lighting",
      "This theory differs from 'media shoots a message at passive people' because it...|Focuses on the audience's choices|Ignores the audience|Bans media"
    ]),
    SC("Lateral reading", "🧭", "Professional fact-checkers do not stay on a site and judge it by how it looks. They practice lateral reading: they open new tabs and search for what other reliable sources say about the site or claim. Who runs it? What is their track record? Do other trustworthy outlets confirm the story? This is faster and more reliable than studying a polished 'About' page.", "Think about leaving the page to check the source elsewhere.", "Before sharing a surprising claim from an unfamiliar site, a fact-checker searches for what independent sources say about that site.", [
      "Lateral reading means...|Leaving the page to check what others say about it|Reading every word of the page|Reading sideways",
      "Fact-checkers judge an unfamiliar site by...|Checking outside sources about it|Its professional look|Its slogan",
      "A polished design proves the site is...|Nothing about its reliability|Reliable|Government approved",
      "A good question to research is...|Who runs this and what is their track record?|How many colors are on it?|How long is the title?",
      "If several trusted outlets confirm a story, it is...|More likely reliable|Surely false|Irrelevant",
      "A shocking claim from an unknown source should be...|Checked before sharing|Shared right away|Memorized",
      "Lateral reading helps defend against...|Misinformation|Hunger|Stage fright"
    ]),
    SC("Scholarly and popular sources", "🎓", "Scholarly articles are written by researchers for other experts, include methods and citations, and are usually peer reviewed: independent experts check the work before publication. Popular sources like magazines and websites are written for general readers and are easier to read but may skip methods. Review articles summarize many studies. For a speech, scholarly work is stronger evidence, and a popular piece can help explain it.", "Think about who wrote it, who checked it and who it is for.", "A journal study with methods and references is checked by other experts, which a short opinion post is not.", [
      "Peer review means that before publication, the work is checked by...|Independent experts|The author's friends|The public vote",
      "Scholarly articles usually include...|Methods and citations|Only photos|No sources",
      "Popular sources are written mainly for...|General readers|Only researchers|Judges",
      "A review article...|Summarizes many studies|Rates restaurants|Is only opinion",
      "For strong evidence in a speech, it is better to use...|Scholarly work, explained clearly|A random post|An unsigned note",
      "A popular article can help you...|Understand and explain a complex study|Replace all sources|Skip citing",
      "A primary study reports...|The researchers' own data and methods|Only gossip|Only summaries"
    ]),
    SC("Quantitative and qualitative research", "📊", "Communication researchers use different tools. Quantitative methods use numbers: surveys, experiments and statistics reveal patterns across many people. Qualitative methods explore meaning in depth: interviews, focus groups and observation. Content analysis counts and codes features of messages, such as how often a theme appears in speeches. Many studies mix methods.", "Ask whether the tool counts and measures, or explores meaning.", "A survey asking 500 students to rate speech anxiety from 1 to 5 is numbers-based. Interviews about what the anxiety feels like are meaning-based.", [
      "A survey that produces numbers across many people is...|Quantitative|Qualitative|Fictional",
      "In-depth interviews to understand meaning are...|Qualitative|Quantitative|Experimental only",
      "A controlled experiment is usually...|Quantitative|Purely qualitative|Anecdotal",
      "Counting how often a theme appears in speeches is...|Content analysis|Focus grouping|Interviewing",
      "A focus group is a way to gather...|Group opinions in discussion|A single number|Random facts",
      "Studies that use both numbers and interviews are...|Mixed-methods|Impossible|Invalid",
      "Quantitative methods are best at showing...|Patterns across many people|Private feelings of one person|Nothing"
    ]),
    SC("Averages that mislead", "🧮", "The mean adds all values and divides by how many. The median is the middle value when sorted. The mode is the most common value. If a few extreme values pull the mean, such as one huge salary in a small company, the median describes a typical case better. When you cite an average in a speech, say which one you mean and consider giving the range.", "Ask which measure fits, and whether extremes distort it.", "In a group where most people earn modest pay and one earns a fortune, the mean can sound much higher than what most people get.", [
      "The middle value in a sorted list is the...|Median|Mean|Mode",
      "The most common value is the...|Mode|Median|Mean",
      "Adding all values and dividing by how many gives the...|Mean|Median|Mode",
      "Which measure is most pulled by one extreme value?|Mean|Median|Mode",
      "Which better describes a typical value in skewed data?|Median|Mean always|Neither",
      "When quoting an average, a careful speaker states...|Which kind of average it is|Nothing|The loudest value",
      "Reporting the range along with an average shows...|How spread out the data is|The speaker's age|The title"
    ]),
    SC("Communicating risk", "⚠️", "People understand risk better with natural frequencies and absolute numbers. 'About 1 in 100' is clearer than '1 percent', and 'rises from 1 in 10,000 to 2 in 10,000' is more honest than 'doubles your risk' alone. Relative risk can sound dramatic while the absolute change is tiny. Give the baseline, use the same denominator, and say what the numbers mean.", "Ask: relative to what, and out of how many?", "'Cuts risk by half' sounds big, but going from 2 in 100,000 to 1 in 100,000 is a very small absolute change.", [
      "A statement like 'doubles your risk' needs the...|Baseline risk|Speaker's title|Time of day",
      "Which is a natural frequency?|1 in 100|0.01 percent as a decimal fraction|A ratio with no stated group",
      "Relative risk can sound dramatic when the absolute change is...|Tiny|Huge|Missing always",
      "Absolute risk tells you...|How many people are affected out of a total|Only a percentage change|The speaker's opinion",
      "Comparing '1 in 10' with '1 in 1,000' is easier if you...|Use the same denominator|Use different units|Add emoji",
      "A responsible speaker communicating risk should include...|Baseline numbers and meaning|Only the scariest number|Only a feeling",
      "Natural frequencies help listeners because they...|Picture real groups of people|Hide the numbers|Avoid math"
    ]),
    SC("Defending your work", "🛡️", "In a thesis defense, conference session or professional review, you present your work and answer expert questions. Listen to the whole question, restate it if needed, answer directly, and point to evidence. Admit limits honestly: 'That is outside the scope of this study, and here is how future work could address it.' Staying calm and curious beats defensiveness.", "Choose the reply that is honest, direct and evidence-based.", "Asked about a small sample, a researcher explains why it was small and what the data can and cannot show.", [
      "A good first step with a hard question is to...|Listen to the whole question|Interrupt|Look away",
      "Restating a question helps you...|Check you understood it|Delay the schedule|Avoid answering",
      "When a question reaches the limits of your work, you should...|Admit it honestly and suggest next steps|Pretend there is no limit|Change the topic",
      "Strong answers point to...|Evidence|Confidence alone|Volume",
      "A defensive reply to criticism usually...|Weakens your credibility|Strengthens it|Ends the questions",
      "'That is outside the scope of this study' is...|An honest boundary|A trick|A mistake",
      "Staying calm and curious shows...|Confidence and openness|Weakness|Boredom"
    ]),
    SC("Crisis communication", "🚨", "When something goes wrong for an organization, communication matters as much as action. Good crisis communication is fast, honest and clear: say what is known, what is not yet known, what is being done, and when the next update will come. Express genuine concern for those affected. Guessing, hiding facts or blaming others tends to deepen the damage.", "Think about speed, honesty, empathy and a promised next update.", "A company that finds a safety problem tells customers what happened, what to do now and when more news will come.", [
      "In a crisis, the first message should be...|Fast, honest and clear|Delayed for weeks|Full of guesses",
      "It is important to say what is known and also...|What is not yet known|Nothing else|Who to blame",
      "Promising the time of the next update helps...|Maintain trust|Hide facts|End the story",
      "Hiding facts usually...|Deepens the damage|Solves the crisis|Stops all questions",
      "Showing genuine concern for those affected is...|Part of good crisis communication|Unprofessional|Optional trick",
      "Guessing at causes publicly is...|Risky|Required|Helpful always",
      "A clear instruction on what people should do now is...|Essential|Unnecessary|Rude"
    ]),
    SC("The SBI feedback model", "🧾", "The SBI model gives clear, fair feedback in three parts. Situation: when and where it happened. Behavior: what you actually saw or heard, in observable terms. Impact: the effect it had on you, the team or the goal. 'In Tuesday's meeting (S), you cut off two teammates mid-sentence (B), and they stopped sharing ideas (I).' It avoids judging character.", "Sort the sentence part into when and where, what happened, or what effect it had.", "'During the demo, you spoke for ten minutes without pausing, and the client lost the thread.' This follows the same three steps.", [
      "In SBI, the S stands for...|Situation|Statement|Speaker",
      "In SBI, the B stands for...|Behavior|Belief|Bias",
      "In SBI, the I stands for...|Impact|Intent|Idea",
      "'In Tuesday's meeting' is the...|Situation|Behavior|Impact",
      "'You interrupted two teammates' is the...|Behavior|Situation|Impact",
      "'They stopped sharing ideas' is the...|Impact|Situation|Behavior",
      "SBI feedback avoids...|Judging character|Giving examples|Naming the time"
    ]),
    SC("Mediation basics", "🕊️", "A mediator is a neutral third party who helps people in conflict reach their own agreement; the mediator does not decide who is right. Typical steps: set ground rules, let each person tell their story without interruption, find the interests behind positions, brainstorm options, and write down an agreement everyone understands. The mediator listens, summarizes, and keeps the conversation fair.", "Remember that the people in conflict make the decision, not the mediator.", "A mediator restates each side in neutral words so both feel heard before options are discussed.", [
      "A mediator is a...|Neutral helper|Judge who rules|Side's champion",
      "In mediation, the agreement comes from...|The people in the conflict|The mediator's order|A coin flip",
      "A first step is to set...|Ground rules|A verdict|Penalties",
      "Letting each person tell their story uninterrupted helps them feel...|Heard|Rushed|Ignored",
      "Finding the interests behind positions helps to...|Reveal what each side really needs|Pick a winner|End the talk",
      "A mediator summarizing each side in neutral words...|Builds understanding|Takes sides|Delays the end for no reason",
      "A final step is to...|Write down an agreement all understand|Declare a winner|Forget it"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 25: lvl(25, L25), 26: lvl(26, L26), 27: lvl(27, L27) });
})();
