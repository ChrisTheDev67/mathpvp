import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ADMIN_EMAILS } from '../lib/config';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Award, Crown, Users, ChevronLeft, ChevronRight, Flame, Trash2 } from 'lucide-react';

const Leaderboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
    const [students, setStudents] = useState([]);
    const [currentWeekStreaks, setCurrentWeekStreaks] = useState([]);
    const [pastWeeks, setPastWeeks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('thisweek');
    const [selectedPastWeek, setSelectedPastWeek] = useState(null);

    // Get Monday of current week (PT timezone)
    const getWeekStart = () => {
        const now = new Date();
        const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        const day = pt.getDay();
        const diff = day === 0 ? 6 : day - 1;
        pt.setDate(pt.getDate() - diff);
        pt.setHours(0, 0, 0, 0);
        return pt.toISOString().split('T')[0];
    };

    const formatWeekRange = (weekStart) => {
        const start = new Date(weekStart + 'T00:00:00');
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        const opts = { month: 'short', day: 'numeric' };
        return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const weekStart = getWeekStart();

        // Fetch all students
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, nickname, created_at')
            .order('created_at', { ascending: true });

        if (profiles) setStudents(profiles);

        // Fetch current week streaks
        const { data: currentStreaks } = await supabase
            .from('weekly_streaks')
            .select('*')
            .eq('week_start', weekStart)
            .order('best_streak', { ascending: false });

        if (currentStreaks) setCurrentWeekStreaks(currentStreaks);

        // Fetch all past weeks (before this week)
        const { data: allStreaks } = await supabase
            .from('weekly_streaks')
            .select('*')
            .lt('week_start', weekStart)
            .order('week_start', { ascending: false });

        if (allStreaks) {
            // Group by week_start
            const weekMap = {};
            allStreaks.forEach(s => {
                if (!weekMap[s.week_start]) weekMap[s.week_start] = [];
                weekMap[s.week_start].push(s);
            });
            // Sort each week by best_streak descending
            const weeks = Object.entries(weekMap).map(([week, entries]) => ({
                weekStart: week,
                entries: entries.sort((a, b) => b.best_streak - a.best_streak)
            }));
            setPastWeeks(weeks);
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
            border: '3px solid #FFD700', boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
        };
        if (index === 1) return { background: 'rgba(192, 192, 192, 0.1)', border: '3px solid #C0C0C0' };
        if (index === 2) return { background: 'rgba(205, 127, 50, 0.1)', border: '3px solid #CD7F32' };
        return { background: 'var(--bg-darker)', border: '2px solid var(--border)' };
    };

    const StreakRow = ({ entry, index }) => (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)',
            transition: 'transform 0.15s ease', ...getRankStyle(index)
        }} className="leaderboard-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {getRankIcon(index)}
                <span style={{
                    color: 'var(--text-main)', fontWeight: index < 3 ? '700' : '500',
                    fontSize: index < 3 ? '1.15rem' : '1rem', textTransform: 'uppercase'
                }}>{entry.nickname}</span>
            </div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: index < 3 ? '1.5rem' : '1.2rem', fontWeight: '700',
                color: index === 0 ? 'var(--accent)' : 'var(--primary)'
            }}>
                <Flame size={index < 3 ? 22 : 18} style={{ color: '#FF6B35' }} />
                {entry.best_streak}
            </div>
        </div>
    );

    const SkeletonRow = () => (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.5rem', background: 'var(--bg-card)',
            border: '2px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem'
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
                    <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '700' }}>Leaderboard</h2>
                </div>
                <div>{[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}</div>
            </div>
        );
    }

    // Past week detail view
    if (selectedPastWeek) {
        const top3 = selectedPastWeek.entries.slice(0, 3);
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto', padding: '2rem' }}>
                <button onClick={() => setSelectedPastWeek(null)} style={{
                    background: 'none', border: 'none', color: 'var(--secondary)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', fontFamily: 'inherit'
                }}>
                    <ChevronLeft size={20} /> Back to Past Weeks
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧠</div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                        <span className="text-gradient">Week's Smartest Students</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        {formatWeekRange(selectedPastWeek.weekStart)}
                    </p>
                </div>

                {/* Top 3 Podium */}
                {top3.length > 0 && (
                    <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                        gap: '1rem', marginBottom: '2rem', padding: '1rem 0'
                    }}>
                        {[1, 0, 2].map((rank) => {
                            const entry = top3[rank];
                            if (!entry) return <div key={rank} style={{ flex: 1 }}></div>;
                            const heights = { 0: '160px', 1: '130px', 2: '110px' };
                            const medals = { 0: '🥇', 1: '🥈', 2: '🥉' };
                            const colors = { 0: '#FFD700', 1: '#C0C0C0', 2: '#CD7F32' };
                            return (
                                <div key={rank} style={{
                                    flex: 1, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <div style={{ fontSize: '2.5rem' }}>{medals[rank]}</div>
                                    <div style={{
                                        fontWeight: '700', fontSize: rank === 0 ? '1.1rem' : '0.95rem',
                                        color: 'var(--text-main)', textTransform: 'uppercase',
                                        textAlign: 'center'
                                    }}>{entry.nickname}</div>
                                    <div style={{
                                        width: '100%', height: heights[rank],
                                        background: `linear-gradient(180deg, ${colors[rank]}33, ${colors[rank]}11)`,
                                        border: `3px solid ${colors[rank]}`,
                                        borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexDirection: 'column', gap: '0.25rem'
                                    }}>
                                        <Flame size={24} style={{ color: '#FF6B35' }} />
                                        <span style={{
                                            fontSize: '1.5rem', fontWeight: '700',
                                            color: colors[rank]
                                        }}>{entry.best_streak}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>streak</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Full list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedPastWeek.entries.map((entry, index) => (
                        <StreakRow key={entry.id} entry={entry} index={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>🏆</div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    <span className="text-gradient">Leaderboard</span>
                </h2>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['thisweek', 'students', 'pastweeks'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 18px', borderRadius: 'var(--radius-sm)',
                            border: activeTab === tab ? 'none' : '2px solid var(--border)',
                            background: activeTab === tab ? 'var(--primary)' : 'var(--bg-darker)',
                            color: activeTab === tab ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem',
                            textTransform: 'uppercase', letterSpacing: '0.5px',
                            transition: 'all 0.15s ease',
                            boxShadow: activeTab === tab ? '0 3px 0 var(--primary-dark)' : 'none',
                            fontFamily: 'inherit'
                        }}
                    >
                        {tab === 'thisweek' ? '🔥 This Week' : tab === 'students' ? '👥 Students' : '📅 Past Weeks'}
                    </button>
                ))}
            </div>

            {/* This Week Tab */}
            {activeTab === 'thisweek' && (
                <>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {formatWeekRange(getWeekStart())} • Best streaks this week
                    </p>
                    {currentWeekStreaks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
                            <p style={{ fontSize: '1.1rem' }}>No streaks this week yet.</p>
                            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Start practicing to get on the board!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {currentWeekStreaks.map((entry, index) => (
                                <StreakRow key={entry.id} entry={entry} index={index} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* All Students Tab */}
            {activeTab === 'students' && (
                students.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                        <p style={{ fontSize: '1.1rem' }}>No students registered yet.</p>
                    </div>
                ) : (
                    <>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {students.length} student{students.length !== 1 ? 's' : ''} registered
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {students.map((student, index) => (
                                <div key={student.id} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)',
                                    background: 'var(--bg-darker)', border: '2px solid var(--border)'
                                }} className="leaderboard-row">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: 'var(--primary)', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: '700', fontSize: '0.85rem'
                                        }}>{index + 1}</span>
                                        <span style={{
                                            color: 'var(--text-main)', fontWeight: '600',
                                            fontSize: '1rem', textTransform: 'uppercase'
                                        }}>{student.nickname}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Users size={18} style={{ color: 'var(--text-muted)' }} />
                                        {isAdmin && (
                                            <button
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    if (!window.confirm(`Delete student "${student.nickname}"? This cannot be undone.`)) return;
                                                    await supabase.from('weekly_streaks').delete().eq('user_id', student.id);
                                                    await supabase.from('profiles').delete().eq('id', student.id);
                                                    setStudents(prev => prev.filter(s => s.id !== student.id));
                                                }}
                                                style={{
                                                    background: 'rgba(255, 71, 87, 0.15)',
                                                    border: '2px solid var(--error)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    padding: '0.4rem 0.5rem',
                                                    cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center',
                                                    transition: 'all 0.15s ease'
                                                }}
                                                title="Delete student"
                                            >
                                                <Trash2 size={16} style={{ color: 'var(--error)' }} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            )}

            {/* Past Weeks Tab */}
            {activeTab === 'pastweeks' && (
                pastWeeks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                        <p style={{ fontSize: '1.1rem' }}>No past weeks yet.</p>
                        <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Complete this week to see results here!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pastWeeks.map((week) => {
                            const top3 = week.entries.slice(0, 3);
                            return (
                                <div key={week.weekStart}
                                    onClick={() => setSelectedPastWeek(week)}
                                    style={{
                                        padding: '1.5rem', borderRadius: 'var(--radius-sm)',
                                        background: 'var(--bg-darker)', border: '2px solid var(--border)',
                                        cursor: 'pointer', transition: 'all 0.15s ease'
                                    }}
                                    className="leaderboard-row"
                                >
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        alignItems: 'center', marginBottom: '1rem'
                                    }}>
                                        <div>
                                            <div style={{
                                                fontWeight: '700', fontSize: '1.1rem',
                                                textTransform: 'uppercase', color: 'var(--text-main)'
                                            }}>
                                                📅 {formatWeekRange(week.weekStart)}
                                            </div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                                {week.entries.length} player{week.entries.length !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                        <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
                                    </div>

                                    {/* Top 3 preview */}
                                    <div style={{
                                        display: 'flex', flexDirection: 'column', gap: '0.5rem',
                                        background: 'rgba(255,255,255,0.03)', padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)'
                                    }}>
                                        <div style={{
                                            fontSize: '0.8rem', fontWeight: '700',
                                            color: 'var(--accent)', textTransform: 'uppercase',
                                            letterSpacing: '1px', marginBottom: '0.25rem'
                                        }}>🧠 Top 3 Smartest</div>
                                        {top3.map((entry, i) => (
                                            <div key={entry.id} style={{
                                                display: 'flex', justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{
                                                    color: 'var(--text-main)', fontWeight: '600',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {['🥇', '🥈', '🥉'][i]} {entry.nickname}
                                                </span>
                                                <span style={{
                                                    color: 'var(--primary)', fontWeight: '700',
                                                    fontSize: '0.95rem', display: 'flex',
                                                    alignItems: 'center', gap: '0.25rem'
                                                }}>
                                                    <Flame size={14} style={{ color: '#FF6B35' }} />
                                                    {entry.best_streak}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </div>
    );
};

export default Leaderboard;
