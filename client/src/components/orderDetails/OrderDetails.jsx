import React from "react";
import "./OrderDetails.scss";

function OrderDetails() {
  return (
    <div className="container_orderDetails">
      <h4>Order Details</h4>
      <div className="data_orderDetails">
        <div className="leftPart_orderDetails">
          <div className="data_part">
            <p className="data_title">ORDER NUMBER</p>
            <span>1879605573994</span>
          </div>
          <div className="data_part">
            <p className="data_title">EMAIL</p>
            <span>Vitathemes@gmail.com</span>
          </div>
          <div className="data_part">
            <p className="data_title">PAYMENT METHOD</p>
            <span>Mastercard*************7865</span>
          </div>
          <div className="data_part">
            <p className="data_title">ORDER DATE</p>
            <span>October 8,2020</span>
          </div>
        </div>
        <div className="rightPart_orderDetails">
          <div className="data_part">
            <p className="data_title">DELIVERY OPTIONS</p>
            <span>Standard delivery</span>
          </div>
          <div className="data_part">
            <p className="data_title">DELIVERY ADDRESS</p>
            <div className="data_address">
              Kristian holst 34 old street W1F 7NU london United Kingdom
            </div>
          </div>
          <div className="data_part">
            <p className="data_title">CONTACT NUMBER</p>
            <span>+44 8749790988</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
