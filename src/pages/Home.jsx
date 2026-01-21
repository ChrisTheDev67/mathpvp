
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Bot, Swords } from 'lucide-react';

const Home = () => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Hero Section */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>🎮</div>
                <h1 className="text-gradient game-title" style={{ marginBottom: '1rem' }}>
                    MathPvP
                </h1>
                <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                    Battle your friends in math challenges! Level up your skills and climb the leaderboard.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/practice" className="btn-primary">
                        <Zap size={22} /> Start Practice
                    </Link>
                    <Link to="/pvb" className="btn-secondary">
                        <Bot size={22} /> vs Bot
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                <FeatureCard
                    icon={<Zap size={32} />}
                    title="Instant Practice"
                    desc="Unlimited math problems generated just for you"
                    color="var(--primary)"
                />
                <FeatureCard
                    icon={<Bot size={32} />}
                    title="PvB Battles"
                    desc="Race against the bot to prove your skills"
                    color="var(--secondary)"
                />
                <FeatureCard
                    icon={<Swords size={32} />}
                    title="Battle Royale"
                    desc="Daily challenge with leaderboard rankings"
                    color="var(--accent)"
                />
            </div>

            {/* Quick Stats */}
            <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'var(--bg-darker)',
                borderRadius: 'var(--radius-md)',
                border: '3px solid var(--border)',
                display: 'flex',
                justifyContent: 'center',
                gap: '4rem',
                flexWrap: 'wrap'
            }}>
                <StatItem label="Grade Levels" value="1-12" />
                <StatItem label="Game Modes" value="3" />
                <StatItem label="Daily Prizes" value="🏆" />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, color }) => (
    <div className="card card-interactive" style={{ textAlign: 'left' }}>
        <div style={{
            color,
            marginBottom: '1rem',
            display: 'inline-flex',
            padding: '1rem',
            background: 'var(--bg-darker)',
            borderRadius: 'var(--radius-sm)',
            border: `2px solid ${color}`,
            boxShadow: `0 0 15px ${color}33`
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '700', textTransform: 'uppercase' }}>{title}</h3>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

const StatItem = ({ label, value }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', textShadow: '0 0 15px var(--primary-glow)' }}>{value}</div>
        <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    </div>
);

export default Home;
