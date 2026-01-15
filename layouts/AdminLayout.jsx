
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* admin header/sidebar if any */}
      <Outlet />
    </div>
  );
}
