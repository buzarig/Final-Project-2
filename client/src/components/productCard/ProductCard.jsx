import React from "react";

import "./ProductCard.scss";

function ProductCard() {
  return (
    <div className="catalog">
      <div className="jewelry-card">
        <div className="jewelry-card-image">
          <div className="jewlry-sale">
            <h2 className="jewlry-sale-info">-20%</h2>
          </div>
          <img
            className="jewelry-card-pic"
            src="/assets/images/jewelry.png"
            alt="jewelry-pic"
          />
        </div>
        <div className="jewelry-card-info">
          <h2 className="jewelry-card-title">Jewelry</h2>
          <p className="jewelry-card-price">$20,00</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
