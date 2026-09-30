import React from 'react';
import { ChevronRight } from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor = 'orange', // 'orange', 'emerald', 'amber', 'rose', 'indigo'
  interactive = false,
  badgeText = null,
  onClick = null,
}) => {
  const getAccentDetails = () => {
    switch (accentColor) {
      case 'emerald':
        return {
          color: '#16a34a',
          bgIcon: 'rgba(22, 163, 74, 0.1)',
          border: 'rgba(22, 163, 74, 0.25)',
        };
      case 'amber':
        return {
          color: '#d97706',
          bgIcon: 'rgba(217, 119, 6, 0.1)',
          border: 'rgba(217, 119, 6, 0.25)',
        };
      case 'rose':
        return {
          color: '#dc2626',
          bgIcon: 'rgba(220, 38, 38, 0.1)',
          border: 'rgba(220, 38, 38, 0.25)',
        };
      case 'indigo':
        return {
          color: '#4f46e5',
          bgIcon: 'rgba(79, 70, 229, 0.1)',
          border: 'rgba(79, 70, 229, 0.25)',
        };
      case 'orange':
      default:
        return {
          color: '#ea580c',
          bgIcon: 'rgba(234, 88, 12, 0.1)',
          border: 'rgba(234, 88, 12, 0.25)',
        };
    }
  };

  const accent = getAccentDetails();

  return (
    <div
      onClick={onClick}
      className={`glass-panel ${interactive ? 'glass-panel-interactive' : ''}`}
      style={{
        padding: '20px',
        position: 'relative',
        borderLeft: `3px solid ${accent.color}`,
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          {badgeText && (
            <span style={{
              marginLeft: '8px',
              fontSize: '0.68rem',
              padding: '2px 6px',
              borderRadius: '4px',
              background: accent.bgIcon,
              color: accent.color,
              border: `1px solid ${accent.border}`,
              fontWeight: 700
            }}>
              {badgeText}
            </span>
          )}
        </div>

        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            background: accent.bgIcon,
            border: `1px solid ${accent.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={18} color={accent.color} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          {subtitle}
        </span>
        {interactive && (
          <span style={{
            fontSize: '0.75rem',
            color: accent.color,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontWeight: 600
          }}>
            Audit Breakdown <ChevronRight size={13} />
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
