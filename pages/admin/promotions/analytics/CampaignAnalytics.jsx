import React from 'react'
import { useCustomer } from '../../../../context/CustomerContext.jsx'
export default function CampaignAnalytics() {
    const { promotions } = useCustomer()
    return (
        <div className="container-responsive">
            <div className="card card-padding">
                <h2 className="text-2xl font-semibold mb-4">Campaign Analytics</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead><tr className="text-left text-gray-600"><th className="py-2 pr-4">ID</th><th className="py-2 pr-4">Title</th><th className="py-2 pr-4">Audience</th><th className="py-2 pr-4">Cost</th></tr></thead>
                        <tbody className="divide-y divide-gray-200">
                            {promotions.map(p => (
                                <tr key={p.id}><td className="py-2 pr-4">{p.id}</td><td className="py-2 pr-4">{p.title}</td><td className="py-2 pr-4">Tier {p.audience?.tier || '—'} (min {p.audience?.minBalance || 0} pts)</td><td className="py-2 pr-4">{p.cost} pts</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
