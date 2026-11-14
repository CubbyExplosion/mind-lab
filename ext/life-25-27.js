// ext/life-25-27.js  Life Science levels 25-27 (12th grade and college year 1: intro college biology)
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

  // ================= LEVEL 25 =================
  const a = [];
  a.push(L("Gibbs free energy", [
    "Will it happen?|⚖️|<b>Gibbs free energy change (ΔG)</b> tells us whether a reaction can happen on its own. ΔG = ΔH − TΔS, where ΔH is the change in heat content, T is temperature in kelvin and ΔS is the change in <b>entropy</b> (disorder).",
    "Reading the sign|➖|A <b>negative ΔG</b> means the reaction is <b>spontaneous</b> (exergonic) and releases free energy. A <b>positive ΔG</b> is endergonic and needs energy put in. At <b>equilibrium</b>, ΔG = 0.",
    "Coupling|🔗|Cells make unfavorable reactions happen by <b>coupling</b> them to a favorable one. Hydrolysis of ATP has ΔG of about <b>−30 kJ/mol</b>, which can pay for an endergonic step so the overall ΔG is negative."
  ], [
    "A reaction with a negative ΔG is...|spontaneous|⚖️||nonspontaneous,at equilibrium",
    "At equilibrium, ΔG equals...|zero|⚖️||minus one,infinity",
    "ΔG = ΔH − TΔS. If ΔH = −20 and TΔS = 5, then ΔG is...|−25|🧮||−15,−35",
    "ΔG = ΔH − TΔS. If ΔH = −10 and TΔS = −4, then ΔG is...|−6|🧮||−14,−2",
    "ATP hydrolysis releases about...|30 kJ/mol|🔋||3 kJ/mol,300 kJ/mol",
    "Coupling an exergonic reaction to an endergonic one can make the total ΔG...|negative|🔗||positive,infinite",
    "A reaction with ΔG = +15 kJ/mol is...|endergonic|⬆️||exergonic,at equilibrium",
    "In ΔG = ΔH − TΔS, the T stands for...|temperature in kelvin|🌡️||time in seconds,torque",
    "A rise in entropy (positive ΔS) tends to make ΔG...|more negative|🌀||more positive,unchanged"
  ], "Negative means the reaction can go on its own."));
  a.push(L("Michaelis-Menten kinetics", [
    "Saturation|📈|As substrate rises, an enzyme's rate rises and then levels off at <b>Vmax</b>, the maximum rate, when every active site is busy (the enzyme is <b>saturated</b>). The graph is a hyperbola.",
    "Km|🎯|<b>Km</b> is the substrate concentration that gives <b>half of Vmax</b>. A <b>low Km</b> means the enzyme reaches half speed with little substrate, so it has a <b>high affinity</b> for its substrate.",
    "What changes what|🔧|Adding more enzyme <b>raises Vmax</b>. Adding more substrate to an already saturated enzyme does not speed it up. Competitive inhibitors raise Km but leave Vmax unchanged."
  ], [
    "Km is the substrate concentration giving a rate of...|half of Vmax|🎯||Vmax,zero",
    "Vmax is reached when the enzyme is...|saturated|📈||denatured,out of substrate",
    "A low Km means ... affinity for the substrate.|high|🎯||low,no",
    "Adding more substrate to a saturated enzyme...|does not raise the rate|📈||doubles the rate,stops the enzyme",
    "Vmax is 100 µmol/min. At a substrate level equal to Km, the rate is...|50|🧮||100,25",
    "Vmax is 80 µmol/min. At a substrate level equal to Km, the rate is...|40|🧮||80,20",
    "Adding more enzyme to the tube ... Vmax.|raises|🧪||lowers,does not change",
    "A rate versus substrate graph for a simple enzyme is a...|hyperbola|📈||straight line,U shape",
    "Enzyme A has Km 2 mM and enzyme B has Km 20 mM. Which binds substrate more tightly?|A|⚖️||B,they are equal"
  ], "Half of the top speed gives Km."));
  a.push(L("Glycolysis in detail", [
    "Ten steps|🍬|<b>Glycolysis</b> happens in the <b>cytosol</b> and splits one 6-carbon glucose into two 3-carbon <b>pyruvate</b> molecules. It needs no oxygen.",
    "Invest then collect|💰|The <b>investment phase</b> uses <b>2 ATP</b> to add phosphates to the sugar. The <b>payoff phase</b> makes <b>4 ATP</b> and <b>2 NADH</b>. The net gain is <b>2 ATP</b> per glucose.",
    "Control|🎛️|ATP is made by <b>substrate-level phosphorylation</b>: a phosphate is moved straight from a molecule to ADP. The enzyme <b>phosphofructokinase (PFK)</b> is the main control point of the pathway."
  ], [
    "Glycolysis takes place in the...|cytosol|🍬||mitochondrial matrix,nucleus",
    "One glucose gives ... pyruvate molecules.|2|🍬||1,4",
    "The net ATP made by glycolysis per glucose is...|2|💰||4,36",
    "How many ATP are made in total (before subtracting the cost) in glycolysis?|4|💰||2,8",
    "The ATP cost of the investment phase is...|2 ATP|💰||4 ATP,0 ATP",
    "Glycolysis produces ... NADH per glucose.|2|⚡||1,6",
    "Moving a phosphate straight from a molecule to ADP is...|substrate-level phosphorylation|🔋||chemiosmosis,fermentation",
    "The main control enzyme of glycolysis is...|phosphofructokinase|🎛️||ATP synthase,catalase",
    "Does glycolysis need oxygen?|no|💨||yes,only in plants"
  ], "Count the ATP spent and the ATP earned."));
  a.push(L("Redox and electron carriers", [
    "OIL RIG|🔄|<b>Oxidation Is Loss</b> of electrons, <b>Reduction Is Gain</b>. In cells, electrons often travel with hydrogen atoms. The molecule that loses electrons is oxidized and the one that gains them is reduced.",
    "Shuttles|🚌|<b>NAD⁺</b> picks up electrons and becomes <b>NADH</b> (reduced). <b>FAD</b> becomes <b>FADH₂</b>. These carry the high-energy electrons to the electron transport chain, where they are given up.",
    "Counting|🔢|Per glucose, the citric acid cycle (two turns) makes <b>6 NADH, 2 FADH₂ and 2 ATP</b> (or GTP). NADH gives more ATP than FADH₂ because it feeds electrons in at an earlier step of the chain."
  ], [
    "Losing electrons is called...|oxidation|🔄||reduction,fermentation",
    "Gaining electrons is called...|reduction|🔄||oxidation,hydrolysis",
    "When NAD⁺ becomes NADH, NAD⁺ is...|reduced|🚌||oxidized,destroyed",
    "In the electron transport chain, NADH is...|oxidized|⚡||reduced,made",
    "NADH and FADH₂ carry...|electrons|🚌||amino acids,lipids",
    "The citric acid cycle makes ... NADH per glucose (two turns).|6|🔢||2,10",
    "The citric acid cycle makes ... FADH₂ per glucose (two turns).|2|🔢||6,4",
    "Compared with FADH₂, NADH leads to ... ATP.|more|⚡||less,the same",
    "FAD becomes...|FADH₂|🚌||NADPH,ATP"
  ], "OIL RIG: oxidation is loss, reduction is gain."));
  a.push(L("The Calvin cycle", [
    "Fixing carbon|🌿|The <b>Calvin cycle</b> occurs in the <b>stroma</b> of the chloroplast. The enzyme <b>rubisco</b> attaches CO₂ to the 5-carbon sugar <b>RuBP</b>. The 6-carbon product splits into two molecules of <b>3-PGA</b>.",
    "Reduction|⚡|ATP and NADPH from the light reactions turn 3-PGA into <b>G3P</b>, a 3-carbon sugar. For every 3 CO₂ fixed, <b>one G3P</b> leaves the cycle as net output.",
    "Regeneration|♻️|The rest of the G3P is rebuilt into <b>RuBP</b> using more ATP, so the cycle can keep going. It takes <b>6 turns</b> (6 CO₂) to make the 2 G3P that join into one glucose."
  ], [
    "The Calvin cycle takes place in the...|stroma|🌿||thylakoid,mitochondrion",
    "The enzyme that fixes CO₂ is...|rubisco|🌿||ATP synthase,amylase",
    "CO₂ is attached to the 5-carbon molecule...|RuBP|🔗||G3P,pyruvate",
    "The sugar that leaves the cycle as output is...|G3P|🍬||RuBP,NADH",
    "ATP and NADPH for the Calvin cycle come from the...|light reactions|☀️||citric acid cycle,Golgi",
    "How many CO₂ must be fixed to make one net G3P?|3|🔢||1,6",
    "How many turns make one glucose?|6|🔢||3,12",
    "Making RuBP again is the ... phase.|regeneration|♻️||fixation,reduction"
  ], "Fix, reduce, regenerate."));
  a.push(L("Membrane transport proteins", [
    "Without energy|🚪|Ions and polar molecules cannot slip through the lipid bilayer. <b>Channel proteins</b> make a pore, and <b>carrier proteins</b> change shape to move a molecule across. This is <b>facilitated diffusion</b>, which needs no ATP.",
    "Special channels|💧|<b>Aquaporins</b> let water flow quickly. <b>Gated channels</b> open or close in response to a signal or a voltage change. Each transport protein is specific for its own molecule.",
    "Using a gradient|🔋|<b>Cotransporters</b> use one gradient to move another. <b>Symport</b> moves both in the same direction (like Na⁺ and glucose in the gut). <b>Antiport</b> moves them in opposite directions. The <b>Na⁺/K⁺ pump</b> moves 3 Na⁺ out and 2 K⁺ in using ATP."
  ], [
    "Facilitated diffusion needs...|no ATP|🚪||ATP,light",
    "Proteins that let water cross quickly are...|aquaporins|💧||ribosomes,integrins",
    "Channels that open when a signal arrives are...|gated channels|🚪||aquaporins,cell walls",
    "A transporter moving two things in the same direction is a...|symport|➡️||antiport,uniport pump",
    "A transporter moving two things in opposite directions is an...|antiport|↔️||symport,aquaporin",
    "The Na⁺/K⁺ pump moves ... Na⁺ out per cycle.|3|🔋||1,2",
    "The Na⁺/K⁺ pump moves ... K⁺ in per cycle.|2|🔋||3,1",
    "Glucose enters gut cells together with...|sodium ions|🍬||calcium ions,oxygen",
    "A carrier protein moves a molecule by changing its...|shape|🔄||sequence,color"
  ], "Pores and carriers help; pumps need ATP."));
  a.push(L("Receptor tyrosine kinases", [
    "Two come together|🤝|A <b>receptor tyrosine kinase (RTK)</b> sits in the membrane. When a signal molecule such as a growth factor binds, two receptors join (<b>dimerize</b>) and add phosphates to each other's tyrosines. This is <b>autophosphorylation</b>.",
    "Relay|📶|Relay proteins bind the phosphorylated tyrosines and switch on the protein <b>Ras</b>. Ras starts a <b>kinase cascade</b> (the MAP kinase pathway) that ends by turning on genes needed for cell growth and division.",
    "Health|🩺|The <b>insulin receptor</b> and the <b>EGF receptor</b> are RTKs. A mutation that leaves Ras or an RTK permanently on can drive cells to divide when they should not, which is one cause of cancer."
  ], [
    "An RTK is activated when two receptors...|dimerize|🤝||dissolve,enter the nucleus",
    "RTKs add phosphates to the amino acid...|tyrosine|🧬||glycine,glucose",
    "A receptor adding phosphates to itself is called...|autophosphorylation|⚡||dephosphorylation,transcription",
    "A small protein switched on in the RTK pathway is...|Ras|📶||RuBP,ATP synthase",
    "A chain of kinases passing a signal along is a...|kinase cascade|📶||chaperone,spliceosome",
    "The insulin receptor is an example of an...|RTK|💉||GPCR,ion channel",
    "A stuck-on Ras can lead to...|uncontrolled cell division|🩺||faster digestion,less DNA",
    "A growth factor is a...|signal molecule|📡||receptor,ribosome"
  ], "Receptors pair up and phosphorylate each other."));
  a.push(L("DNA replication enzymes", [
    "Opening up|🧵|<b>Helicase</b> unwinds the double helix at the replication fork. <b>Single-strand binding proteins</b> keep the strands apart. <b>Topoisomerase</b> relieves the twisting strain ahead of the fork.",
    "Building|🔨|<b>Primase</b> makes a short RNA <b>primer</b>. <b>DNA polymerase</b> can only add nucleotides to the 3' end, so it builds new DNA in the <b>5' to 3'</b> direction. The <b>leading strand</b> is made continuously.",
    "The lagging strand|🧩|The <b>lagging strand</b> is made in short pieces called <b>Okazaki fragments</b>. Another polymerase replaces the RNA primers with DNA, and <b>DNA ligase</b> seals the gaps."
  ], [
    "The enzyme that unwinds the DNA double helix is...|helicase|🧵||ligase,primase",
    "The enzyme that makes the RNA primer is...|primase|🔨||helicase,topoisomerase",
    "DNA polymerase builds DNA in the ... direction.|5' to 3'|➡️||3' to 5',both",
    "The strand made in short pieces is the...|lagging strand|🧩||leading strand,template only",
    "The short pieces of the lagging strand are called...|Okazaki fragments|🧩||exons,codons",
    "The enzyme that seals gaps between fragments is...|DNA ligase|🪡||helicase,primase",
    "The strand made continuously is the...|leading strand|➡️||lagging strand,RNA strand",
    "The enzyme that relieves twisting ahead of the fork is...|topoisomerase|🌀||ligase,telomerase",
    "A primer is a short piece of...|RNA|🔨||protein,lipid"
  ], "Polymerase needs a free 3' end to start from."));
  a.push(L("DNA repair", [
    "Copying mistakes|🔍|DNA polymerase <b>proofreads</b> as it works, but a few wrong bases slip through. <b>Mismatch repair</b> enzymes then find the wrong base on the new strand, cut it out and fill the gap correctly.",
    "Damage from outside|☀️|UV light can join two neighboring thymines into a <b>thymine dimer</b>. <b>Nucleotide excision repair</b> cuts out a short stretch of the damaged strand and rebuilds it. People with <b>xeroderma pigmentosum</b> have a fault in this repair and are very sensitive to sunlight.",
    "Breaks|🪢|A break through both strands is the most serious damage. It is mended by <b>non-homologous end joining</b> (quick but may lose bases) or by <b>homologous recombination</b> (accurate, uses a matching copy). <b>BRCA1</b> and <b>BRCA2</b> help with this repair."
  ], [
    "UV light can join two neighboring...|thymines|☀️||guanines,phosphates",
    "That kind of damage is called a thymine...|dimer|☀️||ladder,codon",
    "Repair that cuts out a damaged stretch of DNA is...|excision repair|✂️||translation,fermentation",
    "Wrong bases left after copying are fixed by...|mismatch repair|🔍||UV light,telomerase",
    "A break through both DNA strands is a...|double-strand break|🪢||point mutation,silent mutation",
    "Repair that uses a matching copy is...|homologous recombination|🪢||end joining,splicing",
    "BRCA1 and BRCA2 help with DNA...|repair|🧰||copying only,packaging",
    "Faulty excision repair causes extreme sensitivity to...|sunlight|☀️||cold,sound",
    "DNA polymerase checks its work. This is called...|proofreading|🔍||splicing,capping"
  ], "Cells have different repair kits for different damage."));
  a.push(L("Transcription machinery", [
    "Bacteria|🦠|In bacteria, one <b>RNA polymerase</b> makes all RNA. A <b>sigma factor</b> helps it find the <b>promoter</b>, at sequences about 10 and 35 bases before the gene.",
    "Eukaryotes|🧫|Eukaryotes have three polymerases: <b>RNA pol I</b> (most rRNA), <b>RNA pol II</b> (mRNA) and <b>RNA pol III</b> (tRNA and some small RNAs). Pol II needs transcription factors to bind the <b>TATA box</b> first.",
    "Direction|➡️|RNA polymerase reads the <b>template strand</b> 3' to 5' and builds RNA 5' to 3'. The RNA matches the <b>coding strand</b>, but with U instead of T. So template 3'-TACG-5' gives RNA 5'-AUGC-3'."
  ], [
    "In bacteria, the protein that helps RNA polymerase find the promoter is the...|sigma factor|🦠||spliceosome,histone",
    "Eukaryotic mRNA is made by RNA polymerase...|II|🧫||I,III",
    "The TATA box is part of a...|promoter|🚦||ribosome,telomere",
    "RNA is built in the ... direction.|5' to 3'|➡️||3' to 5',random",
    "RNA contains the base ... instead of thymine.|uracil|🧬||adenine,cytosine",
    "A DNA template read 3'-TACG-5' gives RNA (written 5' to 3')...|AUGC|🧬||UACG,GCAU",
    "A DNA template read 3'-ATGC-5' gives RNA (written 5' to 3')...|UACG|🧬||AUGC,GCAU",
    "Which polymerase makes tRNA in eukaryotes?|RNA pol III|🧫||RNA pol II,DNA pol I"
  ], "Match each base, and remember U replaces T."));
  a.push(L("Properties of the genetic code", [
    "Counting codons|🔢|A codon has 3 bases, so there are 4 × 4 × 4 = <b>64 codons</b>. Of these, <b>61</b> code for amino acids and <b>3</b> are stop codons. There are only <b>20</b> amino acids.",
    "Features|📖|The code is <b>redundant</b> (degenerate): many amino acids have several codons. It is <b>unambiguous</b>: each codon names only one amino acid. It is nearly <b>universal</b>, shared by almost all life.",
    "Wobble|🌀|Codons for the same amino acid often differ only in the <b>third base</b>. The <b>wobble</b> in pairing at that position lets fewer tRNAs read all the codons. Adding or removing one or two bases causes a <b>frameshift</b>."
  ], [
    "The number of possible codons is...|64|🔢||20,61",
    "The number of codons that code for amino acids is...|61|🔢||64,20",
    "The code is redundant, meaning...|several codons can code for one amino acid|📖||one codon codes for several amino acids,each codon is a stop",
    "The code is unambiguous, meaning each codon codes for...|only one amino acid|📖||several amino acids,no amino acid",
    "Pairing flexibility at the third base is called...|wobble|🌀||frameshift,crossing over",
    "Adding one base in a gene causes a...|frameshift|🌀||silent change,splice",
    "The code is nearly...|universal|🌍||different in each species,absent in bacteria",
    "Codons for the same amino acid often differ in the...|third base|🧬||first base,start codon",
    "The number of different amino acids in proteins is...|20|🔢||64,3"
  ], "Three bases per codon, four choices for each base."));
  a.push(L("Counting gametes", [
    "Independent assortment|🎲|Each pair of homologous chromosomes lines up at random in meiosis I. With <b>n</b> pairs, there are <b>2ⁿ</b> possible combinations in the gametes.",
    "Humans|👤|Humans have <b>n = 23</b> pairs, so one person can make 2²³ (about <b>8 million</b>) different gametes, even before crossing over. Random fertilization multiplies this to about 70 trillion combinations.",
    "More variety|🧬|<b>Crossing over</b> in prophase I swaps pieces between homologous chromosomes and makes even more new combinations. This variation is the raw material for natural selection."
  ], [
    "An organism with 2 chromosome pairs can make how many gamete combinations?|4|🎲||2,8",
    "An organism with 3 chromosome pairs can make how many gamete combinations?|8|🎲||6,9",
    "An organism with 4 chromosome pairs can make how many gamete combinations?|16|🎲||8,12",
    "An organism with 5 chromosome pairs can make how many gamete combinations?|32|🎲||10,25",
    "Humans can make about ... gamete combinations from independent assortment alone.|8 million|👤||46,500",
    "Swapping pieces between homologous chromosomes is...|crossing over|🔀||nondisjunction,budding",
    "The formula for gamete combinations is...|2ⁿ|🎲||n²,2n",
    "Variation is the raw material for...|natural selection|🧬||photosynthesis,digestion"
  ], "Each pair gives a choice of two, and the choices multiply."));
  a.push(L("X inactivation", [
    "One X is enough|🧬|Females have two X chromosomes, males have one. In each cell of a female, one X is shut down early in development. The silent X packs into a dense <b>Barr body</b>. The RNA <b>XIST</b> helps coat and silence it.",
    "A random choice|🐈|Which X is switched off is <b>random</b> in each cell, and its daughter cells copy that choice. So a female is a <b>mosaic</b>. <b>Calico cats</b> show this: patches of orange and black fur come from cells with different X's active.",
    "X-linked traits|👁️|<b>X-linked recessive</b> traits such as red-green color blindness and hemophilia show up more often in males, who have only one X. A carrier mother and unaffected father have a 50% chance that each son is affected."
  ], [
    "The dense inactive X is called a...|Barr body|🧬||nucleolus,spindle",
    "An RNA that helps silence the X is...|XIST|🧬||DICER,tRNA",
    "Which X is switched off in a given cell?|chosen at random|🎲||always the father's,always the mother's",
    "Calico cats' patches show...|X inactivation|🐈||polyploidy,imprinting",
    "A female with two different X alleles is a...|mosaic|🐈||clone,hybrid",
    "X-linked recessive traits are more common in...|males|👁️||females,neither sex",
    "A carrier mother and unaffected father: the chance a son is affected is...|50%|🧮||0%,100%",
    "Red-green color blindness is an ... trait.|X-linked recessive|👁️||Y-linked,autosomal dominant"
  ], "Males have only one X, so a recessive allele shows."));
  a.push(L("Mitochondrial DNA", [
    "A second genome|🔋|Mitochondria have their own small, <b>circular DNA</b>, about 16,500 base pairs with <b>37 genes</b> (13 for proteins, 22 tRNAs and 2 rRNAs). It is a leftover from their bacterial ancestors.",
    "Mother to child|👩|In humans, mitochondria come almost entirely from the <b>egg</b>, so mtDNA is passed down the <b>maternal line</b>. It does not recombine, so changes build up slowly and can be used to trace lineages.",
    "Disease|🩺|Cells hold many mtDNA copies. A cell with a mixture of normal and mutant copies shows <b>heteroplasmy</b>. Because muscles and nerves need a lot of ATP, mitochondrial diseases often affect them."
  ], [
    "Mitochondrial DNA is shaped like a...|circle|⭕||straight line,double helix of protein",
    "In humans, mtDNA comes from the...|mother|👩||father,both equally",
    "Mitochondrial DNA is thought to come from ancient...|bacteria|🦠||viruses,fungi",
    "Mitochondrial DNA has about ... genes.|37|🔢||3,25000",
    "A cell with normal and mutant mtDNA shows...|heteroplasmy|🧬||polyploidy,aneuploidy",
    "Mitochondrial diseases often affect tissues needing much...|ATP|🔋||water,sunlight",
    "Because mtDNA does not recombine, it is useful for tracing...|maternal lineages|🌳||paternal lineages,hybrids only",
    "Mitochondria are found in the... of an egg cell.|cytoplasm|🥚||nucleus only,cell wall"
  ], "The egg gives the cytoplasm, and so the mitochondria."));
  a.push(L("Reading phylogenetic trees", [
    "Parts of a tree|🌳|In a <b>phylogenetic tree</b>, each <b>node</b> is a common ancestor and each branch is a lineage. Two groups that share an immediate ancestor are <b>sister taxa</b>. A group with an ancestor and <b>all</b> its descendants is a <b>clade</b> (monophyletic).",
    "Outgroup|🧭|An <b>outgroup</b> is a lineage that branched off earlier than the group being studied. It is used to decide which traits are old and which are newly evolved.",
    "Parsimony|✂️|The principle of <b>parsimony</b> prefers the tree that needs the <b>fewest evolutionary changes</b>. Modern trees are built from DNA and protein sequences, and the number of differences shows how long ago lineages split."
  ], [
    "A node on a tree represents a...|common ancestor|🌳||living species,mutation",
    "Groups that share an immediate common ancestor are...|sister taxa|🌳||outgroups,analogs",
    "A group with an ancestor and all of its descendants is a...|clade|🌳||paraphyletic group,niche",
    "A lineage that split off earlier, used for comparison, is an...|outgroup|🧭||ingroup,node",
    "Parsimony prefers the tree with the ... changes.|fewest|✂️||most,random",
    "A clade is also called...|monophyletic|🌳||polyphyletic,haploid",
    "Phylogenetic trees today are often built from...|DNA sequences|🧬||only fossils,only drawings",
    "More sequence differences between two species suggest they split...|longer ago|⏳||more recently,at the same moment"
  ], "Follow the branches back to where they join."));
  a.push(L("Positive feedback", [
    "Amplifying|📢|<b>Negative feedback</b> reverses a change and keeps things steady. <b>Positive feedback</b> makes a change <b>bigger</b>, pushing the process to a finish. It is less common and always ends with some event.",
    "Body examples|🩹|<b>Blood clotting</b>: platelets release chemicals that call more platelets until the clot forms. <b>Birth</b>: stretching of the cervix triggers oxytocin, which strengthens contractions, which stretch more, until the baby is born.",
    "Other examples|🍌|An <b>action potential</b>: opening of some Na⁺ channels makes the cell more positive, which opens more Na⁺ channels. In plants, <b>ethylene</b> makes fruit ripen, and ripe fruit releases more ethylene."
  ], [
    "Positive feedback makes a change...|bigger|📢||smaller,disappear",
    "Negative feedback usually keeps conditions...|steady|⚖️||changing,at zero",
    "Blood clotting is an example of ... feedback.|positive|🩹||negative,no",
    "Ripening fruit releasing more ethylene is ... feedback.|positive|🍌||negative,no",
    "Body temperature control by sweating is ... feedback.|negative|🌡️||positive,no",
    "Opening of Na⁺ channels making more channels open is ... feedback.|positive|⚡||negative,no",
    "Positive feedback loops usually end with...|a final event|🏁||perfect balance,endless cycles",
    "Oxytocin strengthening birth contractions is an example of ... feedback.|positive|👶||negative,none"
  ], "Does the change get pushed further the same way, or reversed?"));
  a.push(L("Predator and prey cycles", [
    "Boom and bust|🐇|When prey is plentiful, predators have more food and increase. More predators eat more prey, so prey falls. Then predators starve and drop, and prey recover. The <b>Lotka-Volterra model</b> describes these cycles.",
    "Lag|⏳|The predator peak comes <b>after</b> the prey peak. The classic case is the <b>snowshoe hare</b> and <b>Canada lynx</b>, with about a <b>10-year</b> cycle. Food supply and other predators also affect hares.",
    "Who controls?|🎛️|<b>Top-down control</b> means predators limit the numbers below them. <b>Bottom-up control</b> means the food supply (plants, nutrients) limits the consumers above. Real systems often have both."
  ], [
    "In a predator-prey cycle, the predator peak comes...|after the prey peak|⏳||before the prey peak,at the same time",
    "The classic cycle involves the snowshoe hare and the...|lynx|🐱||fox,owl",
    "That cycle lasts about...|10 years|⏳||1 year,100 years",
    "Predators limiting numbers below them is ... control.|top-down|⬇️||bottom-up,no",
    "Plants limiting herbivore numbers is ... control.|bottom-up|⬆️||top-down,no",
    "When predators are many, prey numbers tend to...|fall|📉||rise,stay fixed",
    "When prey becomes scarce, predator numbers...|fall later|📉||rise at once,never change",
    "The model of these cycles is named after Lotka and...|Volterra|📈||Darwin,Mendel"
  ], "Each population follows the other, one step behind."));
  a.push(L("Solutions and molarity", [
    "Concentration|🧪|<b>Molarity (M)</b> is moles of solute per liter of solution. A 1 M solution has 1 mole in each liter. <b>Moles = M × liters</b>.",
    "Using it|🧮|Number of moles = molarity × volume (L). A 2 M solution in 0.5 L holds 2 × 0.5 = <b>1 mole</b>. Convert mL to L first: 250 mL = 0.25 L.",
    "Dilution|💧|To dilute, use <b>C₁V₁ = C₂V₂</b>. The amount of solute stays the same, only the volume rises. For 1 L of 1 M diluted to 2 L, the new concentration is 0.5 M."
  ], [
    "Molarity is moles of solute per...|liter of solution|🧪||gram of water,liter of air",
    "How many moles are in 2 L of a 3 M solution?|6|🧮||5,1.5",
    "How many moles are in 0.5 L of a 2 M solution?|1|🧮||4,0.25",
    "How many moles are in 250 mL of a 4 M solution?|1|🧮||16,0.25",
    "A 1 M solution is diluted from 1 L to 4 L. The new concentration is...|0.25 M|💧||4 M,0.5 M",
    "A 6 M solution is diluted from 1 L to 3 L. The new concentration is...|2 M|💧||18 M,3 M",
    "250 mL equals how many liters?|0.25 L|🧮||2.5 L,25 L",
    "In C₁V₁ = C₂V₂, the amount of solute...|stays the same|💧||doubles,disappears"
  ], "Moles equal concentration times volume in liters."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));
  a.push(MIX("Level 25 Challenge", [a[0], a[1], a[2], a[4], a[5], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15], a[16], a[17]]));

  // ================= LEVEL 26 =================
  const b = [];
  b.push(L("Functional groups", [
    "Small groups, big jobs|🧩|A <b>functional group</b> is a cluster of atoms that gives a molecule its behavior. The <b>hydroxyl</b> (–OH) group is polar and makes molecules dissolve in water. The <b>carbonyl</b> (C=O) group is found in sugars and ketones.",
    "Acids and bases|🍋|The <b>carboxyl</b> group (–COOH) acts as an acid and can release H⁺. The <b>amino</b> group (–NH₂) acts as a base and can pick up H⁺. Amino acids have both.",
    "More groups|🔗|The <b>sulfhydryl</b> group (–SH) forms disulfide bridges in proteins. The <b>phosphate</b> group (–OPO₃²⁻) carries energy in ATP and forms the DNA backbone. The <b>methyl</b> group (–CH₃) is nonpolar and can switch genes off."
  ], [
    "The –OH group is called...|hydroxyl|🧩||carboxyl,amino",
    "The –COOH group is called...|carboxyl|🍋||hydroxyl,sulfhydryl",
    "The –NH₂ group acts as a...|base|🧪||acid,sugar",
    "The –SH group forms bridges in proteins called...|disulfide bridges|🔗||peptide bonds,hydrogen bonds",
    "The group that carries energy in ATP is the...|phosphate group|🔋||methyl group,hydroxyl group",
    "The –CH₃ group is...|nonpolar|🧩||strongly acidic,polar",
    "The carboxyl group tends to ... H⁺.|release|🍋||absorb,destroy",
    "Amino acids have a carboxyl group and an...|amino group|🧬||sulfhydryl group only,methyl group only",
    "A polar group that helps molecules dissolve in water is...|hydroxyl|💧||methyl,carbonyl only"
  ], "Think of the name and the atoms in it."));
  b.push(L("Four levels of protein structure", [
    "Primary and secondary|🧶|The <b>primary structure</b> is the order of amino acids. The <b>secondary structure</b> is local folding held by hydrogen bonds in the backbone: the <b>α helix</b> (a coil) and the <b>β sheet</b> (a pleat).",
    "Tertiary and quaternary|🧩|The <b>tertiary structure</b> is the whole 3D shape of one chain, held by R-group interactions: hydrophobic packing, ionic bonds, hydrogen bonds and <b>disulfide bridges</b>. The <b>quaternary structure</b> is several chains together, like <b>hemoglobin</b> with 4.",
    "Shape is function|🔥|<b>Denaturation</b> (by heat, extreme pH or salt) unfolds a protein so it stops working, though the amino acid order stays. In sickle cell disease, one change in the primary structure (glutamate to valine) alters hemoglobin's behavior."
  ], [
    "The order of amino acids is the ... structure.|primary|🧶||secondary,quaternary",
    "An α helix and a β sheet are ... structure.|secondary|🧶||primary,tertiary",
    "The 3D shape of a single chain is the ... structure.|tertiary|🧩||primary,secondary",
    "Several chains joined together form the ... structure.|quaternary|🧩||tertiary,primary",
    "Secondary structure is held by ... bonds in the backbone.|hydrogen|🧶||peptide only,glycosidic",
    "Hemoglobin has how many chains?|4|🩸||1,2",
    "Unfolding a protein with heat is...|denaturation|🔥||translation,digestion",
    "After denaturation, the primary structure is...|unchanged|🔥||destroyed,reversed",
    "A bridge between two cysteines helps hold the ... structure.|tertiary|🧩||primary,codon"
  ], "Go from the chain, to the folds, to the shape, to the team."));
  b.push(L("Microscopes", [
    "Light microscope|🔬|A <b>light microscope</b> uses visible light and glass lenses. It can show living cells and magnify up to about 1000×. Its <b>resolution</b>, the smallest distance at which two points are seen as separate, is limited to about 200 nm.",
    "Electron microscopes|⚡|<b>Electron microscopes</b> use beams of electrons for far better resolution. A <b>TEM</b> (transmission) shines electrons through very thin slices to show inside structures. An <b>SEM</b> (scanning) scans a surface and gives a 3D-looking image. Specimens must be dead and in a vacuum.",
    "Fluorescence|🌈|<b>Fluorescence microscopy</b> uses dyes or proteins like <b>GFP</b> (green fluorescent protein) to glow and show where a molecule is in a cell. <b>Magnification</b> makes the picture bigger; resolution makes it clearer."
  ], [
    "Which microscope can show living cells?|light microscope|🔬||TEM,SEM",
    "Which microscope shows the inside of thin slices?|TEM|⚡||SEM,light microscope",
    "Which microscope gives a 3D-looking view of a surface?|SEM|🌐||TEM,fluorescence only",
    "GFP stands for green ... protein.|fluorescent|🌈||filtering,fatty",
    "The ability to see two close points as separate is...|resolution|🔍||magnification,contrast",
    "Electron microscope specimens must be...|dead|⚡||alive,in water",
    "Electron microscopes use beams of...|electrons|⚡||light,sound",
    "Using dyes or GFP to see where a molecule is uses...|fluorescence microscopy|🌈||electron microscopy,dissection",
    "A larger image that is blurry has high magnification but low...|resolution|🔍||temperature,mass"
  ], "Magnification is size; resolution is clarity."));
  b.push(L("Controlling glycolysis", [
    "The control enzyme|🎛️|<b>Phosphofructokinase (PFK)</b> is the main control point of glycolysis. It is an allosteric enzyme, which means its activity is set by molecules binding away from the active site.",
    "Energy charge|🔋|High <b>ATP</b> and <b>citrate</b> (a citric acid cycle product) <b>inhibit</b> PFK, so glycolysis slows when the cell has plenty of energy. <b>AMP</b> (a sign that ATP is low) <b>activates</b> PFK.",
    "Why it makes sense|💡|The pathway speeds up when energy is needed and slows when it is not. This is <b>feedback regulation</b> and stops the cell from wasting glucose."
  ], [
    "The main control enzyme of glycolysis is...|PFK|🎛️||rubisco,ligase",
    "High ATP ... PFK.|inhibits|🔋||activates,destroys",
    "AMP ... PFK.|activates|🔋||inhibits,digests",
    "High AMP signals that ATP is...|low|📉||high,not needed",
    "Citrate from the citric acid cycle ... PFK.|inhibits|🔄||activates,copies",
    "When a cell has plenty of ATP, glycolysis...|slows down|🐢||speeds up,stops forever",
    "PFK is regulated by binding at a site away from the active site. This is...|allosteric regulation|🎚️||competitive inhibition,denaturation",
    "When a muscle works hard and ATP drops, PFK becomes...|more active|💪||less active,absent"
  ], "Does the cell have much energy or little?"));
  b.push(L("Storing and making glucose", [
    "Glycogen|🍞|Animals store glucose as <b>glycogen</b>, a branched polymer, mainly in the <b>liver</b> and <b>muscles</b>. After a meal, <b>insulin</b> triggers glycogen synthesis (<b>glycogenesis</b>). Plants store glucose as starch.",
    "Releasing glucose|⏰|Between meals, <b>glucagon</b> triggers the liver to break down glycogen (<b>glycogenolysis</b>) and release glucose to the blood. Muscle glycogen is kept for the muscle itself.",
    "Making new glucose|⚗️|<b>Gluconeogenesis</b> makes glucose from non-sugar molecules, such as lactate, glycerol and amino acids, mostly in the liver. It keeps blood sugar steady during fasting."
  ], [
    "Animals store glucose as...|glycogen|🍞||starch,cellulose",
    "The main glycogen stores are the liver and the...|muscles|💪||brain,skin",
    "Building glycogen is called...|glycogenesis|🍞||glycogenolysis,gluconeogenesis",
    "Breaking glycogen down is called...|glycogenolysis|🍞||glycogenesis,glycolysis",
    "Making glucose from non-sugar molecules is...|gluconeogenesis|⚗️||glycolysis,fermentation",
    "The hormone that triggers glycogen release is...|glucagon|⏰||insulin,thyroxine",
    "The hormone that triggers glycogen storage is...|insulin|🍞||glucagon,cortisol",
    "Plants store glucose as...|starch|🌱||glycogen,chitin",
    "Muscle glycogen is used mainly by the...|muscle itself|💪||liver,brain"
  ], "Glucagon releases and insulin stores."));
  b.push(L("Burning fats", [
    "Fat as fuel|🥑|Fats store more energy per gram (about <b>9 kcal</b>) than carbohydrates or proteins (about 4 kcal). Fat is broken into <b>glycerol</b> and <b>fatty acids</b>.",
    "Beta-oxidation|✂️|Fatty acids go into mitochondria, where <b>beta-oxidation</b> cuts them into 2-carbon pieces of <b>acetyl-CoA</b>, and makes NADH and FADH₂. Acetyl-CoA enters the citric acid cycle. A 16-carbon fatty acid gives <b>8 acetyl-CoA</b>.",
    "Ketone bodies|🧠|During long fasting, the liver makes <b>ketone bodies</b> from acetyl-CoA. The brain, which cannot burn fatty acids directly, can use ketones for fuel."
  ], [
    "Fat gives about ... kcal per gram.|9|🥑||4,2",
    "Carbohydrates give about ... kcal per gram.|4|🍞||9,12",
    "Fatty acids are cut into 2-carbon units called...|acetyl-CoA|✂️||pyruvate,RuBP",
    "That process is called...|beta-oxidation|✂️||glycolysis,transcription",
    "Beta-oxidation takes place in the...|mitochondria|🔋||ribosomes,Golgi",
    "A 16-carbon fatty acid makes how many acetyl-CoA?|8|🔢||16,4",
    "A 12-carbon fatty acid makes how many acetyl-CoA?|6|🔢||12,3",
    "During fasting, the liver makes...|ketone bodies|🧠||glycogen only,starch",
    "A fat is broken down into fatty acids and...|glycerol|🥑||glucose,amino acids"
  ], "Count the carbons and divide by two."));
  b.push(L("The trp operon", [
    "Repressible|🔒|The <b>trp operon</b> holds genes that make the amino acid <b>tryptophan</b>. It is normally <b>on</b>. The repressor made for it is <b>inactive</b> by itself, so RNA polymerase can transcribe the genes.",
    "A corepressor|🔑|When there is plenty of tryptophan, it acts as a <b>corepressor</b>: it binds the repressor, which then fits the <b>operator</b> and blocks transcription. The operon turns <b>off</b>. This is a <b>repressible</b> operon.",
    "Compare|⚖️|The lac operon (breaking down food) is usually off and turned on by its substrate. The trp operon (making a product) is usually on and turned off by its product. Both save the cell's resources."
  ], [
    "The trp operon makes the amino acid...|tryptophan|🧬||lactose,glucose",
    "The trp operon is normally...|on|💡||off,missing",
    "Tryptophan acts as a...|corepressor|🔑||inducer,promoter",
    "With lots of tryptophan, the repressor...|binds the operator|🔒||leaves the cell,is digested",
    "The trp operon is an example of a ... operon.|repressible|🔒||inducible,viral",
    "The lac operon is usually...|off|💡||on,absent",
    "The trp operon is turned off by its...|product|🛑||substrate,promoter",
    "When tryptophan is scarce, the genes are...|transcribed|💡||blocked,deleted"
  ], "The product turns off its own production line."));
  b.push(L("Cell fate and iPS cells", [
    "Master switches|🎛️|A <b>master regulator</b> is a transcription factor that turns on a set of genes and fixes a cell's fate. <b>MyoD</b> can turn an ordinary connective tissue cell into a muscle cell.",
    "Reprogramming|🔄|In 2006, Shinya Yamanaka showed that adding just four genes (<b>Oct4, Sox2, Klf4 and c-Myc</b>) to adult skin cells makes <b>induced pluripotent stem cells (iPS cells)</b>. They behave like embryonic stem cells. He won a Nobel Prize in 2012.",
    "Uses|🩺|iPS cells let scientists make a patient's own cells in a dish, to study disease or to test medicines, without using embryos. Researchers are also testing them for repairing damaged tissue."
  ], [
    "A transcription factor that sets a cell's fate is a...|master regulator|🎛️||ribosome,telomere",
    "MyoD helps cells become...|muscle cells|💪||nerve cells,blood cells",
    "iPS cells are made from...|adult cells|🔄||embryos only,viruses",
    "iPS stands for induced ... stem cells.|pluripotent|🔄||permanent,photosynthetic",
    "iPS cells were first made by...|Yamanaka|🏆||Darwin,Pasteur",
    "How many genes did the first iPS recipe use?|4|🔢||2,20",
    "iPS cells behave like...|embryonic stem cells|🧫||red blood cells,bacteria",
    "One use of iPS cells is to...|study disease in a dish|🧪||change species,make DNA"
  ], "Adult cells can be reset to a younger state."));
  b.push(L("Targeted cancer treatment", [
    "A broken swap|🧬|In some leukemia (chronic myeloid leukemia), pieces of chromosomes 9 and 22 swap. This makes the <b>Philadelphia chromosome</b> and a fused gene, <b>BCR-ABL</b>, that makes a kinase stuck <b>on</b>.",
    "Targeting the cause|🎯|The drug <b>imatinib</b> (Gleevec) blocks that kinase, so it kills the cancer cells with little harm to normal ones. In some breast cancers the <b>HER2</b> receptor is over-made, and the antibody <b>trastuzumab</b> blocks it.",
    "Using the immune system|🛡️|<b>Immunotherapy</b> helps the immune system attack tumors. <b>Checkpoint inhibitors</b> block proteins like <b>PD-1</b> that tell T cells to stand down."
  ], [
    "The Philadelphia chromosome produces the fusion gene...|BCR-ABL|🧬||BRCA1,HER2",
    "The Philadelphia chromosome is linked to...|chronic myeloid leukemia|🧬||sickle cell disease,diabetes",
    "BCR-ABL makes a kinase that is stuck...|on|⚡||off,missing",
    "Imatinib works by blocking a...|kinase|🎯||ribosome,telomere",
    "A receptor over-made in some breast cancers is...|HER2|🎯||CD4,Dicer",
    "Treating with a drug aimed at one cancer-causing molecule is...|targeted therapy|🎯||random mutation,fermentation",
    "PD-1 normally tells T cells to...|stand down|🛡️||multiply,become red blood cells",
    "Checkpoint inhibitors help the ... attack tumors.|immune system|🛡️||digestive system,skeleton"
  ], "The best drugs aim at the specific broken part."));
  b.push(L("Model organisms", [
    "Why use a small model?|🐭|Scientists often study <b>model organisms</b> to learn how life works. A good model is easy to keep, has a <b>short generation time</b>, many offspring and a known genome. Many genes are shared with humans.",
    "Favorites|🪰|<b><i>E. coli</i></b> (bacteria genetics), <b>yeast</b> (cell cycle), the fruit fly <b><i>Drosophila</i></b> (heredity and body plans), the worm <b><i>C. elegans</i></b> (development, every cell traced), <b>zebrafish</b> (clear embryos), <b><i>Arabidopsis</i></b> (plants) and the <b>mouse</b> (mammals).",
    "Limits|⚠️|A model organism is not a person. Results must be checked, and animal studies follow strict ethics rules to protect the animals' welfare."
  ], [
    "A small organism used to study how life works is a...|model organism|🐭||producer,vector",
    "The common model plant is...|Arabidopsis|🌱||corn only,oak",
    "A model with see-through embryos is the...|zebrafish|🐟||mouse,fruit fly",
    "A model in which every cell has been traced is...|C. elegans|🪱||Drosophila,yeast",
    "A model good for studying heredity and body plans is...|Drosophila|🪰||E. coli,Arabidopsis",
    "Studies of the cell cycle often use...|yeast|🍞||zebrafish,mice only",
    "Models often have a short...|generation time|⏱️||genome,lifespan of the scientist",
    "A mammal commonly used as a model is the...|mouse|🐭||zebrafish,worm",
    "A good model organism shares many ... with humans.|genes|🧬||habitats,diets"
  ], "Short life cycle and known genome are the key."));
  b.push(L("Fitness and heterozygote advantage", [
    "Relative fitness|📏|<b>Fitness</b> is an individual's contribution of offspring to the next generation. <b>Relative fitness (w)</b> compares genotypes: the best has w = 1. The <b>selection coefficient</b> is <b>s = 1 − w</b>.",
    "Example|🧮|If a genotype has w = 0.8, then s = 0.2: it leaves 20% fewer offspring than the best genotype. A recessive allele that is harmful can still stay in a population, hidden in carriers.",
    "Balanced|⚖️|With <b>heterozygote advantage</b>, the carrier does better than both homozygotes. People with one sickle cell allele are protected from severe <b>malaria</b>, so the allele stays in populations where malaria is common. This is a kind of <b>balancing selection</b>."
  ], [
    "The selection coefficient is s equals...|1 minus w|📏||w times 2,w plus 1",
    "A genotype with w = 0.9 has s equal to...|0.1|🧮||0.9,1.9",
    "A genotype with w = 0.75 has s equal to...|0.25|🧮||0.75,0.5",
    "The fittest genotype has relative fitness...|1|📏||0,10",
    "Carriers doing better than both homozygotes show...|heterozygote advantage|⚖️||genetic drift,mutation",
    "Sickle cell carriers are protected against...|malaria|🦟||flu,measles",
    "Selection that keeps two alleles in a population is...|balancing selection|⚖️||directional selection,disruptive only",
    "Fitness measures...|offspring contributed|👶||strength only,body size",
    "A harmful recessive allele can persist because it hides in...|carriers|🧬||all offspring,the environment"
  ], "Fitness counts the offspring left behind."));
  b.push(L("Evolution and development", [
    "Evo-devo|🧬|<b>Evo-devo</b> compares how animals develop to see how evolution works. Many body-shaping genes are shared among very different animals. The gene <b>Pax6</b> helps build eyes in flies, mice and humans.",
    "Regulatory changes|🎚️|Big changes in body shape can come from small changes in <b>regulatory DNA</b> (when and where a gene is switched on) rather than in the protein. In stickleback fish, a change in an enhancer for the gene <b>Pitx1</b> removed pelvic spines in lake populations.",
    "Timing|⏱️|<b>Heterochrony</b> is a change in the timing or speed of development. In the axolotl salamander, <b>neoteny</b> (keeping juvenile features as an adult) lets it breed while still having gills."
  ], [
    "Comparing how animals develop to study evolution is...|evo-devo|🧬||phylogeography,taxonomy",
    "The gene that helps build eyes in many animals is...|Pax6|👁️||Pitx1,Ras",
    "Many big changes come from altered...|regulatory DNA|🎚️||only proteins,only chromosomes",
    "A change in the timing of development is...|heterochrony|⏱️||homology,nondisjunction",
    "Keeping juvenile features as an adult is...|neoteny|🦎||metamorphosis,imprinting",
    "The axolotl is an example of...|neoteny|🦎||photosynthesis,mimicry",
    "Stickleback fish lost pelvic spines through a change in an...|enhancer|🐟||exon,codon",
    "Genes shared by very different animals suggest a ... ancestor.|common|🌳||different,no",
    "Fly eyes and human eyes are built with the help of a similar...|gene|👁️||lens,diet"
  ], "Small switch changes can make large body changes."));
  b.push(L("Gene duplication", [
    "A spare copy|📋|Sometimes a mistake in copying or crossing over makes an <b>extra copy</b> of a gene. One copy keeps the original job and the other is free to mutate, and may gain a <b>new function</b>.",
    "Gene families|👪|The <b>globin genes</b> (hemoglobin chains and myoglobin) arose by repeated duplication. Genes related through duplication in one species are <b>paralogs</b>; the same gene in different species are <b>orthologs</b>. A duplicate that stops working is a <b>pseudogene</b>.",
    "Whole genomes|🌾|<b>Polyploidy</b> duplicates a whole genome. It is common in plants (wheat has six sets of chromosomes) and has been important in plant evolution. <b>Exon shuffling</b> also builds new genes by joining exons from different genes."
  ], [
    "An extra copy of a gene can gain a...|new function|📋||new species name,new sun",
    "Genes related through duplication in one species are...|paralogs|👪||orthologs,analogs",
    "The same gene in two different species is an...|ortholog|🌳||paralog,pseudogene",
    "A duplicate that no longer works is a...|pseudogene|💤||oncogene,proto-oncogene",
    "Duplicating a whole genome is...|polyploidy|🌾||aneuploidy,transcription",
    "Polyploidy is especially common in...|plants|🌾||mammals,birds",
    "Hemoglobin and myoglobin come from the ... gene family.|globin|🩸||keratin,collagen",
    "Joining exons from different genes is...|exon shuffling|🧩||gene flow,fusion",
    "One copy of a duplicated gene can mutate freely because the other copy...|keeps the original job|📋||is deleted,is toxic"
  ], "A spare copy gives evolution room to experiment."));
  b.push(L("Muscle fiber types", [
    "Slow fibers|🐢|<b>Slow-twitch (type I)</b> fibers contract slowly but do not tire easily. They are rich in <b>mitochondria</b> and <b>myoglobin</b>, so they look red, and make ATP aerobically. They suit marathon running and posture.",
    "Fast fibers|🐇|<b>Fast-twitch (type II)</b> fibers contract fast and strongly but tire quickly. They rely more on <b>glycolysis</b> and have fewer mitochondria. They suit sprints and lifting.",
    "Quick energy|⚡|<b>Creatine phosphate</b> gives its phosphate to ADP to remake ATP in a flash. It supplies energy for about the first <b>10 seconds</b> of hard effort before glycolysis and aerobic respiration take over."
  ], [
    "Fibers that tire slowly are...|slow-twitch|🐢||fast-twitch,smooth",
    "Fibers best for sprints are...|fast-twitch|🐇||slow-twitch,cardiac",
    "Red color in slow fibers comes from...|myoglobin|🔴||keratin,chlorophyll",
    "Slow fibers make ATP mostly by...|aerobic respiration|🔋||fermentation only,photosynthesis",
    "Fast fibers rely more on...|glycolysis|🍬||the citric acid cycle,fat burning only",
    "A quick backup source of ATP is...|creatine phosphate|⚡||glycogen,myosin",
    "Creatine phosphate lasts about...|10 seconds|⏱️||10 minutes,10 hours",
    "Marathon runners tend to have many...|slow-twitch fibers|🏃||fast-twitch fibers,bone cells"
  ], "Endurance versus power."));
  b.push(L("Synaptic integration", [
    "Excite or calm|🔔|A neuron receives many inputs. An <b>excitatory</b> input causes an <b>EPSP</b>, a small depolarization that pushes the neuron toward threshold. An <b>inhibitory</b> input causes an <b>IPSP</b>, a small hyperpolarization (for example by letting Cl⁻ in) that pushes it away.",
    "Adding up|➕|<b>Summation</b> adds the inputs. In <b>temporal summation</b>, inputs arrive close together in time at the same synapse. In <b>spatial summation</b>, inputs arrive at different synapses at once.",
    "Decision|⚖️|The total is measured at the <b>axon hillock</b>. If it reaches <b>threshold</b> (about −55 mV, from a resting −70 mV), an action potential fires. Otherwise nothing happens: it is all-or-none."
  ], [
    "A small depolarization that excites a neuron is an...|EPSP|🔔||IPSP,action potential",
    "A small hyperpolarization that calms a neuron is an...|IPSP|🔕||EPSP,reflex",
    "Adding up inputs is called...|summation|➕||isolation,diffusion",
    "Inputs close together in time are added by ... summation.|temporal|⏱️||spatial,genetic",
    "Inputs at different synapses at once are added by ... summation.|spatial|📍||temporal,passive",
    "The decision to fire is made at the...|axon hillock|⚖️||dendrite tip,myelin sheath",
    "The threshold potential is about...|−55 mV|🔢||−70 mV,+30 mV",
    "An action potential is...|all-or-none|⚡||graded,partial",
    "Letting Cl⁻ into the neuron causes...|hyperpolarization|🔕||depolarization,threshold"
  ], "Add up all the pushes and pulls."));
  b.push(L("The hypothalamus-pituitary axis", [
    "Boss and middle manager|👑|The <b>hypothalamus</b> in the brain makes <b>releasing hormones</b> that travel a short way to the <b>anterior pituitary</b>. The pituitary then releases <b>tropic hormones</b> that tell other glands to work.",
    "Chains of command|⛓️|<b>TRH</b> leads to <b>TSH</b>, which makes the thyroid release thyroxine. <b>CRH</b> leads to <b>ACTH</b>, which makes the adrenal cortex release <b>cortisol</b> in stress. The final hormone feeds back to slow the chain: <b>negative feedback</b>.",
    "Posterior pituitary|📦|The <b>posterior pituitary</b> stores and releases two hormones made in the hypothalamus: <b>ADH</b> (water balance) and <b>oxytocin</b>."
  ], [
    "The brain region that starts the chain is the...|hypothalamus|👑||thyroid,adrenal gland",
    "TSH makes the ... release thyroxine.|thyroid|🦋||adrenal gland,pancreas",
    "ACTH makes the adrenal cortex release...|cortisol|😰||insulin,thyroxine",
    "Releasing hormones act on the...|anterior pituitary|📦||posterior pituitary only,liver",
    "A hormone that tells another gland to work is a ... hormone.|tropic|⛓️||steroid only,digestive",
    "ADH is released by the...|posterior pituitary|💧||thyroid,pancreas",
    "The final hormone in the chain slows the chain by...|negative feedback|🔁||positive feedback,mutation",
    "Cortisol is mainly a ... hormone.|stress|😰||sleep only,growth only"
  ], "Follow the chain from brain to gland."));
  b.push(L("Antibody structure", [
    "Y shape|🔱|An <b>antibody</b> is made of <b>four chains</b>: two identical heavy chains and two identical light chains. It is Y-shaped. The tips of the Y are the <b>variable regions</b> that bind a specific antigen. The stem is the <b>constant region</b>.",
    "Five classes|🏷️|<b>IgG</b> is the most common in blood. <b>IgM</b> is the first made in a new infection. <b>IgA</b> guards mucus and milk. <b>IgE</b> is linked to allergies and parasites. <b>IgD</b> sits on B cells.",
    "Clonal selection|🧫|Each B cell has receptors for one antigen. When an antigen fits, that B cell multiplies (<b>clonal selection</b>) into <b>plasma cells</b> that release antibodies and <b>memory cells</b> that last for years."
  ], [
    "An antibody has how many chains?|4|🔱||2,6",
    "The antigen-binding tips are the ... regions.|variable|🔱||constant,heavy",
    "The most common antibody in blood is...|IgG|🩸||IgE,IgD",
    "The first antibody class made in a new infection is...|IgM|🦠||IgG,IgA",
    "The class found in mucus and milk is...|IgA|🥛||IgM,IgE",
    "The class linked to allergies is...|IgE|🤧||IgG,IgA",
    "B cells that make antibodies are called...|plasma cells|🧫||memory cells,red cells",
    "B cells that last for years and speed up a later response are...|memory cells|🧠||plasma cells,mast cells",
    "Selecting the B cell that fits an antigen is...|clonal selection|🧫||natural selection,genetic drift"
  ], "Variable tips fit the antigen like a key."));
  b.push(L("Moving water up and sugar around", [
    "Cohesion-tension|🌳|Water evaporates from leaves (<b>transpiration</b>), creating tension that pulls up a column of water in the <b>xylem</b>. Water molecules stick to each other (<b>cohesion</b>) and to the xylem walls (<b>adhesion</b>), so the column does not break. This needs no energy from the plant.",
    "Pressure flow|🍬|In phloem, sugar moves from a <b>source</b> (where it is made or released, like leaves) to a <b>sink</b> (where it is used or stored, like roots or fruit). Sugar is loaded at the source, water enters by osmosis, and the pressure pushes sap to the sink.",
    "Directions|↕️|Xylem moves water and minerals in <b>one direction</b>, up. Phloem can move sugar <b>either way</b>, depending on the sources and sinks. A growing fruit is a sink."
  ], [
    "The pull that lifts water up a tree comes from...|transpiration|🌳||root pressure only,photosynthesis in roots",
    "Water molecules sticking to each other is...|cohesion|💧||adhesion,osmosis",
    "Water molecules sticking to the xylem walls is...|adhesion|💧||cohesion,diffusion",
    "Water moves up the xylem using ... energy from the plant.|no|🌳||a lot of,ATP",
    "Where sugar is made or released is the...|source|🍬||sink,xylem",
    "Where sugar is used or stored is the...|sink|🍎||source,stoma",
    "Sugar moves in the...|phloem|🍬||xylem,cuticle",
    "Sap moves in phloem because of...|pressure flow|🍬||wind,magnetism",
    "A growing fruit is a...|sink|🍎||source,stoma"
  ], "Xylem pulls water up; phloem pushes sugar from source to sink."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15], b[16], b[17]]));
  b.push(MIX("Level 26 Challenge", [b[1], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[13], b[14], b[15], b[16], b[17], a[0], a[7], a[10]]));

  // ================= LEVEL 27 =================
  const c = [];
  c.push(L("Amino acid families", [
    "One backbone, 20 side chains|🧬|Every amino acid has a central carbon with an <b>amino group</b>, a <b>carboxyl group</b>, a hydrogen and a variable <b>R group</b>. The 20 R groups decide how each amino acid behaves.",
    "Groups|🎨|<b>Nonpolar</b> R groups (valine, leucine) avoid water and usually hide inside a folded protein. <b>Polar</b> ones (serine) like water. <b>Acidic</b> ones (aspartate, glutamate) are negative. <b>Basic</b> ones (lysine, arginine) are positive.",
    "Chain ends|🔗|A chain has a free amino end, the <b>N-terminus</b>, and a free carboxyl end, the <b>C-terminus</b>. Ribosomes build from N to C. A chain of n amino acids has <b>n − 1 peptide bonds</b>. Cysteine can form disulfide bridges."
  ], [
    "The part that differs between amino acids is the...|R group|🧬||amino group,carboxyl group",
    "The free amino end of a chain is the...|N-terminus|🔗||C-terminus,promoter",
    "The free carboxyl end of a chain is the...|C-terminus|🔗||N-terminus,5' cap",
    "Lysine and arginine are...|basic|➕||acidic,nonpolar",
    "Aspartate and glutamate are...|acidic|➖||basic,nonpolar",
    "Nonpolar R groups usually sit...|inside the folded protein|🧶||on the outer surface,in the DNA",
    "A chain of 10 amino acids has how many peptide bonds?|9|🔢||10,11",
    "A chain of 25 amino acids has how many peptide bonds?|24|🔢||25,26",
    "Which amino acid can form disulfide bridges?|cysteine|🌉||valine,serine"
  ], "All amino acids share a backbone; the side chain is what varies."));
  c.push(L("How enzymes speed reactions", [
    "Lowering the hill|⛰️|Enzymes lower the <b>activation energy</b> by stabilizing the <b>transition state</b>, the high-energy in-between form. They do <b>not</b> change ΔG or the equilibrium; they only get there faster.",
    "Tricks|🧰|The active site can hold substrates in the right position (<b>proximity and orientation</b>), strain a bond, supply acid or base groups, or form a temporary covalent bond. In <b>induced fit</b>, the active site changes shape as the substrate binds.",
    "Helpers|🤝|Many enzymes need <b>cofactors</b>: metal ions such as Zn²⁺ or Mg²⁺. Organic cofactors are <b>coenzymes</b>, and many are made from <b>vitamins</b> (for example NAD⁺ from niacin). An enzyme with its helper in place is a <b>holoenzyme</b>."
  ], [
    "Enzymes lower the...|activation energy|⛰️||ΔG,temperature of the cell",
    "The high-energy in-between form of a reaction is the...|transition state|⛰️||product,substrate",
    "Does an enzyme change the equilibrium of a reaction?|no|⚖️||yes,only in the cold",
    "In induced fit, the active site...|changes shape on binding|🤝||is destroyed,becomes DNA",
    "A metal ion helper is a...|cofactor|🧰||substrate,product",
    "An organic helper made from a vitamin is a...|coenzyme|💊||holoenzyme,inhibitor",
    "An enzyme with its cofactor in place is a...|holoenzyme|🧩||apoenzyme,zymogen",
    "NAD⁺ is made from the vitamin...|niacin|💊||vitamin C,vitamin K",
    "Holding two substrates close and facing the right way is...|proximity and orientation|📍||denaturation,allostery"
  ], "Enzymes make the climb easier, not the destination different."));
  c.push(L("Vesicle traffic", [
    "Moving cargo|📦|Proteins move through the cell in <b>vesicles</b>. <b>COPII</b>-coated vesicles carry cargo from the ER to the Golgi, and <b>COPI</b>-coated vesicles carry escaped proteins back.",
    "Docking|🔗|<b>Rab</b> proteins help a vesicle find the right target. <b>SNARE</b> proteins on the vesicle and target membrane twist together to pull them close and make them <b>fuse</b>.",
    "Taking in|🚪|In <b>receptor-mediated endocytosis</b>, receptors collect a cargo (such as <b>LDL</b>, which carries cholesterol) into pits coated with <b>clathrin</b>. The pit pinches off as a vesicle. <b>Exocytosis</b> is the reverse, releasing contents outside."
  ], [
    "Vesicles carrying cargo from ER to Golgi are coated with...|COPII|📦||clathrin,ubiquitin",
    "Proteins that help vesicles fuse with a target membrane are...|SNAREs|🔗||histones,integrins",
    "Proteins that help a vesicle find its target are...|Rab proteins|🧭||ribosomal proteins,collagens",
    "Receptor-mediated endocytosis uses a coat of...|clathrin|🚪||COPI,cellulose",
    "LDL carries...|cholesterol|🩸||oxygen,DNA",
    "Releasing the contents of a vesicle outside the cell is...|exocytosis|📤||endocytosis,phagocytosis only",
    "Vesicles carrying escaped proteins back to the ER use...|COPI|🔙||COPII,clathrin",
    "Taking material into the cell in vesicles is...|endocytosis|📥||exocytosis,osmosis"
  ], "Each coat or protein works at a different step of the delivery."));
  c.push(L("Poisons and uncouplers", [
    "Stopping the chain|🛑|Some chemicals block the electron transport chain. <b>Rotenone</b> blocks complex I. <b>Cyanide</b> and <b>carbon monoxide</b> block complex IV, so cells cannot use oxygen. <b>Oligomycin</b> blocks ATP synthase.",
    "Uncouplers|💨|An <b>uncoupler</b> makes the inner membrane leaky to protons. The proton gradient collapses, so oxygen use goes on but little ATP is made. The energy is released as <b>heat</b>.",
    "Heat on purpose|🔥|<b>Brown fat</b> uses an uncoupling protein, <b>UCP1</b> (thermogenin), to make heat. It is important in newborn mammals and hibernators. Respiration and ATP are normally <b>coupled</b>."
  ], [
    "Cyanide blocks complex...|IV|🛑||I,II",
    "Oligomycin blocks...|ATP synthase|🛑||complex IV,glycolysis",
    "An uncoupler makes the inner membrane leaky to...|protons|💨||electrons,oxygen",
    "When respiration is uncoupled, the energy is released as...|heat|🔥||light,sugar",
    "Brown fat makes heat using...|UCP1|🔥||rubisco,insulin",
    "Brown fat is especially important for...|newborn mammals and hibernators|🐻||plants,bacteria",
    "Cyanide stops cells from using...|oxygen|💨||glucose,water",
    "When uncoupled, oxygen use goes on but ... falls.|ATP production|🔋||heat,water",
    "Normally, respiration and ATP production are...|coupled|🔗||unrelated,reversed"
  ], "Block the chain or let the protons leak."));
  c.push(L("Heritability", [
    "Many genes, one trait|📏|Traits like height or grain yield are <b>quantitative</b>: they vary continuously, are controlled by many genes (<b>polygenic</b>) plus the environment, and form a bell curve.",
    "How much is genetic?|🧮|The total variation is <b>V<sub>P</sub> = V<sub>G</sub> + V<sub>E</sub></b> (phenotype = genetic + environmental variation). <b>Heritability H² = V<sub>G</sub> / V<sub>P</sub></b>, a number from 0 to 1.",
    "Careful|⚠️|Heritability describes a <b>population</b> in one environment, not one person. A heritability of 0.6 does not mean 60% of your height is from genes. Twin studies and <b>QTL mapping</b> (finding genome regions linked to a trait) are used to study it."
  ], [
    "A trait that varies continuously and is controlled by many genes is...|quantitative|📏||Mendelian,sex-linked",
    "Variation in phenotype equals genetic variation plus...|environmental variation|🌍||mutation rate,nothing",
    "Heritability H² equals V<sub>G</sub> divided by...|V<sub>P</sub>|🧮||V<sub>E</sub> only,V<sub>G</sub>",
    "V<sub>G</sub> = 20 and V<sub>E</sub> = 20. H² is...|0.5|🧮||0.2,2",
    "V<sub>G</sub> = 60 and V<sub>E</sub> = 40. H² is...|0.6|🧮||0.4,1.5",
    "V<sub>G</sub> = 9 and V<sub>E</sub> = 3. H² is...|0.75|🧮||0.25,3",
    "Heritability describes a...|population|👥||single person,single gene only",
    "A region of the genome linked to a quantitative trait is a...|QTL|🗺️||codon,operon",
    "Heritability can range from 0 to...|1|🔢||10,100"
  ], "Genetic variation divided by total variation."));
  c.push(L("Jumping genes", [
    "Transposable elements|🦘|<b>Transposable elements</b> (transposons) are DNA sequences that can move to new places in the genome. Barbara McClintock found them in maize in the 1940s and 50s, and won a Nobel Prize in 1983.",
    "Two ways to move|✂️|<b>DNA transposons</b> use an enzyme, <b>transposase</b>, to cut and paste. <b>Retrotransposons</b> are copied into RNA, then reverse-transcribed into DNA at a new spot (copy and paste). <b>Alu</b> and <b>LINE-1</b> are common human retrotransposons.",
    "Genome content|📚|Only about <b>1.5%</b> of the human genome codes for protein. About <b>45%</b> comes from transposable elements. When one jumps into a gene it can cause mutations."
  ], [
    "DNA sequences that can move are...|transposable elements|🦘||operons,telomeres",
    "Transposable elements were first found in...|maize|🌽||fruit flies,yeast",
    "They were discovered by Barbara...|McClintock|🔬||Franklin,Curie",
    "Cut-and-paste movement uses the enzyme...|transposase|✂️||ligase,helicase",
    "Retrotransposons move through an ... step.|RNA|📄||protein,lipid",
    "A common human retrotransposon is...|Alu|🧬||Ti plasmid,Hox",
    "About what share of the human genome codes for protein?|1.5%|📊||50%,15%",
    "About what share of the human genome comes from transposable elements?|45%|📊||1%,95%",
    "A transposon jumping into a gene can cause a...|mutation|⚠️||vaccine,hormone"
  ], "Think of DNA that moves around."));
  c.push(L("Telomeres and telomerase", [
    "Chromosome caps|🧢|<b>Telomeres</b> are repeated sequences at the ends of chromosomes (TTAGGG in humans). They protect genes, because DNA polymerase cannot fully copy the very end of a linear strand. Each division shortens telomeres a little.",
    "Limits|⏳|When telomeres get very short, the cell stops dividing or dies. This is part of the <b>Hayflick limit</b>: normal human cells divide about 50 times in a dish.",
    "Telomerase|🔧|<b>Telomerase</b> carries its own RNA template and works like a reverse transcriptase to add repeats. It is active in germ cells, stem cells and most cancers, which helps them divide without limit. Blackburn, Greider and Szostak shared the 2009 Nobel Prize for this."
  ], [
    "Repeated sequences at chromosome ends are...|telomeres|🧢||centromeres,operators",
    "Telomeres get ... with each division.|shorter|⏳||longer,twisted",
    "Telomeres protect...|the ends of chromosomes|🧢||ribosomes,the cell wall",
    "The enzyme that adds telomere repeats is...|telomerase|🔧||ligase,helicase",
    "Telomerase carries its own...|RNA template|🔧||protein coat,lipid tail",
    "Telomerase is active in most...|cancer cells|🩺||nerve cells,red blood cells",
    "The limit on normal cell divisions is the ... limit.|Hayflick|⏳||Hardy-Weinberg,Carrying",
    "Human telomere repeats are...|TTAGGG|🧬||AUGAUG,GAATTC",
    "Normal human cells divide about ... times in a dish.|50|🔢||5,5000"
  ], "Short caps mean old cells."));
  c.push(L("Studying gene function", [
    "Forward and reverse|🔄|<b>Forward genetics</b> starts with a mutant phenotype and searches for the gene responsible. <b>Reverse genetics</b> starts with a known gene and changes it to see what happens to the organism.",
    "Tools|🧰|A <b>knockout</b> disables a gene. A <b>knock-in</b> inserts a new sequence. <b>RNAi</b> or CRISPR can lower or remove a gene's activity. The mouse <b>knockout</b> is an important way to find a gene's job.",
    "Reporters|💡|A <b>reporter gene</b> such as <b>GFP</b> or <b>lacZ</b> is attached to a gene's switch so scientists can see where and when the gene is turned on."
  ], [
    "Starting with a mutant and finding the gene is...|forward genetics|🔄||reverse genetics,gene therapy",
    "Starting with a gene and changing it is...|reverse genetics|🔄||forward genetics,selective breeding",
    "A knockout...|disables a gene|🧰||adds a new copy,copies a gene",
    "A knock-in...|inserts a sequence|🧰||deletes a chromosome,removes RNA",
    "A gene that glows to show activity is a...|reporter gene|💡||tumor suppressor,proto-oncogene",
    "A common glowing reporter protein is...|GFP|🟢||ATP,RISC",
    "Lowering a gene's activity with short RNAs is...|RNAi|🔇||PCR,gel electrophoresis",
    "A reporter gene shows where and when a gene is...|turned on|💡||deleted,inherited",
    "Knockout mice are used to learn a gene's...|function|🐭||age,color only"
  ], "Does it start from the mutant or from the gene?"));
  c.push(L("The omics", [
    "Studying everything|🌐|<b>Genomics</b> studies all of an organism's DNA. <b>Transcriptomics</b> studies all RNA being made (with <b>RNA-seq</b>). <b>Proteomics</b> studies all proteins, often using <b>mass spectrometry</b>. <b>Metabolomics</b> studies small molecules.",
    "Big data|💻|These methods produce huge data sets, so <b>bioinformatics</b> uses computers to store and analyze them. The Human Genome Project finished in 2003 and showed about <b>20,000</b> protein-coding genes.",
    "Systems|🕸️|<b>Systems biology</b> uses the data to model how genes, proteins and molecules interact as networks. Different cells share a genome but have different transcriptomes and proteomes."
  ], [
    "Studying all of an organism's DNA is...|genomics|🧬||proteomics,metabolomics",
    "Studying all the RNA being made is...|transcriptomics|📄||genomics,proteomics",
    "Studying all the proteins is...|proteomics|🧶||genomics,transcriptomics",
    "Studying all small molecules is...|metabolomics|🧪||proteomics,genomics",
    "Using computers to analyze biological data is...|bioinformatics|💻||electrophoresis,cloning",
    "A method for identifying proteins is...|mass spectrometry|⚖️||microscopy only,PCR",
    "The Human Genome Project showed about ... protein-coding genes.|20,000|🔢||200,2 million",
    "Modeling networks of interacting molecules is...|systems biology|🕸️||taxonomy,anatomy",
    "A nerve cell and a muscle cell share the same genome but differ in their...|proteomes|🧶||DNA sequences,chromosome numbers"
  ], "The ending -omics means all of something."));
  c.push(L("What is a species?", [
    "Biological concept|🐴|The <b>biological species concept</b> defines a species as a group of populations that can interbreed and make fertile offspring, but are <b>reproductively isolated</b> from other groups. It does not work for asexual organisms or fossils.",
    "Other ideas|🔍|The <b>morphological concept</b> uses body shape and structure. The <b>phylogenetic concept</b> defines a species as the smallest group that shares an ancestor. The <b>ecological concept</b> uses the niche a population fills.",
    "Why it matters|📏|No single concept fits every organism. Hybrids and ring species show that species boundaries can be blurry, which is what we expect from gradual evolution."
  ], [
    "The concept based on interbreeding is the ... species concept.|biological|🐴||morphological,ecological",
    "The concept based on body form is the ... species concept.|morphological|🔍||biological,phylogenetic",
    "The concept based on shared ancestry is the ... species concept.|phylogenetic|🌳||biological,ecological",
    "The concept based on the niche is the ... species concept.|ecological|🌿||biological,morphological",
    "The biological species concept does not work well for...|asexual organisms|🦠||birds,mammals",
    "The biological concept also does not work for...|fossils|🦴||living birds,fruit flies",
    "Two groups unable to produce fertile offspring are...|reproductively isolated|🚫||the same species,clones",
    "Species boundaries can be blurry because of...|hybrids|🌗||photosynthesis,mitosis"
  ], "Each concept asks a different question about what makes a species."));
  c.push(L("Neutral evolution", [
    "Most changes are neutral|⚪|Motoo Kimura's <b>neutral theory</b> says that most differences in DNA between species are <b>neutral</b>: they do not change fitness, and spread or vanish by <b>genetic drift</b>.",
    "dN and dS|🧮|<b>Synonymous</b> changes keep the same amino acid (dS). <b>Nonsynonymous</b> changes alter it (dN). If <b>dN/dS &lt; 1</b>, selection removes changes (<b>purifying selection</b>). If it is about 1, evolution is neutral. If it is <b>greater than 1</b>, selection favors change.",
    "Conserved genes|🔒|Genes with vital jobs, such as <b>histones</b> and <b>cytochrome c</b>, change very slowly because most changes are harmful. Less important regions change faster."
  ], [
    "The neutral theory was proposed by...|Kimura|🧮||Darwin,Hardy",
    "Most molecular differences are, according to this theory,...|neutral|⚪||harmful,helpful",
    "Neutral changes spread by...|genetic drift|🎲||natural selection only,mating choice",
    "A change that keeps the same amino acid is...|synonymous|🧬||nonsynonymous,nonsense",
    "dN/dS less than 1 suggests...|purifying selection|🔒||positive selection,neutral drift",
    "dN/dS greater than 1 suggests...|positive selection|⬆️||purifying selection,no mutation",
    "dN/dS about 1 suggests...|neutral evolution|⚪||purifying selection,positive selection",
    "Genes with vital jobs change...|slowly|🔒||quickly,never mutate",
    "Histones and cytochrome c are examples of ... genes.|conserved|🔒||fast-changing,viral"
  ], "A ratio under 1 means changes are being removed."));
  c.push(L("Why sex?", [
    "A puzzle|❓|An asexual female can pass all her genes to every offspring. A sexual population wastes some effort on males who produce no offspring directly. This is the <b>two-fold cost of sex</b>. Yet sex is common.",
    "Benefits|🎁|Sex makes new combinations of alleles by recombination. It can bring good mutations together and clear harmful ones. Asexual lines build up harmful mutations in a one-way process called <b>Muller's ratchet</b>.",
    "Red Queen|♟️|The <b>Red Queen hypothesis</b> says that parasites evolve fast, so hosts must keep changing just to survive. Offspring with rare gene combinations escape parasites better. Name from Lewis Carroll: you must run to stay in place."
  ], [
    "Reproduction without a partner is...|asexual|🌱||sexual,meiotic only",
    "The extra cost of making males is the two-fold cost of...|sex|❓||mitosis,mutation",
    "Sex makes new allele combinations through...|recombination|🔀||cloning,budding",
    "Asexual lines gather harmful mutations. This is Muller's...|ratchet|⚙️||clock,box",
    "The hypothesis that hosts evolve to keep up with parasites is the Red Queen...|hypothesis|♟️||pyramid,cycle",
    "The Red Queen idea is named after a character by...|Lewis Carroll|📖||Darwin,Mendel",
    "Offspring with rare combinations may resist...|parasites|🦠||sunlight,gravity",
    "Compared with clones, sexual offspring show more...|variation|🧬||identical genes,cost"
  ], "Variety may help fight parasites."));
  c.push(L("The Nernst equation", [
    "Ion batteries|🔋|Each ion has an <b>equilibrium potential</b>, the voltage at which its diffusion out and the electrical pull in balance. The <b>Nernst equation</b> at body temperature is E ≈ (61 / z) × log([out]/[in]) mV, where z is the ion's charge.",
    "Examples|🧮|For K⁺ (z = +1), a 10-fold higher concentration outside gives E = <b>+61 mV</b>. A 10-fold higher concentration inside gives <b>−61 mV</b>. For a 100-fold difference the voltage doubles because log 100 = 2.",
    "In a neuron|🧠|Neurons have far more K⁺ inside, so E<sub>K</sub> is about <b>−90 mV</b>, and far more Na⁺ outside, so E<sub>Na</sub> is about <b>+60 mV</b>. The resting potential is near −70 mV, close to E<sub>K</sub>, because leaky K⁺ channels dominate."
  ], [
    "For a +1 ion with a 10-fold higher level outside, E is about...|positive 61 mV|🔋||negative 61 mV,positive 10 mV",
    "For a +1 ion with a 10-fold higher level inside, E is about...|negative 61 mV|🔋||positive 61 mV,negative 10 mV",
    "For a +1 ion with a 100-fold higher level outside, E is about...|positive 122 mV|🔋||positive 61 mV,positive 200 mV",
    "For a +1 ion with a 100-fold higher level inside, E is about...|negative 122 mV|🔋||negative 61 mV,positive 122 mV",
    "E<sub>K</sub> in a neuron is about...|−90 mV|🧠||+60 mV,0 mV",
    "E<sub>Na</sub> in a neuron is about...|+60 mV|🧠||−90 mV,−70 mV",
    "The resting potential is close to E<sub>K</sub> because the membrane is most permeable to...|potassium|🧠||sodium,calcium",
    "log 100 equals...|2|🔢||10,100",
    "The voltage where an ion's movement balances out is its...|equilibrium potential|⚖️||threshold,action potential"
  ], "A ten-fold ratio gives about 61 mV."));
  c.push(L("Blood pH balance", [
    "Bicarbonate buffer|🩸|Blood pH stays between about <b>7.35 and 7.45</b>. The main buffer is <b>bicarbonate</b>: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. The enzyme <b>carbonic anhydrase</b> speeds the first step.",
    "Lungs and kidneys|🫁|The <b>lungs</b> change pH within minutes by changing how much CO₂ is breathed out. The <b>kidneys</b> work over hours and days by removing H⁺ and reabsorbing bicarbonate.",
    "Imbalance|⚠️|More CO₂ makes blood more acidic (<b>acidosis</b>). Fast breathing (hyperventilation) removes CO₂ and makes blood more basic (<b>alkalosis</b>). Slow breathing lets CO₂ build up and lowers pH."
  ], [
    "Normal blood pH is about...|7.4|🩸||5.0,9.0",
    "The main buffer in blood is...|bicarbonate|🧪||ammonia,salt only",
    "The enzyme that speeds up CO₂ and water joining is...|carbonic anhydrase|⚗️||catalase,amylase",
    "Which organs change blood pH in minutes?|lungs|🫁||kidneys,liver",
    "Which organs change blood pH over hours and days?|kidneys|🫘||lungs,skin",
    "Extra CO₂ in the blood makes it more...|acidic|🍋||basic,thicker",
    "Hyperventilation tends to make blood more...|basic|🌬️||acidic,sticky",
    "Blood that is too acidic is in...|acidosis|⚠️||alkalosis,stasis",
    "Slow breathing lets CO₂...|build up|🫁||disappear,turn to O₂"
  ], "CO₂ plus water makes an acid."));
  c.push(L("Blood pressure and resistance", [
    "Pressure equation|🩺|<b>Mean arterial pressure = cardiac output × total peripheral resistance</b>. If a person has an output of 5 L/min and a resistance of 20, the pressure is 100 mmHg.",
    "Radius is powerful|🔍|Resistance depends on vessel radius to the <b>fourth power</b>. Halving the radius raises resistance <b>16 times</b>. So small changes in <b>arterioles</b> (vasoconstriction or vasodilation) control pressure and blood flow to organs.",
    "Sensors and slow flow|📉|<b>Baroreceptors</b> in the carotid sinus and aortic arch sense pressure and feed back to the brain. The total cross-section of all <b>capillaries</b> is the largest, so blood moves most slowly there, giving time for exchange."
  ], [
    "Blood pressure equals cardiac output times total peripheral...|resistance|🩺||volume,rate",
    "Output 5 L/min and resistance 20 gives a pressure of...|100|🧮||25,4",
    "Output 4 L/min and resistance 25 gives a pressure of...|100|🧮||29,21",
    "Halving a vessel's radius raises resistance by...|16 times|🔍||2 times,4 times",
    "Which vessels are the main site of resistance control?|arterioles|🔍||capillaries,veins",
    "Vasoconstriction ... pressure.|raises|⬆️||lowers,does not change",
    "Pressure sensors in the carotid sinus are...|baroreceptors|📡||chemoreceptors,nociceptors",
    "Blood moves most slowly in the...|capillaries|🐢||aorta,arteries",
    "Blood moves slowly in capillaries because their total cross-section is...|very large|📉||very small,zero"
  ], "Narrow tubes resist flow far more than you would expect."));
  c.push(L("Control of breathing", [
    "The rhythm|🫁|Breathing is set by groups of neurons in the <b>medulla oblongata</b> of the brainstem, which signal the diaphragm and rib muscles. You can override it for a short time, but not for long.",
    "Chemoreceptors|🧪|<b>Central chemoreceptors</b> in the brain sense the pH of the fluid around the brain, which falls as CO₂ rises. <b>Peripheral chemoreceptors</b> in the carotid and aortic bodies sense CO₂, pH and a big drop in O₂.",
    "Which matters most?|🎯|Under normal conditions, rising <b>CO₂</b> (not low O₂) is the main trigger to breathe faster. <b>Stretch receptors</b> in the lungs prevent over-inflation (the Hering-Breuer reflex)."
  ], [
    "The breathing rhythm is set in the...|medulla oblongata|🧠||cerebellum,thyroid",
    "Receptors that sense CO₂ and pH are...|chemoreceptors|🧪||baroreceptors,photoreceptors",
    "The main trigger to breathe faster is rising...|CO₂|🌬️||O₂,nitrogen",
    "Receptors that prevent over-inflation of the lungs are...|stretch receptors|📏||taste buds,hair cells",
    "Peripheral chemoreceptors are found in the carotid and ... bodies.|aortic|❤️||thyroid,adrenal",
    "More CO₂ makes the fluid around the brain more...|acidic|🍋||basic,solid",
    "During exercise, breathing rate...|increases|🏃||decreases,stops",
    "The muscle that does most of the work of breathing in is the...|diaphragm|🫁||biceps,tongue"
  ], "The body watches CO₂ more closely than O₂."));
  c.push(L("Gut hormones", [
    "Signals in the gut|📮|The digestive tract is also an endocrine organ. <b>Gastrin</b> from the stomach tells it to make acid (HCl). <b>Secretin</b> from the small intestine tells the pancreas to release bicarbonate that neutralizes acidic food.",
    "Fat and protein|🧈|<b>Cholecystokinin (CCK)</b> is released when fats and proteins arrive. It makes the gallbladder contract and the pancreas release digestive enzymes, and it helps us feel full.",
    "Hunger signals|🍽️|<b>Ghrelin</b> from the stomach rises before meals and increases hunger. <b>Leptin</b> from fat cells signals that the body has stored energy and lowers appetite."
  ], [
    "The stomach hormone that stimulates acid release is...|gastrin|🍽️||secretin,leptin",
    "The hormone that tells the pancreas to release bicarbonate is...|secretin|🧂||gastrin,ghrelin",
    "The hormone released when fats arrive is...|CCK|🧈||gastrin,insulin",
    "CCK makes the ... contract.|gallbladder|🟢||heart only,skull",
    "The hormone that increases hunger is...|ghrelin|🍽️||leptin,secretin",
    "The hormone from fat cells that lowers appetite is...|leptin|😋||ghrelin,gastrin",
    "Ghrelin is released from the...|stomach|🍽️||fat cells,pituitary",
    "Secretin is released in the...|small intestine|📮||stomach,mouth"
  ], "Name the hormone by where it comes from and what arrives."));
  c.push(L("Bone and calcium", [
    "Always remodeling|🦴|Bone is living tissue. <b>Osteoblasts</b> build new bone, <b>osteoclasts</b> break it down, and <b>osteocytes</b> are mature cells inside the bone. About 99% of the body's calcium is stored in bone.",
    "Hormones|⚖️|When blood calcium falls, the parathyroid glands release <b>PTH</b>. PTH activates osteoclasts, makes the kidneys keep calcium and helps activate <b>vitamin D</b>. <b>Calcitonin</b> from the thyroid lowers blood calcium when it is too high, but is a minor player in adults.",
    "Strong bones|🏋️|Vitamin D helps the gut absorb calcium. Weight-bearing exercise and enough calcium build strong bone. In <b>osteoporosis</b>, bone loses mass and breaks more easily."
  ], [
    "Cells that build new bone are...|osteoblasts|🦴||osteoclasts,neurons",
    "Cells that break bone down are...|osteoclasts|🦴||osteoblasts,platelets",
    "Mature bone cells inside the bone are...|osteocytes|🦴||osteoclasts,fibroblasts",
    "The hormone that raises blood calcium is...|PTH|⬆️||calcitonin,insulin",
    "The hormone that lowers blood calcium is...|calcitonin|⬇️||PTH,glucagon",
    "PTH comes from the...|parathyroid glands|🦋||adrenal glands,pancreas",
    "The vitamin that helps the gut absorb calcium is...|vitamin D|☀️||vitamin C,vitamin A",
    "A disease with weak, thin bones is...|osteoporosis|🦴||scurvy,anemia",
    "About how much of the body's calcium is in bone?|99%|📊||10%,50%"
  ], "Build with -blasts, break with -clasts."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17]]));
  c.push(MIX("Level 27 Challenge", [c[0], c[1], c[2], c[3], c[4], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15], c[16], c[17], b[3], b[8]]));

  Object.assign(LIFE_LEVELS, { 25: a, 26: b, 27: c });
})();
