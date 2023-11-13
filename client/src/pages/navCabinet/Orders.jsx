import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../http/api";

function Orders() {
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);

  const token = useSelector((state) => state.token.accessToken);

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
        setSurname(dataResponse.lastName);
        setUserEmail(dataResponse.email);
        setUserLogin(dataResponse.login);
        setCurrentPassword("");
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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id}>
              {/* Вставить ключи от заказа */}
              <p className="orders-text">ORDER NUMBER</p>
              <p className="orders-text">DATE</p>
              <p className="orders-text">STATUS</p>
              <p className="orders-text">TOTAL</p>
              <p className="orders-text">ACTIONS</p>
              <p className="orders-link">
                <Link>View Order</Link>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="orders-block">
          <p className="orders-text">No order has been made yet.</p>
          <p className="orders-link">
            <Link to="/catalog">Browse Product</Link>
          </p>
        </div>
      )}
    </>
  );
}

export default Orders;
