import React from "react";
import { Link } from "react-router-dom";

function Orders() {
  return (
    <div className="orders-block">
      <p className="orders-text">No order has been made yet.</p>
      <p className="orders-link">
        <Link to="/catalog">Browse Product</Link>
      </p>
    </div>
  );
}

export default Orders;
