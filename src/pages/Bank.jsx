import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coins, CreditCard, TrendingUp, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Bank = () => {
    const { user, profile, loading } = useAuth();

    if (loading) return <div className="loading-spinner" />;

    if (!user) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '3rem auto', textAlign: 'center', padding: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏦 Bank of Math</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>You must be logged in to access your account.</p>
                <Link to="/login" className="btn-primary">Log In</Link>
            </div>
        );
    }

    const money = profile?.money || 0;

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/" className="btn-ghost" style={{ marginRight: '1rem' }}>
                    <ArrowLeft size={20} /> Back
                </Link>
                <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Coins size={32} color="#ffd700" /> Bank of Math
                </h1>
            </div>

            {/* Main Card */}
            <div style={{
                background: 'linear-gradient(135deg, #1e272e 0%, #171c21 100%)',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255, 215, 0, 0.05)' }}></div>
                <div style={{ position: 'absolute', bottom: '-80px', left: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255, 215, 0, 0.03)' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', position: 'relative' }}>
                    <div>
                        <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Balance</div>
                        <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#ffd700', textShadow: '0 2px 10px rgba(255, 215, 0, 0.2)' }}>
                            ${money.toLocaleString()}
                        </div>
                    </div>
                    <CreditCard size={40} color="rgba(255,255,255,0.2)" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
                    <div>
                        <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Account Holder</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{profile?.nickname || 'Unknown Agent'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Status</div>
                        <div style={{ color: '#55efc4', fontWeight: 'bold' }}>ACTIVE</div>
                    </div>
                </div>
            </div>

            {/* Services (Placeholder for now) */}
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} /> Services
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: 'var(--bg-darker)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#0984e3' }}>Deposit</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Earn money by completing Missions and winning Adventures.
                    </p>
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--bg-darker)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#e17055' }}>Withdraw</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Spend money on Adventure entry fees ($10,000) and shop items.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Bank;
