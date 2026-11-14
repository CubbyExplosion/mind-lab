// Mind Lab Music, levels 4-6 (extension file). 20 lessons per level.
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  // L(title, slides[[h,v,t]x3], items[[q, answer, [wrong...], visual?, clue?]], nudge, recapClue)
  const L = (title, slides, items, nudge, clue) => {
    const make = () => {
      const [q, a, w, v, c] = pick(items);
      const ex = pick(items.filter(x => x[1] !== a && !nz(x[0]).includes(nz(a))).concat(items.filter(x => x[1] !== a)));
      return {
        text: q, visual: v || undefined, choices: shuf([a, ...shuf(w).slice(0, 2)]), answer: a,
        hints: [nudge, c || clue, `Example: ${ex[0]} The answer is "${ex[1]}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(S);
    return { title, make };
  };
  const F = (title, slides, fn) => { const make = () => fn(); make.teach = () => slides.map(S); return { title, make }; };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of the ideas, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };
  const LET = ["A", "B", "C", "D", "E", "F", "G"];
  const numTxt = n => ({ 1: "1", 1.5: "1 and a half", 2: "2", 3: "3", 4: "4" }[n] || String(n));

  // ======================= LEVEL 4 =======================
  const l4 = [
    L("Time signatures", [
      ["Two numbers", "4/4", "At the start of a song you see two numbers. This is the <b>time signature</b>."],
      ["The top number", "1 2 3 4", "The <b>top number</b> tells how many beats are in each measure. 4/4 counts 1-2-3-4."],
      ["Waltz time", "💃 3/4", "3/4 counts 1-2-3, like a waltz. 2/4 counts 1-2, like a march."]
    ], [
      ["In 4/4 time, how many beats are in each measure?", "4", ["3", "2"]],
      ["In 3/4 time, how many beats are in each measure?", "3", ["4", "2"]],
      ["In 2/4 time, how many beats are in each measure?", "2", ["3", "4"]],
      ["What does the top number of a time signature tell us?", "How many beats in a measure", ["How loud to play", "The name of the song"]],
      ["Which time signature is used for a waltz, counting in threes?", "3/4", ["4/4", "2/4"], "💃"],
      ["A song counts 1-2-3-4, 1-2-3-4. Which time signature is it?", "4/4", ["3/4", "2/4"]],
      ["A song counts 1-2, 1-2. Which time signature is it?", "2/4", ["4/4", "3/4"]],
      ["Where do you find the time signature?", "At the start of the music", ["At the very end", "On the cover only"]]
    ], "Look at the top number. It is the number of beats in one measure.", "Top number = beats in each measure. A waltz counts in threes. A march counts in twos."),

    L("Bar lines and measures", [
      ["Measures", "| 1 2 3 4 |", "Music is split into small boxes called <b>measures</b>. Each one holds the same number of beats."],
      ["Bar lines", "🚧", "A <b>bar line</b> is the straight line that separates one measure from the next."],
      ["The end", "||", "A thick <b>double bar line</b> at the end means the song is finished."]
    ], [
      ["What do we call the small boxes of music?", "Measures", ["Clefs", "Rests"]],
      ["What separates one measure from the next?", "A bar line", ["A clef", "A flat"]],
      ["What does a thick double bar line at the end mean?", "The music is over", ["Play it louder", "Start again"]],
      ["Every measure in 4/4 time holds how many beats?", "4", ["2", "6"]],
      ["Every measure in 3/4 time holds how many beats?", "3", ["4", "1"]],
      ["Bar lines help us...", "count the beats in groups", ["change the key", "make the music loud"]],
      ["Two quarter notes and a half note fill a 4/4 measure. How many beats is that?", "4", ["3", "5"]],
      ["Does every measure in a song have the same number of beats?", "Yes", ["No", "Only the first one"]]
    ], "A measure is a group of beats. Bar lines are the walls between the groups.", "Measures are separated by bar lines. A thick double bar line means the end.")  ,

    L("Lines of the treble staff", [
      ["Five lines", "𝄞", "Notes on the <b>lines</b> of the treble staff, from the bottom up, are <b>E G B D F</b>."],
      ["A sentence helps", "🧠", "Remember it with: <b>E</b>very <b>G</b>ood <b>B</b>oy <b>D</b>oes <b>F</b>ine."],
      ["Count up", "1 2 3 4 5", "Count the lines from the bottom: line 1 is E, line 2 is G, and so on."]
    ], [
      ["Which note sits on the bottom line of the treble staff?", "E", ["G", "F"], "🎼"],
      ["Which note sits on the 2nd line from the bottom?", "G", ["E", "D"], "🎼"],
      ["Which note sits on the middle (3rd) line?", "B", ["D", "F"], "🎼"],
      ["Which note sits on the 4th line?", "D", ["B", "G"], "🎼"],
      ["Which note sits on the top line?", "F", ["E", "B"], "🎼"],
      ["Which sentence helps you remember the treble lines?", "Every Good Boy Does Fine", ["All Cows Eat Grass", "Good Boys Do Fine Always"]],
      ["In Every Good Boy Does Fine, the word Boy is for which note?", "B", ["E", "D"]],
      ["How many lines are on a staff?", "5", ["4", "6"]]
    ], "Count the lines from the bottom, and use the sentence Every Good Boy Does Fine.", "Lines from bottom to top are E G B D F. The sentence is Every Good Boy Does Fine."),

    L("Spaces of the treble staff", [
      ["Four spaces", "𝄞", "The notes in the <b>spaces</b> of the treble staff, from the bottom up, are <b>F A C E</b>."],
      ["It spells a word!", "FACE", "F-A-C-E spells <b>FACE</b>. That makes it easy to remember."],
      ["Count up", "1 2 3 4", "The first space (bottom) is F, then A, then C, and the top space is E."]
    ], [
      ["Which note is in the bottom space of the treble staff?", "F", ["A", "E"], "🎼"],
      ["Which note is in the 2nd space?", "A", ["F", "C"], "🎼"],
      ["Which note is in the 3rd space?", "C", ["E", "A"], "🎼"],
      ["Which note is in the top space?", "E", ["F", "C"], "🎼"],
      ["The spaces of the treble staff spell what word?", "FACE", ["BEAD", "CAGE"]],
      ["How many spaces are in the staff?", "4", ["5", "3"]],
      ["Is the note A on a line or in a space?", "A space", ["A line", "Neither"]],
      ["Is the note G on a line or in a space?", "A line", ["A space", "Neither"]]
    ], "Remember the word FACE and count the spaces from the bottom.", "Spaces from bottom to top: F A C E. They spell the word FACE."),

    L("Middle C", [
      ["Home base", "🎹", "<b>Middle C</b> is a note near the middle of the piano. It is a good starting place."],
      ["Find it", "⬛⬛", "Middle C is the white key just to the <b>left</b> of the group of <b>two</b> black keys."],
      ["On paper", "➖", "In treble clef, middle C sits on a little extra line <b>below</b> the staff."]
    ], [
      ["What is the name of the note near the middle of the piano that starts our learning?", "Middle C", ["Middle A", "Middle G"], "🎹"],
      ["Middle C is just left of a group of how many black keys?", "Two", ["Three", "Five"], "🎹"],
      ["What letter name does middle C have?", "C", ["B", "D"]],
      ["Which note is just above middle C?", "D", ["B", "E"]],
      ["Which note is just below middle C?", "B", ["D", "A"]],
      ["Notes get higher as you go to the ___ on a piano.", "right", ["left", "back"], "🎹"],
      ["In treble clef, where does middle C sit?", "On a small line below the staff", ["On the top line", "On the third space"]],
      ["Is middle C a high note or a middle note?", "A middle note", ["The highest note", "The lowest note"]]
    ], "Use the black keys as landmarks. Look for the group of two.", "Middle C is left of the two black keys. Right on the piano means higher."),

    L("Sharps and flats", [
      ["Sharp", "♯", "A <b>sharp</b> (♯) makes a note a little <b>higher</b>."],
      ["Flat", "♭", "A <b>flat</b> (♭) makes a note a little <b>lower</b>."],
      ["Natural", "♮", "A <b>natural</b> (♮) cancels a sharp or flat and goes back to the normal note."]
    ], [
      ["What does a sharp do to a note?", "Makes it a little higher", ["Makes it a little lower", "Makes it silent"], "♯"],
      ["What does a flat do to a note?", "Makes it a little lower", ["Makes it a little higher", "Makes it louder"], "♭"],
      ["What does a natural sign do?", "Cancels a sharp or flat", ["Makes the note longer", "Makes it louder"], "♮"],
      ["What is the name of this symbol: ♯ ?", "Sharp", ["Flat", "Natural"]],
      ["What is the name of this symbol: ♭ ?", "Flat", ["Sharp", "Natural"]],
      ["What is the name of this symbol: ♮ ?", "Natural", ["Sharp", "Flat"]],
      ["Is F sharp higher or lower than F?", "Higher", ["Lower", "The same"]],
      ["Is B flat higher or lower than B?", "Lower", ["Higher", "The same"]]
    ], "Think about the shape: a sharp is pointy and goes up, a flat goes down.", "Sharp = higher. Flat = lower. Natural = back to normal."),

    L("The dotted half note", [
      ["A dot adds time", "𝅗𝅥.", "A <b>dot</b> after a note makes it longer. It adds <b>half</b> of the note's length."],
      ["Do the math", "2 + 1 = 3", "A half note is 2 beats. Half of 2 is 1. So a <b>dotted half note</b> is 3 beats."],
      ["Fits 3/4", "3/4", "A dotted half note fills a whole measure in 3/4 time."]
    ], [
      ["How many beats does a dotted half note get?", "3", ["2", "4"]],
      ["How many beats does a half note get?", "2", ["3", "1"]],
      ["A dot adds how much of a note's length?", "Half", ["Double", "None"]],
      ["A dotted half note plus a quarter note is how many beats?", "4", ["3", "5"]],
      ["Which note fills a whole measure of 3/4?", "A dotted half note", ["A half note", "A quarter note"]],
      ["A half note plus a dot is the same as a half note plus a...", "quarter note", ["whole note", "half note"]],
      ["Which lasts longer, a half note or a dotted half note?", "The dotted half note", ["The half note", "They are the same"]],
      ["A dotted half note plus a quarter rest is how many beats?", "4", ["3", "2"]]
    ], "A dot makes the note longer. Add half of the note's beats.", "Half note = 2 beats. The dot adds 1 more. So the total is 2 + 1."),

    L("Pairs of eighth notes", [
      ["Eighth notes", "♫", "<b>Eighth notes</b> are quick. Two eighth notes together fit in <b>one beat</b>."],
      ["Joined by a beam", "♫", "A line called a <b>beam</b> joins them. We say them as <b>ti-ti</b>."],
      ["Count them", "1 + 1", "One beat = 1 quarter note = 2 eighth notes."]
    ], [
      ["How many eighth notes fit in one beat?", "2", ["1", "4"]],
      ["How many eighth notes fit in 2 beats?", "4", ["2", "8"]],
      ["How many eighth notes fit in 4 beats?", "8", ["4", "2"]],
      ["What do we say for two eighth notes in a rhythm?", "ti-ti", ["ta", "sh"], "♫"],
      ["What joins eighth notes together?", "A beam", ["A sharp", "A clef"]],
      ["Which are faster, quarter notes or eighth notes?", "Eighth notes", ["Quarter notes", "They are the same"]],
      ["Two eighth notes last as long as one...", "quarter note", ["half note", "whole note"]],
      ["A ta is one quarter note. How many beats is it?", "1", ["2", "1 and a half"]]
    ], "An eighth note is half as long as a quarter note.", "Two eighth notes = one beat = one quarter note."),

    L("Loud and soft signs", [
      ["Piano and forte", "p f", "<b>Piano (p)</b> means play <b>soft</b>. <b>Forte (f)</b> means play <b>loud</b>."],
      ["In between", "mp mf", "<b>Mezzo</b> means medium. mp is medium soft. mf is medium loud."],
      ["Very!", "pp ff", "<b>Pianissimo (pp)</b> is very soft. <b>Fortissimo (ff)</b> is very loud."]
    ], [
      ["What does piano (p) mean?", "Soft", ["Loud", "Fast"]],
      ["What does forte (f) mean?", "Loud", ["Soft", "Slow"]],
      ["What does mezzo mean?", "Medium", ["Very", "Fast"]],
      ["What does pp (pianissimo) mean?", "Very soft", ["Very loud", "Medium"]],
      ["What does ff (fortissimo) mean?", "Very loud", ["Very soft", "Medium"]],
      ["Which sign is the loudest?", "ff", ["mf", "p"]],
      ["Which sign is the softest?", "pp", ["mp", "f"]],
      ["Which sign means medium loud?", "mf", ["mp", "pp"]]
    ], "The letter f is for forte and p is for piano. Doubling a letter means very.", "p = soft, f = loud, mezzo = medium, doubled = very."),

    L("Slowing down and speeding up", [
      ["Changing speed", "🐢 🐇", "Composers can change the tempo in the middle of a song."],
      ["Words", "rit. accel.", "<b>Ritardando</b> (rit.) means gradually getting slower. <b>Accelerando</b> (accel.) means gradually getting faster."],
      ["Hold it", "𝄐", "A <b>fermata</b> tells you to hold a note longer than normal."]
    ], [
      ["What does ritardando mean?", "Gradually slower", ["Gradually faster", "Gradually louder"], "🐢"],
      ["What does accelerando mean?", "Gradually faster", ["Gradually slower", "Gradually softer"], "🐇"],
      ["What does a fermata tell you to do?", "Hold the note longer", ["Play it softer", "Skip the note"]],
      ["What does 'a tempo' mean?", "Go back to the normal speed", ["Stop playing", "Play louder"]],
      ["Which word means to speed up little by little?", "Accelerando", ["Ritardando", "Fermata"]],
      ["Which word means to slow down little by little?", "Ritardando", ["Accelerando", "Fermata"]],
      ["A song ends with rit. How do the last notes sound?", "Slower and slower", ["Faster and faster", "Louder and louder"]],
      ["A car speeds up. Which music word is like that?", "Accelerando", ["Ritardando", "Fermata"], "🚗"]
    ], "Think of a car speeding up or slowing down.", "Rit. = slower. Accel. = faster. Fermata = hold. A tempo = back to normal."),

    L("Repeat signs", [
      ["Play it again", "𝄇", "Two dots next to a double bar line is a <b>repeat sign</b>. Play that part again."],
      ["D.C.", "D.C.", "<b>D.C.</b> (da capo) means go back to the very beginning."],
      ["Fine", "Fine", "<b>Fine</b> (say FEE-nay) means the end."]
    ], [
      ["What does a repeat sign tell you?", "Play that part again", ["Stop playing", "Play louder"]],
      ["What does D.C. (da capo) mean?", "Go back to the beginning", ["Play softer", "Skip ahead"]],
      ["What does Fine mean in music?", "The end", ["Very good", "Fast"]],
      ["A section is played, then repeated once. How many times is it played in all?", "2", ["1", "3"]],
      ["Why do composers use repeat signs?", "To save space on the page", ["To make music louder", "To hide notes"]],
      ["Which sign has two dots by a double bar?", "Repeat sign", ["Fermata", "Sharp"]],
      ["If the music says D.C. al Fine, where do you stop?", "At the word Fine", ["At the start", "In the middle"]],
      ["Which means 'from the beginning'?", "Da capo", ["Fine", "Piano"]]
    ], "Repeat signs are directions that say where to go next.", "Repeat sign = play again. D.C. = back to the start. Fine = the end."),

    L("Melody and harmony", [
      ["Melody", "🎤", "The <b>melody</b> is the tune. It is the part you sing or hum."],
      ["Harmony", "🎹", "<b>Harmony</b> is notes played at the same time that support the melody."],
      ["Accompaniment", "🎸", "The <b>accompaniment</b> is the music that goes along with the singer or the tune."]
    ], [
      ["What is the tune you hum called?", "Melody", ["Harmony", "Silence"]],
      ["What do we call notes that go along with a melody and sound good together?", "Harmony", ["Melody", "Rest"]],
      ["A guitar strums chords behind a singer. This is the...", "accompaniment", ["melody", "lyrics"], "🎸"],
      ["Which one do you usually sing along with?", "The melody", ["The bass line", "The page number"]],
      ["Two notes played together at the same time make...", "harmony", ["melody", "a rest"]],
      ["Notes played one at a time, making a tune, is a...", "melody", ["chord", "harmony"]],
      ["A pianist plays the tune with one hand and chords with the other. The chords are the...", "accompaniment", ["melody", "title"], "🎹"],
      ["Which describes harmony?", "Notes that sound together", ["Notes that sound one after another", "Silence between notes"]]
    ], "Melody is the tune. Harmony and accompaniment support it.", "Melody = the tune. Harmony = notes together. Accompaniment = the music behind the tune."),

    L("Tuned and untuned percussion", [
      ["Hit it!", "🥁", "<b>Percussion</b> instruments are played by hitting, shaking or scraping."],
      ["Tuned", "🎹", "<b>Tuned</b> percussion plays real notes: xylophone, glockenspiel, marimba and timpani."],
      ["Untuned", "🔔", "<b>Untuned</b> percussion has no exact note: triangle, cymbals, tambourine, snare drum and castanets."]
    ], [
      ["Which of these is tuned percussion?", "Xylophone", ["Tambourine", "Cymbals"], "🎼"],
      ["Which of these is untuned percussion?", "Triangle", ["Xylophone", "Marimba"]],
      ["How are percussion instruments played?", "Hit, shaken or scraped", ["Only blown", "Only plucked"]],
      ["Which of these plays real notes?", "Glockenspiel", ["Castanets", "Tambourine"]],
      ["Which of these has no exact note?", "Cymbals", ["Xylophone", "Marimba"]],
      ["You shake it and the jingles ring. It is a...", "tambourine", ["xylophone", "marimba"], "🪘"],
      ["Which tuned percussion has wooden bars and a deep warm sound?", "Marimba", ["Triangle", "Cymbals"]],
      ["Which instrument is a big drum that can play a tuned note in the orchestra?", "Timpani", ["Triangle", "Castanets"]]
    ], "Ask: can it play a certain note, like do or re? If yes, it is tuned.", "Tuned: xylophone, marimba, glockenspiel, timpani. Untuned: triangle, cymbals, tambourine, snare, castanets."),

    L("Keyboard instruments", [
      ["The piano", "🎹", "A <b>piano</b> has 88 keys. Pressing a key makes a little hammer hit a string inside."],
      ["The organ", "⛪", "An <b>organ</b> sends air through pipes. Big church organs can have thousands of pipes."],
      ["Electronic", "🎛️", "A <b>synthesizer</b> makes sounds electronically. An <b>accordion</b> has keys and a squeezing bellows."]
    ], [
      ["How many keys does a full piano have?", "88", ["52", "100"], "🎹"],
      ["What hits the strings inside a piano?", "Hammers", ["Fingers", "Bows"]],
      ["Which keyboard instrument uses air and pipes?", "Organ", ["Piano", "Drum"]],
      ["Which instrument makes its sounds electronically?", "Synthesizer", ["Organ", "Violin"], "🎛️"],
      ["Which instrument has keys and a bellows you squeeze?", "Accordion", ["Flute", "Xylophone"]],
      ["Piano keys come in two colors. What are they?", "White and black", ["Red and blue", "Gold and green"]],
      ["Do piano keys on the right make higher or lower notes?", "Higher", ["Lower", "The same"]],
      ["Which one is NOT a keyboard instrument?", "Trumpet", ["Piano", "Organ"], "🎺"]
    ], "Think about what is inside each instrument that makes the sound.", "Piano: hammers on strings, 88 keys. Organ: air through pipes. Synthesizer: electronic. Accordion: bellows."),

    L("Instruments around the world", [
      ["Many places", "🌍", "Every part of the world has special instruments that go with its music."],
      ["Some examples", "🪘", "The <b>didgeridoo</b> is from Australia. <b>Bagpipes</b> are loved in Scotland. The <b>sitar</b> is from India."],
      ["More", "🥁", "The <b>djembe</b> drum is from West Africa. <b>Steel drums</b> come from Trinidad. The <b>koto</b> is from Japan."]
    ], [
      ["Where does the didgeridoo come from?", "Australia", ["Scotland", "Japan"]],
      ["Which country is famous for bagpipes?", "Scotland", ["Australia", "India"]],
      ["Where does the sitar come from?", "India", ["Brazil", "Scotland"]],
      ["The djembe drum comes from which part of the world?", "West Africa", ["Japan", "Australia"], "🥁"],
      ["Steel drums come from which place?", "Trinidad", ["Scotland", "India"]],
      ["Where does the koto come from?", "Japan", ["India", "Trinidad"]],
      ["Which instrument is from Australia?", "Didgeridoo", ["Sitar", "Koto"]],
      ["Which instrument is from India?", "Sitar", ["Bagpipes", "Djembe"]]
    ], "Link each instrument to its home country.", "Didgeridoo: Australia. Bagpipes: Scotland. Sitar: India. Djembe: West Africa. Steel drum: Trinidad. Koto: Japan."),

    L("Singing voices", [
      ["Voice types", "🎤", "People have different kinds of singing voices. High to low, they are <b>soprano, alto, tenor, bass</b>."],
      ["High voices", "👆", "<b>Soprano</b> is the highest. <b>Alto</b> is a lower voice. Many kids sing in these ranges."],
      ["Low voices", "👇", "<b>Tenor</b> is a high man's voice. <b>Bass</b> is the lowest voice."]
    ], [
      ["Which singing voice is the highest?", "Soprano", ["Bass", "Tenor"]],
      ["Which singing voice is the lowest?", "Bass", ["Soprano", "Alto"]],
      ["A group of singers is called a...", "choir", ["orchestra", "band"]],
      ["Someone who sings alone is giving a...", "solo", ["choir", "chorus"]],
      ["Which two singers sing a duet?", "Two", ["One", "Four"]],
      ["Which voice is lower than soprano but higher than tenor?", "Alto", ["Bass", "Soprano"]],
      ["The singing voice that is the lowest of all four is the...", "bass", ["alto", "tenor"]],
      ["Singing without any instruments is called singing...", "a cappella", ["loudly", "backwards"]]
    ], "Order the voices from high to low: soprano, alto, tenor, bass.", "High to low: soprano, alto, tenor, bass. Choir = group of singers. Solo = one singer."),

    L("Parts of a song", [
      ["Verse and chorus", "🎵", "A <b>verse</b> tells part of the story and often has new words each time. The <b>chorus</b> repeats with the same words."],
      ["Other parts", "🎬", "The <b>intro</b> starts the song. The <b>bridge</b> is a different part in the middle. The <b>outro</b> ends it."],
      ["Forms", "A B A", "We use letters for sections. <b>AB</b> has two different parts. <b>ABA</b> goes back to the first part."]
    ], [
      ["Which part of a song repeats with the same words?", "Chorus", ["Verse", "Intro"]],
      ["Which part often has new words each time?", "Verse", ["Chorus", "Outro"]],
      ["What starts a song?", "The intro", ["The outro", "The bridge"]],
      ["What ends a song?", "The outro", ["The intro", "The chorus"]],
      ["What do we call a different part in the middle of a song?", "Bridge", ["Chorus", "Intro"]],
      ["A song has parts A, B, A. Which part comes back?", "A", ["B", "C"]],
      ["How many different sections does an AB song have?", "2", ["1", "3"]],
      ["In ABA form, which part comes last?", "A", ["B", "C"]]
    ], "Ask: does it start the song, repeat, or change?", "Intro starts. Verse tells the story. Chorus repeats. Bridge is the change. Outro ends."),

    L("Famous composers", [
      ["Composers", "✍️", "A <b>composer</b> is a person who writes music. Some wrote music hundreds of years ago and we still play it."],
      ["Three greats", "🎼", "<b>Bach</b> and <b>Beethoven</b> were from Germany. <b>Mozart</b> was from Austria and wrote music as a young child."],
      ["More", "🩰", "<b>Tchaikovsky</b> from Russia wrote the music for the ballet <i>The Nutcracker</i>. <b>Vivaldi</b> from Italy wrote <i>The Four Seasons</i>."]
    ], [
      ["What do we call a person who writes music?", "Composer", ["Conductor", "Audience"]],
      ["Who wrote the music for The Nutcracker?", "Tchaikovsky", ["Mozart", "Bach"], "🩰"],
      ["Who wrote The Four Seasons?", "Vivaldi", ["Beethoven", "Tchaikovsky"]],
      ["Which composer started writing music as a young child in Austria?", "Mozart", ["Bach", "Vivaldi"]],
      ["Which of these composers was from Germany?", "Beethoven", ["Mozart", "Vivaldi"]],
      ["Ode to Joy comes from a symphony by which composer?", "Beethoven", ["Vivaldi", "Mozart"]],
      ["Tchaikovsky was from which country?", "Russia", ["Italy", "Austria"]],
      ["Vivaldi was from which country?", "Italy", ["Russia", "Germany"]]
    ], "Link each composer with one famous piece or country.", "Bach: Germany. Beethoven: Germany, Ode to Joy. Mozart: Austria. Tchaikovsky: Russia, The Nutcracker. Vivaldi: Italy, The Four Seasons.")
  ];
  l4.push(
    MIX("Mixed practice", [l4[0], l4[2], l4[5], l4[8], l4[11], l4[13]]),
    MIX("Level 4 Challenge", [l4[1], l4[3], l4[6], l4[7], l4[9], l4[12], l4[15], l4[17]])
  );

  // ======================= LEVEL 5 =======================
  // fill the measure for 2/4, 3/4, 4/4
  const fillTs = () => {
    const top = pick([2, 3, 4]);
    const pcs = [["a quarter note", 1], ["a half note", 2], ["a dotted half note", 3], ["two eighth notes", 1], ["a quarter rest", 1], ["a half rest", 2]];
    let used = 0, list = [];
    while (true) {
      const opts = pcs.filter(p => used + p[1] <= top - 1 + (list.length ? 0 : 0) && used + p[1] < top);
      if (!opts.length || list.length >= 2) break;
      const p = pick(opts); list.push(p[0]); used += p[1];
    }
    if (!list.length) { list.push("a quarter note"); used = 1; }
    const left = top - used;
    return {
      text: `A measure in ${top}/4 time has ${list.join(" and ")} so far. How many beats are still empty?`, answer: left,
      hints: ["The top number tells how many beats the whole measure needs. First add up the beats already used.", "Quarter note or quarter rest = 1 beat. Half note or half rest = 2. Two eighth notes = 1. Dotted half = 3. Take the used beats away from the top number.", "Example: in 3/4 time with a half note used, 3 − 2 leaves 1 beat. Now do yours."]
    };
  };
  const stepSkip = () => {
    const i = ri(0, 6), kind = pick(["step", "skip"]), dir = pick(["up", "down"]);
    const n = kind === "step" ? 1 : 2, j = dir === "up" ? (i + n) % 7 : (i - n + 14) % 7, ans = LET[j];
    const wr = shuf(LET.filter(x => x !== ans && x !== LET[i])).slice(0, 2);
    return {
      text: `Start on ${LET[i]}. Which note is a ${kind} ${dir} from ${LET[i]}?`, visual: LET.join(" "), choices: shuf([ans, ...wr]), answer: ans,
      hints: ["A step moves to the very next letter. A skip jumps over one letter.", `Say the letters in order. Go ${dir === "up" ? "forward" : "backward"} (after G comes A again). For a skip, you jump over one letter.`, "Example: a step up from D is E. A skip up from D is F (jump over E). Now do yours."]
    };
  };

  const l5 = [
    L("Note family math", [
      ["Whole to eighth", "𝅝 = 𝅗𝅥 𝅗𝅥", "A <b>whole note</b> is 4 beats. Two half notes (2 + 2) or four quarter notes (1+1+1+1) make a whole note."],
      ["Eighth notes", "♫", "Two eighth notes make a quarter note. So a half note is 4 eighth notes, and a whole note is 8."],
      ["Smaller and smaller", "➗", "Each note type is <b>half</b> as long as the one before it."]
    ], [
      ["How many quarter notes equal a half note?", "2", ["1", "4"]],
      ["How many quarter notes equal a whole note?", "4", ["2", "8"]],
      ["How many eighth notes equal a quarter note?", "2", ["4", "1"]],
      ["How many eighth notes equal a half note?", "4", ["2", "8"]],
      ["How many eighth notes equal a whole note?", "8", ["4", "2"]],
      ["Two half notes together equal one...", "whole note", ["quarter note", "eighth note"]],
      ["Which note is the longest?", "Whole note", ["Half note", "Eighth note"]],
      ["Which note is the shortest?", "Eighth note", ["Quarter note", "Half note"]]
    ], "Each note is half as long as the one before: whole, half, quarter, eighth.", "Whole = 4 beats, half = 2, quarter = 1, eighth = half a beat."),

    F("Fill the measure 2", [
      ["Beats per measure", "2/4 3/4 4/4", "The top number of the time signature tells how many beats the measure holds."],
      ["Count what is used", "1 + 2", "Add the beats you already have. Then take that away from the top number."],
      ["Rests count too", "𝄽", "A rest takes up beats just like a note. Count it!"]
    ], fillTs),

    L("Strong beats", [
      ["Beat one is strong", "1 2 3 4", "In most music, <b>beat 1</b> of each measure feels the strongest."],
      ["Waltz feel", "💃", "In 3/4, we feel <b>STRONG</b>-weak-weak: ONE-two-three. That is the waltz."],
      ["March feel", "🥁", "In 2/4, we feel STRONG-weak: LEFT-right. That is why marches use 2/4 or 4/4."]
    ], [
      ["In most music, which beat is usually the strongest?", "Beat 1", ["Beat 2", "The last beat"]],
      ["How does a waltz in 3/4 feel?", "Strong, weak, weak", ["Weak, strong, strong", "All the same"]],
      ["A march in 2/4 feels like...", "strong, weak", ["strong, weak, weak", "weak, weak"]],
      ["In 3/4 time, how many weak beats follow each strong beat?", "2", ["3", "1"]],
      ["In 4/4 time, there are 4 beats. Which one is the strongest?", "The first", ["The second", "The fourth"]],
      ["Which sound is the waltz?", "OOM-pah-pah", ["OOM-pah", "pah-pah-pah"], "💃"],
      ["The first beat of a measure is called the...", "downbeat", ["rest", "bridge"]],
      ["Stepping LEFT-right with a strong LEFT matches which time signature?", "2/4", ["3/4", "6/4"]]
    ], "Beat one of every measure gets the most weight.", "Beat 1 is strong. 3/4 is ONE-two-three. 2/4 is ONE-two."),

    L("Ties and slurs", [
      ["A tie", "⌒", "A <b>tie</b> is a curved line joining <b>two notes with the same pitch</b>. Play one long note and add the beats."],
      ["A slur", "⌒", "A <b>slur</b> is a curved line over <b>different notes</b>. Play them smoothly, connected."],
      ["Smooth or short", "〰️ •", "<b>Legato</b> means smooth and connected. <b>Staccato</b> means short and bouncy, shown by dots."]
    ], [
      ["A tie joins two notes of the same pitch. Quarter + half tied is how many beats?", "3", ["2", "4"]],
      ["Two half notes tied together last how many beats?", "4", ["2", "3"]],
      ["Two quarter notes tied together last how many beats?", "2", ["1", "3"]],
      ["What does a curved line over DIFFERENT notes tell you to do?", "Play smoothly", ["Hold one note", "Play loudly"]],
      ["What does legato mean?", "Smooth and connected", ["Short and bouncy", "Very loud"]],
      ["What does staccato mean?", "Short and bouncy", ["Smooth and connected", "Very slow"]],
      ["Dots over notes tell you to play them...", "short", ["smoothly", "twice"]],
      ["A curved line joining two notes with the SAME pitch is a...", "tie", ["slur", "clef"]]
    ], "Look at the notes under the curve. Same pitch means tie. Different pitches means slur.", "Tie = same pitch, add the beats. Slur = different notes, smooth. Staccato = short."),

    L("The bass clef", [
      ["Low sounds", "𝄢", "The <b>bass clef</b> is used for <b>low</b> notes. It looks like a backwards C with two dots."],
      ["Who uses it?", "🎹", "A pianist often reads bass clef with the <b>left hand</b>. Cellos, tubas and bass singers use it too."],
      ["Grand staff", "🎼", "The treble and bass staves joined together by a <b>brace</b> make the <b>grand staff</b>."]
    ], [
      ["What kind of notes does the bass clef show?", "Low notes", ["High notes", "Loud notes"]],
      ["The treble clef is for high notes. The bass clef is for...", "low notes", ["rests", "only drums"]],
      ["Which hand usually plays the bass clef on a piano?", "Left hand", ["Right hand", "Both feet"], "🎹"],
      ["Two staves joined together form the...", "grand staff", ["bar line", "time signature"]],
      ["What joins the two staves of the grand staff?", "A brace", ["A tie", "A slur"]],
      ["Which instrument reads the bass clef?", "Tuba", ["Flute", "Piccolo"]],
      ["Which clef does a flute use?", "Treble clef", ["Bass clef", "No clef"]],
      ["The bass clef is also called the...", "F clef", ["C clef", "G clef"]]
    ], "Think high or low. Bass sounds low.", "Treble clef = high notes, right hand. Bass clef = low notes, left hand. Grand staff = both together."),

    L("Bass clef lines and spaces", [
      ["Lines", "𝄢", "Notes on the bass lines, bottom to top, are <b>G B D F A</b>: <b>G</b>ood <b>B</b>oys <b>D</b>o <b>F</b>ine <b>A</b>lways."],
      ["Spaces", "🐄", "Notes in the bass spaces, bottom to top, are <b>A C E G</b>: <b>A</b>ll <b>C</b>ows <b>E</b>at <b>G</b>rass."],
      ["Different from treble!", "⚠️", "The same line or space has a different note name in bass clef than in treble clef."]
    ], [
      ["Which note is on the bottom line of the bass staff?", "G", ["A", "F"], "𝄢"],
      ["Which note is on the top line of the bass staff?", "A", ["G", "F"], "𝄢"],
      ["Which note is on the middle line of the bass staff?", "D", ["B", "F"], "𝄢"],
      ["Which note is in the bottom space of the bass staff?", "A", ["G", "C"], "𝄢"],
      ["Which note is in the second space of the bass staff?", "C", ["E", "A"], "𝄢"],
      ["Which note is in the top space of the bass staff?", "G", ["E", "A"], "𝄢"],
      ["Which sentence helps with the bass SPACES?", "All Cows Eat Grass", ["Good Boys Do Fine Always", "Every Good Boy Does Fine"]],
      ["Which sentence helps with the bass LINES?", "Good Boys Do Fine Always", ["All Cows Eat Grass", "Every Good Boy Does Fine"]]
    ], "Say the sentence and count from the bottom.", "Bass lines: G B D F A (Good Boys Do Fine Always). Bass spaces: A C E G (All Cows Eat Grass)."),

    L("Ledger lines", [
      ["Extra lines", "➖", "When a note is too high or too low for the staff, we add a short extra line called a <b>ledger line</b>."],
      ["Middle C again", "🎹", "Middle C sits on a ledger line <b>between</b> the treble staff and the bass staff."],
      ["Count outward", "↕️", "The notes keep following the music alphabet: A B C D E F G."]
    ], [
      ["What is a short extra line above or below the staff called?", "A ledger line", ["A bar line", "A brace"]],
      ["Why do we use ledger lines?", "For notes too high or low for the staff", ["To make notes louder", "To end the song"]],
      ["On the grand staff, middle C sits on a ledger line between which two staves?", "Treble and bass", ["Two treble staves", "Two bass staves"]],
      ["The note just above the top line (F) of the treble staff is in the space above it. What is its name?", "G", ["E", "A"], "𝄞"],
      ["The note in the space just below the bottom line (E) of the treble staff is...", "D", ["F", "C"], "𝄞"],
      ["A note on a ledger line above the treble staff sounds...", "higher", ["lower", "the same"]],
      ["The music alphabet has how many letters?", "7", ["5", "8"]],
      ["After G in the music alphabet, the next letter is...", "A", ["H", "B"]]
    ], "Keep counting in the music alphabet, up or down.", "Ledger lines are little extra lines for high or low notes. Letters continue A B C D E F G."),

    F("Steps and skips", [
      ["Step", "🪜", "A <b>step</b> is moving to the very next note name: C to D."],
      ["Skip", "🦘", "A <b>skip</b> jumps over one note name: C to E."],
      ["Repeat", "🔁", "If the next note is the same note, that is a <b>repeat</b>."]
    ], stepSkip),

    L("The major scale", [
      ["Scale", "🪜", "A <b>scale</b> is a ladder of notes in order. The C major scale is C D E F G A B C."],
      ["White keys", "🎹", "C major uses only the <b>white keys</b>. It has no sharps or flats."],
      ["Whole and half steps", "↔️", "A <b>half step</b> is the very next key. A <b>whole step</b> is two half steps. Major scales use a pattern of both."]
    ], [
      ["What do we call a ladder of notes in order?", "A scale", ["A clef", "A rest"]],
      ["How many different note names does a major scale have before it starts again?", "7", ["5", "8"]],
      ["Which scale uses only the white keys, starting on C?", "C major", ["D major", "G major"], "🎹"],
      ["Does the C major scale have sharps or flats?", "No", ["Yes, 3", "Yes, 5"]],
      ["The first and last note of a major scale have the...", "same name", ["different names", "same sharp"]],
      ["How many half steps make a whole step?", "2", ["1", "4"]],
      ["Which is the smaller step: a half step or a whole step?", "A half step", ["A whole step", "They are the same"]],
      ["The do-re-mi song is a...", "major scale", ["rest", "time signature"]]
    ], "Think of a ladder. Each rung is the next note.", "Scale = a ladder of notes. C major = all white keys. Half step = next key. Whole step = two half steps."),

    L("Black keys on the piano", [
      ["Two and three", "⬛⬛ ⬛⬛⬛", "The black keys come in groups of <b>two</b> and <b>three</b>."],
      ["Landmarks", "📍", "<b>C</b> is just left of the group of two. <b>D</b> sits in the middle of that group. <b>F</b> is just left of the group of three."],
      ["Count them", "2 + 3", "That makes <b>5</b> black keys in each repeating pattern."]
    ], [
      ["C is just to the left of which group of black keys?", "The group of two", ["The group of three", "No black keys"]],
      ["F is just to the left of which group of black keys?", "The group of three", ["The group of two", "No black keys"]],
      ["Which white key sits between the two black keys in the group of two?", "D", ["C", "E"]],
      ["How many black keys are in each pattern (a group of 2 and a group of 3)?", "5", ["7", "3"]],
      ["How many white keys are in each pattern from C up to B?", "7", ["5", "8"]],
      ["The black keys in a group of two are between which white keys? C and D, and D and...", "E", ["F", "G"]],
      ["Which white key is just left of the group of two black keys?", "C", ["D", "F"]],
      ["Which white key is just right of the group of three black keys?", "B", ["A", "C"]]
    ], "Use the groups of black keys as landmarks to find white keys.", "Groups: two black keys, three black keys. C is left of the two. F is left of the three."),

    L("Sharps and flats on the keys", [
      ["Right is sharp", "➡️♯", "The key just to the <b>right</b> of a note is its <b>sharp</b>. C sharp (C♯) is the black key right of C."],
      ["Left is flat", "⬅️♭", "The key just to the <b>left</b> of a note is its <b>flat</b>. D flat (D♭) is the black key left of D."],
      ["Same key, two names", "🔑", "C♯ and D♭ are the <b>same key</b> with two names."]
    ], [
      ["C sharp is the key just to the ___ of C.", "right", ["left", "top"]],
      ["D flat is the key just to the ___ of D.", "left", ["right", "top"]],
      ["C sharp and D flat are...", "the same key", ["different keys", "both white keys"]],
      ["Between which two white keys is there NO black key?", "E and F", ["C and D", "G and A"]],
      ["Between which two white keys is there NO black key?", "B and C", ["D and E", "F and G"]],
      ["Is F sharp a black key or a white key?", "A black key", ["A white key", "Not a key"]],
      ["Moving up one key from E (half step) lands on...", "F", ["D", "G"]],
      ["Moving up one key from B (half step) lands on...", "C", ["A", "D"]]
    ], "Sharp goes right (higher). Flat goes left (lower).", "Sharp = key to the right. Flat = key to the left. E to F and B to C have no black key between."),

    L("The home note", [
      ["Home", "🏠", "Every scale has a <b>home note</b> called the <b>tonic</b>. It is the first note of the scale."],
      ["Feels finished", "✅", "When a song ends on the home note, it feels finished and comfortable."],
      ["Name of the scale", "🎼", "The home note gives the scale its name. The scale that starts on G is the G major scale."]
    ], [
      ["Another name for the home note of a scale is the...", "tonic", ["rest", "bar line"]],
      ["What is the home note of the C major scale?", "C", ["G", "D"]],
      ["What is the home note of the G major scale?", "G", ["C", "D"]],
      ["What is the home note of the D major scale?", "D", ["G", "A"]],
      ["A song that ends on its home note feels...", "finished", ["unfinished", "scary"]],
      ["A song that stops on a different note often feels...", "like it wants to go on", ["completely finished", "silent"]],
      ["In the do-re-mi scale, the home note is...", "do", ["re", "sol"]],
      ["Which note do most songs start and end on?", "The home note", ["The highest note", "The loudest note"]]
    ], "Think of coming home at the end of the day.", "Home note = tonic = first note of the scale. It gives the scale its name."),

    L("The string family", [
      ["Four main strings", "🎻", "The orchestra strings are <b>violin, viola, cello</b> and <b>double bass</b>."],
      ["Size matters", "📏", "Bigger instruments sound lower. The violin is small and high. The double bass is the biggest and lowest."],
      ["How to play", "🏹", "Strings are played with a <b>bow</b>, or <b>plucked</b> with fingers (called pizzicato)."]
    ], [
      ["Which string instrument is the smallest and highest?", "Violin", ["Cello", "Double bass"], "🎻"],
      ["Which string instrument is the biggest and lowest?", "Double bass", ["Violin", "Viola"]],
      ["What is the stick with hair that makes strings sing?", "A bow", ["A baton", "A reed"]],
      ["Plucking the strings with fingers is called...", "pizzicato", ["legato", "crescendo"]],
      ["Which instrument do you hold between your knees while sitting?", "Cello", ["Violin", "Flute"]],
      ["A viola is a little bigger and lower than a...", "violin", ["double bass", "cello"]],
      ["Which of these is NOT in the orchestra string section?", "Trumpet", ["Viola", "Cello"], "🎺"],
      ["Bigger string instruments sound...", "lower", ["higher", "the same"]]
    ], "Big instruments = low sounds. Small instruments = high sounds.", "Strings from high to low: violin, viola, cello, double bass. Bow or pluck (pizzicato)."),

    L("Woodwinds and brass", [
      ["Woodwinds", "🎷", "<b>Flute, clarinet, oboe, bassoon</b> and <b>saxophone</b> are woodwinds. Many use a thin <b>reed</b> that vibrates."],
      ["Brass", "🎺", "<b>Trumpet, trombone, French horn</b> and <b>tuba</b> are brass. Players buzz their lips into a mouthpiece."],
      ["Sound", "🌬️", "A flute is played by blowing across a hole. A trombone has a slide to change notes."]
    ], [
      ["Which of these is a woodwind?", "Clarinet", ["Trumpet", "Tuba"], "🎷"],
      ["Which of these is a brass instrument?", "Trombone", ["Flute", "Oboe"]],
      ["Which brass instrument is the lowest and biggest?", "Tuba", ["Trumpet", "French horn"]],
      ["What do brass players do with their lips?", "Buzz them", ["Hum a tune", "Close them tight"]],
      ["Which instrument has a slide you move to change notes?", "Trombone", ["Clarinet", "Flute"]],
      ["What thin piece vibrates in a clarinet?", "A reed", ["A bow", "A string"]],
      ["Which woodwind do you play by blowing across a hole?", "Flute", ["Clarinet", "Oboe"]],
      ["The saxophone belongs to which family?", "Woodwinds", ["Brass", "Strings"], "🎷"]
    ], "Ask: does it use a reed or air across a hole (woodwind), or do lips buzz (brass)?", "Woodwinds: flute, clarinet, oboe, bassoon, saxophone. Brass: trumpet, trombone, French horn, tuba."),

    L("Percussion in the orchestra", [
      ["Big drums", "🥁", "<b>Timpani</b> are big kettle drums. They play low rumbles and can be tuned to different notes."],
      ["Bright sounds", "🔔", "The <b>xylophone</b> has wooden bars. The <b>triangle</b> goes ting. <b>Cymbals</b> crash together."],
      ["Other drums", "🪘", "The <b>snare drum</b> makes a crisp rattle. The <b>bass drum</b> is large and gives a deep boom."]
    ], [
      ["Which big drums in the orchestra can be tuned to notes?", "Timpani", ["Snare drum", "Cymbals"]],
      ["Which instrument is made of metal plates that crash together?", "Cymbals", ["Triangle", "Xylophone"]],
      ["Which instrument has wooden bars you hit with mallets?", "Xylophone", ["Cymbals", "Triangle"]],
      ["Which drum makes a crisp rattle?", "Snare drum", ["Bass drum", "Timpani"]],
      ["Which drum gives the deepest boom?", "Bass drum", ["Snare drum", "Triangle"]],
      ["Which tiny metal instrument goes ting?", "Triangle", ["Timpani", "Bass drum"], "🔺"],
      ["Which family do all these instruments belong to?", "Percussion", ["Strings", "Brass"]],
      ["How do you make a sound with a xylophone?", "Hit the bars with mallets", ["Blow into it", "Pluck the strings"]]
    ], "Match the sound or look of each instrument.", "Timpani: big tuned drums. Cymbals: crash. Xylophone: wooden bars. Snare: rattle. Bass drum: deep boom. Triangle: ting."),

    L("Musical forms", [
      ["Call and response", "🗣️", "In <b>call and response</b>, one person sings or plays, and another answers."],
      ["A round", "🔁", "In a <b>round</b>, everyone sings the same tune but starts at different times. <i>Row, Row, Row Your Boat</i> is a round."],
      ["Letters for form", "A B A", "<b>AB</b> has two different parts. <b>ABA</b> returns to the start. A song with a repeating chorus is like <b>ABAB</b>."]
    ], [
      ["Singing the same tune but starting at different times is a...", "round", ["solo", "rest"]],
      ["Which song is a round?", "Row, Row, Row Your Boat", ["Happy Birthday", "The National Anthem"]],
      ["When one person asks and another answers in music, it is...", "call and response", ["a round", "a lullaby"]],
      ["A song has parts A, B, A. What kind of form is that?", "ABA", ["AB", "AAA"]],
      ["A song has two different parts only, A and B. What form is that?", "AB", ["ABA", "ABC"]],
      ["In a round, do all singers start at the same time?", "No", ["Yes", "Only one sings"]],
      ["In ABA, which part is heard twice?", "A", ["B", "C"]],
      ["Letters like A and B are used to show the...", "sections of a song", ["notes on the staff", "loudness"]]
    ], "A form is a map of the song's parts.", "Round = same tune starting at different times. Call and response = ask and answer. ABA = back to part A."),

    L("Styles of music", [
      ["Many styles", "🎶", "Music comes in many <b>styles</b>: classical, jazz, folk, rock, pop and more."],
      ["Jazz", "🎷", "<b>Jazz</b> musicians often make up music while playing. This is called <b>improvising</b>. Jazz grew up in the United States."],
      ["From places", "🌎", "<b>Mariachi</b> is from Mexico. <b>Flamenco</b> is from Spain. <b>Samba</b> is from Brazil. <b>Reggae</b> is from Jamaica."]
    ], [
      ["Making up music while you play is called...", "improvising", ["repeating", "tuning"]],
      ["Which style is known for improvising?", "Jazz", ["Marching", "Lullaby"], "🎷"],
      ["Mariachi music comes from which country?", "Mexico", ["Brazil", "Spain"], "🎺"],
      ["Flamenco music and dance come from which country?", "Spain", ["Mexico", "Jamaica"]],
      ["Samba music is from which country?", "Brazil", ["Jamaica", "Spain"]],
      ["Reggae music is from which country?", "Jamaica", ["Brazil", "Mexico"]],
      ["Jazz grew up in which country?", "The United States", ["Japan", "Spain"]],
      ["Music written long ago for orchestras, like Mozart's, is called...", "classical", ["reggae", "samba"]]
    ], "Link each style to its country.", "Jazz: USA, improvising. Mariachi: Mexico. Flamenco: Spain. Samba: Brazil. Reggae: Jamaica."),

    L("Song words", [
      ["Lyrics", "📝", "The words of a song are called <b>lyrics</b>."],
      ["Rhymes", "🗣️", "Words that end with the same sound <b>rhyme</b>: moon and spoon, light and night."],
      ["Syllables", "👏", "A <b>syllable</b> is a beat in a word. Mu-sic has 2 syllables. Often one note matches one syllable."]
    ], [
      ["The words of a song are called...", "lyrics", ["notes", "rests"]],
      ["Which word rhymes with moon?", "spoon", ["door", "tree"]],
      ["Which word rhymes with light?", "night", ["lamp", "day"]],
      ["Which word rhymes with sing?", "ring", ["song", "sun"]],
      ["How many syllables are in the word music?", "2", ["1", "3"]],
      ["How many syllables are in the word piano?", "3", ["2", "4"]],
      ["How many syllables are in the word drum?", "1", ["2", "3"]],
      ["How many syllables are in the word xylophone?", "3", ["2", "4"]]
    ], "Clap each part of the word to count the syllables, or listen to the end sound for rhymes.", "Lyrics are song words. Rhymes share an end sound. Count syllables by clapping each part."),
  ];
  l5.push(
    MIX("Mixed practice", [l5[0], l5[3], l5[5], l5[8], l5[12], l5[16]]),
    MIX("Level 5 Challenge", [l5[2], l5[4], l5[6], l5[9], l5[10], l5[11], l5[14], l5[17]])
  );

  // ======================= LEVEL 6 =======================
  const MD = [["a whole note", 4], ["a half note", 2], ["a quarter note", 1], ["a dotted half note", 3], ["a half rest", 2], ["a quarter rest", 1]];
  const checkMeasure = () => {
    let list, tot;
    do { list = Array.from({ length: ri(2, 4) }, () => pick(MD)); tot = list.reduce((s, x) => s + x[1], 0); } while (tot < 2 || tot > 6);
    const ans = tot === 4 ? "Exactly full" : tot < 4 ? "Needs more beats" : "Too many beats";
    return {
      text: `A 4/4 measure has: ${list.map(x => x[0]).join(", ")}. What is true about it?`, choices: shuf(["Exactly full", "Needs more beats", "Too many beats"]), answer: ans,
      hints: ["Add up all the beats, and rests count too. Compare with 4.", "Whole = 4, dotted half = 3, half = 2, quarter = 1 (rests are the same). If your total is 4 it is full; below 4 needs more; above 4 is too many.", "Example: a half note and a quarter note make 2 + 1 = 3. That is less than 4, so it needs more beats. Now do yours."]
    };
  };
  const bpmQ = () => {
    const bpm = pick([60, 120]), sec = bpm === 60 ? ri(3, 12) : ri(2, 8), ans = bpm === 60 ? sec : sec * 2;
    return {
      text: `A metronome is set to ${bpm} beats per minute. That is ${bpm === 60 ? "1 beat every second" : "2 beats every second"}. How many beats happen in ${sec} seconds?`, answer: ans,
      hints: ["Use how many beats happen in one second, then count up.", `At ${bpm === 60 ? "1 beat" : "2 beats"} each second, multiply the seconds by the beats in one second.`, "Example: at 60 BPM there is 1 beat each second, so in 4 seconds there are 4 beats. Now do yours."]
    };
  };
  const intervalQ = () => {
    const i = ri(0, 6), n = ri(2, 5), j = (i + n - 1) % 7;
    return {
      text: `Count from ${LET[i]} up to ${LET[j]} in the music alphabet. Count ${LET[i]} as 1. What number is ${LET[j]}?`, visual: LET.join(" "), answer: n,
      hints: ["Say the letters in order, starting at the first note. Give it the number 1.", `Count each letter: ${LET[i]} is 1, then the next letter is 2, and so on until you reach ${LET[j]}. (After G comes A.)`, "Example: from C to F, C is 1, D is 2, E is 3, F is 4. So it is a fourth. Now do yours."]
    };
  };
  const l6 = [
    L("Dotted notes", [
      ["The dot rule", "𝅘𝅥.", "A <b>dot</b> adds <b>half</b> of the note's value. A dotted quarter note is 1 beat + half a beat = <b>1 and a half</b> beats."],
      ["In eighth notes", "♪♪♪", "A dotted quarter is as long as <b>3 eighth notes</b>. A dotted half is as long as <b>3 quarter notes</b>."],
      ["Dotted whole", "𝅝.", "A dotted whole note is 4 + 2 = <b>6 beats</b>."]
    ], [
      ["How many beats does a dotted quarter note get?", "1 and a half", ["2", "3"]],
      ["How many beats does a dotted half note get?", "3", ["2", "4"]],
      ["How many beats does a dotted whole note get?", "6", ["4", "5"]],
      ["A dotted quarter note equals how many eighth notes?", "3", ["2", "4"]],
      ["A dotted half note equals how many quarter notes?", "3", ["2", "4"]],
      ["What does a dot do to a note?", "Adds half its value", ["Makes it silent", "Doubles its value"]],
      ["Which lasts longer, a quarter note or a dotted quarter note?", "The dotted quarter", ["The quarter", "They are the same"]],
      ["A dotted half note plus a quarter note fills a measure of...", "4/4", ["2/4", "3/4"]]
    ], "A dot adds half of the note's value.", "Quarter = 1 beat, so half is half a beat. Half = 2 beats, so a dot adds 1. Whole = 4, so a dot adds 2."),

    L("Sixteenth notes", [
      ["Very quick", "♬", "<b>Sixteenth notes</b> are very fast. They have two beams. We say <b>ti-ka-ti-ka</b> (4 sounds in one beat)."],
      ["How many?", "4 = 1 beat", "<b>4</b> sixteenth notes fit in 1 beat. 2 sixteenths fit in 1 eighth note."],
      ["Bigger groups", "16", "<b>16</b> sixteenth notes make a whole note."]
    ], [
      ["How many sixteenth notes fit in one beat?", "4", ["2", "8"]],
      ["How many sixteenth notes fit in one eighth note?", "2", ["4", "1"]],
      ["How many sixteenth notes fit in a half note?", "8", ["4", "16"]],
      ["How many sixteenth notes fit in a whole note?", "16", ["8", "4"]],
      ["How many beams does a pair of sixteenth notes have?", "2", ["1", "3"]],
      ["Which are faster, eighth notes or sixteenth notes?", "Sixteenth notes", ["Eighth notes", "Same"]],
      ["How many sixteenth notes are in 2 beats?", "8", ["4", "16"]],
      ["Four sixteenth notes in one beat sound like ti-ka-ti-ka. How many sounds is that?", "4", ["2", "8"]]
    ], "Each smaller note fits twice into the one before: quarter, eighth, sixteenth.", "Quarter = 1 beat = 2 eighths = 4 sixteenths. A whole note = 16 sixteenths."),

    L("Rests in the rhythm", [
      ["Silent beats", "𝄽", "A <b>rest</b> is a silence. It has the same length as the note with the same name."],
      ["Small rests", "𝄾", "An <b>eighth rest</b> is half a beat. A <b>quarter rest</b> is 1 beat."],
      ["Big rests", "⏸️", "A <b>half rest</b> is 2 beats. A <b>whole rest</b> is 4 beats and fills a measure in 4/4."]
    ], [
      ["How long is a quarter rest?", "1 beat", ["2 beats", "4 beats"]],
      ["How long is a half rest?", "2 beats", ["1 beat", "4 beats"]],
      ["How long is a whole rest?", "4 beats", ["2 beats", "1 beat"]],
      ["How long is an eighth rest?", "Half a beat", ["1 beat", "2 beats"]],
      ["What does a whole rest do in a 4/4 measure?", "Fills the whole measure", ["Fills half of it", "Takes no time"]],
      ["Quarter note, quarter rest, half note: how many beats in all?", "4", ["3", "5"]],
      ["Half note, half rest: how many beats in all?", "4", ["2", "3"]],
      ["A rest means...", "stay silent for that long", ["play louder", "play twice"]]
    ], "Rests take time, just like notes, but you stay quiet.", "Rest lengths match note lengths: eighth = half a beat, quarter = 1, half = 2, whole = 4."),

    F("Is the measure right?", [
      ["Adding up", "4/4", "In 4/4 a measure needs <b>exactly 4 beats</b>. Add the notes and rests."],
      ["Too short, too long", "⚖️", "If the total is under 4, the measure needs more. If it is over 4, it has too many."],
      ["Values", "1 2 3 4", "Quarter = 1, half = 2, dotted half = 3, whole = 4. Rests count the same."]
    ], checkMeasure),

    L("Beats per minute", [
      ["Tempo in numbers", "⏱️", "<b>BPM</b> means <b>beats per minute</b>. It tells exactly how fast the beat is."],
      ["Metronome", "🕰️", "A <b>metronome</b> clicks at a steady tempo. 60 BPM is one beat every second, like a clock."],
      ["Bigger is faster", "🐇", "A bigger BPM number means a faster tempo. 120 BPM is twice as fast as 60 BPM."]
    ], [
      ["What does BPM stand for?", "Beats per minute", ["Big piano music", "Bars per measure"]],
      ["Which tool clicks at a steady tempo?", "A metronome", ["A baton", "A clef"]],
      ["Which is faster, 60 BPM or 120 BPM?", "120 BPM", ["60 BPM", "They are the same"]],
      ["Which is slower, 80 BPM or 140 BPM?", "80 BPM", ["140 BPM", "They are the same"]],
      ["60 BPM is how many beats each second?", "1", ["2", "60"]],
      ["120 BPM is how many beats each second?", "2", ["1", "4"]],
      ["A bigger BPM number means the music is...", "faster", ["slower", "softer"]],
      ["A very fast song might be 180 BPM. A lullaby might be closer to...", "60 BPM", ["200 BPM", "300 BPM"], "🌙"]
    ], "A metronome counts beats. More beats per minute means faster.", "BPM = beats per minute. 60 BPM = 1 beat each second. Bigger numbers are faster."),

    F("Beat counting with BPM", [
      ["Beats each second", "60 = 1/s", "At <b>60 BPM</b> there is 1 beat each second. At <b>120 BPM</b> there are 2 beats each second."],
      ["Multiply", "×", "To find the beats in some seconds, multiply the seconds by the beats in one second."],
      ["Check it", "✅", "Does your answer make sense? Faster tempos have more beats in the same time."]
    ], bpmQ),

    F("Counting intervals", [
      ["Distance between notes", "↕️", "An <b>interval</b> is the distance between two notes. We count the letter names, starting with 1."],
      ["Example", "C D E", "From C to E: C is 1, D is 2, E is 3. That is a <b>third</b>."],
      ["Names", "2nd 3rd 4th 5th", "A 2nd is a step. A 3rd is a skip. A 5th is a bigger jump (C to G)."]
    ], intervalQ),

    L("Scale degrees", [
      ["Numbering the scale", "1 2 3 4 5 6 7", "In C major: C is note 1, D is 2, E is 3, F is 4, G is 5, A is 6, B is 7."],
      ["Home and its friend", "🏠", "Note 1 is the <b>tonic</b>. Note 5 is the <b>dominant</b>. It leads strongly back home."],
      ["Do-re-mi numbers", "do re mi fa sol la ti", "do is 1, re is 2, mi is 3, fa is 4, sol is 5, la is 6, ti is 7."]
    ], [
      ["In the C major scale, which note is number 3?", "E", ["D", "F"]],
      ["In the C major scale, which note is number 5?", "G", ["F", "A"]],
      ["In the C major scale, which note is number 4?", "F", ["E", "G"]],
      ["In the C major scale, which note is number 6?", "A", ["B", "G"]],
      ["In the C major scale, which note is number 7?", "B", ["A", "C"]],
      ["In the do-re-mi scale, which number is sol?", "5", ["3", "6"]],
      ["In the do-re-mi scale, which number is mi?", "3", ["2", "4"]],
      ["What is the tonic called in the do-re-mi scale?", "do", ["sol", "ti"]]
    ], "Count along the scale and number each note.", "C major: C1 D2 E3 F4 G5 A6 B7. do1 re2 mi3 fa4 sol5 la6 ti7."),

    L("Half steps on the keyboard", [
      ["Smallest step", "🎹", "A <b>half step</b> is the very next key, black or white."],
      ["No black key", "E F  B C", "There is no black key between <b>E and F</b> or between <b>B and C</b>. Those pairs are half steps already."],
      ["Whole step", "= 2 half steps", "A <b>whole step</b> is two half steps. C to D is a whole step (C to C♯ to D)."]
    ], [
      ["What is the distance between two keys that are right next to each other?", "A half step", ["A whole step", "An octave"]],
      ["How many half steps make a whole step?", "2", ["1", "4"]],
      ["E up to F is...", "a half step", ["a whole step", "a skip"]],
      ["B up to C is...", "a half step", ["a whole step", "a skip"]],
      ["C up to D is...", "a whole step", ["a half step", "a skip"]],
      ["Going up a half step from C lands on...", "C sharp", ["D", "B"]],
      ["Going up a half step from F lands on...", "F sharp", ["G", "E"]],
      ["D flat is the same key as...", "C sharp", ["D sharp", "E flat"]]
    ], "A half step is the very next key. Remember E-F and B-C.", "Half step = next key. Whole step = two half steps. E-F and B-C have no black key between them."),

    L("Major and minor", [
      ["Major sounds bright", "😊", "<b>Major</b> music usually sounds happy and bright."],
      ["Minor sounds darker", "🌧️", "<b>Minor</b> music usually sounds sad, calm or mysterious."],
      ["Same notes, new mood", "🎭", "Changing just a few notes can turn a major tune into a minor one."]
    ], [
      ["Which sounds happy and bright?", "Major", ["Minor", "Neither"], "😊"],
      ["Which sounds sad or mysterious?", "Minor", ["Major", "Neither"], "🌧️"],
      ["A cheerful, sunny song is probably in a ___ key.", "major", ["minor", "silent"]],
      ["A quiet, mysterious song is probably in a ___ key.", "minor", ["major", "loud"]],
      ["Changing some notes can turn a major tune into a...", "minor tune", ["drum solo", "rest"]],
      ["The do-re-mi scale is a ___ scale.", "major", ["minor", "tiny"]],
      ["Which two words describe the main kinds of scale?", "Major and minor", ["Loud and soft", "Fast and slow"]],
      ["Do minor songs always have to be sad?", "No, they can be calm or mysterious", ["Yes, always", "They can't have words"]]
    ], "Listen for the mood: bright or dark?", "Major = bright and happy. Minor = darker, sad or mysterious."),

    L("Chords and triads", [
      ["Chord", "🎹", "A <b>chord</b> is three or more notes played at the same time."],
      ["Triad", "3", "A <b>triad</b> is a chord with 3 notes. It is built by taking every other note of a scale."],
      ["Examples", "C E G", "The C major triad is <b>C, E, G</b>. The G major triad is <b>G, B, D</b>. The F major triad is <b>F, A, C</b>."]
    ], [
      ["What do we call three or more notes played together?", "A chord", ["A rest", "A clef"]],
      ["How many notes are in a triad?", "3", ["2", "5"]],
      ["Which notes make a C major triad?", "C E G", ["C D E", "C F A"]],
      ["Which notes make a G major triad?", "G B D", ["G A B", "G C E"]],
      ["Which notes make an F major triad?", "F A C", ["F G A", "F B D"]],
      ["Guitars strum chords. Is a strum one note or many notes at once?", "Many notes at once", ["One note", "No notes"], "🎸"],
      ["Notes played one after another make a...", "melody", ["chord", "triad"]],
      ["Two notes played together are not a triad because a triad needs...", "three notes", ["two notes", "ten notes"]]
    ], "A chord is notes at the same time. A triad has three.", "Chord = notes together. Triad = 3 notes. C major: C E G. G major: G B D. F major: F A C."),

    L("Groups of musicians", [
      ["Numbers", "1 2 3 4", "A <b>solo</b> is 1 player. A <b>duet</b> is 2. A <b>trio</b> is 3. A <b>quartet</b> is 4. A <b>quintet</b> is 5."],
      ["Bigger groups", "🎷🥁🎸", "A group of musicians playing together is an <b>ensemble</b>. A big group of singers is a <b>choir</b>."],
      ["Count by name", "🔢", "The beginning of the word gives a clue: tri = 3, quart = 4."]
    ], [
      ["How many players are in a duet?", "2", ["1", "3"]],
      ["How many players are in a trio?", "3", ["2", "4"]],
      ["How many players are in a quartet?", "4", ["3", "5"]],
      ["How many players are in a quintet?", "5", ["4", "6"]],
      ["What do we call one person playing alone?", "A solo", ["A duet", "A choir"]],
      ["What is any group of musicians playing together called?", "An ensemble", ["A clef", "A rest"]],
      ["Four singers make a...", "quartet", ["trio", "duet"]],
      ["Three violin players make a...", "trio", ["quartet", "solo"], "🎻"]
    ], "The number in the name tells how many players.", "Solo 1, duet 2, trio 3, quartet 4, quintet 5."),

    L("Musical texture", [
      ["Unison", "🗣️", "In <b>unison</b>, everyone plays or sings the same notes at the same time."],
      ["Melody and backing", "🎤🎸", "Often there is one <b>melody</b> with an <b>accompaniment</b> beneath it."],
      ["Many layers", "🔁", "A <b>round</b> layers the same tune starting at different times, so the music feels thick and full."]
    ], [
      ["When everyone plays the exact same notes together, it is called...", "unison", ["a round", "a solo"]],
      ["One tune with music supporting it is called melody with...", "accompaniment", ["unison", "silence"]],
      ["A round makes the music feel...", "layered and full", ["empty", "silent"]],
      ["When only one instrument plays alone, the sound is...", "thin", ["thick", "layered"]],
      ["When many instruments play many different parts, the sound is...", "thick", ["thin", "silent"]],
      ["A whole class singing the same tune together is singing in...", "unison", ["a round", "harmony"], "🧒"],
      ["A song where the tune is in the right hand and chords in the left has a melody and...", "accompaniment", ["unison", "tempo"], "🎹"],
      ["Which of these has the most layers?", "A round with four groups", ["One person humming", "A single clap"]]
    ], "Think about how many layers of sound you hear.", "Unison = same notes together. Melody + accompaniment = tune plus support. Round = layers."),

    L("Eras of music", [
      ["Time periods", "⏳", "Music from different times has different sounds. We call them <b>eras</b>."],
      ["Three eras", "🎼", "<b>Baroque</b> (Bach, Vivaldi, Handel) came first. <b>Classical</b> (Mozart, Haydn) came next. <b>Romantic</b> (Chopin, Tchaikovsky) came after that."],
      ["Order", "1 2 3", "The order is Baroque, then Classical, then Romantic."]
    ], [
      ["Which era did Bach write in?", "Baroque", ["Classical", "Romantic"]],
      ["Which era did Mozart write in?", "Classical", ["Baroque", "Romantic"]],
      ["Which era did Chopin write in?", "Romantic", ["Baroque", "Classical"]],
      ["Vivaldi, who wrote The Four Seasons, belongs to which era?", "Baroque", ["Romantic", "Classical"]],
      ["Which came first, Baroque or Classical?", "Baroque", ["Classical", "They are the same"]],
      ["Which came last of these three eras?", "Romantic", ["Baroque", "Classical"]],
      ["Chopin wrote mostly for which instrument?", "Piano", ["Tuba", "Drums"], "🎹"],
      ["Tchaikovsky, who wrote The Nutcracker, belongs to which era?", "Romantic", ["Baroque", "Classical"]]
    ], "Order the eras: Baroque, then Classical, then Romantic.", "Baroque: Bach, Vivaldi, Handel. Classical: Mozart, Haydn. Romantic: Chopin, Tchaikovsky."),

    L("Jobs in the orchestra", [
      ["Writers and leaders", "✍️🪄", "The <b>composer</b> writes the music. The <b>conductor</b> leads the players."],
      ["Others", "🎻", "The <b>concertmaster</b> is the leader of the first violins. A <b>soloist</b> plays a special featured part."],
      ["The book", "📖", "The <b>score</b> is the conductor's book showing every part. An <b>arranger</b> changes a tune for different instruments."]
    ], [
      ["Who writes the music?", "The composer", ["The conductor", "The audience"]],
      ["Who leads the orchestra with a baton?", "The conductor", ["The composer", "The soloist"]],
      ["Who leads the first violins?", "The concertmaster", ["The conductor", "The arranger"], "🎻"],
      ["A player with a special featured part is called a...", "soloist", ["trio", "composer"]],
      ["The conductor's book with every part is called the...", "score", ["tempo", "baton"], "📖"],
      ["Who changes a tune so different instruments can play it?", "An arranger", ["A conductor", "A soloist"]],
      ["What thin stick does a conductor use?", "A baton", ["A reed", "A bow"]],
      ["Do the people who listen help make the music?", "They are the audience", ["They are the composer", "They are the conductor"]]
    ], "Think about who writes, who leads, who plays a special part.", "Composer writes. Conductor leads. Concertmaster leads first violins. Soloist = featured. Arranger changes the music."),

    L("Music signs", [
      ["Pitch signs", "♯ ♭ ♮", "<b>♯ sharp</b> raises a note a half step. <b>♭ flat</b> lowers it. <b>♮ natural</b> cancels."],
      ["Direction signs", "𝄇", "A <b>repeat sign</b> says play again. A <b>fermata</b> says hold the note. A <b>tie</b> joins same-pitch notes."],
      ["Clefs", "🎼", "A <b>treble clef</b> is for higher notes. A <b>bass clef</b> is for lower notes."]
    ], [
      ["Which sign raises a note by a half step?", "Sharp", ["Flat", "Natural"], "♯"],
      ["Which sign lowers a note by a half step?", "Flat", ["Sharp", "Natural"], "♭"],
      ["Which sign cancels a sharp or flat?", "Natural", ["Sharp", "Flat"], "♮"],
      ["Which sign tells you to hold a note longer?", "Fermata", ["Repeat sign", "Flat"]],
      ["Which sign says to play a section again?", "Repeat sign", ["Fermata", "Natural"]],
      ["Which clef is used for low notes?", "Bass clef", ["Treble clef", "Time clef"]],
      ["Which clef is used for higher notes?", "Treble clef", ["Bass clef", "Sharp clef"]],
      ["Which curved line joins two notes of the same pitch?", "Tie", ["Bar line", "Clef"]]
    ], "Think about what each sign tells the player to do.", "Sharp up, flat down, natural cancels. Fermata holds. Repeat plays again. Tie joins same notes."),

    L("Italian music words", [
      ["Why Italian?", "🇮🇹", "Many music words come from Italian because early music publishing grew in Italy."],
      ["Smooth and short", "〰️", "<b>Legato</b> = smooth. <b>Staccato</b> = short. <b>Dolce</b> = sweetly."],
      ["Speed and loudness", "🐢🐇", "<b>Adagio</b> = slow. <b>Allegro</b> = fast. <b>Presto</b> = very fast. <b>Piano</b> = soft. <b>Forte</b> = loud."]
    ], [
      ["What does legato mean?", "Smooth", ["Short", "Loud"]],
      ["What does staccato mean?", "Short and detached", ["Smooth", "Slow"]],
      ["What does dolce mean?", "Sweetly", ["Loudly", "Angrily"]],
      ["What does adagio mean?", "Slow", ["Fast", "Very loud"]],
      ["What does presto mean?", "Very fast", ["Slow", "Soft"]],
      ["What does allegro mean?", "Fast and lively", ["Slow", "Sad"]],
      ["What does da capo mean?", "From the beginning", ["The end", "Louder"]],
      ["What does forte mean?", "Loud", ["Soft", "Fast"]]
    ], "Link the Italian word to its meaning from the lesson.", "Legato smooth. Staccato short. Dolce sweet. Adagio slow. Allegro fast. Presto very fast. Da capo from the start."),

    L("How sound is made", [
      ["Vibrations", "〰️", "Every sound is made by something <b>vibrating</b> (shaking back and forth very fast)."],
      ["Pitch", "🎚️", "Faster vibrations make a <b>higher</b> pitch. Slower vibrations make a <b>lower</b> pitch."],
      ["Size and strength", "🔊", "Short strings and small drums sound higher. Long strings and big drums sound lower. Hitting harder makes a louder sound."]
    ], [
      ["What makes sound?", "Vibrations", ["Colors", "Smells"]],
      ["Faster vibrations make a ___ pitch.", "higher", ["lower", "softer"]],
      ["Slower vibrations make a ___ pitch.", "lower", ["higher", "faster"]],
      ["A long guitar string sounds...", "lower", ["higher", "the same"], "🎸"],
      ["A short guitar string sounds...", "higher", ["lower", "the same"], "🎸"],
      ["A big drum usually sounds...", "lower", ["higher", "the same"], "🥁"],
      ["Hitting a drum harder makes it...", "louder", ["softer", "higher"]],
      ["Can sound travel through empty space with no air?", "No", ["Yes", "Only for drums"]]
    ], "Sound comes from shaking. More shakes each second means a higher pitch.", "Vibrations make sound. Fast = high. Slow = low. Long or big = lower. Hit harder = louder.")
  ];
  l6.push(
    MIX("Mixed practice", [l6[0], l6[2], l6[4], l6[7], l6[10], l6[13], l6[17]]),
    MIX("Level 6 Challenge", [l6[1], l6[3], l6[5], l6[6], l6[8], l6[9], l6[11], l6[12], l6[14], l6[16]])
  );

  Object.assign(MUSIC_LEVELS, { 4: l4, 5: l5, 6: l6 });
})();
