import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';

function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar remains fixed on the left */}
        <Sidebar />
        {/* The Outlet renders the current route's content */}
        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
