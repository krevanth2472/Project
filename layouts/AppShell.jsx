
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className={`app-root light ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onProfileClick={() => setShowProfile(true)}
      />

      <main className="main">
        <section className="content">
          {/* Fraud/Loyalty children render here */}
          <Outlet />
        </section>
      </main>

      {showProfile && (
        <div className="profile-panel">
          <div className="profile-header">
            <h2>👤 Analyst Profile</h2>
            <button className="close-btn" onClick={() => setShowProfile(false)}>✖</button>
          </div>
          <p><strong>Name:</strong> John</p>
          <p><strong>Role:</strong> Fraud Monitoring Analyst</p>
          <p><strong>Email:</strong> John@gmail.com</p>
        </div>
      )}
    </div>
  );
}
``
