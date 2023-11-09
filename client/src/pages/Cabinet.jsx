/* eslint-disable import/named */
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeAccessToken } from "../redux/actions/tokenActions";
import Modal from "../components/modal/Modal";

function Cabinet() {
  const location = useLocation();
  const pathToPage = {
    "/cabinet/dashboard": "dashboard",
    "/cabinet/orders": "orders",
    "/cabinet/addresses": "addresses",
    "/cabinet/accountDetails": "accountDetails"
  };

  const currentPage = pathToPage[location.pathname] || "description";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirmed = () => {
    // dispatch(removeAccessToken());
    closeModal();
  };

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
          <li className={currentPage === "accountDetails" ? "active" : ""}>
            <Link to="/cabinet/accountDetails">Account details</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout} className="btn-cabinet">
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleLogout={handleLogoutConfirmed}
      />
    </div>
  );
}

export default Cabinet;
