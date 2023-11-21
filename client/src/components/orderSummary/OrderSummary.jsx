import React from "react";
import "./OrderSummary.scss";
import PropTypes from "prop-types";

function OrderSummary({ items, totalSum }) {
  return (
    <div className="orderSummary_container">
      <h4 className="title_order_summary">Order Summery</h4>
      <div className="orderSummary">
        <div className="named_OrderSummary">
          <p>PRODUCT</p>
          <p>TOTAL</p>
        </div>
        {items.map((item) => (
          <div key={item.id}>
            <div className="product_data_OrderSummary">
              <p className="product">
                {item.productName.charAt(0).toUpperCase() +
                  item.productName.slice(1)}
              </p>
              <p className="price">${item.price}</p>
            </div>
          </div>
        ))}
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
  totalSum: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired
};
export default OrderSummary;
