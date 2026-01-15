
import React from 'react'
const Pill = ({ children }) => (
  <div className="px-3 py-2 rounded-full bg-white/70 text-gray-800 text-sm inline-flex items-center gap-2 shadow-soft">{children}</div>
)
export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-brand-50 to-white border-t border-gray-200 mt-12">
      <div className="container-responsive py-8 space-y-4 footer-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Pill>support@rewards360.example</Pill>
          <Pill>+91 90000 00000</Pill>
        </div>
        <div className="text-sm text-gray-500">© 2026 Rewards360 · Project360 · Unified Loyalty</div>
      </div>
    </footer>
  )
}
