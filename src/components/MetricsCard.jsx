import React from 'react';
import './MetricsCard.css';

const MetricsCard = ({ title, value, subtitle, trend }) => {
  const trendClass = trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral';
  
  return (
    <div className="metrics-card">
      <h3 className="metrics-card__title">{title}</h3>
      <div className="metrics-card__value">{value}</div>
      {subtitle && <div className="metrics-card__subtitle">{subtitle}</div>}
      {trend !== undefined && (
        <div className={`metrics-card__trend ${trendClass}`}>
          {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

export default MetricsCard;

