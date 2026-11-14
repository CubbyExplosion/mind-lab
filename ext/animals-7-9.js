// ext/animals-7-9.js  Animals & Nature levels 7-9
(() => {
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const T = slides => () => slides.map(s => { const p = s.split("|"); return { h: p[0], v: p[1], t: p[2] }; });
  const L = (title, slides, items, nudge, clue) => {
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
      let h2 = it.c || clue || "";
      if (!h2 || leaks(h2)) h2 = `The answer starts with the letter "${it.a[0].toUpperCase()}" and has ${it.a.replace(/ /g, "").length} letters.`;
      return {
        text: it.q, visual: it.v || undefined, choices: shuf([it.a, ...wr]), answer: it.a,
        hints: [h1, h2, `Example: ${ex.q} The answer is "${ex.a}". Now do yours.`]
      };
    };
    make.teach = T(slides);
    return { title, make };
  };
  const N = (title, slides, make) => { make.teach = T(slides); return { title, make }; };
  const MIX = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder, then the quiz." }, ...ls.slice(0, 4).map(l => l.make.teach()[0])];
    return { title, make };
  };

  // ================= LEVEL 7 =================
  const a = [];
  a.push(L("Kingdoms of life", [
    "Big groups|🌱🍄🦊|Scientists sort living things into big groups called <b>kingdoms</b>. Three you know are <b>animals</b>, <b>plants</b> and <b>fungi</b>.",
    "Plants and fungi|🌳🍄|Plants make their own food from sunlight. Fungi (mushrooms, mold, yeast) take food from dead or rotting things. They are not plants!",
    "Animals|🐟🦋🐘|Animals cannot make their own food. They eat other living things, and most can move around."
  ], [
    "Mushrooms belong to which kingdom?|fungi|🍄||animals,plants",
    "Which kingdom makes food from sunlight?|plants|🌱||animals,fungi",
    "An oak tree belongs to the kingdom of...|plants|🌳||animals,fungi",
    "A jellyfish belongs to the kingdom of...|animals|🪼||plants,fungi",
    "A mushroom takes food from dead things. It is a...|fungus|🍄||animal,plant",
    "The yeast used to make bread rise is a tiny...|fungus|🍞||plant,animal",
    "Which one is NOT an animal?|mushroom|🍄||sponge,coral",
    "Animals cannot make their own food, so they must...|eat other living things|🦊||drink sunlight,stay still"
  ], "Think about how each living thing gets its food.", "Plants make food from light, fungi absorb it from dead things, animals eat."));
  a.push(L("Scientific names", [
    "Two-word names|🔤|Scientists give every kind of animal a two-word Latin name. The first word is the <b>genus</b> and the second is the <b>species</b>.",
    "Examples|🦁🐅|The lion is <i>Panthera leo</i>. The tiger is <i>Panthera tigris</i>. They share the genus <i>Panthera</i> because they are close cousins.",
    "Why Latin?|🌍|Common names change from place to place. A scientific name is the same everywhere, so scientists in every country understand each other. Carl Linnaeus made this system popular."
  ], [
    "Panthera leo is the scientific name of the...|lion|🦁||tiger,leopard",
    "Panthera tigris is the scientific name of the...|tiger|🐅||lion,jaguar",
    "Felis catus is the scientific name of the...|house cat|🐈||lion,wolf",
    "Canis lupus is the scientific name of the...|wolf|🐺||fox,tiger",
    "In a scientific name, which word is the genus?|the first word|🔤||the second word,the last letter",
    "Who made the two-word naming system popular?|Linnaeus|📖||Darwin,Newton",
    "Why do scientists use scientific names?|every scientist can use the same name|🌍||animals like them better,they are always shorter",
    "In Panthera leo, which word is the species?|leo|🦁||Panthera,lion"
  ], "The first word is the genus; the second is the species.", "Say the name out loud and think about which word comes first."));
  a.push(L("Teeth tell diets", [
    "Teeth have jobs|🦷|Different teeth do different jobs. <b>Incisors</b> cut and gnaw, <b>canines</b> are pointed for gripping and tearing, and <b>molars</b> are wide and flat for grinding.",
    "Plant eaters|🐴🐇|Herbivores have flat molars for grinding tough plants. Rabbits and beavers also have big incisors that never stop growing.",
    "Meat eaters|🐺🐅|Carnivores have sharp canines and slicing teeth for tearing meat. Omnivores have a mix of both kinds."
  ], [
    "Flat back teeth for grinding plants suit a...|herbivore|🐄||carnivore,predator",
    "Sharp pointed teeth for tearing meat suit a...|carnivore|🐺||herbivore,decomposer",
    "Humans have both flat and pointed teeth. We are...|omnivores|🦷||herbivores,carnivores",
    "Which animal's front teeth never stop growing?|beaver|🦫||lion,snake",
    "Long pointed teeth for gripping prey are...|canines|🐅||molars,incisors",
    "Rabbits gnaw with strong front teeth called...|incisors|🐇||canines,molars",
    "A horse grinds grass with wide flat...|molars|🐴||canines,fangs",
    "A snake does not chew. It...|swallows food whole|🐍||grinds with molars,uses flat teeth"
  ], "Look at the shape of the teeth: pointed or flat?", "Pointed means cutting and tearing; flat means grinding."));
  a.push(L("Skeletons inside and out", [
    "Skeleton types|🦴🦀|An <b>endoskeleton</b> is inside the body, like yours. An <b>exoskeleton</b> is a hard covering on the outside, like a crab's shell.",
    "Molting|🦞|An exoskeleton does not grow. So crabs, beetles and spiders <b>molt</b>: they crawl out of the old shell and grow a bigger one. The new shell is soft at first.",
    "Arthropods|🕷️🦗|Insects, spiders and crabs are <b>arthropods</b>: animals with an exoskeleton and jointed legs."
  ], [
    "A crab's hard skeleton is on the outside. It is called an...|exoskeleton|🦀||endoskeleton,backbone",
    "A skeleton inside the body is an...|endoskeleton|🐕||exoskeleton,shell",
    "Which animal has an exoskeleton?|beetle|🪲||dog,fish",
    "Why must a crab molt?|to grow bigger|🦀||to cool off,to sleep",
    "Insects, spiders and crabs all have jointed legs. They are...|arthropods|🕷️||mollusks,mammals",
    "Which animal has its skeleton inside its body?|horse|🐎||ant,lobster",
    "A crab that just molted has a new shell that is...|soft|🦞||hard and thick,gone",
    "A fish has a backbone and an inside skeleton, so it is a...|vertebrate|🐟||arthropod,mollusk"
  ], "Is the skeleton inside or outside the body?", "Outside skeletons must be shed so the animal can grow."));
  a.push(L("Feathers and flight", [
    "Kinds of feathers|🪶|<b>Down feathers</b> are fluffy and keep a bird warm. <b>Flight feathers</b> on the wings and tail help it lift and steer.",
    "Built to fly|🦅|Most birds have light, hollow bones and strong chest muscles. Birds spread oil on their feathers by <b>preening</b> to keep them waterproof.",
    "Wings differ|🐦|An eagle has broad wings to soar. A hummingbird beats its wings very fast to hover. An ostrich is too heavy to fly, but it runs fast."
  ], [
    "Fluffy feathers close to the body that keep a bird warm are...|down feathers|🪶||flight feathers,beaks",
    "Birds spread oil on their feathers by...|preening|🐦||molting,migrating",
    "Bird bones are light because they are...|hollow|🦴||solid,full of fat",
    "Which bird can hover in one place?|hummingbird|🐦||ostrich,penguin",
    "Which bird cannot fly?|ostrich|🐦||eagle,owl",
    "Large wide wings help an eagle...|soar high|🦅||dig tunnels,swim underwater",
    "When a bird sheds old feathers and grows new ones it is...|molting|🪶||hibernating,preening",
    "Which feathers help a bird steer and lift in the air?|flight feathers|🪽||down feathers,whiskers"
  ], "Think about what each kind of feather or wing is built to do.", "Fluffy means warmth; long and stiff means flying."));
  a.push(L("Fish bodies", [
    "Breathing|🐟|A fish takes oxygen from the water with its <b>gills</b>. Water goes in the mouth and flows over the gills.",
    "Moving and sensing|🐠|<b>Fins</b> help a fish steer and balance, and the tail fin pushes it forward. The <b>lateral line</b> lets it feel movement in the water. A <b>swim bladder</b> works like a balloon to help it float.",
    "Sharks|🦈|Sharks and rays are fish whose skeleton is made of <b>cartilage</b>, the bendy stuff in your ears, not hard bone."
  ], [
    "A fish takes oxygen from water with its...|gills|🐟||lungs,fins",
    "Which fish parts help it steer and balance?|fins|🐠||scales,gills",
    "The tail fin pushes a fish...|forward|🐟||up in the air,backward only",
    "The lateral line helps a fish feel...|movement in the water|🌊||colors in the sky,sounds in the air",
    "A swim bladder is like a balloon that helps a fish...|float at a depth|🎈||breathe air,chew food",
    "A shark's skeleton is made of bendy...|cartilage|🦈||bone,metal",
    "Which one is a fish, not a mammal?|shark|🦈||dolphin,whale",
    "Overlapping scales on a fish's skin...|protect its body|🐟||help it fly,make sound"
  ], "Think of the body part and the job it does in water.", "Fish live in water, so their parts work with water."));
  a.push(L("Reptile facts", [
    "Scaly skin|🦎🐍|Reptiles have dry skin covered in <b>scales</b>. Snakes and lizards shed their old skin as they grow.",
    "Breathing and eggs|🐢🥚|All reptiles breathe air with <b>lungs</b>. Most lay eggs with leathery shells on land.",
    "Cold-blooded|🌡️|A reptile's body temperature depends on the air around it, so it basks in the sun to warm up. Turtles, snakes, lizards and crocodiles are all reptiles."
  ], [
    "Reptiles have dry skin covered in...|scales|🦎||feathers,fur",
    "Reptiles breathe with...|lungs|🐊||gills,fins",
    "A snake grows by shedding its old...|skin|🐍||fur,feathers",
    "Which one is a reptile?|turtle|🐢||frog,newt",
    "Which one is a reptile?|crocodile|🐊||frog,tadpole",
    "A reptile's body temperature depends on the...|weather around it|🌡️||food it ate,moon",
    "A turtle's shell is part of its...|skeleton|🐢||clothes,nest",
    "Which reptile can drop its tail and grow it back?|lizard|🦎||crocodile,turtle"
  ], "Remember: scales, lungs, and cold-blooded.", "Frogs and newts are amphibians, not reptiles."));
  a.push(L("Insect bodies", [
    "Three parts|🐜|An insect's body has three parts: the <b>head</b>, the <b>thorax</b> (the middle, where legs and wings attach) and the <b>abdomen</b> (the back part).",
    "Legs and feelers|🐞|Insects have six legs and two <b>antennae</b> (feelers). Many have wings too, and big <b>compound eyes</b>.",
    "Breathing|🐝|Insects have no lungs. They breathe through tiny holes in their sides called <b>spiracles</b>."
  ], [
    "How many legs does an insect have?|six|🐜||eight,four",
    "How many body parts does an insect have?|three|🐝||two,four",
    "Which part of an insect holds the legs and wings?|thorax|🐝||head,abdomen",
    "Eyes and antennae are on an insect's...|head|🐞||abdomen,thorax",
    "Insects breathe through tiny holes called...|spiracles|🐜||gills,nostrils",
    "An insect's feelers are called...|antennae|🐛||whiskers,tentacles",
    "Which creature has six legs?|ant|🐜||spider,crab",
    "A spider has eight legs, so it is not an...|insect|🕷️||animal,arachnid"
  ], "Count the legs and body parts. Insects follow a pattern.", "Head, thorax, abdomen: front, middle, back."));
  a.push(L("Social insects", [
    "Living in colonies|🐝🐜|Bees, ants and termites are <b>social insects</b>. They live together in a big family called a <b>colony</b>, and every insect has a job.",
    "A bee hive|🍯|The <b>queen</b> lays eggs. <b>Workers</b> gather nectar, make honey and guard the hive. A bee that finds flowers tells others where they are with a <b>waggle dance</b>.",
    "Ants and termites|🐜|Ants leave a scent trail for friends to follow to food. Termites build huge mounds and eat mostly wood."
  ], [
    "In a honey bee hive, the bee that lays eggs is the...|queen|🐝||drone,worker",
    "Bees show others where flowers are with a...|waggle dance|🐝||loud buzz song,secret code word",
    "Ants find food trails by following a...|scent trail|🐜||light trail,sound trail",
    "A group of social insects living together is a...|colony|🐜||pack,herd",
    "Most of the jobs in a bee hive are done by...|workers|🐝||drones,queens",
    "Bees make honey from flower...|nectar|🍯||leaves,seeds",
    "Termites eat mostly...|wood|🪵||meat,fish",
    "A bee hive, an ant hill and a termite mound are all homes of...|social insects|🏠||birds,mammals"
  ], "Think of an insect family that shares jobs.", "Each member of a colony has a special job."));
  a.push(L("Animal homes", [
    "Homes|🏠|Animals build or find homes for shelter and safety. A <b>burrow</b> is a hole underground. A <b>den</b> is a hidden shelter. A <b>nest</b> holds eggs and chicks.",
    "Builders|🦫🐝|A beaver builds a <b>lodge</b> of sticks and mud and a <b>dam</b> that makes a pond. Bees make a <b>hive</b> out of wax. Spiders spin <b>webs</b> to catch food.",
    "Why homes matter|🪺|A good home protects animals from weather and from predators, and is a safe place for babies."
  ], [
    "A beaver builds a home called a...|lodge|🦫||nest,den",
    "A rabbit lives in an underground home called a...|burrow|🐇||lodge,hive",
    "A bear may sleep through winter in a...|den|🐻||hive,web",
    "Bees live in a...|hive|🐝||den,burrow",
    "Which animal builds a nest?|robin|🐦||fox,trout",
    "A beaver dam makes a...|pond|🦫||desert,cave",
    "Which animal digs a burrow?|groundhog|🦫||eagle,whale",
    "A spider catches insects in a...|web|🕸️||nest,lodge"
  ], "Match the animal to the home it builds or uses.", "Underground, in a tree, in water: where would each live?"));
  a.push(L("Tracks and signs", [
    "Animal detectives|🐾|You can learn about animals without seeing them. Look for <b>tracks</b> (footprints), nests, feathers, chewed nuts and trails.",
    "Reading tracks|🔎|A cat's print has four toes and no claw marks, because cats pull their claws in. A dog's print often shows claws. A deer's print looks like two halves of a heart.",
    "Be a good watcher|🤫|Stay quiet and still, keep your distance, and never touch wild animals. Measure and draw what you find."
  ], [
    "Scientists who follow footprints are reading animal...|tracks|🐾||songs,maps",
    "A round print with four toes and no claw marks is probably from a...|cat|🐱||dog,deer",
    "A print shaped like two halves of a heart is probably from a...|deer|🦌||bear,cat",
    "Chewed tree trunks and a dam are signs of a...|beaver|🦫||owl,fox",
    "A pile of pinecone scales may be left by a...|squirrel|🐿️||whale,frog",
    "Feathers on the ground are a sign of a nearby...|bird|🪶||fish,snail",
    "A good way to watch wild animals is to stay...|quiet and still|🤫||loud and fast,close and touching",
    "Measuring a track can help you tell an animal's...|size|📏||favorite color,name"
  ], "Think about what clues the animal leaves behind.", "Claws, toes and shapes are the clues."));
  a.push(L("Winter changes", [
    "Getting ready|❄️|Animals that stay for winter change. Many grow a thicker coat and eat lots of food to store <b>fat</b>.",
    "Color change|🐇|The snowshoe hare and the arctic fox turn white in winter to blend in with the snow. Squirrels bury nuts to eat later.",
    "Tricks|🐸🐦|Birds fluff their feathers to trap warm air. The wood frog lets parts of its body freeze and thaws out in spring."
  ], [
    "The snowshoe hare turns white in winter to match the...|snow|🐇||leaves,sand",
    "A squirrel buries nuts to eat later. This is...|storing food|🐿️||migrating,molting",
    "In fall many animals grow a thicker coat to stay...|warm|🧥||cool,clean",
    "Birds fluff their feathers in winter to trap...|air|🐦||water,snow",
    "A wood frog survives winter by...|letting parts of its body freeze|🐸||flying south,building a nest",
    "A bear eats a lot in fall to store...|fat|🐻||water,leaves",
    "Which animal changes its coat to white in winter?|arctic fox|🦊||lion,camel",
    "Shorter days and cold tell animals that...|winter is coming|❄️||summer is back,it is bedtime"
  ], "Think about how an animal stays warm or hidden in snow.", "Warm coat, stored food, or camouflage."));
  a.push(L("Pond ecosystem", [
    "Pond life|🐸|A pond is a small ecosystem. <b>Producers</b> like algae and water plants make food from sunlight.",
    "Who eats whom|🐟|Tadpoles and snails eat algae. Small fish and dragonfly nymphs eat insects. A heron eats frogs and fish.",
    "Needs|💧|Pond animals need clean water with enough oxygen dissolved in it. Plants shade the water and give animals a place to hide."
  ], [
    "Tiny green algae in a pond are...|producers|🟢||consumers,decomposers",
    "A heron that eats frogs and fish is a...|consumer|🐦||producer,decomposer",
    "A baby dragonfly lives in the water and is called a...|nymph|🪰||chrysalis,puppy",
    "Tadpoles eat mostly...|algae|🐸||fish,beetles",
    "Lily pads give frogs a place to sit and make...|shade|🪷||noise,heat",
    "Fish need oxygen that is dissolved in the...|water|🐟||mud,sky",
    "Which animal builds a dam to make a pond?|beaver|🦫||minnow,tadpole",
    "Snails help a pond by eating...|dead plants and algae|🐌||fish,sunlight"
  ], "Think about the food chain in a pond.", "Producers make food; consumers eat."));
  a.push(L("Forest community", [
    "Layers|🌳|A forest has layers: the high <b>canopy</b> of leaves, the shorter <b>understory</b>, and the <b>forest floor</b>.",
    "Deciduous forest|🍂|<b>Deciduous</b> trees lose their leaves in fall. Fallen leaves are broken down by <b>decomposers</b> like fungi and worms, which feed the soil.",
    "Forest animals|🦌🦉|Deer eat leaves and twigs, squirrels store acorns, woodpeckers peck holes in trees, and owls hunt at night. Rotting logs are homes for insects."
  ], [
    "A woodpecker uses its beak to...|peck holes in trees|🐦||dig in sand,catch fish",
    "Trees that lose their leaves in fall are...|deciduous|🍂||tropical,coral",
    "Fallen leaves are broken down by...|decomposers|🍄||eagles,deer",
    "Hollow logs make homes for...|insects and small animals|🪵||whales,camels",
    "An owl hunts at night. It is...|nocturnal|🦉||diurnal,aquatic",
    "The top layer of a forest is the...|canopy|🌳||floor,roots",
    "A deer eats leaves and twigs. It is a...|herbivore|🦌||carnivore,predator",
    "Which animal stores acorns for winter?|squirrel|🐿️||salmon,gecko"
  ], "Think about the layers and who lives or works in each.", "Tops of trees, branches, ground."));
  a.push(L("Ocean zones", [
    "Three zones|🌊|The ocean has layers. The <b>sunlight zone</b> is the top layer, where light reaches. Below it is the <b>twilight zone</b> with just a little blue light, and then the dark <b>midnight zone</b>.",
    "Sunlight zone|🐬|Most sea life lives in the sunlight zone, because plants and algae need light to grow. Dolphins, turtles and most fish live here.",
    "Deep sea|🐟✨|In the midnight zone it is dark, cold and the water presses hard. Some animals make their own light. This is called <b>bioluminescence</b>. The anglerfish has a glowing lure."
  ], [
    "The top ocean layer where sunlight reaches is the...|sunlight zone|☀️||midnight zone,twilight zone",
    "The darkest ocean layer is the...|midnight zone|🌑||sunlight zone,sandy zone",
    "Where do most sea plants and algae grow?|sunlight zone|🌿||midnight zone,twilight zone",
    "Some deep-sea animals make their own light. This is called...|bioluminescence|✨||camouflage,migration",
    "The anglerfish uses a glowing lure to...|attract prey|🐟||warm up,sing",
    "Which zone gets only a little blue light?|twilight zone|🌌||sunlight zone,sandy zone",
    "Water pressure in the deep ocean is very...|high|🌊||low,zero",
    "Plants cannot grow in the midnight zone because there is no...|sunlight|🌑||water,salt"
  ], "Think about how much light reaches each layer.", "Top = bright, middle = dim, bottom = dark."));
  a.push(L("Grassland animals", [
    "Wide open land|🌾|Grasslands have few trees and lots of grass. Africa's grasslands are called <b>savannas</b>, and North America's are <b>prairies</b>.",
    "Eaters|🦓🦒|Zebras and bison are <b>grazers</b> that eat grass. Giraffes are <b>browsers</b> that eat leaves from trees. Lions hunt them in groups called prides.",
    "On the move|🌧️|Zebras and wildebeest live in big herds, so many eyes can watch for danger. They travel long distances following the rains that make fresh grass grow."
  ], [
    "Zebras eat grass. Giraffes eat leaves from trees, so they are...|browsers|🦒||grazers,hunters",
    "Which animal lives on the African savanna?|zebra|🦓||polar bear,penguin",
    "The North American prairie is home to...|bison|🦬||camels,penguins",
    "Tall grass helps small prairie animals...|hide|🌾||fly,swim",
    "A group of lions is called a...|pride|🦁||flock,school",
    "Why do zebras live in herds?|more eyes watch for danger|🦓||to be louder,to dig dens",
    "Wildebeest travel long distances following the...|rain|🌧️||tides,moon",
    "Which is the largest land animal?|African elephant|🐘||giraffe,hippo"
  ], "Think about what grassland animals eat and how they stay safe.", "Grass, herds, and open space."));
  a.push(L("Wetlands and rivers", [
    "Wetlands|🌿|A <b>wetland</b> is land that is soaked with water. A <b>marsh</b> has soft grasses. A <b>swamp</b> has trees.",
    "Why wetlands matter|💧|Wetlands soak up flood water like a sponge and clean water by catching dirt. Frogs, herons, alligators and many fish live there.",
    "Rivers|🐟|Salmon are born in rivers, swim to the sea, and later swim back up the river to lay their eggs where they were born."
  ], [
    "Wetlands act like a sponge that soaks up extra...|flood water|🌧️||sand,glass",
    "A marsh is a wetland with mostly soft...|grasses|🌾||trees,cacti",
    "Which animal lives in the Florida Everglades?|alligator|🐊||camel,penguin",
    "Wetlands clean water by catching...|dirt and pollution|🌿||sunlight,ice",
    "Salmon return to rivers to lay their...|eggs|🐟||nets,boats",
    "A heron wades in shallow water to hunt for...|fish and frogs|🐦||seeds,grass",
    "Frogs and dragonflies lay eggs in wetlands because their babies need...|water|🐸||sand,snow",
    "If wetlands are drained, many animals lose...|their homes|🌿||their names,their shadows"
  ], "Think about the water and the animals that need it.", "Soggy land that holds water."));
  a.push(L("How animals move", [
    "Ways to move|🏃|Animals move to find food, escape danger and find homes. They run, hop, swim, fly, slither and crawl.",
    "Built for moving|🦘🐍|A kangaroo has strong back legs for hopping. A snake slithers with no legs. Dolphins push through water with their tails and flippers.",
    "Special movers|🦇🐌|Bats are the only mammals that truly fly. A starfish walks on tiny tube feet. A snail glides on a trail of slime."
  ], [
    "A kangaroo moves by...|hopping|🦘||slithering,flying",
    "A snake moves by...|slithering|🐍||galloping,hopping",
    "A dolphin swims using its tail and...|flippers|🐬||wings,claws",
    "The only mammals that truly fly are...|bats|🦇||squirrels,frogs",
    "A starfish moves with tiny tube...|feet|⭐||wheels,wings",
    "A snail glides on a layer of...|slime|🐌||ice,sand",
    "A cheetah is the fastest animal on...|land|🐆||water,trees",
    "A gecko's sticky toes let it...|walk up walls|🦎||dig deep holes,swim fast"
  ], "Match each body part to the way the animal moves.", "Legs, wings, fins, or none at all."));
  a.push(MIX("Mixed practice", [a[0], a[1], a[2], a[3], a[5], a[6], a[7], a[8], a[10], a[12], a[14], a[15]]));
  a.push(MIX("Level 7 Challenge", [a[1], a[2], a[4], a[5], a[7], a[8], a[9], a[11], a[13], a[14], a[16], a[17], a[0]]));

  // ================= LEVEL 8 =================
  const b = [];
  b.push(L("Cells and organs", [
    "Tiny building blocks|🔬|All animals are made of <b>cells</b>, too small to see without a microscope. Some living things, like an amoeba, are only one cell.",
    "Teamwork|🧬|Cells of the same kind work together as a <b>tissue</b>. Different tissues make an <b>organ</b>, like the heart. Organs work together as an <b>organ system</b>.",
    "Inside a cell|🧫|The <b>nucleus</b> is the control center of a cell. It holds the instructions for how the cell works."
  ], [
    "The tiny building blocks of all living things are...|cells|🔬||stones,wires",
    "Which tool lets us see cells?|microscope|🔬||telescope,thermometer",
    "Many of the same cells working together make a...|tissue|🧬||planet,nest",
    "Different tissues working together make an...|organ|🫀||atom,cell",
    "The heart is an example of an...|organ|🫀||cell,tissue",
    "The control center inside a cell is the...|nucleus|🧬||skin,tail",
    "From smallest to biggest: cell, tissue, organ, then...|organ system|🧬||skin,hair",
    "An amoeba is a living thing made of only one cell. It is...|single-celled|🦠||many-celled,empty"
  ], "Build up from smallest to biggest.", "Cell, then tissue, then organ, then system."));
  b.push(L("Digestion", [
    "The path of food|🍎|Food goes from the mouth down the <b>esophagus</b> to the <b>stomach</b>, then the <b>small intestine</b>, where most nutrients pass into the blood. The <b>large intestine</b> takes back extra water.",
    "Cows|🐄|A cow swallows grass, then brings it back up to chew again. That chewed mouthful is called <b>cud</b>.",
    "Birds|🐔|Birds have no teeth. Food goes to a muscle called the <b>gizzard</b>, which grinds it. Chickens swallow tiny stones to help."
  ], [
    "Food travels from the mouth down the...|esophagus|🍎||windpipe,spine",
    "Most nutrients pass into the blood in the small...|intestine|🍎||mouth,stomach",
    "A cow brings food back up to chew again. This is chewing the...|cud|🐄||gum,seed",
    "Birds grind food in a muscle called the...|gizzard|🐔||bladder,lung",
    "Chickens swallow small stones to help the gizzard...|grind food|🐔||fly higher,lay eggs",
    "The large intestine takes back extra...|water|💧||bones,teeth",
    "Digestion begins in the...|mouth|👄||tail,lungs",
    "Nutrients in food are carried to the body by the...|blood|🩸||hair,bones"
  ], "Follow the food from beginning to end.", "Mouth, esophagus, stomach, intestines."));
  b.push(L("Hearts and blood", [
    "A pump|🫀|The heart is a pump that moves blood around the body. Blood carries <b>oxygen</b> in red blood cells to every part of the body.",
    "Chambers|🐟🐸🐦|A fish heart has two chambers. A frog heart has three. Birds and mammals have hearts with four chambers.",
    "Surprises|🐙|An octopus has three hearts: two for the gills and one for the body."
  ], [
    "How many chambers does a mammal heart have?|four|🫀||two,three",
    "How many chambers does a fish heart have?|two|🐟||four,three",
    "How many chambers does a frog heart have?|three|🐸||two,four",
    "Which animals have a four-chambered heart?|birds and mammals|🐦||fish and frogs,insects and worms",
    "The heart works like a...|pump|🫀||sponge,filter",
    "Red blood cells carry...|oxygen|🩸||sunlight,sound",
    "An octopus has how many hearts?|three|🐙||one,eight",
    "Blood moves oxygen to every part of the...|body|🩸||sky,bed"
  ], "Think about the number of chambers in each animal group.", "Fish fewer, birds and mammals most."));
  b.push(L("Muscles and bones", [
    "Muscle power|💪|Muscles can only <b>pull</b>. They work in pairs: when one tightens, the other relaxes. This lets a leg bend and straighten.",
    "Connections|🦴|<b>Tendons</b> join muscles to bones. <b>Ligaments</b> join bones to other bones at a <b>joint</b>.",
    "Jobs of bones|🧠|Bones hold up the body, protect organs (the skull protects the brain), and make blood cells."
  ], [
    "Tough cords that join muscle to bone are...|tendons|💪||nerves,veins",
    "Muscles can only...|pull|💪||push,float",
    "Two bones meet at a...|joint|🦴||tendon,scale",
    "Muscles work in pairs. When one tightens the other...|relaxes|💪||tightens too,disappears",
    "Bones are held to other bones by...|ligaments|🦴||feathers,whiskers",
    "Flying birds have big chest muscles that move their...|wings|🐦||beaks,toes",
    "A frog's strong back legs help it...|jump|🐸||fly,dig tunnels",
    "The skull protects the...|brain|🧠||tail,hair"
  ], "Think about what each part connects or does.", "Muscle to bone, bone to bone."));
  b.push(L("Animal defenses", [
    "Staying safe|🛡️|Prey animals have many defenses. Some run, some hide, some fight back with spines, shells or smells.",
    "Clever tricks|🦨🐙|A skunk sprays a bad smell. An octopus squirts ink to escape. A pufferfish swallows water and puffs up. An opossum may play dead.",
    "Warning colors|🐸|Bright colors can warn that an animal tastes bad or is poisonous. Predators learn to stay away."
  ], [
    "A hedgehog curls into a ball and shows its...|spines|🦔||wings,gills",
    "A skunk sprays a bad...|smell|🦨||song,light",
    "An octopus squirts dark... to escape|ink|🐙||sand,milk",
    "An opossum may play dead to make a predator lose...|interest|🐾||teeth,tails",
    "A turtle pulls its head and legs into its...|shell|🐢||pocket,nest",
    "A pufferfish makes itself bigger by swallowing...|water|🐡||sand,rocks",
    "Bright warning colors on a poison dart frog mean...|do not eat me|🐸||come play,I am lost",
    "A zebra's best defense is to run fast and stay in a...|herd|🦓||tunnel,tree"
  ], "Which trick matches which animal?", "Spines, smell, ink, shell, speed."));
  b.push(L("Venom or poison?", [
    "Two words|⚠️|A <b>poisonous</b> animal is harmful to eat or touch. A <b>venomous</b> animal injects its toxin with a bite or sting.",
    "A way to remember|🧠|If it is harmful when you eat it, it is poisonous. If it is harmful when it bites or stings, it is venomous.",
    "Staying safe|✋|Never touch wild animals you do not know. Bright warning colors mean stay away. If an animal is hurt, tell an adult."
  ], [
    "An animal that injects toxin by a bite or sting is...|venomous|🐍||poisonous,harmless",
    "An animal that is harmful to eat or touch is...|poisonous|🐸||venomous,sleepy",
    "A rattlesnake bites and injects toxin. It is...|venomous|🐍||poisonous,harmless",
    "A poison dart frog's skin is dangerous to touch. It is...|poisonous|🐸||venomous,soft",
    "A bee uses its stinger to...|inject venom|🐝||drink nectar,build wax",
    "A wild animal with bright warning colors: you should...|stay away|⚠️||touch it,pick it up",
    "A jellyfish stings with tiny...|venom darts|🪼||magnets,bubbles",
    "If you find a hurt wild animal, you should tell...|an adult|🦔||nobody,a stranger"
  ], "Does the toxin go in by eating or by a bite or sting?", "Eating = poison. Biting or stinging = venom."));
  b.push(L("Parasites and partners", [
    "Living together|🤝|When two kinds of living things live together it is called <b>symbiosis</b>. There are three main kinds.",
    "Three kinds|🐠🐋🐕|<b>Mutualism</b>: both gain (clownfish and sea anemone). <b>Commensalism</b>: one gains, the other is not harmed (barnacles on a whale). <b>Parasitism</b>: one gains and the other is harmed (a tick on a dog).",
    "Parasites|🪱|A <b>parasite</b> lives on or in a <b>host</b> and takes food from it. Fleas, ticks and tapeworms are parasites."
  ], [
    "A tick feeds on a dog and harms it. This is...|parasitism|🐕||mutualism,commensalism",
    "A clownfish and sea anemone help each other. This is...|mutualism|🐠||parasitism,commensalism",
    "Barnacles ride on a whale and do not harm it. This is...|commensalism|🐋||parasitism,mutualism",
    "In parasitism, the animal that is harmed is the...|host|🐕||parasite,predator",
    "A flea is a...|parasite|🪲||host,producer",
    "Oxpeckers eat ticks off a zebra. The bird gets food and the zebra gets cleaned. This is...|mutualism|🦓||parasitism,commensalism",
    "A tapeworm lives in an animal's gut and steals food. It is a...|parasite|🪱||pollinator,predator",
    "Which one is NOT a parasite?|ladybug|🐞||tick,flea"
  ], "Ask: who gains and who is harmed?", "Both gain, one gains, or one is harmed."));
  b.push(L("Pollution and wildlife", [
    "Trash and animals|🐢|Plastic in the ocean can harm animals. Sea turtles mistake plastic bags for jellyfish. Plastic breaks into tiny bits called <b>microplastics</b>.",
    "Other kinds|🛢️💡|Oil spills coat feathers so birds cannot keep warm. Bright lights confuse baby sea turtles heading to the sea. Fertilizer washing into water can cause too much algae.",
    "What helps|♻️|We can reduce, reuse and recycle, pick up litter and use fewer single-use plastics. Less trash means a safer home for wildlife."
  ], [
    "Sea turtles can mistake plastic bags for...|jellyfish|🐢||rocks,sand",
    "Bright lights at night can confuse baby sea turtles heading to the...|sea|🐢||forest,desert",
    "Oil on a bird's feathers stops them from keeping...|warm|🐦||growing,counting",
    "Fertilizer washing into water can cause too much...|algae|🟢||ice,sand",
    "Recycling helps wildlife because it makes less...|trash|♻️||oxygen,rain",
    "Plastic breaks into tiny pieces called...|microplastics|🧴||micro-plants,crystals",
    "A good way to help the ocean is to use fewer single-use...|plastics|🛍️||shells,pebbles",
    "Picking up litter helps animals avoid...|eating or getting stuck in trash|🦆||finding food,flying"
  ], "Think about how trash or chemicals can harm animals.", "Plastic, oil, lights and fertilizer."));
  b.push(L("Protecting wildlife", [
    "Safe places|🏞️|A <b>national park</b> or wildlife refuge is land set aside to protect nature. <b>Rangers</b> look after the animals and the land.",
    "Laws and help|⚖️|A law like the Endangered Species Act protects animals that might die out. Zoos and sanctuaries can help by caring for and breeding rare animals.",
    "What you can do|🌼|Plant native flowers, keep wild animals at a distance, and leave no trace when you visit nature. A wildlife bridge over a road helps animals cross safely."
  ], [
    "A large area of land set aside to protect nature is a...|national park|🏞️||parking lot,shopping mall",
    "People who protect parks and animals are called...|rangers|🌲||bakers,pilots",
    "Zoos and sanctuaries can help save rare animals by caring for and...|breeding them|🦁||selling them,hiding them",
    "The Endangered Species Act protects animals that might...|die out|🐼||grow fast,fly",
    "A wildlife ... over a road helps animals cross safely|bridge|🌉||billboard,tower",
    "When you visit nature, 'leave no...'|trace|🥾||toys,gifts",
    "Keeping wild animals at a distance keeps them and you...|safe|🦌||sleepy,loud",
    "Planting native flowers helps bees and butterflies find...|food|🌼||homework,maps"
  ], "Think about people and places that keep animals safe.", "Parks, rangers, laws, and small helpers."));
  b.push(L("Fossils", [
    "Clues from long ago|🦴|A <b>fossil</b> is the remains or marks of a living thing from long ago. A scientist who studies fossils is a <b>paleontologist</b>.",
    "How they form|🪨|When an animal is quickly buried in mud and sand, its hard parts like bones and shells can slowly turn to stone. Footprints can become <b>trace fossils</b>.",
    "Layers|⛰️|Fossils are found in layers of rock. In undisturbed layers, the oldest fossils are at the bottom."
  ], [
    "A scientist who studies fossils is a...|paleontologist|🦴||astronomer,chef",
    "Fossils are usually found in layers of...|rock|🪨||ice,glass",
    "A fossil footprint is called a...|trace fossil|🐾||body fossil,fresh print",
    "Fossils form when animals are quickly buried by...|mud and sand|🏜️||fire,paper",
    "In undisturbed rock layers, the oldest fossils are found at the...|bottom|⛰️||top,middle",
    "A fossil is the remains or marks of a living thing from...|long ago|🦕||yesterday,tomorrow",
    "Hard parts like bones and shells become fossils more often than...|soft parts|🦴||rocks,metal",
    "Sea shell fossils found on a mountain show the land was once under the...|ocean|🐚||city,ice"
  ], "Think about what survives for millions of years.", "Hard parts, buried fast, turned to stone."));
  b.push(L("Dinosaurs", [
    "The Mesozoic Era|🦖|Dinosaurs lived in the <b>Mesozoic Era</b>. It was split into the Triassic, Jurassic and Cretaceous periods. They died out about 66 million years ago.",
    "Kinds|🦕|<i>Tyrannosaurus rex</i> ate meat. <i>Triceratops</i> and <i>Stegosaurus</i> ate plants. Dinosaurs were reptiles, but not every old reptile or mammal was a dinosaur.",
    "Living dinosaurs|🐦|Scientists think birds are living relatives of dinosaurs! One idea for why most dinosaurs died out is a huge space rock hitting Earth."
  ], [
    "Birds are the living relatives of...|dinosaurs|🐦||fish,whales",
    "The time of the dinosaurs is called the...|Mesozoic Era|🦖||Space Age,Stone Age",
    "T. rex ate meat. It was a...|carnivore|🦖||herbivore,decomposer",
    "Triceratops ate plants. It was a...|herbivore|🦕||carnivore,predator",
    "Dinosaurs died out about how long ago?|66 million years|☄️||66 years,6 thousand years",
    "A giant space rock hitting Earth is one idea for why most dinosaurs...|died out|☄️||woke up,got bigger",
    "Which was NOT a dinosaur?|woolly mammoth|🦣||Stegosaurus,Triceratops",
    "Which animal group are the living cousins of dinosaurs?|birds|🦖||frogs,bats"
  ], "Think about when dinosaurs lived and what they ate.", "Meat eaters and plant eaters, and birds today."));
  b.push(L("Darwin and finches", [
    "Darwin's trip|⛵|Charles Darwin sailed on the ship HMS <i>Beagle</i> and visited the Galapagos Islands. He saw finches there with different beak shapes.",
    "Beaks and food|🐦🌰|Finches with thick strong beaks cracked hard seeds. Finches with thin beaks caught insects. Each beak fit the food on its island.",
    "Natural selection|🌿|Animals with helpful traits survive and have more babies, so those traits are passed on. Over a very long time groups slowly change. This is <b>evolution</b>."
  ], [
    "Charles Darwin studied finches on the...|Galapagos Islands|🏝️||Sahara Desert,Arctic",
    "Finches with different beak shapes ate different...|foods|🐦||songs,colors",
    "Birds with strong thick beaks could crack hard...|seeds|🌰||clouds,fish",
    "Helpful traits are passed on to an animal's...|young|🐣||enemies,neighbors",
    "Darwin's idea of nature favoring helpful traits is called natural...|selection|🌿||weather,magic",
    "Over a very long time, groups of animals can slowly change. This is...|evolution|🦎||hibernation,migration",
    "A trait that helps an animal survive is an...|adaptation|🐦||accident,illness",
    "Darwin traveled on a ship called the...|Beagle|⛵||Titanic,Mayflower"
  ], "Link beak shape to the food it eats.", "Traits that help survival get passed on."));
  b.push(L("Why animals group together", [
    "Safety in numbers|🦓|Many animals live in groups. In a herd, many eyes help spot danger. A school of fish makes it hard for a predator to pick one fish.",
    "Hunting and raising young|🐺|Wolves live in packs and hunt together, so they can catch bigger prey. They also help raise the young. Meerkats take turns standing guard.",
    "Saving energy|🪿|Geese fly in a V shape. The birds behind use less energy in the air flow made by those in front."
  ], [
    "Why do many zebras stay together in a herd?|more eyes spot danger|🦓||to be lonely,to dig",
    "Geese fly in a V shape to save...|energy|🪿||money,paint",
    "Wolves hunt together so they can catch...|bigger prey|🐺||tiny seeds,sand",
    "A meerkat that watches for danger while others eat is a...|sentry|🐾||chef,baby",
    "A school of fish makes it hard for a predator to pick out...|one fish|🐟||the water,the sun",
    "A group of wolves is a...|pack|🐺||school,flock",
    "A group of fish swimming together is a...|school|🐟||pack,pride",
    "In a herd, the babies are often kept in the middle to be...|protected|🐘||ignored,lost"
  ], "Think about the safety or hunting advantage of a group.", "More eyes, more help, less risk."));
  b.push(L("Sleep and rest", [
    "Every animal rests|😴|Animals need rest to save energy and heal. How they sleep depends on how they live.",
    "Odd sleepers|🐬🦇|Dolphins sleep with half of the brain at a time so they can keep surfacing to breathe. Bats sleep hanging upside down. Horses can doze while standing.",
    "Long and short|🐨🦒|Koalas sleep about 20 hours a day. Giraffes sleep very little, in short naps. Nocturnal animals sleep during the day."
  ], [
    "A koala sleeps about how many hours a day?|20 hours|🐨||4 hours,8 hours",
    "Dolphins rest by letting one half of the brain...|sleep|🐬||grow,count",
    "A bat sleeps hanging...|upside down|🦇||underwater,in a nest",
    "Horses can doze while...|standing up|🐴||swimming,flying",
    "Giraffes get their sleep mostly in...|short naps|🦒||one long winter nap,a lazy week",
    "A sleeping bird's feet lock on the branch so it does not...|fall|🐦||sing,melt",
    "A nocturnal animal sleeps mostly during the...|day|🦉||night,summer",
    "Resting helps animals save...|energy|😴||paint,soil"
  ], "Think about how and when each animal sleeps.", "Different animals have different ways to rest."));
  // speed math
  const SP = [["cheetah", "🐆", 100], ["horse", "🐴", 60], ["zebra", "🦓", 60], ["rabbit", "🐇", 50], ["giraffe", "🦒", 50], ["elephant", "🐘", 40]];
  b.push(N("Animal speed math", [
    "Speed|🏃|Speed tells how far an animal goes in one hour. A cheetah can run about 100 kilometers (km) in an hour in a short burst.",
    "Distance|✖️|distance = speed x time. If an animal goes 20 km each hour, in 3 hours it goes 20 + 20 + 20 = 60 km.",
    "Comparing|🆚|To find how much faster one animal is, subtract the smaller speed from the bigger one. Half an hour is half the distance."
  ], () => {
    const t = ri(0, 3), x = pick(SP);
    if (t === 0) {
      const h = ri(2, 5);
      return { text: `A ${x[0]} can run about ${x[2]} kilometers in 1 hour (in a short burst). Pretend it keeps that speed for ${h} hours. How many kilometers does it go?`, visual: x[1], answer: x[2] * h,
        hints: ["Distance = speed x time. How far does it go in one hour?", "Add the one-hour distance again for each hour, or multiply.", "Example: a horse that goes 20 km each hour for 3 hours goes 20 + 20 + 20 = 60 km. Now do yours."] };
    }
    let y = pick(SP.filter(s => s[2] !== x[2]));
    if (t === 1) {
      const hi = x[2] > y[2] ? x : y, lo = hi === x ? y : x;
      return { text: `A ${hi[0]} runs about ${hi[2]} km per hour. A ${lo[0]} runs about ${lo[2]} km per hour. How many km per hour faster is the ${hi[0]}?`, visual: hi[1] + lo[1], answer: hi[2] - lo[2],
        hints: ["Faster means a bigger number. Take the smaller speed away from the bigger speed.", "Subtract: the bigger speed minus the smaller speed.", "Example: 95 km per hour and 70 km per hour: 95 - 70 = 25. Now do yours."] };
    }
    if (t === 2) {
      return { text: `A ${x[0]} runs about ${x[2]} km in 1 hour. How many km does it go in half an hour?`, visual: x[1], answer: x[2] / 2,
        hints: ["Half an hour is half of one hour. Half the time means half the distance.", "Split the one-hour distance into two equal parts.", "Example: an animal that goes 30 km in one hour goes 15 km in half an hour. Now do yours."] };
    }
    return { text: `A ${x[0]} runs about ${x[2]} km per hour and a ${y[0]} runs about ${y[2]} km per hour. How many km do they go altogether if each runs for 2 hours?`, visual: x[1] + y[1], answer: 2 * (x[2] + y[2]),
      hints: ["Find how far each animal goes in 2 hours first.", "Then add the two distances together.", "Example: 30 km per hour and 20 km per hour for 2 hours: 60 and 40, then 60 + 40 = 100. Now do yours."] };
  }));
  // reading data
  const DA = [["elephants", "🐘"], ["lions", "🦁"], ["zebras", "🦓"], ["monkeys", "🐒"], ["parrots", "🦜"], ["giraffes", "🦒"]];
  b.push(N("Reading animal counts", [
    "Rows of pictures|📊|A picture graph uses one little picture for each animal. Count the pictures in a row to find how many.",
    "Most and fewest|🔢|The longest row is the biggest number. The shortest row is the smallest number. Count carefully!",
    "Add and subtract|➕|To find the total, add all the rows. To find how many more, subtract the smaller row from the bigger one."
  ], () => {
    const cs = shuf([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 4), an = shuf(DA).slice(0, 4);
    const rows = an.map((d, i) => ({ n: d[0], e: d[1], c: cs[i] }));
    const vis = `<div style="text-align:left;line-height:1.6">` + rows.map(r => `${r.e} ${r.n}: ${r.e.repeat(r.c)}`).join("<br>") + `</div>`;
    const base = "Each picture is one animal at the zoo. ";
    const t = ri(0, 4);
    const sorted = [...rows].sort((p, q) => p.c - q.c);
    if (t === 0) return { text: base + "Which animal has the most?", visual: vis, choices: shuf(rows.map(r => r.n)), answer: sorted[3].n,
      hints: ["Look for the longest row of pictures.", "Count each row. The biggest count wins.", "Example: rows of 3, 7 and 5. The 7 row is the longest. Now do yours."] };
    if (t === 1) return { text: base + "Which animal has the fewest?", visual: vis, choices: shuf(rows.map(r => r.n)), answer: sorted[0].n,
      hints: ["Look for the shortest row of pictures.", "Count each row. The smallest count wins.", "Example: rows of 3, 7 and 5. The 3 row is the shortest. Now do yours."] };
    if (t === 2) {
      const tot = cs.reduce((p, q) => p + q, 0);
      return { text: base + "How many animals are there altogether?", visual: vis, answer: tot,
        hints: ["Count each row first. Then put all the numbers together.", "Add the four row counts.", "Example: rows of 2, 3 and 4: 2 + 3 + 4 = 9. Now do yours."] };
    }
    const [p, q] = shuf(rows).slice(0, 2), hi = p.c > q.c ? p : q, lo = hi === p ? q : p;
    if (t === 3) {
      let e1, e2; do { e1 = ri(5, 12); e2 = ri(1, e1 - 1); } while (e1 - e2 === hi.c - lo.c);
      return { text: base + `How many more ${hi.n} than ${lo.n} are there?`, visual: vis, answer: hi.c - lo.c,
        hints: ["Find the two rows and count each one.", "Subtract the smaller count from the bigger count.", `Example: rows of ${e1} and ${e2}: ${e1} - ${e2} = ${e1 - e2}. Now do yours.`] };
    }
    return { text: base + `How many ${hi.n} and ${lo.n} are there together?`, visual: vis, answer: hi.c + lo.c,
      hints: ["Find the two rows you need and count each one.", "Add those two counts. Ignore the other rows.", "Example: rows of 4 and 6 together: 4 + 6 = 10. Now do yours."] };
  }));
  b.push(L("Island animals", [
    "Islands|🏝️|An island is surrounded by water, so its animals live apart from the rest of the world. Many island animals live nowhere else. We call them <b>endemic</b>.",
    "Famous islands|🐒🐢|Lemurs live in Madagascar. Giant tortoises are famous on the Galapagos Islands. The Komodo dragon lives in Indonesia. The kiwi lives in New Zealand.",
    "Danger|🦤|On islands with few predators, some birds lost the ability to fly. When rats and cats arrive on ships, these birds can be in danger. The dodo of Mauritius is now extinct."
  ], [
    "Lemurs live in the wild on the island of...|Madagascar|🐒||Iceland,Cuba",
    "The kiwi is a flightless bird from...|New Zealand|🐦||Canada,Egypt",
    "Giant tortoises are famous on the...|Galapagos Islands|🐢||Greenland,Iceland",
    "The Komodo dragon, the largest lizard, lives in...|Indonesia|🦎||Norway,Peru",
    "The dodo bird of Mauritius is now...|extinct|🪶||common,tame",
    "Many island birds lost the ability to fly because there were few...|predators|🏝️||seeds,rocks",
    "Animals that live only in one place are called...|endemic|🗺️||common,migrant",
    "Which newcomers often hurt island birds' eggs?|rats|🐀||whales,butterflies"
  ], "Think about the island each animal comes from.", "Remote places have special animals."));
  b.push(L("Animals of the continents", [
    "Where in the world?|🌍|Different continents have different wild animals. Africa has lions, elephants and zebras. Australia has kangaroos and koalas.",
    "More homes|🐼🐧|Giant pandas live in China, in Asia. Penguins such as the emperor penguin live in Antarctica. Jaguars and toucans live in the rainforests of South America.",
    "Cold places|🐻‍❄️|Polar bears live near the Arctic. Antarctica is the coldest continent on Earth."
  ], [
    "Kangaroos live in the wild in...|Australia|🦘||Europe,Antarctica",
    "Emperor penguins live in the wild in...|Antarctica|🐧||Alaska,Greenland",
    "Wild lions live mainly in...|Africa|🦁||South America,Europe",
    "Giant pandas live in the wild in...|China|🐼||Brazil,Kenya",
    "Jaguars and toucans live in the rainforests of...|South America|🦜||Europe,Antarctica",
    "Polar bears live near the...|Arctic|🐻‍❄️||Antarctic,Sahara",
    "Which continent is the coldest?|Antarctica|🧊||Africa,Asia",
    "Wild tigers are found in...|Asia|🐅||Australia,Europe"
  ], "Picture the world map and the animal's home.", "Match the animal to its continent."));
  b.push(MIX("Mixed practice", [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[9], b[10], b[11], b[12], b[16], b[17]]));
  b.push(MIX("Level 8 Challenge", [b[0], b[2], b[4], b[6], b[7], b[8], b[9], b[10], b[11], b[13], b[14], b[15], b[16], b[17], b[12]]));

  // ================= LEVEL 9 =================
  const c = [];
  c.push(L("Seven levels of classification", [
    "The seven levels|📚|Scientists sort animals into groups inside groups: <b>kingdom, phylum, class, order, family, genus, species</b>. Kingdom is the biggest group and species is the smallest.",
    "Remember the order|👑|A silly sentence can help: King Philip Came Over For Good Soup. Each first letter matches a level.",
    "Example|🐺|A wolf is in the kingdom Animalia, the class Mammalia, and the genus <i>Canis</i>. Dogs share the genus <i>Canis</i> too, so dogs and wolves are close cousins."
  ], [
    "What is the biggest group in classification?|kingdom|👑||species,genus",
    "What is the smallest group of the seven levels?|species|🐾||phylum,class",
    "Which level comes right after kingdom?|phylum|📚||class,order",
    "Which level comes right before species?|genus|📚||family,order",
    "Mammals, birds and reptiles are each a...|class|🐕||kingdom,species",
    "Dogs and wolves share a genus called Canis. Genus is a...|level of classification|🐺||kind of food,type of home",
    "How many levels are in the classification list here?|seven|📚||five,ten",
    "Animals that can breed together and have young like themselves belong to one...|species|🐾||kingdom,phylum"
  ], "Remember: from biggest group to smallest group.", "King Philip Came Over For Good Soup."));
  c.push(L("Arthropod classes", [
    "Jointed-leg animals|🦗|Arthropods are the biggest group of animals. They have an exoskeleton and jointed legs. There are four main classes.",
    "Four classes|🕷️🦀|<b>Insects</b> have six legs and three body parts. <b>Arachnids</b> (spiders, scorpions, ticks) have eight legs. <b>Crustaceans</b> (crabs, lobsters, shrimp) mostly live in water. <b>Myriapods</b> are centipedes and millipedes.",
    "Not alike|🔎|A spider is not an insect, and a crab is not a spider. Count the legs and look at the body parts to tell them apart."
  ], [
    "A spider has eight legs and two body parts. It is an...|arachnid|🕷️||insect,crustacean",
    "A crab is a...|crustacean|🦀||arachnid,insect",
    "Centipedes and millipedes are...|myriapods|🐛||insects,arachnids",
    "Which animal is an arachnid?|scorpion|🦂||beetle,shrimp",
    "Which animal is a crustacean?|lobster|🦞||ant,tick",
    "Which animal is an insect?|grasshopper|🦗||spider,crab",
    "Most crustaceans live in...|water|🦐||deserts,treetops",
    "How many legs do arachnids have?|eight|🕸️||six,ten"
  ], "Count the legs and think about where it lives.", "Six = insect, eight = arachnid, water = crustacean."));
  c.push(L("Mollusks", [
    "Soft bodies|🐚|<b>Mollusks</b> have soft bodies with no backbone. Many have a hard shell and a strong muscle called the foot that moves them.",
    "Three kinds|🐌🦪🐙|<b>Gastropods</b> (snails and slugs) have one shell or none. <b>Bivalves</b> (clams, oysters, mussels) have two hinged shells. <b>Cephalopods</b> (octopus, squid) have arms and are clever.",
    "Fact|🐌|A slug is like a snail without its shell."
  ], [
    "A clam has two hinged shells. It is a...|bivalve|🦪||gastropod,cephalopod",
    "A garden snail is a...|gastropod|🐌||bivalve,cephalopod",
    "Octopuses and squid are...|cephalopods|🐙||bivalves,gastropods",
    "Mollusks have a soft body and no...|backbone|🐚||heart,eyes",
    "Many mollusks make a hard...|shell|🐚||fur,feather",
    "A mollusk's strong muscle used to move is its...|foot|🐌||fin,wing",
    "Which of these is a mollusk?|oyster|🦪||crab,starfish",
    "A slug is like a snail without its...|shell|🐌||eyes,mouth"
  ], "Think about soft bodies and the shell shapes.", "One shell, two shells, or arms."));
  c.push(L("Sponges, jellies and starfish", [
    "Simple sea animals|🧽|<b>Sponges</b> stay in one place and filter bits of food from water. They have no organs.",
    "Stingers|🪼🪸|<b>Cnidarians</b> include jellyfish, sea anemones and corals. They have stinging cells. Coral reefs are built by tiny animals called <b>coral polyps</b>.",
    "Spiny skin|⭐|<b>Echinoderms</b> include starfish and sea urchins. They have spiny skin, move on tube feet and some can regrow lost arms."
  ], [
    "Jellyfish, corals and sea anemones sting. They are...|cnidarians|🪼||mollusks,echinoderms",
    "Starfish and sea urchins have spiny skin. They are...|echinoderms|⭐||cnidarians,sponges",
    "A sponge filters bits of food from...|water|🧽||air,soil",
    "A starfish can regrow a lost...|arm|⭐||shell,tail",
    "Coral reefs are built by tiny animals called...|coral polyps|🪸||sea stars,sponges",
    "Which animal has a body shaped like a wheel, arranged around the middle?|starfish|⭐||dog,fish",
    "Which animal usually stays in one place all its adult life?|sponge|🧽||dolphin,crab",
    "Starfish move on tiny tube...|feet|⭐||wheels,fins"
  ], "Think about stinging, spiny, or staying still.", "Sting = cnidarian, spiny = echinoderm."));
  c.push(L("Mammal groups", [
    "Orders of mammals|🐾|Mammals are sorted into groups called orders. <b>Rodents</b> have gnawing teeth. <b>Primates</b> have grasping hands. <b>Carnivorans</b> eat mostly meat.",
    "More groups|🦌🐋🦇|<b>Ungulates</b> are hoofed mammals like deer, horses and giraffes. <b>Cetaceans</b> are whales and dolphins. <b>Bats</b> are the only mammals that truly fly.",
    "Biggest group|🐀|Rodents are the largest group of mammals by number of species."
  ], [
    "Mice, squirrels and beavers are...|rodents|🐭||primates,ungulates",
    "Monkeys and apes belong to the...|primates|🐒||rodents,bats",
    "Hoofed mammals such as deer and horses are...|ungulates|🦌||primates,cetaceans",
    "Whales and dolphins are...|cetaceans|🐋||ungulates,rodents",
    "The only mammals that can truly fly are...|bats|🦇||squirrels,primates",
    "Lions, wolves and bears are carnivorans, which mostly eat...|meat|🐻||plants,leaves",
    "Which group has the most species of mammals?|rodents|🐀||primates,cetaceans",
    "Which animal is an ungulate?|giraffe|🦒||bat,otter"
  ], "Match the group name to its special trait.", "Gnawers, grabbers, hoofed, ocean swimmers, fliers."));
  c.push(L("Bird groups", [
    "Types of birds|🐦|Birds are sorted by how they live. <b>Raptors</b> (hawks, eagles, owls) have hooked beaks and sharp talons. <b>Waterfowl</b> (ducks, geese, swans) have webbed feet.",
    "More|🐧|<b>Songbirds</b> (robins, sparrows) have feet for perching and sing complex songs. <b>Flightless birds</b> (ostrich, emu, kiwi, penguin) have wings that cannot lift them.",
    "Match the feet|🦆|Webbed feet paddle, talons grab prey, perching feet grip branches."
  ], [
    "Birds of prey with sharp talons and hooked beaks are...|raptors|🦅||songbirds,waterfowl",
    "Ducks, geese and swans are...|waterfowl|🦆||raptors,flightless birds",
    "Robins and sparrows are...|songbirds|🐦||raptors,waterfowl",
    "Ostriches and emus are...|flightless birds|🐦||raptors,songbirds",
    "Which one is a raptor?|owl|🦉||duck,robin",
    "Which bird is a flightless swimmer?|penguin|🐧||eagle,parrot",
    "Waterfowl have feet that are...|webbed|🦆||hooked,furry",
    "Songbirds have feet that are good for...|perching|🐦||swimming,digging"
  ], "Think about beaks and feet.", "Hooked beak, webbed feet, perching feet, no flight."));
  c.push(L("Reptiles and amphibians", [
    "Reptile groups|🐊🐢|Reptiles include <b>turtles</b>, <b>lizards and snakes</b>, and <b>crocodilians</b> (alligators and crocodiles). They have dry scaly skin and lay eggs on land.",
    "Amphibians|🐸|<b>Amphibians</b> are frogs, toads and salamanders. They start life in water breathing with gills. Adults have thin skin that must stay moist, and their jelly-like eggs have no shell.",
    "Tell apart|🔎|Dry and scaly = reptile. Moist and smooth = amphibian."
  ], [
    "Alligators and crocodiles belong to the group of...|crocodilians|🐊||turtles,snakes",
    "Frogs and toads are...|amphibians|🐸||reptiles,fish",
    "Tadpoles breathe with...|gills|🐸||wings,fur",
    "Amphibians have thin skin that must stay...|moist|🐸||dry,scaly",
    "Which is an amphibian?|salamander|🌧️||lizard,gecko",
    "A reptile that has a shell is a...|turtle|🐢||newt,gecko",
    "Which group lays soft eggs without shells in water?|amphibians|🥚||reptiles,birds",
    "Lizards and snakes both have...|scales|🐍||feathers,fur"
  ], "Dry scales or moist skin?", "Reptiles = dry and scaly."));
  c.push(L("What if one disappears?", [
    "Everything is linked|🕸️|In a food web, animals and plants depend on each other. Taking one away can change many others, like dominoes.",
    "Examples|🦦🐺|Sea otters eat sea urchins. Without otters, urchins can eat up the kelp forests. When wolves returned to Yellowstone, elk numbers dropped and willow trees grew back.",
    "Strong webs|🐝|A food web is stronger than one food chain because animals can eat different foods. Losing bees would hurt plants that need to be pollinated."
  ], [
    "Sea otters eat sea urchins. Without otters, urchins can eat too much...|kelp|🦦||sand,rocks",
    "After wolves returned to Yellowstone, willow trees were able to...|grow back|🌳||vanish,turn blue",
    "If all the bees vanished, many plants could not be...|pollinated|🐝||painted,washed",
    "In a food web, if frogs vanish, the insects they eat could...|increase|🐸||vanish,turn blue",
    "If the grass dies from drought, animals that eat grass will have...|less food|🌾||more food,extra shade",
    "A food web is stronger than a single food chain because animals can eat...|different foods|🕸️||the same food,nothing",
    "Removing a top predator can cause too many...|prey animals|🦌||rocks,clouds",
    "If decomposers vanished, dead plants and animals would...|pile up|🍂||disappear faster,glow"
  ], "Follow what happens one step at a time.", "If one link changes, the next link changes."));
  c.push(L("Trophic levels", [
    "Levels of eating|🔺|Food energy moves up <b>trophic levels</b>. Level 1 is the <b>producers</b> (plants, algae). <b>Primary consumers</b> eat producers. <b>Secondary consumers</b> eat primary consumers.",
    "Example|🌿🐇🦊|In grass, rabbit, fox: grass is the producer, rabbit is the primary consumer and fox is the secondary consumer. An animal at the top with no natural predators is an <b>apex predator</b>.",
    "Energy loss|⚡|Only about 10 percent of the energy moves up each step, so there are fewer animals at the top."
  ], [
    "In grass, rabbit, fox: the rabbit is a...|primary consumer|🐇||secondary consumer,producer",
    "In grass, rabbit, fox: the fox is a...|secondary consumer|🦊||primary consumer,producer",
    "An animal at the top with no natural predators is an...|apex predator|🦈||producer,decomposer",
    "About how much energy moves up to the next level?|10 percent|⚡||90 percent,all of it",
    "Because energy is lost at each step, there are fewest animals at the...|top|🔺||bottom,middle",
    "Phytoplankton in the ocean are...|producers|🟢||consumers,decomposers",
    "Zooplankton eat phytoplankton, so they are...|primary consumers|🦐||producers,apex predators",
    "The original energy source for almost all food webs is the...|Sun|☀️||tides,wind"
  ], "Count steps up from the plants.", "Plants first, plant eaters second, meat eaters next."));
  c.push(L("Biodiversity", [
    "Variety of life|🌎|<b>Biodiversity</b> means the variety of living things in a place. Tropical rainforests and coral reefs have the most.",
    "Why it matters|🪸|A place with many kinds of living things can handle change better. Coral reefs cover a tiny part of the sea but host about a quarter of its species. Most animal species are insects.",
    "Losing it|🌳|When habitats are cut down or polluted, species can be lost forever. Protecting whole habitats protects many species at once."
  ], [
    "The variety of living things in a place is called...|biodiversity|🌎||biography,biology",
    "Which place has the most kinds of species?|tropical rainforest|🌴||tundra,open ocean",
    "Most animal species on Earth are...|insects|🐜||mammals,birds",
    "A healthy ecosystem with many species handles change...|better|🌳||worse,never",
    "Coral reefs host about a quarter of the sea's...|species|🪸||tides,salt",
    "A species that has disappeared forever is...|extinct|🦤||endangered,migrating",
    "A way to protect biodiversity is to save whole...|habitats|🌳||toys,cars",
    "Cutting down rainforest lowers...|biodiversity|🪓||the Sun,the Moon"
  ], "Think: how many kinds of living things?", "More kinds = more biodiversity."));
  c.push(L("Great journeys", [
    "Long travels|🧭|Many animals make long trips to find food, warm weather or a safe place to raise young. Monarch butterflies fly south to Mexico. The Arctic tern flies from the Arctic to near the South Pole and back.",
    "Water travelers|🐋🐟|Gray whales swim to warm lagoons to have their calves. Salmon return to the stream where they were born. Sea turtles return to lay eggs on the beach where they hatched.",
    "How do they know?|🧲|Migrating animals use the Sun, the stars, landmarks and Earth's magnetic field to find their way."
  ], [
    "Monarch butterflies fly south to spend winter in...|Mexico|🦋||Canada,Iceland",
    "The Arctic tern flies from the Arctic to near the...|South Pole|🐦||Equator,Sahara",
    "Salmon return to the stream where they were...|born|🐟||fed,named",
    "Gray whales swim to warm lagoons to have their...|calves|🐋||nests,hives",
    "Many migrating birds sense Earth's... to find their way|magnetic field|🧲||volcanoes,tides",
    "Sea turtles return to the beach where they hatched to lay their...|eggs|🐢||nets,toys",
    "Animals migrate to find food, warm weather, or a place to...|raise young|🐣||play cards,wash",
    "Migrating birds often follow the same...|route|🗺️||recipe,shadow"
  ], "Think of the famous journey each animal makes.", "Monarchs south, terns pole to pole, salmon home."));
  c.push(L("Eyes and vision", [
    "Eyes differ|👁️|Predators like cats and owls have eyes on the front of the head to judge distance. Prey animals like rabbits have eyes on the sides to see almost all around.",
    "Special eyes|🪰🐝|Insects have <b>compound eyes</b> with many tiny lenses. Bees can see ultraviolet light that people cannot. Cats' eyes have a mirror-like layer that helps them see in the dark.",
    "More|🦉🐌|An owl cannot move its eyes, so it turns its head. A garden snail has eyes on the tips of its tentacles. Eagles have very sharp eyesight."
  ], [
    "Predators often have eyes on the front of the head to judge...|distance|🐅||color,taste",
    "Prey animals like rabbits have eyes on the sides to see...|almost all around|🐇||only straight ahead,only up",
    "A fly's eye is made of many tiny lenses. It is a...|compound eye|🪰||single eye,glass eye",
    "Cats' eyes shine in a flashlight because of a layer that helps them see in the...|dark|🐈||sun,rain",
    "Bees can see a kind of light humans cannot, called...|ultraviolet light|🐝||echo,magnet",
    "An owl cannot move its eyes, so it turns its...|head|🦉||wings,beak",
    "Eagles can spot small prey from far away because of sharp...|eyesight|🦅||hearing,taste",
    "A garden snail has its eyes on the tips of its...|tentacles|🐌||wings,toes"
  ], "Think about how the eyes help the animal live.", "Hunter eyes front, hunted eyes sides."));
  c.push(L("Staying warm and cool", [
    "Warm|🥶|A thick layer of fat called <b>blubber</b> keeps whales warm. Fur and feathers trap warm air. Emperor penguins huddle together in the cold wind. Shivering makes heat.",
    "Cool|🥵|Dogs pant to cool down. Elephants flap their big ears, which have many blood vessels, to lose heat. The fennec fox has huge ears to lose heat too.",
    "Shelter|🏜️|Hippos stay in mud or water to protect their skin from the sun. Many desert animals hide in cool underground burrows during the day."
  ], [
    "A thick layer of fat under the skin that keeps whales warm is...|blubber|🐋||plumage,scales",
    "Fennec foxes lose heat through their large...|ears|🦊||paws,tails",
    "Dogs cool down by...|panting|🐕||shivering,hibernating",
    "Elephants flap their ears because ears have many...|blood vessels|🐘||feathers,bones",
    "Emperor penguins keep warm in the cold wind by...|huddling together|🐧||swimming apart,flying",
    "Hippos cover themselves with mud or water to protect their skin from the...|sun|🦛||snow,wind",
    "Many desert animals stay cool by hiding in underground...|burrows|🏜️||ice,trees",
    "Shivering warms an animal because muscles shaking make...|heat|🥶||light,noise"
  ], "Is the animal trying to get warmer or cooler?", "Fat, fur and huddling warm; ears, panting and water cool."));
  c.push(L("Ways animals reproduce", [
    "Eggs and live young|🥚|Most birds, reptiles, fish and insects lay <b>eggs</b>. Most mammals give birth to live young. Marsupials like kangaroos raise their tiny babies in a <b>pouch</b>.",
    "Other ways|🌱|A hydra can grow a little copy of itself from its body. This is <b>budding</b>. Frogs and butterflies go through <b>metamorphosis</b>: the young look very different from adults.",
    "Parents|🐘|Some parents, like elephants, care for their young for years. Some, like fish and sea turtles, lay many eggs, because many will not survive."
  ], [
    "Most birds, reptiles and fish reproduce by laying...|eggs|🥚||milk,pollen",
    "Most mammals give birth to...|live young|🐎||seeds,spores",
    "A hydra can grow a tiny new hydra from its body. This is called...|budding|🌱||hatching,molting",
    "Sea turtle mothers bury their eggs in the...|sand|🐢||grass,water",
    "A kangaroo baby grows in its mother's...|pouch|🦘||nest,egg",
    "A tadpole looks very different from an adult frog. The change is...|metamorphosis|🐸||migration,hibernation",
    "Fish lay thousands of eggs because most will not...|survive|🐟||float,sing",
    "Parents who care for their young give them food and...|protection|🐘||recipes,homework"
  ], "Think about how the baby starts its life.", "Eggs, pouches, live birth or budding."));
  c.push(L("Animal scientists", [
    "Studying animals|🔬|Scientists who study animals have special names. A <b>zoologist</b> studies animals in general. A <b>veterinarian</b> is a doctor for animals.",
    "-ologists|🐦🐜|An <b>ornithologist</b> studies birds. An <b>entomologist</b> studies insects. An <b>ichthyologist</b> studies fish. A <b>herpetologist</b> studies reptiles and amphibians.",
    "Ocean and plants|🌊🌿|A <b>marine biologist</b> studies ocean life. A <b>botanist</b> studies plants."
  ], [
    "A scientist who studies birds is an...|ornithologist|🐦||entomologist,herpetologist",
    "A scientist who studies insects is an...|entomologist|🐜||ornithologist,ichthyologist",
    "A scientist who studies reptiles and amphibians is a...|herpetologist|🐍||ornithologist,marine biologist",
    "A doctor for animals is a...|veterinarian|🩺||zoologist,pilot",
    "A scientist who studies ocean life is a...|marine biologist|🌊||geologist,botanist",
    "A scientist who studies fish is an...|ichthyologist|🐟||entomologist,ornithologist",
    "A scientist who studies animals in general is a...|zoologist|🦁||botanist,geologist",
    "A scientist who studies plants is a...|botanist|🌿||zoologist,entomologist"
  ], "Match the job name to the animals it studies.", "Birds, bugs, fish, reptiles, ocean."));
  c.push(L("How scientists observe", [
    "Watching animals|📷|Scientists write <b>field notes</b>, use <b>camera traps</b> that take photos when an animal walks past, and put <b>bands</b> or GPS collars on animals to see where they travel.",
    "Good science|🧪|A <b>hypothesis</b> is a guess you can test. In a fair test you change only one thing, the <b>variable</b>. Scientists repeat tests to be sure the results are reliable.",
    "Counting|📊|Counting every animal is hard, so scientists count a small <b>sample</b> and use it to estimate the whole."
  ], [
    "A camera that takes photos when an animal walks by is a camera...|trap|📷||roll,lens",
    "Placing a small ring on a bird's leg to track it is called...|banding|🐦||singing,sorting",
    "Notes scientists write outside while watching animals are called field...|notes|📝||songs,maps",
    "A guess that can be tested is a...|hypothesis|💡||conclusion,fact",
    "Counting animals in a small area to estimate the whole is taking a...|sample|📊||vote,photograph",
    "To make a fair test, change only one thing, the...|variable|🧪||result,rule",
    "A GPS collar helps scientists see where an animal...|travels|📍||dreams,sings",
    "Why do scientists repeat their tests?|to check the results are reliable|🔁||to get tired,because of boredom"
  ], "Think about how to learn about animals without bothering them.", "Cameras, notes, bands and fair tests."));
  c.push(L("Fishing and the ocean", [
    "Too much fishing|🎣|<b>Overfishing</b> means taking so many fish that the population cannot recover. Animals caught by accident in nets are called <b>bycatch</b>.",
    "Better ways|♻️|<b>Sustainable</b> fishing keeps fish populations healthy. <b>Quotas</b> set limits on how many fish can be caught. Marine <b>reserves</b> are protected parts of the ocean.",
    "Nurseries|🌱|Baby fish grow up in places like seagrass and mangroves, called nurseries. Choosing seafood labeled sustainable helps keep the ocean healthy."
  ], [
    "Taking so many fish that the population cannot recover is...|overfishing|🎣||underfishing,fish farming",
    "Fishing that keeps fish populations healthy is...|sustainable|♻️||wasteful,illegal",
    "Animals caught by accident in fishing nets are called...|bycatch|🥅||treasure,bait",
    "Limits on how many fish can be caught are called...|quotas|📏||tickets,recipes",
    "Protected parts of the ocean where fishing is limited are marine...|reserves|🌊||markets,museums",
    "Fish farms can raise fish so we need fewer fish from the...|wild|🐟||store,kitchen",
    "Baby fish grow up in seagrass and mangroves, which are called...|nurseries|🌱||factories,arcades",
    "Choosing seafood labeled sustainable helps keep the ocean...|healthy|🐟||quiet,warm"
  ], "Think about keeping fish populations strong.", "Limits, reserves and careful choices."));
  c.push(L("Conservation successes", [
    "Good news|🦅|People have helped many animals recover. The bald eagle bounced back after the chemical DDT was banned. The American alligator recovered after laws protected it.",
    "Helping hands|🐼|Giant pandas were moved from endangered to vulnerable in 2016. The California condor was saved by breeding birds in zoos and releasing them into the wild. Humpback whales increased after hunting was stopped.",
    "Lesson|🤝|Protecting habitats, making good laws and working together can save animals."
  ], [
    "The bald eagle recovered after the chemical DDT was...|banned|🦅||invented,sold more",
    "The giant panda was moved from endangered to...|vulnerable|🐼||extinct,common",
    "California condors were bred in zoos and released into the...|wild|🦅||ocean,city",
    "Humpback whales increased after hunting was...|stopped|🐋||started,doubled",
    "American alligators bounced back thanks to laws that...|protected them|🐊||moved them,hid them",
    "When a species grows from very few animals back to many, it has...|recovered|🌱||migrated,hibernated",
    "These stories show that people working together can...|help animals|🤝||stop the sun,end winter",
    "Saving animals works best when we protect their...|habitat|🌳||toys,names"
  ], "Think about what people did to help.", "Laws, zoos, bans and habitats."));
  c.push(MIX("Mixed practice", [c[0], c[1], c[2], c[4], c[5], c[6], c[7], c[8], c[9], c[11], c[12], c[14]]));
  c.push(MIX("Level 9 Challenge", [c[0], c[1], c[3], c[4], c[6], c[7], c[8], c[9], c[10], c[12], c[13], c[15], c[16], c[17], c[2]]));

  Object.assign(ANIMALS_LEVELS, { 7: a, 8: b, 9: c });
})();
