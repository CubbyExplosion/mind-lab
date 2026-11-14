// Mind Lab Music, levels 19-21 (extension file). 20 lessons per level.
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
  const centsQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const n = ri(2, 11), n2 = pick([2, 3, 4, 5, 6, 7, 8].filter(x => x !== n));
      return {
        text: `An interval is ${n} half steps wide in equal temperament. How many cents is that?`, answer: 100 * n,
        hints: ["Each half step has a fixed size measured in cents. Multiply that size by the number of half steps.",
          "Equal temperament cuts the octave into 12 equal half steps. Work out how many cents one half step is, using the size of the whole octave.",
          `Example: ${n2} half steps is ${n2} x 100 = ${100 * n2} cents. Now do yours.`]
      };
    }
    if (t === 1) {
      const n = ri(2, 4), n2 = pick([2, 3, 4].filter(x => x !== n));
      return {
        text: `How many cents are in ${n} octaves?`, answer: 1200 * n,
        hints: ["Find the number of cents in a single octave, then multiply by how many octaves there are.",
          "An octave is 12 half steps, and a half step is a round number of cents.",
          `Example: ${n2} octaves is ${n2} x 1200 = ${1200 * n2} cents. Now do yours.`]
      };
    }
    if (t === 2) {
      const x = pick([15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 85]), x2 = pick([10, 20, 30].filter(v => v !== x));
      return {
        text: `A singer's note is ${x} cents above G. How many more cents up is the next half step, G sharp?`, answer: 100 - x,
        hints: ["G sharp is exactly one half step above G. Think about how many cents that is in all.",
          "Take the full size of the half step and subtract the distance the singer has already climbed.",
          `Example: if the note were ${x2} cents above A, then A sharp is ${100 - x2} cents further (100 - ${x2}). Now do yours.`]
      };
    }
    const n = ri(2, 5), n2 = pick([2, 3, 4, 5].filter(v => v !== n));
    return {
      text: `How many cents are in ${n} whole steps?`, answer: 200 * n,
      hints: ["A whole step is made of two half steps.",
        "Find the cents in one whole step first, then multiply by the number of whole steps.",
        `Example: ${n2} whole steps is ${n2} x 200 = ${200 * n2} cents. Now do yours.`]
    };
  };

  const NOTES = ["C", "C sharp", "D", "D sharp", "E", "F", "F sharp", "G", "G sharp", "A", "A sharp", "B"];
  const STRS = [["low E", 4], ["A", 9], ["D", 2], ["G", 7], ["B", 11], ["high E", 4]];
  const fretQ = () => {
    const [nm, root] = pick(STRS);
    if (Math.random() < 0.6) {
      const k = ri(1, 7), idx = (root + k) % 12, [nm2, r2] = pick(STRS), k2 = ri(1, 6);
      const ans = NOTES[idx], wr = [NOTES[(idx + 1) % 12], NOTES[(idx + 11) % 12]];
      return {
        text: `On a guitar, the open ${nm} string plays ${NOTES[root]}. Which note do you hear at fret ${k}? (Use the sharp name.)`,
        choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Every fret you move up the neck raises the pitch by one half step.",
          "Walk up the 12-note list one step per fret: C, C sharp, D, D sharp, E, F, F sharp, G, G sharp, A, A sharp, B, then back to C. Start at the open string's note.",
          `Example: on the open ${nm2} string (${NOTES[r2]}), fret ${k2} is ${NOTES[(r2 + k2) % 12]}. Now do yours.`]
      };
    }
    const k = ri(2, 9), [nm2, r2] = pick(STRS), k2 = ri(2, 9);
    return {
      text: `The open ${nm} string plays ${NOTES[root]}. At which fret do you play ${NOTES[(root + k) % 12]}? (Give the lowest fret number.)`, answer: k,
      hints: ["Count how many half steps it is from the open string's note up to the note you want.",
        "Each fret is one half step. Say the notes in order, including the sharps, and count the steps until you reach the target.",
        `Example: on the open ${nm2} string (${NOTES[r2]}), the note ${NOTES[(r2 + k2) % 12]} is at fret ${k2}. Now do yours.`]
    };
  };

  const distQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const y = ri(2, 6), y2 = pick([2, 3, 4, 5, 6].filter(v => v !== y));
      return {
        text: `Sound spreads out so its intensity falls with the square of the distance. If you move ${y} times farther from a speaker, the intensity becomes 1 over what number?`, answer: y * y,
        hints: ["Intensity does not just shrink by the distance. It shrinks by the distance multiplied by itself.",
          "Take the number of times farther away and square it (multiply it by itself). That number goes under the 1.",
          `Example: ${y2} times farther gives 1 over ${y2} x ${y2} = 1 over ${y2 * y2}. Now do yours.`]
      };
    }
    if (t === 1) {
      const y = ri(2, 6), y2 = pick([2, 3, 4, 5, 6].filter(v => v !== y));
      return {
        text: `After you walk away from a speaker, the sound intensity is 1/${y * y} of what it was. How many times farther away are you?`, answer: y,
        hints: ["Intensity goes with the square of the distance, so undo the squaring.",
          "Ask yourself: which number, multiplied by itself, makes the number under the 1?",
          `Example: intensity 1/${y2 * y2} means ${y2} times farther, since ${y2} x ${y2} = ${y2 * y2}. Now do yours.`]
      };
    }
    const y = ri(2, 5), y2 = pick([2, 3, 4, 5].filter(v => v !== y));
    return {
      text: `You walk ${y} times closer to a speaker. The sound intensity becomes how many times stronger?`, answer: y * y,
      hints: ["Moving closer makes the sound stronger, and the change follows the square of the distance.",
        "Square the number of times closer you moved (multiply it by itself).",
        `Example: ${y2} times closer makes it ${y2} x ${y2} = ${y2 * y2} times stronger. Now do yours.`]
    };
  };

  // ======================= LEVEL 19 =======================
  const l19 = [
    L("Tetrachords and building scales", [
      ["Four notes", "4", "A <b>tetrachord</b> is a group of 4 notes that spans a perfect fourth. The major tetrachord has the steps <b>whole, whole, half</b>."],
      ["Two tetrachords make a scale", "C D E F + G A B C", "A major scale is two major tetrachords joined by a <b>whole step</b>. In C major: C D E F, then G A B C."],
      ["Passing it on", "🔗", "The top tetrachord of one major scale is the bottom tetrachord of the major scale a fifth higher. G A B C is the top of C major and the bottom of G major."]
    ], [
      "How many notes are in a tetrachord?|4|3|5",
      "The major tetrachord pattern of steps is...|whole, whole, half|half, whole, whole|whole, half, whole",
      "A major tetrachord spans which interval from its lowest to its highest note?|perfect fourth|perfect fifth|major third",
      "In a major scale, the two tetrachords are joined by a...|whole step|half step|minor third",
      "What is the lower tetrachord of C major?|C D E F|C D E G|D E F G",
      "What is the upper tetrachord of C major?|G A B C|F G A B|G A B D",
      "The upper tetrachord of C major (G A B C) is the lower tetrachord of which major scale?|G major|F major|D major",
      "The upper tetrachord of G major is D E F sharp G. It is the lower tetrachord of which scale?|D major|A major|C major",
      "How many half steps are in a major tetrachord?|5|4|6",
      "The lower tetrachord of F major is F G A B flat. What is its upper tetrachord?|C D E F|B flat C D E|G A B flat C"
    ], "Build the scale in two halves of four notes each. What step joins the halves?", "Count the steps in each half: two whole steps, then a half step. The second half starts a whole step above the first half's last note."),

    L("Cadence types in depth", [
      ["Authentic cadences", "V → I", "An <b>authentic cadence</b> is V to I. In a <b>perfect</b> authentic cadence both chords are in root position and the melody ends on the tonic. If not, it is <b>imperfect</b>."],
      ["Half and plagal", "V   IV → I", "A <b>half cadence</b> stops on V, like a comma. A <b>plagal cadence</b> is IV to I, the 'Amen' sound."],
      ["Deceptive", "V → vi", "A <b>deceptive cadence</b> goes from V to vi instead of I. It sounds like a surprise, and the music keeps going."]
    ], [
      "A cadence that ends on V and feels like a comma is a...|half cadence|plagal cadence|perfect authentic cadence",
      "Which cadence is IV to I, the 'Amen' sound?|plagal cadence|deceptive cadence|half cadence",
      "V to vi is a...|deceptive cadence|plagal cadence|half cadence",
      "A perfect authentic cadence has V and I both in...|root position|first inversion|second inversion",
      "In a perfect authentic cadence the top note of the final chord is the...|tonic|dominant|mediant",
      "Which cadence feels the most final, like a period?|perfect authentic cadence|half cadence|deceptive cadence",
      "A deceptive cadence surprises us because the music goes to vi instead of...|I|IV|ii",
      "A V to I cadence where the melody ends on the third of the tonic chord is an...|imperfect authentic cadence|plagal cadence|half cadence",
      "Which cadence feels unfinished and asks for more music?|half cadence|perfect authentic cadence|plagal cadence"
    ], "Think about which chords come at the end of the phrase and how final it feels.", "Name the two chords, then recall: V to I, IV to I, V to vi, or stopping on V."),

    L("The cadential six-four", [
      ["A tonic that leans", "I 6/4", "The <b>cadential six-four</b> is a tonic chord in <b>second inversion</b>. In C major it is G C E, with the fifth of the key (G) in the bass."],
      ["Really a dominant", "6/4 → 5/3", "Even though it is spelled like a tonic chord, it acts as a <b>dominant</b>. Its upper notes lean down by step onto the notes of V, over the same bass note."],
      ["Where it sits", "💥", "It usually falls on a <b>strong beat</b> just before the final V and I. The sound of that lean followed by a release is the heart of many classical endings."]
    ], [
      "A cadential six-four is a tonic chord in which position?|second inversion|root position|first inversion",
      "In C major, which note is in the bass of the cadential six-four?|G|C|E",
      "The cadential six-four usually moves next to which chord?|V|IV|vi",
      "In C major the cadential six-four has the notes G, C and...|E|D|F",
      "The cadential six-four acts like which harmony in function?|dominant|subdominant|tonic",
      "The upper notes of the cadential six-four move down by step to the notes of...|the V chord|the IV chord|the ii chord",
      "In D major, which note is in the bass of the cadential six-four?|A|D|F sharp",
      "The figures 6 and 4 name intervals above the...|bass note|melody note|key note",
      "In G major, the bass note of the cadential six-four is...|D|G|B",
      "A cadential six-four most often falls on a...|strong beat|weak beat|silent bar"
    ], "Remember that a six-four chord has its fifth in the bass, and think about where that bass note belongs in the key.", "The bass of a cadential six-four is the note a fifth above the key note, the same bass note as the V chord that follows."),

    L("Unusual instruments", [
      ["Played without touch", "👋", "The <b>theremin</b> makes its eerie sound when you move your hands near two antennas, without touching it. It was invented in the 1920s."],
      ["Wheels and glass", "🎡", "A <b>hurdy-gurdy</b> makes sound with a rosined wheel turned by a crank that rubs the strings. A <b>glass armonica</b> uses spinning glass bowls played with wet fingers; Benjamin Franklin invented it."],
      ["More surprises", "🎶", "The <b>ocarina</b> is a little clay vessel flute. The <b>alphorn</b> is a very long wooden horn from the Alps. The <b>musical saw</b> is bowed and bent to change pitch."]
    ], [
      "Which instrument is played by moving your hands near antennas, without touching it?|theremin|ocarina|alphorn",
      "A hurdy-gurdy makes its sound with a...|rosined wheel turned by a crank|set of valves|bag of air",
      "Which instrument uses spinning glass bowls played with wet fingers?|glass armonica|hurdy-gurdy|ocarina",
      "Who invented the glass armonica?|Benjamin Franklin|Johann Strauss|Franz Liszt",
      "An ocarina is a small flute made of...|clay|rubber|paper",
      "The alphorn is a very long...|wooden horn|string instrument|keyboard",
      "Where does the alphorn come from?|the Alps|the Sahara|the Amazon",
      "A musical saw is played by...|bowing it and bending it|blowing into it|pressing keys on it",
      "Which one has an eerie, gliding tone because pitch changes with hand distance?|theremin|alphorn|ocarina"
    ], "Picture how each instrument is played. What does the player touch, turn, blow or move?", "Match the strange way of playing to the right name: antennas, a wheel, glass bowls, clay, a long horn or a saw."),

    L("Ground bass, passacaglia and chaconne", [
      ["A pattern that never stops", "🔁", "A <b>ground bass</b> is a short bass pattern repeated again and again while the upper parts change and grow. It is also called a basso ostinato."],
      ["Two Baroque forms", "🎻", "The <b>passacaglia</b> and <b>chaconne</b> are slow variation forms in triple meter built on a repeating bass or chord pattern."],
      ["Famous examples", "⭐", "Purcell's <b>Dido's Lament</b> uses a ground bass. Bach wrote a Passacaglia and Fugue for organ and a Chaconne for solo violin. Pachelbel's Canon repeats an eight-note bass."]
    ], [
      "A short bass pattern repeated again and again is a...|ground bass|pedal tone|cadenza",
      "While the ground bass repeats, the upper parts...|change and vary|stay exactly the same|stop playing",
      "Passacaglia and chaconne are forms based on...|variations over a repeating bass|a fast fugue|a sonata with three themes",
      "Bach's Chaconne in D minor is for...|solo violin|full orchestra|solo flute",
      "Which Baroque composer wrote Dido's Lament on a ground bass?|Purcell|Mozart|Chopin",
      "Pachelbel's Canon repeats a pattern of eight notes in the...|bass|melody only|drum part",
      "Passacaglia and chaconne are usually in which meter?|triple meter|5/4|cut time",
      "Bach's Passacaglia and Fugue in C minor is for...|organ|harp|recorder",
      "Ground bass is also called...|basso ostinato|basso continuo|bass clef",
      "Variations over a ground bass were most popular in which era?|Baroque|Romantic|Classical"
    ], "Think about what stays the same and what changes in these forms.", "The repeating part lives in the bass. Everything above it is free to change."),

    L("Ritornello form and the concerto grosso", [
      ["Soloists and orchestra", "🎻🎻", "A <b>concerto grosso</b> sets a small group of soloists, the <b>concertino</b>, against the full orchestra, the <b>ripieno</b> or <b>tutti</b>."],
      ["The returning theme", "🔄", "<b>Ritornello</b> means 'little return'. The orchestra plays a main theme, soloists play contrasting episodes, and the theme returns, often in new keys."],
      ["Famous music", "⭐", "Vivaldi's <b>Four Seasons</b> and Bach's <b>Brandenburg Concertos</b> use these ideas. Baroque concertos usually have three movements: fast, slow, fast."]
    ], [
      "In a concerto grosso, the small group of soloists is called the...|concertino|ripieno|continuo",
      "The full orchestra in a concerto grosso is called the...|ripieno|concertino|cadenza",
      "Ritornello means...|a little return|a long rest|a loud ending",
      "In ritornello form the main theme is played by...|the full orchestra, again and again|only the soloist, once|the drums alone",
      "Between the returns of the ritornello, soloists play contrasting...|episodes|cadences|fermatas",
      "Vivaldi's The Four Seasons is a set of...|violin concertos|piano sonatas|choral masses",
      "Bach's Brandenburg Concertos are famous examples of...|the Baroque concerto|romantic opera|lieder",
      "A Baroque concerto usually has how many movements?|three|two|five",
      "In ritornello form the returning theme often appears in different...|keys|time signatures|languages",
      "Tutti means...|all together|alone|very quietly"
    ], "Think about who plays the returning theme and who plays between its returns.", "Orchestra: refrain. Soloists: episodes. The refrain comes back like a chorus."),

    L("Baroque dance suites", [
      ["A set of dances", "💃", "A <b>suite</b> is a set of dances, all in the same key. Baroque suites began with an <b>allemande</b> (flowing, German), then a <b>courante</b> (running, in triple time)."],
      ["Slow and fast", "🐢⚡", "Next came a slow, stately <b>sarabande</b> in triple time, then maybe a <b>minuet</b>, <b>gavotte</b> or <b>bourrée</b>, and a fast, lively <b>gigue</b> to end. The gigue comes from the jig."],
      ["Bach's suites", "🎻", "Bach wrote six famous suites for solo cello. Each movement has two parts, and both parts are repeated."]
    ], [
      "A suite is a set of...|dances|fugues|hymns",
      "Which suite dance is slow and stately in triple time?|sarabande|gigue|bourrée",
      "Which dance usually ends a Baroque suite, fast and lively?|gigue|sarabande|allemande",
      "Which dance usually opens a suite, moderate and flowing?|allemande|gigue|sarabande",
      "The word 'courante' suggests music that is...|running|sleeping|marching",
      "The gigue developed from the...|jig|waltz|minuet",
      "The dances of a suite are usually all in the same...|key|tempo|meter",
      "The word 'allemande' means...|German|Spanish|Italian",
      "Bach wrote six famous suites for solo...|cello|piano|trumpet",
      "Gavotte and bourrée are both lively dances in...|duple meter|triple meter|5/4"
    ], "Think about the speed and mood of each dance in the set.", "Open with a flowing dance, finish with a lively one, and put a slow stately one in the middle."),

    L("Lieder and art songs", [
      ["Songs with piano", "🎤🎹", "A <b>lied</b> (plural <b>lieder</b>) is a German art song for voice and piano that sets a poem. Schubert wrote more than 600, including <b>Erlkönig</b>."],
      ["Equal partners", "🤝", "In a lied the piano is a full partner: it paints the mood and the scene. A <b>strophic</b> song repeats the same music for each verse; a <b>through-composed</b> song has new music all the way."],
      ["Song cycles", "📖", "A <b>song cycle</b> is a group of songs that go together, such as Schubert's <b>Winterreise</b>. In France the art song is called <b>mélodie</b>."]
    ], [
      "A lied is a song for...|voice and piano|choir and orchestra|solo violin",
      "Lieder come from which country?|Germany|Italy|Spain",
      "A group of songs linked together is a...|song cycle|symphony|ground bass",
      "Which composer wrote over 600 lieder, including Erlkönig?|Schubert|Handel|Vivaldi",
      "In a strophic song, every verse uses...|the same music|new music each time|no melody",
      "A song with new music for every verse is called...|through-composed|strophic|ostinato",
      "In a lied the piano is...|a full partner that paints the poem's mood|not used|only keeping time",
      "Winterreise by Schubert is a...|song cycle|opera|ballet",
      "The French word for art song is...|mélodie|lied|aria",
      "The words of a lied are usually a...|poem|play script|textbook"
    ], "Think about who performs a lied and what the words are taken from.", "A voice, a piano and a poem make a lied. Several in a group make a cycle."),

    L("The Mass and the Requiem", [
      ["Parts of the Mass", "⛪", "A <b>Mass</b> is a church service set to music. Its usual sung parts are <b>Kyrie</b> (Lord, have mercy), <b>Gloria</b> (Glory), <b>Credo</b> (I believe), <b>Sanctus</b> (Holy) and <b>Agnus Dei</b> (Lamb of God)."],
      ["The Requiem", "🕯️", "A <b>Requiem</b> is a Mass for remembering people who have died. Mozart's Requiem was left unfinished when he died in 1791. Verdi, Fauré and Brahms wrote Requiems too."],
      ["Great Masses", "⭐", "Bach wrote the <b>Mass in B minor</b> and Beethoven the <b>Missa Solemnis</b>. Brahms's Requiem is sung in German instead of Latin."]
    ], [
      "Kyrie, Gloria, Credo, Sanctus and Agnus Dei are parts of a...|Mass|symphony|concerto",
      "The word Kyrie begins a prayer asking for...|mercy|dancing|winter",
      "Which Mass part is the 'Glory' hymn?|Gloria|Credo|Agnus Dei",
      "Credo means...|I believe|I sing|I rest",
      "A Requiem is a Mass for...|remembering those who have died|a wedding|a harvest festival",
      "Which composer left his Requiem unfinished when he died in 1791?|Mozart|Brahms|Verdi",
      "Bach's Mass in B minor comes from which era?|Baroque|Romantic|the 1900s",
      "Brahms wrote his Requiem with words in...|German|Latin only|French",
      "Agnus Dei means...|Lamb of God|Lord have mercy|Peace on earth",
      "Sanctus means...|Holy|Lamb|Mercy"
    ], "Match the Latin name of the part to what it says, or the type of Mass to when it is used.", "Kyrie means mercy, Gloria glory, Credo belief, Sanctus holy, Agnus Dei the Lamb of God."),

    L("Hip-hop", [
      ["Where it started", "🏙️", "Hip-hop began in the 1970s in the Bronx, New York City. Its four main elements are <b>MCing</b> (rapping), <b>DJing</b>, <b>breaking</b> (dancing) and <b>graffiti</b> art."],
      ["Making the beat", "🎛️", "DJs such as DJ Kool Herc extended the 'breaks' of records so dancers could dance longer. Producers use <b>sampling</b> (reusing a snippet of an older recording) and <b>drum machines</b>."],
      ["Voices", "🎤", "<b>Flow</b> is the rhythm and style of how a rapper delivers the words. <b>Beatboxing</b> makes drum sounds with the mouth."]
    ], [
      "Hip-hop began in the 1970s in which US city?|New York City|Chicago|Seattle",
      "Rapping is also called...|MCing|DJing|breaking",
      "Which hip-hop element is dancing?|breaking|MCing|graffiti",
      "Spinning records and mixing beats is the job of the...|DJ|MC|dancer",
      "Making drum sounds with your mouth is called...|beatboxing|scatting|yodeling",
      "Using a snippet of an older recording in a new song is called...|sampling|tuning|transposing",
      "Which DJ is known for extending the breaks at Bronx parties in the 1970s?|DJ Kool Herc|Duke Ellington|Louis Armstrong",
      "Besides MCing, DJing and breaking, the fourth element of hip-hop culture is...|graffiti art|ballet|opera",
      "Flow in rapping means...|the rhythm and style of the delivery|the volume of the drums|the key of the song",
      "A drum machine is a device that...|plays programmed drum patterns|tunes a violin|writes lyrics"
    ], "Think about the four elements and the tools hip-hop artists use.", "One element is words, one is turntables, one is movement and one is painting."),

    L("Celtic music", [
      ["Where it comes from", "☘️", "<b>Celtic music</b> grows from the folk traditions of Ireland, Scotland and nearby lands. The <b>harp</b> is the national symbol of Ireland. A <b>session</b> is an informal gathering where musicians play tunes together."],
      ["Instruments", "🪈", "Common instruments are the <b>fiddle</b> (a violin played in folk style), <b>tin whistle</b>, <b>uilleann pipes</b> (bagpipes filled by a bellows under the elbow), and the <b>bodhrán</b> (a frame drum). The Highland bagpipe has drone pipes."],
      ["Dance tunes", "💃", "A <b>jig</b> is usually in 6/8. A <b>reel</b> is a quick tune in 4/4 (or 2/2). A <b>hornpipe</b> has a more swinging, steady feel."]
    ], [
      "A bodhrán is an Irish...|frame drum|flute|harp",
      "The tin whistle is a small...|flute-like pipe|drum|string instrument",
      "Uilleann pipes are bagpipes filled with air by...|a bellows under the elbow|the player's lungs only|a motor",
      "A jig is usually in which meter?|6/8|2/2|5/4",
      "A reel is a lively dance tune in...|4/4|3/4 waltz time|7/8",
      "A Highland bagpipe has a steady sound from its...|drone pipes|snare drum|bellows",
      "An informal gathering where folk musicians play tunes together is a...|session|recital|premiere",
      "Which instrument is the national symbol of Ireland?|harp|accordion|trumpet",
      "A fiddle is basically a...|violin played in folk style|small drum|keyboard",
      "Celtic music is rooted in which two nations, among others?|Ireland and Scotland|Egypt and Peru|Japan and Chile"
    ], "Think about the dances and the instruments that play them.", "Fiddle, whistle, pipes and frame drum, playing jigs (6/8) and reels (4/4)."),

    L("Tala: rhythm cycles of India", [
      ["The cycle", "🔁", "In Indian classical music a <b>tala</b> is a repeating rhythmic cycle of beats. The first beat of the cycle is called <b>sam</b>, and it is the strongest point. Players feel it as home."],
      ["Counting and grouping", "👏", "<b>Teental</b> has 16 beats, grouped 4 + 4 + 4 + 4. <b>Jhaptal</b> has 10 beats, grouped 2 + 3 + 2 + 3. Groups are shown by claps and waves."],
      ["Tabla and raga", "🥁", "The <b>tabla</b> is a pair of drums. Drum syllables like <b>dha</b> and <b>dhin</b> are called <b>bols</b>. A <b>raga</b> is the melodic framework, often with a <b>tanpura</b> playing a drone."]
    ], [
      "A tala is a...|rhythmic cycle|scale|singer",
      "The first beat of a tala cycle is called...|sam|raga|bol",
      "How many beats does teental have?|16|8|12",
      "Teental is grouped as...|4 + 4 + 4 + 4|3 + 3 + 3 + 3|5 + 5 + 6",
      "The pair of drums in Hindustani classical music is the...|tabla|sitar|tanpura",
      "Spoken drum syllables such as dha and dhin are called...|bols|ragas|talas",
      "A raga is a melodic framework with...|a scale, typical phrases and a mood|only a drum pattern|only words",
      "The tanpura plays a...|steady drone|fast solo|drum rhythm",
      "Hindustani and Carnatic are the two main traditions of...|Indian classical music|Celtic music|Baroque music",
      "How many beats does jhaptal have?|10|8|14"
    ], "Think about repeating cycles of beats, and the drums and syllables that mark them.", "A tala is a cycle, sam is its first beat, and bols name the drum strokes."),

    L("Impressionism", [
      ["A new colorful sound", "🌫️", "<b>Impressionism</b> in music began in France around 1890. It was named after painting. Composers like <b>Debussy</b> and <b>Ravel</b> wanted to suggest light, water and mist instead of telling a clear story."],
      ["Tools", "🎨", "They used rich colorful chords, <b>parallel chords</b>, the <b>whole-tone</b> and <b>pentatonic</b> scales, and blurry, floating forms. Chords do not always pull toward a goal."],
      ["Famous pieces", "⭐", "Debussy: <b>Clair de lune</b> and <b>La mer</b>. Ravel: <b>Boléro</b> and <b>Daphnis et Chloé</b>."]
    ], [
      "Impressionism in music began in which country?|France|Germany|Russia",
      "Two famous Impressionist composers are Debussy and...|Ravel|Handel|Haydn",
      "Impressionist music tries to suggest...|light, water and mood|a loud military battle|a clear story with words",
      "Impressionist composers often used the whole-tone scale and...|parallel chords|strict fugues|figured bass",
      "Clair de lune was written by...|Debussy|Mozart|Vivaldi",
      "Boléro was written by...|Ravel|Chopin|Brahms",
      "Impressionism in music was named after a style of...|painting|dance|architecture only",
      "Compared with a Classical symphony, Impressionist music is...|more floating and colorful|more strict in form|always much louder",
      "La mer by Debussy is about the...|sea|desert|city",
      "Impressionism came around which years?|about 1890 to 1920|about 1600 to 1700|about 1750 to 1800"
    ], "Think about painting that blurs edges and plays with light. How would music do that?", "Colorful chords, scales with no pull, and moods of light, water and mist."),

    L("Dictation steps", [
      ["Listen first", "👂", "In <b>dictation</b> you write down music you hear. First find the <b>beat</b> and the <b>meter</b>. Then listen for the <b>key</b> and the last note, often the tonic."],
      ["Chunks", "🧩", "Break the tune into <b>chunks</b> of 2 to 4 beats. Hear the <b>contour</b> (how it rises and falls), write the first and last notes, then fill in between."],
      ["Check it", "✅", "Sing or play your answer back and compare it with what you heard. Use interval songs to recognize big leaps."]
    ], [
      "Before writing a melody you hear, first find the...|beat and meter|volume|composer's name",
      "In melodic dictation, which notes often help most to write first?|first and last notes|only the middle notes|just the loudest note",
      "The rise and fall shape of a melody is its...|contour|timbre|tempo",
      "In rhythm dictation you should first feel the steady...|beat|key|chord",
      "If you hear the tune end on 'do', the final note is the...|tonic|dominant|leading tone",
      "After writing your first try, you should...|sing or play it back to check|throw it away|add random notes",
      "Listening in small pieces of 2 to 4 beats is called...|chunking|clipping|panning",
      "A big leap in a melody can be recognized by comparing it with...|a familiar interval song|a random guess|the volume",
      "The leading tone usually wants to go to the...|tonic|subdominant|supertonic"
    ], "Think about what to find first, and how to break a long tune into smaller bits.", "Find the beat and key, chunk the tune, anchor the first and last notes, then check."),

    L("Percussion notation and mallet instruments", [
      ["Writing for drums", "🥁", "Unpitched percussion can be written on a staff with only <b>one line</b>. Drum set music uses a five-line staff where each line or space is a drum or cymbal. Cymbals often use <b>x-shaped</b> noteheads."],
      ["Rolls", "///", "Slashes through a note stem show a <b>tremolo</b> or <b>roll</b>: many quick hits to make a long sound."],
      ["Mallet instruments", "🎹", "The <b>xylophone</b> has bright, dry wooden bars. The <b>marimba</b> has warmer, lower wooden bars with tubes under them called <b>resonators</b>. The <b>vibraphone</b> has metal bars and a motor that gives vibrato. The <b>glockenspiel</b> is small, metal, high and bell-like."]
    ], [
      "Which mallet instrument has metal bars and a motor that gives vibrato?|vibraphone|marimba|xylophone",
      "A marimba has bars made of...|wood|glass|plastic",
      "Which mallet instrument is small, metal, very high and bell-like?|glockenspiel|marimba|bass drum",
      "Unpitched percussion may be written on a staff with only...|one line|twelve lines|no lines at all",
      "In drum-set music, cymbals are often written with...|x-shaped noteheads|round hollow notes|stars",
      "Slashes through a note stem show a...|roll or tremolo|fermata|trill ornament",
      "The tubes under marimba bars act as...|resonators|keys|strings",
      "Compared with a marimba, a xylophone sounds...|higher, brighter and drier|lower and warmer|exactly the same",
      "Tubular bells are also called...|chimes|bongos|castanets",
      "Mallet instruments are played by hitting bars with...|mallets|bows|reeds"
    ], "Think about what each bar is made of and how a roll is written.", "Metal or wood, bright or warm: use that to tell the mallet instruments apart."),

    F("Cents: tiny pitch steps", [
      ["A fine ruler", "📏", "Musicians measure tiny pitch differences in <b>cents</b>. In equal temperament one <b>half step</b> is 100 cents."],
      ["Adding up", "➕", "A whole step is 200 cents. An octave is 12 half steps, so it is 1200 cents."],
      ["Out of tune", "🎯", "Ears can notice a difference of about 10 to 20 cents. A note 'x cents sharp' is that many cents too high."]
    ], centsQ),

    F("Frets and half steps", [
      ["Fret = half step", "🎸", "On a guitar each <b>fret</b> raises the pitch by one half step. The open strings are E A D G B E, from low to high."],
      ["The 12 notes", "🔢", "C, C sharp, D, D sharp, E, F, F sharp, G, G sharp, A, A sharp, B, then C again. Fret 12 gives the same note an octave higher."],
      ["Method", "🧭", "Start at the open string's note, then count one step in the list for each fret."]
    ], fretQ),

    F("Sound and distance", [
      ["Spreading out", "🔊", "Sound spreads in all directions, so it gets weaker as you move away."],
      ["The square rule", "²", "The intensity of sound falls with the <b>square of the distance</b>. Twice as far away means one fourth of the intensity."],
      ["Closer", "👂", "The rule works both ways: if you get closer, the intensity rises by the square of how many times closer you are."]
    ], distQ)
  ];
  l19.push(
    MIX("Mixed practice", l19.slice(0, 9)),
    MIX("Level 19 Challenge", l19.slice(9))
  );

  // ---------- level 20 computed questions ----------
  const waveQ = () => {
    const fs = [17, 34, 68, 85, 170, 340];
    if (Math.random() < 0.6) {
      const f = pick(fs), f2 = pick(fs.filter(x => x !== f));
      return {
        text: `Sound travels at 340 meters per second. A note has a frequency of ${f} Hz. What is its wavelength in meters?`, answer: 340 / f,
        hints: ["Wavelength is how far the sound travels during one wave. Use: wavelength = speed divided by frequency.",
          "Divide the speed of sound by the frequency (the number of waves each second). Check that your answer is in meters.",
          `Example: at ${f2} Hz the wavelength is 340 / ${f2} = ${340 / f2} meters. Now do yours.`]
      };
    }
    const f = pick(fs), f2 = pick(fs.filter(x => x !== f)), w = 340 / f;
    return {
      text: `Sound travels at 340 meters per second. A note has a wavelength of ${w} meter${w > 1 ? "s" : ""}. What is its frequency in Hz?`, answer: f,
      hints: ["Use the same rule backward: wavelength = speed divided by frequency, so frequency = speed divided by wavelength.",
        "Divide the speed of sound by the wavelength. The result tells you how many waves pass each second.",
        `Example: a wavelength of ${340 / f2} meters gives 340 / ${340 / f2} = ${f2} Hz. Now do yours.`]
    };
  };

  const repeatQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const a = ri(2, 8), b = ri(2, 8), a2 = pick([3, 4, 5, 6].filter(x => x !== a)), b2 = pick([2, 4, 6].filter(x => x !== b));
      return {
        text: `A song has a first section of ${a} measures with a repeat sign, then a second section of ${b} measures with no repeat. How many measures are played altogether?`, answer: 2 * a + b,
        hints: ["A repeated section is played twice. A section with no repeat is played once.",
          "Count the repeated section two times, then add the section that is played only one time.",
          `Example: a repeated section of ${a2} measures and one of ${b2} measures gives 2 x ${a2} + ${b2} = ${2 * a2 + b2}. Now do yours.`]
      };
    }
    if (t === 1) {
      const m = ri(4, 8), e1 = ri(1, 3), e2 = ri(1, 3), m2 = pick([4, 5, 6, 8].filter(x => x !== m));
      return {
        text: `A repeated section has ${m} measures, then a 1st ending of ${e1} measure${e1 > 1 ? "s" : ""} and a 2nd ending of ${e2} measure${e2 > 1 ? "s" : ""}. On the repeat the player skips the 1st ending. How many measures are played in all?`, answer: 2 * m + e1 + e2,
        hints: ["The main section is played twice. Each ending is played only once: the first time through, then the second.",
          "Add up: the main section two times, plus the 1st ending once, plus the 2nd ending once.",
          `Example: a section of ${m2} measures with endings of 1 and 2 measures gives ${m2} + 1 + ${m2} + 2 = ${2 * m2 + 3}. Now do yours.`]
      };
    }
    const n = ri(8, 24), f = ri(3, n - 3), n2 = pick([10, 12, 16]), f2 = ri(4, 8);
    return {
      text: `A piece has ${n} measures. At the end the music says D.C. al Fine, and the word Fine is above measure ${f}. How many measures are played in all?`, answer: n + f,
      hints: ["D.C. al Fine means go back to the very beginning and play until you reach Fine.",
        "You play the whole piece once, then play again from the beginning up to the measure marked Fine.",
        `Example: with ${n2} measures and Fine at measure ${f2}, you play ${n2} + ${f2} = ${n2 + f2}. Now do yours.`]
    };
  };

  // ======================= LEVEL 20 =======================
  const l20 = [
    L("The octatonic scale", [
      ["Eight notes", "8", "The <b>octatonic scale</b> has 8 different notes in an octave. It alternates <b>whole and half steps</b> (W-H-W-H...) or half and whole. It is also called the <b>diminished scale</b>."],
      ["Symmetry", "🪞", "The pattern repeats every <b>minor third</b> (3 half steps). Starting on C, the whole-half form is C D E flat F G flat A flat A B, then C."],
      ["Who used it", "⭐", "Rimsky-Korsakov, Stravinsky and Bartók used it. Jazz players use the half-whole form over dominant 7th chords."]
    ], [
      "How many different notes per octave does an octatonic scale have?|8|7|12",
      "An octatonic scale alternates...|whole and half steps|only whole steps|only half steps",
      "Another name for the octatonic scale is the...|diminished scale|major scale|pentatonic scale",
      "The octatonic pattern repeats every...|minor third|perfect fifth|octave only",
      "How many half steps are in one whole step plus one half step?|3|2|4",
      "In a whole-half octatonic scale starting on C, the second note is...|D|D flat|E flat",
      "In a whole-half octatonic scale starting on C, the third note is...|E flat|E|F",
      "Composers who used octatonic scales include...|Stravinsky and Bartók|Handel and Vivaldi|Haydn and Mozart",
      "Which scale has more notes per octave?|octatonic|major|pentatonic"
    ], "Think about a pattern that goes up, then up, then up, then up, in two alternating step sizes.", "Count the steps: a whole step is two half steps. The scale alternates the two sizes."),

    L("Tritone substitution", [
      ["A swap in jazz", "🔄", "In jazz, a dominant 7th chord can be swapped for another dominant 7th chord whose root is a <b>tritone</b> (6 half steps) away. For G7 the substitute is D flat 7."],
      ["Why it works", "🔑", "G7 has B and F as its 3rd and 7th. D flat 7 has F and C flat (which sounds like B). The same two notes are in both chords, just swapped."],
      ["In a progression", "⬇️", "In C, ii-V-I is Dm7 - G7 - Cmaj7. With the substitute it becomes Dm7 - D flat 7 - Cmaj7, and the bass moves down by half steps."]
    ], [
      "A tritone is how many half steps?|6|5|7",
      "The tritone substitute for G7 is...|D flat 7|F7|A7",
      "The tritone substitute for C7 is...|G flat 7|F7|G7",
      "Tritone substitution swaps a dominant 7th chord for another dominant 7th a ___ away.|tritone|fifth|whole step",
      "G7 and D flat 7 share the same 3rd and 7th. These are the notes...|B and F|G and D|C and E",
      "In C major, ii-V-I with a tritone substitute becomes Dm7 - ? - Cmaj7.|D flat 7|G7|A7",
      "In Dm7 - D flat 7 - Cmaj7 the bass moves by...|half steps downward|leaps of a fifth|octaves upward",
      "The tritone substitute for A7 is...|E flat 7|D7|E7",
      "The tritone substitute for D7 is...|A flat 7|G7|A7",
      "Tritone substitution is most used in...|jazz|plainchant|marches"
    ], "Count six half steps from the root of the chord.", "The substitute shares the same two important notes, the 3rd and the 7th."),

    L("Secondary leading-tone chords", [
      ["Borrowing a leading tone", "🎯", "A <b>secondary leading-tone chord</b> is a diminished chord built on the leading tone of a chord other than I. It is written like vii°/V ('seven diminished of five')."],
      ["Example", "C: F♯ A C E♭", "In C major the target V is G, and its leading tone is F sharp. So vii°7/V is F sharp, A, C, E flat. It resolves to G."],
      ["Finding the root", "🧭", "The root is always a half step below the root of the target chord. The chord brings in notes from outside the key."]
    ], [
      "In C major, the leading tone of G is...|F sharp|F|A",
      "vii°7/V is a diminished seventh chord built on the leading tone of...|V|I|IV",
      "In C major, vii°/V (triad) contains the notes F sharp, A and...|C|D|E",
      "vii°/V resolves to...|V|IV|ii",
      "In G major, vii°7/V is built on which note?|C sharp|B|F sharp",
      "In C major, vii°/ii is built on which note?|C sharp|B|D sharp",
      "Secondary chords add notes to a key from...|outside the key (accidentals)|only inside the key|the drums",
      "A fully diminished seventh chord is built from stacked...|minor thirds|major thirds|perfect fifths",
      "In F major, vii°/V is built on which note?|B|B flat|E"
    ], "Find the target chord's root first. The new chord starts a half step below that.", "Half step below the target's root = root of the secondary leading-tone chord."),

    L("Chromatic mediants", [
      ["Thirds apart", "3️⃣", "<b>Chromatic mediant</b> chords have roots a <b>third</b> apart, but they are not both in the same key. C major to E major or to A flat major are examples."],
      ["A shared note", "🔗", "They share only <b>one common tone</b>. C major (C E G) and E major (E G sharp B) share E. C major and A flat major (A flat C E flat) share C."],
      ["The effect", "🌟", "The feeling is dreamy, magical or mysterious. Romantic composers and film composers use them to create wonder."]
    ], [
      "Chromatic mediant chords have roots a ___ apart.|third|second|fifth",
      "C major and E major have how many notes in common?|1|0|3",
      "C major and A flat major share the note...|C|D|B",
      "Chromatic mediants are often used in film music for a feeling of...|wonder or mystery|marching|silence",
      "Which chord is a chromatic mediant of C major?|E major|G major|F major",
      "E minor in the key of C major is a...|diatonic mediant|chromatic mediant|tritone",
      "Which chord is a chromatic mediant of G major?|B major|D major|C major",
      "Chromatic mediants sound smooth partly because they share...|a common tone|every note|no notes at all",
      "Chromatic mediants avoid the usual strong...|dominant-tonic pull|time signature|melody",
      "A flat major is a chromatic mediant of C major because its root is a ___ below C.|major third|perfect fifth|half step"
    ], "Think about how far apart the roots are and how many notes the two chords have in common.", "Roots a third apart, both chords outside each other's key, one common tone."),

    L("Phrase, period and sentence", [
      ["Phrases", "〰️", "A <b>phrase</b> is a musical sentence that ends with a <b>cadence</b>. A typical phrase is 4 measures long."],
      ["The period", "❓❗", "A <b>period</b> has two phrases: the <b>antecedent</b> (like a question) ends with a half cadence, and the <b>consequent</b> (like an answer) ends with an authentic cadence. A period is usually 8 measures."],
      ["The sentence", "1️⃣1️⃣2️⃣", "A <b>sentence</b> has a short idea, a repeat of the idea, then a <b>continuation</b> that builds to a cadence. In an 8-bar sentence, the opening idea is 2 bars."]
    ], [
      "A period has two phrases called the...|antecedent and consequent|exposition and recap|verse and chorus",
      "The antecedent phrase usually ends with a...|half cadence|authentic cadence|deceptive cadence",
      "The consequent phrase usually ends with an...|authentic cadence|half cadence|upbeat",
      "A typical phrase is how many measures long?|4|3|13",
      "A typical period has how many measures?|8|4|6",
      "A sentence has a short idea, a repeat of it, then a...|continuation that builds to a cadence|silence|key change",
      "The antecedent and consequent are like...|a question and its answer|two rests|a rhythm and a tempo",
      "In a parallel period both phrases begin with...|the same melody|different keys|drum fills",
      "In a typical 8-bar sentence, the basic idea is how many bars long?|2|1|5",
      "A cadence marks the end of a...|phrase|clef|key signature"
    ], "Picture a question phrase and an answer phrase, or an idea, its repeat and a longer ending.", "Count in 4-bar phrases. A period is two of them. A sentence is idea, repeat, continuation."),

    L("The cantata and the Passion", [
      ["Cantata", "⛪", "A <b>cantata</b> (from the Italian word for 'to sing') is a work for singers and instruments in several movements. Bach wrote hundreds, mostly for church services."],
      ["Parts", "🎶", "A cantata mixes <b>chorus</b>, <b>recitative</b> (singing that imitates speech), <b>aria</b> (a melodic solo song) and a <b>chorale</b> (a simple hymn tune sung by all)."],
      ["Passion", "📖", "A <b>Passion</b> tells the story of Jesus's last days in music. In Bach's <b>St Matthew Passion</b> a tenor called the <b>Evangelist</b> narrates, with chorus, soloists and orchestra."]
    ], [
      "A cantata is a work for...|singers and instruments, in several movements|solo piano alone|marching band",
      "Bach wrote cantatas mostly for...|church services|video games|the circus",
      "A recitative is a part that imitates...|speech|dance|a drum solo",
      "An aria is a song that...|has a melodic tune for one singer|is chanted on one note|has only drums",
      "A chorale is a simple hymn tune sung by...|all together|a solo drummer|a crowd of trumpets",
      "A Passion tells the story of...|Jesus's last days|a sea voyage|a royal wedding",
      "In a Passion, the narrator who sings the story is the...|Evangelist|conductor|continuo",
      "Who wrote hundreds of church cantatas?|Bach|Chopin|Debussy",
      "Cantata comes from the Italian word meaning...|to sing|to dance|to play",
      "Bach's St Matthew Passion has an orchestra and...|chorus and soloists|only one flute|only rain sounds"
    ], "Think about the parts that make up a cantata, and what a Passion is about.", "A cantata is sung, in many movements. A Passion is a sung story with an Evangelist."),

    L("Music therapy", [
      ["What it is", "💚", "<b>Music therapy</b> uses music to help people reach goals for health and well-being. A trained <b>music therapist</b> plans the activities."],
      ["How music helps", "🎵", "A steady rhythm can help people practice walking. Singing can help with speech and memory. Calm slow music can help people relax and feel less worried."],
      ["Who it helps", "🏥", "Music therapy is used in hospitals, schools and care homes. Playing in a group helps people share feelings and work together. The music is chosen to fit the person's needs and likes."]
    ], [
      "A music therapist uses music to help people with...|health and well-being goals|only taxes|repairing instruments",
      "A steady rhythm can help some people practice...|walking|swimming underwater|baking",
      "Singing familiar songs can help some people...|recall memories|forget everything|learn Chinese instantly",
      "Calm slow music can help people feel...|relaxed|angry|sleepy forever",
      "Music therapists are...|trained professionals|random strangers|robots only",
      "Playing drums in a group can help people express feelings and...|work together|forget music|stay silent",
      "Therapists choose music based on a person's...|needs and likes|zodiac sign|shoe size",
      "Music in hospitals can help patients feel less...|worried|tall|hungry",
      "A common goal of music therapy for children is to improve...|communication and focus|bike repair|cooking",
      "A lullaby is soothing partly because it is...|slow, soft and repetitive|fast and loud|full of silence"
    ], "Think about how music can calm, help movement or help communication.", "A trained therapist picks the right music for each person's goal."),

    L("Music education methods", [
      ["Kodály", "🇭🇺", "<b>Kodály</b> (Zoltán Kodály, Hungary) teaches through singing, folk songs, <b>movable-do solfège</b> and hand signs."],
      ["Orff and Dalcroze", "🥁", "<b>Orff Schulwerk</b> (Carl Orff) uses speech, movement and simple instruments like xylophones and drums. <b>Dalcroze</b> (Émile Jaques-Dalcroze) teaches rhythm through body movement, called <b>eurhythmics</b>."],
      ["Suzuki", "🎻", "<b>Suzuki</b> (Shinichi Suzuki, Japan) starts very young. Children learn by ear first, like learning a mother tongue, and parents take part."]
    ], [
      "Which method is built on singing, folk songs and hand signs?|Kodály|Suzuki|Orff",
      "Which method uses xylophones, drums, speech and movement?|Orff|Suzuki|Kodály",
      "Which method teaches rhythm through body movement (eurhythmics)?|Dalcroze|Kodály|Suzuki",
      "Which method has children learn by ear first, like a mother tongue?|Suzuki|Dalcroze|Kodály",
      "Kodály was from which country?|Hungary|Japan|Brazil",
      "Suzuki was from which country?|Japan|Hungary|Germany",
      "Eurhythmics means learning rhythm through...|movement|silence|reading only",
      "In the Suzuki method, who takes part in lessons along with the child?|a parent|the conductor|the tuner",
      "Carl Orff's classroom instruments include...|xylophones and glockenspiels|electric organs|tubas and trombones",
      "Movable-do solfège uses do as the...|first note of any major key|always C|always G"
    ], "Match the name to the country and the main idea of each method.", "Singing and hand signs, mallet instruments, body movement, learning by ear."),

    L("A history of recorded sound", [
      ["Early sound", "📼", "Thomas Edison invented the <b>phonograph</b> in 1877. It recorded sound on a cylinder. Soon after, flat <b>discs</b> played on a gramophone took over."],
      ["New formats", "💿", "The <b>LP</b> (long-playing vinyl record, 33 and a third turns a minute) arrived in 1948. Magnetic <b>tape</b> allowed multitrack recording and later the <b>cassette</b>. The <b>CD</b> (1982) stores sound as tiny pits read by a laser."],
      ["Digital", "🌐", "<b>MP3</b> files use <b>compression</b> to make files small. <b>Streaming</b> plays music over the internet without keeping a copy."]
    ], [
      "Who invented the phonograph in 1877?|Thomas Edison|Mozart|Henry Ford",
      "Early phonograph recordings were made on...|cylinders|CDs|memory chips",
      "A long-playing record (LP) spins at about...|33 and a third turns a minute|78 turns a minute|150 turns a minute",
      "Which came first: the phonograph, the CD or the MP3?|phonograph|CD|MP3",
      "Magnetic tape let engineers record on several...|tracks|keyboards|conductors",
      "The compact disc stores music as...|tiny pits read by a laser|magnetic dots|scratches read by a needle",
      "A cassette tape holds sound on...|magnetic tape|a tiny disc|a vinyl groove",
      "MP3 files are small because they use...|compression|longer cables|bigger speakers",
      "Streaming means listening to music...|over the internet without keeping a copy|only from vinyl|only live",
      "An old gramophone needle followed the wiggles in a...|groove|string|tube"
    ], "Put the formats in order: from cylinders to discs, tape, CDs and then files.", "Mechanical first (cylinder, groove), then magnetic tape, then laser discs, then files."),

    L("Counting rhythms: syllable systems", [
      ["Number counting", "1 e & a", "Many people count sixteenth notes as <b>1 e & a</b>. The <b>&</b> falls halfway through the beat. Four sixteenth notes fit in one quarter-note beat."],
      ["Kodály syllables", "ta ti-ti", "A quarter note is <b>ta</b>. Two eighth notes are <b>ti-ti</b>. A half note is <b>ta-a</b>."],
      ["Takadimi", "ta ka di mi", "<b>Takadimi</b> names the beat <b>ta</b>. Two eighth notes are <b>ta di</b>. Four sixteenth notes are <b>ta ka di mi</b>."]
    ], [
      "In '1 e & a', the & falls on the...|eighth-note halfway point of the beat|start of the next bar|first sixteenth",
      "How many sixteenth notes fit in one quarter-note beat?|4|2|8",
      "In Takadimi, 'ta' is...|the beat|the off-beat|a rest",
      "In Takadimi, two eighth notes on one beat are spoken...|ta di|ta ka|di mi",
      "In Takadimi, four sixteenth notes are...|ta ka di mi|ta ti ta ti|1 & 2 &",
      "The Kodály name for a quarter note is...|ta|ti-ti|ta-a",
      "The Kodály name for two eighth notes in one beat is...|ti-ti|ta|ta-a",
      "A half note in Kodály counting is...|ta-a|ti-ti|ta",
      "Triplets are often counted...|trip-a-let|1 e & a|ta ka di mi",
      "In Takadimi, the 'di' falls...|halfway through the beat|on the beat|after the bar"
    ], "Think about how many equal parts each beat is split into.", "Ta is the beat. Split it in two for eighths, in four for sixteenths."),

    L("Vocal registers and techniques", [
      ["Registers", "🗣️", "The <b>chest voice</b> is lower and fuller. The <b>head voice</b> is higher and lighter. <b>Falsetto</b> is a light, airy sound above the normal range. The change point between registers is called the <b>passaggio</b>."],
      ["Techniques", "〰️", "<b>Vibrato</b> is a small, quick wave in pitch. <b>Belting</b> is a strong, loud, chest-dominant sound. <b>Yodeling</b> flips quickly between chest and head voice."],
      ["Care", "💧", "Warm up, drink water and rest. Singing loudly all the time can hurt the voice."]
    ], [
      "The lower, fuller part of the voice is the...|chest voice|head voice|whistle voice",
      "The higher, lighter part of the voice is the...|head voice|chest voice|stage voice",
      "A light, airy sound above the normal range is...|falsetto|vibrato|staccato",
      "The change point between registers is called the...|passaggio|crescendo|coda",
      "A small, quick wave in pitch is...|vibrato|tremolo drum|legato",
      "A strong, loud, chest-dominant singing style is...|belting|whispering|humming",
      "Yodeling flips quickly between...|chest and head voice|bass and treble clefs|major and minor keys",
      "Before singing for a long time you should...|warm up|shout|skip water",
      "A singer who sounds richer when low is using the...|chest voice|falsetto|head voice",
      "Rest and water help keep the voice...|healthy|louder only|out of tune"
    ], "Think about low and full, high and light, or special techniques.", "Chest is low, head is high, falsetto is airy, and the break between them is the passaggio."),

    L("Music of Oceania and Native America", [
      ["Oceania", "🌺", "Aboriginal peoples of northern Australia play the <b>didgeridoo</b>, a long wooden drone instrument. The Maori of New Zealand perform the <b>haka</b>, a group chant with strong movements. In Hawaii, <b>slack-key guitar</b> and <b>hula</b> with chant are loved traditions."],
      ["Native America", "🪶", "Many Native American peoples sing around a large <b>powwow drum</b>. The <b>Native American flute</b> has a soft, breathy sound. <b>Rattles</b> add rhythm. Songs are often passed down by ear."],
      ["Respect", "🤝", "These musics belong to living cultures. Listen with respect and learn from the communities themselves."]
    ], [
      "The didgeridoo is a long wooden instrument that makes a...|drone|bell sound|piano tone",
      "The didgeridoo comes from the Aboriginal peoples of...|Australia|Iceland|Canada",
      "The haka is a group chant with strong movements from the...|Maori of New Zealand|Swiss Alps|Caribbean",
      "Slack-key guitar is a loved tradition in...|Hawaii|Norway|Peru",
      "Many Native American peoples sing around a large...|powwow drum|church organ|piano",
      "The Native American flute has a...|soft, breathy sound|loud brassy blast|sharp electric buzz",
      "Many traditional songs are passed down...|by ear, from person to person|only on records|only in books",
      "The ukulele became very popular in...|Hawaii|Greenland|Mongolia",
      "A rattle adds...|rhythm|harmony chords|a melody",
      "A good way to learn about traditional music is to...|listen with respect and learn from the community|copy it without asking|ignore its history"
    ], "Match the instrument or dance to the place and people it belongs to.", "Drone from Australia, haka from New Zealand, slack key from Hawaii, powwow drum from North America."),

    L("Rock after the 1960s", [
      ["Heavy and prog", "🎸", "In the 1970s <b>hard rock</b> and <b>heavy metal</b> used loud, heavy guitar riffs. <b>Progressive rock</b> played long pieces with odd meters and changes, like Pink Floyd's album <i>The Dark Side of the Moon</i> (1973)."],
      ["Punk", "⚡", "<b>Punk</b> arrived in the mid-1970s. It was short, fast and simple, often with just three chords, played by bands such as the Ramones."],
      ["80s and 90s", "📻", "<b>New wave</b> brought synthesizers in the 1980s. In the early 1990s <b>grunge</b> grew in Seattle, with bands like Nirvana, and <b>alternative rock</b> became popular."]
    ], [
      "Which style uses loud, heavy guitar riffs?|heavy metal|bluegrass|plainchant",
      "Which style plays long pieces with odd meters and changes?|progressive rock|punk|disco",
      "Punk songs were usually...|short, fast and simple|long and slow|written for orchestra",
      "Which band is a famous punk band?|the Ramones|the Beatles|the Beach Boys",
      "New wave in the 1980s often used...|synthesizers|bagpipes|church organs",
      "Grunge grew up in which US city?|Seattle|Miami|Denver",
      "Which album from 1973 is a famous progressive rock album?|The Dark Side of the Moon|Four Seasons|Boléro",
      "Punk often used only about how many chords?|three|twelve|thirty",
      "Alternative rock became very popular in the...|1990s|1920s|1850s",
      "A riff is a short repeated...|melody or chord pattern|rest|clef"
    ], "Think about the decade and the mood: heavy, long, fast or electronic.", "Heavy in the 1970s, punk fast and simple, new wave synths, grunge from Seattle."),

    L("Electronic dance music", [
      ["The beat", "🎛️", "Most dance music has a steady <b>four on the floor</b> beat: the kick drum plays on every beat. <b>House</b> began in Chicago and is about 120 to 130 BPM. <b>Techno</b> began in Detroit."],
      ["Fast styles", "⚡", "<b>Trance</b> builds long, rising melodies. <b>Drum and bass</b> from the UK is very fast, about 160 to 180 BPM. <b>Dubstep</b> has a wobbling bass and sits around 140 BPM."],
      ["DJ moves", "🎧", "A DJ blends tracks smoothly by matching their <b>BPM</b>. A <b>build</b> raises the energy and the <b>drop</b> is when the beat comes crashing back in."]
    ], [
      "In 'four on the floor' the kick drum plays on...|every beat|only beat 1|only beats 2 and 4",
      "House music began in which US city?|Chicago|Nashville|Seattle",
      "Techno began in which US city?|Detroit|Boston|Austin",
      "House music is usually about...|120 to 130 BPM|40 to 60 BPM|300 BPM",
      "Which style is very fast, about 160 to 180 BPM?|drum and bass|house|lullaby",
      "Dubstep is known for its...|wobbling bass|violin solos|harp glissandos",
      "A DJ blends two tracks smoothly by matching their...|BPM|clef|key signature only",
      "The moment when the beat comes crashing back is the...|drop|build|coda",
      "A build in dance music usually...|raises the energy|ends the song|gets quieter and quieter",
      "Drum and bass began in which country?|the UK|Brazil|Egypt"
    ], "Think about the steady kick drum and the speed of each style.", "House is steady and medium-fast, drum and bass is very fast, and the drop follows the build."),

    L("Quartal harmony and clusters", [
      ["Stacked fourths", "4️⃣", "Most chords stack thirds. A <b>quartal</b> chord stacks <b>perfect fourths</b>, like C F B flat. It sounds open and modern. <b>Quintal</b> chords stack fifths, like C G D."],
      ["The 'So What' chord", "🎷", "Miles Davis's <b>So What</b> uses a chord of three perfect fourths topped by a major third: E A D G B. Jazz players love quartal voicings."],
      ["Clusters", "✊", "A <b>cluster</b> is a group of neighboring notes played together, often with a fist or forearm on the piano. Henry Cowell made clusters famous."]
    ], [
      "A quartal chord is built by stacking...|perfect fourths|major thirds|octaves",
      "A quintal chord is built by stacking...|perfect fifths|perfect fourths|half steps",
      "Most traditional chords stack...|thirds|fourths|seconds",
      "Which chord is quartal?|C F B flat|C E G|C E flat G flat",
      "A tone cluster is a group of ___ notes sounded together.|neighboring|widely spread|silent",
      "A cluster on the piano may be played with a...|fist or forearm|bow|mallet only",
      "Which composer made tone clusters famous on the piano?|Henry Cowell|Haydn|Vivaldi",
      "Quartal chords sound...|open and modern|sweet and Baroque|heavy and metallic",
      "The So What chord begins with three stacked...|perfect fourths|minor sixths|whole steps",
      "From C, one perfect fourth up is...|F|G|D"
    ], "Think about the interval that is stacked, instead of thirds.", "Fourths stack like thirds in an ordinary chord, but each gap is a fourth."),

    L("Compound intervals", [
      ["More than an octave", "↕️", "A <b>compound interval</b> is larger than an octave. A ninth is an octave plus a second. A tenth is an octave plus a third."],
      ["Simple version", "➖", "To simplify, subtract 7 from the number: a ninth becomes a second (9 - 7), a tenth becomes a third, a twelfth becomes a fifth, a thirteenth becomes a sixth."],
      ["Sizes", "📏", "A major ninth is 14 half steps (12 + 2). From C up to the D above the next octave is a major ninth. Jazz chords use 9ths, 11ths and 13ths."]
    ], [
      "A ninth is an octave plus a...|second|third|fourth",
      "A tenth reduces to a simple...|third|fourth|sixth",
      "A major ninth contains how many half steps?|14|13|12",
      "From C up to the next D above the octave is a...|major ninth|major second|major tenth",
      "Compound intervals are larger than an...|octave|fifth|third",
      "A perfect twelfth is an octave plus a...|perfect fifth|perfect fourth|major sixth",
      "A thirteenth reduces to a simple...|sixth|seventh|fifth",
      "From C up to the E above the octave is a...|major tenth|major third|major ninth",
      "An octave plus a perfect fourth is a perfect...|eleventh|ninth|twelfth"
    ], "Count the octave as 7 steps in the number, then add what is left.", "Subtract 7 from the interval number to find the simple interval."),

    F("Wavelength", [
      ["How long is a wave?", "🌊", "<b>Wavelength</b> is the distance one full wave travels. In air, sound moves at about 340 meters each second."],
      ["The rule", "➗", "<b>Wavelength = speed ÷ frequency</b>. A higher note has a shorter wavelength. A low note has a long one."],
      ["Example", "📏", "At 170 Hz, the wavelength is 340 ÷ 170 = 2 meters."]
    ], waveQ),

    F("Counting measures with repeats", [
      ["Repeat signs", "🔁", "A section with a <b>repeat sign</b> is played twice. A section with no repeat sign is played once."],
      ["Endings", "1. 2.", "With a <b>1st and 2nd ending</b>, you play the section and the 1st ending, then repeat the section and skip to the 2nd ending."],
      ["D.C. al Fine", "🔚", "<b>D.C. al Fine</b> means go back to the beginning and play until the word <b>Fine</b>."]
    ], repeatQ)
  ];
  l20.push(
    MIX("Mixed practice", l20.slice(0, 9)),
    MIX("Level 20 Challenge", l20.slice(9))
  );

  // ---------- level 21 computed questions ----------
  const periodQ = () => {
    const ms = [1, 2, 4, 5, 8, 10, 20], fs = [1000, 500, 250, 200, 125, 100, 50];
    const i = ri(0, 6), j = pick([0, 1, 2, 3, 4, 5, 6].filter(x => x !== i));
    if (Math.random() < 0.5) {
      return {
        text: `A sound wave repeats once every ${ms[i]} milliseconds. What is its frequency in Hz? (1 second = 1000 milliseconds.)`, answer: fs[i],
        hints: ["Frequency is how many full waves happen in one second. Think about how many fit into one thousand milliseconds.",
          "Divide 1000 by the time of one wave in milliseconds. The result is the number of waves per second.",
          `Example: a wave every ${ms[j]} milliseconds is 1000 / ${ms[j]} = ${fs[j]} Hz. Now do yours.`]
      };
    }
    return {
      text: `A note has a frequency of ${fs[i]} Hz. How long does one wave take, in milliseconds? (1 second = 1000 milliseconds.)`, answer: ms[i],
      hints: ["The period is the time for one wave. It is the opposite of frequency: more waves per second means a shorter wave.",
        "Divide 1000 by the frequency. The result is how many milliseconds one wave takes.",
        `Example: ${fs[j]} Hz means 1000 / ${fs[j]} = ${ms[j]} milliseconds per wave. Now do yours.`]
    };
  };

  const digitalQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const R = pick([8, 16, 32, 48, 96]), R2 = pick([8, 16, 32, 48, 96].filter(x => x !== R));
      return {
        text: `A recording is sampled ${R} thousand times each second (${R} kHz). By the Nyquist rule, the highest pitch it can capture is half of that. What is it in kHz?`, answer: R / 2,
        hints: ["The Nyquist rule says you need at least two samples for every wave of the highest pitch.",
          "So the highest pitch you can capture is the sample rate divided by two.",
          `Example: a ${R2} kHz recording captures up to ${R2} / 2 = ${R2 / 2} kHz. Now do yours.`]
      };
    }
    if (t === 1) {
      const f = pick([4, 8, 10, 12, 20]), f2 = pick([4, 8, 10, 12, 20].filter(x => x !== f));
      return {
        text: `You want to record sounds as high as ${f} kHz. What is the lowest sample rate in kHz that works, by the Nyquist rule?`, answer: 2 * f,
        hints: ["The Nyquist rule links the highest pitch to the sample rate. You need more than one sample per wave.",
          "You need at least two samples for each wave of the highest pitch, so the sample rate is double the pitch.",
          `Example: to record up to ${f2} kHz you need ${f2} x 2 = ${2 * f2} kHz. Now do yours.`]
      };
    }
    if (t === 2) {
      const b = pick([2, 3, 4, 5, 6, 8]), b2 = pick([2, 3, 4, 5, 6].filter(x => x !== b));
      return {
        text: `Each sample is stored with ${b} bits. How many different loudness levels can it store?`, answer: 2 ** b,
        hints: ["Each bit can be 0 or 1, so each extra bit doubles the number of possibilities.",
          "Multiply 2 by itself once for each bit.",
          `Example: ${b2} bits gives ${Array(b2).fill(2).join(" x ")} = ${2 ** b2} levels. Now do yours.`]
      };
    }
    const n = ri(2, 9), n2 = pick([2, 3, 4, 5].filter(x => x !== n));
    return {
      text: `A sound is sampled 1000 times each second. How many samples are taken in ${n} seconds?`, answer: 1000 * n,
      hints: ["Find how many samples happen in one second, then think about how many seconds there are.",
        "Multiply the samples each second by the number of seconds.",
        `Example: ${n2} seconds at 1000 samples a second is ${n2} x 1000 = ${1000 * n2} samples. Now do yours.`]
    };
  };

  const countQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const n = ri(3, 6), fact = [1, 1, 2, 6, 24, 120, 720], n2 = pick([3, 4, 5].filter(x => x !== n));
      return {
        text: `You have ${n} different notes and play each one exactly once, in any order. How many different orders are there?`, answer: fact[n],
        hints: ["For the first spot you have the most choices. For each next spot you have one fewer.",
          "Multiply the number of choices for each spot: all of the notes for the first, one fewer for the next, and so on down to 1.",
          `Example: with ${n2} notes there are ${Array.from({ length: n2 }, (_, k) => n2 - k).join(" x ")} = ${fact[n2]} orders. Now do yours.`]
      };
    }
    if (t === 1) {
      const k = ri(2, 5), L2 = ri(2, 4), k2 = pick([2, 3, 4].filter(x => x !== k)), L3 = pick([2, 3].filter(x => x !== L2));
      return {
        text: `You can choose from ${k} different notes for each spot in a melody that is ${L2} notes long, and notes may repeat. How many different melodies are possible?`, answer: k ** L2,
        hints: ["Each spot in the melody has the same number of choices, no matter what came before.",
          "Multiply the number of choices by itself once for each note in the melody.",
          `Example: ${k2} notes to choose from and ${L3} spots gives ${Array(L3).fill(k2).join(" x ")} = ${k2 ** L3}. Now do yours.`]
      };
    }
    const b = ri(3, 7), b2 = pick([3, 4, 5, 6].filter(x => x !== b));
    return {
      text: `A rhythm has ${b} beats. On each beat you either play a note or rest. How many different rhythms are possible?`, answer: 2 ** b,
      hints: ["Each beat has exactly two choices, and each choice is independent of the others.",
        "Double the number of possibilities once for every beat.",
        `Example: ${b2} beats gives ${Array(b2).fill(2).join(" x ")} = ${2 ** b2} rhythms. Now do yours.`]
    };
  };

  // ======================= LEVEL 21 =======================
  const l21 = [
    L("Modes of the melodic minor scale", [
      ["Jazz melodic minor", "🎷", "In jazz the <b>melodic minor</b> scale uses the raised 6th and 7th both up and down. C melodic minor is C D E flat F G A B."],
      ["Its modes", "🔢", "Start on each note for a new mode: 1 melodic minor, 2 <b>Dorian flat 2</b>, 3 <b>Lydian augmented</b>, 4 <b>Lydian dominant</b>, 5 <b>Mixolydian flat 6</b>, 6 <b>Locrian natural 2</b>, 7 <b>altered</b>."],
      ["Altered", "🌀", "The <b>altered scale</b> (7th mode) is played over dominant chords with tension. B altered uses the notes of C melodic minor, starting on B."]
    ], [
      "C melodic minor (jazz form) is C D E flat F G A and...|B|B flat|A flat",
      "The altered scale is the ___ mode of melodic minor.|seventh|second|fourth",
      "The altered scale is often played over a...|dominant seventh chord with tension notes|plain major triad|plain minor triad",
      "Lydian dominant is the ___ mode of melodic minor.|fourth|third|sixth",
      "Lydian dominant combines a raised fourth with a...|flat seventh|major seventh|flat second",
      "Locrian natural 2 is the ___ mode of melodic minor.|sixth|first|fifth",
      "Lydian augmented is the ___ mode of melodic minor.|third|fifth|seventh",
      "The second mode of melodic minor is called...|Dorian flat 2|Lydian dominant|altered",
      "The altered scale starting on B uses the notes of which melodic minor scale?|C melodic minor|B melodic minor|D melodic minor",
      "Mixolydian flat 6 is the ___ mode of melodic minor.|fifth|second|third"
    ], "Count the modes by the scale degree you start on.", "The modes are numbered 1 to 7, starting on the 1st, 2nd, 3rd... note of the scale."),

    L("Chord-scale theory", [
      ["Matching", "🧩", "Jazz players match each chord with a scale that fits its notes and tensions. Over <b>maj7</b> use Ionian or Lydian; over <b>m7</b> use Dorian; over <b>7</b> use Mixolydian; over <b>m7♭5</b> use Locrian."],
      ["In C major", "🎹", "ii (Dm7) takes Dorian. iii (Em7) takes Phrygian. IV (Fmaj7) takes Lydian. V7 takes Mixolydian. vi (Am7) takes Aeolian."],
      ["Colors", "🌈", "Special chords take special scales: altered scale for altered dominants, Lydian dominant for 7 sharp 11, whole-half diminished scale for diminished 7th chords."]
    ], [
      "Which scale is usually played over a Dm7 chord (ii in C)?|Dorian|Lydian|Locrian",
      "Which scale fits a G7 chord (V7 in C)?|Mixolydian|Dorian|Phrygian",
      "Over Bm7 flat 5 (half-diminished) you can play...|Locrian|Ionian|Lydian",
      "Over Cmaj7 sharp 11 you can play...|Lydian|Mixolydian|Dorian",
      "The altered scale fits a...|dominant seventh with tension notes|major seventh chord|minor sixth chord",
      "Over Em7 in the key of C (iii) you can play...|Phrygian|Dorian|Lydian",
      "Over Am7 in the key of C (vi) the usual scale is...|Aeolian|Dorian|Mixolydian",
      "Over Fmaj7 in the key of C (IV) the usual scale is...|Lydian|Ionian|Mixolydian",
      "Chord-scale theory matches each chord with a scale that supports its...|notes and tensions|tempo|dynamics",
      "A fully diminished seventh chord often takes the...|whole-half diminished scale|major pentatonic|Lydian"
    ], "Find the chord's type (maj7, m7, 7...) and where it sits in the key.", "Each chord quality has a favorite scale: Dorian for m7, Mixolydian for 7, Lydian for IV."),

    L("Resolving the dominant seventh", [
      ["Two pulls", "🧲", "In V7 (G B D F in C), the <b>leading tone</b> (B) wants to go up to the tonic. The <b>seventh</b> (F) wants to go down by step."],
      ["The tritone", "↔️", "B and F make a tritone. It resolves inward: B up to C and F down to E. The result is C and E, a major third."],
      ["Inversions", "🔄", "V6/5 has the third in the bass, V4/3 the fifth, V4/2 the seventh. V4/2 resolves to I in first inversion (I6) because the bass F steps down to E."]
    ], [
      "In G7 (V7 of C), the seventh of the chord is...|F|B|D",
      "The seventh of a V7 chord resolves...|down by step|up by step|by leap up",
      "The leading tone of V7 normally resolves...|up to the tonic|down to the supertonic|down a fifth",
      "The tritone inside G7 is between B and...|F|D|G",
      "In C major, the tritone B and F resolves inward to the notes...|C and E|D and G|A and C",
      "V4/2 has which chord tone in the bass?|the seventh|the root|the third",
      "V6/5 has which chord tone in the bass?|the third|the seventh|the fifth",
      "V4/3 has which chord tone in the bass?|the fifth|the root|the seventh",
      "V4/2 normally resolves to...|I in first inversion|ii|vi",
      "In four parts, a complete V7 often resolves to an...|incomplete I (no fifth)|dominant ninth|deceptive cadence"
    ], "Find the leading tone and the seventh, then think which way each one moves.", "Leading tone: up. Seventh: down. Both move by step."),

    L("Ars nova and isorhythm", [
      ["A new art", "🆕", "<b>Ars nova</b> ('new art') was a style in 14th-century France. Philippe de Vitry wrote about it. Notation grew more exact, with shorter note values and both duple and triple divisions."],
      ["Machaut", "⭐", "<b>Guillaume de Machaut</b> was its greatest composer. His <b>Messe de Nostre Dame</b> is the earliest known complete Mass by one composer."],
      ["Isorhythm", "🔁", "<b>Isorhythm</b> repeats a rhythm pattern (the <b>talea</b>) over a melody pattern (the <b>color</b>) of a different length, so they line up in new ways each time."]
    ], [
      "Ars nova was a style in which century?|14th|18th|20th",
      "Ars nova means...|new art|old art|loud art",
      "Which country was the center of Ars nova?|France|Brazil|Japan",
      "Who wrote the Messe de Nostre Dame?|Machaut|Bach|Verdi",
      "The Messe de Nostre Dame is the earliest known complete Mass by...|one composer|a child|a computer",
      "In isorhythm, the repeating rhythm pattern is the...|talea|color|ritornello",
      "In isorhythm, the repeating melody pattern is the...|color|talea|cadenza",
      "In isorhythm, the rhythm and melody patterns have...|different lengths|exactly the same length|no pitches",
      "Ars nova notation allowed more exact...|rhythms|lyrics|instrument sizes",
      "Which man wrote an influential treatise called Ars nova?|Philippe de Vitry|Mozart|Haydn"
    ], "Think about the century, the country, and what changed in how rhythm was written.", "A rhythm pattern (talea) and a pitch pattern (color) repeat at different lengths."),

    L("The galant style and the Mannheim school", [
      ["Simple and elegant", "🪶", "The <b>galant</b> style (about 1720 to 1770) wanted light, elegant music: clear tunes, short phrases, simple accompaniments like the <b>Alberti bass</b>. It reacted against the complicated counterpoint of the late Baroque."],
      ["Mannheim", "🚀", "The court orchestra at <b>Mannheim</b>, Germany, led by Johann Stamitz, was famous for precision and for the <b>Mannheim crescendo</b>: a long, exciting rise in volume. A fast upward-rising figure was nicknamed the <b>Mannheim rocket</b>."],
      ["Names", "⭐", "J. C. Bach (the 'London Bach') wrote galant music. C. P. E. Bach was known for the emotional <b>Empfindsamer</b> style."]
    ], [
      "The galant style wanted music that was...|light and elegant|dense and strict|very loud",
      "Galant music replaced the complicated ___ of the late Baroque with clear tunes.|counterpoint|rhythm|time signatures",
      "The Alberti bass is a...|broken-chord accompaniment|bass drum solo|slow bass voice",
      "The Mannheim orchestra was famous for its long...|crescendo|silence|tuning",
      "Mannheim is in which country?|Germany|Spain|Poland",
      "The Mannheim orchestra was led by...|Johann Stamitz|Beethoven|Wagner",
      "The Mannheim rocket is a fast ___ figure.|rising|falling|silent",
      "Which Bach was nicknamed the 'London Bach'?|Johann Christian|Johann Sebastian|Carl Philipp Emanuel",
      "Galant music mostly has phrases that are...|short and clear|extremely long|without cadences",
      "The galant style came between the...|late Baroque and the Classical era|Medieval and Renaissance|Romantic and 1900s"
    ], "Think about an elegant, simple style in the years just before Mozart.", "Light tunes, clear phrases, accompaniment in broken chords, and a famous crescendo."),

    L("Idée fixe and thematic transformation", [
      ["A theme that returns", "🔁", "In Berlioz's <b>Symphonie fantastique</b> (1830) one melody, called the <b>idée fixe</b> ('fixed idea'), returns in all five movements."],
      ["It changes", "🎭", "The melody is the same, but the mood changes: it can be tender, wild, dancing or even twisted. Liszt called this <b>thematic transformation</b>."],
      ["Program music", "📖", "Both ideas helped tell stories in <b>program music</b>. They are different from Wagner's leitmotifs, which belong to characters, objects or ideas in an opera."]
    ], [
      "Idée fixe means...|fixed idea|new key|fast tempo",
      "Which composer wrote the Symphonie fantastique?|Berlioz|Haydn|Handel",
      "The Symphonie fantastique has how many movements?|5|3|7",
      "In the Symphonie fantastique, the idée fixe is a melody that...|returns in every movement|is played only once|has no notes",
      "Changing a theme's mood while keeping its notes is called...|thematic transformation|cadence|tuning",
      "Which composer is linked to the term thematic transformation?|Liszt|Bach|Purcell",
      "Program music is music that...|tells a story or paints a scene|has no tune|uses only drums",
      "Symphonie fantastique was written in...|1830|1630|1990",
      "Leitmotifs belong to composer...|Wagner|Vivaldi|Mozart",
      "Thematic transformation helps a piece sound...|unified but varied|totally random|silent"
    ], "Think about a melody that keeps coming back in a new costume.", "Same notes, new mood: that is the idea of both terms."),

    L("Bartók and collecting folk songs", [
      ["Fieldwork", "🎙️", "From about 1905, Béla Bartók and Zoltán Kodály of Hungary traveled to villages to record folk singers on <b>phonograph cylinders</b>. They collected thousands of songs."],
      ["In his music", "🎼", "Bartók used the modes, scales and rhythms of folk songs in his own works, such as the <b>Romanian Folk Dances</b> and the <b>Concerto for Orchestra</b> (1943). <b>Mikrokosmos</b> is a set of 153 piano pieces from easy to hard."],
      ["Ethnomusicology", "🌍", "<b>Ethnomusicology</b> is the study of music in culture. Collecting songs also saves traditions that might be lost."]
    ], [
      "Bartók and Kodály came from which country?|Hungary|Spain|Norway",
      "Bartók recorded folk singers on...|phonograph cylinders|CDs|MP3 players",
      "Bartók's Mikrokosmos is a set of ___ piano pieces.|153|12|1000",
      "Mikrokosmos moves from easy pieces to...|harder ones|only silent ones|operas",
      "The Concerto for Orchestra was written in...|1943|1743|1993",
      "Ethnomusicology is the study of...|music in culture|only electric guitars|only piano keys",
      "Bartók used folk songs' modes and rhythms in his own...|compositions|footwear|buildings",
      "Collecting folk songs helps to...|save traditions that might be lost|make songs forgotten|make new instruments",
      "Bartók and Kodály began collecting songs around...|1905|1805|1985",
      "Romanian Folk Dances is a work by...|Bartók|Verdi|Handel"
    ], "Think about people traveling to villages with a recording machine.", "Collect tunes, study them, then use their flavor in new music."),

    L("Jazz in performance", [
      ["The shape", "🎷", "A jazz tune usually starts with the <b>head</b> (the melody). Then each player takes a <b>solo</b> over the chord changes, one trip through the form per <b>chorus</b>. At the end the head returns."],
      ["Rhythm section", "🥁", "The <b>rhythm section</b> of piano, bass and drums <b>comps</b> (plays chords and rhythm) behind the soloist. Players may <b>trade fours</b>: take turns playing four bars at a time."],
      ["Modal jazz", "🌀", "Miles Davis's album <b>Kind of Blue</b> (1959) made <b>modal jazz</b> famous. <b>So What</b> uses just two modes, D Dorian and E flat Dorian, instead of fast-changing chords."]
    ], [
      "In a jazz tune, the melody that opens and closes the piece is the...|head|chorus solo|coda drone",
      "Taking turns playing four bars at a time is called...|trading fours|crossing keys|running scales",
      "The rhythm section usually has piano, bass and...|drums|trombones|violins",
      "One trip through the chord form is a...|chorus|bridge|fugue",
      "To comp means to...|play chords and rhythm behind a soloist|play the loudest solo|conduct the band",
      "Kind of Blue was recorded by...|Miles Davis|Chopin|Ravel",
      "Kind of Blue was released in...|1959|1759|1999",
      "So What uses just two...|modes|time signatures|instruments",
      "Modal jazz builds music on...|modes instead of fast chord changes|only fast chords|no scales at all",
      "A jazz musician who plays a solo is...|improvising|reading a score note by note|silent"
    ], "Think about the order of events in a typical jazz performance.", "Head, solos over the form, and head again, with the rhythm section supporting."),

    L("Video game music", [
      ["Looping", "🎮", "Game music often <b>loops</b>: it repeats smoothly without a noticeable end. It must stay interesting after many repeats. <b>Chiptune</b> music is made with the limited sound chips of early consoles."],
      ["Adaptive music", "🔀", "<b>Adaptive</b> (interactive) music changes with the game. Layers of instruments can be added when danger comes, or the music can switch smoothly to a new section when you reach a new area."],
      ["Themes and composers", "⭐", "Games use <b>themes</b> for characters and places. Koji Kondo wrote the music for Super Mario Bros. and Zelda. Nobuo Uematsu wrote Final Fantasy music."]
    ], [
      "Music that repeats smoothly without a noticeable end is a...|loop|coda|fermata",
      "Music made with the limited sound chips of early consoles is called...|chiptune|opera|lieder",
      "Music that changes as the game changes is...|adaptive music|a fixed recording|silence",
      "A way adaptive music can work is by adding...|layers of instruments when danger comes|a new composer each level|more lyrics always",
      "Koji Kondo is known for music in...|Super Mario Bros. and Zelda|Beethoven's symphonies|Broadway shows",
      "Nobuo Uematsu wrote music for...|Final Fantasy|Swan Lake|the Mass in B minor",
      "A character theme in a game is a...|melody linked to a character|rule about scoring|setting for the volume",
      "A good game loop should be...|interesting after many repeats|one note only|stopped by the player",
      "Sound effects (SFX) are different from music because they...|react to actions like jumps and hits|never play|are only strings",
      "Switching smoothly to a new section when you enter a new area is...|a transition|a rest|a clef"
    ], "Think about music that must play for a long time and react to what the player does.", "Loops repeat, layers add tension, and themes belong to characters or places."),

    L("Film scoring words", [
      ["Score and cue", "🎬", "The <b>score</b> is all the music written for a film. A <b>cue</b> is one piece of music for one scene. In a <b>spotting session</b> the director and composer decide where music goes."],
      ["Two kinds of music", "👂", "<b>Diegetic</b> music is music the characters can hear, like a radio in the scene. <b>Non-diegetic</b> music is only for the audience, like the orchestra during a chase."],
      ["Techniques", "⏱️", "A <b>click track</b> is a metronome heard by the players so music matches the film's timing. <b>Mickey-mousing</b> makes the music copy the on-screen action exactly. A <b>temp track</b> is temporary music used while editing."]
    ], [
      "All the music written for a film is the...|score|libretto|cadenza",
      "One piece of music for a single scene is a...|cue|chorus|cadence",
      "In a spotting session, the director and composer decide...|where music goes|what snacks to eat|how to tune",
      "Music the characters can hear, like a radio, is...|diegetic|non-diegetic|silent",
      "Music only the audience hears is...|non-diegetic|diegetic|illegal",
      "A metronome that players hear to match the film's timing is a...|click track|ground bass|tone row",
      "Music that copies on-screen action exactly is called...|Mickey-mousing|ground bass|impressionism",
      "A temp track is...|temporary music used while editing|the final recording|a drum only",
      "Foley is the art of...|making sound effects live|writing the theme|conducting",
      "A theme linked to a character is also called a...|leitmotif|click track|spotting"
    ], "Think about whether the music is heard inside the story or only by the audience.", "Score, cue, spotting, diegetic or not, click track."),

    L("Formants and vowels", [
      ["Source and filter", "🔊", "The vocal folds make a buzzing sound full of harmonics. The mouth and throat act as a <b>filter</b> that strengthens some of those harmonics. This is the <b>source-filter</b> idea."],
      ["Formants", "🔦", "A <b>formant</b> is a range of frequencies the vocal tract boosts. The first two formants decide which vowel we hear, such as 'ee' or 'ah'."],
      ["Singing", "🎤", "Changing the shape of the mouth changes the formants and the vowel. High sopranos can lose vowel clarity because the pitch is above the formants."]
    ], [
      "The vocal folds produce a sound rich in...|harmonics|silence only|echoes",
      "The mouth and throat act as a...|filter|battery|string",
      "A formant is a range of frequencies that the vocal tract...|boosts|removes completely|turns into rhythm",
      "Which formants decide which vowel we hear?|the first two|the last two|none of them",
      "Changing the shape of your mouth changes your...|formants|key signature|time signature",
      "In the source-filter idea, the source is the...|vocal folds|lips only|ears",
      "In the source-filter idea, the filter is the...|vocal tract (mouth and throat)|vocal folds|microphone",
      "Different vowels like 'ee' and 'ah' have different...|formants|clefs|tempos",
      "Very high sopranos can lose clear vowels because the pitch is above the...|formants|metronome|score",
      "A formant is like a...|resonance of the vocal tract|beat in the drums|rest in the melody"
    ], "Think about the buzz made in the throat and the shape of the space it travels through.", "Source plus filter equals a vowel sound."),

    L("Psychoacoustics", [
      ["How we hear", "👂", "<b>Psychoacoustics</b> studies how the brain hears sound. We hear about 20 Hz to 20,000 Hz, and our ears are most sensitive around 2000 to 5000 Hz."],
      ["Tricks", "🧠", "The brain can supply a <b>missing fundamental</b>: if you hear the harmonics, you still hear the low pitch. <b>Masking</b> means a loud sound hides a quieter one near it in pitch. MP3 compression uses masking to throw away sounds you could not hear."],
      ["Where is it?", "📍", "We tell where a sound is from tiny differences in time and loudness between our two ears."]
    ], [
      "The usual range of human hearing is about...|20 Hz to 20,000 Hz|1 Hz to 10 Hz|100,000 Hz to 200,000 Hz",
      "Our ears are most sensitive to frequencies around...|2000 to 5000 Hz|1 to 5 Hz|50,000 Hz",
      "When you hear harmonics and the brain supplies the low pitch, it is the...|missing fundamental|passaggio|ground bass",
      "Masking means a loud sound...|hides a quieter sound nearby in pitch|makes all sounds louder|tunes the other note",
      "MP3 compression uses masking to...|throw away sounds you could not hear anyway|add more bass|play music backward",
      "We tell where a sound is partly from tiny differences between our...|two ears|two hands|two eyes",
      "Psychoacoustics is the study of...|how the brain hears sound|how pianos are built|how paper is made",
      "A pitch below 20 Hz is usually...|too low to hear as a note|very high|louder",
      "A pitch above 20,000 Hz is...|too high for most people to hear|the lowest note|a bass sound",
      "Timbre helps us tell apart...|different instruments playing the same note|major from minor only|beats from rests"
    ], "Think about what the brain does with the sounds that reach the ears.", "The brain fills in, hides and locates sounds, not only receives them."),

    L("Sine waves and Fourier", [
      ["The purest tone", "〰️", "A <b>sine wave</b> is a pure tone with just one frequency. A tuning fork is close to a sine wave."],
      ["Adding waves", "➕", "The mathematician Joseph Fourier showed that any repeating wave can be built by adding sine waves of different frequencies and sizes. Real instrument tones are sums of <b>harmonics</b>."],
      ["Shapes", "📐", "A <b>square wave</b> has only odd harmonics (1, 3, 5...). A <b>sawtooth</b> wave has all harmonics. <b>Additive synthesis</b> builds a sound by adding sine waves together."]
    ], [
      "A sine wave is a tone with exactly...|one frequency|twelve frequencies|no frequency",
      "A sound close to a pure sine wave comes from a...|tuning fork|snare drum|full orchestra",
      "Fourier showed that a repeating wave can be built from...|sine waves|square dances|triangle rests",
      "A square wave has only the...|odd harmonics|even harmonics|first harmonic",
      "A sawtooth wave has...|all the harmonics|only two harmonics|no harmonics",
      "Additive synthesis builds a sound by...|adding sine waves together|subtracting silence|recording voices",
      "A spectrum shows how much of each ___ is in a sound.|frequency|beat|lyric",
      "Instrument tones differ in timbre because they have different mixes of...|harmonics|pedals|clefs",
      "A tone made of the fundamental and its harmonics is a...|complex tone|silence|pure tone",
      "Joseph Fourier was a...|mathematician|trumpeter|conductor"
    ], "Think about building a sound by stacking simple waves together.", "Pure tone = one sine wave. Complex tone = many sine waves added."),

    L("Euclidean rhythms", [
      ["Spreading hits evenly", "⭕", "A <b>Euclidean rhythm</b> E(k, n) spreads k hits as evenly as possible across n steps. The rest of the steps are rests. Godfried Toussaint noticed in 2005 that many world rhythms come out this way."],
      ["Examples", "🥁", "E(3, 8) is x . . x . . x . (the tresillo, grouped 3 + 3 + 2). E(7, 12) is x . x x . x . x x . x ., a standard bell pattern in West African music."],
      ["Counting", "🔢", "Rests = n - k. E(4, 16) is four hits spaced three rests apart: the 'four on the floor' beat."]
    ], [
      "A Euclidean rhythm spreads its hits as ___ as possible.|evenly|loudly|randomly",
      "In E(3, 8), how many steps are rests?|5|3|8",
      "In E(3, 8), how many hits are there?|3|5|8",
      "E(3, 8) is also called the...|tresillo|waltz|fugue subject",
      "E(3, 8) is grouped as...|3 + 3 + 2|4 + 4|2 + 2 + 2 + 2",
      "In E(7, 12), how many steps are rests?|5|7|12",
      "In E(4, 16), how many rests are between each pair of hits?|3|4|1",
      "Who wrote about Euclidean rhythms in 2005?|Godfried Toussaint|J. S. Bach|Franz Schubert",
      "E(k, n): the n stands for the number of...|steps|hits|instruments",
      "E(7, 12) is a standard pattern from...|West African music|Baroque suites|medieval chant"
    ], "Think about hits dropped into a loop of steps, with the rest being silence.", "Rests = steps minus hits."),

    F("Period and frequency", [
      ["One wave", "⏱️", "The <b>period</b> is the time one full wave takes. The <b>frequency</b> is how many waves happen each second."],
      ["The rule", "🔁", "Period = 1 ÷ frequency, and frequency = 1 ÷ period. In milliseconds, frequency = 1000 ÷ period."],
      ["Example", "🔢", "A wave every 5 milliseconds is 1000 ÷ 5 = 200 Hz."]
    ], periodQ),

    F("Sampling and bits", [
      ["Sampling", "💻", "A digital recording measures the sound many times each second. Each measurement is a <b>sample</b>. CDs use 44,100 samples a second."],
      ["Nyquist", "½", "By the <b>Nyquist rule</b>, the highest pitch you can capture is <b>half</b> the sample rate. So 44.1 kHz can capture up to 22.05 kHz, above our hearing."],
      ["Bit depth", "🔢", "<b>Bit depth</b> tells how many loudness levels each sample can store. With b bits there are 2 to the power b levels: 8 bits gives 256 levels."]
    ], digitalQ),

    F("Counting melodies", [
      ["Orders", "🔀", "The number of ways to put n different notes in order is n x (n-1) x ... x 1. For 3 notes that is 3 x 2 x 1 = 6."],
      ["Choices with repeats", "🎲", "If each spot in a melody has k choices and notes may repeat, there are k multiplied by itself once for each spot. Three spots with 2 choices each gives 2 x 2 x 2 = 8."],
      ["Rhythms", "🥁", "If each beat is play-or-rest, each beat has 2 choices. A rhythm of b beats has 2 multiplied by itself b times."]
    ], countQ),

    L("Parallel harmony (planing)", [
      ["Chords that slide", "🛷", "<b>Planing</b> (or parallel harmony) moves a chord shape up or down, keeping the same pattern of intervals, like a plane gliding along. Debussy used it in pieces like <b>La cathédrale engloutie</b>."],
      ["Against the rules", "🚫", "In traditional four-part writing, parallel fifths are avoided so that voices stay independent. Planing breaks the rule on purpose to make color."],
      ["Old and new", "🎸", "Medieval <b>parallel organum</b> moved voices in parallel fourths and fifths. Rock guitar <b>power chords</b> are parallel fifths too."]
    ], [
      "Moving the same chord shape up or down is called...|planing|modulation|inversion",
      "Planing keeps the same pattern of...|intervals|lyrics|clefs",
      "Which composer used planing in La cathédrale engloutie?|Debussy|Handel|Haydn",
      "In traditional four-part writing, parallel fifths are...|avoided|required|made louder",
      "Planing breaks the traditional rule on purpose to create...|color|silence|a fugue",
      "Medieval parallel organum moved voices in parallel...|fourths and fifths|sevenths|seconds only",
      "Power chords in rock guitar are made of...|parallel fifths|diminished sevenths|only thirds",
      "Planing is also called...|parallel harmony|ground bass|figured bass",
      "In parallel harmony, the chords' quality...|stays the same|changes with each chord|is always minor",
      "Planing is a key idea of which style?|Impressionism|Baroque suites|Gregorian chant"
    ], "Picture a chord shape sliding up and down the keyboard without changing.", "Same shape, new pitch: all the voices move together.")
  ];
  l21.push(
    MIX("Mixed practice", l21.slice(0, 9)),
    MIX("Level 21 Challenge", l21.slice(9))
  );

  Object.assign(MUSIC_LEVELS, { 19: l19, 20: l20, 21: l21 });
})();
