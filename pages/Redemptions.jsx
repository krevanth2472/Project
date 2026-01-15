import React, { useEffect, useState } from 'react'
export default function Redemptions() {
    const [history, setHistory] = useState([])
    useEffect(() => {
        try { const raw = localStorage.getItem('p36_redemptions'); setHistory(raw ? JSON.parse(raw) : []) } catch { setHistory([]) }
    }, [])
    return (
        <div className="container-responsive">
            <h2 className="text-2xl font-semibold mb-4">Redemption History</h2>
            {history.length === 0 ? (
                <div className="card"><div className="card-padding text-gray-600">No redemptions yet.</div></div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {history.map((r, idx) => (
                        <div key={idx} className="card overflow-hidden">
                            <img src={r.image} alt={r.promoTitle} className="card-image h-40" />
                            <div className="card-padding text-sm">
                                <p className="text-gray-900 font-medium">{r.promoTitle}</p>
                                <p className="text-gray-700">Store: {r.store}</p>
                                <p><span className="font-medium">Txn ID:</span> {r.txnId}</p>
                                <p><span className="font-medium">Code:</span> {r.code}</p>
                                <p><span className="font-medium">Date:</span> {r.date}</p>
                                <p><span className="font-medium">Remaining:</span> {r.remaining} pts</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
