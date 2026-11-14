// Mind Lab World History. Levels 1-3, 20 lessons each (60 lessons). Teach slides, then quiz; every question has 3 hints.
const HISTORY_LEVELS = (() => {
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

  // ================= LEVEL 1 =================
  const l1 = [
    M("Past, present, future", [
      ["Past, present, future", "⏪ ⏺️ ⏩", "Time has three parts. The <b>past</b> already happened. The <b>present</b> is happening now. The <b>future</b> has not happened yet."],
      ["Examples", "📅", "Yesterday is the past. Today is the present. Tomorrow is the future."],
      ["Tip", "💡", "Ask yourself: did it already happen, is it happening now, or will it happen later?"]],
      ["Think about when it happens: already done, happening now, or still to come?", "Something that already happened is behind us. Something happening right now is here. Something coming later is ahead of us.", "Example: last week already happened, this minute is happening now, and next week is still coming. Now do yours."],
      [["Which word means a time that already happened?", "Past", "Future|Present"], ["Which word means right now?", "Present", "Past|Future"], ["Which word means a time that has not happened yet?", "Future", "Past|Present"],
       ["Yesterday is in the...", "Past", "Future|Present"], ["Tomorrow is in the...", "Future", "Past|Present"], ["Today is in the...", "Present", "Past|Future"],
       ["You learned to crawl when you were a baby. That is in the...", "Past", "Future|Present"], ["Next summer is in the...", "Future", "Past|Present"]]),
    M("Yesterday, today, tomorrow", [
      ["Three days in a row", "⬅️ 📅 ➡️", "<b>Yesterday</b> is the day before today. <b>Tomorrow</b> is the day after today."],
      ["The week in order", "Sun · Mon · Tue · Wed · Thu · Fri · Sat", "The days of the week always go in the same order. After Saturday, the week starts again with Sunday."],
      ["Tip", "🖐️", "To find tomorrow, step one day forward. To find yesterday, step one day back."]],
      ["Yesterday is the day before today. Tomorrow is the day after today.", "Say the days in order: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. Then step forward or back one day.", "Example: if today is Saturday, tomorrow is Sunday and yesterday was Friday. Now do yours."],
      [["If today is Tuesday, what day was yesterday?", "Monday", "Wednesday|Friday"], ["If today is Tuesday, what day is tomorrow?", "Wednesday", "Monday|Thursday"], ["If today is Friday, what day is tomorrow?", "Saturday", "Thursday|Sunday"],
       ["If today is Sunday, what day was yesterday?", "Saturday", "Monday|Friday"], ["If today is Wednesday, what day was yesterday?", "Tuesday", "Thursday|Monday"], ["If today is Thursday, what day is tomorrow?", "Friday", "Wednesday|Saturday"],
       ["If today is Monday, what day is tomorrow?", "Tuesday", "Sunday|Wednesday"]]),
    M("First, next, last", [
      ["Order matters", "1️⃣ 2️⃣ 3️⃣", "Many things happen in steps. We say <b>first</b>, <b>next</b> and <b>last</b> to tell the order."],
      ["An example", "🧼 → 💦 → 🧻", "Washing hands: <b>first</b> wet your hands, <b>next</b> use soap, <b>last</b> dry them."],
      ["Tip", "💡", "The first step needs nothing before it. The last step happens when everything else is done."]],
      ["Think about the steps in order, like a story.", "What has to happen before the next step can start? The first step has nothing before it. The last step comes when all the others are done.", "Example: putting on shoes. First put on socks, next put on shoes, last tie the laces. Now order yours."],
      [["Making a sandwich: what do you do LAST?", "Eat it", "Spread the jam|Get the bread"], ["Getting dressed: which comes FIRST?", "Put on socks", "Tie your shoes|Zip your coat"],
       ["A seed grows. What comes LAST?", "A flower blooms", "The seed is planted|A sprout peeks out"], ["Brushing teeth: what comes FIRST?", "Put paste on the brush", "Rinse your mouth|Smile in the mirror"],
       ["Which comes LAST for a butterfly?", "Butterfly", "Caterpillar|Chrysalis"], ["Baking a cake: what comes LAST?", "Eat the cake", "Mix the batter|Bake it in the oven"],
       ["Which part of the day comes FIRST?", "Morning", "Evening|Afternoon"], ["A person grows up. Which comes FIRST?", "Baby", "Teenager|Grown-up"]]),
    M("Old or new?", [
      ["Older and newer", "🕯️ → 💡", "Some things were made a very long time ago. Other things are newer. A candle is <b>older</b> than a light bulb."],
      ["Then and now", "🐎 → 🚗 → ✈️", "People rode horses long ago. Later came cars. Later still came airplanes."],
      ["Tip", "💡", "Ask: did people have this a long time ago, or is it something from our time?"]],
      ["Think about what people had a long, long time ago.", "Old things were used before electricity and machines. New things often use batteries, plugs or screens.", "Example: a pencil is older than a computer, because people wrote by hand before computers were made. Now do yours."],
      [["Which is OLDER?", "A candle", "A light bulb", "🕯️ or 💡"], ["Which is OLDER?", "A horse and wagon", "An airplane", "🐎 or ✈️"], ["Which is OLDER?", "A paper letter", "A text message", "✉️ or 📱"],
       ["Which is OLDER?", "A sailboat", "A rocket", "⛵ or 🚀"], ["Which is OLDER?", "A pencil", "A tablet computer", "✏️ or 📱"], ["Which is OLDER?", "A campfire", "A microwave oven", "🔥 or 🍲"]]),
    B("Getting around", { intro: "Long ago, people walked or rode animals. Later, people made boats, trains, cars and airplanes to travel farther and faster.", tip: "Each new way to travel helped people go farther.",
      items: [["a horse", "🐎", "was ridden by people long ago"], ["a sailboat", "⛵", "uses the wind to move on water"], ["a train", "🚂", "runs on tracks and carries many people"], ["a car", "🚗", "has an engine and four wheels"], ["an airplane", "✈️", "flies high in the sky"], ["a bicycle", "🚲", "has pedals you push with your feet"]] }),
    B("Light then and now", { intro: "Long ago, people used fire and candles to see in the dark. Today we can flip a switch and a light turns on.", tip: "Light helps us see, day and night.",
      items: [["a candle", "🕯️", "gives light with a small flame"], ["a light bulb", "💡", "lights up a room when you flip a switch"], ["a flashlight", "🔦", "uses batteries and you can carry it"], ["the sun", "☀️", "gives us light in the daytime"], ["the moon", "🌙", "shines in the night sky"]] }),
    B("Sending messages", { intro: "Long ago, if you wanted to tell someone far away something, you wrote a letter. Today there are many faster ways.", tip: "People have always wanted to share news with each other.",
      items: [["a letter", "✉️", "carries words written on paper"], ["a telephone", "📞", "lets you talk to someone far away"], ["a mailbox", "📬", "is where letters are delivered"], ["a computer", "💻", "can send messages and show pictures"], ["a smartphone", "📱", "can call, send texts and take photos"]] }),
    B("Homes", { intro: "People have lived in many kinds of homes. Some were small and some were huge. All of them kept people safe and warm.", tip: "A home gives people shelter.",
      items: [["a tent", "⛺", "is a cloth home you can carry"], ["a hut", "🛖", "is a small home made of wood or straw"], ["a castle", "🏰", "is a huge stone home for a king or queen"], ["an apartment building", "🏢", "has many homes inside one building"], ["a house", "🏠", "is a home for one family"]] }),
    M("My family history", [
      ["Families", "👵 👨 👧", "Your family has people of different ages. Your grandparents are the parents of your mom or dad."],
      ["Family words", "👨‍👩‍👧‍👦", "Your mom's mom is your grandma. Your mom's brother is your uncle. Your aunt's child is your cousin."],
      ["A family tree", "🌳", "A <b>family tree</b> is a picture that shows who is in a family and how they are connected."]],
      ["Think about how people in a family are connected.", "Grandparents are older than parents, and parents are older than kids.", "Example: your dad's sister is your aunt. Now do yours."],
      [["Your mom's mom is your...", "Grandma", "Aunt|Sister"], ["Your dad's dad is your...", "Grandpa", "Uncle|Brother"], ["A baby, a mom and a grandma. Who is the OLDEST?", "Grandma", "Baby|Mom", "👶 👩 👵"],
       ["Who was born first: you or your parents?", "Your parents", "You"], ["Your mom's brother is your...", "Uncle", "Cousin|Grandpa"], ["Your aunt's child is your...", "Cousin", "Brother|Uncle"],
       ["A family tree shows...", "Who is in your family", "What the weather is|Where cars go", "🌳"]]),
    B("Growing up", { intro: "Everyone grows and changes. Think about how you looked when you were a baby. You are different now, and you will keep growing!", tip: "Every person grows from a baby into a grown-up, one step at a time.",
      items: [["a baby", "👶", "needs lots of help and drinks milk"], ["a child", "🧒", "goes to school and plays"], ["a grown-up", "🧑", "goes to work and takes care of a family"], ["an older person", "🧓", "has lived for many years and knows many stories"]] }),
    M("Days, months, years", [
      ["Measuring time", "📆", "A <b>week</b> has 7 days. A <b>month</b> is about four weeks. A <b>year</b> has 12 months."],
      ["The months", "Jan · Feb · Mar · Apr · May · Jun · Jul · Aug · Sep · Oct · Nov · Dec", "January is the first month of the year. December is the last month."],
      ["Tip", "💡", "A day is short, a week is longer, a month is longer still, and a year is the longest of all."]],
      ["Picture a calendar on the wall.", "A calendar page shows one month. Count pages for months, or rows of boxes for weeks.", "Example: in a week there are more days than in a weekend. A year has more months than a season. Now do yours."],
      [["How many months are in a year?", "12", "7|10"], ["How many days are in a week?", "7", "5|10"], ["How many seasons are there in a year?", "4", "3|6"],
       ["Which is the FIRST month of the year?", "January", "March|December"], ["Which is the LAST month of the year?", "December", "November|January"],
       ["Which is longer?", "A year", "A week|A day"], ["Which is shorter?", "A day", "A year|A month"], ["Which month comes after January?", "February", "December|March"]]),
    M("Museums", [
      ["What is a museum?", "🏛️", "A <b>museum</b> is a place that keeps old and special things safe so people can look at them and learn."],
      ["Clues from the past", "🦴 🏺 📷", "Museums have old tools, pots, photos and fossils. These are clues that tell us how people lived long ago."],
      ["Tip", "💡", "An <b>artifact</b> is an old object made by people. A <b>fossil</b> is the print or bones of a plant or animal from long, long ago."]],
      ["Think about why people keep old things.", "Museums keep things from the past so that we can learn about the past.", "Example: an old clay pot in a museum shows how people carried water long ago. Now do yours."],
      [["A museum is a place where...", "People look at old and special things", "People buy groceries|People swim"], ["Who digs carefully to find old things from the past?", "An archaeologist", "A chef|A pilot"],
       ["A fossil is...", "The print or bones of a plant or animal from long ago", "A new toy|A kind of candy"], ["What do we call an old object made by people?", "An artifact", "A snack|A game"],
       ["Why do we keep old things?", "To learn about the past", "To forget about it|To make noise"], ["Old photographs can show us...", "How people looked and lived long ago", "What will happen tomorrow|The weather next year", "📷"]]),
    B("Hunters and gatherers", { intro: "Very, very long ago, people did not have stores. They moved from place to place to find food and gathered what nature gave them.", tip: "Long ago, people used what they could find around them.",
      items: [["a gatherer", "🍓", "picked berries, nuts and plants to eat"], ["a fisher", "🎣", "caught fish in rivers and lakes"], ["a fire", "🔥", "kept people warm and cooked their food"], ["a hut", "🛖", "was a shelter made of branches and leaves"], ["a stone tool", "🪨", "was used to cut and scrape"]] }),
    B("The first farmers", { intro: "Later, people learned to plant seeds and grow food. They could stay in one place and build villages.", tip: "Farming meant people did not have to wander to find food.",
      items: [["a seed", "🌱", "grows into a plant when it is planted"], ["wheat", "🌾", "is a grain farmers grow to make bread"], ["a village", "🏘️", "is a small group of homes where farmers lived"], ["a harvest", "🧺", "is picking the food when it is ready"], ["bread", "🍞", "is made from flour that comes from wheat"]] }),
    B("Jobs long ago", { intro: "Long ago, people had many jobs. Some of them are still around today, and some are rare now.", tip: "People worked hard to make what their town needed.",
      items: [["a blacksmith", "⚒️", "made things from hot metal"], ["a baker", "🥖", "made bread for the village"], ["a farmer", "🧑‍🌾", "grew food in the fields"], ["a builder", "🧱", "put up homes with stone and wood"], ["a weaver", "🧵", "made cloth from thread"]] }),
    M("The wheel", [
      ["A great invention", "🛞", "The <b>wheel</b> is a round thing that turns. People invented it a very long time ago."],
      ["Wheels everywhere", "🚲 🛒 🚗", "Wheels are on bikes, wagons, carts and cars. They help us move things that are heavy."],
      ["Why round?", "⭕", "A round wheel rolls smoothly. A square block would bump and stop."]],
      ["Think about what rolls well.", "A wheel is round so it can roll. Think about which things roll.", "Example: a shopping cart has wheels so it rolls. A chair with no wheels does not roll. Now do yours."],
      [["What is a wheel?", "A round thing that turns", "A flat square|A kind of rope"], ["Which one has wheels?", "A wagon", "A pillow|A sandwich", "🛒"], ["The wheel helped people...", "Move heavy things more easily", "Sleep longer|Hear better"],
       ["Which shape is a wheel?", "Circle", "Square|Triangle"], ["Which one does NOT have wheels?", "A sailboat", "A bike|A skateboard"], ["Which one rolls best?", "A round wheel", "A square block|A flat board"], ["A scooter has...", "Wheels", "Wings|Fins", "🛴"]]),
    M("Timelines", [
      ["What is a timeline?", "⏳", "A <b>timeline</b> shows things in the order they happened, from the earliest to the latest."],
      ["How to read it", "1st → 2nd → 3rd", "Start at the beginning. The first thing is the earliest. The last thing is the most recent."],
      ["Your own timeline", "👶 → 🧒", "You could make a timeline of your life: you were born, you learned to walk, you started school."]],
      ["A timeline goes in the order things happened.", "The earliest thing comes first. The latest thing comes last.", "Example: wake up, eat breakfast, go to school. Wake up is first and school is last. Now do yours."],
      [["On a timeline, the earliest thing is at the...", "Start", "End|Middle"], ["Put in order: baby, grown-up, child. Which is first?", "Baby", "Grown-up|Child"], ["A timeline shows events in...", "The order they happened", "Order of color|Order of size"],
       ["Timeline: wake up, brush teeth, eat lunch. What is last?", "Eat lunch", "Wake up|Brush teeth"], ["What comes after yesterday on a timeline?", "Today", "Last week|Last year"], ["Which year comes right before 2025?", "2024", "2026|2030"],
       ["Which happened first in your life?", "You were born", "You started school|You turned six"]]),
    M("Before we had...", [
      ["Life before", "🕯️ 🧊 🐎", "Before many machines were invented, people did things in other ways."],
      ["Examples", "💡 → 🕯️", "Before light bulbs, people used candles. Before cars, many people used horses and wagons."],
      ["Tip", "💡", "When you learn about the past, ask: how did people do this before it was invented?"]],
      ["Think about what people used before the new invention.", "Before electricity, people needed fire or muscle power. Which choice fits?", "Example: before washing machines, people washed clothes in a tub or river by hand. Now do yours."],
      [["Before light bulbs, people used...", "Candles", "Cell phones|Televisions"], ["Before refrigerators, people kept food cold with...", "Ice", "Fire|Sand"], ["Before cars, many people traveled by...", "Horse and wagon", "Rocket|Skateboard"],
       ["Before phones, people sent messages by...", "Letter", "Video call|Text message"], ["Before books were printed by machines, people copied books...", "By hand", "With a camera|With a phone"], ["Before washing machines, people washed clothes...", "By hand", "In a car|On an airplane"],
       ["Before electric lights, what lit homes at night?", "Fire and candles", "Televisions|Computers"]])
  ];
  l1.push(LS("Mixed practice", MX(l1, [0, 2, 4, 5, 11])));
  l1.push(LS("Level 1 Challenge", MX(l1, [1, 3, 8, 9, 10, 15, 16, 17])));

  // ================= LEVEL 2 =================
  const l2 = [
    M("History words", [
      ["What is history?", "📜", "<b>History</b> is the story of the past. It tells us what happened long ago and how people lived."],
      ["Big words", "🏺 ⏳", "<b>Long ago</b> means a very long time before now. <b>Ancient</b> means very, very old, thousands of years old."],
      ["Historians", "🔍", "A <b>historian</b> is someone who studies the past. They look at old books, photos and objects to learn the story."]],
      ["Think about what each word means.", "History is about the time before now, not the time to come. Ancient means very old.", "Example: a photo of your grandma as a girl tells a little bit of history. Now do yours."],
      [["History is the story of...", "The past", "The future|The weather"], ["A historian is someone who...", "Studies the past", "Cooks dinner|Paints houses"], ["Which helps us learn about history?", "Old books and photos", "Today's lunch|A pillow"],
       ["A timeline puts events in...", "Order", "Colors|Shapes"], ["Long ago means...", "A very long time before now", "Right now|Tomorrow"], ["Ancient means...", "Very, very old", "Brand new|Tiny"],
       ["Ancient Egypt happened...", "Thousands of years ago", "Last week|Yesterday"]]),
    M("What is an invention?", [
      ["Inventions", "💡", "An <b>invention</b> is something new that a person made. The person who makes it is an <b>inventor</b>."],
      ["Solving problems", "🧩", "Inventors look for a problem and think of a way to fix it. The light bulb helps us see at night."],
      ["Great inventions", "📞 ✈️ 🖨️", "The telephone, the airplane and the printing press were big inventions. They changed how people live."]],
      ["Think about what each thing helps us do.", "An invention helps people do something that was hard before.", "Example: a bicycle helps people travel faster than walking. Now do yours."],
      [["An invention is...", "A new thing someone made", "A kind of weather|An old rock"], ["Someone who makes new inventions is an...", "Inventor", "Explorer|Farmer"], ["Why do people invent things?", "To solve problems", "To make life harder|To hide"],
       ["The light bulb helps us...", "See when it is dark", "Wash dishes|Fly", "💡"], ["The telephone lets us...", "Talk to people far away", "Bake bread|Dig holes", "📞"], ["The airplane lets us...", "Fly through the sky", "Swim underwater|Dig tunnels", "✈️"],
       ["The printing press made it easier to...", "Make many copies of books", "Cook food|Fly", "🖨️"]]),
    B("Famous inventors", { intro: "Some inventors became famous because their inventions changed the world. Meet four of them.", tip: "Remember each inventor with their invention.",
      qa: c => `Which inventor ${c}?`, qc: "Which inventor is linked to this invention?",
      items: [["Thomas Edison", "💡", "made a light bulb that worked well in homes"], ["Alexander Graham Bell", "📞", "invented the telephone"], ["The Wright brothers", "✈️", "flew the first airplane"], ["Johannes Gutenberg", "🖨️", "built a printing press in Europe"]] }),
    M("New and newer", [
      ["Which came first?", "1️⃣ 2️⃣", "Inventions come one after another. Some are very old, like the wheel. Some are new, like the smartphone."],
      ["Order of inventions", "🛞 → 🕯️ → 📞 → 📱", "The wheel is the oldest. The candle came later. Then the telephone. Smartphones came much later."],
      ["Tip", "💡", "Think about what you have seen in old pictures. If it needs electricity or a screen, it is probably newer."]],
      ["Think about which one was made earlier.", "Things that need electricity or computers are usually newer than things people made by hand.", "Example: a pencil is older than a computer. Now do yours."],
      [["Which is NEWER?", "A smartphone", "A letter|A candle"], ["Which is NEWER?", "A television", "A candle|A wagon"], ["Which is OLDER?", "The wheel", "The airplane|The computer"],
       ["Which is NEWER?", "A rocket to space", "A sailboat|A wagon"], ["Which is OLDER?", "Writing with a pencil", "Typing on a computer|Texting"], ["Which is OLDER?", "A printed book", "A tablet computer|An e-book"],
       ["Which is NEWER?", "A video call", "A letter|A candle"]]),
    B("Writing and paper", { intro: "Writing is a great invention. It lets people save their ideas and stories for others to read, even long after they are gone.", tip: "People have always found new ways to write things down.",
      items: [["a clay tablet", "🧱", "was written on while it was soft, then dried hard"], ["papyrus", "📜", "is a paper-like sheet made from a plant in Egypt"], ["paper", "📄", "was invented in ancient China"], ["a printing press", "🖨️", "can print many copies of a page"], ["a book", "📚", "has many pages with words"]] }),
    B("Villages, towns and cities", { intro: "People live together in communities. Some communities are very small, and some have millions of people.", tip: "Bigger communities have more buildings and more people.",
      items: [["a village", "🏘️", "is a very small community"], ["a town", "🏡", "is bigger than a village but smaller than a city"], ["a city", "🏙️", "has tall buildings and lots of people"], ["a farm", "🌾", "has fields for growing food"]] }),
    M("Ancient Egypt: where?", [
      ["Where is Egypt?", "🌍", "Egypt is a country in the continent of <b>Africa</b>. Ancient Egypt was a great civilization that began thousands of years ago."],
      ["Hot and dry", "🏜️", "Most of Egypt is desert, so it is hot and dry. Almost all people lived near the long river called the <b>Nile</b>."],
      ["Animals", "🐪 🐈", "Egyptians had camels to cross the desert. Cats were loved and treasured as pets."]],
      ["Think about what you learned about Egypt.", "Egypt is hot and dry, and most people lived near water.", "Example: Greece is in Europe and Egypt is in Africa. Each country sits on a continent. Now do yours."],
      [["Egypt is a country in the continent of...", "Africa", "Asia|Europe"], ["The long river in Egypt is the...", "Nile", "Amazon|Mississippi"], ["What is Egypt like?", "Mostly hot and dry", "Always snowy|Always rainy"],
       ["Much of Egypt is covered by...", "Desert", "Ice|Rainforest"], ["Which animal was treasured in ancient Egypt?", "Cat", "Penguin|Polar bear", "🐈"], ["Most people in ancient Egypt lived near the...", "Nile River", "Tall mountains|A frozen lake"]]),
    B("The pyramids", { intro: "Ancient Egypt is famous for its pyramids. They were built thousands of years ago, and many are still standing today.", tip: "The biggest pyramids are at a place called Giza.",
      items: [["a pyramid", "🔺", "is a giant stone building with a pointed top"], ["a pharaoh", "👑", "was a king or queen of ancient Egypt"], ["the Sphinx", "🦁", "is a huge statue with a lion's body, near the pyramids"], ["a camel", "🐪", "carries people and loads across the sand"], ["the desert", "🏜️", "is hot, dry land with lots of sand"]] }),
    B("The Nile river", { intro: "The Nile is one of the longest rivers in the world. It gave ancient Egyptians water, food and a way to travel.", tip: "The Nile was the heart of ancient Egypt.",
      items: [["the Nile", "🏞️", "is the long river that runs through Egypt"], ["a papyrus plant", "🌿", "grew by the river and was used to make paper-like sheets"], ["a boat", "⛵", "carried people and goods along the river"], ["a farmer", "🧑‍🌾", "grew wheat in the rich soil near the river"], ["the flood", "🌊", "came each year and left rich soil for growing food"]] }),
    M("Hieroglyphs", [
      ["Picture writing", "👁️ 🐦 🌊", "<b>Hieroglyphs</b> are a kind of writing from ancient Egypt. Instead of letters, they used little pictures."],
      ["Where they wrote", "🧱 📜", "Egyptians carved hieroglyphs into stone walls. They also wrote with brushes on <b>papyrus</b>."],
      ["Tip", "💡", "The word hieroglyph reminds us that pictures can tell a story, like a comic strip."]],
      ["Think about what hieroglyphs look like.", "Hieroglyphs are tiny drawings that stand for words or sounds.", "Example: a drawing of a bird could be one of the signs in hieroglyphs. Now do yours."],
      [["Hieroglyphs are...", "Picture writing from ancient Egypt", "Math problems|A kind of food"], ["Ancient Egyptians wrote on a paper-like sheet made from...", "Papyrus", "Cotton|Bamboo"], ["A hieroglyph uses...", "Little pictures", "Only numbers|Only colors"],
       ["Who wrote with hieroglyphs?", "Ancient Egyptians", "Pirates|Astronauts"], ["Hieroglyphs were often carved on...", "Stone walls", "Mobile phones|Cars"], ["Egyptians wrote with a brush or reed on...", "Papyrus", "Plastic|Glass"]]),
    M("Ancient Greece", [
      ["Where is Greece?", "🇬🇷", "Greece is a country in <b>Europe</b>. Its capital city is <b>Athens</b>. Ancient Greece began thousands of years ago."],
      ["Land and sea", "🏝️ 🌊", "Greece has many islands and lots of coast. Greeks sailed boats on the sea."],
      ["Famous things", "🏛️", "Ancient Greeks built beautiful temples with tall columns. The Olympic Games began in ancient Greece."]],
      ["Think about what you learned in the lesson.", "Think about the sea, old temples and the first Olympic Games.", "Example: Egypt is in Africa and the Nile is its river. Now do yours."],
      [["Greece is a country in...", "Europe", "Africa|Antarctica"], ["The capital city of Greece is...", "Athens", "Rome|Cairo"], ["The Olympic Games began in ancient...", "Greece", "China|Mexico"],
       ["Ancient Greeks built temples with tall...", "Columns", "Chimneys|Slides"], ["Greece has many...", "Islands", "Deserts|Igloos"], ["The Parthenon is an old temple in...", "Athens", "Paris|Tokyo"], ["The language of Greece is...", "Greek", "Spanish|Japanese"]]),
    M("The Olympics", [
      ["Olympic Games", "🏅", "The <b>Olympic Games</b> began in ancient Greece, in a place called Olympia, thousands of years ago."],
      ["Then and now", "🌿 → 🥇", "In ancient Greece, winners got a wreath made of olive leaves. Today, winners get medals."],
      ["Every four years", "🗓️", "The Olympic Games are held every <b>four years</b>. Athletes come from many countries. The symbol is five rings."]],
      ["Think about what you learned about these famous games.", "The Games began a very long time ago, in a land with islands and old temples.", "Example: a leap year also comes every four years. Now do yours."],
      [["How often are the Olympic Games held?", "Every 4 years", "Every year|Every week"], ["What was the prize for winners in ancient Greece?", "An olive wreath", "A gold car|A pizza"], ["Where did the first Olympic Games happen?", "Greece", "Brazil|Canada"],
       ["Which is an Olympic sport?", "Swimming", "Painting|Napping"], ["Athletes at the Olympics come from...", "Countries around the world", "Only one town|Only one school"], ["What do winners get today?", "Medals", "Pizza|Bicycles", "🥇"],
       ["The Olympic symbol has five...", "Rings", "Stars|Squares"]]),
    B("Greek theater", { intro: "Ancient Greeks loved stories. They built big outdoor theaters where actors performed plays for everyone.", tip: "Theater has been around for thousands of years.",
      items: [["a theater", "🏛️", "is a place where people watch plays"], ["a mask", "🎭", "was worn by actors to show feelings"], ["a play", "📜", "is a story acted out on a stage"], ["the audience", "👏", "watches the show and claps"], ["an actor", "🗣️", "speaks the lines in a play"]] }),
    M("Leaders", [
      ["What is a leader?", "🧭", "A <b>leader</b> is someone who helps guide a group. A good leader listens to others and tries to be fair."],
      ["Leaders long ago", "👑", "A <b>king</b> or <b>queen</b> ruled a kingdom. In ancient Egypt, the leader was called a <b>pharaoh</b>."],
      ["Leaders today", "🏙️ 🏫", "A <b>mayor</b> leads a city. A teacher leads a classroom."]],
      ["Think about who guides a group.", "A leader helps a group decide and stay safe. Think about which job fits.", "Example: a captain leads the team on a field. Now do yours."],
      [["A leader is someone who...", "Helps guide a group", "Hides from people|Sleeps all day"], ["A king or queen ruled...", "A kingdom", "A candy shop|A zoo"], ["Ancient Egypt's ruler was called a...", "Pharaoh", "Mayor|Teacher"],
       ["A good leader listens to...", "Other people", "Nobody|Only themselves"], ["A crown is worn by a...", "King or queen", "Firefighter|Farmer", "👑"], ["Who leads a city?", "A mayor", "A pilot|A baker"], ["Who leads a classroom?", "A teacher", "A cat|A mailbox"]]),
    M("Flags and symbols", [
      ["What is a symbol?", "🚦", "A <b>symbol</b> is a picture or thing that stands for an idea. A stop sign stands for \"stop\"."],
      ["Flags", "🏳️ 🎌", "A <b>flag</b> is a symbol of a country or a group. Each country has its own flag."],
      ["More symbols", "🕊️ ⭕", "A dove is often a symbol of peace. The five Olympic rings are a symbol of people from around the world coming together."]],
      ["Think about what the picture stands for.", "A symbol is a quick picture for a big idea.", "Example: a red heart on a card can show that you care. Now do yours."],
      [["A symbol is a picture or thing that...", "Stands for an idea", "Is always a number|Costs money"], ["A flag is a symbol of a...", "Country or group", "Weather|Meal"], ["What does a red stop sign tell you to do?", "Stop", "Go faster|Sing", "🛑"],
       ["A dove is often a symbol of...", "Peace", "Speed|Winter", "🕊️"], ["The five Olympic rings stand for...", "People from around the world coming together", "A kind of food|A storm"], ["Which one is a symbol of a country?", "A national flag", "A shoe|A cup"]]),
    M("Holidays", [
      ["Special days", "🎉", "A <b>holiday</b> is a special day when people remember or celebrate something."],
      ["Ways to celebrate", "🎆 🎶 🍽️", "People celebrate with food, songs, stories, parades and fireworks."],
      ["National holidays", "📅", "Many countries have <b>national holidays</b>. These are special days for the whole country. January 1 is the first day of the new year in many places."]],
      ["Think about why we have special days.", "Holidays help us remember something or enjoy time with others.", "Example: a birthday celebrates the day someone was born. Now do yours."],
      [["A holiday is a day to...", "Remember or celebrate something", "Do extra homework|Stay quiet all day"], ["Which date starts the new year?", "January 1", "March 1|June 15"], ["Many countries have special days called...", "National holidays", "Weather days|Pizza days"],
       ["On a birthday we celebrate...", "The day someone was born", "The weather|A new bike", "🎂"], ["Many families celebrate special days with...", "Food, songs or stories", "Homework|Sleeping alone"], ["A parade is...", "A group walking or riding to celebrate", "A very quiet room|A kind of fruit"],
       ["Fireworks are often used to...", "Celebrate", "Wash dishes|Plant seeds", "🎆"]]),
    B("Explorers", { intro: "Explorers go to places that few or no people have been before. They are brave and curious.", tip: "Explorers travel to learn new things.",
      qa: c => `Which explorer ${c}?`, qb: n => `Finish the sentence: ${n} ...`, qc: "Which explorer goes with this picture?",
      items: [["Neil Armstrong", "🌙", "was the first person to walk on the Moon"], ["Amelia Earhart", "🛩️", "was the first woman to fly alone across the Atlantic Ocean"], ["Sally Ride", "🚀", "was the first American woman in space"], ["Edmund Hillary and Tenzing Norgay", "🏔️", "were the first to climb Mount Everest"], ["Yuri Gagarin", "🛰️", "was the first person to travel into space"]] }),
    M("What happened first?", [
      ["Ordering the past", "⏳", "Historians put events in order. Some things happened a very long time ago. Others happened more recently."],
      ["A long timeline", "🦕 → 🔺 → 🏅 → ✈️ → 🌙", "Dinosaurs lived long before people. Then pyramids and the first Olympics came. The airplane and the Moon landing came much later."],
      ["Tip", "💡", "Ask: was this before or after the airplane was invented? Before or after electricity?"]],
      ["Think about which event is older.", "The older something is, the further back it goes on a timeline.", "Example: the wheel is older than the telephone. Now do yours."],
      [["Which happened FIRST?", "People used the wheel", "People flew airplanes|People used smartphones"], ["Which happened FIRST?", "Pyramids were built in Egypt", "The first airplane flew|The first phone call"],
       ["Which happened FIRST?", "Ancient Greeks held the Olympics", "A person walked on the Moon|People used computers"], ["Which happened FIRST?", "Dinosaurs lived", "People built houses|People used the wheel"],
       ["Which happened LAST?", "People walked on the Moon", "Egyptians built pyramids|The Greeks held the first Olympics"], ["Which happened LAST?", "Smartphones were invented", "Candles were used|Paper was invented"], ["Which happened FIRST?", "Writing was invented", "TV was invented|Airplanes flew"]])
  ];
  l2.push(LS("Mixed practice", MX(l2, [1, 4, 6, 10, 11])));
  l2.push(LS("Level 2 Challenge", MX(l2, [2, 3, 7, 9, 12, 13, 16, 17])));

  // ================= LEVEL 3 =================
  const l3 = [
    M("Ancient China: where?", [
      ["Where is China?", "🗺️", "China is a big country in <b>Asia</b>. Its capital is <b>Beijing</b>. Ancient China began thousands of years ago."],
      ["Emperors", "👑", "Ancient China was ruled by <b>emperors</b>. An emperor was a leader like a king."],
      ["Around China", "🐼 🏞️", "Giant pandas live in China. The Yangtze is a very long river there. People speak Chinese."]],
      ["Think about what you learned in this lesson.", "Think about the country, its animals, its rivers and its famous places.", "Example: Egypt has the Nile and the pyramids. Now do yours."],
      [["China is a country in...", "Asia", "Europe|Africa"], ["The language spoken in China is mostly...", "Chinese", "Greek|Spanish"], ["A long river in China is the...", "Yangtze", "Nile|Amazon"],
       ["The black and white animal that lives in China is the...", "Giant panda", "Polar bear|Kangaroo", "🐼"], ["A famous place in China is the Great...", "Wall", "Sphinx|Pyramid"], ["An emperor is like a...", "King", "Baker|Doctor"], ["The capital of China is...", "Beijing", "Tokyo|Paris"]]),
    M("The Great Wall", [
      ["A very long wall", "🧱", "The <b>Great Wall</b> is a very long wall in China. It is one of the longest walls in the world."],
      ["Built over time", "👷 ⏳", "It took many, many workers and a very long time to build. It is made of stone, brick and earth."],
      ["Why?", "🛡️", "The wall was built to help protect the land. Today, people from all over the world visit it."]],
      ["Think about what you learned in this lesson.", "Think about its size, the workers it needed and the years it took.", "Example: a small fence around a yard protects the yard. Something much bigger can protect a whole land. Now do yours."],
      [["The Great Wall is a very long...", "Wall", "River|Road"], ["The Great Wall was built over...", "Many, many years", "One day|One hour"], ["The Great Wall is in which country?", "China", "Egypt|Greece"],
       ["Who built the Great Wall?", "Many workers over a long time", "One person alone|Only robots"], ["The Great Wall was built to help...", "Protect the land", "Grow food|Hold water"], ["The Great Wall is made of...", "Stone, brick and earth", "Ice|Glass"],
       ["How would you describe the Great Wall?", "Very long", "Very short|Tiny"]]),
    B("Paper and writing in China", { intro: "Paper was invented in ancient China. It was lighter and easier to carry than clay or stone, so it helped ideas spread.", tip: "Paper made it easy to share stories and ideas.",
      items: [["paper", "📄", "was invented in ancient China"], ["a scroll", "📜", "is paper rolled up to hold writing"], ["a brush", "🖌️", "was used to write Chinese characters with ink"], ["ink", "🖋️", "is dark liquid used to write or draw"], ["a book", "📚", "has pages of paper with words"]] }),
    B("Silk and the Silk Road", { intro: "Ancient China was the first place to make silk, a soft, shiny cloth. Traders carried silk far away along paths called the Silk Road.", tip: "Silk traveled thousands of miles along the Silk Road.",
      items: [["a silkworm", "🐛", "spins a cocoon from a long thread"], ["silk", "🧣", "is a soft, smooth cloth made from that thread"], ["a mulberry leaf", "🍃", "is what silkworms eat"], ["the Silk Road", "🐪", "was a set of paths where people traveled and traded goods"], ["a trader", "🧑‍💼", "bought and sold goods on long trips"]] }),
    M("Inventions from China", [
      ["Clever inventors", "💡", "People in ancient China invented many useful things."],
      ["The list", "📄 🧭 🪁 🧣", "They invented <b>paper</b>, the <b>compass</b> (it points to north), the <b>kite</b>, and they were the first to make <b>silk</b>. They also used wood blocks to print books."],
      ["Tip", "💡", "Many things we use today began with ideas from China."]],
      ["Think about what you learned in this lesson.", "Think of writing sheets, soft cloth, flying toys and tools for finding direction.", "Example: pyramids were built in Egypt, not in this country. Now do yours."],
      [["Which was invented in ancient China?", "Paper", "Television|Airplane"], ["Which was first made in China?", "Silk cloth", "Light bulb|Telephone"], ["Which tool that helps find directions was first made in ancient China?", "The compass", "The telephone|The pencil"],
       ["Which flies on the wind and was invented in China long ago?", "Kite", "Airplane|Rocket", "🪁"], ["Printing books with wood blocks was first used in...", "China", "Brazil|Canada"], ["Which of these came from ancient China?", "Paper", "Pizza|Skates"]]),
    B("Lunar New Year", { intro: "Lunar New Year is a big celebration in China and in many other places. Families come together and celebrate the start of a new year.", tip: "Celebrations bring families and friends together.",
      items: [["a lantern", "🏮", "is a paper light often seen at Lunar New Year"], ["a dragon dance", "🐉", "is a parade where people hold up a long dragon"], ["a red envelope", "🧧", "holds a gift of money, given for good luck"], ["a dumpling", "🥟", "is a food many families eat to celebrate"]] }),
    M("Ancient Egypt review", [
      ["What we know about Egypt", "🔺", "Ancient Egypt was beside the <b>Nile</b> river in Africa. It had pharaohs, pyramids, hieroglyphs and papyrus."],
      ["Giza", "🦁", "The Great Pyramid is at <b>Giza</b>. Near it is the <b>Sphinx</b>, a statue with a lion's body."],
      ["The Nile gift", "🌊", "The Nile flooded each year and left rich soil, so farmers could grow food."]],
      ["Think back to the lessons about Egypt.", "Think about the Nile, the pyramids and the writing.", "Example: pharaohs were the rulers and the Nile was the river. Now do yours."],
      [["The Egyptians wrote with...", "Hieroglyphs", "Braille|Morse code"], ["Pyramids were built for the...", "Pharaohs", "Farmers|Sailors"], ["The Nile flooded each year and left rich...", "Soil", "Gold|Snow"],
       ["Which plant did Egyptians use to make paper-like sheets?", "Papyrus", "Corn|Cactus"], ["The Great Pyramid is at...", "Giza", "Athens|Beijing"], ["The Sphinx has the body of a...", "Lion", "Camel|Bird", "🦁"],
       ["Which two things go together for ancient Egypt?", "Nile and pyramids", "Snow and igloos|Wall and Olympics"]]),
    M("Ancient Greece review", [
      ["What we know about Greece", "🏛️", "Ancient Greece had cities like <b>Athens</b>. The Greeks built temples, held the Olympics and loved theater."],
      ["Myths", "⚡", "Greek <b>myths</b> are old stories about gods, heroes and brave adventures."],
      ["By the sea", "⛵", "Greece has many islands and a long coast, so Greeks sailed boats a lot."]],
      ["Think back to the lessons about Greece.", "Think about the Olympics, plays, temples and stories.", "Example: the Greeks held the first Olympics. Now do yours."],
      [["Which came from ancient Greece?", "The Olympic Games", "Fireworks|Pizza"], ["Ancient Greek actors wore...", "Masks", "Roller skates|Winter coats"], ["The Parthenon is a famous temple in...", "Athens", "Cairo|Beijing"],
       ["Greek myths are...", "Old stories about heroes and gods", "Math rules|Maps"], ["Who ran in the first Olympic Games?", "Greek athletes", "Robots|Astronauts"], ["Athens was a famous Greek...", "City", "Ocean|Desert"],
       ["Greeks sailed a lot because Greece has many...", "Islands and coasts", "Deserts|Glaciers"]]),
    B("Ancient Rome", { intro: "Ancient Rome began in the city of Rome, in the country we now call Italy. Romans built things that helped lots of people.", tip: "The Romans were great builders.",
      items: [["Rome", "🏛️", "is the capital city of Italy and was the center of ancient Rome"], ["a Roman road", "🛣️", "was long and straight so people could travel far"], ["an aqueduct", "🌉", "carried water across the land on stone arches"], ["Latin", "🗣️", "was the language of the Romans"], ["a mosaic", "🎨", "is a picture made from little tiles"]] }),
    M("Which ancient place?", [
      ["Match it up", "🧩", "Each ancient place is famous for its own things."],
      ["Egypt, China, Greece, Rome", "🔺 🧱 🏅 🛣️", "Egypt: pyramids and hieroglyphs. China: the Great Wall, paper and silk. Greece: the Olympics and theater. Rome: roads and aqueducts."],
      ["Tip", "💡", "Make a picture in your mind for each place to remember them."]],
      ["Think about what each place is famous for.", "Pyramids, the Great Wall, the Olympics, roads and aqueducts each belong to one place.", "Example: the Sphinx is in Egypt, and silk came from China. Now do yours."],
      [["Pyramids are in ancient...", "Egypt", "Greece|China"], ["The Great Wall is in ancient...", "China", "Egypt|Greece"], ["The first Olympics were in ancient...", "Greece", "China|Egypt"],
       ["Hieroglyphs are from ancient...", "Egypt", "Rome|China"], ["Paper and silk came from ancient...", "China", "Greece|Egypt"], ["Aqueducts and long straight roads are from ancient...", "Rome", "Egypt|China"],
       ["Theater masks are from ancient...", "Greece", "China|Egypt"]]),
    B("More inventors", { intro: "Many inventors helped people in different ways. Some helped people read, some helped doctors, and some made travel safer.", tip: "Inventions often help people with a need.",
      qa: c => `Which inventor ${c}?`, qb: n => `Finish the sentence: ${n} ...`, qc: "Which inventor is linked to this invention?",
      items: [["Louis Braille", "👆", "made a way for blind people to read by touch"], ["Alexander Fleming", "💊", "found penicillin, a medicine that fights germs"], ["Samuel Morse", "📡", "made a way to send messages using dots and dashes"], ["Mary Anderson", "🌧️", "invented the windshield wiper"], ["Johannes Gutenberg", "🖨️", "built a printing press in Europe"]] }),
    B("Inventions that changed life", { intro: "Some inventions were so helpful that they changed how everyone lives.", tip: "A good invention helps lots of people.",
      qa: c => `Which invention ${c}?`, qb: n => `Finish the sentence: ${cap(n)} ...`, qc: "Which invention is this?",
      items: [["the wheel", "🛞", "helps carry heavy things and makes vehicles roll"], ["the printing press", "🖨️", "makes many copies of books fast"], ["the light bulb", "💡", "lets us see at night"], ["the telephone", "📞", "lets us talk to people far away"], ["the airplane", "✈️", "flies people across the world"], ["the computer", "💻", "helps us write, learn and play"]] }),
    B("Explorers of land, sea and sky", { intro: "Explorers have crossed oceans, climbed mountains and gone into space. Each one learned something new about our world.", tip: "Explorers help us learn about our world.",
      qa: c => `Which explorer ${c}?`, qb: n => `Finish the sentence: ${n} ...`, qc: "Which explorer goes with this picture?",
      items: [["Marco Polo", "🐪", "was a trader from Italy who traveled all the way to China"], ["Ferdinand Magellan", "🚢", "started the first trip around the world by ship"], ["Yuri Gagarin", "🚀", "was the first person to travel into space"], ["Roald Amundsen", "❄️", "was the first to reach the South Pole"], ["Jacques Cousteau", "🐠", "explored the oceans and made films about the sea"]] }),
    B("Leaders in history", { intro: "Some leaders from history are remembered for how they helped their countries and people. Here are a few.", tip: "Leaders are remembered for the things they did to help others.",
      qa: c => `Which leader ${c}?`, qb: n => `Finish the sentence: ${n} ...`, qc: "Which leader goes with this picture?",
      items: [["George Washington", "🎩", "was the first president of the United States"], ["Abraham Lincoln", "🪙", "was a United States president who is pictured on the penny"], ["Martin Luther King Jr.", "🕊️", "led peaceful marches for fair treatment of everyone"], ["Cleopatra", "👑", "was a famous queen of ancient Egypt"], ["Nelson Mandela", "🌍", "became president of South Africa and worked for fairness"]] }),
    M("National symbols", [
      ["Symbols of a country", "🗽", "Countries have symbols that people know. The <b>Statue of Liberty</b> was a gift from France to the United States. It stands in New York Harbor."],
      ["More U.S. symbols", "🦅 🔔", "The <b>bald eagle</b> is the national bird of the United States. The <b>Liberty Bell</b> is in Philadelphia."],
      ["The flag", "🏳️", "The U.S. flag has <b>50 stars</b> and <b>13 stripes</b>. The stars stand for the states and the stripes stand for the first thirteen states."]],
      ["Think about the symbols you learned.", "Think about where each symbol is or what it stands for.", "Example: the Eiffel Tower is a symbol of France. Now do yours."],
      [["The Statue of Liberty was a gift to the United States from...", "France", "Egypt|Brazil"], ["The Statue of Liberty stands in the harbor of which city?", "New York", "Dallas|Seattle"], ["The bald eagle is the national bird of the...", "United States", "China|Egypt", "🦅"],
       ["The Liberty Bell is in which city?", "Philadelphia", "Chicago|Denver", "🔔"], ["The U.S. flag has how many stars?", "50", "13|100"], ["The U.S. flag has how many stripes?", "13", "50|7"],
       ["Independence Day celebrates the day the United States...", "Said it was its own country", "Built its first school|Won a race"]]),
    M("Dates and timelines", [
      ["Years on a timeline", "📅", "Years are numbers. A smaller year number happened earlier. 1900 was earlier than 2000."],
      ["Big time words", "10 · 100 · 1,000", "A <b>decade</b> is 10 years. A <b>century</b> is 100 years. A <b>millennium</b> is 1,000 years."],
      ["Tip", "💡", "Think of \"cent\" in century like 100 cents in a dollar. A decade has \"dec\" like ten."]],
      ["Think about which number is smaller or bigger.", "On a timeline, smaller year numbers come earlier. For time words, think of cents in a dollar for century.", "Example: 1800 is earlier than 1900. A decade is shorter than a century. Now do yours."],
      [["Which year came FIRST?", "1900", "1950|2000"], ["A decade is...", "10 years", "100 years|1 year"], ["A century is...", "100 years", "10 years|1,000 years"],
       ["Which year came FIRST: 1776 or 1969?", "1776", "1969"], ["Which year is LATER?", "2020", "1999|1980"], ["A millennium is...", "1,000 years", "10 years|100 years"], ["Which year is EARLIER?", "1850", "1990|2015"]]),
    M("Clues about the past", [
      ["How do we know?", "🔍", "Nobody alive today saw ancient Egypt. So how do we know about it? We find <b>clues</b>."],
      ["Kinds of clues", "📷 ✉️ 🏺", "Clues can be photos, letters, diaries, tools, buildings and artifacts."],
      ["People who help", "⛏️", "<b>Archaeologists</b> dig carefully to find old objects. <b>Historians</b> read and study what was found."]],
      ["Think about what can show us the past.", "Old objects and writing are clues to what life was like.", "Example: an old photo shows what clothes people wore. Now do yours."],
      [["Which can tell us about the past?", "A diary from long ago", "Tomorrow's weather|A new toy"], ["An artifact is...", "An old object made by people", "A new video game|A kind of weather"], ["Old photographs, letters and tools are...", "Clues about the past", "Garbage|Toys only"],
       ["Who digs carefully to find old objects?", "Archaeologists", "Chefs|Mail carriers"], ["A good way to learn about your family's past is to...", "Ask your grandparents", "Ask a rock|Guess"], ["Why do museums keep old things safe?", "So we can learn from them", "So nobody can see them|Because they are new"]]),
    M("Then and now", [
      ["Changes over time", "🌾 → 🏙️", "Long ago, most people lived on farms. Today, many people live in towns and cities."],
      ["New ways", "🐎 → ✈️ · ✉️ → 📱", "Travel and talking to faraway people has changed a lot. Planes and phones help us."],
      ["Things that stay the same", "👨‍👩‍👧", "Some things stay the same, like families caring for each other and people telling stories."]],
      ["Think about what changed and what stayed the same.", "New machines change many parts of life. People still need food, homes and friends.", "Example: people long ago and today both love to tell stories. Now do yours."],
      [["Long ago, most people lived on...", "Farms", "Skyscrapers|Spaceships"], ["Today, many people live in...", "Towns and cities", "Caves only|Tents only"], ["Which helps people today travel fast across oceans?", "Airplanes", "Wagons|Rowboats"],
       ["Long ago, to talk to someone far away you would...", "Write a letter", "Send a video|Use a smartphone"], ["Which has changed a lot since long ago?", "How we travel", "The sun rising in the morning|That water is wet"], ["Some things stay the same over time, like...", "Families caring for each other", "Smartphones|Airplanes"]])
  ];
  l3.push(LS("Mixed practice", MX(l3, [0, 1, 6, 7, 9])));
  l3.push(LS("Level 3 Challenge", MX(l3, [2, 3, 4, 8, 11, 12, 13, 15])));

  return { 1: l1, 2: l2, 3: l3 };
})();
