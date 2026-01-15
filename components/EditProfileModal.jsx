
import React, { useRef, useState } from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
import Modal from './Modal.jsx'

export default function EditProfileModal({ open, onClose }){
  const { customer, actions } = useCustomer()
  const [name, setName] = useState(customer?.name||'')
  const [phone, setPhone] = useState(customer?.phone||'')
  const [photoURL, setPhotoURL] = useState(customer?.photoURL||'')
  const fileRef = useRef(null)
  const save = async ()=>{ const res = await actions.updateProfile({ name, email: customer?.email, phone, photoURL }); if(res.ok){ onClose() } }
  const onFile = (ev)=>{ const file = ev.target.files?.[0]; if(!file) return; const reader = new FileReader(); reader.onload = ()=> setPhotoURL(reader.result); reader.readAsDataURL(file) }
  const removePhoto = ()=> setPhotoURL('')
  return (
    <Modal open={open} onClose={onClose}>
      <div className="overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-mint-600 text-white px-4 py-3 rounded-t-xl">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-sm">Name</label>
            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2" value={phone} onChange={e=>setPhone(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Photo</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} />
            {photoURL && <img src={photoURL} alt="Avatar" className="mt-2 w-16 h-16 rounded object-cover" />}
            <div className="mt-2 flex items-center gap-2">
              <button className="btn-secondary btn-lg" onClick={removePhoto}>Remove</button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end gap-3">
            <button className="btn-secondary btn-lg" onClick={onClose}>Cancel</button>
            <button className="btn-primary btn-lg" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
