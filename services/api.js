
import { customerSeed, transactionsSeed, promotionsSeed } from '../data/mock.js'
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
// BACKEND ENDPOINTS (for future Spring Boot integration):
// GET /api/customer, GET /api/transactions, GET /api/promotions
// POST /api/auth/register, /api/auth/login, /api/auth/request-otp, /api/auth/verify-otp, /api/auth/reset-password
// PUT /api/profile, POST /api/claim, POST /api/redeem
export async function fetchCustomer(){
  if (USE_MOCK) return structuredClone(customerSeed)
  return { id:'cust-001', name:'Member', tier:'Gold' }
}
export async function fetchTransactions(){
  if (USE_MOCK) return structuredClone(transactionsSeed)
  return []
}
export async function fetchPromotions(){
  if (USE_MOCK) return structuredClone(promotionsSeed)
  return []
}
