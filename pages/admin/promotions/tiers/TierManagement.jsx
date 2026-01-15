import React, { useState } from 'react'
const seed = [
 { name:'Silver', threshold:0, earnRate:1.0, discount:5 },
 { name:'Gold', threshold:1000, earnRate:1.25, discount:10 },
 { name:'Platinum', threshold:2500, earnRate:1.5, discount:15 },
]
export default function TierManagement(){
 const [list, setList] = useState(seed)
 const [newTier, setNewTier] = useState({ name:'', threshold:0, earnRate:1.0, discount:0 })
 const addTier = () => { if(!newTier.name) return; setList([...list, { ...newTier }]); setNewTier({ name:'', threshold:0, earnRate:1.0, discount:0 }) }
 return (
 <div className="container-responsive">
 <div className="card card-padding">
 <h2 className="text-2xl font-semibold mb-4">Tier Management</h2>
 <div className="overflow-x-auto">
 <table className="min-w-full text-sm">
 <thead><tr className="text-left text-gray-600"><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Threshold</th><th className="py-2 pr-4">Earn Rate</th><th className="py-2 pr-4">Discount %</th></tr></thead>
 <tbody className="divide-y divide-gray-200">
 {list.map((t,i)=> (<tr key={i}><td className="py-2 pr-4">{t.name}</td><td className="py-2 pr-4">{t.threshold}</td><td className="py-2 pr-4">{t.earnRate}</td><td className="py-2 pr-4">{t.discount}</td></tr>))}
 </tbody>
 </table>
 </div>
 <div className="grid sm:grid-cols-4 gap-3 mt-4">
 <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Name" value={newTier.name} onChange={e=>setNewTier({...newTier, name:e.target.value})}/>
 <input className="border border-gray-300 rounded-lg px-3 py-2" type="number" placeholder="Threshold" value={newTier.threshold} onChange={e=>setNewTier({...newTier, threshold:Number(e.target.value)})}/>
 <input className="border border-gray-300 rounded-lg px-3 py-2" type="number" step="0.1" placeholder="Earn Rate" value={newTier.earnRate} onChange={e=>setNewTier({...newTier, earnRate:Number(e.target.value)})}/>
 <input className="border border-gray-300 rounded-lg px-3 py-2" type="number" placeholder="Discount %" value={newTier.discount} onChange={e=>setNewTier({...newTier, discount:Number(e.target.value)})}/>
 </div>
 <div className="mt-4">
 <button className="btn-primary btn-lg" onClick={addTier}>Add Tier</button>
 </div>
 </div>
 </div>
 )
}
