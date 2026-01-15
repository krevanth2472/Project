
import React, { useState } from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
import OtpInput from './OtpInput.jsx'

export default function ForgotPassword({ emailPrefill = '' }) {
  const { actions } = useCustomer()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState(emailPrefill)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [msg, setMsg] = useState('')

  const request = async () => {
    const res = await actions.requestOtp({ email })
    if (res.ok) {
      setStep(2)
      setMsg('OTP sent (demo: 123456)')
    }
  }

  const verify = async () => {
    if (otp.length !== 6) {
      setMsg('Enter 6-digit OTP')
      return
    }
    setStep(3)
  }

  const reset = async () => {
    const res = await actions.resetPassword({ email, otp, newPassword })
    if (res.ok) {
      setMsg('Password reset. You can login now.')
      setStep(1)
    } else setMsg(res.error)
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200 sm:p-8">
      <h3 className="text-lg font-semibold text-gray-900 text-center">Forgot Password</h3>

      {/* Step 1: Email */}
      {step === 1 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-600 focus:ring-emerald-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            onClick={request}
          >
            Request OTP
          </button>
        </div>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 text-center">Enter the 6-digit code</p>
          <OtpInput value={otp} onChange={setOtp} />
          <button
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            onClick={verify}
          >
            Verify
          </button>
        </div>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-600 focus:ring-emerald-500"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            onClick={reset}
          >
            Reset Password
          </button>
        </div>
      )}

      {/* Message */}
      <div aria-live="polite" className="text-sm text-indigo-700 text-center">{msg}</div>
    </div>
  )
}
