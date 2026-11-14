// ext/speaking-28-30.js  Mind Lab Speaking & Listening, levels 28-30 (60 lessons)
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

  // ================= LEVEL 28: rhetorical theory and persuasion =================
  const L28 = [
    SC("Burke's pentad", "🎭", "Kenneth Burke offered five questions for studying any human action: the act (what happened), the scene (where and when), the agent (who did it), the agency (by what means) and the purpose (why). Critics look at how a speaker stresses one element, such as blaming the scene instead of the agent.", "Match each element to the question it answers: what, where, who, how or why.", "In 'The mayor used a radio address to calm the town', the mayor is one element and the radio address is another.", [
      "In Burke's pentad, the 'agent' is...|The person or group who acts|The place of the action|The reason for it",
      "In Burke's pentad, the 'scene' is...|The setting of the action|The tool used|The goal",
      "In Burke's pentad, the 'agency' is...|The means or tools used|The audience|The speaker's age",
      "In Burke's pentad, the 'purpose' is...|Why the act was done|Who watched|Where it happened",
      "Blaming 'hard times' for a decision stresses the...|Scene|Agent|Purpose",
      "Using a podcast to spread a message is an example of...|Agency|Scene|Act",
      "Burke's pentad is mainly a tool for...|Analyzing motives in human action|Measuring voice volume|Timing a speech"
    ]),
    SC("Kairos", "⏰", "Kairos is the Greek idea of the right moment: the opportune time and fitting way to say something. Chronos is ordinary clock time; kairos is about timing that matters. The same words can fail at the wrong moment and move people at the right one.", "Think about timing and fit, not minutes on a clock.", "A fundraising appeal made right after a local flood meets the moment better than the same appeal made months later.", [
      "Kairos refers to...|The opportune moment|Clock time|A speech's length",
      "Chronos refers to...|Sequential clock time|The best moment|A kind of evidence",
      "A speaker who reads the mood and adjusts the message shows sensitivity to...|Kairos|Chronos|Pathos only",
      "Kairos comes from which language?|Greek|Latin|French",
      "A strong message delivered at a badly chosen moment may...|Fall flat|Always succeed|Become longer",
      "Kairos includes both timing and...|Fitting the occasion|Memorizing|Volume",
      "Which phrase best fits kairos?|'The right words at the right time'|'Ten minutes exactly'|'Say it louder'"
    ]),
    SC("The rhetorical situation", "🧭", "Lloyd Bitzer said rhetoric responds to a situation made of three parts: an exigence (an urgent problem or need that speech can help fix), an audience able to act or change, and constraints (beliefs, facts, rules and limits that shape what can be said). Good rhetoric fits all three.", "Ask what problem is pressing, who can change things, and what limits exist.", "A water shortage is the problem, the city council is the audience, and the budget is a limit on what can be proposed.", [
      "An exigence is...|An urgent need that speech can help address|The speech's last line|A kind of evidence",
      "In Bitzer's model, the audience must be able to...|Act or change things|Memorize the text|Applaud only",
      "Constraints are...|Beliefs, facts and rules that limit the speech|Props|Applause",
      "The three parts of a rhetorical situation are exigence, audience and...|Constraints|Closing|Volume",
      "A budget limit on a proposal is best called a...|Constraint|Exigence|Audience",
      "A pressing problem that calls for a response is the...|Exigence|Constraint|Style",
      "Bitzer thought rhetoric is mostly a response to...|A situation|A hobby|A random choice"
    ]),
    SC("Methods of rhetorical criticism", "🔎", "Rhetorical critics choose a method to study a text. Neo-Aristotelian criticism judges effectiveness using classical canons. Cluster criticism looks at which words appear together. Genre criticism asks whether a text follows the expected form of its kind. Ideological criticism asks whose interests the text serves.", "Match the method to the question it asks.", "A critic who notices that 'freedom', 'family' and 'work' keep appearing together is doing cluster criticism.", [
      "Cluster criticism examines...|Which words appear together|Only the speaker's height|Audience size",
      "Genre criticism asks whether a text...|Follows the expected form of its kind|Is long|Is funny",
      "Ideological criticism asks...|Whose interests the text serves|How loud the speaker was|What time it started",
      "Neo-Aristotelian criticism relies on...|Classical rhetorical concepts|Ad statistics|Social media metrics",
      "A critic studying how eulogies usually follow a pattern is using...|Genre criticism|Cluster criticism|Opinion polling",
      "A critic asking who gains power from a campaign slogan is using...|Ideological criticism|Cluster criticism|Delivery coaching",
      "Rhetorical criticism aims to...|Explain how a text works on an audience|Rewrite it silently|Delete it"
    ]),
    SC("Fantasy theme analysis", "🌟", "Ernest Bormann noticed that groups share stories, called fantasy themes, that explain who they are and what is happening. When many people share a set of themes, it forms a rhetorical vision. 'Fantasy' here means a shared dramatic story, not something false.", "Remember that the word 'fantasy' is used in a special way here.", "A team that keeps retelling the story of how it came back from last place is sharing a fantasy theme.", [
      "In fantasy theme analysis, 'fantasy' means...|A shared dramatic story|A lie|A magical story only",
      "Fantasy theme analysis was developed by...|Ernest Bormann|Aristotle|Lloyd Bitzer",
      "A rhetorical vision is...|A set of themes shared by a group|A single sentence|A speech outline",
      "Groups use shared stories to explain...|Who they are and what is happening|Only the weather|The rules of grammar",
      "When a group keeps retelling its comeback story, it is sharing a...|Fantasy theme|Statistic|Citation",
      "Fantasy themes spread when listeners...|Chain out the story to others|Forget it|Argue it is false",
      "This method is mostly used to study...|Group communication and shared identity|Voice pitch|Microphones"
    ]),
    SC("The narrative paradigm", "📖", "Walter Fisher argued that humans are storytellers, and we judge stories with two tests. Narrative coherence asks whether the story hangs together and makes sense. Narrative fidelity asks whether the story rings true with what we know and value. A story that passes both tends to persuade.", "One test is about internal logic; the other is about matching real life and values.", "A speech whose events contradict each other fails one test; one that clashes with what the audience has seen fails the other.", [
      "Walter Fisher described people as...|Storytellers|Only reasoners|Only listeners",
      "Narrative coherence asks if a story...|Hangs together logically|Is short|Is old",
      "Narrative fidelity asks if a story...|Rings true with experience and values|Has many characters|Uses rhyme",
      "A story with events that contradict each other fails...|Coherence|Fidelity only|Neither test applies",
      "A story that clashes with what the audience knows to be true fails...|Fidelity|Delivery|Timing",
      "Fisher's two tests are coherence and...|Fidelity|Volume|Brevity",
      "The narrative paradigm suggests people are persuaded by...|Good stories as well as formal arguments|Only numbers|Only loud voices"
    ]),
    SC("The three sources of ethos", "🛡️", "Aristotle said a speaker's character persuades through three qualities: phronesis (practical wisdom and good judgment), arete (virtue or good character) and eunoia (goodwill toward the audience). An audience trusts speakers who seem wise, good and on their side.", "One is about wisdom, one about goodness and one about caring for listeners.", "A coach who gives sound advice, is honest about mistakes and clearly wants the team to succeed shows all three.", [
      "Phronesis means...|Practical wisdom|Goodwill|Fame",
      "Arete means...|Virtue or good character|Skill at jokes|Loud delivery",
      "Eunoia means...|Goodwill toward the audience|A strong ending|Evidence",
      "A speaker who clearly cares about the listeners' interests shows...|Eunoia|Phronesis only|None of the three",
      "A speaker who gives sensible, well-judged advice shows...|Phronesis|Eunoia|Pathos",
      "Admitting a mistake honestly supports the audience's view of the speaker's...|Arete|Rhyme|Pitch",
      "Together, the three sources build the speaker's...|Ethos|Logos|Kairos"
    ]),
    SC("Sophists and Plato", "🏺", "In ancient Greece, the Sophists taught persuasive speaking for a fee and held that truth can depend on perspective. Plato criticized them, warning that rhetoric without knowledge of truth is mere flattery. Aristotle later defended rhetoric as a useful art when used with sound reasoning.", "Think about who defended rhetoric and who worried about its misuse.", "Plato feared that a smooth speaker with no real knowledge could sway a crowd toward bad decisions.", [
      "The Sophists were ancient Greek teachers of...|Persuasive speaking|Mathematics only|Painting",
      "Plato worried that rhetoric without knowledge of truth was...|Mere flattery|Always honest|Useful in all cases",
      "Who later defended rhetoric as a useful art?|Aristotle|Plato|Homer",
      "Sophists often charged...|A fee for teaching|Nothing at all|A prize to their students",
      "Plato's concern is best described as a worry about...|Persuasion without truth|Poor handwriting|Long speeches",
      "Aristotle's view was that rhetoric works best with...|Sound reasoning|Tricks alone|Silence",
      "This ancient debate is still alive when we ask whether skillful speakers...|Should be held to truthfulness|Should speak faster|Need microphones"
    ]),
    SC("Cicero's three duties", "🏛️", "The Roman orator Cicero said a speaker should teach (docere), delight (delectare) and move (movere). Teaching informs the mind, delighting keeps attention with style and wit, and moving stirs emotion to prompt action. Strong speeches balance all three.", "Think of mind, enjoyment and feeling.", "A talk that explains a fact clearly, tells a funny story and ends with an inspiring call has done all three.", [
      "Cicero said an orator should teach, delight and...|Move|Argue|Sing",
      "'Docere' means...|To teach|To move|To delight",
      "'Delectare' means...|To delight|To teach|To rest",
      "Moving the audience mainly involves...|Stirring emotion toward action|Listing facts|Reading slowly",
      "Style and wit are mostly used to...|Delight and hold attention|Move in the end only|Teach statistics",
      "Cicero was a...|Roman orator|Greek playwright|Medieval monk",
      "Informing the audience's mind is the duty of...|Teaching|Moving|Delighting"
    ]),
    SC("The universal audience", "🌍", "Chaïm Perelman and Lucie Olbrechts-Tyteca distinguished a particular audience (the actual people in front of you) from a universal audience (an imagined body of reasonable people everywhere). Arguments aimed at the universal audience try to be convincing to any reasonable listener, not just a friendly crowd.", "Think about 'real listeners here' versus 'reasonable people anywhere'.", "A scientist writing for any careful reader, not just her own lab, is aiming at the universal audience.", [
      "A particular audience is...|The actual people being addressed|All reasonable people|Nobody",
      "A universal audience is...|An imagined body of reasonable people|The people in the front row|A crowd of fans",
      "Arguments for a universal audience aim to convince...|Any reasonable listener|Only friends|Only experts",
      "A speech tailored to one school board is aimed at a...|Particular audience|Universal audience|Global audience",
      "The idea comes from the scholars...|Perelman and Olbrechts-Tyteca|Burke and Bitzer|Fisher and Bormann",
      "Appealing to universal reason helps an argument seem...|Less tied to local bias|Louder|Shorter",
      "Which is a universal-audience move?|Arguing on principles anyone could accept|Using private jokes|Naming only local heroes"
    ]),
    SC("Psychological reactance", "🚫", "Jack Brehm proposed reactance: when people feel their freedom of choice is threatened, they may resist and even do the opposite. Commands such as 'You must...' can trigger it. Persuaders reduce reactance by offering choices, using respectful language and explaining reasons.", "Think about how people feel when told what they must do.", "'You might consider trying this' invites a listener; 'You must do this now' can push them away.", [
      "Reactance is a tendency to...|Resist when freedom feels threatened|Obey commands|Forget messages",
      "Which wording is more likely to cause reactance?|'You must do this now'|'You might consider this'|'Here are two options'",
      "Reactance was proposed by...|Jack Brehm|Walter Fisher|Cicero",
      "A way to reduce reactance is to...|Offer choices|Give orders|Threaten",
      "Explaining reasons respectfully tends to...|Lower resistance|Raise resistance|Make no difference",
      "A listener who does the opposite of an order may be showing...|Reactance|Agreement|Kairos",
      "Reactance is triggered by a perceived threat to...|Freedom of choice|Hearing|Memory"
    ]),
    SC("The theory of planned behavior", "📊", "Icek Ajzen's theory says our intention to act depends on three things: our attitude toward the behavior, subjective norms (what we think important people expect) and perceived behavioral control (how able we feel to do it). Intention then predicts behavior. Persuasive campaigns can target each factor.", "Look for attitude, social expectations and feeling capable.", "A recycling campaign may show benefits, show neighbors recycling and make bins easy to reach.", [
      "In the theory of planned behavior, intention depends on attitude, subjective norms and...|Perceived behavioral control|Age|Volume",
      "Subjective norms are...|What we think important others expect|Our height|Laws of math",
      "Perceived behavioral control is...|How able we feel to do the behavior|How loud we speak|How rich we are",
      "Making a task easy to do mainly targets...|Perceived control|Subjective norms|Chronos",
      "Showing neighbors doing the behavior targets...|Subjective norms|Attitude only|Control only",
      "The theory was developed by...|Icek Ajzen|Kenneth Burke|Plato",
      "Intention is thought to predict...|Behavior|Weather|Rhyme"
    ]),
    SC("Fear appeals", "⚠️", "Fear appeals warn of a threat. The extended parallel process model (Kim Witte) says they work when people feel the threat is serious and personally relevant and also believe they can act effectively (efficacy). Without a clear, doable response, people may deny the message instead of acting.", "A warning needs a workable next step to go with it.", "A campaign that explains a risk and then shows simple steps people can take is more likely to work than a scary message alone.", [
      "Fear appeals are most effective when paired with...|A clear action people can take|More threats|No details",
      "Efficacy means a person believes they...|Can act effectively|Cannot act|Should ignore it",
      "If people feel scared but helpless, they often...|Deny or avoid the message|Act at once|Ask for more fear",
      "The extended parallel process model was developed by...|Kim Witte|Cicero|Walter Fisher",
      "A threat works better when it feels serious and...|Personally relevant|Far away|Impossible",
      "A good fear appeal includes...|Both a risk and a doable response|Only scary images|Only jokes",
      "A strong warning with no solution may lead to...|Defensive denial|Immediate action|Praise"
    ]),
    SC("Door in the face", "🚪", "In the door-in-the-face technique, a persuader first makes a large request that is likely to be refused, then follows with a smaller request, which now seems reasonable. Research suggests the pattern works partly through reciprocal concessions: we feel we should meet the other side halfway.", "Think about what the first request is designed to do.", "Someone asks you to help for a whole weekend, you decline, and then they ask for one hour instead.", [
      "In door-in-the-face, the first request is...|Large and likely refused|Small and easy|Hidden",
      "The second request in door-in-the-face is...|Smaller|Bigger|The same",
      "Part of why it works is the feeling of...|Reciprocal concessions|Boredom|Anger",
      "Which is an example?|Asking for a large favor, then a small one|Asking for a small favor, then a larger one|Asking once only",
      "Foot-in-the-door begins with a...|Small request|Large request|Threat",
      "Door-in-the-face relies on the contrast between...|The large and the small request|Two speakers|Day and night",
      "Ethical persuaders using this technique should avoid...|Deception|Politeness|Clear speech"
    ]),
    SC("The mere exposure effect", "👀", "Robert Zajonc found that repeated exposure to something, even without thinking about it, tends to increase liking. Familiar faces, logos and slogans can feel more pleasant and trustworthy. Advertisers use repetition, but too much can cause irritation.", "Think about what happens to your feelings about things you meet again and again.", "A song you hear in every store starts to sound better even if you did not like it at first.", [
      "The mere exposure effect says repeated exposure tends to...|Increase liking|Cause dislike always|Erase memory",
      "The effect was studied by...|Robert Zajonc|Plato|Lloyd Bitzer",
      "Why do advertisers repeat slogans?|Familiarity can build comfort|To confuse listeners|To lower costs",
      "Too much repetition can lead to...|Irritation|Perfect memory|Reactance only",
      "Familiar faces and logos may seem more...|Trustworthy|Complicated|Dangerous",
      "Does the effect require careful thinking?|No, it can work without it|Yes, always|Only for experts",
      "The effect applies to things like...|Songs, logos and slogans|Only books|Only weather"
    ]),
    SC("Propaganda techniques", "📢", "The Institute for Propaganda Analysis (1937) listed common techniques: name-calling, glittering generalities (vague, feel-good words), transfer (borrowing prestige), testimonial, plain folks, card stacking (showing only one side) and bandwagon ('everyone is doing it'). Naming them helps listeners resist manipulation.", "Match the description to the technique name.", "'Join the millions who already switched' uses the bandwagon technique.", [
      "Card stacking is...|Presenting only one side|Showing everything fairly|Using humor",
      "Bandwagon appeals say...|'Everyone is doing it'|'Only experts agree'|'Wait and see'",
      "Glittering generalities use...|Vague, feel-good words|Precise numbers|Silence",
      "Name-calling attaches a...|Negative label|Medal|Rhyme",
      "Plain folks appeals present the speaker as...|Just an ordinary person|A distant expert|A stranger",
      "Transfer links an idea to something...|Respected or admired|Boring|Expensive",
      "Learning these names helps listeners...|Spot manipulation|Speak louder|Skip speeches"
    ]),
    SC("Visual rhetoric", "🖼️", "Images persuade too. Visual rhetoric studies how color, size, framing, layout and symbols shape meaning. A close-up can create intimacy, a low camera angle can make a subject look powerful, and red may suggest urgency in one culture but luck in another. Meaning depends on context.", "Ask what choices were made in the image and what they suggest.", "A poster with a tiny sign-up button and a giant headline tells viewers what matters most.", [
      "Visual rhetoric studies how images...|Shape meaning and persuade|Are printed|Are stored",
      "A low camera angle can make a subject look...|Powerful|Small|Missing",
      "Large size in a layout usually signals...|Importance|Cost|Age",
      "The meaning of a color...|Can vary by culture|Is always the same|Never matters",
      "A close-up shot often creates a feeling of...|Intimacy|Distance|Silence",
      "Which is a visual rhetorical choice?|Placing the key image at the center|Choosing the file type|Naming the folder",
      "To interpret an image, consider its...|Context|Weight|Filename"
    ]),
    SC("Evaluating a rhetorical argument", "⚖️", "When criticizing a speech, evaluate it against its goals and audience, not only your own taste. Consider evidence quality, reasoning, the speaker's credibility, emotional appeals, and whether the appeals respect the audience. Strong critique cites specific passages as support.", "A fair critique points to the text itself.", "Instead of 'the speech was bad', say 'the third paragraph relied on one story as proof'.", [
      "A strong critique of a speech...|Cites specific passages|Relies on 'I liked it'|Skips the text",
      "Evaluate a speech against its...|Goals and audience|Length only|Setting only",
      "Which is the better critique?|'The statistic in paragraph two had no source'|'It was bad'|'Boring'",
      "Fair evaluation considers evidence, reasoning and...|Credibility|Hair|Parking",
      "Emotional appeals are acceptable when they...|Respect the audience and fit the facts|Mislead|Replace evidence",
      "A critic should separate personal taste from...|Analysis of how the text works|The title|The date",
      "Critique is strengthened by...|Specific examples|Vague opinions|Interruptions"
    ])
  ];

  // ================= LEVEL 29: intercultural and organizational communication =================
  const L29 = [
    SC("Hofstede's dimensions", "🌐", "Geert Hofstede compared national cultures along dimensions such as individualism versus collectivism (focus on self or on the group), power distance (how comfortably unequal power is accepted), uncertainty avoidance (comfort with ambiguity) and masculinity versus femininity (competition versus care). These are tendencies, not rules for individuals.", "Remember these describe averages in cultures, not every person.", "In a high power distance workplace, employees may rarely question a manager openly.", [
      "Individualism emphasizes...|Personal goals|Group harmony only|Rank only",
      "Collectivism emphasizes...|Group loyalty and harmony|Solo achievement|Competition",
      "Power distance is about acceptance of...|Unequal power|Equal pay|Long speeches",
      "High uncertainty avoidance means people prefer...|Clear rules and structure|Constant change|Surprises",
      "Hofstede's dimensions describe cultural...|Tendencies, not rules for individuals|Laws for each person|Dress codes",
      "In high power distance cultures, challenging a boss openly is...|Less common|More common|Required",
      "Hofstede was a researcher in...|Cultural studies and management|Weather science|Music"
    ]),
    SC("Monochronic and polychronic time", "🕰️", "Edward Hall described two views of time. Monochronic cultures do one thing at a time and value schedules and punctuality. Polychronic cultures often handle several things at once and value relationships over strict timetables. Neither is better; misunderstandings arise when styles meet.", "One lines tasks up, the other lets tasks overlap.", "A manager who ends meetings on the dot may clash with a colleague who lets a conversation run to finish a relationship-building moment.", [
      "Monochronic time means...|Doing one thing at a time|Many things at once|No schedule",
      "Polychronic time often means...|Handling several things at once|One task only|Always being early",
      "Who described these time orientations?|Edward Hall|Geert Hofstede|Walter Fisher",
      "A strict focus on schedules fits...|Monochronic style|Polychronic style|No style",
      "Valuing relationships over exact timetables fits...|Polychronic style|Monochronic style|Neither",
      "Misunderstandings happen when the two styles...|Meet without awareness|Are explained|Are ignored by both",
      "Which statement is fair?|Neither style is simply better|One is always rude|Both are illegal"
    ]),
    SC("Face and facework", "🎎", "Face is the public self-image a person wants others to respect. Facework is what we say and do to protect, save or support face, in ours or others'. Stella Ting-Toomey noted that cultures differ in which face needs matter most, such as autonomy or approval. Tactful wording can protect face during disagreement.", "Think about protecting dignity in public.", "Saying 'Maybe we could look at this another way' avoids shaming the person who proposed the idea.", [
      "Face is a person's...|Public self-image|Mood|Voice pitch",
      "Facework means actions that...|Protect or support face|Hide the face|Raise volume",
      "Which wording better protects face?|'Maybe we could look at it another way'|'That's wrong'|'You never listen'",
      "Face-saving matters most in...|All cultures in some form|Only one culture|No culture",
      "Embarrassing someone publicly harms their...|Face|Posture|Pace",
      "Stella Ting-Toomey studied...|Face and conflict across cultures|Poetry|Medicine",
      "Offering a private correction rather than a public one supports...|Face|Competition|Noise"
    ]),
    SC("Developing intercultural sensitivity", "🧳", "Milton Bennett's model describes growth from ethnocentric stages (denial, defense, minimization) to ethnorelative stages (acceptance, adaptation, integration). Moving along means shifting from judging other cultures by your own standards to understanding and adapting to different ways of seeing the world.", "Moving forward means judging less and understanding more.", "Moving from 'everyone is basically like me' to 'people see things differently, and I can adapt' is progress.", [
      "Bennett's model describes growth in...|Intercultural sensitivity|Voice power|Typing speed",
      "Ethnocentric stages judge other cultures by...|One's own standards|Other standards|No standards",
      "An ethnorelative stage is...|Adaptation|Denial|Defense",
      "Minimization means...|Stressing similarities and ignoring differences|Hiding from others|Learning a language",
      "Adaptation means...|Changing behavior to fit another culture appropriately|Insisting on your own way|Avoiding contact",
      "Denial is the stage of...|Not noticing cultural differences|Celebrating differences|Fluent adaptation",
      "Progress through the model means gaining...|Understanding and flexibility|Authority|Speed"
    ]),
    SC("Code-switching and linguistic relativity", "🔀", "Code-switching is moving between languages, dialects or styles depending on setting, a normal skill for many speakers. The Sapir-Whorf hypothesis suggests language may shape thinking; strong versions are rejected, but there is evidence that language can influence attention and categories in modest ways.", "Think about shifting styles by situation, and about the link between words and the mind.", "A speaker uses relaxed slang with friends and formal English at a job interview.", [
      "Code-switching is...|Shifting between languages or styles by context|Hiding a language|A secret code",
      "The Sapir-Whorf hypothesis concerns how language relates to...|Thought|Digestion|Posture",
      "Most scholars accept...|A modest influence of language on thought|That language fully controls thought|That language never matters",
      "A bilingual person switching languages by audience shows...|Code-switching|Reactance|Face-saving only",
      "Code-switching is generally seen as...|A normal communication skill|A failure|A rare disease",
      "Switching from slang to formal speech in an interview is a change of...|Style|Topic|Chart",
      "Studying how a color vocabulary affects attention relates to...|Linguistic relativity|Propaganda|Mediation"
    ]),
    SC("Ethnocentrism and cultural relativism", "🌍", "Ethnocentrism is judging other cultures by the standards of your own and treating yours as the norm. Cultural relativism is the effort to understand practices within their own cultural context before judging them. Understanding a practice does not mean you must approve of everything; it means you begin with curiosity.", "One judges by 'my way', the other starts with context.", "Before calling a custom strange, ask what it means to the people who practice it.", [
      "Ethnocentrism means...|Judging others by one's own culture's standards|Understanding others on their terms|Speaking many languages",
      "Cultural relativism means...|Understanding practices within their context|Believing nothing is true|Imitating all cultures",
      "A curious first step toward understanding a custom is to ask...|What it means to those who practice it|Why it isn't mine|How to ban it",
      "Seeing your own culture as the norm is...|Ethnocentrism|Relativism|Adaptation",
      "Does understanding a practice require approving it?|No|Yes, always|Only on weekdays",
      "Which is the more open-minded response?|'I wonder what this tradition means to them'|'This is silly'|'We do it better'",
      "These ideas matter most in...|Intercultural communication|Spelling tests|Weather reports"
    ]),
    SC("Interpreting and translating", "🗣️", "Translation converts written text from one language to another; interpretation converts spoken language. In consecutive interpreting, the speaker pauses so the interpreter can render a chunk. In simultaneous interpreting, the interpreter speaks almost in real time, usually from a booth. Good interpreters convey meaning and tone, not just words.", "Written and spoken work have different names.", "At a conference, delegates wear headsets and hear a voice in their language a few seconds behind the speaker.", [
      "Translation usually refers to...|Written text|Spoken words|Gestures",
      "Interpretation usually refers to...|Spoken language|Printed pages|Maps",
      "In consecutive interpreting, the speaker...|Pauses for the interpreter|Speaks at the same time|Leaves",
      "Interpreting almost in real time is called...|Simultaneous interpreting|Consecutive interpreting|Silent reading",
      "Good interpreters convey meaning and...|Tone|Only single words|Nothing else",
      "When speaking through an interpreter, you should...|Use short, clear segments|Rush|Speak in code",
      "Looking at the audience, not only the interpreter, helps keep...|Connection|Time|Silence"
    ]),
    SC("Organizational culture", "🏢", "Edgar Schein described organizational culture in three layers: artifacts (visible things like dress, office layout, rituals), espoused values (stated goals and principles) and basic assumptions (deep, unspoken beliefs). To truly understand a culture, look for gaps between what an organization says and what it does.", "From visible surface to hidden core.", "A company says it values work-life balance, but everyone sends emails at midnight: the assumption differs from the stated value.", [
      "Schein's visible layer is...|Artifacts|Basic assumptions|Silence",
      "Stated goals and principles are...|Espoused values|Artifacts|Assumptions",
      "The deepest layer is...|Basic assumptions|Artifacts|Slogans",
      "A mismatch between stated values and behavior suggests...|The real assumptions differ from the stated ones|Perfect alignment|No culture",
      "Office layout and dress code are...|Artifacts|Basic assumptions|Values",
      "Edgar Schein studied...|Organizational culture|Chemistry|Ancient Greece",
      "To understand a culture, observe what people...|Do as well as say|Wear only|Own"
    ]),
    SC("Formal and informal networks", "🕸️", "Organizations have formal channels (the official chain of command, memos) and informal ones, like the grapevine, which spreads news by personal contacts. The grapevine can be fast and often partly accurate, but also spreads rumors. Leaders reduce rumors by sharing timely, honest information.", "Think about official channels versus talk between colleagues.", "Staff hear about a reorganization at lunch before the official email arrives.", [
      "The grapevine is...|An informal communication network|An official memo|A type of chart",
      "Formal communication follows...|Official channels|Casual chats|Rumors",
      "Rumors spread faster when information is...|Scarce or delayed|Clear and timely|Written down",
      "Leaders reduce rumors by...|Sharing honest information early|Staying silent|Ignoring staff",
      "Information traveling through personal contacts uses the...|Informal network|Chain of command|Org chart",
      "A memo from the director is part of the...|Formal network|Grapevine|Gossip",
      "The grapevine can be...|Fast but not always accurate|Always accurate|Always slow"
    ]),
    SC("Directions of organizational communication", "🔼", "Messages move downward (from managers to staff: instructions, policies), upward (from staff to managers: reports, feedback), and laterally or horizontally (between peers: coordination). Healthy organizations make sure upward and lateral channels are open, not only downward orders.", "Picture the organization chart and which way the arrow points.", "A team member warns her manager about a deadline problem, so the message travels up the chart.", [
      "A manager sending instructions to staff is...|Downward communication|Upward communication|Lateral communication",
      "Staff giving feedback to a manager is...|Upward communication|Downward communication|Lateral communication",
      "Two peers coordinating a project is...|Lateral communication|Downward communication|Formal order",
      "A weak organization may rely mostly on...|Downward orders|Open channels|Two-way talk",
      "Open upward channels help managers to...|Learn about problems early|Avoid information|Issue more orders",
      "Another word for lateral is...|Horizontal|Vertical|Hidden",
      "Policies sent from leadership to employees are...|Downward|Upward|Lateral"
    ]),
    SC("Sensemaking", "🧩", "Karl Weick described sensemaking as the ongoing process by which people give meaning to unclear events, often by asking 'What's the story here?' and testing it. In a crisis, groups with good communication update their story as new information arrives instead of clinging to the first explanation.", "Making sense is ongoing, not a one-time act.", "A team hears an odd alarm, compares notes, and revises its guess as new clues appear.", [
      "Sensemaking is...|Giving meaning to unclear events|Planning a schedule|Memorizing a script",
      "Karl Weick studied...|How organizations make sense of events|Poetry|Plants",
      "Good sensemaking updates the story when...|New information arrives|The first idea is liked|Time is up",
      "A risk is clinging to...|The first explanation|Evidence|Questions",
      "Comparing notes with colleagues helps groups to...|Build a shared understanding|Avoid talking|End meetings",
      "The question 'What's the story here?' reflects...|Sensemaking|Reactance|Fact-checking only",
      "Sensemaking matters most when situations are...|Unclear or surprising|Routine|Silent"
    ]),
    SC("Leadership communication", "🧑‍🏫", "Transformational leaders inspire with a shared vision, model values and encourage growth. Transactional leaders focus on clear tasks, rewards and corrections. Servant leaders put others' needs first. Effective leaders often blend styles and adjust to the situation and the people.", "Match the style to what the leader emphasizes.", "A leader who paints a picture of the team's future and coaches each member is using an inspiring approach.", [
      "Transformational leaders emphasize...|A shared vision and growth|Only rewards|Only rules",
      "Transactional leaders focus on...|Tasks, rewards and corrections|Poems|Silence",
      "Servant leaders put first...|Others' needs|Their own title|Profit only",
      "Which statement is the best summary?|Effective leaders adapt their style|One style always wins|Style does not matter",
      "Painting a picture of a future goal is...|Transformational|Purely transactional|Passive",
      "Offering rewards for meeting targets is...|Transactional|Servant only|Silent",
      "Leaders' words help set the team's...|Direction and tone|Salary|Weather"
    ]),
    SC("Running effective meetings", "📅", "Good meetings have a clear purpose, an agenda sent ahead, the right people invited, a facilitator who keeps time, and notes (minutes) listing decisions and who will do what by when. If a meeting has no decision or discussion need, an email may be better.", "Think about what must exist before, during and after.", "A meeting ends with 'Sam will send the draft by Friday', recorded in the minutes.", [
      "An agenda is...|A list of topics for the meeting|The meeting's snack list|A rumor",
      "Minutes record...|Decisions and action items|Everyone's jokes|The temperature",
      "A good action item names who, what and...|By when|Why not|How loudly",
      "Meeting purpose should be clear...|Before the meeting|Only afterward|Never",
      "If no discussion or decision is needed, a better choice may be...|An email|A longer meeting|A party",
      "A facilitator helps by...|Keeping time and fairness|Doing all the talking|Leaving",
      "Sending the agenda ahead lets people...|Prepare|Skip|Argue"
    ]),
    SC("Psychological safety", "🛟", "Amy Edmondson defined psychological safety as a shared belief that the team is safe for interpersonal risk-taking: people can ask questions, admit mistakes and disagree without fear of humiliation. Teams with it tend to learn faster and catch problems earlier.", "Safe to speak up, not safe from every challenge.", "A new teammate says 'I don't understand this step' and gets help rather than eye-rolls.", [
      "Psychological safety means people feel safe to...|Speak up and take interpersonal risks|Avoid work|Always agree",
      "Who developed the concept?|Amy Edmondson|Geert Hofstede|Edward Hall",
      "Teams with psychological safety tend to...|Learn and catch problems sooner|Hide mistakes|Stop talking",
      "Does psychological safety mean no one is ever challenged?|No|Yes|Only managers",
      "A leader builds it by...|Responding to questions and errors with curiosity|Punishing mistakes|Ignoring concerns",
      "Admitting a mistake is easier in teams that are...|Psychologically safe|Competitive|Silent",
      "Without it, people often...|Stay quiet about problems|Share everything|Speak freely"
    ]),
    SC("Media richness theory", "📨", "Daft and Lengel's media richness theory says channels differ in richness: face-to-face is richest (immediate feedback, tone, body language) and a plain notice is leanest. Match the channel to the task: use rich media for ambiguous or emotional messages and lean media for simple, routine ones.", "Ambiguous or sensitive topics need richer channels.", "Telling a team about a complicated change works better in a live conversation than in a one-line text.", [
      "The richest channel is usually...|Face-to-face|A posted notice|A printed flyer",
      "A lean channel suits...|Simple, routine messages|Sensitive news|Complex negotiation",
      "Ambiguous or emotional messages usually need...|Richer media|Leaner media|No media",
      "Channels differ in feedback speed and...|Cues like tone and body language|Color only|Price only",
      "A plain notice is an example of...|Lean media|Rich media|Live talk",
      "Matching channel to message is the main idea of...|Media richness theory|Fantasy theme analysis|Kairos",
      "Bad news is usually best delivered by...|A richer channel|A group text|A banner"
    ]),
    SC("Stakeholder analysis", "👥", "A stakeholder is anyone affected by or able to affect a project. A stakeholder analysis lists them and considers their interest and influence so you can plan how to communicate: keep high-power, high-interest people closely involved; keep others informed or monitored.", "Rank people by how much they care and how much power they have.", "A school project plan lists students, teachers, parents and the principal, noting how each should be updated.", [
      "A stakeholder is anyone who...|Is affected by or can affect a project|Owns the building|Is a manager",
      "High influence and high interest suggests...|Close involvement|Ignoring them|A single email a year",
      "The goal of stakeholder analysis is to plan...|Communication|Salaries|Parking",
      "Two things stakeholders are often rated on are interest and...|Influence|Height|Age",
      "People with little power and little interest may need to be...|Monitored|Promoted|Hired",
      "Which is a stakeholder in a new school lunch plan?|Students and parents|Only the cooks|Nobody",
      "Updating stakeholders in ways that fit them helps to...|Build support|Cause delays|Spread rumors"
    ]),
    SC("Communicating change", "🔧", "Changes succeed when people understand why the change is needed, what will happen, how it affects them, and when. John Kotter stressed creating urgency and a clear vision, and communicating it often. Listening to concerns and sharing quick wins builds trust during change.", "Cover the reason, the plan, the personal effect and the timing.", "A manager explains the reason for new software, shows a timeline, and holds a Q&A to hear worries.", [
      "People accept change more readily when they understand...|Why it is needed|Nothing|Only the cost",
      "Kotter stressed communicating the vision...|Often|Once|Never",
      "Early successes that are shared are called...|Quick wins|Rumors|Delays",
      "Listening to concerns during change helps to...|Build trust|Slow everything|End debate",
      "A good change message covers why, what, how it affects me and...|When|Who is to blame|How loud",
      "Silence during change tends to produce...|Rumors|Clarity|Trust",
      "A Q&A session helps because people can...|Raise questions and worries|Avoid asking|Hide"
    ]),
    SC("Silence across cultures", "🤫", "Silence carries different meanings. In some cultures it signals respect, thoughtfulness or agreement; in others it can signal discomfort, disagreement or disengagement. A speaker who fills every pause may seem rude in one setting, while long silences may unsettle those used to quick back-and-forth.", "The same pause can mean different things to different listeners.", "A negotiator pauses to think; a partner from a fast-talking culture mistakes it for disapproval.", [
      "Silence in conversation...|Means different things in different cultures|Always means agreement|Always means anger",
      "In some cultures, a pause can show...|Respect and thought|Rudeness only|An error",
      "Filling every pause quickly may seem...|Rude in some settings|Always polite|Silent",
      "A good approach when unsure what silence means is to...|Ask or wait patiently|Assume the worst|Leave",
      "Misreading silence can cause...|Misunderstanding|Perfect understanding|Applause",
      "Silence can signal agreement, disagreement or...|Thoughtfulness|Nothing at all|Math",
      "Intercultural skill includes...|Noticing and checking the meaning of pauses|Ignoring pauses|Talking nonstop"
    ])
  ];

  // ================= LEVEL 30: media, debate, presentation and research methods =================
  const L30 = [
    SC("Cultivation theory", "📺", "George Gerbner's cultivation theory proposes that heavy long-term exposure to television can shape viewers' beliefs about the real world, such as thinking the world is more dangerous than it is (the 'mean world syndrome'). The effect is modest and debated, and depends on what viewers watch and who they are.", "Think slow, long-term influence rather than a single show.", "Someone who watches many crime dramas may overestimate how common crime is in daily life.", [
      "Cultivation theory says long-term media exposure can shape...|Beliefs about the world|Vocabulary only|Eyesight",
      "Cultivation theory was developed by...|George Gerbner|Edward Hall|Amy Edmondson",
      "The 'mean world syndrome' is a belief that the world is...|More dangerous than it is|Safer than it is|Exactly as seen",
      "The effects are described as...|Modest and debated|Absolute|Nonexistent",
      "Cultivation focuses on exposure over...|Long periods|One minute|One hour",
      "Heavy viewers of crime dramas may overestimate...|How common crime is|Their grades|The weather",
      "The theory was first aimed mainly at which medium?|Television|Radio only|Books only"
    ]),
    SC("Media effects models", "📡", "Early views held that media act like a 'hypodermic needle' injecting messages into passive audiences. Later research found limited effects: Katz and Lazarsfeld's two-step flow showed that opinion leaders absorb media and then influence others in conversation. Modern views see audiences as active, though media still matter.", "Audiences are active and personal contacts matter.", "A neighbor who follows the news closely explains an issue to friends, who trust her opinion.", [
      "The 'hypodermic needle' model pictured audiences as...|Passive|Active|Absent",
      "In the two-step flow, media messages reach...|Opinion leaders who influence others|Everyone equally|Nobody",
      "Opinion leaders are people who...|Influence others' views through conversation|Own the media|Write headlines only",
      "Later research found media effects were often...|Limited and shaped by personal contacts|Total|Unmeasurable",
      "Katz and Lazarsfeld are known for the...|Two-step flow|Pentad|Johari window",
      "Modern views see audiences as...|Active|Totally passive|Unimportant",
      "A friend who explains the news to you is acting as...|An opinion leader|A gatekeeper|A critic only"
    ]),
    SC("Encoding and decoding", "🔐", "Stuart Hall argued that media producers encode messages, and audiences decode them in different ways: a dominant reading (accepting the intended meaning), a negotiated reading (accepting some, adapting some) or an oppositional reading (rejecting the intended meaning). Meaning is not fixed by the sender alone.", "The audience helps make the meaning.", "A viewer who accepts parts of an ad's message but doubts its claims is making a mixed reading.", [
      "A dominant reading...|Accepts the intended meaning|Rejects it|Ignores it",
      "An oppositional reading...|Rejects the intended meaning|Accepts it fully|Is a kind of graph",
      "A negotiated reading...|Accepts some and adapts some|Accepts everything|Rejects everything",
      "Stuart Hall's model says meaning is shaped by...|Both producers and audiences|Producers only|Chance",
      "Producers 'encode' messages; audiences...|Decode them|Delete them|Print them",
      "Accepting an ad's overall message but doubting a claim is a...|Negotiated reading|Dominant reading|Oppositional reading",
      "Different viewers reading the same show differently shows that meaning is not...|Fixed by the sender alone|Real|Spoken"
    ]),
    SC("The public sphere", "🏙️", "Jürgen Habermas described the public sphere as the space where citizens discuss common concerns and form public opinion, ideally through open, reasoned debate. Coffeehouses, newspapers and today online forums have served this role. Critics ask who is excluded and whether commercial pressures distort discussion.", "Think of a shared space for debating public issues.", "A town hall meeting where residents debate a new park is a small version of this space.", [
      "The public sphere is a space for...|Discussing common concerns|Private diaries|Sporting events only",
      "The concept is linked to...|Jürgen Habermas|Walter Fisher|George Gerbner",
      "Ideally, public-sphere debate is...|Open and reasoned|Secret|Hostile",
      "A town hall meeting is an example of...|A public sphere|A private chat|A monologue",
      "Critics ask who might be...|Excluded from the discussion|Too quiet|Bored",
      "Historically, coffeehouses and newspapers served as...|Public sphere spaces|Courts|Banks",
      "Commercial pressure could affect the public sphere by...|Distorting what gets discussed|Making it perfect|Ending talk"
    ]),
    SC("Debate formats", "⚔️", "Formats differ. Lincoln-Douglas is one-on-one and focuses on values, such as justice or liberty. Policy debate has two-person teams arguing whether a plan should be adopted. Parliamentary (British Parliamentary) debate has teams who prepare for a short time with a motion given just before. Each format has its own timing and norms.", "Match one-on-one values, team policies and quick-prep motions.", "A debater defending 'justice requires forgiveness' in a one-on-one round is arguing about a value.", [
      "Lincoln-Douglas debate is usually...|One-on-one and value-focused|Teams of eight|Silent",
      "Policy debate usually argues about...|Whether a plan should be adopted|Who has the best poster|Only history",
      "In parliamentary debate, preparation time is...|Short|Months|Unlimited",
      "A debate about whether liberty outweighs security best fits...|Lincoln-Douglas|Policy only|No format",
      "A motion is...|The statement being debated|A hand gesture|A time limit",
      "Different formats have different...|Timing and norms|Languages|Planets",
      "A two-person team defending a plan is typical in...|Policy debate|Lincoln-Douglas|Eulogies"
    ]),
    SC("Cross-examination", "❓", "In cross-examination, one debater questions the other to clarify, expose weaknesses or set up later arguments. Good questions are short and usually closed (yes or no). Avoid arguing during cross-examination; save your points for your speech. Answers should be honest, brief and calm.", "Short, controlled questions work best.", "'Do you agree the plan costs two million?' is a short closed question that sets up a point.", [
      "Good cross-examination questions are usually...|Short and closed|Long and vague|Insults",
      "The purpose of cross-examination includes...|Clarifying and exposing weaknesses|Ending the debate|Changing format",
      "Points based on answers are best made in...|Your speech|The break|Cross-examination only",
      "A respondent should answer...|Honestly and briefly|With a speech|With silence",
      "Which is a better question?|'Did your study include rural areas?'|'Why are you so wrong about everything?'|'Isn't that all nonsense?'",
      "During cross-examination, you should avoid...|Arguing your case at length|Listening|Taking notes",
      "Setting up a later argument is a reason to ask...|A planned sequence of questions|Random questions|No questions"
    ]),
    SC("Flowing and line-by-line", "🗒️", "Debaters 'flow' a round: they take structured notes in columns, tracking each argument and the responses to it. Then in rebuttal they respond line by line, in the order the arguments were made, so the judge can follow. Dropped arguments (not answered) may be treated as accepted.", "Order and organization help the judge follow.", "A debater says, 'On their first point, three responses...' and then moves to point two.", [
      "Flowing a debate means...|Taking structured notes of arguments|Speaking quickly|Leaving early",
      "Line-by-line rebuttal responds to arguments...|In the order made|At random|Only the last one",
      "A dropped argument is one that was...|Not answered|Answered twice|Too long",
      "A dropped argument may be treated as...|Accepted|Rejected|Deleted",
      "Flowing helps the debater to...|Track responses|Avoid listening|Memorize the room",
      "Signposting means...|Telling the judge where you are in your speech|Pointing at a sign|Skipping points",
      "Organized rebuttals help a judge to...|Follow the clash of arguments|Read the minds|Time the break"
    ]),
    SC("Burden of proof and presumption", "⚖️", "The burden of proof is the responsibility of the side making a claim to support it with evidence. Presumption is the default position that stands if the burden is not met, such as innocent until proven guilty. In many policy debates, the side proposing change carries the burden.", "The one making a claim must support it.", "In a court, the prosecution must prove guilt; the defendant need not prove innocence.", [
      "The burden of proof rests on the side that...|Makes a claim|Asks no questions|Speaks last",
      "Presumption is...|The default position if the burden is not met|A type of evidence|A hand signal",
      "'Innocent until proven guilty' reflects...|Presumption|Reactance|Cluster criticism",
      "In many policy debates, the burden belongs to...|The side proposing change|The audience|The timekeeper",
      "A claim with no supporting evidence has not met its...|Burden of proof|Time limit|Audience",
      "Shifting the burden means trying to make the opponent...|Prove a negative they should not have to|Rest|Win",
      "A good debater supports claims with...|Evidence and reasoning|Volume|Speed"
    ]),
    SC("Four-step refutation", "🥊", "A clear refutation has four steps: state the opponent's claim, give your reason it is flawed, support that reason with evidence, then explain the impact (why it matters). For example: 'They said X. But Y. Here's evidence. So the claim falls, which weakens their case.'", "Think of four parts in a fixed order.", "'They said transit is too costly. But fares offset 60 percent of costs, per the city report, so the cost argument weakens.'", [
      "The first step of four-step refutation is to...|State the claim you are answering|Insult|Summarize your side",
      "The last step is to explain the...|Impact|Opening|Clock",
      "Support for your reason should be...|Evidence|A guess|Silence",
      "Skipping the impact leaves the judge unsure of...|Why the point matters|The speaker's name|The room",
      "A refutation that only says 'No, that's wrong' lacks...|A reason and evidence|Volume|Length",
      "Which is a correct order?|Claim, reason, evidence, impact|Impact, claim, silence|Evidence, evidence, evidence",
      "Clear refutation makes the audience see...|Why your response matters|Nothing|Only your emotion"
    ]),
    SC("Choosing a chart", "📈", "Chart choice should match the question. Use a line chart for change over time, a bar chart to compare categories, a pie chart for parts of a whole (with few slices), and a scatter plot for the relationship between two variables. Avoid clutter and misleading axes; label clearly.", "Match the shape of the data to the shape of the chart.", "To show how a school's enrollment changed each year, a chart that follows a line through the years works well.", [
      "To show change over time, use a...|Line chart|Pie chart|Map",
      "To compare categories, use a...|Bar chart|Line chart only|Photograph",
      "To show parts of a whole with few slices, use a...|Pie chart|Scatter plot|Timeline",
      "To show the relationship between two variables, use a...|Scatter plot|Pie chart|Bar of one value",
      "A misleading axis can...|Distort what viewers see|Fix errors|Save time",
      "A good chart should be...|Clearly labeled and uncluttered|Packed with effects|Unlabeled",
      "Choose the chart type based on...|The question you are answering|Your favorite color|The font"
    ]),
    SC("Handling questions and answers", "🙋", "In Q&A, listen to the whole question, pause, repeat or paraphrase it so everyone hears, answer briefly, and check you addressed it. If you do not know, say so and offer to follow up. For hostile questions, find the real concern, stay calm and answer respectfully.", "Pause, paraphrase, answer, and be honest about limits.", "'So you're asking whether the data covers older adults. It does for ages 18 to 65, but not beyond.'", [
      "Before answering a question, it helps to...|Listen fully and pause|Interrupt|Look away",
      "Paraphrasing the question lets everyone...|Hear and understand it|Leave early|Forget it",
      "If you do not know an answer, you should...|Say so and offer to follow up|Make something up|Change the subject",
      "For hostile questions, it is wise to...|Stay calm and find the real concern|Argue back|Ignore",
      "A good answer is usually...|Brief and on target|Long and vague|A new speech",
      "After answering, you can check by asking...|'Did that address your question?'|'Anything else you hate?'|Nothing",
      "Honest limits strengthen your...|Credibility|Volume|Timing"
    ]),
    SC("Research questions and hypotheses", "🔬", "A research question asks what you want to learn ('How do students use video calls?'). A hypothesis is a testable prediction ('Students who practice aloud will score higher'). A good hypothesis can be shown wrong by evidence; it is specific and measurable. Variables are the things that change or are measured.", "Ask whether evidence could show the idea to be wrong.", "'More sleep improves test scores' can be checked with data; 'sleep is nice' cannot.", [
      "A hypothesis is...|A testable prediction|A fact already known|A summary",
      "A good hypothesis must be...|Testable and specific|Impossible to check|Emotional",
      "A research question asks...|What you want to learn|Who is guilty|How to cite",
      "Which is a testable hypothesis?|'Practicing aloud raises speech scores'|'Practice is good'|'Speeches are fun'",
      "A variable is something that...|Changes or is measured|Never changes|Is a source",
      "Evidence that contradicts a hypothesis means it...|May need to be revised|Is perfect|Is secret",
      "Specific and measurable wording helps in...|Testing the idea|Hiding results|Winning"
    ]),
    SC("Validity and reliability", "🎯", "Validity asks whether a measure really measures what it claims to measure. Reliability asks whether it gives consistent results when repeated. A bathroom scale that always reads five pounds too high is reliable but not valid. Good research needs both.", "One is about accurate aim; the other is about consistent results.", "A thermometer that gives the same wrong reading every time is consistent, but not accurate.", [
      "Reliability means a measure gives...|Consistent results|Different results each time|No results",
      "Validity means a measure...|Measures what it claims to|Is cheap|Is fast",
      "A scale that is always five pounds too high is...|Reliable but not valid|Valid but not reliable|Both",
      "Good research needs...|Both validity and reliability|Only speed|Neither",
      "A quiz meant to test reading but which really tests vocabulary alone may lack...|Validity|Pages|Length",
      "Getting wildly different scores from the same test on the same person suggests poor...|Reliability|Layout|Color",
      "Repeating a measurement to see if results match checks...|Reliability|Validity of motive|Humor"
    ]),
    SC("Survey design", "📝", "Good surveys use neutral wording. Avoid leading questions ('Don't you agree that...?'), double-barreled questions that ask two things at once ('Is the speaker clear and funny?'), and unclear terms. Pilot test the survey, offer balanced answer choices and keep it short. Sampling should represent the group you study.", "One question, one idea, neutral tone.", "Instead of 'Wasn't the talk great?', ask 'How would you rate the talk?' with options from poor to excellent.", [
      "A leading question...|Pushes toward a particular answer|Is neutral|Has no words",
      "A double-barreled question...|Asks two things at once|Asks one thing|Has no answers",
      "'Was the speaker clear and funny?' is...|Double-barreled|Neutral|A fact",
      "A pilot test helps to...|Find problems before the full survey|Skip the survey|Pick winners",
      "Answer choices should be...|Balanced|Loaded|Missing",
      "Which is the better wording?|'How would you rate the talk?'|'Wasn't the talk great?'|'Admit you loved it, right?'",
      "To represent a group, the sample should be...|Representative of it|Only friends|Tiny"
    ]),
    SC("Interviews and focus groups", "💬", "Interviews gather in-depth views from individuals; they can be structured (fixed questions), semi-structured (guided but flexible) or unstructured. Focus groups bring a small group together for a moderated discussion to see how ideas develop through interaction. A moderator avoids leading and makes sure everyone can speak.", "Individual depth versus group interaction.", "A researcher asks six students about speaking anxiety and follows interesting answers with 'Can you tell me more?'", [
      "A semi-structured interview is...|Guided but flexible|Fully scripted|Purely random",
      "A focus group is a...|Moderated small-group discussion|Written test|Secret",
      "A good interviewer asks open questions like...|'Can you tell me more?'|'Yes or no?'|'Agree?'",
      "Focus groups show how ideas develop through...|Interaction|Silence|Writing alone",
      "A moderator should make sure...|Everyone can speak|One person dominates|No one speaks",
      "A structured interview uses...|Fixed questions|No questions|Only gestures",
      "In-depth personal views are best gathered by...|Interviews|Counting clouds|Thermometers"
    ]),
    SC("Content analysis", "🔢", "Content analysis systematically examines communication, such as speeches, ads or posts, by coding it into categories and counting or interpreting patterns. Researchers define categories in a code book and check that different coders agree (intercoder reliability). It can be quantitative (counts) or qualitative (themes).", "Code, count and check agreement.", "A team codes 200 campaign ads for 'positive' or 'negative' tone and compares how often each appears.", [
      "Content analysis studies...|Communication texts by coding them|Only voices|Only buildings",
      "A code book defines...|The categories used for coding|The winner|The color",
      "Intercoder reliability checks that coders...|Agree with each other|Disagree|Leave",
      "Counting categories is a...|Quantitative approach|Qualitative approach only|Hunch",
      "Identifying themes in speeches is a...|Qualitative approach|Quantitative approach only|Mistake",
      "Which could be studied with content analysis?|Tone in campaign ads|The weight of a book|Lunch menus only",
      "Coding means assigning content to...|Categories|Prizes|Seats"
    ]),
    SC("Research ethics", "🧾", "Researchers who study people must get informed consent (people know what the study involves and freely agree), protect privacy and confidentiality, minimize harm and allow participants to withdraw. Ethics boards (such as institutional review boards) review studies. Researchers must also report results honestly.", "Respect, honesty and the right to say no.", "A survey starts with a short explanation, says answers are anonymous and tells people they can stop at any time.", [
      "Informed consent means participants...|Know about the study and freely agree|Are tricked|Are paid in secret",
      "Participants should be able to...|Withdraw|Never leave|Be forced",
      "Confidentiality means protecting participants'...|Privacy|Votes|Seats",
      "An ethics board reviews a study to protect...|Participants|The lab's furniture|Advertisers",
      "Researchers must report results...|Honestly|Only if exciting|Never",
      "Which is a breach of research ethics?|Hiding the study's risks|Explaining the study|Offering a way out",
      "A good consent explanation says what will happen and...|That participation is voluntary|That it is mandatory|Nothing else"
    ]),
    SC("Confounding variables", "🧪", "A confounding variable is a hidden factor related to both the cause and effect you are studying, creating a false link. Ice cream sales and sunburns rise together, but the weather (heat) affects both. Researchers control for confounds with randomization, comparison groups and careful design. Correlation alone does not prove causation.", "Look for a third factor behind two related things.", "Students who attend tutoring score higher, but motivation may drive both tutoring and scores.", [
      "A confounding variable is a hidden factor that...|Affects both the cause and the effect|Has no effect|Is always the cause",
      "Ice cream sales and sunburns rising together are best explained by...|Hot weather as a confound|Ice cream causing sunburn|Chance only",
      "Correlation does not prove...|Causation|Existence|Change",
      "Random assignment helps to reduce...|Confounding|Honesty|Participants",
      "A comparison group lets researchers see...|What happens without the treatment|The rules|Price",
      "If students who tutor also happen to be more motivated, motivation may be a...|Confound|Constant|Citation",
      "Careful study design aims to separate cause from...|Coincidence and hidden factors|Evidence|Reasons"
    ])
  ];

  Object.assign(SPEAKING_LEVELS, { 28: lvl(28, L28), 29: lvl(29, L29), 30: lvl(30, L30) });
})();
