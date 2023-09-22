import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.scss";

function CarouselComponent() {
  return (
    <Carousel showThumbs showArrows={false} className="carousel">
      <div className="gold-section">
        <h2 className="title">Gold big hoops 1</h2>
        <p className="price-section">$ 68,00</p>
        <button type="button" className="btn-product">View product</button>
      </div>
      <div className="gold-section">
        <h2 className="title">Gold big hoops 2</h2>
        <p className="price-section">$ 68,00</p>
        <button type="button" className="btn-product">View product</button>
      </div>
      <div className="gold-section">
        <h2 className="title">Gold big hoops 3</h2>
        <p className="price-section">$ 68,00</p>
        <button type="button" className="btn-product">View product</button>
      </div>
      <div className="gold-section">
        <h2 className="title">Gold big hoops 4</h2>
        <p className="price-section">$ 68,00</p>
        <button type="button" className="btn-product">View product</button>
      </div>
      <div className="gold-section">
        <h2 className="title">Gold big hoops 5</h2>
        <p className="price-section">$ 68,00</p>
        <button type="button" className="btn-product">View product</button>
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
