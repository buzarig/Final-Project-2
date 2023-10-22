/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProductCard.scss";

function ProductCard({
  showSaleInfo,
  showButtons,
  discount,
  title,
  price,
  imageUrl
}) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  const handleAddToFavorites = () => {
    setIsAddedToFavorites(true);
  };

  return (
    <div className="jewelry-card-catalog">
      <div className="jewelry-card">
        <div className="jewelry-card-image">
          {showSaleInfo && (
            <div className="jewelry-sale">
              <h2 className="jewelry-sale-info">-{discount}%</h2>
            </div>
          )}
          <img className="jewelry-card-pic" src={imageUrl} alt="jewelry-pic" />
          {showButtons && (
            <div className="icons-container">
              <button className="icon" type="submit" onClick={handleAddToCart}>
                <img
                  src="../../assets/icons/shopping-cart 1.svg"
                  alt="shopping-icon"
                />
              </button>
              <button
                className="icon"
                type="submit"
                onClick={handleAddToFavorites}
              >
                <img
                  src="../../assets/icons/eye-svgrepo-com 1.svg"
                  alt="eye-icon"
                />
              </button>
              <button className="icon" type="submit">
                <img
                  src="../../assets/icons/heart-svgrepo-com 1.svg"
                  alt="heart-icon"
                />
              </button>
            </div>
          )}
        </div>
        <div className="jewelry-card-info">
          <h2 className="jewelry-card-title">{title}</h2>
          <p className="jewelry-card-price">${price}</p>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  showSaleInfo: PropTypes.bool,
  showButtons: PropTypes.bool,
  discount: PropTypes.number,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired
};

ProductCard.defaultProps = {
  showSaleInfo: true,
  showButtons: false
};

export default ProductCard;
