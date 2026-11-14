// Mind Lab Reading, levels 13-15 (6th grade, 7th grade first half). 20 lessons each.
(() => {
  const T = (h, v, t) => ({ h, v, t });
  const rest = (arr, x, n) => shuf(arr.filter(y => y !== x)).slice(0, n);
  const mkL = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [T("Review time!", "🔄", "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz.")].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const S = (v, ...a) => a.map(([h, t], i) => T(h, i ? ["✏️", "💡", "⭐"][(i - 1) % 3] : v, t));
  const mk = (title, f, slides) => mkL(title, f, slides);
  // rows: [text, right, wrong, wrong, optional visual]; hs = array of 3 hints
  const rq = (rows, hs) => () => {
    const r = pick(rows);
    const q = { text: r[0], choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: typeof hs === "function" ? hs(r) : hs };
    if (r[4]) q.visual = r[4];
    if (r[5]) { q.say = r[5]; q.lang = "en-US"; }
    return q;
  };
  // same question every time; rows are [right, wrong, wrong]
  const oq = (qtext, rows, hs) => rq(rows.map(r => [qtext, r[0], r[1], r[2]]), hs);
  // passage rows: [passage, question, right, wrong, wrong]
  const pq = (rows, hs) => rq(rows.map(r => [`<i>${r[0]}</i><br><br>${r[1]}`, r[2], r[3], r[4]]), hs);
  // adds a speak button: rows may carry a 6th item (the word to say)
  const say = f => () => f();
  const L13 = [], L14 = [], L15 = [];

  // ================= LEVEL 13 =================
  L13.push(mk("Greek roots: astro, zoo, psych, phil", rq([
      ["The Greek root <b>astro</b> is in <i>astronaut</i> and <i>astronomy</i>. What does it mean?", "star", "water", "animal"],
      ["The Greek root <b>zoo</b> is in <i>zoology</i>. What does it mean?", "animal", "star", "mind"],
      ["The Greek root <b>psych</b> is in <i>psychology</i>. What does it mean?", "mind", "animal", "love"],
      ["The Greek root <b>phil</b> is in <i>bibliophile</i> (a person who loves books). What does it mean?", "love", "fear", "book"],
      ["The Greek root <b>meter</b> is in <i>speedometer</i> and <i>barometer</i>. What does it mean?", "measure", "speed", "weather"],
      ["The Greek root <b>anthrop</b> is in <i>anthropology</i>. What does it mean?", "human", "ancient", "ape"],
      ["The Greek root <b>demo</b> is in <i>democracy</i>. What does it mean?", "people", "money", "rule"],
      ["The Greek root <b>cosm</b> is in <i>cosmos</i> and <i>cosmic</i>. What does it mean?", "universe", "color", "earth"],
      ["Which word means 'a scientist who studies animals'?", "zoologist", "psychologist", "astronomer"],
      ["Which word means 'a person who studies the stars'?", "astronomer", "zoologist", "meteorologist"],
      ["Which word means 'an instrument that measures how far you have walked'?", "pedometer", "astrometer", "zoometer"],
      ["Which word means 'having to do with the mind'?", "psychological", "zoological", "astronomical"]],
    ["A root is a word part with a meaning. Think of a word you know that uses this root, then ask what idea all those words share.", "These roots all come from Greek: <b>astro</b> (a heavenly body), <b>zoo</b> (a living thing), <b>psych</b> (the inside of a person), <b>phil</b> (a feeling), <b>meter</b> (a job for tools), <b>anthrop</b> and <b>demo</b> (about people), <b>cosm</b> (a big place).", "Example: <b>biology</b> is made of <b>bio</b> (life) + <b>logy</b> (study of), so it means the study of life. Break your word in the same way. Now do yours."]),
    S("🔭", ["Greek roots", "Many science words are built from <b>Greek roots</b>. If you know the root, you can guess the word."], ["New roots", "<b>astro</b> = star (<b>astro</b>naut)<br><b>zoo</b> = animal (<b>zoo</b>logy)<br><b>psych</b> = mind (<b>psych</b>ology)<br><b>phil</b> = love (biblio<b>phil</b>e)"], ["More roots", "<b>meter</b> = measure (speedo<b>meter</b>)<br><b>anthrop</b> = human (<b>anthrop</b>ology)<br><b>demo</b> = people (<b>demo</b>cracy)<br><b>cosm</b> = universe (<b>cosm</b>os)"], ["Tip", "Split a long word into parts. <b>Astronomy</b> = star + a word ending for 'study', so it is the study of the stars."])));

  const ABL = [["comfortable", "comfortible", "comfortabel"], ["visible", "visable", "visibel"], ["enjoyable", "enjoyible", "enjoyabel"], ["possible", "possable", "possibel"], ["readable", "readible", "readabel"], ["terrible", "terrable", "terribel"],
    ["flexible", "flexable", "flexibel"], ["breakable", "breakible", "breakabel"], ["audible", "audable", "audibel"], ["reasonable", "reasonible", "reasonabel"], ["horrible", "horrable", "horribel"], ["washable", "washible", "washabel"]];
  L13.push(mk("Spelling -able and -ible", rq(ABL.map(r => ["Which word is spelled correctly?", r[0], r[1], r[2]]),
      ["Both endings sound the same, so look at the part in front of it. Could that part be a word by itself?", "If the front part is a whole word (like a word you could use alone), add <b>-able</b>. If the front part is not a word on its own, it is usually <b>-ible</b>.", "Example: <b>love</b> is a word on its own, so we write <b>lovable</b>. But <b>sens</b> is not a word, so we write <b>sensible</b>. Now do yours."]),
    S("✍️", ["Two endings, one sound", "<b>-able</b> and <b>-ible</b> both mean 'able to be' and sound the same. You must learn which to use."], ["The pattern", "If you can take the ending off and a real word is left, use <b>-able</b>: enjoy<b>able</b>, wash<b>able</b>, comfort<b>able</b>.<br>If what is left is not a word, it is usually <b>-ible</b>: vis<b>ible</b>, poss<b>ible</b>, terr<b>ible</b>."], ["Tip", "-able is much more common. Learn the common -ible words by heart: possible, visible, terrible, flexible, audible, horrible, legible."])));

  const IE = [["receive", "recieve", "receeve"], ["believe", "beleive", "beleave"], ["neighbor", "nieghbor", "nayghbor"], ["weigh", "wiegh", "waigh"], ["ceiling", "cieling", "seiling"], ["piece", "peice", "peece"], ["achieve", "acheive", "achieave"],
    ["deceive", "decieve", "deseive"], ["field", "feild", "fiald"], ["eight", "ieght", "aight"], ["relief", "releif", "releaf"], ["perceive", "percieve", "perseive"], ["freight", "frieght", "fraight"], ["yield", "yeild", "yeeld"]];
  L13.push(mk("Spelling ie and ei", rq(IE.map(r => ["Which word is spelled correctly?", r[0], r[1], r[2]]),
      ["Say the vowel sound out loud. Then look at the letter just before the 'ie' or 'ei'.", "The rhyme: <b>i before e, except after c, or when it says 'ay'</b>. So after c, flip to <b>ei</b>; for the 'ay' sound, use <b>ei</b>; otherwise use <b>ie</b>.", "Example: <b>chief</b> has the 'ee' sound and no c before it, so it is <b>ie</b>. <b>Conceit</b> has a c, so it is <b>ei</b>. <b>Sleigh</b> says 'ay', so it is <b>ei</b>. Now do yours."]),
    S("📏", ["A famous rule", "<b>I before e, except after c, or when sounding like 'ay' as in neighbor and weigh.</b>"], ["See it work", "<b>ie</b>: bel<b>ie</b>ve, ach<b>ie</b>ve, p<b>ie</b>ce, f<b>ie</b>ld.<br><b>ei after c</b>: r<b>ec</b>eive, c<b>ei</b>ling, perc<b>ei</b>ve.<br><b>ei says ay</b>: n<b>ei</b>ghbor, w<b>ei</b>gh, <b>ei</b>ght."], ["Careful", "There are rule-breakers, such as <i>weird</i>, <i>seize</i> and <i>either</i>. Learn those by heart."])));

  const RF = [
    ["She taught ___ to knit.", "herself", "hisself", "themself"], ["The twins made dinner by ___.", "themselves", "theirselves", "theirs"], ["I gave ___ a pat on the back.", "myself", "meself", "mine"], ["The cat licked ___ clean.", "itself", "hisself", "itsself"],
    ["We built the raft ___.", "ourselves", "ourself", "ours"], ["Ben looked at ___ in the mirror.", "himself", "hisself", "his"], ["You should be proud of ___, class.", "yourselves", "yourself's", "yours"],
    ["In <i>She hurt herself on the swing</i>, the pronoun <b>herself</b> is...", "reflexive: it points back to the doer", "intensive: it only adds emphasis", "possessive: it shows ownership"],
    ["In <i>The mayor himself opened the gate</i>, the pronoun <b>himself</b> is...", "intensive: it only adds emphasis", "reflexive: it is the receiver of the action", "possessive: it shows ownership"],
    ["In <i>I made myself a sandwich</i>, the pronoun <b>myself</b> is...", "reflexive: it points back to the doer", "intensive: it only adds emphasis", "a subject"],
    ["In <i>The chef herself tasted the soup</i>, which word is the intensive pronoun?", "herself", "chef", "tasted"]];
  L13.push(mk("Reflexive and intensive pronouns", rq(RF,
      ["These pronouns end in <b>-self</b> or <b>-selves</b>. Ask who they point back to.", "A <b>reflexive</b> pronoun is needed to finish the meaning (the doer is also the receiver). An <b>intensive</b> pronoun just adds emphasis and could be removed. Words like <i>hisself</i> and <i>theirselves</i> are not standard.", "Example: 'The kids dressed ___.' The kids are doing it and receiving it, so use <b>themselves</b>. 'The author ___ signed my book': take out the pronoun and the sentence still works, so it is intensive. Now do yours."]),
    S("🪞", ["-self words", "<b>myself, yourself, himself, herself, itself, ourselves, yourselves, themselves</b>"], ["Reflexive", "A <b>reflexive pronoun</b> points back to the subject: <i>She taught <b>herself</b> to swim.</i> You cannot take it out."], ["Intensive", "An <b>intensive pronoun</b> adds emphasis: <i>The principal <b>herself</b> came.</i> You can take it out and the sentence still works. Never say <i>hisself</i> or <i>theirselves</i>."])));

  L13.push(mk("Prepositional phrases", rq([
      ["Which group of words is the prepositional phrase? <i>The cat slept under the warm blanket.</i>", "under the warm blanket", "The cat slept", "slept under"],
      ["Which group of words is the prepositional phrase? <i>We walked along the river after lunch.</i>", "along the river", "We walked", "river after"],
      ["Which group of words is the prepositional phrase? <i>My brother from Ohio plays the drums.</i>", "from Ohio", "My brother", "plays the drums"],
      ["Which group of words is the prepositional phrase? <i>The bird in the tree sang loudly.</i>", "in the tree", "The bird", "sang loudly"],
      ["In <i>The book on the table is mine</i>, the phrase <b>on the table</b> works as a(n)...", "adjective: it tells which book", "adverb: it tells how", "noun: it names the book"],
      ["In <i>She ran across the field</i>, the phrase <b>across the field</b> works as a(n)...", "adverb: it tells where she ran", "adjective: it describes a noun", "noun: it names the runner"],
      ["In <i>The girl with the red kite waved</i>, the phrase <b>with the red kite</b> works as a(n)...", "adjective: it tells which girl", "adverb: it tells when", "verb: it shows action"],
      ["In <i>We ate dinner before the movie</i>, the phrase <b>before the movie</b> works as a(n)...", "adverb: it tells when we ate", "adjective: it describes dinner only", "noun: it names the meal"],
      ["Which word begins a prepositional phrase?", "beneath", "quickly", "because"],
      ["Which of these is NOT a preposition?", "slowly", "between", "toward"],
      ["Which group of words is the prepositional phrase? <i>Everyone cheered for the winners.</i>", "for the winners", "Everyone cheered", "cheered for"]],
    ["A prepositional phrase starts with a preposition (a word like in, on, under, of, from) and ends with a noun.", "Find the preposition, then find the noun that ends the phrase. An adjective phrase tells <i>which one</i> about a noun. An adverb phrase tells <i>where, when or how</i> about a verb.", "Example: in <i>The key to the shed is lost</i>, the phrase is <b>to the shed</b>. It tells which key, so it acts like an adjective. Now do yours."]),
    S("📍", ["Preposition + noun", "A <b>prepositional phrase</b> begins with a <b>preposition</b> and ends with a noun or pronoun: <b>under</b> the <b>bridge</b>, <b>after</b> <b>school</b>."], ["Two jobs", "As an <b>adjective</b> it tells which one: the book <b>on the shelf</b>.<br>As an <b>adverb</b> it tells where, when or how: we met <b>at noon</b>."], ["Tip", "A phrase has no subject and verb of its own. It is just a helper that adds detail."])));

  L13.push(mk("Independent and dependent clauses", rq([
      ["Because it rained all day", "dependent clause", "independent clause", "just a phrase"], ["The dog barked at the mail carrier", "independent clause", "dependent clause", "just a phrase"],
      ["When the bell rang", "dependent clause", "independent clause", "just a phrase"], ["We went home", "independent clause", "dependent clause", "just a phrase"],
      ["Although she was tired", "dependent clause", "independent clause", "just a phrase"], ["After lunch", "just a phrase", "independent clause", "dependent clause"], ["Under the old bridge", "just a phrase", "independent clause", "dependent clause"],
      ["If you finish early", "dependent clause", "independent clause", "just a phrase"], ["Birds sing at dawn", "independent clause", "dependent clause", "just a phrase"], ["Since we moved here", "dependent clause", "independent clause", "just a phrase"],
      ["Mia painted the fence", "independent clause", "dependent clause", "just a phrase"], ["With my best friend", "just a phrase", "independent clause", "dependent clause"]].map(r => ["What kind of word group is this? <b>" + r[0] + "</b>", r[1], r[2], r[3]]),
    ["Look for a subject and a verb. Then ask: does it make a complete thought on its own?", "An <b>independent clause</b> has a subject and a verb and can stand alone. A <b>dependent clause</b> has a subject and a verb but starts with a word like because, when, although, if or since, so it cannot stand alone. A <b>phrase</b> has no subject-and-verb pair.", "Example: <b>Unless you hurry</b> has a subject (you) and a verb (hurry) but leaves you waiting for more, so it is dependent. <b>Near the barn</b> has no subject and verb, so it is a phrase. Now do yours."]),
    S("🧱", ["Clauses", "A <b>clause</b> is a group of words with a subject and a verb. It can be independent or dependent."], ["Independent", "An <b>independent clause</b> is a complete sentence: <i>The team won.</i>"], ["Dependent", "A <b>dependent clause</b> starts with a word like <i>because, when, although, if, since</i>. It needs help: <i>Because the team won</i>... what happened?"], ["Join them", "Put them together: <i>Because the team won, we cheered.</i> Add a comma after a dependent clause that comes first."])));

  const ADJO = [["a lovely old wooden chair", "an old wooden lovely chair", "a wooden lovely old chair"], ["two big brown dogs", "two brown big dogs", "big two brown dogs"], ["a tiny round silver coin", "a silver round tiny coin", "a round tiny silver coin"],
    ["a delicious Italian pizza", "an Italian delicious pizza", "a pizza Italian delicious"], ["my favorite red jacket", "my red favorite jacket", "a red my favorite jacket"], ["a small square cardboard box", "a cardboard small square box", "a square cardboard small box"],
    ["three tall green trees", "green three tall trees", "tall three green trees"], ["a beautiful new blue dress", "a blue new beautiful dress", "a new beautiful blue dress"], ["a huge gray stone castle", "a stone gray huge castle", "a gray huge stone castle"], ["a shiny new gold watch", "a gold shiny new watch", "a new gold shiny watch"]];
  L13.push(mk("Adjective order", rq(ADJO.map(r => ["Which phrase puts the adjectives in the order that sounds natural?", r[0], r[1], r[2]]),
      ["Read each choice out loud. Native English speakers follow an order without thinking about it.", "A common order is: <b>number or opinion, size, age, shape, color, origin, material</b>, then the noun.", "Example: 'a cute little gray kitten' follows opinion, size, color. 'a gray little cute kitten' sounds wrong. Now do yours."]),
    S("🔢", ["A secret order", "When you use more than one adjective, English likes them in a certain order."], ["The order", "<b>opinion</b> (lovely) → <b>size</b> (big) → <b>age</b> (old) → <b>shape</b> (round) → <b>color</b> (red) → <b>origin</b> (Italian) → <b>material</b> (wooden) → noun."], ["Try it", "<i>a lovely little old round brown wooden table</i> is too long, but each pair in it keeps the order. Trust your ear and check against the list."])));

  const CI = [
    ["Honeybees are very important. They carry pollen from flower to flower, which helps plants make fruit and seeds. About one third of the food we eat depends on bees.", "Honeybees help plants and our food supply.", "Honeybees live in hives.", "Fruit is sweet and healthy."],
    ["Sleep matters for kids. A rested brain remembers lessons better. Rested kids also feel happier, and their bodies grow and heal during the night.", "Kids need enough sleep to learn, feel good and grow.", "Brains remember lessons.", "Some kids stay up late."],
    ["A rainforest is full of life. Thousands of kinds of insects, birds and plants live there. Tall trees make a roof called the canopy, and many animals never touch the ground.", "Rainforests are home to a huge variety of living things.", "The canopy is made of tall trees.", "Birds fly high in the sky."],
    ["Libraries offer much more than books. You can borrow movies, join a coding club, use a computer or hear a story read aloud, all for free.", "Libraries offer many free services besides books.", "Libraries have computers.", "Story time is fun."],
    ["Exercise helps your whole body. It makes your heart strong, builds bones and muscles and can lift your mood. Even a short walk each day counts.", "Regular exercise is good for your body and mood.", "A walk takes ten minutes.", "Bones are hard."],
    ["The Moon changes shape in the sky. First you see a thin crescent, then a half circle, then a full circle, and then it shrinks again. The cycle takes about a month.", "The Moon seems to change shape in a cycle each month.", "A full Moon is round.", "The Moon is far away."],
    ["Recycling saves resources. Used paper can be turned into new paper, so fewer trees are cut. Metal cans can be melted and used again, which saves energy.", "Recycling helps save resources and energy.", "Paper comes from trees.", "Cans are made of metal."],
    ["Wolves work as a team. They hunt together, share food and take care of the pups as a pack. Each wolf has a role in keeping the group safe.", "Wolves live and work together in packs.", "Wolves hunt.", "Pups are young wolves."]];
  L13.push(mk("Central idea and details", pq(CI.map(r => [r[0], "What is the central idea of this passage?", r[1], r[2], r[3]]),
      ["The central idea is the big point that the whole passage is about. Details are the smaller pieces.", "Ask: what do all the sentences have in common? The right answer covers the whole passage, not just one detail. Wrong choices are often too small, or only one detail.", "Example: 'Dogs can smell illness, find lost people and guide the blind.' The central idea is that dogs do many helpful jobs, not just one of those jobs. Now do yours."]),
    S("🎯", ["The big point", "The <b>central idea</b> is the most important point of a passage. It is what the writer wants you to remember."], ["Details help", "<b>Supporting details</b> are facts, examples and reasons that back up the central idea."], ["Find it", "Ask: What is this mostly about? Then check: do all the details fit? If a choice only covers one sentence, it is too small."])));

  const IC = [
    ["Jin slammed the door and stomped up the stairs without a word.", "He is angry or upset.", "He is sleepy.", "He is excited about a surprise."],
    ["Nora checked the clock again and again, tapping her pencil on the desk.", "She is nervous or impatient.", "She is calm and relaxed.", "She is bored with her work."],
    ["Mr. Park always saved the biggest slice of cake for the new neighbor.", "He is generous and kind.", "He is greedy.", "He is forgetful."],
    ["Eli stared at his shoes and mumbled, 'It was nothing,' when they handed him the award.", "He is shy or modest.", "He is bragging.", "He is angry."],
    ["Zara read the map twice, packed extra water and wrote down every turn before they left.", "She is careful and well prepared.", "She is careless.", "She is lazy."],
    ["'I can fix it,' Leo said, rolling up his sleeves for the fifth time, even though the bike still would not move.", "He is determined and does not give up.", "He is easily discouraged.", "He is bored."],
    ["The new girl sat alone, hugging her backpack and watching the other kids laugh.", "She feels lonely or nervous.", "She feels proud.", "She feels furious."],
    ["Grandpa laughed so hard that he had to wipe his eyes, and then he told the joke again.", "He is cheerful and has a good sense of humor.", "He is grumpy.", "He is confused."]];
  L13.push(mk("Showing what a character is like", pq(IC.map(r => [r[0], "What does this tell you about the character?", r[1], r[2], r[3]]),
      ["The writer does not say it directly. Look at what the character does, says or thinks.", "Actions, words and thoughts are clues. Ask: what kind of person would act this way? Then pick the trait that fits all the clues.", "Example: 'Maya returned the lost wallet with every dollar still inside.' Her action shows she is honest. Now do yours."]),
    S("🕵️", ["Direct and indirect", "With <b>direct characterization</b> the writer tells you: <i>Sam is brave.</i>"], ["Indirect", "With <b>indirect characterization</b> the writer shows you through the character's <b>actions, words, thoughts and looks</b>, and what others say about them."], ["Be a detective", "Gather the clues and decide: <i>He jumped in to save the puppy</i> shows he is brave without saying so."])));

  const SET = [
    ["The old house creaked in the howling wind. Rain tapped the broken windows, and the lights flickered and went out.", "It creates a spooky, tense mood.", "It creates a cheerful, relaxed mood.", "It creates a silly mood."],
    ["Sunlight spilled over the meadow, where wildflowers swayed and bees hummed lazily.", "It creates a calm, peaceful mood.", "It creates a frightening mood.", "It creates a rushed, stressful mood."],
    ["The market buzzed with shouting sellers, crowded stalls and the smell of fresh bread.", "It creates a busy, lively mood.", "It creates a lonely mood.", "It creates a sleepy mood."],
    ["Snow had buried the cabin. The wind howled and the last log in the fireplace was almost gone.", "It shows the characters face a hard, risky situation.", "It shows the characters are on a beach holiday.", "It shows it is a hot summer day."],
    ["The spaceship's hallways were silent and dim. Only one red light blinked, far away.", "It creates an eerie, uneasy mood.", "It creates a funny mood.", "It creates a cozy mood."],
    ["On the first day of spring, the whole village gathered in the square, with ribbons and music everywhere.", "It creates a joyful, festive mood.", "It creates a gloomy mood.", "It creates a fearful mood."],
    ["It was 1850, and the wagon rolled slowly across a dry, dusty trail. The travelers had no map and little water.", "The time and place show the characters face hardship.", "The time and place show the story is about a modern city.", "The time and place show a rich vacation."],
    ["The desert sun burned overhead. There was no shade, and the water bottle was nearly empty.", "The setting creates a problem for the character to solve.", "The setting makes the story funny.", "The setting has nothing to do with the plot."]];
  L13.push(mk("How setting shapes a story", pq(SET.map(r => [r[0], "What does the setting do in this passage?", r[1], r[2], r[3]]),
      ["Setting is the time and place of a story. Think about how the place makes you feel and what trouble it might cause.", "Look at the details: weather, light, sounds and smells. They set the mood. The place or time can also create a problem for the characters.", "Example: 'Fog covered the lonely road, and the street lamps were broken.' This sets a mysterious, uneasy mood. Now do yours."]),
    S("🏞️", ["Where and when", "The <b>setting</b> is the time and place where a story happens. It does more than say where."], ["Mood", "Setting details make a <b>mood</b>: a stormy night feels tense, a sunny meadow feels peaceful."], ["Problems", "Setting can cause trouble too: a blizzard, a desert or a long ago time can create problems for the characters."])));

  const SD = [
    ["The bees buzzed and the bacon sizzled.", "onomatopoeia", "assonance", "repetition"], ["Boom! Crash! Splash!", "onomatopoeia", "alliteration", "repetition"],
    ["The deep green sea gleamed beneath me.", "assonance", "onomatopoeia", "alliteration"], ["Sally sells seashells by the seashore.", "alliteration", "assonance", "onomatopoeia"],
    ["The wind was cold, cold, cold, so very cold.", "repetition", "onomatopoeia", "assonance"],
    ["The rain went drip, drop, drip on the tin roof.", "onomatopoeia", "assonance", "alliteration"], ["Slow rolls the cold road home.", "assonance", "onomatopoeia", "repetition"],
    ["A lump of gum stuck to my thumb.", "assonance", "alliteration", "onomatopoeia"], ["I will not give up. I will not give in. I will not quit.", "repetition", "assonance", "alliteration"]];
  L13.push(mk("Sound devices", rq(SD.map(r => ["<i>" + r[0] + "</i><br><br>Which sound device is the best name for this?", r[1], r[2], r[3]]),
      ["Read it aloud and listen. What is the same, or what does the sound imitate?", "<b>Onomatopoeia</b>: words that sound like noise. <b>Alliteration</b>: same starting consonant sounds. <b>Assonance</b>: same vowel sounds inside words. <b>Repetition</b>: the same words again.", "Example: 'The tick of the clock' uses a word that imitates a noise, so that is onomatopoeia. 'Fresh green leaves' repeats the long e vowel sound, so that is assonance. Now do yours."]),
    S("🔊", ["Playing with sounds", "Poets and storytellers use <b>sound devices</b> to make language musical."], ["The list", "<b>Onomatopoeia</b>: sound words (<i>buzz, splash</i>).<br><b>Alliteration</b>: same starting sound (<i>big blue boat</i>).<br><b>Assonance</b>: same vowel sound (<i>green sea</i>)."], ["More", "<b>Repetition</b>: repeating words for effect (<i>cold, cold, cold</i>)."])));

  L13.push(mk("Paraphrasing", rq([
      ["Which sentence is the best paraphrase of: <i>The enormous storm forced all the campers to leave early.</i>", "A huge storm made the campers go home sooner.", "The enormous storm forced all the campers to leave early.", "The storm was small, so the campers stayed."],
      ["Which sentence is the best paraphrase of: <i>The librarian recommended a thrilling mystery to the young reader.</i>", "The librarian suggested an exciting detective book to the child.", "The librarian told the child to stop reading mysteries.", "The librarian recommended a thrilling mystery to the young reader."],
      ["Which sentence is the best paraphrase of: <i>Honeybees communicate by dancing.</i>", "Bees pass on messages with special movements.", "Bees dance because they are happy about honey.", "Honeybees communicate by dancing."],
      ["Which sentence is the best paraphrase of: <i>The museum opens at nine and closes at five.</i>", "You can visit the museum between nine and five.", "The museum is open all night.", "The museum opens at nine and closes at five."],
      ["Which sentence is the best paraphrase of: <i>Plants need sunlight, water and air to grow.</i>", "To grow, plants must get light, water and air.", "Plants grow only in the dark.", "Plants need sunlight, water and air to grow."],
      ["Which sentence is the best paraphrase of: <i>The runner was exhausted after the long race.</i>", "The athlete was very tired once the lengthy race was over.", "The runner won the long race.", "The runner was exhausted after the long race."],
      ["Which describes a good paraphrase?", "It keeps the meaning but uses your own words.", "It copies the sentence word for word.", "It changes the meaning to your opinion."],
      ["A paraphrase of a source should be followed by...", "a note saying where the idea came from", "nothing, because the words are yours", "a different idea"]],
    ["Read the original and say it to yourself in your own words. A paraphrase keeps the same meaning.", "Check each choice: does it keep the same meaning? Does it use mostly different words? A copy is not a paraphrase, and a changed meaning is not one either.", "Example: <i>The cat leaped onto the high shelf.</i> Paraphrase: <i>The cat jumped up to the top shelf.</i> Same meaning, new words. Now do yours."]),
    S("🔁", ["Say it your way", "To <b>paraphrase</b> is to retell an idea in your own words, keeping the meaning the same."], ["How to do it", "1. Read and understand it.<br>2. Look away and say it in your own words.<br>3. Compare: same meaning? Different words?"], ["Give credit", "A paraphrase still came from someone else, so name your source. Never just swap one or two words."])));

  L13.push(mk("Skimming and scanning", rq([
      ["You need to find the start time of the school play on a long flyer. Which reading skill is best?", "scanning", "skimming", "reading closely"],
      ["You want a quick idea of what a long article is about before you decide to read it. Which skill?", "skimming", "scanning", "reading closely"],
      ["You are looking for the word <i>volcano</i> in a glossary. Which skill?", "scanning", "skimming", "rereading slowly"],
      ["You have to learn a science chapter for a test. Which skill is best for studying the details?", "reading closely", "skimming", "scanning"],
      ["When you skim, which parts do you mostly read?", "titles, headings and first sentences", "every word", "only the last page"],
      ["When you scan, what do you do?", "look for a key word, name or number", "read every sentence slowly", "guess the answer"],
      ["You need to find the phone number on a page of contacts. Which skill?", "scanning", "skimming", "reading closely"],
      ["You are choosing between two websites for a report and want the general idea of each. Which skill?", "skimming", "scanning", "memorizing"],
      ["Which tool helps you scan a book for a topic?", "the index", "the cover art", "the dedication"]],
    ["Think about what you need: the overall idea, one fact, or every detail.", "<b>Skimming</b> = quickly getting the main idea. <b>Scanning</b> = hunting for a specific fact. <b>Close reading</b> = reading carefully to understand everything.", "Example: finding the page where a recipe says how long to bake is scanning (look for the number). Reading it before you cook to be sure you understand every step is close reading. Now do yours."]),
    S("👀", ["Three ways to read", "Good readers change how they read depending on their goal."], ["Skim and scan", "<b>Skimming</b>: glance over headings, first sentences and pictures to get the gist.<br><b>Scanning</b>: let your eyes run down the page looking for one key word or number."], ["Slow down", "Use <b>close reading</b> when you must understand and remember, like studying for a test."])));

  const OL = [
    ["In an outline, what do the Roman numerals (I, II, III) usually mark?", "the main topics", "the small details", "the page numbers"],
    ["In an outline, what do the capital letters (A, B, C) under a Roman numeral usually mark?", "subtopics that support the main topic", "new main topics", "the title"],
    ["An outline says <b>I. Mammals</b>. Which belongs under it as <b>A</b>?", "Dogs", "Eagles", "Trout"],
    ["An outline says <b>I. Birds</b>. Which belongs under it as <b>A</b>?", "Penguins", "Whales", "Frogs"],
    ["An outline says <b>I. Planets</b>. Which belongs under it as <b>A</b>?", "Mars", "The Sun", "Comets"],
    ["Which note is better for a study sheet about the water cycle?", "Sun heats water, it evaporates, forms clouds, falls as rain", "The water cycle is a thing that happens in nature every day and it is very interesting to scientists", "Water"],
    ["Good notes are usually...", "short, using key words", "copied word for word", "written without any order"],
    ["Your outline has <b>I. Pets</b> with <b>A. Dogs</b>, <b>B. Cats</b>. Where would <b>Hamsters</b> go?", "C under I", "as a new I", "at the very end after II"],
    ["Why make an outline before writing a report?", "to organize your ideas in order", "to make the report longer", "to avoid doing research"]];
  L13.push(mk("Notes and outlines", rq(OL,
      ["Think about big ideas and small ideas. An outline puts the big ideas first and the small ideas under them.", "Roman numerals show the big topics. Capital letters under them show supporting parts. Then numbers (1, 2, 3) show even smaller details.", "Example: <b>I. Fruits</b>, <b>A. Apples</b>, <b>B. Grapes</b>. 'Red Delicious' could be a smaller detail under Apples, like <b>1</b>. Now do yours."]),
    S("📝", ["Notes", "Good <b>notes</b> are short. Write key words and ideas, not whole sentences."], ["Outlines", "An <b>outline</b> shows how ideas fit together:<br><b>I.</b> Main topic<br>&nbsp;&nbsp;<b>A.</b> Subtopic<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>1.</b> Detail"], ["Why", "Notes and outlines help you remember and plan. Group ideas that belong together."])));

  const PE = [
    ["What does the ellipsis do in: <i>I thought I would win, but...</i>", "shows the sentence trails off", "shows a question", "shows a title"],
    ["A student quotes: <i>The park is clean ... and open daily.</i> What does the ellipsis show?", "some words were left out of the quote", "the writer is excited", "a new paragraph"],
    ["Which part of this sentence is extra information that belongs in parentheses? <i>My dog a beagle named Max loves snow.</i>", "a beagle named Max", "My dog", "loves snow"],
    ["What do parentheses usually hold?", "extra information that is not essential", "the most important idea", "a title"],
    ["Which mark shows that a thought trails off or that words were left out?", "an ellipsis", "parentheses", "brackets"],
    ["In <i>The author was born in 1950 (some say 1951).</i> what do the parentheses do?", "add a side note", "show a quote", "show a question"],
    ["How many dots are in an ellipsis?", "three", "two", "five"],
    ["Brackets [ ] in a quote are used to...", "add the writer's own clarifying word", "show the title", "show who is speaking"],
    ["<i>She [the teacher] smiled.</i> What do the brackets do?", "clarify who 'she' is", "mean the teacher is speaking", "show a mistake"]];
  L13.push(mk("Parentheses, ellipses and brackets", rq(PE,
      ["Look at the little mark and think about what it does to the words around it.", "<b>Parentheses ( )</b> add an extra thought. An <b>ellipsis ...</b> shows words were left out, or that a thought trails off. <b>Brackets [ ]</b> are the writer's own additions inside a quote.", "Example: <i>Our school (built in 1990) is big.</i> The parentheses hold a side detail. Now do yours."]),
    S("✍️", ["Little marks", "Three marks help you add, drop or clarify words."], ["Meanings", "<b>( )</b> add extra info: <i>My cat (age 5) sleeps a lot.</i><br><b>...</b> an ellipsis: <i>Well... maybe.</i> or words cut from a quote.<br><b>[ ]</b> brackets add your own word to a quote: <i>\"He [Sam] left.\"</i>"], ["Tip", "If you remove the words in parentheses, the sentence should still make sense."])));

  const TT = [
    ["How should the title of the book <i>Charlotte's Web</i> be shown in your writing?", "in italics (underlined if handwritten)", "in quotation marks", "in all capital letters"],
    ["How should the title of a poem be shown?", "in quotation marks", "in italics", "with no marks"],
    ["How should the title of a movie be shown?", "in italics (underlined if handwritten)", "in quotation marks", "in brackets"],
    ["How should the title of a song be shown?", "in quotation marks", "in italics", "in all capitals"],
    ["How should the title of a magazine be shown?", "in italics (underlined if handwritten)", "in quotation marks", "in brackets"],
    ["How should the title of a short story be shown?", "in quotation marks", "in italics", "in parentheses"],
    ["How should the title of a chapter in a book be shown?", "in quotation marks", "in italics", "in brackets"],
    ["How should the title of a newspaper article be shown?", "in quotation marks", "in italics", "in all capitals"],
    ["How should the title of a whole TV series be shown?", "in italics (underlined if handwritten)", "in quotation marks", "in parentheses"],
    ["You write about a poem called <i>Dusk</i> that is in a book called <i>Night Poems</i>. Which title gets quotation marks?", "Dusk, the poem", "Night Poems, the book", "both of them"]];
  L13.push(mk("Punctuating titles", rq(TT,
      ["Ask whether it is a big whole thing or a small part of something bigger.", "Titles of <b>long or whole works</b> go in italics. Titles of <b>short works or parts</b> go in quotation marks.", "Example: the book <i>Treasure Island</i> is a whole work (italics), but a chapter in it would be in quotation marks. Now do yours."]),
    S("📚", ["Two ways to mark a title", "Writers mark titles in two different ways."], ["Italics", "Use <b>italics</b> (or underline by hand) for whole works: <i>books, movies, TV shows, magazines, albums, newspapers</i>."], ["Quotation marks", "Use <b>\"quotation marks\"</b> for parts and short works: <i>poems, songs, short stories, chapters, articles, episodes</i>."], ["Tip", "Big thing = italics. Small piece = quotation marks."])));

  const KW = [
    ["Which kind of writing tells a story with characters and events?", "narrative", "expository", "persuasive"],
    ["Which kind of writing explains facts about a topic?", "expository", "narrative", "descriptive"],
    ["Which kind of writing tries to convince you of an opinion?", "persuasive", "narrative", "expository"],
    ["Which kind of writing paints a picture of a person, place or thing with details?", "descriptive", "persuasive", "narrative"],
    ["<i>Our town needs a new skate park, so please vote yes.</i> What kind of writing is this?", "persuasive", "narrative", "descriptive"],
    ["<i>The skate park has three ramps, a bowl and a rail. It is open daily from nine to five.</i> What kind of writing is this?", "expository", "narrative", "persuasive"],
    ["<i>Dana rolled to the top of the ramp, took a breath and dropped in.</i> What kind of writing is this?", "narrative", "expository", "persuasive"],
    ["<i>The concrete bowl glowed orange in the evening light, its walls scratched with wheel marks.</i> What kind of writing is this?", "descriptive", "persuasive", "expository"],
    ["A newspaper news report that tells who, what, when and where is mostly...", "expository", "persuasive", "narrative"]];
  L13.push(mk("Four kinds of writing", rq(KW,
      ["Ask what the writer wants to do: tell a story, explain, convince or describe.", "<b>Narrative</b> tells a story. <b>Expository</b> explains facts. <b>Persuasive</b> convinces. <b>Descriptive</b> creates a picture with sensory details.", "Example: <i>Wear a helmet! It could save your life.</i> The writer wants to convince you, so it is persuasive. Now do yours."]),
    S("🖋️", ["Why people write", "Writing has different <b>purposes</b>. Knowing the purpose helps you read it the right way."], ["The four", "<b>Narrative</b>: tells a story.<br><b>Expository</b>: explains or informs.<br><b>Persuasive</b>: tries to convince.<br><b>Descriptive</b>: paints a picture with details."], ["Mixed", "Many texts mix kinds, but one usually leads. Ask: what is the writer mostly trying to do?"])));

  const ST = [
    ["photograph", "first", "second", "third", "PHO-to-graph"], ["photography", "second", "first", "third", "pho-TOG-ra-phy"], ["computer", "second", "first", "third"], ["elephant", "first", "second", "third"], ["important", "second", "first", "third"],
    ["banana", "second", "first", "third"], ["museum", "second", "first", "third"], ["pencil", "first", "second", "third"], ["potato", "second", "first", "third"], ["vegetable", "first", "second", "third"], ["remember", "second", "first", "third"], ["beautiful", "first", "second", "third"]];
  L13.push(mk("Which syllable is stressed?", say(rq(ST.map(r => ["Which syllable do you say the loudest in <b>" + r[0] + "</b>?", r[1], r[2], r[3], "🥁", r[0]]),
      ["Say the word out loud and tap the table on each syllable. One tap will feel stronger.", "In a pronunciation guide, the stressed syllable is written in capital letters, like <b>BAN-ner</b>. Words can have the stress on different syllables.", "Example: <b>window</b> is said WIN-dow, so the stress is on the first syllable. <b>Guitar</b> is said gi-TAR, so the stress is on the second. Now do yours."])),
    S("🥁", ["Beats in a word", "Every word has <b>syllables</b>, and one is <b>stressed</b>: said louder and longer."], ["See it", "<b>TA</b>-ble (first)<br>a-<b>ROUND</b> (second)<br>ba-<b>NA</b>-na (second)<br><b>EL</b>-e-phant (first)"], ["In a dictionary", "A pronunciation key shows the stress with capitals or a small mark ( ˈ ). Say words aloud to feel the beat."])));

  L13.push(MIX("Mixed practice", L13[0], L13[3], L13[7], L13[11]));
  L13.push(MIX("Level 13 Challenge", L13[1], L13[4], L13[5], L13[8], L13[10], L13[13], L13[15]));

  // ================= LEVEL 14 =================
  L14.push(mk("Latin roots: fract, flu, sci, nat", rq([
      ["The Latin root <b>fract</b> is in <i>fracture</i> and <i>fraction</i>. What does it mean?", "break", "flow", "know"],
      ["The Latin root <b>flu</b> is in <i>fluid</i> and <i>fluent</i>. What does it mean?", "flow", "break", "born"],
      ["The Latin root <b>sci</b> is in <i>science</i> and <i>conscious</i>. What does it mean?", "know", "follow", "close"],
      ["The Latin root <b>nat</b> is in <i>native</i> and <i>nature</i>. What does it mean?", "born", "flow", "die"],
      ["The Latin root <b>mort</b> is in <i>mortal</i> and <i>immortal</i>. What does it mean?", "death", "birth", "break"],
      ["The Latin root <b>clud</b> is in <i>include</i> and <i>exclude</i>. What does it mean?", "close or shut", "flow", "know"],
      ["The Latin root <b>sequ</b> is in <i>sequel</i> and <i>sequence</i>. What does it mean?", "follow", "break", "born"],
      ["The Latin root <b>lect</b> is in <i>collect</i> and <i>select</i>. What does it mean?", "gather or choose", "break", "flow"],
      ["Which word means 'a movie that follows an earlier movie'?", "sequel", "fluid", "native"],
      ["Which word means 'a liquid that flows'?", "fluid", "fraction", "mortal"],
      ["Which word means 'a part broken off from a whole'?", "fraction", "fluent", "science"],
      ["Which word means 'to leave out, to shut out'?", "exclude", "include", "collect"]],
    ["A root is a word part that carries meaning. Think of other words that share the root and what idea they share.", "The roots here mean: break, flow, know, born, death, close, follow, gather. Look at the example words in the question and match the idea they share.", "Example: the root <b>dict</b> means 'say'. <i>Predict</i> means to say before, and <i>dictionary</i> is a book of words and what they say. Share the idea, share the root. Now do yours."]),
    S("🏛️", ["Latin roots", "Many English words come from <b>Latin roots</b>. Each root brings a meaning."], ["New roots", "<b>fract</b> = break (<b>fract</b>ion)<br><b>flu</b> = flow (<b>flu</b>id)<br><b>sci</b> = know (<b>sci</b>ence)<br><b>nat</b> = born (<b>nat</b>ive)"], ["More roots", "<b>mort</b> = death (<b>mort</b>al)<br><b>clud</b> = close (in<b>clud</b>e)<br><b>sequ</b> = follow (<b>sequ</b>el)<br><b>lect</b> = gather, choose (col<b>lect</b>)"], ["Tip", "When you meet a long word, hunt for a root you know. <i>Fluent</i> speakers let words <b>flow</b>."])));

  const PRE = [
    ["What does <b>malfunction</b> mean?", "to work badly", "to work again", "to work well"], ["What does <b>benefit</b> mean?", "a good result or help", "a bad result", "a result after a long time"],
    ["What does <b>contradict</b> mean?", "to say the opposite of", "to say again", "to say before"], ["What does <b>forecast</b> mean?", "to tell what will happen before it does", "to look back", "to make a map"],
    ["What does <b>hyperactive</b> mean?", "too active", "not active", "partly active"], ["What does <b>midway</b> mean?", "in the middle of the way", "at the start of the way", "far away"],
    ["What does <b>malnourished</b> mean?", "poorly fed", "well fed", "fed twice"], ["What does <b>benevolent</b> mean?", "wishing to do good", "wishing to do harm", "wishing to be alone"],
    ["What does <b>foresee</b> mean?", "to see ahead of time", "to see again", "to not see"], ["What does <b>contrary</b> mean?", "going against", "going with", "going over"],
    ["Which word means 'to treat badly'?", "mistreat", "foretreat", "midtreat"], ["Which word means 'a speed that is too high'?", "hyperspeed", "midspeed", "contraspeed"]];
  L14.push(mk("Prefixes mal-, ben-, contra-, fore-, hyper-", rq(PRE,
      ["Take off the front part and say the base word. Then think about what the prefix adds.", "<b>mal-</b> = bad or badly. <b>ben-</b> = good. <b>contra-</b> = against or opposite. <b>fore-</b> = before or ahead. <b>hyper-</b> = over, too much. <b>mid-</b> = middle.", "Example: <b>malware</b> is bad software (mal + ware). <b>Foretell</b> means to tell before it happens (fore + tell). Now do yours."]),
    S("🔠", ["More prefixes", "Prefixes change a word's meaning. Here are some that start many harder words."], ["The list", "<b>mal-</b> bad (<b>mal</b>function)<br><b>ben-</b> good (<b>ben</b>efit)<br><b>contra-</b> against (<b>contra</b>dict)"], ["More", "<b>fore-</b> before (<b>fore</b>cast)<br><b>hyper-</b> over, too much (<b>hyper</b>active)<br><b>mid-</b> middle (<b>mid</b>way)"], ["Tip", "Opposites: <b>mal-</b> and <b>ben-</b> are opposites. <i>Malfunction</i> is bad, <i>benefit</i> is good."])));

  const SUF = [
    ["What does <b>meteorology</b> mean? (the suffix <b>-ology</b> means 'the study of')", "the study of weather and the air", "the study of rocks", "the study of animals"],
    ["What does <b>geology</b> mean?", "the study of the Earth and its rocks", "the study of weather", "the study of the stars"],
    ["The suffix <b>-phobia</b> means...", "fear of", "love of", "study of"], ["What does <b>aquaphobia</b> mean? (<b>aqua</b> = water)", "fear of water", "love of water", "study of water"],
    ["What does <b>claustrophobia</b> mean?", "fear of small closed spaces", "fear of heights", "fear of the dark"], ["What does <b>arachnophobia</b> mean? (<b>arachn</b> = spider)", "fear of spiders", "love of spiders", "study of spiders"],
    ["The suffix <b>-ity</b> turns an adjective into a noun meaning...", "the state or quality of being", "the study of", "fear of"], ["What does <b>curiosity</b> mean?", "the quality of being curious", "the study of curious things", "fear of curious things"],
    ["What does the suffix <b>-ic</b> mean in <i>heroic</i> and <i>artistic</i>?", "like or having to do with", "without", "fear of"], ["What does <b>athletic</b> mean?", "having to do with athletes", "afraid of athletes", "the study of athletes"],
    ["Which word means 'the study of living things'?", "biology", "claustrophobia", "curiosity"], ["Which word means 'the quality of being active'?", "activity", "athletic", "geology"]];
  L14.push(mk("Suffixes -ology, -phobia, -ity, -ic", rq(SUF,
      ["Look at the ending, then at the base part. Put the meanings together.", "<b>-ology</b> = the study of. <b>-phobia</b> = fear of. <b>-ity</b> = the state or quality of being. <b>-ic</b> = like, or having to do with.", "Example: <b>zoology</b> = zoo (animal) + ology (study of) = the study of animals. <b>Heroic</b> = like a hero. Now do yours."]),
    S("🔚", ["Endings with big meanings", "Some word endings are really small word parts with their own meaning."], ["Four endings", "<b>-ology</b> = study of (bi<b>ology</b>)<br><b>-phobia</b> = fear of (claustro<b>phobia</b>)<br><b>-ity</b> = quality of (curios<b>ity</b>)<br><b>-ic</b> = like, having to do with (hero<b>ic</b>)"], ["Build it", "Put roots and endings together: <b>geo</b> (earth) + <b>ology</b> = geology, the study of the Earth."])));

  const EU = [
    ["The store sells 'pre-owned' bikes instead of 'used' bikes.", "euphemism", "slang", "jargon"], ["Our neighbor is 'between jobs.'", "euphemism", "dialect", "jargon"],
    ["'That movie was so rad, dude!'", "slang", "jargon", "euphemism"], ["'Bummer, I missed the bus.'", "slang", "dialect", "euphemism"],
    ["The programmer cleared the cache and fixed the bug.", "jargon", "slang", "euphemism"], ["The chef told the crew to 'fire' the order and 'plate' the dish.", "jargon", "slang", "euphemism"],
    ["'Y'all are welcome to come on in,' she said.", "dialect", "jargon", "euphemism"], ["'I'm fixin' to go to the store,' he said.", "dialect", "euphemism", "jargon"],
    ["The teacher called the test 'a challenge' instead of 'really hard.'", "euphemism", "slang", "dialect"], ["The tech support worker asked about your bandwidth and your firewall.", "jargon", "slang", "dialect"]];
  L14.push(mk("Euphemism, slang, jargon, dialect", rq(EU.map(r => ["<i>" + r[0] + "</i><br><br>What kind of language is this?", r[1], r[2], r[3]]),
      ["Ask who uses this kind of language, and why: to be gentle, to sound casual, to talk shop, or because of where a person lives.", "<b>Euphemism</b>: a gentler way to say something. <b>Slang</b>: casual made-up words. <b>Jargon</b>: special words for one job or hobby. <b>Dialect</b>: the way people in a region or group speak.", "Example: 'The pitcher threw a no-hitter' uses words from baseball, so it is jargon. 'Wicked cool' is slang. Now do yours."]),
    S("🗣️", ["Kinds of language", "People use different kinds of words depending on who they are and who is listening."], ["The four", "<b>Euphemism</b>: a gentler word (<i>pre-owned</i> for used).<br><b>Slang</b>: casual, trendy words (<i>bummer</i>).<br><b>Jargon</b>: job words (<i>cache</i>).<br><b>Dialect</b>: a regional way of speaking (<i>y'all</i>)."], ["Use with care", "Slang and jargon can confuse readers who do not know them. Choose words your audience understands."])));

  L14.push(mk("Gerunds", rq([
      ["<i>Swimming is great exercise.</i> Which word is the gerund?", "Swimming", "great", "exercise"], ["<i>Her favorite hobby is painting.</i> Which word is the gerund?", "painting", "favorite", "hobby"],
      ["Which sentence uses <b>running</b> as a gerund?", "Running keeps me fit.", "The running water was cold.", "She is running to school."],
      ["Which sentence uses <b>singing</b> as a gerund?", "Singing makes her happy.", "The singing bird woke us.", "They are singing a song."],
      ["<i>We enjoy hiking on weekends.</i> Which word is the gerund?", "hiking", "enjoy", "weekends"],
      ["A gerund is a verb form ending in -ing that acts as a...", "noun", "adjective", "adverb"],
      ["<i>Reading before bed helps me relax.</i> What is the gerund?", "Reading", "helps", "relax"],
      ["In <i>Dancing is fun</i>, what job does the gerund <b>Dancing</b> do?", "it is the subject", "it describes a noun", "it shows time"],
      ["<i>My goal is finishing the book.</i> Which word is the gerund?", "finishing", "goal", "book"],
      ["Which sentence uses <b>walking</b> as a gerund?", "Walking is good for your health.", "The walking stick was long.", "He was walking home."],
      ["Which sentence has NO gerund?", "The sleeping cat purred.", "Sleeping is important.", "I love camping."]],
    ["Ask: is the -ing word the name of an activity, used like a noun? Try replacing it with the word 'it' or 'that'.", "A gerund works as a <b>noun</b>: a subject, an object or a complement. If the -ing word describes a noun, or is part of a verb like 'is running', it is NOT a gerund.", "Example: in <i>Baking is relaxing</i>, <b>baking</b> is the subject, so it is a gerund (you could say 'It is relaxing'). In <i>the baking pan</i>, baking describes the pan, so it is not. Now do yours."]),
    S("🏊", ["Verbs doing a noun's job", "A <b>gerund</b> is a verb with <b>-ing</b> that acts like a noun."], ["Examples", "<i><b>Swimming</b> is fun.</i> (subject)<br><i>I love <b>reading</b>.</i> (object)<br><i>My hobby is <b>drawing</b>.</i> (after 'is')"], ["Not gerunds", "<i>He is <b>running</b>.</i> (part of the verb)<br><i>The <b>running</b> water</i> (describes water). These are not gerunds."])));

  L14.push(mk("Participles", rq([
      ["<i>The barking dog woke us.</i> Which word is the participle?", "barking", "dog", "woke"], ["<i>The broken window was fixed.</i> Which word is the participle?", "broken", "window", "fixed"],
      ["Which is the participial phrase? <i>Tired from the hike, Sam slept.</i>", "Tired from the hike", "Sam slept", "the hike"], ["Which is the participial phrase? <i>Smiling at the crowd, the singer waved.</i>", "Smiling at the crowd", "the singer waved", "the crowd"],
      ["A participle works as a(n)...", "adjective", "noun", "adverb"], ["<i>The frozen pond looked like glass.</i> Which word is the participle?", "frozen", "pond", "looked"],
      ["<i>Running down the hill, Ana tripped.</i> What does the participial phrase describe?", "Ana", "the hill", "tripped"], ["<i>Painted bright blue, the fence looked new.</i> What does the participial phrase describe?", "the fence", "the color", "the day"],
      ["<i>The polished floor shone.</i> Which word is the participle?", "polished", "floor", "shone"], ["Which sentence has a participle describing a noun?", "The crying baby needed a nap.", "Crying is natural.", "The baby is crying."],
      ["<i>Surprised by the noise, the cat jumped.</i> Which word names what is surprised?", "the cat", "the noise", "the jump"]],
    ["Ask: which -ing or -ed word is describing a noun? A participle acts like an adjective.", "A participle is a verb form (<b>-ing</b> or <b>-ed</b>/irregular) that describes a noun. A participial phrase adds more words. It describes the noun right next to it.", "Example: in <i>The sleeping puppy yawned</i>, <b>sleeping</b> describes the puppy. In <i>Covered in dust, the book looked old</i>, the phrase describes the book. Now do yours."]),
    S("🧊", ["Verbs that describe", "A <b>participle</b> is a verb form that works as an adjective: <i>the <b>barking</b> dog</i>, <i>the <b>broken</b> toy</i>."], ["Two kinds", "<b>Present participle</b> ends in -ing: <i>falling</i> leaves.<br><b>Past participle</b> often ends in -ed: <i>painted</i> wall, or is irregular: <i>frozen</i> lake."], ["Phrases", "A <b>participial phrase</b> has more words: <i><b>Waving at us</b>, Mia left.</i> Put it right next to the noun it describes."])));

  L14.push(mk("Infinitives", rq([
      ["<i>She wants to learn chess.</i> Which is the infinitive?", "to learn", "She wants", "chess"], ["Which is an infinitive, not a prepositional phrase?", "to run", "to the park", "to my house"],
      ["Which sentence has a prepositional phrase that starts with <b>to</b>, not an infinitive?", "We walked to the lake.", "We like to swim.", "I want to eat."],
      ["An infinitive is <b>to</b> plus the ___ form of a verb.", "base", "past", "-ing"], ["In <i>To win is my dream</i>, the infinitive <b>To win</b> acts as a...", "noun", "adjective", "adverb"],
      ["Which sentence uses an infinitive as a noun?", "To read is my favorite thing.", "I like reading.", "She read it yesterday."], ["In <i>He saved money to buy a bike</i>, what does <b>to buy a bike</b> explain?", "why he saved money", "who saved money", "where he saved"],
      ["Which word group is an infinitive? <i>The best way to learn is to practice.</i>", "to practice", "best way", "is to"], ["Which sentence has an infinitive?", "I need to rest.", "I went to bed.", "I gave it to him."],
      ["Which is NOT an infinitive?", "to the store", "to jump", "to sing"], ["<i>They came to help.</i> What is the infinitive?", "to help", "They came", "came to"]],
    ["Look for the word <b>to</b>. What comes right after it: a verb or a noun?", "An infinitive is <b>to + a verb</b> (to run). A prepositional phrase is <b>to + a noun or pronoun</b> (to the park, to her).", "Example: 'We went to town' has <b>to town</b> (to + noun), not an infinitive. 'We want to leave' has <b>to leave</b> (to + verb), an infinitive. Now do yours."]),
    S("➡️", ["To + verb", "An <b>infinitive</b> is the word <b>to</b> followed by a base verb: <i>to run, to eat, to read</i>."], ["Jobs it can do", "As a <b>noun</b>: <i><b>To learn</b> is fun.</i><br>As an <b>adverb</b>: <i>She saved <b>to buy</b> a bike.</i> (why)"], ["Watch out", "<i>to the park</i> is a prepositional phrase (to + noun). Only <b>to + verb</b> is an infinitive."])));

  L14.push(mk("Misplaced and dangling modifiers", rq([
      ["Which sentence is clear and correct?", "Running for the bus, Mia dropped her backpack.", "Running for the bus, the backpack fell.", "Mia dropped her backpack that was running for the bus."],
      ["Which sentence is clear and correct?", "Walking home, I found a wallet on the sidewalk.", "I found a wallet walking home on the sidewalk.", "Walking home, a wallet was found by the sidewalk."],
      ["Which sentence is clear and correct?", "The boy wearing a red cap kicked the ball.", "The boy kicked the ball wearing a red cap.", "Wearing a red cap, the ball was kicked."],
      ["Which sentence is clear and correct?", "Covered in mud, the dog needed a bath.", "Covered in mud, a bath was needed for the dog.", "The dog needed a bath covered in mud."],
      ["Which sentence is clear and correct?", "After eating lunch, we went to the park.", "After eating lunch, the park was fun.", "Eating lunch, the park was our next stop."],
      ["Which sentence is clear and correct?", "Driving to school, we saw a rainbow.", "We saw a rainbow driving to school.", "Driving to school, a rainbow appeared to us."],
      ["Which sentence is clear and correct?", "Slicing the apple, Dad found a worm.", "Slicing the apple, a worm was found.", "Dad found a worm slicing the apple."],
      ["Which sentence is clear and correct?", "Reading the story aloud, Ella made funny voices.", "Reading the story aloud, funny voices were made.", "Ella made, reading the story aloud, funny voices."]],
    ["Find the describing phrase and ask: who or what is it describing? It should sit right next to that person or thing.", "A <b>dangling modifier</b> has no clear noun to describe. A <b>misplaced modifier</b> sits next to the wrong word. The describing phrase must be followed by the person or thing it really describes.", "Example: 'Barking loudly, the mailman ran from the dog' makes it sound like the mailman barked. Better: 'Barking loudly, the dog chased the mailman.' Now do yours."]),
    S("🧩", ["Put describers next to what they describe", "A <b>modifier</b> (a describing word or phrase) should be next to the word it describes."], ["Funny mistakes", "<i>I saw a bird flying to the store.</i> Is the bird going shopping, or am I?<br>Clearer: <i>As I walked to the store, I saw a bird.</i>"], ["Tip", "After an opening phrase and a comma, put the doer of the action first. <i>Tired after practice, Leo fell asleep.</i>"])));

  L14.push(mk("Combining sentences", rq([
      ["Combine: <i>Mia loves art. Mia paints every day.</i>", "Mia loves art, so she paints every day.", "Mia loves art, she paints every day.", "Mia loves art because she paints every day."],
      ["Combine: <i>It was raining. We stayed inside.</i>", "Because it was raining, we stayed inside.", "It was raining, we stayed inside.", "Although it was raining, we stayed inside."],
      ["Combine: <i>Sam is tall. Sam plays basketball.</i>", "Sam, who is tall, plays basketball.", "Sam is tall, plays basketball.", "Sam who tall plays basketball."],
      ["Combine: <i>The cake was big. The cake was chocolate.</i>", "The big cake was chocolate.", "The cake was big the cake was chocolate.", "The cake big chocolate was."],
      ["Combine: <i>We finished the project. We were tired.</i>", "We finished the project even though we were tired.", "We finished the project because we were tired.", "We finished the project, we were tired."],
      ["Combine: <i>I ran fast. I missed the bus.</i>", "I ran fast, but I still missed the bus.", "I ran fast, so I missed the bus.", "I ran fast I missed the bus."],
      ["Combine: <i>Dad cooked dinner. Dad washed the dishes.</i>", "Dad cooked dinner and washed the dishes.", "Dad cooked dinner because washed the dishes.", "Dad cooked dinner, washed the dishes he."],
      ["Combine: <i>The museum was closed. We visited the park instead.</i>", "Since the museum was closed, we visited the park instead.", "The museum was closed, we visited the park instead.", "The museum was open, so we visited the park instead."]],
    ["Think about how the two ideas connect: addition, cause, contrast or description. The best choice keeps that meaning.", "Join with a conjunction (and, but, so, because, although) or fold one idea into the other. Avoid a comma by itself between two full sentences, and check that the meaning has not flipped.", "Example: <i>I was hungry. I made a snack.</i> becomes <i>Because I was hungry, I made a snack.</i> The first caused the second. Now do yours."]),
    S("🔗", ["Smoother sentences", "Too many short sentences sound choppy. You can <b>combine</b> them to make writing flow."], ["Ways to join", "Use <b>and / but / so</b> after a comma.<br>Use <b>because / although / since</b> to show cause or contrast.<br>Use <b>who / which</b> to add detail."], ["Check", "Does the joined sentence keep the meaning? Is there a comma splice (two full sentences joined by only a comma)?"])));

  L14.push(mk("Because, although, unless: connecting words", rq([
      ["___ the team practiced hard, they lost the game.", "Although", "Because", "Unless"], ["We will go hiking ___ it rains.", "unless", "although", "because"], ["Wash your hands ___ you eat.", "before", "unless", "although"],
      ["___ I was sleepy, I stayed up to finish the book.", "Although", "Because", "Until"], ["Stay here ___ I come back.", "until", "although", "because"], ["___ it was cold, she wore only a T-shirt.", "Although", "Because", "Until"],
      ["He smiled ___ he won the prize.", "because", "unless", "although"], ["Which word shows CONTRAST?", "although", "because", "after"], ["Which word shows a CONDITION (something that must happen first)?", "if", "because", "although"],
      ["Which word shows CAUSE (a reason)?", "because", "although", "until"], ["Which word shows TIME?", "after", "although", "unless"], ["___ you finish your homework, you can watch a show.", "Once", "Although", "Unless"]],
    ["Read the sentence and ask how the two ideas connect: a reason, a surprise, a condition, or a time.", "<b>because, since</b> = reason. <b>although, though</b> = contrast (a surprise). <b>if, unless</b> = condition. <b>before, after, until, when, once</b> = time.", "Example: '___ it was sunny, we stayed inside.' The sun would make you expect going out, so the second part is a surprise: <b>Although</b>. Now do yours."]),
    S("🔀", ["Linking ideas", "<b>Subordinating conjunctions</b> start a dependent clause and show how two ideas connect."], ["Four jobs", "<b>Reason</b>: because, since<br><b>Contrast</b>: although, though, even though<br><b>Condition</b>: if, unless<br><b>Time</b>: before, after, until, when, once"], ["Comma rule", "If the clause comes first, add a comma: <i>Although it was late, we kept playing.</i>"])));

  L14.push(mk("Lie or lay? Rise or raise? Sit or set?", rq([
      ["Please ___ the book on the table.", "lay", "lie", "laid"], ["The sun will ___ at six tomorrow.", "rise", "raise", "rose"], ["I will ___ down for a nap.", "lie", "lay", "laid"],
      ["Yesterday, I ___ down for a nap.", "lay", "laid", "lied"], ["Please ___ your hand if you know the answer.", "raise", "rise", "rose"], ["___ the table for dinner, please.", "Set", "Sit", "Sat"],
      ["The cat likes to ___ on the sunny windowsill.", "sit", "set", "sat"], ["She ___ the vase on the shelf yesterday.", "set", "sat", "sit"], ["The dough will ___ in a warm place.", "rise", "raise", "raised"],
      ["He ___ his backpack on the floor and left.", "laid", "lay", "lied"], ["Don't ___ in the sun too long.", "lie", "lay", "laid"], ["The farmer will ___ the flag at dawn.", "raise", "rise", "rose"]],
    ["Ask: is something being put or lifted by someone (needs an object), or is someone just resting, going up or being seated?", "<b>lay, raise, set</b> need an object (you lay <i>something</i>). <b>lie, rise, sit</b> do not (you lie down yourself). Remember the past: lie becomes <b>lay</b>, lay becomes <b>laid</b>.", "Example: 'The balloon will ___ into the sky' has no object, it goes up on its own: <b>rise</b>. 'Please ___ your pencil on the desk' has an object (pencil): <b>lay</b>. Now do yours."]),
    S("🛏️", ["Confusing pairs", "Three pairs of verbs get mixed up all the time."], ["With an object", "<b>lay</b> = put something down (<i>Lay the book down.</i>)<br><b>raise</b> = lift something (<i>Raise your hand.</i>)<br><b>set</b> = place something (<i>Set the table.</i>)"], ["No object", "<b>lie</b> = rest or recline (<i>I lie down.</i>)<br><b>rise</b> = go up (<i>The sun rises.</i>)<br><b>sit</b> = be seated (<i>I sit here.</i>)"], ["Past tense", "lie → <b>lay</b> (<i>Yesterday I lay down</i>), lay → <b>laid</b>, rise → <b>rose</b>, sit → <b>sat</b>, set → <b>set</b>."])));

  const CAP = [
    ["We drove North to see Mount Rainier.", "wrong", "North", "Mount", "Rainier"], ["Yesterday, my Grandpa told me a story.", "wrong", "Grandpa", "Yesterday", "story"],
    ["The President lives in the White House.", "wrong", "President", "White", "House"], ["We study Math and Spanish.", "wrong", "Math", "Spanish", "We"],
    ["Our Winter break starts in December.", "wrong", "Winter", "December", "Our"], ["Turn West on Maple Street.", "wrong", "West", "Maple", "Street"],
    ["I called my Aunt after school.", "wrong", "Aunt", "called", "school"], ["My brother speaks French and english.", "need", "english", "brother", "French"],
    ["dr. Patel visited our class.", "need", "dr.", "class", "Patel"], ["We visited Aunt Rosa on sunday.", "need", "sunday", "visited", "Rosa"],
    ["President lincoln gave a famous speech.", "need", "lincoln", "speech", "famous"], ["We flew to paris in the spring.", "need", "paris", "flew", "spring"]];
  L14.push(mk("Capital letters: harder rules", rq(CAP.map(r => ["<i>" + r[0] + "</i><br><br>" + (r[1] === "wrong" ? "Which word is capitalized when it should not be?" : "Which word needs a capital letter?"), r[2], r[3], r[4]]),
      ["Ask whether the word names one particular person, place or thing, or is just a general word.", "Capitalize <b>names, titles used with names</b> (Dr. Patel), <b>languages</b>, <b>months and days</b>, <b>specific places</b>. Do NOT capitalize seasons, compass directions used as directions, school subjects like math, or a title used alone (the president).", "Example: 'We flew south to Florida' - south is a direction (no capital), Florida is a place (capital). 'Uncle Joe came' needs the capital, but 'my uncle came' does not. Now do yours."]),
    S("🔠", ["Beyond the basics", "You already know to capitalize the first word and names. Here are harder rules."], ["Capitalize", "Titles with names: <b>Dr. Patel</b>, <b>Aunt Rosa</b><br>Languages and nationalities: <b>Spanish</b><br>Months, days, holidays: <b>July</b><br>Specific places: <b>Mount Rainier</b>"], ["Do not capitalize", "Seasons: <i>winter</i><br>Directions: <i>go north</i><br>School subjects: <i>math</i> (but <b>Spanish</b>)<br>A title alone: <i>the president</i>, <i>my aunt</i>"])));

  const BI = [
    ["Which sentence shows the writer's bias?", "Only a silly person would skip the school fair.", "The school fair is on Saturday at noon.", "The fair has games, food and music."],
    ["Which sentence shows the writer's bias?", "The new library is clearly the worst thing the town ever built.", "The new library opened in March.", "The new library has a children's room."],
    ["Which sentence shows the writer's bias?", "Everyone knows that dogs are far better than cats.", "Many families own dogs or cats.", "Dogs and cats are common pets."],
    ["Which sentence shows the writer's bias?", "That ridiculous rule is a total waste of time.", "The rule says phones stay in lockers.", "The rule started in September."],
    ["Which sentence shows the writer's bias?", "Don't listen to those lazy critics.", "Critics gave the film three stars.", "The film was released in May."],
    ["In <i>The mayor's sneaky plan fooled the town</i>, which word is a loaded word that shows bias?", "sneaky", "plan", "town"],
    ["In <i>The brilliant coach saved the team</i>, which word shows the writer's positive opinion?", "brilliant", "coach", "team"],
    ["A balanced article would...", "give facts and fairly show more than one side", "use only words that make you angry", "leave out facts that disagree"],
    ["Why should a reader notice bias?", "to judge whether the writer is being fair", "to ignore all opinions", "to decide that facts are false"]];
  L14.push(mk("Spotting bias", rq(BI,
      ["Look for words that show strong feelings or opinions instead of plain facts.", "A <b>fact</b> can be checked. <b>Bias</b> shows in loaded words (like <i>silly, worst, lazy, ridiculous</i>) and in leaving out other sides.", "Example: 'The mayor gave a short speech' is a fact. 'The mayor gave a boring, pointless speech' shows bias because of the loaded words. Now do yours."]),
    S("⚖️", ["Leaning one way", "<b>Bias</b> is when a writer leans toward one side and does not treat all sides fairly."], ["Clues", "Loaded words with strong feelings (<i>awful, perfect, silly</i>), only one side told, and facts left out."], ["Still useful", "Biased writing can still be interesting. Just read with care, and check facts in other sources."])));

  const CC = [
    ["Claim: <i>Schools should start later in the morning.</i> Which is a counterclaim?", "Later start times could push practices and after-school jobs too late.", "Teenagers need more sleep.", "Many schools now start at eight."],
    ["Claim: <i>Kids should have more recess.</i> Which is a counterclaim?", "More recess would leave less time for lessons.", "Recess helps kids focus.", "Kids enjoy playing outside."],
    ["Claim: <i>Our town should build a bike lane.</i> Which is a counterclaim?", "Bike lanes would take away parking spaces.", "Bike lanes keep riders safe.", "Biking is good exercise."],
    ["Counterclaim: <i>A longer school day would be tiring.</i> Which is the best rebuttal?", "Extra breaks and a longer lunch could keep the day from being tiring.", "Some schools have buses.", "Tired kids should go to bed earlier."],
    ["Counterclaim: <i>Bike lanes take away parking spaces.</i> Which is the best rebuttal?", "Most stores have back lots, and safer streets can bring in more customers.", "Parking is on streets.", "Bikes are fast."],
    ["What is a counterclaim?", "an opposing view to your claim", "your own main claim", "a fact with no opinion"],
    ["What is a rebuttal?", "a response that answers the opposing view", "a restatement of the claim", "the title of an essay"],
    ["Why does a strong writer include a counterclaim?", "to show fairness and then answer it", "to confuse readers", "to fill space"]];
  L14.push(mk("Counterclaims and rebuttals", rq(CC,
      ["First find the claim. A counterclaim goes the opposite way. A rebuttal answers the counterclaim.", "<b>Claim</b> = your position. <b>Counterclaim</b> = what someone on the other side would say. <b>Rebuttal</b> = your answer to that other side, with a reason.", "Example: Claim: 'We should have a class pet.' Counterclaim: 'Pets take too much care.' Rebuttal: 'Students can share a feeding chart.' Now do yours."]),
    S("🥊", ["Both sides", "Strong arguments do not ignore the other side."], ["Parts", "<b>Claim</b>: what you believe.<br><b>Counterclaim</b>: what the other side says.<br><b>Rebuttal</b>: your answer to the other side."], ["Why", "Showing you understand the other side, and then answering it, makes your argument more believable."])));

  const SH = [
    ["Which sentence shows rather than tells?", "Tom's hands shook as he gripped the paper.", "Tom was nervous.", "Tom felt a feeling of nervousness."],
    ["Which sentence shows rather than tells?", "Her cheeks burned and she stared at the floor.", "She was embarrassed.", "She felt embarrassed about it."],
    ["Which sentence shows rather than tells?", "Steam curled from the soup and the whole kitchen smelled of garlic.", "The kitchen smelled good.", "The soup was hot and tasty."],
    ["Which sentence shows rather than tells?", "Dad's grin stretched ear to ear as he scooped her up.", "Dad was happy.", "Dad felt very glad."],
    ["Which sentence shows rather than tells?", "Ava's eyelids drooped and she slid lower in her chair.", "Ava was tired.", "Ava felt sleepy."],
    ["Which sentence shows rather than tells?", "The dog hid under the table and shook at every thunderclap.", "The dog was scared of storms.", "The dog did not like the storm."],
    ["Which sentence shows rather than tells?", "Ice cracked under his boots with every step.", "The ice was thin.", "It was a dangerous walk."],
    ["Which sentence TELLS rather than shows?", "The room was messy.", "Socks hung from the lamp and cereal bowls covered the desk.", "Papers drifted across the floor like leaves."]];
  L14.push(mk("Show, don't tell", rq(SH,
      ["Telling names the feeling. Showing gives details you could see, hear or feel.", "Look for actions, body language, senses and strong details. A sentence that just names a feeling (<i>was sad</i>) is telling.", "Example: 'Maya was excited' tells. 'Maya bounced on her toes and could not stop smiling' shows. Now do yours."]),
    S("🎬", ["Paint the scene", "Good writers <b>show</b> what is happening so you can picture it, instead of only <b>telling</b>."], ["Compare", "<b>Tell</b>: <i>The boy was scared.</i><br><b>Show</b>: <i>The boy's knees knocked and his voice came out in a whisper.</i>"], ["Tip", "Use the senses and actions. Ask: what would I see, hear or feel if I were there?"])));

  const POEM1 = "The morning started gray and slow,<br>with rain that tapped the glass.<br>But then the clouds began to go,<br>and sunlight washed the grass.";
  const POEM2 = "The party lights were glowing,<br>the music loud and bright.<br>Then everyone went home,<br>and the room grew still at night.";
  const POEM3 = "I wake before the sun is up,<br>I crow to wake the farm.<br>I strut across the barnyard,<br>my feathers proud and warm.";
  const POEM4 = "I'm long and thin and yellow,<br>I leave my mark on the page.<br>When I make a little mistake,<br>my pink end erases the stage.";
  const POEM5 = "My heart was pounding like a drum<br>as I stepped up to the stage.<br>Then I saw my mother smile,<br>and my fear began to fade.";
  L14.push(mk("Speaker and shifts in a poem", rq([
      ["<i>" + POEM1 + "</i><br><br>How does the mood change?", "from gloomy to bright", "from bright to gloomy", "it stays gloomy"], ["<i>" + POEM1 + "</i><br><br>Which word signals the shift?", "But", "morning", "glass"],
      ["<i>" + POEM2 + "</i><br><br>Which line begins the shift?", "Then everyone went home,", "The party lights were glowing,", "the music loud and bright."], ["<i>" + POEM2 + "</i><br><br>How does the mood change?", "from lively to quiet", "from quiet to lively", "from sad to angry"],
      ["<i>" + POEM3 + "</i><br><br>Who is the speaker of this poem?", "a rooster", "a farmer", "the sun"], ["<i>" + POEM4 + "</i><br><br>Who is the speaker of this poem?", "a pencil", "a banana", "a crayon box"],
      ["<i>" + POEM5 + "</i><br><br>Which line begins the shift?", "Then I saw my mother smile,", "My heart was pounding like a drum", "as I stepped up to the stage."], ["<i>" + POEM5 + "</i><br><br>How does the speaker's feeling change?", "from nervous to calm", "from calm to nervous", "from happy to bored"],
      ["What is a <b>shift</b> in a poem?", "a change in mood, idea or speaker's view", "the last word of a line", "a rhyme"]],
    ["Read the whole poem. Ask who is talking and when the feeling or idea turns.", "Look for turning words like <b>but, then, yet, now</b> and for lines where the mood is different from the ones before. The speaker is the voice who is telling it, not always the poet.", "Example: 'I felt lost in the new school. / Then a girl said hello.' The shift starts at 'Then', when lost becomes welcomed. Now do yours."]),
    S("🎤", ["Who is talking?", "The <b>speaker</b> is the voice in a poem. It might be a person, an animal or even an object. Use clues in the words to figure out who."], ["The turn", "Many poems have a <b>shift</b>: the mood or idea changes partway. Words like <i>but, then, yet</i> are clues."], ["Try it", "Ask: How does it feel at the start? How does it feel at the end? Where did the change begin?"])));

  const MD = [
    ["What is the main goal of an advertisement?", "to persuade you to buy or try something", "to give you only neutral facts", "to teach you a school subject"],
    ["A video has the word 'Sponsored' above it. What does this tell you?", "A company paid for it to be shown.", "It is free of any opinions.", "Doctors approved it."],
    ["Which headline is clickbait?", "You Won't Believe What This Cat Did Next!", "School board approves new bus schedule", "Library opens new reading room on Monday"],
    ["A cereal company's page says its cereal is the healthiest. What should you ask?", "Who made this and what do they gain?", "Is the page colorful?", "How many people clicked it?"],
    ["What does a photo caption do?", "explains what a picture shows", "sells the photo", "shows who owns the camera"],
    ["One headline says 'Local Team Crushes Rivals!' and another says 'Local Team Wins 4-1.' Which uses more emotional words?", "Crushes Rivals", "Wins 4-1", "Local Team"],
    ["What is a good step for checking a claim you saw online?", "compare it with other trusted sources", "share it quickly", "trust the loudest comment"],
    ["What does 'target audience' mean?", "the group of people an ad is made for", "the actor in the ad", "the price of the product"],
    ["A toy ad shows the toy flying through the air, but the real toy cannot do that. This is...", "misleading", "a fact", "a review"]];
  L14.push(mk("Reading media with care", rq(MD,
      ["Think about who made it, who it is for, and what they want from you.", "Ads and headlines are made to catch attention. Ask: who made this? Who is it for? What do they want me to do? Is there proof?", "Example: a snack ad shows smiling kids having fun. The ad wants you to feel happy so you will buy it. It is made by the snack company, so check outside sources for facts. Now do yours."]),
    S("📺", ["Messages are made", "Every ad, post and headline was made by someone for a reason."], ["Ask 4 questions", "1. <b>Who</b> made it?<br>2. <b>Who</b> is it for (target audience)?<br>3. What do they <b>want</b> me to do?<br>4. What is <b>left out</b>?"], ["Watch for", "Clickbait headlines, 'Sponsored' labels, and pictures that make things look better than they are."])));

  const mapQ = () => {
    const t = Math.random();
    if (t < 0.4) {
      const k = pick([5, 10, 20, 25, 50]), n = ri(2, 9), a = k * n;
      const opts = shuf([a, a + k, a - k > 0 ? a - k : a + 2 * k, k + n].filter((x, i, arr) => arr.indexOf(x) === i)).slice(0, 3);
      if (!opts.includes(a)) opts[0] = a;
      const ch = shuf(opts).map(x => x + " miles");
      return { text: `On a map, <b>1 inch = ${k} miles</b>. Two towns are <b>${n} inches</b> apart on the map. How far apart are they in real life?`, visual: "🗺️", choices: ch, answer: a + " miles",
        hints: ["The scale tells you how many real miles each inch stands for. How many inches are there?", "Multiply: the number of inches times the miles that each inch stands for.", "Example: if <b>1 inch = 3 miles</b> and two towns are 4 inches apart, then 4 x 3 = 12 miles. Now do yours."] };
    }
    if (t < 0.65) {
      const k = pick([5, 10, 20, 25]), n = ri(2, 9), d = k * n;
      const opts = [n, n + 1, n - 1 > 0 ? n - 1 : n + 2].filter((x, i, arr) => arr.indexOf(x) === i);
      const ch = shuf(opts).map(x => x + (x === 1 ? " inch" : " inches"));
      return { text: `On a map, <b>1 inch = ${k} miles</b>. Two cities are <b>${d} miles</b> apart in real life. How far apart will they be on the map?`, visual: "🗺️", choices: ch, answer: n + (n === 1 ? " inch" : " inches"),
        hints: ["The scale says how many miles one inch stands for. How many of those fit into the real distance?", "Divide: the real miles by the miles that each inch stands for.", "Example: if <b>1 inch = 4 miles</b> and the cities are 20 miles apart, then 20 ÷ 4 = 5 inches. Now do yours."] };
    }
    const rows = [
      ["What does a map <b>legend</b> (or key) explain?", "what the symbols and colors mean", "how many people live there", "who drew the map"],
      ["What does a <b>compass rose</b> on a map show?", "the directions: north, south, east and west", "the distance between towns", "the name of the map"],
      ["On most maps, which direction is at the top?", "north", "south", "east"],
      ["What does a map <b>scale</b> help you find?", "real distances", "the weather", "the names of rivers"],
      ["A map shows a small blue square marked with an 'H' in the legend as 'hospital'. What do you do to find a hospital?", "look for the blue square with an H", "look for the red circles", "check the compass rose"],
      ["Which map feature tells what the map is about?", "the title", "the scale", "the border"],
      ["A line graph in an infographic goes up over time. What does that mean?", "the amount is growing", "the amount is shrinking", "the amount stays the same"]];
    const r = pick(rows);
    return { text: r[0], choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: ["Think about the job of each map part.", "A map has a title (the topic), a legend (symbols), a scale (distances) and a compass rose (directions).", "Example: to know what a green patch means on a park map, you look at the legend. Now do yours."] };
  };
  L14.push(mk("Maps, scales and legends", mapQ,
    S("🗺️", ["Parts of a map", "A map is full of tools that help you read it."], ["The tools", "<b>Title</b>: what the map shows.<br><b>Legend (key)</b>: what symbols mean.<br><b>Compass rose</b>: directions.<br><b>Scale</b>: how map distance matches real distance."], ["Using a scale", "If <b>1 inch = 10 miles</b>, then 3 inches on the map = 30 real miles. Multiply to go to real life, divide to go back."])));

  L14.push(MIX("Mixed practice", L14[0], L14[5], L14[9], L14[13]));
  L14.push(MIX("Level 14 Challenge", L14[1], L14[4], L14[7], L14[10], L14[12], L14[15], L14[17]));

  // ================= LEVEL 15 =================
  L15.push(mk("Latin roots: grav, lum, plic, volv, tens", rq([
      ["The Latin root <b>grav</b> is in <i>gravity</i> and <i>gravitational</i>. What does it mean?", "heavy", "light", "fast"],
      ["The Latin root <b>lum</b> is in <i>luminous</i> and <i>illuminate</i>. What does it mean?", "light", "dark", "heavy"],
      ["The Latin root <b>plic</b> is in <i>complicate</i> and <i>duplicate</i>. What does it mean?", "fold", "push", "stand"],
      ["The Latin root <b>volv</b> is in <i>revolve</i> and <i>evolve</i>. What does it mean?", "roll or turn", "stick", "stretch"],
      ["The Latin root <b>tens</b> is in <i>tension</i> and <i>extend</i>. What does it mean?", "stretch", "fold", "light"],
      ["The Latin root <b>pel</b> is in <i>propel</i> and <i>expel</i>. What does it mean?", "drive or push", "stick", "stand"],
      ["The Latin root <b>stat</b> is in <i>station</i> and <i>statue</i>. What does it mean?", "stand", "roll", "fold"],
      ["The Latin root <b>hes</b> is in <i>adhesive</i> and <i>cohesive</i>. What does it mean?", "stick", "push", "light"],
      ["Which word means 'a substance that sticks things together'?", "adhesive", "propeller", "luminous"],
      ["Which word means 'giving off light'?", "luminous", "adhesive", "static"],
      ["Which word means 'to turn around a center'?", "revolve", "propel", "extend"],
      ["Which word means 'to push something forward'?", "propel", "revolve", "duplicate"]],
    ["A root is the part of the word that carries the main meaning. Look at the example words and ask what idea they share.", "The meanings here are: heavy, light, fold, roll or turn, stretch, push, stand, stick. Match the idea from the example words to one of them.", "Example: the root <b>port</b> means carry. <i>Transport</i> carries across, and a <i>porter</i> carries bags. What do your words share? Now do yours."]),
    S("🏛️", ["More Latin roots", "Each Latin root unlocks a family of words."], ["Roots", "<b>grav</b> = heavy (<b>grav</b>ity)<br><b>lum</b> = light (il<b>lum</b>inate)<br><b>plic</b> = fold (com<b>plic</b>ate)<br><b>volv</b> = roll, turn (re<b>volv</b>e)"], ["More roots", "<b>tens</b> = stretch (<b>tens</b>ion)<br><b>pel</b> = drive, push (pro<b>pel</b>)<br><b>stat</b> = stand (<b>stat</b>ion)<br><b>hes</b> = stick (ad<b>hes</b>ive)"], ["Tip", "A <b>complicated</b> problem is folded many times. A <b>propeller</b> pushes a boat or plane forward."])));

  const PRE2 = [
    ["What does <b>monorail</b> mean?", "a train on one rail", "a train on many rails", "a train under water"], ["What does <b>unicycle</b> mean?", "a bike with one wheel", "a bike with two wheels", "a bike with many wheels"],
    ["What does <b>multicolored</b> mean?", "having many colors", "having one color", "having no color"], ["What does <b>polygon</b> mean? (<b>gon</b> = angle)", "a shape with many angles", "a shape with one angle", "a round shape"],
    ["What does <b>circumference</b> mean? (<b>fer</b> = carry)", "the distance around a circle", "the distance across a circle", "the middle of a circle"], ["What does <b>ambidextrous</b> mean? (<b>dextr</b> = right hand)", "able to use both hands equally well", "able to use only the left hand", "unable to use either hand"],
    ["What does <b>omnivore</b> mean? (<b>vor</b> = eat)", "an animal that eats all kinds of food", "an animal that eats only plants", "an animal that eats only meat"], ["What does <b>monologue</b> mean?", "a long speech by one person", "a talk between many people", "a song"],
    ["What does <b>polyglot</b> mean? (<b>glot</b> = tongue, language)", "a person who speaks many languages", "a person who speaks one language", "a person who cannot talk"], ["Which prefix means 'around'?", "circum-", "mono-", "omni-"],
    ["Which prefix means 'all'?", "omni-", "uni-", "poly-"], ["Which prefix means 'both'?", "ambi-", "multi-", "circum-"]];
  L15.push(mk("Prefixes mono-, uni-, multi-, poly-, circum-, ambi-, omni-", rq(PRE2,
      ["Read the prefix first and think of other words that start the same way.", "<b>mono-</b> and <b>uni-</b> = one. <b>multi-</b> and <b>poly-</b> = many. <b>circum-</b> = around. <b>ambi-</b> = both. <b>omni-</b> = all.", "Example: <b>unify</b> means to make into one, and <b>multitude</b> means a great many. A <b>monotone</b> voice stays on one tone. Now do yours."]),
    S("🔢", ["Counting prefixes", "Some prefixes tell you how many."], ["One and many", "<b>mono-/uni-</b> = one (<b>mono</b>rail, <b>uni</b>cycle)<br><b>multi-/poly-</b> = many (<b>multi</b>colored, <b>poly</b>gon)"], ["Around, both, all", "<b>circum-</b> = around (<b>circum</b>ference)<br><b>ambi-</b> = both (<b>ambi</b>dextrous)<br><b>omni-</b> = all (<b>omni</b>vore)"], ["Tip", "Add what you know: <b>omni</b> (all) + <b>vore</b> (eat) = eats everything."])));

  const VS = [
    ["Which verb means 'to make something simple'?", "simplify", "simplicity", "simply"], ["Which verb means 'to make something modern'?", "modernize", "modernity", "modernly"],
    ["Which verb means 'to make something bright'?", "brighten", "brightly", "brightness"], ["Which verb means 'to make something active'?", "activate", "activity", "actively"],
    ["Which verb means 'to make something short'?", "shorten", "shortly", "shortness"], ["Which verb means 'to make something legal'?", "legalize", "legally", "legality"],
    ["Which verb means 'to make something pure'?", "purify", "purely", "purity"], ["Which verb means 'to make something wide'?", "widen", "widely", "width"],
    ["Which suffix often turns a word into a verb meaning 'to make'?", "-ify", "-ness", "-ly"], ["Which word is a verb?", "organize", "organic", "organism"],
    ["In <i>The sun will brighten the room</i>, what does <b>brighten</b> mean?", "make bright", "become dark", "be bright for a day"], ["Which word is a verb?", "beautify", "beautiful", "beauty"]];
  L15.push(mk("Verb-making suffixes: -ify, -ize, -en, -ate", rq(VS,
      ["Look at the endings. A verb ending tells you that someone is making or doing something.", "The endings <b>-ify, -ize, -en, -ate</b> make verbs that mean 'to make or become'. Endings like <b>-ly</b> (adverb), <b>-ness</b> or <b>-ity</b> (noun) and <b>-ful</b> or <b>-ic</b> (adjective) make other kinds of words.", "Example: <b>fresh</b> becomes <b>freshen</b> (to make fresh). <b>Solid</b> becomes <b>solidify</b> (to make solid). Now do yours."]),
    S("🛠️", ["Making verbs", "Some endings turn adjectives and nouns into <b>verbs</b>."], ["The endings", "<b>-ify</b>: simpl<b>ify</b>, pur<b>ify</b><br><b>-ize</b>: modern<b>ize</b>, legal<b>ize</b><br><b>-en</b>: bright<b>en</b>, short<b>en</b><br><b>-ate</b>: activ<b>ate</b>"], ["Meaning", "All four mean 'to make or become'. <i>Brighten</i> = make bright. <i>Modernize</i> = make modern."])));

  const FG = [
    ["<i>jumbo shrimp</i>", "oxymoron", "paradox", "understatement"], ["<i>deafening silence</i>", "oxymoron", "understatement", "paradox"], ["<i>bittersweet</i>", "oxymoron", "paradox", "understatement"],
    ["<i>Less is more.</i>", "paradox", "oxymoron", "understatement"], ["<i>The more you learn, the more you realize how much you do not know.</i>", "paradox", "oxymoron", "understatement"],
    ["<i>After the tree crushed the car, Dad said, 'Well, that is a bit of a scratch.'</i>", "understatement", "oxymoron", "paradox"], ["<i>Standing in a blizzard, she said, 'It is a little chilly out.'</i>", "understatement", "paradox", "oxymoron"],
    ["<i>Alone in the crowd, he felt a loud quiet.</i>", "oxymoron", "paradox", "understatement"], ["<i>You have to be cruel to be kind.</i>", "paradox", "oxymoron", "understatement"],
    ["Which figure of speech puts two opposite words side by side?", "oxymoron", "understatement", "paradox"], ["Which figure of speech makes something big seem small?", "understatement", "oxymoron", "paradox"],
    ["Which figure of speech seems to contradict itself but contains a truth?", "paradox", "understatement", "oxymoron"]];
  L15.push(mk("Oxymoron, paradox, understatement", rq(FG.map(r => [r[0].startsWith("<i>") ? r[0] + "<br><br>Which figure of speech is this?" : r[0], r[1], r[2], r[3]]),
      ["Decide whether the words fight each other, the whole sentence seems wrong but true, or the writer is playing something big down.", "<b>Oxymoron</b>: two opposite words in a pair. <b>Paradox</b>: a whole statement that seems to contradict itself but holds a truth. <b>Understatement</b>: saying something is less important than it is.", "Example: <i>Open secret</i> pairs two opposite ideas, so it is an oxymoron. 'It's just a small hill,' said about a mountain, is understatement. Now do yours."]),
    S("🎭", ["Playing with opposites", "Writers use clever figures of speech that seem to say the wrong thing."], ["Three kinds", "<b>Oxymoron</b>: two opposite words together (<i>jumbo shrimp, deafening silence</i>).<br><b>Paradox</b>: a statement that seems false but has truth in it (<i>Less is more.</i>)."], ["Understatement", "<b>Understatement</b> makes something big sound small: <i>It's a little wet</i> during a flood. It is the opposite of exaggeration."])));

  const MOOD = [
    ["If I were you, I would study.", "subjunctive", "indicative", "imperative"], ["Close the door, please.", "imperative", "indicative", "subjunctive"], ["The bus arrives at noon.", "indicative", "imperative", "subjunctive"],
    ["I wish it were Friday.", "subjunctive", "indicative", "imperative"], ["Do you like pizza?", "indicative", "imperative", "subjunctive"], ["Sit down and be quiet.", "imperative", "subjunctive", "indicative"],
    ["If she were here, she would laugh.", "subjunctive", "indicative", "imperative"], ["The cat sleeps on the couch.", "indicative", "imperative", "subjunctive"]];
  L15.push(mk("Verb moods", () => {
    if (Math.random() < 0.35) {
      const rows = [
        ["Choose the correct sentence.", "If I were taller, I could reach the shelf.", "If I was taller, I could reach the shelf.", "If I be taller, I could reach the shelf."],
        ["Choose the correct sentence.", "I wish he were here.", "I wish he was here.", "I wish he be here."],
        ["Choose the correct sentence.", "If it were up to me, we would have a longer recess.", "If it was up to me, we would have a longer recess.", "If it be up to me, we would have a longer recess."],
        ["Which mood gives a command or request?", "imperative", "indicative", "subjunctive"], ["Which mood states a fact or asks a question?", "indicative", "imperative", "subjunctive"],
        ["Which mood expresses a wish or something that is not real?", "subjunctive", "indicative", "imperative"]];
      const r = pick(rows);
      return { text: r[0], choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: ["The mood of a verb shows the attitude of the sentence: a fact, a command, or a wish.", "<b>Indicative</b>: facts and questions. <b>Imperative</b>: commands. <b>Subjunctive</b>: wishes and 'if' ideas that are not real. For the subjunctive of <i>to be</i>, standard English uses <b>were</b>.", "Example: 'If I were a bird, I would fly.' I am not a bird, so it is the subjunctive and uses 'were', not 'was'. Now do yours."] };
    }
    const r = pick(MOOD);
    return { text: "<i>" + r[0] + "</i><br><br>Which verb mood is used?", choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: ["Ask what the sentence does: tell a fact, give a command, or wish for something that is not true?", "<b>Indicative</b>: facts and questions. <b>Imperative</b>: commands. <b>Subjunctive</b>: wishes and 'if' ideas that are not real.", "Example: 'Please sit down' is a command. 'The dog sits' is a fact. 'I wish I were taller' is a wish that is not true. Now do yours."] };
  }, S("🎚️", ["How a verb feels", "The <b>mood</b> of a verb shows what kind of statement the sentence makes."], ["Three moods", "<b>Indicative</b>: facts and questions (<i>She runs.</i>)<br><b>Imperative</b>: commands (<i>Run!</i>)<br><b>Subjunctive</b>: wishes and things that are not real (<i>If I were you...</i>)"], ["The 'were' rule", "In the subjunctive, use <b>were</b> for every subject: <i>If I were, if he were, I wish it were</i>."])));

  const CL = [
    ["The book <b>that I borrowed</b> is long.", "adjective clause", "adverb clause", "noun clause"], ["Call me <b>when you arrive</b>.", "adverb clause", "adjective clause", "noun clause"],
    ["I know <b>that she is right</b>.", "noun clause", "adjective clause", "adverb clause"], ["The girl <b>who won the race</b> smiled.", "adjective clause", "noun clause", "adverb clause"],
    ["We stayed home <b>because it stormed</b>.", "adverb clause", "adjective clause", "noun clause"], ["<b>What you said</b> surprised me.", "noun clause", "adverb clause", "adjective clause"],
    ["<b>Whoever finishes first</b> wins a prize.", "noun clause", "adjective clause", "adverb clause"], ["The dog, <b>which was wet</b>, shook itself.", "adjective clause", "adverb clause", "noun clause"],
    ["She smiled <b>after the music ended</b>.", "adverb clause", "noun clause", "adjective clause"], ["Which kind of clause tells <i>when, why or how</i> about a verb?", "adverb clause", "adjective clause", "noun clause"],
    ["Which kind of clause describes a noun and often starts with <i>who, which or that</i>?", "adjective clause", "noun clause", "adverb clause"]];
  L15.push(mk("Adjective, adverb and noun clauses", rq(CL.map(r => [r[0].startsWith("Which") ? r[0] : "<i>" + r[0] + "</i><br><br>What kind of clause is shown in bold?", r[1], r[2], r[3]]),
      ["Ask what job the bold clause does in the sentence: does it describe a noun, tell when or why, or act as a noun itself?", "<b>Adjective clause</b> describes a noun. <b>Adverb clause</b> tells when, where, why or how. <b>Noun clause</b> can be replaced by 'it' or 'something' because it acts as a noun.", "Example: in <i>I saw the movie that you recommended</i>, the clause describes <i>movie</i>, so it is an adjective clause. In <i>I will call you if I can</i>, it tells under what condition, so it is an adverb clause. Now do yours."]),
    S("🧱", ["Clauses with jobs", "A dependent clause has a subject and verb but cannot stand alone. It does a job like a single word."], ["Three jobs", "<b>Adjective clause</b>: describes a noun (<i>the boy <b>who sang</b></i>).<br><b>Adverb clause</b>: tells when, why, where (<i><b>When it rained</b>, we left</i>).<br><b>Noun clause</b>: acts as a noun (<i>I know <b>what you mean</b></i>)."], ["Test", "Try replacing the clause with <i>it</i>. If that works, it is a noun clause."])));

  const WD = [
    ["Which sentence says it most clearly in fewer words?", "We left because it was late.", "We left due to the fact that it was late.", "We left on account of the reason that it was late."],
    ["Which phrase repeats itself?", "free gift", "birthday gift", "wrapped gift"], ["Which phrase repeats itself?", "past history", "ancient history", "world history"],
    ["Which phrase repeats itself?", "end result", "final score", "test result"], ["Which sentence says it most clearly in fewer words?", "Please help me now.", "Please help me at this point in time.", "Please help me right now at this exact moment in time."],
    ["Which sentence says it most clearly in fewer words?", "The movie was long.", "In my personal opinion, I think that the movie was kind of long.", "The movie, as I see it personally, was long."],
    ["Which phrase repeats itself?", "unexpected surprise", "big surprise", "happy surprise"], ["Which phrase repeats itself?", "repeat again", "repeat often", "never repeat"],
    ["Which single word can replace <i>in the event that</i>?", "if", "so", "but"], ["Which single word can replace <i>due to the fact that</i>?", "because", "although", "unless"]];
  L15.push(mk("Cutting extra words", rq(WD,
      ["Ask whether every word is doing a job. If two words mean the same thing, you only need one.", "Redundant phrases say the same idea twice (the second word adds nothing). Long phrases like 'in order to' or 'due to the fact that' can be replaced with short words.", "Example: 'close proximity' repeats the idea (proximity already means closeness), so say 'proximity' or 'close'. 'At this point in time' can be 'now'. Now do yours."]),
    S("✂️", ["Say it with less", "Strong writing is <b>concise</b>: no extra words."], ["Redundant pairs", "Say the same thing twice: <i>true fact, final outcome, return back, advance planning</i>."], ["Windy phrases", "<i>due to the fact that</i> → <b>because</b><br><i>at this point in time</i> → <b>now</b><br><i>in the event that</i> → <b>if</b>"], ["Check", "Read it aloud. If a word can go without changing the meaning, cut it."])));

  L15.push(mk("Clear pronoun reference", rq([
      ["Which sentence is clear?", "Tom told Sam, 'You won the game.'", "Tom told Sam he won the game.", "Tom told Sam that they won."],
      ["Which sentence is clear?", "When Lily met Mia, Lily smiled.", "When Lily met Mia, she smiled.", "When she met her, she smiled."],
      ["In <i>The box fell on the table and it broke</i>, why is <b>it</b> unclear?", "it could mean the box or the table", "it is a plural pronoun", "it has no verb"],
      ["Which sentence has an unclear pronoun?", "Ben told Max that he needed new shoes.", "Ben told Max, 'You need new shoes.'", "Ben said he needed new shoes."],
      ["How can you fix: <i>Ana called Beth and said she was late.</i>", "Replace <b>she</b> with a name", "Replace <b>Ana</b> with <b>they</b>", "Take out the word <b>called</b>"],
      ["Which sentence is clear?", "Ms. Lee told Jo that Jo had won.", "Ms. Lee told Jo that she had won.", "Ms. Lee told Jo that they had won."],
      ["A sign says <i>They closed the road.</i> What is wrong with <b>they</b>?", "it does not say who 'they' is", "it is singular", "it is spelled wrong"],
      ["<i>The team won. This made us proud.</i> How can you make <b>This</b> clearer?", "This victory made us proud.", "That made them.", "This made it."],
      ["A pronoun should refer clearly to...", "one specific noun that comes before it", "any noun in the paragraph", "the next verb"]],
    ["Find the pronoun, then look for the noun it replaces. Is there only one choice, or two that could fit?", "A pronoun must clearly point to <b>one</b> noun (its antecedent). If two nouns could fit, or none, the sentence is unclear. Fix it by using the noun again or rewording.", "Example: 'Mom told Aunt Kay that she needed a rest' could mean either one. Better: 'Mom told Aunt Kay, \"You need a rest.\"' Now do yours."]),
    S("👉", ["Who does it mean?", "A <b>pronoun</b> replaces a noun. The noun it replaces is called the <b>antecedent</b>. The reader must know exactly which noun it is."], ["Unclear", "<i>Dad told Uncle Jim he was late.</i> Who was late: Dad or Jim?"], ["Fix it", "Use the name: <i>Dad told Uncle Jim that Jim was late.</i><br>Or use a quote: <i>Dad told Uncle Jim, \"You are late.\"</i>"])));

  const PJ = [
    ["<b>Bees are amazing builders.</b> Their hives have perfect six-sided cells. The cells hold honey and baby bees.", "states the main idea", "gives an example or detail", "sums up the paragraph"],
    ["Many animals sleep through winter. <b>For example, bears rest in dens for months.</b> Chipmunks also nap.", "gives an example or detail", "states the main idea", "shows a contrast"],
    ["Plastic is cheap and strong. <b>However, it can harm the ocean when it is thrown away.</b>", "shows a contrast", "gives an example or detail", "sums up the paragraph"],
    ["A garden gives students fresh food. It teaches them about science. <b>For these reasons, every school should have a garden.</b>", "sums up the paragraph", "states the main idea", "gives an example or detail"],
    ["Walking to school has many benefits. <b>It gives you exercise.</b> It also clears your mind.", "gives an example or detail", "shows a contrast", "sums up the paragraph"],
    ["Volcanoes can be dangerous. <b>Still, they also make rich soil that helps farmers.</b>", "shows a contrast", "states the main idea", "sums up the paragraph"],
    ["Frogs breathe through their skin. They need water to keep it moist. <b>In short, frogs need water to live.</b>", "sums up the paragraph", "shows a contrast", "gives an example or detail"],
    ["<b>Reading daily builds a stronger vocabulary.</b> Readers meet new words in stories and facts. They learn how the words work.", "states the main idea", "shows a contrast", "sums up the paragraph"]];
  L15.push(mk("What does this sentence do?", rq(PJ.map(r => ["<i>" + r[0] + "</i><br><br>What job does the bold sentence do in the paragraph?", r[1], r[2], r[3]]),
      ["Read the bold sentence and then the sentences around it. What does it add to the ones before it?", "Look at signal words: <i>for example</i> (an example), <i>however, still</i> (contrast), <i>in short, for these reasons</i> (sums up). A sentence at the start often states the main idea.", "Example: 'Dogs are loyal. <b>My dog waits at the door every day.</b>' The bold sentence gives an example that backs up the first. Now do yours."]),
    S("🧩", ["Every sentence has a job", "In a good paragraph each sentence does something."], ["Common jobs", "<b>Main idea</b>: what the paragraph is about.<br><b>Detail or example</b>: backs up the idea.<br><b>Contrast</b>: shows a different side (<i>however, but</i>)."], ["More", "<b>Sums up</b>: wraps the paragraph (<i>in short, so</i>). Ask: what would be missing if this sentence were gone?"])));

  const EV = [
    ["Claim: <i>Our school should add a recycling bin.</i> Which is the best evidence?", "Our school throws away about 200 pounds of paper each week.", "The cafeteria serves pizza on Fridays.", "The school has a blue front door."],
    ["Claim: <i>Kids should read every day.</i> Which is the best evidence?", "Studies show daily reading improves vocabulary.", "Some books are hard to hold.", "The library has red chairs."],
    ["Claim: <i>The park needs more shade trees.</i> Which is the best evidence?", "On hot days the playground gets so hot that kids cannot use it.", "The park has a pond.", "The park opened a long time ago."],
    ["Claim: <i>Wearing a helmet keeps cyclists safe.</i> Which is the best evidence?", "Helmets reduce the chance of serious head injury.", "Bikes come in many colors.", "Cycling has been around for a long time."],
    ["Claim: <i>School lunch should include more fruit.</i> Which is the best evidence?", "Fruit has vitamins that help kids stay healthy.", "Lunch is at noon.", "Trays are made of plastic."],
    ["Claim: <i>Dogs make good pets for active families.</i> Which is the best evidence?", "Dogs need daily walks, which gives families a way to exercise together.", "Dogs have four legs.", "Cats nap a lot."],
    ["Which kind of evidence is strongest?", "a fact from a reliable source", "a guess", "what one friend thinks"],
    ["Evidence is relevant when it...", "directly supports the claim", "is interesting but about a different topic", "is the longest detail"]];
  L15.push(mk("Relevant evidence", rq(EV,
      ["Read the claim, then ask: which choice would actually help convince someone that the claim is true?", "Good evidence is <b>relevant</b> (about the claim) and <b>reliable</b> (a fact, number, expert or example). Details that are true but off topic do not help.", "Example: Claim: 'Our town needs a bigger library.' Evidence: 'The library has only 12 seats, but 100 people visit each day.' That directly supports it. 'The library is brown' does not. Now do yours."]),
    S("🔍", ["Does it help?", "<b>Evidence</b> backs up a claim. Not all facts are evidence for every claim."], ["Two tests", "<b>Relevant</b>: is it about my claim?<br><b>Reliable</b>: is it true, from a good source?"], ["Be picky", "A fun fact that does not connect to the claim is a distraction. Choose the detail that makes the claim more believable."])));

  const FA = [
    ["Everyone in class is wearing these sneakers, so they must be the best.", "bandwagon", "hasty generalization", "attacking the person"],
    ["I met one rude person from that town, so everyone there must be rude.", "hasty generalization", "false either/or", "bandwagon"],
    ["Either we ban all video games, or kids will never do homework.", "false either/or", "attacking the person", "hasty generalization"],
    ["You cannot trust his idea about the park. He is just a kid.", "attacking the person", "bandwagon", "false either/or"],
    ["My cousin's dog bit a mailman, so all dogs are dangerous.", "hasty generalization", "bandwagon", "attacking the person"],
    ["Either you join the soccer team, or you are not a team player at all.", "false either/or", "bandwagon", "hasty generalization"],
    ["Do not listen to Ms. Cruz's plan for recycling. She wears ugly hats.", "attacking the person", "hasty generalization", "false either/or"],
    ["Millions of people buy this soda, so it must be healthy.", "bandwagon", "false either/or", "attacking the person"]];
  L15.push(mk("Faulty arguments", rq(FA.map(r => ["<i>" + r[0] + "</i><br><br>What is wrong with this argument?", r[1], r[2], r[3]]),
      ["Reasons should be fair and complete. Ask what the argument is really doing instead of giving good evidence.", "<b>Bandwagon</b>: it is true because many people do it. <b>Hasty generalization</b>: a big claim from too few examples. <b>False either/or</b>: only two choices when there are more. <b>Attacking the person</b>: going after the speaker instead of the idea.", "Example: 'Our neighbor's cat is mean, so all cats are mean' judges all cats from just one, so it is a hasty generalization. Now do yours."]),
    S("🚫", ["Weak reasoning", "Some arguments sound strong but have a flaw. These are called <b>logical fallacies</b>."], ["Four common ones", "<b>Bandwagon</b>: everyone does it, so it is right.<br><b>Hasty generalization</b>: one or two examples prove a rule.<br><b>False either/or</b>: acts as if there are only two choices.<br><b>Attacking the person</b>: criticizes the speaker, not the idea."], ["Be fair", "Judge ideas by the reasons and evidence, not by the crowd or the person."])));

  const EP = [
    ["As a doctor for twenty years, I can tell you that sleep is vital for children.", "ethos", "pathos", "logos"], ["Imagine a lonely puppy shivering in the rain, waiting for someone to take it home.", "pathos", "logos", "ethos"],
    ["Studies of 1,000 students show that those who sleep nine hours score higher on tests.", "logos", "ethos", "pathos"], ["I have coached this team for fifteen years and I have never broken a promise.", "ethos", "logos", "pathos"],
    ["Think of the proud smile on a child's face when she finishes her first book!", "pathos", "ethos", "logos"], ["The park will cost $5,000 to build, and it will save the town $9,000 in health costs.", "logos", "pathos", "ethos"],
    ["Which appeal uses facts, numbers and reasons?", "logos", "ethos", "pathos"], ["Which appeal tries to make the audience feel something?", "pathos", "logos", "ethos"], ["Which appeal builds trust in the speaker?", "ethos", "pathos", "logos"]];
  L15.push(mk("Ethos, pathos and logos", rq(EP.map(r => [r[0].startsWith("Which") ? r[0] : "<i>" + r[0] + "</i><br><br>Which appeal is this?", r[1], r[2], r[3]]),
      ["Ask how the speaker is trying to win you over: by being trusted, by making you feel, or by giving proof.", "<b>Ethos</b> = character and credibility. <b>Pathos</b> = emotion. <b>Logos</b> = logic, facts and numbers.", "Example: 'Nine out of ten dentists recommend it' uses numbers and expert opinions. It leans on facts, which is logos. 'Picture the sad little cat' leans on feeling, which is pathos. Now do yours."]),
    S("🗣️", ["Three ways to persuade", "More than 2,000 years ago, a Greek thinker named Aristotle described three <b>appeals</b> that still help persuade people today."], ["The three", "<b>Ethos</b>: trust. 'I am an expert.'<br><b>Pathos</b>: feeling. 'Imagine how sad...'<br><b>Logos</b>: logic. 'The numbers show...'"], ["Strong speeches", "Good speakers often use all three. As a reader, notice which one is being used, and ask if the facts back it up."])));

  const FL = [
    ["A character has many sides, with strengths and flaws, and feels like a real person. This character is...", "round", "flat", "a foil"],
    ["A shopkeeper appears in one scene and is only grumpy. This character is...", "flat", "round", "a foil"],
    ["A main character is brave, afraid of the dark, funny, and sometimes selfish. This character is...", "round", "flat", "a foil"],
    ["What is a <b>foil</b>?", "a character who is very different from another and makes their traits stand out", "a character who is exactly like another", "the villain of every story"],
    ["Ana is bold and loud. Her friend Lou is careful and quiet. Why is Lou a foil to Ana?", "their differences make each other's traits stand out", "they are the same", "Lou is the villain"],
    ["Why do authors add foil characters?", "to make a character's traits stand out by contrast", "to confuse readers", "to fill space with extra names"],
    ["Which pair are foils?", "a cheerful kid and a gloomy kid", "two cheerful twins", "two teachers who teach math"],
    ["A character who appears briefly with one simple trait is called...", "flat", "round", "dynamic"],
    ["Which describes a round character?", "has several traits, fears and goals", "has just one trait", "never speaks"]];
  L15.push(mk("Flat, round and foil characters", rq(FL,
      ["Think about how much we learn about the character: one trait or many?", "<b>Flat</b> = one or two simple traits. <b>Round</b> = complex with many sides. A <b>foil</b> is a character used for contrast to highlight another character.", "Example: a storm-chasing hero who is brave but also has a secret fear of thunder is round. A sleepy bus driver who only says 'hop on' is flat. Now do yours."]),
    S("👥", ["Kinds of characters", "Authors build characters in different ways."], ["Flat and round", "<b>Flat</b>: only one or two traits. Often a minor character.<br><b>Round</b>: many traits, like a real person, with strengths and flaws."], ["Foils", "A <b>foil</b> is a character whose traits are the opposite of another's. The contrast makes both stand out, like a quiet friend next to a loud one."])));

  const EN = [
    ["The sun went down.<br>The stars came out.", "end-stopped", "enjambed", "a stanza"], ["A small bird sat upon the fence<br>and sang the morning in.", "enjambed", "end-stopped", "a stanza"],
    ["I closed my book.<br>The room was still.", "end-stopped", "enjambed", "a stanza"], ["She opened up the window wide<br>and let the sunlight spill.", "enjambed", "end-stopped", "a stanza"],
    ["The clock kept ticking on and on<br>through all the silent night.", "enjambed", "end-stopped", "a stanza"], ["The cat is asleep.<br>The dog is awake.", "end-stopped", "enjambed", "a stanza"]];
  L15.push(mk("Line breaks in poems", () => {
    if (Math.random() < 0.7) {
      const r = pick(EN);
      return { text: "<i>" + r[0] + "</i><br><br>The first line of this poem is...", choices: shuf([r[1], r[2], r[3]]), answer: r[1],
        hints: ["Read the first line out loud. Does it stop at the end, or does the sentence keep going into the next line?", "An <b>end-stopped</b> line ends with a complete thought and usually punctuation. An <b>enjambed</b> line runs into the next line with no pause. A <b>stanza</b> is a group of lines.", "Example: 'The rain came down. / It soaked the ground.' stops at each line end (end-stopped). 'The rain came down and soaked / the dusty ground' has the thought running over (enjambed). Now do yours."] };
    }
    const rows = [
      ["What is <b>enjambment</b>?", "a sentence or thought that runs over from one line to the next", "a rhyme at the end of lines", "a pause in the middle of a line"],
      ["Why might a poet break a line in the middle of a sentence?", "to add a pause, emphasis or rhythm", "because they ran out of ideas", "to make the poem shorter"],
      ["What is a <b>stanza</b>?", "a group of lines in a poem, like a paragraph", "a rhyming word", "the title"], ["A poem with no regular rhyme or rhythm is called...", "free verse", "a limerick", "a nursery rhyme"],
      ["What is an <b>end-stopped line</b>?", "a line that ends with a complete thought or punctuation", "a line that runs on without a pause", "a line with no words"]];
    const r = pick(rows);
    return { text: r[0], choices: shuf([r[1], r[2], r[3]]), answer: r[1], hints: ["Think about how lines and sentences in a poem do not always match up.", "A poem is in lines and stanzas. Sentences can stop at the end of a line (end-stopped) or run over (enjambment). The line break can add emphasis.", "Example: 'I walked and walked and walked / and walked' - the line break makes the last word stand alone, so it stands out. Now do yours."] };
  }, S("📜", ["Lines and sentences", "In a poem, lines and sentences do not always end together."], ["Two kinds", "<b>End-stopped</b>: the line ends with a full thought and punctuation.<br><i>The sun went down.</i><br><b>Enjambed</b>: the thought runs over to the next line.<br><i>The sun went down behind<br>the quiet hills.</i>"], ["Why?", "Enjambment speeds a poem up and keeps you reading. A group of lines is a <b>stanza</b>. Poems without regular rhyme or rhythm are <b>free verse</b>."])));

  const SA = [
    ["A cartoon shows a man so busy looking at his phone that he walks into a pole. It pokes fun at how much people use phones.", "satire", "parody", "a news report"],
    ["A funny song copies the style of a famous pop song but changes the words to be about homework.", "parody", "satire", "a news report"],
    ["A funny article says students will need a permission slip to ask for a permission slip. It makes fun of too much paperwork.", "satire", "parody", "a biography"],
    ["A short film copies a fairy-tale movie but Cinderella loses her phone instead of a slipper.", "parody", "satire", "a documentary"],
    ["What is the goal of satire?", "to use humor to point out a flaw or foolish habit", "to scare readers", "to give directions"],
    ["What is a parody?", "a funny imitation of a particular work or style", "an exact copy", "a serious speech"],
    ["A comic shows a backpack so heavy with homework that it needs its own bus. The exaggeration is used to...", "show how heavy homework can feel", "teach how to pack", "describe a real bus"],
    ["Which is most likely satire?", "A funny story where a town's clocks keep getting later because everyone says they will be 'five more minutes'", "A list of train times", "A recipe for soup"]];
  L15.push(mk("Satire and parody", rq(SA.map(r => [r[0].endsWith("?") || r[0].endsWith("to...") ? r[0] : r[0] + "<br><br>What is this?", r[1], r[2], r[3]]),
      ["Ask what the writer is making fun of, and how. Is it copying a style, or pointing at a human habit or problem?", "<b>Satire</b> uses humor and exaggeration to point out a flaw or problem in people or society. <b>Parody</b> copies a particular work or style in a funny way.", "Example: a comic strip where a lazy cat charges its owner a fee for opening the door pokes fun at pet owners, so it is satire. A silly poem that copies a famous poem's style is a parody. Now do yours."]),
    S("🤣", ["Funny with a point", "<b>Satire</b> uses humor, exaggeration and irony to show the foolish side of something, so readers think about it."], ["Parody", "A <b>parody</b> is a funny imitation of a specific story, song or style, usually with silly changes."], ["Be kind", "Good satire pokes fun at habits and ideas, not at people for who they are."])));

  const HF = [
    ["Which is a feature of historical fiction?", "a real time and place with some invented characters and events", "only real people and real events", "a story set in the future"],
    ["A story follows a made-up girl named Clara on a covered wagon in 1850. This is...", "historical fiction", "a biography", "science fiction"],
    ["A chapter explains how the Erie Canal was built, with dates and sources. This is...", "an informational history text", "historical fiction", "a fable"],
    ["In a historical novel, which part is most likely invented?", "the main character's talk with her sister", "the year the story takes place", "the name of a real city"],
    ["Why might a reader check a history book after reading a historical novel?", "to find out which parts really happened", "to find a new plot", "to count the pages"],
    ["Which text gives the most reliable dates?", "a history book with sources", "a historical novel", "a movie poster"],
    ["Historical fiction usually helps readers...", "feel what life might have been like in a past time", "learn the exact date of every event", "forget about the past"],
    ["A historical novel includes a real event, such as a big fair in 1893, but its hero is invented. Why is it still fiction?", "the main characters and plot are made up", "the date is wrong", "it has dialogue"]];
  L15.push(mk("Historical fiction and history texts", rq(HF,
      ["Ask whether the text is meant to tell a made-up story set in the past, or to report what really happened.", "<b>Historical fiction</b> mixes real settings and events with invented characters and plot. A <b>history text</b> is nonfiction that reports real events, often with dates and sources.", "Example: a novel about a fictional blacksmith's son in Colonial times is historical fiction. A book on how Colonial towns were governed, with a bibliography, is a history text. Now do yours."]),
    S("⏳", ["Two ways to visit the past", "We can learn about the past from stories and from history texts."], ["Historical fiction", "<b>Real</b> time and place, plus <b>invented</b> characters and plot. It helps you picture daily life."], ["History texts", "<b>Nonfiction</b>: real events, dates, causes, and sources. Check a history text if you want to know what truly happened."])));

  const CT = [
    ["Which information is usually part of a source entry?", "author, title, publisher or website, and date", "the reader's name and grade", "the color of the cover"],
    ["What is plagiarism?", "presenting someone else's words or ideas as your own", "quoting a source and giving credit", "writing a summary and naming where it came from"],
    ["You copy a sentence exactly from a book. What must you do?", "put it in quotation marks and name the source", "change one word and skip credit", "nothing, if it is short"],
    ["Do you need to give credit when you paraphrase?", "yes, the idea came from someone else", "no, because the words are yours", "only if it is a page long"],
    ["In many citation styles, a book entry begins with...", "the author's last name", "the page count", "the reader's name"],
    ["A fact such as 'Water freezes at 0 degrees Celsius' is common knowledge. It usually...", "does not need a citation", "must always be cited", "must be in quotation marks"],
    ["Where do you list all the sources you used?", "a works cited or bibliography page at the end", "on the cover", "in the title"],
    ["Which is a safe way to use a source?", "paraphrase it and cite it", "copy and paste it as your own", "hide where it came from"],
    ["Why do writers cite sources?", "to give credit and let readers check the facts", "to make the paper longer", "to avoid writing anything themselves"]];
  L15.push(mk("Giving credit: quoting and citing", rq(CT,
      ["Think about whose ideas and words they are. Credit goes to the person who made them.", "Use <b>quotation marks</b> for exact words, <b>paraphrase</b> in your own words, and always <b>cite</b> the source. A works cited page lists the sources at the end.", "Example: if you take a fact about elephants from a book by J. Rao, you write the idea in your own words and list J. Rao's book in your sources. Now do yours."]),
    S("📎", ["Giving credit", "When you use someone else's words or ideas, you must say where they came from."], ["Three ways", "<b>Quote</b>: exact words in quotation marks, with the source.<br><b>Paraphrase</b>: your own words, still cited.<br><b>Summarize</b>: the main points, still cited."], ["Plagiarism", "Using someone's work as your own is <b>plagiarism</b>. A source entry usually has the <b>author, title, publisher or website, and date</b>."])));

  const DR = [
    ["A character is alone on stage and speaks her private thoughts aloud. This is a...", "soliloquy", "monologue", "aside"],
    ["A character turns to the audience and whispers a quick comment the others cannot hear. This is an...", "aside", "soliloquy", "monologue"],
    ["One character gives a long speech to other characters on stage. This is a...", "monologue", "soliloquy", "aside"],
    ["How is a soliloquy different from a monologue?", "In a soliloquy the character is alone and shares thoughts; in a monologue others are listening", "A soliloquy is always funny", "A monologue has no words"],
    ["What does a soliloquy let the audience learn?", "what the character is secretly thinking", "who wrote the play", "how long the play will be"],
    ["In a script: <i>(to the audience) He thinks I am his friend.</i> What is this?", "an aside", "a soliloquy", "a monologue"],
    ["Which is usually the shortest: a soliloquy, a monologue or an aside?", "an aside", "a monologue", "a soliloquy"],
    ["Which is simply a conversation between two or more characters?", "dialogue", "an aside", "a soliloquy"]];
  L15.push(mk("Monologue, soliloquy and aside", rq(DR,
      ["Think about who is on stage and who can hear what the character says.", "<b>Monologue</b>: a long speech to others. <b>Soliloquy</b>: a speech alone, saying thoughts aloud. <b>Aside</b>: a quick remark to the audience that other characters do not hear.", "Example: the character in a play steps forward in the empty room and says, 'What should I do?' That is a soliloquy because she is alone. Now do yours."]),
    S("🎭", ["Speaking on stage", "Plays have special kinds of speeches."], ["The kinds", "<b>Dialogue</b>: characters talking to each other.<br><b>Monologue</b>: one long speech heard by others.<br><b>Soliloquy</b>: a character alone, speaking thoughts aloud."], ["Aside", "An <b>aside</b> is a quick comment to the audience. The other characters pretend not to hear it."])));

  L15.push(MIX("Mixed practice", L15[1], L15[4], L15[8], L15[11]));
  L15.push(MIX("Level 15 Challenge", L15[0], L15[3], L15[5], L15[9], L15[10], L15[14], L15[16]));

  Object.assign(READING_LEVELS, { 13: L13, 14: L14, 15: L15 });
})();
