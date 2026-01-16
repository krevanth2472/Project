import React from "react";
import styles from "../../utils/styles";
import Sparkline from "./Sparkline";
import { formatDate } from "../../utils/formatDate";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function ReportDetails({ report, onBack }) {
  if (!report) {
    return (
      <div style={styles.card}>
        <div style={styles.sectionTitle}>Report details</div>
        <div>No report selected.</div>
        <div style={{ marginTop: 12 }}>
          <button style={styles.btnSecondary} onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  const rows = Object.entries(report.metrics)
    .filter(([, v]) => v !== null)
    .map(([k, v]) => ({ metric: k.replace(/([A-Z])/g, " $1"), value: v }));

  // ✅ Export as CSV/Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `Report_${report.reportId}.xlsx`);
  };

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Report_${report.reportId}.csv`;
    link.click();
  };

  // ✅ Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Report ID: ${report.reportId}`, 10, 10);
    doc.text(`Generated Date: ${formatDate(report.generatedDate)}`, 10, 20);
    doc.text("Metrics:", 10, 30);

    rows.forEach((r, i) => {
      doc.text(`${r.metric}: ${r.value}`, 10, 40 + i * 10);
    });

    doc.save(`Report_${report.reportId}.pdf`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>Report details</div>
      <div style={styles.grid2}>
        <div>
          <div style={styles.label}>Report ID</div>
          <div>{report.reportId}</div>
        </div>
        <div>
          <div style={styles.label}>Generated date</div>
          <div>{formatDate(report.generatedDate)}</div>
        </div>
      </div>

      {/* Metrics table */}
      <div style={{ marginTop: 12 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Metric</th>
              <th style={styles.th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric}>
                <td style={styles.td}>{r.metric}</td>
                <td style={styles.td}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trend chart */}
      <div style={{ marginTop: 16 }}>
        <div style={styles.sectionTitle}>Trend</div>
        <div style={styles.chartBox}>
          <Sparkline data={[40, 45, 42, 48, 50, 47, 52]} color="#059669" />
        </div>
      </div>

      {/* Export buttons */}
      <div style={styles.btnRow}>
        <button style={styles.btnSecondary} onClick={exportPDF}>Export PDF</button>
        <button style={styles.btnSecondary} onClick={exportCSV}>Export CSV</button>
        <button style={styles.btnSecondary} onClick={exportExcel}>Export Excel</button>
        <button style={styles.btnSecondary} onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
