
import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
const activities = [
  { id:'login', title:'Daily Login Bonus', points:50, image:'https://images.unsplash.com/photo-1526378722484-b1b1f3b1a4f3?q=80&w=1200&auto=format&fit=crop' },
  { id:'review', title:'Write a Product Review', points:100, image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop' },
  { id:'share', title:'Share on Social', points:75, image:'https://images.unsplash.com/photo-1494172961521-33799ddd47c1?q=80&w=1200&auto=format&fit=crop' },
  { id:'refer', title:'Refer a Friend', points:200, image:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop' },
]
export default function DailyActivities(){
  const { actions } = useCustomer()
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold">Daily Activities</h3>
      <p className="text-sm text-gray-600">Claim again after reload (demo) and see transactions update.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activities.map(a => (
          <div key={a.id} className="card overflow-hidden">
            <img src={a.image} alt={a.title} className="card-image h-28"/>
            <div className="card-padding">
              <h4 className="font-semibold">{a.title}</h4>
              <p className="text-sm text-gray-600">Earn {a.points} points</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">Claim resets on reload</span>
                <button className="ml-auto btn-claim btn-lg btn-icon" onClick={()=>actions.claimActivity({id:a.id, points:a.points, note:a.title, store:'Online'})}><span>Claim</span><span>➕</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
