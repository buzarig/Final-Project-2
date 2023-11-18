/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../http/api";
import ModalLogout from "../../components/modalLogout/ModalLogout";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const token = useSelector((state) => state.token.accessToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function fetchData() {
    try {
      const response = await api.get("/customers/customer", {
        headers: {
          Authorization: token
        }
      });

      if (response.status === 200) {
        const dataResponse = response.data;
        setUserName(dataResponse.firstName);
      } else {
        console.log("Error when retrieving user data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <p className="dashboard text">
        Hello {userName} (not {userName}?
        <span>
          {" "}
          <button type="submit" className="btn-links" onClick={handleOpenModal}>
            Log out
          </button>
        </span>
        ) From your account dashboard you can view your
        <span className="dashboard links">
          {" "}
          <Link to="/cabinet/orders">recent orders</Link>
        </span>{" "}
        , manage you shipping and billing addresses , and edit your
        <span className="dashboard links">
          {" "}
          <Link to="/cabinet/accountDetails">password and account details</Link>
        </span>{" "}
        .
      </p>
      <ModalLogout isOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
}

export default Dashboard;
