
import React, { useState } from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'

import PointsSummary from '../components/PointsSummary.jsx'

import PurchaseHistory from '../components/PurchaseHistory.jsx'
import EditProfileModal from '../components/EditProfileModal.jsx'
import ChangePasswordModal from '../components/ChangePasswordModal.jsx'
import DailyActivities from '../components/DailyActivities.jsx'
import TransactionList from '../components/TransactionList.jsx'


import StatCards from '../components/StatCards.jsx'

import RewardCard from '../components/RewardCard.jsx'


export default function ProfileDashboard() {
  const { customer } = useCustomer()
  const [openEdit, setOpenEdit] = useState(false)
  const [openPwd, setOpenPwd] = useState(false)
  return (
    <div className="container-responsive space-y-6">

      <PointsSummary />

      <StatCards />
      <DailyActivities />
      <TransactionList limit={10} />
      <div className="grid lg:grid-cols-2 gap-6">

        {/* <DailyActivities /> */}
      </div>

      <Dashboard />
      {/* <TransactionList limit={10} /> */}
      <EditProfileModal open={openEdit} onClose={() => setOpenEdit(false)} />
      <ChangePasswordModal open={openPwd} onClose={() => setOpenPwd(false)} />
    </div>
  )
}

export function Dashboard() {
  const { promotions } = useCustomer()
  return (
    <div className="container-responsive space-y-6">


      <section>
        <h3 className="text-lg font-semibold mb-3">Member Offers</h3>
        <div className="overflow-x-auto scrollbar snap-x">
          <div className="flex gap-4 min-w-max pb-2">
            {promotions.slice(0, 7).map(p => (
              <div key={p.id} className="w-72 flex-shrink-0 snap-start">
                <RewardCard promo={p} />
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

