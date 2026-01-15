
// src/pages/Offers.jsx
import React from 'react'
import RewardCard from '../components/RewardCard.jsx'
import { useCustomer } from '../context/CustomerContext.jsx'

export default function Offers(){
  const { promotions } = useCustomer()

  // Filter state
  const [q, setQ] = React.useState('')
  const [category, setCategory] = React.useState('All')

  // Supported categories for dropdown
  const cats = ['All','Electronics','Travel','Cooking','Fashion','Grocery','Books','Sports','Cabs']

  // Derived filtered list
  const filtered = promotions.filter(p => {
    const byCat = category === 'All' ? true : (p.category === category)
    const byText = q.trim()
      ? ( (p.title?.toLowerCase().includes(q.toLowerCase())) ||
          (p.description?.toLowerCase().includes(q.toLowerCase())) )
      : true
    return byCat && byText
  })

  return (
    <div className="container-responsive space-y-4">
      <h2 className="text-2xl font-semibold">Member Offers</h2>

      {/* Filter UI */}
      <div className="card card-padding">
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            className="border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Search offers..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Results: {filtered.length}
          </div>
        </div>
      </div>

      {/* Horizontal carousel (snap) */}
      {/* <div className="overflow-x-auto scrollbar snap-x">
        <div className="flex gap-4 min-w-max pb-2">
          {filtered.map(p => (
            <div key={p.id} className="w-72 flex-shrink-0 snap-start">
              <RewardCard promo={p} />
            </div>
          ))}
        </div>
      </div> */}

      {/* Grid of cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <RewardCard key={p.id} promo={p} />
        ))}
      </div>
    </div>
  )
}
