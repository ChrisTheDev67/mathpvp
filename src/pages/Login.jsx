import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

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
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', margin: '0 auto', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem'
                }}>
                    <LogIn size={28} color="white" />
                </div>
                <h2 className="text-gradient" style={{ fontSize: '1.75rem' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-main)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                    Log in to continue your math journey
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
                        color: 'var(--text-main)',
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
                        color: 'var(--text-main)',
                        fontSize: '0.9rem'
                    }}>
                        <Lock size={16} />Password
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
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;
