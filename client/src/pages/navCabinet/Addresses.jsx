import React from "react";
import { Link } from "react-router-dom";

function Addresses() {
  return (
    <div className="addresses-block">
      <p className="addresses-text">
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="flex-block">
        <div className="billing-block">
          <h2 className="addresses-title">Billing address</h2>
          <Link to="*" className="addresses-link">
            Add
          </Link>
          <p className="addresses-info">
            You have not set up this type of address yet.
          </p>
        </div>
        <div className="shipping-block">
          <h2 className="addresses-title">Shipping address</h2>
          <Link to="*" className="addresses-link">
            Add
          </Link>
          <p className="addresses-info">
            You have not set up this type of address yet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
