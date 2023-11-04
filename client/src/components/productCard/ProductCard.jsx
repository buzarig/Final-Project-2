/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import "./ProductCard.scss";

function ProductCard({
  showSaleInfo,
  showButtons,
  discount,
  title,
  price,
  imageUrl,
  itemNo,
  cardUrl
}) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  const handleAddToFavorites = () => {
    setIsAddedToFavorites(true);
  };

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalog${cardUrl}/${itemNo}`);
  };

  return (
    <div ref={ref} className="jewelry-card">
      <div className="jewelry-card-image">
        {discount && (
          <div className="jewlry-sale">
            <h2 className="jewlry-sale-info">-{discount}%</h2>
          </div>
        )}
        {inView ? (
          <div className="img-block">
            <div className="img-wrapper">
              <img
                className="jewelry-card-pic"
                src={imageUrl}
                alt="jewelry-pic"
              />
            </div>
            {showButtons && (
              <div className="icons-container">
                <button
                  className="icon"
                  type="submit"
                  onClick={handleAddToCart}
                >
                  <img
                    src="../../assets/icons/shopping-cart 1.svg"
                    alt="shopping-icon"
                  />
                </button>
                <button className="icon" type="submit" onClick={handleClick}>
                  <img
                    src="../../assets/icons/eye-svgrepo-com 1.svg"
                    alt="eye-icon"
                  />
                </button>
                <button
                  className="icon"
                  type="submit"
                  onClick={handleAddToFavorites}
                >
                  <img
                    src="../../assets/icons/heart-svgrepo-com 1.svg"
                    alt="heart-icon"
                  />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="jewelry-card-stub" />
        )}
      </div>
      <div className="jewelry-card-info">
        <h2 className="jewelry-card-title">{title}</h2>
        <p className="jewelry-card-price">${price}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  showSaleInfo: PropTypes.bool,
  showButtons: PropTypes.bool,
  discount: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
  cardUrl: PropTypes.string,
  itemNo: PropTypes.number.isRequired
};

ProductCard.defaultProps = {
  showSaleInfo: true,
  showButtons: false
};

export default ProductCard;
