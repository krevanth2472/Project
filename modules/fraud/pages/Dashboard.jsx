import React, { useState } from "react";

function Dashboard() {
  const [view, setView] = useState(null);

  const anomalies = [
    { id: 1102, description: "Suspicious Amount — unusually large transaction compared to history" },
    { id: 1056, description: "Location Mismatch — card used in a new country" },
    { id: 1188, description: "Multiple rapid attempts — repeated failed transactions in seconds" },
  ];

  const flagged = [
    { id: 1220, description: "Large transaction flagged for manual review" },
    { id: 1255, description: "Suspicious IP address detected during login" },
    { id: 1201, description: "Unusual merchant category flagged by compliance rules" },
  ];

  return (
    <div className="card dashboard">
      {/* Horizontal metrics */}
      <div className="metrics-row">
        <div className="metric">
          <h3>Total Transactions</h3>
          <div className="value">12,450</div>
        </div>
        <div className="metric">
          <h3>Anomalies Detected</h3>
          <div className="value">{anomalies.length}</div>
        </div>
        <div className="metric">
          <h3>Flagged Alerts</h3>
          <div className="value">{flagged.length}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        {/* Show anomalies button only if flagged view is NOT active */}
        {view !== "flagged" && (
          <button
            className="button"
            onClick={() => setView(view === "anomalies" ? null : "anomalies")}
          >
            View Anomalies
          </button>
        )}
        {view === "anomalies" && (
          <div className="list-section">
            <ul className="list">
              {anomalies.map((a) => (
                <li key={a.id} className="list-item">
                  <strong>Transaction #{a.id}:</strong> {a.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show flagged button only if anomalies view is NOT active */}
        {view !== "anomalies" && (
          <button
            className="button"
            onClick={() => setView(view === "flagged" ? null : "flagged")}
          >
            View Flagged Alerts
          </button>
        )}
        {view === "flagged" && (
          <div className="list-section">
            <ul className="list">
              {flagged.map((f) => (
                <li key={f.id} className="list-item">
                  <strong>Transaction #{f.id}:</strong> {f.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
