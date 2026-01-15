import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function AuditReports() {
  const [userFilter, setUserFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Sample audit log data
  const auditLog = [
    { id: 1, user: 'John Doe', action: 'Login', date: '2025-12-20' },
    { id: 2, user: 'Jane Smith', action: 'Viewed Alerts', date: '2025-12-20' },
    { id: 3, user: 'John Doe', action: 'Exported Report', date: '2025-12-19' },
    { id: 4, user: 'Alice Brown', action: 'Flagged Transaction', date: '2025-12-18' },
    { id: 5, user: 'Jane Smith', action: 'Login', date: '2025-12-18' },
  ];

  // Filtered log
  const filteredLog = auditLog.filter(
    (entry) =>
      (userFilter === '' || entry.user.toLowerCase().includes(userFilter.toLowerCase())) &&
      (dateFilter === '' || entry.date === dateFilter)
  );

  // Fraud trend chart data (sample)
  const chartData = {
    labels: ['Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20'],
    datasets: [
      {
        label: 'Fraud Alerts',
        data: [2, 5, 3, 6, 4, 7],
        borderColor: '#e53935',
        backgroundColor: 'rgba(229,57,53,0.3)',
        tension: 0.3,
      },
    ],
  };

  // Chart options to reduce size and add padding
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 30, // ensures x-axis labels are visible
      },
    },
  };

  // Export simulation
  const handleExport = (format) => {
    const dataStr =
      format === 'csv'
        ? 'id,user,action,date\n' +
          filteredLog.map((e) => `${e.id},${e.user},${e.action},${e.date}`).join('\n')
        : JSON.stringify(filteredLog, null, 2);

    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-report.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h2 className="section-title">📑 Audit & Reports</h2>

      {/* Filters */}
      <div className="filters">
        <input
          className="input"
          type="text"
          placeholder="Filter by user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Audit Log */}
      <div className="audit-log">
        <h3>Audit Log</h3>
        <ul>
          {filteredLog.map((entry) => (
            <li key={entry.id} className="list-item">
              <strong>{entry.user}</strong> — {entry.action} ({entry.date})
            </li>
          ))}
        </ul>
      </div>

      {/* Fraud Trends Chart */}
      <div className="chart-section" style={{ width: '300px', height: '200px', marginBottom: '20px' }}>
        <h3>Fraud Trends</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Export Buttons */}
      <div className="button-group" style={{ marginTop: '10px' }}>
        <button className="button" onClick={() => handleExport('csv')}>Export CSV</button>
        <button className="button" onClick={() => handleExport('json')}>Export JSON</button>
      </div>
    </div>
  );
}

export default AuditReports;
