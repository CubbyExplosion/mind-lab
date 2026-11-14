// ext/health-28-30.js  Health & Safety levels 28-30 (College year 1 second half, College year 2)
(() => {
  // item format: "question|answer|wrong1,wrong2,wrong3"
  const L = (title, v, intro, key, tip, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], w: p.slice(2).join(",").split(/,(?=\S)/) }; });
    const make = () => {
      const it = pick(its);
      const ex = pick(its.filter(x => x.a !== it.a && x.q !== it.q));
      return {
        text: it.q, choices: shuf([it.a, ...shuf(it.w).slice(0, 2)]), answer: it.a,
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

  // ================= LEVEL 28 =================
  const a = [];
  a.push(L("R0 and how outbreaks grow", "🦠", "Public health teams ask one big question: how fast is a disease spreading?",
    "<b>R0</b> (the basic reproduction number) is how many people one case infects, on average, when nobody is immune. If R0 is above 1, an outbreak grows. If it is below 1, it fades. <b>Rt</b> is the same idea measured right now, after immunity and actions like isolation.",
    "Compare the number to 1: above means growth, below means shrinking.", [
    "R0 stands for the...|Basic reproduction number|Rate of zero outbreaks,Risk of oral spread",
    "If R0 is greater than 1, the outbreak will tend to...|Grow|Shrink,Vanish overnight",
    "If Rt is below 1, cases will tend to...|Decline|Rise quickly,Double each week",
    "Rt differs from R0 because Rt measures spread...|Right now, with immunity and actions in place|Only in animals,Only before any case",
    "Which action can lower Rt?|Vaccination and isolating sick people|Crowding indoors,Ignoring symptoms",
    "An R0 of exactly 1 means each case infects about...|One other person|Ten people,Nobody",
    "A disease with a very high R0 needs...|A very high share of people to be immune|Almost no one to be immune,No vaccines",
    "A disease with a lower R0 is generally...|Easier to slow down|Impossible to slow,Never infectious"]));
  a.push(L("Outbreak investigation", "🔍", "When many people get sick from the same cause, a team of disease detectives goes to work.",
    "Steps include confirming the outbreak, writing a <b>case definition</b>, finding cases, and describing them by <b>person, place and time</b>. An <b>epidemic curve</b> graphs cases over time. A <b>point-source</b> outbreak comes from one shared exposure. Teams compare sick people with healthy <b>controls</b> to find the link, then act.",
    "Define the case, describe, compare, then control.", [
    "A case definition is...|A set of criteria to decide who counts as a case|A treatment plan,A vaccine schedule",
    "Describing an outbreak by person, place and time is...|Descriptive epidemiology|Random tagging,Case sorting",
    "An epidemic curve shows...|Cases over time|Cases by blood type,Hospital budgets",
    "The first known case found in an outbreak is the...|Index case|Control case,Placebo case",
    "Everyone ate a bad dish at one event and got sick soon after. This is a...|Point-source outbreak|Propagated outbreak,Endemic pattern",
    "An outbreak that passes from person to person over weeks is...|Propagated|Point-source,Imaginary",
    "Why do investigators compare sick people with healthy controls?|To find which exposure is linked to illness|To count hospital rooms,To skip testing",
    "A disease that is always present at a usual level in an area is...|Endemic|Eradicated,Pandemic",
    "An epidemic spreading across many countries is a...|Pandemic|Point source,Endemic"]));
  a.push(L("Sensitivity and specificity", "🎯", "No test is perfect. These two words describe how a test can go right or wrong.",
    "<b>Sensitivity</b> is how well a test finds people who <i>have</i> the condition. <b>Specificity</b> is how well it clears people who <i>do not</i>. A wrong 'sick' result is a <b>false positive</b>. A wrong 'healthy' result is a <b>false negative</b>. For rare diseases, follow-up testing checks positives.",
    "Sensitivity is about the sick, specificity is about the healthy.", [
    "Sensitivity is the ability of a test to correctly find...|People who have the condition|People who do not have it,Only children",
    "Specificity is the ability of a test to correctly clear...|People who do not have the condition|People who have it,Only adults",
    "A test says a healthy person is sick. This is a...|False positive|False negative,True positive",
    "A test says a sick person is healthy. This is a...|False negative|False positive,True negative",
    "A test that misses many sick people has low...|Sensitivity|Specificity,Price",
    "A test that wrongly flags many healthy people has low...|Specificity|Sensitivity,Speed",
    "A very sensitive test is most useful for...|Ruling out a condition when the result is negative|Proving a condition with one test,Replacing doctors",
    "If a condition is rare, a positive screening result...|May still be a false alarm so follow-up testing is needed|Is always correct,Means a cure"]));
  a.push(L("Averages and outliers", "📊", "One number can summarize a whole group of measurements, if you pick the right one.",
    "The <b>mean</b> is the sum divided by the count. The <b>median</b> is the middle value when sorted. The <b>mode</b> is the most common value. The <b>range</b> is highest minus lowest. One extreme value (an <b>outlier</b>) pulls the mean but barely moves the median.",
    "For skewed data, the middle value is often the fairer 'typical' number.", [
    "The middle value in a sorted list is the...|Median|Mean,Mode",
    "The value that appears most often is the...|Mode|Median,Range",
    "The sum of values divided by how many there are is the...|Mean|Median,Mode",
    "One extremely high value (an outlier) changes which measure the most?|Mean|Median,Mode",
    "For skewed data such as hospital bills, a fairer 'typical' value is often the...|Median|Range,Total",
    "The range is...|Highest value minus lowest value|The middle value,The most common value",
    "With an even number of values, the median is...|The average of the two middle values|The biggest value,The smallest value",
    "Data: 2, 3, 3, 4, 8. The mode is...|3|2,4,8"]));
  a.push(L("Spread and the bell curve", "🔔", "Two groups can have the same average yet look very different. Spread tells the rest of the story.",
    "<b>Standard deviation (SD)</b> measures how spread out values are around the mean. In a bell-shaped (normal) curve, about <b>68%</b> of values fall within 1 SD of the mean, about <b>95%</b> within 2 SD, and about <b>99.7%</b> within 3 SD. A <b>z-score</b> counts how many SDs a value is from the mean.",
    "Remember the three numbers: 68, 95, 99.7.", [
    "Standard deviation measures...|How spread out values are|The middle value,The total",
    "In a normal curve, about 68% of values lie within...|One SD of the mean|Three SD of the mean,Half an SD",
    "In a normal curve, about 95% of values lie within...|Two SD of the mean|One SD of the mean,Five SD of the mean",
    "In a normal curve, about 99.7% of values lie within...|Three SD of the mean|One SD of the mean,Zero SD",
    "A bell curve is symmetric around the...|Mean|Smallest value,Range",
    "A small standard deviation means values are...|Close to the mean|Far apart,All different",
    "Adult heights in a large group are often roughly...|Bell-shaped|A single spike at zero,Square",
    "A z-score tells you...|How many SD a value is from the mean|The price of a test,The sample size"]));
  a.push(L("Confidence intervals", "📏", "A survey of some people can only estimate what is true for everyone. The interval shows how sure we can be.",
    "A <b>95% confidence interval</b> is a range that would capture the true value in about 95 of 100 similar studies. A wider interval means a less precise estimate. Larger samples give narrower intervals. For a risk ratio, <b>1</b> means no difference, so an interval that includes 1 is not clearly different.",
    "Narrow means precise. Check whether the 'no effect' value is inside.", [
    "A poll says 40% with a margin of error of 3 points. A plausible range is...|37% to 43%|40% to 43%,30% to 50%",
    "A 95% confidence interval gives...|A range likely to contain the true value|The exact true value,A guarantee",
    "A larger sample size usually makes the interval...|Narrower|Wider,Negative",
    "A very wide confidence interval means the estimate is...|Less precise|More precise,Perfect",
    "A 95% interval for a risk ratio is 0.9 to 1.3. This means...|No clear difference since 1 is inside|A clear big benefit,A clear big harm",
    "Margin of error usually shrinks when you...|Survey more people|Survey fewer people,Ask leading questions",
    "A confidence interval describes uncertainty about the...|Whole population value|Weather,Sample's names",
    "Which sample probably gives the more precise estimate?|2000 randomly chosen people|20 randomly chosen people,5 friends"]));
  a.push(L("Significance and p-values", "🧪", "Is a result real, or just luck? Scientists use p-values to help decide.",
    "A <b>p-value</b> is the chance of seeing results at least this extreme if there were truly <b>no real effect</b>. Many studies use <b>p below 0.05</b> as 'statistically significant'. But significant does not mean important: a huge study can find a tiny effect. <b>P-hacking</b> (testing many things and reporting only the hits) is misleading. <b>Replication</b> checks results again.",
    "Small p suggests it is not just chance. Ask also: how big is the effect?", [
    "A p-value is the chance of results this extreme if there is truly...|No real effect|A huge effect,A fake sample",
    "A common cutoff for 'statistically significant' is p below...|0.05|0.5,5",
    "A p-value of 0.20 is usually called...|Not statistically significant|Highly significant,Proven",
    "Statistical significance is not the same as...|Practical importance|A result,A sample",
    "Testing many things and reporting only the hits is called...|P-hacking|Blinding,Randomizing",
    "Repeating a study to see if the result holds is...|Replication|Rounding,Randomizing",
    "A big study finds a tiny but significant effect. What is a fair worry?|It may be too small to matter in real life|Tiny effects are always huge,It cannot happen",
    "A small p-value suggests the result is...|Unlikely to be chance alone|Certainly true forever,Caused by diet"]));
  a.push(L("Sampling methods", "🎲", "Who you ask decides what you learn.",
    "<b>Simple random sampling</b> gives everyone an equal chance. <b>Stratified</b> sampling samples from each group (such as age bands). <b>Cluster</b> sampling picks whole groups, like schools. <b>Convenience</b> sampling asks whoever is nearby and can be biased. Online polls anyone can join suffer from <b>volunteer bias</b>. A low response rate can cause <b>non-response bias</b>.",
    "Ask: does this sample look like the whole population?", [
    "Every person has an equal chance of being picked. This is...|Simple random sampling|Convenience sampling,Volunteer sampling",
    "Asking whoever happens to be nearby is...|Convenience sampling|Random sampling,Stratified sampling",
    "Splitting people into age bands and sampling from each band is...|Stratified sampling|Convenience sampling,Volunteer sampling",
    "Picking whole schools at random and surveying all their students is...|Cluster sampling|Stratified sampling,Convenience sampling",
    "An open online poll anyone can choose to answer is prone to...|Volunteer bias|Blinding,Replication",
    "Random sampling helps make a sample...|Representative of the population|Bigger than the population,Free",
    "A survey of only gym members about exercise habits is likely...|Biased toward active people|Perfectly representative,Random",
    "A very low response rate can cause...|Non-response bias|Perfect accuracy,Double blinding"]));
  a.push(L("Vitamins in detail", "🍊", "Vitamins are needed in tiny amounts, but missing one can cause real problems.",
    "<b>Vitamins A, D, E and K</b> are fat-soluble and can build up. <b>Vitamin C and the B vitamins</b> are water-soluble. Low vitamin C causes <b>scurvy</b>, low vitamin D can cause <b>rickets</b> in children, vitamin K helps <b>blood clotting</b>, and vitamin A supports <b>vision</b>. Vitamin B12 is found mainly in animal foods, so people who eat no animal foods need fortified foods or a supplement.",
    "Match the vitamin to its job and to the problem when it is missing.", [
    "Vitamins A, D, E and K are...|Fat-soluble|Water-soluble,Sugar-soluble",
    "Vitamin C and the B vitamins are...|Water-soluble|Fat-soluble,Metal-soluble",
    "Lack of vitamin C causes...|Scurvy|Rickets,Night blindness",
    "Lack of vitamin D can weaken the bones of children, causing...|Rickets|Scurvy,Goiter",
    "Vitamin K is needed for...|Blood clotting|Seeing color,Digesting sugar",
    "Vitamin A supports...|Vision and the immune system|Blood clotting,Hair color",
    "Very high doses of fat-soluble vitamin supplements can be...|Harmful|Always safer,Needed daily",
    "The skin makes vitamin D with help from...|Sunlight|Moonlight,Salt",
    "Vitamin B12 is mainly found in...|Animal foods|Fruit peels,Plain sugar"]));
  a.push(L("Key minerals", "🧂", "Minerals are simple elements the body cannot make but must have.",
    "<b>Iron</b> builds hemoglobin, so too little causes <b>anemia</b>. <b>Calcium</b> builds bones and teeth. <b>Iodine</b> is needed by the thyroid, and too little can cause a swollen <b>goiter</b>. <b>Zinc</b> supports the immune system and wound healing. <b>Potassium</b> helps nerves and muscles and balances sodium for healthy blood pressure.",
    "Pair each mineral with the body part that uses it.", [
    "Iron is needed to make...|Hemoglobin in red blood cells|Bone marrow fat,Tooth enamel",
    "Too little iron can cause...|Anemia|Scurvy,Goiter",
    "The mineral that builds bones and teeth is...|Calcium|Iodine,Zinc",
    "The thyroid gland needs...|Iodine|Calcium,Iron",
    "A swollen thyroid called a goiter can come from too little...|Iodine|Zinc,Potassium",
    "Zinc supports...|The immune system and wound healing|Seeing in the dark,Bone length",
    "Potassium helps balance sodium and supports healthy...|Blood pressure|Eye color,Hair growth",
    "Adding iodine to table salt is an example of...|Fortification|Boiling,Rationing",
    "Good plant sources of calcium include...|Fortified soy milk and leafy greens|Soda and candy,Plain sugar"]));
  a.push(L("Digestion and absorption", "🔬", "Food is useless until the body breaks it down and absorbs it.",
    "Digestion starts in the mouth with enzymes. The stomach uses acid and enzymes. The <b>small intestine</b> absorbs most nutrients through tiny folds called <b>villi</b>, helped by <b>bile</b> from the liver and enzymes from the pancreas. The <b>large intestine</b> absorbs water and houses gut bacteria, the <b>microbiome</b>, which ferment some fiber.",
    "Follow the food from mouth to the end of the path.", [
    "Most nutrients are absorbed in the...|Small intestine|Large intestine,Stomach",
    "The tiny finger-like folds that absorb nutrients are called...|Villi|Alveoli,Neurons",
    "Bile, which helps digest fats, is made by the...|Liver|Kidney,Lung",
    "Digestive enzymes are also made by the...|Pancreas|Thyroid,Spleen",
    "The large intestine mainly absorbs...|Water|Most vitamins,All protein",
    "Gut bacteria living in the intestines are the...|Microbiome|Skeleton,Plaque",
    "Fiber is partly fermented by...|Gut bacteria|Stomach acid,Saliva",
    "Digestion of starch begins in the...|Mouth|Liver,Kidney",
    "Stomach acid helps break down...|Food and kills many germs|Only vitamins,Only fiber"]));
  a.push(L("Energy balance and metabolism", "🔥", "Your body burns energy even while you sleep.",
    "<b>BMR</b> (basal metabolic rate) is the energy used at complete rest to keep you alive. <b>TDEE</b> (total daily energy expenditure) adds movement and the <b>thermic effect of food</b>. For most people BMR is the biggest part. Fat has about 9 kilocalories per gram, carbohydrate and protein about 4. Eating more energy than you use over time leads to weight gain.",
    "Energy in versus energy out, and which nutrient packs the most.", [
    "BMR is the energy your body uses...|At complete rest to stay alive|Only while running,Only while eating",
    "TDEE stands for...|Total daily energy expenditure|Total diet energy edition,Time of daily exercise",
    "For most people, the biggest part of daily energy use is...|BMR|Sports,Digesting food",
    "The energy used to digest and process food is the...|Thermic effect of food|Basal reflex,Fiber load",
    "Eating more energy than you use over a long time tends to cause...|Weight gain|Weight loss,Shorter bones",
    "Which has the most kilocalories per gram?|Fat|Carbohydrate,Protein",
    "Having more muscle generally...|Raises resting energy use a little|Lowers it to zero,Has no link to energy",
    "On a food label, 'Calories' really means...|Kilocalories|Grams,Servings",
    "Very strict crash diets can lead to...|Muscle loss and missing nutrients|Perfect health,Faster growth"]));
  a.push(L("Dietary Reference Intakes", "📋", "Nutrition scientists set numbers so we know how much is enough, and how much is too much.",
    "<b>DRI</b> is the umbrella name. The <b>EAR</b> meets the needs of half of healthy people. The <b>RDA</b> is set high enough for nearly all healthy people. When evidence is thin, an <b>AI</b> (adequate intake) is given. The <b>UL</b> is the highest daily intake unlikely to cause harm. On a label, <b>5% DV or less is low</b> and <b>20% DV or more is high</b>.",
    "Think: need, enough for nearly everyone, estimate, and upper limit.", [
    "DRI stands for...|Dietary Reference Intakes|Daily Risk Index,Diet Rating Inventory",
    "The RDA is set to meet the needs of...|Nearly all healthy people|Half of people,Only athletes",
    "The UL is the...|Highest daily intake unlikely to cause harm|Lowest intake allowed,Average intake",
    "An AI (adequate intake) is used when...|Evidence is not strong enough for an RDA|Everyone is deficient,The food is banned",
    "Regularly going above the UL raises the risk of...|Harmful effects|Faster growth,Better sleep",
    "On a food label, 5% DV or less of a nutrient is considered...|Low|High,Unsafe",
    "On a food label, 20% DV or more is considered...|High|Low,Missing",
    "If you eat two servings, the nutrients listed per serving are...|Doubled|Halved,Unchanged",
    "The EAR meets the needs of about...|Half of healthy people|All people,Nobody"]));
  a.push(L("Types of data and graphs", "🗂️", "Choosing the right kind of graph starts with knowing the kind of data.",
    "<b>Nominal</b> data are categories with no order (blood type). <b>Ordinal</b> data have an order (mild, moderate, severe). <b>Discrete</b> data are counts (clinic visits). <b>Continuous</b> data can take any value in a range (blood pressure). Use a <b>histogram</b> for a continuous measure, a <b>line graph</b> for change over time, and a <b>scatterplot</b> for two measures. A cut-off axis can exaggerate differences.",
    "Name the type of data first, then pick the graph.", [
    "Blood type is what kind of data?|Nominal|Continuous,Ordinal",
    "Pain rated mild, moderate or severe is...|Ordinal|Nominal,Continuous",
    "The number of clinic visits is...|Discrete|Continuous,Nominal",
    "Blood pressure in mmHg is...|Continuous|Nominal,Discrete",
    "A good graph for how a continuous measure is spread out is a...|Histogram|Flowchart,Calendar",
    "A good graph for change over time is a...|Line graph|Pie chart,Map key",
    "A graph that shows how two measures relate is a...|Scatterplot|Pie chart,Timeline",
    "A bar chart with a cut-off vertical axis can...|Make small differences look huge|Hide all the bars,Prove causes"]));
  a.push(C("Mean of readings", "🧮", "Find the mean of a set of readings.",
    "<b>Mean = sum of the values divided by how many values.</b> Five readings: add all five, then divide by 5.",
    "Add them, then divide by the count.",
    () => {
      const m = ri(60, 100); let v = [];
      for (let i = 0; i < 4; i++) v.push(m + ri(-12, 12));
      const last = 5 * m - v.reduce((s, x) => s + x, 0); v.push(last);
      return [`Five resting heart rate readings are ${v.join(", ")}. What is the mean?`, m,
        "Add all five numbers first.", "Divide the sum by 5, the number of readings.",
        "Example: readings 60, 62, 64 add to 186, and 186 / 3 = 62.", "❤️"];
    }));
  a.push(C("Sensitivity as a percent", "🎯", "Sensitivity can be shown as a percent.",
    "<b>Sensitivity (%) = people the test caught, divided by all people who truly have the condition, times 100.</b>",
    "Caught divided by all who are really sick, times 100.",
    () => {
      const N = pick([20, 40, 100, 200]), p = pick([60, 70, 80, 90, 95]), k = N * p / 100;
      return [`${N} people truly have a condition. A test correctly finds ${k} of them. What is the sensitivity as a percent?`, p,
        "Use only the people who really have the condition as the whole.", "Divide the number found by the number who truly have it, then multiply by 100.",
        "Example: a test finds 30 of 40 sick people, so 30 / 40 = 0.75, which is 75 percent.", "🎯"];
    }));
  a.push(C("Spread by generation", "🦠", "Use R0 to count how cases multiply.",
    "<b>Each generation = cases times R0.</b> With R0 of 3, one case leads to 3 new cases, and each of those leads to 3 more.",
    "Multiply by R0 once for each generation.",
    () => {
      const c = ri(1, 5), r = ri(2, 4);
      return [`An outbreak starts with ${c} ${c === 1 ? "case" : "cases"}. Each case infects ${r} people. How many cases are in the 2nd generation after the start?`, c * r * r,
        "The first generation gets cases times R0.", "Do the multiplying twice, once for each generation.",
        "Example: 2 cases, each infecting 3 people, give 6 in the first generation and 18 in the second.", "🧬"];
    }));
  a.push(C("Bell curve counts", "🔔", "Use the 68 and 95 rules to count people.",
    "<b>About 68% of values lie within 1 SD, and about 95% within 2 SD.</b> Multiply the group size by the percent.",
    "Percent of the group: multiply the group size by the percent, then divide by 100.",
    () => {
      const N = pick([200, 400, 500, 1000, 2000]), r = pick([68, 95]), sd = r === 68 ? 1 : 2;
      return [`In a group of ${N} adults, a measurement follows a bell curve. About how many are within ${sd} standard deviation${sd > 1 ? "s" : ""} of the mean? (Use ${r} percent.)`, N * r / 100,
        `The rule says ${r} percent of the group are inside that range.`, "Find the percent of the group size.",
        "Example: 100 people and 68 percent gives 100 x 68 / 100 = 68 people.", "📈"];
    }));
  a.push(MIX("Mixed practice", pk(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  a.push(MIX("Level 28 Challenge", pk(a, [0, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17, 13, 1])));

  // ================= LEVEL 29 =================
  const b = [];
  b.push(L("The Health Belief Model", "🧭", "Why do some people act to protect their health, and others do not?",
    "The <b>Health Belief Model</b> says action depends on: <b>perceived susceptibility</b> (could it happen to me?), <b>perceived severity</b> (how bad would it be?), <b>perceived benefits</b>, <b>perceived barriers</b> (cost, time, fear), <b>cues to action</b> (a reminder), and <b>self-efficacy</b> (I can do it).",
    "People act when risk feels real, the action helps, and barriers feel small.", [
    "Thinking 'this could happen to me' is perceived...|Susceptibility|Severity,Barrier",
    "Thinking 'this would be very serious' is perceived...|Severity|Susceptibility,Benefit",
    "Believing an action will really help is a perceived...|Benefit|Barrier,Cue",
    "Cost, time and fear are common perceived...|Barriers|Benefits,Cues",
    "A reminder text about a check-up is a...|Cue to action|Barrier,Placebo",
    "Believing 'I can do this' is...|Self-efficacy|Susceptibility,Severity",
    "To help people take action, a campaign can...|Lower barriers and raise confidence|Hide the risks,Add more barriers",
    "The Health Belief Model is mainly used to...|Explain and predict health behavior|Cure illness,Measure blood pressure"]));
  b.push(L("Theory of Planned Behavior", "🧩", "Intentions come before actions. What shapes them?",
    "The <b>Theory of Planned Behavior</b> says intention comes from three things: <b>attitude</b> (do I think it is good?), <b>subjective norms</b> (what do people I respect expect?), and <b>perceived behavioral control</b> (can I actually do it?). Strong intentions plus real control make action more likely.",
    "Attitude, norms, control lead to intention, then to action.", [
    "In this theory, intention is shaped by attitude, norms and...|Perceived behavioral control|Blood sugar,Luck alone",
    "Your own view that a behavior is good or bad is your...|Attitude|Norm,Control",
    "What people you respect expect you to do is a...|Subjective norm|Attitude,Skill",
    "Feeling able to do the behavior is perceived...|Behavioral control|Social pressure,Habit",
    "A student wants to bike to school but has no safe route. Which part is weak?|Perceived behavioral control|Attitude toward health,Intention only",
    "Intention comes...|Before the behavior|After the behavior,Never",
    "Friends who all walk to class can strengthen the...|Subjective norm|Blood pressure,Skill alone",
    "Even a strong intention may not lead to action if...|Real barriers get in the way|You are happy,You have time"]));
  b.push(L("The stress response", "😰", "Stress is the body's alarm system. It helps in short bursts and harms when it never turns off.",
    "The <b>sympathetic nervous system</b> and adrenal glands release <b>adrenaline</b> and <b>cortisol</b> for 'fight or flight': heart rate and breathing rise. The <b>parasympathetic</b> system calms things down ('rest and digest'). Selye's stages are <b>alarm, resistance, exhaustion</b>. Long-lasting stress is linked to poor sleep, high blood pressure and a weaker immune system.",
    "Short stress can help. Stress that never switches off wears the body down.", [
    "The 'fight or flight' response is run by the...|Sympathetic nervous system|Digestive system,Skeletal system",
    "A hormone released during stress by the adrenal glands is...|Cortisol|Calcium,Fiber",
    "The system that calms the body ('rest and digest') is the...|Parasympathetic system|Sympathetic system,Immune system",
    "In Selye's stages of stress, the first stage is...|Alarm|Exhaustion,Resistance",
    "Long-lasting stress is linked to...|Poor sleep and high blood pressure|Stronger bones,Better digestion",
    "During fight or flight, heart rate usually...|Goes up|Goes down to zero,Stays frozen",
    "Which can help calm the stress response?|Slow breathing and exercise|Skipping sleep,Doom scrolling all night",
    "Stress that lasts for months is called...|Chronic stress|Acute stress,Instant stress",
    "A short burst of stress, such as before a race, is...|Acute stress|Chronic stress,Permanent stress"]));
  b.push(L("Ways of coping", "🧰", "Everyone faces problems. How we handle them matters.",
    "<b>Problem-focused coping</b> acts on the cause (making a study plan). <b>Emotion-focused coping</b> eases feelings (talking, walking, breathing). <b>Avoidance</b> can bring short relief but often makes things worse. Seeking <b>social support</b> and asking for help are healthy skills. Use a mix that fits the situation.",
    "Fix what you can, soothe what you cannot, and ask for help.", [
    "Making a study plan for a hard class is...|Problem-focused coping|Avoidance,Denial",
    "Going for a walk to calm down is...|Emotion-focused coping|Problem-focused coping,Avoidance",
    "Putting off a problem and hoping it goes away is...|Avoidance|Problem-focused coping,Planning",
    "Avoidance often...|Gives short relief but makes the problem worse|Solves every problem,Builds fitness",
    "Asking a counselor or friend for help is...|Seeking social support|Avoidance,A weakness to hide",
    "Which coping choice is generally healthy?|Talking to a trusted person|Using substances to cope,Hiding all feelings",
    "When you cannot change the situation, which kind of coping may help most?|Emotion-focused|Problem-focused only,None",
    "Using many coping tools means...|You can choose what fits the situation|You are confused,You must stop"]));
  b.push(L("Biases in health decisions", "🧠", "Smart people make predictable thinking mistakes about their health.",
    "<b>Optimism bias</b>: believing bad things happen to others, not me. <b>Present bias</b>: favoring a reward now over a bigger one later. <b>Availability bias</b>: judging risk by what comes to mind easily, such as dramatic news. <b>Confirmation bias</b>: noticing only facts that fit your beliefs. <b>Anchoring</b>: leaning too heavily on the first number you hear.",
    "Notice the bias, then slow down and check the evidence.", [
    "Believing 'bad health things happen to others, not me' is...|Optimism bias|Present bias,Anchoring",
    "Choosing a treat now over a bigger health benefit later is...|Present bias|Optimism bias,Confirmation bias",
    "Fearing rare dramatic events because they are in the news is...|Availability bias|Anchoring,Present bias",
    "Noticing only the facts that fit what you already believe is...|Confirmation bias|Availability bias,Optimism bias",
    "Leaning too heavily on the first number you hear is...|Anchoring|Present bias,Optimism bias",
    "A good way to reduce bias in decisions is to...|Check reliable evidence and slow down|Go with the first feeling,Ask only people who agree",
    "A person skips sunscreen because 'skin cancer won't happen to me'. This is...|Optimism bias|Anchoring,Confirmation bias",
    "Making healthy choices the easy default helps people because of...|Present bias and effort|Perfect willpower,Good luck"]));
  b.push(L("Habits that stick", "🔁", "Most daily health behavior runs on autopilot.",
    "A habit loop has a <b>cue</b> (trigger), a <b>routine</b> (the action), and a <b>reward</b>. To build a habit: start tiny, attach it to an existing cue (habit stacking), and use an <b>if-then plan</b> (implementation intention): 'If it is 7 am, then I stretch for two minutes.' Habits take weeks to months to form, and a missed day is not failure.",
    "Make the cue obvious, the action small, and the reward quick.", [
    "In the habit loop, the trigger is the...|Cue|Routine,Reward",
    "In the habit loop, the action itself is the...|Routine|Cue,Reward",
    "The pleasant result that makes you repeat a habit is the...|Reward|Cue,Barrier",
    "'If it is 7 am, then I stretch' is an example of...|An if-then plan|A barrier,A bias",
    "Attaching a new habit to an existing one is called habit...|Stacking|Breaking,Skipping",
    "A good way to start a new habit is to...|Begin tiny and be consistent|Change everything at once,Wait for motivation",
    "Habits usually take...|Weeks to months to form|One minute,Exactly one day",
    "Missing a day of a new habit means...|You can simply restart the next day|The habit is ruined forever,You must quit"]));
  b.push(L("Motivation and self-determination", "💪", "Wanting to change is different from being pushed to change.",
    "<b>Intrinsic motivation</b> comes from enjoying or valuing the activity. <b>Extrinsic motivation</b> comes from outside rewards or pressure. <b>Self-determination theory</b> says people thrive when three needs are met: <b>autonomy</b> (choice), <b>competence</b> (feeling skilled), and <b>relatedness</b> (connection). Support beats nagging.",
    "Choice, skill and connection keep motivation alive.", [
    "Exercising because you enjoy it is...|Intrinsic motivation|Extrinsic motivation,Pressure",
    "Exercising only to win a prize is...|Extrinsic motivation|Intrinsic motivation,Habit",
    "Autonomy means having...|A sense of choice|A trainer,A uniform",
    "Competence means feeling...|Skilled and able to improve|Always perfect,Watched",
    "Relatedness means feeling...|Connected to others|Alone,Competitive",
    "Which approach tends to build lasting motivation?|Giving choices and encouraging progress|Nagging and shaming,Hiding goals",
    "A team that cheers effort supports the need for...|Relatedness|Pressure,Isolation",
    "Self-determination theory says people do best when their basic needs are...|Met|Ignored,Punished"]));
  b.push(L("Taking treatment as planned", "💊", "A treatment only works if it is used the way it was meant to be.",
    "<b>Adherence</b> means following a treatment plan: taking medicines as directed, going to follow-ups, and making agreed changes. People may stop because of cost, side effects, forgetting, or not understanding. Helpful tools include pill organizers, reminders, and honest talks with the care team (<b>shared decision-making</b>). Never stop or change a medicine without checking with a clinician.",
    "If something is a problem, tell the care team rather than quietly stopping.", [
    "Following a treatment plan as directed is...|Adherence|Prevalence,Bias",
    "A common reason people stop medicines is...|Cost or side effects|Too much sleep,Perfect health",
    "A pill organizer helps with...|Remembering doses|Making pills stronger,Faster digestion",
    "If a medicine causes problems, the best step is to...|Tell the doctor or pharmacist|Quietly stop it,Double the dose",
    "Shared decision-making means...|Patient and clinician decide together|The patient is not told,Only the pharmacist decides",
    "Feeling better is not always a sign to...|Stop a medicine without advice|Keep resting,Drink water",
    "Which can raise adherence?|Clear instructions and reminders|Complicated schedules,Hidden costs",
    "A good question to ask about a new medicine is...|What are the side effects and what should I watch for?|Can I share it with a friend?,Can I take extra?"]));
  b.push(L("Levels of health care", "🏥", "Health care is organized in layers, from the first visit to specialist care.",
    "<b>Primary care</b> is the first contact: family doctors, nurses, community clinics, check-ups and prevention. <b>Secondary care</b> is specialists, usually by referral. <b>Tertiary care</b> is advanced hospital care such as major surgery or intensive care. <b>Emergency care</b> is for urgent, life-threatening problems. A <b>referral</b> sends you from one level to another.",
    "Start close to home, and move up to special care when needed.", [
    "A family doctor visit is which level of care?|Primary|Secondary,Tertiary",
    "Seeing a heart specialist after a referral is mostly...|Secondary care|Primary care,Self-care",
    "Intensive care and major surgery are examples of...|Tertiary care|Primary care,Prevention",
    "A referral is when...|You are sent to another level or specialist|You skip a visit,A friend recommends a food",
    "Check-ups and vaccines are mostly part of...|Primary care|Tertiary care,Emergency care",
    "Chest pain with trouble breathing should lead to...|Emergency care right away|Waiting a week,A routine form",
    "Why is strong primary care important?|It prevents problems and costs less than late care|It replaces all hospitals,It is only for emergencies",
    "A community health clinic mainly offers...|Primary care|Tertiary care,Research labs"]));
  b.push(L("Health insurance basics", "🧾", "Insurance spreads the cost of care across many people.",
    "A <b>premium</b> is the regular payment to keep coverage. A <b>deductible</b> is what you pay first before the plan pays its share. A <b>copay</b> is a fixed fee per visit. <b>Coinsurance</b> is your percent of a bill after the deductible. The <b>out-of-pocket maximum</b> caps what you pay in a year for covered care. Staying <b>in-network</b> usually costs less.",
    "Premium to have it, deductible first, then copays and coinsurance, capped by the maximum.", [
    "The regular payment that keeps your coverage active is the...|Premium|Deductible,Copay",
    "What you pay before the plan starts paying its share is the...|Deductible|Premium,Network",
    "A fixed fee for a visit is a...|Copay|Premium,Deductible",
    "Your percentage share of a bill after the deductible is...|Coinsurance|Premium,Copay",
    "The cap on what you pay in a year for covered care is the...|Out-of-pocket maximum|Premium,Referral",
    "Doctors and hospitals that have a deal with your plan are...|In-network|Out-of-network,Tertiary",
    "Why compare plans before choosing?|Costs and coverage differ|All plans are identical,Premiums never change",
    "Pooling many people's payments helps because...|Risk and cost are shared|Everyone gets sick together,It lowers all diseases"]));
  b.push(L("Models of health systems", "🌍", "Countries organize and pay for health care in different ways.",
    "In a <b>tax-funded</b> system, government taxes pay for care, and many services are free at the point of use. In a <b>social insurance</b> system, required contributions fund competing insurers or funds. In a <b>market-based</b> model, private insurance and out-of-pocket payment play a bigger role. Many countries <b>mix</b> these. All systems aim for good access, quality and fair cost.",
    "Ask who pays: taxes, required insurance contributions, or the person.", [
    "A system mainly paid for by taxes is...|Tax-funded|Market-based,Out-of-pocket",
    "A system where required contributions fund insurers or funds is...|Social insurance|Pure tax-funded,A black market",
    "A system with a bigger role for private insurance and personal payment is...|Market-based|Tax-funded,Social insurance",
    "Paying directly yourself at the time of care is...|Out-of-pocket payment|A premium,A tax",
    "Many countries use...|A mix of approaches|Only one approach,No approach",
    "All health systems aim for good access, quality and...|Fair costs|Hidden fees,Fewer nurses",
    "Services free at the point of use are paid for by...|Taxes or pooled funds|The patient on the day,Nobody",
    "When comparing systems, a fair question is...|Who can get care and what does it cost?|Which flag is bigger?,Which has more hospitals named after people"]));
  b.push(L("Access and universal coverage", "🚪", "Care only helps if people can reach it.",
    "<b>Universal health coverage (UHC)</b> means everyone can get the health services they need without financial hardship. Access has several parts: <b>availability</b> (the service exists), <b>affordability</b>, <b>accessibility</b> (distance, hours, transport), and <b>acceptability</b> (language, culture, respect). Barriers include cost, distance, long waits, language gaps and fear.",
    "If any one part is missing, access suffers.", [
    "UHC stands for...|Universal health coverage|United health charity,Urgent hospital care",
    "UHC aims for everyone to get needed services without...|Financial hardship|Any check-ups,Any vaccines",
    "A clinic that exists but is 100 km away has a problem with...|Accessibility|Availability,Acceptability",
    "A clinic with no interpreter may struggle with...|Acceptability|Availability,Affordability",
    "A service people cannot pay for has a problem with...|Affordability|Availability,Accessibility",
    "Which is a common barrier to care?|Long distance or long waits|Free transport,Short forms",
    "Evening and weekend hours can improve...|Accessibility|Premiums,Referrals",
    "Respectful care in a person's own language improves...|Acceptability|Distance,Deductibles"]));
  b.push(L("Patient safety and quality", "🛡️", "Hospitals are busy places where mistakes can happen. Good systems catch them.",
    "The <b>Swiss cheese model</b> says harm happens when holes in several layers of defense line up, so adding layers helps. Tools include <b>checklists</b>, clear <b>handoffs</b>, and <b>hand hygiene</b>. A <b>near miss</b> is an error caught before harm: reporting it helps everyone learn. A <b>just culture</b> fixes systems rather than only blaming people. The 'five rights' of medicines: right patient, drug, dose, route, time.",
    "Safety comes from systems and layers, not just from trying harder.", [
    "In the Swiss cheese model, harm happens when...|Holes in several layers line up|One person is tired|Cheese is missing",
    "An error caught before it reaches the patient is a...|Near miss|Direct harm,Treatment",
    "A checklist helps prevent errors by...|Making sure key steps are not missed|Adding noise,Replacing staff",
    "Washing hands between patients prevents...|Infections spreading|Hunger,Allergies",
    "A just culture focuses on...|Fixing the system and learning|Hiding errors,Only punishing",
    "Passing key information clearly between shifts is a...|Handoff|Referral,Premium",
    "One of the five rights of medicine is the right...|Dose|Color,Brand slogan",
    "Reporting near misses is useful because...|Others can learn and fix the cause|It hides the problem,It breaks the rules"]));
  b.push(L("Telehealth and health apps", "📱", "Care can now arrive by video, phone or app. Use it wisely.",
    "<b>Telehealth</b> means getting care by video or phone. It helps people far from clinics or with little time, and works well for follow-ups and some mental health care. It cannot do a physical exam, so some problems still need an in-person visit. Check that an app is from a trusted source, protects your <b>privacy</b>, and has real evidence behind its claims.",
    "Good for convenience and reach, but check privacy, evidence, and when to go in person.", [
    "Telehealth means getting care through...|Video or phone|A letter only,Food labels",
    "A big benefit of telehealth is...|Reaching people far from clinics|Physical exams by video,Free medicine",
    "A limit of telehealth is that it cannot...|Do a hands-on physical exam|Share advice,Ask questions",
    "Severe symptoms such as trouble breathing need...|Emergency care in person|A health app only,Waiting",
    "Before using a health app, check that it...|Protects privacy and has real evidence|Asks for all passwords,Promises miracle cures",
    "A sign of a doubtful health app is...|A claim that it cures everything|A clear privacy policy,Named experts",
    "Telehealth works well for...|Many follow-up visits|Surgery,Broken bone setting",
    "Sharing health data with an app means you should know...|Who can see and use it|Nothing,Only its color"]));
  b.push(C("Deductible and coinsurance", "🧾", "Work out what you pay when you have a deductible and coinsurance.",
    "<b>You pay: the deductible, plus the coinsurance percent of the rest of the bill.</b> The plan pays the remaining share.",
    "Subtract the deductible, take the percent of what is left, then add the deductible.",
    () => {
      const d = pick([200, 500, 1000]), rest = pick([200, 400, 800, 1000]), pct = pick([10, 20, 25]);
      return [`Your deductible is $${d} and your coinsurance is ${pct} percent. A medical bill is $${d + rest}. How many dollars do you pay in total?`, d + rest * pct / 100,
        "You pay the whole deductible first.", `Find ${pct} percent of the part of the bill above the deductible, then add the deductible.`,
        "Example: deductible $100, coinsurance 10 percent, bill $600. The rest is $500, 10 percent is $50, so you pay $150.", "🧾"];
    }));
  b.push(C("Cost over a year", "💳", "Add up regular insurance costs over a year.",
    "<b>Yearly cost = 12 times the monthly premium, plus copays times visits.</b>",
    "Multiply the premium by 12, then add the copay total.",
    () => {
      const p = pick([100, 150, 200, 250, 300]), n = ri(2, 6), c = pick([10, 15, 20, 25]);
      return [`Your premium is $${p} each month. You have ${n} doctor visits this year with a $${c} copay each. What is the total cost for the year in dollars?`, 12 * p + n * c,
        "A year has 12 months of premiums.", "Multiply the premium by 12, then add the copays.",
        "Example: premium $50, 12 months is $600. Two visits at $5 copay is $10. Total $610.", "💳"];
    }));
  b.push(C("Adherence percent", "💊", "Measure how many doses were taken as directed.",
    "<b>Adherence (%) = doses taken, divided by doses prescribed, times 100.</b>",
    "Doses taken divided by doses prescribed, times 100.",
    () => {
      const N = pick([20, 30, 40, 50, 100]), p = pick([60, 70, 80, 90]), k = N * p / 100;
      return [`A person was prescribed ${N} doses and took ${k} of them. What is the adherence as a percent?`, p,
        "The doses prescribed are the whole.", "Divide the doses taken by the doses prescribed, then multiply by 100.",
        "Example: 18 of 20 doses taken is 18 / 20 = 0.9, which is 90 percent.", "💊"];
    }));
  b.push(C("Survey response rate", "📋", "Check how many people answered a health survey.",
    "<b>Response rate (%) = people who answered, divided by people invited, times 100.</b> A low rate can cause non-response bias.",
    "Answers divided by invitations, times 100.",
    () => {
      const N = pick([200, 400, 500, 1000]), p = pick([20, 25, 30, 40, 50, 60]), k = N * p / 100;
      return [`A wellness survey was sent to ${N} students. ${k} answered. What is the response rate as a percent?`, p,
        "The number invited is the whole.", "Divide those who answered by those invited, then multiply by 100.",
        "Example: 60 answers from 200 invited is 60 / 200 = 0.3, which is 30 percent.", "📋"];
    }));
  b.push(MIX("Mixed practice", pk(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  b.push(MIX("Level 29 Challenge", pk(b, [0, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1])));

  // ================= LEVEL 30 =================
  const c = [];
  c.push(L("Health transitions", "📈", "As countries grow, the main causes of illness change.",
    "The <b>demographic transition</b>: birth and death rates fall and people live longer, so the population ages. The <b>epidemiologic transition</b>: the main burden shifts from infectious diseases, hunger and childbirth risks toward <b>noncommunicable diseases</b> like heart disease and diabetes. Many lower-income countries face <b>both</b> kinds of burden at once.",
    "Better water, food and medicine reduce infections first, and longer lives bring chronic disease.", [
    "The epidemiologic transition is a shift in main health burden from infectious diseases toward...|Noncommunicable diseases|Only injuries,Vitamin gaps",
    "The demographic transition leads to populations that are...|Older on average|Always younger,The same age",
    "Falling death rates and longer lives help cause...|Population aging|More infections,Fewer people",
    "A country facing infectious diseases and chronic diseases at the same time has a...|Double burden|Single burden,Zero burden",
    "Which helped reduce infectious disease deaths?|Clean water and vaccines|Crowding,Less food",
    "Heart disease and diabetes are examples of...|Noncommunicable diseases|Infectious diseases,Vector-borne diseases",
    "As people live longer, which kind of care needs often grows?|Care for chronic conditions|Only newborn care,Only injuries",
    "A population with many old people and few young people is...|Aging|Growing fast,Newborn-only"]));
  c.push(L("Global health goals", "🎯", "The world sets shared goals to improve health for all.",
    "The United Nations' <b>Sustainable Development Goals (SDGs)</b> are 17 goals set for 2030. <b>Goal 3</b> is 'Good health and well-being'. Targets include lowering deaths of mothers and children, ending epidemics like TB and malaria, cutting early deaths from noncommunicable diseases, and reaching universal health coverage. Many goals affect health, such as clean water (Goal 6) and no hunger (Goal 2).",
    "Health links to water, food, education and more.", [
    "The Sustainable Development Goals are due by the year...|2030|2010,2100",
    "How many SDGs are there?|17|3,50",
    "SDG 3 is about...|Good health and well-being|Space travel,Sports prizes",
    "SDG 6 on clean water and sanitation affects health by...|Reducing waterborne illness|Raising prices,Cutting vaccines",
    "SDG 2 is about ending...|Hunger|Rain,Traffic",
    "UHC is a target under which health goal?|SDG 3|SDG 17 only,None",
    "Why do many different goals affect health?|Health depends on water, food, education and more|Health is separate from everything,Only doctors matter",
    "Who set the SDGs?|The United Nations and its member countries|One company,One school"]));
  c.push(L("Primary health care and community workers", "🏘️", "The best-value care often starts in the community.",
    "<b>Primary health care</b> brings services close to where people live. A world declaration at <b>Alma-Ata in 1978</b> named it key to 'health for all', and it was renewed in <b>Astana in 2018</b>. <b>Community health workers</b> are trained local people who give basic care, teach prevention, and link families to clinics. They are especially valuable where doctors are few.",
    "Care near home, led by trusted local people, reaches more people.", [
    "Primary health care aims to bring services...|Close to where people live|Only to big cities,Only to hospitals",
    "Community health workers are...|Trained local people who give basic care and teaching|Only surgeons,Only inspectors",
    "A community health worker may help by...|Teaching prevention and linking families to clinics|Performing major surgery,Setting prices",
    "The Alma-Ata declaration of 1978 promoted...|Health for all through primary care|Space research,Currency exchange",
    "Community health workers are most valuable where...|There are few doctors|There are many hospitals,There are no people",
    "Why are trusted local workers effective?|People understand them and talk openly|They are strangers,They avoid families",
    "Primary care tends to be...|Good value for the health it delivers|The most expensive level,Never useful",
    "Health for all means...|Everyone should have a chance to be healthy|Only adults,Only the rich"]));
  c.push(L("Child survival tools", "💧", "Simple, cheap tools save millions of children.",
    "<b>Oral rehydration solution (ORS)</b> replaces water and salts lost in diarrhea and is a life-saving, low-cost treatment, often with <b>zinc</b>. Other tools: <b>vaccines</b>, <b>exclusive breastfeeding</b> for the first six months when possible, safe water and handwashing, <b>insecticide-treated bed nets</b> where malaria occurs, and skilled care around birth.",
    "Many top child-saving tools are simple and cheap.", [
    "ORS stands for...|Oral rehydration solution|Organized rescue service,Open risk survey",
    "ORS mainly replaces...|Water and salts lost in diarrhea|Vitamins only,Bone minerals",
    "Zinc is given along with ORS to help...|Children recover from diarrhea|Cure measles,Grow taller instantly",
    "Exclusive breastfeeding is recommended for the first...|Six months|Week,Three years",
    "Bed nets treated with insecticide help prevent...|Malaria|Measles,Diabetes",
    "Handwashing with soap helps prevent...|Diarrhea and respiratory infections|Broken bones,Tooth decay only",
    "Why are vaccines a top child-survival tool?|They prevent deadly diseases|They replace food,They cure all illness",
    "Having skilled care at birth helps...|Mothers and babies stay safe|Only teachers,Nobody"]));
  c.push(L("Eradication and elimination", "🧿", "Some diseases have been stopped for good. Others are close.",
    "<b>Control</b> reduces a disease to a low level. <b>Elimination</b> removes it from a country or region. <b>Eradication</b> removes it from the whole world forever. <b>Smallpox</b> was declared eradicated in <b>1980</b>, thanks to vaccination, surveillance and worldwide teamwork. Polio and Guinea worm disease are close to eradication.",
    "Control, then elimination in places, then eradication everywhere.", [
    "Reducing a disease to a low level is...|Control|Eradication,Elimination",
    "Removing a disease from a country or region is...|Elimination|Eradication,Control",
    "Removing a disease from the whole world forever is...|Eradication|Control,Elimination",
    "Which human disease has been eradicated?|Smallpox|Measles,Flu",
    "Smallpox was declared eradicated in...|1980|1880,2020",
    "Which tools helped eradicate smallpox?|Vaccination and surveillance|Only masks,Luck",
    "A disease is eradicated when...|It no longer occurs anywhere in the world naturally|Cases fall in one town,A vaccine is invented",
    "Why is polio eradication taking long?|It must reach every child, including hard-to-reach places|It has no vaccine,It is not infectious"]));
  c.push(L("Malaria and tuberculosis", "🦟", "Two old diseases still cause great suffering, and both can be prevented or treated.",
    "<b>Malaria</b> is caused by a parasite spread by the bite of <b>Anopheles mosquitoes</b>. Prevention: bed nets, mosquito control, early testing and treatment, and vaccines in some regions. <b>Tuberculosis (TB)</b> is a bacterial infection, usually of the lungs, spread through the air by coughs. It is treated with several antibiotics taken for months. Finishing the whole course matters.",
    "Block the bite for malaria. Treat fully for TB.", [
    "Malaria is spread by the bite of...|Anopheles mosquitoes|Ticks,Flies",
    "Malaria is caused by a...|Parasite|Fungus,Vitamin shortage",
    "A key way to prevent malaria is...|Sleeping under treated bed nets|Eating more salt,Sleeping less",
    "Tuberculosis (TB) is caused by...|Bacteria|A parasite,A vitamin gap",
    "TB usually affects the...|Lungs|Skin only,Teeth",
    "TB is spread...|Through the air by coughing|By mosquito bites,By handshakes only",
    "TB treatment usually takes...|Several antibiotics over months|One pill,A bed net",
    "Stopping TB medicine early can cause...|The infection to return and resist treatment|A cure,Stronger bones"]));
  c.push(L("Antimicrobial resistance", "💊", "Germs can learn to survive the medicines made to kill them.",
    "<b>Antimicrobial resistance (AMR)</b> happens when germs change so medicines no longer work. It is driven by overuse and misuse of antibiotics, such as taking them for viral colds or not finishing a course. <b>Antibiotics do not work on viruses.</b> Fighting AMR needs good prescribing, infection prevention, vaccines and clean water.",
    "Use antibiotics only when prescribed, exactly as directed.", [
    "AMR stands for...|Antimicrobial resistance|Animal medicine records,Annual medical review",
    "AMR happens when germs...|Change so medicines no longer work|Become weaker for good,Disappear",
    "Antibiotics work on...|Bacteria|Viruses,Allergies",
    "Taking antibiotics for a cold caused by a virus is...|Misuse that does not help|Always right,A cure",
    "A way to slow AMR is to...|Use antibiotics only when prescribed|Share leftover pills,Save pills for later",
    "Vaccines and handwashing help fight AMR because they...|Prevent infections so fewer medicines are needed|Make germs stronger,Replace doctors",
    "Overusing antibiotics in farm animals can...|Add to resistance|Cure every disease,Improve all health",
    "Clean water and sanitation reduce AMR by...|Preventing infections|Adding antibiotics to water,Hiding germs"]));
  c.push(L("Climate and health", "🌡️", "A changing climate affects the air, water, food and the diseases people face.",
    "Climate change raises the risk of <b>heat illness</b>, <b>wildfire smoke</b> and air pollution, <b>floods</b> and storms, crop and water shortages, and changes in where <b>mosquito-borne diseases</b> spread. Those most at risk include older adults, young children, outdoor workers and people with low incomes. Cleaner energy, trees, green space and warning systems protect health.",
    "Think air, water, food, heat and disease.", [
    "Hotter weather raises the risk of...|Heat illness|Frostbite only,Vitamin gaps",
    "Wildfire smoke can harm the...|Lungs|Toenails,Eyesight color",
    "Warmer climates can help mosquitoes spread...|To new areas|Only in winter,Nowhere",
    "Which group is often at higher risk in a heat wave?|Older adults and outdoor workers|Everyone equally,Nobody",
    "A health benefit of cleaner energy is...|Less air pollution|More smoke,More heat",
    "A heat early-warning system helps people to...|Prepare and protect themselves|Ignore the weather,Stay outside",
    "Floods can harm health by...|Contaminating water and causing injuries|Making crops grow in minutes,Improving sanitation",
    "Green spaces and trees in cities can...|Cool the air and support wellbeing|Raise heat,Block all air"]));
  c.push(L("Health in humanitarian crises", "⛺", "When people must leave their homes after a disaster or conflict, basic health needs become urgent.",
    "Humanitarian health work focuses on <b>safe water</b>, <b>sanitation</b>, food, shelter, <b>vaccination</b> (especially measles), treatment of injuries and illness, and <b>mental health and psychosocial support</b>. Crowding raises the risk of infections. <b>Refugees</b> have the right to protection. Groups like the Red Cross and Red Crescent and UNICEF help.",
    "Meet basic needs first: water, food, shelter, safety and care.", [
    "In a crisis camp, which need is most urgent?|Safe water and food|New toys,Advertising",
    "Crowding in shelters raises the risk of...|Infections spreading|Better sleep,Weaker germs",
    "A key vaccine to give quickly in crowded camps is for...|Measles|Hair loss,Cavities",
    "Mental health and psychosocial support helps people...|Cope with fear and loss|Forget their names,Avoid water",
    "Sanitation in a camp means...|Safe toilets and waste handling|Free games,Louder music",
    "A refugee is a person who...|Has fled their country for safety|Visits for fun,Works in a clinic",
    "Which organization helps in crises?|The Red Cross or Red Crescent|A game company,A candy brand",
    "Health care in a crisis should be...|Based on need and given with respect|Based on wealth,Only for adults"]));
  c.push(L("Pandemic preparedness", "🚨", "Outbreaks can cross borders in hours. Countries work together to be ready.",
    "The <b>International Health Regulations (IHR)</b> require countries to build the ability to detect, report and respond to health threats. The WHO can declare a <b>Public Health Emergency of International Concern (PHEIC)</b>. Good preparation includes <b>early warning surveillance</b>, trained health workers, strong labs, supplies, clear communication, and <b>trust</b> in the public. Fast sharing of information helps everyone.",
    "Detect early, share fast, respond together.", [
    "IHR stands for...|International Health Regulations|Internal Hospital Rules,Infection Help Radio",
    "A PHEIC is a...|Public Health Emergency of International Concern|Personal Health Exam,Planned Hospital Event",
    "Which organization can declare a PHEIC?|The World Health Organization|A local store,A school team",
    "Early warning surveillance helps by...|Spotting outbreaks quickly|Hiding outbreaks,Slowing labs",
    "Sharing outbreak information fast helps...|All countries respond sooner|Only one country,Nobody",
    "Which is part of being prepared?|Trained workers and strong labs|Fewer tests,Closing clinics",
    "Public trust matters because...|People follow advice they believe|Trust is unrelated,It replaces vaccines",
    "A pandemic can spread widely because of...|Fast travel between countries|Closed borders always,Isolated villages only"]));
  c.push(L("Risk communication", "📣", "In an emergency, how and when you speak can save lives.",
    "Good <b>risk communication</b> is <b>timely, honest, clear, empathetic and actionable</b>. Admit what is not yet known, say what is being done, and give specific steps people can take. Use simple words, trusted messengers, and several channels (radio, text, community leaders). Update as facts change, and correct mistakes openly.",
    "Be first, be right, be honest about uncertainty, and say what to do.", [
    "Good risk communication is timely, honest, clear and...|Actionable|Secret,Technical only",
    "When facts are uncertain, officials should...|Say what is known and unknown|Pretend to know everything,Say nothing",
    "A useful message tells people...|What specific steps they can take|Only how scary it is,Only statistics",
    "Using several channels such as radio and text helps...|Reach more people|Confuse people,Reduce trust",
    "Trusted messengers such as community leaders can...|Help people believe and act on advice|Replace science,Block news",
    "When new facts change advice, officials should...|Update and explain why|Hide the change,Blame the public",
    "Technical jargon in an emergency message is usually...|A barrier to understanding|Always best,Required",
    "Correcting a mistake openly tends to...|Build trust|Destroy all trust,Be unnecessary"]));
  c.push(L("Misinformation and media literacy", "🔎", "False health claims spread fast. Smart readers check before sharing.",
    "<b>Misinformation</b> is false information shared, even by accident. <b>Disinformation</b> is spread on purpose. Try <b>lateral reading</b>: open new tabs and see what trusted sources say about the source. Check who made it, the date, the evidence, and whether it tries to make you angry or scared. <b>Prebunking</b> teaches common tricks in advance. Pause before sharing.",
    "Stop, look up the source elsewhere, check evidence, then decide.", [
    "False information shared by accident is...|Misinformation|Disinformation,Evidence",
    "False information spread on purpose is...|Disinformation|Misinformation,A study",
    "Lateral reading means...|Checking what other trusted sources say about the source|Reading only one page,Reading backwards",
    "A warning sign of a doubtful health claim is...|It tries to scare you and demands you share it|It names a study and a date,It shows evidence",
    "Before sharing a health post you should...|Pause and check the source|Share at once,Add more drama",
    "Prebunking means...|Teaching common tricks before people meet them|Deleting every post,Ignoring the news",
    "A strong health source usually has...|Named experts and checkable evidence|Only a famous face,Only many likes",
    "Testimonials ('it worked for me') are...|Weak evidence compared with good studies|Strong proof,Required"]));
  c.push(L("Campaigns, framing and norms", "🎨", "A good message is shaped for the people it is meant to reach.",
    "<b>Social marketing</b> uses marketing ideas to promote healthy behavior. <b>Audience segmentation</b> splits people into groups with tailored messages. <b>Framing</b> can stress gains ('washing keeps you healthy') or losses ('skipping puts you at risk'). <b>Social norm</b> messages show what most people do. Always <b>pretest</b> a campaign and <b>evaluate</b> it afterward. Messages must be honest.",
    "Know your audience, test the message, and measure the result.", [
    "Splitting people into groups to tailor messages is...|Audience segmentation|Random sampling,Referral",
    "A message about benefits ('washing keeps you healthy') uses a...|Gain frame|Loss frame,Random frame",
    "A message about harms of not acting ('skipping puts you at risk') uses a...|Loss frame|Gain frame,Neutral frame",
    "Telling people what most of their peers do uses...|Social norms|Fear only,Secrecy",
    "Testing a message with a small audience first is...|Pretesting|Posting,Blinding",
    "After a campaign, teams should...|Evaluate whether it worked|Delete the data,Never look",
    "Using social marketing ideas for health aims to...|Promote healthy behavior|Sell unrelated products,Hide risks",
    "A campaign message must always be...|Honest|Exaggerated,Scary at any cost"]));
  c.push(L("Numbers, plain language and culture", "🗣️", "Clear communication includes the numbers and respects the person.",
    "<b>Natural frequencies</b> ('2 in 100 people') are easier to understand than percentages. Give <b>absolute risk</b> as well as relative risk. Use <b>plain language</b>, and check understanding with the <b>teach-back</b> method: ask the person to explain in their own words. <b>Cultural humility</b> means listening and learning about a person's culture. Use qualified interpreters, not family members, for medical talks.",
    "Short words, simple numbers, check understanding, respect culture.", [
    "'2 in 100 people' is an example of...|Natural frequencies|A p-value,A confidence interval",
    "Teach-back means...|Asking the person to explain in their own words|The clinician repeating louder,Giving a test grade",
    "Which is plain language?|'High blood pressure'|'Hypertension, essential type'|'Elevated systolic parameters'",
    "Cultural humility means...|Listening and learning about a person's culture|Assuming you know it all,Ignoring beliefs",
    "For medical talks, a good choice for language help is a...|Qualified interpreter|Child relative,Guess from signs",
    "Reporting both absolute and relative risk helps people...|Judge the real size of a risk|Feel scared,Skip decisions",
    "A fair way to share health information is...|Short sentences and a clear next step|Long technical paragraphs,Only numbers",
    "Large print, audio and pictures help make information...|More accessible|Less useful,Illegal"]));
  c.push(C("Vaccination coverage", "💉", "Measure how many children are protected.",
    "<b>Coverage (%) = children vaccinated, divided by all eligible children, times 100.</b>",
    "Vaccinated divided by all eligible, times 100.",
    () => {
      const N = pick([200, 400, 500, 1000]), p = pick([70, 75, 80, 85, 90, 95]), k = N * p / 100;
      return [`A district has ${N} eligible children. ${k} have had the vaccine. What is the coverage as a percent?`, p,
        "The whole is all the eligible children.", "Divide the number vaccinated by the number eligible, then multiply by 100.",
        "Example: 45 of 50 children vaccinated is 45 / 50 = 0.9, which is 90 percent.", "💉"];
    }));
  c.push(C("Out of 1000", "🔢", "Turn percents into counts that are easy to picture.",
    "<b>Percent to 'out of 1000': multiply the percent by 10.</b> And the other way: divide the count out of 1000 by 10.",
    "Move between percent and 'per 1000' by multiplying or dividing by 10.",
    () => {
      if (Math.random() < 0.5) {
        const p = ri(1, 9) * pick([1, 2, 3]);
        return [`A condition affects ${p} percent of people. How many people out of 1000 is that?`, p * 10,
          "One percent means 1 out of 100.", "There are ten groups of 100 in 1000, so multiply the percent by 10.",
          "Example: 4 percent means 4 x 10 = 40 out of 1000.", "🔢"];
      }
      const k = ri(1, 9) * pick([10, 20, 30]);
      return [`${k} out of 1000 people have a condition. What percent is that?`, k / 10,
        "1000 is ten times 100.", "Divide the count out of 1000 by 10 to get the percent.",
        "Example: 80 out of 1000 is 80 / 10 = 8 percent.", "🔢"];
    }));
  c.push(C("Doubling time", "⏱️", "Use the rule of 70 to estimate how long a population takes to double.",
    "<b>Doubling time (years) is about 70 divided by the yearly growth rate in percent.</b> It is a quick estimate.",
    "Divide 70 by the growth rate.",
    () => {
      const r = pick([1, 2, 5, 7, 10, 14, 35]);
      return [`A town's population grows ${r} percent each year. Using the rule of 70, about how many years until it doubles?`, 70 / r,
        "A higher growth rate should mean a shorter doubling time.", "Divide 70 by the percent growth per year.",
        "Example: growth of 5 percent gives 70 / 5 = 14 years.", "⏱️"];
    }));
  c.push(C("Bed net planning", "🛏️", "Plan how many nets a village needs and what they cost.",
    "<b>Nets needed = people divided by people per net. Total cost = nets times price per net.</b>",
    "Find the number of nets first, then multiply by the price.",
    () => {
      const P = pick([40, 60, 100, 150, 200, 300]), cost = pick([3, 4, 5, 6]);
      return [`A village has ${P} people. Each bed net covers 2 people and costs $${cost}. What is the total cost of nets for everyone, in dollars?`, P / 2 * cost,
        "First work out how many nets cover the whole village.", "Divide the people by 2 for the nets, then multiply by the cost of one net.",
        "Example: 10 people need 5 nets, and at $2 each that costs $10.", "🦟"];
    }));
  c.push(MIX("Mixed practice", pk(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  c.push(MIX("Level 30 Challenge", pk(c, [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 2])));

  Object.assign(HEALTH_LEVELS, { 28: a, 29: b, 30: c });
})();
