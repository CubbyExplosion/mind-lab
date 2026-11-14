// Mind Lab Music Basics. Levels 1-3 have 20 lessons each (60 lessons).
// Every lesson teaches first (3 slides), then quizzes. Every question has 3 hints
// (nudge, clue, worked example) and never shows the real answer.
// Needs math.js loaded first (uses ri, pick, shuf).

const MUSIC_LEVELS = (() => {
  const S = a => ({ h: a[0], v: a[1], t: a[2] });
  // multiple-choice lesson: items = [question, right answer, [wrong answers], visual?]
  const L = (title, slides, items, hints) => {
    const make = () => { const [q, a, w, v] = pick(items); return { text: q, visual: v, choices: shuf([a, ...w]), answer: a, hints }; };
    make.teach = () => slides.map(S);
    return { title, make };
  };
  // lesson with its own question function
  const F = (title, slides, fn) => { const make = () => fn(); make.teach = () => slides.map(S); return { title, make }; };
  // mixed review lesson
  const MIX = (title, ...ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ---------- helpers for computed questions ----------
  const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];
  const notesNext = () => {
    const i = ri(0, 6), after = Math.random() < 0.5, ans = LETTERS[(i + (after ? 1 : 6)) % 7], n = LETTERS[i];
    const wr = shuf(LETTERS.filter(x => x !== ans && x !== n)).slice(0, 2);
    return {
      text: `In the musical alphabet, which letter comes ${after ? "after" : "before"} ${n}?`, visual: LETTERS.join(" "), choices: shuf([ans, ...wr]), answer: ans,
      hints: ["The music alphabet only has 7 letters, and they go in order: A B C D E F G.", `Find ${n} in the row. Look ${after ? "to the right" : "to the left"} of it. (After G, the letters start again at A.)`, "Example: after B comes C, and before B comes A. Now do yours."]
    };
  };
  const notesBetween = () => {
    const i = ri(0, 4), a = LETTERS[i], c = LETTERS[i + 2], ans = LETTERS[i + 1];
    const wr = shuf(LETTERS.filter(x => x !== ans && x !== a && x !== c)).slice(0, 2);
    return {
      text: `Which note is between ${a} and ${c}?`, visual: LETTERS.join(" "), choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Say the letters in order: A B C D E F G.", `Start at ${a} and take one step. You land on the note you want, just before ${c}.`, "Example: between F and A is G. (Say F, G, A.) Now do yours."]
    };
  };
  const SOL = ["do", "re", "mi", "fa", "sol", "la", "ti"];
  const solNext = () => {
    const i = ri(0, 6), after = Math.random() < 0.5, nm = SOL[i], ans = after ? (i === 6 ? "do" : SOL[i + 1]) : (i === 0 ? "ti" : SOL[i - 1]);
    const wr = shuf(SOL.filter(x => x !== ans && x !== nm)).slice(0, 2);
    return {
      text: `In the do-re-mi song, which word comes ${after ? "after" : "before"} "${nm}"?`, visual: "do re mi fa sol la ti do", choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Sing it in your head: do, re, mi, fa, sol, la, ti, do.", `Find "${nm}" in the song. Go ${after ? "one step forward" : "one step back"}. (The top do and the first do are the same word.)`, "Example: after re comes mi, and before re comes do. Now do yours."]
    };
  };
  const clapCount = () => {
    const n = ri(2, 8);
    return {
      text: "Clap once for each hand. How many claps is that?", visual: "👏".repeat(n), answer: n,
      hints: ["Point at each clap and count out loud.", "Touch one clap at a time. Say one number for each one. The last number is how many.", "Example: 👏👏👏 is counted 1, 2, 3. So there are 3. Now count yours."]
    };
  };
  const BT = { "ta": 1, "ti-ti": 1, "sh": 1, "ta-a": 2 }; // sh = a rest (a quiet beat)
  const beatsIn = (pool, len) => () => {
    const toks = Array.from({ length: ri(len[0], len[1]) }, () => pick(pool));
    const n = toks.reduce((s, t) => s + BT[t], 0);
    return {
      text: "Count the beats. How many beats are in this rhythm?", visual: toks.join(" "), answer: n,
      hints: ["Each word is one step. But some words last longer than others.", "ta = 1 beat. ti-ti = 1 beat (two quick sounds in one beat). sh = a quiet beat (1). ta-a = 2 beats. Add them up.", "Example: ta ti-ti ta-a is 1 + 1 + 2 = 4 beats. Now add yours."]
    };
  };
  const DUR = { "whole note": 4, "half note": 2, "quarter note": 1 };
  const addBeats = (max) => () => {
    const names = Object.keys(DUR), count = ri(2, 3); let parts, n;
    do { parts = Array.from({ length: count }, () => pick(names)); n = parts.reduce((s, x) => s + DUR[x], 0); } while (n > max);
    return {
      text: "How many beats do these notes last all together?", visual: parts.join(" + "), answer: n,
      hints: ["Each kind of note lasts a different number of beats. Find how many for each one.", "Whole note = 4 beats. Half note = 2 beats. Quarter note = 1 beat. Add the beats together.", "Example: half note + quarter note = 2 + 1 = 3 beats. Now add yours."]
    };
  };
  const fillMeasure = () => {
    const [nm, have] = pick([["a quarter note", 1], ["a half note", 2], ["two quarter notes", 2], ["three quarter notes", 3], ["a half note and a quarter note", 3], ["a quarter note and a half note", 3]]);
    return {
      text: `A measure has 4 beats. It has ${nm} so far. How many beats are still empty?`, answer: 4 - have,
      hints: ["The measure needs 4 beats in all. First find how many beats you already used.", "Quarter note = 1 beat, half note = 2 beats. Take the beats you used away from 4.", "Example: a measure with 4 beats and a whole note used up has 4 − 4 = 0 left. With two half notes used it also has 0 left. Now do yours."]
    };
  };
  const RESTS = [["a quarter rest", 1, "quarter"], ["a half rest", 2, "half"], ["a whole rest", 4, "whole"]];
  const restBeats = () => {
    const [nm, n, kind] = pick(RESTS);
    if (Math.random() < 0.4) {
      const wr = RESTS.filter(r => r[1] !== n).map(r => r[0]);
      return {
        text: `Which rest is ${n} ${n === 1 ? "beat" : "beats"} of silence?`, choices: shuf([nm, ...wr]), answer: nm,
        hints: ["A rest has the same length as the note with the same name, but you stay quiet.", "Quarter = 1 beat, half = 2 beats, whole = 4 beats. Match the number of beats to the name.", "Example: a rest that is 3 beats long does not exist by itself, but a half rest is 2 beats. Now match yours."]
      };
    }
    return {
      text: `A rest is a silent beat. How many beats of silence is ${nm}?`, answer: n,
      hints: ["A rest has the same length as the note with the same name, but you stay quiet.", "Quarter = 1 beat, half = 2 beats, whole = 4 beats.", "Example: a half note lasts 2 beats, so it would take 2 beats to rest. A quarter rest is shorter. Now do yours."]
    };
  };

  // ======================= LEVEL 1 =======================
  const l1 = [
    L("Steady beat", [
      ["What is a beat?", "💓", "A <b>beat</b> is the pulse in music. It goes <b>tap, tap, tap</b> like a heartbeat or a ticking clock."],
      ["A steady beat stays even", "🥁 tap tap tap tap", "A <b>steady beat</b> does not speed up, slow down or stop. Each tap comes at the same time."],
      ["Try it!", "👏", "Put on a song you like and pat your knees to the beat. Do you keep it steady?"]
    ], [
      ["What is a steady beat?", "A pulse that stays the same", ["A sound that keeps changing speed", "A word in a song"]],
      ["Which one is like a steady beat?", "A ticking clock", ["A sneeze", "A sudden crash"], "⏰"],
      ["Your heart goes thump-thump all day. What is that like?", "A steady beat", ["A loud crash", "A song with words"], "❤️"],
      ["Which is a steady beat?", "Tap, tap, tap, tap, all the same", ["Tap... tap tap... tap... tap tap tap", "No taps at all"]],
      ["How can you show the beat?", "Pat your knees in time", ["Fall asleep", "Hide your hands"], "🙌"],
      ["Walking with even steps feels like a...", "steady beat", ["bumpy mess", "loud shout"], "🚶"],
      ["A metronome ticks evenly. It helps you keep...", "a steady beat", ["a loud voice", "a picture"], "⏱️"],
      ["Marching with a friend, you step...", "together on the beat", ["at random times", "only on Tuesdays"], "🥁"]
    ], ["Think about something that goes the same way over and over, like a clock.", "A steady beat does not rush, drag or stop. It stays even.", "Example: a drum going boom, boom, boom, boom evenly is a steady beat. Now think about yours."]),

    L("Loud and soft", [
      ["Loud sounds", "📢", "Music can be <b>loud</b> like a big drum or <b>soft</b> like a whisper."],
      ["Soft sounds", "🤫", "A lullaby is sung <b>softly</b>. A parade drum is played <b>loudly</b>."],
      ["Use your ears", "👂", "Musicians change between loud and soft to show feelings and make the music interesting."]
    ], [
      ["Which is a loud sound?", "A big drum", ["A whisper", "A sleeping kitten"], "🥁"],
      ["Which is a soft sound?", "A whisper", ["A fire truck siren", "A big drum"], "🤫"],
      ["How do we sing a lullaby?", "Softly", ["Very loudly", "While shouting"], "🌙"],
      ["A marching band parade is usually...", "loud", ["silent", "a whisper"], "🎺"],
      ["You are in a library. How loud is your voice?", "Soft", ["Loud", "As loud as a drum"], "📚"],
      ["Thunder is...", "loud", ["soft", "silent"], "⛈️"],
      ["A mouse tiptoeing makes a...", "soft sound", ["loud sound", "siren sound"], "🐭"],
      ["Which is the soft one?", "A feather landing", ["A door slamming", "A cymbal crash"], "🪶"]
    ], ["Think of how big or powerful the sound is. Is it a whisper or a roar?", "Loud means big sound. Soft means quiet, gentle sound. Picture each choice.", "Example: a lion's roar is loud and a whisper is soft. Now think about yours."]),

    L("Fast and slow", [
      ["Fast music", "🏃", "Music can be <b>fast</b> like a running horse or <b>slow</b> like a sleepy turtle."],
      ["The speed of the beat", "🐢 🐇", "How fast the beat goes is called the <b>tempo</b>. A fast tempo has quick beats. A slow tempo has beats far apart."],
      ["Move to it", "💃", "Walk slowly to slow music and quickly to fast music."]
    ], [
      ["A turtle walking is...", "slow", ["fast", "loud"], "🐢"],
      ["A race car zooming is...", "fast", ["slow", "sleepy"], "🏎️"],
      ["Which song is slow?", "A sleepy lullaby", ["A speedy gallop", "A race"], "😴"],
      ["Which tempo is quick?", "Fast", ["Slow", "Sleepy"]],
      ["A snail crawls. What music fits?", "Slow music", ["Fast music", "Race music"], "🐌"],
      ["A rabbit hopping quickly fits...", "fast music", ["slow music", "no music"], "🐇"],
      ["The speed of the beat is called the...", "tempo", ["color", "volume"]],
      ["A sleepy bear walking home fits...", "slow music", ["fast music", "race music"], "🐻"]
    ], ["Think about how quickly the thing in the picture moves.", "Fast means quick beats. Slow means beats that are far apart, like a sleepy walk.", "Example: a cheetah running is fast, and a sloth is slow. Now think about yours."]),

    L("High and low", [
      ["High sounds", "🐦", "Some sounds are <b>high</b>, like a bird tweeting or a tiny whistle."],
      ["Low sounds", "🐻", "Some sounds are <b>low</b>, like a big bear growling or a tuba."],
      ["Pitch", "🎵", "How high or low a sound is, is called its <b>pitch</b>. Try making a high squeak and a low rumble with your voice."]
    ], [
      ["Which sound is high?", "A bird chirping", ["A bear growling", "A truck rumbling"], "🐦"],
      ["Which sound is low?", "A bear growling", ["A mouse squeak", "A bird tweet"], "🐻"],
      ["A mouse squeaks. Is the sound high or low?", "High", ["Low", "Silent"], "🐭"],
      ["An elephant rumbles. Is the sound high or low?", "Low", ["High", "Silent"], "🐘"],
      ["How high or low a sound is, is called...", "pitch", ["tempo", "beat"]],
      ["A tiny whistle makes a...", "high sound", ["low sound", "no sound"]],
      ["A big tuba plays...", "low notes", ["high notes", "silent notes"]],
      ["A tiny bell tinkles. It sounds...", "high", ["low", "very slow"], "🔔"]
    ], ["Think about the size of what makes the sound. Small things often squeak. Big things often rumble.", "High sounds are thin and squeaky. Low sounds are deep and rumbly.", "Example: a baby bird peeps (high) and a big bear growls (low). Now think about yours."]),

    L("Long and short", [
      ["Long sounds", "〰️", "A <b>long</b> sound goes on and on, like a train whistle held out."],
      ["Short sounds", "•", "A <b>short</b> sound is quick, like a tap or a clap."],
      ["Play with it", "🎶", "Hum one long note, then tap three short ones."]
    ], [
      ["A clap is a...", "short sound", ["long sound", "silent sound"], "👏"],
      ["A siren that keeps going is a...", "long sound", ["short sound", "tap"], "🚨"],
      ["A drum tap is...", "short", ["long", "forever"], "🥁"],
      ["Holding one note for a long time makes a...", "long sound", ["short sound", "clap"]],
      ["Which is a short sound?", "A finger snap", ["A long hum", "A held note"]],
      ["Which is a long sound?", "A long hum", ["A tap", "A click"]],
      ["A ding on a bell, then it stops. Is it short or long?", "Short", ["Long", "Loud"], "🔔"],
      ["A ship's horn goes 'Hooooooo'. It is...", "long", ["short", "silent"], "🚢"]
    ], ["Think about how much time the sound lasts.", "Short sounds stop quickly. Long sounds keep going.", "Example: a click is short, and a held hum is long. Now think about yours."]),

    L("Meet the instruments", [
      ["Instruments", "🎻 🥁 🎺", "An <b>instrument</b> is something you play to make music."],
      ["Some friends", "🎸 🎹 🎷", "Here are a guitar, a piano and a saxophone. Each one has its own sound."],
      ["Names to know", "🎤", "A microphone is not an instrument, but singers use it to make their voices louder."]
    ], [
      ["What is this instrument?", "Drum", ["Guitar", "Trumpet"], "🥁"],
      ["What is this instrument?", "Trumpet", ["Drum", "Violin"], "🎺"],
      ["What is this instrument?", "Violin", ["Trumpet", "Piano"], "🎻"],
      ["What is this instrument?", "Guitar", ["Drum", "Saxophone"], "🎸"],
      ["What is this instrument?", "Piano", ["Violin", "Drum"], "🎹"],
      ["What is this instrument?", "Saxophone", ["Piano", "Trumpet"], "🎷"],
      ["Which instrument has black and white keys?", "Piano", ["Drum", "Trumpet"], "🎹"],
      ["Which instrument do you hit?", "Drum", ["Violin", "Piano"], "🥁"]
    ], ["Look at the picture. Think about the shape and what it is made of.", "Each instrument looks different. Think about which one you have seen or heard.", "Example: 🎺 is a trumpet. Now look at yours and say its name."]),

    L("How we play", [
      ["Hit it", "🥁", "You <b>hit</b> a drum or a triangle with a stick or your hand."],
      ["Blow it", "🎺", "You <b>blow</b> into a trumpet or a flute."],
      ["Pluck or shake it", "🎸", "You <b>pluck</b> or strum a guitar. You <b>shake</b> maracas. You <b>press</b> piano keys."]
    ], [
      ["How do you play a drum?", "Hit it", ["Blow into it", "Shake it"], "🥁"],
      ["How do you play a trumpet?", "Blow into it", ["Hit it", "Press with your toes"], "🎺"],
      ["How do you play a guitar?", "Pluck or strum the strings", ["Blow into it", "Hit it with a spoon"], "🎸"],
      ["How do you play maracas?", "Shake them", ["Blow into them", "Pluck them"]],
      ["How do you play a piano?", "Press the keys", ["Blow into it", "Shake it"], "🎹"],
      ["How do you play a flute?", "Blow across it", ["Hit it hard", "Strum it"]],
      ["How do you play a triangle?", "Tap it with a stick", ["Blow into it", "Press keys"]],
      ["How do you play a tambourine?", "Shake or tap it", ["Blow into it", "Pluck strings"]]
    ], ["Think about how your hands and mouth would touch the instrument.", "Drums are hit. Horns and flutes are blown. Guitars are plucked. Maracas are shaken.", "Example: a xylophone is played by hitting its bars with mallets. Now think about yours."]),

    L("Using our voice", [
      ["Your voice is an instrument", "🎤", "You always have an instrument with you: your <b>voice</b>!"],
      ["Ways to use it", "🗣️ 🎵", "You can <b>speak</b>, <b>whisper</b>, <b>sing</b>, <b>hum</b> and <b>shout</b>. Singing uses long notes with a tune."],
      ["Take care of it", "💧", "Drink water and do not scream. That keeps your voice happy."]
    ], [
      ["Which uses your voice with a tune?", "Singing", ["Clapping", "Stomping"], "🎤"],
      ["Which makes music with your mouth closed?", "Humming", ["Shouting", "Whistling a whisper"]],
      ["What helps keep your voice healthy?", "Drinking water", ["Screaming all day", "Eating only candy"], "💧"],
      ["Which is the quietest voice?", "A whisper", ["A shout", "A yell"], "🤫"],
      ["A group of people singing together is a...", "choir", ["jungle", "kitchen"], "🧑‍🎤"],
      ["Your voice is like an...", "instrument", ["elephant", "sandwich"]],
      ["You sing a song for a baby to sleep. It is a...", "lullaby", ["race", "shout"], "👶"],
      ["Which uses only your body, not a tool?", "Clapping your hands", ["Playing a violin", "Hitting a drum"], "👏"]
    ], ["Think about what you use to make each sound.", "Your voice comes from your throat and mouth. Singing has a tune.", "Example: humming is making a tune with your mouth closed. Now think about yours."]),

    F("Count the beats", [
      ["Counting beats", "👏👏👏", "To count a beat, say one number for each clap: 1, 2, 3."],
      ["Point and count", "☝️", "Touch each clap as you say its number."],
      ["The last number", "🔢", "The last number you say tells you how many there are."]
    ], clapCount),

    L("Ta and ti-ti", [
      ["Rhythm words", "🗣️", "We can say rhythms with words. <b>ta</b> is one sound on a beat."],
      ["Two quick sounds", "ti-ti", "<b>ti-ti</b> is two quick sounds in the space of one beat. They are twice as fast as ta."],
      ["Say it", "ta ta ti-ti ta", "Clap and say: ta ta ti-ti ta. That is four beats."]
    ], [
      ["How many sounds in one \"ta\"?", "1", ["2", "3"]],
      ["How many sounds in one \"ti-ti\"?", "2", ["1", "4"]],
      ["Which is two quick sounds in one beat?", "ti-ti", ["ta", "shh"]],
      ["Which is one sound for one beat?", "ta", ["ti-ti", "ti-ti-ti"]],
      ["Which one is faster?", "ti-ti", ["ta", "They are the same"]],
      ["How many beats does \"ta ta\" take?", "2", ["1", "4"]],
      ["How many beats does \"ti-ti ta\" take?", "2", ["1", "3"]],
      ["How many beats does \"ta\" take?", "1", ["2", "3"]]
    ], ["ta is the plain step on the beat. ti-ti squeezes two sounds into one beat.", "Count each word as one beat, even if it has two sounds (ti-ti).", "Example: \"ta ti-ti\" is 2 beats because ta is one beat and ti-ti is one beat. Now do yours."]),

    L("Same or different", [
      ["Same rhythm", "ta ta ta ta", "When two rhythms have the same words in the same order, they are the <b>same</b>."],
      ["Different rhythm", "ta ti-ti ta", "If the words change or move to another spot, the rhythm is <b>different</b>."],
      ["Listen closely", "👂", "Clap the first one, then the second one. Do they feel alike?"]
    ], [
      ["Same or different? ta ta ti-ti ta / ta ta ti-ti ta", "Same", ["Different", "Silent"]],
      ["Same or different? ta ti-ti ta ta / ta ta ti-ti ta", "Different", ["Same", "Silent"]],
      ["Same or different? ta ta ta ta / ta ta ta ta", "Same", ["Different", "Loud"]],
      ["Same or different? ti-ti ti-ti ta / ti-ti ta ti-ti", "Different", ["Same", "Soft"]],
      ["Same or different? ta ti-ti ti-ti ta / ta ti-ti ti-ti ta", "Same", ["Different", "Fast"]],
      ["Same or different? ta ta ti-ti / ta ta ta", "Different", ["Same", "Slow"]],
      ["Same or different? ti-ti ta ta / ti-ti ta ta", "Same", ["Different", "Quiet"]],
      ["Same or different? ta ti-ti ta / ti-ti ta ta", "Different", ["Same", "Loud"]]
    ], ["Look at the first rhythm and then the second one.", "Check each word one by one, in order. Do they match every time?", "Example: \"ta ta ti-ti\" and \"ta ta ti-ti\" match word for word, so they are the same. Now check yours."]),

    L("What comes next?", [
      ["Patterns in music", "🔁", "A <b>pattern</b> repeats. When you know the pattern you can tell what comes next."],
      ["Example", "ta ti-ti ta ti-ti ?", "The pattern goes ta, ti-ti, ta, ti-ti... so next is <b>ta</b>."],
      ["Find the repeat", "🔍", "Look for the part that repeats. Then keep going."]
    ], [
      ["What comes next? ta ti-ti ta ti-ti ta ___", "ti-ti", ["ta", "shh"]],
      ["What comes next? ta ta ti-ti ta ta ___", "ti-ti", ["ta", "shh"]],
      ["What comes next? loud soft loud soft loud ___", "soft", ["loud", "silence"]],
      ["What comes next? clap stomp clap stomp clap ___", "stomp", ["clap", "jump"], "👏"],
      ["What comes next? ta ta ta ti-ti ta ta ta ___", "ti-ti", ["ta", "shh"]],
      ["What comes next? high low high low high ___", "low", ["high", "middle"]],
      ["What comes next? pat clap pat clap pat ___", "clap", ["pat", "snap"]],
      ["What comes next? fast slow fast slow fast ___", "slow", ["fast", "soft"]]
    ], ["Say the pattern out loud from the start.", "Find the small part that repeats, then say the next piece of it.", "Example: clap stomp clap stomp clap ___ . The pattern is clap-stomp, so stomp comes next. Now do yours."]),

    L("Up and down", [
      ["Melody goes up", "🪜 ⬆️", "A <b>melody</b> is the tune of a song. When the notes get higher, the melody goes <b>up</b>."],
      ["Melody goes down", "🛝 ⬇️", "When the notes get lower, the melody goes <b>down</b>."],
      ["Use your hand", "🤚", "Move your hand up when the sound goes up. Move it down when the sound goes down."]
    ], [
      ["A tune goes do, re, mi, fa. It goes...", "up", ["down", "nowhere"], "⬆️"],
      ["A tune goes mi, re, do. It goes...", "down", ["up", "nowhere"], "⬇️"],
      ["A siren sounds like going up. The pitch is getting...", "higher", ["lower", "quieter"], "🚨"],
      ["A sliding whistle goes from high to low. The sound goes...", "down", ["up", "nowhere"]],
      ["A tune is also called a...", "melody", ["window", "lunch"]],
      ["When the notes climb like stairs, the melody goes...", "up", ["down", "sideways"], "🪜"],
      ["If a tune goes from la to sol to fa, it goes...", "down", ["up", "round"]],
      ["If a tune goes from do to re to mi, it goes...", "up", ["down", "round"]]
    ], ["Say each note and listen to whether it gets higher or lower.", "Higher notes are later in the do-re-mi song. Lower notes are earlier.", "Example: do re mi goes up (do is the lowest of the three). Now do yours."]),

    L("Songs we know", [
      ["Songs have titles", "🎵", "Every song has a <b>title</b>, its name. Many of you know some already!"],
      ["Story songs", "⭐ 🕷️ 🚌", "\"Twinkle, Twinkle, Little Star\" is about a star. \"The Itsy Bitsy Spider\" is about a spider. \"The Wheels on the Bus\" is about a bus."],
      ["Sing along", "🎤", "Singing songs together is fun. Try singing one now!"]
    ], [
      ["Which song is about a spider?", "The Itsy Bitsy Spider", ["Row, Row, Row Your Boat", "Happy Birthday"], "🕷️"],
      ["Which song is about a star?", "Twinkle, Twinkle, Little Star", ["The Wheels on the Bus", "Old MacDonald"], "⭐"],
      ["Which song is about a bus?", "The Wheels on the Bus", ["Itsy Bitsy Spider", "Twinkle, Twinkle"], "🚌"],
      ["Which song is about a farm?", "Old MacDonald Had a Farm", ["Row, Row, Row Your Boat", "The Itsy Bitsy Spider"], "🚜"],
      ["Which song is about a little lamb?", "Mary Had a Little Lamb", ["Old MacDonald", "Happy Birthday"], "🐑"],
      ["Which song do we sing on a birthday?", "Happy Birthday", ["Wheels on the Bus", "Twinkle, Twinkle"], "🎂"],
      ["Which song is about a boat?", "Row, Row, Row Your Boat", ["Old MacDonald", "Itsy Bitsy Spider"], "🚣"],
      ["Which song has black sheep with wool?", "Baa, Baa, Black Sheep", ["Mary Had a Little Lamb", "Twinkle, Twinkle"], "🐑"]
    ], ["Think about what the song's title says. What is in it?", "The title often tells you who or what the song is about.", "Example: \"The Wheels on the Bus\" is about a bus. Now find the title that matches yours."]),

    L("More kid songs", [
      ["Body song", "🙆", "\"Head, Shoulders, Knees and Toes\" is a song where we touch parts of our body."],
      ["Clapping song", "👏", "\"If You're Happy and You Know It\" tells you to clap your hands."],
      ["Counting song", "🦆", "\"Five Little Ducks\" counts ducks going out to play."]
    ], [
      ["Which song is about parts of your body?", "Head, Shoulders, Knees and Toes", ["Five Little Ducks", "Jingle Bells"], "🙆"],
      ["In which song do you clap your hands?", "If You're Happy and You Know It", ["Row, Row, Row Your Boat", "Jingle Bells"], "👏"],
      ["Which song counts ducks?", "Five Little Ducks", ["Head, Shoulders, Knees and Toes", "Happy Birthday"], "🦆"],
      ["Which song has the letters A, B, C in it?", "The Alphabet Song", ["Five Little Ducks", "Old MacDonald"], "🔤"],
      ["Which song has a sleigh and bells?", "Jingle Bells", ["Five Little Ducks", "Wheels on the Bus"], "🔔"],
      ["Which song has a Hokey and a Pokey?", "The Hokey Pokey", ["Jingle Bells", "Twinkle, Twinkle"]],
      ["Which song says \"E-I-E-I-O\"?", "Old MacDonald Had a Farm", ["Five Little Ducks", "Jingle Bells"], "🐄"],
      ["Which song mentions a bridge that is falling down?", "London Bridge", ["Hokey Pokey", "Five Little Ducks"], "🌉"]
    ], ["Think of the song and what is in its words.", "The title usually gives a clue about the song's idea.", "Example: \"Five Little Ducks\" has ducks in it, so it counts ducks. Now match yours."]),

    L("Music words", [
      ["People in music", "🎼", "A <b>musician</b> plays music. A <b>singer</b> sings. A <b>conductor</b> leads a big group."],
      ["Groups", "🎶", "A <b>band</b> is a group that plays instruments. A <b>choir</b> is a group that sings."],
      ["Listeners", "🧑‍🤝‍🧑", "The people who listen are the <b>audience</b>."]
    ], [
      ["Who plays music?", "A musician", ["A baker", "A farmer"], "🎻"],
      ["A group that sings together is a...", "choir", ["circus", "kitchen"], "🎤"],
      ["The people who listen to a show are the...", "audience", ["orchestra", "choir"]],
      ["A group that plays instruments is a...", "band", ["choir", "audience"], "🎺"],
      ["Who sings songs?", "A singer", ["A farmer", "A painter"], "🎤"],
      ["Who leads a big group of musicians?", "A conductor", ["A baker", "A driver"]],
      ["What is a song's name called?", "A title", ["A beat", "A drum"]],
      ["Someone who plays a drum is a...", "drummer", ["singer", "painter"], "🥁"]
    ], ["Think about what each person does in music.", "Singers use voices. Players use instruments. Listeners are the audience.", "Example: someone who plays piano is a pianist. Now find the word for yours."]),

    L("Listening manners", [
      ["Be a good listener", "👂", "When someone sings or plays, we <b>listen quietly</b> and keep still."],
      ["Clap at the end", "👏", "Wait until the song ends, then <b>clap</b> to say thank you."],
      ["Kind words", "😊", "Say something kind, like \"I liked your song!\" Never laugh at a mistake."]
    ], [
      ["Someone is playing a song. What do you do?", "Listen quietly", ["Talk loudly", "Run around"], "👂"],
      ["When the song ends, you can...", "clap", ["boo", "walk away"], "👏"],
      ["A friend makes a mistake while singing. You...", "stay kind", ["laugh at them", "tell everyone"], "😊"],
      ["Which is kind to say?", "I liked your song!", ["That was bad!", "Stop playing!"]],
      ["At a concert, you should...", "sit quietly", ["shout all the time", "grab the instruments"], "🎻"],
      ["Which is good listening?", "Looking at the player", ["Playing with toys", "Talking to a friend"]],
      ["What do you say after a friend sings?", "Thank you for singing", ["Go away", "I did not hear it"]],
      ["Who should not touch an instrument without asking?", "You", ["No one needs to ask", "Only a stranger"]]
    ], ["Think about how you like to be treated when you perform.", "Good listeners stay quiet, look at the player and are kind.", "Example: while someone plays, we stay quiet. Then we clap at the end. Now think about yours."]),

    L("Music and feelings", [
      ["Music shows feelings", "😊 😴 💃", "Music can feel happy, calm, sleepy or excited."],
      ["Fast and bouncy", "🎉", "Fast, bright music often feels happy and busy."],
      ["Slow and soft", "🌙", "Slow, soft music feels calm and sleepy."]
    ], [
      ["Which music feels sleepy?", "A slow, soft lullaby", ["A fast loud dance", "A very loud crash"], "😴"],
      ["Which music feels excited?", "A fast, bouncy tune", ["A slow whisper", "A sleepy lullaby"], "🎉"],
      ["A lullaby is sung to help someone...", "fall asleep", ["run fast", "wake up"], "🌙"],
      ["A birthday song feels...", "happy", ["sleepy", "angry"], "🎂"],
      ["Slow, soft music makes you feel...", "calm", ["jumpy", "angry"]],
      ["A marching song has a strong...", "steady beat", ["whisper", "mess"], "🥁"],
      ["A dance song makes you want to...", "move", ["sleep", "hide"], "💃"],
      ["Which is a calm song?", "A gentle lullaby", ["A speedy polka", "A loud parade"]]
    ], ["Think about how the music would make your body feel.", "Slow and soft usually feels calm. Fast and loud feels busy and bouncy.", "Example: a quick, bouncy tune makes you want to dance. Now think about yours."])
  ];
  l1.push(
    MIX("Mixed practice", l1[1], l1[2], l1[3], l1[4]),
    MIX("Level 1 Challenge", l1[0], l1[5], l1[9], l1[13], l1[15])
  );

  // ======================= LEVEL 2 =======================
  const l2 = [
    F("Counting beats", [
      ["Beats in a rhythm", "ta ta ti-ti ta", "A rhythm is made of beats. We count one beat for each <b>ta</b> or <b>ti-ti</b>."],
      ["Quiet beats", "sh", "A <b>rest</b> is a quiet beat. We count it too. Say <b>sh</b> and stay silent."],
      ["A longer sound", "ta-a", "<b>ta-a</b> is a sound that lasts for 2 beats."]
    ], beatsIn(["ta", "ti-ti"], [3, 6])),

    F("Quarter note", [
      ["Quarter note", "♩ = 1 beat", "A <b>quarter note</b> lasts one beat. It is the same as <b>ta</b>."],
      ["Four of them", "♩ ♩ ♩ ♩", "A measure of four beats can hold four quarter notes."],
      ["Count it", "1 2 3 4", "Clap four quarter notes and count out loud: 1, 2, 3, 4."]
    ], addBeats(4)),

    L("Eighth notes", [
      ["Two quick notes", "♪♪", "Two <b>eighth notes</b> fit in one beat. They are the same as <b>ti-ti</b>."],
      ["Joined with a bar", "♫", "Eighth notes often have a bar joining them together."],
      ["Say it", "ti-ti", "Each eighth note is half as long as a quarter note."]
    ], [
      ["Two eighth notes together last...", "1 beat", ["2 beats", "4 beats"], "♫"],
      ["Two eighth notes sound like...", "ti-ti", ["ta", "sh"]],
      ["A quarter note sounds like...", "ta", ["ti-ti", "sh"], "♩"],
      ["Which is faster?", "An eighth note", ["A quarter note", "They are the same"]],
      ["How many eighth notes fit in one beat?", "2", ["1", "4"]],
      ["How many eighth notes fit in two beats?", "4", ["2", "1"]],
      ["An eighth note is...", "half as long as a quarter note", ["twice as long as a quarter note", "the same as a rest"]],
      ["Which two notes fill one beat?", "Two eighth notes", ["Two half notes", "Two whole notes"], "♪♪"]
    ], ["Think about ti-ti: two quick sounds in one beat.", "Eighth notes come in pairs to fill a beat. One quarter note also fills a beat.", "Example: a quarter note is 1 beat, and so are two eighth notes. Now do yours."]),

    F("Rests", [
      ["Quiet times", "sh", "A <b>rest</b> is a silent beat. Music needs quiet moments too."],
      ["Rests have lengths", "𝄽 = 1 beat", "A <b>quarter rest</b> is 1 beat of silence, a <b>half rest</b> is 2, a <b>whole rest</b> is 4."],
      ["Count the quiet", "1 2 3 4", "Keep counting in your head when you rest. Stay still and quiet."]
    ], restBeats),

    L("Loud and soft words", [
      ["Italian words", "🇮🇹", "Musicians use special words for loud and soft. The words come from Italian."],
      ["Piano and forte", "p  f", "<b>Piano</b> (p) means <b>soft</b>. <b>Forte</b> (f) means <b>loud</b>."],
      ["Not the instrument!", "🎹", "In music, \"piano\" can be the instrument or the word for soft. It is the same word!"]
    ], [
      ["What does \"forte\" mean?", "Loud", ["Soft", "Fast"]],
      ["What does \"piano\" mean as a music word?", "Soft", ["Loud", "Slow"]],
      ["The letter p in music means...", "soft", ["loud", "fast"]],
      ["The letter f in music means...", "loud", ["soft", "slow"]],
      ["A lullaby should be played...", "piano", ["forte", "fast"], "🌙"],
      ["A big march parade should be played...", "forte", ["piano", "slowly"], "🥁"],
      ["Which word means a gentle, quiet sound?", "Piano", ["Forte", "Loud"]],
      ["Which word means a strong, big sound?", "Forte", ["Piano", "Soft"]]
    ], ["These are Italian words that musicians all over the world use.", "Remember: piano = soft, forte = loud. Think of the sound of each word.", "Example: mezzo means medium, so mezzo forte means medium loud. Now do yours."]),

    L("Fast and slow words", [
      ["Tempo words", "⏱️", "Musicians also have words for tempo, how fast the music goes."],
      ["Slow to fast", "🐢 → 🐇", "<b>Largo</b> is very slow. <b>Andante</b> is a walking speed. <b>Allegro</b> is fast and lively. <b>Presto</b> is very fast."],
      ["Changing", "↗️", "<b>Accelerando</b> means getting faster. <b>Ritardando</b> means slowing down."]
    ], [
      ["What does \"largo\" mean?", "Very slow", ["Very fast", "Very loud"]],
      ["What does \"presto\" mean?", "Very fast", ["Very slow", "Very quiet"]],
      ["What does \"allegro\" mean?", "Fast and lively", ["Slow and sleepy", "Silent"]],
      ["\"Andante\" is like...", "walking", ["racing", "sleeping"], "🚶"],
      ["Which word means slowing down?", "Ritardando", ["Accelerando", "Presto"]],
      ["Which word means getting faster?", "Accelerando", ["Ritardando", "Largo"]],
      ["Which is the slowest?", "Largo", ["Presto", "Allegro"], "🐢"],
      ["Which is the fastest?", "Presto", ["Largo", "Andante"], "🐇"]
    ], ["These words tell musicians how fast to play.", "Slow words: largo, andante. Fast words: allegro, presto. Presto is the fastest.", "Example: \"adagio\" means slow and relaxed. Now think about yours."]),

    L("Higher or lower", [
      ["Compare pitch", "🎵 ⬆️⬇️", "We can tell which of two sounds is higher. Small instruments are usually higher, big ones lower."],
      ["Instruments", "🎻 🎼", "A violin is higher than a cello. A flute is higher than a tuba. A trumpet is higher than a tuba."],
      ["Listen", "👂", "Sing a low note and then a high note. Feel the difference in your throat."]
    ], [
      ["Which sounds higher?", "A violin", ["A cello", "They are the same"], "🎻"],
      ["Which sounds lower?", "A tuba", ["A flute", "A whistle"]],
      ["Which sounds higher?", "A flute", ["A tuba", "A bass drum"]],
      ["Which sounds higher?", "A bird chirp", ["A lion roar", "A truck engine"], "🐦"],
      ["Which sounds lower?", "A bear growl", ["A mouse squeak", "A bird tweet"], "🐻"],
      ["Which sounds higher?", "A trumpet", ["A tuba", "A bass drum"], "🎺"],
      ["Which sounds lower?", "A big drum", ["A tiny bell", "A whistle"], "🥁"],
      ["Which sounds higher?", "A tiny bell", ["A big drum", "A tuba"], "🔔"]
    ], ["Big things usually make lower sounds. Small things usually make higher sounds.", "Think about the size of each instrument or animal.", "Example: a tiny piccolo is higher than a big tuba. Now compare yours."]),

    L("Strings and drums", [
      ["Instrument families", "🎻 🥁 🎺 🪈", "Instruments are sorted into <b>families</b> by how they make sound."],
      ["Strings", "🎻 🎸", "<b>Strings</b> make sound when strings shake. Violin, viola, cello, double bass, harp and guitar are strings."],
      ["Percussion", "🥁", "<b>Percussion</b> instruments are hit, shaken or scraped. Drums, xylophone, triangle and cymbals are percussion."]
    ], [
      ["Which family has a violin?", "Strings", ["Percussion", "Brass"], "🎻"],
      ["Which family has a drum?", "Percussion", ["Strings", "Woodwinds"], "🥁"],
      ["Which family has a cello?", "Strings", ["Percussion", "Brass"]],
      ["Which family has a triangle?", "Percussion", ["Strings", "Woodwinds"]],
      ["Which family has a guitar?", "Strings", ["Percussion", "Brass"], "🎸"],
      ["Which family has a xylophone?", "Percussion", ["Strings", "Brass"]],
      ["Which family has a harp?", "Strings", ["Percussion", "Woodwinds"]],
      ["Which family has cymbals?", "Percussion", ["Strings", "Brass"]]
    ], ["Think about how you make the sound: strings shake or hit.", "Strings: vibrate. Percussion: hit, shake or scrape.", "Example: a double bass is a string instrument. A tambourine is percussion. Now do yours."]),

    L("Brass and woodwinds", [
      ["Brass", "🎺", "<b>Brass</b> instruments are metal. You buzz your lips into them. Trumpet, trombone, French horn and tuba are brass."],
      ["Woodwinds", "🪈", "<b>Woodwinds</b> are blown. Flute, clarinet, oboe, bassoon and recorder are woodwinds. The saxophone is one too."],
      ["Wind", "💨", "Both families use your breath. Brass is buzzed, and woodwinds use a reed or an edge."]
    ], [
      ["Which family has a trumpet?", "Brass", ["Strings", "Percussion"], "🎺"],
      ["Which family has a flute?", "Woodwinds", ["Brass", "Strings"]],
      ["Which family has a tuba?", "Brass", ["Woodwinds", "Percussion"]],
      ["Which family has a clarinet?", "Woodwinds", ["Brass", "Strings"]],
      ["Which family has a trombone?", "Brass", ["Woodwinds", "Strings"]],
      ["Which family has a recorder?", "Woodwinds", ["Brass", "Percussion"]],
      ["Which family has a saxophone?", "Woodwinds", ["Brass", "Strings"], "🎷"],
      ["Which family has a French horn?", "Brass", ["Woodwinds", "Percussion"]]
    ], ["Both families use breath. Think about what the instrument is made of.", "Brass: shiny metal horns you buzz into. Woodwinds: pipes you blow across or use a reed on.", "Example: a trombone is brass. An oboe is a woodwind. Now do yours."]),

    L("All the families", [
      ["Four families", "🎻 🪈 🎺 🥁", "Remember all four: <b>strings</b>, <b>woodwinds</b>, <b>brass</b> and <b>percussion</b>."],
      ["Orchestra", "🎼", "An <b>orchestra</b> has all four families playing together."],
      ["Which one?", "🤔", "Ask: is it plucked or bowed (strings), blown (woodwinds or brass) or hit (percussion)?"]
    ], [
      ["Which family has a violin?", "Strings", ["Brass", "Woodwinds", "Percussion"]],
      ["Which family has a trumpet?", "Brass", ["Strings", "Woodwinds", "Percussion"]],
      ["Which family has a flute?", "Woodwinds", ["Strings", "Brass", "Percussion"]],
      ["Which family has a drum?", "Percussion", ["Strings", "Brass", "Woodwinds"]],
      ["Which family has a tuba?", "Brass", ["Strings", "Woodwinds", "Percussion"]],
      ["Which family has a clarinet?", "Woodwinds", ["Strings", "Brass", "Percussion"]],
      ["Which family has a harp?", "Strings", ["Brass", "Woodwinds", "Percussion"]],
      ["Which family has a xylophone?", "Percussion", ["Strings", "Brass", "Woodwinds"]]
    ], ["Think about how the instrument makes its sound.", "Strings vibrate, woodwinds and brass are blown, and percussion is hit or shaken.", "Example: a cello is strings, an oboe is woodwinds. Now do yours."]),

    F("Musical alphabet", [
      ["Seven letters", "A B C D E F G", "Music uses only 7 letters for its notes: <b>A B C D E F G</b>."],
      ["Then again", "G → A", "After G, we go back to A and start again."],
      ["Backwards too", "G F E D C B A", "You can also say them backwards."]
    ], notesNext),

    F("Which note comes next?", [
      ["The order", "A B C D E F G", "Notes go in alphabetical order, then restart."],
      ["After and before", "C → D", "After C comes D. Before C comes B."],
      ["Say it", "🗣️", "If you get stuck, say the letters from A until you reach yours."]
    ], notesNext),

    L("Piano keys", [
      ["White and black keys", "🎹", "A piano has white keys and black keys."],
      ["Groups of black keys", "▮▮ ▮▮▮", "The black keys come in groups of <b>2</b> and groups of <b>3</b>."],
      ["Low to high", "⬅️ ➡️", "Keys on the left make low sounds. Keys on the right make high sounds."]
    ], [
      ["On a piano, keys on the right sound...", "higher", ["lower", "quieter"], "🎹"],
      ["On a piano, keys on the left sound...", "lower", ["higher", "faster"], "🎹"],
      ["The black keys come in groups of...", "2 and 3", ["5 and 6", "10 and 12"]],
      ["The two kinds of keys are black and...", "white", ["red", "blue"]],
      ["How do you make a sound on a piano?", "Press a key", ["Blow", "Shake it"]],
      ["Is a piano a good instrument for playing a tune?", "Yes", ["No", "Never"], "🎹"],
      ["Which hand plays the low notes usually?", "The left hand", ["The right hand", "Neither hand"]],
      ["Which side is the high side of a piano?", "The right side", ["The left side", "The top"]]
    ], ["Picture a piano keyboard in front of you.", "Left is low and right is high. Black keys come in twos and threes.", "Example: pressing a key at the far right gives a very high tweet. Now think about yours."]),

    L("Singing well", [
      ["Stand tall", "🧍", "Stand or sit up straight so your breath can flow."],
      ["Breathe", "🌬️", "Take a big breath in through your nose, then sing out slowly."],
      ["Say the words", "🗣️", "Open your mouth and sing the words clearly."]
    ], [
      ["How should you stand to sing?", "Tall and straight", ["Slouching", "Hiding your face"], "🧍"],
      ["What do you do before a long note?", "Take a big breath", ["Hold your nose", "Close your eyes tight"], "🌬️"],
      ["How do you sing the words?", "Clearly", ["Without opening your mouth", "Mumbling"]],
      ["Which hurts your voice?", "Screaming", ["Drinking water", "Humming softly"]],
      ["Which helps your voice?", "Drinking water", ["Screaming", "Shouting all day"], "💧"],
      ["When singing with others, you should...", "listen to them", ["be louder than everyone", "stop and talk"], "👂"],
      ["A good warm-up for singing is...", "humming", ["running a race", "shouting"]],
      ["When you sing, your mouth should be...", "open", ["closed tight", "full of food"]]
    ], ["Think about how your body helps you sing.", "Good singers sit or stand tall, breathe deeply and use clear words.", "Example: before singing, take a deep breath. Now do yours."]),

    L("Round and echo", [
      ["A round", "🔁", "In a <b>round</b> everyone sings the same song, but starts at different times."],
      ["Row, Row, Row Your Boat", "🚣", "\"Row, Row, Row Your Boat\" is a round. One group starts, then the next group joins later."],
      ["Echo", "🏔️", "In an <b>echo</b>, one person sings and then you copy it back."]
    ], [
      ["In a round, everyone...", "sings the same song at different times", ["sings a different song", "stays silent"], "🔁"],
      ["Which song is often sung as a round?", "Row, Row, Row Your Boat", ["Happy Birthday", "Jingle Bells"]],
      ["In an echo, you...", "copy what you hear", ["do something different", "walk away"]],
      ["An echo in the mountains is a...", "sound that bounces back", ["silent hole", "red sound"], "🏔️"],
      ["What do you need to do in a round?", "Listen to your own part", ["Sing as loud as possible", "Stop and watch"]],
      ["In a round the singers start...", "one after another", ["all at the same moment", "never"]],
      ["An echo song asks you to...", "copy the leader", ["lead", "sleep"]],
      ["Singing the same tune later than another group is a...", "round", ["triangle", "echo only"]]
    ], ["Think about taking turns joining in.", "A round starts at different times. An echo copies what was just sung.", "Example: in an echo, the leader sings 'la la' and you sing 'la la' back. Now do yours."]),

    L("Songs we know 2", [
      ["More songs", "🎵", "Here are more songs and what they are about."],
      ["Same tune!", "🔤 ⭐", "The Alphabet Song and \"Twinkle, Twinkle\" have the same tune!"],
      ["Sing them", "🎤", "Singing the same tune with different words is fun."]
    ], [
      ["Which song has the same tune as Twinkle, Twinkle?", "The Alphabet Song", ["Happy Birthday", "Jingle Bells"], "🔤"],
      ["Which song has a monkey chasing a weasel?", "Pop Goes the Weasel", ["Twinkle, Twinkle", "Jingle Bells"]],
      ["Which song is sung on birthdays?", "Happy Birthday to You", ["Jingle Bells", "London Bridge"], "🎂"],
      ["Which song says \"dashing through the snow\"?", "Jingle Bells", ["Happy Birthday", "Five Little Ducks"], "❄️"],
      ["In which song do you spin around?", "The Hokey Pokey", ["Happy Birthday", "Jingle Bells"], "🙆"],
      ["Which song counts little ducks?", "Five Little Ducks", ["Jingle Bells", "Hokey Pokey"], "🦆"],
      ["Which song asks about a farmer and animals?", "Old MacDonald Had a Farm", ["Jingle Bells", "Happy Birthday"], "🐮"],
      ["Which song has a little spider on the spout?", "The Itsy Bitsy Spider", ["Jingle Bells", "Happy Birthday"], "🕷️"]
    ], ["Think of the song's words and what it is about.", "The title or the first line of a song usually gives a clue.", "Example: \"Old MacDonald\" has a farm and animals. Now think about yours."]),

    L("Same or different parts", [
      ["Parts of a song", "A B A", "Songs have parts. We call the first part <b>A</b> and a new part <b>B</b>."],
      ["A B A", "A B A", "If the first part comes back at the end, the song is <b>A B A</b>."],
      ["Listen", "👂", "Is it the same part again, or a new one?"]
    ], [
      ["A song goes A, B, A. The last part is...", "the same as the first", ["a new part", "silent"]],
      ["A song goes A, A, B. How many times is part A played?", "2", ["1", "3"]],
      ["In A B A, which part is new?", "B", ["The first A", "The last A"]],
      ["How many parts in A B A?", "3", ["2", "4"]],
      ["In A B A B, how many times do you hear B?", "2", ["1", "3"]],
      ["In A B, how many different parts?", "2", ["1", "3"]],
      ["In A A A, how many different parts are there?", "1", ["2", "3"]],
      ["In A B C, how many different parts are there?", "3", ["1", "2"]]
    ], ["Look at the letters. The same letter is the same part.", "Count the different letters to find different parts.", "Example: A B A has 2 different parts (A and B) and 3 parts in all. Now do yours."]),

    L("Music jobs", [
      ["Who does what?", "🎼", "A <b>composer</b> writes music. A <b>conductor</b> leads the orchestra."],
      ["More jobs", "🎹 🥁", "A pianist plays piano. A drummer plays drums."],
      ["The listeners", "🧑‍🤝‍🧑", "The <b>audience</b> listens and claps."]
    ], [
      ["Who writes new music?", "A composer", ["A conductor", "An audience member"]],
      ["Who leads the orchestra?", "A conductor", ["A composer", "A driver"]],
      ["Who plays the piano?", "A pianist", ["A drummer", "A farmer"], "🎹"],
      ["Who plays the drums?", "A drummer", ["A pianist", "A singer"], "🥁"],
      ["Who sings in a choir?", "A singer", ["A chef", "A baker"]],
      ["Who watches and listens at a concert?", "The audience", ["The conductor", "The composer"]],
      ["Who plays a violin?", "A violinist", ["A drummer", "A baker"], "🎻"],
      ["A large group with all four instrument families is an...", "orchestra", ["audience", "kitchen"], "🎼"]
    ], ["Think about what each person does for the music.", "Composers write, conductors lead, players play, audiences listen.", "Example: a person who plays the trumpet is a trumpeter. Now do yours."])
  ];
  l2.push(
    MIX("Mixed practice", l2[0], l2[4], l2[7], l2[10]),
    MIX("Level 2 Challenge", l2[1], l2[5], l2[9], l2[10], l2[11], l2[17])
  );

  // ======================= LEVEL 3 =======================
  const l3 = [
    L("Note lengths", [
      ["Notes have lengths", "𝅝 𝅗𝅥 ♩", "Different notes last different amounts of time."],
      ["The big three", "whole 4 · half 2 · quarter 1", "A <b>whole note</b> lasts 4 beats. A <b>half note</b> lasts 2 beats. A <b>quarter note</b> lasts 1 beat."],
      ["Bigger is longer", "4 > 2 > 1", "Whole is longer than half. Half is longer than quarter."]
    ], [
      ["How many beats does a whole note last?", "4", ["2", "1"]],
      ["How many beats does a half note last?", "2", ["4", "1"]],
      ["How many beats does a quarter note last?", "1", ["2", "4"]],
      ["Which note is longest?", "Whole note", ["Half note", "Quarter note"]],
      ["Which note is shortest?", "Quarter note", ["Half note", "Whole note"]],
      ["Two half notes last...", "4 beats", ["2 beats", "1 beat"]],
      ["Four quarter notes last...", "4 beats", ["2 beats", "8 beats"]],
      ["A half note is as long as...", "two quarter notes", ["four quarter notes", "one quarter note"]]
    ], ["Think about the sizes: whole is the biggest, quarter is smallest.", "Whole = 4 beats, half = 2 beats, quarter = 1 beat.", "Example: a half note = 2 beats, so two half notes = 4 beats. Now do yours."]),

    F("Add the beats", [
      ["Add them up", "2 + 1 = 3", "To find how long notes last together, add their beats."],
      ["Example", "half + quarter", "A half note (2) plus a quarter note (1) is 3 beats."],
      ["Tip", "🧮", "Write each note's beats as a number, then add."]
    ], addBeats(8)),

    F("Fill the measure", [
      ["A measure", "| 4 beats |", "Music is cut into little boxes called <b>measures</b>. In 4/4 time each measure holds 4 beats."],
      ["Filling it", "2 + ? = 4", "If a half note takes 2 beats, there are 2 beats left to fill."],
      ["Subtract", "4 − 2 = 2", "Take the beats you used away from 4 to find what is left."]
    ], fillMeasure),

    L("The staff", [
      ["The staff", "═════", "Music is written on a <b>staff</b>, a set of lines."],
      ["Five lines, four spaces", "5 lines · 4 spaces", "A staff has <b>5 lines</b> and <b>4 spaces</b> between them."],
      ["Where notes live", "𝅘𝅥", "Notes sit on the lines or in the spaces."]
    ], [
      ["How many lines are on a staff?", "5", ["4", "6"]],
      ["How many spaces are on a staff?", "4", ["5", "6"]],
      ["Notes can sit on a line or in a...", "space", ["circle", "box"]],
      ["Music is written on a...", "staff", ["pipe", "stove"]],
      ["Which has more: lines or spaces on a staff?", "Lines", ["Spaces", "They are equal"]],
      ["Between the 5 lines, there are...", "4 spaces", ["5 spaces", "6 spaces"]],
      ["A note sitting inside a gap is in a...", "space", ["line", "clef"]],
      ["Staff lines are counted from the...", "bottom up", ["top down", "side to side"]]
    ], ["Picture five straight lines, one above the other.", "There are 5 lines, and the gaps between them are the spaces. There is one fewer gap than lines.", "Example: with 3 lines there would be 2 gaps. Staff is 5 lines. Now do yours."]),

    L("Lines and spaces", [
      ["Counting lines", "1-2-3-4-5", "We number the lines from the bottom: line 1 is the bottom line."],
      ["Counting spaces", "1-2-3-4", "Spaces are numbered from the bottom too. Space 1 is between lines 1 and 2."],
      ["Look closely", "🔍", "Notes get higher as they go up the staff."]
    ], [
      ["Which line is the bottom one?", "Line 1", ["Line 3", "Line 5"]],
      ["Which line is the top one?", "Line 5", ["Line 1", "Line 3"]],
      ["The middle line is line...", "3", ["1", "5"]],
      ["Which space is at the very top?", "Space 4", ["Space 1", "Space 5"]],
      ["The first space is between lines...", "1 and 2", ["4 and 5", "2 and 4"]],
      ["Notes higher on the staff sound...", "higher", ["lower", "quieter"]],
      ["Notes lower on the staff sound...", "lower", ["higher", "louder"]],
      ["The very first space starts where?", "Above line 1", ["Above line 5", "Below line 1"]]
    ], ["We always count from the bottom of the staff, going up.", "The bottom line is first. Line 5 is at the top.", "Example: the second line from the bottom is line 2. Now do yours."]),

    L("The treble clef", [
      ["A clef", "𝄞", "A <b>clef</b> is a sign at the start of the staff that tells which notes are which."],
      ["Treble clef", "treble clef", "The <b>treble clef</b> is used for higher notes, like the right hand on the piano or a flute."],
      ["Bass clef", "bass clef", "The <b>bass clef</b> is used for lower notes, like a tuba or the left hand on a piano."]
    ], [
      ["A sign at the start of a staff that names the notes is a...", "clef", ["cleft", "cloud"]],
      ["Which clef is for higher notes?", "Treble clef", ["Bass clef", "Moon clef"]],
      ["Which clef is for lower notes?", "Bass clef", ["Treble clef", "Sun clef"]],
      ["A flute reads music in the...", "treble clef", ["bass clef", "blue clef"]],
      ["A tuba usually reads the...", "bass clef", ["treble clef", "high clef only"]],
      ["Treble means...", "higher notes", ["lower notes", "no notes"]],
      ["Bass means...", "lower notes", ["higher notes", "loud notes"]],
      ["The piano's right hand usually reads the...", "treble clef", ["bass clef", "no clef"]]
    ], ["A clef is like a map key for the staff.", "Treble = high. Bass = low. Think of a baby bird (high) and a big bear (low).", "Example: a bass guitar reads low notes, so it uses the bass clef. Now do yours."]),

    L("Notes on the lines", [
      ["Line notes", "E G B D F", "In the treble clef, the notes on the lines are <b>E, G, B, D, F</b> from the bottom up."],
      ["A memory trick", "Every Good Boy Does Fine", "<b>E</b>very <b>G</b>ood <b>B</b>oy <b>D</b>oes <b>F</b>ine."],
      ["Use it", "🧠", "Count the line from the bottom, then use the saying."]
    ], [
      ["In the treble clef, the bottom line is note...", "E", ["G", "F"]],
      ["In the treble clef, the top line is note...", "F", ["E", "D"]],
      ["The 2nd line is note...", "G", ["E", "B"]],
      ["The 3rd line is note...", "B", ["D", "F"]],
      ["The 4th line is note...", "D", ["B", "G"]],
      ["In \"Every Good Boy Does Fine\", \"Boy\" stands for note...", "B", ["D", "G"]],
      ["In \"Every Good Boy Does Fine\", \"Fine\" stands for note...", "F", ["E", "B"]],
      ["In \"Every Good Boy Does Fine\", \"Every\" stands for note...", "E", ["G", "F"]]
    ], ["Use the saying: Every Good Boy Does Fine.", "The saying's first letters are the notes on the lines, from the bottom line up.", "Example: the 1st word, 'Every', is for the 1st line, E. Now count to yours."]),

    L("Notes in the spaces", [
      ["Space notes", "F A C E", "In the treble clef, the notes in the spaces are <b>F, A, C, E</b> from the bottom up."],
      ["A word!", "FACE", "They spell the word <b>FACE</b>. That is easy to remember."],
      ["Use it", "😊", "Count the space from the bottom and use the word FACE."]
    ], [
      ["In the treble clef, the bottom space is note...", "F", ["A", "E"]],
      ["The 2nd space is note...", "A", ["F", "C"]],
      ["The 3rd space is note...", "C", ["A", "E"]],
      ["The top space is note...", "E", ["F", "C"]],
      ["The space notes spell the word...", "FACE", ["CAFE", "BEAD"]],
      ["How many spaces have notes in FACE?", "4", ["3", "5"]],
      ["Which note is in the 3rd space?", "C", ["F", "E"]],
      ["Which note is in the 1st space?", "F", ["A", "C"]]
    ], ["Remember the word that the space notes spell.", "The word FACE gives the notes from the bottom space up: F, A, C, E.", "Example: the 2nd letter of FACE is A, so the 2nd space is A. Now do yours."]),

    F("The music alphabet", [
      ["Seven letters", "A B C D E F G", "Notes use the letters A to G, then repeat."],
      ["Wrap around", "G → A", "After G comes A again."],
      ["Step by step", "🪜", "Each next letter is one step higher."]
    ], notesNext),

    F("Note in the middle", [
      ["Skipping a note", "C _ E", "To find the note between two, say the letters in order."],
      ["Example", "C D E", "Between C and E is D."],
      ["Wrap around", "F G A", "Between F and A is G."]
    ], notesBetween),

    F("Do, re, mi", [
      ["Solfege", "do re mi fa sol la ti do", "These singing words go up like a ladder."],
      ["Climb the steps", "🪜", "Each word is one note higher than the one before."],
      ["Sing it", "🎤", "Sing the whole ladder up and then back down."]
    ], solNext),

    L("Soft and loud signs", [
      ["Signs for volume", "p  mp  mf  f", "Music uses little letters for how loud to play."],
      ["Meanings", "p = soft · f = loud", "<b>p</b> (piano) means soft. <b>f</b> (forte) means loud. <b>mp</b> is medium soft and <b>mf</b> is medium loud."],
      ["Mezzo", "mezzo = medium", "<b>Mezzo</b> means medium."]
    ], [
      ["The letter p means...", "soft", ["loud", "fast"]],
      ["The letter f means...", "loud", ["soft", "slow"]],
      ["mp means...", "medium soft", ["very loud", "very fast"]],
      ["mf means...", "medium loud", ["very soft", "very slow"]],
      ["Which is the softest?", "p", ["f", "mf"]],
      ["Which is the loudest?", "f", ["p", "mp"]],
      ["Mezzo means...", "medium", ["huge", "tiny"]],
      ["Forte is a word that means...", "loud", ["soft", "fast"]]
    ], ["Letters stand for Italian words. p is piano and f is forte.", "p = soft, f = loud, m = medium. Put them together for in-between.", "Example: mf is medium loud, and mp is medium soft. Now do yours."]),

    L("Getting louder", [
      ["Crescendo", "&lt;", "<b>Crescendo</b> means getting louder. The sign looks like a mouth opening wider: &lt;"],
      ["Decrescendo", "&gt;", "<b>Decrescendo</b> (or diminuendo) means getting softer. The sign looks like a mouth closing: &gt;"],
      ["Use your voice", "📈 📉", "Sing 'la' and make it grow louder, then softer."]
    ], [
      ["What does crescendo mean?", "Getting louder", ["Getting softer", "Getting faster"]],
      ["What does decrescendo mean?", "Getting softer", ["Getting louder", "Getting higher"]],
      ["A sound growing from quiet to loud is a...", "crescendo", ["decrescendo", "rest"]],
      ["A sound fading from loud to quiet is a...", "decrescendo", ["crescendo", "rest"]],
      ["Thunder rolling closer gets louder. This is like a...", "crescendo", ["decrescendo", "rest"], "⛈️"],
      ["A train driving away gets softer. This is like a...", "decrescendo", ["crescendo", "rest"], "🚂"],
      ["Which sign opens wider, like a growing mouth?", "The sign that opens wider", ["The sign that closes", "A flat line"]],
      ["Which sign narrows, like a closing mouth?", "The sign that closes", ["The sign that opens wider", "A flat line"]]
    ], ["Think of whether the sound grows or fades.", "Crescendo grows (like a cr-eeping up). Decrescendo shrinks.", "Example: a siren coming toward you gets louder, which is a crescendo. Now do yours."]),

    L("Tempo words", [
      ["Tempo", "⏱️", "<b>Tempo</b> is how fast or slow the music goes."],
      ["Words", "largo · andante · allegro · presto", "<b>Largo</b> is very slow. <b>Andante</b> is walking speed. <b>Allegro</b> is fast and lively. <b>Presto</b> is very fast."],
      ["Order", "slow → fast", "From slowest to fastest: largo, andante, allegro, presto."]
    ], [
      ["Which word means very slow?", "Largo", ["Presto", "Allegro"]],
      ["Which word means very fast?", "Presto", ["Largo", "Andante"]],
      ["Which word means fast and lively?", "Allegro", ["Largo", "Andante"]],
      ["Which word means walking speed?", "Andante", ["Presto", "Allegro"], "🚶"],
      ["Which is slower: andante or allegro?", "Andante", ["Allegro", "They are the same"]],
      ["Which is faster: allegro or largo?", "Allegro", ["Largo", "They are the same"]],
      ["Which tempo fits a sleepy turtle?", "Largo", ["Presto", "Allegro"], "🐢"],
      ["Which tempo fits a racing rabbit?", "Presto", ["Largo", "Andante"], "🐇"]
    ], ["These Italian words are all about speed.", "Order from slow to fast: largo, andante, allegro, presto.", "Example: adagio means slow, so it is slower than allegro. Now do yours."]),

    L("The orchestra", [
      ["A big group", "🎼", "An <b>orchestra</b> is a big group of musicians. It has strings, woodwinds, brass and percussion."],
      ["The conductor", "🪄", "The <b>conductor</b> stands in front and uses a thin stick called a <b>baton</b> to keep everyone together."],
      ["The audience", "🧑‍🤝‍🧑", "The audience listens quietly and claps at the end."]
    ], [
      ["Who leads the orchestra?", "The conductor", ["The audience", "The baker"]],
      ["What does a conductor hold?", "A baton", ["A bat", "A flute"]],
      ["Which family do violins belong to?", "Strings", ["Brass", "Woodwinds"], "🎻"],
      ["Which family does a trumpet belong to?", "Brass", ["Strings", "Woodwinds"], "🎺"],
      ["Which family does a flute belong to?", "Woodwinds", ["Brass", "Strings"]],
      ["Which family does a snare drum belong to?", "Percussion", ["Strings", "Brass"], "🥁"],
      ["How many instrument families are in an orchestra?", "4", ["2", "7"]],
      ["The people who listen to the orchestra are the...", "audience", ["conductors", "strings"]]
    ], ["Think about the people and instruments in a big concert.", "There are four families. The conductor leads them with a baton.", "Example: a cello is strings, and a tuba is brass. Now do yours."]),

    F("Count the rhythm", [
      ["Beats in a rhythm", "ta ti-ti ta-a", "Count ta (1), ti-ti (1), sh (1, quiet) and ta-a (2)."],
      ["Add them", "1 + 1 + 2 = 4", "Add up all the beats to find the total."],
      ["Check", "👏", "Clap the rhythm to see if it fits your count."]
    ], beatsIn(["ta", "ti-ti", "sh", "ta-a"], [3, 5])),

    L("Rhythm patterns", [
      ["A rhythm pattern", "ta ti-ti ta ti-ti", "Patterns repeat. Find the repeating part and keep going."],
      ["Longer patterns", "ta ta ti-ti ta ta ti-ti", "Some patterns have three sounds that repeat."],
      ["Say it out loud", "🗣️", "Speak the pattern to find what comes next."]
    ], [
      ["What comes next? ta ti-ti ta ti-ti ta ___", "ti-ti", ["ta", "sh"]],
      ["What comes next? ta ta ti-ti ta ta ti-ti ta ___", "ta", ["ti-ti", "sh"]],
      ["What comes next? ta sh ta sh ta ___", "sh", ["ta", "ti-ti"]],
      ["What comes next? ti-ti ta ti-ti ta ti-ti ___", "ta", ["ti-ti", "sh"]],
      ["What comes next? ta ta sh ta ta sh ta ___", "ta", ["sh", "ti-ti"]],
      ["What comes next? ta-a ta ta ta-a ta ta ta-a ___", "ta", ["ta-a", "sh"]],
      ["What comes next? ti-ti ti-ti ta ti-ti ti-ti ta ti-ti ___", "ti-ti", ["ta", "sh"]],
      ["What comes next? sh ta sh ta sh ___", "ta", ["sh", "ti-ti"]]
    ], ["Say the pattern out loud from the start.", "Find the part that repeats (it may have 2 or 3 sounds). Where are you in it?", "Example: ta ta ti-ti ta ta ti-ti ta ___ . The group is 'ta ta ti-ti', and we are on its second ta, so ti-ti is next. Now do yours."]),

    L("Kinds of songs", [
      ["Songs for jobs", "🎶", "Different songs are made for different times."],
      ["Examples", "🌙 🥁 💃", "A <b>lullaby</b> helps babies sleep. A <b>march</b> has a strong steady beat. A <b>waltz</b> is a dance that counts in threes."],
      ["Others", "🇺🇸", "A <b>national anthem</b> is a song for a whole country."]
    ], [
      ["Which kind of song helps a baby fall asleep?", "Lullaby", ["March", "Siren"], "👶"],
      ["Which kind of music has a strong steady beat for walking together?", "March", ["Lullaby", "Whisper"], "🥁"],
      ["A waltz is counted in...", "threes", ["twos", "tens"], "💃"],
      ["A song for a whole country is a...", "national anthem", ["lullaby", "waltz"]],
      ["A \"happy birthday\" song is sung at a...", "birthday party", ["library", "bedtime"], "🎂"],
      ["A song that rocks a baby gently is a...", "lullaby", ["march", "drum solo"]],
      ["Marching bands play a...", "march", ["lullaby", "bedtime song"], "🎺"],
      ["A dance that counts 1-2-3, 1-2-3 is a...", "waltz", ["march", "lullaby"]]
    ], ["Think about when each kind of song is used.", "Lullabies: sleep. Marches: walking together. Waltzes: dancing in threes. Anthems: countries.", "Example: a bedtime song is soft and slow, so it is a lullaby. Now do yours."])
  ];
  l3.push(
    MIX("Mixed practice", l3[0], l3[3], l3[6], l3[9]),
    MIX("Level 3 Challenge", l3[1], l3[2], l3[7], l3[10], l3[13], l3[15])
  );

  // Reorder/fix: lessons 19 and 20 are mixed practice and the challenge.
  return { 1: l1, 2: l2, 3: l3 };
})();
