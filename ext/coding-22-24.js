// ext/coding-22-24.js  Mind Lab Coding levels 22-24 (60 lessons): algorithm analysis, data structures, dynamic programming, concurrency, operating systems, compilers, functional ideas, machine learning, ethics, system design
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Write the values down step by step, and check your answer once before you press the button.")
  ];
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const sp = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const numChoices = (a, spread) => {
    const s = new Set([a]); let t = 0;
    while (s.size < 4 && t++ < 300) { const d = a + ri(-spread, spread); if (d !== a && d >= 0) s.add(d); }
    return shuf([...s]);
  };
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const num = (text, answer, hints, visual) => ({ text, visual, answer, hints });
  const mc = (text, right, wrongs, hints, visual) => ({ text, visual, choices: strChoices(right, wrongs), answer: right, hints });
  const yn = (text, ok, hints, visual) => ({ text, visual, choices: ["yes", "no"], answer: ok ? "yes" : "no", hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c || nudge, example] };
  };
  const table = (head, rows) => `<table style="border-collapse:collapse;margin:auto;font-size:0.95em"><tr>${head.map(h => `<th style="border:1px solid #889;padding:3px 10px;background:#dde4ff;color:#1a2a55">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #889;padding:3px 10px">${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const lg2 = n => { let k = 0, x = 1; while (x * 2 <= n) { x *= 2; k++; } return k; };
  const ordinal = k => ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"][k];

  // ======================= LEVEL 22 =======================
  const nestQ = () => {
    const f = ri(0, 3); let ans, lines;
    if (f === 0) { const n = ri(2, 9), m = ri(2, 9); ans = n * m; lines = ["count = 0", `for i from 1 to ${n}:`, `${sp}for j from 1 to ${m}:`, `${sp}${sp}count = count + 1`, "print count"]; }
    else if (f === 1) { const n = ri(3, 10); ans = n * (n + 1) / 2; lines = ["count = 0", `for i from 1 to ${n}:`, `${sp}for j from 1 to i:`, `${sp}${sp}count = count + 1`, "print count"]; }
    else if (f === 2) { const n = ri(2, 12), m = ri(2, 12); ans = n + m; lines = ["count = 0", `for i from 1 to ${n}:`, `${sp}count = count + 1`, `for j from 1 to ${m}:`, `${sp}count = count + 1`, "print count"]; }
    else { const lim = ri(20, 300); let x = 1; ans = 0; while (x < lim) { x *= 2; ans++; } lines = ["count = 0", "x = 1", `while x &lt; ${lim}:`, `${sp}x = x * 2`, `${sp}count = count + 1`, "print count"]; }
    return num("What does this program print?", ans, [
      "Count how many times the line count = count + 1 runs.",
      "For nested loops, think: the inner loop runs fully for every pass of the outer loop. For loops one after another, add the counts.",
      "Example: for i from 1 to 3 with an inner for j from 1 to 4 runs the inner line 3 x 4 = 12 times. Now do yours."
    ], code(lines));
  };
  const BIGO = [
    [["for each item in list:", "print item"], "O(n)", "A single pass over the data."],
    [["x = list[0]", "print x"], "O(1)", "The work does not depend on how long the list is."],
    [["for i in 1..n:", sp + "for j in 1..n:", sp + sp + "work()"], "O(n²)", "Two loops inside each other, each running as long as the input."],
    [["x = n", "while x &gt; 1:", sp + "x = x div 2"], "O(log n)", "The size is cut in parts again and again."],
    [["for i in 1..n: work()", "for j in 1..n: work()"], "O(n)", "The loops run one after the other, not inside each other."],
    [["for i in 1..n:", sp + "for j in 1..10:", sp + sp + "work()"], "O(n)", "The inner loop always runs the same fixed number of times."],
    [["lo = 0, hi = n - 1", "while lo &lt;= hi:", sp + "check the middle, then keep one half"], "O(log n)", "Each round throws away half of what is left."],
    [["for i in 1..n:", sp + "for j in 1..i:", sp + sp + "work()"], "O(n²)", "The inner loop grows with i, which adds up to about n times n over two."],
    [["total = 0", "for x in list: total = total + x", "print total"], "O(n)", "Every item is looked at once."]
  ];
  const bigoQ = () => {
    const [ln, r, c] = pick(BIGO);
    return mc("What is the time complexity of this code, where n is the input size?", r, ["O(1)", "O(n)", "O(log n)", "O(n²)", "O(2ⁿ)"].filter(x => x !== r), [
      "Ask how the number of steps grows when n gets much bigger.", c,
      "Example: a loop over n items with a fixed amount of work inside does about n steps, so it grows like n. Now do yours."
    ], code(ln));
  };
  const binQ = () => {
    if (Math.random() < 0.5) {
      const k = ri(3, 10);
      return num(`A sorted list has ${2 ** k} items. At most how many times can you halve it before only 1 item is left?`, k, [
        "Halve the size again and again and count the halvings.",
        "The answer is the power you raise 2 to in order to get the size.",
        "Example: 16 to 8 to 4 to 2 to 1 is 4 halvings. Now do yours."
      ], "✂️");
    }
    const n = pick([3, 7, 15, 31, 63, 127, 255, 1023, 100, 500, 1000, 40]);
    return num(`Binary search looks for a value in a sorted list of ${n} items. In the worst case, how many items does it check?`, lg2(n) + 1, [
      "Each check removes about half of the items that are left.",
      "Count the checks until one item or none is left. The answer is the whole number part of the halvings, plus the last check.",
      "Example: for 7 items: check 1 leaves 3, check 2 leaves 1, check 3 finishes. So 3 checks. Now do yours."
    ], "🔎");
  };
  const mergeQ = () => {
    if (Math.random() < 0.5) {
      const a = ri(2, 9), b = ri(2, 9);
      return num(`Merge step: you merge a sorted list of ${a} items with a sorted list of ${b} items. At most how many comparisons are needed?`, a + b - 1, [
        "Each comparison puts one item into the result, except for the last one.",
        "When one list runs out, the rest is copied with no more comparisons. So it is one less than the total number of items.",
        "Example: merging 2 items with 3 items needs at most 2 + 3 - 1 = 4 comparisons. Now do yours."
      ], "🔀");
    }
    const k = ri(2, 6);
    return num(`Merge sort sorts ${2 ** k} items by splitting in half again and again until single items remain. How many splitting levels are there?`, k, [
      "Each level halves the size of the pieces.",
      "Count how many halvings take you from the full size down to 1.",
      "Example: 8 items split into 4, then 2, then 1: that is 3 levels. Now do yours."
    ], "🔀");
  };
  const DC = [
    ["Merge sort has a time of:", "O(n log n)", ["O(n)", "O(n²)", "O(log n)"], "Count the levels of halving, then the work done on each level."],
    ["What does merge sort do first?", "Splits the list into two halves", ["Picks the smallest item and swaps it", "Checks if the list is already sorted", "Deletes duplicates"], "The name of the strategy is divide and conquer."],
    ["Quicksort chooses an item called a:", "Pivot", ["Hash", "Node", "Token"], "Items are split into smaller and bigger than this special item."],
    ["Quicksort is slowest when the pivot is always:", "The smallest or the largest item", ["The middle item", "A random item", "The average"], "A bad pivot makes one side nearly empty each time."],
    ["Binary search only works if the list is:", "Sorted", ["Short", "Made of numbers only", "Stored in a file"], "It decides which half to keep by comparing with the middle."],
    ["The merge step combines two sorted lists by:", "Repeatedly taking the smaller front item", ["Sorting them again from scratch", "Taking the biggest item last only", "Taking items at random"], "Look at the front of each list."],
    ["Insertion sort is fastest when the list is:", "Already sorted", ["In reverse order", "Very long and random", "Full of duplicates only"], "Then each new item is already in the right place."],
    ["A stable sort keeps:", "Equal items in their original order", ["The biggest item first", "The list in memory forever", "Only one copy of each item"], "It is about items that tie."]
  ];
  const stackQ = mode => () => {
    let ops, res, dsA;
    for (let t = 0; t < 50; t++) {
      const n = ri(5, 8); ops = []; dsA = []; let cnt = 0, vals = uniq(n, 1, 30), vi = 0;
      for (let i = 0; i < n; i++) { if (cnt > 0 && (Math.random() < 0.4 || i === n - 1)) { ops.push("remove"); cnt--; } else { ops.push(vals[vi++]); cnt++; } }
      if (ops[n - 1] === "remove") break;
    }
    for (const o of ops) { if (o === "remove") res = mode === "stack" ? dsA.pop() : dsA.shift(); else dsA.push(o); }
    const word = mode === "stack" ? "pop" : "dequeue", add = mode === "stack" ? "push" : "enqueue";
    const shown = ops.map(o => o === "remove" ? word + "()" : `${add}(${o})`).join(", ");
    const size = dsA.length;
    if (Math.random() < 0.3) return num(`A ${mode} starts empty. Operations: ${shown}. How many items are in it at the end?`, size, [
      "Adds make it bigger and removes make it smaller.", "Count the adds, then subtract the removes.",
      `Example: ${add}(4), ${add}(8), ${word}(), ${add}(1) leaves 2 items. Now do yours.`], mode === "stack" ? "📚" : "🚶");
    return num(`A ${mode} starts empty. Operations: ${shown}. What value does the last ${word}() return?`, res, mode === "stack" ? [
      "A stack is last in, first out: the newest item leaves first.", "Follow the operations in order and keep the stack written out with the top at the right.",
      "Example: push(4), push(8), pop() gives 8, then push(1), pop() gives 1. Now do yours."] : [
      "A queue is first in, first out: the oldest item leaves first.", "Follow the operations in order and keep the queue written out with the front at the left.",
      "Example: enqueue(4), enqueue(8), dequeue() gives 4, then enqueue(1), dequeue() gives 8. Now do yours."], mode === "stack" ? "📚" : "🚶");
  };
  const stackSQ = () => {
    const a = ri(1, 9), b = ri(10, 19), c = ri(20, 29), st = Math.random() < 0.5;
    return num(`The items ${a}, ${b}, ${c} are added in that order to a ${st ? "stack" : "queue"}. Then one item is removed. What value comes out?`, st ? c : a, st ? [
      "A stack is last in, first out.", "The newest item is on top.", "Example: add 1, 2, 3 to a stack and remove one: 3 comes out. Now do yours."] : [
      "A queue is first in, first out.", "The oldest item is at the front.", "Example: add 1, 2, 3 to a queue and remove one: 1 comes out. Now do yours."], st ? "📚" : "🚶");
  };
  const llQ = () => {
    const n = ri(4, 6), vals = uniq(n, 1, 40), k = ri(1, n - 1);
    return num(`A linked list is: ${vals.join(" → ")} → null. Start at the head and follow "next" ${k} time${k === 1 ? "" : "s"}. What value are you at?`, vals[k], [
      "The head is the first node. Each next moves you one node along.", "Following next zero times leaves you on the head.",
      "Example: in 5 → 8 → 2 → null, following next twice from the head reaches 2. Now do yours."], "⛓️");
  };
  const LL = [
    ["Reading the item at a given index in an array takes:", "O(1)", ["O(n)", "O(log n)", "O(n²)"], "The computer can jump straight to the position."],
    ["Finding the k-th node of a linked list takes:", "O(n)", ["O(1)", "O(log n)", "O(2ⁿ)"], "You must walk node by node from the head."],
    ["A node in a singly linked list holds:", "A value and a pointer to the next node", ["Only a number", "Two lists", "A copy of the whole list"], "Think about how nodes are chained."],
    ["What does the last node's next pointer hold?", "null (nothing)", ["The head", "Itself always", "A random node"], "It must say that the chain ends."],
    ["Inserting in the middle of an array is slow because:", "Items after it must be shifted", ["Arrays cannot hold numbers", "The array must be deleted", "Indexes are random"], "Think about making a gap."],
    ["A doubly linked list node also has a pointer to:", "The previous node", ["The tail only", "The operating system", "The compiler"], "The word doubly means two directions."],
    ["Adding a new node at the front of a linked list takes:", "O(1)", ["O(n)", "O(n²)", "O(log n)"], "Only a couple of pointers change."],
    ["If you lose the pointer to the head of a linked list:", "You lose access to the whole list", ["The list sorts itself", "Nothing changes", "The list doubles"], "Everything is reached by following the chain from one end."]
  ];
  const hashQ = () => {
    const size = pick([5, 7, 8, 10]), f = ri(0, 2);
    if (f === 0) { const k = ri(10, 99); return num(`A hash table has ${size} slots and uses the hash function: slot = key mod ${size}. Which slot does key ${k} go to?`, k % size, [
      "Mod means the remainder after dividing.", "Divide the key by the table size and keep only what is left over.",
      "Example: key 23 with 5 slots: 23 = 4 x 5 + 3, so slot 3. Now do yours."], "#️⃣"); }
    if (f === 1) { const ks = uniq(6, 10, 60); const s = ri(0, size - 1); const c = ks.filter(k => k % size === s).length; return num(`A table with ${size} slots uses slot = key mod ${size}. Keys inserted: ${ks.join(", ")}. How many keys land in slot ${s}?`, c, [
      "Work out the slot for every key.", "Count only the keys whose remainder equals the slot you were asked about.",
      "Example: keys 4, 9, 14, 7 with 5 slots: remainders 4, 4, 4, 2. Slot 4 gets 3 keys. Now do yours."], "#️⃣"); }
    const a = ri(10, 40), b = a + size * ri(1, 4);
    return num(`With slot = key mod ${size}, keys ${a} and ${b} collide. What slot do they share?`, a % size, [
      "Collide means they get the same slot.", "Find the remainder of either key.",
      "Example: 12 and 17 with 5 slots both give remainder 2, so they share slot 2. Now do yours."], "💥");
  };
  const bstBuild = arr => {
    let root = null;
    const ins = (nd, v) => { if (!nd) return { v, l: null, r: null }; if (v < nd.v) nd.l = ins(nd.l, v); else nd.r = ins(nd.r, v); return nd; };
    for (const v of arr) root = ins(root, v);
    return root;
  };
  const hgt = nd => nd ? 1 + Math.max(hgt(nd.l), hgt(nd.r)) : 0;
  const pre = nd => nd ? [nd.v, ...pre(nd.l), ...pre(nd.r)] : [];
  const ino = nd => nd ? [...ino(nd.l), nd.v, ...ino(nd.r)] : [];
  const post = nd => nd ? [...post(nd.l), ...post(nd.r), nd.v] : [];
  const lvl = nd => { const out = []; const q = nd ? [nd] : []; while (q.length) { const x = q.shift(); out.push(x.v); if (x.l) q.push(x.l); if (x.r) q.push(x.r); } return out; };
  const depthOf = (nd, v) => { let d = 1; while (nd.v !== v) { nd = v < nd.v ? nd.l : nd.r; d++; } return d; };
  const bstQ = () => {
    const arr = uniq(ri(5, 7), 1, 40), t = bstBuild(arr);
    if (Math.random() < 0.5) return num(`Insert ${arr.join(", ")} in that order into an empty binary search tree. How many levels does the tree have (a single root is 1 level)?`, hgt(t), [
      "Smaller values go left and bigger values go right.", "Draw the tree as you insert. Each new value starts at the root and walks down.",
      "Example: insert 5, 3, 8, 1 gives levels: 5 / 3 and 8 / 1 under 3. That is 3 levels. Now do yours."], "🌳");
    const v = pick(arr);
    return num(`Insert ${arr.join(", ")} in that order into an empty binary search tree. To find ${v}, how many nodes do you visit, counting the root and ${v} itself?`, depthOf(t, v), [
      "Start at the root and go left for smaller, right for bigger.", "Count each node you stand on, including the last one.",
      "Example: in the tree 5, 3, 8, 1 (inserted in that order), finding 1 visits 5, 3, 1: three nodes. Now do yours."], "🌳");
  };
  const travQ = () => {
    const arr = uniq(5, 1, 30), t = bstBuild(arr), which = pick(["preorder", "postorder", "in-order"]);
    const fn = { preorder: pre, postorder: post, "in-order": ino }[which];
    const s = a => a.join(", ");
    const wr = [pre, post, ino, lvl].map(f => s(f(t)));
    return mc(`Insert ${arr.join(", ")} in that order into an empty binary search tree. What is the ${which} traversal?`, s(fn(t)), wr, which === "preorder" ? [
      "Preorder: visit the node first, then the left side, then the right side.", "Every node is written before anything below it.",
      "Example: tree 5 with left 3 and right 8: preorder is 5, 3, 8. Now do yours."] : which === "postorder" ? [
      "Postorder: left side, right side, and the node last.", "A node is written only after everything below it.",
      "Example: tree 5 with left 3 and right 8: postorder is 3, 8, 5. Now do yours."] : [
      "In-order: left side, then the node, then the right side.", "For a search tree this comes out in a special order.",
      "Example: tree 5 with left 3 and right 8: in-order is 3, 5, 8. Now do yours."], "🌲");
  };
  const graphQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const n = ri(3, 8); return num(`A graph has ${n} nodes and every pair of nodes is joined by an edge. How many edges does it have?`, n * (n - 1) / 2, [
      "Each node connects to every other node, but each edge is counted twice that way.", "Multiply the nodes by the number of others, then halve.",
      "Example: 4 nodes: 4 x 3 / 2 = 6 edges. Now do yours."], "🕸️"); }
    if (f === 1) { const d = Array.from({ length: ri(3, 6) }, () => ri(1, 4)); let s = d.reduce((x, y) => x + y, 0); if (s % 2) d[0]++; s = d.reduce((x, y) => x + y, 0); return num(`The degrees (number of edges at each node) of a graph are ${lst(d)}. How many edges does the graph have?`, s / 2, [
      "Every edge touches two nodes.", "Add up all the degrees. Each edge was counted at both ends.",
      "Example: degrees [2, 2, 2] add to 6, so there are 3 edges. Now do yours."], "🕸️"); }
    if (f === 2) { const n = ri(3, 12); return num(`A tree (a connected graph with no loops) has ${n} nodes. How many edges does it have?`, n - 1, [
      "Each node except the root hangs from exactly one edge.", "Count the nodes that need a parent edge.",
      "Example: a tree with 5 nodes has 4 edges. Now do yours."], "🌳"); }
    const n = ri(3, 8); return num(`In an adjacency matrix for a graph with ${n} nodes, how many cells does the table have in total?`, n * n, [
      "There is one row and one column for each node.", "Rows times columns.",
      "Example: 3 nodes make a 3 by 3 table of 9 cells. Now do yours."], "🔢");
  };
  const bfsQ = () => {
    const N = "ABCDEFG", n = ri(5, 7), edges = [];
    for (let i = 1; i < n; i++) edges.push([ri(0, i - 1), i]);
    for (let e = 0; e < 2; e++) { const a = ri(0, n - 1), b = ri(0, n - 1); if (a !== b && !edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) edges.push([a, b]); }
    const adj = Array.from({ length: n }, () => []); edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    const d = Array(n).fill(-1); d[0] = 0; const q = [0];
    while (q.length) { const x = q.shift(); for (const y of adj[x]) if (d[y] < 0) { d[y] = d[x] + 1; q.push(y); } }
    return num(`A graph has these edges: ${edges.map(([a, b]) => N[a] + "-" + N[b]).join(", ")}. What is the fewest number of edges on a path from A to ${N[n - 1]}?`, d[n - 1], [
      "Breadth-first search explores the nodes closest to A first.", "List the neighbors of A (distance 1), then their new neighbors (distance 2), and so on.",
      "Example: edges A-B, B-C, A-C, C-D: D is reached from A by A-C-D, which is 2 edges. Now do yours."], "🗺️");
  };
  const GR = [
    ["Which structure does breadth-first search use to remember what to visit next?", "A queue", ["A stack", "A hash table", "A sorted array"], "It explores in the order nodes were discovered."],
    ["Depth-first search is naturally written with:", "Recursion or a stack", ["A queue only", "Sorting", "A hash table only"], "It goes as deep as it can before backing up."],
    ["Which finds the path with the fewest edges in a graph with no weights?", "Breadth-first search", ["Depth-first search", "Binary search", "Quicksort"], "Think about exploring layer by layer."],
    ["An adjacency list stores, for each node:", "A list of its neighbors", ["Its color", "The whole graph again", "Only its degree"], "The name tells you what is listed."],
    ["A graph where edges have arrows is called:", "Directed", ["Sorted", "Hashed", "Balanced"], "The arrows show a direction."],
    ["A path that starts and ends at the same node without repeating edges is a:", "Cycle", ["Leaf", "Pivot", "Bucket"], "Think of going around in a loop."]
  ];
  const heapQ = () => {
    const f = ri(0, 3), i = ri(0, 12);
    if (f === 0) return num(`A binary heap is stored in an array starting at index 0. What is the index of the left child of the node at index ${i}?`, 2 * i + 1, [
      "Children come after their parents in the array.", "The left child index is double the parent's index, plus one.",
      "Example: for index 3, the left child is at 2 x 3 + 1 = 7. Now do yours."], "⛰️");
    if (f === 1) return num(`A binary heap is stored in an array starting at index 0. What is the index of the right child of the node at index ${i}?`, 2 * i + 2, [
      "The right child comes just after the left child.", "The left child is at double the index plus one.",
      "Example: for index 3, the left child is 7 and the right child is 8. Now do yours."], "⛰️");
    if (f === 2) { const c = ri(1, 25); return num(`A binary heap is stored in an array starting at index 0. What is the index of the parent of the node at index ${c}?`, Math.floor((c - 1) / 2), [
      "Go backwards: the parent has a smaller index.", "Subtract one, halve, and drop the leftover.",
      "Example: for index 8, (8 - 1) / 2 = 3.5, so the parent is at index 3. Now do yours."], "⛰️"); }
    const n = ri(3, 100); return num(`A complete binary heap holds ${n} items. How many levels does it have (the top is level 1)?`, lg2(n) + 1, [
      "Each level holds twice as many items as the one above.", "Levels hold 1, 2, 4, 8, ... items. Find how many levels you need to fit all the items.",
      "Example: 10 items: levels hold 1 + 2 + 4 = 7, so a fourth level is needed. That is 4 levels. Now do yours."], "⛰️");
  };
  const HP = [
    ["In a min-heap, the smallest item is:", "At the root", ["At the last leaf", "In the middle", "Anywhere"], "The root is easy to reach."],
    ["A priority queue gives back first:", "The item with the highest priority", ["The oldest item always", "The newest item always", "A random item"], "It is not purely first in, first out."],
    ["Inserting into a heap takes about:", "O(log n)", ["O(1) always", "O(n²)", "O(n)"], "The new item moves up at most one step per level."],
    ["Heapsort has a time of:", "O(n log n)", ["O(n)", "O(n²)", "O(1)"], "Take n items out, each in logarithmic time."]
  ];
  const fibQ = () => {
    if (Math.random() < 0.6) {
      const c = [1, 1]; for (let i = 2; i <= 9; i++) c[i] = 1 + c[i - 1] + c[i - 2];
      const n = ri(3, 8);
      return num(`The code def fib(n): if n &lt; 2 return n; else return fib(n-1) + fib(n-2). How many function calls (including the first) does fib(${n}) make?`, c[n], [
        "Each call with n of 2 or more makes two more calls.", "calls(n) = 1 + calls(n-1) + calls(n-2). For n of 0 or 1, it is 1 call.",
        "Example: calls(2) = 1 + calls(1) + calls(0) = 1 + 1 + 1 = 3. Then calls(3) = 1 + 3 + 1 = 5. Now do yours."], "🌿");
    }
    const n = ri(4, 30);
    return num(`With memoization, each value fib(0), fib(1), ..., fib(${n}) is computed only once. How many different values are computed?`, n + 1, [
      "Memoization saves answers so they are never computed twice.", "Count the values from 0 up to n, including both ends.",
      "Example: for fib(5), the values fib(0) up to fib(5) are 6 different values. Now do yours."], "🗒️");
  };
  const stairQ = () => {
    const steps = Math.random() < 0.7 ? [1, 2] : [1, 2, 3], n = ri(3, steps.length === 2 ? 9 : 7), w = [1];
    for (let i = 1; i <= n; i++) w[i] = steps.reduce((s, k) => s + (i - k >= 0 ? w[i - k] : 0), 0);
    return num(`You climb a staircase of ${n} steps. Each move goes up ${steps.length === 2 ? "1 or 2" : "1, 2 or 3"} steps. How many different ways can you reach the top?`, w[n], [
      "Think about the last move you make to reach the top.", "ways(n) = the ways to reach the steps one move below it, added together. ways(0) = 1.",
      "Example with moves of 1 or 2: ways(1) = 1, ways(2) = 2, ways(3) = 1 + 2 = 3, ways(4) = 2 + 3 = 5. Now do yours."], "🪜");
  };
  const coinQ = () => {
    const sets = [[1, 3, 4], [1, 5, 6], [1, 4, 5], [1, 2, 5], [1, 3, 5], [1, 5, 10], [2, 5, 6], [1, 4, 6]];
    const coins = pick(sets), amt = ri(6, 15), INF = 999, best = [0];
    for (let a = 1; a <= amt; a++) { best[a] = INF; for (const c of coins) if (a - c >= 0 && best[a - c] + 1 < best[a]) best[a] = best[a - c] + 1; }
    if (best[amt] >= INF) return coinQ();
    return num(`You have unlimited coins of values ${coins.join(", ")}. What is the fewest coins that add up to exactly ${amt}?`, best[amt], [
      "Try the biggest coin first, but check whether another mix needs fewer coins.", "best(a) = 1 + the smallest best(a - coin) over each coin. Build up from 0.",
      "Example: coins 1, 5, 6 and amount 10: 5 + 5 uses 2 coins, but 6 + 1 + 1 + 1 + 1 uses 5. The fewest is 2. Now do yours."], "🪙");
  };
  const invQ = () => {
    const a = uniq(ri(4, 6), 1, 20); let c = 0;
    for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) c++;
    return num(`Bubble sort swaps neighbors that are in the wrong order, one swap at a time. How many swaps are needed to sort ${lst(a)} from smallest to largest?`, c, [
      "Each swap fixes exactly one pair that is out of order.", "Count the pairs where a bigger number comes before a smaller one.",
      "Example: [3, 1, 2] has the pairs (3,1) and (3,2) out of order, so 2 swaps. Now do yours."], "🫧");
  };
  const growQ = () => {
    const n = ri(2, 70); let cap = 1, res = 0;
    for (let i = 2; i <= n; i++) if (i > cap) { cap *= 2; res++; }
    return num(`A dynamic array starts with room for 1 item and doubles its room whenever it is full and another item arrives. After adding ${n} items, how many times has it grown?`, res, [
      "Capacity goes 1, 2, 4, 8, and so on.", "Count how many doublings you need until the capacity is at least the number of items.",
      "Example: for 5 items the capacity goes 1 to 2 to 4 to 8: three doublings. Now do yours."], "🧺");
  };
  const AM = [
    ["Appending to a dynamic array that doubles when full costs, on average per append:", "O(1) amortized", ["O(n) every time", "O(n²)", "O(log n) every time"], "Rare expensive copies are spread over many cheap appends."],
    ["Why does a dynamic array double its size instead of adding one slot?", "Copying happens rarely, so appends stay cheap on average", ["It uses less memory", "Arrays cannot grow by one", "It makes sorting faster"], "Think about how often the copying is done."],
    ["Amortized analysis looks at:", "The average cost over a long series of operations", ["Only the single worst call", "Only the best call", "The size of the screen"], "It is about many operations together."]
  ];

  const A22 = [nestQ, bigoQ, binQ, mergeQ, stackQ("stack"), stackQ("queue"), llQ, hashQ, bstQ, travQ, graphQ, bfsQ, heapQ, fibQ, stairQ, coinQ, invQ, growQ];
  const F22 = [facts(DC, "Think about how the algorithm works.", "Example: binary search needs a sorted list."), facts(LL, "Think about how the data is stored.", "Example: an array stores items side by side in memory."), facts(GR, "Think about how the search moves through the graph.", "Example: a queue serves the oldest waiting item first."), facts(HP, "Think about the shape of a heap.", "Example: a tree with n items has about log n levels when it is balanced.")];
  const lessons22 = [
    L("Counting steps in loops", nestQ, [
      S("Count the work", "🔢", "To compare algorithms, count how many times the main line runs. Nested loops <b>multiply</b> counts. Loops one after another <b>add</b> counts."),
      S("Triangles and halving", "📐", "If the inner loop runs <b>1 to i</b>, the total is 1 + 2 + ... + n = <b>n(n+1)/2</b>. If a value doubles each time, the loop runs only about <b>log₂ of the limit</b> times."),
      S("Try it", "📝", "Example: for i in 1 to 4, inner j in 1 to 3 runs 4 x 3 = 12 times.")]),
    L("Reading Big-O from code", bigoQ, [
      S("Big-O is a shape", "📈", "<b>Big-O</b> tells how the steps grow with the input size n: O(1), O(log n), O(n), O(n log n), O(n²)."),
      S("Spot the pattern", "🔍", "One pass = O(n). A loop inside a loop = O(n²). Halving each time = O(log n). Work that ignores n = O(1)."),
      S("Ignore the small stuff", "✂️", "Drop constants and smaller parts: n + 5 and 3n are both O(n). Only the fastest-growing part matters.")]),
    L("Binary search steps", binQ, [
      S("Halving", "✂️", "Binary search checks the middle of a <b>sorted</b> list, then keeps the half that could hold the target."),
      S("How many checks?", "🔎", "A list of n items needs at most about <b>log₂ n</b> halvings. 1000 items need only about 10 checks."),
      S("Worst case", "⚠️", "Worst case checks = floor(log₂ n) + 1. For 7 items: 3 checks, for 15 items: 4 checks.")]),
    L("Divide and conquer", mix(mergeQ, mergeQ, facts(DC, "Think about how the algorithm works.", "Example: binary search needs a sorted list.")), [
      S("Split, solve, combine", "🔀", "<b>Divide and conquer</b> splits a problem into smaller ones, solves each, then combines the answers."),
      S("Merge sort", "📚", "Merge sort splits the list in halves until single items remain, then <b>merges</b> sorted halves. It has log n levels and does about n work per level: <b>O(n log n)</b>."),
      S("Quicksort", "⚡", "Quicksort picks a <b>pivot</b> and puts smaller items on one side and bigger on the other. It is usually fast, but a bad pivot makes it O(n²).")]),
    L("Stacks", stackQ("stack"), [
      S("Last in, first out", "📚", "A <b>stack</b> works like a pile of plates. <b>push</b> puts an item on top. <b>pop</b> takes the top item off."),
      S("Where stacks are used", "↩️", "Undo buttons, the call stack for functions, and checking matching brackets all use stacks."),
      S("Trace it", "📝", "Example: push(3), push(7), pop() gives 7, push(2), pop() gives 2. The stack now holds just 3.")]),
    L("Queues", mix(stackQ("queue"), stackQ("queue"), stackSQ), [
      S("First in, first out", "🚶", "A <b>queue</b> works like a line at a shop. <b>enqueue</b> adds at the back. <b>dequeue</b> removes from the front."),
      S("Where queues are used", "🖨️", "Print jobs, keyboard input and breadth-first search use queues."),
      S("Stack or queue?", "🔁", "Add 1, 2, 3 and remove one: a stack gives <b>3</b> and a queue gives <b>1</b>.")]),
    L("Linked lists", mix(llQ, llQ, facts(LL, "Think about how the data is stored.", "Example: an array stores items side by side in memory.")), [
      S("A chain of nodes", "⛓️", "A <b>linked list</b> is made of nodes. Each node has a <b>value</b> and a pointer to the <b>next</b> node. The last points to null."),
      S("Strengths", "➕", "Adding or removing at the front is fast (O(1)): only a pointer changes. No shifting is needed."),
      S("Weakness", "🐢", "To reach the k-th node you must walk from the head, so access is O(n). Arrays jump straight there in O(1).")]),
    L("Hash tables", hashQ, [
      S("A magic index", "#️⃣", "A <b>hash table</b> uses a hash function to turn a key into a slot number, like <b>key mod size</b>."),
      S("Collisions", "💥", "Two keys can land in the same slot. This is a <b>collision</b>. One fix is <b>chaining</b>: each slot keeps a small list."),
      S("Why they are great", "⚡", "Looking up a key takes about O(1) on average, much faster than searching a long list.")]),
    L("Binary search trees", bstQ, [
      S("Left small, right big", "🌳", "In a <b>binary search tree</b>, every node's left side holds smaller values and the right side holds bigger values."),
      S("Insert and find", "🔎", "To insert or find a value, start at the root and go left or right at each node. Each step cuts out a whole side."),
      S("Shape matters", "⚖️", "A balanced tree with n items has about log n levels. If you insert sorted values, the tree becomes a long chain with n levels.")]),
    L("Walking a tree", travQ, [
      S("Three orders", "🌲", "<b>Preorder</b>: node, left, right. <b>In-order</b>: left, node, right. <b>Postorder</b>: left, right, node."),
      S("In-order is sorted", "🔢", "For a binary search tree, in-order gives the values from smallest to largest."),
      S("Example", "📝", "Tree: root 5, left child 3, right child 8. Preorder: 5, 3, 8. In-order: 3, 5, 8. Postorder: 3, 8, 5.")]),
    L("Graphs: nodes and edges", graphQ, [
      S("Nodes and edges", "🕸️", "A <b>graph</b> has nodes (dots) joined by edges (lines). Maps, friends and networks are graphs."),
      S("Degree", "🔗", "The <b>degree</b> of a node is how many edges touch it. The degrees of all nodes add up to <b>twice the number of edges</b>."),
      S("Handy counts", "🧮", "A tree with n nodes has n - 1 edges. A graph with every pair connected has n(n-1)/2 edges.")]),
    L("Searching a graph", mix(bfsQ, bfsQ, facts(GR, "Think about how the search moves through the graph.", "Example: a queue serves the oldest waiting item first.")), [
      S("Breadth-first", "🌊", "<b>BFS</b> visits the start, then all its neighbors, then their neighbors. It uses a <b>queue</b>."),
      S("Shortest path", "🗺️", "In a graph with no weights, BFS finds the path with the fewest edges, because it explores in layers."),
      S("Depth-first", "🧗", "<b>DFS</b> goes as deep as possible before backing up. It uses a <b>stack</b> or recursion.")]),
    L("Heaps and priority queues", mix(heapQ, heapQ, facts(HP, "Think about the shape of a heap.", "Example: a tree with n items has about log n levels when it is balanced.")), [
      S("Smallest on top", "⛰️", "A <b>min-heap</b> keeps the smallest item at the root. A <b>priority queue</b> hands out the most important item first."),
      S("Stored in an array", "📦", "For index i (starting at 0): left child = <b>2i + 1</b>, right child = <b>2i + 2</b>, parent = <b>(i - 1) div 2</b>."),
      S("Speed", "⚡", "Insert and remove-min take O(log n) because an item moves along one path of the tree.")]),
    L("Repeated calls and memoization", fibQ, [
      S("A slow recursion", "🌿", "Naive fib(n) calls fib(n-1) and fib(n-2), and those repeat the same work again and again. The calls grow exponentially."),
      S("Memoization", "🗒️", "<b>Memoization</b> saves each answer the first time. After that it is just a lookup. Fib then needs only n + 1 values."),
      S("Count the calls", "🔢", "calls(0) = calls(1) = 1. calls(n) = 1 + calls(n-1) + calls(n-2). So 1, 1, 3, 5, 9, 15, 25, 41, ...")]),
    L("Dynamic programming: counting ways", stairQ, [
      S("Build from small cases", "🧱", "<b>Dynamic programming</b> solves small problems first and uses their answers for bigger ones."),
      S("Stairs", "🪜", "To reach step n with moves of 1 or 2, your last move came from n-1 or n-2. So ways(n) = ways(n-1) + ways(n-2)."),
      S("Table", "📋", "ways(0)=1, ways(1)=1, ways(2)=2, ways(3)=3, ways(4)=5, ways(5)=8. Fill the table once, left to right.")]),
    L("Dynamic programming: fewest coins", coinQ, [
      S("Greedy can fail", "🪙", "With coins 1, 3, 4 and amount 6, taking the biggest coin first gives 4 + 1 + 1 (3 coins). But 3 + 3 is only 2 coins."),
      S("The recurrence", "🧮", "best(a) = 1 + the smallest of best(a - c) over every coin c that fits. best(0) = 0."),
      S("Fill the table", "📋", "Work out best(1), best(2), best(3), ... in order. Each answer reuses earlier ones.")]),
    L("Counting swaps (inversions)", invQ, [
      S("Out-of-order pairs", "🫧", "An <b>inversion</b> is a pair where a bigger number comes before a smaller one."),
      S("Swaps = inversions", "🔁", "Each swap of two neighbors fixes exactly one inversion, so bubble sort does exactly as many swaps as there are inversions."),
      S("Example", "📝", "[2, 4, 1, 3]: the pairs (2,1), (4,1), (4,3) are out of order. That is 3 inversions, so 3 swaps.")]),
    L("Growing arrays", mix(growQ, growQ, facts(AM, "Think about how often the expensive copy happens.", "Example: doubling means a copy is needed only after 1, 2, 4, 8 ... items.")), [
      S("Arrays fill up", "🧺", "A <b>dynamic array</b> (like a Python list) is stored in a block of fixed size. When the block is full, it makes a bigger block and copies everything."),
      S("Doubling", "✖️", "If the size doubles each time, copies are rare. The capacity runs 1, 2, 4, 8, 16, ..."),
      S("Amortized cost", "⚖️", "Most appends are cheap, a few are expensive. Averaged over many appends, each costs <b>O(1) amortized</b>.")]),
    L("Mixed practice", mix(...A22, ...F22.slice(0, 2)), MIXS("counting steps, Big-O, binary search, merge sort, stacks and queues, linked lists, hashing, trees, graphs, heaps, dynamic programming and amortized cost.")),
    L("Level 22 Challenge", mix(...A22, ...F22), MIXS("everything from level 22: algorithm analysis, data structures in depth and the first dynamic programming ideas."))
  ];

  // ======================= LEVEL 23 =======================
  const PT = [
    ["A running program with its own memory is called a:", "Process", ["Token", "Pixel", "Packet"], "Think of a whole program in action."],
    ["Threads of the same process share:", "Memory", ["Nothing at all", "Only the keyboard", "A separate copy of the program each"], "That sharing is why races can happen."],
    ["Which is usually cheaper to create?", "A thread", ["A process", "A new computer", "A new compiler"], "It has less to set up."],
    ["Why might a program use several threads?", "To do work at the same time or stay responsive", ["To use less memory in every case", "To avoid writing functions", "To stop bugs"], "Think about a download that must not freeze the screen."],
    ["Concurrency means:", "Several tasks make progress during overlapping time", ["Only one task ever exists", "A task that never ends", "Deleting tasks"], "Tasks take turns or run together."],
    ["Parallelism means:", "Tasks really run at the same instant on different cores", ["Tasks are kept in a queue", "Tasks are written twice", "A program is paused"], "Think about more than one worker at once."],
    ["A crash in one process usually:", "Does not crash other processes", ["Crashes the whole computer always", "Deletes all files", "Stops the keyboard forever"], "Processes are kept apart from each other."],
    ["A CPU core can run at one instant:", "One thread (without special hardware tricks)", ["Every thread in the computer", "No threads", "Only the operating system's files"], "Think of one worker doing one job."]
  ];
  const raceQ = () => {
    const s = ri(0, 20), a = ri(1, 9), b = ri(1, 9), f = ri(0, 2);
    const code1 = code(["Thread 1: temp = x; x = temp + " + a, "Thread 2: temp = x; x = temp + " + b]);
    if (f === 0) return num(`The shared variable x starts at ${s}. The threads run one after the other: Thread 1 finishes completely, then Thread 2. What is x at the end?`, s + a + b, [
      "No overlap means no lost updates.", "Apply the first change, then the second to the new value.",
      "Example: x = 5, one thread adds 2, then the other adds 3: 5 + 2 + 3 = 10. Now do yours."], code1);
    const first = f === 1 ? 1 : 2, last = first === 1 ? 2 : 1;
    return num(`The shared variable x starts at ${s}. Both threads read x first (both see ${s}). Then Thread ${first} writes, and finally Thread ${last} writes. What is x at the end?`, s + (last === 1 ? a : b), [
      "Both threads worked from the old value of x.", "The thread that writes last overwrites the other's result.",
      "Example: x = 5. Both read 5. Thread 1 adds 2 (writes 7), Thread 2 adds 3 and writes last, so x = 8. Now do yours."], code1);
  };
  const LOCK = [
    ["What does a lock (mutex) do?", "Lets only one thread at a time use a shared resource", ["Makes the program faster by magic", "Deletes shared data", "Copies the data to every thread"], "Think of one key for one room."],
    ["Deadlock is when:", "Threads wait for each other forever", ["A thread finishes early", "Two threads share a variable", "The program is compiled"], "Each one holds something the other needs."],
    ["Which is NOT needed for deadlock?", "Threads that never use locks at all", ["Mutual exclusion", "Hold and wait", "Circular wait"], "Look for the one that is the opposite of holding resources."],
    ["A simple way to avoid deadlock is to:", "Always take locks in the same order", ["Use more threads", "Never release locks", "Take the locks at random"], "Remove the circle of waiting."],
    ["A critical section is:", "Code that touches shared data and must not be interrupted by another thread's use of it", ["A section of the screen", "The first line of a program", "A comment"], "Think about the code that needs protection."],
    ["Holding a lock for a very long time can cause:", "Other threads to wait and the program to slow down", ["A faster program", "No effects", "The lock to disappear"], "Others are standing in line."],
    ["If every thread must release its lock before asking for another, which deadlock condition is removed?", "Hold and wait", ["Mutual exclusion", "Circular wait only by accident", "Compiling"], "Think about holding one thing while waiting for another."]
  ];
  const lockQ = () => {
    const same = Math.random() < 0.5;
    return yn(`Thread 1 takes lock A, then lock B. Thread 2 takes lock ${same ? "A, then lock B" : "B, then lock A"}. Could these two threads deadlock?`, !same, [
      "Deadlock needs a circle: each thread holds something the other wants.", "Check whether both threads ask for the locks in the same order.",
      "Example: both take lock X then lock Y: whoever gets X first can finish, so no deadlock. If one took Y then X, they might get stuck. Now do yours."], "🔒");
  };
  const fcfsQ = () => {
    const sjf = Math.random() < 0.4, n = ri(3, 4), b = Array.from({ length: n }, () => ri(1, 9)), o = sjf ? b.slice().sort((x, y) => x - y) : b;
    let w = 0, t = 0; for (const x of o) { w += t; t += x; }
    return num(`${n} jobs arrive at time 0 with run times ${lst(b)} (in that order). The scheduler runs them ${sjf ? "shortest job first" : "first come, first served"}. What is the total of all the waiting times?`, w, [
      "A job's waiting time is how long it sits before it starts.", sjf ? "Sort the jobs from shortest to longest first, then add up when each one starts." : "Keep the given order. The first job waits 0; each later job waits for all the jobs before it.",
      "Example: run times [3, 2] in order: waits are 0 and 3, total 3. Shortest first would be [2, 3]: waits 0 and 2, total 2. Now do yours."], "🕒");
  };
  const rr = (b, q) => {
    const rem = b.slice(), fin = b.map(() => 0), queue = b.map((_, i) => i); let t = 0;
    while (queue.length) { const i = queue.shift(), s = Math.min(q, rem[i]); t += s; rem[i] -= s; if (rem[i] > 0) queue.push(i); else fin[i] = t; }
    return fin;
  };
  const rrQ = () => {
    const n = ri(2, 4), b = Array.from({ length: n }, () => ri(2, 8)), q = ri(2, 4), fin = rr(b, q), k = ri(0, n - 1);
    return num(`Round robin with a time slice of ${q}: jobs J1 to J${n} with run times ${lst(b)} are all ready at time 0, in order. Unfinished jobs go to the back of the line. At what time does J${k + 1} finish?`, fin[k], [
      "Each job runs for the time slice (or less if it finishes), then the next job gets a turn.", "Keep a clock and a line of jobs. Write down the clock after each turn.",
      "Example: slice 2, jobs [3, 1]: J1 runs 2 (clock 2), J2 runs 1 (clock 3, done), J1 runs 1 (clock 4, done). Now do yours."], "🔄");
  };
  const PG = [
    ["Virtual memory gives each process:", "Its own private view of addresses", ["The whole disk", "Direct control of the CPU", "No memory at all"], "Think about how programs are kept apart."],
    ["A page table maps:", "Virtual pages to physical frames", ["Files to passwords", "Threads to colors", "Tokens to letters"], "It translates addresses."],
    ["A page fault happens when:", "The needed page is not in main memory", ["The program ends", "The CPU gets hot", "A file is saved"], "The page may have to be loaded from disk."],
    ["Why does the operating system use paging?", "So memory can be shared and used flexibly", ["To make the screen bigger", "To delete old programs", "To change IP addresses"], "Small fixed-size blocks are easy to hand out."]
  ];
  const pageQ = () => {
    const P = pick([100, 256, 1000, 512]), f = ri(0, 2);
    if (f === 0) { const a = ri(P, P * 12 + P - 1); return num(`The page size is ${P} bytes. Which page number holds virtual address ${a}? (Pages count from 0.)`, Math.floor(a / P), [
      "Divide the address by the page size.", "Drop the leftover after dividing.",
      "Example: page size 100, address 345: 345 / 100 = 3 with leftover 45, so page 3. Now do yours."], "📄"); }
    if (f === 1) { const a = ri(P, P * 12 + P - 1); return num(`The page size is ${P} bytes. What is the offset (position inside the page) of virtual address ${a}?`, a % P, [
      "The offset is the leftover after dividing by the page size.", "Use mod.",
      "Example: page size 100, address 345: the offset is 45. Now do yours."], "📄"); }
    const pg = ri(0, 3), off = ri(0, P - 1), fr = shuf([5, 7, 2, 9]); const frame = fr[pg];
    return num(`The page size is ${P}. The page table maps page 0 to frame ${fr[0]}, page 1 to frame ${fr[1]}, page 2 to frame ${fr[2]}, page 3 to frame ${fr[3]}. A program uses page ${pg} with offset ${off}. What is the physical address (frame number x page size + offset)?`, frame * P + off, [
      "Find the frame for the page first.", "Multiply the frame number by the page size, then add the offset.",
      "Example: page size 100, page 1 maps to frame 4, offset 20: 4 x 100 + 20 = 420. Now do yours."], "🧭");
  };
  const refs = () => Array.from({ length: ri(8, 11) }, () => ri(1, 5));
  const fifoQ = () => {
    const r = refs(), cap = ri(2, 3), fr = []; let f = 0;
    for (const x of r) if (!fr.includes(x)) { f++; if (fr.length === cap) fr.shift(); fr.push(x); }
    return num(`Memory holds ${cap} pages. Pages are requested in this order: ${r.join(", ")}. Using FIFO replacement (remove the page that has been there longest), how many page faults happen? Memory starts empty.`, f, [
      "A fault happens each time the requested page is not in memory.", "When memory is full, the page that arrived first is removed. A hit does not change the order.",
      "Example: 2 frames, requests 1, 2, 1, 3: faults for 1, 2, then hit for 1, then fault for 3 (removes 1). That is 3 faults. Now do yours."], "🧩");
  };
  const lruQ = () => {
    const r = refs(), cap = ri(2, 3); let fr = [], f = 0;
    for (const x of r) { if (fr.includes(x)) { fr = fr.filter(y => y !== x); fr.push(x); } else { f++; if (fr.length === cap) fr.shift(); fr.push(x); } }
    return num(`Memory holds ${cap} pages. Pages are requested in this order: ${r.join(", ")}. Using LRU replacement (remove the page used least recently), how many page faults happen? Memory starts empty.`, f, [
      "Use a hit to mark a page as recently used.", "When memory is full, remove the page whose last use was longest ago.",
      "Example: 2 frames, requests 1, 2, 1, 3: 1 and 2 fault, 1 is a hit (now 2 is the oldest), 3 faults and removes 2. That is 3 faults. Now do yours."], "🧩");
  };
  const KF = [
    ["The kernel is:", "The core of the operating system with full control of the hardware", ["A kind of game", "A web browser", "A text file"], "It sits between programs and hardware."],
    ["A system call is how a program:", "Asks the operating system to do something, like read a file", ["Calls a friend", "Compiles itself", "Speeds up the CPU"], "Programs cannot touch hardware directly."],
    ["Why do user programs run in a limited mode?", "So one program cannot break the rest of the computer", ["To save electricity only", "To avoid using files", "Because they are slower"], "Think about safety."],
    ["A file system organizes:", "Data on a drive into files and folders", ["Network cables", "CPU registers", "Compilers"], "It gives names and places to data."],
    ["An absolute path starts from:", "The root of the file system", ["The current folder", "The last file used", "The internet"], "Think about the very top."],
    ["A device driver is:", "Software that lets the operating system talk to a piece of hardware", ["A person who drives", "A kind of virus", "A file format"], "It is a translator for hardware."],
    ["An interrupt is:", "A signal that makes the CPU pause and handle an event", ["A bug that deletes files", "A type of loop", "A password"], "A key press needs attention right away."],
    ["The operating system's scheduler decides:", "Which process or thread gets the CPU next", ["Which website to visit", "The names of variables", "How loud the speakers are"], "Many things want the CPU at once."]
  ];
  const PIPE = [
    ["Which step turns the source text into tokens?", "Lexer (scanner)", ["Parser", "Optimizer", "Linker"], "It reads characters and groups them into words and symbols."],
    ["Which step builds a tree from the tokens?", "Parser", ["Lexer", "Linker", "Loader"], "It checks the grammar."],
    ["What is an AST?", "A tree that shows the structure of the program", ["A type of loop", "An error message", "A file on disk"], "The letters stand for abstract syntax tree."],
    ["A syntax error is found when:", "The code breaks the grammar rules of the language", ["The program gives a wrong answer", "The computer is slow", "A file is missing"], "Think about a sentence with no verb."],
    ["A logic error is when:", "The program runs but gives the wrong result", ["The code cannot be parsed", "The file will not open", "The compiler crashes"], "The grammar is fine."],
    ["What does an optimizer do?", "Changes the code to run faster or use less memory without changing its meaning", ["Adds new features", "Finds the user's name", "Prints the code"], "The result must stay the same."],
    ["What does the code generator produce?", "Machine code or bytecode", ["Pictures", "The source file", "Network packets"], "The final form that can run."],
    ["A linker:", "Joins compiled pieces and libraries into one program", ["Cuts the program in two", "Writes comments", "Starts the game"], "Think about connecting parts."]
  ];
  const tokQ = () => {
    const a = ri(2, 9), b = ri(10, 99), nm = pick(["total", "score", "count", "x", "price"]);
    const T = [`${nm} = ${a} + ${b}`, `print(${nm})`, `if ${nm} &gt; ${a}: stop`, `${nm} = foo(${a}, ${b})`, `y = (${a} + ${b}) * ${a}`, `while ${nm} != ${a}`];
    const s = pick(T), plain = s.replace(/&gt;/g, ">");
    return num("A lexer splits the code into tokens: names, numbers and symbols (a two-character symbol like != is one token, and spaces are not tokens). How many tokens are in this line?", plain.match(/[A-Za-z_]\w*|\d+|==|<=|>=|!=|\S/g).length, [
      "Count each name, each number and each symbol.", "Parentheses, commas and operators count as separate tokens.",
      "Example: y = 5 + 2 has the tokens y, =, 5, +, 2: that is 5 tokens. Now do yours."], code([s]));
  };
  const precQ = () => {
    for (let t = 0; t < 60; t++) {
      const n = [ri(2, 9), ri(2, 9), ri(2, 9), ri(2, 9)], o = [pick(["+", "-", "*"]), pick(["+", "-", "*"]), pick(["+", "-", "*"])];
      let s = `${n[0]} ${o[0]} ${n[1]} ${o[1]} ${n[2]} ${o[2]} ${n[3]}`;
      if (Math.random() < 0.3) s = `(${n[0]} ${o[0]} ${n[1]}) ${o[1]} ${n[2]} ${o[2]} ${n[3]}`;
      const v = new Function("return " + s)();
      if (v >= 0 && v < 200 && /\*/.test(s) && /[+-]/.test(s)) return num("Evaluate with the normal rules: parentheses first, then multiplication, then addition and subtraction from left to right (the * means times).", v, [
        "A parse tree puts multiplication lower in the tree, so it is done before + and -.", "Do the brackets first, then the times signs, then go left to right.",
        "Example: 2 + 3 * 4 - 1 = 2 + 12 - 1 = 13. Now do yours."], code([s]));
    }
    return num("Evaluate: 2 + 3 * 4 (the * means times).", 14, ["Times comes before plus.", "Do 3 times 4 first.", "Example: 1 + 2 * 5 = 11. Now do yours."], code(["2 + 3 * 4"]));
  };
  const INTP = [
    ["A compiler translates:", "The whole program before it runs", ["One line while it runs only", "Images into text", "Text into sound"], "Think about translating a whole book first."],
    ["An interpreter:", "Runs the program step by step, reading the source as it goes", ["Never reads the source", "Translates the whole program once and then disappears", "Only checks spelling"], "Think about a person translating live in a conversation."],
    ["Bytecode is:", "A compact code for a virtual machine", ["A kind of picture", "The same as source code", "A password type"], "It sits between source code and machine code."],
    ["Which usually runs with a virtual machine and bytecode?", "Java", ["Plain text files", "Spreadsheets only", "Images"], "Its programs compile to .class files first."],
    ["A JIT compiler:", "Compiles hot parts of a program to machine code while it runs", ["Compiles before the computer is turned on", "Only checks types", "Deletes unused code files"], "JIT stands for just in time."],
    ["One benefit of compiled programs is:", "They often run faster", ["They need no computer", "They never have bugs", "They are always smaller"], "Translation work is done in advance."],
    ["One benefit of interpreted languages is:", "Quick to test: change and run right away", ["The code cannot be read", "No errors can happen", "They always use less memory"], "No separate build step."],
    ["Machine code is:", "Instructions the CPU runs directly", ["Code only humans read", "The names of variables", "A web address"], "It is the lowest level of code."]
  ];
  const closQ = () => {
    const s = ri(0, 9), t = ri(1, 5), s2 = ri(0, 9), t2 = ri(1, 5);
    const head = ["def make_counter(start, step):", `${sp}count = start`, `${sp}def tick():`, `${sp}${sp}count = count + step`, `${sp}${sp}return count`, `${sp}return tick`];
    if (Math.random() < 0.5) { const n = ri(2, 4); return num(`The function tick remembers count, even after make_counter has finished (a closure). What does the last line print?`, s + n * t, [
      "Each call to c() changes the remembered count.", "Add the step once for every call, starting from the start value.",
      "Example: make_counter(1, 2), then three calls give 3, 5, 7. Now do yours."], code([...head, `c = make_counter(${s}, ${t})`, ...Array(n - 1).fill("c()"), "print c()"])); }
    return num("Each counter made by make_counter has its own count (closures). What does the last line print?", (s + 3 * t) + (s2 + 2 * t2), [
      "The two counters do not affect each other.", "Work out a's value after three calls and b's value after two calls, then add.",
      "Example: a = make_counter(1, 2) after two calls is 5; b = make_counter(0, 3) after one call is 3; sum 8. Now do yours."],
      code([...head, `a = make_counter(${s}, ${t})`, `b = make_counter(${s2}, ${t2})`, "a()", "a()", "b()", "print a() + b()"]));
  };
  const binQ2 = () => {
    const f = ri(0, 3);
    if (f === 0) { const k = ri(1, 100); return num(`In 8-bit two's complement, the number -${k} is stored. If you read the same 8 bits as a plain positive binary number, what value do you get?`, 256 - k, [
      "Negative numbers wrap around: 256 values fit in 8 bits.", "The stored pattern equals 256 minus the size of the negative number.",
      "Example: -3 is stored as 256 - 3 = 253 (11111101). Now do yours."], "🔢"); }
    if (f === 1) { const D = "0123456789ABCDEF", a = ri(1, 15), b = ri(0, 15); return num(`What is the hexadecimal number ${D[a]}${D[b]} in decimal? (Digits A to F mean 10 to 15.)`, a * 16 + b, [
      "The left digit is worth 16 each.", "Multiply the left digit by 16 and add the right digit.",
      "Example: 2C = 2 x 16 + 12 = 44. Now do yours."], "🔢"); }
    if (f === 2) { const n = pick([5, 9, 17, 30, 33, 100, 200, 300, 600, 1000]); let b = 0; while (2 ** b < n) b++; return num(`What is the smallest number of bits that can give ${n} different values?`, b, [
      "n bits give 2 x 2 x ... (n times) different patterns.", "Find the smallest power of 2 that is at least the number of values.",
      "Example: 20 values: 4 bits give 16 (too few) and 5 bits give 32. So 5 bits. Now do yours."], "🔢"); }
    const bits = Array.from({ length: 6 }, () => ri(0, 1)); bits[0] = 1;
    return num(`What is the binary number ${bits.join("")} in decimal?`, parseInt(bits.join(""), 2), [
      "From the right, the places are worth 1, 2, 4, 8, 16, 32.", "Add the place values where there is a 1.",
      "Example: 1011 = 8 + 2 + 1 = 11. Now do yours."], "🔢");
  };
  const regQ = () => {
    const a = ri(1, 9), n = ri(2, 5), d = ri(1, 6);
    if (Math.random() < 0.6) return num("A tiny CPU runs these instructions. SUB R2, 1 makes R2 one smaller, and JNZ R2, loop jumps back to loop if R2 is not 0. What is in R1 at the end?", a + n * d, [
      "Find out how many times the loop runs.", "R2 counts the loops. Each loop adds the same amount to R1.",
      "Example: LOAD R1, 2 / LOAD R2, 3 / loop: ADD R1, 4 / SUB R2, 1 / JNZ R2, loop. Three loops add 12 to 2, so R1 = 14. Now do yours."],
      code([`LOAD R1, ${a}`, `LOAD R2, ${n}`, `loop: ADD R1, ${d}`, "SUB R2, 1", "JNZ R2, loop", "HALT"]));
    const m = ri(2, 3), k = ri(2, 3);
    return num("A tiny CPU runs these instructions. MUL R1, m multiplies R1 by m. What is in R1 at the end?", a * m ** k, [
      "Count how many times the loop runs.", "Each loop multiplies R1 by the same number.",
      "Example: LOAD R1, 1 / LOAD R2, 3 / loop: MUL R1, 2 / SUB R2, 1 / JNZ R2, loop. Three doublings of 1 give 8. Now do yours."],
      code([`LOAD R1, ${a}`, `LOAD R2, ${k}`, `loop: MUL R1, ${m}`, "SUB R2, 1", "JNZ R2, loop", "HALT"]));
  };
  const GC = [
    ["Local variables of a function are usually stored on the:", "Stack", ["Heap", "Hard drive only", "Network"], "They disappear when the function returns."],
    ["Objects that live as long as they are referenced are often stored on the:", "Heap", ["Stack frame", "Keyboard", "Screen"], "It is a large pool of memory."],
    ["Garbage collection:", "Frees memory that the program can no longer reach", ["Deletes the source code", "Compresses pictures", "Speeds up the network"], "It cleans up for you."],
    ["A memory leak is when a program:", "Keeps memory it no longer needs", ["Uses a lot of CPU", "Opens too many windows", "Writes in the wrong language"], "It keeps growing."],
    ["What does a stack overflow usually come from?", "Recursion that goes too deep or never stops", ["Too many files", "A slow network", "A big monitor"], "Each call adds a new frame to the stack."],
    ["A dangling pointer points to:", "Memory that has already been freed", ["The first item", "The CPU", "A printer"], "The thing it points to is gone."],
    ["Reference counting frees an object when:", "Nothing refers to it any more", ["It is old", "It is small", "The screen is off"], "It counts how many users the object has."],
    ["Which languages require the programmer to free memory by hand?", "C", ["Python", "JavaScript", "Java"], "It gives you a lot of power and a lot of responsibility."]
  ];
  const amdQ = () => {
    const p = pick([40, 60, 80, 90]), n = pick([2, 4, 5, 10].filter(x => p % x === 0));
    return num(`A job takes 100 seconds on one core. ${p} seconds of it can be split perfectly across cores; the other ${100 - p} seconds must run on one core. How long does it take with ${n} cores?`, 100 - p + p / n, [
      "Only the part that can be split gets faster.", "Time = the part that cannot be split + the splittable part divided by the number of cores.",
      "Example: 100 seconds, 50 can be split, 2 cores: 50 + 50 / 2 = 75 seconds. Now do yours."], "🧮");
  };
  const AMF = [
    ["Amdahl's law says the speedup from more cores is limited by:", "The part that must run in sequence", ["The color of the cores", "The size of the screen", "The speed of typing"], "Some work cannot be shared."],
    ["Adding more cores helps most when the work is:", "Easy to split into independent pieces", ["One long chain of steps that need each other", "Tiny", "Waiting for the user"], "Independent pieces can run at the same time."]
  ];
  const A23 = [raceQ, lockQ, fcfsQ, rrQ, pageQ, fifoQ, lruQ, tokQ, precQ, closQ, binQ2, regQ, amdQ];
  const F23 = [facts(PT, "Think about how a program is split up.", "Example: a process has its own memory, and threads share it."), facts(LOCK, "Think about who waits for whom.", "Example: a lock lets one thread in at a time."), facts(PG, "Think about how memory is divided into pages.", "Example: a page table translates virtual to physical addresses."), facts(KF, "Think about the job of the operating system.", "Example: the kernel controls the hardware for all programs."), facts(PIPE, "Think about the stages of a compiler.", "Example: the lexer reads characters and makes tokens."), facts(INTP, "Think about when the translation happens.", "Example: a compiler translates before the program runs."), facts(GC, "Think about where data lives in memory.", "Example: local variables live on the stack."), facts(AMF, "Think about what limits the speedup.", "Example: if only part of a job can be split, that part limits the gain.")];
  const lessons23 = [
    L("Processes and threads", facts(PT, "Think about how a program is split up.", "Example: a process has its own memory, and threads share it."), [
      S("Process", "🗂️", "A <b>process</b> is a running program with its own private memory."),
      S("Thread", "🧵", "A <b>thread</b> is a path of execution inside a process. Threads of one process <b>share</b> its memory."),
      S("Concurrent or parallel", "⚙️", "<b>Concurrency</b>: tasks overlap in time. <b>Parallelism</b>: tasks really run at the same instant on different cores.")]),
    L("Race conditions", raceQ, [
      S("Shared data", "🏁", "When two threads change the same variable, the result can depend on timing. That is a <b>race condition</b>."),
      S("Lost update", "💥", "x = x + 1 is really: read x, add 1, write x. If two threads both read before either writes, one update is lost."),
      S("Fix it", "🔒", "Protect the shared update with a lock, or make it <b>atomic</b> (one unbreakable step).")]),
    L("Locks and deadlock", mix(lockQ, lockQ, facts(LOCK, "Think about who waits for whom.", "Example: a lock lets one thread in at a time.")), [
      S("Locks", "🔑", "A <b>lock</b> (mutex) lets only one thread at a time into a <b>critical section</b>."),
      S("Deadlock", "🔄", "Thread 1 holds A and waits for B. Thread 2 holds B and waits for A. Both wait forever."),
      S("Avoid it", "✅", "Take locks in the <b>same order</b> everywhere, hold them briefly, and avoid waiting while holding one.")]),
    L("Scheduling: who goes first?", fcfsQ, [
      S("The scheduler", "🕒", "The operating system chooses which job runs next. Different rules give different waiting times."),
      S("FCFS and SJF", "📋", "<b>First come, first served</b> runs jobs in arrival order. <b>Shortest job first</b> runs the shortest first, which lowers the average wait."),
      S("Waiting time", "🧮", "A job's wait is the total run time of the jobs that went before it. Add up all the waits.")]),
    L("Round robin", rrQ, [
      S("Time slices", "🔄", "<b>Round robin</b> gives each job a small <b>time slice</b>. When it is used up, the job goes to the back of the line."),
      S("Fair and responsive", "😊", "Everyone gets turns often, so the computer feels responsive."),
      S("Trace it", "📝", "Keep a clock. With slice 2 and jobs of 3 and 1: J1 runs to time 2, J2 runs to 3 and finishes, J1 runs to 4 and finishes.")]),
    L("Pages and addresses", mix(pageQ, pageQ, facts(PG, "Think about how memory is divided into pages.", "Example: a page table translates virtual to physical addresses.")), [
      S("Virtual memory", "📄", "Each process sees its own addresses. The operating system splits memory into equal <b>pages</b> and maps them to real <b>frames</b>."),
      S("Page and offset", "🧭", "page = address div page size. offset = address mod page size."),
      S("Translate", "🔁", "Physical address = frame x page size + offset. The page table gives the frame.")]),
    L("Page replacement: FIFO", fifoQ, [
      S("Memory is full", "🧩", "When a needed page is not in memory (a <b>page fault</b>) and memory is full, one page must be removed."),
      S("FIFO", "🚪", "<b>FIFO</b> removes the page that has been in memory the longest, even if it is still used."),
      S("Count faults", "📝", "Write the memory after each request. Mark each fault. Hits do nothing to the order.")]),
    L("Page replacement: LRU", lruQ, [
      S("Least recently used", "🕰️", "<b>LRU</b> removes the page that was used longest ago. A hit makes a page 'fresh' again."),
      S("Why it works", "💡", "Programs tend to reuse recent pages again soon, so keeping them avoids faults."),
      S("Trace it", "📝", "Keep pages in order from oldest use (left) to newest use (right). A hit moves the page to the right end.")]),
    L("Inside the operating system", facts(KF, "Think about the job of the operating system.", "Example: the kernel controls the hardware for all programs."), [
      S("The kernel", "🧠", "The <b>kernel</b> is the core of the operating system. It controls memory, the CPU, and devices."),
      S("System calls", "📞", "A program in user mode cannot touch the hardware. It asks the kernel with a <b>system call</b>, like reading a file."),
      S("Files and drivers", "📁", "A <b>file system</b> turns a drive into files and folders. <b>Drivers</b> let the system talk to hardware.")]),
    L("How a compiler works", facts(PIPE, "Think about the stages of a compiler.", "Example: the lexer reads characters and makes tokens."), [
      S("Stages", "🏭", "<b>Lexer</b> (tokens) to <b>parser</b> (tree) to <b>optimizer</b> to <b>code generator</b> (machine code or bytecode)."),
      S("Errors", "🚨", "A <b>syntax error</b> breaks the grammar. A <b>logic error</b> runs but gives the wrong answer."),
      S("Linking", "🔗", "A <b>linker</b> joins compiled pieces and libraries into one program.")]),
    L("Tokens", tokQ, [
      S("Cutting code into pieces", "✂️", "The lexer reads the characters and makes <b>tokens</b>: names, numbers, symbols and keywords."),
      S("Spaces", "␣", "Spaces only separate tokens; they are not tokens themselves in most languages."),
      S("Example", "📝", "x = 12 + y has 5 tokens: x, =, 12, +, y.")]),
    L("Parsing and precedence", precQ, [
      S("A parse tree", "🌲", "The parser builds a tree that shows which operation happens first."),
      S("Precedence", "🔝", "Multiplication binds tighter than + and -. Parentheses beat everything."),
      S("Evaluate", "📝", "2 + 3 * 4: the tree does 3 * 4 first. So the answer is 2 + 12 = 14, not 20.")]),
    L("Compilers, interpreters and bytecode", facts(INTP, "Think about when the translation happens.", "Example: a compiler translates before the program runs."), [
      S("Compiler", "🏗️", "A <b>compiler</b> translates the whole program to machine code before it runs. Fast to run."),
      S("Interpreter", "🗣️", "An <b>interpreter</b> reads and runs the code as it goes. Quick to try."),
      S("In between", "🧱", "Java and Python compile to <b>bytecode</b>, run by a virtual machine. A <b>JIT</b> compiles the busy parts as the program runs.")]),
    L("Closures", closQ, [
      S("Remembering", "🎒", "A function can keep variables from the place where it was made. This is a <b>closure</b>."),
      S("Private memory", "🔐", "make_counter returns tick, and tick remembers its own count. Each counter has its own count."),
      S("Trace it", "📝", "make_counter(0, 2): the calls return 2, then 4, then 6.")]),
    L("Bits, hex and negatives", binQ2, [
      S("Binary and hex", "🔢", "Binary place values are 1, 2, 4, 8, ... Hex digits are worth 16 each: 0 to 9, then A=10 to F=15."),
      S("How many bits?", "📏", "n bits give 2ⁿ different patterns. 8 bits give 256."),
      S("Negatives", "➖", "In 8-bit <b>two's complement</b>, -k is stored as the bit pattern 256 - k. So -1 is 11111111.")]),
    L("A tiny CPU", regQ, [
      S("Registers", "🧮", "A CPU keeps numbers in tiny storage places called <b>registers</b> (R1, R2, ...)."),
      S("Instructions", "📜", "LOAD puts a number in a register. ADD and MUL change it. JNZ jumps back if a register is not zero."),
      S("Loops in machine code", "🔁", "A loop is just a jump back. R2 counts down; when it reaches 0 the loop ends.")]),
    L("Stack, heap and garbage", facts(GC, "Think about where data lives in memory.", "Example: local variables live on the stack."), [
      S("Stack and heap", "🥞", "The <b>stack</b> holds local variables and function calls; it is tidy and fast. The <b>heap</b> holds objects that live longer."),
      S("Garbage collection", "🧹", "A <b>garbage collector</b> frees heap memory nothing can reach. In C you free memory yourself."),
      S("Problems", "⚠️", "A <b>memory leak</b> keeps memory that is no longer used. A <b>stack overflow</b> comes from recursion that is too deep.")]),
    L("Many cores: how much faster?", mix(amdQ, amdQ, facts(AMF, "Think about what limits the speedup.", "Example: if only part of a job can be split, that part limits the gain.")), [
      S("Share the work", "🧮", "More cores can run the splittable part of a job at the same time."),
      S("Amdahl's law", "⚖️", "Time with n cores = sequential part + parallel part / n. The sequential part never shrinks."),
      S("Example", "📝", "100 seconds, 80 parallel, 4 cores: 20 + 80 / 4 = 40 seconds. Speedup 2.5x, not 4x.")]),
    L("Mixed practice", mix(...A23, ...F23.slice(0, 5)), MIXS("races, locks, scheduling, paging, the kernel, compilers, tokens, precedence, closures, bits and parallel speedup.")),
    L("Level 23 Challenge", mix(...A23, ...F23), MIXS("everything from level 23: concurrency, operating systems, compilers, interpreters and memory."))
  ];

  // ======================= LEVEL 24 =======================
  const PURE = [
    ["A pure function:", "Always returns the same output for the same input and changes nothing else", ["Uses random numbers", "Prints to the screen", "Changes global variables"], "Think of a math function."],
    ["Which is a side effect?", "Changing a global variable", ["Returning a number", "Adding two parameters", "Using a local variable"], "It affects something outside the function."],
    ["Immutable data:", "Cannot be changed after it is made; you create a new copy instead", ["Changes constantly", "Is only for numbers", "Is stored on the network"], "Think about a printed page versus a whiteboard."],
    ["Why are pure functions easy to test?", "The result depends only on the inputs", ["They never run", "They have no inputs", "They are always short"], "No hidden state to set up."],
    ["A first-class function can be:", "Stored in a variable and passed as an argument", ["Used only once", "Used only in math", "Written without a name only"], "Functions are treated like any other value."],
    ["A higher-order function:", "Takes a function or returns a function", ["Is always very long", "Runs in the cloud", "Has no parameters"], "Think about functions that work with functions."],
    ["A lambda is:", "A small function without a name", ["A kind of loop", "A virus", "A data table"], "Often written inline."],
    ["Pure functions are easier to run in parallel because:", "They do not share or change any state", ["They use fewer variables", "They are shorter", "They are older"], "Think about the race conditions you saw earlier."]
  ];
  const pureQ = () => {
    const P = [
      ["def f(x): return x * 2", true], ["def f(x): return x + 10", true], ["def f(x): return x * x - 1", true],
      ["def f(x): total = total + x; return total", false], ["def f(x): return x + random()", false], ["def f(x): print(x); return x", false],
      ["def f(x): list.append(x); return 0", false], ["def f(a, b): return max(a, b)", true]
    ];
    const [src, ok] = pick(P);
    return yn("Is this function pure (same result for the same inputs and no side effects)?", ok, [
      "Look for anything that touches the outside world or changes between calls.", "Printing, randomness and changing outside data all count as impurity.",
      "Example: def g(x): return x + 1 is pure. def h(x): print(x) is not, because it prints. Now do yours."], code([src]));
  };
  const mapQ = () => {
    for (let t = 0; t < 40; t++) {
      const a = Array.from({ length: ri(4, 6) }, () => ri(1, 12)), k = ri(2, 4), th = ri(5, 15), f = ri(0, 2);
      if (f === 0) { const r = a.filter(x => x > th); if (!r.length) continue; return num(`What is the result?`, r.reduce((x, y) => x + y, 0), [
        "filter keeps only the items for which the test is true.", "First filter the list, then reduce by adding the remaining items.",
        "Example: filter keeps items bigger than 3 from [2, 5, 7]: [5, 7]. Adding gives 12. Now do yours."], code([`list = ${lst(a)}`, `kept = filter(list, x =&gt; x &gt; ${th})`, "print reduce(kept, add)"])); }
      if (f === 1) return num("What is the result?", a.map(x => x * k).reduce((x, y) => x + y, 0), [
        "map applies the function to every item.", "First multiply every item, then add them all.",
        "Example: map times 2 over [1, 3] gives [2, 6]. Adding gives 8. Now do yours."], code([`list = ${lst(a)}`, `doubled = map(list, x =&gt; x * ${k})`, "print reduce(doubled, add)"]));
      return num("What is the result?", a.filter(x => x % 2 === 0).length, [
        "filter keeps only the items for which the test is true.", "x mod 2 = 0 means the number is even. Count the items kept.",
        "Example: of [1, 2, 4, 7], the even ones are [2, 4], so the length is 2. Now do yours."], code([`list = ${lst(a)}`, "evens = filter(list, x =&gt; x mod 2 = 0)", "print length(evens)"]));
    }
    return num("What is reduce([1, 2, 3], add)?", 6, ["reduce combines all items into one.", "Add them up.", "Example: reduce([2, 2], add) = 4."]);
  };
  const compQ = () => {
    const a = ri(2, 5), b = ri(0, 6), c = ri(2, 5), d = ri(0, 6), x = ri(1, 6), fg = Math.random() < 0.5;
    const f = `f(x) = ${a}x + ${b}`, g = `g(x) = ${c}x + ${d}`;
    const gx = c * x + d, fx = a * x + b;
    return num(`${f} and ${g}. What is ${fg ? "f(g(" + x + "))" : "g(f(" + x + "))"}?`, fg ? a * gx + b : c * fx + d, [
      "Compose means: the inner function runs first, and its result goes into the outer one.", fg ? "Work out the inner part g first, then put that number into f." : "Work out the inner part f first, then put that number into g.",
      "Example: f(x) = 2x + 1 and g(x) = x + 3. f(g(2)): g(2) = 5, then f(5) = 11. Now do yours."], "🧩");
  };
  const twiceQ = () => {
    const a = ri(2, 4), b = ri(0, 5), x = ri(1, 5), k = ri(1, 6), y = ri(1, 9);
    if (Math.random() < 0.5) return num(`twice(f) means "apply f two times". With f(x) = ${a}x + ${b}, what is twice(f)(${x})?`, a * (a * x + b) + b, [
      "Apply f once, then apply f again to the result.", "The output of the first application becomes the input of the second.",
      "Example: f(x) = x + 3, twice(f)(4): f(4) = 7, f(7) = 10. Now do yours."], "🔁");
    return num(`def make_adder(n): return a function that adds n to its input. If add${k} = make_adder(${k}), what is add${k}(${y})?`, y + k, [
      "make_adder returns a new function that remembers n.", "The returned function adds the remembered n to whatever you give it.",
      "Example: add2 = make_adder(2) makes a function; add2(7) = 9. Now do yours."], "🏭");
  };
  const MLB = [
    ["Predicting a house price (a number) is called:", "Regression", ["Classification", "Clustering", "Encryption"], "The answer is a number on a scale."],
    ["Deciding whether an email is spam or not spam is:", "Classification", ["Regression", "Compression", "Debugging"], "The answer is a category."],
    ["In supervised learning the training data has:", "Labels (the correct answers)", ["No data", "Only random noise", "Only images"], "The program learns from examples with answers."],
    ["Grouping customers by similarity without any labels is:", "Unsupervised learning", ["Supervised learning", "Compiling", "Hashing"], "No one gave the right groups."],
    ["A loss function measures:", "How wrong the model's predictions are", ["How fast the CPU is", "How many features there are", "The size of the file"], "Training tries to make it small."],
    ["One epoch is:", "One full pass through the training data", ["One wrong answer", "One hour of training", "One feature"], "Think of reading the whole book once."],
    ["A learning rate that is too large can:", "Make training jump past the best answer", ["Make training perfect", "Delete the data", "Make the model smaller"], "Think about steps that are too big."],
    ["Data leakage is when:", "Information from the test set slips into training", ["The network goes down", "The model forgets", "Disk space runs out"], "The model is allowed to peek at answers."],
    ["A deep neural network has:", "Many layers of neurons", ["One feature", "No weights", "Only labels"], "The word deep describes the depth."]
  ];
  const mseQ = () => {
    for (let t = 0; t < 200; t++) {
      const n = pick([2, 4]), e = Array.from({ length: n }, () => ri(0, 6)), sq = e.reduce((s, x) => s + x * x, 0);
      if (sq % n === 0) {
        const act = e.map(() => ri(10, 30)), pred = act.map((a, i) => a + (Math.random() < 0.5 ? -e[i] : e[i]));
        return num(`A model predicts ${lst(pred)} but the true values are ${lst(act)}. What is the mean squared error (square each error, then take the average)?`, sq / n, [
          "The error for each item is the gap between prediction and truth.", "Square each gap, add them up, and divide by the number of items.",
          "Example: errors 1 and 3: squares 1 and 9, sum 10, mean 5. Now do yours."], "🎯");
      }
    }
    return num("Errors are 2 and 2. What is the mean squared error?", 4, ["Square each error.", "Then average.", "Example: errors 1 and 3 give (1 + 9) / 2 = 5."]);
  };
  const gdQ = () => {
    const lr = pick([0.5, 0.25]), g = lr === 0.5 ? 2 * ri(1, 6) : 4 * ri(1, 4), w = lr * g + ri(0, 6);
    return num(`Gradient descent update: new w = w - learning rate x gradient. The weight is ${w}, the learning rate is ${lr}, and the gradient is ${g}. What is the new weight?`, w - lr * g, [
      "The gradient says which way the loss goes up; you step the other way.", "Multiply the learning rate by the gradient, then subtract from w.",
      "Example: w = 10, rate 0.5, gradient 6: 10 - 0.5 x 6 = 7. Now do yours."], "⛰️");
  };
  const metricQ = () => {
    const f = ri(0, 2), dens = [4, 5, 10, 20, 25, 50];
    if (f === 0) { const tp = ri(20, 50), fn = ri(1, 15), fp = ri(1, 15), tn = 100 - tp - fn - fp; return num(`A spam filter checks 100 emails. Spam caught: ${tp}. Spam missed: ${fn}. Good emails wrongly flagged: ${fp}. Good emails passed: ${tn}. What is the accuracy as a percent?`, tp + tn, [
      "Accuracy is the share of all answers that were right.", "Right answers are the caught spam plus the correctly passed good emails.",
      "Example: out of 100 emails, 30 spam caught and 60 good passed gives 90 percent. Now do yours."], "📧"); }
    const den = pick(dens), tp = ri(1, den);
    if (f === 1) return num(`A filter flagged ${den} emails as spam. ${tp} of them really were spam. What is the precision as a percent (correct flags out of all flags)?`, tp * 100 / den, [
      "Precision asks: of everything flagged, how much was right?", "Divide the correct flags by all the flags and multiply by 100.",
      "Example: 5 flags, 4 correct: 4 / 5 = 80 percent. Now do yours."], "📧");
    return num(`There were ${den} spam emails in total. The filter caught ${tp} of them. What is the recall as a percent (caught out of all that were really spam)?`, tp * 100 / den, [
      "Recall asks: of all the real spam, how much was found?", "Divide the caught spam by the total spam and multiply by 100.",
      "Example: 10 spam, 7 caught: 7 / 10 = 70 percent. Now do yours."], "📧");
  };
  const knnQ = () => {
    for (let t = 0; t < 100; t++) {
      const xs = uniq(5, 1, 20), ls = xs.map(() => pick(["Red", "Blue"])), q = ri(1, 20);
      if (xs.includes(q)) continue;
      const o = xs.map((x, i) => ({ d: Math.abs(x - q), l: ls[i] })).sort((a, b) => a.d - b.d);
      if (o[2].d === o[3].d) continue;
      const votes = o.slice(0, 3).filter(z => z.l === "Red").length, r = votes >= 2 ? "Red" : "Blue";
      return mc(`Points on a number line: ${xs.map((x, i) => x + " (" + ls[i] + ")").join(", ")}. Using the 3 nearest neighbors (k = 3), what label does a new point at ${q} get?`, r, [r === "Red" ? "Blue" : "Red"], [
        "k-nearest neighbors looks at the closest known points.", "Find the distance from the new point to each known point, take the three smallest, and let them vote.",
        "Example: new point 5 with 3 (Red), 6 (Blue), 7 (Blue), 20 (Red): nearest three are 6, 7, 3, with votes Blue, Blue, Red. Blue wins. Now do yours."], "📍");
    }
    return mc("Three nearest neighbors are Red, Red, Blue. What label wins?", "Red", ["Blue"], ["Let the three vote.", "Count each label.", "Example: Blue, Blue, Red gives Blue."]);
  };
  const neuronQ = () => {
    const w1 = ri(1, 4), w2 = ri(-3, 3), x1 = ri(1, 5), x2 = ri(1, 5), b = ri(-8, 4), s = w1 * x1 + w2 * x2 + b, step = Math.random() < 0.3;
    return num(`A neuron computes sum = ${w1} x ${x1} + ${w2 < 0 ? "(" + w2 + ")" : w2} x ${x2} + ${b < 0 ? "(" + b + ")" : b}, then applies the ${step ? "step function (1 if the sum is above 0, otherwise 0)" : "ReLU function (the sum if it is above 0, otherwise 0)"}. What is the output?`, step ? (s > 0 ? 1 : 0) : Math.max(0, s), [
      "First compute the weighted sum plus the bias.", step ? "If the sum is not above 0, the neuron outputs 0. Otherwise 1." : "If the sum is negative, ReLU outputs 0. Otherwise it passes the sum through.",
      "Example: weights 2 and 1, inputs 3 and 1, bias -9: sum = 6 + 1 - 9 = -2. ReLU gives 0, step gives 0. Now do yours."], "🧠");
  };
  const BIAS = [
    ["A face tool works well for some groups but badly for others. The likely cause is:", "Training data that did not include enough variety", ["The computer is too old", "Faces are random", "The screen is too small"], "Think about what the model learned from."],
    ["What is algorithmic bias?", "Systematic unfair results caused by data or design", ["A bug that crashes the app", "A slow loop", "A compiler warning"], "It is about fairness."],
    ["A hiring tool learned from past decisions that were unfair. It will probably:", "Repeat the unfairness", ["Fix it by itself", "Pick people at random", "Stop working"], "Models copy patterns in their data."],
    ["Which helps reduce bias in a model?", "Test it on many different groups of people", ["Use only one small group", "Hide how it works", "Never check results"], "Look at who the model works for."],
    ["Why should big decisions (like loans) keep a human in the loop?", "People can notice and fix unfair or wrong results", ["Computers cannot add numbers", "It is faster", "Humans never make mistakes"], "Think about review and fairness."],
    ["Explainable AI means:", "People can understand why the system made a decision", ["The AI is written in English", "The AI has a face", "The AI is free"], "Think about reasons you can check."],
    ["Who is responsible for harm from a badly tested app?", "The people who build and release it", ["Nobody, because it is software", "Only the users", "The weather"], "Software is made by people."],
    ["A good habit when using a model's answer is to:", "Check important facts yourself", ["Always trust it", "Never read it", "Share it without looking"], "Models can be wrong."]
  ];
  const PRIV = [
    ["Data minimization means:", "Collecting only the data you really need", ["Collecting everything possible", "Deleting all software", "Making data smaller with a zip tool"], "Less data means less risk."],
    ["Informed consent means people:", "Know what data is collected and agree to it", ["Are never asked", "Are tricked by long text", "Cannot say no"], "They must understand and choose."],
    ["Why store passwords as hashes?", "A leak does not reveal the real passwords directly", ["Hashes are shorter to read", "Hashes cannot be checked", "It makes logins slower on purpose only"], "Think about what an attacker sees."],
    ["Personal data includes:", "Anything that can identify a person", ["Only a person's name", "Only photos", "Only passwords"], "It is a wide group: addresses, IDs, and more."],
    ["Encryption helps privacy by:", "Making data unreadable without the key", ["Deleting the data", "Hiding the app", "Making it public"], "Only the right key opens it."],
    ["A privacy policy should:", "Say clearly what is collected and how it is used", ["Be as long and unclear as possible", "Be hidden", "Change without notice"], "Honesty and clarity."],
    ["Anonymized data is safest when:", "It is very hard to link back to a person", ["It keeps names", "It keeps full addresses", "It includes birthdays"], "Think about removing identifying clues."],
    ["If a company has a data breach, the right thing to do is:", "Tell the affected people quickly and honestly", ["Hide it", "Delete the logs", "Blame the users"], "Trust and safety come first."]
  ];
  const SOC = [
    ["Open-source software is:", "Software whose source code anyone may read, under a license", ["Software with no author", "Software that cannot be changed", "Software that is always unsafe"], "The code is shared with rules."],
    ["The digital divide is:", "The gap between people who have good technology access and those who do not", ["A computer bug", "A type of screen", "A network cable"], "Think about who can get online."],
    ["Accessible software lets people with different abilities:", "Use it, for example with screen readers or large text", ["Pay less", "Skip updates", "Share passwords"], "Design for everyone."],
    ["Data centers and big training runs use a lot of:", "Energy", ["Paper", "Glass", "Chalk"], "Computers need electricity."],
    ["Responsible disclosure means:", "Telling the maker about a security hole privately so it can be fixed before it is public", ["Posting the hole everywhere at once", "Selling the hole", "Ignoring it"], "Give the owner time to fix it."],
    ["Misinformation spreads fast online. A good habit is to:", "Check a trusted source before sharing", ["Share first and read later", "Believe anything with a picture", "Share only to be popular"], "Pause and verify."],
    ["When AI makes text or images, it is fair to:", "Say that AI helped make them", ["Claim you made every part by hand", "Hide it always", "Delete the work"], "Be honest about where work comes from."],
    ["Automation may change which jobs exist. A good response from society is:", "Help people learn new skills", ["Ignore the change", "Ban all machines", "Stop schools"], "Think about support and training."],
    ["The ACM code of ethics says computing professionals should:", "Avoid harm and be honest", ["Always work as fast as possible", "Keep all bugs secret", "Copy others' work"], "Safety and honesty come first."]
  ];
  const lbQ = () => {
    const n = ri(3, 5), f = ri(0, 2);
    if (f === 0) { const k = ri(4, 30); return num(`A load balancer sends requests to ${n} servers in turn (round robin): request 1 goes to server 1, request 2 to server 2, and so on, starting again at server 1 after server ${n}. Which server gets request ${k}?`, ((k - 1) % n) + 1, [
      "The servers take turns in a cycle.", "Subtract one from the request number, take the remainder after dividing by the number of servers, then add one back.",
      "Example: with 3 servers, request 7: (7 - 1) mod 3 = 0, plus 1 = server 1. Now do yours."], "⚖️"); }
    if (f === 1) { const id = ri(10, 99); return num(`A load balancer keeps each user on the same server: server number = user id mod ${n}, counting servers from 0. Which server does user ${id} use?`, id % n, [
      "This is hashing the user id to pick a server.", "Take the remainder when dividing the id by the number of servers.",
      "Example: user 23 with 5 servers: remainder 3, so server 3. Now do yours."], "⚖️"); }
    const k = ri(n + 1, 40); return num(`${n} servers share requests in turn (round robin). Out of the first ${k} requests, how many does server 1 get?`, Math.ceil(k / n), [
      "Server 1 gets request 1, then every n-th request after that.", "Divide the requests by the number of servers and round up.",
      "Example: 10 requests and 3 servers: server 1 gets requests 1, 4, 7, 10: that is 4. Now do yours."], "⚖️");
  };
  const cacheQ = () => {
    const h = 10 * ri(5, 9), c = pick([10, 20]), d = pick([100, 200, 300]);
    if (Math.random() < 0.5) return num(`A cache answers in ${c} ms on a hit. A miss goes to the database and takes ${d} ms. The hit rate is ${h} percent. What is the average time in ms?`, (h * c + (100 - h) * d) / 100, [
      "Average time mixes the fast hits and the slow misses.", "Hits happen the hit-rate share of the time and misses the rest. Multiply each time by its share and add.",
      "Example: 80 percent at 10 ms and 20 percent at 100 ms: 8 + 20 = 28 ms. Now do yours."], "⚡");
    const r = pick([100, 200, 500, 1000]);
    return num(`A cache has a hit rate of ${h} percent. Out of ${r} requests, how many go through to the database (misses)?`, r * (100 - h) / 100, [
      "A miss happens when the cache does not have the answer.", "The miss share is 100 percent minus the hit rate.",
      "Example: 1000 requests with 90 percent hits means 100 misses. Now do yours."], "⚡");
  };
  const shardQ = () => {
    const f = ri(0, 2);
    if (f === 0) { const sh = ri(3, 6), id = ri(20, 200); return num(`A database is split into ${sh} shards numbered from 0. A user row goes to shard (user id mod ${sh}). Which shard stores user ${id}?`, id % sh, [
      "Sharding spreads rows over several databases.", "Take the remainder when dividing the id by the number of shards.",
      "Example: user 17 with 5 shards: remainder 2, so shard 2. Now do yours."], "🗄️"); }
    if (f === 1) { const sh = ri(3, 5), ids = uniq(8, 10, 60), s = ri(0, sh - 1); return num(`Rows go to shard (id mod ${sh}). The ids are ${ids.join(", ")}. How many of them land on shard ${s}?`, ids.filter(i => i % sh === s).length, [
      "Work out the shard for each id.", "Count only the ids whose remainder matches the shard you want.",
      "Example: ids 3, 8, 13, 4 with 5 shards: remainders 3, 3, 3, 4. Shard 3 gets 3 rows. Now do yours."], "🗄️"); }
    const tb = ri(2, 9), rep = ri(2, 4); return num(`Your data takes ${tb} TB. For safety every piece is stored on ${rep} servers (replication factor ${rep}). How many TB of disk are needed in total?`, tb * rep, [
      "Every copy takes the same space as the data.", "Multiply the data size by the number of copies.",
      "Example: 3 TB with 2 copies needs 6 TB. Now do yours."], "💾");
  };
  const capQ = () => {
    if (Math.random() < 0.5) { const r = pick([50, 100, 200, 250]), n = ri(2, 9), load = r * (n - 1) + ri(1, r); return num(`Each server can handle ${r} requests per second. The expected load is ${load} requests per second. How many servers do you need at least?`, n, [
      "Divide the load by what one server can do.", "You cannot buy part of a server, so round up.",
      "Example: 450 requests per second with servers of 100 each: 4.5 so you need 5. Now do yours."], "🖥️"); }
    const u = pick([99, 99.9, 99.5, 90]);
    return num(`A service is available ${u} percent of the time. In 10000 minutes, how many minutes is it down?`, Math.round(10000 * (100 - u) / 100), [
      "Downtime is the share of time the service is not available.", "Take 100 percent minus the uptime, as a share of 10000.",
      "Example: 98 percent uptime in 1000 minutes: 2 percent of 1000 is 20 minutes down. Now do yours."], "🕰️");
  };
  const SD = [
    ["A load balancer:", "Spreads requests across several servers", ["Stores passwords", "Compiles code", "Draws pictures"], "Think of a traffic officer at a busy crossing."],
    ["A single point of failure is:", "One part that, if it breaks, stops the whole system", ["The first line of code", "A very fast server", "A backup copy"], "Think of one weak link."],
    ["A CDN (content delivery network) helps by:", "Serving files from servers close to the user", ["Making files larger", "Locking files", "Compiling pages"], "Distance means delay."],
    ["A message queue lets services:", "Hand work to each other without waiting for each other", ["Delete messages forever", "Share the same screen", "Use one thread only"], "Think about leaving a note instead of waiting."],
    ["A stateless server:", "Does not remember earlier requests; each request has what it needs", ["Never answers", "Remembers everything", "Has no code"], "No memory between requests."],
    ["Replication means:", "Keeping copies of data on several machines", ["Making data smaller", "Hiding data", "Sorting data"], "Copies protect against failure."],
    ["Sharding means:", "Splitting data across several databases", ["Copying everything everywhere", "Encrypting everything", "Deleting old rows"], "Each piece holds part of the data."],
    ["Horizontal scaling means:", "Adding more machines", ["Making one machine bigger", "Turning the screen", "Using fewer users"], "Think of going wide."],
    ["Rate limiting is used to:", "Stop one user from sending too many requests", ["Make the internet faster", "Hide the server", "Compress images"], "It protects the service for everyone."]
  ];
  const API = [
    ["In a REST API, which method usually reads data without changing it?", "GET", ["POST", "DELETE", "PUT"], "Reading, not writing."],
    ["Which method usually creates a new item?", "POST", ["GET", "HEAD", "OPTIONS"], "Think about sending something new."],
    ["A good API error response includes:", "A clear status code and message", ["Nothing at all", "A password", "A random picture"], "The caller needs to know what went wrong."],
    ["Status code 404 means:", "Not found", ["Success", "Server crashed", "Forbidden"], "The thing asked for was not there."],
    ["Status code 500 means:", "A server error", ["Not found", "Success", "Moved"], "The mistake is on the server side."],
    ["Why version an API, like /v2/users?", "So old clients keep working when you make changes", ["To make the URL longer", "To hide it", "Because browsers require it"], "Think about people who use the old format."],
    ["JSON is:", "A text format for sending data", ["A programming language", "A database", "A kind of image"], "Curly braces and key: value pairs."],
    ["An API key should be kept:", "Secret, on the server", ["On the public web page", "In the URL for everyone", "In a poster"], "Anyone who sees it could use it."]
  ];

  const A24 = [mapQ, compQ, twiceQ, mseQ, gdQ, metricQ, knnQ, neuronQ, lbQ, cacheQ, shardQ, capQ];
  const F24 = [facts(PURE, "Think about what the function touches.", "Example: a pure function behaves like a math function."), facts(MLB, "Think about what the model learns from.", "Example: regression predicts numbers and classification predicts categories."), facts(BIAS, "Think about the data and who is affected.", "Example: a model copies the patterns in its training data."), facts(PRIV, "Think about protecting people.", "Example: collect only what you need."), facts(SOC, "Think about how computing affects people.", "Example: honesty and safety come first."), facts(SD, "Think about how big systems stay up.", "Example: copies of data protect against failure."), facts(API, "Think about how programs talk over the web.", "Example: GET reads and POST creates.")];
  const lessons24 = [
    L("Pure functions", mix(pureQ, pureQ, facts(PURE, "Think about what the function touches.", "Example: a pure function behaves like a math function.")), [
      S("Same in, same out", "🧮", "A <b>pure function</b> always gives the same output for the same input, and changes nothing outside itself."),
      S("Side effects", "⚠️", "Printing, changing globals, reading the clock or random numbers are <b>side effects</b>."),
      S("Why care?", "✅", "Pure functions are easy to test, easy to reuse, and safe to run in parallel.")]),
    L("map, filter, reduce", mapQ, [
      S("Three tools", "🛠️", "<b>map</b> changes every item. <b>filter</b> keeps the items that pass a test. <b>reduce</b> combines all items into one value."),
      S("No loops needed", "🔁", "Instead of writing loops by hand, you pass a small function to these tools."),
      S("Example", "📝", "[1, 2, 3, 4]: map times 2 gives [2, 4, 6, 8]; filter bigger than 4 gives [6, 8]; reduce add gives 14.")]),
    L("Composing functions", compQ, [
      S("Functions in a chain", "🧩", "<b>Composition</b> feeds the result of one function into another: f(g(x))."),
      S("Inside first", "➡️", "In f(g(x)), g runs first. Its answer is the input of f."),
      S("Order matters", "🔀", "f(g(x)) is usually not the same as g(f(x)). Always work from the inside out.")]),
    L("Functions that make functions", twiceQ, [
      S("Functions as values", "🎁", "In functional style, functions can be passed in and returned back."),
      S("Make adder", "🏭", "make_adder(5) returns a new function that adds 5. This is partial application: you fix one input early."),
      S("Twice", "🔁", "twice(f) returns a function that runs f two times in a row: twice(f)(x) = f(f(x)).")]),
    L("What is machine learning?", facts(MLB, "Think about what the model learns from.", "Example: regression predicts numbers and classification predicts categories."), [
      S("Learning from examples", "🤖", "Instead of writing rules by hand, we show a model many examples and it finds the patterns."),
      S("Kinds", "📚", "<b>Supervised</b>: examples have correct labels. <b>Unsupervised</b>: find groups with no labels. <b>Regression</b> predicts a number; <b>classification</b> predicts a category."),
      S("Training words", "🏋️", "A <b>loss</b> measures how wrong the model is. An <b>epoch</b> is one pass over the data. Never let test data leak into training.")]),
    L("Measuring error", mseQ, [
      S("Loss", "🎯", "A model needs a number that says how wrong it is. This is the <b>loss</b>."),
      S("Mean squared error", "📏", "For each item: error = prediction - truth. Square it, then average. Squaring makes all errors positive and punishes big ones more."),
      S("Example", "📝", "Errors 1, 3: squares 1 and 9, mean = 5. Smaller is better.")]),
    L("Gradient descent", gdQ, [
      S("Walking downhill", "⛰️", "To train a model, we change the weights a little to make the loss smaller, step by step."),
      S("The update", "📉", "new w = w - learning rate x gradient. The gradient shows which way is uphill, so we go the other way."),
      S("Step size", "👣", "A tiny learning rate is slow. A huge one jumps past the best spot.")]),
    L("Accuracy, precision and recall", metricQ, [
      S("Accuracy", "🎯", "<b>Accuracy</b> = right answers out of all answers."),
      S("Precision", "🔍", "<b>Precision</b> = of the items the model flagged, how many were truly positive."),
      S("Recall", "📡", "<b>Recall</b> = of all the truly positive items, how many the model found. Accuracy can fool you when one class is rare.")]),
    L("Nearest neighbors", knnQ, [
      S("Ask the neighbors", "📍", "<b>k-nearest neighbors</b> labels a new point by looking at the k known points that are closest."),
      S("Vote", "🗳️", "The labels of those k points vote. The most common label wins."),
      S("Choose k", "🔢", "A small k can be fooled by noise. A very big k blurs the groups. An odd k avoids ties between two labels.")]),
    L("A neural network neuron", neuronQ, [
      S("Weighted sum", "🧠", "A neuron multiplies each input by a <b>weight</b>, adds them, and adds a <b>bias</b>."),
      S("Activation", "⚡", "Then an <b>activation</b> function shapes the result. <b>ReLU</b>: the sum if positive, else 0. <b>Step</b>: 1 or 0."),
      S("Layers", "🥞", "A network joins many neurons in layers. Training adjusts all the weights.")]),
    L("Bias and fairness", facts(BIAS, "Think about the data and who is affected.", "Example: a model copies the patterns in its training data."), [
      S("Data teaches", "📊", "A model learns from its data. If the data is unfair or missing groups, the results can be unfair."),
      S("Check and test", "🔬", "Test your system on many different groups. Keep humans in the loop for big decisions."),
      S("Responsibility", "🤝", "The people who build and release a system are responsible for what it does.")]),
    L("Privacy and trust", facts(PRIV, "Think about protecting people.", "Example: collect only what you need."), [
      S("Collect less", "🔐", "Collect only the data you really need. Data you do not hold cannot leak."),
      S("Consent and clarity", "📝", "Tell people clearly what you collect and why, and let them choose."),
      S("Protect it", "🛡️", "Encrypt data, hash passwords, and if there is a breach tell people quickly and honestly.")]),
    L("Computing and society", facts(SOC, "Think about how computing affects people.", "Example: honesty and safety come first."), [
      S("Everyone counts", "🌍", "Good computing works for all people: accessible, affordable and fair."),
      S("Honest work", "✍️", "Credit sources, follow licenses, and say when AI helped make something."),
      S("Cost and care", "♻️", "Computers use energy, and software can spread false information. Professionals try to avoid harm.")]),
    L("Load balancing", lbQ, [
      S("Many servers", "⚖️", "One server cannot serve everyone, so a <b>load balancer</b> spreads requests over several."),
      S("Round robin", "🔄", "<b>Round robin</b> sends request 1 to server 1, request 2 to server 2, and so on in a cycle."),
      S("Sticky users", "📌", "Hashing the user id (id mod servers) sends the same user to the same server each time.")]),
    L("Caching", cacheQ, [
      S("Remember answers", "⚡", "A <b>cache</b> stores answers that were used recently so the slow source is not asked again."),
      S("Hit or miss", "🎯", "A <b>hit</b> is found in the cache (fast). A <b>miss</b> goes to the slow database."),
      S("Average time", "🧮", "Average = hit share x hit time + miss share x miss time. A better hit rate gives a faster average.")]),
    L("Sharding and copies", shardQ, [
      S("Too much data", "🗄️", "When one database is too big, <b>sharding</b> splits the rows across several databases, for example by id mod shards."),
      S("Copies", "💾", "<b>Replication</b> keeps extra copies on other machines. If one breaks, another still has the data."),
      S("Cost", "📦", "Total disk space = data size x number of copies.")]),
    L("Capacity and uptime", capQ, [
      S("How many servers?", "🖥️", "Servers needed = load / what one server handles, rounded up."),
      S("The nines", "9️⃣", "99 percent uptime means about 1 percent downtime. 99.9 percent allows a tenth of that."),
      S("Plan for failure", "🧰", "Real systems have extra servers and no single point of failure.")]),
    L("Designing a system", mix(facts(SD, "Think about how big systems stay up.", "Example: copies of data protect against failure."), facts(SD, "Think about how big systems stay up.", "Example: copies of data protect against failure."), facts(API, "Think about how programs talk over the web.", "Example: GET reads and POST creates.")), [
      S("Building blocks", "🧱", "Big systems combine <b>load balancers</b>, stateless servers, <b>caches</b>, databases with <b>replicas</b>, <b>queues</b> and a <b>CDN</b>."),
      S("APIs", "🔌", "Services talk through APIs. GET reads, POST creates. Status codes tell what happened: 200 ok, 404 not found, 500 server error."),
      S("Think in trade-offs", "⚖️", "Every design is a trade-off between speed, cost, safety and simplicity. Start simple, then scale what is slow.")]),
    L("Mixed practice", mix(...A24, ...F24.slice(0, 4)), MIXS("functional ideas, machine learning, fairness, privacy and system design: load balancers, caches, shards and capacity.")),
    L("Level 24 Challenge", mix(...A24, ...F24), MIXS("everything from level 24: functional programming, machine learning, ethics and system design."))
  ];

  Object.assign(CODING_LEVELS, { 22: lessons22, 23: lessons23, 24: lessons24 });
})();
