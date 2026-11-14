// Mind Lab: the 15 subjects. Every subject has 24 levels (half a grade each),
// and every level has 20 lessons. Lesson content gets added wave by wave.
// Singular for exactly 1 ("1 apple", not "1 apples").
const nounFor = (n, w) => n === 1 ? (w === "fish" ? w : w.replace(/s$/, "")) : w;
const LEVELS_PER_SUBJECT = 30;
const LESSONS_PER_LEVEL = 20;

const SUBJECTS = [
  { id: "math",      name: "Math",              emoji: "🔢", color: "#ff7a59", tagline: "Numbers, shapes and patterns" },
  { id: "reading",   name: "Reading",           emoji: "📖", color: "#8e6bff", tagline: "Stories, clues and big ideas" },
  { id: "writing",   name: "Writing & Grammar", emoji: "✏️", color: "#2fb6a3", tagline: "Say it clearly and cleverly" },
  { id: "vocab",     name: "Spelling & Words",  emoji: "🔤", color: "#f2a900", tagline: "Spell it, know it, use it" },
  { id: "life",      name: "Life Science",      emoji: "🌱", color: "#4caf50", tagline: "Plants, animals and your body" },
  { id: "chem",      name: "Chemistry",         emoji: "🧪", color: "#e0457b", tagline: "Atoms, mixes and reactions" },
  { id: "physics",   name: "Physics",           emoji: "⚡", color: "#3b82f6", tagline: "Motion, forces and energy" },
  { id: "earth",     name: "Earth & Space",     emoji: "🪐", color: "#5b5fe0", tagline: "Weather, rocks and the stars" },
  { id: "history",   name: "World History",     emoji: "🏛️", color: "#b8860b", tagline: "People and events that shaped us" },
  { id: "geo",       name: "Geography",         emoji: "🗺️", color: "#12a4c4", tagline: "Maps, countries and cultures" },
  { id: "coding",    name: "Coding",            emoji: "💻", color: "#22c55e", tagline: "Tell computers what to do" },
  { id: "logic",     name: "Logic & Puzzles",   emoji: "🧩", color: "#d946ef", tagline: "Think it through, step by step" },
  { id: "money",     name: "Money Skills",      emoji: "💰", color: "#16a34a", tagline: "Saving, earning and spending smart" },
  { id: "music",     name: "Music Basics",      emoji: "🎵", color: "#f43f5e", tagline: "Rhythm, notes and melodies" },
  { id: "spanish",   name: "Spanish",           emoji: "🌎", color: "#ea580c", tagline: "¡Hola! Speak a new language" },
  { id: "art",       name: "Art & Drawing",     emoji: "🎨", color: "#ec4899", tagline: "Color, shapes and creating" },
  { id: "animals",   name: "Animals & Nature",  emoji: "🐾", color: "#84cc16", tagline: "Wildlife, habitats and ecosystems" },
  { id: "engineer",  name: "Engineering & Robots", emoji: "🤖", color: "#64748b", tagline: "Build it, test it, make it better" },
  { id: "health",    name: "Health & Safety",   emoji: "🍎", color: "#ef4444", tagline: "Healthy habits and staying safe online" },
  { id: "typing",    name: "Typing & Computers", emoji: "⌨️", color: "#0ea5e9", tagline: "Type fast and use tech smartly" },
  { id: "pe",        name: "Physical Education", emoji: "🏃", color: "#f97316", tagline: "Move, play and stay strong" },
  { id: "drama",     name: "Drama & Theater",   emoji: "🎭", color: "#a855f7", tagline: "Act, speak and tell stories" },
  { id: "civics",    name: "Civics & Government", emoji: "🗳️", color: "#1d4ed8", tagline: "How communities and countries work" },
  { id: "homeec",    name: "Home Economics & Cooking", emoji: "🍳", color: "#d97706", tagline: "Cook, sew and run a home" },
  { id: "french",    name: "French",            emoji: "🥐", color: "#2563eb", tagline: "Bonjour! Speak French" },
  { id: "sign",      name: "Sign Language",     emoji: "🤟", color: "#14b8a6", tagline: "Talk with your hands" },
  { id: "library",   name: "Library & Research", emoji: "🔎", color: "#7c3aed", tagline: "Find facts and check your sources" },
  { id: "hand",      name: "Handwriting",       emoji: "🖋️", color: "#475569", tagline: "Neat letters and cursive" },
  { id: "speaking",  name: "Public Speaking",   emoji: "🎤", color: "#e11d48", tagline: "Speak up with confidence" }
];

// Level 1..24 -> grade label. Each grade has two levels (first half / second half).
function gradeLabel(level) {
  const grade = Math.floor((level - 1) / 2);
  const half = (level - 1) % 2 === 0 ? "first half" : "second half";
  // 30 levels = 15 grades, two levels per grade: Kindergarten to 12th grade, then 2 college years.
  const real = ["Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade",
                "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade",
                "12th grade", "College year 1", "College year 2"];
  return real[grade] + " (" + half + ")";
}

// The 4 sections of every course. 6 levels each. Change the numbers here to move them.
const SECTIONS = [
  { name: "Kindergarten",  emoji: "🧸", from: 1,  to: 6,  blurb: "Kindergarten to 2nd grade" },
  { name: "Middle School", emoji: "🎒", from: 7,  to: 12, blurb: "3rd to 5th grade" },
  { name: "Junior High",   emoji: "📚", from: 13, to: 18, blurb: "6th to 8th grade" },
  { name: "High School",   emoji: "🎓", from: 19, to: 26, blurb: "9th to 12th grade" },
  { name: "College",       emoji: "🏫", from: 27, to: 30, blurb: "College years 1 and 2" }
];

// Price per level: $3 for levels 1-8, $4 for 9-16, $5 for 17-30. Level 1 is free.
function levelPrice(level) {
  if (level === 1) return 0;
  if (level <= 8) return 3;
  if (level <= 16) return 4;
  return 5;
}

// ---------- how hard, what age, how long ----------
const HARD_WORDS = ["Easy", "Medium", "Hard", "Very hard", "Genius"];
// Overall hardness of each subject (1 = easiest, 5 = hardest).
const SUBJECT_HARDNESS = {
  math: 4, reading: 3, writing: 3, vocab: 2, life: 3, chem: 5, physics: 5, earth: 3, history: 3, geo: 2,
  coding: 4, logic: 4, money: 3, music: 3, spanish: 3, art: 2, animals: 2, engineer: 4, health: 2, typing: 2,
  pe: 1, drama: 2, civics: 3, homeec: 2, french: 3, sign: 3, library: 2, hand: 1, speaking: 3
};
const hardnessOf = id => SUBJECT_HARDNESS[id] || 3;
const hardStars = n => "⭐".repeat(n);
// Difficulty of a level: Easy (levels 1-6) up to Genius (25-30), the same ladder as the books.
const levelDifficulty = level => Math.min(5, Math.ceil(level / 6));
// The age a student usually is when they meet this level (Kindergarten = about 5 to 6).
function ageRange(level) { const g = Math.floor((level - 1) / 2); return (g + 5) + "-" + (g + 6); }
// A lesson takes about 5 minutes at the start and about 11 minutes at the top.
const lessonMinutes = level => Math.round(5 + level * 0.2);
function levelTimeText(level) { const m = lessonMinutes(level) * LESSONS_PER_LEVEL; return m >= 90 ? "about " + (Math.round(m / 6) / 10) + " hours" : "about " + m + " min"; }
function subjectHours() { let m = 0; for (let l = 1; l <= LEVELS_PER_SUBJECT; l++) m += lessonMinutes(l) * LESSONS_PER_LEVEL; return Math.round(m / 60); }
