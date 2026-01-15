import React from 'react'
import { useParams } from 'react-router-dom'
import { useCustomer } from '../../../../context/CustomerContext.jsx'
export default function CampaignDetail(){
 const { id } = useParams()
 const { promotions } = useCustomer()
 const p = promotions.find(x => x.id === id)
 if(!p) return <div className="container-responsive"><div className="card card-padding">Campaign not found.</div></div>
 return (
 <div className="container-responsive space-y-4">
 <div className="card card-padding">
 <h2 className="text-2xl font-semibold">Campaign Detail: {p.id}</h2>
 <p className="text-gray-700">{p.title}</p>
 <ul className="text-sm text-gray-700 space-y-1 mt-2">
 <li><span className="font-medium">Type:</span> {p.discountType || '—'}</li>
 <li><span className="font-medium">Period:</span> {p.start || '—'} → {p.end || '—'}</li>
 <li><span className="font-medium">Audience:</span> Tier {p.audience?.tier || '—'} (min {p.audience?.minBalance || 0} pts)</li>
 </ul>
 </div>
 <div className="card card-padding">
 <h3 className="text-lg font-semibold mb-2">Performance (mock)</h3>
 <svg viewBox="0 0 400 180" className="w-full h-44">
 {[50,90,120,60].map((val, idx) => {
 const barWidth = 40; const gap = 20; const x = 20 + idx*(barWidth+gap); const height = val; const y = 160 - height
 return (
 <g key={idx}>
 <rect x={x} y={y} width={barWidth} height={height} fill="#4f46e5" />
 <text x={x+barWidth/2} y={170} textAnchor="middle" fill="#6b7280" fontSize="12">W{idx+1}</text>
 </g>
 )
 })}
 </svg>
 </div>
 </div>
 )
}
