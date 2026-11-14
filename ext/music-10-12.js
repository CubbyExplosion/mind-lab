// Mind Lab Music, levels 10-12 (extension file). 20 lessons per level.
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
  // multiple-choice question from a plain list (used inside F lessons)
  const mc = (strs, nudge, clue) => {
    const items = strs.map(I), [q, a, w] = pick(items);
    const ex = pick(items.filter(x => x[1] !== a && !nz(x[0]).includes(nz(a))));
    return { text: q, choices: shuf([a, ...w.slice(0, 2)]).map(A), answer: A(a), hints: [nudge, clue, `Example: ${ex[0]} The answer is "${A(ex[1])}". Now do yours.`] };
  };

  // ======================= LEVEL 10 =======================
  const l10 = [
    L("Minor key signatures", [
      ["Same signature, two keys", "Am = C", "Every major key shares its key signature with a <b>relative minor</b>. The minor key starts 3 half steps below the major key's home note."],
      ["Minor keys with sharps", "Em Bm", "<b>A minor</b> has no sharps or flats. <b>E minor</b> has 1 sharp. <b>B minor</b> has 2 sharps. <b>F♯ minor</b> has 3 sharps."],
      ["Minor keys with flats", "Dm Gm Cm", "<b>D minor</b> has 1 flat. <b>G minor</b> has 2 flats. <b>C minor</b> has 3 flats."]
    ], [
      "How many sharps or flats does A minor have?|None|1 sharp|1 flat",
      "E minor has which key signature?|1 sharp|2 sharps|1 flat",
      "D minor has which key signature?|1 flat|1 sharp|2 flats",
      "G minor has which key signature?|2 flats|2 sharps|1 flat",
      "B minor has which key signature?|2 sharps|2 flats|1 sharp",
      "C minor has which key signature?|3 flats|3 sharps|None",
      "F♯ minor has which key signature?|3 sharps|3 flats|4 sharps",
      "Which minor key shares its key signature with C major?|A minor|C minor|E minor",
      "Which minor key shares its key signature with G major?|E minor|G minor|D minor",
      "Which minor key shares its key signature with F major?|D minor|F minor|A minor"
    ], "Every minor key borrows the key signature of a major key. Which major key is its partner?", "The relative minor sits 3 half steps below the major home note. The key signature is the same for both."),

    L("Perfect, major and minor intervals", [
      ["Interval names", "P  M  m", "An interval has a number (like 3rd) and a <b>quality</b>. 4ths, 5ths and octaves are <b>perfect</b>. 2nds, 3rds, 6ths and 7ths are <b>major</b> or <b>minor</b>."],
      ["Half steps", "M3 = 4", "A <b>minor</b> interval is one half step smaller than the <b>major</b> one with the same number. Major 3rd = 4 half steps, minor 3rd = 3. Perfect 4th = 5, perfect 5th = 7, octave = 12."],
      ["Example", "C → G", "C up to G is a perfect 5th. C up to E is a major 3rd. C up to E♭ is a minor 3rd."]
    ], [
      "Which interval can be called perfect?|A fifth|A third|A sixth",
      "Which interval is called major or minor, not perfect?|A third|A fourth|An octave",
      "How many half steps are in a major 3rd?|4|3|5",
      "How many half steps are in a minor 3rd?|3|4|2",
      "How many half steps are in a perfect 5th?|7|6|8",
      "How many half steps are in a perfect 4th?|5|4|6",
      "How many half steps are in an octave?|12|10|8",
      "A minor interval is ___ the major one with the same number.|one half step smaller than|one half step bigger than|the same size as",
      "Which is bigger, a major 3rd or a minor 3rd?|Major 3rd|Minor 3rd|They are the same",
      "C up to G is a perfect ___.|fifth|fourth|sixth"
    ], "Look at the number of the interval. Does it belong to the perfect group or the major/minor group?", "Perfect: 4th, 5th, octave. Major/minor: 2nd, 3rd, 6th, 7th. Minor is one half step smaller than major."),

    L("The pentatonic scale", [
      ["Five notes", "5️⃣", "<b>Penta</b> means five. A <b>pentatonic scale</b> has only <b>5 notes</b>. It skips two notes of the major scale."],
      ["Major pentatonic", "do re mi sol la", "In solfège it is <b>do re mi sol la</b>. In C that is <b>C D E G A</b>. The 4th and 7th notes (fa and ti) are left out."],
      ["Black keys", "⚫⚫⚫", "The five black keys on a piano make a pentatonic scale. Many folk songs from around the world use pentatonic scales. They are easy to sing because no notes clash."]
    ], [
      "How many notes does a pentatonic scale have?|5|7|8",
      "Penta means...|five|seven|three",
      "Which solfège syllables are left out of the major pentatonic scale?|fa and ti|re and mi|do and sol",
      "C major pentatonic: C D E G ___.|A|F|B",
      "Which two notes are left out of the C major pentatonic scale?|F and B|D and A|C and G",
      "Playing only the five black keys gives which kind of scale?|Pentatonic|Chromatic|Whole tone",
      "Pentatonic scales are used in folk music of...|many cultures around the world|only one country|only the piano",
      "In C major pentatonic, which note comes right after G?|A|B|F",
      "A major scale has 7 different notes. How many fewer does a pentatonic scale have?|2|1|3"
    ], "Think of the major scale with a few notes taken out. Which ones?", "The pentatonic scale keeps the 1st, 2nd, 3rd, 5th and 6th notes of the major scale."),

    L("Chord symbols", [
      ["Letters over the music", "C  Am  G7", "Songbooks and guitar music show chords as <b>chord symbols</b>. A plain letter, like <b>C</b>, means a major chord."],
      ["Adding letters", "m  7  dim", "<b>m</b> means minor (Am = A minor). <b>7</b> means a dominant seventh chord (G7). <b>dim</b> means diminished. <b>maj7</b> is a major seventh chord."],
      ["Slash chords", "C/G", "A slash tells which note is in the <b>bass</b>. <b>C/G</b> is a C chord with G as the lowest note. A page with a melody and chord symbols is a <b>lead sheet</b>."]
    ], [
      "What does the chord symbol G mean?|A G major chord|A G minor chord|A G seventh chord",
      "What does the chord symbol Am mean?|An A minor chord|An A major chord|An A seventh chord",
      "What does the chord symbol D7 mean?|A D dominant seventh chord|A D minor chord|A D major chord",
      "What does the chord symbol Bdim mean?|A B diminished chord|A B major chord|A B minor chord",
      "What does the symbol C/G mean?|A C chord with G in the bass|A G chord with C on top|A C chord played twice",
      "Which symbol means E minor?|Em|E|E7",
      "Which symbol means F major seventh?|Fmaj7|F7|Fm",
      "Which symbol means a G dominant seventh?|G7|Gm|Gdim",
      "Music with a melody and chord symbols is called a...|lead sheet|full score|bar chart"
    ], "Look at the letter first, then at what is written after it.", "A letter alone is major. m means minor. A 7 means a seventh chord. dim means diminished. A slash names the bass note."),

    L("D.C., D.S. and Coda", [
      ["Jumping around", "D.C. D.S.", "<b>D.C.</b> (Da Capo) means go back to the <b>beginning</b>. <b>D.S.</b> (Dal Segno) means go back to the <b>sign</b> 𝄋. <b>Fine</b> (FEE-nay) marks the end."],
      ["Coda", "𝄌", "<b>Coda</b> means <i>tail</i>. It is a special ending section. <b>To Coda</b> tells you to jump to it, often after a D.S. or D.C."],
      ["Endings", "1. 2.", "A <b>first ending</b> and a <b>second ending</b> are bracketed. On the repeat, skip the first ending and play the second."]
    ], [
      "D.C. tells you to go back to the...|beginning|sign|end",
      "D.S. tells you to go back to the...|sign|beginning|coda",
      "What does Fine mean?|The end|The beginning|Repeat",
      "What does coda mean in Italian?|Tail|Head|Sign",
      "D.C. al Fine means...|Go to the beginning, and stop at Fine|Go to the coda|Play softly to the end",
      "Da capo means 'from the ___'.|head (beginning)|sign|end",
      "Which sign shows where to return after D.S.?|The segno sign|A fermata|A bar line",
      "On the repeat you skip the first ending and play the...|second ending|first ending again|coda only",
      "A coda is a section that...|ends the piece|starts the piece|is all rests"
    ], "Think about where each instruction sends you: the start, a sign, or the end.", "Capo means head, so D.C. goes to the very start. Segno is a sign, so D.S. goes to the sign. Fine and coda are about the ending."),

    L("Odd meters: 5/4 and 7/8", [
      ["Uneven groups", "5/4  7/8", "Some music has <b>5 beats</b> (5/4) or <b>7 eighth notes</b> (7/8) in each measure. These are called <b>odd</b> or <b>asymmetrical</b> meters."],
      ["Grouping", "3 + 2", "5/4 is often felt as <b>3 + 2</b> or <b>2 + 3</b>. 7/8 is often felt as <b>2 + 2 + 3</b> or <b>3 + 2 + 2</b>. It feels like a lopsided, exciting rhythm."],
      ["Reading it", "bottom number", "The bottom number tells the note that gets the pulse. In 5/4 it is a quarter note. In 7/8 it is an eighth note."]
    ], [
      "How many quarter-note beats are in a 5/4 measure?|5|4|3",
      "How many eighth notes are in a 7/8 measure?|7|8|6",
      "5/4 is often grouped as...|3 + 2 or 2 + 3|4 + 1 only|3 + 3",
      "7/8 is often grouped as...|2 + 2 + 3|4 + 4|3 + 3 + 3",
      "Meters like 5/4 and 7/8 are called...|asymmetrical (odd)|duple|compound triple",
      "How many eighth notes are in an 11/8 measure?|11|8|12",
      "In 7/8, which note gets the pulse?|Eighth note|Quarter note|Half note",
      "Which grouping adds up correctly for 7/8?|2 + 2 + 3|2 + 2 + 2|3 + 3 + 3",
      "Which grouping adds up correctly for 5/4?|3 + 2|2 + 2|3 + 3"
    ], "Add the group numbers. Do they match the top number of the time signature?", "The top number is the total. Groups of 2 and 3 are added until the total is reached."),

    L("Ostinato and drone", [
      ["Repeating pattern", "🔁", "An <b>ostinato</b> is a short pattern that repeats again and again, while other parts change. The Italian word means <i>stubborn</i>."],
      ["Long held note", "〰️", "A <b>drone</b> is a long note (or two notes) that sounds on and on, usually low. Bagpipes are famous for the drone."],
      ["Pedal point", "🎹", "A held bass note while the chords above change is called a <b>pedal point</b>. Drones and ostinatos both use <b>repetition</b> to build mood."]
    ], [
      "A short pattern repeated over and over is called an...|ostinato|cadence|accent",
      "A long steady note held under the music is called a...|drone|rest|trill",
      "Which instrument is famous for its drone?|Bagpipes|Triangle|Piccolo",
      "Ostinato is the Italian word for...|stubborn|gentle|quick",
      "How does a drone usually sound?|Long and steady|Short and jumpy|Louder each time",
      "Class members keep tapping the same short pattern while others sing. This is an...|ostinato|opera|octave",
      "Does an ostinato change from bar to bar?|No, it repeats|Yes, it is new each bar|It always gets faster",
      "A held bass note while chords change above it is called a ___ point.|pedal|grace|tie",
      "Ostinatos and drones both use...|repetition|silence|loud brass"
    ], "Ask: is it a pattern that repeats, or one note that keeps sounding?", "Short pattern repeated = ostinato. Long held low note = drone. A held bass note under changing chords = pedal point."),

    L("Octave names: C4 and friends", [
      ["Numbering the octaves", "C4", "Each C starts a new octave number. <b>Middle C is C4</b>. The next C up is <b>C5</b>. The C below middle C is <b>C3</b>."],
      ["Famous notes", "A4 = 440 Hz", "The A above middle C is <b>A4</b> (440 Hz). A piano has 88 keys. The lowest is <b>A0</b> and the highest is <b>C8</b>."],
      ["8va", "8va", "<b>8va</b> above notes means play them an octave higher. <b>8vb</b> or <b>8va</b> below the notes means an octave lower."]
    ], [
      "What is middle C called in pitch names?|C4|C3|C5",
      "What is the next C above middle C called?|C5|C4|C6",
      "What is the C below middle C called?|C3|C2|C4",
      "A4 has a frequency of...|440 Hz|220 Hz|880 Hz",
      "What is the highest key on a piano?|C8|C7|A8",
      "What is the lowest key on a piano?|A0|C1|C0",
      "Which is higher, C4 or C6?|C6|C4|They are the same",
      "At which note does the octave number go up by one?|C|A|G",
      "Which note comes right after B3?|C4|C3|A4",
      "The sign 8va above notes means play them...|an octave higher|an octave lower|twice as fast"
    ], "The octave number goes up at each C. Think about which C comes first.", "B3 is the last note of one octave and C4 starts the next. Higher numbers mean higher pitches."),

    L("Rules for accidentals", [
      ["How long they last", "♯ ♭ ♮", "An <b>accidental</b> (sharp, flat or natural) lasts until the <b>end of the measure</b>, but only for that exact line or space. A new measure cancels it."],
      ["Natural sign", "♮", "A <b>natural sign</b> cancels a sharp or flat. It also cancels the sharp or flat from the key signature for that measure."],
      ["Double signs", "𝄪  𝄫", "A <b>double sharp</b> raises a note <b>2 half steps</b>. A <b>double flat</b> lowers it 2 half steps. F double sharp sounds the same as G."]
    ], [
      "An accidental normally stays in effect until...|the end of the measure|the next note|the end of the page",
      "Which sign cancels a sharp or flat?|Natural sign|Clef|Fermata",
      "A double sharp raises a note by...|two half steps|one half step|three half steps",
      "A double flat lowers a note by...|two half steps|one half step|an octave",
      "F double sharp sounds the same as...|G|F♯|E",
      "B double flat sounds the same as...|A|B♭|C",
      "Does a new measure cancel an accidental?|Yes|No, never|Only with a clef",
      "The key signature has F♯. A natural sign appears before an F. How does that F sound?|F natural|F♯|F♭",
      "An accidental affects the same note in a different octave.|False, only that exact line or space|True, always|True, but only for sharps"
    ], "Remember how far an accidental reaches: how long, and how many notes?", "Single sharp/flat = 1 half step. Double = 2 half steps. A natural cancels. A bar line ends the accidental."),

    F("How long is the song?", [
      ["Beats per minute", "⏱️", "<b>BPM</b> tells how many beats happen in <b>one minute</b>. At 60 BPM there is one beat each second."],
      ["Total beats", "÷", "To find how many minutes a piece lasts: <b>total beats ÷ BPM</b>."],
      ["Half minutes", "30 s", "To find beats in some minutes: <b>BPM × minutes</b>. In half a minute you get half the BPM."]
    ], () => {
      const bpm = pick([60, 80, 100, 120, 140]), t = ri(0, 2);
      if (t === 0) {
        const m = ri(2, 5);
        return { text: `A song has ${bpm * m} beats and moves at ${bpm} BPM. How many minutes long is it?`, answer: m, hints: ["BPM tells you how many beats happen in just one minute.", "Find how many groups of the BPM fit into the total beats. That means divide the total by the BPM.", "Example: 300 beats at 100 BPM is 300 ÷ 100 = 3 minutes. Now do yours."] };
      }
      if (t === 1) {
        const m = ri(2, 4);
        return { text: `At ${bpm} BPM, how many beats are played in ${m} minutes?`, answer: bpm * m, hints: ["BPM is the number of beats in one minute.", "Take the beats from one minute and repeat them for each minute. Multiply.", "Example: 50 BPM for 3 minutes is 50 × 3 = 150 beats. Now do yours."] };
      }
      return { text: `At ${bpm} BPM, how many beats are played in 30 seconds?`, answer: bpm / 2, hints: ["Thirty seconds is a part of a minute. Which part?", "Half a minute gives half of the beats in a full minute. Halve the BPM.", "Example: at 80 BPM, half a minute holds 40 beats. Now do yours."] };
    }),

    F("Counting in sixteenths", [
      ["The smallest unit", "𝅘𝅥𝅯", "A good way to compare note lengths is to count in <b>sixteenth notes</b>. A quarter note holds 4 sixteenths."],
      ["Doubling and halving", "× ÷", "A half note is double a quarter. An eighth note is half of a quarter. A <b>dot</b> adds half of the note's value."],
      ["Example", "♩. = 6", "A dotted quarter is 4 + 2 = 6 sixteenths. A dotted half is 8 + 4 = 12 sixteenths."]
    ], () => {
      const SIX = { "a whole note": 16, "a half note": 8, "a dotted half note": 12, "a dotted quarter note": 6, "an eighth note": 2, "a dotted eighth note": 3 };
      const P = { "a half note": 8, "a quarter note": 4, "an eighth note": 2, "a dotted quarter note": 6, "a sixteenth note": 1, "a dotted eighth note": 3 };
      const nudge = "Change every note into sixteenths first. A quarter note is worth four sixteenths.";
      const clue = "Doubling the note doubles the sixteenths. Halving it halves them. A dot adds half of the note's own value.";
      if (Math.random() < 0.45) {
        const k = pick(Object.keys(SIX));
        return { text: `How many sixteenth notes equal ${k}?`, answer: SIX[k], hints: [nudge, clue, "Example: a dotted quarter note is 4 + 2 = 6 sixteenths. A half note is double a quarter. Now do yours."] };
      }
      const ks = Object.keys(P), a = pick(ks); let b; do { b = pick(ks); } while (b === a);
      let e1, e2; do { e1 = pick(ks); e2 = pick(ks); } while (e1 === e2 || (e1 === a && e2 === b) || (e1 === b && e2 === a));
      return {
        text: `Together, ${a} and ${b} equal how many sixteenth notes?`, answer: P[a] + P[b],
        hints: [nudge, clue + " Then add the two amounts.", `Example: ${e1} (${P[e1]}) + ${e2} (${P[e2]}) = ${P[e1] + P[e2]} sixteenths. Now do yours.`]
      };
    }),

    L("Baroque music", [
      ["The Baroque era", "1600-1750", "The <b>Baroque</b> era lasted about <b>1600 to 1750</b>. The music is rich and decorated with fancy <b>ornaments</b>. Composers: <b>Bach</b> (Germany), <b>Handel</b> (born in Germany, lived in England) and <b>Vivaldi</b> (Italy)."],
      ["Sounds of the time", "🎼", "The <b>harpsichord</b> and the organ were the main keyboards. Many pieces had a <b>basso continuo</b>: a steady bass line with chords. Baroque music often has <b>terraced dynamics</b>: sudden jumps between loud and soft."],
      ["Famous pieces", "🎻", "Vivaldi wrote <i>The Four Seasons</i>. Bach wrote the <i>Brandenburg Concertos</i>. Handel wrote <i>Messiah</i>, which has the <i>Hallelujah</i> chorus."]
    ], [
      "The Baroque era was roughly...|1600 to 1750|1800 to 1900|1900 to 2000",
      "Who wrote The Four Seasons?|Vivaldi|Handel|Haydn",
      "Who wrote the Brandenburg Concertos?|Bach|Mozart|Vivaldi",
      "Who wrote Messiah, with the Hallelujah chorus?|Handel|Bach|Chopin",
      "Which keyboard was most used in Baroque music?|Harpsichord|Electric keyboard|Accordion",
      "A basso continuo is...|a steady bass line with chords|a loud drum solo|a choir without words",
      "Terraced dynamics means...|sudden jumps between loud and soft|a slow crescendo|only soft playing",
      "In which country was Bach born?|Germany|Italy|France",
      "Baroque music is often...|decorated with ornaments|plain and empty|made on computers"
    ], "Think of the time: music with lots of decoration, played on harpsichords and organs.", "Bach and Handel were born in Germany. Vivaldi was Italian. Baroque means 1600 to 1750."),

    L("Tuning string instruments", [
      ["Guitar and bass", "🎸", "A guitar has <b>6 strings</b>, tuned (low to high) <b>E A D G B E</b>. A bass guitar has 4 strings: <b>E A D G</b>."],
      ["Violin family", "🎻", "A violin has 4 strings tuned <b>G D A E</b>, each a <b>fifth</b> apart. A viola and cello are tuned <b>C G D A</b>. The cello's lowest string is C."],
      ["Ukulele", "🪕", "A standard ukulele has <b>4 strings: G C E A</b>. Before a concert an orchestra tunes to the note <b>A</b>, often given by the oboe."]
    ], [
      "How many strings does a standard guitar have?|6|4|5",
      "How many strings does a violin have?|4|6|8",
      "How many strings does a ukulele have?|4|6|8",
      "What is the highest string on a violin?|E|G|A",
      "What is the lowest string on a violin?|G|E|D",
      "What is the lowest string on a cello?|C|G|E",
      "What is the lowest string on a standard guitar?|E|A|G",
      "Violin strings are tuned a ___ apart.|fifth|second|octave",
      "An orchestra usually tunes to the note...|A|C|E",
      "A bass guitar is tuned to...|E A D G|G D A E|G C E A"
    ], "Match the instrument to the number of strings and the note names in its tuning.", "Violin G D A E. Cello and viola C G D A. Guitar E A D G B E. Ukulele G C E A."),

    L("Piano pedals and fingering", [
      ["Finger numbers", "🖐️", "Pianists number their fingers: <b>1 = thumb, 2 = pointer, 3 = middle, 4 = ring, 5 = pinky</b>. It is the same on both hands."],
      ["Three pedals", "🦶", "A grand piano has <b>3 pedals</b>. The <b>right</b> one is the <b>sustain pedal</b>: notes keep ringing after you lift your fingers. The <b>left</b> pedal makes the sound <b>softer</b>."],
      ["Hand position", "C", "In <b>C position</b> the right thumb (1) rests on C, and fingers 2 3 4 5 rest on D E F G."]
    ], [
      "Which finger is number 1?|Thumb|Pointer|Pinky",
      "Which finger is number 5?|Pinky|Thumb|Ring",
      "Which finger is number 3?|Middle finger|Pointer|Ring",
      "Which finger is number 2?|Pointer|Middle finger|Thumb",
      "How many pedals does a grand piano have?|3|2|4",
      "Which pedal makes notes keep ringing after you lift your fingers?|The right (sustain) pedal|The left pedal|No pedal does",
      "The left pedal makes the sound...|softer|louder|higher",
      "Are the finger numbers the same for both hands?|Yes, the thumb is always 1|No, the left thumb is 5|No, they are mirrored",
      "In C position, the right thumb rests on...|C|G|E"
    ], "Count along your own fingers, starting with the thumb. Pedals are pressed with your feet.", "Thumb is one, pinky is five. The right pedal sustains and the left pedal softens."),

    L("Melody shapes and motifs", [
      ["Contour", "⛰️", "A melody's <b>contour</b> is its shape: <b>ascending</b> (going up), <b>descending</b> (going down), or an <b>arch</b> (up and then down)."],
      ["Steps and leaps", "↗", "Notes moving by step are <b>conjunct</b> (smooth). Big jumps are <b>disjunct</b> (leaping)."],
      ["Motif and sequence", "🧩", "A <b>motif</b> is a short musical idea. A <b>sequence</b> repeats the motif higher or lower. <b>Variation</b> changes it a little. <b>Contrast</b> brings in something new."]
    ], [
      "A melody that moves from low to high is called...|ascending|descending|static",
      "A melody that goes up and then comes back down is shaped like an...|arch|echo|anchor",
      "A melody that moves from high to low is called...|descending|ascending|chromatic",
      "A short musical idea used again and again is a...|motif|rest|clef",
      "The same motif repeated starting on a higher or lower note is a...|sequence|drone|coda",
      "A motif that returns but is changed a little is a...|variation|repeat sign|cadence",
      "Melody moving mostly by step is called...|conjunct|disjunct|silent",
      "A melody with many big jumps is called...|disjunct|conjunct|pedal",
      "In a piece, contrast means...|something new and different|exactly the same|slower"
    ], "Picture the melody as a line on a graph. Does it go up, down, or both?", "Step = smooth, leap = jumpy. A motif is the small building block of a tune."),

    L("Phrases: question and answer", [
      ["Musical sentences", "💬", "A <b>phrase</b> is a musical sentence, often <b>4 measures</b> long. A curved <b>slur</b> can show a phrase. Singers breathe at the end of phrases."],
      ["Question and answer", "?  !", "The first phrase (the <b>antecedent</b>) feels like a question: it ends unfinished. The second (the <b>consequent</b>) answers it and ends on a home sound."],
      ["Period", "4 + 4", "Two phrases together make a <b>period</b>. Two 4-measure phrases make an 8-measure period."]
    ], [
      "A phrase is like a musical...|sentence|number|picture",
      "A typical phrase is how many measures long?|4|1|40",
      "A pair of question and answer phrases is called a...|period|pedal|pause",
      "The question phrase usually ends feeling...|unfinished|finished|silent",
      "The answer phrase usually ends feeling...|finished (at home)|unfinished|out of tune",
      "Another name for the question phrase is the...|antecedent|consequent|coda",
      "Another name for the answer phrase is the...|consequent|antecedent|tempo",
      "A curved line over several notes can show...|a phrase|a repeat|a rest",
      "How many measures are in a period made of two 4-measure phrases?|8|4|16"
    ], "Think of a spoken question and its answer. Which one sounds finished?", "Question phrase = antecedent, ends unfinished. Answer phrase = consequent, ends finished. Together they are a period."),

    L("Classifying instruments", [
      ["Four ways to make sound", "🔔🥁🎻🎺", "Scientists sort instruments by what vibrates: <b>idiophones</b> (the body itself), <b>membranophones</b> (a stretched skin), <b>chordophones</b> (strings), <b>aerophones</b> (air)."],
      ["Examples", "🥁", "Idiophones: triangle, xylophone, cymbals. Membranophones: snare drum, timpani. Chordophones: violin, guitar, piano. Aerophones: flute, trumpet, clarinet."],
      ["Electric ones", "🎹", "Instruments that make sound with electricity, like the synthesizer, are <b>electrophones</b>."]
    ], [
      "A xylophone is an...|idiophone|aerophone|chordophone",
      "A violin is a...|chordophone|membranophone|aerophone",
      "A flute is an...|aerophone|idiophone|electrophone",
      "A snare drum is a...|membranophone|chordophone|aerophone",
      "A triangle is an...|idiophone|membranophone|aerophone",
      "A synthesizer is an...|electrophone|aerophone|idiophone",
      "A guitar is a...|chordophone|idiophone|membranophone",
      "A trumpet is an...|aerophone|chordophone|membranophone",
      "The word part 'aero' means...|air|string|skin"
    ], "What is the thing that vibrates to make the sound: a body, a skin, a string, or air?", "Body = idiophone, skin = membranophone, string = chordophone, air = aerophone, electricity = electrophone."),

    L("The 12-bar blues form", [
      ["Three lines", "4+4+4", "The 12-bar blues has <b>12 measures</b> in three lines of 4. It uses chords <b>I, IV and V</b>."],
      ["Chords by bar", "I I I I | IV IV I I | V IV I I", "Bars 1-4 are mostly <b>I</b>. Bars 5-6 are <b>IV</b>, bars 7-8 go back to <b>I</b>. Bar 9 is <b>V</b>, bar 10 is <b>IV</b>, then <b>I</b> to finish."],
      ["Words", "A A B", "Many blues songs sing a line, repeat it, then sing a different line (<b>AAB</b>). Blues began in African American communities in the southern United States."]
    ], [
      "How many measures are in the 12-bar blues?|12|8|16",
      "Which chords does the 12-bar blues use?|I, IV and V|I, ii and vii|Only I",
      "Blues lyrics often follow the pattern...|AAB|ABC|ABAB",
      "Bars 1 to 4 of the 12-bar blues mostly use chord...|I|IV|V",
      "Bars 5 and 6 of the 12-bar blues use chord...|IV|I|V",
      "Bar 9 of the 12-bar blues uses chord...|V|I|IV",
      "In the key of C, the chords of the blues are...|C, F and G|C, D and E|C, A and B",
      "In the key of G, the IV chord is...|C|D|A",
      "In the key of G, the V chord is...|D|C|E"
    ], "Count the bars in three lines of four, and remember which chord starts each line.", "Line one is mostly I. Line two starts on IV. Line three starts on V.")
  ];
  l10.push(
    MIX("Mixed practice", [l10[0], l10[1], l10[3], l10[4], l10[7], l10[8], l10[9], l10[10], l10[12], l10[13]]),
    MIX("Level 10 Challenge", [l10[2], l10[5], l10[6], l10[11], l10[14], l10[15], l10[16], l10[17], l10[1], l10[8]])
  );

  // ======================= LEVEL 11 =======================
  const l11 = [
    L("A chord on every note", [
      ["Build on each degree", "I ii iii IV V vi vii°", "Stack thirds on each note of the major scale to get seven chords. Capital Roman numerals are <b>major</b> chords (I, IV, V). Small ones are <b>minor</b> (ii, iii, vi)."],
      ["The odd one", "vii°", "The chord on the 7th note, <b>vii°</b>, is <b>diminished</b>."],
      ["In C major", "C Dm Em F G Am Bdim", "I = C major, ii = D minor, iii = E minor, IV = F major, V = G major, vi = A minor, vii° = B diminished."]
    ], [
      "In C major, the ii chord is...|D minor|D major|D diminished",
      "In C major, the iii chord is...|E minor|E major|E diminished",
      "In C major, the vi chord is...|A minor|A major|A diminished",
      "In C major, the vii° chord is...|B diminished|B minor|B major",
      "In C major, the IV chord is...|F major|F minor|F diminished",
      "In C major, the V chord is...|G major|G minor|G diminished",
      "Which numerals are major chords in a major key?|I, IV and V|ii, iii and vi|Only vii°",
      "Which numerals are minor chords in a major key?|ii, iii and vi|I, IV and V|Only vii°",
      "Which chord is diminished in a major key?|vii°|V|IV",
      "In G major, the vi chord is...|E minor|C major|A minor"
    ], "Find the scale note that matches the number, then decide if its chord is major, minor or diminished.", "I, IV, V are major. ii, iii, vi are minor. vii° is diminished."),

    L("Whole-tone and chromatic scales", [
      ["Chromatic", "🎹", "The <b>chromatic scale</b> uses every <b>half step</b>: 12 different notes in each octave, white and black keys. <i>Chroma</i> is Greek for color."],
      ["Whole tone", "C D E F♯ G♯ A♯", "The <b>whole-tone scale</b> has only <b>whole steps</b>. It has just <b>6 notes</b> in an octave. It sounds dreamy, as the home note is hard to hear. Debussy used it."],
      ["Compare", "7 / 12 / 6", "Major scale: 7 notes. Chromatic scale: 12 notes. Whole-tone scale: 6 notes."]
    ], [
      "The chromatic scale is made only of...|half steps|whole steps|thirds",
      "The whole-tone scale is made only of...|whole steps|half steps|fifths",
      "How many different notes are in a whole-tone scale (in one octave)?|6|7|5",
      "How many different notes are in a chromatic scale (in one octave)?|12|7|8",
      "C whole-tone scale: C D E ___.|F♯|F|G",
      "Playing every white and black key in order gives the...|chromatic scale|pentatonic scale|major scale",
      "Which scale sounds dreamy, with no strong home note?|Whole-tone|Major|Minor",
      "Chromatic comes from a Greek word meaning...|color|number|step",
      "Which composer from France used whole-tone scales?|Debussy|Haydn|Handel"
    ], "Think of the size of each step in the scale. All half steps, or all whole steps?", "Chromatic = all half steps (12 notes). Whole tone = all whole steps (6 notes)."),

    L("Church modes", [
      ["Modes", "🎹", "A <b>mode</b> is a scale you get by playing the white keys starting on a different note. There are seven."],
      ["The names", "D E F G A B C", "From D: <b>Dorian</b>. From E: <b>Phrygian</b>. From F: <b>Lydian</b>. From G: <b>Mixolydian</b>. From A: <b>Aeolian</b>. From B: <b>Locrian</b>."],
      ["Two you know", "C and A", "White keys from C is <b>Ionian</b>, which is the major scale. White keys from A is Aeolian, which is the natural minor scale."]
    ], [
      "White keys from D to D make which mode?|Dorian|Phrygian|Lydian",
      "White keys from E to E make which mode?|Phrygian|Dorian|Aeolian",
      "White keys from F to F make which mode?|Lydian|Mixolydian|Ionian",
      "White keys from G to G make which mode?|Mixolydian|Lydian|Locrian",
      "White keys from A to A make which mode?|Aeolian|Dorian|Ionian",
      "White keys from B to B make which mode?|Locrian|Phrygian|Aeolian",
      "White keys from C to C make which mode?|Ionian|Dorian|Lydian",
      "Which mode is the same as the major scale?|Ionian|Dorian|Lydian",
      "Which mode is the same as the natural minor scale?|Aeolian|Phrygian|Ionian"
    ], "Find the starting note on the white keys, then match it to its mode name.", "D Dorian, E Phrygian, F Lydian, G Mixolydian, A Aeolian, B Locrian, C Ionian."),

    L("Chords in a minor key", [
      ["Minor chords", "i ii° III iv v VI VII", "In a minor key the chords are: <b>i</b> (minor), <b>ii°</b> (diminished), <b>III</b> (major), <b>iv</b> (minor), <b>v</b> (minor), <b>VI</b> (major), <b>VII</b> (major)."],
      ["In A minor", "Am Bdim C Dm Em F G", "i = A minor, ii° = B diminished, III = C major, iv = D minor, v = E minor, VI = F major, VII = G major."],
      ["Harmonic minor", "G♯", "Raise the 7th note (G → G♯) in harmonic minor and the <b>V</b> chord becomes <b>major</b> (E major). That gives a stronger pull to the home note."]
    ], [
      "In A minor, the i chord is...|A minor|A major|C major",
      "In A minor, the III chord is...|C major|C minor|E minor",
      "In A minor, the iv chord is...|D minor|D major|F major",
      "In A minor, the VI chord is...|F major|F minor|E major",
      "In A minor, the VII chord is...|G major|G minor|B diminished",
      "In A minor, the ii° chord is...|B diminished|B minor|B major",
      "Which note is raised in harmonic minor to make a major V chord?|The 7th note|The 4th note|The 1st note",
      "In a Roman numeral, a capital letter such as III means a...|major chord|minor chord|diminished chord",
      "In D minor, the i chord is...|D minor|F major|A minor"
    ], "Write out the minor scale, then match each numeral to its note. Capital letters are major.", "Capital = major, small = minor, ° = diminished. Harmonic minor raises the 7th."),

    L("Overtones and the harmonic series", [
      ["More than one pitch", "〰️", "When a string vibrates, it makes the main pitch (the <b>fundamental</b>) and also higher, quieter sounds called <b>overtones</b> or <b>harmonics</b>."],
      ["Counting up", "1× 2× 3× 4×", "The 2nd harmonic is <b>2 times</b> the fundamental frequency (an octave higher). The 3rd harmonic is 3 times, the 4th harmonic is 4 times."],
      ["Color of the sound", "🎨", "The mix of overtones is why a flute and a trumpet sound different (<b>timbre</b>). Brass players change notes using overtones."]
    ], [
      "The lowest main pitch of a sound is called the...|fundamental|overtone|accent",
      "The higher, quieter sounds above it are called...|overtones|rests|bar lines",
      "A fundamental is 100 Hz. What is the 2nd harmonic?|200 Hz|150 Hz|300 Hz",
      "A fundamental is 100 Hz. What is the 3rd harmonic?|300 Hz|200 Hz|400 Hz",
      "A fundamental is 100 Hz. What is the 4th harmonic?|400 Hz|300 Hz|800 Hz",
      "A fundamental is 110 Hz. What is the 2nd harmonic?|220 Hz|165 Hz|330 Hz",
      "The 2nd harmonic sounds an ___ above the fundamental.|octave|fifth|second",
      "A different mix of overtones gives an instrument its...|timbre|tempo|meter",
      "Brass players change notes without valves by using...|overtones|pedals|bows"
    ], "Harmonics are whole-number multiples of the fundamental. Which number?", "The nth harmonic is n times the fundamental frequency."),

    F("How fast is sound?", [
      ["Speed in air", "💨", "Sound travels through air at about <b>340 metres per second</b> (a bit more than 1,200 km/h)."],
      ["Other places", "🌊", "Sound goes faster in water and steel than in air. It cannot travel in <b>space</b> because there is no air to carry the vibration."],
      ["Thunder", "⚡", "Light is much faster than sound. You see lightning first and hear thunder later. Distance = <b>340 × seconds</b>."]
    ], () => {
      if (Math.random() < 0.5) {
        const t = ri(2, 6);
        return { text: `You hear thunder ${t} seconds after the lightning flash. Sound travels about 340 metres each second. How many metres away is the storm?`, answer: 340 * t, hints: ["The sound travels the same distance every second. Think about how to combine that with the time.", "Multiply the distance sound goes in one second by the number of seconds you waited.", "Example: a 10-second wait means 340 × 10 = 3,400 metres. Now do yours (type just the number)."] };
      }
      return mc([
        "Can sound travel through the empty vacuum of space?|No, it needs something to travel through|Yes, very fast|Yes, but only low sounds",
        "Which travels faster, sound or light?|Light|Sound|They are the same",
        "Why do you see lightning before you hear thunder?|Light travels faster than sound|Thunder happens first|Sound is quieter",
        "Sound travels fastest through which of these?|Steel|Air|Empty space",
        "Sound travels faster in water than in...|air|steel|a solid rock",
        "What carries a sound wave through the air?|Vibrating air particles|Light|Heat only",
        "Low-pitched sounds have ___ waves than high-pitched sounds.|longer|shorter|louder",
        "An echo is made when sound...|bounces off a surface|disappears|speeds up"
      ], "Think about what a sound wave needs, and how it compares to light.", "Sound needs matter to move through. Light is far faster than sound.");
    }),

    L("The Classical era", [
      ["Time and place", "1750-1820", "The <b>Classical</b> era lasted about <b>1750 to 1820</b>. Vienna, Austria, was the music capital. Music was balanced, clear and elegant, with simple, singable tunes."],
      ["Three great names", "🎼", "<b>Haydn</b> (Austria) wrote over 100 symphonies. <b>Mozart</b> (Austria) was a child star and wrote operas like <i>The Magic Flute</i>. <b>Beethoven</b> (Germany) linked Classical and Romantic. He wrote nine symphonies."],
      ["New sounds", "🎹", "The <b>piano</b> took over from the harpsichord because it could play loud and soft. The orchestra grew and the <b>symphony</b> and <b>string quartet</b> became popular."]
    ], [
      "The Classical era was roughly...|1750 to 1820|1600 to 1750|1900 to 2000",
      "Which city was the music capital of the Classical era?|Vienna|Sydney|Moscow",
      "Which composer is called the 'father of the symphony'?|Haydn|Vivaldi|Handel",
      "Which composer was a child star and wrote The Magic Flute?|Mozart|Bach|Brahms",
      "Which composer wrote nine symphonies and linked Classical and Romantic music?|Beethoven|Haydn|Handel",
      "Which keyboard became popular in the Classical era?|The piano|The harpsichord|The synthesizer",
      "Why did the piano replace the harpsichord?|It could play loud and soft|It was cheaper|It had no strings",
      "In which country was Mozart born?|Austria|Italy|England",
      "Classical music is known for being...|balanced and clear|wild and noisy|electronic"
    ], "Think of Vienna, clear tunes, and the composers Haydn, Mozart and Beethoven.", "Haydn and Mozart: Austria. Beethoven: Germany. The era is about 1750 to 1820."),

    L("Sonata form", [
      ["Three parts", "1 · 2 · 3", "Many first movements use <b>sonata form</b>: <b>exposition</b>, <b>development</b>, <b>recapitulation</b>."],
      ["What happens", "A B", "In the <b>exposition</b>, the main themes are introduced. In the <b>development</b>, the themes are changed and travel through different keys. In the <b>recapitulation</b>, the themes return in the home key."],
      ["Extras", "🏁", "Some pieces start with a slow <b>introduction</b> and end with a <b>coda</b>. Sonata form was used by Haydn, Mozart and Beethoven."]
    ], [
      "How many main parts does sonata form have?|3|2|5",
      "Which part introduces the main themes?|Exposition|Development|Recapitulation",
      "In which part are the themes changed and moved through different keys?|Development|Exposition|Recapitulation",
      "In which part do the themes return in the home key?|Recapitulation|Exposition|Development",
      "What does recapitulation mean?|A summing up, going over again|A new idea|A rest",
      "What is the first part of sonata form?|Exposition|Recapitulation|Coda",
      "What is the second part of sonata form?|Development|Exposition|Introduction",
      "A short ending added after the recapitulation is a...|coda|motif|fugue",
      "Sonata form was used a lot by...|Haydn, Mozart and Beethoven|only folk singers|only jazz bands"
    ], "Think of a story: set it up, shake it up, then bring it home.", "Exposition shows the ideas, development changes them, recapitulation brings them back home."),

    L("Theme and variations", [
      ["A tune, changed", "🔁", "In <b>theme and variations</b>, a composer plays a <b>theme</b> (a tune) and then repeats it many times, changing something each time."],
      ["What can change?", "🎚️", "A variation might change the <b>rhythm</b>, <b>tempo</b>, <b>dynamics</b>, <b>key</b> (major to minor), the <b>instrument</b> that plays it, or add <b>ornaments</b>."],
      ["A famous set", "⭐", "Mozart wrote 12 variations on a French tune that we sing as <i>Twinkle, Twinkle, Little Star</i>."]
    ], [
      "In theme and variations, what is the theme?|The main tune|The ending|A rest",
      "Changing a tune from major to minor is changing its...|key (mode)|clef|bar line",
      "Playing the theme faster or slower changes the...|tempo|pitch names|staff",
      "Making a tune louder or softer changes the...|dynamics|clef|key signature",
      "Adding extra decorating notes to the theme is adding...|ornaments|barlines|repeats",
      "Giving the theme to a different instrument changes the...|timbre|time signature|clef",
      "Which composer wrote 12 variations on the tune we sing as Twinkle, Twinkle?|Mozart|Vivaldi|Chopin",
      "A variation keeps the theme recognizable but...|changes something about it|replaces it completely|makes it silent",
      "Theme and variations is a type of...|musical form|instrument|dance"
    ], "Ask what stays the same (the tune) and what has changed.", "A variation keeps the theme's idea but changes rhythm, tempo, key, dynamics, instrument or decoration."),

    L("Types of music pieces", [
      ["Big works", "🎻", "A <b>symphony</b> is a long piece for orchestra, usually in 4 sections called <b>movements</b>. A <b>concerto</b> features a solo player with the orchestra."],
      ["Small works", "🎹", "A <b>sonata</b> is for one or two instruments. A <b>string quartet</b> is for 2 violins, a viola and a cello. A <b>suite</b> is a set of short dances."],
      ["Openers", "🎭", "An <b>overture</b> is an opening piece for an opera, ballet or play."]
    ], [
      "A long piece for orchestra, usually with 4 movements, is a...|symphony|sonata|overture",
      "A piece with a solo player and the orchestra is a...|concerto|quartet|round",
      "A piece for one or two instruments, often with 3 movements, is a...|sonata|symphony|suite",
      "A set of short dances is a...|suite|concerto|motif",
      "An opening piece for an opera is an...|overture|aria|encore",
      "A string quartet has how many players?|4|2|6",
      "Which instruments are in a string quartet?|2 violins, viola and cello|3 flutes and a drum|piano and guitar only",
      "A section of a symphony is called a...|movement|measure|motif",
      "In a violin concerto, the soloist plays the...|violin|piano|triangle"
    ], "Match the name to the size and the players. Is it for a whole orchestra, a soloist, or a few players?", "Symphony = orchestra. Concerto = soloist and orchestra. Quartet = four players. Suite = dances."),

    L("Transposing instruments", [
      ["Written and sounding", "C → B♭", "Some instruments sound a different note from the one written. They are <b>transposing instruments</b>. <b>Concert pitch</b> is the real sounding pitch."],
      ["Common ones", "B♭", "On a <b>B♭ clarinet</b> or <b>B♭ trumpet</b>, a written C sounds <b>B♭</b> (a whole step lower). A <b>horn in F</b> sounds F when C is written. An <b>alto sax</b> in E♭ sounds E♭."],
      ["Why?", "🎷", "It lets players use the same fingerings on different sizes of an instrument family. The flute, oboe, violin and piano sound as written."]
    ], [
      "A written C on a B♭ trumpet sounds like...|B♭|C|D",
      "A written C on a B♭ clarinet sounds like...|B♭|C|D",
      "A B♭ trumpet player reads D. What note sounds?|C|E|B♭",
      "A written C on an alto sax in E♭ sounds like...|E♭|F|A♭",
      "A written C on a horn in F sounds like...|F|G|E",
      "Concert pitch means...|the real sounding pitch|the written note|a loud note",
      "Which of these is a transposing instrument?|B♭ clarinet|Flute|Piano",
      "Which of these sounds the same as it is written?|Flute|B♭ trumpet|Alto sax",
      "How many half steps lower than written does a B♭ trumpet sound?|2|1|5"
    ], "Ask: is the sounding note the same as the written note, or shifted?", "B♭ instruments sound a whole step (2 half steps) lower than written."),

    L("Highest to lowest in a family", [
      ["Size and pitch", "📏", "In an instrument family, <b>smaller</b> instruments sound <b>higher</b> and <b>bigger</b> ones sound <b>lower</b>."],
      ["Voice names", "S A T B", "Instrument families borrow the singing voice names. Saxophones from high to low: <b>soprano, alto, tenor, baritone</b>. Strings: <b>violin, viola, cello, double bass</b>."],
      ["Orchestra extremes", "🎺", "The <b>piccolo</b> is the highest woodwind. The <b>tuba</b> is the lowest brass. The <b>double bass</b> is the lowest string."]
    ], [
      "Which saxophone has the highest pitch?|Soprano|Tenor|Baritone",
      "Which saxophone has the lowest pitch?|Baritone|Alto|Soprano",
      "Which is the highest woodwind in the orchestra?|Piccolo|Bassoon|Oboe",
      "Which is the lowest brass instrument?|Tuba|Trumpet|Trombone",
      "Which is the lowest string instrument?|Double bass|Cello|Viola",
      "Which is the highest string instrument?|Violin|Viola|Cello",
      "Which is lower, the viola or the violin?|Viola|Violin|They are the same",
      "Which is lower, the cello or the viola?|Cello|Viola|They are the same",
      "Which is higher, the oboe or the bassoon?|Oboe|Bassoon|They are the same",
      "Bigger instruments usually make ___ sounds.|lower|higher|quieter"
    ], "Think about the size of the instrument. Does a larger one sound higher or lower?", "Small = high. Big = low. Within a family, line up the instruments by size."),

    L("Expression words", [
      ["Beyond fast and slow", "🎭", "Composers add Italian words to tell the <b>mood</b>. <b>Dolce</b> = sweetly. <b>Cantabile</b> = in a singing style. <b>Maestoso</b> = majestic."],
      ["More words", "😊", "<b>Giocoso</b> = playful. <b>Grazioso</b> = graceful. <b>Espressivo</b> = with feeling. <b>Agitato</b> = excited and restless. <b>Tranquillo</b> = calm."],
      ["Others", "💨", "<b>Leggiero</b> = lightly. <b>Pesante</b> = heavy. <b>Con brio</b> = with spirit."]
    ], [
      "What does cantabile mean?|In a singing style|Very fast|Very quiet",
      "What does maestoso mean?|Majestic|Playful|Sleepy",
      "What does giocoso mean?|Playful|Heavy|Sad",
      "What does grazioso mean?|Graceful|Sudden|Angry",
      "What does espressivo mean?|With feeling|Without sound|Very fast",
      "What does agitato mean?|Excited and restless|Calm|Slow",
      "What does tranquillo mean?|Calm|Excited|Loud",
      "What does leggiero mean?|Lightly|Heavily|Slowly",
      "What does pesante mean?|Heavy|Light|Fast",
      "What does con brio mean?|With spirit|With a rest|With a pause"
    ], "Many of these words look like English words. Which one does it remind you of?", "Think of the mood: playful, graceful, calm, heavy or light."),

    F("Polyrhythm", [
      ["Two rhythms at once", "🥁🥁", "A <b>polyrhythm</b> plays two different rhythms at the same time, like <b>3 against 2</b>. It is common in West African drumming."],
      ["The shared grid", "2 × 3", "To fit 2 and 3 together, split the bar into the smallest grid where both fit. For 2 against 3, the grid has 2 × 3 = <b>6</b> tiny slots. For 3 against 4, 12 slots."],
      ["Hemiola", "3:2", "A <b>hemiola</b> makes two groups of three feel like three groups of two."]
    ], () => {
      if (Math.random() < 0.55) {
        const [a, b] = pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 7]]);
        return { text: `One drum plays ${a} even notes in a bar. Another plays ${b} even notes in the same bar. Both fit on a grid. What is the smallest number of equal slots in the grid?`, answer: a * b, hints: ["You need a grid where both patterns land exactly on a slot.", "The two numbers do not share any factor except 1, so multiply them together.", "Example: 2 against 3 gives 2 × 3 = 6 slots. Now do yours."] };
      }
      return mc([
        "Playing two different rhythms at the same time is a...|polyrhythm|drone|cadence",
        "3 against 2 is an example of a...|polyrhythm|scale|key change",
        "A hemiola makes two groups of three feel like...|three groups of two|four groups of four|one long note",
        "Polyrhythms are very common in the drumming of...|West Africa|no one|only marching bands",
        "In a polyrhythm, the two rhythms are played...|at the same time|one after the other|in silence",
        "Poly means...|many|one|quiet"
      ], "Think about the word poly and what it means for rhythms.", "Poly = many. Two or more rhythms together = polyrhythm.");
    }),

    L("Modulation: changing keys", [
      ["Moving home", "🏠 → 🏡", "A <b>modulation</b> is a change of key within a piece. The music moves to a new home note."],
      ["Popular moves", "C → G", "Common modulations: to the <b>dominant</b> key (up a fifth, like C major to G major), to the <b>relative minor</b> (C major to A minor), or to the <b>subdominant</b> (down a fifth, C to F)."],
      ["Clues", "♯", "New sharps, flats or naturals appearing often hint at a modulation. Many pop songs raise the last chorus a step for a lift."]
    ], [
      "A change of key within a piece is called a...|modulation|ostinato|repeat",
      "A piece in C major modulates to its dominant key. Which key?|G major|F major|D major",
      "A piece in G major modulates to its dominant key. Which key?|D major|C major|E major",
      "A piece in D major modulates to its dominant key. Which key?|A major|G major|E major",
      "A piece in C major modulates to its relative minor. Which key?|A minor|C minor|E minor",
      "A piece in G major modulates to its relative minor. Which key?|E minor|G minor|B minor",
      "A piece in C major modulates to its subdominant key. Which key?|F major|G major|D minor",
      "A song raises its last chorus by a step for extra excitement. This is a...|key change (modulation)|tempo change|repeat",
      "New accidentals appearing in the music often signal a...|modulation|rest|fermata"
    ], "Dominant is up a fifth, subdominant is down a fifth, relative minor is 3 half steps down.", "C major: dominant G, subdominant F, relative minor A. Count the same way in the new key."),

    L("Conducting patterns", [
      ["Beating time", "👆", "A conductor's right hand shows the beat. The first beat is always a <b>downbeat</b> (a downward motion). The last beat is an <b>upbeat</b>."],
      ["Patterns", "2 · 3 · 4", "<b>2/4</b>: down, up. <b>3/4</b>: down, right, up. <b>4/4</b>: down, left, right, up."],
      ["Other jobs", "🎶", "The conductor uses the left hand and face to show <b>dynamics</b>, cues for entrances and feeling. The thin stick is a <b>baton</b>."]
    ], [
      "The first beat in any conducting pattern is...|down|up|left",
      "In 4/4, the conductor's second beat moves...|left|right|down",
      "In 4/4, the conductor's third beat moves...|right|left|up",
      "In 4/4, the last beat moves...|up|down|left",
      "In 3/4, the second beat moves...|right|left|down",
      "In 2/4, the second beat moves...|up|down|right",
      "What is the first beat of a measure called?|The downbeat|The upbeat|The pickup",
      "What is the thin stick a conductor holds?|A baton|A bow|A mallet",
      "The conductor's left hand often shows...|dynamics and cues|only the beat|nothing at all"
    ], "Picture the conductor's hand drawing a shape in the air. The first beat is a downward motion.", "2/4 down up. 3/4 down right up. 4/4 down left right up."),

    L("American roots music", [
      ["Blues and jazz", "🎷", "<b>Blues</b> and <b>jazz</b> grew from African American communities in the United States. Jazz grew up in New Orleans. <b>Ragtime</b> has bouncy syncopated piano; <b>Scott Joplin</b> wrote <i>The Entertainer</i>."],
      ["Country and bluegrass", "🪕", "<b>Country</b> music uses guitar, fiddle and steel guitar. <b>Bluegrass</b> uses fast banjo, fiddle and mandolin."],
      ["Gospel and rock", "🎤", "<b>Gospel</b> is joyful church singing with strong choirs. <b>Rock and roll</b> began in the 1950s and mixed blues and country."]
    ], [
      "Jazz grew up in which US city?|New Orleans|Boston|Denver",
      "Who wrote the ragtime piece The Entertainer?|Scott Joplin|Mozart|Louis Pasteur",
      "Which style uses fast banjo, fiddle and mandolin?|Bluegrass|Opera|Ballet",
      "Which style is joyful church singing with strong choirs?|Gospel|Ragtime|Minimalism",
      "Rock and roll began in which decade?|1950s|1750s|1990s",
      "Ragtime piano music is known for its...|bouncy, syncopated rhythm|very slow tempo|silence",
      "Which instrument is common in bluegrass?|Banjo|Tuba|Harp",
      "Blues and jazz grew from the music of...|African American communities|a royal court|a marching band only",
      "Rock and roll mixed blues with...|country music|opera|chants"
    ], "Match the style to where it came from or what instruments it uses.", "Banjo and fiddle: bluegrass. New Orleans: jazz. Church choirs: gospel."),

    L("Digital audio and recording", [
      ["Capturing sound", "🎤", "A <b>microphone</b> turns sound vibrations into an electrical signal. A <b>speaker</b> does the reverse: it turns the signal back into sound."],
      ["Sample rate", "44,100", "Digital audio measures the sound many times a second. CD quality uses <b>44,100 samples per second</b>. More samples means a more accurate recording."],
      ["Tracks and mixing", "🎚️", "<b>Multitrack recording</b> records each instrument on its own track. <b>Mixing</b> sets the volume and balance. <b>MP3</b> files are compressed, so they are smaller."]
    ], [
      "What does a microphone do?|Turns sound into an electrical signal|Turns light into sound|Makes music louder only",
      "What does a speaker do?|Turns an electrical signal into sound|Records sound|Writes notes",
      "CD-quality audio takes how many samples each second?|44,100|10|1,000,000,000",
      "Recording each instrument on its own track is called...|multitrack recording|a drone|sight-reading",
      "Setting the volume and balance of tracks is called...|mixing|transposing|tuning",
      "An MP3 file is smaller because it is...|compressed|louder|played faster",
      "More samples per second means a ___ accurate recording.|more|less|equally",
      "What does MIDI send between instruments and computers?|Note instructions, not sound|Sound waves|Pictures",
      "Digital audio turns sound into...|numbers|paper|water"
    ], "Think about each step: capture the sound, turn it into numbers, edit, play back.", "Microphone in, speaker out. Samples per second measure how detailed it is.")
  ];
  l11.push(
    MIX("Mixed practice", [l11[0], l11[1], l11[3], l11[6], l11[7], l11[9], l11[10], l11[12], l11[13], l11[15]]),
    MIX("Level 11 Challenge", [l11[2], l11[4], l11[5], l11[8], l11[11], l11[14], l11[16], l11[17], l11[0], l11[9]])
  );

  // ======================= LEVEL 12 =======================
  const KEYS = {
    "C": ["C", "D", "E", "F", "G", "A", "B"],
    "G": ["G", "A", "B", "C", "D", "E", "F♯"],
    "D": ["D", "E", "F♯", "G", "A", "B", "C♯"],
    "F": ["F", "G", "A", "B♭", "C", "D", "E"],
    "A": ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
    "E": ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"]
  };
  const popChord = (k, d) => { const s = KEYS[k]; return [s[0] + " major", s[1] + " minor", s[2] + " minor", s[3] + " major", s[4] + " major", s[5] + " minor", s[6] + " diminished"][d]; };
  const ORD = { 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", 6: "6th", 7: "7th" };
  const INV = [["major", 3, "minor", 6], ["minor", 3, "major", 6], ["major", 2, "minor", 7], ["minor", 7, "major", 2], ["perfect", 5, "perfect", 4], ["perfect", 4, "perfect", 5], ["major", 6, "minor", 3], ["minor", 6, "major", 3], ["major", 7, "minor", 2], ["minor", 2, "major", 7]];
  const l12 = [
    L("The Romantic era", [
      ["Feelings first", "1820-1900", "The <b>Romantic</b> era lasted about <b>1820 to 1900</b>. Composers put big <b>emotions</b>, nature and stories into their music. Orchestras grew larger."],
      ["Great names", "🎹", "<b>Chopin</b> (born in Poland) wrote mostly for piano. <b>Brahms</b> and <b>Schumann</b> were German. <b>Liszt</b> (Hungary) was a dazzling pianist. <b>Tchaikovsky</b> (Russia) wrote <i>Swan Lake</i> and <i>The Nutcracker</i>."],
      ["Home pride", "🌍", "Many composers wrote music inspired by their own countries' folk songs. This is called <b>nationalism</b>. Dvořák (Czech) and Grieg (Norway) did this."]
    ], [
      "The Romantic era was roughly...|1820 to 1900|1600 to 1750|1950 to 2000",
      "Which composer was born in Poland and wrote mostly for piano?|Chopin|Brahms|Vivaldi",
      "Which composer from Russia wrote Swan Lake?|Tchaikovsky|Haydn|Bach",
      "Which Hungarian composer was a dazzling piano star?|Liszt|Handel|Mozart",
      "Romantic composers wanted to show strong...|emotions|rules only|silence",
      "Romantic orchestras were generally...|larger than before|smaller than before|without strings",
      "Using a country's folk songs in classical music is called...|nationalism|minimalism|ostinato",
      "Grieg wrote music inspired by which country?|Norway|Egypt|Brazil",
      "Brahms and Schumann were from which country?|Germany|Spain|Japan"
    ], "Think about big feelings and famous piano and orchestra music from the 1800s.", "Chopin Poland, Liszt Hungary, Tchaikovsky Russia, Brahms and Schumann Germany."),

    L("Music of the 1900s", [
      ["Breaking old rules", "1900+", "In the <b>20th century</b> composers tried new sounds. <b>Debussy</b> (France) painted soft, colorful pictures in music called <b>impressionism</b>."],
      ["Bold voices", "🎼", "<b>Stravinsky</b> (Russia) wrote <i>The Firebird</i> and <i>The Rite of Spring</i> with strong, new rhythms. <b>Copland</b> (USA) wrote <i>Appalachian Spring</i>. <b>Gershwin</b> (USA) wrote <i>Rhapsody in Blue</i>, mixing jazz and classical."],
      ["Repeating patterns", "🔁", "<b>Minimalism</b> uses short patterns that repeat and change slowly (Philip Glass, Steve Reich). Composers also began making <b>electronic music</b>."]
    ], [
      "Which composer from France is linked to impressionism?|Debussy|Haydn|Brahms",
      "Who wrote The Rite of Spring?|Stravinsky|Mozart|Handel",
      "Who wrote Appalachian Spring?|Copland|Beethoven|Vivaldi",
      "Who wrote Rhapsody in Blue?|Gershwin|Bach|Schumann",
      "Rhapsody in Blue mixes classical music with...|jazz|opera only|bagpipes",
      "Music built from short patterns that repeat and change slowly is called...|minimalism|Baroque|sonata form",
      "Impressionist music paints...|soft, colorful pictures|strict rules|loud marches only",
      "Which of these was new in 20th-century music?|Electronic music|The harpsichord|The lute",
      "Stravinsky was born in which country?|Russia|Italy|Germany"
    ], "Think of new sounds in the 1900s: jazz mixed in, repeating patterns, and electronics.", "Debussy impressionism, Stravinsky rhythms, Gershwin jazz and classical, Glass and Reich minimalism."),

    L("Composers and their homelands", [
      ["Where were they from?", "🗺️", "<b>Bach</b>, <b>Beethoven</b> and <b>Brahms</b>: Germany. <b>Haydn</b> and <b>Mozart</b>: Austria. <b>Vivaldi</b>: Italy. <b>Debussy</b>: France."],
      ["More", "🌍", "<b>Chopin</b>: Poland. <b>Tchaikovsky</b> and <b>Stravinsky</b>: Russia. <b>Dvořák</b>: the Czech lands. <b>Grieg</b>: Norway. <b>Sibelius</b>: Finland."],
      ["English and American", "🎵", "<b>Holst</b> and <b>Elgar</b>: England. <b>Copland</b> and <b>Gershwin</b>: the United States. <b>Handel</b> was born in Germany but lived in England."]
    ], [
      "Which country was Mozart from?|Austria|Italy|France",
      "Which country was Vivaldi from?|Italy|Germany|Norway",
      "Which country was Chopin from?|Poland|Russia|Spain",
      "Which country was Grieg from?|Norway|Finland|Sweden",
      "Which country was Sibelius from?|Finland|Norway|Russia",
      "Which country was Debussy from?|France|Austria|England",
      "Which country was Holst from?|England|Germany|Russia",
      "Which country was Tchaikovsky from?|Russia|Poland|Hungary",
      "Which country was Dvořák from?|The Czech lands|Italy|Norway",
      "Which country was Copland from?|The United States|England|France"
    ], "Match each composer to a country you have learned about.", "Bach, Beethoven, Brahms: Germany. Haydn, Mozart: Austria. Vivaldi: Italy."),

    F("Chords in pop songs", [
      ["Four-chord songs", "I V vi IV", "Thousands of pop songs use the same four chords in order: <b>I – V – vi – IV</b>."],
      ["In C", "C G Am F", "In C major: I = C, V = G, vi = Am (minor!), IV = F. In G major: G, D, Em, C."],
      ["Any key", "key + count", "To find a chord in any key, write the major scale, count to the number, and remember that vi is minor."]
    ], () => {
      const k = pick(Object.keys(KEYS)), d = pick([0, 3, 4, 5]), nm = { 0: "I", 3: "IV", 4: "V", 5: "vi" }[d];
      const ans = popChord(k, d);
      const pool = [0, 1, 2, 3, 4, 5, 6].filter(x => x !== d).map(x => popChord(k, x)).filter(x => x !== ans);
      const ek = k === "G" ? "D" : "G", ed = d === 5 ? 3 : 5;
      return {
        text: `In the key of ${k} major, what is the ${nm} chord?`, choices: shuf([ans, ...shuf(pool).slice(0, 2)]).map(A), answer: A(ans),
        hints: ["First write out the major scale of this key. Then count to the Roman numeral.", "Capital Roman numerals (I, IV, V) are major chords. A small one like vi is a minor chord.", `Example: in ${ek} major the scale is ${KEYS[ek].join(" ")}, so ${["I", "", "", "IV", "V", "vi"][ed]} is ${popChord(ek, ed).replace("♯", " sharp").replace("♭", " flat")}. Now do yours.`]
      };
    }),

    L("Blues scale and swing", [
      ["Six notes", "C E♭ F G♭ G B♭", "The <b>blues scale</b> is the minor pentatonic scale plus one extra note, the <b>blue note</b> (a flat 5th). In C it is <b>C, E♭, F, G♭, G, B♭</b>."],
      ["Swing feel", "♪♪", "In <b>swing</b>, pairs of eighth notes are played long-short, like a skipping rhythm, not evenly. Even eighths are called <b>straight</b>."],
      ["Walking bass", "🎸", "A <b>walking bass</b> plays a steady line of quarter notes, one note on each beat, moving up and down like walking."]
    ], [
      "How many notes does the blues scale have (in one octave)?|6|5|7",
      "The blues scale is the minor pentatonic scale plus...|one extra blue note|two extra notes|no extra notes",
      "In C blues scale, the extra blue note is...|G♭|D|A",
      "Which note is NOT in the C blues scale?|D|B♭|F",
      "In swing, pairs of eighth notes are played...|long-short, like skipping|exactly even|very fast and equal",
      "Evenly played eighth notes are called...|straight|swung|bent",
      "A walking bass plays...|one steady quarter note on each beat|one long note|only on beat 1",
      "Swing is a feel often used in...|jazz|marching band parades only|chanting only",
      "The blues scale starts on C. The second note is...|E♭|D|E"
    ], "The blues scale has a bluesy, bent sound. Count its notes and look for the extra one.", "Minor pentatonic is five notes. Add the flat 5th to get six."),

    L("Choral music", [
      ["Big choir pieces", "🎶", "A <b>mass</b> is music for a church service. An <b>oratorio</b> is a long work for choir, soloists and orchestra that tells a story, without costumes or acting. Handel's <i>Messiah</i> is an oratorio."],
      ["Shorter pieces", "🎵", "A <b>cantata</b> is a shorter work for singers and instruments. A <b>motet</b> is a short choral piece, often sung without instruments. An <b>anthem</b> is a short choral song, and a <b>hymn</b> is a song of praise."],
      ["A cappella", "🎤", "<b>A cappella</b> means singing <b>without instruments</b>. A <b>chorale</b> is a hymn tune in four parts, like those Bach harmonized."]
    ], [
      "Singing without any instruments is called...|a cappella|con brio|staccato",
      "A long work for choir, soloists and orchestra that tells a story is an...|oratorio|etude|overture",
      "Music written for a church service is called a...|mass|rondo|suite",
      "Handel's Messiah is an example of an...|oratorio|opera|ballet",
      "A short choral piece, often without instruments, is a...|motet|concerto|symphony",
      "A hymn is a song of...|praise|argument|silence",
      "A shorter work for singers and instruments is a...|cantata|quartet|sonata",
      "Does an oratorio usually have acting and costumes?|No|Yes, always|Only for dancers",
      "A hymn tune harmonized in four parts is a...|chorale|drone|fugue"
    ], "Think about who is singing, and whether there is a story or a church setting.", "Mass = church service. Oratorio = story for choir and orchestra. A cappella = no instruments."),

    L("Sight-reading steps", [
      ["Read a new piece", "👀", "<b>Sight-reading</b> means playing music you have never seen before. Before you start, look over the page for a few seconds."],
      ["The checklist", "✔️", "Check: <b>key signature</b>, <b>time signature</b>, <b>tempo</b>, tricky <b>rhythms</b>, <b>accidentals</b>, and signs like <b>repeats</b>, <b>D.C.</b> and <b>dynamics</b>."],
      ["While playing", "➡️", "Keep a steady beat and do not stop for mistakes. Look <b>ahead</b> of the notes you are playing. Choose a slow, safe tempo."]
    ], [
      "Sight-reading means playing a piece...|you have never seen before|from memory|only very softly",
      "What should you check first about the key?|The key signature|The cover|The page number",
      "What does the time signature tell you?|How the beats are counted|The loudness|The composer",
      "What should you do if you make a mistake while sight-reading?|Keep going with a steady beat|Stop and start again|Throw the music away",
      "Where should your eyes look while sight-reading?|Ahead of the notes you are playing|Only at your hands|At the ceiling",
      "A good tempo for sight-reading is...|slow and safe|as fast as possible|none at all",
      "Which sign tells you to go back to the start?|D.C.|Fine|Pp",
      "Why scan the page for accidentals first?|So you are ready for unexpected sharps and flats|To count the pages|To find the title",
      "Why check the tempo before starting?|To choose a steady speed|To choose a key|To count the bars"
    ], "Think of what you would want to know before you start walking on a new path.", "Scan key, time, tempo, rhythms, accidentals and signs. Then play with a steady beat."),

    L("Smart practice", [
      ["Slow and small", "🐢", "Practice <b>slowly</b> and in <b>small sections</b>. Use a <b>metronome</b> to keep a steady beat, then speed up a little at a time."],
      ["Fix, don't repeat", "🔧", "When you find a mistake, stop and fix that spot. Playing it wrong over and over teaches the mistake. Warm up first."],
      ["Daily habits", "📅", "Short practice <b>every day</b> works better than one long practice. Listen to yourself, or record and play it back."]
    ], [
      "What is a good way to learn a hard passage?|Slowly, in small sections|At full speed right away|Skip it",
      "Which tool helps you keep a steady beat?|A metronome|A baton|A mute",
      "When you find a mistake, you should...|fix that spot|play it wrong again and again|ignore it",
      "Which works better for learning?|Short practice every day|One huge practice a month|Never practicing",
      "Why warm up before practicing?|To get your hands and voice ready|To make the music louder|To skip tuning",
      "Recording yourself helps you...|hear what to improve|get a new instrument|play faster by magic",
      "After a hard spot is correct slowly, you should...|speed up a little at a time|go full speed at once|stop practicing",
      "Playing a mistake over and over...|teaches the mistake|fixes it|makes it disappear",
      "Breaking a piece into small chunks makes it...|easier to learn|harder to learn|longer"
    ], "Which choice builds a skill step by step and keeps good habits?", "Slow, small, steady, daily: those are the keys to practicing well."),

    L("Concert manners and performing", [
      ["Before the music", "🎟️", "Arrive early, turn off phones, and sit quietly. Before an orchestra begins, the oboe plays an <b>A</b> and everyone tunes. The <b>concertmaster</b> (the lead violinist) leads the tuning."],
      ["During the music", "👏", "Listen quietly. In a symphony, wait until the <b>whole piece</b> is over to clap, not between movements. Clap warmly at the end."],
      ["Performing", "🌟", "Take a slow breath, stand or sit tall, and think about the first measure. Nerves are normal. After you play, take a bow and smile."]
    ], [
      "Who leads the tuning of the orchestra?|The concertmaster|The drummer|The ushers",
      "Which note does the oboe usually play for tuning?|A|C|E",
      "When should you usually clap at a symphony?|After the whole piece is over|Between every movement|While the music plays",
      "What should you do with your phone during a concert?|Turn it off|Take a call|Play a game",
      "What does a performer do after finishing a piece?|Takes a bow|Walks off without looking|Starts again",
      "What can help with nerves before playing?|A slow breath|Skipping practice|Running",
      "The concertmaster is the lead...|violinist|conductor|drummer",
      "Why do orchestras tune before a concert?|So all instruments match in pitch|To make noise|To warm up the audience",
      "Is it normal to feel nervous before a performance?|Yes, many performers do|No, never|Only beginners"
    ], "Think about being kind to the performers and other listeners.", "Tune together, listen quietly, clap at the end, bow after playing."),

    F("Flipping intervals", [
      ["Inversion", "C–E → E–C", "To <b>invert</b> an interval, move the lower note up an octave (or the top note down). A 3rd turns into a 6th."],
      ["The rule of nine", "3 + 6 = 9", "The interval numbers always add up to <b>nine</b>: 2nd ↔ 7th, 3rd ↔ 6th, 4th ↔ 5th."],
      ["Quality swaps", "M ↔ m", "<b>Major</b> becomes <b>minor</b>, and <b>minor</b> becomes <b>major</b>. <b>Perfect</b> stays perfect."]
    ], () => {
      if (Math.random() < 0.5) {
        const n = pick([2, 3, 4, 5, 6, 7]);
        return { text: `An interval is a ${ORD[n]}. When you invert it, it becomes a ___ (type the number, like 4 for a 4th).`, answer: 9 - n, hints: ["Inverting flips the interval around the octave. The new size depends on the old size.", "The old and new interval numbers add up to nine.", "Example: a 2nd inverts to a 7th, because 2 + 7 = 9. Now do yours."] };
      }
      const [q, n, q2, n2] = pick(INV);
      const exs = INV.filter(x => x[1] !== n && x[1] !== n2), ex = pick(exs);
      const wrong = q === "perfect" ? [`${q} ${ORD[n]}`, `major ${ORD[n2]}`] : [`${q} ${ORD[n2]}`, `${q2} ${ORD[n]}`];
      return {
        text: `What is the inversion of a ${q} ${ORD[n]}?`, choices: shuf([`${q2} ${ORD[n2]}`, ...wrong]), answer: `${q2} ${ORD[n2]}`.toString(),
        hints: ["Think about two things: the number changes, and the quality may change.", "The numbers add up to nine. Major and minor swap, while perfect stays perfect.", `Example: a ${ex[0]} ${ORD[ex[1]]} inverts to a ${ex[2]} ${ORD[ex[3]]}. Now do yours.`]
      };
    }),

    F("Eighth notes in compound time", [
      ["Counting eighths", "6/8 9/8", "In 6/8 a measure holds <b>6 eighth notes</b>. In 9/8 it holds 9. Count every note in eighths."],
      ["Values", "♩. ♩ ♪", "A <b>dotted quarter</b> note equals 3 eighths. A <b>quarter</b> note equals 2 eighths. An <b>eighth</b> note equals 1."],
      ["Space left", "6 − 3", "To find the space left, subtract what is used from the total: <b>measure total − eighths used</b>."]
    ], () => {
      const P = [["a dotted quarter note", 3], ["a quarter note", 2], ["an eighth note", 1]];
      const total = pick([6, 9]); let parts, used;
      do { parts = Array.from({ length: ri(2, 3) }, () => pick(P)); used = parts.reduce((s, x) => s + x[1], 0); } while (used >= total);
      return { text: `A ${total}/8 measure has ${parts.map(x => x[0]).join(", ")}. How many eighth notes of space are left?`, answer: total - used, hints: ["First change every note into eighths. Then compare with the whole measure.", "A dotted quarter is three eighths, a quarter is two eighths, an eighth is one. The top number tells how many eighths fit in the measure.", "Example: in 6/8, a quarter note and an eighth note use 2 + 1 = 3 eighths, so 6 − 3 = 3 are left. Now do yours."] };
    }),

    L("Who invented it?", [
      ["The piano", "🎹", "<b>Bartolomeo Cristofori</b>, an Italian, built the first piano around the year 1700. Its first name, <i>pianoforte</i>, means <b>soft-loud</b>."],
      ["The saxophone", "🎷", "<b>Adolphe Sax</b>, from Belgium, invented the saxophone in the 1840s. It is a woodwind that is made of brass."],
      ["Other firsts", "✨", "<b>Leon Theremin</b> built the <b>theremin</b>, played by moving hands near antennas without touching it. <b>Benjamin Franklin</b> made the glass armonica. <b>Stradivari</b> made famous violins in Cremona, Italy."]
    ], [
      "Who built the first piano around 1700?|Cristofori|Sax|Theremin",
      "Pianoforte means...|soft-loud|big-small|fast-slow",
      "Who invented the saxophone?|Adolphe Sax|Franklin|Stradivari",
      "From which country was Adolphe Sax?|Belgium|Spain|Japan",
      "The saxophone is a woodwind made of...|brass|wood|glass",
      "Which instrument is played without touching it?|Theremin|Violin|Piano",
      "Who invented the glass armonica?|Benjamin Franklin|Mozart|Bach",
      "Which Italian city is famous for Stradivari violins?|Cremona|Rome|Milan",
      "Cristofori was from which country?|Italy|France|Germany"
    ], "Match the instrument to its inventor or maker, then to his country.", "Piano: Cristofori. Saxophone: Sax. Theremin: Theremin. Glass armonica: Franklin."),

    L("Resonance and room sound", [
      ["Resonance", "🎸", "<b>Resonance</b> happens when one vibrating object makes another vibrate with it. A guitar's hollow body resonates and makes the string's sound louder."],
      ["Echo and reverb", "🏛️", "An <b>echo</b> is a clear repeat of a sound after it bounces off a far wall. <b>Reverberation</b> (reverb) is many quick bounces that blend together, like in a big hall."],
      ["Soft and hard", "🧸", "Soft things like curtains and carpets <b>absorb</b> sound. Hard walls <b>reflect</b> it. Concert halls are shaped to spread sound evenly."]
    ], [
      "A guitar body makes the string's sound louder through...|resonance|reverb only|silence",
      "A clear repeat of a sound after it bounces off a far wall is an...|echo|ostinato|ornament",
      "Many quick bounces that blend together are called...|reverberation|pitch|tempo",
      "Which material absorbs sound?|Thick curtains|Bare stone walls|Glass windows",
      "Which surface reflects sound?|A hard wall|A carpet|A pillow",
      "A big empty stone hall usually has lots of...|reverb|silence|carpet",
      "Resonance happens when one vibrating object...|makes another vibrate with it|stops all vibration|creates light",
      "Why are carpets used in recording rooms?|They absorb sound|They reflect sound|They make heat",
      "Concert halls are shaped to...|spread sound evenly|block all sound|hide the stage"
    ], "Ask whether the surface soaks up the sound or bounces it back.", "Soft = absorbs. Hard = reflects. Echo = clear repeat. Reverb = blended bounces."),

    L("Caring for the singing voice", [
      ["How the voice works", "🗣️", "Your voice comes from two small folds in the throat, the <b>vocal folds</b>. Air from your lungs makes them vibrate. Breathing deeply with the <b>diaphragm</b> gives steady breath."],
      ["Good habits", "💧", "Sit or stand tall, drink water, warm up before singing, and rest your voice. Do not shout or strain."],
      ["Terms", "🎤", "<b>Vibrato</b> is a small, steady wobble in pitch. <b>Range</b> is the span from your lowest to highest note. <b>Head voice</b> feels higher and lighter."]
    ], [
      "Where does your voice come from?|The vocal folds in the throat|The ears|The nose",
      "What makes the vocal folds vibrate?|Air from the lungs|Light|Sugar",
      "Which muscle helps with deep breathing?|The diaphragm|The biceps|The jaw only",
      "What is a good drink for your voice?|Water|Soda only|Nothing",
      "Why do singers warm up?|To get the voice ready safely|To get louder at any cost|To skip practice",
      "What is vibrato?|A small steady wobble in pitch|A very loud note|A rest",
      "A singer's range is...|the span from lowest to highest note|how loud they are|the length of a song",
      "What should singers avoid?|Shouting or straining|Warming up|Drinking water",
      "Good posture helps singers...|breathe better|hide the music|sing off key"
    ], "Which choice protects the voice and helps it work well?", "Water, warm-ups, good posture and rest are good for the voice. Shouting hurts it."),

    F("Music and ratios", [
      ["Ratios", "2:1  3:2  4:3", "Intervals are ratios of frequencies. An <b>octave</b> is <b>2:1</b>: the higher note vibrates twice as fast. A perfect <b>fifth</b> is <b>3:2</b>. A perfect <b>fourth</b> is <b>4:3</b>."],
      ["Using them", "× ÷", "For a fifth above 200 Hz: divide by 2 to get 100, then multiply by 3 to get 300 Hz."],
      ["On a string", "🎻", "Press a string at its halfway point and it sounds an octave higher. Two-thirds of the length sounds a fifth higher."]
    ], () => {
      const t = pick(["oct", "oct", "fifth", "fourth", "down"]);
      if (t === "oct") { const f = pick([100, 150, 200, 250, 300]); return { text: `A string vibrates at ${f} Hz. How many Hz is the same note one octave higher?`, answer: f * 2, hints: ["An octave is a simple whole-number ratio of 2 to 1.", "The higher note vibrates twice as fast as the lower note.", "Example: an octave above 120 Hz is 120 × 2 = 240 Hz. Now do yours."] }; }
      if (t === "down") { const f = pick([200, 300, 400, 600, 800]); return { text: `A note vibrates at ${f} Hz. How many Hz is the same note one octave lower?`, answer: f / 2, hints: ["Going down an octave is the opposite of going up.", "The lower note vibrates half as fast as the higher note.", "Example: an octave below 500 Hz is 500 ÷ 2 = 250 Hz. Now do yours."] }; }
      if (t === "fifth") { const f = pick([100, 200, 300, 400]); return { text: `A note vibrates at ${f} Hz. A perfect fifth above it vibrates at how many Hz?`, answer: f * 3 / 2, hints: ["A perfect fifth is the ratio 3 to 2.", "Divide the frequency by two, then multiply by three.", "Example: a fifth above 120 Hz is 120 ÷ 2 = 60, then 60 × 3 = 180 Hz. Now do yours."] }; }
      const f = pick([150, 300, 450, 600]);
      return { text: `A note vibrates at ${f} Hz. A perfect fourth above it vibrates at how many Hz?`, answer: f * 4 / 3, hints: ["A perfect fourth is the ratio 4 to 3.", "Divide the frequency by three, then multiply by four.", "Example: a fourth above 210 Hz is 210 ÷ 3 = 70, then 70 × 4 = 280 Hz. Now do yours."] };
    }),

    L("Reading a full score", [
      ["Many staves at once", "🎼", "A <b>full score</b> shows every instrument's staff at the same time, stacked on the page. All staves that play together are a <b>system</b>. A bar line runs through them to show the same measure."],
      ["Order", "↓", "Instruments are listed in families, top to bottom: <b>woodwinds, brass, percussion, then strings</b>. Names are printed at the left."],
      ["Helpers", "A B C", "<b>Measure numbers</b> and <b>rehearsal letters</b> help everyone find the same spot. A <b>brace</b> joins the two staves of a piano. A <b>part</b> is the music for one player only."]
    ], [
      "A page showing all the instruments' staves together is a...|full score|part|lead sheet",
      "The music for just one player is called a...|part|score|system",
      "What do rehearsal letters help with?|Finding the same spot together|Naming the key|Tuning",
      "In an orchestral score, which family is at the very top?|Woodwinds|Strings|Percussion",
      "In an orchestral score, which family is at the bottom?|Strings|Woodwinds|Brass",
      "What joins the two staves of a piano part?|A brace|A tie|A slur",
      "Where are the instrument names printed?|At the left|At the right|At the bottom",
      "A bar line through all the staves shows...|the same measure|a new key|a repeat",
      "Who mostly reads the full score?|The conductor|The audience|The ushers"
    ], "Picture a page with many lines stacked up. Which group of instruments is first?", "Top to bottom: woodwinds, brass, percussion, strings."),

    L("Dances and character", [
      ["Meter makes the mood", "💃", "The <b>waltz</b> is in 3/4 (ONE-two-three) and sweeps around. The <b>minuet</b> is a stately 3/4 dance. A <b>march</b> is in 2/4 or 4/4 with a steady beat for walking."],
      ["Lively ones", "🕺", "The <b>polka</b> is a lively 2/4 dance. A <b>gigue</b> is a bouncy dance in compound time (like 6/8). The <b>tango</b> is a dramatic dance from Argentina."],
      ["Calm ones", "🌙", "A <b>lullaby</b> is gentle and rocking, often in 6/8 or 3/4, to help a baby sleep."]
    ], [
      "A waltz is usually in which time signature?|3/4|2/4|5/4",
      "Which dance is lively and in 2/4?|Polka|Waltz|Lullaby",
      "A march usually has a ___ beat.|steady|floating|silent",
      "Which dance is a stately 3/4 dance?|Minuet|Polka|Tango",
      "Which dance comes from Argentina?|Tango|Waltz|Polka",
      "A gigue is usually in which kind of time?|Compound time, like 6/8|Only 5/4|4/4 only",
      "A lullaby is meant to be...|gentle and rocking|loud and fast|angry",
      "The waltz is counted...|ONE-two-three|ONE-two|ONE-two-three-four-five",
      "Which dance would you march to?|A march|A waltz|A lullaby"
    ], "Think about how many beats and what mood each dance has.", "Waltz and minuet: 3. Polka and march: 2 or 4. Lullaby: gentle."),

    L("Writing a song", [
      ["Start with an idea", "💡", "Songwriting starts with an <b>idea</b>: a feeling, a story or a short <b>hook</b> (a catchy bit of melody people remember)."],
      ["Build it", "🏗️", "Write the <b>lyrics</b>, a <b>melody</b>, and <b>chords</b>. Many songs use <b>verses</b> (the story), a <b>chorus</b> (the main message that repeats) and a <b>bridge</b> (a change of mood)."],
      ["Finish it", "✅", "Revise and play it for others. Writing your song down in <b>notation</b> or recording it saves it. <b>Copyright</b> means the writer owns the song."]
    ], [
      "A short, catchy bit of melody that people remember is a...|hook|clef|fermata",
      "Which part of a song repeats with the same words and music?|The chorus|The verse|The bridge",
      "Which part usually tells the story with new words each time?|The verse|The chorus|The coda",
      "Which part brings a change of mood, often once, late in the song?|The bridge|The chorus|The intro",
      "The words of a song are called the...|lyrics|score|tempo",
      "Copyright means the writer...|owns the song|must give it away|cannot sing it",
      "What can you do to keep your song so you do not forget it?|Write it in notation or record it|Hope you remember|Forget it",
      "Which of these is a good first step in writing a song?|Find an idea or feeling|Pick a trophy|Buy a ticket",
      "Chords in a song are usually played by...|a guitar or piano|a conductor's baton|the audience"
    ], "Think about the parts of a song: which repeats, which tells the story, which changes the mood?", "Verse = story. Chorus = repeating main message. Bridge = change of mood. Hook = catchy bit.")
  ];
  l12.push(
    MIX("Mixed practice", [l12[0], l12[2], l12[3], l12[5], l12[7], l12[9], l12[10], l12[12], l12[14], l12[16]]),
    MIX("Level 12 Challenge", [l12[1], l12[4], l12[6], l12[8], l12[11], l12[13], l12[15], l12[17], l12[3], l12[9]])
  );

  Object.assign(MUSIC_LEVELS, { 10: l10, 11: l11, 12: l12 });
})();
