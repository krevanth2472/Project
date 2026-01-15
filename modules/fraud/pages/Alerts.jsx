
// src/components/Alerts.jsx
import React, { useState, useMemo } from 'react';

function Alerts() {
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('all');

  const alerts = [
    { id: 1102, severity: 'high', message: 'Fraud attempt detected' },
    { id: 1056, severity: 'medium', message: 'Unusual location' },
    { id: 1023, severity: 'low', message: 'Minor anomaly' },
    { id: 1188, severity: 'high', message: 'Multiple rapid attempts' },
    { id: 1201, severity: 'medium', message: 'Unusual merchant category' },
    { id: 1215, severity: 'low', message: 'Small mismatch in billing address' },
    { id: 1220, severity: 'high', message: 'Large transaction flagged' },
    { id: 1233, severity: 'medium', message: 'Card used in new country' },
    { id: 1240, severity: 'low', message: 'Repeated login attempts' },
    { id: 1255, severity: 'high', message: 'Suspicious IP address detected' },
  ];

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    const result = alerts.filter((a) => {
      const severityMatch = severity === 'all' || a.severity === severity;

      if (!normalizedSearch) {
        // No search → return by severity only
        return severityMatch;
      }

      const idMatch = a.id.toString().includes(normalizedSearch);
      const messageMatch = a.message.toLowerCase().includes(normalizedSearch);
      const severityKeywordMatch = a.severity.toLowerCase().includes(normalizedSearch);

      return severityMatch && (idMatch || messageMatch || severityKeywordMatch);
    });

    // Debug logs (open browser devtools to see)
    console.log('search:', normalizedSearch, 'severity:', severity, 'filteredCount:', result.length);
    return result;
  }, [alerts, severity, normalizedSearch]);

  return (
    <div className="card">
      <div className="alerts-header">
        <h2 className="section-title">🚨 Alerts</h2>
        <div className="filters">
          <input
            className="input"
            type="text"
            placeholder="Search by ID, message, or severity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#666', marginTop: 10 }}>No alerts found.</p>
      ) : (
        filtered.map((alert) => (
          <div key={alert.id} className={`alert-card ${alert.severity}`}>
            <h3>{alert.severity.toUpperCase()} Severity</h3>
            <p>Transaction #{alert.id} — {alert.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Alerts;
