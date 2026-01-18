import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, User, Home, Bot, Swords, Trophy, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Practice', path: '/practice', icon: <Calculator size={20} /> },
    { name: 'PvB', path: '/pvb', icon: <Bot size={20} /> },
    { name: 'Battle Royale', path: '/pvp', icon: <Swords size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo text-gradient">
          <Calculator className="logo-icon" />
          <span>Math Helper</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Auth buttons */}
          <li className="nav-item" style={{ marginLeft: '1rem' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
                  {profile?.nickname || 'User'}
                </span>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--glass-border)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'var(--primary)',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem'
                }}
              >
                <LogIn size={20} />
                <span className="nav-text">Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
