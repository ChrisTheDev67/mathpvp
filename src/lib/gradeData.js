// ═══════════════════════════════════════════════════════════════
//  Shared Grade Data — Grades 1-12, Topic-Based
//  Flow: Grade → Topic → Difficulty (easy/normal/medium/hard)
// ═══════════════════════════════════════════════════════════════

// ───── Helpers ─────
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// ───── Difficulty color map ─────
export const difficultyColors = {
    easy: { bg: 'rgba(2, 183, 87, 0.15)', border: 'var(--primary)', shadow: 'var(--primary-glow)' },
    normal: { bg: 'rgba(0, 162, 255, 0.15)', border: 'var(--secondary)', shadow: 'var(--secondary-glow)' },
    medium: { bg: 'rgba(255, 179, 2, 0.15)', border: 'var(--warning)', shadow: 'rgba(255, 179, 2, 0.3)' },
    hard: { bg: 'rgba(255, 71, 87, 0.15)', border: 'var(--error)', shadow: 'rgba(255, 71, 87, 0.3)' },
};

// ═══════════════════════════════════════════════════════════════
//  GRADE 1
// ═══════════════════════════════════════════════════════════════
const grade1Topics = [
    {
        id: 'counting', name: 'Counting to 100', emoji: '🔢',
        generate(d) {
            const max = { easy: 20, normal: 50, medium: 80, hard: 100 }[d];
            const n = rand(1, max - 1);
            return { display: `What comes after ${n}?`, answer: n + 1 };
        }
    },
    {
        id: 'addition', name: 'Addition (within 20)', emoji: '➕',
        generate(d) {
            const max = { easy: 5, normal: 10, medium: 15, hard: 20 }[d];
            const a = rand(1, max), b = rand(1, max - a);
            return { display: `${a} + ${b}`, answer: a + b };
        }
    },
    {
        id: 'subtraction', name: 'Subtraction (within 20)', emoji: '➖',
        generate(d) {
            const max = { easy: 5, normal: 10, medium: 15, hard: 20 }[d];
            const a = rand(2, max), b = rand(1, a);
            return { display: `${a} − ${b}`, answer: a - b };
        }
    },
    {
        id: 'placevalue', name: 'Place Value (tens & ones)', emoji: '🏠',
        generate(d) {
            const max = { easy: 30, normal: 50, medium: 80, hard: 99 }[d];
            const n = rand(10, max);
            const r = rand(0, 1);
            if (r === 0) return { display: `How many tens in ${n}?`, answer: Math.floor(n / 10) };
            return { display: `How many ones in ${n}?`, answer: n % 10 };
        }
    },
    {
        id: 'shapes', name: 'Shapes (sides & corners)', emoji: '🔷',
        generate(d) {
            const all = [
                { name: 'triangle', sides: 3 },
                { name: 'square', sides: 4 },
                { name: 'rectangle', sides: 4 },
                { name: 'pentagon', sides: 5 },
                { name: 'hexagon', sides: 6 },
                { name: 'octagon', sides: 8 },
            ];
            const pool = { easy: 2, normal: 3, medium: 5, hard: 6 }[d];
            const s = all[rand(0, pool - 1)];
            const ask = pick(['sides', 'corners']);
            return { display: `How many ${ask} does a ${s.name} have?`, answer: s.sides };
        }
    },
    {
        id: 'time', name: 'Telling Time', emoji: '🕐',
        generate(d) {
            if (d === 'easy') {
                const h = rand(1, 12);
                return { display: `What hour is shown? ${h}:00`, answer: h };
            }
            if (d === 'normal') {
                const h = rand(1, 12);
                return { display: `${h}:00 + 1 hour = ?:00 (the hour)`, answer: h === 12 ? 1 : h + 1 };
            }
            if (d === 'medium') {
                const h = rand(1, 10), add = rand(1, 2);
                return { display: `${h}:00 + ${add} hours = ?:00 (the hour)`, answer: h + add };
            }
            const h = rand(1, 9), add = rand(1, 3);
            return { display: `${h}:00 + ${add} hours = ?:00 (the hour)`, answer: h + add };
        }
    },
    {
        id: 'wordproblems', name: 'Basic Word Problems', emoji: '📝',
        generate(d) {
            const max = { easy: 5, normal: 10, medium: 15, hard: 20 }[d];
            const r = rand(0, 1);
            if (r === 0) {
                const a = rand(1, max), b = rand(1, max);
                return { display: `You have ${a} apples & get ${b} more. How many total?`, answer: a + b };
            }
            const a = rand(2, max), b = rand(1, a);
            return { display: `You have ${a} cookies & eat ${b}. How many left?`, answer: a - b };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 2
// ═══════════════════════════════════════════════════════════════
const grade2Topics = [
    {
        id: 'addition', name: 'Addition (within 100)', emoji: '➕',
        generate(d) {
            const max = { easy: 30, normal: 50, medium: 80, hard: 100 }[d];
            const a = rand(1, max), b = rand(1, max - a > 0 ? max - a : 10);
            return { display: `${a} + ${b}`, answer: a + b };
        }
    },
    {
        id: 'subtraction', name: 'Subtraction (within 100)', emoji: '➖',
        generate(d) {
            const max = { easy: 30, normal: 50, medium: 80, hard: 100 }[d];
            const a = rand(2, max), b = rand(1, a);
            return { display: `${a} − ${b}`, answer: a - b };
        }
    },
    {
        id: 'skipcounting', name: 'Skip Counting (2s, 5s, 10s)', emoji: '🔄',
        generate(d) {
            const by = { easy: 2, normal: 5, medium: 10, hard: pick([2, 5, 10]) }[d];
            const start = by * rand(1, 8);
            return { display: `Skip count by ${by}: ${start}, ${start + by}, ?`, answer: start + by * 2 };
        }
    },
    {
        id: 'placevalue', name: 'Place Value (hundreds)', emoji: '🏗️',
        generate(d) {
            const max = { easy: 200, normal: 500, medium: 800, hard: 999 }[d];
            const n = rand(100, max);
            const asks = [
                { q: `How many hundreds in ${n}?`, a: Math.floor(n / 100) },
                { q: `How many tens in ${n}? (tens digit)`, a: Math.floor((n % 100) / 10) },
            ];
            return { display: asks[rand(0, 1)].q, answer: asks[rand(0, 1)].a };
        }
    },
    {
        id: 'money', name: 'Money (coins & dollars)', emoji: '💰',
        generate(d) {
            if (d === 'easy') {
                const q = rand(1, 4);
                return { display: `${q} quarters = ? cents`, answer: q * 25 };
            }
            if (d === 'normal') {
                const q = rand(0, 3), d2 = rand(0, 5);
                return { display: `${q} quarters + ${d2} dimes = ? cents`, answer: q * 25 + d2 * 10 };
            }
            if (d === 'medium') {
                const q = rand(0, 3), d2 = rand(0, 4), n = rand(0, 4);
                return { display: `${q} quarters + ${d2} dimes + ${n} nickels = ? ¢`, answer: q * 25 + d2 * 10 + n * 5 };
            }
            const d1 = rand(1, 5), q = rand(0, 3), d2 = rand(0, 5);
            const total = d1 * 100 + q * 25 + d2 * 10;
            return { display: `$${d1} + ${q} quarters + ${d2} dimes = ? cents total`, answer: total };
        }
    },
    {
        id: 'measurement', name: 'Measurement (inches & feet)', emoji: '📏',
        generate(d) {
            const feet = { easy: rand(1, 3), normal: rand(1, 5), medium: rand(2, 8), hard: rand(3, 12) }[d];
            return { display: `${feet} feet = ? inches (1 ft = 12 in)`, answer: feet * 12 };
        }
    },
    {
        id: 'time', name: 'Time (quarter hours)', emoji: '🕐',
        generate(d) {
            if (d === 'easy') {
                const h = rand(1, 12);
                return { display: `What is 30 minutes after ${h}:00? (just minutes)`, answer: 30 };
            }
            if (d === 'normal') {
                return { display: `How many minutes in 1 hour?`, answer: 60 };
            }
            const h = rand(1, 10), addH = rand(1, 2);
            return { display: `${h}:00 + ${addH} hours = ?:00 (the hour)`, answer: h + addH };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 3
// ═══════════════════════════════════════════════════════════════
const grade3Topics = [
    {
        id: 'multiplication', name: 'Multiplication (×1-10)', emoji: '✖️',
        generate(d) {
            const max = { easy: 5, normal: 7, medium: 10, hard: 12 }[d];
            const a = rand(1, max), b = rand(1, max);
            return { display: `${a} × ${b}`, answer: a * b };
        }
    },
    {
        id: 'division', name: 'Division (÷1-10)', emoji: '➗',
        generate(d) {
            const max = { easy: 5, normal: 7, medium: 10, hard: 12 }[d];
            const a = rand(1, max), b = rand(1, max);
            return { display: `${a * b} ÷ ${a}`, answer: b };
        }
    },
    {
        id: 'fractions', name: 'Fractions (½, ⅓, ¼)', emoji: '🍕',
        generate(d) {
            const denoms = { easy: [2], normal: [2, 3], medium: [2, 3, 4], hard: [2, 3, 4, 5] }[d];
            const denom = pick(denoms);
            const mult = rand(2, 6);
            const total = denom * mult;
            const num = rand(1, denom);
            return { display: `What is ${num}/${denom} of ${total}?`, answer: num * mult };
        }
    },
    {
        id: 'rounding', name: 'Rounding', emoji: '🎯',
        generate(d) {
            if (d === 'easy' || d === 'normal') {
                const n = rand(11, 99);
                const rounded = Math.round(n / 10) * 10;
                return { display: `Round ${n} to nearest ten`, answer: rounded };
            }
            const n = rand(101, 999);
            const rounded = Math.round(n / 100) * 100;
            return { display: `Round ${n} to nearest hundred`, answer: rounded };
        }
    },
    {
        id: 'perimeter', name: 'Perimeter', emoji: '📐',
        generate(d) {
            const max = { easy: 5, normal: 8, medium: 12, hard: 20 }[d];
            const l = rand(2, max), w = rand(2, max);
            return { display: `Perimeter of rectangle: L=${l}, W=${w}`, answer: 2 * (l + w) };
        }
    },
    {
        id: 'multidigitadd', name: 'Multi-digit Addition', emoji: '🔢',
        generate(d) {
            const max = { easy: 100, normal: 300, medium: 500, hard: 999 }[d];
            const a = rand(10, max), b = rand(10, max);
            return { display: `${a} + ${b}`, answer: a + b };
        }
    },
    {
        id: 'multidigitsub', name: 'Multi-digit Subtraction', emoji: '🔢',
        generate(d) {
            const max = { easy: 100, normal: 300, medium: 500, hard: 999 }[d];
            let a = rand(20, max), b = rand(10, max);
            if (a < b) [a, b] = [b, a];
            return { display: `${a} − ${b}`, answer: a - b };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 4
// ═══════════════════════════════════════════════════════════════
const grade4Topics = [
    {
        id: 'multidigitmult', name: 'Multi-digit Multiplication', emoji: '✖️',
        generate(d) {
            const ranges = { easy: [10, 30, 2, 5], normal: [10, 50, 2, 9], medium: [10, 99, 2, 9], hard: [10, 99, 10, 99] }[d];
            const a = rand(ranges[0], ranges[1]), b = rand(ranges[2], ranges[3]);
            return { display: `${a} × ${b}`, answer: a * b };
        }
    },
    {
        id: 'longdivision', name: 'Long Division', emoji: '➗',
        generate(d) {
            const maxDiv = { easy: 5, normal: 9, medium: 12, hard: 15 }[d];
            const b = rand(2, maxDiv);
            const q = rand(10, { easy: 20, normal: 40, medium: 60, hard: 99 }[d]);
            return { display: `${b * q} ÷ ${b}`, answer: q };
        }
    },
    {
        id: 'equivfractions', name: 'Equivalent Fractions', emoji: '🍕',
        generate(d) {
            const pairs = {
                easy: [{ d1: 2, d2: 4 }, { d1: 2, d2: 6 }],
                normal: [{ d1: 3, d2: 6 }, { d1: 4, d2: 8 }, { d1: 2, d2: 10 }],
                medium: [{ d1: 3, d2: 9 }, { d1: 4, d2: 12 }, { d1: 5, d2: 10 }],
                hard: [{ d1: 3, d2: 12 }, { d1: 5, d2: 15 }, { d1: 6, d2: 18 }],
            }[d];
            const { d1, d2 } = pick(pairs);
            const n1 = rand(1, d1 - 1);
            return { display: `${n1}/${d1} = ?/${d2}`, answer: n1 * (d2 / d1) };
        }
    },
    {
        id: 'addfractions', name: 'Adding Fractions', emoji: '➕',
        generate(d) {
            const denom = { easy: 4, normal: 6, medium: 8, hard: 12 }[d];
            const a = rand(1, denom - 1), b = rand(1, denom - 1);
            const sum = a + b;
            const g = gcd(sum, denom);
            const sNum = sum / g, sDen = denom / g;
            if (sNum >= sDen) {
                const whole = Math.floor(sNum / sDen);
                return { display: `${a}/${denom} + ${b}/${denom} = ? (whole number part)`, answer: whole };
            }
            return { display: `${a}/${denom} + ${b}/${denom} = ?/${sDen} (numerator?)`, answer: sNum };
        }
    },
    {
        id: 'area', name: 'Area & Perimeter', emoji: '📐',
        generate(d) {
            const max = { easy: 6, normal: 10, medium: 15, hard: 20 }[d];
            const l = rand(2, max), w = rand(2, max);
            const r = rand(0, 1);
            if (r === 0) return { display: `Area of rectangle: ${l} × ${w}`, answer: l * w };
            return { display: `Perimeter of rectangle: L=${l}, W=${w}`, answer: 2 * (l + w) };
        }
    },
    {
        id: 'angles', name: 'Angles', emoji: '📏',
        generate(d) {
            const a1 = rand(20, 80), a2 = rand(20, 80);
            const a3 = 180 - a1 - a2;
            if (a3 <= 0) return { display: `Triangle angles: 60° + 70° + ?° = 180°`, answer: 50 };
            return { display: `Triangle angles: ${a1}° + ${a2}° + ?° = 180°`, answer: a3 };
        }
    },
    {
        id: 'factors', name: 'Factors & Multiples', emoji: '🔢',
        generate(d) {
            if (d === 'easy' || d === 'normal') {
                const n = pick([2, 3, 4, 5]);
                const m = rand(1, { easy: 5, normal: 10 }[d]);
                return { display: `What is ${n} × ${m}? (multiple of ${n})`, answer: n * m };
            }
            const sets = [[12, 18, 6], [8, 12, 4], [15, 25, 5], [20, 30, 10], [14, 21, 7], [9, 12, 3]];
            const [a, b, ans] = pick(sets);
            return { display: `GCF of ${a} and ${b}?`, answer: ans };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 5
// ═══════════════════════════════════════════════════════════════
const grade5Topics = [
    {
        id: 'multfractions', name: 'Multiplying Fractions', emoji: '✖️',
        generate(d) {
            const max = { easy: 3, normal: 5, medium: 7, hard: 10 }[d];
            // Re-roll until we get a non-trivial fraction (answer > 1, denominator > 1)
            for (let tries = 0; tries < 20; tries++) {
                const n1 = rand(1, max), d1 = rand(n1 + 1, max + 2);
                const n2 = rand(1, max), d2 = rand(n2 + 1, max + 2);
                const resN = n1 * n2, resD = d1 * d2;
                const g = gcd(resN, resD);
                const simpN = resN / g, simpD = resD / g;
                // Skip if answer simplifies to 1/1, or to a whole number, or numerator is 1
                if (simpN <= 1 || simpD <= 1) continue;
                return { display: `${n1}/${d1} × ${n2}/${d2} = ?/${simpD} (numerator?)`, answer: simpN };
            }
            // Fallback safe problem
            return { display: `2/3 × 4/5 = ?/15 (numerator?)`, answer: 8 };
        }
    },
    {
        id: 'divfractions', name: 'Dividing Fractions', emoji: '➗',
        generate(d) {
            const max = { easy: 3, normal: 4, medium: 6, hard: 8 }[d];
            for (let tries = 0; tries < 20; tries++) {
                const n1 = rand(1, max), d1 = rand(2, max + 1);
                const n2 = rand(1, max), d2 = rand(2, max + 1);
                const resN = n1 * d2, resD = d1 * n2;
                const g = gcd(resN, resD);
                const simpN = resN / g, simpD = resD / g;
                if (simpN <= 1 || simpD <= 1) continue;
                return { display: `${n1}/${d1} ÷ ${n2}/${d2} = ?/${simpD} (numerator?)`, answer: simpN };
            }
            return { display: `2/3 ÷ 4/5 = ?/6 (numerator?)`, answer: 5 };
        }
    },
    {
        id: 'adddecimals', name: 'Adding Decimals', emoji: '➕',
        generate(d) {
            const max = { easy: 5, normal: 10, medium: 50, hard: 100 }[d];
            const a = +(rand(1, max * 10) / 10).toFixed(1);
            const b = +(rand(1, max * 10) / 10).toFixed(1);
            return { display: `${a} + ${b}`, answer: +(a + b).toFixed(1) };
        }
    },
    {
        id: 'subdecimals', name: 'Subtracting Decimals', emoji: '➖',
        generate(d) {
            const max = { easy: 5, normal: 10, medium: 50, hard: 100 }[d];
            let a = +(rand(1, max * 10) / 10).toFixed(1);
            let b = +(rand(1, max * 10) / 10).toFixed(1);
            if (a < b) [a, b] = [b, a];
            return { display: `${a} − ${b}`, answer: +(a - b).toFixed(1) };
        }
    },
    {
        id: 'multdecimals', name: 'Multiplying Decimals', emoji: '✖️',
        generate(d) {
            const a = rand(1, { easy: 5, normal: 9, medium: 15, hard: 25 }[d]);
            const b = { easy: 0.1, normal: pick([0.1, 0.2]), medium: pick([0.1, 0.5, 0.2]), hard: pick([0.3, 0.4, 0.6]) }[d];
            return { display: `${a} × ${b}`, answer: +(a * b).toFixed(1) };
        }
    },
    {
        id: 'orderops', name: 'Order of Operations', emoji: '📋',
        generate(d) {
            if (d === 'easy') {
                const a = rand(1, 5), b = rand(1, 5), c = rand(1, 5);
                return { display: `${a} + ${b} × ${c}`, answer: a + b * c };
            }
            if (d === 'normal') {
                const a = rand(1, 8), b = rand(1, 5), c = rand(1, 8);
                return { display: `${a} + ${b} × ${c}`, answer: a + b * c };
            }
            if (d === 'medium') {
                const a = rand(2, 6), b = rand(1, 5), c = rand(1, 10);
                return { display: `${a} × ${b} + ${c}`, answer: a * b + c };
            }
            const a = rand(1, 10), b = rand(1, 5), c = rand(1, 5), dd = rand(1, 5);
            return { display: `${a} + ${b} × ${c} − ${dd}`, answer: a + b * c - dd };
        }
    },
    {
        id: 'volume', name: 'Volume', emoji: '📦',
        generate(d) {
            const max = { easy: 5, normal: 8, medium: 10, hard: 15 }[d];
            const l = rand(2, max), w = rand(2, max), h = rand(2, max);
            return { display: `Volume of box: ${l} × ${w} × ${h}`, answer: l * w * h };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 6
// ═══════════════════════════════════════════════════════════════
const grade6Topics = [
    {
        id: 'ratios', name: 'Ratios & Rates', emoji: '⚖️',
        generate(d) {
            const items = rand(2, { easy: 5, normal: 8, medium: 12, hard: 20 }[d]);
            const rate = rand(2, { easy: 5, normal: 8, medium: 10, hard: 15 }[d]);
            return { display: `${items} items cost $${items * rate}. Price per item?`, answer: rate };
        }
    },
    {
        id: 'percent', name: 'Percent of a Number', emoji: '%',
        generate(d) {
            const pcts = { easy: [10, 50], normal: [10, 20, 25, 50], medium: [10, 20, 25, 50, 75], hard: [5, 10, 15, 20, 25, 30, 50, 75] }[d];
            const nums = { easy: [20, 50, 100], normal: [40, 60, 80, 100], medium: [60, 80, 120, 200], hard: [80, 120, 200, 250, 500] }[d];
            const p = pick(pcts), n = pick(nums);
            return { display: `${p}% of ${n} = ?`, answer: (p / 100) * n };
        }
    },
    {
        id: 'integers', name: 'Integer Operations', emoji: '🔢',
        generate(d) {
            const range = { easy: 10, normal: 15, medium: 20, hard: 30 }[d];
            const a = rand(-range, range), b = rand(-range, range);
            const op = pick(['+', '−']);
            return { display: `(${a}) ${op} (${b})`, answer: op === '+' ? a + b : a - b };
        }
    },
    {
        id: 'expressions', name: 'Evaluating Expressions', emoji: '🔤',
        generate(d) {
            const x = rand(1, { easy: 5, normal: 8, medium: 10, hard: 12 }[d]);
            const a = rand(2, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            const b = rand(1, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            return { display: `If x = ${x}, what is ${a}x + ${b}?`, answer: a * x + b };
        }
    },
    {
        id: 'areatriangle', name: 'Area of Triangles', emoji: '📐',
        generate(d) {
            const max = { easy: 6, normal: 10, medium: 16, hard: 24 }[d];
            const base = rand(2, max) * 2, height = rand(2, max);
            return { display: `Area of triangle: base=${base}, height=${height}`, answer: (base * height) / 2 };
        }
    },
    {
        id: 'onestepeq', name: 'One-step Equations', emoji: '🔍',
        generate(d) {
            const x = rand(1, { easy: 10, normal: 15, medium: 20, hard: 30 }[d]);
            const b = rand(1, { easy: 10, normal: 15, medium: 20, hard: 30 }[d]);
            const r = rand(0, 1);
            if (r === 0) return { display: `x + ${b} = ${x + b}, x = ?`, answer: x };
            return { display: `x − ${b} = ${x - b}, x = ?`, answer: x };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 7
// ═══════════════════════════════════════════════════════════════
const grade7Topics = [
    {
        id: 'proportions', name: 'Proportions', emoji: '⚖️',
        generate(d) {
            const d1 = pick({ easy: [2, 3], normal: [2, 3, 4], medium: [3, 4, 5], hard: [4, 5, 6, 7] }[d]);
            const n1 = rand(1, d1 - 1);
            const mult = rand(2, { easy: 3, normal: 4, medium: 5, hard: 6 }[d]);
            return { display: `${n1}/${d1} = ?/${d1 * mult}`, answer: n1 * mult };
        }
    },
    {
        id: 'percentchange', name: 'Percent Change', emoji: '📊',
        generate(d) {
            const originals = { easy: [50, 100], normal: [50, 80, 100], medium: [80, 100, 120, 200], hard: [100, 150, 200, 250] }[d];
            const pcts = { easy: [10, 50], normal: [10, 20, 25], medium: [10, 20, 25, 50], hard: [5, 15, 20, 25, 40] }[d];
            const orig = pick(originals), pct = pick(pcts);
            const dir = pick(['increase', 'decrease']);
            const change = (pct / 100) * orig;
            return { display: `${orig} ${dir}d by ${pct}% = ?`, answer: dir === 'increase' ? orig + change : orig - change };
        }
    },
    {
        id: 'rationalnums', name: 'Rational Number Operations', emoji: '🔢',
        generate(d) {
            const range = { easy: 10, normal: 15, medium: 20, hard: 30 }[d];
            const a = rand(-range, range), b = rand(-range, range);
            const op = pick(['+', '−', '×']);
            if (op === '×') return { display: `(${a}) × (${b})`, answer: a * b };
            return { display: `(${a}) ${op} (${b})`, answer: op === '+' ? a + b : a - b };
        }
    },
    {
        id: 'twostepeq', name: 'Two-step Equations', emoji: '🔍',
        generate(d) {
            const x = rand(1, { easy: 5, normal: 8, medium: 10, hard: 15 }[d]);
            const a = rand(2, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            const b = rand(1, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            return { display: `${a}x + ${b} = ${a * x + b}, x = ?`, answer: x };
        }
    },
    {
        id: 'circumference', name: 'Circumference', emoji: '⭕',
        generate(d) {
            const r = rand(1, { easy: 5, normal: 8, medium: 12, hard: 20 }[d]);
            return { display: `Circumference: r=${r} (use π≈3.14, round to whole)`, answer: Math.round(2 * 3.14 * r) };
        }
    },
    {
        id: 'areacircle', name: 'Area of Circles', emoji: '🔵',
        generate(d) {
            const r = rand(1, { easy: 3, normal: 5, medium: 7, hard: 10 }[d]);
            return { display: `Area of circle: r=${r} (use π≈3.14, round to whole)`, answer: Math.round(3.14 * r * r) };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 8
// ═══════════════════════════════════════════════════════════════
const grade8Topics = [
    {
        id: 'lineareq', name: 'Linear Equations', emoji: '📈',
        generate(d) {
            const x = rand(1, { easy: 5, normal: 8, medium: 10, hard: 15 }[d]);
            const a = rand(2, { easy: 4, normal: 6, medium: 8, hard: 10 }[d]);
            const b = rand(1, { easy: 10, normal: 15, medium: 20, hard: 30 }[d]);
            return { display: `${a}x + ${b} = ${a * x + b}, x = ?`, answer: x };
        }
    },
    {
        id: 'slope', name: 'Slope', emoji: '📊',
        generate(d) {
            const x1 = rand(0, 5), y1 = rand(0, 5);
            const run = rand(1, { easy: 2, normal: 3, medium: 4, hard: 5 }[d]);
            const rise = run * rand(1, { easy: 2, normal: 3, medium: 4, hard: 5 }[d]);
            return { display: `Slope: (${x1},${y1}) to (${x1 + run},${y1 + rise})`, answer: rise / run };
        }
    },
    {
        id: 'pythag', name: 'Pythagorean Theorem', emoji: '📐',
        generate(d) {
            const triples = { easy: [[3, 4, 5]], normal: [[3, 4, 5], [6, 8, 10]], medium: [[5, 12, 13], [6, 8, 10]], hard: [[8, 15, 17], [9, 12, 15], [5, 12, 13]] }[d];
            const [a, b, c] = pick(triples);
            return rand(0, 1) === 0
                ? { display: `Right △: a=${a}, b=${b}, c=?`, answer: c }
                : { display: `Right △: a=${a}, c=${c}, b=?`, answer: b };
        }
    },
    {
        id: 'exponents', name: 'Exponents', emoji: '🔢',
        generate(d) {
            const base = rand(2, { easy: 5, normal: 7, medium: 9, hard: 12 }[d]);
            const exp = { easy: 2, normal: pick([2, 3]), medium: pick([2, 3]), hard: rand(2, 4) }[d];
            return { display: `${base}^${exp} = ?`, answer: Math.pow(base, exp) };
        }
    },
    {
        id: 'sqroots', name: 'Square Roots', emoji: '√',
        generate(d) {
            const perfects = { easy: [4, 9, 16, 25], normal: [4, 9, 16, 25, 36, 49], medium: [36, 49, 64, 81, 100], hard: [64, 81, 100, 121, 144, 169] }[d];
            const n = pick(perfects);
            return { display: `√${n} = ?`, answer: Math.round(Math.sqrt(n)) };
        }
    },
    {
        id: 'scinotation', name: 'Scientific Notation', emoji: '🔬',
        generate(d) {
            const coeff = rand(1, 9);
            const exp = rand(1, { easy: 3, normal: 4, medium: 6, hard: 8 }[d]);
            return { display: `${coeff} × 10^${exp} = ? (full number)`, answer: coeff * Math.pow(10, exp) };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 9  (Algebra 1)
// ═══════════════════════════════════════════════════════════════
const grade9Topics = [
    {
        id: 'multistepeq', name: 'Multi-step Equations', emoji: '🔍',
        generate(d) {
            const x = rand(1, { easy: 5, normal: 8, medium: 12, hard: 15 }[d]);
            const a = rand(2, { easy: 4, normal: 6, medium: 8, hard: 10 }[d]);
            const b = rand(1, { easy: 10, normal: 15, medium: 20, hard: 30 }[d]);
            return { display: `${a}x + ${b} = ${a * x + b}, x = ?`, answer: x };
        }
    },
    {
        id: 'inequalities', name: 'Inequalities', emoji: '⚖️',
        generate(d) {
            const x = rand(1, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            const a = rand(2, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            const b = rand(1, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            return { display: `${a}x + ${b} > ${a * x + b}, x > ?`, answer: x };
        }
    },
    {
        id: 'polyadd', name: 'Adding Polynomials', emoji: '➕',
        generate(d) {
            const a = rand(1, { easy: 3, normal: 5, medium: 8, hard: 10 }[d]);
            const b = rand(1, { easy: 3, normal: 5, medium: 8, hard: 10 }[d]);
            return { display: `(${a}x + 3) + (${b}x + 2) → coefficient of x?`, answer: a + b };
        }
    },
    {
        id: 'polymult', name: 'Multiplying Polynomials', emoji: '✖️',
        generate(d) {
            const a = rand(1, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            const b = rand(1, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            return { display: `(x+${a})(x+${b}) → coefficient of x?`, answer: a + b };
        }
    },
    {
        id: 'factoring', name: 'Factoring', emoji: '🧩',
        generate(d) {
            const a = rand(1, { easy: 4, normal: 6, medium: 8, hard: 12 }[d]);
            const b = rand(1, { easy: 4, normal: 6, medium: 8, hard: 12 }[d]);
            const sum = a + b, prod = a * b;
            return { display: `x² + ${sum}x + ${prod} = (x+?)(x+${b})`, answer: a };
        }
    },
    {
        id: 'functions', name: 'Functions', emoji: '📈',
        generate(d) {
            const x = rand(1, { easy: 3, normal: 5, medium: 7, hard: 10 }[d]);
            const a = rand(1, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            const b = rand(0, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            return { display: `f(x) = ${a}x + ${b}, f(${x}) = ?`, answer: a * x + b };
        }
    },
    {
        id: 'quadbasics', name: 'Quadratic Basics', emoji: '📉',
        generate(d) {
            const x = rand(1, { easy: 5, normal: 7, medium: 10, hard: 12 }[d]);
            return { display: `x² = ${x * x}, x = ? (positive)`, answer: x };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 10  (Geometry / Algebra 2)
// ═══════════════════════════════════════════════════════════════
const grade10Topics = [
    {
        id: 'quadratic', name: 'Quadratic Equations', emoji: '📉',
        generate(d) {
            const x = rand(2, { easy: 6, normal: 9, medium: 12, hard: 15 }[d]);
            return { display: `x² = ${x * x}, x = ? (positive)`, answer: x };
        }
    },
    {
        id: 'radicals', name: 'Radicals & Roots', emoji: '√',
        generate(d) {
            const perfects = { easy: [4, 9, 16, 25], normal: [25, 36, 49, 64], medium: [81, 100, 121, 144], hard: [144, 169, 196, 225, 256] }[d];
            const n = pick(perfects);
            return { display: `√${n} = ?`, answer: Math.round(Math.sqrt(n)) };
        }
    },
    {
        id: 'arithseq', name: 'Arithmetic Sequences', emoji: '🔢',
        generate(d) {
            const a1 = rand(1, 10), dd = rand(2, { easy: 3, normal: 5, medium: 7, hard: 10 }[d]);
            const n = rand(3, { easy: 5, normal: 7, medium: 10, hard: 15 }[d]);
            return { display: `a₁=${a1}, d=${dd}, find a${n}`, answer: a1 + (n - 1) * dd };
        }
    },
    {
        id: 'geomseq', name: 'Geometric Sequences', emoji: '📊',
        generate(d) {
            const a1 = rand(1, { easy: 3, normal: 5, medium: 5, hard: 5 }[d]);
            const r = pick({ easy: [2], normal: [2, 3], medium: [2, 3], hard: [2, 3, 4] }[d]);
            const n = { easy: 3, normal: 4, medium: 4, hard: 5 }[d];
            return { display: `a₁=${a1}, r=${r}, find a${n}`, answer: a1 * Math.pow(r, n - 1) };
        }
    },
    {
        id: 'trig', name: 'Basic Trigonometry', emoji: '📐',
        generate(d) {
            const triples = { easy: [[3, 4, 5]], normal: [[3, 4, 5], [6, 8, 10]], medium: [[5, 12, 13]], hard: [[8, 15, 17]] }[d];
            const [opp, adj, hyp] = pick(triples);
            const r = rand(0, 1);
            if (r === 0) return { display: `sin = opp/hyp: opp=${opp}, hyp=${hyp} → numerator?`, answer: opp };
            return { display: `cos = adj/hyp: adj=${adj}, hyp=${hyp} → numerator?`, answer: adj };
        }
    },
    {
        id: 'rationalexpr', name: 'Rational Expressions', emoji: '🔤',
        generate(d) {
            // Simplify (ax)/(bx) = a/b
            const a = rand(2, { easy: 5, normal: 8, medium: 12, hard: 15 }[d]);
            const b = rand(2, { easy: 5, normal: 8, medium: 12, hard: 15 }[d]);
            const g = gcd(a, b);
            return { display: `Simplify ${a}/${b} → numerator? (simplified)`, answer: a / g };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 11  (Pre-Calculus)
// ═══════════════════════════════════════════════════════════════
const grade11Topics = [
    {
        id: 'logarithms', name: 'Logarithms', emoji: '📊',
        generate(d) {
            const bases = { easy: [2, 10], normal: [2, 3, 10], medium: [2, 3, 5], hard: [2, 3, 4, 5] }[d];
            const b = pick(bases);
            const exp = rand(1, { easy: 3, normal: 4, medium: 5, hard: 6 }[d]);
            return { display: `log base ${b} of ${Math.pow(b, exp)} = ?`, answer: exp };
        }
    },
    {
        id: 'trigidentities', name: 'Trig Identities', emoji: '📐',
        generate(d) {
            if (d === 'easy') return { display: `sin²θ + cos²θ = ?`, answer: 1 };
            if (d === 'normal') return { display: `tan(45°) = ?`, answer: 1 };
            if (d === 'medium') return { display: `sin(30°) = 1/? (denominator)`, answer: 2 };
            return { display: `cos(60°) = 1/? (denominator)`, answer: 2 };
        }
    },
    {
        id: 'permutations', name: 'Permutations & Combinations', emoji: '🎲',
        generate(d) {
            const n = rand(3, { easy: 5, normal: 7, medium: 9, hard: 12 }[d]);
            const r = rand(0, 1);
            if (r === 0) return { display: `P(${n}, 2) = ?`, answer: n * (n - 1) };
            return { display: `C(${n}, 2) = ?`, answer: (n * (n - 1)) / 2 };
        }
    },
    {
        id: 'conics', name: 'Conic Sections', emoji: '⭕',
        generate(d) {
            const r = rand(1, { easy: 5, normal: 8, medium: 10, hard: 15 }[d]);
            return { display: `Circle: x² + y² = ${r * r}, radius = ?`, answer: r };
        }
    },
    {
        id: 'polydiv', name: 'Polynomial Division', emoji: '➗',
        generate(d) {
            // (x² + bx + c) ÷ (x + a) where c = a*k and b = a+k
            const a = rand(1, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            const k = rand(1, { easy: 3, normal: 5, medium: 7, hard: 9 }[d]);
            return { display: `(x²+${a + k}x+${a * k}) ÷ (x+${a}) → (x+?)`, answer: k };
        }
    },
    {
        id: 'expfunctions', name: 'Exponential Functions', emoji: '📈',
        generate(d) {
            const base = rand(2, { easy: 3, normal: 4, medium: 5, hard: 6 }[d]);
            const exp = rand(1, { easy: 3, normal: 4, medium: 5, hard: 6 }[d]);
            return { display: `${base}^${exp} = ?`, answer: Math.pow(base, exp) };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE 12  (Calculus)
// ═══════════════════════════════════════════════════════════════
const grade12Topics = [
    {
        id: 'limits', name: 'Limits', emoji: '🎯',
        generate(d) {
            const a = rand(1, { easy: 5, normal: 8, medium: 10, hard: 15 }[d]);
            return { display: `lim(x→${a}) (x²−${a * a})/(x−${a}) = ?`, answer: 2 * a };
        }
    },
    {
        id: 'derivatives', name: 'Derivatives', emoji: '📉',
        generate(d) {
            const a = rand(1, { easy: 3, normal: 5, medium: 7, hard: 10 }[d]);
            const n = { easy: 2, normal: rand(2, 3), medium: rand(2, 4), hard: rand(2, 5) }[d];
            return { display: `d/dx [${a}x^${n}] at x=1 = ?`, answer: a * n };
        }
    },
    {
        id: 'integrals', name: 'Integrals', emoji: '∫',
        generate(d) {
            const n = { easy: 1, normal: 2, medium: 3, hard: rand(1, 4) }[d];
            const coeff = n + 1;
            return { display: `∫₀¹ ${coeff}x^${n} dx = ?`, answer: 1 };
        }
    },
    {
        id: 'matrices', name: 'Matrices (determinant)', emoji: '🔢',
        generate(d) {
            const max = { easy: 4, normal: 6, medium: 8, hard: 10 }[d];
            const a = rand(1, max), b = rand(1, max), c = rand(1, max), dd = rand(1, max);
            return { display: `det |${a} ${b}| / |${c} ${dd}| = ?`, answer: a * dd - b * c };
        }
    },
    {
        id: 'complexnums', name: 'Complex Numbers', emoji: '💫',
        generate(d) {
            // (a+bi) + (c+di), give real part
            const a = rand(1, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            const c = rand(1, { easy: 5, normal: 10, medium: 15, hard: 20 }[d]);
            const b = rand(1, 5), dd = rand(1, 5);
            return { display: `(${a}+${b}i) + (${c}+${dd}i) → real part?`, answer: a + c };
        }
    },
    {
        id: 'powerrule', name: 'Power Rule', emoji: '📋',
        generate(d) {
            const a = rand(1, { easy: 3, normal: 5, medium: 8, hard: 10 }[d]);
            const n = rand(2, { easy: 3, normal: 4, medium: 5, hard: 6 }[d]);
            return { display: `Derivative of ${a}x^${n} → new coefficient?`, answer: a * n };
        }
    },
];

// ═══════════════════════════════════════════════════════════════
//  GRADE CONFIGS — master object
// ═══════════════════════════════════════════════════════════════
const gradeColors = [
    'var(--primary)', '#00b894', 'var(--secondary)', '#6c5ce7', '#e17055',
    'var(--warning)', '#d63031', '#e84393', '#fd79a8', 'var(--accent)', '#00cec9', '#ffeaa7',
];

export const gradeConfigs = {
    '1': { name: 'Grade 1', emoji: '🌟', color: gradeColors[0], timer: 8, duration: 60, topics: grade1Topics },
    '2': { name: 'Grade 2', emoji: '⭐', color: gradeColors[1], timer: 7, duration: 60, topics: grade2Topics },
    '3': { name: 'Grade 3', emoji: '🚀', color: gradeColors[2], timer: 6, duration: 90, topics: grade3Topics },
    '4': { name: 'Grade 4', emoji: '💫', color: gradeColors[3], timer: 6, duration: 120, topics: grade4Topics },
    '5': { name: 'Grade 5', emoji: '🔥', color: gradeColors[4], timer: 7, duration: 120, topics: grade5Topics },
    '6': { name: 'Grade 6', emoji: '⚡', color: gradeColors[5], timer: 8, duration: 150, topics: grade6Topics },
    '7': { name: 'Grade 7', emoji: '🎯', color: gradeColors[6], timer: 8, duration: 180, topics: grade7Topics },
    '8': { name: 'Grade 8', emoji: '🧠', color: gradeColors[7], timer: 9, duration: 210, topics: grade8Topics },
    '9': { name: 'Grade 9', emoji: '🏅', color: gradeColors[8], timer: 10, duration: 240, topics: grade9Topics },
    '10': { name: 'Grade 10', emoji: '🏆', color: gradeColors[9], timer: 10, duration: 270, topics: grade10Topics },
    '11': { name: 'Grade 11', emoji: '🎓', color: gradeColors[10], timer: 12, duration: 300, topics: grade11Topics },
    '12': { name: 'Grade 12', emoji: '👑', color: gradeColors[11], timer: 15, duration: 300, topics: grade12Topics },
};

// ───── Master generator (for PvB / PvP: picks random topic + difficulty) ─────
export function generateProblem(grade, topicId, difficulty) {
    const config = gradeConfigs[grade];
    if (!config) throw new Error(`Unknown grade: ${grade}`);

    // If topicId given, use that specific topic
    if (topicId) {
        const topic = config.topics.find(t => t.id === topicId);
        if (!topic) throw new Error(`Unknown topic: ${topicId}`);
        const diff = difficulty || pick(['easy', 'normal', 'medium', 'hard']);
        return topic.generate(diff);
    }

    // Otherwise pick random topic + difficulty (for PvB/PvP)
    const topic = pick(config.topics);
    const diff = difficulty || pick(['easy', 'normal', 'medium', 'hard']);
    return topic.generate(diff);
}
