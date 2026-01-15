
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBell, FaBars, FaFileAlt, FaExchangeAlt } from 'react-icons/fa';
import UserProfile from './UserProfile';
import './Sidebar.css';

export default function Sidebar({ collapsed, setCollapsed, onProfileClick }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
        {!collapsed && <span className="brand">Monitor</span>}
      </div>

      <div className="sidebar-user">
        <UserProfile onProfileClick={onProfileClick} />
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/admin/fraud/dashboard" style={{ color: 'white' }}>
              <FaTachometerAlt /> {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/fraud/alerts" style={{ color: 'white' }}>
              <FaBell /> {!collapsed && <span>Alerts</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/fraud/transactions" style={{ color: 'white' }}>
              <FaExchangeAlt /> {!collapsed && <span>Transactions</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/fraud/audit" style={{ color: 'white' }}>
              <FaFileAlt /> {!collapsed && <span>Audit & Reports</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
