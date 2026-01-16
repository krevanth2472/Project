
# Rewards360 + Project360 (Role-Aware Vite React App)

This project merges **Rewards360 Module 2.1** (Registration, Login/OTP, Forgot Password, Profile Dashboard, Preferences, Points Summary, Purchase History, Edit Profile, Change Password) with **Project360** (Offers, Redeem with insufficient points alert, Redemptions history cards only, Transactions dashboard, premium background, centered footer) and adds **User/Admin role selection** on Register & Login.

## Stack
- React 18 + Vite 5
- Tailwind CSS 3
- React Router v6

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Role-aware login & register
- On **Register**, choose **User** or **Admin**. Stored in `localStorage:r360_users` with `role`.
- On **Login**, choose role and auth mode (Password or OTP). After login:
  - **User** → navigates to `/dashboard` (Customer Dashboard)
  - **Admin** → navigates to `/admin` (Admin Dashboard stub)
- Header shows current role badge and **2.2 module links** (Offers, Redemptions, Transactions) plus **Admin** link.

## Demo data & keys
- `r360_users`, `r360_current_user`, `p360_transactions`, `p360_redeemed`, `p360_redemptions`

## Backend wiring
Replace stubs in `src/services/api.js` & actions in `src/context/CustomerContext.jsx` with real endpoints (Spring Boot): auth, profile, promotions, transactions, claim & redeem.
Use HTTPS + HTTP-only cookies, server validation, CORS/CSRF.