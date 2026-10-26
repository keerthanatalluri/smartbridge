import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let icon = <Info size={18} color="var(--primary-600)" />;
        let borderColor = 'var(--primary-200)';
        let bgIcon = '#eff6ff';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="var(--success-600)" />;
          borderColor = 'rgba(16, 185, 129, 0.3)';
          bgIcon = '#ecfdf5';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={18} color="var(--warning-600)" />;
          borderColor = 'rgba(245, 158, 11, 0.3)';
          bgIcon = '#fffbeb';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={18} color="var(--danger-600)" />;
          borderColor = 'rgba(239, 68, 68, 0.3)';
          bgIcon = '#fef2f2';
        }

        return (
          <div
            key={toast.id}
            className="toast"
            style={{ borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success-500)' : toast.type === 'warning' ? 'var(--warning-500)' : toast.type === 'error' ? 'var(--danger-500)' : 'var(--primary-600)'}` }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: bgIcon,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-900)' }}>
                {toast.title}
              </div>
              {toast.description && (
                <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '0.15rem' }}>
                  {toast.description}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--slate-400)',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Dismiss toast"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

