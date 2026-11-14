// Mind Lab Music, levels 13-15 (extension file). 20 lessons per level.
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const A = s => String(s).replace(/♯/g, " sharp").replace(/♭/g, " flat");
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  const I = s => { const p = s.split("|"); return [p[0], p[1], p.slice(2)]; };
  // L(title, slides[[h,v,t]], items["question|answer|wrong1|wrong2"], nudge, clue)
  const L = (title, slides, strs, nudge, clue) => {
    const items = strs.map(I);
    const make = () => {
      const [q, a, w] = pick(items);
      const others = items.filter(x => x[1] !== a);
      const ex = pick(others.filter(x => !nz(x[0]).includes(nz(a))).concat(others));
      return {
        text: q,
        choices: shuf([a, ...shuf(w.filter(x => x !== a)).slice(0, 2)]).map(A), answer: A(a),
        hints: [nudge, clue, `Example: ${ex[0]} The answer is "${A(ex[1])}". Now do yours.`]
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

  // ======================= LEVEL 13 =======================
  const l13 = [
    L("Keys with many sharps", [
      ["The order of sharps", "F C G D A E B", "Sharps are always added in the same order: <b>F C G D A E B</b>. More sharps means a key farther from C major."],
      ["Counting up", "4 5 6 7", "<b>E major</b> has 4 sharps, <b>B major</b> has 5, <b>F♯ major</b> has 6 and <b>C♯ major</b> has 7 (all the notes are sharp!)."],
      ["Find the key", "⬆️½", "For a sharp key, the <b>last sharp</b> is the 7th note of the scale. The key's home note is a half step <b>above</b> the last sharp."]
    ], [
      "How many sharps does E major have?|4|3|5",
      "How many sharps does B major have?|5|4|6",
      "How many sharps does F♯ major have?|6|5|7",
      "How many sharps does C♯ major have?|7|6|5",
      "Which major key has 4 sharps?|E major|A major|B major",
      "Which major key has 5 sharps?|B major|E major|F♯ major",
      "A key signature has 6 sharps. Which major key is it?|F♯ major|B major|C♯ major",
      "Which major key uses all 7 sharps?|C♯ major|F♯ major|B major",
      "E major has 4 sharps: F, C, G and one more. Which is the last one?|D♯|E♯|A♯"
    ], "Sharps are added in one fixed order. Count how many the key needs.", "Each new key a fifth higher adds one more sharp: G major has 1, D major has 2, and it keeps growing."),

    L("Keys with many flats", [
      ["The order of flats", "B E A D G C F", "Flats are added in this order: <b>B E A D G C F</b>. It is the sharps order backwards."],
      ["Counting up", "4 5 6 7", "<b>A♭ major</b> has 4 flats, <b>D♭ major</b> has 5, <b>G♭ major</b> has 6 and <b>C♭ major</b> has 7."],
      ["Second-to-last trick", "2nd ◀ last", "For flat keys with 2 or more flats, the key is the <b>second-to-last flat</b>. Flats B♭ E♭ A♭ D♭? The second-to-last is A♭, so it is A♭ major."]
    ], [
      "How many flats does A♭ major have?|4|3|5",
      "How many flats does D♭ major have?|5|4|6",
      "How many flats does G♭ major have?|6|5|7",
      "How many flats does C♭ major have?|7|6|5",
      "Which major key has 4 flats?|A♭ major|E♭ major|D♭ major",
      "Which major key has 5 flats?|D♭ major|A♭ major|G♭ major",
      "A key signature has B♭ E♭ A♭ D♭. Use the second-to-last trick. Which major key is it?|A♭ major|D♭ major|E♭ major",
      "A key signature has B♭ E♭ A♭ D♭ G♭. Which major key is it?|D♭ major|G♭ major|A♭ major",
      "In the order of flats (B E A D G C F), what is the 6th flat?|C♭|G♭|F♭"
    ], "Flats come in one fixed order. Count how many the key has, then think about the order.", "Look at the next-to-last flat in the list. That note names the key."),

    L("Enharmonic keys", [
      ["Same sound, new name", "F♯ = G♭", "Just like notes, some keys can be written two ways. They sound the <b>same</b> but look different. These are <b>enharmonic keys</b>."],
      ["The three pairs", "6+6 5+7 7+5", "<b>F♯ major</b> (6 sharps) = <b>G♭ major</b> (6 flats). <b>B major</b> (5 sharps) = <b>C♭ major</b> (7 flats). <b>C♯ major</b> (7 sharps) = <b>D♭ major</b> (5 flats)."],
      ["Which one to choose?", "👀", "Musicians often pick the key that has <b>fewer</b> sharps or flats, because it is easier to read."]
    ], [
      "Which major key sounds the same as G♭ major?|F♯ major|G major|F major",
      "Which major key sounds the same as C♯ major?|D♭ major|C♭ major|D major",
      "Which major key sounds the same as C♭ major?|B major|B♭ major|C major",
      "Which major key sounds the same as B major?|C♭ major|B♭ major|A♯ major",
      "F♯ major has 6 sharps. How many flats does its twin G♭ major have?|6|5|7",
      "C♯ major has 7 sharps. How many flats does its twin D♭ major have?|5|7|6",
      "B major has 5 sharps. How many flats does its twin C♭ major have?|7|5|6",
      "Why would a musician often choose D♭ major instead of C♯ major?|It has fewer accidentals, so it is easier to read|It sounds higher|It is a minor key",
      "Two keys that sound the same but are spelled differently are called ___ keys.|enharmonic|relative|parallel"
    ], "These keys are twins: the same sounds, written with different names.", "Count the sharps and flats. The two spellings of one key always add up to 12 together."),

    L("Augmented and diminished intervals", [
      ["Making intervals bigger or smaller", "➕➖", "A <b>perfect</b> interval made one half step <b>bigger</b> becomes <b>augmented</b>. Made one half step <b>smaller</b> it becomes <b>diminished</b>."],
      ["Major and minor too", "M → A", "A <b>major</b> interval made a half step bigger is augmented. A <b>minor</b> interval made a half step smaller is diminished."],
      ["The tritone", "6 ½", "C to F♯ is an <b>augmented 4th</b>, and C to G♭ is a <b>diminished 5th</b>. Both are 6 half steps (3 whole steps) and are called the <b>tritone</b>."]
    ], [
      "A perfect 5th has 7 half steps. Make it one half step smaller. What interval is it?|Diminished 5th|Augmented 5th|Minor 5th",
      "A perfect 4th has 5 half steps. Make it one half step bigger. What interval is it?|Augmented 4th|Diminished 4th|Major 4th",
      "How many half steps are in a tritone?|6|5|7",
      "C up to F♯ is which interval?|Augmented 4th|Perfect 4th|Diminished 4th",
      "C up to G♭ is which interval?|Diminished 5th|Perfect 5th|Augmented 5th",
      "A major 3rd has 4 half steps. Make it one half step bigger. What interval is it?|Augmented 3rd|Diminished 3rd|Perfect 3rd",
      "A minor 3rd has 3 half steps. Make it one half step smaller. What interval is it?|Diminished 3rd|Augmented 3rd|Major 3rd",
      "A tritone equals how many whole steps?|3|2|4"
    ], "Start with the normal (perfect, major or minor) interval, then change it by one half step.", "Bigger by a half step = augmented. Smaller by a half step = diminished."),

    L("Diminished and augmented triads", [
      ["Stacking thirds", "3️⃣", "A triad is two thirds stacked. <b>Major</b> = major 3rd + minor 3rd (4+3 half steps). <b>Minor</b> = minor 3rd + major 3rd (3+4)."],
      ["Two new triads", "°  +", "<b>Diminished</b> = two minor thirds (3+3). It spans 6 half steps. <b>Augmented</b> = two major thirds (4+4). It spans 8 half steps."],
      ["How they sound", "🌀", "Both sound unsettled and want to move. In a major key the <b>vii°</b> chord is diminished. Example: B D F."]
    ], [
      "A triad made of two minor thirds stacked is called what?|Diminished|Augmented|Major",
      "A triad made of two major thirds stacked is called what?|Augmented|Diminished|Minor",
      "A major third (4) then a minor third (3) make which triad?|Major|Minor|Diminished",
      "A minor third (3) then a major third (4) make which triad?|Minor|Major|Augmented",
      "C E G♯ is which kind of triad?|Augmented|Major|Diminished",
      "B D F is which kind of triad?|Diminished|Minor|Major",
      "C E♭ G♭ is which kind of triad?|Diminished|Augmented|Major",
      "How many half steps are from the bottom to the top of a diminished triad?|6|7|8",
      "How many half steps are from the bottom to the top of an augmented triad?|8|7|6"
    ], "Count the half steps in each third. Is it 3 or 4?", "Two 3s make a diminished triad. Two 4s make an augmented triad. A 4 and a 3 (either order) make major or minor."),

    L("The dominant seventh chord", [
      ["Four notes", "G7", "A <b>dominant 7th</b> chord (V7) is a major triad plus a <b>minor 7th</b> on top. In C major, V7 is <b>G7 = G B D F</b>."],
      ["The tense tritone", "B ↔ F", "In G7 the notes B and F make a tritone. They are tense and want to move: <b>B goes up to C</b> and <b>F goes down to E</b>."],
      ["Resolving home", "G7 → C", "V7 pulls strongly to the <b>I chord</b>. That pull is the most common way to end a piece."]
    ], [
      "In C major, the V7 chord is built on which note?|G|F|D",
      "Which notes make the G7 chord?|G B D F|G B D F♯|G B♭ D F",
      "How many different notes are in a seventh chord?|4|3|5",
      "The D7 chord has D, F♯, A and which fourth note?|C|C♯|B",
      "In C major, where does G7 want to go?|C major (I)|F major|A minor",
      "In G7, the tritone is between B and which note?|F|D|G",
      "In G7, the note F usually moves which way?|Down by step to E|Up by step to G|It does not move",
      "In G7, the interval from G to F is a ___ 7th.|minor|major|perfect"
    ], "A dominant 7th is a major triad with one extra note a minor seventh above the root.", "The most tense pair is the tritone. Both of those notes step to the nearest note of the home chord."),

    L("Common time and cut time", [
      ["The letter C", "C", "The symbol <b>C</b> is not a letter! It is <b>common time</b>, which means <b>4/4</b>."],
      ["The C with a line", "¢", "A C with a line through it is <b>cut time</b>, which means <b>2/2</b>. There are 2 beats in a bar, and the <b>half note</b> gets the beat."],
      ["Why cut?", "✂️", "In cut time you feel <b>two big beats</b> instead of four. The beats are 'cut' in half, so the music often feels faster and lighter."]
    ], [
      "The symbol C in a time signature means which meter?|4/4|2/2|3/4",
      "The symbol C with a line through it means which meter?|2/2|4/4|2/4",
      "In 2/2 time, which note gets one beat?|Half note|Quarter note|Eighth note",
      "How many beats are in each measure of cut time?|2|4|3",
      "In common time, which note gets one beat?|Quarter note|Half note|Eighth note",
      "Another name for common time is ___.|4/4|3/4|6/8",
      "How many quarter notes fill one measure of 2/2?|4|2|3",
      "How many beats does a whole note last in 2/2 time?|2|4|1",
      "What do you feel in cut time compared with common time?|Two bigger beats instead of four|Six small beats|Beats that are silent"
    ], "Think about the bottom number. It tells you which note gets one beat.", "A 2 on the bottom means the half note is the beat. Four on the bottom means the quarter note is the beat."),

    L("The alto clef", [
      ["A new clef", "𝄡", "The <b>alto clef</b> is a <b>C clef</b>. The middle of the sign points to the line that is <b>Middle C</b>. That is the <b>middle line</b> of the staff."],
      ["Who reads it?", "🎻", "The <b>viola</b> mostly reads alto clef. Its notes sit between the violin's high notes and the cello's low ones, so there are fewer ledger lines."],
      ["Other clefs", "𝄞 𝄢", "<b>Treble</b> (G clef) circles the G line. <b>Bass</b> (F clef) points to the F line. The C clef points to Middle C. Cellos read mostly bass clef."]
    ], [
      "Which instrument usually reads the alto clef?|Viola|Flute|Tuba",
      "The alto clef belongs to a family of clefs named after which letter?|C|G|F",
      "In alto clef, the middle line of the staff is which note?|Middle C|Treble G|Bass F",
      "Which clef do violins usually read?|Treble clef|Alto clef|Bass clef",
      "Why does the viola use alto clef?|Its notes sit in the middle, so there are fewer ledger lines|It plays only very high notes|It is silent",
      "Which clef points to the G line?|Treble clef|Alto clef|Bass clef",
      "Which clef points to the F line?|Bass clef|Treble clef|Alto clef",
      "Which clef do cellos read most of the time?|Bass clef|Alto clef|Treble clef"
    ], "Each clef is a pointer. Think about which line it points to.", "The C clef points to the middle line. Think about which instrument sits between high and low strings."),

    L("Double dots", [
      ["A second dot", "♩..", "A dot adds <b>half</b> of the note's value. A <b>double dot</b> adds another dot that is half of the first dot."],
      ["Example", "𝅗𝅥..", "A double-dotted half note = half (2 beats) + 1 beat + ½ beat = <b>3½ beats</b>."],
      ["Quarter and whole", "♩.. 𝅝..", "A double-dotted quarter = 1 + ½ + ¼ = <b>1¾ beats</b>. A double-dotted whole note = 4 + 2 + 1 = <b>7 beats</b>."]
    ], [
      "A dotted half note gets how many beats (quarter = 1 beat)?|3|2|4",
      "A double-dotted half note gets how many beats (quarter = 1 beat)?|3 1/2|3|4",
      "The second dot adds ___ of the value of the first dot.|half|double|the same",
      "A double-dotted quarter note gets how many beats?|1 3/4|1 1/2|2",
      "A double-dotted whole note gets how many beats?|7|6|8",
      "A note equals 3½ beats. How many dots does the half note have?|Two dots|One dot|Three dots",
      "A double-dotted half note = half + quarter + ___.|eighth|sixteenth|half",
      "A double-dotted quarter note = quarter + eighth + ___.|sixteenth|eighth|quarter",
      "A dotted quarter note gets how many beats?|1 1/2|1 1/4|2"
    ], "The first dot adds half of the note. The second dot adds half of the first dot.", "Add the pieces: note, then half of it, then half of that half."),

    L("Medieval music", [
      ["The Middle Ages", "🏰", "The Middle Ages were roughly the years 500 to 1400. Most written music came from the <b>church</b>, sung by monks and nuns."],
      ["Gregorian chant", "🎶", "<b>Gregorian chant</b> is one melody sung in Latin with no instruments and no harmony. One line only is called <b>monophonic</b>."],
      ["New ideas", "🧙", "<b>Hildegard of Bingen</b> was a nun who composed. <b>Troubadours</b> were travelling poet-musicians. Later, singers began adding a second line: early harmony called <b>organum</b>."]
    ], [
      "Gregorian chant has one melody and no harmony. What is that called?|Monophonic|Polyphonic|Homophonic",
      "Chant was mostly sung in which language?|Latin|English|Spanish",
      "Who was Hildegard of Bingen?|A nun who composed music|A king|A violin maker",
      "Troubadours were...|Travelling poet-musicians|Church bell makers|Drum makers",
      "The first kind of harmony, with a second voice added to chant, was called...|Organum|Opera|Sonata",
      "How many melody lines does monophonic music have?|One|Two|Four",
      "Which came first in history?|The Middle Ages|The Renaissance|The Romantic era",
      "Where was most written music made in the Middle Ages?|In the church|In movie studios|In schools of rock"
    ], "Think about who wrote down music a thousand years ago, and what they used.", "Remember: mono means one. The music was for voices, not instruments."),

    L("Renaissance music", [
      ["Rebirth", "🎨", "<b>Renaissance</b> means <b>rebirth</b>. From about 1400 to 1600 there was new interest in art, science and music."],
      ["Many voices", "👥", "Composers like <b>Palestrina</b> and <b>Josquin</b> wrote smooth <b>polyphony</b>: several independent melodies at once. Choirs often sang <b>a cappella</b> (no instruments)."],
      ["New things", "🖨️", "The <b>printing press</b> helped spread sheet music. People sang <b>madrigals</b> (songs for a few voices) and played the <b>lute</b> and the <b>recorder</b>."]
    ], [
      "The word Renaissance means...|Rebirth|War|Silence",
      "Polyphony means...|Many independent melodies at once|One single melody|Only drums",
      "Palestrina was a composer from which country?|Italy|Germany|Spain",
      "Which instrument looks like a guitar with a round back?|Lute|Banjo|Saxophone",
      "A cappella means singing...|Without instruments|Very loudly|Very fast",
      "What new invention helped spread printed music?|The printing press|The telephone|The radio",
      "Which came first?|The Renaissance|The Baroque|The Classical era",
      "Which wind instrument from this time is still used in schools?|Recorder|Saxophone|Clarinet",
      "A madrigal is a song for...|A few voices|A huge orchestra|One drum"
    ], "Think about what this time period was called and what a choir does without any instruments.", "Poly means many. Ask yourself how many lines or voices are going at once."),

    L("Interval songs", [
      ["Ear training trick", "👂", "You can remember how an interval sounds by thinking of the <b>first two notes of a song</b> you know."],
      ["Songs that help", "🎵", "<b>Perfect 5th up</b>: Twinkle, Twinkle. <b>Perfect 4th up</b>: Here Comes the Bride. <b>Major 3rd up</b>: Oh When the Saints. <b>Octave up</b>: Somewhere Over the Rainbow."],
      ["More ideas", "🦈", "<b>Major 2nd up</b>: Do-Re-Mi. <b>Major 6th up</b>: My Bonnie Lies Over the Ocean. <b>Half step up</b>: the Jaws theme. <b>Tritone</b>: the Simpsons theme."]
    ], [
      "The first two notes of Twinkle, Twinkle, Little Star make which interval?|Perfect 5th|Perfect 4th|Major 3rd",
      "The first two notes of Here Comes the Bride make which interval?|Perfect 4th|Perfect 5th|Octave",
      "The first jump in Somewhere Over the Rainbow is which interval?|Octave|Perfect 5th|Major 6th",
      "The start of Oh When the Saints (C up to E) is which interval?|Major 3rd|Minor 3rd|Perfect 4th",
      "The Do and Re of Do-Re-Mi make which interval?|Major 2nd|Minor 3rd|Perfect 4th",
      "My Bonnie Lies Over the Ocean starts with which interval?|Major 6th|Perfect 5th|Minor 7th",
      "The Simpsons theme starts with a jump called a...|Tritone|Perfect 4th|Octave",
      "The Jaws theme goes back and forth by a...|Half step|Whole step|Octave",
      "The Star Wars theme starts with a leap of a...|Perfect 5th|Half step|Tritone"
    ], "Sing or hum the first two notes of the song in your head.", "Compare the size of the jump with songs you know. Small steps and big leaps feel very different."),

    L("String techniques", [
      ["Bow or fingers", "🎻", "<b>Arco</b> means play with the bow. <b>Pizzicato</b> (pizz.) means pluck the strings with your fingers. After pizz., composers write <b>arco</b> to go back."],
      ["Fancy bowing", "〰️", "<b>Tremolo</b> is very fast repeated bow strokes on one note. <b>Col legno</b> means tap the strings with the wood of the bow. A <b>mute</b> (sordino) makes the sound soft and mellow."],
      ["Left hand tricks", "🤚", "<b>Vibrato</b> is a small wobble of pitch for a warm tone. <b>Glissando</b> is a slide. A <b>double stop</b> is playing two strings at once."]
    ], [
      "Pizzicato means...|Plucking the strings with fingers|Bowing fast|Tapping the body",
      "Arco means...|Play with the bow|Pluck the strings|Stop playing",
      "Tremolo on a violin is...|Very fast repeated bow strokes|A slide|A pluck",
      "Col legno means to hit the strings with...|The wood of the bow|The hair of the bow|A drumstick",
      "Vibrato is...|A small wobble in pitch for a warm tone|Playing two notes|A very loud note",
      "A double stop is...|Playing two strings at the same time|Stopping the music twice|Two players together",
      "After a pizzicato section, the composer writes ___ to go back to the bow.|arco|forte|legato",
      "A glissando on strings is...|Sliding a finger from one note to another|Tapping the body|Muting the strings",
      "A mute (sordino) makes the sound...|Softer and mellow|Louder|Higher"
    ], "Think about what the bow or the fingers are doing to the strings.", "Think of the Italian word. Pizzicato is a pinch, arco is a bow."),

    L("Reeds and woodwinds", [
      ["What is a reed?", "🌾", "A <b>reed</b> is a thin piece of cane that vibrates when you blow. <b>Single-reed</b> instruments: clarinet and saxophone. <b>Double-reed</b>: oboe and bassoon."],
      ["No reed", "🪈", "The <b>flute</b> has no reed. You blow <b>across</b> a hole, like blowing across a bottle. The <b>piccolo</b> is a tiny, very high flute."],
      ["Why woodwind?", "🎷", "The <b>saxophone</b> is made of metal but is a woodwind because it uses a reed. The <b>oboe</b> plays the note the orchestra tunes to."]
    ], [
      "Does a clarinet use a single reed or a double reed?|Single reed|Double reed|No reed",
      "Does an oboe use a single reed or a double reed?|Double reed|Single reed|No reed",
      "A flute makes sound by...|Blowing across an opening|Using a reed|Buzzing lips",
      "A saxophone is made of metal but is a woodwind because it uses...|A single reed|Buzzing lips|A double reed",
      "Does a bassoon use a single reed or a double reed?|Double reed|Single reed|No reed",
      "Which woodwind has no reed?|Flute|Clarinet|Oboe",
      "What is a reed usually made of?|Thin cane|Metal spring|Plastic string",
      "Which is the smallest, highest woodwind?|Piccolo|Bassoon|Clarinet",
      "Which instrument plays the note the orchestra tunes to?|Oboe|Tuba|Triangle"
    ], "Think about how the player starts the sound: with a reed or just air?", "Single means one reed, double means two reeds pressed together. The flute is the odd one out."),

    L("How brass instruments work", [
      ["Buzzing lips", "🎺", "Brass players <b>buzz their lips</b> into a cup-shaped mouthpiece. The buzz makes the air in the tube vibrate."],
      ["Changing notes", "🔧", "A <b>longer tube</b> makes a <b>lower</b> note. A trombone <b>slides</b> to make the tube longer. Trumpets and tubas press <b>valves</b> to add extra tubing. A standard trumpet has <b>3 valves</b>."],
      ["The harmonic series", "📏", "Players also tighten their lips to jump to higher notes on the same tube. A <b>bugle</b> has no valves and plays only notes of the <b>harmonic series</b>."]
    ], [
      "How does a brass player start the sound?|By buzzing their lips|By blowing on a reed|By plucking",
      "A trombone changes pitch mostly by using...|A slide|Three valves only|Reed keys",
      "How many valves does a standard trumpet have?|3|2|5",
      "Pressing valves makes the tube longer, so the pitch gets...|Lower|Higher|Louder",
      "Which brass instrument plays the lowest notes?|Tuba|Trumpet|French horn",
      "A bugle has no valves. It plays notes of the...|Harmonic series|Whole-tone scale|Blues scale",
      "Which brass instrument is coiled in a circle with a wide bell?|French horn|Trombone|Trumpet",
      "A longer tube gives a ___ pitch.|lower|higher|louder"
    ], "Think about what the player's lips do, and what a longer tube does.", "Valves and slides change the length of the tube. Long tube, low note."),

    L("Rhythm around the world", [
      ["Drums of the world", "🥁", "The <b>djembe</b> is a hand drum from West Africa. The <b>tabla</b> is a pair of hand drums from India. <b>Taiko</b> (Japanese for 'drum') are big drums from Japan."],
      ["Latin rhythms", "🇧🇷", "<b>Samba</b> is lively music from Brazil, famous at carnival. <b>Claves</b> are two wooden sticks hit together. A <b>clave</b> is also a repeated rhythm pattern that other parts follow."],
      ["Steel pan", "🛢️", "The <b>steel pan</b> comes from Trinidad and Tobago. It is a tuned drum made from a metal drum with dents hammered in."]
    ], [
      "The djembe is a hand drum from...|West Africa|Japan|Brazil",
      "The tabla comes from...|India|Cuba|Ireland",
      "Taiko are big drums from...|Japan|Mexico|Egypt",
      "The steel pan comes from...|Trinidad and Tobago|Norway|Peru",
      "Samba rhythm is famous from carnival in...|Brazil|Canada|Italy",
      "Claves are two ___ sticks hit together.|wooden|metal|rubber",
      "A tabla player plays with...|Hands and fingers|Big mallets|A bow",
      "In Japanese, taiko means...|Drum|Flute|Dance",
      "A repeated rhythm pattern in Latin music that other parts follow is a...|Clave|Scale|Clef"
    ], "Think about the part of the world where each instrument was invented.", "Use the name as a clue. Many instruments are named in the language of the place they come from."),

    L("Decibels and hearing", [
      ["Loudness", "🔊", "Loudness is measured in <b>decibels (dB)</b>. A whisper is about 30 dB. Talking is about 60 dB. A rock concert is about 110 dB."],
      ["Danger zone", "⚠️", "Listening for a long time at <b>85 dB or more</b> can damage your hearing for good. Pitch is measured in <b>hertz (Hz)</b>, which is different from loudness."],
      ["Protect your ears", "🎧", "Wear <b>earplugs</b> at loud concerts. With headphones use the <b>60/60 rule</b>: about 60% volume for no more than 60 minutes at a time. Give your ears quiet breaks."]
    ], [
      "Loudness is measured in...|Decibels|Hertz|Beats",
      "Which sound is loudest?|A rock concert|A whisper|Normal talking",
      "Listening for a long time above about how many dB can harm hearing?|85|40|20",
      "What should you wear at a loud concert?|Earplugs|A hat|Sunglasses",
      "Normal talking is about how loud?|60 dB|20 dB|120 dB",
      "The 60/60 rule means about 60% volume for no more than ___ minutes.|60|10|180",
      "What helps tired ears?|Quiet breaks|Turning the volume up|Listening longer",
      "Hertz (Hz) measures...|Pitch|Loudness|Speed of the beat"
    ], "Think about what decibels, hertz and earplugs each have to do with sound.", "Loud sounds listened to for a long time cause harm. Pitch and loudness are not the same."),

    L("Musical theater and film music", [
      ["The score", "🎬", "The music written for a movie is called its <b>score</b>. <b>John Williams</b> wrote scores for Star Wars, Jaws and E.T."],
      ["Leitmotif", "🧑‍🎤", "A <b>leitmotif</b> is a short theme tied to a character, place or idea. When it plays, you know who or what is coming."],
      ["On stage", "🎭", "<b>Musical theater</b> mixes acting, singing and dancing. An <b>overture</b> plays at the start. The <b>lyrics</b> are the words of the songs, and the <b>book</b> is the story and spoken lines."]
    ], [
      "A leitmotif is...|A short theme tied to a character or idea|A very loud drum|The last chord of a song",
      "Who wrote the music for Star Wars?|John Williams|Beethoven|Mozart",
      "The music written for a film is called its...|Score|Script|Stage",
      "An overture comes...|At the start of a show|At the end|In the middle",
      "Lyrics are...|The words of a song|Drum patterns|Stage lights",
      "In musical theater, the book is...|The story and spoken lines|The sheet music|The tickets",
      "A composer wants a cheerful scene. Which music fits best?|Light and bouncy in a major key|Slow, low and in a minor key|Silence only",
      "Musical theater combines...|Acting, singing and dancing|Painting and sculpture|Math and science"
    ], "Think about the job of music when you watch a show or a film.", "Think about how a recurring tune helps you remember who is on screen.")
  ];
  l13.push(
    MIX("Mixed practice", [l13[0], l13[1], l13[3], l13[5], l13[6], l13[9], l13[11], l13[12], l13[14], l13[15]]),
    MIX("Level 13 Challenge", [l13[2], l13[4], l13[7], l13[8], l13[10], l13[13], l13[16], l13[17], l13[0], l13[5]])
  );

  // ======================= LEVEL 14 =======================
  // major scales for computed questions
  const SC = {
    "C": ["C", "D", "E", "F", "G", "A", "B"], "G": ["G", "A", "B", "C", "D", "E", "F♯"], "D": ["D", "E", "F♯", "G", "A", "B", "C♯"],
    "A": ["A", "B", "C♯", "D", "E", "F♯", "G♯"], "E": ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"], "F": ["F", "G", "A", "B♭", "C", "D", "E"],
    "B♭": ["B♭", "C", "D", "E♭", "F", "G", "A"], "E♭": ["E♭", "F", "G", "A♭", "B♭", "C", "D"], "A♭": ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"]
  };
  const SIGN = { "C": "no sharps or flats", "G": "1 sharp", "D": "2 sharps", "A": "3 sharps", "E": "4 sharps", "F": "1 flat", "B♭": "2 flats", "E♭": "3 flats", "A♭": "4 flats" };
  const ORD = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];
  const degreeQ = () => {
    const keys = Object.keys(SC), k = pick(keys), n = ri(2, 7), ans = SC[k][n - 1];
    const pool = SC[k].filter((x, i) => x !== ans && i !== 0);
    const wr = shuf(pool).slice(0, 2);
    // plausible slip: the plain letter without its sharp or flat
    if (/[♯♭]/.test(ans) && Math.random() < 0.6) wr[0] = ans[0];
    const k2 = pick(keys.filter(x => x !== k)), n2 = ri(2, 7);
    return {
      text: `In ${k} major, which note is the ${ORD[n]} note of the scale?`,
      choices: shuf([ans, ...wr]).map(A), answer: A(ans),
      hints: [
        "Count up the scale. The 1st note has the same name as the key.",
        `The key of ${k} major has ${SIGN[k]}. Say the letter names in order from the key note, then fix them with the key signature.`,
        `Example: in ${k2} major the notes are ${SC[k2].join(" ")}, so the ${ORD[n2]} note is ${SC[k2][n2 - 1]}. Now do yours.`
      ]
    };
  };
  const hzQ = () => {
    const f = ri(5, 30) * 20, t = ri(0, 2), ex = pick([110, 130, 170, 190]);
    const ans = t === 0 ? f * 2 : t === 1 ? f / 2 : f * 4;
    const phr = ["one octave higher", "one octave lower", "two octaves higher"][t];
    const exAns = t === 0 ? ex * 2 : t === 1 ? ex / 2 : ex * 4;
    return {
      text: `A note vibrates at ${f} Hz. A note ${phr} vibrates at how many Hz?`, answer: ans,
      hints: [
        "Going up an octave changes the frequency by a simple factor. Going down changes it the opposite way.",
        "One octave up doubles the Hz. One octave down halves it. Two octaves means doing it twice.",
        `Example: if a note is ${ex} Hz, ${phr} is ${exAns} Hz. Now do yours.`
      ]
    };
  };

  const l14 = [
    L("Which clef for which instrument?", [
      ["Treble instruments", "𝄞", "<b>Treble clef</b>: violin, flute, oboe, clarinet, trumpet, and the right hand on the piano."],
      ["Bass instruments", "𝄢", "<b>Bass clef</b>: cello, double bass, bassoon, trombone, tuba, and the left hand on the piano."],
      ["Alto and tenor", "𝄡", "The <b>viola</b> reads <b>alto clef</b>. Cellos, bassoons and trombones sometimes use <b>tenor clef</b> for high notes, to avoid too many ledger lines."]
    ], [
      "Which clef do flutes read?|Treble clef|Bass clef|Alto clef",
      "Which clef do tubas read?|Bass clef|Treble clef|Alto clef",
      "Which clef does the viola read?|Alto clef|Treble clef|Bass clef",
      "Which clef do trumpets read?|Treble clef|Bass clef|Alto clef",
      "Which clef does a trombone mostly read?|Bass clef|Treble clef|Alto clef",
      "Which clef does the double bass read?|Bass clef|Treble clef|Alto clef",
      "Which clef do clarinets read?|Treble clef|Bass clef|Alto clef",
      "Piano music is usually written in which two clefs?|Treble and bass|Alto and tenor|Only treble",
      "On the piano, which hand usually reads the treble clef?|Right hand|Left hand|Both hands every time"
    ], "High instruments and low instruments use different clefs. Where does this instrument sit?", "Low-sounding instruments read bass clef. The viola is the one in the middle."),

    L("The ii–V–I progression", [
      ["A famous trio", "ii V I", "In C major the chords are <b>Dm – G – C</b>. We call them <b>ii – V – I</b> (two, five, one)."],
      ["Why it works", "➡️", "<b>ii</b> leaves home, <b>V</b> builds tension, and <b>I</b> is the home chord that feels finished. Each root moves down a fifth."],
      ["In jazz", "🎷", "Jazz often uses <b>Dm7 – G7 – Cmaj7</b>. The same pattern works in any key: in G it is Am – D – G."]
    ], [
      "In C major, the ii chord is...|D minor|D major|E minor",
      "In C major, the V chord is...|G major|F major|A minor",
      "Which progression is ii–V–I in C major?|Dm – G – C|Em – A – D|Am – D – G",
      "Which progression is ii–V–I in G major?|Am – D – G|Dm – G – C|Bm – E – A",
      "Which progression is ii–V–I in F major?|Gm – C – F|Am – D – G|Dm – G – C",
      "Dm7 – G7 – Cmaj7 is a famous progression in which style?|Jazz|Marching band|Bagpipe music",
      "In ii–V–I, which chord is the home chord at the end?|I|ii|V",
      "In ii–V–I, the ii chord usually moves to which chord?|V|vi|IV"
    ], "Number the chords of the scale. Which chord numbers does this pattern use?", "Find the second and fifth notes of the scale, then add the home chord."),

    L("Notes that don't belong to the chord", [
      ["Chord tones and others", "🎯", "<b>Chord tones</b> belong to the chord. Other melody notes are <b>non-chord tones</b>. They add tension and then move on."],
      ["Passing and neighbor", "↔️", "A <b>passing tone</b> steps between two different chord tones (C–D–E over a C chord). A <b>neighbor tone</b> steps away and comes back (E–F–E)."],
      ["Suspension", "⏳", "A <b>suspension</b> is a note held over from the old chord. It clashes with the new chord, then <b>steps down</b> to a note that fits. An <b>anticipation</b> arrives early."]
    ], [
      "A note that steps between two different chord notes is a...|Passing tone|Neighbor tone|Suspension",
      "A note that steps away from a chord tone and returns is a...|Neighbor tone|Passing tone|Anticipation",
      "A suspension usually resolves by moving...|Down by step|Up by a leap|It stays forever",
      "Over a C chord (C E G) the melody goes C–D–E. The D is a...|Passing tone|Chord tone|Rest",
      "Over a C chord the melody goes E–F–E. The F is a...|Neighbor tone|Passing tone|Suspension",
      "A chord tone is...|A note that belongs to the chord|A note outside the chord|A rest",
      "An anticipation arrives ___ the chord changes.|before|after|never",
      "A note held over from the old chord into the new chord is a...|Suspension|Passing tone|Neighbor tone"
    ], "Ask: does this note belong to the chord? How did the melody get to it and where does it go?", "Passing tones travel through. Neighbor tones go away and return. Suspensions wait."),

    L("How voices move", [
      ["Four ways to move", "↗️↘️", "When two lines move together there are four kinds of motion: <b>parallel</b>, <b>similar</b>, <b>contrary</b> and <b>oblique</b>."],
      ["What they mean", "🔀", "<b>Contrary</b>: one goes up while the other goes down. <b>Parallel</b>: both move the same direction by the same interval. <b>Similar</b>: same direction, different intervals. <b>Oblique</b>: one stays and one moves."],
      ["Voice-leading rules", "📝", "Classical composers avoid parallel <b>fifths and octaves</b>, which make lines sound less independent. They use small steps and keep common tones."]
    ], [
      "One voice goes up while the other goes down. What is that called?|Contrary motion|Parallel motion|Oblique motion",
      "Both voices go up by a third at the same distance. What is that called?|Parallel motion|Contrary motion|Oblique motion",
      "One voice stays on the same note while the other moves. What is that called?|Oblique motion|Parallel motion|Contrary motion",
      "Both voices go the same direction, but the distance between them changes. What is that called?|Similar motion|Contrary motion|Oblique motion",
      "Classical composers usually avoid parallel...|Fifths and octaves|Thirds|Sixths",
      "Voice leading is about...|How each line moves from chord to chord|How loud the choir is|How many people sing",
      "For smooth voice leading it is best to move by...|Small steps when possible|Huge leaps always|Silence",
      "When two chords share a note, the usual advice is to...|Keep that note in the same voice|Drop it|Move it far away"
    ], "Look at the direction of each voice and whether they stay the same distance apart.", "Same direction and distance = parallel. Opposite directions = contrary. One stays = oblique."),

    L("The four movements of a symphony", [
      ["A symphony in parts", "🎻", "A classical <b>symphony</b> usually has <b>four movements</b>. A movement is a large section with its own tempo and mood."],
      ["The usual plan", "1 2 3 4", "1: <b>fast</b> (often sonata form). 2: <b>slow</b> and singing. 3: a dance, the <b>minuet</b> (in 3/4) or the livelier <b>scherzo</b>. 4: a <b>fast finale</b>."],
      ["Word help", "😄", "<b>Scherzo</b> is Italian for <b>joke</b>. Beethoven used scherzos instead of minuets. The last movement is called the <b>finale</b>."]
    ], [
      "How many movements does a typical classical symphony have?|4|2|10",
      "The first movement of a symphony is usually...|Fast|Slow|Spoken",
      "The second movement of a symphony is usually...|Slow and singing|The fastest|Silent",
      "The third movement was often a...|Minuet and trio (a dance)|Opera aria|Rap",
      "The last movement of a symphony is called the...|Finale|Overture|Prelude",
      "A movement is...|A large section of a bigger piece|A dance step|A march",
      "Scherzo is Italian for...|Joke|Storm|Sleep",
      "A minuet is in which meter?|3/4|4/4|5/4",
      "The first movement is often written in...|Sonata form|12-bar blues form|A round"
    ], "Think about the order: how does a symphony start, and how does it end?", "Fast, slow, dance, fast is the usual plan."),

    L("The concerto and cadenza", [
      ["Soloist and orchestra", "🎹", "A <b>concerto</b> is a piece for a <b>solo instrument</b> and an orchestra. A <b>piano concerto</b> has a solo pianist at the front."],
      ["Three movements", "⚡🐢⚡", "Most concertos have <b>three movements</b>: fast, slow, fast. In a Baroque <b>concerto grosso</b> a small group of soloists plays against the full orchestra."],
      ["The cadenza", "✨", "A <b>cadenza</b> is a showy solo passage where the orchestra stops. It was often <b>improvised</b>. It usually comes near the end of a movement."]
    ], [
      "A concerto features...|A soloist with an orchestra|Only a choir|Only drums",
      "A typical concerto has how many movements?|3|5|1",
      "The usual tempo plan of a concerto is...|Fast, slow, fast|Slow, slow, slow|Loud, silent, loud",
      "A cadenza is...|A showy solo passage|The final chord|A dance",
      "During a cadenza, the orchestra usually...|Stops and lets the soloist play|Plays louder|Dances",
      "A piano concerto has a solo...|Piano|Trumpet|Harp",
      "Cadenzas were often ___ by the soloist.|Improvised|Banned|Copied from the orchestra",
      "In a Baroque concerto grosso a small group of soloists plays against...|The full orchestra|A choir|Nobody"
    ], "Concerto means a contest or working together. Who is the star?", "One star, three movements, and one flashy solo section."),

    L("Great Baroque composers", [
      ["Johann Sebastian Bach", "🎹", "<b>Bach</b> (Germany) was a master of the <b>organ</b> and of fugues. He wrote the <b>Brandenburg Concertos</b>."],
      ["Handel and Vivaldi", "🎼", "<b>Handel</b> was born in Germany and worked in England. He wrote <b>Messiah</b> (with the Hallelujah Chorus) and <b>Water Music</b> for a royal boat trip on the River Thames. <b>Vivaldi</b> (Italy) wrote <b>The Four Seasons</b>."],
      ["More names", "🇬🇧", "<b>Purcell</b> was an English Baroque composer. <b>Telemann</b> was a German composer who wrote a huge amount of music."]
    ], [
      "Who wrote The Four Seasons?|Vivaldi|Bach|Handel",
      "Who wrote the Messiah, which includes the Hallelujah Chorus?|Handel|Vivaldi|Haydn",
      "Who wrote the Brandenburg Concertos?|Bach|Mozart|Handel",
      "Vivaldi came from which country?|Italy|Germany|Spain",
      "Bach was famous as a great player of the...|Organ|Saxophone|Banjo",
      "Handel's Water Music was first played for...|A royal boat trip on the River Thames|A circus|A sports match",
      "Bach came from which country?|Germany|France|Russia",
      "How many concertos make up The Four Seasons?|4|2|12"
    ], "Match the piece with its composer. Think about the title of each piece.", "The Four Seasons has a number in the title. Messiah is a famous choral work."),

    L("Great Classical composers", [
      ["Haydn", "🎻", "<b>Haydn</b> (Austria) wrote over 100 symphonies and is called the <b>Father of the Symphony</b>. His <b>Surprise Symphony</b> has a sudden loud chord."],
      ["Mozart", "⭐", "<b>Mozart</b> (Austria) was a child prodigy who wrote music at age five. He wrote the opera <b>The Magic Flute</b> and <b>Eine kleine Nachtmusik</b> ('A little night music')."],
      ["Beethoven", "🎹", "<b>Beethoven</b> (Germany) wrote 9 symphonies. The <b>Fifth</b> starts with da-da-da-DUM, and the <b>Ninth</b> has <b>Ode to Joy</b>. He kept composing after he lost his hearing."]
    ], [
      "Who wrote the Surprise Symphony?|Haydn|Mozart|Beethoven",
      "Who wrote the opera The Magic Flute?|Mozart|Haydn|Bach",
      "Who wrote nine symphonies, including one with Ode to Joy?|Beethoven|Mozart|Haydn",
      "Which composer started writing music at about age five?|Mozart|Beethoven|Haydn",
      "Beethoven kept composing after he lost his...|Hearing|Sight|Piano",
      "Haydn is called the Father of the...|Symphony|Piano|Blues",
      "Mozart came from which country?|Austria|Brazil|Japan",
      "Which Beethoven symphony begins da-da-da-DUM?|The Fifth|The First|The Ninth",
      "Eine kleine Nachtmusik was written by...|Mozart|Haydn|Beethoven"
    ], "Think about the one famous piece for each composer.", "Haydn is linked with symphonies, Mozart with opera and child talent, Beethoven with the Fifth and Ninth."),

    L("American composers", [
      ["Marches and ragtime", "🎺", "<b>John Philip Sousa</b>, the 'March King', wrote marches such as <b>The Stars and Stripes Forever</b>. <b>Scott Joplin</b> wrote ragtime piano pieces like <b>The Entertainer</b>."],
      ["Jazz meets classical", "🎹", "<b>George Gershwin</b> wrote <b>Rhapsody in Blue</b>, which mixes classical music with jazz. <b>Duke Ellington</b> led a famous jazz band."],
      ["The wide-open sound", "🌾", "<b>Aaron Copland</b> wrote <b>Appalachian Spring</b> and <b>Rodeo</b>, using American folk tunes. <b>Leonard Bernstein</b> wrote <b>West Side Story</b>."]
    ], [
      "Who was the March King?|Sousa|Joplin|Gershwin",
      "Who wrote Rhapsody in Blue?|Gershwin|Copland|Sousa",
      "Who wrote the ragtime piece The Entertainer?|Scott Joplin|Bernstein|Copland",
      "Who wrote Appalachian Spring?|Copland|Gershwin|Sousa",
      "Who wrote West Side Story?|Bernstein|Joplin|Copland",
      "Ragtime is lively piano music with ___ rhythms.|syncopated|silent|slow chant",
      "John Philip Sousa mostly wrote...|Marches|Lullabies|Operas",
      "Rhapsody in Blue mixes classical music with...|Jazz|Polka|Chant",
      "Copland's music often uses...|American folk tunes|Medieval chant|Electronic beeps"
    ], "Match each title with the composer and the kind of music they wrote.", "March, ragtime, jazz-classical mix, folk-style, musical theater: one composer for each."),

    L("Jazz through the years", [
      ["Early jazz and swing", "🎷", "Jazz began in <b>New Orleans</b> (Dixieland) in the early 1900s. <b>Louis Armstrong</b> played trumpet. In the 1930s <b>swing</b> was big-band dance music, led by <b>Duke Ellington</b> and <b>Count Basie</b>."],
      ["Bebop and cool", "⚡", "<b>Bebop</b> (1940s) was fast and complex for small groups, with <b>Charlie Parker</b> on sax. <b>Cool jazz</b> (1950s) was relaxed and smooth, with <b>Miles Davis</b>."],
      ["Fusion", "🎸", "<b>Fusion</b> (late 1960s and 70s) mixed jazz with rock and electric instruments."]
    ], [
      "Swing music was usually played by...|Big bands|Solo flutes|Choirs only",
      "Bebop was...|Fast and complex, played by small groups|Slow lullabies|Church chant",
      "Louis Armstrong played the...|Trumpet|Harp|Tuba",
      "Which jazz style began in New Orleans?|Dixieland|Bebop|Fusion",
      "Cool jazz sounded...|Relaxed and smooth|Super fast|Very noisy",
      "Jazz fusion mixes jazz with...|Rock and electric instruments|Opera|Polka",
      "Charlie Parker was a famous...|Saxophone player|Drummer|Opera singer",
      "Duke Ellington led a...|Big band|String quartet|Choir",
      "Swing was popular music for...|Dancing|Silent reading|Marching only"
    ], "Think of the decade or the setting: dance halls, small clubs, or New Orleans streets.", "Swing: big band. Bebop: small, fast. Cool: relaxed. Fusion: jazz plus electric rock."),

    L("Electric instruments", [
      ["Pickups", "🎸", "An <b>electric guitar</b> has <b>pickups</b> (magnets with coils) that turn string vibrations into an electric signal. The signal goes to an <b>amplifier</b> and speaker."],
      ["Bass and acoustic", "🔌", "A <b>solid-body</b> guitar is quiet when unplugged because it has no hollow body to make the sound bigger. An <b>acoustic</b> guitar gets loud from its hollow wooden body. A standard <b>bass guitar</b> has 4 strings: E, A, D and G."],
      ["Effects and synths", "🎛️", "<b>Distortion</b> makes sound crunchy. <b>Reverb</b> adds a room-like echo. A <b>synthesizer</b> makes sound electronically."]
    ], [
      "Pickups on an electric guitar turn string vibrations into...|An electrical signal|Light|Heat",
      "The signal from the pickups goes to...|An amplifier|A music stand|A clef",
      "Why is a solid-body electric guitar quiet when unplugged?|It has no hollow body to boost the sound|It has no strings|It has no frets",
      "How many strings does a standard bass guitar have?|4|12|8",
      "A distortion pedal makes a guitar sound...|Crunchy and fuzzy|Quieter|Like a flute",
      "A reverb effect adds...|A room-like echo|A beat|A harmony",
      "An acoustic guitar gets loud from...|Its hollow wooden body|Pickups|Batteries",
      "A synthesizer makes sound...|Electronically|Only by plucking|By buzzing lips",
      "The standard bass guitar strings are E, A, D and...|G|C|B"
    ], "Think about the path of the sound from the strings to the speaker.", "Pickups, then amp. A hollow body is what makes an acoustic guitar loud."),

    L("Pitch on strings and pipes", [
      ["Strings", "🎻", "A <b>shorter</b> string sounds <b>higher</b>. A <b>thinner</b> string sounds higher. A <b>tighter</b> string sounds higher. A string cut to <b>half length</b> sounds one octave higher."],
      ["Pipes and tubes", "📏", "A <b>longer</b> pipe or column of air sounds <b>lower</b>. On a flute, covering more holes makes the vibrating air column longer, so the pitch gets lower."],
      ["Why instruments differ", "🎸", "Pressing a string on a fret shortens the string and raises the pitch. The double bass sounds lower than a violin because its strings are longer and thicker."]
    ], [
      "A shorter string gives a ___ pitch.|higher|lower|same",
      "A thicker string gives a ___ pitch.|lower|higher|same",
      "Tightening a string makes its pitch...|Higher|Lower|The same",
      "A string cut to half its length sounds...|An octave higher|An octave lower|A fifth lower",
      "A longer organ pipe gives a ___ note.|lower|higher|louder",
      "Covering more holes on a flute makes the pitch...|Lower|Higher|Louder",
      "Pressing a string against a fret...|Shortens the string so the pitch rises|Loosens the string|Does nothing",
      "Why does the double bass sound lower than a violin?|Its strings are longer and thicker|It is smaller|It has fewer strings",
      "Turning a tuning peg to make a string tighter makes the pitch go...|Up|Down|Silent"
    ], "Picture the vibrating part. Is it getting longer, thicker or tighter?", "Short, thin and tight mean high. Long, thick and loose mean low."),

    F("Frequency and octaves", [
      ["Hertz", "A = 440", "<b>Frequency</b> is how many times a sound wave vibrates each second, measured in <b>hertz (Hz)</b>. The A above middle C is <b>440 Hz</b>."],
      ["Octave up", "× 2", "An octave higher <b>doubles</b> the frequency: A is 440 Hz, the next A up is 880 Hz."],
      ["Octave down", "÷ 2", "An octave lower <b>halves</b> it: the A below is 220 Hz, then 110 Hz. Two octaves up means doubling twice (× 4)."]
    ], hzQ),

    F("Notes in other keys", [
      ["The scale pattern", "W W H W W W H", "A major scale uses the pattern <b>whole, whole, half, whole, whole, whole, half</b> from any starting note."],
      ["Use the key signature", "♯♭", "To find a note, say the letters in order from the key note. Then add the sharps or flats from the <b>key signature</b>. D major has F♯ and C♯."],
      ["Check your work", "✅", "A scale uses <b>each letter once</b>. For example B♭ major is B♭ C D E♭ F G A: there are no repeated letters."]
    ], degreeQ),

    L("Playing well together", [
      ["Tuning and balance", "🎼", "<b>Intonation</b> means how well in tune you are. <b>Balance</b> means every part can be heard and the melody comes through. <b>Blend</b> means sounding like one big instrument."],
      ["Watching and counting", "👀", "Players watch the <b>conductor</b> or leader to start together. A <b>cue</b> is a signal to come in. When you have a long rest, <b>count the bars</b> and keep listening."],
      ["Finding your place", "🔤", "<b>Rehearsal marks</b> are letters or numbers in boxes on the score. They let the group say 'start at B'."]
    ], [
      "Intonation means...|How well the notes are in tune|How fast the music is|How loud it is",
      "Balance in an ensemble means...|Every part can be heard and the melody comes through|Everyone plays as loud as possible|Only one person plays",
      "Boxed letters like A, B and C in a score are...|Rehearsal marks|Time signatures|Dynamics",
      "A cue is...|A signal for when to come in|A repeat sign|A kind of rest",
      "When you have many bars of rest, you should...|Count them and keep listening|Stop paying attention|Talk to a friend",
      "Blend means...|Sounding together like one voice|One player standing out|Playing very fast",
      "Who do ensemble players watch to start together?|The conductor or leader|The audience|The stage crew",
      "Before an ensemble plays, the first job is usually to...|Tune|Play as loud as possible|Leave the room"
    ], "Think about what a good team does while playing music.", "Listen, watch, count and tune."),

    L("Ways to write music", [
      ["Staff notation", "🎼", "<b>Staff notation</b> shows exact pitch and rhythm. It is used for classical, choir, band and much more."],
      ["Tab and lead sheets", "🎸", "<b>Guitar tab</b> has 6 lines for the 6 strings, and numbers show which <b>fret</b> to press. Bass tab has 4 lines. A <b>lead sheet</b> shows the melody, chord symbols and lyrics."],
      ["Other ways", "💻", "A <b>piano roll</b> on a computer shows notes as bars on a grid. <b>Graphic notation</b> uses shapes and drawings, and some modern composers use it."]
    ], [
      "Guitar tablature has how many lines?|6|4|5",
      "Bass guitar tablature has how many lines?|4|6|8",
      "A lead sheet shows...|Melody, chord symbols and lyrics|Only drums|Nothing",
      "A computer piano roll shows notes as...|Bars on a grid|Letters only|Stickers",
      "Graphic notation uses...|Shapes and drawings|Only numbers|Only words",
      "The numbers on a tab line tell you...|Which fret to press|Which finger to use|Which bow to use",
      "Which method shows exact pitch and rhythm best?|Staff notation|A rough drawing|A single word",
      "Each line of guitar tab stands for...|One string|One beat|One chord"
    ], "Think about the instrument and what the player most needs to know.", "A tab's lines are strings, and the numbers are frets."),

    L("Changing a motif", [
      ["Growing from one idea", "🌱", "A <b>motif</b> is a short musical idea. Composers can build a whole piece by changing it in different ways."],
      ["Four ways to change", "🔁", "<b>Sequence</b>: repeat it starting on a higher or lower note. <b>Inversion</b>: turn it upside down (up becomes down). <b>Retrograde</b>: play it backwards."],
      ["Changing the speed", "⏱️", "<b>Augmentation</b>: make the notes twice as long. <b>Diminution</b>: make them half as long. Example: C–D–E backwards is E–D–C."]
    ], [
      "Playing a motif backwards is called...|Retrograde|Inversion|Sequence",
      "Turning a motif upside down is called...|Inversion|Retrograde|Sequence",
      "Repeating a motif starting on a higher or lower note is called...|Sequence|Inversion|Retrograde",
      "Making all the note values twice as long is called...|Augmentation|Diminution|Inversion",
      "Making all the note values half as long is called...|Diminution|Augmentation|Retrograde",
      "The retrograde of C–D–E is...|E–D–C|C–D–E|G–A–B",
      "The inversion of an up-step from C to D is...|A down-step from C to B|C to D again|An up leap to G",
      "C D E followed by D E F is an example of...|Sequence|Retrograde|Inversion",
      "Changing a motif lets composers...|Build a whole piece from one small idea|Hide the melody|Avoid notes"
    ], "Ask what changed: the order, the direction, the starting note or the speed?", "Back = retrograde. Flip = inversion. Same shape higher or lower = sequence."),

    L("Music that tells a story", [
      ["Program music", "📖", "<b>Program music</b> tells a story or paints a picture with sound. Music with no story, just notes, is called <b>absolute music</b>."],
      ["Peter and the Wolf", "🐦", "In <b>Peter and the Wolf</b> by <b>Prokofiev</b>, each character has an instrument: bird = <b>flute</b>, duck = <b>oboe</b>, cat = <b>clarinet</b>, grandfather = <b>bassoon</b>, wolf = <b>French horns</b>."],
      ["Other examples", "🪐", "<b>Holst</b> wrote <b>The Planets</b>. <b>Saint-Saëns</b> wrote <b>Carnival of the Animals</b>. <b>Mussorgsky</b> wrote <b>Pictures at an Exhibition</b>, inspired by paintings and drawings."]
    ], [
      "Music that tells a story or paints a picture is called...|Program music|Absolute music|A scale",
      "In Peter and the Wolf, the bird is played by the...|Flute|Tuba|Drum",
      "In Peter and the Wolf, the duck is played by the...|Oboe|Violin|Trumpet",
      "In Peter and the Wolf, the cat is played by the...|Clarinet|Cello|Harp",
      "In Peter and the Wolf, the grandfather is played by the...|Bassoon|Piccolo|Triangle",
      "In Peter and the Wolf, the wolf is played by the...|French horns|Flute|Xylophone",
      "Who wrote The Planets?|Holst|Mozart|Sousa",
      "Who wrote Carnival of the Animals?|Saint-Saëns|Haydn|Bernstein",
      "Pictures at an Exhibition was inspired by...|Paintings and drawings|Sports games|Cooking"
    ], "Match the character or title with its instrument or composer.", "Small and light characters get high instruments. Heavier characters get lower ones.")
  ];
  l14.push(
    MIX("Mixed practice", [l14[0], l14[1], l14[3], l14[5], l14[6], l14[7], l14[9], l14[11], l14[12], l14[13]]),
    MIX("Level 14 Challenge", [l14[2], l14[4], l14[8], l14[10], l14[14], l14[15], l14[16], l14[17], l14[12], l14[13]])
  );

  // ======================= LEVEL 15 =======================
  const NAT = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }, LET = "CDEFGAB";
  const QUAL = { major: [0, 4, 7], minor: [0, 3, 7], diminished: [0, 3, 6], augmented: [0, 4, 8] };
  const spell = (rl, racc, ivs) => {
    const out = [];
    for (let i = 0; i < 3; i++) {
      const lt = LET[(LET.indexOf(rl) + i * 2) % 7], d = (((NAT[rl] + racc + ivs[i] - NAT[lt]) % 12) + 12) % 12;
      if (d === 0) out.push(lt); else if (d === 1) out.push(lt + "♯"); else if (d === 11) out.push(lt + "♭"); else return null;
    }
    return out.join(" – ");
  };
  const triadQ = () => {
    for (let n = 0; n < 200; n++) {
      const rl = pick(LET.split("")), racc = pick([-1, 0, 0, 1]), q = pick(Object.keys(QUAL));
      const all = Object.keys(QUAL).map(k => [k, spell(rl, racc, QUAL[k])]);
      const right = all.find(x => x[0] === q)[1], others = all.filter(x => x[0] !== q && x[1]).map(x => x[1]);
      if (!right || others.length < 2) continue;
      const root = rl + (racc === 1 ? "♯" : racc === -1 ? "♭" : "");
      const exq = q === "major" ? "A minor triad is A – C – E (3 half steps to C, 7 to E)." : "C major triad is C – E – G (4 half steps to E, 7 to G).";
      return {
        text: `Which notes spell the ${root} ${q} triad?`,
        choices: shuf([right, ...shuf(others).slice(0, 2)]).map(A), answer: A(right),
        hints: [
          "Start on the root. Skip a letter for the third and skip another letter for the fifth, then fix the sharps and flats.",
          `In a ${q} triad the third is ${QUAL[q][1]} half steps and the fifth is ${QUAL[q][2]} half steps above the root.`,
          `Example: ${exq} Now do yours.`
        ]
      };
    }
  };

  const l15 = [
    L("Extended and suspended chords", [
      ["Sus chords", "sus", "In a <b>suspended</b> chord the 3rd is replaced. <b>Csus2</b> = C D G. <b>Csus4</b> = C F G. They sound open, as if they want to move on."],
      ["Added notes", "add", "<b>Cadd9</b> = C E G + D. <b>C6</b> = C E G + A. <b>Cmaj7</b> = C E G + B. A <b>9</b> in a chord name is the same letter as the 2nd, an octave higher."],
      ["Slash chords", "C/G", "A <b>slash chord</b> like <b>C/G</b> means a C chord with G in the bass. The note after the slash is the lowest note."]
    ], [
      "Which notes are in the Csus4 chord?|C F G|C D G|C E G",
      "Which notes are in the Csus2 chord?|C D G|C F G|C E G",
      "In a sus chord, which note of the triad is replaced?|The 3rd|The root|The 5th",
      "The slash chord C/G means...|A C chord with G in the bass|A G chord with C in the bass|C and G played very loudly",
      "Which note is added to C E G to make Cadd9?|D|F|B",
      "Which note is added to C E G to make C6?|A|B|F",
      "Which note is added to C E G to make Cmaj7?|B|B♭|A",
      "G/B is a G chord with which note in the bass?|B|G|D",
      "A 9 in a chord name has the same letter name as the...|2nd|4th|7th"
    ], "Look at the chord name and decide which note of the plain triad changes or is added.", "C E G is the plain C triad. The number tells you which scale note to use."),

    L("Chord functions", [
      ["Three jobs", "T S D", "Chords have jobs. <b>Tonic</b> (I, and vi) is home and feels stable. <b>Subdominant</b> (IV, ii) moves away from home. <b>Dominant</b> (V, vii°) builds tension."],
      ["Typical journey", "🏠➡️🚶➡️⚡➡️🏠", "A common order is <b>tonic → subdominant → dominant → tonic</b>. For example in C: C – F – G – C."],
      ["Leading tone", "7 → 1", "The dominant chord contains the <b>leading tone</b> (the 7th note), which wants to move up to the tonic."]
    ], [
      "The I chord has which function?|Tonic|Dominant|Subdominant",
      "The V chord has which function?|Dominant|Tonic|Subdominant",
      "The IV chord has which function?|Subdominant|Dominant|Tonic",
      "Which chord function feels like home?|Tonic|Dominant|Subdominant",
      "Which function usually comes just before the final tonic of a phrase?|Dominant|Subdominant|Another tonic",
      "The ii chord has which function?|Subdominant|Tonic|Dominant",
      "A typical chord journey goes...|Tonic, subdominant, dominant, tonic|Dominant, tonic, dominant, subdominant|Subdominant, subdominant, silence",
      "The vi chord often acts as a substitute for I, so its function is...|Tonic|Dominant|Subdominant",
      "The leading tone (7th note) wants to move to the...|Tonic|Dominant|3rd"
    ], "Think of tonic as home, subdominant as leaving home, and dominant as the pull back.", "I and vi are home-like. IV and ii are away from home. V is tension."),

    L("Secondary dominants", [
      ["Dominant of something else", "V/V", "A <b>secondary dominant</b> is the dominant chord of a chord <b>other than I</b>. It makes that chord feel temporarily like home."],
      ["In C major", "D7 → G", "<b>V/V</b> is the dominant of V: in C that is <b>D (or D7)</b>, which leads to G. <b>V7/IV</b> is C7 leading to F. <b>V7/vi</b> is E7 leading to Am."],
      ["New notes", "F♯", "Secondary dominants add notes from outside the key. The D chord in C major needs <b>F♯</b>, which is not in the C major scale."]
    ], [
      "In C major, D7 is the dominant of which chord?|G|C|F",
      "In C major, C7 leads strongly to which chord?|F|G|A minor",
      "In C major, E7 leads to which chord?|A minor|D minor|G",
      "A secondary dominant is a dominant chord of a chord other than...|I (the tonic)|V|ii",
      "The chord D7 in the key of C major has a note outside the key. Which is it?|F♯|B♭|A♭",
      "V/V is called the...|Dominant of the dominant|Double tonic|Subdominant",
      "In G major, what is V/V (the dominant of D)?|A (or A7)|C|D",
      "In F major, what is V/V (the dominant of C)?|G (or G7)|C|B♭",
      "Secondary dominants add...|Color and a pull toward a new chord|Total silence|A new clef"
    ], "Find the target chord first. Then find the chord whose root is a fifth above it.", "V7/x means the dominant 7th chord that leads to x. It sits a fifth above x."),

    L("Borrowed chords", [
      ["Borrowing", "🏦", "A <b>borrowed chord</b> comes from the <b>parallel minor</b> (same home note). This is called <b>modal mixture</b>. In C major we can borrow from C minor."],
      ["Popular ones", "iv  ♭VI  ♭VII", "<b>iv</b> = F minor, <b>♭VI</b> = A♭ major and <b>♭VII</b> = B♭ major. They are used in C major but really come from C minor."],
      ["The sound", "🌧️", "Borrowed chords usually lower the 3rd, 6th or 7th note. They add a darker, bittersweet color, even in a happy key."]
    ], [
      "F minor in the key of C major is borrowed from which key?|C minor|F major|G minor",
      "Which chord in C major is borrowed from C minor?|A♭ major|A minor|D minor",
      "A borrowed chord is taken from the ___ key.|parallel|relative|distant",
      "B♭ major used in the key of C major is called...|flat seven (♭VII)|leading tone chord (vii°)|sharp four (♯IV)",
      "Borrowing chords from the parallel minor is called...|Modal mixture|Transposition|Syncopation",
      "A borrowed iv chord in a major key sounds...|Darker and bittersweet|Brighter|Silent",
      "Borrowed chords often lower which scale degrees?|The 3rd, 6th or 7th|The 1st|The 5th",
      "F minor includes A♭, so in C major it adds...|A flat note not in the key|A sharp note|No new notes"
    ], "Where does this chord come from if it is not in the key? Look at the key with the same home note.", "Parallel minor shares the same tonic. Compare the chord's notes with that minor scale."),

    L("Closely related keys", [
      ["Neighbors on the circle", "⭕", "<b>Closely related keys</b> have key signatures that differ by <b>at most one</b> sharp or flat. They are neighbors on the circle of fifths."],
      ["For C major", "C ↔ G F Am Dm Em", "C major is closely related to <b>G major</b> and <b>F major</b>, and to the minor keys <b>A minor, E minor and D minor</b>."],
      ["Modulation", "🚪", "Composers usually modulate to a closely related key because it sounds smooth. Far keys, such as C and F♯ major, are <b>distant keys</b>."]
    ], [
      "Which key is closely related to C major?|G major|F♯ major|D♭ major",
      "Closely related keys differ by at most ___ sharp or flat.|one|four|five",
      "Which key is closely related to D major?|A major|E♭ major|C♯ major",
      "Which key is NOT closely related to F major?|E major|C major|B♭ major",
      "C major and F♯ major are...|Distant keys|Closely related keys|The same key",
      "Modulations most often go to...|A closely related key|The farthest key|No key",
      "G major has 1 sharp. Its signature differs from C major by...|One sharp|Three sharps|Two flats",
      "Which minor key is closely related to C major?|A minor|C♯ minor|F♯ minor"
    ], "Count how many sharps or flats change. A small change means close.", "Keys one step away on the circle of fifths are the closest relatives."),

    L("Hemiola and changing meters", [
      ["Hemiola", "3 : 2", "A <b>hemiola</b> is a 3 against 2 feeling. In 6/8, two groups of 3 eighths suddenly feel like <b>three groups of 2</b>."],
      ["Changing meters", "3/4 → 2/4", "Some music <b>changes time signature</b> in the middle. A bar of 3/4 then a bar of 2/4 gives 3 + 2 = 5 beats. A new time signature is written at the change."],
      ["Famous examples", "🎶", "<b>Take Five</b> by the Dave Brubeck Quartet is in 5/4. <b>America</b> from West Side Story switches between 6/8 and 3/4."]
    ], [
      "A hemiola feels like...|3 beats against 2|Total silence|A new key",
      "In 6/8, the usual feel is two groups of 3. A hemiola feels like three groups of...|2|4|5",
      "Take Five by Dave Brubeck is in which meter?|5/4|4/4|3/4",
      "Changing time signatures within a piece is called...|Changing (mixed) meter|Modulation|Transposition",
      "America from West Side Story switches between 6/8 and...|3/4|2/4|4/4",
      "The 3:2 rhythm feeling is called...|Hemiola|Syncopation|Cadenza",
      "A bar of 3/4 followed by a bar of 2/4 has a total of ___ beats.|5|6|4",
      "A new time signature in the middle of a piece is written...|In the staff at the change|Only at the very end|As a new clef"
    ], "Count the groups. How many beats or pulses do you feel in a group?", "3 against 2 is the hemiola. Add the beats of the two bars to get the total."),

    L("Tuplets", [
      ["Triplets and more", "3", "A <b>tuplet</b> squeezes a different number of notes into the time of a normal group. A <b>triplet</b> puts 3 notes in the time of 2."],
      ["Others", "5 6 2", "A <b>quintuplet</b> puts 5 in the time of 4. A <b>sextuplet</b> puts 6 in the time of 4. A <b>duplet</b> puts 2 in the time of 3 (in compound time like 6/8)."],
      ["Counting", "1 + 1", "Three eighth-note triplets take up exactly <b>one beat</b>. Three quarter-note triplets fit in the time of a half note, which is 2 beats."]
    ], [
      "A triplet puts 3 notes in the time of...|2|3|4",
      "A quintuplet puts 5 notes in the time of...|4|5|3",
      "A sextuplet puts 6 notes in the time of...|4|6|3",
      "A duplet in 6/8 puts 2 notes in the time of...|3|2|4",
      "Three quarter-note triplets fill how many beats?|2|3|4",
      "A group of three eighth-note triplets lasts how many quarter-note beats?|1|1 1/2|3",
      "Five sixteenth-note quintuplets fill how many quarter-note beats?|1|2|¼",
      "A tuplet is...|A group that divides the time differently than normal|A repeated bar|A silent bar"
    ], "A tuplet fits a different count of notes into the same time a normal group would take.", "Name tells the count; the second number is the normal count it replaces."),

    L("How notation began", [
      ["Early signs", "〰️", "Long ago, singers learned chants by <b>memory</b>. Then monks wrote little signs called <b>neumes</b> above the words to show how a melody moved up and down."],
      ["Guido of Arezzo", "🧑‍🏫", "<b>Guido of Arezzo</b> was a monk and music teacher in Italy around the year <b>1000</b>. He helped spread a <b>four-line staff</b> so singers could read exact pitches."],
      ["Ut, re, mi", "do re mi", "Guido used the first syllables of a hymn for the notes: <b>ut re mi fa sol la</b>. Later <b>ut</b> became <b>do</b>. The word <b>solfège</b> comes from sol and fa."]
    ], [
      "Guido of Arezzo was a...|Monk and music teacher|King|Pianist",
      "Guido lived in which country?|Italy|France|Egypt",
      "Guido helped spread the idea of the...|Staff|Piano|Radio",
      "The names ut, re, mi, fa, sol, la came from a...|Hymn|Jazz tune|Dance",
      "Ut later became...|Do|Si|La",
      "Before the staff, singers mostly learned chants by...|Memory|Reading exact pitches|Texting",
      "Neumes were...|Early signs above words showing the shape of the melody|Keys on a piano|Drums",
      "About when did Guido work?|Around the year 1000|The 1800s|The 1950s",
      "Guido's staff first had how many lines?|Four|Five|Ten"
    ], "Think about monks, singing and how they remembered melodies.", "Staff = lines showing pitch. The syllables came from a song's first words."),

    L("Movable do and minor", [
      ["Movable do", "do", "In <b>movable do</b>, <b>do</b> is always the home note of the key. In G major do = G, re = A, mi = B."],
      ["Examples", "sol", "In D major: do D, re E, mi F♯, fa G, sol A. In E♭ major sol is B♭. In F major fa is B♭. <b>Fixed do</b> means do is always C."],
      ["Minor", "la–ti–do", "In <b>la-based minor</b> the home note is <b>la</b>. In C major, la is A. In <b>do-based minor</b> the third is <b>me</b>. <b>Ti</b> is the leading tone."]
    ], [
      "In movable do, do is always...|The home note of the key|The note C|The first white key",
      "In la-based minor, the home note is called...|La|Do|Mi",
      "In G major, do = G. What is mi?|B|A|C",
      "In D major, what is sol?|A|G|E",
      "In F major, what is fa?|B♭|A|C",
      "In do-based minor, the third note is called...|Me|Mi|Ma",
      "In C major, la is which note?|A|E|D",
      "In E♭ major, what is sol?|B♭|G|A♭",
      "In fixed do, do is always...|C|The home note|A"
    ], "Count the scale degrees: do re mi fa sol la ti. Which one is it?", "Start on the key's home note for do and count up the major scale."),

    L("Orchestration words", [
      ["Who plays?", "👥", "<b>Tutti</b> means everyone plays. <b>Solo</b> means one performer. <b>Unison</b> means everyone plays the same note. <b>Divisi</b> means a section splits into groups."],
      ["Mutes", "🔇", "<b>Con sordino</b> means with a mute (softer, mellow). <b>Senza sordino</b> means without the mute."],
      ["Doubling", "🎻🎺", "<b>Doubling</b> is having two instruments play the same line (maybe an octave apart). It changes the color. An <b>orchestrator</b> chooses which instruments play which notes."]
    ], [
      "Tutti means...|Everyone plays|One plays|Nobody plays",
      "Divisi means...|A section splits into groups|Everyone plays together|Stop playing",
      "Solo means...|One performer|The whole orchestra|A fast tempo",
      "Doubling means...|Two instruments play the same line|Playing twice as fast|A repeated bar",
      "Unison means...|Everyone plays the same note|Everyone plays different notes|Everyone rests",
      "Con sordino means...|With a mute|Very loudly|Very fast",
      "Senza sordino means...|Without the mute|With a mute|Slowly",
      "Doubling a melody with another instrument can...|Change its color and strengthen it|Make it silent|Remove the notes",
      "An orchestrator is a person who...|Chooses which instruments play the music|Tunes pianos|Sells tickets"
    ], "Many of these are Italian words. Think about what they say about how many players are involved.", "Tutti means all. Senza means without. Con means with."),

    L("Twelve-tone and minimalism", [
      ["The tone row", "12", "<b>Arnold Schoenberg</b> invented the <b>twelve-tone method</b> in the 1920s. A <b>tone row</b> uses all 12 notes once before any note repeats. There is no home key."],
      ["Changing the row", "⇅", "The row can be played <b>backwards</b> (retrograde), <b>upside-down</b> (inversion) or moved higher or lower."],
      ["Minimalism", "🔁", "<b>Minimalism</b> uses short patterns repeated again and again, changing slowly. <b>Philip Glass</b> and <b>Steve Reich</b> are minimalists. In Reich's <b>phasing</b>, two players slowly drift out of sync."]
    ], [
      "A tone row has how many different notes?|12|7|5",
      "Who created the twelve-tone method?|Arnold Schoenberg|Mozart|Bach",
      "In a tone row, each note is used...|Once before any repeats|As many times as you like|Never",
      "Playing a tone row backwards is called...|Retrograde|Inversion|Augmentation",
      "Minimalism uses...|Short patterns repeated and changed slowly|A new long melody each bar|Only silence",
      "Philip Glass is a famous...|Minimalist composer|Opera singer from 1700|Drum maker",
      "In Steve Reich's phasing, two players...|Slowly drift out of sync|Stop playing|Play at different volumes",
      "Twelve-tone music has no...|Home key (tonal center)|Notes|Rhythm",
      "Playing a tone row upside down is called...|Inversion|Retrograde|Augmentation"
    ], "Think about the number in the name, and what repeating means in minimalism.", "A row uses every note once. Minimalism repeats a small pattern."),

    L("Scales around the world", [
      ["Gamelan", "🇮🇩", "Gamelan orchestras from <b>Indonesia</b> use two scales: <b>slendro</b> (5 notes) and <b>pelog</b> (7 notes with unequal steps)."],
      ["Ragas and maqams", "🪕", "In <b>India</b>, a <b>raga</b> is a melody framework with set notes and a mood, traditionally linked to a time of day. The <b>sitar</b> is a famous Indian instrument. A <b>maqam</b> is a Middle Eastern system of melody types that may use <b>quarter tones</b>."],
      ["Pentatonic everywhere", "5️⃣", "Five-note scales appear in the music of many cultures, including China, Africa and Scotland."]
    ], [
      "Gamelan music comes from...|Indonesia|Peru|Iceland",
      "The slendro scale has how many notes?|5|7|12",
      "A raga is...|A melody framework with set notes and a mood|A drum|A dance step",
      "A maqam is a system of melody types from the...|Middle East|Arctic|Wild West",
      "A quarter tone is...|Half of a half step|Two whole steps|An octave",
      "Five-note scales are found in...|Many cultures|Only Europe|Only one country",
      "The pelog scale has how many notes?|7|5|3",
      "A raga is traditionally linked to...|A time of day or a mood|A country flag|A rhyme",
      "The sitar comes from...|India|Canada|Norway"
    ], "Match each word to the part of the world it comes from.", "Slendro: 5 notes. Pelog: 7 notes. Raga: India. Maqam: Middle East."),

    L("Features of popular genres", [
      ["Reggae and country", "🇯🇲", "<b>Reggae</b> came from <b>Jamaica</b>. The guitar plays on the <b>off-beats</b>. <b>Country</b> music often has fiddle, banjo and guitar, and tells stories. <b>Nashville</b> is called Music City."],
      ["Hip-hop", "🎤", "<b>Hip-hop</b> began in New York City (the Bronx) in the 1970s. <b>Rapping</b> is rhythmic speaking over a beat. A <b>DJ</b> plays and mixes recordings. <b>Sampling</b> means reusing a bit of recorded sound in a new track."],
      ["Dance music", "💿", "<b>EDM</b> (electronic dance music) is made with synthesizers and computers. Many tracks are about <b>120 to 130 BPM</b>."]
    ], [
      "Reggae came from which country?|Jamaica|Iceland|Japan",
      "Reggae guitar often plays on the...|Off-beats|First beat only|Silence",
      "Rapping is...|Rhythmic speaking over a beat|Playing the violin|Slow chanting",
      "Sampling means...|Reusing a bit of recorded sound in a new track|Tuning a guitar|Counting beats",
      "Hip-hop began in...|New York City in the 1970s|London in 1700|Tokyo in 1500",
      "Which instruments are often heard in country music?|Fiddle, banjo and guitar|Tuba and harp|Taiko and gamelan",
      "A typical EDM track is about how many BPM?|120 to 130|20 to 30|300 to 400",
      "A DJ...|Plays and mixes recordings|Writes operas|Tunes pianos",
      "Which city is nicknamed Music City?|Nashville|Houston|Boston"
    ], "Think about where each style began and the sounds that go with it.", "Off-beats = reggae. Beat plus speech = rap. Computers and BPM = EDM."),

    L("Synthesizer sounds", [
      ["The oscillator", "〰️", "A synthesizer starts with an <b>oscillator</b> that makes a basic wave. <b>Sine</b> is pure and smooth. <b>Triangle</b> is soft. <b>Square</b> is hollow. <b>Sawtooth</b> is bright and buzzy."],
      ["Filter", "🔧", "A <b>filter</b> removes some of the sound, for example the high part, to make the tone darker or brighter."],
      ["ADSR", "📈", "<b>ADSR</b> shapes a note: <b>Attack</b> (how fast it reaches full volume), <b>Decay</b> (how it drops), <b>Sustain</b> (the level it holds while the key is down), <b>Release</b> (how long it fades after you let go)."]
    ], [
      "Which wave is the purest, with no overtones?|Sine|Square|Sawtooth",
      "A sawtooth wave sounds...|Bright and buzzy|Pure and soft|Silent",
      "A square wave sounds...|Hollow|Like a bell|Like a drum",
      "ADSR stands for...|Attack, decay, sustain, release|Alto, drum, strings, rhythm|Add, divide, subtract, repeat",
      "The attack of a note is...|How fast it reaches full volume|How long it fades|The pitch",
      "The release of a note is...|How long it fades after you let go|How fast it starts|Its key",
      "A filter on a synthesizer...|Removes some of the sound's range, changing brightness|Makes the sound a drum|Plays chords",
      "The oscillator...|Creates the basic sound wave|Stores the music|Prints the notes",
      "A violin swell that fades in slowly has a ___ attack.|slow|fast|no"
    ], "Think about what part of the synthesizer is responsible: the wave, the filter, or the shape of the note.", "A: start. D: drop. S: hold. R: fade."),

    L("Tuning systems", [
      ["Equal temperament", "12", "Pianos use <b>equal temperament</b>: the octave is split into <b>12 equal half steps</b>. Every key is almost perfectly in tune, so you can play in any key."],
      ["Just intonation", "3 : 2", "<b>Just intonation</b> uses pure whole-number ratios. An octave is <b>2:1</b>, a perfect fifth is <b>3:2</b>."],
      ["Cents", "100¢", "A <b>cent</b> is a tiny unit of pitch. A half step is <b>100 cents</b>, a whole step is 200 and an octave is <b>1200</b>. Concert A is <b>440 Hz</b>."]
    ], [
      "How many cents are in a half step?|100|10|1200",
      "How many cents are in an octave?|1200|100|12",
      "Equal temperament divides the octave into...|12 equal half steps|7 equal parts|5 equal parts",
      "Just intonation uses...|Simple whole-number ratios like 3:2|Random numbers|Only the black keys",
      "Which tuning does a modern piano use?|Equal temperament|Just intonation only|Gamelan tuning",
      "How many cents are in a whole step?|200|50|1000",
      "Concert A is usually tuned to how many Hz?|440|44|4400",
      "In just intonation, the perfect fifth ratio is...|3:2|2:1|4:3",
      "The octave ratio is...|2:1|3:2|1:1",
      "Why do pianos use equal temperament?|So every key sounds nearly in tune|So they are quieter|So they are lighter"
    ], "Think about what is equal, and what is based on a simple ratio.", "100 cents = 1 half step. 12 half steps make an octave."),

    F("Spell the triad", [
      ["Root, third, fifth", "1 3 5", "A triad has a <b>root</b>, a <b>third</b> and a <b>fifth</b>. The letters skip one: C – E – G, or D – F – A. Then you fix them with sharps and flats."],
      ["Four qualities", "4+3 3+4", "<b>Major</b>: 4 and 7 half steps above the root. <b>Minor</b>: 3 and 7. <b>Diminished</b>: 3 and 6. <b>Augmented</b>: 4 and 8."],
      ["Example", "E♭ – G – B♭", "E♭ major: E♭ to G is 4 half steps, E♭ to B♭ is 7. So the triad is E♭ – G – B♭."]
    ], triadQ),

    L("Careers in music", [
      ["Jobs", "🎧", "A <b>conductor</b> leads an ensemble. An <b>arranger</b> rewrites music for other instruments or voices. A <b>producer</b> guides a recording, and a <b>sound engineer</b> handles the microphones and mixing."],
      ["Helping others", "💙", "A <b>music therapist</b> uses music to support people's health and well-being. A <b>session musician</b> is hired to play on other artists' recordings."],
      ["Copyright", "©️", "<b>Copyright</b> protects a creator's right to control copies of their work. A <b>royalty</b> is a payment when music is used or sold. Works in the <b>public domain</b> are free for anyone to use."]
    ], [
      "An arranger...|Rewrites music for different instruments or voices|Tunes pianos|Sells tickets",
      "A producer...|Guides the recording of a song or album|Builds guitars|Teaches dance",
      "A sound engineer...|Handles microphones and mixing|Writes the lyrics|Plays every instrument",
      "A music therapist...|Uses music to help people's well-being|Judges contests|Makes drums",
      "Copyright protects...|A creator's right to control copies of their work|Instruments from rust|Concert halls",
      "A work in the public domain...|Is free for anyone to use because copyright has ended|Is secret|Cannot be played",
      "A royalty is...|A payment to creators when their music is used or sold|A king's song|A kind of chord",
      "A session musician...|Is hired to play on other people's recordings|Only plays in the street|Teaches choir",
      "Before using someone's song in a video you share, you should...|Get permission or a license|Just use it|Change one note"
    ], "Think about what each job does. Name = clue.", "Copyright is about protecting creators. Public domain means that protection has ended."),

    L("Analyzing a piece of music", [
      ["The elements", "🔍", "Music has elements: <b>melody</b> (tune), <b>harmony</b> (chords), <b>rhythm</b>, <b>tempo</b>, <b>dynamics</b> (volume), <b>timbre</b> (tone color) and <b>form</b> (the plan)."],
      ["Steps", "1 2 3", "To analyze a piece: find the <b>meter</b> and <b>tempo</b>, the <b>key</b> (major or minor), then the <b>sections</b> (A, B, A?), and listen for changes in <b>dynamics</b> and <b>timbre</b>."],
      ["Texture", "🧶", "<b>Monophonic</b>: one line. <b>Homophonic</b>: melody with chords underneath. <b>Polyphonic</b>: several melodies at once."]
    ], [
      "Timbre means...|Tone color|Loudness|Speed",
      "Form means...|The plan of the sections|The key signature|The volume",
      "Dynamics means...|How loud or soft the music is|How fast it is|Its key",
      "Harmony means...|Chords and how notes sound together|Only the drums|Only the singer",
      "A piece goes A, B, A. Its form is...|ABA|AAB|ABC",
      "Several melodies at the same time is called...|Polyphonic|Monophonic|Homophonic",
      "One melody with chords underneath is called...|Homophonic|Polyphonic|Monophonic",
      "One single line with no accompaniment is called...|Monophonic|Polyphonic|Homophonic",
      "Which word describes how bright, dark or warm an instrument sounds?|Timbre|Tempo|Meter"
    ], "Name the element: is it about loudness, speed, tone color, or the plan?", "Mono is one, poly is many, homo is the same-moving melody with chords.")
  ];
  l15.push(
    MIX("Mixed practice", [l15[0], l15[1], l15[2], l15[4], l15[5], l15[6], l15[9], l15[11], l15[15], l15[17]]),
    MIX("Level 15 Challenge", [l15[3], l15[7], l15[8], l15[10], l15[12], l15[13], l15[14], l15[16], l15[2], l15[15]])
  );

  Object.assign(MUSIC_LEVELS, { 13: l13, 14: l14, 15: l15 });
})();
