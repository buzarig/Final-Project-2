import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { Button } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.scss";

function CarouselComponent(props) {
  return (
    <div className="carousel">
      <Carousel
          showDots
          responsive={responsive}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item"
          renderDotsOutside
      >
        <Button>
          <Link to="catalog">View Product</Link>
        </Button>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
