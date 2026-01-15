import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCustomer } from '../../../../context/CustomerContext.jsx'
const CATEGORY_IMAGES = {
 Electronics:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
 Travel:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
 Cooking:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
 Fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
 Grocery:'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop',
 Books:'https://images.unsplash.com/photo-1519681393784-7f0b6d3f89f2?q=80&w=1200&auto=format&fit=crop',
 Sports:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',
 Cabs:'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop',
}
export default function CampaignReview(){
 const navigate = useNavigate()
 const { state } = useLocation()
 const { actions } = useCustomer()
 const form = state?.form
 const aud = state?.audience
 if(!form) return <div className="container-responsive"><div className="card card-padding">No campaign to review.</div></div>
 const promo = {
 id: `PROMO-${Math.random().toString(36).slice(2,7).toUpperCase()}`,
 title: form.title || 'Untitled Campaign',
 description: form.description || '',
 cost: Number(form.cost)||0,
 tierOnly: aud?.tier==='Gold',
 image: (form.image && form.image.trim()) || CATEGORY_IMAGES[form.category] || CATEGORY_IMAGES['Fashion'],
 discountType: form.discountType,
 start: form.start,
 end: form.end,
 audience: aud,
 status: 'Active',
 showInOffers: !!form.showInOffers,
 category: form.category,
 }
 const launch = () => { actions.addPromotion(promo); if(form.showInOffers) navigate('/Offers'); else navigate('/promotions') }
 return (
 <div className="container-responsive">
 <div className="card card-padding space-y-4">
 <h2 className="text-2xl font-semibold">Campaign Review</h2>
 <ul className="text-sm text-gray-700 space-y-1">
 <li><span className="font-medium">Title:</span> {promo.title}</li>
 <li><span className="font-medium">Type:</span> {promo.discountType}</li>
 <li><span className="font-medium">Category:</span> {promo.category}</li>
 <li><span className="font-medium">Cost:</span> {promo.cost} pts</li>
 <li><span className="font-medium">Dates:</span> {promo.start} → {promo.end}</li>
 <li><span className="font-medium">Audience:</span> Tier {aud?.tier} (min {aud?.minBalance} pts)</li>
 <li><span className="font-medium">Add to Offers:</span> {form.showInOffers? 'Yes':'No'}</li>
 </ul>
 <div className="flex gap-2">
 <button className="btn-primary btn-lg" onClick={()=> navigate('/offers')}>Launch Campaign</button>
 <button className="btn-outline btn-lg" onClick={()=> navigate('/promotions/campaign-builder')}>Edit</button>
 </div>
 </div>
 </div>
 )
}
