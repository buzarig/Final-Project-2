import React from "react";
import OrderDetails from "../components/orderDetails/OrderDetails";
import OrderSummary from "../components/orderSummary/OrderSummary";

function Order() {
  return (
    <div className="container_order">
      <OrderDetails />
      <OrderSummary />
    </div>
  );
}
export default Order;
