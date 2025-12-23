import React from 'react';
import './HealthCheck.css';

function HealthCheck({ status }) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'online':
        return { icon: '🟢', text: 'API Online', className: 'online' };
      case 'offline':
        return { icon: '🔴', text: 'API Offline', className: 'offline' };
      case 'checking':
        return { icon: '🟡', text: 'Checking...', className: 'checking' };
      default:
        return { icon: '⚪', text: 'Unknown', className: 'unknown' };
    }
  };

  const { icon, text, className } = getStatusDisplay();

  return (
    <div className={`health-check ${className}`}>
      <span className="status-icon">{icon}</span>
      <span className="status-text">{text}</span>
    </div>
  );
}

export default HealthCheck;
