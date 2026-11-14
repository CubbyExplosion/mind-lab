// ext/sign-28-30.js  Mind Lab Sign Language (ASL), levels 28-30 (60 lessons)
// College year 1 second half and College year 2: research methods, sociolinguistics, interpreting practice, Deaf education policy, Deaf arts, careers and advocacy. No sign descriptions beyond what we are sure of.
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const UP = s => String(s).toUpperCase();
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which term matches?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which one fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this term mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this one?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly and say it in your own words." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, visual: v, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const MK = (title, v, intro, exV, exT, tip, make) => {
    make.teach = () => [{ h: title, v, t: intro }, { h: "Worked example", v: exV, t: exT }, { h: "Tip", v: "💡", t: tip }];
    return { title, make };
  };
  const lvl = (n, ls, mixIdx) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.max(1, Math.floor(arr.length / 4));
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[0])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", mixIdx.map(i => ms[i])), mix(`Level ${n} Challenge`, ms)];
  };
  // ---------- makers ----------
  const readSpell = (title, words, note) => MK(title, "🔠", note, "M-E-A-D-O-W", "M, E, A, D, O, W. Put them together and you get <b>meadow</b>.",
    "Read the rhythm of the whole word, not each letter alone. Say the word in your head as soon as you can guess it.", () => {
      const w = pick(words), ex = pick(["sun", "cat", "pig", "bus", "map"]);
      return {
        text: `A friend fingerspells these letters, one after another:<br><b>${UP(w).split("").join(" - ")}</b><br>What word is it?`, visual: "🔠", textInput: true, answer: w,
        hints: ["Say the letters quickly in your head and listen for the word.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP(ex).split("").join(" - ")} spells "${ex}". Now do yours.`]
      };
    });
  const unscramble = (title, words) => MK(title, "🔀", "Here is a word puzzle for your fingerspelling eyes. The letters of a word come out in the wrong order. Put them back in order to find the word.",
    "N-I-A-R-B-O-W", "Try moving letters around until a word appears: R-A-I-N-B-O-W spells <b>rainbow</b>.",
    "Look for a common ending or beginning first, like -ing or -er, then fit the other letters around it.", () => {
      const w = pick(words);
      let sc = w;
      for (let i = 0; i < 30 && sc === w; i++) sc = shuf(w.split("")).join("");
      return {
        text: `The letters of a word are mixed up:<br><b>${UP(sc).split("").join(" - ")}</b><br>Put them in order. What is the word?`, visual: "🔀", textInput: true, answer: w,
        hints: ["Try to find a small word or an ending hidden inside the letters.", `The word has ${w.length} letters and starts with "${UP(w[0])}".`, `Example: ${UP("nirabwo").split("").join(" - ")} can be arranged into "rainbow". Now do yours.`]
      };
    });

  const respRate = () => MK("Response rate", "📬", "A <b>response rate</b> is the percent of people who answered a survey. Percent of a number: multiply the number by the percent and divide by 100.",
    "200 surveys, 25 percent replied", "200 times 25 divided by 100 = <b>50</b> people replied. To find the rate, divide replies by surveys and multiply by 100.",
    "Replies = surveys times percent divided by 100. Rate = replies divided by surveys times 100.", () => {
      let N, p;
      do { N = pick([40, 50, 80, 100, 200, 250, 400, 500]); p = pick([10, 20, 25, 30, 40, 50, 60, 75]); } while ((N * p) % 100 !== 0);
      const R = N * p / 100;
      if (Math.random() < 0.5) return {
        text: `A survey about interpreter access was sent to ${N} people. ${p} percent replied. How many people replied? Type the number only.`, visual: "📬", answer: R,
        hints: ["A percent means that many out of every 100.", "Multiply the number of surveys by the percent, then divide by 100.", "Example: 200 surveys with 25 percent replying is 200 times 25 divided by 100 = 50. Now do yours."]
      };
      return {
        text: `A survey about interpreter access was sent to ${N} people and ${R} replied. What is the response rate, in percent? Type the number only.`, visual: "📬", answer: p,
        hints: ["Compare the replies with the number of surveys sent.", "Divide the replies by the surveys sent, then multiply by 100.", "Example: 50 replies out of 200 surveys is 50 divided by 200 = 0.25, which is 25 percent. Now do yours."]
      };
    });
  const chance = () => MK("Chance of a random pick", "🎲", "When one name is picked at random from a group, the <b>chance</b> is the number who fit divided by the group size. Multiply by 100 to say it as a percent.",
    "5 of 20 students", "5 out of 20 is 5 divided by 20 = 0.25, which is <b>25</b> percent.",
    "Chance in percent = fitting people divided by group size times 100.", () => {
      let N, k;
      do { N = pick([20, 25, 40, 50, 100, 200]); k = ri(1, N - 1); } while ((k * 100) % N !== 0);
      const p = k * 100 / N;
      if (Math.random() < 0.5) return {
        text: `One name is picked at random from ${N} students. ${k} of the students use ASL. What is the chance, in percent, that the name picked uses ASL? Type the number only.`, visual: "🎲", answer: p,
        hints: ["Compare the students who use ASL with the whole group.", "Divide the students who use ASL by the group size, then multiply by 100.", "Example: 5 of 20 students is 5 divided by 20 = 0.25, which is 25 percent. Now do yours."]
      };
      return {
        text: `One name is picked at random from ${N} students. The chance it uses ASL is ${p} percent. How many of the ${N} students use ASL? Type the number only.`, visual: "🎲", answer: k,
        hints: ["A percent means that many out of every 100.", "Multiply the group size by the percent, then divide by 100.", "Example: 25 percent of 20 students is 20 times 25 divided by 100 = 5. Now do yours."]
      };
    });
  const frames = () => MK("Frames in a clip", "🎞️", "Video is a quick series of pictures called <b>frames</b>. The frame rate is how many frames play each second. Frames in a clip = frames per second times seconds.",
    "30 frames per second for 4 seconds", "30 times 4 = <b>120</b> frames. To find seconds, divide the total frames by the frame rate.",
    "Frames = rate times seconds. Seconds = frames divided by rate.", () => {
      const f = pick([24, 25, 30, 50, 60]), s = pick([2, 3, 4, 5, 6, 8, 10]);
      if (Math.random() < 0.5) return {
        text: `A video of a signer plays at ${f} frames per second. How many frames are in a ${s}-second clip? Type the number only.`, visual: "🎞️", answer: f * s,
        hints: ["Each second has the same number of frames.", "Multiply the frames per second by the number of seconds.", "Example: 30 frames per second for 4 seconds is 30 times 4 = 120. Now do yours."]
      };
      return {
        text: `A clip of a signer has ${f * s} frames and plays at ${f} frames per second. How many seconds long is it? Type the number only.`, visual: "🎞️", answer: s,
        hints: ["You know the total frames and the frames in one second.", "Divide the total frames by the frames per second.", "Example: 120 frames at 30 per second is 120 divided by 30 = 4 seconds. Now do yours."]
      };
    });

  // ================= LEVEL 28 =================
  const L28 = [
    SC("Research questions", "❓", "A good <b>research question</b> is clear, focused and can be answered with evidence. A <b>literature review</b> shows what earlier studies already found, so you do not repeat them blindly.", "Think about what makes a question clear and narrow enough to answer with evidence.", "Too big: 'Is signing good?' Better: 'Do college students with interpreters finish more courses?'", [
      "A good research question is...|Clear and answerable with evidence|Impossible to test|Already proven",
      "A question that can be studied with data is called...|Researchable|Rhetorical|Decorative",
      "A question that is too broad should be...|Narrowed to something specific|Made even larger|Left unchanged",
      "Before choosing a question, researchers often write a...|Literature review|Magic trick|Coin toss",
      "A literature review looks at...|What earlier studies already found|Only the researcher's opinion|Nothing at all",
      "A hypothesis is a...|Testable prediction|Proven fact|Final report",
      "Questions about Deaf communities are best shaped with...|Input from Deaf community members|Only outsiders|Pure guesses",
      "Which is the more focused question?|How many interpreters do colleges in one state hire?|Is language interesting?|Why is everything the way it is?"
    ]),
    SC("Qualitative and quantitative", "🔢", "<b>Quantitative</b> data is numbers: counts, scores, percents. <b>Qualitative</b> data is words and meanings: interviews, stories, observations. Studies that use both are called <b>mixed methods</b>.", "Think about whether the information is a number or someone's own words and meaning.", "Counting how many students use video relay is quantitative. Asking students to describe how it felt is qualitative.", [
      "Numbers such as test scores are...|Quantitative data|Qualitative data|Fictional data",
      "Interview stories and observations are...|Qualitative data|Quantitative data|Random data",
      "A survey counting how many students use video relay is mostly...|Quantitative|Qualitative|Neither",
      "Asking signers to describe in their own words how an interpreter helped is mostly...|Qualitative|Quantitative|Neither",
      "Using both kinds of data in one study is called...|Mixed methods|Double testing|Cross spelling",
      "Qualitative research is good for finding out...|Meanings and experiences|Only averages|Only prices",
      "Quantitative research is good for finding out...|How much or how many|Feelings only|Nothing",
      "Counting the number of times a signer raises their eyebrows in a video is...|Quantitative|Qualitative|Neither"
    ]),
    SC("Samples and bias", "👥", "The <b>population</b> is the whole group a study is about. The <b>sample</b> is the smaller group actually studied. If the sample does not fairly match the population, the results are <b>biased</b>.", "Think about whether the people studied are a fair picture of the whole group.", "Surveying only people at one club may miss people of other ages and places.", [
      "The whole group a study is about is the...|Population|Sample|Variable",
      "The smaller group actually studied is the...|Sample|Population|Hypothesis",
      "A random sample means every person has...|An equal chance of being chosen|Been asked by friends|No chance",
      "Surveying only people at one Deaf club could give a...|Biased sample|Perfect sample|Random sample",
      "A larger, well-chosen sample usually gives...|More trustworthy results|Less trustworthy results|No results",
      "Sampling bias happens when the sample...|Does not fairly represent the population|Is too polite|Is a good mix",
      "Deaf communities are diverse, so a good sample should include...|Different ages, regions and backgrounds|Only one age|Only one town",
      "An online poll that people choose to answer is risky because...|Those who respond may differ from those who do not|Everyone answers|It is too fast"
    ]),
    SC("Ethics review boards", "🛡️", "In the United States, studies with people are reviewed by an <b>Institutional Review Board</b> (IRB). The board checks that people are protected, give <b>informed consent</b> and can leave at any time.", "Think about what a board must check before a study can involve real people.", "A study with Deaf participants explains the project in ASL before anyone agrees to join.", [
      "In US universities, studies with people are checked by an...|Institutional Review Board|Interpreter Rating Bureau|Internal Reading Band",
      "The main job of an IRB is to protect...|Research participants|Journal editors|Bookstores",
      "Informed consent means participants...|Understand the study and agree freely|Are told nothing|Must agree no matter what",
      "Consent information for Deaf participants should be given in...|A language they fully understand, such as ASL|Only fast spoken English|Tiny print only",
      "Participants may leave a study...|At any time|Never|Only on Tuesdays",
      "Keeping names and details private is called...|Confidentiality|Publicity|Plagiarism",
      "Researchers must try to reduce...|Harm and risk|Participants|Accuracy",
      "A video of a signer's face is hard to make anonymous, so researchers must...|Ask careful permission for how it is used|Post it freely|Assume permission without asking"
    ]),
    SC("Variables and controls", "🧪", "The <b>independent variable</b> is what the researcher changes or compares. The <b>dependent variable</b> is what is measured as the result. A <b>control group</b> does not get the change, so you can compare.", "Think about which thing is changed on purpose and which thing is measured afterward.", "Test whether caption speed affects understanding: speed is changed, understanding is measured.", [
      "The thing a researcher changes or compares is the...|Independent variable|Dependent variable|Footnote",
      "The thing that is measured as the result is the...|Dependent variable|Independent variable|Title",
      "A control group is a group that...|Does not get the change being tested|Gets every change|Is chosen last",
      "In a study of whether caption speed affects understanding, caption speed is the...|Independent variable|Dependent variable|Control group",
      "In that same study, the understanding score is the...|Dependent variable|Independent variable|Sample",
      "A control group helps researchers...|Compare to see if the change mattered|Skip the data|Avoid ethics",
      "Keeping everything else the same is called...|Controlling variables|Ignoring variables|Doubling variables",
      "If two things change at once it is hard to know...|Which one caused the result|The date|Who the researcher is"
    ]),
    SC("Peer review", "🧐", "Before many studies are published, other experts check them. This is <b>peer review</b>. It helps catch errors and weak methods, but it does not guarantee a study is perfect.", "Think about who checks a study and what they are looking for.", "Reviewers read a paper, point out problems, and the author revises it before publication.", [
      "Peer review means other experts...|Check a study before it is published|Pay for the study|Write the study for the author",
      "Peers are people with...|Similar expertise|No knowledge|Only fans",
      "Peer review helps catch...|Errors and weak methods|Every problem in the world|Nothing",
      "A peer-reviewed article is generally...|More carefully checked|Guaranteed perfect|Unchecked",
      "Peer review does NOT...|Guarantee a study is perfect|Involve experts|Ever happen",
      "Reviewers often stay anonymous so they can be...|Honest and unbiased|Paid more|Famous",
      "After review, authors may be asked to...|Revise the paper|Burn it|Rename the journal",
      "Sharing a finding on social media without review is...|Not the same as peer review|Peer review|Impossible"
    ]),
    SC("Correlation and causation", "🔗", "<b>Correlation</b> means two things change together. <b>Causation</b> means one makes the other happen. A hidden <b>confounding variable</b> can make two things look connected.", "Think about whether two things merely appear together or one truly causes the other.", "Ice cream sales and sunburns both rise in summer, but hot sunny weather explains both.", [
      "Correlation means two things...|Change together|Are the same thing|Never change",
      "Causation means one thing...|Makes the other happen|Appears near the other|Is bigger than the other",
      "Ice cream sales and sunburns both rise in summer. This shows...|Correlation without proving causation|Proof that one causes the other|No relationship",
      "A hidden third factor that explains both is called a...|Confounding variable|Final variable|Silent variable",
      "To test causation, researchers often use...|Experiments with control groups|Rumors|Guesses",
      "Students who sign more have higher grades. Can we say signing caused it?|Not yet; other factors could explain it|Yes, always|No, signing never matters",
      "Correlation can be a good clue that something...|Deserves more research|Proves everything|Is always false",
      "A headline saying 'causes' based on a survey is often...|Too strong for the evidence|Always right|Required"
    ]),
    SC("Least restrictive environment", "🏫", "<b>IDEA</b> says children with disabilities should learn with peers without disabilities as much as is appropriate. This is the <b>least restrictive environment</b> (LRE). Many Deaf educators point out that a class where no one signs can be very restrictive for communication.", "Think about what really limits a Deaf child: the building, or whether they can fully communicate.", "A Deaf child alone in a class with no signers may miss most conversation, even though the room is 'regular'.", [
      "LRE stands for...|Least Restrictive Environment|Large Reading Experience|Local Rule Enforcement",
      "LRE is part of the law called...|IDEA|FERPA|Section 255",
      "LRE means students should learn with peers without disabilities...|As much as is appropriate for them|Never|Only at recess",
      "Many Deaf educators say a class with no signers may be...|Highly restrictive for communication|The most open choice|Perfect for everyone",
      "Placement decisions are made by the...|IEP team including the family|Principal alone|Random draw",
      "A range of placements from general classrooms to special schools is called a...|Continuum of placements|Shopping list|Spelling bee",
      "For a Deaf child, a key placement question is...|Can the child fully access language and peers?|Which building is newest?|Which bus ride is shortest?",
      "Placement should be based on the child's...|Individual needs|Average needs|Neighbor's wishes"
    ]),
    SC("Communication in the IEP", "📝", "For a child who is Deaf or hard of hearing, IDEA tells the IEP team to consider the child's <b>language and communication needs</b> and chances for <b>direct communication</b> with peers and adults in the child's own language or mode.", "Think about what the law asks the team to look at for a Deaf child, besides grades.", "A team writes down that the child needs daily access to peers and teachers who sign.", [
      "For a Deaf child, IDEA tells the IEP team to consider the child's...|Language and communication needs|Favorite color|Shoe size",
      "The team must consider chances for direct communication with...|Peers and adults in the child's language mode|Only the principal|Nobody",
      "Direct communication means communicating...|Without needing a go-between|Only by letter|Only through interpreters",
      "The team also looks at the child's academic level and...|Full range of needs|Only attendance|Only lunch choices",
      "Parents are...|Equal members of the IEP team|Not allowed to attend|Optional observers only",
      "An IEP team may include a...|Teacher of the Deaf|Random neighbor|Mail carrier",
      "Assistive technology needs can be written into the...|IEP|Lunch menu|Yearbook",
      "Access to sign language in the IEP should be...|Written down clearly|Left unsaid|Changed secretly"
    ]),
    SC("Vocational rehabilitation", "💼", "<b>Vocational rehabilitation</b> (VR) is a program, run mostly by state agencies with federal support, that helps people with disabilities prepare for, find and keep jobs. A VR counselor and the client make an <b>employment plan</b>.", "Think about what a job-help program would do first and what it is meant to lead to.", "A Deaf student applies, is evaluated, and works with a counselor on a plan for training and a job.", [
      "Vocational rehabilitation (VR) helps people with disabilities with...|Preparing for and finding jobs|Cooking contests|Buying cars",
      "VR is run mainly through...|State agencies with federal support|Private clubs|Only schools",
      "A VR counselor works with a client to make an...|Employment plan|Insurance claim|Movie",
      "VR can sometimes help pay for things like...|Training or assistive technology|Vacations|Video games",
      "A good VR counselor for Deaf clients understands...|Communication needs and Deaf culture|Nothing about it|Only one job type",
      "VR is connected to the law called the...|Rehabilitation Act|Gettysburg Address|Magna Carta",
      "A first step in VR is usually...|Applying and being evaluated for eligibility|Quitting|Winning a prize",
      "VR services are meant to help people become...|Employed and independent|Retired|Famous"
    ]),
    SC("Housing and air travel", "✈️", "The <b>Fair Housing Act</b> bans housing discrimination, and since 1988 it covers disability. The <b>Air Carrier Access Act</b> of 1986 protects air travelers with disabilities. Both are about equal access to everyday services.", "Think about the everyday places these two laws protect: homes and airplanes.", "A tenant asks to add a flashing doorbell light, and the landlord should allow it.", [
      "The Fair Housing Act forbids housing discrimination based on...|Disability, among other things|Favorite music|Shoe size",
      "Fair Housing rules cover landlords and...|Sellers and other housing providers|Only schools|Only airlines",
      "A tenant may ask to...|Install a flashing doorbell light|Pay extra fees for disability|Be refused without a reason",
      "The Air Carrier Access Act protects air travelers with...|Disabilities|Pets only|Big luggage only",
      "Airlines should make safety information accessible, for example by...|Using written or visual information|Staying silent|Playing loud music",
      "Requests for access are best made...|Clearly, with details, and kept in writing|Only by shouting|Never",
      "Both laws were passed to protect...|Equal access to everyday services|Only tourism|Only lawyers",
      "The Air Carrier Access Act was passed in the year...|1986|1886|2016"
    ]),
    SC("Sociolinguistic variables", "📈", "<b>Sociolinguistics</b> studies how language relates to society. Researchers look at how signing varies with <b>region, age, ethnicity, social network</b> and setting. Variation is a sign of a healthy, living language.", "Think about the kinds of people and places that can shape how a language is used.", "Younger and older signers may use different signs for the same idea, which shows change over time.", [
      "Sociolinguistics studies how language relates to...|Society and social groups|Only dictionaries|Only grammar tests",
      "Differences in signing between regions are called...|Regional variation|Alphabetical order|Sign spelling",
      "Differences between younger and older signers can show...|Language changing over time|Nothing|Mistakes only",
      "Factors that shape variation include age, region and...|Social network|Hair color|Shoe brand",
      "A linguistic variable is a feature that can be done...|In more than one way|Only one way|Not at all",
      "Variation in a language is a sign of a...|Healthy, living language|Broken language|Fake language",
      "School shapes signing because it is a place where signing is...|Shared and learned|Not allowed|Never used",
      "Sociolinguists often study real conversations using...|Recorded video|Guesses|Invented examples only"
    ]),
    SC("National Theatre of the Deaf", "🎭", "The <b>National Theatre of the Deaf</b> began in 1967. Its actors used sign language on stage, often together with voice actors for hearing audiences. It showed many people that sign languages are rich languages for art.", "Think about how a play can use movement, space and the face to tell a story.", "A signed play is full of visual storytelling: big movement, clear faces and use of the stage.", [
      "The National Theatre of the Deaf began in the year...|1967|1867|1987",
      "It is a theatre company that performs with...|Deaf and hard-of-hearing actors using sign language|Only puppets|Only silent clowns",
      "Its shows often used sign along with...|Voice actors for hearing audiences|Nothing at all|Only music",
      "Deaf theatre brought sign language art to...|Wider audiences|Nobody|One town only",
      "Signed plays have strong...|Movement, space and facial expression|Silence only|Written scripts only",
      "An interpreted performance puts interpreters...|Where audiences can see them near the stage|Outside the building|In another city",
      "Sign language on stage helped show that sign languages are...|Rich languages that suit art|Only for classrooms|Only for emergencies",
      "Casting Deaf actors in Deaf roles is valued because it gives...|Authentic representation|Lower quality|Less work"
    ]),
    SC("Visual Vernacular", "🎬", "<b>Visual Vernacular</b> (VV) is a performance style in sign language that mixes mime-like action with film-like views, such as close-ups and zooming out. It is used in storytelling and poetry and depends on imagery, movement and the face.", "Think about how a camera shows a scene, and how a performer can copy that with their body.", "A performer can show a wide landscape, then 'zoom in' on one tiny detail, all without spelling a word.", [
      "Visual Vernacular is a style of...|Visual storytelling in sign performance|Written essays|Spoken lectures",
      "VV often imitates...|Camera views such as close-ups|Radio shows|Sheet music",
      "VV relies on strong...|Facial expression and body movement|Spelling lists|A still body",
      "Compared with ordinary conversation, VV uses more...|Imagery and action|Fingerspelling|Numbers",
      "A zoom-out view in VV shows...|The larger scene|Nothing|A fingerspelled word",
      "VV is mainly used in...|Poetry and storytelling performance|Court records|Tax forms",
      "Artists of VV need strong...|Visual imagination|Typing speed|Voice volume",
      "VV shows sign languages can create...|Art that uses film-like techniques|Only simple messages|Only random gestures"
    ]),
    SC("Access at the theatre", "🎟️", "Venues can make shows accessible with interpreters, <b>open captions</b> (always visible), or <b>closed captions</b> (turned on by a viewer). In <b>shadow interpreting</b>, interpreters move on stage near the actors they match.", "Think about how an audience member can see both the show and the access service.", "A theatre gives interpreters the script and songs weeks ahead and reserves seats with a clear view.", [
      "Shadow interpreting at a play means the interpreter...|Moves on stage near the actor they match|Sits at home|Reads in advance only",
      "Open captions are...|Always visible on screen|Hidden until turned on|Spoken aloud",
      "Closed captions are...|Turned on or off by the viewer|Always printed|Only for music",
      "Preparing an interpreter for a play means giving them the...|Script and songs ahead of time|Tickets only|Nothing",
      "Good seating for Deaf patrons gives a clear view of...|The interpreter and stage|Only the exit|The ceiling",
      "Captions on a side screen help audiences...|Read the dialogue|Taste snacks|Park cars",
      "Venues should publish access information...|Before tickets are sold|After the show|Never",
      "Lighting for interpreters should make hands and face...|Clearly visible|Hidden|Dark"
    ]),
    respRate(),
    PL("Research methods words", "🔬", "Here are key words for reading and doing research.", "Match each word to its meaning and say it in your own words.", [
      "Hypothesis::A testable prediction::🔬", "Variable::Something that can change in a study::🔢", "Sample::The smaller group actually studied::👥", "Population::The whole group a study is about::🌎",
      "Bias::A pattern that unfairly tilts results::⚖️", "Peer review::Expert check before publishing::🧐", "Consent::Free agreement to take part::✅", "Qualitative::Data about meanings and experiences::💬"
    ]),
    readSpell("Read research words", ["sample", "survey", "ethics", "variable", "hypothesis", "interview", "evidence", "analysis", "consent", "results"], "Research papers use many fingerspelled terms. Practice reading words from research.")
  ];

  // ================= LEVEL 29 =================
  const L29 = [
    SC("Code-switching", "🔄", "Bilingual people move between their languages depending on who they talk with and where. This is <b>code-switching</b>. Signers also change how they sign for different people, which is <b>style shifting</b>.", "Think about why a bilingual person might change language or style from one moment to the next.", "A signer signs with friends, then writes English in an email to a clerk. Both are real, full languages.", [
      "Moving between two languages in conversation is called...|Code-switching|Code-breaking|Code-spelling",
      "A bilingual person might code-switch because of the...|Audience and setting|Weather only|Shoe size",
      "Code-switching is a sign of...|Language skill|Confusion|Rudeness",
      "Mouthing English words while signing is an example of...|Language contact|Interpreter error|Fingerspelling",
      "A bilingual person's two languages are both...|Fully real languages|One real and one fake|Not useful",
      "Changing how you sign for different people is called...|Style shifting|Time travel|Dictionary editing",
      "Researchers study code-switching to learn how...|Languages interact in people and communities|To ban languages|To grade people",
      "A signer who signs with friends and writes English emails uses...|Two languages in different settings|One language only|No language"
    ]),
    SC("Long goodbyes", "👋", "In many Deaf communities, saying goodbye can take a long time. Friends may not see each other often, and signing needs eye contact and attention, so people tend to finish their stories before they leave. It is a cultural norm, not rudeness.", "Think about why people who rarely meet might want to keep talking, and why walking away mid-sentence is hard in sign.", "A hearing ally who understands this waits patiently and does not rush the farewell.", [
      "In Deaf culture, saying goodbye can take...|A long time as friends keep chatting|Only a few seconds always|A whole month",
      "One reason for long goodbyes is that people value...|Time together and relationships|Speed|Silence",
      "Signing needs eye contact, so people often stay...|Face to face until they finish|Back to back|In different rooms",
      "A polite way to start leaving is to give...|A signal that you are about to go|No sign at all|A big surprise",
      "Long goodbyes are part of Deaf...|Culture and social norms|Law|Math",
      "Many Deaf people live far apart, so gatherings feel...|Special and worth lingering at|Pointless|Unnecessary",
      "Knowing this custom helps hearing allies...|Be patient and respectful|Rush people|Avoid events",
      "Walking away without saying goodbye might seem...|Rude to some people|Always polite|Required"
    ]),
    SC("Milestones in signing", "🍼", "Deaf children who see sign language from birth reach language milestones on a timeline <b>similar to hearing children learning speech</b>: babbling, first signs around the first birthday, two-sign combinations around age two, then grammar.", "Think about what happens when a child has full access to language from the start.", "A Deaf toddler with signing parents makes first signs at about the same age as hearing toddlers say first words.", [
      "Deaf children with signing parents reach milestones...|On a similar timeline to hearing children|Much later|Never",
      "Babbling comes before...|First signs|Birth|Graduation",
      "First signs often appear around a child's...|First birthday|Tenth birthday|Fortieth birthday",
      "Two-sign combinations appear around...|Age two|Age fifteen|Before birth",
      "Children learn grammar by...|Using the language around them every day|Memorizing lists|Never",
      "Young signers make early errors, just like hearing children make errors in...|Speech|Math|Singing only",
      "Hearing parents can help a Deaf child by...|Learning to sign and playing together daily|Waiting|Using no language",
      "A native signer is a person who...|Learned sign language from early childhood|Studied only as an adult|Was born in a city"
    ]),
    SC("The brain and sign language", "🧠", "Brain studies show that signed languages use many of the same <b>left-hemisphere</b> language areas as speech, plus areas for vision and space. Signers with damage in those areas can have <b>sign aphasia</b>.", "Think about what it means if the same brain regions handle language whether it is spoken or signed.", "A signer who has a stroke in a language area may have trouble signing, just like a speaker may have trouble speaking.", [
      "Sign language is processed mainly in the brain's...|Left-hemisphere language areas, like speech|Eyes only|Toes",
      "Language areas in the brain are not tied only to...|Sound|Brains|People",
      "Damage to language areas in a signer can cause...|Trouble signing, like aphasia in speech|Better signing|No change at all",
      "Sign aphasia is...|Language trouble after brain injury in a signer|A kind of hand injury|A style of art",
      "Brain scans show signers also use areas for...|Vision and space|Taste only|Hearing only",
      "This evidence shows the brain treats sign as...|True language|Mere gesture|Noise",
      "Language is processed in similar regions whether it is...|Spoken or signed|Only spoken|Only written",
      "A common brain imaging method is...|fMRI|A telescope|A map"
    ]),
    SC("Brain plasticity", "🌱", "<b>Plasticity</b> means the brain can change with experience. In many Deaf people, brain areas that handle hearing in others respond to vision or touch. This is called <b>cross-modal plasticity</b>. It shows a brain organized differently, not a broken one.", "Think about how a brain can adapt and use its resources in new ways.", "A brain region that usually handles sound may help process what a signer sees.", [
      "Plasticity means the brain can...|Change and adapt with experience|Never change|Turn to plastic",
      "In many Deaf people, brain areas that handle hearing in others can respond to...|Vision or touch|Nothing|Only smell",
      "Using areas in new ways is called...|Cross-modal plasticity|Cross-spelling|Cross-signing",
      "Plasticity is strongest in young brains but...|Continues in adults|Stops at birth|Is impossible",
      "Learning a new language, including sign, can...|Strengthen brain connections|Harm the brain|Shrink vocabulary",
      "Plasticity shows that brains are...|Flexible|Fixed forever|Empty",
      "A brain adapting to deafness is...|Organized differently, not broken|Missing parts|A mistake",
      "Researchers study plasticity to understand...|How experience shapes the brain|The weather|Soccer scores"
    ]),
    SC("Constructed action", "🎭", "In <b>constructed action</b>, a signer uses their own body, face and gaze to show what a character did, felt or said. It is a real linguistic tool in storytelling, not overacting.", "Think about how a storyteller can let the viewer see through a character's eyes.", "A signer retelling a chase shows the character's panic with their face and body as well as with signs.", [
      "Constructed action is when a signer...|Shows a character's actions or feelings with their own body|Spells names|Waits silently",
      "It often includes the character's...|Facial expression and posture|Phone number|Bank account",
      "Constructed action is common in...|Storytelling|Math tests only|Dictionaries",
      "It lets the viewer...|See the scene through the character|Miss the story|Only see numbers",
      "Changes in eye gaze can show...|Which character is 'speaking'|The time of day|Nothing",
      "Constructed action is part of ASL's...|Grammar and storytelling tools|Mistakes|Ads",
      "Constructed action is not 'overacting'; it is...|A real linguistic strategy|Silly|Forbidden",
      "A signer retelling a scene may show a character's turn of the head to...|Make the scene vivid|End the story|Hide the story"
    ]),
    SC("Negation", "🙅", "In ASL, a <b>headshake</b> is a non-manual marker that can show negation, meaning 'not'. ASL also has separate negative signs. The headshake spreads over the part of the sentence it applies to.", "Think about which part of the body can carry grammar without using the hands.", "A signer shakes their head while signing the part of the sentence that is negated.", [
      "In ASL, a headshake can help show...|Negation, meaning 'not'|A question only|The past",
      "A negative headshake is a...|Non-manual marker|Fingerspelled word|Handshape",
      "ASL also has separate signs for words like...|Not and none|Only dates|Colors only",
      "A negative headshake usually spreads over...|The part of the sentence it applies to|Only one finger|Nothing",
      "Non-manual markers are made with the...|Face, head and body|Hands only|Voice",
      "Nodding the head often shows...|Yes or agreement|No|A question about time",
      "Every language has some way to express...|Negation|Only questions|Only colors",
      "If the headshake is missing in a negative sentence, the sentence may be...|Hard to understand or ungrammatical|Perfect|Funny"
    ]),
    SC("Educational interpreters", "🎒", "<b>Educational interpreters</b> work in K-12 schools so Deaf students can follow lessons and talk with classmates. The <b>EIPA</b> (Educational Interpreter Performance Assessment) is a test used to rate their skills.", "Think about how much a child's learning depends on the interpreter's language skills and subject knowledge.", "An educational interpreter learns science vocabulary before a lesson on cells.", [
      "Educational interpreters work in...|K-12 schools|Only courts|Only hospitals",
      "A test used to rate educational interpreters is the...|EIPA|SAT|NBA",
      "EIPA stands for Educational Interpreter Performance...|Assessment|Alphabet|Atlas",
      "Educational interpreters help students access...|Class instruction and talk with peers|Only the gym|Only lunch",
      "Quality matters a lot because a young student's learning...|Depends on the interpreter's skill|Does not depend on it|Happens later",
      "An educational interpreter also needs to know...|The subject vocabulary being taught|Only hobbies|Nothing",
      "Educational interpreters must keep...|Professional boundaries, even with kids|Secrets from teachers|No rules",
      "Compared with one-time community jobs, educational interpreting often means...|Working with the same students over time|Only one visit|Only courtrooms"
    ]),
    SC("Family members as interpreters", "👨‍👩‍👧", "Using a child or relative as an interpreter can cause errors, privacy problems and stress. Under the ADA, a business generally may not require a Deaf person to bring their own interpreter. Qualified interpreters are trained to be neutral and accurate.", "Think about why a trained, neutral professional is safer than a relative in serious settings.", "A doctor books a qualified interpreter instead of asking a ten-year-old to explain a diagnosis.", [
      "Children interpreting for parents can be harmful because...|They may be too young to handle adult topics|Children are never able to sign|It is always required",
      "Family members may lack...|Training and neutrality|Love|Sign language",
      "Professional interpreters are trained to be...|Neutral and accurate|Opinionated|Silent",
      "In medical or legal settings, relying on relatives can risk...|Errors, privacy problems and conflicts|Faster service|Nothing",
      "Equal access means the organization should provide...|A qualified interpreter|Only a relative|Nothing",
      "Under the ADA, a business generally may not require a Deaf person to...|Bring their own interpreter|Show an ID|Smile",
      "Hearing children of Deaf parents are often called...|CODAs|Voicers|Glossers",
      "For important conversations, the best choice is a...|Qualified professional interpreter|Stranger|Guess"
    ]),
    SC("Consecutive and simultaneous", "⏱️", "In <b>simultaneous</b> interpreting, the interpreter works almost at the same time as the speaker. In <b>consecutive</b> interpreting, the interpreter waits for a chunk of speech, then interprets it. Both aim for accurate meaning.", "Think about whether the interpreter waits for a pause or keeps up in real time.", "A speech is usually simultaneous. A short interview with pauses can be consecutive.", [
      "In simultaneous interpreting, the interpreter...|Works almost at the same time as the speaker|Waits for a long pause|Writes first",
      "In consecutive interpreting, the interpreter...|Waits for a chunk, then interprets|Never speaks|Talks over everyone",
      "Interpreting a speech as it is given usually uses...|Simultaneous interpreting|Consecutive interpreting|Gloss",
      "Consecutive interpreting needs good...|Memory and note-taking|Typing speed|Singing",
      "Simultaneous interpreting makes the work...|Mentally demanding|Easy|Pointless",
      "Consecutive can give the interpreter time to...|Think about the best phrasing|Leave|Sleep",
      "Both modes aim for accurate...|Meaning|Spelling|Volume",
      "Interpreting sentence by sentence with pauses is...|Consecutive|Simultaneous|Sight translation"
    ]),
    SC("Health information and privacy", "🏥", "<b>HIPAA</b> is a US law about medical privacy. Health interpreters keep patient information <b>confidential</b>. <b>Informed consent</b> means a patient understands the treatment and agrees, in a language or format they can access.", "Think about who may hear private medical details, and how a patient must understand before agreeing.", "A patient gets consent information explained in sign language before agreeing to a procedure.", [
      "HIPAA is a US law about...|Medical privacy|Road safety|Tax filing",
      "Interpreters in healthcare keep patient information...|Confidential|Public|On social media",
      "Informed consent in healthcare means a patient understands...|The treatment and agrees|Nothing|Only the bill",
      "A patient who signs should get consent information in...|Sign language or another accessible way|Tiny print only|A language they do not know",
      "Medical terms may need extra explanation because they are...|Complex and specialized|Always easy|Banned",
      "Patients have the right to ask...|Questions until they understand|Nothing|Only yes or no questions",
      "An interpreter who adds personal advice is...|Stepping outside the role|Doing excellent work|Required to",
      "Health interpreters often prepare by learning...|Common medical terms|Sports scores|Poems only"
    ]),
    SC("Voicing for signers", "🎙️", "Interpreting from a signed language into spoken language is often called <b>voicing</b>. The interpreter speaks in the first person ('I') and carries the signer's meaning, tone and style, without adding or removing information.", "Think about whose words the interpreter is speaking, and what must stay the same.", "A signer says they are worried; the interpreter says 'I am worried', in a worried tone.", [
      "Interpreting from sign into spoken language is often called...|Voicing|Gloss|Captioning",
      "Voicing must carry the signer's...|Meaning and tone|Opinion of the interpreter|Nothing",
      "The interpreter usually speaks...|In the first person, as the signer|In the third person always|In silence",
      "Voicing is hard because facial grammar and space must be turned into...|Words and tone|Nothing|English letters",
      "If a sign is unclear, the interpreter may...|Ask for clarification when appropriate|Make up a meaning|Stop the job forever",
      "Interpreters should avoid adding or removing...|Information|Pauses|Breaths",
      "Good voicing sounds natural in...|Spoken English|A random language|Whispers only",
      "To see the signer clearly, the best position is...|A clear line of sight|Behind a pillar|In another room"
    ]),
    SC("Mainstreaming and residential schools", "🚌", "<b>Mainstreaming</b> means placing students with disabilities in regular classes. A 1975 law, the Education for All Handicapped Children Act, supported inclusion. Enrollment at many <b>residential schools</b> for the Deaf dropped afterward. These schools were also key places for Deaf community and language.", "Think about the trade-off: being near home and classmates versus having signing peers and full access.", "A Deaf student in a local school may be the only signer, while a residential school offers many signing peers.", [
      "Mainstreaming means placing students with disabilities in...|Regular classes with others|Separate islands|Only hospitals",
      "In the decades after the 1975 law, enrollment at many Deaf schools...|Dropped as more students went to local schools|Doubled|Stayed identical",
      "A residential school is one where students...|Live at school during the week|Never attend|Only play",
      "Residential schools were important places for Deaf...|Community and language|Isolation|Banking",
      "Some Deaf students in mainstream schools can feel...|Isolated if no peers sign|Always popular|Unable to learn",
      "The law that began in 1975 supporting inclusion was the...|Education for All Handicapped Children Act|Declaration of Independence|Bank Act",
      "Supporters of Deaf schools stress...|Full language access and Deaf peers and role models|Isolation|Fewer classes",
      "The best placement depends on...|The individual child's needs|Only price|Only distance"
    ]),
    SC("Rhyme and rhythm in sign poetry", "🎼", "Sign poems play with the parts of signs. <b>Handshape rhyme</b> repeats a similar handshape across signs. Movement can have <b>rhythm</b>, like a beat. Poets also use <b>symmetry</b> and space. Clayton Valli was a Deaf poet and linguist who studied these patterns.", "Think about how a poem can repeat patterns the way a song repeats sounds, but with hands, movement and space.", "A poem repeats one handshape in several signs, making a visual rhyme.", [
      "In sign poetry, handshape rhyme means repeating...|A similar handshape across signs|A sound|A letter only",
      "Movement in a sign poem can have...|Rhythm like a beat|No timing|Sound only",
      "Symmetry in sign poems uses...|Matching shapes on both hands|Only one finger|Silence",
      "Poets use space to...|Show relationships and images|Hide meaning|Waste time",
      "A sign poem is meant to be...|Seen as a performance|Heard|Smelled",
      "Poetry plays with language to create...|Beauty and new meaning|Rules for taxes|Instructions",
      "Clayton Valli was a Deaf poet who was also a...|Linguist|Pilot|Chef",
      "Signed poems are often shared on...|Video|Wax tablets only|Radio"
    ]),
    SC("Music and sign", "🎵", "Deaf people can enjoy music through <b>vibration, rhythm and visuals</b>. A signed song is not signs for each word. It conveys meaning, feeling and the beat. Concerts can offer access with interpreters and captions.", "Think about how music can be felt and seen, not only heard.", "A performer feels the drum through the floor and signs the chorus in time with the beat.", [
      "Deaf people can experience music through...|Vibrations, rhythm and visuals|Nothing|Only words",
      "Signed songs focus on conveying...|Meaning, feeling and rhythm|Only single words|Ads",
      "Translating lyrics into sign requires signs that...|Fit the meaning and the beat|Spell the title|Ignore the song",
      "Some Deaf performers use drums or floors to feel...|Vibration|Taste|Smells",
      "Concerts can offer access through...|Interpreters and captions|Nothing|Silence",
      "Interpreters of music often prepare by studying...|The lyrics ahead of time|Nothing|Only the ticket",
      "A beat can be shown in sign by...|Timing and body movement|Typing|Whispering",
      "Music access is a good example of...|Creative accessibility|Impossibility|Rule-breaking"
    ]),
    chance(),
    PL("Sociolinguistics words", "🗣️", "Here are key words for studying how people use language.", "Match each word to its meaning and say it in your own words.", [
      "Dialect::A variety of a language used by a group::🗺️", "Register::Style of language for a situation::🎭", "Code-switching::Moving between two languages::🔄", "Variation::Different ways of saying the same thing::🌈",
      "Acquisition::Learning a first language::👶", "Bilingual::Using two languages::💬", "Contact::When two languages meet and influence each other::🤝", "Style shifting::Changing how you sign for different people::🎚️"
    ]),
    readSpell("Read language words", ["register", "dialect", "variation", "bilingual", "grammar", "community", "acquisition", "contact", "fluency", "identity"], "Language classes use many fingerspelled terms. Practice reading words about how people use language.")
  ];

  // ================= LEVEL 30 =================
  const L30 = [
    SC("Why machines struggle with sign", "🤖", "Signed languages use many channels at once: hands, face, head, body and space. Computers learn from large sets of examples called <b>training data</b>, and good, labeled data for sign languages is limited. Tools should be built and tested with Deaf signers, with consent.", "Think about how many things a signer does at the same time, and what a computer would need to see.", "A tool that tracks only the hands might miss a raised eyebrow that changes a sentence into a question.", [
      "Signed languages use many channels at once, including hands, face and...|Body and space|Only voice|Only spelling",
      "Computers learn from large sets of examples called...|Training data|Wall paint|Static",
      "Limited labeled data for sign languages makes machine learning...|Harder|Easier|Unnecessary",
      "Facial grammar matters, so a system that tracks only hands may miss...|Grammar and meaning|Nothing|Hand color",
      "Recognizing fingerspelling alone is not the same as understanding...|A whole sign language|A calendar|Math",
      "Tools that translate sign should be tested with...|Deaf signers|Nobody|Only developers",
      "Using someone's signing videos as training data needs their...|Informed consent|Silence|Nickname",
      "A translation tool should not replace...|Qualified interpreters in important settings|Games|Calendars"
    ]),
    SC("Notation for researchers", "✍️", "Researchers sometimes record signs with written symbols called <b>notation</b>. The <b>Hamburg Notation System</b> (HamNoSys) was developed at a university in Germany. Notation can capture handshape, location, movement and more, which English glosses lose.", "Think about why written symbols for the parts of a sign can be more exact than an English label.", "Stokoe's early system gave symbols to a sign's place, handshape and movement.", [
      "Researchers use notation systems to record...|Signs in written symbols|Songs|Recipes",
      "HamNoSys stands for the Hamburg Notation...|System|Station|Study",
      "HamNoSys was developed at a university in...|Germany|Brazil|Canada",
      "A notation system records parts such as handshape, location and...|Movement|Weather|Color",
      "Stokoe's early notation gave symbols for location, handshape and...|Movement|Voice|Color",
      "English glosses are limited because they lose information like...|Facial grammar and use of space|Spelling|Page numbers",
      "A good notation should represent...|Fine details of how a sign is made|Only the topic|Only the meaning",
      "SignWriting is meant for...|Everyday reading and writing in sign languages|Only lab secrets|Only numbers"
    ]),
    SC("Families of sign languages", "🌳", "Sign languages have histories. <b>ASL</b> is historically linked to <b>French Sign Language</b>, because Laurent Clerc, a Deaf teacher from France, helped found the American School for the Deaf in Hartford, Connecticut in 1817. <b>British Sign Language</b> is a different, mostly unrelated language.", "Think about how a language travels when teachers and students move.", "A teacher's language spreads through a school and shapes the language of the next generation.", [
      "ASL is historically linked to...|French Sign Language|British Sign Language|Spoken English",
      "ASL and British Sign Language are...|Different, mostly unrelated languages|The same language|Dialects of each other",
      "Two sign languages can be related when...|Teachers and students bring a language to a new school|It rains|Roads are built",
      "Laurent Clerc helped found a school for the Deaf in...|Hartford, Connecticut|Lisbon|Sydney",
      "Sign languages differ by country because...|Deaf communities develop their own languages|Governments invent them|Spoken languages decide them",
      "A language family is a group of languages with...|A common ancestor|The same flag|The same alphabet",
      "Sign languages are not just signed versions of the local...|Spoken language|Culture|Shadows",
      "Linguists compare vocabulary to study how languages are...|Related|Spelled|Delivered"
    ]),
    SC("Standard language ideas", "📏", "A <b>standard language ideology</b> is the belief that one way of using a language is the only correct one. Linguists say all varieties follow rules. Calling a regional sign 'wrong' mixes up <b>difference</b> with <b>error</b>.", "Think about whether a different way of signing is a mistake or just a different valid variety.", "A teacher who respects students' home signs helps them feel valued and learn more.", [
      "A standard language ideology is the belief that one variety is...|The only correct or best one|One of many equal ones|Illegal",
      "Linguists say all varieties of a language have...|Rules and structure|No grammar|Only errors",
      "Calling a regional sign 'wrong' reflects...|A language attitude|A law|A handshape",
      "Prestige varieties are those with...|Higher social status|Longer names|More sounds",
      "Judging a signer by their variety can be unfair because it...|Mixes up difference with error|Is a compliment|Is objective",
      "A teacher respecting students' home varieties helps them...|Feel valued and learn more|Stop signing|Forget their signs",
      "Variation in sign is best treated as...|Natural diversity|A problem to erase|A secret",
      "A fair description of regional signs is...|Different but equally valid|One right, the rest wrong|All identical"
    ]),
    SC("Reflective practice", "🪞", "<b>Reflective practice</b> means thinking carefully about your work to learn and improve. Interpreters ask: What went well? What could I do differently? Feedback from mentors and Deaf colleagues helps. Details about clients stay <b>confidential</b>.", "Think about how a professional keeps growing after training ends.", "After a hard job, an interpreter writes notes with no names and discusses the lessons with a mentor.", [
      "Reflective practice means thinking about your work to...|Learn and improve|Brag|Avoid feedback",
      "After a job, an interpreter might ask: What went well and what...|Could I do differently?|Was the weather?|Was lunch?",
      "Keeping a journal about assignments helps...|Notice patterns|Hide mistakes|Replace training",
      "Feedback from mentors and Deaf colleagues is...|Valuable|Unwanted|Illegal",
      "Debriefing with a team after a hard job helps...|Process the experience and improve|Waste time|Share private details",
      "When reflecting, client details should stay...|Confidential|Public|Posted online",
      "Lifelong learning means skills keep growing...|Throughout a career|Only in school|Never",
      "Mistakes are best treated as chances to...|Learn|Hide|Blame others"
    ]),
    SC("Case study: the emergency room", "🚑", "A Deaf patient arrives at the emergency room and no interpreter is on site. The hospital must still provide <b>effective communication</b>. A qualified interpreter, in person or by video, is the best choice. The interpreter keeps information confidential and does not give medical advice.", "Think about who is qualified, neutral and quick to reach in an emergency.", "Staff call a video interpreting service while writing short notes to the patient.", [
      "A nurse suggests the patient's 12-year-old nephew interpret. What is best?|Call for a qualified interpreter, using video if needed|Let the child interpret all the details|Skip communication",
      "While waiting for an interpreter, staff can use simple methods like...|Writing or typing short messages|Shouting|Ignoring the patient",
      "Video remote interpreting helps because it can...|Bring in an interpreter quickly|Never work|Cost nothing",
      "The patient asks the interpreter 'Should I take this medicine?' The interpreter should...|Interpret the question and let the doctor answer|Give an opinion|Leave",
      "The patient is scared. The interpreter helps most by...|Interpreting accurately and calmly|Making promises|Telling the patient's story to others",
      "If the interpreter shares details with a friend later, that breaks...|Confidentiality|Nothing|A dress code",
      "The hospital should record the patient's access needs so that next time...|Staff know to provide an interpreter|The record is lost|The patient pays",
      "An interpreter in the room should be positioned so the patient has...|A clear view of the interpreter|No view|A view of the ceiling"
    ]),
    SC("Case study: the lecture hall", "🎓", "A Deaf student in a college lecture faces uncaptioned videos, fast talk and many students speaking at once. The student, instructor and campus <b>disability services office</b> can work together. The ADA and Section 504 require access.", "Think about the practical steps that give the student equal access to everything said and shown.", "The professor shares slides in advance, repeats questions and uses captioned videos.", [
      "A professor plays an uncaptioned video. What should be requested?|A captioned version or transcript|Nothing|Skipping class",
      "Interpreters need slides ahead of time, so the professor can...|Share materials in advance|Hide them|Change them on exam day",
      "When many students talk at once, a helpful rule is...|One person speaks at a time and says their name|Everyone talks at once|No discussion",
      "Interpreters in long lectures often work in teams because...|Accuracy drops with fatigue|They like company|Of noise rules",
      "The interpreter should stand where the student has...|A clear view of the interpreter and the speaker|No view|A view of the hall",
      "Note-taking can be supported by a note-taker or captioning so the student does not...|Have to look away from the interpreter|Take any notes|Attend",
      "If the student feels unsupported, they can contact the campus...|Disability services office|Strangers online|Nobody",
      "A college's duty to provide access comes from laws like...|The ADA and Section 504|The school mascot|Local zoning only"
    ]),
    SC("Case study: the conference talk", "🎤", "A Deaf researcher gives a talk in ASL at a conference, with interpreters voicing for hearing attendees and captions for the recording. Access works best when it is planned early: sending slides and key terms to interpreters, repeating audience questions, and budgeting for access.", "Think about what the interpreters and audience need before and during the talk.", "The organizers plan access in the budget and book interpreters weeks ahead.", [
      "A Deaf researcher gives a talk in ASL. The researcher should send interpreters...|The slides and key terms in advance|Nothing|The audience list",
      "Who decides how the talk is interpreted?|The speaker and organizers together with the interpreters|Nobody|A random vote",
      "For audience questions, good practice is to repeat the question...|Into the microphone so everyone can follow|In a whisper|Never",
      "A guest says 'You are so inspiring just for being here.' Better to focus on...|The research|The ears|The clothes",
      "The talk is recorded. The captions should be...|Accurate and added to the video|Left out|Unchecked automatic text only",
      "To offer interpreters from the start, organizers should...|Plan access in the budget|Hope nobody needs it|Charge Deaf attendees",
      "Slides should be readable, with...|Large text and clear images|Tiny text|White text on white",
      "After the talk, sharing the work in ASL video and English text gives...|Wider access|Less access|No benefit"
    ]),
    SC("Parts of a research article", "📄", "A research article usually has an <b>abstract</b> (short summary), an introduction, <b>methods</b> (how the study was done), <b>results</b> (what was found), a <b>discussion</b> (what it means, with limitations) and <b>references</b>.", "Think about where in an article you would look to find a summary, the method, or the findings.", "To decide quickly if an article fits, read the abstract first.", [
      "A short summary at the start of an article is the...|Abstract|Reference list|Appendix",
      "The section that explains how the study was done is the...|Methods|Results|Dedication",
      "The section showing what was found is the...|Results|Methods|Title page",
      "The section that explains what the results mean is the...|Discussion|Abstract|Acknowledgments",
      "A list of sources used at the end is the...|References|Abstract|Methods",
      "The introduction explains why the topic...|Matters and what question is asked|Is boring|Has no answer",
      "To decide quickly whether an article fits your needs, read the...|Abstract first|Last page only|Nothing",
      "A limitations section tells the reader about...|Weaknesses and what the study cannot show|Prizes|Fonts"
    ]),
    SC("Replication", "🔁", "<b>Replication</b> means repeating a study to see if the same result appears. A result found again with different groups is more trustworthy. One small study is a clue, not final proof. A <b>systematic review</b> combines many studies on one question.", "Think about why it helps when different researchers get the same result.", "Two research teams in different regions run the same survey and compare results.", [
      "Replication means repeating a study to see if...|The same results appear|The paper is longer|The journal changes",
      "If a result replicates in different groups, we trust it...|More|Less|The same as a rumor",
      "A single small study is...|A starting clue, not final proof|Final proof|Useless",
      "A systematic review combines...|Many studies on one question|One interview|Fiction",
      "Studies with tiny samples are harder to...|Generalize|Print|Spell",
      "Sharing methods clearly lets others...|Repeat the study|Copy the author's name|Forget it",
      "Science improves by...|Testing and correcting ideas over time|Never changing|Voting",
      "A study with only one group of signers may not apply to...|Other groups or regions|Everyone for sure|Nobody"
    ]),
    SC("Sharing research in sign", "📹", "Research about Deaf communities should reach those communities. Researchers can share results in ASL video with captions, plain-language summaries, open-access articles and community events with interpreters. A Deaf co-author or advisor helps keep work accurate and respectful.", "Think about how the people who took part can actually read or watch the results.", "A team posts a short ASL video summary and a captioned version alongside the paper.", [
      "A video abstract in ASL helps Deaf readers...|Understand the research in their language|Avoid the research|Skip English",
      "Sharing results with the community who took part is a way to...|Give back and build trust|Collect fees|Hide results",
      "Open access means articles are...|Free to read|Locked|Secret",
      "Plain-language summaries explain research...|Without technical jargon|With more jargon|In code",
      "Research should reach the community because...|Everyone deserves access to knowledge about them|Nobody cares|A law forbids it",
      "Researchers should offer captions and transcripts for...|Videos|Chairs|Hallways",
      "A Deaf co-author or advisor can help ensure work is...|Accurate and respectful|Delayed|Hidden",
      "Presentations at community events should be...|Accessible with interpreters or in ASL|Only in writing|Closed to all"
    ]),
    SC("Advocacy campaigns", "📣", "An <b>advocacy campaign</b> works for a change. Steps: set a clear <b>goal</b>, find <b>allies</b>, write a short message with a specific <b>ask</b>, use stories and evidence, then <b>follow up</b>. The people most affected should lead or be included.", "Think about the steps from deciding what you want to making sure it actually happens.", "A group asks a city to caption all public meeting videos and thanks the council after.", [
      "An advocacy campaign starts with a clear...|Goal|Joke|Ending",
      "Allies are people or groups who...|Support your cause|Oppose it|Are unaware",
      "A good message is short, clear and tells people the...|Specific change you want|Whole history|Weather",
      "Stories from real people can make a campaign...|More persuasive|Less persuasive|Illegal",
      "Evidence like data and laws makes the argument...|Stronger|Weaker|Silly",
      "After the event, a good campaign does a...|Follow-up|Disappearing act|Prank",
      "Campaigns for access should include the people...|Most affected|Least affected|Only outsiders",
      "A petition shows decision makers that...|Many people support the change|Nobody cares|The law has ended"
    ]),
    SC("How a bill becomes law", "🏛️", "In the US, a <b>bill</b> is a proposed law. It is studied in committees, which hold <b>hearings</b>, and must pass both the House and the Senate. Then the President signs it or <b>vetoes</b> it. Public hearings should be accessible with interpreters and captions. The ADA was signed in 1990.", "Think about the steps a proposal takes before it becomes a law.", "A bill passes both houses, the President signs it, and it becomes law.", [
      "A proposal for a new law is called a...|Bill|Poll|Banner",
      "In the US Congress, a bill must pass the House and the...|Senate|Supreme Court only|Cabinet",
      "After Congress passes a bill, it goes to the...|President to sign or veto|Principal|Mayor",
      "A veto is when the President...|Refuses to sign a bill|Signs it|Writes it",
      "Committees study bills and hold...|Hearings|Concerts|Picnics",
      "Public hearings should be accessible through...|Interpreters and captioning|Nothing|Only fast speech",
      "Citizens can influence laws by contacting their...|Elected representatives|Neighbors only|Pen pals",
      "The ADA was signed into law in...|1990|1790|2090"
    ]),
    SC("Employment rights and the EEOC", "👔", "<b>Title I</b> of the ADA covers employment, including job interviews. The <b>EEOC</b> (Equal Employment Opportunity Commission) enforces laws against job discrimination. Employers must provide reasonable accommodations and must not <b>retaliate</b> against people who ask for them or file complaints.", "Think about which agency enforces job fairness laws and what an employer may not do to someone who speaks up.", "An employee keeps a dated record of the interpreter requests they made.", [
      "Title I of the ADA covers...|Employment|Voting|Phone service",
      "The EEOC is a federal agency that enforces laws against...|Job discrimination|Speeding|Bad spelling",
      "EEOC stands for Equal Employment Opportunity...|Commission|Council|Club",
      "An employee can ask for a reasonable accommodation such as...|An interpreter for meetings|A new boss|A longer vacation always",
      "If discrimination happens, a person usually has limited time to...|File a charge|Retire|Move",
      "Employers must not retaliate against a person who...|Asks for accommodations or files a complaint|Works hard|Arrives early",
      "Keeping records of requests and dates helps because it...|Provides evidence|Looks pretty|Wastes paper",
      "Because interviews are covered, employers should provide...|Interpreters or other access on request|Nothing|Fewer questions"
    ]),
    SC("Starting a business", "🏪", "A <b>business plan</b> describes the idea, the customers and the costs. <b>Market research</b> asks who might use the product. A <b>budget</b> compares money coming in with money going out. <b>Profit</b> is what is left after costs. Accessible businesses offer captions and easy ways to contact them by text or video.", "Think about what an owner must figure out before opening: who, how much, and how to reach people.", "A small design shop lists customers, costs, prices and ways to contact it by email and video.", [
      "A business plan describes the idea, the customers and the...|Costs and how money will be made|Weather|Rumors",
      "Market research asks who might...|Buy the product or service|Cook|Sing",
      "A budget compares money coming in with money...|Going out|Staying still|Stolen",
      "Profit is money earned after subtracting...|Costs|Taxes forever|Dreams",
      "Deaf-owned businesses may serve Deaf customers by offering...|Signing staff and visual communication|Loud music|Silence",
      "Making a business accessible includes captions on videos and...|Easy ways to contact it by text or video|Only phone calls|Locked doors",
      "A mentor in business can offer...|Advice from experience|Free products|Magic",
      "Every business should check rules about licenses and...|Taxes|Weather|Pets"
    ]),
    frames(),
    PL("Capstone words", "🎓", "Here are important words from this year of study.", "Match each word to its meaning and say it in your own words.", [
      "Replication::Repeating a study to check results::🔁", "Notation::Written symbols for recording signs::✍️", "Advocacy::Speaking up for a cause::📣", "Veto::The President's refusal to sign a bill::✋",
      "Abstract::Short summary of an article::📄", "Retaliation::Punishing someone for standing up for rights::⚠️", "Training data::Examples used to teach a computer::💾", "Reflection::Thinking about your work to improve::🪞"
    ]),
    readSpell("Read capstone words", ["advocacy", "notation", "abstract", "replication", "committee", "evidence", "profit", "mentor", "veto", "budget"], "Advanced classes use many fingerspelled terms. Practice reading words from policy, research and careers.")
  ];

  Object.assign(SIGN_LEVELS, {
    28: lvl(28, L28, [0, 2, 4, 7, 11, 13, 15, 17]),
    29: lvl(29, L29, [0, 3, 5, 7, 9, 12, 15, 17]),
    30: lvl(30, L30, [0, 2, 5, 8, 10, 12, 15, 17])
  });
})();
