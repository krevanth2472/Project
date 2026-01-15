
import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
function formatDate(d){ try { return new Date(d).toLocaleDateString('en-IN') } catch { return d } }
export default function TransactionList({ limit=10 }){
  const { transactions } = useCustomer()
  const list = transactions.slice(0, limit)
  return (
    <section className="card">
      <div className="card-padding">
        <h3 className="text-lg font-semibold">Recent Transactions (Top {limit})</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Points Earned</th>
                <th className="py-2 pr-4">Points Redeemed</th>
                <th className="py-2 pr-4">Store/Activity</th>
                <th className="py-2 pr-4">Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.map(t => (
                <tr key={t.id}>
                  <td className="py-2 pr-4">{formatDate(t.date)}</td>
                  <td className="py-2 pr-4">{t.type}</td>
                  <td className={t.points>0? 'py-2 pr-4 text-emerald-600 font-semibold':'py-2 pr-4'}>{t.points>0? `+${t.points}`:'-'}</td>
                  <td className={t.points<0? 'py-2 pr-4 text-amber-600 font-semibold':'py-2 pr-4'}>{t.points<0? `${Math.abs(t.points)}`:'-'}</td>
                  <td className="py-2 pr-4">{t.store || t.note || '—'}</td>
                  <td className="py-2 pr-4">{t.expiry ? formatDate(t.expiry) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
