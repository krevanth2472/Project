
import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
export default function StatCards(){
  const { remainingPoints, todayPoints, redeemedTotal } = useCustomer()
  const stats = [
    { title: 'Total Points', value: remainingPoints, color:'border-emerald-300', accent:'text-emerald-600' },
    { title: "Today's Points Earned", value: todayPoints, color:'border-sky-300', accent:'text-sky-600' },
    { title: 'Total Redeemed Points', value: redeemedTotal, color:'border-amber-300', accent:'text-amber-600' },
  ]
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      {stats.map((s,i)=> (
        <div key={i} className={`card card-padding border-2 ${s.color}`}>
          <p className="text-sm text-gray-700 font-medium">{s.title}</p>
          <p className={`text-3xl font-bold mt-2 ${s.accent}`}>{s.value}</p>
        </div>
      ))}
    </section>
  )
}
