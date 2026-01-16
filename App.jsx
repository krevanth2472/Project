import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// ---------- Fraud module (admin-only) ----------
import FraudLayout from "./modules/fraud/FraudLayout";
import FraudDashboard from "./modules/fraud/pages/Dashboard";
import FraudAlerts from "./modules/fraud/pages/Alerts";
import FraudAuditReports from "./modules/fraud/pages/AuditReports";
import FraudTransactionMonitoring from "./modules/fraud/pages/TransactionMonitoring";

// ---------- Report Module (admin-only) ----------
import ReportLayout from "./Report/Layout";
import GenerateReport from "./Report/components/GenerateReport";
import ReportDetails from "./Report/components/ReportDetails";
import ExportReports from "./Report/components/ExportReports";
import ReportDashboard from "./Report/components/Dashboard";
import Sparkline from "./Report/components/Sparkline";

// Context / hooks
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { useCustomer } from "./context/CustomerContext.jsx";

// ---------- Customer/Admin shared ----------
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

// Layouts
import AdminLayout from "./pages/admin/AdminLayout.jsx";

// Customer pages
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfileDashboard from "./pages/ProfileDashboard.jsx";
import Offers from "./pages/Offers.jsx";
import Redeem from "./pages/Redeem.jsx";
import Redemptions from "./pages/Redemptions.jsx";
import Transactions from "./pages/Transactions.jsx";
import Profile from "./pages/Profile.jsx";

// Admin pages
import Promotions from "./pages/admin/promotions/Promotions.jsx";
import CampaignReview from "./pages/admin/promotions/campaigns/CampaignReview.jsx";
import CampaignBuilder from "./pages/admin/promotions/campaigns/CampaignBuilder.jsx";
import CampaignAnalytics from "./pages/admin/promotions/analytics/CampaignAnalytics.jsx";
import Loyalty from "./pages/admin/Loyalty.jsx";

import "./App.css";
import "../styles/base.css";
import "../styles/variables.css";

const CustomerLayout = () => (
  <>
    <Header />
    <main className="py-6 container-responsive-lg min-h-[calc(100vh-8rem)]">
      <Outlet />
    </main>
    <Footer />
  </>
);

/** Guard: only allow admins into nested routes where this is applied. */
function RequireAdmin({ children }) {
  const { role, customer } = useCustomer();
  if (!customer || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------- Customer + Admin branch ---------------- */}
        <Route
          element={
            <CustomerProvider>
              <CustomerLayout />
            </CustomerProvider>
          }
        >
          {/* Public/customer routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Customer pages */}
          <Route path="/dashboard" element={<ProfileDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/redeem/:promoId" element={<Redeem />} />
          <Route path="/redemptions" element={<Redemptions />} />
          <Route path="/transactions" element={<Transactions />} />

          {/* ---------------- Admin layout + admin routes ---------------- */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Promotions />} />
            <Route path="debug" element={<div className="card card-padding">Admin Debug — Render OK</div>} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="campaign-builder" element={<CampaignBuilder />} />
            <Route path="campaign-review" element={<CampaignReview />} />
            <Route path="analytics" element={<CampaignAnalytics />} />
            <Route path="loyalty" element={<Loyalty />} />

            {/* ---------------- Fraud module ---------------- */}
            <Route path="fraud" element={<FraudLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<FraudDashboard />} />
              <Route path="alerts" element={<FraudAlerts />} />
              <Route path="transactions" element={<FraudTransactionMonitoring />} />
              <Route path="audit" element={<FraudAuditReports />} />
            </Route>

            {/* ---------------- Report module ---------------- */}
            <Route path="report" element={<ReportLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ReportDashboard />} />
              <Route path="generate" element={<GenerateReport />} />
              <Route path="details" element={<ReportDetails />} />
              <Route path="export" element={<ExportReports />} />
              <Route path="sparkline" element={<Sparkline />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
