import React from 'react';
import { Gamepad2, Globe, Code } from 'lucide-react';

const About = () => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    About <span className="text-gradient">Me</span>
                </h2>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.15rem' }}>
                        Hi! I am <strong style={{ color: 'var(--primary)' }}>10 years old</strong> and I created <strong style={{ color: 'var(--secondary)' }}>MathPvP</strong>!
                    </p>
                    <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', fontSize: '1.15rem' }}>
                        I am 50% 🇰🇷 Korean, 25% 🇷🇺 Russian, and 25% 🇩🇪 German. I speak both Russian and English!
                    </p>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                        I love math and making cool websites. This is my MathPvP game for everyone who wants to practice and have fun!
                    </p>

                    {/* Skills badges */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                        <SkillBadge icon={<Code size={16} />} label="Coding" color="var(--primary)" />
                        <SkillBadge icon={<Gamepad2 size={16} />} label="Games" color="var(--secondary)" />
                        <SkillBadge icon={<Globe size={16} />} label="Languages" color="var(--accent)" />
                    </div>
                </div>

                <div style={{
                    width: '220px',
                    height: '220px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '4px solid var(--primary)',
                    boxShadow: '0 8px 0 rgba(0, 0, 0, 0.3), 0 0 30px var(--primary-glow)'
                }}>
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );
};

const SkillBadge = ({ icon, label, color }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--bg-darker)',
        border: `2px solid ${color}`,
        borderRadius: 'var(--radius-sm)',
        color: color,
        fontWeight: '600',
        fontSize: '0.9rem',
        textTransform: 'uppercase'
    }}>
        {icon} {label}
    </div>
);

export default About;
