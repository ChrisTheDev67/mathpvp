import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, Gamepad2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to log in');
        }
        setLoading(false);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '420px', margin: '0 auto', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: 'var(--radius-md)',
                    background: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    boxShadow: '0 4px 0 var(--primary-dark), 0 0 25px var(--primary-glow)'
                }}>
                    <Gamepad2 size={40} color="white" />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                    Log in to continue your adventure
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
                        className="input"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ width: '100%', marginBottom: '1.5rem', opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? 'Logging in...' : 'Play Now'}
                </button>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1rem' }}>
                New player?{' '}
                <Link to="/signup" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 700 }}>
                    Create Account
                </Link>
            </p>
        </div>
    );
};

export default Login;
