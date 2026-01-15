import React, { useState } from 'react'
const seed = { Silver:5, Gold:10, Platinum:15 }
export default function DiscountMatrix(){
 const [matrix, setMatrix] = useState(seed)
 const update = (name, value) => setMatrix({ ...matrix, [name]: Number(value) })
 return (
 <div className="container-responsive">
 <div className="card card-padding">
 <h2 className="text-2xl font-semibold mb-4">Tier Discount Matrix</h2>
 <div className="overflow-x-auto">
 <table className="min-w-full text-sm">
 <thead><tr className="text-left text-gray-600"><th className="py-2 pr-4">Tier</th><th className="py-2 pr-4">Discount %</th></tr></thead>
 <tbody className="divide-y divide-gray-200">
 {Object.entries(matrix).map(([tier, disc]) => (
 <tr key={tier}>
 <td className="py-2 pr-4">{tier}</td>
 <td className="py-2 pr-4"><input className="border border-gray-300 rounded-lg px-3 py-2 w-24" type="number" value={disc} onChange={e=>update(tier, e.target.value)} /></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <div className="mt-4">
 <a className="btn-primary btn-lg" href="/promotions/offer-preview">Preview Offers</a>
 </div>
 </div>
 </div>
 )
}
