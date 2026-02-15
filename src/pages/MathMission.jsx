import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Check, X, LogIn, RefreshCw, Crosshair } from 'lucide-react';
import { gradeConfigs, difficultyColors, generateProblem } from '../lib/gradeData';
import { useAuth } from '../contexts/AuthContext';
import './MathMission.css';

// ═══════════════════════════════════════
//  MISSION CONFIG
// ═══════════════════════════════════════
const DIFFICULTY_LEVELS = { easy: 5, normal: 7, medium: 10, hard: 15 };
const BASE_TIME = 5; // 5 seconds base per problem

const PHASES = [
    { id: 'money', emoji: '💰', name: 'Crack the Vault', desc: 'Break into the vault and grab the cash!' },
    { id: 'equip', emoji: '🛒', name: 'Gear Up', desc: 'Grab the right equipment — wrong answers = wrong gear!' },
    { id: 'hack', emoji: '💻', name: 'Hack the System', desc: 'Enter the correct password to bypass security!' },
    { id: 'stealth', emoji: '🥷', name: 'Stealth Mode', desc: 'Sneak past the guards — don\'t trigger the alarm!' },
    { id: 'code', emoji: '🧑‍💻', name: 'Decode the Lock', desc: 'Crack the digital lock with your math skills!' },
    { id: 'escape', emoji: '🚁', name: 'Escape!', desc: 'Get to the helicopter on the rooftop!' },
];

const EQUIPMENT_ITEMS = [
    { emoji: '🔦', name: 'Flashlight' },
    { emoji: '🗝️', name: 'Keycard' },
    { emoji: '🎒', name: 'Backpack' },
    { emoji: '📡', name: 'Jammer' },
    { emoji: '🥽', name: 'Night Vision' },
    { emoji: '🧤', name: 'Stealth Gloves' },
];

const WRONG_ITEMS = [
    { emoji: '🧸', name: 'Teddy Bear' },
    { emoji: '🌂', name: 'Umbrella' },
    { emoji: '🎸', name: 'Guitar' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🧹', name: 'Broomstick' },
    { emoji: '📎', name: 'Paperclip' },
    { emoji: '🪣', name: 'Bucket' },
    { emoji: '🧲', name: 'Magnet' },
];

// ── Cutscene messages ──
const CUTSCENES = {
    money: {
        // success: Handled by GrabMoneyScene
        fail: { emoji: '🚪💥', title: 'Busted!', sub: 'The owner breaks down the door!' },
        // timeout: Handled by CaughtScene
    },
    equip: {
        success: { emoji: '✅🎒', title: 'Gear Secured!', sub: 'You got the right equipment!' },
        fail: { emoji: '🧸❌', title: 'Wrong Item!', sub: 'You grabbed the wrong thing! Need more levels...' },
        // timeout: Handled by CaughtScene
    },
    hack: {
        success: { emoji: '🔓✅', title: 'Access Granted!', sub: 'Password accepted — system bypassed!' },
        fail: { emoji: '🔐❌', title: 'Wrong Password!', sub: 'ACCESS DENIED — security alert triggered!' },
        // timeout: Handled by CaughtScene
    },
    stealth: {
        success: { emoji: '🥷✅', title: 'Undetected!', sub: 'You slipped past the guards like a shadow!' },
        fail: { emoji: '🔦👮', title: 'Spotted!', sub: 'The spotlight found you — guards are coming!' },
        // timeout: Handled by CaughtScene
    },
    code: {
        success: { emoji: '💻✅', title: 'Code Cracked!', sub: 'The digital lock opens!' },
        fail: { emoji: '💻❌', title: 'Syntax Error!', sub: 'Wrong output — the lock jammed!' },
        // timeout: Handled by CaughtScene
    },
    escape: {
        success: { emoji: '🚁🎉', title: 'Mission Complete!', sub: 'You reached the helicopter — you\'re free!' },
        fail: { emoji: '🚁💨', title: 'Missed It!', sub: 'Wrong move — the helicopter left without you!' },
        // timeout: Handled by CaughtScene
    },
};

// ═══════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════
function distributePhases(totalLevels) {
    const plan = [];
    const escapeLevels = 1;
    const codeLevels = Math.min(2, Math.max(1, totalLevels >= 5 ? 2 : 1));
    const remaining = totalLevels - escapeLevels - codeLevels;
    const fourPhases = ['money', 'equip', 'hack', 'stealth'];
    const perPhase = Math.floor(remaining / 4);
    let extra = remaining % 4;
    fourPhases.forEach((phase) => {
        const count = perPhase + (extra > 0 ? 1 : 0);
        if (extra > 0) extra--;
        for (let i = 0; i < count; i++) plan.push(phase);
    });
    for (let i = 0; i < codeLevels; i++) plan.push('code');
    for (let i = 0; i < escapeLevels; i++) plan.push('escape');
    return plan;
}

function getTimeForGrade(gradeKey) {
    const gradeNum = parseInt(gradeKey) || 1;
    return BASE_TIME + (gradeNum - 1); // grade 1 = 5s, grade 2 = 6s, ..., grade 12 = 16s
}

// ═══════════════════════════════════════
//  COMIC SCENE COMPONENTS (SVG Art)
// ═══════════════════════════════════════
import {
    VaultScene, VaultSuccessScene, VaultFailScene,
    EquipScene, EquipWrongScene,
    HackScene, HackFailScene,
    StealthScene, StealthFailScene,
    CodeScene, EscapeScene,
    CaughtScene, GrabMoneyScene,
    GrabItemScene, HackSuccessScene, StealthSuccessScene, CodeSuccessScene,
} from './ComicScenesMemo';
import MathAdventure from './MathAdventure';

// Scene picker
function PhaseScene({ phaseId, feedback, lastWrongItem, playerPos }) {
    if (feedback === 'correct') {
        if (phaseId === 'money') return <GrabMoneyScene />;
        if (phaseId === 'equip') return <GrabItemScene />;
        if (phaseId === 'hack') return <HackSuccessScene />;
        if (phaseId === 'stealth') return <StealthSuccessScene />;
        if (phaseId === 'code') return <CodeSuccessScene />;
        // Escape handled by victory screen or default
    }
    if (feedback === 'timeout') {
        return <CaughtScene />;
    }
    if (feedback === 'incorrect') {
        if (phaseId === 'money') return <VaultFailScene />;
        if (phaseId === 'equip') return <EquipWrongScene />;
        if (phaseId === 'hack') return <HackFailScene />;
        if (phaseId === 'stealth') return <StealthFailScene />;
        return <CaughtScene />; // Fallback
    }
    // Default scenes
    if (phaseId === 'money') return <VaultScene />;
    if (phaseId === 'equip') return <EquipScene />;
    if (phaseId === 'hack') return <HackScene />;
    if (phaseId === 'stealth') return <StealthScene />;
    if (phaseId === 'code') return <CodeScene />;
    if (phaseId === 'escape') return <EscapeScene playerPos={playerPos} />;
    return null;
}

// ═══════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════
const MathMission = () => {
    const { user, profile, loading: authLoading, updateMoney } = useAuth(); // Destructure profile

    useEffect(() => {
        if (profile) {
            console.log('User Profile Structure:', profile);
        }
    }, [profile]);

    // Selection state
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedMode, setSelectedMode] = useState(null);

    // Game state
    const [gameStarted, setGameStarted] = useState(false);
    const [levelPlan, setLevelPlan] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [problem, setProblem] = useState({ display: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [money, setMoney] = useState(0);
    const [equipment, setEquipment] = useState([]);
    const [wrongItems, setWrongItems] = useState([]);
    const [showPhaseIntro, setShowPhaseIntro] = useState(false);
    const [currentPhaseId, setCurrentPhaseId] = useState(null);
    const [shaking, setShaking] = useState(false);
    const [gameOver, setGameOver] = useState(null);
    const [moneyAnim, setMoneyAnim] = useState(false);
    const [lives, setLives] = useState(3);
    const [playerPos, setPlayerPos] = useState(10);
    const [lastWrongItem, setLastWrongItem] = useState(null);
    const [extraLevels, setExtraLevels] = useState([]);

    // Per-problem timer
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    const timerRef = useRef(null);
    const inputRef = useRef(null);

    // Cutscene state
    const [cutscene, setCutscene] = useState(null); // { emoji, title, sub, type: 'success'|'fail' }

    // ── Auth guard ──
    if (!authLoading && !user) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <LogIn size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <span className="text-gradient">Login Required</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                    You need to log in to play missions.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem' }}>Log In</Link>
                    <Link to="/signup" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem' }}>Sign Up</Link>
                </div>
            </div>
        );
    }

    // ── Timer per problem: base 5s + 1s per grade ──
    const problemTime = getTimeForGrade(selectedGrade);

    // ── Start mission ──
    const startMission = () => {
        const plan = distributePhases(DIFFICULTY_LEVELS[selectedDifficulty]);
        setLevelPlan(plan);
        setCurrentLevel(0);
        setMoney(0);
        setEquipment([]);
        setWrongItems([]);
        setExtraLevels([]);
        setLives(3);
        setGameOver(null);
        setPlayerPos(10);
        setGameStarted(true);
        setCutscene(null);
        setLastWrongItem(null);
        setCurrentPhaseId(plan[0]);
        setShowPhaseIntro(true);
    };

    // ── Generate problem & start timer ──
    const genProblem = useCallback(() => {
        const p = generateProblem(selectedGrade, selectedTopic, selectedDifficulty);
        setProblem(p);
        setUserAnswer('');
        setFeedback(null);
        setCutscene(null);
        // Start per-problem timer
        const t = getTimeForGrade(selectedGrade);
        setMaxTime(t);
        setTimeLeft(t);
        setTimerActive(true);
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [selectedGrade, selectedTopic, selectedDifficulty]);

    // ── Phase intro dismiss ──
    const dismissPhaseIntro = () => {
        setShowPhaseIntro(false);
        genProblem();
    };

    // ── Timer effect ──
    useEffect(() => {
        if (!timerActive) return;
        if (timeLeft <= 0) {
            setTimerActive(false);
            handleTimeout();
            return;
        }
        timerRef.current = setTimeout(() => {
            setTimeLeft((prev) => Math.max(0, +(prev - 0.1).toFixed(1)));
        }, 100);
        return () => clearTimeout(timerRef.current);
    }, [timerActive, timeLeft]);

    // ── Handle timeout ──
    const handleTimeout = () => {
        const phaseId = levelPlan[currentLevel];
        setFeedback('timeout');
        setShaking(true);
        setTimeout(() => setShaking(false), 500);

        // Immediate Game Over on timeout (User Request: "caught is game over")
        // "Caught" logic applies to running out of time in any phase generally in this context
        // showing the CaughtScene
        setCutscene({ emoji: '🕵️‍♂️❌', title: 'CAUGHT!', sub: 'You ran out of time!', type: 'fail' });

        setTimeout(() => {
            setCutscene(null);
            setGameOver('lose');
        }, 2000);
    };

    // ── Handle answer submission ──
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer.trim()) return;
        const parsed = parseFloat(userAnswer);
        const phaseId = levelPlan[currentLevel];
        setTimerActive(false);

        if (parsed === problem.answer) {
            // ─── CORRECT ───
            setFeedback('correct');
            const cut = CUTSCENES[phaseId]?.success;

            if (phaseId === 'money') {
                const earned = Math.floor(Math.random() * 500) + 200;
                setMoney((m) => m + earned);
                setMoneyAnim(true);
                setTimeout(() => setMoneyAnim(false), 600);
            }
            if (phaseId === 'equip' && equipment.length < EQUIPMENT_ITEMS.length) {
                setEquipment((eq) => [...eq, EQUIPMENT_ITEMS[eq.length]]);
            }
            if (phaseId === 'escape') {
                setPlayerPos(80);
            }

            if (cut) {
                setCutscene({ ...cut, type: 'success' });
                setTimeout(() => {
                    setCutscene(null);
                    advanceLevel();
                }, 1800);
            } else {
                setTimeout(() => advanceLevel(), 1000);
            }
        } else {
            // ─── WRONG ───
            setFeedback('incorrect');
            setShaking(true);
            setTimeout(() => setShaking(false), 500);

            const cut = CUTSCENES[phaseId]?.fail;

            // Strict Game Over phases
            const isCriticalPhase = ['stealth', 'hack', 'escape', 'money'].includes(phaseId);

            if (isCriticalPhase) {
                // Critical failure = Game Over
                if (cut) {
                    setCutscene({ ...cut, type: 'fail' });
                    setTimeout(() => {
                        setCutscene(null);
                        setGameOver('lose');
                    }, 2000);
                } else {
                    setTimeout(() => setGameOver('lose'), 1000);
                }
                return;
            }

            // Non-critical failure (Quality of Life: Equip, Code) -> Lose Life
            if (phaseId === 'equip') {
                const wi = WRONG_ITEMS[Math.floor(Math.random() * WRONG_ITEMS.length)];
                setLastWrongItem(wi);
                setWrongItems(prev => [...prev, wi]);
                // We do NOT add extra levels anymore to avoid the "after helicopter" bug
                // Instead, they just proceed with the wrong item (penalty enough)
            }

            if (cut) {
                setCutscene({ ...cut, type: 'fail' });
                setTimeout(() => {
                    setCutscene(null);
                    const newLives = lives - 1;
                    setLives(newLives);
                    if (newLives <= 0) {
                        setGameOver('lose');
                    } else {
                        // For non-critical phases, we just move on or retry?
                        // Let's advance logic: "Wrong item" -> move on.
                        // "Code" -> move on? or retry?
                        // To keep flow moving and prevent getting stuck: Advance.
                        advanceLevel();
                    }
                }, 2000);
            } else {
                const newLives = lives - 1;
                setLives(newLives);
                if (newLives <= 0) {
                    setTimeout(() => setGameOver('lose'), 800);
                } else {
                    // Retry same problem for generic failures?
                    // actually, let's keep it simple: Advance to prevent frustration loops
                    // EXCEPT for 'code' maybe?
                    // Let's advance to ensure progress.
                    setTimeout(() => advanceLevel(), 1000);
                }
            }
        }
    };

    // ── Advance to next level ──
    const advanceLevel = () => {
        const nextLevel = currentLevel + 1;
        if (nextLevel >= levelPlan.length) {
            setGameOver('win');
            const gradeNum = parseInt(selectedGrade) || 1;
            const diffMultiplier = { easy: 1, normal: 2, medium: 3, hard: 4 }[selectedDifficulty] || 1;
            const reward = gradeNum * 100 * diffMultiplier;
            updateMoney(reward); // Reward scales with grade & difficulty
            return;
        }

        const nextPhaseId = levelPlan[nextLevel];
        const currentPhase = levelPlan[currentLevel];

        setCurrentLevel(nextLevel);

        if (nextPhaseId !== currentPhase) {
            setCurrentPhaseId(nextPhaseId);
            setShowPhaseIntro(true);
        } else {
            genProblem();
        }
    };

    // ── Back navigation ──
    const goBack = () => {
        if (gameStarted) {
            setGameStarted(false);
            setGameOver(null);
            setTimerActive(false);
            setSelectedDifficulty(null);
        } else if (selectedDifficulty) {
            setSelectedDifficulty(null);
        } else if (selectedTopic) {
            setSelectedTopic(null);
        } else if (selectedGrade) {
            setSelectedGrade(null);
        } else {
            setSelectedMode(null);
        }
    };

    const restart = () => {
        setGameStarted(false);
        setGameOver(null);
        setTimerActive(false);
        setSelectedDifficulty(null);
        setCutscene(null);
    };

    // ═══════════════════════════════════════
    //  RENDER: SELECTION SCREENS
    // ═══════════════════════════════════════

    // SCREEN 1: Mode Selection
    if (selectedMode === null) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Crosshair size={48} style={{ color: '#e94560', marginBottom: '0.75rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        <span className="text-gradient">Math Mission</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>How do you want to play?</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                        { id: 'mission', emoji: '🕵️', name: 'Mission', desc: 'Spy heist with phases', border: '#e94560' },
                        { id: 'adventure', emoji: '⚔️', name: 'Adventure', desc: 'High stakes exploration', border: '#6c5ce7' },
                        { id: 'practice', emoji: '📝', name: 'Practice', desc: 'Just the problems', border: '#00b894' },
                    ].map((mode) => (
                        <button key={mode.id} className="mode-card"
                            onClick={() => setSelectedMode(mode.id)}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = mode.border; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                            <div className="mode-emoji">{mode.emoji}</div>
                            <div className="mode-name">{mode.name}</div>
                            <div className="mode-desc">{mode.desc}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // SCREEN 2: Grade Selection
    if (!selectedGrade) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                    <ArrowLeft size={20} /> Back to Modes
                </button>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        <span className="text-gradient">Choose Your Grade</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Higher grade = more time per problem</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                    {Object.entries(gradeConfigs).map(([key, config]) => {
                        const t = getTimeForGrade(key);
                        return (
                            <button key={key} onClick={() => setSelectedGrade(key)}
                                style={{ padding: '1.25rem 0.5rem', background: 'var(--bg-darker)', border: '3px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center', boxShadow: '0 4px 0 rgba(0,0,0,0.3)' }}
                                onMouseOver={(e) => { e.currentTarget.style.borderColor = config.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{config.emoji}</div>
                                <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}>{config.name}</div>
                                <div style={{ color: '#ffd700', fontSize: '0.7rem', marginTop: '0.35rem', fontWeight: '600' }}>⏱️ {t}s per problem</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // SCREEN 3: Topic Selection
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
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Choose your mission topic</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {grade.topics.map((topic) => (
                        <button key={topic.id} onClick={() => setSelectedTopic(topic.id)}
                            style={{ padding: '1.25rem 1rem', background: 'var(--bg-darker)', border: '3px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center', boxShadow: '0 4px 0 rgba(0,0,0,0.3)' }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = grade.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{topic.emoji}</div>
                            <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.95rem' }}>{topic.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // SCREEN 4: Difficulty Selection
    if (!selectedDifficulty) {
        const grade = gradeConfigs[selectedGrade];
        const topic = grade.topics.find(t => t.id === selectedTopic);
        const difficulties = [
            { key: 'easy', label: 'Easy', desc: '5 levels' },
            { key: 'normal', label: 'Normal', desc: '7 levels' },
            { key: 'medium', label: 'Medium', desc: '10 levels' },
            { key: 'hard', label: 'Hard', desc: '15 levels' },
        ];
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                    <ArrowLeft size={20} /> Back to Topics
                </button>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{topic.emoji}</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{topic.name}</h2>
                    <p style={{ color: grade.color, fontWeight: '600', fontSize: '0.95rem' }}>{grade.name} • ⏱️ {problemTime}s per problem</p>
                </div>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.25rem', textTransform: 'uppercase' }}>
                    <Target size={20} style={{ display: 'inline', marginRight: '0.5rem' }} /> Select Difficulty
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {difficulties.map(({ key, label, desc }) => {
                        const colors = difficultyColors[key];
                        return (
                            <button key={key} onClick={() => setSelectedDifficulty(key)}
                                style={{ padding: '1.5rem', background: colors.bg, border: `3px solid ${colors.border}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center', boxShadow: '0 4px 0 rgba(0,0,0,0.3)' }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
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

    // ═══════════════════════════════════════
    //  RENDER: ADVENTURE MODE
    // ═══════════════════════════════════════
    if (selectedMode === 'adventure') {
        return <MathAdventure onBack={goBack} grade={selectedGrade} difficulty={selectedDifficulty} />;
    }

    // ═══════════════════════════════════════
    //  RENDER: MISSION GAMEPLAY
    // ═══════════════════════════════════════

    // Mission brief
    if (!gameStarted && !gameOver) {
        const totalLevels = DIFFICULTY_LEVELS[selectedDifficulty];
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                <button onClick={goBack} className="btn-ghost" style={{ marginBottom: '1.5rem', padding: '0.75rem 1.25rem' }}>
                    <ArrowLeft size={20} /> Back
                </button>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕵️</div>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <span className="text-gradient">Mission Briefing</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    <strong style={{ color: '#e94560' }}>{totalLevels} levels</strong> •
                    <strong style={{ color: '#ffd700' }}> ⏱️ {problemTime}s</strong> per problem •
                    <strong style={{ color: '#ff6b81' }}> ❤️ 3 lives</strong>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                    {PHASES.map((p) => (
                        <div key={p.id} style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>{p.emoji}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>{p.name}</div>
                        </div>
                    ))}
                </div>
                <button onClick={startMission} className="btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}>
                    <Crosshair size={22} /> Start Mission
                </button>
            </div>
        );
    }

    // ── Game Over ──
    if (gameOver) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '550px', margin: '0 auto', padding: '3rem' }}>
                <div className={`mission-result ${gameOver}`}>
                    <div className="result-emoji">{gameOver === 'win' ? '🏆' : '💀'}</div>
                    <div className="result-title">{gameOver === 'win' ? 'Mission Complete!' : 'Mission Failed!'}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                        {gameOver === 'win'
                            ? `You escaped with $${money.toLocaleString()}! ${equipment.length} gear items secured.`
                            : 'You were caught! Better luck next time, agent.'}
                    </p>
                    {wrongItems.length > 0 && (
                        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(233,69,96,0.1)', borderRadius: '10px', border: '2px solid rgba(233,69,96,0.3)' }}>
                            <div style={{ fontSize: '0.75rem', color: '#ff6b81', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Wrong Items Grabbed:</div>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {wrongItems.map((wi, i) => <span key={i} title={wi.name} style={{ fontSize: '1.5rem' }}>{wi.emoji}</span>)}
                            </div>
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffd700' }}>${money}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Earned</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#55efc4' }}>{currentLevel}/{levelPlan.length}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Levels</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#e94560' }}>{equipment.length}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gear</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={restart} className="btn-primary" style={{ fontSize: '1rem' }}>
                            <RefreshCw size={18} /> Try Again
                        </button>
                        <button onClick={() => { setGameStarted(false); setGameOver(null); setSelectedGrade(null); setSelectedTopic(null); setSelectedDifficulty(null); setSelectedMode(null); }} className="btn-ghost">
                            New Mission
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Phase Intro Comic Panel ──
    if (showPhaseIntro && currentPhaseId) {
        const phase = PHASES.find(p => p.id === currentPhaseId);
        return (
            <div className="comic-overlay" onClick={dismissPhaseIntro}>
                <div className="comic-panel">
                    <div className="action-lines" />
                    <div className="phase-emoji">{phase.emoji}</div>
                    <div className="phase-title">{phase.name}</div>
                    <div className="phase-desc">{phase.desc}</div>
                    <button className="comic-btn" onClick={dismissPhaseIntro}>GO! →</button>
                </div>
            </div>
        );
    }

    // ── Cutscene Overlay ──
    if (cutscene) {
        return (
            <div className="comic-cutscene">
                <div className={`cutscene-panel cutscene-${cutscene.type}`}>
                    <div className="action-lines" />
                    <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{cutscene.emoji}</div>
                    <div className="cutscene-text">{cutscene.title}</div>
                    <div className="cutscene-subtext">{cutscene.sub}</div>
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════
    //  RENDER: ACTIVE GAMEPLAY
    // ═══════════════════════════════════════
    const phaseId = levelPlan[currentLevel];
    const phase = PHASES.find(p => p.id === phaseId);
    const timerPercent = maxTime > 0 ? (timeLeft / maxTime) * 100 : 100;
    const timerClass = timerPercent > 50 ? 'safe' : timerPercent > 25 ? 'warning' : 'danger';

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '650px', margin: '0 auto', padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button onClick={goBack} className="btn-ghost" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem' }}>
                    <ArrowLeft size={14} /> Abort
                </button>
                <div className="phase-badge" style={{ background: 'rgba(233,69,96,0.15)', border: '2px solid #e94560', color: '#ff6b81' }}>
                    {phase.emoji} {phase.name}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div className="money-display" style={{ position: 'relative' }}>
                        💰 ${money.toLocaleString()}
                        {moneyAnim && <span className="money-add">+$$</span>}
                    </div>
                    <div style={{ color: '#e94560', fontWeight: '800', fontSize: '0.9rem' }}>
                        {'❤️'.repeat(lives)}
                    </div>
                </div>
            </div>

            {/* Timer Bar — always visible */}
            <div className="timer-container">
                <div className={`timer-bar ${timerClass}`} style={{ width: `${timerPercent}%` }} />
            </div>
            <div style={{ textAlign: 'center', fontWeight: '800', fontSize: '1.1rem', color: timerPercent > 25 ? '#55efc4' : '#e94560', marginBottom: '0.25rem' }}>
                ⏱️ {timeLeft.toFixed(1)}s
            </div>

            {/* Level Progress */}
            <div className="level-progress">
                {levelPlan.map((_, i) => (
                    <div key={i} className={`level-dot ${i < currentLevel ? 'completed' : i === currentLevel ? 'current' : ''}`} />
                ))}
            </div>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                Level {currentLevel + 1} of {levelPlan.length}
            </div>

            {/* Comic Scene Illustration */}
            <PhaseScene phaseId={phaseId} feedback={feedback} lastWrongItem={lastWrongItem} playerPos={playerPos} />

            {/* Equipment Bar */}
            {(equipment.length > 0 || wrongItems.length > 0) && (
                <div className="equipment-grid">
                    {equipment.map((item, i) => (
                        <div key={`good-${i}`} className="equipment-item owned">{item.emoji} {item.name}</div>
                    ))}
                    {wrongItems.map((item, i) => (
                        <div key={`bad-${i}`} className="equipment-item wrong">{item.emoji} {item.name}</div>
                    ))}
                </div>
            )}

            {/* Problem */}
            <div className={`mission-problem ${shaking ? 'shake' : ''}`}>
                {problem.display}
            </div>

            {/* Answer Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '320px', margin: '0 auto' }}>
                <input
                    ref={inputRef}
                    type="number"
                    step="any"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your Answer"
                    className="input input-lg"
                    autoFocus
                    style={{ fontWeight: '700', textAlign: 'center', fontSize: '1.25rem' }}
                />
                <button type="submit" className="btn-primary" style={{ fontSize: '1rem' }}>
                    <Check size={18} /> Submit
                </button>
            </form>

            {/* Feedback */}
            {feedback && (
                <div className="animate-fade-in" style={{
                    marginTop: '0.75rem', fontSize: '1.1rem', fontWeight: '700', textAlign: 'center',
                    color: feedback === 'correct' ? 'var(--success)' : 'var(--error)',
                    textTransform: 'uppercase',
                }}>
                    {feedback === 'correct'
                        ? <><Check size={20} /> Correct!</>
                        : feedback === 'timeout'
                            ? <><X size={20} /> Time's Up! Answer: {problem.answer}</>
                            : <><X size={20} /> Wrong! Answer: {problem.answer}</>
                    }
                </div>
            )}
        </div>
    );
};

export default MathMission;
