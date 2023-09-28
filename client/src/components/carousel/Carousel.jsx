import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function CarouselComponent() {
  const products = [
    { title: "Gold big hoops", price: "$68,00" },
    { title: "Gold big hoops", price: "$68,00" },
    { title: "Gold big hoops", price: "$68,00" },
    { title: "Gold big hoops", price: "$68,00" }
  ];

  return (
    <div className="carousel-component">
      <Carousel
        arrows={false}
        showDots
        responsive={responsive}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item"
        renderDotsOutside
      >
        {products.map((product) => (
          <div className="carousel">
            <div className="flex-box">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">{product.price}</p>
              <button type="button" className="btn-product">
                <Link to="/catalog">View Product</Link>
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
