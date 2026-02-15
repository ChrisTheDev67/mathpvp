import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, Home, Bot, Swords, Trophy, BookOpen, LogIn, LogOut, Crosshair, Coins, MoreHorizontal, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [othersOpen, setOthersOpen] = useState(false);
  const othersRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();

  // Main nav items (always visible on desktop)
  const mainItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Practice', path: '/practice', icon: <Calculator size={18} /> },
    { name: 'Mission', path: '/mission', icon: <Crosshair size={18} /> },
    { name: 'Bank', path: '/bank', icon: <Coins size={18} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={18} /> },
  ];

  // "Others" dropdown items
  const otherItems = [
    { name: 'PvB', path: '/pvb', icon: <Bot size={18} /> },
    { name: 'Battle Royale', path: '/pvp', icon: <Swords size={18} /> },
    { name: 'Help', path: '/help', icon: <BookOpen size={18} /> },
    { name: 'About', path: '/about', icon: <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>👋</div> },
    ...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: <Shield size={18} /> }] : []),
  ];

  const allItems = [...mainItems, ...otherItems];

  // Close "Others" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (othersRef.current && !othersRef.current.contains(e.target)) {
        setOthersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOthersOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const handleKeyDown = (e, path) => {
    if (e.key === ' ') {
      e.preventDefault();
      navigate(path);
      setIsOpen(false);
    }
  };

  const isOtherActive = otherItems.some(i => location.pathname === i.path);

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo text-gradient">
          <Calculator className="logo-icon" />
          <span>MathPvP</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {/* Main items - always visible on desktop */}
          {mainItems.map((item) => (
            <li key={item.name} className="nav-item desktop-only-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
              >
                {item.icon}
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Others dropdown - desktop only */}
          <li className="nav-item desktop-only-item" ref={othersRef}>
            <button
              className={`nav-link others-btn ${isOtherActive ? 'active' : ''}`}
              onClick={() => setOthersOpen(!othersOpen)}
            >
              <MoreHorizontal size={18} />
              <span className="nav-text">Others</span>
            </button>
            {othersOpen && (
              <div className="others-dropdown">
                {otherItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`others-dropdown-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => { setOthersOpen(false); setIsOpen(false); }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Mobile: show ALL items in the menu (no dropdown needed) */}
          {allItems.map((item) => (
            <li key={`mobile-${item.name}`} className="nav-item mobile-only-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
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
                  className="nav-logout-btn"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => handleKeyDown(e, '/login')}
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
