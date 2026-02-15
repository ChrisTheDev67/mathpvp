import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, DollarSign, Send, UserCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
    const { user, profile, isAdmin, adminGiveMoney } = useAuth();
    const [targetNickname, setTargetNickname] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [sending, setSending] = useState(false);

    if (!user || !isAdmin) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '3rem auto', textAlign: 'center', padding: '3rem' }}>
                <AlertTriangle size={48} color="#ff6b81" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff6b81' }}>Access Denied</h2>
                <p style={{ color: 'var(--text-muted)' }}>You do not have admin privileges.</p>
                <Link to="/" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Go Home</Link>
            </div>
        );
    }

    const handleSend = async (e) => {
        e.preventDefault();
        if (!targetNickname.trim() || !amount) return;

        setSending(true);
        setResult(null);

        const res = await adminGiveMoney(targetNickname.trim(), parseInt(amount));

        if (res.error) {
            setResult({ type: 'error', message: res.error });
        } else {
            setResult({ type: 'success', message: `Sent $${parseInt(amount).toLocaleString()} to ${res.nickname}. New balance: $${res.newBalance.toLocaleString()}` });
            setTargetNickname('');
            setAmount('');
        }
        setSending(false);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/" className="btn-ghost" style={{ marginRight: '1rem' }}>
                    <ArrowLeft size={20} /> Back
                </Link>
                <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={32} color="#e94560" /> Admin Panel
                </h1>
            </div>

            {/* Admin Info */}
            <div style={{
                background: 'linear-gradient(135deg, #2d1b36 0%, #1a1225 100%)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(233, 69, 96, 0.3)',
                marginBottom: '2rem'
            }}>
                <div style={{ color: '#aaa', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Logged in as Admin</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#e94560', marginTop: '0.25rem' }}>{user.email}</div>
            </div>

            {/* Give Money Form */}
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={20} color="#ffd700" /> Send Money to a Student
            </h3>

            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
                        <UserCheck size={14} style={{ marginRight: '0.25rem' }} /> Student Nickname
                    </label>
                    <input
                        type="text"
                        value={targetNickname}
                        onChange={(e) => setTargetNickname(e.target.value)}
                        placeholder="Enter student's nickname..."
                        required
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            background: 'var(--bg-darker)',
                            border: '2px solid var(--border)',
                            borderRadius: '10px',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
                        <DollarSign size={14} style={{ marginRight: '0.25rem' }} /> Amount (use negative to deduct)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 5000 or -1000"
                        required
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            background: 'var(--bg-darker)',
                            border: '2px solid var(--border)',
                            borderRadius: '10px',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary"
                    style={{ fontSize: '1.1rem', padding: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <Send size={18} /> {sending ? 'Sending...' : 'Send Money'}
                </button>
            </form>

            {/* Result */}
            {result && (
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    background: result.type === 'success' ? 'rgba(85, 239, 196, 0.1)' : 'rgba(255, 107, 129, 0.1)',
                    border: `2px solid ${result.type === 'success' ? '#55efc4' : '#ff6b81'}`,
                    color: result.type === 'success' ? '#55efc4' : '#ff6b81',
                    fontWeight: '600',
                }}>
                    {result.message}
                </div>
            )}
        </div>
    );
};

export default Admin;
