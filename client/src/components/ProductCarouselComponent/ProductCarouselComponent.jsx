import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductCarouselComponent.scss";

function ProductCarouselComponent({ title, price, img }) {
  return (
    <div className="carousel" style={{ backgroundImage: `url(${img})` }}>
      <div className="flex-box">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price}</p>
        <button type="button" className="btn-product">
          <Link to="/catalog">View Product</Link>
        </button>
      </div>
    </div>
  );
}

ProductCarouselComponent.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

export default ProductCarouselComponent;
