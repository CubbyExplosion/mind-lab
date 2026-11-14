// ext/health-22-24.js  Health & Safety levels 22-24 (10th grade 2nd half, 11th grade)
(() => {
  // item format: "question|answer|wrong1,wrong2,wrong3"
  const L = (title, v, intro, key, tip, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p[2].split(/,(?=\S)/), v: p[3] || "" }; });
    const make = () => {
      const it = pick(its);
      const ex = pick(its.filter(x => x.a !== it.a && x.q !== it.q));
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...shuf(it.w).slice(0, 2)]), answer: it.a,
        hints: [nudge || "Read the question slowly, then look at every choice. Cross out any that sound unsafe or untrue.", tip, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: key }, { h: "Remember", v: "✏️", t: tip }];
    return { title, make };
  };
  const C = (title, v, intro, key, tip, gen) => {
    const make = () => { const g = gen(); return { text: g[0], answer: g[1], visual: g[5], hints: [g[2], g[3], g[4] + " Now do yours."] }; };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Key ideas", v: "💡", t: key }, { h: "Remember", v: "✏️", t: tip }];
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };
  const pk = (arr, idx) => idx.map(i => arr[i]);

  // ================= LEVEL 22 =================
  const a = [];
  a.push(L("Neurons and signals", "🧠", "Your nervous system sends messages around your body in a flash.",
    "Nerve cells are called <b>neurons</b>. They pass signals as tiny electrical pulses. Between two neurons is a gap called a <b>synapse</b>, where chemical messengers called <b>neurotransmitters</b> carry the message across. The brain and spinal cord are the <b>central nervous system</b>. <b>Sensory</b> nerves carry news to the brain and <b>motor</b> nerves carry orders to muscles.",
    "Ask: is this a cell, a gap, a messenger, or a direction of travel?", [
    "Nerve cells are called...|Neurons|Platelets,Alveoli,Follicles",
    "The tiny gap where one neuron passes a message to the next is the...|Synapse|Valve,Pore,Gland",
    "Chemical messengers that cross a synapse are called...|Neurotransmitters|Antibodies,Enzymes,Minerals",
    "The brain and spinal cord together make up the...|Central nervous system|Digestive system,Lymph system,Skeletal system",
    "Pulling your hand away from a hot pan before you think about it is a...|Reflex|Habit,Daydream,Memory",
    "Nerves that carry messages from the body to the brain are...|Sensory nerves|Motor nerves,Bone nerves,Blood nerves",
    "Motor neurons carry orders to your...|Muscles|Hair tips,Nail beds,Bone marrow",
    "Why is a reflex so fast?|The signal takes a short path through the spinal cord|It waits for a decision first,It travels through the stomach,It needs sleep first"]));
  a.push(L("Breathing and asthma", "🫁", "Your lungs bring in oxygen and get rid of carbon dioxide. Asthma makes that harder.",
    "Air travels down the windpipe into tiny air sacs called <b>alveoli</b>, where oxygen moves into the blood. The <b>diaphragm</b> is the muscle under the lungs that powers breathing. In <b>asthma</b> the airways become swollen and narrow, causing wheezing and coughing. Triggers include dust, smoke, pollen and exercise in some people. A person with asthma follows a plan from their doctor and uses a quick-relief inhaler as directed.",
    "Match each word to its job: sac, muscle, swelling, waste gas.", [
    "Tiny air sacs where oxygen enters the blood are called...|Alveoli|Tonsils,Valves,Ribs",
    "The muscle under the lungs that helps you breathe is the...|Diaphragm|Biceps,Pancreas,Spine",
    "Asthma makes the airways...|Narrow and swollen|Wider than normal,Hard like bone,Full of blood",
    "Which of these can be an asthma trigger?|Smoke or pollen|Drinking water,Sleeping,Eating fruit",
    "A person with asthma should use their inhaler...|As their doctor directed|Only on birthdays,To cure a cold,Never",
    "Which gas does the body need from the air?|Oxygen|Helium,Hydrogen,Neon",
    "Which gas do you breathe out as a waste product?|Carbon dioxide|Oxygen,Helium,Hydrogen",
    "Someone has trouble breathing and their inhaler does not help. What now?|Call for emergency help|Wait quietly all night,Tell them to run,Give them a big meal"]));
  a.push(L("Kidneys and water", "💧", "Your kidneys clean your blood and help balance the water in your body.",
    "You have <b>two kidneys</b>. They filter waste and extra water from the blood and make <b>urine</b>, which is stored in the <b>bladder</b>. Pale yellow urine usually means you are well hydrated. Dark amber urine can mean you need more water. Too much salt over time can strain the kidneys and blood vessels. A person can stay healthy with one working kidney.",
    "Think: filter, store, or color clue?", [
    "The kidneys mainly...|Filter waste from the blood and make urine|Pump blood,Make bile,Digest fat",
    "How many kidneys do most people have?|Two|One,Three,Four",
    "Pale yellow urine usually means...|You are well hydrated|You need much less water,A broken kidney,A vitamin shortage",
    "Dark amber urine can be a sign of...|Needing more water|Too much sleep,Strong bones,Great fitness",
    "Extra water and waste leave the body as...|Urine|Bile,Mucus,Saliva",
    "Urine is stored in the...|Bladder|Liver,Spleen,Appendix",
    "Too much salt over time can strain the...|Kidneys and blood vessels|Eyelashes,Fingernails,Hair color",
    "A person can stay healthy with one kidney because...|One healthy kidney can do the needed work|The body never needs filtering,The liver becomes a kidney,Blood cleans itself"]));
  a.push(L("Eyes and screens", "👀", "Screens are useful, but long stretches can tire your eyes.",
    "Looking at a screen for a long time can cause <b>digital eye strain</b>: dry, tired, sore eyes and headaches. We blink much less when we stare at screens. Try the <b>20-20-20 rule</b>: every 20 minutes, look at something 20 feet away for 20 seconds. Bright screens late at night can make it harder to fall asleep. Sunglasses that block UV light protect your eyes, and protective eyewear matters in sports.",
    "Think about blinking, rest breaks, light and protection.", [
    "Staring at screens for hours can cause...|Digital eye strain|Broken bones,Tooth decay,Better night vision",
    "The 20-20-20 rule says to look 20 feet away for how long?|20 seconds|20 minutes,2 seconds,2 hours",
    "When we stare at screens we blink less, which makes eyes...|Dry|Wetter,Larger,Colored",
    "Bright screens late at night can...|Make falling asleep harder|Fix your vision,Cure headaches,Make you grow",
    "Sunglasses that block UV light help protect eyes from...|Sun damage|Hearing loss,Colds,Hunger",
    "Why should you avoid rubbing your eyes with dirty hands?|Germs can spread to the eyes|It makes eyes bigger,It cures dryness,It cleans them",
    "Regular eye exams can find...|Vision problems early|Broken bones,Dental cavities,Heart rhythm",
    "For sports with flying balls or sticks, the safest choice is...|Protective eyewear made for the sport|Squinting,Closing one eye,Regular sunglasses only"]));
  a.push(L("Hearing and loud sound", "🎧", "Hearing loss from loud noise is usually permanent, but it is also easy to prevent.",
    "Loudness is measured in <b>decibels (dB)</b>. Tiny <b>hair cells</b> in the inner ear turn sound into nerve signals. Loud noise can damage them, and in people they do not grow back. A ringing in the ears is called <b>tinnitus</b>. If you must shout to be heard by someone near you, the noise is probably harmful. Lower the volume, take breaks, move away from speakers and wear earplugs at loud events. A common headphone guideline is no more than 60 percent volume for 60 minutes at a time.",
    "Ask how loud, how long, and how to protect your ears.", [
    "Loudness of sound is measured in...|Decibels|Degrees,Grams,Liters",
    "Hearing damage from loud noise is usually...|Permanent|Fixed by sleeping,Fixed by water,Only found in animals",
    "Ringing in the ears after loud noise is called...|Tinnitus|Tonsillitis,Tendonitis,Tachycardia",
    "A common headphone guideline is no more than 60 percent volume for how long at a time?|60 minutes|6 minutes,6 hours,All day",
    "If people must shout to be heard near you, the noise is probably...|Loud enough to harm hearing|Perfectly safe,Too quiet,Silent",
    "Earplugs at a loud concert...|Lower the sound reaching your ears|Make music louder,Cause hearing loss,Replace sleep",
    "The tiny hair cells in the inner ear...|Turn sound into nerve signals|Make earwax,Grow back every week,Digest food",
    "Music is very loud. The best choice is to...|Turn it down or move away|Stand closer,Turn it up,Ignore it"]));
  a.push(L("Gum disease and flossing", "🪥", "Healthy gums matter as much as healthy teeth.",
    "<b>Plaque</b> is a sticky film of germs on teeth. If it is not cleaned away it hardens into <b>tartar</b>. Plaque makes gums red, swollen and bleeding, an early stage of gum disease called <b>gingivitis</b>. Brush for <b>2 minutes</b> with fluoride toothpaste twice a day, floss once a day to clean between teeth, limit sugary drinks and see a dentist regularly.",
    "Name the film, the hard stuff, and the daily habits that stop them.", [
    "A sticky film of germs on teeth is called...|Plaque|Enamel,Pulp,Saliva",
    "Plaque that has hardened is called...|Tartar|Enamel,Dentin,Saliva",
    "Red, swollen, bleeding gums may be early gum disease called...|Gingivitis|Bronchitis,Arthritis,Tinnitus",
    "Flossing cleans...|Between teeth where a brush cannot reach|Only the tongue,Only the lips,Only the outside of teeth",
    "How long should you brush each time?|2 minutes|10 seconds,20 minutes,1 hour",
    "Which drink adds most to cavities?|Sugary soda|Plain water,Unsweetened seltzer,Nothing",
    "Fluoride toothpaste helps by...|Strengthening enamel|Staining teeth,Softening enamel,Replacing brushing",
    "How often should you visit a dentist?|Regularly for checkups|Only after teeth fall out,Never if you brush,Once at age 50"]));
  a.push(L("Herd immunity", "🛡️", "When enough people are protected, a disease has trouble spreading to everyone.",
    "<b>Vaccines</b> teach your immune system to recognize a germ using a safe piece or weakened form of it. When most people in a community are immune, a disease cannot spread easily. This is <b>herd immunity</b>, and it protects people who cannot be vaccinated. Very contagious diseases like measles need about <b>95 percent</b> of people immune. Smallpox was ended worldwide by vaccination. Common side effects are a sore arm or mild tiredness.",
    "Think about how a germ needs people to spread, and what stops it.", [
    "Herd immunity means...|Enough people are immune that a disease spreads poorly|Everyone gets sick,Animals catch the disease,Nobody ever washes",
    "Vaccines train the body by...|Showing the immune system a safe piece or weakened form of a germ|Giving a full-strength disease,Removing white blood cells,Replacing bones",
    "People who cannot be vaccinated for medical reasons are protected when...|Most people around them are immune|Nobody around them is immune,They stop eating,They avoid water",
    "Measles is very contagious, so about what share of a community needs to be immune?|About 95 percent|About 5 percent,About 20 percent,About 50 percent",
    "Which disease was ended worldwide by vaccination?|Smallpox|Common cold,Flu,Chickenpox",
    "A common mild vaccine side effect is...|A sore arm or tiredness|Losing all your hair,Growing taller at once,Turning blue",
    "Who recommends vaccine schedules?|Doctors and public health experts|Advertisers,Game designers,Random websites",
    "Vaccines work best when they are...|Given on schedule|Skipped,Delayed forever,Eaten"]));
  a.push(L("Concussions", "⛑️", "A concussion is a brain injury. Taking it seriously helps the brain heal.",
    "A <b>concussion</b> is a brain injury from a bump, blow or hard jolt. Signs include headache, dizziness, confusion, nausea and trouble remembering. You do <b>not</b> need to pass out. A player with a possible concussion must <b>stop playing right away</b> and be checked. Rest, then slowly return to activity. Return to sports only when a health professional says it is safe. Helmets and good technique lower the risk of serious head injury.",
    "When in doubt, sit them out.", [
    "A concussion is a...|Brain injury from a bump or jolt|Broken leg,Stomach bug,Muscle cramp",
    "A sign of a concussion is...|Headache, dizziness or confusion|Itchy elbows,A sneeze,Stronger memory",
    "After a possible concussion the player should...|Stop playing right away and get checked|Walk it off and keep playing,Play harder,Eat candy",
    "When can an athlete return to play after a concussion?|When a health professional says it is safe|When the coach is impatient,After one hour,After a snack",
    "Do you need to pass out to have a concussion?|No|Yes always,Only in football,Only in adults",
    "Helmets...|Lower the risk of serious head injury|Make concussions impossible,Are only for adults,Replace safe play",
    "Good recovery after a concussion includes...|Rest, then slowly returning to activities|Hard workouts right away,Staying up all night,Long gaming marathons",
    "After a head hit, a person vomits again and again and is very sleepy. What now?|Call emergency help|Let them nap alone,Give an energy drink,Wait a week"]));
  a.push(L("Mindfulness and breathing", "🧘", "Slowing down and noticing the moment can calm a busy mind.",
    "<b>Mindfulness</b> means paying attention to the present moment without judging it. Slow belly breathing slows the heart rate and relaxes muscles. In <b>box breathing</b> you breathe in, hold, breathe out and hold, each for the same count. <b>5-4-3-2-1 grounding</b> uses your senses to bring you back to now. You can practice while walking, eating or listening. If heavy feelings last for weeks, talk to a trusted adult too.",
    "Match each tool to what it does for your mind and body.", [
    "Mindfulness means...|Paying attention to now without judging|Planning everything,Forgetting feelings,Falling asleep",
    "Slow belly breathing calms the body by...|Slowing the heart rate and relaxing muscles|Raising the heartbeat,Stopping all thoughts forever,Making you hungrier",
    "Box breathing steps are in, hold, out and...|Hold|Jump,Sneeze,Shout",
    "5-4-3-2-1 grounding uses your...|Senses|Pocket money,Dreams,Homework",
    "Mindfulness practice may help with...|Stress and focus|Growing taller,Seeing in the dark,Running faster",
    "When worries loop in your head, a good first step is to...|Notice them and take slow breaths|Argue with them all night,Hide them forever,Skip meals",
    "Mindfulness can be practiced while...|Walking, eating or listening|Only on a mountain,Only at midnight,Only with equipment",
    "If sad or anxious feelings stay heavy for weeks, mindfulness alone is...|Not enough; talk to a trusted adult|Always enough,Better than any doctor,Dangerous"]));
  a.push(L("Grief and loss", "🕊️", "Losing someone or something important can bring big feelings. That is normal.",
    "<b>Grief</b> is a natural response to loss. It can bring sadness, anger, tiredness, numbness or even moments of laughter. Everyone grieves in their own way and on their own time. Loss can be a death, but also a move, a lost pet or the end of a friendship. Helpful steps: talk to someone you trust, keep up sleep, food and gentle activity. To help a friend, listen and say you care. If grief feels too heavy, reach out to a parent, counselor or doctor.",
    "Think about what is kind, patient and honest.", [
    "Grief is...|A natural response to loss|A sign of weakness,Something to hide,Always short",
    "Grief can show up as...|Sadness, anger, tiredness or numbness|Only a rash,Only hunger,Only boredom",
    "Everyone grieves...|In their own way and time|In exactly the same way,Within one week,Without any feelings",
    "A helpful thing to do when grieving is to...|Talk to someone you trust|Pretend nothing happened,Cut off everyone,Blame yourself",
    "To support a grieving friend you can...|Listen and say you care|Tell them to get over it,Avoid them,Change the subject fast",
    "Loss can also mean...|A move, a pet or a friendship ending|Only winning a game,Only getting a gift,Only a holiday",
    "Caring for yourself while grieving includes...|Sleep, food and gentle activity|Skipping meals,Never sleeping,Staying alone for months",
    "If grief feels too heavy to cope with, you should...|Reach out to a parent, counselor or doctor|Keep it secret,Wait for years,Ignore it"]));
  a.push(L("Test anxiety", "📝", "Nerves before a test are normal, and you can learn to manage them.",
    "A little stress can sharpen focus, but too much can block your thinking. Plan ahead: <b>spread studying over several days</b> instead of cramming, use <b>practice tests</b> because pulling information from memory strengthens it, eat a good breakfast and get a full night of sleep. During the test, breathe slowly and start with questions you know. Use positive self-talk. If anxiety is intense every time, talk to a counselor or trusted adult.",
    "Think about before the test, during the test and when to get help.", [
    "Nerves before a test are...|Common and manageable|A sign you will fail,Very rare,Always dangerous",
    "Which study plan helps memory the most?|Spreading study over several days|Cramming all in one night,Skipping sleep,Studying while gaming",
    "The best choice the night before a test is to...|Get enough sleep|Stay up all night,Skip breakfast the next day,Study eight more hours",
    "If your mind blanks during a test, try to...|Take a slow breath and move to an easier question|Panic,Give up,Rip the paper",
    "Practice tests help because...|Pulling information from memory strengthens it|They are always fun,They cost money,They replace notes",
    "Which is helpful self-talk?|I prepared and I can do my best|I always fail,I am doomed,Nothing matters",
    "A good breakfast on test day...|Gives the brain steady energy|Hurts memory,Causes anxiety,Makes tests longer",
    "If test anxiety is intense every time, you should...|Talk to a counselor or trusted adult|Ignore it,Stop going to school,Skip every test"]));
  a.push(L("Fire escape plans", "🚒", "A plan you have practiced turns panic into action.",
    "Test smoke alarms <b>every month</b> and replace them about every <b>10 years</b>. Know <b>two ways out</b> of every room and choose a <b>meeting place</b> outside, like a mailbox or tree. In smoke, <b>stay low</b> where the air is clearer. Feel a door with the back of your hand before opening it. Once out, <b>stay out</b> and call 911 from outside. Practice your home fire drill at least twice a year. If your clothes catch fire: stop, drop and roll.",
    "Plan ahead, stay low, get out, stay out.", [
    "Smoke alarms should be tested...|Every month|Once a decade,Only when they beep,Never",
    "A smoke alarm should be replaced about every...|10 years|Week,6 months,100 years",
    "Each room should have how many ways out?|Two|None,Ten,Only windows",
    "If there is smoke, you should...|Stay low and crawl out|Stand tall,Hide under a bed,Open every door wide",
    "Before opening a door in a fire you should...|Feel it with the back of your hand|Open it wide at once,Pour water on the knob,Ignore it",
    "Your family's meeting place should be...|A safe spot outside, like a mailbox or tree|Inside the house,Back in your room,The attic",
    "If your clothes catch fire you should...|Stop, drop and roll|Run fast,Wave your arms,Jump in bed",
    "Once outside during a fire you should...|Stay out and call 911|Go back for belongings,Go back inside to look for things,Hide"]));
  a.push(L("Earthquakes and emergency kits", "🧰", "Being ready for an emergency keeps you calm and safe.",
    "In an earthquake, <b>drop, cover and hold on</b> under a sturdy table, away from windows, and expect aftershocks. An emergency kit should hold at least <b>3 days</b> of supplies: about <b>1 gallon of water per person per day</b>, non-perishable food, a flashlight with extra batteries, a first-aid kit, medicines and a battery or crank weather radio. Your family plan needs a meeting place and a contact person.",
    "Remember: drop, cover, hold on, and pack the basics.", [
    "In an earthquake indoors you should drop, cover and...|Hold on|Run outside,Stand in a doorway,Take the elevator",
    "The safest spot indoors in an earthquake is...|Under a sturdy table away from windows|Next to a window,Beside a tall shelf,In an elevator",
    "How much water should an emergency kit hold per person per day?|1 gallon|1 cup,1 ounce,10 gallons",
    "An emergency kit should have supplies for at least...|3 days|1 hour,2 hours,1 minute",
    "Which item belongs in an emergency kit?|A flashlight with extra batteries|A skateboard,Soda cans,A board game",
    "After the main shaking stops, you should expect...|Aftershocks|Nothing more,Snow,Floating objects",
    "A good family emergency plan includes...|A meeting place and a contact person|Hiding rules,Secrets,Only one phone number",
    "A battery or crank weather radio is useful because...|It gets alerts without the internet|It replaces the kit,It plays only music,It needs wifi"]));
  a.push(L("Sodium and salt", "🧂", "Most of the sodium we eat does not come from the salt shaker.",
    "Most adults and teens should keep sodium to about <b>2300 mg a day</b> or less. Most sodium comes from <b>packaged and restaurant food</b>, such as chips, canned soup, deli meats and pizza. Too much sodium can raise blood pressure over time. Season with herbs, spices, garlic and lemon, rinse canned beans, and eat fruits and vegetables, whose potassium helps balance sodium.",
    "Check the label, not just the salt shaker.", [
    "Most of the sodium in typical diets comes from...|Packaged and restaurant foods|Fresh fruit,Plain water,Fresh apples",
    "The daily sodium limit for most people is about...|2300 mg|230 mg,23 mg,23000 mg",
    "Too much sodium over time can raise the risk of...|High blood pressure|Better eyesight,Faster hair growth,Taller bones",
    "A way to add flavor without salt is...|Herbs, spices and lemon|More salt,Only butter,Only sugar",
    "Which snack is usually highest in sodium?|Salted chips|Fresh grapes,A plain apple,Cut carrots",
    "Rinsing canned beans can...|Remove some sodium|Add sodium,Add sugar,Make them spoil",
    "Potassium-rich foods like bananas can help...|Balance sodium's effect on blood pressure|Raise sodium,Replace water,Cure colds",
    "A label that says low sodium means...|Only a small amount of sodium|No sodium at all,Lots of sodium,Zero calories"]));
  a.push(C("Safe listening time", "🔊", "Louder sound means a shorter safe listening time.",
    "A common safety guide says <b>85 dB</b> is safe for about <b>8 hours</b>. Every <b>3 dB</b> louder cuts the safe time in <b>half</b>. So 88 dB is 4 hours, 91 dB is 2 hours.",
    "Count the 3 dB steps above 85, and halve 8 hours once for each step.",
    () => {
      const k = ri(1, 3), ek = k === 1 ? 2 : 1;
      if (Math.random() < 0.5) return [`A safety guide says 85 dB is safe for 8 hours, and every 3 dB louder cuts the safe time in half. How many hours is it safe at ${85 + 3 * k} dB?`, 8 / Math.pow(2, k),
        "Find how many 3 dB steps the sound is above 85 dB.", "Start at 8 hours and cut the time in half once for each step.",
        `Example: at ${85 + 3 * ek} dB there are ${ek} step${ek > 1 ? "s" : ""}, so 8 halved ${ek} time${ek > 1 ? "s" : ""} is ${8 / Math.pow(2, ek)} hours.`, "🔊"];
      return [`A safety guide says 85 dB is safe for 8 hours, and every 3 dB louder cuts the safe time in half. A sound is safe for only ${8 / Math.pow(2, k)} hour${k === 3 ? "" : "s"}. How loud is it in dB?`, 85 + 3 * k,
        "Each time the safe time is cut in half, the sound is 3 dB louder. How many halvings are needed to get from 8 hours?", "Count the halvings, multiply by 3 and add that to 85.",
        `Example: a safe time of ${8 / Math.pow(2, ek)} hours is 8 halved ${ek} time${ek > 1 ? "s" : ""}, so ${3 * ek} dB above 85, which is ${85 + 3 * ek} dB.`, "🔊"];
    }));
  a.push(C("Running pace", "🏃", "Pace tells you how many minutes each mile takes.",
    "<b>Pace = total minutes ÷ miles</b>. If you run 3 miles in 30 minutes at an even speed, each mile takes 10 minutes. Training with an even pace helps you avoid burning out early.",
    "Divide the time by the distance.",
    () => {
      const m = ri(2, 6), p = ri(8, 13), ep = p === 10 ? 11 : 10, em = m === 3 ? 4 : 3;
      return [`Sam ran ${m} miles in ${m * p} minutes at an even pace. How many minutes did each mile take?`, p,
        "Each mile took the same time. Think about sharing the total time equally.", "Divide the total minutes by the number of miles.",
        `Example: ${em * ep} minutes for ${em} miles is ${em * ep} ÷ ${em} = ${ep} minutes per mile.`, "👟"];
    }));
  a.push(C("Screen break count", "⏰", "Regular screen breaks protect tired eyes.",
    "Use the <b>20-20-20 rule</b>: after every 20 minutes of screen time, look 20 feet away for 20 seconds. To count the breaks in a study session, divide the minutes by 20.",
    "Divide the total minutes by 20.",
    () => {
      const m = ri(3, 9) * 20, em = m === 100 ? 120 : 100;
      return [`Ava studies on a screen for ${m} minutes and takes a 20-20-20 break after every 20 minutes. How many breaks does she take?`, m / 20,
        "A break happens once for every block of 20 minutes.", "Divide the total minutes by the length of one block.",
        `Example: ${em} minutes is ${em} ÷ 20 = ${em / 20} breaks.`, "👀"];
    }));
  a.push(C("Sodium left today", "🧂", "Add up what you ate, then see what is left in your daily limit.",
    "The daily limit is about <b>2300 mg</b> of sodium. Add the sodium from each food, then <b>subtract</b> the total from 2300 to see how much is left.",
    "Add the foods first, then subtract from the limit.",
    () => {
      const x = ri(3, 9) * 100, y = ri(2, 8) * 100;
      return [`The daily sodium limit is 2300 mg. Zoe ate foods with ${x} mg and ${y} mg of sodium. How many mg can she still have today?`, 2300 - x - y,
        "She has used up some of her limit. First find how much she has eaten in all.", "Add the two amounts she ate, then take that total away from the limit.",
        "Example: a person eats 250 mg and 350 mg. That is 600 mg, and 2300 - 600 = 1700 mg left.", "🧂"];
    }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 2, 3, 4, 6, 8, 10, 11, 12, 13, 15])));
  a.push(MIX("Level 22 Challenge", pk(a, [5, 7, 9, 13, 14, 16, 17, 12, 8, 4, 2, 0])));

  // ================= LEVEL 23 =================
  const b = [];
  b.push(L("Reading medicine labels", "💊", "Even common medicines must be used carefully, exactly as the label says.",
    "Always read the <b>Drug Facts label</b> and follow the directions. The <b>active ingredient</b> is the part that treats symptoms. Taking two products with the same active ingredient can cause an <b>accidental overdose</b>. Never take medicine prescribed for someone else and never share yours. Store medicines out of reach of young children, throw away expired medicine the safe way, and ask a pharmacist or doctor if you are unsure. Antibiotics do not work on viruses such as colds.",
    "Pick the answer a careful pharmacist would give.", [
    "Before taking over-the-counter medicine, you should...|Read the label and follow the directions|Guess the dose,Take double to be safe,Share it with a friend",
    "The active ingredient of a medicine is...|The part that treats symptoms|The color,The price,The slogan",
    "Taking two products with the same active ingredient can cause...|An accidental overdose|Faster healing,Stronger bones,No effect at all",
    "Expired medicine should be...|Disposed of the safe way|Taken anyway,Shared,Kept forever",
    "Medicine prescribed for someone else...|Should never be taken by you|Is fine if you have the same symptoms,Is fine in half doses,Is a vitamin",
    "Medicines should be stored...|Out of reach of young children|Where little kids play,On the floor,In a school bag",
    "Antibiotics do not work on...|Viruses like colds and flu|Bacterial strep throat,Bacterial skin infections,Bacterial ear infections",
    "If you are unsure about a dose, ask...|A pharmacist or doctor|A random website,A friend,A game chat"]));
  b.push(L("Drowsy driving", "🚗", "Being sleepy behind the wheel is dangerous, even for experienced drivers.",
    "Drowsiness slows reaction time and attention. Warning signs include yawning, heavy eyelids, drifting out of your lane and missing exits. A <b>microsleep</b> is a few seconds of sleep you may not notice, and at highway speed a car travels a long way in that time. Open windows, loud music and caffeine do not fix sleepiness. <b>Sleep</b> does. If you feel drowsy, pull over safely and rest or switch drivers. Teens need about 8 to 10 hours of sleep. Passengers can speak up if the driver seems sleepy.",
    "Find the choice that gets you safely off the road or rested.", [
    "Drowsy driving is dangerous because it...|Slows reaction time and attention|Improves focus,Is legal and safe,Only happens to old drivers",
    "A warning sign of drowsy driving is...|Yawning and drifting out of your lane|Singing,Fast reflexes,Feeling excited",
    "If you feel sleepy while driving, you should...|Pull over safely and rest or switch drivers|Open the window and keep going,Turn the music up,Drive faster",
    "A microsleep is...|A few seconds of sleep you may not notice|A short song,A kind of fruit,A dream you remember",
    "What really fixes sleepiness?|Sleep|Cold air,Loud music,A bigger breakfast",
    "About how many hours of sleep do teens need?|8 to 10 hours|2 to 3 hours,4 to 5 hours,14 hours",
    "A passenger notices the driver keeps nodding off. The passenger should...|Speak up and ask to switch or stop|Say nothing,Fall asleep too,Turn off the lights",
    "A good plan to avoid drowsy driving is to...|Not drive late at night when tired|Drive with the windows shut,Skip sleep before trips,Drink more soda"]));
  b.push(L("Resilience and growth mindset", "🌱", "Hard times happen. Resilience is how we grow through them.",
    "<b>Resilience</b> means bouncing back from hard times. Resilient people still feel stress and sadness, but they cope and keep going. A <b>growth mindset</b> is the belief that skills grow with effort and learning, so mistakes are chances to learn. Adding the word <b>yet</b> helps: I can't do this yet. Building blocks of resilience are supportive people, sleep, exercise and problem-solving: name the problem, brainstorm, choose, try, then review. <b>Reframing</b> means looking at a situation in a more helpful way.",
    "Choose the answer that treats effort and mistakes as part of learning.", [
    "Resilience means...|Bouncing back from hard times|Never feeling sad,Avoiding problems,Always winning",
    "A growth mindset is the belief that...|Skills grow with effort and learning|Talent is fixed,Mistakes mean failure,Effort is wasted",
    "I can't do this yet is an example of...|A growth mindset|A fixed mindset,A reflex,A fever",
    "Which habit builds resilience?|Supportive friends, sleep and exercise|Isolation,Skipping meals,Avoiding every challenge",
    "A setback is best seen as...|A chance to learn|Proof you are a failure,A reason to quit forever,Something to hide",
    "Resilient people...|Still feel stress but find ways to cope|Never feel stress,Never ask for help,Never make mistakes",
    "Reframing means...|Looking at a situation in a more helpful way|Ignoring the problem,Blaming others,Changing your name",
    "A problem-solving step comes after brainstorming. It is to...|Choose an option and try it|Give up,Forget the problem,Stop thinking"]));
  b.push(L("Autoimmune conditions", "🔬", "Sometimes the immune system makes a mistake and attacks the body itself.",
    "In an <b>autoimmune</b> condition the immune system mistakenly attacks healthy body cells. In <b>type 1 diabetes</b> it attacks the cells that make insulin. In <b>celiac disease</b> eating gluten triggers damage in the small intestine, so people follow a gluten-free diet. These conditions are <b>not contagious</b>. They are different from allergies, where the immune system overreacts to something harmless. Doctors diagnose them with tests and help manage them.",
    "Ask what the immune system is attacking, and whether it is a germ or the body itself.", [
    "In an autoimmune condition the immune system...|Mistakenly attacks healthy body cells|Gets stronger forever,Stops working completely,Only fights viruses",
    "In type 1 diabetes the immune system attacks cells that make...|Insulin|Bile,Hair,Bone",
    "Celiac disease is triggered by eating...|Gluten|Apples,Fish,Plain rice",
    "Autoimmune conditions are...|Not contagious|Spread by sneezing,Spread by sharing food,Spread by handshakes",
    "An allergy is the immune system overreacting to...|Something harmless|A broken bone,A deep cut,A healthy cell",
    "Who can diagnose an autoimmune condition?|A doctor using tests|A video game,An advertisement,A guess",
    "The immune system normally protects the body from...|Germs|Sleep,Food,Exercise",
    "People with celiac disease manage it with...|A gluten-free diet|Extra gluten,No water,Extra sugar"]));
  b.push(L("Cancer prevention", "🎗️", "Cancer is complicated, but healthy habits and checkups lower many risks.",
    "<b>Cancer</b> happens when cells grow out of control. It is <b>not contagious</b>. <b>Tobacco use</b> is the biggest preventable cause. Lower your risk with sunscreen and shade, not smoking or vaping, a healthy weight, regular activity and a diet rich in plants. <b>Screening</b> means checking for disease before symptoms start. Finding cancer early often makes treatment work better. Tell a doctor about a mole that changes shape or color, or a lump that does not go away.",
    "Think prevention, early detection and honest facts.", [
    "Cancer happens when cells...|Grow out of control|Stop growing,Turn into bones,Get too cold",
    "The biggest preventable cause of cancer is...|Tobacco use|Eating fruit,Walking,Sleeping",
    "Is cancer contagious?|No|Yes, by sneezing,Yes, by sharing food,Yes, by hugging",
    "Wearing sunscreen and shade lowers the risk of...|Skin cancer|Broken bones,Colds,Hiccups",
    "Screening means...|Checking for disease before symptoms start|Watching TV,Hiding a problem,Only treating the flu",
    "Finding cancer early often...|Makes treatment work better|Makes it worse,Does nothing,Is bad luck",
    "A habit that lowers cancer risk is...|Staying active and eating plenty of plants|Smoking,Never moving,Eating only fried foods",
    "Which should you tell a doctor about?|A mole that changes shape or color|A new haircut,A fun game,A snack"]));
  b.push(L("CPR and AED", "❤️‍🩹", "Knowing what to do in a cardiac emergency can save a life.",
    "If someone collapses and does not respond, check that the scene is safe and <b>call 911</b> (or have someone call). For hands-only CPR push hard and fast in the <b>center of the chest</b>, about <b>2 inches deep</b>, at <b>100 to 120 compressions per minute</b>. An <b>AED</b> (automated external defibrillator) gives spoken instructions: turn it on and follow the prompts. It only shocks if needed. Keep going until help arrives or the person wakes up. Classes teach you the skills hands-on.",
    "First safe, then call, then push, then use the AED.", [
    "The first step when you find someone who does not respond is to...|Make sure the scene is safe and call 911|Walk away,Shake them hard for ten minutes,Give them a drink",
    "In hands-only CPR you push on the...|Center of the chest|Stomach,Shoulder,Head",
    "The CPR compression rate is about...|100 to 120 per minute|10 to 20 per minute,40 to 50 per minute,300 per minute",
    "Compressions for an adult are about how deep?|2 inches|A quarter inch,10 inches,Not at all",
    "AED stands for...|Automated external defibrillator|Active emergency device,Always eat dinner,Adult energy drink",
    "To use an AED you...|Turn it on and follow the voice prompts|Hide it,Wait one hour,Break it open",
    "You keep doing CPR until...|Help arrives or the person wakes up|You are bored,One minute passes,A friend leaves",
    "An AED only gives a shock...|If the person needs it|Every time,Never,When you press random buttons"]));
  b.push(L("Joints, sprains and strains", "🦵", "Knowing the parts helps you treat and prevent common sports injuries.",
    "<b>Ligaments</b> connect bone to bone. <b>Tendons</b> connect muscle to bone. A <b>sprain</b> is an injured ligament and a <b>strain</b> is an injured muscle or tendon. For minor injuries use <b>RICE</b>: Rest, Ice (20 minutes with a cloth between ice and skin), Compression and Elevation. See a doctor if you cannot put weight on it, the swelling is big or the joint looks out of shape. Warm-ups help prepare joints and muscles.",
    "Match the tissue to what it connects, then the injury to the tissue.", [
    "Ligaments connect...|Bone to bone|Muscle to skin,Skin to hair,Muscle to muscle",
    "Tendons connect...|Muscle to bone|Bone to bone,Skin to skin,Nerve to nerve",
    "A sprain is an injury to a...|Ligament|Nerve,Lung,Tooth",
    "A strain is an injury to a...|Muscle or tendon|Ligament only,Kidney,Eyelash",
    "In RICE, the I stands for...|Ice|Itch,Inch,Insulin",
    "In RICE, the R stands for...|Rest|Run,Rip,Race",
    "You should see a doctor if you...|Cannot put weight on the injury|Have a tiny scratch,Feel a bit hungry,Want a snack",
    "A warm-up before sports helps to...|Prepare joints and muscles and lower injury risk|Make muscles tired,Skip stretching forever,Cause sprains"]));
  b.push(L("Fiber and whole grains", "🌾", "Fiber keeps your digestion moving and helps you feel full.",
    "<b>Fiber</b> comes only from plant foods: whole grains, beans, fruits, vegetables and nuts. A <b>whole grain</b> keeps all parts of the grain kernel: bran, germ and endosperm. Examples are oatmeal, brown rice and whole wheat bread. Teens need roughly 25 to 38 grams of fiber a day. Add fiber gradually and drink water. Soluble fiber, in oats and beans, helps lower cholesterol. Check that the first ingredient says whole.",
    "Think plant foods, whole kernels and slow changes.", [
    "Fiber is found in...|Plant foods|Meat only,Milk only,Candy",
    "A whole grain keeps...|All parts of the grain kernel|Only the white center,Only the husk,None of the grain",
    "Which is a whole grain?|Oatmeal|White sugar,Cheese,Butter",
    "Fiber helps with...|Digestion and feeling full|Making bones longer,Turning hair gray,Seeing in the dark",
    "Teens need about how much fiber each day?|25 to 38 grams|2 to 3 grams,500 grams,1000 grams",
    "When adding more fiber you should...|Add it gradually and drink water|Eat it all in one meal,Avoid water,Skip meals",
    "Soluble fiber in oats and beans can help lower...|Cholesterol|Height,Hearing,Shoe size",
    "A bread label that lists whole wheat first means the bread is...|Mostly whole grain|Made of sugar,Mostly white flour,Without fiber"]));
  b.push(L("Added sugar", "🍭", "Sugar added to food adds calories without much else.",
    "<b>Added sugars</b> are put in during making or cooking. Natural sugars are in fruit and plain milk. <b>4 grams of sugar equals about 1 teaspoon.</b> Experts suggest kids and teens keep added sugar under about <b>25 grams</b> (6 teaspoons) a day. Regular soda and sweet drinks are the biggest source. Look for the <b>Added Sugars</b> line on the Nutrition Facts label, and for names like corn syrup and cane syrup. Too much added sugar is linked to cavities and weight gain.",
    "Use the label and the 4 grams per teaspoon idea.", [
    "Added sugar is...|Sugar put in when food is made|Sugar in a plain apple,Sugar in plain milk,Salt",
    "Natural sugar is found in...|Fruit and plain milk|Soda,Candy,Frosting",
    "About how many grams of sugar equal 1 teaspoon?|4|1,10,40",
    "Experts suggest teens keep added sugar under about...|25 grams a day|250 grams a day,250 pounds,No limit",
    "Which usually has the most added sugar?|Regular soda|Plain water,Plain milk,A carrot",
    "The Nutrition Facts line to check is...|Added Sugars|Added Salt,Added Water,Added Vitamins",
    "Which name on an ingredient list means added sugar?|Corn syrup|Oat flour,Water,Garlic",
    "A smart swap for a sugary drink is...|Water or plain milk|Two sodas,Fruit punch,Sweet tea"]));
  b.push(L("Resolving conflict", "🤝", "Disagreements happen. How you handle them is what counts.",
    "Stay calm and <b>cool off</b> first if you are angry. Use <b>I-statements</b>: I feel upset when ... because ... Use <b>active listening</b>: listen without interrupting and repeat what you heard. Focus on the <b>problem, not the person</b>, and look for a <b>compromise</b> where both sides give a little. A neutral <b>mediator</b> can help. Name-calling makes things worse. If a conflict becomes unsafe, walk away and get an adult.",
    "Choose the calm, respectful, problem-solving choice.", [
    "Which is an I-statement?|I feel upset when plans change without telling me|You always ruin everything,You are so rude,Everybody hates you",
    "Active listening means...|Listening without interrupting and repeating what you heard|Waiting for your turn to shout,Looking at your phone,Changing the subject",
    "When you are very angry in a disagreement, first...|Take a break and cool off|Yell louder,Send an angry message,Stomp away forever",
    "A compromise is when...|Both sides give a little|One side wins everything,Nobody talks,Someone leaves angry",
    "Which makes a conflict worse?|Name-calling|Listening,Taking a breath,Staying calm",
    "A conflict becomes unsafe. You should...|Walk away and get an adult|Fight back,Stay and argue,Hide the problem",
    "A mediator is...|A neutral person who helps both sides talk|The winner,A judge who punishes,A rival",
    "In a disagreement you should focus on...|The problem, not the person|Their appearance,Past mistakes,Who is to blame"]));
  b.push(L("Family health history", "🧬", "Your family's health story can help your doctor protect you.",
    "A <b>family health history</b> lists health conditions that run in your family, such as heart disease, diabetes or some cancers. Include parents, grandparents, brothers, sisters, aunts and uncles. A family history means a <b>higher risk, not a certain outcome</b>, because genes and habits both matter. Healthy habits can lower the risk. Share the history with your doctor, who can plan checkups. This is personal health information, so share it only with people who need it.",
    "Think risk, not destiny.", [
    "A family health history lists...|Health conditions that run in a family|Favorite foods,Birthday dates,Sports scores",
    "Why is family health history useful?|Doctors can spot risks early|It predicts the future exactly,It replaces checkups,It proves you will get sick",
    "Which relatives are part of a family health history?|Parents, grandparents, siblings, aunts and uncles|Only friends,Only neighbors,Only pets",
    "Having a family history of a condition means...|You may have a higher risk, not a sure outcome|You will definitely get it,You can never get it,Nothing at all",
    "Which can lower your risk even with a family history?|Healthy habits|Doing nothing,Ignoring checkups,Skipping sleep",
    "Health is shaped by...|Genes and habits together|Genes only,Luck only,Colors",
    "You should share your family history with...|Your doctor|Strangers online,Everyone you meet,No one ever",
    "Family health information is...|Personal, so share it only with people who need it|Public,A prize,A joke"]));
  b.push(L("Ticks and bug bites", "🦟", "Insects can spread illness, but a few steps keep you safe.",
    "Ticks can spread <b>Lyme disease</b>. After time in tall grass or woods, <b>check your body for ticks</b>. If you find one, pull it out straight with fine-tipped tweezers close to the skin. A spreading bullseye rash or fever after a tick bite means see a doctor. Use an EPA-registered insect repellent, wear long sleeves and light colors. Mosquitoes can spread illnesses like West Nile virus. For a bee sting, scrape the stinger out. Swelling of the face or throat is an emergency: call 911.",
    "Prevent, check, remove, and know when to get help.", [
    "Ticks can spread...|Lyme disease|Broken bones,Hiccups,Sunburn",
    "When should you check for ticks?|After time in tall grass or woods|Only in winter indoors,Never,Only at night in bed",
    "The best way to remove a tick is with...|Fine-tipped tweezers, pulling straight out|Your teeth,A hot match,Soap and a spoon",
    "A spreading bullseye rash after a tick bite means...|See a doctor|Ignore it,It is a sunburn,Put on perfume",
    "Which helps prevent bites?|An EPA-registered insect repellent|Wearing no shirt,Standing in tall grass,Sweet perfume",
    "Which clothes help prevent ticks?|Long sleeves and light colors|Shorts only,Dark flowing clothes,No socks",
    "Mosquitoes can spread...|West Nile virus|A broken wrist,Tooth decay,Asthma",
    "After a sting, swelling of the face or throat means...|Call 911|Wait a week,Rub it,Eat a snack"]));
  b.push(L("Staying safe around risky substances", "🚫", "Simple facts and a simple plan are all you need.",
    "Alcohol and drugs can harm a teen's brain, which is still developing. Using someone else's pills is never safe. If you are offered something, say <b>No thanks</b> and <b>leave</b>. You can use an easy excuse like I have to go. <b>Never ride</b> with a driver who has used alcohol or drugs. Call a trusted adult for a ride. A <b>trusted adult</b> can be a parent, teacher, coach or counselor. If a friend seems very sick after taking something, call 911 and get an adult right away. True friends respect your no.",
    "Say no, leave, tell a trusted adult.", [
    "Alcohol and drugs can harm a teen because the brain is...|Still developing|Finished growing,Made of rock,Asleep",
    "If someone offers you something risky, the best response is...|No thanks, and leave|Try a little,Take it for later,Hide it",
    "After leaving a risky place you should...|Tell a trusted adult|Keep it a secret,Go back,Tell nobody",
    "Is it ever safe to take someone else's pills?|No|Yes, if the same symptoms,Yes, if half,Yes, if a friend says so",
    "A driver has used alcohol. You should...|Not ride with them and call a trusted adult|Ride quietly,Sit in the back,Help them drive",
    "A friend seems very sick after taking something. You should...|Call 911 and get an adult|Wait to see,Let them sleep alone,Post about it",
    "Which of these is a trusted adult?|A parent, teacher, coach or counselor|A stranger online,Anyone who asks,A person who wants a secret",
    "True friends who care about you will...|Respect your no|Pressure you,Laugh at you,Ignore you"]));
  b.push(L("Home first-aid kit", "🩹", "A ready kit helps you handle minor injuries with confidence.",
    "A basic first-aid kit has adhesive bandages, gauze pads, medical tape, antiseptic wipes, disposable gloves, tweezers, scissors, a thermometer, an elastic wrap and a list of emergency numbers. Keep it where everyone can find it. Check it twice a year and replace anything used or expired. For a small cut: wash your hands, rinse with clean water, press with clean gauze to stop bleeding, and cover with a bandage. Gloves protect you from blood and germs.",
    "Think clean, cover and ready to use.", [
    "Which belongs in a first-aid kit?|Gauze pads|Fireworks,Sugar,A bouncy ball",
    "Disposable gloves in a kit protect you from...|Blood and germs|Cold air,Noise,Sunburn",
    "A first-aid kit should be kept...|Where everyone can find it|Hidden,Locked with no key,Outside in the rain",
    "How should you treat the kit's expired items?|Replace them|Use them anyway,Keep them forever,Ignore them",
    "First step for a small cut is to...|Wash your hands and rinse the cut with clean water|Cover it with dirt,Rub it hard,Ignore it",
    "To stop a small cut from bleeding, you...|Press on it with clean gauze|Wave it,Soak it in soda,Tie it tight with string",
    "A thermometer in the kit is used to...|Check for fever|Check the time,Measure height,Weigh a pet",
    "A list of emergency numbers in the kit helps because...|Help can be called quickly|It is pretty,It weighs a lot,It is a game"]));
  b.push(C("Compressions in a row", "💪", "Counting compressions helps you keep a steady beat.",
    "Trained responders do <b>30 compressions</b> and then 2 breaths, which is one cycle. Hands-only CPR aims for about <b>100 compressions each minute</b>. To find a total, multiply the number per round by the number of rounds.",
    "Multiply the number in one round by the number of rounds.",
    () => {
      if (Math.random() < 0.5) {
        const c = ri(2, 6), ec = c === 3 ? 4 : 3;
        return [`A trained rescuer gives 30 compressions in each cycle. How many compressions are in ${c} cycles?`, 30 * c,
          "Each cycle has the same number of compressions. What operation finds a total of equal groups?", "Multiply the number per cycle by the number of cycles.",
          `Example: ${ec} cycles of 30 compressions is ${ec} x 30 = ${ec * 30} compressions.`, "💪"];
      }
      const m = ri(2, 5), em = m === 3 ? 4 : 3;
      return [`At a steady rate of 100 compressions per minute, how many compressions are given in ${m} minutes?`, 100 * m,
        "The rate is the same each minute. Think of equal groups.", "Multiply the compressions per minute by the number of minutes.",
        `Example: ${em} minutes at 100 per minute is ${em} x 100 = ${em * 100}.`, "💪"];
    }));
  b.push(C("Medicine label math", "🧮", "Label math helps you stay under the daily maximum.",
    "A label may give the strength of each tablet, how many to take per dose, and the <b>maximum doses in 24 hours</b>. The daily maximum is <b>amount per dose x number of doses</b>. Never go over the maximum on the label.",
    "Multiply tablets by doses, then by the strength if mg are asked.",
    () => {
      const mg = pick([100, 200, 250, 500]), t = ri(1, 3), d = ri(3, 4);
      return [`A label says each tablet has ${mg} mg. The dose is ${t} tablet${t > 1 ? "s" : ""}, with at most ${d} doses in 24 hours. What is the most mg allowed in 24 hours?`, mg * t * d,
        "First find the mg in one dose, then think about how many doses are allowed.", "Multiply tablets per dose by mg per tablet, then multiply by the number of doses.",
        "Example: tablets of 40 mg, 2 per dose, 3 doses: 2 x 40 = 80 mg a dose, and 80 x 3 = 240 mg.", "💊"];
    }));
  b.push(C("Sugar in teaspoons", "🥤", "Turning grams into teaspoons makes sugar easier to picture.",
    "<b>4 grams of sugar is about 1 teaspoon.</b> To change grams into teaspoons, divide the grams by 4.",
    "Divide the grams of sugar by 4.",
    () => {
      const t = ri(2, 10), eg = (t === 5 ? 6 : 5) * 4;
      return [`A drink has ${t * 4} grams of added sugar. If 4 grams is about 1 teaspoon, how many teaspoons of sugar is that?`, t,
        "Each teaspoon is the same number of grams. Think about how many groups fit.", "Divide the total grams by the grams in one teaspoon.",
        `Example: ${eg} grams is ${eg} ÷ 4 = ${eg / 4} teaspoons.`, "🥤"];
    }));
  b.push(C("Fiber goal", "🌾", "Adding up fiber shows how close you are to your daily goal.",
    "Add the grams of fiber from each food, then subtract from the goal to see how many more grams you need.",
    "Add first, then subtract from the goal.",
    () => {
      const x = ri(3, 9), y = ri(3, 9), z = ri(2, 8);
      return [`Max's fiber goal is 30 grams. He ate foods with ${x}, ${y} and ${z} grams of fiber. How many more grams does he need?`, 30 - x - y - z,
        "He has already eaten some fiber. First find how much that is in all.", "Add the three amounts, then subtract that total from the goal.",
        "Example: goal 25 grams, foods with 8, 9 and 7 grams: 8 + 9 + 7 = 24, and 25 - 24 = 1 more gram.", "🌾"];
    }));
  b.push(MIX("Mixed practice", pk(b, [0, 1, 2, 3, 5, 7, 9, 10, 12, 13, 15, 16])));
  b.push(MIX("Level 23 Challenge", pk(b, [4, 6, 8, 11, 14, 17, 13, 12, 9, 5, 1, 0])));

  // ================= LEVEL 24 =================
  const c = [];
  c.push(L("Dimensions of wellness", "🌈", "Being well is more than not being sick. It has many parts that work together.",
    "Wellness has several dimensions. <b>Physical</b>: exercise, sleep and food. <b>Emotional</b>: understanding and managing feelings. <b>Social</b>: healthy connections with others. <b>Intellectual</b>: learning and curiosity. <b>Financial</b>: managing money wisely. <b>Environmental</b>: caring for clean, safe surroundings. <b>Occupational</b>: finding meaning in work or school. Wellness means a balance across many parts of life.",
    "Match the activity to the dimension it feeds.", [
    "Exercising and getting enough sleep builds which kind of wellness?|Physical|Financial,Social,Environmental",
    "Learning a new skill builds which kind of wellness?|Intellectual|Physical,Environmental,Financial",
    "Spending time with supportive friends builds which kind of wellness?|Social|Intellectual,Financial,Physical",
    "Understanding and managing your feelings builds which kind of wellness?|Emotional|Financial,Environmental,Physical",
    "Making a budget builds which kind of wellness?|Financial|Social,Physical,Emotional",
    "Recycling and keeping spaces clean builds which kind of wellness?|Environmental|Emotional,Intellectual,Financial",
    "Finding meaning in your job or school work builds which kind of wellness?|Occupational|Physical,Social,Environmental",
    "Wellness means...|A balance across many parts of life|Only avoiding illness,Only exercise,Only money"]));
  c.push(L("Meal planning on a budget", "🛒", "Planning ahead saves money and helps you eat well.",
    "Start by checking what you already have, then <b>plan meals</b> and make a <b>shopping list</b> to avoid impulse buys. Compare the <b>unit price</b> (price per ounce or pound) rather than the package price. Beans, eggs and lentils are low-cost protein. Frozen vegetables are nutritious and last longer. Cook in batches and refrigerate leftovers within <b>2 hours</b>. Store brands are often the same quality for less.",
    "Plan first, list second, compare unit prices.", [
    "The first step in meal planning is to...|Check what you already have and plan meals|Buy everything on sale,Skip meals,Order out each night",
    "A shopping list helps you...|Avoid impulse buys|Spend more,Forget items,Buy only snacks",
    "A unit price shows...|The price per ounce or pound|The brand name,The weight of the box,The color of the label",
    "A low-cost protein choice is...|Beans or eggs|Candy,Soda,Chips",
    "Frozen vegetables are...|Nutritious and last longer|Always unhealthy,Made of plastic,Out of date",
    "Cooking in batches...|Saves time and money|Wastes food,Costs more,Skips nutrients",
    "Leftovers should be refrigerated within...|2 hours|2 days,2 weeks,2 minutes",
    "Store brands are often...|The same quality for a lower price|Poisonous,More expensive always,Never safe"]));
  c.push(L("Burnout and balance", "🔋", "Even things you love can wear you out if you never rest.",
    "<b>Burnout</b> is deep exhaustion from long-lasting stress. Signs: feeling tired all the time, losing interest, feeling negative and having trouble focusing. Prevent it with regular breaks, sleep, saying no to extra commitments, hobbies that recharge you and time with people you trust. Rest is not lazy. It is how the body and brain recover. If you feel stuck, talk with a counselor, doctor or trusted adult.",
    "Choose the answer that protects energy and asks for help.", [
    "Burnout is...|Deep exhaustion from long-lasting stress|A fun weekend,A kind of fruit,A short sneeze",
    "A sign of burnout is...|Feeling tired all the time and losing interest|Feeling full of energy,Winning every day,Needing no sleep",
    "A way to prevent burnout is...|Taking breaks and sleeping enough|Working every minute,Skipping meals,Never saying no",
    "Saying no to extra commitments can...|Protect your time and energy|Make you a failure,Cause sickness,Waste money",
    "Rest is...|Needed so the body and brain can recover|Lazy,A waste,Bad for grades",
    "Overcommitting means...|Taking on too many things at once|Doing one thing at a time,Sleeping a lot,Eating well",
    "Hobbies that you enjoy can...|Recharge you|Cause burnout always,Take all your energy,Replace sleep",
    "If you feel stuck in burnout, you should...|Talk with a counselor, doctor or trusted adult|Hide it,Work harder,Skip everything"]));
  c.push(L("Safe rides home", "🚦", "A plan made ahead of time makes the safe choice easy.",
    "Always <b>wear your seat belt</b>, in every seat. Never ride with a driver who has used alcohol or drugs. A <b>designated driver</b> is someone who stays completely alcohol-free and drives others. Make a plan for a ride before you go out, and know that you can call a parent or trusted adult for a ride. If you use a rideshare, check that the car and driver match the app and share your trip with someone you trust. Walk with friends in well-lit places at night.",
    "Plan ahead and pick the safer choice.", [
    "Which driver should you never ride with?|One who has used alcohol or drugs|One who wears a seat belt,One who is rested,One who drives slowly",
    "A designated driver is someone who...|Stays alcohol-free and drives others|Drinks and drives,Sleeps in the car,Picks the music",
    "A good time to plan your ride home is...|Before you go out|After you are tired,When it is dark,Never",
    "You need a safe ride. You can...|Call a parent or trusted adult|Walk alone far away,Accept any ride,Drive while tired",
    "Seat belts should be worn...|In every seat on every trip|Only on highways,Only in front,Only on long trips",
    "When using a rideshare, you should...|Check that the car and driver match the app|Get in any car,Share your address publicly,Ignore the plate",
    "When walking at night, it is safest to...|Walk with friends in well-lit places|Walk alone in dark alleys,Wear headphones loudly,Take shortcuts",
    "Sharing your trip details with someone you trust...|Helps them know where you are|Wastes data,Is unsafe,Is rude"]));
  c.push(L("Crisis help numbers", "📞", "Knowing who to call can save time in a crisis.",
    "Call <b>911</b> for immediate danger or a medical emergency. Call or text <b>988</b>, the Suicide and Crisis Lifeline, if you or someone you know is in emotional crisis. It is free, confidential and open 24/7. <b>Poison Control</b> is <b>1-800-222-1222</b> in the United States. If a friend talks about hurting themselves, take it seriously and tell a trusted adult right away. When calling 911, stay on the line and give your location.",
    "Match each number to the situation.", [
    "Which number do you call in the United States for immediate danger?|911|411,611,311",
    "Which number reaches the Suicide and Crisis Lifeline?|988|411,611,711",
    "Poison Control in the United States is...|1-800-222-1222|1-800-000-0000,1-900-123-4567,1-800-111-9999",
    "The 988 lifeline is...|Free and confidential, open 24/7|Only open at night,Paid by the minute,Only for adults",
    "When you call 911 you should...|Stay on the line and give your location|Hang up quickly,Whisper your name only,Call back later",
    "A friend says they want to hurt themselves. You should...|Take it seriously and tell a trusted adult right away|Keep it a secret,Laugh it off,Change the subject",
    "A person swallowed a cleaning product. Who can help fast?|Poison Control or 911|A game forum,A random website,Nobody",
    "Feeling very overwhelmed and unsafe. You can...|Call or text 988|Wait for it to pass alone,Hide it,Ignore it"]));
  c.push(L("Poison and gas safety", "☣️", "Many household items are safe when used right and dangerous when mixed or misused.",
    "Keep cleaners and medicines locked away, in their <b>original containers</b>. Never mix cleaning products, especially <b>bleach and ammonia</b>, because they make toxic gas. <b>Carbon monoxide (CO)</b> is a colorless, odorless gas from fuel-burning equipment. A CO detector warns you. Signs are headache and dizziness. If it alarms, get outside into fresh air and call 911. Never eat wild mushrooms or plants unless an expert says they are safe. Do not make someone vomit unless Poison Control says to.",
    "Think storage, mixing, detectors and who to call.", [
    "Cleaning products should be stored...|Locked away in their original containers|In a juice bottle,Mixed together,Within toddlers' reach",
    "Mixing bleach and ammonia is dangerous because it...|Makes toxic gas|Makes a stronger cleaner,Makes soap,Is harmless",
    "Carbon monoxide is a gas that is...|Colorless and odorless|Bright green,Smelly,Always visible",
    "A device that warns of carbon monoxide is a...|CO detector|Thermometer,Scale,Tape measure",
    "A sign of carbon monoxide poisoning is...|Headache and dizziness|A sneeze,Hunger,A bright rash",
    "If a CO alarm sounds you should...|Get outside to fresh air and call 911|Open a snack,Turn it off and stay,Go to sleep",
    "Wild mushrooms should be...|Eaten only if an expert says they are safe|Eaten if they look nice,Tasted a little,Collected for dinner",
    "After a poison swallowing, you should make someone vomit...|Only if Poison Control tells you to|Always,At once,With salt water"]));
  c.push(L("Medical privacy and records", "🗂️", "Your health information is yours, and there are rules to protect it.",
    "In the United States, a law called <b>HIPAA</b> protects the privacy of your health information. Your care team can see your records, and you can choose who else may. A <b>patient portal</b> lets you see test results and messages, with a private login. Use strong passwords and never share them. You can ask for a copy of your records. Keep a list of your medicines and allergies. At 18 you generally control your own medical records. Do not post private medical details online.",
    "Think who may see it, how to protect it, and what you can ask for.", [
    "HIPAA is a law that protects...|The privacy of health information|Sports rules,School lunches,Road traffic",
    "A patient portal lets you...|See test results and messages with a private login|Post photos publicly,Skip appointments,Pay no bills",
    "Who normally sees your medical records?|Your care team and people you permit|Everyone online,Strangers,Advertisers",
    "A safe habit for a patient portal is...|Using a strong password and not sharing it|Sharing it with friends,Using 1234,Writing it on the door",
    "Can you ask for a copy of your health records?|Yes, you can request them|Never,Only a stranger can,Only at 50",
    "A useful list to keep is...|Your medicines and allergies|Your favorite songs,Your shoe sizes,Game scores",
    "At age 18 you generally...|Control your own medical records|Lose your records,Need a stranger,Cannot see them",
    "Should you post private medical details online?|No, keep them private|Yes, everyone should see,Yes, it is required,Only on Fridays"]));
  c.push(L("Informed consent", "✍️", "You have a right to understand your care and to be part of decisions about it.",
    "<b>Informed consent</b> means you understand a treatment's benefits, risks and options, and then agree to it. You can ask questions, ask for plain language, take time to decide, and get a <b>second opinion</b> from another doctor. Adults can usually refuse a treatment. For minors, parents or guardians usually give consent while the young person's voice still matters. Research studies need consent too. Read forms before you sign.",
    "Ask what it is, why, what are the risks, and what are the other choices.", [
    "Informed consent means...|You understand the benefits and risks and then agree|Someone decides without telling you,You sign without reading,A doctor guesses",
    "You can ask your doctor to...|Explain in plain language|Speak faster,Skip the details,Hide the risks",
    "A second opinion is...|Another doctor's view|A second bill,A nap,A medicine",
    "Adults can usually...|Refuse a treatment|Never ask questions,Be forced to agree,Skip appointments",
    "For a minor, who usually gives consent for care?|A parent or guardian|A stranger,A classmate,Nobody",
    "Before signing a medical form you should...|Read it and ask questions|Sign quickly,Sign without looking,Let someone else sign",
    "Research studies must have...|Consent from participants|Secret tests,Hidden cameras,No rules",
    "A good question to ask a doctor is...|What are the benefits, risks and other options?|What is your favorite color?,Can I skip the rules?,How fast can you talk?"]));
  c.push(L("Overuse injuries", "🏃‍♀️", "Too much of a good thing without rest can hurt.",
    "An <b>overuse injury</b> comes from repeating the same motion too much without enough rest, like shin splints, runner's knee or tennis elbow. Prevent them with rest days, cross-training (varying activities), good technique and shoes that fit. A common guide is to increase training by no more than about <b>10 percent</b> a week. Pain that does not go away is a sign to stop and see a health professional. Sleep helps recovery. Running shoes should be replaced every 300 to 500 miles.",
    "Think rest, variety and slow increases.", [
    "An overuse injury comes from...|Repeating the same motion too much without rest|A single fall,A cold,A sunburn",
    "Shin splints are an example of...|An overuse injury|A virus,A food allergy,A sunburn",
    "Which helps prevent overuse injuries?|Rest days and cross-training|Training the same way every day,Skipping sleep,Ignoring pain",
    "A common guide says to increase training by no more than about...|10 percent a week|100 percent a week,0 percent forever,500 percent",
    "Pain that does not go away means you should...|Stop and see a health professional|Push through it,Ignore it,Double the workout",
    "Doing only one sport all year can...|Raise overuse injury risk|Always prevent injuries,Make bones soft,Stop growth",
    "Sleep helps recovery because...|The body repairs itself during rest|Muscles shrink,It uses no energy,It stops healing",
    "Running shoes should be replaced about every...|300 to 500 miles|3 miles,30 miles,3000 miles"]));
  c.push(L("Food claims and ingredient lists", "🏷️", "The front of a package is advertising. The back tells the facts.",
    "Ingredients are listed from <b>most to least by weight</b>. Front-of-package claims like <b>natural</b> or <b>multigrain</b> do not always mean healthy: multigrain is not the same as whole grain. Low-fat foods may have extra sugar. Serving size matters: compare it to how much you actually eat. A short ingredient list often means less processing. A product made with real fruit can still have very little fruit. Read the Nutrition Facts and ingredients.",
    "Ignore the front slogans and read the back.", [
    "Ingredients on a food label are listed...|From most to least by weight|In alphabetical order,At random,From least to most",
    "A food that says multigrain...|Is not always whole grain|Is always whole grain,Has no grains,Has no sugar",
    "A low-fat food may have...|Extra sugar to keep the taste|Zero calories,No ingredients,No sugar for sure",
    "The word natural on a package...|Does not always mean healthy|Always means healthy,Means no sugar,Is a vitamin",
    "Serving size matters because...|Nutrition numbers are for one serving|It is the price,It is the weight of the box,It is the color",
    "A short ingredient list often means...|The food is less processed|The food is plastic,The food is unsafe,The food has no taste",
    "A product made with real fruit...|May still have very little fruit|Is all fruit,Has no sugar,Is a vegetable",
    "To judge a food, you should read...|The Nutrition Facts and the ingredients|Only the front,Only the color,Only the price"]));
  c.push(L("Caffeine", "☕", "Caffeine is a drug in many drinks, and teens are more sensitive to it than they think.",
    "<b>Caffeine</b> is a stimulant found in coffee, tea, cola, energy drinks and chocolate. Experts suggest teens keep caffeine to about <b>100 mg a day</b> or less. Too much can cause jitters, a fast heartbeat, an upset stomach and trouble sleeping. Caffeine stays in the body for hours, so avoid it in the afternoon. Real energy comes from sleep, food, water and movement. Stopping suddenly can cause a headache.",
    "Think what it is, how much, and what real energy needs.", [
    "Caffeine is a...|Stimulant|Vitamin,Mineral,Bone",
    "Experts suggest teens keep caffeine to about...|100 mg a day or less|1000 mg a day,Unlimited,All they want",
    "Too much caffeine can cause...|Jitters and trouble sleeping|Stronger bones,Better eyesight,Faster growth",
    "Which source of caffeine can be very high?|Large energy drinks|Plain water,Apple slices,Plain milk",
    "Why avoid caffeine in the afternoon?|It stays in your body for hours and can disturb sleep|It makes you shorter,It cures homework,It stains teeth gold",
    "Better ways to get energy are...|Sleep, food, water and movement|More caffeine,Skipping meals,Staying up late",
    "Which of these contains caffeine?|Chocolate|Plain water,A carrot,Plain milk",
    "Stopping caffeine suddenly can cause...|A headache|A rash,Taller height,Stronger sight"]));
  c.push(L("Travel health", "✈️", "A little planning keeps trips healthy and fun.",
    "Check recommended vaccines and travel health advice <b>early</b>, since some need weeks. Carry medicines in their <b>original containers</b> and bring a copy of your medical details. Drink safe or bottled water where tap water is unsafe, and wash your hands often. On long flights, walk and stretch to prevent blood clots. For <b>jet lag</b>, adjust your sleep times gradually. Use sunscreen and insect repellent. Know how to reach local emergency help.",
    "Plan early, pack smart, stay clean, move often.", [
    "When should you check travel health advice?|Early, before the trip|At the airport gate,After you get home,Never",
    "Medicines on a trip should be carried...|In their original containers|Loose in a bag,In a snack bag,Without labels",
    "Where tap water is unsafe, you should drink...|Bottled or treated water|Any water,Ice from tap,Pond water",
    "On a long flight, to protect your blood flow you should...|Walk and stretch|Sit very still,Not drink water,Hold your breath",
    "Jet lag is helped by...|Changing your sleep times gradually|Staying up for days,Skipping meals,Ignoring the clock",
    "Which protects you from the sun on a trip?|Sunscreen|A heavy coat,Soda,A hat made of metal",
    "A traveler should know...|How to reach local emergency help|Nothing about the place,Only the weather,Only the price",
    "A good habit to avoid illness while traveling is...|Washing your hands often|Never washing,Sharing cups,Touching your face"]));
  c.push(L("Safe shared living", "🏠", "Whether it is dorms, apartments or family, shared spaces need shared rules.",
    "In shared homes <b>lock doors and windows</b>, test smoke alarms and know your exits. Agree on <b>chores and quiet hours</b> early and talk about problems before they grow. Do not share personal items like toothbrushes and razors. Label food in a shared fridge and keep it clean. Know who is coming over. Keep emergency numbers handy and save your address so you can tell it quickly.",
    "Think safety, respect and clear agreements.", [
    "In a shared home you should keep doors and windows...|Locked when needed|Open all night,Broken,Hidden",
    "Smoke alarms in a shared home should be...|Tested regularly|Covered up,Removed,Never touched",
    "Chores and quiet hours should be...|Agreed on early|Ignored,Decided in secret,Changed each hour",
    "Which item should you not share with a roommate?|A toothbrush|A board game,A pizza,A pillowcase",
    "In a shared fridge you should...|Label your food|Hide it under the bed,Throw out others' food,Never clean it",
    "If a problem comes up with a roommate you should...|Talk about it calmly early|Wait months,Say nothing,Shout",
    "It helps to know your address so you can...|Tell emergency help quickly|Order pizza only,Hide it,Make a poster",
    "Visitors should be...|People you know and agreed to have over|Anyone who knocks,Strangers,Hidden in closets"]));
  c.push(L("Fitness trackers and data", "⌚", "Trackers can motivate you, but they have limits.",
    "Fitness trackers use a motion sensor to estimate steps and sensors to estimate heart rate and sleep. They give <b>estimates</b>, not exact medical measurements. They are best for <b>trends over time</b>. Your data is personal: check which apps can see it and turn off location sharing you do not need. Don't let numbers cause stress or push you to exercise when hurt. If a number worries you, talk to a doctor.",
    "Useful for trends, not perfect, and private.", [
    "Fitness trackers give mostly...|Estimates|Perfect medical results,Exact diagnoses,Magic answers",
    "Trackers are best for seeing...|Trends over time|One perfect number,Medical diagnoses,Your future",
    "A step counter works with a...|Motion sensor|Microwave,Thermometer,Compass only",
    "To protect your data you should...|Check which apps can see it|Share it publicly,Post it everywhere,Ignore settings",
    "Location sharing from a tracker should be...|Turned off if you do not need it|Always on for strangers,Posted online,Required",
    "A tracker shows a worrying number. You should...|Talk to a doctor|Panic and ignore friends,Throw it away,Ignore for years",
    "If you are hurt, you should...|Rest instead of chasing step goals|Do extra steps,Hide the pain,Ignore the injury",
    "Competing on fitness apps should not...|Cause stress or unsafe exercise|Be fun,Be social,Track fun"]));
  c.push(L("SMART health goals", "🎯", "Clear goals are easier to reach than vague ones.",
    "A <b>SMART</b> goal is <b>S</b>pecific, <b>M</b>easurable, <b>A</b>chievable, <b>R</b>elevant and <b>T</b>ime-bound. Get healthier is vague. Walk 30 minutes, 5 days a week, for 4 weeks is SMART. Break big goals into small steps, track your progress, celebrate wins and adjust if needed. Share your goals with a supportive person.",
    "Look for a number and a deadline.", [
    "In SMART, the S stands for...|Specific|Silly,Sleepy,Sugary",
    "In SMART, the M stands for...|Measurable|Magic,Messy,Mild",
    "In SMART, the T stands for...|Time-bound|Tiny,Tired,Tasty",
    "Which goal is SMART?|Walk 30 minutes, 5 days a week, for 4 weeks|Get healthier someday,Be better,Try harder",
    "Which goal is NOT specific?|Eat better|Eat 2 fruits every day this week,Sleep 8 hours on school nights,Drink 6 cups of water a day",
    "Breaking a big goal into small steps makes it...|Easier to reach|Harder,Boring forever,Impossible",
    "Tracking progress helps you...|See how far you have come|Forget the goal,Give up,Skip steps",
    "If a goal turns out to be too hard, you can...|Adjust it|Quit forever,Hide it,Add more pressure"]));
  c.push(C("Grocery budget", "💵", "Budgets help you keep track of how much is left to spend.",
    "A budget is a plan for your money. Add up what you spent, then <b>subtract</b> from the budget to see what is left.",
    "Add the costs first, then subtract from the budget.",
    () => {
      const bu = pick([50, 60, 70, 80]), x = ri(10, 20), y = ri(10, 20);
      return [`Leo has a $${bu} food budget for the week. He bought produce for $${x} and protein for $${y}. How many dollars does he have left?`, bu - x - y,
        "He has spent some of his budget. First find how much he spent in all.", "Add the two costs and subtract that total from the budget.",
        "Example: a $9 budget with purchases of $2 and $3 is $5 spent, and 9 - 5 = $4 left.", "🛒"];
    }));
  c.push(C("Caffeine totals", "☕", "Adding the caffeine from drinks shows how much you have had.",
    "Use about <b>47 mg</b> for a cup of tea and about <b>34 mg</b> for a can of cola. Multiply the amount per drink by how many drinks, then add the totals. Experts suggest teens stay under about 100 mg a day.",
    "Multiply each drink, then add.",
    () => {
      const t = ri(1, 2), cl = ri(1, 3);
      return [`A cup of tea has about 47 mg of caffeine and a can of cola about 34 mg. How many mg are in ${t} cup${t > 1 ? "s" : ""} of tea and ${cl} can${cl > 1 ? "s" : ""} of cola?`, 47 * t + 34 * cl,
        "Work out the tea and the cola separately.", "Multiply the mg by the number of drinks for each kind, then add the two results.",
        "Example: 2 coffees of 95 mg each is 190, and 1 energy drink of 80 mg makes 190 + 80 = 270 mg.", "☕"];
    }));
  c.push(C("Weekly activity minutes", "🚴", "Adults are advised to get 150 minutes of moderate activity each week.",
    "A common health goal for adults is <b>150 minutes</b> of moderate activity a week. Multiply days by minutes to find what you did, then subtract it from 150 to find how many more minutes you need.",
    "Multiply, then subtract from the goal.",
    () => {
      const d = ri(3, 5), m = ri(15, 25);
      return [`The weekly goal is 150 minutes of activity. Ben walked ${d} days for ${m} minutes each day. How many more minutes does he need?`, 150 - d * m,
        "First find how many minutes he has already done in total.", "Multiply the days by the minutes per day, then subtract that from the goal.",
        "Example: 4 days of 10 minutes is 40 minutes, and 150 - 40 = 110 more minutes.", "🚶"];
    }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 2, 3, 5, 7, 8, 9, 10, 12, 14, 15])));
  c.push(MIX("Level 24 Challenge", pk(c, [4, 6, 11, 13, 16, 17, 12, 9, 5, 2, 1, 0])));

  Object.assign(HEALTH_LEVELS, { 22: a, 23: b, 24: c });
})();
