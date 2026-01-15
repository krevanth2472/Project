import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function CampaignBuilder(){
 const navigate = useNavigate()
 const [form, setForm] = useState({ title:'', description:'', cost:0, discountType:'Percentage', start:'', end:'', showInOffers:true, category:'Electronics', image:'' })
 const onChange = e => setForm({ ...form, [e.target.name]: e.target.type==='number'? Number(e.target.value): e.target.value })
 return (
 <div className="container-responsive">
 <div className="card card-padding space-y-4">
 <h2 className="text-2xl font-semibold">Campaign Builder</h2>
 <div className="grid sm:grid-cols-2 gap-4">
 <div>
 <label className="text-sm text-gray-600">Title</label>
 <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" name="title" value={form.title} onChange={onChange} placeholder="New Year Bonanza"/>
 </div>
 <div>
 <label className="text-sm text-gray-600">Discount Type</label>
 <select className="border border-gray-300 rounded-lg px-3 py-2 w-full" name="discountType" value={form.discountType} onChange={onChange}>
 <option>Percentage</option>
 <option>Fixed</option>
 <option>Buy X Get Y</option>
 </select>
 </div>
 <div>
 <label className="text-sm text-gray-600">Category</label>
 <select className="border border-gray-300 rounded-lg px-3 py-2 w-full" name="category" value={form.category} onChange={onChange}>
 <option>Electronics</option>
 <option>Travel</option>
 <option>Cooking</option>
 <option>Fashion</option>
 <option>Grocery</option>
 <option>Books</option>
 <option>Sports</option>
 <option>Cabs</option>
 </select>
 </div>
 <div>
 <label className="text-sm text-gray-600">Image URL (optional)</label>
 <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" name="image" value={form.image} onChange={onChange} placeholder="https://..."/>
 </div>
 <div>
 <label className="text-sm text-gray-600">Cost (points)</label>
 <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" type="number" name="cost" value={form.cost} onChange={onChange} />
 </div>
 <div>
 <label className="text-sm text-gray-600">Start Date</label>
 <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" type="date" name="start" value={form.start} onChange={onChange} />
 </div>
 <div>
 <label className="text-sm text-gray-600">End Date</label>
 <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" type="date" name="end" value={form.end} onChange={onChange} />
 </div>
 <div className="flex items-center gap-2">
 <input id="showInOffers" type="checkbox" checked={form.showInOffers} onChange={e=>setForm({...form, showInOffers: e.target.checked})}/>
 <label htmlFor="showInOffers" className="text-sm text-gray-700">Add to Offers page after launch</label>
 </div>
 </div>
 <div>
 <label className="text-sm text-gray-600">Description</label>
 <textarea className="border border-gray-300 rounded-lg px-3 py-2 w-full" rows={4} name="description" value={form.description} onChange={onChange} />
 </div>
 <div className="flex gap-2">
 <button className="btn-primary btn-lg" onClick={()=> navigate(`/admin/campaign-review`, { state: { form } })}>Next: Audience</button>
 <button className="btn-outline btn-lg" onClick={()=> navigate('/promotions')}>Cancel</button>
 </div>
 </div>
 </div>
 )
}
