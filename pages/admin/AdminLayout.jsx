
// src/pages/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader.jsx';

export default function AdminLayout() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Sticky Admin Navbar */}
      <AdminHeader />

      {/* Main content area for nested admin routes */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* TEMP: uncomment to verify AdminLayout renders
        <div className="card card-padding">AdminLayout OK — Outlet below</div>
        */}
        <Outlet />
      </main>
    </div>
  );
}
