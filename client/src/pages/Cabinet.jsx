import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Cabinet() {
  const location = useLocation();
  const pathToPage = {
    "/cabinet/dashboard": "dashboard",
    "/cabinet/orders": "orders",
    "/cabinet/addresses": "addresses",
    "/cabinet/accountDetails": "accountDetails"
  };

  const currentPage = pathToPage[location.pathname] || "description";

  return (
    <div className="wrapper-cabinet">
      <h3 className="cabinet-title">My Account</h3>
      <div className="nav-bar">
        <ul className="cabinet-navbar">
          <li className={currentPage === "dashboard" ? "active" : ""}>
            <Link to="/cabinet/dashboard">Dashboard</Link>
          </li>
          <li className={currentPage === "orders" ? "active" : ""}>
            <Link to="/cabinet/orders">Orders</Link>
          </li>
          <li className={currentPage === "addresses" ? "active" : ""}>
            <Link to="/cabinet/addresses">Addresses</Link>
          </li>
          <li className={currentPage === "accountDetails" ? "active" : ""}>
            <Link to="/cabinet/accountDetails">Account details</Link>
          </li>
          <li>
            <Link to="/" className="btn-cabinet">
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Cabinet;
