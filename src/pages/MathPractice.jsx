import React, { useState } from 'react';
import { Check, X, RefreshCw, ArrowLeft } from 'lucide-react';

// Grade configurations with appropriate math topics for each grade
const gradeConfigs = {
    '1-2': {
        name: 'Grades 1-2',
        emoji: '🌟',
        topics: 'Addition & Subtraction',
        difficulties: {
            easy: { label: 'Easy', desc: 'Numbers 1-10', maxNum: 10, operators: ['+', '-'] },
            normal: { label: 'Normal', desc: 'Numbers 1-20', maxNum: 20, operators: ['+', '-'] },
            medium: { label: 'Medium', desc: 'Numbers 1-50', maxNum: 50, operators: ['+', '-'] },
            hard: { label: 'Hard', desc: 'Numbers 1-100', maxNum: 100, operators: ['+', '-'] }
        }
    },
    '3-5': {
        name: 'Grades 3-5',
        emoji: '🚀',
        topics: 'Multiplication & Division',
        difficulties: {
            easy: { label: 'Easy', desc: 'Times tables 1-5', maxMult: 5, operators: ['×', '÷'] },
            normal: { label: 'Normal', desc: 'Times tables 1-10', maxMult: 10, operators: ['×', '÷'] },
            medium: { label: 'Medium', desc: 'Times tables 1-12', maxMult: 12, operators: ['×', '÷'] },
            hard: { label: 'Hard', desc: 'Big times tables', maxMult: 15, operators: ['×', '÷'] }
        }
    },
    '6-9': {
        name: 'Grades 6-9',
        emoji: '🔥',
        topics: 'Integers, Fractions, Algebra',
        difficulties: {
            easy: { label: 'Easy', desc: 'Negative numbers', type: 'integers', range: 20 },
            normal: { label: 'Normal', desc: 'Order of operations', type: 'orderOps' },
            medium: { label: 'Medium', desc: 'Solve for X (basic)', type: 'algebra', level: 1 },
            hard: { label: 'Hard', desc: 'Solve for X (harder)', type: 'algebra', level: 2 }
        }
    },
    '10-12': {
        name: 'Grades 10-12',
        emoji: '🏆',
        topics: 'Advanced Algebra & Functions',
        difficulties: {
            easy: { label: 'Easy', desc: 'Linear equations', type: 'linear' },
            normal: { label: 'Normal', desc: 'Quadratic (find roots)', type: 'quadratic' },
            medium: { label: 'Medium', desc: 'Exponents & Powers', type: 'exponents' },
            hard: { label: 'Hard', desc: 'Mixed advanced', type: 'mixed' }
        }
    }
};

const MathPractice = () => {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [problem, setProblem] = useState({ display: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    // Generate problem based on grade and difficulty
    const generateProblem = (grade, difficulty) => {
        const config = gradeConfigs[grade].difficulties[difficulty];
        let display, answer;

        if (grade === '1-2') {
            // Simple addition/subtraction
            const op = config.operators[Math.floor(Math.random() * config.operators.length)];
            let n1 = Math.floor(Math.random() * config.maxNum) + 1;
            let n2 = Math.floor(Math.random() * config.maxNum) + 1;
            if (op === '-' && n1 < n2) [n1, n2] = [n2, n1];
            display = `${n1} ${op} ${n2}`;
            answer = op === '+' ? n1 + n2 : n1 - n2;
        }
        else if (grade === '3-5') {
            // Times tables only
            const op = config.operators[Math.floor(Math.random() * config.operators.length)];
            const n1 = Math.floor(Math.random() * config.maxMult) + 1;
            const n2 = Math.floor(Math.random() * config.maxMult) + 1;
            if (op === '×') {
                display = `${n1} × ${n2}`;
                answer = n1 * n2;
            } else {
                const product = n1 * n2;
                display = `${product} ÷ ${n1}`;
                answer = n2;
            }
        }
        else if (grade === '6-9') {
            if (config.type === 'integers') {
                // Negative number operations
                const n1 = Math.floor(Math.random() * config.range * 2) - config.range;
                const n2 = Math.floor(Math.random() * config.range * 2) - config.range;
                const op = ['+', '-'][Math.floor(Math.random() * 2)];
                display = `(${n1}) ${op} (${n2})`;
                answer = op === '+' ? n1 + n2 : n1 - n2;
            } else if (config.type === 'orderOps') {
                // Order of operations
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 5) + 1;
                const c = Math.floor(Math.random() * 10) + 1;
                display = `${a} + ${b} × ${c}`;
                answer = a + (b * c);
            } else if (config.type === 'algebra') {
                // Solve for X
                const x = Math.floor(Math.random() * 10) + 1;
                const a = Math.floor(Math.random() * 5) + 2;
                if (config.level === 1) {
                    const result = a * x;
                    display = `${a}x = ${result}, x = ?`;
                    answer = x;
                } else {
                    const b = Math.floor(Math.random() * 10) + 1;
                    const result = a * x + b;
                    display = `${a}x + ${b} = ${result}, x = ?`;
                    answer = x;
                }
            }
        }
        else if (grade === '10-12') {
            if (config.type === 'linear') {
                // Linear equation: ax + b = c
                const x = Math.floor(Math.random() * 10) + 1;
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 20) - 10;
                const c = a * x + b;
                display = `${a}x + (${b}) = ${c}, x = ?`;
                answer = x;
            } else if (config.type === 'quadratic') {
                // Simple quadratic: x² = n (perfect squares)
                const x = Math.floor(Math.random() * 10) + 2;
                const n = x * x;
                display = `x² = ${n}, x = ? (positive)`;
                answer = x;
            } else if (config.type === 'exponents') {
                // Powers
                const base = Math.floor(Math.random() * 5) + 2;
                const exp = Math.floor(Math.random() * 3) + 2;
                display = `${base}^${exp} = ?`;
                answer = Math.pow(base, exp);
            } else {
                // Mixed - randomly pick a type and generate inline
                const rand = Math.floor(Math.random() * 3);
                if (rand === 0) {
                    // Linear
                    const x = Math.floor(Math.random() * 10) + 1;
                    const a = Math.floor(Math.random() * 5) + 2;
                    const b = Math.floor(Math.random() * 20) - 10;
                    const c = a * x + b;
                    display = `${a}x + (${b}) = ${c}, x = ?`;
                    answer = x;
                } else if (rand === 1) {
                    // Quadratic
                    const x = Math.floor(Math.random() * 10) + 2;
                    const n = x * x;
                    display = `x² = ${n}, x = ? (positive)`;
                    answer = x;
                } else {
                    // Exponents
                    const base = Math.floor(Math.random() * 5) + 2;
                    const exp = Math.floor(Math.random() * 3) + 2;
                    display = `${base}^${exp} = ?`;
                    answer = Math.pow(base, exp);
                }
            }
        }

        setProblem({ display, answer });
        setUserAnswer('');
        setFeedback(null);
    };

    const selectDifficulty = (diff) => {
        setSelectedDifficulty(diff);
        setScore(0);
        generateProblem(selectedGrade, diff);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === problem.answer) {
            setScore(score + 10);
            setFeedback('correct');
        } else {
            setScore(Math.max(0, score - 10));
            setFeedback('incorrect');
        }
        setTimeout(() => generateProblem(selectedGrade, selectedDifficulty), 1000);
    };

    const goBack = () => {
        if (selectedDifficulty) {
            setSelectedDifficulty(null);
            setScore(0);
        } else {
            setSelectedGrade(null);
        }
    };

    // Grade Selection Screen
    if (!selectedGrade) {
        return (
            <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Choose Your Grade</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Select your grade level</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedGrade(key)}
                            className="grade-card"
                            style={{
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '2px solid var(--glass-border)',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{config.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.2rem' }}>{config.name}</div>
                            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{config.topics}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Difficulty Selection Screen
    if (!selectedDifficulty) {
        const grade = gradeConfigs[selectedGrade];
        return (
            <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <ArrowLeft size={20} /> Back to Grades
                </button>

                <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{grade.emoji} {grade.name}</h2>
                <p style={{ color: 'var(--accent)', marginBottom: '2rem' }}>{grade.topics}</p>

                <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Choose Difficulty</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {Object.entries(grade.difficulties).map(([key, diff]) => (
                        <button
                            key={key}
                            onClick={() => selectDifficulty(key)}
                            style={{
                                padding: '1.5rem',
                                background: key === 'easy' ? 'rgba(74,222,128,0.1)' :
                                    key === 'normal' ? 'rgba(34,211,238,0.1)' :
                                        key === 'medium' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)',
                                border: `2px solid ${key === 'easy' ? '#4ade80' : key === 'normal' ? '#22d3ee' : key === 'medium' ? '#fbbf24' : '#f87171'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>{diff.label}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{diff.desc}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Practice Screen
    const grade = gradeConfigs[selectedGrade];
    const diff = grade.difficulties[selectedDifficulty];

    return (
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={goBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> Back
                </button>
                <div>
                    <span className="text-gradient" style={{ fontWeight: 'bold' }}>{grade.emoji} {grade.name}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>• {diff.label}</span>
                </div>
                <div style={{ background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    Score: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{score}</span>
                </div>
            </div>

            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'monospace', lineHeight: '1.4' }}>
                {problem.display}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your Answer"
                    className="input input-lg"
                    autoFocus
                />
                <button type="submit" className="btn-primary">
                    Check Answer
                </button>
            </form>

            {feedback && (
                <div className="animate-fade-in" style={{
                    marginTop: '2rem', fontSize: '1.5rem',
                    color: feedback === 'correct' ? '#4ade80' : '#f87171',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}>
                    {feedback === 'correct' ? <><Check /> Correct! +10 pts</> : <><X /> Try Again</>}
                </div>
            )}

            <button onClick={() => generateProblem(selectedGrade, selectedDifficulty)} style={{
                marginTop: '2rem', background: 'transparent', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '2rem auto 0'
            }}>
                <RefreshCw size={16} /> Skip Problem
            </button>
        </div>
    );
};

export default MathPractice;
