// Mind Lab Money Skills. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
// Needs math.js and spelling.js loaded first (uses ri, pick, shuf).

// ---------- coins and bills (drawn with CSS, no outside pictures) ----------
const COINS = {
  penny:   { v: 1,  size: 52, bg: "#c77b45" },
  nickel:  { v: 5,  size: 58, bg: "#cfd3d9" },
  dime:    { v: 10, size: 46, bg: "#e8ebef" },
  quarter: { v: 25, size: 66, bg: "#d4d8de" }
};
const KINDS = ["penny", "nickel", "dime", "quarter"];
const chip = k => `<span class="coin" style="width:${COINS[k].size}px;height:${COINS[k].size}px;background:${COINS[k].bg}">${k}</span>`;
const chips = (k, n) => Array.from({ length: n }, () => chip(k)).join("");
const bill = d => `<span class="bill b${d}">$${d}</span>`;
const bills = (d, n) => Array.from({ length: n }, () => bill(d)).join("");
const cents = n => n + "¢";
const plural = (k, n) => (n === 1 ? k : k === "penny" ? "pennies" : k + "s");
const describe = counts => KINDS.slice().reverse().filter(k => counts[k]).map(k => `${counts[k]} ${plural(k, counts[k])}`).join(" and ");
const worth = counts => KINDS.reduce((s, k) => s + (counts[k] || 0) * COINS[k].v, 0);

const NAMES_M = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
const SHOP = [["🍎", "apple"], ["🍪", "cookie"], ["🎈", "balloon"], ["🖍️", "crayon"], ["🍬", "candy"], ["🧃", "juice"], ["📏", "ruler"], ["🧸", "teddy"]];
const SHOP_BIG = [["📖", "book"], ["🧢", "cap"], ["🎒", "backpack"], ["⚽", "ball"], ["🎨", "paint set"], ["🧩", "puzzle"], ["🪁", "kite"], ["👕", "shirt"]];
const NEEDS = [["water", "💧"], ["food", "🍲"], ["shoes", "👟"], ["a warm coat", "🧥"], ["a home", "🏠"], ["medicine when you're sick", "💊"], ["soap", "🧼"]];
const WANTS = [["a toy", "🧸"], ["candy", "🍬"], ["a video game", "🎮"], ["ice cream", "🍦"], ["a balloon", "🎈"], ["sparkly stickers", "✨"], ["a fancy hat", "🎩"]];

// ---------- multiple-choice banks (earning, saving, banks, safety...) ----------
const MCQ = {
  earn: {
    name: "Earning money",
    gen: () => {
      const rights = ["Washing cars for neighbors", "Running a lemonade stand", "Doing extra jobs for pay", "Walking a neighbor's dog", "Selling crafts you made"];
      const wrongs = ["Watching TV", "Eating lunch", "Playing a game", "Sleeping in", "Brushing your teeth"];
      return { q: "Which one is a way a kid can EARN money?", a: pick(rights), w: shuf(wrongs).slice(0, 2) };
    },
    hints: ["Earning means getting money for work you do.", "Ask: would someone pay me for doing this? Or is it just something I do for fun or because I have to?", "Example: mowing a neighbor's lawn earns money. Watching TV doesn't."]
  },
  saveSpend: {
    name: "Saving and spending",
    items: [
      { q: "Which one is SAVING money?", a: "Putting coins in a piggy bank", w: ["Buying candy right away", "Spending it all at the store"] },
      { q: "Which one is SPENDING money?", a: "Buying a toy at the store", w: ["Putting coins in a piggy bank", "Keeping money in a jar"] },
      { q: "Why do people save money?", a: "To buy something big later", w: ["So the money disappears", "Because coins are heavy"] },
      { q: "Which one is SAVING money?", a: "Keeping your birthday money for a bike", w: ["Buying a snack with it", "Spending it at a game"] },
      { q: "Which one is SPENDING money?", a: "Paying for lunch", w: ["Keeping it under your bed", "Putting it in a savings jar"] },
      { q: "What does it mean to save money?", a: "To keep it for later", w: ["To spend it right now", "To lose it"] }
    ],
    hints: ["Saving means keeping money for later. Spending means using money to buy something now.", "Read each choice and ask: is the money being kept, or is it being used up?", "Example: putting $1 in a piggy bank is saving. Buying a snack with that $1 is spending."]
  },
  smartChoice: {
    name: "Smart choices",
    items: [
      { q: "You want a toy that costs 50¢ but you only have 20¢. What is a smart plan?", a: "Save more money until you have enough", w: ["Take it without paying", "Spend your 20¢ on something else"] },
      { q: "You find a coin on the floor at school. What should you do?", a: "Give it to a teacher or ask whose it is", w: ["Hide it and tell no one", "Throw it away"] },
      { q: "A friend lends you 5¢. What should you do?", a: "Pay your friend back", w: ["Hide from your friend", "Say it was a gift"] },
      { q: "You get 10¢ for your birthday. Which is a good choice?", a: "Save some and spend some", w: ["Lose it on purpose", "Spend it all in one second without thinking"] },
      { q: "You want two things but can only afford one. What is smart?", a: "Pick the one you want the most", w: ["Take both without paying", "Pick the one that costs the most"] },
      { q: "A cashier gives you too much change by mistake. What should you do?", a: "Tell the cashier so it can be fixed", w: ["Keep it quietly", "Run out of the store"] },
      { q: "Before you buy something, what is a good question to ask yourself?", a: "Do I really need or want this?", w: ["Is it the shiniest thing?", "Does everyone else have it?"] }
    ],
    hints: ["Smart money choices are safe, fair and honest.", "Ask: is it fair to other people? Is it honest? Does it help me reach my goal?", "Example: if you want something that costs more than you have, the smart plan is to save until you have enough."]
  },
  bank: {
    name: "Banks",
    items: [
      { q: "Where is the safest place to keep lots of money?", a: "In a bank", w: ["Under a park bench", "In your backpack at school"] },
      { q: "What does a bank do?", a: "Keeps money safe and helps you save it", w: ["Gives out free toys", "Sells candy"] },
      { q: "What is interest?", a: "Extra money a bank may add to your savings", w: ["A kind of toy", "A kind of coin"] },
      { q: "What is a savings account?", a: "A place at the bank to keep money you're saving", w: ["A game you play", "A piggy bank made of paper"] },
      { q: "Who can help you open a bank account when you're a kid?", a: "A parent or guardian", w: ["A stranger on the internet", "Nobody can"] },
      { q: "What is a deposit?", a: "Putting money into your bank account", w: ["Taking all your money out", "Losing your money"] },
      { q: "What is a withdrawal?", a: "Taking money out of your bank account", w: ["Putting money in", "Giving money to a stranger"] }
    ],
    hints: ["A bank is a safe place where people keep their money.", "Think about which choice keeps money safe and helps it grow.", "Example: a bank keeps your money safe, so it's a better place than a pocket you might lose."]
  },
  giving: {
    name: "Giving and sharing",
    items: [
      { q: "What does donating mean?", a: "Giving money or things to help others", w: ["Spending it all on yourself", "Hiding it"] },
      { q: "Which is a kind way to use money?", a: "Buying a gift for someone you care about", w: ["Keeping all of it forever", "Throwing it away"] },
      { q: "A class is collecting food for families in need. How can you help?", a: "Bring a can of food to donate", w: ["Ask for candy", "Do nothing"] },
      { q: "Why do some people give money to charities?", a: "To help people or animals who need it", w: ["To get more candy", "Because they have to"] },
      { q: "Which is a way to give without spending money?", a: "Helping a neighbor carry their groceries", w: ["Keeping all your time to yourself", "Hiding your toys"] },
      { q: "Your friend forgot their snack. What is a kind thing to do?", a: "Share some of yours", w: ["Eat yours in front of them", "Hide your snack"] },
      { q: "What is a charity?", a: "A group that helps people or animals in need", w: ["A kind of store", "A kind of coin"] }
    ],
    hints: ["Giving means using some of your money or things to help others.", "Ask: which choice helps someone else?", "Example: giving some of your allowance to help an animal shelter is a kind way to use money."]
  },
  safety: {
    name: "Keeping money safe",
    items: [
      { q: "Someone online asks for your parent's credit card number. What should you do?", a: "Don't share it and tell a parent right away", w: ["Type it in so you can win", "Share it with a friend"] },
      { q: "A website says \"Type your password to get free coins!\" What should you do?", a: "Don't type it. Tell a parent.", w: ["Type it quickly", "Share it with friends"] },
      { q: "Who should know your bank PIN or password?", a: "Only you and your parents", w: ["Your whole class", "Anyone who asks"] },
      { q: "A stranger online offers you money if you keep a secret. What do you do?", a: "Stop replying and tell a parent", w: ["Keep the secret", "Ask for more money"] },
      { q: "You get a message saying you won a prize, but you must pay first. What is this?", a: "Probably a trick. Tell a parent.", w: ["A real prize", "A gift from a friend"] },
      { q: "A pop-up in a game says \"Click here to get free money!\" What should you do?", a: "Don't click. Ask a parent.", w: ["Click it fast", "Send it to your friends"] },
      { q: "Someone you don't know asks you to send them money online. What should you do?", a: "Say no and tell a parent", w: ["Send a little to be nice", "Send them your savings"] }
    ],
    hints: ["Your money and your accounts are private and need to be kept safe.", "Never share card numbers, PINs or passwords with strangers or online. Ask a parent!", "Example: if someone you don't know asks for private information, stop and tell a parent right away."]
  }
};

// ---------- combos for \"which coins make...\" ----------
function allCombos(maxCoins = 8, maxSum = 40) {
  const out = [];
  for (let q = 0; q <= 1; q++) for (let d = 0; d <= 5; d++) for (let n = 0; n <= 6; n++) for (let p = 0; p <= 10; p++) {
    const c = { quarter: q, dime: d, nickel: n, penny: p };
    const coins = q + d + n + p, s = worth(c);
    if (coins >= 1 && coins <= maxCoins && s <= maxSum) out.push({ c, s });
  }
  return out;
}
const COMBOS = allCombos();

// ---------- question makers ----------
const MM = {
  coinValue(kinds) {
    return () => {
      const k = pick(kinds), v = COINS[k].v;
      const clue = { penny: "A penny is the coin worth the least.", nickel: "A nickel is worth more than a penny, but less than a dime.", dime: "A dime is worth more than a nickel, but less than a quarter.", quarter: "A quarter is worth the most of these four coins." }[k];
      const ex = k === "nickel" ? ["dime", "10¢", "ten pennies make a dime"] : ["nickel", "5¢", "five pennies make a nickel"];
      const allV = shuf(KINDS.map(x => cents(COINS[x].v)).filter(x => x !== cents(v))).slice(0, 2);
      return {
        text: `How much is a ${k} worth?`, visual: chip(k), choices: shuf([cents(v), ...allV]), answer: cents(v),
        hints: ["Look at the coin and read its name. Each coin has its own worth.", clue + " Size doesn't tell you the worth!", `Example: a ${ex[0]} is worth ${ex[1]}. ${ex[2][0].toUpperCase() + ex[2].slice(1)}. Now think about your coin.`]
      };
    };
  },
  coinName(kinds) {
    return () => {
      const k = pick(kinds), v = COINS[k].v, ex = k === "penny" ? ["5¢", "nickel"] : ["1¢", "penny"];
      return {
        text: `Which coin is worth ${cents(v)}?`, choices: shuf([k, ...shuf(KINDS.filter(x => x !== k)).slice(0, 2)]), answer: k,
        hints: ["Think about the four coins: penny, nickel, dime and quarter. Which one has this worth?", "From least to most worth the coins go: penny, nickel, dime, quarter.", `Example: the coin worth ${ex[0]} is the ${ex[1]}. Now find the one worth ${cents(v)}.`]
      };
    };
  },
  countCoins(kind, maxN) {
    return () => {
      const n = ri(kind === "quarter" ? 1 : 2, maxN), v = COINS[kind].v, ex = kind === "dime" ? ["nickel", 5, 3] : ["dime", 10, 3];
      if (n > 1 && Math.random() < 0.4) {
        // Backwards question: how many coins make this many cents?
        return {
          text: `${cents(n * v)} is made with ${kind === "penny" ? "pennies" : kind + "s"}. How many ${kind === "penny" ? "pennies" : kind + "s"} is that?`, answer: n,
          hints: [`Each ${kind} is worth the same amount. What is one ${kind} worth?`, `Count by ${v}s until you reach ${n * v}. How many counts did it take?`, `Example: 30¢ made with dimes. Count by 10s: 10, 20, 30. That took 3 counts, so 3 dimes. Now do yours.`]
        };
      }
      return {
        text: "How many cents is this altogether?", visual: chips(kind, n), answer: n * v,
        wrong: g => (g === n ? "That's how many coins there are. We want how many cents they are worth." : null),
        hints: ["All of these coins are the same, so each one is worth the same amount. What is one worth?", `Skip count by ${v}s, one count for each coin. There are ${n} coins.`, `Example: 3 ${plural(ex[0], 3)}. Count by ${ex[1]}s: ${ex[1]}, ${ex[1] * 2}, ${ex[1] * 3}. That's ${cents(ex[1] * 3)}. Now do yours.`]
      };
    };
  },
  countMix(kinds, maxTotal) {
    return () => {
      let c, tries = 0;
      do {
        c = {}; kinds.forEach(k => { c[k] = ri(0, k === "quarter" ? 3 : k === "dime" ? 4 : k === "nickel" ? 4 : 5); });
        tries++;
      } while ((worth(c) > maxTotal || worth(c) < 6 || kinds.reduce((s, k) => s + (c[k] || 0), 0) < 2) && tries < 200);
      const order = kinds.slice().sort((a, b) => COINS[b].v - COINS[a].v);
      return {
        text: "How many cents is this altogether?", visual: order.map(k => chips(k, c[k] || 0)).join(""), answer: worth(c),
        hints: ["Start with the coin worth the most. Count those first.", "Then count on with the smaller coins. Skip count the big ones, then add the smaller ones.", "Example: a dime, a nickel and a penny. Start with 10, then count on 5: 15. Then 1 more: 16. That's 16¢. Now do yours."]
      };
    };
  },
  coinCompare() {
    return () => {
      const [a, b] = shuf(KINDS).slice(0, 2), ans = COINS[a].v > COINS[b].v ? a : b;
      return {
        text: "Which coin is worth MORE?", visual: chip(a) + chip(b), choices: [a, b], answer: ans,
        hints: ["Don't pick the biggest coin! Think about what each coin is worth.", "From least to most worth the coins go: penny, nickel, dime, quarter. Which one comes later?", "Example: a dime is worth more than a nickel, even though the dime is smaller. Now try yours."]
      };
    };
  },
  coinSwap() {
    // [small coins, what they make, how many, picture]
    const facts = [["pennies", "a nickel", 5, chip("nickel")], ["pennies", "a dime", 10, chip("dime")], ["nickels", "a dime", 2, chip("dime")], ["nickels", "a quarter", 5, chip("quarter")],
      ["nickels", "15¢", 3, ""], ["nickels", "20¢", 4, ""], ["nickels", "30¢", 6, ""], ["dimes", "30¢", 3, ""], ["dimes", "40¢", 4, ""], ["dimes", "50¢", 5, ""], ["pennies", "a quarter", 25, chip("quarter")]];
    return () => {
      const [what, big, n, v] = pick(facts);
      const one = what === "pennies" ? "penny" : what.slice(0, -1);
      return {
        text: `How many ${what} make ${big}?`, visual: v || undefined, answer: n,
        hints: ["Trading coins means swapping them for other coins that have the same worth.", `Think about what ${big} is worth and what one ${one} is worth. How many of the small ones make that much?`, "Example: a dime is worth 10¢, and a penny is worth 1¢. So it takes 10 pennies to make a dime."]
      };
    };
  },
  needWant() {
    return () => {
      const isNeed = Math.random() < 0.5, [name, e] = pick(isNeed ? NEEDS : WANTS);
      return {
        text: `Is ${name} a need or a want?`, visual: e, choices: ["Need", "Want"], answer: isNeed ? "Need" : "Want",
        hints: ["A need is something you must have to live and stay healthy. A want is something fun that you'd like to have.", "Ask: could I stay safe and healthy without it?", "Example: water is a need (you can't live without it). A toy is a want (fun, but you could live without it)."]
      };
    };
  },
  mcq(key) {
    const cfg = MCQ[key];
    return () => {
      const it = cfg.gen ? cfg.gen() : pick(cfg.items);
      return { text: it.q, choices: shuf([it.a, ...it.w]), answer: it.a, hints: cfg.hints };
    };
  },
  change(max) {
    return () => {
      const have = ri(5, max), spend = ri(1, have - 1), exH = have === 9 ? 8 : 9;
      return {
        text: `You have ${cents(have)}. You spend ${cents(spend)}. How many cents are left?`, answer: have - spend,
        hints: ["Spending means giving money away, so you'll have less than you started with.", `Take away. Start at ${have} and count back ${spend}.`, `Example: you have ${cents(exH)} and spend 4¢. ${exH} − 4 = ${exH - 4}¢ left. Now do yours.`]
      };
    };
  },
  wordSpend(max) {
    return () => {
      const have = ri(6, max), cost = ri(1, have - 1), n = pick(NAMES_M), [e, item] = pick(SHOP);
      return {
        text: `${n} has ${cents(have)} and buys a ${item} ${e} for ${cents(cost)}. How many cents does ${n} have left?`, answer: have - cost,
        hints: [`Is ${n} getting more money or spending some?`, "When money is spent, you take away. Write the number sentence first.", "Example: Zoe has 9¢ and buys a cookie for 4¢. 9 − 4 = 5¢ left. Now write yours."]
      };
    };
  },
  wordEarn(max) {
    return () => {
      const a = ri(1, max - 1), b = ri(1, max - a), n = pick(NAMES_M);
      return {
        text: `${n} has ${cents(a)}. ${n} earns ${cents(b)} more by doing a chore. How many cents does ${n} have now?`, answer: a + b,
        hints: [`Is ${n} getting more money or spending some?`, "When you earn money you get more, so add. Write the number sentence first.", "Example: Sam has 6¢ and earns 3¢ more. 6 + 3 = 9¢. Now write yours."]
      };
    };
  },
  canBuy(max) {
    return () => {
      const have = ri(2, max), cost = ri(2, max), yes = have >= cost;
      return {
        text: `You have ${cents(have)}. A sticker costs ${cents(cost)}. Can you buy it?`, choices: ["Yes", "No"], answer: yes ? "Yes" : "No",
        hints: ["You can buy it if you have at least as much money as the price.", "Compare the two numbers. Do you have more than the price, or less?", "Example: you have 8¢ and a toy costs 5¢. 8 is more than 5, so yes. You have 3¢ and a toy costs 7¢. 3 is less than 7, so no."]
      };
    };
  },
  cheapest() {
    return () => {
      const items = shuf(SHOP).slice(0, 3), prices = shuf(Array.from({ length: 25 }, (_, i) => i + 2)).slice(0, 3), least = Math.random() < 0.6;
      const pairs = items.map((it, i) => ({ e: it[0], name: it[1], p: prices[i] }));
      const best = pairs.slice().sort((a, b) => (least ? a.p - b.p : b.p - a.p))[0];
      return {
        text: `Which one costs the ${least ? "LEAST" : "MOST"}?`, visual: pairs.map(x => `${x.e} ${cents(x.p)}`).join(" &nbsp; "), choices: shuf(pairs.map(x => x.name)), answer: best.name,
        hints: [`Look at the prices (the numbers with ¢). "${least ? "Least" : "Most"}" means the ${least ? "smallest" : "biggest"} number.`, `Compare the prices. Which number is the ${least ? "smallest" : "biggest"}?`, `Example: 5¢, 9¢ and 2¢. The ${least ? "least is 2¢" : "most is 9¢"}, because ${least ? "2 is the smallest" : "9 is the biggest"} number.`]
      };
    };
  },
  goal(max) {
    return () => {
      const goal = ri(8, max), have = ri(1, goal - 1);
      return {
        text: `You want to save ${cents(goal)}. You have ${cents(have)}. How many more cents do you need?`, answer: goal - have,
        hints: ["Find how far you are from your goal.", `Count up from ${have} to ${goal}. How many jumps is that?`, "Example: goal 10¢, you have 7¢. Count up: 8, 9, 10. That's 3 more. Now do yours."]
      };
    };
  },
  comboMake(target) {
    return () => {
      const good = COMBOS.filter(x => x.s === target && Object.values(x.c).reduce((a, b) => a + b, 0) <= 6);
      const bad = COMBOS.filter(x => x.s !== target && Math.abs(x.s - target) <= 15 && Object.values(x.c).reduce((a, b) => a + b, 0) <= 6);
      const right = pick(good), wrongs = shuf(bad).filter((x, i, arr) => arr.findIndex(y => describe(y.c) === describe(x.c)) === i).slice(0, 2);
      return {
        text: `Which coins make ${cents(target)}?`, choices: shuf([describe(right.c), ...wrongs.map(x => describe(x.c))]), answer: describe(right.c),
        hints: ["Add up the worth of the coins in each choice. The right one adds up to the amount in the question.", "Start with the biggest coin in the choice and count on with the others.", "Example: 1 nickel and 2 pennies: 5, then 6, 7. That's 7¢, so it would make 7¢ (and not 6¢). Check each choice like this."]
      };
    };
  },
  billFacts() {
    const facts = [["$1 bills make a $5 bill", 5, bill(5)], ["$5 bills make a $10 bill", 2, bill(10)], ["$1 bills make a $10 bill", 10, bill(10)],
      ["$5 bills make a $20 bill", 4, bill(20)], ["$10 bills make a $20 bill", 2, bill(20)], ["$1 bills make a $20 bill", 20, bill(20)]];
    return () => {
      const [t, n, v] = pick(facts);
      return {
        text: `How many ${t}?`, visual: v, answer: n,
        hints: ["Think about what each bill is worth. The number on the bill tells you!", "Skip count by the smaller bill until you reach the bigger bill's amount. How many counts?", "Example: $2 bills would be 2, 4, 6. Three $2 bills make $6. Count your bills the same way."]
      };
    };
  },
  countBills(kinds) {
    return () => {
      const c = {}; kinds.forEach(k => { c[k] = ri(k === 1 ? 0 : 1, k === 10 ? 2 : 4); });
      const total = kinds.reduce((s, k) => s + k * c[k], 0);
      const order = kinds.slice().sort((a, b) => b - a);
      return {
        text: "How many dollars is this altogether?", visual: order.map(k => bills(k, c[k])).join(" "), answer: total,
        hints: ["Each bill says how many dollars it's worth. Start with the biggest bills.", "Count the biggest bills first (skip count), then count on with the smaller ones.", "Example: a $5 bill and two $1 bills. Start at 5, then 6, 7. That's $7. Now do yours."]
      };
    };
  },
  dollarsAdd(max) {
    return () => {
      const a = ri(1, max - 1), b = ri(1, max - a), [e1, n1] = pick(SHOP_BIG), [e2, n2] = pick(SHOP_BIG.filter(x => x[1] !== n1));
      return {
        text: `A ${n1} ${e1} costs $${a} and a ${n2} ${e2} costs $${b}. How many dollars for both?`, answer: a + b,
        hints: ["Buying both means putting the two prices together.", "Add the two prices. Start at the bigger one and count up.", "Example: a book costs $4 and a pen costs $3. 4 + 3 = $7. Now do yours."]
      };
    };
  },
  dollarsSub(max) {
    return () => {
      const have = ri(3, max), cost = ri(1, have - 1), [e, n] = pick(SHOP_BIG);
      return {
        text: `You have $${have}. You buy a ${n} ${e} for $${cost}. How many dollars do you have left?`, answer: have - cost,
        hints: ["Spending means you'll have less.", `Take away. Start at ${have} and count back ${cost}.`, "Example: you have $9 and spend $4. 9 − 4 = $5 left. Now do yours."]
      };
    };
  },
  makeChange(from) {
    return () => {
      const cost = ri(1, from - 1), [e, n] = pick(SHOP_BIG);
      return {
        text: `You pay with a $${from} bill for a ${n} ${e} that costs $${cost}. How much change do you get back?`, visual: bill(from), answer: from - cost,
        hints: ["Change is the extra money the store gives back when you pay with more than the price.", `Count up from the price, $${cost}, to the bill you paid with, $${from}. How many dollars is that?`, "Example: you pay $10 for something that costs $7. Count up: 8, 9, 10. That's $3 change. Now do yours."]
      };
    };
  },
  priceCompare() {
    return () => {
      const [a, b] = shuf(SHOP_BIG).slice(0, 2), pa = ri(1, 20); let pb = ri(1, 20);
      while (pb === pa) pb = ri(1, 20);
      const more = Math.random() < 0.5, ans = (pa > pb) === more ? a[1] : b[1];
      return {
        text: `Which one costs ${more ? "MORE" : "LESS"}?`, visual: `${a[0]} $${pa} &nbsp; ${b[0]} $${pb}`, choices: shuf([a[1], b[1]]), answer: ans,
        hints: [`Look at the two prices. "${more ? "More" : "Less"}" tells you which number to pick.`, `Compare the numbers. Which is ${more ? "bigger" : "smaller"}?`, `Example: $6 and $4. $6 costs more, and $4 costs less. Now try yours.`]
      };
    };
  },
  canBuyBoth() {
    return () => {
      const have = ri(8, 20), a = ri(2, 12), b = ri(2, 12), yes = a + b <= have, [e1, n1] = pick(SHOP_BIG), [e2, n2] = pick(SHOP_BIG.filter(x => x[1] !== n1));
      return {
        text: `You have $${have}. A ${n1} ${e1} costs $${a} and a ${n2} ${e2} costs $${b}. Can you buy both?`, choices: ["Yes", "No"], answer: yes ? "Yes" : "No",
        hints: ["To buy both, first add the two prices together.", "Then compare that total with the money you have. Is the total more than your money?", "Example: you have $10. Prices are $6 and $5. 6 + 5 = 11. 11 is more than 10, so no."]
      };
    };
  },
  dollarFacts(kinds) {
    return () => {
      const opts = [
        ["How many cents are in 1 dollar?", 100, "cents"], ["How many cents are in half a dollar?", 50, "cents"],
        ["How many quarters make $1?", 4, "quarters"], ["How many quarters make 50¢?", 2, "quarters"],
        ["How many cents are 3 quarters?", 75, "quarters"], ["How many cents are 2 quarters?", 50, "quarters"],
        ["How many dimes make $1?", 10, "dimes"], ["How many dimes make 50¢?", 5, "dimes"],
        ["How many nickels make $1?", 20, "nickels"], ["How many nickels make 50¢?", 10, "nickels"], ["How many nickels make 25¢?", 5, "nickels"]
      ].filter(o => kinds.includes(o[2]));
      const [t, n] = pick(opts);
      return {
        text: t, visual: bill(1), answer: n,
        hints: ["A dollar is worth 100 cents.", "Think about what that coin is worth. How many of them add up to 100¢?", "Example: two coins worth 50¢ each make 100¢, so 2 of them make a dollar. Now try yours."]
      };
    };
  },
  repeatMoney(kind) {
    return () => {
      const per = ri(1, 5), n = ri(2, 5), name = pick(NAMES_M);
      return {
        text: kind === "save" ? `${name} saves $${per} every week for ${n} weeks. How many dollars does ${name} have?` : `${name} earns $${per} for each job. ${name} does ${n} jobs. How many dollars does ${name} earn?`,
        answer: per * n,
        hints: [kind === "save" ? "Saving the same amount again and again means adding it each time." : "Earning the same amount again and again means adding it each time.", `Skip count by ${per}s, ${n} times.`, "Example: $2 each week for 3 weeks: 2, 4, 6. That's $6. Now do yours."]
      };
    };
  },
  mixed(...makers) { return () => pick(makers)(); }
};

// ---------- teaching slides ----------
const COIN_ROW = KINDS.map(chip).join("");
const MTEACH = {
  coinValue: () => [
    { h: "Meet the coins", v: COIN_ROW, t: "In the US we have four coins: the <b>penny</b>, <b>nickel</b>, <b>dime</b> and <b>quarter</b>. Each one is worth a different amount of money." },
    { h: "What each one is worth", v: "penny 1¢ · nickel 5¢ · dime 10¢ · quarter 25¢", t: "The <b>¢</b> sign means <b>cents</b>. A penny is 1¢. A nickel is 5¢. A dime is 10¢. A quarter is 25¢." },
    { h: "Size can trick you!", v: chip("dime") + chip("nickel"), t: "The dime is <b>smaller</b> than the nickel, but it's worth <b>more</b> (10¢ vs 5¢). Don't use size. Remember each coin's name and worth." }
  ],
  coinName: () => MTEACH.coinValue(),
  countCoins: kind => [
    { h: "Counting the same coin", v: chips(kind, 3), t: "When the coins are all the same, they're all worth the same. You can <b>skip count</b> by that worth." },
    { h: "Skip count to find the total", v: "3 dimes: 10, 20, 30 → 30¢", t: "Count by the coin's worth once for each coin. 3 dimes means you count by 10s three times: 10, 20, <b>30¢</b>." },
    { h: "Tip", v: "💡", t: "Touch each coin as you say the next number. Count by " + COINS[kind].v + "s. The last number you say is the total in cents." }
  ],
  countMix: () => [
    { h: "Different coins", v: chip("dime") + chip("nickel") + chip("penny"), t: "When the coins are different, count the coin worth the <b>most</b> first, then the next one, and so on." },
    { h: "Count on", v: "10 → 15 → 16", t: "A dime is 10¢. Add the nickel: count on 5 → 15¢. Add the penny: count on 1 → <b>16¢</b>." },
    { h: "Tip", v: "💡", t: "Biggest coins first, smallest coins last. It's much easier than going in any order!" }
  ],
  coinCompare: () => [
    { h: "Worth, not size", v: chip("quarter") + chip("dime"), t: "To find the coin worth more, think about the <b>worth</b> of each, not how big it is." },
    { h: "Order the coins", v: "penny → nickel → dime → quarter", t: "From least to most: <b>penny</b> (1¢), <b>nickel</b> (5¢), <b>dime</b> (10¢), <b>quarter</b> (25¢). The one further right is worth more." },
    { h: "Remember", v: "💡", t: "A dime is smaller than a nickel but worth more. Always check the worth!" }
  ],
  coinSwap: () => [
    { h: "Trading coins", v: chip("nickel") + " = " + chips("penny", 5), t: "A <b>nickel</b> is worth 5¢, the same as <b>5 pennies</b>. You can trade them and have the same amount of money." },
    { h: "More trades", v: chip("dime") + " = " + chips("nickel", 2), t: "A <b>dime</b> is worth 10¢. That's the same as <b>2 nickels</b> or <b>10 pennies</b>." },
    { h: "The quarter", v: chip("quarter") + " = " + chips("nickel", 5), t: "A <b>quarter</b> is worth 25¢. That's the same as <b>5 nickels</b>, or 2 dimes and a nickel, or 25 pennies!" }
  ],
  needWant: () => [
    { h: "Needs", v: "💧 🍲 🏠", t: "A <b>need</b> is something you <b>must have</b> to live and stay healthy, like water, food and a home." },
    { h: "Wants", v: "🧸 🍦 🎮", t: "A <b>want</b> is something fun that you'd <b>like</b> to have, but you could live without it, like toys, candy and games." },
    { h: "Ask yourself", v: "🤔", t: "Could I stay safe and healthy without it? If <b>yes</b>, it's a <b>want</b>. If <b>no</b>, it's a <b>need</b>." }
  ],
  change: () => [
    { h: "Spending means less", v: "10¢ → buy a 4¢ sticker", t: "When you buy something, you give money away, so you end up with <b>less</b>." },
    { h: "Take away", v: "10 − 4 = 6¢", t: "Start with the money you have and take away the price. 10 − 4 = <b>6¢</b> left." },
    { h: "Check it", v: "6 + 4 = 10 ✅", t: "Add what's left to what you spent. If you get the amount you started with, you're right!" }
  ],
  wordSpend: () => MTEACH.change(),
  wordEarn: () => [
    { h: "Earning means more", v: "6¢ + earn 3¢", t: "When you <b>earn</b> money by doing a job, you get <b>more</b>. So you add!" },
    { h: "Add it up", v: "6 + 3 = 9¢", t: "Start with the money you have and count on the money you earned: 6 + 3 = <b>9¢</b>." },
    { h: "Write it down", v: "✏️", t: "Write the number sentence first, then solve it. Check that your answer makes sense in the story." }
  ],
  canBuy: () => [
    { h: "Do you have enough?", v: "You have 8¢ · Toy costs 5¢", t: "To buy something, you need <b>at least as much money as the price</b>." },
    { h: "Compare the numbers", v: "8 is more than 5 → Yes ✅", t: "8¢ is more than 5¢, so you have enough! If you had only 3¢, 3 is less than 5, so the answer would be no." },
    { h: "Tip", v: "💡", t: "Compare your money to the price. Your money bigger or the same? Yes. Smaller? No." }
  ],
  cheapest: () => [
    { h: "Reading prices", v: "🍎 8¢ &nbsp; 🍪 3¢", t: "A <b>price</b> tells you how much money something costs. The number with the ¢ or $ is the price." },
    { h: "Least and most", v: "least = smallest · most = biggest", t: "\"The <b>least</b>\" means the smallest price. \"The <b>most</b>\" means the biggest price." },
    { h: "Compare", v: "3¢ &lt; 8¢", t: "Compare the numbers. 3 is smaller than 8, so the cookie costs <b>less</b> than the apple." }
  ],
  goal: () => [
    { h: "Saving goals", v: "🎯 Goal: 10¢ · You have 7¢", t: "A <b>saving goal</b> is an amount you want to reach so you can buy something." },
    { h: "How much more?", v: "7 → 8 → 9 → 10", t: "Count up from what you have to your goal. 8, 9, 10. That's <b>3 jumps</b>, so you need <b>3¢ more</b>." },
    { h: "Check it", v: "7 + 3 = 10 ✅", t: "Add your answer to what you have. It should equal your goal." }
  ],
  comboMake: () => [
    { h: "Different coins, same amount", v: chip("dime") + " = " + chips("nickel", 2), t: "Lots of coin groups can make the <b>same amount</b>. A dime makes 10¢, and so do 2 nickels." },
    { h: "Add each group", v: "1 nickel + 3 pennies = 5, 6, 7, 8 → 8¢", t: "Add up the coins in each choice. Count the biggest coin first, then count on." },
    { h: "Match the amount", v: "🎯", t: "The right answer adds up to <b>exactly</b> the amount in the question. Not more and not less." }
  ],
  mcq: key => {
    const slides = {
      earn: [
        { h: "Earning money", v: "🧹 💵", t: "To <b>earn</b> money means to get paid for work you do, like helping a neighbor or running a lemonade stand." },
        { h: "Kids can earn too", v: "🍋 🚿 🐕", t: "Washing cars, selling lemonade and walking a dog are ways to earn money. (Always check with a parent first!)" },
        { h: "Not earning", v: "📺 🎮 😴", t: "Watching TV, playing games or sleeping are things we do for fun or rest. Nobody pays you for those." }
      ],
      saveSpend: [
        { h: "Saving", v: "🐷 💰", t: "<b>Saving</b> means keeping your money for later, like putting coins in a piggy bank." },
        { h: "Spending", v: "🛒 🧸", t: "<b>Spending</b> means using your money to buy something now." },
        { h: "Both are okay!", v: "⚖️", t: "A good plan is to save some, spend some, and think before you spend. Saving helps you buy bigger things later." }
      ],
      smartChoice: [
        { h: "Smart choices", v: "🧠", t: "A smart money choice is <b>honest</b>, <b>fair</b> and helps you reach your goals." },
        { h: "Make a plan", v: "🎯", t: "If something costs more than you have, you can <b>save</b> until you have enough. Never take things without paying." },
        { h: "Think first", v: "🤔", t: "Before you spend, ask: Do I need it? Do I want it a lot? Can I afford it?" }
      ],
      bank: [
        { h: "What is a bank?", v: "🏦", t: "A <b>bank</b> is a safe place where people keep their money." },
        { h: "Savings accounts", v: "💰 → 🏦", t: "A <b>savings account</b> is a place at the bank to keep money you're saving. The bank may add <b>interest</b>, which is a little extra money, as a thank-you." },
        { h: "Safe vs. not safe", v: "🏦 ✅ &nbsp; 🪑 ❌", t: "Money is safest in a bank. It can get lost or stolen if you leave it on a bench or carry too much around." }
      ],
      giving: [
        { h: "Giving and sharing", v: "🎁 ❤️", t: "Money isn't only for buying things for ourselves. We can also use it to <b>help others</b>." },
        { h: "Donating", v: "🥫 🐶", t: "To <b>donate</b> is to give money or things to help people or animals who need it." },
        { h: "Charities", v: "🤝", t: "A <b>charity</b> is a group that helps others. Giving even a little can make a big difference when lots of people do it." }
      ],
      safety: [
        { h: "Keep it private", v: "🔒", t: "Your passwords, PINs and your parents' card numbers are <b>private</b>. Never share them with anyone except your parents." },
        { h: "Watch out for tricks", v: "🎣", t: "Some people online try to trick you with prizes, free coins or secrets. They want your private information or your money." },
        { h: "What to do", v: "👨‍👩‍👧", t: "If something feels wrong, <b>stop</b>, don't answer, and <b>tell a parent right away</b>. You'll never be in trouble for asking!" }
      ]
    };
    return slides[key];
  },
  billFacts: () => [
    { h: "Dollar bills", v: bill(1) + bill(5) + bill(10), t: "Paper money comes in bills. The number on the bill tells you how many <b>dollars</b> it's worth: $1, $5, $10." },
    { h: "Trading bills", v: bill(5) + " = " + bills(1, 5), t: "A <b>$5</b> bill is worth the same as <b>five $1</b> bills. Two $5 bills make a $10 bill." },
    { h: "Skip count", v: "5, 10", t: "To count bills, skip count by the bill's number. Two $5 bills: 5, 10 → $10." }
  ],
  countBills: () => [
    { h: "Counting bills", v: bill(5) + bills(1, 2), t: "Count the biggest bills first, then the smaller ones. Here: a $5 bill and two $1 bills." },
    { h: "Count on", v: "5 → 6 → 7", t: "Start at 5 for the $5 bill. Then count on 1 for each $1 bill: 6, 7. The total is <b>$7</b>." },
    { h: "Tip", v: "💡", t: "Say \"dollars\" when you count bills: five dollars, six dollars, seven dollars." }
  ],
  dollarsAdd: () => [
    { h: "Dollars and prices", v: "📖 $4 &nbsp; ✏️ $3", t: "Prices in a store are in dollars. A book costs $4 and a pen costs $3." },
    { h: "Buying two things", v: "4 + 3 = $7", t: "To find the cost of both, <b>add</b> the prices together: 4 + 3 = <b>$7</b>." },
    { h: "Tip", v: "💡", t: "Start at the bigger price and count up the smaller one. 4... 5, 6, 7." }
  ],
  dollarsSub: () => [
    { h: "Spending dollars", v: "💵 $9 → 🎒 $4", t: "When you spend money, you have <b>less</b> afterwards." },
    { h: "Take away", v: "9 − 4 = $5", t: "Start with the money you have and <b>take away</b> the price: 9 − 4 = <b>$5</b> left." },
    { h: "Check it", v: "5 + 4 = 9 ✅", t: "Add what's left to the price. You should get what you started with." }
  ],
  makeChange: () => [
    { h: "What is change?", v: bill(10) + " → toy $7", t: "When you pay with a bigger bill than the price, the store gives you the extra back. That extra is called <b>change</b>." },
    { h: "Count up", v: "7 → 8 → 9 → 10", t: "Start at the price ($7) and count up to the bill you gave ($10): 8, 9, 10. That's <b>3 dollars</b> of change." },
    { h: "Or take away", v: "10 − 7 = $3", t: "You can also subtract: the bill minus the price equals the change." }
  ],
  priceCompare: () => [
    { h: "Comparing prices", v: "📖 $6 &nbsp; 🧢 $4", t: "To see which costs more, <b>compare the numbers</b> in the prices." },
    { h: "More and less", v: "$6 &gt; $4", t: "6 is bigger than 4, so the book costs <b>more</b> and the cap costs <b>less</b>." },
    { h: "Careful", v: "👀", t: "Read the question! It might ask for the one that costs <b>less</b>." }
  ],
  canBuyBoth: () => [
    { h: "Buying two things", v: "💵 $10 · 📖 $6 · 🧢 $5", t: "To know if you can buy two things, you need to find the <b>total price</b> first." },
    { h: "Add, then compare", v: "6 + 5 = 11 → 11 is more than 10", t: "The total is $11. You only have $10. That's not enough, so the answer is <b>no</b>." },
    { h: "Tip", v: "💡", t: "If the total is <b>less than or equal to</b> your money, the answer is yes!" }
  ],
  dollarFacts: () => [
    { h: "A dollar is 100 cents", v: bill(1) + " = 100¢", t: "One <b>dollar</b> is worth <b>100 cents</b>. Dollars and cents are two ways to say money." },
    { h: "Quarters and dollars", v: chips("quarter", 4) + " = $1", t: "<b>4 quarters</b> make a dollar: 25, 50, 75, 100." },
    { h: "Dimes and nickels", v: "10 dimes = $1 · 20 nickels = $1", t: "<b>10 dimes</b> make a dollar (count by 10s). <b>20 nickels</b> make a dollar (count by 5s)." }
  ],
  repeatMoney: kind => [
    { h: kind === "save" ? "Saving the same amount" : "Earning the same amount", v: "$2 + $2 + $2", t: kind === "save" ? "If you save the same amount every week, you add that amount again and again." : "If you earn the same amount for every job, you add that amount again and again." },
    { h: "Skip count", v: "2, 4, 6 → $6", t: "Skip count by the amount, once for each week or job. Three times $2 is 2, 4, <b>6</b>." },
    { h: "Tip", v: "🖐️", t: "Use your fingers to keep track of how many times you've counted." }
  ]
};
// For the shared makers that take arguments, pick the slide set.
for (const key of Object.keys(MM)) {
  if (key === "mixed") continue;
  const orig = MM[key];
  MM[key] = (...args) => {
    const f = orig(...args);
    f.teach = () => MTEACH[key](...args);
    return f;
  };
}
MM.mixed = (...makers) => {
  const f = () => pick(makers)();
  f.teach = () => {
    const slides = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here's a quick reminder of each idea, then the quiz." }];
    makers.forEach(m => { if (m.teach) slides.push(m.teach()[0]); });
    return slides;
  };
  return f;
};

// ---------- lessons ----------
const ML = (title, make) => ({ title, make });
const MONEY_LEVELS = {
  1: [ // Kindergarten, first half: meet the coins
    ML("Meet the coins", MM.coinValue(["penny", "nickel", "dime", "quarter"])), ML("Name that coin", MM.coinName(KINDS)),
    ML("Counting pennies", MM.countCoins("penny", 9)), ML("Counting nickels", MM.countCoins("nickel", 5)),
    ML("Counting dimes", MM.countCoins("dime", 6)), ML("Which coin is worth more?", MM.coinCompare()),
    ML("Trading coins", MM.coinSwap()), ML("Needs and wants", MM.needWant()),
    ML("More needs and wants", MM.needWant()), ML("Ways to earn money", MM.mcq("earn")),
    ML("Saving and spending", MM.mcq("saveSpend")), ML("Can you buy it?", MM.canBuy(10)),
    ML("Nickels and pennies", MM.countMix(["nickel", "penny"], 20)), ML("Dimes and pennies", MM.countMix(["dime", "penny"], 25)),
    ML("How much is left?", MM.change(10)), ML("Earning more money", MM.wordEarn(9)),
    ML("Coin review", MM.mixed(MM.coinValue(KINDS), MM.coinName(KINDS), MM.coinCompare())), ML("Which costs the least?", MM.cheapest()),
    ML("Mixed practice", MM.mixed(MM.countCoins("dime", 5), MM.canBuy(10), MM.needWant(), MM.change(10))), ML("Level 1 Challenge", MM.mixed(MM.coinValue(KINDS), MM.countCoins("nickel", 5), MM.countMix(["nickel", "penny"], 20), MM.wordEarn(9), MM.needWant()))
  ],
  2: [ // Kindergarten, second half: quarters and dollars
    ML("Counting quarters", MM.countCoins("quarter", 4)), ML("Coin trades", MM.coinSwap()),
    ML("A dollar is 100 cents", MM.dollarFacts(["cents", "quarters"])), ML("Nickels and pennies 2", MM.countMix(["nickel", "penny"], 30)),
    ML("Dimes and pennies 2", MM.countMix(["dime", "penny"], 30)), ML("Dimes and nickels", MM.countMix(["dime", "nickel"], 50)),
    ML("Quarters and dimes", MM.countMix(["quarter", "dime"], 75)), ML("Counting any coins", MM.countMix(KINDS, 50)),
    ML("Which coins make 10¢?", MM.comboMake(10)), ML("Which coins make 25¢?", MM.comboMake(25)),
    ML("Which costs the least?", MM.cheapest()), ML("Can you buy it? (to 25¢)", MM.canBuy(25)),
    ML("How much is left?", MM.change(20)), ML("Earning story problems", MM.wordEarn(20)),
    ML("Spending story problems", MM.wordSpend(20)), ML("Needs and wants", MM.needWant()),
    ML("Saving goals", MM.goal(20)), ML("Smart money choices", MM.mcq("smartChoice")),
    ML("Mixed practice", MM.mixed(MM.countMix(KINDS, 50), MM.canBuy(25), MM.change(20), MM.goal(20))), ML("Level 2 Challenge", MM.mixed(MM.countMix(KINDS, 50), MM.comboMake(25), MM.wordSpend(20), MM.wordEarn(20), MM.goal(20), MM.coinCompare()))
  ],
  3: [ // 1st grade, first half: dollars and change
    ML("Dollar bills", MM.billFacts()), ML("Counting $1 and $5 bills", MM.countBills([1, 5])),
    ML("Counting $5 and $10 bills", MM.countBills([5, 10])), ML("Adding dollars", MM.dollarsAdd(20)),
    ML("Subtracting dollars", MM.dollarsSub(20)), ML("Change from $5", MM.makeChange(5)),
    ML("Change from $10", MM.makeChange(10)), ML("Counting coins to 50¢", MM.countMix(KINDS, 50)),
    ML("Counting coins to $1", MM.countMix(KINDS, 100)), ML("Which costs more?", MM.priceCompare()),
    ML("Can you buy both?", MM.canBuyBoth()), ML("Cents in a dollar", MM.dollarFacts(["cents", "quarters", "dimes", "nickels"])),
    ML("Saving each week", MM.repeatMoney("save")), ML("Earning from jobs", MM.repeatMoney("earn")),
    ML("Saving and spending", MM.mcq("saveSpend")), ML("Banks", MM.mcq("bank")),
    ML("Giving and sharing", MM.mcq("giving")), ML("Keeping money safe", MM.mcq("safety")),
    ML("Mixed practice", MM.mixed(MM.dollarsAdd(20), MM.makeChange(10), MM.countMix(KINDS, 50), MM.priceCompare())), ML("Level 3 Challenge", MM.mixed(MM.countBills([1, 5, 10]), MM.dollarsSub(20), MM.makeChange(10), MM.canBuyBoth(), MM.repeatMoney("save"), MM.dollarFacts(["cents", "quarters", "dimes", "nickels"])))
  ]
};
