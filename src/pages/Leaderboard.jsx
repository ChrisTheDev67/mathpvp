import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trophy, Medal, Award } from 'lucide-react';

// Memoized Row Component
const LeaderboardRow = React.memo(({ entry, index, rankStyle, rankIcon }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            ...rankStyle
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {rankIcon}
            <span style={{ color: 'var(--text-main)', fontWeight: index < 3 ? 'bold' : 'normal' }}>
                {entry.nickname}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {entry.grade}
            </span>
        </div>
        <div style={{
            fontSize: index < 3 ? '1.5rem' : '1.2rem',
            fontWeight: 'bold',
            color: index === 0 ? '#fbbf24' : 'var(--accent)'
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
        if (index === 0) return <Trophy size={24} style={{ color: '#fbbf24' }} />;
        if (index === 1) return <Medal size={24} style={{ color: '#94a3b8' }} />;
        if (index === 2) return <Award size={24} style={{ color: '#cd7f32' }} />;
        return <span style={{ width: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>{index + 1}</span>;
    };

    const getRankStyle = (index) => {
        if (index === 0) return { background: 'rgba(251, 191, 36, 0.1)', border: '2px solid #fbbf24' };
        if (index === 1) return { background: 'rgba(148, 163, 184, 0.1)', border: '2px solid #94a3b8' };
        if (index === 2) return { background: 'rgba(205, 127, 50, 0.1)', border: '2px solid #cd7f32' };
        return { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' };
    };

    const filteredScores = activeTab === 'all'
        ? scores
        : scores.filter(s => s.grade === activeTab);

    if (loading) {
        return <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                <h2 className="text-gradient" style={{ fontSize: '2rem' }}>Today's Leaderboard</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
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
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: activeTab === tab ? 'var(--primary)' : 'transparent',
                            color: activeTab === tab ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontWeight: activeTab === tab ? 'bold' : 'normal',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab === 'all' ? 'All Grades' : `Grades ${tab}`}
                    </button>
                ))}
            </div>

            {filteredScores.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <p>No scores yet for {activeTab === 'all' ? 'today' : `Grades ${activeTab}`}. Be the first to play!</p>
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
