
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext.jsx'
import ForgotPassword from './ForgotPassword.jsx'

export default function LoginForm() {
  const navigate = useNavigate()
  const { actions } = useCustomer()
  const [authMode, setAuthMode] = useState('password') // password | otp
  const [role, setRole] = useState('user')            // user | admin
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const doLogin = async (e) => {
    e.preventDefault()
    if (authMode === 'password') {
      const res = await actions.login({ email, password, role })
      if (res.ok) {
        setMessage('Logged in')
        navigate(res.role === 'admin' ? '/admin' : '/dashboard')
      } else setMessage(res.error)
    } else {
      const req = await actions.requestOtp({ email })
      if (req.ok) {
        const v = await actions.verifyOtp({ email, otp: req.otp, role })
        if (v.ok) {
          setMessage('OTP login successful')
          navigate(v.role === 'admin' ? '/admin' : '/dashboard')
        } else setMessage(v.error)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200">
      {/* Role & Auth Mode */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">Login as:</span>
          {['user', 'admin'].map(r => (
            <label key={r} className="inline-flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="role"
                checked={role === r}
                onChange={() => setRole(r)}
                className="text-emerald-600 focus:ring-emerald-500"
              /> {r.toUpperCase()}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Auth Mode:</span>
          <div className="flex gap-2 bg-emerald-50 rounded px-2 py-1">
            <button
              className={`px-3 py-1 rounded text-sm ${authMode === 'password' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
              onClick={() => setAuthMode('password')}
            >
              Password
            </button>
            <button
              className={`px-3 py-1 rounded text-sm ${authMode === 'otp' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
              onClick={() => setAuthMode('otp')}
            >
              OTP
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={doLogin} className="space-y-4" aria-label="Login">
        <div>
          <label htmlFor="lemail" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="lemail"
            type="email"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {authMode === 'password' && (
          <div>
            <label htmlFor="lpass" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="lpass"
              type="password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            type="submit"
          >
            Login
          </button>

          {/* Navigate to ForgotPassword page */}
          <button
            type="button"
            className="text-sm text-emerald-700 hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {/* Message */}
      <div aria-live="polite" className="text-sm text-indigo-700">{message}</div>
    </div>
  )
}
