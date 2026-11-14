// ext/engineer-13-15.js  Engineering levels 13-15 (6th grade, 7th grade first half)
(() => {
  const les = (title, slides, hints, items) => {
    const make = () => {
      const it = pick(items), parts = it[0].split("§");
      return { text: parts[parts.length - 1], visual: parts.length > 1 ? parts[0] : undefined, choices: shuf(it.slice(1)), answer: it[1], hints };
    };
    make.teach = () => slides.map(s => ({ h: s[0], v: s[1], t: s[2] }));
    make.slide = slides[0];
    return { title, make };
  };
  const gen = (title, slides, g) => {
    const make = () => { const q = g(); return { text: q.text, visual: q.visual, textInput: q.textInput, answer: q.answer, choices: q.choices ? shuf(q.choices) : undefined, hints: q.hints }; };
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
    return { title, make };
  };
  const at = (arr, idx) => idx.map(i => arr[i]);

  // ================= LEVEL 13 =================
  const a = [
    les("Systems and subsystems", [
      ["A system", "🧩", "A <b>system</b> is a group of parts that work together to reach a goal. A bicycle, a robot and a school bus are all systems."],
      ["Subsystems", "🚌", "A big system is made of smaller systems called <b>subsystems</b>. A bus has a steering subsystem, a braking subsystem and an engine subsystem."],
      ["Why it helps", "🔍", "Engineers design and test each subsystem on its own first. Then it is easier to find problems before the whole machine is put together."]
    ], ["Think about parts that work together toward one goal.", "A subsystem is a smaller system that lives inside a bigger one.", "Example: a bike's brakes, gears and steering are subsystems of the bike. Now try yours."], [
      ["A system is...", "Parts that work together toward a goal", "One single part", "A pile of unrelated things"],
      ["A car's braking system is a ___ of the whole car.", "Subsystem", "Material", "Tool"],
      ["Which is a subsystem of a robot?", "Its battery and power parts", "A mountain", "A cloud"],
      ["If one important part of a system breaks, the whole system may...", "Stop working properly", "Get faster", "Turn into a subsystem"],
      ["Engineers test each subsystem alone first so they can...", "Find problems more easily", "Skip the final test", "Make it heavier"],
      ["Which is a whole system made of subsystems?", "A robot vacuum", "One screw", "A single wire"],
      ["A phone's battery, screen and camera are...", "Subsystems working together", "Unrelated objects", "Only decorations"],
      ["A school bus has steering and braking. These are...", "Subsystems of the bus", "Whole systems with no parts", "Building materials"]
    ]),
    les("Inputs, processes, outputs", [
      ["Three steps", "➡️", "Many machines follow <b>input → process → output</b>. Input is what goes in, the process changes it, and the output is what comes out."],
      ["A toaster", "🍞", "A toaster: bread and electricity go in (input), heating happens (process), toast comes out (output)."],
      ["A robot", "🤖", "A robot reads a sensor (input), decides what to do in its program (process), and moves a motor (output)."]
    ], ["Ask: is it going in, being changed, or coming out?", "Sensors and buttons are inputs. Motors, lights and speakers are outputs.", "Example: in a doorbell, pressing the button is the input and the chime is the output. Now try yours."], [
      ["A toaster's output is...", "Toasted bread", "Plain bread slices", "The wall socket"],
      ["A sensor on a robot is part of its...", "Input", "Output", "Packaging"],
      ["A motor that spins the wheels is an...", "Output", "Input", "Ingredient"],
      ["Deciding what to do with sensor readings is the...", "Process", "Input", "Output"],
      ["A smoke alarm: smoke reaching it and the loud beep are the...", "Input, then the output", "Output, then the input", "Process, then the input"],
      ["A blender: fruit goes in. The spinning blades are the...", "Process", "Input", "Output"],
      ["A keyboard key press is an...", "Input", "Output", "Process"],
      ["A speaker playing a sound is an...", "Output", "Input", "Power source"]
    ]),
    les("Views of a design", [
      ["Different sides", "📐", "Engineers draw a design from several sides: the <b>top view</b>, the <b>front view</b> and the <b>side view</b>."],
      ["Shapes change", "🥫", "A can looks like a circle from the top, but like a rectangle from the front or side."],
      ["Why many views?", "🏠", "One view can hide details. Using several views shows every side so builders know exactly what to make."]
    ], ["Picture yourself looking at the object from that direction.", "Flat faces look like their outline when you face them straight on.", "Example: a box of cereal looks like a rectangle from the front, and a long thin rectangle from above. Now try yours."], [
      ["Looking at a house from above shows its...", "Top view", "Front view", "Side view"],
      ["A drawing of what you see looking straight at the front is the...", "Front view", "Top view", "Underground view"],
      ["Why do engineers draw several views?", "One view cannot show every side", "It makes drawings smaller", "Only to use more colors"],
      ["A can seen from directly above looks like a...", "Circle", "Rectangle", "Triangle"],
      ["A can seen from the side looks like a...", "Rectangle", "Circle", "Triangle"],
      ["A cube seen straight from the front looks like a...", "Square", "Circle", "Triangle"],
      ["A cone standing on its flat end, seen from the side, looks like a...", "Triangle", "Circle", "Square"],
      ["A ball seen from any direction looks like a...", "Circle", "Square", "Triangle"]
    ]),
    gen("Around a wheel", [
      ["Circumference", "⭕", "The <b>circumference</b> is the distance around a circle. The <b>diameter</b> is the distance straight across through the middle."],
      ["The rule", "🛞", "Circumference = π × diameter. For π use about 3.14. A wheel with a diameter of 10 cm has a circumference of about 31.4 cm."],
      ["Radius", "📏", "The <b>radius</b> is half of the diameter. So the diameter is 2 × the radius."]
    ], () => {
      const d = pick([50, 100, 150, 200]), C = Math.round(d * 3.14);
      return pick([
        { text: `A robot wheel has a diameter of ${d} cm. How long is its circumference in cm? (Use 3.14 for π.)`, visual: "🛞", answer: C, hints: ["The circumference is the distance around the wheel.", "Multiply the diameter by pi, which is a little more than three.", "Example: diameter 20 cm gives 20 x 3.14 = 62.8 cm. Now do yours."] },
        { text: `A wheel has a radius of ${d / 2} cm. How long is its circumference in cm? (Use 3.14 for π.)`, visual: "🎡", answer: C, hints: ["You are given the radius, not the diameter.", "Double the radius first to get the width across, then multiply by pi.", "Example: radius 10 cm means diameter 20 cm, and 20 x 3.14 = 62.8 cm. Now do yours."] },
        { text: `A circular track has a circumference of ${C} cm. What is its diameter in cm? (Use 3.14 for π.)`, visual: "🏁", answer: d, hints: ["Undo the rule: circumference = pi x diameter.", "Divide the circumference by pi (a little more than three).", "Example: a circumference of 62.8 cm gives 62.8 / 3.14 = 20 cm. Now do yours."] }
      ]);
    }),
    gen("Wheel turns and distance", [
      ["One turn", "🛞", "In one full turn, a wheel rolls forward a distance equal to its circumference."],
      ["Many turns", "🔢", "Distance = number of turns × circumference. A wheel with a circumference of 30 cm that turns 4 times rolls 4 × 30 = 120 cm."],
      ["Working backward", "↩️", "To find how many turns are needed, divide the distance by the circumference."]
    ], () => {
      const d = pick([50, 100]), C = Math.round(d * 3.14), n = ri(2, 9);
      return pick([
        { text: `A robot wheel has a circumference of ${C} cm. It makes ${n} full turns. How far does the robot roll, in cm?`, visual: "🤖", answer: C * n, hints: ["Each turn rolls the robot forward by one circumference.", "Multiply the circumference by the number of turns.", "Example: a circumference of 40 cm and 3 turns is 3 x 40 = 120 cm. Now do yours."] },
        { text: `A wheel with a circumference of ${C} cm must roll ${C * n} cm. How many full turns is that?`, visual: "🛞", answer: n, hints: ["The distance is made of equal steps, one per turn.", "Divide the total distance by the distance of one turn.", "Example: 150 cm with a circumference of 30 cm is 150 / 30 = 5 turns. Now do yours."] },
        { text: `A wheel has a diameter of ${d} cm. About how far does it roll in ${n} turns, in cm? (Use 3.14 for π.)`, visual: "🚲", answer: C * n, hints: ["First find how far one turn goes.", "One turn is pi times the diameter. Then multiply by the number of turns.", "Example: diameter 10 cm gives 31.4 cm a turn, so 2 turns is 62.8 cm. Now do yours."] }
      ]);
    }),
    gen("Surface area of a box", [
      ["Six faces", "📦", "A box has 6 faces: top and bottom, front and back, left and right. The <b>surface area</b> is the area of all the faces added together."],
      ["The recipe", "🧮", "For a box with length l, width w and height h: surface area = 2 × (l×w + l×h + w×h)."],
      ["Why it matters", "🎨", "Engineers use surface area to know how much paint, wrapping or metal sheet a part needs."]
    ], () => {
      const l = ri(2, 9), w = ri(2, 9), h = ri(2, 9), s = ri(2, 12);
      return pick([
        { text: `A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its surface area in square cm?`, visual: "📦", answer: 2 * (l * w + l * h + w * h), hints: ["Find the area of each pair of matching faces.", "Add length x width, length x height and width x height, then double the total.", "Example: a 2 by 3 by 4 box: 2 x (6 + 8 + 12) = 52 square cm. Now do yours."] },
        { text: `How many square cm of wrapping paper cover a cube with edges of ${s} cm? (A cube has 6 equal square faces.)`, visual: "🎁", answer: 6 * s * s, hints: ["All the faces of a cube are the same square.", "Find the area of one face, then multiply by the number of faces.", "Example: a cube with edges of 5 cm has faces of 25, so 6 x 25 = 150 square cm. Now do yours."] },
        { text: `The top face of a box is ${l} cm by ${w} cm. The bottom is identical. What is the area of the top and bottom together, in square cm?`, visual: "🧱", answer: 2 * l * w, hints: ["The top and bottom are two matching rectangles.", "Find the area of one rectangle and double it.", "Example: a top of 3 by 5 has area 15, so top and bottom make 30. Now do yours."] }
      ]);
    }),
    gen("Triangle areas", [
      ["Half a rectangle", "🔺", "A triangle is half of a rectangle with the same base and height. Area of a triangle = base × height ÷ 2."],
      ["Height", "📏", "The <b>height</b> is measured straight up at a right angle to the base, not along the slanted side."],
      ["Put together", "🏠", "A roof end is a triangle on top of a rectangle. Add the two areas to find the whole shape."]
    ], () => {
      const b = 2 * ri(2, 9), h = ri(3, 12), w = 2 * ri(2, 8), l = ri(3, 9), t = ri(2, 8);
      return pick([
        { text: `A triangle has a base of ${b} cm and a height of ${h} cm. What is its area in square cm?`, visual: "🔺", answer: b * h / 2, hints: ["A triangle fills half of the rectangle around it.", "Multiply the base by the height, then cut in half.", "Example: base 6 and height 5 gives 6 x 5 / 2 = 15 square cm. Now do yours."] },
        { text: `A triangular sail has an area of ${b * h / 2} square cm and a base of ${b} cm. What is its height in cm?`, visual: "⛵", answer: h, hints: ["Area = base x height / 2, so the height is missing.", "Double the area first, then divide by the base.", "Example: area 12 and base 6 means 24 / 6 = 4 cm. Now do yours."] },
        { text: `A shape is a rectangle ${l} cm by ${w} cm with a triangle on top. The triangle has a base of ${w} cm and a height of ${t} cm. What is the total area in square cm?`, visual: "🏠", answer: l * w + w * t / 2, hints: ["Find the area of the rectangle and of the triangle separately.", "Then add the two areas together.", "Example: a 3 by 4 rectangle (12) plus a triangle with base 4 and height 2 (4) is 16. Now do yours."] }
      ]);
    }),
    gen("Writing a formula", [
      ["Variables", "🔤", "A <b>formula</b> uses a letter for a number that can change. If a kit costs $20 plus $5 for each extra part p, then cost = 20 + 5p."],
      ["Use it", "🧮", "Put a number in for the letter. With p = 4 extra parts: cost = 20 + 5 × 4 = 40 dollars."],
      ["Solve backward", "↩️", "If you know the cost, undo the steps: subtract the starting fee, then divide by the price of each part."]
    ], () => {
      const f = ri(10, 30), r = ri(2, 9), n = ri(3, 12), C = f + r * n;
      return pick([
        { text: `A robot kit costs $${f} to start plus $${r} for each extra part. How much do ${n} extra parts cost in all, with the starting fee?`, visual: "🤖", answer: C, hints: ["Some of the cost is charged once, and some is charged for each part.", "Multiply the price of each part by the number of parts, then add the starting fee.", "Example: $10 start and $3 each for 4 parts is 10 + 3 x 4 = 22. Now do yours."] },
        { text: `A rental charges $${f} plus $${r} for each hour. The bill was $${C}. For how many hours was it rented?`, visual: "⏱️", answer: n, hints: ["First remove the part of the bill that is charged only once.", "Divide what is left by the price for one hour.", "Example: a $26 bill with $8 start and $3 an hour: 18 / 3 = 6 hours. Now do yours."] },
        { text: `A kit costs $${f} to start plus $${r} for each part p. Which formula gives the cost C?`, visual: "🧾", choices: [`C = ${f} + ${r}p`, `C = ${f}p + ${r}`, `C = ${f + r}p`], answer: `C = ${f} + ${r}p`, hints: ["Which number is paid once, and which is paid for every part?", "The number next to the letter p is the price for each part.", "Example: $9 to start and $2 a part is C = 9 + 2p. Now do yours."] }
      ]);
    }),
    gen("Above and below zero", [
      ["Negative numbers", "🌡️", "Numbers below zero are <b>negative</b>. Engineers use them for depth below sea level, for cold temperatures and for moves backward."],
      ["The number line", "↔️", "On a number line, numbers to the left are smaller. So -8 is colder than -3, and -3 is colder than 0."],
      ["Distance", "🌊", "To find how far apart a point above zero and a point below zero are, add the two distances."]
    ], () => {
      const x = ri(5, 30), y = ri(2, x - 2), up = ri(10, 60), dn = ri(10, 60);
      const t = shuf([-ri(1, 9), -ri(10, 20), ri(1, 9), 0, -ri(21, 30)]).filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 3);
      const cold = Math.min(...t);
      return pick([
        { text: `A submarine is at -${x} m (${x} m below sea level). It rises ${y} m. Where is it now?`, visual: "🌊", choices: [`-${x - y} m`, `-${x + y} m`, `${x + y} m`], answer: `-${x - y} m`, hints: ["Rising moves the submarine closer to zero.", "Is the submarine still below sea level after a smaller rise?", "Example: at -9 m rising 4 m puts you at -5 m. Now do yours."] },
        { text: `A drone is ${up} m above sea level and a diver is ${dn} m below sea level. How many meters apart are they?`, visual: "🚁", answer: up + dn, hints: ["One is above zero and one is below zero.", "Add the two distances together.", "Example: 12 m above and 7 m below are 12 + 7 = 19 m apart. Now do yours."] },
        { text: `Three freezer sensors read ${t.join(" °C, ")} °C. Which reading is the coldest?`, visual: "🥶", choices: t.map(v => `${v} °C`), answer: `${cold} °C`, hints: ["On the number line, smaller numbers are further left and colder.", "A negative number with a bigger digit is colder than one with a smaller digit.", "Example: of -2, -9 and 3, the coldest is -9 because it is furthest left. Now do yours."] }
      ]);
    }),
    gen("Ratios in mixes", [
      ["A ratio", "🥣", "A <b>ratio</b> compares amounts. A paint mix of 2 parts blue to 3 parts white is the ratio 2 : 3."],
      ["Scale it up", "✖️", "Multiply both sides by the same number to make more. 4 cups of blue go with 6 cups of white (that is 2 : 3 twice)."],
      ["Whole mix", "🧮", "Add the parts to find the total. In the 2 : 3 mix, there are 2 + 3 = 5 parts in all."]
    ], () => {
      const p = ri(1, 4), q = pick([2, 3, 4, 5, 6].filter(x => x !== p)), k = ri(2, 8);
      return pick([
        { text: `A mix uses ${p} part blue to ${q} parts white. If you use ${p * k} cups of blue, how many cups of white do you need?`, visual: "🎨", answer: q * k, hints: ["Find how many times the blue part was made bigger.", "Multiply the white part of the ratio by that same number.", "Example: a 2 : 3 mix with 6 blue is made 3 times as big, so white is 3 x 3 = 9. Now do yours."] },
        { text: `A mix is ${p} part cement to ${q} parts sand. You make ${(p + q) * k} buckets in all. How many buckets are cement?`, visual: "🪣", answer: p * k, hints: ["First count the parts in the whole ratio.", "Divide the total by the parts in the ratio to find one share, then multiply by the cement parts.", "Example: a 2 : 3 mix of 20 buckets has 20 / 5 = 4 per part, so 2 parts is 8. Now do yours."] },
        { text: `A mix uses ${p} part blue to ${q} parts white. How many parts are in the whole mix?`, visual: "🥣", answer: p + q, hints: ["The whole mix is made of both colors.", "Add the two numbers of the ratio.", "Example: a 2 : 5 mix has 2 + 5 = 7 parts. Now do yours."] }
      ]);
    }),
    gen("Bits, bytes and storage", [
      ["Bits and bytes", "💾", "A <b>bit</b> is a 0 or a 1. A <b>byte</b> is 8 bits. Files are measured in kilobytes (KB), megabytes (MB) and gigabytes (GB)."],
      ["Steps up", "🔼", "1 GB is about 1000 MB, and 1 MB is about 1000 KB. Each step up is 1000 times bigger."],
      ["How many fit?", "📷", "To find how many files fit on a card, divide the card size by the size of one file."]
    ], () => {
      const s = pick([2, 4, 5, 8, 10, 20, 25, 50]), G = ri(1, 8), n = ri(2, 30), by = ri(2, 20);
      return pick([
        { text: `Each photo is ${s} MB. How many photos fit on a ${G} GB memory card? (1 GB = 1000 MB.)`, visual: "📷", answer: G * 1000 / s, hints: ["First change the card size into the same unit as the photo.", "Then divide the card size in MB by the size of one photo.", "Example: a 1 GB card (1000 MB) holds 1000 / 10 = 100 photos of 10 MB. Now do yours."] },
        { text: `A sensor sends ${by} bytes every reading. How many bits is that? (1 byte = 8 bits.)`, visual: "📡", answer: by * 8, hints: ["Every byte contains the same number of bits.", "Multiply the number of bytes by eight.", "Example: 5 bytes make 5 x 8 = 40 bits. Now do yours."] },
        { text: `A robot saves ${n} log files of ${s} KB each. How many KB is that in total?`, visual: "🗂️", answer: n * s, hints: ["The files are all the same size.", "Multiply the number of files by the size of one file.", "Example: 6 files of 4 KB is 6 x 4 = 24 KB. Now do yours."] }
      ]);
    }),
    les("How data travels", [
      ["Packets", "📦", "When you send data over the internet, it is chopped into small <b>packets</b>. Each packet has an address label."],
      ["Routers", "🧭", "<b>Routers</b> read the labels and pass each packet along. Packets can take different paths and still arrive."],
      ["Put back together", "🧩", "At the end, the packets are put back in the right order. If one is lost, only that packet is sent again."]
    ], ["Think about sending a big thing in many small parcels.", "Each parcel has a label and finds its own way.", "Example: mailing a long story as numbered pages in separate envelopes works the same way. Now try yours."], [
      ["Data sent online is split into small...", "Packets", "Cakes", "Pillows"],
      ["Different packets of one message can take...", "Different routes", "No route at all", "Exactly the same path always"],
      ["When packets arrive, they are...", "Put back in the right order", "Thrown away", "Mixed up forever"],
      ["A router...", "Passes packets toward their destination", "Cooks food", "Paints walls"],
      ["An IP address is like...", "A street address for a device", "A pet's name", "A game score"],
      ["Why send data in packets?", "If one is lost only it is sent again", "So files get bigger", "To use more paper"],
      ["Home Wi-Fi sends data using...", "Radio waves", "Sound waves", "Smells"],
      ["A safe habit online is to...", "Never share private information", "Share passwords with friends", "Click every link"]
    ]),
    gen("Sorting step by step", [
      ["Sorting", "🔢", "An <b>algorithm</b> is a list of steps. <b>Bubble sort</b> puts a list in order by comparing two neighbors at a time."],
      ["One pass", "👉", "Start at the left. If the left number is bigger than its right neighbor, swap them. Then move one place right and repeat to the end."],
      ["Biggest at the end", "📈", "After one full pass, the biggest number has bubbled to the last place. Example: 3 1 2 becomes 1 2 3 after swapping 3 and 1, then 3 and 2."]
    ], () => {
      let arr, res, swaps;
      for (;;) {
        arr = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 5);
        res = arr.slice(); swaps = 0;
        for (let i = 0; i < 4; i++) if (res[i] > res[i + 1]) { const t = res[i]; res[i] = res[i + 1]; res[i + 1] = t; swaps++; }
        const sorted = arr.slice().sort((x, y) => x - y);
        const cand = [...new Set([arr.join(" "), sorted.join(" "), arr.slice().reverse().join(" "), res.slice().reverse().join(" ")])].filter(c => c !== res.join(" "));
        if (swaps > 0 && cand.length >= 2) {
          const wrong = shuf(cand).slice(0, 2);
          return pick([
            { text: `Do ONE pass of bubble sort (left to right, swap when the left is bigger) on: ${arr.join(" ")}. How many swaps happen?`, visual: "🫧", answer: swaps, hints: ["Compare each neighbor pair once, moving left to right.", "Count a swap only when the left number is bigger than the right one. Remember the list changes after each swap.", "Example: 4 2 3: swap 4 and 2 gives 2 4 3, then swap 4 and 3 gives 2 3 4. That is 2 swaps. Now do yours."] },
            { text: `Do ONE pass of bubble sort (left to right, swap when the left is bigger) on: ${arr.join(" ")}. What does the list look like after the pass?`, visual: "🫧", choices: [res.join(" "), ...wrong], answer: res.join(" "), hints: ["Compare the first two, then slide one place right and compare again.", "A big number keeps getting swapped to the right until it meets a bigger one.", "Example: 3 1 2 becomes 1 3 2 after the first compare, then 1 2 3 after the second. Now do yours."] },
            { text: `After one full pass of bubble sort on ${arr.join(" ")}, which number is surely in the last place?`, visual: "🫧", answer: Math.max(...arr), hints: ["One pass carries one special number all the way to the end.", "It is the largest number in the list.", "Example: in 2 9 4, the 9 bubbles to the end to give 2 4 9. Now do yours."] }
          ]);
        }
      }
    }),
    les("Metals and alloys", [
      ["Alloys", "🔩", "An <b>alloy</b> is a metal mixed with other elements to make it better. Steel is iron with a little carbon. Bronze is copper with tin. Brass is copper with zinc."],
      ["Rust", "🟤", "Iron rusts when it meets oxygen and water. Stainless steel has chromium added, which helps it resist rust."],
      ["Good choices", "✈️", "Aluminum is light and fairly strong, so it is used in planes and cans. Copper carries electricity well, so it is used in wires."]
    ], ["Think about what each metal is good at.", "Alloys are mixtures made to improve a metal.", "Example: brass is copper mixed with zinc, so it is an alloy. Now try yours."], [
      ["An alloy is a metal mixed with...", "Other elements, often other metals", "Only water", "Only air"],
      ["Steel is mostly iron plus a little...", "Carbon", "Silver", "Helium"],
      ["Bronze is copper mixed with...", "Tin", "Gold", "Wood"],
      ["Brass is copper mixed with...", "Zinc", "Tin", "Sand"],
      ["Iron rusts when it meets oxygen and...", "Water", "Sand", "Rubber"],
      ["Stainless steel resists rust because it contains...", "Chromium", "Sugar", "Paper"],
      ["Aluminum is useful for airplanes because it is...", "Light but fairly strong", "Very heavy", "Soft like butter"],
      ["Copper is used in wires because it...", "Carries electricity well", "Is invisible", "Floats on water"]
    ]),
    les("Reinforced concrete", [
      ["Concrete", "🏗️", "<b>Concrete</b> is cement, sand, gravel and water. As it cures it turns hard like stone. It is very strong when squeezed (compression)."],
      ["Weak when pulled", "↔️", "Concrete cracks when it is pulled apart (tension). So engineers put steel bars, called <b>rebar</b>, inside it."],
      ["A team", "🤝", "Concrete handles the squeezing and the steel handles the pulling. This is <b>reinforced concrete</b>. In a beam that sags, the bottom is stretched, so rebar goes near the bottom."]
    ], ["Think: squeezing or pulling?", "Concrete resists squeezing well. Steel is great at resisting pulling.", "Example: a concrete floor beam has rebar near its bottom, where it gets stretched. Now try yours."], [
      ["Concrete is strong when it is...", "Squeezed (compressed)", "Pulled apart", "Stretched like gum"],
      ["Concrete is weak when it is...", "Pulled apart (tension)", "Squeezed", "Painted"],
      ["Steel bars inside concrete are called...", "Rebar", "Cement", "Gravel"],
      ["Rebar mostly helps with ___ forces.", "Pulling (tension)", "Sound", "Light"],
      ["Concrete is made of cement, sand, gravel and...", "Water", "Oil", "Sugar"],
      ["While concrete cures, it needs...", "Time and moisture", "Constant freezing", "Loud noise"],
      ["A concrete beam sags in the middle. Rebar is most useful near its...", "Bottom", "Top only", "Painted surface"],
      ["Steel and concrete expand about the same when heated, so they...", "Work well together", "Always separate", "Melt each other"]
    ]),
    les("Biomedical engineering", [
      ["Helping bodies", "🩺", "<b>Biomedical engineers</b> design things that help people stay healthy: glasses, hearing aids, wheelchairs, X-ray machines and artificial limbs."],
      ["Safe materials", "🧪", "Anything used on or inside the body must be <b>biocompatible</b>, meaning the body can safely accept it."],
      ["Test, test, test", "✅", "Medical devices must be very safe and reliable, so they are tested carefully before they are used."]
    ], ["Think about devices that help the human body.", "Safety and testing matter most for medical devices.", "Example: a hearing aid helps a person hear better, so it is an assistive device. Now try yours."], [
      ["Biomedical engineers design things to help...", "Health and the human body", "Only cars", "Only fish tanks"],
      ["A prosthetic limb replaces a...", "Missing arm or leg", "Broken engine", "Dead battery"],
      ["Materials used inside the body must be...", "Safe for the body (biocompatible)", "Shiny", "Loud"],
      ["Eyeglasses and hearing aids are examples of...", "Assistive devices", "Weapons", "Toys only"],
      ["An X-ray machine lets doctors see...", "Bones inside the body", "The color of clothing", "Dreams"],
      ["A ramp beside stairs helps with...", "Accessibility", "Racing", "Cooking"],
      ["A bike helmet is designed to...", "Absorb the force of an impact", "Weigh the rider down", "Make noise"],
      ["Medical devices are tested carefully because they...", "Must be safe and reliable", "Are cheap", "Are only for looks"]
    ]),
    les("Rockets and orbits", [
      ["Push back", "🚀", "A rocket throws hot gas down and out of its engine. The gas pushes the rocket up. This is Newton's third law (action and reaction)."],
      ["Orbit", "🌍", "A satellite in orbit moves sideways very fast, about 8 kilometers every second. It keeps falling toward Earth but misses it, so it falls around the planet."],
      ["Stages", "🛰️", "Rockets drop empty fuel tanks in stages to get lighter. In space there is no air, so rockets carry their own oxygen to burn their fuel."]
    ], ["Think about action and reaction.", "An orbit is falling around the Earth, not falling to it.", "Example: a balloon let go flies one way as the air rushes out the other way. Now try yours."], [
      ["A rocket goes up because hot gas is pushed...", "Down and out the back", "Up in front", "Into the sky only"],
      ["This is an example of Newton's...", "Third law (action and reaction)", "First law only", "Law of rust"],
      ["A satellite stays in orbit because it is...", "Falling around Earth while moving sideways", "Held up by ropes", "Pushed by wind"],
      ["Rockets drop empty stages to...", "Lose weight", "Gain weight", "Add drag"],
      ["In space, rockets carry oxygen because...", "There is no air to burn the fuel", "Oxygen is too heavy on Earth", "It makes them look good"],
      ["Speed needed for a low orbit is about...", "8 kilometers every second", "8 meters every hour", "80 kilometers an hour"],
      ["Satellites help with...", "Weather forecasts and GPS", "Cooking dinner", "Digging tunnels"],
      ["A smooth pointed nose helps a rocket by reducing...", "Air drag", "Gravity", "Its fuel"]
    ]),
    les("Carbon footprints", [
      ["Burning fuel", "🏭", "Burning gas, coal or oil releases carbon dioxide (CO₂), a greenhouse gas that traps heat."],
      ["Footprint", "👣", "A <b>carbon footprint</b> is the total greenhouse gas that something causes, such as a trip, a product or a building."],
      ["Smaller footprints", "🌱", "Engineers shrink footprints with solar and wind power, better insulation, efficient machines and less waste. Trees also take in CO₂."]
    ], ["Think about what uses less energy from burning fuel.", "Cleaner energy and efficiency both make footprints smaller.", "Example: riding a bike instead of driving short trips cuts CO2. Now try yours."], [
      ["CO₂ is released when we burn...", "Fuels like gas, coal and oil", "Water", "Sand"],
      ["A carbon footprint is...", "The total greenhouse gas something causes", "The size of a shoe", "A mark in sand"],
      ["Which usually has the smaller footprint for a short trip?", "Biking", "Driving alone", "Flying"],
      ["Solar and wind make electricity with ___ CO₂.", "Almost no", "Lots of", "Exactly the same as coal"],
      ["Trees help by taking in...", "Carbon dioxide", "Plastic", "Gasoline"],
      ["Good insulation lowers a house's footprint because it...", "Needs less heating", "Needs more heating", "Makes it taller"],
      ["Making devices more energy-efficient...", "Cuts the footprint", "Raises the footprint", "Has no effect at all"],
      ["Buying locally made goods can cut emissions from...", "Transport", "Gravity", "Sunshine"]
    ]),
    null, null
  ];
  a[18] = mix("Mixed practice", at(a, [0, 1, 3, 5, 7, 9, 12, 14, 16]));
  a[19] = mix("Level 13 Challenge", at(a, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 14 =================
  const b = [
    les("Risk: how likely, how bad?", [
      ["Two questions", "⚠️", "<b>Risk</b> depends on two things: how <b>likely</b> a problem is and how <b>bad</b> it would be (the impact)."],
      ["High and low", "🚦", "Likely and serious means high risk. Unlikely and minor means low risk. Engineers fix the biggest risks first."],
      ["Reducing risk", "🛟", "Steps to reduce risk are called <b>mitigation</b>. A backup part, called <b>redundancy</b>, keeps things working if the main part fails."]
    ], ["Ask how likely it is, and how bad it would be.", "Risk is biggest when both are high.", "Example: a backup power supply in a hospital is redundancy. Now try yours."], [
      ["Risk depends on how likely a problem is and how ___ it would be.", "Bad (its impact)", "Colorful", "Old"],
      ["A problem that is likely AND serious is a...", "High risk", "Low risk", "Zero risk"],
      ["A problem that is unlikely AND minor is a...", "Low risk", "High risk", "Extreme risk"],
      ["A backup generator for a hospital is an example of...", "Redundancy", "Friction", "Rounding"],
      ["Redundancy means having a ___ ready.", "Backup part", "Louder part", "Heavier part"],
      ["Steps taken to reduce a risk are called...", "Mitigation", "Mutation", "Motivation"],
      ["Engineers list the risks of a design...", "Before and during building", "Only after accidents", "Never"],
      ["Which should be fixed first?", "The risk with the highest chance and harm", "The one that is easiest to ignore", "The one with the nicest name"]
    ]),
    les("Design trade-offs", [
      ["Giving and getting", "⚖️", "A <b>trade-off</b> means getting more of one good thing usually costs you something else."],
      ["Examples", "🔋", "A bigger battery lasts longer but weighs more and costs more. A thinner bike frame is lighter but may be weaker."],
      ["Choosing", "🎯", "Engineers decide which criteria matter most, such as safety first, and then choose the trade-off that fits."]
    ], ["Think about what you gain and what you give up.", "Safety usually comes before cost or looks.", "Example: a thicker wall is stronger but heavier and more expensive. Now try yours."], [
      ["Making a bike frame lighter with thin tubes may make it...", "Less strong", "More strong", "Extremely heavy"],
      ["The cheapest material may cost less now but may...", "Wear out sooner", "Last far longer", "Glow"],
      ["A bigger battery gives longer run time but also more...", "Weight and cost", "Speed of light", "Quietness"],
      ["A trade-off means...", "Gaining one thing often means giving up another", "Everything improves together", "Swapping toys"],
      ["A phone with a very large screen may be harder to...", "Carry in a pocket", "See", "Turn on"],
      ["A faster race car usually uses...", "More fuel", "No fuel", "Less engine power"],
      ["Engineers choose the design that best meets the most important...", "Criteria", "Colors", "Rumors"],
      ["If safety is the top priority, which is the best trade-off?", "Pay more for stronger protection", "Cut protection to save money", "Skip the tests"]
    ]),
    les("Belts and chains", [
      ["Moving turning", "⛓️", "Belts and chains carry turning motion from one wheel (pulley or sprocket) to another one that is not touching it."],
      ["Belt vs chain", "🚲", "Belts are quiet and cheap but can slip. Chains have links that fit the teeth of sprockets, so they do not slip. Bikes use chains."],
      ["Sizes matter", "🔄", "A big wheel driving a small wheel makes the small one spin faster. A small wheel driving a big one makes it spin slower but with more turning force."]
    ], ["Think about which wheel is bigger.", "The smaller wheel always goes around more times.", "Example: a big pulley driving a small pulley makes the small one spin faster. Now try yours."], [
      ["Most bicycles use a ___ to turn the back wheel.", "Chain", "Magnet", "Spring"],
      ["Belts can ___ if they are overloaded.", "Slip", "Freeze", "Explode"],
      ["Chains do not slip because their links fit the ___ on the sprockets.", "Teeth", "Colors", "Weights"],
      ["A big pulley drives a small pulley with a belt. The small one turns...", "Faster", "Slower", "The same speed"],
      ["A small pulley drives a big pulley. The big one turns...", "Slower", "Faster", "Not at all"],
      ["A belt crossed into a figure 8 makes the second pulley turn...", "The opposite direction", "The same direction", "Not at all"],
      ["Which drive is better for heavy loads without slipping?", "A chain", "A thin rubber band", "A piece of thread"],
      ["A car engine uses a rubber belt to drive parts like the...", "Alternator", "Windshield", "Seat"]
    ]),
    les("Cams and cranks", [
      ["Cams", "🥚", "A <b>cam</b> is a shape that turns and pushes a <b>follower</b> up and down. An egg-shaped cam lifts the follower once every turn."],
      ["Cranks", "🚴", "A <b>crank</b> changes back-and-forth motion into turning, or the other way around. Your legs and bike pedals work like a crank."],
      ["Engines", "⚙️", "In a car engine, pistons push cranks to turn the shaft, and cams open and close the valves at the right moments."]
    ], ["Think about what kind of motion goes in and what comes out.", "Cams make up-and-down motion. Cranks make turning motion.", "Example: a toy figure that bobs up and down as you turn a handle uses a cam. Now try yours."], [
      ["A turning cam pushes its follower...", "Up and down", "Only around in circles", "Nowhere"],
      ["Engine valves are opened by a...", "Cam", "Mirror", "Switch"],
      ["A crank changes back-and-forth motion into...", "Turning motion", "Light", "Heat"],
      ["Your legs on bike pedals work like a...", "Crank", "Cam", "Wedge"],
      ["A piston pushes a crankshaft to make the wheels...", "Turn", "Melt", "Float"],
      ["An egg-shaped cam makes its follower rise...", "Once each turn", "Never", "Forever"],
      ["A round cam centered on its shaft makes the follower...", "Stay still", "Jump", "Spin"],
      ["Toy automata with moving figures often use...", "Cams", "Radios", "Lasers"]
    ]),
    les("Linkages", [
      ["Bars and pivots", "🔗", "A <b>linkage</b> is a set of rigid bars joined at pivots so they can turn. One bar is fixed and is called the <b>frame</b>."],
      ["Four-bar", "🚗", "A four-bar linkage has four bars (including the frame). Car windshield wipers and many folding chairs use linkages."],
      ["Useful moves", "🏗️", "A scissor lift uses crossed bars to raise a platform straight up. A parallelogram linkage keeps a tool arm level as it moves."]
    ], ["Think about bars that can swing at their joints.", "The fixed bar counts as one of the bars.", "Example: a folding drying rack uses crossed bars on pivots. Now try yours."], [
      ["A linkage is made of bars joined by...", "Pivots (joints)", "Glue", "Magnets"],
      ["Windshield wipers use a...", "Linkage", "Lens", "Battery only"],
      ["A four-bar linkage has how many bars, counting the frame?", "Four", "Two", "Eight"],
      ["A scissor lift raises a platform using...", "Crossed bars on pivots", "A rubber band", "Sound waves"],
      ["A parallelogram linkage keeps a tool arm...", "Level as it moves", "Frozen in place", "Spinning wildly"],
      ["Pivot joints let bars...", "Turn relative to each other", "Melt", "Glow"],
      ["An adjustable desk lamp arm often uses...", "Linkages and springs", "Only glue", "Water pumps"],
      ["The fixed bar of a linkage is called the...", "Frame", "Roof", "Sail"]
    ]),
    gen("Springs", [
      ["Hooke's law", "🌀", "A spring stretches in proportion to the force pulling it: <b>force = stiffness × stretch</b> (F = k × x)."],
      ["Stiffness", "💪", "The number k tells how stiff the spring is. If k = 4 N per cm, each centimeter of stretch needs 4 N of force."],
      ["Limit", "⚠️", "This only works up to the spring's elastic limit. Pull too far and it stays stretched."]
    ], () => {
      const k = pick([2, 3, 4, 5, 10]), x = ri(2, 12), F = k * x;
      return pick([
        { text: `A spring has a stiffness of ${k} N per cm. It is stretched ${x} cm. What force is pulling it, in newtons?`, visual: "🌀", answer: F, hints: ["Each centimeter of stretch needs the same force.", "Multiply the stiffness by the stretch.", "Example: 3 N per cm stretched 5 cm needs 3 x 5 = 15 N. Now do yours."] },
        { text: `A spring has a stiffness of ${k} N per cm. A force of ${F} N pulls on it. How far does it stretch, in cm?`, visual: "🪝", answer: x, hints: ["Find how many centimeters the force can stretch it, using the same force for each.", "Divide the force by the stiffness.", "Example: 20 N on a spring of 4 N per cm stretches it 20 / 4 = 5 cm. Now do yours."] },
        { text: `A force of ${F} N stretches a spring by ${x} cm. What is its stiffness in N per cm?`, visual: "🧪", answer: k, hints: ["The stiffness is the force needed for each centimeter.", "Divide the force by the stretch.", "Example: 18 N for 3 cm gives 18 / 3 = 6 N per cm. Now do yours."] }
      ]);
    }),
    gen("Flow rate", [
      ["How fast it flows", "🚰", "<b>Flow rate</b> tells how much liquid moves in a certain time, like liters per minute (L/min)."],
      ["The rule", "🧮", "Amount = flow rate × time. A pump at 5 L/min for 4 minutes moves 5 × 4 = 20 L."],
      ["Fill time", "🛢️", "To find how long a tank takes to fill, divide the tank's volume by the flow rate."]
    ], () => {
      const r = ri(2, 12), t = ri(2, 15), V = r * t;
      return pick([
        { text: `A pump moves ${r} liters each minute. How many liters does it move in ${t} minutes?`, visual: "🚰", answer: V, hints: ["Each minute moves the same amount.", "Multiply the flow rate by the number of minutes.", "Example: 4 L/min for 6 min moves 4 x 6 = 24 L. Now do yours."] },
        { text: `A tank holds ${V} liters. A pump fills it at ${r} liters each minute. How many minutes does it take?`, visual: "🛢️", answer: t, hints: ["The tank fills in equal chunks, one each minute.", "Divide the tank volume by the flow rate.", "Example: 36 L at 6 L/min takes 36 / 6 = 6 minutes. Now do yours."] },
        { text: `${V} liters flow out of a pipe in ${t} minutes. What is the flow rate in liters per minute?`, visual: "💧", answer: r, hints: ["Flow rate is the amount for each minute.", "Divide the liters by the minutes.", "Example: 45 L in 5 minutes is 45 / 5 = 9 L/min. Now do yours."] }
      ]);
    }),
    les("Valves and pumps", [
      ["Pumps", "⛽", "A <b>pump</b> moves a liquid or gas by pushing it. A bicycle pump pushes air with a piston."],
      ["Valves", "🚪", "A <b>valve</b> controls or stops flow. A faucet is a valve. A <b>check valve</b> lets fluid flow only one way."],
      ["Safety valves", "🛡️", "A <b>pressure relief valve</b> opens by itself when pressure gets too high, to keep a tank or boiler safe."]
    ], ["Pumps push fluid. Valves control it.", "A one-way valve blocks backward flow.", "Example: a tap is a valve that you open and close by hand. Now try yours."], [
      ["A pump...", "Moves fluid by pushing it", "Makes light", "Cools metal"],
      ["A valve...", "Controls or stops flow", "Makes noise", "Stores heat"],
      ["A check valve lets fluid flow in ___ direction(s).", "One", "Both", "No"],
      ["Turning off a faucet closes a...", "Valve", "Wire", "Mirror"],
      ["A bicycle pump pushes air with a...", "Piston", "Magnet", "Prism"],
      ["A pressure relief valve opens when pressure is too...", "High", "Low", "Colorful"],
      ["Water flows downhill by gravity. A pump is needed to move it...", "Uphill", "Downhill", "Nowhere"],
      ["A tire valve lets air in but keeps it from...", "Escaping", "Entering", "Freezing"]
    ]),
    gen("Electricity at home: kWh", [
      ["Kilowatt-hours", "🔌", "Energy bills use <b>kilowatt-hours</b> (kWh). A 1 kW device running for 1 hour uses 1 kWh."],
      ["The rule", "🧮", "Energy (kWh) = power (kW) × time (hours). A 2 kW heater for 3 hours uses 2 × 3 = 6 kWh."],
      ["The cost", "💰", "Cost = kWh × price per kWh. At 10 cents per kWh, 6 kWh costs 60 cents."]
    ], () => {
      const kw = ri(1, 5), h = ri(2, 9), p = pick([10, 12, 15, 20]), E = kw * h;
      return pick([
        { text: `A ${kw} kW heater runs for ${h} hours. How many kWh of energy does it use?`, visual: "♨️", answer: E, hints: ["Energy depends on both the power and how long it runs.", "Multiply the kilowatts by the hours.", "Example: a 3 kW oven for 2 hours uses 3 x 2 = 6 kWh. Now do yours."] },
        { text: `A machine uses ${E} kWh. Electricity costs ${p} cents per kWh. How many cents does it cost?`, visual: "💰", answer: E * p, hints: ["Each kWh costs the same price.", "Multiply the kWh by the price for one kWh.", "Example: 4 kWh at 10 cents each costs 40 cents. Now do yours."] },
        { text: `A ${kw} kW machine used ${E} kWh. For how many hours did it run?`, visual: "⏱️", answer: h, hints: ["Energy = power x time, so the time is missing.", "Divide the energy by the power.", "Example: 12 kWh from a 4 kW machine means 12 / 4 = 3 hours. Now do yours."] }
      ]);
    }),
    gen("Battery run time", [
      ["Capacity", "🔋", "A battery's <b>capacity</b> is often measured in milliamp-hours (mAh). A 1000 mAh battery can give 1000 mA for one hour."],
      ["Run time", "⏳", "Run time (hours) = capacity (mAh) ÷ current used (mA). A 1000 mAh battery with a 100 mA load lasts 10 hours."],
      ["Real life", "🤖", "Motors and bright lights draw more current, so batteries run out sooner. Engineers choose the battery to match the job."]
    ], () => {
      const mA = pick([50, 100, 200, 250, 500]), h = ri(2, 20), cap = mA * h;
      return pick([
        { text: `A robot draws ${mA} mA from a ${cap} mAh battery. How many hours can it run?`, visual: "🤖", answer: h, hints: ["Run time is how many times the load fits into the capacity.", "Divide the capacity by the current.", "Example: a 600 mAh battery with a 100 mA load lasts 6 hours. Now do yours."] },
        { text: `A sensor draws ${mA} mA and must run for ${h} hours. How many mAh of battery capacity does it need?`, visual: "📡", answer: cap, hints: ["The longer it runs, the more capacity it needs.", "Multiply the current by the hours.", "Example: 50 mA for 8 hours needs 50 x 8 = 400 mAh. Now do yours."] },
        { text: `A ${cap} mAh battery lasts ${h} hours in a toy. How many mA does the toy draw?`, visual: "🧸", answer: mA, hints: ["Capacity = current x hours, so the current is missing.", "Divide the capacity by the hours.", "Example: 900 mAh over 3 hours means 300 mA. Now do yours."] }
      ]);
    }),
    les("Reading circuit diagrams", [
      ["Symbols", "📋", "Engineers draw circuits with simple <b>symbols</b> so anyone in any country can read them. The drawing is called a <b>schematic</b>."],
      ["Common symbols", "🔣", "A battery is a long and a short line side by side. A resistor is a zigzag. A switch is a line with a gap. A lamp is a circle with an X. Wires are straight lines."],
      ["LEDs", "💡", "An LED is a triangle with a bar and two little arrows pointing away, for the light it gives out."]
    ], ["Think about what each symbol looks like.", "Zigzag, gap, circle and long-short lines all mean different parts.", "Example: a line with a gap that can be closed is a switch. Now try yours."], [
      ["Circuit diagrams use symbols because they are...", "Quick and the same everywhere", "Colorful", "Pretty"],
      ["A zigzag line is the symbol for a...", "Resistor", "Battery", "Switch"],
      ["A symbol with a gap in the line that can open or close is a...", "Switch", "Resistor", "Wire"],
      ["A long and a short parallel line stand for a...", "Battery", "Motor", "Fuse"],
      ["A circle with an X inside is usually a...", "Lamp", "Battery", "Switch"],
      ["Straight lines between parts stand for...", "Wires", "Pipes", "Tapes"],
      ["A diagram showing how parts connect is a...", "Schematic", "Recipe", "Calendar"],
      ["A triangle with a bar and two small arrows pointing away is an...", "LED", "Fuse", "Battery"]
    ]),
    les("Microcontrollers", [
      ["A tiny computer", "🧠", "A <b>microcontroller</b> is a small computer on a single chip. It runs a program you write and controls things like lights and motors."],
      ["Pins", "🔌", "Its <b>pins</b> connect to sensors (inputs) and to LEDs, motors and speakers (outputs). A digital pin is either HIGH (on) or LOW (off)."],
      ["Everywhere", "🏠", "Microwaves, washing machines, toys, thermostats and cars all contain microcontrollers. You upload code to one with a cable from a computer."]
    ], ["Think small computer with pins.", "Inputs read the world. Outputs act on it.", "Example: a thermostat reads temperature on an input pin and switches a heater on an output pin. Now try yours."], [
      ["A microcontroller is a tiny...", "Computer on a chip", "Battery", "Gear"],
      ["It runs a ___ that you write.", "Program", "Poem", "Menu"],
      ["Its pins connect to...", "Sensors, LEDs and motors", "Only paper", "Walls"],
      ["A digital pin can be HIGH or...", "LOW", "Wavy", "Sleepy"],
      ["Compared with a laptop, a microcontroller usually has...", "Much less memory and low power use", "Far more memory", "A big built-in screen"],
      ["Which appliance probably has a microcontroller inside?", "A microwave oven", "A plain brick", "A wooden spoon"],
      ["Code is usually loaded onto a board through...", "A cable from a computer", "Wishing", "Radio from the Moon"],
      ["Reading a temperature sensor uses a pin as an...", "Input", "Output", "Ornament"]
    ]),
    gen("PWM: dimming with pulses", [
      ["On and off fast", "💡", "A microcontroller can switch a pin on and off very fast. This is <b>PWM</b> (pulse width modulation)."],
      ["Duty cycle", "📊", "The <b>duty cycle</b> is the percent of time the pin is ON. 50% means on half the time."],
      ["Average voltage", "🔆", "Average voltage = duty cycle × full voltage. At 50% on a 10 V supply, the average is 5 V, so an LED looks half as bright."]
    ], () => {
      const V = pick([5, 10, 20, 12]);
      const opts = [10, 20, 25, 40, 50, 60, 75, 80].filter(d => Number.isInteger(V * d / 100));
      const d = pick(opts), avg = V * d / 100;
      return pick([
        { text: `A pin gives ${V} V when ON. It is on ${d}% of the time. What is the average voltage?`, visual: "📊", answer: avg, hints: ["The average is a fraction of the full voltage.", "Turn the percent into a fraction of the voltage: multiply the voltage by the duty cycle and divide by one hundred.", "Example: 50% of 8 V is 8 x 50 / 100 = 4 V. Now do yours."] },
        { text: `A ${V} V supply is pulsed so the average voltage is ${avg} V. What percent of the time is it ON?`, visual: "🔆", answer: d, hints: ["Compare the average with the full voltage.", "Divide the average by the full voltage and multiply by one hundred.", "Example: an average of 3 V from a 12 V supply is 3 / 12 = 25%. Now do yours."] },
        { text: `At a duty cycle of ${d}%, the LED is ON for how many milliseconds out of every 100 ms?`, visual: "⏱️", answer: d, hints: ["Percent means out of one hundred.", "The number of milliseconds out of 100 equals the percent.", "Example: 30% duty means 30 ms on out of every 100 ms. Now do yours."] }
      ]);
    }),
    gen("Stepper motors", [
      ["Tiny steps", "⚙️", "A <b>stepper motor</b> turns in small, equal steps. Many have 200 steps for one full turn, which is 1.8 degrees a step."],
      ["Counting steps", "🔢", "To turn one full turn, send 200 steps. Half a turn is 100 steps. A quarter turn is 50 steps."],
      ["Why use them?", "🖨️", "Because each step is exact, steppers move 3D printers, robot arms and cameras to precise positions without extra sensors."]
    ], () => {
      const turns = ri(2, 9), ang = pick([45, 90, 180, 270, 360]);
      return pick([
        { text: `A stepper motor needs 200 steps for one full turn. How many steps make ${turns} full turns?`, visual: "⚙️", answer: 200 * turns, hints: ["Every full turn takes the same number of steps.", "Multiply the steps in one turn by the number of turns.", "Example: 3 turns need 3 x 200 = 600 steps. Now do yours."] },
        { text: `A stepper motor has 200 steps in a full turn of 360 degrees. How many steps turn it ${ang} degrees?`, visual: "🔩", answer: 200 * ang / 360, hints: ["Find what fraction of a full turn you want.", "Take that fraction of two hundred steps.", "Example: a 180-degree turn is half a turn, which is 100 steps. Now do yours."] },
        { text: `A printer sent ${200 * turns} steps to a motor with 200 steps per turn. How many full turns did the motor make?`, visual: "🖨️", answer: turns, hints: ["One turn uses a fixed number of steps.", "Divide the steps sent by the steps for one turn.", "Example: 1000 steps is 1000 / 200 = 5 turns. Now do yours."] }
      ]);
    }),
    gen("Pixels and screens", [
      ["Pixels", "🖥️", "A screen is a grid of tiny dots called <b>pixels</b>. Each pixel can show one color."],
      ["Counting", "🔢", "Total pixels = width in pixels × height in pixels. A grid 10 wide and 6 tall has 60 pixels."],
      ["Memory", "🎞️", "More pixels give a sharper picture but need more memory and more processing power."]
    ], () => {
      const w = ri(8, 40), h = ri(8, 30), n = ri(2, 9);
      return pick([
        { text: `A small robot display is ${w} pixels wide and ${h} pixels tall. How many pixels does it have in all?`, visual: "🖥️", answer: w * h, hints: ["The pixels are arranged in rows and columns.", "Multiply the width by the height.", "Example: 12 wide and 5 tall is 12 x 5 = 60 pixels. Now do yours."] },
        { text: `A display has ${w * h} pixels and is ${w} pixels wide. How many pixels tall is it?`, visual: "📺", answer: h, hints: ["Total = width x height, so the height is missing.", "Divide the total pixels by the width.", "Example: 72 pixels in total with a width of 9 means 72 / 9 = 8 tall. Now do yours."] },
        { text: `Each pixel on a screen stores ${n} bits of color. How many bits are needed for ${w} pixels in one row?`, visual: "💾", answer: w * n, hints: ["Every pixel needs the same amount of memory.", "Multiply the bits for one pixel by the number of pixels.", "Example: 6 pixels at 4 bits each need 6 x 4 = 24 bits. Now do yours."] }
      ]);
    }),
    gen("Chance of failure", [
      ["Rates", "📉", "Engineers test parts and count how many fail. A <b>failure rate</b> of 2% means 2 out of every 100 parts fail."],
      ["Predicting", "🔮", "To predict failures in a bigger batch, take that percent of the batch. 2% of 500 parts is 10 parts."],
      ["Finding the percent", "🧮", "To get the percent from a test, divide the number that failed by the number tested and multiply by 100."]
    ], () => {
      const p = ri(2, 9), N = pick([100, 200, 500, 1000]), n = pick([20, 25, 50, 100]), f = ri(1, n / 5);
      return pick([
        { text: `About ${p}% of a certain part fail. A factory makes ${N} of them. About how many will fail?`, visual: "🏭", answer: N * p / 100, hints: ["Percent means out of one hundred.", "Find the percent of the whole batch: multiply and divide by one hundred.", "Example: 4% of 300 parts is 300 x 4 / 100 = 12 parts. Now do yours."] },
        { text: `In a test of ${n} parts, ${f} failed. What percent failed?`, visual: "🧪", answer: f * 100 / n, hints: ["Compare the failed ones with the number tested.", "Divide the failures by the number tested, then multiply by one hundred.", "Example: 3 failures out of 50 is 3 / 50 x 100 = 6%. Now do yours."] },
        { text: `${p} out of every 100 gadgets are returned. A store sold ${N}. How many gadgets does it expect to be returned?`, visual: "📦", answer: N * p / 100, hints: ["The rate is given as out of one hundred.", "See how many groups of one hundred there are, then multiply by the returns in each group.", "Example: 5 per 100 with 200 sold is 2 groups of 5, which is 10. Now do yours."] }
      ]);
    }),
    gen("Percent error", [
      ["Measuring wrong", "📏", "Every measurement can be a little off. <b>Percent error</b> says how big the mistake is compared to the true value."],
      ["The rule", "🧮", "Percent error = (difference ÷ true value) × 100. If you measure 98 cm and the true length is 100 cm, the difference is 2 cm and the error is 2%."],
      ["Smaller is better", "🎯", "A small percent error means an accurate measurement. Engineers set limits on how much error is allowed."]
    ], () => {
      const t = pick([100, 200, 500]), p = ri(1, 9), d = t * p / 100, up = Math.random() < 0.5, m = up ? t + d : t - d;
      return pick([
        { text: `A part should be ${t} mm long. You measure ${m} mm. What is the percent error?`, visual: "📏", answer: p, hints: ["First find how far your measurement is from the true value.", "Divide that difference by the true value and multiply by one hundred.", "Example: a measurement of 96 on a true 200 has a difference of 4, and 4 / 200 x 100 = 2%. Now do yours."] },
        { text: `The true length is ${t} mm. A sensor has a ${p}% error and reads too high. What does it read, in mm?`, visual: "📡", answer: t + d, hints: ["Find the size of the error in mm first.", "Take the percent of the true length, then add it to the true length.", "Example: 5% of 200 is 10, so the reading is 210. Now do yours."] },
        { text: `A reading is off by ${d} mm from a true length of ${t} mm. What is the percent error?`, visual: "🎯", answer: p, hints: ["Compare the mistake with the true length.", "Divide the difference by the true value and multiply by one hundred.", "Example: off by 6 on 300 is 6 / 300 x 100 = 2%. Now do yours."] }
      ]);
    }),
    gen("Tolerance", [
      ["Allowed range", "📐", "No two parts are exactly the same. <b>Tolerance</b> is how much a size is allowed to differ and still be good."],
      ["Reading it", "🔩", "A pin that must be 20 mm ± 1 mm can be anywhere from 19 mm to 21 mm. The total range is 2 mm."],
      ["Why it matters", "⚙️", "Parts that must fit together, like a bolt in a nut, need small tolerances so they always fit."]
    ], () => {
      const N = ri(20, 80), t = ri(1, 3), good = N + ri(-t, t), hi = N + t + ri(1, 3), lo = N - t - ri(1, 3);
      return pick([
        { text: `A pin must be ${N} mm ± ${t} mm. What is the longest length that still passes, in mm?`, visual: "🔩", answer: N + t, hints: ["The plus-or-minus number tells how far it may go up or down.", "For the longest one, add the tolerance to the target size.", "Example: 30 mm ± 2 mm: the longest that passes is 32 mm. Now do yours."] },
        { text: `A pin must be ${N} mm ± ${t} mm. What is the shortest length that still passes, in mm?`, visual: "🔩", answer: N - t, hints: ["The plus-or-minus number tells how far it may go up or down.", "For the shortest one, subtract the tolerance from the target size.", "Example: 30 mm ± 2 mm: the shortest that passes is 28 mm. Now do yours."] },
        { text: `A pin must be ${N} mm ± ${t} mm. Which pin passes the check?`, visual: "✅", choices: [`${good} mm`, `${hi} mm`, `${lo} mm`], answer: `${good} mm`, hints: ["A pin passes only if it is inside the allowed range.", "Work out the smallest and largest allowed sizes, then check each pin.", "Example: for 30 mm ± 2 mm, a pin of 31 mm passes but 33 mm does not. Now do yours."] },
        { text: `A part must be ${N} mm ± ${t} mm. How wide is the total allowed range, in mm?`, visual: "📏", answer: 2 * t, hints: ["The part can be too long or too short by the same amount.", "Count the allowed distance on both sides of the target.", "Example: ± 3 mm gives a range from 3 below to 3 above, which is 6 mm. Now do yours."] }
      ]);
    }),
    null, null
  ];
  b[18] = mix("Mixed practice", at(b, [0, 1, 2, 5, 6, 8, 9, 12, 14, 16]));
  b[19] = mix("Level 14 Challenge", at(b, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  // ================= LEVEL 15 =================
  const c = [
    gen("Pythagoras for braces", [
      ["Right triangles", "📐", "In a right triangle, the longest side (the <b>hypotenuse</b>) sits opposite the right angle. The rule is a² + b² = c², where c is the longest side."],
      ["Example", "🪜", "Legs of 3 and 4: 9 + 16 = 25, and 5 × 5 = 25. So the longest side is 5."],
      ["Use in building", "🏗️", "Builders use this to find the length of a diagonal brace or ladder, and to check that a corner is exactly square."]
    ], () => {
      const [x, y, z] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25]]);
      return pick([
        { text: `A rectangular gate frame is ${x} m wide and ${y} m tall. How long is a diagonal brace across the corners, in m?`, visual: "🚪", answer: z, hints: ["The width, the height and the brace make a right triangle.", "Square both sides, add them, then find the number that multiplied by itself gives the sum.", "Example: legs 20 and 21 give 400 + 441 = 841, and 29 x 29 = 841, so the brace is 29. Now do yours."] },
        { text: `A ladder ${z} m long leans on a wall. Its foot is ${x} m from the wall. How high up the wall does it reach, in m?`, visual: "🪜", answer: y, hints: ["The ladder is the longest side of a right triangle.", "Square the ladder, subtract the square of the foot distance, then find the square root.", "Example: hypotenuse 41 and a leg of 9: 1681 - 81 = 1600, and 40 x 40 = 1600, so the other leg is 40. Now do yours."] },
        { text: `A brace is ${z} m long. One leg of the triangle it makes is ${y} m. How long is the other leg, in m?`, visual: "📐", answer: x, hints: ["The brace is the longest side.", "Square the brace and the known leg, subtract, then find the square root.", "Example: hypotenuse 41 and a leg of 40: 1681 - 1600 = 81, and 9 x 9 = 81, so the other leg is 9. Now do yours."] }
      ]);
    }),
    gen("Slope and grade", [
      ["Rise and run", "⛰️", "<b>Rise</b> is how far a ramp or road goes up. <b>Run</b> is how far it goes across (flat). Both are measured in the same units."],
      ["Grade", "🛣️", "<b>Grade</b> (slope as a percent) = rise ÷ run × 100. A road that rises 6 m over 100 m has a 6% grade."],
      ["Safe slopes", "♿", "Wheelchair ramps are kept gentle, about 8% or less, so people can use them safely. Steep roads have signs showing their grade."]
    ], () => {
      const g = pick([5, 8, 10, 12, 20, 25]), run = pick([100, 200, 400]), rise = g * run / 100;
      return pick([
        { text: `A ramp rises ${rise} m over a run of ${run} m. What is its grade in percent?`, visual: "♿", answer: g, hints: ["Compare how far up it goes with how far across.", "Divide the rise by the run, then multiply by one hundred.", "Example: a rise of 3 over a run of 50 is 3 / 50 x 100 = 6%. Now do yours."] },
        { text: `A road has a ${g}% grade. How many meters does it rise over a run of ${run} m?`, visual: "🛣️", answer: rise, hints: ["Percent means out of one hundred.", "Multiply the run by the grade and divide by one hundred.", "Example: a 4% grade over 200 m rises 200 x 4 / 100 = 8 m. Now do yours."] },
        { text: `A ramp must rise ${rise} m and may have a grade of ${g}% at most. What is the shortest run it can have, in m?`, visual: "📏", answer: run, hints: ["Grade is rise divided by run (times one hundred).", "Turn it around: run = rise x one hundred / grade.", "Example: a rise of 6 m at a 5% grade needs a run of 6 x 100 / 5 = 120 m. Now do yours."] }
      ]);
    }),
    les("Free-body diagrams", [
      ["Arrows for forces", "➡️", "A <b>free-body diagram</b> shows an object as a dot or box with an arrow for every force on it. The arrow points the way the force pushes. A longer arrow means a bigger force."],
      ["Usual forces", "📦", "Weight points down. The <b>normal force</b> from a table or floor points up. Friction opposes motion. A push or pull points the way it acts."],
      ["Net force", "🧮", "Add forces in the same direction and subtract opposite ones. If they cancel, the net force is zero and the speed does not change."]
    ], ["Draw each force as an arrow from the object.", "Opposite forces subtract, same-direction forces add.", "Example: a 10 N push right and a 4 N friction left leave 6 N to the right. Now try yours."], [
      ["In a free-body diagram, each arrow shows a...", "Force", "Color", "Name"],
      ["The arrow's direction shows...", "Which way the force pushes", "How old the object is", "How much it costs"],
      ["A book rests on a table. The table pushes up with the...", "Normal force", "Magnetic force", "Engine force"],
      ["An object's weight always points...", "Down toward Earth", "Up", "Sideways"],
      ["A longer arrow means a ___ force.", "Bigger", "Smaller", "Hotter"],
      ["A crate slides to the right. Friction on it points...", "Left", "Right", "Up"],
      ["A crate gets 20 N to the right and 20 N to the left. It...", "Keeps its speed (or stays still)", "Speeds up to the right", "Speeds up to the left"],
      ["Pushes of 30 N right and 10 N left. The net force is...", "20 N to the right", "40 N to the right", "20 N to the left"]
    ]),
    les("Circular motion", [
      ["Always turning", "🎡", "An object moving in a circle keeps changing direction. To do that it needs a force pulling it toward the center. This is the <b>centripetal force</b>."],
      ["Examples", "🚗", "A ball on a string: the string pulls inward. A car turning a corner: friction between tires and road pulls it inward. A satellite: gravity pulls it inward."],
      ["Let go!", "💨", "If the pull stops, the object flies off in a straight line in the direction it was moving, not outward. A faster turn or tighter circle needs a bigger inward force."]
    ], ["Think: which way must the force point to bend the path into a circle?", "Without the inward force, the object goes straight.", "Example: a hammer thrower's spinning hammer flies in a straight line once released. Now try yours."], [
      ["A ball on a string whirls in a circle. The string pulls the ball...", "Toward the center", "Away from the center", "Forward along the circle"],
      ["If the string breaks, the ball at first flies...", "In a straight line the way it was going", "Round in a smaller circle", "Straight toward the center"],
      ["What turns a car on a flat road corner?", "Friction between tires and road", "Gravity pointing sideways", "The speedometer"],
      ["Roads are banked (tilted) on curves to...", "Help cars turn safely", "Make driving harder", "Make roads shorter"],
      ["The force toward the center of a circle is the...", "Centripetal force", "Vertical force", "Static force"],
      ["Going around a curve faster needs ___ inward force.", "More", "Less", "No"],
      ["In a spin dryer, water leaves through holes because it...", "Keeps moving straight while the drum turns", "Is pulled out by magnets", "Gets heavier"],
      ["A satellite circling Earth is pulled inward by...", "Gravity", "Friction", "Engine thrust"]
    ]),
    les("Projectiles", [
      ["Arching paths", "🏀", "A thrown ball follows a curved arch. After it leaves your hand, ignoring air, the only force on it is gravity."],
      ["Two motions", "↗️", "The ball moves sideways at a steady speed while gravity pulls it down. A ball dropped and a ball shot sideways from the same height land at the same time."],
      ["Best angle", "📐", "On flat ground and ignoring air, the longest throw is at about 45 degrees. A faster launch goes farther."]
    ], ["Gravity pulls down the whole time.", "Sideways motion does not change how fast it falls.", "Example: water from a hose makes an arch because gravity pulls the stream down. Now try yours."], [
      ["A thrown ball follows a path that is a...", "Curved arch", "Straight line up", "Zigzag"],
      ["Ignoring air, the force acting on a ball in flight is...", "Gravity", "Nothing at all", "Only the throw"],
      ["One ball is dropped and another is shot sideways from the same height at the same moment. Which lands first?", "They land together", "The dropped ball", "The sideways ball"],
      ["For the longest throw on flat ground (ignoring air), the best angle is about...", "45 degrees", "10 degrees", "90 degrees"],
      ["A ball is thrown straight up (90 degrees). It comes back...", "Down to you", "Far forward", "Never"],
      ["At the very top of a thrown ball's path, its upward speed is...", "Zero for a moment", "The greatest", "Backward"],
      ["A faster launch makes a ball travel...", "Farther", "Shorter", "The same"],
      ["The arching streams of a fountain show...", "Projectile paths", "Magnetic fields", "Straight lines"]
    ]),
    gen("Free fall", [
      ["Falling faster", "🪂", "When something falls (and air is ignored), its speed grows by about 10 m/s every second. We write g ≈ 10 m/s²."],
      ["Speed", "⏱️", "Speed after falling = 10 × time. After 3 seconds the speed is 30 m/s."],
      ["Distance", "📏", "Distance fallen = 5 × time × time. After 2 seconds the object has fallen 5 × 2 × 2 = 20 m."]
    ], () => {
      const t = ri(2, 8), t2 = ri(2, 6);
      return pick([
        { text: `A robot part is dropped. Ignoring air, how fast is it going after ${t} seconds, in m/s? (Use g = 10.)`, visual: "🪂", answer: 10 * t, hints: ["Speed grows by the same amount each second.", "Multiply the time by the amount of speed gained each second.", "Example: after 4 seconds the speed is 4 x 10 = 40 m/s. Now do yours."] },
        { text: `A rock reaches ${10 * t} m/s while falling. Ignoring air, for how many seconds has it fallen? (Use g = 10.)`, visual: "🪨", answer: t, hints: ["Speed gained is the same every second.", "Divide the speed by the speed gained each second.", "Example: 70 m/s means 70 / 10 = 7 seconds. Now do yours."] },
        { text: `A ball falls for ${t2} seconds from rest. Ignoring air, how many meters does it fall? (Distance = 5 × t × t.)`, visual: "⚽", answer: 5 * t2 * t2, hints: ["Distance depends on the time multiplied by itself.", "Multiply the time by itself, then by five.", "Example: after 3 seconds: 5 x 3 x 3 = 45 m. Now do yours."] }
      ]);
    }),
    gen("Wave speed", [
      ["Waves", "🌊", "A wave has a <b>frequency</b> f (how many waves pass each second, in hertz) and a <b>wavelength</b> λ (the length of one wave, in meters)."],
      ["The rule", "🧮", "Wave speed = frequency × wavelength (v = f × λ). If 5 waves pass each second and each is 2 m long, the speed is 10 m/s."],
      ["In engineering", "📡", "Radio, Wi-Fi, sound and light are all waves. Engineers use this rule to design antennas, speakers and sensors."]
    ], () => {
      const f = ri(2, 20), L = ri(2, 15), v = f * L;
      return pick([
        { text: `A wave on a rope has a frequency of ${f} Hz and a wavelength of ${L} m. What is its speed in m/s?`, visual: "🌊", answer: v, hints: ["Speed depends on how many waves pass and how long each is.", "Multiply the frequency by the wavelength.", "Example: 4 Hz and 3 m gives 4 x 3 = 12 m/s. Now do yours."] },
        { text: `A wave travels at ${v} m/s with a frequency of ${f} Hz. What is its wavelength in m?`, visual: "📏", answer: L, hints: ["Speed = frequency x wavelength, so the wavelength is missing.", "Divide the speed by the frequency.", "Example: 40 m/s at 5 Hz gives 40 / 5 = 8 m. Now do yours."] },
        { text: `A wave travels at ${v} m/s with a wavelength of ${L} m. What is its frequency in Hz?`, visual: "📡", answer: f, hints: ["Speed = frequency x wavelength, so the frequency is missing.", "Divide the speed by the wavelength.", "Example: 60 m/s with a 6 m wavelength gives 60 / 6 = 10 Hz. Now do yours."] }
      ]);
    }),
    les("Light and optics", [
      ["Reflection", "🪞", "Light bounces off a mirror. This is <b>reflection</b>. The angle it arrives at equals the angle it leaves at."],
      ["Refraction", "🔍", "Light bends when it passes from one material into another, like air into water or glass. This is <b>refraction</b>. Lenses use it to focus light."],
      ["Uses", "📷", "A convex lens (thicker in the middle) is used in magnifiers, cameras and eyeglasses. Fiber-optic cables carry data as pulses of light."]
    ], ["Bouncing is reflection. Bending is refraction.", "Convex lenses are fatter in the middle and bring light together.", "Example: a straw looks bent in a glass of water because of refraction. Now try yours."], [
      ["Light bouncing off a mirror is called...", "Reflection", "Refraction", "Absorption"],
      ["Light bending as it enters water or glass is...", "Refraction", "Reflection", "An echo"],
      ["The angle at which light arrives at a mirror equals the angle at which it...", "Leaves", "Melts", "Sleeps"],
      ["A magnifying glass uses a ___ lens.", "Convex (thicker in the middle)", "Concave (thinner in the middle)", "Perfectly flat"],
      ["Fiber-optic cables carry data using...", "Pulses of light", "Electric sparks", "Sound waves"],
      ["A periscope lets you see over a wall using...", "Mirrors", "Magnets", "Springs"],
      ["A camera lens bends light to form a...", "Sharp image on the sensor", "Loud sound", "Hot spot"],
      ["Eyeglasses help by...", "Bending light so it focuses in the eye", "Adding extra brightness", "Blocking all light"]
    ]),
    gen("Celsius and Fahrenheit", [
      ["Two scales", "🌡️", "Temperature is measured in degrees Celsius (°C) or Fahrenheit (°F). Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F)."],
      ["C to F", "➡️", "°F = °C × 9 ÷ 5 + 32. For 10 °C: 10 × 9 ÷ 5 = 18, then 18 + 32 = 50 °F."],
      ["F to C", "⬅️", "°C = (°F − 32) × 5 ÷ 9. For 50 °F: 50 − 32 = 18, then 18 × 5 ÷ 9 = 10 °C."]
    ], () => {
      const k = ri(1, 18), C = 5 * k, F = 9 * k + 32;
      return pick([
        { text: `A machine part is at ${C} °C. What is that in °F? (°F = °C × 9 ÷ 5 + 32)`, visual: "🌡️", answer: F, hints: ["Use the formula to change Celsius to Fahrenheit.", "Multiply the Celsius by nine, divide by five, then add thirty-two.", "Example: 20 °C: 20 x 9 / 5 = 36, then 36 + 32 = 68 °F. Now do yours."] },
        { text: `An oven display shows ${F} °F. What is that in °C? (°C = (°F − 32) × 5 ÷ 9)`, visual: "♨️", answer: C, hints: ["Use the formula to change Fahrenheit to Celsius.", "Take away thirty-two first, then multiply by five and divide by nine.", "Example: 68 °F: 68 - 32 = 36, then 36 x 5 / 9 = 20 °C. Now do yours."] },
        { text: `A sensor reads ${C} °C. Which Fahrenheit reading is the same temperature?`, visual: "📟", choices: [`${F} °F`, `${C + 32} °F`, `${F + 9} °F`], answer: `${F} °F`, hints: ["Fahrenheit numbers are bigger than Celsius numbers for these temperatures, but not by only a fixed amount.", "Multiply the Celsius value by nine fifths, then add thirty-two.", "Example: 5 °C: 5 x 9 / 5 = 9, then 9 + 32 = 41 °F. Now do yours."] }
      ]);
    }),
    les("Heat engines", [
      ["Heat to motion", "🔥", "A <b>heat engine</b> turns heat into motion. Burning fuel makes hot gas, and the gas pushes pistons or spins a turbine."],
      ["Four strokes", "🚗", "A car engine repeats four strokes: <b>intake</b> (air and fuel in), <b>compression</b> (squeeze), <b>power</b> (burn and push the piston) and <b>exhaust</b> (gas out)."],
      ["Waste heat", "♨️", "No engine turns all heat into motion, so efficiency is always under 100%. Much of the energy leaves as waste heat, which is why engines need cooling."]
    ], ["Think of fuel, heat, push, and leftover heat.", "The power stroke comes after the squeeze.", "Example: a steam turbine uses steam to spin a shaft. Now try yours."], [
      ["A heat engine turns heat into...", "Motion", "Sound only", "Shadows"],
      ["In a car engine, burning fuel makes hot gas that pushes the...", "Pistons", "Mirrors", "Fuses"],
      ["The four strokes in order are...", "Intake, compression, power, exhaust", "Power, intake, exhaust, compression", "Exhaust, power, intake, compression"],
      ["Engines need cooling systems because...", "Much of the energy becomes waste heat", "It makes them louder", "It changes the fuel color"],
      ["Steam engines use ___ to push pistons or spin turbines.", "Water heated into steam", "Oil only", "Air from tires"],
      ["Which kind of motor usually wastes less energy as heat?", "An electric motor", "A gasoline engine", "They waste exactly the same"],
      ["A power plant turbine is spun by...", "Steam, water or wind", "Magnets alone", "Sunglasses"],
      ["Because some heat is always wasted, an engine's efficiency is always...", "Less than 100%", "Exactly 100%", "More than 100%"]
    ]),
    gen("Resistors together", [
      ["In a row", "➖", "Resistors in <b>series</b> (one after another) add up: total = R1 + R2 + R3."],
      ["Side by side", "⏸️", "Resistors in <b>parallel</b> give the current more paths, so the total resistance is smaller. Two equal resistors in parallel give half of one. Three give a third."],
      ["Use", "🔧", "Engineers combine resistors to get a value they do not have in stock."]
    ], () => {
      const r1 = ri(1, 9) * 10, r2 = ri(1, 9) * 10, r3 = ri(1, 9) * 10, n = pick([2, 3, 4]), R = n * ri(2, 9) * 5;
      return pick([
        { text: `Three resistors of ${r1} Ω, ${r2} Ω and ${r3} Ω are in series. What is the total resistance in Ω?`, visual: "➖", answer: r1 + r2 + r3, hints: ["In series, the current must pass through every resistor.", "Add all of the resistor values together.", "Example: 10, 20 and 30 in series make 10 + 20 + 30 = 60 Ω. Now do yours."] },
        { text: `${n} identical ${R} Ω resistors are connected in parallel. What is the total resistance in Ω?`, visual: "⏸️", answer: R / n, hints: ["Parallel paths make the total smaller than one resistor.", "For identical resistors, divide one resistor's value by how many there are.", "Example: 3 identical 60 Ω resistors in parallel give 60 / 3 = 20 Ω. Now do yours."] },
        { text: `Two resistors are in series. One is ${r1} Ω and the total is ${r1 + r2} Ω. How many Ω is the other?`, visual: "🔧", answer: r2, hints: ["In series, the total is the sum of the parts.", "Subtract the known resistor from the total.", "Example: a total of 70 with one part 30 means the other is 40 Ω. Now do yours."] }
      ]);
    }),
    les("Transistors", [
      ["A tiny switch", "🔀", "A <b>transistor</b> is a tiny switch with no moving parts. A small signal at one pin lets a larger current flow through the others."],
      ["Amplifier", "🔊", "A transistor can also <b>amplify</b>, making a weak signal stronger, which is how small microphone signals can drive speakers."],
      ["Chips", "💻", "Logic gates are built from transistors. A modern chip, made mostly from silicon, holds billions of them. Each on/off state can store a bit."]
    ], ["Think of a switch with no moving parts.", "Small signals can control big currents.", "Example: a light sensor uses a transistor to switch on a street lamp. Now try yours."], [
      ["A transistor can act like a tiny...", "Electric switch", "Spring", "Mirror"],
      ["Modern chips contain billions of...", "Transistors", "Gears", "Light bulbs"],
      ["Transistors are mostly made from...", "Silicon", "Rubber", "Wood"],
      ["Logic gates are built from...", "Transistors", "Water pipes only", "Paper"],
      ["A small signal at a transistor can control a ___ current.", "Much bigger", "Rainbow-colored", "Sleepy"],
      ["A transistor can also ___ a weak signal.", "Amplify (make stronger)", "Freeze", "Paint"],
      ["An on/off transistor can help store one...", "Bit", "Gallon", "Gear"],
      ["Smaller transistors mean more fit on a chip, which can make it...", "More powerful for its size", "Always slower", "Made of wood"]
    ]),
    les("The power grid", [
      ["Two currents", "🔌", "<b>DC</b> (direct current) flows one way, like from a battery. <b>AC</b> (alternating current) flips direction many times a second. Wall sockets give AC."],
      ["Transformers", "🗼", "A <b>transformer</b> changes voltage. Power plants send electricity at very high voltage over long wires because less energy is wasted. Transformers step it down near homes for safety."],
      ["The grid", "🏙️", "The <b>grid</b> is a network of power plants, lines and substations that delivers electricity to everyone. Chargers change AC from the wall into DC for your devices."]
    ], ["AC flips, DC stays one way.", "High voltage for long trips, low voltage for homes.", "Example: a phone charger changes wall power into the DC your phone needs. Now try yours."], [
      ["Which current keeps changing direction back and forth?", "AC", "DC", "Neither"],
      ["A battery provides...", "DC", "AC", "Sound"],
      ["Power lines use very high voltage to...", "Waste less energy over long distances", "Make wires thicker", "Slow the electricity down"],
      ["A transformer changes...", "Voltage", "The color of wires", "The weather"],
      ["Near homes, voltage is stepped ___ for safe use.", "Down", "Up", "Sideways"],
      ["A phone charger changes wall AC into...", "DC", "Sound", "Water"],
      ["The grid is...", "A network linking power plants and users", "One giant battery", "A single wire"],
      ["A substation is a place that...", "Changes voltage and routes power", "Grows crops", "Stores books"]
    ]),
    les("State machines", [
      ["States", "🚦", "A <b>state machine</b> is always in exactly one <b>state</b> at a time, like a traffic light being green, yellow or red."],
      ["Transitions", "➡️", "A <b>transition</b> moves it from one state to another when an event happens, like a timer ending or a sensor seeing a wall."],
      ["Diagrams", "🔵", "Engineers draw circles for states and arrows for transitions. This <b>state diagram</b> makes robots, elevators and vending machines easy to plan."]
    ], ["Think: what is it doing now, and what makes it change?", "An event, such as a sensor reading or a timer, causes a transition.", "Example: a door is 'closed', a button press moves it to 'opening'. Now try yours."], [
      ["A state machine is in ___ state(s) at one time.", "Exactly one", "All of its", "No"],
      ["A change from one state to another is a...", "Transition", "Translation", "Transformation"],
      ["A traffic light goes green, yellow, then...", "Red", "Blue", "Purple"],
      ["A vending machine waiting for money is in its...", "Waiting (idle) state", "Delivery state", "Packing state"],
      ["What usually triggers a transition?", "An event, like a sensor reading or timer", "The color of the code", "Nothing ever"],
      ["A robot in 'avoid wall' state sees clear space ahead. It might switch to...", "A 'drive forward' state", "Switching off forever", "Becoming a different robot"],
      ["Circles for states and arrows for transitions make a...", "State diagram", "Pie chart", "Bar graph"],
      ["Which does NOT make sense for an elevator?", "Moving up and down at the same time", "Doors closed", "Waiting at a floor"]
    ]),
    gen("Adding in binary", [
      ["Carry the 1", "🔢", "Binary adding works like decimal adding, from the right. The rules: 0 + 0 = 0, 0 + 1 = 1, and 1 + 1 = 10 (write 0 and carry 1)."],
      ["Example", "➕", "101 + 011: the right column 1 + 1 = 10 (write 0, carry 1). Middle: 0 + 1 + 1 carried = 10 (write 0, carry 1). Left: 1 + 0 + 1 carried = 10. The answer is 1000."],
      ["Check", "✅", "You can check by changing to ordinary numbers: 101 is 5, 011 is 3, and 5 + 3 = 8, which is 1000 in binary."]
    ], () => {
      const x = ri(3, 12), y = ri(3, 12);
      return pick([
        { text: `Add these binary numbers: ${x.toString(2)} + ${y.toString(2)}. Type the answer in binary.`, visual: "🔢", textInput: true, answer: (x + y).toString(2), hints: ["Add column by column, starting at the right.", "When a column adds past one, write zero and carry one to the next column.", "Example: 11 + 1: right column 1 + 1 = 10 (write 0, carry 1), then 1 + 1 carried = 10, so the answer is 100. Now do yours."] },
        { text: `Add these binary numbers: ${x.toString(2)} + ${y.toString(2)}. What is the answer as an ordinary (decimal) number?`, visual: "🧮", answer: x + y, hints: ["You can change each binary number to an ordinary number first.", "Add the two ordinary numbers together.", "Example: 101 is 5 and 11 is 3, so the sum is 8. Now do yours."] }
      ]);
    }),
    gen("Tasks in parallel", [
      ["Project plans", "📋", "Some tasks must happen one after another. Others can happen at the same time, in <b>parallel</b>, if different people or robots do them."],
      ["Total time", "⏱️", "When tasks run at the same time, the longest one decides how long that stage takes. The whole project time adds up the stages."],
      ["Saving time", "⚡", "Putting tasks in parallel can make a project finish sooner, but only if they do not depend on each other."]
    ], () => {
      const p = ri(2, 9), q = ri(2, 9), r = ri(2, 9), s = ri(2, 9);
      return pick([
        { text: `A robot build has: Task A (${p} days), then Tasks B (${q} days) and C (${r} days) done at the same time, then Task D (${s} days). How many days does the project take?`, visual: "📋", answer: p + Math.max(q, r) + s, hints: ["B and C happen together, so only one of them counts for time.", "Use the longer of B and C, then add A and D.", "Example: A 2, then B 3 and C 5 together, then D 1: 2 + 5 + 1 = 8 days. Now do yours."] },
        { text: `Tasks A (${p} days), B (${q} days), C (${r} days) and D (${s} days) are done one after another. How many days in all?`, visual: "🧱", answer: p + q + r + s, hints: ["One after another means no overlap.", "Add all of the times.", "Example: 2, 3, 5 and 1 days one after another make 11 days. Now do yours."] },
        { text: `B (${q} days) and C (${r} days) can run in parallel instead of one after another. How many days does that stage take?`, visual: "⏱️", answer: Math.max(q, r), hints: ["Both start at the same time.", "The stage ends when the longer task ends.", "Example: tasks of 3 and 5 days in parallel take 5 days. Now do yours."] }
      ]);
    }),
    les("Stress, strain and breaking", [
      ["Stress", "🏋️", "<b>Stress</b> is force spread over area. The same force on a smaller area gives more stress. <b>Strain</b> is how much a material stretches or squashes compared with its size."],
      ["Elastic then plastic", "📎", "Small forces make a material stretch and spring back (<b>elastic</b>). Past the <b>yield point</b>, it stays bent (<b>plastic</b>), like a paperclip bent too far."],
      ["Ductile or brittle", "🔨", "<b>Ductile</b> materials like copper and steel stretch a lot before breaking. <b>Brittle</b> materials like glass snap suddenly. Bridge steel is ductile so it gives a warning before failing."]
    ], ["Think: does it spring back, stay bent, or snap?", "A smaller area carries more stress for the same force.", "Example: a paperclip bent slightly springs back, but bent a lot it stays bent. Now try yours."], [
      ["A material that springs back after a small force is showing...", "Elastic behavior", "Plastic behavior", "Frozen behavior"],
      ["A paperclip bent so far it stays bent went past its...", "Yield point", "Starting line", "Color limit"],
      ["A ductile material...", "Stretches a lot before breaking", "Shatters with no warning", "Floats on water"],
      ["Glass is brittle. It tends to...", "Break suddenly with little bending", "Stretch like gum", "Bend like rubber"],
      ["Stress is force spread over...", "Area", "Time", "Color"],
      ["The same force on a smaller area gives ___ stress.", "More", "Less", "The same"],
      ["Strain describes how much a material...", "Stretches or squashes compared with its size", "Costs", "Weighs"],
      ["Bridge steel is ductile so it...", "Bends and warns before it fails", "Shatters easily", "Never moves at all"]
    ]),
    les("The circular economy", [
      ["Take, make, waste", "🗑️", "In a <b>linear economy</b> we take resources, make products and throw them away. This wastes materials and energy."],
      ["Closing the loop", "♻️", "In a <b>circular economy</b> things are designed to be repaired, reused, remade and recycled, so materials stay in use again and again."],
      ["Design choices", "🔧", "Engineers help by using fewer kinds of materials, making parts easy to take apart (<b>design for disassembly</b>) and making batteries and parts replaceable."]
    ], ["Think about keeping materials in use for as long as possible.", "Repairing keeps the most value, recycling comes after.", "Example: a phone with a swappable battery can last years longer. Now try yours."], [
      ["In a circular economy, materials are...", "Kept in use again and again", "Used once and thrown away", "Hidden underground"],
      ["A linear economy follows take, make, then...", "Throw away", "Reuse", "Repair"],
      ["A phone whose battery can be swapped easily helps...", "Repair and a longer life", "They break sooner", "Add weight"],
      ["Which keeps the MOST value of a product?", "Repairing it", "Melting it down", "Burying it"],
      ["Design for disassembly means...", "Parts can be taken apart easily to reuse or recycle", "Everything is glued forever", "Screws are hidden"],
      ["Composting turns food scraps into...", "Material that enriches soil", "Plastic", "Metal"],
      ["If a maker leases a product and takes it back, it has a reason to make it...", "Last longer", "Cheap and flimsy", "Impossible to fix"],
      ["Using one material instead of many mixed ones makes recycling...", "Easier", "Harder", "Impossible"]
    ]),
    null, null
  ];
  c[18] = mix("Mixed practice", at(c, [0, 1, 2, 4, 5, 8, 9, 11, 13, 15]));
  c[19] = mix("Level 15 Challenge", at(c, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));

  Object.assign(ENGINEER_LEVELS, { 13: a, 14: b, 15: c });
})();
