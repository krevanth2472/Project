import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext.jsx'
import Modal from '../components/Modal.jsx'
const STORES = ['Online', 'Pune Fashion Mall', 'Lifestyle Store – Koregaon Park']
export default function Redeem() {
    const { promoId } = useParams()
    const navigate = useNavigate()
    const { promotions, actions, remainingPoints } = useCustomer()
    const promo = useMemo(() => promotions.find(p => p.id === promoId), [promotions, promoId])
    const [open, setOpen] = useState(false)
    const [receipt, setReceipt] = useState(null)
    const [store, setStore] = useState(STORES[0])
    if (!promo) return <div className="container-responsive"><p className="text-red-600">Promotion not found.</p></div>
    const can = actions.canRedeem(promo)
    const handleConfirm = () => {
        if (!can) { alert(`Insufficient points: you have ${remainingPoints} pts, but this costs ${promo.cost} pts.`); return }
        const res = actions.redeem(promo, store)
        if (res.ok) { setReceipt(res); setOpen(true) }
        else { alert(res.error) }
    }
    const goToHistory = () => { setOpen(false); navigate('/redemptions') }
    return (
        <div className="container-responsive">
            <div className="card overflow-hidden">
                <img src={promo.image} alt={promo.title} className="card-image h-56" />
                <div className="card-padding">
                    <h2 className="text-2xl font-semibold">{promo.title}</h2>
                    <p className="text-gray-700 mt-2">{promo.description}</p>
                    <div className="mt-4 grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-indigo-700 font-medium">Cost: {promo.cost} pts</span>
                            <span className="text-gray-600">Your balance: {remainingPoints} pts</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-700">Store</label>
                            <select className="border border-gray-300 rounded-lg px-3 py-2" value={store} onChange={e => setStore(e.target.value)}>
                                {STORES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                        <button className="btn-redeem btn-lg btn-icon" disabled={!can} onClick={handleConfirm}><span>Confirm & Redeem</span><span>✅</span></button>
                        <button className="btn-outline btn-lg" onClick={() => navigate('/offers')}>Back to Offers</button>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-mint-600 text-white px-4 py-3 rounded-t-xl">
                        <h3 className="text-lg font-semibold">Redemption Confirmed</h3>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-3">
                            <img src={promo.image} alt="Promo" className="w-16 h-16 object-cover rounded" />
                            <div>
                                <p className="text-sm text-gray-600">{promo.title}</p>
                                <p className="text-sm text-gray-700">Store: {receipt?.store || store}</p>
                            </div>
                        </div>
                        {receipt && (
                            <div className="mt-4 space-y-2 text-sm">
                                <p><span className="font-medium">Transaction ID:</span> {receipt.txnId}</p>
                                <p><span className="font-medium">Confirmation Code:</span> {receipt.code}</p>
                                <p><span className="font-medium">Date:</span> {receipt.date}</p>
                                <p><span className="font-medium">Remaining Points:</span> {receipt.remaining}</p>
                            </div>
                        )}
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button className="btn-secondary btn-lg" onClick={() => setOpen(false)}>Close</button>
                            <button className="btn-primary btn-lg" onClick={goToHistory}>Go to Redemption History</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
