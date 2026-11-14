// Mind Lab Music, levels 16-18 (extension file). 20 lessons per level.
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

  // ---------- computed questions ----------
  const keysQ = () => {
    const n = ri(2, 7), t = ri(0, 3), n2 = pick([2, 3, 4, 5].filter(x => x !== n));
    const per = [7, 5, 12, 12][t];
    const text = [
      `A keyboard has ${n} octaves of keys. How many white keys is that?`,
      `A keyboard has ${n} octaves of keys. How many black keys is that?`,
      `A keyboard has ${n} octaves of keys. How many keys is that in all (white and black)?`,
      `Starting on a C, how many half steps up is the C that is ${n} octaves higher?`][t];
    const what = ["white keys", "black keys", "keys in all", "half steps"][t];
    return {
      text, answer: per * n,
      hints: [
        "Work out how many there are in ONE octave, then multiply by the number of octaves.",
        t === 3 ? "Each key to the next key (white or black) is a half step. Count the keys in one octave and repeat." : "In one octave, count the white keys and the black keys separately. Use only the group the question asks about.",
        `Example: for ${n2} octaves, the number of ${what} is ${per} x ${n2} = ${per * n2}. Now do yours.`
      ]
    };
  };

  // ======================= LEVEL 16 =======================
  const l16 = [
    L("The drum kit", [
      ["Parts of the kit", "🥁", "A <b>drum kit</b> has a <b>bass drum</b> (played with a foot pedal), a <b>snare drum</b> (crisp, with wires underneath), <b>toms</b> (high, middle and floor), a <b>hi-hat</b> (two cymbals closed by a foot pedal), and <b>ride</b> and <b>crash</b> cymbals."],
      ["The basic beat", "1 2 3 4", "In a basic rock beat the bass drum plays on beats <b>1 and 3</b>, the snare plays on beats <b>2 and 4</b> (the <b>backbeat</b>), and the hi-hat keeps steady eighth notes."],
      ["Sticks, brushes and fills", "🎶", "Drummers use sticks, soft <b>brushes</b> (for quiet jazz), mallets or hands. A <b>fill</b> is a quick pattern around the toms that leads into a new section. The drummer keeps the band's tempo steady."]
    ], [
      "In a basic rock beat the snare plays on beats...|2 and 4|1 and 3|only 1",
      "In a basic rock beat the bass drum plays on beats...|1 and 3|2 and 4|only 4",
      "Which drum has wires underneath its bottom skin?|Snare drum|Floor tom|Bass drum",
      "Which part of the kit is played with a foot pedal and makes a low thump?|Bass drum|Ride cymbal|Snare drum",
      "The two cymbals that open and close with a foot pedal are the...|Hi-hat|Crash|Ride",
      "Accenting beats 2 and 4 is called the...|Backbeat|Pickup|Fermata",
      "A quick pattern on the toms that leads into a new section is a...|Fill|Rest|Clef",
      "Soft wire brushes are often used for which style?|Quiet jazz|Marching band|Hard rock",
      "A drum kit belongs to which instrument family?|Percussion|Woodwind|Brass"
    ], "Picture the drummer's hands and feet. What does each part of the kit do?", "Think about the basic rock beat: a low drum, a sharp drum and a steady cymbal."),

    L("Organs and harpsichords", [
      ["Before the piano", "🎹", "The <b>harpsichord</b> makes sound by <b>plucking</b> its strings with small quills. It sounds bright and sparkly, and touch does not change its loudness much. It was a main keyboard of the Baroque."],
      ["The pipe organ", "🎶", "A <b>pipe organ</b> sends air through pipes. It has several keyboards called <b>manuals</b>, a pedalboard for the feet, and knobs called <b>stops</b> that change the sound. It can hold a note as long as the key is down."],
      ["The piano", "📈", "Around 1700 in Italy, <b>Bartolomeo Cristofori</b> invented the piano. Its full name, <b>pianoforte</b>, means 'soft-loud', because hammers hitting the strings let players play softly or loudly by touch."]
    ], [
      "A harpsichord makes sound by...|Plucking strings|Hammering strings|Blowing air",
      "A piano makes sound by...|Hammers hitting strings|Plucking quills|Rubbing a bow",
      "A pipe organ makes sound by...|Air going through pipes|Hammered strings|Plucked quills",
      "The keyboards of a pipe organ are called...|Manuals|Stops|Frets",
      "The knobs that change a pipe organ's sound are called...|Stops|Frets|Bows",
      "The word 'pianoforte' means...|Soft-loud|Big keys|Small harp",
      "Who invented the piano around 1700?|Bartolomeo Cristofori|Johann Strauss|Ludwig van Beethoven",
      "Why can a harpsichord not change its loudness much by touch?|Its strings are plucked the same way every time|It has no strings|It is too big",
      "Which instrument is played with the feet as well as the hands?|Pipe organ|Harpsichord|Flute"
    ], "Think about what touches the strings, or what moves the air.", "Remember where each instrument comes from: plucked, hammered or blown."),

    L("Music and your brain", [
      ["Listening is a workout", "🧠", "When you listen to or play music, many parts of your brain work at once: hearing, movement, memory and feelings. Playing an instrument trains your fingers, ears and focus."],
      ["Memory and mood", "😊", "Music can bring back memories and change your mood. Fast, bright music often feels energetic. Slow, soft music often feels calm. Different people can feel different things from the same song."],
      ["Beat and body", "🥁", "People naturally tap, nod or dance to a steady beat. Studying music can build skills like listening, patience and teamwork. Scientists are still learning how much, and music does not make anyone a genius overnight."]
    ], [
      "Playing an instrument uses which of these together?|Hearing, movement and memory|Only your eyes|Only your stomach",
      "Slow, soft music often feels...|Calm|Hyper|Angry",
      "A song that reminds you of a happy trip shows that music is linked to...|Memory|Weather|Speed",
      "People often respond to a steady beat by...|Tapping or moving along|Falling asleep right away|Holding their breath",
      "Which skill can learning an instrument help build?|Focus and patience|Growing taller|Seeing in the dark",
      "Fast, bright music often feels...|Energetic|Sleepy|Sad",
      "Do all people feel the same thing from the same song?|No, feelings can differ|Yes, always|Only children differ",
      "Scientists say music is handled by...|Many parts of the brain|One tiny spot only|The ears only",
      "Which statement is careful and honest?|Music can help build skills, but it is not magic|Music instantly makes you a genius|Music has no effect on anyone"
    ], "Think about what happens in your body and brain while music is playing.", "Pick the answer that is reasonable and careful, not an exaggeration."),

    L("Latin American music", [
      ["Many styles", "🌎", "Latin America has lively music with African, Indigenous and European roots. <b>Tango</b> began around Argentina and Uruguay. <b>Samba</b> and <b>bossa nova</b> come from Brazil. <b>Mariachi</b> comes from Mexico. <b>Salsa</b> grew from Cuban and Puerto Rican music, especially in New York City."],
      ["Instruments", "🪗", "The <b>bandoneón</b> (a button accordion) is the sound of tango. Mariachi bands use trumpets, violins and a big bass guitar called the <b>guitarrón</b>. Andean music uses pan flutes and the small <b>charango</b>. Salsa uses congas, timbales and horns."],
      ["The feel", "💃", "<b>Samba</b> is fast and joyful and is part of Carnival in Brazil. <b>Bossa nova</b> ('new trend') is soft and gentle. Much of this music is made for dancing."]
    ], [
      "Which country is the home of mariachi music?|Mexico|Brazil|Argentina",
      "Tango began in the port cities of...|Argentina and Uruguay|Cuba and Jamaica|Mexico and Spain",
      "Samba is most connected to the Carnival of...|Brazil|Peru|Chile",
      "Which instrument is a button accordion used in tango?|Bandoneón|Charango|Marimba",
      "The charango is a small string instrument from the...|Andes mountains|Alps|Himalayas",
      "A mariachi band often has a big bass guitar called the...|Guitarrón|Bandoneón|Ukulele",
      "Bossa nova is a gentle style from...|Brazil|Mexico|Cuba",
      "Which pair of drums is central to salsa?|Congas and timbales|Timpani and snare|Taiko and djembe",
      "Salsa grew from Cuban and Puerto Rican music in...|New York City|Vienna|Sydney"
    ], "Match each style or instrument with the place it comes from.", "Picture a map of the Americas and think about what each place is famous for."),

    L("Caribbean music", [
      ["Island sounds", "🏝️", "The Caribbean islands blended African and European music. <b>Ska</b> and <b>reggae</b> come from Jamaica. <b>Calypso</b> and the <b>steelpan</b> come from Trinidad and Tobago. <b>Son</b> and rumba come from Cuba."],
      ["The feel of reggae", "🎸", "Reggae stresses the <b>off-beats</b> with short guitar chords and has a deep, melodic bass line. <b>Ska</b> is faster and came first, in the late 1950s. Reggae followed in the late 1960s."],
      ["The steelpan", "🛢️", "The <b>steelpan</b> (steel drum) is a tuned percussion instrument made from a metal oil drum. Curved areas are hammered into it, and each area plays a different note. It was invented in Trinidad and Tobago in the 1930s and 1940s."]
    ], [
      "Reggae music comes from...|Jamaica|Argentina|Spain",
      "The steelpan was invented in...|Trinidad and Tobago|Jamaica|Brazil",
      "The steelpan is a kind of...|Tuned percussion|Woodwind|Bowed string",
      "Reggae guitar often plays short chords on the...|Off-beats|Downbeat only|Every sixteenth note",
      "Which style came first, in Jamaica in the late 1950s?|Ska|Reggae|Disco",
      "Calypso music comes from...|Trinidad and Tobago|Hungary|Japan",
      "Son and rumba are music styles from...|Cuba|Norway|Egypt",
      "Caribbean music blends African and ___ roots.|European|Viking|Polynesian",
      "On a steelpan, each curved area plays...|A different note|The same note|Only a rhythm"
    ], "Think about which island or sound each word goes with.", "Picture each island on a map and the sound it is famous for."),

    F("Piano key math", [
      ["Keys in an octave", "7 + 5", "In every octave of a piano there are <b>7 white keys</b> and <b>5 black keys</b>. That makes <b>12 keys</b> in all, and 12 half steps."],
      ["Use multiplying", "x", "For many octaves, multiply. Example: 3 octaves have 3 x 7 = 21 white keys, 3 x 5 = 15 black keys and 3 x 12 = 36 keys in all."],
      ["The full piano", "88", "A full piano has 88 keys: 52 white and 36 black. That is 7 full octaves plus a few extra keys at the ends."]
    ], keysQ),

    L("Great Romantic composers", [
      ["Piano poets", "🎹", "<b>Frédéric Chopin</b> (Poland) wrote mostly for piano: nocturnes, waltzes and mazurkas. <b>Franz Liszt</b> (Hungary) was a dazzling pianist. <b>Clara Schumann</b> and <b>Robert Schumann</b> (Germany) wrote songs and piano music."],
      ["Orchestra and ballet", "🎻", "<b>Johannes Brahms</b> (Germany) wrote four symphonies. <b>Pyotr Tchaikovsky</b> (Russia) wrote the ballets <i>Swan Lake</i> and <i>The Nutcracker</i>. <b>Antonín Dvořák</b> (Czech lands) wrote the <i>New World</i> Symphony."],
      ["Opera", "🎭", "<b>Giuseppe Verdi</b> (Italy) wrote <i>Aida</i>. <b>Richard Wagner</b> (Germany) wrote the four-opera cycle <i>The Ring</i>. <b>Giacomo Puccini</b> (Italy) wrote <i>La bohème</i>."]
    ], [
      "Who wrote the ballet The Nutcracker?|Tchaikovsky|Verdi|Chopin",
      "Which composer was from Poland and wrote mostly for piano?|Chopin|Brahms|Wagner",
      "Who wrote the New World Symphony?|Dvořák|Liszt|Puccini",
      "Who wrote the opera Aida?|Verdi|Tchaikovsky|Schumann",
      "Franz Liszt was from...|Hungary|Poland|Italy",
      "Wagner's big opera cycle is called...|The Ring|Swan Lake|The Nutcracker",
      "How many symphonies did Brahms write?|4|9|2",
      "Which composer and pianist was Robert Schumann's wife?|Clara Schumann|Florence Price|Hildegard of Bingen",
      "Swan Lake and The Nutcracker are ballets by a composer from...|Russia|Spain|Norway",
      "Puccini was from...|Italy|Germany|Poland"
    ], "Match each composer with his country or his famous work.", "Many of these composers are linked to one big piece, one instrument or one homeland."),

    L("Women composers through history", [
      ["Early voices", "📜", "<b>Hildegard of Bingen</b> (Germany, 1098–1179) was a nun who wrote beautiful chant melodies. For a long time, many women were not given the same chances to study, perform and publish their music."],
      ["1800s", "🎼", "<b>Clara Schumann</b> was a famous pianist and a composer. <b>Fanny Mendelssohn Hensel</b> wrote hundreds of pieces; her brother was the composer Felix Mendelssohn. <b>Amy Beach</b> (USA) published a symphony, the <i>Gaelic</i> Symphony, in 1896."],
      ["1900s", "🌟", "<b>Florence Price</b> (USA) was the first Black woman to have a symphony played by a major US orchestra (Chicago, 1933). <b>Nadia Boulanger</b> (France) taught many famous composers, including Aaron Copland. <b>Ethel Smyth</b> (England) wrote operas."]
    ], [
      "Who was a nun who wrote chant melodies in the 1100s?|Hildegard of Bingen|Clara Schumann|Florence Price",
      "Fanny Mendelssohn Hensel's brother was the composer...|Felix Mendelssohn|Johannes Brahms|Franz Schubert",
      "Who wrote the Gaelic Symphony?|Amy Beach|Ethel Smyth|Nadia Boulanger",
      "Who was a great teacher of Aaron Copland and many other composers?|Nadia Boulanger|Hildegard of Bingen|Clara Schumann",
      "In 1933 a major US orchestra played a symphony by...|Florence Price|Fanny Hensel|Amy Beach",
      "Clara Schumann was famous as a pianist and also as a...|Composer|Sculptor|Painter",
      "Hildegard of Bingen was from which country?|Germany|Italy|Spain",
      "Ethel Smyth was from which country?|England|Brazil|Japan",
      "Why were fewer women composers published long ago?|They often did not get the same chances to study and publish|They could not hear music|Printing had not been invented"
    ], "Match each woman composer with the fact you learned about her.", "Think about the century and the country she lived in."),

    L("Beaming and grouping", [
      ["Beams show the beat", "♫", "Eighth and sixteenth notes are joined by <b>beams</b> so the reader can see the beat. Notes inside one beat are beamed together. In 4/4 you should still be able to see the middle of the bar."],
      ["Compound time", "6/8", "In compound time the beat is a dotted note that holds <b>three</b> eighths. So eighths are beamed in groups of three: two groups in 6/8, three groups in 9/8 and four groups in 12/8."],
      ["Stem direction", "⬆️⬇️", "Notes <b>below</b> the middle line of the staff get stems that point <b>up</b>. Notes <b>above</b> the middle line get stems that point <b>down</b>. Notes on the middle line can go either way."]
    ], [
      "In 6/8, eighth notes are usually beamed in groups of...|3|2|4",
      "How many groups of three eighths fit in one measure of 9/8?|3|2|4",
      "How many groups of three eighths fit in one measure of 12/8?|4|3|6",
      "In 4/4, a beam usually joins eighths that fall within...|One beat or half a bar|Three whole bars|Any random spot",
      "A note below the middle line of the staff usually has its stem...|Up|Down|Sideways",
      "A note above the middle line of the staff usually has its stem...|Down|Up|Sideways",
      "Beams mainly help the reader see...|The beat groups|The key|The tempo marking",
      "How many sixteenth notes can be beamed in one quarter-note beat?|4|2|8",
      "How many dotted-quarter beats are in a bar of 6/8?|2|3|6"
    ], "Think about what the beat is in this meter and where each beat starts and ends.", "Use what you learned about simple time, compound time and the middle line of the staff."),

    L("Improvisation basics", [
      ["Making it up", "🎷", "<b>Improvising</b> means making up music on the spot. Jazz players improvise solos over a chord progression. Baroque keyboard players and many musicians around the world improvise too."],
      ["Tools for soloing", "🧰", "Players choose notes from the scale or chord, repeat a short <b>motif</b> with changes, leave <b>space</b> (rests) and listen to the others. Beginners often start with the <b>pentatonic scale</b>, because few of its notes clash."],
      ["Jazz words", "🎺", "The <b>head</b> is the main tune at the start and end. <b>Trading fours</b> means taking turns improvising four measures. The <b>rhythm section</b> (drums, bass, piano or guitar) plays the groove, and playing chords behind a soloist is called <b>comping</b>."]
    ], [
      "Improvising means...|Making up music on the spot|Reading every note exactly|Copying a recording",
      "The main tune at the start and end of a jazz piece is the...|Head|Solo|Fill",
      "Trading fours means...|Taking turns improvising four measures|Playing only four notes|Four players solo at once",
      "The players who give the groove and the chords are the...|Rhythm section|Brass section|Audience",
      "Playing chords behind a soloist is called...|Comping|Trilling|Tuning",
      "Which scale is easy for beginners to improvise with?|Pentatonic|Chromatic|Twelve-tone",
      "Leaving space (rests) in a solo is...|Useful and musical|A mistake|Against the rules",
      "Repeating and changing a short idea in a solo uses a...|Motif|Clef|Fermata",
      "Improvisation is found in...|Jazz, blues and many world traditions|Only marching bands|Only lullabies"
    ], "Think about what a player does when there is no written part.", "Use the jazz words you learned: head, rhythm section, comping, trading fours."),

    L("Words and rhythm", [
      ["Poetry has a beat", "📖", "In poems and lyrics, strong and weak syllables make a pattern called <b>meter</b>. An <b>iamb</b> is weak-STRONG (like 'a-BOVE'). A <b>trochee</b> is STRONG-weak (like 'TA-ble')."],
      ["Rhyme schemes", "A B A B", "A <b>rhyme scheme</b> gives each line ending a letter. Lines that rhyme share a letter. <b>ABAB</b>: lines 1 and 3 rhyme, lines 2 and 4 rhyme. <b>AABB</b>: lines 1 and 2 rhyme, lines 3 and 4 rhyme."],
      ["Words on beats", "🎤", "Songwriters put strong syllables on strong beats. Singing <b>one note per syllable</b> is called <b>syllabic</b>. Singing one syllable over <b>many notes</b> is a <b>melisma</b>."]
    ], [
      "An iamb is...|Weak then strong|Strong then weak|Two strong",
      "A trochee is...|Strong then weak|Weak then strong|Silent",
      "The word 'a-BOVE' is an...|Iamb|Trochee|Melisma",
      "The word 'TA-ble' is a...|Trochee|Iamb|Melisma",
      "A poem's lines end in cat, bed, hat, red. The rhyme scheme is...|ABAB|AABB|ABBA",
      "A poem's lines end in sun, fun, moon, soon. The rhyme scheme is...|AABB|ABAB|ABBA",
      "A poem's lines end in light, ring, king, night. The rhyme scheme is...|ABBA|ABAB|AABB",
      "Singing one syllable over many notes is called...|Melisma|Syllabic|Staccato",
      "Singing one note for each syllable is called...|Syllabic|Melisma|Legato",
      "Good songwriters put strong syllables on...|Strong beats|Rests|The softest notes"
    ], "Say the word out loud and feel which part is stronger, or compare the line endings.", "Matching rhymes share a letter. Strong syllables are the bumps in a word."),

    L("Hearing chord quality", [
      ["Colors of chords", "🎨", "Chords have a sound-color. A <b>major</b> triad sounds bright and happy. A <b>minor</b> triad sounds darker and sadder. A <b>diminished</b> triad sounds tense and tight. An <b>augmented</b> triad sounds dreamy and unsettled."],
      ["Seventh chords", "7", "A <b>dominant 7th</b> sounds bluesy and wants to move home. A <b>major 7th</b> sounds smooth and dreamy. A <b>minor 7th</b> sounds mellow."],
      ["Practice tip", "👂", "Play the notes one at a time (an <b>arpeggio</b>) before the whole chord. Compare chords side by side. For example, play C major then C minor and listen for the change in the middle note."]
    ], [
      "A chord that sounds bright and happy is probably...|Major|Minor|Diminished",
      "A chord that sounds darker and sadder is probably...|Minor|Major|Augmented",
      "A chord that sounds tense and tight is probably...|Diminished|Major|Minor",
      "A chord that sounds dreamy and unsettled, with two major thirds stacked, is...|Augmented|Minor|Major",
      "A chord that sounds bluesy and wants to resolve is the...|Dominant 7th|Major 7th|Octave",
      "A chord that sounds smooth and dreamy with a gentle glow is the...|Major 7th|Dominant 7th|Diminished triad",
      "C major and C minor differ in which note?|The third|The root|The fifth",
      "To hear a chord's notes one at a time, play it as an...|Arpeggio|Octave|Glissando",
      "Which interval stays the same between major and minor triads?|The perfect fifth|The third|The seventh"
    ], "Listen in your head for bright, dark, tense or dreamy.", "Compare with the major chord you know best, then ask which note moved."),

    L("Consonance and dissonance", [
      ["Smooth and tense", "😌 😬", "<b>Consonant</b> sounds are stable and smooth. <b>Dissonant</b> sounds feel tense and seem to want to move."],
      ["Which intervals?", "3 5 6 8", "Consonant intervals include the unison, octave, perfect 5th, and major and minor 3rds and 6ths. Dissonant intervals include 2nds, 7ths and the tritone."],
      ["Tension and release", "➡️🏠", "Composers use dissonance to build tension, then <b>resolve</b> it to a consonance, like a question and its answer. Over history, composers used harsher and harsher dissonances."]
    ], [
      "Which interval is consonant?|Major 3rd|Major 7th|Minor 2nd",
      "Which interval is dissonant?|Tritone|Perfect 5th|Perfect octave",
      "Which interval is dissonant?|Major 2nd|Major 6th|Perfect octave",
      "Which interval is consonant?|Perfect 5th|Minor 7th|Tritone",
      "When a dissonance moves to a consonance, we say it...|Resolves|Modulates|Transposes",
      "A consonant sound feels...|Stable and smooth|Tense and unstable|Silent",
      "Dissonance in music is often used to create...|Tension|Silence|Volume",
      "Which interval is the most dissonant?|Minor 2nd|Major 3rd|Perfect 5th",
      "Is a major 6th consonant or dissonant?|Consonant|Dissonant|Neither"
    ], "Ask yourself: does it sound calm and settled, or tense and crunchy?", "Think about which intervals sound smooth together and which sound rough."),

    L("The Picardy third", [
      ["A bright ending", "☀️", "A piece in a minor key can end on a major chord. This is the <b>Picardy third</b>: the third of the last tonic chord is raised by a half step. In C minor, C E♭ G becomes C E G."],
      ["Why use it?", "🌅", "The major chord gave a bright, settled ending. Baroque composers like J.S. Bach used it often at the end of minor pieces."],
      ["Raised 7th", "↗️", "In minor, the 7th degree is often raised to make a <b>leading tone</b>. This makes the V chord major so it pulls strongly to the tonic."]
    ], [
      "The Picardy third is...|A major chord at the end of a minor piece|A minor chord at the end of a major piece|A new time signature",
      "In C minor, the final chord with a Picardy third is...|C E G|C E♭ G|C F A",
      "What changes in a Picardy third compared with the minor tonic chord?|The third is raised a half step|The root is lowered|The fifth is removed",
      "A piece in D minor ends with a Picardy third. The last chord is...|D F♯ A|D F A|D G B",
      "A piece in A minor ends with a Picardy third. Which note is in the last chord instead of C?|C♯|C♭|B",
      "A Picardy third gives the ending a ___ feeling.|Bright|Gloomy|Stormy",
      "Which composer often used the Picardy third in Baroque pieces?|J.S. Bach|Claude Debussy|Duke Ellington",
      "In minor keys the leading tone is made by raising the...|7th degree|3rd degree|1st degree",
      "Why is the raised 7th useful in minor?|It makes the V chord major so it pulls to the tonic|It makes the music faster|It makes the notes louder"
    ], "Compare the last chord with the minor tonic chord. What changed?", "Remember what the third of a chord does to its quality, and what raising it does."),

    L("Counterpoint basics", [
      ["Two lines at once", "🎼🎼", "<b>Counterpoint</b> means combining melodies so each line is interesting alone and they sound good together. The word comes from Latin for 'note against note'."],
      ["First species", "1 : 1", "Teachers start with <b>first species</b>: one new note against each note of a given melody, called the <b>cantus firmus</b> ('fixed song'). Use mostly consonant intervals such as 3rds, 5ths, 6ths and octaves."],
      ["How lines move", "↗️↘️", "Two lines can move in <b>parallel</b> (same direction, same interval), <b>contrary</b> (opposite directions), or <b>oblique</b> (one stays still while the other moves). Avoid long strings of parallel perfect 5ths and octaves."]
    ], [
      "Counterpoint means...|Combining melodies that work together|Playing one melody loudly|Writing only chords",
      "In counterpoint, the 'cantus firmus' is...|The given melody to write against|A fast ornament|A kind of drum",
      "Writing one note against each note of the melody is called...|First species|Third species|Fifth species",
      "Two lines move in opposite directions. This is...|Contrary motion|Parallel motion|Oblique motion",
      "One line stays on the same note while the other moves. This is...|Oblique motion|Contrary motion|Parallel motion",
      "Two lines move up together and keep the same interval. This is...|Parallel motion|Contrary motion|Oblique motion",
      "Which motion helps most to keep two lines independent?|Contrary motion|Parallel motion|Staying still together",
      "Which interval should beginners avoid in a row (parallel)?|Perfect 5ths|Thirds|Sixths",
      "Which interval is a consonance often used in first species?|Major 3rd|Minor 2nd|Tritone"
    ], "Picture two melodies being played together. What are the two lines doing?", "Use the words from the slides: the given melody, one note against one note, and the ways two lines can travel."),

    L("Figured bass", [
      ["Numbers under the bass", "6 5 4", "In the Baroque era, a keyboard player read a bass line with <b>numbers</b> under the notes and filled in the chords. This is <b>figured bass</b>. The cello and keyboard together that play the bass line are the <b>basso continuo</b>."],
      ["Reading the numbers", "5/3 6 6/4", "The numbers are intervals <b>above the bass note</b>. No number means a root position triad. A <b>6</b> means a first inversion. A <b>6/4</b> means a second inversion. A <b>7</b> means a seventh chord."],
      ["Realizing", "🎹", "The player <b>realized</b> the chords, which means they made up the exact notes on the spot from the numbers. So every performance was a little different."]
    ], [
      "A bass line with numbers under it is called...|Figured bass|Free verse|A cadenza",
      "Baroque keyboard players read figured bass to play...|Chords above the bass line|Only melodies|Drum parts",
      "A bass note with no number under it usually means...|A root position triad|A seventh chord|A second inversion chord",
      "A bass note with a 6 under it means...|A first inversion triad|A root position triad|A second inversion triad",
      "A bass note with 6/4 under it means...|A second inversion triad|A first inversion triad|A seventh chord",
      "A bass note with a 7 under it means...|A seventh chord|A first inversion triad|A rest",
      "The numbers in figured bass tell the intervals above...|The bass note|The melody|The drummer",
      "The group that plays the bass line and chords in Baroque music is the...|Basso continuo|Brass choir|Marching band",
      "Making up the chords from the numbers is called...|Realizing the figured bass|Transposing the clef|Tuning the strings"
    ], "Think about Baroque keyboard players: they read numbers, not full chords.", "The numbers describe intervals above the lowest note. Think about what a missing number means."),

    L("The Neapolitan chord", [
      ["The lowered second", "♭II", "The <b>Neapolitan chord</b> is a major triad built on the <b>lowered 2nd degree</b> of the scale. In C major or C minor, it is D♭ F A♭."],
      ["Neapolitan sixth", "N6", "It is usually used in <b>first inversion</b>, so the bass note is the 4th degree (F in C). That is why it is often called the <b>Neapolitan sixth</b>."],
      ["Where it goes", "N6 → V", "It acts as a pre-dominant chord and usually moves to the <b>dominant</b> (V), then to the tonic. It sounds dark and dramatic. It is named after Naples, Italy."]
    ], [
      "In C major, what are the notes of the Neapolitan chord?|D♭ F A♭|D F♯ A|C E G",
      "What scale degree is the root of a Neapolitan chord?|Lowered 2nd|Raised 4th|Lowered 7th",
      "The Neapolitan chord is a ___ triad.|major|minor|diminished",
      "Neapolitan chords are usually used in...|First inversion|Third inversion|Fifth inversion",
      "In first inversion, the bass note of a Neapolitan chord is scale degree number...|4|2|7",
      "The Neapolitan chord usually moves to the...|Dominant (V)|Mediant (iii)|Supertonic (ii)",
      "In A minor, the Neapolitan chord is built on which note?|B♭|B|G♯",
      "In D minor, the root of the Neapolitan chord is...|E♭|E|C♯",
      "The Neapolitan chord is named after...|Naples, Italy|Venice, Italy|Vienna, Austria"
    ], "Find the scale's home note first, then count up to the second note and lower it.", "Lowered means a half step down. Then build a major triad on that note."),

    L("Historically informed performance", [
      ["Old music, old ways", "🕰️", "<b>Historically informed performance</b> tries to play old music the way it may have sounded in its own time, using <b>period instruments</b> such as gut strings, wooden flutes and harpsichords, and older bows and techniques."],
      ["Pitch and style", "415", "Baroque orchestras often tune A to about <b>415 Hz</b>, roughly a half step lower than today's 440 Hz. Players use less <b>vibrato</b> (the wobble in a sound) and add their own ornaments."],
      ["Why do it?", "🔍", "Players study old books, scores and instruments. Instruments of the time are softer and have a different <b>timbre</b>, which changes the balance. There is no single right way, but it is one way to hear a piece fresh."]
    ], [
      "HIP stands for...|Historically informed performance|High-pitched piano|Home instrument practice",
      "Instruments from the composer's own time are called...|Period instruments|Electric instruments|Toy instruments",
      "Baroque string instruments were often strung with...|Gut|Plastic|Steel only",
      "A Baroque orchestra often tuned A to about...|415 Hz|880 Hz|220 Hz",
      "415 Hz is about ___ lower than 440 Hz.|A half step|An octave|A fifth",
      "Early-music players often use ___ vibrato.|Less|Much more|Constant fast",
      "A harpsichord is an example of...|A period instrument|A modern instrument|A drum",
      "One goal of historically informed performance is to...|Play music as it may have sounded in its time|Make everything louder|Rewrite the notes",
      "Period instruments often sound ___ than modern ones.|Softer|Much louder|Electronic"
    ], "Think about 'history': what did musicians have back then?", "Think about what was available long ago, and what a modern concert hall adds.")
  ];
  l16.push(
    MIX("Mixed practice", l16.slice(0, 9)),
    MIX("Level 16 Challenge", l16.slice(9))
  );


  // ---------- helpers for level 17 ----------
  const Lq = (strs, nudge, clue) => {
    const items = strs.map(I);
    return () => {
      const [q, a, w] = pick(items);
      const others = items.filter(x => x[1] !== a);
      const ex = pick(others.filter(x => !nz(x[0]).includes(nz(a))).concat(others));
      return { text: q, choices: shuf([a, ...shuf(w.filter(x => x !== a)).slice(0, 2)]).map(A), answer: A(a), hints: [nudge, clue, `Example: ${ex[0]} The answer is "${A(ex[1])}". Now do yours.`] };
    };
  };
  const beatsQ = () => {
    const base = pick([220, 262, 330, 440, 523, 660]), d = ri(1, 9), t = ri(0, 1);
    const ex = pick([300, 400, 500]), exd = pick([2, 3, 5]);
    if (t === 0) return {
      text: `Two notes sound together: ${base} Hz and ${base + d} Hz. How many beats (wobbles) per second do you hear?`, answer: d,
      hints: [
        "Beats come from the two frequencies being a little different.",
        "Find how far apart the two frequencies are. Take the bigger number and subtract the smaller one.",
        `Example: ${ex} Hz and ${ex + exd} Hz are ${exd} apart, so you hear ${exd} beats per second. Now do yours.`
      ]
    };
    return {
      text: `A tuning note is ${base} Hz. Another string is a little higher, and together they make ${d} beats per second. What is the frequency of the higher string in Hz?`, answer: base + d,
      hints: [
        "The beats per second tell you how far apart the two frequencies are.",
        "The higher string is the lower frequency plus the number of beats per second.",
        `Example: if one note is ${ex} Hz and the beats are ${exd} per second, the higher note is ${ex} + ${exd} = ${ex + exd} Hz. Now do yours.`
      ]
    };
  };
  const PCN = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  const pcQ = () => {
    const t = ri(0, 2), n = ri(1, 11);
    const n2 = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(x => x !== n)), k2 = ri(2, 7);
    if (t === 0) return {
      text: `Using C = 0, C♯ = 1, D = 2 and so on up to B = 11, what number is the note ${PCN[n]}?`, answer: n,
      hints: [
        "Count the half steps up from C. C itself is 0.",
        "Go up one number for every half step, including the black keys (sharps).",
        `Example: the note ${PCN[n2]} is number ${n2}, because it is ${n2} half steps above C. Now do yours.`
      ]
    };
    if (t === 1) {
      const wr = shuf(PCN.filter((x, i) => i !== n)).slice(0, 2);
      return {
        text: `Using C = 0, C♯ = 1, D = 2 and so on, which note is number ${n}?`, choices: shuf([PCN[n], ...wr]).map(A), answer: A(PCN[n]),
        hints: [
          "Count up from C = 0, one half step at a time.",
          "Remember the black keys (sharps) have numbers too.",
          `Example: number ${n2} is ${PCN[n2]}, found by counting ${n2} half steps up from C. Now do yours.`
        ]
      };
    }
    const k = ri(2, 11), ans = PCN[(n + k) % 12], wr = shuf(PCN.filter((x, i) => i !== (n + k) % 12 && i !== n)).slice(0, 2);
    return {
      text: `Start on ${PCN[n]} (number ${n}). Go up ${k} half steps. Which note do you land on? (Wrap around after 11.)`, choices: shuf([ans, ...wr]).map(A), answer: A(ans),
      hints: [
        "Add the number of half steps to the starting number.",
        "If your total is 12 or more, subtract 12 to wrap around, then find the note with that number.",
        `Example: start on ${PCN[n2]} (${n2}) and go up ${k2}: ${n2} + ${k2} = ${n2 + k2}${n2 + k2 >= 12 ? ", minus 12 = " + (n2 + k2 - 12) : ""}, which is ${PCN[(n2 + k2) % 12]}. Now do yours.`
      ]
    };
  };
  const polyQ = (() => {
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const defs = Lq([
      "Two different meters at the same time is...|Polymeter|Metric modulation|Rubato",
      "A change of tempo that uses a note value from the old tempo as the new beat is called...|Metric modulation|Polymeter|Ritardando",
      "Which math idea tells when two meters meet again?|Least common multiple|Square root|Percentages",
      "In polymeter, the bar lines of two parts...|Do not line up until they meet again|Always line up|Disappear",
      "In metric modulation, what stays connected between the old and new tempo?|A shared note value|The key signature|The instruments"
    ], "Think about the two new terms from the slides.", "One is about two meters sounding together; the other is about changing the tempo.");
    return () => {
      if (Math.random() < 0.35) return defs();
      const pairs = [[3, 4], [2, 3], [3, 5], [4, 5], [2, 5], [4, 6], [6, 8], [3, 7], [5, 6]];
      const [a, b] = pick(pairs), l = a * b / gcd(a, b), ex = pick([[2, 3], [3, 4], [2, 5]].filter(p => p[0] !== a || p[1] !== b));
      return {
        text: `One part counts in groups of ${a} beats and another part counts in groups of ${b} beats. After how many beats do the groups start together again?`, answer: l,
        hints: [
          "Count out the beats of each pattern and look for the first beat where both patterns begin a new group.",
          "List the multiples of each number. The smallest number in both lists is the answer.",
          `Example: groups of ${ex[0]} and ${ex[1]} meet after ${ex[0] * ex[1] / gcd(ex[0], ex[1])} beats. Now do yours.`
        ]
      };
    };
  })();

  // ======================= LEVEL 17 =======================
  const l17 = [
    L("Folk instruments", [
      ["Music of the people", "🪕", "<b>Folk music</b> is passed down by ear in a community. Folk instruments are often simple and easy to carry. The <b>banjo</b> has a round body covered with a skin or plastic head. A <b>fiddle</b> is a violin played in a folk style. The <b>dulcimer</b> has strings stretched over a thin wooden body."],
      ["From around the world", "🪗", "The <b>accordion</b> uses bellows and reeds. <b>Bagpipes</b> have an air bag and drone pipes. The <b>ukulele</b> is a small four-string instrument from Hawaii. The <b>harmonica</b> is a mouth organ you play by blowing and drawing air."],
      ["Learning by ear", "👂", "Folk songs are usually learned by listening and singing, and every singer may change them a little. That is why one song can have many versions."]
    ], [
      "Which small four-string folk instrument is from Hawaii?|Ukulele|Banjo|Bagpipes",
      "The banjo's round body is covered with a...|Skin or plastic head|Metal reed|Wooden bellows",
      "Which instrument has an air bag and drone pipes?|Bagpipes|Accordion|Harmonica",
      "Which instrument uses bellows and reeds?|Accordion|Fiddle|Dulcimer",
      "A fiddle is played like a...|Violin|Flute|Trumpet",
      "A harmonica is played by...|Blowing and drawing air|Plucking|Hitting with sticks",
      "Folk songs are usually passed down...|By ear|Only by printed score|By computer files",
      "Why can one folk song have many versions?|Every singer may change it a little|Nobody can sing it|It has no tune",
      "A lap instrument with strings over a thin wooden body is the (Appalachian)...|Dulcimer|Tuba|Timpani"
    ], "Think about how each instrument makes its sound and where it is from.", "Picture the instrument: does it have a bag, bellows, a round head or a thin body?"),

    L("Reading guitar tablature", [
      ["Six lines", "6 lines", "<b>Tablature</b> (tab) is a way of writing music for guitar. It has <b>six lines</b>, one for each string. The bottom line is the thickest, lowest-sounding string. The top line is the thinnest, highest string."],
      ["Numbers are frets", "0 3 5", "A number tells which <b>fret</b> to press. <b>0</b> means play the open string. <b>3</b> means press that string at the 3rd fret. Numbers stacked in a column are played together as a chord."],
      ["Chord diagrams and capos", "⚫", "A <b>chord diagram</b> shows the neck standing up: vertical lines are strings and horizontal lines are frets. Dots show where to put your fingers, X means do not play that string, and O means an open string. A <b>capo</b> clamps across the neck and raises every string by the same number of half steps."]
    ], [
      "How many lines does a guitar tab have?|6|5|4",
      "In tab, the number 0 means...|Play the open string|Rest|Press the 10th fret",
      "In tab, the number 5 on a line means...|Press that string at the 5th fret|Play the 5th string|Play it 5 times",
      "In tab, the bottom line is the...|Lowest-sounding string|Highest string|Capo",
      "Numbers stacked in a column in tab are played...|At the same time|One after another slowly|Never",
      "In a chord diagram, an X above a string means...|Do not play that string|Press it hard|Play it twice",
      "In a chord diagram, a dot shows...|Where to put a finger|A rest|The tempo",
      "A capo placed at the 2nd fret raises all open strings by...|2 half steps|2 octaves|1 half step",
      "Each fret you move up on a guitar string raises the pitch by...|One half step|One whole step|One octave"
    ], "Picture a guitar neck: strings run along it and frets cross it.", "In tab, lines are strings and numbers are frets."),

    L("Chamber music", [
      ["Music for small groups", "🎻", "<b>Chamber music</b> is written for a small group with one player on each part. It was first played in a room (a chamber) rather than a big hall. There is usually no conductor."],
      ["Famous groups", "4 3 5", "A <b>string quartet</b> is two violins, a viola and a cello. A <b>piano trio</b> is violin, cello and piano. A <b>woodwind quintet</b> is flute, oboe, clarinet, bassoon and horn. A <b>brass quintet</b> has two trumpets, horn, trombone and tuba."],
      ["Names by number", "1 2 3 4", "Solo (1), duo (2), trio (3), quartet (4), quintet (5), sextet (6), septet (7), octet (8). <b>Haydn</b> is called the father of the string quartet."]
    ], [
      "A string quartet has how many players?|4|3|5",
      "A string quartet is two violins, a cello and a...|Viola|Flute|Piano",
      "A piano trio is violin, cello and...|Piano|Viola|Trumpet",
      "A woodwind quintet includes horn, flute, oboe, clarinet and...|Bassoon|Trombone|Violin",
      "A group of six players is a...|Sextet|Quintet|Octet",
      "A group of eight players is an...|Octet|Septet|Quartet",
      "Chamber music usually has...|One player per part and no conductor|A hundred players and a conductor|Only drums",
      "Which composer is called the father of the string quartet?|Haydn|Wagner|Verdi",
      "A brass quintet has two trumpets, horn, trombone and...|Tuba|Flute|Cello"
    ], "Count the players, or think about which instruments belong in the group.", "Use the number words: trio, quartet, quintet, sextet, septet, octet."),

    L("Rock and roll history", [
      ["The 1950s", "🎸", "<b>Rock and roll</b> grew in the 1950s from blues, gospel, country and rhythm and blues. Artists like Chuck Berry and Elvis Presley helped make it popular, with electric guitar and a strong backbeat."],
      ["The 1960s and 1970s", "📻", "In the 1960s, groups from Britain such as The Beatles led the 'British Invasion'. Rock split into many styles, such as folk rock, hard rock and punk. Disco dance music grew popular in the 1970s."],
      ["The 1980s and later", "📺", "In the 1980s, music videos (MTV started in 1981) and synthesizers changed pop. Hip-hop and electronic dance music grew bigger in the 1990s and 2000s, and now streaming lets people hear almost any song."]
    ], [
      "Rock and roll grew in the...|1950s|1850s|1990s",
      "Rock and roll grew from blues, gospel, country and...|Rhythm and blues|Opera|Chant",
      "The 1960s 'British Invasion' included the group...|The Beatles|Louis Armstrong|Duke Ellington",
      "Which dance-music style grew popular in the 1970s?|Disco|Baroque|Ragtime",
      "MTV, a music-video channel, started in...|1981|1951|2011",
      "The basic rock sound has a strong...|Backbeat|Chant|Drone",
      "Which instrument became a symbol of rock?|Electric guitar|Harpsichord|Oboe",
      "Which change lets people hear almost any song at any time today?|Streaming|Vinyl only|Live radio only",
      "Which artist helped make rock and roll popular in the 1950s?|Elvis Presley|Johann Strauss|Antonio Vivaldi"
    ], "Put the event on a timeline: which decade does it belong to?", "Think about what music technology and styles were new in each decade."),

    L("Music of East Asia", [
      ["Pentatonic roots", "🎎", "Much traditional music in China, Japan and Korea uses <b>pentatonic</b> (five-note) scales, but each country has its own sound and instruments."],
      ["Instruments", "🪕", "China: the <b>erhu</b> (a two-string bowed fiddle), the <b>guzheng</b> (a long plucked zither) and the <b>pipa</b> (a pear-shaped lute). Japan: the <b>koto</b> (a long zither), the <b>shakuhachi</b> (a bamboo flute), the <b>shamisen</b> (three strings) and <b>taiko</b> (big drums). Korea: the <b>gayageum</b> (a zither)."],
      ["Space and nature", "🥁", "<b>Taiko</b> drumming is powerful and athletic. Traditional music often follows nature and poems, and silence and space matter as much as the notes."]
    ], [
      "Which is a Chinese two-string bowed instrument?|Erhu|Koto|Taiko",
      "The koto is a Japanese...|Long zither|Bowed fiddle|Trumpet",
      "The shakuhachi is a...|Bamboo flute|Drum|Harp",
      "The shamisen has how many strings?|3|13|6",
      "Taiko are Japanese...|Big drums|Flutes|Zithers",
      "The pipa is a Chinese...|Pear-shaped lute|Wind instrument|Drum",
      "A pentatonic scale has how many notes?|5|7|12",
      "The gayageum is a traditional instrument from...|Korea|Brazil|Ireland",
      "Which is a large plucked Chinese zither?|Guzheng|Shakuhachi|Bandoneón"
    ], "Match each instrument with its country and how it makes sound.", "Think: bowed, plucked, blown or struck?"),

    L("Music of Africa", [
      ["A huge continent", "🌍", "Africa has hundreds of music traditions. Many use <b>call and response</b>, where a leader sings and a group answers, and layers of different rhythms at once (<b>polyrhythm</b>). Music is tied to dance, stories and community events."],
      ["Instruments", "🪘", "The <b>djembe</b> is a goblet-shaped hand drum from West Africa. The <b>kora</b> is a 21-string harp-lute from West Africa. The <b>mbira</b> (thumb piano) has metal tines plucked with the thumbs. The <b>balafon</b> is a wooden xylophone. A <b>talking drum</b> changes pitch when the player squeezes its cords."],
      ["Roots and growth", "🎶", "African rhythms and songs helped shape blues, jazz, salsa and reggae. <b>Highlife</b> (Ghana and Nigeria) and <b>Afrobeat</b> (Nigeria) mix African rhythms with jazz and funk."]
    ], [
      "Call and response means...|A leader sings and a group answers|Everyone sings at once|Only drums play",
      "The djembe is a...|Goblet-shaped hand drum|Bowed string instrument|Brass instrument",
      "The kora has about how many strings?|21|3|88",
      "The mbira is also called a...|Thumb piano|Bass drum|Pan flute",
      "A balafon is a wooden...|Xylophone|Trumpet|Violin",
      "A talking drum changes pitch when the player...|Squeezes its cords|Blows into it|Plugs it in",
      "Layering different rhythms at once is called...|Polyrhythm|Monophony|Pedal point",
      "Highlife music comes from...|West Africa|Iceland|Japan",
      "African rhythms helped shape which American styles?|Blues and jazz|Opera only|Baroque suites"
    ], "Think about how the instrument is played or how the singers take turns.", "Many of these instruments are drums, plucked strings or tuned wooden bars."),

    L("Romantic piano pieces", [
      ["Short and full of feeling", "🎹", "Romantic composers loved short piano pieces. A <b>nocturne</b> ('night piece') is dreamy and songlike. An <b>étude</b> is a 'study' that practises a skill but can also be beautiful. A <b>waltz</b> is in 3/4 time."],
      ["More types", "📜", "A <b>ballade</b> tells a story in music. A <b>prelude</b> is a short opening piece. An <b>impromptu</b> sounds as if it were improvised. A <b>mazurka</b> is a Polish dance in 3/4. A <b>rhapsody</b> is free, with many moods."],
      ["Famous names", "⭐", "Chopin wrote nocturnes, études, waltzes, mazurkas and ballades. Liszt wrote the <i>Hungarian Rhapsodies</i>. Schumann wrote <i>Scenes from Childhood</i>."]
    ], [
      "A nocturne is a...|Dreamy 'night piece'|Fast dance in 6/8|Opera",
      "An étude is a...|Study piece that practises a skill|Hymn|March",
      "A waltz is in which time signature?|3/4|4/4|2/2",
      "A piece that tells a story in music might be a...|Ballade|Étude|Waltz",
      "A mazurka is a dance from...|Poland|Brazil|Jamaica",
      "Which composer wrote the Hungarian Rhapsodies?|Liszt|Chopin|Brahms",
      "A short opening piece is a...|Prelude|Cadenza|Finale",
      "An impromptu sounds as if it were...|Improvised on the spot|Played backward|Copied",
      "Which composer wrote Scenes from Childhood?|Schumann|Verdi|Vivaldi"
    ], "Match the piece type with its main feeling or purpose.", "Look at the word: 'night', 'study', 'story' or 'opening'."),

    L("Mixing and mastering", [
      ["Tracks and mixing", "🎚️", "In a recording, each instrument or voice is on its own <b>track</b>. <b>Mixing</b> balances the tracks: how loud each one is, where it sits left to right (<b>panning</b>), and its tone."],
      ["Studio tools", "🎛️", "<b>EQ</b> (equalizer) turns certain frequencies up or down, like bass or treble. <b>Compression</b> brings loud and soft parts closer in volume. <b>Reverb</b> adds the sound of a space."],
      ["Mastering", "💿", "<b>Mastering</b> is the last step: polishing the finished mix so a whole album sounds balanced and works on many speakers and headphones."]
    ], [
      "Putting a sound toward the left or right is called...|Panning|Mastering|Looping",
      "Balancing all the tracks is called...|Mixing|Mastering|Tuning",
      "The last polishing step of a recording is...|Mastering|Overdubbing|Rehearsing",
      "An EQ changes how much of each...|Frequency range is heard|Page is printed|Beat is counted",
      "Compression makes the difference between loud and soft parts...|Smaller|Bigger|Silent",
      "Reverb adds the sound of a...|Space or room|Drum|Key change",
      "Each instrument recorded on its own is on its own...|Track|Clef|Staff",
      "Turning up the bass with EQ means boosting the...|Low frequencies|High frequencies|Key signature",
      "Why master an album?|So the songs sound balanced on many speakers|To change the notes|To add lyrics"
    ], "Think about a studio engineer working with sliders and knobs.", "Mixing works on the tracks; mastering works on the finished whole."),

    L("Great composers of the 1900s", [
      ["Early 1900s", "🎼", "<b>Igor Stravinsky</b> (Russia) wrote <i>The Rite of Spring</i> (1913). <b>Claude Debussy</b> and <b>Maurice Ravel</b> (France) painted with sound: Debussy wrote <i>Clair de lune</i> and Ravel wrote <i>Boléro</i>. <b>Béla Bartók</b> (Hungary) collected folk songs."],
      ["Americans", "🗽", "<b>George Gershwin</b> mixed jazz and classical music in <i>Rhapsody in Blue</i>. <b>Aaron Copland</b> wrote <i>Appalachian Spring</i>. <b>Leonard Bernstein</b> wrote <i>West Side Story</i>."],
      ["More names", "🎶", "<b>Sergei Prokofiev</b> (Russia) wrote <i>Peter and the Wolf</i>, a story for narrator and orchestra. <b>Arnold Schoenberg</b> (Austria) invented the twelve-tone method."]
    ], [
      "Who wrote The Rite of Spring?|Stravinsky|Copland|Ravel",
      "Who wrote Clair de lune?|Debussy|Gershwin|Prokofiev",
      "Who wrote Boléro?|Ravel|Debussy|Bartók",
      "Who wrote Rhapsody in Blue?|Gershwin|Bernstein|Schoenberg",
      "Who wrote Appalachian Spring?|Copland|Stravinsky|Prokofiev",
      "Who wrote Peter and the Wolf?|Prokofiev|Ravel|Bartók",
      "Who wrote West Side Story?|Bernstein|Copland|Ravel",
      "Which Hungarian composer collected folk songs?|Bartók|Debussy|Gershwin",
      "Who invented the twelve-tone method?|Schoenberg|Gershwin|Debussy"
    ], "Match the piece with the composer, or the composer with a country.", "Think of each composer's most famous work."),

    L("Tonal, modal and atonal", [
      ["Tonal", "🏠", "<b>Tonal</b> music has a home note (the tonic) and a key. Chords pull toward the tonic. Most Classical, Romantic and pop music is tonal."],
      ["Modal", "🎼", "<b>Modal</b> music is built on modes (like Dorian or Mixolydian) and does not use the usual major and minor chord pulls. Chant, and some folk and jazz music, is modal."],
      ["Atonal and polytonal", "❓", "<b>Atonal</b> music avoids any home note and treats all 12 notes as equal, like some music by Schoenberg. <b>Polytonal</b> music uses two or more keys at the same time."]
    ], [
      "Music with a clear home note and key is...|Tonal|Atonal|Silent",
      "Music that avoids any home note is...|Atonal|Tonal|Modal",
      "Music built on modes like Dorian is...|Modal|Atonal|Twelve-bar",
      "Using two or more keys at the same time is...|Polytonal|Atonal|Tonal",
      "Most pop songs are...|Tonal|Atonal|Silent",
      "Medieval chant is mostly...|Modal|Atonal|Electronic",
      "In atonal music, the 12 notes are treated as...|Equal|Major and minor|Silent",
      "Which composer is linked with atonal music?|Schoenberg|Vivaldi|Handel",
      "Which kind of music has a tonic that chords pull toward?|Tonal|Atonal|Polyrhythmic"
    ], "Ask: is there a home note, a mode, no home at all, or several keys?", "Look at the prefix of the word: a-, poly- or none."),

    L("Inside an opera", [
      ["Words and music", "🎭", "An <b>opera</b> is a drama that is sung, with an orchestra. The words are the <b>libretto</b>, written by a <b>librettist</b>. The music is written by the composer."],
      ["The parts", "🎤", "A <b>recitative</b> is sung like speech to move the story along. An <b>aria</b> is a song for one singer that shows feeling. An <b>overture</b> is the orchestra piece before the opera starts. The <b>chorus</b> is a large choir."],
      ["Kinds of opera", "🏛️", "<b>Opera seria</b> is serious. <b>Opera buffa</b> is comic. A <b>soprano</b> is the highest female voice and a <b>tenor</b> is the high male voice. Mozart's <i>The Magic Flute</i> is sung in German."]
    ], [
      "The words of an opera are called the...|Libretto|Overture|Aria",
      "A song for one singer that shows feeling is an...|Aria|Overture|Recitative",
      "Music sung like speech to move the story along is a...|Recitative|Aria|Chorus",
      "The orchestra piece before the opera starts is the...|Overture|Libretto|Aria",
      "Opera buffa is...|Comic opera|Serious opera|Ballet",
      "Opera seria is...|Serious opera|Comic opera|Marching music",
      "Who writes the libretto?|The librettist|The conductor|The stage manager",
      "A large choir in an opera is the...|Chorus|Aria|Overture",
      "Mozart's The Magic Flute is sung in...|German|French|Japanese"
    ], "Think about who does what in an opera: singers, orchestra, writer.", "Ask yourself if it is words, a solo song, speech-like singing, or an opening."),

    L("Four-part harmony rules", [
      ["SATB", "S A T B", "Four-part writing uses <b>soprano, alto, tenor and bass</b>. The soprano and bass are the <b>outer voices</b>. Keep the upper three voices fairly close together."],
      ["The rules", "⚖️", "Avoid <b>parallel 5ths and octaves</b> between any two voices. Do not <b>double the leading tone</b>, because it wants to rise. Usually double the root of a triad. Keep voices from crossing."],
      ["Smooth motion", "〰️", "Move each voice by the <b>smallest steps</b> you can. If a note is in both chords, keep it. The leading tone usually resolves up a half step to the tonic."]
    ], [
      "SATB stands for soprano, alto, tenor and...|Bass|Baritone|Banjo",
      "Which voice is the highest in SATB?|Soprano|Alto|Tenor",
      "Which voice is the lowest in SATB?|Bass|Tenor|Alto",
      "Which note should you NOT double in a triad?|The leading tone|The root|The bass note",
      "Which note do you usually double in a root-position triad?|The root|The leading tone|The third",
      "Parallel perfect 5ths and octaves between voices are...|Avoided|Required|Used in every bar",
      "The leading tone usually resolves...|Up a half step to the tonic|Down a whole step|By a leap down a fifth",
      "To keep motion smooth, voices should move by...|Small steps|Big leaps|Random jumps",
      "The soprano and bass are called the...|Outer voices|Inner voices|Hidden voices"
    ], "Think about what keeps four lines independent and smooth.", "Remember the tendencies of the leading tone and the rules about doubling."),

    F("Beats and interference", [
      ["Two close notes", "〰️", "When two notes of almost the same pitch sound together, the sound gets louder and softer in a wobble. These wobbles are called <b>beats</b>."],
      ["How many?", "f₂ − f₁", "The number of beats each second equals the <b>difference</b> between the two frequencies. 440 Hz and 444 Hz make 4 beats per second."],
      ["Tuning with beats", "🎻", "Players tune by listening to the beats. When the wobble slows down and disappears, the two notes match. A faster wobble means the notes are farther apart."]
    ], beatsQ),

    F("Notes as numbers", [
      ["Pitch classes", "0 – 11", "Musicians sometimes number the 12 notes: C = 0, C♯ = 1, D = 2, D♯ = 3, E = 4, F = 5, F♯ = 6, G = 7, G♯ = 8, A = 9, A♯ = 10, B = 11."],
      ["Clock math", "🕛", "The numbers go around like a clock: after 11 comes 0 again. Going up 3 half steps from A (9) gives 12, which wraps back to 0, the note C."],
      ["Transposing", "+ n", "To transpose up by n half steps, add n. If the total is 12 or more, subtract 12. Example: E (4) up 9 half steps is 13, minus 12 = 1, which is C♯."]
    ], pcQ),

    F("Polymeter and metric modulation", [
      ["Two meters at once", "3 : 4", "<b>Polymeter</b> means two or more different meters sound at the same time, for example one part counting groups of 3 and another counting groups of 4. Their bar lines do not match until the groups meet again."],
      ["When do they meet?", "12", "They meet again after the <b>least common multiple</b>. Groups of 3 and groups of 4 start together again after 12 beats (4 bars of 3 and 3 bars of 4)."],
      ["Metric modulation", "♩ = ♪", "<b>Metric modulation</b> changes tempo by turning a note value of the old tempo into the beat of the new one. The pulse keeps going, but the feel changes."]
    ], polyQ),

    L("Fugue anatomy", [
      ["The subject", "🔁", "A <b>fugue</b> starts with one voice alone playing the main melody, the <b>subject</b>. A second voice enters with the <b>answer</b>, the same melody on another pitch (usually a 5th higher), while the first voice plays a <b>countersubject</b>."],
      ["Sections", "📑", "The first part, where each voice enters in turn, is the <b>exposition</b>. Linking sections that visit new keys are <b>episodes</b>. When entries overlap closely it is called <b>stretto</b>."],
      ["Bach", "👑", "<b>J.S. Bach</b> was the master of the fugue. His <i>Well-Tempered Clavier</i> has preludes and fugues in all 24 major and minor keys. Fugues are <b>polyphonic</b>."]
    ], [
      "The main melody of a fugue is the...|Subject|Episode|Coda",
      "The second voice that enters with the melody on a new pitch plays the...|Answer|Stretto|Cadenza",
      "The opening section of a fugue, where each voice enters, is the...|Exposition|Recapitulation|Development",
      "Linking sections between entries of the subject are called...|Episodes|Stretto|Chorales",
      "Entries of the subject that overlap closely are called...|Stretto|Exposition|Aria",
      "An answer usually enters about a ___ higher.|Fifth|Second|Tritone",
      "A fugue is an example of which texture?|Polyphonic|Monophonic|Homophonic",
      "Which composer is the master of the fugue?|J.S. Bach|Chopin|Gershwin",
      "A line that goes along with the subject after it first appears is the...|Countersubject|Libretto|Downbeat"
    ], "Think about the order: first one voice, then the others join in.", "Match each term with its job: first melody, copy, linking part, overlap."),

    L("Experimental music", [
      ["Breaking the rules", "🧪", "In the 1900s some composers explored new sounds. <b>John Cage</b> (USA) wrote <i>4′33″</i>, in which the performer plays no notes so the audience listens to the sounds of the room. He also used <b>chance</b> (like rolling dice) to choose notes. This is <b>aleatoric</b> music."],
      ["New sounds", "🔧", "Cage's <b>prepared piano</b> has objects like screws and rubber placed between the strings. <b>Musique concrète</b> (France, 1940s) uses recorded real-world sounds cut and looped on tape. <b>Electronic music</b> makes sounds with circuits and computers."],
      ["Why?", "💡", "Experimental composers ask: what counts as music? Many later sounds in film and pop, such as tape loops and synthesizers, came from these ideas."]
    ], [
      "John Cage's 4′33″ is a piece in which the performer...|Plays no notes|Plays very fast|Sings only",
      "Choosing notes by chance, like rolling dice, is...|Aleatoric music|Tonal music|Chant",
      "A piano with objects placed between the strings is a...|Prepared piano|Player piano|Toy piano",
      "Music made from recorded real-world sounds on tape is...|Musique concrète|Baroque music|Opera",
      "Musique concrète began in which country?|France|Brazil|Egypt",
      "John Cage was from...|The USA|Austria|Hungary",
      "Electronic music creates sounds with...|Circuits and computers|Only wooden instruments|Only voices",
      "What question do experimental composers ask?|What counts as music?|How loud is a drum?|Which key is best?",
      "In 4′33″ the audience listens to...|The sounds of the room|A hidden recording|A choir"
    ], "Think about composers who wanted to try something nobody had done.", "Match each term with the new idea it describes: chance, objects, tape or circuits."),

    L("Augmented sixth chords", [
      ["A strong interval", "♭6 · ♯4", "An <b>augmented sixth chord</b> has an augmented 6th between the lowered 6th degree and the raised 4th degree. In C: A♭ and F♯. They <b>resolve outward</b> to an octave on G, the dominant note."],
      ["Three flavors", "It. Fr. Ger.", "<b>Italian</b> 6th: three notes (A♭ C F♯). <b>French</b> 6th: four notes, adds D (A♭ C D F♯). <b>German</b> 6th: four notes, adds E♭ (A♭ C E♭ F♯)."],
      ["Where it goes", "→ V", "These are pre-dominant chords. They usually move to the dominant (V). They sound intense and are common in Classical and Romantic music."]
    ], [
      "In C major, the augmented sixth interval is between A♭ and...|F♯|F|G",
      "Augmented sixth chords usually resolve to the...|Dominant|Subdominant|Submediant",
      "Which type of augmented sixth chord has just three notes?|Italian|French|German",
      "In C, which type of augmented sixth chord is A♭ C E♭ F♯?|German|Italian|French",
      "In C, which type of augmented sixth chord is A♭ C D F♯?|French|German|Italian",
      "In the augmented sixth interval the two notes move...|Outward to an octave|Inward to a unison|Both up a third",
      "An augmented sixth chord uses the lowered ___ scale degree.|6th|2nd|3rd",
      "An augmented sixth chord uses the raised ___ scale degree.|4th|5th|2nd",
      "Augmented sixth chords are common in the...|Classical and Romantic eras|Medieval chant era|Renaissance madrigals"
    ], "Build the chord from the lowered sixth and raised fourth, then look at what is added.", "Italian, French and German differ by what extra notes they add.")
  ];
  l17.push(
    MIX("Mixed practice", l17.slice(0, 9)),
    MIX("Level 17 Challenge", l17.slice(9))
  );


  // ---------- helpers for level 18 ----------
  const msQ = () => {
    const bpm = pick([60, 75, 80, 100, 120, 150, 200, 240]), nt = pick([["quarter", 1], ["eighth", 0.5], ["half", 2], ["whole", 4]]);
    const eb = pick([60, 120, 100].filter(x => x !== bpm)), en = pick([["quarter", 1], ["eighth", 0.5], ["half", 2]]);
    return {
      text: `The tempo is ${bpm} BPM and the beat is a quarter note. How many milliseconds does one ${nt[0]} note last?`, answer: 60000 / bpm * nt[1],
      hints: [
        "First find how long one beat (one quarter note) lasts in milliseconds.",
        `One minute is 60,000 milliseconds. Divide 60,000 by the BPM to get one quarter note. Then use the note value: an eighth is half a quarter, a half note is two quarters, a whole note is four quarters.`,
        `Example: at ${eb} BPM a quarter note lasts 60,000 ÷ ${eb} = ${60000 / eb} ms, so one ${en[0]} note lasts ${60000 / eb * en[1]} ms. Now do yours.`
      ]
    };
  };
  const midiQ = () => {
    const t = ri(0, 3), k = ri(1, 24), n = ri(36, 90), a = ri(40, 80), d = ri(2, 30);
    const ek = pick([5, 7, 12]);
    const hints = (what, exTxt) => [
      "Each half step changes the MIDI number by exactly 1.",
      what,
      exTxt + " Now do yours."
    ];
    if (t === 0) return { text: `Middle C is MIDI note 60. What is the MIDI number of the note ${k} half steps above middle C?`, answer: 60 + k, hints: hints("Going up means adding. Start at 60 and add the number of half steps.", `Example: 5 half steps above middle C is 60 + 5 = 65.`) };
    if (t === 1) return { text: `Middle C is MIDI note 60. What is the MIDI number of the note ${k} half steps below middle C?`, answer: 60 - k, hints: hints("Going down means subtracting. Start at 60 and take away the number of half steps.", `Example: 5 half steps below middle C is 60 - 5 = 55.`) };
    if (t === 2) { const up = Math.random() < 0.5; return { text: `A note has MIDI number ${n}. What is the MIDI number of the note one octave ${up ? "higher" : "lower"}?`, answer: up ? n + 12 : n - 12, hints: hints("An octave is 12 half steps.", `Example: one octave ${up ? "higher" : "lower"} than ${ek + 40} is ${up ? ek + 52 : ek + 28}.`) }; }
    return { text: `One note is MIDI number ${a} and another is MIDI number ${a + d}. How many half steps apart are they?`, answer: d, hints: hints("Find the difference between the two numbers.", `Example: MIDI notes 60 and ${60 + ek} are ${ek} half steps apart.`) };
  };
  const rowQ = () => {
    for (;;) {
      const row = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).slice(0, 5), t = ri(0, 2), o = ri(2, 5), k = ri(2, 10);
      const f = row[0], ord = ["", "1st", "2nd", "3rd", "4th", "5th"][o];
      let ans, text, h;
      if (t === 0) { ans = row[5 - o]; text = `A row begins ${row.join(" ")} (five notes, numbered 0-11). What is the ${ord} note of its retrograde?`; h = ["Retrograde means the row played backward.", "Write the row in reverse order, then pick the note in the position asked.", "Example: for the row 1 5 8, the retrograde is 8 5 1, so its 1st note is 8. Now do yours."]; }
      else if (t === 1) { ans = ((2 * f - row[o - 1]) % 12 + 12) % 12; text = `A row begins ${row.join(" ")} (five notes, numbered 0-11). Its inversion keeps the first note and flips every interval. What is the ${ord} note of the inversion?`; h = ["Inversion turns each interval upside down: a step up becomes the same step down.", "For each note use 2 x (first note) minus the note. If the result is negative, add 12; if it is 12 or more, subtract 12.", "Example: for the row 0 3 7, the inversion is 0 9 5 (0 - 3 = -3, plus 12 = 9). Now do yours."]; }
      else { ans = (row[o - 1] + k) % 12; text = `A row begins ${row.join(" ")} (five notes, numbered 0-11). It is transposed up ${k} half steps. What is the ${ord} note now?`; h = ["Transposing adds the same number to every note.", "Add the half steps to the note in that position. If the total is 12 or more, subtract 12.", "Example: the note 9 transposed up 4 is 9 + 4 = 13, minus 12 = 1. Now do yours."]; }
      if (ans !== 0) return { text, answer: ans, hints: h };
    }
  };

  // ======================= LEVEL 18 =======================
  const l18 = [
    L("Band music", [
      ["Concert band", "🎺", "A <b>concert band</b> has woodwinds, brass and percussion, and usually no strings. A <b>marching band</b> plays outdoors while moving. It uses portable instruments, like the <b>sousaphone</b>, a tuba that wraps around the body, and a <b>drum line</b>. A <b>drum major</b> leads."],
      ["Other bands", "🎷", "A <b>brass band</b> (popular in Britain) has only brass and percussion. A jazz <b>big band</b> has saxophones, trumpets, trombones and a rhythm section."],
      ["Marches", "🥁", "<b>John Philip Sousa</b>, the 'March King', wrote <i>The Stars and Stripes Forever</i>. Marches are usually in 2/4 or 6/8 with a steady beat for walking."]
    ], [
      "A concert band has woodwinds, brass and...|Percussion|Strings only|Harps only",
      "A tuba that wraps around the player's body for marching is the...|Sousaphone|Piccolo|Oboe",
      "The person who leads a marching band is the...|Drum major|Librettist|Concertmaster",
      "A band with only brass and percussion is a...|Brass band|String quartet|Choir",
      "A jazz big band has saxophones, trumpets, trombones and a...|Rhythm section|Chorus of violins|Pipe organ",
      "Who is called the March King?|John Philip Sousa|Haydn|Verdi",
      "Marches are usually in which time signature?|2/4 or 6/8|5/4|7/8",
      "Which group in a marching band plays the snare and bass drums?|Drum line|Brass choir|Woodwind choir",
      "Where would you most likely hear a marching band?|At a parade or football field|In a recording booth only|On an opera stage"
    ], "Think about which instruments marching bands need to carry.", "Match each band type with the instruments it includes."),

    L("Popular song forms", [
      ["Verse and chorus", "🎤", "Most pop songs have a <b>verse</b> (tells the story, with new words each time), a <b>chorus</b> (the main hook, with the same words each time) and often a <b>bridge</b> (a contrasting part, usually heard once). An <b>intro</b> starts the song and an <b>outro</b> ends it."],
      ["AABA", "A A B A", "Older popular songs and jazz standards often use <b>32-bar AABA</b> form: four sections of 8 bars. The A tune is played twice, then the B section (the bridge) gives contrast, then A comes back."],
      ["Building up", "📈", "A <b>pre-chorus</b> is a short section that builds energy into the chorus. The 12-bar blues is another popular form."]
    ], [
      "In AABA form, which letter is the bridge?|B|A|The last A",
      "In 32-bar AABA form, each section is how many bars?|8|4|16",
      "The part with the same words and main hook each time is the...|Chorus|Verse|Intro",
      "The part that tells the story with new words each time is the...|Verse|Chorus|Outro",
      "The contrasting part, usually heard once, is the...|Bridge|Verse|Chorus",
      "A section that builds into the chorus is the...|Pre-chorus|Outro|Cadenza",
      "How many sections does AABA form have?|4|3|2",
      "In AABA form, the first two sections are...|The same tune|Two different tunes|Silent",
      "The last part of a song that ends it is the...|Outro|Intro|Bridge"
    ], "Picture the song in sections and name what each one does.", "Think of verse = story, chorus = hook, bridge = contrast."),

    L("Reading a concert program", [
      ["Order of a concert", "📜", "A typical orchestra concert starts with a short <b>overture</b> or opener, then a <b>concerto</b> with a soloist, then an <b>intermission</b> (a break), then a longer <b>symphony</b>."],
      ["Catalog numbers", "Op. 67", "A title like 'Symphony No. 5 in C minor, Op. 67' has parts. <b>No. 5</b> is the number in the series, the key is the home key, and <b>Op.</b> (opus) is the work number in the composer's list. Mozart's works use <b>K.</b> (Köchel) numbers and Bach's use <b>BWV</b> numbers."],
      ["Program notes", "📖", "<b>Program notes</b> give background about the music and composer. Listen quietly and wait to clap until the whole piece is finished."]
    ], [
      "'Op.' stands for...|Opus (work number)|Opera|Orchestra",
      "In 'Symphony No. 5 in C minor', 'C minor' tells the...|Home key|Tempo|Number of players",
      "Mozart's works are cataloged with the letter...|K|B|S",
      "Bach's works are cataloged with the letters...|BWV|BPM|DVD",
      "Where does the intermission usually come?|In the middle of the concert|Before the first note|After the audience leaves",
      "A piece that shows off a soloist with the orchestra is a...|Concerto|Overture|March",
      "Written background about the music is called...|Program notes|Libretto|A cadenza",
      "When should you clap at a symphony concert?|After the whole piece has finished|In the middle of a quiet part|While the musicians tune",
      "'No. 5' in a title means...|The fifth in a series|Five players|Five flats"
    ], "Think about what a printed program tells the audience.", "Read each part of the title: number, key, work number."),

    L("Music and society", [
      ["Music that brings people together", "🏳️", "National anthems like <i>La Marseillaise</i> (France) express a country's pride. Schools and sports teams have songs. Lullabies and hymns comfort people."],
      ["Songs for change", "✊", "Spirituals and gospel songs gave strength and hope in hard times in American history. In the 1950s and 1960s, songs like <i>We Shall Overcome</i> were sung by people working peacefully for equal rights. Woody Guthrie wrote the folk song <i>This Land Is Your Land</i>."],
      ["Listen with respect", "💬", "Music can help people speak up, remember history and feel less alone. Songs mean different things in different cultures, so we listen respectfully."]
    ], [
      "A song that expresses a country's pride is a...|National anthem|Lullaby|Fugue",
      "'La Marseillaise' is the anthem of...|France|Italy|Mexico",
      "'We Shall Overcome' was sung by people working peacefully for...|Equal rights|Cheaper pizza|Longer summers",
      "Who wrote 'This Land Is Your Land'?|Woody Guthrie|Johann Strauss|Aaron Copland",
      "Gentle songs sung to help a baby sleep are...|Lullabies|Marches|Fanfares",
      "Songs that give strength and hope in hard times include...|Spirituals and gospel|Only fanfares|Only jingles",
      "Why do people sing together at events?|It brings people together|It makes the key change|It is a law",
      "Different cultures can hear the same song...|Differently|Exactly alike|Not at all",
      "Songs can help people remember...|History and shared stories|Only prices|Only phone numbers"
    ], "Think about why people sing together and what the songs are for.", "Match the song or type of song with its purpose."),

    L("Chorales and hymns", [
      ["Church songs", "⛪", "A <b>hymn</b> is a song of praise sung by a group, with a simple tune and several verses. A <b>chorale</b> is a German hymn tune. Chorales became popular after the Reformation in the 1500s, when Martin Luther wanted everyone to sing in their own language."],
      ["Bach's chorales", "🎼", "J.S. Bach wrote hundreds of four-part chorale harmonizations, which are still used to teach harmony. Their texture is <b>homophonic</b>: all four voices move together in the same rhythm, with the tune usually in the soprano."],
      ["Longer works", "🎶", "A <b>cantata</b> is a longer piece with solos, chorus and orchestra, and it often includes a chorale. A <b>chorale prelude</b> is an organ piece based on a chorale tune."]
    ], [
      "A German hymn tune sung by everyone is a...|Chorale|Aria|Rondo",
      "Chorale texture is mostly...|Homophonic|Polyphonic|Monophonic",
      "Chorales became popular after the...|Reformation|Fall of Rome|Space Race",
      "In a chorale harmonization the tune is usually in the...|Soprano|Bass|Drums",
      "Which composer wrote hundreds of four-part chorales?|J.S. Bach|Debussy|Gershwin",
      "A longer piece for soloists, chorus and orchestra is a...|Cantata|Polka|Étude",
      "An organ piece based on a chorale tune is a...|Chorale prelude|Mazurka|Impromptu",
      "Bach's chorales are still used to teach...|Harmony|Drumming|Dance steps",
      "In a chorale, the four voices usually move...|Together in the same rhythm|In totally different rhythms|One at a time"
    ], "Think about who sings a chorale and how the voices fit together.", "Remember the texture word that means 'moving together'."),

    L("Music of the Middle East", [
      ["Instruments", "🪕", "The <b>oud</b> is a pear-shaped lute without frets, and it is an ancestor of the European lute. The <b>qanun</b> is a flat plucked zither. The <b>ney</b> is an end-blown reed flute. The <b>darbuka</b> is a goblet-shaped drum."],
      ["Maqam", "🎼", "Many traditions use <b>maqam</b>, a system of melodic modes. Some maqams use <b>quarter tones</b> (also called microtones), pitches between the keys of a piano, so a piano cannot play them all."],
      ["Improvising", "🌙", "Singers and players often <b>improvise</b> on a maqam, then join with rhythm patterns played on drums like the darbuka."]
    ], [
      "The oud is a...|Pear-shaped, fretless lute|Brass instrument|Large drum",
      "The oud is an ancestor of the European...|Lute|Clarinet|Organ",
      "A maqam is a system of...|Melodic modes|Drum rhythms only|Chord charts",
      "Pitches between the piano keys are called...|Quarter tones (microtones)|Ledger lines|Sharps",
      "The ney is a...|End-blown reed flute|Plucked zither|Goblet drum",
      "The darbuka is a...|Goblet drum|Flute|Zither",
      "The qanun is a...|Flat plucked zither|Brass horn|Bagpipe",
      "Why can't a piano play all maqam notes?|Some use pitches between the keys|Pianos have no notes|Maqams are silent",
      "Singers and players often ___ on a maqam.|Improvise|Count rests only|Stay silent"
    ], "Think about how the instrument is played, or what a mode is.", "Match each instrument with its shape and way of making sound."),

    L("Score and part terms", [
      ["Orchestra directions", "🎼", "<b>Tutti</b> means everyone plays. <b>Solo</b> means one player alone. <b>Divisi</b> means a section splits into smaller groups playing different notes. <b>A due</b> (or a 2) means two players play the same note."],
      ["String directions", "🎻", "<b>Arco</b> means use the bow. <b>Pizzicato</b> means pluck. <b>Con sordino</b> means with a mute, and <b>senza sordino</b> means without. <b>Col legno</b> means strike with the wood of the bow. <b>Tremolo</b> is fast repeated notes."],
      ["Moving on", "📖", "<b>Tacet</b> means be silent for that section. <b>Segue</b> means go on to the next part without a break. <b>Attacca</b> means begin the next movement right away."]
    ], [
      "Tutti means...|Everyone plays|One player alone|Silence",
      "Divisi means...|A section splits into smaller groups|Divide the tempo|Everyone plays the same note",
      "Arco means...|Use the bow|Pluck|Mute",
      "Pizzicato means...|Pluck the strings|Use the bow|Play loud",
      "Con sordino means...|With a mute|Without a mute|Very fast",
      "Col legno means...|Strike with the wood of the bow|Play at the tip|Sing",
      "Tacet means...|Be silent|Play louder|Repeat",
      "Attacca means...|Begin the next movement right away|Stop and bow|Go back to the start",
      "Solo means...|One player alone|The whole orchestra|A key change"
    ], "Many of these are Italian words. Think about what the player should do.", "Sort them: who plays, how to use the bow, or what to do next."),

    F("Milliseconds per note", [
      ["Time for one beat", "60 000", "There are 60,000 milliseconds in a minute. One beat at a tempo of 120 BPM lasts 60,000 ÷ 120 = <b>500 ms</b>."],
      ["Other note values", "½  ×2", "If the beat is a quarter note, an eighth note lasts <b>half</b> as long, a half note lasts <b>twice</b> as long, and a whole note lasts <b>four times</b> as long."],
      ["Why it matters", "🎚️", "Music producers use this to set echoes (delays) that fit the beat. At 120 BPM an eighth-note echo is 250 ms."]
    ], msQ),

    L("How the ear works", [
      ["Three parts", "👂", "The <b>outer ear</b> (the part you see and the ear canal) collects sound. The <b>middle ear</b> has the <b>eardrum</b> and three tiny bones that pass the vibrations along. The <b>inner ear</b> has the <b>cochlea</b>, a snail-shaped tube."],
      ["Hair cells", "〰️", "The cochlea is filled with fluid and lined with tiny <b>hair cells</b>. Vibrations bend them, and they send signals along the <b>auditory nerve</b> to the brain."],
      ["Protecting it", "🛡️", "Hair cells do not grow back, so loud noise can cause permanent damage. Keep the volume low, take listening breaks and use ear protection at loud events."]
    ], [
      "Which part of the ear is the snail-shaped tube?|Cochlea|Eardrum|Ear canal",
      "The eardrum is part of the...|Middle ear|Inner ear|Outer ear",
      "The three tiny bones are in the...|Middle ear|Outer ear|Cochlea",
      "Tiny cells in the cochlea that send signals to the brain are...|Hair cells|Skin cells|Bone cells",
      "The nerve that carries sound signals to the brain is the...|Auditory nerve|Sciatic nerve|Optic nerve",
      "The part of the ear you can see is the...|Outer ear|Inner ear|Middle ear",
      "Why should you protect your hearing?|Hair cells do not grow back|Ears get heavy|Music gets boring",
      "Loud noise can cause...|Permanent hearing damage|Better hearing|Longer ears",
      "Sound is turned into signals for the brain in the...|Inner ear|Outer ear|Ear canal"
    ], "Follow the path of sound from the outside of the ear to the brain.", "Outer, middle and inner ear each have their own parts."),

    L("Planning a composition", [
      ["Start with an idea", "💡", "A piece can begin with a <b>motif</b> (a short idea), a mood, a story, a chord progression or a rhythm. Try several ideas and keep the one you like best."],
      ["Shape it", "🏗️", "Choose a <b>form</b> (like ABA), a key and a tempo. <b>Develop</b> your idea by repeating it with changes and adding <b>contrast</b>. Build to a high point, the <b>climax</b>, and end with a clear cadence."],
      ["Revise", "✏️", "Play your piece, listen, and revise. Cut what is not needed. Write it down or record it, and ask a friend or teacher to play it. Real composers revise a lot."]
    ], [
      "A short musical idea to build a piece from is a...|Motif|Libretto|Tutti",
      "The high point of a piece is the...|Climax|Overture|Rest",
      "Repeating an idea and changing it a little is called...|Developing it|Erasing it|Muting it",
      "Adding something different to keep a piece interesting is called...|Contrast|Silence|Pizzicato",
      "A plan such as ABA is the piece's...|Form|Tempo|Clef",
      "After writing a first draft, a composer should...|Listen and revise|Throw it away|Never change it",
      "A piece usually ends with a clear...|Cadence|Time signature|Pickup",
      "Ideas for a piece can come from...|A mood, a story or a rhythm|Only a computer|Nowhere",
      "Hearing someone else play your piece helps because...|You notice what to improve|It makes it longer|It changes the key"
    ], "Think about the steps a composer takes from first idea to finished piece.", "Idea, shape, develop, then revise."),

    L("Mirror music", [
      ["Reflections", "🪞", "Composers sometimes use symmetry. In <b>retrograde</b> a melody is played backward. In <b>inversion</b> every interval is flipped upside down, so up becomes down. A <b>palindrome</b> reads the same forward and backward."],
      ["Both at once", "↩️", "Doing both is <b>retrograde inversion</b>: backward and upside down. A <b>crab canon</b> plays a melody together with its own retrograde. J.S. Bach used these ideas in <i>The Musical Offering</i>."],
      ["Try it", "✏️", "The notes C D E G in retrograde are G E D C. A melody that goes up, up, down has an inversion that goes down, down, up."]
    ], [
      "Playing a melody backward is called...|Retrograde|Inversion|Augmentation",
      "Flipping every interval upside down is called...|Inversion|Retrograde|Diminution",
      "The notes D E G A played in retrograde are...|A G E D|D A G E|E D A G",
      "A melody that goes up, then up, then down. In exact inversion it goes...|Down, down, up|Up, up, down|Down, up, up",
      "Doing both backward and upside down is...|Retrograde inversion|Augmentation|Fermata",
      "A melody that reads the same forward and backward is a...|Palindrome|Fugue|Hymn",
      "A canon that plays a melody against its own retrograde is a...|Crab canon|Round|Fanfare",
      "Which composer used mirror ideas in The Musical Offering?|J.S. Bach|Gershwin|Sousa",
      "The retrograde of a rhythm of long-short-short is...|Short-short-long|Long-short-short|Long-long-short"
    ], "Think about a mirror, or reading a line from right to left.", "Retrograde changes the order. Inversion changes the direction."),

    L("Ways to modulate", [
      ["Pivot chord", "🔄", "A <b>pivot chord</b> belongs to both the old key and the new key and works like a hinge. The A minor chord is vi in C major and also ii in G major."],
      ["Other ways", "🔀", "<b>Common-tone</b> modulation holds a note that is in both keys. <b>Direct</b> (abrupt) modulation jumps to the new key with no preparation. Pop songs often use a key change a step up near the end to raise energy."],
      ["Making it stick", "🏁", "A modulation is confirmed by a strong V to I <b>cadence</b> in the new key. A short visit to another key is only a <b>tonicization</b>."]
    ], [
      "A chord that belongs to both the old key and the new key is a...|Pivot chord|Blue note|Drone",
      "Jumping to a new key with no preparation is a...|Direct modulation|Pivot modulation|Cadenza",
      "Holding a note that is in both keys is a ___ modulation.|Common-tone|Rhythmic|Dynamic",
      "A strong V to I in the new key does what?|Confirms the modulation|Cancels the modulation|Makes it silent",
      "A short visit to another key is a...|Tonicization|Fugue|Rondo",
      "Pop songs often raise energy with a key change near the...|End|Beginning|Title",
      "In C major, the vi chord (A minor) is also the ___ chord in G major.|ii|IV|V",
      "Which chord could act as a pivot between C major and G major?|A minor|B♭ major|F♯ major",
      "A modulation changes the...|Key|Time signature|Instrument"
    ], "Think about changing rooms: is there a doorway, a shared object or a jump?", "Pivot = shared chord. Common tone = shared note. Direct = no link."),

    F("MIDI note numbers", [
      ["Music as data", "💻", "<b>MIDI</b> sends instructions, not sound: which note to play, how hard (<b>velocity</b>), and when to start and stop. Notes are numbered 0 to 127."],
      ["The numbers", "60", "Middle C is MIDI note <b>60</b>. Each half step up adds 1 and each half step down subtracts 1. An octave is 12 numbers. The A above middle C (440 Hz) is note 69."],
      ["Channels", "🎛️", "MIDI has 16 channels, so one connection can carry 16 different instruments at once."]
    ], midiQ),

    L("Waves, nodes and Doppler", [
      ["Sound is a wave", "〰️", "Sound is a wave of <b>compressions</b> (squeezed air) and <b>rarefactions</b> (spread-out air). It is a <b>longitudinal</b> wave: the air moves back and forth in the same direction the wave travels. Sound cannot travel through a vacuum."],
      ["Standing waves", "⚓", "On a string fixed at both ends, <b>nodes</b> are points that do not move, and <b>antinodes</b> are points that move the most. The 2nd harmonic has a node in the middle of the string."],
      ["Doppler effect", "🚑", "When a sound source moves toward you, its pitch sounds <b>higher</b>. When it moves away, the pitch sounds <b>lower</b>. This is the <b>Doppler effect</b>, and you hear it when a siren passes by."]
    ], [
      "Sound travels as a wave of compressions and...|Rarefactions|Colors|Sparks",
      "Can sound travel through a vacuum?|No|Yes|Only high notes",
      "A point on a vibrating string that does not move is a...|Node|Antinode|Cadence",
      "A point that moves the most on a vibrating string is an...|Antinode|Node|Fret",
      "A siren moving toward you sounds...|Higher in pitch|Lower in pitch|Silent",
      "A siren moving away from you sounds...|Lower in pitch|Higher in pitch|Exactly the same",
      "The change in pitch caused by a moving source is the...|Doppler effect|Echo effect|Vibrato",
      "Sound is a ___ wave: the air moves in the same direction as the wave.|Longitudinal|Transverse|Light",
      "The 2nd harmonic of a string has a node...|In the middle|Only at the ends|Nowhere"
    ], "Picture the wave moving, or the source moving, and ask what happens to the pitch.", "Compressions and rarefactions are the two parts of a sound wave."),

    L("Styles of the 1900s", [
      ["Impressionism", "🌫️", "<b>Impressionism</b> (Debussy, Ravel) paints moods and colors with sound, using whole-tone scales, soft, blurry harmony and titles like <i>La mer</i> (The Sea)."],
      ["Expressionism and neoclassicism", "🎭", "<b>Expressionism</b> (Schoenberg, Berg) shows strong, raw, anxious feelings, often atonal. <b>Neoclassicism</b> (Prokofiev's <i>Classical Symphony</i>) returns to the clear forms and balance of the Classical era with modern harmony."],
      ["Nationalism", "🚩", "<b>Nationalism</b> uses the folk tunes and rhythms of a homeland, like Bartók (Hungary), Sibelius (Finland) and Copland (USA)."]
    ], [
      "Which style paints moods and colors with soft, blurry harmony?|Impressionism|Neoclassicism|Nationalism",
      "Which style shows raw, anxious feelings and is often atonal?|Expressionism|Impressionism|Neoclassicism",
      "Which style returns to Classical-era clarity and balance?|Neoclassicism|Expressionism|Impressionism",
      "Which style uses a homeland's folk tunes?|Nationalism|Expressionism|Serialism",
      "Debussy's 'La mer' is an example of...|Impressionism|Expressionism|Nationalism",
      "Schoenberg is linked with...|Expressionism|Impressionism|Neoclassicism",
      "Bartók and Sibelius used folk tunes of their homelands. This is...|Nationalism|Neoclassicism|Impressionism",
      "Prokofiev's Classical Symphony is an example of...|Neoclassicism|Expressionism|Impressionism",
      "Impressionist composers often used the ___ scale.|Whole-tone|Blues|Phrygian only"
    ], "Match the style name with the feeling or idea behind it.", "Impression = color, expression = feeling, neo = new, nation = homeland."),

    L("Guide tones and jazz chords", [
      ["Seventh chords in jazz", "🎷", "Jazz uses seventh chords. In C: <b>Cmaj7</b> = C E G B. <b>Dm7</b> = D F A C. <b>G7</b> = G B D F."],
      ["Guide tones", "3 · 7", "The <b>3rd and 7th</b> of a chord are its <b>guide tones</b>, because they show whether it is major, minor or dominant. In G7 they are B and F. Good bass lines and solos aim for them."],
      ["Tritone substitution", "⇄", "G7 contains B and F, a tritone. D♭7 (D♭ F A♭ C♭) contains F and C♭, which sounds like B: the same tritone. So D♭7 can replace G7. This is a <b>tritone substitution</b>."]
    ], [
      "What notes make up Cmaj7?|C E G B|C E♭ G B♭|C E G B♭",
      "What notes make up G7?|G B D F|G B♭ D F|G B D F♯",
      "What notes make up Dm7?|D F A C|D F♯ A C|D F A C♯",
      "The guide tones of a chord are its...|3rd and 7th|Root and 5th|9th and 11th",
      "The guide tones of G7 are...|B and F|G and D|C and E",
      "A tritone substitution replaces a dominant 7th with one whose root is...|A tritone away|A whole step away|An octave away",
      "Which chord can replace G7 as a tritone substitution?|D♭7|A7|F7",
      "In Dm7, the 7th is the note...|C|E|B",
      "Why are the 3rd and 7th called guide tones?|They show if a chord is major, minor or dominant|They are always loudest|They are the lowest notes"
    ], "Build each chord by stacking thirds from the root.", "Count: root, 3rd, 5th, 7th. The 3rd and 7th are special."),

    F("Tone row transformations", [
      ["12 notes, once each", "0 – 11", "A <b>tone row</b> uses all 12 notes once each in a chosen order. We number them C = 0, C♯ = 1, up to B = 11. Schoenberg built whole pieces from one row."],
      ["Four forms", "P R I RI", "<b>Prime</b>: the original. <b>Retrograde</b>: backward. <b>Inversion</b>: every interval flipped (up becomes down). <b>Retrograde inversion</b>: backward and flipped. A row can also be <b>transposed</b> by adding the same number to every note."],
      ["How to flip", "2f − n", "For inversion keep the first note, then each note becomes (2 x first note) minus the note, wrapping around 12. Example: row 0 3 7 has the inversion 0 9 5."]
    ], rowQ),

    L("Eras on the timeline", [
      ["Order of the eras", "📅", "<b>Medieval</b> (about 500-1400), <b>Renaissance</b> (1400-1600), <b>Baroque</b> (1600-1750), <b>Classical</b> (1750-1820), <b>Romantic</b> (1820-1900), then the <b>1900s</b>, with jazz, pop and electronic music."],
      ["Who and when", "⭐", "Baroque: Bach, Handel, Vivaldi. Classical: Haydn, Mozart, Beethoven. Romantic: Chopin, Brahms, Tchaikovsky. Medieval: Hildegard of Bingen."],
      ["Key features", "🔑", "Medieval: chant. Renaissance: smooth vocal polyphony. Baroque: ornaments and basso continuo. Classical: clear, balanced forms. Romantic: big emotion and large orchestras."]
    ], [
      "Which era came first?|Medieval|Baroque|Romantic",
      "Which era came right after the Baroque?|Classical|Renaissance|Medieval",
      "Which era came right after the Classical?|Romantic|Baroque|Medieval",
      "Bach and Vivaldi belong to the...|Baroque era|Classical era|Romantic era",
      "Mozart and Haydn belong to the...|Classical era|Baroque era|Renaissance",
      "Chopin and Brahms belong to the...|Romantic era|Baroque era|Medieval period",
      "Chant is the typical sound of the...|Medieval era|Romantic era|Classical era",
      "Basso continuo is a feature of the...|Baroque era|Romantic era|1900s",
      "Which era is known for big emotion and large orchestras?|Romantic|Medieval|Renaissance",
      "Smooth vocal polyphony is typical of the...|Renaissance|Baroque|Classical"
    ], "Put the eras in order on a timeline, then match the composer or feature.", "Dates and famous names help you place each era.")
  ];
  l18.push(
    MIX("Mixed practice", l18.slice(0, 9)),
    MIX("Level 18 Challenge", l18.slice(9))
  );

  Object.assign(MUSIC_LEVELS, { 16: l16, 17: l17, 18: l18 });
})();
