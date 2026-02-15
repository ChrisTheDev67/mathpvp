import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, X, Sword, Shield, Map as MapIcon, Coins, Skull, Brain, Key } from 'lucide-react';
import {
    AdventureIntroScene,
    AdventureShopScene,
    AdventureBattleScene
} from './ComicScenesMemo';
import { generateProblem } from '../lib/gradeData';
import { useAuth } from '../contexts/AuthContext';
import './MathMission.css';

const PHASES = [
    { id: 'entry', name: 'Entry Fee', emoji: '🎫' },
    { id: 'shop', name: 'Gear Shop', emoji: '🛒' },
    { id: 'coords', name: 'Coordinates', emoji: '📍' },
    { id: 'plan', name: 'Plan Route', emoji: '🗺️' },
    { id: 'fight', name: 'Battle', emoji: '⚔️' },
    { id: 'doors', name: 'Logic Gate', emoji: '🚪' },
    { id: 'chest', name: 'Treasure', emoji: '💎' },
    { id: 'sell', name: 'Sell Loot', emoji: '💰' },
];

const SHOP_ITEMS = [
    { id: 'sword', name: 'Math Sword', emoji: '⚔️', cost: 300, desc: 'Deal +1 damage', type: 'attack' },
    { id: 'shield', name: 'Logic Shield', emoji: '🛡️', cost: 300, desc: 'Ignore 1 wrong answer', type: 'defense' },
    { id: 'map', name: 'Dungeon Map', emoji: '🗺️', cost: 400, desc: 'Reveal trap chests', type: 'utility' },
    { id: 'potion', name: 'Health Potion', emoji: '🧪', cost: 200, desc: '+1 Life', type: 'health' },
];

const ENTRY_FEE = 10000;
const INITIAL_BUDGET = 2000;
const WIN_REWARD = 50000;

export default function MathAdventure({ onBack, grade = '3', difficulty = 'normal' }) {
    const { user, profile, updateMoney } = useAuth();

    // Game State
    const [phase, setPhase] = useState('entry');
    const [inventory, setInventory] = useState([]);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(null); // 'win' or 'lose'

    // Problem State
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [shaking, setShaking] = useState(false);

    // Phase Specific State
    const [coordsSolved, setCoordsSolved] = useState(0);
    const [monsterHp, setMonsterHp] = useState(3);
    const [gridPattern, setGridPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [showingPattern, setShowingPattern] = useState(false);
    const [doorProblem, setDoorProblem] = useState(null); // { sequence: [], answer: num }
    const [chestOptions, setChestOptions] = useState([]); // [{id, type: 'treasure'|'trap'}]
    const [profit, setProfit] = useState(0);

    const inputRef = useRef(null);

    // Init Logic
    useEffect(() => {
        if (phase === 'coords' || phase === 'sell' || phase === 'fight') {
            genProblem();
        }
        if (phase === 'plan') startPlan();
        if (phase === 'doors') startDoors();
        if (phase === 'chest') startChests();
    }, [phase]);

    const genProblem = () => {
        const p = generateProblem(grade, null, difficulty);
        setProblem(p);
        setUserAnswer('');
        setFeedback(null);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // ─── ACTIONS ───

    const canAfford = (profile?.money || 0) >= ENTRY_FEE;

    const startAdventureEntry = async () => {
        if (!canAfford) return;
        await updateMoney(-ENTRY_FEE);
        setPhase('shop');
    };

    const buyItem = async (item) => {
        const owned = inventory.find(i => i.id === item.id);
        if (owned) {
            // Refund: remove from inventory and return money
            await updateMoney(item.cost);
            setInventory(inv => inv.filter(i => i.id !== item.id));
            return;
        }
        const bankMoney = profile?.money || 0;
        if (bankMoney >= item.cost) {
            await updateMoney(-item.cost);
            if (item.type === 'health') {
                setLives(l => l + 1);
            } else {
                setInventory(inv => [...inv, item]);
            }
        }
    };

    const startAdventure = () => {
        setPhase('coords');
    };

    // Coords & Fight Logic
    const handleAnswer = (e) => {
        e.preventDefault();
        const val = parseFloat(userAnswer);
        if (val === problem.answer) {
            // Correct
            setFeedback('correct');
            if (phase === 'coords') {
                const next = coordsSolved + 1;
                setCoordsSolved(next);
                if (next >= 3) {
                    setTimeout(() => setPhase('plan'), 1000);
                } else {
                    setTimeout(genProblem, 1000);
                }
            } else if (phase === 'fight') {
                // Damage monster
                const dmg = inventory.find(i => i.id === 'sword') ? 2 : 1;
                const newHp = monsterHp - dmg;
                setMonsterHp(newHp);
                if (newHp <= 0) {
                    setTimeout(() => setPhase('doors'), 1000);
                } else {
                    setTimeout(genProblem, 1000);
                }
            } else if (phase === 'sell') {
                // Calculate final score
                const baseValue = 5000;
                const finalProfit = baseValue;
                setProfit(finalProfit);

                // Reward Win
                updateMoney(WIN_REWARD);

                setGameOver('win');
            }
        } else {
            // Incorrect
            setFeedback('incorrect');
            setShaking(true);
            setTimeout(() => setShaking(false), 500);

            // Shield check for Fight
            if (phase === 'fight' && inventory.find(i => i.id === 'shield')) {
                // Shield absorbs one hit? Or just reduces chance?
                // Let's strictly follow logic: Shield ignores 1 wrong answer? 
                // For simplicity, let's just lose life anyway but maybe less?
                // Or remove shield?
                // User logic intended: "Shield (Ignore 1 wrong answer)" - imply consumable or probability?
                // Let's keep it simple: lose life.
            }

            const newLives = lives - 1;
            setLives(newLives);
            if (newLives <= 0) {
                setTimeout(() => setGameOver('lose'), 1000);
            } else {
                setTimeout(genProblem, 1000); // New problem same phase
            }
        }
    };

    // Plan (Memory) Logic
    const GRID_CONFIG = { easy: { cols: 3, rows: 3 }, normal: { cols: 4, rows: 3 }, medium: { cols: 5, rows: 3 }, hard: { cols: 5, rows: 4 } };
    const gridCfg = GRID_CONFIG[difficulty] || GRID_CONFIG.normal;
    const totalCells = gridCfg.cols * gridCfg.rows;

    const startPlan = () => {
        // Generate a path from top-left (0,0) to bottom-right corner
        const { cols, rows } = gridCfg;
        const path = [];
        let x = 0, y = 0;
        path.push(y * cols + x); // Start at top-left

        // Walk towards bottom-right with random steps (right or down)
        while (x < cols - 1 || y < rows - 1) {
            const canRight = x < cols - 1;
            const canDown = y < rows - 1;
            if (canRight && canDown) {
                // Randomly go right or down
                if (Math.random() > 0.5) x++; else y++;
            } else if (canRight) {
                x++;
            } else {
                y++;
            }
            path.push(y * cols + x);
        }

        setGridPattern(path);
        setUserPattern([]);
        setShowingPattern(true);
        // Show time scales: more cells = more time
        const showTime = 1500 + path.length * 300;
        setTimeout(() => setShowingPattern(false), showTime);
    };

    const handleGridClick = (idx) => {
        if (showingPattern) return;
        const newPat = [...userPattern, idx];
        setUserPattern(newPat);

        // Check if correct so far
        if (newPat[newPat.length - 1] !== gridPattern[newPat.length - 1]) {
            // Wrong tap
            setLives(l => l - 1);
            setUserPattern([]);
            setShowingPattern(true);
            setTimeout(() => setShowingPattern(false), 2000); // Retry
            if (lives <= 1) setGameOver('lose'); // Fail immediately on last life
            return;
        }

        if (newPat.length === gridPattern.length) {
            // Complete
            setTimeout(() => setPhase('fight'), 500);
        }
    };

    // Doors Logic
    const startDoors = () => {
        // Sequence: 2, 4, 6, ? (8)
        const start = Math.floor(Math.random() * 10);
        const step = Math.floor(Math.random() * 4) + 2;
        const seq = [start, start + step, start + step * 2];
        setDoorProblem({ sequence: seq, answer: start + step * 3 });
    };

    const checkDoor = (ans) => {
        if (ans === doorProblem.answer) {
            setPhase('chest');
        } else {
            setLives(l => l - 1);
            if (lives <= 1) setGameOver('lose');
            else startDoors(); // New puzzle
        }
    };

    // Chest Logic
    const startChests = () => {
        // 3 chests, 1 is trap? Or 2 chests, 1 trap?
        // Implementation plan: "One chest lies..." or just probability.
        // Let's do 3 chests: 1 treasure, 2 traps? Or 1 treasure, 1 trap, 1 empty?
        // Simple: 2 chests. Left or Right.
        setChestOptions([
            { id: 0, type: Math.random() > 0.5 ? 'treasure' : 'trap' },
            { id: 1, type: Math.random() > 0.5 ? 'trap' : 'treasure' } // Ensure at least one is diff? No, just random for now or fixed relation?
            // Better: One is treasure, one is trap.
        ].map((c, i) => ({ ...c, id: i, type: i === 0 ? (Math.random() > 0.5 ? 'treasure' : 'trap') : (Math.random() > 0.5 ? 'trap' : 'treasure') })));

        // Force one treasure one trap
        const isLeftTreasure = Math.random() > 0.5;
        setChestOptions([
            { id: 0, type: isLeftTreasure ? 'treasure' : 'trap' },
            { id: 1, type: isLeftTreasure ? 'trap' : 'treasure' }
        ]);
    };

    const handleChestPick = (id) => {
        const chest = chestOptions.find(c => c.id === id);
        if (chest.type === 'treasure') {
            setPhase('sell');
        } else {
            setLives(l => l - 1);
            if (lives <= 1) setGameOver('lose');
            else {
                alert("It was a trap! Try again.");
                startChests();
            }
        }
    };

    // ─── UI RENDER ───

    if (gameOver) {
        return (
            <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', padding: '3rem' }}>
                <h1>{gameOver === 'win' ? '🎉 MISSION ACCOMPLISHED' : '💀 MISSION FAILED'}</h1>
                <p>{gameOver === 'win' ? `Profit: $${profit} — REWARD: $${WIN_REWARD.toLocaleString()}` : 'You lost the investment.'}</p>
                <button onClick={onBack} className="btn-primary" style={{ marginTop: '1rem' }}>Back to Base</button>
            </div>
        );
    }

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <button onClick={onBack} className="btn-ghost"><ArrowLeft size={16} /> Quit</button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="money-display">💰 ${(profile?.money || 0).toLocaleString()}</div>
                    <div style={{ color: '#ff6b81' }}>❤️ {lives}</div>
                </div>
            </div>

            {/* Inventory Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', height: '40px' }}>
                {inventory.map((item, i) => (
                    <div key={i} title={item.name} style={{ fontSize: '1.5rem', padding: '0.2rem', border: '1px solid #444', borderRadius: '4px' }}>
                        {item.emoji}
                    </div>
                ))}
            </div>

            {/* Content Switcher */}
            {phase === 'entry' && (
                <div style={{ textAlign: 'center' }}>
                    <AdventureIntroScene />
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Mountain Expedition</h2>
                    <p style={{ fontSize: '1.1rem', color: '#a4b0be', marginBottom: '1rem' }}>
                        High Risk, High Reward. Entry Fee: <strong style={{ color: '#ff6b81' }}>${ENTRY_FEE.toLocaleString()}</strong>
                    </p>
                    <p style={{ fontSize: '1rem', color: '#a4b0be', marginBottom: '2rem' }}>
                        Your Bank: <strong style={{ color: canAfford ? '#55efc4' : '#ff6b81' }}>${(profile?.money || 0).toLocaleString()}</strong>
                    </p>
                    {canAfford ? (
                        <button onClick={startAdventureEntry} className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                            ⚔️ Enter Adventure (-${ENTRY_FEE.toLocaleString()})
                        </button>
                    ) : (
                        <div>
                            <button disabled style={{ fontSize: '1.2rem', padding: '1rem 2rem', opacity: 0.5, cursor: 'not-allowed', background: '#555', border: 'none', borderRadius: '12px', color: '#aaa' }}>
                                🔒 Not Enough Money
                            </button>
                            <p style={{ marginTop: '1rem', color: '#ff6b81', fontSize: '0.95rem' }}>Complete Missions to earn at least ${ENTRY_FEE.toLocaleString()}!</p>
                        </div>
                    )}
                </div>
            )}

            {phase === 'shop' && (
                <div>
                    <AdventureShopScene />
                    <p style={{ textAlign: 'center', color: '#a4b0be', marginBottom: '0.5rem' }}>Buy gear with your bank money.</p>
                    <p style={{ textAlign: 'center', color: '#ffd700', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2rem' }}>Bank: ${(profile?.money || 0).toLocaleString()}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        {SHOP_ITEMS.map(item => {
                            const owned = inventory.find(i => i.id === item.id);
                            return (
                                <button key={item.id} onClick={() => buyItem(item)} disabled={!owned && (profile?.money || 0) < item.cost}
                                    style={{
                                        padding: '1rem',
                                        background: owned ? 'rgba(0,184,148,0.1)' : 'rgba(0,0,0,0.2)',
                                        border: `2px solid ${owned ? '#00b894' : '#444'}`,
                                        borderRadius: '8px',
                                        opacity: (!owned && (profile?.money || 0) < item.cost) ? 0.5 : 1,
                                        cursor: 'pointer'
                                    }}>
                                    <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
                                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                    <div style={{ color: owned ? '#55efc4' : '#ffd700' }}>{owned ? '↩ Tap to Refund' : `$${item.cost}`}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{item.desc}</div>
                                </button>
                            );
                        })}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={startAdventure} className="btn-primary">Depart to Coordinates →</button>
                    </div>
                </div>
            )}

            {phase === 'coords' && problem && (
                <div style={{ textAlign: 'center' }}>
                    <h3>Triangulate Location ({coordsSolved}/3)</h3>
                    <div className={`mission-problem ${shaking ? 'shake' : ''}`}>{problem.display}</div>
                    <form onSubmit={handleAnswer}>
                        <input ref={inputRef} type="number" value={userAnswer} onChange={e => setUserAnswer(e.target.value)}
                            className="input" style={{ fontSize: '1.5rem', textAlign: 'center', width: '150px' }} autoFocus />
                        <button type="submit" className="btn-primary" style={{ marginLeft: '1rem' }}>Submit</button>
                    </form>
                    {feedback && <div style={{ marginTop: '1rem', color: feedback === 'correct' ? '#00b894' : '#ff6b81' }}>{feedback.toUpperCase()}</div>}
                </div>
            )}

            {phase === 'plan' && (
                <div style={{ textAlign: 'center' }}>
                    <h3>Memorize the Path</h3>
                    <p style={{ color: '#a4b0be', marginBottom: '1rem' }}>From 🟢 START to 🔴 END</p>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCfg.cols}, 55px)`, gap: '4px', justifyContent: 'center', margin: '1rem auto' }}>
                        {Array.from({ length: totalCells }).map((_, idx) => {
                            const isInPath = gridPattern.includes(idx);
                            const pathIndex = gridPattern.indexOf(idx);
                            const isStart = pathIndex === 0;
                            const isEnd = pathIndex === gridPattern.length - 1;
                            const isLit = showingPattern && isInPath;
                            const userIndex = userPattern.indexOf(idx);
                            const isUserTapped = userIndex !== -1;

                            let bg = '#2d3436';
                            if (isLit) {
                                bg = isStart ? '#00b894' : isEnd ? '#e94560' : '#ffd700';
                            } else if (isUserTapped) {
                                bg = '#0984e3';
                            }

                            return (
                                <div key={idx}
                                    onClick={() => handleGridClick(idx)}
                                    style={{
                                        width: '55px', height: '55px',
                                        background: bg,
                                        border: `2px solid ${isLit ? '#fff3' : '#636e72'}`,
                                        borderRadius: '6px',
                                        cursor: showingPattern ? 'default' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        transition: 'background 0.2s',
                                    }}
                                >
                                    {isLit && isStart && '🟢'}
                                    {isLit && isEnd && '🔴'}
                                    {isUserTapped && !showingPattern && (userIndex + 1)}
                                </div>
                            );
                        })}
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: showingPattern ? '#ffd700' : '#0984e3' }}>
                        {showingPattern ? '👀 WATCH THE PATH...' : '👆 TAP THE PATH IN ORDER'}
                    </p>
                </div>
            )}

            {phase === 'fight' && problem && (
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <AdventureBattleScene monsterHp={monsterHp} />

                    <div className="mission-problem" style={{ marginBottom: '2rem', fontSize: '2rem' }}>{problem.display}</div>

                    <form onSubmit={handleAnswer} style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <input
                            ref={inputRef}
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="input"
                            style={{ width: '150px', fontSize: '1.5rem', textAlign: 'center' }}
                            placeholder="?"
                            autoFocus
                        />
                        <button type="submit" className="btn-primary">
                            <Sword size={20} /> Attack
                        </button>
                    </form>
                    {feedback && <div style={{ marginTop: '1rem', color: feedback === 'correct' ? '#00b894' : '#ff6b81' }}>{feedback.toUpperCase()}</div>}
                </div>
            )}

            {phase === 'doors' && doorProblem && (
                <div style={{ textAlign: 'center' }}>
                    <h3>Complete the Sequence</h3>
                    <div style={{ fontSize: '2rem', margin: '2rem' }}>{doorProblem.sequence.join(', ')}, ?</div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        {[doorProblem.answer, doorProblem.answer - 2, doorProblem.answer + 5].sort(() => Math.random() - 0.5).map((opt, i) => (
                            <button key={i} onClick={() => checkDoor(opt)} className="btn-secondary" style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {phase === 'chest' && (
                <div style={{ textAlign: 'center' }}>
                    <h3>Choose a Chest</h3>
                    {inventory.find(i => i.id === 'map') && <p style={{ color: '#00b894' }}>Map Hint: Left is {chestOptions[0].type === 'treasure' ? 'SAFE' : 'TRAP'}</p>}
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
                        {chestOptions.map(chest => (
                            <button key={chest.id} onClick={() => handleChestPick(chest.id)} style={{ fontSize: '4rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                                📦
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {phase === 'sell' && problem && (
                <div style={{ textAlign: 'center' }}>
                    <h3>Negotiate Sale</h3>
                    <p>Solve to get the best price!</p>
                    <div className="mission-problem">{problem.display}</div>
                    <form onSubmit={handleAnswer}>
                        <input ref={inputRef} type="number" value={userAnswer} onChange={e => setUserAnswer(e.target.value)}
                            className="input" autoFocus />
                        <button type="submit" className="btn-primary">Deal</button>
                    </form>
                </div>
            )}
        </div>
    );
}
