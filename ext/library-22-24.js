// ext/library-22-24.js  Mind Lab Library & Research, levels 22-24 (60 lessons): AP Research and senior research skills
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which term fits?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which term fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly, out loud." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and think about what each one means.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const lvl = (n, ls, mixIdx) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.ceil(arr.length / 4);
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[1])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", mixIdx.map(i => ms[i])), mix(`Level ${n} Challenge`, ms)];
  };

  // ---------- custom makers (no people names are built here) ----------
  const respRate = () => {
    const make = () => {
      const r = Math.random();
      if (r < 0.4) {
        let N, p, R;
        do { N = pick([40, 50, 80, 100, 200, 250, 400, 500]); p = pick([20, 25, 30, 40, 50, 60, 70, 75, 80, 90]); R = N * p / 100; } while (!Number.isInteger(R));
        return {
          text: `A researcher emailed a survey to <b>${N}</b> students and <b>${R}</b> sent it back. What is the response rate, in percent?`, visual: "📬", answer: p,
          hints: ["The response rate compares the surveys returned with the surveys sent out.", "Divide the returned surveys by the surveys sent, then turn the decimal into a percent.", "Example: 20 of 50 surveys come back. 20 ÷ 50 = 0.4, which is 40%. Now do yours."]
        };
      }
      if (r < 0.75) {
        let N, p, R;
        do { N = pick([40, 50, 80, 100, 200, 250, 400, 500]); p = pick([20, 25, 30, 40, 50, 60, 70, 75, 80, 90]); R = N * p / 100; } while (!Number.isInteger(R));
        return {
          text: `A survey went to <b>${N}</b> students. The response rate was <b>${p}%</b>. How many surveys came back?`, visual: "📬", answer: R,
          hints: ["The rate is a part of the whole group that was asked.", "Change the percent to a decimal, then multiply it by the number of surveys sent.", "Example: 60 surveys sent with a 25% rate. 0.25 × 60 = 15 returned. Now do yours."]
        };
      }
      const R = pick([10, 20, 30, 40, 50]), p = pick([20, 25, 40, 50]), N = R * 100 / p;
      return {
        text: `You need <b>${R}</b> completed surveys. About <b>${p}%</b> of people usually answer. How many people should you ask?`, visual: "📬", answer: N,
        hints: ["Work backwards: the surveys you need are only part of the people you ask.", "Divide the surveys you need by the response rate written as a decimal.", "Example: you need 12 surveys and 40% answer. 12 ÷ 0.4 = 30 people to ask. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Survey response rate", v: "returned ÷ sent", t: "The <b>response rate</b> is the share of people who answered a survey. A low rate can mean the answers do not represent everyone." },
      { h: "Worked example", v: "20 ÷ 50 = 40%", t: "If 50 surveys go out and 20 come back, the response rate is 20 ÷ 50 = 0.4, or 40%." },
      { h: "Plan ahead", v: "need ÷ rate", t: "To get 12 answers when 40% reply, ask 12 ÷ 0.4 = 30 people. Always ask more people than you need." }
    ];
    return { title: "Survey response rate", make };
  };

  const strat = () => {
    const SETS = [["freshmen", "sophomores", "juniors"], ["north branch", "central branch", "south branch"], ["morning visitors", "afternoon visitors", "evening visitors"]];
    const SH = [[20, 30, 50], [25, 25, 50], [40, 40, 20], [10, 30, 60], [50, 30, 20], [10, 40, 50]];
    const make = () => {
      const labs = pick(SETS), sh = pick(SH), T = pick([200, 400, 500, 800, 1000]), n = pick([20, 40, 60, 80, 100]);
      const sizes = sh.map(s => T * s / 100), i = ri(0, 2);
      return {
        text: `A library survey covers <b>${T}</b> people: ${labs.map((l, k) => `${sizes[k]} ${l}`).join(", ")}. A <b>stratified sample</b> of <b>${n}</b> people keeps the same share from each group as the whole. How many should come from the ${labs[i]}?`, visual: "🧮", answer: n * sh[i] / 100,
        hints: ["In a stratified sample each group gets the same share of the sample that it has in the whole group.", "Divide the group's size by the total, then multiply that share by the size of the sample.", "Example: 200 people, with 80 in group A. A sample of 10 should hold 80 ÷ 200 = 40%, so 0.4 × 10 = 4 from group A. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Stratified samples", v: "🍰", t: "A <b>stratified sample</b> splits the population into groups (strata) and samples from each, so every group is fairly represented." },
      { h: "Keep the shares equal", v: "80 ÷ 200 = 40%", t: "If a group is 40% of the population, it should make up 40% of the sample too." },
      { h: "Tip", v: "💡", t: "Find the share first (group ÷ total), then multiply by the sample size." }
    ];
    return { title: "Stratified samples", make };
  };

  const quart = () => {
    const make = () => {
      let a;
      do { a = [...new Set(Array.from({ length: 12 }, () => ri(2, 60)))].sort((x, y) => x - y).slice(0, 8); } while (a.length < 8 || (a[1] + a[2]) % 2 || (a[5] + a[6]) % 2);
      const q1 = (a[1] + a[2]) / 2, q3 = (a[5] + a[6]) / 2, r = ri(0, 2);
      const data = `<b>${a.join(", ")}</b>`;
      if (r === 0) return {
        text: `Here are 8 sorted quiz scores: ${data}. What is the first quartile (Q1), the median of the lower four numbers?`, visual: "📊", answer: q1,
        hints: ["Split the ordered list into a lower half and an upper half. Q1 belongs to the lower half.", "With four numbers in the lower half, the median is the average of the two middle ones.", "Example: 2, 4, 6, 8, 10, 12, 14, 16. The lower four are 2, 4, 6, 8 and the middle two are 4 and 6, so Q1 = 5. Now do yours."]
      };
      if (r === 1) return {
        text: `Here are 8 sorted quiz scores: ${data}. What is the third quartile (Q3), the median of the upper four numbers?`, visual: "📊", answer: q3,
        hints: ["Split the ordered list into a lower half and an upper half. Q3 belongs to the upper half.", "With four numbers in the upper half, the median is the average of the two middle ones.", "Example: 2, 4, 6, 8, 10, 12, 14, 16. The upper four are 10, 12, 14, 16 and the middle two are 12 and 14, so Q3 = 13. Now do yours."]
      };
      return {
        text: `Here are 8 sorted quiz scores: ${data}. What is the interquartile range (IQR)?`, visual: "📊", answer: q3 - q1,
        hints: ["The IQR measures the spread of the middle half of the data. You need both quartiles first.", "Find Q1 and Q3 as medians of the lower and upper halves, then subtract the smaller from the larger.", "Example: for 2, 4, 6, 8, 10, 12, 14, 16, Q1 = 5 and Q3 = 13, so IQR = 13 − 5 = 8. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Quartiles", v: "Q1 · median · Q3", t: "Quartiles cut ordered data into four parts. <b>Q1</b> is the middle of the lower half and <b>Q3</b> is the middle of the upper half." },
      { h: "Worked example", v: "2 4 6 8 | 10 12 14 16", t: "Lower half 2, 4, 6, 8 gives Q1 = (4 + 6) ÷ 2 = 5. Upper half gives Q3 = (12 + 14) ÷ 2 = 13." },
      { h: "IQR", v: "13 − 5 = 8", t: "The <b>interquartile range</b> is Q3 − Q1. It shows the spread of the middle half and is not shaken by outliers." }
    ];
    return { title: "Quartiles and IQR", make };
  };

  const relFreq = () => {
    const SETS = [["books", "articles", "websites", "interviews"], ["surveys", "diaries", "photos", "recordings"], ["print", "ebooks", "audiobooks", "magazines"]];
    const PC = [[40, 30, 20, 10], [25, 25, 30, 20], [50, 20, 20, 10], [35, 35, 15, 15], [10, 20, 30, 40], [45, 25, 20, 10]];
    const make = () => {
      const labs = pick(SETS), pc = pick(PC), T = pick([20, 40, 50, 100, 200]), cnt = pc.map(p => T * p / 100), i = ri(0, 3);
      if (Math.random() < 0.55) return {
        text: `A student kept a tally of ${T} sources used: ${labs.map((l, k) => `${cnt[k]} ${l}`).join(", ")}. What percent of the sources were <b>${labs[i]}</b>?`, visual: "🧾", answer: pc[i],
        hints: ["A relative frequency compares one count with the total count.", "Divide the count for that kind of source by the total, then turn it into a percent.", "Example: 8 of 20 sources are maps. 8 ÷ 20 = 0.4, which is 40%. Now do yours."]
      };
      return {
        text: `A project used ${T} sources. ${pc[i]}% of them were <b>${labs[i]}</b>. How many sources were ${labs[i]}?`, visual: "🧾", answer: cnt[i],
        hints: ["The percent tells you what part of the whole group this kind of source is.", "Change the percent to a decimal, then multiply it by the total number of sources.", "Example: 50 sources, 30% are maps. 0.3 × 50 = 15 maps. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Counts to percents", v: "count ÷ total", t: "A <b>frequency table</b> counts how often each category appears. A <b>relative frequency</b> turns a count into a share of the total." },
      { h: "Worked example", v: "8 ÷ 20 = 40%", t: "If 8 of 20 sources are maps, the relative frequency of maps is 8 ÷ 20 = 0.4, or 40%." },
      { h: "Check", v: "100%", t: "The relative frequencies of all categories should add up to 100%." }
    ];
    return { title: "Counts to percents", make };
  };

  const chance = () => {
    const make = () => {
      const k = pick([2, 4, 5, 10, 20, 25]), N = pick([100, 200, 500, 1000]), n = N / k;
      if (Math.random() < 0.55) return {
        text: `A school has <b>${N}</b> students. A researcher picks <b>${n}</b> of them completely at random. What is the chance, in percent, that one particular student is picked?`, visual: "🎲", answer: 100 / k,
        hints: ["In a simple random sample every person has the same chance of being chosen.", "Divide the number chosen by the number in the whole group, then turn it into a percent.", "Example: 10 chosen from 50 students. 10 ÷ 50 = 0.2, so each student has a 20% chance. Now do yours."]
      };
      return {
        text: `A school has <b>${N}</b> students and a random sample of <b>${n}</b> is chosen. On average, one student is picked out of every how many?`, visual: "🎲", answer: k,
        hints: ["Think of the sample as one pick out of each equal group of students.", "Divide the whole group by the number chosen to find the size of each group.", "Example: 10 chosen from 50 students means one in every 50 ÷ 10 = 5. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Chance of being chosen", v: "n ÷ N", t: "In a <b>simple random sample</b>, everyone has an equal chance. The chance is the sample size divided by the population size." },
      { h: "Worked example", v: "10 ÷ 50 = 20%", t: "Pick 10 students from 50 at random. Each student has a 10 ÷ 50 = 0.2, or 20%, chance." },
      { h: "Why it matters", v: "⚖️", t: "Equal chances help a sample avoid bias, so its results can speak for the whole group." }
    ];
    return { title: "Chance of being chosen", make };
  };

  const transcribe = () => {
    const make = () => {
      let m, k, r, h;
      do { m = pick([30, 45, 60, 90, 120]); k = ri(2, 6); r = pick([3, 4, 5, 6]); h = k * m * r / 60; } while (!Number.isInteger(h));
      return {
        text: `Each interview lasts <b>${m}</b> minutes and you recorded <b>${k}</b> of them. Typing up one hour of audio takes about <b>${r}</b> hours of work. How many hours will the transcripts take?`, visual: "🎙️", answer: h,
        hints: ["First find how much audio you have in total, then change it to hours.", "Multiply the hours of audio by the hours of work needed for each hour of audio.", "Example: 3 interviews of 40 minutes is 120 minutes, or 2 hours of audio. At 4 hours of work per audio hour, that is 8 hours. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Budget transcription time", v: "🎙️⌨️", t: "Interviews must often be typed out (transcribed) before you can code them. This takes much longer than the recording itself." },
      { h: "Worked example", v: "2 h × 4 = 8 h", t: "Three 40-minute interviews are 120 minutes, which is 2 hours of audio. At 4 hours of work per audio hour, plan 8 hours." },
      { h: "Tip", v: "📅", t: "Add transcription time to your schedule early, or it will surprise you near the deadline." }
    ];
    return { title: "Budget transcription time", make };
  };

  const agree = () => {
    const make = () => {
      let N, p, A;
      do { N = pick([20, 25, 40, 50, 100]); p = pick([60, 70, 75, 80, 85, 90, 95]); A = N * p / 100; } while (!Number.isInteger(A));
      if (Math.random() < 0.6) return {
        text: `Two coders each labeled the same <b>${N}</b> interview excerpts. They chose the same label for <b>${A}</b> of them. What is their percent agreement?`, visual: "🤝", answer: p,
        hints: ["Percent agreement compares the excerpts they labeled the same way with all the excerpts.", "Divide the number of matching labels by the number of excerpts, then turn it into a percent.", "Example: they agree on 18 of 20 excerpts. 18 ÷ 20 = 0.9, which is 90%. Now do yours."]
      };
      return {
        text: `Two coders labeled <b>${N}</b> excerpts and agreed on <b>${A}</b> of them. On how many excerpts did they <b>disagree</b>?`, visual: "🤝", answer: N - A,
        hints: ["Disagreements are the excerpts that are not agreements.", "Take the agreements away from the total number of excerpts.", "Example: 20 excerpts with 18 agreements leaves 20 − 18 = 2 disagreements. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Coder agreement", v: "🤝", t: "When two people label the same data, <b>inter-rater agreement</b> shows how consistent the labels are. High agreement means a clear, reliable coding scheme." },
      { h: "Worked example", v: "18 ÷ 20 = 90%", t: "If two coders match on 18 of 20 excerpts, percent agreement is 18 ÷ 20 = 0.9, or 90%." },
      { h: "If agreement is low", v: "🛠️", t: "Talk about the differences, make the code definitions clearer, and try again." }
    ];
    return { title: "Coder agreement", make };
  };

  const zscore = () => {
    const make = () => {
      const m = pick([50, 60, 70, 75, 80, 100]), s = pick([2, 3, 4, 5, 10]), z = ri(1, 3), r = Math.random();
      if (r < 0.4) return {
        text: `On a research-skills test the mean is <b>${m}</b> and the standard deviation is <b>${s}</b>. A student scores <b>${m + z * s}</b>. What is the z-score?`, visual: "📈", answer: z,
        hints: ["A z-score tells how many standard deviations a score is from the mean.", "Subtract the mean from the score, then divide by the standard deviation.", "Example: mean 40, SD 5, score 50. (50 − 40) ÷ 5 = 2. Now do yours."]
      };
      if (r < 0.75) return {
        text: `The mean is <b>${m}</b> and the standard deviation is <b>${s}</b>. A score is <b>${z}</b> standard deviations above the mean. What is the score?`, visual: "📈", answer: m + z * s,
        hints: ["Going above the mean means adding some number of standard deviations to it.", "Multiply the standard deviation by the z-score, then add the result to the mean.", "Example: mean 40, SD 5, z = 2. 2 × 5 = 10, and 40 + 10 = 50. Now do yours."]
      };
      const a = `${z} standard deviations below the mean`;
      return {
        text: `The mean is <b>${m}</b> and the standard deviation is <b>${s}</b>. Where does a score of <b>${m - z * s}</b> fall?`, visual: "📈", choices: shuf([a, `${z} standard deviations above the mean`, `${z + 1} standard deviations below the mean`]), answer: a,
        hints: ["First decide if the score is higher or lower than the mean.", "Find the gap between the score and the mean, then see how many standard deviations fit into that gap.", "Example: mean 40, SD 5, score 35. It is 5 under the mean, which is 1 standard deviation below. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Z-scores", v: "z = (x − mean) ÷ SD", t: "A <b>z-score</b> tells how far a value is from the mean, counted in standard deviations." },
      { h: "Worked example", v: "(50 − 40) ÷ 5 = 2", t: "With mean 40 and SD 5, a score of 50 is 2 standard deviations above the mean, so z = 2." },
      { h: "Below the mean", v: "z < 0", t: "A score under the mean has a negative z-score. A z-score near 0 is an ordinary, typical value." }
    ];
    return { title: "Z-scores", make };
  };

  const riskRatio = () => {
    const make = () => {
      const n = pick([100, 200, 500, 1000]), pB = pick([2, 4, 5, 10]), k = ri(2, 4), b = n * pB / 100, a = b * k;
      return {
        text: `In a study, <b>${n}</b> students used a citation checklist and <b>${b}</b> of them made citation errors. Another <b>${n}</b> students did not use it and <b>${a}</b> made errors. The group without the checklist was how many times as likely to make errors?`, visual: "📋", answer: k,
        hints: ["Compare the two groups by their rates of errors. The group sizes here are equal.", "Divide the errors in the group without the checklist by the errors in the group with it.", "Example: with a tool, 5 of 100 had a problem. Without it, 15 of 100 did. 15 ÷ 5 = 3 times as likely. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Compare two risks", v: "risk A ÷ risk B", t: "A <b>risk ratio</b> divides the rate of an outcome in one group by the rate in another group." },
      { h: "Worked example", v: "15 ÷ 5 = 3", t: "If 15 of 100 students without a tool had problems and 5 of 100 with it did, the first group was 3 times as likely." },
      { h: "Be careful", v: "⚠️", t: "Check that the groups are the same size, or use rates (percents) first. A ratio shows a link, not always a cause." }
    ];
    return { title: "Compare two risks", make };
  };

  const combineMeans = () => {
    const make = () => {
      let n1, n2, m1, m2, c;
      do { n1 = pick([10, 20, 30, 40]); n2 = pick([10, 20, 30, 40]); m1 = ri(2, 12); m2 = ri(2, 12); c = (n1 * m1 + n2 * m2) / (n1 + n2); } while (n1 === n2 || m1 === m2 || !Number.isInteger(c));
      return {
        text: `Class A has <b>${n1}</b> students who read an average of <b>${m1}</b> hours a week. Class B has <b>${n2}</b> students who read an average of <b>${m2}</b> hours. What is the average for all the students together?`, visual: "⚖️", answer: c,
        hints: ["Do not just average the two averages. The bigger class should count for more.", "Multiply each average by its class size and add them. Then divide by the total number of students.", "Example: 10 students average 4 and 30 students average 8. (10 × 4 + 30 × 8) ÷ 40 = 280 ÷ 40 = 7. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Combine two averages", v: "weighted mean", t: "When groups have different sizes, a bigger group should pull the combined average more. This is a <b>weighted mean</b>." },
      { h: "Worked example", v: "(40 + 240) ÷ 40 = 7", t: "10 students average 4 hours and 30 students average 8 hours. Total hours: 40 + 240 = 280. Divide by 40 students to get 7." },
      { h: "Tip", v: "💡", t: "The combined average always lies between the two group averages, closer to the bigger group's." }
    ];
    return { title: "Combine two averages", make };
  };

  const hIndex = () => {
    const make = () => {
      const len = ri(5, 7), c = Array.from({ length: len }, () => ri(0, 25));
      const s = c.slice().sort((x, y) => y - x);
      let h = 0; s.forEach((x, i) => { if (x >= i + 1) h = i + 1; });
      return {
        text: `A researcher's papers have been cited this many times: <b>${shuf(c).join(", ")}</b>. The <b>h-index</b> is the largest number h such that h papers each have at least h citations. What is it?`, visual: "📚", answer: h,
        hints: ["Put the citation counts in order from biggest to smallest first.", "Walk down the sorted list. Keep going while the paper's citation count is at least its position in the list.", "Example: counts 10, 8, 5, 4, 3. Positions 1 to 4 pass (10, 8, 5, 4 are at least 1, 2, 3, 4) but 3 is less than 5, so h = 4. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "The h-index", v: "h papers with h+ citations", t: "The <b>h-index</b> is one number that mixes how many papers a researcher has with how often they are cited." },
      { h: "Worked example", v: "10, 8, 5, 4, 3 → 4", t: "Sort big to small. Four papers have at least 4 citations each (10, 8, 5, 4), but not five with at least 5. So h = 4." },
      { h: "Limits", v: "⚠️", t: "No single number tells the whole story. It differs between fields and favors long careers." }
    ];
    return { title: "The h-index", make };
  };

  const expected = () => {
    const make = () => {
      let T, R, C;
      do { T = pick([50, 100, 200, 400]); R = pick([10, 20, 30, 40, 50, 60, 80, 100]); C = pick([10, 20, 30, 40, 50, 60, 80, 100]); } while (R >= T || C >= T || (R * C) % T !== 0);
      return {
        text: `A survey of <b>${T}</b> students found that <b>${R}</b> use the library weekly and that <b>${C}</b> are juniors. If library use and grade were unrelated, how many juniors would you <b>expect</b> to use the library weekly?`, visual: "🔲", answer: R * C / T,
        hints: ["If two things are unrelated, the share of juniors among library users matches their share in the whole survey.", "Multiply the row total by the column total, then divide by the grand total.", "Example: 50 students, 20 use the library, 10 are seniors. Expected seniors using it: 20 × 10 ÷ 50 = 4. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Expected counts", v: "row × column ÷ total", t: "A <b>chi-square test</b> compares the counts you saw with the counts you would expect if two things were unrelated." },
      { h: "Worked example", v: "20 × 10 ÷ 50 = 4", t: "Out of 50 students, 20 use the library and 10 are seniors. If unrelated, expect 20 × 10 ÷ 50 = 4 seniors who use it." },
      { h: "Next step", v: "🔍", t: "If the real counts are far from the expected ones, the two things may be linked." }
    ];
    return { title: "Expected counts", make };
  };

  const ciRead = () => {
    const make = () => {
      if (Math.random() < 0.6) {
        const k = ri(0, 2); let lo, hi;
        if (k === 0) { lo = ri(-6, -1); hi = ri(1, 6); } else if (k === 1) { lo = ri(1, 4); hi = lo + ri(2, 5); } else { hi = -ri(1, 4); lo = hi - ri(2, 5); }
        const A = "The interval includes zero, so no clear difference is shown", B = "The interval is entirely above zero, so group A seems higher", C = "The interval is entirely below zero, so group A seems lower";
        return {
          text: `A study reports the difference in reading scores (group A minus group B) with a 95% confidence interval from <b>${lo}</b> to <b>${hi}</b>. What does this suggest?`, visual: "📏", choices: shuf([A, B, C]), answer: [A, B, C][k],
          hints: ["Look at the two ends of the interval and ask whether zero (no difference) sits between them.", "If both ends are on the same side of zero, a real difference is likely. If the ends are on opposite sides, it is not clear.", "Example: an interval from 2 to 6 is all above zero, so group A seems higher. An interval from −3 to 4 includes zero, so no clear difference. Now do yours."]
        };
      }
      const w = shuf([2, 5, 9]), iv = w.map(x => { const lo = ri(-5, 5); return { s: `${lo} to ${lo + x}`, w: x }; });
      const best = iv.find(x => x.w === 2);
      return {
        text: `Three studies estimate the same effect. Which interval gives the <b>most precise</b> estimate?`, visual: "📏", choices: iv.map(x => x.s), answer: best.s,
        hints: ["A precise estimate pins the effect down to a small range of values.", "Find the width of each interval by subtracting the lower end from the upper end. Which is the smallest?", "Example: intervals 1 to 4 and 2 to 12. Widths are 3 and 10, so the first is more precise. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Confidence intervals", v: "a range of likely values", t: "A <b>confidence interval</b> gives a range of values that could plausibly be the true effect, not just one number." },
      { h: "Does it include zero?", v: "−3 to 4", t: "For a difference between groups, an interval that includes 0 means \"no difference\" is still possible. An interval fully above or below 0 points to a real difference." },
      { h: "Narrow is precise", v: "2 to 6", t: "A narrow interval means a more precise estimate. Larger samples usually make intervals narrower." }
    ];
    return { title: "Reading confidence intervals", make };
  };

  // ---------- LEVEL 22 (10th grade, second half) ----------
  const L22 = [
    SC("Find the research gap", "🕳️", "A <b>research gap</b> is something earlier studies have not answered. Looking for a gap helps you ask a question that adds something new.", "Ask what is missing from what has been studied already: a group, a place, a time or a method.", "Many studies cover teens in cities, but few cover teens in small villages. That missing group is a gap.", [
      "A review finds many studies on teens and sleep but none on teens with night jobs. This missing piece is called a...|research gap|conclusion|citation",
      "Why look for a gap before choosing a question?|so your work adds something new|so you can copy a paper|so you can skip sources",
      "Which is a sign of a gap?|Authors say more research is needed on a specific group|The paper has many photos|The title is long",
      "A gap can be a missing...|group, place, time period or method|title page|font|page number",
      "Where can you often find clues about gaps?|In the limitations and future-research parts of papers|In the table of contents|On the copyright page",
      "You find 40 studies on city libraries and almost none on rural ones. A possible gap is...|how rural libraries are used|how to print a book|what a shelf weighs",
      "If a question was fully answered many times already, you should...|look for a new angle or group|copy the old answer|quit research",
      "A gap statement often begins...|“Few studies have looked at…”|“Everyone knows that…”|“I just like…”"
    ]),
    PL("Types of data", "🔢", "Before you pick a method, you need to know what kind of data you have. The kind of data decides which charts and tests make sense.", "Ask: is it a label or a number? If it is a number, is there a true zero?", [
      "nominal data::categories with no order, like favorite genre::🏷️", "ordinal data::categories with an order, like small, medium, large::📶", "interval data::numbers with equal steps but no true zero, like temperature in Celsius::🌡️", "ratio data::numbers with equal steps and a true zero, like height::📏", "qualitative data::descriptions in words, not numbers::💬", "quantitative data::information measured or counted as numbers::🔢"
    ]),
    respRate(),
    SC("Kinds of research questions", "❓", "Research questions come in kinds. <b>Descriptive</b> questions describe what is happening, <b>comparative</b> questions compare groups, and <b>causal</b> questions ask whether one thing causes another.", "Look for clue words: “how many” describes, “more than” compares, “improve” or “cause” asks about cause and effect.", "“What percent of seniors use the library?” is descriptive. “Do seniors use it more than freshmen?” is comparative.", [
      "“How many hours do juniors spend reading each week?” is mostly a...|descriptive question|causal question|comparative question",
      "“Do juniors read more than freshmen?” is a...|comparative question|descriptive question|definition question",
      "“Does reading before bed improve sleep quality?” asks about...|possible cause and effect|only counting|only naming",
      "A question starting with “how” or “why” usually leads to...|deeper research than a yes/no question|no research|a shorter title",
      "“What is the relationship between library visits and grades?” asks about...|a link between two things|a date|a definition",
      "“How do students describe finding sources?” is best studied with...|interviews or open responses|a thermometer|a ruler",
      "A good research question is...|focused and researchable|impossible to answer|answered by one quick fact",
      "“What year was the Dewey system published?” is a poor research question because...|it has a single fact for an answer|it is too deep|it is too long"
    ]),
    PL("Kinds of sources", "📚", "Researchers use many kinds of sources. Knowing the kind tells you how much to trust it and how to cite it.", "Ask who wrote it, who it was written for, and whether experts checked it.", [
      "scholarly journal::articles reviewed by experts and written for researchers::🎓", "monograph::a book-length study of one subject by one or more experts::📘", "gray literature::reports made outside regular publishers, like government or think-tank reports::📄", "preprint::a paper shared before peer review is finished::⏳", "trade publication::a magazine for people who work in one industry::🛠️", "white paper::a report that explains a problem and suggests a solution::📑", "tertiary source::a source that collects other sources, like an encyclopedia::📖"
    ]),
    PL("Which citation style?", "🧾", "Different fields use different citation styles. Your teacher, journal or field tells you which one to use. Once chosen, follow it everywhere.", "Match the style to the field, then follow its rules for every source.", [
      "MLA::style common in literature and humanities classes::📖", "APA::style common in psychology and the social sciences, with author and year::🧠", "Chicago::style with footnotes or author-date, common in history::🏛️", "IEEE::style with numbered references, common in engineering and computing::⚙️", "CSE::style used in biology and other life sciences::🧬", "AMA::style used in medicine::⚕️"
    ], { qd: "Which style fits?" }),
    SC("Annotated bibliography", "📝", "An <b>annotated bibliography</b> lists sources and adds a short note (an annotation) to each. The note can summarize the source, evaluate it and say how you will use it.", "An annotation answers three questions: what does it say, how good is it, and how will I use it?", "Entry: the citation, then three sentences saying what the study found, why it seems trustworthy and how it helps your project.", [
      "An annotated bibliography entry has a citation plus a short...|note about the source|copy of the source|picture",
      "An annotation usually includes...|a summary and an evaluation|only a title|a cartoon",
      "The part telling how a source will help your project is the...|reflection or use|citation|page number",
      "Which annotation shows evaluation?|“The author is a long-time researcher, but the sample is small.”|“This article is on page 4.”|“The cover is blue.”",
      "Entries in an annotated bibliography are usually arranged...|alphabetically by author|by color|randomly",
      "A summary annotation tells...|the main argument of the source|where you bought it|nothing",
      "Writing annotations as you read helps you...|remember sources and avoid plagiarism|skip citing|finish without reading",
      "An annotation is usually...|a short paragraph|a whole chapter|a single letter"
    ]),
    SC("Narrow it down", "🔭", "A topic can be too broad (thousands of sources, no focus) or too narrow (almost no sources). You can narrow a topic by adding a group, a place, a time or an angle.", "Add who, where or when, but not so much that you cannot find any sources.", "“Sleep” is broad. “Sleep habits of high school juniors in one district” is focused.", [
      "“Social media” is too broad. Which is better?|How social media affects study habits of 11th graders at one school|Social media|Everything about computers",
      "A topic that is too broad often gives...|thousands of results and no focus|zero results always|a perfect paper",
      "A topic that is too narrow often gives...|too few sources to use|too many sources|nothing at all",
      "Add a place and time: “recycling” could become...|recycling programs in one city from 2015 to 2025|everything about trash|recycling",
      "To narrow a topic you can add...|a group, place, time or angle|more commas|a bigger font",
      "If you find almost no sources, you may need to...|widen your topic a little|stop reading|cite harder",
      "“World history” is too...|broad|narrow|exact",
      "Which is the narrowest?|How one town's library changed its hours in 2023|Libraries|Libraries around the world"
    ]),
    SC("Interlibrary loan", "🔁", "If your library does not own something, a librarian can often get it from another library. This is <b>interlibrary loan</b>. It takes time, so ask early.", "Plan ahead: sources from other libraries can take days or weeks to arrive.", "Your school library lacks a book you need, so you fill out a request and it arrives from a college library in a week.", [
      "If your library does not own a book you need, you can ask for...|interlibrary loan|a refund|a new title",
      "Interlibrary loan means...|borrowing from another library through your own library|buying a book online|making a copy of a shelf",
      "A union catalog shows...|what many libraries hold at once|only one shelf|only ebooks",
      "Why should you request items early?|delivery can take days or weeks|they arrive instantly|they never arrive",
      "You need an article your library does not have. Your best first move is...|ask a librarian how to request it|give up|invent a citation",
      "A DOI helps you...|find a specific article reliably|rent a car|spell the title",
      "A scanned copy of just one article, sent to you, is called...|document delivery|a pizza order|a street map",
      "Who can help track down hard-to-find sources?|a reference librarian|a vending machine|a stranger online"
    ]),
    PL("Archives", "🗄️", "An <b>archive</b> keeps original records, letters and papers. Archives are the place to find primary sources that no one has published.", "Start with the finding aid: it shows what is in a collection before you ask for boxes.", [
      "archive::a place that keeps original records and papers::🗄️", "finding aid::a guide that lists what is in an archival collection::🧭", "primary document::an original letter, diary, photo or record from the time::✉️", "provenance::the history of who made and owned a document::🪪", "manuscript::a handwritten or typed work that was not published::📜", "special collections::rare or fragile materials kept in a protected area::🔐"
    ]),
    PL("Qualitative methods", "🗣️", "Qualitative research studies meaning, experiences and ideas, usually in words, pictures or observations rather than numbers.", "Choose the method that fits your question: ask people, watch a place, or study a text.", [
      "interview::asking people open questions and recording their answers::🎙️", "focus group::a guided discussion with a small group about one topic::👥", "case study::a deep look at one person, place, group or event::🔍", "ethnography::studying a community by spending time in it and observing::🏘️", "content analysis::counting and studying themes in texts, images or media::📰", "field notes::a researcher's written observations made on site::📝"
    ]),
    relFreq(),
    strat(),
    SC("Hypotheses", "🧪", "A <b>hypothesis</b> is a testable prediction. The <b>null hypothesis</b> says there is no effect or difference. The <b>alternative hypothesis</b> says there is one.", "A good hypothesis can be tested and could be shown wrong by data.", "Alternative: “Students who use a planner turn in more work on time.” Null: “Planner use makes no difference.”", [
      "The null hypothesis usually says there is...|no effect or no difference|a big effect|a typo",
      "The alternative hypothesis says there is...|an effect or a difference|no change|no data",
      "A good hypothesis is...|testable and specific|impossible to test|a question",
      "A hypothesis is best described as...|a testable prediction|a proven fact|a quotation",
      "“Libraries are boring” is a weak hypothesis because...|it is vague and cannot be measured|it is too short|it has a number",
      "If your data do not support your hypothesis, you should...|report what you found honestly|change the data|hide the study",
      "Which is a testable hypothesis?|Students who sleep eight hours score higher on tests|Sleep is nice|Tests are hard",
      "Rejecting the null hypothesis means...|the data do not fit well with “no effect”|the study is ruined|the author left"
    ]),
    quart(),
    SC("Parts of an abstract", "📄", "An <b>abstract</b> is a short summary of a whole paper, written at the start. It covers the purpose, the method, the main results and the conclusion.", "Match each sentence to a job: why, how, what was found, or what it means.", "Purpose: “This study asks how teens choose books.” Method: “We interviewed 20 teens.” Result: “Most chose books friends recommended.”", [
      "An abstract is...|a short summary of a whole paper|a long chapter|a drawing",
      "Where does an abstract appear?|At the start, before the paper|After the bibliography|On the back cover",
      "Which sentence belongs to the method part?|“We surveyed 120 juniors.”|“Libraries are great.”|“Thank you to my class.”",
      "Which sentence belongs to the results part?|“Students who used the library scored higher on average.”|“We chose a random sample.”|“This paper is about libraries.”",
      "An abstract is best written...|after the paper is finished|before any research|never",
      "Abstracts help readers...|decide quickly whether to read the full paper|skip all papers|find the paper's color",
      "An abstract should avoid...|new information not found in the paper|a summary of results|a statement of purpose",
      "A typical abstract length is...|about 150 to 250 words|ten words|twenty pages"
    ]),
    SC("The research pitch", "🎤", "A short <b>pitch</b> explains your project in about a minute: what you study, why it matters and how you will do it. It helps you check that you can explain your idea clearly.", "Say the idea so a friend who is not in your class could understand it.", "“I want to find out how teens choose books, because libraries can then buy better ones. I will survey 100 students.”", [
      "A short pitch of your project should say...|what you study, why it matters and how|your whole bibliography|only your name",
      "Why practice a pitch out loud?|you find the parts that are unclear|you lose your voice|nothing changes",
      "If a listener looks confused, you should...|use simpler words and an example|talk faster|stop",
      "A pitch for non-experts should avoid...|unexplained jargon|examples|short sentences",
      "The “so what?” in a pitch is...|why the topic matters|how long it took|your grade",
      "A good pitch lasts about...|thirty seconds to a minute|one hour|five seconds",
      "A good way to end a pitch is...|with the main takeaway or question you hope to answer|with “that's it”|with an apology",
      "Which opening is strongest?|“I want to find out how teens choose what to read.”|“Um, my project is, like, stuff.”|“I did not have time.”"
    ]),
    SC("Keep a research log", "📓", "A <b>research log</b> records your searches, sources and decisions as you go. It saves time, protects you from plagiarism and helps you explain your method later.", "Write things down while you work, not the night before the deadline.", "Log: date, search words used, database, what you found, and the full citation for anything useful.", [
      "A research log records...|searches, sources and decisions|only your grades|jokes",
      "Writing down your search terms helps you...|repeat or improve the search later|forget them|hide sources",
      "Why note the date you accessed a website?|pages can change or disappear|dates are lucky|it is for decoration",
      "If a source looks useful, your log should include...|its full citation details|only a nickname|nothing",
      "A log of dead ends is useful because...|you will not repeat unhelpful searches|dead ends count as sources|they are secret",
      "Which is the best habit?|Log sources as you find them|Log everything the night before the due date|Never log anything",
      "A reference manager can...|store sources and build citations|write your thesis alone|remove the need to read",
      "Saving the citation with every note helps if...|you need to credit the idea later|you lose your pencil|you finish early"
    ])
  ];

  // ---------- LEVEL 23 (11th grade, first half) ----------
  const L23 = [
    PL("Mixed methods", "➕", "<b>Mixed methods</b> research uses both numbers and words in one study. Each kind of data can fill gaps left by the other.", "Ask which kind of data comes first and how the two will be joined.", [
      "mixed methods::using both numbers and words in one study::➕", "convergent design::collecting both kinds of data at the same time and comparing them::🔀", "explanatory sequential::a survey first, then interviews to explain the results::1️⃣", "exploratory sequential::interviews first, then a survey built from what you learned::🧭", "pilot study::a small trial run to test your methods before the real study::🧪", "integration::bringing the number results and the word results together::🧩"
    ]),
    SC("Limitations and delimitations", "🚧", "A <b>limitation</b> is a weakness you cannot fully control, such as a small sample. A <b>delimitation</b> is a boundary you choose on purpose, such as studying only one grade.", "Ask: did I choose this boundary, or did it happen to me?", "“Only a few people answered” is a limitation. “I chose to study only one school” is a delimitation.", [
      "“Only 12 of 100 students returned my survey.” This is a...|limitation|delimitation|conclusion",
      "“I decided to study only juniors, not other grades.” This is a...|delimitation|limitation|bibliography",
      "A limitation is something that...|may weaken the study and was not fully in your control|you choose on purpose|helps your grade",
      "A delimitation is a boundary that...|the researcher chooses on purpose|is forced by chance|cannot be seen",
      "Naming limitations honestly makes a study...|more trustworthy|weaker for sure|shorter",
      "Where do limitations usually appear?|In the discussion or conclusion|On the cover|In the index",
      "Which is a limitation?|A small sample size|Choosing the topic|Picking a title",
      "Which is a delimitation?|Choosing to study one city only|Losing half the data|A broken tape recorder"
    ]),
    PL("Parts of the discussion", "💬", "The discussion section explains what the results mean. It is where you turn data into understanding, so it should match your research question.", "Move from what you found to what it means, then to what remains unknown.", [
      "interpretation::explaining what the results mean::💡", "comparison::linking your results to earlier studies::🔗", "implications::what the findings could mean for people or practice::🌍", "limitations::weaknesses that affect how far you can trust the findings::⚠️", "future research::open questions and next steps that your study leaves::🔭", "conclusion::the final takeaway that answers your research question::🏁"
    ]),
    chance(),
    PL("Errors and power", "📉", "Statistics cannot give certainty. Tests can make two kinds of mistakes, and good researchers plan for both.", "Think of a smoke alarm: a false alarm is one mistake, and sleeping through a fire is the other.", [
      "Type I error::finding an effect that is not really there (a false alarm)::🚨", "Type II error::missing an effect that really is there::🙈", "p-value::how surprising your data would be if there were no real effect::📉", "alpha level::the cutoff for p chosen before the test, often 0.05::🎯", "statistical power::the chance a study will detect a real effect::🔋", "effect size::how big a difference or relationship is::📏"
    ]),
    SC("Informed consent", "✍️", "People who take part in research must know what the study involves and agree freely. Young people usually give <b>assent</b> and a parent or guardian gives permission.", "Ask if the person understands the study and could say no without trouble.", "A consent form explains what will happen, any risks, how data are kept private and that the person can quit any time.", [
      "Informed consent means participants...|understand the study and agree freely|are told nothing|are paid a lot",
      "A participant under 18 usually needs...|a parent's permission and their own assent|nothing|a teacher's grade",
      "Assent is...|a young person's agreement to take part|a payment|a result",
      "A participant may leave a study...|at any time without penalty|never|only if paid",
      "A consent form should explain...|what will happen, risks and how data are kept|your favorite color|your grades",
      "Keeping answers private and not linked to names protects...|confidentiality|a bibliography|a limitation",
      "Pressuring a classmate to answer your survey is...|not true consent|fine|required",
      "Before recording an interview you should...|ask permission to record|record secretly|hide the device"
    ]),
    PL("Privacy words", "🕶️", "Researchers protect the people in their studies. These words describe the different ways of keeping identities safe.", "Ask who can tell who the person is: nobody, only the researcher, or everyone?", [
      "anonymous::no one, even the researcher, can tell who answered::🕶️", "confidential::the researcher knows who answered but keeps it private::🤐", "de-identified::names and details that point to a person are removed::✂️", "debriefing::explaining the full purpose of a study after it ends::🗣️", "assent::a young person's agreement to join::👍", "pseudonym::a made-up name used to protect someone's identity::🎭"
    ]),
    transcribe(),
    SC("Coding qualitative data", "🏷️", "In qualitative research, <b>coding</b> means labeling parts of your data with short tags. Similar codes are then grouped into <b>themes</b>.", "Read, label ideas, group labels, then name the pattern you see.", "Excerpts tagged “trust librarians” and “ask for help” can be grouped into the theme “librarians as guides.”", [
      "In qualitative research, a code is...|a short label for an idea in the data|a secret password|a barcode",
      "Coding means...|tagging parts of text with labels|translating a book|counting pages",
      "Grouping similar codes gives you...|themes|footnotes|page numbers",
      "Which is more like a theme?|Students trust librarians more than websites|“Page 3”|A date",
      "Open coding is the step where you...|label ideas as you read, without fixed categories|count the pages|add a citation",
      "A codebook lists...|each code with its meaning and an example|the author's address|sources only",
      "If two codes mean nearly the same thing, you can...|merge them|delete all codes|ignore them",
      "Keeping a short quote with each code helps you...|show evidence for a theme|avoid reading|shorten the paper"
    ]),
    SC("Citation chaining", "⛓️", "<b>Citation chaining</b> follows links between papers. <b>Backward</b> chaining reads the reference list of a good source. <b>Forward</b> chaining finds newer papers that cite it.", "Backward goes to older sources, forward goes to newer ones.", "You find one perfect article. Its references lead to older studies, and a database list of “cited by” leads to newer ones.", [
      "Backward chaining means looking at...|the reference list of a good source|who cites it later|its cover",
      "Forward chaining means finding...|newer works that cite a source|older works the source cited|books with no authors",
      "A tool that shows who cited an article is a...|citation index in a database|dictionary|atlas",
      "You found one perfect article. A fast way to find more is to...|follow its references and its citations|start over with nothing|stop",
      "An article that many later papers cite is probably...|influential in its field|false|brand new",
      "Backward chaining leads you to...|older sources|newer sources|blank pages",
      "Forward chaining leads you to...|newer sources|older sources|no sources",
      "Chaining helps you spot...|key authors who keep appearing|spelling errors|printer problems"
    ]),
    PL("The scholarly conversation", "🗨️", "Research is a conversation across many years. Your project answers earlier voices and adds a new one.", "Before you add your voice, listen to what has already been said.", [
      "scholarly conversation::the ongoing exchange of ideas among researchers in a field::💬", "seminal work::an early, highly influential study that shaped a field::🌱", "theoretical framework::the theory or ideas that guide how you study a problem::🏗️", "discourse::the way a topic is written and talked about in a field::🗨️", "stance::the position you take toward a topic::🧍", "paradigm::a widely shared set of ideas and methods in a field::🧭"
    ]),
    SC("Purpose and significance", "🎯", "Your <b>purpose statement</b> says what the study aims to do. Your <b>significance</b> says why the results could matter and to whom.", "Link the importance to real people, practice or knowledge, and stay honest about how far it goes.", "“This study examines how teens choose books. Findings could help school libraries choose titles that students actually read.”", [
      "The significance of a study tells...|why the results could matter|how long it took|who paid",
      "Which is a strong statement of significance?|“Findings could help schools choose better reading programs.”|“This is important because it is.”|“I like this topic.”",
      "A purpose statement says...|what the study aims to do|what was found|the references",
      "“The purpose of this study is to examine how…” is a...|purpose statement|result|citation",
      "Significance should be linked to...|real people, practice or knowledge|the word count|nothing",
      "A research question should match your...|purpose statement|font|folder",
      "Overstating significance (“this will solve every problem”) is...|a weakness|a strength|required",
      "After naming the gap, the next sentence usually says...|how your study will help fill it|that you are tired|a joke"
    ]),
    agree(),
    zscore(),
    riskRatio(),
    SC("Member checking and reflexivity", "🪞", "<b>Member checking</b> means asking participants to confirm your summary of what they said. <b>Reflexivity</b> means thinking about how your own views shape your research.", "Check your work with the people in it, and be honest about your own position.", "A researcher shares a summary with an interviewee, who corrects one detail. The researcher also writes in a journal about their own assumptions.", [
      "Member checking means...|asking participants to confirm your summary of what they said|guessing what they meant|deleting their words",
      "Reflexivity means...|thinking about how your own views shape your research|measuring a reflection|copying a source",
      "Why note your own assumptions?|to reduce hidden bias|to hide them|to add words",
      "A researcher who says “I used to belong to this club” is practicing...|openness about their position|plagiarism|hiding data",
      "If a participant says you misquoted them, you should...|correct it|ignore it|argue",
      "A reflexive journal records...|your thoughts and decisions during research|only citations|the weather",
      "Positionality is...|your background and how it may affect your view|your GPS location|a theory",
      "Member checking improves...|credibility|font size|speed"
    ]),
    SC("Figures and tables", "📊", "Tables and figures should help readers see your results at a glance. Each one needs a number, a clear title or caption, labels and a mention in the text.", "Ask whether a reader could understand the figure without reading the whole paper.", "A good caption: “Figure 1. Share of students using each source type, 2025.”", [
      "A table title usually goes...|above the table|nowhere|in the index",
      "Every figure or table should be...|mentioned and explained in the text|hidden|decorated",
      "Axes of a graph need...|labels with units|jokes|nothing",
      "A figure should help the reader...|see the point without extra effort|get confused|count pixels",
      "Too many colors or decorations in a chart is called...|clutter|clarity|analysis",
      "If you borrow a chart from another source, you must...|credit the source|change only the colors|do nothing",
      "Which is the best caption?|“Figure 1. Share of students using each source type, 2025.”|“Chart”|“Figure”",
      "Numbers in a table should be...|rounded the same way throughout|random digits|hidden"
    ]),
    SC("Predatory journals", "🎣", "A <b>predatory journal</b> charges authors fees but does little or no real peer review. Publishing there can hurt your credibility and spread weak research.", "Check who runs the journal and whether trusted directories list it. Ask a librarian when unsure.", "A journal emails you, promises acceptance in three days and asks for a fee. This is a warning sign.", [
      "A predatory journal...|charges fees but does little real peer review|reviews very strictly|is always free",
      "A warning sign is...|constant emails promising very fast publication|a clear editor list|a careful review process",
      "Before trusting a journal, check if it is...|listed in a trusted database or directory|brightly colored|new",
      "A journal that guarantees acceptance in days is...|suspicious|good|normal",
      "A hijacked journal...|copies the name or website of a real journal|is a library|is very honest",
      "To check a journal's reputation, ask...|a librarian|a pop-up ad|nobody",
      "Are all open access journals predatory?|No, many are respected|Yes, all of them|Only the new ones",
      "A vague name like “International Journal of Everything” may be...|a warning sign|proof of quality|required"
    ])
  ];

  // ---------- LEVEL 24 (11th grade, second half) ----------
  const L24 = [
    SC("Defend your research", "🛡️", "In an oral defense, a panel asks about your choices. Good answers are calm, short and tied to your evidence. It is fine to say you do not know.", "Answer the question that was asked, and point to your evidence.", "Asked why you used interviews: “My question was about experiences, and interviews let people explain in their own words.”", [
      "A panel asks something you do not know. The best answer is to...|admit it honestly and explain how you would find out|make something up|change the topic",
      "Before a defense, practice by...|answering likely questions out loud|only reading silently|skipping practice",
      "A panelist asks why you chose your method. You should...|explain how it fits your question|say “I just did”|blame someone",
      "If you need a moment to think, you can...|pause and take a breath|run away|ask the panel to leave",
      "A good answer is usually...|short, clear and tied to your evidence|very long|vague",
      "When a question challenges your claim, respond...|calmly with evidence|angrily|by ignoring it",
      "Thanking a panelist for a question...|shows respect and gives you time to think|is rude|loses points",
      "Slowing down your speaking helps...|listeners follow and you stay calm|nothing|hide your data"
    ]),
    PL("Conference words", "🎤", "Researchers share their work at conferences. Knowing the words helps you read a program and take part.", "Match the event to what the person does: talk, show a poster, discuss, or ask.", [
      "call for papers::an announcement asking researchers to submit work to a conference::📣", "keynote::the main featured talk at a conference::🎤", "poster session::researchers stand by posters to explain work to visitors::🖼️", "panel::a group of experts who discuss a topic together::🪑", "proceedings::the published collection of papers from a conference::📚", "Q&A::time for the audience to ask questions::❓"
    ]),
    PL("Front and back matter", "📖", "Long papers have parts before and after the main text. Each part has a job, and readers use them to find their way.", "Think about where the reader needs each part: before, during or after reading.", [
      "title page::the first page with the title, author and date::📄", "acknowledgments::a note thanking people who helped::🙏", "glossary::a list of special terms and their meanings::📖", "appendix::extra material, like survey forms, placed at the end::📎", "references::the list of sources you cited::📚", "footnote::a note at the bottom of a page::👣", "epigraph::a short quotation near the start that sets the theme::✒️"
    ]),
    SC("What goes in an appendix?", "📎", "An <b>appendix</b> holds extra material that supports your paper but would interrupt the main text, such as a survey form, a codebook or long tables. The paper must still make sense without it.", "Put the key results in the main text. Put long supporting items at the end and mention them.", "A full copy of your survey goes in Appendix A, and the text says “see Appendix A.”", [
      "Which belongs in an appendix?|the full survey form you used|your main argument|the conclusion",
      "An appendix is useful for...|material too long for the main text|hiding weak results|jokes",
      "Appendices are usually...|labeled, like Appendix A and Appendix B|unnamed|printed backwards",
      "Your main text should...|mention the appendix when it is relevant|never mention it|copy it all",
      "Raw interview transcripts with names should be...|anonymized or left out to protect people|posted publicly|labeled with names",
      "Which belongs in the main text, not an appendix?|the key results that answer your question|a long blank consent form|a 20-page raw data table",
      "Appendix material is...|extra, so the paper still works without it|essential|read before the title",
      "A detailed codebook often goes in...|an appendix|the title|the epigraph"
    ]),
    SC("Copyright and sharing", "©️", "Creative work is protected by <b>copyright</b>. <b>Fair use</b> allows limited use, like quoting for research, and <b>Creative Commons</b> licenses tell you how a work may be reused. Crediting a source is not the same as having permission.", "Check the license before you reuse something, and ask a librarian if you are unsure.", "A photographer marks a photo “CC BY.” You may reuse it if you give credit as the license asks.", [
      "Fair use may allow using...|a small part for criticism, teaching or research|any whole book|nothing at all",
      "A Creative Commons license shows...|how others may reuse a work|the price|the weather",
      "Which normally needs permission?|copying a whole book to share|quoting a short passage with credit|summarizing in your own words with a citation",
      "Giving credit alone...|does not always replace permission|always fixes copyright|is illegal",
      "Public domain works are...|free to use because copyright has ended or never applied|always new|secret",
      "“CC BY” means you may reuse the work if you...|give credit to the creator|pay a fee|remove their name",
      "For an image in your poster, the safest approach is to...|check its license or use one marked reusable|assume it is free|crop off the name",
      "Copyright protects...|the creative expression, not plain facts|plain facts only|nothing"
    ]),
    PL("College library services", "🏛️", "College libraries offer more than books. Knowing the services now helps you do research well after high school.", "When you are stuck, a librarian is usually the fastest help.", [
      "reference librarian::a library expert who helps you plan and search::🧑‍🏫", "subject guide::a page that collects the best sources for one field::🧭", "course reserves::books set aside for a class to borrow for a short time::📌", "research consultation::a one-on-one meeting with a librarian about your project::🤝", "institutional repository::an online archive of a school's own research and theses::🏛️", "off-campus access::logging in from home to use library databases::🏠"
    ]),
    combineMeans(),
    SC("Reflecting on your process", "🪞", "A <b>reflection</b> looks back at how you did the research: what you learned, what was hard and what you would change. Use specific examples, not general praise.", "Pick one real moment and say what happened, what you learned and what you would do next time.", "“My first survey question confused people, so I rewrote it. Next time I will test questions with a small group first.”", [
      "A research reflection explains...|what you learned about your process and choices|only the results|the cover design",
      "Strong reflection mentions...|a challenge and how you handled it|that nothing went wrong|only praise",
      "“My first survey question was confusing, so I rewrote it.” This shows...|learning from a mistake|laziness|plagiarism",
      "Reflection is usually written...|in the first person, using “I”|without any verbs|in code",
      "A good reflection uses...|specific examples|vague phrases|copied text",
      "Asking “What would I improve?” is part of...|reflection|a bibliography|an abstract",
      "Reflection helps you...|see how to do better next time|hide errors|skip steps",
      "Which is more reflective?|“My interviews taught me to ask open questions.”|“The project was fine.”|“I finished.”"
    ]),
    SC("Reading a results table", "📋", "Results tables use short labels. <b>n</b> is the number of cases, <b>M</b> or mean is the average, <b>SD</b> is the spread and <b>p</b> tells how surprising the result would be if there were no real effect.", "Read the labels first, then compare numbers, then ask what the table does not show.", "A row reads n = 120, M = 78, SD = 6, p = .03. That is 120 people, an average of 78 and a small p-value.", [
      "In a results table, n usually means...|the number of participants or cases|the next entry|nothing",
      "The “mean” column shows...|the average|the middle value only|the biggest value",
      "“SD” stands for...|standard deviation|simple data|source date",
      "A p-value below the alpha level (like .05) suggests the result is...|statistically significant|a mistake|ignored",
      "A correlation r near 0 means...|little straight-line relationship|a strong link|an error",
      "An r near −1 means...|a strong negative relationship|no relationship|a strong positive relationship",
      "A note saying “p < .01” means...|chance alone would rarely give such a result|the study failed|n was one",
      "Always check the table's n because...|a tiny n makes results less stable|n is the author's initial|it names a page"
    ]),
    SC("Can it be generalized?", "🌍", "<b>Generalizability</b> is how far your results apply beyond your sample. Random, varied samples support broader claims. Small or volunteer samples call for careful wording.", "Match the size of your claim to the size and kind of your sample.", "From one class of volunteers, say “These students…” rather than “All teenagers…”.", [
      "Generalizability means results...|apply beyond the study sample|are secret|are popular",
      "A random sample from the whole group helps results...|generalize better|never generalize|disappear",
      "A study of one classroom can say little about...|all students everywhere|that classroom|its own mean",
      "Transferability is a qualitative idea: readers judge whether findings fit...|their own settings|math tests|dates",
      "Thick description helps readers decide...|if findings could transfer to their situation|where to shop|the word count",
      "If your sample was volunteers only, results may...|not represent everyone|be perfect|speak for all",
      "Which wording is safer for a small study?|“These findings suggest…”|“This proves for everyone…”|“Everyone always…”",
      "Larger and more varied samples usually...|support broader claims|reduce the claims|change nothing"
    ]),
    PL("Trustworthy qualitative work", "🧭", "Qualitative research is judged by trustworthiness, not by the same numbers as quantitative studies. These four ideas appear in many papers.", "Ask: believable, transferable, steady, and based on the data?", [
      "credibility::how believable the findings are to participants and readers::✅", "transferability::whether findings could apply in other settings::🔁", "dependability::whether the process is clear and steady enough to follow again::🧭", "confirmability::whether findings come from the data, not the researcher's bias::🔍", "thick description::rich detail about the setting and people::🖋️", "audit trail::a record of choices and steps so others can check the work::🧾"
    ]),
    PL("Which statistical test?", "📐", "Different questions and kinds of data need different tests. Choose the test that matches your data and question, not the one that gives the answer you want.", "First name your data (categories or numbers), then how many groups you compare.", [
      "t-test::compares the averages of two groups::⚖️", "ANOVA::compares the averages of three or more groups::📊", "chi-square test::checks whether two category variables are linked, using counts::🔲", "correlation::measures how closely two number variables move together::📈", "linear regression::uses one variable to predict another with a line::📉", "paired t-test::compares the same people before and after::⏱️"
    ]),
    SC("Which test fits?", "🎯", "Pick a test by looking at your question and your data. Counts in categories point to chi-square. Averages of two groups point to a t-test. Three or more groups point to ANOVA.", "Ask: counts or averages? One group, two groups or more? Before and after, or separate people?", "Comparing average scores of two separate classes fits a t-test.", [
      "Compare the average quiz scores of two different classes.|t-test|chi-square test|correlation",
      "Compare the average scores of four different classes.|ANOVA|chi-square test|correlation",
      "Is favorite book format (print, ebook, audio) linked to grade level, using counts?|chi-square test|t-test|linear regression",
      "Do hours of study and test scores move together?|correlation|chi-square test|ANOVA",
      "Compare the same students' scores before and after training.|paired t-test|chi-square test|ANOVA",
      "Predict a test score from hours studied.|linear regression|chi-square test|ANOVA",
      "Are yes/no answers to “use the library” linked to club membership (yes/no)?|chi-square test|t-test|correlation",
      "Before choosing a test, first identify...|the type of data and your question|the page count|your favorite color"
    ]),
    expected(),
    hIndex(),
    ciRead(),
    SC("Future research", "🔭", "Ending well means pointing to what comes next. Good suggestions for <b>future research</b> are specific and grow from your limitations and surprises.", "Say what to study, with whom or how, and why your results suggest it.", "“A larger sample from several schools could test whether these results hold in other places.”", [
      "Good future-research ideas come from...|your limitations and open questions|random topics|copying another paper",
      "“A larger, more varied sample could test whether these results hold” is...|a useful suggestion|a mistake|a result",
      "Future research should be...|specific and linked to your findings|vague, like “more research”|about your grade",
      "A future study might fix a limitation by...|using a better method or larger sample|ignoring it|hiding it",
      "Which is the more useful suggestion?|Interview students at several schools to see if the pattern repeats|Do more research|Someone should look at this",
      "Why mention future research?|it shows where the field can go next|it hides the results|it fills space",
      "A surprise in your data can lead to...|a new question for later studies|a failed paper|deleting data",
      "Suggestions for future work belong in the...|discussion or conclusion|title|references"
    ]),
    SC("Surprising results", "😮", "Sometimes data do not match your hypothesis. This is part of research. Report it honestly, check for errors and think about other explanations.", "Check the data and method, then offer possible reasons without pretending the result is something else.", "“The results were unexpected. One possible reason is that students answered the survey during exams.”", [
      "Your data do not support your hypothesis. Best next step?|report it honestly and look at why|change the numbers|delete the study",
      "A surprising result can be valuable because...|it can reveal something new|it ends the project|it is always wrong",
      "Before assuming a surprise is real, check...|for errors in data entry or method|the weather|nothing",
      "Discussing alternative explanations shows...|careful thinking|a weak paper only|plagiarism",
      "Dropping data points only because they spoil your story is...|dishonest|smart|required",
      "A null result (no effect found) is...|still useful information|worthless|a lie",
      "Which is a better sentence?|“The results were unexpected, and one possible reason is…”|“The results must be wrong.”|“I knew it all along.”",
      "Trying many tests until one gives a small p-value is called...|p-hacking|good practice|citing"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    22: lvl(22, L22, [1, 3, 5, 6, 9, 10, 13, 15]),
    23: lvl(23, L23, [1, 2, 4, 6, 8, 9, 12, 14]),
    24: lvl(24, L24, [1, 3, 4, 7, 8, 10, 11, 16])
  });
})();
