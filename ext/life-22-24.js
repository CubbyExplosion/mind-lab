// ext/life-22-24.js  Life Science levels 22-24 (advanced high school biology, AP level)
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

  // ================= LEVEL 22 =================
  const a = [];
  a.push(L("Water potential", [
    "Where does water go?|💧|<b>Water potential</b> (Ψ) tells us which way water will move. Water always moves from <b>higher</b> water potential to <b>lower</b> water potential. Pure water in an open dish has Ψ = 0.",
    "Two parts|🧮|Ψ = Ψs + Ψp. <b>Solute potential</b> (Ψs) is always zero or negative: dissolved solutes <b>lower</b> it. <b>Pressure potential</b> (Ψp) goes up when a cell is pushed on by its wall (turgor).",
    "In a plant cell|🌱|A plant cell in pure water takes water in until its wall pushes back (Ψp rises) and the water potential inside equals the outside. Adding solute to a solution makes its water potential <b>lower</b>."
  ], [
    "Water moves toward the area with ... water potential.|lower|💧||higher,equal",
    "Pure water in an open container has a water potential of...|zero|🥛||ten,minus ten",
    "Adding solute to water makes the solute potential...|more negative|🧂||more positive,unchanged",
    "Water potential is the solute potential ... the pressure potential.|plus|🧮||minus,times",
    "A turgid cell has a ... pressure potential.|positive|🌱||negative,zero",
    "A cell with Ψ = −0.4 sits in a solution with Ψ = −0.8. Water will...|leave the cell|🥔||enter the cell,not move",
    "Solute potential of pure water is...|zero|💧||positive,negative",
    "A cell with Ψ = −0.9 sits in a solution with Ψ = −0.2. Water will...|enter the cell|🌿||leave the cell,not move",
    "Which has the LOWEST water potential?|a very salty solution|🧂||pure water,a weak sugar solution"
  ], "Water flows downhill in water potential: from high to low."));
  a.push(L("Chemiosmosis and ATP synthase", [
    "A proton gradient|⚡|The electron transport chain uses energy from electrons to pump <b>H⁺ ions (protons)</b> across a membrane. This builds up a high concentration on one side: a <b>proton gradient</b>.",
    "ATP synthase|🌀|Protons flow back down their gradient through a channel enzyme called <b>ATP synthase</b>. The flow spins part of the enzyme and powers the making of <b>ATP</b> from ADP and phosphate. This is <b>chemiosmosis</b>.",
    "Where it happens|🔋|In mitochondria, protons are pumped into the <b>intermembrane space</b>. In chloroplasts, they are pumped into the <b>thylakoid space</b>. In cell respiration, <b>oxygen</b> is the final electron acceptor and forms water."
  ], [
    "Chemiosmosis makes ATP using the flow of...|protons|⚡||electrons,glucose",
    "The enzyme that makes ATP from the proton flow is...|ATP synthase|🌀||DNA polymerase,hexokinase",
    "In mitochondria, protons are pumped into the...|intermembrane space|🔋||matrix,nucleus",
    "In chloroplasts, protons build up inside the...|thylakoid space|🌿||stroma,cytoplasm",
    "The final electron acceptor in cell respiration is...|oxygen|💨||carbon dioxide,glucose",
    "Protons flow through ATP synthase...|down their gradient|🌀||against their gradient,only when ATP is full",
    "Where is the electron transport chain of a mitochondrion found?|inner membrane|🔋||outer membrane,cell wall",
    "When oxygen accepts electrons at the end of the chain, it forms...|water|💧||sugar,carbon dioxide",
    "The proton gradient is a form of...|stored energy|⚡||genetic code,waste"
  ], "Think of a dam: protons rush through a turbine that builds ATP."));
  a.push(L("Allosteric regulation", [
    "A second switch|🎚️|An <b>allosteric</b> regulator binds to an enzyme at a site <b>away from the active site</b>, called the allosteric site. This changes the enzyme's shape and either turns it up or down.",
    "Activators and inhibitors|🔧|An <b>allosteric activator</b> keeps the enzyme in its active shape. An <b>allosteric inhibitor</b> keeps it in an inactive shape. Neither one fits in the active site.",
    "Feedback inhibition|🔁|In many pathways, the <b>final product</b> acts as an allosteric inhibitor of the <b>first enzyme</b>. When there is plenty of product, the pathway slows down, so the cell does not waste resources."
  ], [
    "An allosteric regulator binds to...|a site other than the active site|🎚️||the active site only,the substrate",
    "In feedback inhibition, the end product inhibits the...|first enzyme|🔁||last enzyme,substrate",
    "Feedback inhibition helps a cell...|avoid wasting resources|🔁||make more waste,destroy enzymes",
    "An allosteric inhibitor makes an enzyme...|less active|🔧||more active,permanently digested",
    "An allosteric activator keeps the enzyme in its...|active shape|🔧||inactive shape,denatured shape",
    "Allosteric binding changes the enzyme's...|shape|🎚️||sequence of DNA,species",
    "Hemoglobin binding oxygen more easily after the first O₂ binds is called...|cooperativity|🩸||competition,fermentation",
    "A competitive inhibitor binds the ... but an allosteric one does not.|active site|🔧||cell wall,allosteric site",
    "When product levels fall, the feedback-inhibited pathway...|speeds up again|🔁||stays off forever,stops all cell work"
  ], "Remember: allosteric means 'other site'."));
  a.push(L("Cell cycle control", [
    "Cyclins and CDKs|⏱️|Cells use proteins called <b>cyclins</b> that rise and fall during the cycle. A cyclin joins a <b>CDK</b> (cyclin-dependent kinase) enzyme, which turns it on so it can push the cell to the next stage.",
    "Checkpoints|🚦|Three main <b>checkpoints</b> act like stoplights: <b>G1</b> (is the cell big enough and the DNA undamaged?), <b>G2</b> (is the DNA fully copied?) and the <b>M checkpoint</b> (are all chromosomes attached to the spindle?).",
    "Stop signals|🛑|The protein <b>p53</b> detects DNA damage and halts the cell at G1 so it can be repaired, or triggers cell death if the damage is too great. Cells that stop dividing sit in <b>G0</b>."
  ], [
    "CDK enzymes are activated by binding...|cyclins|⏱️||histones,ribosomes",
    "Which checkpoint checks that all chromosomes are attached to the spindle?|M checkpoint|🚦||G1 checkpoint,S checkpoint",
    "The protein p53 responds to...|DNA damage|🧬||low oxygen,hunger",
    "The G1 checkpoint checks cell size and...|DNA damage|🚦||spindle fibers,sperm count",
    "A cell that has left the cycle and does not divide is in...|G0|😴||S phase,M phase",
    "Cyclin levels...|rise and fall during the cycle|⏱️||stay constant,only rise",
    "The G2 checkpoint checks that DNA has been...|fully copied|🚦||destroyed,sorted into gametes",
    "If DNA damage is too great, p53 can trigger...|cell death|🛑||faster division,fertilization"
  ], "Checkpoints are named for the phase they sit near the end of."));
  a.push(L("RNA processing", [
    "From gene to mRNA|✂️|In eukaryotes, the first RNA copy (pre-mRNA) is changed in the nucleus before it leaves. A <b>5' cap</b> is added at one end and a <b>poly-A tail</b> at the other. These protect the mRNA and help it get translated.",
    "Introns and exons|🧩|<b>Introns</b> are non-coding stretches that are cut out. <b>Exons</b> are the parts that are joined together and later expressed. The cutting is done by a <b>spliceosome</b>.",
    "Many proteins, one gene|🎛️|<b>Alternative splicing</b> joins exons in different combinations, so one gene can make several different proteins. This is one reason humans have far more proteins than genes."
  ], [
    "Parts of a gene that are cut out of the RNA are called...|introns|✂️||exons,codons",
    "Parts that are joined together and expressed are...|exons|🧩||introns,promoters",
    "The structure that cuts out the introns is the...|spliceosome|✂️||ribosome,lysosome",
    "The tail added to mRNA is made of many...|adenines|🧬||thymines,guanines",
    "RNA processing in eukaryotes happens in the...|nucleus|🧫||ribosome,mitochondrion",
    "Alternative splicing allows one gene to make...|several proteins|🎛️||exactly one protein,no protein",
    "The cap and tail help to...|protect the mRNA|🛡️||copy the DNA,build the ribosome",
    "Bacteria usually have genes with no introns, so their mRNA...|needs little splicing|🦠||is always spliced,has a spliceosome",
    "A newly made copy of a gene, before processing, is called...|pre-mRNA|📄||tRNA,rRNA"
  ], "Exons are expressed, introns are 'in the way'."));
  a.push(L("Translation in three steps", [
    "Initiation|🚦|The small ribosomal subunit grips the mRNA and finds the <b>start codon AUG</b>. A tRNA carrying <b>methionine</b> pairs with it, and then the large subunit joins.",
    "Elongation|🔗|The ribosome has three sites: <b>A</b> (new tRNA arrives), <b>P</b> (holds the growing chain) and <b>E</b> (empty tRNA exits). A <b>peptide bond</b> forms between amino acids, then the ribosome moves one codon along.",
    "Termination|🛑|When the ribosome reaches a <b>stop codon</b> (UAA, UAG or UGA), a release factor binds and the finished polypeptide is let go. Stop codons do not code for any amino acid."
  ], [
    "The usual start codon is...|AUG|🚦||UAA,GGG",
    "The first amino acid in a new chain is usually...|methionine|🔗||glycine,leucine",
    "Which of these is a stop codon?|UGA|🛑||AUG,GCC",
    "The ribosome site where a new tRNA arrives is the...|A site|🔗||E site,P site",
    "The ribosome site where empty tRNAs leave is the...|E site|🚪||A site,P site",
    "A bond between two amino acids is a...|peptide bond|🔗||hydrogen bond,ionic bond",
    "What ends translation?|a release factor at a stop codon|🛑||a start codon,a new tRNA",
    "During elongation, the ribosome moves along the mRNA by...|one codon|➡️||one gene,one chromosome",
    "Stop codons code for...|no amino acid|🛑||methionine,a special enzyme"
  ], "Translation has a beginning, a middle, and an end."));
  a.push(L("The lac operon", [
    "Genes in a group|🧬|In bacteria, genes for related jobs are often controlled together in an <b>operon</b>: a promoter, an <b>operator</b> and several genes. The <b>lac operon</b> holds genes for digesting lactose.",
    "Repressor on or off|🔒|Without lactose, a <b>repressor</b> protein sits on the operator and blocks RNA polymerase. When lactose is present, a form of it binds the repressor, which lets go. The genes are then turned <b>on</b>. This is an <b>inducible</b> operon.",
    "Glucose first|🍬|Bacteria prefer glucose. When glucose is low, the activator CAP (with cAMP) helps RNA polymerase bind, so the lac genes are made at a high rate. When glucose is high, they are made at a low rate."
  ], [
    "A group of genes controlled together in bacteria is an...|operon|🧬||exon,organelle",
    "Without lactose, the repressor...|blocks the operator|🔒||leaves the DNA,digests lactose",
    "Lactose turns the lac operon...|on|💡||off permanently,into a protein",
    "The lac operon is an example of an ... operon.|inducible|💡||repressible,viral",
    "The lac operon genes help digest...|lactose|🥛||glucose,starch",
    "The repressor binds to the...|operator|🔒||ribosome,cell wall",
    "When glucose is high, the lac genes are...|made at a low rate|🍬||made at a very high rate,deleted",
    "Operons are mostly found in...|bacteria|🦠||mammals,fungi"
  ], "The repressor is like a lock on the genes."));
  a.push(L("Protein targeting and chaperones", [
    "Where does it go?|📮|A protein's final job depends on where it ends up. A short <b>signal sequence</b> at one end acts like an address label. Ribosomes making proteins with a signal for the ER attach to the <b>rough ER</b>.",
    "Folding helpers|🤝|<b>Chaperone proteins</b> help new proteins fold into the right 3D shape and prevent them from clumping. A misfolded protein often cannot do its job.",
    "Recycling|♻️|Old or damaged proteins are tagged with <b>ubiquitin</b>, a small protein label, and sent to the <b>proteasome</b>, which chops them into amino acids to be used again."
  ], [
    "A short 'address label' on a protein is the...|signal sequence|📮||promoter,telomere",
    "Proteins that help other proteins fold are...|chaperones|🤝||ribosomes,hormones",
    "Ribosomes with an ER signal attach to the...|rough ER|🏭||nucleus,lysosome",
    "Proteins are tagged for destruction with...|ubiquitin|🏷️||cellulose,insulin",
    "The structure that chops tagged proteins is the...|proteasome|♻️||spliceosome,ribosome",
    "A misfolded protein often...|cannot do its job|❌||works better,becomes DNA",
    "Proteins that stay in the cytosol usually have...|no ER signal sequence|📮||an ER signal sequence,a cell wall",
    "Chaperones help proteins reach the correct...|3D shape|🧶||base sequence,codon"
  ], "A label tells a protein where to go; helpers help it fold."));
  a.push(L("The chi-square test", [
    "Expected vs observed|📊|The <b>chi-square (χ²) test</b> checks whether observed results fit what we expected, for example a 3:1 ratio in a genetics cross. The formula is χ² = Σ (o − e)² / e, where <b>o</b> is observed and <b>e</b> is expected.",
    "Degrees of freedom|🔢|<b>Degrees of freedom</b> = number of categories − 1. For 2 categories, df = 1. For 4 categories (a 9:3:3:1 cross), df = 3.",
    "Reading the result|📏|Compare χ² to a critical value at p = 0.05: df 1 is <b>3.84</b>, df 2 is <b>5.99</b>, df 3 is <b>7.81</b>. If χ² is <b>smaller</b>, the difference could be due to chance, so we fail to reject the null hypothesis."
  ], [
    "In the chi-square formula, e stands for...|expected|📊||error,energy",
    "A cross with 4 phenotype categories has how many degrees of freedom?|3|🔢||4,2",
    "A cross with 2 categories has df equal to...|1|🔢||2,0",
    "A χ² of 2.0 with df = 1 (critical 3.84) means...|the difference could be chance|📏||the data does not fit,the cross is wrong",
    "A χ² of 9.2 with df = 3 (critical 7.81) means...|reject the null hypothesis|📏||the data fit perfectly,accept the null",
    "The chi-square test compares...|observed and expected counts|📊||two means,two genes",
    "The usual significance level is p =...|0.05|📏||0.5,5.0",
    "Degrees of freedom are found by categories minus...|1|🔢||2,0",
    "The null hypothesis says that any difference is due to...|chance|🎲||selection,mutation"
  ], "A small χ² means the results are close to what was expected."));
  a.push(L("Modes of natural selection", [
    "Directional|➡️|<b>Directional selection</b> favors one extreme. Over time the whole population shifts in that direction, like bacteria becoming more drug resistant.",
    "Stabilizing|⚖️|<b>Stabilizing selection</b> favors the middle and removes both extremes. Human birth weight is an example: very small and very large babies have lower survival.",
    "Disruptive|↔️|<b>Disruptive selection</b> favors both extremes and removes the middle. It can split a population in two, as in one bird species with either very small or very large beaks and few medium ones."
  ], [
    "Selection that favors one extreme is...|directional|➡️||stabilizing,disruptive",
    "Selection that favors the average and removes extremes is...|stabilizing|⚖️||directional,disruptive",
    "Selection that favors both extremes is...|disruptive|↔️||directional,stabilizing",
    "Human birth weight is an example of ... selection.|stabilizing|👶||directional,disruptive",
    "Drug-resistant bacteria becoming common is an example of ... selection.|directional|🦠||stabilizing,disruptive",
    "A bird with mostly tiny and huge beaks but few medium ones suggests ... selection.|disruptive|🐦||directional,stabilizing",
    "Which kind of selection narrows variation?|stabilizing|⚖️||disruptive,none of them",
    "Which kind of selection can split one population into two?|disruptive|↔️||stabilizing,directional"
  ], "Think about which part of the bell curve survives."));
  a.push(L("Logistic growth", [
    "Growth with limits|📈|Unlimited growth is <b>exponential</b> and looks like a J-shaped curve. Real populations meet limits, so growth is <b>logistic</b>: an S-shaped curve that levels off near the <b>carrying capacity (K)</b>.",
    "Fastest point|⛰️|Logistic growth is slow at first, then fastest when the population is about <b>half of K</b>, then it slows as resources get scarce. Near K, births equal deaths.",
    "Density matters|👥|<b>Density-dependent</b> factors such as food, disease and predators act more strongly when the population is crowded. <b>Density-independent</b> factors, like a wildfire or storm, hit regardless of population size."
  ], [
    "A J-shaped growth curve shows...|exponential growth|📈||logistic growth,no growth",
    "An S-shaped growth curve shows...|logistic growth|📈||exponential growth,decline",
    "The maximum population an environment can support is the...|carrying capacity|⛰️||birth rate,biomass",
    "Logistic growth is fastest when the population is about...|half of K|⛰️||at K,near zero",
    "Near carrying capacity, birth rate...|equals death rate|⚖️||is far above death rate,is zero always",
    "A hurricane is a ... factor.|density-independent|🌀||density-dependent,biotic only",
    "Disease spreading faster in a crowded herd is ... limiting.|density-dependent|🦌||density-independent,not limiting",
    "In the logistic model the letter K represents...|carrying capacity|⛰️||kinetic energy,killing rate"
  ], "Growth must slow when resources run low."));
  a.push(L("Niches and competition", [
    "Fundamental and realized|🏠|A <b>niche</b> is the role of a species: its habitat, food and conditions. The <b>fundamental niche</b> is where it could live. The <b>realized niche</b> is where it actually lives after competition.",
    "Competitive exclusion|🥊|<b>Gause's principle</b>: two species that need exactly the same limited resource cannot live together forever; one will win. Gause showed this with two species of Paramecium.",
    "Sharing resources|🤲|Species can avoid competing by <b>resource partitioning</b> (using different food or places) or <b>character displacement</b> (becoming different in beak or body size over time)."
  ], [
    "The place and conditions where a species could live is its...|fundamental niche|🏠||realized niche,biome",
    "Where a species actually lives after competition is its...|realized niche|🏠||fundamental niche,population",
    "Two species needing the same limited resource: one will win. This is...|competitive exclusion|🥊||mutualism,succession",
    "Gause used which organism in his experiments?|Paramecium|🔬||Amoeba only,Daphnia",
    "Using different foods or places to avoid competing is...|resource partitioning|🤲||character displacement only,predation",
    "Species becoming different in size or beak to reduce competition is...|character displacement|🐦||gene flow,mimicry",
    "The realized niche is usually ... the fundamental niche.|smaller than|📏||larger than,identical to",
    "Warblers feeding at different heights in the same tree show...|resource partitioning|🌳||competitive exclusion,symbiosis"
  ], "A niche is a job, not just an address."));
  a.push(L("The nitrogen cycle", [
    "Fixing nitrogen|⚗️|Air is about 78% N₂, but most organisms cannot use it. <b>Nitrogen fixation</b> by bacteria (such as <i>Rhizobium</i> in legume root nodules) turns N₂ into <b>ammonia/ammonium</b>. Lightning also fixes some.",
    "Nitrification|🔄|<b>Nitrifying bacteria</b> change ammonium into nitrite and then into <b>nitrate</b>, which plants take up and use to build proteins and DNA. <b>Ammonification</b> by decomposers turns waste and dead matter back into ammonium.",
    "Back to the air|☁️|<b>Denitrifying bacteria</b>, in low-oxygen soil, turn nitrate back into N₂ gas, returning it to the atmosphere. Farmers add fertilizer because plants often run short of usable nitrogen."
  ], [
    "Turning N₂ into ammonia is called nitrogen...|fixation|⚗️||fission,filtration",
    "Legume root nodules contain nitrogen-fixing...|bacteria|🌱||fungi,viruses",
    "Nitrifying bacteria change ammonium into...|nitrate|🔄||nitrogen gas,glucose",
    "Denitrifying bacteria return nitrogen to the...|atmosphere|☁️||ocean floor,plants' roots",
    "Decomposers release ammonium by...|ammonification|♻️||nitrification,denitrification",
    "Plants mostly take up nitrogen as...|nitrate|🌾||N₂ gas,nitrogen oxide only",
    "About what part of air is N₂?|78%|☁️||21%,1%",
    "Which fixes nitrogen without bacteria?|lightning|⚡||rainfall alone,wind"
  ], "Different bacteria run different steps of the cycle."));
  a.push(L("Endotherms and ectotherms", [
    "Two strategies|🌡️|<b>Endotherms</b> (birds, mammals) make most of their own body heat from metabolism. <b>Ectotherms</b> (most reptiles, fish, insects) get heat from the environment. Endotherms stay warm but need much more food.",
    "Thermostat|🧠|The <b>hypothalamus</b> is the body's thermostat. When too hot, blood vessels near the skin widen (<b>vasodilation</b>) and sweating occurs. When too cold, vessels narrow (<b>vasoconstriction</b>) and shivering makes heat.",
    "Saving energy|🐻|Some animals enter <b>torpor</b> or <b>hibernation</b>, lowering metabolic rate and body temperature. Ectotherms use behavior, such as basking in sun or hiding in shade."
  ], [
    "Animals that make most of their own body heat are...|endotherms|🐦||ectotherms,poikilotherms only",
    "A lizard basking on a rock is mostly an...|ectotherm|🦎||endotherm,producer",
    "The part of the brain that acts as a thermostat is the...|hypothalamus|🧠||cerebellum,pituitary only",
    "Skin blood vessels widening to release heat is...|vasodilation|🌡️||vasoconstriction,shivering",
    "Shivering helps an animal...|make heat|🥶||lose heat,store water",
    "Compared with ectotherms, endotherms need ... food.|more|🍖||less,the same",
    "A very low metabolic state to save energy is...|torpor|🐻||photosynthesis,molting",
    "Vasoconstriction helps to...|save heat|🥶||lose heat,make sugar"
  ], "Endo means inside; the heat comes from inside."));
  a.push(L("Osmoregulation", [
    "Balancing water and salts|⚖️|<b>Osmoconformers</b> (many marine invertebrates) let their body fluids match the sea. <b>Osmoregulators</b> keep their body fluids steady even when the outside changes.",
    "Fish in fresh and salt water|🐟|<b>Freshwater fish</b> gain water by osmosis, rarely drink, and make lots of dilute urine. <b>Marine bony fish</b> lose water, drink seawater and pump extra salt out through their gills.",
    "Nitrogen waste|🚽|Breaking down proteins makes toxic <b>ammonia</b>. Water animals release ammonia directly. Mammals make <b>urea</b>. Birds and many reptiles make <b>uric acid</b>, which saves water."
  ], [
    "An animal whose body fluids match its surroundings is an...|osmoconformer|🪼||osmoregulator,endotherm",
    "A freshwater fish tends to ... water by osmosis.|gain|🐟||lose,make",
    "A marine bony fish gets rid of extra salt through its...|gills|🐠||skin only,bladder only",
    "Which waste uses the least water to remove?|uric acid|🐦||ammonia,urea",
    "Mammals mainly make the nitrogen waste...|urea|🐕||ammonia,uric acid",
    "Water animals can release toxic ... directly.|ammonia|🌊||urea,uric acid",
    "A marine bony fish ... seawater.|drinks|🐠||never touches,only breathes",
    "A freshwater fish makes ... urine.|lots of dilute|💧||little concentrated,no"
  ], "Ask: is this animal gaining or losing water?"));
  a.push(L("Countercurrent exchange", [
    "Opposite flows|↔️|In fish gills, blood flows in the <b>opposite direction</b> to the water passing over the gills. This is <b>countercurrent exchange</b>.",
    "Why it works|🐟|Because the flows are opposed, blood always meets water that holds <b>more oxygen than the blood</b>. A gradient exists along the whole gill, so up to about 80% of oxygen is absorbed.",
    "Other uses|🐧|Countercurrent flow also saves heat. In penguin legs, warm blood going down passes cool blood coming up, so heat is passed back before it is lost. Water holds far less oxygen than air, so fish need an efficient system."
  ], [
    "In fish gills, blood flows ... the water.|opposite to|↔️||the same way as,sideways to",
    "Countercurrent exchange keeps a ... along the gill.|steady gradient|📉||zero gradient,pressure of zero",
    "Compared with parallel flow, countercurrent flow takes up ... oxygen.|more|🐟||less,no",
    "Water holds ... oxygen than air.|less|💧||more,exactly the same",
    "A penguin's leg arteries and veins pass ... to each other.|heat|🐧||oxygen only,sugar",
    "About how much oxygen can fish gills absorb?|80%|🐠||10%,0%",
    "In concurrent flow, the gradient becomes ... along the exchange surface.|smaller|📉||larger,steady",
    "Countercurrent exchange helps fish because water has ... oxygen.|little|🐟||plenty of,more than air"
  ], "Opposite flows keep a difference all the way along."));
  a.push(L("Cardiac output", [
    "The formula|❤️|<b>Cardiac output</b> = <b>heart rate</b> × <b>stroke volume</b>. Heart rate is beats per minute. Stroke volume is the blood pumped by one ventricle per beat. A resting adult has about 5 liters per minute.",
    "Controls|🎛️|The <b>sinoatrial (SA) node</b> sets heart rate. The <b>sympathetic nerves</b> and the hormone epinephrine speed it up. The <b>vagus nerve</b> (parasympathetic) slows it.",
    "Fitness|🏃|Regular exercise makes the heart muscle stronger, so stroke volume rises and <b>resting heart rate falls</b>. During exercise, cardiac output may rise several times."
  ], [
    "Cardiac output equals heart rate times...|stroke volume|❤️||blood pressure,body mass",
    "A heart beats 70 times a minute with a stroke volume of 70 mL. Cardiac output in mL per minute is...|4900|🧮||1400,140",
    "A heart beats 60 times a minute with a stroke volume of 80 mL. Cardiac output in mL per minute is...|4800|🧮||1400,480",
    "The pacemaker of the heart is the...|SA node|⏱️||vagus nerve,aorta",
    "The vagus nerve ... heart rate.|slows|🧘||speeds up,has no effect on",
    "Epinephrine ... heart rate.|raises|⚡||lowers,does not change",
    "Training usually ... resting heart rate.|lowers|🏃||raises,doubles",
    "Stroke volume is blood pumped per...|beat|❤️||minute,hour"
  ], "Multiply how often it beats by how much each beat pumps."));
  a.push(L("Plant defenses", [
    "Barriers|🛡️|Plants have <b>physical</b> defenses such as a waxy cuticle, tough bark and thorns. Chemical defenses include <b>tannins</b> and <b>alkaloids</b>, which taste bad or are toxic to many herbivores.",
    "Fighting infection|🦠|In a <b>hypersensitive response</b>, plant cells around an infection die quickly, walling off the pathogen. A signal such as <b>salicylic acid</b> can then prepare the whole plant: <b>systemic acquired resistance</b>.",
    "Calling for help|📣|Some damaged plants release airborne chemicals that attract wasps or other predators of the insects eating them. Neighboring plants can detect these signals too."
  ], [
    "Thorns and bark are ... defenses.|physical|🌵||chemical,genetic",
    "Tannins and alkaloids are ... defenses.|chemical|🧪||physical,behavioral",
    "Plant cells dying around an infection is the...|hypersensitive response|🛡️||germination,photoperiod",
    "A signal that helps prepare the whole plant is...|salicylic acid|📣||auxin,starch",
    "The waxy outer layer of leaves is the...|cuticle|🍃||xylem,stoma",
    "Plants releasing chemicals that attract predators of herbivores is...|calling for help|📣||pollination,fertilization",
    "Systemic acquired resistance protects...|the whole plant|🌿||only the damaged leaf,only the seeds",
    "Walling off a pathogen by cell death helps to...|stop it spreading|🛑||feed it,pollinate it"
  ], "Plants cannot run away, so they use barriers, poisons and signals."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 22 Challenge", [a[0], a[1], a[3], a[4], a[5], a[6], a[8], a[9], a[10], a[11], a[12], a[14], a[16], a[17]]));

  // ================= LEVEL 23 =================
  const b = [];
  b.push(L("G proteins and second messengers", [
    "A signal at the surface|📡|Many hormones cannot enter cells. They bind a <b>G protein-coupled receptor (GPCR)</b> on the cell surface. The receptor then activates a <b>G protein</b>, which swaps GDP for <b>GTP</b>.",
    "Second messengers|📨|The active G protein switches on an enzyme that makes a <b>second messenger</b> such as <b>cAMP</b> or calcium ions. One signal molecule can make many second messengers, so the signal is <b>amplified</b>.",
    "Switching off|🔕|The G protein turns itself off by breaking GTP back to GDP. Enzymes called <b>phosphodiesterases</b> break down cAMP, and <b>phosphatases</b> remove phosphate groups, so the response ends."
  ], [
    "A GPCR is found on the cell...|surface|📡||nucleus,wall only",
    "When active, a G protein is bound to...|GTP|⚡||GDP,ATP only",
    "cAMP is an example of a...|second messenger|📨||first messenger,receptor",
    "Making many second messengers from one signal is called...|amplification|📈||inhibition,mutation",
    "The enzyme that breaks down cAMP is a...|phosphodiesterase|🔕||polymerase,protease",
    "Enzymes that remove phosphate groups are...|phosphatases|🔕||kinases,ligases",
    "Which enzymes add phosphate groups to proteins?|kinases|⚡||phosphatases,lipases",
    "The signal molecule that arrives first at the receptor is the...|ligand|📡||second messenger,effector"
  ], "The first messenger stays outside; the second one works inside."));
  b.push(L("Inside the nucleus", [
    "Gateways|🚪|The nucleus has a double membrane with <b>nuclear pores</b>. Small molecules pass freely, but large proteins need a <b>nuclear localization signal (NLS)</b> to be carried in. mRNA and ribosome subunits are exported.",
    "The nucleolus|⚙️|The <b>nucleolus</b> is a dense region where <b>rRNA</b> is made and ribosome subunits are put together. The <b>nuclear lamina</b>, a mesh of protein, supports the envelope.",
    "Chromatin|🧶|DNA wrapped around histones is <b>chromatin</b>. <b>Euchromatin</b> is loose and often active. <b>Heterochromatin</b> is tightly packed and usually inactive."
  ], [
    "Large proteins enter the nucleus through...|nuclear pores|🚪||ribosomes,vacuoles",
    "A protein needs which signal to enter the nucleus?|NLS|🏷️||stop codon,poly-A",
    "Ribosome subunits are assembled in the...|nucleolus|⚙️||Golgi,lysosome",
    "Loose, active chromatin is called...|euchromatin|🧶||heterochromatin,chromosome",
    "Tightly packed, usually inactive chromatin is...|heterochromatin|🧶||euchromatin,nucleoplasm",
    "The nuclear envelope has ... membranes.|two|🧫||one,three",
    "The nuclear lamina is made of...|protein|🕸️||lipid only,cellulose",
    "mRNA leaves the nucleus through...|nuclear pores|🚪||the nucleolus,the plasma membrane"
  ], "Think of the pores as guarded doors."));
  b.push(L("Peroxisomes and vacuoles", [
    "Peroxisomes|🧯|<b>Peroxisomes</b> break down fatty acids and detoxify harmful substances. A by-product is hydrogen peroxide (H₂O₂), which the enzyme <b>catalase</b> quickly splits into water and oxygen.",
    "Plant vacuoles|🌿|A plant's <b>central vacuole</b> stores water, ions, waste and pigments. It pushes against the cell wall to make <b>turgor pressure</b> that keeps plants firm.",
    "Other vacuoles|💦|Freshwater protists have <b>contractile vacuoles</b> that pump out extra water. <b>Food vacuoles</b> form when a cell engulfs food. <b>Lysosomes</b> contain digestive enzymes, working best in acid conditions."
  ], [
    "The enzyme in peroxisomes that splits hydrogen peroxide is...|catalase|🧯||amylase,ligase",
    "A plant cell stores water in its...|central vacuole|🌿||nucleolus,Golgi",
    "Contractile vacuoles remove extra...|water|💦||sugar,DNA",
    "Digestive enzymes are held in...|lysosomes|🧪||peroxisomes,ribosomes",
    "Hydrogen peroxide is a ... of some reactions.|by-product|🧯||fuel,gene",
    "The central vacuole helps make...|turgor pressure|🌿||ATP,DNA",
    "Which organelle breaks down fatty acids?|peroxisome|🧯||ribosome,nucleus",
    "Contractile vacuoles are common in ... protists.|freshwater|🦠||desert,marine mammal"
  ], "Each organelle is a small room with its own job."));
  b.push(L("Oncogenes and tumor suppressors", [
    "Gas and brake|🚗|A <b>proto-oncogene</b> normally helps cells grow and divide, like a gas pedal. A mutation can make it an <b>oncogene</b> that is stuck on. The <b>Ras</b> gene is one example.",
    "Brakes fail|🛑|<b>Tumor suppressor genes</b>, such as <b>p53</b> and <b>Rb</b>, act as brakes. Both copies usually must be lost or damaged before the brake fails, because one working copy is often enough.",
    "Many steps|🪜|Cancer usually needs <b>several mutations</b> that build up over time. Things that raise mutation rates, like UV light and tobacco smoke, are called <b>carcinogens</b>."
  ], [
    "A normal gene that helps cells divide is a...|proto-oncogene|🚗||tumor suppressor,carcinogen",
    "A mutated, stuck-on growth gene is an...|oncogene|🚗||tumor suppressor,exon",
    "p53 is a...|tumor suppressor|🛑||oncogene,hormone",
    "Oncogenes are like a gas pedal that is...|stuck down|🚗||missing,cut off",
    "For a tumor suppressor to fail, usually ... copies must be lost.|both|🛑||neither,just one",
    "Cancer usually needs ... mutations.|several|🪜||one,none",
    "Anything that raises the mutation rate and may cause cancer is a...|carcinogen|☢️||vitamin,enzyme",
    "Ras is an example of a...|proto-oncogene|🚗||tumor suppressor,carcinogen"
  ], "One is the gas pedal and one is the brake."));
  b.push(L("RNA interference", [
    "Small RNAs|🧬|Not all RNA codes for protein. <b>MicroRNAs (miRNA)</b> and <b>small interfering RNAs (siRNA)</b> are short pieces that regulate genes. An enzyme called <b>Dicer</b> cuts long double-stranded RNA into these short pieces.",
    "Silencing|🔇|The short RNA joins a protein complex called <b>RISC</b> and pairs with a matching mRNA. The mRNA is then either <b>cut up</b> or blocked from being translated. This is <b>RNA interference (RNAi)</b>.",
    "Many types|📚|Other non-coding RNAs include rRNA and tRNA (for translation), <b>snRNA</b> (for splicing) and long non-coding RNAs. RNAi was first studied in the worm <i>C. elegans</i>."
  ], [
    "The enzyme that cuts double-stranded RNA into short pieces is...|Dicer|✂️||ligase,helicase",
    "Short RNAs silence a gene by pairing with its...|mRNA|🔇||ribosome,histone",
    "The protein complex that carries the short RNA is...|RISC|📦||GPCR,ATPase",
    "RNAi can ... translation of a target mRNA.|block|🔇||speed up,copy",
    "miRNAs are...|non-coding RNAs|🧬||amino acids,lipids",
    "snRNA helps with...|splicing|✂️||translation,photosynthesis",
    "RNAi was first studied in the worm...|C. elegans|🪱||T. rex,Rhizobium",
    "RNAi acts at which level of gene control?|after transcription|🎛️||only in the DNA,only in the ribosome"
  ], "Short RNAs match a target like a key and a lock."));
  b.push(L("Controlling genes with transcription factors", [
    "Promoters and enhancers|🎚️|A <b>promoter</b> is where RNA polymerase starts. In eukaryotes, <b>general transcription factors</b> must bind first. Distant DNA sequences called <b>enhancers</b> bind <b>activator</b> proteins to speed up transcription.",
    "Bending DNA|🪢|The DNA bends so activators touch the transcription machinery. <b>Repressors</b> can block this. Different combinations of transcription factors let the same genome make a nerve cell or a muscle cell.",
    "Chromatin|🧶|Adding acetyl groups to histones (<b>acetylation</b>) loosens chromatin and allows transcription. Tight chromatin keeps genes off."
  ], [
    "A DNA sequence far from the gene that boosts transcription is an...|enhancer|🎚️||intron,operator",
    "Proteins that bind enhancers to speed up transcription are...|activators|🎚️||repressors,chaperones",
    "Where RNA polymerase starts is the...|promoter|🚦||telomere,centromere",
    "Histone acetylation usually ... transcription.|allows|🧶||blocks,destroys",
    "Different cell types arise because of different...|transcription factors|🧬||genomes,chromosome numbers",
    "Proteins that block transcription are...|repressors|🛑||activators,ribosomes",
    "The DNA must ... for activators to reach the promoter machinery.|bend|🪢||dissolve,copy",
    "Compared with a nerve cell, a muscle cell has ... DNA.|the same|🧬||different,less"
  ], "The same genes are in every cell; the controls differ."));
  b.push(L("Gene therapy and GMOs", [
    "Gene therapy|💉|In <b>gene therapy</b> a working copy of a gene is delivered into a patient's cells, often by a disarmed <b>virus vector</b>, to treat a disease caused by a faulty gene. Early successes included a form of severe immune disease (SCID).",
    "GM crops|🌽|<b>Genetically modified organisms</b> carry genes from other species. <b>Bt corn</b> makes a protein from the bacterium <i>Bacillus thuringiensis</i> that harms certain insect pests. <b>Golden rice</b> makes beta-carotene, which the body turns into vitamin A.",
    "Tools|🧰|Plants are often modified with the <b>Ti plasmid</b> from <i>Agrobacterium</i>. Bacteria with the human insulin gene make insulin for people with diabetes. Each use is tested and weighed for safety."
  ], [
    "Delivering a working gene to treat a disease is...|gene therapy|💉||fermentation,mitosis",
    "Gene therapy often uses a disarmed ... as a vector.|virus|🦠||fungus,plant",
    "Bt corn makes a protein from a...|bacterium|🌽||mushroom,fish",
    "Golden rice makes...|beta-carotene|🍚||insulin,chlorophyll b",
    "Beta-carotene is turned by the body into vitamin...|A|🥕||K,B12",
    "Bacteria are used to make human...|insulin|💉||hemoglobin,keratin",
    "The Ti plasmid comes from...|Agrobacterium|🧫||E. coli,yeast",
    "An organism with a gene from another species is...|transgenic|🧬||haploid,extinct"
  ], "Think of a delivery truck carrying a useful gene."));
  b.push(L("Retroviruses", [
    "Reverse flow|🔁|A <b>retrovirus</b> has an RNA genome. Its enzyme <b>reverse transcriptase</b> copies RNA into DNA. The enzyme <b>integrase</b> then inserts this DNA into the host chromosome, where it is called a <b>provirus</b>.",
    "HIV|🦠|<b>HIV</b> is a retrovirus. It binds <b>CD4</b> on helper T cells and slowly destroys them, weakening the immune system (AIDS). Reverse transcriptase makes many copying errors, so HIV mutates quickly.",
    "Medicines|💊|<b>Antiretroviral</b> medicines block steps such as reverse transcriptase or integrase and let people with HIV live long, healthy lives. Telomerase in our cells is also a kind of reverse transcriptase."
  ], [
    "A retrovirus has a genome made of...|RNA|🦠||DNA,protein",
    "Reverse transcriptase copies RNA into...|DNA|🔁||protein,lipid",
    "The viral DNA inserted into a host chromosome is a...|provirus|🧬||plasmid,prophage only",
    "HIV attacks which cells?|helper T cells|🛡️||red blood cells,neurons",
    "The enzyme that inserts viral DNA into the host chromosome is...|integrase|✂️||ligase,catalase",
    "HIV mutates quickly because reverse transcriptase makes many...|copying errors|⚠️||proofreading steps,perfect copies",
    "Medicines that block HIV steps are called...|antiretrovirals|💊||antibiotics,vitamins",
    "HIV binds which receptor on the host cell?|CD4|🔑||insulin receptor,hemoglobin"
  ], "Retro means backward: the flow goes RNA to DNA."));
  b.push(L("Prions and viroids", [
    "Prions|🧠|A <b>prion</b> is a misfolded protein with <b>no DNA or RNA</b>. It makes normal copies of the same protein fold wrongly too. Prions cause rare brain diseases such as mad cow disease (BSE) and scrapie in sheep.",
    "Viroids|🌱|A <b>viroid</b> is a tiny circle of <b>RNA with no protein coat</b>. Viroids infect plants and can harm crops such as potatoes and citrus. They are smaller than viruses.",
    "New diseases|🌍|<b>Emerging diseases</b> appear when pathogens change or jump from animals to humans (<b>zoonosis</b>), or spread by travel and changes in land use. Surveillance and quick sharing of data help control them."
  ], [
    "A prion is a misfolded...|protein|🧠||RNA,sugar",
    "Prions have ... genetic material.|no|🧬||double-stranded,circular",
    "A viroid is a small circle of...|RNA|🌱||DNA,protein",
    "Viroids infect mainly...|plants|🌱||bacteria,fish",
    "BSE is also called...|mad cow disease|🐄||flu,chickenpox",
    "A disease jumping from animals to humans is...|zoonosis|🌍||mutation,symbiosis",
    "Which has a protein coat?|a typical virus|🦠||a viroid,a prion",
    "Prions spread by making normal proteins...|misfold|🧶||divide,photosynthesize"
  ], "These agents are simpler than viruses."));
  b.push(L("Hybrid zones and punctuated equilibrium", [
    "Where species meet|🗺️|A <b>hybrid zone</b> is a region where two species meet and breed, producing hybrids. Outcomes include <b>reinforcement</b> (hybrids do poorly, so the species grow more distinct), <b>fusion</b> (they merge) or a stable zone.",
    "Tempo|⏱️|<b>Gradualism</b> says species change slowly and steadily. <b>Punctuated equilibrium</b> (Eldredge and Gould) says species stay almost the same for long times (<b>stasis</b>) and change in quick bursts during speciation.",
    "Evidence|🦴|The fossil record often shows long periods of little change broken by rapid change, which supports punctuated equilibrium. Both patterns can happen in different groups."
  ], [
    "A region where two species meet and breed is a...|hybrid zone|🗺️||biome,niche",
    "Hybrids doing poorly makes the species more distinct. This is...|reinforcement|🔬||fusion,gradualism",
    "Two species merging into one is...|fusion|🔄||stasis,reinforcement",
    "Long periods of little change are called...|stasis|⏱️||speciation,cladogenesis",
    "Slow, steady change is called...|gradualism|🐢||stasis,drift",
    "Which idea says change comes in quick bursts?|punctuated equilibrium|⚡||gradualism,uniformitarianism",
    "Punctuated equilibrium was proposed by Eldredge and...|Gould|🦴||Mendel,Pasteur",
    "The fossil record often shows...|long stasis then fast change|🦴||no change ever,constant slow change only"
  ], "Equilibrium means steady, punctuated means interrupted."));
  b.push(L("Fungal life cycles", [
    "Body plan|🍄|Most fungi are made of thread-like <b>hyphae</b> that form a network, the <b>mycelium</b>. Their cell walls contain <b>chitin</b>. They are heterotrophs that digest food outside the body and then absorb it.",
    "Sexual cycle|🔄|Two hyphae fuse (<b>plasmogamy</b>) but the nuclei stay separate, making a <b>dikaryotic</b> (n + n) stage. Later the nuclei fuse (<b>karyogamy</b>) and then <b>meiosis</b> makes haploid spores.",
    "Groups|🧫|Bread molds are <b>zygomycetes</b>, cup and yeast fungi are <b>ascomycetes</b> and mushrooms are <b>basidiomycetes</b>. A mushroom is just a spore-making <b>fruiting body</b>; the main fungus is underground."
  ], [
    "A network of fungal threads is a...|mycelium|🍄||rhizome,thallus",
    "Fungal cell walls contain...|chitin|🍄||cellulose,peptidoglycan",
    "Fusion of the cytoplasm of two hyphae is...|plasmogamy|🔄||karyogamy,mitosis",
    "Fusion of two nuclei is...|karyogamy|🔄||plasmogamy,budding",
    "A dikaryotic cell has ... nuclei.|two|🔬||one,four",
    "Fungi digest food...|outside their bodies|🍞||inside a mouth,by photosynthesis",
    "A mushroom is a...|fruiting body|🍄||root,seed",
    "Bread mold belongs to the...|zygomycetes|🍞||basidiomycetes,ascomycetes"
  ], "Fungi are closer to animals than to plants."));
  b.push(L("Land plant lineages", [
    "Early plants|🌿|Land plants came from green algae called charophytes. <b>Bryophytes</b> (mosses) have no vascular tissue, stay small and need water for sperm to swim. Their <b>gametophyte</b> is the dominant stage.",
    "Vascular plants|🌲|<b>Seedless vascular plants</b> (ferns) have xylem and phloem with lignin, so they grow tall. Their <b>sporophyte</b> is dominant, but sperm still swim. <b>Gymnosperms</b> (conifers) make seeds on cones.",
    "Flowers|🌸|<b>Angiosperms</b> make flowers and fruit and have double fertilization. Seeds and pollen free plants from needing water for reproduction, which helped them spread across dry land."
  ], [
    "Land plants evolved from green algae called...|charophytes|🌿||diatoms,kelps",
    "Mosses are...|bryophytes|🌱||gymnosperms,angiosperms",
    "In mosses, the dominant stage is the...|gametophyte|🌱||sporophyte,zygote",
    "In ferns, the dominant stage is the...|sporophyte|🌿||gametophyte,gamete",
    "Plants with seeds on cones are...|gymnosperms|🌲||bryophytes,ferns",
    "Plants with flowers and fruit are...|angiosperms|🌸||gymnosperms,mosses",
    "A tough substance in vascular tissue that helps plants grow tall is...|lignin|🌳||chitin,keratin",
    "Pollen helped plants reproduce without...|water for sperm|💧||sunlight,soil"
  ], "Each group added a new tool for life on land."));
  b.push(L("Invertebrate phyla", [
    "Simple animals|🪼|<b>Sponges</b> (Porifera) have no true tissues. <b>Cnidarians</b> (jellies, corals) have radial symmetry and stinging cells. <b>Flatworms</b> have a flat body with no body cavity.",
    "Mid-level groups|🐌|<b>Mollusks</b> have a soft body, a mantle and often a shell (snails, clams, squid). <b>Annelids</b> are segmented worms like earthworms. <b>Roundworms</b> (nematodes) have a tube-like body.",
    "Big groups|🦋|<b>Arthropods</b> (insects, spiders, crabs) have jointed legs and an exoskeleton of chitin and are the most species-rich phylum. <b>Echinoderms</b> (sea stars) have radial adults and a water vascular system."
  ], [
    "Animals with no true tissues are...|sponges|🧽||jellies,worms",
    "Jellies and corals are...|cnidarians|🪼||mollusks,annelids",
    "Segmented worms such as earthworms are...|annelids|🪱||nematodes,flatworms",
    "Snails, clams and squid are...|mollusks|🐌||arthropods,echinoderms",
    "The phylum with the most species is...|arthropods|🦋||mollusks,sponges",
    "Sea stars belong to the...|echinoderms|⭐||cnidarians,annelids",
    "Cnidarians have stinging cells called...|cnidocytes|🪼||radulae,nephridia",
    "Arthropod skeletons are made of...|chitin|🦀||bone,cellulose"
  ], "Match the group to its special body feature."));
  b.push(L("Types of learning", [
    "Simple learning|🧠|<b>Habituation</b> is learning to ignore a repeated harmless stimulus, like a bird ignoring a scarecrow. <b>Imprinting</b> is learning in a critical period, such as goslings following the first moving object (Konrad Lorenz).",
    "Associative learning|🔔|In <b>classical conditioning</b> an animal links two stimuli (Pavlov's dogs and a bell). In <b>operant conditioning</b> an animal links its own behavior to a reward or a punishment, learning by trial and error.",
    "Other kinds|🗺️|<b>Spatial learning</b> uses landmarks and mental maps. <b>Social learning</b> copies others. A <b>fixed action pattern</b> is different: it is innate, and runs to the end once started."
  ], [
    "Learning to ignore a repeated harmless stimulus is...|habituation|🔕||imprinting,conditioning",
    "Goslings following the first moving object they see is...|imprinting|🦆||habituation,insight",
    "Pavlov's dogs showed ... conditioning.|classical|🔔||operant,spatial",
    "Learning by trial and error with rewards is ... conditioning.|operant|🐀||classical,passive",
    "Using landmarks and mental maps is ... learning.|spatial|🗺️||social,fixed",
    "Copying others is ... learning.|social|👥||spatial,operant",
    "A behavior that is innate and runs to the end once started is a...|fixed action pattern|🧬||learned habit,conditioning",
    "Imprinting happens during a...|critical period|⏳||habituation,reward"
  ], "Ask: is it ignoring, copying, or linking things?"));
  b.push(L("Hox genes and morphogens", [
    "Body plan genes|🧬|<b>Homeotic genes</b>, including the <b>Hox genes</b>, control which body parts grow where along the head-to-tail axis. Mutations can cause body parts in the wrong place, like legs growing where a fruit fly's antennae should be.",
    "Gradients|🌈|<b>Morphogens</b> are signal molecules that spread out and form a <b>concentration gradient</b>. Cells read their concentration and turn on different genes. In fruit flies, the protein <b>Bicoid</b> marks the head end.",
    "Shaping|✋|<b>Induction</b> is when one group of cells signals nearby cells to change. <b>Apoptosis</b> (planned cell death) sculpts shapes, such as separating fingers. Hox genes are similar across many animals."
  ], [
    "Genes that control body part placement are...|homeotic genes|🧬||oncogenes,operons",
    "A signal molecule that forms a concentration gradient is a...|morphogen|🌈||hormone only,codon",
    "In fruit flies, ... marks the head end.|Bicoid|🪰||Dicer,catalase",
    "Planned cell death that separates fingers is...|apoptosis|✋||mitosis,induction",
    "One group of cells changing nearby cells is...|induction|📡||apoptosis,imprinting",
    "A fly with legs where antennae should be is due to a ... mutation.|homeotic|🪰||regulatory enzyme,bacterial",
    "Hox genes are ... across many animals.|similar|🧬||unrelated,absent",
    "Cells decide what to become by reading the ... of morphogens.|concentration|🌈||color,weight"
  ], "Position decides what a cell becomes."));
  b.push(L("Autoimmunity and immune deficiency", [
    "Attacking self|🛡️|In an <b>autoimmune disease</b>, the immune system attacks the body's own cells. Examples: <b>type 1 diabetes</b> (insulin-making cells), <b>rheumatoid arthritis</b> (joints) and <b>multiple sclerosis</b> (nerve coating).",
    "Self-tolerance|🎓|Normally, T cells that react strongly to the body's own molecules are removed in the <b>thymus</b>. Autoimmunity happens when this tolerance fails.",
    "Weak defenses|🕳️|In <b>immunodeficiency</b> the immune system is too weak. It can be inherited (like <b>SCID</b>) or acquired, as in <b>AIDS</b> caused by HIV. People with it get frequent or unusual infections."
  ], [
    "A disease in which the immune system attacks the body is...|autoimmune|🛡️||allergic only,infectious",
    "Type 1 diabetes attacks cells that make...|insulin|💉||adrenaline,hemoglobin",
    "Multiple sclerosis damages the coating of...|nerves|🧠||bones,arteries",
    "Self-reactive T cells are normally removed in the...|thymus|🎓||liver,spleen",
    "SCID is an example of an ... immunodeficiency.|inherited|🧬||acquired,allergic",
    "AIDS is an ... immunodeficiency.|acquired|🕳️||inherited,autoimmune",
    "A sign of immunodeficiency is frequent...|infections|🤒||bone growth,hair color",
    "Rheumatoid arthritis affects the...|joints|🦴||kidneys,eyes only"
  ], "Too active or too weak: either way balance is lost."));
  b.push(L("T cells and MHC", [
    "Showing the enemy|🪧|<b>MHC proteins</b> display pieces of proteins (antigens) on cell surfaces. <b>MHC I</b> is on almost all body cells and shows what is inside. <b>MHC II</b> is on antigen-presenting cells like macrophages and dendritic cells.",
    "Two T cell types|🧑‍⚕️|<b>Cytotoxic T cells</b> (CD8) read MHC I and kill infected cells with perforin. <b>Helper T cells</b> (CD4) read MHC II and release cytokines that activate B cells and other T cells.",
    "Memory|🧠|After an infection, <b>memory cells</b> remain, so the next attack is answered faster. T cells mature in the <b>thymus</b>; B cells mature in the <b>bone marrow</b>."
  ], [
    "MHC I is found on...|almost all body cells|🪧||only red blood cells,only bacteria",
    "MHC II is mostly on...|antigen-presenting cells|🪧||all cells equally,platelets",
    "Cytotoxic T cells carry which marker?|CD8|⚔️||CD4,CD2",
    "Helper T cells carry which marker?|CD4|🧑‍⚕️||CD8,CD10",
    "Cytotoxic T cells kill infected cells using...|perforin|⚔️||insulin,chitin",
    "Helper T cells release signals called...|cytokines|📨||hormones only,nucleotides",
    "T cells mature in the...|thymus|🎓||bone marrow,pancreas",
    "B cells mature in the...|bone marrow|🦴||thymus,heart"
  ], "Cytotoxic means cell-killing; helpers help."));
  b.push(L("Sensory receptors", [
    "Kinds of receptors|👂|<b>Mechanoreceptors</b> sense touch, pressure, stretch and sound. <b>Chemoreceptors</b> sense taste, smell and chemicals in blood. <b>Thermoreceptors</b> sense temperature. <b>Nociceptors</b> sense harmful stimuli.",
    "Transduction|⚡|<b>Sensory transduction</b> changes a stimulus into an electrical signal. The stimulus changes a receptor cell's membrane potential (a <b>receptor potential</b>). If it is strong enough, action potentials travel to the brain.",
    "Adaptation|🧘|Receptors show <b>sensory adaptation</b>: they respond less if the stimulus stays the same, so you stop feeling your clothes. Some animals have special receptors for electric or magnetic fields."
  ], [
    "Receptors that sense touch and pressure are...|mechanoreceptors|✋||chemoreceptors,photoreceptors",
    "Taste and smell use...|chemoreceptors|👃||thermoreceptors,mechanoreceptors",
    "Receptors for harmful stimuli are...|nociceptors|⚠️||thermoreceptors,photoreceptors",
    "Changing a stimulus into an electrical signal is...|transduction|⚡||translation,adaptation",
    "Not feeling your clothes after a while is sensory...|adaptation|🧘||evolution,fatigue of bones",
    "Receptors that detect light are...|photoreceptors|👁️||mechanoreceptors,nociceptors",
    "Sharks can sense electric fields with...|electroreceptors|🦈||chemoreceptors,thermoreceptors",
    "The first change in a sensory cell is a...|receptor potential|⚡||reflex arc,hormone"
  ], "Match the receptor name to its stimulus."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 23 Challenge", [b[0], b[1], b[3], b[4], b[5], b[6], b[7], b[9], b[10], b[11], b[13], b[14], b[15], b[16], b[17], a[3], a[6], a[7]]));

  // ================= LEVEL 24 =================
  const c = [];
  c.push(L("Stomata and transpiration", [
    "Guard cells|🍃|Each <b>stoma</b> is a pore between two <b>guard cells</b>. When guard cells take up potassium ions (K⁺), water follows by osmosis, they become turgid and bend apart, so the pore <b>opens</b>. Losing water closes it.",
    "Pulling water up|🌳|Water evaporating from leaves (<b>transpiration</b>) pulls water up the xylem. <b>Cohesion</b> (water sticking to water) and <b>adhesion</b> (water sticking to xylem walls) keep the column unbroken. This is the <b>cohesion-tension theory</b>.",
    "Trade-offs|⚖️|Open stomata let in CO₂ for photosynthesis but lose water. In drought, the hormone <b>abscisic acid (ABA)</b> closes stomata. Transpiration is faster in hot, windy, dry air and slower in humid air."
  ], [
    "Guard cells open a stoma when they become...|turgid|🍃||flaccid,dead",
    "Guard cells take up which ion to open?|potassium|🍃||iron,chloride only",
    "The hormone that closes stomata in drought is...|ABA|🌵||auxin,gibberellin",
    "Water sticking to other water molecules is...|cohesion|💧||adhesion,evaporation",
    "Water sticking to xylem walls is...|adhesion|💧||cohesion,diffusion",
    "Loss of water vapor from leaves is...|transpiration|🌫️||translocation,respiration",
    "Transpiration is fastest in ... air.|hot and dry|☀️||cool and humid,still and humid",
    "Open stomata let in...|carbon dioxide|🍃||nitrogen,glucose"
  ], "A plant must balance getting CO₂ with losing water."));
  c.push(L("Ozone and CFCs", [
    "Ozone layer|☀️|<b>Ozone (O₃)</b> in the upper atmosphere (stratosphere) absorbs most harmful <b>UV-B</b> light. UV can damage DNA, causing skin cancer and cataracts, and harm plankton and crops.",
    "The hole|🕳️|<b>CFCs</b>, once used in coolants and aerosols, release <b>chlorine</b> in the stratosphere. One chlorine atom can destroy many ozone molecules. The ozone hole forms over <b>Antarctica</b> each spring.",
    "A success story|🌍|The <b>Montreal Protocol</b> (1987) phased out CFCs worldwide. The ozone layer is slowly recovering. Do not confuse it with the <b>greenhouse effect</b>, which is about heat, not UV."
  ], [
    "The ozone layer absorbs harmful...|UV-B light|☀️||infrared light,radio waves",
    "The chemicals that damage ozone are...|CFCs|🧪||CO₂ only,nitrates",
    "The atom in CFCs that destroys ozone is...|chlorine|⚗️||helium,iron",
    "The ozone hole forms mainly over...|Antarctica|🧊||the Amazon,the Sahara",
    "The agreement that phased out CFCs was the...|Montreal Protocol|🤝||Kyoto Protocol,Geneva Accord",
    "UV light can damage...|DNA|🧬||only bone,only water",
    "An ozone molecule has how many oxygen atoms?|three|🌍||two,four",
    "The ozone layer is in the...|stratosphere|🌌||troposphere,ocean"
  ], "Ozone is a sunscreen high above Earth."));
  c.push(L("Bioremediation and restoration", [
    "Microbes as cleaners|🧫|<b>Bioremediation</b> uses living things to clean up pollution. Bacteria can digest spilled oil, and adding nutrients to speed them up is <b>biostimulation</b>. Adding new microbes is <b>bioaugmentation</b>.",
    "Plants as cleaners|🌻|<b>Phytoremediation</b> uses plants to take up metals from soil and water. Wetlands filter pollutants naturally. The plants are later harvested safely.",
    "Restoring ecosystems|🌳|<b>Restoration ecology</b> repairs damaged ecosystems, for example by replanting native species, removing invaders, restoring wetlands or reclaiming old mines. Goals are tested and monitored over time."
  ], [
    "Using living things to clean up pollution is...|bioremediation|🧫||bioethics,biomagnification",
    "Using plants to take up metals from soil is...|phytoremediation|🌻||fermentation,pollination",
    "Adding nutrients to help helpful microbes grow is...|biostimulation|🧫||bioaugmentation,eutrophication",
    "Adding new microbes to a site is...|bioaugmentation|🧫||biostimulation,speciation",
    "Bacteria can help clean up a spill of...|oil|🛢️||sand,rock",
    "Repairing damaged ecosystems is...|restoration ecology|🌳||population genetics,taxonomy",
    "Wetlands help by...|filtering pollutants|💧||making oil,melting ice",
    "Restoration often involves planting ... species.|native|🌱||invasive,random"
  ], "Remediation means fixing a problem."));
  c.push(L("Foraging and territories", [
    "Optimal foraging|🐦|<b>Optimal foraging theory</b> says animals choose food that gives the best <b>energy gain compared with the cost</b> of finding, catching and eating it. A crow dropping shellfish on rocks picks the heights that work best.",
    "Territories|🏞️|A <b>territory</b> is an area an animal defends for food, nesting or mating. Defending it costs energy, so it is worth it only when the benefits are greater than the costs.",
    "Signals|📣|Animals use <b>displays</b>, songs and scent marks to claim territories without fighting. Ritualized signals reduce injuries."
  ], [
    "Optimal foraging theory says animals maximize...|net energy gain|🐦||distance traveled,body size",
    "A defended area used for food or nesting is a...|territory|🏞️||habitat,niche",
    "A territory is worth defending if benefits are ... costs.|greater than|⚖️||less than,unrelated to",
    "Songs and scent marks help animals avoid...|fights|🎶||eating,sleeping",
    "Choosing food with the best energy for the effort is...|optimal foraging|🍽️||imprinting,migration",
    "The energy cost of defending a territory is a...|cost|⚡||benefit,reward",
    "Displays that reduce injuries are...|ritualized signals|📣||random movements,poisons",
    "A bird choosing larger, richer seeds is likely using...|optimal foraging|🌰||habituation,classical conditioning"
  ], "Think of a cost and benefit balance."));
  c.push(L("Gene flow and clines", [
    "Gene flow|🌬️|<b>Gene flow</b> is the movement of alleles between populations by migrating individuals, pollen or seeds. It makes populations more <b>alike</b> and adds variation to a new population.",
    "Clines|📈|A <b>cline</b> is a gradual change in a trait across a geographic area, such as body size growing larger in colder regions (Bergmann's rule). It can result from natural selection along an environmental gradient.",
    "Isolation|🏝️|Little gene flow lets populations drift apart. With strong gene flow, local adaptations can be swamped. Barriers like mountain ranges or oceans reduce gene flow."
  ], [
    "Movement of alleles between populations is...|gene flow|🌬️||genetic drift,mutation",
    "Gene flow makes populations more...|alike|🤝||different,extinct",
    "A gradual change in a trait across a region is a...|cline|📈||niche,biome",
    "Bergmann's rule says animals tend to be larger in ... places.|colder|🥶||hotter,drier",
    "Pollen blown to another population causes...|gene flow|🌬️||speciation,mutation",
    "Mountains and oceans ... gene flow.|reduce|🏔️||increase,have no effect on",
    "Low gene flow lets populations...|drift apart|🏝️||become identical,merge",
    "A cline can result from selection along a...|gradient|📈||bottleneck,mutation"
  ], "Genes travel when individuals or pollen travel."));
  c.push(L("Mean, spread and error bars", [
    "Averages|📊|The <b>mean</b> is the sum divided by the number of values. The <b>median</b> is the middle value. The <b>range</b> is the highest minus the lowest.",
    "Spread|📏|<b>Standard deviation (SD)</b> shows how spread out data are. In a normal distribution, about <b>68%</b> of values lie within 1 SD of the mean and about <b>95%</b> within 2 SD.",
    "Error bars|📐|<b>Standard error of the mean (SEM)</b> = SD ÷ √n. A bigger sample size makes SEM smaller. If the 95% confidence error bars of two groups do not overlap, the difference is likely real."
  ], [
    "The mean of 4, 6 and 8 is...|6|🧮||18,4",
    "The mean of 10, 20 and 30 is...|20|🧮||60,10",
    "The median of 3, 9 and 5 is...|5|🧮||9,17",
    "The range of 2, 7 and 12 is...|10|📏||7,21",
    "About what percent of data lie within 1 SD of the mean?|68%|📊||95%,50%",
    "About what percent lie within 2 SD?|95%|📊||68%,99.9%",
    "If SD = 10 and n = 25, the SEM is...|2|📐||5,10",
    "If SD = 12 and n = 9, the SEM is...|4|📐||3,12",
    "A larger sample size makes SEM...|smaller|📐||larger,the same"
  ], "Write down each formula first, then plug in the numbers."));
  c.push(L("Hypothesis testing", [
    "The null hypothesis|🧪|The <b>null hypothesis</b> says there is no effect or difference. A statistical test tells us how likely our data would be if the null were true. That chance is the <b>p-value</b>.",
    "Using p|🔍|If <b>p &lt; 0.05</b>, we reject the null hypothesis: the result is called statistically significant. A larger p means the difference could easily be chance. Significance does not prove an idea is true.",
    "Careful design|📋|A good experiment has one <b>independent variable</b> (what you change), a <b>dependent variable</b> (what you measure), a <b>control group</b> and many <b>replicates</b>. Correlation alone does not show causation."
  ], [
    "The statement 'there is no difference' is the...|null hypothesis|🧪||alternative hypothesis,theory",
    "A result with p = 0.01 is usually...|significant|🔍||not significant,proved",
    "A result with p = 0.3 is usually...|not significant|🔍||significant,proved",
    "What you measure is the ... variable.|dependent|📏||independent,controlled",
    "What you change on purpose is the ... variable.|independent|🔧||dependent,constant",
    "Many repeats of a treatment are called...|replicates|📋||controls,variables",
    "A group that gets no treatment is the...|control group|🧑‍🔬||variable group,placebo only",
    "Two things that change together show...|correlation|📈||proof of cause,nothing"
  ], "p tells us how surprising the data would be if nothing was going on."));
  c.push(L("Respirometry", [
    "Measuring oxygen use|🧫|A <b>respirometer</b> measures the oxygen used by living things, such as germinating seeds. A chemical like KOH absorbs the CO₂ they release, so any change in volume is due to O₂ use.",
    "Reading the result|📉|As oxygen is used, gas pressure in the sealed tube falls and colored liquid moves along a thin pipette. The <b>rate</b> = volume change ÷ time. Dry or dead seeds and glass beads make a <b>control</b>.",
    "Predictions|🌡️|Germinating seeds use more oxygen than dormant seeds. Warmer temperatures raise the rate until enzymes denature. Peas, small animals, or yeast can be used."
  ], [
    "A respirometer measures how much ... is used.|oxygen|🧫||nitrogen,water",
    "A chemical like KOH in a respirometer absorbs...|carbon dioxide|🧪||oxygen,water vapor",
    "In the respirometer, liquid moves because gas ... falls.|pressure|📉||temperature only,color",
    "Rate equals volume change divided by...|time|⏱️||mass,pressure",
    "Which seeds use more oxygen?|germinating seeds|🌱||dry dormant seeds,glass beads",
    "Glass beads or dead seeds make a...|control|🔴||variable,hypothesis",
    "If oxygen used is 3 mL in 6 minutes, the rate in mL per minute is...|0.5|🧮||2,18",
    "If oxygen used is 8 mL in 4 minutes, the rate in mL per minute is...|2|🧮||32,0.5"
  ], "Rate always has a change on top and time on the bottom."));
  c.push(L("Photosynthesis labs", [
    "Floating leaf disks|🍃|Leaf disks are first sunk by drawing out air. With light and a CO₂ source (<b>sodium bicarbonate</b>), they make O₂ bubbles and float. The faster they float, the higher the photosynthetic rate. A common measure is the time for half the disks to float.",
    "Paper chromatography|🌈|Pigments separate on paper as the solvent moves up. <b>Carotenoids</b> travel farthest, then chlorophyll a, then chlorophyll b, and <b>xanthophyll</b> in between. This depends on how well each is dissolved and how strongly it sticks to the paper.",
    "Rf value|🧮|<b>Rf</b> = distance moved by the pigment ÷ distance moved by the solvent front. Rf is always between 0 and 1 and is the same for a pigment in the same conditions."
  ], [
    "Leaf disks float because of trapped...|oxygen|🍃||nitrogen,carbon dioxide only",
    "Sodium bicarbonate in the leaf disk test supplies...|CO₂|🧪||light,water",
    "A faster floating time shows a ... photosynthetic rate.|higher|⚡||lower,zero",
    "Which pigment travels farthest on chromatography paper?|carotenoids|🌈||chlorophyll b,chlorophyll a",
    "Rf is the pigment distance divided by the ... distance.|solvent front|🧮||paper edge,starting line",
    "A pigment moved 3 cm and the solvent moved 6 cm. Rf is...|0.5|🧮||2,18",
    "A pigment moved 2 cm and the solvent moved 8 cm. Rf is...|0.25|🧮||4,0.75",
    "Rf can never be more than...|1|📏||0.5,10",
    "Disks sink at first because air is...|removed|🌫️||added,frozen"
  ], "Divide the shorter distance by the longer distance."));
  c.push(L("Biology math", [
    "Percent change|➗|<b>Percent change</b> = (new − old) ÷ old × 100. A mass going from 20 g to 25 g is a change of +5 ÷ 20 × 100 = <b>25%</b>. A decrease gives a negative number.",
    "Rates and dilutions|🧴|<b>Rate</b> = change ÷ time. A <b>serial dilution</b> repeats the same dilution: ten-fold steps of 1:10 give 1/10, 1/100, 1/1000. Unit conversions: 1 mm = 1000 μm.",
    "Q10 and ratios|🌡️|<b>Q10</b> = rate at (T + 10 °C) ÷ rate at T. Many enzyme reactions have a Q10 near 2. For ratios like surface area to volume, divide the area by the volume and keep track of units."
  ], [
    "Mass goes from 10 g to 15 g. Percent change is...|50%|➗||5%,150%",
    "Mass goes from 40 g to 30 g. Percent change is...|-25%|➗||25%,-10%",
    "Population goes from 200 to 300. Percent change is...|50%|➗||100%,33%",
    "A 1:10 dilution done three times gives...|1/1000|🧴||1/30,1/100",
    "1 mm equals how many μm?|1000|📏||100,10",
    "A reaction goes from rate 3 to rate 6 when warmed 10 °C. Q10 is...|2|🌡️||3,18",
    "A cube of side 2 has a surface area of 24 and volume 8. The SA:V ratio is...|3|📦||16,12",
    "Rate = change in amount divided by...|time|⏱️||volume,mass"
  ], "Percent change is always compared with the starting value."));
  c.push(L("Aquatic zones", [
    "Light zones|🌊|The <b>photic zone</b> is lit enough for photosynthesis. Below is the <b>aphotic zone</b> with no sunlight. The <b>benthic zone</b> is the bottom; the <b>pelagic zone</b> is the open water.",
    "Shores and mixing|🏖️|The <b>intertidal zone</b> lies between high and low tide. An <b>estuary</b> is where a river meets the sea, mixing fresh and salt water; it is a rich nursery for young fish. Lakes can mix top and bottom (<b>turnover</b>) in spring and fall.",
    "Special places|🐠|<b>Coral reefs</b> have great biodiversity in warm, clear water. In deep <b>hydrothermal vents</b>, bacteria use <b>chemosynthesis</b> of chemicals like hydrogen sulfide as energy, supporting vent communities."
  ], [
    "The lit upper zone of water is the...|photic zone|☀️||aphotic zone,benthic zone",
    "The ocean-floor zone is the...|benthic zone|🌊||pelagic zone,photic zone",
    "The open water zone is the...|pelagic zone|🌊||benthic zone,intertidal zone",
    "The area between high and low tide is the...|intertidal zone|🏖️||abyssal zone,pelagic zone",
    "A place where a river meets the sea is an...|estuary|🌅||atoll,delta only",
    "Bacteria at hydrothermal vents use...|chemosynthesis|🌋||photosynthesis,fermentation only",
    "Lake turnover happens in spring and...|fall|🍂||summer,winter",
    "Estuaries are important ... for young fish.|nurseries|🐟||predators,deserts"
  ], "Light, depth and tides decide where life lives."));
  c.push(L("Disease vectors", [
    "What is a vector?|🦟|A <b>vector</b> is an organism that carries a pathogen from one host to another. <i>Anopheles</i> mosquitoes carry the <b>malaria</b> parasite (<i>Plasmodium</i>, a protist). Ticks carry the bacteria that cause <b>Lyme disease</b>.",
    "Zoonoses|🐀|A <b>zoonotic disease</b> jumps from animals to people. A <b>reservoir</b> is where a pathogen lives between outbreaks. Other diseases like cholera spread through contaminated water, not vectors.",
    "Control|🛡️|Control measures include draining standing water where mosquitoes breed, using bed nets, clean water systems and vaccines. A reproduction number <b>R₀</b> above 1 means an outbreak is growing."
  ], [
    "An organism that carries a pathogen between hosts is a...|vector|🦟||reservoir,symbiont",
    "Malaria is spread by...|mosquitoes|🦟||flies,fleas",
    "The malaria parasite is a...|protist|🔬||virus,bacterium",
    "Lyme disease is carried by...|ticks|🕷️||mosquitoes,bees",
    "Cholera mainly spreads through contaminated...|water|💧||air,blood sprays",
    "A disease passed from animals to humans is...|zoonotic|🐀||genetic,autoimmune",
    "If R₀ is above 1, an outbreak is...|growing|📈||shrinking,over",
    "Draining standing water helps by removing...|mosquito breeding sites|🦟||the virus's genes,fish"
  ], "Break the chain that carries the germ."));
  c.push(L("Skeleton types", [
    "Hydrostatic|💦|A <b>hydrostatic skeleton</b> is fluid held under pressure in a body cavity. Muscles squeeze the fluid to change shape. Earthworms and jellyfish use one, which works well for burrowing.",
    "Exoskeleton|🦀|An <b>exoskeleton</b> is a hard outer covering, like the chitin of insects and crabs or the shell of mollusks. It protects the body, but the animal must <b>molt</b> to grow.",
    "Endoskeleton|🦴|An <b>endoskeleton</b> is inside the body. Vertebrates have bone, and sharks have cartilage. Skeletons give support and protection, and muscles pull on them to move the body."
  ], [
    "An earthworm has a ... skeleton.|hydrostatic|🪱||exoskeleton,endoskeleton",
    "An insect has an...|exoskeleton|🦗||endoskeleton,hydrostatic skeleton",
    "A human has an...|endoskeleton|🦴||exoskeleton,hydrostatic skeleton",
    "Animals with exoskeletons must ... to grow.|molt|🦀||hibernate,migrate",
    "Shark skeletons are made of...|cartilage|🦈||bone,chitin",
    "A hydrostatic skeleton uses...|fluid pressure|💦||hard plates,lignin",
    "Insect exoskeletons are made of...|chitin|🐜||keratin only,bone",
    "Muscles move a skeleton by...|pulling on it|💪||dissolving it,wrapping it in fluid"
  ], "Where is the support: inside, outside, or in fluid?"));
  c.push(L("Neurotransmitters", [
    "At the synapse|📨|A <b>neurotransmitter</b> is a chemical released from the axon end of one neuron. It crosses the gap (synapse) and binds receptors on the next cell. It is then broken down or taken back (<b>reuptake</b>) so the signal ends.",
    "Some examples|🧠|<b>Acetylcholine</b> makes muscles contract. <b>Dopamine</b> is involved in movement and reward; low dopamine causes Parkinson's disease. <b>Serotonin</b> affects mood and sleep.",
    "Excite or inhibit|🚦|<b>Glutamate</b> is the main excitatory transmitter and <b>GABA</b> is the main inhibitory one. A neuron adds up excitatory and inhibitory signals (<b>summation</b>) to decide whether to fire."
  ], [
    "Which neurotransmitter makes muscles contract?|acetylcholine|💪||GABA,serotonin",
    "Low dopamine is linked to...|Parkinson's disease|🧠||diabetes,asthma",
    "The main inhibitory neurotransmitter is...|GABA|🛑||glutamate,dopamine",
    "The main excitatory neurotransmitter is...|glutamate|⚡||GABA,insulin",
    "Taking a neurotransmitter back into the neuron is...|reuptake|🔄||transcription,osmosis",
    "Adding up signals to decide whether to fire is...|summation|➕||translation,mitosis",
    "Serotonin affects mood and...|sleep|😴||bone growth,blood clotting",
    "The gap between two neurons is the...|synapse|🔗||axon,dendrite"
  ], "Neurotransmitters carry the message across the gap."));
  c.push(L("ADH and aldosterone", [
    "ADH|💧|<b>ADH</b> (antidiuretic hormone) is made in the hypothalamus and released from the posterior pituitary when blood is too concentrated. It makes the collecting duct add <b>aquaporins</b>, so more water is reabsorbed and urine becomes concentrated.",
    "Aldosterone|🧂|<b>Aldosterone</b> from the adrenal cortex makes the kidney reabsorb more <b>sodium</b>, and water follows. The <b>renin-angiotensin system</b> triggers it when blood pressure or volume falls.",
    "Balance|⚖️|<b>ANP</b>, from the heart, does the opposite: it lowers blood volume. Drinking a lot of water lowers ADH and leads to dilute urine; dehydration raises ADH."
  ], [
    "ADH helps the body keep...|water|💧||oxygen,calcium",
    "ADH makes urine more...|concentrated|🚽||dilute,sugary",
    "Dehydration ... ADH.|raises|🏜️||lowers,does not change",
    "ADH is released from the...|posterior pituitary|🧠||adrenal cortex,pancreas",
    "Aldosterone makes the kidney reabsorb more...|sodium|🧂||glucose,iron",
    "Aldosterone comes from the...|adrenal cortex|🫘||thyroid,liver",
    "Channels that let water cross the collecting duct are...|aquaporins|🚪||ribosomes,histones",
    "ANP ... blood volume.|lowers|⬇️||raises,does not affect"
  ], "ADH saves water; aldosterone saves sodium."));
  c.push(L("Vitamins and minerals", [
    "Two kinds of vitamins|🍊|<b>Water-soluble</b> vitamins (B and C) are not stored much, and extra leaves in urine. <b>Fat-soluble</b> vitamins (A, D, E and K) are stored in body fat.",
    "Missing nutrients|🥕|Lack of <b>vitamin C</b> causes scurvy, lack of <b>vitamin D</b> weakens bones (rickets), and not enough <b>iron</b> causes anemia. <b>Iodine</b> is needed for thyroid hormone, and <b>calcium</b> is needed for bones and nerves.",
    "Essential nutrients|🥦|<b>Essential</b> nutrients must come from food because the body cannot make them. These include certain amino acids (9 for adults), certain fatty acids, vitamins and minerals."
  ], [
    "Vitamins B and C are...|water-soluble|💧||fat-soluble,not vitamins",
    "Vitamins A, D, E and K are...|fat-soluble|🧈||water-soluble,minerals",
    "Lack of vitamin C causes...|scurvy|🍊||rickets,goiter",
    "Weak bones in children from low vitamin D is...|rickets|🦴||scurvy,anemia",
    "Not enough iron can cause...|anemia|🩸||scurvy,rickets",
    "Thyroid hormone needs the mineral...|iodine|🦋||calcium,zinc only",
    "Nutrients the body cannot make are...|essential nutrients|🥦||wastes,hormones",
    "Adults need ... essential amino acids.|9|🥩||3,20"
  ], "Solubility decides whether a vitamin is stored."));
  c.push(L("Origins of multicellularity", [
    "Colonies|🫧|<b>Multicellular</b> life evolved many times, in animals, plants, fungi and algae. Some protists form colonies. <i>Volvox</i> is a green alga colony with some cells specialized for reproduction, a simple <b>division of labor</b>.",
    "Close relatives|🔬|<b>Choanoflagellates</b>, single-celled protists with a collar, are the closest living relatives of animals. Some species form colonies. Slime molds show cells aggregating and cooperating.",
    "Benefits and rules|🤝|Multicellularity allows larger size and <b>specialized cells</b>. It needs cell adhesion, cell signaling and <b>apoptosis</b> to remove damaged cells, and a split between germ cells and body (somatic) cells."
  ], [
    "Multicellular life evolved...|many times|🫧||only once,never",
    "A green alga colony with some division of labor is...|Volvox|🟢||Paramecium,Euglena",
    "The closest living relatives of animals are...|choanoflagellates|🔬||diatoms,ferns",
    "Cells in a multicellular body that are not eggs or sperm are...|somatic cells|🧫||germ cells,stem cells only",
    "Specialized cells doing different jobs shows...|division of labor|🤝||fusion,cloning",
    "Cells sticking together requires cell...|adhesion|🧲||division only,respiration",
    "Planned death of damaged cells is...|apoptosis|🛑||mitosis,photosynthesis",
    "Multicellular organisms can grow ... than single cells.|larger|📏||smaller,exactly the same size"
  ], "Many cells working together can do more."));
  c.push(L("Genetic testing and ethics", [
    "Types of tests|🧬|<b>Carrier screening</b> checks if a healthy person carries an allele for a recessive disease. <b>Newborn screening</b> tests babies for conditions such as PKU, where a special diet prevents harm. <b>Prenatal tests</b> can check a fetus.",
    "Limits|🎲|Many traits, like height and heart disease risk, depend on many genes plus environment. A <b>polygenic risk score</b> gives a chance, not a certainty. A test can also give unclear results.",
    "Ethics|⚖️|Important questions include <b>informed consent</b>, <b>privacy</b> of genetic data (laws protect against its use by employers or health insurers in some countries), fairness, and how far to go with editing human genes. A <b>genetic counselor</b> helps people understand results."
  ], [
    "Checking if a healthy person carries a recessive allele is...|carrier screening|🧬||gene editing,cloning",
    "Testing babies for conditions like PKU soon after birth is...|newborn screening|👶||carrier screening,DNA fingerprinting",
    "A polygenic risk score gives a...|chance|🎲||certainty,cure",
    "Agreeing after understanding the risks is...|informed consent|📝||privacy,screening",
    "A professional who helps explain genetic results is a...|genetic counselor|🧑‍⚕️||geologist,botanist",
    "Keeping personal genetic data safe is...|privacy|🔒||consent,cloning",
    "Height depends on many genes and the...|environment|📏||moon,single gene only",
    "PKU harm can be prevented with a special...|diet|🥗||vaccine,surgery"
  ], "Science gives data, and people decide how to use it."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 24 Challenge", [c[0], c[1], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[12], c[13], c[14], c[15], c[16], c[17], b[2], b[10], a[9]]));

  Object.assign(LIFE_LEVELS, { 22: a, 23: b, 24: c });
})();
