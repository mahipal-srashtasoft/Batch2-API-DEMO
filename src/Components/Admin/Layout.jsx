import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="text-center mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink to="/admin/add-product" className="nav-link text-white">Product</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/admin/add-catagory" className="nav-link text-white">Catagory</NavLink>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">Settings</a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">Reports</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <button className="btn btn-outline-secondary d-lg-none me-2" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <h5 className="mb-0">Admin Dashboard</h5>
            <div className="ms-auto d-flex align-items-center">
              <span className="me-3">Hello, Admin</span>
              <button className="btn btn-danger btn-sm">Logout</button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
        </div>
      </div>
  );
}

export default AdminLayout;
