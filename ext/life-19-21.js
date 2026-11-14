// ext/life-19-21.js  Life Science levels 19-21 (high school biology)
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

  // ================= LEVEL 19 =================
  const a = [];
  a.push(L("pH and buffers", [
    "The pH scale|🧪|The <b>pH scale</b> runs from 0 to 14. Pure water is <b>neutral</b> at pH 7. Below 7 is <b>acidic</b> (more H⁺ ions). Above 7 is <b>basic</b> (fewer H⁺ ions).",
    "Tenfold steps|🔟|Each whole number on the pH scale is a <b>tenfold</b> change in H⁺ concentration. A solution at pH 3 has ten times more H⁺ than one at pH 4.",
    "Buffers|🛡️|A <b>buffer</b> is a chemical that resists changes in pH. Blood is kept near <b>pH 7.4</b> by buffers, because most enzymes work only in a narrow pH range."
  ], [
    "A solution with pH 3 is...|acidic|🍋||basic,neutral",
    "Pure water has a pH of about...|7|💧||3,10",
    "Which solution has the most H⁺ ions?|pH 2|🧪||pH 7,pH 11",
    "Each step on the pH scale is a ... change in H⁺ concentration.|tenfold|🔟||twofold,fixed",
    "A buffer...|resists changes in pH|🛡️||makes things more acidic,turns acids into water",
    "Normal human blood has a pH near...|7.4|🩸||5.4,9.4",
    "A solution with pH 11 is...|basic|🧴||acidic,neutral",
    "Stomach acid has a pH close to...|2|🫃||7,12",
    "Which is the most acidic?|pH 1|⚗️||pH 6,pH 8"
  ], "Remember: low numbers mean lots of H⁺ ions, and 7 is in the middle."));
  a.push(L("Carbohydrates", [
    "Sugars|🍬|<b>Monosaccharides</b> are single sugars such as <b>glucose</b>, fructose and galactose. Two joined together make a <b>disaccharide</b>, like sucrose (glucose + fructose).",
    "Long chains|🌾|<b>Polysaccharides</b> are long chains of sugar. Plants store energy as <b>starch</b> and build cell walls from <b>cellulose</b>. Animals store sugar as <b>glycogen</b>.",
    "Joining and splitting|✂️|Cells join sugars by <b>dehydration synthesis</b> (water is removed). They split them by <b>hydrolysis</b> (water is added)."
  ], [
    "Glucose is a...|monosaccharide|🍬||disaccharide,polysaccharide",
    "Plants store extra sugar as...|starch|🥔||glycogen,cellulose",
    "Animals store extra sugar as...|glycogen|💪||starch,cellulose",
    "Plant cell walls are built from...|cellulose|🌿||glycogen,sucrose",
    "Sucrose is made of glucose and...|fructose|🍬||galactose,starch",
    "Joining two sugars by removing water is called...|dehydration synthesis|💧||hydrolysis,digestion of fats",
    "Splitting a sugar chain by adding water is called...|hydrolysis|✂️||dehydration synthesis,photosynthesis",
    "A chain of many sugar units is a...|polysaccharide|⛓️||monosaccharide,disaccharide",
    "Insect exoskeletons and fungus cell walls contain the carbohydrate...|chitin|🍄||cellulose,glycogen"
  ], "Think about how many sugar units there are, and where each one is used."));
  a.push(L("DNA structure and copying", [
    "The double helix|🧬|DNA is made of <b>nucleotides</b>. Each has a sugar (<b>deoxyribose</b>), a phosphate and a base. Bases pair up: <b>A with T</b> and <b>C with G</b>, held by hydrogen bonds.",
    "Copying DNA|📄|Before a cell divides, <b>helicase</b> unzips the two strands. <b>DNA polymerase</b> then adds matching nucleotides to each old strand.",
    "Semiconservative|♻️|Each new DNA molecule has <b>one old strand and one new strand</b>. This is called <b>semiconservative</b> replication, and it keeps copies very accurate."
  ], [
    "In DNA, adenine (A) pairs with...|thymine|🧬||cytosine,guanine",
    "In DNA, cytosine (C) pairs with...|guanine|🧬||adenine,thymine",
    "Which enzyme unzips the DNA double helix?|helicase|✂️||DNA polymerase,amylase",
    "Which enzyme adds new nucleotides during copying?|DNA polymerase|➕||helicase,lipase",
    "Semiconservative replication means each new DNA has...|one old and one new strand|♻️||two old strands,two new strands",
    "The sugar in DNA is...|deoxyribose|🍬||glucose,ribose",
    "The two DNA strands are held together by...|hydrogen bonds|🔗||peptide bonds,ionic crystals",
    "The strand matching the DNA sequence ATGC would read...|TACG|🧬||ATGC,UACG"
  ], "Remember the base-pairing rules and which enzyme does which job."));
  a.push(L("Codons and anticodons", [
    "Reading the code|📜|<b>mRNA</b> is read in groups of three bases called <b>codons</b>. Each codon codes for one amino acid. <b>AUG</b> is the start codon (it codes for methionine).",
    "Stop signs|🛑|Three codons are <b>stop codons</b>: UAA, UAG and UGA. They do not code for an amino acid; they end the protein.",
    "tRNA|🚚|A <b>tRNA</b> carries an amino acid and has an <b>anticodon</b> that pairs with the mRNA codon on the <b>ribosome</b>. RNA uses <b>uracil (U)</b> instead of thymine."
  ], [
    "How many bases are in one codon?|3|📜||2,4",
    "Which codon is the usual start codon?|AUG|🟢||UAA,GCA",
    "Which of these is a stop codon?|UAA|🛑||AUG,GGC",
    "DNA TAC is transcribed into mRNA...|AUG|🧬||ATG,UAC",
    "An anticodon is found on a...|tRNA|🚚||mRNA,ribosome",
    "tRNA anticodon for the mRNA codon GCA is...|CGU|🚚||CGA,GCA",
    "Translation takes place at a...|ribosome|🏭||nucleus,lysosome",
    "RNA has uracil in place of...|thymine|🧪||adenine,guanine",
    "Each tRNA carries one...|amino acid|🚚||nucleotide,fatty acid"
  ], "Find the matching base for each letter, one at a time."));
  a.push(L("The endomembrane system", [
    "Rough and smooth ER|🏭|The <b>rough ER</b> is covered in ribosomes and makes proteins. The <b>smooth ER</b> makes lipids and helps break down harmful substances.",
    "The Golgi apparatus|📦|The <b>Golgi</b> is like a post office. It modifies, sorts and packages proteins into <b>vesicles</b> to send them where they are needed.",
    "Protein journey|🚚|A protein made for export goes: <b>rough ER, vesicle, Golgi, vesicle, cell membrane</b>. <b>Lysosomes</b> are vesicles full of digestive enzymes."
  ], [
    "Which organelle has ribosomes on its surface?|rough ER|🏭||smooth ER,Golgi apparatus",
    "Which organelle makes lipids?|smooth ER|🧈||rough ER,lysosome",
    "Which organelle sorts and packages proteins?|Golgi apparatus|📦||nucleolus,mitochondrion",
    "Small sacs that carry materials around a cell are...|vesicles|🎈||ribosomes,chromosomes",
    "Which organelle holds digestive enzymes?|lysosome|🧪||Golgi apparatus,ribosome",
    "After the rough ER, a protein usually goes to the...|Golgi apparatus|➡️||nucleus,chloroplast",
    "Where do secreted proteins end up leaving the cell?|cell membrane|🚪||nucleus,smooth ER",
    "Which organelle helps detoxify harmful chemicals?|smooth ER|🛡️||rough ER,central vacuole"
  ], "Follow the protein factory line from start to finish."));
  a.push(L("The cytoskeleton", [
    "A scaffold in the cell|🏗️|The <b>cytoskeleton</b> is a network of protein fibers. It gives a cell its shape, anchors organelles and helps it move.",
    "Three kinds of fibers|🧵|<b>Microtubules</b> are thick tubes that form tracks and the spindle. <b>Microfilaments</b> (actin) are thin and help muscle contraction. <b>Intermediate filaments</b> give strength.",
    "Moving parts|🌀|<b>Cilia</b> and <b>flagella</b> have a core of microtubules. Microfilaments pinch an animal cell in two at the end of cell division."
  ], [
    "Which fibers are the thickest?|microtubules|🧵||microfilaments,intermediate filaments",
    "Which fibers are the thinnest and help muscles contract?|microfilaments|💪||microtubules,intermediate filaments",
    "The spindle that moves chromosomes is made of...|microtubules|🧬||microfilaments,cell wall",
    "Which fibers mainly give a cell mechanical strength?|intermediate filaments|🪢||microtubules,microfilaments",
    "Cilia and flagella have a core of...|microtubules|🌀||cell wall,glycogen",
    "The cytoskeleton helps a cell keep its...|shape|⭕||color,temperature",
    "Which fibers pinch an animal cell in two during division?|microfilaments|✂️||microtubules,cellulose fibers",
    "The cytoskeleton is made of...|protein|🧵||lipid,starch"
  ], "Think thick, thin or strong: each fiber has its own job."));
  a.push(L("Surface area and volume", [
    "Why cells stay small|🔬|A cell takes in food and oxygen through its surface, but it must supply its whole <b>volume</b>. The key number is the <b>surface-area-to-volume ratio</b>.",
    "Doing the math|🧊|A cube with 1 cm sides has area 6 cm² and volume 1 cm³ (ratio 6:1). With 2 cm sides: area 24, volume 8 (ratio 3:1). With 3 cm sides: area 54, volume 27 (ratio 2:1).",
    "Bigger means worse|📉|As an object grows, volume rises faster than surface area, so the ratio <b>falls</b>. That is why cells divide, and why lungs and villi have folds that add surface."
  ], [
    "A cube with 2 cm sides has a volume of...|8 cm³|🧊||4 cm³,24 cm³",
    "A cube with 2 cm sides has a total surface area of...|24 cm²|🧊||8 cm²,12 cm²",
    "A cube with 3 cm sides has a volume of...|27 cm³|🧊||9 cm³,54 cm³",
    "As a cell grows larger, its surface-area-to-volume ratio...|decreases|📉||increases,stays the same",
    "Which cell exchanges materials more easily with its surroundings?|a small cell|🔬||a large cell,they are the same",
    "A cube with 1 cm sides has a surface-area-to-volume ratio of...|6 to 1|🧊||1 to 6,3 to 1",
    "Lungs have many folds to...|increase surface area|🫁||decrease volume,make cells larger",
    "A cube with 2 cm sides has a surface-area-to-volume ratio of...|3 to 1|🧊||6 to 1,24 to 1"
  ], "Compare how quickly the inside grows against how quickly the outside grows."));
  a.push(L("Enzyme inhibitors", [
    "Blocking an enzyme|🚫|An <b>inhibitor</b> slows an enzyme. A <b>competitive</b> inhibitor looks like the substrate and blocks the <b>active site</b>. A <b>noncompetitive</b> inhibitor binds elsewhere and changes the enzyme's shape.",
    "Helpers|🤝|Some enzymes need helpers. <b>Cofactors</b> are often metal ions such as zinc. <b>Coenzymes</b> are organic helpers, and many are made from vitamins.",
    "Feedback inhibition|🔁|In <b>feedback inhibition</b> the final product of a pathway blocks an early enzyme, so the cell does not make too much."
  ], [
    "A competitive inhibitor attaches to the...|active site|🔒||cell wall,product",
    "A noncompetitive inhibitor changes the enzyme's...|shape|🧩||substrate,temperature",
    "Zinc ions that help an enzyme work are examples of...|cofactors|🤝||inhibitors,products",
    "Many coenzymes are made from...|vitamins|🍊||lipids,starches",
    "Feedback inhibition is when the ... blocks an early enzyme.|end product|🔁||first substrate,cell wall",
    "A competitive inhibitor looks like the...|substrate|🔑||enzyme's gene,product's enzyme",
    "Feedback inhibition helps a cell avoid...|making too much product|⚖️||running out of enzymes,absorbing light",
    "A noncompetitive inhibitor binds to a spot that is...|away from the active site|📍||inside the substrate,the active site"
  ], "Ask yourself: does the inhibitor sit in the lock itself, or somewhere else on the enzyme?"));
  a.push(L("Energy: exergonic and endergonic", [
    "Downhill and uphill|⛰️|An <b>exergonic</b> reaction releases energy (downhill), like cellular respiration. An <b>endergonic</b> reaction needs energy added (uphill), like photosynthesis.",
    "ATP couples them|🔋|Cells use <b>energy coupling</b>: the energy released when ATP is broken down powers endergonic reactions such as building proteins.",
    "Energy laws|📏|Energy is never created or destroyed, only transferred. In each transfer some becomes <b>heat</b>, so living things always need new energy from food or sunlight."
  ], [
    "A reaction that releases energy is...|exergonic|⬇️||endergonic,enzymatic only",
    "A reaction that needs an energy input is...|endergonic|⬆️||exergonic,spontaneous only",
    "Photosynthesis is...|endergonic|☀️||exergonic,neutral",
    "Cellular respiration is...|exergonic|🍽️||endergonic,not a reaction",
    "Breaking down ATP releases energy that can power...|endergonic reactions|🔋||only exergonic reactions,nothing at all",
    "In energy transfers, some energy is always lost as...|heat|🔥||matter,new ATP",
    "Energy in the universe is neither created nor...|destroyed|📏||measured,transferred",
    "Why do living things need a constant energy supply?|energy is lost as heat|🌡️||energy gets created inside cells,energy is destroyed by water"
  ], "Does the energy go out of the reaction, or into it?"));
  a.push(L("C3, C4 and CAM plants", [
    "C3 plants|🌾|Most plants (wheat, rice, soybeans) are <b>C3 plants</b>. The enzyme <b>Rubisco</b> grabs CO₂ right away in the Calvin cycle. In hot, dry weather their stomata close and photosynthesis becomes less efficient.",
    "C4 plants|🌽|<b>C4 plants</b> such as corn and sugarcane first capture CO₂ in one set of cells, then pass it to the Calvin cycle in other cells. They do well in hot, sunny places.",
    "CAM plants|🌵|<b>CAM plants</b> such as cacti and pineapples open their stomata at <b>night</b> to take in CO₂, and use it during the day. This saves water."
  ], [
    "Wheat and rice are...|C3 plants|🌾||C4 plants,CAM plants",
    "Corn and sugarcane are...|C4 plants|🌽||C3 plants,CAM plants",
    "Cacti and pineapples are...|CAM plants|🌵||C3 plants,C4 plants",
    "CAM plants open their stomata...|at night|🌙||at noon only,never",
    "The enzyme that first grabs CO₂ in the Calvin cycle is...|Rubisco|🧪||amylase,helicase",
    "Which kind of plant saves the most water in a desert?|CAM plants|🏜️||C3 plants,C4 plants",
    "Why do C3 plants struggle on hot dry days?|stomata close and CO₂ drops|☀️||they make too much oxygen,chloroplasts melt",
    "C4 plants do well in places that are...|hot and sunny|☀️||cold and dark,frozen"
  ], "Think about when each type opens its stomata and how it handles hot weather."));
  a.push(L("Plant mineral nutrition", [
    "Soil minerals|🪴|Plants take minerals from soil through their <b>roots</b>. Fertilizer labels show <b>N-P-K</b>: nitrogen, phosphorus and potassium.",
    "What minerals do|🧰|<b>Nitrogen</b> builds proteins and chlorophyll. <b>Phosphorus</b> is in ATP and DNA. <b>Potassium</b> helps stomata open and close. <b>Magnesium</b> sits at the center of chlorophyll.",
    "Signs of deficiency|🟡|Without enough nitrogen, older leaves turn <b>yellow</b>. Carnivorous plants such as the Venus flytrap live in poor soil and trap insects to get <b>nitrogen</b>."
  ], [
    "The N in N-P-K fertilizer stands for...|nitrogen|🌱||sodium,neon",
    "The P in N-P-K stands for...|phosphorus|🌱||potassium,protein",
    "The K in N-P-K stands for...|potassium|🌱||calcium,krypton",
    "Which mineral is at the center of a chlorophyll molecule?|magnesium|🌿||iron,zinc",
    "Plants mostly absorb minerals through their...|roots|🌱||leaves,flowers",
    "Which mineral lack turns older leaves yellow?|nitrogen|🟡||phosphorus,carbon",
    "A Venus flytrap eats insects to get extra...|nitrogen|🪰||sunlight,water",
    "Growing plants in a nutrient solution without soil is called...|hydroponics|💧||pollination,grafting",
    "Which mineral is part of ATP and DNA?|phosphorus|🧬||potassium,magnesium"
  ], "Match each mineral to the job it does in the plant."));
  a.push(L("Dihybrid crosses", [
    "Two traits at once|🫛|A <b>dihybrid cross</b> follows two traits, such as seed shape (R, r) and seed color (Y, y). A parent <b>RrYy</b> makes four gamete types: RY, Ry, rY and ry.",
    "A 16-box square|🔲|Crossing two RrYy parents gives a 16-box Punnett square. The phenotype ratio is <b>9 : 3 : 3 : 1</b>.",
    "Independent assortment|🎲|Mendel's <b>law of independent assortment</b> says genes for different traits are inherited separately (when they are on different chromosomes)."
  ], [
    "How many different gametes can an RrYy parent make?|4|🫛||2,8",
    "A dihybrid cross Punnett square has how many boxes?|16|🔲||4,8",
    "RrYy × RrYy gives which phenotype ratio?|9 : 3 : 3 : 1|🫛||3 : 1,1 : 2 : 1",
    "What fraction of offspring from RrYy × RrYy show both dominant traits?|9/16|🔲||3/16,1/16",
    "What fraction show both recessive traits?|1/16|🔲||3/16,9/16",
    "How many kinds of gametes can an RRyy parent make?|1|🫛||2,4",
    "The law of independent assortment says genes for different traits...|sort separately|🎲||always stay together,always match",
    "How many kinds of gametes can an RrYY parent make?|2|🫛||1,4"
  ], "List every combination of one letter from each gene."));
  a.push(L("Test crosses and linked genes", [
    "The test cross|🔍|To learn if a plant with a dominant look is <b>homozygous (AA)</b> or <b>heterozygous (Aa)</b>, cross it with a homozygous recessive (aa). All dominant babies suggest AA. About half recessive babies means Aa.",
    "Linked genes|⛓️|Genes close together on the same chromosome are <b>linked</b>. They tend to be inherited together, which breaks the 9:3:3:1 pattern.",
    "Mapping|🗺️|<b>Crossing over</b> can separate linked genes. The farther apart two genes are, the more often they are separated. Scientists use this to make <b>gene maps</b>."
  ], [
    "A test cross uses a parent that is...|homozygous recessive|🔍||homozygous dominant,heterozygous",
    "In a test cross, all offspring show the dominant trait. The unknown parent was probably...|homozygous dominant|🌱||heterozygous,homozygous recessive",
    "In a test cross, about half the offspring show the recessive trait. The unknown parent was...|heterozygous|🌱||homozygous dominant,homozygous recessive",
    "Genes close together on the same chromosome are called...|linked genes|⛓️||sex genes,mutant genes",
    "Linked genes are usually inherited...|together|⛓️||separately,only from fathers",
    "What process can separate linked genes?|crossing over|✂️||fertilization,photosynthesis",
    "Genes that are far apart on a chromosome are separated...|more often|📏||less often,never",
    "Thomas Morgan studied linked genes in...|fruit flies|🪰||pea plants,mice"
  ], "Which parent gives you the clearest view of what the other parent hides?"));
  a.push(L("Epistasis and polygenic traits", [
    "One gene hides another|🎭|In <b>epistasis</b> one gene affects how another gene shows. In Labrador retrievers, one gene decides whether any dark pigment is put in the fur at all, hiding the effect of the gene for black or brown.",
    "Many genes, one trait|📊|<b>Polygenic traits</b> such as height and skin color are controlled by many genes. They show a smooth range called <b>continuous variation</b>, shaped like a bell curve.",
    "One gene, many effects|🌟|In <b>pleiotropy</b>, one gene affects several traits. The sickle-cell gene changes red blood cell shape and also affects many body parts."
  ], [
    "When one gene masks the effect of another gene, it is called...|epistasis|🎭||pleiotropy,linkage",
    "When one gene affects many traits, it is called...|pleiotropy|🌟||epistasis,polygenic inheritance",
    "Height in people is an example of a ... trait.|polygenic|📏||single-gene,sex-linked",
    "Polygenic traits show...|continuous variation|📊||only two types,no variation",
    "A graph of a polygenic trait often looks like a...|bell curve|🔔||straight line,circle",
    "A trait controlled by many genes is...|polygenic|🧬||epistatic only,mitochondrial",
    "The sickle-cell gene affecting several body parts is an example of...|pleiotropy|🩸||epistasis,mitosis",
    "Skin color depends on...|many genes|🎨||one gene,no genes"
  ], "Count the genes: how many are involved, and does one hide another?"));
  a.push(L("Nondisjunction and karyotypes", [
    "Chromosome errors|⚠️|<b>Nondisjunction</b> happens when chromosomes fail to separate properly in meiosis. A gamete may end up with an extra chromosome or one too few.",
    "Karyotypes|🧬|A <b>karyotype</b> is a picture of a person's chromosomes arranged in pairs by size. Humans normally have <b>46 chromosomes</b> (23 pairs).",
    "Examples|🔢|<b>Down syndrome</b> is <b>trisomy 21</b>: three copies of chromosome 21, so 47 chromosomes. <b>Turner syndrome</b> is a female with one X (45). <b>Klinefelter syndrome</b> is a male with XXY (47)."
  ], [
    "Failure of chromosomes to separate in meiosis is called...|nondisjunction|⚠️||crossing over,translation",
    "A picture of chromosomes arranged in pairs is a...|karyotype|📸||pedigree,Punnett square",
    "Normal humans have how many chromosomes in each body cell?|46|🔢||23,48",
    "Down syndrome is caused by an extra copy of chromosome...|21|🧬||12,1",
    "A person with Down syndrome has how many chromosomes?|47|🔢||45,46",
    "Having three copies of one chromosome is called...|trisomy|3️⃣||monosomy,disomy",
    "Turner syndrome means a female has...|one X chromosome|🧬||three X chromosomes,two Y chromosomes",
    "Nondisjunction happens during...|meiosis|✂️||photosynthesis,digestion"
  ], "Think about what is supposed to separate, and how many chromosomes should be there."));
  a.push(L("Survivorship curves", [
    "Who survives?|📈|A <b>survivorship curve</b> shows how many individuals of a species survive to each age.",
    "Three types|🔺|<b>Type I</b> (humans, elephants): few die young, most live to old age. <b>Type II</b> (many birds): the chance of dying is steady. <b>Type III</b> (oysters, many fish, most trees): huge numbers die when very young.",
    "Why it matters|🌳|Type III species make thousands of offspring with little care. Type I species have few young and give them lots of care."
  ], [
    "Humans have which survivorship curve?|Type I|👪||Type II,Type III",
    "Oysters, which make many young that mostly die early, have...|Type III|🦪||Type I,Type II",
    "In a Type II species, the chance of dying is...|steady through life|📏||highest in old age only,highest in infancy only",
    "A Type I species gives its young...|lots of care|🐘||no care,care only at death",
    "What does a survivorship curve show?|how many survive to each age|📈||how fast animals run,how many species there are",
    "Type III species usually produce...|many offspring|🐟||one offspring,no offspring",
    "Elephants are an example of...|Type I|🐘||Type III,Type II",
    "In a Type III curve, most deaths happen...|when young|🐠||in old age,at middle age"
  ], "Ask when, in life, most of the deaths happen."));
  a.push(L("Lab techniques", [
    "Separating mixtures|🔬|A <b>centrifuge</b> spins samples fast so heavier parts sink to the bottom. <b>Chromatography</b> separates pigments or chemicals as they travel along paper.",
    "Measuring|📏|A <b>spectrophotometer</b> measures how much light a sample absorbs. <b>Gel electrophoresis</b> separates DNA by size: smaller pieces travel farther through the gel.",
    "Growing and seeing|🧫|<b>Aseptic technique</b> keeps unwanted microbes out of cultures grown on agar plates. A <b>stain</b> makes parts of cells easier to see under the microscope."
  ], [
    "Which tool spins a sample so the densest parts settle at the bottom?|centrifuge|🌀||spectrophotometer,thermometer",
    "Which technique separates leaf pigments on paper?|chromatography|📄||electrophoresis,centrifugation",
    "Which tool measures how much light a sample absorbs?|spectrophotometer|💡||centrifuge,microscope",
    "In gel electrophoresis, the smaller DNA pieces travel...|farther|🧬||less far,not at all",
    "Gel electrophoresis separates DNA by...|size|📏||color of the gel,taste",
    "Why use aseptic technique?|to keep out unwanted microbes|🧫||to make cells larger,to speed up evolution",
    "Microbes are grown on an agar...|plate|🧫||needle,spindle",
    "A stain is used under the microscope to...|make cell parts easier to see|🔬||kill all the cells,make the image bigger"
  ], "Match the tool to what it measures or separates."));
  a.push(L("Cell junctions", [
    "Cells stay connected|🧱|In animal tissue, cells link together with <b>junctions</b>. <b>Tight junctions</b> seal cells so fluid cannot leak between them, as in the lining of the gut.",
    "Anchors and channels|🔩|<b>Desmosomes</b> are like rivets that hold cells strongly together in skin and heart muscle. <b>Gap junctions</b> are channels that let small molecules and signals pass between neighbors.",
    "In plants|🌿|Plant cells have <b>plasmodesmata</b>: channels through the cell walls that link the cytoplasm of neighbors. Between animal cells, the <b>extracellular matrix</b> (with collagen) holds tissues together."
  ], [
    "Which junction seals cells so fluid cannot leak between them?|tight junction|🚰||gap junction,plasmodesma",
    "Which junction acts like a rivet that holds cells together?|desmosome|🔩||tight junction,gap junction",
    "Which junction lets small molecules pass between neighboring animal cells?|gap junction|🕳️||desmosome,tight junction",
    "Channels through plant cell walls are called...|plasmodesmata|🌿||desmosomes,vesicles",
    "The main protein in the extracellular matrix is...|collagen|🧶||keratin,cellulose",
    "Skin and heart muscle need strong junctions called...|desmosomes|💪||tight junctions,gap junctions",
    "The lining of the gut needs ... to stop leaks.|tight junctions|🚰||plasmodesmata,flagella",
    "Plasmodesmata connect the cytoplasm of neighboring...|plant cells|🌱||animal cells,bacteria"
  ], "Think: seal, rivet or channel?"));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 19 Challenge", [a[0], a[2], a[3], a[5], a[6], a[7], a[9], a[11], a[12], a[14], a[15], a[16], a[17]]));

  // ================= LEVEL 20 =================
  const b = [];
  b.push(L("Hardy-Weinberg", [
    "A model with no change|⚖️|The <b>Hardy-Weinberg</b> model predicts allele frequencies in a population that is <b>not evolving</b>. For two alleles, <b>p + q = 1</b>, and genotypes follow <b>p² + 2pq + q² = 1</b>.",
    "What the letters mean|🔤|<b>p²</b> is the share of homozygous dominant (AA), <b>2pq</b> is the share of heterozygous (Aa) and <b>q²</b> is the share of homozygous recessive (aa).",
    "The rules|📋|The model only holds with <b>no mutation, no gene flow, no natural selection, random mating and a very large population</b>. Real populations break these rules, and that is how evolution happens."
  ], [
    "In the Hardy-Weinberg equation, p + q equals...|1|⚖️||2,0.5",
    "If p = 0.6, then q equals...|0.4|🔢||0.6,1.6",
    "If q = 0.3, the frequency of heterozygotes (2pq) is...|0.42|🧬||0.21,0.09",
    "If q = 0.1, the frequency of homozygous recessives (q²) is...|0.01|🔢||0.1,0.02",
    "If q² = 0.04, then q equals...|0.2|🔢||0.4,0.02",
    "In the equation, 2pq stands for the...|heterozygotes|🧬||homozygous dominants,homozygous recessives",
    "In the equation, p² stands for the...|homozygous dominants|🧬||heterozygotes,homozygous recessives",
    "Which of these breaks Hardy-Weinberg equilibrium?|natural selection|🌿||random mating,a very large population",
    "In a Hardy-Weinberg population, allele frequencies...|stay the same|⚖️||change every year,always reach 50 percent"
  ], "Use p + q = 1 first, then square or double as needed."));
  b.push(L("Reproductive isolation", [
    "What keeps species apart|🚧|Two species stay separate because of <b>reproductive barriers</b>. A species is a group that can interbreed and produce fertile offspring.",
    "Before the zygote|🎵|<b>Prezygotic</b> barriers stop fertilization: living in different <b>habitats</b>, breeding at different <b>times</b>, different courtship <b>songs or dances</b>, flowers shaped for different pollinators, or egg and sperm that do not match.",
    "After the zygote|🐴|<b>Postzygotic</b> barriers act after fertilization. Hybrids may not survive, or may be <b>sterile</b>, like a mule (a horse and donkey cross)."
  ], [
    "A barrier that acts before fertilization is...|prezygotic|1️⃣||postzygotic,hybrid breakdown",
    "A barrier that acts after fertilization is...|postzygotic|2️⃣||prezygotic,behavioral",
    "Two frog species breeding in different seasons shows a ... barrier.|temporal|📅||habitat,gametic",
    "Different courtship songs between two bird species is a ... barrier.|behavioral|🎵||temporal,gametic",
    "A mule is sterile. This is an example of...|hybrid sterility|🐴||habitat isolation,courtship songs",
    "Two species living in different places is ... isolation.|habitat|🏞️||temporal,gametic",
    "Sperm that cannot fertilize another species' eggs is ... isolation.|gametic|🥚||behavioral,temporal",
    "By the biological species concept, a species is a group that can...|interbreed and make fertile offspring|🧬||look exactly alike,live in one place"
  ], "Ask yourself: does the barrier act before or after the zygote forms?"));
  b.push(L("Sexual selection", [
    "Winning mates|🦚|<b>Sexual selection</b> is natural selection for traits that help an animal win a mate, even if the trait makes survival harder.",
    "Two kinds|🦌|In <b>male competition</b>, males fight or show off to each other (antlers, horns). In <b>mate choice</b>, one sex (often females) picks partners by traits like the peacock's bright tail.",
    "Costly signals|✨|Showy traits are a sign of good health, because only a strong animal can afford them. This leads to <b>sexual dimorphism</b>: males and females looking different."
  ], [
    "Selection for traits that help win mates is called...|sexual selection|🦚||artificial selection,genetic drift",
    "A peacock's bright tail is probably the result of...|mate choice|🦚||camouflage,migration",
    "Large antlers used in contests are an example of...|male competition|🦌||mutualism,mimicry",
    "When males and females of a species look different, it is called...|sexual dimorphism|♂️♀️||sexual reproduction only,symbiosis",
    "Showy traits can be a sign of...|good health|💪||old age,low energy",
    "A showy trait that makes survival harder can still spread because it...|helps win mates|✨||helps hide,helps digestion",
    "Sexual selection is a kind of...|natural selection|🌿||genetic drift,extinction",
    "Who does the choosing in many bird species?|the females|🐦||the chicks,the predators"
  ], "Think about who gets more offspring, not who lives the longest."));
  b.push(L("Molecular clocks and DNA evidence", [
    "Comparing DNA|🧬|The more similar the DNA or proteins of two species, the <b>more recently</b> they shared a common ancestor. Humans and chimpanzees share about 98 to 99 percent of their DNA.",
    "Molecular clocks|⏱️|Mutations build up at a fairly steady rate, so counting differences in DNA works like a <b>molecular clock</b>. Fossils of known age are used to set the clock.",
    "Special DNA|👩|<b>Mitochondrial DNA</b> is passed down from mothers, which makes it useful for tracing family lines through many generations."
  ], [
    "Species with very similar DNA probably...|share a recent ancestor|🧬||live in the same place,eat the same food",
    "Humans share about ... of their DNA with chimpanzees.|98 to 99 percent|🐒||50 percent,10 percent",
    "A molecular clock counts...|DNA differences|⏱️||fossil footprints,heartbeats",
    "A molecular clock assumes mutations build up at a...|fairly steady rate|📏||different rate every day,rate of zero",
    "What helps to set (calibrate) a molecular clock?|fossils of known age|🦴||weather reports,human memories",
    "Mitochondrial DNA is inherited from the...|mother|👩||father,both parents equally",
    "Cytochrome c is a protein used to compare species. More differences mean...|an older split|🧪||a younger split,no relation at all",
    "Which pair is likely to have the most similar DNA?|human and chimpanzee|🐒||human and frog,human and oak tree"
  ], "More differences take more time to build up."));
  b.push(L("Mass extinctions", [
    "The Big Five|☄️|Earth's history includes <b>five major mass extinctions</b>, when a large share of species vanished in a geologically short time.",
    "Two famous ones|🌋|The <b>end-Permian</b> extinction, about 252 million years ago, was the worst: roughly 90 percent of ocean species died, probably from huge volcanic eruptions. The <b>end-Cretaceous</b> extinction, 66 million years ago, ended the non-bird dinosaurs after an asteroid impact.",
    "Recovery|🌱|After each mass extinction, surviving groups spread into empty niches. Mammals diversified after the dinosaurs. Many scientists warn that human activity is now causing a new wave of extinctions."
  ], [
    "How many major mass extinctions are called the 'Big Five'?|5|☄️||3,10",
    "Which mass extinction was the largest?|end-Permian|🌋||end-Cretaceous,end-Devonian",
    "About when did the end-Permian extinction happen?|252 million years ago|⏳||66 million years ago,10 thousand years ago",
    "The end-Cretaceous extinction ended the...|non-bird dinosaurs|🦖||trilobites only,first plants",
    "The end-Cretaceous extinction was linked to an...|asteroid impact|☄️||ice age only,new moon",
    "After the dinosaurs died out, which group spread into many niches?|mammals|🐾||trilobites,amphibians only",
    "After a mass extinction, survivors can spread because of...|empty niches|🪹||new oceans,more predators",
    "About how many million years ago did the dinosaurs' extinction occur?|66|⏳||252,2"
  ], "Think about the biggest event and the asteroid event, and when each happened."));
  b.push(L("Origin of life", [
    "Early Earth|🌋|Earth formed about 4.5 billion years ago. The early atmosphere had almost no free oxygen. Life likely began in the oceans, with the oldest fossils about 3.5 billion years old.",
    "Making building blocks|⚡|In 1953 <b>Miller and Urey</b> sent sparks through a flask of gases and water to copy early Earth. It made <b>amino acids</b>, showing life's building blocks can form from simple chemicals.",
    "RNA world|🧬|<b>RNA</b> can store information and also act like an enzyme (a <b>ribozyme</b>). Many scientists think early life used RNA before DNA and proteins. Fatty bubbles called <b>protocells</b> may have been the first cell-like containers."
  ], [
    "About how old is Earth?|4.5 billion years|🌍||4.5 million years,450 billion years",
    "The Miller-Urey experiment produced...|amino acids|⚡||living bacteria,oxygen only",
    "The 'RNA world' idea says early life used ... first.|RNA|🧬||DNA,fat only",
    "An RNA molecule that acts as an enzyme is a...|ribozyme|🧪||ribosome,lysosome",
    "Bubble-like containers that may have been early cells are...|protocells|🫧||chloroplasts,vacuoles",
    "Early Earth's atmosphere had almost no free...|oxygen|💨||nitrogen,water vapor",
    "Which living things first filled the air with oxygen?|cyanobacteria|🦠||dinosaurs,mosses",
    "The oldest known fossils are about ... years old.|3.5 billion|🪨||3.5 million,350 thousand"
  ], "Think about what the earliest chemistry needed and what the atmosphere lacked."));
  b.push(L("How prokaryotes get energy", [
    "Making or eating|🍽️|<b>Autotrophs</b> make their own food. <b>Heterotrophs</b> must get food from other living things. Bacteria are very varied, so they use many energy sources.",
    "Four lifestyles|🌞|<b>Photoautotrophs</b> (cyanobacteria) use light. <b>Chemoautotrophs</b> use chemicals like sulfur compounds, as around deep-sea vents. <b>Chemoheterotrophs</b> (most bacteria, including decomposers) eat organic matter.",
    "Oxygen needs|💨|<b>Aerobes</b> need oxygen. <b>Anaerobes</b> live without it, and some are harmed by oxygen. Some bacteria can do both."
  ], [
    "An organism that makes its own food is an...|autotroph|🌿||heterotroph,omnivore",
    "Cyanobacteria use light, so they are...|photoautotrophs|☀️||chemoautotrophs,chemoheterotrophs",
    "Bacteria near deep-sea vents that use sulfur chemicals are...|chemoautotrophs|🌋||photoautotrophs,chemoheterotrophs",
    "Most bacteria that break down dead matter are...|chemoheterotrophs|🍂||photoautotrophs,chemoautotrophs",
    "An organism that cannot make its own food is a...|heterotroph|🍽️||autotroph,producer",
    "Anaerobes can live...|without oxygen|🚫||only in oxygen,only in light",
    "Aerobes need...|oxygen|💨||sulfur,nitrogen gas",
    "Bacteria that use light and make sugar are most like...|plants|🌿||fungi,animals"
  ], "Ask: where does the energy come from, and where does the carbon come from?"));
  b.push(L("Bacterial shapes and Gram stain", [
    "Three shapes|🔴|Bacteria have three common shapes: <b>cocci</b> (round), <b>bacilli</b> (rod-shaped) and <b>spirilla</b> (spiral).",
    "Cell walls|🧱|Most bacterial walls contain <b>peptidoglycan</b>. A <b>Gram stain</b> sorts bacteria into two groups by wall type.",
    "Gram stain colors|🟣|<b>Gram-positive</b> bacteria have a thick peptidoglycan wall and stain <b>purple</b>. <b>Gram-negative</b> bacteria have a thin wall and an outer membrane, and stain <b>pink</b>."
  ], [
    "Round bacteria are called...|cocci|🔴||bacilli,spirilla",
    "Rod-shaped bacteria are called...|bacilli|💊||cocci,spirilla",
    "Spiral bacteria are called...|spirilla|🌀||cocci,bacilli",
    "Gram-positive bacteria stain...|purple|🟣||pink,green",
    "Gram-negative bacteria stain...|pink|🌸||purple,yellow",
    "Which wall material do most bacteria have?|peptidoglycan|🧱||cellulose,chitin",
    "Gram-positive bacteria have a ... wall.|thick|🧱||thin,missing",
    "A Gram stain is used to...|sort bacteria by wall type|🔬||measure bacteria speed,count their legs"
  ], "Thick wall holds the dark stain; thin wall lets it wash away."));
  b.push(L("Alternation of generations", [
    "Two bodies, one life|🔄|Plants alternate between two stages. The <b>sporophyte</b> is <b>diploid (2n)</b> and makes <b>spores</b> by meiosis. The <b>gametophyte</b> is <b>haploid (n)</b> and makes eggs and sperm by mitosis.",
    "Which stage is bigger|🌿|In <b>mosses</b> the green gametophyte is the main plant. In <b>ferns</b> and seed plants the sporophyte is the main plant. In flowering plants the gametophytes are tiny and live inside the flower.",
    "The cycle|♾️|Spores grow into gametophytes. Gametes join (fertilization) to make a diploid zygote. The zygote grows into a sporophyte, which makes more spores."
  ], [
    "The sporophyte stage is...|diploid|2️⃣||haploid,triploid",
    "The gametophyte stage is...|haploid|1️⃣||diploid,tetraploid",
    "Spores are made by...|meiosis|✂️||mitosis,fertilization",
    "Gametes in the gametophyte are made by...|mitosis|✂️||meiosis,budding",
    "In mosses, the main green plant is the...|gametophyte|🌿||sporophyte,zygote",
    "In ferns, the main plant is the...|sporophyte|🌿||gametophyte,spore",
    "Fertilization makes a diploid...|zygote|🥚||spore,gametophyte",
    "A spore grows into a...|gametophyte|🌱||sporophyte,flower directly"
  ], "Remember: spores come from meiosis, gametes come from mitosis."));
  b.push(L("Double fertilization", [
    "Pollen tube|🌸|In a flowering plant, a pollen grain lands on the stigma and grows a <b>pollen tube</b> down to the ovule. Two sperm nuclei travel through it.",
    "Two fusions|2️⃣|One sperm fuses with the <b>egg</b> to make the diploid <b>zygote</b> (the future embryo). The other fuses with two <b>polar nuclei</b> to make the triploid <b>endosperm</b>, a food store for the embryo.",
    "Seeds and fruits|🍎|The ovule becomes the <b>seed</b>. The ovary becomes the <b>fruit</b>. This double fertilization is unique to flowering plants."
  ], [
    "How many sperm nuclei take part in double fertilization?|2|2️⃣||1,4",
    "One sperm nucleus fuses with the egg to make the...|zygote|🥚||endosperm,fruit",
    "The other sperm nucleus helps make the...|endosperm|🌾||seed coat,pollen tube",
    "The endosperm is...|triploid (3n)|3️⃣||haploid (n),diploid (2n)",
    "The endosperm provides ... for the embryo.|food|🍞||sunlight,hormones only",
    "After fertilization, the ovule becomes the...|seed|🌰||fruit,petal",
    "After fertilization, the ovary becomes the...|fruit|🍎||seed,stigma",
    "The tube that carries sperm to the ovule is the...|pollen tube|🌸||stem,xylem"
  ], "Two sperm, two different targets."));
  b.push(L("Chordates", [
    "Four key features|🐟|Every chordate has four features at some time in its life: a <b>notochord</b> (stiff rod), a <b>dorsal hollow nerve cord</b>, <b>pharyngeal slits</b> and a <b>post-anal tail</b>.",
    "Invertebrate chordates|🫧|<b>Tunicates</b> (sea squirts) and <b>lancelets</b> are chordates without a backbone. Their features are easy to see in the larva.",
    "Vertebrates|🦴|In <b>vertebrates</b> a backbone of vertebrae replaces the notochord. Humans have pharyngeal slits and a tail only as embryos."
  ], [
    "A stiff rod along the back of a chordate embryo is the...|notochord|📏||spinal cord,pharynx",
    "The nerve cord of a chordate is located on the ... side.|dorsal (back)|⬆️||ventral (belly),left",
    "Which is a chordate without a backbone?|lancelet|🐟||earthworm,jellyfish",
    "In vertebrates, the notochord is replaced by...|vertebrae|🦴||a shell,a tail",
    "How many key chordate features are there?|4|4️⃣||2,6",
    "Sea squirts are...|tunicates|🫧||echinoderms,annelids",
    "Which is NOT a chordate feature?|exoskeleton of chitin|🦐||notochord,post-anal tail",
    "Humans show pharyngeal slits...|as embryos|👶||as adults only,never"
  ], "Look for the stiff rod, the back-side nerve cord, the slits and the tail."));
  b.push(L("Embryonic development", [
    "From one cell to many|🥚|A <b>zygote</b> divides quickly in <b>cleavage</b> without growing bigger. This forms a hollow ball of cells called a <b>blastula</b>.",
    "Gastrulation|🌀|In <b>gastrulation</b> the blastula folds inward and forms three layers called <b>germ layers</b>.",
    "Three germ layers|🧱|<b>Ectoderm</b> (outer) makes skin and the nervous system. <b>Mesoderm</b> (middle) makes muscles, bones and blood. <b>Endoderm</b> (inner) makes the lining of the gut and lungs."
  ], [
    "Rapid early cell divisions of the zygote are called...|cleavage|✂️||gastrulation,pollination",
    "A hollow ball of cells in an early embryo is the...|blastula|⚪||gastrula,zygote",
    "The process that makes three germ layers is...|gastrulation|🌀||cleavage,fertilization",
    "The nervous system forms from the...|ectoderm|🧠||mesoderm,endoderm",
    "Muscles and bones form from the...|mesoderm|💪||ectoderm,endoderm",
    "The lining of the gut forms from the...|endoderm|🫃||ectoderm,mesoderm",
    "How many germ layers does an embryo form?|3|3️⃣||2,5",
    "The skin's outer layer forms from the...|ectoderm|🧴||mesoderm,endoderm"
  ], "Outer, middle, inner: which layer builds which body part?"));
  b.push(L("Innate immunity", [
    "Fast, general defenses|🛡️|<b>Innate immunity</b> is present from birth and works the same against all germs. The first line is <b>barriers</b>: skin, mucus, tears (with the enzyme lysozyme) and stomach acid.",
    "Inside the body|🦠|<b>Phagocytes</b> (such as macrophages) engulf germs. <b>Inflammation</b> brings more blood and defenders to a wound. A <b>fever</b> can slow germs. <b>Natural killer cells</b> destroy infected cells.",
    "Not specific|⏩|Innate immunity is fast but does not remember a germ. <b>Adaptive immunity</b> (lymphocytes and antibodies) is slower but specific and has memory."
  ], [
    "Which is part of the first line of innate defense?|skin|🧴||antibodies,T cells",
    "Cells that engulf germs are called...|phagocytes|🦠||red blood cells,platelets",
    "Tears contain an enzyme called...|lysozyme|👁️||amylase,pepsin",
    "Redness and swelling around a cut is called...|inflammation|🔴||metamorphosis,mutation",
    "Innate immunity works...|the same against all germs|🛡️||only against one germ,only after vaccination",
    "Which immunity has memory?|adaptive immunity|🧠||innate immunity,skin",
    "Stomach acid defends the body by...|killing many germs|🫃||making antibodies,carrying oxygen",
    "Natural killer cells destroy...|infected cells|⚔️||red blood cells,healthy bone"
  ], "Innate means built-in and quick; adaptive means learned."));
  b.push(L("Muscle contraction", [
    "Inside a muscle fiber|💪|A muscle fiber contains bundles called <b>myofibrils</b> made of repeating units called <b>sarcomeres</b>. Thin <b>actin</b> filaments and thick <b>myosin</b> filaments overlap.",
    "Sliding filaments|↔️|Myosin heads grab actin and pull, sliding the actin inward. The filaments themselves do not shorten, but the <b>sarcomere</b> does.",
    "Fuel and signal|⚡|A nerve signal releases <b>calcium ions</b> inside the fiber, which lets myosin bind actin. <b>ATP</b> is needed to release and reset the myosin heads."
  ], [
    "The repeating unit of a muscle fiber is the...|sarcomere|💪||neuron,nephron",
    "Thin filaments in a sarcomere are made of...|actin|🧵||myosin,collagen",
    "Thick filaments in a sarcomere are made of...|myosin|🧵||actin,keratin",
    "During contraction, the sarcomere gets...|shorter|⬅️||longer,wider only",
    "Which ion lets myosin bind actin?|calcium|🦴||sodium,iron",
    "Which molecule powers the myosin heads?|ATP|🔋||DNA,glucose only",
    "This model of muscle action is called the ... theory.|sliding filament|↔️||lock-and-key,germ",
    "Myosin heads pull on the...|actin filaments|🤏||bones directly,nerves"
  ], "Think about which filament pulls and which one slides."));
  b.push(L("Action potentials", [
    "A nerve signal|⚡|A neuron at rest is about <b>-70 mV</b> inside (its <b>resting potential</b>), kept by the sodium-potassium pump. A strong enough stimulus reaches the <b>threshold</b>.",
    "Up and down|📈|<b>Depolarization</b>: sodium (Na⁺) channels open and Na⁺ rushes in. <b>Repolarization</b>: potassium (K⁺) channels open and K⁺ flows out, returning the neuron to rest.",
    "All or nothing|🏃|An action potential is <b>all-or-nothing</b>: it either happens fully or not at all. <b>Myelin</b> on axons makes it jump between gaps (nodes of Ranvier), so signals travel faster."
  ], [
    "The ion that rushes in during depolarization is...|sodium|🧂||potassium,calcium",
    "The ion that flows out during repolarization is...|potassium|🍌||sodium,chloride",
    "The stimulus must reach the ... to start an action potential.|threshold|🎯||nucleus,axon tip",
    "An action potential is described as...|all-or-nothing|⚡||gradual,optional",
    "The pump that keeps the resting potential is the...|sodium-potassium pump|⚙️||calcium pump only,hydrogen engine",
    "Myelin makes signals travel...|faster|🏃||slower,backward",
    "The gaps in the myelin sheath are called...|nodes of Ranvier|🔗||synapses,dendrites",
    "A neuron at rest is about ... inside.|-70 mV|🔋||+70 mV,0 mV"
  ], "Which ion moves in first, and which one moves out afterwards?"));
  b.push(L("Kin selection", [
    "Helping relatives|🐿️|Some animals help others at a cost to themselves, which is called <b>altruism</b>. Ground squirrels give alarm calls that warn nearby relatives, even though calling can attract a predator.",
    "Why it can evolve|🧬|Relatives share genes. A full sibling shares about <b>50 percent</b> of its genes on average. Helping a relative survive helps copies of your own genes spread. This is <b>kin selection</b>.",
    "Inclusive fitness|🐝|<b>Inclusive fitness</b> counts the offspring you raise plus the help you give to relatives. Worker bees are sterile but help the queen, their mother, raise their sisters."
  ], [
    "Behavior that helps others at a cost to oneself is...|altruism|🤝||competition,camouflage",
    "Helping relatives so shared genes spread is called...|kin selection|🧬||sexual selection,genetic drift",
    "A full sibling shares about ... of your genes on average.|50 percent|👫||10 percent,100 percent",
    "Ground squirrel alarm calls mainly help...|nearby relatives|🐿️||predators,unrelated plants",
    "Worker honeybees help raise their...|sisters|🐝||predators,fathers",
    "Inclusive fitness counts your own offspring plus...|help given to relatives|➕||your height,your age",
    "Altruism is more likely toward...|close relatives|👪||strangers only,predators",
    "Worker bees being sterile but helpful is explained by...|kin selection|🐝||mimicry,metamorphosis"
  ], "Who shares your genes, and how much?"));
  b.push(L("Measuring biodiversity", [
    "Two ideas|🌳|<b>Species richness</b> is the number of different species in an area. <b>Species evenness</b> is how equally the individuals are spread among those species.",
    "Diversity index|🧮|A <b>diversity index</b> (like Simpson's) combines richness and evenness. A forest with 10 species of equal numbers is more diverse than one where a single species makes up 95 percent of the trees.",
    "Sampling|📦|Scientists count organisms in small sample areas such as a <b>quadrat</b> (a square frame) and use the results to estimate the whole community."
  ], [
    "The number of different species in an area is its...|species richness|🔢||species evenness,biomass",
    "How equally individuals are divided among species is...|species evenness|⚖️||species richness,succession",
    "A community with 10 species in equal numbers has ... evenness.|high|⚖️||low,no",
    "A forest where one species is 95 percent of the trees has ... evenness.|low|🌲||high,perfect",
    "A square frame used for sampling plants is a...|quadrat|⬜||transect needle,quarry",
    "Which area is more diverse?|20 species|🌿||5 species,1 species",
    "Simpson's index combines richness and...|evenness|🧮||temperature,height",
    "Scientists sample small areas so they can...|estimate the whole community|📊||count every single cell,avoid all error"
  ], "Diversity needs lots of species and a fair spread of individuals."));
  b.push(L("PCR and sequencing", [
    "Copying DNA in a tube|🧪|<b>PCR</b> (polymerase chain reaction) makes millions of copies of a small piece of DNA. It uses <b>primers</b> and a heat-stable enzyme, <b>Taq polymerase</b>, from a bacterium found in hot springs.",
    "Three steps per cycle|🌡️|<b>Denature</b>: heat to about 95 degrees C to separate the strands. <b>Anneal</b>: cool so the primers attach. <b>Extend</b>: Taq polymerase builds new strands. Each cycle <b>doubles</b> the DNA.",
    "Reading DNA|📖|<b>DNA sequencing</b> finds the exact order of bases in a piece of DNA. Sequencing a whole genome helps us compare species and find genes."
  ], [
    "PCR is used to...|copy DNA|🧪||digest food,stain cells",
    "In PCR, heating separates the...|DNA strands|🌡️||proteins into sugars,cell walls",
    "Short DNA pieces that start copying are called...|primers|📍||vaccines,lysosomes",
    "The enzyme used in PCR comes from a bacterium living in...|hot springs|♨️||the deep ocean ice,human skin",
    "Each PCR cycle ... the amount of DNA.|doubles|✖️||halves,destroys",
    "Starting with 1 copy, after 5 cycles there are...|32|🔢||10,25",
    "Starting with 1 copy, after 3 cycles there are...|8|🔢||6,9",
    "DNA sequencing finds the order of...|bases|🔤||amino acids only,chromosomes only"
  ], "Each cycle doubles the number, so think powers of 2."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 20 Challenge", [b[0], b[1], b[3], b[4], b[5], b[8], b[9], b[11], b[12], b[14], b[15], b[17], a[2], a[11], a[14], a[16]]));

  // ================= LEVEL 21 =================
  const c = [];
  c.push(L("Recombinant DNA", [
    "Molecular scissors|✂️|<b>Restriction enzymes</b> cut DNA at specific short sequences. Many leave short single-stranded \"sticky ends\" that can pair with matching ends from other DNA.",
    "Molecular glue|🧴|<b>DNA ligase</b> seals pieces of DNA together. A gene can be cut out of one organism and joined into a <b>plasmid</b>, which acts as a <b>vector</b> to carry it into a bacterium.",
    "Useful products|💉|This makes <b>recombinant DNA</b>. Bacteria with a human insulin gene make human insulin for people with diabetes. Bacteria taking up DNA is called <b>transformation</b>."
  ], [
    "Enzymes that cut DNA at specific sequences are...|restriction enzymes|✂️||ligases,polymerases",
    "The enzyme that seals DNA pieces together is...|DNA ligase|🧴||helicase,restriction enzyme",
    "A plasmid used to carry a gene into a cell is a...|vector|🚚||primer,ribosome",
    "DNA made by joining DNA from different sources is...|recombinant DNA|🧬||mitochondrial DNA,junk RNA",
    "Bacteria can be made to produce human...|insulin|💉||hair,skin cells",
    "Short single-stranded ends left by some cuts are called...|sticky ends|🔗||blunt caps,telomeres",
    "When bacteria take up outside DNA, it is called...|transformation|🦠||translation,transcription",
    "A small circular DNA ring in bacteria is a...|plasmid|⭕||chromatid,centromere"
  ], "Think scissors, glue and delivery truck."));
  c.push(L("Genomes and bioinformatics", [
    "The Human Genome Project|📚|The <b>Human Genome Project</b> finished reading the human genome in 2003. It has about <b>3 billion base pairs</b> and roughly <b>20,000 genes</b>.",
    "Mostly not genes|🔍|Only about 1 to 2 percent of human DNA codes for proteins. The rest includes control regions, RNA genes and repeated sequences.",
    "Computers help|💻|<b>Bioinformatics</b> uses computers to store and compare huge amounts of DNA data. Comparing genomes shows how species are related and which genes do which jobs."
  ], [
    "A genome is an organism's...|complete set of DNA|📚||set of proteins,set of cells",
    "About how many base pairs are in the human genome?|3 billion|🔢||3 thousand,3 million",
    "About how many genes do humans have?|20,000|🧬||200,2 million",
    "What share of human DNA codes for proteins?|about 1 to 2 percent|📊||about 98 percent,about 50 percent",
    "Using computers to study biological data is called...|bioinformatics|💻||biomechanics,biopsy",
    "The Human Genome Project was completed in...|2003|📅||1953,2023",
    "Comparing genomes of species can show how they are...|related|🌳||colored,fed",
    "Most human DNA is...|not protein-coding|🧬||all genes for proteins,only mitochondrial"
  ], "Think about big numbers, and how much of the DNA actually makes proteins."));
  c.push(L("Epigenetics", [
    "Switches on the DNA|🔘|<b>Epigenetic</b> changes are chemical tags on DNA or on the proteins around it (such as <b>methylation</b>). They switch genes on or off without changing the DNA <b>sequence</b>.",
    "Same DNA, different cells|🧫|Every body cell has the same DNA, but a muscle cell and a nerve cell use different genes. Epigenetic tags help each cell type keep its pattern.",
    "Environment effects|🌦️|Diet, stress and other conditions can alter epigenetic tags. Identical twins start with the same DNA but their tags can drift apart as they get older. Some tags can be passed on when cells divide."
  ], [
    "Epigenetic tags change...|which genes are active|🔘||the DNA sequence,the number of chromosomes",
    "Methylation is an example of an...|epigenetic tag|🏷️||mutation,antibody",
    "Epigenetic changes alter the DNA sequence.|false|❌||true,only in plants",
    "A muscle cell and a nerve cell differ mainly because they...|use different genes|🧫||have different DNA,have no genes",
    "Identical twins can differ over time partly because of...|epigenetic changes|👯||different base pairs,different species",
    "Epigenetic tags can be affected by...|environment|🌦️||only mutations,nothing",
    "Methyl groups attached to DNA usually ... gene activity.|reduce|🔇||increase,copy",
    "Epigenetic tags can be copied when a cell...|divides|✂️||sleeps,breathes"
  ], "The words are about switches, not about spelling changes."));
  c.push(L("How bacteria swap genes", [
    "No sex, but gene swaps|🔄|Bacteria reproduce by <b>binary fission</b>, which makes identical copies. They can still share genes in three ways.",
    "Three ways|🧬|<b>Transformation</b>: a cell takes up DNA from its surroundings. <b>Transduction</b>: a virus carries bacterial DNA from one cell to another. <b>Conjugation</b>: one cell passes a plasmid to another through a tube called a <b>pilus</b>.",
    "Why it matters|💊|These swaps can quickly spread useful genes, such as antibiotic resistance, across a bacterial population."
  ], [
    "Bacteria normally reproduce by...|binary fission|✂️||mitosis with spindles,pollination",
    "A cell taking up DNA from its surroundings is...|transformation|🧪||conjugation,transduction",
    "A virus carrying bacterial DNA between cells is...|transduction|🦠||transformation,conjugation",
    "Passing a plasmid through a pilus is...|conjugation|🔗||transduction,fission",
    "The tube used in conjugation is the...|pilus|🧵||flagellum,capsule",
    "Gene swapping helps spread...|antibiotic resistance|💊||photosynthesis,flowers",
    "Which method involves a virus?|transduction|🦠||transformation,conjugation",
    "Binary fission produces cells that are...|genetically identical|👯||very different,always larger"
  ], "Pick the method by asking: from the environment, by a virus, or by direct contact?"));
  c.push(L("Bacterial growth", [
    "Doubling|✖️|With plenty of food, a bacterial population grows <b>exponentially</b>: each cell divides, so numbers double every <b>generation time</b>. Some bacteria double every 20 minutes.",
    "Doing the math|🧮|If 1 bacterium doubles every 20 min: after 20 min there are 2, after 40 min 4, after 60 min 8, after 2 hours 64. The number of doublings is time divided by generation time.",
    "Growth phases|📈|A culture goes through the <b>lag</b> phase (adjusting), the <b>log</b> phase (fast growth), the <b>stationary</b> phase (growth equals death as food runs out) and the <b>death</b> phase."
  ], [
    "One bacterium doubling every 20 minutes becomes ... after 1 hour.|8|✖️||3,6",
    "One bacterium doubling every 20 minutes becomes ... after 40 minutes.|4|✖️||2,6",
    "One bacterium doubling every 20 minutes becomes ... after 2 hours.|64|✖️||12,36",
    "One bacterium doubling every 30 minutes becomes ... after 2 hours.|16|✖️||8,4",
    "Starting with 4 bacteria, after 3 doublings there are...|32|✖️||12,16",
    "The phase of fast, steady doubling is the ... phase.|log|📈||lag,stationary",
    "The phase where food is used up and growth equals death is the ... phase.|stationary|⏸️||lag,log",
    "The generation time is the time needed to...|double the population|⏱️||use up all food,stop dividing"
  ], "Count how many doublings fit into the time."));
  c.push(L("How hormones work", [
    "Two kinds|✉️|<b>Hormones</b> are chemical messages carried by blood. Only <b>target cells</b> with the right receptor respond.",
    "Steroid hormones|🧈|<b>Steroid</b> hormones (like cortisol) are made from cholesterol, are fat-soluble and pass through the cell membrane. They bind receptors <b>inside</b> the cell and change which genes are used.",
    "Peptide hormones|🧩|<b>Peptide</b> hormones (like insulin) are water-soluble and cannot cross the membrane. They bind receptors on the <b>cell surface</b> and trigger a chain of signals inside the cell, using a <b>second messenger</b> such as cAMP."
  ], [
    "Hormones are carried around the body by...|blood|🩸||nerves,air",
    "Cells that respond to a hormone are the...|target cells|🎯||stem cells,guard cells",
    "Which hormone type can pass through the cell membrane?|steroid|🧈||peptide,none",
    "Insulin is a ... hormone.|peptide|🧩||steroid,plant",
    "Cortisol is a ... hormone.|steroid|🧈||peptide,bacterial",
    "Peptide hormones bind to receptors on the...|cell surface|🔘||nucleus,DNA directly",
    "A molecule like cAMP that relays the signal inside the cell is a...|second messenger|📨||first hormone,steroid",
    "Steroid hormone receptors are located...|inside the cell|🏠||only on the membrane,outside the body"
  ], "Fat-soluble goes through the membrane; water-soluble stays outside."));
  c.push(L("Digestive enzymes", [
    "Breaking down food|🍞|Different enzymes digest different foods. <b>Amylase</b> (saliva and pancreas) breaks starch into sugars. <b>Pepsin</b> in the stomach breaks proteins. <b>Lipase</b> breaks fats.",
    "Right place, right pH|🧪|Pepsin works best in the very acidic stomach (about pH 2). In the small intestine, bicarbonate makes the contents basic, and enzymes such as <b>trypsin</b> (protein) and pancreatic amylase and lipase work there.",
    "Bile helps|🟢|<b>Bile</b> from the liver does not break chemical bonds. It <b>emulsifies</b> fat into tiny droplets so lipase has more surface to work on."
  ], [
    "Amylase digests...|starch|🍞||protein,fat",
    "Pepsin digests...|protein|🥩||starch,fat",
    "Lipase digests...|fats|🧈||starch,proteins",
    "Pepsin works best in...|the stomach|🫃||the mouth,the large intestine",
    "Bile does what to fats?|emulsifies them|🟢||turns them into proteins,burns them",
    "Which enzyme in the small intestine digests proteins?|trypsin|🧪||amylase,lipase",
    "The small intestine contents are made basic by...|bicarbonate|🧂||pepsin,bile salts only",
    "Bile is made by the...|liver|🫀||stomach,mouth"
  ], "Match the enzyme to its food: starch, protein or fat."));
  c.push(L("Hemoglobin and oxygen", [
    "Carrying oxygen|🩸|<b>Hemoglobin</b> in red blood cells has four heme groups, each with an <b>iron</b> atom that binds an oxygen molecule. One hemoglobin can carry up to <b>4 O₂</b>.",
    "Releasing oxygen|🏃|In busy muscles there is more CO₂ and acid, which makes hemoglobin <b>release more oxygen</b>. This is the <b>Bohr effect</b>. Muscles also store oxygen with <b>myoglobin</b>.",
    "Adjusting and risks|⛰️|At high altitude the body makes more red blood cells. Carbon monoxide (from faulty heaters and car exhaust) binds hemoglobin very tightly and blocks oxygen, which is why homes need detectors."
  ], [
    "Hemoglobin contains which metal?|iron|🧲||zinc,copper",
    "How many oxygen molecules can one hemoglobin carry?|4|4️⃣||1,8",
    "The Bohr effect says more CO₂ and acid make hemoglobin...|release more oxygen|🏃||hold oxygen tighter,make iron",
    "Oxygen is stored in muscle by...|myoglobin|💪||collagen,keratin",
    "At high altitude the body makes more...|red blood cells|⛰️||white blood cells only,bone cells",
    "Carbon monoxide is dangerous because it...|binds hemoglobin tightly|⚠️||makes too much oxygen,dissolves the blood",
    "Hemoglobin is found inside...|red blood cells|🔴||platelets,white blood cells",
    "Busy muscles produce more CO₂, so they receive...|more oxygen released|🏃||less oxygen,no blood"
  ], "More CO₂ means working muscle: does it need less oxygen or more?"));
  c.push(L("The heartbeat", [
    "The pacemaker|💓|The <b>SA node</b> in the right atrium is the heart's natural <b>pacemaker</b>. It sends a signal that makes both atria contract.",
    "The cycle|🔁|The signal reaches the <b>AV node</b> and then spreads through the ventricles, which contract. <b>Systole</b> is contraction and <b>diastole</b> is relaxation.",
    "Sounds and recording|🩺|The \"lub-dub\" sound comes from <b>heart valves</b> closing. An <b>ECG</b> (electrocardiogram) records the heart's electrical activity."
  ], [
    "The heart's natural pacemaker is the...|SA node|💓||AV node,valve",
    "Systole is the phase of heart...|contraction|💪||relaxation,filling only",
    "Diastole is the phase of heart...|relaxation|😌||contraction,clotting",
    "The \"lub-dub\" sound is made by heart...|valves closing|🩺||muscles tearing,blood boiling",
    "An ECG records the heart's...|electrical activity|⚡||sound waves only,blood color",
    "After the atria contract, the signal goes to the...|AV node|➡️||SA node,lungs",
    "The SA node is found in the right...|atrium|🫀||ventricle,lung",
    "Which chambers pump blood out of the heart?|ventricles|🫀||atria,valves"
  ], "Start at the pacemaker and follow the signal."));
  c.push(L("Blood clotting", [
    "Stopping a leak|🩹|When a blood vessel is cut, <b>platelets</b> stick to the wound and form a plug.",
    "The fibrin net|🕸️|A chain of <b>clotting factors</b> turns the soluble protein <b>fibrinogen</b> into sticky threads of <b>fibrin</b>. The fibrin net traps blood cells and forms a clot, which dries to a scab.",
    "When it goes wrong|⚠️|<b>Hemophilia</b> is an inherited condition in which a clotting factor is missing, so bleeding lasts longer. The body needs <b>vitamin K</b> to make some clotting factors."
  ], [
    "Which blood part first plugs a small cut?|platelets|🩹||red blood cells,plasma proteins only",
    "Fibrinogen is turned into...|fibrin|🕸️||hemoglobin,collagen",
    "Fibrin forms a ... that traps blood cells.|net|🕸️||wall of bone,pump",
    "A dried clot on the skin is called a...|scab|🩹||callus,plaque",
    "Hemophilia is a condition in which blood...|clots poorly|🩸||clots too well always,carries no oxygen",
    "Which vitamin is needed for clotting factors?|vitamin K|🥬||vitamin C,vitamin D",
    "Platelets are pieces of...|cells|🧩||bone,hair",
    "Clotting factors are mostly made in the...|liver|🫀||skin,lungs"
  ], "First a plug, then a net."));
  c.push(L("Autonomic nervous system", [
    "Automatic control|🤖|The <b>autonomic nervous system</b> controls organs without thinking, like heart rate, digestion and pupil size. The <b>somatic</b> system controls voluntary muscles.",
    "Fight or flight|🏃|The <b>sympathetic</b> system prepares for action: heart rate up, breathing faster, pupils wider, digestion slowed.",
    "Rest and digest|🛋️|The <b>parasympathetic</b> system calms the body: heart rate down, digestion active, pupils narrower. The two systems work as opposites to keep balance."
  ], [
    "The system that prepares you for 'fight or flight' is the...|sympathetic system|🏃||parasympathetic system,somatic system",
    "The 'rest and digest' system is the...|parasympathetic system|🛋️||sympathetic system,somatic system",
    "Heart rate speeds up under the...|sympathetic system|💓||parasympathetic system,skeletal system",
    "The autonomic system controls things you do...|without thinking|🤖||on purpose,only while awake",
    "Voluntary skeletal muscles are controlled by the ... system.|somatic|💪||autonomic,immune",
    "During fight or flight, digestion...|slows down|🍽️||speeds up,stops forever",
    "During rest and digest, the pupils...|get narrower|👁️||get wider,disappear",
    "The two parts of the autonomic system act...|as opposites|⚖️||as copies,as the same"
  ], "One revs the body up and the other calms it down."));
  c.push(L("Migration and navigation", [
    "Why migrate|🦋|Many animals travel long distances to reach food or safe places to raise young. Monarch butterflies fly from Canada and the United States to forests in Mexico. Arctic terns fly from the Arctic to the Antarctic and back.",
    "Finding the way|🧭|Animals use the <b>sun</b>, <b>stars</b>, the Earth's <b>magnetic field</b>, landmarks and smell. Salmon use smell to find the stream where they were born.",
    "Built in|🧬|Migration is partly <b>innate</b>: young birds that never saw their parents can still start in the right direction. Experience adds more detail."
  ], [
    "Monarch butterflies spend the winter in...|Mexico|🦋||Canada,Alaska",
    "Which bird makes one of the longest migrations on Earth?|Arctic tern|🐦||house sparrow,ostrich",
    "Salmon find their home stream using...|smell|👃||the moon only,sound only",
    "Many birds sense the Earth's...|magnetic field|🧭||gravity waves,ocean tides",
    "Migration is partly...|innate|🧬||learned only,random",
    "Animals migrate mainly to find...|food and breeding places|🍃||shopping malls,warm clothes",
    "Animals that migrate at night can use the...|stars|⭐||sun,rainbows",
    "Landmarks help animals navigate by...|sight|👀||touch only,taste"
  ], "Think about what an animal can sense: light, smell, magnetism."));
  c.push(L("Seeds waking up", [
    "Dormancy|💤|Many seeds are <b>dormant</b>: alive but not growing. Dormancy keeps seeds from sprouting at the wrong time, such as just before winter. The hormone <b>abscisic acid (ABA)</b> helps keep them dormant.",
    "Waking up|💧|Seeds wake when conditions are right: water, warmth, oxygen, and sometimes cold, light or fire. Water uptake, called <b>imbibition</b>, swells the seed. <b>Gibberellins</b> trigger digestion of stored food.",
    "First growth|🌱|The embryonic root, the <b>radicle</b>, comes out first. Stored food in the <b>cotyledons</b> or endosperm feeds the seedling until it can make food by photosynthesis."
  ], [
    "A seed that is alive but not growing is...|dormant|💤||dead,germinated",
    "Which hormone helps keep seeds dormant?|abscisic acid|🔒||gibberellin,insulin",
    "Which hormone triggers the breakdown of stored food in seeds?|gibberellin|🔓||abscisic acid,adrenaline",
    "A seed taking up water is called...|imbibition|💧||transpiration,pollination",
    "The first part to come out of a germinating seed is the...|radicle|🌱||leaf,flower",
    "Stored food for the seedling is found in the cotyledons or...|endosperm|🍞||stomata,pollen tube",
    "Why is dormancy useful?|seeds sprout at a good time|⏰||seeds make more light,seeds avoid water forever",
    "Some seeds only sprout after exposure to...|fire or cold|🔥||salt water only,loud sounds"
  ], "Which hormone says 'wait' and which says 'go'?"));
  c.push(L("Island biogeography", [
    "Islands as labs|🏝️|Islands are natural labs. The <b>theory of island biogeography</b> says the number of species on an island depends on balance between <b>immigration</b> (new arrivals) and <b>extinction</b>.",
    "Size and distance|📏|<b>Large</b> islands have more species than small ones, because they have more habitats and bigger populations. Islands <b>near</b> the mainland get more arrivals than far ones.",
    "Not only islands|🌳|The same ideas apply to habitat patches such as a park surrounded by city, or a mountaintop surrounded by lowlands."
  ], [
    "Large islands usually have ... than small islands.|more species|🏝️||fewer species,the same number of species",
    "Islands close to the mainland usually get ... than far islands.|more immigrants|🚢||fewer immigrants,no animals",
    "The number of species on an island is a balance of immigration and...|extinction|⚖️||photosynthesis,migration of rocks",
    "A small island far from land would likely have ... species.|few|🏝️||many,infinite",
    "Why do large islands support more species?|more habitats and bigger populations|🌳||they are warmer,they have more water vapor",
    "Which fits the island idea besides real islands?|a park in a city|🌳||a desert sand grain,the moon's orbit",
    "The arrival of new species to an island is called...|immigration|➡️||extinction,mutation",
    "A big island close to the mainland would have ... species.|many|🏝️||few,no"
  ], "Bigger and closer means more species."));
  c.push(L("Climate change and living things", [
    "Earlier springs|🌸|As the world warms, many plants flower and many animals breed <b>earlier</b>. Studying the timing of seasonal events is called <b>phenology</b>.",
    "Moving house|🏔️|Many species shift their ranges toward the <b>poles</b> or up <b>mountains</b> to stay in cooler places. Species that cannot move may decline.",
    "Mismatches and reefs|🪸|Timing can get out of sync: caterpillars may peak before baby birds need them. Warm water causes <b>coral bleaching</b>, when corals lose their algae partners. The cause is extra carbon dioxide from burning fossil fuels."
  ], [
    "Studying the timing of seasonal events is called...|phenology|📅||geology,cytology",
    "Many species are shifting their range toward the...|poles|🧭||equator,center of the ocean floor",
    "On mountains, species are moving...|uphill|⛰️||downhill,sideways only",
    "Coral bleaching happens when corals lose their...|algae partners|🪸||tentacles,shells",
    "A mismatch could be when caterpillars peak before the ... that eat them need them.|baby birds|🐦||oak trees,rocks",
    "The extra gas that traps heat comes mostly from...|burning fossil fuels|🏭||volcano ash only,tree planting",
    "As the climate warms, spring flowers tend to bloom...|earlier|🌸||later,never",
    "Which species is most at risk when climate changes?|species that cannot move or adapt|⚠️||species that live everywhere,species with big ranges"
  ], "Think about timing and location as the temperature goes up."));
  c.push(L("Sustainable harvest", [
    "Taking too much|🎣|<b>Overfishing</b> means catching fish faster than they can reproduce. In the 1990s Atlantic cod populations collapsed off Newfoundland, and fishing had to be stopped.",
    "Maximum sustainable yield|⚖️|The <b>maximum sustainable yield</b> is the biggest harvest that can be taken year after year without shrinking the population.",
    "Tools|🛟|Managers use <b>quotas</b>, <b>size limits</b>, closed seasons and <b>marine reserves</b>. Fish farming (<b>aquaculture</b>) can help, but must be managed to avoid pollution."
  ], [
    "Catching fish faster than they can reproduce is...|overfishing|🎣||aquaculture,harvest quota",
    "A harvest limit set on how much can be caught is a...|quota|📏||vector,primer",
    "The largest harvest that can be kept up year after year is the...|maximum sustainable yield|⚖️||minimum viable harvest,total biomass",
    "An area where fishing is not allowed is a...|marine reserve|🌊||fish market,sewage zone",
    "Raising fish in farms is called...|aquaculture|🐟||horticulture,forestry",
    "Size limits help because they let fish...|breed before being caught|🐠||grow wings,swim faster",
    "Which fish population collapsed off Newfoundland?|Atlantic cod|🐟||tuna in the Pacific,goldfish",
    "Closed seasons protect fish while they are...|breeding|🥚||sleeping in tanks,commuting"
  ], "Harvest only as much as the population can replace."));
  c.push(L("Transitional fossils", [
    "Links in the record|🦴|<b>Transitional fossils</b> show features of two groups, which supports evolution from a common ancestor.",
    "Famous examples|🪶|<i>Archaeopteryx</i> (about 150 million years old) had feathers like a bird but also teeth and a long bony tail like a reptile. <i>Tiktaalik</i> (about 375 million years old) was a fish with a neck and sturdy fins that helped it prop itself up in shallow water.",
    "Whales|🐋|Fossils such as <i>Ambulocetus</i> show early whale relatives with legs. Fossils, anatomy, DNA and geography all agree on the same family tree."
  ], [
    "A fossil that shows features of two groups is...|transitional|🦴||modern,extinct only",
    "Archaeopteryx had feathers like a bird and also...|teeth|🪶||fur,gills",
    "Tiktaalik links fish with...|four-legged land animals|🐟||insects,flowering plants",
    "Tiktaalik had sturdy fins and a...|neck|🐟||beak,shell",
    "Ambulocetus is an early relative of...|whales|🐋||horses,snakes",
    "Archaeopteryx is about ... years old.|150 million|🪶||1.5 million,15 billion",
    "Transitional fossils support the idea of...|common ancestry|🌳||spontaneous creation,no change",
    "Which of these lines of evidence agrees with the fossil record?|DNA comparisons|🧬||weather forecasts,star maps"
  ], "These fossils look like a mix of an older group and a newer group."));
  c.push(L("Testing for biomolecules", [
    "Food tests|🧪|Chemical tests show which biomolecules are in a food. <b>Iodine</b> turns blue-black with <b>starch</b>. <b>Benedict's solution</b> changes from blue to green, yellow or brick-red when heated with simple (reducing) <b>sugars</b>.",
    "More tests|🥚|<b>Biuret reagent</b> turns from blue to <b>purple</b> with <b>protein</b>. <b>Lipids</b> make a clear grease spot on brown paper, or stain with Sudan dye.",
    "Good lab practice|📋|Always run a <b>control</b> with plain water, which should show no change. Wear goggles and follow safety rules when heating solutions."
  ], [
    "Iodine turns blue-black in the presence of...|starch|🥔||protein,fat",
    "Benedict's solution tests for...|simple sugars|🍬||starch,protein",
    "Biuret reagent turns purple with...|protein|🥚||starch,sugar",
    "A grease spot on brown paper suggests...|lipids|🧈||starch,protein",
    "Benedict's solution must be ... for the test.|heated|🔥||frozen,shaken only",
    "A control with water should show...|no change|💧||the strongest color,a new color",
    "A positive Benedict's test may end up...|brick-red|🟥||clear,black",
    "A positive iodine test is...|blue-black|🔵||orange,clear"
  ], "Match each test chemical to the biomolecule it finds."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 21 Challenge", [c[0], c[2], c[3], c[4], c[6], c[7], c[9], c[10], c[12], c[13], c[14], c[16], c[17], b[8], b[14], a[14]]));

  Object.assign(LIFE_LEVELS, { 19: a, 20: b, 21: c });
})();
