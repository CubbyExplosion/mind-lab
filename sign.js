// Mind Lab Sign Language (American Sign Language). Levels 1-3, 20 lessons each.
// Signs are described in words (no videos). Only signs we are very sure about are included.
const SIGN_LEVELS = (() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  // pairs lesson: rows are "term::description::emoji"
  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which one matches?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which one fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this one?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly. Try it with your own hands!" },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  // scenario lesson: rows are "question|right|wrong|wrong(|wrong)"
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  // build a level: 18 lessons + mixed practice + challenge
  const lvl = (n, ls) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.ceil(arr.length / 4);
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[1])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", [ms[2], ms[3], ms[4], ms[5], ms[6]]), mix(`Level ${n} Challenge`, ms)];
  };

  // ---------- sign descriptions ----------
  const QD = { qd: "Which word is this sign?", qt: "How do you sign this word?" };
  const QL = { qd: "Which letter is this hand?", qt: "What does the hand for this letter look like?" };
  const G = {
    hello: "hello::Flat hand at your forehead, then move it out and away::👋",
    goodbye: "goodbye::Open hand waves::✋",
    yes: "yes::Fist nods up and down like a head::✊",
    no: "no::Pointer and middle finger tap your thumb, like a beak closing::🤏",
    please: "please::Flat hand rubs a circle on your chest::🙏",
    thanks: "thank you::Flat fingertips touch your chin, then move forward::😊",
    sorry: "sorry::Fist rubs a circle on your chest::😔",
    help: "help::Fist with thumb up sits on a flat palm, and both lift up::🆘",
    eat: "eat::Pinched fingertips tap your mouth::🍽️",
    drink: "drink::Hand shaped like it holds a cup tips toward your mouth::🥤",
    water: "water::Three fingers (a W) tap your chin::💧",
    more: "more::Both hands pinch fingertips together and tap::➕",
    mom: "mom::Open hand, thumb taps your chin::👩",
    dad: "dad::Open hand, thumb taps your forehead::👨",
    baby: "baby::Rock your arms like you hold a baby::👶",
    friend: "friend::Hook your pointer fingers together, then switch::🤝",
    stop: "stop::One flat hand chops down onto the other palm::🛑",
    ily: "I love you::Thumb, pointer finger and pinky stand up::🤟",
    see: "see::Two-finger V starts at your eyes and moves out::👀",
    book: "book::Palms together, then open like a book::📖",
    school: "school::Clap your hands two times::🏫",
    play: "play::Both hands make Y shapes and shake::🎮",
    cat: "cat::Pinch fingers at your cheek and pull out like whiskers::🐱",
    dog: "dog::Pat your leg and snap your fingers::🐶",
    good: "good::Flat hand moves from your chin down into your other hand::👍",
    happy: "happy::Flat hands brush up your chest again and again::😊",
    sad: "sad::Open hands in front of your face move down::😢",
    love: "love::Cross your fists over your heart::❤️",
    think: "think::Pointer finger touches your forehead::🤔",
    me: "me::Point to your chest::🙋",
    you: "you::Point to the other person::👉",
    come: "come::Both pointer fingers curl toward you::🫴",
    where: "where::Pointer finger up wags side to side::🗺️",
    milk: "milk::Fist squeezes open and closed, like milking::🥛",
    cold: "cold::Fists shake, like shivering::🥶",
    bathroom: "bathroom::A T hand (thumb between pointer and middle) shakes::🚻",
    finished: "finished::Open hands with palms toward you, twist so palms face down::✅",
    name: "name::Two H hands (pointer and middle fingers) tap, one across the other::🏷️"
  };
  const g = (...ks) => ks.map(k => G[k]);
  const NUMS = ["1::Pointer finger up", "2::Pointer and middle finger up", "3::Thumb, pointer and middle finger up", "4::Four fingers up, thumb tucked in", "5::All five fingers open"];
  const NUMS2 = ["6::Thumb touches pinky, other three fingers up", "7::Thumb touches ring finger, other three fingers up", "8::Thumb touches middle finger, other three fingers up", "9::Thumb touches pointer finger, other three fingers up"];
  const LET = {
    A: "Letter A::Fist with the thumb along the side", B: "Letter B::Flat hand, fingers up, thumb across the palm", C: "Letter C::Curved hand shaped like a C",
    D: "Letter D::Pointer finger up, other fingers and thumb touch in a small circle", F: "Letter F::Thumb and pointer touch in a circle, three fingers up",
    G: "Letter G::Pointer finger and thumb point sideways", H: "Letter H::Pointer and middle fingers point sideways together", I: "Letter I::Pinky finger up, other fingers in a fist",
    J: "Letter J::Pinky up, then draw a J in the air", L: "Letter L::Pointer finger up and thumb out, like an L", O: "Letter O::Fingers and thumb curve to touch, like an O",
    S: "Letter S::Fist with the thumb across the front of the fingers", U: "Letter U::Pointer and middle fingers up, held together", V: "Letter V::Pointer and middle fingers up and spread apart",
    W: "Letter W::Pointer, middle and ring fingers up and spread", X: "Letter X::Pointer finger bent like a hook", Y: "Letter Y::Thumb and pinky out, other fingers curled", Z: "Letter Z::Pointer finger draws a Z in the air"
  };
  const l = (...ks) => ks.map(k => LET[k]);

  // how many handshapes to fingerspell a word
  const spellCount = () => {
    const make = () => {
      const w = pick(["hello", "apple", "mom", "dad", "friend", "love", "school", "happy", "tree", "moon", "book", "smile"]);
      return {
        text: `You fingerspell the word <b>${w}</b>. How many handshapes do you make?`, answer: w.length,
        hints: ["You make one handshape for each letter.", "Count the letters in the word, one at a time.", "Example: the word sun has 3 letters, so you make 3 handshapes. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Fingerspelling", v: "🔤", t: "Fingerspelling means you spell a word with your hand, one letter at a time." },
      { h: "One letter, one handshape", v: "C-A-T = 3", t: "The word <b>cat</b> has three letters, so you make three handshapes: C, then A, then T." },
      { h: "Tip", v: "✋", t: "Hold your spelling hand near your shoulder with the palm facing the person watching. Keep it smooth and steady." }
    ];
    return { title: "How many handshapes?", make };
  };

  // ================= LEVEL 1 =================
  const L1 = [
    SC("What is sign language?", "🤟", "Sign language is a language you <b>see</b>. People use their hands, face and body to talk, not their voice. Many Deaf people use it.", "Think: what parts of your body does a signer use, and what do you use to understand them?", "A signer says hello with a hand near the forehead, and a friend watches with their eyes.", [
      "Sign language is a language you can...|See|Only smell|Only taste",
      "Which parts of your body do you use to sign?|Hands, face and body|Only your feet|Only your ears",
      "Who often uses sign language?|Deaf people|Only birds|Only robots",
      "Do you use your voice to sign?|No, you use hands and face|Yes, you must yell|Yes, you must sing",
      "Is sign language a real language?|Yes, it is a real language|No, it is just waving|No, it is only a game",
      "What do you use to understand a signer?|Your eyes|Your nose|Your elbow",
      "Can hearing people learn sign language?|Yes, anyone can learn|No, never|Only grown-ups can"
    ]),
    SC("Hands, eyes and faces", "👀", "To sign you use your hands in the space in front of you. To understand, you watch the person's hands and face.", "Remember: the face shows feelings and is part of the message. Watching is how you listen.", "When a friend signs to you, you look at their face and their hands.", [
      "When you watch someone sign, where do you look?|At their face and hands|At the floor|At the ceiling",
      "Your face can show...|If you feel happy or sad|Only your shoe size|Nothing at all",
      "Which face shows a happy feeling?|A big smile 😊|A frown 😠|A sleepy face 😴",
      "Signers move their hands...|In the space in front of them|Behind a wall|Only under a table",
      "If a friend signs to you, you should...|Watch them and be patient|Look away|Walk off",
      "Your eyes are important because...|You watch the signs|You smell the signs|You taste the signs",
      "A sign is made with...|Handshape and movement|Only a loud noise|Only a song"
    ]),
    PL("Hello and goodbye", "👋", "Let's learn four signs. Hello, goodbye, yes and no are used every day.", "Try each sign in the air. Use your face too: a smile with hello!", g("hello", "goodbye", "yes", "no"), QD),
    PL("Please and thank you", "🙏", "Polite signs are kind and useful. Here are four to learn.", "Polite signs are made near your chest and chin. Smile when you sign them!", g("please", "thanks", "sorry", "help"), QD),
    PL("Eat, drink, more", "🥤", "These signs are about food and drinks.", "The eat sign and the more sign both use pinched fingertips.", g("eat", "drink", "water", "more"), QD),
    PL("Family and friends", "👨‍👩‍👧", "Mom and dad signs both use the thumb of an open hand. The place on your face is different.", "Mom is on the chin. Dad is on the forehead. Say it in your head: Mom low, Dad high.", g("mom", "dad", "baby", "friend"), QD),
    PL("Stop, love, see, book", "🛑", "Here are four more signs to try with your hands.", "The I love you sign puts three letters together: I, L and Y.", g("stop", "ily", "see", "book"), QD),
    PL("School and play", "🏫", "Signs for school, play, and two favorite pets.", "Say the word as you sign it, in your head.", g("school", "play", "cat", "dog"), QD),
    PL("Numbers 1 to 5", "🖐️", "In ASL you show numbers with your fingers. Show your number with your palm facing the person who watches.", "For 3, ASL uses the thumb, pointer and middle finger. Try it!", NUMS, { qd: "Which number is this hand?", qt: "How do you show this number?" }),
    PL("Letters that look like letters", "🔤", "Some handshapes look like their letters. A is a fist, C is curved like a C, and L makes an L.", "Look for the shape of the letter in your hand.", l("A", "B", "C", "L", "O"), QL),
    PL("More letters", "🔡", "Here are more letters of the fingerspelling alphabet.", "For W, think of the letter W with three points. For V, think of a peace sign.", l("I", "S", "U", "V", "Y"), QL),
    PL("Sign detective", "🕵️", "Time to match signs to their words. Think about each description.", "Picture the sign in your hands before you choose.", g("hello", "goodbye", "yes", "no", "please", "thanks", "sorry", "help", "eat", "drink", "water", "more", "mom", "dad", "baby", "friend", "stop", "ily", "see", "book", "school", "play", "cat", "dog"), QD),
    SC("Feelings on your face", "😊", "Your face is part of signing. A smile, a frown or wide eyes can change what your signs mean.", "Match the face to the feeling it shows.", "A big smile with the hello sign says 'I am glad to see you!'", [
      "A big smile shows you feel...|Happy|Angry|Sleepy",
      "A frown shows you feel...|Sad or upset|Very happy|Excited to play",
      "Wide open eyes can show you are...|Surprised|Bored|Asleep",
      "When you sign 'thank you', your face should look...|Kind and friendly|Grumpy|Asleep",
      "Why does your face matter when you sign?|It is part of the message|It does not matter|It is only for photos",
      "Which face goes with 'I am sorry'?|A sad, gentle face|A silly laughing face|An angry face",
      "Which face goes with 'I love you'?|A warm smile|A scowl|A yawn"
    ]),
    SC("Get someone's attention", "👋", "A Deaf person cannot hear you call. So we get their attention in a gentle way.", "Gentle ways: wave where they can see you, or tap their shoulder lightly.", "Wave your hand in front of your friend where they can see it.", [
      "A Deaf friend is looking away. What is a kind way to get their attention?|Wave where they can see|Yell loudly|Throw a ball at them",
      "Another gentle way to get attention is to...|Tap their shoulder lightly|Pull their hair|Poke their face",
      "Does yelling help a Deaf person hear you?|No, it does not|Yes, always|Yes, if you jump",
      "You want to talk to a Deaf friend across the room. You can...|Wave and wait for them to look|Turn off every light|Hide",
      "Which is NOT kind?|Grabbing their hands|Waving gently|Tapping a shoulder lightly",
      "After you get their attention, you should...|Face them and sign or talk|Run away|Look at the floor"
    ]),
    SC("Face the person", "🧑‍🤝‍🧑", "When you talk with a Deaf person, you face them so they can see your face and hands.", "Remember: you face them, you look at them, and you keep your hands and mouth clear.", "Turn to face your friend before you start signing.", [
      "When you talk to a Deaf person, you should...|Face them|Turn your back|Walk away while talking",
      "It helps to keep your hands and face...|Clear and visible|Hidden|Covered by a book",
      "Where should you look when a Deaf friend signs?|At them|At the floor|At the wall",
      "Why do you face a Deaf friend?|So they can see you|So they can smell you|So you can hide",
      "If you cover your mouth and face while talking, a Deaf friend may...|Not understand you|Hear you louder|Smile",
      "A good place to stand is...|Where they can see you|Behind them|Out of the room"
    ]),
    SC("Be patient and kind", "🕊️", "Talking with a new language takes time. Be patient and kind. Use gestures, a smile, or paper and a pencil if you need help.", "Being patient means you wait and try again. Being kind means you never laugh or tease.", "If you do not understand a sign, smile and ask your friend to show it again slowly.", [
      "You do not understand a sign. What do you do?|Ask to see it again slowly|Laugh|Walk away",
      "Being patient means...|Waiting and trying again|Getting upset fast|Giving up",
      "If you cannot sign something, you can...|Point, gesture or write it|Shout|Ignore your friend",
      "Which is unkind?|Laughing at someone's signing|Smiling|Waiting patiently",
      "A friend signs slowly. You should...|Wait and watch|Hurry them|Turn away",
      "When a signer makes a mistake you should be...|Kind and helpful|Mean|Loud"
    ]),
    PL("Match the letter", "🔤", "Can you match each hand to the letter it makes?", "Think about the shape of the fingers and the thumb.", l("A", "B", "C", "I", "L", "O", "S", "U", "V", "Y"), QL),
    SC("Use signs with friends", "💬", "You can use signs to talk with Deaf friends, and also when it is too noisy for voices. Signs are for sharing, not for hiding things.", "Think: when is a sign useful? When voices are hard to hear or someone is Deaf.", "In a loud place, a wave and a thumbs-up help you share a message.", [
      "Your friend is Deaf. What helps you talk?|Signs and your face|Shouting|Whispering",
      "A very noisy room makes voices hard to hear. You could...|Use signs or gestures|Talk quietly in a corner only|Walk out",
      "Signs are for...|Sharing and talking|Hiding from people|Making fun of people",
      "Which is a good use of signs?|Saying hello to a Deaf friend|Teasing someone|Ignoring a friend",
      "If a Deaf friend teaches you a sign, you should say...|Thank you!|That's silly|No way",
      "What can you do to learn more signs?|Practice with a friend or teacher|Never try|Copy without asking"
    ])
  ];

  // ================= LEVEL 2 =================
  const L2 = [
    SC("Sign languages of the world", "🌍", "People in different countries use different sign languages. American Sign Language, called ASL, is used in the United States and much of Canada.", "ASL is one sign language. Other countries have their own, just like different spoken languages.", "British Sign Language is a different language from ASL.", [
      "What does ASL stand for?|American Sign Language|All Signs Love|Animal Sign Language",
      "Is ASL used in the United States?|Yes|No, never|Only on the moon",
      "Do all countries use the same sign language?|No, there are many|Yes, only one|Nobody signs",
      "British Sign Language is...|A different language from ASL|The same as ASL|A kind of tea",
      "Which is a sign language?|ASL|A game board|A tune",
      "Can two Deaf people from different countries sign exactly the same?|Not always|Always|Never talk",
      "Sign languages have...|Their own rules|No rules|Only music"
    ]),
    SC("Faces tell feelings", "🙂", "In sign language, your face is part of the grammar. Your eyebrows, eyes and mouth show feelings and also ask questions.", "Eyebrows up can show a yes or no question. Smiles show happy. Frowns show sad.", "To ask 'Are you hungry?' in ASL, you raise your eyebrows while you sign.", [
      "Raised eyebrows can show a...|Yes or no question|Sleepy feeling|Dance|",
      "A big smile with a sign makes the message...|Happy|Angry|Silent",
      "Which part of your body shows feelings when you sign?|Your face|Your knee|Your ankle",
      "Why do we use our faces when we sign?|It is part of the language|It is only for fun|It is not needed",
      "If someone signs with a serious face, they may be...|Serious or sad|Joking|Sleeping",
      "To sign 'wow!' your face could show...|Surprise|Boredom|Sleep"
    ].map(r => r.replace(/\|$/, ""))),
    PL("Good, think, me, you", "💭", "These four signs are easy to start with.", "To sign me or you, you simply point. Pointing at a person is normal in ASL.", g("good", "think", "me", "you"), QD),
    PL("Happy, sad, love, cold", "😊", "Here are four signs for feelings.", "Make your face match the sign! A sad sign needs a sad face.", g("happy", "sad", "love", "cold"), QD),
    PL("Come, where, bathroom, milk", "🚻", "More useful signs for every day.", "For where, keep your pointer finger up and wag it gently.", g("come", "where", "bathroom", "milk"), QD),
    PL("Numbers 6 to 9", "🔢", "For 6, 7, 8 and 9 you touch your thumb to a finger, and the other three fingers stay up.", "6 = pinky, 7 = ring finger, 8 = middle finger, 9 = pointer. Touch the thumb to that finger.", NUMS2, { qd: "Which number is this hand?", qt: "How do you show this number?" }),
    SC("Show a number", "✋", "Practice showing numbers with your fingers. Face your palm toward the person who is watching.", "Count the fingers that are up. Check what the thumb does.", "For 2 you hold up two fingers: your pointer and your middle finger.", [
      "Which hand shows 2?|Pointer and middle finger up|Only the thumb up|A fist",
      "Which hand shows 5?|All five fingers open|A fist|Only the pinky",
      "Which hand shows 1?|One pointer finger up|Five fingers open|A fist",
      "Which hand shows 3 in ASL?|Thumb, pointer and middle finger up|Pinky, ring and middle finger up|A fist with a thumb up",
      "Which hand shows 4?|Four fingers up, thumb tucked in|Only two fingers up|All fingers curled",
      "To show 1, 2, 3, 4 or 5, which way does your palm usually face?|Toward the person watching|Toward the floor only|Toward your face only"
    ]),
    SC("Fingerspelling tips", "🔤", "Fingerspelling is spelling a word with your fingers, one letter at a time. We use it for names and words that do not have a sign.", "Good fingerspelling: hand near your shoulder, palm toward the watcher, smooth and steady.", "To fingerspell the name Sam, you sign S, then A, then M, one after the other.", [
      "Fingerspelling is...|Spelling with your fingers|Spelling with your feet|Writing on paper",
      "When do we often use fingerspelling?|For names|For every word|Never",
      "Where do you hold your hand to fingerspell?|Near your shoulder|Behind your back|By your toes",
      "Which way does your palm face?|Toward the watcher|Toward the floor|Toward the ceiling",
      "How should fingerspelling move?|Smooth and steady|Super fast and messy|Never moving",
      "You fingerspell the letters...|In order, one at a time|All at once|Backwards"
    ]),
    PL("Letters D, F, G, H", "🔡", "Four more letters for your fingerspelling alphabet.", "G and H both point sideways: G uses a pointer and a thumb, H uses two fingers.", l("D", "F", "G", "H"), QL),
    PL("Letters I, J, X, Z", "✍️", "J and Z are special: you draw them in the air!", "For J, start with the I handshape and draw a J. For Z, draw a Z with your pointer finger.", l("I", "J", "X", "Z"), QL),
    PL("Letters S, U, V, W, Y", "🔠", "Let's practice five letters you know.", "U keeps two fingers together. V spreads them apart.", l("S", "U", "V", "W", "Y"), QL),
    SC("Spell short words", "🐱", "To fingerspell a word, you sign each letter in order. For cat, you sign C, A and T.", "Read the word from left to right. Each letter gets one handshape.", "The word 'sun' is spelled S, U, N, in that order.", [
      "To spell cat you sign...|C, A, T|T, A, C|A, C, T",
      "To spell dog you sign...|D, O, G|G, O, D|O, D, G",
      "To spell mom you sign...|M, O, M|M, M, O|O, M, M",
      "To spell sun you sign...|S, U, N|N, U, S|U, S, N",
      "To spell sit you sign...|S, I, T|T, I, S|I, S, T",
      "To spell hat you sign...|H, A, T|T, A, H|A, H, T",
      "To spell bus you sign...|B, U, S|S, U, B|U, B, S"
    ]),
    SC("Get a Deaf person's attention", "👋", "There are polite ways to get a Deaf person's attention. Never grab, pull or shout.", "Choose the gentle, safe way: wave, or a light tap on the shoulder.", "Wave where your friend can see, and wait for them to look at you.", [
      "A Deaf classmate is busy reading. How do you get attention?|Wave where they can see you|Shout in their ear|Grab their arm hard",
      "A light tap on the shoulder is...|A gentle way to get attention|Rude|Dangerous",
      "A Deaf friend is across the room. You can...|Wave and wait|Throw something|Whisper",
      "Which is NOT polite?|Pulling their arm|Waving gently|Tapping their shoulder lightly",
      "After a tap or a wave, you should...|Wait for them to look at you|Walk away|Turn around",
      "Flicking the lights on and off a few times...|Can get attention in a room|Is always rude|Is a secret code"
    ]),
    SC("Talking with a Deaf person", "🗣️", "Face the person and keep your face visible. Speak normally and clearly if the person reads lips. Do not exaggerate or shout.", "Face them, look at them, keep your hands away from your mouth, and be patient.", "A kind speaker faces the person, talks clearly, and waits patiently.", [
      "When you talk to a Deaf friend you should...|Face them and look at them|Turn away|Look at your shoes",
      "Should you shout at a Deaf person?|No|Yes, as loud as you can|Yes, in their ear",
      "If an interpreter is helping, who do you look at?|The Deaf person|Only the interpreter|The floor",
      "If your friend does not understand you, you can...|Try again or write it down|Give up|Get angry",
      "Covering your mouth while talking...|Makes it harder to understand|Helps|Makes it louder",
      "A kind speaker is...|Patient|Impatient|Rude"
    ]),
    PL("Sign detective 2", "🕵️", "Match more signs to their words.", "Picture the sign in your hands before you answer.", g("good", "think", "me", "you", "happy", "sad", "love", "cold", "come", "where", "bathroom", "milk", "hello", "thanks", "please", "eat", "drink", "mom", "dad", "friend"), QD),
    SC("Deaf applause", "👏", "Deaf people often clap by raising their hands and waving or shaking them in the air. It is silent and easy to see. Many Deaf people love that way of clapping.", "Clapping that you can see is better than clapping that you can only hear.", "At a Deaf school show, the whole room waves their hands high to say 'bravo!'", [
      "How do many Deaf people applaud?|They raise hands and shake them|They stay frozen|They only stomp",
      "Why is hand waving a good applause?|You can see it|It makes loud noise|It hurts",
      "Applause by waving hands is...|Silent and visible|Very loud|Not allowed",
      "If you go to a Deaf performance, what can you do?|Wave your raised hands|Stay silent and still|Run on stage",
      "Waving hands to cheer is a part of...|Deaf culture|A recipe|A math test",
      "What does waving mean at a show?|Great job!|Go away|Be quiet"
    ]),
    SC("Voice or signs?", "🤔", "You can choose how to talk. With a Deaf friend, use signs, gestures or writing. With a hearing friend, use your voice.", "Think about who you are talking to and what they can see or hear.", "To tell a Deaf friend 'dinner is ready', wave to get their attention and show 'eat'.", [
      "Your friend is Deaf. What is the best way to say hello?|Sign hello and smile|Whisper hello|Shout hello",
      "Your friend is hearing and in the next room. What works?|Use your voice|Use signs in the dark|Write a letter",
      "A Deaf friend does not know the sign you used. You can...|Write or gesture|Give up|Roll your eyes",
      "You are across a loud playground from a friend. You could...|Wave or use signs|Scream|Hide",
      "Which one works when voices cannot be heard?|Signs and gestures|Whispers|Humming",
      "Who can use signs?|Anybody who learns|Only teachers|Nobody"
    ]),
    SC("Be a good friend", "💛", "A good friend is patient, kind and ready to learn. Say thank you when someone teaches you.", "Friendly choices: smile, learn, ask politely, and never tease.", "Ask 'Can you teach me a sign?' and say thank you with the sign.", [
      "A Deaf classmate shows you a sign. You say...|Thank you!|I do not care|That is weird",
      "Which is a friendly thing to do?|Learn a few signs|Tease the signer|Ignore them",
      "What if you make a signing mistake?|Smile and try again|Quit forever|Blame others",
      "What can you ask a signing friend?|Can you teach me a sign?|Why are you strange?|Can you be quiet?",
      "Teasing someone for how they talk is...|Unkind|Funny|Smart",
      "Kind friends are...|Patient|Mean|Grumpy"
    ])
  ];

  // ================= LEVEL 3 =================
  const L3 = [
    SC("ASL is a real language", "📚", "ASL has its own grammar and word order. It is not English on the hands. It is a complete language that Deaf people use to share jokes, stories and ideas.", "A real language has its own rules, words and ways to ask questions.", "ASL puts ideas together in its own way, using hands, face and space.", [
      "Is ASL the same as English on the hands?|No, it has its own grammar|Yes, exactly|It has no words",
      "Can you tell a story in ASL?|Yes|No|Only a sentence",
      "ASL uses...|Hands, face and body|Only a voice|Only a pencil",
      "Is ASL a real language?|Yes|No|Only in a game",
      "Who uses ASL?|Many Deaf people and their friends|Only dogs|Nobody",
      "In ASL you can share...|Jokes, stories and ideas|Only numbers|Nothing",
      "ASL grammar uses face and space too.|True|False|Only on Tuesdays"
    ]),
    PL("Parts of a sign", "🧩", "Each sign is built from parts. Change one part and you can change the meaning.", "When you learn a sign, check all five parts: handshape, place, movement, palm direction and face.", [
      "Handshape::What shape your hand makes::✋", "Place::Where the sign is made, like chin or chest::📍", "Movement::How the hand moves, like tap or circle::🔄", "Palm direction::Which way your palm faces::🖐️", "Face::The look on your face, part of the message::😊"
    ], { qd: "Which part of a sign is this?", qt: "What is this part of a sign?" }),
    PL("Eyebrow questions", "❓", "In ASL your eyebrows help ask questions. The way you move them tells what kind of question it is.", "Think: yes or no question = eyebrows up. Who, what, where question = eyebrows down.", [
      "Eyebrows up::A yes or no question, like 'Are you hungry?'::🤨", "Eyebrows down::A who, what, where, when or why question::😠", "Where::The pointer finger wags side to side::🗺️", "Head nod::Often means yes::🙂"
    ], { qd: "Which one matches?", qt: "What does this mean?" }),
    PL("Introduce yourself", "🙋", "To introduce yourself you can use the signs hello, me, name and friend. Then you fingerspell your name.", "First hello, then your name, then smile!", g("hello", "me", "name", "friend"), QD),
    PL("Asking for help", "🆘", "These four signs are useful when you need something or want to be polite.", "Add a polite face: a gentle look makes please and help kinder.", g("please", "help", "finished", "stop"), QD),
    PL("Show a number", "🔢", "Let's mix the numbers you know.", "Check which fingers are up, and what the thumb does.", [...NUMS, ...NUMS2], { qd: "Which number is this hand?", qt: "How do you show this number?" }),
    PL("Alphabet: A to F", "🔤", "Let's review the first letters of the fingerspelling alphabet that you know.", "A is a fist, B is flat, C is curved, D has one finger up, F makes a circle.", l("A", "B", "C", "D", "F"), QL),
    PL("Alphabet: G to O", "🔡", "Now for the middle of the alphabet.", "J is drawn in the air. L and O look like their letters.", l("G", "H", "I", "J", "L", "O"), QL),
    PL("Alphabet: S to Z", "🔠", "The last letters you know.", "Z is drawn in the air. X is a hooked finger.", l("S", "U", "V", "W", "X", "Y", "Z"), QL),
    spellCount(),
    SC("Letters that look like their shape", "🔤", "Many letters look a bit like the printed letter. This helps you remember them.", "Picture the printed letter and match it to the hand.", "A hand curved like a half circle is the letter C.", [
      "Fist with the thumb along the side. Which letter?|A|O|L",
      "Curved hand like a C shape. Which letter?|C|L|S",
      "Fingers and thumb touch in a round shape. Which letter?|O|Y|A",
      "Thumb and pinky out. Which letter?|Y|L|W",
      "Pinky finger up. Which letter?|I|U|S",
      "Three fingers up and spread. Which letter?|W|V|U",
      "Pointer finger up and thumb out. Which letter?|L|I|C"
    ]),
    SC("When to fingerspell", "✋", "We fingerspell names, places and words with no sign. We do not fingerspell every word. Many words have a sign.", "Fingerspell when there is no sign you know, or for a name.", "To say your friend's name, Mia, you fingerspell M, I, A.", [
      "When do we often fingerspell?|For names|For every word all day|Never",
      "Do all words need fingerspelling?|No, many have signs|Yes, every word|Only the word 'the'",
      "Your name is Max. How do you tell it in ASL?|Fingerspell M, A, X|Hum it|Draw a circle",
      "If you do not know a sign, you can...|Fingerspell the word|Say nothing forever|Walk out",
      "Fingerspelling uses...|The letters of the alphabet|Numbers only|Colors only",
      "Which one is a good use of fingerspelling?|Spelling a city name|Saying hello|Saying yes"
    ]),
    SC("Deaf community", "🌐", "Many Deaf people are part of a Deaf community that has its own culture, stories and traditions. Being Deaf is not a bad thing. Deaf people can do everything except hear.", "Be respectful. Deaf people are smart, funny and capable, just like anyone.", "A Deaf club may share jokes and stories in ASL, and everyone is welcome.", [
      "Many Deaf people are part of...|A community with its own culture|No community|A secret club",
      "Being Deaf means...|A person cannot hear well or at all|They cannot think|They cannot play",
      "Deaf people can...|Do almost everything hearing people do|Do nothing|Only sit still",
      "How should we treat Deaf people?|With respect|With pity or teasing|By ignoring them",
      "Stories in a Deaf community are often shared in...|Sign language|Whispers|Silence",
      "Which is a respectful thing to say?|I would like to learn your language|You are strange|Why bother"
    ]),
    SC("Interpreters", "🧑‍🤝‍🧑", "An interpreter helps a Deaf person and a hearing person understand each other. They sign what is said and speak what is signed.", "When an interpreter helps, talk to the Deaf person, not the interpreter.", "If you meet a Deaf person with an interpreter, you look at the Deaf person and say hello.", [
      "What does an interpreter do?|Helps people understand each other|Plays loud music|Cooks dinner",
      "When an interpreter is there, you should look at...|The Deaf person|Only the interpreter|The ceiling",
      "An interpreter may...|Sign what you say|Take your lunch|Tell secrets",
      "Why do we have interpreters?|To help share messages|To fix cars|To sell tickets",
      "If you speak and an interpreter signs, the Deaf person can...|Understand you|Not know anything|Leave",
      "You should talk to...|The person you want to talk with|Only the interpreter|The wall"
    ]),
    SC("Name signs", "🏷️", "In Deaf culture, a name sign is a special sign for a person. It is usually given by Deaf people, not made up by the person themselves.", "A name sign is a gift from the community, like a nickname.", "A Deaf friend might give you a name sign because of something special about you.", [
      "A name sign is...|A special sign for a person|A word on a sign post|A dance",
      "Who usually gives a name sign?|A Deaf friend or community|The person themselves|A robot",
      "Is a name sign the same as fingerspelling your name?|No|Yes|It is a song",
      "A name sign is like...|A special nickname|A homework page|A kind of snack",
      "If you get a name sign, you should say...|Thank you!|No thanks|Whatever",
      "Can you make up your own name sign?|It is best to wait for a Deaf friend to give it|Yes, always|Never wear shoes"
    ]),
    SC("Respect and patience", "🕊️", "Respect means treating people kindly. Patience means giving people time to talk. These help with every language.", "Respect: kind words and actions. Patience: wait, try again, smile.", "If a signer is slow, you wait, smile and watch carefully.", [
      "A signer takes time to finish. You...|Wait patiently|Interrupt|Look away",
      "Which shows respect?|Looking at the person who signs|Mimicking them|Laughing",
      "You do not know a sign. You...|Ask politely|Make fun|Ignore",
      "Which is kind?|Smiling and trying|Rolling your eyes|Walking off",
      "Patience means...|Giving people time|Hurrying people|Being angry",
      "When someone teaches you, you...|Say thank you|Say nothing|Yawn"
    ]),
    PL("Sign detective 3", "🕵️", "Time for a big signs review.", "Take your time and picture the sign in your hands.", g("hello", "goodbye", "yes", "no", "please", "thanks", "sorry", "help", "eat", "drink", "water", "more", "mom", "dad", "friend", "stop", "ily", "see", "book", "school", "play", "cat", "dog", "good", "happy", "sad", "love", "think", "me", "you", "come", "where", "milk", "cold", "bathroom", "finished", "name"), QD),
    SC("Which way to talk?", "💬", "There are many ways to share a message: voice, signs, writing and gestures. Pick the one that works best for the person.", "Ask yourself: what can this person see or hear? Then choose.", "To tell a Deaf friend 'bye', wave and sign goodbye.", [
      "Your friend is Deaf and you want to say hello. Best way?|Sign hello|Whisper|Hum",
      "Your friend is hearing and sits next to you. Best way?|Speak normally|Sign in the dark|Send a letter",
      "A Deaf person does not know your gesture. You can...|Write it down|Yell|Run away",
      "If the room is loud and your friend is far, you can...|Wave and use signs|Speak softly|Do nothing",
      "A signer asks you to repeat. You...|Try again or write it|Roll your eyes|Walk away",
      "Writing a short note can help when...|Neither of you knows the other's signs|You are asleep|You have a pencil only"
    ])
  ];

  return { 1: lvl(1, L1), 2: lvl(2, L2), 3: lvl(3, L3) };
})();
