import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCustomer, fetchTransactions, fetchPromotions } from '../services/api.js'
const CustomerContext = createContext(null)
export const useCustomer = () => useContext(CustomerContext)

function calcRemainingPoints(transactions) { return transactions.reduce((s, t) => s + (t.points || 0), 0) }
function nextExpiry(transactions) { const u = transactions.filter(t => t.expiry).map(t => new Date(t.expiry)).sort((a, b) => a - b); return u.length ? u[0].toISOString().slice(0, 10) : null }
function todaysEarned(transactions) { const today = new Date().toISOString().slice(0, 10); return transactions.filter(t => t.date === today && t.points > 0).reduce((s, t) => s + t.points, 0) }
function totalRedeemed(transactions) { return Math.abs(transactions.filter(t => t.points < 0).reduce((s, t) => s + t.points, 0)) }
function uid(prefix = 'ID') { return `${prefix}-${Math.floor(Date.now() / 1000)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}` }

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null)
  const [role, setRole] = useState(() => sessionStorage.getItem('r360_role') || 'user')
  const [transactions, setTransactions] = useState(() => { const saved = localStorage.getItem('p360_transactions'); return saved ? JSON.parse(saved) : null })
  const [promotions, setPromotions] = useState([])
  const [redeemedPromoIds, setRedeemedPromoIds] = useState(() => { const saved = localStorage.getItem('p360_redeemed'); return saved ? JSON.parse(saved) : [] })

  useEffect(() => {
    (async () => {
      try {
        const c = await fetchCustomer()
        setCustomer(c)
      } catch (e) { /* ignore */ }

      try {
        if (!transactions) {
          const t = await fetchTransactions()
          setTransactions(t)
        }
      } catch (e) { /* ignore */ }

      try {
        const p = await fetchPromotions()
        setPromotions(p)
      } catch (e) { /* ignore */ }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { if (transactions) localStorage.setItem('p360_transactions', JSON.stringify(transactions)) }, [transactions])
  useEffect(() => { localStorage.setItem('p360_redeemed', JSON.stringify(redeemedPromoIds)) }, [redeemedPromoIds])

  const remainingPoints = useMemo(() => transactions ? calcRemainingPoints(transactions) : 0, [transactions])
  const nextExpiryDate = useMemo(() => transactions ? nextExpiry(transactions) : null, [transactions])
  const todayPoints = useMemo(() => transactions ? todaysEarned(transactions) : 0, [transactions])
  const redeemedTotal = useMemo(() => transactions ? totalRedeemed(transactions) : 0, [transactions])

  const claimActivity = ({ id, points, note, store }) => {
    const txn = {
      id: uid((id || 'CLAIM').toString().toUpperCase()),
      type: 'CLAIM',
      amount: 0,
      points,
      date: new Date().toISOString().slice(0, 10),
      expiry: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10),
      note,
      store
    }
    setTransactions(prev => [txn, ...(prev || [])])
  }

  const canRedeem = (promo) => {
    if (!promo) return false
    if (redeemedPromoIds.includes(promo.id)) return false
    return remainingPoints >= (promo.cost || 0)
  }

  const redeem = (promo, store = 'Online') => {
    if (!canRedeem(promo)) return { ok: false, error: 'Insufficient points' }
    const code = uid('CONF')
    const txnId = uid('RED')
    const txn = { id: txnId, type: 'REDEMPTION', amount: 0, points: -((promo.cost || 0)), date: new Date().toISOString().slice(0, 10), expiry: null, note: promo.title, store }
    setTransactions(prev => [txn, ...(prev || [])])
    setRedeemedPromoIds(prev => [...prev, promo.id])
    const updatedRemaining = remainingPoints - (promo.cost || 0)
    const receipt = { ok: true, txnId, code, date: txn.date, remaining: updatedRemaining, store }
    try {
      const raw = localStorage.getItem('p360_redemptions')
      const list = raw ? JSON.parse(raw) : []
      list.unshift({ promoId: promo.id, promoTitle: promo.title, image: promo.image, store, txnId, code, date: txn.date, remaining: updatedRemaining })
      localStorage.setItem('p360_redemptions', JSON.stringify(list))
    } catch { }
    return receipt
  }

  const addPromotion = (promo) => { setPromotions(prev => [...prev, promo]) }

  const register = async (payload) => {
    try {
      const storeRaw = localStorage.getItem('r360_users')
      const store = storeRaw ? JSON.parse(storeRaw) : {}
      if (store[payload.email]) return { ok: false, error: 'Email already registered' }
      store[payload.email] = { ...payload, loyaltyTier: payload.role === 'user' ? 'Bronze' : 'Admin', role: payload.role }
      localStorage.setItem('r360_users', JSON.stringify(store))
      return { ok: true }
    } catch (e) { return { ok: false, error: 'Registration failed' } }
  }

  const login = async ({ email, password, role: chosenRole = 'user' }) => {
    const storeRaw = localStorage.getItem('r360_users')
    const store = storeRaw ? JSON.parse(storeRaw) : {}
    const user = store[email]
    if (!user) return { ok: false, error: 'User not found' }
    if ((user.role || 'user') !== chosenRole) return { ok: false, error: `Please select ${user.role?.toUpperCase() || 'USER'} login` }
    // demo: accept any password
    sessionStorage.setItem('r360_current_user', email)
    sessionStorage.setItem('r360_role', chosenRole)
    setRole(chosenRole)
    setCustomer({ id: 'CUST-1001', name: user.name, tier: user.loyaltyTier || 'Bronze', email: user.email, phone: user.phone, photoURL: user.photoURL || '' })
    return { ok: true, token: 'demo-token', role: chosenRole }
  }

  const requestOtp = async ({ email }) => { return { ok: true, otp: '123456' } }
  const verifyOtp = async ({ email, otp, role: chosenRole = 'user' }) => {
    if (otp === '123456') {
      sessionStorage.setItem('r360_current_user', email)
      sessionStorage.setItem('r360_role', chosenRole)
      setRole(chosenRole)
      return { ok: true, token: 'demo-token', role: chosenRole }
    }
    return { ok: false, error: 'Invalid OTP' }
  }
  const resetPassword = async ({ email, otp, newPassword }) => { if (otp !== '123456') return { ok: false, error: 'Invalid OTP' }; return { ok: true } }
  const updateProfile = async ({ name, email, phone, photoURL }) => {
    try {
      const storeRaw = localStorage.getItem('r360_users')
      const store = storeRaw ? JSON.parse(storeRaw) : {}
      const user = store[email] || {}
      const updated = { ...user, name, email, phone, photoURL }
      store[email] = updated
      localStorage.setItem('r360_users', JSON.stringify(store))
      setCustomer(prev => ({ ...(prev || {}), name, email, phone, photoURL }))
      return { ok: true }
    } catch { return { ok: false, error: 'Failed to update' } }
  }
  const updatePreferences = async (email, preferences) => {
    try {
      const storeRaw = localStorage.getItem('r360_users')
      const store = storeRaw ? JSON.parse(storeRaw) : {}
      const user = store[email] || {}
      store[email] = { ...user, preferences }
      localStorage.setItem('r360_users', JSON.stringify(store))
      return { ok: true }
    } catch { return { ok: false } }
  }
  const changePassword = async () => ({ ok: true })

  const logout = () => { sessionStorage.removeItem('r360_current_user'); sessionStorage.removeItem('r360_role'); setRole('user'); setCustomer(null) }

  const value = {
    customer,
    role,
    transactions: transactions || [],
    promotions,
    remainingPoints,
    nextExpiryDate,
    todayPoints,
    redeemedTotal,
    redeemedPromoIds,
    actions: { claimActivity, redeem, canRedeem, addPromotion, register, login, requestOtp, verifyOtp, resetPassword, updateProfile, updatePreferences, changePassword, logout }
  }

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}
