import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ArrowLeftRight, 
  Users, 
  Package, 
  ShieldAlert, 
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { isAdmin, isCommander } = useAuth();

  const navItems = [
    {
      to: '/',
      label: 'Operational Dashboard',
      icon: LayoutDashboard,
      badge: 'LIVE',
      show: true,
    },
    {
      to: '/purchases',
      label: 'Procurements & Purchases',
      icon: ShoppingCart,
      badge: null,
      show: true,
    },
    {
      to: '/transfers',
      label: 'Inter-Base Transfers',
      icon: ArrowLeftRight,
      badge: null,
      show: true,
    },
    {
      to: '/assignments-expenditures',
      label: 'Assignments & Munitions',
      icon: Users,
      badge: null,
      show: true,
    },
    {
      to: '/inventory',
      label: 'Inventory Stock Ledger',
      icon: Package,
      badge: null,
      show: true,
    },
    {
      to: '/audit-logs',
      label: 'Audit Trail & Security Logs',
      icon: ShieldAlert,
      badge: 'SEC',
      show: isAdmin || isCommander,
    },
  ];

  return (
    <aside style={{
      width: '250px',
      background: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 64px)',
      padding: '20px 12px',
    }}>
      <div style={{ marginBottom: '14px', paddingLeft: '10px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.06em', fontWeight: 700, textTransform: 'uppercase' }}>
          Navigation
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.filter(item => item.show).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '6px',
                color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                background: isActive ? 'rgba(234, 88, 12, 0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(234, 88, 12, 0.25)' : '1px solid transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem',
                transition: 'all 0.15s ease',
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={17} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: item.badge === 'LIVE' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(234, 88, 12, 0.1)',
                  color: item.badge === 'LIVE' ? '#16a34a' : 'var(--accent-orange)',
                  border: `1px solid ${item.badge === 'LIVE' ? 'rgba(22, 163, 74, 0.25)' : 'rgba(234, 88, 12, 0.25)'}`
                }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Security Compliance Box */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <ShieldCheck size={15} color="#16a34a" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 700 }}>
            AUDIT COMPLIANT
          </span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.45 }}>
          All procurement, transfer, and deployment transactions are timestamped and logged.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
