import React, { useState } from 'react';
import { Check, X, RefreshCw, ArrowLeft, Zap, Target } from 'lucide-react';

// Grade configurations with appropriate math topics for each grade
const gradeConfigs = {
    '1-2': {
        name: 'Grades 1-2',
        emoji: '🌟',
        topics: 'Addition & Subtraction',
        color: 'var(--primary)',
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
        color: 'var(--secondary)',
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
        color: 'var(--warning)',
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
        color: 'var(--accent)',
        difficulties: {
            easy: { label: 'Easy', desc: 'Linear equations', type: 'linear' },
            normal: { label: 'Normal', desc: 'Quadratic (find roots)', type: 'quadratic' },
            medium: { label: 'Medium', desc: 'Exponents & Powers', type: 'exponents' },
            hard: { label: 'Hard', desc: 'Mixed advanced', type: 'mixed' }
        }
    }
};

const difficultyColors = {
    easy: { bg: 'rgba(2, 183, 87, 0.15)', border: 'var(--primary)', shadow: 'var(--primary-glow)' },
    normal: { bg: 'rgba(0, 162, 255, 0.15)', border: 'var(--secondary)', shadow: 'var(--secondary-glow)' },
    medium: { bg: 'rgba(255, 179, 2, 0.15)', border: 'var(--warning)', shadow: 'rgba(255, 179, 2, 0.3)' },
    hard: { bg: 'rgba(255, 71, 87, 0.15)', border: 'var(--error)', shadow: 'rgba(255, 71, 87, 0.3)' }
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
            const op = config.operators[Math.floor(Math.random() * config.operators.length)];
            let n1 = Math.floor(Math.random() * config.maxNum) + 1;
            let n2 = Math.floor(Math.random() * config.maxNum) + 1;
            if (op === '-' && n1 < n2) [n1, n2] = [n2, n1];
            display = `${n1} ${op} ${n2}`;
            answer = op === '+' ? n1 + n2 : n1 - n2;
        }
        else if (grade === '3-5') {
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
                const n1 = Math.floor(Math.random() * config.range * 2) - config.range;
                const n2 = Math.floor(Math.random() * config.range * 2) - config.range;
                const op = ['+', '-'][Math.floor(Math.random() * 2)];
                display = `(${n1}) ${op} (${n2})`;
                answer = op === '+' ? n1 + n2 : n1 - n2;
            } else if (config.type === 'orderOps') {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 5) + 1;
                const c = Math.floor(Math.random() * 10) + 1;
                display = `${a} + ${b} × ${c}`;
                answer = a + (b * c);
            } else if (config.type === 'algebra') {
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
                const x = Math.floor(Math.random() * 10) + 1;
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 20) - 10;
                const c = a * x + b;
                display = `${a}x + (${b}) = ${c}, x = ?`;
                answer = x;
            } else if (config.type === 'quadratic') {
                const x = Math.floor(Math.random() * 10) + 2;
                const n = x * x;
                display = `x² = ${n}, x = ? (positive)`;
                answer = x;
            } else if (config.type === 'exponents') {
                const base = Math.floor(Math.random() * 5) + 2;
                const exp = Math.floor(Math.random() * 3) + 2;
                display = `${base}^${exp} = ?`;
                answer = Math.pow(base, exp);
            } else {
                const rand = Math.floor(Math.random() * 3);
                if (rand === 0) {
                    const x = Math.floor(Math.random() * 10) + 1;
                    const a = Math.floor(Math.random() * 5) + 2;
                    const b = Math.floor(Math.random() * 20) - 10;
                    const c = a * x + b;
                    display = `${a}x + (${b}) = ${c}, x = ?`;
                    answer = x;
                } else if (rand === 1) {
                    const x = Math.floor(Math.random() * 10) + 2;
                    const n = x * x;
                    display = `x² = ${n}, x = ? (positive)`;
                    answer = x;
                } else {
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

    const [scoreDiff, setScoreDiff] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === problem.answer) {
            setScore(score + 10);
            setFeedback('correct');
            setScoreDiff(10);
            setTimeout(() => setScoreDiff(null), 1000);
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
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Zap size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        <span className="text-gradient">Choose Your Grade</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Select your skill level</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedGrade(key)}
                            style={{
                                padding: '1.5rem 1rem',
                                background: 'var(--bg-darker)',
                                border: '3px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center',
                                boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = config.color;
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{config.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1.1rem', textTransform: 'uppercase' }}>{config.name}</div>
                            <div style={{ color: config.color, fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: '600' }}>{config.topics}</div>
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
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                    <ArrowLeft size={20} /> Back to Grades
                </button>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{grade.emoji}</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{grade.name}</h2>
                    <p style={{ color: grade.color, fontWeight: '600' }}>{grade.topics}</p>
                </div>

                <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase' }}>
                    <Target size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Select Difficulty
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {Object.entries(grade.difficulties).map(([key, diff]) => {
                        const colors = difficultyColors[key];
                        return (
                            <button
                                key={key}
                                onClick={() => selectDifficulty(key)}
                                style={{
                                    padding: '1.5rem',
                                    background: colors.bg,
                                    border: `3px solid ${colors.border}`,
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'center',
                                    boxShadow: `0 4px 0 rgba(0,0,0,0.3)`
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.boxShadow = `0 4px 0 rgba(0,0,0,0.3), 0 0 20px ${colors.shadow}`;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 0 rgba(0,0,0,0.3)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ color: colors.border, fontWeight: '700', fontSize: '1.2rem', textTransform: 'uppercase' }}>{diff.label}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{diff.desc}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Practice Screen
    const grade = gradeConfigs[selectedGrade];
    const diff = grade.difficulties[selectedDifficulty];
    const colors = difficultyColors[selectedDifficulty];

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <button onClick={goBack} className="btn-ghost" style={{ padding: '0.5rem 1rem' }}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--bg-darker)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid var(--border)'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>{grade.emoji}</span>
                    <span style={{ fontWeight: '600', color: colors.border, textTransform: 'uppercase' }}>{diff.label}</span>
                </div>
                <div style={{
                    background: 'var(--bg-darker)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid var(--accent)',
                    position: 'relative'
                }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>Score:</span>
                    <span className="score-display" style={{ fontSize: '1.5rem' }}>{score}</span>
                    {scoreDiff && (
                        <span className="animate-score" style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '0',
                            color: 'var(--success)',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            textShadow: '0 0 10px var(--success)'
                        }}>
                            +{scoreDiff}
                        </span>
                    )}
                </div>
            </div>

            <div style={{
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                fontWeight: '700',
                marginBottom: '2rem',
                fontFamily: 'monospace',
                lineHeight: '1.4',
                color: 'var(--text-main)',
                background: 'var(--bg-darker)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '3px solid var(--border)'
            }}>
                {problem.display}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '320px', margin: '0 auto' }}>
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your Answer"
                    className="input input-lg"
                    autoFocus
                    style={{ fontWeight: '700' }}
                />
                <button type="submit" className="btn-primary" style={{ fontSize: '1.2rem' }}>
                    <Check size={22} /> Check Answer
                </button>
            </form>

            {feedback && (
                <div className="animate-fade-in" style={{
                    marginTop: '2rem',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: feedback === 'correct' ? 'var(--success)' : 'var(--error)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                    textShadow: feedback === 'correct' ? '0 0 15px var(--primary-glow)' : '0 0 15px rgba(255,71,87,0.4)'
                }}>
                    {feedback === 'correct' ? <><Check size={28} /> Correct! +10</> : <><X size={28} /> Wrong!</>}
                </div>
            )}

            <button onClick={() => generateProblem(selectedGrade, selectedDifficulty)} className="btn-ghost" style={{ marginTop: '2rem' }}>
                <RefreshCw size={18} /> Skip Problem
            </button>
        </div>
    );
};

export default MathPractice;
