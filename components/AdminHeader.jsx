
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext.jsx';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { actions } = useCustomer();
  const { pathname } = useLocation();

  const go = (to) => {
    // Hard navigate using router; avoids any NavLink issues.
    if (pathname !== to) navigate(to, { replace: false });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    actions.logout();
    navigate('/login', { replace: true });
  };

  // Helpers to highlight current tab (simple contains check)
  const isActive = (m) => pathname === m || pathname.startsWith(m + '/');
  const linkBase =
    'px-4 py-2 rounded-lg transition-all duration-300 pointer-events-auto cursor-pointer select-none';
  const activeCls = 'bg-white/40 backdrop-blur-md shadow-inner font-semibold';
  const idleCls = 'hover:bg-white/20 hover:scale-105';

  return (
    <header className="w-full bg-gradient-to-r from-brand-600 to-emerald-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-sm">
            💰
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-none">Rewards360</span>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Admin Portal</span>
          </div>
        </div>

        {/* Admin Nav (use programmatic navigation to avoid any link capture issues) */}
        <nav className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => go('/admin/promotions')}
            className={`${linkBase} ${isActive('/admin/promotions') || pathname === '/admin' ? activeCls : idleCls}`}
          >
            Promotions
          </button>

          {/* <button
            type="button"
            onClick={() => go('/admin/campaign-builder')}
            className={`${linkBase} ${isActive('/admin/campaign-builder') ? activeCls : idleCls}`}
          >
            New Campaign
          </button> */}

          {/* <button
            type="button"
            onClick={() => go('/admin/analytics')}
            className={`${linkBase} ${isActive('/admin/analytics') ? activeCls : idleCls}`}
          >
            Analytics
          </button> */}

          {/* Fraud Module (admin-only area) */}
          <button
            type="button"
            onClick={() => go('/admin/fraud/dashboard')}
            className={`${linkBase} ${isActive('/admin/fraud') ? activeCls : idleCls}`}
          >
            Fraud Monitor
          </button>



           {/* Report Module (admin-only area) */}
          <button
            type="button"
            onClick={() => go('/admin/Report/dashboard')}
            className={`${linkBase} ${isActive('/admin/Report') ? activeCls : idleCls}`}
          >
            Report
          </button>




          {/* Divider + Logout */}
          <div className="ml-4 pl-4 border-l border-white/20">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-white/10 transition-all text-sm font-medium pointer-events-auto"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
