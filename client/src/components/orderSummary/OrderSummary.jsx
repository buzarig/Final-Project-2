import React from "react";
import "./OrderSummary.scss";

function OrderSummary() {
  return (
    <div className="orderSummary_container">
      <h4 className="title_order_summary">Order Summery</h4>
      <div className="orderSummary">
        <div className="named_OrderSummary">
          <p>PRODUCT</p>
          <p>TOTAL</p>
        </div>
        <div className="product_data_OrderSummary">
          <p className="product">Lira Earrings</p>
          <p className="price">$64</p>
        </div>
        <div className="product_data_OrderSummary">
          <p className="product">Lira Earrings</p>
          <p className="price">$64</p>
        </div>
        <div className="product_data_OrderSummary">
          <p className="product">Lira Earrings</p>
          <p className="price">$64</p>
        </div>
        <div className="data_subtotal">
          <p className="subtotal">SUBTOTAL</p>
          <p className="sum">$164</p>
        </div>
        <div className="data_shipping">
          <p className="shipping">SHIPPING</p>
          <p className="shipping_data">Free shipping</p>
        </div>
        <div className="data_total">
          <p className="total">
            <b>TOTAL</b>
          </p>
          <p className="total_dataa">
            <b>$85</b>
          </p>
        </div>
      </div>
    </div>
  );
}
export default OrderSummary;
