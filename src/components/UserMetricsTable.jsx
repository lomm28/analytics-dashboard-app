import React, { useState, useEffect } from 'react';
import './UserMetricsTable.css';

const UserMetricsTable = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetch('/data/user-metrics.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error loading user metrics:', error));
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>User Metrics by Region</h2>
      </div>
      <div className="table-wrapper">
        <table className="metrics-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('region')}>
                Region {getSortIcon('region')}
              </th>
              <th onClick={() => handleSort('activeUsers')}>
                Active Users {getSortIcon('activeUsers')}
              </th>
              <th onClick={() => handleSort('newUsers')}>
                New Users {getSortIcon('newUsers')}
              </th>
              <th onClick={() => handleSort('churnRate')}>
                Churn Rate {getSortIcon('churnRate')}
              </th>
              <th onClick={() => handleSort('avgSessionTime')}>
                Avg Session (min) {getSortIcon('avgSessionTime')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="region-cell">{row.region}</td>
                <td>{row.activeUsers.toLocaleString()}</td>
                <td>{row.newUsers.toLocaleString()}</td>
                <td>
                  <span className={`churn-badge ${row.churnRate > 3 ? 'high' : 'low'}`}>
                    {row.churnRate}%
                  </span>
                </td>
                <td>{row.avgSessionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserMetricsTable;

