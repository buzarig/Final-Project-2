import React from "react";
import PropTypes from "prop-types";
import "./ProductCarouselComponent.scss";

function ProductCarouselComponent({ title, price, img }) {
  return (
    <div className="carousel" style={{ backgroundImage: `url(${img})` }}>
      <div className="flex-box">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price}</p>
        <p className="product-information">
          Duis ut diam quam nulla porttitor massa id neque aliquam
        </p>
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
