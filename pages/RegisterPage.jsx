
import React from 'react'
import RegistrationForm from '../components/RegistrationForm.jsx'
export default function RegisterPage(){
  return (
    <div className="container-responsive">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card card-padding bg-gradient-to-br from-emerald-100 to-mint-600/20">
          <h2 className="text-2xl font-semibold text-emerald-800">Create account (User/Admin)</h2>
          <p className="text-sm text-gray-700 mt-1">Choose your role and start using the loyalty platform.</p>
        </div>
        <div className="card card-padding">
          <h2 className="text-xl font-semibold">Register</h2>
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}
