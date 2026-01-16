
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import GenerateReport from "./components/GenerateReport";
import ReportDetails from "./components/ReportDetails";
import ExportReports from "./components/ExportReports";
import "./utils/styles.css";

export default function Layout() {
  const [screen, setScreen] = useState("dashboard");
  const [currentReport, setCurrentReport] = useState(null);
  const [auditLogs, setAuditLogs] = useState([
    { action: "Compliance Report", reportId: "C-2024-10", date: "2024-10-04T10:00:00Z" },
    { action: "Audit Report", reportId: "A-2024-08", date: "2024-08-04T10:00:00Z" },
    { action: "Audit Report", reportId: "A-2024-05", date: "2024-05-04T10:00:00Z" },
  ]);

  const navigate = (key) => setScreen(key);

  const handleGenerated = (report) => {
    setCurrentReport(report);
    setAuditLogs((logs) => [
      { action: "Generated Report", reportId: report.reportId, date: new Date().toISOString() },
      ...logs,
    ]);
    setScreen("details");
  };

  const handleGenerateQuick = ({ dateRange, segment, campaign }) => {
    const report = {
      reportId: `${Math.floor(Math.random() * 90000) + 10000}`,
      generatedDate: new Date().toISOString(),
      dateRange,
      segment,
      campaign,
      metrics: { engagementRate: "75%", redemptionRate: "45%", retentionRate: "65%" },
    };
    handleGenerated(report);
  };

  const handleExport = (type) => {
    alert(`${type} exported`);
    setAuditLogs((logs) => [
      { action: type, reportId: currentReport?.reportId || "-", date: new Date().toISOString() },
      ...logs,
    ]);
  };

  return (
    <div className="app">
      <div className="header">
        <h2 style={{ margin: 0 }}>Loyalty Analytics & Reporting</h2>
        <div className="nav">
          <button
            className={`navBtn ${screen === "dashboard" ? "active" : ""}`}
            onClick={() => navigate("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`navBtn ${screen === "generate" ? "active" : ""}`}
            onClick={() => navigate("generate")}
          >
            Generate Report
          </button>
          <button
            className={`navBtn ${screen === "details" ? "active" : ""}`}
            onClick={() => navigate("details")}
          >
            Report Details
          </button>
          <button
            className={`navBtn ${screen === "export" ? "active" : ""}`}
            onClick={() => navigate("export")}
          >
            Export Reports
          </button>
        </div>
      </div>

      {screen === "dashboard" && (
        <Dashboard onNavigate={navigate} onGenerateQuick={handleGenerateQuick} />
      )}
      {screen === "generate" && (
        <GenerateReport onCancel={() => navigate("dashboard")} onGenerated={handleGenerated} />
      )}
      {screen === "details" && (
        <ReportDetails report={currentReport} onBack={() => navigate("dashboard")} />
      )}
      {screen === "export" && (
        <ExportReports auditLogs={auditLogs} onExport={handleExport} />
      )}
    </div>
  );
}
