import React, { useEffect, useState } from "react";
import OrderDetails from "../components/orderDetails/OrderDetails";
import OrderSummary from "../components/orderSummary/OrderSummary";
import api from "../http/api";
// test comment

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/orders");
        if (response.status === 200) {
          const ordersData = response.data;
          setOrders(ordersData);
        } else {
          // eslint-disable-next-line no-console
          console.log("Произошла ошибка при получении данных ордера.");
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Ошибка при получении данных:", error);
      }
    }

    fetchOrders();
  }, []);
  return (
    <div className="container_order">
      {orders.map((order) => (
        <div key={order.orderNo}>
          <OrderDetails
            orderNo={order.orderNo}
            email={order.email}
            payment={order.payment}
            date={order.date}
            address={order.address}
            mobile={order.mobile}
          />
          {order.products.map((product) => (
            <OrderSummary
              key={product.product.itemNo}
              productName={product.name}
              price={product.currentPrice}
              totalSum={order.totalSum}
              subtotalSum={order.subtotalSum}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
export default Order;
