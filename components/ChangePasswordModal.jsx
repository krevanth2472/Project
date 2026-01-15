
import React, { useState } from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
import Modal from './Modal.jsx'

export default function ChangePasswordModal({ open, onClose }){
  const { actions } = useCustomer()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [msg, setMsg] = useState('')
  const save = async ()=>{ const res = await actions.changePassword({ current, next }); setMsg(res.ok? 'Password changed':'Failed'); if(res.ok) onClose() }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-mint-600 text-white px-4 py-3 rounded-t-xl">
          <h3 className="text-lg font-semibold">Change Password</h3>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-sm">Current Password</label>
            <input type="password" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" value={current} onChange={e=>setCurrent(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">New Password</label>
            <input type="password" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" value={next} onChange={e=>setNext(e.target.value)} />
          </div>
          <div className="mt-2 flex items-center justify-end gap-3">
            <button className="btn-secondary btn-lg" onClick={onClose}>Cancel</button>
            <button className="btn-primary btn-lg" onClick={save}>Save</button>
          </div>
          <div aria-live="polite" className="text-sm text-indigo-700 mt-2">{msg}</div>
        </div>
      </div>
    </Modal>
  )
}
