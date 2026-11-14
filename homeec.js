// Mind Lab Home Economics & Cooking. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints.
// Needs math.js and spelling.js loaded first (uses ri, pick, shuf).
const HOMEEC_LEVELS = (() => {
  // ---------- makers ----------
  // T: question-and-answer topic. item = [question, answer, optional wrong answers]. "emoji|question" shows the emoji big.
  const T = (title, v, intro, facts, tip, ex, items, nudge) => {
    const f = () => {
      const it = pick(items); let q = it[0], vis;
      const bar = q.indexOf("|"); if (bar > 0) { vis = q.slice(0, bar); q = q.slice(bar + 1); }
      const a = it[1], pool = it[2] || items.map(x => x[1]);
      const wr = shuf([...new Set(pool.filter(x => x !== a))]).slice(0, 2);
      const o = { text: q, choices: shuf([a, ...wr]), answer: a, hints: [nudge || "Read the question slowly, then look at every choice.", tip, "Example: " + ex + " Now do yours."] };
      if (vis) o.visual = vis;
      return o;
    };
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Example", v: "✏️", t: ex + " " + tip }];
    return f;
  };
  // S: sort things into groups. groups = { "Label": ["emoji|name", ...] }
  const S = (title, v, intro, facts, tip, ex, groups, qfmt, nudge) => {
    const labels = Object.keys(groups), all = [];
    labels.forEach(l => groups[l].forEach(n => all.push([n, l])));
    const f = () => {
      const [n, l] = pick(all); let name = n, vis;
      const bar = n.indexOf("|"); if (bar > 0) { vis = n.slice(0, bar); name = n.slice(bar + 1); }
      const ch = shuf([l, ...shuf(labels.filter(x => x !== l)).slice(0, 2)]);
      const o = { text: qfmt(name), choices: ch, answer: l, hints: [nudge || "Think about what this thing is and what it does.", tip, "Example: " + ex + " Now do yours."] };
      if (vis) o.visual = vis;
      return o;
    };
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Example", v: "✏️", t: ex + " " + tip }];
    return f;
  };
  const MIX = (...ms) => {
    const f = () => pick(ms)();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ms.slice(0, 4).map(m => m.teach()[0]));
    return f;
  };
  const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  // N: a numeric lesson. gen() returns {text, visual?, answer, hints}
  const N = (title, v, intro, facts, tip, gen) => {
    const f = () => gen();
    f.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: facts }, { h: "Tip", v: "🖐️", t: tip }];
    return f;
  };
  const FOODS = [["eggs", "egg"], ["bananas", "banana"], ["apples", "apple"], ["carrots", "carrot"], ["strawberries", "strawberry"], ["crackers", "cracker"]];

  // ---------- computed lessons ----------
  const scoops1 = N("Counting scoops", "🥄", "In the kitchen we count scoops to put the right amount in the bowl.", "Count each scoop one time. The last number you say is how many scoops there are.", "Touch each scoop as you count so you don't miss one.", () => {
    const n = ri(2, 9), n2 = ri(1, 4);
    if (Math.random() < 0.6) return { text: "How many scoops of flour are there?", visual: "🥄".repeat(n), answer: n,
      hints: ["Point to each scoop one at a time.", "Say the next number for each scoop. Do not skip any.", "Example: 🥄🥄🥄 is 3, because 1, 2, 3. Now do yours."] };
    return { text: `The recipe has ${n} scoops. Then you add ${n2} more scoops. How many scoops in all?`, visual: "🥄".repeat(n) + " + " + "🥄".repeat(n2), answer: n + n2,
      hints: ["More scoops means we put the numbers together.", `Start at ${n} and count on ${n2} more.`, "Example: 3 scoops and 2 more. Start at 3, then 4, 5. That is 5. Now do yours."] };
  });
  const cups2 = N("Measuring scoops", "🥛", "A measuring cup holds a set amount. We count how many cups a recipe needs.", "A recipe that needs <b>3 cups</b> and a <b>1-cup scoop</b> means 3 scoops. Level off the scoop for a fair amount.", "Count in ones: one cup per scoop.", () => {
    const c = ri(2, 6), a = ri(1, 4), more = ri(1, 4), f = pick(["flour", "rice", "oats", "sugar"]), n = pick(NAMES);
    const r = Math.random();
    if (r < 0.4) return { text: `A recipe needs ${c} cups of ${f}. Your scoop holds 1 cup. How many scoops do you need?`, visual: "🥣", answer: c,
      hints: ["Each scoop is one whole cup.", "The number of scoops is the same as the number of cups.", "Example: 4 cups with a 1-cup scoop is 4 scoops. Now do yours."] };
    if (r < 0.75) return { text: `${n} adds ${a} cups of ${f} and then ${more} more cups. How many cups in all?`, visual: "🥣", answer: a + more,
      hints: ["Is ${n} adding more or taking away?".replace("${n}", n), "Putting cups together means you add the numbers.", "Example: 2 cups and then 3 more cups. 2 + 3 = 5 cups. Now do yours."] };
    const t = ri(a + 1, 7); return { text: `The recipe needs ${t} cups of ${f}. ${n} has added ${a} so far. How many more cups does ${n} still need?`, visual: "🥣", answer: t - a,
      hints: ["Find how far ${n} is from the total.".replace("${n}", n), `Count up from ${a} to ${t}, or take away ${a} from ${t}.`, "Example: needs 6 cups, added 4. Count up: 5, 6. That is 2 more. Now do yours."] };
  });
  const table2 = N("Setting the table", "🍽️", "When we set a table, each person needs their own plate, cup and fork.", "If each person gets 1 plate, then 4 people need 4 plates. For 2 things each, count by 2s.", "Count the people, then count the pieces each person needs.", () => {
    const p = ri(2, 8);
    if (Math.random() < 0.5) return { text: `${p} people will eat dinner. Each person needs 1 fork. How many forks do you need?`, visual: "🍴", answer: p,
      hints: ["How many people are eating?", "One fork for each person means the number of forks is the same as the number of people.", "Example: 5 people, 1 fork each: 5 forks. Now do yours."] };
    const q = Math.min(p, 5);
    return { text: `${q} people will eat. Each person needs a plate and a cup. How many plates and cups in all?`, visual: "🍽️🥤", answer: q * 2,
      hints: ["Each person needs 2 things.", `Skip count by 2s, ${q} times.`, "Example: 3 people, a plate and a cup each. Count by 2s: 2, 4, 6. That is 6. Now do yours."] };
  });
  const halves2 = N("Half of it", "🍪", "<b>Half</b> means two equal parts. When we share equally with 2 people, each gets half.", "Half of 6 is 3, because 3 + 3 = 6. To find half of a number, split it into two equal groups.", "Think: what number plus itself makes the whole?", () => {
    const n = ri(1, 8) * 2, e = pick(["🍪", "🍓", "🍎", "🍇"]), p = pick(NAMES);
    if (Math.random() < 0.5) return { text: `Half of the ${e} snacks go on the left plate. How many go on the left plate?`, visual: e.repeat(n), answer: n / 2,
      hints: ["Half means two equal parts.", "Split the snacks into two equal groups, one for each plate. Or find the number that plus itself makes the total.", "Example: 8 snacks, half is 4, because 4 + 4 = 8. Now do yours."] };
    return { text: `${p} shares ${n} snacks equally with a friend. How many snacks does each person get?`, visual: e.repeat(n), answer: n / 2,
      hints: ["Equal sharing between 2 people means finding half.", "What number plus itself makes the total?", "Example: 10 snacks shared by 2 friends: 5 + 5 = 10, so 5 each. Now do yours."] };
  });
  const halfCup3 = N("Half cups", "½", "A recipe may call for <b>½ cup</b> (one half cup). Two half cups make 1 whole cup.", "<b>½ + ½ = 1</b>. So 4 half cups make 2 cups. Half of 8 is 4.", "Think in pairs: every 2 halves make 1 whole.", () => {
    const r = Math.random(), n = pick(NAMES);
    if (r < 0.34) { const k = pick([2, 4, 6, 8]); return { text: `${n} adds a half cup of flour ${k} times. How many whole cups of flour is that?`, visual: "½ ".repeat(k), answer: k / 2,
      hints: ["Two half cups make one whole cup.", `Count the half cups in twos: ${k} halves make how many pairs?`, "Example: 6 half cups: 2, 4, 6 are 3 pairs, so 3 cups. Now do yours."] }; }
    if (r < 0.68) { const c = ri(1, 4); return { text: `A recipe needs ${c} ${c === 1 ? "cup" : "cups"} of milk. Your scoop is only ½ cup. How many scoops do you need?`, visual: "½", answer: c * 2,
      hints: ["Each scoop is only half a cup.", "Every cup needs 2 half-cup scoops.", "Example: 3 cups need 3 pairs of half scoops, so 6 scoops. Now do yours."] }; }
    const m = ri(1, 6) * 2, f = pick(FOODS); return { text: `A recipe uses ${m} ${f[0]}. You want to use half of them. How many ${f[0]}?`, answer: m / 2,
      hints: ["Half means two equal groups.", "What number plus itself makes the total?", "Example: 8 apples, half is 4, because 4 + 4 = 8. Now do yours."] };
  });
  const quarter3 = N("Quarter cups", "¼", "A <b>quarter cup</b> (¼ cup) is a small scoop. It takes <b>4 quarter cups</b> to fill 1 whole cup.", "<b>¼ + ¼ + ¼ + ¼ = 1</b>. Two quarter cups make ½ cup. Three quarter cups make ¾ cup.", "Think: 4 quarters make 1 whole.", () => {
    const r = Math.random();
    if (r < 0.55) { const c = ri(1, 4); return { text: `How many quarter-cup (¼) scoops does it take to fill ${c} ${c === 1 ? "cup" : "cups"}?`, visual: "¼", answer: c * 4,
      hints: ["How many quarter cups fill one whole cup?", `Skip count by 4s, once for each whole cup. You have ${c} ${c === 1 ? "cup" : "cups"}.`, "Example: 1 cup needs 4 quarter scoops. For 5 cups you would count 4, 8, 12, 16, 20. Now do yours."] }; }
    const opts = [["¾ cup", 3], ["½ cup", 2], ["1½ cups", 6], ["1¼ cups", 5], ["2 cups", 8]], [t, a] = pick(opts);
    return { text: `A recipe needs ${t} of oats. You only have a ¼-cup scoop. How many scoops do you need?`, visual: "¼", answer: a,
      hints: ["Each scoop is one quarter of a cup.", "Four scoops make a whole cup. Two scoops make half a cup. Count the quarters.", "Example: ¼ cup needs 1 scoop, and 1 whole cup needs 4 scoops. Now do yours."] };
  });
  const double3 = N("Double the recipe", "✌️", "To make a bigger batch, we <b>double</b> the recipe. Everything gets multiplied by 2.", "<b>Double</b> means 2 times as much: 3 eggs becomes 6 eggs. <b>Triple</b> means 3 times.", "Add the number to itself to double it.", () => {
    const [pl, sg] = pick(FOODS), n = ri(1, 6);
    if (Math.random() < 0.7) return { text: `A recipe uses ${n} ${n === 1 ? sg : pl}. You make a double batch. How many ${pl} do you need?`, answer: n * 2,
      hints: ["Double means 2 times as many.", "Add the number to itself.", "Example: 4 eggs, double is 4 + 4 = 8 eggs. Now do yours."] };
    const m = ri(2, 4); return { text: `A recipe uses ${m} ${pl}. You make 3 batches. How many ${pl} do you need in all?`, answer: m * 3,
      hints: ["Three batches means the same number three times.", `Skip count by ${m}s, 3 times.`, "Example: 2 eggs, 3 batches: 2, 4, 6 eggs. Now do yours."] };
  });
  const half3 = N("Half the recipe", "🍰", "To make a small batch, you can make <b>half</b> of the recipe. Everything is cut in half.", "<b>Half</b> of 8 is 4. Half of 10 is 5. Half of 12 is 6.", "Find the number that plus itself makes the total.", () => {
    const [pl] = pick(FOODS), n = ri(1, 7) * 2, u = pick(["cups of flour", "spoons of sugar"]);
    if (Math.random() < 0.5) return { text: `A recipe uses ${n} ${pl}. You make half a batch. How many ${pl} do you use?`, answer: n / 2,
      hints: ["Half is two equal parts.", "What number plus itself makes the total?", "Example: 6 eggs, half a batch is 3, because 3 + 3 = 6. Now do yours."] };
    return { text: `A recipe uses ${n} ${u}. Zoe makes half the recipe. How many ${u} does she use?`, answer: n / 2,
      hints: ["She is using less than the full recipe.", "What number plus itself makes the total?", "Example: 8 spoons, half is 4, because 4 + 4 = 8. Now do yours."] };
  });
  const labelCompare = (() => {
    const f = () => {
      const a = ri(1, 20); let b = ri(1, 20); while (b === a) b = ri(1, 20);
      const less = Math.random() < 0.6, ans = (a < b) === less ? "Cereal A" : "Cereal B";
      return { text: `Cereal A has ${a} grams of sugar. Cereal B has ${b} grams of sugar. Which has ${less ? "LESS" : "MORE"} sugar?`, visual: "🥣", choices: shuf(["Cereal A", "Cereal B"]), answer: ans,
        hints: [`Look at the two numbers. "${less ? "Less" : "More"}" tells you which one to pick.`, `Compare the numbers: which is ${less ? "smaller" : "bigger"}?`, `Example: Snack A has 4 grams and Snack B has 9. Snack A has less, and Snack B has more. Now do yours.`] };
    };
    f.teach = () => [{ h: "Reading numbers on labels", v: "🏷️", t: "Food labels show how much sugar, salt and other things are in a food. We can compare the numbers." },
      { h: "Less and more", v: "4 g &lt; 9 g", t: "A <b>smaller</b> number means <b>less</b>. A <b>bigger</b> number means <b>more</b>." },
      { h: "Tip", v: "💡", t: "Choosing foods with less sugar helps our teeth and bodies. Ask a grown-up to help you read labels." }];
    return f;
  })();
  const shopMath3 = N("Shopping list math", "🛒", "A shopping list helps us buy only what we need. We use adding and taking away to plan.", "Add the numbers on the list to find the total. Take away what you already have to find what to buy.", "Write the numbers first, then add or take away.", () => {
    const r = Math.random(), n = pick(NAMES);
    if (r < 0.4) { const a = ri(2, 6), b = ri(2, 6), c = ri(1, 4); return { text: `${n}'s list says: ${a} apples, ${b} bananas and ${c} ${c === 1 ? "orange" : "oranges"}. How many pieces of fruit in all?`, visual: "🛒", answer: a + b + c,
      hints: ["The question asks for all of the fruit together.", "Add the three numbers. Start with the biggest.", "Example: 3 pears, 2 plums, 1 peach is 3 + 2 + 1 = 6. Now do yours."] }; }
    if (r < 0.75) { const need = ri(5, 12), have = ri(1, need - 2); return { text: `${n} needs ${need} eggs for baking and already has ${have}. How many more eggs should go on the shopping list?`, visual: "🥚", answer: need - have,
      hints: ["How many eggs are still missing?", `Count up from ${have} to ${need}, or take away.`, "Example: needs 8, has 5. Count up: 6, 7, 8. That is 3 more. Now do yours."] }; }
    const per = pick([2, 3, 4, 5]), k = ri(2, 4); return { text: `A pack of buns has ${per} buns. ${n} buys ${k} packs. How many buns in all?`, visual: "🍞", answer: per * k,
      hints: ["Each pack has the same number of buns.", `Skip count by ${per}s, ${k} times.`, "Example: packs of 3 buns, 2 packs: 3, 6. That is 6 buns. Now do yours."] };
  });
  const choreTime = N("Chore time", "⏰", "Chores take time. We add the minutes to plan our day.", "Set the table 5 minutes + dishes 10 minutes = 15 minutes.", "Add the minutes for each chore.", () => {
    const a = pick([5, 10, 15]), b = pick([5, 10, 20]), c = pick([5, 10]), n = pick(NAMES);
    if (Math.random() < 0.5) return { text: `${n} sets the table for ${a} minutes and clears it for ${b} minutes. How many minutes of work is that?`, visual: "🍽️", answer: a + b,
      hints: ["The question asks for both chores together.", "Add the two numbers of minutes.", "Example: 5 minutes + 10 minutes = 15 minutes. Now do yours."] };
    return { text: `${n} sweeps for ${a} minutes, folds laundry for ${b} minutes and tidies toys for ${c} minutes. How many minutes in all?`, visual: "🧹", answer: a + b + c,
      hints: ["Put all three chores together.", "Add the three times. Start with the biggest number.", "Example: 5 + 10 + 5 = 20 minutes. Now do yours."] };
  });

  // ---------- topics ----------
  const C = {
    // ===== LEVEL 1 =====
    askFirst: T("Ask a grown-up first", "🧑‍🍳", "The kitchen is a great place to learn, but some jobs are for grown-ups. We always <b>ask first</b>.", "Ask a grown-up before using the <b>stove</b>, <b>oven</b>, <b>knife</b> or mixer. Cook <b>with</b> a grown-up nearby.", "If you aren't sure, stop and ask a grown-up.", "You want to cook soup. You ask a grown-up to help you with the stove.", [
      ["You want to use the stove. What do you do?", "Ask a grown-up", ["Turn it on yourself", "Leave the kitchen on"]], ["You want to bake cookies. What do you do first?", "Ask a grown-up to help", ["Turn on the oven alone", "Skip all the rules"]],
      ["Who can use the oven?", "A grown-up (or a kid with a grown-up)", ["A kid alone", "A toy"]], ["Who turns on the stove?", "A grown-up", ["A baby", "A pet"]],
      ["You see something spill on the floor. What do you do?", "Tell a grown-up or wipe it up carefully", ["Run through it", "Ignore it"]], ["Where should you cook?", "In the kitchen with a grown-up nearby", ["Alone in the kitchen", "Outside by the road"]],
      ["Can you cook with a grown-up helping?", "Yes, that is a safe way to learn", ["No, never", "Only in the dark"]]]),
    hot: S("Hot things", "♨️", "Some things in the kitchen get very hot. Hot things can burn us.", "The <b>stove, oven, pots, pans</b> and a kettle can get <b>very hot</b>. Stay away, and ask a grown-up to handle them.", "Ask: could this get hot from fire or electricity?", "The stove can burn you, so you stay away from it.", {
      "Can get hot": ["🔥|the stove", "♨️|a pot on the stove", "🍳|a frying pan", "🍞|a toaster", "🫖|a kettle", "🔥|the oven"],
      "Stays cool": ["🥛|a glass of cold milk", "🍎|an apple", "🧊|an ice cube", "🥣|a bowl of cereal with cold milk", "🍦|ice cream"] }, n => `Can <b>${n}</b> get hot, or does it stay cool?`),
    sharp: S("Sharp things", "🔪", "Sharp things can cut us. Only grown-ups use sharp tools in the kitchen.", "<b>Knives</b> and graters are sharp. A grown-up cuts food for you. Kids can use <b>kid-safe tools</b> with a grown-up watching.", "Ask: could this cut me? If yes, a grown-up handles it.", "A knife is sharp, so a grown-up cuts the apple.", {
      "Sharp, ask a grown-up": ["🔪|a big kitchen knife", "a grater", "a peeler (with a grown-up)", "a can with a sharp edge", "a broken glass"],
      "Safe for kids to touch": ["🥄|a spoon", "🥣|a bowl", "🍽️|a plate", "🥤|a plastic cup", "a wooden spoon"] }, n => `Is <b>${n}</b> sharp, or safe for kids to touch?`),
    washFirst: T("Wash hands to cook", "🧼", "Before we cook, we wash our hands so germs stay out of our food.", "Wash with <b>soap and water</b> for 20 seconds. Wash again after touching <b>raw eggs or meat</b>. Tie back long hair.", "Think: could my hands have germs from outside or raw food?", "Before you mix batter, you wash your hands with soap.", [
      ["What do we do before we cook?", "Wash our hands", ["Eat dessert", "Run around"]], ["How long should we scrub?", "20 seconds", ["2 seconds", "1 hour"]], ["What do we use to clean our hands?", "Soap and water", ["Juice", "Flour"]],
      ["You touched raw egg. What do you do?", "Wash your hands", ["Touch your face", "Lick your fingers"]], ["Long hair should be…", "Tied back", ["In the food", "Over the stove"]], ["Why do we wash our hands?", "To keep germs out of food", ["To make food hot", "To get dirty"]],
      ["You sneezed. What do you do before cooking more?", "Wash your hands", ["Keep cooking", "Wipe on your shirt"]]]),
    tools: T("Kitchen tools", "🍴", "Kitchens have lots of tools. Each one has its own name.", "🍴 <b>fork</b>, 🥄 <b>spoon</b>, 🥣 <b>bowl</b>, 🍳 <b>pan</b>, 🥤 <b>cup</b>, 🍽️ <b>plate</b>.", "Look at the picture and think about how it is used.", "You eat soup with a spoon.", [
      ["🍴|What is this?", "Fork", ["Spoon", "Plate"]], ["🥄|What is this?", "Spoon", ["Fork", "Bowl"]], ["🥣|What is this?", "Bowl", ["Cup", "Pan"]], ["🍳|What is this?", "Pan", ["Plate", "Cup"]],
      ["🥤|What is this?", "Cup", ["Fork", "Pan"]], ["🍽️|What is this?", "Plate", ["Spoon", "Cup"]], ["What do you eat soup with?", "A spoon", ["A plate", "A fork only"]], ["What do you pour milk into?", "A cup", ["A fork", "A pan"]]]),
    toolJobs: T("What do tools do?", "🧰", "Each kitchen tool has a special job.", "A <b>whisk</b> mixes eggs. A <b>rolling pin</b> flattens dough. A <b>spatula</b> flips. A <b>strainer</b> drains water. <b>Oven mitts</b> protect hands.", "Think about what you want to do to the food.", "To flip a pancake, you use a spatula.", [
      ["What mixes eggs?", "A whisk", ["A rolling pin", "A strainer"]], ["What flattens dough?", "A rolling pin", ["A whisk", "A spatula"]], ["What flips a pancake?", "A spatula", ["A whisk", "A strainer"]],
      ["What drains water from pasta?", "A strainer", ["A spoon", "A cup"]], ["What protects your hands from a hot pan?", "Oven mitts", ["A napkin", "A sock"]], ["What do you cut a board of food on?", "A cutting board", ["A plate on the floor", "A pillow"]],
      ["What tells you how long to cook?", "A timer", ["A fork", "A spoon"]]]),
    groupsK: S("Which food group?", "🍽️", "Food is sorted into groups. Each group helps our body in a different way.", "<b>Fruits</b> and <b>vegetables</b> give vitamins. <b>Dairy</b> (like milk and cheese) gives calcium. <b>Grains</b> (like bread and rice) give energy.", "Ask: is it from a plant, a bread-like food, or from milk?", "Cheese is made from milk, so it is dairy.", {
      "Fruit": ["🍎|an apple", "🍌|a banana", "🍇|grapes", "🍓|a strawberry"],
      "Vegetable": ["🥕|a carrot", "🥦|broccoli", "🥬|lettuce", "🌽|corn"],
      "Dairy": ["🥛|milk", "🧀|cheese", "yogurt"],
      "Grain": ["🍞|bread", "🍚|rice", "🍝|pasta"] }, n => `Which food group is <b>${n}</b> in?`),
    snacks1: S("Healthy snack or treat?", "🍎", "A snack gives us energy. Some snacks are healthy and some are treats for sometimes.", "<b>Healthy snacks</b>: fruit, veggies, yogurt, cheese. <b>Treats</b>: candy, cake, cookies, soda.", "Ask: is it a fruit, veggie or dairy, or is it very sugary?", "Apple slices are a healthy snack. A lollipop is a treat.", {
      "Healthy snack": ["🍎|apple slices", "🥕|carrot sticks", "🍌|a banana", "🧀|a cheese stick", "🍇|grapes", "yogurt"],
      "Treat for sometimes": ["🍭|a lollipop", "🍰|cake", "🍬|candy", "🍩|a donut", "🥤|soda", "🍪|a big cookie"] }, n => `Is <b>${n}</b> a healthy snack or a treat for sometimes?`),
    table1: T("Setting the table", "🍽️", "We set the table so everyone is ready to eat.", "Each person needs a <b>plate</b>, a <b>cup</b> and a <b>fork</b>. The fork goes on the <b>left</b> of the plate. The spoon goes on the <b>right</b>. Napkins go beside the plate.", "Picture the table from above, with the plate in the middle.", "A napkin goes next to the fork on the left side.", [
      ["🍽️|What goes in the middle of a place setting?", "The plate", ["The fork", "The cup"]], ["🍴|Which side does the fork go on?", "Left", ["Right", "On the plate"]], ["🥄|Which side does the spoon go on?", "Right", ["Left", "Under the plate"]],
      ["🥤|What do you drink from?", "A cup", ["A fork", "A plate"]], ["Who sets the table with you?", "Anyone who helps", ["Nobody", "A stranger"]], ["Before setting the table you should…", "Wipe it clean", ["Dirty it", "Put toys on it"]],
      ["🧻|What do you wipe your hands and mouth with?", "A napkin", ["A fork", "A spoon"]]]),
    chores: T("Chores that help", "🧹", "A chore is a job that helps the family. Everyone can help at home.", "Chores kids can do: <b>make your bed</b>, <b>tidy toys</b>, <b>help set the table</b>, <b>feed the pet</b> (with a grown-up), <b>put dirty clothes in the hamper</b>.", "Ask: does this help keep our home clean and happy?", "Putting toys in the toy box is a chore that helps.", [
      ["Which is a chore that helps?", "Putting toys away", ["Leaving a mess", "Hiding the dishes"]], ["🛏️|What do you do in the morning to keep your room neat?", "Make your bed", ["Jump on it forever", "Cover it in toys"]],
      ["Where do dirty clothes go?", "In the hamper", ["On the floor", "In the fridge"]], ["🐶|Who helps feed the pet?", "You, with a grown-up", ["Nobody", "A stranger"]], ["Chores help our family…", "Work together", ["Fight", "Be messy"]],
      ["After you use something, you…", "Put it back", ["Hide it", "Leave it on the stairs"]], ["🍽️|How can you help after dinner?", "Carry your plate to the sink", ["Go away", "Leave food everywhere"]]]),
    cleanUp: T("Cleaning up", "🧽", "After cooking, we clean up so the kitchen is ready for next time.", "Wipe the <b>table</b>, wash or load the <b>dishes</b>, throw away <b>trash</b>, and put things <b>away</b>. Wipe spills so no one slips.", "Think about the steps that make the kitchen tidy again.", "After a snack, you put your cup in the sink and wipe the table.", [
      ["After you cook, you…", "Clean up", ["Leave a big mess", "Hide the pans"]], ["🧽|What do you use to wipe the table?", "A sponge or cloth", ["A shoe", "A fork"]], ["You spilled juice. What do you do?", "Wipe it up", ["Leave it", "Jump in it"]],
      ["Where does trash go?", "In the trash can", ["On the floor", "In the oven"]], ["Dirty dishes go…", "In the sink or dishwasher", ["Under the bed", "On the shelf"]], ["Clean up makes the kitchen…", "Ready for next time", ["Messier", "Hotter"]],
      ["Who can help clean up?", "Everyone", ["Only the dog", "Nobody"]]]),
    laundry1: S("Light or dark laundry?", "🧺", "Before washing clothes, we sort them into piles. Light clothes go in one pile and dark clothes in another.", "<b>Lights</b>: white, yellow, pink, light blue. <b>Darks</b>: black, navy, dark green, dark gray. Sorting keeps colors from running onto each other.", "Ask: is the color light or dark?", "A white shirt is in the light pile.", {
      "Lights pile": ["a white shirt", "a yellow sock", "a pink dress", "a light blue shirt", "a cream sweater", "a white towel"],
      "Darks pile": ["black pants", "a navy shirt", "dark green socks", "a dark gray hoodie", "a dark brown jacket", "a black sock"] }, n => `Does <b>${n}</b> go in the lights pile or the darks pile?`),
    scoops1: scoops1,
    spoonCup: T("Cups and spoons", "🥄", "We use measuring tools to put the right amount in a recipe.", "A <b>cup</b> holds a lot. A <b>spoon</b> holds a little. Scoop and level it off with a flat edge.", "Think: big amount (cup) or little amount (spoon)?", "A big bowl of flour is measured with a cup. A pinch of salt is measured with a spoon.", [
      ["Which holds more?", "A cup", ["A spoon", "A pea"]], ["Which holds less?", "A teaspoon", ["A cup", "A big bowl"]], ["🥣|Which tool do you use to measure flour?", "A measuring cup", ["A fork", "A plate"]],
      ["🥄|Which tool measures a little vanilla?", "A measuring spoon", ["A big bucket", "A cup of water"]], ["When you scoop flour, you…", "Level it off", ["Pile it high", "Spill it"]], ["Measuring helps a recipe…", "Turn out right", ["Burn", "Disappear"]],
      ["Which do you use to measure milk?", "A measuring cup", ["A fork", "A bat"]]]),
    fridge1: S("Fridge or pantry?", "🧊", "Some foods stay cold in the fridge so they stay fresh. Others are kept in a cupboard, called a pantry.", "<b>Fridge</b>: milk, cheese, yogurt, eggs, lettuce. <b>Pantry</b>: cereal, pasta, rice, crackers, canned beans.", "Ask: does it spoil if it gets warm? Then it goes in the fridge.", "Milk goes in the fridge. Pasta stays in the pantry.", {
      "Fridge": ["🥛|milk", "🧀|cheese", "🥚|eggs", "🥬|lettuce", "yogurt", "🍓|strawberries"],
      "Pantry": ["🥣|cereal", "🍝|dry pasta", "🍚|dry rice", "crackers", "canned beans", "oatmeal"] }, n => `Does <b>${n}</b> go in the fridge or the pantry?`),
    cookWords: T("Cooking words", "🥣", "Cooks use special action words. Let us learn them.", "<b>Stir</b>: move with a spoon. <b>Pour</b>: tip a liquid. <b>Mix</b>: combine. <b>Spread</b>: smooth on top. <b>Crack</b>: break an egg. <b>Wash</b>: clean with water.", "Picture your hands doing the action.", "To mix a salad, you stir it all together.", [
      ["🥄|Which word means moving food around with a spoon?", "Stir", ["Pour", "Bake"]], ["🥛|Which word means tipping milk into a cup?", "Pour", ["Stir", "Crack"]], ["🥚|Which word means breaking an egg open?", "Crack", ["Stir", "Wash"]],
      ["🧈|Which word means smoothing butter on bread?", "Spread", ["Pour", "Crack"]], ["🥣|Which word means combining things together?", "Mix", ["Wash", "Pour"]], ["🍎|Which word means cleaning fruit with water?", "Wash", ["Crack", "Spread"]],
      ["Which word means using a rolling pin to flatten dough?", "Roll", ["Pour", "Stir"]]]),
    tidyRoom: T("Tidy my room", "🧸", "A tidy room is easier to play in and easier to find things. You can do it!", "Pick up toys, put <b>clothes</b> in drawers, put <b>books</b> on a shelf, make your <b>bed</b>. Everything has a home.", "Think: where does each thing live?", "Your books go on the shelf, and your toys go in the toy box.", [
      ["🧸|Where do toys go?", "In the toy box", ["On the stairs", "In the shoe"]], ["📚|Where do books go?", "On a shelf", ["Under the bed", "In the sink"]], ["👕|Where do clean clothes go?", "In a drawer", ["On the floor", "In the trash"]],
      ["🛏️|What do you do with your bed?", "Make it", ["Pile toys on it", "Break it"]], ["Dirty clothes go…", "In the hamper", ["Under the rug", "On the shelf"]], ["A tidy room helps you…", "Find your things", ["Lose your things", "Trip over toys"]],
      ["You are done playing. What do you do?", "Put the toys away", ["Leave them on the floor", "Throw them"]]]),
    helping: T("Helping at home", "🏠", "Families help each other. You can help in lots of ways.", "Ask <b>\"Can I help?\"</b>. You can carry light bags, water plants, wipe the table or set out napkins. Help makes home happy.", "Think of a safe way you can help.", "A parent is cooking, so you ask, \"Can I set the table?\"", [
      ["A grown-up is cooking. What can you say?", "Can I help?", ["Go away", "I won't help"]], ["Which is a safe way to help?", "Setting out napkins", ["Using a big knife", "Turning on the oven alone"]],
      ["🌱|You can help by…", "Watering plants", ["Pulling them out", "Stepping on them"]], ["A little brother drops his toys. You can…", "Help pick them up", ["Laugh", "Kick them"]],
      ["After a meal, you can…", "Say thank you to the cook", ["Say it was bad", "Run away"]], ["Helping makes your family feel…", "Happy", ["Sad", "Mad"]],
      ["You aren't sure how to help. You…", "Ask", ["Do nothing", "Guess dangerously"]]])
  };
  Object.assign(C, {
    // ===== LEVEL 2 =====
    cups: cups2,
    spoons: T("Teaspoons and tablespoons", "🥄", "There are two main measuring spoons: the <b>teaspoon</b> (tsp) and the <b>tablespoon</b> (tbsp).", "A tablespoon is <b>bigger</b> than a teaspoon. <b>3 teaspoons</b> make 1 tablespoon. Always level off the spoon.", "Think: the word \"table\" is the big spoon, \"tea\" is the small one.", "A small amount of vanilla is a teaspoon. A bigger scoop of sugar can be a tablespoon.", [
      ["Which spoon is bigger?", "A tablespoon", ["A teaspoon", "They are the same"]], ["Which spoon is smaller?", "A teaspoon", ["A tablespoon", "A ladle"]],
      ["How many teaspoons make one tablespoon?", "3", ["1", "20"]], ["What does tsp mean?", "Teaspoon", ["Table spoon", "Tiny spoon"]], ["What does tbsp mean?", "Tablespoon", ["Teaspoon", "Table"]],
      ["Why do we level off a spoon?", "To measure the right amount", ["To spill it", "To make it heavy"]], ["Which do you use for a tiny bit of salt?", "A small measuring spoon", ["A big cup", "A bucket"]]]),
    scoops2: table2,
    recipeOrder: T("Recipe order", "📋", "A recipe has steps in order. We follow them from first to last.", "<b>First</b> wash hands and read the recipe. <b>Next</b> gather the ingredients. <b>Then</b> measure and mix. <b>Then</b> cook with a grown-up. <b>Last</b> clean up.", "Think about what must happen before the next step.", "You crack the eggs before you whisk them, because you can't whisk eggs in a shell.", [
      ["What do you do FIRST when cooking?", "Wash your hands and read the recipe", ["Eat the food", "Clean up"]], ["What comes after reading the recipe?", "Gather the ingredients", ["Clean up", "Eat the cake"]],
      ["When do you measure the flour?", "Before mixing it in", ["After eating", "After cleanup"]], ["What is the LAST step?", "Clean up", ["Gather ingredients", "Read the recipe"]],
      ["When do you put cookies in the oven?", "After mixing the dough", ["Before gathering ingredients", "Before washing hands"]], ["Why follow the order?", "So the food turns out right", ["To be silly", "It doesn't matter"]],
      ["Who puts food in a hot oven?", "A grown-up", ["A kid alone", "A pet"]]]),
    recipeParts: T("Reading a recipe", "📖", "A recipe tells us what we need and what to do.", "<b>Ingredients</b> are the foods you need. <b>Steps</b> tell what to do. There is also <b>time</b> and <b>servings</b> (how many people it feeds).", "Match each word to what it tells you.", "The ingredients list tells you to use 2 eggs.", [
      ["What are ingredients?", "The foods you use in a recipe", ["The pans", "The steps"]], ["What are the steps?", "What to do, in order", ["What to buy", "The names of tools"]],
      ["What does \"servings\" tell you?", "How many people it feeds", ["How long to wash", "How hot it is"]], ["Where do you see how much flour to use?", "In the ingredients list", ["In the pictures only", "Nowhere"]],
      ["What tells you how long to bake?", "The time in the recipe", ["The name of the dish", "The page number"]], ["Why read a recipe before cooking?", "To know what to do", ["To waste time", "To eat it"]],
      ["Which of these is an ingredient?", "Flour", ["A whisk", "An oven mitt"]]]),
    groups2: S("Food groups", "🥗", "Eating foods from each group gives our bodies what they need.", "<b>Fruits</b>, <b>vegetables</b>, <b>grains</b>, <b>protein</b> (eggs, chicken, beans) and <b>dairy</b> (milk, cheese).", "Think about where the food comes from or what it gives our body.", "Eggs are in the protein group.", {
      "Fruits": ["🍊|an orange", "🍉|watermelon", "🍐|a pear", "🍑|a peach"],
      "Vegetables": ["🥔|a potato", "🥬|lettuce", "🥕|carrots", "🥦|broccoli"],
      "Grains": ["🍞|bread", "🍚|rice", "🍝|spaghetti", "oatmeal"],
      "Protein": ["🥚|an egg", "🍗|chicken", "🐟|fish", "🫘|beans"],
      "Dairy": ["🥛|milk", "🧀|cheese", "yogurt"] }, n => `Which food group is <b>${n}</b> in?`),
    snacks2: T("Making a healthy snack", "🥪", "You can make a healthy snack with a grown-up. It is fun to build!", "Pick a <b>fruit or veggie</b> and add a <b>protein or dairy</b>. Examples: apple slices and cheese, celery and hummus, yogurt and berries.", "Mix food groups: a fruit or veggie plus protein or dairy.", "A banana with yogurt is a snack with fruit and dairy.", [
      ["Which snack has a fruit and dairy?", "Strawberries and yogurt", ["Candy and soda", "Chips and cake"]], ["Which snack has a veggie and dairy?", "Carrot sticks and cheese", ["Gummy worms", "Donut"]],
      ["Which snack has a fruit?", "An apple", ["A lollipop", "A soda"]], ["A healthy snack should have…", "Fruit or veggies", ["Only sugar", "Only frosting"]], ["What drink goes with a snack?", "Water or milk", ["Soda", "Fruit punch every time"]],
      ["Who helps you make a snack?", "A grown-up for sharp or hot parts", ["Nobody for the knife", "A stranger"]], ["Before you make a snack, you…", "Wash your hands", ["Skip it", "Eat first"]]]),
    oven: T("Oven and stove safety", "🧤", "Ovens and stoves cook our food, but they get very hot. We use safety rules.", "A <b>grown-up</b> uses the stove and oven. Use <b>oven mitts</b> to hold hot pans. Turn pot handles <b>inward</b>. Keep kids and pets at a safe distance.", "Think: hot things are for grown-ups, with mitts.", "A grown-up wears oven mitts to take out the hot cookies.", [
      ["Who puts food in the oven?", "A grown-up", ["A kid alone", "A pet"]], ["🧤|What do you wear to hold a hot pan?", "Oven mitts", ["A wet towel", "Nothing"]],
      ["Pot handles should point…", "Inward, not over the edge", ["Out into the room", "Toward kids"]], ["The oven is on. What do you do?", "Stay back", ["Touch the door", "Sit on it"]],
      ["Is it okay to touch the stove top?", "No, it may be hot", ["Yes", "Yes, after cooking"]], ["A pan is smoking. What do you do?", "Tell a grown-up right away", ["Wait", "Pour water on it"]],
      ["Cookies are done. Who takes them out?", "A grown-up with mitts", ["A kid with bare hands", "Nobody"]]]),
    cookWords2: T("More cooking words", "🔥", "Cooks use many words for ways to cook food. Each one means something different.", "<b>Bake</b>: cook in the oven. <b>Boil</b>: heat water until bubbly. <b>Melt</b>: heat turns a solid into liquid. <b>Chill</b>: make cold in the fridge. <b>Toast</b>: make bread crispy.", "Think about how the food is heated or cooled.", "Butter melts in a warm pan.", [
      ["Which word means to cook in an oven?", "Bake", ["Chill", "Pour"]], ["Which word means to heat water until it bubbles?", "Boil", ["Chill", "Spread"]], ["🧈|Butter turns to liquid in heat. This is called…", "Melting", ["Chilling", "Toasting"]],
      ["🧊|Which word means to make something cold in the fridge?", "Chill", ["Boil", "Bake"]], ["🍞|Which word means to make bread crispy and brown?", "Toast", ["Chill", "Mash"]], ["🍌|Which word means to squish with a fork?", "Mash", ["Boil", "Bake"]],
      ["🍪|What do you do to cookies in the oven?", "Bake them", ["Chill them", "Boil them"]]]),
    table2: table2,
    dishes: T("Washing dishes", "🍽️", "Washing dishes keeps our things clean and germ-free.", "Use <b>warm soapy water</b>, scrub, rinse and dry. Wash cleaner things like cups first. <b>Sharp knives</b> are for grown-ups to wash.", "Think: scrub, rinse, dry. Let grown-ups handle sharp things.", "You wash a cup with a soapy sponge and rinse it under the tap.", [
      ["What do you need to wash dishes?", "Soap and water", ["Sand and dirt", "Glue"]], ["What do you do after you scrub?", "Rinse", ["Add more food", "Leave it"]], ["Who washes the sharp knives?", "A grown-up", ["A little kid", "A pet"]],
      ["Which do you wash first?", "Cups and plates", ["The greasy pot", "The dirtiest pan"]], ["A glass breaks. What do you do?", "Tell a grown-up and stay away", ["Pick it up with your hands", "Sweep it with your fingers"]], ["After rinsing, you…", "Dry or let it air dry", ["Put it away dirty", "Throw it"]],
      ["Wet floors can be…", "Slippery", ["Soft", "Hot"]]]),
    laundry2: S("Where does it go?", "👕", "After clothes are clean, they go to their homes. Some go in a drawer, some on hangers, and shoes go on the shoe rack.", "<b>Drawer</b>: socks, t-shirts, pajamas, shorts. <b>Hanger</b>: coats, jackets, dresses. <b>Shoe rack</b>: sneakers, boots, sandals.", "Ask: does it fold flat, hang, or go on feet?", "A coat hangs on a hanger to keep its shape.", {
      "Drawer": ["🧦|socks", "👕|a t-shirt", "pajamas", "🩳|shorts"],
      "Hanger": ["🧥|a coat", "a dress", "a jacket", "a nice shirt"],
      "Shoe rack": ["👟|sneakers", "🥾|boots", "🩴|sandals", "slippers"] }, n => `Where does <b>${n}</b> go: drawer, hanger or shoe rack?`),
    laundrySteps: T("Laundry steps", "🧺", "Doing laundry has steps. A grown-up runs the machines, and you can do some jobs.", "<b>Sort</b> the clothes, <b>wash</b>, <b>dry</b>, <b>fold</b> and <b>put away</b>. Kids can sort, fold and put away.", "Think about the order: dirty to clean to put away.", "First you sort, then you wash, and last you put clothes in a drawer.", [
      ["What is the FIRST laundry step?", "Sort the clothes", ["Fold them", "Put them away"]], ["What comes after sorting?", "Wash", ["Put away", "Dry"]], ["What is the LAST laundry step?", "Put clothes away", ["Sort", "Wash"]],
      ["What do you do after clothes are dry?", "Fold them", ["Sort them again", "Wash them"]], ["Who runs the washing machine?", "A grown-up (or with a grown-up)", ["A toddler", "A pet"]], ["Where do dirty clothes wait?", "In the hamper", ["On the floor", "In the freezer"]],
      ["Folded clothes are put…", "Away in a drawer", ["Back in the hamper", "In the trash"]]]),
    sewWords: T("Sewing words", "🧵", "Sewing is a way to join cloth or fix clothes. Let us learn the words.", "<b>Needle</b>: a thin sharp tool. <b>Thread</b>: the string. <b>Button</b>: round fastener. <b>Fabric</b>: cloth. <b>Scissors</b>: for cutting thread. Always ask a grown-up.", "Match each word to what it is.", "A thread goes through the eye of the needle.", [
      ["🪡|What is this?", "A needle", ["A spoon", "A button"]], ["🧵|What is this?", "Thread", ["A needle", "A button"]], ["🔘|What is this fastener?", "A button", ["Thread", "Fabric"]],
      ["What is cloth called?", "Fabric", ["Thread", "Needle"]], ["What do you cut thread with?", "Scissors", ["A spoon", "A fork"]], ["What goes through a needle's eye?", "Thread", ["Fabric", "A button"]],
      ["What holds a coat closed?", "Buttons", ["Pillows", "Plates"]]]),
    sewSafe: T("Sewing safely", "✂️", "Needles and scissors are sharp. We use them safely with a grown-up.", "Ask a grown-up to <b>teach you</b>. Use a <b>plastic needle</b> and yarn when learning. Keep needles in a <b>pincushion</b> and count them. Never put them in your mouth.", "Ask: is it sharp? Then ask a grown-up and be gentle.", "After sewing, you put the needle back in the pincushion.", [
      ["Who should help you with a needle?", "A grown-up", ["Nobody", "A friend who is little"]], ["Where do you keep a needle?", "In a pincushion", ["On the floor", "In your pocket"]], ["Can you put a needle in your mouth?", "No, never", ["Yes", "Yes, for a bit"]],
      ["What can kids use to learn?", "A plastic needle and yarn", ["A big sharp needle alone", "A knife"]], ["You find a needle on the floor. What do you do?", "Tell a grown-up", ["Pick it up with bare hands and run", "Hide it"]],
      ["How do you use scissors?", "Carefully, pointing down while walking", ["Waving in the air", "Running with them"]], ["After sewing, you…", "Count and put things away", ["Leave them out", "Toss them"]]]),
    shopList: T("Shopping lists", "📝", "A shopping list helps you remember what to buy.", "Write down the <b>items</b> you need. Check the <b>fridge and pantry</b> first. Buy only what is on the list. Cross off items as you put them in the cart.", "Think: did I check what we already have?", "You see there is no milk in the fridge, so you write \"milk\" on the list.", [
      ["Why make a shopping list?", "To remember what to buy", ["To lose things", "To skip shopping"]], ["What do you do first?", "Check what you already have", ["Buy everything", "Close your eyes"]],
      ["There is no milk. What do you do?", "Write milk on the list", ["Ignore it", "Cross it off"]], ["You put an item in the cart. What do you do?", "Cross it off the list", ["Tear the list", "Forget it"]],
      ["Which should be on a list for a fruit salad?", "Apples and grapes", ["Shoelaces", "Soap"]], ["Who goes to the store with you?", "A grown-up", ["Nobody", "A stranger"]], ["A list helps you…", "Buy only what you need", ["Buy extra toys", "Forget things"]]]),
    foodSafe: T("Keeping food safe", "🧊", "Some foods spoil if they are not kept cold. We keep food safe so it does not make us sick.", "Keep <b>cold food cold</b> in the fridge. Put leftovers in the fridge soon after eating. <b>Wash fruits and veggies</b>. Don't eat food that smells bad or looks moldy. Don't eat raw cookie dough.", "Think: cold stays cold, wash first, and when in doubt, ask.", "After dinner, leftovers go back in the fridge.", [
      ["Where do milk and eggs go?", "In the fridge", ["On the counter all day", "In the sun"]], ["Leftovers should go…", "In the fridge soon", ["Under the couch", "On the floor"]], ["Before eating an apple, you…", "Wash it", ["Skip it", "Roll it on the floor"]],
      ["Food smells bad or has mold. What do you do?", "Don't eat it; tell a grown-up", ["Eat it", "Share it"]], ["Is raw cookie dough safe to eat?", "No, not raw", ["Yes", "Yes, a lot"]], ["Why keep food cold?", "So it stays fresh and safe", ["To make it warm", "For fun"]],
      ["You dropped food on the floor. What do you do?", "Don't eat it", ["Eat it quick", "Feed it to a friend"]]]),
    halves: halves2,
    friendsCook: T("Cooking with friends", "👩‍🍳", "Cooking together is a fun way to learn. We share jobs and follow safety rules.", "Give every child a <b>job</b>: washing, stirring, measuring. A <b>grown-up</b> does the stove, oven and knives. Take turns and clean up together.", "Think: fair jobs, safe jobs, and a grown-up for the hot and sharp parts.", "Mia measures, Sam stirs, and a grown-up bakes.", [
      ["Everyone wants to stir. What is fair?", "Take turns", ["Grab the spoon", "Yell"]], ["Who does the stove and oven?", "A grown-up", ["The littlest kid", "Nobody"]], ["Which job can a kid do?", "Stirring cold batter", ["Using the sharp knife alone", "Taking a hot pan out"]],
      ["Someone spills flour. What do you do?", "Help clean up", ["Laugh", "Blame them"]], ["Before cooking, everyone…", "Washes hands", ["Plays tag", "Skips it"]], ["After cooking, we…", "Clean up together", ["Leave a mess", "Hide"]],
      ["A good cook helper…", "Listens and follows steps", ["Ignores the recipe", "Runs in the kitchen"]]])
  });
  Object.assign(C, {
    // ===== LEVEL 3 =====
    halfCup: halfCup3,
    quarterCup: quarter3,
    double: double3,
    halfRecipe: half3,
    dryLiquid: T("Dry or liquid measuring", "🥛", "There are two kinds of measuring cups: one for <b>dry</b> things and one for <b>liquids</b>.", "<b>Dry cups</b> are scooped and leveled flat (flour, sugar). <b>Liquid cups</b> have a spout and lines (milk, water). Look at the line at eye level.", "Think: do I scoop it or pour it?", "You pour milk into a glass measuring cup and check the line.", [
      ["Which cup measures milk?", "A liquid measuring cup", ["A dry measuring cup", "A spoon rest"]], ["Which cup measures flour?", "A dry measuring cup", ["A liquid measuring cup", "A cup with a handle only"]],
      ["How do you measure flour correctly?", "Scoop and level it flat", ["Pack it down hard", "Pour it from a jug"]], ["How do you read a liquid cup?", "At eye level", ["From above with one eye closed", "Upside down"]],
      ["Which has a spout for pouring?", "A liquid measuring cup", ["A dry measuring cup", "A fork"]], ["Which is a liquid?", "Water", ["Sugar", "Flour"]], ["Which is dry?", "Rice", ["Milk", "Juice"]]]),
    labelRead: T("Reading food labels", "🏷️", "Packages have labels that tell us about the food inside. A grown-up can help you read them.", "<b>Serving size</b>: the amount for one person. <b>Ingredients</b>: what's inside, with the most first. <b>Sugar</b>: how much sweet stuff. <b>Best by</b>: the date to enjoy it by.", "Match the label word to what it tells you.", "The ingredients list shows the main ingredient first.", [
      ["What does \"serving size\" tell you?", "How much counts as one serving", ["The color", "The price"]], ["What does the ingredients list show?", "What is in the food", ["Who cooked it", "How far it traveled"]],
      ["Which ingredient is listed first?", "The one there is the most of", ["The one there is the least of", "A random one"]], ["What does \"best by\" tell you?", "The date to enjoy it by", ["The best color", "How to cook it"]],
      ["Where do you find sugar amounts?", "On the nutrition label", ["On the front only", "On the bottom of the box"]], ["Who can help you read a label?", "A grown-up", ["Nobody", "A stranger"]],
      ["Why read labels?", "To know what we are eating", ["For fun only", "To waste time"]]]),
    labelCompare: labelCompare,
    allergy: T("Food allergies", "🥜", "Some people have <b>food allergies</b>. Their bodies react badly to certain foods like nuts, milk or eggs.", "Read labels for words like <b>contains peanuts</b>. <b>Never share</b> food with a friend who has an allergy. Tell a grown-up right away if someone feels sick.", "Think: ask a grown-up and never guess about allergies.", "A friend is allergic to peanuts, so you don't share a peanut snack.", [
      ["A friend has a food allergy. What do you do?", "Don't share food without a grown-up", ["Share your snack", "Trade lunches"]], ["Where can you check for allergy words?", "On the food label", ["On the fork", "On the floor"]],
      ["Someone feels sick after eating. What do you do?", "Tell a grown-up right away", ["Wait", "Hide it"]], ["Which foods can cause allergies?", "Nuts, milk and eggs", ["Water", "Air"]], ["Is it kind to ask about allergies?", "Yes, it helps keep friends safe", ["No, it's rude", "No, never"]],
      ["Who decides what is safe for a friend with an allergy?", "Their grown-up", ["Anyone", "The pet"]], ["A label says \"contains milk.\" It means…", "There is milk in the food", ["It is milk-free", "It is empty"]]]),
    foodSafe2: T("Food safety rules", "🌡️", "Germs grow in food that stays out too long. These rules keep food safe.", "Keep cold food <b>cold</b> and hot food <b>hot</b>. Put leftovers in the fridge within <b>2 hours</b>. Check the <b>best-by date</b>. Wash hands after touching raw meat or eggs.", "Think: cold, clean, and quick to the fridge.", "Pizza left out all night should not be eaten.", [
      ["How soon should leftovers go in the fridge?", "Within 2 hours", ["After 2 days", "Never"]], ["Pizza has been out all night. Should you eat it?", "No", ["Yes", "Yes, if it smells good"]], ["Cold food should be kept…", "Cold", ["Hot", "In the sun"]],
      ["After touching raw eggs or meat, you…", "Wash your hands well", ["Lick your fingers", "Rub your eyes"]], ["What does the best-by date tell you?", "When it is best to eat it", ["Its favorite color", "Its price"]],
      ["Where should the milk go after you pour it?", "Back in the fridge", ["On the counter", "In the pantry"]], ["Raw meat should be kept…", "Away from other foods", ["Next to the salad", "On the table"]]]),
    cleanKitchen: T("A clean kitchen", "🧼", "A clean kitchen helps keep food safe and everyone healthy.", "Wipe <b>counters</b> with a clean cloth. Wash <b>dishes</b> with soap. Take out <b>trash</b>. Sweep the floor. <b>Wash hands</b> when done.", "Think: wipe, wash, sweep, and trash.", "After making a sandwich, you wipe the counter.", [
      ["Why keep a kitchen clean?", "To keep food safe", ["To hide food", "For no reason"]], ["How do you clean a counter?", "Wipe with a clean cloth", ["Pour juice on it", "Sit on it"]], ["What do you do with trash?", "Put it in the trash can", ["Leave it", "Hide it under the sink"]],
      ["Floors should be…", "Swept and dry", ["Sticky", "Covered with crumbs"]], ["Dishcloths should be…", "Washed often", ["Never washed", "Used to dry the floor"]], ["Who helps clean the kitchen?", "Everyone in the family", ["Nobody", "Only the dog"]],
      ["After cleaning, you…", "Wash your hands", ["Eat from the trash", "Dirty the sink"]]]),
    shopMath: shopMath3,
    recipeSeq: T("Putting steps in order", "🔢", "Some steps must come before others. We read the whole recipe so we know the order.", "You must <b>crack eggs before whisking</b>, <b>preheat the oven before baking</b>, <b>mix before baking</b>, and <b>cool before frosting</b>. A grown-up handles the oven.", "Think: which step needs to happen before the next one?", "You mix the batter before you pour it in the pan.", [
      ["What comes before whisking eggs?", "Cracking the eggs", ["Eating the cake", "Frosting"]], ["What comes before baking cookies?", "Mixing the dough", ["Eating the cookies", "Cleaning the oven"]], ["What comes before frosting a cake?", "Letting it cool", ["Cutting it", "Serving it hot"]],
      ["Who heats the oven first?", "A grown-up", ["A kid alone", "A toy"]], ["What comes after pouring batter in the pan?", "A grown-up bakes it", ["Frosting it", "Eating the batter"]], ["What comes at the very start?", "Washing hands and reading the recipe", ["Eating", "Cleaning"]],
      ["When is clean up?", "At the end", ["Before you start", "Never"]]]),
    kidJobs: S("Kid job or grown-up job?", "🧑‍🍳", "Kids can do lots of jobs in the kitchen. Some jobs are for grown-ups because they are hot or sharp.", "<b>Kid helper jobs</b>: wash veggies, tear lettuce, stir cold batter, mash a banana, sprinkle toppings. <b>Grown-up jobs</b>: use the stove, oven, knives and blender.", "Ask: is it hot, sharp, or electric? Then it's a grown-up job.", "Tearing lettuce is safe for kids. Using the oven is a grown-up job.", {
      "Kid helper job": ["washing veggies", "tearing lettuce", "stirring cold batter", "mashing a banana", "sprinkling toppings", "setting the table"],
      "Grown-up job": ["using the stove", "using the oven", "using a sharp knife", "using the blender", "frying food", "lifting a hot pot"] }, n => `Is <b>${n}</b> a kid helper job or a grown-up job?`),
    sewButton: T("Sewing a button", "🔘", "Sewing on a button is a useful skill, and a grown-up helps.", "<b>1.</b> Thread the needle. <b>2.</b> Tie a knot. <b>3.</b> Push the needle up and down through the button holes. <b>4.</b> Tie off. <b>5.</b> Snip the extra thread (grown-up).", "Think about steps in order, and ask a grown-up for the needle and scissors.", "You thread the needle first, and then you sew the holes of the button.", [
      ["What is the first step in sewing on a button?", "Thread the needle", ["Tie it off", "Cut the cloth"]], ["What do you do after threading?", "Tie a knot", ["Cut the thread", "Eat dinner"]], ["What goes through the holes of the button?", "Needle and thread", ["A spoon", "A plate"]],
      ["What is the last step?", "Tie off and snip the extra thread", ["Thread the needle", "Tie the first knot"]], ["Who helps with the needle?", "A grown-up", ["Nobody", "A toddler"]], ["What holds the button on?", "Thread", ["Glue stick only", "Paper"]],
      ["Why sew on a button?", "To fix or fasten clothes", ["To make noise", "To lose it"]]]),
    choreTime: choreTime,
    balancedMeal: T("A balanced meal", "🍱", "A balanced meal has foods from different groups. It helps us feel strong and full.", "Make <b>half your plate</b> fruits and veggies. Add <b>grains</b>, <b>protein</b> and <b>dairy</b>. Drink water or milk.", "Count the food groups on the plate. More groups is more balanced.", "Chicken, rice, carrots and milk cover many food groups.", [
      ["Which meal is more balanced?", "Chicken, rice, carrots and milk", ["Only cake", "Only french fries"]], ["A plate has only pasta. What could you add?", "Veggies and protein", ["More pasta", "Candy"]], ["Half of a balanced plate should be…", "Fruits and vegetables", ["Cookies", "Soda"]],
      ["Which drink fits a balanced meal?", "Milk or water", ["Soda", "Sugary punch"]], ["Which has more food groups?", "A sandwich with cheese, lettuce and an apple", ["Plain white bread", "A candy bar"]], ["Why eat many groups?", "Each gives different gifts to our body", ["They all taste the same", "For no reason"]],
      ["You don't like carrots. What can you do?", "Try a bite or another veggie", ["Never eat veggies", "Only eat sweets"]]]),
    fridge3: S("Fridge, freezer or pantry?", "🏠", "Foods have different homes. Where they go keeps them fresh.", "<b>Fridge</b>: milk, eggs, cheese. <b>Freezer</b>: ice cream, frozen peas, frozen pizza. <b>Pantry</b>: cereal, pasta, rice, canned soup.", "Ask: does it need to stay cold, frozen, or is it dry or canned?", "Ice cream melts, so it goes in the freezer.", {
      "Fridge": ["🥛|milk", "🧀|cheese", "🥚|eggs", "🥬|lettuce", "yogurt"],
      "Freezer": ["🍦|ice cream", "frozen peas", "🍕|frozen pizza", "🧊|ice cubes", "frozen berries"],
      "Pantry": ["🥣|cereal", "🍝|dry pasta", "🍚|rice", "canned soup", "crackers"] }, n => `Where does <b>${n}</b> go: fridge, freezer or pantry?`),
    helperReview: T("Kitchen helper rules", "⭐", "You have learned lots of kitchen rules. Let us review the most important ones.", "<b>Ask</b> a grown-up. <b>Wash</b> hands. <b>Hot and sharp</b> things are for grown-ups. <b>Follow</b> the recipe. <b>Clean</b> up. Be kind and take turns.", "Choose the safest, kindest answer.", "Before cooking, you wash your hands and ask a grown-up.", [
      ["What is the first rule of the kitchen?", "Ask a grown-up and wash your hands", ["Run around", "Touch everything"]], ["Who uses sharp knives and the oven?", "Grown-ups", ["Kids alone", "Pets"]], ["What do you do before you start?", "Read the recipe", ["Skip it", "Hide it"]],
      ["How do you leave the kitchen?", "Clean", ["Messy", "On fire"]], ["How do you act with friends in the kitchen?", "Kind and fair", ["Pushy", "Loud and rude"]], ["If you are unsure, you…", "Ask a grown-up", ["Guess", "Run"]],
      ["Who cooks safely?", "Helpers who follow the rules", ["Anyone who rushes", "No one"]]])
  });

  const L = (title, make) => ({ title, make });
  return {
    1: [
      L("Ask a grown-up first", C.askFirst), L("Hot things", C.hot), L("Sharp things", C.sharp), L("Wash hands to cook", C.washFirst),
      L("Kitchen tools", C.tools), L("What do tools do?", C.toolJobs), L("Which food group?", C.groupsK), L("Healthy snack or treat?", C.snacks1),
      L("Setting the table", C.table1), L("Chores that help", C.chores), L("Cleaning up", C.cleanUp), L("Light or dark laundry?", C.laundry1),
      L("Counting scoops", C.scoops1), L("Cups and spoons", C.spoonCup), L("Fridge or pantry?", C.fridge1), L("Cooking words", C.cookWords),
      L("Tidy my room", C.tidyRoom), L("Helping at home", C.helping),
      L("Mixed practice", MIX(C.askFirst, C.tools, C.snacks1, C.cleanUp)), L("Level 1 Challenge", MIX(C.hot, C.sharp, C.groupsK, C.scoops1, C.fridge1, C.cookWords))
    ],
    2: [
      L("Measuring with cups", C.cups), L("Teaspoons and tablespoons", C.spoons), L("Setting the table (math)", C.scoops2), L("Recipe order", C.recipeOrder),
      L("Reading a recipe", C.recipeParts), L("Food groups", C.groups2), L("Making a healthy snack", C.snacks2), L("Oven and stove safety", C.oven),
      L("More cooking words", C.cookWords2), L("Washing dishes", C.dishes), L("Where does it go?", C.laundry2), L("Laundry steps", C.laundrySteps),
      L("Sewing words", C.sewWords), L("Sewing safely", C.sewSafe), L("Shopping lists", C.shopList), L("Keeping food safe", C.foodSafe),
      L("Half of it", C.halves), L("Cooking with friends", C.friendsCook),
      L("Mixed practice", MIX(C.cups, C.recipeOrder, C.groups2, C.foodSafe)), L("Level 2 Challenge", MIX(C.spoons, C.oven, C.cookWords2, C.halves, C.sewSafe, C.scoops2))
    ],
    3: [
      L("Half cups", C.halfCup), L("Quarter cups", C.quarterCup), L("Double the recipe", C.double), L("Half the recipe", C.halfRecipe),
      L("Dry or liquid measuring", C.dryLiquid), L("Reading food labels", C.labelRead), L("Comparing labels", C.labelCompare), L("Food allergies", C.allergy),
      L("Food safety rules", C.foodSafe2), L("A clean kitchen", C.cleanKitchen), L("Shopping list math", C.shopMath), L("Putting steps in order", C.recipeSeq),
      L("Kid job or grown-up job?", C.kidJobs), L("Sewing a button", C.sewButton), L("Chore time", C.choreTime), L("A balanced meal", C.balancedMeal),
      L("Fridge, freezer or pantry?", C.fridge3), L("Kitchen helper rules", C.helperReview),
      L("Mixed practice", MIX(C.halfCup, C.labelRead, C.foodSafe2, C.kidJobs)), L("Level 3 Challenge", MIX(C.quarterCup, C.double, C.halfRecipe, C.labelCompare, C.shopMath, C.allergy))
    ]
  };
})();
