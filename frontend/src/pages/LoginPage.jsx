import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Key, Award, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import MilitaryLogo from '../components/MilitaryLogo';

const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [militaryRank, setMilitaryRank] = useState('Captain');
  const [serviceNumber, setServiceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('LOGISTICS_OFFICER');
  const [baseId, setBaseId] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await register({
        username,
        password,
        fullName,
        militaryRank,
        serviceNumber: serviceNumber || `MIL-${Math.floor(1000 + Math.random() * 9000)}`,
        email,
        role,
        baseId: Number(baseId),
      });
      setSuccessMsg('Officer registered successfully. You may now sign in.');
      setIsRegisterMode(false);
      setPassword('password123');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (userType) => {
    setError(null);
    setSuccessMsg(null);
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('password123');
    } else if (userType === 'commander_liberty') {
      setUsername('commander_liberty');
      setPassword('password123');
    } else if (userType === 'commander_pendleton') {
      setUsername('commander_pendleton');
      setPassword('password123');
    } else if (userType === 'logistics_liberty') {
      setUsername('logistics_liberty');
      setPassword('password123');
    } else if (userType === 'logistics_pendleton') {
      setUsername('logistics_pendleton');
      setPassword('password123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'var(--bg-primary)',
      padding: '24px',
      overflow: 'hidden',
    }}>
      {/* Background Image Layer with vignette */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at center, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.88) 100%), url('/Image.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.85) contrast(1.05)',
        zIndex: 0,
      }} />

      {/* Top Security Header Marking */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#e2e8f0',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}>
          <Shield size={12} style={{ color: '#f97316' }} /> UNCLASSIFIED // OFFICIAL DEFENSE LOGISTICS SYSTEM
        </div>
      </div>

      {/* Main Authentication Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '460px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        padding: '36px 32px',
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: 'rgba(234, 88, 12, 0.1)',
            color: 'var(--accent-orange)',
            border: '1px solid rgba(234, 88, 12, 0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <MilitaryLogo size={34} color="var(--accent-orange)" />
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
            Military Asset Management System
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', margin: 0 }}>
            {isRegisterMode ? 'Register New Logistics Officer' : 'Secure Defense Logistics Terminal'}
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '0.82rem',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            background: 'rgba(22, 163, 74, 0.1)',
            border: '1px solid rgba(22, 163, 74, 0.3)',
            borderRadius: '6px',
            color: '#16a34a',
            fontSize: '0.82rem',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        {!isRegisterMode ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Officer Username / Call Sign
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or logistics_liberty"
                  className="input-tactical"
                  style={{ paddingLeft: '36px' }}
                />
                <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Access Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-tactical"
                  style={{ paddingLeft: '36px' }}
                />
                <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-tactical btn-primary"
              style={{ width: '100%', padding: '11px', marginTop: '6px' }}
            >
              {loading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Terminal</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Full Name & Rank
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Major John Miller"
                className="input-tactical"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Military Rank
                </label>
                <select
                  value={militaryRank}
                  onChange={(e) => setMilitaryRank(e.target.value)}
                  className="input-tactical"
                >
                  <option value="General">General (4-Star)</option>
                  <option value="Lt. General">Lt. General</option>
                  <option value="Colonel">Colonel</option>
                  <option value="Major">Major</option>
                  <option value="Captain">Captain</option>
                  <option value="Lieutenant">Lieutenant</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Duty Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-tactical"
                >
                  <option value="LOGISTICS_OFFICER">Logistics Officer</option>
                  <option value="BASE_COMMANDER">Base Commander</option>
                  <option value="ADMIN">Supreme Admin</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. jmiller"
                  className="input-tactical"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Base Assignment
                </label>
                <select
                  value={baseId}
                  onChange={(e) => setBaseId(e.target.value)}
                  className="input-tactical"
                >
                  <option value={1}>Fort Liberty Command</option>
                  <option value={2}>Camp Pendleton Marine Base</option>
                  <option value={3}>Norfolk Naval Base</option>
                  <option value={4}>Minot AFB Strategic Wing</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Official Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@defense.mil"
                className="input-tactical"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-tactical"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-tactical btn-primary"
              style={{ width: '100%', padding: '11px', marginTop: '6px' }}
            >
              {loading ? 'Registering Officer...' : 'Create Officer Profile'}
            </button>
          </form>
        )}

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError(null);
              setSuccessMsg(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-orange)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isRegisterMode ? '← Back to Sign In' : '+ Register New Logistics Officer'}
          </button>
        </div>

        {/* Quick Test Accounts Strip */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', textAlign: 'center' }}>
            Fast Access Test Accounts
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setDemoCredentials('admin')}
              className="btn-tactical btn-secondary"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
            >
              Supreme Admin
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('commander_liberty')}
              className="btn-tactical btn-secondary"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
            >
              Base Commander
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('logistics_liberty')}
              className="btn-tactical btn-secondary"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
            >
              Logistics Officer
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '18px',
        fontSize: '0.75rem',
        color: '#e2e8f0',
        textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        textAlign: 'center',
      }}>
        Military Asset Management System &bull; DoD RBAC Security
      </div>
    </div>
  );
};

export default LoginPage;
