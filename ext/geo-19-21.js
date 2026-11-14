// ext/geo-19-21.js : Mind Lab Geography levels 19-21 (60 lessons): human geography, GIS, regional geography in depth
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

  // ---------- number makers ----------
  const NATINC = NUM([
    ["Birth rate and death rate", "👶 ⚰️", "The <b>birth rate</b> is the number of babies born each year for every 1,000 people. The <b>death rate</b> is the number of deaths each year for every 1,000 people."],
    ["Natural increase", "➖", "<b>Natural increase = birth rate - death rate</b>. The answer is per 1,000 people. Divide by 10 to turn it into a percent, because 10 per 1,000 is 1 percent."],
    ["Example", "📝", "Birth rate 30 and death rate 10 per 1,000. 30 - 10 = 20 per 1,000, and 20 per 1,000 = 2 percent a year. This does not count people moving in or out."]
  ], () => {
    const m = Math.random(), k = ri(1, 4), cdr = pick([5, 6, 7, 8, 9, 10, 12]), cbr = cdr + 10 * k;
    const ek = k === 3 ? 2 : 3, ec = cdr === 8 ? 7 : 8;
    if (m < 0.4) return {
      text: `A country has a birth rate of ${cbr} per 1,000 and a death rate of ${cdr} per 1,000. What is its natural increase, in percent a year?`, answer: k,
      hints: ["Natural increase is what is left when you take deaths away from births.", "Subtract the death rate from the birth rate, then divide by 10 to get a percent.", `Example: birth rate ${ec + 10 * ek}, death rate ${ec}. ${ec + 10 * ek} - ${ec} = ${10 * ek} per 1,000, which is ${ek} percent. Now do yours.`]
    };
    if (m < 0.7) return {
      text: `A country has a birth rate of ${cbr} per 1,000 and a death rate of ${cdr} per 1,000. What is its natural increase per 1,000 people?`, answer: 10 * k,
      hints: ["Compare how many are born with how many die for every 1,000 people.", "Subtract the death rate from the birth rate.", `Example: birth rate ${ec + 10 * ek}, death rate ${ec}. The difference is ${10 * ek} per 1,000. Now do yours.`]
    };
    return {
      text: `A country's natural increase is ${k} percent a year and its death rate is ${cdr} per 1,000. What is its birth rate per 1,000?`, answer: cbr,
      hints: ["Work backwards. Birth rate minus death rate gives the natural increase.", "Change the percent into a number per 1,000 (multiply by 10), then add the death rate.", `Example: natural increase ${ek} percent, death rate ${ec}. ${ek} percent is ${10 * ek} per 1,000, and ${10 * ek} + ${ec} = ${10 * ek + ec}. Now do yours.`]
    };
  });

  const PHYSD = NUM([
    ["Two kinds of density", "👥 🌾", "<b>Arithmetic density</b> = people ÷ total land area. <b>Physiological density</b> = people ÷ <b>farmland</b> (land that can grow crops)."],
    ["Why it matters", "🧮", "Physiological density shows how much pressure there is on farmland. A country with deserts or mountains can have a low arithmetic density but a high physiological density."],
    ["Example", "📝", "6,000 people live on 100 square km of farmland. 6,000 ÷ 100 = 60 people per square km of farmland. Units: people per square km."]
  ], () => {
    const m = Math.random(), A = pick([10, 20, 25, 50, 100, 200]), d = pick([20, 40, 60, 80, 100, 120, 160, 200]), P = A * d, ti = pick([2, 4, 5]);
    if (m < 0.3) return {
      text: `A country has ${fmt(P)} people and ${fmt(A)} square km of farmland. What is its physiological density, in people per square km of farmland?`, answer: d,
      hints: ["Physiological density divides people by the farmland only.", "Divide the number of people by the square km of farmland.", "Example: 9,000 people and 50 square km of farmland. 9,000 ÷ 50 = 180. Now do yours."]
    };
    if (m < 0.55) return {
      text: `A country has ${fmt(P)} people. It covers ${fmt(A * ti)} square km in total, and ${fmt(A)} square km of that is farmland. What is its arithmetic density, in people per square km?`, answer: d / ti,
      hints: ["Arithmetic density uses the whole area, not just the farmland.", "Divide the people by the total area. Ignore the farmland number.", "Example: 8,000 people, total area 80 square km, farmland 20 square km. 8,000 ÷ 80 = 100. Now do yours."]
    };
    if (m < 0.8) return {
      text: `A country's physiological density is ${d} people per square km of farmland, and it has ${fmt(A)} square km of farmland. How many people live there?`, answer: P,
      hints: ["Density tells how many people for each square km of farmland.", "Multiply the density by the square km of farmland.", "Example: density 30 and 400 square km of farmland. 30 x 400 = 12,000 people. Now do yours."]
    };
    return {
      text: `${fmt(P)} people live in a country with a physiological density of ${d} per square km of farmland. How many square km of farmland does it have?`, answer: A,
      hints: ["Work backwards from the density.", "Divide the people by the density.", "Example: 12,000 people at density 30. 12,000 ÷ 30 = 400 square km. Now do yours."]
    };
  });

  const NETMIG = NUM([
    ["Moving in and moving out", "🛬 🛫", "<b>Immigrants</b> move into a country. <b>Emigrants</b> move out of it. <b>Net migration = immigrants - emigrants</b>."],
    ["Gain or loss", "⚖️", "If more people arrive than leave, the country has a <b>net gain</b>. If more leave than arrive, it has a <b>net loss</b>."],
    ["Total change", "➕", "Population change = natural increase + net migration. Example: 50,000 more births than deaths, plus a net gain of 10,000 movers, makes the population grow by 60,000."]
  ], () => {
    const m = Math.random(), I = 5 * ri(6, 20), E = 5 * ri(1, 5), net = I - E, S = 100 * ri(2, 9), NI = 5 * ri(2, 12);
    if (m < 0.3) return {
      text: `In one year ${I},000 people moved into a country and ${E},000 moved out. What was the net migration, in thousands?`, answer: net,
      hints: ["Net migration compares the people coming in with the people going out.", "Subtract the number who left from the number who arrived.", "Example: 80,000 arrived and 30,000 left. 80 - 30 = 50, so a net gain of 50 thousand. Now do yours."]
    };
    if (m < 0.55) return {
      text: `A country had a net gain of ${net} thousand people from migration. ${I} thousand people arrived. How many thousand people left?`, answer: E,
      hints: ["Net gain is the people who arrived minus the people who left.", "Take the number who arrived and subtract the net gain.", "Example: net gain 50, arrived 80. 80 - 50 = 30 left. Now do yours."]
    };
    if (m < 0.8) return {
      text: `A town of ${S},000 people has a natural increase of ${NI} thousand and a net migration gain of ${net} thousand in one year. How many thousand people will it have at the end of the year?`, answer: S * 1 + NI + net,
      hints: ["Add both kinds of growth to the starting number.", "Start + natural increase + net migration gain. Keep everything in thousands.", "Example: start 300, natural increase 10, net gain 20. 300 + 10 + 20 = 330. Now do yours."]
    };
    return {
      text: `${E + I} thousand people left a region and ${I} thousand moved in, so it lost people. How many more people left than arrived, in thousands?`, answer: E,
      hints: ["Compare the number who left with the number who arrived.", "Subtract the smaller number (arrived) from the bigger number (left).", "Example: 60 left and 45 arrived. 60 - 45 = 15 more left than arrived. Now do yours."]
    };
  });

  // ---------- level 19 : human geography ----------
  const l19 = [
    LS("Types of diffusion", MC([
      ["Where ideas begin", "🌱", "<b>Diffusion</b> is the spread of an idea, custom or thing from where it started (its <b>hearth</b>) to other places."],
      ["Four ways", "🚶 🏙️", "<b>Relocation</b>: people move and carry the idea with them. <b>Contagious</b>: it spreads from person to person nearby, like a cold. <b>Hierarchical</b>: it jumps from big cities or leaders down to smaller places. <b>Stimulus</b>: the idea spreads but changes to fit the new place."],
      ["Today", "🌐", "The internet makes diffusion very fast, because ideas can travel without people moving. Long ago it took years for a new idea to cross a continent."]],
      "Think about HOW the idea travels: with moving people, next door, from the top down, or changed on the way.", "Match the way of spreading to the word. One word means moving, one means nearby, one means top-down, one means changed.",
      [["People move to a new country and bring their language and food with them. This is...", "Relocation diffusion", "Contagious diffusion|Hierarchical diffusion"], ["A fashion starts in big world cities and then reaches small towns. This is...", "Hierarchical diffusion", "Relocation diffusion|Contagious diffusion"],
       ["An idea passes from person to person nearby, like a rumor in a school. This is...", "Contagious diffusion", "Hierarchical diffusion|Relocation diffusion"], ["The place where an idea or custom starts is its...", "Hearth", "Delta|Border"],
       ["An idea spreads but is changed to fit local tastes, such as a food chain adding local dishes. This is...", "Stimulus diffusion", "Contagious diffusion|Relocation diffusion"], ["Why does the internet speed up diffusion?", "Information travels without people moving", "It carries people on trains|It only works nearby"],
       ["Immigrants opening restaurants with their home foods is an example of...", "Relocation diffusion", "Hierarchical diffusion|Stimulus diffusion"], ["An idea spreading from a famous leader or a major city down to smaller places is...", "Hierarchical diffusion", "Contagious diffusion|Stimulus diffusion"]])),
    LS("Folk and popular culture", MC([
      ["Folk culture", "🪕 🏡", "<b>Folk culture</b> belongs to a small, close group, often in the countryside. Traditions, crafts, songs and foods are passed down slowly from older people to younger ones."],
      ["Popular culture", "🎧 👟", "<b>Popular culture</b> is shared by large numbers of people in many places. It changes fast: music hits, clothing brands, video games and trends."],
      ["Mixing", "🌍", "Globalization spreads popular culture, so places can start to look and sound alike. Many groups work to protect folk culture and old crafts because they are part of who they are."]],
      "Ask yourself: is it old and local, or new and spread everywhere?", "Folk culture stays in one place and changes slowly. Popular culture travels and changes quickly.",
      [["Traditions passed down in a small group, often in the countryside, are called...", "Folk culture", "Popular culture|Global trade"], ["Trends that spread widely and change quickly are called...", "Popular culture", "Folk culture|Physical geography"],
       ["Which is most likely folk culture?", "A village harvest dance passed down for centuries", "A new video game craze|A worldwide sneaker brand"], ["Which is most likely popular culture?", "A hit song heard around the world", "A grandmother's family recipe from long ago|A village weaving pattern"],
       ["Popular culture changes...", "Quickly", "Very slowly|Never"], ["Folk culture is usually tied to a...", "Particular place and group", "Whole world at once|Single TV show"],
       ["Globalization can make popular culture in different places more...", "Similar", "Different in every village|Hidden"], ["Why do groups work to protect old crafts and languages?", "They are part of the group's identity", "They never change|They are always cheaper"]])),
    LS("Language families", MC([
      ["Related languages", "🗣️ 🌳", "A <b>language family</b> is a group of languages that came from a common ancestor long ago. The biggest by number of speakers is <b>Indo-European</b>: English, Spanish, French, Russian and Hindi all belong to it."],
      ["Other big families", "🈶", "<b>Sino-Tibetan</b>: Mandarin Chinese. <b>Afro-Asiatic</b>: Arabic and Hebrew. <b>Niger-Congo</b>: Swahili, Yoruba and Zulu. <b>Austronesian</b>: Tagalog, Indonesian and Maori. <b>Dravidian</b>: Tamil and Telugu. <b>Uralic</b>: Finnish and Hungarian."],
      ["Tip", "💡", "Languages in the same family share many similar words and sounds. Spanish and French both come from Latin, so they look alike."]],
      "Think of the part of the world where that language is spoken.", "Languages in the same family share old roots. Think about its neighbors and the region.",
      [["Spanish belongs to which language family?", "Indo-European", "Sino-Tibetan|Afro-Asiatic"], ["Mandarin Chinese belongs to which family?", "Sino-Tibetan", "Indo-European|Austronesian"], ["Arabic belongs to which family?", "Afro-Asiatic", "Niger-Congo|Dravidian"],
       ["Swahili belongs to which family?", "Niger-Congo", "Uralic|Indo-European"], ["Tagalog and Maori belong to which family?", "Austronesian", "Sino-Tibetan|Afro-Asiatic"], ["Hindi belongs to which family?", "Indo-European", "Dravidian|Uralic"],
       ["Finnish and Hungarian belong to which family?", "Uralic", "Indo-European|Niger-Congo"], ["Tamil belongs to which family?", "Dravidian", "Sino-Tibetan|Austronesian"], ["A group of languages from one common ancestor is a language...", "Family", "Border|Hearth"]])),
    LS("Universalizing and ethnic religions", MC([
      ["Two types", "🕊️", "A <b>universalizing</b> religion welcomes people of all places and groups and shares its message widely. Christianity, Islam and Buddhism are universalizing. An <b>ethnic</b> religion is tied to a particular people or place. Hinduism, Judaism and Shinto are ethnic religions."],
      ["Numbers", "🔢", "Christianity has the most followers in the world, and Islam is second. Hinduism is the largest ethnic religion, and most Hindus live in India."],
      ["Sacred places", "🕌 ⛪ 🕍", "<b>Jerusalem</b> is holy to Jews, Christians and Muslims. <b>Mecca</b> in Saudi Arabia is the holiest city of Islam. The <b>Ganges</b> River is sacred to Hindus. <b>Shinto</b> shrines are found across Japan. People of all religions deserve respect."]],
      "Ask: does the religion try to reach everyone, or is it tied to one people or place?", "Universalizing means meant for everyone. Ethnic means tied to one group's homeland.",
      [["A religion that welcomes and spreads to all people is called...", "Universalizing", "Ethnic|Local only"], ["A religion mainly tied to one people or place is called...", "Ethnic", "Universalizing|Global"], ["Which is an ethnic religion?", "Hinduism", "Christianity|Islam"],
       ["Which is a universalizing religion?", "Buddhism", "Shinto|Judaism"], ["Most followers of Hinduism live in...", "India", "Brazil|Egypt"], ["Which religion has the most followers in the world?", "Christianity", "Buddhism|Judaism"],
       ["Shinto is the traditional religion of...", "Japan", "Peru|Norway"], ["A city holy to Jews, Christians and Muslims is...", "Jerusalem", "Mecca|Rome"], ["Mecca, in Saudi Arabia, is the holiest city of...", "Islam", "Hinduism|Shinto"]])),
    LS("Cultural landscape and sense of place", MC([
      ["The mark of people", "🏘️ 🌾", "The <b>cultural landscape</b> is the part of a place that people have built or changed: buildings, farms, roads, signs and monuments. It shows the culture of the people who live there."],
      ["Names and feelings", "📍", "<b>Toponyms</b> are place names. <b>Sense of place</b> is the feelings and memories people have about a place. Houses built from local materials in local styles are called <b>vernacular architecture</b>."],
      ["Look-alike places", "🏬", "When chain stores and look-alike buildings make many places look the same, it is called <b>placelessness</b>."]],
      "Think about what people have built or named, as opposed to what nature made.", "Cultural means made by people. Look for the choice that people created or felt.",
      [["The look of a place shaped by people's culture, like buildings and farms, is the...", "Cultural landscape", "Physical weather|Sense of place"], ["The feelings and memories people have about a place are its...", "Sense of place", "Toponym|Projection"],
       ["Place names are called...", "Toponyms", "Isolines|Cartograms"], ["When many places look the same because of chain stores, it is called...", "Placelessness", "Vernacular architecture|Diffusion"],
       ["Homes built from local materials in local styles show...", "Vernacular architecture", "Placelessness|Sprawl"], ["Which is part of a cultural landscape?", "Farm fields and fences", "A volcano's lava|A glacier's ice"],
       ["Names like Des Moines and Santa Fe sound French and Spanish because...", "Early settlers from those places named them", "Satellites named them|They were chosen by chance"], ["Rice terraces on hillsides are part of the cultural landscape of...", "East and Southeast Asia", "The Arctic|The Sahara"]])),
    LS("Types of boundaries", MC([
      ["Natural lines", "🏞️", "A <b>physical boundary</b> follows a river, mountain range or coast. The Rio Grande is part of the border between the USA and Mexico."],
      ["Drawn lines", "📏", "A <b>geometric boundary</b> is a straight line, such as part of the US-Canada border along the 49th parallel. Other boundaries are named for when they were drawn: <b>antecedent</b> (before people settled), <b>subsequent</b> (after settlement, fitting the cultures), <b>superimposed</b> (drawn by outside powers who ignored local groups), and <b>relic</b> (no longer used, but its marks remain)."],
      ["Why it matters", "🤝", "A boundary that splits a people or their lands can cause disagreements. Good boundaries are agreed by the people who live there."]],
      "Think about whether the line follows nature, or was drawn by people, and when.", "Straight lines are often drawn on a map. Words like 'before' and 'after' tell when a boundary was drawn.",
      [["A boundary that follows a river or a mountain range is a...", "Physical boundary", "Geometric boundary|Relic boundary"], ["A straight-line border, like part of the US-Canada border, is a...", "Geometric boundary", "Physical boundary|Subsequent boundary"],
       ["A boundary drawn after people settled, to fit their cultures, is...", "Subsequent", "Antecedent|Relic"], ["A boundary drawn before an area was settled is...", "Antecedent", "Subsequent|Superimposed"],
       ["A boundary drawn by outside powers who ignored local peoples is...", "Superimposed", "Antecedent|Physical"], ["A boundary that is no longer in use but has left marks is a...", "Relic boundary", "Geometric boundary|Antecedent boundary"],
       ["The border between the USA and Canada west of the Great Lakes mostly follows the...", "49th parallel", "Rio Grande|Equator"], ["The Rio Grande forms part of the border between the USA and...", "Mexico", "Canada|Cuba"]])),
    LS("Sovereignty and devolution", MC([
      ["Who is in charge?", "🏛️", "<b>Sovereignty</b> is a state's right to govern itself without being ruled by others. To <b>secede</b> is to formally leave a country and form a new one."],
      ["Pulling together or apart", "🧲", "<b>Centripetal</b> forces unite a country: a shared language, flag, anthem, or sports teams. <b>Centrifugal</b> forces pull a country apart: deep language, religious or economic divides."],
      ["Sharing power", "🔀", "<b>Devolution</b> is when the central government passes some of its power to regions. Scotland has its own parliament and Wales its own assembly as a result of devolution in the United Kingdom."]],
      "Think about uniting forces and dividing forces, and who holds the power.", "Centri-PETAL pulls toward the center. Centri-FUGAL flees from the center.",
      [["A state's right to govern itself is called...", "Sovereignty", "Devolution|Diffusion"], ["Forces that bring a country together are...", "Centripetal", "Centrifugal|Devolutionary"], ["Forces that pull a country apart are...", "Centrifugal", "Centripetal|Sovereign"],
       ["When a central government gives some power to regions, it is called...", "Devolution", "Secession|Sovereignty"], ["To formally leave a country and form a new one is to...", "Secede", "Devolve|Unite"], ["A shared flag and anthem are examples of...", "Centripetal forces", "Centrifugal forces|Physical boundaries"],
       ["Deep language divides between regions can act as...", "Centrifugal forces", "Centripetal forces|Natural resources"], ["Scotland and Wales have their own parliaments as a result of...", "Devolution", "Secession|Diffusion"]])),
    LS("The farming revolution", MC([
      ["From hunting to farming", "🌾", "For most of history, people were <b>hunter-gatherers</b>. About <b>10,000 years ago</b>, people began <b>domesticating</b> plants and animals: choosing and raising them for human use. This is the <b>Neolithic (Agricultural) Revolution</b>."],
      ["Where crops began", "🗺️", "Wheat and barley began in the <b>Fertile Crescent</b> of Southwest Asia. Rice began in <b>China</b>. Maize (corn) began in <b>Mexico</b>. Potatoes began in the <b>Andes</b> of South America. Sheep and goats were among the first animals tamed."],
      ["Big changes", "🏘️", "Farming made a <b>surplus</b> of food. Not everyone had to grow food, so some people became builders, traders and craftspeople. Villages and cities grew."]],
      "Think about what changed when people stopped moving from place to place to find food.", "Each early crop has a home region. Match the crop to where it was first grown.",
      [["Before farming, people got food by...", "Hunting and gathering", "Using supermarkets|Growing rice only"], ["Farming began about...", "10,000 years ago", "100 years ago|500,000 years ago"], ["Taming wild plants and animals for human use is called...", "Domestication", "Diffusion|Erosion"],
       ["Maize (corn) was first grown in...", "Mexico", "China|Egypt"], ["Potatoes were first grown in the...", "Andes", "Alps|Himalayas"], ["Wheat and barley began in the...", "Fertile Crescent", "Amazon Basin|Great Plains"],
       ["A food surplus allowed some people to...", "Do other jobs, such as crafts", "Stop eating|Live without water"], ["Rice was first grown in...", "China", "Mexico|Peru"]])),
    LS("von Thunen's farm rings", MC([
      ["A model", "⭕", "A German farmer named <b>von Thunen</b> made a model of how farmland is used around a market town. He pictured a flat plain with the town in the center."],
      ["The rings", "🥛 🌲 🌾 🐄", "Closest to town: <b>dairy and vegetables</b>, which spoil quickly and cost a lot to move. Next: <b>forest</b> for firewood. Next: <b>grain crops</b>. Farthest: <b>ranching</b>, because animals can walk to market."],
      ["Why", "💰", "Land near the town costs more, so farmers use it for products that earn the most. Today trucks and refrigeration let food travel far, so the model does not fit exactly, but the idea of transport cost still matters."]],
      "Think about what spoils fast and costs the most to carry to market.", "The town is in the middle. Heavy and quick-to-spoil goods are grown near it.",
      [["In von Thunen's model, what is in the center?", "A market town", "A mountain|A forest"], ["Which land use is closest to the town?", "Dairy and vegetables", "Ranching|Grain crops"], ["Which land use is farthest from the town?", "Ranching", "Dairy|Firewood forest"],
       ["Why are dairy and vegetables grown near the town?", "They spoil quickly and are costly to carry", "They need no water|They are very light and dry"], ["Land near the market town usually costs...", "More", "Less|Nothing"], ["The model pictures the land as...", "Flat and the same everywhere", "Full of mountains|Covered in ice"],
       ["Why does the model fit less well today?", "Trucks and refrigeration let food travel far", "Farms have disappeared|Towns have no markets"], ["Which is nearer the town in the model?", "Grain crops", "Ranching|Open ocean"]])),
    LS("Shapes of settlements", MC([
      ["Three patterns", "🏠", "<b>Clustered</b> (nucleated) settlements have homes close together around a center, like a village with a market square. <b>Dispersed</b> settlements have homes spread far apart, such as farms on their own land. <b>Linear</b> settlements form a line along a road, river or coast."],
      ["Why that shape", "🛣️ 🌊", "People often build in a line along rivers and roads for water and travel. Clustered villages give safety and shared services. Dispersed farms fit large areas where each family needs a big plot."],
      ["Grids", "🔲", "Some towns follow a <b>grid</b> of straight streets that cross at right angles. Many towns in the American Midwest were laid out this way."]],
      "Picture the houses from above. Are they together, spread out, or in a row?", "Close together means clustered. Far apart means dispersed. In a row means linear.",
      [["Homes close together around a center form a...", "Clustered settlement", "Dispersed settlement|Linear settlement"], ["Farmhouses far apart on their own land form a...", "Dispersed settlement", "Clustered settlement|Linear settlement"],
       ["Homes in a long line along a river or road form a...", "Linear settlement", "Dispersed settlement|Clustered settlement"], ["Houses in a line along a road: 🏠🏠🏠🏠🏠. This is a...", "Linear settlement", "Clustered settlement|Dispersed settlement", "🏠🏠🏠🏠🏠"],
       ["A European village around a market square is usually...", "Clustered", "Dispersed|Linear"], ["Large farms in the Midwest often make a settlement pattern that is...", "Dispersed", "Clustered|Linear"],
       ["Why do many settlements form along rivers?", "Water and transport are close by", "Rivers keep away rain|There is no land elsewhere"], ["Streets that cross at right angles make a...", "Grid pattern", "Linear pattern|Delta pattern"]])),
    LS("Central places", MC([
      ["Places that serve others", "🏪 🏥", "A <b>central place</b> is a settlement that sells goods and services to the people around it. Small places offer <b>low-order</b> goods, like bread or groceries, bought often. Larger places offer <b>high-order</b> goods, like hospitals or universities, bought rarely."],
      ["Threshold and range", "📏", "<b>Threshold</b> is the least number of customers a business needs to survive. <b>Range</b> is how far people will travel to buy a good. People travel farther for high-order goods."],
      ["The hierarchy", "🔺", "There are many hamlets and villages, fewer towns, and very few large cities. A bigger place offers more kinds of goods and services and serves a wider area."]],
      "Think about what you buy often nearby and what you travel far to find.", "A rare, expensive service needs many customers, so it is found in fewer, bigger places.",
      [["A bakery or small grocery is a...", "Low-order good or service", "High-order good or service|Natural resource"], ["A specialist hospital or a university is a...", "High-order good or service", "Low-order good or service|Physical landform"],
       ["The least number of customers a business needs is its...", "Threshold", "Range|Boundary"], ["The farthest distance people will travel to buy a good is its...", "Range", "Threshold|Hearth"], ["Which are more numerous?", "Hamlets and villages", "Large cities|Capital cities only"],
       ["A bigger city offers...", "More kinds of goods and services", "Fewer kinds of goods|Only low-order goods"], ["A settlement that sells goods and services to the area around it is a...", "Central place", "Hearth|Enclave"], ["People will travel farther for...", "A high-order service like a hospital", "A loaf of bread|A newspaper"]])),
    LS("How cities are laid out", MC([
      ["Three models", "🏙️", "Geographers use simple pictures called <b>models</b> to describe cities. In the <b>concentric zone</b> model (Burgess, based on Chicago), a city grows in rings around the center. In the <b>sector</b> model (Hoyt), a city grows in wedges along roads and railways. In the <b>multiple nuclei</b> model, a city has several centers."],
      ["CBD", "🏢", "The <b>CBD</b> (central business district) is the busy center with offices, shops and banks. In the concentric model it is in the middle, with other zones in rings around it."],
      ["Real cities", "🗺️", "Real cities are messier than any model. Large cities often have several centers, such as an airport area, a university area and big shopping districts."]],
      "Picture the city map: rings, wedges, or many centers.", "Rings round a middle, wedges like pizza slices, or many separate hubs.",
      [["A city that grows in rings around the center follows the...", "Concentric zone model", "Sector model|Multiple nuclei model"], ["A city that grows in wedges along railways and roads follows the...", "Sector model", "Concentric zone model|Multiple nuclei model"],
       ["A city with several separate centers follows the...", "Multiple nuclei model", "Sector model|Concentric zone model"], ["CBD stands for...", "Central business district", "Coastal border district|Center of basic development"],
       ["The concentric zone model was based on which US city?", "Chicago", "Miami|Denver"], ["In the concentric zone model, the center is the...", "CBD", "Suburb|Farmland"], ["Which model fits a big city with an airport area, a university area and a mall district?", "Multiple nuclei model", "Concentric zone model|None of the models"],
       ["Models of cities are...", "Simple pictures to help us understand", "Exact rules every city follows|Maps of one street"]])),
    LS("Suburbs, sprawl and gentrification", MC([
      ["Growing outward", "🏡 🚗", "<b>Suburbs</b> are homes on the edge of a city, often with people who <b>commute</b> (travel to work in the city). When low-density building spreads over farmland it is called <b>urban sprawl</b>."],
      ["Changing neighborhoods", "🏚️ ➡️ 🏢", "<b>Gentrification</b> happens when wealthier people move into an older, poorer neighborhood and fix up buildings. Prices and rents rise, and some long-time residents may not be able to stay."],
      ["Solutions", "🚆", "Cities fight sprawl with public transit, bike lanes and <b>compact</b> neighborhoods where people can walk to shops and work. Some also help keep housing affordable."]],
      "Think about where the homes are and who is moving where.", "Sprawl spreads out over land. Gentrification is about a neighborhood changing as richer people arrive.",
      [["Homes on the edge of a city, with people traveling into the city for work, are...", "Suburbs", "Enclaves|Hearths"], ["Low-density building spreading over farmland is called...", "Urban sprawl", "Gentrification|Diffusion"],
       ["Wealthier people moving into an older, poorer neighborhood and fixing it up is...", "Gentrification", "Urban sprawl|Commuting"], ["People who travel from their suburb to work in the city are...", "Commuters", "Immigrants|Nomads"], ["One problem with gentrification can be that...", "Rents rise and some long-time residents leave", "Cities lose all roads|Everyone gets richer"],
       ["Which helps reduce sprawl?", "Public transit and compact neighborhoods", "Bigger highways only|Fewer sidewalks"], ["Sprawl often covers...", "Farmland and open land", "Oceans|Glaciers"], ["Walking to shops and work is easier in a...", "Compact neighborhood", "Sprawling suburb|Desert"]])),
    LS("Where factories go", MC([
      ["Raw materials or customers", "🏭", "A factory is usually built where its costs are lowest. If making the product makes it <b>lighter</b> (sugar from sugar cane, metal from ore), the factory goes near the <b>raw materials</b>. If the product gets <b>heavier</b> or spoils (bottled drinks, fresh bread), it goes near the <b>customers</b>."],
      ["Ports and clusters", "🚢", "A <b>break-of-bulk</b> point is where goods move from one kind of transport to another, such as ship to train. Many factories are built there. <b>Agglomeration</b> is when similar businesses cluster together, such as the technology firms of Silicon Valley in California."],
      ["Cheaper labor", "💵", "Clothing and electronics factories often move to places with lower wages. Moving work to another country is called <b>offshoring</b>."]],
      "Ask: is it cheaper to move the ingredients, or the finished product?", "Heavy waste is lost during processing. Fragile or heavy finished goods are hard to ship.",
      [["A sugar factory is usually built near the...", "Sugar cane fields", "Customers' homes|Airport"], ["A bottled-drink factory often locates near its...", "Customers", "Oil wells|Mines"], ["A place where goods move from ship to train is a...", "Break-of-bulk point", "Hearth|Delta"],
       ["Similar businesses clustering together is called...", "Agglomeration", "Devolution|Erosion"], ["Silicon Valley, California, is known for...", "Technology companies", "Rice farms|Coal mines"], ["Why do many clothing factories locate in low-wage countries?", "Labor costs are lower", "Cotton is not available elsewhere|Winters are shorter"],
       ["Moving a business's work to another country is called...", "Offshoring", "Agglomeration|Sprawl"], ["Why are metal-processing plants often near the mine?", "The ore loses a lot of weight in processing", "Metal is very light|Mines have no roads"]])),
    LS("Natural increase", NATINC),
    LS("Physiological density", PHYSD),
    LS("Net migration", NETMIG),
    LS("Formal, functional and vernacular regions", MC([
      ["Three kinds of regions", "🗺️", "A <b>formal</b> region shares one trait everywhere, like a language, climate or government. A <b>functional</b> region is organized around a center that connects it, like a city's bus system. A <b>vernacular</b> region is based on what people feel and call it."],
      ["Examples", "📍", "Formal: the area where Spanish is the main language. Functional: the area a newspaper is delivered to. Vernacular: 'the Midwest' or 'the Sun Belt', whose edges people argue about."],
      ["Tip", "💡", "Formal means a shared trait. Functional means connected by flows to a center. Vernacular means people's ideas and feelings."]],
      "Ask: is it one shared trait, a center with connections, or a popular name?", "Think of the three words: shared, connected, felt.",
      [["A region with one shared trait, like a language, is a...", "Formal region", "Functional region|Vernacular region"], ["A region organized around a center and its connections is a...", "Functional region", "Formal region|Vernacular region"],
       ["A region based on what people feel and call it is a...", "Vernacular region", "Formal region|Functional region"], ["A newspaper's delivery area is a...", "Functional region", "Formal region|Vernacular region"], ["The area where Spanish is the main language is a...", "Formal region", "Functional region|Vernacular region"],
       ["The area served by an airport hub is a...", "Functional region", "Formal region|Vernacular region"], ["'The Sun Belt' is an example of a...", "Vernacular region", "Formal region|Functional region"], ["People can disagree about the edges of a...", "Vernacular region", "Formal region|Country"]]))
  ];
  l19.push(LS("Mixed practice", MX(l19, [0, 1, 2, 3, 5, 7, 8, 9, 10, 11, 12, 17])));
  l19.push(LS("Level 19 Challenge", MX(l19, [4, 6, 13, 14, 15, 16, 0, 2, 3, 5, 8, 9, 10, 11, 12, 17])));

  // ---------- level 20 : GIS, remote sensing and map skills ----------
  const BACKB = NUM([
    ["Bearings", "🧭", "A <b>bearing</b> is a direction given as an angle from north, measured clockwise from 0 to 360 degrees. East is 90, south is 180, west is 270."],
    ["Back bearing", "↩️", "A <b>back bearing</b> is the direction for going back the way you came. It points the opposite way, which is 180 degrees different."],
    ["How to find it", "🧮", "If the bearing is less than 180, <b>add 180</b>. If it is 180 or more, <b>subtract 180</b>. Example: forward 70 degrees, back 70 + 180 = 250 degrees."]
  ], () => {
    const b = 5 * ri(0, 71), back = b < 180 ? b + 180 : b - 180, eb = b < 180 ? 5 * ri(37, 71) : 5 * ri(0, 35), eback = eb < 180 ? eb + 180 : eb - 180;
    const op = eb < 180 ? "add" : "subtract", ec = eb < 180 ? "+" : "-";
    if (Math.random() < 0.6) return {
      text: `You walk on a bearing of ${b} degrees. What is the back bearing to return to your start?`, answer: back,
      hints: ["The way back points exactly the opposite way.", `The opposite way is 180 degrees away. If your bearing is ${b < 180 ? "less than" : "180 or more than"} 180, you ${b < 180 ? "add" : "subtract"} 180.`, `Example: a bearing of ${eb} degrees, so ${op} 180: ${eb} ${ec} 180 = ${eback}. Now do yours.`]
    };
    return {
      text: `A ship sails on a bearing of ${b} degrees from port A to port B. On what bearing does it sail from port B back to port A?`, answer: back,
      hints: ["The trip back goes the opposite way.", "A half-turn is 180 degrees. Add it if the bearing is under 180, subtract it if it is 180 or more.", `Example: a bearing of ${eb} degrees gives ${eb} ${ec} 180 = ${eback}. Now do yours.`]
    };
  });

  const PIXEL = NUM([
    ["Pixels", "🔲", "A satellite image is a grid of tiny squares called <b>pixels</b>. Each pixel covers a square of ground. A <b>30 m pixel</b> covers 30 m by 30 m."],
    ["Area of a pixel", "🧮", "Pixel area = side x side. A 30 m pixel covers 30 x 30 = 900 square meters. Smaller pixels show more detail but mean more pixels to store."],
    ["Counting pixels", "📝", "A square 200 m on each side with 10 m pixels needs 200 ÷ 10 = 20 pixels along each side, and 20 x 20 = 400 pixels in all."]
  ], () => {
    const m = Math.random(), s = pick([10, 20, 30, 50, 100]), n = ri(3, 9), e = s === 10 ? 20 : 10;
    if (m < 0.35) return {
      text: `Each pixel of an image covers a square ${s} meters on each side. How many square meters does one pixel cover?`, answer: s * s,
      hints: ["A pixel is a small square of ground.", "Multiply the side length by itself.", `Example: a ${e} m pixel covers ${e} x ${e} = ${e * e} square meters. Now do yours.`]
    };
    if (m < 0.7) return {
      text: `A square area of ground is ${s * n} meters on each side. How many pixels of ${s} m are needed to cover it?`, answer: n * n,
      hints: ["First count the pixels along one side, then think of the whole square.", "Divide the side length by the pixel size, then multiply the result by itself.", `Example: a ${e * 4} m square with ${e} m pixels needs 4 along each side, and 4 x 4 = 16 pixels. Now do yours.`]
    };
    const L = pick([1, 2, 3, 6]), p = pick([10, 20, 50, 100]);
    return {
      text: `A strip of land is ${L} km wide. How many pixels of ${p} m fit across it? (1 km = 1,000 m)`, answer: L * 1000 / p,
      hints: ["Change kilometers into meters first.", "Divide the width in meters by the pixel size in meters.", "Example: 2 km is 2,000 m. With 40 m pixels, 2,000 ÷ 40 = 50 pixels. Now do yours."]
    };
  });

  const LIGHT = NUM([
    ["How GPS measures distance", "📡", "A GPS satellite sends a radio signal with the time it was sent. Radio waves travel at the speed of light, about <b>300,000 km every second</b>, which is 300 km every <b>millisecond</b> (a thousandth of a second)."],
    ["Time to distance", "🧮", "<b>Distance = 300 km x the milliseconds</b>. A signal that takes 10 milliseconds has traveled 3,000 km."],
    ["Locating you", "📍", "Your receiver finds its distance from several satellites. Where those distances meet shows where you are. This is called <b>trilateration</b>, and it needs signals from at least 4 satellites."]
  ], () => {
    const ms = pick([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    if (Math.random() < 0.55) return {
      text: `A radio signal takes ${ms} milliseconds to reach a receiver. About how many kilometers did it travel? (Radio waves go 300 km every millisecond.)`, answer: ms * 300,
      hints: ["The signal goes 300 km each millisecond.", "Multiply the number of milliseconds by 300.", "Example: 15 milliseconds x 300 = 4,500 km. Now do yours."]
    };
    return {
      text: `A satellite is ${fmt(ms * 300)} km from a receiver. How many milliseconds does its radio signal take to arrive? (Radio waves go 300 km every millisecond.)`, answer: ms,
      hints: ["Work backwards. Each millisecond covers 300 km.", "Divide the distance by 300.", "Example: 4,500 km ÷ 300 = 15 milliseconds. Now do yours."]
    };
  });

  const DOTMAP = NUM([
    ["Dot maps", "⚫", "On a <b>dot map</b>, each dot stands for a set number of things, like 1,000 people. Dots bunch up where there are many people and are spread out where there are few."],
    ["Using the key", "🔑", "Always read the key first. If one dot = 500 people and you count 6 dots, that area has 6 x 500 = 3,000 people."],
    ["Good and bad", "⚖️", "Dot maps show where things are and how dense they are. But a dot's exact spot is only a guess inside the area."]
  ], () => {
    const N = pick([100, 500, 1000, 2000, 5000]), D = ri(3, 40), m = Math.random(), D2 = ri(1, D - 1), eN = N === 500 ? 200 : 500;
    if (m < 0.4) return {
      text: `On a dot map, one dot stands for ${fmt(N)} people. A county has ${D} dots. How many people live in the county?`, answer: N * D,
      hints: ["Each dot is a fixed number of people.", "Multiply the number of dots by the value of one dot.", `Example: one dot is ${fmt(eN)} people and there are 7 dots. 7 x ${fmt(eN)} = ${fmt(7 * eN)}. Now do yours.`]
    };
    if (m < 0.7) return {
      text: `One dot stands for ${fmt(N)} people. A town has ${fmt(N * D)} people. How many dots should be drawn for it?`, answer: D,
      hints: ["Work backwards from the people to the dots.", "Divide the number of people by the value of one dot.", `Example: one dot is ${fmt(eN)} people, and a town has ${fmt(9 * eN)}. ${fmt(9 * eN)} ÷ ${fmt(eN)} = 9 dots. Now do yours.`]
    };
    return {
      text: `One dot stands for ${fmt(N)} people. Region A has ${D} dots and region B has ${D2} dots. How many more people live in region A than in region B?`, answer: N * (D - D2),
      hints: ["Find the difference in dots first.", "Subtract the dots, then multiply by the value of one dot.", `Example: one dot is ${fmt(eN)}, region A has 9 dots and region B has 4. 9 - 4 = 5 dots, and 5 x ${fmt(eN)} = ${fmt(5 * eN)} people. Now do yours.`]
    };
  });

  const UTM = NUM([
    ["Map grids", "🌐", "Many maps and GPS devices use the <b>UTM</b> grid. It cuts the Earth into <b>60 zones</b>, each <b>6 degrees</b> of longitude wide, numbered from 1 to 60 going east from 180 degrees west."],
    ["Finding a zone", "🧮", "<b>Zone = (longitude + 180) ÷ 6, rounded up.</b> For west longitudes, count the longitude as negative. Example: 87 degrees west is -87. -87 + 180 = 93, and 93 ÷ 6 = 15.5, rounded up is zone 16."],
    ["Check", "💡", "Zone 1 starts at 180 degrees west. Zone 31 starts at 0 degrees (the Prime Meridian) and goes to 6 degrees east."]
  ], () => {
    const z = ri(1, 60), lon = 6 * z - 183, ez = pick([5, 12, 20, 33, 47].filter(x => x !== z)), el = 6 * ez - 183;
    if (Math.random() < 0.8) return {
      text: `A place is at ${Math.abs(lon)} degrees ${lon < 0 ? "west" : "east"}. Which UTM zone is it in? (Zone = (longitude + 180) ÷ 6, rounded up. Count west as negative.)`, answer: z,
      hints: ["First add 180 to the longitude. Remember west is negative.", "Divide the result by 6 and round up to the next whole number.", `Example: ${Math.abs(el)} degrees ${el < 0 ? "west" : "east"}. (${el} + 180) ÷ 6 = ${(el + 180) / 6}, rounded up is zone ${ez}. Now do yours.`]
    };
    const k = ri(2, 12);
    return {
      text: `A strip of the world is ${6 * k} degrees of longitude wide. How many full UTM zones fit across it?`, answer: k,
      hints: ["Each zone has the same width.", "Divide the width in degrees by the width of one zone.", "Example: a strip 30 degrees wide holds 30 ÷ 6 = 5 zones. Now do yours."]
    };
  });

  const l20 = [
    LS("What is a GIS?", MC([
      ["Maps in layers", "🗂️ 🗺️", "A <b>GIS</b> (geographic information system) is computer software that stores, shows and analyzes data about places. It keeps data in <b>layers</b>, like clear sheets stacked on top of each other: roads, rivers, buildings, schools, land use."],
      ["Using layers", "🔍", "Turn layers on and off, or stack them to answer questions. Which homes are close to a river? Where should a new fire station go?"],
      ["Who uses GIS", "👷", "City planners, farmers, scientists, emergency workers and delivery companies all use GIS. Every layer is lined up using the same coordinates."]],
      "Think about maps that are made of several layers of data.", "Layers are stacked in the same place. Each layer holds one kind of information.",
      [["GIS stands for...", "Geographic information system", "General island survey|Global internet service"], ["In a GIS, data is stored in...", "Layers", "Folders of photos only|One flat drawing"], ["Stacking a roads layer and a rivers layer lets you...", "See where roads cross rivers", "Make rain|Change the weather"],
       ["Who might use a GIS?", "A city planner choosing where to build a fire station", "Only astronauts|Nobody"], ["Why must layers use the same coordinates?", "So they line up on the same places", "So they use less color|So they are heavier"], ["A GIS can...", "Store, show and analyze data about places", "Only print posters|Only store music"],
       ["A GIS layer showing schools is a layer of...", "Locations of schools", "Weather|Sounds"], ["A farmer could use GIS to...", "Study soil and crop layers for each field", "Predict the lottery|Move mountains"]])),
    LS("Remote sensing", MC([
      ["Looking from far away", "🛰️", "<b>Remote sensing</b> means collecting information about the Earth from a distance, using satellites, airplanes or drones. It lets us see forests, crops, storms and cities from above."],
      ["Passive and active", "☀️ 📡", "<b>Passive</b> sensors measure sunlight that is reflected or given off by the ground. They cannot see through thick clouds or in the dark. <b>Active</b> sensors, like <b>radar</b> and <b>lidar</b>, send out their own signal and measure what bounces back. Radar can see through clouds."],
      ["Uses", "🌲 🌪️", "Remote sensing tracks deforestation, floods, crop health and hurricanes. Scientists compare pictures over many years to see change."]],
      "Think about whether the sensor uses sunlight or sends its own signal.", "Passive waits for light that is already there. Active sends and listens.",
      [["Collecting information about Earth from far away is called...", "Remote sensing", "Surveying on foot|Mapping by hand"], ["A sensor that measures reflected sunlight is...", "Passive", "Active|Underground"], ["A sensor that sends out its own signal is...", "Active", "Passive|Solar"],
       ["Radar is helpful because it can...", "See through clouds", "Taste food|Hear music"], ["Which can be a remote sensing platform?", "A satellite", "A paintbrush|A compass"], ["Comparing images from different years shows...", "How a place has changed", "Nothing at all|The temperature on Mars"],
       ["Remote sensing can be used to track...", "Deforestation and floods", "Only school grades|Only recipes"], ["Why can't a passive optical sensor see well at night?", "There is no sunlight to reflect", "The Earth disappears|Clouds are gone"]])),
    LS("How GPS works", MC([
      ["Satellites overhead", "🛰️ 📍", "The <b>Global Positioning System (GPS)</b> is a network of satellites circling about 20,000 km above Earth. The USA owns GPS. Other systems include <b>Galileo</b> (Europe), <b>GLONASS</b> (Russia) and <b>BeiDou</b> (China)."],
      ["Finding you", "⏱️", "Each satellite sends a signal with the time. Your receiver measures how long it took to arrive, and works out the distance. With signals from at least <b>4 satellites</b> it finds your position and height."],
      ["Good to know", "💡", "GPS only <b>receives</b> signals. It does not send your location to the satellites. Buildings and thick trees can weaken the signal."]],
      "Think about satellites sending time signals to a receiver.", "More satellites make a more exact position. Think of the smallest number needed.",
      [["How many satellites does a GPS receiver need to find its position and height?", "At least 4", "Just 1|Exactly 100"], ["GPS satellites travel...", "In orbit around Earth", "Under the ocean|On highways"], ["The GPS receiver works out distance by measuring...", "How long the signal takes", "How loud the signal is|The color of the satellite"],
       ["Which country owns the GPS system?", "The USA", "Brazil|Egypt"], ["Galileo is the navigation system of...", "Europe", "Russia|China"], ["BeiDou is the navigation system of...", "China", "Europe|Japan"], ["GPS satellites orbit about how far above Earth?", "About 20,000 km", "About 20 km|About 2 million km"],
       ["What can weaken a GPS signal?", "Tall buildings and thick trees", "Moonlight|A map key"]])),
    LS("Map projections", MC([
      ["Flattening the globe", "🌍 ➡️ 🗺️", "A globe is round, but a map is flat. A <b>projection</b> is a way of flattening the Earth onto paper. Every projection <b>distorts</b> something: shape, area, distance or direction."],
      ["Famous kinds", "📐", "The <b>Mercator</b> projection keeps angles and shapes right, so it is good for sailing. But it stretches places near the poles: Greenland looks as big as Africa, though Africa is about 14 times bigger. <b>Equal-area</b> projections show sizes correctly but bend shapes. The <b>Robinson</b> projection is a compromise."],
      ["Choosing", "🎯", "Choose the projection that fits the job: Mercator for navigation, an equal-area map to compare sizes. No flat map is perfect."]],
      "Think about what stays true and what gets stretched.", "Flattening a ball always stretches something. Poles are usually the biggest problem.",
      [["Flattening the Earth onto a flat map is called a...", "Projection", "Legend|Compass rose"], ["Which projection is good for sailing because it keeps angles right?", "Mercator", "Robinson|Equal-area"], ["On a Mercator map, places near the poles look...", "Much bigger than they really are", "Much smaller than they really are|Exactly the right size"],
       ["Which kind of map shows the sizes of countries correctly?", "Equal-area projection", "Mercator projection|A sketch from memory"], ["The Robinson projection is a...", "Compromise that reduces all kinds of distortion a little", "Perfect map of everything|Map with no shape at all"], ["Every flat map...", "Distorts something", "Is perfectly accurate|Shows only oceans"],
       ["On a Mercator map, Greenland looks as large as Africa, but Africa is really about...", "14 times bigger", "The same size|Twice as small"], ["To compare the true sizes of countries you should use...", "An equal-area map", "A Mercator map|A road map"]])),
    LS("Vector and raster data", MC([
      ["Two ways to store a map", "🔷 🔲", "A GIS stores data in two main ways. <b>Vector</b> data uses <b>points</b> (a city), <b>lines</b> (a road or river) and <b>polygons</b> (a country, lake or park). <b>Raster</b> data is a <b>grid of cells</b> (pixels), each holding a value."],
      ["When to use each", "🧰", "Use vector for things with clear edges, like roads, borders and buildings. Use raster for things that vary smoothly or come from images, like satellite photos, elevation and temperature."],
      ["Resolution", "🔍", "The <b>resolution</b> of a raster is the size of its cells. Smaller cells show more detail but take more space."]],
      "Think about whether the data is shapes or a grid of cells.", "Points, lines and polygons are vector. A grid of squares is raster.",
      [["A road is best stored as a vector...", "Line", "Cell|Point of rain"], ["A lake is best stored as a vector...", "Polygon", "Point|Cell"], ["A city shown as a single dot is a vector...", "Point", "Line|Raster"],
       ["A satellite photo is stored as...", "Raster data", "Vector data|Text only"], ["A grid of cells that each hold a value is...", "Raster data", "Vector data|A legend"], ["Smaller raster cells give...", "Higher resolution and more detail", "Lower resolution|Less accurate colors"],
       ["Elevation data covering a whole area is often...", "Raster", "Vector point only|A compass"], ["Country borders are usually stored as...", "Vector polygons", "Raster pixels|Sounds"]])),
    LS("Kinds of thematic maps", MC([
      ["Maps about a theme", "🎨", "A <b>thematic map</b> shows one topic, such as population or rainfall. A <b>choropleth</b> map shades areas (like states or countries) with darker colors for higher values. A <b>dot map</b> uses dots, each standing for a number."],
      ["More types", "⭕ 🔢", "A <b>proportional symbol</b> map uses bigger circles for bigger values. A <b>cartogram</b> changes the size of each area to show its value, so a country with many people looks huge. An <b>isoline</b> map joins places with equal values."],
      ["Choosing", "🎯", "Choose the map type that fits the data. Choropleth maps are best for rates and percents, because they show ratios and not totals."]],
      "Think about how the map shows its values: shading, dots, circles, stretched areas or lines.", "Choro- is about shaded regions. Cartogram is about stretched sizes.",
      [["A map where states are shaded darker for higher values is a...", "Choropleth map", "Cartogram|Dot map"], ["A map where each dot stands for a number of people is a...", "Dot map", "Choropleth map|Isoline map"], ["A map using bigger circles for bigger cities is a...", "Proportional symbol map", "Choropleth map|Isoline map"],
       ["A map that changes the size of each country to show its population is a...", "Cartogram", "Dot map|Political map"], ["A map that joins places with equal values with lines is an...", "Isoline map", "Cartogram|Dot map"], ["A map that shows one topic, like rainfall, is a...", "Thematic map", "Street map|Globe"],
       ["On a population cartogram, a country with many people looks...", "Bigger", "Smaller|The same"], ["Choropleth maps work best for...", "Rates and percents", "Exact street addresses|Photographs"]])),
    LS("Reading maps with care", MC([
      ["Who made it?", "🧐", "Every map is made by someone for a reason. Ask: <b>Who made it? Why? When? What is left out?</b> Always check the title, legend, scale, source and date."],
      ["Choices change the story", "🎚️", "A mapmaker chooses the colors, the data groups (class breaks), the projection and the title. Different choices can make the same data look calm or alarming. Red often feels dangerous, and blue calm."],
      ["Be a smart reader", "💡", "Compare a map with other sources. Look for a date: old maps can be out of date. Check what area and which years the data cover."]],
      "Ask who made the map, why, and when.", "A fair map tells its source and date, and explains its colors and groups.",
      [["Which is a good question to ask about a map?", "Who made it, and why?", "What does it smell like?|How heavy is it?"], ["Why should you check the date of a map?", "The information may be out of date", "Dates change colors|Old maps are always best"],
       ["Where do you find out what colors mean?", "The legend", "The compass rose|The scale bar"], ["Different class breaks can...", "Make the same data look different", "Change the real world|Delete the data"], ["Which color often makes a map feel alarming?", "Red", "Soft blue|Pale green"],
       ["What should a map always show to tell you its data came from?", "The source", "A joke|A cartoon"], ["If a map has no title or source, you should...", "Be careful and look for other sources", "Trust it completely|Ignore the whole world"], ["Two maps of the same data can look different because of...", "The mapmaker's choices", "Magic|The weather today"]])),
    LS("Patterns and relationships", MC([
      ["Patterns in space", "🔵", "Geographers study how things are spread out. A pattern can be <b>clustered</b> (bunched together), <b>dispersed or uniform</b> (evenly spread out), or <b>random</b> (no clear pattern)."],
      ["Spatial association", "🔗", "If two maps show similar patterns, there may be a relationship. For example, places with more rain often have more green plants. This is called <b>spatial association</b> or correlation."],
      ["Careful!", "⚠️", "Two things that happen in the same places are not always connected. <b>Correlation does not prove causation</b>: one thing did not necessarily cause the other."]],
      "Think about whether the points are bunched, even, or scattered.", "Clustered means close. Dispersed means evenly apart. Random has no rule.",
      [["Points bunched together on a map show a...", "Clustered pattern", "Uniform pattern|Random pattern"], ["Points spaced about evenly apart show a...", "Uniform (dispersed) pattern", "Clustered pattern|Cluster of towns"], ["Points with no clear order show a...", "Random pattern", "Uniform pattern|Clustered pattern"],
       ["Two maps with similar patterns may show...", "A spatial association", "A projection|A legend"], ["Correlation does not prove...", "Causation", "That maps exist|Which way is north"], ["Places with more rain often have more...", "Green plants", "Deserts|Glaciers"],
       ["A hotspot on a map is an area where values are...", "Unusually high in a cluster", "Zero|Always the same"], ["If ice cream sales and sunburns both rise in summer, it shows...", "Correlation, not proof that one causes the other", "Ice cream causes sunburn|Sunburns cause ice cream"]])),
    LS("Scale of analysis", MC([
      ["Zooming in and out", "🔭", "The <b>scale of analysis</b> is how large an area you study: <b>local</b> (a neighborhood), <b>regional</b>, <b>national</b> or <b>global</b>. The pattern you see can change with the scale."],
      ["Example", "🏘️ 🌍", "At a global scale, one country may look dry. At a local scale, you may find green farms by a river. Looking at only one scale can hide important details."],
      ["Choosing", "🎯", "To plan a bus route, use a local scale. To study climate change, use a global scale. Good geographers check several scales."]],
      "Think about how big an area the question covers.", "Local is small, global is the whole Earth. Pick the size that fits the question.",
      [["The size of the area you study is called the...", "Scale of analysis", "Map key|Latitude"], ["Studying one neighborhood is a...", "Local scale", "Global scale|Regional scale"], ["Studying the whole Earth is a...", "Global scale", "Local scale|National scale"],
       ["To plan a school bus route, which scale fits best?", "Local scale", "Global scale|Space scale"], ["To study climate change on Earth, which scale fits best?", "Global scale", "Local scale|House scale"], ["A pattern that appears at one scale...", "May look different at another scale", "Always stays the same|Disappears forever"],
       ["Studying a country is a...", "National scale", "Local scale|Global scale"], ["Good geographers...", "Check more than one scale", "Only use one scale|Never use maps"]])),
    LS("Back bearings", BACKB),
    LS("Pixels and resolution", PIXEL),
    LS("GPS signal timing", LIGHT),
    LS("Reading dot maps", DOTMAP),
    LS("UTM zones", UTM),
    LS("Spatial analysis tools", MC([
      ["Asking questions of a map", "🧰", "A GIS can do more than show data. A <b>buffer</b> draws a zone around a feature, such as 500 m around a school. An <b>overlay</b> stacks layers to find places that meet several conditions. A <b>query</b> asks the data a question, like 'find all lakes over 10 km long'."],
      ["More tools", "🛣️ 📮", "<b>Network analysis</b> finds the best route along roads. <b>Geocoding</b> turns an address into coordinates so it can be placed on a map."],
      ["Example", "📝", "To find a good place for a new park: overlay a layer of empty land with a layer of homes with no park nearby, then buffer the result by walking distance."]],
      "Think about which tool draws zones, which stacks layers, which asks questions, and which finds routes.", "A buffer is like a ring around something. An overlay is layers on top of each other.",
      [["Drawing a zone 500 meters around a school is a...", "Buffer", "Overlay|Geocode"], ["Stacking two layers to find where both conditions are true is an...", "Overlay", "Buffer|Query"], ["Asking the data 'find all lakes over 10 km long' is a...", "Query", "Buffer|Projection"],
       ["Finding the best route along roads is...", "Network analysis", "Geocoding|Buffering"], ["Turning an address into coordinates is...", "Geocoding", "Overlay|Network analysis"], ["To find land that is both flat and near a river you could use...", "An overlay of two layers", "A weather balloon|A time zone"],
       ["A buffer around a river is useful to find...", "Homes within a set distance of the river", "The speed of the wind|The color of the sea"], ["A delivery company wants the fastest route. It uses...", "Network analysis", "Dot map|Projection"]])),
    LS("Reading satellite images", MC([
      ["Colors from space", "🛰️ 🎨", "A <b>true-color</b> image looks like what your eyes would see. A <b>false-color</b> image uses colors from light we cannot see, like infrared, to show more. In many false-color images, healthy plants look <b>bright red</b>."],
      ["Greenness", "🌱", "<b>NDVI</b> is a measure of how green and healthy plants are. Healthy leaves reflect a lot of near-infrared light. Scientists use it to watch crops and drought."],
      ["Detail and time", "⏱️", "<b>Spatial resolution</b> is the size of the pixels (small pixels show small things). <b>Temporal resolution</b> is how often a satellite passes over the same place. The <b>Landsat</b> program has taken pictures of Earth since 1972, with 30 m pixels."]],
      "Think about whether the image uses ordinary colors or special ones, and what each pixel size shows.", "False color uses light we cannot see. Resolution can be about size or about time.",
      [["An image that looks like what your eyes would see is...", "True color", "False color|Radar only"], ["In many false-color images, healthy plants look...", "Bright red", "Pure black|Blue like water"], ["NDVI measures how...", "Green and healthy plants are", "Hot the ocean is|Loud a city is"],
       ["The size of the pixels in an image is its...", "Spatial resolution", "Temporal resolution|Legend"], ["How often a satellite passes over the same place is its...", "Temporal resolution", "Spatial resolution|Compass"], ["The Landsat program has been taking pictures of Earth since...", "1972", "1872|2012"],
       ["Why use false-color images?", "They show things we cannot see with our eyes", "They are more colorful for fun only|They erase clouds"], ["Smaller pixels let you see...", "Smaller things on the ground", "Larger things only|Nothing"]])),
    LS("Where map data comes from", MC([
      ["Sources", "📊", "Map data comes from many places: <b>censuses</b> (a count of people, in the USA every 10 years), <b>surveys</b>, <b>satellites</b> and sensors, <b>GPS</b> tracks, and data collected by volunteers (<b>crowdsourced</b> or volunteered geographic information)."],
      ["Metadata", "🏷️", "<b>Metadata</b> is data about the data: who collected it, when, how, and how accurate it is. Good maps list their metadata."],
      ["Quality", "✅", "Data should be <b>accurate</b> (close to the truth), <b>current</b> (up to date) and <b>complete</b> (nothing important missing). Old or missing data can lead to wrong answers."]],
      "Think about who collected the data and when.", "A census counts people. Metadata is the label that describes the data.",
      [["A count of all the people in a country is a...", "Census", "Projection|Legend"], ["In the USA, the census takes place every...", "10 years", "1 year|100 years"], ["Data about the data (who made it, when) is called...", "Metadata", "Pixel data|Raster"],
       ["Maps made from data collected by volunteers are called...", "Crowdsourced maps", "Secret maps|Mercator maps"], ["Data that is up to date is...", "Current", "Complete|Uniform"], ["Data that is close to the truth is...", "Accurate", "Cartographic|Dispersed"],
       ["Which is a source of map data?", "Satellites", "Fortune cookies|Dreams"], ["Why can old data cause wrong answers?", "The world has changed since it was collected", "Old data is always perfect|Numbers get lighter"]])),
    LS("Fieldwork and sampling", MC([
      ["Going out to measure", "📋 🥾", "<b>Fieldwork</b> means collecting data in the real place: counting, measuring, interviewing and taking photos. Geographers cannot measure everything, so they take a <b>sample</b>."],
      ["Kinds of sampling", "🎲", "<b>Random</b> sampling gives every spot an equal chance. <b>Systematic</b> sampling takes samples at regular steps, like every 10 meters. <b>Stratified</b> sampling samples each group in a fair share. A <b>transect</b> is a line along which you take samples, and a <b>quadrat</b> is a square frame used to count plants."],
      ["Staying safe", "🦺", "Plan ahead, work with an adult or team, ask permission, respect nature and people, and record your data carefully."]],
      "Think about how the samples are chosen: by chance, by steps, by groups, or along a line.", "Random uses chance, systematic uses a pattern of steps.",
      [["Collecting data in the real place is called...", "Fieldwork", "Remote sensing|Geocoding"], ["Choosing sample spots by chance, with equal chances for all, is...", "Random sampling", "Systematic sampling|Stratified sampling"], ["Sampling every 10 meters along a path is...", "Systematic sampling", "Random sampling|Stratified sampling"],
       ["A line along which you take samples is a...", "Transect", "Quadrat|Buffer"], ["A square frame used to count plants is a...", "Quadrat", "Transect|Compass"], ["Sampling each group in a fair share is...", "Stratified sampling", "Random sampling|Systematic sampling"],
       ["Why do geographers use samples?", "They cannot measure everything", "Samples are always bigger|They dislike counting"], ["A safe fieldwork habit is to...", "Work with an adult or team", "Go alone at night|Ignore the rules"]]))
  ];
  l20.push(LS("Mixed practice", MX(l20, [0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16, 17])));
  l20.push(LS("Level 20 Challenge", MX(l20, [9, 10, 11, 12, 13, 0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16, 17])));

  // ---------- level 21 : regional geography in depth ----------
  const REGTOT = NUM([
    ["Comparing a region", "📊", "To understand a region, geographers add up and compare its countries. The <b>total</b> is all the numbers added together. The <b>range</b> is the biggest minus the smallest. The <b>average</b> is the total divided by how many countries."],
    ["Example", "📝", "Populations of 3 countries: 10, 20 and 30 million. Total = 60 million. Range = 30 - 10 = 20 million. Average = 60 ÷ 3 = 20 million."],
    ["Tip", "💡", "Write the numbers in a list first. Find the biggest and smallest, then add everything."]
  ], () => {
    const a = ri(5, 40), b = ri(5, 40), c = ri(5, 40);
    let d = ri(5, 40); while ((a + b + c + d) % 4) d++;
    const arr = [a, b, c, d], tot = a + b + c + d, m = Math.random();
    const list = arr.map((x, i) => `Country ${"ABCD"[i]}: ${x} million`).join(", ");
    if (m < 0.35) return {
      text: `A region has four countries. ${list}. What is the region's total population, in millions?`, answer: tot,
      hints: ["The total means all four numbers together.", "Add the four populations.", "Example: 12, 8, 15 and 5 million. 12 + 8 + 15 + 5 = 40 million. Now do yours."]
    };
    if (m < 0.7) return {
      text: `A region has four countries. ${list}. What is the difference between the biggest and the smallest population, in millions?`, answer: Math.max(...arr) - Math.min(...arr),
      hints: ["The difference between the biggest and the smallest is called the range.", "Find the biggest and the smallest, then subtract the smaller from the bigger.", "Example: 12, 8, 15 and 5 million. 15 - 5 = 10 million. Now do yours."]
    };
    return {
      text: `A region has four countries. ${list}. What is the average population of a country in this region, in millions?`, answer: tot / 4,
      hints: ["The average shares the total equally between the countries.", "Add all four numbers, then divide by 4.", "Example: 12, 8, 15 and 5 million add to 40. 40 ÷ 4 = 10 million. Now do yours."]
    };
  });

  const l21 = [
    LS("Sub-Saharan Africa: land", MC([
      ["South of the Sahara", "🌍", "<b>Sub-Saharan Africa</b> is the part of Africa south of the Sahara. The <b>Sahel</b> is a dry belt just south of the desert. Farther south are grassy <b>savannas</b> with lions, elephants and zebras, and the <b>Congo Basin</b>, home to the second-largest rainforest in the world."],
      ["Highlands and rifts", "🏔️", "The <b>Great Rift Valley</b> runs through East Africa, with long deep lakes. <b>Kilimanjaro</b> in Tanzania, at 5,895 m, is the highest mountain in Africa. <b>Lake Victoria</b> is the largest lake in Africa by area."],
      ["Deserts and falls", "💦", "The <b>Kalahari</b> and the <b>Namib</b> are dry lands in the southwest. <b>Victoria Falls</b>, on the Zambezi River between Zambia and Zimbabwe, is one of the world's largest waterfalls. The <b>Horn of Africa</b> is the pointed region in the east that includes Somalia and Ethiopia."]],
      "Think about the region of Africa south of the great desert, and the feature's name.", "Match each feature to its type: dry belt, grassy plain, rainforest basin, rift, or lake.",
      [["The dry belt just south of the Sahara is the...", "Sahel", "Congo Basin|Kalahari"], ["The second-largest rainforest in the world is in the...", "Congo Basin", "Sahel|Horn of Africa"], ["The highest mountain in Africa is...", "Kilimanjaro", "Mount Kenya|Table Mountain"],
       ["Kilimanjaro is in which country?", "Tanzania", "Nigeria|Namibia"], ["The largest lake in Africa by area is...", "Lake Victoria", "Lake Chad|Lake Nasser"], ["Victoria Falls is on the...", "Zambezi River", "Niger River|Orange River"],
       ["Which dry land is in southwestern Africa?", "Namib", "Congo|Sahel"], ["The pointed region in the east that includes Somalia is the...", "Horn of Africa", "Cape of Good Hope|Rift Basin"], ["Grassy plains with lions and zebras are called...", "Savannas", "Tundra|Taiga"]])),
    LS("Sub-Saharan Africa: people and work", MC([
      ["Big countries", "👥", "<b>Nigeria</b> has the most people of any African country, over 200 million. <b>Ethiopia</b> is next. <b>Lagos</b> in Nigeria is one of the largest cities in Africa. <b>South Africa</b> has three capital cities, including Pretoria and Cape Town."],
      ["Resources and crops", "⛏️ 🍫", "The <b>Democratic Republic of the Congo</b> produces most of the world's cobalt, used in batteries. <b>Côte d'Ivoire</b> and <b>Ghana</b> grow much of the world's cocoa for chocolate. South Africa has gold, diamonds and platinum."],
      ["Young and growing", "📱", "Sub-Saharan Africa has the youngest population in the world, and its cities are growing fast. In Kenya, <b>M-Pesa</b> lets people pay with a mobile phone. Many languages are spoken, including Swahili, Hausa, Yoruba and Zulu."]],
      "Think about the country, then the resource or the crop.", "Chocolate comes from cocoa trees, and batteries need cobalt. Think where they come from.",
      [["Which African country has the most people?", "Nigeria", "Kenya|Ethiopia"], ["Lagos is a large city in...", "Nigeria", "Ghana|Zambia"], ["Which country produces most of the world's cobalt?", "Democratic Republic of the Congo", "South Africa|Kenya"],
       ["Cocoa for chocolate is grown in Ghana and...", "Côte d'Ivoire", "Egypt|Botswana"], ["South Africa is known for mining gold, diamonds and...", "Platinum", "Coal only|Salt only"], ["M-Pesa lets people in Kenya...", "Pay with a mobile phone", "Fly airplanes|Grow rice"],
       ["Sub-Saharan Africa has the world's youngest...", "Population", "Mountains|Rivers"], ["Swahili, Hausa, Yoruba and Zulu are...", "Languages spoken in Africa", "African cities|Mountains in Africa"]])),
    LS("North Africa and the Sahel", MC([
      ["The Maghreb and the Nile", "🏜️", "North Africa includes Morocco, Algeria, Tunisia, Libya and Egypt. The <b>Maghreb</b> is the northwest: Morocco, Algeria and Tunisia, with the <b>Atlas Mountains</b>. <b>Algeria</b> is the largest country in Africa by area. Most Egyptians live along the <b>Nile</b>, and <b>Cairo</b> is the capital."],
      ["The Sahara and the Sahel", "🐪", "The <b>Sahara</b> is the world's largest hot desert, about the size of the United States. The <b>Sahel</b> lies on its southern edge: Mauritania, Mali, Niger, Chad and Burkina Faso, among others. <b>Timbuktu</b> in Mali was once a famous trading and learning city."],
      ["Water and trade", "💧", "<b>Lake Chad</b> has shrunk greatly from drought and water use. The <b>Suez Canal</b> in Egypt links the Mediterranean and Red Seas, one of the busiest shipping routes in the world."]],
      "Think about the mountains, the desert, and the river of the north.", "The Maghreb is in the northwest. The Sahel is the dry edge of the Sahara in the south.",
      [["Which country is the largest in Africa by area?", "Algeria", "Egypt|Nigeria"], ["The Maghreb is in the...", "Northwest of Africa", "Southeast of Africa|Center of Asia"], ["The Atlas Mountains are in...", "Northwest Africa", "Southern Africa|East Africa"],
       ["Where do most Egyptians live?", "Along the Nile", "In the Sahara|On the Red Sea mountains"], ["The world's largest hot desert is the...", "Sahara", "Gobi|Atacama"], ["Timbuktu is a city in...", "Mali", "Egypt|Morocco"],
       ["The Suez Canal joins the Mediterranean and the...", "Red Sea", "Black Sea|Baltic Sea"], ["Which lake has shrunk greatly from drought and water use?", "Lake Chad", "Lake Victoria|Lake Malawi"], ["The Sahel is...", "The dry belt at the southern edge of the Sahara", "A river in Egypt|A mountain in Morocco"]])),
    LS("Western Europe", MC([
      ["Rivers and ports", "🏰", "Western Europe has rich land, many rivers and big ports. The <b>Rhine</b> flows from the Alps to the North Sea. <b>Paris</b> is on the Seine and <b>London</b> is on the Thames. <b>Rotterdam</b> in the Netherlands is Europe's busiest seaport."],
      ["Benelux and the Netherlands", "🌷 💨", "<b>Benelux</b> means Belgium, the Netherlands and Luxembourg. Much of the Netherlands lies below sea level and is protected by <b>dikes</b>. Land won back from the sea is called a <b>polder</b>."],
      ["Big economies", "🏭", "<b>Germany</b> has the largest economy in Europe, with the industrial <b>Ruhr</b> region. <b>France</b> is the largest EU country by area. <b>Switzerland</b> in the Alps is known for banking, watches and staying neutral."]],
      "Think about rivers, ports and the low land beside the sea.", "Benelux joins three small neighbors. A polder is reclaimed land.",
      [["Benelux means Belgium, Luxembourg and the...", "Netherlands", "Norway|Nigeria"], ["Land won back from the sea in the Netherlands is a...", "Polder", "Plateau|Peninsula"], ["Which city is on the Seine River?", "Paris", "London|Berlin"],
       ["Which city is on the Thames?", "London", "Paris|Rome"], ["Europe's busiest seaport is...", "Rotterdam", "Madrid|Vienna"], ["Which country has the largest economy in Europe?", "Germany", "Switzerland|Belgium"],
       ["The Ruhr is a famous industrial region in...", "Germany", "Spain|Italy"], ["The Rhine flows from the Alps to the...", "North Sea", "Black Sea|Baltic Sea"], ["Dikes in the Netherlands protect the land from the...", "Sea", "Wind only|Snow"]])),
    LS("Mediterranean Europe", MC([
      ["Warm sea, warm land", "🫒", "Spain, Portugal, Italy and Greece lie along the Mediterranean Sea. The <b>Mediterranean climate</b> has hot, dry summers and mild, wet winters. Olives, grapes and oranges grow well there, and many tourists visit."],
      ["Peninsulas and mountains", "⛰️", "Spain and Portugal share the <b>Iberian Peninsula</b>. The <b>Pyrenees</b> separate Spain from France. Italy is a boot-shaped peninsula with the <b>Apennine</b> Mountains down its middle. Greece has many islands and mountains."],
      ["Volcanoes and straits", "🌋", "<b>Mount Etna</b> on the island of Sicily is one of Europe's most active volcanoes, and <b>Vesuvius</b> is near Naples. The <b>Strait of Gibraltar</b> is the narrow gap between Spain and Morocco where the Mediterranean meets the Atlantic."]],
      "Think about warm dry summers, long peninsulas and famous volcanoes.", "Iberia holds two countries. The Apennines run down a boot-shaped country.",
      [["A climate with hot, dry summers and mild, wet winters is a...", "Mediterranean climate", "Polar climate|Rainforest climate"], ["Spain and Portugal share the...", "Iberian Peninsula", "Balkan Peninsula|Italian Peninsula"], ["The Pyrenees separate Spain from...", "France", "Italy|Portugal"],
       ["Italy's mountain range down its middle is the...", "Apennines", "Pyrenees|Carpathians"], ["Mount Etna is on the island of...", "Sicily", "Crete|Corsica"], ["The narrow gap between Spain and Morocco is the Strait of...", "Gibraltar", "Hormuz|Bering"],
       ["A famous crop of Mediterranean lands is the...", "Olive", "Coconut|Cocoa"], ["Which volcano is near Naples?", "Vesuvius", "Etna|Fuji"]])),
    LS("Eastern Europe and the Balkans", MC([
      ["Plains and mountains", "🏔️", "Eastern Europe includes Poland, Czechia, Slovakia, Hungary, Romania, Bulgaria and Ukraine. The <b>Carpathian Mountains</b> curve through Slovakia, Poland, Ukraine and Romania. Much of the land is flat plain with rich soil, and <b>Ukraine</b> is a major wheat grower."],
      ["Rivers and seas", "🌊", "The <b>Danube</b> flows through several capitals, including Vienna, Bratislava, Budapest and Belgrade, and reaches the <b>Black Sea</b>. The <b>Vistula</b> flows through Poland to the Baltic Sea. <b>Prague</b> is the capital of Czechia."],
      ["The Balkans", "🗺️", "The <b>Balkan Peninsula</b> in southeastern Europe is mountainous. It includes Serbia, Croatia, Bosnia and Herzegovina, Albania, North Macedonia, Bulgaria and Greece. Many languages and cultures meet there."]],
      "Think about the mountain curve, the big river and the peninsula in the southeast.", "The Danube ends at a sea in the southeast. The Vistula goes north.",
      [["Which mountains curve through Slovakia, Poland, Ukraine and Romania?", "Carpathians", "Pyrenees|Apennines"], ["The Danube River reaches the...", "Black Sea", "North Sea|Baltic Sea"], ["The Vistula flows through which country?", "Poland", "Greece|Portugal"],
       ["Prague is the capital of...", "Czechia", "Hungary|Slovakia"], ["Which country is a major wheat grower in Eastern Europe?", "Ukraine", "Iceland|Malta"], ["The Balkan Peninsula is in which part of Europe?", "Southeast", "Northwest|Northeast"],
       ["Which is a Balkan country?", "Serbia", "Norway|Portugal"], ["Budapest, on the Danube, is the capital of...", "Hungary", "Romania|Bulgaria"]])),
    LS("Australia and New Zealand", MC([
      ["The outback and the coast", "🦘", "Most of Australia's center is dry <b>outback</b>. Most Australians live along the coast, especially the southeast, in cities like <b>Sydney</b> and Melbourne. <b>Canberra</b> is the capital. <b>Uluru</b>, a giant red rock, is in the Northern Territory."],
      ["Water and reef", "🐠", "The <b>Murray-Darling</b> river system waters Australia's main farming land. The <b>Great Barrier Reef</b> off Queensland is the largest coral reef system in the world, about 2,300 km long."],
      ["New Zealand", "🥝", "New Zealand has two main islands, the <b>North Island</b> and the <b>South Island</b>. The <b>Southern Alps</b> run along the South Island. <b>Wellington</b> is the capital and sheep farming is important. The Maori are the first people of New Zealand."]],
      "Think about the dry center, the reef, and the two islands.", "Australia's people live near the edges. The reef is in the northeast.",
      [["Most Australians live...", "Near the coast", "In the central outback|On Uluru"], ["The capital of Australia is...", "Canberra", "Sydney|Melbourne"], ["The giant red rock Uluru is in the...", "Northern Territory", "Tasmania|Victoria"],
       ["The Great Barrier Reef lies off the coast of...", "Queensland", "Western Australia|Tasmania"], ["The Great Barrier Reef is the largest...", "Coral reef system", "Desert|Mountain range"], ["The Murray-Darling system mostly waters...", "Farmland", "Deserts only|Ice caps"],
       ["The capital of New Zealand is...", "Wellington", "Auckland|Sydney"], ["The Southern Alps run along New Zealand's...", "South Island", "North Island|Stewart Island only"], ["The Maori are the first people of...", "New Zealand", "Australia|Hawaii"]])),
    LS("Life on Pacific islands", MC([
      ["Two kinds of islands", "🏝️", "Many Pacific islands are <b>volcanic</b> and high, like Tahiti and Fiji's biggest islands. Others are low <b>coral atolls</b>, like Kiribati and the Marshall Islands, which rise only a few meters above the sea."],
      ["Sea and sky", "🐟 🌊", "Island nations have a large <b>exclusive economic zone (EEZ)</b>: the sea up to 200 nautical miles from the coast where they control fishing and resources. Tuna is a major catch. Rising seas and stronger storms threaten low islands."],
      ["Making a living", "🥥", "Islanders earn money from fishing, tourism, coconut and copra, and from money sent home by family working abroad. Because islands are small and far from markets, shipping goods is costly."]],
      "Think about how high the island is and how far it is from others.", "A large ocean zone belongs to each island nation. Low coral islands are at risk from rising seas.",
      [["A low ring-shaped coral island is an...", "Atoll", "Fjord|Isthmus"], ["Which Pacific nation is made of low coral atolls?", "Kiribati", "Japan|Chile"], ["The sea within 200 nautical miles of a coast, where a country controls resources, is its...", "Exclusive economic zone", "Delta|Basin"],
       ["A major catch for Pacific island nations is...", "Tuna", "Salmon only|Cod only"], ["Rising seas threaten low islands because they...", "Sit only a few meters above sea level", "Are very high mountains|Have no coast"], ["Islands often have costly shipping because they are...", "Small and far from markets", "Close to every market|Landlocked"],
       ["Which is a way islanders earn money?", "Tourism and fishing", "Mining glaciers|Selling snow"], ["Many high Pacific islands are...", "Volcanic", "Made of ice|Deserts"]])),
    LS("The Andes and the Amazon", MC([
      ["A long mountain wall", "⛰️", "The <b>Andes</b> run along the west side of South America for about 7,000 km, the longest mountain range on land. <b>Aconcagua</b> in Argentina is the highest peak in the Americas, at 6,961 m. The <b>Altiplano</b> is a high plateau in Peru and Bolivia."],
      ["High cities", "🏙️", "<b>La Paz</b>, Bolivia, is the world's highest seat of government, at about 3,650 m. <b>Quito</b>, Ecuador, is also high in the mountains. <b>Lake Titicaca</b>, between Peru and Bolivia, is one of the highest large lakes that ships can sail."],
      ["The Amazon", "🌳", "The <b>Amazon rainforest</b> is the largest tropical rainforest on Earth, and about 60 percent of it lies in Brazil. Farming in the Andes changes with height: bananas below, potatoes and llamas high up."]],
      "Think about the mountain chain on the west and the great forest in the east.", "The Andes run north to south. The Amazon is in the lowlands, mostly in one very large country.",
      [["The longest mountain range on land is the...", "Andes", "Rockies|Alps"], ["The highest mountain in the Americas is...", "Aconcagua", "Denali|Fuji"], ["Aconcagua is in which country?", "Argentina", "Chile|Colombia"],
       ["The high plateau in Peru and Bolivia is the...", "Altiplano", "Pampas|Pantanal"], ["Which capital is the world's highest seat of government?", "La Paz", "Lima|Buenos Aires"], ["Lake Titicaca is between Peru and...", "Bolivia", "Brazil|Ecuador"],
       ["About 60 percent of the Amazon rainforest is in...", "Brazil", "Peru|Colombia"], ["What would you expect to be farmed high in the Andes?", "Potatoes and llamas", "Bananas|Palm oil"]])),
    LS("Brazil and the Southern Cone", MC([
      ["Brazil", "🇧🇷", "<b>Brazil</b> is the largest country in South America in both area and population. It is the only country there where most people speak <b>Portuguese</b>. <b>Brasilia</b> is the capital, <b>Sao Paulo</b> is the biggest city, and coffee and soybeans are major crops. The <b>Pantanal</b> is a huge wetland."],
      ["Southern Cone", "🥩", "The <b>Southern Cone</b> is the southern part of South America: Argentina, Chile and Uruguay. The <b>Pampas</b> are the grassy plains of Argentina and Uruguay, famous for cattle and wheat. <b>Buenos Aires</b> is Argentina's capital."],
      ["Chile and Patagonia", "🌬️", "<b>Chile</b> is very long and narrow, between the Andes and the Pacific. <b>Patagonia</b> is the cool, windy land in the far south of Argentina and Chile."]],
      "Think about the biggest country, the grassy plains, and the long narrow country.", "Brazil speaks a different European language from its neighbors.",
      [["The largest country in South America is...", "Brazil", "Argentina|Chile"], ["Most people in Brazil speak...", "Portuguese", "Spanish|French"], ["The capital of Brazil is...", "Brasilia", "Rio de Janeiro|Sao Paulo"],
       ["The biggest city in Brazil is...", "Sao Paulo", "Brasilia|Manaus"], ["The grassy plains of Argentina and Uruguay are the...", "Pampas", "Altiplano|Pantanal"], ["The Southern Cone includes Argentina, Uruguay and...", "Chile", "Peru|Colombia"],
       ["Which country is very long and narrow?", "Chile", "Paraguay|Uruguay"], ["The huge wetland in Brazil is the...", "Pantanal", "Pampas|Patagonia"], ["The capital of Argentina is...", "Buenos Aires", "Santiago|Montevideo"]])),
    LS("Regions of the United States", MC([
      ["Big city belts", "🏙️", "A <b>megalopolis</b> is a string of large cities that grow together. The one in the northeast runs from Boston through New York City and Philadelphia to Washington, D.C. The <b>Rust Belt</b> is the older industrial area around the Great Lakes (Pittsburgh, Cleveland, Detroit) that lost many steel and car jobs."],
      ["Growing south and west", "☀️", "The <b>Sun Belt</b> is the warm south and southwest, including Florida, Texas and Arizona. It has grown fast because of jobs, warm weather and air conditioning."],
      ["Farms and tech", "🌽 💻", "The <b>Corn Belt</b> in the Midwest (Iowa, Illinois) grows corn and soybeans. The <b>Great Plains</b> grow wheat and raise cattle. <b>Silicon Valley</b> in California is a center of technology."]],
      "Think about what each region is known for: city chains, old factories, warm weather, crops, or technology.", "Belts are named for what is there. Rust is old industry, Sun is warm weather, Corn is a crop.",
      [["A string of big cities grown together, like Boston to Washington, D.C., is a...", "Megalopolis", "Rust Belt|Corn Belt"], ["The older industrial area around the Great Lakes is called the...", "Rust Belt", "Sun Belt|Corn Belt"], ["The warm south and southwest of the USA is the...", "Sun Belt", "Rust Belt|Great Plains"],
       ["Which crops does the Corn Belt grow?", "Corn and soybeans", "Coffee and tea|Bananas and cocoa"], ["Which city is in the Rust Belt?", "Pittsburgh", "Phoenix|Miami"], ["Which crop does the Great Plains grow mostly?", "Wheat", "Rice|Sugar cane"],
       ["Silicon Valley in California is a center of...", "Technology", "Cattle ranching|Coal mining"], ["Why did the Sun Belt grow fast?", "Jobs, warm weather and air conditioning", "More snow|Fewer jobs"]])),
    LS("Deserts of the world", MC([
      ["Hot deserts", "🏜️", "A desert gets less than about 250 mm of rain a year. The <b>Sahara</b> in North Africa is the largest hot desert. The <b>Arabian Desert</b> covers much of the Arabian Peninsula. The <b>Kalahari</b> and <b>Namib</b> are in southern Africa. The <b>Thar</b> lies in India and Pakistan."],
      ["Cold and coastal deserts", "🥶", "The <b>Gobi</b> in Mongolia and China is a cold desert. The <b>Atacama</b> in Chile is one of the driest places on Earth. Antarctica is the largest desert of all, since it gets very little snow."],
      ["Deserts of North America and Australia", "🌵", "The <b>Sonoran</b> and <b>Mojave</b> deserts are in the southwestern USA and Mexico. Much of the middle of Australia is desert, including the Great Victoria Desert."]],
      "Think about the continent each desert is on, and whether it is hot or cold.", "A desert is defined by how little rain falls, not by heat.",
      [["The largest hot desert is the...", "Sahara", "Gobi|Mojave"], ["The Gobi Desert is in Mongolia and...", "China", "India|Chile"], ["The Atacama Desert is in...", "Chile", "Argentina|Peru"],
       ["The Thar Desert lies in India and...", "Pakistan", "Iran|Oman"], ["The Namib and the Kalahari are in...", "Southern Africa", "Central Asia|South America"], ["The largest desert of all is...", "Antarctica", "Sahara|Gobi"],
       ["The Arabian Desert covers much of the...", "Arabian Peninsula", "Indian Peninsula|Iberian Peninsula"], ["The Sonoran and Mojave are in...", "North America", "Australia|Asia"], ["A desert is defined mainly by having...", "Very little rain", "High temperatures only|Sand only"]])),
    LS("Middle East: oil and water", MC([
      ["Oil", "🛢️", "The Persian Gulf region holds a large share of the world's known oil. Major producers include <b>Saudi Arabia</b>, <b>Iraq</b>, <b>Iran</b>, <b>Kuwait</b> and the <b>United Arab Emirates</b>. <b>Qatar</b> is a large producer of natural gas. Oil money has built modern cities such as Dubai and Riyadh."],
      ["Water is scarce", "💧", "Much of the region is desert, so fresh water is scarce. Countries use <b>desalination</b>, which removes salt from seawater, and deep wells. Cities along rivers and oases have long been important."],
      ["Great rivers", "🌊", "The <b>Tigris</b> and <b>Euphrates</b> rivers begin in Turkey and flow through Syria and Iraq to the Persian Gulf. Nearby countries must share their water. The Nile gives life to Egypt."]],
      "Think about oil in the Gulf and the need for fresh water in the desert.", "Removing salt from seawater gives fresh water. The two great rivers start in the mountains of the north.",
      [["Removing salt from seawater to make fresh water is called...", "Desalination", "Irrigation|Erosion"], ["Which country is a major oil producer on the Persian Gulf?", "Saudi Arabia", "Iceland|Portugal"], ["Riyadh is the capital of...", "Saudi Arabia", "Kuwait|Qatar"],
       ["Dubai is a city in the...", "United Arab Emirates", "Iraq|Iran"], ["The Tigris and Euphrates flow to the...", "Persian Gulf", "Red Sea|Black Sea"], ["The Tigris and Euphrates begin in...", "Turkey", "Egypt|Yemen"],
       ["Qatar is a large producer of...", "Natural gas", "Coffee|Wheat"], ["Why is fresh water scarce in much of the region?", "Much of the land is desert", "It rains every day|It is always snowing"]])),
    LS("Comparing a region's countries", REGTOT),
    LS("Trade blocs", MC([
      ["Working as a team for trade", "🤝 📦", "A <b>trade bloc</b> is a group of countries with special trade rules. Members lower or remove <b>tariffs</b> (taxes on imported goods), so goods cross borders more cheaply."],
      ["Examples", "🌐", "The <b>European Union</b> has a single market, and many members use the euro. <b>USMCA</b> links the USA, Mexico and Canada (it replaced NAFTA in 2020). <b>Mercosur</b> links South American countries such as Brazil, Argentina, Paraguay and Uruguay. <b>ASEAN</b> links Southeast Asian countries."],
      ["Good and hard parts", "⚖️", "Trade blocs can lower prices and create jobs. But some workers or businesses may lose when cheaper goods arrive from other member countries."]],
      "Think about tax on imported goods and groups of neighbors.", "A tariff is a tax on goods that cross a border.",
      [["A tax on imported goods is a...", "Tariff", "Passport|Visa"], ["A group of countries with special trade rules is a...", "Trade bloc", "Tributary|Time zone"], ["USMCA links the USA, Canada and...", "Mexico", "Brazil|Cuba"],
       ["Mercosur links countries in...", "South America", "Europe|Africa"], ["The European Union has a...", "Single market", "One army|Common ocean"], ["Lowering tariffs makes imported goods...", "Cheaper", "More expensive|Illegal"],
       ["NAFTA was replaced by USMCA in...", "2020", "1920|1990"], ["ASEAN links countries in...", "Southeast Asia", "North Africa|Northern Europe"]])),
    LS("Colonies and borders", MC([
      ["Lines on a map", "🗺️", "From the 1400s to the 1900s, European countries took control of lands in Africa, Asia and the Americas. At the <b>Berlin Conference</b> (1884-85), European leaders agreed on how to divide Africa without asking African peoples. Many borders were drawn as straight lines that cut across homelands."],
      ["Independence", "🕊️", "Latin American countries gained independence mainly in the early 1800s, such as Mexico in 1821 and Brazil in 1822. <b>India</b> became independent in 1947. In 1960 alone, 17 African countries became independent, and most others did so in the 1950s to 1970s."],
      ["Lasting marks", "💬", "Many countries still use a language from their colonial past as an official language: French in Senegal, English in Nigeria, Portuguese in Angola and Mozambique, and Spanish in most of Latin America."]],
      "Think about who drew the borders, and when countries became independent.", "The big meeting about dividing Africa was in a European capital in the 1880s.",
      [["The meeting where European leaders agreed to divide Africa was held in...", "Berlin", "Cairo|Washington"], ["The Berlin Conference took place in the...", "1880s", "1680s|1980s"], ["Many colonial borders in Africa...", "Cut across the homelands of peoples", "Followed every language group|Were drawn by Africans"],
       ["India became independent in...", "1947", "1847|1997"], ["Brazil became independent in...", "1822", "1922|1522"], ["The official language of Angola and Mozambique is...", "Portuguese", "Spanish|Dutch"],
       ["The year 1960 is known because...", "17 African countries became independent", "Africa was united into one country|No country changed"], ["The official language of Nigeria is...", "English", "French|Spanish"]])),
    LS("Environmental challenges by region", MC([
      ["Vanishing water", "🌊", "The <b>Aral Sea</b> in Central Asia shrank when most of the rivers that fed it were diverted to irrigate cotton fields. <b>Lake Chad</b> in Africa has also shrunk because of drought and water use."],
      ["Forests and reefs", "🌳 🐠", "In the <b>Amazon</b>, forest is cleared for cattle ranches and soy farms. The <b>Great Barrier Reef</b> suffers coral <b>bleaching</b> when seawater gets too warm. Protecting these places helps people and wildlife."],
      ["Land and sea level", "🏝️ 🏜️", "In the <b>Sahel</b>, drought and overgrazing lead to desertification. In the Pacific, rising seas threaten low islands. Around the <b>Arctic</b>, sea ice is melting. Many places are working on solutions: planting trees, saving water and using clean energy."]],
      "Think about what happened to water, forests, reefs and land in each place.", "Water diverted for farms can empty a lake. Warm seawater harms coral.",
      [["The Aral Sea shrank because...", "Rivers feeding it were diverted for irrigation", "A volcano filled it|People removed the sea water in buckets"], ["The Aral Sea is in...", "Central Asia", "South America|Western Europe"], ["In the Amazon, forest is mainly cleared for...", "Cattle ranches and soy farms", "Skyscrapers|Ski slopes"],
       ["Coral bleaching on the Great Barrier Reef happens when seawater is too...", "Warm", "Salty and cold|Fresh and cold"], ["Desertification in the Sahel is made worse by drought and...", "Overgrazing", "Heavy snow|Volcanoes"], ["Rising seas most threaten...", "Low coral islands", "High mountain peaks|Deserts"],
       ["In the Arctic, a change linked to warming is...", "Melting sea ice", "More desert sand|Faster rivers of lava"], ["Which is a solution that helps the environment?", "Planting trees", "Burning more forests|Draining lakes"]])),
    LS("Europe's language regions", MC([
      ["Three big groups", "🗣️", "Most European languages belong to the Indo-European family, in three big groups. <b>Germanic</b> languages: German, Dutch, English, Swedish, Danish, Norwegian. <b>Romance</b> languages (from Latin): Spanish, French, Italian, Portuguese, Romanian. <b>Slavic</b> languages: Polish, Czech, Russian, Ukrainian, Serbian, Bulgarian."],
      ["Others", "🌍", "Some languages are different: <b>Finnish</b>, <b>Estonian</b> and <b>Hungarian</b> are Uralic. <b>Greek</b> is its own branch. <b>Basque</b>, spoken in Spain and France, is unrelated to any other living language. <b>Celtic</b> languages such as Irish and Welsh are spoken in the west."],
      ["Maps and borders", "📍", "Language regions do not always match country borders. Switzerland has four national languages: German, French, Italian and Romansh."]],
      "Think about the group name, and where in Europe the language is spoken.", "Romance languages come from Latin. Slavic languages are mostly in the east.",
      [["Spanish, French and Italian are...", "Romance languages", "Germanic languages|Slavic languages"], ["German, Dutch and Swedish are...", "Germanic languages", "Romance languages|Slavic languages"], ["Polish, Czech and Serbian are...", "Slavic languages", "Romance languages|Celtic languages"],
       ["Romance languages come from...", "Latin", "Greek|Arabic"], ["Finnish and Hungarian belong to the...", "Uralic family", "Slavic group|Romance group"], ["Basque is...", "Unrelated to any other living language", "A Germanic language|A Slavic language"],
       ["Irish and Welsh are...", "Celtic languages", "Slavic languages|Romance languages"], ["Which is one of Switzerland's national languages?", "Romansh", "Basque|Polish"], ["Romanian is a...", "Romance language", "Slavic language|Germanic language"]]))
  ];
  l21.push(LS("Mixed practice", MX(l21, [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 16, 17])));
  l21.push(LS("Level 21 Challenge", MX(l21, [7, 11, 13, 15, 0, 2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 16, 17])));

  Object.assign(GEO_LEVELS, { 19: l19, 20: l20, 21: l21 });
})();
