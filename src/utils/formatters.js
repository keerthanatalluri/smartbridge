export const formatCurrency = (amount, type = 'Fixed') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);

  return type === 'Hourly' ? `${formatted}/hr` : formatted;
};

export const formatDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return 'Invalid date';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'N/A';
  }
};

export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return 'Recently';
  try {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return formatDate(dateInput);
  } catch {
    return 'Recently';
  }
};

export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const calculateMilestoneProgress = (milestones = []) => {
  if (!milestones.length) return 0;
  const approved = milestones.filter(m => m.status === 'Approved').length;
  return Math.round((approved / milestones.length) * 100);
};

