import React from 'react';
import { Shield, ChevronRight, Activity, Zap, Layers } from 'lucide-react';

const HeroBanner = ({ onExploreNetMovement }) => {
  return (
    <div className="glass-panel" style={{
      borderRadius: '8px',
      padding: '22px 28px',
      marginBottom: '20px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '20px',
    }}>
      <div style={{ maxWidth: '720px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge-tactical badge-admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Shield size={13} /> DEFENSE LOGISTICS OVERVIEW
          </span>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }} />
            SYSTEM STATUS: REAL-TIME LEDGER ACTIVE
          </span>
        </div>

        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
          Defense Materiel & Military Asset Ledger
        </h1>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Centralized accounting for Opening Balances, Net Movements (<span className="font-mono" style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>Purchases + Transfers In - Transfers Out</span>), Active Troop Checkouts, and Consumable Expenditures.
        </p>
      </div>

      <div>
        <button onClick={onExploreNetMovement} className="btn-tactical btn-primary" style={{ padding: '9px 18px' }}>
          <Layers size={15} /> Net Movement Drilldown <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
