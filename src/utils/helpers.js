export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  export const getTimeRemaining = (expiresAt) => {
    if (!expiresAt) return 'Never expires';
  
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry - now;
  
    if (diffTime <= 0) return 'Expired';
  
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays > 0) {
      return `${diffDays} days left`;
    } else {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      return `${diffHours} hours left`;
    }
  };
  
  export const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };