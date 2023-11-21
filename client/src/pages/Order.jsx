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
    window.scrollTo(0, 100);
    async function fetchOrders() {
      try {
        const response = await api.get(`/orders/${numeriсOorderNo}`);
        if (response.status === 200) {
          const orderData = response.data;
          setOrder(orderData);
        }
      } catch (error) {
        alert.error("ERRor:", error);
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

          <OrderSummary
            items={order.products.map((product, index) => ({
              id: `${product.product.itemNo}_${index}`,
              productName: product.product.name,
              price: product.product.currentPrice
            }))}
            totalSum={order.totalSum}
          />
        </div>
      )}
    </div>
  );
}

export default Order;
