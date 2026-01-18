import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Clock, Trophy, Lock, Key } from 'lucide-react';

// Grade configurations
const gradeConfigs = {
    '1-2': { name: 'Grades 1-2', emoji: '🌟', maxNum: 20, operators: ['+', '-'] },
    '3-5': { name: 'Grades 3-5', emoji: '🚀', maxMult: 12, operators: ['×', '÷', 'frac+', 'frac-'] },
    '6-9': { name: 'Grades 6-9', emoji: '🔥', type: 'algebra' },
    '10-12': { name: 'Grades 10-12', emoji: '🏆', type: 'advanced' }
};

// Helper function to get GCD for simplifying fractions
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// Helper to format mixed number for display
const formatMixedNumber = (whole, num, denom) => {
    if (whole === 0) return `${num}/${denom}`;
    if (num === 0) return `${whole}`;
    return `${whole} ${num}/${denom}`;
};

const GAME_DURATION = 10 * 60; // 10 minutes in seconds
const COOLDOWN_HOURS = 24;
const ADMIN_EMAIL = 'chris.vkim@icloud.com';

const PvP = () => {
    const { user, profile, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('select'); // select, playing, result
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [problem, setProblem] = useState({ display: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [canPlay, setCanPlay] = useState(true);
    const [cooldownEnd, setCooldownEnd] = useState(null);
    const [resetMessage, setResetMessage] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);

    const inputRef = useRef(null);
    const timerRef = useRef(null);

    // Check cooldown on mount - use localStorage first for instant check
    useEffect(() => {
        // Immediate localStorage check for fast response
        const storedCooldown = localStorage.getItem(`lottery_cooldown_${user?.email?.toLowerCase()}`);
        if (storedCooldown) {
            const cooldownEnds = new Date(storedCooldown);
            if (new Date() < cooldownEnds) {
                setCanPlay(false);
                setCooldownEnd(cooldownEnds);
            } else {
                // Cooldown expired, remove from localStorage
                localStorage.removeItem(`lottery_cooldown_${user?.email?.toLowerCase()}`);
            }
        }

        // Also check Supabase as backup
        if (user) {
            checkCooldown();
        }
    }, [user]);

    const checkCooldown = async () => {
        // Check by email for persistence across sessions
        const { data, error } = await supabase
            .from('cooldowns')
            .select('last_played')
            .eq('email', user.email.toLowerCase())
            .single();

        if (data?.last_played) {
            const lastPlayed = new Date(data.last_played);
            const cooldownEnds = new Date(lastPlayed.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000);

            if (new Date() < cooldownEnds) {
                setCanPlay(false);
                setCooldownEnd(cooldownEnds);
                // Also store in localStorage for reload persistence
                localStorage.setItem(`lottery_cooldown_${user.email.toLowerCase()}`, cooldownEnds.toISOString());
            } else {
                // Cooldown expired, clean up
                localStorage.removeItem(`lottery_cooldown_${user.email.toLowerCase()}`);
            }
        }
    };

    // Handle reset timer click
    const handleResetClick = async () => {
        console.log('Reset clicked. User email:', user?.email, 'Admin email:', ADMIN_EMAIL);

        if (user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            // Admin - reset instantly by email
            console.log('Admin detected, resetting cooldown...');
            const { error } = await supabase.from('cooldowns').delete().eq('email', user.email.toLowerCase());
            console.log('Delete result:', error ? error : 'Success');

            // Also clear localStorage
            localStorage.removeItem(`lottery_cooldown_${user.email.toLowerCase()}`);

            setCanPlay(true);
            setCooldownEnd(null);
            setGameState('select');
            setResetMessage('Timer reset! ✓');
            setTimeout(() => setResetMessage(''), 2000);
        } else {
            // Not admin
            setShowResetModal(true);
        }
    };

    // Generate problem
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

            if (op === '×' || op === '÷') {
                // Multiplication and division
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
            } else {
                // Fraction addition/subtraction with UNLIKE denominators
                const denomOptions = [2, 3, 4, 5, 7]; // Prime/simple denominators for unlike fractions

                // Pick two different denominators
                let denom1 = denomOptions[Math.floor(Math.random() * denomOptions.length)];
                let denom2;
                do {
                    denom2 = denomOptions[Math.floor(Math.random() * denomOptions.length)];
                } while (denom2 === denom1);

                // Calculate LCD (Least Common Denominator)
                const lcd = (denom1 * denom2) / gcd(denom1, denom2);

                // Generate first number (can be mixed or proper fraction)
                const useMixed1 = Math.random() > 0.3; // 70% chance of mixed number
                const whole1 = useMixed1 ? Math.floor(Math.random() * 3) + 1 : 0;
                const num1 = Math.floor(Math.random() * (denom1 - 1)) + 1;

                // Generate second number (proper fraction for variety)
                const useMixed2 = Math.random() > 0.6; // 40% chance of mixed number
                const whole2 = useMixed2 ? Math.floor(Math.random() * 2) + 1 : 0;
                const num2 = Math.floor(Math.random() * (denom2 - 1)) + 1;

                // Convert to common denominator for calculation
                const frac1InLcd = (whole1 * denom1 + num1) * (lcd / denom1);
                const frac2InLcd = (whole2 * denom2 + num2) * (lcd / denom2);

                // Format display strings
                const display1 = formatMixedNumber(whole1, num1, denom1);
                const display2 = formatMixedNumber(whole2, num2, denom2);

                if (op === 'frac+') {
                    const resultNum = frac1InLcd + frac2InLcd;
                    const resultWhole = Math.floor(resultNum / lcd);
                    answer = resultWhole;
                    display = `${display1} + ${display2} = ? (whole number part)`;
                } else {
                    // Ensure first is larger for subtraction
                    let f1 = frac1InLcd, f2 = frac2InLcd;
                    let d1 = display1, d2 = display2;
                    if (f1 < f2) {
                        [f1, f2] = [f2, f1];
                        [d1, d2] = [d2, d1];
                    }
                    const resultNum = f1 - f2;
                    const resultWhole = Math.floor(resultNum / lcd);
                    answer = resultWhole;
                    display = `${d1} − ${d2} = ? (whole number part)`;
                }
            }
        } else if (grade === '6-9') {
            const x = Math.floor(Math.random() * 10) + 1;
            const a = Math.floor(Math.random() * 5) + 2;
            const result = a * x;
            display = `${a}x = ${result}, x = ?`;
            answer = x;
        } else if (grade === '10-12') {
            const x = Math.floor(Math.random() * 10) + 2;
            const n = x * x;
            display = `x² = ${n}, x = ? (positive)`;
            answer = x;
        }

        return { display, answer };
    };

    // Start game
    const startGame = (grade) => {
        setSelectedGrade(grade);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setProblem(generateProblem(grade));
        setGameState('playing');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Timer effect
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (gameState === 'playing' && timeLeft === 0) {
            endGame();
        }
        return () => clearTimeout(timerRef.current);
    }, [gameState, timeLeft]);

    // End game
    const endGame = async () => {
        clearTimeout(timerRef.current);
        setGameState('finished');

        await supabase.from('lottery_scores').insert([{
            user_id: user.id,
            nickname: profile.nickname,
            score: score,
            grade: selectedGrade
        }]);

        // Store cooldown by email for persistence across sessions
        const cooldownEndsAt = new Date(Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000);

        await supabase.from('cooldowns').upsert(
            [{
                email: user.email.toLowerCase(),
                last_played: new Date().toISOString()
            }],
            { onConflict: 'email' }
        );

        // Also store in localStorage for immediate reload protection
        localStorage.setItem(`lottery_cooldown_${user.email.toLowerCase()}`, cooldownEndsAt.toISOString());

        setCanPlay(false);
        setCooldownEnd(cooldownEndsAt);
    };

    // Handle answer
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(userAnswer) === problem.answer) {
            setScore(score + 10);
        }
        setUserAnswer('');
        setProblem(generateProblem(selectedGrade));
        inputRef.current?.focus();
    };

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Reset Modal - shows "nuh uh bro" for non-admins
    const ResetModal = () => (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🙅</div>
                <h3 style={{ marginBottom: '1rem', fontSize: '2rem' }}>nuh uh bro</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Nice try, but you can't reset the timer!
                </p>
                <button
                    onClick={() => setShowResetModal(false)}
                    className="btn-primary"
                >
                    OK
                </button>
            </div>
        </div>
    );

    // Loading/Auth check
    if (authLoading) {
        return <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
    }

    if (!user) {
        return (
            <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <Lock size={50} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Login Required</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    You need to be logged in to play Lottery Math
                </p>
                <button onClick={() => navigate('/login')} className="btn-primary">Log In</button>
            </div>
        );
    }

    // Cooldown check
    if (!canPlay && gameState === 'select') {
        return (
            <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                {showResetModal && <ResetModal />}
                <Clock size={50} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Come Back Tomorrow!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    You've already played today. Try again after:
                </p>
                <p style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                    {cooldownEnd?.toLocaleString()}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/leaderboard')} className="btn-primary">
                        View Leaderboard
                    </button>
                    <button
                        onClick={handleResetClick}
                        style={{
                            padding: '12px 24px', background: 'transparent',
                            border: '2px solid var(--accent)', borderRadius: '8px',
                            color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Key size={18} /> Reset Timer
                    </button>
                </div>
            </div>
        );
    }

    // Grade Selection
    if (gameState === 'select') {
        return (
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚔️</div>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Battle Royale</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    (try winning if you win i will give 50% of win pool)
                </p>
                <p style={{ color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    ⚠️ You can only play once per day
                </p>

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
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Game Finished
    if (gameState === 'finished') {
        return (
            <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                {showResetModal && <ResetModal />}
                <Trophy size={60} style={{ color: '#fbbf24', marginBottom: '1rem' }} />
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Time's Up!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your final score:</p>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '2rem' }}>
                    {score}
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Your score has been saved to the leaderboard!
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/leaderboard', { state: { grade: selectedGrade } })} className="btn-primary">
                        View Leaderboard
                    </button>
                    <button
                        onClick={handleResetClick}
                        style={{
                            padding: '12px 24px', background: 'transparent',
                            border: '2px solid var(--accent)', borderRadius: '8px',
                            color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <Key size={18} /> Reset Timer
                    </button>
                </div>
            </div>
        );
    }

    // Playing
    return (
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{gradeConfigs[selectedGrade].emoji} {gradeConfigs[selectedGrade].name}</span>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: timeLeft <= 60 ? '#f87171' : 'var(--accent)'
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>
                <div style={{ background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    Score: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{score}</span>
                </div>
            </div>

            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'monospace' }}>
                {problem.display}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '280px', margin: '0 auto' }}>
                <input
                    ref={inputRef}
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Answer"
                    className="input input-lg"
                    autoFocus
                />
                <button type="submit" className="btn-primary">Submit</button>
            </form>

            <button onClick={endGame} style={{
                marginTop: '2rem',
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                cursor: 'pointer'
            }}>
                End Game Early
            </button>
        </div>
    );
};

export default PvP;
