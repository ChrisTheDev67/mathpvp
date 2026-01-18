
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Bot, Swords } from 'lucide-react';

const Home = () => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Hero Section */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧮</div>
                <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
                    Master Math, Level Up!
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Fun challenges for all skill levels. Practice, compete, and track your progress.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/practice" className="btn-primary">
                        Start Practice <ArrowRight size={20} />
                    </Link>
                    <Link to="/pvb" className="btn-secondary">
                        <Bot size={20} /> vs Bot
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                <FeatureCard
                    icon={<Zap size={28} />}
                    title="Instant Practice"
                    desc="Unlimited math problems generated just for you"
                    color="var(--primary)"
                />
                <FeatureCard
                    icon={<Bot size={28} />}
                    title="PvB Battles"
                    desc="Race against the bot to prove your skills"
                    color="var(--secondary)"
                />
                <FeatureCard
                    icon={<Swords size={28} />}
                    title="Battle Royale"
                    desc="Daily challenge with leaderboard rankings"
                    color="var(--accent)"
                />
            </div>

            {/* Quick Stats */}
            <div style={{
                marginTop: '3rem',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'center',
                gap: '3rem',
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
            padding: '0.75rem',
            background: `color-mix(in srgb, ${color}, transparent 85%)`,
            borderRadius: 'var(--radius-sm)'
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
    </div>
);

const StatItem = ({ label, value }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
);

export default Home;
