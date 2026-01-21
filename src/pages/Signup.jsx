import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, Gamepad2 } from 'lucide-react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (nickname.length < 3) {
            setError('Nickname must be at least 3 characters');
            return;
        }

        setLoading(true);

        try {
            await signUp(email, password, nickname);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to sign up');
        }
        setLoading(false);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '420px', margin: '0 auto', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: 'var(--radius-md)',
                    background: 'var(--secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    boxShadow: '0 4px 0 #0080CC, 0 0 25px var(--secondary-glow)'
                }}>
                    <UserPlus size={40} color="white" />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Join the Game</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                    Create your player account
                </p>
            </div>

            {error && (
                <div style={{
                    background: 'rgba(255, 71, 87, 0.15)',
                    border: '2px solid var(--error)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    color: 'var(--error)',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        <User size={18} />Player Name
                    </label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                        className="input"
                        placeholder="Your display name"
                    />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        <Mail size={18} />Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                        placeholder="you@example.com"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        <Lock size={18} />Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="input"
                        placeholder="At least 6 characters"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-secondary"
                    disabled={loading}
                    style={{ width: '100%', marginBottom: '1.5rem', opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? 'Creating account...' : 'Start Playing'}
                </button>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1rem' }}>
                Already a player?{' '}
                <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>
                    Log In
                </Link>
            </p>
        </div>
    );
};

export default Signup;
