import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Modal from "../components/modal/Modal";

function Cabinet() {
  const location = useLocation();
  const pathToPage = {
    "/cabinet/dashboard": "dashboard",
    "/cabinet/orders": "orders",
    "/cabinet/accountDetails": "accountDetails"
  };

  const currentPage = pathToPage[location.pathname] || "description";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <button
              type="submit"
              onClick={handleOpenModal}
              className="btn-cabinet"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <Outlet />
      <Modal isOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
}

export default Cabinet;
