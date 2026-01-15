
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext.jsx'
export default function RewardCard({ promo }){
  const { actions, remainingPoints } = useCustomer()
  const navigate = useNavigate()
  const can = actions.canRedeem(promo)
  const handleRedeemClick = (e) => {
    if (!can) {
      e.preventDefault()
      alert(`Insufficient points: you have ${remainingPoints} pts, but this costs ${promo.cost} pts.`)
    } else {
      navigate(`/redeem/${promo.id}`)
    }
  }
  return (
    <div className="card overflow-hidden">
      <img src={promo.image} alt={promo.title} className="card-image h-40"/>
      <div className="card-padding">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{promo.title}</h4>
          {promo.tierOnly && <span className="badge-gold">Gold Only</span>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="chip">Cost: {promo.cost} pts</span>
          <button className="btn-redeem btn-lg btn-icon" onClick={handleRedeemClick}><span>Redeem</span><span>🎁</span></button>
        </div>
      </div>
    </div>
  )
}
