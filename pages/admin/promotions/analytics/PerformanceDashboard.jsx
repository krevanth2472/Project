import React from 'react'
import { useCustomer } from '../../../../context/CustomerContext.jsx'
import { NavLink } from 'react-router-dom'
export default function PerformanceDashboard(){
 const { promotions } = useCustomer()
 let red = []
 try { const raw = localStorage.getItem('p360_redemptions'); red = raw? JSON.parse(raw): [] } catch {}
 const weeks = Array.from({length:8}, (_,i)=> `W${i+1}`)
 const weekly = weeks.map((w,i)=> ({ w, count: red[i]?.count || (red[i]?1:0) }))
 const catCounts = promotions.reduce((acc,p)=> { const c = p.category || 'Uncategorized'; acc[c]=(acc[c]||0)+1; return acc }, {})
 const cats = Object.keys(catCounts)
 const kpis = [
 { label:'Active Campaigns', value: promotions.length },
 { label:'Total Offers', value: promotions.length },
 { label:'Unique Audience Segments', value: new Set(promotions.map(p => p.audience?.tier)).size },
 ]
 return (
 <div className="container-responsive space-y-4">
 <div className="grid sm:grid-cols-3 gap-4">
 {kpis.map((k,i)=>(<div key={i} className="card card-padding"><h3 className="text-sm text-gray-700 font-medium">{k.label}</h3><p className="text-3xl font-bold mt-2 text-indigo-700">{k.value}</p></div>))}
 </div>
 <div className="grid lg:grid-cols-2 gap-4">
 <div className="card card-padding">
 <h3 className="text-lg font-semibold mb-2">Weekly Redemptions (mock)</h3>
 <svg viewBox="0 0 400 180" className="w-full h-44">
 {weeks.map((w, idx) => {
   const val = weekly[idx].count || Math.floor(Math.random()*5)+1
   const barWidth = 30; const gap = 15; const x = 30 + idx*(barWidth+gap); const height = val * 20; const y = 160 - height
   return (
     <g key={idx}>
       <rect x={x} y={y} width={barWidth} height={height} fill="#10b981" />
       <text x={x+barWidth/2} y={170} textAnchor="middle" fill="#6b7280" fontSize="12">{w}</text>
     </g>
   )
 })}
 </svg>
 </div>
 <div className="card card-padding">
 <h3 className="text-lg font-semibold mb-2">Offers by Category</h3>
 <svg viewBox="0 0 400 180" className="w-full h-44">
 {cats.map((c, idx) => {
   const val = catCounts[c];
   const barWidth = 30; const gap = 15; const x = 30 + idx*(barWidth+gap); const height = (val||1) * 20; const y = 160 - height
   return (
     <g key={idx}>
       <rect x={x} y={y} width={barWidth} height={height} fill="#4f46e5" />
       <text x={x+barWidth/2} y={170} textAnchor="middle" fill="#6b7280" fontSize="12">{c}</text>
     </g>
   )
 })}
 </svg>
 </div>
 </div>
 <div className="card card-padding">
 <h2 className="text-xl font-semibold mb-3">Campaigns</h2>
 <div className="overflow-x-auto">
 <table className="min-w-full text-sm">
 <thead><tr className="text-left text-gray-600"><th className="py-2 pr-4">ID</th><th className="py-2 pr-4">Title</th><th className="py-2 pr-4">Type</th><th className="py-2 pr-4">Dates</th><th className="py-2 pr-4">Audience</th></tr></thead>
 <tbody className="divide-y divide-gray-200">
 {promotions.map(p => (
 <tr key={p.id}>
 <td className="py-2 pr-4"><NavLink className="text-indigo-600" to={`/promotions/detail/${p.id}`}>{p.id}</NavLink></td>
 <td className="py-2 pr-4">{p.title}</td>
 <td className="py-2 pr-4">{p.discountType || '—'}</td>
 <td className="py-2 pr-4">{p.start || '—'} → {p.end || '—'}</td>
 <td className="py-2 pr-4">Tier {p.audience?.tier || '—'} (min {p.audience?.minBalance || 0} pts)</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 )
}
