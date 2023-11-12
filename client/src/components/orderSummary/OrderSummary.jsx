import React from "react";
import "./OrderSummary.scss";
import PropTypes from "prop-types";

function OrderSummary({ key, productName, price, totalSum, subtotalSum }) {
  return (
    <div className="orderSummary_container">
      <h4 className="title_order_summary">Order Summery</h4>

      <div className="orderSummary">
        <div className="named_OrderSummary">
          <p>PRODUCT</p>
          <p>TOTAL</p>
        </div>
        <div key={key}>
          <div className="product_data_OrderSummary">
            <p className="product">{productName}</p>
            <p className="price">${price}</p>
          </div>
        </div>
        <div className="data_subtotal">
          <p className="subtotal">SUBTOTAL</p>
          <p className="sum">${subtotalSum}</p>
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
            <b>${totalSum}</b>
          </p>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  totalSum: PropTypes.string.isRequired,
  subtotalSum: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired
};
export default OrderSummary;
