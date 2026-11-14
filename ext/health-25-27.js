// ext/health-25-27.js  Health & Safety levels 25-27 (12th grade, College year 1 first half)
(() => {
  // item format: "question|answer|wrong1,wrong2,wrong3"
  const L = (title, v, intro, key, tip, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p.slice(2).join(",").split(/,(?=\S)/), v: "" }; });
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

  // ================= LEVEL 25 =================
  const a = [];
  a.push(L("Energy systems and ATP", "⚡", "Every move you make runs on a tiny energy molecule. Different systems supply it for different lengths of effort.",
    "Cells use <b>ATP</b> as their direct energy. For a quick burst of about ten seconds, muscles use stored ATP and <b>phosphocreatine</b> (the ATP-PC system), which needs no oxygen. For longer efforts, the <b>aerobic system</b> uses oxygen to make lots of ATP in cell parts called <b>mitochondria</b>. <b>Anaerobic</b> means without oxygen.",
    "Match the length of the effort (seconds, minutes, or hours) to the energy system.", [
    "The molecule cells use as direct, quick energy is...|ATP|DNA,Insulin,Fiber",
    "A sprint of about ten seconds mostly uses the...|Phosphocreatine (ATP-PC) system|Aerobic system,Digestive system,Reflex system",
    "The system that uses oxygen to make lots of energy in long, steady exercise is the...|Aerobic system|ATP-PC system,Reflex system,Skin system",
    "Cells make most of their ATP in tiny structures called...|Mitochondria|Ribosomes,Nuclei,Platelets",
    "Anaerobic means...|Without oxygen|With extra oxygen,With water,With rest",
    "A marathon runner relies mostly on which system?|Aerobic|ATP-PC,Reflex,Skeletal",
    "Which activity is mostly powered by a quick burst that does not need oxygen?|A 50-meter sprint|A two-hour hike,A long easy swim,A slow bike tour",
    "Why can't you sprint at full speed for very long?|The quick energy stores run out within seconds|The heart stops needing blood,Muscles turn into fat,The lungs fill with bone"]));
  a.push(L("Progressive overload", "🏋️", "To get stronger, muscles need a challenge that grows a little at a time.",
    "<b>Progressive overload</b> means gradually raising the demand on your muscles, with more weight, reps or sets. Muscles grow (<b>hypertrophy</b>) while you <b>recover</b>, with enough sleep and protein. Muscles that are not used shrink (<b>atrophy</b>). Adults are advised to do muscle-strengthening on <b>2 or more days</b> a week. Good form protects joints, and sharp pain means stop.",
    "Think: small steps up, rest to rebuild, and stop for sharp pain.", [
    "Gradually increasing the demand on your muscles over time is called...|Progressive overload|Detraining|Cross-training,Warm-up",
    "Muscles grow stronger mainly during...|Rest and recovery with enough protein|Training with no sleep|Skipping meals,Stretching only",
    "The increase in the size of muscle fibers is called...|Hypertrophy|Atrophy|Osmosis,Reflex",
    "Muscles shrinking from lack of use is called...|Atrophy|Hypertrophy|Overload,Reflex",
    "A safe way to apply overload is to...|Add a little weight or reps over several weeks|Double the weight in one day|Ignore pain,Never change the workout",
    "Why is good form important when lifting?|It protects joints and works the right muscles|It makes weights lighter|It replaces a warm-up,It is only for looks",
    "Guidelines suggest muscle-strengthening on how many days a week?|Two or more|Once a month|Every day with no rest,Never",
    "You feel a sharp pain during a lift. What should you do?|Stop and rest or get advice|Push harder|Add more weight,Ignore it"]));
  a.push(L("Exercise intensity", "🗣️", "How hard are you working? You can tell without any gadgets.",
    "<b>Talk test:</b> if you can talk but not sing, the effort is <b>moderate</b>. If you can only say a few words before a breath, it is <b>vigorous</b>. The <b>RPE</b> scale (rating of perceived exertion) rates effort from 0 to 10; about 5 to 6 is moderate and 7 to 8 is vigorous. <b>75 minutes</b> of vigorous activity counts about the same as <b>150 minutes</b> of moderate activity.",
    "Use the talk test and the 0 to 10 effort scale. Dizziness or chest pain means stop.", [
    "You can talk but not sing while exercising. The intensity is...|Moderate|Very light,Maximal,Resting",
    "You can only say a few words before you need a breath. The intensity is...|Vigorous|Very light,Light,Resting",
    "On a 0 to 10 effort scale, a 5 or 6 is usually...|Moderate|Resting,Maximum,Very light",
    "RPE stands for...|Rating of perceived exertion|Rate of pulse energy,Rest period exercise,Rapid protein effect",
    "Which activity is moderate for most people?|Brisk walking|Sprinting uphill,Resting on a couch,Reading a book",
    "75 minutes of vigorous activity counts about the same as...|150 minutes of moderate activity|30 minutes of moderate activity,60 minutes of moderate activity,75 minutes of light activity",
    "Your usual walk gets easy as you get fitter. To keep improving you should...|Gradually raise the effort|Stay exactly the same,Stop moving,Only rest",
    "You feel dizzy or have chest pain while exercising. What now?|Stop and get help|Run faster,Push through it,Add weight"]));
  a.push(L("Bone density", "🦴", "Bones are living tissue. The bone you build now has to last your whole life.",
    "You build most of your bone before your <b>late 20s</b>; this is called <b>peak bone mass</b>. Later, weak, porous bones are called <b>osteoporosis</b>. <b>Weight-bearing activity</b> such as walking, jumping and lifting builds bone. <b>Calcium</b> (adults 19 to 50 need about 1000 mg a day) and <b>vitamin D</b> (which helps absorb calcium) matter too.",
    "Think: build early, move your weight, feed bones calcium and vitamin D.", [
    "Bone mass usually peaks around the...|Late 20s|Age 8,Age 45,Age 70",
    "Weak, porous bones in later life are called...|Osteoporosis|Scurvy,Asthma,Anemia",
    "Which activity builds bone best?|Weight-bearing exercise like walking or jumping|Lying in bed,Sitting for hours,Eating nothing",
    "Which vitamin helps the body absorb calcium?|Vitamin D|Vitamin C,Vitamin B12,Vitamin A",
    "Good calcium sources include...|Dairy foods and fortified plant milks|Candy and soda,Plain white rice,Cooking oil",
    "The teen and young adult years matter for bones because...|You build the bone you will rely on for life|Bones never change,Bones only grow in old age,Bones stop needing care at 12",
    "Which habit can weaken bones over time?|Being inactive for years|Walking daily,Eating enough calcium,Lifting light weights",
    "Adults aged 19 to 50 need about how much calcium a day?|1000 mg|100 mg,10 mg,5000 mg"]));
  a.push(L("Macronutrient ranges", "🥗", "Experts give a healthy range for how much of your calories come from each macronutrient.",
    "The <b>Acceptable Macronutrient Distribution Range (AMDR)</b> for adults is about <b>45 to 65%</b> of calories from carbohydrate, <b>20 to 35%</b> from fat and <b>10 to 35%</b> from protein. Carbohydrate and protein give about <b>4 calories per gram</b>, fat gives <b>9</b>, and water gives none. A range is used because people differ in age, size and activity.",
    "Recall the three ranges and the calories in a gram of each.", [
    "The AMDR range for carbohydrate is about...|45 to 65 percent of calories|5 to 10 percent,90 to 100 percent,Exactly 0 percent",
    "The AMDR range for fat is about...|20 to 35 percent of calories|0 percent,60 to 70 percent,80 to 90 percent",
    "The AMDR range for protein is about...|10 to 35 percent of calories|0 to 1 percent,70 to 90 percent,60 to 80 percent",
    "AMDR stands for...|Acceptable Macronutrient Distribution Range|Average Meal Daily Rule,Allowed Minimum Diet Ratio,Added Mineral Dose Range",
    "Which macronutrient gives 9 calories per gram?|Fat|Carbohydrate,Protein,Water",
    "Carbohydrate and protein each give about how many calories per gram?|4|9,0,12",
    "How many calories does plain water give?|Zero|Four,Nine,Twelve",
    "Why is a range used instead of one number?|People differ in age, size and activity|Everyone needs the exact same amount|Food has no calories,Nobody needs protein"]));
  a.push(L("Glycemic index", "📈", "Not all carbohydrates raise your blood sugar at the same speed.",
    "The <b>glycemic index (GI)</b> ranks carbohydrate foods by how fast they raise <b>blood sugar</b>, compared with pure glucose. Foods like lentils, oats and most fruit have a lower GI. White bread and sugary drinks tend to be higher. Fiber, protein and healthy fat slow the rise. GI is only part of the picture: portion size and nutrients matter too.",
    "Fast rise means high GI. Fiber and protein slow things down.", [
    "The glycemic index ranks foods by how quickly they raise...|Blood sugar|Heart rate,Body temperature,Height",
    "Which food usually has a lower GI?|Lentils|Plain white bread,Glucose candy,Instant mashed potatoes",
    "Which food usually has a higher GI?|White bread|Lentils,Chickpeas,Almonds",
    "Adding fiber, protein or healthy fat to a carb meal tends to...|Slow the rise in blood sugar|Make it spike faster,Remove all calories,Turn carbs into vitamins",
    "Low-GI foods tend to give energy that is...|Steadier for longer|Spiking then crashing,Exactly like candy,Unrelated to food",
    "Whole fruit usually raises blood sugar more slowly than juice because of its...|Fiber|Salt,Packaging,Color",
    "GI is measured by comparing a food with...|Pure glucose|Water,Salt,Olive oil",
    "GI is only part of the picture because...|Portion size and nutrients matter too|Calories do not matter,All foods have the same GI,It replaces food labels"]));
  a.push(L("Dietary patterns", "🫒", "Health comes from your whole eating pattern, not one food.",
    "The <b>Mediterranean</b> pattern stresses vegetables, fruit, whole grains, beans, fish and olive oil. The <b>DASH</b> plan (Dietary Approaches to Stop Hypertension) helps lower <b>blood pressure</b>. <b>Vegetarians</b> avoid meat and fish; <b>vegans</b> avoid all animal products and need a reliable source of <b>vitamin B12</b>. Judge a diet by the overall pattern over weeks and months.",
    "Think of the big picture: lots of plants, less salt and sugar, steady habits.", [
    "The Mediterranean pattern emphasizes...|Plants, fish and olive oil|Daily fried foods,Mostly sweets,Only red meat",
    "The DASH eating plan was designed to help lower...|Blood pressure|Shoe size,Height,Vision",
    "Vegetarians generally avoid...|Meat and fish|Vegetables,Fruit,Grains",
    "Vegans avoid...|All animal products|Only fish,Only fruit,Only red meat",
    "A vegan diet needs a reliable source of vitamin...|B12|C,E,K",
    "A good eating pattern is best judged by...|The overall pattern over weeks and months|One single meal,One single nutrient,A food ad",
    "What do DASH and Mediterranean patterns share?|Plenty of fruits and vegetables|Daily sugary drinks,Mostly fried foods,Skipping all fiber",
    "Which is a plant-based protein?|Beans or tofu|Butter,Sugar,Lard"]));
  a.push(L("Stages of change", "🔄", "Changing a habit takes time. People move through stages, and advice works best when it fits the stage.",
    "The <b>stages of change</b> model has five steps: <b>precontemplation</b> (not thinking about it), <b>contemplation</b> (thinking about it), <b>preparation</b> (planning), <b>action</b> (doing it) and <b>maintenance</b> (keeping it up for about six months or more). Slips are a normal part of change: learn from them and restart.",
    "Ask: is the person not thinking, thinking, planning, doing, or keeping it up?", [
    "A person who is not yet thinking about changing a habit is in...|Precontemplation|Action,Maintenance,Preparation",
    "A person who is thinking about changing but feels unsure is in...|Contemplation|Precontemplation,Maintenance,Action",
    "Buying walking shoes and picking a start date is the stage of...|Preparation|Precontemplation,Maintenance,Contemplation",
    "Actively doing the new habit is the stage of...|Action|Contemplation,Precontemplation,Preparation",
    "Keeping a new habit going for six months or more is...|Maintenance|Precontemplation,Preparation,Contemplation",
    "A slip back to old habits is best seen as...|A common part of change to learn from|Proof you can never change,The end of all progress,A reason to quit forever",
    "Which step helps most when someone is in contemplation?|Weighing the pros and cons|Running a marathon tomorrow,Ignoring the issue,Giving up",
    "Matching help to a person's stage works because...|Advice fits where the person is now|Everyone is at the same stage,Stages never change,It removes the need for effort"]));
  a.push(L("Self-efficacy", "💪", "Believing you can do something makes you more likely to try, and to keep going.",
    "<b>Self-efficacy</b> is your belief that you can do a task. You build it by <b>small wins</b>, by <b>watching a similar person succeed</b>, by <b>encouragement</b> from people you trust, and by managing stress. Low self-efficacy makes people avoid challenges. Breaking a big goal into small steps and <b>tracking your progress</b> gives real evidence that you can do it.",
    "Small wins, role models, encouragement, and progress you can see.", [
    "Self-efficacy means...|Your belief that you can do something|Your shoe size,A kind of reflex,Your blood type",
    "Which builds self-efficacy most?|Finishing small tasks successfully|Avoiding every challenge,Comparing yourself to others only,Waiting for luck",
    "Watching someone like you succeed can raise your confidence. This is called...|Vicarious experience|Overload,Detraining,Hypertrophy",
    "Encouragement from people you trust helps through...|Verbal persuasion|The silent treatment,A reflex,Digestion",
    "Low self-efficacy often leads people to...|Avoid challenges|Seek harder goals,Celebrate failures,Try more risks",
    "To build confidence for a big goal you should...|Break it into small steps you can finish|Make it as huge as possible,Never track progress,Wait for motivation",
    "Keeping a progress log helps because it...|Shows real evidence of your wins|Removes the need for goals,Hides mistakes,Ends practice",
    "After a setback, a helpful thought is...|I can learn from this and try again|I always fail,Nothing I do matters,I should never try"]));
  a.push(L("Types of social support", "🤝", "People who care about you are a real health factor.",
    "Social support comes in kinds: <b>emotional</b> (listening and caring), <b>informational</b> (advice and facts), <b>practical</b> (help like a ride or a meal) and <b>encouragement and feedback</b>. Strong support is linked with better coping and health. Giving support also helps you. Clubs, study groups and trusted friends and family build a network. Asking for help is a strength.",
    "Ask: was it caring words, facts, practical help, or encouragement?", [
    "A friend listens kindly after your hard day. This is...|Emotional support|Informational support,Practical support,No support",
    "A classmate drives you to the clinic. This is...|Practical support|Emotional support,Informational support,Feedback support",
    "A nurse explains how to take your medicine. This is...|Informational support|Emotional support,Practical support,No support",
    "A coach says you are improving and shows you how. This is...|Encouragement and feedback|Practical support,Informational support only,No support",
    "Strong social support is linked with...|Better coping and health|More illness,Worse recovery,No effect ever",
    "Which is a healthy way to build support?|Join a club or study group|Avoid everyone,Hide your struggles,Only chat with people you never met",
    "Asking for help shows...|Strength and good judgment|Weakness,Failure,Selfishness",
    "Supporting other people can also...|Help your own wellbeing|Make you sick,Lower your sleep,Ruin friendships"]));
  a.push(L("Sleep and memory", "💤", "Sleep is when your brain files away what you learned.",
    "During sleep the brain strengthens new memories, called <b>memory consolidation</b>. Deep slow-wave sleep and <b>REM</b> sleep both help learning. Adults aged 18 to 25 need about <b>7 to 9 hours</b>. Studying in spaced sessions with sleep between them beats an all-nighter. A short nap of about <b>20 minutes</b> can boost alertness without leaving you groggy.",
    "Think: study, sleep, then recall. A steady schedule helps.", [
    "During sleep the brain strengthens new memories. This is called...|Consolidation|Subtraction,Erosion,Combustion",
    "Adults aged 18 to 25 generally need about how many hours of sleep?|7 to 9|3 to 4,11 to 13,14 to 16",
    "What is best the night before an exam?|A normal night of sleep after studying|An all-nighter,Two hours of sleep,Energy drinks instead of sleep",
    "Studying in spaced sessions with sleep between them usually...|Helps memory more than cramming|Hurts memory,Does nothing,Erases notes",
    "Deep slow-wave sleep and REM sleep both...|Support learning and memory|Are a waste of time,Only happen in naps,Cause illness",
    "Not getting enough sleep makes it harder to...|Focus and remember|Hear far away,See colors,Grow taller",
    "A steady sleep schedule helps because it...|Keeps your body clock regular|Stops all dreaming,Replaces eating,Lowers your height",
    "A nap of about 20 minutes can...|Boost alertness without much grogginess|Replace a night of sleep,Cure illness,Make you sleepy for days"]));
  a.push(L("Sitting less, moving more", "🪑", "Long hours in a chair are a health risk by themselves, even for people who exercise.",
    "Long unbroken <b>sedentary</b> time is linked to higher risk of heart disease and type 2 diabetes. Break it up about every <b>30 minutes</b> with a short walk or stretch, a <b>movement snack</b>. A short walk after a meal helps muscles use blood sugar. Adults are advised <b>150 to 300 minutes</b> of moderate activity a week plus muscle-strengthening on 2 or more days.",
    "Break up the sitting often, and add real exercise on top.", [
    "Long unbroken sitting is linked to higher risk of...|Heart disease and type 2 diabetes|Stronger bones,Better vision,Taller height",
    "A good rule is to break up sitting about every...|30 minutes|8 hours,3 days,2 months",
    "A movement snack is...|A short burst of activity such as a walk or stretch|A candy bar,A big meal,A nap",
    "Which counts as sedentary behavior?|Sitting while watching videos|Brisk walking,Cycling,Climbing stairs",
    "A standing desk helps most when you also...|Change positions and keep moving|Stand still for 8 hours,Skip all breaks,Avoid walking",
    "A short walk after a meal can help your muscles...|Use up blood sugar|Stop digesting,Store more sugar,Skip fiber",
    "A weekly goal for adults is about how many minutes of moderate activity?|150 to 300|10,1000,0",
    "Does regular exercise cancel the risk of sitting all day?|Not completely, so break up sitting too|Yes always,Sitting is harmless,Only for kids"]));
  a.push(L("Using a pharmacy wisely", "💊", "Living on your own means managing your own medicine.",
    "A <b>generic</b> medicine has the same <b>active ingredient</b> as the brand name and usually costs less. <b>Over-the-counter (OTC)</b> medicines need no prescription; others do. Take medicine <b>exactly as directed</b>, never share prescriptions, and use take-back programs or label directions for leftovers. A <b>pharmacist</b> can answer questions. Read active ingredients so you do not double up.",
    "Check the active ingredient, follow the label, and ask the pharmacist.", [
    "A generic medicine has the same ___ as the brand name.|Active ingredient|Label color,Package shape,Advertisement",
    "Generic medicines are usually...|Cheaper|More expensive,Illegal,Unregulated",
    "A medicine you can buy without a prescription is called...|Over-the-counter|Prescription-only,Banned,Experimental",
    "Who can answer questions about medicine mixing at the store?|The pharmacist|The cashier,A stranger online,An advertiser",
    "You should take a prescription...|Exactly as directed|Whenever you feel like it,Doubled if you feel worse,With a friend's pills",
    "Leftover prescription medicine should be...|Disposed of using a take-back program or label directions|Shared with a friend,Saved for next year,Mixed into food",
    "Before using a new OTC medicine you should read...|The active ingredients, dose and warnings|Only the color,Only the price,The brand slogan",
    "Two cold remedies may share the same ingredient. The safe step is to...|Check the labels and ask the pharmacist|Take double,Ignore the labels,Guess"]));
  a.push(L("Adult vaccines and boosters", "💉", "Vaccines are not only for little kids. Some protection needs a top-up.",
    "A <b>Td or Tdap</b> booster against tetanus is recommended about every <b>10 years</b>. Tetanus bacteria get in through cuts and wounds. The <b>flu</b> shot is yearly because flu viruses change. <b>MMR</b> protects against measles, mumps and rubella. Keep your records in a personal or digital health record. Colleges often ask for proof of required vaccines. People who cannot be vaccinated are protected when others are.",
    "Think: boosters, yearly flu shots, and keeping records.", [
    "A Td or Tdap tetanus booster is recommended about every...|10 years|Week,50 years,Month",
    "The flu vaccine is recommended...|Every year|Once in a lifetime,Every 20 years,Never",
    "The flu shot is updated yearly because...|Flu viruses change often|The shot lasts one day,Weather changes,People forget how to make antibodies",
    "Tetanus bacteria usually enter the body through...|Cuts or wounds|Coughs and sneezes,Shared cups,Mosquito bites",
    "MMR protects against measles, mumps and...|Rubella|Rabies,Rickets,Ringworm",
    "Where should you keep your vaccine records?|In a personal or digital health record|Nowhere,Only in memory,In a public post",
    "Before college, many schools ask for proof of...|Required vaccinations|Shoe size,Favorite food,Pet names",
    "People who cannot get a vaccine for medical reasons are protected mainly when...|Others around them are vaccinated|They eat dairy,They wear lucky charms,They take vitamins"]));
  a.push(L("Lifting and back health", "🧰", "A strong back starts with smart habits.",
    "When lifting, <b>bend your knees</b>, keep the load <b>close</b> to your body, keep your back straight and avoid twisting. Strong <b>core</b> muscles support the spine. Most low back pain gets better within weeks, and <b>gentle movement</b> helps more than days of bed rest. Use both backpack straps, and break up long sitting. Weakness or numbness in a leg after back pain needs a doctor.",
    "Think: knees, close, no twist, keep moving.", [
    "When lifting a heavy box, you should...|Bend your knees and keep it close|Bend at the waist with straight legs,Twist while lifting,Jerk it up fast",
    "Core muscles help to...|Support the spine|Grow hair,Pump blood,Taste food",
    "Most episodes of low back pain...|Improve within weeks with gentle activity|Always need surgery,Mean a broken bone,Last forever",
    "For most back pain, days of bed rest are...|Not recommended; gentle movement helps|The best cure,Required,Needed by everyone",
    "Twisting while lifting or carrying...|Increases strain on the back|Is always best,Lowers the risk,Has no effect",
    "Which sign after back pain needs a doctor?|Weakness or numbness in a leg|Mild stiffness after sleeping,Feeling a bit tired,Being hungry",
    "The best way to carry a backpack is...|Using both straps|On one shoulder only,Hanging from your neck,By one finger",
    "To protect your back during long sitting you should...|Take short movement breaks|Stay in one position,Slouch,Never stretch"]));
  a.push(L("Bias and sample size", "🔍", "Not every study deserves the same trust. Good questions help you decide.",
    "A very <b>small sample</b> may not represent everyone. <b>Random selection</b> gives everyone an equal chance to be chosen. <b>Selection bias</b> happens when the people studied are not typical, for example a survey sent only to a gym's fans. <b>Volunteer bias</b> means people who choose to join may differ from those who do not. A <b>conflict of interest</b> means a sponsor could benefit from certain results.",
    "Ask: how many people, how were they picked, and who paid?", [
    "A study of only 5 people is a problem because...|It is too small to represent everyone|It is too large,It has no bias at all,It is random",
    "Random selection means...|Everyone has an equal chance of being chosen|Only friends are picked,Only volunteers are picked,Only experts are picked",
    "A survey sent only to a gym's fans on social media may show...|Selection bias|Perfect accuracy,Randomization,Blinding",
    "Larger samples generally reduce the effect of...|Random chance|Facts,Common sense,Honest answers",
    "A conflict of interest means...|A researcher or sponsor could benefit from certain results|Two researchers disagree,A study has no funding,A sample is too small",
    "People who volunteer for a study may differ from people who...|Do not volunteer|Run labs,Write reports,Pay for it",
    "Results from mice may not apply to people because...|Species differ in many ways|Mice are bigger,Mice never get sick,Labs are too clean",
    "Which is a sign of a trustworthy study?|Clear methods and a good-sized sample|A dramatic headline,One testimonial,A paid celebrity"]));
  a.push(C("Protein needs", "🍗", "The recommended daily protein for most adults is 0.8 grams for every kilogram of body weight.",
    "<b>RDA for protein: 0.8 g per kg</b> of body weight each day. Multiply the weight in kilograms by 0.8. Athletes and growing teens may need more, so ask a professional. Foods like beans, eggs, fish, dairy and tofu supply protein.",
    "Weight in kg times 0.8.",
    () => {
      const w = pick([50, 55, 60, 65, 70, 75, 80, 85, 90]), n = pick(["Mia", "Leo", "Ava", "Sam", "Zoe", "Max"]);
      return [`The RDA for protein is 0.8 grams per kilogram. ${n} weighs ${w} kg. How many grams of protein does ${n} need per day?`, w * 4 / 5,
        "Find the grams of protein for every kilogram, then think about how many kilograms there are.", "Multiply the body weight in kilograms by 0.8.",
        "Example: a person of 15 kg would need 15 x 0.8 = 12 grams.", "🍗"];
    }));
  a.push(C("Budget percentages", "💵", "Financial stress can hurt health. A simple budget uses percentages of your income.",
    "To find a percentage of a number, turn the percent into a fraction of 100. For example 10% means 10 out of every 100. Divide the income by 100, then multiply by the percent. Planning for food, health costs and savings reduces money stress.",
    "Income divided by 100, times the percent.",
    () => {
      const inc = ri(12, 30) * 100, p = pick([5, 10, 15, 20]);
      return [`A student earns $${inc} a month and plans to put ${p}% toward food and health costs. How many dollars is that?`, inc * p / 100,
        "Find out what 1 percent of the income is first.", "Divide the income by 100 to get 1 percent, then multiply by the percent.",
        "Example: 10% of $300 is $30, because 300 / 100 = 3 and 3 x 10 = 30.", "💵"];
    }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 14, 15, 16, 17])));
  a.push(MIX("Level 25 Challenge", pk(a, [7, 9, 12, 13, 15, 16, 17, 4, 2, 10, 5, 0])));

  // ================= LEVEL 26 =================
  const b = [];
  b.push(L("Epidemiology words", "📊", "Epidemiology is the science of how diseases spread and who they affect.",
    "<b>Incidence</b> is the number of <b>new</b> cases in a period. <b>Prevalence</b> is <b>all existing</b> cases at one time. An <b>outbreak</b> is a sudden rise above the expected number of cases. A disease is <b>endemic</b> when it is steadily present in an area, an <b>epidemic</b> is a large rise across a region, and a <b>pandemic</b> spreads across many countries. <b>Rates</b> per 100000 people let us compare places of different sizes.",
    "New cases means incidence. All cases means prevalence. Wider spread means a bigger word.", [
    "The number of NEW cases in a period is the...|Incidence|Prevalence,Endemic level,Mortality",
    "All existing cases (new and old) at one point in time are the...|Prevalence|Incidence,Outbreak,Vector",
    "A disease that is steadily present at a usual level in an area is...|Endemic|Pandemic,Eradicated,Sporadic",
    "A disease spreading across many countries around the world is a...|Pandemic|Cluster,Endemic disease,Vector",
    "A sudden rise above the expected number of cases is called an...|Outbreak|Immunity,Fortification,Incubation",
    "Epidemiology studies...|How diseases are spread and caused in populations|Only one patient's bones,Only drug prices,Only plant genes",
    "Why is the prevalence of a long-term condition usually larger than its yearly incidence?|Existing cases build up over the years|People are cured in a day,New cases are impossible,Prevalence ignores older cases",
    "Rates per 100000 people are used because they...|Allow fair comparison between places of different sizes|Make the numbers bigger,Hide the data,Replace counting"]));
  b.push(L("Three levels of prevention", "🛡️", "Prevention can happen before, early in, or after a disease.",
    "<b>Primary</b> prevention stops a problem before it starts, such as vaccines, seat belts and handwashing. <b>Secondary</b> prevention finds disease early, such as blood pressure checks and screening tests. <b>Tertiary</b> prevention manages an existing disease to reduce harm, such as rehabilitation after a stroke.",
    "Before it starts is primary. Early detection is secondary. Managing existing illness is tertiary.", [
    "Getting a vaccine is an example of...|Primary prevention|Secondary prevention,Tertiary prevention,No prevention",
    "A routine blood pressure check that catches a problem early is...|Secondary prevention|Primary prevention,Tertiary prevention,No prevention",
    "Cardiac rehabilitation after a heart attack is...|Tertiary prevention|Primary prevention,Secondary prevention,No prevention",
    "A seat belt law is mostly...|Primary prevention|Secondary prevention,Tertiary prevention,No prevention",
    "Physical therapy after a stroke to regain skills is...|Tertiary prevention|Primary prevention,Secondary prevention,No prevention",
    "Hearing screening for newborns is...|Secondary prevention|Primary prevention,Tertiary prevention,No prevention",
    "A school handwashing program is...|Primary prevention|Secondary prevention,Tertiary prevention,No prevention",
    "The goal of tertiary prevention is to...|Reduce harm and improve life with an existing disease|Prevent illness from ever starting,Find disease in healthy people,Stop all deaths"]));
  b.push(L("Social determinants of health", "🏘️", "Your health depends on much more than doctor visits.",
    "<b>Social determinants of health</b> are the conditions where people are born, live, learn, work and age. They include <b>housing, income, education, safe neighborhoods, access to healthy food, transportation and social support</b>. A neighborhood without fresh food stores is a <b>food desert</b>. These factors can affect health as much as or more than medical care alone.",
    "If it is about where and how people live, learn and work, it is social.", [
    "Conditions where people are born, live, learn, work and age are called...|Social determinants of health|Genetic tests,Medical devices,Insurance forms",
    "Which is a social determinant of health?|Safe, stable housing|Eye color,Blood type,Shoe size",
    "A neighborhood with no store selling fresh food is called a...|Food desert|Food chain,Food label,Food pyramid",
    "Education connects to health because it relates to...|Income, job options and health knowledge|Eye color,Eyesight only,Nothing",
    "Safe sidewalks and parks support health by...|Making physical activity easier|Spreading germs,Removing sleep,Raising salt",
    "Reliable transportation matters because it helps people...|Reach clinics, jobs and food|Avoid vitamins,Hear better,Grow taller",
    "Which is NOT a social determinant of health?|Eye color|Neighborhood safety,Education,Housing",
    "Social and environmental factors affect health...|As much as or more than medical care alone|Not at all,Only in big cities,Only in old age"]));
  b.push(L("Health equity", "⚖️", "Fair health means giving people what they need, not the same thing.",
    "<b>Equality</b> gives everyone the same. <b>Equity</b> gives each person what they need to reach a fair outcome. <b>Health disparities</b> are preventable differences in health between groups. Examples of equity: clinics in neighborhoods far from hospitals, interpreters, and community health workers. Closing gaps needs changes to systems, not only personal willpower.",
    "Equity is about fairness of chances and needs, not identical treatment.", [
    "Equity means giving each person...|What they need to reach a fair outcome|Exactly the same as everyone|Nothing|More if they are louder",
    "Health disparities are...|Preventable differences in health between groups|Identical outcomes for all,Types of vitamins,Hospital buildings",
    "Which action improves health equity?|Opening a clinic in a neighborhood far from hospitals|Cutting bus routes to clinics,Giving information in one language only,Raising prices",
    "Providing interpreters and translated materials helps...|People understand care no matter their language|Increase confusion,Avoid care,Lower access",
    "Ramps and automatic doors also help parents with strollers. This shows that good design helps...|Many other people too|No one,Only buildings,Only athletes",
    "Closing health gaps often requires changing...|Systems and conditions, not only personal choices|Only individual willpower,Only luck,Only medicine",
    "The goal of health equity is...|A fair chance for everyone to be as healthy as possible|Identical health for all by force,Lower income,More hospitals only",
    "Community health workers help equity by...|Connecting neighbors with trusted care and information|Charging fees,Replacing doctors,Closing clinics"]));
  b.push(L("Screening tests", "🔬", "Screening looks for a condition before any symptoms appear.",
    "<b>Screening</b> tests people who have <b>no symptoms</b>. A <b>false positive</b> says disease is present when it is not. A <b>false negative</b> misses a disease that is there. <b>Sensitivity</b> is how well a test finds people who have the disease; <b>specificity</b> is how well it clears people who do not. A positive screen is followed by a more accurate <b>diagnostic</b> test.",
    "Positive and negative are what the test says. False means the test was wrong.", [
    "Screening tests are done on people who...|Have no symptoms|Are very sick,Are unconscious,Are fully cured",
    "A false positive means the test says...|Disease is present when it is not|Healthy when sick,The test is perfect,Nothing at all",
    "A false negative means the test says...|No disease when disease is actually present|Disease when none is present,The test is perfect,Nothing at all",
    "Sensitivity is how well a test finds people who...|Have the disease|Are healthy,Are young,Are in the sample",
    "Specificity is how well a test correctly clears people who...|Do not have the disease|Have the disease,Are old,Are tall",
    "After a positive screening test, the usual next step is...|A more accurate diagnostic test|Ignoring it,Immediate surgery,Doing nothing",
    "Good screening targets conditions where early treatment...|Improves outcomes|Makes no difference,Is unavailable,Is harmful",
    "One downside of screening is...|False alarms and extra tests|It always harms health,It never finds anything,It costs nothing"]));
  b.push(L("Water, sanitation and hygiene", "🚰", "Clean water and safe toilets save more lives than almost any medicine.",
    "<b>WASH</b> means water, sanitation and hygiene. Safe <b>sanitation</b> keeps waste away from drinking water. <b>Chlorine</b> and boiling (a rolling boil for at least one minute) kill most germs in water. Cholera and typhoid spread through contaminated water or food. <b>Handwashing with soap</b> cuts diarrheal illness, and dehydration is the main danger. <b>Oral rehydration solution</b> is clean water with salts and sugar.",
    "Safe water, safe toilets, clean hands.", [
    "WASH stands for water, sanitation and...|Hygiene|Health,Housing,Heat",
    "Safe sanitation includes...|Toilets that keep waste away from drinking water|Open dumping,Sharing cups,Wells next to waste pits",
    "Treating drinking water with chlorine...|Kills many germs|Adds vitamins,Cools the water,Colors the water",
    "Boiling water at a rolling boil for at least one minute...|Kills most germs|Adds salt,Removes all metals,Does nothing",
    "Cholera and typhoid spread mainly through...|Contaminated water or food|Sunlight,Mosquito bites only,Sound",
    "Handwashing with soap after using the toilet reduces...|Diarrheal illness|Height,Vision problems,Sunburn",
    "Diarrhea is dangerous mainly because of...|Dehydration|Too much sleep,Too much sun,Muscle growth",
    "Oral rehydration solution is a mix of...|Clean water, salts and sugar|Soda and ice,Only juice,Only salt"]));
  b.push(L("Vector-borne diseases", "🦟", "Some germs travel inside insects that bite.",
    "A <b>vector</b> is an organism that carries germs from one host to another. <b>Anopheles</b> mosquitoes spread <b>malaria</b>. <b>Aedes</b> mosquitoes spread dengue and yellow fever. <b>Blacklegged ticks</b> spread Lyme disease. Mosquitoes lay eggs in <b>standing water</b>, so empty containers. Use insecticide-treated bed nets, long sleeves and EPA-registered repellent.",
    "Find the vector, cut its breeding places, and block bites.", [
    "A vector is...|An organism that carries germs from one host to another|A vaccine,A medicine,A type of exercise",
    "Malaria is spread by the bite of infected...|Anopheles mosquitoes|Bees,Ants,Houseflies",
    "Dengue and yellow fever are spread by...|Aedes mosquitoes|Houseflies,Fleas,Ants",
    "Mosquitoes lay their eggs in...|Standing water|Dry sand,Ice,Fire",
    "A good prevention step around the home is to...|Empty containers holding standing water|Fill buckets with rainwater,Leave old tires full,Leave doors open",
    "Insecticide-treated bed nets protect people while they...|Sleep|Run,Eat,Drive",
    "Lyme disease is spread by...|Infected blacklegged ticks|Mosquitoes,Houseflies,Air",
    "What helps prevent bites?|EPA-registered repellent and long sleeves|Perfume,Standing in water,Dark wet clothes"]));
  b.push(L("Zoonoses and One Health", "🐾", "Many germs can jump between animals and people.",
    "A <b>zoonotic</b> disease spreads from animals to people. Examples: rabies, avian flu and salmonella. <b>One Health</b> means the health of people, animals and the environment are linked. Prevent illness by vaccinating pets, avoiding wild animals, cooking eggs and poultry well, and washing hands with soap after touching animals. <b>Veterinarians</b> are part of public health.",
    "Animals, people and the environment all connect.", [
    "A zoonotic disease spreads from...|Animals to people|Plants to rocks,Computers to people,Water to clouds",
    "Rabies in people is prevented mainly by...|Vaccinating pets and avoiding wild animals|Eating garlic,Drinking more water,Wearing hats",
    "One Health means that...|Human, animal and environmental health are linked|Only humans matter,There is one hospital,There is one diet",
    "After touching live poultry or reptiles you should...|Wash your hands with soap and water|Touch your face first,Share food,Eat right away",
    "Salmonella can come from...|Undercooked eggs and poultry|Boiled water,Fresh air,Sunshine",
    "Avian influenza is a flu mainly of...|Birds, which can sometimes infect people|Fish only,Plants,Rocks",
    "Cutting down forests can raise spillover risk because...|Wildlife and people come into closer contact|Trees spread germs,The air gets thicker,Rain stops",
    "Veterinarians play a public health role by...|Controlling diseases in animals that can spread to people|Only grooming pets,Selling snacks,Predicting weather"]));
  b.push(L("Indoor air and radon", "🏠", "The air inside buildings affects health every day.",
    "<b>Radon</b> is a natural radioactive gas that can seep from soil into buildings. It has no smell, so you need a <b>test kit</b>. It is the second leading cause of lung cancer after smoking. <b>Mold</b> grows where there is moisture, so fix leaks and keep indoor humidity below about <b>50%</b>. <b>Ventilation</b> brings in fresh air. Secondhand smoke harms everyone who breathes it.",
    "Test for radon, control moisture, ventilate.", [
    "Radon is...|A natural radioactive gas that can seep from soil into buildings|A vitamin,A cleaning brand,A kind of mold",
    "Radon is the second leading cause of lung cancer after...|Smoking|Sugar,Running,Cooking",
    "How can you find out if a home has radon?|Use a radon test kit|Smell for it,Look for it,Ask a neighbor to guess",
    "Mold grows where there is...|Moisture|Dry dust,Cold metal,Bright sun in dry air",
    "To lower mold risk, keep indoor humidity below about...|50 percent|90 percent,100 percent,120 percent",
    "Using exhaust fans and opening windows helps by...|Bringing in fresh air and removing moisture|Making rooms hotter,Spreading dust,Producing radon",
    "Secondhand smoke affects...|Everyone breathing the air|Only the smoker,Only pets,Nobody",
    "Dust mites thrive in...|Warm, humid bedding|Cold dry metal,Ice,Bright sunlight"]));
  b.push(L("Noncommunicable diseases", "❤️", "Most of the world's deaths now come from long-term diseases that do not spread between people.",
    "<b>Noncommunicable diseases (NCDs)</b> are chronic illnesses that do not pass from person to person. The four main groups are <b>cardiovascular disease, cancers, chronic respiratory disease and diabetes</b>. They cause about <b>three out of four</b> deaths worldwide. They develop slowly, share risks like an unhealthy diet and too little activity, and can often be prevented with healthy habits, early detection and treatment.",
    "Not catching, long-term, linked to lifestyle and environment.", [
    "Noncommunicable diseases are...|Chronic illnesses that do not pass from person to person|Infections that spread by coughing,Vaccines,Injuries only",
    "Which one is an NCD?|Type 2 diabetes|Measles,Influenza,Cholera",
    "NCD groups include cardiovascular disease, cancers, chronic respiratory disease and...|Diabetes|Malaria,Measles,Rabies",
    "NCDs cause roughly what share of deaths worldwide?|More than two-thirds|Under 10 percent,Almost none,About 1 in 100",
    "Shared NCD risk behaviors include...|An unhealthy diet and too little activity|Washing hands,Getting vaccines,Sleeping 8 hours",
    "NCDs often develop...|Slowly over many years|In one hour,Only in infants,By touching a surface",
    "Early deaths from NCDs can be reduced by...|Prevention, early detection and treatment|Doing nothing,Avoiding doctors,Eating extra salt",
    "Which of these is communicable?|Measles|Heart disease,Asthma,Type 2 diabetes"]));
  b.push(L("Nutrition around the world", "🌍", "Some people lack nutrients while others get too many calories, and sometimes both happen in one place.",
    "<b>Undernutrition</b> means not getting enough food or nutrients. <b>Overnutrition</b> leads to overweight and obesity. The <b>double burden of malnutrition</b> is both in the same population. Missing nutrients cause: <b>iodine</b> - goiter; <b>vitamin A</b> - night blindness; <b>iron</b> - anemia; <b>vitamin D</b> - rickets; <b>vitamin C</b> - scurvy.",
    "Match the nutrient to its deficiency disease.", [
    "Not getting enough food or nutrients is called...|Undernutrition|Overnutrition,Hydration,Fortification",
    "Eating more energy than the body needs over time can lead to...|Overweight and obesity|Rickets,Night blindness,Goiter",
    "Iodine deficiency can cause...|Goiter (an enlarged thyroid)|Night blindness,Scurvy,Rickets",
    "Vitamin A deficiency can cause...|Night blindness|Goiter,Scurvy,Anemia",
    "Iron deficiency can cause...|Anemia|Rickets,Goiter,Scurvy",
    "Vitamin D deficiency in children can cause...|Rickets|Scurvy,Goiter,Night blindness",
    "Vitamin C deficiency causes...|Scurvy|Rickets,Goiter,Anemia",
    "The double burden of malnutrition means...|Undernutrition and overweight exist in the same population|Eating two meals a day,Twice the vitamins,Eating double portions"]));
  b.push(L("Mortality, morbidity and life expectancy", "📉", "Public health uses careful words to count illness and death.",
    "<b>Morbidity</b> is illness; <b>mortality</b> is death. <b>Life expectancy at birth</b> is the average number of years a newborn is expected to live. <b>Infant mortality</b> counts deaths of babies under one year. <b>Heart disease</b> is a leading cause of death in the United States. <b>Age-adjusted</b> rates compare groups fairly. Life expectancy has risen because of better sanitation, vaccines and medical care.",
    "Illness is morbidity. Death is mortality.", [
    "Morbidity refers to...|Illness or disease|Death|Birth,Exercise",
    "Mortality refers to...|Death|Illness,Vaccination,Cooking",
    "Life expectancy at birth is...|The average years a newborn is expected to live|The age of the oldest person,The age of retirement,Years of school",
    "A leading cause of death in the United States is...|Heart disease|Lightning,Sunburn,Hiccups",
    "Infant mortality counts deaths of babies under age...|One year|Five years,Ten years,Twenty years",
    "Death rates are often given per...|1000 or 100000 people|Hospital room,Gram of salt,Hour of sleep",
    "Life expectancy has risen in many countries thanks to...|Better sanitation, vaccines and medical care|Less clean water,More infections,Fewer teachers",
    "Age-adjusted rates are used to...|Compare groups fairly when their age mixes differ|Make everyone older,Hide data,Count vitamins"]));
  b.push(L("Safer workplaces", "🦺", "Workplace safety follows a ladder of controls, from best to last resort.",
    "The <b>hierarchy of controls</b> ranks safety steps from strongest to weakest: <b>elimination</b> (remove the hazard), <b>substitution</b> (swap in something safer), <b>engineering controls</b> (guards, ventilation), <b>administrative controls</b> (training, schedules, rotation), then <b>PPE</b> (gloves, goggles, earplugs). PPE is last because it protects only the wearer and depends on correct use. <b>Ergonomics</b> fits the job to the worker.",
    "Remove the hazard first. Protective gear is the last layer.", [
    "Which control is strongest in the hierarchy?|Eliminating the hazard|Wearing PPE,Posting warning signs,Training only",
    "Which control is the last resort?|PPE|Elimination,Substitution,Engineering controls",
    "Replacing a hazardous chemical with a safer one is...|Substitution|Elimination,PPE,Administrative control",
    "Installing a machine guard or ventilation is an...|Engineering control|PPE,Substitution,Elimination",
    "Safety training and rotating tasks are...|Administrative controls|Engineering controls,Elimination,Substitution",
    "Why is PPE the last choice?|It protects only the wearer and depends on correct use|It is illegal,It is too cheap,Nobody can wear it",
    "Earplugs, gloves and goggles are examples of...|PPE|Elimination,Engineering controls,Substitution",
    "Ergonomics aims to...|Fit the job and tools to the worker|Fit the worker to any job,Remove breaks,Raise noise"]));
  b.push(L("Preventing injuries: the three Es", "🚧", "Most injuries are not accidents. They are predictable and preventable.",
    "Injury prevention uses three Es: <b>education</b> (teaching safe behavior), <b>engineering</b> (safer designs such as airbags, guardrails and pool fences with latching gates) and <b>enforcement</b> (laws and rules, such as seat belt laws and speed cameras). The best programs use all three together.",
    "Teach it, build it safe, and enforce the rule.", [
    "The three Es of injury prevention are education, engineering and...|Enforcement|Exercise,Emotion,Entertainment",
    "Airbags and guardrails are examples of...|Engineering|Education,Enforcement,Entertainment",
    "A seat belt law with fines is...|Enforcement|Education,Engineering,Exercise",
    "A school campaign teaching bike helmet use is...|Education|Engineering,Enforcement,Emotion",
    "Rumble strips on highways are...|Engineering|Education,Enforcement,Exercise",
    "Speed cameras are an example of...|Enforcement|Education,Engineering,Emotion",
    "Most injuries are best seen as...|Predictable and preventable|Pure bad luck,Unavoidable,Always someone's fault",
    "A pool fence with a self-latching gate is...|Engineering|Education,Enforcement,Entertainment"]));
  b.push(L("Mental health stigma and literacy", "💬", "How we talk about mental health affects whether people get help.",
    "<b>Stigma</b> is shame and negative stereotypes attached to a group. It makes people <b>delay seeking help</b>. <b>Mental health literacy</b> is knowing how to recognize, get help for and support mental health needs. Mental health conditions are common and treatable. Use respectful words such as <b>a person living with depression</b>. If someone talks about hurting themselves, take it seriously and get a trusted adult or crisis line right away.",
    "Use respectful words, share facts, and help people reach support.", [
    "Stigma is...|Negative stereotypes and shame attached to a group|A kind of vitamin,A medical scanner,A kind of exercise",
    "Stigma can lead people to...|Delay seeking help|Seek help sooner,Sleep better,Feel proud of hiding",
    "Which language is respectful?|A person living with depression|Using a diagnosis as an insult,Joking about symptoms,Whispering rumors",
    "Mental health literacy means...|Knowing how to recognize, get help for and support mental health needs|Memorizing drug names,Being a doctor,Avoiding the topic",
    "Mental health conditions are...|Common and treatable|Rare and untreatable,A personal choice,A sign of weakness",
    "A friend says they are struggling. A good response is to...|Listen with care and encourage them to talk to a trusted adult or professional|Tell them to snap out of it,Share their secret online,Ignore it",
    "Sharing facts and personal stories respectfully can...|Reduce stigma|Increase shame,Lower sleep,Block treatment",
    "Someone talks about wanting to hurt themselves. You should...|Take it seriously and get a trusted adult or crisis line right away|Keep it a secret,Laugh it off,Wait and see"]));
  b.push(L("How vaccines are tested", "🧪", "Vaccines go through careful steps before and after they reach the public.",
    "Testing starts with <b>preclinical</b> lab and animal research. <b>Phase 1</b> tests safety in a small group. <b>Phase 2</b> uses hundreds of people to study dose and immune response. <b>Phase 3</b> uses thousands to confirm safety and effectiveness. Regulators review the data before approval, and <b>Phase 4</b> and reporting systems keep monitoring safety afterward. Volunteers give <b>informed consent</b>, and groups are formed by <b>random assignment</b>.",
    "Small, then bigger, then thousands, then ongoing monitoring.", [
    "A Phase 1 trial tests mainly...|Safety in a small group|Effectiveness in millions,Marketing,Price",
    "A Phase 3 trial involves...|Thousands of people to confirm safety and effectiveness|Only lab cells,One person,Animals only",
    "Testing in labs and on animals before human trials is called...|Preclinical research|Phase 4,Surveillance,Marketing",
    "After approval, safety monitoring...|Continues through Phase 4 and reporting systems|Stops forever,Is replaced by ads,Is done by the vaccinated only",
    "In a randomized trial, volunteers are placed in groups by...|Chance|The researcher's choice,Age only,Weight only",
    "Regulators review trial data before...|Approving a vaccine for public use|Printing labels,Selling snacks,Choosing a color",
    "Informed consent means volunteers are told...|The risks and benefits before they agree|Nothing,Only the price,Their final score",
    "Phase 2 mainly studies...|Dose and immune response in more people|Only price,Only packaging,Only marketing"]));
  b.push(C("Rates per 100000", "📏", "Rates let us compare places of different sizes fairly.",
    "<b>Rate per 100000 = cases divided by population, times 100000.</b> When the population is a neat number like 300000, count how many groups of 100000 there are, then divide the cases by that number.",
    "Find how many groups of 100000 people there are, then divide the cases by it.",
    () => {
      const k = ri(2, 5), r = ri(5, 40), pop = k * 100000, cases = r * k;
      return [`A county with ${pop} people had ${cases} new cases of an illness in a year. How many cases is that per 100000 people?`, r,
        "How many groups of 100000 people are in the county?", "Divide the number of cases by the number of groups of 100000.",
        "Example: 400000 people with 800 cases is 4 groups of 100000, so 800 / 4 = 200 per 100000.", "📏"];
    }));
  b.push(C("Percent change in cases", "📈", "Public health workers describe changes as percentages.",
    "<b>Percent increase = (new - old) / old x 100.</b> Find the difference first, then divide it by the old number, then multiply by 100. If cases go from 100 to 150, the change is 50, and 50 / 100 = 0.5, which is 50%.",
    "Difference divided by the starting number.",
    () => {
      const A = pick([20, 40, 80, 100, 200]), p = pick([10, 25, 50, 100]), B = A + A * p / 100;
      return [`Weekly flu cases on a campus rose from ${A} to ${B}. By what percent did they increase?`, p,
        "First find how many more cases there are now than before.", "Divide the increase by the starting number of cases, then multiply by 100.",
        "Example: cases rising from 30 to 36 is an increase of 6, and 6 / 30 = 0.2, so 20 percent.", "📈"];
    }));
  b.push(MIX("Mixed practice", pk(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  b.push(MIX("Level 26 Challenge", pk(b, [0, 1, 4, 5, 8, 9, 10, 12, 13, 14, 15, 16, 17, 2, 3, 11])));

  // ================= LEVEL 27 =================
  const c = [];
  c.push(L("What public health does", "🏛️", "Doctors treat one patient at a time. Public health protects whole communities.",
    "<b>Public health</b> focuses on whole populations and on prevention. It has three core functions: <b>assessment</b> (collecting and studying health data), <b>policy development</b> (making plans, laws and programs) and <b>assurance</b> (making sure services and protections reach people and work). Restaurant inspections and vaccination programs are public health.",
    "Study the data, make the plan, make sure it works.", [
    "The three core public health functions are assessment, policy development and...|Assurance|Advertising,Accounting,Auditing",
    "Community health assessment means...|Collecting and analyzing data about a community's health|Treating each patient,Selling products,Building roads",
    "Policy development means...|Making plans, laws and programs to protect health|Making food,Teaching math,Painting",
    "Assurance means making sure...|Services and protections reach people and work|Nobody asks questions,Data is hidden,Hospitals close",
    "Public health focuses on...|Whole populations and prevention|One patient only,Only surgeries,Only hospitals",
    "A restaurant inspection program is an example of...|Public health|Surgery,Dentistry,Radiology",
    "Which is a major public health success?|Vaccination programs|Buying new shoes,Longer commercials,Bigger screens",
    "Prevention is stressed because it...|Can protect many people before harm occurs|Always costs more,Stops research,Replaces all doctors"]));
  c.push(L("Who does what in health", "🌐", "Different agencies protect health at different levels.",
    "The <b>World Health Organization (WHO)</b> is a United Nations agency for international public health. The <b>CDC</b> (Centers for Disease Control and Prevention) is the U.S. national public health agency. The <b>FDA</b> oversees the safety of food, drugs and medical devices. The <b>NIH</b> funds medical research. <b>Local health departments</b> inspect restaurants, run clinics and track local outbreaks.",
    "Match the job to the agency: global, national, safety rules, research, local.", [
    "The WHO is...|A United Nations agency for international public health|A hospital,A school,A bank",
    "The CDC is the...|U.S. national public health agency|A food brand,A shopping chain,A university",
    "The FDA oversees the safety of...|Food, drugs and medical devices|Roads,Schools,Weather",
    "The NIH mainly funds...|Medical research|Road building,Mail delivery,Airlines",
    "Local health departments often...|Inspect restaurants, run clinics and track local outbreaks|Print money,Run airlines,Sell houses",
    "Which group coordinates an international health emergency response?|The WHO|A local library,A school club,A grocery store",
    "Who knows local health needs best and can act close to home?|The local health department|A faraway company,A game studio,A weather station",
    "Who reviews a new medicine for safety before it is sold in the U.S.?|The FDA|The post office,A school,A bus company"]));
  c.push(L("Health policy tools", "📜", "Governments can make healthy choices easier with laws, taxes and design.",
    "Policy tools include <b>taxes</b> (such as a tax on sugary drinks), <b>laws and regulations</b> (seat belts, smoke-free air, food safety rules), <b>labeling</b> rules, <b>subsidies</b> (making fresh produce more affordable) and <b>environmental changes</b> (bike lanes and parks). Changing laws and surroundings reaches whole populations, and good policy is based on evidence.",
    "Ask what rule, price, label or design is changing the choice.", [
    "A tax on sugary drinks aims to...|Discourage consumption and fund programs|Make drinks free,Ban water,Cure disease",
    "Smoke-free air laws protect...|Nonsmokers from secondhand smoke|Only smokers,Plants,Pets only",
    "Food labeling rules help people...|Make informed choices|Avoid food,Skip meals,Pay more",
    "Building bike lanes and parks is...|Changing the environment so healthy choices are easier|Forcing everyone to exercise,Hiding data,A kind of surgery",
    "A seat belt law is a...|Law that reduces injuries across a population|Medicine,Diet,Hobby",
    "Subsidizing fresh produce markets makes healthy food...|More affordable|Harder to find,More expensive,Illegal",
    "Good health policy is based on...|Evidence|Guesses,Rumors,Ads",
    "Which approach reaches the most people?|Changing laws and surroundings|Posting one poster,Telling one person once,Hoping for the best"]));
  c.push(L("Fortification and fluoridation", "🧂", "Adding nutrients to common foods and water protects a whole population at once.",
    "<b>Fortification</b> adds nutrients to common foods: <b>iodized salt</b> prevents goiter, <b>folic acid</b> in grain products helps prevent neural tube defects (birth defects of the brain and spine), and milk often has added <b>vitamin D</b>. <b>Enrichment</b> adds back nutrients lost in milling flour. <b>Community water fluoridation</b> helps prevent tooth decay. These measures reach many people at low cost.",
    "Put the nutrient in something everyone already uses.", [
    "Adding nutrients to common foods is called...|Fortification|Preservation,Fermentation,Dehydration",
    "Iodized salt helps prevent...|Goiter|Rickets,Scurvy,Night blindness",
    "Folic acid added to grain products helps prevent...|Neural tube defects|Tooth decay,Scurvy,Asthma",
    "Community water fluoridation helps prevent...|Tooth decay|Goiter,Rickets,Anemia",
    "Milk often has added vitamin...|D|Z,Q,X",
    "Adding back B vitamins and iron lost during milling of flour is called...|Enrichment|Preservation,Fermentation,Dehydration",
    "Why fortify staple foods?|They reach many people without anyone changing habits|They make food taste sweeter,They replace meals,They are expensive for all",
    "A public health benefit of fortification is...|Reaching whole populations at low cost|Replacing all other foods,Ending the need for variety,Cooking faster"]));
  c.push(L("Surveillance and contact tracing", "🕵️", "To stop an outbreak, health workers need to know where it is.",
    "<b>Surveillance</b> is the ongoing collection and analysis of health data. <b>Notifiable diseases</b> must be reported by labs and doctors to health authorities. <b>Contact tracing</b> finds people who may have been exposed. <b>Quarantine</b> separates people who were exposed but may not be sick yet. <b>Isolation</b> separates people who are sick. Wastewater testing can track germs in a community. Data must protect <b>privacy</b>.",
    "Collect data, find contacts, separate exposed and sick, protect privacy.", [
    "Public health surveillance is...|The ongoing collection and analysis of health data|A one-time poll,Spying on neighbors,Hospital cleaning",
    "Notifiable diseases are...|Conditions that labs and doctors must report to health authorities|Diseases no one tracks,Common colds only,Allergies only",
    "Contact tracing finds...|People who may have been exposed to an infected person|The richest people,Only doctors,Weather patterns",
    "Quarantine is for people who...|Were exposed and may not be sick yet|Are known to be sick,Were never near anyone,Are on vacation",
    "Isolation separates people who...|Are sick with a contagious illness|Were never near anyone,Are healthy,Are vaccinated",
    "Wastewater testing can help...|Track levels of germs in a community|Make water cold,Count steps,Remove vitamins",
    "Early warning from surveillance helps authorities...|Respond sooner|Hide cases,Cancel science,Stop reports",
    "Surveillance data must be handled so that it...|Protects individual privacy|Posts names online,Is sold for ads,Is never used"]));
  c.push(L("Study designs", "🧬", "Different questions need different kinds of studies.",
    "A <b>randomized controlled trial (RCT)</b> randomly assigns people to groups and is the best design for testing whether a treatment causes an effect. A <b>cohort</b> study follows a group over time. A <b>case-control</b> study compares people with a disease to similar people without it. A <b>cross-sectional</b> study is a snapshot. A <b>systematic review</b> combines many studies using clear methods. Observational studies show links but struggle to prove cause.",
    "Randomly assigned, followed over time, compared backward, snapshot, or combined.", [
    "In a randomized controlled trial, participants are...|Randomly assigned to groups|Chosen freely by the researcher,All the same,Not assigned at all",
    "A cohort study...|Follows a group over time to see who develops outcomes|Looks at one moment only,Uses only animals,Compares only sick people",
    "A case-control study compares people who...|Have a disease with similar people who do not|All have the disease,Are all children,Are in a lab",
    "A cross-sectional study is a...|Snapshot at one point in time|Long film,Surgery,Drug trial",
    "The best design for testing cause and effect of a treatment is a...|Randomized controlled trial|Personal story,Opinion poll,Single case report",
    "A systematic review...|Combines the results of many studies using clear methods|Is one person's opinion,Studies a single patient,Is an advertisement",
    "A case report describes...|One or a few patients|Millions of people,Only animals,Only laws",
    "A weakness of observational studies is that they...|Can show links but struggle to prove cause|Always prove cause,Are never useful,Use no data"]));
  c.push(L("Confounding and correlation", "🍦", "Two things can move together without one causing the other.",
    "<b>Correlation</b> means two things change together. It does <b>not</b> prove causation. A <b>confounder</b> is a third factor linked to both the exposure and the outcome. Ice cream sales and sunburns both rise in summer because of hot, sunny weather. <b>Random assignment</b> balances confounders between groups, and statistical <b>adjustment</b> accounts for known ones. <b>Reverse causation</b> means the arrow may run the other way.",
    "Look for a hidden third factor or a reversed arrow.", [
    "A confounder is...|A third factor linked to both the exposure and the outcome|A kind of placebo,A type of vaccine,The final result",
    "Ice cream sales and sunburns both rise in summer. The hot sunny weather is the...|Confounder|Placebo,Vaccine,Outcome",
    "Some old studies linked coffee to disease partly because coffee drinkers more often...|Smoked|Exercised,Slept,Ate fruit",
    "Random assignment helps by...|Balancing confounders between groups|Hiding the results,Making groups different,Replacing consent",
    "Correlation means two things...|Change together|Are always the same,Are unrelated,Cause each other",
    "Correlation does not imply...|Causation|Calculation,Circulation,Variation",
    "Statistical adjustment is used to...|Account for known confounders|Remove the data,Add a placebo,Change the question",
    "Low activity might cause low mood, or low mood might cause low activity. Researchers worry about...|Reverse causation|Randomization,Fortification,Blinding"]));
  c.push(L("Absolute and relative risk", "🎯", "A scary headline can hide a tiny real change.",
    "<b>Absolute risk</b> is the actual chance of an event. <b>Relative risk</b> compares the risk in one group with another. A relative risk of 1 means no difference; 2 means double the risk. If risk falls from 2 in 100 to 1 in 100, the relative reduction is <b>50%</b> but the absolute reduction is only <b>1 percentage point</b>. Always ask: relative to what baseline?",
    "Check the starting number before the percent.", [
    "Risk falls from 2 in 100 to 1 in 100. The relative risk reduction is...|50 percent|1 percent|2 percent,100 percent",
    "Risk falls from 2 in 100 to 1 in 100. The absolute risk reduction is...|1 percentage point|50 percentage points|2 percentage points,100 percentage points",
    "A headline says a habit doubles risk from 1 in 10000 to 2 in 10000. The absolute increase is...|1 extra case per 10000 people|50 extra cases per 100 people,Half the population,Everyone",
    "Absolute risk is...|The actual chance of an event happening|A comparison of two groups,A percent change only,Always 100 percent",
    "Relative risk compares...|The risk in one group with the risk in another|One group only,Weight and height,Two foods",
    "When a headline gives a big percent change, you should check...|The baseline absolute risk|The font size,The author's hair,The page color",
    "A relative risk of 1 means...|No difference between the groups|Double the risk,Half the risk,The disease is certain",
    "A relative risk of 2 means...|Twice the risk|Half the risk,No difference,Zero risk"]));
  c.push(L("Placebos and blinding", "🎭", "Expectations can change how we feel and how researchers measure.",
    "A <b>placebo</b> is an inactive treatment that looks like the real one. The <b>placebo effect</b> is feeling better because you expect to. A <b>control group</b> lets researchers compare. In a <b>double-blind</b> trial neither participants nor researchers know who gets which treatment, so expectations do not change the measurements. <b>Informed consent</b> and <b>ethics boards (IRBs)</b> protect participants.",
    "Hide who got what so hopes do not change the results.", [
    "A placebo is...|An inactive treatment that looks like the real one|The strongest drug,A vaccine,A diagnosis",
    "The placebo effect is...|Feeling better because you expect to|A side effect,A cure,An allergy",
    "In a double-blind trial...|Neither participants nor researchers know who gets which treatment|Everyone knows,Only participants know,Only the sponsor guesses",
    "In a single-blind trial...|Participants do not know which group they are in|Nobody knows,Nobody is tested,Researchers pick their own group",
    "A control group is used to...|Compare outcomes with and without the treatment|Count calories,Control the weather,Decide the price",
    "Why are researchers blinded?|So their expectations do not change how they measure|To hide results forever,To save pens,To confuse volunteers",
    "Informed consent in a trial means participants...|Know and agree to what is involved|Are not told,Are paid more,Are rushed",
    "An ethics board (IRB) reviews studies to...|Protect participants|Sell results,Pick winners,Count staff"]));
  c.push(L("Health literacy", "📖", "Having information is not enough. You have to understand it and use it.",
    "<b>Health literacy</b> is the ability to find, understand and use health information to make decisions. Levels: <b>functional</b> (reading forms and labels), <b>interactive</b> (discussing and applying advice) and <b>critical</b> (judging sources and using them for choices). <b>Numeracy</b> is understanding numbers like doses and risks. Clinicians use <b>plain language</b> and the <b>teach-back</b> method, where you explain the instructions in your own words.",
    "Find it, understand it, judge it, use it.", [
    "Health literacy is the ability to find, understand and use health information to...|Make decisions|Win trivia games,Sell products,Avoid doctors",
    "Reading forms and medicine labels is which level of health literacy?|Functional|Critical,Interactive,Optional",
    "Judging whether a source is reliable and using it to guide choices is which level?|Critical|Functional,Interactive,Passive",
    "In the teach-back method, the patient...|Explains the instructions in their own words|Memorizes silently,Writes a poem,Leaves quickly",
    "Plain language means...|Short, clear words without jargon|Long technical terms,Another language,Hidden information",
    "Which is a good question to ask a provider?|What are my options and the risks of each?|Do I have to ask anything?,Can I skip the details?,Can you speak faster?",
    "Numeracy in health means understanding...|Numbers such as doses and risks|Only reading,Only singing,Only drawing",
    "A prescription label shows...|The dose, timing and warnings|Only the brand,Only the price,Only the color"]));
  c.push(L("Peer review and evidence quality", "📑", "Not all published claims are equally reliable.",
    "<b>Peer review</b> means independent experts check a study before it is published. A <b>preprint</b> is shared before peer review. A <b>retraction</b> withdraws a paper with serious errors. <b>Replication</b> means others repeat a study to see whether the results hold. One small study is not enough to change guidelines. <b>Systematic reviews</b> and major health agency guidance give stronger summaries. <b>Predatory journals</b> publish almost anything for a fee. Check funding and conflicts of interest.",
    "Look for expert review, repeated results and honest funding.", [
    "Peer review means...|Independent experts check a study before it is published|The author grades their own work,An ad is added,The public votes",
    "A preprint is...|A study shared before peer review|A final law,An advertisement,A cure",
    "A retraction is when...|A journal withdraws a paper because of serious problems|A paper wins an award,A paper is printed,A reader subscribes",
    "Replication means...|Other researchers repeat a study to see if results hold|Copying the paper,Hiding the data,Deleting the study",
    "A single small study is...|Not enough to change guidelines|Final proof,A law,A guarantee",
    "Where can you find reliable summaries of evidence?|Systematic reviews and major health agency guidance|Random posts,Ads,Rumors",
    "Journals that publish almost anything for a fee, without real review, are called...|Predatory journals|Peer journals,Government journals,Review journals",
    "Why check who funded a study?|To spot possible bias or conflicts of interest|To find the paper size,To see the price,To check the font"]));
  c.push(L("Health communication and nudges", "📣", "Good messages and good design can change behavior without force.",
    "A <b>nudge</b> is a small change in choices that guides people without banning options. Putting fruit at eye level in a cafeteria is a nudge. <b>Defaults</b> work because people tend to stick with them. <b>Social marketing</b> uses marketing ideas to promote healthy behavior. Messages work best when they fit the audience and give <b>clear steps</b>. Fear-only messages often fail. <b>Pretesting</b> messages with the audience helps, and trusted messengers are listened to.",
    "Make the healthy choice easy, clear and trusted.", [
    "A nudge is...|A small change in choices that guides people without banning options|A strict ban,A fine,A medicine",
    "Putting fruit at eye level in a cafeteria is an example of a...|Nudge|Tax,Vaccine,Law",
    "Opt-out defaults work because people...|Tend to stick with the default|Never read anything,Dislike choices,Always change them",
    "Social marketing uses marketing ideas to...|Promote healthy behavior|Sell candy,Hide facts,Raise prices",
    "A health message works best when it...|Fits the audience and gives clear steps|Is long and confusing,Only scares people,Blames people",
    "Fear-only messages often fail unless people also get...|A clear way to act|More fear,Less information,A longer message",
    "Testing campaign messages with the audience first is called...|Pretesting|Posting,Printing,Prescribing",
    "A trusted community messenger helps because...|People listen to those they trust|They are famous for nothing,They are loud,They are cheap"]));
  c.push(L("Campus wellness resources", "🎓", "College gives you many supports. Using them early is smart.",
    "Many campuses have a <b>counseling center</b> (often short-term counseling for students), a <b>student health center</b> (illness care and vaccines), <b>accessibility services</b> (accommodations such as extra time), <b>resident advisors</b>, tutoring and writing centers, and sometimes a <b>food pantry</b>. Reaching out early is a sign of strength. If a friend is in crisis, stay with them and get emergency or crisis help and a trusted adult.",
    "Know where the help is before you need it.", [
    "Campus counseling centers often offer...|Short-term counseling for students|Free cars,Cooking lessons only,Sports gear",
    "Where could you go for an illness or a vaccine on campus?|The student health center|The parking office,The bookstore,The gym desk",
    "Accessibility services help students by...|Arranging accommodations such as extra time|Ending classes,Choosing majors,Cooking meals",
    "Resident advisors can help by...|Connecting you with campus resources|Grading your exams,Running the cafeteria,Picking your classes",
    "Reaching out for help early is...|A smart, strong choice|A sign of failure,A waste of time,Embarrassing for everyone",
    "A friend seems in crisis. You should...|Stay with them and get crisis help and a trusted adult|Leave them alone,Post about it online,Promise to keep it secret",
    "A campus food pantry offers...|Free groceries to students in need|Cooking contests,Vending machines,Dorm keys",
    "Tutoring and writing centers help reduce...|Academic stress|Sleep,Exercise,Hunger completely"]));
  c.push(L("Life course and healthy aging", "🧓", "Health is built across a whole lifetime.",
    "The <b>life course</b> approach says health is shaped by experiences at all stages. <b>Early childhood</b> matters because the brain grows fast. <b>Risk factors</b> raise the chance of harm; <b>protective factors</b> such as supportive relationships lower it. Prevention fits each stage: vaccines in infancy, vision screening in school, cancer and heart checks in adulthood, and <b>balance and strength exercise</b> to prevent falls in older adults.",
    "Think of prevention at every age, and habits that add up.", [
    "The life course approach says health is shaped by...|Experiences across all life stages|Only the last year of life,Only genes,Only luck",
    "Early childhood care matters because...|The brain develops rapidly|Nothing changes then,Bones are finished,Habits do not form",
    "Supportive relationships are an example of...|Protective factors|Risk factors,Hazards,Barriers",
    "Things that raise the chance of harm are called...|Risk factors|Protective factors,Benefits,Vaccines",
    "Which helps older adults prevent falls?|Balance and strength exercise|Staying in bed,Avoiding all walking,Skipping vision checks",
    "Vision screening in school is an example of prevention at the stage of...|Childhood|Old age,Pregnancy,Retirement",
    "Healthy aging includes...|Staying active, connected and getting preventive care|Avoiding people,Skipping checkups,Staying still",
    "Habits formed in the teen years often...|Carry into adult life|Disappear at once,Never matter,Only affect pets"]));
  c.push(L("Measuring disease burden: DALYs", "🧮", "How do we compare a disease that kills with one that disables?",
    "A <b>DALY</b> (disability-adjusted life year) equals <b>one lost year of healthy life</b>. DALYs add <b>years of life lost</b> to early death (YLL) and <b>years lived with disability</b> (YLD). <b>Burden of disease</b> is the total health impact of a condition on a population. A <b>QALY</b> (quality-adjusted life year) values a year by quality of life. Cost per DALY averted shows how much health a program buys.",
    "Add the years lost to early death and the years lived with disability.", [
    "One DALY represents...|One lost year of healthy life|One day in hospital,One dollar spent,One doctor visit",
    "DALY = years of life lost (YLL) plus years lived with...|Disability|Dieting,Dehydration,Dancing",
    "Why are DALYs useful?|They combine early death and illness to compare conditions|They count steps,They measure height,They set prices",
    "Burden of disease means...|The total health impact of a condition on a population|The weight of a patient,Hospital size,A medical bill",
    "A QALY is a...|Quality-adjusted life year|Quick-acting lab yield,Quarterly air log,Quiet area license",
    "A lower cost per DALY averted means...|More health gained per dollar|Less health gained,A bigger bill,No effect",
    "A condition with long disability but few deaths mostly adds to which part of DALYs?|Years lived with disability|Years of life lost,Neither part,Vaccination years",
    "A program that lowers the DALYs of a disease has...|Reduced its burden|Raised its burden,Changed nothing,Ended all disease"]));
  c.push(L("Public health ethics", "🧭", "Protecting a community sometimes means balancing it against personal freedom.",
    "Four classic principles: <b>autonomy</b> (respecting a person's right to decide), <b>beneficence</b> (doing good), <b>nonmaleficence</b> (doing no harm) and <b>justice</b> (fair sharing of benefits and burdens). Public health must balance community protection with individual freedom, using the <b>least restrictive means</b> that works. Decisions should be <b>transparent</b>, and shared data must protect identities.",
    "Respect choices, do good, avoid harm, be fair, and limit freedom as little as possible.", [
    "Autonomy means...|Respecting a person's right to make their own decisions|Doing what the majority says,Hiding information,Treating everyone alike always",
    "Beneficence means...|Acting to do good|Doing nothing,Causing harm,Keeping secrets",
    "Nonmaleficence means...|Do no harm|Do the most,Do it fast,Do it cheap",
    "Justice means...|A fair sharing of benefits and burdens|Punishing patients,Helping only the rich,Ignoring needs",
    "Public health ethics asks leaders to balance...|Community protection with individual freedom|Taxes with sleep,Colors with sounds,Food with fashion",
    "The least restrictive means is the option that...|Limits freedom as little as possible while reaching the goal|Limits freedom the most,Uses secrecy,Ignores evidence",
    "Transparency means...|Openly explaining reasons and evidence for decisions|Keeping decisions private,Using jargon,Avoiding questions",
    "Public health data should be shared in ways that...|Protect people's identities|Reveal names,Sell addresses,Skip privacy"]));
  c.push(C("Number needed to treat", "💊", "How many people must take a treatment for one person to benefit?",
    "<b>Number needed to treat (NNT) = 100 divided by the absolute risk reduction in percentage points.</b> If a treatment lowers risk by 4 points, then NNT = 100 / 4. A smaller NNT means the treatment helps more people per person treated.",
    "Find the drop in risk (in points), then divide 100 by it.",
    () => {
      const arr = pick([2, 4, 5, 10, 20, 25]), base = arr + ri(2, 15);
      return [`A treatment lowers the chance of an illness from ${base}% to ${base - arr}%. What is the number needed to treat?`, 100 / arr,
        "First subtract the two risks to find the drop in percentage points.", "Divide 100 by the drop in percentage points.",
        "Example: risk falls from 3% to 2%, a drop of 1 point, so NNT = 100 / 1 = 100.", "💊"];
    }));
  c.push(C("Prevalence on campus", "🏫", "Prevalence can be shown as a percentage of the population.",
    "<b>Prevalence (%) = cases divided by population, times 100.</b> Divide the number of people with the condition by the total, then multiply by 100. A campus of 1000 students with 50 cases has 5% prevalence.",
    "Cases divided by total, times 100.",
    () => {
      const N = pick([200, 500, 1000, 2000, 2500, 4000, 5000]), p = pick([1, 2, 3, 4, 5, 6, 8]);
      return [`A campus has ${N} students. On one day, ${N * p / 100} of them have flu symptoms. What is the prevalence as a percent?`, p,
        "Think of the number of cases as a part of the whole student body.", "Divide the cases by the total number of students, then multiply by 100.",
        "Example: 70 cases among 1000 students is 70 / 1000 = 0.07, which is 7 percent.", "🏫"];
    }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  c.push(MIX("Level 27 Challenge", pk(c, [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 12, 13])));

  Object.assign(HEALTH_LEVELS, { 25: a, 26: b, 27: c });
})();
