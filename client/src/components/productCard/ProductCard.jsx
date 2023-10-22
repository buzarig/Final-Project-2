/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

import "./ProductCard.scss";

function ProductCard(props) {
  const { discount, title, price, imageUrl } = props;

  return (
    <div className="jewelry-card">
      <div className="jewelry-card-image">
        {discount && (
          <div className="jewlry-sale">
            <h2 className="jewlry-sale-info">-{discount}%</h2>
          </div>
        )}
        <img className="jewelry-card-pic" src={imageUrl} alt="jewelry-pic" />
      </div>
      <div className="jewelry-card-info">
        <h2 className="jewelry-card-title">{title}</h2>
        <p className="jewelry-card-price">${price}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  discount: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string.isRequired
};

export default ProductCard;
