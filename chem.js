// Mind Lab Chemistry (kitchen-and-nature safe). Levels 1-3, 20 lessons each.
// Needs math.js and spelling.js loaded first (uses pick, shuf).
const CHEM_LEVELS = (() => {
  // item = [question, rightAnswer, wrong1, wrong2?]  (use "emoji§question" to show a big picture)
  const les = (title, slides, hints, items) => {
    const make = () => {
      const it = pick(items), parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1)), answer: it[1], hints };
    };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: s[2] }));
    make.slide = slides[0];
    return { title, make };
  };
  const mix = (title, ls) => {
    const make = () => pick(ls).make();
    make.teach = () => {
      const out = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some ideas, then the quiz." }];
      ls.filter((_, i) => i % Math.ceil(ls.length / 4) === 0).slice(0, 4).forEach(l => out.push({ h: l.make.slide[0], v: l.make.slide[1], t: l.make.slide[2] }));
      return out;
    };
    make.slide = out0 => out0;
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);

  // ================= LEVEL 1 =================
  const a = [
    les("Solid things", [
      ["What is a solid?", "🧱 🪨 ✏️", "A <b>solid</b> keeps its own shape. You can pick it up and hold it. Bricks, rocks and pencils are solids."],
      ["Solids stay put", "📚", "A book stays shaped like a book on the shelf. It does not pour or float away. That is what a solid does."],
      ["Tip", "💡", "If you can pick it up and it keeps its shape, it is probably a <b>solid</b>."]
    ], ["A solid keeps its shape. Can you hold it in your hand and it stays the same shape?", "Liquids pour and gases float around. A solid does neither one.", "Example: a book keeps its shape on the shelf, so it is a solid. Now think about yours."], [
      ["Which one is a solid?", "A rock", "Juice", "Air"], ["Which one is a solid?", "A spoon", "Milk", "The air in a balloon"],
      ["Which one is a solid?", "A toy block", "Water", "Wind"], ["Which one is a solid?", "A chair", "Soup", "Air"],
      ["Which one keeps its own shape?", "A shoe", "Orange juice", "Air"], ["Which one is a solid?", "A crayon", "Lemonade", "Air"],
      ["What does a solid do?", "It keeps its shape", "It pours out of a cup", "It floats away like air"]
    ]),
    les("Liquid things", [
      ["What is a liquid?", "💧 🥛 🧃", "A <b>liquid</b> pours and flows. Water, milk and juice are liquids."],
      ["Liquids take a shape", "🥤", "When you pour juice into a cup, the juice fills the cup and takes its shape. A liquid has no shape of its own."],
      ["Tip", "💡", "If you can <b>pour</b> it, it is probably a <b>liquid</b>."]
    ], ["A liquid pours and flows. Can you pour it?", "A liquid takes the shape of its cup. A solid keeps its own shape.", "Example: soup pours into a bowl and fills it, so soup is a liquid. Now think about yours."], [
      ["Which one is a liquid?", "Milk", "A shoe", "Air"], ["Which one is a liquid?", "Water", "A block", "A rock"],
      ["Which one is a liquid?", "Orange juice", "A brick", "Air"], ["Which one can you pour?", "Soup", "A book", "A hat"],
      ["What does a liquid do?", "It pours and takes the shape of its cup", "It keeps its own shape", "It floats up like air"],
      ["Which one is a liquid?", "Rain", "A spoon", "A pencil"], ["Which one is a liquid?", "Honey", "A crayon", "A chair"]
    ]),
    les("Gas and air", [
      ["What is a gas?", "💨", "A <b>gas</b> spreads out and fills the space it is in. We usually cannot see it."],
      ["Air is a gas", "🌬️", "<b>Air</b> is all around us. We cannot see it, but we can feel it when the wind blows."],
      ["Gas in things", "🎈", "A balloon is full of air. A bike tire is full of air. Air is a gas inside them."]
    ], ["A gas floats around and spreads out. Think about what is all around us that we cannot see.", "We can feel air when the wind blows, even though we cannot see it.", "Example: you blow air into a bubble wand to make bubbles. Air is a gas. Now try yours."], [
      ["What is all around us but we cannot see it?", "Air", "Sand", "Milk"], ["Air is a...", "Gas", "Solid", "Liquid"],
      ["What do you blow into a party balloon?", "Air", "Sand", "Juice"], ["Which one is a gas?", "The air in a bike tire", "The tire", "A puddle"],
      ["What do we breathe in?", "Air", "Milk", "Sand"], ["Wind is air that is...", "Moving", "Frozen", "Melted"],
      ["The fizzy bubbles in soda pop are a...", "Gas", "Rock", "Solid"]
    ]),
    les("Solid, liquid or gas?", [
      ["Three kinds of stuff", "🧊 💧 💨", "Many things are a <b>solid</b>, a <b>liquid</b> or a <b>gas</b>."],
      ["How to tell", "🔍", "Keeps its shape = <b>solid</b>. Pours = <b>liquid</b>. Spreads out and floats = <b>gas</b>."],
      ["Try one", "🥛", "Milk pours into a glass, so milk is a <b>liquid</b>."]
    ], ["Ask: does it keep its shape, pour, or float around?", "Keeps its shape = solid. Pours = liquid. Spreads out and floats = gas.", "Example: a sock keeps its shape, so it is a solid. Now try yours."], [
      ["🧊§Is an ice cube a solid, a liquid or a gas?", "Solid", "Liquid", "Gas"], ["🧃§Is juice a solid, a liquid or a gas?", "Liquid", "Solid", "Gas"],
      ["🎈§Is the air inside a balloon a solid, a liquid or a gas?", "Gas", "Solid", "Liquid"], ["🚗§Is a toy car a solid, a liquid or a gas?", "Solid", "Liquid", "Gas"],
      ["💧§Is water in a cup a solid, a liquid or a gas?", "Liquid", "Solid", "Gas"], ["🥄§Is a spoon a solid, a liquid or a gas?", "Solid", "Liquid", "Gas"],
      ["🍯§Is honey a solid, a liquid or a gas?", "Liquid", "Solid", "Gas"], ["🌬️§Is the air we breathe a solid, a liquid or a gas?", "Gas", "Solid", "Liquid"]
    ]),
    les("Wood, metal and plastic", [
      ["Materials", "🪵 🔩 🧩", "Things are made of <b>materials</b>. Three common ones are <b>wood</b>, <b>metal</b> and <b>plastic</b>."],
      ["Where they come from", "🌳", "Wood comes from trees. Metal is dug out of rocks and shaped. Plastic is made in factories."],
      ["Look around", "🔎", "A wooden chair, a metal spoon and a plastic cup. What is your cup made of?"]
    ], ["A material is what a thing is made of. Think about how the thing feels and looks.", "Wood comes from trees. Metal is hard and cold to touch. Plastic is light and often colorful.", "Example: a baseball bat is often made of wood. Now try yours."], [
      ["A wooden chair is made of...", "Wood", "Metal", "Plastic"], ["A metal key is made of...", "Metal", "Wood", "Plastic"],
      ["A plastic cup is made of...", "Plastic", "Wood", "Metal"], ["Wood comes from...", "Trees", "Sheep", "Clouds"],
      ["Which is made of metal?", "A fork", "A sock", "A pillow"], ["Which is made of plastic?", "A toy block", "A tree", "A rock"],
      ["The outside of a pencil is made of...", "Wood", "Glass", "Cloth"]
    ]),
    les("Glass and cloth", [
      ["Glass", "🪟 🥛", "<b>Glass</b> is hard and smooth. You can see through it, but it can break if you drop it."],
      ["Cloth", "👕 🧦", "<b>Cloth</b> is soft and bendy. Shirts, socks and towels are made of cloth."],
      ["Which is which?", "🤔", "A window is glass. A towel is cloth. Think about what the thing is for."]
    ], ["Think: is it hard and see-through, or soft and bendy?", "Glass is hard and can break. Cloth is soft and bends.", "Example: a pillowcase is soft and bendy, so it is made of cloth. Now try yours."], [
      ["A window is made of...", "Glass", "Cloth", "Wood"], ["Your T-shirt is made of...", "Cloth", "Glass", "Metal"],
      ["Which is made of glass?", "A drinking glass", "A sock", "A stick"], ["Which is made of cloth?", "A towel", "A window", "A key"],
      ["Which can break if you drop it?", "A glass cup", "A pillow", "A sock"], ["Curtains are made of...", "Cloth", "Glass", "Metal"],
      ["Which material is soft and bendy?", "Cloth", "Glass", "Metal"]
    ]),
    les("Hard or soft?", [
      ["Hard", "🪨 🧱", "A <b>hard</b> thing does not squish when you press it. Rocks and bricks are hard."],
      ["Soft", "🧸 ☁️", "A <b>soft</b> thing squishes or feels fluffy. Pillows and teddy bears are soft."],
      ["Press it", "👆", "To find out, gently press it. If it squishes, it is soft. If it stays firm, it is hard."]
    ], ["Imagine pressing it with your finger. Does it squish?", "Soft things squish. Hard things stay firm.", "Example: a wooden spoon does not squish, so it is hard. Now try yours."], [
      ["Is a rock hard or soft?", "Hard", "Soft"], ["Is a pillow hard or soft?", "Soft", "Hard"], ["Is a teddy bear hard or soft?", "Soft", "Hard"],
      ["Is a brick hard or soft?", "Hard", "Soft"], ["Is a cotton ball hard or soft?", "Soft", "Hard"], ["Is a metal spoon hard or soft?", "Hard", "Soft"],
      ["Is a marshmallow hard or soft?", "Soft", "Hard"], ["Is a table hard or soft?", "Hard", "Soft"]
    ]),
    les("Rough or smooth?", [
      ["Rough", "🪵", "A <b>rough</b> thing feels bumpy when you rub it. Tree bark and sandpaper are rough."],
      ["Smooth", "🪞", "A <b>smooth</b> thing feels slippery or flat. A mirror and a window are smooth."],
      ["Touch and feel", "🖐️", "Scientists use their hands to feel. Rough is bumpy. Smooth is not bumpy."]
    ], ["Imagine rubbing your hand over it. Is it bumpy or flat?", "Bumpy = rough. Flat and slippery = smooth.", "Example: a sheet of paper feels flat, so it is smooth. Now try yours."], [
      ["Is sandpaper rough or smooth?", "Rough", "Smooth"], ["Is a mirror rough or smooth?", "Smooth", "Rough"], ["Is tree bark rough or smooth?", "Rough", "Smooth"],
      ["Is a window rough or smooth?", "Smooth", "Rough"], ["Is a pile of sand rough or smooth?", "Rough", "Smooth"],
      ["Is a river pebble rubbed by water rough or smooth?", "Smooth", "Rough"], ["Is a pinecone rough or smooth?", "Rough", "Smooth"]
    ]),
    les("Sink or float?", [
      ["Float", "🍃 🦆", "Some things <b>float</b> on water. Leaves, rubber ducks and corks float."],
      ["Sink", "🪨 🔑", "Some things <b>sink</b> to the bottom. Rocks, keys and marbles sink."],
      ["Test it", "🛁", "You can test this with a grown-up in a bowl of water. Guess first, then try!"]
    ], ["Think about something that stays on top of a pond, and something that drops to the bottom.", "Heavy little things like stones tend to sink. Light things like leaves tend to float.", "Example: a cork floats on top of water. A coin sinks to the bottom. Now think about yours."], [
      ["Does a rock sink or float?", "Sinks", "Floats"], ["Does a leaf sink or float?", "Floats", "Sinks"], ["Does a metal key sink or float?", "Sinks", "Floats"],
      ["Does a rubber duck sink or float?", "Floats", "Sinks"], ["Does a cork sink or float?", "Floats", "Sinks"], ["Does a marble sink or float?", "Sinks", "Floats"],
      ["Does a wooden stick sink or float?", "Floats", "Sinks"], ["Does a coin sink or float?", "Sinks", "Floats"]
    ]),
    les("Melting", [
      ["Melting", "🧊 ➡️ 💧", "When a solid gets warm, it can turn into a liquid. That is called <b>melting</b>."],
      ["Warm things melt", "🍦 ☀️", "Ice cream, ice and chocolate melt when they get warm."],
      ["Cold keeps it solid", "❄️", "Keep ice in the freezer and it stays hard. Take it out in the sun and it melts."]
    ], ["Melting needs warmth. What happens to ice left in the sun?", "A solid turns into a liquid when it melts.", "Example: butter left in a warm pan gets runny. It melts. Now try yours."], [
      ["What happens to an ice cube in the sun?", "It melts", "It grows", "It turns to wood"], ["Melting turns a solid into a...", "Liquid", "Rock", "Gas"],
      ["Which one melts in the hot sun?", "Ice cream", "A rock", "A spoon"], ["What makes ice melt?", "Warmth", "Cold", "Darkness"],
      ["When ice melts it turns into...", "Water", "Sand", "Wood"], ["A snowman on a warm day will...", "Melt", "Grow bigger", "Turn into metal"],
      ["A chocolate bar left in a hot car will...", "Melt", "Freeze", "Disappear into air"]
    ]),
    les("Freezing", [
      ["Freezing", "💧 ➡️ 🧊", "When a liquid gets very cold, it can turn into a solid. That is called <b>freezing</b>."],
      ["Ice", "🧊", "Water freezes into <b>ice</b>. Ice cubes are made by putting water in the freezer."],
      ["Opposites", "↔️", "Melting and freezing are opposites. Warm melts things. Cold freezes things."]
    ], ["Freezing needs cold. What does a freezer do to water?", "A liquid turns into a solid when it freezes.", "Example: juice in a freezer turns into an ice pop. Now try yours."], [
      ["Freezing turns a liquid into a...", "Solid", "Gas", "Cloud"], ["Water in the freezer becomes...", "Ice", "Steam", "Sand"],
      ["What makes water freeze?", "Being very cold", "Being hot", "Being loud"], ["Ice cubes are made by freezing...", "Water", "Sand", "Wood"],
      ["Freezing is the opposite of...", "Melting", "Jumping", "Sleeping"], ["A puddle on a very cold night may turn into...", "Ice", "Steam", "Sand"],
      ["Juice in a freezer makes an...", "Ice pop", "Hot drink", "Balloon"]
    ]),
    les("Water is everywhere", [
      ["Water in many forms", "🧊 💧 ☁️", "Water can be ice (solid), water (liquid), or tiny drops in clouds."],
      ["Rain and snow", "🌧️ ❄️", "Rain is liquid water falling. Snow is frozen water falling."],
      ["Stay safe", "♨️", "Hot steam from a kettle can hurt you. Always stay away and let a grown-up handle hot things."]
    ], ["Water can be hard like ice or runny like rain.", "Ice is solid water. Rain is liquid water. Snow is frozen water.", "Example: a lake is liquid water. A frozen lake in winter is ice. Now try yours."], [
      ["Rain is water that is a...", "Liquid", "Solid", "Rock"], ["Snow is frozen...", "Water", "Sand", "Wood"], ["Which one is water as a solid?", "Ice", "Rain", "A puddle"],
      ["The water in a lake is a...", "Liquid", "Solid", "Rock"], ["Clouds are made of tiny drops of...", "Water", "Sand", "Milk"],
      ["Which one is a form of water?", "Ice", "Sand", "Wood"], ["Who should handle hot steam and hot water?", "A grown-up", "A baby", "Nobody, just touch it"]
    ]),
    les("Mixing colors", [
      ["Mix paint", "🎨", "When you mix two paint colors, you make a new color!"],
      ["Make new colors", "🔴 + 🟡 = 🟠", "Red + yellow = <b>orange</b>. Blue + yellow = <b>green</b>. Red + blue = <b>purple</b>."],
      ["Try it", "🖌️", "You can try this with paint and a grown-up to help. Mix a tiny bit at a time."]
    ], ["Think about which two colors you would mix on a paint tray.", "Red + yellow = orange. Blue + yellow = green. Red + blue = purple.", "Example: if you mix red and white you get pink. Now think about the colors in your question."], [
      ["Mix red and yellow paint. You get...", "Orange", "Green", "Purple"], ["Mix blue and yellow paint. You get...", "Green", "Orange", "Purple"],
      ["Mix red and blue paint. You get...", "Purple", "Orange", "Green"], ["Which two colors make green?", "Blue and yellow", "Red and yellow", "Red and blue"],
      ["Which two colors make orange?", "Red and yellow", "Blue and yellow", "Red and blue"], ["Which two colors make purple?", "Red and blue", "Red and yellow", "Blue and yellow"],
      ["Mix yellow and blue. You get...", "Green", "Purple", "Orange"]
    ]),
    les("More color mixing", [
      ["Add white", "⚪", "Adding <b>white</b> makes a color lighter. Red + white = <b>pink</b>."],
      ["Add black", "⚫", "Adding <b>black</b> makes a color darker. Black + white = <b>gray</b>."],
      ["Light and dark", "🌗", "Light blue is blue with white. Dark blue is blue with a little black."]
    ], ["White makes colors lighter. Black makes them darker.", "Red + white = pink. Blue + white = light blue. Black + white = gray.", "Example: yellow + white makes a pale yellow, lighter than yellow. Now try yours."], [
      ["Add white to red paint. You get...", "Pink", "Green", "Black"], ["Add white to blue paint. You get...", "Light blue", "Orange", "Red"],
      ["Mix black and white. You get...", "Gray", "Pink", "Green"], ["Which two colors make pink?", "Red and white", "Blue and yellow", "Black and white"],
      ["Which two colors make gray?", "Black and white", "Red and white", "Blue and yellow"], ["Adding white makes a color...", "Lighter", "Darker", "Louder"],
      ["Adding a little black makes a color...", "Darker", "Lighter", "Colder"]
    ]),
    les("Dissolving", [
      ["Stir it in", "🥄 🍬", "Sugar stirred into warm water seems to disappear. We say it <b>dissolves</b>."],
      ["Still there", "💧", "The sugar is still in the water, just in tiny bits you cannot see."],
      ["Stir to help", "🌀", "Stirring helps things dissolve faster."]
    ], ["Dissolving means mixing in so well you cannot see the bits.", "Sugar and salt dissolve in water. Stones do not.", "Example: drink powder stirred into water dissolves. Now try yours."], [
      ["Stir sugar into water. What happens?", "It dissolves", "It turns into a rock", "It turns into a gas"], ["Which one dissolves in water?", "Sugar", "A stone", "A marble"],
      ["Which one dissolves in water?", "Salt", "A button", "A coin"], ["Dissolve means to mix in so well that...", "You cannot see the bits", "It turns to glass", "It gets louder"],
      ["Drink powder stirred into water will...", "Dissolve", "Float on top as a block", "Turn into ice"], ["What helps sugar dissolve faster?", "Stirring", "Waiting in the cold", "Shouting"],
      ["Sugar in warm tea will...", "Dissolve", "Sink as a rock", "Catch fire"]
    ]),
    les("Does it dissolve?", [
      ["Some do, some do not", "🧂 🏖️", "Salt and sugar dissolve in water. Sand and pebbles do not."],
      ["Sand sinks", "⏳", "Sand stirred in water falls to the bottom. It does not dissolve."],
      ["Test it", "🥣", "With a grown-up, stir a little of something into water. Does it vanish, or does it stay as bits?"]
    ], ["Think: does it vanish into the water, or sink as bits?", "Salt and sugar dissolve. Sand, pebbles and rice do not.", "Example: a spoonful of sand stays as sand at the bottom, so it does not dissolve. Now try yours."], [
      ["Does sand dissolve in water?", "Does not dissolve", "Dissolves"], ["Does salt dissolve in water?", "Dissolves", "Does not dissolve"],
      ["Does sugar dissolve in water?", "Dissolves", "Does not dissolve"], ["Do pebbles dissolve in water?", "Do not dissolve", "Dissolve"],
      ["Does rice dissolve in water?", "Does not dissolve", "Dissolves"], ["Does a button dissolve in water?", "Does not dissolve", "Dissolves"],
      ["Does drink powder dissolve in water?", "Dissolves", "Does not dissolve"]
    ]),
    les("Never taste to test", [
      ["Science safety", "🧪", "In science we look, feel with care, and listen. We <b>never taste</b> things we find or mix."],
      ["Why not?", "🚫", "Some things can make you sick, even if they look yummy or pretty."],
      ["Stop and ask", "✋", "If you find a bottle, a berry or a powder you do not know, <b>leave it alone</b> and tell a grown-up."]
    ], ["Think about what keeps you safe if you do not know what something is.", "Never taste or mix things you do not know. Tell a grown-up.", "Example: you find a shiny berry on a bush. You do not eat it. You ask a grown-up. Now try yours."], [
      ["You find a bottle with no label. What do you do?", "Leave it and tell a grown-up", "Taste it", "Mix it with water"],
      ["Should you taste things you find during science?", "No, never", "Yes, always", "Only if it smells nice"], ["You see a pretty berry on a bush. What do you do?", "Don't eat it. Ask a grown-up", "Eat it", "Give it to a friend to try"],
      ["Why should you not taste unknown things?", "They can make you sick", "They are always sweet", "It is a rule only for adults"], ["You find a strange powder. What do you do?", "Don't touch it. Tell a grown-up", "Taste a tiny bit", "Mix it with juice"],
      ["Can you mix things you do not know?", "No, never", "Yes, any time", "Only at night"], ["Who do you tell about something you found?", "A grown-up", "Nobody", "Only a toy"]
    ]),
    les("Ask a grown-up", [
      ["Helpers", "🧑‍🍳", "Some jobs need a grown-up to help, like using the stove, the oven or anything hot."],
      ["Keep away", "🧴", "Cleaning sprays and soaps for the house are not for playing. Leave them and tell a grown-up."],
      ["Clean up", "🧼", "After science or cooking, wash your hands with soap and water."]
    ], ["Hot things and strong cleaners need a grown-up.", "When you are not sure if it is safe, stop and ask a grown-up.", "Example: you want a hot drink from the kettle. Ask a grown-up to pour it. Now try yours."], [
      ["What do you do before using the oven or stove?", "Ask a grown-up", "Do it by yourself", "Ask a toy"], ["You see a cleaning spray under the sink. What do you do?", "Leave it alone", "Spray it around", "Taste it"],
      ["You spill water on the floor. What do you do?", "Tell a grown-up so no one slips", "Hide it", "Run around in it"], ["When should you wash your hands?", "After science or cooking", "Never", "Only on Fridays"],
      ["Who should pour hot water?", "A grown-up", "A little kid", "A friend who is 5"], ["Is it OK to play with matches?", "No, never", "Yes, if you are careful", "Yes, in the kitchen"],
      ["You are not sure if something is safe. What do you do?", "Stop and ask a grown-up", "Try it quickly", "Ask a stranger online"]
    ])
  ];
  a.push(
    mix("Mixed practice", at(a, [3, 4, 6, 8, 9, 12])),
    mix("Level 1 Challenge", at(a, [0, 1, 2, 5, 7, 10, 13, 14, 15, 16, 17]))
  );

  // ================= LEVEL 2 =================
  const b = [
    les("Bendy or stiff?", [
      ["Bendy", "🪢", "A <b>bendy</b> thing bends easily. A rope and a rubber band are bendy."],
      ["Stiff", "📏", "A <b>stiff</b> thing does not bend easily. A wooden ruler and a metal bar are stiff."],
      ["Why it matters", "🧠", "We pick bendy things for ropes and stiff things for building."]
    ], ["Imagine holding both ends and bending it.", "Bendy things bend easily. Stiff things stay straight.", "Example: a wooden spoon does not bend, so it is stiff. Now try yours."], [
      ["Is a rubber band bendy or stiff?", "Bendy", "Stiff"], ["Is a wooden ruler bendy or stiff?", "Stiff", "Bendy"], ["Is a rope bendy or stiff?", "Bendy", "Stiff"],
      ["Is a pencil bendy or stiff?", "Stiff", "Bendy"], ["Is a jump rope bendy or stiff?", "Bendy", "Stiff"], ["Is a metal bar bendy or stiff?", "Stiff", "Bendy"],
      ["Is a cooked noodle bendy or stiff?", "Bendy", "Stiff"]
    ]),
    les("Soaks it up", [
      ["Absorb", "🧽 💧", "Some things <b>soak up</b> water, like a sponge or a towel. We say they <b>absorb</b> water."],
      ["Waterproof", "☂️", "Other things keep water out, like a rain jacket or a plastic cup."],
      ["Jobs", "🧻", "We use a towel to dry up spills. We use a rain jacket to stay dry."]
    ], ["Think: if water lands on it, does it get sucked in, or does the water sit on top?", "Sponges, towels and paper towels soak water up. Plastic and glass do not.", "Example: a cotton sock gets wet all the way through, so it soaks up water. Now try yours."], [
      ["Does a sponge soak up water or keep it out?", "Soaks it up", "Keeps it out"], ["Does a paper towel soak up water or keep it out?", "Soaks it up", "Keeps it out"],
      ["Does a plastic cup soak up water or keep it out?", "Keeps it out", "Soaks it up"], ["Does a rock soak up water or keep it out?", "Keeps it out", "Soaks it up"],
      ["Does a bath towel soak up water or keep it out?", "Soaks it up", "Keeps it out"], ["Does a rain jacket soak up water or keep it out?", "Keeps it out", "Soaks it up"],
      ["Does a glass window soak up water or keep it out?", "Keeps it out", "Soaks it up"]
    ]),
    les("See-through or not?", [
      ["See-through", "🪟", "A <b>see-through</b> thing lets light pass, so you can see through it. Clear glass and clear plastic are see-through."],
      ["Not see-through", "🚪", "A wooden door or a brick wall is <b>not</b> see-through. You cannot see through it."],
      ["Good to know", "🕶️", "Windows are see-through so we can see outside and still stay dry."]
    ], ["Ask: could I look through it and see what is on the other side?", "Clear glass and clear plastic are see-through. Wood, bricks and books are not.", "Example: a clear plastic bottle is see-through. A cardboard box is not. Now try yours."], [
      ["Is clear window glass see-through or not?", "See-through", "Not see-through"], ["Is a wooden door see-through or not?", "Not see-through", "See-through"],
      ["Is clear plastic wrap see-through or not?", "See-through", "Not see-through"], ["Is a brick see-through or not?", "Not see-through", "See-through"],
      ["Is a clear water glass see-through or not?", "See-through", "Not see-through"], ["Is a book see-through or not?", "Not see-through", "See-through"],
      ["Is air see-through or not?", "See-through", "Not see-through"]
    ]),
    les("Shiny or dull?", [
      ["Shiny", "🪞 🥄", "A <b>shiny</b> thing reflects light and sparkles. Mirrors, spoons and foil are shiny."],
      ["Dull", "🪨", "A <b>dull</b> thing does not shine. A rock or a woolly sock is dull."],
      ["Shine in the light", "💡", "Hold a thing in the light. If you see bright flashes on it, it is shiny."]
    ], ["Imagine it in sunlight. Does it flash and sparkle?", "Mirrors, new coins and metal spoons are shiny. Wool and rocks are dull.", "Example: a gold star sticker is shiny, a paper bag is dull. Now try yours."], [
      ["Is a mirror shiny or dull?", "Shiny", "Dull"], ["Is a woolly sock shiny or dull?", "Dull", "Shiny"], ["Is a metal spoon shiny or dull?", "Shiny", "Dull"],
      ["Is a cardboard box shiny or dull?", "Dull", "Shiny"], ["Is kitchen foil shiny or dull?", "Shiny", "Dull"], ["Is a rock from the yard shiny or dull?", "Dull", "Shiny"],
      ["Is a new coin shiny or dull?", "Shiny", "Dull"]
    ]),
    les("Where materials come from", [
      ["From plants", "🌳 🌱", "Wood and paper come from trees. Cotton for T-shirts grows on plants."],
      ["From animals", "🐑", "Wool for warm hats and sweaters comes from sheep."],
      ["From the ground", "⛏️", "Metal comes from rocks. Glass is made by heating sand."]
    ], ["Think about where the thing starts: a tree, an animal, or the ground.", "Wood and paper come from trees. Wool comes from sheep. Glass is made from sand.", "Example: cotton towels start as a plant that grows in a field. Now try yours."], [
      ["Wood comes from...", "Trees", "Clouds", "Sand"], ["Cotton for T-shirts grows on...", "Plants", "Sheep", "Rocks"], ["Wool comes from...", "Sheep", "Trees", "Rocks"],
      ["Paper is made from...", "Trees", "Sand", "Sheep"], ["Glass is made by heating...", "Sand", "Wool", "Wood"], ["Which one comes from a plant?", "Cotton", "Glass", "Metal"],
      ["Which one comes from an animal?", "Wool", "Cotton", "Wood"]
    ]),
    les("The best material for the job", [
      ["Pick well", "🛠️", "We choose a material because of how it feels and acts. This is called its <b>properties</b>."],
      ["Examples", "🪟 🌧️ 🥣", "Windows are glass because we can see through it. Rain boots are rubber because it keeps water out."],
      ["Ask why", "❓", "When you see something, ask: why is it made of this? Because of what it does well."]
    ], ["Think about what job the thing has to do.", "Match the job with a property: see-through, waterproof, strong, soft or bendy.", "Example: a pillow is filled with soft stuff because we rest our heads on it. Now try yours."], [
      ["Which material is best for a window?", "Glass", "Wood", "Cloth"], ["Which material is best for rain boots?", "Rubber", "Paper", "Cloth"],
      ["Which material is best for a cooking pot?", "Metal", "Paper", "Cotton"], ["Which material is best for a cozy blanket?", "Cloth", "Metal", "Glass"],
      ["Which material is best for a chair to sit on?", "Wood", "Paper", "Wool yarn only"], ["Which material is best for a bike helmet?", "Hard plastic", "Cotton", "Paper"],
      ["Which material is best for a sponge to clean?", "Soft stuff that soaks up water", "Glass", "Metal"]
    ]),
    les("Heat changes things", [
      ["Heat can melt", "🧈 🍫", "Butter and chocolate get soft and runny when they get warm. They melt."],
      ["Not everything", "🪨", "A rock does not melt in the sun. Only some things melt at the heat we feel every day."],
      ["Cool it down", "🧊", "When melted chocolate cools, it gets hard again."]
    ], ["Warm things can melt and turn runny. Think about butter in a warm pan.", "Chocolate, butter, ice and ice cream melt when warm. Rocks and spoons do not.", "Example: cheese melts on hot pizza. Now try yours."], [
      ["What does heat do to chocolate?", "Makes it soft and runny", "Makes it harder", "Makes it disappear forever"], ["Which one melts when it gets warm?", "Butter", "A rock", "A spoon"],
      ["A popsicle on a hot day will...", "Melt", "Get bigger", "Turn into a rock"], ["Melted chocolate gets hard again when it...", "Cools down", "Gets hotter", "Gets shaken"],
      ["Does a rock melt in the sun?", "No", "Yes, quickly", "Yes, into juice"], ["Which one will melt in a warm room?", "Ice cream", "A cup", "A book"],
      ["Cheese on a hot pizza will...", "Melt", "Freeze", "Float away"]
    ]),
    les("Cold changes things", [
      ["Cold makes hard", "🥶", "Very cold temperature can turn liquids into solids. Water becomes ice."],
      ["In the freezer", "🧊", "A freezer is very cold. Water, juice and milk turn hard in a freezer."],
      ["Warm it up", "☀️", "Take frozen things out and they melt again."]
    ], ["Cold makes liquids hard. What does a freezer do?", "Water, juice and milk can freeze in a freezer.", "Example: yogurt in a freezer turns into frozen yogurt. Now try yours."], [
      ["Juice in the freezer becomes...", "Solid", "Gas", "Hotter"], ["What happens to a puddle in freezing weather?", "It turns to ice", "It turns to sand", "It turns to steam"],
      ["To make ice cubes, put water in the...", "Freezer", "Oven", "Sun"], ["Cold makes liquids go...", "Hard", "Hotter", "Bright"],
      ["An ice pop on a table in a warm room will...", "Melt", "Get harder", "Turn into rock"], ["Which needs cold to make?", "Ice cubes", "Hot soup", "Warm toast"],
      ["Milk left in a freezer becomes...", "Solid", "Gas", "Hot"]
    ]),
    les("Ice, water and vapor", [
      ["Three forms", "🧊 💧 ☁️", "Water can be a solid (<b>ice</b>), a liquid (<b>water</b>) or a gas (<b>water vapor</b>)."],
      ["Warm it up", "🔥", "Ice + heat becomes water. Water + a lot of heat becomes water vapor (steam)."],
      ["Cool it down", "❄️", "Water + cold becomes ice."]
    ], ["Water has three forms: solid, liquid and gas.", "Solid water is ice. Liquid water is water. Gas water is water vapor.", "Example: water in a cold lake in winter can freeze to ice. Now try yours."], [
      ["Water as a solid is called...", "Ice", "Steam", "Cloud"], ["Water as a gas is called...", "Water vapor (steam)", "Ice", "Rain"],
      ["Heat ice and it becomes...", "Water", "Sand", "Wood"], ["Cool water a lot and it becomes...", "Ice", "Steam", "Sand"],
      ["Which is liquid water?", "Rain", "An ice cube", "Water vapor"], ["Snow is...", "Frozen water", "Wood", "Hot steam"],
      ["Heat water a lot and it can become...", "Water vapor (steam)", "Ice", "Rock"]
    ]),
    les("Puddles dry up", [
      ["Where did it go?", "💧 ➡️ 💨", "A puddle slowly goes away. The water turns into a gas and goes into the air. That is called <b>evaporation</b>."],
      ["Sun helps", "☀️", "Warm sun and wind help water evaporate faster."],
      ["Wet laundry", "👕", "Wet clothes dry on a line because the water evaporates into the air."]
    ], ["When a puddle dries, the water does not disappear. Where does it go?", "Liquid water turns into a gas in the air. Warm sun makes it faster.", "Example: a wet towel on a sunny line gets dry as its water goes into the air. Now try yours."], [
      ["Where does a puddle go when it dries up?", "Into the air as a gas", "Deep into a rock", "Into the moon"], ["Evaporate means a liquid turns into a...", "Gas", "Rock", "Solid"],
      ["What helps wet clothes dry faster?", "Warm sun and wind", "A cold fridge", "A dark closet"], ["A wet towel in the sun will...", "Dry as water goes into the air", "Get wetter", "Freeze"],
      ["Which dries faster?", "A puddle on a sunny day", "A puddle in the shade on a cold day", "A puddle in a bucket with a lid"], ["Water going into the air as a gas is called...", "Evaporation", "Freezing", "Melting"],
      ["Wet hair dries because the water...", "Evaporates", "Turns to ice", "Turns to wood"]
    ]),
    les("Oil and water", [
      ["Some don't mix", "🫙", "Oil and water do <b>not</b> mix. In a jar, the oil floats on top of the water."],
      ["Some do mix", "🍋", "Lemon juice mixes with water. Milk mixes with water. Sugar dissolves in water."],
      ["Why?", "🤔", "Oil is lighter than water and does not blend with it."]
    ], ["Think about salad dressing: oil on top, vinegar below. They separate.", "Juice and milk can blend with water. Oil stays on top.", "Example: shake oil and water in a jar and they will separate again when you stop. Now try yours."], [
      ["Oil and water in a jar. What happens?", "Oil floats on top", "They turn into one drink", "They both float up"], ["Does oil mix with water?", "No", "Yes, completely"],
      ["Which mixes well with water?", "Lemon juice", "Cooking oil", "Sand"], ["Which pair does NOT mix?", "Oil and water", "Milk and water", "Juice and water"],
      ["Oil floats on water because it is...", "Lighter", "Heavier", "Colder"], ["Does sugar mix into water?", "Yes, it dissolves", "No, it floats on top as a block", "No, it turns to oil"],
      ["Shake oil and water and then wait. What happens?", "They separate again", "They turn pink", "They freeze"]
    ]),
    les("Dissolves or not?", [
      ["Think of bits", "🧂", "Dissolving means tiny bits spread out in the liquid so you cannot see them."],
      ["Dissolves", "🍬 🧂", "Sugar, salt and drink powder dissolve in water."],
      ["Does not dissolve", "🪨 🔮", "Stones, marbles, crayons and sand do not dissolve. They stay as pieces."]
    ], ["Ask: do the bits vanish into the water?", "Sugar, salt, honey and drink powder dissolve. Stones and marbles do not.", "Example: a spoon of salt dissolves. A pebble stays as a pebble. Now try yours."], [
      ["Does honey in warm tea dissolve?", "Dissolves", "Does not dissolve"], ["Does a marble dissolve in water?", "Does not dissolve", "Dissolves"],
      ["Does a crayon dissolve in water?", "Does not dissolve", "Dissolves"], ["Does salt dissolve in water?", "Dissolves", "Does not dissolve"],
      ["Do small stones dissolve in water?", "Do not dissolve", "Dissolve"], ["Does sugar dissolve in water?", "Dissolves", "Does not dissolve"],
      ["Does drink mix powder dissolve in water?", "Dissolves", "Does not dissolve"]
    ]),
    les("Color mixing", [
      ["Primary colors", "🔴 🟡 🔵", "<b>Red, yellow and blue</b> are called primary colors. You can mix them to make other colors."],
      ["Mix two", "🟠 🟢 🟣", "Red + yellow = orange. Yellow + blue = green. Blue + red = purple."],
      ["Remember", "🧠", "Green is blue and yellow. Orange is red and yellow. Purple is blue and red."]
    ], ["Primary colors are red, yellow and blue.", "Mix two primaries: red + yellow, yellow + blue, blue + red.", "Example: red and white make pink. Now think about the colors in your question."], [
      ["Which one is a primary color?", "Red", "Green", "Purple"], ["Green is made from blue and...", "Yellow", "Red", "White"], ["Orange is made from red and...", "Yellow", "Blue", "White"],
      ["Purple is made from blue and...", "Red", "Yellow", "White"], ["Red, yellow and ... are the primary colors.", "Blue", "Green", "Orange"],
      ["Mix blue and yellow. You get...", "Green", "Orange", "Pink"], ["Mix red and white. You get...", "Pink", "Green", "Black"]
    ]),
    les("Sorting by properties", [
      ["Two clues", "🔍", "We can describe things with two clues, like <b>hard and shiny</b> or <b>soft and fluffy</b>."],
      ["Examples", "🥄 🧸", "A metal spoon is hard and shiny. A teddy bear is soft and fluffy."],
      ["Match", "🧩", "Read both clues and pick the thing that fits both."]
    ], ["A thing has to fit BOTH clues.", "Cross out the choices that fit only one clue.", "Example: a wooden table is hard and rough. A silk scarf is soft and smooth. Now try yours."], [
      ["Which is hard and shiny?", "A metal spoon", "A pillow", "A wool sock"], ["Which is soft and fluffy?", "A cotton ball", "A rock", "A brick"],
      ["Which is hard and see-through?", "A glass window", "A towel", "A teddy bear"], ["Which is bendy and stretchy?", "A rubber band", "A rock", "A brick"],
      ["Which is rough and hard?", "A rock", "A pillow", "A balloon"], ["Which is soft and warm to wear?", "A wool hat", "A glass jar", "A metal can"],
      ["Which is smooth and see-through?", "A glass cup", "A wool sock", "A tree"]
    ]),
    les("Natural or made by people?", [
      ["Natural", "🌳 🪨 🐚", "<b>Natural</b> things come from nature, like trees, rocks and shells."],
      ["Made by people", "🧸 🪟 🚲", "Some things are <b>made by people</b>, like toys, windows and bikes."],
      ["Often both", "🔄", "People often use natural materials to make things. A wooden table is made by people from a natural tree."]
    ], ["Was it here in nature, or did a person build it?", "Rocks, trees, shells and sand are natural. Toys, bikes and cups are made by people.", "Example: a flower in the garden is natural. A vase is made by people. Now try yours."], [
      ["Is a rock natural or made by people?", "Natural", "Made by people"], ["Is a plastic toy natural or made by people?", "Made by people", "Natural"],
      ["Is a tree natural or made by people?", "Natural", "Made by people"], ["Is a bicycle natural or made by people?", "Made by people", "Natural"],
      ["Is a seashell natural or made by people?", "Natural", "Made by people"], ["Is a glass cup natural or made by people?", "Made by people", "Natural"],
      ["Is sand natural or made by people?", "Natural", "Made by people"]
    ]),
    les("Cooking changes food", [
      ["Heat changes food", "🍳", "When a grown-up cooks food, heat changes it. A runny egg turns firm."],
      ["Baking", "🍪", "Cookie dough is soft. After baking, it is a crunchy cookie."],
      ["No going back", "➡️", "A baked cookie cannot turn back into dough. Some changes are one-way."]
    ], ["Cooking uses heat to change food.", "Cooked food looks and feels different from before. It cannot go back.", "Example: bread dough turns into bread in the oven. Now try yours."], [
      ["A cooked egg is...", "Firm", "Runny", "Cold and wet"], ["Cookie dough after baking becomes...", "Cookies", "Milk", "Water"],
      ["Can a cooked egg turn back into a raw egg?", "No", "Yes", "Only on weekends"], ["Bread dough baked in an oven turns into...", "Bread", "Juice", "Ice"],
      ["Who should use the oven and stove?", "A grown-up", "A baby", "A pet"], ["Cake batter is runny. After baking it is...", "Solid and spongy", "Still runny", "A gas"],
      ["Toasting bread makes it...", "Crispy and brown", "Wet", "Frozen"]
    ]),
    les("Labels and warnings", [
      ["Labels", "🏷️", "A <b>label</b> tells what is inside a bottle or box and how to use it safely."],
      ["Warnings", "⚠️", "A warning sign means: be careful! Ask a grown-up before you touch it."],
      ["No label?", "🙅", "If a bottle has no label, leave it alone and tell a grown-up."]
    ], ["Labels and warning signs help keep us safe.", "If you are not sure what it is, do not open it, do not taste it. Tell a grown-up.", "Example: a bottle with a warning sign. You leave it and tell a grown-up. Now try yours."], [
      ["A label on a bottle tells you...", "What is inside and how to use it", "How tasty it is", "What color your shoes are"], ["What does a warning sign mean?", "Be careful and ask a grown-up", "Play with it", "Eat it"],
      ["A bottle has no label. What do you do?", "Leave it alone and tell a grown-up", "Open it", "Mix it with another bottle"], ["Where should cleaning sprays be kept?", "Up high or locked away", "On the floor", "In the toy box"],
      ["Can you mix cleaners together?", "No, never", "Yes, to make them stronger", "Yes, if it smells nice"], ["Who reads labels with you?", "A grown-up", "Your teddy bear", "Nobody"],
      ["You spill a liquid you don't know. What do you do?", "Tell a grown-up", "Taste it", "Hide it"]
    ]),
    les("Safe or not safe?", [
      ["Safe choices", "🥽 🧼", "Safe science: wear goggles when a grown-up says, wash hands, and tidy up."],
      ["Not safe", "🔥 🚫", "Touching hot things, playing with matches or tasting mystery stuff are not safe."],
      ["Decide", "🤔", "Ask: could this hurt me? If yes or maybe, stop and ask a grown-up."]
    ], ["Ask yourself: could this hurt me or make me sick?", "Hot things, fire and mystery liquids are not safe. Washing hands and tidying up are safe.", "Example: stirring cold water with a spoon is safe. Touching a hot pan is not. Now try yours."], [
      ["Touching a hot stove: safe or not safe?", "Not safe", "Safe"], ["Washing your hands after science: safe or not safe?", "Safe", "Not safe"],
      ["Tasting a mystery liquid: safe or not safe?", "Not safe", "Safe"], ["Playing with matches: safe or not safe?", "Not safe", "Safe"],
      ["Stirring cold water with a spoon: safe or not safe?", "Safe", "Not safe"], ["Smelling a bottle of unknown cleaner: safe or not safe?", "Not safe", "Safe"],
      ["Wearing goggles when a grown-up says so: safe or not safe?", "Safe", "Not safe"]
    ])
  ];
  b.push(
    mix("Mixed practice", at(b, [0, 1, 2, 5, 8, 12, 15])),
    mix("Level 2 Challenge", at(b, [3, 4, 6, 7, 9, 10, 11, 13, 14, 16, 17]))
  );

  // ================= LEVEL 3 =================
  const c = [
    les("What is matter?", [
      ["Matter", "🪨 💧 💨", "<b>Matter</b> is anything that takes up space. Rocks, water and air are all matter."],
      ["Not matter", "🌑", "A shadow, a dream or an idea is not matter. You cannot hold it or weigh it."],
      ["Three states", "🧊 💧 💨", "Matter comes as a solid, a liquid or a gas. We call these the <b>states of matter</b>."]
    ], ["Matter takes up space and is made of stuff.", "If you can fill a space with it, it is matter. A shadow cannot fill a space.", "Example: a shoe is matter, but its shadow is not. Now try yours."], [
      ["Which one is matter?", "Water", "A shadow", "A dream"], ["Is air matter?", "Yes, it takes up space", "No, it is empty"], ["Is a rock matter?", "Yes", "No"],
      ["Is a shadow matter?", "No", "Yes"], ["Solid, liquid and gas are the three states of...", "Matter", "Music", "Color"], ["Matter takes up...", "Space", "Time only", "Noise"],
      ["Which one does NOT take up space?", "A shadow", "A shoe", "A balloon full of air"]
    ]),
    les("Atoms: tiny building blocks", [
      ["Tiny bits", "🧱", "Everything is built from tiny building blocks called <b>atoms</b>."],
      ["So small", "🔬", "Atoms are far too small to see, even with a magnifying glass. A speck of dust has more atoms than you could count."],
      ["Like LEGO", "🧩", "Think of atoms like tiny bricks. Different bricks join to make rocks, water, air and you!"]
    ], ["Think about tiny bricks that build everything.", "Atoms are very, very small. We cannot see them with our eyes.", "Example: a LEGO castle is made of lots of small bricks. Everything is made of lots of atoms. Now try yours."], [
      ["Everything is built from tiny building blocks called...", "Atoms", "Clouds", "Sounds"], ["Atoms are very...", "Tiny", "Huge", "Loud"], ["Can you see an atom with just your eyes?", "No", "Yes, easily"],
      ["Atoms are like tiny...", "Building bricks", "Balloons", "Shadows"], ["What are rocks, water and air made of?", "Atoms", "Only paint", "Nothing"],
      ["Which is smaller?", "An atom", "A grain of sand", "An ant"], ["How many atoms are in a sandcastle?", "Too many to count", "Two", "Ten"]
    ]),
    les("Molecules", [
      ["Atoms join", "⚛️ + ⚛️", "When atoms stick together, they make a <b>molecule</b>."],
      ["Water", "💧", "A water molecule has <b>3 atoms</b>: two hydrogen atoms and one oxygen atom. We write it <b>H₂O</b>."],
      ["Many molecules", "🌊", "A drop of water has billions and billions of water molecules."]
    ], ["A molecule is made of atoms stuck together.", "Water is made of molecules with hydrogen and oxygen atoms.", "Example: a LEGO bridge is a few bricks stuck together, like a tiny molecule. Now try yours."], [
      ["When atoms stick together they make a...", "Molecule", "Cloud", "Shadow"], ["Water is made of tiny...", "Molecules", "Cookies", "Rocks"], ["How many atoms are in one water molecule?", "3", "1", "10"],
      ["H₂O is the way we write...", "Water", "Air", "Sand"], ["A water molecule has two hydrogen atoms and one...", "Oxygen atom", "Gold atom", "Sand atom"],
      ["Is a molecule made of atoms?", "Yes", "No"], ["A drop of water has...", "Billions of molecules", "Only one molecule", "No molecules"]
    ]),
    les("Solids: packed tight", [
      ["Close together", "🧱🧱🧱", "In a solid, the tiny bits are <b>packed tight</b> and held in place. They only jiggle a little."],
      ["Why it keeps its shape", "📦", "Because the bits stay put, a solid keeps its shape. It does not flow."],
      ["Picture it", "🏫", "Imagine kids sitting still in their desks. That is like a solid."]
    ], ["Think of bits sitting in neat rows, close together.", "A solid's bits are packed tight and stay in place.", "Example: bricks in a wall are packed tight and stay in place, like the bits in a solid. Now try yours."], [
      ["In a solid, the tiny bits are...", "Packed tight", "Far apart", "Flying everywhere"], ["Why does a solid keep its shape?", "Its bits stay close in place", "Its bits fly away", "It is wet"],
      ["The tiny bits in ice...", "Stay close and only jiggle", "Zoom around the room", "Are not there"], ["Which has tightly packed bits?", "A rock", "Air", "Juice"],
      ["Can the bits in a solid slide around freely?", "No", "Yes"], ["Which keeps its shape because its bits are packed tight?", "A toy block", "A puddle", "Air in a room"],
      ["A pillow is soft, but is it a solid?", "Yes", "No, it is a liquid"]
    ]),
    les("Liquids: bits slide", [
      ["Close but sliding", "🌊", "In a liquid the bits are close, but they can <b>slide past</b> each other."],
      ["Why it pours", "🥛", "Because the bits slide, a liquid can pour and take the shape of its cup."],
      ["Picture it", "🏊", "Imagine kids swimming in a pool, close together but moving around. That is like a liquid."]
    ], ["Think of bits that can slide past each other.", "A liquid's bits are close but not stuck in place.", "Example: marbles in a bowl roll over each other, like a liquid's bits. Now try yours."], [
      ["In a liquid the tiny bits...", "Slide past each other", "Are stuck in place", "Are very far apart"], ["Why can you pour water?", "Its bits slide past each other", "Its bits are frozen", "It is a gas"],
      ["A liquid takes the shape of its...", "Container", "Color", "Name"], ["Which has bits that slide?", "Juice", "A brick", "A shoe"], ["Are the bits in a liquid still close together?", "Yes", "No, far apart"],
      ["Which can flow down a slide?", "Honey", "A rock", "A wooden block"], ["Which has bits that can move around but stay close?", "Water", "A coin", "A book"]
    ]),
    les("Gases: bits zoom", [
      ["Far apart", "💨", "In a gas the tiny bits are <b>far apart</b> and zoom around quickly."],
      ["Fills the space", "🎈", "Because they zoom, gas bits spread out to fill any space, like a balloon or a whole room."],
      ["Picture it", "🏃", "Imagine kids running around a big field. That is like a gas."]
    ], ["Think of bits that are far apart and moving fast.", "A gas spreads out to fill whatever space it is in.", "Example: the smell of baking cookies spreads through a house because gas bits zoom around. Now try yours."], [
      ["In a gas the tiny bits are...", "Far apart and zooming", "Packed tight", "Stuck in rows"], ["Why does air fill a whole room?", "Its bits spread out", "Its bits are stuck", "It is a solid"],
      ["A gas fills its...", "Container or space", "Shoe", "Pocket only"], ["Which has bits far apart?", "Air", "A rock", "A cup of juice"], ["Can you squeeze air in a bike pump?", "Yes, the bits get closer", "No, never", "Only on Mondays"],
      ["Why is a balloon round?", "The gas pushes out in every direction", "Gas sits only at the bottom", "It is made of ice"], ["A smell spreads across a room because gas bits...", "Zoom around", "Stay still", "Freeze"]
    ]),
    les("When does water freeze?", [
      ["Freezing point", "🧊", "Water freezes into ice at <b>0 °C</b> (that is 32 °F)."],
      ["Boiling point", "♨️", "Water boils into water vapor at <b>100 °C</b> (that is 212 °F). It is very hot, so only a grown-up should handle it."],
      ["Thermometer", "🌡️", "A <b>thermometer</b> measures how hot or cold something is."]
    ], ["Water freezes when it is very cold, and boils when it is very hot.", "Freezing is at 0 degrees C. Boiling is at 100 degrees C.", "Example: air at 20 °C is warm, so a puddle will not freeze. Now try yours."], [
      ["Water freezes at about...", "0 °C (32 °F)", "50 °C (122 °F)", "100 °C (212 °F)"], ["Water boils at about...", "100 °C (212 °F)", "0 °C (32 °F)", "20 °C (68 °F)"],
      ["What tool measures how hot or cold?", "Thermometer", "Ruler", "Scale"], ["Is 0 °C hot or cold?", "Cold", "Hot"], ["Will a puddle freeze at 20 °C?", "No", "Yes"],
      ["Ice melts when it gets...", "Warmer than 0 °C", "Colder than 0 °C", "Louder"], ["Which is hotter?", "100 °C", "0 °C"]
    ]),
    les("Water vapor and drops", [
      ["Gas to liquid", "💨 ➡️ 💧", "When water vapor touches something cold, it turns back into tiny drops of water. This is called <b>condensation</b>."],
      ["Cold glass", "🥛", "Drops form on the outside of a cold glass. They come from water vapor in the air."],
      ["Clouds and fog", "☁️", "Clouds and fog are made of tiny drops of water floating in the air."]
    ], ["Cold things make water vapor turn into drops.", "Condensation is a gas turning into a liquid.", "Example: a bathroom mirror gets foggy when warm wet air touches it. Now try yours."], [
      ["Water vapor touching a cold glass turns into...", "Water drops", "Ice cubes", "Sand"], ["Drops on a cold glass come from water vapor in the...", "Air", "Glass", "Table"],
      ["Condensing means a gas turning into a...", "Liquid", "Solid rock", "Shadow"], ["Fog and clouds are made of tiny...", "Water drops", "Rocks", "Sand"],
      ["Why does a mirror fog when you breathe on it?", "Water vapor in your breath turns to drops", "The mirror melts", "The mirror grows"], ["Evaporation is liquid turning into a...", "Gas", "Rock", "Solid"],
      ["Who should be near hot steam from a kettle?", "A grown-up", "A little kid", "A pet"]
    ]),
    les("Changes that can be undone", [
      ["Reversible", "🔄", "A <b>reversible</b> change can be undone. Melted ice can freeze again."],
      ["Examples", "🧊 🧈", "Melting ice, freezing juice and melting butter can all be undone by cooling or warming."],
      ["Same stuff", "✅", "In these changes the stuff is still the same. It just changed form."]
    ], ["Ask: can I get back to how it started?", "Melting and freezing can be undone. Water is still water.", "Example: melted chocolate cools back into hard chocolate. Now try yours."], [
      ["Melting ice: can it be undone?", "Can be undone", "Can't be undone"], ["Baking a cake: can it be undone?", "Can't be undone", "Can be undone"], ["Freezing juice: can it be undone?", "Can be undone", "Can't be undone"],
      ["Toasting bread: can it be undone?", "Can't be undone", "Can be undone"], ["Cooking an egg: can it be undone?", "Can't be undone", "Can be undone"],
      ["Melting butter and letting it cool: can it be undone?", "Can be undone", "Can't be undone"], ["Popping popcorn: can it be undone?", "Can't be undone", "Can be undone"]
    ]),
    les("Changes that cannot be undone", [
      ["New stuff", "🍰", "When you bake, a new thing is made. Cake batter cannot be turned back from a cake."],
      ["One-way", "➡️", "A cooked egg cannot become raw. Burnt toast cannot become bread again."],
      ["Look for new", "🔍", "If a change makes something brand new, it usually cannot be undone."]
    ], ["Ask: can I get the old thing back?", "Cooking, baking and burning make new things. You cannot go back.", "Example: cookie dough baked into cookies cannot go back to dough. Now try yours."], [
      ["Which change can NOT be undone?", "Baking cookies", "Melting ice", "Freezing water"], ["A fried egg can't turn back into...", "A raw egg", "Water", "Ice"],
      ["After baking, can a cake turn back into batter?", "No", "Yes"], ["Which change makes something new?", "Cooking an egg", "Freezing water", "Melting ice"], ["Burnt toast can't go back to...", "Bread", "Water", "Ice"],
      ["Which is one-way?", "Popping popcorn", "Melting ice", "Freezing juice"], ["Which can be undone?", "Freezing water", "Baking a cake", "Frying an egg"]
    ]),
    les("Rust", [
      ["What is rust?", "🔩", "<b>Rust</b> is a flaky orange-brown stuff that forms on old iron when it stays wet."],
      ["How it forms", "💧 + 💨", "Iron touches <b>water</b> and <b>air</b> for a long time and slowly turns to rust."],
      ["Stop rust", "🎨", "Paint, oil and keeping things dry help stop rust. Plastic and wood do not rust."]
    ], ["Rust is a slow change in iron or steel.", "Rust needs water and air. It makes metal look orange-brown.", "Example: a bike left in the rain all winter gets rusty spots. Now try yours."], [
      ["Rust is the orange-brown stuff on old...", "Iron", "Plastic", "Wood"], ["What makes iron rust?", "Water and air", "Music", "Cold only"], ["Does a plastic toy rust?", "No", "Yes"],
      ["Which can rust?", "An iron nail", "A plastic spoon", "A wooden block"], ["How can we stop a bike from rusting?", "Keep it dry or paint it", "Leave it in the rain", "Put it in the pool"],
      ["A shiny nail left in the rain for months turns...", "Orange-brown", "Blue", "Clear"], ["Is rusting a change that can be undone?", "No", "Yes"]
    ]),
    les("Mixtures", [
      ["A mixture", "🥗", "A <b>mixture</b> is two or more things mixed together. A fruit salad is a mixture."],
      ["Still themselves", "🍓 🍌", "In a mixture each thing keeps its own properties. You can pick the strawberries out."],
      ["Salt water", "🧂 💧", "Salt dissolved in water is a mixture too. If the water dries up, the salt is left behind."]
    ], ["Ask: can I tell the different things apart or get them back?", "A mixture keeps each thing the same. Dissolved salt is still salt.", "Example: trail mix has nuts and raisins you can pick out. It is a mixture. Now try yours."], [
      ["Trail mix is a...", "Mixture", "Single rock", "Pure gas"], ["Can you pick raisins out of trail mix?", "Yes", "No"], ["Which is a mixture?", "A fruit salad", "A single rock", "A lone marble"],
      ["Salt dissolved in water is...", "A mixture", "Not a mixture", "A solid rock"], ["When salt water dries up, what is left?", "Salt", "Sand", "Sugar"], ["In a mixture, each thing keeps its...", "Own properties", "Same name only", "Weight of a feather"],
      ["Sand stirred in water is a...", "Mixture", "Single material", "Gas"]
    ]),
    les("Separating mixtures", [
      ["Sieve", "🥣", "A <b>sieve</b> has holes. Small bits fall through. Big bits stay on top."],
      ["Magnet", "🧲", "A <b>magnet</b> can pull out iron and steel things, like paper clips, from sand."],
      ["Filter and dry", "☕", "A filter catches bits but lets water through. Letting water <b>evaporate</b> leaves the salt behind."]
    ], ["Pick a tool that matches the kind of mixture.", "Sieve = big and small bits. Magnet = iron or steel bits. Filter = bits in water.", "Example: to get big stones out of sand, use a sieve. Now try yours."], [
      ["To separate rocks from sand use a...", "Sieve", "Spoon only", "Blanket"], ["To pull paper clips out of sand use a...", "Magnet", "Sieve only", "Candle"],
      ["A coffee filter lets water through but not...", "Coffee grounds", "Water", "Air"], ["To get salt from salt water you can let the water...", "Evaporate", "Freeze forever", "Turn green"],
      ["Which tool separates big pieces from small ones?", "A sieve", "A thermometer", "A ruler"], ["Which can a magnet pick up?", "An iron nail", "A plastic spoon", "A wooden block"],
      ["Picking beads out of a bowl of rice is separating by...", "Hand", "Fire", "Rust"]
    ]),
    les("Air takes up space", [
      ["Air is stuff", "🎈", "Air is matter. When you blow up a balloon, the air inside takes up space and makes it big."],
      ["Not empty", "🍼", "An empty bottle is not really empty. It is full of air."],
      ["Feel it", "🌬️", "Wind is moving air. A bike tire is hard because it is full of air."]
    ], ["Air is matter, so it takes up space.", "A balloon grows because air fills it.", "Example: a football is hard because it is full of air. Now try yours."], [
      ["A balloon gets bigger when you blow in air because air takes up...", "Space", "Time", "Sound"], ["An 'empty' bottle is full of...", "Air", "Sand", "Water always"],
      ["A bike tire is full of...", "Air", "Sand", "Milk"], ["Wind is moving...", "Air", "Water only", "Rock"], ["Is air matter?", "Yes", "No"],
      ["What fills a beach ball?", "Air", "Honey", "Paint"], ["Squeezing a closed bag full of air, you feel it...", "Push back", "Disappear", "Turn to ice"]
    ]),
    les("Comparing properties", [
      ["Compare", "⚖️", "We can compare things by their properties: harder or softer, heavier or lighter."],
      ["Use the word", "📏", "Words like harder, softer, heavier and lighter help scientists describe things."],
      ["Test it", "🧪", "To compare fairly, test both things the same way."]
    ], ["Picture both things side by side.", "Pick the one that has MORE of the property in the question.", "Example: a rock is harder than a sponge. Now try yours."], [
      ["Which is harder?", "A piece of wood", "A cotton ball", "A marshmallow"], ["Which is heavier?", "A bowling ball", "A ping pong ball", "A feather"],
      ["Which is more see-through?", "A glass window", "A wooden door", "A brick wall"], ["Which is softer?", "A pillow", "A brick", "A metal bar"], ["Which is more bendy?", "A rubber band", "A ruler", "A rock"],
      ["Which would sink?", "An iron nail", "A cork", "A dry leaf"], ["Which is lighter?", "A feather", "A rock", "A brick"]
    ]),
    les("Air and oxygen", [
      ["A mix of gases", "💨", "Air is a mixture of gases. One of them is <b>oxygen</b>."],
      ["We need it", "🫁", "We breathe in oxygen with our lungs. We need it to live."],
      ["Plants help", "🌱", "Plants make oxygen when they use sunlight, water and air to make their food."]
    ], ["Air has a gas in it that helps us live.", "Plants make oxygen. We breathe it in.", "Example: a forest has lots of green plants that make oxygen for us to breathe. Now try yours."], [
      ["We breathe in a part of air called...", "Oxygen", "Rock", "Paint"], ["Plants give us...", "Oxygen", "Plastic", "Metal"], ["Is air a mixture of gases?", "Yes", "No"],
      ["Where does the air go when you breathe in?", "Your lungs", "Your toes", "Your ears"], ["Which do we need to live?", "Air", "Candy", "Toys"], ["Plants make oxygen using sunlight, water and...", "Air", "Sand", "Plastic"],
      ["Which is a gas in the air that we need?", "Oxygen", "Gold", "Iron"]
    ]),
    les("Science safety rules", [
      ["Goggles", "🥽", "Eye goggles protect your eyes. Wear them when a grown-up tells you."],
      ["Hair and hands", "🧼", "Tie long hair back. Wash your hands with soap after science."],
      ["Golden rules", "📜", "Never taste. Never mix unknown things. Ask a grown-up. Clean up spills."]
    ], ["Science safety keeps you and others safe.", "Goggles for eyes. Tie back long hair. Wash hands. Ask a grown-up.", "Example: you finish an activity, so you wash your hands. Now try yours."], [
      ["What do goggles protect?", "Your eyes", "Your toes", "Your ears"], ["What should you do with long hair in science?", "Tie it back", "Dip it in", "Cut it with scissors"], ["When do you wash your hands?", "After science", "Never", "Only on holidays"],
      ["Who helps with hot things?", "A grown-up", "A pet", "A toy"], ["Do you taste unknown things in science?", "Never", "Always", "Only when it's blue"], ["Do you mix unknown things together?", "Never", "Always"],
      ["You spill something. What do you do?", "Tell a grown-up and clean up", "Hide it", "Run away"]
    ]),
    les("Think like a scientist", [
      ["Observe", "🔍", "Scientists <b>observe</b>, which means they look closely and notice things."],
      ["Predict", "💭", "A <b>prediction</b> is a guess about what will happen. Then you test it."],
      ["Tools", "🌡️ ⚖️ 📏", "A thermometer measures hot and cold. A scale measures how heavy. A ruler measures length."]
    ], ["Scientists look, guess, test and write down what happened.", "A thermometer, scale and ruler each measure something different.", "Example: you guess an apple will float, then test it in water. Now try yours."], [
      ["Looking closely and noticing is called...", "Observing", "Sleeping", "Singing"], ["A prediction is a guess about what will...", "Happen", "Rhyme", "Smell"], ["A magnifying glass helps you...", "See small things", "Hear far sounds", "Jump high"],
      ["Which tool measures temperature?", "Thermometer", "Ruler", "Scale"], ["Which tool measures how heavy?", "Scale", "Ruler", "Thermometer"], ["Which tool measures length?", "Ruler", "Scale", "Thermometer"],
      ["After a test, scientists...", "Write down what they saw", "Throw away the notes", "Forget it"]
    ])
  ];
  c.push(
    mix("Mixed practice", at(c, [3, 4, 5, 6, 7, 11])),
    mix("Level 3 Challenge", at(c, [0, 1, 2, 8, 9, 10, 12, 13, 14, 15, 16, 17]))
  );

  return { 1: a, 2: b, 3: c };
})();
