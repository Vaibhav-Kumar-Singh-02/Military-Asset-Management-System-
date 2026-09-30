import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Clock, ChevronDown, Award, Sun, Moon, Shield, Building2 } from 'lucide-react';
import MilitaryLogo from './MilitaryLogo';

const Navbar = () => {
  const { user, logout, isAdmin, isCommander } = useAuth();
  const [time, setTime] = useState(new Date().toUTCString().slice(17, 25) + ' UTC');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mams-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mams-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().slice(17, 25) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getRoleBadgeClass = () => {
    if (isAdmin) return 'badge-admin';
    if (isCommander) return 'badge-commander';
    return 'badge-logistics';
  };

  const formatRoleName = (role) => {
    if (role === 'ADMIN') return 'SYSTEM ADMIN';
    if (role === 'BASE_COMMANDER') return 'BASE COMMANDER';
    if (role === 'LOGISTICS_OFFICER') return 'LOGISTICS OFFICER';
    return role;
  };

  return (
    <header style={{
      height: '64px',
      background: 'var(--header-bg)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Brand & System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(234, 88, 12, 0.1)',
            color: 'var(--accent-orange)',
            border: '1px solid rgba(234, 88, 12, 0.25)',
            flexShrink: 0
          }}>
            <MilitaryLogo size={24} color="var(--accent-orange)" />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              MAMS <span style={{ color: 'var(--accent-orange)', fontSize: '0.8rem', fontWeight: 700 }}>| DEFENSE LOGISTICS</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.02em', fontWeight: 500 }}>
              Military Asset Management System
            </div>
          </div>
        </div>

        {/* System Status & Clock Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--pill-bg)',
          padding: '5px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          marginLeft: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#16a34a' }}>
              OPERATIONAL
            </span>
          </div>
          <div style={{ width: '1px', height: '14px', background: 'var(--border-color)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 500 }} className="font-mono">
            <Clock size={13} />
            {time}
          </div>
        </div>
      </div>

      {/* Action Controls & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Theme Switcher Toggle (Light / Dark) */}
        <button
          onClick={toggleTheme}
          className="btn-tactical btn-secondary"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          style={{
            padding: '6px 12px',
            fontSize: '0.75rem',
          }}
        >
          {theme === 'light' ? (
            <>
              <Sun size={14} color="#ea580c" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon size={14} color="#f97316" />
              <span>Dark</span>
            </>
          )}
        </button>

        {/* Base Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--pill-bg)',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)'
        }}>
          <Building2 size={14} color="var(--accent-orange)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
            {user?.baseName || 'Joint HQ / All Bases'}
          </span>
        </div>

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--pill-bg)',
              border: '1px solid var(--border-color)',
              padding: '5px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--text-main)',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(234, 88, 12, 0.1)',
              color: 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Award size={16} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {user?.fullName || user?.username}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span className={`badge-tactical ${getRoleBadgeClass()}`} style={{ padding: '1px 6px', fontSize: '0.65rem' }}>
                  {formatRoleName(user?.role)}
                </span>
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-dim)" />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              width: '240px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px',
              zIndex: 200,
            }}>
              <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>Service ID</div>
                <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: 700 }}>{user?.serviceNumber || 'MIL-DOD-001'}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px', fontWeight: 600 }}>Rank</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>{user?.militaryRank}</div>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="btn-tactical btn-danger"
                style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
