import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  UserCheck,
  Briefcase
} from 'lucide-react';

export const StatusBadge = ({ status, size = 'sm' }) => {
  if (!status) return null;

  const normalized = String(status).toLowerCase().replace(/\s+/g, '-');

  let icon = null;
  let label = status;
  let customStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    borderRadius: '9999px',
    fontWeight: '600',
    fontSize: size === 'sm' ? '0.75rem' : '0.8125rem',
    padding: size === 'sm' ? '0.2rem 0.6rem' : '0.35rem 0.85rem'
  };

  switch (normalized) {
    case 'open':
      icon = <Clock size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe'
      };
      break;
    case 'in-progress':
      icon = <Briefcase size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#fffbeb',
        color: '#b45309',
        border: '1px solid #fde68a'
      };
      label = 'In Progress';
      break;
    case 'completed':
    case 'approved':
      icon = <CheckCircle2 size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#ecfdf5',
        color: '#047857',
        border: '1px solid #a7f3d0'
      };
      break;
    case 'submitted':
      icon = <FileText size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#f5f3ff',
        color: '#6d28d9',
        border: '1px solid #ddd6fe'
      };
      label = 'Deliverable Submitted';
      break;
    case 'accepted':
      icon = <CheckCircle2 size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#ecfdf5',
        color: '#047857',
        border: '1px solid #a7f3d0'
      };
      break;
    case 'pending':
      icon = <Clock size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#f1f5f9',
        color: '#475569',
        border: '1px solid #cbd5e1'
      };
      break;
    case 'rejected':
      icon = <XCircle size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      };
      break;
    case 'withdrawn':
      icon = <AlertCircle size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#f8fafc',
        color: '#64748b',
        border: '1px solid #e2e8f0'
      };
      break;
    case 'freelancer':
      icon = <UserCheck size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#f5f3ff',
        color: '#6d28d9',
        border: '1px solid #ddd6fe'
      };
      label = 'Freelancer';
      break;
    case 'client':
      icon = <Briefcase size={12} />;
      customStyle = {
        ...customStyle,
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe'
      };
      label = 'Client';
      break;
    case 'admin':
      customStyle = {
        ...customStyle,
        backgroundColor: '#fef2f2',
        color: '#991b1b',
        border: '1px solid #fecaca'
      };
      label = 'Admin';
      break;
    case 'active':
      customStyle = {
        ...customStyle,
        backgroundColor: '#ecfdf5',
        color: '#047857',
        border: '1px solid #a7f3d0'
      };
      break;
    case 'suspended':
      customStyle = {
        ...customStyle,
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      };
      break;
    default:
      customStyle = {
        ...customStyle,
        backgroundColor: '#f1f5f9',
        color: '#475569',
        border: '1px solid #cbd5e1'
      };
  }

  return (
    <span style={customStyle}>
      {icon}
      <span>{label}</span>
    </span>
  );
};

