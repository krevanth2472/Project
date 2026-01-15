
import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
import AdminHeader from '../components/AdminHeader.jsx'

export default function AdminDashboard() {
  const { promotions, transactions } = useCustomer()

  return (
    <div className="w-full min-h-screen pt-0 m-0 bg-gradient-to-b from-emerald-100 via-white to-white">
      {/* Sticky full-width navbar */}
     

      {/* Padded inner content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 space-y-6 container-responsive-lg">
      {/* Dashboard Intro Card */}
      <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-700 mt-2">
        Quick view of promotions and transactions. (Stub for future management screens)
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid lg:grid-cols-2 gap-6">
      
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-gray-900">
          Promotions ({promotions.length})
        </h3>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
          {promotions.map((p) => (
          <li key={p.id} className="hover:text-brand-600 transition-colors">
            {p.title} · Cost: {p.cost} pts
          </li>
          ))}
        </ul>
        </div>

      
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-gray-900">
          Transactions ({transactions.length})
        </h3>
        <p className="text-sm text-gray-700 mt-2">
          Manage and review member transactions (coming soon)
        </p>
        </div>
      </div>
      </main>
    </div>
    )
}
