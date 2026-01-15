import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
function formatDate(d) { try { return new Date(d).toLocaleDateString('en-IN') } catch { return d } }
export default function Transactions() {
    const { transactions, remainingPoints, nextExpiryDate } = useCustomer()
    return (
        <div className="container-responsive">
            <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="card card-padding"><p className="text-sm">Remaining Points</p><p className="text-2xl font-bold">{remainingPoints}</p></div>
                <div className="card card-padding"><p className="text-sm">Next Expiry</p><p className="text-xl font-semibold">{nextExpiryDate ? formatDate(nextExpiryDate) : '—'}</p></div>
                <div className="card card-padding"><p className="text-sm">Total Transactions</p><p className="text-2xl font-bold">{transactions.length}</p></div>
            </div>
            <div className="card"><div className="card-padding">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-600">
                                <th className="py-2 pr-4">ID</th>
                                <th className="py-2 pr-4">Type</th>
                                <th className="py-2 pr-4">Note</th>
                                <th className="py-2 pr-4">Store</th>
                                <th className="py-2 pr-4">Date</th>
                                <th className="py-2 pr-4">Expiry</th>
                                <th className="py-2 pr-4">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td className="py-2 pr-4 font-mono">{t.id}</td>
                                    <td className="py-2 pr-4">{t.type}</td>
                                    <td className="py-2 pr-4">{t.note || '—'}</td>
                                    <td className="py-2 pr-4">{t.store || '—'}</td>
                                    <td className="py-2 pr-4">{formatDate(t.date)}</td>
                                    <td className="py-2 pr-4">{t.expiry ? formatDate(t.expiry) : '—'}</td>
                                    <td className={t.points >= 0 ? 'py-2 pr-4 text-emerald-600 font-semibold' : 'py-2 pr-4 text-amber-600 font-semibold'}>{t.points >= 0 ? `+${t.points}` : `${t.points}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div></div>
        </div>
    )
}
