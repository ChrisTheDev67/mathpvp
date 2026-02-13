import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Clock, Trophy, Lock, Key, Swords, Check } from 'lucide-react';
import { gradeConfigs, generateProblem } from '../lib/gradeData';

const COOLDOWN_HOURS = 24;
const ADMIN_EMAIL = 'chris.vkim@icloud.com';

const PvP = () => {
    const { user, profile, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('select');
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

    useEffect(() => {
        const storedCooldown = localStorage.getItem(`lottery_cooldown_${user?.email?.toLowerCase()}`);
        if (storedCooldown) {
            const cooldownEnds = new Date(storedCooldown);
            if (new Date() < cooldownEnds) {
                setCanPlay(false);
                setCooldownEnd(cooldownEnds);
            } else {
                localStorage.removeItem(`lottery_cooldown_${user?.email?.toLowerCase()}`);
            }
        }

        if (user) {
            checkCooldown();
        }
    }, [user]);

    const checkCooldown = async () => {
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
                localStorage.setItem(`lottery_cooldown_${user.email.toLowerCase()}`, cooldownEnds.toISOString());
            } else {
                localStorage.removeItem(`lottery_cooldown_${user.email.toLowerCase()}`);
            }
        }
    };

    const handleResetClick = async () => {
        if (user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            const { error } = await supabase.from('cooldowns').delete().eq('email', user.email.toLowerCase());
            localStorage.removeItem(`lottery_cooldown_${user.email.toLowerCase()}`);
            setCanPlay(true);
            setCooldownEnd(null);
            setGameState('select');
            setResetMessage('Timer reset! ✓');
            setTimeout(() => setResetMessage(''), 2000);
        } else {
            setShowResetModal(true);
        }
    };

    const startGame = (grade) => {
        setSelectedGrade(grade);
        setScore(0);
        setTimeLeft(gradeConfigs[grade].duration);
        setProblem(generateProblem(grade));
        setGameState('playing');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (gameState === 'playing' && timeLeft === 0) {
            endGame();
        }
        return () => clearTimeout(timerRef.current);
    }, [gameState, timeLeft]);

    const endGame = async () => {
        clearTimeout(timerRef.current);
        setGameState('finished');

        await supabase.from('lottery_scores').insert([{
            user_id: user.id,
            nickname: profile.nickname,
            score: score,
            grade: selectedGrade
        }]);

        const cooldownEndsAt = new Date(Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000);

        await supabase.from('cooldowns').upsert(
            [{
                email: user.email.toLowerCase(),
                last_played: new Date().toISOString()
            }],
            { onConflict: 'email' }
        );

        localStorage.setItem(`lottery_cooldown_${user.email.toLowerCase()}`, cooldownEndsAt.toISOString());
        setCanPlay(false);
        setCooldownEnd(cooldownEndsAt);
    };

    const [showEndModal, setShowEndModal] = useState(false);
    const [scoreDiff, setScoreDiff] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(userAnswer) === problem.answer) {
            setScore(score + 10);
            setScoreDiff(10);
            setTimeout(() => setScoreDiff(null), 1000);
        }
        setUserAnswer('');
        setProblem(generateProblem(selectedGrade));
        inputRef.current?.focus();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const EndGameModal = () => (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', maxWidth: '350px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>End Game?</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Are you sure you want to quit? Your current score will be saved.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => { endGame(); setShowEndModal(false); }} className="btn-primary" style={{ background: 'var(--error)' }}>
                        Yes, End It
                    </button>
                    <button onClick={() => setShowEndModal(false)} className="btn-ghost" autoFocus>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    const ResetModal = () => (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🙅</div>
                <h3 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase' }}>nuh uh bro</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Nice try, but you can't reset the timer!
                </p>
                <button onClick={() => setShowResetModal(false)} className="btn-primary">
                    OK
                </button>
            </div>
        </div>
    );

    if (authLoading) {
        return (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <Lock size={56} style={{ color: 'var(--warning)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    <span className="text-gradient">Login Required</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    You need to be logged in to play Battle Royale
                </p>
                <button onClick={() => navigate('/login')} className="btn-primary">Log In</button>
            </div>
        );
    }

    if (!canPlay && gameState === 'select') {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                {showResetModal && <ResetModal />}
                <Clock size={56} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    <span className="text-gradient">Come Back Tomorrow!</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    You've already played today. Try again after:
                </p>
                <p style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '2rem', fontWeight: '700' }}>
                    {cooldownEnd?.toLocaleString()}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/leaderboard')} className="btn-primary">
                        View Leaderboard
                    </button>
                    <button onClick={handleResetClick} className="btn-ghost">
                        <Key size={18} /> Reset Timer
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'select') {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Swords size={56} style={{ color: 'var(--error)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        <span className="text-gradient">Battle Royale</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        Compete for the daily leaderboard!
                    </p>
                    <p style={{
                        color: 'var(--warning)',
                        fontSize: '0.95rem',
                        background: 'rgba(255, 179, 2, 0.1)',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '2px solid var(--warning)',
                        display: 'inline-block'
                    }}>
                        ⚠️ You can only play ONCE per day!
                    </p>
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
                            <div style={{ color: config.color, fontSize: '0.8rem', marginTop: '0.35rem', fontWeight: '600' }}>
                                ⏱ {Math.floor(config.duration / 60)} min
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                {showResetModal && <ResetModal />}
                <Trophy size={72} style={{ color: 'var(--accent)', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px var(--accent-glow))' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    <span className="text-gradient">Time's Up!</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Your final score:</p>
                <div className="score-display" style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
                    {score}
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Your score has been saved to the leaderboard!
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/leaderboard', { state: { grade: selectedGrade } })} className="btn-primary">
                        View Leaderboard
                    </button>
                    <button onClick={handleResetClick} className="btn-ghost">
                        <Key size={18} /> Reset Timer
                    </button>
                </div>
            </div>
        );
    }

    // Playing state
    const config = gradeConfigs[selectedGrade];

    if (gameState === 'playing') {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
                {showEndModal && <EndGameModal />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
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
                    <div className={timeLeft <= 60 ? 'timer timer-warning' : 'timer timer-normal'} style={{ fontSize: '2.25rem' }}>
                        ⏱️ {formatTime(timeLeft)}
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
                    fontSize: 'clamp(1.25rem, 5vw, 2rem)',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    fontFamily: 'monospace',
                    background: 'var(--bg-darker)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '3px solid var(--border)'
                }}>
                    {problem.display}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                    <input
                        ref={inputRef}
                        type="number"
                        step="any"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Answer"
                        className="input input-lg"
                        autoFocus
                        style={{ fontWeight: '700' }}
                    />
                    <button type="submit" className="btn-primary" style={{ fontSize: '1.1rem' }}>
                        <Check size={22} /> Submit
                    </button>
                </form>

                <button onClick={() => setShowEndModal(true)} className="btn-ghost" style={{ marginTop: '2rem' }}>
                    End Game Early
                </button>
            </div>
        );
    }

    // Fallback return if something else
    return null;
};

export default PvP;
