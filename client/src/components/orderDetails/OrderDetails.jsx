import React from "react";
import "./OrderDetails.scss";
import PropTypes from "prop-types";

function OrderDetails({ orderNo, email, payment, date, address, mobile }) {
  return (
    <div className="container_orderDetails">
      <h4>Order Details</h4>
      <div className="data_orderDetails">
        <div className="leftPart_orderDetails">
          <div className="data_part">
            <p className="data_title">ORDER NUMBER</p>
            <span>{orderNo}</span>
          </div>
          <div className="data_part">
            <p className="data_title">EMAIL</p>
            <span>{email}</span>
          </div>
          <div className="data_part">
            <p className="data_title">PAYMENT METHOD</p>
            <span>{payment}</span>
          </div>
          <div className="data_part">
            <p className="data_title">ORDER DATE</p>
            <span>{date}</span>
          </div>
        </div>
        <div className="rightPart_orderDetails">
          <div className="data_part">
            <p className="data_title">DELIVERY OPTIONS</p>
            <span>Standard delivery</span>
          </div>
          <div className="data_part">
            <p className="data_title">DELIVERY ADDRESS</p>
            <div className="data_address">{address}</div>
          </div>
          <div className="data_part">
            <p className="data_title">CONTACT NUMBER</p>
            <span>{mobile}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
OrderDetails.propTypes = {
  orderNo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired
};

export default OrderDetails;
