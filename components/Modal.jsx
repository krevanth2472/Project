
import React from 'react'
export default function Modal({ open, onClose, children }){
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="card card-padding max-w-lg w-full">{children}</div>
      </div>
    </div>
  )
}
