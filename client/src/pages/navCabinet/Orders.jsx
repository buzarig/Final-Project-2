/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../http/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const token = useSelector((state) => state.token.accessToken);

  async function fetchOrders() {
    try {
      const response = await api.get("/orders", {
        headers: {
          Authorization: token
        }
      });

      if (response.status === 200) {
        setOrders(response.data);
      } else {
        console.log("Error when retrieving user data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {orders.length > 0 ? (
        <ul className="orders-list">
          <li className="orders-header">
            <p className="orders-text">ORDER NUMBER</p>
            <p className="orders-text">DATE</p>
            <p className="orders-text">TOTAL</p>
            <p className="orders-text">ACTIONS</p>
          </li>
          {orders.map((order) => (
            <li className="orders-list" key={order._id}>
              <p className="orders-text">{order.orderNo}</p>
              <p className="orders-text">{order.date}</p>
              <p className="orders-text">$ {order.totalSum}</p>
              <p className="orders-text">
                <Link to={`/order/${order.orderNo}`} className="orders-link">
                  View Order
                </Link>
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
