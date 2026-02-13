import React, { useState, useEffect, useRef } from 'react';
import { Check, X, ArrowLeft, Bot, User, Trophy, Swords } from 'lucide-react';
import { gradeConfigs, generateProblem } from '../lib/gradeData';

const PvB = () => {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gameState, setGameState] = useState('select');
    const [timeLeft, setTimeLeft] = useState(0);
    const [problem, setProblem] = useState({ display: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [roundResult, setRoundResult] = useState(null);
    const [winner, setWinner] = useState(null);
    const [playerWins, setPlayerWins] = useState(0);
    const [botWins, setBotWins] = useState(0);

    const inputRef = useRef(null);
    const timerRef = useRef(null);

    const startRound = () => {
        const newProblem = generateProblem(selectedGrade);
        setProblem(newProblem);
        setUserAnswer('');
        setTimeLeft(gradeConfigs[selectedGrade].timer);
        setGameState('playing');
        setRoundResult(null);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const startGame = (grade) => {
        setSelectedGrade(grade);
        setPlayerWins(0);
        setBotWins(0);
        setWinner(null);
        const newProblem = generateProblem(grade);
        setProblem(newProblem);
        setUserAnswer('');
        setTimeLeft(gradeConfigs[grade].timer);
        setGameState('playing');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (gameState === 'playing' && timeLeft === 0) {
            handleRoundEnd(false);
        }
        return () => clearTimeout(timerRef.current);
    }, [gameState, timeLeft]);

    const handleRoundEnd = (playerWon) => {
        clearTimeout(timerRef.current);
        setGameState('result');

        if (playerWon) {
            const newPlayerWins = playerWins + 1;
            setPlayerWins(newPlayerWins);
            setRoundResult('player');
            if (newPlayerWins >= 2) {
                setWinner('player');
                setGameState('gameover');
            }
        } else {
            const newBotWins = botWins + 1;
            setBotWins(newBotWins);
            setRoundResult('bot');
            if (newBotWins >= 2) {
                setWinner('bot');
                setGameState('gameover');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(userAnswer) === problem.answer) {
            handleRoundEnd(true);
        } else {
            handleRoundEnd(false);
        }
    };

    const goBack = () => {
        clearTimeout(timerRef.current);
        setSelectedGrade(null);
        setGameState('select');
        setPlayerWins(0);
        setBotWins(0);
    };

    // Grade Selection Screen
    if (gameState === 'select') {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Bot size={56} style={{ color: 'var(--error)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        <span className="text-gradient">Player vs Bot</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Race against the bot! First to 2 wins!</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => startGame(key)}
                            style={{
                                padding: '1.1rem 0.5rem',
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
                            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{config.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase' }}>{config.name}</div>
                            <div style={{
                                color: config.color,
                                fontSize: '0.8rem',
                                marginTop: '0.35rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.25rem'
                            }}>
                                ⏱ {config.timer}s timer
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Game Over Screen
    if (gameState === 'gameover') {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>{winner === 'player' ? '🎉' : '🤖'}</div>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: winner === 'player' ? 'var(--primary)' : 'var(--error)',
                    textTransform: 'uppercase',
                    textShadow: winner === 'player' ? '0 0 20px var(--primary-glow)' : '0 0 20px rgba(255,71,87,0.4)'
                }}>
                    {winner === 'player' ? 'You Win!' : 'Bot Wins!'}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.25rem' }}>
                    Final Score: <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{playerWins}</span> - <span style={{ color: 'var(--error)', fontWeight: '700' }}>{botWins}</span>
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => startGame(selectedGrade)} className="btn-primary">
                        Play Again
                    </button>
                    <button onClick={goBack} className="btn-ghost">
                        Change Grade
                    </button>
                </div>
            </div>
        );
    }

    // Playing / Result Screen
    const config = gradeConfigs[selectedGrade];

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button onClick={goBack} className="btn-ghost" style={{ padding: '0.5rem 1rem' }}>
                    <ArrowLeft size={18} /> Exit
                </button>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--bg-darker)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid var(--border)'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>{config.emoji}</span>
                    <span style={{ fontWeight: '700', textTransform: 'uppercase' }}>{config.name}</span>
                </div>
                <div style={{ width: '80px' }}></div>
            </div>

            {/* Score Display */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                marginBottom: '2rem',
                background: 'var(--bg-darker)',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--radius-md)',
                border: '3px solid var(--border)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <User size={36} style={{ color: 'var(--primary)' }} />
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)' }}>{playerWins}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>You</div>
                </div>
                <div className="vs-badge">VS</div>
                <div style={{ textAlign: 'center' }}>
                    <Bot size={36} style={{ color: 'var(--error)' }} />
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--error)' }}>{botWins}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Bot</div>
                </div>
            </div>

            {/* Timer */}
            <div className={timeLeft <= 3 ? 'timer timer-warning' : 'timer timer-normal'} style={{ marginBottom: '1rem' }}>
                {timeLeft}s
            </div>

            {/* Problem */}
            <div style={{
                fontSize: 'clamp(1.25rem, 5vw, 2rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                fontFamily: 'monospace',
                background: 'var(--bg-darker)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '3px solid var(--border)'
            }}>
                {problem.display}
            </div>

            {/* Input */}
            {gameState === 'playing' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                    <input
                        ref={inputRef}
                        type="number"
                        step="any"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Answer"
                        className="input input-lg"
                        style={{ fontWeight: '700' }}
                    />
                    <button type="submit" className="btn-primary" style={{ fontSize: '1.1rem' }}>
                        <Check size={22} /> Submit
                    </button>
                </form>
            )}

            {/* Round Result */}
            {gameState === 'result' && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: roundResult === 'player' ? 'var(--primary)' : 'var(--error)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        textShadow: roundResult === 'player' ? '0 0 15px var(--primary-glow)' : '0 0 15px rgba(255,71,87,0.4)'
                    }}>
                        {roundResult === 'player' ? '✓ Correct!' : '✗ ' + (timeLeft === 0 ? 'Time\'s up!' : 'Wrong!')}
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        Answer: <strong style={{ color: 'var(--secondary)' }}>{problem.answer}</strong>
                    </div>
                    <button onClick={startRound} className="btn-primary">
                        Next Round
                    </button>
                </div>
            )}
        </div>
    );
};

export default PvB;
