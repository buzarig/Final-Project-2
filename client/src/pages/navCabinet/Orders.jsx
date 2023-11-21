/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
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
            <p className="orders-text">Order Number</p>
            <p className="orders-text">Date</p>
            <p className="orders-text">Total</p>
            <p className="orders-text">Actions</p>
          </li>
          {orders.map((order) => (
            <li className="orders-item" key={order._id}>
              <div className="mobile-orders">
                <div className="mobile-flex_orders">
                  <p className="orders-text">Order Number:</p>
                  <p className="mobile-info">{order.orderNo}</p>
                </div>
                <div className="mobile-flex_orders">
                  <p className="orders-text">Date:</p>
                  <p className="mobile-info">
                    {format(new Date(order.date), "d MMMM, yyyy")}
                  </p>
                </div>
                <div className="mobile-flex_orders">
                  <p className="orders-text">Total: </p>
                  <p className="mobile-info">$ {order.totalSum}</p>
                </div>
                <div className="mobile-flex_orders">
                  <p className="orders-text">Actions:</p>
                  <p>
                    <Link
                      to={`/order/${order.orderNo}`}
                      className="orders-link"
                    >
                      View Order
                    </Link>
                  </p>
                </div>
              </div>
              <div className="desktop-orders">
                <p className="orders-text">{order.orderNo}</p>
                <p className="orders-text">
                  <span>{format(new Date(order.date), "d MMMM, yyyy")}</span>
                </p>
                <p className="orders-text">$ {order.totalSum}</p>
                <p className="orders-text">
                  <Link to={`/order/${order.orderNo}`} className="orders-link">
                    View Order
                  </Link>
                </p>
              </div>
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
