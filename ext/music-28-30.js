// Mind Lab Music, levels 28-30 (extension file). 20 lessons per level.
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
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
        choices: shuf([a, ...shuf(w.filter(x => x !== a)).slice(0, 2)]), answer: a,
        hints: [nudge, clue, `Example: ${ex[0]} The answer is "${ex[1]}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(S);
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of the ideas, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ======================= LEVEL 28 =======================
  const l28 = [
    L("The Neapolitan sixth", [
      ["A colorful chord", "🌋", "The <b>Neapolitan chord</b> is a <b>major triad built on the lowered second degree</b> of the scale. In C minor it is D flat major. It is mostly used in minor keys."],
      ["Why sixth?", "6️⃣", "It is almost always in <b>first inversion</b>, so the third is in the bass. In C minor the notes are F (bass), A flat and D flat. That gives a '6' above the bass."],
      ["Where it goes", "➡️", "It is a <b>predominant</b> chord. It usually moves to V (often through the cadential six-four). The name comes from the Neapolitan school of opera in Naples."]
    ], [
      "A Neapolitan chord is built on which scale degree?|the lowered second degree|the raised fourth degree|the lowered sixth degree",
      "In C minor, the root of the Neapolitan chord is...|D flat|D natural|E flat",
      "In A minor, the Neapolitan chord is built on...|B flat|B natural|C",
      "In D minor, the Neapolitan chord is built on...|E flat|E natural|F",
      "The Neapolitan chord is a major triad that is usually in...|first inversion|third inversion|root position with a doubled fifth",
      "The Neapolitan chord has the function of...|a predominant|a tonic|a dominant",
      "Which chord most often follows the Neapolitan sixth?|V|I|vi",
      "In C minor, the notes of the Neapolitan sixth chord are...|F, A flat, D flat|D, F, A|E flat, G, B flat",
      "The name Neapolitan comes from...|the city of Naples|a Greek word meaning new|a composer named Neapolis"
    ], "Think about which scale degree is lowered, and what kind of triad sits on it.", "It is a major chord in a minor key, in first inversion, and it leads toward the dominant."),

    L("Augmented sixth chords", [
      ["The special interval", "↔️", "An <b>augmented sixth</b> chord has an augmented sixth between the <b>lowered 6th</b> degree (in the bass) and the <b>raised 4th</b> degree. In C minor: A flat and F sharp."],
      ["Three flavors", "🍦", "<b>Italian</b>: lowered 6, 1, raised 4. <b>French</b> adds scale degree 2. <b>German</b> adds the lowered 3. All are predominant chords."],
      ["Resolution", "🎯", "The two notes of the augmented sixth move <b>outward</b> to an octave on the dominant (G in C minor). The chord leads to V."]
    ], [
      "The augmented sixth interval is between scale degrees...|flat 6 and sharp 4|flat 2 and 5|sharp 1 and 3",
      "In C minor, the augmented sixth is between...|A flat and F sharp|A and F sharp|A flat and F",
      "The two notes of the augmented sixth resolve...|outward to an octave on the dominant|inward to a unison|both down a third",
      "Which augmented sixth chord has only three different notes?|Italian|French|German",
      "The augmented sixth chord with an added scale degree 2 is the...|French sixth|Italian sixth|German sixth",
      "The augmented sixth chord with an added lowered 3 is the...|German sixth|French sixth|Italian sixth",
      "In C minor, the German sixth is spelled...|A flat, C, E flat, F sharp|A flat, C, D, F sharp|A flat, C, F sharp",
      "In C minor, the French sixth is spelled...|A flat, C, D, F sharp|A flat, C, E flat, F sharp|A flat, C, F sharp",
      "Augmented sixth chords are usually...|predominants leading to V|tonic chords|chords for endings only after V"
    ], "Decide which type of augmented sixth chord the question asks about, then think about which scale degrees it has.", "All augmented sixths share flat 6, 1 and sharp 4. The extra note, if any, tells the flavor."),

    L("Modal mixture", [
      ["Borrowing", "🔄", "<b>Modal mixture</b> means borrowing chords from the <b>parallel key</b>: the key with the same tonic but the other mode. A C major piece can borrow from C minor."],
      ["Common borrowed chords", "🧩", "In C major, popular borrowed chords are <b>iv</b> (F, A flat, C), <b>flat VI</b> (A flat major), <b>flat VII</b> (B flat major) and <b>flat III</b> (E flat major)."],
      ["The effect", "🎭", "Borrowed chords add a darker, more bittersweet color. The reverse also happens: a minor piece can end on a major tonic (a <b>Picardy third</b>)."]
    ], [
      "Modal mixture means borrowing chords from the...|parallel key|relative key|dominant key",
      "In C major, a borrowed iv chord is spelled...|F, A flat, C|F, A, C|F, A flat, D flat",
      "In C major, flat VI is the chord...|A flat major|A minor|A flat minor",
      "In C major, flat VII is the chord...|B flat major|B diminished|B flat minor",
      "In C major, which chord is borrowed from C minor?|E flat major|E minor|D minor",
      "Which pair of keys is parallel (same tonic)?|C major and C minor|C major and A minor|C major and G major",
      "A minor piece ending on a major tonic chord uses a...|Picardy third|Neapolitan sixth|plagal drop",
      "In D major, a borrowed iv chord is...|G, B flat, D|G, B, D|G, B flat, D flat",
      "Borrowing the minor iv in a major key adds a feeling that is...|darker and bittersweet|faster|silent"
    ], "Parallel keys share a tonic. Which mode do the borrowed chords come from?", "Spell the chord in the parallel minor key, then compare it with the major key."),

    L("Rondo and sonata-rondo", [
      ["Refrain and episodes", "🔁", "A <b>rondo</b> has a main theme (the <b>refrain</b>) that keeps returning between contrasting <b>episodes</b>. The refrain stays in the home key."],
      ["Shapes", "🔠", "Five-part rondo: <b>A B A C A</b>. Seven-part rondo: <b>A B A C A B A</b>. Rondos are often used for fast, playful finales."],
      ["Sonata-rondo", "🧬", "A <b>sonata-rondo</b> blends rondo with sonata form: A B A (development-like C) A B A. The B theme returns in the <b>tonic</b> key, like a recapitulation."]
    ], [
      "In a rondo, the returning main theme is the...|refrain|episode|coda",
      "The contrasting sections between the refrains are called...|episodes|refrains|codas",
      "A five-part rondo is shaped...|ABACA|ABCDE|AABBA",
      "A seven-part rondo is shaped...|ABACABA|ABABABA|AABBCCA",
      "Rondos are often used for a Classical sonata's...|finale|slow movement|minuet",
      "In a sonata-rondo, the B theme returns in the...|tonic key|dominant key|relative minor",
      "In a sonata-rondo, the middle C section often acts like a...|development|coda|introduction",
      "The refrain of a rondo is usually in the...|home key|key of the leading tone|key of the supertonic",
      "Mozart's 'Rondo alla turca' is the finale of his Piano Sonata No....|11|1|8"
    ], "A rondo is about something coming back. What returns, and what stays different each time?", "Letters show the shape: A is the refrain, and other letters are the episodes."),

    L("Anatomy of a fugue", [
      ["Subject and answer", "🎼", "A <b>fugue</b> starts with the <b>subject</b> (main theme) alone in one voice. The next voice enters with the <b>answer</b>, the subject in the dominant, while the first voice plays a <b>countersubject</b>."],
      ["Exposition and episodes", "🧱", "The opening where every voice enters in turn is the <b>exposition</b>. Later, free passages called <b>episodes</b> link subject entries in new keys."],
      ["Tricks", "🪄", "<b>Stretto</b>: entries overlap. Also inversion, augmentation and diminution. A <b>double fugue</b> has two subjects. 'Fuga' is Latin for 'flight'."]
    ], [
      "The main theme of a fugue is the...|subject|answer|episode",
      "The second entry, in the dominant, is called the...|answer|stretto|coda",
      "Material that accompanies the subject in another voice is the...|countersubject|exposition|ground",
      "The opening where each voice enters in turn is the...|exposition|stretto|recapitulation",
      "Free passages between subject entries are called...|episodes|expositions|answers",
      "When entries overlap before the previous one finishes, it is a...|stretto|cadenza|ritornello",
      "A fugue answer that is an exact transposition is a...|real answer|tonal answer|false answer",
      "A fugue with two subjects is a...|double fugue|duet fugue|twin canon",
      "The word fugue comes from a Latin word meaning...|flight|fold|fire"
    ], "Fugue parts have special names for each entry of the theme. Which job does the question describe?", "Think of the order: subject, answer, countersubject, then free episodes."),

    L("Theme and variations", [
      ["The idea", "🎨", "A <b>theme</b> is stated, then changed again and again. Each <b>variation</b> keeps something recognizable (melody, harmony or bass) but changes the rest."],
      ["Kinds of variation", "🧁", "<b>Ornamental (figural)</b>: the tune gets fast decorations. <b>Character</b>: the mood changes, like a march or waltz. <b>Ground-bass</b>: the same bass or harmony repeats underneath."],
      ["Famous sets", "🏆", "Bach: <b>Goldberg Variations</b> (30). Beethoven: <b>Diabelli Variations</b> (33). Elgar: <b>Enigma Variations</b>, each portraying a friend. Mozart wrote variations on 'Ah vous dirai-je, maman' (Twinkle, Twinkle)."]
    ], [
      "In theme and variations, the theme is...|changed each time but still recognizable|never heard again|played only once",
      "A variation that adds fast decorative notes to the tune is...|ornamental (figural)|a character variation|a ground bass",
      "A variation that changes the mood, like turning the theme into a march, is a...|character variation|strict canon|pedal point",
      "Bach's Goldberg Variations has how many variations?|30|12|24",
      "Beethoven's Diabelli Variations has how many variations?|33|12|9",
      "Each variation in Elgar's Enigma Variations portrays...|a friend of the composer|a city|a season",
      "Variations that repeat the same bass line are...|ground-bass (continuous) variations|rondos|canons",
      "Brahms's St. Anthony Chorale variations are called Variations on a Theme by...|Haydn|Mozart|Bach",
      "Mozart's Twinkle, Twinkle variations are based on a French song called...|Ah vous dirai-je, maman|La Marseillaise|Au clair de la lune"
    ], "Ask what stays the same in a variation and what is allowed to change.", "Match the kind of change (decoration, mood or bass line) to the name."),

    L("The Classical concerto", [
      ["Three movements", "3️⃣", "A Classical <b>concerto</b> usually has three movements: <b>fast, slow, fast</b>. The last is often a rondo."],
      ["Double exposition", "2️⃣", "In the first movement the orchestra presents the themes, then the <b>soloist and orchestra</b> present them again. This is called the <b>double exposition</b>."],
      ["The cadenza", "🌟", "Near the end the orchestra pauses (often on a cadential six-four) and the soloist plays a <b>cadenza</b>, a showy passage alone, often improvised."]
    ], [
      "A Classical concerto usually has how many movements?|3|2|5",
      "The usual speeds of a Classical concerto are...|fast, slow, fast|slow, fast, slow|fast, fast, slow",
      "In the first movement, orchestra then soloist both present the themes. This is the...|double exposition|double bar|dual cadenza",
      "A cadenza is a passage where the soloist...|plays alone, often improvised|plays with the full orchestra|rests",
      "A cadenza usually follows a...|cadential six-four chord|deceptive cadence|key change",
      "How many numbered piano concertos did Mozart write?|27|5|50",
      "Beethoven's fifth piano concerto is nicknamed the...|Emperor|Moonlight|Pastoral",
      "The finale of a Classical concerto is often a...|rondo|fugue|funeral march",
      "How many piano concertos did Beethoven write?|5|3|9"
    ], "A concerto is a conversation between a soloist and an orchestra. Think about its usual layout.", "Remember: fast-slow-fast, a double exposition, and a solo cadenza near the end."),

    L("Haydn and the string quartet", [
      ["The quartet", "🎻", "A <b>string quartet</b> has two violins, a viola and a cello. It usually has four movements. Haydn is called the <b>father of the string quartet</b> and of the symphony."],
      ["His life", "🏰", "For many years Haydn worked for the noble <b>Esterházy</b> family. Later he wrote the 12 <b>London symphonies</b> and was friends with Mozart. Beethoven had lessons from him."],
      ["Nicknames and jokes", "😄", "His 'Surprise' symphony has a sudden loud chord in the slow movement. In the 'Farewell' symphony the players leave the stage one by one. His 'Emperor' quartet has variations on a melody later used as a national anthem."]
    ], [
      "A string quartet is made of...|two violins, viola and cello|violin, viola, cello and bass|four violins",
      "Haydn worked for many years for the noble family...|Esterházy|Medici|Tudor",
      "Haydn is often called the 'father of the'...|symphony and string quartet|opera|piano",
      "Haydn's 'Surprise' symphony is known for...|a sudden loud chord in the slow movement|a missing violin|a cannon",
      "In Haydn's 'Farewell' symphony, the players...|leave the stage one by one|play louder and louder|sing",
      "The slow movement of Haydn's 'Emperor' quartet has variations on...|a melody later used as a national anthem|a dance from Spain|a bugle call",
      "Haydn's late symphonies written for England are the...|London symphonies|Thames suite|Royal set",
      "A string quartet usually has how many movements?|4|2|7",
      "Haydn briefly taught the young...|Beethoven|Schubert|Liszt"
    ], "Think of Haydn's home, his instruments and his funny nicknames.", "Quartet means four players: which instruments? Then think of where Haydn worked."),

    L("Chopin and Liszt", [
      ["Chopin", "🎹", "<b>Frédéric Chopin</b> was born in Poland and wrote almost only for <b>piano</b>: nocturnes (dreamy night pieces), mazurkas and polonaises (Polish dances), études, ballades and 24 preludes (Op. 28). He used <b>tempo rubato</b>, bending time expressively."],
      ["Liszt", "🔥", "<b>Franz Liszt</b> was born in Hungary and was the greatest piano virtuoso of his day. He wrote the <b>Hungarian Rhapsodies</b>, invented the <b>symphonic poem</b> and helped create the solo piano recital."],
      ["Why they matter", "🌍", "Both used the piano as an orchestra of its own, with rich pedal, wide leaps and brilliant color. They shaped Romantic piano music."]
    ], [
      "Chopin was born in...|Poland|Hungary|Russia",
      "Liszt was born in...|Hungary|Austria's capital|Italy",
      "Chopin wrote mainly for which instrument?|piano|violin|organ",
      "Chopin's mazurkas and polonaises are Polish...|dances|hymns|lullabies",
      "Chopin's nocturnes are...|dreamy night pieces|military marches|fast fugues",
      "Tempo rubato means...|bending the tempo expressively|playing silently|getting louder",
      "Chopin's Op. 28 is a set of how many preludes?|24|12|48",
      "Liszt is credited with inventing the...|symphonic poem|string quartet|fugue",
      "Liszt's Hungarian Rhapsodies are based on...|Hungarian folk-style tunes|Spanish dances|German hymns"
    ], "Remember each composer's country and his favorite instrument.", "Chopin stayed close to the piano; Liszt was a showman who also invented a new orchestral form."),

    L("Verdi and verismo", [
      ["Verdi", "🎭", "<b>Giuseppe Verdi</b> (Italy) wrote <i>Rigoletto</i>, <i>La traviata</i>, <i>Il trovatore</i>, <i>Aida</i> (set in ancient Egypt), <i>Otello</i> and his comic last opera <i>Falstaff</i>. He is known for memorable melody and strong drama."],
      ["Puccini", "🦋", "<b>Giacomo Puccini</b> wrote <i>La bohème</i> (set in Paris), <i>Tosca</i>, <i>Madama Butterfly</i> and <i>Turandot</i>, which was left unfinished when he died."],
      ["Verismo", "📰", "<b>Verismo</b> means 'realism': operas about ordinary people in everyday settings. Examples are Mascagni's <i>Cavalleria rusticana</i> and Leoncavallo's <i>Pagliacci</i>."]
    ], [
      "Verdi's opera Aida is set in ancient...|Egypt|Rome|China",
      "Which opera is by Verdi?|La traviata|Tosca|La bohème",
      "Which opera is by Puccini?|Madama Butterfly|Rigoletto|Falstaff",
      "Verismo opera tells stories about...|ordinary people in realistic settings|gods and heroes only|talking animals",
      "Puccini's last opera, left unfinished, is...|Turandot|Aida|Otello",
      "Verdi and Puccini were both from...|Italy|France|Spain",
      "Mascagni wrote the verismo opera...|Cavalleria rusticana|Pagliacci|Turandot",
      "Verdi's last opera, a comedy, is...|Falstaff|Aida|Rigoletto",
      "Puccini's La bohème is set in...|Paris|Venice|Cairo"
    ], "Match each opera to its composer and its setting.", "Verdi came first with grand drama; Puccini and the verismo composers came later."),

    L("Swing and big bands", [
      ["The Swing Era", "🎺", "Swing was the popular dance music of the <b>1930s and 40s</b>. A <b>big band</b> has sections of saxophones, trumpets, trombones and a rhythm section (piano, bass, drums, sometimes guitar)."],
      ["The feel", "🕺", "Eighth notes are played in a <b>swung</b>, long-short way. The bass plays a <b>walking</b> line of steady quarter notes. People danced to it."],
      ["Stars", "⭐", "<b>Duke Ellington</b> (Cotton Club in Harlem), <b>Count Basie</b> (Kansas City), <b>Benny Goodman</b> (the 'King of Swing'), Glenn Miller, and singer <b>Ella Fitzgerald</b>, the 'First Lady of Song'."]
    ], [
      "Swing was most popular in the...|1930s and 40s|1700s|1980s",
      "A big band has sections of saxophones, trumpets, trombones and...|a rhythm section|harps|violas",
      "Benny Goodman was nicknamed...|the King of Swing|the Prince of Peace|the Piano Man",
      "Duke Ellington's band played at the famous Harlem club called the...|Cotton Club|Blue Note|Carnegie Cavern",
      "A walking bass plays...|steady quarter notes on every beat|one long note|only on beat one",
      "Swing eighth notes are played...|long-short, like a triplet feel|exactly equal|very short and detached",
      "Count Basie's band rose to fame in...|Kansas City|Paris|Vienna",
      "Swing was mainly music for...|dancing|silent listening only|church services only",
      "Ella Fitzgerald was called the First Lady of...|Song|Opera|Drums"
    ], "Think of the sound of a dance band from the 1930s and 40s.", "Big band = four groups: saxes, trumpets, trombones and rhythm section."),

    L("From blues to rock and roll", [
      ["Blues roots", "🎸", "<b>Delta blues</b> grew in Mississippi with a singer and an acoustic guitar. In Chicago, players like <b>Muddy Waters</b> plugged in and formed electric bands. The classic form is the <b>12-bar blues</b>."],
      ["Blue notes", "🎵", "The <b>blues scale</b> uses bent or lowered 'blue notes' on the 3rd, 5th and 7th degrees. <b>Rhythm and blues</b> added a strong dance beat."],
      ["Rock and roll", "🚀", "In the <b>1950s</b> blues and R&B fed rock and roll: <b>Chuck Berry</b>, Little Richard, Elvis Presley and <b>Sister Rosetta Tharpe</b>, a gospel guitarist called the godmother of rock and roll."]
    ], [
      "Delta blues comes from the region of...|Mississippi|the Texas coast|New York",
      "Chicago blues is known for...|electric guitars and bands|only solo harp|orchestras",
      "Muddy Waters was a famous...|Chicago blues musician|opera singer|conductor",
      "Rhythm and blues combined blues with...|a strong dance beat|church organ only|Gregorian chant",
      "Chuck Berry was an early rock-and-roll...|guitarist and songwriter|trumpeter|cellist",
      "Rock and roll became popular in the...|1950s|1850s|1990s",
      "Sister Rosetta Tharpe is called the godmother of...|rock and roll|baroque music|bebop",
      "Blue notes are bent or lowered notes on the...|3rd, 5th and 7th|1st and 8th|tonic only",
      "A classic blues form is...|12 bars|5 bars|50 bars"
    ], "Follow the path: Mississippi, Chicago, then the 1950s.", "Blues first, then electric and dance-beat versions, and then rock and roll."),

    L("Maqam: Arabic modal music", [
      ["What is a maqam?", "🌙", "A <b>maqam</b> is a melodic mode with its own scale, typical phrases and mood. Names include <b>Rast</b>, <b>Bayati</b> and <b>Hijaz</b>. Many maqamat use <b>quarter tones</b> smaller than a semitone."],
      ["Improvising", "🎶", "A <b>taqsim</b> is a free, unmeasured improvisation in a maqam, played on an instrument such as the oud or the ney. Rhythm cycles are called <b>iqa'at</b>."],
      ["Instruments", "🪕", "The <b>oud</b> is a short-necked fretless lute. The <b>qanun</b> is a plucked zither. The <b>ney</b> is an end-blown reed flute. The <b>darbuka</b> is a goblet-shaped drum."]
    ], [
      "A maqam is a...|melodic mode with rules for how melodies move|type of drum|dance step",
      "Maqam music often uses intervals smaller than a semitone called...|quarter tones|clusters|tritones",
      "A taqsim is an...|instrumental improvisation|choir song|drum pattern",
      "The oud is a...|short-necked fretless lute|bowed drum|wind instrument",
      "The qanun is a...|plucked zither|drum|trumpet",
      "The darbuka is a...|goblet-shaped drum|flute|harp",
      "The ney is an...|end-blown reed flute|plucked lute|bowed fiddle",
      "Which of these is a maqam name?|Hijaz|Ionian|Raga",
      "Rhythmic cycles in Arabic music are called...|iqa'at|talas|claves"
    ], "Think of the modal system of Arabic music and the instruments that play it.", "Maqam is the mode, taqsim is the improvisation, and iqa' is the rhythm."),

    L("Flamenco", [
      ["Three arts", "💃", "<b>Flamenco</b> comes from <b>Andalusia</b> in southern Spain, with strong roots in the Roma (Gitano) community. It joins guitar (<b>toque</b>), singing (<b>cante</b>) and dance (<b>baile</b>)."],
      ["Rhythm", "👏", "Players use hand-clapping (<b>palmas</b>) and the box drum <b>cajón</b>. A rhythmic cycle is called a <b>compás</b>. The soleá is based on a 12-beat cycle."],
      ["Sound", "🔥", "Flamenco often uses the Phrygian mode and the <b>Andalusian cadence</b> (for example A minor, G, F, E). <b>Duende</b> means deep, intense emotion."]
    ], [
      "Flamenco comes from...|Andalusia in southern Spain|Scotland|Brazil",
      "Flamenco has guitar, singing and...|dance|painting|poetry only",
      "Flamenco hand-clapping is called...|palmas|cajón|castanets",
      "The Andalusian cadence is a falling pattern such as...|A minor, G, F, E|C, G, A minor, F|C, F, G, C",
      "The box drum used in flamenco is the...|cajón|bongo|djembe",
      "A flamenco rhythmic cycle is called a...|compás|clave|tala",
      "The soleá rhythm is based on a cycle of...|12 beats|4 beats|7 beats",
      "Flamenco has strong roots among the...|Roma (Gitano) people of Andalusia|Vikings|Aztecs",
      "Duende in flamenco means...|deep, intense emotion|loudness|speed"
    ], "Flamenco has three arts and a special rhythm cycle. Which part does the question ask about?", "Spain, the south, guitar, voice, dance, and clapping."),

    L("Resonance in strings and pipes", [
      ["Strings", "🎸", "A string fixed at both ends vibrates in <b>all harmonics</b> (1, 2, 3, 4...). Halving its length doubles the frequency, an octave higher. <b>Nodes</b> are points of no motion; <b>antinodes</b> have the most motion."],
      ["Open and closed pipes", "🎷", "An <b>open pipe</b> has all harmonics. A pipe <b>closed at one end</b> has only <b>odd harmonics</b> and sounds an octave lower than an open pipe of the same length."],
      ["Real instruments", "🎶", "The clarinet acts like a closed pipe, so it is rich in odd harmonics. Touching a string lightly at its midpoint makes the second harmonic, an octave higher."]
    ], [
      "A string fixed at both ends vibrates with...|all harmonics|only odd harmonics|only the second harmonic",
      "A pipe closed at one end produces...|only odd harmonics|all harmonics|only even harmonics",
      "Halving the length of a string makes the pitch...|an octave higher|an octave lower|a fifth lower",
      "A closed pipe sounds ___ an open pipe of the same length.|an octave lower than|an octave higher than|the same as",
      "The clarinet behaves like a closed pipe, so it is rich in...|odd harmonics|even harmonics only|no harmonics",
      "A node is a point of...|no movement|biggest movement|highest pitch",
      "An antinode is a point of...|maximum movement|no movement|lowest pitch",
      "The fundamental of a vibrating string has how many antinodes?|1|2|3",
      "Touching a string lightly at its midpoint gives the...|second harmonic, an octave higher|fundamental|third harmonic"
    ], "Think about whether the ends of the tube or string are open or fixed, and which harmonics fit.", "Closed at one end gives odd harmonics only. A shorter length gives a higher pitch."),

    L("Room acoustics and reverberation", [
      ["Reverberation", "🏛️", "<b>Reverberation</b> is the many reflections of sound that blend together after the source stops. <b>RT60</b> is the time for the sound to drop by <b>60 decibels</b>."],
      ["Surfaces", "🧱", "Hard smooth surfaces (stone, glass) <b>reflect</b> sound. Soft ones (carpet, curtains, foam) <b>absorb</b> it. <b>Diffusers</b> scatter sound in many directions."],
      ["Good rooms", "🎻", "Speech rooms need short RT60 (about half a second). Symphony halls are around <b>two seconds</b>. Stone cathedrals can last much longer. Wallace Sabine pioneered this science."]
    ], [
      "RT60 is the time it takes sound to fall by...|60 decibels|60 seconds|60 hertz",
      "Hard, smooth surfaces such as stone...|reflect sound|absorb sound|make no echo",
      "Carpets and curtains mostly...|absorb sound|reflect sound|amplify sound",
      "A room for speech should have a ___ reverberation time.|short|very long|infinite",
      "Big stone cathedrals usually have...|long reverberation times|no reverberation|very short reverberation",
      "Diffusers in a room...|scatter sound in many directions|absorb all sound|amplify bass",
      "A distinct repeat of a sound heard later is an...|echo|diffuser|node",
      "Wallace Sabine is known for his work on...|reverberation time|the piano|opera",
      "Foam panels on studio walls are for...|absorbing reflections|making sound louder|heating the room"
    ], "Ask whether the surface or room is hard and reflective, or soft and absorbing.", "Reverb time is how long sound lingers. Hard rooms linger, soft rooms do not."),

    L("Subtractive synthesis", [
      ["Start bright, then carve", "🎛️", "<b>Subtractive synthesis</b> starts with a harmonically rich wave (sawtooth or square) from an <b>oscillator</b>, then removes harmonics with a <b>filter</b>. A <b>low-pass filter</b> cuts highs, so lowering the cutoff makes the sound darker."],
      ["Envelope", "📈", "<b>ADSR</b> shapes loudness over time: <b>Attack</b> (time to reach full level), <b>Decay</b> (time to fall), <b>Sustain</b> (a level held while the key is down) and <b>Release</b> (time to fade after the key is let go)."],
      ["LFO", "🌊", "A <b>low frequency oscillator</b> (LFO) is too slow to hear as a note, but it wobbles another setting. On pitch it gives <b>vibrato</b>; on volume it gives <b>tremolo</b>."]
    ], [
      "In ADSR, the A stands for...|attack|amplitude|alto",
      "In ADSR, which stage is a level, not a time?|sustain|attack|release",
      "A low-pass filter lets through...|low frequencies and cuts highs|high frequencies and cuts lows|only one note",
      "Turning the filter cutoff down makes a sound...|darker|brighter|louder",
      "A pure sine wave contains...|only the fundamental|all harmonics|odd harmonics only",
      "A square wave has...|only odd harmonics|all harmonics|no harmonics",
      "An LFO is a...|low frequency oscillator used for slow modulation|loud frequency output|long fade option",
      "An LFO controlling pitch gives...|vibrato|tremolo|reverb",
      "The release stage happens...|after the key is let go|before the key is pressed|while the key is held"
    ], "Break the sound into three parts: source, filter and envelope.", "Subtractive means starting with lots of harmonics and removing some."),

    L("MIDI", [
      ["Instructions, not sound", "🎹", "<b>MIDI</b> (Musical Instrument Digital Interface, 1983) sends <b>messages</b> such as note on, note off, velocity and pitch bend. It carries <b>no audio</b>, so files are tiny."],
      ["Numbers", "🔢", "Notes and <b>velocity</b> (how hard a key is struck) use values <b>0 to 127</b>. Middle C is note <b>60</b>. One MIDI connection has <b>16 channels</b>; in General MIDI, drums are on channel <b>10</b>."],
      ["Flexibility", "🛠️", "Because MIDI is only instructions, you can change the instrument, key or tempo after recording. Control changes can adjust volume or modulation."]
    ], [
      "MIDI sends...|instructions about notes, not sound|recorded audio|pictures",
      "MIDI velocity means...|how hard the key was struck|how long the song is|which key signature",
      "MIDI velocity values range from...|0 to 127|1 to 10|0 to 1000",
      "One MIDI connection carries how many channels?|16|2|88",
      "In MIDI numbering, middle C is note number...|60|1|88",
      "Because MIDI is only instructions, you can easily change...|the instrument sound and tempo|nothing at all|the room",
      "Compared with audio, MIDI files are...|tiny|huge|exactly the same size",
      "In General MIDI, drums are usually on channel...|10|1|16",
      "MIDI was introduced in the early...|1980s|1880s|2010s"
    ], "MIDI is a language of messages. Is it sound, or a set of instructions?", "Think of numbers: 0 to 127, 16 channels, and middle C as 60.")
  ];
  l28.push(
    MIX("Mixed practice", l28.slice(0, 9)),
    MIX("Level 28 Challenge", l28.slice(9))
  );

  // ======================= LEVEL 29 =======================
  const l29 = [
    L("Enharmonic modulation", [
      ["Same sound, new spelling", "🔀", "<b>Enharmonic</b> notes sound the same but are spelled differently (G sharp and A flat). In an <b>enharmonic modulation</b>, a chord is respelled so it has a new meaning in a new key."],
      ["Favorite pivots", "🧭", "A <b>German sixth</b> sounds the same as a <b>dominant seventh</b>. In C minor, A flat, C, E flat, F sharp can be respelled A flat, C, E flat, G flat, an A flat dominant seventh."],
      ["Diminished sevenths", "🎲", "A <b>diminished seventh</b> chord is symmetrical, so any of its four notes can be heard as the leading tone. This makes it a flexible pivot to many distant keys."]
    ], [
      "An enharmonic modulation works by respelling a chord so it...|has a new function in a new key|goes silent|is played twice",
      "A German augmented sixth sounds the same as a...|dominant seventh chord|major seventh chord|minor triad",
      "Respelling F sharp as G flat in the C-minor German sixth gives...|an A flat dominant seventh|an A flat major seventh|an A flat minor triad",
      "In a diminished seventh chord, which note can be heard as the leading tone?|any of the four notes|only the root|only the top note",
      "Enharmonic notes are notes that...|sound the same but are spelled differently|are in different octaves|are rests",
      "G sharp and A flat are...|enharmonic equivalents|a perfect fifth apart|the same note name",
      "Enharmonic modulations are often used to reach...|distant keys quickly|only the dominant|nothing at all",
      "Which chord type is symmetrical, making it good for pivots?|diminished seventh|major triad|dominant ninth",
      "Enharmonic modulations are often written with accidentals changed from...|sharps to flats or flats to sharps|treble to bass|forte to piano"
    ], "Ask which note or chord is being respelled, and what it sounds like.", "Same sound, different name: a new spelling gives the chord a new job."),

    L("Canon and imitation", [
      ["Canon", "🔄", "In a <b>canon</b>, one voice (the leader) is imitated exactly by another (the follower). A <b>round</b> like 'Row, Row, Row Your Boat' is a simple canon. Pachelbel's famous Canon is in D major."],
      ["Changes", "🪞", "<b>Augmentation</b>: longer note values. <b>Diminution</b>: shorter note values. <b>Inversion</b>: upside down. <b>Retrograde</b>: backwards. A <b>crab canon</b> works forwards against itself backwards."],
      ["Intervals", "📏", "A canon at the octave has the follower an octave from the leader; a canon at the fifth uses a fifth. Bach's <i>Musical Offering</i> was built on a theme given by King Frederick the Great."]
    ], [
      "Augmentation means the theme is played in...|longer note values|shorter note values|reverse order",
      "Diminution means the theme is played in...|shorter note values|longer note values|upside down",
      "Inversion turns the melody...|upside down|backwards in time|into a chord",
      "Retrograde plays the melody...|backwards|upside down|twice as fast",
      "A crab canon is made to work played...|forwards against itself backwards|only softly|only once",
      "In a round, each voice...|enters in turn with the same melody|sings a different song|stays silent",
      "Pachelbel's famous Canon is in the key of...|D major|C major|G minor",
      "Bach's Musical Offering was written on a theme given by...|King Frederick the Great|Louis XIV|Haydn",
      "In a canon at the octave, the follower is...|an octave from the leader|in an unrelated key|at a different tempo"
    ], "Each name describes a way to change the melody: time, direction or order.", "Longer values = augmentation, shorter = diminution, upside down = inversion, backwards = retrograde."),

    L("Twelve-tone technique", [
      ["The row", "🔢", "A <b>tone row</b> uses all 12 pitch classes once each before any repeats. <b>Arnold Schoenberg</b> invented the method. The music avoids a home key."],
      ["Four forms", "🔁", "<b>P</b> (prime), <b>I</b> (inversion: intervals flipped), <b>R</b> (retrograde: backwards), <b>RI</b> (retrograde inversion: backwards and upside down). With 12 transpositions each, a row has <b>48 forms</b>."],
      ["The matrix", "🧮", "A 12 by 12 table called a <b>matrix</b> lists every prime and inversion form. Webern used rows to write very short, sparse pieces; Berg mixed rows with tonal feeling."]
    ], [
      "A tone row uses each of the 12 pitch classes...|exactly once before any repeats|as often as possible|three times",
      "The retrograde of a row is the row...|backwards|upside down|transposed up a fifth",
      "The inversion of a row flips each interval...|from going up to going down|into a rest|to the next octave",
      "RI means a row that is...|backwards and upside down|played twice as fast|played twice",
      "A row has how many forms (12 transpositions of P, I, R and RI)?|48|12|24",
      "A 12 by 12 table of all prime and inversion forms is a...|matrix|chorale|pitch ladder",
      "Who invented the twelve-tone method?|Arnold Schoenberg|Claude Debussy|Johann Sebastian Bach",
      "Twelve-tone music avoids a feeling of a...|home key|rhythm|beat",
      "Webern is known for music that is...|very short and sparse|enormous and loud|for brass band only"
    ], "Remember the four ways to change a row: same, flipped, backwards, or both.", "Count 4 shapes times 12 starting notes."),

    L("Minimalism", [
      ["Repeating patterns", "🔁", "<b>Minimalism</b> (from the 1960s) uses steady pulse, repeated patterns and slow change. <b>Terry Riley's</b> <i>In C</i> has 53 short patterns; each player decides when to move on."],
      ["Phasing and process", "🌀", "<b>Steve Reich</b> uses <b>phasing</b>: two identical parts slowly drift apart (<i>Piano Phase</i>, for two pianists). <b>Philip Glass</b> uses an <b>additive process</b>, adding or removing notes (<i>Einstein on the Beach</i>)."],
      ["After minimalism", "🚀", "<b>John Adams</b> blended minimalist pulse with Romantic color, for example <i>Short Ride in a Fast Machine</i>."]
    ], [
      "Terry Riley's In C is built from how many short patterns?|53|7|100",
      "Steve Reich's technique of two identical parts drifting apart is...|phasing|inversion|stretto",
      "Philip Glass's music often uses repeated patterns and an...|additive process|random dice|absence of rhythm",
      "Minimalism started in the...|1960s|1760s|1920s",
      "Reich's Piano Phase is for...|two pianists|full orchestra|solo cello",
      "Which composer wrote Short Ride in a Fast Machine?|John Adams|Philip Glass|Steve Reich",
      "In In C, each performer...|decides when to move on to the next pattern|plays at exactly the same time|stays silent",
      "Glass's opera about Einstein is called Einstein on the...|Beach|Moon|Train",
      "Minimalist music is full of...|repetition|constant key changes|nonstop new themes"
    ], "Minimalism means small ideas repeated. Which technique does the question describe?", "Think: Riley with patterns, Reich with phasing, Glass with additions, Adams with energy."),

    L("Graphic scores and indeterminacy", [
      ["New notation", "🖍️", "A <b>graphic score</b> uses pictures and shapes instead of standard notation, as in Cornelius Cardew's <i>Treatise</i>. A <b>text score</b> uses written instructions."],
      ["John Cage", "🎲", "<b>John Cage</b> used chance (tossing coins) to decide notes, invented the <b>prepared piano</b> (objects on or between strings), and wrote 4'33\", four minutes thirty-three seconds where the performer plays nothing and the sounds in the room become the music."],
      ["Listening", "👂", "<b>Indeterminacy</b> means parts are left to chance or the performer. <b>Pauline Oliveros</b> created <b>Deep Listening</b>, a practice of paying attention to all sounds."]
    ], [
      "A graphic score uses...|pictures and shapes instead of standard notation|only numbers|only rests",
      "Cornelius Cardew's Treatise is a famous...|graphic score|opera|hymn",
      "A prepared piano has objects placed...|between or on the strings|inside the pedals only|outside the building",
      "Who invented the prepared piano?|John Cage|Chopin|Schubert",
      "Cage's 4'33\" is made of...|silence from the performer, with room sounds|a single loud chord|a long drum solo",
      "Pauline Oliveros created a practice called...|Deep Listening|Fast Sight-reading|Absolute Counting",
      "A text score gives instructions as...|written words|only music staves|only colors",
      "Indeterminacy means some things are...|left to chance or the performer|exactly fixed|removed",
      "Cage often chose notes using chance operations such as...|tossing coins|looking up chords|copying old songs"
    ], "These ideas all loosen control. Which one matches the clue?", "Pictures = graphic, words = text, chance = indeterminacy."),

    L("Stravinsky's three periods", [
      ["Russian period", "🔥", "<b>Igor Stravinsky</b> was born in Russia. For Diaghilev's <b>Ballets Russes</b> in Paris he wrote <i>The Firebird</i>, <i>Petrushka</i> and <i>The Rite of Spring</i> (1913), famous for driving, irregular rhythms and dissonance."],
      ["Neoclassical period", "🏛️", "Around 1920 he turned to the forms of the 1700s: <i>Pulcinella</i> (based on music then thought to be by Pergolesi) and <i>Symphony of Psalms</i>, which has no violins or violas."],
      ["Serial period", "🔢", "Late in life he used twelve-tone ideas, as in <i>Agon</i> and <i>Threni</i>. Few composers changed style so boldly three times."]
    ], [
      "The Rite of Spring premiered in Paris in...|1913|1813|1963",
      "Stravinsky's early ballets were written for the company of...|Sergei Diaghilev|Louis XIV|Richard Wagner",
      "The Firebird, Petrushka and The Rite of Spring are...|ballets|operas|symphonies",
      "The Rite of Spring is famous for its...|driving irregular rhythms|gentle lullabies|silent movements",
      "Stravinsky's neoclassical period borrowed forms from...|the 1700s and earlier|jazz only|folk songs only",
      "Pulcinella is based on music then thought to be by...|Pergolesi|Bach|Wagner",
      "In his late period Stravinsky began using...|serial technique|only plainchant|no instruments",
      "Stravinsky was born in...|Russia|Poland|Spain",
      "Symphony of Psalms is for chorus and orchestra without...|violins and violas|trombones|horns"
    ], "Sort his works into three periods: ballets, old forms, and twelve-tone.", "Early = Russian ballets, middle = neoclassical, late = serial."),

    L("Copland, Gershwin and Ives", [
      ["Aaron Copland", "🌾", "<b>Aaron Copland</b> wrote open, wide-sounding music about America: the ballets <i>Appalachian Spring</i> and <i>Rodeo</i> (with the cowboy dance 'Hoe-Down') and <i>Fanfare for the Common Man</i>. He is called the 'Dean of American composers'."],
      ["George Gershwin", "🎷", "<b>George Gershwin</b> mixed classical music and jazz: <i>Rhapsody in Blue</i> (it opens with a clarinet glissando), <i>An American in Paris</i> and the opera <i>Porgy and Bess</i>."],
      ["Charles Ives", "🎺", "<b>Charles Ives</b> worked as an insurance executive and composed on the side. He quoted hymns, marches and folk tunes and layered them in daring ways. Bernstein later wrote <i>West Side Story</i>."]
    ], [
      "Aaron Copland wrote the ballet...|Appalachian Spring|Swan Lake|Giselle",
      "Fanfare for the Common Man is by...|Copland|Gershwin|Ives",
      "George Gershwin mixed classical music with...|jazz|chant only|bagpipes",
      "Rhapsody in Blue begins with a famous...|clarinet glissando|drum crash|organ chord",
      "Charles Ives worked as a(n)...|insurance executive|opera singer|sailor",
      "Ives often quoted American hymns and...|marches and folk tunes|Italian arias|Gregorian chant only",
      "Gershwin's opera is...|Porgy and Bess|Carmen|Tosca",
      "Leonard Bernstein wrote the musical...|West Side Story|Cats|Oklahoma!",
      "Copland's Rodeo includes the cowboy dance...|Hoe-Down|Minuet|Gavotte"
    ], "Match each composer to his best-known works.", "Copland = ballets, Gershwin = jazz and classical, Ives = hymns and quotations."),

    L("Gregorian chant and the church modes", [
      ["Plainchant", "⛪", "<b>Gregorian chant</b> is sung in <b>unison</b> without instruments, in <b>Latin</b>, with a free flowing rhythm. It is named for Pope Gregory I by tradition. Early notation used signs called <b>neumes</b>."],
      ["The modes", "🎼", "Chant uses the <b>church modes</b>: Dorian (white notes D to D), Phrygian (E to E), Lydian (F to F), Mixolydian (G to G). The <b>final</b> is the note where a melody ends; the <b>reciting tone</b> is where text is chanted."],
      ["Authentic and plagal", "↕️", "<b>Authentic</b> modes lie above the final. <b>Plagal</b> modes are centered around the final and have names starting with <b>Hypo-</b>, such as Hypodorian."]
    ], [
      "Gregorian chant is sung...|in unison, without accompaniment|in four parts with organ|with drums",
      "Plainchant texts are usually in...|Latin|English|Greek",
      "Early chant notation used signs called...|neumes|sonatas|C clefs",
      "The Dorian mode on D uses only...|white keys|black keys|F sharp",
      "The final of a mode is the...|note where the melody usually ends|highest note|first beat",
      "The note a chant often stays on while chanting text is the...|reciting tone|cadenza|tonic triad",
      "The Phrygian mode on E uses the white notes from...|E to E|C to C|F to F",
      "Plagal modes have names starting with...|Hypo-|Super-|Mega-",
      "The Mixolydian mode on G uses the white notes from...|G to G|A to A|B to B"
    ], "Think of the white-key scales and which note each one starts on.", "D = Dorian, E = Phrygian, F = Lydian, G = Mixolydian."),

    L("Handel and the oratorio", [
      ["Handel's life", "👑", "<b>George Frideric Handel</b> was born in Germany in 1685, the same year as J.S. Bach. He spent most of his career in <b>London</b> and wrote Italian operas, then English oratorios."],
      ["Oratorio", "🎶", "An <b>oratorio</b> is a large work for chorus, soloists and orchestra, usually on a sacred story and <b>without staging</b>. Handel's most famous is <b>Messiah</b> (first performed in Dublin, 1742), with the 'Hallelujah' chorus."],
      ["Other works", "⛵", "<i>Water Music</i> was first played on the River Thames. He also wrote <i>Music for the Royal Fireworks</i> and the coronation anthem <i>Zadok the Priest</i>."]
    ], [
      "Handel was born in...|Germany|England|Italy",
      "Handel spent most of his career in...|London|Paris|Moscow",
      "An oratorio is a large work for...|chorus, soloists and orchestra, usually unstaged|solo flute|marching band",
      "Handel's most famous oratorio is...|Messiah|The Creation|Elijah",
      "Messiah's famous chorus is...|Hallelujah|Ode to Joy|Dies irae",
      "Messiah was first performed in...|Dublin|Vienna|Boston",
      "Water Music was first played on...|the River Thames|the Rhine|a mountain lake",
      "Handel wrote the coronation anthem...|Zadok the Priest|Rule Britannia|Ode to Joy",
      "Handel was born in the same year as...|J.S. Bach|Mozart|Beethoven"
    ], "Remember Handel's birthplace, his adopted city and his big English works.", "Oratorio = like an opera story told in concert, usually sacred."),

    L("Women composers through history", [
      ["Early voices", "📜", "<b>Hildegard of Bingen</b> (1100s) was an abbess who wrote chant. <b>Francesca Caccini</b> and <b>Barbara Strozzi</b> wrote vocal music in the 1600s."],
      ["Romantic era", "🎹", "<b>Clara Schumann</b> was a famous pianist and composer. <b>Fanny Mendelssohn</b> (sister of Felix) wrote hundreds of works. <b>Amy Beach</b> wrote the 'Gaelic' Symphony, the first symphony by an American woman."],
      ["1900s", "🌟", "<b>Florence Price</b>'s Symphony No. 1 was played by the Chicago Symphony in 1933. <b>Lili Boulanger</b> was the first woman to win the Prix de Rome. <b>Nadia Boulanger</b> taught many great composers. <b>Ethel Smyth</b> wrote 'March of the Women'."]
    ], [
      "Hildegard of Bingen was a medieval...|abbess and composer|king|cellist",
      "Clara Schumann was a famous Romantic...|pianist and composer|opera singer only|painter",
      "Fanny Mendelssohn was the sister of...|Felix Mendelssohn|Franz Schubert|Johannes Brahms",
      "Florence Price's Symphony No. 1 was played by a major US orchestra in...|1933|1733|1993",
      "Amy Beach's 'Gaelic' is a...|symphony|ballet|requiem",
      "Lili Boulanger was the first woman to win the...|Prix de Rome|Nobel Prize|Pulitzer",
      "Nadia Boulanger became famous as a...|teacher of many composers|trumpet player|opera director",
      "Ethel Smyth wrote the song...|March of the Women|The Planets|Messiah",
      "Hildegard of Bingen lived in the...|1100s|1500s|1900s"
    ], "Place each woman in her time: medieval, Romantic or modern.", "Match name to role: abbess, pianist, symphonist, teacher."),

    L("Ethnomusicology: classifying instruments", [
      ["Hornbostel-Sachs", "🗂️", "In 1914 Erich von Hornbostel and Curt Sachs sorted instruments by <b>how they make sound</b>: <b>idiophones</b> (the body vibrates: xylophone, cymbal), <b>membranophones</b> (a skin: drums), <b>chordophones</b> (strings: violin, guitar), <b>aerophones</b> (air: flutes, trumpets). Later came <b>electrophones</b> (synthesizers)."],
      ["Fieldwork", "🎙️", "Ethnomusicologists do <b>fieldwork</b>: they live with a community, listen, record and learn. Alan Lomax recorded folk music for archives."],
      ["Two viewpoints", "👀", "An <b>emic</b> view is from inside the culture, as its members see it. An <b>etic</b> view is from an outside observer."]
    ], [
      "Instruments whose body itself vibrates (xylophone) are...|idiophones|aerophones|chordophones",
      "Drums with stretched skins are...|membranophones|idiophones|aerophones",
      "Violins and guitars are...|chordophones|aerophones|idiophones",
      "Flutes and trumpets are...|aerophones|membranophones|electrophones",
      "Synthesizers are classed as...|electrophones|idiophones|chordophones",
      "The classification system was made by...|Hornbostel and Sachs|Bach and Handel|Cage and Reich",
      "An emic view of music is from...|inside the culture|an outside observer|a computer",
      "Living with a community to learn its music is called...|fieldwork|sight-reading|orchestration",
      "Alan Lomax is famous for...|recording folk music for archives|building pianos|inventing jazz"
    ], "Ask what part of the instrument makes the sound: body, skin, string or air.", "Idio = body, membrano = skin, chordo = string, aero = air."),

    L("Music of China and Japan", [
      ["China", "🏮", "Traditional Chinese music often uses a <b>pentatonic</b> scale. Instruments: the <b>erhu</b> (two-stringed fiddle), <b>pipa</b> (pear-shaped lute), <b>guzheng</b> (plucked zither) and <b>dizi</b> (bamboo flute)."],
      ["Japan", "🎌", "Japanese instruments include the <b>koto</b> (long plucked zither), the three-stringed <b>shamisen</b>, the <b>shakuhachi</b> (end-blown bamboo flute) and <b>taiko</b> (large drums)."],
      ["Court music", "🏯", "<b>Gagaku</b> is Japan's ancient court music, one of the oldest continuing kinds of orchestral music in the world."]
    ], [
      "The erhu is a...|two-stringed bowed fiddle|large drum|zither",
      "The pipa is a...|pear-shaped lute|drum|flute",
      "The guzheng is a...|plucked zither|trumpet|violin",
      "The dizi is a...|bamboo flute|bell|drum",
      "The Japanese koto is a...|long plucked zither|flute|bowl",
      "The shakuhachi is an...|end-blown bamboo flute|plucked lute|drum",
      "Taiko means...|drum|flute|song",
      "The shamisen has how many strings?|3|12|21",
      "Gagaku is Japan's...|ancient court music|folk lullaby|pop"
    ], "Sort the instrument by how it is played: bowed, plucked, blown or struck.", "Er = bowed, pipa/koto/guzheng = plucked, dizi/shakuhachi = blown, taiko = struck."),

    L("Afro-Cuban rhythm and clave", [
      ["Clave", "🥢", "The <b>clave</b> is a two-stick instrument and also a rhythmic pattern that anchors Afro-Cuban music. <b>Son clave</b> has five hits over <b>two bars</b>: three in one bar, two in the other (3-2 or 2-3)."],
      ["Instruments", "🥁", "<b>Congas</b> are tall hand drums. <b>Timbales</b> are shallow metal drums played with sticks. <b>Bongos</b> are small paired drums."],
      ["Styles", "💃", "Cuban <b>son</b> blends Spanish and African traditions. <b>Salsa</b> grew in New York from Cuban son and other styles. <b>Latin jazz</b> mixes jazz with Afro-Cuban rhythms; Dizzy Gillespie worked with Chano Pozo."]
    ], [
      "The clave is a...|two-stick rhythmic pattern that anchors the music|string instrument|dance step only",
      "A son clave is a pattern of five notes over...|two bars|one beat|four bars",
      "In 3-2 clave, the first bar has...|three hits|two hits|five hits",
      "Congas are...|tall drums played by hand|flutes|zithers",
      "Timbales are...|shallow metal drums played with sticks|keyboards|strings",
      "Salsa grew in the 1960s and 70s from Cuban son and other styles in...|New York City|Moscow|Tokyo",
      "Latin jazz mixes jazz with...|Afro-Cuban rhythms|polka|Gregorian chant",
      "Cuban son combines...|Spanish and African traditions|Chinese and Greek ones|Celtic and Inuit ones",
      "Dizzy Gillespie worked with the Cuban percussionist...|Chano Pozo|Ravi Shankar|Duke Ellington"
    ], "Clave means pattern and keys. How many hits, how many bars?", "Five hits spread across two bars: three then two, or two then three."),

    L("Reggae and Caribbean music", [
      ["Jamaica", "🇯🇲", "<b>Ska</b> (late 1950s), then <b>rocksteady</b>, then <b>reggae</b> (late 1960s) all grew in <b>Jamaica</b>. Reggae's guitar plays short chords on the <b>off-beats</b> (the 'skank'). The 'one drop' drum pattern puts the accent on beat three."],
      ["Stars and dub", "🎤", "<b>Bob Marley and the Wailers</b> took reggae worldwide. <b>Dub</b> is made by remixing tracks down to drums and bass with echo and reverb."],
      ["Trinidad", "🛢️", "<b>Calypso</b> and <b>soca</b> come from Trinidad. The <b>steelpan</b> was invented there from oil barrels."]
    ], [
      "Reggae began in...|Jamaica|Brazil|Ireland",
      "Ska came before...|rocksteady and reggae|bebop|baroque",
      "In reggae the guitar plays short chords on the...|off-beats|downbeats only|first beat only",
      "Bob Marley led the group...|the Wailers|the Beatles|the Supremes",
      "The one drop rhythm accents beat...|three|one|two",
      "Dub music is made by...|remixing tracks with echo and reverb|singing in rounds|playing strictly written parts",
      "Steelpans were invented in...|Trinidad and Tobago|Iceland|Mongolia",
      "Steel drums were first made from...|oil barrels|violin cases|wood stumps",
      "Calypso is a style from...|Trinidad|Austria|Nepal"
    ], "Reggae has a laid-back, off-beat feel from one island. Which one?", "Think about the order: ska, rocksteady, reggae, then dub."),

    L("Cents and the mathematics of tuning", [
      ["Cents", "🧮", "A <b>cent</b> is 1/100 of an equal-tempered semitone. A semitone is 100 cents, a whole tone is 200, and an <b>octave is 1200 cents</b>. In equal temperament a perfect fifth is 700 cents and a major third is 400."],
      ["Ratios", "➗", "Pure (just) intervals use simple ratios: octave <b>2:1</b>, fifth <b>3:2</b>, fourth <b>4:3</b>, major third <b>5:4</b>. The just fifth is about 702 cents, only about 2 cents wider than the equal-tempered one."],
      ["Frequencies", "📈", "Doubling the frequency goes up an octave. If A4 is 440 Hz, then A5 is 880 Hz and A3 is 220 Hz."]
    ], [
      "An octave is how many cents?|1200|100|700",
      "A semitone in equal temperament is...|100 cents|50 cents|200 cents",
      "A perfect fifth in equal temperament is...|700 cents|600 cents|800 cents",
      "The just perfect fifth has the ratio...|3:2|4:3|5:4",
      "The just major third has the ratio...|5:4|3:2|9:8",
      "The octave has the frequency ratio...|2:1|3:2|4:3",
      "If A4 is 440 Hz, A5 is...|880 Hz|660 Hz|220 Hz",
      "If A4 is 440 Hz, A3 is...|220 Hz|110 Hz|330 Hz",
      "A whole tone is...|200 cents|100 cents|400 cents"
    ], "Remember: 100 cents per semitone, 12 semitones per octave, and ratios for pure intervals.", "Count semitones and multiply by 100, or compare frequencies in ratios."),

    L("Beats and interference", [
      ["Waves add up", "🌊", "When two waves meet they add. Peaks meeting peaks give <b>constructive interference</b> (louder). Peaks meeting troughs give <b>destructive interference</b> (they cancel). Noise-cancelling headphones use this."],
      ["Beats", "💓", "Two tones with slightly different frequencies make <b>beats</b> at a rate equal to the <b>difference</b>: 440 Hz and 444 Hz give 4 beats per second."],
      ["Tuning", "🎹", "Piano tuners listen for beats. As two strings come closer in pitch, the beats get <b>slower</b>; when they stop, the pitches match."]
    ], [
      "Two tones of 440 Hz and 444 Hz make beats at...|4 per second|884 per second|2 per second",
      "Two tones of 300 Hz and 305 Hz make...|5 beats per second|605 beats per second|1 beat per second",
      "Two tones of 440 Hz and 446 Hz make...|6 beats per second|886 beats per second|3 beats per second",
      "Beats come from the interference of two...|close frequencies|echoes|reverberations",
      "When waves add to make a bigger wave, it is...|constructive interference|destructive interference|resonance",
      "When peaks meet troughs and cancel, it is...|destructive interference|constructive interference|resonance",
      "Noise-cancelling headphones use...|destructive interference|louder music|more bass",
      "As two strings are tuned closer, the beats get...|slower|faster|louder",
      "When beats stop, the two notes are...|the same pitch|an octave apart|silent"
    ], "Beats depend on the difference between two frequencies, not the sum.", "Subtract the smaller frequency from the larger."),

    L("Digital audio basics", [
      ["Sampling", "📏", "A computer measures the wave many times each second. The <b>sample rate</b> (CD: <b>44.1 kHz</b>) is how many measurements per second. The <b>bit depth</b> (CD: <b>16 bits</b>) is how finely each measurement is stored."],
      ["Nyquist", "📉", "The <b>Nyquist rule</b>: the sample rate must be more than <b>twice the highest frequency</b>. Human hearing reaches about 20 kHz, so you need over 40 kHz. Too low a rate causes <b>aliasing</b>, where high pitches fold into wrong lower ones."],
      ["Dynamic range", "📊", "Each extra bit adds about <b>6 dB</b> of dynamic range: 16 bits is about 96 dB and 24 bits is about 144 dB."]
    ], [
      "CD audio uses a sample rate of...|44.1 kHz|4.41 kHz|441 kHz",
      "CD audio has a bit depth of...|16 bits|2 bits|64 bits",
      "The Nyquist rule says the sample rate must be more than...|twice the highest frequency|half the highest frequency|the lowest frequency",
      "To record up to 20 kHz you need a sample rate over...|40 kHz|10 kHz|20 kHz",
      "Aliasing happens when...|frequencies above half the sample rate fold down to wrong tones|files get deleted|the volume is too low",
      "Higher bit depth gives...|more dynamic range and lower noise|a higher pitch|more reverb",
      "Each extra bit adds about...|6 dB of dynamic range|60 dB|1 dB",
      "Sample rate describes how many ___ per second.|measurements of the wave|notes|beats",
      "The human hearing range is about...|20 Hz to 20,000 Hz|2 Hz to 200 Hz|200 Hz to 2 kHz"
    ], "Sample rate is how often, bit depth is how precisely.", "Double the top frequency you want to capture."),

    L("Mixing basics", [
      ["EQ and compression", "🎚️", "An <b>equalizer (EQ)</b> boosts or cuts frequency bands. A <b>high-pass filter</b> removes low rumble. A <b>compressor</b> makes loud parts quieter, reducing dynamic range. The <b>threshold</b> is the level where compression begins; at a <b>4:1 ratio</b>, 4 dB over the threshold comes out only 1 dB over."],
      ["Space", "🎧", "<b>Panning</b> places a sound between left and right. <b>Reverb</b> and <b>delay</b> add a sense of space. A <b>send/aux bus</b> lets many tracks share one effect."],
      ["Levels", "📻", "<b>Clipping</b> happens when the level goes above the maximum and the wave is flattened. <b>Mastering</b> is the final polish of the finished mix."]
    ], [
      "An equalizer (EQ) changes...|the balance of frequencies|the tempo|the key",
      "A high-pass filter on a vocal removes...|low rumble|high shine|the middle",
      "A compressor makes loud parts...|quieter, reducing dynamic range|longer|higher in pitch",
      "In a compressor, the threshold is...|the level above which compression begins|the speed of the song|the file size",
      "With a 4:1 ratio, an input 4 dB above the threshold comes out...|1 dB above|4 dB above|16 dB above",
      "Panning places a sound...|between left and right speakers|higher or lower in pitch|closer in time",
      "Reverb adds...|a sense of space|a faster tempo|new notes",
      "Mastering is the...|final polish of the finished mix|first recording of drums|writing of lyrics",
      "A send/aux bus lets many tracks share...|one effect, such as reverb|one microphone|one guitar"
    ], "Match the tool to its job: tone, loudness, position or space.", "EQ = tone, compressor = loudness range, pan = left/right, reverb = space.")
  ];
  l29.push(
    MIX("Mixed practice", l29.slice(0, 9)),
    MIX("Level 29 Challenge", l29.slice(9))
  );

  // ======================= LEVEL 30 =======================
  const l30 = [
    L("Jazz voicings and guide tones", [
      ["Guide tones", "🧭", "The <b>guide tones</b> of a chord are its <b>third and seventh</b>, the notes that define its quality. In C7 they are E and B flat. In a ii-V-I, the seventh of one chord often moves by step to the third of the next."],
      ["Shell and rootless", "🐚", "A <b>shell voicing</b> has just the root, third and seventh. A <b>rootless voicing</b> leaves out the root (the bass player has it) and uses the 3rd, 5th, 7th and 9th."],
      ["Drop 2", "⬇️", "In a <b>drop 2</b> voicing, take a close-position four-note chord and drop the <b>second note from the top</b> down an octave. It is popular on guitar and in big-band writing."]
    ], [
      "The guide tones of a chord are its...|third and seventh|root and fifth|octave and ninth",
      "A shell voicing has the root, the seventh and the...|third|ninth|eleventh",
      "A rootless voicing leaves out the...|root|third|seventh",
      "In a drop 2 voicing, the second note from the top is moved...|down an octave|up an octave|up a fifth",
      "Rootless voicings often use...|the 3rd, 5th, 7th and 9th|root, root, root, root|only the 2nd",
      "In C7, the guide tones are...|E and B flat|C and G|D and F",
      "In C major seventh, the guide tones are...|E and B|C and G|D and A",
      "In D minor seventh, the guide tones are...|F and C|D and A|E and G",
      "In a ii-V-I, the seventh of one chord often moves by step to the ___ of the next.|third|fifth|root"
    ], "Guide tones are the two notes that give a chord its color. Which chord tones are they?", "Skip the root and the fifth: keep the third and the seventh."),

    L("Polyrhythm and metric modulation", [
      ["Polyrhythm", "🥁", "A <b>polyrhythm</b> plays different groupings at once. A <b>3:2</b> plays 3 notes against 2 in the same time; <b>4:3</b> plays 4 against 3. A <b>hemiola</b> makes two groups of three feel like three groups of two. West African drumming is full of polyrhythm."],
      ["Additive meters", "🧩", "<b>Additive meters</b> such as 7/8 are grouped unevenly, for example 2+2+3. They are common in Balkan folk music."],
      ["Metric modulation", "🔀", "<b>Metric modulation</b> changes tempo by making one note value become another. If a triplet eighth becomes the new eighth, the tempo gets faster. Elliott Carter made this famous."]
    ], [
      "A 3:2 polyrhythm plays 3 notes against...|2 notes in the same time|3 bars|2 bars",
      "Playing 4 evenly spaced notes against 3 in the same time is a...|4:3 polyrhythm|hemiola|canon",
      "Metric modulation changes tempo by...|reinterpreting a note value as the new beat|stopping the music|changing the key",
      "Elliott Carter is known for...|metric modulation|plainchant|bel canto",
      "A hemiola is...|two groups of three felt as three groups of two|a pair of cymbals|a dotted rest",
      "7/8 is often grouped as...|2+2+3|4+4|6+1+1",
      "Additive meters like 5/8 and 7/8 are common in...|Balkan folk music|Gregorian chant|barbershop",
      "If a triplet eighth note becomes the new eighth, the tempo gets...|faster|slower|unchanged",
      "Polyrhythms are widespread in...|West African drumming|plainchant|Lutheran hymns"
    ], "Think about two pulses at once, or one pulse reinterpreted as another.", "In polyrhythm both groupings fit the same span of time."),

    L("Microtonality", [
      ["Between the keys", "🎻", "<b>Microtonal</b> music uses intervals smaller than a semitone. A <b>quarter tone</b> is half a semitone, so there are <b>24</b> in an octave. Czech composer <b>Alois Hába</b> wrote quarter-tone music."],
      ["Harry Partch", "🛠️", "<b>Harry Partch</b> used a scale of <b>43 tones</b> per octave and built his own instruments. Indian music theory describes <b>22 shrutis</b>."],
      ["Instruments", "🎼", "A piano has fixed keys, 12 per octave, so it cannot play microtones. Violins and voices can slide to any pitch."]
    ], [
      "A quarter tone is...|half a semitone|double a tone|a third",
      "How many quarter tones fit in an octave?|24|12|48",
      "Harry Partch used a scale of...|43 tones per octave|12 tones per octave|3 tones per octave",
      "Harry Partch is known for...|building his own instruments|writing only for choir|inventing the piano",
      "Microtonal music uses intervals...|smaller than a semitone|only octaves|only fifths",
      "Which tradition describes 22 shrutis in theory?|Indian classical music|Gregorian chant|barbershop",
      "Alois Hába was a Czech composer of...|quarter-tone music|bel canto|swing",
      "A piano cannot play microtones because...|its keys are fixed at 12 per octave|it is too quiet|it has no strings",
      "Which of these can slide to microtones easily?|violin|piano|xylophone"
    ], "Micro means small. Smaller than what?", "A semitone halved gives a quarter tone; two of those per semitone, so double 12."),

    L("Entrainment and beat perception", [
      ["Syncing up", "👣", "<b>Entrainment</b> is when your body or brain locks onto an outside beat, like tapping your foot. Most people tap most comfortably at around <b>100 to 120 beats per minute</b>."],
      ["Beat and groove", "🎧", "<b>Beat perception</b> is hearing a steady pulse. It uses brain areas that handle <b>movement</b> as well as hearing. <b>Groove</b> is the feeling that makes you want to move. <b>Syncopation</b> puts accents on unexpected weak beats."],
      ["Pitch skills", "🎵", "<b>Relative pitch</b> is recognizing intervals between notes. <b>Absolute (perfect) pitch</b> is naming a note without a reference, and it is rare."]
    ], [
      "Entrainment means...|body or brain syncing with an outside beat|forgetting a tune|a tuning method",
      "Most people tap most comfortably at about...|100 to 120 beats per minute|10 to 20 beats per minute|400 to 500 beats per minute",
      "Hearing a steady pulse in music is called...|beat perception|timbre|inversion",
      "Relative pitch is...|recognizing intervals between notes|naming any note instantly|being tone deaf",
      "Absolute pitch is...|naming a note without a reference|hearing very quiet sounds|singing loudly",
      "Absolute pitch is...|rare|found in everyone|impossible to find",
      "Syncopation...|puts accents on unexpected weak beats|removes the beat|always speeds up",
      "Groove is the feeling that makes people...|want to move with the music|fall asleep|stop listening",
      "Beat perception involves brain areas for...|movement as well as hearing|only sight|only smell"
    ], "These ideas are about how the brain and body respond to rhythm and pitch.", "Entrainment = syncing; relative pitch = intervals; absolute pitch = naming notes."),

    L("Topic theory", [
      ["Musical topics", "🏷️", "In Classical music a <b>topic</b> is a familiar style that suggests an idea or setting. Scholar <b>Leonard Ratner</b> wrote about them."],
      ["Examples", "🗺️", "<b>Hunt</b>: horn calls, often in 6/8. <b>Pastoral</b>: drones and gentle swaying rhythms (countryside). <b>Military</b>: fanfares and dotted rhythms. <b>Turkish (janissary)</b>: cymbals, bass drum and piccolo."],
      ["More topics", "⚡", "<b>Learned style</b>: counterpoint and fugue. <b>Singing style</b>: lyrical, song-like melody. <b>Sturm und Drang</b> ('storm and stress'): stormy, intense, often minor."]
    ], [
      "A musical topic is a...|familiar style that suggests an idea or setting|key signature|rhythm of syllables",
      "Horn calls in 6/8 suggest the...|hunt|sea|circus",
      "Drones and gentle swaying rhythms suggest the...|pastoral (countryside)|battle|funeral",
      "Fanfares and dotted rhythms suggest the...|military topic|lullaby|musette",
      "Cymbals, bass drum and piccolo suggested the...|Turkish (janissary) style|Scottish style|Gregorian style",
      "The learned style uses...|counterpoint and fugue|only chords|only drums",
      "The scholar who wrote about topics in Classical music was...|Leonard Ratner|Heinrich Schenker|Allen Forte",
      "The singing style uses...|lyrical, song-like melody|rapid scales only|noise",
      "Sturm und Drang music is...|stormy, intense and often in minor|calm and sleepy|always in C major"
    ], "A topic is a clue about a scene or style. What scene fits the sound described?", "Horns = hunt, drones = countryside, fanfares = military, cymbals and drums = Turkish."),

    L("Approaches to musicology", [
      ["Branches", "🔬", "<b>Historical musicology</b> studies music's past using sources. <b>Ethnomusicology</b> studies music in its culture. <b>Organology</b> studies instruments. <b>Music cognition</b> studies how the mind perceives and creates music. <b>Performance studies</b> looks at how music is actually performed."],
      ["Sources and canon", "📚", "A <b>primary source</b> is first-hand evidence from the time (a score, letter or diary). The <b>canon</b> is the body of works regarded as the most important; scholars now question who is left out."],
      ["Ideas", "💭", "<b>Formalism</b>: Eduard Hanslick argued music's beauty lies in its sound forms, not in stories or feelings. <b>Hermeneutics</b> is about interpreting meaning."]
    ], [
      "Organology is the study of...|musical instruments|singing voices|rhythm syllables",
      "Historical musicology studies...|music's past, using sources|only living composers|only acoustics",
      "Eduard Hanslick argued that music's beauty lies in...|its sound forms, not stories or feelings|its words|its price",
      "A primary source is...|a first-hand document or score from the time|a textbook written today|a song cover",
      "The musical canon means...|the body of works regarded as the most important|a type of round|a cannon",
      "Ethnomusicology often studies...|music in its cultural context|only European scores|only silence",
      "Music cognition studies...|how the mind perceives and creates music|how to build a violin|which key is best",
      "Hermeneutics in music is about...|interpreting meaning|tuning|counting beats",
      "Performance studies looks at...|how music is actually performed|how microphones are built|how paper is made"
    ], "Each branch has a focus: past, culture, instruments, mind or performance.", "Match the word root: organ = instrument, ethno = culture, cognition = mind."),

    L("Historically informed performance", [
      ["Original sound", "🎻", "<b>Historically informed performance</b> tries to sound like music did in its own time. Players use <b>period instruments</b>: gut strings, natural trumpets without valves, harpsichord and the <b>fortepiano</b> (Mozart's piano)."],
      ["Pitch and style", "🎚️", "Baroque pitch is often about <b>A = 415 Hz</b>, lower than today's 440. Players use less constant vibrato and add improvised <b>ornaments</b>."],
      ["Reading the past", "📜", "<b>Continuo</b> players read a bass line with numbers (figured bass) and improvise chords. Treatises by Quantz, C.P.E. Bach and Leopold Mozart explain how music was played."]
    ], [
      "Baroque pitch is often set at about...|A = 415 Hz|A = 880 Hz|A = 100 Hz",
      "Strings on early instruments were made of...|gut|plastic only|carbon",
      "The piano of Mozart's time is the...|fortepiano|synthesizer|harmonium",
      "Historically informed players often use...|less constant vibrato|heavy constant vibrato|no bows",
      "In Baroque music, performers often added...|ornaments and improvised decorations|extra bars|new lyrics",
      "Continuo players read a bass line with...|figures (figured bass)|tablature|graphic shapes",
      "Early trumpets without valves are called...|natural trumpets|piccolo pipes|pocket trumpets",
      "A treatise by Quantz teaches how to play...|the flute and perform music of his day|jazz|computers",
      "Original instrument performance aims to...|sound close to how music sounded in its own time|make music louder|use only modern tools"
    ], "The goal is to bring back how music sounded long ago. What would they have used?", "Gut strings, lower pitch, less vibrato, improvised ornaments."),

    L("Conducting and reading a score", [
      ["The conductor", "🪄", "A conductor shows tempo, dynamics and entrances. The first beat of a bar goes <b>down</b>. In 3/4 the pattern is down, right, up. A <b>cue</b> is a gesture that brings in a player or section."],
      ["Transposing instruments", "🎷", "Many instruments sound a different note from the one written. <b>B-flat clarinet and trumpet</b>: a major second lower. <b>Horn in F</b>: a perfect fifth lower. <b>E-flat alto sax</b>: a major sixth lower. <b>Piccolo</b>: an octave higher. <b>Double bass</b>: an octave lower."],
      ["Score order", "📄", "A full score lists woodwinds at the top, then brass, percussion, and strings at the bottom. A <b>piano reduction</b> squeezes it onto two staves."]
    ], [
      "A B-flat clarinet sounds a ___ below written.|major second|perfect fifth|minor third",
      "A horn in F sounds a ___ below written.|perfect fifth|major second|octave",
      "An E-flat alto saxophone sounds a ___ below written.|major sixth|minor third|major second",
      "The piccolo sounds an octave...|higher than written|lower than written|exactly as written",
      "The double bass sounds an octave...|lower than written|higher than written|exactly as written",
      "In a full score the strings are at the...|bottom|top|middle",
      "In 4/4 the conductor's first beat moves...|down|up|sideways",
      "In a 3/4 conducting pattern the beats go...|down, right, up|down, left, right, up|only down",
      "A cue is...|a gesture bringing in a player or section|a rest|a repeat sign"
    ], "A transposing instrument sounds different from the written note. Higher or lower, and by how much?", "B-flat instruments: a tone lower. Horn in F: a fifth lower."),

    L("Musical theatre", [
      ["Parts of a show", "🎭", "A musical has a <b>book</b> (script and story), <b>music</b> and <b>lyrics</b>. An <b>overture</b> opens the show. A <b>reprise</b> repeats an earlier song later on."],
      ["History", "🗽", "<b>Broadway</b> is the theatre district of New York City. <i>Oklahoma!</i> (1943, Rodgers and Hammerstein) was an <b>integrated musical</b>: songs and story work together. Gilbert and Sullivan wrote light comic operas such as <i>The Pirates of Penzance</i>."],
      ["Modern", "🌟", "<b>Stephen Sondheim</b> wrote <i>Into the Woods</i>. <b>Lin-Manuel Miranda</b> wrote <i>Hamilton</i>, which mixes hip-hop with show tunes. <i>West Side Story</i> was by Bernstein."]
    ], [
      "A reprise is...|a repeat of an earlier song later in the show|a cut scene|a dance",
      "The 'book' of a musical is...|the script and story|the sheet music|a song list",
      "An overture is...|the opening instrumental piece|the final chord|an encore",
      "Oklahoma! (1943) was by...|Rodgers and Hammerstein|Gilbert and Sullivan|Andrew Lloyd Webber",
      "An integrated musical is one in which...|songs and story work together|only dancing happens|only speaking happens",
      "Stephen Sondheim wrote...|Into the Woods|Les Misérables|Cats",
      "Hamilton mixes...|hip-hop with show tunes|Gregorian chant with polka|only bagpipes",
      "Lin-Manuel Miranda wrote...|Hamilton|Wicked|Oklahoma!",
      "Gilbert and Sullivan wrote light comic operas such as...|The Pirates of Penzance|La bohème|Carmen"
    ], "A musical joins story, songs and dance. Which part does the clue describe?", "Book = story, overture = start, reprise = repeat."),

    L("Neoclassicism and Hindemith", [
      ["Back to clarity", "🏛️", "<b>Neoclassicism</b> (between the world wars) looked back to the clear forms and balance of the 1700s, but with modern harmony. Stravinsky's <i>Pulcinella</i>, Prokofiev's 'Classical' Symphony (No. 1) and Ravel's <i>Le Tombeau de Couperin</i> (a tribute to French Baroque style) are examples."],
      ["Hindemith", "🎻", "<b>Paul Hindemith</b> was a German composer who played the <b>viola</b>. He championed <b>Gebrauchsmusik</b>, 'music for use' by amateurs and communities."],
      ["Works", "📘", "His symphony <i>Mathis der Maler</i> is about the painter Grünewald. <i>Ludus Tonalis</i> is a set of fugues and interludes. He wrote the textbook <i>The Craft of Musical Composition</i>."]
    ], [
      "Neoclassicism looks back to...|the clarity and forms of the 1700s|plainchant only|rock",
      "Prokofiev's Symphony No. 1 is nicknamed...|Classical|Pastoral|Eroica",
      "Hindemith played the...|viola|tuba|harp",
      "Gebrauchsmusik means...|music for use|music for ghosts|silent music",
      "Hindemith's symphony Mathis der Maler is about...|a painter|a sailor|a king",
      "Ravel's Le Tombeau de Couperin pays tribute to...|French Baroque style|Spanish flamenco|Russian chant",
      "Hindemith's Ludus Tonalis is a set of fugues and...|interludes|marches|lullabies",
      "Neoclassical works often have...|clear forms and modern harmony|giant orchestras and endless chromatic wandering|no beat",
      "Hindemith wrote a textbook called...|The Craft of Musical Composition|The Art of Fugue|Gradus ad Parnassum"
    ], "Neo means new, classical means the old balanced style. Which composer or work fits?", "New harmony, old forms, clear textures."),

    L("Holy minimalism and postmodern music", [
      ["Arvo Pärt", "🔔", "<b>Arvo Pärt</b> is from <b>Estonia</b>. His <b>tintinnabuli</b> style (from 'bells') pairs a stepwise melody with a voice that plays the notes of a <b>triad</b>. <i>Spiegel im Spiegel</i> is calm, slow and simple."],
      ["Holy minimalism", "🕊️", "<b>Holy minimalism</b> is the name for simple, spiritual music by Pärt, <b>Henryk Górecki</b> (Poland; <i>Symphony of Sorrowful Songs</i>) and John Tavener (Britain)."],
      ["Postmodernism", "🎨", "<b>Postmodern</b> music mixes styles from different eras. <b>Polystylism</b>, used by Alfred Schnittke, means blending many styles in one work."]
    ], [
      "Arvo Pärt comes from...|Estonia|Portugal|Chile",
      "Pärt's tintinnabuli style is named after...|bells|drums|whistles",
      "In tintinnabuli, one voice moves by step while the other plays notes of a...|triad|cluster|whole-tone scale",
      "Pärt's Spiegel im Spiegel is...|calm and slow, with simple repeating patterns|loud and chaotic|made by chance",
      "Górecki was a composer from...|Poland|Spain|Brazil",
      "Górecki's Symphony No. 3 is subtitled...|Symphony of Sorrowful Songs|Eroica|Titan",
      "Polystylism means...|mixing many styles in one work|using one chord only|silence",
      "Alfred Schnittke is famous for...|polystylism|bel canto|chant",
      "Postmodern music often...|quotes and mixes styles from different eras|rejects all history|avoids all notes"
    ], "Holy minimalism is simple and spiritual; postmodern music is a mixture.", "Pärt = bells and triads; Górecki = Polish; Schnittke = many styles."),

    L("Hindustani and Carnatic traditions", [
      ["Two traditions", "🪷", "<b>Hindustani</b> music is mainly from <b>North India</b>; <b>Carnatic</b> music is mainly from <b>South India</b>. Both are built on <b>raga</b> (a melodic framework with characteristic phrases and mood) and <b>tala</b> (rhythm cycle), with a drone from the <b>tanpura</b>."],
      ["Instruments", "🎶", "Hindustani: <b>sitar</b> (long-necked plucked lute), sarod, <b>tabla</b> (pair of hand drums), bansuri. Carnatic: veena, violin and the two-headed drum <b>mridangam</b>. Ravi Shankar was a famous sitar player."],
      ["Form and names", "🗣️", "A raga performance often begins with a slow, free <b>alap</b>. The note names are <b>Sa Re Ga Ma Pa Dha Ni</b>. The Carnatic 'Trinity' is Tyagaraja, Muthuswami Dikshitar and Syama Sastri."]
    ], [
      "Hindustani music is mainly from...|North India|South India|Japan",
      "Carnatic music is mainly from...|South India|North India|Scotland",
      "The drone instrument in Indian music is the...|tanpura|tabla|dizi",
      "The slow, free-time opening of a raga performance is the...|alap|gat|cadenza",
      "The tabla is a pair of...|hand drums|flutes|lutes",
      "The mridangam is a two-headed drum of...|Carnatic music|Chinese opera|Scottish pipes",
      "The sitar is a...|long-necked plucked lute|drum|flute",
      "A raga is...|a melodic framework with characteristic phrases and mood|a drum pattern|a poem",
      "The sargam names run Sa, Re, Ga, Ma, Pa, Dha and...|Ni|Ti|Do"
    ], "North or south, drone or drum? Decide which tradition or instrument the clue describes.", "Raga is the melody world, tala is the rhythm cycle."),

    L("West African music", [
      ["Griots", "📖", "A <b>griot</b> (jeli) is a hereditary West African storyteller, historian and musician. The <b>kora</b> is a 21-string harp-lute, and the <b>balafon</b> is a wooden xylophone."],
      ["Drums", "🥁", "The <b>djembe</b> is a goblet-shaped hand drum. A <b>talking drum</b> changes pitch to imitate the tones of speech. Many ensembles use a repeating bell pattern called a <b>timeline</b>."],
      ["Layers", "🔗", "West African music layers rhythms into <b>polyrhythm</b> and uses <b>call and response</b>: a leader sings and others answer. The <b>mbira</b> (thumb piano) is linked to the Shona people of Zimbabwe, in southern Africa."]
    ], [
      "A griot (jeli) is a...|hereditary West African storyteller and musician|type of drum|dance step",
      "The kora has...|21 strings|4 strings|88 keys",
      "The balafon is a...|wooden xylophone|flute|fiddle",
      "The djembe is a...|goblet-shaped hand drum|bowed lute|trumpet",
      "A talking drum can...|change pitch to imitate speech|play only one pitch|only be played by choirs",
      "In West African ensembles a repeating bell pattern is called a...|timeline|cadenza|ritornello",
      "Call and response means...|a leader sings and others answer|everybody sings the same|all rest",
      "The mbira is especially linked with...|the Shona people of Zimbabwe|Japan|Iceland",
      "Many West African ensembles layer rhythms into...|polyrhythm|a monotone|a fugue"
    ], "Think of the storytellers, their instruments and how the parts fit together.", "Griots keep stories; drums talk; the group answers the leader."),

    L("Soundscapes and acoustic ecology", [
      ["Soundscape", "🌳", "The word <b>soundscape</b> was popularized by composer <b>R. Murray Schafer</b>. <b>Acoustic ecology</b> studies the relationship between living things and their sound environment. <b>Field recording</b> means recording sounds outdoors."],
      ["Schafer's terms", "🔔", "<b>Keynote sounds</b>: the background sounds of a place. <b>Signals</b>: sounds made to be noticed, like bells or sirens. <b>Soundmarks</b>: sounds special to a place, like landmarks. In a <b>hi-fi</b> soundscape individual sounds can be heard clearly."],
      ["Bernie Krause", "🐦", "<b>Biophony</b>: sounds of living creatures in nature. <b>Geophony</b>: natural non-living sounds like wind and water. <b>Anthrophony</b>: sounds made by humans and machines."]
    ], [
      "The word soundscape was popularized by...|R. Murray Schafer|J.S. Bach|Ravi Shankar",
      "A soundmark is...|a sound special to a place, like a landmark|a written dynamic|a cadence",
      "Keynote sounds are...|the background sounds of a place|the loudest alarms|rests",
      "A signal in Schafer's terms is...|a sound meant to be noticed, like a bell|a background hum|a pause",
      "Biophony means...|sounds made by living creatures in nature|sounds of machines|sounds of wind",
      "Geophony is...|natural non-living sounds such as wind and water|bird songs|traffic",
      "Anthrophony is...|sounds made by humans and machines|animal calls|thunder",
      "A hi-fi soundscape is one where...|individual sounds can be heard clearly|everything blurs together|there is no sound",
      "Recording sounds outdoors is called...|field recording|studio mixing|transcription"
    ], "Bio = life, geo = earth, anthro = human. Which one fits?", "Landmark for the ears = soundmark; background = keynote."),

    L("How instruments make sound", [
      ["Strings and bows", "🎻", "A bowed string moves by <b>stick-slip</b>, making a sawtooth-like vibration. In a violin the <b>soundpost</b> links top and back plates, and the <b>f-holes</b> let the body radiate sound. A <b>wolf tone</b> is a wavering note caused by a body resonance."],
      ["Winds and brass", "🎷", "A clarinet overblows at the <b>twelfth</b>; flutes and oboes overblow at the <b>octave</b>. Brass players change notes by changing <b>lip tension</b>; pressing a valve adds tubing, so the pitch goes <b>down</b>."],
      ["Piano", "🎹", "A piano hammer strikes near 1/8 of the string's length to reduce an unpleasant high harmonic (the 7th). Stiff strings make partials slightly <b>sharper</b> than exact harmonics: this is <b>inharmonicity</b>."]
    ], [
      "A clarinet overblows at the...|twelfth|octave|fourth",
      "Flutes and oboes overblow at the...|octave|twelfth|second",
      "A bowed string moves by stick-slip, making a vibration like a...|sawtooth wave|pure sine wave|silence",
      "The soundpost in a violin...|connects top and back plates and shapes tone|holds the bow|tunes the strings",
      "Brass players change notes within one valve combination by changing...|lip tension|string length|reed thickness",
      "Pressing a trumpet valve...|adds tubing, lowering the pitch|shortens tubing|closes the bell",
      "A piano hammer strikes near 1/8 of the string to reduce the...|7th harmonic|fundamental|pedal sound",
      "Piano strings are stiff, so their partials are...|slightly sharper than exact harmonics|exact|flatter",
      "A wolf tone is...|a wavering note caused by body resonance|a very quiet note|an extra high note"
    ], "Match the instrument family to what vibrates and how the pitch is changed.", "Overblow: clarinet jumps a twelfth, flute jumps an octave."),

    L("Stereo recording techniques", [
      ["Pairs of microphones", "🎙️", "<b>XY</b>: two cardioid mics with capsules together, angled apart. <b>AB</b>: two spaced omni mics. <b>ORTF</b>: two cardioids about <b>17 cm</b> apart, angled 110 degrees. <b>Blumlein</b>: two figure-8 mics at 90 degrees."],
      ["Mid-side", "↔️", "<b>Mid-side</b> uses a cardioid (mid) and a figure-8 (side). You can adjust the <b>stereo width</b> after recording."],
      ["Trade-offs", "⚖️", "Coincident pairs avoid time differences and stay <b>mono-compatible</b> (the mix still sounds good summed to one channel). Spaced pairs give a wider, more spacious image but with time differences. <b>Stereo</b> means two channels, left and right."]
    ], [
      "In an XY pair, two microphones are...|capsules together, angled apart|spaced 3 m apart|facing each other",
      "An AB pair uses...|two spaced omni microphones|one microphone|two figure-8 mics together",
      "The ORTF pair spaces two cardioid mics about...|17 cm apart|2 m apart|1 cm apart",
      "Mid-side recording uses a cardioid (mid) and a...|figure-8 (side)|omni|shotgun",
      "Mid-side lets you adjust...|stereo width after recording|the pitch|the tempo",
      "Coincident pairs avoid...|time differences between channels|loud sounds|the room",
      "The Blumlein pair uses two...|figure-8 mics at 90 degrees|omni mics|shotgun mics",
      "Spaced pairs give a...|wide, spacious image but time differences|mono-perfect image|silent image",
      "Mono compatibility means...|the stereo mix still sounds good summed to one channel|the mix is on one mic|only mono mics are used"
    ], "Decide whether the mics are together, apart, or in a special shape pairing.", "Together = XY, apart = AB, 17 cm = ORTF."),

    L("Types of synthesis", [
      ["Building sounds", "🎛️", "<b>Additive</b>: add sine waves together. <b>Wavetable</b>: scan through a table of stored waveforms. <b>Granular</b>: use tiny snippets of sound called <b>grains</b>. <b>Sampling</b>: record real sounds and play them from keys."],
      ["FM", "📡", "<b>FM synthesis</b> uses a <b>modulator</b> oscillator to change the frequency of a <b>carrier</b>. John Chowning discovered it, and the 1983 Yamaha <b>DX7</b> made it famous."],
      ["Modeling", "🧪", "<b>Physical modeling</b> simulates the physics of an instrument. <b>Bob Moog</b> is known for the Moog synthesizer, which used subtractive synthesis."]
    ], [
      "Additive synthesis builds sound by...|adding sine waves|filtering|cutting tape",
      "FM synthesis was discovered by...|John Chowning|Les Paul|Bob Moog",
      "The 1983 Yamaha synth famous for FM is the...|DX7|Minimoog|Mellotron",
      "Granular synthesis uses...|tiny snippets of sound called grains|giant sine waves|strings",
      "Wavetable synthesis...|scans through a table of stored waveforms|plucks strings|uses only filters",
      "Physical modeling...|simulates the physics of an instrument|plays recordings|prints scores",
      "Sampling means...|recording real sounds to play back from keys|writing chords|detuning",
      "Bob Moog is known for...|the Moog synthesizer|the DX7|the Mellotron",
      "In FM, a modulator oscillator changes the frequency of a...|carrier oscillator|filter|room"
    ], "Match the method to the word: add, scan, grain, model, sample, or modulate.", "FM = frequency modulation: one oscillator wobbles another."),

    L("Algorithmic and generative music", [
      ["Rules make music", "🧠", "An <b>algorithm</b> is a step-by-step set of rules. <b>Algorithmic composition</b> uses rules or a program to make music. In a <b>Markov chain</b> melody, the next note is chosen from probabilities that depend on the <b>current note</b>."],
      ["History", "🎲", "A 'musical dice game' attributed to Mozart used dice to choose prewritten bars. <b>Iannis Xenakis</b> used probability (<b>stochastic</b> music). <b>Brian Eno</b> made <i>Music for Airports</i>, a famous <b>generative</b> work."],
      ["Questions", "🤔", "A <b>seed</b> is a starting number that decides the random choices; the same seed gives the same result. Giving credit to artists whose work was used as training data is a matter of <b>ethics and copyright</b>."]
    ], [
      "An algorithm is...|a step-by-step set of rules|a loud chord|a type of drum",
      "In a Markov chain melody, the next note is chosen based on...|the current note and set probabilities|the weather|alphabet order",
      "The musical dice game attributed to Mozart used dice to...|choose prewritten bars|tune the piano|conduct",
      "Iannis Xenakis used math such as...|probability (stochastic music)|only plainchant|none at all",
      "Generative music is...|music made by a system that can keep creating variations|music from one fixed recording|music without sound",
      "Brian Eno released the ambient album...|Music for Airports|Rhapsody in Blue|Tubular Bells",
      "A rule-based computer program that makes melodies is...|algorithmic composition|sight-reading|solfège",
      "A seed in a music generator is...|a starting number that decides random choices|a musical key|a plant",
      "Giving credit to artists whose work trained a music generator is a matter of...|ethics and copyright|tempo|key signatures"
    ], "Think of rules plus chance. What decides each choice?", "Same seed, same rules, same result.")
  ];
  l30.push(
    MIX("Mixed practice", l30.slice(0, 9)),
    MIX("Level 30 Challenge", l30.slice(9))
  );

  Object.assign(MUSIC_LEVELS, { 28: l28, 29: l29, 30: l30 });
})();
