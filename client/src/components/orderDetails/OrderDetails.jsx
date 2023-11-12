import React from "react";

function OrderDetails() {
  return (
    <div className="container_orderDetails">
      <h4>Order Details</h4>
      <div className="data_orderDetails">
        <div className="leftPart_orderDetails">
          <div>
            <p>ORDER NUMBER</p>
            <span>1879605573994</span>
          </div>
          <div>
            <p>EMAIL</p>
            <span>Vitathemes@gmail.com</span>
          </div>
          <div>
            <p>PAYMENT METHOD</p>
            <span>Mastercard*************7865</span>
          </div>
          <div>
            <p>ORDER DATE</p>
            <span>October 8,2020</span>
          </div>
        </div>
        <div className="rightPart_orderDetails">
          <div>
            <p>DELIVERY OPTIONS</p>
            <span>Standard delivery</span>
          </div>
          <div>
            <p>DELIVERY ADDRESS</p>
            <span>
              Kristian holst 34 old street W1F 7NU london United Kingdom
            </span>
          </div>
          <div>
            <p>CONTACT NUMBER</p>
            <span>+44 8749790988</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
