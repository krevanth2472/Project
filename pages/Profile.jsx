
import React from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
import ProfileHeader from '../components/ProfileHeader.jsx'

export default function Profile() {
  const { customer, role } = useCustomer()

  // Guarded UI: if not logged in, show a friendly message (no redirect here)
  if (!customer) {
    return (
      <div className="container-responsive">
        <div className="card card-padding">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-700 mt-2">
            You are not logged in. Please{' '}
            <a href="/login" className="text-blue-600 hover:underline">login</a> to view your profile.
          </p>
        </div>
      </div>
    )
  }

  const initials = customer.name
    ? customer.name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
    : 'M'

  return (
    <div className="container-responsive space-y-6">
        {/* <div className="card card-padding">
                <div className="flex items-center justify-between">
                  <ProfileHeader customer={customer} />
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary btn-lg" onClick={()=>setOpenEdit(true)}>Edit Profile</button>
                    <button className="btn-secondary btn-lg" onClick={()=>setOpenPwd(true)}>Change Password</button>
                  </div>
                </div>
              </div> */}
      {/* Header card with avatar */}
      <div className="card card-padding">
        <div className="flex items-center gap-4">
          {customer.photoURL ? (
            <img
              src={customer.photoURL}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="text-lg font-semibold">{customer.name}</p>
            <p className="text-sm text-gray-600">{customer.email}</p>
            <p className="text-sm text-gray-600">{customer.phone}</p>
          </div>
          <span className="ml-auto badge-gold">{customer.tier || 'Bronze'}</span>
        </div>
      </div>

      {/* Details & preferences */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card card-padding">
          <h3 className="text-lg font-semibold">Account</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex">
              <dt className="w-40 text-gray-600">Role</dt>
              <dd className="font-medium">{(role || 'user').toUpperCase()}</dd>
            </div>
            <div className="flex">
              <dt className="w-40 text-gray-600">Customer ID</dt>
              <dd className="font-mono">{customer.id || '—'}</dd>
            </div>
            <div className="flex">
              <dt className="w-40 text-gray-600">Loyalty Tier</dt>
              <dd className="font-medium">{customer.tier || 'Bronze'}</dd>
            </div>
          </dl>
        </div>

        <div className="card card-padding">
          <h3 className="text-lg font-semibold">Preferences</h3>
          <div className="mt-3 text-sm">
            <p className="text-gray-600">Favorite categories</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(customer.preferences?.favoriteCategories ?? []).length > 0
                ? customer.preferences.favoriteCategories.map(c => (
                    <span key={c} className="chip">{c}</span>
                  ))
                : <span className="text-gray-500">Not set</span>}
            </div>
            <div className="mt-3">
              <p className="text-gray-600">Communication</p>
              <span className="chip">
                {customer.preferences?.communicationMode ?? 'Email'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      {/* <div className="card card-padding">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="mt-3 flex items-center gap-3">
         <a href="/dashboard" className="btn-secondary btn-sm">Go to Dashboard</a>
          <a href="/offers" className="btn-secondary btn-sm">View Offers</a>
          <a href="/transactions" className="btn-secondary btn-sm">View Transactions</a>
        </div>
      </div> */}
    </div>
  )
}
