import React from "react";
import Carousel from "react-multi-carousel";
import bgPhoto from "../../assets/images/Carousel/Background1.jpg";
import bgPhotoTwo from "../../assets/images/Carousel/Background2.png";
import bgPhotoThree from "../../assets/images/Carousel/Background3.jpg";
import ProductCarouselComponent from "../ProductCarouselComponent/ProductCarouselComponent";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1620 },
    items: 1
  },
  desktopMedium: {
    breakpoint: { max: 1620, min: 1024 },
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
  const autoSlide = 5000;

  const products = [
    {
      title: "Gold big hoops",
      price: "$168.00",
      img: bgPhoto
    },
    {
      title: "Ollie Earrings",
      price: "$488.00",
      img: bgPhotoTwo
    },
    {
      title: "Lira Earrings",
      price: "$150.00",
      img: "https://uhd.name/uploads/posts/2022-02/1644635961_1-uhd-name-p-krasivie-kole-iz-zolota-devushka-krasivo-f-1.jpg"
    },
    {
      title: "Gold big rings",
      price: "$299.00",
      img: bgPhotoThree
    }
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
        autoPlay
        autoPlaySpeed={autoSlide}
        infinite
      >
        {products.map((product) => (
          <ProductCarouselComponent
            key={products.index}
            title={product.title}
            price={product.price}
            img={product.img}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
