// ext/geo-22-24.js : Mind Lab Geography levels 22-24 (60 lessons): advanced human and physical geography, geopolitics, data and mapping skills
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const LS = (title, make) => ({ title, make });
  const fmt = n => n.toLocaleString("en-US");

  // Multiple choice. s = 3-4 slides, n = nudge, c = clue, items = [question, right, "wrong1|wrong2", optional picture]
  const MC = (s, n, c, items) => {
    const make = () => {
      const [q, a, w, v] = pick(items), ex = pick(items.filter(x => x[1] !== a && x[0] !== q));
      const r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: [n, c, `Example: "${ex[0]}" The answer is "${ex[1]}". Now do yours.`] };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const NUM = (s, fn) => { fn.teach = () => s.map(x => slide(x[0], x[1], x[2])); return fn; };
  const Q = (text, answer, h1, h2, h3) => ({ text, answer, hints: [h1, h2, h3] });

  // ---------- LEVEL 22 number makers ----------
  const IMR = NUM([
    ["Infant mortality rate", "👶", "The <b>infant mortality rate</b> is the number of babies who die before their first birthday for every <b>1,000 live births</b> in a year. It is a key sign of a country's health care."],
    ["Life expectancy", "⏳", "<b>Life expectancy</b> is the average number of years a newborn is expected to live. Rich countries often have life expectancy above 80 and low infant mortality. Poorer countries often have lower life expectancy and higher infant mortality."],
    ["How to work it out", "📝", "Rate = deaths ÷ births x 1,000. Example: 5,000 births and 50 deaths. 50 out of 5,000 is 10 out of 1,000. So the rate is 10 per 1,000."]
  ], () => {
    const m = Math.random(), b = pick([10000, 20000, 25000, 50000, 100000]), per = b / 1000, r = ri(2, 60), d = r * per;
    if (m < 0.45) return Q(`In one year ${fmt(b)} babies are born alive in a country and ${fmt(d)} of them die before their first birthday. What is the infant mortality rate per 1,000 births?`, r,
      "Find out how many deaths there are for each group of one thousand births.", "Divide the births by one thousand to see how many thousands there are, then divide the deaths by that number.",
      "Example: 40,000 births and 200 deaths. 40,000 ÷ 1,000 = 40 groups. 200 ÷ 40 = 5 per 1,000. Now do yours.");
    if (m < 0.8) return Q(`A country has an infant mortality rate of ${r} per 1,000 births and ${fmt(b)} live births a year. How many babies die before their first birthday?`, d,
      "The rate tells you deaths for each thousand births. How many thousands of births are there?", "Divide the births by one thousand, then multiply by the rate.",
      "Example: rate 6 per 1,000 and 30,000 births. 30,000 ÷ 1,000 = 30, and 30 x 6 = 180 deaths. Now do yours.");
    return Q(`A country's infant mortality rate was ${r + 10} per 1,000. After new clinics opened it fell to ${r} per 1,000. By how many per 1,000 did it fall?`, 10,
      "Compare the old rate with the new rate.", "Take the new rate away from the old rate.",
      "Example: a fall from 45 to 38 per 1,000 is 45 - 38 = 7 per 1,000. Now do yours.");
  });

  const RANKSIZE = NUM([
    ["Primate city", "🏙️", "A <b>primate city</b> is a country's largest city, far bigger than any other and often the center of its government, business and culture. Examples: Paris in France, Bangkok in Thailand, Lima in Peru."],
    ["The rank-size rule", "📊", "In many countries the second-biggest city is about <b>half</b> the size of the biggest, the third is about <b>one third</b>, and so on. The city at rank <b>n</b> has about (largest city) ÷ n people."],
    ["Example", "📝", "The largest city has 12 million people. The city at rank 4 should have about 12 ÷ 4 = 3 million. Countries with a primate city do NOT follow this rule, because their top city is much too big."]
  ], () => {
    const m = Math.random(), L = pick([60, 120, 180, 240, 300]), r = pick([2, 3, 4, 5, 6]), P = L / r;
    if (m < 0.55) return Q(`A country follows the rank-size rule. Its largest city has ${L} thousand people. About how many thousand people live in its rank ${r} city?`, P,
      "The lower a city ranks, the smaller it should be. Use its rank number to divide.", "Divide the biggest city's population by the rank number of the city you want.",
      "Example: biggest city 90 thousand, rank 3 city. 90 ÷ 3 = 30 thousand. Now do yours.");
    if (m < 0.85) return Q(`A country follows the rank-size rule. Its rank ${r} city has ${P} thousand people. About how many thousand people live in its largest city?`, L,
      "Work backwards. The biggest city is larger than the rank city you are given.", "Multiply the rank city's population by its rank number.",
      "Example: the rank 3 city has 25 thousand. 25 x 3 = 75 thousand in the largest city. Now do yours.");
    return Q(`The largest city has ${L} thousand people. Its rank 2 city should have about half as many. About how many thousand people is that?`, L / 2,
      "Half means splitting into two equal parts.", "Divide the biggest city's population by two.",
      "Example: biggest city 80 thousand. Half is 80 ÷ 2 = 40 thousand. Now do yours.");
  });

  const FLOOD = NUM([
    ["Return period", "🌊", "A <b>100-year flood</b> does NOT mean one flood every 100 years. It means a flood that has a <b>1 percent chance</b> of happening in any single year. The <b>return period</b> is the average gap in years between floods that big."],
    ["The rule", "🧮", "Chance each year (percent) = 100 ÷ return period. A 20-year flood has a 100 ÷ 20 = 5 percent chance each year. A 5-year flood is smaller but much more likely: 20 percent each year."],
    ["Why it matters", "🏠", "Planners use these numbers to decide where it is safe to build. Two 100-year floods can happen in two years in a row, because each year is a fresh chance."]
  ], () => {
    const m = Math.random(), T = pick([2, 4, 5, 10, 20, 25, 50, 100]), p = 100 / T;
    if (m < 0.4) return Q(`A ${T}-year flood has what chance of happening in any one year, in percent?`, p,
      "The bigger the return period, the smaller the yearly chance.", "Divide one hundred by the number of years in the return period.",
      "Example: a 40-year flood. 100 ÷ 40 = 2.5 percent. Now do yours (your numbers are friendlier).");
    if (m < 0.7) { const q = pick([1, 2, 4, 5, 10, 20, 50]); return Q(`A flood has a ${q} percent chance of happening each year. What is its return period, in years?`, 100 / q,
      "Work backwards. A small yearly chance means a long wait between floods.", "Divide one hundred by the yearly chance in percent.",
      "Example: a 25 percent yearly chance. 100 ÷ 25 = 4, so it is a 4-year flood. Now do yours."); }
    return Q(`On average, how many ${T}-year floods would you expect in a span of 100 years?`, 100 / T,
      "Think about how many times the return period fits into the whole span.", "Divide the length of the span by the return period.",
      "Example: 100 years and a 50-year flood gives 100 ÷ 50 = 2 floods on average. Now do yours with a different flood.");
  });

  const PYRAMID = NUM([
    ["Food chains", "🌱 🐛 🐦 🦅", "<b>Producers</b> (plants) make food from sunlight. <b>Consumers</b> eat them: first plant-eaters, then meat-eaters. Each step up is a <b>trophic level</b>."],
    ["The 10 percent rule", "🔟", "Only about <b>10 percent</b> of the energy at one level reaches the next. The rest is used for living (moving, keeping warm) or lost as heat. So energy shrinks by 10 times with each step up."],
    ["Example", "📝", "Plants hold 10,000 units of energy. Plant-eaters get 1,000. The animals that eat them get 100. The top meat-eater gets only 10. This is why there are fewer top predators than plants."]
  ], () => {
    const m = Math.random(), s = ri(1, 3), E = pick([10000, 100000, 1000000]), names = ["", "the plant-eaters", "the animals that eat plant-eaters", "the top predators"];
    if (m < 0.55) return Q(`Producers in an ecosystem hold ${fmt(E)} units of energy. Using the 10 percent rule, how many units reach ${s === 1 ? "the plant-eaters, one step up" : s === 2 ? "two steps up the food chain" : "three steps up the food chain"}?`, E / Math.pow(10, s),
      "Each step up keeps only a small part of the energy. Count how many steps there are.", "Divide by ten once for every step up.",
      "Example: 5,000 units of energy, two steps up. 5,000 ÷ 10 = 500, then 500 ÷ 10 = 50. Now do yours.");
    const x = pick([2, 5, 10, 20, 50]);
    if (m < 0.85) return Q(`The animals ${s} step${s > 1 ? "s" : ""} above the producers hold ${x} units of energy. Using the 10 percent rule, how many units did the producers hold?`, x * Math.pow(10, s),
      "Work backwards. Lower levels hold much more energy than higher ones.", "Multiply by ten once for every step down.",
      "Example: 4 units at one step above. 4 x 10 = 40 units in the producers. Now do yours.");
    return Q(`A grass field holds ${fmt(E)} units of energy. A mouse eats the grass and a snake eats the mouse. Using the 10 percent rule, how many units does the snake get?`, E / 100,
      "The snake is two steps above the grass: grass, then mouse, then snake.", "Divide by ten once for each step, and the snake is two steps up.",
      "Example: grass has 3,000 units. Mouse gets 300 and snake gets 30. Now do yours.");
  });

  // ---------- LEVEL 22 ----------
  const l22 = [
    LS("Core, semi-periphery, periphery", MC([
      ["World-systems theory", "🌍", "Thinker <b>Immanuel Wallerstein</b> said the world economy has three layers. <b>Core</b> countries are rich and make high-tech goods, run banks and design products."],
      ["The other two layers", "⚙️ ⛏️", "<b>Periphery</b> countries are poorer. They mostly sell raw materials (like minerals or crops) and have low wages. The <b>semi-periphery</b> is in between, with growing industry. Brazil, Mexico and India are often put here."],
      ["Moving up", "📈", "Countries can move between layers. A country moves up when it builds skilled industries and services instead of selling only raw materials."]],
      "Think about who does the high-profit work and who sells raw materials.", "Core is rich and high-tech, periphery supplies raw materials, and the semi-periphery sits between them.",
      [["In world-systems theory, rich countries that make high-tech goods and run banks are the...", "Core", "Periphery|Semi-periphery"], ["Poorer countries that mainly sell raw materials with low wages are the...", "Periphery", "Core|Semi-periphery"],
       ["Countries in between, with growing industry, are the...", "Semi-periphery", "Core|Periphery"], ["Who proposed world-systems theory?", "Immanuel Wallerstein", "Walter Christaller|Ernest Burgess"],
       ["Which country is most likely in the core?", "Japan", "Chad|Niger"], ["Which country is most likely in the periphery?", "Niger", "Japan|Germany"],
       ["Brazil, Mexico and India are often placed in the...", "Semi-periphery", "Core|Periphery"], ["Which is a way a country can move up from the periphery?", "Building skilled industries and services", "Selling only raw logs|Closing its schools"],
       ["Core countries usually keep most of the profit from...", "High-value work such as design and finance", "Mining raw ore|Small-scale farming for the family"]])),
    LS("Literacy and girls' education", MC([
      ["Literacy", "📖", "The <b>literacy rate</b> is the percent of adults who can read and write. It is a key measure of development. Low literacy makes it harder to find good jobs or read health advice."],
      ["Why girls matter", "👧 🏫", "When girls go to school longer, they usually marry later, have fewer and healthier children, and earn more. Their children are more likely to survive and go to school too."],
      ["Barriers", "🚧", "In some places girls miss school because of cost, long walks, early marriage or family beliefs. <b>Gender equality</b> means equal rights and chances for women and men. The UN's Sustainable Development Goal 4 is quality education for all."]],
      "Think about what education changes for a family over many years.", "Education tends to raise health and income, and lower birth rates. Look for the answer that fits that pattern.",
      [["What is a literacy rate?", "The percent of adults who can read and write", "The percent of children in school|The percent of people who own a phone"], ["When girls stay in school longer, birth rates usually...", "Fall", "Rise|Stay exactly the same"],
       ["Children of educated mothers are usually...", "More likely to survive to adulthood", "Less likely to go to school|Less healthy"], ["Which pair of regions has had some of the lowest adult literacy rates?", "Sub-Saharan Africa and South Asia", "Northern Europe and Japan|Australia and Canada"],
       ["Equal rights and chances for women and men is called...", "Gender equality", "Urbanization|Diffusion"], ["Why does educating girls help a country's economy?", "It creates more skilled workers", "It makes farms stop growing food|It reduces the number of jobs"],
       ["Which is a barrier to girls' schooling in some places?", "Long distances to school and school costs", "Free school meals|Short school days"], ["Mean years of schooling measures...", "The average years of school adults have completed", "How many schools a country has|The length of a school day"],
       ["Which Sustainable Development Goal is about quality education?", "Goal 4", "Goal 1|Goal 13"]])),
    LS("Forces that join and split a country", MC([
      ["Centripetal forces", "🧲", "<b>Centripetal</b> forces pull a country <b>together</b>: a shared flag, anthem and national holidays, one school system, a shared language, or a national sports team everyone cheers for."],
      ["Centrifugal forces", "💥", "<b>Centrifugal</b> forces push a country <b>apart</b>: differences in language or religion between regions, big gaps in wealth between regions, or a region that wants more independence."],
      ["Real places", "🇧🇪 🇨🇦", "Belgium has Dutch-speaking Flanders and French-speaking Wallonia, a centrifugal force. Canada's French-speaking Quebec has also had independence debates. Switzerland has four languages but stays united with shared government and local self-rule."]],
      "Think: is the force pulling people toward the center or pushing them apart?", "Centripetal sounds like moving toward the center. Centrifugal sounds like flying away from the center.",
      [["A force that pulls a country together is...", "Centripetal", "Centrifugal|Tectonic"], ["A force that pushes a country apart is...", "Centrifugal", "Centripetal|Magnetic"],
       ["A national flag and anthem are examples of...", "Centripetal forces", "Centrifugal forces|Physical features"], ["Different languages between regions can be a...", "Centrifugal force", "Centripetal force|Climate force"],
       ["The language divide between Flanders and Wallonia is in which country?", "Belgium", "Denmark|Portugal"], ["Which is a centripetal force?", "A national school system that teaches one shared history", "A region that wants to leave|A large gap in wealth between regions"],
       ["Which is a centrifugal force?", "A large gap in wealth between regions", "A national holiday|A shared currency"], ["Centripetal means moving toward the...", "Center", "Edge|Ocean"],
       ["Cheering for one national sports team is mostly...", "Centripetal", "Centrifugal|Neither: sports have no effect on anyone"]])),
    LS("Population policies", MC([
      ["Two kinds", "🏛️", "Governments use <b>population policies</b> to change growth. <b>Antinatalist</b> policies try to lower births. <b>Pronatalist</b> policies try to raise births."],
      ["Examples", "👨‍👩‍👧", "China had a famous one-child policy (from about 1980; it was ended in 2015). India began a national family planning program in 1952. Some countries with low birth rates, such as Hungary or Singapore, pay bonuses or give long paid parental leave to families with children."],
      ["Effects", "⚖️", "A long period of fewer births means fewer young workers and more older people. Many experts say the best way to lower births without pressure is education for girls and access to family planning services."]],
      "Anti means against, pro means for. Think about births.", "Antinatalist policies work against births. Pronatalist policies encourage births.",
      [["A policy that tries to lower the number of births is...", "Antinatalist", "Pronatalist|Nationalist"], ["A policy that encourages more births is...", "Pronatalist", "Antinatalist|Isolationist"],
       ["China's one-child policy was an example of an...", "Antinatalist policy", "Pronatalist policy|Migration policy"], ["Paying parents a bonus for each baby is...", "Pronatalist", "Antinatalist|Neither: it has no effect"],
       ["Free childcare and long paid parental leave can be...", "Pronatalist policies", "Antinatalist policies|Trade policies"], ["Which country started a national family planning program in 1952?", "India", "Canada|Norway"],
       ["A long period of fewer births leads to...", "A smaller share of young people and more older people", "A larger share of children|No change in ages"], ["Which can lower birth rates without force?", "Education for girls and family planning services", "Closing all schools|Closing all hospitals"],
       ["A population policy is...", "A government plan to change population size or growth", "A map of where people live|A count of all citizens"]])),
    LS("Life expectancy and infant mortality", IMR),
    LS("Disease and geography", MC([
      ["Words about outbreaks", "🦠", "An <b>epidemic</b> is an outbreak in one area. A <b>pandemic</b> spreads across many countries or the world. An <b>endemic</b> disease is always present in a region, like malaria in parts of Africa."],
      ["Mapping disease", "🗺️", "In 1854 doctor <b>John Snow</b> mapped cholera cases in London. They clustered around one water pump. When it was shut, new cases dropped. This was an early use of mapping to solve a health problem."],
      ["Changing causes of death", "❤️", "As countries get clean water, vaccines and better hospitals, deaths from infections fall. Over time most deaths come from <b>chronic diseases</b> such as heart disease. Air travel now links far-away cities in hours, so diseases can spread fast."]],
      "Think about how widely the disease spreads and where it is found.", "Epidemic is local, pandemic is global, endemic stays in one region all the time.",
      [["A disease that spreads across many countries is a...", "Pandemic", "Epidemic|Endemic"], ["An outbreak limited to one area or community is an...", "Epidemic", "Pandemic|Endemic"],
       ["A disease that is always present in a region is...", "Endemic", "Pandemic|Epidemic"], ["Who mapped cholera cases in London in 1854?", "John Snow", "Florence Nightingale|Alexander Fleming"],
       ["Cholera mainly spreads through...", "Unsafe water", "Mosquito bites|Sharing books"], ["Malaria is spread by...", "Mosquitoes", "Dirty drinking water|Sharing books"],
       ["In wealthy countries today, most deaths come from...", "Chronic diseases like heart disease", "Cholera outbreaks|Famine"], ["Clean water and vaccines make deaths from infectious diseases...", "Fall", "Rise|Stay exactly the same"],
       ["Why can a disease now spread around the world in days?", "Air travel links distant cities", "Rivers flow faster|Winters are longer"]])),
    LS("Food security", MC([
      ["What it means", "🍚", "<b>Food security</b> means all people can always get enough safe, healthy food. <b>Malnutrition</b> means not getting the right nutrients. This can be too little food or an unbalanced diet."],
      ["Why hunger happens", "🌾", "The world grows enough food in total. Hunger often comes from poverty, war, drought and poor roads or storage. About one third of all food is lost or wasted. Rice, wheat and maize give much of the world's calories."],
      ["Closer to home", "🏘️", "A <b>food desert</b> is an area (often in a city or far countryside) where it is hard to reach a store with fresh, healthy food. Food reserves and better crops help in bad harvests."]],
      "Think about whether the problem is how much food exists, or who can get it.", "Food security is about reliable access. Look for the answer that mentions access, sharing or storage.",
      [["Food security means...", "All people can always get enough safe, healthy food", "Farms never use machines|Everyone eats the same meal"], ["A food desert is an area where...", "Fresh, healthy food is hard to get nearby", "No rain falls all year|Only fish are sold"],
       ["Famines are often caused by...", "War, drought and poor distribution", "Too many rivers|Too many forests"], ["Malnutrition means...", "Not getting the right nutrients", "Eating only at night|Growing too many crops"],
       ["Which three crops give much of the world's calories?", "Rice, wheat and maize", "Coffee, tea and cocoa|Apples, pears and plums"], ["About how much of the world's food is lost or wasted?", "About one third", "About 1 percent|Almost all of it"],
       ["Grain stored for bad harvests is called a...", "Food reserve", "Food desert|Tariff"], ["Does the world grow enough food for everyone?", "Yes, but access and distribution are uneven", "No, there is not enough at all|Yes, and everyone gets the same amount"],
       ["Which helps farmers grow more on the same land?", "Irrigation and better seeds", "Burning the soil|Leaving fields empty"]])),
    LS("Commodities and fair trade", MC([
      ["Raw goods", "☕ 🍫 ⛏️", "A <b>commodity</b> is a raw product traded in large amounts, such as coffee, cocoa, crude oil or copper. Their prices go up and down a lot."],
      ["The risk", "📉", "Countries that depend on one commodity are in danger when the price drops. <b>Diversifying</b> means making and selling many different goods and services. <b>Adding value</b> (turning cocoa into chocolate) earns more money than selling raw materials."],
      ["Fair trade", "🤝", "<b>Fair trade</b> groups promise farmers a fair minimum price and safer working conditions. Shoppers can choose labeled products. Ghana and Côte d'Ivoire grow much of the world's cocoa. Chile is a leading copper exporter."]],
      "Think about raw materials versus finished goods and what happens when prices change.", "Raw materials earn less than finished goods. Depending on only one product is risky.",
      [["A commodity is...", "A raw product traded in large amounts, like copper or coffee", "A finished smartphone|A kind of weather"], ["Depending on one export is risky because...", "A price drop can hurt the whole economy", "It makes rivers dry up|It always raises prices"],
       ["Fair trade aims to give farmers...", "A fair minimum price and better conditions", "Free land from the government|Lower prices"], ["Which earns more money?", "Chocolate bars", "Raw cocoa beans|They always earn exactly the same"],
       ["Diversifying an economy means...", "Making and selling many different goods and services", "Selling only one product|Closing all factories"], ["Which country is a leading copper exporter?", "Chile", "Iceland|Switzerland"],
       ["Which of these is a commodity?", "Crude oil", "A video game|A movie"], ["Which two countries grow much of the world's cocoa?", "Ghana and Côte d'Ivoire", "Norway and Iceland|Mongolia and Nepal"],
       ["Adding value means...", "Turning raw materials into finished goods", "Selling things cheaper|Digging deeper mines"]])),
    LS("Primate cities and the rank-size rule", RANKSIZE),
    LS("Megacities and world cities", MC([
      ["Megacities", "🌆", "A <b>megacity</b> has more than <b>10 million</b> people. There are over 30 of them in the world, and most are in Asia, for example Tokyo, Delhi, Shanghai and Mumbai. Cairo and Lagos are in Africa."],
      ["World cities", "💼", "<b>World (global) cities</b> have great influence on business, finance, culture and politics, even if they are not the biggest. <b>New York, London and Tokyo</b> are often named as the top three."],
      ["Growing together", "🏘️", "A <b>conurbation</b> forms when nearby cities grow until they join into one built-up area. Today the fastest city growth is in Asia and Africa."]],
      "Think about size (millions of people) versus influence (money, culture, power).", "A megacity is about population. A world city is about influence.",
      [["A megacity has more than...", "10 million people", "1 million people|100,000 people"], ["Which three are often called the top global cities?", "New York, London and Tokyo", "Reykjavik, Bern and Lima|Perth, Oslo and Quito"],
       ["Global cities are important for...", "Finance, business and culture that link the world", "Growing wheat|Mining coal"], ["Which region has the most megacities?", "Asia", "Europe|Oceania"],
       ["Which of these is a megacity?", "Delhi", "Lisbon|Perth"], ["Which African city is a megacity?", "Cairo", "Windhoek|Accra"],
       ["Several cities that have grown together into one built-up area form a...", "Conurbation", "Delta|Plateau"], ["Where is most of the fastest city growth today?", "Asia and Africa", "Northern Europe and Canada|Australia and Iceland"],
       ["Greater Tokyo is a megacity in which country?", "Japan", "China|South Korea"]])),
    LS("City planning ideas", MC([
      ["Rules for land", "📐", "<b>Zoning</b> is a set of rules about what can be built where (homes, shops, factories, parks). <b>Mixed-use</b> areas combine homes, shops and offices so people can walk to them."],
      ["Fighting sprawl", "🌳", "A <b>greenbelt</b> is a ring of protected open land around a city to stop it spreading. <b>New Urbanism</b> and <b>smart growth</b> favor walkable, compact neighborhoods and public transit. <b>Transit-oriented development</b> puts homes near train and bus stations."],
      ["Reusing land", "♻️", "A <b>brownfield</b> is old industrial land that can be cleaned and reused. Curitiba in Brazil is famous for its bus rapid transit system, with special bus lanes and fast boarding."]],
      "Think about what planners want: fewer cars, less sprawl, more walking.", "Look for the word that fits protecting open land, mixing uses, or reusing old land.",
      [["Zoning is...", "A set of rules about what can be built where", "A kind of map projection|A tax on farms"], ["A greenbelt is...", "A ring of protected open land around a city", "A forest farm|A railway"],
       ["New Urbanism favors...", "Walkable neighborhoods with homes, shops and parks mixed together", "Huge highways only|Cities without parks"], ["A brownfield is...", "Old industrial land that can be cleaned and reused", "A field of wheat|A national park"],
       ["Mixed-use means...", "Homes, shops and offices in the same area", "Only factories in one area|Only farms"], ["Transit-oriented development builds homes near...", "Train and bus stations", "Airports only|Quarries"],
       ["Which helps fight urban sprawl?", "Greenbelts and denser building", "Spreading houses ever farther out|Wider roads"], ["Curitiba, Brazil is known for its...", "Bus rapid transit system", "Underground rivers|Ski slopes"],
       ["Smart growth tries to...", "Build compact, walkable communities with transit", "Spread cities as wide as possible|Remove all parks"]])),
    LS("Flood return periods", FLOOD),
    LS("The ITCZ and the Coriolis effect", MC([
      ["The ITCZ", "☁️", "Near the equator the trade winds from north and south meet. This is the <b>Intertropical Convergence Zone (ITCZ)</b>. The air is warm and rises, forming towering clouds and heavy rain. The ITCZ shifts north and south with the sun through the year."],
      ["The Coriolis effect", "🌀", "Earth spins, so moving air and water bend. In the <b>Northern Hemisphere</b> they curve to the <b>right</b>. In the <b>Southern Hemisphere</b> they curve to the <b>left</b>."],
      ["Dry belts", "🏜️", "The air that rose at the ITCZ cools, spreads out and sinks near <b>30 degrees</b> north and south. Sinking air is dry, which is why many of the world's big deserts lie there."]],
      "Think about rising and sinking air, and which way Earth's spin bends the wind.", "Rising air brings clouds and rain. Sinking air is dry. Earth's spin bends winds to the right in the north.",
      [["ITCZ stands for...", "Intertropical Convergence Zone", "International Temperature Control Zone|Inner Tropic Cloud Zone"], ["Near the ITCZ the weather is usually...", "Warm, cloudy, with heavy rain", "Cold and dry|Calm with no clouds"],
       ["The ITCZ shifts north and south following the...", "Sun's overhead position", "Moon phases|Ocean tides"], ["In the Northern Hemisphere, the Coriolis effect bends winds to the...", "Right", "Left|South only"],
       ["In the Southern Hemisphere, the Coriolis effect bends winds to the...", "Left", "Right|North only"], ["Why are many deserts near 30 degrees north and south?", "Dry air sinks there", "Air rises and rains there|The oceans freeze there"],
       ["Trade winds blow toward the...", "Equator", "Prime Meridian|Arctic Circle"], ["The Coriolis effect is caused by...", "Earth's spin", "The Moon's pull|Ocean tides"],
       ["Air at the ITCZ is mostly...", "Rising", "Sinking|Perfectly still"]])),
    LS("The deep ocean", MC([
      ["Ocean layers", "🌊", "The sunlit zone reaches about <b>200 meters</b> down. Below it is the twilight zone (to about 1,000 m), then the dark midnight zone and the deep abyss. The <b>hadal zone</b> is the deepest part, found in trenches. The Mariana Trench in the Pacific is the deepest known place."],
      ["The ocean conveyor", "🔄", "Cold, salty water is <b>dense</b>, so it sinks near the poles (for example in the North Atlantic and around Antarctica). This starts a slow deep current called the <b>thermohaline circulation</b>: thermo means heat, haline means salt."],
      ["A very slow trip", "🐢", "Surface currents are pushed mostly by wind. The deep current is much slower. One full trip around the world can take hundreds of years up to about a thousand. It moves heat around the planet."]],
      "Think about what makes water heavy: cold and salt.", "Cold, salty water sinks. Surface currents come from wind. The deep circulation is slow.",
      [["Thermo means heat. What does haline mean?", "Salt", "Wind|Depth"], ["Cold, salty water is dense and...", "Sinks", "Floats on top|Evaporates"],
       ["The sunlit ocean zone reaches about...", "200 meters", "2,000 meters|20 meters"], ["Which zone is the deepest, found in trenches?", "Hadal zone", "Sunlight zone|Twilight zone"],
       ["Deep ocean currents move...", "Very slowly, taking hundreds of years to circle the globe", "Faster than surface winds|Only in summer"], ["Where does deep water often form?", "Near the poles, such as the North Atlantic and around Antarctica", "Near the equator|In the middle of the Pacific"],
       ["Surface currents are driven mainly by...", "Wind", "Volcanoes|Fish"], ["The deepest known place in the ocean is the...", "Mariana Trench", "Puerto Rico Trench|Sunda Trench"],
       ["The ocean conveyor belt helps move...", "Heat around the planet", "Mountains|Sand dunes"]])),
    LS("Permafrost and tundra", MC([
      ["Frozen ground", "🧊", "<b>Permafrost</b> is ground that stays frozen for at least two years in a row. Most of it lies in Siberia, Alaska and northern Canada. In summer only the top <b>active layer</b> thaws."],
      ["Tundra life", "🦌", "The <b>tundra</b> is cold and nearly treeless. Plants are low (mosses, lichens, small shrubs) because of the cold, wind and shallow roots. Caribou (reindeer) and Arctic foxes live there. <b>Alpine tundra</b> is found high on mountains above the tree line."],
      ["Thawing problems", "🏚️", "When permafrost thaws it can release the greenhouse gases methane and carbon dioxide. The ground also sinks, which can tilt houses and crack roads and pipelines."]],
      "Think about the cold, the frozen soil and what happens when it warms.", "Plants stay low in the tundra. Thawing releases gas and makes the ground unstable.",
      [["Permafrost is ground that stays frozen for at least...", "Two years in a row", "One week|One day each winter"], ["The top layer that thaws in summer is the...", "Active layer", "Core|Delta"],
       ["Trees are rare in the tundra because...", "The growing season is short and the soil is frozen", "There is too much rain|The soil is too hot"], ["Thawing permafrost can release...", "Methane and carbon dioxide", "Oxygen only|Fresh water only"],
       ["Thawing permafrost can cause buildings to...", "Tilt or sink", "Grow taller|Float away"], ["Which animals live in the Arctic tundra?", "Caribou and Arctic foxes", "Camels and lions|Kangaroos and koalas"],
       ["Where is permafrost common?", "Siberia, Alaska and northern Canada", "The Sahara and Arabia|The Amazon Basin"], ["Alpine tundra is found...", "High on mountains above the tree line", "At the equator on the beach|Under the sea"],
       ["Why are tundra plants low to the ground?", "Cold, wind and shallow roots", "Too much shade|Heavy rain"]])),
    LS("Energy pyramids", PYRAMID),
    LS("Distance decay and the gravity model", MC([
      ["Distance decay", "📉", "<b>Distance decay</b> says that the farther apart two places are, the less they interact. People shop at nearby stores more than far ones. The cost, time and effort of travel is called the <b>friction of distance</b>."],
      ["The gravity model", "🪐", "The <b>gravity model</b> borrows an idea from Newton: bigger places pull more, and closer places pull more. Interaction (trade, travel, phone calls) is large between two big cities that are close together."],
      ["The math idea", "🧮", "In the basic model, interaction is about (size of place A x size of place B) ÷ (distance squared). If distance doubles, the pull falls to one fourth. Technology like the internet can reduce the friction of distance."]],
      "Think about big and close versus small and far.", "Bigger and closer means more interaction. Distance has a strong effect because it is squared.",
      [["Distance decay says that as distance grows, interaction...", "Decreases", "Increases|Stays exactly the same"], ["In the gravity model, bigger places have...", "More pull and more interaction", "Less pull|No effect"],
       ["Which pair would likely have the most trade?", "Two large cities 100 km apart", "Two small towns 1,000 km apart|A tiny village and a distant farm"], ["Friction of distance means...", "The cost, time and effort of travel", "Rubbing between tectonic plates|A kind of map"],
       ["Why do people shop at nearby stores more than far ones?", "Distance decay", "The Coriolis effect|Erosion"], ["The gravity model borrows its idea from...", "Newton's law of gravity", "Mendel's peas|Einstein's boat"],
       ["If the distance between two cities doubles, the pull in the basic model becomes...", "One fourth", "Half|Twice"], ["Which can reduce the friction of distance?", "Faster transport and the internet", "Closing roads|Raising prices"],
       ["Interaction between places is usually greatest when they are...", "Large and close together", "Small and far apart|Small and close"]])),
    LS("Lingua franca, pidgin and creole", MC([
      ["Common languages", "🗣️", "A <b>lingua franca</b> is a language that people with different mother tongues use to talk to each other. English is used in air travel and business. Swahili is a lingua franca across East Africa. Latin once was one for scholars."],
      ["Pidgins", "🤝", "A <b>pidgin</b> is a simple mix of languages that traders or workers make up so they can understand each other. It starts with no native speakers."],
      ["Creoles", "🌴", "When children grow up speaking a pidgin as their first language, it grows richer grammar and becomes a <b>creole</b>. Haitian Creole is based on French plus West African languages. Tok Pisin in Papua New Guinea is another example."]],
      "Think: shared by many groups, simple trade mix, or full first language.", "A pidgin has no native speakers. A creole is a pidgin that became someone's first language.",
      [["A language that people with different mother tongues use to communicate is a...", "Lingua franca", "Dialect|Hearth"], ["A simple language mix made up by traders is a...", "Pidgin", "Creole|Capital"],
       ["A pidgin that becomes a community's first language is a...", "Creole", "Lingua franca|Dialect"], ["Swahili is a lingua franca in...", "East Africa", "Northern Europe|South America"],
       ["English is often a lingua franca in...", "Air travel and business", "Only cooking|Only farming"], ["Haitian Creole is based mainly on French and...", "West African languages", "Chinese languages|Arctic languages"],
       ["Which country has the creole-like language Tok Pisin?", "Papua New Guinea", "Portugal|Mexico"], ["Which language was once a lingua franca for European scholars?", "Latin", "Basque|Welsh"],
       ["A pidgin starts with...", "No native speakers", "Many native speakers|A national dictionary"]]))
  ];
  l22.push(LS("Mixed practice", MX(l22, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])));
  l22.push(LS("Level 22 Challenge", MX(l22, [16, 17, 4, 8, 11, 15, 0, 1, 2, 3, 5, 6, 7, 9, 10, 12, 13, 14])));

  // ---------- LEVEL 23 number makers ----------
  const EEZ = NUM([
    ["Ocean zones", "🌊 ⚓", "The UN Convention on the Law of the Sea sets zones measured in <b>nautical miles</b> from the coast. The <b>territorial sea</b> reaches 12 nautical miles. The <b>exclusive economic zone (EEZ)</b> reaches 200 nautical miles. Beyond that are the <b>high seas</b>, open to all."],
    ["What a country controls", "🐟 🛢️", "In its EEZ a country has the right to fish, drill for oil and gas, and use the sea's resources. Other ships may still sail through. In the territorial sea the country has even more control."],
    ["When coasts are close", "📏", "If two countries are less than 400 nautical miles apart, their EEZs would overlap, so they must agree on a line. Example: coasts 300 apart. 200 + 200 = 400, and 400 - 300 = 100 nautical miles of overlap."]
  ], () => {
    const m = Math.random();
    if (m < 0.4) { const D = ri(15, 38) * 10; return Q(`Two countries face each other across a sea that is ${D} nautical miles wide. Each claims a full 200-nautical-mile EEZ. How many nautical miles do their claims overlap?`, 400 - D,
      "Both countries claim sea toward each other. Think about the total length claimed compared with the real width of the sea.", "Add the two claims together, then take away the width of the sea.",
      "Example: a sea 350 nautical miles wide. 200 + 200 = 400, and 400 - 350 = 50 overlap. Now do yours."); }
    if (m < 0.75) { const d = ri(12, 190); return Q(`A fishing boat is ${d} nautical miles from a country's coast. How many more nautical miles can it travel straight out to sea before it leaves that country's EEZ?`, 200 - d,
      "Think about how far the EEZ reaches and how far the boat has already gone.", "Take the distance already traveled away from the full reach of the EEZ.",
      "Example: a boat 150 nautical miles out. 200 - 150 = 50 more nautical miles. Now do yours."); }
    const D = ri(3, 10) * 10; return Q(`Two islands are ${D} nautical miles apart. Each claims a 12-nautical-mile territorial sea toward the other. How many nautical miles of sea lie between the two territorial seas?`, D - 24,
      "Each island claims a strip of sea toward the other, so some of the gap is already claimed.", "Take away both territorial seas from the distance between the islands.",
      "Example: islands 60 nautical miles apart. 12 + 12 = 24 claimed, and 60 - 24 = 36 left. Now do yours.");
  });

  const APPORT = NUM([
    ["Apportionment", "🏛️", "<b>Apportionment</b> is dividing the seats of a lawmaking body among regions by population. In the US the House of Representatives has <b>435</b> seats, and the census every 10 years decides how many each state gets."],
    ["People per seat", "⚖️", "People per seat = population ÷ seats. A state with more people gets more seats so each seat stands for about the same number of people. This idea is called equal representation, or 'one person, one vote'."],
    ["Example", "📝", "A region has 3,000,000 people and 10 seats. 3,000,000 ÷ 10 = 300,000 people per seat. If each seat stands for 300,000 people, a region of 1,500,000 people gets 5 seats. The US Electoral College has 538 votes, and 270 are needed to win."]
  ], () => {
    const m = Math.random(), per = pick([100000, 150000, 200000, 250000, 400000, 500000, 700000]), seats = ri(4, 30), pop = per * seats;
    if (m < 0.35) return Q(`A region has ${fmt(pop)} people and ${seats} seats in its legislature. How many people does each seat stand for?`, per,
      "Share the people equally among the seats.", "Divide the population by the number of seats.",
      "Example: 2,400,000 people and 8 seats. 2,400,000 ÷ 8 = 300,000. Now do yours.");
    if (m < 0.7) return Q(`Each seat in a legislature stands for ${fmt(per)} people. A region has ${fmt(pop)} people. How many seats should it get?`, seats,
      "How many groups of that size fit into the population?", "Divide the population by the number of people each seat stands for.",
      "Example: seats of 200,000 people and a region with 1,400,000 people. 1,400,000 ÷ 200,000 = 7 seats. Now do yours.");
    return Q(`Each seat in a legislature stands for ${fmt(per)} people. A region has ${seats} seats. About how many people live there?`, pop,
      "Each seat represents a group of people. Think about how many groups there are.", "Multiply the people per seat by the number of seats.",
      "Example: 100,000 people per seat and 12 seats. 100,000 x 12 = 1,200,000. Now do yours.");
  });

  const REMIT = NUM([
    ["Remittances", "💸 🏠", "<b>Remittances</b> are money that migrants working abroad send home to their families. For some countries they are a huge part of the economy. Examples include Nepal, Tonga, Haiti and El Salvador."],
    ["Good and bad", "⚖️", "Remittances pay for food, school and homes and can be worth more than foreign aid. But a country may lose skilled workers (a <b>brain drain</b>) and families may come to depend on money from abroad."],
    ["Percent of GDP", "📝", "To compare countries, we find remittances as a percent of GDP (the value of everything the country makes in a year). Percent = remittances ÷ GDP x 100. Example: 6 billion dollars of remittances and a GDP of 30 billion: 6 ÷ 30 = 0.2, so 20 percent."]
  ], () => {
    const m = Math.random(), G = pick([20, 40, 60, 100, 200]), p = pick([5, 10, 15, 20, 25, 30]), R = G * p / 100;
    if (m < 0.4) return Q(`A country has a GDP of ${G} billion dollars and receives ${R} billion dollars in remittances. What percent of GDP are the remittances?`, p,
      "Find what fraction of the whole economy the remittances make up.", "Divide the remittances by the GDP, then multiply by one hundred.",
      "Example: 6 billion of remittances and a GDP of 40 billion. 6 ÷ 40 = 0.15, which is 15 percent. Now do yours.");
    if (m < 0.7) return Q(`Remittances are ${p} percent of a country's GDP. Its GDP is ${G} billion dollars. How many billion dollars of remittances does it receive?`, R,
      "Find that percent of the whole GDP.", "Divide the percent by one hundred, then multiply by the GDP.",
      "Example: 10 percent of a GDP of 50 billion. 50 x 10 ÷ 100 = 5 billion. Now do yours.");
    return Q(`A country receives ${R} billion dollars in remittances, which is ${p} percent of its GDP. What is its GDP, in billions of dollars?`, G,
      "The remittances are only a part of the whole GDP, so the GDP is bigger.", "Divide the remittances by the percent, then multiply by one hundred.",
      "Example: 4 billion is 20 percent of GDP. 4 ÷ 20 x 100 = 20 billion. Now do yours.");
  });

  const GEODATE = NUM([
    ["Half-life", "☢️", "Some atoms are <b>radioactive</b>: they slowly change into other atoms. The <b>half-life</b> is the time it takes for half of them to change. After one half-life, 1/2 is left. After two, 1/4. After three, 1/8, and so on."],
    ["Dating rocks", "🪨", "Scientists compare how much of a radioactive atom is left in a rock to find its age. Carbon-14 (half-life about 5,730 years) dates once-living things. Uranium dates rocks that are millions or billions of years old. The Earth is about 4.6 billion years old."],
    ["Layers", "🥞", "Rock layers (strata) build up over time. If you know how fast mud settles, thickness tells time: years = thickness ÷ rate. Example: a layer 6 mm thick that grows 2 mm every 1,000 years took 3,000 years. Lower layers are usually older."]
  ], () => {
    const m = Math.random(), n = ri(1, 4), words = ["", "one half", "one quarter", "one eighth", "one sixteenth"];
    if (m < 0.35) { const S = pick([160, 320, 640, 800]), H = pick([1000, 5000, 10000, 20000]); return Q(`A sample starts with ${S} grams of a radioactive atom with a half-life of ${fmt(H)} years. How many grams are left after ${n} half-li${n > 1 ? "ves" : "fe"}?`, S / Math.pow(2, n),
      "Each half-life cuts the amount in two. Count how many times it happens.", "Halve the amount once for each half-life that has passed.",
      "Example: 80 grams and 2 half-lives. 80 becomes 40, then 20. Now do yours."); }
    if (m < 0.7) { const H = pick([1000, 2000, 5000, 10000, 50000]); return Q(`A radioactive atom has a half-life of ${fmt(H)} years. A rock now has only ${words[n]} of the original amount. How old is the rock, in years?`, n * H,
      `Work out how many halvings it takes to reach ${words[n]}. Each halving takes one half-life.`, "Find the number of half-lives, then multiply by the length of one half-life.",
      "Example: half-life 3,000 years and one quarter left. One quarter is 2 half-lives, so 2 x 3,000 = 6,000 years. Now do yours."); }
    const r = pick([1, 2, 5, 10]), k = ri(3, 12); return Q(`Mud settles at ${r} mm every thousand years. A layer of rock is ${r * k} mm thick. About how many years did it take to form?`, k * 1000,
      "Find out how many thousand-year steps fit in the layer's thickness.", "Divide the thickness by the amount that builds in a thousand years, then change thousands into years.",
      "Example: 4 mm per thousand years and a layer 12 mm thick. 12 ÷ 4 = 3, so 3,000 years. Now do yours.");
  });

  // ---------- LEVEL 23 ----------
  const l23 = [
    LS("Heartland and Rimland", MC([
      ["Geopolitics", "🌍 ♟️", "<b>Geopolitics</b> studies how geography affects power between countries. Thinkers made big theories about which places matter most."],
      ["Two famous ideas", "🧭", "<b>Halford Mackinder</b> (1904) said whoever controls the <b>Heartland</b>, the large inner part of Eurasia, would be very powerful. <b>Nicholas Spykman</b> argued the <b>Rimland</b>, the coastal edge of Eurasia, mattered more because it had people, trade and ports."],
      ["Sea power", "⚓", "<b>Alfred Mahan</b> argued that strong navies and trade routes by sea give a country power. Today these theories are old, but they still help explain why powers care about ports and chokepoints."]],
      "Think about inland versus coastal, and land versus sea power.", "Heartland means the center of Eurasia. Rimland means the coastal edge around it. Mahan focused on the sea.",
      [["Mackinder's Heartland was the...", "Large inner part of Eurasia", "Coast of Africa|Islands of the Pacific"], ["Spykman's Rimland was the...", "Coastal edge around Eurasia", "Center of Asia|Arctic ice"],
       ["Who argued that sea power gave countries strength?", "Alfred Mahan", "Halford Mackinder|Nicholas Spykman"], ["Who wrote about the Heartland in 1904?", "Halford Mackinder", "Alfred Mahan|Walter Christaller"],
       ["Geopolitics studies how...", "Geography affects power between countries", "Rocks form|Clouds move"], ["Spykman thought the Rimland mattered because it had...", "People, trade and ports", "Only deserts|Only ice"],
       ["Which continent do Heartland and Rimland refer to?", "Eurasia", "South America|Australia"], ["Why do major powers care about ports and chokepoints?", "They control trade routes", "They grow the most wheat|They have the tallest mountains"],
       ["Mahan's ideas focused on...", "Navies and trade by sea", "Railways only|Space travel"]])),
    LS("The United Nations", MC([
      ["What the UN is", "🇺🇳", "The <b>United Nations</b> was founded in <b>1945</b> to keep peace and help countries work together. It has <b>193 member states</b> and its headquarters is in <b>New York City</b>."],
      ["How it is organized", "🏛️", "All members meet in the <b>General Assembly</b>. The <b>Security Council</b> has 15 members. Five are permanent with a veto: China, France, Russia, the United Kingdom and the United States. Peacekeepers can be sent to help keep peace in troubled places."],
      ["Agencies", "🩺 📚", "Special agencies do focused jobs: <b>WHO</b> (health), <b>UNICEF</b> (children), <b>UNESCO</b> (education, science, culture), <b>FAO</b> (food and farming) and <b>UNHCR</b> (refugees)."]],
      "Match the agency's letters to its job, and remember how the Security Council is built.", "WHO is about health, UNICEF about children, UNESCO about education and culture, FAO about food, UNHCR about refugees.",
      [["The UN was founded in...", "1945", "1919|1989"], ["The UN headquarters is in...", "New York City", "Geneva|Paris"],
       ["How many permanent members does the Security Council have?", "Five", "Three|Fifteen"], ["Which UN agency focuses on health?", "WHO", "FAO|UNHCR"],
       ["Which UN agency focuses on refugees?", "UNHCR", "UNICEF|UNESCO"], ["UNICEF mainly helps...", "Children", "Pilots|Miners"],
       ["FAO works on...", "Food and farming", "Space travel|Sports"], ["Which is a permanent member of the Security Council?", "France", "Brazil|Germany"],
       ["All UN members meet in the...", "General Assembly", "Security Council|World Court only"]])),
    LS("Ocean zones and the EEZ", EEZ),
    LS("Drawing district lines", MC([
      ["Electoral districts", "🗳️", "Many countries elect lawmakers from <b>districts</b> drawn on a map. After each census the lines may be redrawn to keep districts about equal in population."],
      ["Gerrymandering", "🦎", "<b>Gerrymandering</b> is drawing district lines to give one party or group an unfair advantage. The word comes from Governor <b>Elbridge Gerry</b> of Massachusetts, whose 1812 district looked like a salamander."],
      ["Tricks and fixes", "🔧", "<b>Packing</b> puts many of a group's voters into one district so their votes count in fewer places. <b>Cracking</b> splits a group across many districts so they can't win any. Some places use independent commissions, and compact, even-shaped districts, to be fairer."]],
      "Think about who draws the lines, and what shape a fair district has.", "Packing crowds a group into one district. Cracking splits a group up. Both shape who wins.",
      [["Drawing district lines to unfairly help one side is called...", "Gerrymandering", "Apportionment|Diffusion"], ["The word gerrymander comes from the name of...", "Elbridge Gerry", "Gerald Ford|Gerard Mercator"],
       ["Putting many of a group's voters into one district is called...", "Packing", "Cracking|Zoning"], ["Splitting a group's voters across many districts is called...", "Cracking", "Packing|Mapping"],
       ["Which could help make district lines fairer?", "Independent commissions", "Secret maps|Random winners"], ["Districts are usually redrawn after each...", "Census", "Election day|Hurricane season"],
       ["A very odd, twisty district shape can be a sign of...", "Possible gerrymandering", "A mountain range|A river delta"], ["Districts are meant to have about equal...", "Populations", "Land areas|Rainfall"],
       ["The 1812 district that inspired the word looked like a...", "Salamander", "Triangle|Square"]])),
    LS("Seats and population", APPORT),
    LS("Nations without states", MC([
      ["Nations and states", "🏳️", "A <b>nation</b> is a group who share a culture and identity. A <b>state</b> is a country with borders and a government. A <b>stateless nation</b> has no country of its own. The Kurds, with about 30 million people spread across Turkey, Iraq, Iran and Syria, are an example."],
      ["Self-determination", "✊", "<b>Self-determination</b> is the idea that a people should choose their own government. Some places vote on independence. Scotland voted in 2014 and chose to stay in the United Kingdom. South Sudan became independent in 2011."],
      ["Other terms", "📜", "<b>Irredentism</b> is when a country claims land in another country because people there share its language or ethnic group. A <b>multinational state</b> has more than one nation inside it, such as Spain with Catalans and Basques."]],
      "Think about identity (nation) versus government and borders (state).", "A stateless nation has people but no country. Self-determination is choosing your own government.",
      [["A group sharing culture and identity is a...", "Nation", "Delta|Province"], ["A people with no country of their own are a...", "Stateless nation", "Capital city|Island state"],
       ["The Kurds live mainly in which countries?", "Turkey, Iraq, Iran and Syria", "Peru and Chile|Japan and Korea"], ["The idea that a people should choose their own government is...", "Self-determination", "Gerrymandering|Urbanization"],
       ["Which country became independent in 2011?", "South Sudan", "Canada|Norway"], ["In 2014 Scotland voted to...", "Stay in the United Kingdom", "Join France|Become a US state"],
       ["Claiming land in another country because of shared ethnic ties is...", "Irredentism", "Apportionment|Sedimentation"], ["A state with more than one nation inside is...", "A multinational state", "A city-state|A peninsula"],
       ["Catalans and Basques live in...", "Spain", "Brazil|Egypt"]])),
    LS("The Cold War world", MC([
      ["Two sides", "🛡️", "After World War II, the <b>United States</b> and the <b>Soviet Union</b> led two rival groups without fighting each other directly. This tense time is the <b>Cold War</b> (about 1947 to 1991). The US side formed <b>NATO</b> in 1949. The Soviet side formed the <b>Warsaw Pact</b> in 1955."],
      ["The Iron Curtain", "🧱", "<b>Iron Curtain</b> was the phrase for the line dividing Communist Eastern Europe from Western Europe. Germany was split into East and West, and Berlin too. The <b>Berlin Wall</b> was built in 1961 and came down in 1989."],
      ["The end", "🕊️", "Germany reunited in 1990. The Soviet Union broke up in 1991 into 15 separate countries, including Russia, Ukraine, Kazakhstan and Lithuania. Today many former Warsaw Pact countries are in NATO or the European Union."]],
      "Think about the two sides, the dividing line, and the dates.", "NATO was the Western alliance. The Warsaw Pact was the Eastern alliance. The Berlin Wall came down at the end of the 1980s.",
      [["The two main powers of the Cold War were the US and the...", "Soviet Union", "United Kingdom|Japan"], ["NATO was formed in...", "1949", "1914|1991"],
       ["The Soviet-led alliance was the...", "Warsaw Pact", "European Union|African Union"], ["The Iron Curtain divided...", "Eastern and Western Europe", "North and South America|Africa and Asia"],
       ["The Berlin Wall came down in...", "1989", "1949|2001"], ["The Soviet Union broke up into how many countries?", "15", "5|50"],
       ["Germany was reunited in...", "1990", "1961|1945"], ["Which is a former Soviet republic?", "Kazakhstan", "Poland|Mexico"],
       ["The Berlin Wall was built in...", "1961", "1939|1989"]])),
    LS("Geopolitics of resources", MC([
      ["Resources and power", "⛽ 🔋", "Resources are not spread evenly, so they shape power. <b>OPEC</b> (Organization of the Petroleum Exporting Countries) coordinates oil production. Pipelines carry natural gas to Europe, and countries that supply or cross them gain influence."],
      ["New resources", "📱", "Phones, electric cars and wind turbines need minerals. The 'Lithium Triangle' is Argentina, Bolivia and Chile. The Democratic Republic of the Congo produces most of the world's cobalt. China processes most rare earth elements."],
      ["Shared water", "💧", "The <b>Nile</b> flows through or touches eleven countries. When upstream countries build dams, downstream countries such as Egypt and Sudan worry about their water share. Countries often sign treaties to share rivers."]],
      "Think about which resource is needed for what, and who has it.", "Match the resource with where it is found: lithium in the triangle, cobalt in the Congo, oil with OPEC.",
      [["OPEC coordinates the production of...", "Oil", "Wheat|Cobalt"], ["The Lithium Triangle includes Chile, Bolivia and...", "Argentina", "Norway|Kenya"],
       ["The Democratic Republic of the Congo produces most of the world's...", "Cobalt", "Salt|Coffee"], ["Lithium is important for making...", "Batteries", "Paper|Glass bottles"],
       ["The Nile flows through or touches how many countries?", "Eleven", "Two|Thirty"], ["Why do downstream countries worry about dams upstream?", "Dams can reduce their water", "Dams make rivers saltier|Dams stop the rain"],
       ["Rare earth elements are used in...", "Phones and wind turbines", "Bread|Wooden furniture"], ["Which country is downstream on the Nile?", "Egypt", "Ethiopia|Uganda"],
       ["Countries share rivers by signing...", "Treaties", "Time zones|Contour lines"]])),
    LS("Money sent home", REMIT),
    LS("Aid, loans and microfinance", MC([
      ["Foreign aid", "🤲", "<b>Foreign aid</b> is help from one country or group to another. <b>Humanitarian aid</b> gives quick help after a disaster. <b>Development aid</b> pays for long-term projects such as schools and clean water. Charities called <b>NGOs</b> (non-governmental organizations) also help."],
      ["Loans and debt", "🏦", "The <b>World Bank</b> and <b>IMF</b> were set up in 1944 to help rebuild economies and give loans. When a country borrows too much, <b>debt</b> payments can take money away from schools and hospitals. Sometimes debt is reduced or canceled."],
      ["Small loans", "💡", "<b>Microfinance</b> gives tiny loans and savings services to poor people who can't use regular banks, to start small businesses. Muhammad Yunus founded Grameen Bank in Bangladesh and won the Nobel Peace Prize in 2006."]],
      "Think about quick help versus long-term help, and big loans versus small ones.", "Humanitarian aid is fast help after a disaster. Microfinance means very small loans.",
      [["Quick help after a disaster is...", "Humanitarian aid", "Development aid|A tariff"], ["Aid for long-term projects like schools and clean water is...", "Development aid", "Humanitarian aid|Remittance"],
       ["Tiny loans for poor people starting small businesses are called...", "Microfinance", "Gerrymandering|Zoning"], ["Who founded Grameen Bank?", "Muhammad Yunus", "Immanuel Wallerstein|Halford Mackinder"],
       ["Grameen Bank began in...", "Bangladesh", "Brazil|Ireland"], ["The World Bank and IMF were set up in...", "1944", "1844|2004"],
       ["What does NGO stand for?", "Non-governmental organization", "National geographic office|New global order"], ["Too much debt can mean a country has less money for...", "Schools and hospitals", "Beaches|Weather"],
       ["The IMF mainly gives...", "Loans and economic advice", "Free food|Flight tickets"]])),
    LS("Measuring inequality", MC([
      ["Gini coefficient", "📏", "The <b>Gini coefficient</b> measures how unequally income is shared. It runs from <b>0</b> (everyone has exactly the same) to <b>1</b> (one person has everything). Sometimes it is shown as 0 to 100."],
      ["Reading it", "📊", "The lower the number, the more equal the country. Nordic countries and Slovenia have low Gini numbers. South Africa has one of the highest in the world. A <b>Lorenz curve</b> is the graph used to work it out. The farther the curve bends from a straight line, the more unequal."],
      ["Why it matters", "⚖️", "A country can have a high average income but a high Gini, because a few people earn a lot. The average (GDP per person) hides how income is shared. Gini helps show that."]],
      "Zero means perfectly equal, and one means as unequal as possible.", "A lower Gini means more equality. A higher Gini means a few people have most of the income.",
      [["A Gini coefficient of 0 means...", "Everyone has the same income", "One person has everything|Nobody has money"], ["A Gini coefficient close to 1 means...", "Income is very unequal", "Income is very equal|The country is small"],
       ["A country with a lower Gini is...", "More equal", "More unequal|Smaller"], ["Which country has one of the highest Gini numbers?", "South Africa", "Denmark|Slovenia"],
       ["Which group of countries tends to have low Gini numbers?", "The Nordic countries", "Oil-rich desert kingdoms only|Island nations only"], ["The graph used to work out Gini is a...", "Lorenz curve", "Climograph|Population pyramid"],
       ["Why can average income be misleading?", "It hides how income is shared", "It is always zero|It only counts farmers"], ["On a Lorenz curve, the farther it bends away from the straight line, the...", "More unequal", "More equal|Colder"],
       ["Gini is sometimes shown as a number from...", "0 to 100", "-50 to 50|1 to 12"]])),
    LS("Albedo and feedback loops", MC([
      ["Albedo", "🧊 ☀️", "<b>Albedo</b> is how much sunlight a surface reflects. Fresh snow and ice reflect most light (high albedo, about 0.8 to 0.9). Dark ocean and forests absorb most (low albedo, about 0.06 for open ocean)."],
      ["Ice-albedo feedback", "🔁", "A <b>feedback loop</b> is when a change causes more of the same change. If ice melts, dark water shows. Dark water absorbs more heat. That warms the area and melts more ice. This is a <b>positive feedback</b> (it amplifies change)."],
      ["Balancing loops", "⚖️", "A <b>negative feedback</b> reduces change. More heat can make more clouds, and some clouds reflect sunlight. Scientists study feedbacks to predict how fast climate will change."]],
      "Bright and white reflect sunlight. Dark absorbs it.", "A positive feedback makes a change bigger. A negative feedback makes it smaller.",
      [["Albedo measures how much sunlight a surface...", "Reflects", "Absorbs only|Stores as water"], ["Which surface has the highest albedo?", "Fresh snow", "Open ocean|Dark forest"],
       ["Which surface has the lowest albedo?", "Open ocean", "Fresh snow|Glacier ice"], ["When ice melts, the dark water that shows...", "Absorbs more heat", "Reflects more light|Has no effect"],
       ["A feedback that makes a change bigger is...", "Positive feedback", "Negative feedback|Zero feedback"], ["A feedback that reduces a change is...", "Negative feedback", "Positive feedback|Tidal feedback"],
       ["The ice-albedo feedback is an example of a...", "Positive feedback", "Negative feedback|Time zone"], ["Dark surfaces tend to...", "Absorb more sunlight", "Reflect most sunlight|Cool the air"],
       ["Why do scientists study feedbacks?", "To predict how fast climate will change", "To name clouds|To draw borders"]])),
    LS("The carbon cycle", MC([
      ["Carbon moves around", "🔄", "Carbon moves between the air, oceans, soil, living things and rocks. <b>Photosynthesis</b> takes carbon dioxide from the air into plants. <b>Respiration</b> and decay put it back."],
      ["Sinks and sources", "🌳 🏭", "A <b>carbon sink</b> takes in more carbon than it gives out: oceans, forests, soils. A <b>source</b> adds carbon to the air: burning fossil fuels, cutting and burning forests, volcanoes."],
      ["Fossil carbon", "⛏️", "Coal, oil and gas are carbon stored underground for millions of years. Burning them moves that carbon into the air in a short time. Planting trees and protecting wetlands help store carbon."]],
      "Think about what takes carbon in and what puts it back in the air.", "Plants take carbon dioxide in. Burning fuels and clearing forests put carbon into the air.",
      [["Photosynthesis takes carbon dioxide from the air into...", "Plants", "Rocks|Clouds"], ["A carbon sink is something that...", "Takes in more carbon than it gives out", "Burns fuel|Makes rain"],
       ["Which is a carbon source?", "Burning coal", "A growing forest|A healthy wetland"], ["Which is a natural carbon sink?", "The ocean", "A car engine|A coal power plant"],
       ["Coal, oil and gas are made of carbon stored...", "Underground for millions of years", "In clouds for a day|In the ocean for a week"], ["Burning fossil fuels moves carbon into the...", "Air", "Core of the Earth|Moon"],
       ["Which helps store carbon?", "Planting trees", "Cutting and burning forests|Burning oil"], ["Respiration and decay...", "Put carbon dioxide back in the air", "Remove all carbon from Earth|Make oil"],
       ["Volcanoes release carbon dioxide, so they are a...", "Natural source", "Sink|Time zone"]])),
    LS("Ocean acidification and coral", MC([
      ["Acid oceans", "🌊 🧪", "The ocean soaks up about a quarter of the carbon dioxide we release. In water it forms a weak acid, so the ocean's <b>pH</b> falls (lower pH means more acidic). Since the 1700s ocean pH has dropped by about 0.1."],
      ["Shells in trouble", "🐚", "Corals, oysters, snails and tiny plankton build shells and skeletons from calcium carbonate. More acid water makes this harder, and shells can be thinner."],
      ["Coral bleaching", "🪸", "Corals live with tiny algae that give them color and food. If the water gets too warm, corals push the algae out and turn white. This is <b>coral bleaching</b>. Corals can recover if the water cools in time. The Great Barrier Reef, off Queensland in Australia, is the world's largest reef system."]],
      "Think about carbon dioxide dissolving and about what warm water does to corals.", "More carbon dioxide makes water more acidic, so pH goes down. Warm water makes corals lose their algae.",
      [["Carbon dioxide dissolving in seawater makes it more...", "Acidic", "Salty|Sandy"], ["As the ocean becomes more acidic, its pH...", "Falls", "Rises|Stays at zero"],
       ["Which animals have a harder time building shells in acidic water?", "Oysters and corals", "Whales and seals|Eagles and bats"], ["Coral bleaching happens when water gets too...", "Warm", "Cold|Deep"],
       ["During bleaching, corals push out the...", "Algae", "Sand|Salt"], ["A bleached coral looks...", "White", "Red|Green"],
       ["The Great Barrier Reef is off the coast of...", "Australia", "Brazil|Japan"], ["About how much has ocean pH dropped since the 1700s?", "About 0.1", "About 7|It has not changed"],
       ["Shells and coral skeletons are built from...", "Calcium carbonate", "Plastic|Sand grains only"]])),
    LS("Climate agreements", MC([
      ["Working together", "🤝 🌍", "Climate change affects every country, so nations meet at the yearly UN climate conference, called <b>COP</b> (Conference of the Parties). The <b>Kyoto Protocol</b> (1997) set targets for rich countries."],
      ["Paris Agreement", "📜", "In the <b>Paris Agreement</b> (2015) nearly all countries agreed to keep warming well below 2 degrees C above pre-industrial levels and try for 1.5 degrees C. Each country sets its own targets. <b>Net zero</b> means cutting emissions as far as possible and balancing the rest by removing carbon."],
      ["Two kinds of action", "🛠️", "<b>Mitigation</b> means reducing the causes: cutting emissions with clean energy or saving energy. <b>Adaptation</b> means adjusting to the effects: sea walls, drought-resistant crops, early warnings. A <b>carbon tax</b> makes polluters pay for each ton of carbon dioxide."]],
      "Mitigation lowers the cause. Adaptation prepares for the effects.", "Remember: Kyoto came first (1997), Paris came later (2015). Sea walls are adaptation, solar panels are mitigation.",
      [["The Paris Agreement was reached in...", "2015", "1915|1997"], ["The Kyoto Protocol was agreed in...", "1997", "2015|1945"],
       ["Reducing greenhouse gas emissions is called...", "Mitigation", "Adaptation|Diffusion"], ["Building sea walls to cope with higher seas is...", "Adaptation", "Mitigation|Gerrymandering"],
       ["Installing solar panels instead of burning coal is...", "Mitigation", "Adaptation|Zoning"], ["The Paris Agreement aims to keep warming well below...", "2 degrees C", "10 degrees C|20 degrees C"],
       ["COP stands for...", "Conference of the Parties", "Committee of Polar areas|Council of Planets"], ["Net zero means...", "Balancing remaining emissions by removing carbon", "No people use energy|Stopping all farming"],
       ["A tax on each ton of carbon dioxide emitted is a...", "Carbon tax", "Sales tax|Toll"]])),
    LS("Ice ages", MC([
      ["Ice ages", "❄️", "An <b>ice age</b> is a long period when ice sheets cover large parts of Earth. The most recent <b>glacial maximum</b> was about <b>20,000 years ago</b>. Ice covered much of Canada, the northern US and northern Europe, and sea level was about 120 meters lower than now."],
      ["Why they come and go", "🪐", "The <b>Milankovitch cycles</b> are slow changes in Earth's orbit shape, tilt and wobble. They change how much sunlight reaches different latitudes. Over about 100,000 years, glacial periods and warmer interglacial periods alternate."],
      ["Now", "🌤️", "We live in the <b>Holocene</b>, a warm interglacial epoch that began about 11,700 years ago. Glaciers carved the Great Lakes and many valleys, and left behind moraines, drumlins and lakes."]],
      "Think about how long ago and what changed: ice, sea level, sunlight.", "Cycles in Earth's orbit change the sunlight we get. Ice grew and sea level fell during glacial times.",
      [["The last glacial maximum was about...", "20,000 years ago", "200 years ago|200 million years ago"], ["During the last ice age, sea level was...", "Lower than now", "Higher than now|The same as now"],
       ["Slow changes in Earth's orbit, tilt and wobble are the...", "Milankovitch cycles", "Coriolis effects|Plate cycles"], ["The warm epoch we live in is the...", "Holocene", "Cambrian|Jurassic"],
       ["Which place was mostly covered in ice during the last glacial maximum?", "Most of Canada", "The Sahara|Central Africa"], ["Glacial periods and warmer periods alternate roughly every...", "About 100,000 years", "About 10 years|About 1 million days"],
       ["Glaciers helped carve the...", "Great Lakes", "Amazon River|Sahara dunes"], ["A warmer period between glacial periods is an...", "Interglacial", "Interstate|Intermission"],
       ["Sea level was lower during ice ages because water was locked up in...", "Ice sheets", "Clouds|Deep caves"]])),
    LS("Geologic time and dating", GEODATE),
    LS("Landslides and mass movement", MC([
      ["Gravity at work", "⛰️", "<b>Mass movement</b> is the downhill movement of soil and rock because of gravity. It can be slow, like <b>creep</b>, or fast, like a <b>landslide</b> or <b>rockfall</b>. A <b>mudflow</b> is wet soil flowing fast, and an <b>avalanche</b> is snow sliding down a slope."],
      ["Causes", "🌧️", "Heavy rain makes soil heavy and slippery. Steep slopes, earthquakes, melting snow, and cutting down trees (roots hold soil) can all trigger a slide. Building on steep slopes raises the risk."],
      ["Staying safe", "🛡️", "People lower the risk with retaining walls, drains, planting roots, and warning signs. Maps show areas at risk so towns can avoid building there."]],
      "Think about gravity, steep slopes and water.", "Heavy rain, earthquakes and cutting trees can trigger slides. Roots and drains help hold slopes.",
      [["The downhill movement of soil and rock due to gravity is...", "Mass movement", "Evaporation|Diffusion"], ["Very slow downhill movement of soil is called...", "Creep", "Rockfall|Avalanche"],
       ["Snow sliding down a slope is an...", "Avalanche", "Earthquake|Eruption"], ["What can trigger a landslide?", "Heavy rain on a steep slope", "A calm sunny day on flat land|A full moon"],
       ["Why can cutting down trees raise landslide risk?", "Roots no longer hold the soil", "Leaves make slopes warmer|Trees make slopes steeper"], ["Wet soil flowing quickly downhill is a...", "Mudflow", "Moraine|Delta"],
       ["Which helps reduce landslide risk?", "Retaining walls and drainage", "Cutting more slopes|Removing all plants"], ["Besides rain, what else can trigger a landslide?", "An earthquake", "A sunny afternoon|A light breeze"],
       ["Which place has the highest landslide risk?", "A steep, wet hillside", "A flat desert|A calm lake"]]))
  ];
  l23.push(LS("Mixed practice", MX(l23, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])));
  l23.push(LS("Level 23 Challenge", MX(l23, [16, 17, 2, 4, 8, 11, 13, 15, 0, 1, 3, 5, 6, 7, 9, 10, 12, 14])));

  // ---------- LEVEL 24 number makers ----------
  const CLASSES = NUM([
    ["Choropleth classes", "🗺️ 🎨", "A <b>choropleth map</b> shades areas (countries, states, counties) by a value. The mapmaker sorts the values into a few <b>classes</b>, each with its own shade."],
    ["Equal interval", "📏", "<b>Equal interval</b> makes every class the same width: <b>width = (highest - lowest) ÷ number of classes</b>. Example: values from 0 to 100 in 4 classes gives a width of 25: 0-25, 25-50, 50-75, 75-100."],
    ["Quantile", "🧮", "<b>Quantile</b> puts the same NUMBER of areas in each class: areas ÷ classes. 40 counties in 4 classes means 10 counties per class. Different class choices can make the same data look very different."]
  ], () => {
    const m = Math.random(), k = pick([4, 5]), w = pick([5, 10, 15, 20, 25]), lo = pick([0, 10, 20, 50]), hi = lo + w * k;
    if (m < 0.4) return Q(`A map uses equal-interval classes. The lowest value is ${lo} and the highest is ${hi}. There are ${k} classes. How wide is each class?`, w,
      "Find the total spread of the data, then share it equally among the classes.", "Subtract the lowest value from the highest, then divide by the number of classes.",
      "Example: values from 10 to 70 in 3 classes. 70 - 10 = 60, and 60 ÷ 3 = 20 wide. Now do yours.");
    if (m < 0.7) { const per = pick([4, 5, 6, 8, 10]); return Q(`A quantile map sorts ${per * k} counties into ${k} classes with the same number of counties in each. How many counties are in each class?`, per,
      "Quantile means the classes are equal in how many areas they hold.", "Divide the number of counties by the number of classes.",
      "Example: 30 counties in 5 classes. 30 ÷ 5 = 6 counties each. Now do yours."); }
    return Q(`A map uses ${k} equal-interval classes, each ${w} wide, starting at ${lo}. What is the highest value that fits in the last class?`, hi,
      "Each class adds the same amount. Think about how many widths you add to the start.", "Multiply the width by the number of classes, then add the starting value.",
      "Example: 3 classes, each 20 wide, starting at 10. 3 x 20 = 60, and 10 + 60 = 70. Now do yours.");
  });

  const PERCAP = NUM([
    ["Totals can fool you", "⚠️", "A big country usually has bigger totals. India makes more total waste than Iceland, but that says little about each person. To compare fairly, <b>normalize</b> the data: turn totals into rates."],
    ["Per capita", "👤", "<b>Per capita</b> means 'per person': <b>total ÷ population</b>. You can also use 'per 1,000 people' or 'per square km'. Rates let a small town and a big city be compared on the same scale."],
    ["Example", "📝", "City A has 600 doctors and 200,000 people. City B has 200 doctors and 40,000 people. Per 1,000 people: A has 3 and B has 5. B has more doctors for its size, even with fewer in total."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) { const pop = pick([2, 4, 5, 10, 20, 25]), c = ri(3, 40); return Q(`A country with ${pop} million people produces ${c * pop} million tons of grain. How many tons of grain is that per person?`, c,
      "Share the total equally among all the people.", "Divide the total by the population. Both numbers are in millions.",
      "Example: 80 million tons and 4 million people. 80 ÷ 4 = 20 tons per person. Now do yours."); }
    if (m < 0.7) { const pop = pick([2000, 4000, 5000, 8000, 10000, 20000]), r = ri(2, 12), t = r * pop / 1000; return Q(`A town of ${fmt(pop)} people has ${t} clinics. How many clinics is that per 1,000 people?`, r,
      "Find how many groups of one thousand people live in the town.", "Divide the population by one thousand, then divide the clinics by that number.",
      "Example: 6,000 people and 12 clinics. 6,000 ÷ 1,000 = 6 groups. 12 ÷ 6 = 2 per 1,000. Now do yours."); }
    const pop = pick([3, 5, 10, 20, 50]), c = ri(2, 30); return Q(`A country has ${pop} million people. Each person uses an average of ${c} kilowatt-hours of electricity a day. How many million kilowatt-hours does the country use in a day?`, c * pop,
      "The total is the amount per person added up for everyone.", "Multiply the amount per person by the population.",
      "Example: 4 million people each using 5 units. 4 x 5 = 20 million units. Now do yours.");
  });

  const INDEX = NUM([
    ["Index numbers", "📈", "An <b>index</b> compares a value to a <b>base</b> value set at <b>100</b>. If the base year is 100 and the next year is 150, the value is 50 percent higher. If it is 80, it is 20 percent lower."],
    ["The formula", "🧮", "<b>Index = (new value ÷ base value) x 100.</b> Example: 20 in the base year and 30 now gives 30 ÷ 20 x 100 = 150. Indexes make different things (tons, dollars, people) easy to compare."],
    ["Uses", "🌐", "Geographers use indexes for prices, trade, populations and rainfall. Be careful: the choice of base year can change how a trend looks."]
  ], () => {
    const m = Math.random(), b = pick([20, 40, 60, 80, 120, 200]), i = pick([50, 75, 125, 150, 175, 200, 250]), nv = b * i / 100;
    if (m < 0.4) return Q(`A city's yearly bus riders were ${b} thousand in the base year (index 100). This year there are ${nv} thousand. What is this year's index number?`, i,
      "Compare the new value with the base value, as a part of one hundred.", "Divide the new value by the base value, then multiply by one hundred.",
      "Example: base 40 and now 60. 60 ÷ 40 x 100 = 150. Now do yours.");
    if (m < 0.75) return Q(`A country's exports were ${b} billion dollars in the base year (index 100). This year the index is ${i}. How many billion dollars are the exports this year?`, nv,
      "The index tells you what part of the base value the new value is.", "Divide the index by one hundred, then multiply by the base value.",
      "Example: base 80 and index 125. 80 x 125 ÷ 100 = 100. Now do yours.");
    const u = pick([125, 150, 175, 200, 250]); return Q(`A population index is ${u} (base year = 100). By what percent has the population grown since the base year?`, u - 100,
      "The base is 100. Think about how far above the base the index has moved.", "Take away the base index from the new index.",
      "Example: an index of 130 is 30 percent higher than the base. Now do yours.");
  });

  const VERTEX = NUM([
    ["Profiles", "⛰️", "A <b>cross-section</b> or <b>profile</b> shows the ups and downs of land along a line. Hills in a flat drawing would be tiny, so mapmakers stretch the vertical scale. This is <b>vertical exaggeration (VE)</b>."],
    ["The formula", "📐", "<b>VE = horizontal scale ÷ vertical scale</b>, using the scale denominators. If the horizontal scale is 1:50,000 and the vertical is 1:10,000, then VE = 50,000 ÷ 10,000 = 5. Hills look 5 times steeper than they really are."],
    ["Why it matters", "👀", "A profile with VE of 1 shows true shape. Higher VE makes hills and valleys easier to see but makes slopes look steeper than they are. A good profile always states its VE."]
  ], () => {
    const m = Math.random(), k = ri(2, 10), vd = pick([1000, 2000, 5000, 10000]), hd = k * vd;
    if (m < 0.4) return Q(`A profile has a horizontal scale of 1:${fmt(hd)} and a vertical scale of 1:${fmt(vd)}. What is its vertical exaggeration?`, k,
      "Compare the two scale denominators. One is bigger than the other.", "Divide the horizontal denominator by the vertical denominator.",
      "Example: horizontal 1:20,000 and vertical 1:5,000. 20,000 ÷ 5,000 = 4. Now do yours.");
    if (m < 0.7) return Q(`A profile has a vertical scale of 1:${fmt(vd)} and a vertical exaggeration of ${k}. What is the second number (denominator) of its horizontal scale, 1:?`, hd,
      "The horizontal scale is the smaller one, so its denominator is bigger.", "Multiply the vertical denominator by the exaggeration.",
      "Example: vertical 1:2,000 and VE of 6. 2,000 x 6 = 12,000, so the horizontal scale is 1:12,000. Now do yours.");
    const e = ri(2, 12); return Q(`On a profile with vertical exaggeration of ${k}, a hill is drawn ${e * k} mm tall. How tall would it be drawn with no exaggeration, in mm?`, e,
      "Exaggeration stretches the height. Undo the stretch.", "Divide the drawn height by the exaggeration.",
      "Example: a hill drawn 30 mm tall with VE of 5. 30 ÷ 5 = 6 mm. Now do yours.");
  });

  const AVGCH = NUM([
    ["Rate of change", "📊", "To see a trend, find the <b>average change per year</b>: <b>(end value - start value) ÷ number of years</b>. It works for population, forest area, glacier length, temperature and more."],
    ["Example", "📝", "A town grows from 12,000 to 15,000 people in 6 years. Change = 3,000. 3,000 ÷ 6 = 500 people a year on average."],
    ["Careful", "⚠️", "An average hides ups and downs inside the period. A graph of every year shows more. Also remember to count the years from the start year to the end year (2010 to 2025 is 15 years)."]
  ], () => {
    const m = Math.random(), y = ri(3, 12), r = pick([2, 3, 4, 5, 6, 8, 10, 20, 25, 50]), s = pick([100, 200, 500, 1000, 1200, 2000]);
    if (m < 0.4) return Q(`A town had ${fmt(s)} people in 2010 and ${fmt(s + r * y)} people in ${2010 + y}. On average, how many people did it gain each year?`, r,
      "Find the total gain first, then spread it over the years.", "Subtract the start from the end, then divide by the number of years between them.",
      "Example: 1,000 people in 2000 and 1,300 in 2010. Gain 300 over 10 years is 30 a year. Now do yours.");
    if (m < 0.75) return Q(`A town has ${fmt(s)} people in 2010 and gains about ${r} people a year. How many people will it have after ${y} years?`, s + r * y,
      "Find the total gain across all the years and add it to the start.", "Multiply the yearly gain by the number of years, then add the start value.",
      "Example: 800 people gaining 20 a year for 5 years. 20 x 5 = 100, and 800 + 100 = 900. Now do yours.");
    return Q(`A town grew from ${fmt(s)} people to ${fmt(s + r * y)} people, gaining ${r} people a year. How many years did that take?`, y,
      "Find the total gain, then see how many yearly gains it holds.", "Subtract the start from the end, then divide by the gain per year.",
      "Example: from 500 to 800 gaining 50 a year. 300 gain ÷ 50 = 6 years. Now do yours.");
  });

  const HYDRO = NUM([
    ["What a hydrograph shows", "🌧️ 🌊", "A <b>hydrograph</b> is a graph of a river's <b>discharge</b> (how much water flows past a point, in cubic meters per second) over time after a storm. It has a rising limb, a peak and a falling limb."],
    ["Lag time", "⏱️", "<b>Lag time</b> is the time between the peak of the rainfall and the peak of the river's discharge. Rain takes time to reach the river. Steep slopes, paved cities and saturated soil give a short lag time and a high, sharp peak, so floods come faster."],
    ["Example", "📝", "Rain peaks at hour 3. The river peaks at hour 8. Lag time = 8 - 3 = 5 hours. Before the storm, the steady flow is called the <b>base flow</b>. The rise in flow is the peak minus the base flow."]
  ], () => {
    const m = Math.random(), a = ri(1, 6), lag = ri(2, 12), b = a + lag, base = pick([10, 20, 30, 40]), rise = pick([20, 40, 60, 80, 100, 120]);
    if (m < 0.4) return Q(`Rainfall peaks at hour ${a} of a storm and the river's discharge peaks at hour ${b}. What is the lag time, in hours?`, lag,
      "Lag time is a wait. Compare the two peak times.", "Take the time of the rain peak away from the time of the river peak.",
      "Example: rain peak at hour 2 and river peak at hour 9. 9 - 2 = 7 hours. Now do yours.");
    if (m < 0.7) return Q(`A storm's rain peaks at hour ${a}. The river's lag time is ${lag} hours. At what hour does the river's discharge peak?`, b,
      "The river peaks after the rain, by the length of the lag time.", "Add the lag time to the time of the rain peak.",
      "Example: rain peak at hour 4 and lag time of 6 hours. 4 + 6 = hour 10. Now do yours.");
    return Q(`A river's base flow is ${base} cubic meters per second. At its flood peak it carries ${base + rise} cubic meters per second. By how many cubic meters per second did the flow rise?`, rise,
      "The rise is the extra water above the normal flow.", "Subtract the base flow from the peak flow.",
      "Example: base flow 15 and peak 95. 95 - 15 = 80. Now do yours.");
  });

  const LQ = NUM([
    ["Concentration", "🏭 📍", "Some industries cluster in certain places (cars in Detroit, film in Los Angeles). The <b>location quotient (LQ)</b> shows how concentrated an activity is in a region compared with the whole nation."],
    ["The formula", "🧮", "<b>LQ = region's share ÷ nation's share.</b> If 20 percent of a region's jobs are in an industry and the nation has 10 percent, LQ = 20 ÷ 10 = 2."],
    ["Reading it", "👀", "<b>LQ above 1</b>: more concentrated than the nation (a specialty). <b>LQ = 1</b>: same as the nation. <b>LQ below 1</b>: less concentrated. Regions with high LQ in an industry often build their economy around it."]
  ], () => {
    const m = Math.random(), n = pick([5, 10, 15]), k = ri(2, 4), r = n * k;
    if (m < 0.4) return Q(`In a region, ${r} percent of jobs are in tourism. Nationally, ${n} percent of jobs are in tourism. What is the region's location quotient for tourism?`, k,
      "Compare the region's share with the nation's share.", "Divide the region's percent by the nation's percent.",
      "Example: region 30 percent and nation 10 percent. 30 ÷ 10 = 3. Now do yours.");
    if (m < 0.7) return Q(`Nationally, ${n} percent of jobs are in mining. A region has a location quotient of ${k} for mining. What percent of the region's jobs are in mining?`, r,
      "A location quotient above 1 means the region has a bigger share than the nation.", "Multiply the nation's percent by the location quotient.",
      "Example: nation 5 percent and LQ of 4. 5 x 4 = 20 percent. Now do yours.");
    return Q(`In a region, ${r} percent of jobs are in farming. Its location quotient for farming is ${k}. What percent of jobs nationally are in farming?`, n,
      "The nation's share is smaller than the region's share when the quotient is above 1.", "Divide the region's percent by the location quotient.",
      "Example: region 40 percent and LQ of 4. 40 ÷ 4 = 10 percent nationally. Now do yours.");
  });

  const PLSS = NUM([
    ["Township and range", "🌽 🧭", "Much of the central and western US was surveyed by the <b>Public Land Survey System</b>, a grid of squares laid out from baselines and meridians. It is why many farms and roads there make a neat grid."],
    ["The pieces", "🟩", "A <b>section</b> is 1 mile by 1 mile = <b>640 acres</b>. A <b>township</b> is 6 miles by 6 miles = <b>36 sections</b>. A section can be split: half = 320 acres, quarter = 160 acres, a quarter of a quarter = 40 acres."],
    ["Example", "📝", "A farm is the north half of a section. Half of 640 = 320 acres. Section numbers in a township run in a snake pattern, 1 to 36, starting at the top right."]
  ], () => {
    const m = Math.random();
    if (m < 0.4) { const k = ri(2, 9); return Q(`A ranch covers ${k} whole sections. How many acres is that? (One section is 640 acres.)`, 640 * k,
      "Every section is the same size. Think about repeated groups.", "Multiply the acres in one section by the number of sections.",
      "Example: 3 sections. 3 x 640 = 1,920 acres. Now do yours."); }
    if (m < 0.75) { const f = pick([[2, "half", 320], [4, "quarter", 160], [8, "eighth", 80], [16, "sixteenth", 40]]); return Q(`A farmer owns one ${f[1]} of a section. How many acres is that? (One section is 640 acres.)`, f[2],
      "Cut the section into equal parts.", "Divide the acres in one section by the number of equal parts named in the fraction.",
      "Example: one fifth of a 100-acre field is 100 ÷ 5 = 20 acres. Now do yours with a section."); }
    const t = ri(2, 6); return Q(`How many sections are in ${t} whole townships? (One township holds 36 sections.)`, 36 * t,
      "Each township holds the same number of sections.", "Multiply the sections in one township by the number of townships.",
      "Example: 2 townships. 2 x 36 = 72 sections. Now do yours.");
  });

  // ---------- LEVEL 24 ----------
  const l24 = [
    LS("Classes on a map", CLASSES),
    LS("Totals and rates", PERCAP),
    LS("Outliers and skewed data", MC([
      ["Outliers", "📍", "An <b>outlier</b> is a value far from the rest of the data. It could be a mistake, or a real extreme such as a huge city among small towns. Check before you delete it."],
      ["Mean and median", "⚖️", "The <b>mean</b> (the average) is pulled by outliers. The <b>median</b> (middle value when sorted) is not. If one billionaire moves to a small town, the town's mean income jumps but its median hardly moves."],
      ["Skew", "📈", "<b>Skewed</b> data has a long tail on one side. Incomes are usually skewed right (a few very high values), so the mean is higher than the median. For skewed data the median is often a better 'typical' value. A <b>box plot</b> shows the median and the spread."]],
      "Think about which number gets dragged by extreme values.", "The mean follows extremes. The median stays in the middle.",
      [["A value far away from the rest of the data is an...", "Outlier", "Median|Mode"], ["Which is less affected by an outlier?", "Median", "Mean|Range"],
       ["If one billionaire moves to a small town, the town's mean income will...", "Jump up a lot", "Fall|Stay exactly the same"], ["Income data is usually skewed right, so the mean is usually...", "Higher than the median", "Lower than the median|Exactly equal to the median"],
       ["For skewed data, a good typical value is the...", "Median", "Highest value|Lowest value"], ["The median is the...", "Middle value when the data is sorted", "Most common value|Highest minus lowest"],
       ["A box plot shows the median and the...", "Spread of the data", "Names of rivers|Latitude"], ["Should you automatically delete an outlier?", "No, first check whether it is an error or real", "Yes, always|Yes, if it is large"],
       ["The range is...", "Highest value minus lowest value", "The middle value|The average"]])),
    LS("Index numbers", INDEX),
    LS("Cartograms", MC([
      ["Size shows data", "📊 🗺️", "A <b>cartogram</b> resizes places to show a value instead of true land area. On a population cartogram, a country with many people looks big even if its land is small."],
      ["What changes", "🔍", "India, China and Nigeria look much bigger than usual. Russia, Canada and Australia look much smaller, because few people live on their huge land. A <b>Dorling cartogram</b> uses circles sized by the data."],
      ["Trade-off", "⚖️", "Cartograms show 'who has the most' clearly, but shapes and positions are distorted, so they can be harder to read. They are great for people, money or votes."]],
      "Think about size meaning the number of people (or another value), not land.", "A big, crowded country gets bigger. A huge, empty country shrinks.",
      [["A cartogram resizes places to show...", "A data value such as population", "True land area only|Elevation only"], ["On a population cartogram, which country looks much bigger than on a normal map?", "India", "Canada|Mongolia"],
       ["On a population cartogram, which country looks much smaller than normal?", "Canada", "India|Nigeria"], ["A Dorling cartogram uses...", "Circles sized by data", "Contour lines|Compass roses"],
       ["Is a cartogram drawn to true land area?", "No, area shows the data", "Yes, always|Only on weekends"], ["Cartograms are useful to show which places have the...", "Most people or highest values", "Tallest mountains|Longest rivers"],
       ["On a population cartogram of the world, Asia looks...", "Huge", "Tiny|The same as on a normal map"], ["A drawback of cartograms is that shapes get...", "Distorted", "Perfectly accurate|Invisible"],
       ["On a population cartogram, Nigeria looks...", "Much larger than normal", "Much smaller than normal|The same size"]])),
    LS("Great circles and rhumb lines", MC([
      ["The shortest path", "✈️", "On a globe the shortest path between two places is an arc of a <b>great circle</b>, a circle that cuts Earth into two equal halves. The Equator is a great circle. So is any meridian paired with its opposite meridian. Other lines of latitude are not."],
      ["Curved on flat maps", "🗺️", "On many flat maps a great-circle route looks curved. Flights from New York to Europe arc north. London to Tokyo passes over northern Russia. The curve is really the shortest path."],
      ["Rhumb line", "🧭", "A <b>rhumb line</b> (loxodrome) crosses every meridian at the same angle, so you keep one constant compass bearing. On a Mercator map it is straight, but it is usually longer than the great circle."]],
      "Think: the globe's shortest path versus a constant compass direction.", "Great circles are shortest and cut the globe in equal halves. Rhumb lines keep one compass bearing.",
      [["Which is a great circle?", "The Equator", "The Tropic of Cancer|The Arctic Circle"], ["The shortest route between two points on a globe follows a...", "Great circle", "Rhumb line|Contour line"],
       ["Why do flights from New York to Europe arc north on a flat map?", "A great-circle route is the shortest", "Pilots like cold air|The wind is stronger in the south"], ["A rhumb line keeps a constant...", "Compass bearing", "Elevation|Speed"],
       ["On a Mercator map a rhumb line looks...", "Straight", "Curved|Circular"], ["Which line of latitude is a great circle?", "0 degrees, the Equator", "30 degrees north|60 degrees south"],
       ["A meridian together with its opposite meridian forms a...", "Great circle", "Rhumb line|Small circle"], ["A great circle divides Earth into two equal...", "Hemispheres", "Time zones|Continents"],
       ["A rhumb line is usually ... than the great circle between two places.", "Longer", "Shorter|Exactly the same"]])),
    LS("Datums and coordinate systems", MC([
      ["Where is it?", "📍", "To give a place a coordinate we need a model of Earth's shape, called a <b>datum</b>. Earth is not a perfect sphere. It is an <b>oblate spheroid</b>, slightly flattened at the poles and bulging at the equator."],
      ["Common datums", "🛰️", "<b>WGS 84</b> is the datum used by GPS worldwide. <b>NAD83</b> is a datum used for North America. Mixing data from different datums can shift features by a few meters, or more in some places."],
      ["Two kinds of systems", "🧱", "A <b>geographic coordinate system</b> gives positions in degrees of latitude and longitude. A <b>projected coordinate system</b> flattens Earth and gives positions in meters on a grid, like UTM. GIS software needs to know both the datum and the system."]],
      "Think about a model of Earth's shape and about degrees versus meters.", "GPS uses WGS 84. Degrees means a geographic system. Meters on a flat grid means a projected system.",
      [["A datum is a...", "Model of Earth's shape used for coordinates", "Type of rock|Kind of weather"], ["Which datum does GPS use?", "WGS 84", "NAD83 only|The Greenwich Datum of 1066"],
       ["Mixing datums can cause features to...", "Appear slightly in the wrong place", "Change color|Disappear from Earth"], ["Coordinates in degrees of latitude and longitude form a...", "Geographic coordinate system", "Projected coordinate system|Time-zone system"],
       ["Positions in meters on a flat grid come from a...", "Projected coordinate system", "Geographic coordinate system|Contour system"], ["Earth is best described as an...", "Oblate spheroid", "Perfect sphere|Cube"],
       ["NAD83 is a datum used for...", "North America", "Antarctica only|The Moon"], ["The UTM grid uses units of...", "Meters", "Degrees|Miles per hour"],
       ["Earth bulges slightly at the...", "Equator", "Poles|Prime Meridian"]])),
    LS("Vertical exaggeration", VERTEX),
    LS("Choosing map symbols", MC([
      ["Visual variables", "🎨", "Mapmakers choose symbols with care. Main <b>visual variables</b> are size, shape, color hue (red, blue), color value (light to dark), pattern and direction. Points are symbols like dots, lines are roads or rivers, areas are lakes or counties."],
      ["Match the data", "🔗", "Use different <b>hues</b> for different <b>categories</b> (such as land cover types). Use <b>light to dark of one hue</b> for ordered amounts (low to high). Use bigger symbols for bigger amounts."],
      ["Making maps readable", "👁️", "Avoid red and green as the only difference, since many people are color-blind. Use <b>generalization</b> on small-scale maps: show fewer, simpler features. Make the most important things stand out (<b>visual hierarchy</b>)."]],
      "Ask what kind of data it is: categories, or amounts in order?", "Different hues are for categories. Light-to-dark is for amounts in order. Bigger means more.",
      [["Different hues (red, blue, green) are best for showing...", "Categories", "Ordered amounts|Elevation only"], ["A light-to-dark ramp of one color is best for showing...", "Ordered amounts from low to high", "Unrelated categories|Names of cities"],
       ["Bigger circles on a map usually mean...", "A larger amount", "A smaller amount|A newer place"], ["A road on a map is usually drawn as a...", "Line symbol", "Area symbol|Point symbol"],
       ["A lake or a county is usually drawn as a...", "Area symbol", "Point symbol|Line symbol"], ["Why avoid using only red and green to show a difference?", "Many people are color-blind", "They print too dark|They are not real colors"],
       ["Generalization on a small-scale map means...", "Showing fewer, simpler features", "Showing every house|Adding more labels"], ["Visual hierarchy means...", "The most important things stand out", "All symbols look the same|Maps have no legend"],
       ["Which best shows rank from low to high?", "A light-to-dark color ramp", "Random colors|Different shapes"]])),
    LS("Clusters and hot spots", MC([
      ["Patterns of points", "🔴", "Points on a map can be <b>clustered</b> (bunched), <b>dispersed</b> (evenly spread) or <b>random</b>. The <b>nearest neighbor</b> method compares the real average distance between points with what a random pattern would give."],
      ["Hot spots", "🔥", "A <b>hot spot</b> is an area with unusually high values or many events, such as a high number of accidents or cases of a disease. A <b>cold spot</b> has unusually low values. Mapmakers also use <b>density maps</b> that show how closely packed points are."],
      ["Tobler's law", "🧩", "<b>Tobler's first law of geography</b>: everything is related to everything else, but near things are more related than distant things. This is why neighbors often have similar rainfall, prices or soil."]],
      "Think about bunched, even or random, and about nearness.", "A hot spot has unusually high values. Tobler said near things are more alike than far things.",
      [["Points that are bunched together form a...", "Clustered pattern", "Dispersed pattern|Elevation pattern"], ["Points spread evenly apart form a...", "Dispersed pattern", "Clustered pattern|Hot spot"],
       ["A hot spot on a map is an area with...", "Unusually high values or many events", "Unusually cold weather only|No data"], ["Tobler's first law says near things are...", "More related than distant things", "Always identical|Unrelated"],
       ["The nearest neighbor method compares real distances between points with...", "A random pattern", "A coastline|The Prime Meridian"], ["A map showing how closely packed points are is a...", "Density map", "Political map|Climograph"],
       ["Nearby towns often have similar rainfall because of...", "Tobler's first law", "The Coriolis effect|Gerrymandering"], ["An area with unusually low values is a...", "Cold spot", "Hot spot|Compass rose"],
       ["Dispersed points are...", "Evenly spread", "All in one place|Hidden"]])),
    LS("Average change per year", AVGCH),
    LS("River hydrographs", HYDRO),
    LS("Census zones and map results", MC([
      ["Counting people", "📋", "A <b>census</b> counts everyone in a country, in the US every ten years. Results are grouped into zones such as states, counties and <b>census tracts</b> (small areas of about 4,000 people)."],
      ["The zone problem", "🧩", "The <b>modifiable areal unit problem (MAUP)</b> means your results can change when you redraw the zone boundaries or change their size, even though the data is the same. The <b>ecological fallacy</b> is wrongly assuming that a fact about a whole zone is true of each person in it."],
      ["Privacy", "🔒", "Census results are shared as <b>aggregated</b> totals so no single person can be identified. Smaller zones show more detail, but must hide numbers that are too small."]],
      "Think about how the zone boundaries and sizes can change the story.", "MAUP is about changing zone boundaries. The ecological fallacy is about assuming every person matches the zone's average.",
      [["A census counts...", "Everyone in a country", "Only farmers|Only cities"], ["In the US, a census is held every...", "Ten years", "One year|Fifty years"],
       ["MAUP stands for...", "Modifiable areal unit problem", "Map and urban planning|Major area unit program"], ["MAUP means results can change when you...", "Redraw the zone boundaries", "Print the map in color|Use a bigger font"],
       ["Assuming everyone in a zone matches the zone's average is the...", "Ecological fallacy", "Rain shadow|Border effect"], ["Census tracts are about how big?", "About 4,000 people", "About 4 people|About 40 million people"],
       ["Census data is shared as aggregated totals to protect...", "Privacy", "Rivers|Borders"], ["Smaller zones usually show...", "More detail", "Less detail|No data at all"],
       ["A census tract is smaller than a...", "County", "House|Street corner"]])),
    LS("Open data and crowdsourced maps", MC([
      ["Volunteers map the world", "🧑‍🤝‍🧑 🗺️", "<b>Volunteered geographic information</b> is map data created by ordinary people. <b>OpenStreetMap</b> is a free map of the world built by volunteers who add roads, paths and buildings. Anyone can use it."],
      ["Helping in emergencies", "🆘", "After disasters, volunteers can map damaged areas fast. The Humanitarian OpenStreetMap Team helps in places that were missing from maps. <b>Citizen science</b> lets people record things like bird sightings or rainfall."],
      ["Quality and metadata", "🔎", "Crowdsourced data can have mistakes or gaps, so check it. <b>Metadata</b> is 'data about the data': who made it, when, how accurate it is and what the columns mean. <b>Open data</b> from governments is free to use and share."]],
      "Think about who makes the data, how fast it can be made, and how you know it is good.", "Crowdsourced means made by many volunteers. Metadata tells who, when and how.",
      [["Map data made by ordinary volunteers is called...", "Volunteered geographic information", "A census|A compass rose"], ["OpenStreetMap is a map built by...", "Volunteers", "One company only|Satellites only"],
       ["Metadata is...", "Data about the data", "A kind of road|A map border"], ["Why check crowdsourced data?", "It can have mistakes or gaps", "It is always perfect|It cannot be used"],
       ["Volunteers can help after a disaster by...", "Mapping damaged areas", "Closing roads|Printing money"], ["Open data from governments is...", "Free to use and share", "Secret|Sold only to companies"],
       ["Recording bird sightings as a volunteer is an example of...", "Citizen science", "Gerrymandering|Remote control"], ["Metadata can tell you...", "Who made the data and how accurate it is", "How tall the mountain is|Tomorrow's weather"],
       ["Crowdsourced maps are especially helpful for places that...", "Are missing from official maps", "Have too many maps|Are on the Moon"]])),
    LS("Ethics, privacy and bias in mapping", MC([
      ["Location is personal", "🔐", "Phones, apps and cars record where people go. This <b>location data</b> can show where someone lives, works and travels. It should be collected only with permission and protected."],
      ["Sharing carefully", "🎭", "Mapmakers can use <b>aggregation</b> (group data into bigger areas) or <b>geomasking</b> (shift points a little) to hide exact addresses. Sensitive places, such as endangered animal nests, may be hidden so they are not harmed."],
      ["Bias in maps", "⚖️", "Data can leave out people and places, such as areas with fewer phones or sensors. A map built on missing data may give the wrong picture. Maps also reflect choices about what to show, what to name and which borders to draw. Ask: who made this, and who is missing?"]],
      "Think about who gives permission, and who or what might be missing.", "Protect people's privacy, ask permission, and check who or what is missing from the data.",
      [["Location data from phones can show where a person...", "Lives, works and travels", "Was born long ago|Likes to eat"], ["Location data should be collected with...", "Permission", "Secrecy|Tricks"],
       ["Shifting points a little to hide exact addresses is called...", "Geomasking", "Projection|Diffusion"], ["Grouping data into bigger areas to protect privacy is...", "Aggregation", "Erosion|Subduction"],
       ["Why might a map hide nest locations of endangered animals?", "To keep the animals from being harmed", "Because nests are boring|To save ink"], ["A map built on data that misses some places can be...", "Biased or misleading", "Always accurate|Easier to read"],
       ["A good question to ask about a map is...", "Who made it, and who is missing?", "How many colors does it have?|Is the paper thick?"], ["Areas with fewer phones or sensors may be...", "Missing from the data", "Always overcounted|Hidden under the sea"],
       ["Protecting people's location data is an example of...", "Mapping ethics", "Plate tectonics|Time zones"]])),
    LS("Location quotient", LQ),
    LS("Townships and sections", PLSS),
    LS("Hazard, exposure and risk maps", MC([
      ["What risk means", "⚠️", "<b>Risk</b> is the chance of harm. It depends on three things: the <b>hazard</b> (the dangerous event, like a flood or earthquake), <b>exposure</b> (the people and property in its path) and <b>vulnerability</b> (how easily they can be hurt and how well they can cope)."],
      ["Risk maps", "🗺️", "A <b>hazard map</b> shows where a hazard can strike, such as flood zones or ground-shaking zones. A <b>risk map</b> adds people and buildings. The same earthquake can cause far more harm in a crowded city with weak buildings than in an empty area."],
      ["Lowering risk", "🛡️", "Reduce hazard where you can (dams, drainage). Reduce exposure (do not build in flood zones, plan evacuation routes). Reduce vulnerability (strong building codes, early warnings, education, savings). This is called <b>mitigation</b> and <b>preparedness</b>."]],
      "Think about the event, the people in its path and how well they can cope.", "Risk grows with the hazard, the exposure and the vulnerability. Lowering any one lowers the risk.",
      [["A hazard is...", "A dangerous event like a flood or earthquake", "A kind of map scale|A time zone"], ["Exposure means...", "The people and property in the path of a hazard", "The size of a map|Latitude"],
       ["Vulnerability is how easily people...", "Can be hurt and how well they cope", "Travel between cities|Pay taxes"], ["A map that shows where a hazard can strike is a...", "Hazard map", "Choropleth of languages|Time-zone map"],
       ["Which place likely has higher risk from the same earthquake?", "A crowded city with weak buildings", "An empty desert|An empty mountain top"], ["Which lowers vulnerability?", "Strong building codes and early warnings", "Building in a flood zone|Removing all warning systems"],
       ["Which lowers exposure?", "Not building homes in a flood zone", "Building more homes in a flood zone|Ignoring evacuation routes"], ["Planning evacuation routes is part of...", "Preparedness", "Gerrymandering|Diffusion"],
       ["Risk depends on hazard, exposure and...", "Vulnerability", "Latitude|Population pyramid"]]))
  ];
  l24.push(LS("Mixed practice", MX(l24, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])));
  l24.push(LS("Level 24 Challenge", MX(l24, [16, 17, 0, 1, 3, 5, 7, 9, 10, 11, 14, 15, 2, 4, 6, 8, 12, 13])));

  Object.assign(GEO_LEVELS, { 22: l22, 23: l23, 24: l24 });
})();
