/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */

/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/actions/cartActions";

import cartIcon from "../../assets/icons/shopping-cart 1.svg";
import eyeIcon from "../../assets/icons/eye-svgrepo-com 1.svg";

import "./ProductCard.scss";

function ProductCard({
  showSaleInfo,
  showButtons,
  discount,
  title,
  currentPrice,
  previousPrice,
  imageUrl,
  itemNo,
  cardUrl,
  quantity
}) {
  const [discountedPrice, setDiscountedPrice] = useState(
    previousPrice ? currentPrice : null
  );

  const [discountPercent, setDiscountPercent] = useState(
    previousPrice ? (discount ? `${discount}%` : null) : null
  );

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accessToken);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalog${cardUrl}/${itemNo}`);
  };

  const handleAddToCart = (selectedProduct) => {
    const selectedProductCart = {
      name: title,
      currentPrice,
      previousPrice,
      imageUrls: [imageUrl],
      itemNo,
      cardUrl
    };
    dispatch(addProductToCart(selectedProductCart, 1, token));
    navigate("/cart");
  };

  return (
    <div ref={ref} className="jewelry-card" onClick={handleClick}>
      <div className="jewelry-card-image">
        {discount && (
          <div className="jewlry-sale">
            <h2 className="jewlry-sale-info">
              {discountPercent ? `-${discountPercent}` : "Sale"}
            </h2>
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
                  disabled={quantity === 0}
                >
                  <img src={cartIcon} alt="shopping-icon" />
                </button>
                <button className="icon" type="submit" onClick={handleClick}>
                  <img src={eyeIcon} alt="eye-icon" />
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
        <p className="jewelry-card-price">
          {previousPrice ? (
            discountedPrice ? (
              <span
                className={`price ${
                  quantity === 0 ? "out-of-stock" : "discounted-price"
                }`}
              >
                {quantity === 0 ? "Out of Stock" : `$${discountedPrice}`}
              </span>
            ) : null
          ) : (
            <span className={`price ${quantity === 0 ? "out-of-stock" : ""}`}>
              {quantity === 0 ? "Out of Stock" : `$${currentPrice}`}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  showSaleInfo: PropTypes.bool,
  showButtons: PropTypes.bool,
  discount: PropTypes.number,
  title: PropTypes.string,
  currentPrice: PropTypes.number.isRequired,
  previousPrice: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
  cardUrl: PropTypes.string
};

ProductCard.defaultProps = {
  showSaleInfo: true,
  showButtons: false
};

export default ProductCard;
