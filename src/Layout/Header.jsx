import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css"; // custom css

function Header() {

  let userLogin = localStorage.getItem("token");
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-4 text-primary" to="/">
          MyBrand
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon" ></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/services">
                Services
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/admin/add-catagory">
                Admin
              </NavLink>
            </li>

            {}<li className="nav-item ms-lg-3">
              <NavLink to="/login">
                <button className="btn btn-primary px-4 py-2 rounded-pill">
                  Login
                </button>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
