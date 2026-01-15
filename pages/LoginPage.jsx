
import React from 'react'
import LoginForm from '../components/LoginForm.jsx'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white px-4">
      <div className="max-w-6xl w-full grid gap-6 lg:grid-cols-2 items-center">
        
        {/* Left Info Card */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-100 to-emerald-50 p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-emerald-900">Login (User / Admin)</h2>
          <p className="mt-2 text-sm text-emerald-800/80">
            Pick your role, then login using either your password or a one-time OTP.
          </p>
        </div>

        {/* Right Login Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Login</h2>
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
