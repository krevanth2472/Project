import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
export default function AudienceSegmentation(){
 const navigate = useNavigate()
 const { state } = useLocation()
 const base = state?.form || { title:'', description:'', cost:0, discountType:'Percentage', start:'', end:'', showInOffers:true, category:'Electronics', image:'' }
 const [aud, setAud] = useState({ tier:'Gold', minBalance:500 })
 return (
 <div className="container-responsive">
 <div className="card card-padding space-y-4">
 <h2 className="text-2xl font-semibold">Audience Segmentation</h2>
 <div className="grid sm:grid-cols-2 gap-4">
 <div>
 <label className="text-sm text-gray-600">Tier</label>
 <select className="border border-gray-300 rounded-lg px-3 py-2 w-full" value={aud.tier} onChange={e=>setAud({...aud, tier:e.target.value})}>
 <option>Silver</option>
 <option>Gold</option>
 <option>Platinum</option>
 </select>
 </div>
 <div>
 <label className="text-sm text-gray-600">Minimum Points Balance</label>
 <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" type="number" value={aud.minBalance} onChange={e=>setAud({...aud, minBalance:Number(e.target.value)})} />
 </div>
 </div>
 <div className="flex gap-2">
 <button className="btn-primary btn-lg" onClick={()=> navigate('/promotions/review', { state: { form: base, audience: aud } })}>Review & Launch</button>
 <button className="btn-outline btn-lg" onClick={()=> navigate('/promotions/campaign-builder')}>Back</button>
 </div>
 </div>
 </div>
 )
}
