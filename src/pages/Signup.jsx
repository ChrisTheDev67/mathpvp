import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

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
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', margin: '0 auto', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem'
                }}>
                    <UserPlus size={28} color="white" />
                </div>
                <h2 className="text-gradient" style={{ fontSize: '1.75rem' }}>Create Account</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                    Join Math Helper today
                </p>
            </div>

            {error && (
                <div style={{
                    background: 'rgba(248,113,113,0.1)',
                    border: '1px solid var(--error)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    color: 'var(--error)',
                    fontSize: '0.9rem'
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
                        marginBottom: '0.5rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        <User size={16} />Nickname
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
                        marginBottom: '0.5rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        <Mail size={16} />Email
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
                        marginBottom: '0.5rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        <Lock size={16} />Password
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
                    className="btn-primary"
                    disabled={loading}
                    style={{ width: '100%', marginBottom: '1.5rem', opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default Signup;
