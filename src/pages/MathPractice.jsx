import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, X, RefreshCw, ArrowLeft, Zap, Target, LogIn } from 'lucide-react';
import { gradeConfigs, difficultyColors, generateProblem } from '../lib/gradeData';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const MathPractice = () => {
    const { user, profile, loading: authLoading } = useAuth();
    const location = useLocation();
    const [selectedGrade, setSelectedGrade] = useState(null);

    // If not logged in, show login prompt
    if (!authLoading && !user) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <LogIn size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <span className="text-gradient">Login Required</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                    You need to log in to practice math problems.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem' }}>
                        Log In
                    </Link>
                    <Link to="/signup" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem' }}>
                        Sign Up
                    </Link>
                </div>
            </div>
        );
    }
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [problem, setProblem] = useState({ display: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const bestStreakRef = useRef(0);

    // Get the Monday of the current week (PT timezone)
    const getWeekStart = () => {
        const now = new Date();
        const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        const day = pt.getDay();
        const diff = day === 0 ? 6 : day - 1; // Monday = 0
        pt.setDate(pt.getDate() - diff);
        pt.setHours(0, 0, 0, 0);
        return pt.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    // Save best streak to Supabase
    const saveStreak = async (newBest) => {
        if (!user) return;
        const weekStart = getWeekStart();
        const nickname = profile?.nickname || 'Unknown';

        // Upsert: update if exists for this user+week, insert otherwise
        const { data: existing } = await supabase
            .from('weekly_streaks')
            .select('id, best_streak')
            .eq('user_id', user.id)
            .eq('week_start', weekStart)
            .single();

        if (existing && existing.best_streak >= newBest) return; // already have a better streak

        if (existing) {
            await supabase
                .from('weekly_streaks')
                .update({ best_streak: newBest, nickname })
                .eq('id', existing.id);
        } else {
            await supabase
                .from('weekly_streaks')
                .insert([{ user_id: user.id, nickname, best_streak: newBest, week_start: weekStart }]);
        }
    };

    // Auto-select grade/topic/difficulty when coming from Help page
    useEffect(() => {
        const s = location.state;
        if (s?.grade && s?.topic && s?.difficulty) {
            setSelectedGrade(s.grade);
            setSelectedTopic(s.topic);
            setSelectedDifficulty(s.difficulty);
            setStreak(0);
            setBestStreak(0);
            const p = generateProblem(s.grade, s.topic, s.difficulty);
            setProblem(p);
        }
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const doGenerate = (grade, topicId, difficulty) => {
        const p = generateProblem(grade, topicId, difficulty);
        setProblem(p);
        setUserAnswer('');
        setFeedback(null);
    };

    const selectDifficulty = (diff) => {
        setSelectedDifficulty(diff);
        setStreak(0);
        setBestStreak(0);
        doGenerate(selectedGrade, selectedTopic, diff);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsed = parseFloat(userAnswer);
        if (parsed === problem.answer) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > bestStreak) {
                setBestStreak(newStreak);
                bestStreakRef.current = newStreak;
                saveStreak(newStreak);
            }
            setFeedback('correct');
        } else {
            setStreak(0);
            setFeedback('incorrect');
        }
        setTimeout(() => doGenerate(selectedGrade, selectedTopic, selectedDifficulty), 1000);
    };

    const goBack = () => {
        if (selectedDifficulty) {
            setSelectedDifficulty(null);
            setStreak(0);
            setBestStreak(0);
        } else if (selectedTopic) {
            setSelectedTopic(null);
        } else {
            setSelectedGrade(null);
        }
    };

    // ─── SCREEN 1: Grade Selection ───
    if (!selectedGrade) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Zap size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        <span className="text-gradient">Choose Your Grade</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Select your grade level</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedGrade(key)}
                            style={{
                                padding: '1.25rem 0.5rem',
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
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{config.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}>{config.name}</div>
                            <div style={{ color: config.color, fontSize: '0.7rem', marginTop: '0.35rem', fontWeight: '600' }}>
                                {config.topics.length} topics
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // ─── SCREEN 2: Topic Selection ───
    if (!selectedTopic) {
        const grade = gradeConfigs[selectedGrade];
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '850px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                    <ArrowLeft size={20} /> Back to Grades
                </button>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{grade.emoji}</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{grade.name}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Choose a topic to practice</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1rem',
                }}>
                    {grade.topics.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic.id)}
                            style={{
                                padding: '1.25rem 1rem',
                                background: 'var(--bg-darker)',
                                border: '3px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center',
                                boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = grade.color;
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 4px 0 rgba(0,0,0,0.3), 0 0 15px ${grade.color}33`;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 0 rgba(0,0,0,0.3)';
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{topic.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.95rem' }}>{topic.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // ─── SCREEN 3: Difficulty Selection ───
    if (!selectedDifficulty) {
        const grade = gradeConfigs[selectedGrade];
        const topic = grade.topics.find(t => t.id === selectedTopic);
        const difficulties = [
            { key: 'easy', label: 'Easy', desc: 'Start simple' },
            { key: 'normal', label: 'Normal', desc: 'Standard challenge' },
            { key: 'medium', label: 'Medium', desc: 'Step it up' },
            { key: 'hard', label: 'Hard', desc: 'Full power' },
        ];

        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                    <ArrowLeft size={20} /> Back to Topics
                </button>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{topic.emoji}</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{topic.name}</h2>
                    <p style={{ color: grade.color, fontWeight: '600', fontSize: '0.95rem' }}>{grade.name}</p>
                </div>

                <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase' }}>
                    <Target size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Select Difficulty
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {difficulties.map(({ key, label, desc }) => {
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
                                    boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
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
                                <div style={{ color: colors.border, fontWeight: '700', fontSize: '1.2rem', textTransform: 'uppercase' }}>{label}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{desc}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ─── SCREEN 4: Practice ───
    const grade = gradeConfigs[selectedGrade];
    const topic = grade.topics.find(t => t.id === selectedTopic);
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
                    gap: '0.5rem',
                    background: 'var(--bg-darker)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid var(--border)',
                    fontSize: '0.85rem'
                }}>
                    <span>{topic.emoji}</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{topic.name}</span>
                    <span style={{ color: colors.border, fontWeight: '700', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        ({selectedDifficulty})
                    </span>
                </div>
                <div style={{
                    background: 'var(--bg-darker)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid var(--accent)',
                    position: 'relative'
                }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>🔥 Streak:</span>
                    <span className="score-display" style={{ fontSize: '1.5rem' }}>{streak}</span>
                    {bestStreak > 0 && (
                        <span style={{
                            marginLeft: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem'
                        }}>
                            Best: {bestStreak}
                        </span>
                    )}
                </div>
            </div>

            <div style={{
                fontSize: 'clamp(1.25rem, 5vw, 2.25rem)',
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
                    step="any"
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
                    {feedback === 'correct'
                        ? <><Check size={28} /> Correct! +10</>
                        : <><X size={28} /> Wrong! Answer: {problem.answer}</>
                    }
                </div>
            )}

            <button onClick={() => doGenerate(selectedGrade, selectedTopic, selectedDifficulty)} className="btn-ghost" style={{ marginTop: '2rem' }}>
                <RefreshCw size={18} /> Skip Problem
            </button>
        </div>
    );
};

export default MathPractice;
