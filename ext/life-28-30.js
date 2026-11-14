// ext/life-28-30.js  Life Science levels 28-30 (college years 1-2: genetics, cell and developmental biology, physiology, ecology, microbiology, neuroscience, immunology, bioinformatics)
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
  const a = [];
  a.push(L("Pedigree analysis", [
    "Reading a family tree|👪|A <b>pedigree</b> is a family tree for a trait. <b>Squares are males, circles are females</b>, and filled shapes are affected people. A horizontal line joins a mating pair and vertical lines lead to their children.",
    "Dominant or recessive?|🔍|If two <b>unaffected parents</b> have an affected child, the trait is <b>recessive</b> and both parents are carriers. A <b>dominant</b> trait has an affected parent in every generation.",
    "Where is the gene?|🧬|A trait seen mostly in <b>males</b>, passed through carrier mothers, is <b>X-linked recessive</b>. A trait passed only by mothers to all children is <b>mitochondrial</b>. Only fathers to sons means <b>Y-linked</b>."
  ], [
    "Two unaffected parents have an affected child. The trait is most likely...|recessive|👪||dominant,mitochondrial",
    "A dominant trait always has at least one ... parent.|affected|👪||unaffected,carrier",
    "In a pedigree, a filled square shows an affected...|male|⬛||female,carrier female",
    "A trait that passes from an affected father to all his daughters but none of his sons is...|X-linked|🧬||autosomal,Y-linked",
    "A trait passed only from mothers to all of their children is...|mitochondrial|🔋||X-linked recessive,Y-linked",
    "X-linked recessive traits are seen more often in...|males|👦||females,both equally",
    "Two carrier parents (Aa x Aa) have a child. Chance the child is affected (aa)?|1/4|🎲||1/2,3/4",
    "A horizontal line joining a circle and a square in a pedigree shows...|a mating|➖||siblings,twins",
    "A trait that skips generations suggests it is...|recessive|👪||dominant,Y-linked",
    "A Y-linked trait passes from...|father to all sons|👨||mother to sons,father to daughters"
  ], "Look at who is affected and who is a parent."));
  a.push(L("Genetic mapping with recombination", [
    "Counting crossovers|🗺️|When two genes are on the same chromosome, <b>crossing over</b> can shuffle them. The fraction of offspring with new (<b>recombinant</b>) combinations is the <b>recombination frequency</b>.",
    "Map units|📏|<b>1% recombination = 1 map unit</b> (1 centimorgan). Genes that are far apart recombine more often. The top limit is <b>50%</b>, which is what unlinked genes show.",
    "Putting genes in order|🧭|With three genes you add distances. If A-B is 10 and B-C is 6 and A-C is 16, then B sits <b>between</b> A and C. A <b>three-point cross</b> is used to find gene order."
  ], [
    "One map unit (1 cM) equals a recombination frequency of...|1%|📏||10%,50%",
    "Two genes recombine in 12 of 100 offspring. They are...|12 map units apart|🧮||88 map units apart,24 map units apart",
    "The highest recombination frequency between two genes is...|50%|📊||100%,25%",
    "Genes with 50% recombination behave as if they are...|unlinked|🔗||tightly linked,identical",
    "Recombinant offspring come from...|crossing over|✂️||mutation,nondisjunction",
    "The closer two genes are, the ... recombinants they produce.|fewer|📏||more,equal numbers of",
    "A-B is 10 map units, B-C is 6, and A-C is 16. Gene B is...|between A and C|🧭||beyond C,beyond A",
    "Out of 200 offspring, 30 are recombinants. The distance is...|15 map units|🧮||30 map units,7.5 map units",
    "A three-point cross is mostly used to find...|gene order|🧭||chromosome number,mutation rate"
  ], "Recombinants divided by total offspring."));
  a.push(L("Lethal alleles and odd ratios", [
    "Missing offspring|💀|If one genotype dies before birth, the usual ratios change. For Aa x Aa the normal ratio is 1 AA : 2 Aa : 1 aa. If <b>AA is lethal</b>, only Aa and aa live, so the ratio is <b>2 : 1</b>.",
    "Yellow mice|🐭|The classic case is the <b>yellow coat allele</b> in mice. Yellow x yellow gives yellow and agouti in a <b>2 : 1</b> ratio, because the homozygous yellow embryos die early.",
    "Other twists|🔀|<b>Pleiotropy</b>: one gene affects many traits. <b>Maternal effect</b>: the phenotype depends on the mother's genotype, not the offspring's. <b>Complementary genes</b> can give 9 : 7 instead of 9 : 3 : 3 : 1."
  ], [
    "Aa x Aa where AA is lethal. Ratio of surviving Aa : aa is...|2:1|🎲||3:1,1:1",
    "Yellow mice crossed with yellow mice give yellow and agouti offspring in a ratio of...|2:1|🐭||3:1,1:2",
    "A maternal effect gene means the phenotype depends on the...|mother's genotype|👩||offspring's genotype,father's genotype",
    "Pleiotropy means one gene...|affects many traits|🧬||has many alleles,sits on two chromosomes",
    "Aa x Aa with incomplete dominance gives phenotypes in the ratio...|1:2:1|🎲||3:1,9:3:3:1",
    "Aa x Aa where aa dies. Chance a living child is Aa?|2/3|🧮||1/2,1/3",
    "A 2:1 ratio instead of 3:1 suggests...|a lethal homozygote|💀||linkage,codominance",
    "Aa x Aa where AA is lethal. Of 90 living offspring, expected Aa is about...|60|🧮||45,30",
    "A 9:7 ratio instead of 9:3:3:1 suggests...|complementary genes|🧬||linkage,codominance"
  ], "Remove the genotype that dies, then recount."));
  a.push(L("Chromosome rearrangements", [
    "Big changes|🧩|Whole pieces of chromosomes can change: a <b>deletion</b> loses a piece, a <b>duplication</b> repeats one, an <b>inversion</b> flips a piece around, and a <b>translocation</b> moves a piece to another chromosome.",
    "Carriers|🤝|A <b>balanced translocation</b> swaps pieces without losing any DNA, so the carrier is usually healthy. But meiosis can make <b>unbalanced gametes</b> that have too much or too little DNA.",
    "Disease examples|🩺|<b>Cri-du-chat</b> comes from a deletion on chromosome 5. The <b>Philadelphia chromosome</b> (a 9;22 translocation) causes chronic myeloid leukemia. Some Down syndrome is from a 14;21 translocation."
  ], [
    "A chromosome piece turned around end to end is...|an inversion|🔄||a deletion,a translocation",
    "A piece of a chromosome that is lost is...|a deletion|✂️||an inversion,a translocation",
    "A piece that moves to a different chromosome is...|a translocation|🚚||an inversion,a duplication",
    "Cri-du-chat syndrome results from...|a deletion on chromosome 5|🧬||an extra chromosome 21,an extra X",
    "The Philadelphia chromosome causes...|chronic myeloid leukemia|🩺||cystic fibrosis,hemophilia",
    "A person with a balanced translocation is usually...|healthy|🤝||severely ill,missing genes",
    "In meiosis an inversion heterozygote forms a...|loop|➰||ladder,knot",
    "Duplications can give the cell raw material for...|new gene functions|🧬||less DNA,extra viruses",
    "A person with a balanced translocation can produce unbalanced...|gametes|🥚||enzymes,lipids"
  ], "Think about whether a piece is lost, repeated, flipped or moved."));
  a.push(L("Inbreeding", [
    "Related parents|👨‍👩‍👧|Mating between relatives raises the chance that a child gets <b>two copies of the same ancestral allele</b>. This is measured by the <b>inbreeding coefficient (F)</b>.",
    "Values of F|🔢|Children of full siblings have <b>F = 1/4</b>. Children of first cousins have <b>F = 1/16</b>. Self-fertilizing plants halve their heterozygosity every generation.",
    "Costs and benefits|⚖️|Inbreeding increases <b>homozygosity</b>, so hidden harmful recessives appear. This is <b>inbreeding depression</b>. Crossing two inbred lines gives <b>hybrid vigor</b> (heterosis)."
  ], [
    "Inbreeding increases...|homozygosity|🧬||heterozygosity,the mutation rate",
    "Lower fitness caused by inbreeding is called inbreeding...|depression|📉||vigor,drift",
    "The symbol for the inbreeding coefficient is...|F|🔤||H,Q",
    "The inbreeding coefficient for children of full siblings is...|1/4|👫||1/8,1/2",
    "The inbreeding coefficient for children of first cousins is...|1/16|👪||1/4,1/32",
    "Crossing two inbred lines can give hybrid vigor, also called...|heterosis|🌽||depression,drift",
    "A plant that is Aa self-fertilizes. The fraction of offspring that are Aa is...|1/2|🌱||1/4,3/4",
    "After two generations of selfing from Aa, the fraction still heterozygous is...|1/4|🌱||1/2,1/8",
    "Small isolated populations inbreed more because...|mates are more likely related|🏝️||genes mutate faster,food is scarce"
  ], "Inbreeding changes how alleles are paired, not how many exist."));
  a.push(L("Linkage disequilibrium and GWAS", [
    "Inherited together|🧩|<b>Linkage disequilibrium (LD)</b> means that alleles at nearby sites on a chromosome are inherited together more often than chance. A block of alleles passed together is a <b>haplotype</b>.",
    "Scanning genomes|🔬|A <b>genome-wide association study (GWAS)</b> tests millions of <b>SNPs</b> (single nucleotide polymorphisms) to see which are more common in people with a trait or disease than in people without.",
    "Reading the results|📊|Results appear on a <b>Manhattan plot</b>. With millions of tests, only p-values below about <b>5 x 10 to the minus 8</b> count. A hit is often a <b>marker</b> near the true cause, and association is not proof of cause."
  ], [
    "GWAS stands for genome-wide association...|study|📊||score,sequence",
    "SNP stands for single nucleotide...|polymorphism|🧬||protein,placement",
    "Alleles at nearby sites inherited together more than chance show...|linkage disequilibrium|🧩||independent assortment,nondisjunction",
    "A set of alleles inherited together on one chromosome is a...|haplotype|🧩||genotype,karyotype",
    "A SNP that is more common in people with a disease is said to be...|associated with it|📊||proven to cause it,useless",
    "A Manhattan plot shows significance across the...|genome|🏙️||family tree,cell cycle",
    "A GWAS needs a very small p-value because...|millions of SNPs are tested|🧮||SNPs are rare,computers are slow",
    "The top GWAS SNP is often just a ... for the real causal variant.|marker|📍||enzyme,virus",
    "Different ancestry between cases and controls can cause...|false associations|⚠️||faster sequencing,lower cost"
  ], "Think about SNPs, millions of tests and nearby genes."));
  a.push(L("Southern, Northern and Western blots", [
    "Three blots|🧫|A <b>blot</b> finds one molecule in a mixture. Samples are first separated by size using <b>gel electrophoresis</b>, then moved onto a <b>membrane</b> and detected with a probe.",
    "What each detects|🔎|A <b>Southern blot</b> detects <b>DNA</b> with a labeled DNA probe. A <b>Northern blot</b> detects <b>RNA</b>. A <b>Western blot</b> detects <b>protein</b> using an <b>antibody</b>.",
    "Uses|🧪|Southern: is a gene present, deleted or rearranged? Northern: how much mRNA does a tissue make? Western: is the protein made and how big is it?"
  ], [
    "A Southern blot detects...|DNA|🧬||RNA,protein",
    "A Northern blot detects...|RNA|🧬||DNA,protein",
    "A Western blot detects...|protein|🧬||DNA,RNA",
    "Which blot shows how much mRNA a tissue makes?|Northern|🧫||Southern,Western",
    "A Western blot uses ... to find its target.|antibodies|🛡️||DNA probes,restriction enzymes",
    "A Southern blot finds a gene using a|labeled DNA probe|🔦||antibody,protein stain",
    "Blots begin by separating samples by size with...|gel electrophoresis|⚡||centrifuging,microscopy",
    "After the gel, the molecules are transferred to a...|membrane|📄||test tube,petri dish",
    "Which blot would show whether a gene is deleted in genomic DNA?|Southern|🧫||Northern,Western"
  ], "The name tells you the type of molecule."));
  a.push(L("Sanger and next-generation sequencing", [
    "Sanger sequencing|🧬|Frederick Sanger's method adds special <b>dideoxynucleotides (ddNTPs)</b> with fluorescent tags. A ddNTP lacks a 3' OH, so the new strand <b>stops</b>. The fragments are sorted by size and the colors read in order.",
    "Next-generation sequencing|⚡|<b>NGS</b> reads millions of short fragments <b>in parallel</b>. A computer assembles them. <b>Coverage</b> of 30x means each base is read about 30 times, which reduces errors.",
    "Reads and quality|📏|<b>Long-read</b> methods help with repeats and big rearrangements. A <b>Phred score of Q30</b> means about 1 error in 1000 bases. The first human genome was essentially finished in 2003."
  ], [
    "Sanger sequencing uses special nucleotides called...|dideoxynucleotides|🧬||restriction enzymes,ribosomes",
    "A dideoxynucleotide makes the growing DNA chain...|stop|🛑||grow faster,split in two",
    "Sanger fragments are sorted by size using...|capillary electrophoresis|⚡||Western blotting,microscopy",
    "Sanger sequencing was developed by...|Frederick Sanger|👨‍🔬||Rosalind Franklin,Gregor Mendel",
    "Next-generation sequencing reads millions of fragments...|in parallel|⚡||one at a time,by hand",
    "A coverage of 30x means each base is read about...|30 times|📏||3 times,300 times",
    "Long reads are especially helpful for...|repetitive regions|📏||protein folding,counting ribosomes",
    "A Phred score of Q30 means about 1 error in...|1000 bases|🎯||30 bases,100 bases",
    "The first human genome was essentially finished in...|2003|📅||1985,2015"
  ], "Think about what stops or what runs at the same time."));
  a.push(L("qPCR and reporter genes", [
    "Measuring while copying|📈|<b>Quantitative PCR (qPCR)</b> measures DNA as it is copied, using a fluorescent dye. The <b>Ct value</b> is the cycle at which the signal crosses a line. A <b>lower Ct</b> means <b>more starting template</b>.",
    "RT-qPCR|🧪|To measure gene expression, mRNA is first turned into <b>cDNA</b> by reverse transcriptase, then measured. Ideally each cycle <b>doubles</b> the amount. A <b>housekeeping gene</b> is used as a control.",
    "Reporter genes|💡|A <b>reporter gene</b> such as <b>GFP</b> (from a jellyfish) or <b>luciferase</b> is attached to a promoter. When the promoter is active the cell glows, showing <b>when and where</b> a gene is on."
  ], [
    "qPCR measures how much starting...|template there is|📈||protein folds,cell size",
    "RT-qPCR begins with...|RNA|🧪||protein,lipid",
    "A lower Ct value means ... starting template.|more|📉||less,no",
    "Ideally, each PCR cycle ... the amount of DNA.|doubles|✖️||triples,halves",
    "Starting with 8 copies, after 3 ideal cycles you have...|64|🧮||24,32",
    "A reporter gene shows...|when and where a gene is on|💡||mutation rate,DNA length",
    "GFP was first found in...|a jellyfish|🪼||a firefly,a bacterium",
    "A luciferase reporter gives off...|light|💡||sound,heat only",
    "A housekeeping gene is used as a...|control|📏||target,reporter of disease"
  ], "Think about starting amount and doubling."));
  a.push(L("Nucleosomes and chromatin", [
    "Beads on a string|📿|DNA wraps about <b>147 base pairs</b> around a core of <b>eight histone proteins</b> (a histone octamer). This unit is a <b>nucleosome</b>. <b>Linker DNA</b> joins them and <b>histone H1</b> binds the linker.",
    "Open and closed|🔓|<b>Euchromatin</b> is loosely packed and active. <b>Heterochromatin</b> is tightly packed and mostly silent. Histones are rich in lysine and arginine, which are <b>positively charged</b> and grip the negative DNA.",
    "Changing the packing|🔧|<b>Acetylation</b> of histones loosens chromatin. Methylation of H3 on lysine 9 marks silent chromatin. <b>Chromatin remodelers</b> use ATP to slide or remove nucleosomes."
  ], [
    "A nucleosome core has DNA wrapped around ... histone proteins.|eight|📿||four,two",
    "DNA wraps about ... base pairs around the nucleosome core.|147|📿||14,1470",
    "Histone H1 binds the...|linker DNA|📿||ribosome,mitochondrion",
    "Tightly packed, mostly silent chromatin is...|heterochromatin|🔒||euchromatin,cytochrome",
    "Acetylation of histones tends to ... chromatin.|loosen|🔓||tighten,cut",
    "H3 lysine 9 methylation marks...|silent chromatin|🔒||active genes,replication origins",
    "Chromatin remodelers use ATP to...|slide nucleosomes|🔧||make ATP,copy DNA",
    "Histones are rich in lysine and arginine, which are...|positively charged|➕||negatively charged,neutral",
    "DNA is negatively charged because of its...|phosphate groups|➖||bases,water"
  ], "Packing, charge and chemical tags control access to genes."));
  a.push(L("Mutagens and the Ames test", [
    "What damages DNA|☢️|<b>Mutagens</b> raise the mutation rate. <b>UV light</b> makes thymine dimers, <b>X-rays</b> break DNA strands, <b>base analogs</b> like 5-bromouracil mimic normal bases, and <b>intercalators</b> like ethidium bromide slip between bases.",
    "The Ames test|🧫|The <b>Ames test</b> uses <b>Salmonella</b> bacteria that cannot make <b>histidine</b>. If a chemical is mutagenic, some bacteria <b>revert</b> and can grow on a plate without histidine. More colonies means a stronger mutagen.",
    "Liver extract|🧪|Some chemicals only become mutagenic after the liver processes them. So the test adds a <b>liver enzyme extract</b> (S9) to catch chemicals activated by metabolism."
  ], [
    "The Ames test uses...|Salmonella bacteria|🧫||mice,human cells",
    "The Ames bacteria cannot make...|histidine|🧫||glucose,ATP",
    "A mutagenic chemical lets some bacteria...|revert and grow|🧫||stop growing,turn blue",
    "More colonies on the Ames plate means the chemical is...|more mutagenic|🧫||less mutagenic,not tested",
    "UV light mainly causes...|thymine dimers|☀️||ribose loss,histone methylation",
    "X-rays often cause...|double-strand breaks|⚡||thymine dimers,base analogs",
    "5-bromouracil is a base analog, so it...|mimics a normal base|🧬||digests DNA,makes histones",
    "Ethidium bromide is an intercalator, so it...|slips between bases|🧬||cuts DNA,adds a cap",
    "Liver extract is added to the Ames test to find chemicals that...|are activated by metabolism|🧪||are viral,are freezing"
  ], "Think about what the bacteria need and what changes."));
  a.push(L("Reading a mutated sequence", [
    "Mutation effects|🔡|A <b>silent</b> mutation does not change the amino acid. A <b>missense</b> mutation swaps one amino acid. A <b>nonsense</b> mutation makes a stop codon (UAA, UAG or UGA) and cuts the protein short.",
    "Insertions and deletions|➖|Adding or removing 1 or 2 bases causes a <b>frameshift</b> and changes every codon after it. Adding or removing <b>3 bases</b> keeps the frame and changes only one amino acid.",
    "Famous example|🩸|In <b>sickle cell disease</b>, the codon GAG (glutamic acid) becomes GUG (valine) in the beta globin gene. That is a missense mutation."
  ], [
    "GAA becomes GAG (both code for glutamic acid). This is a ... mutation.|silent|🔡||missense,nonsense",
    "GAA (Glu) becomes GUA (Val). This is a ... mutation.|missense|🔡||silent,nonsense",
    "UGG (Trp) becomes UGA (stop). This is a ... mutation.|nonsense|🛑||silent,missense",
    "Deleting one base in the middle of a gene causes a...|frameshift|➖||silent change,missense in one codon",
    "Deleting three bases in a row (in frame) usually removes...|one amino acid|➖||all later amino acids,nothing",
    "Inserting 2 bases into a coding sequence causes a...|frameshift|➕||silent change,gain of one amino acid",
    "Which is usually most harmful?|a nonsense mutation near the start|🛑||a silent mutation,a missense near the end",
    "Sickle cell disease replaces glutamic acid with...|valine|🩸||lysine,glycine",
    "A mutation in a promoter would most likely change...|how much RNA is made|🧬||the amino acid sequence,the codon table"
  ], "Compare the old and new codon, one at a time."));
  a.push(L("mRNA stability and decay", [
    "Protecting mRNA|🛡️|Eukaryotic mRNA is protected by a <b>5' cap</b> and a <b>poly-A tail</b> bound by poly-A binding protein. Decay usually starts with <b>deadenylation</b> (shortening the tail), then <b>decapping</b>, then <b>exonucleases</b> chew the mRNA.",
    "Quality control|🔍|<b>Nonsense-mediated decay</b> destroys mRNAs with <b>premature stop codons</b>. <b>AU-rich elements</b> in the 3' UTR usually make mRNA <b>less stable</b>. Decay happens in places called <b>P-bodies</b>.",
    "Why it matters|⏱️|Short-lived mRNAs let a cell <b>change protein levels quickly</b>. Bacterial mRNAs last only minutes. Many eukaryotic mRNAs last hours."
  ], [
    "An mRNA is protected by a 5' cap and a...|poly-A tail|🛡️||ribosome,promoter",
    "Poly-A binding protein binds the...|poly-A tail|🛡️||5' cap,introns",
    "The first step of mRNA decay is usually...|shortening the poly-A tail|✂️||adding introns,splicing",
    "After decapping, the mRNA is chewed from the 5' end by...|an exonuclease|✂️||a ligase,a helicase",
    "Nonsense-mediated decay destroys mRNAs with...|premature stop codons|🛑||long poly-A tails,extra caps",
    "AU-rich elements in the 3' UTR usually make mRNA...|less stable|⏳||more stable,circular",
    "Bacterial mRNAs typically last about...|minutes|⏱️||days,years",
    "Short-lived mRNAs let cells...|respond quickly|⏱️||avoid transcription,stop growing",
    "P-bodies are sites of mRNA...|storage and decay|🏭||replication,lipid making"
  ], "Think about how the cell removes mRNA it no longer needs."));
  a.push(L("Riboswitches and attenuation", [
    "RNA that senses|🔔|A <b>riboswitch</b> is a part of an mRNA (often the 5' leader) that <b>binds a small molecule</b>. Binding changes how the RNA folds, which turns the gene on or off. No protein is needed.",
    "Terminators|🛑|An <b>intrinsic terminator</b> is a hairpin followed by a string of <b>uracils</b>, which makes RNA polymerase stop. An <b>anti-terminator</b> hairpin lets transcription continue.",
    "Attenuation|⏩|In bacteria, transcription and translation happen together. In the <b>trp operon</b>, when tryptophan is plentiful the leader RNA folds a terminator and <b>transcription ends early</b>. This is <b>attenuation</b>."
  ], [
    "A riboswitch is an RNA that senses a...|small molecule|🔔||ribosome,chromosome",
    "Riboswitches are often found in the mRNA...|leader (5' UTR)|🧬||poly-A tail,introns of DNA",
    "Ligand binding changes the RNA's...|folding|🌀||sequence,length",
    "When tryptophan is plentiful, attenuation...|ends transcription early|🛑||increases transcription,cuts DNA",
    "Attenuation works because in bacteria transcription and translation happen...|together|⏩||in different cells,in the nucleus",
    "An intrinsic terminator has a hairpin followed by a string of...|uracils|🛑||guanines,adenines",
    "An anti-terminator hairpin lets transcription...|continue|⏩||stop,reverse",
    "The TPP riboswitch binds...|thiamine pyrophosphate|🔔||glucose,ATP",
    "Riboswitches are mainly found in...|bacteria|🦠||mammals,viruses only"
  ], "Folding of the RNA decides what happens next."));
  a.push(L("Bayes and genetic risk", [
    "Updating a probability|🎲|<b>Bayes' theorem</b> updates a <b>prior probability</b> using new evidence to give a <b>posterior probability</b>. In genetics the evidence might be a test result or unaffected children.",
    "Tests|🧪|<b>Sensitivity</b> is how well a test finds people who have a condition (true positives). <b>Specificity</b> is how well it clears people who do not. When a condition is rare, most positives can be <b>false positives</b>.",
    "Carrier example|👩|A woman has prior 1/2 of being an X-linked carrier. If she has two unaffected sons, the chance of that is 1/4 for a carrier and 1 for a non-carrier. Posterior = (1/2 x 1/4) / (1/2 x 1/4 + 1/2 x 1) = <b>1/5</b>."
  ], [
    "Bayes' theorem updates a ... probability using new evidence.|prior|🎲||posterior,random",
    "The updated probability after new evidence is called the...|posterior|🎲||prior,null",
    "A condition affects 1 in 1000. A test has no misses and 5% false positives. Of 1000 people, about how many test positive?|51|🧮||1,500",
    "In that case, a positive result is...|mostly false|⚠️||mostly true,always true",
    "A woman has prior 1/2 of being a carrier. Two unaffected sons make her carrier chance...|smaller|👩||larger,unchanged",
    "A woman has prior 1/2 of being a carrier and two unaffected sons. Her new carrier chance is...|1/5|🧮||1/4,1/2",
    "Sensitivity is the ability to find true...|positives|🧪||negatives,errors",
    "Specificity is the ability to correctly clear people who...|do not have the condition|🧪||have the condition,were not tested",
    "Base rate neglect means ignoring...|how common the condition is|⚠️||the test brand,the lab name"
  ], "Start with the prior, then see how the evidence changes it."));
  a.push(L("Penetrance and expressivity", [
    "Two different ideas|🎚️|<b>Penetrance</b> is the percentage of people with a genotype who show the trait <b>at all</b>. <b>Expressivity</b> is <b>how strongly</b> the trait shows in those who have it.",
    "Examples|🖐️|<b>Polydactyly</b> (extra fingers) shows variable expressivity: some people have a small extra digit, others a full one. <b>BRCA1</b> mutations have incomplete penetrance: not every carrier gets breast cancer.",
    "Why they vary|🌍|Other genes, the environment and chance all change penetrance and expressivity. Some traits, like Huntington disease, show <b>age-dependent penetrance</b>: symptoms appear later in life."
  ], [
    "Penetrance is the percentage of carriers who show the trait...|at all|🎚️||strongly,in old age",
    "Expressivity is how ... a trait shows.|strongly|🎚️||often,early",
    "An allele has 80% penetrance. Of 50 carriers, the number expected to show the trait is...|40|🧮||30,25",
    "Incomplete penetrance means some carriers are...|unaffected|🎚️||dead,sterile",
    "Polydactyly shows variable...|expressivity|🖐️||dominance,lethality",
    "A BRCA1 mutation has ... penetrance for breast cancer.|incomplete|🎗️||complete,zero",
    "Complete penetrance means...|every carrier shows the trait|✅||half of carriers show it,no carrier shows it",
    "Of 200 carriers, 150 are affected. Penetrance is...|75%|🧮||50%,150%",
    "Age-dependent penetrance means symptoms...|appear later in life|⏳||vanish with age,need an X chromosome"
  ], "One idea is yes or no, the other is how much."));
  a.push(L("Tetrad analysis", [
    "All four products|🍄|In fungi like <b>yeast</b> and <b>Neurospora</b>, the four products of one meiosis stay together in a sac. In Neurospora they are in order and one mitosis makes <b>8 ascospores</b>. The main phase is <b>haploid</b>.",
    "Ratios and crossovers|🧮|A <b>4:4</b> pattern means no crossover between the gene and the centromere. A <b>2:2:2:2</b> or <b>2:4:2</b> pattern shows a crossover happened. Rare ratios like <b>6:2</b> come from <b>gene conversion</b>.",
    "Two genes|🧬|<b>Parental ditype (PD)</b> has only parental combinations, <b>nonparental ditype (NPD)</b> only recombinants, and a <b>tetratype</b> has 2 parental and 2 recombinant spores. If PD far exceeds NPD, the genes are <b>linked</b>."
  ], [
    "Neurospora makes ... ascospores per ascus.|8|🍄||4,2",
    "The main life phase of Neurospora is...|haploid|🍄||diploid,triploid",
    "A 4:4 spore pattern means no crossover between the gene and the...|centromere|🍄||telomere,nucleus",
    "A 2:2:2:2 pattern shows...|a crossover happened|🍄||no crossover,a deletion",
    "A rare 6:2 ratio comes from...|gene conversion|🍄||nondisjunction,translocation",
    "Yeast tetrads let us study all four products of...|one meiosis|🍄||one mitosis,one virus",
    "A tetratype ascus has...|2 parental and 2 recombinant spores|🍄||4 parental spores,4 recombinant spores",
    "If parental ditypes far outnumber nonparental ditypes, the genes are...|linked|🔗||unlinked,on different species",
    "If PD and NPD are about equal, the genes are...|unlinked|🔗||tightly linked,deleted"
  ], "Count what kinds of spores are in each sac."));
  a.push(L("X-linked genes in populations", [
    "One X in males|👦|Males have one X, so they show an X-linked recessive allele whenever they carry it. If the allele frequency is <b>q</b>, affected males = <b>q</b> and affected females = <b>q squared</b>.",
    "Carriers|👩|Female carriers are <b>2pq</b>, where p is 1 minus q. If q is small, 2pq is about 2q. For females the Hardy-Weinberg formula <b>p squared + 2pq + q squared = 1</b> still works.",
    "Color blindness|🎨|Red-green color blindness affects about <b>8%</b> of men (q = 0.08) and about <b>0.64%</b> of women (0.08 squared)."
  ], [
    "An X-linked recessive allele has q = 0.08. The fraction of affected males is...|8%|👦||0.64%,16%",
    "With q = 0.1, the fraction of affected females is...|1%|👩||10%,20%",
    "X-linked recessive disorders are more common in males because males have...|only one X|👦||two X chromosomes,no X",
    "With q = 0.08, the fraction of affected females is about...|0.64%|👩||8%,16%",
    "With q = 0.01, the fraction of carrier females (2pq) is about...|2%|👩||1%,0.02%",
    "Males receive their X chromosome from their...|mother|👦||father,both parents",
    "For females, the Hardy-Weinberg formula is...|p2 + 2pq + q2 = 1|🧮||p + q = 2,pq = 1",
    "If 1 in 100 males is affected, then q is...|0.01|🧮||0.1,0.001",
    "If 1 in 10000 males is affected, affected females are about 1 in...|100 million|🧮||20000,10000"
  ], "Males count q, females count q squared."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 28 Challenge", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));

  // ================= LEVEL 29 =================
  const b = [];
  b.push(L("The extracellular matrix", [
    "Outside the cell|🧱|Animal cells sit in an <b>extracellular matrix (ECM)</b>: a mesh of proteins and sugars. <b>Collagen</b>, the most abundant protein in mammals, forms strong triple-helix fibers. <b>Elastin</b> lets tissues stretch and spring back.",
    "Links and gels|🔗|<b>Fibronectin</b> connects cells to the matrix through <b>integrins</b>, which link to the cell's cytoskeleton. <b>Proteoglycans</b> trap water and make a cushiony gel. A <b>basement membrane</b> lies under epithelial layers.",
    "Remodeling|🛠️|Enzymes called <b>matrix metalloproteinases (MMPs)</b> break down ECM during growth and healing. Cancer cells misuse MMPs to <b>invade tissues</b>. Making collagen needs <b>vitamin C</b>; without it you get scurvy."
  ], [
    "The most abundant protein in mammals is...|collagen|🧱||keratin,hemoglobin",
    "Collagen fibers are made of a...|triple helix|🧬||beta barrel,single loop",
    "Elastin lets tissues...|stretch and recoil|🎈||carry oxygen,cut DNA",
    "Fibronectin links cells to the matrix through...|integrins|🔗||aquaporins,ribosomes",
    "Integrins connect the matrix to the cell's...|cytoskeleton|🔗||nucleolus,ribosomes",
    "Proteoglycans attract and hold...|water|💧||oxygen,iron",
    "A basement membrane lies under...|epithelial cells|🧱||red blood cells,bone marrow",
    "MMPs are enzymes that...|break down the matrix|✂️||build collagen,make ATP",
    "Cancer cells use MMPs to...|invade tissues|🦀||make bone,fight infection"
  ], "Think about what the matrix is made of and what it does."));
  b.push(L("Notch signaling and induction", [
    "Contact signals|🤝|In <b>Notch signaling</b>, the Notch receptor on one cell binds the <b>Delta</b> ligand on a neighbor. It needs <b>direct contact</b> (juxtacrine signaling), so it works on neighboring cells only.",
    "Cutting the receptor|✂️|After Delta binds, Notch is cut and its <b>intracellular domain</b> travels to the <b>nucleus</b> to turn genes on. This is how one cell can change the fate of another, called <b>induction</b>.",
    "Lateral inhibition|⚖️|A cell with more Delta pushes its neighbors to take a <b>different fate</b>, creating patterns such as single neurons among skin cells. Notch mutations give fruit flies <b>notched wings</b>, and overactive Notch1 is linked to <b>T-cell leukemia</b>."
  ], [
    "Notch signaling needs...|direct cell contact|🤝||a bloodstream,a virus",
    "The ligand that binds Notch is...|Delta|🤝||insulin,collagen",
    "After Delta binds, the Notch intracellular domain moves to the...|nucleus|✂️||mitochondrion,Golgi",
    "A signal that needs direct contact is called...|juxtacrine|🤝||endocrine,autocrine",
    "In lateral inhibition a cell with more Delta pushes its neighbors to...|a different fate|⚖️||the same fate,apoptosis only",
    "When one group of cells changes the fate of neighbors, this is...|induction|🤝||mutation,translation",
    "Notch mutations in fruit flies cause...|notched wing edges|🪰||extra legs,white eyes",
    "Overactive Notch1 is linked to...|T-cell leukemia|🩺||scurvy,hemophilia",
    "Notch signaling works over...|neighboring cells|📏||the whole body,the bloodstream"
  ], "This signal is a neighbor-to-neighbor message."));
  b.push(L("Cell lineages in C. elegans", [
    "A tiny worm|🪱|<b>C. elegans</b> is a transparent roundworm about 1 mm long. An adult hermaphrodite has <b>959 somatic cells</b>, including <b>302 neurons</b>. Its cell lineage is <b>invariant</b>: every worm follows the same pattern.",
    "Cells that die|💥|In development <b>exactly 131 cells die</b> by programmed cell death. Genes like <b>ced-3</b>, which codes for a <b>caspase</b>, run the process. This work won the 2002 Nobel Prize (Brenner, Horvitz and Sulston).",
    "A model organism|🔬|Because the worm is see-through, scientists can watch cells divide and follow a <b>fate map</b> of what each early cell becomes. <b>RNA interference</b> was also discovered in C. elegans."
  ], [
    "An adult hermaphrodite C. elegans has ... somatic cells.|959|🪱||95,9590",
    "Exactly ... cells die by programmed cell death in development.|131|💥||13,1310",
    "C. elegans has ... neurons.|302|🧠||30,3020",
    "An invariant cell lineage is...|the same in every worm|🪱||different in each worm,random",
    "C. elegans is a good model because it is...|transparent|🔬||large,furry",
    "The gene ced-3 codes for a...|caspase|💥||ribosome,collagen",
    "C. elegans is a type of...|roundworm|🪱||fruit fly,fish",
    "RNA interference was discovered in...|C. elegans|🧬||yeast,mice",
    "A fate map shows what each early cell...|becomes|🗺️||eats,weighs"
  ], "Think of a small see-through animal with a fixed cell plan."));
  b.push(L("Germ layers and the neural crest", [
    "Three layers|🥞|The early embryo has three <b>germ layers</b>. <b>Ectoderm</b> makes skin and the nervous system. <b>Mesoderm</b> makes muscle, bone, blood, heart and kidneys. <b>Endoderm</b> makes the lining of the gut, the liver and lungs.",
    "The fourth layer|🚚|<b>Neural crest cells</b> form at the edge of the closing neural tube, then <b>migrate</b> all over the body. They are sometimes called the fourth germ layer.",
    "What they become|🎨|Neural crest cells make <b>melanocytes</b> (pigment cells), <b>Schwann cells</b>, sensory and gut neurons, facial cartilage and bone, and the <b>adrenal medulla</b>. In Hirschsprung disease, they fail to reach the gut."
  ], [
    "The skin's epidermis comes from the...|ectoderm|🥞||mesoderm,endoderm",
    "The liver comes from the...|endoderm|🥞||ectoderm,mesoderm",
    "The heart and blood come from the...|mesoderm|🥞||ectoderm,endoderm",
    "Melanocytes (pigment cells) come from the...|neural crest|🎨||endoderm,mesoderm",
    "Neural crest cells form at the edge of the...|neural tube|🥞||gut,heart",
    "Schwann cells come from the...|neural crest|🎨||endoderm,mesoderm",
    "Neural crest cells are special because they...|migrate widely|🚚||never move,stay in the brain",
    "The adrenal medulla comes from the...|neural crest|🎨||endoderm,mesoderm",
    "In Hirschsprung disease neural crest cells fail to reach the...|gut|🩺||heart,eye"
  ], "Which layer builds which organs?"));
  b.push(L("Sex determination", [
    "Mammals|🧬|In mammals, sex is set by the <b>Y chromosome gene SRY</b> (sex-determining region Y). With SRY the embryonic gonads become <b>testes</b>. Without SRY they become <b>ovaries</b>.",
    "Hormones guide the rest|🧪|Testes make <b>testosterone</b> (Leydig cells) and <b>AMH</b> (Sertoli cells), which makes the Mullerian ducts regress. Without them the body follows the female pattern.",
    "Other animals|🌍|Birds use <b>ZW</b> females and <b>ZZ</b> males. In many reptiles, such as alligators, <b>nest temperature</b> sets sex. In honeybees, males come from <b>unfertilized eggs</b>. In fruit flies, the ratio of X chromosomes to autosome sets decides."
  ], [
    "The mammalian gene that starts testis development is...|SRY|🧬||BRCA1,HOX",
    "Without SRY the embryonic gonads become...|ovaries|🧬||testes,kidneys",
    "AMH is made by...|Sertoli cells|🧪||Leydig cells,red blood cells",
    "Testosterone is made by...|Leydig cells|🧪||Sertoli cells,neurons",
    "In birds, females are...|ZW|🐦||ZZ,XY",
    "In many alligators, sex is set by...|nest temperature|🐊||the moon,diet",
    "In honeybees, males develop from...|unfertilized eggs|🐝||fertilized eggs,two queens",
    "In fruit flies, sex depends on the ratio of X chromosomes to...|autosome sets|🪰||Y chromosomes,mitochondria",
    "SRY is found on the...|Y chromosome|🧬||X chromosome,chromosome 21"
  ], "Different species use different switches."));
  b.push(L("Placenta and pregnancy hormones", [
    "Early signals|🤰|After implantation the embryo makes <b>hCG</b>, which keeps the <b>corpus luteum</b> making progesterone. Pregnancy tests detect hCG in urine.",
    "The placenta|🍃|The <b>placenta</b> exchanges oxygen, nutrients and wastes between mother and fetus <b>without mixing their blood</b>. After a few weeks (about 8 to 12) it takes over making <b>progesterone</b> and estrogen.",
    "Birth|👶|<b>Oxytocin</b> makes the uterus contract. Contractions push on the cervix, which sends signals that release more oxytocin, a <b>positive feedback loop</b>. <b>Prolactin</b> later drives milk production. Fetal hemoglobin grabs oxygen more tightly than adult hemoglobin."
  ], [
    "A pregnancy test detects the hormone...|hCG|🤰||insulin,oxytocin",
    "hCG keeps the ... making progesterone.|corpus luteum|🤰||liver,thyroid",
    "The placenta exchanges materials ... the blood of mother and fetus.|without mixing|🍃||by fully mixing,only with",
    "Later in pregnancy, progesterone is mainly made by the...|placenta|🍃||pancreas,spleen",
    "The hormone that makes the uterus contract at birth is...|oxytocin|👶||prolactin,glucagon",
    "Birth contractions are an example of...|positive feedback|🔁||negative feedback,no feedback",
    "Milk production is driven by...|prolactin|🍼||oxytocin only,insulin",
    "Fetal hemoglobin has ... affinity for oxygen than adult hemoglobin.|higher|🩸||lower,the same",
    "Pregnancy hormones must be high enough to prevent...|menstruation|🤰||digestion,breathing"
  ], "Think about who makes the hormone and what it protects."));
  b.push(L("Senescence and aging", [
    "Cells stop dividing|⏳|Normal human cells divide only about <b>50 times</b>, the <b>Hayflick limit</b>. Shortening <b>telomeres</b> and DNA damage push cells into <b>senescence</b>, where they stop dividing but stay alive.",
    "Why aging happens|🧓|Senescent cells release inflammatory signals (the <b>SASP</b>). Other contributors are damaged mitochondria, oxidative damage, and slow protein repair. The <b>disposable soma</b> idea says bodies invest little in repair because evolution favors reproduction.",
    "Slowing aging|🔬|<b>Caloric restriction</b> extends lifespan in many animals, linked to <b>mTOR</b> and insulin signaling. <b>Progeria</b> is rapid aging caused by a mutation in the lamin A gene (LMNA)."
  ], [
    "Human cells divide about ... times in culture (the Hayflick limit).|50|⏳||5,500",
    "A cell that stops dividing but stays alive is...|senescent|⏳||apoptotic,mutant",
    "Shortening of ... pushes cells toward senescence.|telomeres|⏳||ribosomes,mitochondria",
    "Senescent cells release inflammatory signals called the...|SASP|📣||GFP,PCR",
    "The Hayflick limit is named after...|Leonard Hayflick|👨‍🔬||Gregor Mendel,Louis Pasteur",
    "The disposable soma idea says bodies put little into...|repair|🔧||reproduction,growth hormone",
    "In many animals, caloric restriction ... lifespan.|extends|🍽️||shortens,does not change",
    "Progeria is caused by a mutation in the gene for...|lamin A|🧓||hemoglobin,insulin",
    "The pathway linked to nutrient sensing and aging is...|mTOR|🔬||PCR,GFP"
  ], "Divisions are limited and damage builds up."));
  b.push(L("Plant light sensors and flowering", [
    "Sensing light|🌞|<b>Phytochromes</b> sense red and far-red light. Red light converts Pr to the active form <b>Pfr</b>, and far-red light converts it back. <b>Phototropins</b> and <b>cryptochromes</b> sense blue light and drive bending toward light.",
    "Night length|🌙|Flowering depends on the length of the <b>night</b>, not the day. <b>Short-day plants</b> flower when nights are longer than a critical length. <b>Long-day plants</b> flower when nights are shorter.",
    "A flowering signal|🌸|Leaves detect the night length and make a signal, <b>florigen</b> (the FT protein), that travels through the <b>phloem</b> to the shoot tip. A flash of red light in a long night can stop a short-day plant from flowering."
  ], [
    "Phytochromes sense...|red and far-red light|🌞||sound,gravity",
    "Red light converts phytochrome to its ... form.|active|🌞||dead,frozen",
    "Far-red light ... the effect of red light.|reverses|🌞||doubles,hides",
    "Blue light sensors that drive bending include...|phototropins|🌱||phytochromes only,ribosomes",
    "Flowering depends mainly on the length of the...|night|🌙||day,rainy season",
    "Short-day plants flower when nights are...|long|🌙||short,absent",
    "The mobile flowering signal is called...|florigen|🌸||auxin,melatonin",
    "Florigen travels through the...|phloem|🌸||xylem,roots only",
    "A flash of red light in a long night will ... a short-day plant.|keep from flowering|🔴||make flower,kill",
    "Long-day plants flower when nights are...|short|🌙||long,absent"
  ], "Plants actually measure the dark period."));
  b.push(L("The nephron in segments", [
    "Filtering|🫘|Blood is filtered in the <b>glomerulus</b> into <b>Bowman's capsule</b>. The <b>proximal tubule</b> then reabsorbs about <b>65%</b> of the filtrate, including most sodium, water, glucose and amino acids.",
    "The loop|🔁|The <b>descending limb</b> is permeable to water, so water leaves. The <b>thick ascending limb</b> pumps out salt but is <b>not permeable to water</b>. Together these build a salty gradient in the medulla.",
    "Final adjustments|🎛️|In the <b>collecting duct</b>, <b>ADH</b> inserts <b>aquaporins</b> so water can leave and urine becomes concentrated. Glucose normally is fully reabsorbed; glucose in urine means carriers were overwhelmed, as in diabetes."
  ], [
    "Blood is filtered into Bowman's capsule from the...|glomerulus|🫘||collecting duct,loop of Henle",
    "About 65% of filtrate is reabsorbed in the...|proximal tubule|🫘||collecting duct,bladder",
    "The descending limb of the loop is permeable to...|water|💧||salt only,glucose",
    "The thick ascending limb pumps out salt but is not permeable to...|water|💧||sodium,potassium",
    "The loop of Henle builds a salty gradient in the...|medulla|🔁||cortex,pelvis",
    "In the collecting duct, ADH inserts...|aquaporins|💧||ribosomes,hemoglobin",
    "Glucose normally appears in urine...|almost never|🍬||always,only at night",
    "Glucose in urine suggests the carriers were...|overwhelmed|🍬||empty,missing a nucleus",
    "Most glucose and amino acids are reabsorbed in the...|proximal tubule|🫘||collecting duct,loop of Henle"
  ], "Follow the fluid segment by segment."));
  b.push(L("Filtration and Starling forces", [
    "Pushing fluid out|⬆️|In capillaries, <b>hydrostatic pressure</b> pushes fluid out, while <b>oncotic pressure</b> (from proteins, mainly <b>albumin</b>) pulls fluid back in. These are the <b>Starling forces</b>.",
    "The glomerulus|🫘|Net filtration pressure = glomerular hydrostatic (about 55 mmHg) minus capsule pressure (15) minus oncotic pressure (30), so about <b>10 mmHg</b>. The <b>GFR</b> is about <b>125 mL/min</b> and is estimated with <b>creatinine</b>.",
    "Edema|🦵|If blood albumin drops, or capillary pressure rises, extra fluid stays in the tissue. This swelling is <b>edema</b>. The <b>lymphatic system</b> returns leftover fluid to the blood."
  ], [
    "Hydrostatic pressure pushes fluid ... of capillaries.|out|⬆️||into the cells,around",
    "Oncotic pressure pulls fluid ... capillaries.|into|⬇️||out of,over",
    "The protein mainly responsible for blood oncotic pressure is...|albumin|🩸||collagen,insulin",
    "Glomerular pressure 55, capsule 15, oncotic 30. Net filtration pressure is...|10 mmHg|🧮||40 mmHg,70 mmHg",
    "A normal GFR is about...|125 mL/min|🫘||12 mL/min,1250 mL/min",
    "A substance used to estimate GFR is...|creatinine|🧪||sodium,insulin",
    "Low albumin in blood tends to cause...|edema|🦵||dehydration,clotting",
    "Fluid left in tissues is returned to blood by the...|lymphatic system|💧||spinal cord,skin",
    "Narrowing the efferent arteriole ... glomerular pressure.|raises|🫘||lowers,does not affect"
  ], "Compare what pushes fluid out with what pulls it in."));
  b.push(L("Lung mechanics and surfactant", [
    "Breathing in|🫁|Boyle's law: when volume rises, pressure falls. The <b>diaphragm</b> contracts, the chest expands and the pressure inside the lungs drops below air pressure, so air flows in. Pressure in the pleural space is slightly <b>negative</b>.",
    "Surfactant|🫧|Water in alveoli gives high <b>surface tension</b>, which tries to collapse them. <b>Surfactant</b>, made by <b>type II pneumocytes</b>, lowers surface tension so alveoli stay open. Premature babies without enough surfactant get <b>respiratory distress syndrome</b>.",
    "Compliance|🎈|<b>Compliance</b> is how easily the lungs stretch. In <b>fibrosis</b> compliance falls (stiff lungs). A <b>pneumothorax</b> lets air into the pleural space and the lung collapses."
  ], [
    "When the chest volume increases, the pressure in the lungs...|falls|🫁||rises,stays equal",
    "The muscle that does most quiet breathing is the...|diaphragm|🫁||biceps,heart",
    "Surfactant lowers...|surface tension|🫧||body temperature,blood sugar",
    "Surfactant is made by...|type II pneumocytes|🫧||red blood cells,neurons",
    "Premature babies lacking surfactant get...|respiratory distress syndrome|👶||scurvy,anemia",
    "Compliance is how easily the lungs...|stretch|🎈||bleed,burn",
    "In pulmonary fibrosis, compliance...|falls|🎈||rises,is infinite",
    "Air entering the pleural space causes a...|pneumothorax|🫁||goiter,hernia",
    "Without surfactant, small alveoli tend to...|collapse|🫧||float away,grow bigger"
  ], "Think about Boyle's law and what water does in a small bubble."));
  b.push(L("Insulin, glucagon and diabetes", [
    "Two hormones|🍬|After a meal, <b>beta cells</b> of the pancreas release <b>insulin</b>, which inserts <b>GLUT4</b> glucose carriers into muscle and fat cells and lowers blood glucose. <b>Alpha cells</b> release <b>glucagon</b>, which raises glucose between meals.",
    "Two diseases|🩺|In <b>type 1 diabetes</b> the immune system destroys beta cells, so little insulin is made. In <b>type 2 diabetes</b> cells become <b>insulin resistant</b>. Both cause high blood glucose.",
    "Monitoring|📈|<b>HbA1c</b> shows average blood glucose over about 3 months. Without insulin, the body burns fat and makes <b>ketones</b>, which can cause dangerous ketoacidosis. <b>GLP-1</b> from the gut boosts insulin release after meals."
  ], [
    "Insulin is released by pancreatic...|beta cells|🍬||alpha cells,liver cells",
    "Glucagon is released by pancreatic...|alpha cells|🍬||beta cells,T cells",
    "Insulin makes muscle cells insert...|GLUT4|🍬||GFP,hemoglobin",
    "Insulin ... blood glucose.|lowers|🍬||raises,does not change",
    "Type 1 diabetes is caused by...|autoimmune loss of beta cells|🩺||insulin resistance,eating sugar",
    "Type 2 diabetes mainly involves...|insulin resistance|🩺||no pancreas,low calcium",
    "HbA1c reflects average blood glucose over about...|3 months|📈||3 hours,3 years",
    "Without insulin the body makes ... from fat.|ketones|🔥||vitamins,antibodies",
    "The gut hormone that boosts insulin release is...|GLP-1|🍬||glucagon,melatonin"
  ], "One hormone lowers glucose and the other raises it."));
  b.push(L("Thyroid and stress hormones", [
    "Thyroid axis|🦋|The hypothalamus releases <b>TRH</b>, the pituitary releases <b>TSH</b>, and the thyroid makes <b>T3 and T4</b>, which raise metabolic rate. Thyroid hormones need <b>iodine</b>. Too little iodine can cause a <b>goiter</b>.",
    "Too much or too little|🌡️|<b>Hyperthyroidism</b> gives a fast heart rate, weight loss and heat intolerance. <b>Hypothyroidism</b> gives tiredness, weight gain and cold intolerance. Thyroid hormones feed back to shut off TRH and TSH.",
    "Stress axis|⚡|In stress, the hypothalamus releases <b>CRH</b>, the pituitary <b>ACTH</b>, and the adrenal cortex <b>cortisol</b>, which raises blood glucose and dampens inflammation. The adrenal medulla releases <b>adrenaline</b> for fight-or-flight."
  ], [
    "The pituitary hormone that tells the thyroid to work is...|TSH|🦋||ACTH,ADH",
    "Thyroid hormones need the mineral...|iodine|🦋||iron,calcium",
    "A swollen thyroid from low iodine is a...|goiter|🦋||hernia,cyst",
    "Hyperthyroidism commonly causes...|heat intolerance|🌡️||cold intolerance,slow heart rate",
    "Hypothyroidism commonly causes...|tiredness|🌡️||weight loss,racing heart",
    "Thyroid hormones raise...|metabolic rate|🔥||bone length,blood type",
    "The hormone ACTH tells the adrenal cortex to make...|cortisol|⚡||adrenaline,insulin",
    "Cortisol ... blood glucose.|raises|⚡||lowers,does not affect",
    "The hormone for fight-or-flight released from the adrenal medulla is...|adrenaline|⚡||cortisol,thyroxine"
  ], "Follow the chain from brain to gland to body."));
  b.push(L("The menstrual cycle", [
    "Follicular phase|🌙|The cycle is about <b>28 days</b>. <b>FSH</b> makes a follicle grow in the ovary, and the follicle makes rising <b>estrogen</b>, which rebuilds the uterine lining.",
    "Ovulation|🥚|When estrogen is high enough it causes a <b>positive feedback</b> surge of <b>LH</b>, which triggers <b>ovulation</b> around day 14. The empty follicle turns into the <b>corpus luteum</b>.",
    "Luteal phase|📉|The corpus luteum makes <b>progesterone</b>, which maintains the lining. If there is no pregnancy it breaks down, progesterone falls, and the lining is shed. This is <b>menstruation</b>."
  ], [
    "The hormone that makes a follicle grow is...|FSH|🌙||LH,prolactin",
    "The hormone surge that triggers ovulation is...|LH|🥚||FSH,insulin",
    "Ovulation happens around day...|14|📅||2,28",
    "The follicle makes rising...|estrogen|🌙||progesterone only,insulin",
    "After ovulation the follicle becomes the...|corpus luteum|🥚||placenta,cervix",
    "The corpus luteum makes...|progesterone|🌙||FSH,testosterone",
    "The LH surge is caused by ... feedback from estrogen.|positive|🔁||negative,no",
    "Menstruation happens when progesterone...|falls|📉||peaks,doubles",
    "Estrogen from the follicle rebuilds the...|uterine lining|🌙||bone marrow,thyroid"
  ], "Follow FSH, then estrogen, then LH, then progesterone."));
  b.push(L("Circadian rhythms", [
    "The master clock|⏰|The <b>suprachiasmatic nucleus (SCN)</b> in the hypothalamus is the master clock. Light reaches it from the eyes through special cells that contain <b>melanopsin</b>. The human clock runs a bit over 24 hours and is reset by light daily.",
    "Inside cells|🔄|Cells have clock genes (<b>CLOCK, BMAL1, PER, CRY</b>). CLOCK and BMAL1 turn on PER and CRY, whose proteins later shut CLOCK and BMAL1 off. This <b>negative feedback loop</b> takes about 24 hours. The 2017 Nobel Prize went to Hall, Rosbash and Young for this.",
    "Melatonin|🌙|The <b>pineal gland</b> releases <b>melatonin</b> at night. <b>Jet lag</b> happens when the clock does not match local time. Bright light at night delays the clock."
  ], [
    "The master clock of the body is in the...|suprachiasmatic nucleus|⏰||liver,spinal cord",
    "The master clock is located in the...|hypothalamus|⏰||pancreas,skin",
    "Light reaches the clock using cells that contain...|melanopsin|👁️||hemoglobin,keratin",
    "The hormone released at night by the pineal gland is...|melatonin|🌙||insulin,cortisol",
    "In the clock loop, PER and CRY proteins ... CLOCK and BMAL1.|shut off|🔄||turn on forever,make",
    "This kind of loop is called...|negative feedback|🔄||positive feedback,cell division",
    "The human internal clock is a little more than...|24 hours|⏰||12 hours,48 hours",
    "Jet lag happens when the body clock does not match...|local time|✈️||body weight,blood type",
    "Bright light at night tends to ... the clock.|delay|💡||speed up forever,stop"
  ], "Light resets the clock and the clock genes feed back on themselves."));
  b.push(L("The liver at work", [
    "Blood in and out|🍽️|Blood from the gut goes through the <b>hepatic portal vein</b> to the liver first, so the liver can process nutrients and toxins before they reach the rest of the body.",
    "Many jobs|🧪|The liver stores <b>glycogen</b>, makes glucose by <b>gluconeogenesis</b>, and makes <b>albumin</b> and clotting factors. It converts toxic <b>ammonia</b> into <b>urea</b> and detoxifies drugs with <b>cytochrome P450</b> enzymes.",
    "Bile and regrowth|💚|The liver makes <b>bile</b> (stored in the gallbladder) to help digest fats. Liver tissue can <b>regenerate</b> after part is removed. Bilirubin from broken red cells is processed by the liver; a buildup causes <b>jaundice</b>."
  ], [
    "Blood from the gut reaches the liver by the hepatic...|portal vein|🍽️||artery of the leg,jugular",
    "The liver stores sugar as...|glycogen|🍬||starch,cellulose",
    "The liver turns toxic ammonia into...|urea|🧪||glucose,bile",
    "Drug detoxification in the liver uses ... enzymes.|cytochrome P450|🧪||lysozyme,amylase",
    "Bile is made by the liver and stored in the...|gallbladder|💚||pancreas,stomach",
    "Bile helps digest...|fats|💚||proteins,vitamins only",
    "The main blood protein made by the liver is...|albumin|🩸||keratin,collagen",
    "The liver makes new glucose by...|gluconeogenesis|🍬||glycolysis,fermentation",
    "A buildup of bilirubin causes...|jaundice|💛||scurvy,goiter"
  ], "The liver handles blood coming from the gut."));
  b.push(L("Exercise physiology", [
    "Energy systems|💪|Muscle uses <b>phosphocreatine</b> for the first ~10 seconds of hard effort, then <b>glycolysis</b> for up to a couple of minutes, then <b>aerobic respiration</b> for long efforts. Glycolysis makes <b>lactate</b> when oxygen is limited.",
    "Measuring fitness|📊|<b>VO2 max</b> is the maximum rate of oxygen use. Estimated maximum heart rate is about <b>220 minus age</b>. After hard exercise, breathing stays high to repay the <b>oxygen debt</b> (EPOC).",
    "Training|🏃|Endurance training increases <b>stroke volume</b>, capillary density and <b>mitochondria</b> in muscle, and lowers resting heart rate. Strength training increases muscle fiber size."
  ], [
    "The fastest energy source for the first ~10 seconds is...|phosphocreatine|⚡||fat,protein",
    "Long efforts rely mainly on...|aerobic respiration|🏃||phosphocreatine,fermentation only",
    "Glycolysis without enough oxygen makes...|lactate|🔥||urea,glycogen",
    "VO2 max is the maximum rate of ... use.|oxygen|📊||water,glucose",
    "Estimated maximum heart rate for a 20-year-old (220 minus age) is...|200|🧮||240,180",
    "After hard exercise, breathing stays high to repay the...|oxygen debt|😮‍💨||sugar debt,water debt",
    "Endurance training ... resting heart rate.|lowers|🏃||raises,does not change",
    "Endurance training increases the number of...|mitochondria in muscle|🏃||ribosomes in bone,lungs",
    "Strength training mostly increases muscle fiber...|size|💪||length of bones,color"
  ], "Which fuel runs out first and which lasts longest?"));
  b.push(L("Autophagy and lysosomes", [
    "Cell recycling|♻️|<b>Lysosomes</b> contain acid hydrolase enzymes that work at about <b>pH 5</b>. In <b>autophagy</b> a double membrane <b>autophagosome</b> engulfs old organelles or proteins and then fuses with a lysosome for digestion.",
    "Triggers|🍽️|<b>Starvation</b> switches autophagy on, because the cell recycles its parts for building blocks. <b>mTOR</b> normally keeps autophagy off when nutrients are plentiful. <b>Yoshinori Ohsumi</b> won the 2016 Nobel Prize for discovering how autophagy works.",
    "Problems|🩺|Damaged mitochondria are removed by <b>mitophagy</b>. In <b>Tay-Sachs disease</b> a lysosomal enzyme (hexosaminidase A) is missing, so material builds up inside lysosomes."
  ], [
    "Lysosomes contain enzymes that work best at...|acidic pH|♻️||basic pH,neutral pH",
    "The structure that engulfs old cell parts in autophagy is the...|autophagosome|♻️||nucleolus,centriole",
    "The autophagosome fuses with a...|lysosome|♻️||ribosome,chloroplast",
    "Autophagy is switched on by...|starvation|🍽️||overfeeding,sunlight",
    "When nutrients are plentiful, mTOR keeps autophagy...|off|🍽️||on,irrelevant",
    "The 2016 Nobel Prize for autophagy went to...|Yoshinori Ohsumi|🏅||Charles Darwin,Albert Einstein",
    "Removing damaged mitochondria by autophagy is called...|mitophagy|♻️||mitosis,mimicry",
    "Tay-Sachs disease is a ... storage disease.|lysosomal|🩺||peroxisomal,ribosomal",
    "Autophagy mainly lets cells...|recycle their parts|♻️||make new DNA,fight bacteria only"
  ], "Think of the cell's recycling truck."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 29 Challenge", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17], a[6], a[9]]));

  // ================= LEVEL 30 =================
  const c = [];
  c.push(L("Mark-recapture", [
    "Counting by marking|🏷️|To estimate how many animals live in an area, scientists catch some (<b>M</b>), mark them harmlessly and release them. Later they catch a second sample (<b>C</b>) and count how many are marked (<b>R</b>).",
    "The formula|🧮|The <b>Lincoln-Petersen estimate</b> is <b>N = (M x C) / R</b>. If 50 are marked, and a later sample of 40 has 10 marked, then N = 50 x 40 / 10 = 200.",
    "Assumptions|⚠️|It works if marks do not fall off, marked animals mix back in randomly, and there are no births, deaths or moves during the study. If marks are lost, R is too low and the estimate is <b>too high</b>."
  ], [
    "50 animals are marked. A later sample of 40 has 10 marked. The population is about...|200|🧮||80,2000",
    "100 are marked. A later sample of 60 has 12 marked. The population is about...|500|🧮||72,720",
    "30 are marked. A later sample of 20 has 5 marked. The population is about...|120|🧮||150,30",
    "In N = (M x C) / R, the letter R stands for the number of ... in the second sample.|marked animals|🏷️||all animals,dead animals",
    "Mark-recapture is used to estimate population...|size|🏷️||age,color",
    "One assumption is that marked animals mix back in...|randomly|🔀||only in one place,never",
    "If marks wear off between visits, the estimate is...|too high|⚠️||too low,exact",
    "Mark-recapture is useful for animals that are...|hard to count directly|🏷️||all dead,plants only",
    "A study should have ... births, deaths and moves during the study.|few|⚠️||many,exactly the same number of"
  ], "Marked animals are a fraction of the second sample."));
  c.push(L("Life history strategies", [
    "Two styles|⚖️|<b>r-selected</b> species have many small offspring, little parental care, fast maturity and short lives. They do well in unstable places with room to grow. Examples: weeds, insects, mice.",
    "The other style|🐘|<b>K-selected</b> species have few offspring, lots of parental care, slow maturity and long lives. They live close to the <b>carrying capacity (K)</b>. Examples: elephants, whales, humans.",
    "Reproducing once or often|🔁|<b>Semelparous</b> species breed once and die, like salmon or agave. <b>Iteroparous</b> species breed many times, like humans. A trade-off exists: energy spent on offspring cannot be used to grow or survive."
  ], [
    "Many small offspring and little parental care is typical of...|r-selected species|🐭||K-selected species,no species",
    "Few offspring and much care is typical of...|K-selected species|🐘||r-selected species,viruses",
    "K stands for the...|carrying capacity|📈||kill rate,kinetic energy",
    "Which is more likely to be r-selected?|a weed|🌱||an elephant,a whale",
    "Which is more likely to be K-selected?|an elephant|🐘||a mosquito,a dandelion",
    "Breeding only once and then dying is called...|semelparity|🐟||iteroparity,parthenogenesis",
    "Breeding many times is called...|iteroparity|🔁||semelparity,mutualism",
    "Pacific salmon are...|semelparous|🐟||iteroparous,asexual",
    "r-selection is favored in ... environments.|unstable|🌪️||stable,crowded"
  ], "Think about quantity versus care."));
  c.push(L("Productivity and energy flow", [
    "Primary productivity|🌿|<b>Gross primary productivity (GPP)</b> is all the energy captured by photosynthesis. <b>Net primary productivity (NPP) = GPP minus plant respiration</b>. NPP is what is left to feed everything else.",
    "Across the planet|🌍|Per area, <b>tropical rainforests</b> have a high NPP, while deserts have a very low one. The <b>open ocean</b> has low NPP per area but covers so much of the Earth that it adds a lot in total.",
    "Energy loss|🔻|Only about <b>10%</b> of energy passes from one trophic level to the next. Most is lost as heat through respiration. Ocean food webs can have an <b>inverted biomass pyramid</b> because phytoplankton reproduce very quickly."
  ], [
    "Net primary productivity equals GPP minus...|plant respiration|🌿||sunlight,herbivory only",
    "GPP is 100 and plant respiration is 40. NPP is...|60|🧮||140,40",
    "GPP is 250 and plant respiration is 90. NPP is...|160|🧮||340,90",
    "Energy passed to the next trophic level is about...|10%|🔻||90%,1%",
    "Producers hold 10000 kJ. Primary consumers get about...|1000 kJ|🧮||9000 kJ,100 kJ",
    "Most energy is lost between trophic levels as...|heat|🔥||light,sugar",
    "Per area, which has the higher NPP?|a tropical rainforest|🌴||a desert,tundra",
    "The open ocean contributes much total NPP because of its...|huge area|🌊||high NPP per area,low temperature",
    "An inverted biomass pyramid can occur in the ocean because phytoplankton...|reproduce very fast|🌊||live for centuries,eat fish"
  ], "NPP is what remains after the plants use some for themselves."));
  c.push(L("Shannon diversity", [
    "Richness and evenness|🌈|<b>Species richness</b> is the number of species. <b>Evenness</b> is how equal their abundances are. A community of 10 species with one dominant is less even than one where all 10 are equally common.",
    "The index|🔢|The <b>Shannon index</b> is <b>H' = minus the sum of (pi x ln pi)</b>, where pi is the proportion of species i. A higher H' means higher diversity. One species gives H' = 0.",
    "Useful numbers|🧮|Two species that are 50:50 give H' = ln 2 which is about <b>0.69</b>. Four equally common species give ln 4 which is about <b>1.39</b>. The maximum for S species is <b>ln S</b>, reached when all are equal."
  ], [
    "The number of species in a community is its...|richness|🌈||evenness,fitness",
    "How equal the species' abundances are is called...|evenness|🌈||richness,biomass",
    "A community with only one species has H' equal to...|0|🔢||1,infinity",
    "Two species in a 50:50 mix give H' of about...|0.69|🧮||1.39,0.5",
    "Four equally common species give H' of about...|1.39|🧮||0.69,4",
    "The maximum Shannon value for S species is...|ln S|🔢||S squared,1",
    "Two communities have 4 species each. A is 97:1:1:1 and B is 25:25:25:25. Which has higher H'?|B|🌈||A,they are equal",
    "A higher Shannon index means ... diversity.|higher|🌈||lower,no",
    "In the Shannon formula, pi is the ... of species i.|proportion|🔢||weight,age"
  ], "Look at both how many species and how even they are."));
  c.push(L("Modes of speciation", [
    "Allopatric|🏔️|<b>Allopatric</b> speciation starts when a geographic barrier splits a population, such as a mountain range, river or new island. Isolated groups drift and adapt differently until they cannot interbreed.",
    "Sympatric|🪰|<b>Sympatric</b> speciation happens in the same area. <b>Polyploidy</b> in plants can make a new species in one generation. Apple maggot flies (<b>Rhagoletis</b>) shifted from hawthorn to apple trees, and cichlid fishes in African lakes diversified together.",
    "In between|🧭|<b>Parapatric</b> speciation happens in adjacent habitats with a narrow contact zone. <b>Peripatric</b> speciation is when a small group at the edge of a range becomes isolated, a kind of founder effect."
  ], [
    "Speciation after a geographic barrier splits a population is...|allopatric|🏔️||sympatric,parapatric",
    "Speciation in the same area is...|sympatric|🪰||allopatric,peripatric",
    "A mountain range separating a population can cause ... speciation.|allopatric|🏔️||sympatric,none",
    "Instant new plant species can arise by...|polyploidy|🌿||inversion,translocation",
    "Rhagoletis flies shifted their host from hawthorn to...|apple|🍎||oak,pine",
    "Speciation in adjacent habitats with a narrow contact zone is...|parapatric|🧭||allopatric,sympatric",
    "Speciation by a small group at the edge of the range is...|peripatric|🏝️||sympatric,parapatric",
    "Cichlid fishes in African lakes are a famous example of...|rapid diversification|🐟||extinction,lost evolution",
    "A new species is complete when the groups can no longer...|interbreed successfully|🧬||see each other,eat"
  ], "Look at where the diverging groups live."));
  c.push(L("Coevolution and arms races", [
    "Evolving together|🤝|<b>Coevolution</b> is when two species act as selective forces on each other. In an <b>arms race</b>, a predator improves, then the prey improves, then the predator improves again.",
    "Examples|🐍|Rough-skinned newts make the toxin <b>tetrodotoxin</b>, and some garter snakes evolved <b>resistance</b>. <b>Yucca</b> plants and yucca moths depend on each other for pollination and seeds. Fig trees and fig wasps are another pair.",
    "Red Queen|♟️|The <b>Red Queen hypothesis</b> says species must keep evolving just to keep up with enemies such as parasites, a reason sexual reproduction may be useful. <b>Batesian</b> mimics copy harmful species. <b>Mullerian</b> mimics are all harmful and share a pattern."
  ], [
    "When two species act as selective forces on each other, this is...|coevolution|🤝||convergence,drift",
    "A cycle of repeated improvements between predator and prey is an...|arms race|⚔️||adaptive radiation,bottleneck",
    "Rough-skinned newts make the toxin...|tetrodotoxin|🐍||insulin,melanin",
    "Some garter snakes have evolved ... to newt toxin.|resistance|🐍||addiction,fear",
    "Yucca plants are pollinated by...|yucca moths|🦋||bats only,wind",
    "The Red Queen hypothesis says species must keep evolving to...|keep up with enemies|♟️||escape the sun,grow taller",
    "A harmless species copying a harmful one is...|Batesian mimicry|🦋||Mullerian mimicry,camouflage",
    "Several harmful species sharing a warning pattern is...|Mullerian mimicry|🦋||Batesian mimicry,camouflage",
    "Fig trees and fig wasps are an example of...|mutualism|🌿||parasitism,predation"
  ], "Each species is changing because of the other."));
  c.push(L("Quorum sensing and biofilms", [
    "Counting neighbors|📡|Bacteria release small signal molecules called <b>autoinducers</b>. When enough cells are present, the signal reaches a <b>threshold</b> and genes switch on together. This is <b>quorum sensing</b>.",
    "Glowing squid|🦑|<b>Vibrio fischeri</b> bacteria live in the light organ of the Hawaiian bobtail squid. They only make light when crowded. <b>Pseudomonas</b> uses quorum sensing to switch on virulence genes.",
    "Biofilms|🧫|A <b>biofilm</b> is a community of bacteria stuck to a surface inside a slimy <b>extracellular polymeric substance (EPS)</b> matrix. Dental plaque and films on catheters are biofilms. Biofilm bacteria resist antibiotics much better."
  ], [
    "Bacteria release signal molecules called...|autoinducers|📡||antibodies,hormones",
    "Genes switch on when the signal reaches a...|threshold|📡||wall,ceiling",
    "Quorum sensing lets bacteria sense their...|population density|📡||age,color",
    "Vibrio fischeri makes light only when...|crowded|🦑||alone,dried",
    "Vibrio fischeri lives in the bobtail...|squid|🦑||shark,starfish",
    "A community of bacteria in a slimy matrix is a...|biofilm|🧫||spore,plasmid",
    "The slimy matrix of a biofilm is called...|EPS|🧫||DNA,ATP",
    "Dental plaque is an example of a...|biofilm|🦷||virus,prion",
    "Compared with free-floating cells, biofilm bacteria are ... to antibiotics.|more resistant|💊||more sensitive,identical"
  ], "Think of bacteria taking a vote."));
  c.push(L("Culturing microbes", [
    "Media|🧫|Microbes grow on <b>agar</b> plates. <b>Selective</b> media allow only some microbes to grow. <b>Differential</b> media show differences by color or other signs. <b>MacConkey agar</b> favors gram-negative bacteria and turns lactose fermenters pink.",
    "More media|🔬|<b>Mannitol salt agar</b> is selective for salt-tolerant staphylococci. <b>Blood agar</b> shows <b>hemolysis</b>, where bacteria break down red blood cells and clear the agar around colonies.",
    "Technique|🧪|A <b>streak plate</b> spreads cells thin to give single colonies from single cells. <b>Serial dilution</b> and plating give <b>CFU</b> (colony-forming units) counts. An <b>autoclave</b> uses steam at 121 degrees C to kill even endospores."
  ], [
    "Agar plates with ingredients that allow only some microbes to grow are...|selective media|🧫||differential media,empty media",
    "Media that show differences by color are...|differential media|🧫||selective media,blank media",
    "MacConkey agar favors growth of...|gram-negative bacteria|🧫||all viruses,only fungi",
    "Lactose fermenters on MacConkey agar turn...|pink|🌸||blue,black",
    "Mannitol salt agar is selective for...|staphylococci|🧫||E. coli,yeast",
    "A clear zone around colonies on blood agar shows...|hemolysis|🩸||nitrogen fixation,fermentation",
    "A streak plate is used to get...|single colonies|🧫||bigger cells,viruses",
    "CFU stands for colony-forming...|units|🔢||fungi,factors",
    "An autoclave kills endospores using steam at about...|121 C|♨️||37 C,60 C"
  ], "Think about what the medium allows and what it shows."));
  c.push(L("The gut microbiome", [
    "A hidden organ|🦠|The human gut holds trillions of microbes, mostly bacteria in the colon. The main groups are <b>Firmicutes</b> and <b>Bacteroidetes</b> (now called Bacteroidota). Each person has a unique mix.",
    "What they do|🍽️|Gut bacteria ferment fiber into <b>short-chain fatty acids</b> like butyrate, which feed colon cells. They make <b>vitamin K</b>, train the immune system, and crowd out pathogens.",
    "Imbalance|⚠️|Antibiotics can wipe out helpful bacteria and let <b>Clostridioides difficile</b> overgrow. A <b>fecal microbiota transplant</b> can restore balance. <b>Germ-free mice</b> help scientists study the microbiome. <b>Probiotics</b> are live microbes taken for health."
  ], [
    "Most gut microbes live in the...|colon|🦠||stomach,esophagus",
    "A main group of gut bacteria is...|Firmicutes|🦠||Cyanobacteria,Archaea only",
    "Gut bacteria ferment fiber into short-chain fatty acids such as...|butyrate|🍽️||insulin,melanin",
    "Short-chain fatty acids mainly feed the cells of the...|colon|🍽️||skin,lungs",
    "Gut bacteria make vitamin...|K|🍽️||D from sun,C only",
    "After antibiotics, an overgrowth of ... can occur.|C. difficile|⚠️||yeast only,Vibrio fischeri",
    "A treatment that restores gut balance with donor microbes is a...|fecal microbiota transplant|⚠️||blood transfusion,kidney transplant",
    "Mice raised with no microbes are called...|germ-free mice|🐭||wild mice,nude mice",
    "Probiotics are...|live microbes taken for health|🥛||antibiotics,vaccines of toxins"
  ], "Think of the community that lives in the gut."));
  c.push(L("Virus replication strategies", [
    "Baltimore classification|🧬|Viruses are grouped by their genome and how they make mRNA. Group I: <b>dsDNA</b>. II: <b>ssDNA</b>. III: <b>dsRNA</b>. IV: <b>positive-strand RNA</b>. V: <b>negative-strand RNA</b>. VI: <b>RNA with reverse transcriptase</b> (HIV). VII: <b>DNA with reverse transcriptase</b> (hepatitis B).",
    "Plus and minus|➕|A <b>positive-strand RNA</b> genome can be read as mRNA right away. This includes poliovirus and coronaviruses. A <b>negative-strand RNA</b> virus such as influenza must first be copied, using an <b>RNA-dependent RNA polymerase</b> it carries.",
    "Cycles|🔁|Most viruses attach, enter, copy genomes, make proteins, assemble and exit. Some, like HIV, insert DNA into the host genome. Phages can be <b>lytic</b> or <b>lysogenic</b>."
  ], [
    "Baltimore classification groups viruses by their...|genome type|🧬||size,color",
    "A genome that can be read directly as mRNA is...|positive-strand RNA|➕||negative-strand RNA,dsDNA",
    "Influenza is a ... RNA virus.|negative-strand|🧬||positive-strand,double-strand DNA",
    "A negative-strand RNA virus carries an RNA-dependent...|RNA polymerase|🧬||ribosome,mitochondrion",
    "HIV is in the group of viruses that use...|reverse transcriptase|🧬||DNA polymerase only,no genome",
    "Hepatitis B is a DNA virus that also uses...|reverse transcriptase|🧬||a ribosome genome,helicase only",
    "Coronaviruses have ... genomes.|positive-strand RNA|🧬||negative-strand RNA,dsDNA",
    "Poliovirus is a ... virus.|positive-strand RNA|🧬||negative-strand RNA,retrovirus",
    "A virus that inserts its DNA into the host genome and waits is...|lysogenic|🔁||lytic,antibiotic"
  ], "Ask: can the genome be read as mRNA straight away?"));
  c.push(L("Glia and myelination", [
    "More than support|🧠|<b>Glia</b> are roughly as numerous as neurons. <b>Astrocytes</b> support the blood-brain barrier, soak up extra potassium and glutamate. <b>Microglia</b> are the brain's immune cells. <b>Ependymal cells</b> line the ventricles and help make cerebrospinal fluid.",
    "Insulation|🔌|<b>Oligodendrocytes</b> wrap axons in myelin in the central nervous system, and one oligodendrocyte can wrap many axons. <b>Schwann cells</b> do this in the peripheral nervous system, with one Schwann cell per axon segment.",
    "Fast signals|⚡|Gaps in the myelin are <b>nodes of Ranvier</b>, and the signal jumps between them (<b>saltatory conduction</b>). In <b>multiple sclerosis</b> the immune system attacks myelin in the CNS. <b>Guillain-Barre syndrome</b> affects peripheral myelin."
  ], [
    "Myelin in the central nervous system is made by...|oligodendrocytes|🔌||Schwann cells,astrocytes",
    "Myelin in the peripheral nervous system is made by...|Schwann cells|🔌||oligodendrocytes,microglia",
    "The immune cells of the brain are...|microglia|🧠||astrocytes,ependymal cells",
    "Cells that help form the blood-brain barrier and soak up glutamate are...|astrocytes|🧠||oligodendrocytes,microglia",
    "Gaps in the myelin are called nodes of...|Ranvier|⚡||Golgi,Brocca",
    "Signals jumping between nodes is called ... conduction.|saltatory|⚡||continuous,reverse",
    "Multiple sclerosis involves loss of myelin in the...|central nervous system|🧠||skeleton,muscles only",
    "Glia are about ... as numerous as neurons.|roughly as|🧠||a thousand times more,a thousandth as",
    "Ependymal cells help make...|cerebrospinal fluid|💧||bile,lymph"
  ], "Different glial cells do different jobs."));
  c.push(L("Synaptic plasticity and LTP", [
    "Wiring changes|🔗|<b>Hebb's rule</b>: neurons that fire together wire together. <b>Long-term potentiation (LTP)</b> is a lasting strengthening of a synapse after high activity, studied mostly in the <b>hippocampus</b>, a region important for forming memories.",
    "The NMDA receptor|🚪|The <b>NMDA receptor</b> needs two things: <b>glutamate</b> bound and the postsynaptic cell already depolarized, which pushes out a <b>magnesium</b> plug. Then <b>calcium</b> flows in.",
    "Stronger synapse|💪|Calcium triggers more <b>AMPA receptors</b> to be inserted into the membrane, so the same glutamate gives a bigger response. The opposite, <b>long-term depression (LTD)</b>, weakens synapses."
  ], [
    "Hebb's rule says neurons that fire together...|wire together|🔗||die together,sleep together",
    "A lasting strengthening of a synapse is called...|long-term potentiation|💪||long-term depression,fatigue",
    "LTP is studied mostly in the...|hippocampus|🧠||cerebellum,spinal cord",
    "The NMDA receptor needs glutamate and...|depolarization|🚪||insulin,cold",
    "A plug that blocks the NMDA receptor at rest is made of...|magnesium|🚪||iron,zinc",
    "The ion that enters through the NMDA receptor to start LTP is...|calcium|🚪||chloride,potassium",
    "After LTP, more ... receptors are inserted.|AMPA|💪||insulin,GABA",
    "A lasting weakening of a synapse is...|long-term depression|📉||long-term potentiation,paralysis",
    "LTP is thought to be a cellular basis of...|learning and memory|🧠||digestion,bone growth"
  ], "Think about how repeated use changes a synapse."));
  c.push(L("Complement and inflammation", [
    "Complement|🧩|<b>Complement</b> is about 30 blood proteins that work in a cascade. <b>C3</b> is the central protein. Pathways are started by antibodies (classical), by microbe sugars (lectin) or directly on microbe surfaces (alternative).",
    "Three jobs|🛠️|<b>Opsonization</b> (C3b coats microbes so phagocytes eat them). <b>Inflammation</b> (C3a and C5a call in cells). <b>Lysis</b> (the <b>membrane attack complex</b>, C5b-C9, punches holes in bacteria).",
    "Inflammation|🔥|The four signs are <b>redness, heat, swelling and pain</b>. <b>Mast cells</b> release <b>histamine</b>, which widens vessels and makes them leaky. <b>Neutrophils</b> arrive first at the site."
  ], [
    "The central protein of the complement cascade is...|C3|🧩||C9,IgG",
    "Coating microbes so phagocytes eat them is...|opsonization|🧩||lysis,fermentation",
    "The membrane attack complex does what to bacteria?|punches holes|🧩||feeds them,paints them",
    "The classical complement pathway is started by...|antibodies|🧩||wind,iron",
    "C3a and C5a mainly...|call in immune cells|🔥||make antibodies,make glucose",
    "Inflammation causes redness, heat, swelling and...|pain|🔥||sound,color blindness",
    "Mast cells release...|histamine|🔥||insulin,melanin",
    "Histamine makes blood vessels...|wider and leaky|🔥||narrower and tight,hard as bone",
    "The first white cells to arrive at an infection are usually...|neutrophils|🔥||B cells,platelets"
  ], "Complement tags, calls and punches."));
  c.push(L("Hypersensitivity reactions", [
    "Type I|🤧|<b>Type I</b> (immediate) allergies involve <b>IgE</b> on <b>mast cells</b>. When an allergen links the IgE, histamine is released. Severe cases cause <b>anaphylaxis</b>, treated with <b>epinephrine</b>.",
    "Types II and III|🩸|<b>Type II</b>: antibodies bind cells or tissue (such as a mismatched blood transfusion). <b>Type III</b>: <b>immune complexes</b> of antibody and antigen lodge in tissues, as in lupus.",
    "Type IV|⏰|<b>Type IV</b> is <b>delayed</b>, driven by <b>T cells</b> rather than antibodies, and appears after one to three days. Examples are poison ivy rash and the skin test for tuberculosis."
  ], [
    "Type I hypersensitivity involves the antibody...|IgE|🤧||IgM only,none",
    "Type I allergies involve release of histamine from...|mast cells|🤧||red blood cells,neurons",
    "A severe, whole-body allergic reaction is...|anaphylaxis|🚨||inflammation only,fever",
    "Anaphylaxis is treated with...|epinephrine|💉||penicillin,insulin",
    "A mismatched blood transfusion is an example of type...|II|🩸||I,IV",
    "Immune complexes lodging in tissues are type...|III|🧩||I,IV",
    "Type IV hypersensitivity is driven by...|T cells|⏰||IgE,platelets",
    "A poison ivy rash is an example of type...|IV|🌿||I,II",
    "Type IV reactions are ... in timing.|delayed|⏰||immediate,instant"
  ], "The type depends on which part of the immune system is the main player."));
  c.push(L("Sequence alignment", [
    "Comparing sequences|🔤|<b>Alignment</b> lines up DNA or protein sequences to find similarity. <b>Percent identity</b> is the fraction of identical positions. Two sequences with 8 identical positions out of 10 are 80% identical.",
    "Global and local|🔍|<b>Global</b> alignment (Needleman-Wunsch) aligns the whole length. <b>Local</b> alignment (Smith-Waterman) finds the best matching regions. <b>BLAST</b> is a fast local search that uses a heuristic.",
    "Scores|🏆|A <b>scoring matrix</b> such as <b>BLOSUM62</b> gives points to amino acid pairs, and <b>gap penalties</b> subtract points for insertions or deletions. The <b>E-value</b> is the number of matches you would expect by chance, so a <b>smaller E-value</b> means a more significant match."
  ], [
    "Lining up sequences to find similarity is...|alignment|🔤||translation,replication",
    "Two sequences share 8 identical positions out of 10. Percent identity is...|80%|🧮||8%,20%",
    "Two sequences share 45 identical positions out of 60. Percent identity is...|75%|🧮||45%,60%",
    "Alignment of the whole sequence length is called...|global alignment|🔍||local alignment,gel alignment",
    "Finding the best matching regions is called...|local alignment|🔍||global alignment,random alignment",
    "A fast heuristic local search tool is...|BLAST|🔍||PCR,GFP",
    "BLOSUM62 is a...|scoring matrix|🏆||enzyme,virus",
    "Gap penalties are subtracted for...|insertions and deletions|🏆||matches,stop codons",
    "A smaller E-value means a ... significant match.|more|🏆||less,not"
  ], "A smaller E-value is a stronger result."));
  c.push(L("Multiple testing", [
    "Many tests, many flukes|🎲|If you test with a cutoff of p less than 0.05, then <b>5% of true nulls</b> still pass. Test 20000 genes and about <b>1000 false positives</b> are expected. A false positive is a <b>Type I error</b>.",
    "Bonferroni|✂️|The <b>Bonferroni correction</b> divides the cutoff by the number of tests, <b>alpha / m</b>. For 100 tests the new cutoff is 0.05 / 100 = <b>0.0005</b>. It is simple but strict.",
    "FDR|📉|The <b>false discovery rate (FDR)</b> controls the fraction of your discoveries that are false. The <b>Benjamini-Hochberg</b> method gives adjusted p-values, called <b>q-values</b>. Genomics studies often use FDR."
  ], [
    "A false positive is a Type ... error.|I|🎲||II,III",
    "You run 200 tests on true nulls at p less than 0.05. How many false positives are expected?|10|🧮||5,100",
    "20000 genes tested at p less than 0.05 (all true nulls). Expected false positives are about...|1000|🧮||50,20",
    "The Bonferroni cutoff is the usual alpha divided by the...|number of tests|✂️||sample size,mean",
    "Bonferroni cutoff for 100 tests at alpha 0.05 is...|0.0005|🧮||0.005,0.05",
    "Bonferroni cutoff for 1000 tests at alpha 0.05 is...|0.00005|🧮||0.0005,0.005",
    "FDR controls the fraction of discoveries that are...|false|📉||real,missing",
    "The Benjamini-Hochberg method controls the...|false discovery rate|📉||mean,median",
    "Adjusted p-values from FDR methods are often called...|q-values|📉||z-scores,t-scores"
  ], "More tests means more chance flukes, so the cutoff must change."));
  c.push(L("t-tests, ANOVA and confidence intervals", [
    "Comparing means|⚖️|A <b>t-test</b> compares <b>two means</b>. A <b>paired t-test</b> is used for before and after measurements on the same subjects. <b>ANOVA</b> compares <b>three or more</b> means using the <b>F statistic</b>, the variation between groups divided by the variation within groups.",
    "Reading the numbers|📊|A larger absolute <b>t</b> gives a smaller p-value. Degrees of freedom for one sample are <b>n minus 1</b>. After a significant ANOVA, a <b>post hoc</b> test such as <b>Tukey</b> shows which groups differ.",
    "Confidence intervals|📏|A <b>95% confidence interval</b> is about <b>mean plus or minus 2 standard errors</b>. If the mean is 50 and SE is 2, the interval is about 46 to 54. If the interval for a difference includes 0, it is not significant."
  ], [
    "A t-test compares...|two means|⚖️||three or more means,two medians only",
    "ANOVA compares...|three or more means|⚖️||two means,two proportions",
    "Before and after measures on the same people use a ... t-test.|paired|⚖️||unpaired,one-way",
    "The ANOVA test statistic is the...|F statistic|📊||t statistic,r value",
    "A larger absolute t gives a ... p-value.|smaller|📊||larger,negative",
    "For one sample of n = 12, the degrees of freedom are...|11|🧮||12,13",
    "After a significant ANOVA, which groups differ is found with a ... test.|post hoc|📊||pre hoc,random",
    "Mean 50 and SE 2. The 95% confidence interval is about...|46 to 54|📏||48 to 52,40 to 60",
    "If a 95% interval for a difference includes 0, the result is...|not significant|📏||significant,proven"
  ], "Count the groups, then check the size of the signal compared with noise."));
  c.push(L("Correlation and regression", [
    "Correlation|📈|The correlation coefficient <b>r</b> runs from <b>minus 1 to plus 1</b>. Near 1 means a strong positive relationship, near minus 1 a strong negative one, and near 0 no straight-line relationship. <b>r squared</b> is the fraction of variation explained.",
    "Regression|📉|A <b>regression line</b> is <b>y = a + bx</b>, where <b>b</b> is the slope and <b>a</b> is the intercept. A <b>residual</b> is the actual y minus the predicted y. Predicting beyond your data is <b>extrapolation</b> and can be misleading.",
    "Careful thinking|⚠️|<b>Correlation does not mean causation</b>: a third variable may drive both. Outliers can change r a lot. Always plot the data first."
  ], [
    "The correlation coefficient r ranges from...|-1 to +1|📈||0 to 100,-100 to +100",
    "A strong positive relationship has r near...|+1|📈||0,-1",
    "An r near 0 means no ... relationship.|straight-line|📈||positive,causal",
    "If r = 0.8, then r squared is...|0.64|🧮||0.8,1.6",
    "If r = 0.5, then r squared is...|0.25|🧮||0.5,1",
    "In y = a + bx, b is the...|slope|📉||intercept,residual",
    "In y = a + bx, a is the...|intercept|📉||slope,error",
    "A residual is actual y minus...|predicted y|📉||the mean of x,r",
    "Predicting outside the range of your data is called...|extrapolation|⚠️||interpolation,correlation"
  ], "r tells direction and strength, and the line gives predictions."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 30 Challenge", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], b[8], a[5]]));

  Object.assign(LIFE_LEVELS, { 28: a, 29: b, 30: c });
})();
