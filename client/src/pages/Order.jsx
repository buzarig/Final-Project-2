import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetails from "../components/orderDetails/OrderDetails";
import OrderSummary from "../components/orderSummary/OrderSummary";
import api from "../http/api";

function Order() {
  const [order, setOrder] = useState();

  const { orderNo } = useParams();
  const numeriсOorderNo = +orderNo;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/orders/${numeriсOorderNo}`);
        if (response.status === 200) {
          const orderData = response.data;
          setOrder(orderData);
        } else {
          console.log("Произошла ошибка при получении данных ордера.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }

    fetchOrders();
  }, [numeriсOorderNo]);
  return (
    <div className="container_order">
      {order && (
        <div className="container_order">
          <OrderDetails
            orderNo={order.orderNo}
            email={order.email}
            payment={order.payment}
            date={order.date}
            country={order.deliveryAddress.country}
            city={order.deliveryAddress.city}
            address={order.deliveryAddress.address}
            postal={order.deliveryAddress.postal}
            mobile={order.mobile}
          />
          {order.products.map((product) => (
            <OrderSummary
              id={product.product.itemNo}
              productName={product.product.name}
              price={product.product.currentPrice}
              totalSum={order.totalSum}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
