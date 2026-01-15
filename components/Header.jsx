
// src/components/Header.jsx
import React, { useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext.jsx'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role, customer, actions } = useCustomer()

  // Only redirect admins to /admin IF they are not already under /admin/*
  useEffect(() => {
    if (customer && role === 'admin' && !location.pathname.startsWith('/admin')) {
      navigate('/admin', { replace: true })
    }
  }, [customer, role, location.pathname, navigate])

  const onLogout = () => {
    actions.logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`

  // If admin is logged in, do not render this header (AdminHeader will be shown on /admin).
  if (customer && role === 'admin') {
    return null
  }

  return (
    <header className="bg-gradient-to-r from-brand-600 to-emerald-600 text-white sticky top-0 z-30 shadow">
      <div className="container-responsive py-3 flex items-center justify-between">
        {/* Brand + role badge (only after login) */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">💰</div>
          <span className="text-xl font-semibold">Rewards360</span>
          {customer && (
            <span className="ml-2 text-xs px-2 py-1 rounded bg-white/20" aria-label="Role">
              {(role || 'user').toUpperCase()}
            </span>
          )}
        </div>

        {/* Navbar: BEFORE vs AFTER login */}
        <nav className="flex items-center gap-2">
          {!customer ? (
            <>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            </>
          ) : (
            <>
              {/* Profile link visible only after login */}
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>

              {/* User-facing links */}
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <NavLink to="/offers" className={linkClass}>Offers</NavLink>
              <NavLink to="/redemptions" className={linkClass}>Redemptions</NavLink>
              <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
              <NavLink to="/loyalty/overview" className={linkClass}>Report</NavLink>

              {/* Important: NO fraud link here for users; Admins see AdminHeader */}
              <button
                type="button"
                className="ml-2 px-3 py-2 rounded bg-white/20 hover:bg-white/10"
                onClick={onLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
