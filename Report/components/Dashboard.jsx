import React, { useState, useEffect } from "react";
import styles from "../../utils/styles";
import Sparkline from "./Sparkline";

const mockTrend = [60, 64, 58, 62, 68, 72, 70, 75, 73, 76, 74];

export default function Dashboard({ onNavigate, onGenerateQuick }) {
  const [dateRange, setDateRange] = useState({
    from: "2025-11-01",
    to: "2025-12-10",
  });
  const [segment, setSegment] = useState("All Customers");
  const [campaign, setCampaign] = useState("All Campaigns");
  const [kpis, setKpis] = useState([
    { label: "Engagement rate", value: "75%" },
    { label: "Redemption rate", value: "45%" },
    { label: "Retention rate", value: "65%" },
  ]);

  // 🔹 Fetch KPIs from backend whenever filters change
  useEffect(() => {
    fetch(
      `/api/dashboard?from=${dateRange.from}&to=${dateRange.to}&segment=${segment}&campaign=${campaign}`
    )
      .then((res) => res.json())
      .then((data) => {
        setKpis([
          { label: "Engagement rate", value: data.engagementRate },
          { label: "Redemption rate", value: data.redemptionRate },
          { label: "Retention rate", value: data.retentionRate },
        ]);
      })
      .catch((err) => console.error("Error fetching KPIs:", err));
  }, [dateRange, segment, campaign]);

  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>Dashboard overview</div>
      <div style={styles.grid3}>
        {kpis.map((k) => (
          <div key={k.label} style={styles.kpi}>
            <div style={styles.label}>{k.label}</div>
            <div style={styles.value}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={styles.sectionTitle}>Trends</div>
        <div style={styles.grid2}>
          <div style={styles.chartBox}>
            <Sparkline data={mockTrend} />
          </div>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Filters</div>

            {/* Date range filters */}
            <div style={styles.filterRow}>
              <div style={{ flex: 1 }}>
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
              <div style={{ flex: 1 }}>
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

            {/* Segment filter */}
            <div style={{ marginTop: 12 }}>
              <div style={styles.label}>Segment</div>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                style={styles.input}
              >
                <option>All Customers</option>
                <option>New Users</option>
                <option>High Value</option>
                <option>At Risk</option>
              </select>
            </div>

            {/* Campaign filter */}
            <div style={{ marginTop: 12 }}>
              <div style={styles.label}>Campaign</div>
              <select
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                style={styles.input}
              >
                <option>All Campaigns</option>
                <option>Holiday</option>
                <option>YearEnd</option>
                <option>Promo</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={styles.btnRow}>
              <button
                style={styles.btnPrimary}
                onClick={() =>
                  onGenerateQuick({ dateRange, segment, campaign })
                }
              >
                Report Details
              </button>
              <button
                style={styles.btnSecondary}
                onClick={() => onNavigate("generate")}
              >
                Export data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
