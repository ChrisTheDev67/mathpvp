import React, { useState, useEffect, useRef } from 'react';
import { Check, X, ArrowLeft, Bot, User, Trophy } from 'lucide-react';

// Grade configurations (same as practice)
const gradeConfigs = {
    '1-2': {
        name: 'Grades 1-2',
        emoji: '🌟',
        timer: 3,
        maxNum: 20,
        operators: ['+', '-']
    },
    '3-5': {
        name: 'Grades 3-5',
        emoji: '🚀',
        timer: 4,
        maxMult: 12,
        operators: ['×', '÷']
    },
    '6-9': {
        name: 'Grades 6-9',
        emoji: '🔥',
        timer: 5,
        type: 'algebra'
    },
    '10-12': {
        name: 'Grades 10-12',
        emoji: '🏆',
        timer: 7,
        type: 'advanced'
    }
};

const PvB = () => {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gameState, setGameState] = useState('select'); // select, playing, result
    const [score, setScore] = useState(0); // Only tracking wins in local state for now
    const [botScore, setBotScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [problem, setProblem] = useState({ display: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [userResult, setUserResult] = useState(null); // 'correct', 'incorrect'
    const [botResult, setBotResult] = useState(null); // 'correct', 'incorrect'
    const [roundWinner, setRoundWinner] = useState(null); // 'player', 'bot', 'tie'
    const [playerWins, setPlayerWins] = useState(0);
    const [botWins, setBotWins] = useState(0);

    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const botTimerRef = useRef(null);

    // Generate problem based on grade
    const generateProblem = (grade) => {
        const config = gradeConfigs[grade];
        let display, answer;

        if (grade === '1-2') {
            const op = config.operators[Math.floor(Math.random() * config.operators.length)];
            let n1 = Math.floor(Math.random() * config.maxNum) + 1;
            let n2 = Math.floor(Math.random() * config.maxNum) + 1;
            if (op === '-' && n1 < n2) [n1, n2] = [n2, n1];
            display = `${n1} ${op} ${n2}`;
            answer = op === '+' ? n1 + n2 : n1 - n2;
        } else if (grade === '3-5') {
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
        } else if (grade === '6-9') {
            const x = Math.floor(Math.random() * 10) + 1;
            const a = Math.floor(Math.random() * 5) + 2;
            const result = a * x;
            display = `${a}x = ${result}, x = ?`;
            answer = x;
        } else if (grade === '10-12') {
            const rand = Math.floor(Math.random() * 2);
            if (rand === 0) {
                const x = Math.floor(Math.random() * 10) + 2;
                const n = x * x;
                display = `x² = ${n}, x = ? (positive)`;
                answer = x;
            } else {
                const base = Math.floor(Math.random() * 4) + 2;
                const exp = Math.floor(Math.random() * 3) + 2;
                display = `${base}^${exp} = ?`;
                answer = Math.pow(base, exp);
            }
        }

        return { display, answer };
    };

    // Start a new round
    const startRound = () => {
        const newProblem = generateProblem(selectedGrade);
        setProblem(newProblem);
        setUserAnswer('');
        setTimeLeft(gradeConfigs[selectedGrade].timer);
        setGameState('playing');
        setRoundResult(null);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Start game
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

    // Timer effect
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (gameState === 'playing' && timeLeft === 0) {
            // Time's up - bot wins this round
            handleRoundEnd(false);
        }
        return () => clearTimeout(timerRef.current);
    }, [gameState, timeLeft]);

    // Handle round end
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

    // Handle answer submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === problem.answer) {
            handleRoundEnd(true);
        } else {
            handleRoundEnd(false);
        }
    };

    // Go back
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
            <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Math PvB</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Race against the bot! First to 2 wins!</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => startGame(key)}
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
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{config.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{config.name}</div>
                            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{config.timer}s timer</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Game Over Screen
    if (gameState === 'gameover') {
        return (
            <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{winner === 'player' ? '🎉' : '😔'}</div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: winner === 'player' ? '#4ade80' : '#f87171' }}>
                    {winner === 'player' ? 'You Win!' : 'Bot Wins!'}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Final Score: You {playerWins} - {botWins} Bot
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => startGame(selectedGrade)} className="btn-primary">Play Again</button>
                    <button onClick={goBack} style={{ padding: '12px 24px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-main)', cursor: 'pointer' }}>
                        Change Grade
                    </button>
                </div>
            </div>
        );
    }

    // Playing / Result Screen
    return (
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button onClick={goBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> Exit
                </button>
                <span className="text-gradient" style={{ fontWeight: 'bold' }}>{gradeConfigs[selectedGrade].emoji} {gradeConfigs[selectedGrade].name}</span>
                <div style={{ width: '60px' }}></div>
            </div>

            {/* Score Display */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <User size={30} style={{ color: '#4ade80' }} />
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{playerWins}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', alignSelf: 'center' }}>vs</div>
                <div style={{ textAlign: 'center' }}>
                    <Bot size={30} style={{ color: '#f87171' }} />
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{botWins}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bot</div>
                </div>
            </div>

            {/* Timer */}
            <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: timeLeft <= 3 ? '#f87171' : 'var(--accent)'
            }}>
                {timeLeft}s
            </div>

            {/* Problem */}
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                {problem.display}
            </div>

            {/* Input (only when playing) */}
            {gameState === 'playing' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '280px', margin: '0 auto' }}>
                    <input
                        ref={inputRef}
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Answer"
                        className="input input-lg"
                    />
                    <button type="submit" className="btn-primary">Submit</button>
                </form>
            )}

            {/* Round Result */}
            {gameState === 'result' && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{
                        fontSize: '1.5rem',
                        color: roundResult === 'player' ? '#4ade80' : '#f87171',
                        marginBottom: '0.5rem'
                    }}>
                        {roundResult === 'player' ? '✓ You got it!' : '✗ ' + (timeLeft === 0 ? 'Time\'s up!' : 'Wrong answer!')}
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        Answer was: <strong>{problem.answer}</strong>
                    </div>
                    <button onClick={startRound} className="btn-primary">Next Round</button>
                </div>
            )}
        </div>
    );
};

export default PvB;
