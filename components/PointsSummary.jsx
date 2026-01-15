import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
function formatDate(d){ if(!d) return '—'; try { return new Date(d).toLocaleDateString('en-IN') } catch { return d } }
export default function PointsSummary(){
 const { customer, remainingPoints, nextExpiryDate } = useCustomer()
 return (
 <section className="space-y-4">
 <div className="card overflow-hidden">
 <div className="relative">
 <img src="https://plus.unsplash.com/premium_photo-1729029551132-56bd473990f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9pbnRzJTIwbG95YWx0eXxlbnwwfHwwfHx8MA%3D%3D" alt="Loyalty" className="hero-image"/>
 <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-transparent"></div>
 <div className="absolute inset-0 flex items-center">
 <div className="px-6 py-4 text-white">
 <h2 className="text-2xl sm:text-3xl font-semibold">Welcome, {customer?.name?.split(' ')[0] || 'Member'}</h2>
 <p className="text-sm sm:text-base text-indigo-100">Track points & redeem rewards</p>
 </div>
 </div>
 </div>
 </div>
 <div className="card card-padding flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h3 className="text-lg font-semibold">Points Summary</h3>
 <p className="text-sm text-gray-600">Member: {customer?.name} · Tier: {customer?.tier}</p>
 <div className="mt-3 inline-flex items-center bg-gray-100 text-gray-800 rounded-lg px-3 py-2">
 <span className="text-sm">Next Expiry</span>
 <span className="ml-2 font-medium">{formatDate(nextExpiryDate)}</span>
 </div>
 </div>
 <div className="text-right">
 <p className="text-sm text-gray-500">Current Balance</p>
 <p className="text-3xl font-bold text-gray-900">{remainingPoints}</p>
 </div>
 </div>
 </section>
 )
}
