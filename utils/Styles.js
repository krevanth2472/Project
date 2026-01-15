const styles = {
  app: {
    fontFamily: "Inter, system-ui, sans-serif",
    padding: 24,
    background: "#f6f7f9",
    minHeight: "100vh",
    marginTop: 20
  },
  header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  nav: { display: "flex", gap: 12 },
  navBtn: (active) => ({
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #d0d4da",
    background: active ? "#111827" : "#fff",
    color: active ? "#fff" : "#111827",
    cursor: "pointer",
    fontSize: 14,
  }),
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  kpi: { padding: 12, borderRadius: 10, border: "1px solid #e5e7eb", background: "#fafafa" },
  label: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  value: { fontSize: 22, fontWeight: 600, color: "#111827" },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginBottom: 8 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #d1d5db", width: "90%" },
  checkboxRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  btnRow: { display: "flex", gap: 8, marginTop: 12 },
  btnPrimary: { padding: "10px 14px", borderRadius: 8, border: "1px solid #111827", background: "#111827", color: "#fff", cursor: "pointer" },
  btnSecondary: { padding: "10px 14px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", color: "#111827", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" },
  td: { padding: "10px 8px", borderBottom: "1px solid #f1f5f9", fontSize: 14 },
  chartBox: {
    height: 340, // 🔹 increased height
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    background: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  filterRow: { display: "flex", gap: 12, alignItems: "center" },
};

export default styles;
