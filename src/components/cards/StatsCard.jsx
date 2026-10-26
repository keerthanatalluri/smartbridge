import React from 'react';

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue'
}) => {
  const colorMap = {
    blue: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
    green: { bg: '#ecfdf5', border: '#a7f3d0', text: '#10b981' },
    amber: { bg: '#fffbeb', border: '#fde68a', text: '#f59e0b' },
    purple: { bg: '#f5f3ff', border: '#ddd6fe', text: '#8b5cf6' },
    rose: { bg: '#fef2f2', border: '#fecaca', text: '#ef4444' }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-500)' }}>
          {title}
        </span>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          backgroundColor: scheme.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: scheme.text
        }}>
          {icon}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {trend && (
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: trend.startsWith('+') ? 'var(--success-600)' : 'var(--slate-500)',
            backgroundColor: trend.startsWith('+') ? 'var(--success-50)' : 'var(--slate-100)',
            padding: '0.15rem 0.45rem',
            borderRadius: '9999px'
          }}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--slate-400)', margin: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

