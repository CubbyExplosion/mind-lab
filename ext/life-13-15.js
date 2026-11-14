// ext/life-13-15.js  Life Science levels 13-15
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  // L(title, slides["h|v|t"], items["question|answer|picture|clue|wrong1,wrong2"], nudge)
  const L = (title, slides, items, nudge) => {
    const its = items.map(s => { const p = s.split("|"); return { q: p[0], a: p[1], v: p[2] || "", c: p[3] || "", w: p[4] ? p[4].split(",") : null }; });
    const make = () => {
      const it = pick(its);
      const pool = [...new Set(its.map(x => x.a))].filter(a => a !== it.a);
      const wr = shuf(it.w || pool).slice(0, 2);
      let exs = its.filter(x => x.a !== it.a && !nz(x.q + x.a).includes(nz(it.a)));
      if (!exs.length) exs = its.filter(x => x.a !== it.a);
      const ex = pick(exs);
      const na = nz(it.a), leaks = h => na.length > 2 && nz(String(h).replace(/<[^>]+>/g, "")).includes(na);
      let h1 = nudge || "Think back to what you just learned. Read the question slowly.";
      if (leaks(h1)) h1 = "Think back to what you just learned. Read the question slowly.";
      let h2 = it.c || "";
      if (!h2 || leaks(h2)) h2 = `The answer starts with "${it.a[0].toUpperCase()}" and has ${it.a.replace(/ /g, "").length} letters.`;
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...wr]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
    return { title, make };
  };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 13 =================
  const a = [];
  a.push(L("Levels of organization", [
    "From small to big|🔬|Living things are built in levels: <b>cell</b>, then <b>tissue</b>, then <b>organ</b>, then <b>organ system</b>, then the whole <b>organism</b>.",
    "Tissues and organs|🫀|A <b>tissue</b> is a group of similar cells doing one job. An <b>organ</b> is made of two or more tissues, like the heart.",
    "Systems|🧍|Organs that work together form an <b>organ system</b>, like the digestive system. All the systems together make one organism."
  ], [
    "What is the basic unit of life?|cell|🔬||tissue,organ",
    "A group of similar cells that do the same job is a...|tissue|🧫||organ,system",
    "Two or more tissues working together make an...|organ|🫁||cell,organism",
    "The stomach, intestines and liver are parts of the digestive...|system|🍽️||tissue,cell",
    "Which is the largest level: cell, tissue, organ or organ system?|organ system|🧍||cell,tissue",
    "Heart muscle tissue is part of which organ?|heart|❤️||lungs,brain",
    "Which level comes right after cell?|tissue|🔬||organ,organism",
    "A whole living thing made of organ systems is an...|organism|🐕||tissue,organ",
    "The brain, spinal cord and nerves form the nervous...|system|🧠||organ,cell"
  ], "Remember the ladder: cell, tissue, organ, organ system, organism."));
  a.push(L("Cell theory", [
    "Three big ideas|🔬|The <b>cell theory</b> says: 1) all living things are made of cells, 2) the cell is the basic unit of life, 3) all cells come from other cells.",
    "Seeing cells|🧱|In 1665 Robert Hooke looked at thin slices of cork under a microscope. The little boxes reminded him of rooms, so he called them <b>cells</b>.",
    "More discoveries|💧|Anton van Leeuwenhoek used a microscope to see tiny living things in pond water. Later scientists put the ideas together into the cell theory."
  ], [
    "Cell theory says all living things are made of...|cells|🔬||atoms only,bones",
    "The cell is the basic unit of...|life|🧫||rocks,weather",
    "According to cell theory, new cells come from...|existing cells|🧫||nothing at all,dust",
    "Who first named cells, looking at cork?|Robert Hooke|🧱||Charles Darwin,Louis Pasteur",
    "What did Hooke look at through his microscope?|cork|🧱||salt,sand",
    "Which tool made the discovery of cells possible?|microscope|🔬||telescope,thermometer",
    "Which statement is part of cell theory?|all cells come from other cells|🧫||cells appear from mud,only plants have cells",
    "Leeuwenhoek saw tiny living things in...|pond water|💧||metal,smoke",
    "A bacterium is a living thing made of how many cells?|one|🦠||two,millions"
  ], "Think about the three ideas of cell theory."));
  a.push(L("Microscopes and magnification", [
    "Parts of a microscope|🔬|You look through the <b>eyepiece</b>. The <b>objective lenses</b> are near the slide. The <b>stage</b> holds the slide and the <b>diaphragm</b> controls light.",
    "Total magnification|✖️|Multiply the eyepiece power by the objective power. Eyepiece 10x and objective 4x gives 10 x 4 = <b>40x</b>.",
    "Using it well|👐|Start with the lowest power. Use the coarse knob first, then the fine knob for a sharp picture. Carry it with two hands."
  ], [
    "Eyepiece 10x and objective 4x. Total magnification?|40x|🔬||14x,400x",
    "Eyepiece 10x and objective 10x. Total magnification?|100x|🔬||20x,1000x",
    "Eyepiece 10x and objective 40x. Total magnification?|400x|🔬||50x,4000x",
    "Which part do you look through?|eyepiece|👁️||stage,base",
    "Which part holds the slide?|stage|🔬||eyepiece,base",
    "Which knob gives the final sharp focus?|fine focus knob|🔬||coarse focus knob,stage clip",
    "Which part controls how much light passes?|diaphragm|💡||eyepiece,arm",
    "Which objective should you start with?|lowest power|🔬||highest power,no objective",
    "How should you carry a microscope?|with two hands|👐||by the eyepiece,by the stage",
    "A magnification of 100x makes an object look how big?|100 times larger|🔍||10 times larger,1000 times larger"
  ], "Multiply the two powers, or think about the part's job."));
  a.push(L("Prokaryotes and eukaryotes", [
    "Two kinds of cells|🦠🧫|<b>Prokaryotic</b> cells have no nucleus. <b>Eukaryotic</b> cells have a nucleus and other organelles with their own membranes.",
    "Who has which?|🌳🦠|Bacteria and archaea are prokaryotes. Plants, animals, fungi and protists are eukaryotes.",
    "Size and DNA|📏|Prokaryotes are usually much smaller. Their DNA floats in the cell. In eukaryotes the DNA is inside the nucleus."
  ], [
    "Which cells have no nucleus?|prokaryotic cells|🦠||eukaryotic cells,plant cells",
    "Bacteria are...|prokaryotes|🦠||eukaryotes,animals",
    "Plant and animal cells are...|eukaryotic|🌳||prokaryotic,viral",
    "Eukaryotic cells keep their DNA inside the...|nucleus|🧬||ribosome,vacuole",
    "Where is the DNA in a prokaryote?|floating in the cell|🦠||inside a nucleus,in the cell wall",
    "Which is usually larger?|eukaryotic cell|📏||prokaryotic cell,they are the same",
    "Which cells have membrane-bound organelles?|eukaryotic cells|🧫||prokaryotic cells,neither kind",
    "Fungus cells are...|eukaryotic|🍄||prokaryotic,viral",
    "Which of these is a prokaryote?|a bacterium|🦠||a mushroom,an oak tree"
  ], "Look for the word nucleus in the question."));
  a.push(L("The cell membrane", [
    "A thin boundary|🧱|The <b>cell membrane</b> surrounds every cell. It is made of two layers of <b>phospholipids</b> with proteins set in it.",
    "Heads and tails|💧|Each phospholipid has a head that loves water and two tails that avoid water. The tails hide in the middle of the membrane.",
    "A careful gate|🚪|The membrane is <b>selectively permeable</b>: it lets some things in and out and keeps others away. Protein channels help some molecules cross."
  ], [
    "The cell membrane is selectively...|permeable|🚪||solid,frozen",
    "How many layers of phospholipids make the membrane?|two|🧱||one,five",
    "Which part of a phospholipid loves water?|head|💧||tail,both ends",
    "Phospholipid tails avoid water. Which part is that?|tail|💧||head,nucleus",
    "Proteins in the membrane can act as...|channels|🚪||walls,roots",
    "The membrane controls what enters and...|leaves|🚪||glows,freezes",
    "Which structure outside the membrane protects plant cells?|cell wall|🌿||nucleus,ribosome",
    "Small gases like oxygen cross the membrane by...|diffusion|💨||digestion,photosynthesis",
    "The membrane is made mostly of lipids and...|proteins|🧱||metals,glass"
  ], "Think about the membrane as a gate with choosy rules."));
  a.push(L("Stages of mitosis", [
    "Before mitosis|⏳|In <b>interphase</b> the cell grows and copies its DNA. Then mitosis divides the nucleus into two identical nuclei.",
    "PMAT|🧬|<b>P</b>rophase: chromosomes appear. <b>M</b>etaphase: they line up in the middle. <b>A</b>naphase: copies are pulled apart. <b>T</b>elophase: two new nuclei form.",
    "Splitting|✂️|Then <b>cytokinesis</b> splits the cytoplasm. One parent cell makes two daughter cells that are identical to it."
  ], [
    "Chromosomes line up in the middle in which stage?|metaphase|🧬||prophase,telophase",
    "Copies of chromosomes are pulled apart in which stage?|anaphase|🧬||metaphase,prophase",
    "Chromosomes first become visible in which stage?|prophase|🧬||telophase,anaphase",
    "Two new nuclei form in which stage?|telophase|🧬||prophase,metaphase",
    "The cell copies its DNA during...|interphase|⏳||anaphase,telophase",
    "Mitosis makes how many daughter cells?|two|✂️||four,one",
    "Daughter cells from mitosis are...|identical to the parent|🧫||different from the parent,half-sized sex cells",
    "The splitting of the cytoplasm is called...|cytokinesis|✂️||interphase,replication",
    "Which stage comes right after metaphase?|anaphase|🧬||prophase,interphase"
  ], "Remember PMAT: prophase, metaphase, anaphase, telophase."));
  a.push(L("Meiosis and gametes", [
    "Making sex cells|🥚|<b>Meiosis</b> makes <b>gametes</b>: sperm and egg cells. One cell divides twice and makes <b>four</b> cells.",
    "Half the chromosomes|✂️|Each gamete has <b>half</b> the chromosomes of the parent cell. A human body cell has 46, so a human egg or sperm has 23.",
    "Fertilization|🌟|When a sperm joins an egg, the new cell has the full number again: 46 in people. Meiosis also shuffles genes, so offspring are different."
  ], [
    "Meiosis makes cells called...|gametes|🥚||tissues,organs",
    "One cell going through meiosis ends up as how many cells?|four|✂️||two,eight",
    "A gamete has what part of the parent's chromosomes?|half|✂️||all,double",
    "A human body cell has 46 chromosomes. How many are in a human egg?|23|🥚||46,92",
    "How many chromosomes does a fertilized human egg have?|46|🌟||23,92",
    "Which cells are made by meiosis?|sperm and egg cells|🥚||skin cells,muscle cells",
    "Which process makes cells different from each other?|meiosis|🧬||mitosis,digestion",
    "Meiosis helps offspring have more...|variety|🌈||sameness,legs",
    "Which process grows and repairs skin?|mitosis|🩹||meiosis,fertilization"
  ], "Gametes need half the chromosomes so they can add up when they join."));
  a.push(L("Stem cells and specialized cells", [
    "Stem cells|🌱|<b>Stem cells</b> are cells that have not picked a job yet. They can divide and become many kinds of cells.",
    "Specialized cells|🧬|As a cell <b>specializes</b>, it takes on a shape that fits its job. Nerve cells are long, red blood cells carry oxygen, muscle cells shorten.",
    "Same DNA|📖|All the cells in your body have the same DNA. Different cells simply use different genes. Bone marrow has stem cells that make blood cells."
  ], [
    "Cells that can become many kinds of cells are...|stem cells|🌱||nerve cells,fat cells",
    "A cell that has taken on a certain job is...|specialized|🧬||unchanged,unborn",
    "Nerve cells are long so they can...|send signals|⚡||store sugar,carry oxygen",
    "Red blood cells carry...|oxygen|🩸||sound,light",
    "Muscle cells contract to cause...|movement|💪||sight,smell",
    "Root hair cells absorb...|water|🌱||sound,heat",
    "Why do specialized cells have different shapes?|their shape fits their job|🧬||they have different DNA,they are different ages",
    "Does a skin cell have the same DNA as a muscle cell in the same person?|yes|📖||no,only on Mondays",
    "Stem cells in bone marrow make...|blood cells|🩸||hair cells,leaf cells"
  ], "Think about how shape and job go together."));
  a.push(L("Classification ranks", [
    "Boxes within boxes|📦|Scientists sort life into ranks: <b>domain, kingdom, phylum, class, order, family, genus, species</b>.",
    "Broad to narrow|🔽|Domain is the broadest rank. Species is the narrowest. Members of the same species are the most alike.",
    "A memory trick|🧠|Try: <b>D</b>ear <b>K</b>ing <b>P</b>hilip <b>C</b>ame <b>O</b>ver <b>F</b>or <b>G</b>ood <b>S</b>oup."
  ], [
    "Which rank is the broadest?|domain|📦||species,genus",
    "Which rank is the narrowest?|species|📦||kingdom,order",
    "Which rank comes right below kingdom?|phylum|🔽||class,family",
    "Which rank is between class and family?|order|🔽||genus,phylum",
    "Which rank is right above species?|genus|🔽||family,class",
    "How many main ranks are there?|eight|🔢||five,twelve",
    "Which group has animals that are more alike: same genus or same phylum?|same genus|🔽||same phylum,same kingdom",
    "In the memory trick, what does K stand for?|kingdom|🧠||kind,key",
    "Which rank comes right after phylum?|class|🔽||order,domain"
  ], "Go from big groups down to small groups: the order matters."));
  a.push(L("Three domains of life", [
    "The biggest groups|🌍|All life fits into three <b>domains</b>: <b>Bacteria</b>, <b>Archaea</b> and <b>Eukarya</b>.",
    "Bacteria and Archaea|🦠|Both are single-celled prokaryotes with no nucleus. Archaea often live in extreme places, such as hot springs and very salty lakes.",
    "Eukarya|🌳🐕🍄|Eukarya has cells with a nucleus. Plants, animals, fungi and protists all belong to Eukarya."
  ], [
    "How many domains of life are there?|three|🌍||two,six",
    "Which domain has plants, animals and fungi?|Eukarya|🌳||Bacteria,Archaea",
    "Which domain includes common germs like E. coli?|Bacteria|🦠||Eukarya,Archaea",
    "Archaea are often found in...|extreme places like hot springs|♨️||gardens only,human hair only",
    "Are Archaea prokaryotes or eukaryotes?|prokaryotes|🦠||eukaryotes,viruses",
    "A mushroom belongs to which domain?|Eukarya|🍄||Bacteria,Archaea",
    "An oak tree belongs to which domain?|Eukarya|🌳||Archaea,Bacteria",
    "Bacteria and Archaea cells have no...|nucleus|🦠||DNA,membrane",
    "Protists belong to which domain?|Eukarya|🔬||Bacteria,Archaea"
  ], "Two domains are prokaryotes. One has a nucleus."));
  a.push(L("Cladograms", [
    "Family trees of species|🌿|A <b>cladogram</b> is a branching diagram that shows how living things are related.",
    "Reading branches|🔀|Each split shows a <b>common ancestor</b>. Species that branch off close together are more closely related. A <b>clade</b> is an ancestor and all its descendants.",
    "Shared traits|🦴|Cladograms are built from shared traits and DNA. For example, every vertebrate has a backbone."
  ], [
    "A branching diagram of relationships is a...|cladogram|🌿||thermometer,food web",
    "Where a branch splits, it shows a common...|ancestor|🔀||predator,habitat",
    "Species close together on a cladogram are...|closely related|🌿||unrelated,the same age",
    "An ancestor and all its descendants form a...|clade|🔀||climate,cell",
    "Lizards and mice share a more recent ancestor than lizards and frogs. Which is more closely related to a lizard?|mouse|🦎||frog,fish",
    "A backbone is a trait shared by all...|vertebrates|🦴||insects,worms",
    "Cladograms are based on...|shared traits|🧬||favorite colors,names only",
    "The base of a cladogram stands for the oldest...|common ancestor|🌿||predator,descendant"
  ], "Think about branches and who splits from whom."));
  a.push(L("Xylem and phloem", [
    "Plant pipes|🌿|Vascular plants have tubes that carry materials. <b>Xylem</b> carries water and minerals up from the roots.",
    "Food delivery|🍬|<b>Phloem</b> carries sugar made in the leaves to the roots, fruits and growing parts.",
    "No pipes|🌱|Mosses have no true xylem or phloem, so they stay small and live in damp places."
  ], [
    "Which tissue carries water up from the roots?|xylem|💧||phloem,bark",
    "Which tissue carries sugar made in the leaves?|phloem|🍬||xylem,pollen",
    "Xylem moves water and...|minerals|💧||sugar,sunlight",
    "Sugar from leaves travels to roots and fruits through the...|phloem|🍎||xylem,stomata",
    "Plants with xylem and phloem are called...|vascular plants|🌿||algae,fungi",
    "Mosses do not have...|vascular tissue|🌱||cells,DNA",
    "Which way does xylem move water?|up|⬆️||down,only sideways",
    "Celery in colored water turns color because the dye moves up the...|xylem|🥬||phloem,roots only",
    "Which tissue brings sugar to a growing fruit?|phloem|🍎||xylem,petal"
  ], "One tissue carries water, the other carries food."));
  a.push(L("Macromolecules", [
    "Big molecules of life|🧬|Living things are built from four big groups: <b>carbohydrates, lipids, proteins</b> and <b>nucleic acids</b>.",
    "Jobs|🍞🥜|Carbohydrates (sugars and starches) give quick energy. Lipids (fats and oils) store energy. Proteins build and repair, and are made of <b>amino acids</b>.",
    "Instructions|📖|Nucleic acids, such as DNA, store the instructions for making proteins and for passing on traits."
  ], [
    "Sugars and starches are...|carbohydrates|🍞||lipids,proteins",
    "Proteins are made of smaller units called...|amino acids|🥜||sugars,fats",
    "Fats and oils are...|lipids|🫒||carbohydrates,nucleic acids",
    "DNA is a kind of...|nucleic acid|🧬||lipid,carbohydrate",
    "Which food is rich in protein?|beans|🫘||soda,lemonade",
    "Which food is rich in starch?|potato|🥔||olive oil,chicken",
    "Which macromolecule stores lots of energy and insulates?|lipids|🫒||nucleic acids,minerals",
    "Which macromolecule builds and repairs body parts?|proteins|💪||carbohydrates,water"
  ], "Match the group to its main job."));
  a.push(L("Water and life", [
    "A special molecule|💧|A water molecule is <b>H2O</b>: two hydrogen atoms and one oxygen atom. Water is the <b>universal solvent</b> because many things dissolve in it.",
    "Sticky water|🌱|<b>Cohesion</b> is water sticking to water. <b>Adhesion</b> is water sticking to other things. Together they help water climb up plant stems.",
    "Stable and floating|🧊|Water takes a lot of energy to heat up, which keeps temperatures steady. Ice is less dense than liquid water, so it floats."
  ], [
    "Water is called the universal...|solvent|💧||fuel,metal",
    "Water sticking to itself is called...|cohesion|💧||adhesion,evaporation",
    "Water sticking to other surfaces is called...|adhesion|💧||cohesion,gravity",
    "Compared with liquid water, ice is...|less dense|🧊||more dense,heavier",
    "Water heats slowly, which helps living things keep a stable...|temperature|🌡️||color,speed",
    "About how much of the human body is water?|about 60 percent|🧍||about 5 percent,about 95 percent",
    "The formula for water is...|H2O|💧||CO2,O2",
    "Cohesion and adhesion help water climb the plant's...|xylem|🌿||petals,seeds",
    "Why is it good that ice floats on a pond?|fish can live in the water below|🐟||ice makes the pond hotter,ice eats algae"
  ], "Think about what makes water behave in special ways."));
  a.push(L("Graphs and data in biology", [
    "Variables|📈|The <b>independent variable</b> is what you change. It goes on the <b>x-axis</b>. The <b>dependent variable</b> is what you measure. It goes on the <b>y-axis</b>.",
    "Choosing a graph|📊|A <b>line graph</b> shows change over time. A <b>bar graph</b> compares groups. A <b>pie chart</b> shows parts of a whole.",
    "Kinds of data|🔢|<b>Quantitative</b> data is numbers, like height in cm. <b>Qualitative</b> data is descriptions, like color. The mean is the sum divided by how many values."
  ], [
    "The independent variable goes on which axis?|x-axis|📈||y-axis,z-axis",
    "The dependent variable goes on which axis?|y-axis|📈||x-axis,no axis",
    "Which graph best shows change over time?|line graph|📈||pie chart,map",
    "Which graph compares amounts in groups?|bar graph|📊||line graph,timeline",
    "Which graph shows parts of a whole?|pie chart|🥧||line graph,scatter",
    "A plant grows from 3 cm to 9 cm. How many cm did it grow?|6 cm|🌱||12 cm,3 cm",
    "The factor you change on purpose is the...|independent variable|🔧||dependent variable,control",
    "What is the mean of 4, 6 and 8?|6|🔢||8,18",
    "Leaf color is what kind of data?|qualitative|🍃||quantitative,none"
  ], "Ask yourself: is it a number, a change over time, or a comparison?"));
  a.push(L("Abiotic and biotic factors", [
    "Living and nonliving|🌍|<b>Biotic</b> factors are the living (or once living) parts of an ecosystem, like plants, animals and bacteria.",
    "Nonliving parts|☀️|<b>Abiotic</b> factors are nonliving: sunlight, water, air, soil, temperature and rocks.",
    "Connected|🔗|Abiotic and biotic factors affect each other. Less rain (abiotic) can mean fewer plants (biotic)."
  ], [
    "Living parts of an ecosystem are...|biotic|🌳||abiotic,mineral",
    "Nonliving parts of an ecosystem are...|abiotic|☀️||biotic,alive",
    "Sunlight is...|abiotic|☀️||biotic,a predator",
    "A mushroom is...|biotic|🍄||abiotic,a mineral",
    "Which is abiotic: a fish, a rock or a tree?|a rock|🪨||a fish,a tree",
    "Soil bacteria are...|biotic|🦠||abiotic,rocks",
    "Which is a biotic factor: wind, a predator or a river?|a predator|🦊||wind,a river",
    "Temperature is an...|abiotic factor|🌡️||biotic factor,organism",
    "Rainfall is...|abiotic|🌧️||biotic,a producer"
  ], "Ask: is it alive or was it once alive?"));
  a.push(L("Population change", [
    "Getting bigger|📈|A population grows when there are <b>births</b> and <b>immigration</b> (animals moving in).",
    "Getting smaller|📉|A population shrinks when there are <b>deaths</b> and <b>emigration</b> (animals moving out).",
    "Counting|🔢|New size = start + births + immigrants - deaths - emigrants. <b>Population density</b> is how many live in one area."
  ], [
    "Births make a population...|increase|📈||decrease,vanish",
    "Deaths make a population...|decrease|📉||increase,double",
    "Animals moving into an area is called...|immigration|➡️||emigration,migration only",
    "Animals moving out of an area is called...|emigration|⬅️||immigration,birth",
    "A group has 100 deer. 20 are born and 10 die. No one moves. New size?|110|🦌||120,90",
    "A group has 50 geese. 5 move in and 8 move out. New size?|47|🪿||53,58",
    "Population density tells how many live in a certain...|area|🗺️||color,age",
    "A J-shaped curve shows what kind of growth?|exponential growth|📈||no growth,shrinking",
    "When food runs out, population growth usually...|slows down|🍂||speeds up,never changes"
  ], "Add what comes in, subtract what goes out."));
  a.push(L("Toxins in the food chain", [
    "Building up|⚗️|<b>Bioaccumulation</b> is when a harmful chemical slowly builds up in an organism's body over time.",
    "Climbing the chain|🔺|<b>Biomagnification</b> means the amount of toxin gets bigger at each level of the food chain, so top predators have the most.",
    "Real examples|🦅|The pesticide DDT once made the eggshells of some birds too thin. Mercury builds up in big predator fish. Cleaner water protects the whole food chain."
  ], [
    "A toxin slowly building up in a body is called...|bioaccumulation|⚗️||photosynthesis,evaporation",
    "Toxin amounts getting larger up the food chain is called...|biomagnification|🔺||germination,erosion",
    "Which animals usually hold the most toxin?|top predators|🦅||producers,decomposers",
    "DDT made some bird eggshells too...|thin|🥚||colorful,heavy",
    "Which fish has more mercury: a small fish or a large predator fish?|large predator fish|🐟||small fish,they are equal",
    "Compared with a hawk, plants at the bottom of the chain hold...|less toxin|🌿||more toxin,exactly the same",
    "Chemicals that wash off farms into streams are called...|runoff|🌧️||fossils,pollen",
    "Keeping harmful chemicals out of water protects the whole...|food chain|🔗||sky,desert",
    "Which has more toxin: a grasshopper or the hawk that eats many of them?|the hawk|🦅||the grasshopper,neither"
  ], "Think about how things add up as one animal eats another."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]]));
  a.push(MIX("Level 13 Challenge", [a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17], a[3], a[5], a[8]]));

  // ================= LEVEL 14 =================
  const b = [];
  b.push(L("Inside a bone", [
    "Layers|🦴|A bone has hard <b>compact bone</b> on the outside and lighter <b>spongy bone</b> with little holes inside. Cartilage cushions the ends.",
    "Marrow|🩸|Many bones hold <b>bone marrow</b>, where new blood cells are made.",
    "Strong and light|💪|Bones get their hardness from minerals such as <b>calcium</b>. An adult has 206 bones. The longest is the thigh bone, the femur."
  ], [
    "The hard outer layer of a bone is...|compact bone|🦴||spongy bone,marrow",
    "The light inside layer with small holes is...|spongy bone|🦴||compact bone,skin",
    "Blood cells are made in...|bone marrow|🩸||cartilage,tendons",
    "Bones get hardness from the mineral...|calcium|🥛||iron,sugar",
    "Flexible tissue that cushions the ends of bones is...|cartilage|🦴||marrow,ligament",
    "How many bones does an adult have?|206|🔢||106,306",
    "The longest bone in the body is the...|femur|🦵||humerus,rib",
    "The skull protects the...|brain|🧠||heart,lungs"
  ], "Think about the layers of a bone from outside to inside."));
  b.push(L("Types of joints", [
    "Where bones meet|🦴|A <b>joint</b> is where two bones meet. <b>Ligaments</b> hold bones together at joints.",
    "Moving joints|🔄|<b>Ball-and-socket</b> joints (shoulder, hip) move in many directions. <b>Hinge</b> joints (knee, elbow) bend one way. A <b>pivot</b> joint in the neck turns the head.",
    "Others|🧩|<b>Gliding</b> joints in the wrist and ankle slide a little. <b>Fixed</b> joints in the skull do not move."
  ], [
    "The shoulder is a...|ball-and-socket joint|💪||hinge joint,fixed joint",
    "The knee is a...|hinge joint|🦵||pivot joint,ball-and-socket joint",
    "The elbow is a...|hinge joint|💪||fixed joint,gliding joint",
    "The neck joint that turns the head side to side is a...|pivot joint|🙂||hinge joint,fixed joint",
    "The bones of the skull are joined by...|fixed joints|💀||hinge joints,pivot joints",
    "Ligaments connect...|bone to bone|🦴||muscle to bone,skin to muscle",
    "The hip is a...|ball-and-socket joint|🦵||hinge joint,fixed joint",
    "A hinge joint moves like a...|door|🚪||spinning top,wave"
  ], "Picture how the joint moves."));
  b.push(L("Muscle pairs", [
    "Muscles pull|💪|Muscles can only <b>pull</b> by getting shorter (contracting). They cannot push.",
    "Working in pairs|🤝|The <b>biceps</b> bends the elbow. The <b>triceps</b> straightens it. When one contracts, the other relaxes.",
    "Tendons|🔗|<b>Tendons</b> join muscles to bones. When a muscle pulls on a tendon, the bone moves."
  ], [
    "Which muscle bends your elbow?|biceps|💪||triceps,heart",
    "Which muscle straightens your elbow?|triceps|💪||biceps,diaphragm",
    "Tendons connect muscle to...|bone|🦴||skin,blood",
    "Muscles can only...|pull|💪||push,glow",
    "When the biceps contracts, the triceps...|relaxes|💪||contracts,disappears",
    "Muscles that work together in opposite ways are called...|pairs|🤝||twins,tendons",
    "When a muscle contracts it gets...|shorter|💪||longer,colder",
    "The quadriceps on the front of the thigh straightens the...|knee|🦵||elbow,wrist"
  ], "Remember muscles pull. One pulls one way, the other pulls back."));
  b.push(L("Pulse and blood pressure", [
    "Pulse|💓|Your <b>pulse</b> is the beat of your heart felt in an artery, like at your wrist or neck. A resting adult has about 60 to 100 beats a minute.",
    "Exercise|🏃|When you exercise, muscles need more oxygen, so your heart beats faster and your pulse goes up.",
    "Blood pressure|🩺|<b>Blood pressure</b> is the push of blood against artery walls. A cuff around the arm measures it."
  ], [
    "Pulse is a count of your...|heartbeats|💓||breaths,steps",
    "A resting adult pulse is usually about 60 to 100 beats a...|minute|⏱️||day,hour",
    "During exercise your pulse goes...|up|🏃||down,nowhere",
    "Blood pressure is the push of blood against the walls of...|arteries|🩺||bones,lungs",
    "What goes around the arm to measure blood pressure?|a cuff|🩺||a ribbon,a ring",
    "20 beats are counted in 15 seconds. Beats per minute?|80|💓||60,100",
    "30 beats are counted in 30 seconds. Beats per minute?|60|💓||30,90",
    "You can feel a pulse at your...|wrist|✋||elbow,knee"
  ], "Pulse means heartbeats. Multiply to get a full minute."));
  b.push(L("How we breathe", [
    "The diaphragm|🫁|The <b>diaphragm</b> is a big muscle under the lungs. When you breathe in, it contracts and moves down.",
    "In and out|↕️|The chest space grows, so air flows in. When you breathe out, the diaphragm relaxes and air is pushed out.",
    "The path|🛤️|Air goes through the nose, the <b>trachea</b>, two <b>bronchi</b> and into tiny air sacs called <b>alveoli</b>."
  ], [
    "Which muscle sits under the lungs and helps you breathe?|diaphragm|🫁||biceps,stomach",
    "When you breathe in, the diaphragm...|contracts|🫁||relaxes,disappears",
    "When you breathe out, the diaphragm...|relaxes|🫁||contracts,freezes",
    "The tube from the throat to the lungs is the...|trachea|🛤️||esophagus,artery",
    "The trachea splits into two branches called...|bronchi|🛤️||alveoli,veins",
    "The tiny air sacs where gas moves into blood are...|alveoli|🫁||bronchi,ribs",
    "Which one moves up and out when you inhale?|ribs|🫁||ankles,knees",
    "Mucus in the nose helps by trapping...|dust|👃||oxygen,sound"
  ], "Think about what the diaphragm does to the space in the chest."));
  b.push(L("Absorbing food: villi", [
    "Small intestine|🍽️|Most nutrients are absorbed in the <b>small intestine</b>. Bile from the liver helps break down fats.",
    "Villi|🌿|The inner wall has millions of finger-like bumps called <b>villi</b>. They give a huge surface area to take in nutrients.",
    "Into the blood|🩸|Tiny blood vessels called capillaries in each villus carry nutrients into the blood. The large intestine absorbs water."
  ], [
    "Most nutrients are absorbed in the...|small intestine|🍽️||large intestine,stomach",
    "The finger-like bumps in the small intestine are...|villi|🌿||alveoli,neurons",
    "Villi increase the...|surface area|📏||temperature,weight",
    "Absorbed nutrients move into the...|bloodstream|🩸||lungs,skull",
    "Which organ mainly absorbs water from leftover food?|large intestine|💧||small intestine,heart",
    "The liver makes bile, which helps digest...|fats|🥓||water,vitamins",
    "Villi are covered in tiny blood vessels called...|capillaries|🩸||ligaments,tendons",
    "Stomach acid helps break down...|food|🥣||bones,air"
  ], "Think about how a bumpy surface can take in more."));
  b.push(L("Insulin and blood sugar", [
    "Blood sugar|🍬|Cells use <b>glucose</b>, a sugar, for energy. After a meal, glucose in the blood goes up.",
    "Insulin|💉|The <b>pancreas</b> releases a hormone called <b>insulin</b>. Insulin helps cells take in glucose, so blood sugar goes back down.",
    "Balance|⚖️|This is homeostasis. In diabetes the body has trouble controlling blood sugar, and doctors help people manage it."
  ], [
    "Which organ makes insulin?|pancreas|🫘||lungs,eye",
    "Insulin helps cells take in...|glucose|🍬||oxygen,calcium",
    "Glucose is a kind of...|sugar|🍬||metal,gas",
    "After a meal blood sugar goes up. Insulin makes it go...|down|⬇️||up,away from the body",
    "Hormones travel through the body in the...|blood|🩸||bones,hair",
    "Hormones are chemical...|messengers|📨||boxes,rocks",
    "Keeping the body steady is called...|homeostasis|⚖️||evolution,migration",
    "Cells use glucose to get...|energy|⚡||wings,color"
  ], "Insulin lowers the sugar level in the blood."));
  b.push(L("Parts of the brain", [
    "Cerebrum|🧠|The <b>cerebrum</b> is the biggest part. It handles thinking, memory, speech and voluntary movement. It has two halves called hemispheres.",
    "Cerebellum|🚲|The <b>cerebellum</b> sits at the back. It controls balance and smooth, coordinated movement.",
    "Brain stem|❤️|The <b>brain stem</b> controls automatic jobs like breathing and heartbeat. It joins the brain to the spinal cord."
  ], [
    "Which part handles thinking and memory?|cerebrum|🧠||cerebellum,brain stem",
    "Which part controls balance?|cerebellum|🚲||cerebrum,spinal cord",
    "Which part controls breathing and heartbeat?|brain stem|❤️||cerebrum,cerebellum",
    "What connects the brain to nerves in the body?|spinal cord|🦴||skull,tendon",
    "The brain has two halves called...|hemispheres|🧠||ventricles,cuffs",
    "The biggest part of the brain is the...|cerebrum|🧠||cerebellum,brain stem",
    "Riding a bike without falling needs mostly your...|cerebellum|🚲||cerebrum,tongue",
    "The skull protects the...|brain|💀||stomach,heart"
  ], "Match each part to its job."));
  b.push(L("Human life stages", [
    "Growing|👶|People pass through stages. <b>Infancy</b> is the baby stage; babies grow fast in the first year and drink milk.",
    "Childhood|🧒|Toddlers learn to walk and talk. In <b>childhood</b> baby teeth are replaced by permanent teeth.",
    "Later stages|🧑|<b>Adolescence</b> is the teen years, when the body grows and changes a lot. Then comes <b>adulthood</b>, when growth in height stops, and later older adulthood."
  ], [
    "The baby stage of life is called...|infancy|👶||adulthood,adolescence",
    "The stage after infancy is...|childhood|🧒||older adulthood,adolescence",
    "The teen years are called...|adolescence|🧑||infancy,childhood",
    "Babies get their food mainly from...|milk|🍼||pizza,popcorn",
    "Baby teeth are replaced by...|permanent teeth|🦷||fur,feathers",
    "A child of about 1 to 3 learning to walk is a...|toddler|👣||teenager,adult",
    "Growth in height stops in...|adulthood|🧑||infancy,childhood",
    "The stage after adulthood is...|older adulthood|👵||infancy,childhood"
  ], "Put the stages in order from birth onward."));
  b.push(L("How vaccines work", [
    "Practice for the body|💉|A <b>vaccine</b> shows the immune system a weakened or inactive piece of a germ, so it can practice without getting sick.",
    "Memory|🧠|The body makes <b>antibodies</b> and <b>memory cells</b>. Later, if the real germ comes, the body is ready to fight fast.",
    "Protecting everyone|🏘️|When most people are vaccinated, germs spread less. This is <b>herd immunity</b>. Edward Jenner made the first vaccine, for smallpox."
  ], [
    "Vaccines help the body make...|antibodies|💉||bones,wings",
    "A vaccine contains a weakened or inactive part of a...|germ|🦠||rock,tooth",
    "Immune cells that remember a germ are...|memory cells|🧠||skin cells,fat cells",
    "When most of a community is vaccinated, it is called...|herd immunity|🏘️||solo immunity,air pressure",
    "A booster shot helps the body...|remember longer|💉||forget,grow taller",
    "Vaccines are given to...|prevent disease|🛡️||cause disease,change eye color",
    "Edward Jenner made the first vaccine, against...|smallpox|📜||the flu,a cold",
    "A vaccine trains the...|immune system|🛡️||skeleton,stomach"
  ], "Practice makes the body ready."));
  b.push(L("Allergies", [
    "An overreaction|🤧|An <b>allergy</b> happens when the immune system overreacts to something harmless, called an <b>allergen</b>, such as pollen, dust, or some foods.",
    "Symptoms|👁️|The body releases <b>histamine</b>, which can cause sneezing, itchy eyes or a rash. Allergies are not caused by germs and are not contagious.",
    "Staying safe|🧑‍⚕️|A person with a food allergy should avoid that food, check labels and tell an adult. Doctors can help."
  ], [
    "A harmless thing that triggers an allergy is an...|allergen|🌼||antibody,organ",
    "Pollen comes from...|plants|🌼||rocks,clouds",
    "A chemical released during an allergic reaction is...|histamine|🤧||insulin,calcium",
    "An allergy is an overreaction of the...|immune system|🛡️||skeleton,skin color",
    "A child with a food allergy should...|avoid the food and tell an adult|🥜||eat it anyway,hide it",
    "Are allergies contagious?|no|🤧||yes,only in winter",
    "Hay fever is caused by...|pollen|🌼||bacteria,viruses",
    "A common symptom of an allergy is...|sneezing|🤧||growing taller,glowing"
  ], "Remember allergies are about the immune system overreacting."));
  b.push(L("Mendel and the pea plants", [
    "The garden scientist|🌱|Gregor Mendel was a monk who studied pea plants in the 1800s. He is called the <b>father of genetics</b>.",
    "His experiments|🔬|He crossed tall plants with short plants. All the offspring were tall. The short trait seemed to vanish.",
    "It returned!|📊|When he crossed those tall plants, about 1 in 4 grandchildren were short. The ratio was <b>3 tall : 1 short</b>. He had found dominant and recessive traits."
  ], [
    "Who studied pea plants to learn about heredity?|Gregor Mendel|🌱||Isaac Newton,Marie Curie",
    "Mendel crossed pure tall and pure short plants. The offspring were all...|tall|🌱||short,medium",
    "The hidden trait that came back in the next generation was...|short|🌱||tall,purple",
    "The ratio Mendel found in the next generation was...|3 to 1|📊||5 to 1,1 to 1",
    "Mendel is known as the father of...|genetics|🧬||astronomy,geology",
    "Mendel studied how traits pass from parents to offspring, called...|heredity|🧬||weather,growth only",
    "Why did Mendel use peas?|they grow fast and show clear traits|🌱||they are huge,they never change",
    "The trait that shows up when both are present is called...|dominant|🌱||recessive,missing"
  ], "Think about which trait hid and which one came back."));
  b.push(L("Probability and inheritance", [
    "Chance|🪙|Probability tells how likely something is. A fair coin has a 1/2 chance of heads. Each flip is independent of the one before.",
    "Punnett chances|🔲|If both parents are Bb, each child has a 1/4 (25 percent) chance of bb and a 3/4 (75 percent) chance to show the dominant trait.",
    "Other crosses|🧮|BB x bb gives all Bb. Bb x bb gives half Bb and half bb, so a 50 percent chance of bb."
  ], [
    "The chance of heads on a fair coin is...|1/2|🪙||1/4,1/3",
    "Bb x Bb: chance of a bb child?|25 percent|🔲||50 percent,75 percent",
    "Bb x Bb: chance of showing the dominant trait?|75 percent|🔲||25 percent,100 percent",
    "BB x bb: what will all the children be?|a mix of one big and one small allele|🔲||two big alleles,two small alleles",
    "Bb x bb: chance of a bb child?|50 percent|🔲||25 percent,100 percent",
    "You flipped 3 heads in a row. The chance of heads next is...|1/2|🪙||1/8,0",
    "Chance of two heads in two flips?|1/4|🪙||1/2,1/8",
    "1 out of 4 as a percent is...|25 percent|🧮||14 percent,40 percent"
  ], "Count the boxes in the Punnett square."));
  b.push(L("The lymphatic system", [
    "Another network|🕸️|Besides blood, your body has <b>lymph</b>, a clear fluid that flows in <b>lymph vessels</b> and returns extra fluid to the blood.",
    "Lymph nodes|🫘|Small bean-shaped <b>lymph nodes</b> filter lymph and trap germs. They hold white blood cells that fight infection. They can swell when you are sick.",
    "Helpers|🛡️|The spleen and tonsils are also part of this system. The lymphatic system helps the immune system."
  ], [
    "The clear fluid in lymph vessels is called...|lymph|🕸️||bile,saliva",
    "Small bean-shaped filters in the lymphatic system are...|lymph nodes|🫘||villi,alveoli",
    "Lymph nodes may swell when you are...|sick|🤒||asleep,tall",
    "The lymphatic system returns extra fluid to the...|blood|🩸||bones,hair",
    "Lymph nodes contain white blood cells that fight...|germs|🦠||light,sound",
    "The spleen helps filter...|blood|🩸||air,food",
    "The tonsils in the throat belong to the...|lymphatic system|🕸️||skeletal system,digestive system",
    "The lymphatic system helps the...|immune system|🛡️||skeleton,eyes"
  ], "Think of it as a drain and filter network."));
  b.push(L("Relative dating of fossils", [
    "Layers|🪨|Sediment piles up in layers. Usually, deeper layers are <b>older</b>. This is the law of superposition.",
    "Relative age|📏|<b>Relative dating</b> tells which layer or fossil is older or younger, but not the exact age.",
    "Index fossils|🐚|<b>Index fossils</b>, like trilobites, lived a short time but spread widely. Finding one tells the age of the rock layer. Exact ages come from radioactive dating."
  ], [
    "In undisturbed rock layers, the oldest layer is usually at the...|bottom|🪨||top,side",
    "Relative dating tells which fossil is older, but not its...|exact age|📏||color,size only",
    "Fossils are mostly found in which kind of rock?|sedimentary rock|🪨||volcanic glass,metal",
    "Fossil A is deep in the rock and B is above it. Which is younger?|B|🪨||A,they are equal",
    "A fossil that lived a short time and spread widely is an...|index fossil|🐚||fuel fossil,new fossil",
    "Trilobites are often used as...|index fossils|🐚||fuels,flowers",
    "Dating that gives an exact age using radioactive atoms is...|absolute dating|☢️||relative dating,guess dating",
    "Layers of rock form from piles of...|sediment|🪨||ice cream,metal"
  ], "Deeper layers got buried first."));
  b.push(L("How new species form", [
    "What is a species?|🐴|A <b>species</b> is a group that can breed and have fertile offspring. A horse and a donkey have a mule, but mules usually cannot have babies, so they are different species.",
    "Isolation|🏔️|If a river or mountain splits a population, this is <b>geographic isolation</b>. The groups stop mixing genes.",
    "Speciation|🌳|Over many generations each group adapts to its own place. If they can no longer breed together, a new species has formed. This is <b>speciation</b>."
  ], [
    "A species is a group that can breed and have...|fertile offspring|🐴||no babies,wings",
    "The forming of a new species is called...|speciation|🌳||fossilization,migration",
    "A river or mountain splitting a population causes...|geographic isolation|🏔️||instant extinction,photosynthesis",
    "Isolated groups adapt to different...|environments|🌍||names,calendars",
    "A new species forms when groups can no longer...|interbreed|🌳||eat,sleep",
    "A horse and a donkey are different...|species|🐴||cells,kingdoms",
    "Isolation stops the groups from mixing their...|genes|🧬||food,clothes",
    "Speciation takes...|many generations|⏳||one afternoon,one breath"
  ], "Separation plus time can lead to new species."));
  b.push(L("Geologic time", [
    "Deep time|🌍|Earth is about <b>4.6 billion</b> years old. Scientists divide time into eras. Most of history is the <b>Precambrian</b>.",
    "Three eras|🦕|The <b>Paleozoic</b> had early fish and the first land plants and animals. The <b>Mesozoic</b> was the age of dinosaurs. The <b>Cenozoic</b> is the age of mammals, and we live in it.",
    "A big change|☄️|Dinosaurs (except birds) disappeared about 66 million years ago, at the end of the Mesozoic."
  ], [
    "About how old is Earth?|4.6 billion years|🌍||4.6 million years,46 thousand years",
    "The age of dinosaurs was the...|Mesozoic|🦕||Paleozoic,Cenozoic",
    "We live in the...|Cenozoic|🌍||Mesozoic,Paleozoic",
    "Early fish and the first land plants appeared in the...|Paleozoic|🐟||Cenozoic,Mesozoic",
    "The longest part of Earth's history is the...|Precambrian|⏳||Cenozoic,Mesozoic",
    "A timeline of Earth's history is the geologic...|time scale|📜||weather map,food web",
    "Non-bird dinosaurs disappeared about how long ago?|66 million years|☄️||6 thousand years,66 billion years",
    "Trilobites lived in the...|Paleozoic|🐚||Cenozoic,Mesozoic"
  ], "Remember the order: Paleozoic, Mesozoic, Cenozoic."));
  b.push(L("Coevolution", [
    "Changing together|🤝|<b>Coevolution</b> is when two species change over time in response to each other.",
    "Flowers and pollinators|🐦🌺|Long, tube-shaped flowers and hummingbirds with long beaks evolved together. Bright petals attract bees.",
    "Arms races|🐆|Gazelles get faster, so cheetahs get faster too. Some plants make toxins and some insects evolve resistance."
  ], [
    "Two species changing over time in response to each other is...|coevolution|🤝||extinction,hibernation",
    "Hummingbirds with long beaks and tube-shaped flowers show...|coevolution|🐦||camouflage,germination",
    "Bright petals help flowers attract...|pollinators|🌺||predators,decomposers",
    "If gazelles evolve to run faster, cheetahs may evolve to be...|faster|🐆||slower,invisible",
    "A moth with a very long tongue may match a flower with a very long...|tube|🦋||leaf,root",
    "Coevolution takes...|many generations|⏳||one day,one minute",
    "Plants making toxins can lead insects to evolve...|resistance|🐛||bigger wings only,blue eyes",
    "Both species in coevolution are...|changing|🔄||frozen,identical"
  ], "Both partners change, not just one."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9]]));
  b.push(MIX("Level 14 Challenge", [b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17], b[3], b[7], b[9]]));

  // ================= LEVEL 15 =================
  const c = [];
  c.push(L("Aerobic and anaerobic respiration", [
    "With oxygen|🫁|<b>Aerobic respiration</b> uses oxygen and glucose to make lots of ATP, with carbon dioxide and water as waste. It finishes in the mitochondria.",
    "Without oxygen|💨|<b>Anaerobic respiration</b> (fermentation) happens without oxygen and makes much less energy.",
    "Examples|🍞|Hard-working muscles can make lactic acid. Yeast in dough makes carbon dioxide gas, and the bubbles make bread rise."
  ], [
    "Respiration that uses oxygen is...|aerobic|🫁||anaerobic,static",
    "Respiration without oxygen is...|anaerobic|💨||aerobic,photic",
    "Hard-working muscles can make...|lactic acid|💪||sugar water,oxygen",
    "Yeast fermentation in dough makes bubbles of...|carbon dioxide|🍞||oxygen,helium",
    "Aerobic respiration finishes in the...|mitochondria|🧫||nucleus,cell wall",
    "Which type makes more energy?|aerobic|⚡||anaerobic,they are equal",
    "Bread rises because yeast gives off...|gas|🍞||light,sound",
    "Aerobic respiration needs glucose and...|oxygen|🫁||helium,sand"
  ], "Does the process need oxygen or not?"));
  c.push(L("ATP: the energy currency", [
    "Energy in a molecule|🔋|<b>ATP</b> (adenosine triphosphate) is the molecule cells use to carry energy. It has three phosphate groups.",
    "Spending ATP|💥|When a cell breaks off one phosphate, energy is released and ATP becomes <b>ADP</b>.",
    "Recharging|🔄|Cells use food energy to add a phosphate back and remake ATP. Most ATP is made in the mitochondria."
  ], [
    "The molecule cells use to carry energy is...|ATP|🔋||DNA,RNA",
    "ATP has how many phosphate groups?|three|🔋||one,six",
    "When ATP loses a phosphate it becomes...|ADP|💥||DNA,ATM",
    "Most ATP is made in the...|mitochondria|🧫||nucleus,vacuole",
    "Cells recycle ADP back into...|ATP|🔄||sugar,oxygen",
    "ATP is often called the cell's energy...|currency|💰||storm,bank robber",
    "Cells make ATP using energy from food such as...|glucose|🍬||sand,plastic",
    "Muscle contraction uses...|ATP|💪||helium,metal"
  ], "ATP is like a charged battery. ADP is half-charged."));
  c.push(L("Pedigree charts", [
    "Family patterns|👪|A <b>pedigree</b> is a family tree chart that follows a trait. A square is a male, a circle is a female.",
    "Reading shapes|⬛|A shaded shape has the trait. A line between a square and circle joins mates, and lines down lead to children. Roman numerals I, II, III show generations.",
    "Clues|🔎|If two unaffected parents have an affected child, the trait is recessive and the parents are carriers. A half-shaded shape often marks a carrier."
  ], [
    "In a pedigree, a square stands for a...|male|⬜||female,baby",
    "In a pedigree, a circle stands for a...|female|⭕||male,twin",
    "A shaded shape means the person has the...|trait|⬛||nickname,age",
    "A horizontal line joining a square and a circle shows...|mates|➖||twins,cousins",
    "Lines going down from parents lead to their...|children|⬇️||grandparents,cousins",
    "Roman numerals I, II, III mark...|generations|🔢||genes,diseases",
    "Two unaffected parents have an affected child. The trait is...|recessive|🔎||dominant,not inherited",
    "A half-shaded shape often marks a...|carrier|🔎||twin,grandparent"
  ], "Look at the shapes, the shading and the lines."));
  c.push(L("Incomplete dominance and codominance", [
    "Blending|🌸|In <b>incomplete dominance</b> the heterozygote looks like a blend. Red x white snapdragons give pink flowers.",
    "Both show|🐄|In <b>codominance</b> both alleles show fully. A roan cow has both red and white hairs. Blood type AB has both A and B.",
    "Ratio|🔢|Pink x pink snapdragons give 1 red : 2 pink : 1 white."
  ], [
    "Red and white snapdragons make pink flowers. This is...|incomplete dominance|🌸||codominance,mutation",
    "Both alleles show fully in...|codominance|🐄||incomplete dominance,recessiveness",
    "Blood type AB is an example of...|codominance|🩸||incomplete dominance,a mutation",
    "A roan cow with red and white hairs shows...|codominance|🐄||incomplete dominance,blending only",
    "In incomplete dominance the heterozygote looks like...|a blend|🌸||only one parent,a stranger",
    "Pink x pink snapdragons give what ratio?|1 red : 2 pink : 1 white|🌸||all pink,3 red : 1 white",
    "A speckled black-and-white chicken shows...|codominance|🐔||incomplete dominance,mutation",
    "Red x white snapdragon gives offspring that are all...|pink|🌸||red,white"
  ], "Does the offspring blend, or show both clearly?"));
  c.push(L("Sex chromosomes", [
    "X and Y|🧬|Humans have 23 pairs of chromosomes. One pair decides sex: <b>XX</b> for females and <b>XY</b> for males.",
    "Who decides?|👶|Eggs always carry an X. A sperm carries X or Y. So the chance of a girl or boy is about 50 percent each.",
    "Sex-linked traits|🎨|Genes on the X chromosome are <b>sex-linked</b>. Red-green color blindness is an X-linked recessive trait, and it is more common in males, who have only one X."
  ], [
    "Human male sex chromosomes are...|XY|🧬||XX,YY",
    "Human female sex chromosomes are...|XX|🧬||XY,YY",
    "The gene for red-green color blindness is on the...|X chromosome|🎨||Y chromosome only,nucleus wall",
    "Why is color blindness more common in males?|they have only one X|🎨||they have two Y,they eat more",
    "How many pairs of chromosomes do humans have?|23|🔢||46,12",
    "The chromosome in a sperm that makes a boy is...|Y|👶||X,Z",
    "The chance a baby is a girl is about...|50 percent|👶||25 percent,75 percent",
    "Traits carried on the sex chromosomes are called...|sex-linked|🧬||sea-linked,self-made"
  ], "Remember females XX and males XY."));
  c.push(L("Genetic disorders", [
    "What they are|🧬|A <b>genetic disorder</b> is caused by a change in genes or chromosomes. They are not contagious and not anyone's fault.",
    "Examples|🩸|<b>Sickle cell disease</b> changes the shape of red blood cells. <b>Cystic fibrosis</b> causes thick mucus in the lungs and digestive system. Down syndrome comes from an extra copy of chromosome 21.",
    "Carriers|👪|With recessive disorders, a person needs two copies to be affected. A <b>carrier</b> has one copy and is usually healthy. Genetic counselors help families understand risks."
  ], [
    "Sickle cell disease changes the shape of...|red blood cells|🩸||bones,hair",
    "Cystic fibrosis causes thick...|mucus|🫁||bones,hair",
    "Down syndrome comes from an extra copy of chromosome...|21|🧬||5,46",
    "A disorder caused by changes in genes or chromosomes is...|genetic|🧬||contagious,seasonal",
    "A carrier of a recessive disorder usually is...|healthy|👪||very sick,invisible",
    "Who helps families understand genetic risks?|genetic counselors|🧑‍⚕️||pilots,bakers",
    "Are genetic disorders contagious?|no|🧬||yes,only in schools",
    "A recessive disorder shows up if you inherit...|two copies|🧬||no copies,a vaccine"
  ], "Think about genes, not germs."));
  c.push(L("DNA fingerprinting", [
    "A unique pattern|🧬|Each person has DNA that is different, except identical twins who share the same DNA. A <b>DNA fingerprint</b> is a pattern of bands made from someone's DNA.",
    "How it works|🧪|DNA from a hair, skin cell or saliva is cut into pieces. In <b>gel electrophoresis</b> the pieces separate by size to make the bands.",
    "Uses|👪|Scientists compare patterns to find family relationships, solve puzzles about who left a sample, and identify species."
  ], [
    "A DNA fingerprint is unique to each person, except...|identical twins|🧬||best friends,cousins",
    "DNA samples can come from hair, skin cells or...|saliva|🧪||sunlight,sound",
    "Gel electrophoresis separates DNA pieces by...|size|📏||color,smell",
    "A parent and child share about what part of their DNA?|half|👪||all,none",
    "Scientists can also use DNA to identify...|species|🐾||weather,time",
    "In a DNA fingerprint the pattern is made of...|bands|🧬||dots of paint,words",
    "A DNA match means two samples come from the...|same source|🧪||same color,same year",
    "Identical twins have DNA that is...|the same|👯||totally different,missing"
  ], "The pattern is like a bar code in DNA."));
  c.push(L("The phosphorus cycle", [
    "From rocks|🪨|Phosphorus slowly enters soil and water as rocks weather. Plants take it up, and animals get it by eating plants and other animals.",
    "Not in the air|🌬️|Unlike carbon and nitrogen, phosphorus has no major gas stage. It is needed for DNA, ATP, bones and teeth.",
    "Too much|🟢|Extra fertilizer washes into lakes and feeds algae. A huge <b>algal bloom</b> forms. When the algae die, decomposers use up the oxygen in the water."
  ], [
    "Phosphorus enters soil mainly from weathered...|rocks|🪨||clouds,sound",
    "Unlike carbon, phosphorus has no major stage in the...|atmosphere|🌬️||soil,rocks",
    "Phosphorus is part of DNA, ATP and...|bones|🦴||plastic,rainbows",
    "Too much fertilizer in water causes an algal...|bloom|🟢||famine,fossil",
    "When the algae die, decomposers use up the...|oxygen|💨||sunlight,sand",
    "Plants take in phosphorus from the...|soil|🌱||air,moon",
    "Animals get phosphorus by...|eating|🍽️||breathing,sunbathing",
    "Fertilizer washing into lakes is called nutrient...|runoff|🌧️||drought,erosion only"
  ], "Phosphorus travels through rock, soil, water and living things."));
  c.push(L("Ecosystem services", [
    "What nature gives us|🌳|<b>Ecosystem services</b> are the benefits people get from nature.",
    "Four kinds|🧺|<b>Provisioning</b>: food, water and wood. <b>Regulating</b>: clean water, pollination, flood control. <b>Supporting</b>: soil building. <b>Cultural</b>: beauty and recreation.",
    "Examples|🐝|Wetlands filter water. Bees pollinate crops. Mangrove forests protect coasts from storm waves. Forests absorb carbon dioxide."
  ], [
    "Benefits that people get from nature are called ecosystem...|services|🌳||games,taxes",
    "Wetlands help by filtering...|water|💧||sound,gold",
    "Bees pollinating crops is an example of a...|regulating service|🐝||cultural service,building service",
    "Mangrove forests protect coasts from...|storm waves|🌊||all rain,volcanoes",
    "Food and wood are examples of...|provisioning services|🪵||cultural services,fake services",
    "Hiking and enjoying parks are...|cultural services|🥾||supporting services,provisioning services",
    "Forests help the air by taking in...|carbon dioxide|🌲||helium,smoke",
    "Earthworms and microbes build healthy...|soil|🪱||clouds,glass"
  ], "Think about how each thing helps people."));
  c.push(L("Greenhouse effect", [
    "Heat-trapping gases|🌍|<b>Greenhouse gases</b> such as carbon dioxide, methane and water vapor trap some heat. This natural effect keeps Earth warm enough for life.",
    "Extra gases|🏭|Burning fossil fuels adds extra carbon dioxide, so Earth warms. This is <b>global warming</b>, one part of climate change.",
    "Effects and answers|☀️|Warming melts glaciers and ice sheets, and sea level rises. Using solar and wind energy and planting trees can help. <b>Climate</b> is long-term patterns; weather is day to day."
  ], [
    "Gases that trap heat are called...|greenhouse gases|🌍||sleeping gases,cold gases",
    "Without the natural greenhouse effect, Earth would be much...|colder|🥶||hotter,flatter",
    "Burning fossil fuels releases...|carbon dioxide|🏭||helium,rainbows",
    "Methane is a...|greenhouse gas|🐄||noble gas only,liquid",
    "Melting land ice makes sea level...|rise|🌊||fall,vanish",
    "Forests help by taking in...|carbon dioxide|🌲||methane,helium",
    "Which energy source adds almost no carbon dioxide when working?|solar power|☀️||coal,oil",
    "Long-term patterns of weather in a place are its...|climate|🌤️||tides,seasons only"
  ], "Gases like a blanket hold heat in."));
  c.push(L("Habitat fragmentation", [
    "Broken habitats|🛣️|Roads, farms and cities can split a big habitat into small pieces. This is <b>habitat fragmentation</b>.",
    "Problems|🦌|Small isolated groups have less genetic variety and less room. Animals may struggle to find food or mates.",
    "Solutions|🌉|<b>Wildlife corridors</b>, such as bridges and tunnels, let animals travel safely between habitats. Protecting large connected areas also helps."
  ], [
    "Splitting a habitat into small pieces is called...|fragmentation|🛣️||pollination,germination",
    "Bridges or tunnels that let animals cross are called wildlife...|corridors|🌉||fences,crowds",
    "Small isolated groups often have less genetic...|variety|🧬||food,sleep",
    "Fragmentation is often caused by roads and...|cities|🏙️||clouds,tides",
    "A wildlife corridor lets animals travel between...|habitats|🌉||planets,decades",
    "A main reason species are in danger is habitat...|loss|🌲||growth,music",
    "Protecting large connected areas helps keep...|biodiversity|🌿||traffic,noise",
    "Animals in tiny isolated patches may struggle to find...|mates|🦌||clocks,books"
  ], "Think about what a split-up habitat does to animals."));
  c.push(L("Turgor pressure", [
    "Water inside|💧|Plant cells have a large central <b>vacuole</b> that stores water. A strong <b>cell wall</b> surrounds each cell.",
    "Turgor|🌿|When the vacuole fills with water, it pushes against the wall. This <b>turgor pressure</b> keeps stems and leaves firm.",
    "Wilting|🥀|If a plant loses water, the pressure drops and the plant <b>wilts</b>. Watering lets water move in by osmosis, and the plant becomes firm again."
  ], [
    "Water pressure inside plant cells is called...|turgor pressure|💧||blood pressure,air pressure",
    "A wilted plant has lost...|water|🥀||sunlight,soil",
    "The part of the plant cell that stores water is the central...|vacuole|💧||nucleus,chloroplast",
    "The cell wall helps plant cells avoid...|bursting|🧱||sleeping,growing",
    "Watering a wilted plant makes it firm because cells fill with...|water|💧||sugar only,sand",
    "Water moves into the cell by...|osmosis|💧||evolution,combustion",
    "Salt water around plant cells pulls water out and the plant...|wilts|🧂||grows quickly,sings",
    "Celery sticks crisp in water because the cells take in...|water|🥬||bubbles,plastic"
  ], "Water pressure keeps the plant standing."));
  c.push(L("The gut microbiome", [
    "Tiny helpers|🦠|Trillions of microbes, mostly bacteria, live in your intestines. They are called the <b>gut microbiome</b>.",
    "Jobs|🥦|They help digest <b>fiber</b>, make vitamin K, and crowd out harmful germs by taking up space and food.",
    "Care|🥛|Antibiotics can also kill helpful gut bacteria. Foods like yogurt contain live helpful bacteria, and fiber from plants feeds them."
  ], [
    "The community of microbes in the gut is the...|microbiome|🦠||skeleton,planet",
    "Gut bacteria help digest...|fiber|🥦||plastic,rocks",
    "Gut bacteria help make vitamin...|K|🦠||Z,Q",
    "Helpful bacteria protect us by crowding out harmful...|germs|🛡️||vitamins,foods",
    "Antibiotics may also kill...|helpful bacteria|💊||your bones,your hair",
    "Which food contains live helpful bacteria?|yogurt|🥛||candy,bread crust",
    "Most gut microbes live in the...|large intestine|🦠||lungs,skull",
    "Are all gut bacteria harmful?|no many help us|🦠||yes all of them,only at night"
  ], "Most of the tiny residents are helpers."));
  c.push(L("Social behavior in animals", [
    "Living in groups|🐝|Many animals live in groups where they cooperate. Honeybees live in a hive with one queen who lays eggs, workers and drones.",
    "Teamwork|🐺|Wolves live in packs and hunt together. Ants have a <b>division of labor</b>. Herds and schools of fish are safer in numbers.",
    "Signals|💃|Honeybees do a waggle dance that tells others where flowers are. Meerkats take turns as sentries watching for danger."
  ], [
    "A honeybee dance tells others where to find...|flowers|💃||the moon,rain",
    "Which bee lays the eggs in a hive?|queen|🐝||drone,worker",
    "Wolves live in...|packs|🐺||hives,schools",
    "Fish that swim together form a...|school|🐟||pack,hive",
    "A meerkat sentry watches for...|danger|👀||homework,snow",
    "In an ant colony different ants have different jobs, called division of...|labor|🐜||light,food",
    "Animals in a herd are safer because of strength in...|numbers|🦬||colors,names",
    "Animals working together show...|cooperation|🤝||competition only,silence"
  ], "Think about why groups help animals."));
  c.push(L("Open and closed circulation", [
    "Closed|🩸|In a <b>closed circulatory system</b> blood stays inside vessels. Humans, earthworms, fish, birds and octopuses have this kind.",
    "Open|🦗|In an <b>open circulatory system</b> blood leaves vessels and bathes the organs. Insects, snails and clams have this kind.",
    "Hearts|❤️|Fish hearts have 2 chambers, frogs 3, and birds and mammals 4."
  ], [
    "Humans have what kind of circulatory system?|closed|🧍||open,none",
    "Insects have what kind of circulatory system?|open|🦗||closed,none",
    "Earthworms have what kind of circulatory system?|closed|🪱||open,none",
    "A fish heart has how many chambers?|two|🐟||four,six",
    "A bird heart has how many chambers?|four|🐦||two,three",
    "A frog heart has how many chambers?|three|🐸||two,five",
    "In an open system blood flows into the body cavity and bathes the...|organs|🦗||clouds,paper",
    "Which animal has an open circulatory system?|grasshopper|🦗||octopus,earthworm"
  ], "Does the blood stay in tubes or flow around the organs?"));
  c.push(L("How animals reproduce", [
    "Fertilization|🐟|With <b>external fertilization</b> eggs and sperm meet in water outside the body, like in most fish and frogs. <b>Internal fertilization</b> happens inside the female, as in birds, reptiles and mammals.",
    "Many eggs|🥚|Animals that use external fertilization lay many eggs because many will not survive.",
    "No partner needed|🌱|<b>Asexual reproduction</b> makes offspring identical to the parent. A hydra grows buds, and a planarian worm can regrow from pieces (fragmentation)."
  ], [
    "Fish releasing eggs into the water is an example of...|external fertilization|🐟||internal fertilization,budding",
    "Birds have...|internal fertilization|🐦||external fertilization,asexual only",
    "A hydra reproduces by...|budding|🌱||laying eggs,flying",
    "A planarian can regrow from pieces. This is...|fragmentation|🌱||fertilization,hibernation",
    "Offspring from asexual reproduction are genetically...|identical|👯||different,unknown",
    "Mammal fertilization happens inside the...|mother's body|🐘||water,egg",
    "External fertilization needs...|water|💧||snow,wind only",
    "Why do many animals produce thousands of eggs?|many will not survive|🥚||they like eggs,to fill the sea"
  ], "Where do the egg and sperm meet?"));
  c.push(L("Breathing: gills, tracheae and lungs", [
    "In water|🐟|Fish use <b>gills</b> to take oxygen from water. Many amphibians breathe through their moist skin and their lungs.",
    "Insects|🦗|Insects have a network of tubes called <b>tracheae</b>. Air enters through little holes called <b>spiracles</b>.",
    "Lungs|🫁|Mammals, reptiles and birds breathe with lungs. Birds also have air sacs. Earthworms breathe through their skin."
  ], [
    "Fish take oxygen from water with...|gills|🐟||lungs,spiracles",
    "Insects breathe through holes called...|spiracles|🦗||gills,lips",
    "The air tubes of insects are called...|tracheae|🦗||bronchi,veins",
    "A frog breathes through its skin and its...|lungs|🐸||gills only,spiracles",
    "Earthworms breathe through their...|skin|🪱||gills,wings",
    "Birds have extra...|air sacs|🐦||gills,tails",
    "Whales are mammals, so they breathe air using...|lungs|🐋||gills,skin only",
    "Gills take oxygen from...|water|💧||sand,rocks"
  ], "Match the animal to where it gets its air."));
  c.push(L("Samples and fair data", [
    "Bigger samples|🧪|Testing more individuals gives more reliable results. Testing two plants tells you little; testing fifty tells you a lot more.",
    "Fair choices|🎲|A <b>random sample</b> is chosen by chance, which reduces <b>bias</b>. A <b>control group</b> gets no treatment so you can compare. Repeat trials to check results.",
    "Averages|🔢|The mean is the sum of the values divided by how many there are. A strange value, called an outlier, can pull the mean."
  ], [
    "Testing more individuals makes results more...|reliable|🧪||colorful,sleepy",
    "A group chosen by chance is a...|random sample|🎲||biased pick,favorite group",
    "A group that gets no treatment for comparison is the...|control group|🧪||test tube,final group",
    "Unfair preference that changes results is called...|bias|⚖️||symmetry,density",
    "Which gives better data: 2 plants or 50 plants?|50 plants|🌱||2 plants,they are equal",
    "Repeating an experiment several times helps check...|reliability|🔁||the weather,the clock",
    "What is the mean of 3, 5 and 10?|6|🔢||5,18",
    "A value far from the others is called an...|outlier|📈||insider,average"
  ], "More data and fair choices give better science."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9]]));
  c.push(MIX("Level 15 Challenge", [c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], c[2], c[4], c[7]]));

  Object.assign(LIFE_LEVELS, { 13: a, 14: b, 15: c });
})();
