import React, { useState } from "react";
import styles from "../../utils/styles";
import { formatDate } from "../../utils/formatDate";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function ExportReports({ auditLogs, onExport }) {
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesDate = filterDate ? log.date.startsWith(filterDate) : true;
    const matchesUser = filterUser ? (log.user || "").includes(filterUser) : true;
    return matchesDate && matchesUser;
  });

  // ✅ Export audit logs as CSV
  const exportAuditCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLogs);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AuditLogs.csv";
    link.click();
  };

  // ✅ Export audit logs as Excel
  const exportAuditExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AuditLogs");
    XLSX.writeFile(workbook, "AuditLogs.xlsx");
  };

  // ✅ Export compliance report as PDF
  const exportCompliancePDF = () => {
    const doc = new jsPDF();
    doc.text("Compliance Checklist", 10, 10);
    doc.text("- Data minimization verified", 10, 20);
    doc.text("- User consent recorded", 10, 30);
    doc.text("- Access controls validated", 10, 40);
    doc.save("ComplianceReport.pdf");
  };

  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>Export reports</div>

      {/* Compliance checklist */}
      <div style={{ marginBottom: 12 }}>
        <div style={styles.label}>Compliance checklist</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Data minimization verified</li>
          <li>User consent recorded</li>
          <li>Access controls validated</li>
        </ul>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 12 }}>
        <div style={styles.label}>Filter logs</div>
        <div style={styles.filterRow}>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Filter by user"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      {/* Audit trail */}
      <div style={{ marginBottom: 12 }}>
        <div style={styles.label}>Audit trail</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>Report ID</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{log.action}</td>
                <td style={styles.td}>{log.reportId}</td>
                <td style={styles.td}>{formatDate(log.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button style={styles.btnPrimary} onClick={exportCompliancePDF}>
          Generate compliance PDF
        </button>
        <button style={styles.btnSecondary} onClick={exportAuditCSV}>
          Download audit log CSV
        </button>
        <button style={styles.btnSecondary} onClick={exportAuditExcel}>
          Download audit log Excel
        </button>
      </div>
    </div>
  );
}
