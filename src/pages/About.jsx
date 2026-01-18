import React from 'react';

const About = () => {
    return (
        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Me</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        Hi! I am <strong>10 years old</strong> and I created <strong>Math Helper</strong>!
                    </p>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        I am 50% 🇰🇷 Korean, 25% 🇷🇺 Russian, and 25% 🇩🇪 German. I speak both Russian and English!
                    </p>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        I love math and making cool websites. This is my Math Helper for everyone who wants to practice!
                    </p>
                </div>
                <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid var(--primary)',
                    boxShadow: '0 0 30px var(--primary-glow)'
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

export default About;
