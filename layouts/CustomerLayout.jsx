
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <div className="customer-layout">
      {/* customer header/nav if any */}
      <Outlet />
    </div>
  );
}
``
