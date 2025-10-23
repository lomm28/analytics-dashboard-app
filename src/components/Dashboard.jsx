import React, { useState, useEffect } from 'react';
import MetricsCard from './MetricsCard';
import SalesChart from './SalesChart';
import ProductChart from './ProductChart';
import UserMetricsTable from './UserMetricsTable';
import './Dashboard.css';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [userMetrics, setUserMetrics] = useState([]);

  useEffect(() => {
    // Load sales data for summary metrics
    fetch('/data/sales-data.json')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error loading sales data:', error));

    // Load user metrics for summary
    fetch('/data/user-metrics.json')
      .then(response => response.json())
      .then(data => setUserMetrics(data))
      .catch(error => console.error('Error loading user metrics:', error));
  }, []);

  // Calculate summary metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCustomers = salesData.length > 0 ? salesData[salesData.length - 1].customers : 0;
  const totalActiveUsers = userMetrics.reduce((sum, item) => sum + item.activeUsers, 0);
  const avgChurnRate = userMetrics.length > 0
    ? (userMetrics.reduce((sum, item) => sum + item.churnRate, 0) / userMetrics.length).toFixed(1)
    : 0;

  // Calculate growth (comparing first and last month)
  const revenueGrowth = salesData.length >= 2
    ? (((salesData[salesData.length - 1].revenue - salesData[0].revenue) / salesData[0].revenue) * 100).toFixed(1)
    : 0;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p className="dashboard-subtitle">Real-time business insights and metrics</p>
      </header>

      <div className="metrics-grid">
        <MetricsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="Last 6 months"
          trend={parseFloat(revenueGrowth)}
        />
        <MetricsCard
          title="Active Customers"
          value={totalCustomers.toLocaleString()}
          subtitle="Current month"
        />
        <MetricsCard
          title="Total Users"
          value={totalActiveUsers.toLocaleString()}
          subtitle="All regions"
        />
        <MetricsCard
          title="Avg Churn Rate"
          value={`${avgChurnRate}%`}
          subtitle="Across all regions"
          trend={-parseFloat(avgChurnRate)}
        />
      </div>

      <div className="charts-grid">
        <SalesChart />
        <ProductChart />
      </div>

      <UserMetricsTable />
    </div>
  );
};

export default Dashboard;

