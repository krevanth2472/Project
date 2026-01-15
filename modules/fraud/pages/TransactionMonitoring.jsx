

import React, { useMemo, useState } from 'react';

const initialData = [
  { id: 20001, timestamp: '2025-12-20T09:21:00Z', cardholder: 'John Doe', merchant: 'Amazon', country: 'US', amount: 129.99, currency: 'USD', risk: 'low', status: 'ok' },
  { id: 20002, timestamp: '2025-12-20T10:03:00Z', cardholder: 'Jane Smith', merchant: 'Starbucks', country: 'US', amount: 7.25, currency: 'USD', risk: 'low', status: 'ok' },
  { id: 20003, timestamp: '2025-12-20T10:10:00Z', cardholder: 'Alice Brown', merchant: 'eBay', country: 'DE', amount: 545.00, currency: 'EUR', risk: 'medium', status: 'ok' },
  { id: 20004, timestamp: '2025-12-20T11:52:00Z', cardholder: 'Robert King', merchant: 'CryptoEx', country: 'SG', amount: 3200.00, currency: 'USD', risk: 'high', status: 'ok' },
  { id: 20005, timestamp: '2025-12-20T12:14:00Z', cardholder: 'Meera Joshi', merchant: 'Myntra', country: 'IN', amount: 1599.00, currency: 'INR', risk: 'low', status: 'ok' },
  { id: 20006, timestamp: '2025-12-20T13:07:00Z', cardholder: 'John Doe', merchant: 'Hoster.io', country: 'NL', amount: 49.00, currency: 'EUR', risk: 'medium', status: 'ok' },
  { id: 20007, timestamp: '2025-12-20T13:33:00Z', cardholder: 'Jane Smith', merchant: 'UnknownMerchant', country: 'RU', amount: 990.00, currency: 'USD', risk: 'high', status: 'ok' },
  { id: 20008, timestamp: '2025-12-20T14:02:00Z', cardholder: 'Arjun Patel', merchant: 'Flipkart', country: 'IN', amount: 2499.00, currency: 'INR', risk: 'low', status: 'ok' },
  { id: 20009, timestamp: '2025-12-20T14:26:00Z', cardholder: 'Alice Brown', merchant: 'TravelNow', country: 'AE', amount: 1200.00, currency: 'USD', risk: 'medium', status: 'ok' },
  { id: 20010, timestamp: '2025-12-20T15:18:00Z', cardholder: 'Robert King', merchant: 'VPNPro', country: 'SE', amount: 9.99, currency: 'USD', risk: 'medium', status: 'ok' },
];

const riskColor = {
  high: '#e53935',
  medium: '#f39c12',
  low: '#27ae60',
};

function RiskBadge({ level }) {
  return (
    <span
      className="risk-badge"
      style={{
        background: `${riskColor[level]}22`,
        border: `1px solid ${riskColor[level]}`,
        color: riskColor[level],
      }}
    >
      {level.toUpperCase()}
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    ok: { text: 'OK', bg: '#2e7d32' },
    review: { text: 'Under Review', bg: '#1976d2' },
    blocked: { text: 'Blocked', bg: '#e53935' },
  };
  const { text, bg } = map[status] || map.ok;
  return (
    <span
      className="status-pill"
      style={{ background: bg, color: '#fff' }}
    >
      {text}
    </span>
  );
}

function formatAmount(amount, currency) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

function TransactionMonitoring() {
  const [transactions, setTransactions] = useState(initialData);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const normalizedSearch = search.trim().toLowerCase();
  const numericSearch = normalizedSearch.replace(/\D+/g, ''); // e.g. "txn #20001" -> "20001"

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesRisk = riskFilter === 'all' || t.risk === riskFilter;
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

      const dateOk =
        (!startDate || new Date(t.timestamp) >= new Date(startDate)) &&
        (!endDate || new Date(t.timestamp) <= new Date(endDate));

      if (!normalizedSearch) {
        return matchesRisk && matchesStatus && dateOk;
      }

      const idMatch = numericSearch.length > 0 && t.id.toString().includes(numericSearch);
      const cardholderMatch = t.cardholder.toLowerCase().includes(normalizedSearch);
      const merchantMatch = t.merchant.toLowerCase().includes(normalizedSearch);
      const countryMatch = t.country.toLowerCase().includes(normalizedSearch);
      const amountMatch = t.amount.toString().includes(normalizedSearch);

      return (
        matchesRisk &&
        matchesStatus &&
        dateOk &&
        (idMatch || cardholderMatch || merchantMatch || countryMatch || amountMatch)
      );
    });
  }, [transactions, normalizedSearch, numericSearch, riskFilter, statusFilter, startDate, endDate]);

  const handleReview = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'review' } : t))
    );
  };

  const handleBlock = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'blocked' } : t))
    );
  };

  const handleExport = (format) => {
    const rows = filtered.map((t) => ({
      id: t.id,
      timestamp: t.timestamp,
      cardholder: t.cardholder,
      merchant: t.merchant,
      country: t.country,
      amount: t.amount,
      currency: t.currency,
      risk: t.risk,
      status: t.status,
    }));

    const dataStr =
      format === 'csv'
        ? 'id,timestamp,cardholder,merchant,country,amount,currency,risk,status\n' +
          rows
            .map(
              (r) =>
                `${r.id},${r.timestamp},${r.cardholder},${r.merchant},${r.country},${r.amount},${r.currency},${r.risk},${r.status}`
            )
            .join('\n')
        : JSON.stringify(rows, null, 2);

    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h2 className="section-title">📊 Transaction Monitoring</h2>

      {/* Filters */}
      <div className="filters" style={{ flexWrap: 'wrap' }}>
        <input
          className="input"
          type="text"
          placeholder="Search by ID, cardholder, merchant, country, or amount..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="select" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
          <option value="all">Risk: All</option>
          <option value="high">Risk: High</option>
          <option value="medium">Risk: Medium</option>
          <option value="low">Risk: Low</option>
        </select>

        <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Status: All</option>
          <option value="ok">Status: OK</option>
          <option value="review">Status: Under Review</option>
          <option value="blocked">Status: Blocked</option>
        </select>

        <input
          className="input"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          title="Start date"
        />
        <input
          className="input"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          title="End date"
        />
      </div>

      {/* Export */}
      <div className="button-group" style={{ flexWrap: 'wrap' }}>
        <button className="button" onClick={() => handleExport('csv')}>Export CSV</button>
        <button className="button" onClick={() => handleExport('json')}>Export JSON</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date/Time</th>
              <th>Cardholder</th>
              <th>Merchant</th>
              <th>Country</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
              <th style={{ width: 170 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#666' }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className={`row-risk-${t.risk}`}>
                  <td>#{t.id}</td>
                  <td>{new Date(t.timestamp).toLocaleString()}</td>
                  <td>{t.cardholder}</td>
                  <td>{t.merchant}</td>
                  <td>{t.country}</td>
                  <td>{formatAmount(t.amount, t.currency)}</td>
                  <td><RiskBadge level={t.risk} /></td>
                  <td><StatusPill status={t.status} /></td>
                  <td>
                    <div className="button-group">
                      <button
                        className="button button-secondary"
                        onClick={() => handleReview(t.id)}
                        disabled={t.status === 'review'}
                        title="Mark as Under Review"
                      >
                        Review
                      </button>
                      <button
                        className="button button-danger"
                        onClick={() => handleBlock(t.id)}
                        disabled={t.status === 'blocked'}
                        title="Block transaction"
                      >
                        Block
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionMonitoring;

