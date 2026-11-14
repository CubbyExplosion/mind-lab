// Mind Lab Music, levels 25-27 (extension file). 20 lessons per level.
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

  // ======================= LEVEL 25 =======================
  const l25 = [
    L("Chromatic solfège", [
      ["Raised notes", "⬆️", "In <b>movable do</b>, a note raised by a half step changes its vowel to <b>-i</b>: do becomes <b>di</b>, re becomes <b>ri</b>, fa becomes <b>fi</b>, sol becomes <b>si</b>, la becomes <b>li</b>."],
      ["Lowered notes", "⬇️", "A lowered note changes its vowel to <b>-e</b> (or <b>-a</b> for re): ti becomes <b>te</b>, la becomes <b>le</b>, sol becomes <b>se</b>, mi becomes <b>me</b>, re becomes <b>ra</b>."],
      ["The whole scale", "🎼", "Going up chromatically you sing: do di re ri mi fa fi sol si la li ti do. Going down: do ti te la le sol se fa mi me re ra do."]
    ], [
      "In movable do, raised fa is sung...|fi|se|di",
      "In movable do, raised sol is sung...|si|ti|se",
      "In movable do, lowered ti is sung...|te|ti|le",
      "In movable do, lowered mi is sung...|me|fa|ri",
      "In movable do, lowered la is sung...|le|li|se",
      "In movable do, lowered sol is sung...|se|si|fi",
      "In movable do, raised do is sung...|di|ra|me",
      "In movable do, raised re is sung...|ri|ra|me",
      "In movable do, lowered re is sung...|ra|ri|di",
      "Going up chromatically, which syllable comes right after fa?|fi|sol|mi",
      "Going up chromatically, which syllable comes right after la?|li|ti|le",
      "In C major, the syllable fi is the note...|F sharp|F natural|G natural",
      "In C major, the syllable te is the note...|B flat|B natural|A flat",
      "In C major, the syllable me is the note...|E flat|E natural|F sharp"
    ], "Raised notes and lowered notes end in different vowels. Which kind of change is in the question?", "Start from the plain syllable, then change only its ending: one vowel for raised, a different vowel for lowered."),

    L("Writing for choir: SATB", [
      ["Four voices", "🎤", "A mixed choir has <b>soprano</b> and <b>alto</b> (higher voices) and <b>tenor</b> and <b>bass</b> (lower voices). Writing for them is called four-part or <b>SATB</b> writing."],
      ["Spacing", "↔️", "Keep neighboring upper voices (soprano-alto and alto-tenor) within an <b>octave</b>. Only the tenor and bass may be farther apart. Voices should not <b>cross</b>."],
      ["Doubling", "2️⃣", "A triad has three notes but we have four voices, so one note is <b>doubled</b>. In root position, double the <b>root</b>. Never double the leading tone."]
    ], [
      "From highest to lowest, the four choir parts are...|soprano, alto, tenor, bass|bass, tenor, alto, soprano|alto, soprano, bass, tenor",
      "In four-part writing, the soprano and alto should stay within...|an octave of each other|two octaves of each other|a second of each other",
      "In four-part writing, which neighboring pair may be more than an octave apart?|tenor and bass|soprano and alto|alto and tenor",
      "In SATB writing, voice crossing means...|a lower voice goes above a higher voice|two voices sing the same note|a voice rests",
      "In a root-position triad, the note usually doubled is the...|root|third|leading tone",
      "Which note should usually not be doubled in a V chord?|the leading tone|the root|the bass note",
      "In close position, the soprano, alto and tenor all fit within...|one octave|two octaves|a third",
      "Tenor parts are often written in treble clef and sound...|an octave lower than written|an octave higher than written|a fifth higher than written",
      "The soprano range starts around...|middle C|two octaves below middle C|the top of the bass staff"
    ], "Picture the four voices stacked from high to low and think about how far apart neighbors may be.", "Textbook rules: keep upper voices close together, keep voices in order, and double the strongest chord note."),

    L("Galant schemata", [
      ["Stock patterns", "🧩", "In the 1700s (the <b>galant</b> style) composers shared stock patterns of melody and bass called <b>schemata</b>. Listeners learned to recognize them, just as we know common chord loops today."],
      ["Three patterns", "🎶", "<b>Do-Re-Mi</b>: melody climbs scale degrees 1-2-3. <b>Prinner</b>: melody falls 6-5-4-3 over a bass that falls 4-3-2-1. <b>Monte</b> rises by step in a sequence; <b>Fonte</b> falls by step."],
      ["Pachelbel", "🎻", "The bass of Pachelbel's Canon in D (D A B F-sharp G D G A) is a famous pattern. Pop songs still use it today."]
    ], [
      "A galant schema is...|a stock melody-and-bass pattern shared by many composers|a type of instrument|a tempo mark",
      "The Prinner melody falls through scale degrees...|6, 5, 4, 3|1, 2, 3, 4|5, 4, 3, 2",
      "The Prinner bass falls through scale degrees...|4, 3, 2, 1|1, 2, 3, 4|6, 5, 4, 3",
      "The Do-Re-Mi schema has a melody that climbs...|1, 2, 3|3, 2, 1|5, 6, 7",
      "The Monte schema is a sequence that...|rises step by step|falls step by step|stays on one note",
      "The Fonte schema is a sequence that...|falls step by step|rises step by step|stays on one note",
      "The galant style flourished in Europe around...|the mid 1700s|the 1300s|the 1900s",
      "The first notes of the bass line in Pachelbel's Canon in D are...|D A B F-sharp|D E F G|D D D D",
      "Learning schemata helps a musician...|recognize common patterns and predict what comes next|avoid ever repeating a pattern|ignore harmony"
    ], "Think about whether the line goes up or down and which scale degrees it visits.", "Remember the names: one pattern climbs, one falls in two voices at once, and one is a famous bass line."),

    L("European folk traditions", [
      ["Spain and Portugal", "🎸", "<b>Flamenco</b> comes from Andalusia in southern Spain: song (<b>cante</b>), guitar, dance (<b>baile</b>) and hand claps (<b>palmas</b>). <b>Fado</b> from Portugal is sung with the pear-shaped Portuguese guitar, often about longing, called <b>saudade</b>."],
      ["Klezmer", "🎷", "<b>Klezmer</b> grew from Jewish communities in Eastern Europe. Clarinet and violin imitate the voice with sobs, laughs and ornaments, and play lively dances."],
      ["Tango", "💃", "<b>Tango</b> began around the Rio de la Plata in Argentina and Uruguay. Its signature instrument is the <b>bandoneón</b>, a small button accordion."]
    ], [
      "Flamenco comes from the region of...|Andalusia in southern Spain|Lisbon in Portugal|Buenos Aires in Argentina",
      "Palmas in flamenco are...|rhythmic hand claps|guitars|castanets only",
      "In flamenco, the singing is called...|cante|baile|toque",
      "Fado is a song style from...|Portugal|Argentina|Hungary",
      "Fado songs are often about a feeling of longing called...|saudade|fiesta|rubato",
      "Klezmer music grew from the traditions of Jewish communities in...|Eastern Europe|South America|Polynesia",
      "A lead instrument in klezmer is the...|clarinet|bagpipe|marimba",
      "The signature instrument of the tango is the...|bandoneón|sitar|harp",
      "The tango began around the Rio de la Plata in Argentina and...|Uruguay|Chile|Peru",
      "The Portuguese guitar used in fado is...|a pear-shaped, wire-strung instrument|a hand drum|a flute"
    ], "Think about which country or region each tradition belongs to.", "Match the name to its home place and its special instrument or word."),

    L("Pitch, expectation and the brain", [
      ["Two kinds of pitch sense", "👂", "<b>Absolute pitch</b> (perfect pitch) is naming a note with no reference. It is rare. <b>Relative pitch</b> is recognizing notes by their distance from other notes. Most musicians use relative pitch, and it can be trained."],
      ["Expectation", "🎯", "<b>Leonard Meyer</b> (<i>Emotion and Meaning in Music</i>, 1956) said music moves us partly by meeting or denying what we expect. A <b>deceptive cadence</b> surprises us by avoiding the expected tonic."],
      ["Familiarity", "🔁", "The <b>mere-exposure effect</b> means we tend to like things more when they are familiar. Surprising moments can give some listeners <b>frisson</b>, a shiver or chills."]
    ], [
      "Absolute pitch is the ability to...|name a note without a reference note|play very loudly|read music quickly",
      "Relative pitch is the ability to...|recognize notes by their distance from other notes|hear very high sounds|sing only in a choir",
      "Most musicians rely mainly on...|relative pitch|absolute pitch|neither kind of pitch",
      "A deceptive cadence is surprising because...|we expect the tonic but hear another chord|it is very loud|it has no chords",
      "Tension in music is often created by...|delaying an expected resolution|playing only the tonic|stopping all sound",
      "Leonard Meyer wrote that musical emotion comes partly from...|expectations being met or denied|the price of the instruments|the length of the piece",
      "The mere-exposure effect says we tend to like things more when they are...|familiar|brand new|very loud",
      "Frisson (musical chills) is often linked to...|a surprising or intense moment|the lowest note|the tempo marking",
      "Music from an unfamiliar culture can sound unexpected at first because our expectations are...|learned from the music we have heard|the same for every person|stored in the ears only"
    ], "Ask what the listener predicts will happen and what actually happens.", "Separate the ideas: naming a note alone, hearing distances, and feelings caused by predictions."),

    L("Musicology: sources and catalogs", [
      ["Primary and secondary", "📜", "A <b>primary source</b> comes from the time itself, like a composer's <b>autograph manuscript</b> or letter. A <b>secondary source</b> is written later about it, like a biography."],
      ["Editions", "📚", "A <b>critical edition</b> compares sources to give the most reliable text. <b>Urtext</b> means 'original text'. A <b>facsimile</b> is a photographic copy of a manuscript."],
      ["Catalog numbers", "🔢", "Composers' works carry catalog numbers: <b>K.</b> (Köchel) for Mozart, <b>BWV</b> for Bach, <b>Hob.</b> for Haydn, <b>D.</b> (Deutsch) for Schubert. <b>Op.</b> is the opus number."]
    ], [
      "A primary source is...|a document or object from the time, like a composer's manuscript|a modern textbook|a review written last week",
      "An autograph manuscript is...|written in the composer's own hand|printed by a machine|a recording",
      "A critical edition tries to...|give the most reliable text by comparing sources|add the editor's favorite notes|shorten the piece",
      "Urtext means...|original text, faithful to the composer's intentions|a fast tempo|a modern arrangement",
      "A facsimile is...|a photographic copy of an original manuscript|a new arrangement|a typed lyric sheet",
      "A work labeled K. 525 is by...|Mozart|Bach|Schubert",
      "BWV numbers catalog the works of...|Bach|Mozart|Beethoven",
      "Hob. numbers catalog the works of...|Haydn|Handel|Chopin",
      "D. (Deutsch) numbers catalog the works of...|Schubert|Debussy|Brahms",
      "A secondary source is...|writing about the music made later, like a biography|the composer's own letter|the original score"
    ], "Decide whether the thing comes from the time of the composer or was made later, or whether it is a numbering system.", "Match each initial to the composer it was named for."),

    L("Microphones and polar patterns", [
      ["Types", "🎙️", "<b>Dynamic</b> mics are tough and need no power. <b>Condenser</b> mics are more sensitive and detailed and need <b>phantom power</b> (48 volts). <b>Ribbon</b> mics sound warm but are delicate."],
      ["Polar patterns", "🎯", "A <b>cardioid</b> (heart-shaped) pattern picks up mostly from the front. An <b>omnidirectional</b> pattern hears all around. A <b>figure-8</b> hears front and back and ignores the sides."],
      ["Using them", "🎛️", "<b>Proximity effect</b> boosts bass when a directional mic is close. A <b>pop filter</b> reduces bursts of air from 'p' and 'b' sounds. <b>XY</b> stereo uses two mics crossed at the same spot."]
    ], [
      "A cardioid microphone mostly picks up sound from...|the front|all directions equally|the sides only",
      "An omnidirectional microphone picks up sound from...|all directions|the front only|the back only",
      "A figure-8 microphone picks up sound from...|the front and back|the sides|only above",
      "Which microphone type usually needs phantom power?|condenser|dynamic|none of them",
      "A tough microphone that needs no power, good for loud live stages, is usually...|dynamic|condenser|ribbon",
      "Proximity effect is a boost in...|bass when the source is close to a directional mic|treble when far away|volume only at night",
      "A pop filter is used to reduce...|bursts of air from p and b sounds|room echo|electrical hum",
      "Phantom power is usually how many volts?|48|9|120",
      "An XY stereo pair uses...|two microphones crossed at the same point|one microphone in each room|a microphone and a speaker",
      "A delicate microphone known for a warm sound is the...|ribbon|dynamic|lavalier"
    ], "Think about the direction each microphone listens from, or what each part is used to fix.", "Match the pattern's shape or the mic's name with its special feature."),

    L("Writing about music", [
      ["Say what you hear", "✍️", "Good writing about music uses <b>specific evidence</b>: instruments, dynamics, rhythm, harmony and measure numbers. 'm. 12' means measure 12 and 'mm. 5-8' means measures 5 to 8."],
      ["Argue a point", "🧭", "A <b>thesis</b> is the main argument you will support. Each paragraph gives evidence for it. <b>Program notes</b> are short texts that help an audience understand a piece."],
      ["Give credit", "🔗", "Always credit the sources of ideas and quotations. Copying someone else's words without credit is plagiarism."]
    ], [
      "A strong sentence about music uses...|specific musical evidence like measure numbers|only the word nice|only opinions",
      "In an essay, 'mm. 5-8' means...|measures 5 to 8|minutes 5 to 8|major keys 5 to 8",
      "Program notes are...|short texts that help the audience understand a piece|the score itself|a rehearsal schedule",
      "A thesis statement in a music essay is...|the main argument you will support|a list of instruments|the title page",
      "A more precise word than 'pretty' for a melody is...|stepwise and lyrical|nice|good",
      "Which is the best evidence for 'the music grows tense'?|The bass repeats a rising pattern while the dynamics grow from piano to forte|It felt tense to me|My friend said so",
      "To avoid plagiarism, you must...|credit the sources of ideas and quotations|copy sentences carefully|hide your sources",
      "The abbreviation 'm. 12' stands for...|measure 12|minor 12|middle 12"
    ], "Ask which choice gives something a reader could actually check in the music or in a source.", "Prefer details that can be pointed to in the score or a source over vague feelings."),

    L("The piano's history", [
      ["Cristofori", "🎹", "Around 1700 in Florence, <b>Bartolomeo Cristofori</b> built an early piano. Its name <b>pianoforte</b> means 'soft-loud', because hammers let players change volume by touch. A harpsichord's strings are plucked and cannot do that."],
      ["Growing up", "🏗️", "Mozart played a light <b>fortepiano</b>. In the 1800s an <b>iron frame</b> allowed much higher string tension, so pianos became louder and fuller. <b>Érard's double escapement</b> (1821) allowed fast repeated notes."],
      ["Today", "🎼", "A modern piano has <b>88 keys</b>. Felt hammers strike the strings. The right (damper) pedal lifts the dampers so strings keep ringing."]
    ], [
      "Bartolomeo Cristofori built an early piano in Italy around...|1700|1500|1900",
      "The word 'pianoforte' means...|soft-loud|big keys|one string",
      "A harpsichord's strings are...|plucked|struck by hammers|bowed",
      "A piano's strings are struck by...|felt-covered hammers|quills|bows",
      "The light early piano of Mozart's time is called the...|fortepiano|synthesizer|accordion",
      "The iron frame let pianos handle...|much higher string tension|fewer keys|no pedals",
      "A modern piano has how many keys?|88|76|61",
      "Érard's double escapement (1821) lets a player...|repeat a note quickly|play without hammers|change the tuning",
      "The damper (right) pedal lets the strings...|keep ringing|go silent at once|change pitch"
    ], "Think about how the sound is made: plucked or struck, and what changed as pianos grew.", "Keep the order straight: first a plucked instrument, then a hammered one, then stronger frames."),

    L("Meantone and well temperament", [
      ["The problem", "🧮", "You cannot tune every fifth and third perfectly and still close the circle of keys. Different <b>temperaments</b> make different compromises."],
      ["Meantone and well", "🎼", "<b>Meantone</b> (1500s-1700s) made many major thirds sound pure and sweet, but far keys had a harsh <b>wolf</b> interval. <b>Well temperaments</b> let all keys be used, each with its own slightly different color. Bach's <i>Well-Tempered Clavier</i> has preludes and fugues in all 24 keys."],
      ["Equal", "⚖️", "<b>Equal temperament</b> makes all 12 semitones the same size, a ratio of the 12th root of 2. Every key sounds alike. Pianos are tuned this way today."]
    ], [
      "In equal temperament, every semitone is...|exactly the same size|different in each key|a simple whole-number ratio",
      "Equal temperament lets a keyboard play in...|every key equally well|only C major|only minor keys",
      "Meantone temperament made many major thirds sound...|pure and sweet, though some keys sounded bad|out of tune in all keys|louder",
      "A wolf interval is...|a badly out-of-tune interval in some tunings|a very loud chord|a very high pitch",
      "Well temperament lets players use all keys, each with...|its own slightly different color|exactly the same sound|only the major mode",
      "Bach's Well-Tempered Clavier has preludes and fugues in...|all 24 major and minor keys|only C major|12 minor keys only",
      "Pythagorean tuning is built from pure...|fifths in the ratio 3:2|thirds in the ratio 5:4|octaves only",
      "Most modern pianos are tuned in...|equal temperament|meantone|Pythagorean tuning",
      "Each equal-tempered semitone has a frequency ratio equal to the 12th root of...|2|3|12"
    ], "Think about whether the tuning favors some keys, or treats every key the same.", "Match the name of each tuning with its main compromise or advantage."),

    L("Country music and Nashville", [
      ["Roots", "🤠", "Country music grew from the folk songs, hymns, blues and cowboy songs of the southern United States. The <b>Carter Family</b>, recorded in 1927, are called the First Family of Country Music."],
      ["Music City", "🎸", "<b>Nashville, Tennessee</b> is nicknamed <b>Music City</b>. The radio show <b>Grand Ole Opry</b> began there in 1925. Its sound uses fiddle, banjo, guitar and the <b>pedal steel guitar</b>."],
      ["Styles", "🎶", "<b>Honky-tonk</b> is named for bars with live bands. <b>Bluegrass</b> is named for Bill Monroe's band the Blue Grass Boys. The <b>Nashville sound</b> (1950s-60s) added smooth strings and background singers."]
    ], [
      "Country music grew from the folk music of...|the southern United States|Japan|northern Europe only",
      "Nashville, Tennessee is nicknamed...|Music City|the Windy City|the Big Apple",
      "The long-running radio show Grand Ole Opry is in...|Nashville|Seattle|Miami",
      "A pedal steel guitar is...|played flat with a slide bar and foot pedals|a type of piano|a drum",
      "Typical country songs tell stories about...|everyday life, family and home|space travel only|nothing at all",
      "The Carter Family, recorded in 1927, are called...|the First Family of Country Music|inventors of jazz|opera stars",
      "A common country sound comes from fiddle, banjo, steel guitar and...|bright acoustic guitar|only brass|only synthesizers",
      "Honky-tonk music is named for...|bars where bands played|a type of banjo|a dance in Japan",
      "The Nashville sound of the 1950s and 60s added...|smoother strings and background singers|only solos|electronic synthesizers",
      "Bluegrass is named for the band of Bill Monroe, the...|Blue Grass Boys|Carter Family|Opry Stars"
    ], "Think about where the music grew up and what instruments belong to it.", "Match each name or word to its place, band or instrument."),

    L("Common-tone chords", [
      ["Decorating a chord", "🎀", "A <b>common-tone chord</b> decorates another chord. One note, the <b>common tone</b>, is held in the same voice while the other notes move by step to the decorated chord."],
      ["The ct°7", "🔷", "The <b>common-tone diminished seventh</b> (written <b>CT°7</b>) is a diminished seventh chord that contains a note of the triad it decorates, usually the root. A diminished seventh chord is a stack of minor thirds."],
      ["Romantic color", "🌅", "Romantic composers like Schubert and Brahms used these chords to add color without changing the key."]
    ], [
      "In a common-tone chord, the common tone is...|held in the same voice|always moved by leap|left out",
      "The symbol CT°7 stands for...|common-tone diminished seventh|computer tone seventh|chromatic tonic seventh",
      "A CT°7 decorates a...|major or minor triad|key signature|drum fill",
      "In a CT°7 decorating a C major triad, the common tone is usually...|C|F sharp|B flat",
      "A diminished seventh chord is a stack of...|minor thirds|perfect fifths|major seconds",
      "A diminished seventh chord splits the octave into...|four equal parts of three half steps|three equal parts|two equal parts",
      "The other notes of a common-tone chord usually...|move by step to notes of the chord it decorates|leap a ninth|stay unresolved forever",
      "A common-tone chord is an embellishing chord because it...|decorates a chord without changing the main harmony|always changes the key|replaces the tonic for good"
    ], "Ask what stays the same and what moves when one chord decorates another.", "One note is held while the rest move a step; the chord is built from equal small thirds."),

    L("Root motion and retrogression", [
      ["Strong motion", "⬇️", "Chord roots moving <b>down a fifth</b> (or up a fourth) are the strongest progressions in tonal music. Example: vi-ii-V-I, where each root drops a fifth."],
      ["Normal order", "➡️", "The usual order of function is <b>tonic, predominant, dominant, tonic</b>. A <b>retrogression</b> goes backward, such as V to IV or V to ii."],
      ["Weaker motion", "↔️", "Motion by <b>third</b> is weaker because the chords share two notes. Motion up a second, like IV to V, needs upper voices moving opposite to the bass."]
    ], [
      "The strongest root motion in tonal harmony is...|down a fifth (or up a fourth)|up a second|down a second",
      "In C major, after V, the strongest next chord by root motion is...|I|IV|ii",
      "A retrogression moves backward in the usual order of functions, such as...|V to IV|IV to V|I to V",
      "The usual function order is...|tonic, predominant, dominant, tonic|dominant, tonic, predominant|predominant, tonic, dominant",
      "In the circle progression vi - ii - V - I, each root moves...|down a fifth|up a fifth|up a step",
      "Root motion by third (like I to vi) is...|weaker, since the chords share two notes|the strongest kind|impossible",
      "A chord such as ii or IV that leads to the dominant is called...|a predominant|a tonic|a leading tone",
      "Which progression is a retrogression?|V - ii|ii - V|IV - V",
      "Retrogressions are common in rock because it is less bound to...|classical function rules|the number of strings|the tempo"
    ], "Compare the distance between the roots, or think about which way the function order is moving.", "Remember: falling fifths are strongest, and going back against the normal order is a retrogression."),

    L("Advanced non-chord tones", [
      ["Quick review", "🔁", "A <b>non-chord tone</b> is a note outside the chord. A <b>passing tone</b> fills a gap by step. A <b>neighbor</b> steps away and back. A <b>pedal point</b> holds one note while harmony changes above."],
      ["Leaps and delays", "🪂", "An <b>appoggiatura</b> is reached by leap and resolved by step. An <b>escape tone</b> is reached by step and left by a leap in the opposite direction. A <b>retardation</b> is like a suspension but resolves upward."],
      ["Early and double", "⏩", "An <b>anticipation</b> arrives early. <b>Double neighbors</b> (changing tones) go above and below a chord tone in turn. In Renaissance style a <b>cambiata</b> is approached by step and left by a leap of a third."]
    ], [
      "A retardation is like a suspension, but it resolves...|upward|downward|by a leap",
      "An escape tone is approached by step and left by...|a leap in the opposite direction|a step in the same direction|a tie",
      "An anticipation is a note that arrives...|early, before its chord|late|on a rest",
      "Neighbors above and below a chord tone in turn are called...|double neighbors (changing tones)|passing tones|pedal points",
      "A pedal point holds...|one note while harmony changes above|every note tied|a rest",
      "An appoggiatura is approached by...|leap and resolved by step|step and left by step|a tie",
      "A passing tone fills the gap between two chord tones by...|moving stepwise in one direction|leaping|repeating",
      "In the Renaissance cambiata, the dissonance is left by a leap of a...|third|octave|seventh",
      "A note that belongs to the chord is called...|a chord tone|a non-chord tone|a rest"
    ], "Look at how the note is approached and how it is left: by step, by leap, or held.", "Match each name to its pattern of approach and departure."),

    L("A cappella styles", [
      ["No instruments", "🎤", "<b>A cappella</b> means singing without instruments. Singers must listen closely to stay in tune, blend, and keep the beat together. Groups often start from a pitch pipe or tuner."],
      ["Barbershop", "✂️", "<b>Barbershop</b> harmony has four parts: tenor, lead, baritone, bass. The <b>lead</b> sings the tune. The tenor sings above it."],
      ["Doo-wop", "🎶", "<b>Doo-wop</b> groups of the 1950s sang close harmony with backing syllables over a lead singer. Modern groups use <b>beatboxing</b>, vocal sounds that imitate drums."]
    ], [
      "A cappella means singing...|without instruments|very quietly|only in a church",
      "In barbershop, the part that usually sings the melody is the...|lead|tenor|bass",
      "A barbershop quartet has how many parts?|4|3|8",
      "Doo-wop became popular in the...|1950s|1850s|1990s",
      "Doo-wop songs often use...|backing syllables and close harmony|only drums|no melody",
      "Beatboxing means...|making drum and bass sounds with the mouth|playing a box drum|silent singing",
      "In an a cappella group, the bass part often...|sings the bass line and root notes|sings the highest melody|plays drums",
      "A group singing a cappella often starts from a pitch given by...|a pitch pipe or tuner|a drum solo|a tempo change"
    ], "Think about what is missing in a cappella singing and which singers take which role.", "Match each style with its parts, its decade, or its special sounds."),

    L("Adaptive music for games", [
      ["Music that reacts", "🎮", "<b>Adaptive</b> (dynamic) music changes with what the player does. Fixed music is <b>linear</b>. Composers write it in pieces that fit together on the beat."],
      ["Two methods", "🧱", "<b>Vertical layering</b> adds or removes layers of the same track, like drums when danger rises. <b>Horizontal re-sequencing</b> jumps between different sections or tracks."],
      ["Tools", "🔧", "A <b>stinger</b> is a short musical hit for an event. A <b>loop</b> must join its end smoothly to its start. Changes should happen on a <b>beat or bar line</b>."]
    ], [
      "Music that changes with the player's actions is...|adaptive (dynamic) music|linear music|silent music",
      "In vertical layering, the game...|adds or removes layers of the same track|rewrites the notes|mutes all sound",
      "In horizontal re-sequencing, the game...|jumps between different sections or tracks|plays one bar forever|changes the screen",
      "A stinger is...|a short musical hit played for an event|a long loop|a microphone",
      "A game loop must be written so that its end...|joins smoothly back to its start|is very loud|has no rhythm",
      "Music transitions in games usually sound best when they happen on...|a beat or bar line|any random moment|a rest only",
      "Adding extra drum layers during a fight is meant to...|raise the intensity as danger grows|confuse the player|stop the music",
      "A character theme that returns when the character appears is a...|leitmotif|stinger|loop point"
    ], "Think about whether the music is fixed or reacts to the player, and how pieces join.", "Layers stack up at once; re-sequencing moves from one section to another; stingers are short."),

    L("Guitar chord shapes", [
      ["Open and barre", "🎸", "<b>Open chords</b> use open strings. The <b>CAGED</b> system names five shapes: C, A, G, E and D. A <b>barre chord</b> uses one finger across all strings so the shape can slide up and down the neck. Each fret moves a half step."],
      ["Power chords", "⚡", "A <b>power chord</b> has just the root and the fifth. With no third, it is neither major nor minor, and works well with distortion."],
      ["Capo", "📎", "A <b>capo</b> clamps across a fret and raises all the open strings. A G shape with a capo on fret 2 sounds as A. Standard tuning from low to high is E A D G B E."]
    ], [
      "A power chord contains...|a root and a fifth|a root and a third|only a seventh",
      "A barre chord is played by...|pressing across several strings with one finger|plucking harmonics|using a slide",
      "A capo...|raises the pitch of the open strings by clamping across a fret|lowers all strings|mutes the strings",
      "Standard guitar tuning from the lowest string to the highest is...|E A D G B E|E B G D A E|C G D A E B",
      "The CAGED system names the five open chord shapes...|C, A, G, E, D|C, A, G, E, B|A, B, C, D, E",
      "Sliding a barre-chord shape up one fret raises the chord by...|a half step|a whole step|an octave",
      "A capo on fret 2 with a G shape sounds like...|A|F|B",
      "A capo on fret 3 with a C shape sounds like...|E flat|D|F",
      "A power chord is neither major nor minor because it has no...|third|root|fifth",
      "A capo on fret 5 with a D shape sounds like...|G|A|E"
    ], "Count frets as half steps, or think about which notes are inside the chord.", "Add the fret number as half steps to the shape's name, or list the notes a chord needs."),

    L("Grooves and drum patterns", [
      ["Backbeat", "🥁", "In a <b>backbeat</b> the snare plays on beats <b>2 and 4</b>. In <b>four on the floor</b> the kick drum plays every beat. <b>Half-time</b> places the snare on beat 3 only."],
      ["Swung feel", "🎷", "A <b>shuffle</b> or swing feel plays eighth notes in a long-short pattern, like the first and third parts of a triplet (about 2:1)."],
      ["Details", "✨", "<b>Ghost notes</b> are very soft snare notes between the main beats. A <b>fill</b> is a short variation that leads into a new section."]
    ], [
      "In a backbeat, the snare plays on beats...|2 and 4|1 and 3|every beat",
      "In four on the floor, the kick drum plays...|on every beat|only on beat 2|only at the end",
      "In half-time feel, the snare is usually on...|beat 3 only|every beat|beat 1",
      "A shuffle plays eighth notes...|in a long-short pattern|all exactly equal|only on rests",
      "Ghost notes on the snare are...|very soft notes between the main beats|the loudest hits|cymbal crashes",
      "A drum fill is...|a short variation that leads into a new section|a pause for tuning|a constant rhythm",
      "Disco and house music often use...|four on the floor|no kick drum|only cymbals",
      "In swing, the long note takes about what part of the beat?|two thirds|one tenth|all of it",
      "The hi-hat in a basic rock beat often plays...|steady eighth notes|only one note|silence"
    ], "Picture a bar of four beats and decide where the kick and the snare land.", "Count 1-2-3-4 and place each drum on the beat the pattern's name suggests."),
  ];
  l25.push(
    MIX("Mixed practice", l25.slice(0, 9)),
    MIX("Level 25 Challenge", l25.slice(9))
  );

  // ======================= LEVEL 26 =======================
  const l26 = [
    L("Wagner, Tristan and the leitmotif", [
      ["Total artwork", "🎭", "<b>Richard Wagner</b> called his operas music dramas and wanted a <b>Gesamtkunstwerk</b>, a 'total work of art' joining music, words and staging. He built his own opera house at <b>Bayreuth</b>, opened in 1876."],
      ["Leitmotifs", "🔑", "A <b>leitmotif</b> is a short theme tied to a person, object or idea. His four-opera <i>Ring</i> cycle uses hundreds, and the orchestra can tell us what a character is thinking."],
      ["The Tristan chord", "🌀", "<i>Tristan und Isolde</i> (first performed 1865) opens with the <b>Tristan chord</b>, F-B-D sharp-G sharp. It does not resolve the way listeners expect, and the 'endless melody' avoids clear cadences, pushing tonality toward its limits."]
    ], [
      "Wagner wanted a Gesamtkunstwerk, which means a...|total work of art|big orchestra only|short song",
      "A leitmotif is...|a short theme linked to a person, object or idea|a long rest|a kind of key",
      "Wagner's Ring cycle has how many operas?|4|3|7",
      "Wagner built his own opera house in the town of...|Bayreuth|Vienna|Milan",
      "The Tristan chord is famous because it...|creates tension that does not resolve as expected|has only one note|is played only on drums",
      "The Tristan chord is spelled...|F, B, D sharp, G sharp|C, E, G, B|A, C, E, G",
      "'Endless melody' means phrases that...|avoid clear cadences so the music keeps flowing|never use melody|are always very short",
      "Tristan und Isolde was first performed in...|1865|1765|1965",
      "Chromatic harmony that avoids resolution pushed tonality toward...|its breakdown, influencing later atonal music|simple folk songs|Baroque dances"
    ], "Think about what the term means in German or what the composer wanted his music to join together.", "Link each word to its job: themes tied to meanings, one unresolved chord, and an opera house."),

    L("Brahms and Wagner: the debate", [
      ["Two camps", "⚔️", "In the 1850s-80s critics argued over two views. The <b>New German School</b> (Liszt, Wagner) favored <b>program music</b> and music drama. Brahms, the violinist Joachim and the critic <b>Eduard Hanslick</b> favored <b>absolute music</b>, music without a story or words."],
      ["Brahms", "🎻", "<b>Johannes Brahms</b> wrote four symphonies and <i>A German Requiem</i> (1868), with words from the German Bible. He worked more than ten years on his First Symphony, feeling the shadow of Beethoven."],
      ["Today", "🕊️", "Both views gave us great music. The 'war' was mostly fought in articles by critics and fans, not by the composers themselves."]
    ], [
      "The Romantic debate was between composers favoring program music and music drama versus...|absolute music|folk songs|jazz",
      "The New German School included...|Liszt and Wagner|Bach and Handel|Haydn and Mozart",
      "Brahms is most associated with...|absolute music in classical forms|music dramas|tone poems",
      "Brahms wrote how many symphonies?|4|9|2",
      "Eduard Hanslick was a famous...|music critic who defended absolute music|opera singer|piano maker",
      "Brahms's A German Requiem uses texts from...|the Bible in German|the Latin Mass|Greek plays",
      "Brahms took more than ten years to finish his First Symphony, partly because he felt...|the shadow of Beethoven|bored|short of paper",
      "Absolute music means music...|with no story or words to explain it|with a picture|for silent film"
    ], "Decide which side of the debate each name or word belongs to.", "One side told stories with music and drama; the other trusted pure forms and sound."),

    L("Bel canto and Italian opera", [
      ["Beautiful singing", "🎤", "<b>Bel canto</b> means 'beautiful singing'. Early 1800s Italian opera put smooth, flowing lines and agile, decorated singing at the center. Composers: <b>Rossini</b> (<i>The Barber of Seville</i>), <b>Bellini</b> (<i>Norma</i>), <b>Donizetti</b> (<i>Lucia di Lammermoor</i>)."],
      ["Forms", "🧩", "An aria often ended with a fast, brilliant <b>cabaletta</b>. A <b>Rossini crescendo</b> repeats a phrase while the orchestra gets louder and fuller."],
      ["Later", "🏛️", "<b>Verdi</b>'s <i>Aida</i> opened in Cairo in 1871. <b>Puccini</b> wrote <i>La Bohème</i> and <i>Tosca</i>. These later operas keep the singing line but add more drama."]
    ], [
      "Bel canto means...|beautiful singing|big orchestra|loud drums",
      "Rossini wrote the comic opera...|The Barber of Seville|Aida|La Bohème",
      "Bellini is famous for the opera...|Norma|Carmen|Fidelio",
      "Donizetti wrote...|Lucia di Lammermoor|The Magic Flute|Tosca",
      "Bel canto style highlights the singer's...|smooth lines and agile ornament|orchestra volume|dancing",
      "A Rossini crescendo is a passage that...|repeats a phrase while getting louder and fuller|gets quieter|stops",
      "Verdi's Aida had its first performance in...|1871|1771|1971",
      "Puccini's operas include...|La Bohème and Tosca|Norma and Lucia|Orfeo and Dido",
      "The fast, brilliant ending of an aria is often called a...|cabaletta|toccata|recitativo"
    ], "Match the composer to the title, or the term to the kind of singing.", "Think of the early 1800s Italian singers: the focus was on a beautiful, flexible voice."),

    L("Total serialism and chance music", [
      ["Control", "🎛️", "After 1945 some composers extended the twelve-tone idea to <b>total serialism</b>: a series controls pitch and also rhythm, dynamics and more. Examples: Messiaen's <i>Mode de valeurs et d'intensités</i> (1949) and Boulez's <i>Structures</i> (1951-52). <b>Milton Babbitt</b> in the USA did similar work."],
      ["Chance", "🎲", "<b>Aleatory</b> (chance) music is nearly the opposite. <b>John Cage</b> composed <i>Music of Changes</i> (1951) using the Chinese <i>I Ching</i>. <b>Graphic scores</b> use pictures instead of standard notation."],
      ["Darmstadt", "🏫", "The Darmstadt summer courses in Germany became a center where such new ideas were shared."]
    ], [
      "Total serialism applies a series to pitch and also to...|rhythm, dynamics and more|just the melody|instrument names",
      "A famous early total-serial piece is Messiaen's...|Mode de valeurs et d'intensités|Clair de Lune|Rhapsody in Blue",
      "Pierre Boulez wrote the total-serial work...|Structures|The Four Seasons|Bolero",
      "Compared with total serialism, chance music gives the composer...|less control|more control|the same control",
      "John Cage composed Music of Changes using the...|I Ching|Bible|dictionary",
      "Graphic scores use...|pictures and shapes instead of standard notation|only rests|chord symbols",
      "The Darmstadt summer courses became a center for...|new avant-garde music|folk dances|brass bands",
      "Milton Babbitt was an American composer linked to...|extending serial ideas|bluegrass|film musicals"
    ], "Decide whether the composer controls everything or leaves things to chance.", "One approach plans every detail with a series; the other uses dice, books of changes or pictures."),

    L("Spectral music and clusters", [
      ["Inside sound", "🔬", "<b>Spectral</b> composers in France in the 1970s (<b>Gérard Grisey</b>, <b>Tristan Murail</b>) base music on the <b>overtone spectrum</b> of sounds, analyzed with computers. Grisey's <i>Partiels</i> (1975) grows from the spectrum of a low trombone E."],
      ["Clusters", "🎹", "A <b>tone cluster</b> is a group of adjacent notes played together. <b>Henry Cowell</b> played them on the piano with fists and forearms."],
      ["Ligeti", "☁️", "<b>György Ligeti</b> used <b>micropolyphony</b>: many tightly packed lines blur into a cloud of sound. His <i>Atmosphères</i> was heard in the film <i>2001: A Space Odyssey</i>."]
    ], [
      "Spectral composers base music on the...|overtone spectrum of sounds|Roman numerals|folk songs",
      "Spectral music began in France in the...|1970s|1470s|1870s",
      "Grisey's Partiels (1975) is based on the spectrum of a low...|trombone note|flute note|snare drum",
      "Micropolyphony makes many tightly packed lines blur into...|a cloud-like texture|a simple chorale|a solo melody",
      "A tone cluster is...|a group of adjacent notes played together|a broken chord|a rest",
      "Ligeti's Atmosphères was famously heard in the film...|2001: A Space Odyssey|The Lion King|Frozen",
      "Spectral composers often use computers to...|analyze sounds and copy their overtone structure|print scores only|tune pianos",
      "Henry Cowell played tone clusters on the piano with his...|fists and forearms|feet|a mallet only"
    ], "Think about what the composers study: the inside of a sound, or a block of notes.", "One idea comes from overtones, one from neighbor notes together, and one from dense woven lines."),

    L("Concert life in the 1800s", [
      ["Public concerts", "🎟️", "In the 1800s paying audiences filled public concert halls. Conservatories trained professionals: Paris (1795) and Leipzig (founded by Mendelssohn in 1843)."],
      ["Virtuosos", "⭐", "A <b>virtuoso</b> has exceptional skill. <b>Paganini</b> was a violin star. <b>Liszt</b> toured as a pianist and caused 'Lisztomania'. Makers like Steinway (founded in New York in 1853) built bigger pianos for big halls."],
      ["The canon", "🏆", "<b>Mendelssohn</b> conducted Bach's <i>St Matthew Passion</i> in 1829, starting a Bach revival. Concert programs began to focus on a <b>canon</b> of great works from the past."]
    ], [
      "Public concerts with paying audiences grew a lot in the...|1800s|1200s|1950s",
      "The Paris Conservatoire was founded in...|1795|1495|1895",
      "Mendelssohn conducted Bach's St Matthew Passion in 1829, starting a...|Bach revival|jazz craze|folk festival",
      "Niccolò Paganini was famous as a...|violin virtuoso|opera conductor|organ builder",
      "The excitement around Franz Liszt's concerts was nicknamed...|Lisztomania|Beatlemania|Bachmania",
      "A virtuoso is a performer with...|exceptional technical skill|no practice|a quiet voice",
      "Mendelssohn founded the Leipzig Conservatory in...|1843|1643|1943",
      "In the 1800s, concert programs began to focus on...|a canon of great works from the past|only brand new works|silence",
      "Steinway & Sons was founded in 1853 in...|New York|Vienna|Tokyo"
    ], "Think about who played, who listened, and where music was taught in the 1800s.", "Link each name to what they did: a violin star, a piano star, and a conductor who revived Bach."),

    L("Orchestration case studies", [
      ["Definitions", "🎻", "<b>Orchestration</b> means choosing which instruments play which parts. Good orchestrators keep the accompaniment softer or in a different range so the melody stands out. <b>Doubling</b> a line at the octave makes it brighter and fuller."],
      ["Books", "📘", "<b>Berlioz</b> wrote an influential treatise on orchestration (1843-44). <b>Rimsky-Korsakov</b>, from Russia, wrote <i>Principles of Orchestration</i>."],
      ["Examples", "🎨", "<b>Ravel</b> orchestrated Mussorgsky's piano suite <i>Pictures at an Exhibition</i>. <b>Britten</b>'s <i>Young Person's Guide to the Orchestra</i> (1945) uses a theme by Purcell and ends with a fugue that brings back the theme."]
    ], [
      "Ravel orchestrated Mussorgsky's piano suite...|Pictures at an Exhibition|The Planets|The Four Seasons",
      "Britten's Young Person's Guide to the Orchestra uses a theme by...|Purcell|Bach|Haydn",
      "The Young Person's Guide ends with a...|fugue that brings back the theme|solo drum|silent bar",
      "Berlioz wrote an influential orchestration treatise in about...|1844|1644|1944",
      "Rimsky-Korsakov was from...|Russia|Spain|Norway",
      "To make a melody stand out, an orchestrator usually...|keeps the accompaniment softer or in another range|doubles every part at full volume|removes the melody",
      "Doubling a melody at the octave makes it sound...|brighter or fuller|silent|slower",
      "Orchestration means...|choosing which instruments play which parts|changing the key|tuning the orchestra",
      "In a score, 'tutti' means...|everyone plays together|one soloist plays|everyone rests"
    ], "Ask who did what: who wrote about orchestration, and who rewrote a piece for a new set of instruments.", "Remember: Mussorgsky wrote for piano, and one famous work uses Purcell's tune."),

    L("DAWs and sequencing", [
      ["The workstation", "💻", "A <b>DAW</b> (digital audio workstation) records, edits and mixes music on a computer. A <b>MIDI</b> file stores notes and instructions, not recorded sound."],
      ["MIDI words", "🎹", "<b>Velocity</b> tells how hard a note is played (0-127). MIDI has <b>16 channels</b>. <b>Quantize</b> snaps notes to a rhythmic grid. A <b>tempo map</b> changes the tempo at chosen points."],
      ["Mixing words", "🎛️", "<b>Automation</b> records changes to a control over time. A <b>bus</b> sends several tracks together for group processing. <b>Latency</b> is the delay between playing and hearing, and bigger buffers increase it."]
    ], [
      "DAW stands for...|digital audio workstation|dynamic audio wave|direct amplifier wire",
      "Quantize in a DAW snaps notes to...|the nearest grid division of the beat|a new key|silence",
      "MIDI velocity measures...|how hard a note is played|how long it lasts|its pitch only",
      "MIDI uses how many channels?|16|8|128",
      "Automation in a DAW means...|recording changes to a control, like volume, over time|automatic tuning of songs|deleting a track",
      "A bus in mixing is...|a path that sends several tracks together for group processing|a speaker|a drum",
      "Latency is the...|delay between playing and hearing the sound|volume of a note|key of a song",
      "A larger audio buffer size usually causes...|more latency|less latency|a higher pitch",
      "A MIDI file stores...|notes and instructions, not recorded sound|actual audio waves|video",
      "A tempo map lets a project...|change tempo at chosen points|stay at one speed|change key signature"
    ], "Think about whether each word is about notes, timing, or the mixing of sound.", "Pick the answer that names what the tool or word actually controls."),

    L("Respecting musical traditions", [
      ["Context matters", "🌍", "Music grows from communities with histories, beliefs and uses. Before performing or borrowing from a tradition, learn its <b>context</b>: where it came from, what it means and who it belongs to."],
      ["Credit and permission", "🤝", "Give <b>credit</b> to sources, work with musicians from the tradition when you can, and treat sacred music with respect. Be careful of <b>stereotypes</b>: no culture's music sounds one way."],
      ["How it travels", "📻", "Some music is passed down by listening and playing, called <b>oral tradition</b>. A <b>field recording</b> is made in the community where the music lives."]
    ], [
      "Before performing a song from another culture, a good first step is to...|learn its background, meaning and context|change the words|ignore where it came from",
      "Sacred music of a tradition should be...|treated with respect for its purpose|used only as a joke|rewritten for fun",
      "Giving credit to the sources of a style is...|an important part of respect|never needed|only for famous people",
      "Oral tradition means music is...|passed down by listening and performing, not writing|only written in books|lost forever",
      "A field recording is a recording made...|in the community where the music lives|in a perfect studio only|by a computer program",
      "Working with musicians from a tradition is a good way to...|learn and collaborate respectfully|avoid learning|copy without credit",
      "A stereotype is...|an oversimplified idea that hides variety|a type of drum|a stereo microphone",
      "Is it accurate to say all Asian music sounds the same?|No, there are many different traditions|Yes, it is all one style|Only the drums differ"
    ], "Choose the answer that shows care, learning and credit.", "Respect means learning the context, crediting the source, and not oversimplifying."),

    L("Shape-note singing", [
      ["Shapes for notes", "🔺", "In <b>shape-note</b> music the note heads have different shapes for different scale degrees. The four-shape system uses <b>fa, sol, la, mi</b>. Singing schools used it to teach ordinary people to read music quickly."],
      ["Sacred Harp", "📖", "<i>The Sacred Harp</i> (first published in 1844) is the best-known book. Singers sit in a <b>hollow square</b> facing each other, sing the shape names first, then the words, a cappella. The melody is in the <b>tenor</b> part."],
      ["Still alive", "🏡", "This tradition is strongest in the southern United States and gatherings called 'all-day singings' continue today."]
    ], [
      "Shape notes are note heads that...|have different shapes for different scale degrees|are all circles|are colored",
      "Four-shape singing uses the syllables...|fa, sol, la, mi|do, re, mi, fa|ut, re, mi, sol",
      "The Sacred Harp was first published in...|1844|1644|1944",
      "Sacred Harp singers sit in a...|hollow square facing the center|straight line facing out|circle facing outward",
      "In traditional Sacred Harp singing the melody is in the...|tenor|treble|bass",
      "Singers usually first sing the music using...|the shape syllables, then the words|only the words|instruments",
      "Sacred Harp singing is typically...|a cappella|with organ|with an orchestra",
      "Shape-note singing began in singing schools to teach...|music reading quickly to ordinary people|only opera|conducting",
      "The Sacred Harp tradition is strongest in the...|southern United States|Arctic|Mediterranean"
    ], "Think about what makes shape notes different from ordinary note heads, and how singers sit.", "Remember the pattern: shapes first, then words, with singers facing the middle."),

    L("Loudness and dynamic range", [
      ["Dynamic range", "📊", "<b>Dynamic range</b> is the difference between the quietest and loudest parts. A <b>compressor</b> reduces that difference. A <b>limiter</b> stops a signal going above a set level. <b>Clipping</b> happens when the signal is pushed past the maximum and distorts."],
      ["The loudness war", "📢", "From the 1990s many recordings were made as loud as possible by heavy compression, called the <b>loudness war</b>. Very compressed music can sound flat and tiring."],
      ["Normalization", "⚖️", "<b>LUFS</b> measures perceived loudness. Streaming services use <b>loudness normalization</b> to turn loud tracks down to a similar level, so extreme loudness gains little."]
    ], [
      "Dynamic range is the difference between...|the quietest and loudest parts|the highest and lowest pitch|the first and last notes",
      "A compressor...|reduces the difference between loud and quiet|raises pitch|adds echo",
      "The 'loudness war' was a trend of...|making recordings louder using heavy compression|banning loud music|making all songs slower",
      "A limiter...|stops the signal from going above a set level|boosts bass|adds reverb",
      "LUFS is a unit used to measure...|perceived loudness|pitch|tempo",
      "Loudness normalization on streaming services...|turns loud tracks down to a similar level|plays all tracks at full volume|removes the bass",
      "Clipping happens when a signal is pushed above the maximum level, causing...|distortion|silence|a higher pitch",
      "Very heavy compression can make music sound...|flat and tiring|more dynamic|much quieter overall"
    ], "Think about the words: loud versus quiet, and what a device does to the gap between them.", "A compressor narrows the gap, a limiter sets a ceiling, and LUFS is a measure."),

    L("Paris between the wars: Satie and Les Six", [
      ["Satie", "🎹", "<b>Erik Satie</b> wrote calm piano pieces like the <i>Gymnopédies</i> (1888). His 'furniture music' was meant to be background music not listened to closely."],
      ["Les Six", "6️⃣", "<b>Les Six</b> were six young composers in Paris around 1920: <b>Poulenc</b>, <b>Milhaud</b>, <b>Honegger</b>, <b>Auric</b>, <b>Durey</b> and <b>Germaine Tailleferre</b>, the only woman. Milhaud's <i>La création du monde</i> (1923) used jazz."],
      ["A great teacher", "👩‍🏫", "<b>Nadia Boulanger</b> taught composition to many, including <b>Aaron Copland</b>, Philip Glass and Quincy Jones."]
    ], [
      "Satie wrote the calm piano pieces called the...|Gymnopédies|Hungarian Rhapsodies|Four Seasons",
      "Les Six were a group of young composers in...|Paris|Vienna|Moscow",
      "How many composers were in Les Six?|six|four|nine",
      "Which composer was in Les Six?|Francis Poulenc|Claude Debussy|Maurice Ravel",
      "The only woman in Les Six was...|Germaine Tailleferre|Clara Schumann|Nadia Boulanger",
      "Nadia Boulanger was a famous...|teacher of composition|opera singer|piano maker",
      "Which American composer studied with Nadia Boulanger?|Aaron Copland|Charles Ives|John Philip Sousa",
      "Milhaud's La création du monde (1923) was influenced by...|jazz|medieval chant|bagpipes",
      "Satie's 'furniture music' was meant to be...|background music not listened to closely|very loud|only for dancing"
    ], "Link each name to Paris and to what they are best known for.", "Think about the quiet pieces, the group with a number in its name, and the great teacher."),

    L("Prokofiev, Shostakovich and Britten", [
      ["Soviet composers", "🇷🇺", "<b>Sergei Prokofiev</b> wrote <i>Peter and the Wolf</i> (1936), the ballet <i>Romeo and Juliet</i> and the <i>Classical Symphony</i> (1917) in the style of Haydn. <b>Dmitri Shostakovich</b> wrote 15 symphonies; his Seventh is nicknamed <i>Leningrad</i>."],
      ["Britten", "🇬🇧", "<b>Benjamin Britten</b> was an English composer. His opera <i>Peter Grimes</i> (1945) is set in a fishing village. His <i>War Requiem</i> (1962) mixes the Latin Mass with poems by Wilfred Owen."],
      ["Why they matter", "🌟", "These composers kept tonal music and clear melodies alive in the 1900s while using fresh rhythms and sharp humor."]
    ], [
      "Prokofiev wrote the children's tale Peter and the Wolf in...|1936|1836|1736",
      "Shostakovich wrote how many symphonies?|15|9|4",
      "Shostakovich was a composer from...|the Soviet Union (Russia)|Italy|Spain",
      "Shostakovich's Symphony No. 7 is nicknamed...|Leningrad|Eroica|Surprise",
      "Prokofiev wrote the ballet...|Romeo and Juliet|The Rite of Spring|Giselle",
      "Benjamin Britten was a composer from...|England|Hungary|Poland",
      "Britten's opera Peter Grimes is set in...|a fishing village|a spaceship|a desert",
      "Britten's War Requiem combines the Latin Mass with poems by...|Wilfred Owen|Shakespeare|Homer",
      "Prokofiev's Classical Symphony (1917) imitates the style of...|Haydn|Wagner|Mahler"
    ], "Connect each composer with his country and one famous title.", "Remember: one wrote for children and ballet, one wrote 15 symphonies, one was English."),

    L("The percussion revolution", [
      ["New sounds", "🥁", "In the 1900s percussion moved to the front. <b>Edgard Varèse</b> wrote <i>Ionisation</i> (1931) almost entirely for percussion, with sirens. <b>Bartók</b> wrote a sonata for two pianos and percussion (1937)."],
      ["Orff and Cage", "🔔", "<b>Carl Orff</b>'s <i>Carmina Burana</i> (1936) sets medieval poems and opens with <i>O Fortuna</i>. <b>John Cage</b> and others wrote for percussion ensembles with everyday objects like tin cans and brake drums."],
      ["Minimalism", "🔁", "<b>Steve Reich</b>'s <i>Drumming</i> (1971) uses bongos, marimbas and glockenspiels playing patterns that slowly shift."]
    ], [
      "Varèse's Ionisation (1931) is written almost entirely for...|percussion instruments|violins|voices",
      "Edgard Varèse was born in France and later lived in...|the United States|Japan|Brazil",
      "Orff's Carmina Burana is based on medieval...|poems|dances|hymns",
      "The famous opening of Carmina Burana is...|O Fortuna|Ode to Joy|Hallelujah",
      "Bartók wrote a sonata for two pianos and...|percussion|harp|organ",
      "John Cage wrote percussion music using objects like...|tin cans and brake drums|violins and flutes|organ pipes",
      "Steve Reich's Drumming (1971) uses...|bongos, marimbas and glockenspiels|string quartet|organ and choir",
      "Percussion moved to the front in the 1900s as composers explored...|new sounds and rhythms|older Baroque sounds only|silent pieces only"
    ], "Link each composer to the instruments or objects he used.", "Think of siren and drums, medieval poems, and everyday objects as instruments."),

    L("Beethoven's three periods", [
      ["Early", "🌱", "Beethoven (born in Bonn, lived mostly in Vienna) is often described in three periods. In the <b>early</b> period (to about 1802) he built on Haydn and Mozart."],
      ["Middle", "🔥", "The <b>middle</b> or 'heroic' period (about 1803-1814) brought the <i>Eroica</i> Symphony (No. 3), the famous Fifth, which begins with a four-note motif, and his only opera, <i>Fidelio</i>. His hearing loss began in his late twenties, but he kept composing."],
      ["Late", "🌌", "The <b>late</b> period brought the Ninth Symphony (1824) with a choral finale on Schiller's <i>Ode to Joy</i> and deeply personal, experimental string quartets."]
    ], [
      "Beethoven's music is often divided into how many periods?|three|two|five",
      "The Eroica (Symphony No. 3) belongs to the...|middle (heroic) period|early period|late period",
      "The Ninth Symphony (1824) belongs to his...|late period|early period|childhood",
      "Beethoven's Ninth ends with a choral finale on a poem about joy by...|Schiller|Goethe|Heine",
      "Beethoven's only opera is...|Fidelio|Don Giovanni|Norma",
      "Beethoven's early works show the influence of...|Haydn and Mozart|Wagner|Stravinsky",
      "Beethoven was born in Bonn and spent most of his adult life in...|Vienna|Paris|Rome",
      "The famous motif that begins Beethoven's Fifth Symphony has how many notes?|four|eight|two",
      "Beethoven's late string quartets are known for being...|deeply personal and experimental|simple and short|written for children"
    ], "Think about what came early, in the middle and at the end of his life.", "Fit each famous work into early, middle or late using its date."),

    L("Nationalism: Czech and Nordic music", [
      ["Czech", "🇨🇿", "<b>Smetana</b>'s <i>Má vlast</i> (My Homeland, 1870s) includes the river piece <i>Vltava</i>. <b>Dvořák</b> wrote the <i>Slavonic Dances</i> and his Ninth Symphony <i>From the New World</i> (first performed in New York in 1893)."],
      ["Nordic", "🇳🇴", "<b>Grieg</b> of Norway wrote music for Ibsen's play <i>Peer Gynt</i> (1875). <b>Sibelius</b> of Finland wrote <i>Finlandia</i> (1899-1900). <b>Nielsen</b> was Danish."],
      ["Folk color", "🪕", "Nationalist composers used folk tunes, dances and rhythms of their homelands to give their music a local flavor."]
    ], [
      "Smetana's Vltava is a piece about a...|river|mountain|train",
      "Dvořák's Ninth Symphony is called...|From the New World|Eroica|Surprise",
      "Dvořák's Ninth Symphony was first performed in...|New York|Prague|Vienna",
      "Grieg was a composer from...|Norway|Finland|Italy",
      "Grieg wrote music for Ibsen's play...|Peer Gynt|Hamlet|Faust",
      "Sibelius was a composer from...|Finland|Denmark|Hungary",
      "Sibelius's Finlandia was written around...|1900|1700|1950",
      "Carl Nielsen was a composer from...|Denmark|Sweden|Germany",
      "Nationalist composers often used...|folk tunes and dances of their homeland|only twelve-tone rows|no rhythm"
    ], "Match each composer with his country and one famous title.", "Czech names go with a river and a New World; Nordic names go with Norway, Finland and Denmark."),

    L("Nationalism: Spain and Latin America", [
      ["Spain", "🇪🇸", "<b>Albéniz</b> wrote <i>Iberia</i> for piano. <b>Granados</b> wrote <i>Goyescas</i>. <b>Falla</b> wrote the ballet <i>The Three-Cornered Hat</i>. <b>Rodrigo</b> wrote the <i>Concierto de Aranjuez</i> (1939) for guitar and orchestra."],
      ["Latin America", "🌎", "<b>Villa-Lobos</b> of Brazil blended Brazilian music with Bach's style in his <i>Bachianas Brasileiras</i>. <b>Ginastera</b> was from Argentina. <b>Revueltas</b> was from Mexico."],
      ["The idea", "🎼", "These composers used dance rhythms, guitar sounds and folk tunes of their regions to make their music sound like home."]
    ], [
      "Joaquín Rodrigo wrote the Concierto de Aranjuez for...|guitar and orchestra|harp|accordion",
      "Villa-Lobos was from...|Brazil|Spain|Chile",
      "Villa-Lobos's Bachianas Brasileiras blends Brazilian music with the style of...|Bach|Wagner|Satie",
      "Manuel de Falla wrote the ballet...|The Three-Cornered Hat|Swan Lake|Giselle",
      "Albéniz's Iberia is a collection of pieces for...|piano|string quartet|organ",
      "Ginastera was a composer from...|Argentina|Mexico|Portugal",
      "Silvestre Revueltas was a composer from...|Mexico|Peru|Cuba",
      "Granados wrote the piano suite...|Goyescas|Carmen|Peer Gynt",
      "Nationalist composers often use...|dance rhythms and folk tunes of their homeland|only twelve-tone rows|only Baroque forms"
    ], "Match the composer with his country or home region and a famous title.", "Spain, Brazil, Argentina and Mexico each have names you can link to a famous work."),

    L("Playing in tune: intonation", [
      ["What is intonation?", "🎯", "<b>Intonation</b> is how accurately pitches are in tune. A piano's pitches are fixed, but singers and string players can adjust. Orchestras tune to <b>A</b>, usually given by the oboe, often at A = 440 (concert A)."],
      ["Beats", "🌊", "<b>Beats</b> are the slow wobbles you hear when two pitches are almost the same. As the pitches get closer, the beats slow down and disappear."],
      ["Just thirds", "📏", "A pure (just) major third is about <b>14 cents</b> lower than an equal-tempered one. Players often lower thirds and raise leading tones slightly. A chromatic tuner shows pitch in <b>cents</b> sharp or flat."]
    ], [
      "Intonation means...|how accurately pitches are in tune|how loud the music is|how fast it goes",
      "Singers and string players can adjust their pitch, unlike a...|piano with fixed pitches|solo voice|violin",
      "A just major third is lower than an equal-tempered one by about...|14 cents|114 cents|2 cents",
      "Leading tones are often played slightly...|high, closer to the tonic|low|exactly equal tempered",
      "Beats are the slow wobbles heard when two pitches are...|almost, but not quite, in tune|identical|an exact octave apart",
      "As two pitches get closer together, the beats get...|slower|faster|louder",
      "A chromatic tuner shows pitch in...|cents sharp or flat|loudness|tempo",
      "Orchestras usually tune to the note...|A given by the oboe|C given by trumpets|G given by timpani",
      "A common reference pitch for concert A is...|440 hertz|44 hertz|4400 hertz"
    ], "Think about what we hear when two notes are almost matching.", "Slow wobbles mean nearly the same pitch; cents measure tiny steps; the oboe gives the orchestra's note."),
  ];
  l26.push(
    MIX("Mixed practice", l26.slice(0, 9)),
    MIX("Level 26 Challenge", l26.slice(9))
  );

  // ======================= LEVEL 27 =======================
  const l27 = [
    L("Notre Dame and early polyphony", [
      ["Organum", "⛪", "<b>Organum</b> is early polyphony: a chant melody with one or more voices added. Around 1200 the cathedral of <b>Notre-Dame in Paris</b> was a center of this art. <b>Léonin</b> is linked with the <i>Magnus liber organi</i> (Great Book of Organum)."],
      ["Pérotin", "🔔", "<b>Pérotin</b> wrote organum for three and four voices, such as <i>Viderunt omnes</i> and <i>Sederunt principes</i>. The chant voice moves in long notes while upper voices move faster."],
      ["Rhythmic modes", "🥁", "Notre Dame composers used <b>rhythmic modes</b>: six patterns of long and short notes. The first repeats long-short, like a trochee. The style is later called <b>Ars antiqua</b>."]
    ], [
      "Léonin and Pérotin were connected with the cathedral of...|Notre-Dame in Paris|Westminster in London|St. Peter's in Rome",
      "Organum is early polyphony in which...|a chant is combined with added voices|a solo voice sings alone|only drums play",
      "The Magnus liber organi (Great Book of Organum) is linked with...|Léonin|Machaut|Josquin",
      "Pérotin is known for organum for three and four voices, such as...|Viderunt omnes|Messiah|Hallelujah",
      "In Notre Dame organum, the chant voice often moves in...|long notes|very fast runs|drum patterns",
      "The rhythmic modes were...|six patterns of long and short notes|six scales|six instruments",
      "The first rhythmic mode repeats a pattern of...|long-short|short-short-long|rests",
      "The Notre Dame style is later called...|Ars antiqua|Ars nova|Baroque",
      "Polyphony means music with...|two or more independent lines|one line only|no rhythm"
    ], "Think about the cathedral, the word organum, and what a rhythmic pattern repeats.", "Match each name to the cathedral, the book, or the six patterns."),

    L("Mensural notation", [
      ["Showing length", "📏", "<b>Mensural notation</b> (from the late 1200s) uses note shapes to show exact length. <b>Franco of Cologne</b> (about 1280) helped to fix it. A <b>longa</b> divides into <b>breves</b>, a breve into <b>semibreves</b>, a semibreve into <b>minims</b>."],
      ["Perfect and imperfect", "3️⃣", "A <b>perfect</b> division is into three parts; an <b>imperfect</b> division is into two. The <b>Ars nova</b> (Philippe de Vitry, about 1320) welcomed duple divisions as well as triple ones."],
      ["Modern notes", "🔄", "Modern names come from these: the whole note is the semibreve, the half note is the minim. 'Breve' comes from Latin for 'short', though it later became long."]
    ], [
      "Mensural notation shows...|exact note durations by note shape|only pitch letters|only volume",
      "In mensural notation, a perfect division is into...|three parts|two parts|four parts",
      "In mensural notation, an imperfect division is into...|two parts|three parts|five parts",
      "The modern whole note comes from the medieval...|semibreve|breve|minim",
      "The modern half note comes from the...|minim|semibreve|longa",
      "Franco of Cologne's treatise (about 1280) helped fix...|note shapes showing length|key signatures|conducting patterns",
      "Philippe de Vitry's treatise is linked to the...|Ars nova|Ars antiqua|Baroque",
      "The Ars nova accepted...|duple divisions as well as triple|only triple divisions|no rhythm",
      "The word 'breve' comes from a Latin word meaning...|short|big|round"
    ], "Think about how a long note is split into smaller ones, and how many parts.", "Perfect means three, imperfect means two, and modern note names come from medieval ones."),

    L("Medieval songs and Machaut", [
      ["Poet-musicians", "🪕", "<b>Troubadours</b> (southern France), <b>trouvères</b> (northern France) and <b>Minnesingers</b> (German lands) were poet-composers who wrote songs in their own languages instead of Latin. Their songs were mostly <b>monophonic</b>, a single melody."],
      ["Machaut", "📜", "<b>Guillaume de Machaut</b> (1300s) wrote the <i>Messe de Nostre Dame</i>, the earliest complete Mass by one named composer, and many songs."],
      ["Fixed forms", "🧩", "French song of the 1300s used three <b>fixed forms</b>: <b>ballade</b>, <b>rondeau</b> and <b>virelai</b>."]
    ], [
      "Troubadours were poet-composers from...|southern France|Italy|England",
      "Trouvères were poet-composers from...|northern France|southern Spain|Poland",
      "Minnesingers were poet-musicians from...|German lands|Egypt|Portugal",
      "Troubadour songs were sung in...|their local language, not Latin|Latin only|no words",
      "Troubadour songs were mostly...|a single melody line|three-part harmony|orchestral",
      "Machaut's Messe de Nostre Dame is the earliest complete Mass by...|one named composer|a whole town|a machine",
      "The French fixed forms are ballade, rondeau and...|virelai|sonata|fugue",
      "Guillaume de Machaut lived in the...|1300s|1100s|1800s"
    ], "Match each group with its region or each form with its name.", "Southern, northern and German poet-musicians all sang in everyday languages."),

    L("Franco-Flemish masters", [
      ["The Low Countries", "🇧🇪", "<b>Dufay</b>, <b>Ockeghem</b> and <b>Josquin des Prez</b> came from Franco-Flemish lands (now France and Belgium) and worked across Europe. <b>Lassus</b>, who worked in Munich, wrote about 2,000 works."],
      ["Techniques", "🔗", "<b>Imitation</b>: voices enter one after another with the same melody. A <b>cantus firmus</b> is an existing melody used as the base of a new work. A <b>parody mass</b> is based on an existing polyphonic piece."],
      ["England", "🇬🇧", "<b>Tallis</b> wrote <i>Spem in alium</i> for 40 voices. <b>Byrd</b> was a leading English composer. <b>Dowland</b> wrote lute songs."]
    ], [
      "Dufay, Ockeghem and Josquin were from...|Franco-Flemish lands|Spain|Poland",
      "Imitation in Renaissance polyphony means...|voices enter one after another with the same melody|everyone sings in unison|nobody sings",
      "A cantus firmus is...|an existing melody used as the base of a new composition|a drum solo|a fast finale",
      "Tallis's Spem in alium is written for how many voices?|40|4|12",
      "A parody mass is based on...|an existing polyphonic piece|a drum rhythm|a new text only",
      "Orlande de Lassus worked in Munich and wrote about...|2,000 works|20 works|200 works",
      "William Byrd was a leading composer in...|England|Spain|Poland",
      "John Dowland is known for songs with lute accompaniment, called...|lute songs (ayres)|motets only|operas",
      "Josquin des Prez worked mainly in the...|Renaissance|Baroque|Romantic era"
    ], "Think about where these composers came from, and what each technique does to melodies.", "Imitation means copying a melody in turn; cantus firmus means a borrowed melody."),

    L("Printing, Reformation and Palestrina", [
      ["Printing", "🖨️", "<b>Ottaviano Petrucci</b> printed polyphonic music from movable type in Venice in <b>1501</b>. Printed <b>part-books</b> gave each singer a book with only their own part, and amateur music-making grew."],
      ["Reformation", "✝️", "The Reformation began in the early 1500s. <b>Martin Luther</b> wanted congregations to sing hymns in German called <b>chorales</b>, such as <i>A Mighty Fortress Is Our God</i>."],
      ["Trent", "🕊️", "The <b>Council of Trent</b> (1545-1563) asked for church music with clearly understood words. <b>Palestrina</b>'s smooth style and the <i>Pope Marcellus Mass</i> became models."]
    ], [
      "Ottaviano Petrucci printed polyphonic music in Venice in...|1501|1401|1601",
      "Printed music helped...|spread music widely and increase amateur music-making|reduce all singing|end polyphony",
      "Martin Luther wanted congregations to sing hymns called...|chorales in German|motets in Latin only|silent prayers",
      "The Council of Trent encouraged church music where the words were...|clear and understandable|hidden|unimportant",
      "Palestrina's famous Mass linked to the Council of Trent is the...|Pope Marcellus Mass|Mass in B minor|Messiah",
      "Palestrina's style is known for smooth voice leading and carefully controlled...|dissonance|tempo changes|electric sounds",
      "The Reformation began in the...|1500s|1200s|1800s",
      "A Mighty Fortress Is Our God is a chorale associated with...|Luther|Palestrina|Dufay",
      "In Renaissance printing, a book with just one singer's part is a...|part-book|full score|libretto"
    ], "Think about what printing made possible and what the churches asked of composers.", "Match each name to its job: the printer, the hymn reformer, and the smooth-style composer."),

    L("Venice and Monteverdi", [
      ["Venice", "🌊", "<b>Giovanni Gabrieli</b> worked at <b>St Mark's Basilica</b> in Venice. <b>Cori spezzati</b> ('split choirs') sing back and forth from different galleries. His <i>Sonata pian' e forte</i> is an early piece with dynamics and named instruments."],
      ["Monteverdi", "🎭", "<b>Claudio Monteverdi</b>'s <i>L'Orfeo</i> (1607), based on the Greek myth of Orpheus, is one of the first great operas. From 1613 he worked at St Mark's."],
      ["New ideas", "✨", "His <b>seconda prattica</b> allowed breaking old counterpoint rules to express the text. <b>Basso continuo</b> is a bass line with chords played by instruments such as harpsichord and cello. The new <b>concertato</b> style stressed contrast."]
    ], [
      "Gabrieli worked at St Mark's Basilica in...|Venice|Rome|Paris",
      "Cori spezzati means...|split choirs singing back and forth|silent choirs|solo singers",
      "Gabrieli's Sonata pian' e forte is famous for early use of...|dynamic markings and named instruments|electric guitar|atonality",
      "Monteverdi's L'Orfeo (1607) is among the first great...|operas|symphonies|string quartets",
      "The seconda prattica let composers break old counterpoint rules to...|express the text's emotions|get louder|avoid singers",
      "Basso continuo is...|a bass line with chords played by instruments like harpsichord and cello|a drum pattern|a type of choir",
      "From 1613 Monteverdi worked at...|St Mark's in Venice|Notre-Dame|Westminster Abbey",
      "L'Orfeo is based on the Greek myth of Orpheus, a legendary...|musician|sailor|baker",
      "The concertato style stressed...|contrast between groups, loud and soft|a single melody|silence"
    ], "Link each name to Venice or to the new Baroque ideas.", "Split choirs, early dynamics, early opera and a continuo bass belong together here."),

    L("French and English Baroque", [
      ["French court", "👑", "<b>Jean-Baptiste Lully</b> (born in Italy) led music at the court of <b>Louis XIV</b>. The <b>French overture</b> has a slow dotted opening, then a faster fugal part. <b>Rameau</b> wrote the <i>Treatise on Harmony</i> (1722) and operas."],
      ["Keyboard", "🎹", "<b>François Couperin</b> wrote harpsichord pieces gathered in <i>ordres</i> and the book <i>The Art of Playing the Harpsichord</i> (1716). French style uses <b>notes inégales</b>, pairs of notes played unevenly."],
      ["England", "🏴", "<b>Henry Purcell</b> was organist at Westminster Abbey. He wrote the opera <i>Dido and Aeneas</i> (about 1689) and much church music."]
    ], [
      "Lully led music at the court of...|Louis XIV|Queen Victoria|Napoleon",
      "The French overture begins with...|a slow dotted section then a faster one|a fast fugue only|a waltz",
      "Rameau's Treatise on Harmony (1722) introduced the idea of...|the fundamental bass (chord roots)|twelve-tone rows|the blues scale",
      "François Couperin is famous for pieces for the...|harpsichord|organ only|trombone",
      "Notes inégales are...|pairs of notes played unevenly in French style|extra loud notes|silent notes",
      "Henry Purcell worked at...|Westminster Abbey|Notre-Dame|St Mark's",
      "Purcell wrote the opera...|Dido and Aeneas|Orfeo|Norma",
      "Lully was born in...|Italy|England|Spain"
    ], "Match each composer with his country and the place he worked.", "Think: a king's court, a book on harmony, a harpsichord master, and an English abbey."),

    L("Gluck and the kinds of opera", [
      ["Reform", "📜", "<b>Christoph Willibald Gluck</b> wanted drama to come before showy singing. His <i>Orfeo ed Euridice</i> (1762, Vienna) is simple and moving, with a fuller orchestra accompanying the recitatives."],
      ["Italian types", "🇮🇹", "<b>Opera seria</b> is serious Italian opera with heroes and <i>da capo</i> arias. <b>Opera buffa</b> is Italian comic opera about everyday people with ensemble finales, like Mozart's <i>Marriage of Figaro</i> (1786)."],
      ["Others", "🌍", "<b>Singspiel</b> is German opera with spoken dialogue (Mozart's <i>Magic Flute</i>, 1791). <b>Opéra comique</b> is French opera with spoken dialogue. <b>Grand opera</b> in Paris (1830s) used big casts, ballet and spectacle."]
    ], [
      "Gluck wanted opera to put drama before...|showy singing|the orchestra|the words",
      "Gluck's Orfeo ed Euridice was first performed in Vienna in...|1762|1562|1862",
      "Opera seria is...|serious Italian opera with heroes|comic German opera|a ballet",
      "Opera buffa is...|Italian comic opera about everyday people|French spoken opera|a religious drama",
      "Mozart's Marriage of Figaro (1786) is an example of...|opera buffa|opera seria|grand opera",
      "Singspiel is German opera with...|spoken dialogue|no singing|only a chorus",
      "Mozart's The Magic Flute (1791) is a...|Singspiel|ballet|symphony",
      "Opéra comique is French opera with...|spoken dialogue|no music|no singers",
      "Grand opera in Paris in the 1830s used...|big casts, ballet and spectacle|a single singer|no orchestra"
    ], "Link the opera type to its country and its mood: serious, comic, or with spoken words.", "Italian serious, Italian comic, German with speech, and French with speech are all different."),

    L("Schumann and character pieces", [
      ["Schumann the writer", "📰", "<b>Robert Schumann</b> founded a music magazine, the <i>Neue Zeitschrift für Musik</i> (1834). He invented an imaginary society, the <b>Davidsbündler</b> (League of David), to fight narrow-minded 'Philistines' in music. Its members <b>Florestan</b> (passionate) and <b>Eusebius</b> (dreamy) stood for sides of himself."],
      ["Piano cycles", "🎹", "<i>Carnaval</i>, Op. 9 (1835) is a set of short <b>character pieces</b>. <i>Kinderszenen</i> (Scenes from Childhood, 1838) includes <i>Träumerei</i>."],
      ["Clara", "🎼", "Schumann's wife <b>Clara Schumann</b> was a great pianist and composer. 1840 was his 'year of song', when he wrote many songs."]
    ], [
      "Robert Schumann founded a music magazine called...|Neue Zeitschrift für Musik|The Musical Times|Rolling Notes",
      "Schumann's imaginary friends Florestan and Eusebius represent...|his passionate and dreamy sides|two orchestras|rival teachers",
      "Carnaval, Op. 9 is a collection of short piano pieces called...|character pieces|fugues|marches only",
      "Kinderszenen (Scenes from Childhood) contains the famous piece...|Träumerei|Für Elise|Clair de lune",
      "Clara Schumann was a great...|pianist and composer|opera singer only|piano builder",
      "Schumann's 'year of song' was...|1840|1740|1940",
      "The Davidsbündler was an imaginary group fighting against...|narrow-minded Philistines in music|the piano|all orchestras",
      "Schumann was a leading composer of the...|Romantic era|Baroque era|Classical era"
    ], "Connect Schumann's writing with his piano music and his family.", "Two imaginary friends, a set of short pictures at the piano, and a famous wife."),

    L("Prolonging the tonic", [
      ["Prolongation", "⏳", "<b>Prolongation</b> means extending the effect of one chord over time. Passing and neighbor chords decorate the tonic without leaving it."],
      ["Passing chords", "🚶", "A <b>passing chord</b> connects two chords with a stepwise bass. In C major, I - V4/3 - I6 has the bass C, D, E. The chord vii°6 can pass in the same way."],
      ["Neighbor chords", "↩️", "A <b>neighbor chord</b> steps away and returns. I - V6 - I has the bass C, B, C. The tonic stays the main harmony."]
    ], [
      "Prolongation means...|extending the effect of a chord over time|ending the piece|changing key",
      "A passing chord connects two chords by...|stepwise motion in the bass|a key change|a leap of a tritone",
      "In C major, I - V4/3 - I6 has the bass notes...|C, D, E|C, G, C|C, F, G",
      "In C major, I - V6 - I has the bass notes...|C, B, C|C, G, C|C, D, E",
      "I - V6 - I is an example of a...|neighbor chord|modulation|final cadence",
      "A neighbor chord decorates a main chord by going away by step and...|returning to it|never returning|doubling it",
      "In C major, vii°6 between I and I6 is a...|passing chord|neighbor chord|pivot chord",
      "Tonic prolongation keeps the sense of...|the tonic as the main harmony|a new key|silence"
    ], "Look at the bass notes and decide whether they travel through or return.", "A line that goes through to a new note is passing; one that goes away and comes back is a neighbor."),

    L("Outer-voice counterpoint", [
      ["The framework", "🏗️", "In four-part writing the <b>soprano</b> and <b>bass</b> (the outer voices) form a two-voice framework that listeners hear most clearly. Write it first and check it carefully."],
      ["Types of motion", "↔️", "<b>Contrary</b> motion: voices move in opposite directions. <b>Oblique</b>: one voice stays, the other moves. <b>Similar</b>: same direction, different intervals. <b>Parallel</b>: same direction, same interval."],
      ["Rules", "⚠️", "Avoid parallel perfect fifths and octaves. Avoid <b>direct (hidden)</b> fifths and octaves, reached by similar motion, unless the soprano moves by step. Thirds and sixths are the richest intervals."]
    ], [
      "Motion in opposite directions is called...|contrary motion|parallel motion|oblique motion",
      "Motion where one voice stays and the other moves is...|oblique motion|similar motion|contrary motion",
      "Voices moving in the same direction but by different intervals show...|similar motion|contrary motion|oblique motion",
      "Hidden (direct) fifths occur when two voices move in the same direction into...|a perfect fifth|a third|a rest",
      "In outer-voice writing, parallel perfect fifths are...|avoided|encouraged|required",
      "Between outer voices, rich-sounding intervals are generally...|thirds and sixths|only unisons|only seconds",
      "Direct fifths or octaves are least problematic when the soprano moves...|by step|by a large leap|not at all",
      "Parallel thirds and sixths are...|acceptable and common|forbidden|always dissonant"
    ], "Picture two lines on a graph and think about whether they go the same way or opposite ways.", "Name the motion by what each voice does, and remember which parallels are avoided."),

    L("Predominant chords and ii6", [
      ["Predominants", "🧭", "A <b>predominant</b> chord such as <b>ii</b>, <b>ii6</b> or <b>IV</b> leads toward the dominant. Common formula: I - ii6 - V - I."],
      ["Why ii6?", "⬆️", "In <b>ii6</b>, the bass is the third of the chord. In C major, ii6 is D-F-A with <b>F</b> in the bass, which steps up to G, the bass of V."],
      ["Doubling", "2️⃣", "In ii6 we usually <b>double the bass note</b> (the third of the chord), not the root or fifth. The figure <b>6</b> means the third is in the bass; <b>ii65</b> is a seventh chord with the third in the bass."]
    ], [
      "In C major, the chord ii6 has which note in the bass?|F|D|A",
      "In C major, the note usually doubled in ii6 is...|F (the bass)|G|B",
      "A chord that leads toward the dominant is called...|a predominant|a tonic|a postdominant",
      "In I - ii6 - V - I, the bass moves from 4 to...|5 (a step up)|1|7",
      "The figure 6 beside a Roman numeral means the bass note is the chord's...|third|root|fifth",
      "In C major, ii65 contains the notes...|D, F, A, C|C, E, G, B|G, B, D, F",
      "Common predominant chords include...|ii, ii6 and IV|I and vi only|V and vii only",
      "In C major, the chord IV is built on...|F|G|D"
    ], "Think about what the bass does as the chord moves toward V.", "Find the note in the bass first, then recall which chord member it is."),

    L("Analysis symbols for seventh chords", [
      ["Inversion figures", "🔢", "For a V7 chord: root position is <b>V7</b>, first inversion <b>V6/5</b>, second inversion <b>V4/3</b>, third inversion <b>V4/2</b>."],
      ["Quality symbols", "🔣", "A small circle <b>°</b> means diminished, and <b>°7</b> a fully diminished seventh chord. A slashed circle <b>ø</b> means a half-diminished seventh chord. Uppercase numerals are major, lowercase are minor."],
      ["Where the bass is", "🎚️", "In V6/5 the bass is the third (the leading tone). In V4/3 the bass is the fifth. In V4/2 the bass is the seventh."]
    ], [
      "V7 in first inversion is labeled...|V6/5|V4/3|V4/2",
      "V7 in second inversion is labeled...|V4/3|V6/5|V4/2",
      "V7 in third inversion is labeled...|V4/2|V6/5|V7",
      "The symbol ø7 stands for a...|half-diminished seventh chord|fully diminished seventh chord|major seventh chord",
      "The symbol °7 stands for a...|fully diminished seventh chord|half-diminished seventh chord|dominant seventh chord",
      "In a V4/2 chord, the bass note is the chord's...|seventh|root|third",
      "A lowercase Roman numeral like ii means a...|minor triad|major triad|augmented triad",
      "The Roman numeral V/V stands for...|the dominant of the dominant|five over five bars|vocal ensemble",
      "In a V6/5, the bass note is the chord's...|third (the leading tone)|root|fifth"
    ], "Ask which note of the chord is lowest, then match it to the figure.", "Figures count intervals above the bass: bigger numbers mean more inversion."),

    L("Rock harmony and modal loops", [
      ["Borrowed colors", "🎸", "Rock often borrows chords from the minor or modal scales. In C major, <b>bVII</b> is B flat major and <b>bVI</b> is A flat major. I - bVII - IV - I suggests <b>Mixolydian</b>."],
      ["Loops", "🔁", "The four-chord loop <b>I - V - vi - IV</b> in C is C - G - Am - F. An Aeolian loop <b>i - bVI - bVII</b> in A minor is Am - F - G."],
      ["Andalusian cadence", "💃", "The <b>Andalusian cadence</b> is a descending line like Am - G - F - E. It is common in flamenco and in pop. A <b>plagal cadence</b> goes IV to I."]
    ], [
      "The Andalusian cadence is a descending progression like...|Am - G - F - E|C - G - Am - F|G - C - D - G",
      "A progression I - bVII - IV - I suggests the...|Mixolydian mode|Locrian mode|whole-tone scale",
      "In C major, the chord bVII is...|B flat major|B major|B diminished",
      "In C major, the chord bVI is...|A flat major|A minor|A major",
      "The pop four-chord loop I - V - vi - IV in C major is...|C, G, Am, F|C, F, G, Am|C, D, E, F",
      "A plagal cadence goes from...|IV to I|V to I|ii to V",
      "A loop of i - bVI - bVII in A minor uses the chords...|Am, F, G|Am, B flat, C|A, C, D",
      "The Andalusian cadence is common in...|flamenco and pop|only organ music|only medieval chant"
    ], "Write the scale degrees as chord letters in the key before choosing.", "Count the scale in the key, and lower the degree that has a flat sign."),

    L("Polychords and bitonality", [
      ["Two at once", "🧩", "A <b>polychord</b> combines two or more chords played at the same time. <b>Bitonality</b> uses two keys at once; <b>polytonality</b> uses two or more."],
      ["Famous examples", "🎪", "The <b>Petrushka chord</b> in Stravinsky's ballet combines C major and F-sharp major triads. <b>Milhaud</b>, of Les Six, was well known for polytonality. <b>Charles Ives</b> layered marches and hymns in different keys."],
      ["Sound", "🔊", "Polychords sound dissonant because they combine notes from different harmonies. A bitonal passage may have the right hand in one key and the left hand in another."]
    ], [
      "A polychord combines...|two or more chords played at the same time|one note|a scale",
      "Bitonality means using...|two keys at once|no key|one key twice",
      "The Petrushka chord combines C major and...|F-sharp major|G major|A minor",
      "Polytonality means using...|two or more keys at the same time|one key at a time|no keys",
      "Which composer from Les Six was known for polytonality?|Milhaud|Satie|Boulez",
      "Which American composer layered marches and hymns in different keys?|Charles Ives|George Gershwin|Aaron Copland",
      "Polychords sound dissonant because they...|combine notes from different harmonies|are very quiet|are in one key",
      "In bitonal music, the right hand might play in C major while the left plays in...|F-sharp major|nothing|C major"
    ], "Count how many chords or keys sound at once.", "Poly means many; bi means two."),

    L("Keyboard textures", [
      ["Broken chords", "🎹", "A <b>broken chord</b> (arpeggio) plays chord notes one at a time. The <b>Alberti bass</b>, named for Domenico Alberti, plays low-high-middle-high and is typical of the Classical era."],
      ["Murky and stride", "🌫️", "A <b>murky bass</b> is a left hand that alternates octaves quickly. <b>Stride</b> piano alternates a low bass note or octave with a chord in the middle range."],
      ["Other patterns", "🎼", "<b>Boogie-woogie</b> repeats a driving bass pattern in eighth notes. Romantic music often puts wide arpeggios under a singing melody."]
    ], [
      "The Alberti bass plays chord notes in the order...|low, high, middle, high|low, low, low, low|high, high, high, high",
      "The Alberti bass is named for...|Domenico Alberti|Leon Battista Alberti|Isaac Albéniz",
      "A murky bass is a left hand that...|alternates octaves quickly|plays long chords|rests",
      "Stride piano alternates a low bass note or octave with...|a chord in the middle range|a drum fill|a rest",
      "Broken chords are also called...|arpeggios|trills|glissandos",
      "The Alberti bass is typical of the...|Classical era|Medieval era|Renaissance",
      "Boogie-woogie repeats a driving bass pattern in...|eighth notes|whole notes only|silence",
      "Wide arpeggios under a singing melody are typical of...|Romantic piano music|medieval chant|Baroque recitative"
    ], "Picture the left hand and which notes of the chord it plays in order.", "Match each pattern's name to its movement: ordered notes, quick octaves, or bass-chord alternation."),

    L("Famous music theorists", [
      ["Early theory", "📚", "<b>Fux</b>'s <i>Gradus ad Parnassum</i> (1725) taught species counterpoint. <b>Rameau</b>'s <i>Treatise on Harmony</i> (1722) introduced the fundamental bass, or chord roots."],
      ["Modern theory", "📐", "<b>Hugo Riemann</b> developed function theory (tonic, subdominant, dominant). <b>Heinrich Schenker</b> developed layers of structure. <b>Schoenberg</b> wrote <i>Theory of Harmony</i> (1911)."],
      ["Later", "🔬", "<b>Allen Forte</b> wrote about pitch-class set theory. <b>Lerdahl and Jackendoff</b> compared music to language in <i>A Generative Theory of Tonal Music</i> (1983)."]
    ], [
      "Fux's Gradus ad Parnassum (1725) is a guide to...|species counterpoint|jazz harmony|conducting",
      "Rameau's Treatise on Harmony (1722) introduced the idea of...|the fundamental bass (chord roots)|the tone row|equal temperament",
      "Hugo Riemann is known for...|function theory (tonic, subdominant, dominant)|species counterpoint|tone rows",
      "Heinrich Schenker is known for...|Schenkerian analysis (layers of structure)|jazz chord symbols|pop production",
      "Allen Forte wrote about...|pitch-class set theory|Gregorian chant|opera librettos",
      "Schoenberg wrote a textbook called...|Theory of Harmony|Gradus ad Parnassum|The Art of Fugue",
      "Lerdahl and Jackendoff compared music's structure to...|language (grammar)|chemistry|painting",
      "Species counterpoint teaches students by adding...|one line against a given melody in steps of increasing difficulty|only chords|no melody"
    ], "Match each name with the main idea or book they are known for.", "Counterpoint, chord roots, function, layers, sets: each belongs to a different theorist."),

    L("Harmonizing a melody", [
      ["Steps", "🪜", "To harmonize a melody: (1) find the key, (2) mark the cadence points at phrase ends, (3) choose the <b>harmonic rhythm</b>, how often chords change, (4) choose chords containing the melody notes, (5) write a good bass line, (6) check the voice leading."],
      ["Choosing chords", "🎯", "Each melody note should be a chord tone or a non-chord tone that resolves. In C major, scale degree 7 (B) is in V and vii°, not in I or IV. Scale degree 1 (C) is in I, IV and vi."],
      ["Bass line", "🎸", "The bass should mix steps and leaps and move in contrary or oblique motion to the melody. Check for parallel fifths and octaves."]
    ], [
      "The first step in harmonizing a melody is to...|find the key and the cadence points|add a drum part|transpose it",
      "Harmonic rhythm means...|how often the chords change|the beat of the drums|the tempo marking",
      "Between melody and bass, aim for...|a mixture of contrary and oblique motion|only parallel motion|only repeated notes",
      "A melody note should be...|a chord tone or a non-chord tone that resolves|any note at all|always a rest",
      "At the end of each phrase you should place a...|cadence|tempo change|key change",
      "After writing the bass line, you check your voice leading for...|parallel fifths and octaves|wrong lyrics|page numbers",
      "In C major, which chord contains the leading tone B?|V|IV|ii",
      "In C major, a melody note C can be harmonized by...|I, IV or vi|V or vii°|ii or V"
    ], "Work in order: key, cadences, rhythm of the chords, then notes of each chord.", "Check which chords contain the melody note by spelling them out in the key."),
  ];
  l27.push(
    MIX("Mixed practice", l27.slice(0, 9)),
    MIX("Level 27 Challenge", l27.slice(9))
  );

  Object.assign(MUSIC_LEVELS, { 25: l25, 26: l26, 27: l27 });
})();
