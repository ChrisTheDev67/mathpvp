import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

// Memoized Row Component
const LeaderboardRow = React.memo(({ entry, index, rankStyle, rankIcon }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            transition: 'transform 0.15s ease',
            ...rankStyle
        }}
        className="leaderboard-row"
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {rankIcon}
            <span style={{
                color: 'var(--text-main)',
                fontWeight: index < 3 ? '700' : '500',
                fontSize: index < 3 ? '1.15rem' : '1rem',
                textTransform: 'uppercase'
            }}>
                {entry.nickname}
            </span>
            <span style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-darker)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontWeight: '600'
            }}>
                {entry.grade}
            </span>
        </div>
        <div style={{
            fontSize: index < 3 ? '1.75rem' : '1.25rem',
            fontWeight: '700',
            color: index === 0 ? 'var(--accent)' : 'var(--secondary)',
            textShadow: index === 0 ? '0 0 15px var(--accent-glow)' : 'none'
        }}>
            {entry.score}
        </div>
    </div>
));

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        if (location.state?.grade) {
            setActiveTab(location.state.grade);
        }
    }, [location.state]);

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        // Get today's scores (California timezone - PT)
        const today = new Date();
        const ptDate = new Date(today.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        ptDate.setHours(0, 0, 0, 0);

        const { data, error } = await supabase
            .from('lottery_scores')
            .select('*')
            .gte('played_at', ptDate.toISOString())
            .order('score', { ascending: false })
            .limit(100);

        if (data) {
            setScores(data);
        }
        setLoading(false);
    };

    const getRankIcon = (index) => {
        if (index === 0) return <Crown size={28} style={{ color: '#FFD700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' }} />;
        if (index === 1) return <Medal size={26} style={{ color: '#C0C0C0', filter: 'drop-shadow(0 0 6px rgba(192,192,192,0.5))' }} />;
        if (index === 2) return <Award size={26} style={{ color: '#CD7F32', filter: 'drop-shadow(0 0 6px rgba(205,127,50,0.5))' }} />;
        return <span style={{ width: '28px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: '700', fontSize: '1.1rem' }}>{index + 1}</span>;
    };

    const getRankStyle = (index) => {
        if (index === 0) return {
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.1))',
            border: '3px solid #FFD700',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
        };
        if (index === 1) return {
            background: 'rgba(192, 192, 192, 0.1)',
            border: '3px solid #C0C0C0'
        };
        if (index === 2) return {
            background: 'rgba(205, 127, 50, 0.1)',
            border: '3px solid #CD7F32'
        };
        return {
            background: 'var(--bg-darker)',
            border: '2px solid var(--border)'
        };
    };

    const filteredScores = activeTab === 'all'
        ? scores
        : scores.filter(s => s.grade === activeTab);

    const SkeletonRow = () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            background: 'var(--bg-card)',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '0.75rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="skeleton" style={{ width: '28px', height: '28px', borderRadius: '50%' }}></div>
                <div className="skeleton" style={{ width: '120px', height: '20px' }}></div>
            </div>
            <div className="skeleton" style={{ width: '40px', height: '32px' }}></div>
        </div>
    );

    if (loading) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🏆</div>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '700' }}>Today's Champions</h2>
                    <div className="skeleton" style={{ width: '200px', height: '16px', margin: '0.5rem auto' }}></div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="skeleton" style={{ width: '60px', height: '36px' }}></div>
                    ))}
                </div>

                <div>
                    {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>🏆</div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    <span className="text-gradient">Today's Champions</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                    Resets daily at midnight (Pacific Time)
                </p>
            </div>

            {/* Grade Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['all', '1-2', '3-5', '6-9', '10-12'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 18px',
                            borderRadius: 'var(--radius-sm)',
                            border: activeTab === tab ? 'none' : '2px solid var(--border)',
                            background: activeTab === tab ? 'var(--primary)' : 'var(--bg-darker)',
                            color: activeTab === tab ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            transition: 'all 0.15s ease',
                            boxShadow: activeTab === tab ? '0 3px 0 var(--primary-dark)' : 'none',
                            fontFamily: 'inherit'
                        }}
                    >
                        {tab === 'all' ? 'All' : `${tab}`}
                    </button>
                ))}
            </div>

            {filteredScores.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                    <p style={{ fontSize: '1.1rem' }}>No scores yet{activeTab !== 'all' && ` for Grades ${activeTab}`}.</p>
                    <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Be the first to play!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {filteredScores.map((entry, index) => (
                        <LeaderboardRow
                            key={entry.id}
                            entry={entry}
                            index={index}
                            rankStyle={getRankStyle(index)}
                            rankIcon={getRankIcon(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
