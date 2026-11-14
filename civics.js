// Mind Lab Civics & Government. Levels 1-3, 20 lessons each (60 lessons). Teach slides, then quiz; every question has 3 hints.
const CIVICS_LEVELS = (() => {
  // ---------- tiny lesson engine (all inside this IIFE) ----------
  const slide = (h, v, t) => ({ h, v, t });
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const strip = s => String(s).replace(/^(a|an|the)\s+/i, "");
  const first = s => strip(s).replace(/<[^>]+>/g, "")[0].toUpperCase();
  // Bank lesson. items = [name, emoji, clue]; the clue is a verb phrase ("flies in the sky").
  // Questions: clue -> name, name -> clue, picture -> name.
  const BK = o => {
    const it = o.items, hasE = it.every(x => x[1]);
    const qa = o.qa || (c => `Which one ${c}?`), qb = o.qb || (n => `Finish the sentence: ${cap(n)} ...`), qc = o.qc || "What is this?";
    const make = () => {
      const m = pick(hasE ? ["a", "b", "c"] : ["a", "b"]), cur = pick(it), rest = shuf(it.filter(x => x !== cur)), ex = rest[0];
      if (m === "a") return {
        text: qa(cur[2]), choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Read the clue again slowly. Which choice matches it best?", `The answer starts with the letter "${first(cur[0])}".`, `Example: ${cap(ex[0])} ${ex[2]}. So if a clue says "${ex[2]}", the answer is ${ex[0]}. Now do yours.`]
      };
      if (m === "b") return {
        text: qb(cur[0]), choices: shuf([cur[2], rest[1][2], rest[2][2]]), answer: cur[2],
        hints: ["Think back to the lesson. What did you learn about this one?", "Cross out the choices that sound like something else. Only one fits.", `Example: ${cap(ex[0])} ${ex[2]}. Now do yours.`]
      };
      return {
        text: qc, visual: cur[1], choices: shuf([cur[0], rest[1][0], rest[2][0]]), answer: cur[0],
        hints: ["Look at the picture closely. What do you see?", `The answer starts with the letter "${first(cur[0])}".`, `Example: ${ex[1]} is ${ex[0]}. Now look at your picture.`]
      };
    };
    make.teach = () => [
      slide(o.title, o.tv || it.slice(0, 3).map(x => x[1] || "").join(" ") || "📚", o.intro),
      slide("Let's learn", it.map(x => (x[1] ? x[1] + " " : "") + `<b>${cap(x[0])}</b> ${x[2]}.`).join("<br>"), o.look || "Read each one slowly."),
      slide("Remember", o.tipv || "💡", o.tip)
    ];
    return make;
  };
  // Multiple-choice lesson. items = [question, right answer, "wrong1|wrong2", optional picture].
  // s = 3 slides [heading, picture, text]. h = 3 hints.
  const MC = o => {
    const make = () => {
      const [q, a, w, v] = pick(o.items), r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: o.h };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => o.s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  // Mixed lesson built from earlier lessons of the same level.
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const LS = (title, make) => ({ title, make });
  const M = (t, s, h, items) => LS(t, MC({ s, h, items }));
  const B = (t, o) => LS(t, BK(Object.assign({ title: t }, o)));

  // ---------- voting maker ----------
  const VGROUPS = [
    ["lunch", [["pizza", "🍕"], ["tacos", "🌮"], ["pasta", "🍝"], ["soup", "🍲"], ["rice", "🍚"], ["salad", "🥗"]]],
    ["the class game", [["tag", "🏃"], ["hide and seek", "🙈"], ["freeze dance", "💃"], ["kickball", "⚽"], ["bingo", "🎯"]]],
    ["the class pet", [["a bunny", "🐰"], ["a fish", "🐟"], ["a turtle", "🐢"], ["a hamster", "🐹"], ["a frog", "🐸"]]],
    ["the field trip", [["the zoo", "🦁"], ["the park", "🌳"], ["the museum", "🏛️"], ["the farm", "🚜"], ["the aquarium", "🐠"]]]
  ];
  const VOTE = max => {
    const make = () => {
      const [topic, opts] = pick(VGROUPS), three = shuf(opts).slice(0, 3), counts = shuf(Array.from({ length: max }, (_, i) => i + 1)).slice(0, 3);
      const rows = three.map((o, i) => ({ name: o[0], e: o[1], n: counts[i] }));
      const vis = rows.map(r => `${r.e} ${r.name}: ${max <= 8 ? "🟦".repeat(r.n) : r.n + " votes"}`).join("<br>");
      const sorted = rows.slice().sort((a, b) => b.n - a.n), names = rows.map(r => r.name);
      const t = Math.floor(Math.random() * 4);
      if (t === 0) return {
        text: `The class votes for ${topic}. Which choice got the MOST votes?`, visual: vis, choices: shuf(names), answer: sorted[0].name,
        hints: ["Look at the votes for each choice.", "The choice with the biggest number of votes is the winner. Compare the rows.", "Example: pizza has 5 votes and soup has 3 votes. 5 is bigger than 3, so pizza wins. Now do yours."]
      };
      if (t === 1) return {
        text: `The class votes for ${topic}. Which choice got the FEWEST votes?`, visual: vis, choices: shuf(names), answer: sorted[2].name,
        hints: ["Look at the votes for each choice.", "Fewest means the smallest number of votes. Compare the rows.", "Example: pizza has 5 votes and soup has 3 votes. 3 is smaller, so soup has fewer. Now do yours."]
      };
      if (t === 2) return {
        text: `The class votes for ${topic}. How many votes were there in all?`, visual: vis, answer: counts[0] + counts[1] + counts[2],
        hints: ["In all means all the votes added together.", "Add the votes of all three choices. Start with the biggest and count on.", "Example: 2 + 4 + 3. First 2 + 4 = 6, then 6 + 3 = 9. Now do yours."]
      };
      const a = sorted[0], b = sorted[1];
      return {
        text: `The class votes for ${topic}. How many MORE votes did ${a.name} get than ${b.name}?`, visual: vis, answer: a.n - b.n,
        hints: ["More means finding the difference between the two numbers.", "Start at the smaller number and count up to the bigger one. How many steps is that?", "Example: 7 and 4. Count up from 4: 5, 6, 7. That is 3 more. Now do yours."]
      };
    };
    make.teach = () => [
      slide("Voting", "🗳️", "When a group needs to choose, they can <b>vote</b>. Each person gets one vote, and every vote counts the same."),
      slide("Counting votes", "🟦🟦🟦 vs 🟦🟦", "Count the votes for each choice. The choice with the <b>most votes</b> wins. That is a fair way to choose."),
      slide("Tip", "💡", "If two choices have the same number of votes, that is a <b>tie</b>. The group can vote again.")
    ];
    return make;
  };

  // ================= LEVEL 1 =================
  const l1 = [
    M("Why we have rules", [
      ["What are rules?", "📋", "<b>Rules</b> tell us what we should and should not do. Every home, school and town has rules."],
      ["Why rules?", "🛡️", "Rules keep everyone <b>safe</b> and make things <b>fair</b>. They help us all live and play together."],
      ["Examples", "🚶 🤫", "Walk in the hallway. Use a quiet voice in the library. Wait your turn."]],
      ["Think: does this rule keep people safe or treat them fairly?", "Rules help everyone live, work and play together happily.", "Example: wearing a helmet on a bike is a rule that keeps your head safe. Now do yours."],
      [["Why do we have rules?", "To keep everyone safe and fair", "To make everyone sad|To make things messy"], ["Which is a rule?", "Walk in the hallway", "Run as fast as you can|Yell at friends"],
       ["What happens when everyone follows the rules?", "Everyone is safer and things are fair", "Nobody has fun|Everything breaks"], ["A rule at a swimming pool is...", "Walk, don't run", "Run on the wet floor|Push friends in"],
       ["Who makes rules at home?", "Parents or caregivers", "Birds|The moon"], ["A rule at the library is...", "Use a quiet voice", "Shout loudly|Rip the pages"], ["We follow rules because they...", "Help us stay safe and be fair", "Are always silly|Are only for grown-ups"]]),
    M("Classroom rules", [
      ["Our classroom", "🏫", "A classroom works best when everyone follows the rules. That way everyone can learn."],
      ["Good rules", "✋ 👂 🧹", "Raise your hand to talk. Listen when others speak. Keep things neat and clean."],
      ["Why?", "💡", "These rules help everyone feel safe and be heard."]],
      ["Think about what helps everyone learn.", "Good classroom habits are polite, safe and neat.", "Example: you raise your hand to ask a question so that others can listen too. Now do yours."],
      [["When you want to talk in class, you should...", "Raise your hand", "Shout|Walk away"], ["When the teacher is talking, you should...", "Listen", "Talk loudly|Run around"], ["In the hallway you should...", "Walk", "Run|Jump"],
       ["After you use the scissors, you should...", "Put them back", "Leave them on the floor|Hide them"], ["When someone else is speaking, you should...", "Wait for your turn", "Interrupt|Make noise"], ["At clean-up time, you should...", "Help tidy up", "Make a mess|Leave the room"],
       ["If you finish your work early, you can...", "Read a book quietly", "Throw paper|Yell"]]),
    M("Taking turns", [
      ["Turns", "🔄", "<b>Taking turns</b> means each person gets a chance, one after another."],
      ["Who goes first?", "✊ ✋ ✌️", "You can count, flip a coin or play rock-paper-scissors to pick who goes first. Then the next person goes."],
      ["Tip", "💡", "Waiting for your turn is a way to be kind and fair."]],
      ["Think about giving everyone a chance.", "Fair turns are one after another. Nobody skips ahead.", "Example: at the water fountain, the person at the front of the line goes first. Now do yours."],
      [["Two kids want the slide. What is fair?", "Take turns", "One kid goes all day|Push each other"], ["Taking turns means...", "Each person gets a chance", "One person always goes|Nobody goes"], ["It is your friend's turn in a game. You should...", "Wait", "Grab the game|Leave"],
       ["How can you pick who goes first fairly?", "Count, flip a coin or play rock-paper-scissors", "The loudest kid goes first|Whoever grabs it"], ["Lining up at the water fountain: what is fair?", "Wait in line", "Cut in front|Push"],
       ["Everyone had one turn. Who goes next?", "The first person again", "Nobody forever|Only the last person"], ["Why do we take turns?", "So everyone gets a chance", "So no one has fun|So games last forever"]]),
    M("Sharing", [
      ["Sharing", "🤝", "<b>Sharing</b> means letting other people use or have some of what you have."],
      ["Ways to share", "🖍️ 🍪 🧩", "You can share crayons, snacks, toys and your time. Take turns with a toy that only one person can use at a time."],
      ["Tip", "💡", "Sharing helps people feel happy and included."]],
      ["Think about how to be kind with what you have.", "Sharing means others can enjoy things too.", "Example: if your friend has no crayons, you can lend one. Now do yours."],
      [["You have two crayons and your friend has none. What is kind?", "Share one", "Hide both|Break one"], ["Sharing means...", "Letting others use things too", "Keeping everything|Throwing things away"], ["There are 4 cookies for 2 kids. What is fair?", "2 cookies each", "4 for one kid|None for either"],
       ["Your friend asks to play with your ball. You can...", "Take turns with it", "Hide it|Run away"], ["Which is sharing?", "Passing the markers around", "Keeping all the markers|Hiding the markers"], ["Why is sharing nice?", "It makes others feel happy", "It makes others sad|It breaks things"],
       ["When you share a toy you can say...", "Do you want to play with me?", "Mine, mine!|Go away"]]),
    M("Fair or unfair?", [
      ["Fair", "⚖️", "<b>Fair</b> means treating people in a way that is right for everyone, with the same chances."],
      ["Unfair", "🙁", "<b>Unfair</b> means one person gets much more than others, or someone is left out."],
      ["Tip", "💡", "Ask yourself: would I like it if this happened to me?"]],
      ["Think: is everyone getting the same chance?", "Fair means equal chances and the same rules for everyone.", "Example: each kid gets one slice of pizza. That is fair. One kid gets all the slices. That is unfair. Now do yours."],
      [["One kid gets 5 cookies and the others get none. Is this fair?", "Unfair", "Fair"], ["Everyone gets a turn on the swing. Is this fair?", "Fair", "Unfair"], ["The teacher calls on only one student all day. Is this fair?", "Unfair", "Fair"],
       ["Everyone follows the same game rules. Is this fair?", "Fair", "Unfair"], ["A kid is left out of a game because of how they look. Is this fair?", "Unfair", "Fair"], ["Each kid gets the same number of stickers. Is this fair?", "Fair", "Unfair"], ["One team gets more players than the other. Is this fair?", "Unfair", "Fair"]]),
    M("Being kind", [
      ["Kindness", "💖", "Being <b>kind</b> means being gentle and caring toward others."],
      ["Kind words and actions", "🙏 🫶", "Say please and thank you. Help someone who is sad. Include others in your games."],
      ["Tip", "💡", "A kind word can make someone's whole day."]],
      ["Think about how your words and actions make others feel.", "A kind choice helps someone feel safe, included or happy.", "Example: helping a friend pick up dropped books is kind. Now do yours."],
      [["Which is a kind thing to say?", "Thank you for helping", "You can't play|That's silly"], ["A new kid is alone at recess. What is kind?", "Ask them to play", "Ignore them|Laugh at them"], ["Someone drops their lunch. What is kind?", "Help them pick it up", "Laugh|Walk away"],
       ["Which word shows good manners?", "Please", "Give me|Now"], ["When someone helps you, you say...", "Thank you", "Whatever|Nothing"], ["Your friend is sad. You can...", "Ask if they are okay", "Make fun of them|Walk away"], ["A kind person...", "Cares about other people's feelings", "Takes things|Is loud"]]),
    B("Community helpers", { intro: "A <b>community</b> is the place where people live and work together. <b>Community helpers</b> have jobs that help everyone.", tip: "Community helpers make our town safe and nice to live in.",
      items: [["a firefighter", "🧑‍🚒", "puts out fires and rescues people"], ["a police officer", "👮", "helps keep people safe"], ["a doctor", "🧑‍⚕️", "helps sick people get better"], ["a teacher", "🧑‍🏫", "helps children learn"], ["a mail carrier", "📬", "brings letters and packages"], ["a farmer", "🧑‍🌾", "grows food for us to eat"]] }),
    B("More helpers", { intro: "There are many more people who help in our community. Every job is important.", tip: "Say thank you to the helpers you meet.",
      items: [["a librarian", "📚", "helps you find books"], ["a bus driver", "🚌", "drives people from place to place"], ["a garbage collector", "🚛", "picks up trash so streets stay clean"], ["a dentist", "🦷", "helps keep teeth healthy"], ["a crossing guard", "🚸", "helps children cross the street safely"], ["a baker", "🥖", "makes bread and treats"]] }),
    M("Staying safe", [
      ["Safety rules", "🚦", "Safety rules help you avoid getting hurt. Look both ways before you cross the street. Wear a helmet on a bike. Buckle your seat belt in a car."],
      ["Traffic lights", "🔴 🟡 🟢", "Red means stop. Green means go. Yellow means slow down and be ready to stop."],
      ["If you need help", "🧑‍🏫", "If you are lost or something feels wrong, go to a trusted adult, like a parent, teacher or helper. Never go with a stranger."]],
      ["Think about what keeps you from getting hurt.", "Safety rules protect your body. Ask a trusted adult if you are unsure.", "Example: you wear a helmet to protect your head. Now do yours."],
      [["Before you cross the street, you should...", "Look both ways", "Close your eyes|Run"], ["When riding a bike, you should wear a...", "Helmet", "Crown|Scarf over your eyes"], ["In a car, you should wear a...", "Seat belt", "Hat|Mask"],
       ["If you are lost in a store, you should...", "Find a worker or a trusted adult", "Leave with a stranger|Hide"], ["A red light means...", "Stop", "Go|Dance", "🔴"], ["A green light means...", "Go", "Stop|Sleep", "🟢"],
       ["A stranger asks you to come with them. You should...", "Say no and tell a trusted adult", "Go with them|Give them your name"]]),
    M("Being responsible", [
      ["Responsibility", "🧹", "A <b>responsibility</b> is a job you are supposed to do. You can be responsible at home and at school."],
      ["Examples", "🛏️ 🎒 🐕", "Make your bed. Pack your backpack. Feed your pet. Put away your toys."],
      ["Tip", "💡", "Being responsible means other people can count on you."]],
      ["Think about jobs you should do yourself.", "A responsible person does what they should without being nagged.", "Example: putting your dirty clothes in the hamper is being responsible. Now do yours."],
      [["Which is being responsible?", "Putting away your toys", "Leaving your toys everywhere|Hiding your toys"], ["You borrowed a book. What is responsible?", "Return it", "Lose it|Rip it"], ["Your pet needs food. A responsible kid...", "Feeds it", "Forgets it|Hides from it"],
       ["Your backpack should be...", "Packed the night before", "Left outside in the rain|Lost"], ["If you spill milk, you should...", "Help clean it up", "Blame someone|Run away"], ["Responsible means...", "People can count on you", "You never help|You always play"], ["A responsible kid does homework...", "Without being asked many times", "Never|Only when it is fun"]]),
    M("Solving problems kindly", [
      ["Problems happen", "🙁", "Sometimes friends disagree. We can solve problems without hurting anyone."],
      ["Steps", "🧘 🗣️ 🤝", "Stay calm and breathe. Use your words. Listen. Find a fair answer together. Ask a grown-up if you need help."],
      ["Tip", "💡", "Say how you feel: \"I feel sad when you take my toy.\""]],
      ["Think about calm words, not mean ones.", "Calm breathing and kind words help solve problems.", "Example: instead of yelling you can say, \"Can I have a turn, please?\" Now do yours."],
      [["Your friend took your toy. What can you say?", "Please give it back", "You're mean|Nothing, then hit them"], ["Two kids both want the same book. What is fair?", "Take turns", "Fight over it|Tear it in half"], ["You feel angry. What helps?", "Take a deep breath", "Yell at someone|Break something"],
       ["If you cannot solve a problem, you can...", "Ask a trusted adult for help", "Give up and yell|Hide"], ["Which is a kind way to say how you feel?", "I feel sad when you do that", "You are the worst|I hate you"], ["When a friend says sorry, you can...", "Listen and forgive", "Say mean things|Walk away angry"]]),
    B("Our community", { intro: "A <b>community</b> has many places that people share. Each place has its own job.", tip: "Take care of the places that everyone shares.",
      items: [["a park", "🏞️", "is a place for everyone to play"], ["a library", "📚", "lends books to everyone"], ["a fire station", "🚒", "is where firefighters wait to help"], ["a school", "🏫", "is where children learn"], ["a hospital", "🏥", "is where sick people get care"], ["a post office", "📮", "sends and receives mail"]] }),
    M("Being a good friend", [
      ["Friends", "🧑‍🤝‍🧑", "A good friend is kind, shares, listens and says sorry when they make a mistake."],
      ["Include others", "🫂", "Invite a new kid to play. Everyone wants to belong."],
      ["Tip", "💡", "Treat your friends the way you would like to be treated."]],
      ["Think about what makes you feel good with a friend.", "Good friends are kind and fair to each other.", "Example: a good friend helps you up when you fall. Now do yours."],
      [["A good friend...", "Listens to you", "Always bosses you|Takes your things"], ["Your friend is sad. A good friend...", "Is kind and helps", "Laughs|Ignores them"], ["You hurt your friend by accident. You should...", "Say sorry", "Pretend it did not happen|Blame them"],
       ["A new kid wants to play. You can...", "Invite them", "Say no|Run away"], ["Good friends...", "Take turns and share", "Never share|Tell secrets about others"], ["A friend wins a game. You can say...", "Good job!", "You cheated|I do not care"]]),
    M("Respect", [
      ["Respect", "🙏", "To show <b>respect</b> is to treat people and things with care. Listen to others, and be gentle with their things."],
      ["Everyone is different", "🌈", "People look, talk and live in different ways. We treat everyone kindly, whoever they are."],
      ["Tip", "💡", "Respect your teachers, your friends, your family, and yourself."]],
      ["Think about caring for people and their things.", "Respect means kind words, gentle hands and listening.", "Example: asking before you borrow a pencil shows respect. Now do yours."],
      [["Which shows respect?", "Listening when someone talks", "Making faces at them|Talking over them"], ["You want to borrow a friend's pencil. You should...", "Ask first", "Just take it|Hide it"], ["Your classmate speaks a different language at home. You should...", "Be kind and curious", "Make fun of them|Ignore them"],
       ["Respect means...", "Treating others with care", "Being bossy|Being loud"], ["Which is respectful to a teacher?", "Say thank you", "Roll your eyes|Talk back"], ["How do you treat other people's belongings?", "Gently", "Roughly|Throw them"]]),
    M("Telling the truth", [
      ["Honesty", "💬", "Being <b>honest</b> means telling the truth, even when it is hard."],
      ["Why?", "🤝", "When you tell the truth, people trust you. Trust is very important."],
      ["Tip", "💡", "If you make a mistake, say so. It is okay. Everybody makes mistakes."]],
      ["Think about what is true.", "Honest people tell the truth and own up to mistakes.", "Example: if you spill juice, you tell a grown-up and help clean it. Now do yours."],
      [["You broke a cup by accident. What is honest?", "Tell a grown-up", "Hide the pieces|Blame the dog"], ["Honest means...", "Telling the truth", "Telling jokes|Telling secrets"], ["Why is being honest good?", "People can trust you", "People ignore you|It is boring"],
       ["You find a toy that is not yours. What is honest?", "Give it back or tell a teacher", "Keep it|Hide it"], ["You made a mistake. What should you do?", "Say so and fix it", "Pretend it did not happen|Blame others"], ["Which is the truth?", "The sky is blue on a clear day", "Cats can drive|Fish can fly", "🌤️"]]),
    M("Voting", [
      ["Choosing together", "🗳️", "When a group needs to choose, they can <b>vote</b>. Everyone gets one vote."],
      ["Most votes wins", "✋ ✋ ✋", "Count the votes. The choice with the <b>most votes</b> wins. It is a fair way to choose."],
      ["Tip", "💡", "Even if your choice does not win, you can be a good sport and cheer for everyone."]],
      ["Think about how a group makes a fair choice.", "Each person gets one vote. The most votes wins.", "Example: 5 votes for pizza and 2 for soup means pizza wins. Now do yours."],
      [["How can a class pick a game fairly?", "Vote", "The loudest child picks|Throw a ball"], ["When we vote, each person gets...", "One vote", "Ten votes|No vote"], ["Pizza has 5 votes and soup has 2 votes. What wins?", "Pizza", "Soup|Nothing"],
       ["Dog gets 3 votes. Cat gets 7 votes. What wins?", "Cat", "Dog|A tie"], ["If your choice does not win, you should...", "Be a good sport", "Pout and yell|Quit the game"], ["Why do we vote?", "To make a fair choice together", "To make people mad|To waste time"]]),
    M("Leaders", [
      ["Leaders", "🧭", "A <b>leader</b> helps a group decide what to do. Good leaders are fair and listen."],
      ["Many leaders", "🧑‍🏫 🏙️", "A teacher leads a classroom. A captain leads a team. A mayor leads a town or city."],
      ["Tip", "💡", "You can be a leader too, by being kind and helpful."]],
      ["Think about who guides each group.", "Leaders help a group make good choices and stay safe.", "Example: a coach leads a team. Now do yours."],
      [["Who leads a classroom?", "A teacher", "A cat|A mailbox"], ["Who leads a team?", "A captain or coach", "A bus|A mailbox"], ["Who leads a town or city?", "A mayor", "A baker|A pilot"],
       ["A good leader...", "Listens and is fair", "Is bossy|Hides"], ["A leader helps a group to...", "Make good choices", "Fight|Be late"], ["You can be a leader by...", "Being kind and helpful", "Being mean|Being loud"]]),
    M("Symbols", [
      ["What is a symbol?", "🚦", "A <b>symbol</b> is a picture or thing that stands for an idea."],
      ["Country symbols", "🏳️ 🦅", "A <b>flag</b> is a symbol of a country. The bald eagle is a symbol of the United States."],
      ["Signs", "🛑", "A stop sign is a symbol too. It tells drivers to stop."]],
      ["Think about what the picture stands for.", "Symbols are quick pictures that tell us something big.", "Example: a heart on a card shows that you care. Now do yours."],
      [["A symbol is a picture that...", "Stands for an idea", "Costs money|Makes noise"], ["A flag is a symbol of a...", "Country or group", "Meal|Cloud"], ["What does a stop sign tell you?", "Stop", "Go fast|Sing", "🛑"],
       ["The bald eagle is a symbol of the...", "United States", "Moon|Ocean", "🦅"], ["Which is a symbol of a country?", "Its flag", "A shoe|A cup"], ["A sign with a picture of a bike lane shows...", "Where bikes go", "Where fish swim|Where clouds sleep"]])
  ];
  l1.push(LS("Mixed practice", MX(l1, [0, 2, 4, 6, 8])));
  l1.push(LS("Level 1 Challenge", MX(l1, [1, 3, 7, 9, 12, 13, 14, 15])));

  // ================= LEVEL 2 =================
  const l2 = [
    M("Rules and laws", [
      ["Rules and laws", "📜", "<b>Rules</b> are for a home, a class or a game. <b>Laws</b> are rules for a whole town, state or country."],
      ["Who makes laws?", "🏛️", "People called lawmakers write laws. Leaders and police help make sure people follow them."],
      ["Why?", "🛡️", "Laws help keep everyone safe and treated fairly."]],
      ["Think about who the rule is for.", "A law is for everyone in a town or country. A rule can be for a smaller group.", "Example: \"Take turns on the swings\" is a school rule. \"Stop at red lights\" is a law. Now do yours."],
      [["Laws are rules for a whole...", "Town, state or country", "Pillow|Toy box"], ["Which is a law?", "Stop at a red light", "Wear your favorite hat|Eat apples"], ["Who makes laws?", "Lawmakers", "Cooks|Plumbers"],
       ["Why do we have laws?", "To keep people safe and fair", "To make life hard|To make noise"], ["Which is a school rule?", "Walk in the hallway", "Drive on the right|Pay your taxes"], ["Who helps people follow laws?", "Police officers", "Clowns|Bakers"], ["A law is the same for...", "Everyone in that place", "Only some people|Only adults who run"]]),
    M("Laws that keep us safe", [
      ["Safety laws", "🚗 🚦", "Many laws keep us safe. Drivers must stop at red lights. Everyone in a car wears a seat belt. Cars must go slowly near schools."],
      ["Other safe laws", "🚲 ⛑️", "In many places, kids must wear helmets on bikes."],
      ["Why?", "💡", "These laws help stop people from getting hurt."]],
      ["Think about what could happen without the law.", "Laws about roads help drivers and walkers stay safe.", "Example: a seat belt law keeps people safe in a crash. Now do yours."],
      [["A red light means drivers must...", "Stop", "Speed up|Honk"], ["Why must cars slow down near schools?", "To keep children safe", "To waste time|To save gas only"], ["A seat belt law helps...", "Keep people safe in a car", "Cars get washed|Cars get faster"],
       ["Where should you cross the street?", "At a crosswalk", "Anywhere in the middle|On a highway", "🚸"], ["A bike helmet protects your...", "Head", "Feet|Hands", "⛑️"], ["The speed limit tells drivers...", "How fast they can go", "How tall to be|What to eat"]]),
    M("Being fair", [
      ["Fairness", "⚖️", "<b>Fairness</b> means giving everyone a fair chance and the same rules."],
      ["Equal chances", "🎲", "In a fair game, nobody cheats and everyone knows the rules."],
      ["Tip", "💡", "Think about how others would feel. Would it feel fair to you?"]],
      ["Think about whether everyone has the same chance.", "Fair means equal chances, honest play and the same rules for all.", "Example: in tag, everybody is chased the same way and rules are the same. Now do yours."],
      [["Fair play means...", "Following the rules for everyone", "Cheating a little|Making new rules to win"], ["Everyone gets to pick a team one by one. Is this fair?", "Fair", "Unfair"], ["A player secretly breaks the rules. Is this fair?", "Unfair", "Fair"],
       ["Which is a fair way to pick who goes first?", "Draw a number from a hat", "The biggest kid goes|The one who is loudest"], ["When you lose a game fairly, you can...", "Say good game", "Throw the game board|Say it was unfair"], ["Fair means treating people...", "With equal respect", "In different ways just because|Based on who is the strongest"]]),
    LS("Counting votes", VOTE(6)),
    M("How voting works", [
      ["Ballots", "🗳️", "A <b>ballot</b> is the paper or screen where you mark your choice. Your vote can be secret."],
      ["Fair voting", "⚖️", "Each person gets one vote. All votes are counted the same way. The choice with the most votes wins."],
      ["Who votes?", "🧑‍🤝‍🧑", "In the United States, grown-up citizens vote to choose leaders. Kids can vote in class or at home."]],
      ["Think about a fair way to pick.", "In a fair vote everyone has the same power. Think about how much each person gets, and how the choice is picked.", "Example: a class votes for a pet name, and the name with the most votes wins. Now do yours."],
      [["A ballot is...", "Where you mark your choice", "A kind of ball|A snack"], ["In a vote, each person gets...", "One vote", "As many votes as they want|No vote"], ["Who wins a vote?", "The choice with the most votes", "The choice with the fewest|The first choice listed"],
       ["A secret ballot means...", "Nobody sees how you voted", "Everyone must tell|The vote is not counted"], ["If two choices tie, the group can...", "Vote again", "Fight|Cancel everything"], ["Where can kids vote?", "In class or at home", "At nowhere|Only in space"], ["A fair vote counts every vote...", "The same way", "Differently for different people|Twice for some"]]),
    B("Government helpers", { intro: "Some people have jobs in the government. They help make our town, state and country work well.", tip: "Government workers serve their community.",
      items: [["a mayor", "🏙️", "leads a city or town"], ["a judge", "⚖️", "makes sure laws are followed fairly in court"], ["a police officer", "👮", "helps keep people safe and enforces laws"], ["a firefighter", "🧑‍🚒", "puts out fires and rescues people"], ["a park ranger", "🌲", "takes care of parks and helps visitors"], ["a postal worker", "📮", "delivers the mail"]] }),
    B("Leaders and their jobs", { intro: "Leaders have different titles. Each leads a different group.", tip: "A leader's job is to help the group.",
      items: [["a mayor", "🏙️", "leads a city or town"], ["a governor", "🏞️", "leads a state"], ["a president", "🏛️", "leads a country such as the United States"], ["a principal", "🏫", "leads a school"], ["a teacher", "🍎", "leads a classroom"]] }),
    M("What leaders do", [
      ["A leader's job", "🧭", "Leaders make decisions, listen to people, solve problems and try to keep everyone safe."],
      ["Good leaders", "⭐", "Good leaders are fair, honest, kind and follow the rules too."],
      ["Tip", "💡", "Everyone can lead in small ways, like helping a new classmate."]],
      ["Think about what a good leader does for a group.", "Leaders help the group. They listen and act fairly.", "Example: a captain makes sure each player gets a turn. Now do yours."],
      [["A good leader...", "Listens to others", "Ignores everyone|Never helps"], ["A leader helps solve...", "Problems for the group", "Math tests only|Weather"], ["Does a leader follow the rules too?", "Yes", "No"],
       ["A good leader is...", "Fair and honest", "Mean and sneaky|Always late"], ["Who leads a city?", "A mayor", "A cook|A farmer"], ["When people disagree, a leader helps by...", "Finding a fair answer", "Picking favorites|Yelling"], ["A leader's job is to...", "Help the group", "Only help themselves|Be bossy"]]),
    M("Rights and responsibilities", [
      ["Rights", "🛡️", "A <b>right</b> is something every person is allowed to have or do, like being safe, learning and being treated fairly."],
      ["Responsibilities", "🧹", "A <b>responsibility</b> is a job you should do, like following rules, taking care of things and being kind."],
      ["Together", "⚖️", "We have both. Rights and responsibilities go together."]],
      ["Think: is it something you may have, or a job you should do?", "Ask: is it something I get to have, or a job I need to do?", "Example: the right to be safe at school, and the responsibility to follow the safety rules. Now do yours."],
      [["The right to learn is...", "A right", "A responsibility"], ["Following the rules is...", "A responsibility", "A right"], ["Being treated fairly is...", "A right", "A responsibility"],
       ["Cleaning up your mess is...", "A responsibility", "A right"], ["Being safe is...", "A right", "A responsibility"], ["Taking care of shared toys is...", "A responsibility", "A right"], ["Everyone has the right to...", "Be treated with respect", "Be rude|Skip school"]]),
    M("Jobs at home and school", [
      ["Everyone helps", "🏠 🏫", "At home and at school, everyone has jobs to do. This keeps our space nice."],
      ["Examples", "🧽 🍽️ 📚", "Wipe tables, set the table, put away books, and keep your desk neat."],
      ["Tip", "💡", "Doing your jobs well shows you are a good community member."]],
      ["Think about jobs that help a group.", "Shared jobs make shared places nicer.", "Example: wiping the table after lunch keeps the cafeteria clean. Now do yours."],
      [["A classroom job is...", "Passing out papers", "Eating snacks all day|Hiding the chalk"], ["At home, a good job for a kid is...", "Setting the table", "Yelling at the dog|Painting the walls"], ["Why do we do jobs?", "To help our home or class", "To be bored|To make a mess"],
       ["If you use a crayon, you should...", "Put it back", "Hide it|Break it"], ["Who keeps the classroom clean?", "Everyone", "Only the teacher|Nobody"], ["Taking out the trash is...", "A helpful job", "A game|A silly joke", "🗑️"]]),
    M("Being a good citizen", [
      ["Citizens", "🧑‍🤝‍🧑", "A <b>citizen</b> is a person who belongs to a community or country. A good citizen helps and follows the laws."],
      ["How to help", "🌳 🗑️ 🤝", "Pick up litter. Help a neighbor. Vote when you are grown. Follow rules. Take care of parks."],
      ["Tip", "💡", "Good citizens care about their community."]],
      ["Think about how people help their community.", "Good citizens follow rules, help others and care for shared places.", "Example: picking up trash in the park helps everyone. Now do yours."],
      [["A good citizen...", "Helps their community", "Breaks the rules|Ignores others"], ["Which is a good citizen thing to do?", "Pick up litter", "Drop trash|Spray paint a wall"], ["When you are grown, a good citizen can...", "Vote", "Skip all rules|Hide forever"],
       ["A good citizen follows...", "The laws", "No one|Only their own rules"], ["How can you help in a park?", "Keep it clean", "Break the benches|Pick all the flowers"], ["Which helps a neighbor?", "Carry their groceries", "Make noise at night|Take their mail"]]),
    M("Good neighbors", [
      ["Neighbors", "🏘️", "Your <b>neighbors</b> are the people who live near you. Good neighbors are kind and helpful."],
      ["Ways to help", "❄️ 🧺 📮", "Help carry groceries. Return something that was lost. Keep noise down at night."],
      ["Tip", "💡", "A friendly hello makes a neighborhood feel like a family."]],
      ["Think about what helps the people nearby.", "Good neighbors are friendly, quiet and helpful.", "Example: bringing a neighbor's lost cat home is being a good neighbor. Now do yours."],
      [["A good neighbor...", "Is friendly and helpful", "Is always loud|Ignores everyone"], ["You see your neighbor's trash can has fallen. A good neighbor...", "Sets it up", "Kicks it|Ignores it"], ["At night a good neighbor keeps noise...", "Low", "Loud|Very loud"],
       ["Your neighbor is carrying lots of bags. You can...", "Offer to help", "Laugh|Run away"], ["You find a neighbor's lost toy. You should...", "Give it back", "Keep it|Hide it"], ["A friendly way to meet a neighbor is to...", "Say hello", "Stay hidden|Frown"]]),
    M("Rules in different places", [
      ["Different places", "🏠 🏫 🏞️", "Each place has its own rules. At home, at school and in the park, the rules are a little different."],
      ["Why?", "🧭", "The rules fit the place. A library is quiet, but a playground can be noisy."],
      ["Tip", "💡", "Learn the rules each time you go somewhere new."]],
      ["Think about the place first.", "Each place has rules that match what people do there.", "Example: a library rule is to be quiet, and a pool rule is to walk on the deck. Now do yours."],
      [["A library rule is...", "Use a quiet voice", "Run and shout|Throw books"], ["A pool rule is...", "Walk, don't run", "Run fast|Push people in"], ["A playground rule is...", "Take turns on the slide", "Push others|Cut in line"],
       ["A movie theater rule is...", "Be quiet during the movie", "Talk loudly|Throw popcorn"], ["A bus rule is...", "Stay seated", "Stand on the seat|Shout at the driver", "🚌"], ["A crosswalk rule is...", "Look both ways", "Run across with eyes closed|Stop in the middle", "🚸"]]),
    B("Signs and signals", { intro: "Signs and signals use pictures and colors to tell us what to do. They help us stay safe.", tip: "Learn what signs mean so you can follow them.",
      items: [["a stop sign", "🛑", "tells drivers to stop"], ["a traffic light", "🚦", "uses colors to tell when to go or stop"], ["a crosswalk", "🚸", "is where people cross the street"], ["a speed limit sign", "🚧", "tells drivers how fast to go"], ["a no-entry sign", "⛔", "means do not go in"]] }),
    B("Symbols of the United States", { intro: "Countries have symbols that stand for their people and history. Here are some symbols of the United States.", tip: "Symbols help people feel connected to their country.",
      items: [["the flag", "🇺🇸", "has 50 stars and 13 stripes"], ["the bald eagle", "🦅", "is the national bird"], ["the Statue of Liberty", "🗽", "stands in New York Harbor"], ["the Liberty Bell", "🔔", "is in Philadelphia"], ["the White House", "🏛️", "is where the president lives and works in Washington, D.C."]] }),
    M("The pledge idea", [
      ["A pledge", "🤞", "A <b>pledge</b> is a promise. Some people say a pledge to show respect for their country and its flag."],
      ["How to show respect", "🙋 🏳️", "When people say the Pledge of Allegiance in the United States, they stand and put their right hand over their heart. They show respect to the flag and to each other."],
      ["Tip", "💡", "Showing respect means being quiet and listening when others are doing something important to them."]],
      ["Think about what a promise means.", "A pledge is something you say and mean. Think about keeping your word, and about being kind and quiet when others are speaking.", "Example: promising to share is a pledge to be kind. Now do yours."],
      [["A pledge is a...", "Promise", "Gift|Snack"], ["People say the Pledge of Allegiance to show...", "Respect for their country", "That they are tired|That they are hungry"], ["When people say the pledge, they usually put their hand over their...", "Heart", "Ears|Knees"],
       ["When others say a pledge, you should...", "Be quiet and respectful", "Make loud noises|Run around"], ["A promise should be...", "Kept", "Broken|Forgotten"], ["Showing respect means...", "Being kind and listening", "Shouting|Ignoring"]]),
    M("Making rules together", [
      ["Class meeting", "🗣️", "In many classes, children help make the class rules. Everybody shares ideas and the class votes."],
      ["Why?", "🤝", "When everyone helps make the rules, we all understand them and want to follow them."],
      ["Tip", "💡", "A good rule is clear, fair and keeps people safe."]],
      ["Think about a rule that is fair and clear.", "Good rules are short, kind and the same for everyone.", "Example: \"Raise your hand to speak\" is short and clear. Now do yours."],
      [["A good rule is...", "Fair and clear", "Mean and confusing|Different every day"], ["Who can help make class rules?", "The whole class", "Only the principal|Nobody"], ["How can a class decide on a rule?", "Share ideas and vote", "One kid decides|Flip a trash can"],
       ["Which is a clear rule?", "Walk in the hall", "Be good maybe|Do whatever"], ["Why help make rules?", "We understand and follow them better", "To avoid learning|To boss others"], ["A rule should keep people...", "Safe", "Scared|Bored"]]),
    M("Solving conflicts", [
      ["Conflict", "🙁", "A <b>conflict</b> is a disagreement. It is normal to disagree sometimes."],
      ["Solving it", "🗣️ 👂 🤝", "Stay calm. Listen to each other. Say how you feel. Find a <b>compromise</b>, an answer where each person gives a little."],
      ["Ask for help", "🧑‍🏫", "If you cannot solve it yourselves, ask a trusted adult."]],
      ["Think about calm words and listening.", "A compromise is a kind of teamwork. Think about both sides making a small change.", "Example: you want to play tag and your friend wants to play ball. You play one, then the other. Now do yours."],
      [["A conflict is a...", "Disagreement", "Birthday|Song"], ["A compromise means...", "Each person gives a little", "One person wins everything|Nobody plays"], ["You and a friend want different games. A compromise is to...", "Play one, then the other", "Fight|Play alone angry"],
       ["When you disagree, you should first...", "Stay calm", "Yell|Hit"], ["If you cannot fix a problem, you can...", "Ask a trusted adult", "Keep fighting|Run away"], ["Good listening means...", "Hearing the other person's idea", "Talking over them|Looking away"]])
  ];
  l2.push(LS("Mixed practice", MX(l2, [0, 2, 3, 7, 10])));
  l2.push(LS("Level 2 Challenge", MX(l2, [1, 4, 6, 8, 12, 14, 15, 17])));

  // ================= LEVEL 3 =================
  const l3 = [
    M("What is government?", [
      ["Government", "🏛️", "A <b>government</b> is a group of people who make laws and run a community, a state or a country."],
      ["What it does", "🛣️ 🏫 🚒", "A government helps build roads and schools, keeps people safe, and makes sure laws are fair."],
      ["Tip", "💡", "Government is for the people. Citizens help choose who leads it."]],
      ["Think about who looks after a whole community.", "Think about the rules and shared places a whole community needs.", "Example: the city government may plant trees in the park. Now do yours."],
      [["A government makes...", "Laws", "Cookies|Clouds"], ["Which does a government help with?", "Roads and schools", "Your birthday cake|Your dreams"], ["A government is run by...", "A group of people", "Only animals|Robots only"],
       ["Who helps choose leaders in a government?", "Citizens", "Pets|Ghosts"], ["A government helps keep people...", "Safe", "Hungry|Sleepy"], ["Is a government for the people?", "Yes", "No"], ["A government can lead a...", "City, state or country", "Pillow fort only|Bathtub"]]),
    M("Local, state and national", [
      ["Three levels", "🏙️ 🗺️ 🌎", "Government works at different levels. <b>Local</b> government leads a city or town. <b>State</b> government leads a state. <b>National</b> government leads the whole country."],
      ["The leaders", "🧑‍💼", "A mayor leads a city or town. A governor leads a state. A president leads the country (in the United States)."],
      ["Tip", "💡", "Think small to big: town, state, country."]],
      ["Think small to big: a small place, a bigger place, and the biggest place.", "Ask how big the place is. A leader of a bigger place looks after more people.", "Example: a principal leads a school, which is a smaller group than a town. Now do yours."],
      [["A mayor leads a...", "City or town", "State|Country"], ["A governor leads a...", "State", "City|School"], ["A president leads a...", "Country", "Town|Class"], ["Which is the biggest?", "A country", "A town|A state"],
       ["Which is the smallest?", "A town", "A state|A country"], ["Which is a local government job?", "Mayor", "President|Governor"], ["Which is a state government job?", "Governor", "Mayor|Principal"]]),
    B("Jobs of government", { intro: "Government has three big jobs: make laws, carry out laws and make sure laws are fair.", tip: "Remember: make, carry out, and judge.",
      items: [["a lawmaker", "🏛️", "writes and votes on new laws"], ["a leader like the president", "🧑‍💼", "carries out the laws and leads the country"], ["a judge", "⚖️", "decides whether laws are followed fairly"], ["a police officer", "👮", "helps people follow the law"], ["a citizen", "🧑", "can help choose leaders by voting when grown"]] }),
    LS("Majority wins", VOTE(12)),
    M("Elections", [
      ["Choosing leaders", "🗳️", "An <b>election</b> is when people vote to choose a leader or decide something."],
      ["Words to know", "📋", "A <b>candidate</b> is a person who wants to be chosen. A <b>ballot</b> is how you vote. Election day is the day votes are cast."],
      ["Why it matters", "⭐", "Voting lets people have a say about who leads them."]],
      ["Think about the word that fits the job.", "Think about who wants a job, and who picks the person for it.", "Example: a student who wants to be class helper is a candidate. Now do yours."],
      [["An election is when people...", "Vote to choose", "Take a nap|Bake a cake"], ["A candidate is a person who...", "Wants to be chosen", "Counts votes|Sells votes"], ["A ballot is used to...", "Vote", "Play ball|Write a story"],
       ["Who can help count votes fairly?", "Trained election workers", "Anyone cheating|Nobody"], ["After the votes are counted, the winner is the one with...", "The most votes", "The loudest voice|The longest name"], ["Why do we have elections?", "So people can have a say", "To waste ink|To make noise"], ["The day people vote is called...", "Election day", "Pizza day|Sports day"]]),
    M("Taxes and shared things", [
      ["What are taxes?", "💵", "<b>Taxes</b> are money that people pay to the government. The money is used for things that everyone shares."],
      ["What taxes pay for", "🛣️ 🏫 🚒 📚", "Taxes help pay for roads, schools, libraries, parks, fire stations and police."],
      ["Why?", "🤝", "When we all chip in a little, we can build things that no one person could pay for alone."]],
      ["Think about things that everyone uses together.", "Taxes pay for things people share, like parks and roads.", "Example: a public park is paid for by taxes and anyone can use it. Now do yours."],
      [["Taxes are money people pay to the...", "Government", "Pet store|Toy shop"], ["Taxes help pay for...", "Roads and schools", "Candy for one person|A private jet"], ["A public library is paid for by...", "Taxes", "A single kid|Pirates"],
       ["Why do people pay taxes?", "To pay for things we share", "To get rid of money|To fill pockets"], ["Which is something we share?", "A park", "Your toothbrush|Your diary"], ["Fire stations are paid for with...", "Taxes", "Pizza|Leaves"], ["Taxes help...", "The whole community", "Only one house|Nobody"]]),
    B("Shared places", { intro: "Some places belong to everyone in a community. We call them <b>public places</b>. We all take care of them.", tip: "Shared places need everyone's care.",
      items: [["a public library", "📚", "lets everyone borrow books"], ["a park", "🏞️", "is a green place for everyone to play"], ["a road", "🛣️", "helps cars and buses travel"], ["a public school", "🏫", "teaches the children of a community"], ["a fire station", "🚒", "keeps firefighters ready to help"], ["a bridge", "🌉", "lets people cross a river or road"]] }),
    M("At the library", [
      ["A shared treasure", "📚", "A <b>library</b> lends books to everyone in the community. Many libraries are free to use because the community shares them."],
      ["How it works", "🪪 📖", "You use a library card to borrow books. You return them on time so others can read them too."],
      ["Library rules", "🤫", "Use a quiet voice. Treat books gently. Be kind to others."]],
      ["Think about sharing books fairly.", "A library works when everyone takes care of books and returns them.", "Example: you return a book so the next person can read it. Now do yours."],
      [["A library lets you...", "Borrow books", "Buy cars|Bake bread"], ["You use a library card to...", "Borrow books", "Pay for toys|Go to the zoo"], ["Why return books on time?", "So others can read them", "So they get lost|So they get torn"],
       ["A library rule is to...", "Use a quiet voice", "Shout|Draw in books"], ["Who can use a public library?", "Everyone in the community", "Only one family|Only the mayor"], ["A good library visitor...", "Treats books gently", "Tears pages|Hides books"], ["A librarian helps you...", "Find books", "Win races|Fix cars"]]),
    M("Rights", [
      ["What are rights?", "🛡️", "A <b>right</b> is something every person should have or be able to do."],
      ["Kids' rights", "🏫 🏥 🏠", "Every child has the right to be safe, to learn, to have food and a home, and to be treated fairly."],
      ["Tip", "💡", "We protect each other's rights by being kind and fair."]],
      ["Think about what every person needs and deserves.", "A right helps people be safe, healthy and treated fairly.", "Example: the right to go to school lets you learn. Now do yours."],
      [["Every child has the right to...", "Be safe", "Skip learning|Be left out"], ["Every child has the right to...", "Learn at school", "Hit others|Take things"], ["Having a safe home is...", "A right", "A trick"],
       ["Being treated fairly is...", "A right", "A prize|A gift only for some"], ["When we are kind, we help protect...", "Everyone's rights", "Nothing|Only our own"], ["Having enough food is a...", "Right for every child", "Reward for homework|Gift only on birthdays"]]),
    M("Responsibilities", [
      ["What are responsibilities?", "🧹", "A <b>responsibility</b> is something you should do. It is part of living with other people."],
      ["Ours", "🤝", "We follow rules and laws. We respect others. We take care of shared places. We are honest."],
      ["Tip", "💡", "With every right comes a responsibility."]],
      ["Think about a job you should do for others.", "Responsibilities help a community stay safe and nice.", "Example: the right to use a park comes with a responsibility to keep it clean. Now do yours."],
      [["Following the rules is a...", "Responsibility", "Right|Prize"], ["Taking care of the park is a...", "Responsibility", "Right|Treat"], ["Telling the truth is a...", "Responsibility", "Right|Surprise"],
       ["A responsibility of a student is to...", "Do their best", "Waste time|Mess up desks"], ["A responsibility of a neighbor is to...", "Be considerate", "Be loud at night|Take things"], ["When you use a shared thing you should...", "Take care of it", "Break it|Hide it"], ["We respect other people's...", "Rights", "Mess|Noise"]]),
    M("Right or responsibility?", [
      ["Two lists", "⚖️", "Rights are things you can have or do. Responsibilities are jobs you should do."],
      ["Matching", "🔍", "The right to learn goes with the responsibility to try your best. The right to be safe goes with the responsibility to follow safety rules."],
      ["Tip", "💡", "Ask: is it something I get, or something I do?"]],
      ["Think: is it something you get or something you do?", "A right is something you may have. A responsibility is a job you do.", "Example: \"I get to be safe\" is a right. \"I walk in the hall\" is a responsibility. Now do yours."],
      [["Is this a right or a responsibility? \"I go to school and learn.\"", "Right", "Responsibility"], ["Is this a right or a responsibility? \"I clean up my toys.\"", "Responsibility", "Right"], ["Is this a right or a responsibility? \"I am treated with respect.\"", "Right", "Responsibility"],
       ["Is this a right or a responsibility? \"I treat others with respect.\"", "Responsibility", "Right"], ["Is this a right or a responsibility? \"I feel safe at school.\"", "Right", "Responsibility"], ["Is this a right or a responsibility? \"I follow the school rules.\"", "Responsibility", "Right"]]),
    M("Helping the community", [
      ["Volunteering", "🙋", "To <b>volunteer</b> is to help without being paid. People volunteer to feed families, clean parks and help neighbors."],
      ["Ways kids can help", "🥫 🌳 🧸", "Collect food for a food drive. Plant a tree. Donate toys. Pick up litter."],
      ["Tip", "💡", "Small acts of kindness add up to big changes."]],
      ["Think about how people help without payment.", "Volunteers give their time to help others.", "Example: collecting cans for a food drive helps families with food. Now do yours."],
      [["A volunteer is someone who...", "Helps without being paid", "Gets money for sitting|Hides from work"], ["A food drive collects...", "Food for families", "Toys for pets|Trash"], ["Which helps the community?", "Picking up litter", "Throwing trash|Breaking benches"],
       ["Which is a way kids can volunteer?", "Help clean a park", "Skip school|Make a mess"], ["Planting a tree helps...", "The community and the Earth", "Nobody|Only you"], ["Why volunteer?", "To help others", "To get in trouble|To be bored"]]),
    B("Symbols of the United States", { intro: "The United States has many symbols. They remind people of the country's history and values.", tip: "Symbols help people feel connected to their country.",
      items: [["the bald eagle", "🦅", "is the national bird of the United States"], ["the Statue of Liberty", "🗽", "stands in New York Harbor and was a gift from France"], ["the Liberty Bell", "🔔", "is a famous bell in Philadelphia"], ["the White House", "🏛️", "is where the president lives and works"], ["the flag", "🇺🇸", "has 50 stars and 13 stripes"]] }),
    M("Leaders around the world", [
      ["Different countries", "🌍", "Countries have different kinds of leaders. Some have a <b>president</b>. Some have a <b>prime minister</b>. Some also have a king or queen."],
      ["Examples", "🇲🇽 🇨🇦 🇯🇵", "Mexico has a president. Canada has a prime minister. Japan has a prime minister too."],
      ["Tip", "💡", "Many countries ask their citizens to vote for leaders, but they do it in different ways."]],
      ["Think about the name of the leader for each country.", "Different countries use different titles. Think of each country you know.", "Example: Brazil has a president. Now do yours."],
      [["Mexico's leader is called a...", "President", "Prime minister|Principal"], ["Canada's government leader is called the...", "Prime minister", "President|Mayor"], ["Japan's government leader is called the...", "Prime minister", "President|Governor"],
       ["Brazil's leader is called a...", "President", "Prime minister|King"], ["A leader of a school is a...", "Principal", "President|Mayor"], ["A leader of a city is a...", "Mayor", "Prime minister|Principal"]]),
    M("Making fair choices", [
      ["Fair ways to decide", "⚖️", "Groups can decide in fair ways: by voting, by taking turns, by drawing names, or by finding a compromise."],
      ["Listening first", "👂", "Before deciding, listen to everyone's ideas."],
      ["Tip", "💡", "Fair choices help everyone feel respected."]],
      ["Think about a way where everyone has a say.", "Fair choices include everyone and treat all ideas with respect.", "Example: drawing names from a hat is fair because every name has the same chance. Now do yours."],
      [["Which is a fair way to decide?", "Vote", "Let the strongest pick|Pick your friend only"], ["Drawing names from a hat is fair because...", "Every name has the same chance", "Your name is always first|It is magic"], ["Before deciding, a group should...", "Listen to everyone", "Ignore the quiet ones|Hurry"],
       ["A compromise is...", "Each side gives a little", "One side wins everything|Nobody agrees"], ["Taking turns is fair because...", "Everyone gets a chance", "One person gets it all|It is boring"], ["When a vote is tied, the group can...", "Vote again", "Cancel forever|Flip a pie"]]),
    M("Rules and consequences", [
      ["Consequences", "⚖️", "A <b>consequence</b> is what happens after you do something. Following rules has good consequences. Breaking rules can have consequences too."],
      ["Fair consequences", "🧩", "A fair consequence fits the choice. If you spill something on purpose, you help clean it up."],
      ["Learning", "💡", "Consequences help us learn so we can make better choices next time."]],
      ["Think about what makes sense after a choice.", "A fair consequence fits what happened and helps you learn.", "Example: if you color on a table, you help clean it. Now do yours."],
      [["A consequence is...", "What happens after a choice", "A kind of game|A kind of toy"], ["If you break a rule, a fair consequence is to...", "Fix the problem", "Be ignored for a year|Never play again"], ["Why do we have consequences?", "To help us learn", "To scare us|To be mean"],
       ["Following rules can lead to...", "Good results", "Nothing ever|Hunger"], ["You spill paint on purpose. A fair consequence is to...", "Help clean it", "Do nothing|Spill more"], ["Which is a good consequence of being kind?", "People trust and like you", "People avoid you|Nothing at all"]]),
    M("Being a good digital citizen", [
      ["Online rules", "💻", "The same rules of kindness apply online. Be polite, be honest and keep your information private."],
      ["Stay safe", "🔒", "Never share your name, school, town, passwords or photos with people online. If something feels wrong, stop and tell a trusted adult."],
      ["Tip", "💡", "If someone you do not know contacts you, do not answer. Tell a parent or teacher."]],
      ["Think about staying kind and safe.", "Keep private information private and tell a trusted adult if something feels wrong.", "Example: if a stranger asks for your address online, you do not answer and you tell a parent. Now do yours."],
      [["Online, you should be...", "Kind and polite", "Rude|Mean"], ["Which should you keep private online?", "Your password", "Your favorite color|Your pet's name"], ["A stranger online asks where you live. You should...", "Not answer and tell a trusted adult", "Tell them|Send a photo"],
       ["If something online feels wrong, you should...", "Stop and tell a trusted adult", "Keep it secret|Keep going"], ["Who should know your passwords?", "Only you and your parents", "Everyone|New friends online"], ["Before sharing a photo online, you should...", "Ask a parent", "Post it fast|Tag strangers"]]),
    M("Peace and problem solving", [
      ["Peace", "🕊️", "<b>Peace</b> means people live together calmly and kindly, without fighting."],
      ["How to build peace", "🤝 🗣️", "We can listen, share, say sorry, forgive and look for fair answers. Words are better than fists."],
      ["Big and small", "🌍", "Peace starts in small places, like a classroom or a home, and spreads outward."]],
      ["Think about calm and kind ways to work things out.", "Peaceful choices include listening, talking and finding a fair answer.", "Example: two friends disagree. They talk, listen and find a compromise. Now do yours."],
      [["Peace means people live together...", "Calmly and kindly", "Fighting all day|Alone"], ["A peaceful way to solve a problem is to...", "Talk and listen", "Yell and push|Ignore it forever"], ["Saying sorry helps...", "Heal feelings", "Start fights|Hide problems"],
       ["Forgiving someone means...", "Letting go of anger", "Staying mad forever|Getting even"], ["Peace begins...", "In small places like our homes and classrooms", "Only far away|Only in books"], ["Which is a peaceful choice?", "Take a deep breath and use words", "Hit back|Say mean things"]])
  ];
  l3.push(LS("Mixed practice", MX(l3, [0, 1, 4, 5, 8])));
  l3.push(LS("Level 3 Challenge", MX(l3, [2, 3, 6, 9, 10, 12, 13, 16])));

  return { 1: l1, 2: l2, 3: l3 };
})();
