import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { gradeConfigs } from '../lib/gradeData';
import { topicLessons } from '../lib/topicLessons';

const HelpWithMath = () => {
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const goBack = () => {
        if (selectedTopic) setSelectedTopic(null);
        else setSelectedGrade(null);
    };

    // ─── SCREEN 1: Grade Selection ───
    if (!selectedGrade) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <BookOpen size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        <span className="text-gradient">Help with Math</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Choose your grade to learn</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedGrade(key)}
                            style={{
                                padding: '1.25rem 0.5rem', background: 'var(--bg-darker)',
                                border: '3px solid var(--border)', borderRadius: 'var(--radius-md)',
                                cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center',
                                boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = config.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{config.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}>{config.name}</div>
                            <div style={{ color: config.color, fontSize: '0.7rem', marginTop: '0.35rem', fontWeight: '600' }}>{config.topics.length} topics</div>
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
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>What do you want to learn?</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {grade.topics.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic.id)}
                            style={{
                                padding: '1.25rem 1rem', background: 'var(--bg-darker)',
                                border: '3px solid var(--border)', borderRadius: 'var(--radius-md)',
                                cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center',
                                boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = grade.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 4px 0 rgba(0,0,0,0.3), 0 0 15px ${grade.color}33`; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 0 rgba(0,0,0,0.3)'; }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{topic.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.95rem' }}>{topic.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // ─── SCREEN 3: Lesson View ───
    const grade = gradeConfigs[selectedGrade];
    const topicInfo = grade.topics.find(t => t.id === selectedTopic);
    const lesson = topicLessons[selectedGrade]?.[selectedTopic];

    if (!lesson) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem' }}><ArrowLeft size={20} /> Back</button>
                <p style={{ color: 'var(--text-muted)' }}>Lesson coming soon!</p>
            </div>
        );
    }

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto', padding: '2.5rem' }}>
            <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                <ArrowLeft size={20} /> Back to Topics
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{topicInfo.emoji}</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {lesson.title}
                </h2>
                <p style={{ color: grade.color, fontWeight: '600', fontSize: '0.95rem' }}>{grade.name}</p>
            </div>

            {/* Explanation */}
            <div style={{
                background: 'rgba(0, 162, 255, 0.08)', border: '2px solid var(--secondary)',
                borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Lightbulb size={22} style={{ color: 'var(--accent)' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent)' }}>What is it?</h3>
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', lineHeight: '1.6' }}>{lesson.explanation}</p>
            </div>

            {/* Steps */}
            <div style={{
                background: 'rgba(2, 183, 87, 0.08)', border: '2px solid var(--primary)',
                borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem'
            }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1rem' }}>
                    📋 How to do it (Steps)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {lesson.steps.map((step, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                            background: 'var(--bg-darker)', padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)'
                        }}>
                            <span style={{
                                background: 'var(--primary)', color: '#fff', borderRadius: '50%',
                                width: '28px', height: '28px', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0
                            }}>{i + 1}</span>
                            <span style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.5' }}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Examples */}
            <div style={{
                background: 'rgba(255, 179, 2, 0.08)', border: '2px solid var(--warning)',
                borderRadius: 'var(--radius-md)', padding: '1.5rem'
            }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--warning)', marginBottom: '1rem' }}>
                    ✏️ Examples
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {lesson.examples.map((ex, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-darker)', padding: '1.25rem',
                            borderRadius: 'var(--radius-sm)', border: '2px solid var(--border)'
                        }}>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontFamily: 'monospace' }}>
                                {ex.problem}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <ChevronRight size={16} style={{ color: 'var(--secondary)' }} />
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{ex.solution}</span>
                            </div>
                            <div style={{
                                color: 'var(--success)', fontWeight: '700', fontSize: '1rem',
                                background: 'rgba(2, 183, 87, 0.1)', padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)', display: 'inline-block'
                            }}>
                                ✓ Answer: {ex.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Practice button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                    onClick={() => navigate('/practice', { state: { grade: selectedGrade, topic: selectedTopic, difficulty: 'easy' } })}
                    className="btn-primary"
                    style={{ fontSize: '1.1rem', padding: '1rem 2rem', cursor: 'pointer' }}
                >
                    ✏️ Practice This Topic
                </button>
            </div>
        </div>
    );
};

export default HelpWithMath;
