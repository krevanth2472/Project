
import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
function formatDate(d){ try { return new Date(d).toLocaleDateString('en-IN') } catch { return d } }
export default function PurchaseHistory(){
  const { transactions } = useCustomer()
  const purchases = transactions.filter(t=> t.type==='PURCHASE' || t.type==='CLAIM')
  return (
    <section aria-label="Purchase history" className="mt-4">
      <div className="card">
        <div className="card-padding">
          <h3 className="text-lg font-semibold">Purchase History</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-center text-gray-600">
                  <th className="py-2">Date</th>
                  <th className="py-2">Order/ID</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Points Earned</th>
                  <th className="py-2">Store/Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchases.map(p=> (
                  <tr key={p.id} className="text-center">
                    <td className="py-2">{formatDate(p.date)}</td>
                    <td className="py-2 font-mono">{p.id}</td>
                    <td className="py-2">{p.amount? `₹${p.amount}`:'—'}</td>
                    <td className="py-2 text-emerald-700 font-semibold">{p.points>0? `+${p.points}`:'—'}</td>
                    <td className="py-2">{p.store || p.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
