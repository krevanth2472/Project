import React, { useState } from "react";
import styles from "../../utils/styles";
import Sparkline from "./Sparkline";

export default function GenerateReport({ onCancel, onGenerated }) {
  const [metrics, setMetrics] = useState({
    engagementRate: true,
    redemptionRate: true,
    retentionRate: false,
  });
  const [dateRange, setDateRange] = useState({
    from: "2025-11-01",
    to: "2025-12-10",
  });
  const [reportId, setReportId] = useState(
    () => `${Math.floor(Math.random() * 90000) + 10000}`
  );

  const toggle = (key) =>
    setMetrics((m) => ({
      ...m,
      [key]: !m[key],
    }));

  const handleGenerate = () => {
    const now = new Date();
    const payload = {
      reportId,
      generatedDate: now.toISOString(),
      metrics: {
        engagementRate: metrics.engagementRate ? "72%" : null,
        redemptionRate: metrics.redemptionRate ? "48%" : null,
        retentionRate: metrics.retentionRate ? "65%" : null,
      },
      dateRange,
    };
    onGenerated(payload);
  };

  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>Generate report</div>
      <div style={{ display: "grid", gap: 12 }}>
        {/* Report ID */}
        <div>
          <div style={styles.label}>Report ID</div>
          <input
            type="text"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Metrics checkboxes */}
        <div>
          <div style={styles.label}>Metrics</div>
          <div style={styles.checkboxRow}>
            <label>
              <input
                type="checkbox"
                checked={metrics.engagementRate}
                onChange={() => toggle("engagementRate")}
              />{" "}
              Engagement rate
            </label>
            <label>
              <input
                type="checkbox"
                checked={metrics.redemptionRate}
                onChange={() => toggle("redemptionRate")}
              />{" "}
              Redemption rate
            </label>
            <label>
              <input
                type="checkbox"
                checked={metrics.retentionRate}
                onChange={() => toggle("retentionRate")}
              />{" "}
              Retention rate
            </label>
          </div>
        </div>

        {/* Date range */}
        <div style={styles.grid2}>
          <div>
            <div style={styles.label}>Date from</div>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((r) => ({ ...r, from: e.target.value }))
              }
              style={styles.input}
            />
          </div>
          <div>
            <div style={styles.label}>Date to</div>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange((r) => ({ ...r, to: e.target.value }))
              }
              style={styles.input}
            />
          </div>
        </div>

        {/* Preview chart */}
        <div style={styles.sectionTitle}>Preview</div>
        <div style={styles.chartBox}>
          {/* ✅ Larger Sparkline with axes */}
          <Sparkline data={[45, 50, 48, 52, 49, 55, 58]} color="#2563eb" />
        </div>

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.btnPrimary} onClick={handleGenerate}>
            Generate report
          </button>
          <button style={styles.btnSecondary} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
