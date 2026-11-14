// Mind Lab Reading, levels 22-24 (10th grade second half, 11th grade). 20 lessons each.
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
  // rows: [text, right, wrong, (wrong), optional visual]; hs = array of 3 hints or a function of the row
  const rq = (rows, hs) => () => {
    const r = pick(rows);
    const cs = [r[1], r[2], r[3]].filter(x => x != null);
    const q = { text: r[0], choices: shuf(cs), answer: r[1], hints: typeof hs === "function" ? hs(r) : hs };
    if (r[4]) q.visual = r[4];
    return q;
  };
  // rc: rows [text, right, wrong, wrong, clue]; hint 2 is the row's own clue
  const rc = (rows, h1, h3) => () => {
    const r = pick(rows);
    const cs = [r[1], r[2], r[3]].filter(x => x != null);
    return { text: r[0], choices: shuf(cs), answer: r[1], hints: [h1, r[4], h3] };
  };
  // classify: stem has {} for the item; items = [text, categoryIndex]
  const cl = (stem, cats, items, hs) => () => {
    const r = pick(items), ans = cats[r[1]];
    return { text: stem.replace("{}", r[0]), choices: shuf([ans].concat(rest(cats, ans, 2))), answer: ans, hints: typeof hs === "function" ? hs(r) : hs };
  };
  const alt = (...fs) => () => pick(fs)();
  const ROOTH = (ex) => ["Think of another word that uses the same root. What idea do all those words share?", "Split the word into prefix + root + ending. The root gives the core idea. Guess the core idea from words you already know.", ex + " Now do yours."];
  const L22 = [], L23 = [], L24 = [];

  // ================= LEVEL 22 =================
  L22.push(mk("Latin roots: spec, trac, anim, ambul, nomen", rq([
      ["The Latin root <b>spec/spect</b> is in <i>inspect</i>, <i>spectator</i> and <i>spectacle</i>. What does it mean?", "look or see", "pull", "walk"],
      ["The Latin root <b>trac/tract</b> is in <i>tractor</i>, <i>attract</i> and <i>extract</i>. What does it mean?", "pull or drag", "name", "life"],
      ["The Latin root <b>anim</b> is in <i>animal</i>, <i>animate</i> and <i>unanimous</i>. What does it mean?", "life or spirit", "look", "walk"],
      ["The Latin root <b>ambul</b> is in <i>ambulance</i>, <i>amble</i> and <i>ambulatory</i>. What does it mean?", "walk", "pull", "name"],
      ["The Latin root <b>nomen/nomin</b> is in <i>nominate</i>, <i>nomenclature</i> and <i>misnomer</i>. What does it mean?", "name", "life", "look"],
      ["A <i>spectator</i> at a match is a person who...", "watches", "pulls", "names the players"],
      ["To <i>retract</i> a statement is to...", "pull it back", "make it louder", "give it a name"],
      ["An <i>animated</i> discussion is one that is full of...", "life and energy", "silence", "walking"],
      ["To <i>amble</i> along a path is to...", "walk slowly", "pull a cart", "look closely"],
      ["To <i>nominate</i> someone for a prize is to...", "name them as a candidate", "pull them away", "wave to them"],
      ["To <i>inspect</i> a bicycle is to...", "look it over carefully", "pull it apart", "give it a name"],
      ["A <i>misnomer</i> is a word that is a wrong...", "name", "step", "picture"]],
    ROOTH("Example: <b>port</b> is in <i>transport</i>, <i>export</i> and <i>portable</i>. Each word is about carrying, so <b>port</b> means 'carry'.")),
    S("🧩", ["Five Latin roots", "Roots from Latin unlock many long words."],
      ["The roots", "<b>spec/spect</b> = look (<b>spect</b>ator)<br><b>trac/tract</b> = pull (<b>tract</b>or)<br><b>anim</b> = life, spirit (<b>anim</b>al)<br><b>ambul</b> = walk (<b>ambul</b>ance)<br><b>nomen/nomin</b> = name (<b>nomin</b>ate)"],
      ["Use them", "<i>pro</i> (forward) + <i>tract</i> = <i>protract</i>, 'pull out longer'. <i>Uni</i> (one) + <i>anim</i> = <i>unanimous</i>, 'of one spirit', so everyone agrees."])));

  L22.push(mk("Greek roots: anthrop, dyna, kinet, gno, aer", rq([
      ["The Greek root <b>anthrop</b> is in <i>anthropology</i> and <i>philanthropy</i>. What does it mean?", "human being", "power", "air"],
      ["The Greek root <b>dyna</b> is in <i>dynamic</i>, <i>dynamo</i> and <i>dynasty</i>. What does it mean?", "power", "movement", "know"],
      ["The Greek root <b>kine/kinet</b> is in <i>kinetic</i> and <i>kinesiology</i>. What does it mean?", "movement", "human being", "air"],
      ["The Greek root <b>gno/gnos</b> is in <i>diagnosis</i>, <i>prognosis</i> and <i>agnostic</i>. What does it mean?", "know", "power", "movement"],
      ["The Greek root <b>aer</b> is in <i>aerial</i>, <i>aerobics</i> and <i>aerodynamic</i>. What does it mean?", "air", "know", "human being"],
      ["An <i>anthropologist</i> studies...", "human beings and their cultures", "the air", "moving objects"],
      ["<i>Kinetic</i> energy is the energy of...", "motion", "stillness", "heat only"],
      ["A doctor's <i>diagnosis</i> comes from 'knowing' through...", "examining the signs", "wishing", "walking away"],
      ["An <i>aerial</i> photo is taken from...", "the air", "under the sea", "inside a house"],
      ["A <i>dynamic</i> speaker is full of...", "energy and force", "silence", "sleepiness"],
      ["A <i>philanthropist</i> is a person who loves and helps...", "humankind", "machines", "weather"],
      ["A <i>prognosis</i> is a doctor's prediction. It literally means 'knowing...'", "before", "after", "nothing"]],
    ROOTH("Example: <b>chrom</b> is in <i>chromatic</i> and <i>monochrome</i>. Both words are about colour, so <b>chrom</b> means 'colour'.")),
    S("🏛️", ["Five Greek roots", "More Greek roots, many of them in science and medicine."],
      ["The roots", "<b>anthrop</b> = human (<b>anthrop</b>ology)<br><b>dyna</b> = power (<b>dyna</b>mic)<br><b>kine/kinet</b> = movement (<b>kinet</b>ic)<br><b>gno/gnos</b> = know (dia<b>gnos</b>is)<br><b>aer</b> = air (<b>aer</b>ial)"],
      ["Build words", "<i>aero</i> + <i>dynamic</i> = <i>aerodynamic</i>, 'about the force of moving air'. <i>Pro</i> (before) + <i>gnosis</i> = <i>prognosis</i>, 'knowing ahead of time'."])));

  const LOAN = [
    ["The word <i>algebra</i> came into English from which language?", "Arabic", "Japanese", "Dutch", "Think of the great mathematicians of the medieval Islamic world."],
    ["The word <i>kindergarten</i> came into English from which language?", "German", "Spanish", "Greek", "The idea of a school for little children grew in central Europe, and the word names a garden of children."],
    ["The word <i>piano</i> came into English from which language?", "Italian", "Russian", "Hindi", "Many music words, such as <i>opera</i> and <i>soprano</i>, come from the same country."],
    ["The word <i>tsunami</i> came into English from which language?", "Japanese", "Italian", "Norwegian", "It names a giant wave and comes from an island country in East Asia."],
    ["The word <i>safari</i> came into English from which language?", "Swahili", "French", "Czech", "It means 'journey' in a language of East Africa."],
    ["The word <i>canyon</i> came into English from which language?", "Spanish", "Turkish", "German", "Words about the American Southwest, like <i>rodeo</i>, often come from this language."],
    ["The word <i>ballet</i> came into English from which language?", "French", "Arabic", "Swahili", "Dance and cooking words such as <i>cafe</i> and <i>menu</i> often come from the same language."],
    ["The word <i>ski</i> came into English from which language?", "Norwegian", "Hindi", "Spanish", "It comes from a cold northern country where people travelled on snow."],
    ["The word <i>yogurt</i> came into English from which language?", "Turkish", "Czech", "Japanese", "Think of a language from a country that links Europe and Asia."],
    ["The word <i>robot</i> came into English from which language?", "Czech", "Arabic", "Norwegian", "A 1920 play from central Europe introduced the word."]];
  L22.push(mk("Borrowed words", rc(LOAN, "Think about where the thing itself came from: a sport, a food, a school idea, a kind of music?", "Example: the word <i>pajamas</i> came from Hindi and Urdu, because the loose clothes came from South Asia. Now do yours."),
    S("🌍", ["English borrows", "English is a great borrower. A <b>loanword</b> is a word taken from another language, often along with the thing it names."],
      ["Where from?", "<b>algebra</b> (Arabic), <b>piano</b> (Italian), <b>ballet</b> (French), <b>kindergarten</b> (German), <b>tsunami</b> (Japanese), <b>safari</b> (Swahili), <b>canyon</b> (Spanish)"],
      ["A clue", "The word often arrives with the idea. Music words come from Italy, dance and food words from France, math words from the Arabic-speaking world, and wave and sport words from where those things began."])));

  L22.push(mk("Conditional sentences", rq([
      ["Which sentence correctly describes an imaginary situation?", "If I had wings, I would fly to school.", "If I had wings, I will fly to school.", "If I would have wings, I would fly to school."],
      ["Which sentence is about a real possibility in the future?", "If it snows tomorrow, school will close.", "If it snowed tomorrow, school would closed.", "If it would snow tomorrow, school closes."],
      ["Complete the sentence about the past: 'If she had left earlier, she ___ the bus.'", "would have caught", "will catch", "would catches"],
      ["Complete the general truth: 'If water reaches 100 degrees Celsius at sea level, it ___.'", "boils", "would have boiled", "boiled yesterday"],
      ["In 'If I were you, I would apologize,' why is it <i>were</i> and not <i>was</i>?", "It states an imaginary situation (subjunctive)", "The subject is plural", "It describes a past event"],
      ["Which sentence looks back at something that did NOT happen?", "If we had practiced, we would have won.", "If we practice, we will win.", "If we practiced, we would win."],
      ["Which sentence states a general rule of science?", "If you heat ice, it melts.", "If you had heated ice, it would have melted.", "If you heated ice, it will have melted."],
      ["Complete the imaginary sentence: 'If I ___ taller, I could reach the top shelf.'", "were", "will be", "am"],
      ["Which sentence is correct?", "If it rains this weekend, we will stay inside.", "If it will rain this weekend, we stay inside.", "If it would rain this weekend, we will stayed inside."]],
    ["Decide first: is the <i>if</i> part real and possible, imaginary, or about a past that cannot change?", "Real or general: present tense in the <i>if</i> part. Imaginary now: past tense in the <i>if</i> part with <i>would</i> in the other. Imaginary past: <i>had</i> + past participle with <i>would have</i>.", "Example: 'If the bus ___ late, we ___ walk' needs a real possibility, so: 'If the bus is late, we will walk.' Now do yours."]),
    S("🔀", ["If... then", "A <b>conditional sentence</b> has an <i>if</i> part and a result part. The verb forms show how real the idea is."],
      ["Four kinds", "<b>General truth:</b> If you heat ice, it melts.<br><b>Real future:</b> If it rains, we will stay in.<br><b>Imaginary now:</b> If I had wings, I would fly.<br><b>Imaginary past:</b> If she had left earlier, she would have caught it."],
      ["Be careful", "Never put <i>would</i> in the <i>if</i> part. For imaginary 'be' use <b>were</b> for every subject: 'If I were you...'"])));

  const ABS = [
    ["The storm having passed, the hikers resumed their climb.", "The storm having passed", "the hikers resumed their climb", "resumed their climb"],
    ["Her hands shaking, Mia opened the envelope.", "Her hands shaking", "Mia opened the envelope", "opened the envelope"],
    ["Dinner finished, the family cleared the table.", "Dinner finished", "the family cleared the table", "cleared the table"],
    ["The crowd roaring, the team ran onto the field.", "The crowd roaring", "the team ran onto the field", "ran onto the field"],
    ["Arms folded, the coach watched the game.", "Arms folded", "the coach watched the game", "watched the game"],
    ["The sun setting behind the hills, we turned for home.", "The sun setting behind the hills", "we turned for home", "turned for home"],
    ["Her eyes bright with excitement, Priya unwrapped the box.", "Her eyes bright with excitement", "Priya unwrapped the box", "unwrapped the box"],
    ["The lights dimming, the audience grew quiet.", "The lights dimming", "the audience grew quiet", "grew quiet"]];
  L22.push(mk("Absolute phrases", () => {
    const r = pick(ABS);
    if (Math.random() < 0.75) return { text: "Find the absolute phrase: <i>" + r[0] + "</i>", choices: shuf([r[1], r[2], r[3]]), answer: r[1],
      hints: ["An absolute phrase has its own noun and an <i>-ing</i> or <i>-ed</i> word, but no complete verb of its own.", "It sits at the start (or end) of the sentence, set off by a comma, and describes the whole main clause. Which chunk can NOT stand alone as a sentence but has its own noun?", "Example: in 'Her voice trembling, she began to speak,' the absolute phrase is 'Her voice trembling' (noun + participle). Now do yours."] };
    const qs = [
      ["What makes an absolute phrase different from an ordinary participial phrase?", "It has its own noun and does not modify one word", "It has no participle", "It must come at the end"],
      ["An absolute phrase usually modifies...", "the whole rest of the sentence", "a single noun only", "a single adverb"],
      ["How is an absolute phrase usually punctuated?", "It is set off with a comma", "It is set off with a colon", "It has no punctuation"],
      ["Which is an absolute phrase?", "The game over", "Over the game", "Playing the game"]];
    const q = pick(qs);
    return { text: q[0], choices: shuf([q[1], q[2], q[3]]), answer: q[1],
      hints: ["Think about the parts: noun + participle, with a comma.", "It adds extra detail about the situation, and it is not a full clause or a simple phrase tied to one noun.", "Example: 'The bell ringing, the students rushed out.' 'The bell ringing' has its own noun, so it is absolute. Now do yours."] };
  }, S("✨", ["A phrase on its own", "An <b>absolute phrase</b> is a noun plus a participle (an <i>-ing</i> or <i>-ed</i> word). It adds a detail about the whole sentence."],
      ["Spot it", "<i>Her hands shaking</i>, Mia opened the envelope.<br><i>Dinner finished</i>, we cleared the table.<br>It has its own noun but no full verb, so it cannot stand alone."],
      ["Why use it?", "It packs a vivid extra detail into one sentence. Set it off with a comma."])));

  L22.push(mk("Indefinite pronouns and group nouns", rq([
      ["Everyone ___ finished the test.", "has", "have", "are"],
      ["Each of the students ___ a book.", "has", "have", "are"],
      ["Neither of the answers ___ correct.", "is", "are", "were"],
      ["Both of the answers ___ correct.", "are", "is", "has been"],
      ["The team ___ practicing together today.", "is", "are", "were"],
      ["Some of the pie ___ gone.", "is", "are", "were"],
      ["Some of the cookies ___ gone.", "are", "is", "has been"],
      ["Many of the books ___ torn.", "are", "is", "has been"],
      ["Anybody who wants to join ___ welcome.", "is", "are", "were"],
      ["The class ___ planning a trip together.", "is", "are", "were"]],
    ["Find the real subject. Cross out any phrase that begins with <i>of</i>, except with words like <i>some</i> and <i>all</i>.", "Words such as <i>each</i>, <i>every</i>, <i>everyone</i>, <i>anybody</i> and <i>neither</i> take a singular verb. <i>Both</i>, <i>few</i> and <i>many</i> are plural. A group acting as one unit is singular.", "Example: 'Somebody ___ my pen' needs a singular verb, so 'Somebody has my pen.' Now do yours."]),
    S("👥", ["One or many?", "Some pronouns look plural but are singular. Group nouns can be either."],
      ["Singular", "each, every, everyone, everybody, someone, anyone, neither, either, nobody: <b>Everyone is here.</b>"],
      ["Plural and flexible", "both, few, many, several are plural: <b>Both are here.</b><br><i>Some</i>, <i>all</i>, <i>most</i> depend on what follows: <b>Some of the pie is gone. Some of the cookies are gone.</b><br>A team or class acting as one unit takes <b>is</b>."])));

  L22.push(mk("Double negatives", rq([
      ["Which sentence is correct in standard English?", "I don't know anything about it.", "I don't know nothing about it.", "I don't never know about it."],
      ["Which sentence is correct in standard English?", "He never goes anywhere.", "He never goes nowhere.", "He don't never go anywhere."],
      ["Which sentence has NO double negative?", "We could barely see the stage.", "We couldn't barely see the stage.", "We couldn't hardly see no stage."],
      ["'It is not uncommon to see deer here' means that seeing deer is...", "fairly common", "very rare", "impossible"],
      ["'The task is not impossible' means the task...", "can be done", "cannot be done", "is already finished"],
      ["Which fixes 'Nobody never helped me'?", "Nobody ever helped me.", "Nobody never helped to me.", "Nobody helped me never."],
      ["Which sentence is correct?", "I don't want any dessert.", "I don't want no dessert.", "I never want no dessert."],
      ["Which word can NOT follow <i>don't</i> without creating a double negative?", "nothing", "anything", "any"],
      ["Which sentence uses a deliberate, clear 'not un-' phrase?", "Her answer was not unkind.", "She didn't give no answer.", "Her answer wasn't nothing."]],
    ["Count the negative words (no, not, never, nothing, nobody, n't). Is there more than one doing the same job?", "In standard English, one negative is enough. Swap a second negative for <i>any</i>, <i>anything</i>, <i>ever</i> or <i>anywhere</i>. A careful 'not un-' phrase is different: it is an understatement.", "Example: 'She didn't see nobody' becomes 'She didn't see anybody.' Now do yours."]),
    S("🚫", ["One negative is enough", "A <b>double negative</b> uses two negatives where one is needed. Standard English avoids it."],
      ["Fix it", "<s>I don't know nothing.</s> → I don't know <b>anything</b>.<br><s>He never goes nowhere.</s> → He never goes <b>anywhere</b>.<br><s>We couldn't hardly see.</s> → We could <b>hardly</b> see."],
      ["Not the same", "A writer may use <i>not un-</i> on purpose: <i>not uncommon</i> means 'fairly common'. This is called <b>litotes</b>, a mild understatement."])));

  L22.push(mk("Epiphanies and turning points", rq([
      ["In a story, an <b>epiphany</b> is...", "a sudden moment when a character understands something important", "a flashback to the past", "a clue about the ending"],
      ["A boy who always teases his sister sees her stand up for him. He suddenly sees how unfair he has been. This is a(n)...", "epiphany", "flashback", "foreshadowing"],
      ["Where do epiphanies often appear in a story?", "Near the climax or ending", "Only in the title", "Before the characters are introduced"],
      ["Which line shows a character's epiphany?", "Suddenly she understood that she had been afraid of the wrong thing all along.", "She walked to the store.", "The rain fell for three days."],
      ["What does an epiphany usually change?", "How the character sees themselves or the world", "The font of the story", "The number of characters"],
      ["A <b>turning point</b> in a story is...", "a moment when events or a character's choices change the direction of the story", "the first sentence", "a list of characters"],
      ["Which is most likely a turning point?", "The hero decides to tell the truth instead of hiding it.", "The hero eats lunch.", "The narrator describes a table."],
      ["Why do authors use epiphanies?", "To reveal theme through a character's new understanding", "To make the story shorter", "To list facts"],
      ["After an epiphany, a character often...", "acts differently", "forgets the story", "leaves the book"]],
    ["Ask: does the character learn something, and does it change how they see things?", "Look for what is going on inside the character at that moment. Turning points change the direction of the plot, and they can overlap with inner moments.", "Example: a girl watches her grandfather give away his savings and suddenly sees what generosity means. The moment of insight is the epiphany. Now do yours."]),
    S("💡", ["The lightbulb moment", "An <b>epiphany</b> is a sudden flash of understanding for a character. It often shows the story's theme."],
      ["How to spot it", "Look for words like <i>suddenly she saw</i>, <i>he realized</i>, <i>for the first time</i>. The character's view of life or of themselves shifts."],
      ["Turning points", "A <b>turning point</b> is a moment that changes the story's direction, such as a brave choice. An epiphany is a quiet turning point inside the mind."])));

  L22.push(mk("Weather that matches the mood", rq([
      ["<b>Pathetic fallacy</b> means that nature or weather seems to...", "mirror a character's or scene's mood", "talk to the reader", "explain the plot"],
      ["'Storm clouds gathered as the two friends argued.' What does the weather suggest?", "Rising tension and anger", "Joy and celebration", "Boredom"],
      ["Which setting best matches a scene of hopeful new beginnings?", "Sunlight spilled across the dewy hills.", "A cold fog swallowed the empty street.", "Thunder rattled the shutters."],
      ["'The sky wept as they said goodbye to the old house.' This is an example of...", "pathetic fallacy", "a simile", "an acronym"],
      ["Why might an author describe a gloomy gray day before a sad scene?", "To prepare the mood for what is coming", "To list the facts about weather", "To confuse the reader"],
      ["Which weather detail would most likely signal danger ahead?", "A sudden hush and a darkening sky", "A warm breeze and birdsong", "A bright rainbow"],
      ["How is pathetic fallacy different from ordinary personification?", "The nature described reflects the feelings of the scene", "It never uses weather", "It gives numbers"],
      ["A dull, endless drizzle follows a character who just failed. The drizzle suggests...", "discouragement", "pride", "excitement"],
      ["The mood in 'Sunshine flooded the room and the birds sang' is...", "cheerful", "threatening", "bitter"]],
    ["Ask what feeling the weather or landscape creates, and whether it matches the characters' feelings.", "Compare the mood of the scenery with the mood of the people in the scene. Writers often pair stormy weather with trouble and sunshine with good news.", "Example: 'A heavy mist hung over the field as the team waited for the bad news.' The mist matches worry. Now do yours."]),
    S("⛈️", ["The sky shares the feeling", "<b>Pathetic fallacy</b> gives nature a mood that matches the human scene. The weather seems to feel what the characters feel."],
      ["Examples", "Storm and thunder → anger or danger<br>Warm sun → hope or joy<br>Fog → confusion<br>Cold rain → sadness"],
      ["Notice it", "When a scene opens with the weather, ask: <i>what mood is the author building?</i>"])));

  L22.push(mk("The anti-hero", rq([
      ["An <b>anti-hero</b> is a main character who...", "lacks traditional heroic qualities but still carries the story", "is always the villain", "never appears"],
      ["Which character is most like an anti-hero?", "A grumpy, selfish thief who slowly helps others while still bending the rules", "A perfectly kind knight who always does right", "A background character with no lines"],
      ["Why do readers follow anti-heroes?", "They are flawed and so feel real and interesting", "They are always funny", "They are perfect"],
      ["How is an anti-hero different from a classic hero?", "Their motives are mixed and they may break rules", "They are always stronger", "They never change"],
      ["A traditional hero is usually...", "brave and good", "sneaky and selfish", "absent"],
      ["A <b>tragic hero</b> is different from an anti-hero because a tragic hero...", "is admirable but brought down by a flaw", "is always selfish", "has no flaws"],
      ["Which trait fits an anti-hero?", "Morally gray choices", "Perfect honesty at all times", "Never making mistakes"],
      ["A story's anti-hero cheats at a contest but later gives the prize to a friend in need. This shows...", "mixed motives", "a perfect character", "a flat character"],
      ["Which is the BEST reason an author chooses an anti-hero?", "To show that good and bad are mixed in real people", "To avoid writing a plot", "To scare the reader"]],
    ["Think about the main character's flaws. Do they match the usual picture of a hero?", "Think about the main character's goals and methods. Are they clearly noble, or mixed with selfishness or rule-breaking? Compare with a knight in shining armor and with a villain.", "Example: a smuggler with a rough heart who agrees to guide villagers to safety is an anti-hero. Now do yours."]),
    S("🦹", ["Hero with a flaw", "An <b>anti-hero</b> is the main character, but not the shining kind: selfish, rough or morally gray."],
      ["Compare", "<b>Classic hero:</b> brave, good, clear goals.<br><b>Anti-hero:</b> flawed, mixed motives, may bend rules.<br><b>Tragic hero:</b> admirable, but a flaw leads to downfall."],
      ["Why they work", "Readers see that people are rarely all good or all bad, so anti-heroes feel real."])));

  L22.push(mk("Coming-of-age stories", rq([
      ["A <b>coming-of-age story</b> (bildungsroman) is mainly about...", "a young person growing up and learning about life", "a trip to space", "a detective at work"],
      ["Which element is typical of a coming-of-age story?", "A young main character loses some innocence and learns", "A talking animal", "A long list of recipes"],
      ["The German word <i>Bildungsroman</i> means roughly...", "a novel about growth or education", "a story about a king", "a poem about mountains"],
      ["Which moment is most typical of a coming-of-age story?", "A teenager realizes the adults in the town are not perfect and chooses her own path", "A robot is repaired", "A bus arrives on time"],
      ["What is 'loss of innocence'?", "Learning hard truths about the world", "Learning to read", "Moving to a new city for fun"],
      ["Dickens's <i>Great Expectations</i> follows an orphan named Pip as he grows up. It is a...", "coming-of-age novel", "science manual", "collection of riddles"],
      ["In coming-of-age stories, the main change is usually...", "inside the character", "in the weather", "in the printing"],
      ["Which question does a coming-of-age story often ask?", "Who am I, and who do I want to be?", "What is the price of milk?", "How tall is the tower?"],
      ["Which setting detail often helps a coming-of-age story?", "A hometown the character must leave or see differently", "A list of dates", "A set of rules"]],
    ["Think about what changes in the main character as the story goes on.", "Look at who the main character is, what challenge they face, and how they differ at the end. The change is usually inside them.", "Example: a girl spends a summer with her uncle at a farm, faces a hard choice, and returns home more mature. That is a coming-of-age arc. Now do yours."]),
    S("🌱", ["Growing up on the page", "A <b>coming-of-age story</b> follows a young person who grows wiser. Another name is <i>bildungsroman</i> (German for 'education novel')."],
      ["What it has", "A young protagonist<br>A challenge or loss<br>Loss of innocence<br>A new understanding of self and world"],
      ["Spot the theme", "Themes are often about identity, family, friendship, fairness and responsibility."])));

  const PP = [[10, 15], [20, 30], [40, 60], [50, 75], [20, 40], [5, 10], [30, 45], [8, 12], [20, 25], [25, 50]];
  L22.push(mk("Percent or percentage points?", () => {
    const [a, b] = pick(PP), pts = b - a, rel = Math.round(pts / a * 100);
    const kind = pick(["pts", "rel"]);
    if (kind === "pts") return { text: "Support for a school plan rose from " + a + "% to " + b + "%. By how many <b>percentage points</b> did it rise?", answer: pts,
      hints: ["Percentage points are found by simple subtraction of the two percentages.", "Take the new percentage and subtract the old percentage.", "Example: a rate going from 60% to 66% rose by 6 percentage points. Now do yours."] };
    return { text: "A rate rose from " + a + "% to " + b + "%. By what <b>percent</b> did it rise? (Compare the change to the starting value.)", answer: rel,
      hints: ["A percent change compares the change to where you started.", "Find the rise in points first, divide it by the starting percentage, then turn it into a percent.", "Example: a rate going from 60% to 66% rose by 6 points; 6 divided by 60 is 0.1, so it rose 10 percent. Now do yours."] };
  }, S("📊", ["Two different rises", "A <b>percentage point</b> change is a simple subtraction of two percentages. A <b>percent</b> change compares the change with the starting value."],
      ["Worked example", "A rate goes from 20% to 30%.<br>Change in points: 30 − 20 = <b>10 percentage points</b>.<br>Percent change: 10 ÷ 20 = 0.5, so <b>50 percent</b> higher."],
      ["Read headlines carefully", "'Up 50 percent' sounds dramatic. 'Up 10 points' may be the same news. Check the starting value."])));

  L22.push(mk("Arguing by analogy", rq([
      ["A writer argues: 'Banning cars downtown worked in City A, so it will work in City B.' What would make this stronger?", "Showing that the two cities are alike in size and traffic", "Repeating the claim loudly", "Naming more cars"],
      ["An argument by analogy is weak when...", "the two things differ in ways that matter", "the two things are alike", "it uses examples"],
      ["Which is the best basis for an argument by analogy?", "Two cases that are similar in the key ways", "Two cases that share only a color", "Two cases with different goals"],
      ["'Learning to code is like learning a language, so it needs daily practice.' This works because...", "both skills improve with regular practice", "both use paper", "both happen in schools only"],
      ["'A school should be run like a zoo because both have lots of young creatures.' This analogy is weak because...", "the similarity is shallow and ignores key differences", "it is too long", "it uses a number"],
      ["To test an analogy, you should ask...", "Are the cases alike in ways that matter to the point?", "Which sentence is longer?", "Which has more adjectives?"],
      ["What is the main job of an analogy in an argument?", "To make a case clear by comparing it with a familiar one", "To list statistics", "To end the essay"],
      ["Which counter-point best attacks the City A and City B analogy?", "City B has no public transport, unlike City A", "City A has a river", "City A has more parks"],
      ["Which phrase signals an analogy?", "just as... so too...", "for example the date was...", "in 1994"]],
    ["Ask what the two things being compared have in common and whether those parts matter to the point being made.", "A strong analogy rests on similarities that are relevant. A weak one leans on small likenesses and ignores big differences.", "Example: 'Training for a marathon is like saving money: small steady steps add up.' The shared idea is steady growth. Now do yours."]),
    S("⚖️", ["A comparison that argues", "An <b>argument by analogy</b> says: these two things are alike in key ways, so what is true of one is probably true of the other."],
      ["Test it", "Are the key similarities real and relevant?<br>Are there differences that break the comparison?"],
      ["Strong or weak", "<b>Strong:</b> a similar city with the same traffic problem.<br><b>Weak:</b> two things that share only a surface detail."])));

  L22.push(mk("Reading a scatterplot", rq([
      ["In a scatterplot, as study time goes up, test scores tend to go up. The dots slope...", "upward from left to right", "downward from left to right", "in a perfect circle", "📈"],
      ["As hours of video games go up, hours of sleep tend to go down. This is a...", "negative correlation", "positive correlation", "no correlation", "📉"],
      ["Shoe size and the number of books a person owns show no pattern. The scatterplot would look like...", "scattered dots with no clear direction", "a straight upward line", "a straight downward line"],
      ["A point far away from the rest of the dots is called a(n)...", "outlier", "average", "axis"],
      ["A <b>line of best fit</b> shows...", "the general trend of the points", "the exact value of every point", "the title"],
      ["A strong positive correlation means the dots...", "are close to an upward line", "are far from any line", "form a downward line"],
      ["If two things are correlated, can we say one causes the other?", "No, not without more evidence", "Yes, always", "Yes, if the line is straight"],
      ["On a scatterplot, each dot shows...", "one pair of values", "one average", "one title"],
      ["As temperature rises, ice cream sales rise. The relationship is...", "positive", "negative", "impossible"]],
    ["Look at the direction the dots move from left to right. Then think about whether one number rises with the other.", "Upward trend = positive. Downward trend = negative. No pattern = no correlation. Correlation alone does not prove one thing causes the other.", "Example: as the number of rainy days rises, the number of umbrella sales rises too. The dots slope up, so the correlation is positive. Now do yours."]),
    S("📈", ["Dots tell a story", "A <b>scatterplot</b> plots pairs of numbers as dots. The pattern shows how two things relate."],
      ["Three patterns", "<b>Positive:</b> dots rise left to right.<br><b>Negative:</b> dots fall left to right.<br><b>None:</b> dots are scattered."],
      ["Careful", "An <b>outlier</b> is a dot far from the rest. A line of best fit shows the trend. Correlation does not prove cause."])));

  const ABST = [
    ["sleep", "We wanted to know whether sleep affects test scores.", "We surveyed 300 students about their sleep and recorded their scores.", "Students who slept nine hours scored higher than those who slept six.", "More sleep appears to be linked with better test performance."],
    ["plants", "We asked whether the amount of light changes how fast bean plants grow.", "We grew 40 bean plants under three different light levels for four weeks.", "Plants under bright light grew twice as tall as plants in dim light.", "Bean plants need enough light to grow well."],
    ["reading", "This study asked whether reading aloud helps young children learn new words.", "Two classes were compared: one heard daily read-alouds, the other did not.", "The read-aloud class learned 30 percent more new words.", "Daily reading aloud may help children build vocabulary."],
    ["exercise", "The study explored whether short walks improve students' mood.", "Participants took a ten-minute walk each day for two weeks and rated their mood.", "Mood ratings were higher on days when participants walked.", "Short daily walks may lift mood."]];
  const ABP = ["purpose", "method", "result", "conclusion"];
  L22.push(mk("Reading a study's abstract", () => {
    const row = pick(ABST), i = ri(0, 3), ans = row[i + 1];
    const others = shuf(ABST.filter(r => r !== row)).slice(0, 2).map(r => r[i + 1]);
    const label = ["states what the researchers WANTED TO FIND OUT (the purpose)", "describes HOW the study was done (the method)", "reports WHAT THEY FOUND (the result)", "says what the findings MEAN (the conclusion)"][i];
    return { text: "Which sentence from an abstract " + label + "?", choices: shuf([ans].concat(others)), answer: ans,
      hints: ["An abstract is a short summary of a study. It usually runs in order: purpose, method, result, conclusion.", "Match the job of the sentence: a question to answer, a description of the steps, numbers or findings, or what the findings suggest.", "Example: 'We tested whether music helps people focus' is the purpose, because it tells us what the study set out to learn. Now do yours."] };
  }, S("🔬", ["A study in a nutshell", "An <b>abstract</b> is a short summary at the top of a research article. It tells you whether to read on."],
      ["Four parts", "<b>Purpose:</b> what did they want to find out?<br><b>Method:</b> how did they do it?<br><b>Result:</b> what did they find?<br><b>Conclusion:</b> what does it mean?"],
      ["Tip", "Words like <i>suggest</i> and <i>may</i> in a conclusion show the authors are being careful."])));

  L22.push(mk("Tricky apostrophes", rq([
      ["Anna and Ben own one boat together. In <i>Anna and Ben___ boat</i>, where does the possessive go?", "Only on the last name", "On both names", "On neither name"],
      ["In <i>the children___ toys</i>, where does the apostrophe go?", "Before the s", "After the s", "Nowhere"],
      ["In <i>the women___ team</i>, where does the apostrophe go?", "Before the s", "After the s", "Nowhere"],
      ["Writing the decade <i>1990s</i>: where does the apostrophe go?", "Nowhere, since it is a plain plural", "Before the s", "After the s"],
      ["In <i>two weeks___ notice</i>, where does the apostrophe go?", "After the s", "Before the s", "Nowhere"],
      ["In <i>dos and don'ts</i>, the apostrophe in <i>don'ts</i> stands for the missing letter...", "o", "s", "d"],
      ["In <i>my mother-in-law___ car</i>, where does the possessive go?", "At the very end of the whole word", "After <i>mother</i>", "After <i>in</i>"],
      ["Which statement about <i>its</i> in 'The dog wagged its tail' is true?", "It is a possessive pronoun with no apostrophe", "It is short for <i>it is</i>", "It needs an apostrophe before the s"],
      ["Several players each have a locker. In <i>the players___ lockers</i>, where does the apostrophe go?", "After the s", "Before the s", "Nowhere"]],
    ["First decide: does it show ownership or is it just a plural? Then ask whether the owner is one thing or several.", "Ask: does the owner word already end in s? Plurals that do not end in s are treated like singular owners. A word like <i>its</i> works like <i>his</i>.", "Example: for the owner <i>the ladies</i>, the hats of the ladies is written 'the ladies' hats'. For <i>the men</i>, it is 'the men's room'. Now do yours."]),
    S("’", ["Small mark, big job", "The apostrophe shows <b>possession</b> or a <b>contraction</b>. It never makes a plain plural."],
      ["Rules", "Singular owner: <b>the dog's bone</b><br>Plural ending in s: <b>the players' lockers</b><br>Plural not ending in s: <b>the children's toys</b><br>Joint ownership: <b>Anna and Ben's boat</b>"],
      ["Watch for", "Decades: the <b>1990s</b> (no apostrophe)<br><b>its</b> = belonging to it; <b>it's</b> = it is"])));

  L22.push(mk("Fragments on purpose", rq([
      ["Which is a deliberate sentence fragment used for effect?", "Silence. Total, heavy silence.", "Because the bell rang before.", "Walking to the store and"],
      ["Where are deliberate fragments most acceptable?", "In fiction, dialogue and informal writing", "In formal lab reports", "In legal contracts"],
      ["What is the main effect of a short fragment after a long sentence?", "It adds emphasis or drama", "It makes the sentence longer", "It removes the meaning"],
      ["Which fragment would be a mistake in an essay?", "Because the data was incomplete.", "Nothing.", "A long, long day."],
      ["Which is a fragment?", "The rain beating on the window.", "The rain beat on the window.", "Rain fell."],
      ["'Not a sound. Not a breath.' These fragments create...", "tension", "a list of rules", "a scientific claim"],
      ["Why might a writer use a one-word sentence?", "To slow the pace and stress an idea", "To hide the topic", "To add data"],
      ["Which should a careful writer do before using a fragment?", "Be sure it is intentional and fits the tone", "Use as many as possible", "Remove all verbs"],
      ["'Gone. All of it.' Which strategy is this?", "Fragments for emphasis", "A run-on", "A citation"]],
    ["Ask whether the writer chose the fragment on purpose to add a feeling, or just forgot a part of the sentence.", "A fragment is missing a subject, a verb or a complete thought. Fiction and advertising use fragments on purpose for emphasis. Formal essays and reports usually avoid them.", "Example: 'He opened the door. Empty.' The fragment 'Empty.' stresses the shock. Now do yours."]),
    S("✂️", ["Breaking the rule well", "A <b>fragment</b> is an incomplete sentence. Skilled writers sometimes use one on purpose."],
      ["Effect", "Fragments speed up or slow down the pace, stress an idea, or copy the way people think.<br><i>Not a sound. Not a breath.</i>"],
      ["Know the setting", "OK in stories and speeches. Avoid in formal essays and reports. Do it on purpose, not by accident."])));

  L22.push(mk("Dialogue that works", rq([
      ["In <i>\"Come here\" she said</i>, where should the comma go?", "Inside the closing quotation mark", "Outside the closing quotation mark", "No comma is needed"],
      ["When a new person starts speaking, you should...", "start a new paragraph", "keep going on the same line", "put the words in italics"],
      ["Good dialogue in a story should...", "reveal character or move the plot forward", "repeat the narrator exactly", "list facts the reader already knows"],
      ["How should the quote in <i>\"Are you coming\" he asked</i> end?", "A question mark inside the quotes", "A period inside the quotes", "A comma outside the quotes"],
      ["Which dialogue tag is the simplest and least distracting?", "said", "exclaimed excitedly", "proclaimed loudly"],
      ["Which line sounds most like real speech?", "\"I can't, I've got practice.\"", "\"I am unable to attend as I have scheduled training.\"", "\"It is impossible for me to be present.\""],
      ["Which shows character through dialogue?", "\"Oh, forget it. Who cares?\" Maya muttered.", "Maya said something.", "Maya spoke in words."],
      ["In <i>\"If you go,\" Sam said, \"take a coat.\"</i> why is <i>take</i> lowercase?", "It continues one sentence interrupted by the tag", "It is a mistake", "A new speaker begins"],
      ["Dialogue can also be broken up with action. Which does this?", "\"I'm fine.\" She gripped the chair tightly.", "\"I'm fine.\" \"I'm fine.\"", "\"I'm fine\" said said."]],
    ["Look at the commas, periods and quotation marks. Each belongs in a specific spot.", "Commas and periods go inside the closing quotation mark. A tag after a quote is attached with a comma (or ? or !). A new speaker means a new paragraph. Good dialogue sounds natural and does a job.", "Example: \"We should leave,\" Tom said. The comma sits inside the quote marks and the tag follows. Now do yours."]),
    S("💬", ["Make characters talk", "Good <b>dialogue</b> sounds like real speech and does a job: it shows who a character is or moves the story on."],
      ["Punctuation", "\"Come here,\" she said.<br>\"Are you coming?\" he asked.<br>Punctuation goes <b>inside</b> the quotes. New speaker, new paragraph."],
      ["Style tips", "Use simple tags like <i>said</i>. Add small actions between lines. Cut small talk that does not matter."])));

  L22.push(MIX("Mixed practice", L22[0], L22[1], L22[3], L22[5], L22[8], L22[11], L22[14], L22[16]));
  L22.push(MIX("Level 22 Challenge", L22[2], L22[4], L22[6], L22[7], L22[9], L22[10], L22[12], L22[13], L22[15], L22[17]));

  // ================= LEVEL 23 =================
  L23.push(mk("Latin roots: lun, sol, ign, flor, umbr", rq([
      ["The Latin root <b>lun</b> is in <i>lunar</i> and <i>sublunar</i>. What does it mean?", "moon", "sun", "fire"],
      ["The Latin root <b>sol</b> is in <i>solar</i>, <i>solstice</i> and <i>solarium</i>. What does it mean?", "sun", "moon", "flower"],
      ["The Latin root <b>ign</b> is in <i>ignite</i>, <i>ignition</i> and <i>igneous</i>. What does it mean?", "fire", "shade", "moon"],
      ["The Latin root <b>flor</b> is in <i>floral</i>, <i>florist</i> and <i>flourish</i>. What does it mean?", "flower", "fire", "sun"],
      ["The Latin root <b>umbr</b> is in <i>umbrella</i>, <i>umbrage</i> and <i>penumbra</i>. What does it mean?", "shade or shadow", "flower", "moon"],
      ["A <i>lunar</i> calendar follows the cycles of the...", "moon", "sun", "wind"],
      ["Solar panels turn light from the ___ into power.", "sun", "moon", "fire"],
      ["The <i>ignition</i> of a car is what sets the engine...", "going, like a spark", "to sleep", "in shade"],
      ["A <i>florist</i> sells...", "flowers", "fire alarms", "umbrellas"],
      ["The first umbrellas gave their owners...", "shade", "fire", "flowers"],
      ["A <i>penumbra</i> is a partial shadow. The root <b>umbr</b> tells you it is about...", "shade", "fire", "the moon"],
      ["<i>Igneous</i> rocks are formed from...", "cooled molten rock", "flowers", "moonlight"]],
    ROOTH("Example: <b>aqu</b> is in <i>aquarium</i> and <i>aquatic</i>. Both words are about water, so <b>aqu</b> means 'water'.")),
    S("🌙", ["Roots from nature", "Latin names for the moon, the sun, fire, flowers and shade live inside many English words."],
      ["The roots", "<b>lun</b> = moon (<b>lun</b>ar)<br><b>sol</b> = sun (<b>sol</b>ar)<br><b>ign</b> = fire (<b>ign</b>ite)<br><b>flor</b> = flower (<b>flor</b>ist)<br><b>umbr</b> = shade (<b>umbr</b>ella)"],
      ["Use them", "<i>Sol</i> + <i>stice</i> (standing still) = <i>solstice</i>, the day the sun seems to pause in the sky. <i>Pen</i> (almost) + <i>umbra</i> (shadow) = <i>penumbra</i>, an almost-shadow."])));

  L23.push(mk("Greek roots: helio, pyro, cosm, metr, bar", rq([
      ["The Greek root <b>helio</b> is in <i>heliocentric</i> and <i>heliotrope</i>. What does it mean?", "sun", "fire", "measure"],
      ["The Greek root <b>pyr</b> is in <i>pyrotechnics</i> and <i>pyre</i>. What does it mean?", "fire", "sun", "weight"],
      ["The Greek root <b>cosm</b> is in <i>cosmos</i>, <i>cosmic</i> and <i>microcosm</i>. What does it mean?", "universe or order", "measure", "fire"],
      ["The Greek root <b>metr</b> is in <i>metric</i>, <i>thermometer</i> and <i>geometry</i>. What does it mean?", "measure", "universe", "sun"],
      ["The Greek root <b>bar</b> is in <i>barometer</i> and <i>isobar</i>. What does it mean?", "weight or pressure", "fire", "sun"],
      ["A <i>heliocentric</i> model of the solar system puts at the center the...", "Sun", "Earth", "Moon"],
      ["<i>Pyrotechnics</i> is the art of making...", "fireworks", "maps", "clocks"],
      ["A <i>microcosm</i> is a small version of the whole...", "world", "fire", "weight"],
      ["A <i>barometer</i> measures...", "air pressure", "temperature", "distance"],
      ["<i>Geometry</i> literally means measuring the...", "earth", "stars", "fire"],
      ["A <i>cosmic</i> event concerns the...", "universe", "kitchen", "classroom"],
      ["A <i>thermometer</i> measures heat. The root <b>metr</b> shows that it is a tool for...", "measuring", "burning", "weighing air"]],
    ROOTH("Example: <b>phon</b> is in <i>telephone</i> and <i>symphony</i>. Both words are about sound, so <b>phon</b> means 'sound'.")),
    S("🔭", ["Space and science roots", "Greek roots name the Sun, fire, the universe, measuring and pressure."],
      ["The roots", "<b>helio</b> = sun (<b>helio</b>centric)<br><b>pyr</b> = fire (<b>pyr</b>otechnics)<br><b>cosm</b> = universe, order (<b>cosm</b>os)<br><b>metr</b> = measure (ther<b>mometer</b>)<br><b>bar</b> = weight, pressure (<b>bar</b>ometer)"],
      ["Build words", "<i>Micro</i> (small) + <i>cosm</i> = <i>microcosm</i>, 'a small world'. <i>Helio</i> + <i>centric</i> = <i>heliocentric</i>, 'sun-centered'."])));

  const PLC = [
    ["The word <i>marathon</i> comes from a place in which country?", "Greece", "Italy", "Egypt", "A legend about a messenger running a long way gave this race its name."],
    ["The word <i>hamburger</i> comes from the name of the city of Hamburg in which country?", "Germany", "Spain", "Japan", "Think of a country in central Europe."],
    ["The word <i>denim</i> comes from <i>de Nîmes</i>, 'from' a town in which country?", "France", "Brazil", "India", "The French words <i>de</i> and a town name were squeezed together."],
    ["The word <i>cologne</i> (a light perfume) comes from the city of Cologne in which country?", "Germany", "Egypt", "Canada", "The city lies on the Rhine river."],
    ["The word <i>cashmere</i> (soft wool) comes from the region of Kashmir in which part of the world?", "South Asia", "South America", "Northern Europe", "Think of the mountains where the goats live."],
    ["The word <i>tuxedo</i> comes from Tuxedo Park, a place in which US state?", "New York", "Texas", "Florida", "It is an area north of New York City."],
    ["The word <i>jeans</i> comes from the name of the city Genoa in which country?", "Italy", "Norway", "Mexico", "Think of a country shaped like a boot."]];
  L23.push(mk("Words named for places", rc(PLC, "Many words come from the place where something was first made or worn. Think about where that might be.", "Example: <i>bologna</i> (the sausage) comes from Bologna, a city in Italy. Now do yours."),
    S("🗺️", ["The place is in the word", "A <b>toponym</b> is a word that comes from a place name. Products were often named for the place they came from."],
      ["Examples", "<b>marathon</b> from Marathon, Greece<br><b>denim</b> from <i>de Nîmes</i>, France<br><b>hamburger</b> from Hamburg, Germany<br><b>cashmere</b> from Kashmir<br><b>jeans</b> from Genoa, Italy"],
      ["Compare", "An <b>eponym</b> comes from a person's name. A <b>toponym</b> comes from a place's name."])));

  L23.push(mk("Collocations: words that go together", rq([
      ["Which is the natural phrase?", "make a decision", "do a decision", "build a decision"],
      ["Which is the natural phrase?", "do your homework", "make your homework", "build your homework"],
      ["Which is the natural phrase?", "take a photo", "make a photo", "put a photo"],
      ["Which is the natural phrase?", "heavy rain", "strong rain", "big rain"],
      ["Which is the natural phrase?", "pay attention", "spend attention", "buy attention"],
      ["Which is the natural phrase?", "keep a secret", "hold a secret", "stay a secret"],
      ["Which is the natural phrase?", "strong coffee", "powerful coffee", "heavy coffee"],
      ["Which is the natural phrase?", "draw a conclusion", "paint a conclusion", "carry a conclusion"],
      ["Which is the natural phrase?", "do your best", "make your best", "take your best"],
      ["Which is the natural phrase?", "heavy traffic", "strong traffic", "large traffic"]],
    ["Say each phrase aloud. Which one do you hear in everyday English?", "A <b>collocation</b> is a pair or group of words that natural speakers use together. Many are not logical, you simply learn them.", "Example: we say 'make a mistake' not 'do a mistake', and 'fast food' not 'quick food'. Now do yours."]),
    S("🤝", ["Word partners", "Some words live together. We say <i>heavy rain</i>, not <i>strong rain</i>, even though both seem to mean the same thing."],
      ["Common pairs", "<b>make</b> a decision, a mistake, a plan<br><b>do</b> homework, your best, the dishes<br><b>take</b> a photo, a break, a risk<br><b>pay</b> attention, a visit"],
      ["Learn them", "Collocations make writing sound natural. Notice the partners when you read."])));

  L23.push(mk("When passive voice is the best choice", rq([
      ["Which sentence is the best use of the passive voice?", "The window was broken during the night.", "The window was broken by me.", "The boy was kicked by the horse and fell."],
      ["Why might a science report say 'The solution was heated to 60 degrees'?", "The action matters more than who did it", "The writer wants to hide the facts", "Passive is always required"],
      ["Which active sentence matches 'The ball was thrown by Maya'?", "Maya threw the ball.", "The ball threw Maya.", "Maya was throwing by the ball."],
      ["Which reason justifies passive voice?", "The person doing the action is unknown", "The sentence is too short", "The writer likes long sentences"],
      ["Which sentence should probably be active?", "Our team won the championship.", "The championship was won by our team after a long season.", "The cake was eaten."],
      ["Passive voice can sound vague. Which sentence hides the doer?", "Mistakes were made.", "I made mistakes.", "The pilot made mistakes."],
      ["When the person who gets the action is the main topic, passive voice can help. Which fits?", "The new bridge was opened on Monday.", "Someone opened the new bridge on Monday.", "The mayor opened the new bridge after cutting a ribbon."],
      ["Active voice usually makes writing...", "clearer and more direct", "less clear", "longer on purpose"],
      ["Which sentence is passive?", "The letter was delivered yesterday.", "The mail carrier delivered the letter.", "Delivering the letter was easy."]],
    ["Ask: who or what is the real subject of the sentence? Do we know who did the action? Does it matter?", "Passive voice puts the receiver of the action first. It is useful when the doer is unknown, unimportant or obvious. Active voice is stronger when the doer matters.", "Example: 'The Eiffel Tower was built in 1889' works, because who built it is not the point. Now do yours."]),
    S("🔄", ["Not always bad", "In the <b>passive voice</b> the receiver of the action is the subject. Teachers often say avoid it, but it has good uses."],
      ["Good uses", "The doer is unknown: <i>The window was broken.</i><br>The doer is unimportant: <i>The bridge was opened Monday.</i><br>Science writing: <i>The solution was heated.</i>"],
      ["Watch out", "It can hide who is responsible: <i>Mistakes were made.</i> If the doer matters, use the active voice."])));

  const COORD = [["sharp", "clever", "idea"], ["loud", "annoying", "alarm"], ["cold", "wet", "day"], ["warm", "friendly", "smile"], ["quiet", "peaceful", "lake"], ["tall", "handsome", "tree"], ["bright", "cheerful", "room"]];
  const CUMUL = [["bright", "red", "kite"], ["old", "wooden", "door"], ["small", "silver", "key"], ["large", "brown", "dog"], ["tiny", "plastic", "toy"], ["big", "yellow", "bus"], ["three", "red", "apples"]];
  L23.push(mk("Commas between adjectives", () => {
    const co = Math.random() < 0.5, r = pick(co ? COORD : CUMUL);
    const art = /^[aeiou]/.test(r[0]) ? "an " : "a ";
    const ph = (r[0] === "three" ? "" : art) + r[0] + " " + r[1] + " " + r[2];
    const Y = "Yes, a comma is needed between the adjectives", N = "No, leave the adjectives without a comma";
    return { text: "Should there be a comma between the two adjectives in <i>" + ph + "</i>?", choices: shuf([Y, N, "Use a semicolon between them"]), answer: co ? Y : N,
      hints: ["Two tests: can you swap the adjectives, and can you put <i>and</i> between them? Try both.", "If both tests work, the adjectives are equal and need a comma. If the order sounds odd or <i>and</i> sounds wrong, no comma.", "Example: 'a long, boring speech' works as 'a boring and long speech' so it takes a comma. 'A big green truck' fails the swap test, so no comma. Now do yours."] };
  }, S("⛓️", ["To comma or not", "Two adjectives before a noun sometimes need a comma and sometimes do not."],
      ["The tests", "Swap them and add <i>and</i>.<br>'a sharp, clever idea' → 'a clever and sharp idea' ✔ comma<br>'a bright red kite' → 'a red and bright kite' ✘ no comma"],
      ["Why", "<b>Coordinate</b> adjectives each describe the noun equally. <b>Cumulative</b> adjectives build on one another in a set order (number, size, color, material)."])));

  L23.push(mk("Pronoun case in comparisons", rq([
      ["My brother is older than ___.", "I", "me", "myself"],
      ["No one ran faster than ___.", "she", "her", "herself"],
      ["You are as good at chess as ___.", "he", "him", "himself"],
      ["The prize was shared between Jon and ___.", "me", "I", "myself"],
      ["She gave the note to Ana and ___.", "me", "I", "myself"],
      ["Ana and ___ wrote the report.", "I", "me", "myself"],
      ["Everyone except ___ left early.", "him", "he", "himself"],
      ["Dad is not as tall as ___.", "we", "us", "ourself"],
      ["Between you and ___, the answer is simple.", "me", "I", "myself"]],
    ["Say the sentence with the missing verb added, or drop the other person. Which pronoun sounds right?", "Use the subject form (I, he, she, we, they) if it could be the subject of an unspoken verb. Use the object form (me, him, her, us, them) after a preposition like <i>between</i> or <i>except</i>.", "Example: 'She sings better than ___.' Add the missing verb: 'than he sings', so use <i>he</i>. Now do yours."]),
    S("🔎", ["I or me after than?", "After <b>than</b> or <b>as</b>, the sentence is shortened. Fill in the missing verb to choose the pronoun."],
      ["Test it", "My brother is older than <b>I</b> (am).<br>She runs as fast as <b>he</b> (does).<br>Dad is taller than <b>we</b> (are)."],
      ["After prepositions", "Use the object form: between you and <b>me</b>, except <b>him</b>, to Ana and <b>me</b>."])));

  L23.push(mk("Famous speeches and documents", rq([
      ["'I have a dream' is repeated at the start of many sentences in Dr. Martin Luther King Jr.'s famous speech. This technique is called...", "anaphora", "alliteration", "irony"],
      ["The Gettysburg Address ends with 'of the people, by the people, for the people.' This uses...", "parallel structure", "a question", "an acronym"],
      ["The Gettysburg Address was delivered in which year?", "1863", "1776", "1929"],
      ["'We the People' in the opening of the Constitution tells us that its authority comes from...", "the citizens", "a king", "a foreign power"],
      ["The Declaration of Independence (1776) was written to...", "explain why the American colonies were separating from Britain", "list the rules of baseball", "set the price of tea"],
      ["Franklin Roosevelt said, 'The only thing we have to fear is fear itself.' His main aim was to...", "calm and encourage the public", "start a fight", "list statistics"],
      ["Who gave the 'I have a dream' speech?", "Martin Luther King Jr.", "Abraham Lincoln", "Franklin Roosevelt"],
      ["'We hold these truths to be self-evident' suggests the writers think the ideas that follow are...", "obvious and need no proof", "uncertain", "jokes"],
      ["Churchill's 'We shall fight on the beaches... we shall never surrender' uses repetition of 'we shall' to build...", "determination", "confusion", "humor"]],
    ["Think about the purpose, audience and the way the speaker or writer builds the words.", "Repetition at the start of lines (anaphora) and balanced phrasing (parallel structure) make a speech memorable. Great speeches also pick words to match the moment.", "Example: Lincoln's 'of the people, by the people, for the people' sets three equal phrases side by side to sound strong and easy to remember. Now do yours."]),
    S("🎤", ["Words that moved people", "Famous speeches and founding documents use techniques you can name."],
      ["Techniques", "<b>Anaphora:</b> repeating the first words of lines (<i>I have a dream...</i>)<br><b>Parallel structure:</b> equal phrases (<i>of the people, by the people, for the people</i>)<br><b>Purpose:</b> to inspire, explain or unite"],
      ["Know the moment", "The Declaration (1776) explained a separation. The Gettysburg Address (1863) honored the fallen and renewed a cause. The 'I have a dream' speech (1963) called for equal rights."])));

  L23.push(mk("Ways to read: critical lenses", rq([
      ["A student studies how the Great Depression shaped events in a novel. Which lens is this?", "historical lens", "formalist lens", "reader-response lens"],
      ["A student studies how a poem's rhyme and images create meaning, without outside information. Which lens?", "formalist lens", "biographical lens", "historical lens"],
      ["A student asks how the author's childhood influenced a story. Which lens?", "biographical lens", "formalist lens", "psychological lens"],
      ["A student explores why a character avoids facing his fear. Which lens?", "psychological lens", "historical lens", "biographical lens"],
      ["A student writes about how the ending made her feel and why. Which lens?", "reader-response lens", "formalist lens", "historical lens"],
      ["The <b>formalist</b> (close reading) lens looks mainly at...", "the text's structure, language and form", "the author's life", "the reader's mood"],
      ["The <b>biographical</b> lens looks at...", "the author's life and experiences", "the rhyme", "the reader"],
      ["The <b>reader-response</b> lens focuses on...", "the reader's experience of the text", "the printing date", "the number of pages"],
      ["Why use more than one lens on a text?", "Each lens reveals different meanings", "To make the text shorter", "To avoid reading it"]],
    ["Ask what the student is looking at: the author, the time period, the characters' minds, the text itself, or the reader.", "Biographical = author's life. Historical = time and place. Psychological = minds and motives. Formalist = the words and form. Reader-response = what the reader thinks and feels.", "Example: a student studies how wartime rationing shaped a character's choices. She is studying the time period, so she is using the historical lens. Now do yours."]),
    S("🔍", ["Different ways in", "A <b>critical lens</b> is a way of looking at a text. The same book can be read in many ways."],
      ["Five lenses", "<b>Biographical:</b> the author's life<br><b>Historical:</b> the time and place<br><b>Psychological:</b> characters' minds<br><b>Formalist:</b> language and structure<br><b>Reader-response:</b> the reader's reaction"],
      ["Tip", "Pick the lens that matches your question, then support your ideas with evidence from the text."])));

  L23.push(mk("Retellings and echoes of old stories", rq([
      ["A novel retells a fairy tale from the villain's point of view. This is a...", "retelling", "summary", "table of contents"],
      ["<b>Intertextuality</b> means that a text...", "connects to or echoes other texts", "has no author", "is made up of numbers"],
      ["Wicked retells <i>The Wonderful Wizard of Oz</i> from whose view?", "the Witch's", "Dorothy's", "the Scarecrow's"],
      ["Why do authors retell old stories?", "To offer a new viewpoint or meaning", "Because they cannot write new ones", "To confuse readers"],
      ["A novel set in a modern school that uses Greek myth characters is an example of...", "updating an ancient story", "a news report", "an instruction manual"],
      ["Which is an example of intertextuality?", "A song title that echoes a famous poem line", "A weather forecast", "A grocery list"],
      ["How can knowing the original story help you?", "You notice what the new version changes and why", "You can skip the new version", "You never need the original"],
      ["A retelling that changes the setting from a castle to a space station is changing the...", "setting", "title page", "word count"],
      ["A story that mocks another famous story for laughs is called a...", "parody", "biography", "index"]],
    ["Think about how the new work relates to a story you already know.", "A retelling keeps the core story but changes viewpoint, time, place or tone. The new version often comments on the old one.", "Example: <i>The True Story of the Three Little Pigs</i> tells the tale from the wolf's side. The change in narrator gives a new meaning. Now do yours."]),
    S("📚", ["New story, old bones", "Many works retell older stories or echo them. That connection between texts is <b>intertextuality</b>."],
      ["Ways to change a tale", "New point of view (the villain's)<br>New setting (a modern city)<br>New tone (funny or serious)"],
      ["Read both", "Knowing the original helps you see what the new author chose to keep, change or challenge."])));

  L23.push(mk("Free indirect discourse", rq([
      ["Which passage uses free indirect discourse?", "Maya stared at the test. Why hadn't she studied? What a fool she'd been.", "Maya thought, \"I am a fool.\"", "Maya was unhappy about the test."],
      ["<b>Free indirect discourse</b> is when the narrator...", "blends a character's thoughts into the narration without tags like 'she thought'", "quotes every line of dialogue", "gives only facts"],
      ["Which passage uses free indirect discourse?", "Tom looked at the clock. Late again! His boss would be furious.", "Tom said, \"I'm late.\"", "Tom was late for work."],
      ["Which passage uses direct thought?", "He said to himself, \"I will try again.\"", "Surely he could try again.", "He was ready to try once more."],
      ["Which passage uses free indirect discourse?", "Priya opened the box. Was this really the best they could do?", "Priya opened the box and said, \"This is a bad gift.\"", "Priya opened the box."],
      ["What is the effect of free indirect discourse?", "It brings the reader close to the character's mind", "It makes the setting clearer", "It lists facts"],
      ["Which clue shows free indirect discourse?", "A question or exclamation that sounds like the character, in third person", "A quotation mark", "A date"],
      ["Which passage is plain narration with no thoughts?", "The train left at nine.", "Would it never arrive?", "How tired she was!"],
      ["The narrator says 'Could the day get any worse? Of course it could.' about a character. This is...", "free indirect discourse", "a citation", "a summary"]],
    ["Look for the character's voice slipping into the narration. Are there quote marks or tags like 'she thought'?", "In free indirect discourse the narration stays in third person (he, she) but the questions, opinions and exclamations belong to the character. No quotation marks, no tags.", "Example: 'Ben checked his phone. Not again! Why did it always freeze now?' The questions are Ben's thoughts, told in third person. Now do yours."]),
    S("🧠", ["The narrator slips inside", "In <b>free indirect discourse</b> the narrator describes events in third person but lets the character's thoughts and voice leak in."],
      ["Three ways", "Direct: <i>She thought, \"I am a fool.\"</i><br>Plain: <i>She felt foolish.</i><br>Free indirect: <i>What a fool she'd been!</i>"],
      ["Why use it", "It gives the closeness of first-person thoughts while keeping the flexibility of a narrator."])));

  const SHIFT = [
    ["The garden was lovely and the morning quiet. Then a saw whined next door and would not stop.", "peaceful to irritated"],
    ["Everyone said the plan would work. By evening, the first doubts crept in.", "hopeful to doubtful"],
    ["Zoe told the joke twice, laughing before the punch line. Then her face grew serious. 'Seriously, though, thank you.'", "humorous to sincere"],
    ["The hallway was dark and every board creaked. At last the door opened and the family waved from the porch.", "anxious to relieved"],
    ["He puffed out his chest as the crowd cheered. Later, alone, he wished he had thanked his team.", "proud to ashamed"],
    ["The lecture dragged on and on. Then the guest tossed a rubber chicken into the audience.", "bored to amused"],
    ["The village was gray and still. But when the first green shoots pushed up, people began to hum.", "gloomy to hopeful"],
    ["The lake lay still under the moon. Without warning, something splashed in the dark.", "calm to alarmed"]];
  const SHALL = SHIFT.map(r => r[1]);
  L23.push(mk("Shifts in tone", () => {
    const r = pick(SHIFT);
    return { text: "<i>" + r[0] + "</i><br>How does the tone shift in this passage?", choices: shuf([r[1]].concat(rest(SHALL, r[1], 2))), answer: r[1],
      hints: ["Read the first sentence and name its feeling. Then read the second and name its feeling.", "Words like <i>then</i>, <i>but</i>, <i>until</i> and <i>suddenly</i> mark a shift. Compare the feelings before and after.", "Example: 'The picnic was sunny and easy. Then dark clouds rolled over the field.' Tone moves from relaxed to worried. Now do yours."] };
  }, S("🎭", ["The feeling changes", "A <b>shift in tone</b> happens when the writer's attitude or the feeling of the passage changes."],
      ["Signals", "Watch for turning words: <i>but</i>, <i>yet</i>, <i>then</i>, <i>suddenly</i>, <i>however</i>, or a change in sentence length and word choice."],
      ["Say it", "Name the tone before and after: <i>calm to alarmed</i>, <i>bored to amused</i>."])));

  L23.push(mk("Thinking traps (cognitive biases)", rq([
      ["Elena only reads articles that agree with what she already thinks. This is...", "confirmation bias", "anchoring", "survivorship bias"],
      ["A shop shows a crossed-out price of $200 next to $80. Shoppers think $80 is a bargain mostly because the first number sticks in their mind. This is...", "anchoring", "confirmation bias", "hindsight bias"],
      ["A book studies only successful companies and ignores the ones that failed. This is...", "survivorship bias", "anchoring", "availability bias"],
      ["After seeing news of a plane crash, Jo thinks flying is very dangerous. This is...", "availability bias", "survivorship bias", "confirmation bias"],
      ["After the game, Sam says, 'I knew they would lose all along.' This is...", "hindsight bias", "anchoring", "survivorship bias"],
      ["To avoid confirmation bias, a good reader should...", "look for evidence that might prove the idea wrong", "only read friendly sources", "stop reading"],
      ["Which describes survivorship bias?", "Judging a group by only the examples that made it through", "Judging by the first number seen", "Remembering the news you saw last"],
      ["Mia sticks to the first price she hears when negotiating, even after learning it was unfair. This is...", "anchoring", "hindsight bias", "survivorship bias"],
      ["Why do writers and readers study biases?", "To notice flaws in thinking, including their own", "To win every argument", "To avoid evidence"]],
    ["Ask what kind of mistake in thinking is happening: ignoring contrary evidence, being stuck on a first number, ignoring the failures, remembering a vivid event, or claiming you always knew.", "Confirmation = seeking agreement. Anchoring = the first number sticks. Survivorship = counting only winners. Availability = vivid events seem common. Hindsight = 'I knew it' after the fact.", "Example: a person believes sharks attack often because shark stories are everywhere on the news. Vivid stories feel common, so it is availability bias. Now do yours."]),
    S("🪤", ["Traps in thinking", "A <b>cognitive bias</b> is a habit of thinking that can lead us astray. Good readers notice them."],
      ["Five biases", "<b>Confirmation:</b> favoring what agrees with you<br><b>Anchoring:</b> the first number sticks<br><b>Survivorship:</b> counting only the winners<br><b>Availability:</b> vivid examples feel common<br><b>Hindsight:</b> 'I knew it all along'"],
      ["Defense", "Ask: <i>What evidence would change my mind? What am I not seeing?</i>"])));

  L23.push(mk("Framing: same facts, different story", rq([
      ["Which wording gives the most positive frame for the same fact?", "90% fat free", "Contains 10% fat", "Fat is present"],
      ["'Mayor Slashes Library Budget' and 'Mayor Trims Spending' report the same event. What differs?", "The framing and loaded words", "The facts only", "The date"],
      ["Which frame stresses the loss?", "Two of ten students failed the exam.", "Eight of ten students passed the exam.", "Most students passed."],
      ["What is <b>framing</b>?", "Choosing words and emphasis that shape how facts are seen", "Putting a border on a page", "Citing a source"],
      ["Which headline is the most neutral?", "City council votes 5 to 4 on parking plan", "City council crushes parking plan", "Council triumphs in parking fight"],
      ["How can a reader see the frame?", "Compare how different outlets describe the same event", "Read only the first line", "Trust the loudest headline"],
      ["A speaker calls a tax a 'burden'. Another calls it an 'investment'. This shows...", "different frames", "the same frame", "no frame"],
      ["Which word is most loaded?", "slashed", "changed", "reduced"],
      ["Why does framing matter?", "It can shape opinion even when the facts are accurate", "It changes the facts", "It makes text longer"]],
    ["Compare the facts in each choice. Are they the same? What changes is the choice of words and what is emphasized.", "Framing leaves the facts the same but chooses positive or negative words and focuses on one side. Loaded words carry strong feeling.", "Example: 'One in five lost their jobs' and 'Four in five kept their jobs' are the same fact with opposite emphasis. Now do yours."]),
    S("🖼️", ["The same facts, in a different frame", "<b>Framing</b> is how words and emphasis shape the way we see a fact."],
      ["Example", "'90% fat free' and 'contains 10% fat' say the same thing, but the first sounds better."],
      ["Check it", "Look for loaded words (<i>slashed</i>, <i>triumph</i>, <i>burden</i>). Compare several sources and ask what is being emphasized and what is left out."])));

  L23.push(mk("Synthesizing sources", rq([
      ["To <b>synthesize</b> sources is to...", "combine ideas from several sources into a new understanding", "copy one source", "list sources only"],
      ["Which sentence is a synthesis?", "Both sources agree that sleep improves memory, but Source B adds that naps help too.", "Source A is about sleep.", "Source B was published in 2020."],
      ["Which is just a summary of one source?", "The article explains that sleep supports learning.", "Together these studies suggest a link between sleep and learning.", "While Source A stresses sleep, Source B stresses diet."],
      ["Two sources disagree. A good writer will...", "explain the disagreement and weigh the evidence", "ignore one source", "pick the shorter source"],
      ["Which phrase signals a synthesis?", "Taken together, these sources suggest...", "The first source says...", "Page 2 states..."],
      ["Why synthesize instead of summarizing each source one by one?", "To show how ideas connect and build an argument", "To make the paper longer", "To avoid citing"],
      ["A good synthesis still needs...", "citations for each source used", "no citations", "only quotes"],
      ["Which sentence compares two sources?", "Source A blames cost, whereas Source B blames lack of time.", "Source A has twelve pages.", "Both sources have titles."],
      ["Which is the best first step in synthesizing?", "Find the main idea of each source", "Copy all the quotes", "Skip the reading"]],
    ["Ask whether the sentence only reports on one source or connects several sources.", "Synthesis finds common ground, differences and patterns across sources, then states a new idea of your own. It still credits each source.", "Example: 'Both studies found that exercise lifts mood, but only the second tested teenagers.' It links two sources. Now do yours."]),
    S("🧵", ["Weaving sources together", "To <b>synthesize</b> is to combine ideas from several sources into one clear understanding."],
      ["Moves", "Find what the sources <b>agree</b> on.<br>Note where they <b>differ</b>.<br>State what they show <b>together</b>."],
      ["Signal phrases", "<i>Taken together... Both sources... While A says X, B says Y... This suggests...</i>"])));

  L23.push(mk("The parts of a works cited entry", rq([
      ["A works cited list is usually arranged...", "alphabetically by the author's last name", "by length of title", "by date added"],
      ["In an MLA-style in-text citation like (Smith 42), what do the parts show?", "the author's last name and page number", "the year and city", "the publisher and edition"],
      ["The title of a whole book is usually shown in...", "italics", "quotation marks", "ALL CAPS"],
      ["The title of a short article is usually shown in...", "quotation marks", "italics", "bold"],
      ["What does <i>et al.</i> mean in a citation?", "and others", "the end", "the year"],
      ["Which belongs in nearly every citation?", "the author and title of the source", "the reader's name", "the weather"],
      ["Why include the publication date in a citation?", "So readers can tell how current the source is", "To add decoration", "To count words"],
      ["What is the main purpose of a citation?", "To credit the source and help readers find it", "To fill space", "To show you read fast"],
      ["Which source has an author named in the entry?", "Rivera, Ana. Ocean Currents. Blue Press, 2019.", "Ocean Currents. 2019.", "Blue Press."]],
    ["Ask what the citation needs to do: give credit and let a reader find the source.", "Citations list the author, the title, where it was published (publisher or website), the date, and sometimes pages or a web address. Book titles are in italics, short works in quotation marks.", "Example: (Lee 15) tells you the author is Lee and the idea is on page 15. Now do yours."]),
    S("📑", ["Credit where it is due", "Every source you use gets a <b>citation</b>. A <b>works cited</b> page lists them all at the end."],
      ["Parts", "Author, <i>Title of Book</i>. Publisher, Year.<br>Author. \"Title of Article.\" <i>Website or Journal</i>, Date."],
      ["Rules", "Order the list <b>alphabetically</b> by author's last name. In the text, give a short pointer such as (Lee 15)."])));

  L23.push(mk("Weaving quotations into your writing", rq([
      ["Which uses a quotation best?", "As the narrator explains, \"fear grew like a shadow,\" which shows how worry spreads.", "\"Fear grew like a shadow.\"", "Fear grew like a shadow in the book somewhere."],
      ["A 'dropped quote' is a quotation that...", "stands alone with no introduction or explanation", "is too short", "has a citation"],
      ["After a quotation you should usually...", "explain what it shows", "start a new topic", "add another quote at once"],
      ["Which signal phrase introduces a quotation?", "According to the author,", "The end.", "In a different way,"],
      ["Which is the best length for most quoted evidence?", "Only the words you need", "A full page", "The entire chapter"],
      ["When you leave words out of a quotation, you show it with...", "an ellipsis (...)", "a colon", "a hyphen"],
      ["When you add your own words inside a quotation, you put them in...", "brackets [ ]", "parentheses ( )", "italics"],
      ["The 'quote sandwich' pattern is...", "introduce, quote, explain", "quote, quote, quote", "explain, explain, quote"],
      ["Which sentence explains the evidence rather than only repeating it?", "This shows that she is afraid of failing.", "She said it.", "The quote is above."]],
    ["Ask whether the quotation is introduced, short enough and explained afterward.", "Introduce a quotation with a signal phrase, quote only the key words, and always explain how it supports your point. Use an ellipsis for omissions and brackets for additions.", "Example: The poem says the lake is \"still as glass,\" which suggests calm before trouble. The quote is introduced and explained. Now do yours."]),
    S("🥪", ["The quote sandwich", "Quotations are evidence. Make them work by <b>introducing</b>, <b>quoting</b> and <b>explaining</b>."],
      ["Pattern", "<b>Introduce:</b> The narrator notes that...<br><b>Quote:</b> \"the house seemed to hold its breath.\"<br><b>Explain:</b> This personification builds suspense."],
      ["Tools", "Use an ellipsis (...) for left-out words and [brackets] for words you add."])));

  L23.push(mk("Subtext: what is not said", rq([
      ["'Fine. Do whatever you want,' she said, turning away. What is the subtext?", "She is upset and wants him to care", "She truly does not mind", "She wants to leave the house"],
      ["Subtext is...", "the meaning beneath the words characters say", "the footnotes of a book", "a kind of font"],
      ["Which clue helps you find subtext?", "What characters do, not only what they say", "The page count", "The cover color"],
      ["'No, no, it's fine,' he muttered, staring at the broken toy. The subtext is that he is...", "disappointed", "overjoyed", "indifferent"],
      ["Why do writers use subtext?", "It lets readers infer feelings and makes dialogue feel real", "To save paper", "To explain the plot"],
      ["'Nice of you to finally show up,' Dana said, glancing at the clock. The subtext is...", "she is annoyed that he is late", "she is pleased", "she wants a snack"],
      ["'I'm just tired,' said Lee, though his eyes were red. What is the subtext?", "He may be sad or upset", "He is proud", "He is excited"],
      ["Which line has the most subtext?", "'It's fine,' she said, not looking up.", "'The sky is blue,' she said.", "'Two plus two is four,' she said."],
      ["Reading subtext requires you to...", "make inferences", "skip the dialogue", "ignore body language"]],
    ["Ask what the character says, and what their actions, tone or situation suggest they really feel.", "Subtext is the unspoken feeling or message. Look for mismatches between words and body language, tone or setting.", "Example: 'I'm happy for you,' said Rosa, forcing a smile and looking away. The mismatch suggests she is hurt or jealous. Now do yours."]),
    S("🫥", ["Between the lines", "<b>Subtext</b> is what characters mean but do not say."],
      ["Clues", "A mismatch between words and actions.<br>Tone, pauses, body language.<br>What the situation tells you."],
      ["Example", "'I'm fine,' she said, gripping the chair. Her words say fine; her grip says otherwise."])));

  L23.push(MIX("Mixed practice", L23[0], L23[2], L23[4], L23[6], L23[9], L23[11], L23[13], L23[15]));
  L23.push(MIX("Level 23 Challenge", L23[1], L23[3], L23[5], L23[7], L23[8], L23[10], L23[12], L23[14], L23[16], L23[17]));

  // ================= LEVEL 24 =================
  L24.push(mk("Latin roots: reg, leg, civ, popul, magn", rq([
      ["The Latin root <b>reg/rect</b> is in <i>regulate</i>, <i>direct</i> and <i>rectangle</i>. What does it mean?", "rule or straight", "law", "large"],
      ["The Latin root <b>leg/lex</b> is in <i>legal</i>, <i>legislature</i> and <i>legitimate</i>. What does it mean?", "law", "people", "citizen"],
      ["The Latin root <b>civ</b> is in <i>civil</i>, <i>civic</i> and <i>civilian</i>. What does it mean?", "citizen", "large", "rule"],
      ["The Latin root <b>popul</b> is in <i>population</i>, <i>popular</i> and <i>populace</i>. What does it mean?", "people", "law", "citizen"],
      ["The Latin root <b>magn</b> is in <i>magnify</i>, <i>magnitude</i> and <i>magnificent</i>. What does it mean?", "large or great", "people", "rule"],
      ["To <i>regulate</i> traffic is to...", "keep it under rules", "make it larger", "count the people"],
      ["A <i>legislature</i> is a body that makes...", "laws", "maps", "pictures"],
      ["A <i>civilian</i> is a person who is not in the...", "military (an ordinary citizen)", "kitchen", "library"],
      ["The <i>population</i> of a town is the number of its...", "people", "buildings", "laws"],
      ["To <i>magnify</i> a picture is to make it...", "larger", "smaller", "quieter"],
      ["A <i>rectangle</i> has four angles that are...", "right angles (straight corners)", "wavy", "tiny"],
      ["Something <i>magnificent</i> is...", "great and impressive", "tiny and plain", "legal"]],
    ROOTH("Example: <b>scrib/script</b> is in <i>describe</i>, <i>manuscript</i> and <i>scribble</i>. Each word is about writing, so <b>scrib</b> means 'write'.")),
    S("🏛️", ["Roots of government and size", "Latin roots about rules, law, citizens, people and greatness are everywhere in news and civics."],
      ["The roots", "<b>reg/rect</b> = rule, straight (<b>reg</b>ulate)<br><b>leg/lex</b> = law (<b>leg</b>al)<br><b>civ</b> = citizen (<b>civ</b>ic)<br><b>popul</b> = people (<b>popul</b>ation)<br><b>magn</b> = large, great (<b>magn</b>ify)"],
      ["Use them", "<i>Magn</i> + <i>itude</i> = <i>magnitude</i>, 'greatness of size'. <i>Il</i> (not) + <i>legal</i> = <i>illegal</i>, 'not according to law'."])));

  L24.push(mk("Greek roots: path, trope, mim, tom, hom", rq([
      ["The Greek root <b>path</b> is in <i>sympathy</i>, <i>empathy</i> and <i>apathy</i>. What does it mean?", "feeling", "cut", "same"],
      ["The Greek root <b>trope</b> is in <i>heliotrope</i> and <i>tropical</i>. What does it mean?", "turn", "feeling", "imitate"],
      ["The Greek root <b>mim</b> is in <i>mimic</i>, <i>mime</i> and <i>pantomime</i>. What does it mean?", "imitate", "turn", "cut"],
      ["The Greek root <b>tom</b> is in <i>atom</i>, <i>anatomy</i> and <i>appendectomy</i>. What does it mean?", "cut", "imitate", "same"],
      ["The Greek root <b>hom</b> is in <i>homogeneous</i>, <i>homonym</i> and <i>homophone</i>. What does it mean?", "same", "cut", "feeling"],
      ["<i>Empathy</i> means sharing another person's...", "feelings", "name", "cuts"],
      ["To <i>mimic</i> someone is to...", "copy them", "cut them off", "turn them around"],
      ["An <i>atom</i> was named for being 'uncuttable'. The root <b>tom</b> means...", "cut", "same", "turn"],
      ["A <i>homophone</i> is a word with the ___ sound as another.", "same", "opposite", "silent"],
      ["A <i>heliotrope</i> plant turns toward the...", "sun", "ground", "wall"],
      ["<i>Apathy</i> is a lack of...", "feeling or interest", "money", "sound"],
      ["A <i>homogeneous</i> mixture is the ___ throughout.", "same", "different", "cut"]],
    ROOTH("Example: <b>morph</b> is in <i>metamorphosis</i> and <i>morphology</i>. Both words are about shape, so <b>morph</b> means 'form or shape'.")),
    S("🏺", ["Greek roots, round three", "These Greek roots are about feeling, turning, copying, cutting and sameness."],
      ["The roots", "<b>path</b> = feeling, suffering (sym<b>path</b>y)<br><b>trope</b> = turn (helio<b>trope</b>)<br><b>mim</b> = imitate (<b>mim</b>ic)<br><b>tom</b> = cut (a<b>tom</b>)<br><b>hom</b> = same (<b>hom</b>ophone)"],
      ["Use them", "<i>Sym</i> (together) + <i>path</i> = <i>sympathy</i>, 'feeling together'. <i>A</i> (not) + <i>tom</i> = <i>atom</i>, 'not cuttable'."])));

  L24.push(mk("Prefixes: intra-, extra-, retro-, ante-, counter-", rq([
      ["The prefix <b>intra-</b> in <i>intranet</i> and <i>intravenous</i> means...", "within", "against", "backward"],
      ["The prefix <b>extra-</b> in <i>extraordinary</i> and <i>extracurricular</i> means...", "beyond or outside", "within", "before"],
      ["The prefix <b>retro-</b> in <i>retrospect</i> and <i>retroactive</i> means...", "backward", "before", "within"],
      ["The prefix <b>ante-</b> in <i>antechamber</i> and <i>antecedent</i> means...", "before", "against", "beyond"],
      ["The prefix <b>counter-</b> in <i>counteract</i> and <i>counterclaim</i> means...", "against", "within", "backward"],
      ["An <i>intranet</i> is a network...", "inside one organization", "outside the building", "between countries"],
      ["An <i>extracurricular</i> activity is one that lies...", "outside the regular classes", "inside the regular classes", "before the school day"],
      ["Looking at the past in <i>retrospect</i> is looking...", "backward", "forward", "sideways"],
      ["An <i>antechamber</i> is a small room...", "before the main room", "after the main room", "inside the main room"],
      ["To <i>counteract</i> something is to act...", "against it", "before it", "within it"],
      ["A <i>retroactive</i> law applies to events that happened...", "in the past", "next year", "never"]],
    ["Cover the prefix. What is left? Now think what the prefix changes about its direction in time or space.", "Intra- = inside, extra- = outside or beyond, retro- = back, ante- = before in time or place, counter- = against.", "Example: <b>sub-</b> in <i>submarine</i> means 'under', so a submarine travels under the sea. Now do yours."]),
    S("🔠", ["Prefixes of place and time", "Prefixes can show where (inside, outside), when (before, back) or what direction (against)."],
      ["The prefixes", "<b>intra-</b> = within (<b>intra</b>net)<br><b>extra-</b> = beyond (<b>extra</b>ordinary)<br><b>retro-</b> = backward (<b>retro</b>spect)<br><b>ante-</b> = before (<b>ante</b>chamber)<br><b>counter-</b> = against (<b>counter</b>act)"],
      ["Careful", "<b>ante-</b> (before) is not <b>anti-</b> (against)."])));

  L24.push(mk("Suffixes: -ism, -tude, -acy, -dom", rq([
      ["The suffix <b>-ism</b> in <i>optimism</i> and <i>realism</i> means...", "a belief, system or practice", "a state of being a place", "one who does"],
      ["The suffix <b>-tude</b> in <i>gratitude</i> and <i>solitude</i> means...", "a state or condition", "a belief", "a small version"],
      ["The suffix <b>-acy</b> in <i>privacy</i> and <i>accuracy</i> means...", "a state or quality", "a belief", "a person"],
      ["The suffix <b>-dom</b> in <i>freedom</i> and <i>boredom</i> means...", "a state or condition", "a belief", "a place only"],
      ["<i>Gratitude</i> is the state of being...", "grateful", "gradual", "grated"],
      ["<i>Privacy</i> is the state of being...", "private", "privileged", "public"],
      ["<i>Boredom</i> is the state of being...", "bored", "board", "bold"],
      ["<i>Realism</i> is a practice or belief in showing things as they are...", "really", "never", "funny"],
      ["Which word names a belief or system?", "pacifism", "solitude", "freedom"],
      ["Which word names a state of being?", "solitude", "optimism", "realism"],
      ["Which word ends in a suffix meaning 'state or quality'?", "accuracy", "realism", "magician"]],
    ["Remove the ending to find the base word. Then ask: does the ending name a belief, or a state of being?", "-ism names a belief, system or practice. -tude, -acy and -dom usually name a state, quality or condition.", "Example: <i>kingdom</i> = king + <b>-dom</b>, the realm or state of a king. <i>Patriotism</i> = patriot + <b>-ism</b>, a belief in one's country. Now do yours."]),
    S("🔚", ["Endings that name ideas", "These suffixes turn words into abstract nouns, naming ideas, states or beliefs."],
      ["The suffixes", "<b>-ism</b> = belief, system (optim<b>ism</b>)<br><b>-tude</b> = state (grati<b>tude</b>)<br><b>-acy</b> = state, quality (priv<b>acy</b>)<br><b>-dom</b> = state, realm (free<b>dom</b>)"],
      ["Example", "bore + <b>dom</b> = boredom, 'the state of being bored'. real + <b>ism</b> = realism, 'a way of showing things as they are'."])));

  L24.push(mk("Word order for emphasis", rq([
      ["Which sentence uses inversion (verb before subject) for effect?", "Never have I seen such courage.", "I have never seen such courage.", "I saw courage."],
      ["Which version puts the emphasis on <i>courage</i>?", "Courage is what she showed.", "She showed courage.", "She showed it."],
      ["What does a very short sentence after long ones usually create?", "Emphasis or drama", "Confusion", "A list"],
      ["Which line is the inverted version of 'The fox ran into the woods'?", "Into the woods ran the fox.", "The fox ran into the woods.", "Ran the woods into fox."],
      ["Why might a writer put an important word at the end of a sentence?", "The end position gives stress", "Endings are ignored", "It is a rule"],
      ["Which sentence builds up to its key idea at the end?", "After years of struggle, doubt and sacrifice, she finally won.", "She finally won after years of struggle, doubt and sacrifice.", "She won."],
      ["Which sentence is inverted?", "Rarely does a day pass without rain.", "A day rarely passes without rain.", "Rain falls often."],
      ["Which has the strongest ending for a speech?", "We will not fall. We will not fail. We will win.", "We might win, or maybe not.", "We could try to win."],
      ["Putting a phrase first, as in 'In the dark, a light appeared,' ...", "can set the scene before the action", "removes the subject", "always makes a fragment"]],
    ["Ask which word or idea the sentence wants you to notice. Where is it placed?", "Words at the very start and very end get the most attention. Inversion and short sentences after long ones add drama.", "Example: 'Seldom does she complain' turns 'She seldom complains' around to stress <i>seldom</i>. Now do yours."]),
    S("🎯", ["Where you put it matters", "Word order is a tool. The start and end of a sentence get the most attention."],
      ["Tricks", "<b>Inversion:</b> Never have I seen such courage.<br><b>Short after long:</b> A long build-up. Then silence.<br><b>Save the best for last:</b> after years of doubt and work, she won."],
      ["Use sparingly", "Special word order works best when it is rare."])));

  L24.push(mk("Grammar myths and real rules", rq([
      ["Ending a sentence with a preposition, as in 'Which chair are you sitting on?'", "Fine in standard English", "Always an error", "Only fine in poetry"],
      ["Starting a sentence with <i>But</i> or <i>And</i>", "Acceptable when used well", "Always an error", "Only fine in speech"],
      ["Splitting an infinitive, as in 'to quickly finish'", "Acceptable in standard English", "Always an error", "Never used in books"],
      ["'The dog wagged it's tail.'", "Always an error (should be its)", "Fine in standard English", "Only fine in poetry"],
      ["'The books is on the table.'", "Always an error in standard English", "Fine in standard English", "Only fine in poetry"],
      ["Writing 'alot' as one word", "Always an error (should be two words)", "Fine in standard English", "Acceptable in books"],
      ["Which of these is a real rule?", "A verb must agree with its subject", "Never begin a sentence with <i>because</i>", "Never end with a preposition"],
      ["Using <i>they</i> to refer to one person whose gender is unknown", "Widely accepted in modern usage", "Never used", "Only used in poetry"],
      ["A rule such as 'never split an infinitive' mostly comes from...", "old habits borrowed from Latin grammar", "modern science", "dictionary definitions"]],
    ["Ask whether this is a true rule of standard English or an old superstition that careful writers ignore.", "Real rules, such as agreement and its/it's, are almost always followed. Myths, such as never ending with a preposition, are old habits that careful writers ignore when the sentence reads better.", "Example: 'Who did you give it to?' sounds natural and is fine. 'To whom did you give it?' is more formal, but both are correct. Now do yours."]),
    S("🪄", ["Rules and myths", "Some 'rules' you were told are myths. Others are real. Good writers know the difference."],
      ["Myths", "Never end with a preposition. Never begin with <i>and</i> or <i>but</i>. Never split an infinitive. All are fine in good writing when they read well."],
      ["Real rules", "Subject and verb must agree.<br><i>its</i> (belongs to it) vs <i>it's</i> (it is).<br><i>a lot</i> is two words."])));

  L24.push(mk("Possessives before -ing words", rq([
      ["We were surprised by ___ winning the prize.", "his", "him", "he"],
      ["Mom doesn't mind ___ staying up late to read.", "my", "me", "I"],
      ["Do you mind ___ opening the window?", "my", "me", "I"],
      ["The coach praised ___ working so hard.", "their", "them", "they"],
      ["I appreciate ___ helping with the project.", "your", "you", "yours"],
      ["She was angry about ___ forgetting the date.", "my", "me", "mine"],
      ["There is no chance of ___ changing the plan.", "our", "us", "we"],
      ["The teacher approved of ___ using the library.", "his", "him", "he"],
      ["Everyone enjoyed ___ singing at the concert.", "her", "she", "hers"]],
    ["Look at the word ending in -ing. In this sentence is it acting as a noun (the thing being talked about)?", "A gerund is an <i>-ing</i> word used as a noun. A possessive pronoun (my, your, his, her, our, their) goes before it, because the gerund is the real focus.", "Example: 'I dislike ___ yelling' needs <i>his</i>: 'I dislike his yelling,' because the yelling is what I dislike. Now do yours."]),
    S("✋", ["The -ing noun", "A <b>gerund</b> is an <i>-ing</i> word used as a noun. Use a possessive before it."],
      ["Examples", "I appreciate <b>your</b> helping.<br>We were surprised by <b>his</b> winning.<br>She minds <b>my</b> staying."],
      ["Why", "The helping, the winning, the staying is what the sentence is about. The possessive shows it belongs to the person."])));

  const REV = [
    ["Move the strongest argument to the start of the essay.", 0], ["Add evidence to support a weak claim.", 0], ["Cut a paragraph that does not support the thesis.", 0],
    ["Reorder two paragraphs so the logic is clearer.", 0], ["Rewrite the thesis to be more specific.", 0],
    ["Change 'big' to 'enormous'.", 1], ["Combine two choppy sentences.", 1], ["Replace a vague verb with a strong one.", 1], ["Swap 'very tired' for 'exhausted'.", 1],
    ["Fix a misspelled word.", 2], ["Add a missing comma.", 2], ["Correct 'there' to 'their'.", 2], ["Fix a missing period.", 2]];
  L24.push(mk("Revision: big changes and small fixes", cl("A writer makes this change: <i>{}</i> What kind of work is it?", ["Big-picture revision", "Sentence-level editing", "Proofreading"], REV,
      ["Ask how big the change is. Does it change the whole essay, one sentence, or only a mark or letter?", "Big-picture = ideas, argument and order. Editing = word choice and sentence flow. Proofreading = spelling, punctuation and typos, done last.", "Example: 'Add a conclusion that ties back to the opening' changes the shape of the essay, so it is big-picture. Now do yours."]),
    S("🛠️", ["Revise in layers", "Revising goes from big to small. Do the big work first or the small fixes may be wasted."],
      ["Three layers", "<b>Big-picture:</b> thesis, evidence, order, cutting or adding paragraphs<br><b>Sentence-level:</b> word choice, flow, variety<br><b>Proofreading:</b> spelling, commas, typos"],
      ["Order", "Big first, small last. There is no point in fixing a comma in a sentence you will cut."])));

  L24.push(mk("How American poets sound", rq([
      ["Emily Dickinson is known for short stanzas, dashes and...", "slant rhyme", "very long lines", "no punctuation"],
      ["Walt Whitman is known for...", "free verse with long lines and lists", "strict rhyming couplets", "sonnets only"],
      ["<b>Slant rhyme</b> means words that...", "almost rhyme", "rhyme perfectly", "do not sound alike at all"],
      ["Langston Hughes drew on the rhythms of...", "jazz and blues", "church bells only", "drums only"],
      ["Robert Frost often wrote about rural New England in language that was...", "conversational and often rhymed", "full of numbers", "broken into code"],
      ["<b>Imagism</b> aimed for poems with...", "clear, exact images and few extra words", "long explanations", "heavy rhyme"],
      ["Which pair is a slant rhyme?", "stone and gone", "stone and bone", "cat and hat"],
      ["Which description fits free verse?", "No regular rhyme or meter", "Perfect rhyme and strict meter", "Only three lines"],
      ["William Carlos Williams's poem about a red wheelbarrow beside white chickens is an example of...", "imagist style", "a ballad", "an ode with strict meter"]],
    ["Think about each poet's sound: rhyme or no rhyme, long lines or short, plain or musical.", "Dickinson uses slant rhyme and dashes. Whitman uses long free-verse lines and lists. Frost speaks plainly in rhymed forms. Hughes echoes jazz and blues. Imagists use sharp images.", "Example: a poem with no rhyme, uneven lines and a list of sights is likely free verse. Now do yours."]),
    S("🪶", ["American voices", "American poets broke from old patterns to find their own sounds."],
      ["Who and how", "<b>Dickinson:</b> short stanzas, dashes, slant rhyme<br><b>Whitman:</b> free verse, long lines, lists<br><b>Frost:</b> plain speech, rhyme, rural scenes<br><b>Hughes:</b> jazz and blues rhythms<br><b>Imagists:</b> clear, sharp images"],
      ["Slant rhyme", "Words that almost rhyme, like <i>room</i> and <i>storm</i> or <i>stone</i> and <i>gone</i>."])));

  L24.push(mk("Ambiguity and open endings", rq([
      ["An <b>open ending</b> is one that...", "leaves a question unresolved for the reader", "answers every question", "has no words"],
      ["In Frank Stockton's story 'The Lady, or the Tiger?', the ending leaves the reader to decide what is behind the door. This is a(n)...", "open ending", "flashback", "cliché"],
      ["Why might an author choose an ambiguous ending?", "To make readers think and discuss", "Because the author ran out of time", "To list facts"],
      ["Which is an ambiguous ending?", "The door opened, and we never learned what was behind it.", "The hero won and went home happy.", "The hero lost and the story ended."],
      ["When a text is <b>ambiguous</b>, it...", "can be understood in more than one way", "has only one meaning", "has no meaning"],
      ["How should you write about an open ending?", "Show the possible meanings and support each with evidence", "Say it has no meaning", "Pick one with no evidence"],
      ["Which question is raised by an open ending?", "What do you think happens next, and why?", "How many pages are there?", "Who published it?"],
      ["Which is NOT a sign of ambiguity?", "A single clear fact stated plainly", "Two possible meanings", "A hint without an answer"],
      ["An ending that ties up all loose threads is called...", "a closed ending", "an open ending", "an ambiguous ending"]],
    ["Ask whether the story answers its big question, or leaves the answer to the reader.", "Ambiguity gives a text more than one possible meaning. Open endings invite readers to infer and debate.", "Example: a story ends with a girl standing at a crossroads, never saying which road she chose. The reader decides. Now do yours."]),
    S("❓", ["No tidy ending", "An <b>open ending</b> leaves the main question unanswered. The text is <b>ambiguous</b>: it can be read in more than one way."],
      ["Why", "It makes readers think, argue and keep the story alive.<br>Example: <i>The Lady, or the Tiger?</i> by Frank Stockton (1882) stops at the moment of choice."],
      ["Writing about it", "Explain each possible reading and point to clues in the text that support it."])));

  L24.push(mk("Dramatic monologues in poems", rq([
      ["In a <b>dramatic monologue</b>, the speaker...", "talks to a silent listener and reveals their own character", "is the poet describing the weather", "is a list of facts"],
      ["What do we learn from a dramatic monologue?", "More about the speaker than the speaker means to reveal", "Only facts about history", "Nothing"],
      ["Who is usually NOT heard in a dramatic monologue?", "The listener", "The speaker", "The poet"],
      ["Which line suggests a dramatic monologue?", "Listen, friend, let me tell you why I left the town...", "The leaves are green in May.", "1, 2, 3, 4."],
      ["The speaker of a dramatic monologue is usually...", "a character, not the poet", "always the poet", "a machine"],
      ["How can a speaker reveal character without saying so?", "Through word choice, boasting or excuses", "Through a list of dates", "Through page numbers"],
      ["A dramatic monologue is closest to which form of drama?", "a soliloquy or speech", "a stage direction", "a cast list"],
      ["A speaker brags about a trip while the listener silently shrugs. The poem shows the speaker is...", "proud and perhaps a little unaware", "very humble", "silent"],
      ["Why do poets use this form?", "To let readers see through a speaker's own words", "To save space", "To explain history"]],
    ["Ask who is talking, who is listening, and what the words reveal about the speaker.", "A dramatic monologue is a poem spoken by a character to a silent listener. The speaker usually reveals more than he or she realizes.", "Example: a speaker keeps insisting he is not nervous while describing sweaty hands. The words show the opposite. Now do yours."]),
    S("🗣️", ["A poem like a speech", "In a <b>dramatic monologue</b> a character talks to someone who stays silent. The words reveal the speaker's personality."],
      ["Features", "A single speaker who is not the poet<br>A silent listener<br>A setting suggested by the words<br>A speaker who reveals more than meant"],
      ["Read for", "Boasts, excuses and slips. What does the speaker want the listener to think, and what do we actually see?"])));

  L24.push(mk("Rhetorical analysis: how and why", rq([
      ["Which statement is a rhetorical analysis (not just a summary)?", "The repeated short questions pull the reader in, making the plea feel urgent.", "The article asks several questions.", "The article is about school start times."],
      ["A rhetorical analysis asks...", "how and why a writer's choices affect the audience", "what the writer ate for lunch", "how many words there are"],
      ["Which sentence is analysis?", "By using the word 'together' so often, the speaker creates unity.", "The speaker uses the word 'together' five times.", "The speaker talks about unity."],
      ["Which sentence is just summary?", "The writer argues that cities should plant more trees.", "The writer's calm tone makes the argument feel reasonable.", "The comparison to a lung makes trees seem essential."],
      ["Which element is NOT part of the rhetorical situation?", "The font size of the page number", "The audience", "The purpose"],
      ["A strong analysis sentence usually includes...", "a writer's choice, its effect and its purpose", "only the topic", "only a quote"],
      ["Which sentence identifies purpose?", "The writer wants readers to donate to the shelter.", "The writer uses bold type.", "The page is blue."],
      ["Which sentence explains an effect?", "The vivid story makes readers feel sympathy for the family.", "The story is about a family.", "The family has three children."],
      ["Instead of writing 'the author uses a metaphor,' a stronger analysis adds...", "what the metaphor makes the reader feel or think", "the date", "the page"]],
    ["Ask whether the sentence only tells WHAT is there, or explains HOW it works and WHY it matters.", "Rhetorical analysis names a choice (a tone, example, word or structure) and explains its effect on the audience and how it serves the writer's purpose.", "Example: 'The gentle humor in the opening puts skeptical readers at ease, so they listen to the argument.' It names a choice and its effect. Now do yours."]),
    S("🔬", ["Beyond what, to how and why", "<b>Rhetorical analysis</b> looks at the choices a writer makes and what effect they have."],
      ["Formula", "Choice + effect + purpose.<br><i>The repeated questions pull readers in, so the plea feels urgent.</i>"],
      ["Summary vs analysis", "Summary: <i>The writer asks questions.</i><br>Analysis: <i>The questions make the reader feel involved.</i>"])));

  L24.push(mk("Reading a textbook with SQ3R", rq([
      ["In SQ3R, the S stands for...", "Survey", "Skip", "Speak"],
      ["Turning a heading into a question belongs to which step?", "Question", "Review", "Survey"],
      ["What does the first R in SQ3R stand for?", "Read", "Recite", "Review"],
      ["Which step means saying the main points aloud or in your own words?", "Recite", "Survey", "Question"],
      ["Which step comes last?", "Review", "Survey", "Question"],
      ["During the Survey step you...", "skim headings, bold words and summaries before reading", "write the final answers", "close the book"],
      ["Before reading a section titled 'Causes of the Dust Bowl', a Question step would be...", "What caused the Dust Bowl?", "Dust Bowl.", "Chapter 7."],
      ["Which activity is Recite?", "Close the book and tell a partner the main ideas", "Count the pages", "Highlight everything"],
      ["Why is SQ3R useful?", "It makes reading active so you remember more", "It makes reading shorter", "It replaces the book"]],
    ["Recall the letters in order: Survey, Question, Read, Recite, Review. Match the step to the task.", "Survey = preview first. Question = turn headings into questions. Read = read to find the answers. Recite = say it back in your own words. Review = go back over it later.", "Example: before a chapter on volcanoes, the Question step might be 'What makes a volcano erupt?' Now do yours."]),
    S("📖", ["Read like a scholar", "<b>SQ3R</b> is a five-step method for reading textbooks: Survey, Question, Read, Recite, Review."],
      ["Steps", "<b>S</b>urvey: skim headings and summaries<br><b>Q</b>uestion: turn headings into questions<br><b>R</b>ead: look for answers<br><b>R</b>ecite: say it back<br><b>R</b>eview: revisit later"],
      ["Why it works", "You read with a purpose and test your memory, instead of letting words slide by."])));

  L24.push(mk("Necessary or sufficient?", rq([
      ["Turning in all homework is required to pass a course, but it does not guarantee passing. For passing, turning in homework is...", "necessary but not sufficient", "sufficient but not necessary", "necessary and sufficient"],
      ["Being in Texas guarantees that you are in the USA, but you can be in the USA without being in Texas. Being in Texas is...", "sufficient but not necessary", "necessary but not sufficient", "necessary and sufficient"],
      ["Having wheels is required for being a bicycle, but not enough. Having wheels is...", "necessary but not sufficient", "sufficient but not necessary", "necessary and sufficient"],
      ["Owning a dog guarantees you own a pet, but you could own a pet without a dog. Owning a dog is...", "sufficient but not necessary", "necessary but not sufficient", "necessary and sufficient"],
      ["Being a square guarantees being a rectangle, but a rectangle need not be a square. Being a square is...", "sufficient but not necessary", "necessary but not sufficient", "necessary and sufficient"],
      ["A number is divisible by 10 if and only if it ends in 0. Ending in 0 is...", "necessary and sufficient", "necessary but not sufficient", "sufficient but not necessary"],
      ["Oxygen must be present for a fire to burn, but oxygen alone does not start a fire. Oxygen is...", "necessary but not sufficient", "sufficient but not necessary", "necessary and sufficient"],
      ["If A is <b>sufficient</b> for B, then having A is...", "enough to guarantee B", "required but may not be enough", "unrelated to B"],
      ["If A is <b>necessary</b> for B, then without A...", "B cannot happen", "B always happens", "B is certain"]],
    ["Test two things: if you have A, do you always get B? (sufficient) If you lack A, can you still get B? (if not, A is necessary)", "Necessary = required, but may not be enough. Sufficient = enough, but there may be other ways. Both = the two always go together.", "Example: having a ticket is necessary for entering a concert but not sufficient, since you also need to be on time. Now do yours."]),
    S("🧮", ["Required or enough?", "Logic separates two ideas that people often mix up."],
      ["Definitions", "<b>Necessary:</b> required. Without it, no result.<br><b>Sufficient:</b> enough. With it, the result is guaranteed.<br>Some things are one, both or neither."],
      ["Example", "Oxygen is necessary for fire (no oxygen, no fire) but not sufficient (you also need fuel and heat)."])));

  L24.push(mk("Base rates, small samples and bounce-back", rq([
      ["A test is 90% accurate for a disease that only 1 in 1,000 people has. Why might a positive result still probably be a false alarm?", "The disease is so rare that false alarms outnumber true cases", "The test is always wrong", "Positive results are always false"],
      ["A team wins 3 of its first 4 games. What can we safely conclude about its whole season?", "Very little, because the sample is small", "It will certainly win the title", "It will certainly lose"],
      ["A hospital has 10 births a day, another has 100. Which is more likely to have days when more than 60% of babies are boys?", "The smaller hospital", "The larger hospital", "Both exactly the same"],
      ["A player has an amazing week and then a more ordinary week. A likely reason is that extreme results tend to be followed by more typical ones. This is called...", "regression to the mean", "survivorship bias", "framing"],
      ["After a spike in crashes, a speed camera is installed. Crashes then drop. What should we remember?", "Crashes may have fallen anyway after an unusual spike", "The camera must be the only cause", "Crashes can never drop by chance"],
      ["Far more people are farmers than librarians. A quiet, tidy person who loves books is probably...", "more likely a farmer than a librarian simply because there are many more farmers", "certainly a librarian", "impossible to guess"],
      ["A poll of 12 people finds that 8 prefer pizza. Why is this weak?", "The sample is too small", "Pizza is not popular", "Eight is not a number"],
      ["Larger samples usually give results that are...", "more reliable", "less reliable", "always wrong"],
      ["The <b>base rate</b> is...", "how common something is in the whole population", "the lowest price", "the first number you hear"]],
    ["Ask: how common is the thing overall? How many cases are in the sample? Could this be a chance bounce?", "Rare events produce many false alarms even with good tests. Small samples swing wildly. Extreme results tend to be followed by more ordinary ones.", "Example: a coin lands heads 4 times out of 5. That is a tiny sample, so it does not prove the coin is unfair. Now do yours."]),
    S("🎲", ["Numbers can mislead", "Three ideas help you read statistics wisely."],
      ["Ideas", "<b>Base rate:</b> how common something is overall<br><b>Small samples:</b> swing wildly, so conclusions are weak<br><b>Regression to the mean:</b> extremes tend to be followed by more average results"],
      ["Ask", "How big is the sample? How common is the thing? Could this be just a bounce back toward normal?"])));

  L24.push(mk("Sourcing a document", rq([
      ["A diary written in 1865 by a person who lived through the events is a...", "primary source", "secondary source", "tertiary summary"],
      ["A 2020 textbook that explains the 1865 events is a...", "secondary source", "primary source", "photograph"],
      ["Which question belongs to <b>sourcing</b> a document?", "Who wrote this, when, and why?", "How long is it?", "What color is the paper?"],
      ["A wartime poster meant to convince people to join the effort tells you most about...", "the persuasive aims of its makers", "the exact facts of every battle", "weather"],
      ["<b>Corroboration</b> means...", "checking a document against other sources", "copying a document", "burning a document"],
      ["<b>Contextualization</b> means...", "placing a document in its time and place", "removing the date", "translating the title"],
      ["Why check who wrote a letter?", "The writer's position can shape what they say", "The writer's name is always funny", "Authors never matter"],
      ["A letter written long after an event may be less reliable about details because...", "memory fades and views change", "paper ages", "ink dries"],
      ["Two accounts of the same event disagree. A careful reader will...", "compare them with a third source and consider each author's viewpoint", "pick the longer one", "ignore both"]],
    ["Ask who made it, when and why, and how that might shape what it says.", "Historians source (who, when, why), contextualize (what was happening) and corroborate (compare with other sources). Primary sources come from the time; secondary sources are written later.", "Example: a general's report about his own battle is a primary source, but he may want to look good, so a historian compares it with other accounts. Now do yours."]),
    S("🗝️", ["Reading like a historian", "Historians do not take a document at face value. They <b>source</b> it first."],
      ["Three moves", "<b>Sourcing:</b> who, when, why?<br><b>Contextualizing:</b> what was happening then?<br><b>Corroborating:</b> do other sources agree?"],
      ["Primary and secondary", "<b>Primary:</b> made at the time (diaries, letters, photos).<br><b>Secondary:</b> written later about the past (textbooks)."])));

  L24.push(mk("Majority, concurring and dissenting opinions", rq([
      ["In a Supreme Court case, the <b>majority opinion</b> is...", "the court's official ruling and reasoning", "a minority view", "a list of attorneys"],
      ["A <b>dissenting opinion</b> is written by a justice who...", "disagrees with the court's decision", "agrees with every part", "wrote the law"],
      ["A <b>concurring opinion</b> is written by a justice who...", "agrees with the outcome but for different reasons", "disagrees with the outcome", "did not attend"],
      ["How many justices sit on the US Supreme Court?", "9", "7", "12"],
      ["Why might a dissent matter later?", "Its arguments may influence future cases", "It cancels the ruling", "It decides the case"],
      ["A <b>precedent</b> is...", "an earlier decision that guides later ones", "a type of law student", "a final exam"],
      ["A justice agrees with the result but wants to stress a different legal reason. The justice writes a...", "concurring opinion", "dissenting opinion", "majority opinion"],
      ["Which opinion becomes the binding decision of the court?", "The majority opinion", "A dissent", "A concurrence"],
      ["Reading a dissent helps you see...", "the strongest arguments on the losing side", "nothing", "the cover"]],
    ["Think about whether each justice agrees with the outcome, and whether they agree with the reasons.", "Majority = the ruling that wins. Concurring = same result, different reasons. Dissenting = a different result. Only the majority decides the case.", "Example: a justice who thinks the court reached the right result but for a narrower reason writes a concurrence. Now do yours."]),
    S("⚖️", ["Many voices in one ruling", "When a court decides a case, justices can write different opinions."],
      ["Three kinds", "<b>Majority:</b> the court's decision and reasoning<br><b>Concurring:</b> agrees with the result, adds or changes the reasons<br><b>Dissenting:</b> disagrees with the result"],
      ["Reading tip", "Read the majority for the rule, the dissent for the strongest opposing argument. Dissents sometimes shape future law."])));

  L24.push(mk("The personal essay", rq([
      ["A <b>personal essay</b> mixes...", "a real experience with reflection on its meaning", "only facts and numbers", "a list of rules"],
      ["Which opening is a scene-based hook?", "The kettle was already whistling when I realized I had forgotten my own speech.", "This essay is about speeches.", "Speeches are important."],
      ["What is the 'so what?' of a personal essay?", "The insight or lesson the writer takes from the experience", "The title", "The page number"],
      ["Which line shows rather than tells?", "My hands shook so much the paper rattled.", "I was very nervous.", "Nervousness is common."],
      ["Which voice suits a personal essay best?", "Honest and natural, first-person", "Cold and formal, third-person", "Full of jargon"],
      ["Which is a good ending for a personal essay?", "A reflection that links the story to a bigger idea", "A copy of the first sentence", "A list of all events"],
      ["Which detail strengthens a story in an essay?", "A specific sensory detail, such as the smell of rain on hot pavement", "A vague word such as 'stuff'", "A long definition"],
      ["Which should a personal essay avoid sharing publicly?", "Private details such as your address or school", "A funny moment from a trip", "A lesson you learned"],
      ["A strong personal essay usually has...", "a clear focus on one moment or idea", "ten unrelated topics", "no point at all"]],
    ["Look for the choice that gives a real moment, a clear feeling or an insight, rather than a general statement.", "Personal essays use a scene, specific detail and honest voice, then reflect on what it means. Keep private details out of anything public.", "Example: instead of 'I felt scared,' write 'My knees wobbled on the first rung.' Now do yours."]),
    S("✍️", ["Your story, with meaning", "A <b>personal essay</b> tells a true experience and explores what it means."],
      ["Parts", "<b>Scene:</b> start in the moment<br><b>Detail:</b> sights, sounds, feelings<br><b>Reflection:</b> the 'so what?' that connects to a bigger idea"],
      ["Safety", "Write with honesty, but keep private details like your address, school or real name out of anything you share online."])));

  L24.push(MIX("Mixed practice", L24[0], L24[2], L24[4], L24[6], L24[9], L24[11], L24[13], L24[15]));
  L24.push(MIX("Level 24 Challenge", L24[1], L24[3], L24[5], L24[7], L24[8], L24[10], L24[12], L24[14], L24[16], L24[17]));

  Object.assign(READING_LEVELS, { 22: L22, 23: L23, 24: L24 });
})();
