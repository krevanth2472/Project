import React from 'react'
const demoCustomers = [
 { id:'C1', name:'Aarav Sharma', tier:'Gold' },
 { id:'C2', name:'Diya Patel', tier:'Silver' },
 { id:'C3', name:'Kabir Singh', tier:'Platinum' },
]
function computeDiscount(amount, tier){ const map = { Silver:5, Gold:10, Platinum:15 }; const rate = map[tier]||5; return Math.round((amount*rate)/100) }
export default function OfferPreview(){
 return (
 <div className="container-responsive">
 <div className="card card-padding">
 <h2 className="text-2xl font-semibold mb-4">Tier-based Offer Preview</h2>
 <div className="overflow-x-auto">
 <table className="min-w-full text-sm">
 <thead><tr className="text-left text-gray-600"><th className="py-2 pr-4">Customer</th><th className="py-2 pr-4">Tier</th><th className="py-2 pr-4">Discount on ₹1000</th></tr></thead>
 <tbody className="divide-y divide-gray-200">
 {demoCustomers.map(c => (
 <tr key={c.id}><td className="py-2 pr-4">{c.name}</td><td className="py-2 pr-4">{c.tier}</td><td className="py-2 pr-4">₹{computeDiscount(1000, c.tier)}</td></tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 )
}
