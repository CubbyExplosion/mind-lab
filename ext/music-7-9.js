// Mind Lab Music, levels 7-9 (extension file). 20 lessons per level.
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const A = s => String(s).replace(/♯/g, " sharp").replace(/♭/g, " flat");
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  // L(title, slides[[h,v,t]x3-4], items[[q, answer, [wrong...], visual?, clue?]], nudge, clue)
  const L = (title, slides, items, nudge, clue) => {
    const make = () => {
      const [q, a, w, v, c] = pick(items);
      const others = items.filter(x => x[1] !== a);
      const ex = pick(others.filter(x => !nz(x[0]).includes(nz(a))).concat(others));
      return {
        text: q, visual: v || undefined,
        choices: shuf([a, ...shuf(w.filter(x => x !== a)).slice(0, 2)]).map(A), answer: A(a),
        hints: [nudge, c || clue, `Example: ${ex[0]} The answer is "${A(ex[1])}". Now do yours.`]
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
  const CH = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  const sh = (n, one) => `${n} ${one}${n === 1 ? "" : "s"}`;

  // ======================= LEVEL 7 =======================
  const l7 = [
    L("Key signatures", [
      ["What is a key signature?", "♯ ♭", "A <b>key signature</b> is a group of sharps or flats at the start of each staff, right after the clef. It tells you which notes are always sharp or flat."],
      ["Counting sharps", "G = 1♯", "C major has none. <b>G major</b> has 1 sharp. <b>D major</b> has 2. <b>A major</b> has 3."],
      ["Counting flats", "F = 1♭", "<b>F major</b> has 1 flat. <b>B♭ major</b> has 2. <b>E♭ major</b> has 3."]
    ], [
      ["How many sharps are in the key of G major?", "1", ["0", "2"]],
      ["How many sharps are in the key of D major?", "2", ["1", "3"]],
      ["How many sharps are in the key of A major?", "3", ["2", "4"]],
      ["How many flats are in the key of F major?", "1", ["0", "2"]],
      ["How many flats are in the key of B♭ major?", "2", ["1", "3"]],
      ["How many flats are in the key of E♭ major?", "3", ["2", "4"]],
      ["Which major key has no sharps and no flats?", "C major", ["G major", "F major"]],
      ["Where is the key signature written?", "At the start of each staff", ["Only at the end of the song", "Under the notes"]],
      ["Which key has 2 sharps?", "D major", ["G major", "A major"]],
      ["Which key has 1 flat?", "F major", ["C major", "B♭ major"]]
    ], "Each new key in this lesson adds one more sharp or flat than the one before it.", "Think of the order: C has none, then G, D, A add sharps one at a time. F, B♭, E♭ add flats one at a time."),

    L("Order of sharps and flats", [
      ["Always the same order", "F C G D A E B", "Sharps are always added in the same order: <b>F♯, C♯, G♯, D♯, A♯, E♯, B♯</b>. Try: <i>Father Charles Goes Down And Ends Battle</i>."],
      ["Flats go backwards", "B E A D G C F", "Flats are added in the opposite order: <b>B♭, E♭, A♭, D♭, G♭, C♭, F♭</b>. Say it as <b>BEAD</b> then <b>G C F</b>."],
      ["Example", "D major", "D major has 2 sharps. They are the first two in the order: <b>F♯ and C♯</b>."]
    ], [
      ["Which is the FIRST sharp in any key signature?", "F♯", ["C♯", "B♯"]],
      ["Which is the SECOND sharp in any key signature?", "C♯", ["F♯", "G♯"]],
      ["Which is the THIRD sharp in any key signature?", "G♯", ["C♯", "D♯"]],
      ["Which is the FIRST flat in any key signature?", "B♭", ["F♭", "E♭"]],
      ["Which is the SECOND flat in any key signature?", "E♭", ["B♭", "A♭"]],
      ["Which is the THIRD flat in any key signature?", "A♭", ["E♭", "D♭"]],
      ["Which two sharps are in the key of D major?", "F♯ and C♯", ["F♯ and G♯", "C♯ and D♯"]],
      ["Which two flats are in the key of B♭ major?", "B♭ and E♭", ["B♭ and A♭", "E♭ and A♭"]],
      ["The order of flats is the ___ of the order of sharps.", "reverse", ["same", "double"]]
    ], "Remember the memory trick for the order. Count along it from the start.", "Start at the beginning of the order and count one by one until you reach the number you need."),

    L("Tempo ladder", [
      ["Italian tempo words", "🐢🚶🐇", "Composers use Italian words to show speed. From slow to fast: <b>Largo, Adagio, Andante, Moderato, Allegro, Presto</b>."],
      ["What they mean", "🎼", "<b>Largo</b> = very slow and broad. <b>Andante</b> = a walking speed. <b>Moderato</b> = medium. <b>Allegro</b> = fast and lively."],
      ["Extra word", "⚡", "<b>Vivace</b> means lively and quick. <b>Presto</b> is the fastest of the usual words."]
    ], [
      ["Which of these is the SLOWEST tempo?", "Largo", ["Andante", "Allegro"]],
      ["Which of these is the FASTEST tempo?", "Presto", ["Allegro", "Moderato"]],
      ["Which tempo word means a walking speed?", "Andante", ["Presto", "Largo"], "🚶"],
      ["Which tempo word means a medium speed?", "Moderato", ["Adagio", "Presto"]],
      ["Which is faster, Andante or Allegro?", "Allegro", ["Andante", "They are the same"]],
      ["Which is slower, Presto or Adagio?", "Adagio", ["Presto", "They are the same"]],
      ["What does Vivace mean?", "Lively and quick", ["Slow and calm", "Very soft"]],
      ["What does Largo mean?", "Very slow and broad", ["Fast and lively", "Medium loud"]],
      ["Which is faster, Moderato or Largo?", "Moderato", ["Largo", "They are the same"]]
    ], "Think of the ladder from the slowest word at the bottom to the fastest at the top.", "Picture a turtle for slow words, a person walking for the middle ones, and a rabbit for fast words."),

    L("The dynamics ladder", [
      ["Six steps", "pp p mp mf f ff", "From softest to loudest: <b>pp</b> (pianissimo), <b>p</b> (piano), <b>mp</b> (mezzo piano), <b>mf</b> (mezzo forte), <b>f</b> (forte), <b>ff</b> (fortissimo)."],
      ["Mezzo", "mp  mf", "<b>Mezzo</b> means medium. So mp is medium soft and mf is medium loud."],
      ["Changing", "< >", "<b>Crescendo</b> (&lt;) means get gradually louder. <b>Diminuendo</b> (&gt;) means get gradually softer."]
    ], [
      ["What does pp mean?", "Very soft", ["Very loud", "Medium loud"]],
      ["What does ff mean?", "Very loud", ["Very soft", "Medium soft"]],
      ["What does mf mean?", "Medium loud", ["Medium soft", "Very loud"]],
      ["What does mp mean?", "Medium soft", ["Medium loud", "Very soft"]],
      ["Which is louder, mp or mf?", "mf", ["mp", "They are the same"]],
      ["Which is softer, p or pp?", "pp", ["p", "They are the same"]],
      ["What does crescendo mean?", "Gradually louder", ["Gradually softer", "Suddenly stop"]],
      ["What does diminuendo mean?", "Gradually softer", ["Gradually louder", "Faster"]],
      ["What does the word mezzo mean?", "Medium", ["Very", "Little"]],
      ["Which sign is the loudest?", "ff", ["f", "mf"]]
    ], "Put the signs in a row from softest to loudest and find where this one fits.", "Extra letters make it stronger: two letters, like pp or ff, are the extremes."),

    L("Meet 6/8 time", [
      ["Eighth notes count", "6/8", "In <b>6/8</b> the bottom 8 means an <b>eighth note</b> is the unit. The top 6 means 6 eighth notes in each measure."],
      ["Two big pulses", "1 2 3 4 5 6", "6/8 is felt in <b>two groups of three</b>: 1-2-3, 4-5-6. The strongest beats are 1 and 4. It feels like a gentle rocking."],
      ["Other examples", "9/8  12/8", "<b>9/8</b> has three groups of three. <b>12/8</b> has four groups of three. A dotted quarter note equals 3 eighth notes."]
    ], [
      ["How many eighth notes fill one measure of 6/8?", "6", ["3", "8"]],
      ["In 6/8, the eighth notes are felt in groups of...", "3", ["2", "4"]],
      ["How many big pulses (groups) does 6/8 have?", "2", ["3", "6"]],
      ["Which beats are the strongest in 6/8?", "1 and 4", ["1 and 3", "2 and 5"]],
      ["How many eighth notes fill one measure of 9/8?", "9", ["6", "8"]],
      ["How many groups of three are in 12/8?", "4", ["2", "3"]],
      ["A dotted quarter note equals how many eighth notes?", "3", ["2", "4"]],
      ["How many eighth notes fill one measure of 3/8?", "3", ["6", "8"]],
      ["Which time signature feels like 2 big pulses, each with 3 parts?", "6/8", ["4/4", "3/4"]]
    ], "The top number counts eighth notes. Then think of grouping them in threes.", "Count the eighth notes, then split them into groups of three to find the big pulses."),

    L("The bottom number", [
      ["What is the bottom number?", "4/4", "The <b>bottom number</b> of a time signature tells which kind of note gets one beat."],
      ["The code", "4 = ♩  8 = ♪  2 = 𝅗𝅥", "Bottom <b>4</b> = a quarter note gets the beat. Bottom <b>8</b> = an eighth note gets the beat. Bottom <b>2</b> = a half note gets the beat."],
      ["Shortcuts", "C", "A big <b>C</b> sign is <b>common time</b>, the same as 4/4. A C with a line through it is <b>cut time</b>, the same as 2/2."]
    ], [
      ["In 3/4 time, which note gets one beat?", "Quarter note", ["Eighth note", "Half note"]],
      ["In 6/8 time, which note is the unit?", "Eighth note", ["Quarter note", "Half note"]],
      ["In 2/2 time, which note gets one beat?", "Half note", ["Quarter note", "Eighth note"]],
      ["In 4/4 time, which note gets one beat?", "Quarter note", ["Half note", "Eighth note"]],
      ["In 3/8 time, which note is the unit?", "Eighth note", ["Quarter note", "Half note"]],
      ["How many quarter notes fill one measure of 3/4?", "3", ["4", "6"]],
      ["How many half notes fill one measure of 2/2?", "2", ["4", "1"]],
      ["How many eighth notes fill one measure of 3/8?", "3", ["8", "4"]],
      ["A big letter C at the start of the music is another name for...", "4/4", ["2/4", "6/8"], "C"],
      ["A C with a line through it (cut time) is another name for...", "2/2", ["4/4", "3/4"]]
    ], "Look at the bottom number first. It names the note that gets the beat.", "Match the bottom number to a note: 2, 4 or 8. Then use the top number to count how many fit."),

    L("Rest values", [
      ["Silence has length", "🤫", "Every rest is a silence that lasts as long as its note. A <b>quarter rest</b> = 1 beat. A <b>half rest</b> = 2 beats. A <b>whole rest</b> = 4 beats in 4/4."],
      ["A whole measure", "▬", "A whole rest means a whole <b>measure</b> of silence, in any time signature. It <b>hangs</b> below a line. A half rest <b>sits</b> on top of a line, like a little hat."],
      ["Small rests", "𝄾", "An <b>eighth rest</b> lasts half a beat. Two eighth rests make one beat of silence."]
    ], [
      ["How many beats is a half rest?", "2", ["1", "4"]],
      ["How many beats is a quarter rest?", "1", ["2", "4"]],
      ["How many beats is a whole rest in 4/4?", "4", ["2", "1"]],
      ["A whole rest in 3/4 time lasts...", "The whole measure (3 beats)", ["4 beats", "2 beats"]],
      ["How long does an eighth rest last?", "Half a beat", ["One beat", "Two beats"]],
      ["Which rest hangs below a line?", "Whole rest", ["Half rest", "Quarter rest"]],
      ["Which rest sits on top of a line like a hat?", "Half rest", ["Whole rest", "Eighth rest"]],
      ["In 4/4: a quarter note, a quarter rest and a half note. How many beats?", "4", ["3", "5"]],
      ["In 4/4: a half note and a half rest. How many beats?", "4", ["2", "3"]],
      ["Two eighth rests together last...", "One beat", ["Half a beat", "Two beats"]]
    ], "A rest lasts as long as the note with the same name.", "Add up the beats one at a time. Remember that a rest counts as time, even though you play nothing."),

    L("Triplets", [
      ["Three in the space of two", "♪♪♪ 3", "A <b>triplet</b> squeezes <b>3 equal notes</b> into the time normally taken by 2 notes of the same kind. A small number <b>3</b> marks it."],
      ["Counting", "tri-p-let", "An eighth-note triplet puts 3 notes in <b>one beat</b>. Say it: <i>tri-pl-et, tri-pl-et</i>. Two eighth notes in a beat sound like <i>1-and</i>."],
      ["Bigger triplets", "♩♩♩ 3", "A <b>quarter-note triplet</b> puts 3 quarter notes in the time of 2 quarter notes, which is 2 beats."]
    ], [
      ["How many notes are in a triplet?", "3", ["2", "4"]],
      ["An eighth-note triplet fits into how many beats?", "1", ["2", "3"]],
      ["A quarter-note triplet fits into how many beats?", "2", ["1", "3"]],
      ["Which gives more notes in one beat: two eighth notes or an eighth-note triplet?", "The triplet", ["The two eighth notes", "They are equal"]],
      ["What small number is written over a triplet?", "3", ["2", "6"]],
      ["How many eighth-note triplets fit into 2 beats?", "6", ["4", "3"]],
      ["How many eighth-note triplets fit into 4 beats?", "12", ["8", "6"]],
      ["A triplet divides a beat into how many equal parts?", "3", ["2", "4"]],
      ["Normally one beat splits into 2 eighth notes. A triplet splits it into...", "3 equal notes", ["4 equal notes", "5 equal notes"]]
    ], "A triplet means three equal parts. Count how many triplets fit in each beat.", "If one beat holds a triplet of 3 notes, multiply 3 by the number of beats."),

    L("Syncopation", [
      ["Strong and weak", "1 2 3 4", "In 4/4 the strong beats are <b>1 and 3</b>. Beats 2 and 4 are weaker."],
      ["Surprise!", "😮", "<b>Syncopation</b> puts the accent on a weak beat or between beats. It makes the rhythm feel bouncy and unexpected."],
      ["Where to hear it", "🎷", "Syncopation is a big part of <b>ragtime</b>, <b>jazz</b> and pop music. A tie across the strong beat can make it."]
    ], [
      ["Syncopation puts the accent on...", "Weak beats or off-beats", ["Only beat 1", "No beats"]],
      ["Syncopated music feels...", "Bouncy and surprising", ["Perfectly even", "Silent"]],
      ["In 4/4, which beats are the strong ones?", "1 and 3", ["2 and 4", "Only 4"]],
      ["Which kind of music uses a lot of syncopation?", "Ragtime and jazz", ["Only lullabies", "None"], "🎷"],
      ["A steady march with accents on every strong beat is...", "Not syncopated", ["Syncopated", "A rest"]],
      ["An accent between the beats is called...", "Syncopation", ["A fermata", "A bar line"]],
      ["Which is a good description of syncopation?", "An unexpected accent", ["A very long rest", "A loud ending"]],
      ["In 4/4, which beats are the weaker ones?", "2 and 4", ["1 and 3", "Only 1"]],
      ["A tie that links a weak beat to the next strong beat can create...", "Syncopation", ["A key signature", "A chord"]]
    ], "Think about where the emphasis falls. Is it where you expect it, or somewhere else?", "Strong beats are expected. When the accent lands on an off-beat, the rhythm is syncopated."),

    L("Names of scale degrees", [
      ["Each note has a name", "1 2 3 4 5 6 7", "The 7 notes of a scale have names: 1 <b>tonic</b>, 2 <b>supertonic</b>, 3 <b>mediant</b>, 4 <b>subdominant</b>, 5 <b>dominant</b>, 6 <b>submediant</b>, 7 <b>leading tone</b>."],
      ["Important ones", "🏠", "The <b>tonic</b> is home. The <b>dominant</b> is the 5th note. The <b>leading tone</b> is the 7th. It \"leads\" up to the tonic."],
      ["In a key", "C major", "In C major: tonic = C, subdominant = F, dominant = G. In G major: tonic = G, dominant = D."]
    ], [
      ["What is the first note of a scale called?", "Tonic", ["Dominant", "Mediant"]],
      ["What is the 5th note of a scale called?", "Dominant", ["Tonic", "Subdominant"]],
      ["What is the 4th note of a scale called?", "Subdominant", ["Dominant", "Mediant"]],
      ["What is the 7th note of a scale called?", "Leading tone", ["Tonic", "Mediant"]],
      ["What is the 3rd note of a scale called?", "Mediant", ["Dominant", "Tonic"]],
      ["What is the 2nd note of a scale called?", "Supertonic", ["Subdominant", "Tonic"]],
      ["In C major, which note is the tonic?", "C", ["G", "F"]],
      ["In C major, which note is the dominant?", "G", ["C", "F"]],
      ["In G major, which note is the dominant?", "D", ["G", "C"]],
      ["In F major, which note is the tonic?", "F", ["C", "B♭"]]
    ], "Count along the scale to find the degree number first, then recall its name.", "Tonic is number 1 and dominant is number 5. Count up from the key's first note."),

    L("The major scale pattern", [
      ["Steps", "W W H W W W H", "A major scale always follows the same pattern of steps: <b>W W H W W W H</b>. W = whole step, H = half step."],
      ["Half step, whole step", "C D", "A <b>half step</b> is the very next key. A <b>whole step</b> is two half steps, skipping one key. C to D is a whole step."],
      ["On the keyboard", "E F   B C", "There is no black key between <b>E and F</b> or between <b>B and C</b>. Those pairs are half steps."]
    ], [
      ["How many steps are in a major scale (from the first note to the octave)?", "7", ["5", "8"]],
      ["The major scale pattern starts with...", "Whole, whole, half", ["Half, half, whole", "Whole, half, whole"]],
      ["The major scale pattern ends with a...", "Half step", ["Whole step", "Skip"]],
      ["A whole step is equal to how many half steps?", "2", ["1", "3"]],
      ["Which two white keys are a half step apart?", "E and F", ["C and D", "G and A"]],
      ["Which two white keys are a half step apart?", "B and C", ["D and E", "F and G"]],
      ["C to D is a...", "Whole step", ["Half step", "Third"]],
      ["How many half steps are in a major scale pattern?", "2", ["1", "3"]],
      ["How many whole steps are in a major scale pattern?", "5", ["3", "7"]]
    ], "Look at the keyboard: is there a key between the two notes, or not?", "No key between = half step. One key between = whole step. Then match to the pattern."),

    L("G, D and F major scales", [
      ["G major", "G A B C D E F♯", "The G major scale is <b>G A B C D E F♯</b>. The 7th note must be raised to F♯ to keep the pattern."],
      ["D major", "D E F♯ G A B C♯", "D major is <b>D E F♯ G A B C♯</b>. It has two sharps, which match its key signature."],
      ["F major", "F G A B♭ C D E", "F major is <b>F G A B♭ C D E</b>. The 4th note is lowered to B♭."]
    ], [
      ["Which note in G major is sharp?", "F♯", ["C♯", "B♯"]],
      ["Which note in F major is flat?", "B♭", ["E♭", "A♭"]],
      ["What are the two sharps in D major?", "F♯ and C♯", ["F♯ and G♯", "C♯ and D♯"]],
      ["What is the 7th note of G major?", "F♯", ["F", "E"]],
      ["What is the 4th note of F major?", "B♭", ["B", "C"]],
      ["What is the 3rd note of D major?", "F♯", ["F", "G"]],
      ["What is the last note (top) of the G major scale?", "G", ["F♯", "A"]],
      ["What is the 2nd note of D major?", "E", ["F♯", "D"]],
      ["What is the 5th note of G major?", "D", ["C", "E"]],
      ["What is the 7th note of D major?", "C♯", ["C", "B"]]
    ], "Count along the scale from the key note, and remember the sharps or flat for that key.", "Use the key signature: sharps in G and D, a flat in F. Then count up the letters."),

    L("Relative minor keys", [
      ["Sharing a signature", "C ↔ Am", "Every major key has a <b>relative minor</b> that uses the same key signature. C major and A minor both have no sharps or flats."],
      ["How to find it", "6th", "The relative minor starts on the <b>6th note</b> of the major scale (3 half steps down)."],
      ["Examples", "G ↔ Em", "G major → <b>E minor</b>. D major → <b>B minor</b>. F major → <b>D minor</b>. B♭ major → <b>G minor</b>."]
    ], [
      ["What is the relative minor of C major?", "A minor", ["E minor", "D minor"]],
      ["What is the relative minor of G major?", "E minor", ["A minor", "B minor"]],
      ["What is the relative minor of F major?", "D minor", ["A minor", "G minor"]],
      ["What is the relative minor of D major?", "B minor", ["E minor", "D minor"]],
      ["What is the relative minor of B♭ major?", "G minor", ["D minor", "E minor"]],
      ["The relative minor starts on which note of the major scale?", "The 6th", ["The 3rd", "The 5th"]],
      ["Do relative keys share the same key signature?", "Yes", ["No", "Only sometimes"]],
      ["How many sharps or flats does A minor have?", "None", ["One sharp", "One flat"]],
      ["How many sharps does E minor have?", "One", ["None", "Two"]]
    ], "The relative minor begins on the 6th note of the major scale.", "Count 1 to 6 up the major scale. Or go down 3 half steps from the major key's name."),

    L("Same sound, two names", [
      ["Enharmonic", "C♯ = D♭", "Some notes sound exactly the same but have two names. They are called <b>enharmonic</b> notes."],
      ["On the keyboard", "🎹", "The black key between C and D can be called <b>C♯</b> (one up from C) or <b>D♭</b> (one down from D). It is the same key."],
      ["More pairs", "F♯ = G♭", "<b>D♯ = E♭</b>, <b>F♯ = G♭</b>, <b>G♯ = A♭</b>, <b>A♯ = B♭</b>."]
    ], [
      ["What is another name for C♯?", "D♭", ["B♭", "E♭"]],
      ["What is another name for E♭?", "D♯", ["F♯", "C♯"]],
      ["What is another name for G♭?", "F♯", ["G♯", "A♭"]],
      ["What is another name for A♭?", "G♯", ["F♯", "A♯"]],
      ["What is another name for B♭?", "A♯", ["G♯", "C♯"]],
      ["What is another name for F♯?", "G♭", ["E♭", "A♭"]],
      ["Notes that sound the same but have different names are called...", "Enharmonic", ["Harmonic", "Dynamic"]],
      ["On the piano, C♯ and D♭ are...", "The same key", ["Two different keys", "A white key and a black key"], "🎹"],
      ["What is another name for D♯?", "E♭", ["C♯", "D♭"]]
    ], "A sharp is one key up. A flat is one key down. Find the same black key from the other side.", "If the sharp is one above a white note, look for the next white note and go one down."),

    L("The conductor and the score", [
      ["The leader", "🎼", "The <b>conductor</b> stands in front of the orchestra and leads it. A thin stick called a <b>baton</b> is often used."],
      ["What they show", "👋", "The conductor shows the <b>tempo</b> (speed), <b>dynamics</b> (loud or soft) and when each group should start."],
      ["The score", "📜", "The <b>score</b> has the music for every instrument, one above the other. Each player reads just their own <b>part</b>."]
    ], [
      ["Who leads an orchestra?", "The conductor", ["The audience", "The composer"]],
      ["What is the thin stick a conductor may hold called?", "A baton", ["A bow", "A mallet"]],
      ["What is the music for all the instruments together called?", "A score", ["A part", "A bar"]],
      ["What is the music for just one player called?", "A part", ["A score", "A key"]],
      ["Which of these does a conductor show with their hands?", "Tempo and dynamics", ["The weather", "The key signature"]],
      ["The leader of the first violins is called the...", "Concertmaster", ["Composer", "Librettist"]],
      ["Which instrument usually plays the tuning note for the orchestra?", "Oboe", ["Drum", "Tuba"]],
      ["What do players put their music on?", "A music stand", ["A podium", "A baton"]],
      ["The raised platform the conductor stands on is called the...", "Podium", ["Stage door", "Score"]]
    ], "Think about who is in charge, and who has music for everyone.", "The score is the whole picture. A part is only one player's piece of it."),

    L("Highest to lowest", [
      ["Size matters", "📏", "In an instrument family, the <b>smaller</b> instruments sound <b>higher</b> and the <b>bigger</b> ones sound <b>lower</b>."],
      ["Strings and woodwinds", "🎻", "Strings, high to low: <b>violin, viola, cello, double bass</b>. Woodwinds: <b>piccolo, flute, oboe, clarinet, bassoon</b>."],
      ["Brass", "🎺", "Brass, high to low: <b>trumpet, French horn, trombone, tuba</b>."]
    ], [
      ["Which string instrument sounds the lowest?", "Double bass", ["Violin", "Viola"]],
      ["Which string instrument sounds the highest?", "Violin", ["Cello", "Double bass"]],
      ["Which brass instrument sounds the lowest?", "Tuba", ["Trumpet", "French horn"]],
      ["Which brass instrument sounds the highest?", "Trumpet", ["Tuba", "Trombone"]],
      ["Which woodwind is the highest of all?", "Piccolo", ["Bassoon", "Clarinet"]],
      ["Which sounds lower, the viola or the cello?", "Cello", ["Viola", "They are the same"]],
      ["Which sounds higher, the flute or the bassoon?", "Flute", ["Bassoon", "They are the same"]],
      ["A bigger instrument in the same family usually sounds...", "Lower", ["Higher", "The same"]],
      ["Which sounds lower, the trombone or the trumpet?", "Trombone", ["Trumpet", "They are the same"]]
    ], "Think about size. Bigger usually means lower.", "Order each family from the smallest instrument to the biggest. Small is high and big is low."),

    L("Famous works", [
      ["Pieces of music", "🎼", "Composers write <b>works</b>. Some are so famous that people know the name. Vivaldi wrote <i>The Four Seasons</i>. Tchaikovsky wrote <i>The Nutcracker</i>."],
      ["More", "🎹", "Beethoven wrote nine symphonies, including the famous <i>Fifth</i> (da-da-da-DUM). Handel wrote <i>Messiah</i>. Mozart wrote the opera <i>The Magic Flute</i>."],
      ["Stories in music", "🐦", "Prokofiev wrote <i>Peter and the Wolf</i>. Saint-Saëns wrote <i>Carnival of the Animals</i>. Debussy wrote <i>Clair de Lune</i> for piano."]
    ], [
      ["Who wrote The Four Seasons?", "Vivaldi", ["Handel", "Chopin"]],
      ["Who wrote The Nutcracker ballet music?", "Tchaikovsky", ["Mozart", "Bach"]],
      ["Who wrote Peter and the Wolf?", "Prokofiev", ["Beethoven", "Debussy"]],
      ["Who wrote Carnival of the Animals?", "Saint-Saëns", ["Vivaldi", "Haydn"]],
      ["Who wrote the opera The Magic Flute?", "Mozart", ["Bach", "Handel"]],
      ["Who wrote the oratorio Messiah?", "Handel", ["Mozart", "Debussy"]],
      ["The da-da-da-DUM opening belongs to Symphony No. 5 by...", "Beethoven", ["Mozart", "Vivaldi"]],
      ["Clair de Lune is a piano piece by...", "Debussy", ["Beethoven", "Handel"], "🎹"],
      ["Which composer wrote the Brandenburg Concertos?", "Bach", ["Chopin", "Prokofiev"]]
    ], "Match each famous work to the composer you learned about.", "Think of the story or the instrument in the title. It helps you remember who wrote it."),

    L("Choir voices", [
      ["Four main voices", "S A T B", "A choir has four main parts: <b>soprano</b> (highest), <b>alto</b>, <b>tenor</b> and <b>bass</b> (lowest). We write them <b>SATB</b>."],
      ["Who sings what", "🎤", "Sopranos and altos are usually higher voices. Tenors and basses are usually lower voices."],
      ["Ways to sing", "🎶", "<b>Solo</b> = one singer. <b>Duet</b> = two. <b>A cappella</b> = singing without any instruments. <b>Unison</b> = everyone on the same notes."]
    ], [
      ["Which is the highest choir voice?", "Soprano", ["Alto", "Bass"]],
      ["Which is the lowest choir voice?", "Bass", ["Tenor", "Alto"]],
      ["What does SATB stand for?", "Soprano, Alto, Tenor, Bass", ["Slow, Alto, Tune, Beat", "Sing, Act, Talk, Bow"]],
      ["Which is higher, an alto or a tenor?", "Alto", ["Tenor", "They are the same"]],
      ["Singing without any instruments is called...", "A cappella", ["Solo", "Duet"]],
      ["One singer on their own is a...", "Solo", ["Duet", "Choir"]],
      ["Two singers together make a...", "Duet", ["Solo", "Trio"]],
      ["Everyone singing the same notes is called...", "Unison", ["Harmony", "A round"]],
      ["Which voice sits between alto and bass?", "Tenor", ["Soprano", "Alto"]]
    ], "Think of the voices lined up from the highest to the lowest.", "S and A are the high ones. T and B are the low ones. The order of the letters is high to low.")
  ];
  l7.push(
    MIX("Mixed practice", [l7[0], l7[2], l7[3], l7[5], l7[9], l7[10], l7[13], l7[15]]),
    MIX("Level 7 Challenge", [l7[1], l7[4], l7[6], l7[7], l7[8], l7[11], l7[12], l7[14], l7[16], l7[17]])
  );

  // ======================= LEVEL 8 =======================
  // rhythm arithmetic
  const NV = [["whole note", 4], ["dotted half note", 3], ["half note", 2], ["dotted quarter note", 1.5], ["quarter note", 1], ["eighth note", 0.5], ["sixteenth note", 0.25]];
  const beatTxt = n => { const w = Math.floor(n), f = { 0: "", 0.25: "a quarter", 0.5: "a half", 0.75: "three quarters" }[n - w]; return f === undefined ? String(n) : (w ? w + (f ? " and " + f : "") : f); };
  const rhythmMath = () => {
    const k = ri(2, 4), parts = [];
    for (let i = 0; i < k; i++) parts.push(pick(NV.slice(1)));
    const tot = parts.reduce((s, p) => s + p[1], 0);
    const names = parts.map(p => p[0]).join(" + ");
    const wr = shuf([tot + 0.5, tot + 1, tot - 0.5, tot - 1, tot + 0.25, tot * 2].filter((x, i, a) => x > 0 && x !== tot && a.indexOf(x) === i)).slice(0, 2);
    const ex = tot === 4 ? ["half note + quarter note + eighth note + eighth note", "2 + 1 + ½ + ½ = 4"] : ["quarter note + quarter note + half note", "1 + 1 + 2 = 4"];
    return {
      text: `In beats, how long is: ${names}?`, visual: "🥁",
      choices: shuf([tot, ...wr].map(beatTxt)), answer: beatTxt(tot),
      hints: ["Find the number of beats for each note, then add them up.", "A quarter note is 1 beat. Half the value is an eighth note, double the value is a half note. A dot adds half again.", `Example: ${ex[0]} = ${ex[1]} beats. Now do yours.`]
    };
  };
  const measureMissing = () => {
    const top = pick([3, 4]), a = pick([[ "half note", 2 ], ["quarter note", 1], ["dotted quarter note", 1.5], ["eighth note", 0.5]]);
    const b = pick([["quarter note", 1], ["eighth note", 0.5], ["half note", 2]]);
    const have = a[1] + b[1];
    if (have >= top) return measureMissing();
    const miss = top - have;
    const wr = shuf([miss + 0.5, miss + 1, miss - 0.5, miss + 1.5].filter(x => x > 0 && x !== miss)).slice(0, 2);
    return {
      text: `A ${top}/4 measure has a ${a[0]} and a ${b[0]}. How many beats are still missing?`, visual: "🎼",
      choices: shuf([miss, ...wr].map(beatTxt)), answer: beatTxt(miss),
      hints: ["A measure must be completely full. First work out how many beats it holds.", `The top number says the measure holds ${top} beats. Add up the beats you already have and subtract.`, "Example: a 4/4 measure with a half note and a quarter note has 2 + 1 = 3 beats. 4 - 3 = 1 beat missing. Now do yours."]
    };
  };

  const l8 = [
    L("Flat keys", [
      ["Keys with flats", "♭", "F major has <b>1 flat</b> (B♭). B♭ major has <b>2 flats</b> (B♭, E♭). E♭ major has <b>3 flats</b> (B♭, E♭, A♭). A♭ major has <b>4 flats</b>."],
      ["A trick", "🔎", "In a flat key, the <b>second-to-last flat</b> is the name of the key. For B♭ E♭ A♭, the second-to-last flat is E♭, so the key is E♭ major."],
      ["F is special", "F", "F major has only one flat, so use the memory: <b>F major has one flat, B♭</b>."]
    ], [
      ["How many flats does B♭ major have?", "2", ["1", "3"]],
      ["How many flats does E♭ major have?", "3", ["2", "4"]],
      ["How many flats does A♭ major have?", "4", ["3", "5"]],
      ["How many flats does F major have?", "1", ["2", "0"]],
      ["Which major key has the flats B♭, E♭ and A♭?", "E♭ major", ["B♭ major", "A♭ major"]],
      ["Which major key has the flats B♭ and E♭?", "B♭ major", ["E♭ major", "F major"]],
      ["Which major key has the flats B♭, E♭, A♭ and D♭?", "A♭ major", ["E♭ major", "D♭ major"]],
      ["Which major key has just one flat?", "F major", ["B♭ major", "C major"]],
      ["In a flat key, which flat names the key?", "The second-to-last one", ["The first one", "The last one"]],
      ["Which flat is the third one added?", "A♭", ["D♭", "E♭"]]
    ], "Count the flats, or use the second-to-last flat trick.", "Look at the flats in order: B♭, E♭, A♭, D♭. Go to the second-to-last one."),

    L("The circle of fifths", [
      ["A clock of keys", "🕛", "The <b>circle of fifths</b> is a circle of 12 keys. C is at the top, like 12 o'clock."],
      ["Going clockwise", "C G D A E B", "Moving <b>clockwise</b> goes up a fifth each time and adds a <b>sharp</b>: C, G (1♯), D (2♯), A (3♯), E (4♯), B (5♯)."],
      ["Going counterclockwise", "C F B♭ E♭ A♭", "Moving <b>counterclockwise</b> goes down a fifth and adds a <b>flat</b>: C, F (1♭), B♭ (2♭), E♭ (3♭), A♭ (4♭)."]
    ], [
      ["Going clockwise from C, which key comes next?", "G", ["F", "D"]],
      ["Going clockwise from G, which key comes next?", "D", ["C", "A"]],
      ["Going clockwise from D, which key comes next?", "A", ["G", "E"]],
      ["Going clockwise from A, which key comes next?", "E", ["D", "B"]],
      ["Going counterclockwise from C, which key comes next?", "F", ["G", "B♭"]],
      ["Going counterclockwise from F, which key comes next?", "B♭", ["C", "E♭"]],
      ["Going counterclockwise from B♭, which key comes next?", "E♭", ["F", "A♭"]],
      ["Each step clockwise adds one...", "Sharp", ["Flat", "Rest"]],
      ["Each step counterclockwise adds one...", "Flat", ["Sharp", "Beat"]],
      ["How many keys are on the circle of fifths?", "12", ["7", "8"]],
      ["Which key has 5 sharps?", "B major", ["E major", "A major"]]
    ], "Decide whether you are going clockwise (sharps) or counterclockwise (flats).", "Start at C and move one place at a time in the direction you need."),

    L("Three minor scales", [
      ["Natural minor", "A B C D E F G", "The <b>natural minor</b> scale uses only the notes of its relative major. A natural minor has no sharps or flats: A B C D E F G A."],
      ["Harmonic minor", "G♯", "In the <b>harmonic minor</b> scale the <b>7th note is raised</b> by a half step. In A harmonic minor, G becomes <b>G♯</b>."],
      ["Melodic minor", "↗ ↘", "In the <b>melodic minor</b> scale the <b>6th and 7th notes are raised going up</b>, and it goes back to the natural minor coming down."]
    ], [
      ["Which minor scale raises only the 7th note?", "Harmonic minor", ["Natural minor", "Melodic minor"]],
      ["Which minor scale raises the 6th and 7th notes going up?", "Melodic minor", ["Harmonic minor", "Natural minor"]],
      ["Which minor scale has no raised notes?", "Natural minor", ["Harmonic minor", "Melodic minor"]],
      ["In A harmonic minor, which note is raised?", "G (to G♯)", ["F (to F♯)", "B (to B♭)"]],
      ["Which notes does A natural minor use?", "All white keys", ["Two black keys", "Only black keys"]],
      ["The melodic minor scale going DOWN is the same as...", "Natural minor", ["Harmonic minor", "Major"]],
      ["How many notes does a minor scale have before the octave?", "7", ["5", "8"]],
      ["In A melodic minor going up, the 6th and 7th notes are...", "F♯ and G♯", ["F and G", "E♭ and F♯"]],
      ["Which scale is the same as the relative major starting on its 6th note?", "Natural minor", ["Harmonic minor", "Melodic minor"]]
    ], "Think about which notes each scale changes. One of them changes nothing.", "Natural: no changes. Harmonic: one change. Melodic: two changes when going up."),

    L("Four kinds of triads", [
      ["Built with thirds", "C E G", "A <b>triad</b> stacks two thirds on top of a root note. The kind of thirds decides the sound."],
      ["Four types", "M m ° +", "<b>Major</b> = major third + minor third (bright). <b>Minor</b> = minor third + major third (darker). <b>Diminished</b> = two minor thirds (tense). <b>Augmented</b> = two major thirds (strange and floating)."],
      ["Example", "C E G", "C E G is C major. Lower the E to E♭ and you get C minor (C E♭ G)."]
    ], [
      ["How many notes are in a triad?", "3", ["2", "4"]],
      ["C E G is which kind of triad?", "Major", ["Minor", "Diminished"]],
      ["C E♭ G is which kind of triad?", "Minor", ["Major", "Augmented"]],
      ["C E♭ G♭ is which kind of triad?", "Diminished", ["Major", "Minor"]],
      ["C E G♯ is which kind of triad?", "Augmented", ["Minor", "Diminished"]],
      ["A major triad has a ___ third above the root.", "major", ["minor", "perfect"]],
      ["A minor triad has a ___ third above the root.", "minor", ["major", "perfect"]],
      ["A triad is built by stacking...", "Thirds", ["Fifths only", "Octaves"]],
      ["Which triad sounds tense and unsettled?", "Diminished", ["Major", "Minor"]]
    ], "Look at the third (the middle note). Is it major or minor? Then look at the top note.", "Compare with C E G, which is major. Lowering the third makes it minor."),

    L("Chords I, IV and V", [
      ["Roman numerals", "I IV V", "We name chords by the scale note they are built on. <b>I</b> is built on note 1, <b>IV</b> on note 4 and <b>V</b> on note 5."],
      ["In C major", "C F G", "In C major: <b>I = C</b>, <b>IV = F</b>, <b>V = G</b>. In G major: I = G, IV = C, V = D."],
      ["A lot of songs", "🎸", "Many folk, rock and blues songs use only I, IV and V. They are the most important chords."]
    ], [
      ["In C major, which chord is the I chord?", "C", ["F", "G"]],
      ["In C major, which chord is the IV chord?", "F", ["G", "D"]],
      ["In C major, which chord is the V chord?", "G", ["F", "A"]],
      ["In G major, which chord is the IV chord?", "C", ["D", "G"]],
      ["In G major, which chord is the V chord?", "D", ["C", "E"]],
      ["In D major, which chord is the V chord?", "A", ["G", "E"]],
      ["In D major, which chord is the IV chord?", "G", ["A", "C"]],
      ["In F major, which chord is the V chord?", "C", ["B♭", "G"]],
      ["In F major, which chord is the IV chord?", "B♭", ["C", "D"]],
      ["The Roman numeral V means a chord built on which scale note?", "The 5th", ["The 4th", "The 1st"]]
    ], "Number the scale notes of the key, then pick the note the numeral points to.", "Count up the scale: I is 1, IV is 4, V is 5. The chord name is that note's letter."),

    L("Cadences", [
      ["Musical punctuation", "🎼", "A <b>cadence</b> is a short chord pattern that ends a phrase, like punctuation in a sentence."],
      ["Authentic and plagal", "V → I   IV → I", "<b>Authentic cadence</b> (V → I) sounds finished, like a full stop. <b>Plagal cadence</b> (IV → I) is the \"Amen\" ending."],
      ["Half and deceptive", "V   V → vi", "<b>Half cadence</b> ends on V and feels unfinished, like a comma. <b>Deceptive cadence</b> (V → vi) is a surprise."]
    ], [
      ["Which cadence is V → I?", "Authentic", ["Plagal", "Half"]],
      ["Which cadence is IV → I (the \"Amen\" ending)?", "Plagal", ["Authentic", "Deceptive"]],
      ["Which cadence ends on V and feels unfinished?", "Half cadence", ["Authentic cadence", "Plagal cadence"]],
      ["Which cadence is V → vi?", "Deceptive", ["Authentic", "Half"]],
      ["Which cadence sounds like a full stop?", "Authentic", ["Half", "Deceptive"]],
      ["A half cadence feels like a...", "Comma", ["Full stop", "Question mark only"]],
      ["A deceptive cadence feels like a...", "Surprise", ["Full stop", "Comma"]],
      ["A cadence is like ___ in a sentence.", "Punctuation", ["A noun", "A title"]],
      ["Which two chords form an authentic cadence?", "V then I", ["I then IV", "IV then V"]]
    ], "Think of each cadence as a punctuation mark. Which one finishes, and which one pauses?", "Authentic goes home to I. Half stops on V. Plagal uses IV. Deceptive goes to vi."),

    L("Intervals in half steps", [
      ["Measuring distance", "📏", "An <b>interval</b> is the distance between two notes. We can count it in <b>half steps</b> (the very next key, black or white)."],
      ["The main ones", "m2 M2 m3 M3", "<b>Minor 2nd</b> = 1 half step. <b>Major 2nd</b> = 2. <b>Minor 3rd</b> = 3. <b>Major 3rd</b> = 4."],
      ["Bigger ones", "P4 P5 8", "<b>Perfect 4th</b> = 5. <b>Perfect 5th</b> = 7. <b>Octave</b> = 12 half steps."]
    ], [
      ["How many half steps are in a major 3rd?", "4", ["3", "5"]],
      ["How many half steps are in a minor 3rd?", "3", ["4", "2"]],
      ["How many half steps are in a perfect 5th?", "7", ["5", "6"]],
      ["How many half steps are in a perfect 4th?", "5", ["4", "7"]],
      ["How many half steps are in an octave?", "12", ["8", "10"]],
      ["How many half steps are in a major 2nd?", "2", ["1", "3"]],
      ["How many half steps are in a minor 2nd?", "1", ["2", "0"]],
      ["From C up to G is which interval?", "Perfect 5th", ["Perfect 4th", "Major 3rd"]],
      ["From C up to E is which interval?", "Major 3rd", ["Minor 3rd", "Perfect 5th"]],
      ["From C up to the next C is which interval?", "Octave", ["Perfect 5th", "Major 2nd"]]
    ], "Count the half steps one key at a time, black keys too.", "The name tells the size: 2nd is small, 5th is bigger. Perfect 5th is the one with 7 half steps."),

    L("Meter: duple, triple, quadruple", [
      ["Beats in a group", "1 2", "<b>Meter</b> is how beats are grouped. <b>Duple</b> = 2 beats (strong, weak). <b>Triple</b> = 3 beats (strong, weak, weak). <b>Quadruple</b> = 4 beats."],
      ["Simple meter", "2/4 3/4 4/4", "In <b>simple</b> meter each beat splits into 2. So 2/4 is simple duple, 3/4 is simple triple, 4/4 is simple quadruple."],
      ["Compound meter", "6/8 9/8 12/8", "In <b>compound</b> meter each beat splits into 3. 6/8 is compound duple, 9/8 is compound triple, 12/8 is compound quadruple."]
    ], [
      ["2/4 time is called...", "Simple duple", ["Simple triple", "Compound duple"]],
      ["3/4 time is called...", "Simple triple", ["Simple duple", "Compound triple"]],
      ["4/4 time is called...", "Simple quadruple", ["Simple triple", "Compound quadruple"]],
      ["6/8 time is called...", "Compound duple", ["Simple duple", "Compound triple"]],
      ["9/8 time is called...", "Compound triple", ["Compound duple", "Simple triple"]],
      ["12/8 time is called...", "Compound quadruple", ["Simple quadruple", "Compound duple"]],
      ["In compound meter, each beat splits into...", "3 parts", ["2 parts", "4 parts"]],
      ["In simple meter, each beat splits into...", "2 parts", ["3 parts", "4 parts"]],
      ["Waltzes are written in which meter?", "Triple", ["Duple", "Quadruple"], "💃"]
    ], "Count the main beats, then decide: does each beat split into 2 or 3?", "Beats: 2 is duple, 3 is triple, 4 is quadruple. Splits into 2 is simple, into 3 is compound."),

    L("Pickup notes", [
      ["Before the first bar", "🎵", "Some songs start with a <b>pickup</b> (also called an <b>anacrusis</b>): one or more notes before the first full measure."],
      ["Strong beat ahead", "→ 1", "The pickup leads into the first strong beat of the first full measure, called the <b>downbeat</b>."],
      ["Examples", "🎂", "<i>Happy Birthday</i> starts with a pickup (\"Hap-py\"). The first and the last measure often add up to one full measure."]
    ], [
      ["Notes before the first full measure are called...", "A pickup", ["A coda", "A repeat"]],
      ["Another word for a pickup is...", "Anacrusis", ["Fermata", "Crescendo"]],
      ["The first beat of a measure is called the...", "Downbeat", ["Upbeat", "Offbeat"]],
      ["Which song starts with a pickup?", "Happy Birthday", ["Twinkle, Twinkle, Little Star", "Jingle Bells chorus"]],
      ["A pickup leads into the...", "Next downbeat", ["Final bar line", "Key signature"]],
      ["The pickup measure and the last measure often add up to...", "One full measure", ["Two measures", "Nothing"]],
      ["Where do pickup notes come?", "Before the first full measure", ["After the final bar line", "In the middle of the song"]],
      ["The last beat before the downbeat is called the...", "Upbeat", ["Downbeat", "Rest"]],
      ["Does Twinkle, Twinkle, Little Star start with a pickup?", "No, it starts on beat 1", ["Yes, with two notes", "Yes, with a rest"]]
    ], "A pickup comes before the first full measure.", "Think of a pickup as a little run-up before a jump. The jump is the downbeat."),

    F("Rhythm arithmetic", [
      ["Value of notes", "♩ = 1", "In 4/4: whole = <b>4</b> beats, half = <b>2</b>, quarter = <b>1</b>, eighth = <b>½</b>, sixteenth = <b>¼</b>."],
      ["Dots", "♩.", "A dot adds <b>half</b> of the note's value. A dotted half = 2 + 1 = <b>3</b>. A dotted quarter = 1 + ½ = <b>1½</b>."],
      ["Adding up", "+", "To fill a measure, add the beats of all notes and rests. In 4/4 the total must be <b>4</b>. In 3/4 it must be <b>3</b>."]
    ], () => Math.random() < 0.6 ? rhythmMath() : measureMissing()),

    L("Musical form: AB, ABA, rondo", [
      ["Letters for sections", "A B", "Composers label the sections of a piece with letters. <b>Binary form</b> is <b>AB</b>: two different sections."],
      ["Ternary and rondo", "A B A   A B A C A", "<b>Ternary form</b> is <b>ABA</b>: the first section comes back. A <b>rondo</b> is <b>ABACA</b>: the main theme A keeps coming back between new sections."],
      ["Variations", "🔁", "<b>Theme and variations</b> plays a tune, then changes it each time: new speed, new notes or a new mood."]
    ], [
      ["A piece with two different sections has which form?", "Binary (AB)", ["Ternary (ABA)", "Rondo"]],
      ["Which form is ABA?", "Ternary", ["Binary", "Rondo"]],
      ["Which form is ABACA?", "Rondo", ["Binary", "Ternary"]],
      ["Playing a tune and then changing it each time is called...", "Theme and variations", ["Rondo", "Binary form"]],
      ["In ABA, which section comes back at the end?", "A", ["B", "C"]],
      ["In ABACA, how many times is A played?", "3", ["2", "5"]],
      ["In ABACA, how many different sections are there?", "3", ["2", "5"]],
      ["In ABA, how many different sections are there?", "2", ["3", "1"]],
      ["In a rondo, the main theme is...", "A, and it keeps returning", ["Played only once", "Always B"]]
    ], "Look at the letters. Which ones repeat and which are new?", "Count the different letters to find how many sections. Count the repeats of one letter to count returns."),

    L("Ornaments", [
      ["Decorations", "✨", "<b>Ornaments</b> are little decorations that add sparkle to a melody."],
      ["Quick ones", "tr", "A <b>trill</b> (tr) quickly switches between a note and the note next to it. A <b>grace note</b> is a tiny, quick note before the main note."],
      ["Sliding and spreading", "🌈", "A <b>glissando</b> slides smoothly through many notes. An <b>arpeggio</b> plays the notes of a chord one by one. <b>Tremolo</b> repeats a note very fast."]
    ], [
      ["Which ornament quickly switches between two neighboring notes?", "Trill", ["Glissando", "Fermata"]],
      ["What is a tiny, quick note before a main note called?", "Grace note", ["Whole note", "Bar note"]],
      ["Which one slides smoothly through many notes?", "Glissando", ["Trill", "Rest"]],
      ["Playing the notes of a chord one at a time is called an...", "Arpeggio", ["Octave", "Anthem"]],
      ["Repeating a note very quickly is called...", "Tremolo", ["Trill", "Arpeggio"]],
      ["What does tr written above a note mean?", "Play a trill", ["Play it twice", "Play it softly"]],
      ["A harp player sweeping up the strings plays a...", "Glissando", ["Fermata", "Rest"], "🪕"],
      ["What do ornaments do to music?", "Decorate it", ["Delete it", "Make it silent"]],
      ["A broken chord is another name for an...", "Arpeggio", ["Trill", "Tremolo"]]
    ], "Think about what the notes do: switch, slide, spread or repeat.", "A trill goes back and forth. A glissando slides. An arpeggio spreads a chord. Tremolo repeats."),

    L("Articulation marks", [
      ["How to play a note", "·  >  —", "<b>Articulation</b> tells how to start and end a note, not how high or long it is."],
      ["Short and smooth", "· ⌒", "A <b>dot</b> above or below a note is <b>staccato</b>: short and bouncy. A curved <b>slur</b> over several notes is <b>legato</b>: smooth and connected."],
      ["Strong marks", "> —", "An <b>accent</b> (&gt;) means play it stronger. A <b>tenuto</b> line (—) means hold its full length. <b>Marcato</b> (^) means strongly marked."]
    ], [
      ["A dot above or below a note means...", "Staccato (short)", ["Legato (smooth)", "Louder"]],
      ["A curved line over several different notes (a slur) means play them...", "Smoothly connected", ["Short and bouncy", "Very quietly"]],
      ["The sign > over a note is an...", "Accent", ["Staccato", "Rest"]],
      ["A short line above a note (tenuto) means...", "Hold it for its full length", ["Play it short", "Skip it"]],
      ["Which word means smooth and connected?", "Legato", ["Staccato", "Marcato"]],
      ["Which word means short and detached?", "Staccato", ["Legato", "Tenuto"]],
      ["An accent makes a note sound...", "Stronger", ["Longer", "Shorter"]],
      ["A fermata (a curved sign with a dot) means...", "Hold the note longer", ["Play it softly", "Repeat it"]],
      ["Marcato means...", "Strongly marked", ["Smooth", "Silent"]]
    ], "Picture how each mark would change the way you play the note.", "Dots make notes short, curved slurs link notes together, accents push a note."),

    L("More singing voices", [
      ["Middle voices", "🎤", "Besides soprano, alto, tenor and bass there are in-between voices. <b>Mezzo-soprano</b> is between soprano and alto. <b>Baritone</b> is between tenor and bass."],
      ["Full order", "S M A T B B", "From high to low: soprano, mezzo-soprano, alto (women's voices), then tenor, baritone, bass (men's voices)."],
      ["Ways to sing together", "🎶", "<b>Unison</b> = same notes. <b>Harmony</b> = different notes that sound good together. A <b>quartet</b> has four singers."]
    ], [
      ["Which voice is between tenor and bass?", "Baritone", ["Alto", "Soprano"]],
      ["Which voice is between soprano and alto?", "Mezzo-soprano", ["Tenor", "Bass"]],
      ["Which is the highest male voice?", "Tenor", ["Bass", "Baritone"]],
      ["Which is the lowest male voice?", "Bass", ["Tenor", "Baritone"]],
      ["Which is the highest female voice?", "Soprano", ["Alto", "Mezzo-soprano"]],
      ["Singers all singing the same notes are singing in...", "Unison", ["Harmony", "Rounds"]],
      ["Singers singing different notes that sound good together are singing in...", "Harmony", ["Unison", "Solo"]],
      ["A group of four singers is a...", "Quartet", ["Trio", "Duet"]],
      ["Which muscle helps with breathing deeply for singing?", "Diaphragm", ["Biceps", "Knee"]]
    ], "Line the voices up from the highest to the lowest in your mind.", "Mezzo means medium, so it sits in the middle of the women's voices; baritone sits in the middle of the men's."),

    L("Where the orchestra sits", [
      ["Sections", "🎻🎷🎺🥁", "The orchestra sits in groups called <b>sections</b>. The strings are at the front, around the conductor."],
      ["Behind", "→", "The <b>woodwinds</b> sit in the middle. The <b>brass</b> sit behind them. The <b>percussion</b> sit at the very back."],
      ["Why?", "🔊", "Loud brass and percussion sit at the back so they do not drown out the softer instruments in front."]
    ], [
      ["Which section sits closest to the conductor?", "Strings", ["Brass", "Percussion"]],
      ["Which section sits at the very back?", "Percussion", ["Strings", "Woodwinds"]],
      ["Which section sits behind the woodwinds?", "Brass", ["Strings", "Conductor"]],
      ["Why do the brass sit behind the strings?", "They are louder", ["They are quieter", "They are smaller"]],
      ["Which instrument is usually near the back?", "Timpani", ["Violin", "Flute"], "🥁"],
      ["Which section is usually the largest in the orchestra?", "Strings", ["Brass", "Percussion"]],
      ["Where do the violins sit?", "At the front", ["At the back", "Behind the brass"]],
      ["Who sits in front of the whole orchestra?", "The conductor", ["The drummer", "The tuba player"]],
      ["The woodwinds sit between which two sections?", "Strings and brass", ["Brass and percussion", "Conductor and strings"]]
    ], "Think of the stage from front to back: who is loudest, and where would you put them?", "Quiet instruments sit up front. The loudest sit at the back."),

    L("How instruments make sound", [
      ["Reeds", "🎷", "A <b>clarinet</b> and a <b>saxophone</b> have a <b>single reed</b>. An <b>oboe</b> and a <b>bassoon</b> have a <b>double reed</b>. The air makes the reed vibrate."],
      ["Air and lips", "🎺", "A <b>flute</b> makes sound when you blow across an opening. In <b>brass</b> instruments, the player's lips buzz in a mouthpiece."],
      ["Strings and drums", "🎻", "A violin makes sound when a bow rubs the strings. A harp's strings are plucked. A timpani is struck with a mallet."]
    ], [
      ["A clarinet has what kind of reed?", "Single reed", ["Double reed", "No reed"]],
      ["An oboe has what kind of reed?", "Double reed", ["Single reed", "No reed"]],
      ["A bassoon has what kind of reed?", "Double reed", ["Single reed", "No reed"]],
      ["How does a flute make sound?", "By blowing across an opening", ["With a reed", "By buzzing lips"]],
      ["How do trumpet players make sound?", "By buzzing their lips", ["By using a reed", "By plucking"], "🎺"],
      ["A saxophone uses what to make sound?", "A single reed", ["A double reed", "A bow"]],
      ["What makes a violin's strings vibrate?", "A bow rubbing them", ["Blowing air", "A reed"]],
      ["How is a harp played?", "Plucking the strings", ["Blowing", "Hitting with a mallet"]],
      ["A timpani is played by...", "Striking it with mallets", ["Plucking", "Using a reed"]]
    ], "Think about what moves to make the sound: a reed, lips, a string or a drum skin?", "Woodwinds with reeds use air to shake a thin reed. Brass players buzz their lips. Strings are bowed or plucked."),

    L("Music around the world", [
      ["Styles from places", "🌍", "Many places have their own style of music. <b>Flamenco</b> comes from Spain. <b>Reggae</b> comes from Jamaica. <b>Samba</b> comes from Brazil."],
      ["Instruments and groups", "🎻", "A <b>mariachi</b> band is from Mexico and often has trumpets and violins. A <b>gamelan</b> is an orchestra of bells and gongs from Indonesia."],
      ["Music from long ago", "🎼", "Folk music is passed down from person to person. Many countries have songs everybody knows, which tell about everyday life."]
    ], [
      ["Which country is flamenco from?", "Spain", ["Jamaica", "Brazil"]],
      ["Which country is reggae from?", "Jamaica", ["Spain", "Mexico"]],
      ["Which country is samba from?", "Brazil", ["Jamaica", "Indonesia"]],
      ["A mariachi band comes from which country?", "Mexico", ["Spain", "Brazil"]],
      ["A gamelan orchestra comes from which country?", "Indonesia", ["Mexico", "Spain"]],
      ["Which style of music is from Jamaica?", "Reggae", ["Flamenco", "Samba"]],
      ["Which style of music is from Spain?", "Flamenco", ["Reggae", "Samba"]],
      ["Gamelan music is mostly played on...", "Bells and gongs", ["Violins only", "Guitars only"]],
      ["Folk music is usually...", "Passed down between people", ["Written only by one famous composer", "Never sung"]]
    ], "Match the style or group to the place it came from.", "Think of one fact about each place: a country's flag, language or neighbors can help you remember."),

    L("Music technology", [
      ["Keeping time and recording", "⏱️", "A <b>metronome</b> clicks at a steady speed so you can practice. Thomas Edison made the <b>phonograph</b>, one of the first machines that could record and play back sound."],
      ["Electronic music", "🎛️", "A <b>synthesizer</b> makes sounds electronically. <b>MIDI</b> lets instruments and computers talk to each other. Music software lets people record, edit and mix music."],
      ["Protect your ears", "🎧", "Loud sound over time can damage hearing. Keep headphones at a <b>safe, comfortable volume</b> and take breaks."]
    ], [
      ["What machine clicks at a steady speed to help you practice?", "Metronome", ["Synthesizer", "Microphone"]],
      ["What instrument makes sound electronically?", "Synthesizer", ["Metronome", "Baton"]],
      ["Which invention could record and play back sound, from Thomas Edison?", "Phonograph", ["Synthesizer", "Metronome"]],
      ["What does a microphone do?", "Picks up sound", ["Makes sound quieter", "Counts beats"], "🎤"],
      ["What lets instruments and computers talk to each other?", "MIDI", ["A baton", "A score"]],
      ["Which is a safe way to listen to headphones?", "A comfortable, lower volume", ["As loud as possible", "All day without breaks"]],
      ["Why should you not play music very loudly for a long time?", "It can harm your hearing", ["It breaks your shoes", "It makes the notes lower"]],
      ["What is software used to record, edit and mix music?", "A music program", ["A baton", "A metronome"]],
      ["A speaker's job is to...", "Turn electric signals into sound", ["Count beats", "Write music"]]
    ], "Think about what each tool does for a musician.", "Metronome = tempo. Microphone = picks up sound. Speaker = plays it out loud.")
  ];
  l8.push(
    MIX("Mixed practice", [l8[0], l8[1], l8[4], l8[5], l8[7], l8[9], l8[12], l8[13], l8[15]]),
    MIX("Level 8 Challenge", [l8[2], l8[3], l8[6], l8[8], l8[10], l8[11], l8[14], l8[16], l8[17]])
  );

  // ======================= LEVEL 9 =======================
  const KEYS = [["C", 0, "♯", "Am"], ["G", 1, "♯", "Em"], ["D", 2, "♯", "Bm"], ["A", 3, "♯", "F♯m"], ["E", 4, "♯", "C♯m"], ["F", 1, "♭", "Dm"], ["B♭", 2, "♭", "Gm"], ["E♭", 3, "♭", "Cm"], ["A♭", 4, "♭", "Fm"]];
  const sigText = k => k[1] === 0 ? "no sharps or flats" : k[2] === "♯" ? sh(k[1], "sharp") : sh(k[1], "flat");
  const sigItems = [];
  KEYS.forEach(k => {
    sigItems.push([`A key signature has ${sigText(k)}. Which major key is it?`, `${k[0]} major`, shuf(KEYS.filter(x => x !== k && !(x[1] === k[1] && x[2] === k[2]))).slice(0, 2).map(x => `${x[0]} major`)]);
    sigItems.push([`How many sharps or flats does ${k[0]} major have?`, k[1] === 0 ? "None" : sigText(k), shuf(KEYS.filter(x => x !== k && sigText(x) !== sigText(k))).slice(0, 2).map(x => x[1] === 0 ? "None" : sigText(x))]);
  });
  const relItems = KEYS.map(k => [`What is the relative minor of ${k[0]} major?`, k[3].replace("m", " minor"), shuf(KEYS.filter(x => x !== k)).slice(0, 2).map(x => x[3].replace("m", " minor"))]);
  KEYS.slice(1).forEach(k => relItems.push([`What is the relative major of ${k[3].replace("m", " minor")}?`, `${k[0]} major`, shuf(KEYS.filter(x => x !== k)).slice(0, 2).map(x => `${x[0]} major`)]));

  const transpose = () => {
    const kinds = [["up a whole step", 2], ["up a half step", 1], ["down a half step", -1], ["down a whole step", -2]];
    const [lbl, st] = pick(kinds), nat = pick([0, 2, 4, 5, 7, 9, 11]);
    const ans = CH[(nat + st + 12) % 12];
    const wr = shuf([1, -1, 2, -2, 3].map(d => CH[(nat + st + d + 12) % 12]).filter(x => x !== ans && x !== CH[nat])).slice(0, 2);
    const exN = lbl.includes("half") ? "C up a whole step is D" : "C up a half step is C♯";
    return {
      text: `Move the note ${CH[nat]} ${lbl}. Which note do you get?`, visual: "🎹", choices: shuf([ans, ...wr]).map(A), answer: A(ans),
      hints: [`Picture a piano. A half step is the very next key, black or white. A whole step is two keys.`, `Direction matters: ${lbl.startsWith("up") ? "up means to the right" : "down means to the left"}. Count the keys one at a time from ${CH[nat]}.`, `Example: ${exN}. (Counting keys one at a time.) Now do yours.`]
    };
  };

  const ROM = [];
  [["C", ["C", "Dm", "Em", "F", "G", "Am"]], ["G", ["G", "Am", "Bm", "C", "D", "Em"]], ["F", ["F", "Gm", "Am", "B♭", "C", "Dm"]]].forEach(([key, ch]) => {
    ["I", "ii", "iii", "IV", "V", "vi"].forEach((r, i) => {
      const nm = c => c.endsWith("m") ? c.slice(0, -1) + " minor" : c + " major";
      ROM.push([`In ${key} major, which chord is ${r}?`, nm(ch[i]), shuf(ch.filter((_, j) => j !== i)).slice(0, 2).map(nm)]);
    });
  });
  ROM.push(["Uppercase Roman numerals (like IV) mean the chord is...", "major", ["minor", "silent"]], ["Lowercase Roman numerals (like vi) mean the chord is...", "minor", ["major", "loud"]]);

  const l9 = [
    L("Finding the key signature", [
      ["Sharp keys", "G D A E", "The sharp keys go G (1♯), D (2♯), A (3♯), E (4♯). C has none."],
      ["Flat keys", "F B♭ E♭ A♭", "The flat keys go F (1♭), B♭ (2♭), E♭ (3♭), A♭ (4♭)."],
      ["Use both ways", "♯ ♭ ↔ 🔑", "If you know the key, you can count its sharps or flats. If you see the sharps or flats, you can name the key."]
    ], sigItems, "Remember the key lists: one list adds sharps and the other adds flats.", "Count how many sharps or flats. Match the number to the key in the list."),

    L("Last sharp trick", [
      ["Names from the last sharp", "F♯ C♯ G♯", "To name a sharp key: take the <b>last sharp</b> and go <b>up a half step</b>. That is the key. Last sharp C♯ → D major."],
      ["Flat keys", "B♭ E♭ A♭", "In a flat key, the <b>second-to-last flat</b> names the key. For B♭ E♭ A♭ the key is E♭ major."],
      ["Check", "✔", "G major: F♯ → up a half step = G. A major: F♯ C♯ G♯ → G♯ up a half step = A. It works every time."]
    ], [
      ["A key signature has F♯ and C♯. Which major key is it?", "D major", ["G major", "A major"]],
      ["A key signature has F♯, C♯, G♯. Which major key is it?", "A major", ["D major", "E major"]],
      ["A key signature has F♯ only. Which major key is it?", "G major", ["D major", "C major"]],
      ["A key signature has F♯, C♯, G♯, D♯. Which major key is it?", "E major", ["A major", "B major"]],
      ["The last sharp is D♯. Which major key is it?", "E major", ["D major", "A major"]],
      ["A key signature has B♭, E♭, A♭. Which major key is it?", "E♭ major", ["B♭ major", "A♭ major"]],
      ["A key signature has B♭, E♭. Which major key is it?", "B♭ major", ["E♭ major", "F major"]],
      ["A key signature has B♭, E♭, A♭, D♭. Which major key is it?", "A♭ major", ["E♭ major", "D♭ major"]],
      ["The last sharp in a key is a ___ below the key note.", "half step", ["whole step", "third"]],
      ["Key signature of one flat (B♭). Which major key?", "F major", ["B♭ major", "C major"]]
    ], "Find the last sharp, or the second-to-last flat, depending on the type of key.", "For sharps, go one half step above the last sharp. For flats, use the flat before the last."),

    L("Relative keys", [
      ["Same notes, new home", "C ↔ Am", "A major key and its <b>relative minor</b> share a key signature but have a different home note."],
      ["Finding it", "6 ↔ 3", "Go up to the <b>6th note</b> of the major scale for the minor, or down 3 half steps. Going from minor to major, go <b>up 3 half steps</b>."],
      ["Pairs", "G–Em  D–Bm  A–F♯m", "C–Am, G–Em, D–Bm, A–F♯m, F–Dm, B♭–Gm, E♭–Cm."]
    ], relItems, "Relative keys share a key signature. Move three half steps to find the partner.", "Count the major scale to its 6th note to find the relative minor."),

    L("Parallel keys", [
      ["Same name, different mood", "C and Cm", "<b>Parallel keys</b> have the same tonic (starting note) but different key signatures. C major and C minor are parallel."],
      ["Not the same as relative", "Am vs Cm", "<b>Relative</b> keys share a key signature (C major and A minor). <b>Parallel</b> keys share a tonic (C major and C minor)."],
      ["Mood", "😊 → 😢", "Changing from major to its parallel minor often changes the mood from bright to sad or serious. C minor has 3 flats."]
    ], [
      ["Which pair of keys are PARALLEL?", "C major and C minor", ["C major and A minor", "C major and G major"]],
      ["Which pair of keys are RELATIVE?", "C major and A minor", ["C major and C minor", "G major and G minor"]],
      ["Parallel keys share the same...", "Tonic (starting note)", ["Key signature", "Time signature"]],
      ["Relative keys share the same...", "Key signature", ["Tonic", "Tempo"]],
      ["How many flats does C minor have?", "3", ["1", "0"]],
      ["How many flats does G minor have?", "2", ["3", "0"]],
      ["How many flats does D minor have?", "1", ["2", "0"]],
      ["What is the parallel minor of G major?", "G minor", ["E minor", "D minor"]],
      ["Changing from major to the parallel minor often makes the music feel...", "Darker or sadder", ["Faster", "Louder"]],
      ["The parallel major of A minor is...", "A major", ["C major", "E major"]]
    ], "Parallel keys share the starting note. Relative keys share the key signature.", "Same letter name = parallel. Same sharps or flats = relative."),

    F("Transposing", [
      ["What is transposing?", "↕", "To <b>transpose</b> is to move music to a different key by shifting every note the same distance."],
      ["Half steps and whole steps", "🎹", "A <b>half step</b> is the very next key (black or white). A <b>whole step</b> is two keys. Up goes right, down goes left."],
      ["Example", "C → D", "C up a whole step is D. C up a half step is C♯. C down a half step is B."]
    ], () => transpose()),

    L("Seventh chords", [
      ["Add a note", "C E G B♭", "A <b>seventh chord</b> has <b>4 notes</b>. It is a triad with a 7th note stacked on top."],
      ["Dominant seventh", "G7", "The <b>dominant seventh</b> chord is built on the 5th note (V7). G7 is <b>G B D F</b>. It sounds restless and wants to resolve to C."],
      ["Other sevenths", "Cmaj7", "<b>C major 7</b> is C E G B (dreamy). <b>C7</b> is C E G B♭ (bluesy). <b>C minor 7</b> is C E♭ G B♭ (mellow)."]
    ], [
      ["How many notes are in a seventh chord?", "4", ["3", "5"]],
      ["Which notes make a G7 chord?", "G B D F", ["G B D", "G C E G"]],
      ["Which note is added to C E G to make C major 7?", "B", ["B♭", "D"]],
      ["Which note is added to C E G to make C7?", "B♭", ["B", "D"]],
      ["A dominant seventh chord is built on which scale degree?", "The 5th", ["The 1st", "The 4th"]],
      ["In C major, V7 is the chord...", "G7", ["C7", "F7"]],
      ["A G7 chord likes to go to...", "C", ["D♭", "A"]],
      ["A seventh chord is a triad plus...", "A seventh note on top", ["A rest", "A flat"]],
      ["How many notes are in a regular triad?", "3", ["4", "2"]]
    ], "A seventh chord adds one note above the triad. Count the notes.", "Stack thirds: root, 3rd, 5th, then 7th. That makes four notes in all."),

    L("Chord inversions", [
      ["Same chord, new order", "C E G", "A chord can be played with different notes on the bottom. These are called <b>inversions</b>."],
      ["Names", "1 2 3", "<b>Root position</b>: the root is the lowest note (C E G). <b>First inversion</b>: the third is lowest (E G C). <b>Second inversion</b>: the fifth is lowest (G C E)."],
      ["Same name", "C", "An inversion is still the same chord. C E G, E G C and G C E are all <b>C major</b>."]
    ], [
      ["C E G with C as the lowest note is in...", "Root position", ["First inversion", "Second inversion"]],
      ["E G C (E lowest) is in...", "First inversion", ["Root position", "Second inversion"]],
      ["G C E (G lowest) is in...", "Second inversion", ["First inversion", "Root position"]],
      ["In first inversion, which chord note is lowest?", "The third", ["The root", "The fifth"]],
      ["In second inversion, which chord note is lowest?", "The fifth", ["The third", "The root"]],
      ["G B D with B lowest is in...", "First inversion", ["Root position", "Second inversion"]],
      ["G B D with D lowest is in...", "Second inversion", ["First inversion", "Root position"]],
      ["Does inverting a chord change its name?", "No", ["Yes", "Only on a guitar"]],
      ["How many inversions can a triad have?", "2", ["1", "3"]]
    ], "Find the lowest note and ask: is it the root, the third or the fifth?", "Root lowest is root position. Third lowest is first inversion. Fifth lowest is second inversion."),

    L("Roman numerals and chord progressions", [
      ["Numbers for chords", "I ii iii IV V vi", "In a major key, chords are numbered for each scale note. <b>Uppercase</b> numerals (I, IV, V) are <b>major</b>. <b>Lowercase</b> (ii, iii, vi) are <b>minor</b>."],
      ["In C major", "C Dm Em F G Am", "I = C, ii = Dm, iii = Em, IV = F, V = G, vi = Am."],
      ["A famous pattern", "I V vi IV", "I–V–vi–IV is used in countless pop songs. In C that is C, G, Am, F."]
    ], ROM, "Number the scale notes of the key, then decide: uppercase is major and lowercase is minor.", "Count up the scale to the numeral's degree. Check whether the numeral is upper or lowercase."),

    L("Canons and fugues", [
      ["Many melodies", "🎶", "<b>Polyphony</b> means two or more melodies at the same time. <b>Homophony</b> is one melody with chords. <b>Monophony</b> is a single line."],
      ["Canon", "🔁", "In a <b>canon</b>, one tune is played by several voices that start at different times. A round like <i>Row, Row, Row Your Boat</i> is a simple canon. Pachelbel wrote the famous <i>Canon in D</i>."],
      ["Fugue", "🎼", "A <b>fugue</b> starts with a short theme called the <b>subject</b>. The voices enter one after another, each taking the theme. J. S. Bach was a master of fugues."]
    ], [
      ["Two or more melodies at the same time is called...", "Polyphony", ["Monophony", "Homophony"]],
      ["One melody with chords under it is called...", "Homophony", ["Polyphony", "Monophony"]],
      ["A single melody line with no accompaniment is called...", "Monophony", ["Polyphony", "Homophony"]],
      ["Row, Row, Row Your Boat sung in a round is a simple...", "Canon", ["Fugue", "March"]],
      ["In a canon, voices play the same tune...", "Starting at different times", ["At exactly the same time only", "Backwards only"]],
      ["What is the short theme at the start of a fugue called?", "The subject", ["The score", "The coda"]],
      ["Which composer is famous for fugues?", "J. S. Bach", ["Chopin", "Debussy"]],
      ["Who wrote Canon in D?", "Pachelbel", ["Mozart", "Handel"]],
      ["A fugue's voices enter...", "One after another", ["All at once only", "Never"]]
    ], "Think about how many melodies there are and when each voice starts.", "Canon = same tune, delayed entries. Fugue = a subject taken in turn by each voice."),

    L("Orchestra instrument facts", [
      ["Strings", "🎻", "The <b>violin</b> is the smallest and highest of the orchestra strings. The <b>cello</b> is played sitting down, held between the knees. The <b>double bass</b> is so big the player stands or sits on a tall stool."],
      ["Woodwinds and brass", "🎷", "The <b>piccolo</b> is a small flute that sounds an octave higher. The <b>bassoon</b> is a large double-reed woodwind. The <b>trombone</b> uses a slide. The <b>French horn</b> is coiled. The <b>tuba</b> is the lowest brass."],
      ["Percussion", "🥁", "<b>Timpani</b> are large tuned drums. The <b>xylophone</b> has wooden bars. The <b>triangle</b> is a metal bar."]
    ], [
      ["Which instrument uses a slide to change notes?", "Trombone", ["Trumpet", "Tuba"]],
      ["Which woodwind is a small flute that sounds very high?", "Piccolo", ["Bassoon", "Oboe"]],
      ["Which string instrument is held between the knees?", "Cello", ["Violin", "Viola"]],
      ["Which is the lowest brass instrument?", "Tuba", ["Trumpet", "French horn"]],
      ["Which drums can be tuned to different notes?", "Timpani", ["Snare drum", "Bass drum"]],
      ["Which instrument has wooden bars played with mallets?", "Xylophone", ["Triangle", "Cymbals"]],
      ["Which large string instrument is so big the player stands?", "Double bass", ["Viola", "Violin"]],
      ["Which instrument is a coiled brass instrument?", "French horn", ["Clarinet", "Cello"]],
      ["Which large woodwind has a double reed?", "Bassoon", ["Flute", "Trombone"]]
    ], "Think about the shape and how the instrument is played.", "Think about the family first (strings, woodwinds, brass or percussion), then the special feature."),

    L("Jazz basics", [
      ["Where jazz began", "🎷", "Jazz began in the United States, in New Orleans, from African American communities. It mixes many musical traditions."],
      ["Key ideas", "🎺", "<b>Improvisation</b> means making up music on the spot. <b>Swing</b> is a bouncy long-short rhythm. <b>Call and response</b> is when one player asks and another answers."],
      ["Names and blues", "🎹", "<b>Louis Armstrong</b> played trumpet. <b>Ella Fitzgerald</b> used <b>scat singing</b>, with made-up sounds instead of words. <b>Duke Ellington</b> led a big band. The <b>12-bar blues</b> is 12 measures, often with I, IV and V chords."]
    ], [
      ["Making up music on the spot is called...", "Improvisation", ["Transposition", "Notation"]],
      ["Where did jazz begin?", "New Orleans, USA", ["Paris, France", "Tokyo, Japan"]],
      ["What is scat singing?", "Singing made-up sounds instead of words", ["Singing very quietly", "Singing in a choir"]],
      ["Which famous jazz musician played trumpet?", "Louis Armstrong", ["Ella Fitzgerald", "Duke Ellington"]],
      ["Which jazz singer was famous for scat singing?", "Ella Fitzgerald", ["Louis Armstrong", "Chopin"]],
      ["How many measures are in a 12-bar blues?", "12", ["8", "16"]],
      ["Which chords does the 12-bar blues usually use?", "I, IV and V", ["I and ii only", "Only V"]],
      ["Swing rhythm feels...", "Bouncy (long-short)", ["Perfectly stiff", "Silent"]],
      ["When one player asks and another answers, it is called...", "Call and response", ["Scat", "Canon"]]
    ], "Think about what is special about jazz: the players invent things as they go.", "Improvisation is making it up. Scat is singing without words. The blues has 12 bars."),

    L("Opera and ballet", [
      ["Opera", "🎭", "An <b>opera</b> is a story told completely through singing, with an orchestra. A solo song in an opera is an <b>aria</b>. The words are the <b>libretto</b>."],
      ["Opening", "🎼", "An <b>overture</b> is the orchestra's piece at the start. Mozart's <i>The Magic Flute</i> is a famous opera. The orchestra plays in the <b>orchestra pit</b> in front of the stage."],
      ["Ballet", "🩰", "A <b>ballet</b> tells a story through dance with no words. A <b>choreographer</b> designs the dance. <i>The Nutcracker</i> is a ballet by Tchaikovsky."]
    ], [
      ["A story told entirely through singing with an orchestra is an...", "Opera", ["Ballet", "Round"]],
      ["A solo song in an opera is called an...", "Aria", ["Overture", "Libretto"]],
      ["The words of an opera are called the...", "Libretto", ["Aria", "Score"]],
      ["The piece the orchestra plays at the start of an opera is an...", "Overture", ["Aria", "Encore"]],
      ["A story told through dance without words is a...", "Ballet", ["Opera", "Canon"]],
      ["Who designs the dance steps in a ballet?", "The choreographer", ["The conductor", "The librettist"]],
      ["Which of these is a ballet?", "The Nutcracker", ["The Magic Flute", "Carnival of Words"], "🩰"],
      ["Which of these is an opera by Mozart?", "The Magic Flute", ["The Nutcracker", "The Four Seasons"]],
      ["Where does the orchestra usually sit at an opera?", "In the orchestra pit", ["On the roof", "In the lobby"]]
    ], "Ask yourself: is it sung, danced or both? Who does what?", "Opera uses singing, ballet uses dance. Aria and libretto are opera words."),

    L("Music that tells a story", [
      ["Program music", "📖", "<b>Program music</b> tells a story or paints a picture with sound, with no words. <i>Peter and the Wolf</i> gives each character an instrument."],
      ["Film music", "🎬", "A <b>film score</b> is the music written for a movie. A <b>leitmotif</b> is a short theme tied to a character or idea. John Williams wrote the music for <i>Star Wars</i>."],
      ["Peter and the Wolf", "🐦🦆🐱", "In <i>Peter and the Wolf</i> the bird is a flute, the duck is an oboe, the cat is a clarinet, the grandfather is a bassoon and the wolf is French horns."]
    ], [
      ["Music that tells a story without words is called...", "Program music", ["A round", "A scale"]],
      ["The music written for a movie is called a...", "Film score", ["Score card", "Bar line"]],
      ["A short theme tied to a character is a...", "Leitmotif", ["Fermata", "Octave"]],
      ["In Peter and the Wolf, which instrument plays the bird?", "Flute", ["Bassoon", "French horn"], "🐦"],
      ["In Peter and the Wolf, which instrument plays the duck?", "Oboe", ["Flute", "Clarinet"], "🦆"],
      ["In Peter and the Wolf, which instrument plays the cat?", "Clarinet", ["Oboe", "Drum"], "🐱"],
      ["In Peter and the Wolf, which instruments play the wolf?", "French horns", ["Flutes", "Triangles"]],
      ["Who wrote the music for Star Wars?", "John Williams", ["Mozart", "Bach"]],
      ["Why do movie makers use music?", "To add feeling to the story", ["To make films shorter", "To hide the actors"]]
    ], "Think about which sound matches each character or idea.", "Light, small characters get high instruments. Big or scary ones get low instruments."),

    L("Tempo changes", [
      ["Slowing and speeding", "🐢 ↔ 🐇", "<b>Ritardando</b> (rit.) = slow down gradually. <b>Accelerando</b> (accel.) = speed up gradually. <b>A tempo</b> = go back to the original speed."],
      ["Flexible", "〰️", "<b>Rubato</b> means a flexible tempo, speeding up and slowing down a little for feeling. A <b>fermata</b> holds a note longer."],
      ["Word helpers", "molto  poco", "<b>Molto</b> = very. <b>Poco</b> = a little. <b>Più</b> = more. <b>Meno</b> = less. <b>Poco a poco</b> = little by little."]
    ], [
      ["What does ritardando mean?", "Gradually slow down", ["Gradually speed up", "Play louder"]],
      ["What does accelerando mean?", "Gradually speed up", ["Gradually slow down", "Play softer"]],
      ["What does a tempo mean?", "Return to the original speed", ["Slow down", "Stop"]],
      ["What does rubato mean?", "Flexible tempo", ["Very loud", "Strict beat"]],
      ["What does molto mean?", "Very (much)", ["A little", "Less"]],
      ["What does poco mean?", "A little", ["Very", "More"]],
      ["What does più mean?", "More", ["Less", "Very"]],
      ["What does meno mean?", "Less", ["More", "Very"]],
      ["What does poco a poco mean?", "Little by little", ["Very fast", "All at once"]]
    ], "Link the Italian word to its meaning from the lesson.", "Rit. slows, accel. speeds up, a tempo returns. Molto, poco, più and meno change how much."),

    L("Dynamics: beyond forte and piano", [
      ["Extra signs", "sfz  fp  ppp", "<b>ppp</b> is softest of all. <b>fff</b> is loudest. <b>sfz</b> (sforzando) is a sudden strong accent. <b>fp</b> means loud and then right away soft."],
      ["Hairpins", "< >", "A hairpin that opens (&lt;) is a <b>crescendo</b>. One that closes (&gt;) is a <b>diminuendo</b> (also called <b>decrescendo</b>)."],
      ["Words", "subito", "<b>Subito</b> means suddenly. <b>Morendo</b> means dying away. <b>Mezzo</b> means medium."]
    ], [
      ["What does sfz (sforzando) mean?", "A sudden strong accent", ["Gradually softer", "Play slowly"]],
      ["What does fp mean?", "Loud, then immediately soft", ["Soft, then loud", "Fast then slow"]],
      ["Which sign is the softest?", "ppp", ["pp", "p"]],
      ["Which sign is the loudest?", "fff", ["ff", "f"]],
      ["A hairpin that opens up (<) means...", "Crescendo", ["Diminuendo", "Fermata"]],
      ["A hairpin that closes (>) means...", "Diminuendo", ["Crescendo", "Accent"]],
      ["Another name for diminuendo is...", "Decrescendo", ["Forte", "Rubato"]],
      ["What does subito mean?", "Suddenly", ["Slowly", "Gradually"]],
      ["What does morendo mean?", "Dying away", ["Getting louder", "Very fast"]]
    ], "Is the sign about being loud, soft or changing? Link it to the words you learned.", "Extra letters make it stronger. A hairpin shape shows the direction of change."),

    L("Beats in compound time", [
      ["Counting big beats", "6/8 → 2", "In compound time the beat is a <b>dotted note</b> that splits into 3. So the number of main beats is the <b>top number divided by 3</b>."],
      ["Examples", "6/8 9/8 12/8", "<b>6/8</b> has 2 big beats. <b>9/8</b> has 3. <b>12/8</b> has 4. Each beat is a dotted quarter note."],
      ["Simple time", "3/4 4/4 2/2", "In simple time just use the top number: 3/4 has 3 beats, 4/4 has 4 beats, 2/2 has 2 beats."]
    ], [
      ["How many main beats are in a 6/8 measure?", "2", ["6", "3"]],
      ["How many main beats are in a 9/8 measure?", "3", ["9", "4"]],
      ["How many main beats are in a 12/8 measure?", "4", ["12", "3"]],
      ["How many main beats are in a 3/4 measure?", "3", ["1", "4"]],
      ["How many main beats are in a 2/2 measure?", "2", ["4", "1"]],
      ["How many main beats are in a 6/4 measure (compound, grouped in threes)?", "2", ["6", "4"]],
      ["In 6/8, which note gets one big beat?", "Dotted quarter note", ["Quarter note", "Half note"]],
      ["How many eighth notes are in one big beat of 6/8?", "3", ["2", "6"]],
      ["How many eighth notes fill one 12/8 measure?", "12", ["8", "4"]]
    ], "Decide if the time signature is compound (top number 6, 9 or 12) or simple.", "For compound time, divide the top number by 3. For simple time, use the top number."),

    L("The science of sound", [
      ["Frequency", "Hz", "<b>Frequency</b> is how many vibrations happen each second, measured in <b>hertz (Hz)</b>. Higher frequency = higher pitch."],
      ["Octaves", "440 → 880", "The note A above middle C is <b>440 Hz</b>. Double the frequency (880 Hz) and you get one octave higher. Half of it (220 Hz) is one octave lower."],
      ["Loud and tone", "dB", "<b>Amplitude</b> (the size of the vibration) sets how loud a sound is, measured in <b>decibels (dB)</b>. <b>Timbre</b> is a sound's tone color, why a flute and a trumpet sound different."]
    ], [
      ["Which unit measures the frequency of a sound?", "Hertz (Hz)", ["Decibel (dB)", "Beat"]],
      ["Which unit measures loudness?", "Decibel (dB)", ["Hertz (Hz)", "Measure"]],
      ["A note of 440 Hz. What is the frequency of the same note one octave higher?", "880 Hz", ["660 Hz", "220 Hz"]],
      ["A note of 440 Hz. What is the frequency of the same note one octave lower?", "220 Hz", ["880 Hz", "330 Hz"]],
      ["Pitch depends on a sound's...", "Frequency", ["Amplitude", "Timbre"]],
      ["Loudness depends on a sound's...", "Amplitude", ["Frequency", "Timbre"]],
      ["What do we call the tone color of a sound?", "Timbre", ["Pitch", "Tempo"]],
      ["Why does a flute sound different from a trumpet playing the same note?", "Different timbre", ["Different bar lines", "Different clef"]],
      ["Higher frequency means a ___ pitch.", "higher", ["lower", "quieter"]]
    ], "Ask: is this about how high, how loud or what color the sound is?", "Frequency = pitch. Amplitude = loudness. Timbre = tone color. Doubling frequency gives an octave."),

    L("British note names", [
      ["Same notes, other names", "🇬🇧", "In the UK and some other places, notes have different names. A <b>whole note</b> is a <b>semibreve</b>, and a <b>half note</b> is a <b>minim</b>."],
      ["More names", "♩ ♪ ♬", "A <b>quarter note</b> is a <b>crotchet</b>. An <b>eighth note</b> is a <b>quaver</b>. A <b>sixteenth note</b> is a <b>semiquaver</b>."],
      ["Same idea", "=", "Only the names are different. A crotchet still lasts 1 beat in 4/4, just like a quarter note."]
    ], [
      ["What is a whole note called in British English?", "Semibreve", ["Minim", "Crotchet"]],
      ["What is a half note called in British English?", "Minim", ["Semibreve", "Quaver"]],
      ["What is a quarter note called in British English?", "Crotchet", ["Quaver", "Minim"]],
      ["What is an eighth note called in British English?", "Quaver", ["Crotchet", "Semiquaver"]],
      ["What is a sixteenth note called in British English?", "Semiquaver", ["Quaver", "Minim"]],
      ["A crotchet is the same as which American note?", "Quarter note", ["Half note", "Eighth note"]],
      ["A quaver is the same as which American note?", "Eighth note", ["Quarter note", "Sixteenth note"]],
      ["A minim is the same as which American note?", "Half note", ["Whole note", "Quarter note"]],
      ["A semibreve is the same as which American note?", "Whole note", ["Half note", "Quarter note"]]
    ], "Both names mean the same note. Think about the note's length.", "From longest to shortest in British names: semibreve, minim, crotchet, quaver, semiquaver.")
  ];
  l9.push(
    MIX("Mixed practice", [l9[0], l9[2], l9[3], l9[5], l9[6], l9[11], l9[13], l9[14], l9[16]]),
    MIX("Level 9 Challenge", [l9[1], l9[4], l9[7], l9[8], l9[9], l9[10], l9[12], l9[15], l9[17]])
  );

  Object.assign(MUSIC_LEVELS, { 7: l7, 8: l8, 9: l9 });
})();
