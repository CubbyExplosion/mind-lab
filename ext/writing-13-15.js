// ext/writing-13-15.js  Mind Lab Writing & Grammar, levels 13-15 (60 lessons)
(() => {
  // rows: "question|answer|wrong1|wrong2|..." (no | inside text)
  const mk = (title, vis, rows, hints, slides) => {
    const rs = rows.map(r => r.split("|"));
    const make = () => {
      const [text, ans, ...wr] = pick(rs);
      return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() };
    };
    make.teach = () => slides.map(([h, v, t]) => ({ h, v, t }));
    return { title, make };
  };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const bq = (q, rows) => rows.map(r => { const p = r.split("|"); p[0] = q + "<br><br><b>" + p[0] + "</b>"; return p.join("|"); });

  // =============== LEVEL 13 ===============
  const A1 = mk("Gerunds", "🏊", bq("Find the <b>gerund</b> (an -ing word used as a noun).", [
    "Swimming is good exercise.|Swimming|is|good",
    "She enjoys painting.|painting|enjoys|She",
    "Reading before bed helps me relax.|Reading|helps|relax",
    "His hobby is collecting stamps.|collecting|hobby|stamps",
    "We talked about moving to a new house.|moving|talked|house",
    "Dancing makes her happy.|Dancing|makes|happy",
    "I like baking bread.|baking|like|bread",
    "Thank you for helping.|helping|Thank|for"]),
    ["A gerund looks like a verb but names an activity, like a noun does. Which -ing word names an activity?", "Try replacing the -ing word with the word 'it' or 'that'. If the sentence still works, the word is acting like a noun.", "Example: <b>Running is fun.</b> 'Running' names an activity and is the subject, so it is a gerund. In <b>Tom is running</b> it is just part of the verb. Now do yours."],
    [["A verb that acts like a noun", "🏊", "A <b>gerund</b> is a verb + <b>-ing</b> used as a <b>noun</b>: <b>Swimming</b> is fun."], ["Where it appears", "📍", "A gerund can be a subject (<b>Reading</b> helps), an object (I love <b>drawing</b>) or follow a preposition (good at <b>singing</b>)."], ["Tell it apart", "🔎", "In <b>She is singing</b>, 'singing' is part of the verb. In <b>Singing relaxes her</b>, it is a noun, so it is a gerund."]]);

  const A2 = mk("Participles as adjectives", "🧊", bq("Find the <b>participle</b> that works as an adjective.", [
    "The broken window let in cold air.|broken|window|air",
    "We watched the setting sun.|setting|watched|sun",
    "The sleeping baby smiled.|sleeping|baby|smiled",
    "A tired runner sat down.|tired|runner|sat",
    "The frozen pond cracked.|frozen|pond|cracked",
    "She held a folded note.|folded|held|note",
    "The barking dog woke us.|barking|woke|us",
    "Burning toast filled the kitchen.|Burning|filled|kitchen"]),
    ["A participle used as an adjective describes a noun. Which word describes a noun but comes from a verb?", "Look for a word that ends in -ing or -ed (or an odd form like broken) that sits right before a noun and tells what kind it is.", "Example: <b>The melted snow ran down the hill.</b> 'Melted' comes from the verb melt and describes the snow. Now do yours."],
    [["Verb-made adjectives", "🧊", "A <b>participle</b> is a verb form that can describe a noun: a <b>smiling</b> child, a <b>frozen</b> lake."], ["Two kinds", "🔀", "<b>-ing</b> participles show action happening (the <b>falling</b> leaves). <b>-ed / -en</b> participles show a finished state (the <b>fallen</b> leaves)."], ["Check it", "✅", "Ask: does the word describe a noun right next to it? Then it is working as an adjective."]]);

  const A3 = mk("Infinitives", "🎯", [
    "Find the <b>infinitive</b> (to + verb).<br><br><b>I want to learn Spanish.</b>|to learn|want|Spanish",
    "Find the <b>infinitive</b> (to + verb).<br><br><b>She loves to sing.</b>|to sing|loves|She",
    "Find the <b>infinitive</b> (to + verb).<br><br><b>We need to leave soon.</b>|to leave|need|soon",
    "Find the <b>infinitive</b> (to + verb).<br><br><b>He tried to open the jar.</b>|to open|tried|jar",
    "Find the <b>infinitive</b> (to + verb).<br><br><b>To draw well takes practice.</b>|To draw|takes|practice",
    "Which sentence has an <b>infinitive</b>?|We hope to visit Rome.|We walked to the store.|He gave it to me.",
    "Which sentence has an <b>infinitive</b>?|She wants to play outside.|She went to school.|Give it to Dad.",
    "Which sentence has an <b>infinitive</b>?|They plan to build a fort.|They ran to the river.|The letter is to Grandma."],
    ["An infinitive is the word 'to' followed by a plain verb. Look for that pair.", "Be careful: 'to' followed by a place or a person is a preposition, not an infinitive. The word after 'to' must be an action.", "Example: <b>We chose to wait.</b> 'To wait' is to + verb, so it is an infinitive. In <b>We went to town</b>, 'to town' is not. Now do yours."],
    [["To + verb", "🎯", "An <b>infinitive</b> is <b>to</b> + a plain verb: <b>to run, to read, to think</b>."], ["It can act like a noun", "📦", "<b>To win</b> is my goal. I want <b>to win</b>. The infinitive names an action as a thing."], ["Not an infinitive", "⚠️", "<b>To the park</b> and <b>to her</b> are prepositional phrases because no verb follows <b>to</b>."]]);

  const A4 = mk("Appositives and commas", "🪪", [
    "Where do the commas go?<br><br><b>My dog a beagle loves treats.</b><br>(The renaming phrase is <b>a beagle</b>.)|on both sides of the phrase|only before the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>Paris the capital of France is beautiful.</b><br>(The renaming phrase is <b>the capital of France</b>.)|on both sides of the phrase|only before the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>We visited Denver the capital of Colorado.</b><br>(The renaming phrase is <b>the capital of Colorado</b>, at the end.)|only before the phrase|on both sides of the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>Our teacher Ms. Hall reads aloud.</b><br>(The renaming phrase is <b>Ms. Hall</b>.)|on both sides of the phrase|only before the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>Jupiter the largest planet has many moons.</b><br>(The renaming phrase is <b>the largest planet</b>.)|on both sides of the phrase|only before the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>I read about the cheetah the fastest land animal.</b><br>(The renaming phrase is <b>the fastest land animal</b>, at the end.)|only before the phrase|on both sides of the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>My neighbor a nurse works nights.</b><br>(The renaming phrase is <b>a nurse</b>.)|on both sides of the phrase|only before the phrase|only after the phrase|no commas",
    "Where do the commas go?<br><br><b>Saturn a planet with rings is far away.</b><br>(The renaming phrase is <b>a planet with rings</b>.)|on both sides of the phrase|only before the phrase|only after the phrase|no commas"],
    ["An appositive is a short phrase that renames the noun beside it. Find that phrase first.", "Test it: can you lift the phrase out and still have a full sentence? If so, it gets a comma at each place where it touches the rest of the sentence.", "Example: <b>Mount Everest, the tallest mountain, is in Asia.</b> 'The tallest mountain' renames Everest and has a comma before and after it. Now do yours."],
    [["Renaming phrase", "🪪", "An <b>appositive</b> is a noun phrase that renames the noun next to it: My dog, <b>a beagle</b>, barks."], ["Commas on both sides", "✂️", "When the appositive adds extra information, set it off with commas on both sides. At the end of a sentence, one comma before it is enough."], ["The lift-out test", "🧪", "Take the phrase out: <b>My dog barks.</b> The sentence still works, so the phrase was extra and needs commas."]]);

  const A5 = mk("Reflexive and intensive pronouns", "🪞", [
    "In 'The chef himself tasted the soup,' what is <b>himself</b>?|intensive pronoun|reflexive pronoun|plain noun",
    "In 'She taught herself guitar,' what is <b>herself</b>?|reflexive pronoun|intensive pronoun|plain noun",
    "In 'I made the cake myself,' what is <b>myself</b>?|intensive pronoun|reflexive pronoun|plain noun",
    "In 'The kittens washed themselves,' what is <b>themselves</b>?|reflexive pronoun|intensive pronoun|plain noun",
    "In 'The mayor herself opened the park,' what is <b>herself</b>?|intensive pronoun|reflexive pronoun|plain noun",
    "In 'We reminded ourselves to stay calm,' what is <b>ourselves</b>?|reflexive pronoun|intensive pronoun|plain noun",
    "In 'You yourself said so,' what is <b>yourself</b>?|intensive pronoun|reflexive pronoun|plain noun",
    "In 'He hurt himself on the swing,' what is <b>himself</b>?|reflexive pronoun|intensive pronoun|plain noun"],
    ["Cover the -self word with your finger and read the sentence again. What changes?", "A reflexive pronoun is needed to finish the meaning: the doer and the receiver are the same person. An intensive pronoun is extra and only adds emphasis.", "Example: <b>Max cut himself.</b> Without 'himself' the meaning breaks, so it is needed. <b>Max himself cut the rope</b> still works without it. Now do yours."],
    [["The -self words", "🪞", "<b>myself, yourself, himself, herself, itself, ourselves, themselves</b> are the -self pronouns."], ["Reflexive", "↩️", "A <b>reflexive</b> pronoun sends the action back to the doer and is needed: She <b>taught herself</b>."], ["Intensive", "💪", "An <b>intensive</b> pronoun adds emphasis and can be removed: The principal <b>herself</b> called. Never write 'hisself' or 'theirselves'."]]);

  const A6 = mk("Indefinite pronouns and verbs", "👥", [
    "Choose the verb.<br><br><b>Everyone ___ ready for the trip.</b>|is|are|were",
    "Choose the verb.<br><br><b>Both of my brothers ___ tall.</b>|are|is|was",
    "Choose the verb.<br><br><b>Each of the students ___ a pencil.</b>|has|have|are",
    "Choose the verb.<br><br><b>Somebody ___ left a jacket here.</b>|has|have|are",
    "Choose the verb.<br><br><b>Several of the birds ___ flown south.</b>|have|has|is",
    "Choose the verb.<br><br><b>Nobody ___ the answer yet.</b>|knows|know|knowing",
    "Choose the verb.<br><br><b>Few ___ able to lift it.</b>|are|is|was",
    "Choose the verb.<br><br><b>Anyone who wants more ___ welcome to ask.</b>|is|are|were"],
    ["First decide whether the pronoun means one person or thing, or more than one.", "Pronouns that end in -one, -body or -thing, plus each and every, count as one. Both, few, several and many count as more than one. Match the verb to that.", "Example: <b>Nobody ___ here.</b> 'Nobody' is one, so it is 'is'. <b>Many ___ here</b> is 'are'. Now do yours."],
    [["One or many?", "👥", "Some pronouns do not name a specific person. They are <b>indefinite pronouns</b>: everyone, each, nobody, both, few, several."], ["Singular ones", "1️⃣", "<b>each, everyone, everybody, anyone, someone, nobody, everything</b> take a <b>singular</b> verb: Everyone <b>is</b> here."], ["Plural ones", "👨‍👩‍👧", "<b>both, few, many, several</b> take a <b>plural</b> verb: Both <b>are</b> here."]]);

  const A7 = mk("Linking verbs", "🔗", bq("Find the <b>linking verb</b>.", [
    "The soup smells delicious.|smells|soup|delicious",
    "She became a doctor.|became|She|doctor",
    "The sky grew dark.|grew|sky|dark",
    "My brother is a pilot.|is|brother|pilot",
    "The milk tastes sour.|tastes|milk|sour",
    "They seem happy today.|seem|They|today",
    "The room felt cold.|felt|room|cold",
    "He remained calm.|remained|He|calm"]),
    ["A linking verb connects the subject to a word that describes or renames it. Which word does the connecting?", "Try swapping the verb for 'is' or 'was'. If the sentence still makes sense, the verb is linking.", "Example: <b>The cake looks great.</b> 'The cake is great' works, so 'looks' links the cake to 'great'. Now do yours."],
    [["Verbs that connect", "🔗", "A <b>linking verb</b> does not show action. It links the subject to a word that describes it or renames it."], ["Common ones", "📋", "<b>is, am, are, was, were, be, become, seem, remain, grow, feel, look, smell, taste</b>."], ["The swap test", "🔁", "Some verbs do both jobs. <b>The dog smelled the soup</b> is an action. <b>The soup smelled good</b> is linking. Try 'is' in place of the verb."]]);

  const A8 = mk("Independent and dependent clauses", "🧩", bq("What is this group of words?", [
    "We went inside|independent clause|dependent clause|phrase",
    "Because it was raining|dependent clause|independent clause|phrase",
    "after the movie ended|dependent clause|independent clause|phrase",
    "in the big red barn|phrase|independent clause|dependent clause",
    "The bell rang|independent clause|dependent clause|phrase",
    "although he was tired|dependent clause|independent clause|phrase",
    "under the old bridge|phrase|independent clause|dependent clause",
    "when the sun sets|dependent clause|independent clause|phrase",
    "Mia sings every morning|independent clause|dependent clause|phrase",
    "running down the hill|phrase|independent clause|dependent clause"]),
    ["Does the group of words have its own subject AND its own verb? That decides whether it is a clause at all.", "If it has both, ask: can it stand alone as a sentence? A starter word like because, although, when or after usually means it cannot.", "Example: <b>She smiled</b> has a subject and a verb and stands alone. <b>Since she smiled</b> has both but cannot stand alone. <b>On the shelf</b> has no verb. Now do yours."],
    [["Clause or phrase?", "🧩", "A <b>clause</b> has a subject and a verb. A <b>phrase</b> does not: <b>on the shelf</b>."], ["Independent", "💪", "An <b>independent clause</b> can stand alone as a sentence: <b>The bell rang.</b>"], ["Dependent", "🔗", "A <b>dependent clause</b> has a subject and verb but starts with a word like <b>because, when, although, if</b>, so it needs more: <b>When the bell rang</b>..."]]);

  const A9 = mk("The ellipsis", "…", [
    "'Well... I guess so,' said Tara. What does the ellipsis show?|a pause or hesitation|words were left out|a question",
    "The original is 'The old bridge, built long ago, still stands.' A writer quotes 'The old bridge ... still stands.' What does the ellipsis show?|words were left out|a pause|a shout",
    "'And then the lights went out...' What does the ellipsis at the end show?|the sentence trails off|a list begins|a quotation starts",
    "How many dots make an ellipsis?|three|two|five",
    "When you skip words in the middle of a quotation, what do you use?|an ellipsis|a colon|a hyphen",
    "Which is NOT a job of an ellipsis?|replacing a question mark|showing a pause|showing left-out words",
    "A character says 'I... don't know... maybe.' The ellipses make the character sound...|unsure|angry|excited",
    "Which sentence uses an ellipsis to show a pause?|I... I don't know what to say.|The cat sat... on the mat? No.|Wow... Wow... Wow... Wow...!"],
    ["An ellipsis is a row of dots. Think about the two reasons a writer might use dots instead of words.", "Dots inside a quote can show that part of the quote was skipped. Dots in dialogue or narration can show a pause, a trailing off, or suspense.", "Example: <b>'I... um... maybe.'</b> shows someone hesitating. <b>'The soup ... was hot'</b> from 'The soup, which Dad made, was hot' shows skipped words. Now do yours."],
    [["Three dots", "…", "An <b>ellipsis</b> is three dots (<b>...</b>). It stands for something missing or unsaid."], ["Two uses", "✂️", "1) Show that <b>words were left out</b> of a quotation. 2) Show a <b>pause</b>, hesitation or a voice trailing off."], ["Do not overdo it", "⚖️", "Too many ellipses make writing messy. Use one when it truly helps the reader."]]);

  const A10 = mk("Affect or effect?", "🌧️", [
    "Choose the right word.<br><br><b>Loud music can ___ your hearing.</b>|affect|effect",
    "Choose the right word.<br><br><b>The medicine had a good ___ on her.</b>|effect|affect",
    "Choose the right word.<br><br><b>How will the move ___ your school?</b>|affect|effect",
    "Choose the right word.<br><br><b>One ___ of the storm was a power outage.</b>|effect|affect",
    "Choose the right word.<br><br><b>Too little sleep can ___ your mood.</b>|affect|effect",
    "Choose the right word.<br><br><b>The special ___ in the movie were amazing.</b>|effects|affects",
    "Choose the right word.<br><br><b>What is the ___ of adding salt to ice?</b>|effect|affect",
    "Choose the right word.<br><br><b>Her kind words did ___ me deeply.</b>|affect|effect"],
    ["Decide whether the blank needs an action (something is changed) or a thing (a result).", "Affect is usually the action. Effect is usually the thing that results. A helpful trick: A is for Action, E is for End result.", "Example: <b>The cold will ___ the plants.</b> It is an action, so use 'affect'. <b>The cold had an ___ on the plants</b> needs 'effect', the result. Now do yours."],
    [["Look-alikes", "🌧️", "<b>Affect</b> and <b>effect</b> sound almost the same but do different jobs."], ["The easy rule", "🔑", "<b>Affect</b> is usually a <b>verb</b>: weather can <b>affect</b> plans. <b>Effect</b> is usually a <b>noun</b>: the <b>effect</b> was big."], ["Memory trick", "💡", "<b>A</b>ffect = <b>A</b>ction. <b>E</b>ffect = <b>E</b>nd result."]]);

  const A11 = mk("Accept, except, then, than", "🔤", [
    "Choose the right word.<br><br><b>Everyone ___ Sam is here.</b>|except|accept",
    "Choose the right word.<br><br><b>Please ___ my thank-you.</b>|accept|except",
    "Choose the right word.<br><br><b>She is taller ___ her sister.</b>|than|then",
    "Choose the right word.<br><br><b>First we eat, ___ we play.</b>|then|than",
    "Choose the right word.<br><br><b>I will ___ your invitation.</b>|accept|except",
    "Choose the right word.<br><br><b>This book is better ___ that one.</b>|than|then",
    "Choose the right word.<br><br><b>We finished homework, and ___ we watched a show.</b>|then|than",
    "Choose the right word.<br><br><b>All the lights ___ one were off.</b>|except|accept"],
    ["Say what the blank means in your own words. Is it leaving something out, receiving something, comparing, or showing time?", "Except means 'leaving out'. Accept means 'to receive or agree'. Than is used to compare. Then is about time or what happens next.", "Example: <b>I like all fruit ___ plums.</b> It leaves plums out, so 'except'. <b>Winter is colder ___ fall</b> compares, so 'than'. Now do yours."],
    [["Accept vs except", "🎁", "<b>Accept</b> = receive or agree to. <b>Except</b> = leaving out: all <b>except</b> one."], ["Then vs than", "⏱️", "<b>Then</b> = time or next step: first this, <b>then</b> that. <b>Than</b> = comparing: bigger <b>than</b>."], ["Test", "🧪", "If you can swap in 'next', use <b>then</b>. If you are comparing two things, use <b>than</b>."]]);

  const A12 = mk("Analogies", "🧠", [
    "Hot is to cold as up is to ___.|down|high|top",
    "Bird is to nest as bee is to ___.|hive|honey|wing",
    "Pen is to write as knife is to ___.|cut|sharp|fork",
    "Puppy is to dog as kitten is to ___.|cat|mouse|purr",
    "Glove is to hand as sock is to ___.|foot|shoe|leg",
    "Teacher is to school as doctor is to ___.|hospital|medicine|patient",
    "Finger is to hand as toe is to ___.|foot|shoe|nail",
    "Happy is to joyful as sad is to ___.|gloomy|cheerful|loud"],
    ["First work out how the first two words are connected.", "Say the link as a sentence, like 'a ___ is where a ___ lives', then use the very same link for the second pair.", "Example: <b>Fish is to water as bird is to ___.</b> A fish lives in water, so a bird lives in the air. Now do yours."],
    [["Word pairs", "🧠", "An <b>analogy</b> compares two pairs of words that are linked in the same way: <b>A is to B as C is to D</b>."], ["Find the link", "🔗", "Common links: opposites, tool and job, part and whole, home and animal, baby and adult, same meaning."], ["Check it", "✅", "Say the link for the first pair, then see whether it works for your answer."]]);

  const A13 = mk("Dictionary skills", "📖", [
    "A dictionary page has guide words <b>mint</b> and <b>moon</b>. Which word is on that page?|monkey|mild|mouse",
    "A dictionary page has guide words <b>cab</b> and <b>cat</b>. Which word is on that page?|cart|cub|bat",
    "A dictionary page has guide words <b>fan</b> and <b>fig</b>. Which word is on that page?|far|fur|fin",
    "What does the abbreviation <b>n.</b> mean in a dictionary entry?|noun|number|name",
    "What does the abbreviation <b>adj.</b> mean in a dictionary entry?|adjective|adverb|addition",
    "An entry shows (HAP-ee) after the word. What does that part show?|how to pronounce the word|what the word means|where the word came from",
    "Which part of an entry tells you what the word means?|the definition|the pronunciation|the guide word",
    "In what order are words listed in a dictionary?|alphabetical order|order of length|order of how common they are",
    "Which word comes first in a dictionary?|ankle|apple|arrow"],
    ["Think about which part of the dictionary the question is about: the guide words, the abbreviations or the entry itself.", "Guide words show the first and last words on a page. Words on that page fall alphabetically between them. Compare the words letter by letter.", "Example: guide words <b>bat</b> and <b>bed</b>. The word <b>bear</b> is on that page, because b-e-a comes after b-a-t and before b-e-d. But <b>bus</b> is not, since it comes after bed. Now do yours."],
    [["Guide words", "📖", "The two words at the top of a dictionary page show the <b>first</b> and <b>last</b> entries on that page."], ["Inside an entry", "🔍", "An entry gives the <b>spelling</b>, how to <b>say</b> it, the <b>part of speech</b> (n., v., adj., adv.) and the <b>definition</b>."], ["Alphabetical order", "🔤", "If the first letters match, compare the second letter, then the third, and so on."]]);

  const A14 = mk("Suffixes that change the part of speech", "🧱", [
    "What part of speech is <b>kindness</b>?|noun|adjective|adverb",
    "What part of speech is <b>careful</b>?|adjective|noun|verb",
    "What part of speech is <b>quickly</b>?|adverb|adjective|noun",
    "What part of speech is <b>beautify</b>?|verb|noun|adjective",
    "Which word is a noun?|enjoyment|enjoyable|enjoyably",
    "Which word is an adjective?|dangerous|danger|dangerously",
    "Which word is a verb?|modernize|modernly|modernness",
    "Which word is an adverb?|bravely|bravery|braver"],
    ["Look at the ending of the word. The ending often tells you the part of speech.", "Endings like -ness, -ment and -tion usually make nouns. Endings like -ful, -ous and -able make adjectives. -ly usually makes adverbs. -ize and -ify make verbs.", "Example: <b>sadness</b> ends in -ness, so it is a noun. <b>Sadly</b> ends in -ly, so it is an adverb. Now do yours."],
    [["Endings do jobs", "🧱", "A <b>suffix</b> can change a word's part of speech: <b>happy</b> (adjective) + <b>-ness</b> = <b>happiness</b> (noun)."], ["Common suffixes", "📋", "Nouns: -ness, -ment, -tion. Adjectives: -ful, -ous, -able. Adverbs: -ly. Verbs: -ize, -ify."], ["Spelling tip", "✍️", "Drop or change letters when needed: happy + ness = happ<b>i</b>ness."]]);

  const A15 = mk("Writing dialogue", "💬", [
    "When a new person starts speaking, what should you do?|start a new paragraph|keep going on the same line|use a colon",
    "What is wrong here?<br><br><b>'Where are you going?' Asked Mom.</b>|'Asked' should start with a small letter|the question mark is missing|the quotation marks are missing|nothing is wrong",
    "What is wrong here?<br><br><b>'I'm ready.' said Leo.</b>|the period should be a comma|'said' should start with a capital|the quotation marks are missing|nothing is wrong",
    "What goes inside the quotation marks?|the exact words spoken|the speaker's name|the whole paragraph",
    "Which sentence has a <b>dialogue tag</b>?|'Come here,' whispered Ana.|Ana ran across the yard.|The yard was quiet.",
    "When the tag comes after the quote, where does the comma go?|inside the closing quotation mark|outside the closing quotation mark|nowhere",
    "Ben says hello. Then Mia answers. Where should Mia's words go?|in a new paragraph|in the same paragraph as Ben's|in parentheses",
    "What is wrong here?<br><br><b>'Let's go,' said Dad, 'Before it rains.'</b>|'Before' should start with a small letter|'said' should start with a capital|the comma is missing|nothing is wrong"],
    ["Think about who is speaking and where each speaker's words and tag belong.", "A new speaker gets a new paragraph. Commas, question marks and exclamation marks go inside the closing quotation mark. A tag after the quote starts with a small letter unless it is a name.", "Example: <b>'Look up,' said Jo.</b> The comma sits inside the marks and 'said' is small. <b>'Look up!' Jo said.</b> Now do yours."],
    [["Quotation marks", "💬", "Put the speaker's <b>exact words</b> inside quotation marks. A <b>dialogue tag</b> like <i>said Mom</i> tells who is speaking."], ["Punctuation", "✏️", "'I'm ready,' said Leo. The comma goes <b>inside</b> the marks. A question mark stays inside too: 'Ready?' asked Leo."], ["New speaker, new paragraph", "↩️", "Start a new paragraph every time a different person speaks, so readers never lose track."]]);

  const A16 = mk("Plot structure", "⛰️", [
    "Which part of the plot is this?<br><br><b>On the first day of school, we meet Maya, who is shy.</b>|exposition|rising action|climax|resolution",
    "Which part of the plot is this?<br><br><b>Maya faces the strongest rival in the championship game, and everything is on the line.</b>|climax|exposition|rising action|resolution",
    "Which part of the plot is this?<br><br><b>After the final whistle, everyone cheers and Maya learns to believe in herself.</b>|resolution|exposition|rising action|climax",
    "Which part of the plot is this?<br><br><b>Maya finds a clue, but each step makes the mystery harder.</b>|rising action|exposition|climax|resolution",
    "Which part of the plot is this?<br><br><b>A story begins in a small village where a boy lives with his grandmother.</b>|exposition|climax|resolution|rising action",
    "Which part of the plot is this?<br><br><b>The turning point comes when the boy opens the locked door and sees the truth.</b>|climax|exposition|rising action|resolution",
    "Which part of the plot is this?<br><br><b>The problem is solved and the characters go back to ordinary life.</b>|resolution|climax|exposition|rising action",
    "Which part of the plot usually comes first?|exposition|climax|resolution|rising action"],
    ["Think about where in the story this moment happens: the start, the build-up, the biggest moment, or the ending.", "Exposition introduces characters and setting. Rising action builds the problem. The climax is the highest point of tension. The resolution wraps things up.", "Example: <b>Tom hears a strange noise in the attic.</b> The problem is just starting to grow, so that is the rising action. Now do yours."],
    [["The story mountain", "⛰️", "Most plots climb like a mountain: exposition, <b>rising action</b>, <b>climax</b>, then falling action and <b>resolution</b>."], ["Beginning and middle", "🌱", "<b>Exposition</b> shows who, where and when. <b>Rising action</b> adds problems that build tension."], ["Peak and end", "🏔️", "The <b>climax</b> is the biggest, most exciting moment. After it comes the <b>resolution</b>, where the problem is solved."]]);

  const A17 = mk("Why was it written?", "🎯", [
    "What is the main purpose?<br><br><b>A news article about how volcanoes form.</b>|to inform|to persuade|to entertain",
    "What is the main purpose?<br><br><b>A poster: 'Vote for Zoe for class president! She will make lunch better!'</b>|to persuade|to inform|to entertain",
    "What is the main purpose?<br><br><b>A funny story about a dragon who loses his fire.</b>|to entertain|to inform|to persuade",
    "What is the main purpose?<br><br><b>A science textbook chapter on the water cycle.</b>|to inform|to persuade|to entertain",
    "What is the main purpose?<br><br><b>An ad that says 'Buy the best sneakers ever!'</b>|to persuade|to inform|to entertain",
    "What is the main purpose?<br><br><b>A comic strip about a clumsy robot.</b>|to entertain|to persuade|to inform",
    "What is the main purpose?<br><br><b>A recipe card that explains how to make soup.</b>|to inform|to entertain|to persuade",
    "What is the main purpose?<br><br><b>A letter to the editor asking the town to build a skate park.</b>|to persuade|to inform|to entertain"],
    ["Ask what the writer wants the reader to do or feel after reading.", "To inform means to teach facts. To persuade means to change the reader's mind or get them to act. To entertain means to give enjoyment, like a story or joke.", "Example: <b>A sign that says 'Please recycle! Save our planet!'</b> asks readers to act, so its purpose is to persuade. Now do yours."],
    [["Three purposes", "🎯", "Writers write to <b>inform</b>, to <b>persuade</b> or to <b>entertain</b>. Many texts mix them, but one purpose is main."], ["Clues", "🔎", "Facts and explanations: inform. Strong opinions and a call to act: persuade. Characters, jokes and plot: entertain."], ["Why it matters", "💡", "Knowing the purpose helps you choose the right words and the right tone when you write."]]);

  const A18 = mk("Text structures", "🗂️", [
    "Which text structure fits?<br><br><b>A passage tells how cats and dogs are alike and different.</b>|compare and contrast|sequence|cause and effect|problem and solution",
    "Which text structure fits?<br><br><b>A passage explains how too much rain caused a river to flood.</b>|cause and effect|compare and contrast|sequence|problem and solution",
    "Which text structure fits?<br><br><b>A passage describes litter at the beach and how volunteers cleaned it up.</b>|problem and solution|compare and contrast|sequence|cause and effect",
    "Which text structure fits?<br><br><b>A passage lists the steps of a bean's life from seed to plant, in order.</b>|sequence|compare and contrast|cause and effect|problem and solution",
    "Which structure uses signal words like <b>because</b>, <b>as a result</b> and <b>so</b>?|cause and effect|sequence|compare and contrast|problem and solution",
    "Which structure uses signal words like <b>however</b>, <b>both</b> and <b>on the other hand</b>?|compare and contrast|sequence|cause and effect|problem and solution",
    "Which structure uses signal words like <b>first</b>, <b>then</b> and <b>finally</b>?|sequence|compare and contrast|cause and effect|problem and solution",
    "Which structure uses signal words like <b>one solution is</b> and <b>the trouble is</b>?|problem and solution|sequence|compare and contrast|cause and effect"],
    ["Ask how the writer organized the information. Is it by time, by likeness, by reason, or by fixing a trouble?", "Look for signal words. Time words show a sequence. Words like both and however show comparing. Words like because show a cause. Words like trouble and solution show a problem.", "Example: <b>Since the pond dried up, the frogs moved away.</b> The signal word 'since' shows a reason and result, so it is cause and effect. Now do yours."],
    [["Organizing facts", "🗂️", "Informational writing follows a pattern, called a <b>text structure</b>."], ["Four common ones", "4️⃣", "<b>Sequence</b> (time order), <b>compare and contrast</b>, <b>cause and effect</b>, <b>problem and solution</b>."], ["Signal words", "🚦", "Sequence: first, next, finally. Compare: both, unlike. Cause: because, so, as a result. Problem: trouble, solution."]]);

  // =============== LEVEL 14 ===============
  const B1 = mk("Perfect tenses", "⏳", bq("What tense is this sentence?", [
    "She had finished her homework before dinner.|past perfect|present perfect|future perfect",
    "They have visited Spain twice.|present perfect|past perfect|future perfect",
    "By June, I will have lived here for a year.|future perfect|present perfect|past perfect",
    "We had left before the rain started.|past perfect|present perfect|future perfect",
    "He has lost his key.|present perfect|past perfect|future perfect",
    "By tomorrow, she will have finished the book.|future perfect|present perfect|past perfect",
    "The movie had already begun when we arrived.|past perfect|present perfect|future perfect",
    "I have seen that show.|present perfect|past perfect|future perfect"]),
    ["Look at the helping verb just before the main verb. It carries the time clue.", "Has or have points to the present. Had points to something finished before another past moment. Will have points to something that will be finished by a future time.", "Example: <b>We have eaten.</b> 'Have' is the helper, so this is present perfect. <b>We had eaten</b> would be past perfect. Now do yours."],
    [["Perfect = finished", "⏳", "Perfect tenses use <b>has / have / had</b> + a past form (<b>eaten, finished, seen</b>). They show an action that is completed."], ["Three kinds", "3️⃣", "<b>Present perfect</b>: have finished. <b>Past perfect</b>: had finished (before another past event). <b>Future perfect</b>: will have finished."], ["Spot the helper", "🔎", "The helping verb tells the tense: <b>has/have</b>, <b>had</b>, or <b>will have</b>."]]);

  const B2 = mk("Commas between adjectives", "🎨", [
    "Where does a comma belong, if anywhere?<br><br><b>He has a soft gentle voice.</b>|between soft and gentle|after gentle|before soft|nowhere",
    "Where does a comma belong, if anywhere?<br><br><b>I bought two red balloons.</b>|nowhere|between two and red|after red|after balloons",
    "Where does a comma belong, if anywhere?<br><br><b>The old creaky stairs groaned.</b>|between old and creaky|after creaky|after stairs|nowhere",
    "Where does a comma belong, if anywhere?<br><br><b>She owns a small wooden boat.</b>|nowhere|between small and wooden|after wooden|after boat",
    "Where does a comma belong, if anywhere?<br><br><b>It was a dark stormy night.</b>|between dark and stormy|after stormy|before dark|nowhere",
    "Where does a comma belong, if anywhere?<br><br><b>My three little cousins arrived.</b>|nowhere|between three and little|after little|after cousins",
    "Where does a comma belong, if anywhere?<br><br><b>They live in a quiet friendly town.</b>|between quiet and friendly|after friendly|before quiet|nowhere",
    "Where does a comma belong, if anywhere?<br><br><b>He wore a heavy winter coat.</b>|nowhere|between heavy and winter|after winter|after coat"],
    ["Try two tests on the adjectives: can you put 'and' between them, and can you swap their order?", "If both tests still sound natural, the adjectives are equal and need a comma between them. If not, there is no comma. Never put a comma between the last adjective and the noun.", "Example: <b>a cold, windy day</b> works as 'cold and windy' or 'windy, cold', so it gets a comma. <b>Three tall trees</b> does not pass, so no comma. Now do yours."],
    [["Equal adjectives", "🎨", "Two adjectives that each describe the noun on their own are <b>coordinate adjectives</b>. Separate them with a comma: a <b>bright, sunny</b> day."], ["The two tests", "🧪", "Put <b>and</b> between them, or swap them. If it still sounds right, add the comma."], ["Not equal", "🚫", "Numbers, sizes and materials usually come in order with no comma: <b>two small wooden boxes</b>."]]);

  const B3 = mk("Keep the same point of view", "🔭", [
    "Which sentence keeps the same point of view?|When you study, you learn more.|When you study, one learns more.|When you study, we learn more.",
    "Which sentence keeps the same point of view?|If students practice, they improve.|If students practice, you improve.|If students practice, I improve.",
    "Which sentence keeps the same point of view?|I love hiking because I feel free.|I love hiking because you feel free.|I love hiking because they feel free.",
    "Which sentence keeps the same point of view?|People should recycle because they care about the planet.|People should recycle because you care about the planet.|People should recycle because I care about the planet.",
    "Which sentence keeps the same point of view?|When we travel, we see new places.|When we travel, you see new places.|When we travel, they see new places.",
    "Which sentence keeps the same point of view?|When you cook, you should wash your hands.|When you cook, we should wash your hands.|When you cook, one should wash your hands.",
    "Which sentence keeps the same point of view?|Kids need sleep, so they should go to bed early.|Kids need sleep, so you should go to bed early.|Kids need sleep, so I should go to bed early.",
    "Which sentence keeps the same point of view?|I packed my bag, and I checked my list.|I packed my bag, and you checked my list.|I packed my bag, and he checked my list."],
    ["Find who the sentence starts talking about: I, you, we, or they. Does the second part still talk about the same person?", "A sentence that starts with 'you' should keep using 'you'. One that starts with 'they' should keep using 'they'. Switching in the middle confuses the reader.", "Example: <b>When people exercise, they feel better.</b> Both parts use 'people / they'. <b>When people exercise, you feel better</b> shifts. Now do yours."],
    [["Who is talking?", "🔭", "<b>Point of view</b> in a sentence is the person it talks about: <b>I / we</b> (first), <b>you</b> (second), <b>he / she / they</b> (third)."], ["Don't shift", "🔀", "Pick one and stay with it. Wrong: <i>When you study, I learn more.</i> Right: <i>When you study, you learn more.</i>"], ["Check it", "✅", "Look at each pronoun in the sentence. They should all point to the same person or group."]]);

  const B4 = mk("Four sentence types", "🏗️", bq("What kind of sentence is this?", [
    "Tom and Ana sang and danced.|simple|compound|complex|compound-complex",
    "The dog barked, and the cat ran away.|compound|simple|complex|compound-complex",
    "When the dog barked, the cat ran away.|complex|simple|compound|compound-complex",
    "When the dog barked, the cat ran away, and the birds flew off.|compound-complex|simple|compound|complex",
    "Although it was cold, we played outside, and we had fun.|compound-complex|simple|compound|complex",
    "I like pizza, but my brother prefers pasta.|compound|simple|complex|compound-complex",
    "Because she studied, Mia passed the test.|complex|simple|compound|compound-complex",
    "The bell rang.|simple|compound|complex|compound-complex"]),
    ["Count the independent clauses (can stand alone) and the dependent clauses (start with words like when, because, although).", "One independent clause only: simple (or complex if it also has a dependent clause). Two or more independent clauses: compound. Compound AND a dependent clause: the last type.", "Example: <b>I ran, and she walked.</b> It has two independent clauses and no dependent clause, so it is compound. Now do yours."],
    [["Simple and compound", "🏗️", "<b>Simple</b>: one independent clause. <b>Compound</b>: two or more independent clauses joined by a comma + and / but / or / so."], ["Complex", "🧱", "<b>Complex</b>: one independent clause + at least one dependent clause: <i>Because it rained, we stayed in.</i>"], ["Compound-complex", "🏰", "<b>Compound-complex</b>: two or more independent clauses + at least one dependent clause."]]);

  const B5 = mk("Owning together or apart", "🤝", [
    "Where does the <b>'s</b> go?<br><br><b>Mia and Ben own one dog together.</b>|only on the last name|on both names|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>Tom and Jen each own a separate bike.</b>|on both names|only on the last name|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>Sam and Lee own one house together.</b>|only on the last name|on both names|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>Ava and Zoe each have their own backpack.</b>|on both names|only on the last name|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>The garden belongs to Mom and Dad together.</b>|only on the last name|on both names|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>Ann has her own hat and Kim has her own hat.</b>|on both names|only on the last name|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>Joe and Kai share one boat.</b>|only on the last name|on both names|nowhere, just add s to each name",
    "Where does the <b>'s</b> go?<br><br><b>Rosa and Eli have their own separate opinions.</b>|on both names|only on the last name|nowhere, just add s to each name"],
    ["Ask: is it one thing owned by both people, or does each person own their own?", "Owning one thing together is different from each owning a separate thing. The apostrophe s has to match who owns what.", "Example: <b>Jo and Cy's tent</b> is one tent they share. <b>Jo's and Cy's tents</b> are two tents. Now do yours."],
    [["Shared", "🤝", "When two people own <b>one thing together</b>, add <b>'s</b> only to the last name: <b>Mia and Ben's dog</b>."], ["Separate", "↔️", "When each owns their <b>own</b> thing, add <b>'s</b> to both: <b>Mia's and Ben's dogs</b>."], ["Ask yourself", "💭", "How many dogs, houses or hats are there? One shared thing means one 's. Separate things mean two."]]);

  const B6 = mk("Tricky plurals", "📚", [
    "What is the plural of <b>crisis</b>?|crises|crisises|crisis's",
    "What is the plural of <b>criterion</b>?|criteria|criterions|criterias",
    "What is the plural of <b>analysis</b>?|analyses|analysises|analysis's",
    "What is the plural of <b>mother-in-law</b>?|mothers-in-law|mother-in-laws|mothers-in-laws",
    "What is the plural of <b>bacterium</b>?|bacteria|bacteriums|bacterias",
    "What is the plural of <b>phenomenon</b>?|phenomena|phenomenas|phenomenies",
    "What is the plural of <b>passerby</b>?|passersby|passerbys|passerbies",
    "What is the plural of <b>hypothesis</b>?|hypotheses|hypothesises|hypothesis's"],
    ["Many science words came from Latin or Greek and keep their old plural endings. Think about the ending of the singular word.", "Words ending in -is often change to -es (said 'eez'). Words ending in -on or -um often change to -a. In compound words with hyphens, the main noun gets the plural.", "Example: <b>diagnosis</b> changes -is to -es: <b>diagnoses</b>. <b>Datum</b> changes -um to -a: <b>data</b>. <b>Sister-in-law</b> becomes <b>sisters-in-law</b>. Now do yours."],
    [["Old endings", "📚", "Some words keep Latin or Greek plurals: <b>-is → -es</b> (crisis, crises), <b>-on → -a</b> (criterion, criteria), <b>-um → -a</b> (bacterium, bacteria)."], ["Hyphen words", "➖", "In words like <b>mother-in-law</b>, pluralize the main word: <b>mothers-in-law</b>."], ["Check", "✅", "No apostrophe for plurals, and no extra -s added to a word that already changed."]]);

  const B7 = mk("Numbers in writing", "🔢", [
    "Which is correct at the start of a sentence?|Forty-two kids came to the party.|42 kids came to the party.",
    "Using the rule that numbers zero to nine are spelled out, which is correct?|The book has seven chapters.|The book has 7 chapters.",
    "What goes between the parts when you spell out 45?|a hyphen|a comma|a period",
    "Which is correct at the start of a sentence?|Twelve students joined the club.|12 students joined the club.",
    "Using the rule that numbers 10 and up are written as digits, which is correct?|There are 30 chairs in the room.|There are thirty chairs in the room.",
    "Using the rule that numbers zero to nine are spelled out, which is correct?|I read three books.|I read 3 books.",
    "Which number word needs a hyphen?|sixty-one|sixty|one hundred|twelve",
    "Which is correct at the start of a sentence?|Nineteen birds sat on the wire.|19 birds sat on the wire."],
    ["Check two things: how the sentence begins, and how big the number is.", "Never start a sentence with a numeral. In this lesson's rule, zero to nine are spelled out and 10 and up use digits. Numbers from 21 to 99 that are spelled out use a hyphen.", "Example: <b>Sixty-one fans cheered.</b> It starts a sentence, so it is spelled out with a hyphen. In the middle of a sentence: <b>We sold 61 tickets.</b> Now do yours."],
    [["Start of a sentence", "🔢", "Always spell out a number that begins a sentence: <b>Fifteen kids came.</b>"], ["A common rule", "📏", "Spell out numbers <b>zero to nine</b>. Use digits for <b>10 and up</b>. (Style guides can differ, so stay consistent.)"], ["Hyphens", "➖", "When you spell out 21 to 99, join the parts with a hyphen: <b>twenty-one, forty-five</b>."]]);

  const B8 = mk("A quote inside a quote", "🗨️", [
    "What is wrong here?<br><br><b>“Mom said, “Dinner is ready,” ” Ben told us.</b>|the inside quote needs single marks|the sentence needs a colon|Ben's name should be in quotes|nothing is wrong",
    "What is wrong here?<br><br><b>‘The coach shouted, “Run faster!” ’ said Lila.</b>|the outside marks should be double and the inside single|the exclamation mark is missing|'said' should start with a capital|nothing is wrong",
    "In American style, which marks go around the main quotation?|double quotation marks|single quotation marks|parentheses",
    "In American style, which marks go around the quote inside the quote?|single quotation marks|double quotation marks|brackets",
    "Jo said, “I love ‘Casey at the Bat.’” Why is the poem title in single marks?|it is a title inside a quotation|it is the speaker's name|it is being shouted",
    "“Grandpa asked, ‘Who wants pie?’ ” said Jo. Whose exact words are inside the single marks?|Grandpa's|Jo's|nobody's",
    "“Mia whispered, ‘It's a secret,’ ” said Ravi. Who said ‘It's a secret’ first?|Mia|Ravi|the reader",
    "What is wrong here?<br><br><b>She said, ‘I read “The Raven” today.’</b>|the outside marks should be double|the title should be in capitals|'today' should start with a capital|nothing is wrong"],
    ["Think about which words are inside the other words. The outside quote gets one kind of mark, the inside quote the other.", "In American writing, the outer quotation uses double marks and anything quoted inside it uses single marks. The inside words are what somebody else said.", "Example: <b>“Dad said, ‘Wait here,’ ” whispered Eva.</b> Eva reports what Dad said, so Dad's words get single marks inside her double marks. Now do yours."],
    [["Double outside", "🗨️", "The main quotation uses <b>double</b> quotation marks: “Hello,” said Sam."], ["Single inside", "💬", "A quote or title <b>inside</b> that quote uses <b>single</b> marks: “Mom said, ‘Hurry up,’ ” said Sam."], ["Who said what", "🕵️", "The words in single marks were said by someone else, then repeated by the speaker."]]);

  const B9 = mk("Clichés", "♻️", [
    "Which phrase is a cliché (overused)?|quiet as a mouse|silent as dust settling on old books|so still the clock seemed loud",
    "Which phrase is a cliché?|avoid it like the plague|steer around it like a puddle|back away from it slowly",
    "Which phrase is a cliché?|busy as a bee|busy as a cook on a Friday night|busier than a squirrel in October",
    "Which phrase is a cliché?|cold as ice|cold enough to turn breath into smoke|so cold the puddle cracked",
    "Which phrase is a cliché?|time flies when you're having fun|the afternoon vanished into laughter|we looked up and it was dark",
    "Which phrase is a cliché?|only time will tell|nobody could say yet|the answer was still hidden",
    "Why should writers usually avoid clichés?|they are overused and lack fresh detail|they are not real words|they are against the rules",
    "Which sentence replaces the cliché 'He was as strong as an ox' with fresher writing?|He lifted the sofa as if it were a pillow.|He was very strong.|He was strong as a bull."],
    ["A cliché is a phrase you have heard so many times that it no longer makes a picture. Which one sounds like something everyone says?", "Fresh writing uses a specific, surprising detail. A cliché is a ready-made saying that readers expect before they finish reading it.", "Example: <b>Her smile was as bright as the sun</b> is a cliché. <b>Her smile lit up the dark hallway like a lantern</b> is fresher. Now do yours."],
    [["Worn-out phrases", "♻️", "A <b>cliché</b> is a phrase used so often it has lost its power: <i>quiet as a mouse, cold as ice, busy as a bee</i>."], ["Why avoid them", "🚫", "Clichés are lazy shortcuts. They do not show readers anything new about your idea."], ["Make it fresh", "✨", "Ask: what exactly did I see, hear or feel? Write that detail instead of a ready-made saying."]]);

  const B10 = mk("Irony", "🎭", [
    "What kind of irony is this?<br><br><b>A fire station burns down.</b>|situational irony|verbal irony|dramatic irony",
    "What kind of irony is this?<br><br><b>It is pouring rain and you say, 'Lovely weather for a picnic.'</b>|verbal irony|situational irony|dramatic irony",
    "What kind of irony is this?<br><br><b>The audience knows a monster hides in the closet, but the character does not.</b>|dramatic irony|situational irony|verbal irony",
    "What kind of irony is this?<br><br><b>After a long, boring movie, Sam says, 'That was thrilling!' and rolls his eyes.</b>|verbal irony|situational irony|dramatic irony",
    "What kind of irony is this?<br><br><b>A dentist has the worst teeth in town.</b>|situational irony|verbal irony|dramatic irony",
    "What kind of irony is this?<br><br><b>The reader knows the letter is a trick, but the hero believes it.</b>|dramatic irony|situational irony|verbal irony",
    "What kind of irony is this?<br><br><b>A marathon champion trips on her own front step.</b>|situational irony|verbal irony|dramatic irony",
    "What kind of irony is this?<br><br><b>Your friend spills juice and says, 'Nice job, graceful as always.'</b>|verbal irony|situational irony|dramatic irony"],
    ["Irony is when what is said or what happens is the opposite of what you would expect. Who knows what, and who is surprised?", "Verbal irony: a person says the opposite of what they mean. Situational irony: the outcome is the opposite of what was expected. Dramatic irony: the audience knows something a character does not.", "Example: <b>A lifeguard who cannot swim.</b> The outcome is the opposite of what we expect from a lifeguard, so it is situational irony. Now do yours."],
    [["Opposites", "🎭", "<b>Irony</b> happens when reality is the opposite of what was said or expected."], ["Three kinds", "3️⃣", "<b>Verbal</b>: saying the opposite. <b>Situational</b>: a surprising opposite result. <b>Dramatic</b>: the reader knows more than the character."], ["Keep it kind", "😊", "Verbal irony (sarcasm) can sound unkind, so use it carefully in real life. In stories it adds humor and tension."]]);

  const B11 = mk("Poem forms", "🌸", [
    "Which poem form is this?<br><br><b>A three-line poem with 5, 7 and 5 syllables.</b>|haiku|limerick|acrostic|free verse",
    "Which poem form is this?<br><br><b>A funny five-line poem with the rhyme pattern AABBA.</b>|limerick|haiku|acrostic|free verse",
    "Which poem form is this?<br><br><b>The first letters of the lines spell out a word.</b>|acrostic|haiku|limerick|free verse",
    "Which poem form is this?<br><br><b>A poem with no set rhyme pattern or beat.</b>|free verse|haiku|limerick|acrostic",
    "Which form has a bouncy rhythm and a funny story in five lines?|limerick|haiku|acrostic|free verse",
    "Which form is often about nature in just three short lines?|haiku|limerick|acrostic|free verse",
    "How many lines does a limerick have?|five|three|fourteen",
    "How many syllables are in the middle line of a haiku?|seven|five|nine"],
    ["Think about the shape of the poem: how many lines, how many syllables, and whether it rhymes.", "Each form has a signature. One has a syllable count. One has a joke and a rhyme pattern. One spells a word down the page. One has no pattern at all.", "Example: a poem whose lines begin S, U, N spells SUN, so it is an acrostic. Now do yours."],
    [["Haiku", "🌸", "A <b>haiku</b> has three lines with 5, 7 and 5 syllables. It often paints a quick picture of nature."], ["Limerick", "😄", "A <b>limerick</b> has five lines, a bouncy rhythm and the rhyme pattern <b>AABBA</b>. It is usually funny."], ["Acrostic and free verse", "🔤", "In an <b>acrostic</b> the first letters spell a word. <b>Free verse</b> has no set rhyme or beat."]]);

  const B12 = mk("Blends and clipped words", "✂️", [
    "Which two words make <b>brunch</b>?|breakfast + lunch|bread + lunch|break + crunch",
    "Which two words make <b>smog</b>?|smoke + fog|smile + dog|snow + fog",
    "Which two words make <b>motel</b>?|motor + hotel|mountain + hotel|motion + elevator",
    "Which two words make <b>spork</b>?|spoon + fork|spice + pork|sport + ork",
    "Which short word is a clipped form of <b>laboratory</b>?|lab|labo|lory",
    "Which short word is a clipped form of <b>photograph</b>?|photo|phon|graph",
    "Which short word is a clipped form of <b>examination</b>?|exam|ex|nation",
    "<b>Chortle</b> was invented by blending which words?|chuckle + snort|chop + whistle|chart + turtle"],
    ["A blend squishes two words together. A clipped word is a longer word cut down. Which one does this question use?", "For a blend, look for the beginning of one word and the ending of another. For a clipped word, look for the beginning part of the long word.", "Example: <b>telephone</b> cut short is <b>phone</b> (clipped). <b>Chill + relax = chillax</b> (blend). Now do yours."],
    [["Blends", "🧪", "A <b>blend</b> mixes parts of two words: <b>breakfast + lunch = brunch</b>, <b>smoke + fog = smog</b>."], ["Clipped words", "✂️", "A <b>clipped word</b> is a longer word cut short: <b>photograph → photo</b>, <b>examination → exam</b>."], ["Language grows", "🌱", "People keep making new words this way. Many blends and clips are now in the dictionary."]]);

  const B13 = mk("Words from other languages", "🌍", [
    "The word <b>pizza</b> came into English from which language?|Italian|German|Japanese|French",
    "The word <b>kindergarten</b> came into English from which language?|German|Italian|Spanish|Hindi",
    "The word <b>tsunami</b> came into English from which language?|Japanese|Arabic|French|Swahili",
    "The word <b>canyon</b> came into English from which language?|Spanish|Hindi|German|Japanese",
    "The word <b>ballet</b> came into English from which language?|French|Japanese|Swahili|Spanish",
    "The word <b>algebra</b> came into English from which language?|Arabic|Italian|Hindi|German",
    "The word <b>safari</b> came into English from which language?|Swahili|French|Japanese|Spanish",
    "The word <b>shampoo</b> came into English from which language?|Hindi|Italian|Arabic|German"],
    ["English borrows words from many languages. Think about the culture each language comes from, like food, music or travel.", "Look for clues in what the word names. A dance word, a school word, a wave word, a landscape word, a math word, a trip word and a hair-care word each came from a different place.", "Example: <b>sushi</b> came from Japanese, and <b>piano</b> came from Italian. Think about where the thing was first known. Now do yours."],
    [["Borrowed words", "🌍", "English has borrowed thousands of words from other languages. These are called <b>loanwords</b>."], ["Examples", "🗺️", "<b>Pizza</b> (Italian), <b>kindergarten</b> (German), <b>tsunami</b> (Japanese), <b>canyon</b> (Spanish), <b>ballet</b> (French)."], ["More", "➕", "<b>Algebra</b> (Arabic), <b>safari</b> (Swahili), <b>shampoo</b> (Hindi). Looking up a word's origin is called checking its etymology."]]);

  const B14 = mk("Spotting weak arguments", "🕵️", [
    "What is wrong with this argument?<br><br><b>'Everyone is buying this phone, so it must be the best.'</b>|bandwagon|attacking the person|hasty generalization|false either/or",
    "What is wrong with this argument?<br><br><b>'Her plan is bad because she is a goofball.'</b>|attacking the person|bandwagon|hasty generalization|false either/or",
    "What is wrong with this argument?<br><br><b>'I met two rude people from that town, so everyone there is rude.'</b>|hasty generalization|bandwagon|attacking the person|false either/or",
    "What is wrong with this argument?<br><br><b>'Either we ban all games, or kids will never study.'</b>|false either/or|bandwagon|attacking the person|hasty generalization",
    "What is wrong with this argument?<br><br><b>'All the cool kids wear these shoes, so you should too.'</b>|bandwagon|attacking the person|hasty generalization|false either/or",
    "What is wrong with this argument?<br><br><b>'You can't trust his math answer; he is always so messy.'</b>|attacking the person|bandwagon|hasty generalization|false either/or",
    "What is wrong with this argument?<br><br><b>'My cat did not like the new food, so no cats like it.'</b>|hasty generalization|bandwagon|attacking the person|false either/or",
    "What is wrong with this argument?<br><br><b>'We must let the dog sleep on my bed, or lock him outside all night.'</b>|false either/or|bandwagon|attacking the person|hasty generalization"],
    ["Ask whether the speaker gives a real reason, or just a trick to sway you.", "Bandwagon: 'everyone does it'. Attacking the person: insulting the speaker instead of the idea. Hasty generalization: a big claim from too few examples. False either/or: pretending there are only two choices.", "Example: <b>'Because Max is silly, his idea is wrong.'</b> It insults Max and ignores the idea, so it attacks the person. Now do yours."],
    [["Weak reasons", "🕵️", "A <b>logical fallacy</b> is a mistake in reasoning that can fool readers if they are not careful."], ["Four to know", "4️⃣", "<b>Bandwagon</b> (everyone does it), <b>attacking the person</b>, <b>hasty generalization</b> (too few examples), <b>false either/or</b> (only two choices)."], ["Strong writing", "💪", "Use real evidence instead: facts, examples and reasons that apply to the topic."]]);

  const B15 = mk("Loaded words and bias", "⚖️", [
    "Which sentence is neutral and factual?|The team scored two goals.|The team barely stumbled into two lucky goals.|The brilliant team crushed everyone with two goals.",
    "Which word is loaded in this sentence?<br><br><b>The greedy company raised prices.</b>|greedy|company|raised",
    "Which word is loaded in this sentence?<br><br><b>The senator bragged about his bill.</b>|bragged|senator|bill",
    "Which word is loaded in this sentence?<br><br><b>The terrible new rule was announced today.</b>|terrible|rule|today",
    "Which word means 'careful with money' and sounds positive?|thrifty|cheap|stingy",
    "Which word sounds more negative?|nosy|curious|interested",
    "Why do writers sometimes use loaded words?|to push the reader to feel a certain way|to be more exact|to make rhymes",
    "Which sentence is more neutral?|The mayor proposed a new park.|The mayor sneakily pushed a pointless new park.|The mayor's amazing genius park plan is perfect."],
    ["Loaded words carry strong feelings. Which word tells you how to feel, not just what happened?", "A neutral sentence sticks to facts and plain words. A biased one adds opinion words like terrible, sneaky or amazing.", "Example: <b>The lazy dog slept all day.</b> 'Lazy' is a loaded word because it judges the dog. <b>The dog slept all day</b> is neutral. Now do yours."],
    [["Loaded words", "⚖️", "A <b>loaded word</b> carries a strong opinion or feeling: <i>sneaky, brilliant, terrible</i>."], ["Bias", "🧭", "<b>Bias</b> is leaning toward one side. Loaded words can show or hide bias."], ["Be fair", "🤝", "To write fairly, use plain words for facts, and put opinions in clearly marked opinion sentences."]]);

  const B16 = mk("Outlines and notes", "📝", [
    "In an outline about <b>Pets</b>, the main topics are I. Dogs and II. Cats. Which is a good subtopic under I. Dogs?|training tricks|cat toys|fish tanks",
    "Main topic I. Weather. Which fits as a subtopic A.?|Clouds|Volcanoes|Planets",
    "In an outline, what do Roman numerals (I, II, III) usually mark?|main topics|details|page numbers",
    "In an outline, what do capital letters (A, B, C) usually mark?|subtopics|main topics|titles",
    "Which note-taking tip is best?|write key words, not whole sentences|copy every word|write nothing",
    "Which is the best key-word note for: 'The blue whale is the largest animal ever, up to about 100 feet long.'?|blue whale: largest animal, about 100 ft|The blue whale is the largest animal ever|whales are nice",
    "Why make an outline before writing?|to plan the order of ideas|to add extra words|to avoid doing research",
    "Subtopics under the same main topic should be...|related to the main topic and about equally important|about different topics|the longest ideas first"],
    ["Think about what an outline is for: planning the big ideas and then the smaller details under them.", "Main topics get Roman numerals. Subtopics under them get capital letters. Every subtopic must fit under its main topic.", "Example: under <b>I. Fruits</b>, A. Apples and B. Oranges fit, but 'Hammers' does not. Now do yours."],
    [["Plan first", "📝", "An <b>outline</b> lists your main ideas in order, with details under each."], ["The levels", "🪜", "<b>I, II, III</b> = main topics. <b>A, B, C</b> = subtopics under them. Numbers 1, 2, 3 can hold small details."], ["Notes", "🗒️", "When you take notes, write <b>key words</b> and short phrases, not full sentences. Put ideas in your own words."]]);

  const B17 = mk("Revising or editing?", "🔧", [
    "Which step is this?<br><br><b>Adding a missing detail to a paragraph.</b>|revising|editing|prewriting|publishing",
    "Which step is this?<br><br><b>Fixing a spelling mistake.</b>|editing|revising|prewriting|publishing",
    "Which step is this?<br><br><b>Moving a sentence so the order is clearer.</b>|revising|editing|prewriting|publishing",
    "Which step is this?<br><br><b>Adding a missing comma.</b>|editing|revising|prewriting|publishing",
    "Which step is this?<br><br><b>Replacing a weak word with a stronger one.</b>|revising|editing|prewriting|publishing",
    "Which step is this?<br><br><b>Checking capital letters and end marks.</b>|editing|revising|prewriting|publishing",
    "Which step is this?<br><br><b>Sharing your finished piece with the class.</b>|publishing|editing|revising|prewriting",
    "Which step is this?<br><br><b>Making a list of ideas before you start writing.</b>|prewriting|editing|revising|publishing"],
    ["Ask whether the change improves the ideas and organization, or just fixes errors.", "Revising changes ideas, details, order and word choice. Editing fixes spelling, grammar and punctuation. Prewriting comes first and publishing comes last.", "Example: <b>Cutting a sentence that does not fit the topic</b> changes the ideas, so it is revising. <b>Fixing 'recieve' to 'receive'</b> is editing. Now do yours."],
    [["The writing steps", "🔧", "Prewriting → drafting → <b>revising</b> → <b>editing</b> → publishing."], ["Revise the big stuff", "🏗️", "<b>Revising</b> is changing ideas, details, order and word choice to make the writing stronger."], ["Edit the small stuff", "🔍", "<b>Editing</b> is fixing spelling, grammar, capitals and punctuation. Do it after revising."]]);

  const B18 = mk("Theme versus topic", "💎", [
    "Which is a <b>theme</b> (a message)?|Honesty is more valuable than winning.|a school spelling bee|a boy named Leo",
    "A fable shows a tortoise who keeps going and beats a fast hare. Which theme fits?|Slow and steady effort can succeed.|Hares are fast.|Races are on Saturdays.",
    "Which is a topic, not a theme?|friendship|Good friends help each other.|True friends stay loyal.",
    "A girl shares her toys with a new neighbor and they become best friends. Which theme fits?|Kindness builds friendships.|Toys are fun.|Neighbors move often.",
    "How can readers find a story's theme?|think about what the character learns|count the pages|look at the cover color",
    "What is the best way to state a theme?|as a complete sentence message|as one word|as a character's name",
    "A boy tells a lie, gets caught, and loses his friend's trust. Which theme fits?|Lying can break trust.|Boys are sneaky.|Trust is a place.",
    "Which of these is a topic?|courage|Courage can help you face your fears.|Be brave even when you are scared."],
    ["A topic is what the story is about. A theme is what the story says about it. Which choice says something about life?", "A topic is usually one or two words, like friendship. A theme is a full sentence message you could use in real life, like 'Good friends help each other'.", "Example: topic: <b>teamwork</b>. Theme: <b>Teams do more together than alone</b>. The theme tells the lesson. Now do yours."],
    [["Topic", "💎", "The <b>topic</b> is the subject in a word or two: <i>friendship, bravery, honesty</i>."], ["Theme", "📜", "The <b>theme</b> is the message about that topic, a full sentence: <i>Honesty builds trust.</i>"], ["Finding it", "🔎", "Ask: what does the main character learn? What would the author want me to remember?"]]);

  // =============== LEVEL 15 ===============
  const C1 = mk("Adjective and adverb clauses", "🧲", bq("What is the clause in this sentence?", [
    "The book <u>that I borrowed</u> is funny.|adjective clause|adverb clause|main clause",
    "We left <u>because it was late</u>.|adverb clause|adjective clause|main clause",
    "<u>When the bell rang</u>, we lined up.|adverb clause|adjective clause|main clause",
    "The boy <u>whose bike was stolen</u> felt sad.|adjective clause|adverb clause|main clause",
    "The park <u>where we play</u> is huge.|adjective clause|adverb clause|main clause",
    "I smile <u>whenever I see my dog</u>.|adverb clause|adjective clause|main clause",
    "<u>The movie ended</u> before we got popcorn.|main clause|adjective clause|adverb clause",
    "She sings <u>as if nobody is listening</u>.|adverb clause|adjective clause|main clause"]),
    ["Ask what the underlined clause does. Does it describe a noun, tell about the action, or stand alone?", "An adjective clause describes a noun and often starts with who, whose, which, that or where. An adverb clause tells when, why, how or under what condition, and starts with words like because, when, if, whenever. A main clause can stand alone.", "Example: <b>The girl who sings is my cousin.</b> 'Who sings' describes the girl, so it is an adjective clause. <b>I ran because I was late</b>: 'because I was late' tells why, so it is an adverb clause. Now do yours."],
    [["Clauses with jobs", "🧲", "A dependent clause can work like an adjective or an adverb."], ["Adjective clause", "🏷️", "An <b>adjective clause</b> describes a noun: The dog <b>that barked</b> is mine. It starts with who, whose, which, that or where."], ["Adverb clause", "🏃", "An <b>adverb clause</b> tells when, why, how or if: <b>When it rains</b>, we stay in. It starts with because, when, if, although and similar words."]]);

  const C2 = mk("Noun clauses", "📦", bq("Find the <b>noun clause</b>.", [
    "I know that you are right.|that you are right|I know|are right",
    "Tell me what you want.|what you want|Tell me|you",
    "She wondered whether it would snow.|whether it would snow|She wondered|would snow",
    "Whoever finds the key wins a prize.|Whoever finds the key|wins a prize|a prize",
    "We learned how plants make food.|how plants make food|We learned|plants make",
    "That he forgot surprised no one.|That he forgot|surprised no one|no one",
    "I do not know where the cat went.|where the cat went|I do not know|the cat",
    "Her question was why the sky is blue.|why the sky is blue|Her question|was why"]),
    ["A noun clause does a noun's job. Which group of words could be replaced with the word 'it' or 'something'?", "A noun clause has its own subject and verb, but it acts as a subject or object inside the bigger sentence. It often begins with that, what, whether, how, why, where or whoever.", "Example: <b>I know what she said.</b> 'What she said' has a subject and verb and is the thing I know, so it is a noun clause. Now do yours."],
    [["A clause as a noun", "📦", "A <b>noun clause</b> is a dependent clause that does a noun's job, such as subject or object."], ["Starter words", "🚦", "<b>that, what, whether, how, why, where, who, whoever</b>."], ["Replace test", "🔁", "Swap the clause with <b>it</b> or <b>something</b>. <b>I know it.</b> works, so 'what you said' was a noun clause."]]);

  const C3 = mk("Indirect objects", "🎁", bq("Find the <b>indirect object</b> (who receives the direct object).", [
    "Dad gave Mia a book.|Mia|Dad|book",
    "She sent her grandma a card.|grandma|card|She",
    "The teacher handed the students new pencils.|students|teacher|pencils",
    "We bought our cat a toy.|cat|toy|We",
    "Ben showed me his drawing.|me|Ben|drawing",
    "Grandpa told the kids a story.|kids|story|Grandpa",
    "The coach gave the team a pep talk.|team|coach|talk",
    "I made my sister a bracelet.|sister|bracelet|I"]),
    ["Find the verb. Then ask 'what was given or shown?' That is the direct object. Who got it?", "The indirect object answers 'to whom?' or 'for whom?'. It sits between the verb and the direct object.", "Example: <b>Jo lent Sam a pen.</b> The thing lent is 'pen' (direct object). It was lent to Sam, so 'Sam' is the indirect object. Now do yours."],
    [["Two objects", "🎁", "Some verbs take two objects. The <b>direct object</b> is the thing. The <b>indirect object</b> is the one who receives it."], ["Ask the question", "❓", "Ask <b>to whom?</b> or <b>for whom?</b> after the verb: Dad gave <b>Mia</b> a book."], ["Position", "📍", "The indirect object comes before the direct object. If you add 'to' or 'for' (gave a book <i>to</i> Mia), it becomes a prepositional phrase instead."]]);

  const C4 = mk("Tricky subject-verb agreement", "🧮", [
    "Choose the verb.<br><br><b>The team ___ practicing today.</b>|is|are",
    "Choose the verb.<br><br><b>Neither the cat nor the dogs ___ hungry.</b>|are|is",
    "Choose the verb.<br><br><b>Tom and Eli ___ best friends.</b>|are|is",
    "Choose the verb.<br><br><b>There ___ three apples on the table.</b>|are|is",
    "Choose the verb.<br><br><b>The box of pencils ___ on the desk.</b>|is|are",
    "Choose the verb.<br><br><b>Either the twins or Lila ___ going.</b>|is|are",
    "Choose the verb.<br><br><b>My family ___ going to the beach.</b>|is|are",
    "Choose the verb.<br><br><b>The class ___ finishing its test.</b>|is|are"],
    ["Find the real subject. It is not always the word closest to the verb.", "A group noun like team, class or family acts as one unit. In 'there is/are', the subject comes after the verb. With or / nor, match the verb to the subject closest to it. Ignore words in a phrase like 'of pencils'.", "Example: <b>The bag of apples ___ heavy.</b> The subject is 'bag', not 'apples', so the verb is 'is'. Now do yours."],
    [["Find the true subject", "🧮", "Cross out phrases like <b>of the pencils</b> or <b>in the yard</b>. What is left is the subject."], ["Group nouns", "👪", "<b>team, class, family, flock</b> act as one unit, so use a singular verb: The team <b>is</b> ready."], ["Or and nor", "⚖️", "With <b>or / nor</b>, the verb agrees with the subject closest to it. With <b>and</b>, the subject is plural: Tom and Eli <b>are</b>."]]);

  const C5 = mk("Pronouns after than and as", "🔡", [
    "Choose the pronoun.<br><br><b>Ben swims better than ___ do.</b>|I|me",
    "Choose the pronoun.<br><br><b>They are taller than ___ am.</b>|I|me",
    "Choose the pronoun.<br><br><b>My dad runs faster than ___ do.</b>|I|me",
    "Choose the pronoun.<br><br><b>Is she as smart as ___ is?</b>|he|him",
    "Choose the pronoun.<br><br><b>You sing better than ___ can.</b>|they|them",
    "Choose the pronoun.<br><br><b>We worked harder than ___ did.</b>|they|them",
    "Choose the pronoun.<br><br><b>Lena can jump higher than ___ can.</b>|he|him",
    "Choose the pronoun.<br><br><b>Eli paints better than ___ do.</b>|we|us"],
    ["Imagine the sentence continuing after the blank. Is the missing pronoun doing the action or being acted upon?", "After than or as, the pronoun is often the subject of a hidden verb. Finish the sentence in your head with the verb that follows the blank, then choose the subject form.", "Example: <b>She is older than ___ am.</b> Say it fully: 'than ___ am'. You would never say 'me am', so it is 'I'. Now do yours."],
    [["Hidden verbs", "🔡", "After <b>than</b> or <b>as</b>, a verb is often hidden: She is taller than <b>I</b> [am]."], ["Test it", "🧪", "Finish the sentence with the verb. Would you say <i>than I am</i> or <i>than me am</i>? Choose the one that fits the verb."], ["Subject forms", "👤", "Subject pronouns: <b>I, he, she, we, they</b>. Object pronouns: <b>me, him, her, us, them</b>."]]);

  const C6 = mk("Verb moods", "🎚️", bq("Which mood is this?", [
    "Close the door.|imperative mood|indicative mood|subjunctive mood",
    "The door is closed.|indicative mood|imperative mood|subjunctive mood",
    "If I were taller, I could reach the shelf.|subjunctive mood|indicative mood|imperative mood",
    "Please sit down.|imperative mood|indicative mood|subjunctive mood",
    "We walked to school.|indicative mood|imperative mood|subjunctive mood",
    "Be quiet in the library.|imperative mood|indicative mood|subjunctive mood",
    "It is important that she be on time.|subjunctive mood|indicative mood|imperative mood",
    "The sun rises in the east.|indicative mood|imperative mood|subjunctive mood"]),
    ["Think about what the sentence is doing: stating a fact, giving an order, or imagining something that is not true or is needed.", "Indicative states facts or asks questions. Imperative gives a command or request (and the subject 'you' is understood). Subjunctive talks about wishes, what-ifs and demands.", "Example: <b>Wash your hands.</b> It gives a command, so it is imperative. <b>I wish I were a bird</b> imagines something unreal, so it is subjunctive. Now do yours."],
    [["Mood = manner", "🎚️", "The <b>mood</b> of a verb shows how the speaker is using it."], ["Three moods", "3️⃣", "<b>Indicative</b>: facts and questions. <b>Imperative</b>: commands and requests. <b>Subjunctive</b>: wishes, what-ifs and demands."], ["Clues", "🔎", "Subjunctive often uses <b>were</b> (If I <b>were</b>...) or a plain verb like <b>be</b> (that he <b>be</b> on time)."]]);

  const C7 = mk("Why is there a comma?", "🕵️", bq("Why are commas used here?", [
    "We bought apples, pears, and plums.|a list|an introduction|two sentences joined|talking to someone",
    "After lunch, we played soccer.|an introduction|a list|two sentences joined|extra information",
    "I wanted to go, but it rained.|two sentences joined|a list|a date|equal adjectives",
    "Maya, please come here.|talking to someone|an introduction|a list|a date",
    "My cousin, a chef, cooks well.|extra information|a list|two sentences joined|a date",
    "On May 5, 2015, we moved.|a date|a list|an introduction|equal adjectives",
    "It was a cold, windy day.|equal adjectives|a list|a date|talking to someone",
    "Hannah smiled, and everyone cheered.|two sentences joined|a list|extra information|a date"]),
    ["Read the sentence out loud and notice where your voice pauses. What is the pause separating?", "Comma jobs: separate items in a list, set off an opening phrase, join two sentences with a joining word, address a person, set off extra information, split date parts, separate equal adjectives.", "Example: <b>Hello, Sam!</b> The comma separates the name of the person spoken to, so it is for talking to someone. Now do yours."],
    [["Comma jobs", "🕵️", "A comma has several jobs. Know the job and you will know where it goes."], ["Common jobs", "📋", "A <b>list</b>; after an <b>introduction</b>; two sentences joined with <b>and / but / so</b>; <b>talking to someone</b>; <b>extra information</b>; a <b>date</b>; equal <b>adjectives</b>."], ["Do not guess", "🚫", "Do not put a comma just because you breathe. Match each comma to one of its jobs."]]);

  const C8 = mk("Euphemisms", "🎀", [
    "Which is a <b>euphemism</b> (a softer way to say something)?|pre-owned|used|secondhand",
    "'Let go' is a euphemism for...|fired|hired|promoted",
    "Which is a euphemism for 'old person'?|senior citizen|young adult|neighbor",
    "'Restroom' is a gentler way to say...|toilet|kitchen|bedroom",
    "'Fib' is a gentler way to say...|lie|joke|story",
    "'Between jobs' means...|without a job right now|on vacation|getting a raise",
    "Why do people use euphemisms?|to sound softer or more polite|to be more exact|to be rude",
    "Choosing 'economical' instead of 'cheap' is done to...|sound more positive|sound more negative|sound angrier"],
    ["A euphemism is a mild, polite phrase used in place of a harsher one. Which phrase sounds gentler?", "Think about what the plain, direct word would be. A euphemism hides the harshness of the plain word behind friendlier words.", "Example: <b>'Pre-loved'</b> is a euphemism for <b>used</b>, and <b>'vertically challenged'</b> is a joking one for <b>short</b>. Now do yours."],
    [["Softer words", "🎀", "A <b>euphemism</b> is a mild word or phrase used in place of one that sounds harsh or blunt."], ["Examples", "📋", "<b>Pre-owned</b> for used. <b>Let go</b> for fired. <b>Restroom</b> for toilet. <b>Fib</b> for lie."], ["Careful", "⚠️", "Euphemisms can be kind, but they can also hide the truth. Use them to be polite, not to mislead."]]);

  const C9 = mk("Logos, ethos, pathos", "🏛️", [
    "Which appeal is this?<br><br><b>'Studies show test scores rose 15 percent after the program.'</b>|logos (logic)|ethos (trust)|pathos (feeling)",
    "Which appeal is this?<br><br><b>'As a doctor for twenty years, I recommend this.'</b>|ethos (trust)|logos (logic)|pathos (feeling)",
    "Which appeal is this?<br><br><b>'Imagine the sad puppies waiting for a home.'</b>|pathos (feeling)|logos (logic)|ethos (trust)",
    "Which appeal is this?<br><br><b>'If we plant ten trees, we get ten times more shade.'</b>|logos (logic)|ethos (trust)|pathos (feeling)",
    "Which appeal is this?<br><br><b>'You can trust me; I have coached for thirty years.'</b>|ethos (trust)|logos (logic)|pathos (feeling)",
    "Which appeal is this?<br><br><b>'Think of the frightened children who need a safe crossing.'</b>|pathos (feeling)|logos (logic)|ethos (trust)",
    "Which appeal is this?<br><br><b>'The data show litter dropped by 20 percent.'</b>|logos (logic)|ethos (trust)|pathos (feeling)",
    "Which appeal is this?<br><br><b>'As a lifelong firefighter, I know what keeps a town safe.'</b>|ethos (trust)|logos (logic)|pathos (feeling)"],
    ["Ask how the writer is trying to convince you: with facts and reasons, with credibility, or with feelings?", "Logos uses facts, numbers and reasoning. Ethos shows the speaker is trustworthy or an expert. Pathos tugs at emotions like pity, joy or fear.", "Example: <b>'Our school has won five science fairs in a row.'</b> It gives facts, so it is logos. <b>'Picture a child shivering without a coat'</b> is pathos. Now do yours."],
    [["Three ways to persuade", "🏛️", "Ancient Greeks named three appeals: <b>logos</b>, <b>ethos</b> and <b>pathos</b>."], ["Logos and ethos", "🧠", "<b>Logos</b> = logic, facts and numbers. <b>Ethos</b> = trust and expertise: why you should believe the speaker."], ["Pathos", "❤️", "<b>Pathos</b> = feelings. It works on emotions. Good arguments often combine all three, fairly."]]);

  const C10 = mk("Characterization", "🧑‍🎤", [
    "'Ana was a generous girl.' Is this direct or indirect characterization?|direct|indirect",
    "'Ana split her lunch with a new student.' Is this direct or indirect characterization?|indirect|direct",
    "'Mr. Park was a cranky old man.' Is this direct or indirect characterization?|direct|indirect",
    "'Mr. Park slammed his door and grumbled at the mail carrier.' Is this direct or indirect characterization?|indirect|direct",
    "Which line shows Leo is shy through his actions?|Leo hid behind his mom and whispered his name.|Leo was shy.|The narrator says Leo is a shy boy.",
    "'I never back down,' Zoe said, chin high. What does this suggest about Zoe?|she is brave and stubborn|she is sleepy|she is confused",
    "Her hands trembled as she opened the letter. What does this suggest?|she is nervous|she is bored|she is proud",
    "What do we learn about a character through what other characters say about them?|indirect characterization|direct characterization"],
    ["Ask whether the author just tells you the trait, or lets you figure it out from what the character does, says or thinks.", "Direct characterization states the trait in plain words. Indirect characterization shows it through actions, speech, thoughts, looks and how others react.", "Example: <b>'Max was clumsy.'</b> states the trait, so it is direct. <b>Max tripped over his own shoelaces</b> shows it, so it is indirect. Now do yours."],
    [["Telling", "📣", "<b>Direct characterization</b> tells you the trait: <i>Ana was generous.</i>"], ["Showing", "🎭", "<b>Indirect characterization</b> shows the trait through <b>actions, words, thoughts, looks</b> and how others react."], ["Why it matters", "💡", "Showing makes characters feel real. Readers enjoy working out a character's personality from clues."]]);

  const C11 = mk("Kinds of conflict", "⚔️", [
    "What kind of conflict is this?<br><br><b>A girl fights her fear of speaking on stage.</b>|person vs. self|person vs. person|person vs. nature|person vs. society",
    "What kind of conflict is this?<br><br><b>Two brothers argue over who gets the last slice.</b>|person vs. person|person vs. self|person vs. nature|person vs. society",
    "What kind of conflict is this?<br><br><b>A hiker is caught in a blizzard.</b>|person vs. nature|person vs. self|person vs. person|person vs. society",
    "What kind of conflict is this?<br><br><b>A student challenges an unfair school rule.</b>|person vs. society|person vs. self|person vs. person|person vs. nature",
    "What kind of conflict is this?<br><br><b>A boy cannot decide whether to tell the truth.</b>|person vs. self|person vs. person|person vs. nature|person vs. society",
    "What kind of conflict is this?<br><br><b>Sailors race to cross a stormy sea.</b>|person vs. nature|person vs. self|person vs. person|person vs. society",
    "What kind of conflict is this?<br><br><b>A detective faces a clever thief.</b>|person vs. person|person vs. self|person vs. nature|person vs. society",
    "What kind of conflict is this?<br><br><b>A town protests an unfair law.</b>|person vs. society|person vs. self|person vs. person|person vs. nature"],
    ["Ask who or what is on the other side of the problem: another character, the character's own mind, the weather or land, or the rules of a group?", "Person vs. person is a fight with another character. Person vs. self is an inner struggle. Person vs. nature is a fight with weather or wild places. Person vs. society is a fight with rules or a group.", "Example: <b>A pilot battles a storm in the sky.</b> The opponent is the weather, so it is person vs. nature. Now do yours."],
    [["Every story has one", "⚔️", "A <b>conflict</b> is the main struggle in a story. It pushes the plot forward."], ["Outside conflicts", "🌪️", "<b>Person vs. person</b>, <b>person vs. nature</b> and <b>person vs. society</b> all come from outside the character."], ["Inside conflict", "🧠", "<b>Person vs. self</b> happens inside the character's mind, like a hard choice or a big fear."]]);

  const C12 = mk("Summary and scene", "🎬", [
    "Which sentence slows the moment down and adds detail?|My heart pounded as I crept up one creaky stair at a time.|I went upstairs.|Later, I was upstairs.",
    "To move quickly through a boring stretch of time, a writer can use...|summary|a long scene|extra dialogue",
    "Which uses a short sentence to build tension?|The door opened. Silence.|The door was opened by someone eventually.|The door happened to be open.",
    "Which is a summary?|Over the next week, they packed boxes and said goodbye.|She lifted the box, felt its weight, and set it by the door.|'Ready?' asked Dad.",
    "Which part of a story deserves a detailed scene?|the big moment|the boring ride|the lunch break",
    "Which stretches a moment?|Seconds crawled by. The clock ticked. Her pencil hovered.|The test was long.|She finished.",
    "Short, choppy sentences usually make a story feel...|faster and more tense|slower and sleepy|more formal",
    "'Years passed.' is an example of...|summary|a scene|dialogue"],
    ["Think about pace. Is the writer zooming in on a moment, or flying past time?", "A scene slows down with detail, senses and dialogue. A summary covers a lot of time in a few words. Short sentences speed things up.", "Example: <b>The summer went by quickly.</b> Covers months in one line: summary. <b>I dipped my toe in the icy lake and gasped</b> lingers on one moment: scene. Now do yours."],
    [["Pace", "🎬", "<b>Pace</b> is how fast or slow a story feels."], ["Scene", "🔍", "A <b>scene</b> zooms in with details, senses and dialogue. Use it for important moments."], ["Summary", "⏩", "A <b>summary</b> covers time quickly: <i>Years passed.</i> Use it for less important stretches. Short sentences speed up, long ones slow down."]]);

  const C13 = mk("Strong claims", "📣", [
    "Which statement can be argued (a claim)?|School should start later.|The school has 400 students.|Schools open in the fall.",
    "Which is a fact, not a claim?|Water boils at 100 degrees Celsius at sea level.|Winter is the best season.|Homework should be banned.",
    "Which is an arguable claim?|Every town needs a bike lane.|The library opens at nine.|Bikes have two wheels.",
    "A strong claim is...|specific and open to debate|obviously true for everyone|a question",
    "Which claim is more specific?|Our school should recycle paper and cans in every hallway.|Recycling is good.|We should do stuff.",
    "Which is NOT a claim?|The earth orbits the sun.|Cats make better pets than dogs.|Video games should count as exercise.",
    "Which question could lead to a good claim?|Should students help choose the school lunch menu?|What time is lunch?|How many desks are in the room?",
    "Which claim is too vague?|Things should change.|Our class should adopt a class pet.|Recess should be thirty minutes long."],
    ["A claim is a statement that people could reasonably agree or disagree with. Could someone argue against this?", "A fact can be checked and has nothing to debate. A claim takes a side. A strong claim is clear and specific about who should do what.", "Example: <b>Our town should build a skate park.</b> People could disagree, and it is specific, so it is a good claim. <b>Skateboards have wheels</b> is only a fact. Now do yours."],
    [["What is a claim?", "📣", "A <b>claim</b> is the main point you argue for. It takes a side that others could disagree with."], ["Claim vs fact", "⚖️", "A <b>fact</b> can be proven: Water freezes at 0 degrees Celsius. A <b>claim</b> needs reasons and evidence: Our school needs a garden."], ["Make it strong", "💪", "Be specific: say <b>who</b> should do <b>what</b>. 'Recycling is good' is weak; 'Our school should add recycling bins' is strong."]]);

  const C14 = mk("Kinds of evidence", "🔬", [
    "What type of evidence is this?<br><br><b>'According to a pediatrician, sleep helps kids grow.'</b>|expert opinion|statistic|example|personal story",
    "What type of evidence is this?<br><br><b>'A survey found 80 percent of students prefer later start times.'</b>|statistic|expert opinion|example|personal story",
    "What type of evidence is this?<br><br><b>'For instance, Maple Middle School added a reading hour and saw better grades.'</b>|example|statistic|expert opinion|personal story",
    "What type of evidence is this?<br><br><b>'Last year, my cousin skipped breakfast and felt dizzy all day.'</b>|personal story|statistic|expert opinion|example",
    "Which type of evidence uses numbers?|statistic|personal story|expert opinion",
    "Which evidence is strongest for a science claim?|data from many experiments|a rumor|one friend's guess",
    "What type of evidence is this?<br><br><b>'Dr. Rivera, a marine biologist, explains that coral needs warm, clear water.'</b>|expert opinion|statistic|example|personal story",
    "What type of evidence is this?<br><br><b>'The library's records show 500 more books were borrowed this year.'</b>|statistic|expert opinion|example|personal story"],
    ["Look at where the evidence comes from: numbers, a specialist, a case, or someone's own experience.", "A statistic uses numbers or data. An expert opinion comes from a person trained in the field. An example is a specific case. A personal story is something that happened to one person.", "Example: <b>'Nine out of ten voters chose the park.'</b> It uses numbers, so it is a statistic. <b>'A chef says fresh herbs matter'</b> is expert opinion. Now do yours."],
    [["Support your claim", "🔬", "<b>Evidence</b> is the proof that backs up a claim. Strong writers use more than one kind."], ["Kinds", "📋", "<b>Statistic</b> (numbers), <b>expert opinion</b>, <b>example</b> (a real case), <b>personal story</b> (an anecdote)."], ["Which is strongest?", "💪", "Data and expert sources are usually strongest. A personal story is vivid but only shows one case."]]);

  const C15 = mk("Signal phrases for quotes", "📎", [
    "What is a signal phrase?|words that tell who said or wrote a quote|the last sentence of an essay|a title",
    "Which introduces the quote with a signal phrase?|As Dr. Lee explains, 'Reading builds vocabulary.'|'Reading builds vocabulary.'|Reading builds vocabulary quote.",
    "Which verb is strongest in a signal phrase when a writer argues a point?|argues|says|goes",
    "In 'The author states ___ 'Dogs are loyal.'' what goes in the blank before the quotation mark?|a comma|a period|a question mark",
    "After a quote, what should a writer do next?|explain what it means|add another quote right away|change topic",
    "Which verb shows disagreement?|disputes|notes|adds",
    "Which introduction is best for a quote from an expert?|Marine biologist Dr. Ruiz explains, 'Coral reefs protect coasts.'|Somebody said, 'Coral reefs protect coasts.'|'Coral reefs protect coasts.' It said.",
    "Which verb is the most neutral?|states|screams|brags"],
    ["A quote should never just appear alone. Think about what the reader needs: who is speaking and what the writer thinks of it.", "A signal phrase names the source and uses a verb to show how the source speaks. After a short phrase like 'she states', put a comma before the quote. After the quote, explain why it matters.", "Example: <b>Historian Ana Cruz notes, 'Roads helped trade grow.'</b> It names the source, uses a verb, and a comma leads into the quote. Now do yours."],
    [["Introduce quotes", "📎", "A <b>signal phrase</b> tells readers who said it: <i>According to the author,</i> or <i>As Dr. Lee explains,</i>"], ["Choose the verb", "🎯", "Neutral: states, notes, writes. Strong: argues, insists. Disagreeing: disputes, denies. Pick the verb that fits."], ["Explain after", "💬", "Do not leave a quote alone. Add a sentence saying what it proves."]]);

  const C16 = mk("Word families", "🌳", [
    "Which word belongs to the same family as <b>act</b>?|action|aunt|apt",
    "Which word belongs to the same family as <b>govern</b>?|government|goblin|garment",
    "Which word belongs to the same family as <b>nation</b>?|national|notion|nature",
    "Which word belongs to the same family as <b>photo</b>?|photograph|telephone|phase",
    "Which word belongs to the same family as <b>produce</b>?|production|prudent|proceed",
    "Which word belongs to the same family as <b>decide</b>?|decision|decorate|deck",
    "Which word belongs to the same family as <b>science</b>?|scientist|silence|sense",
    "Which word belongs to the same family as <b>create</b>?|creative|crate|cream"],
    ["Words in a family share a root and a related meaning. Look for the same core spelling and meaning.", "Do not choose a word that only looks or sounds close. The related word should have a meaning connected to the original, like 'make' to 'maker'.", "Example: <b>music</b> goes with <b>musician</b> (both about music), not with <b>muscle</b>, which only looks similar. Now do yours."],
    [["Same root", "🌳", "A <b>word family</b> is a group of words built on the same root: <b>act, action, active, actor</b>."], ["Look and meaning", "🔎", "Related words share both letters and meaning. <b>Create</b> and <b>creative</b> are related. <b>Create</b> and <b>crate</b> are not."], ["Use families", "🧰", "If you know one word in a family, you can guess the meaning of the others."]]);

  const C17 = mk("Story genres", "📚", [
    "Which genre is this?<br><br><b>A story with dragons, wizards and magic spells.</b>|fantasy|science fiction|mystery|historical fiction",
    "Which genre is this?<br><br><b>A story set on a spaceship in the year 3000 with robots.</b>|science fiction|fantasy|mystery|realistic fiction",
    "Which genre is this?<br><br><b>A story about a girl on a covered wagon trip in the 1800s.</b>|historical fiction|science fiction|fantasy|mystery",
    "Which genre is this?<br><br><b>A detective follows clues to find who took the missing cup.</b>|mystery|fantasy|realistic fiction|science fiction",
    "Which genre is this?<br><br><b>A short tale with talking animals that ends with a moral.</b>|fable|mystery|science fiction|historical fiction",
    "Which genre is this?<br><br><b>A story about a student starting at a new school, with no magic.</b>|realistic fiction|fantasy|science fiction|fable",
    "Which genre is this?<br><br><b>A story about a time machine built by a scientist.</b>|science fiction|fantasy|mystery|fable",
    "Which genre is this?<br><br><b>A tale where a fairy grants three wishes.</b>|fantasy|science fiction|historical fiction|mystery"],
    ["Think about the setting and what makes the story special: magic, science, the past, a puzzle, or everyday life.", "Fantasy has magic. Science fiction has science and technology of the future. Historical fiction is set in the past. Mystery has a puzzle to solve. Realistic fiction could happen today. A fable teaches a moral.", "Example: <b>A boy finds a hidden map and follows clues to a thief.</b> The main thing is a puzzle, so it is a mystery. Now do yours."],
    [["Kinds of stories", "📚", "A <b>genre</b> is a category of stories that share features."], ["Common genres", "📋", "<b>Fantasy</b> (magic), <b>science fiction</b> (science and future), <b>mystery</b> (clues), <b>historical fiction</b> (the past)."], ["More", "➕", "<b>Realistic fiction</b> could happen in real life. A <b>fable</b> is a short story, often with animals, that teaches a lesson."]]);

  const C18 = mk("Rhetorical devices", "📢", [
    "Which device is this?<br><br><b>Who wouldn't want cleaner parks?</b>|rhetorical question|repetition|parallelism|direct address",
    "Which device is this?<br><br><b>You deserve a safe place to play.</b>|direct address|rhetorical question|repetition|parallelism",
    "Which device is this?<br><br><b>She dances to relax, paints to dream, and sings to heal.</b>|parallelism|rhetorical question|repetition|direct address",
    "Which device is this?<br><br><b>Never, never, never give up.</b>|repetition|rhetorical question|parallelism|direct address",
    "Which device is this?<br><br><b>Isn't it time we all recycled?</b>|rhetorical question|repetition|parallelism|direct address",
    "Which device is this?<br><br><b>Friends, neighbors, fellow students: join me.</b>|direct address|rhetorical question|repetition|parallelism",
    "Which device is this?<br><br><b>He ran down the hill, swam across the lake, and climbed up the cliff.</b>|parallelism|rhetorical question|repetition|direct address",
    "Which device is this?<br><br><b>Run, run, run as fast as you can!</b>|repetition|rhetorical question|parallelism|direct address"],
    ["Look at how the sentence is built. Does it ask a question that needs no answer, repeat a word, repeat a pattern, or speak straight to the reader?", "A rhetorical question is asked for effect. Repetition repeats the same word. Parallelism repeats the same grammar pattern with different words. Direct address talks to 'you' or to a group.", "Example: <b>Can anyone really say no to ice cream?</b> asks a question with an obvious answer: rhetorical question. Now do yours."],
    [["Speaking with power", "📢", "Speakers and writers use <b>rhetorical devices</b> to make their words stick and persuade."], ["Four devices", "4️⃣", "<b>Rhetorical question</b>, <b>repetition</b> of a word, <b>parallelism</b> (same pattern), and <b>direct address</b> to the audience."], ["Use sparingly", "🧂", "A device works best when used on purpose, at a key moment, not in every sentence."]]);

  Object.assign(WRITING_LEVELS, {
    13: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
      MIX("Mixed practice", A1, A3, A4, A6, A8, A10), MIX("Level 13 Challenge", A2, A5, A7, A9, A11, A12, A13, A14, A15, A16, A17, A18)],
    14: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
      MIX("Mixed practice", B1, B2, B4, B5, B8, B10), MIX("Level 14 Challenge", B3, B6, B7, B9, B11, B12, B13, B14, B15, B16, B17, B18)],
    15: [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
      MIX("Mixed practice", C1, C2, C3, C4, C5, C6), MIX("Level 15 Challenge", C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18)]
  });
})();
