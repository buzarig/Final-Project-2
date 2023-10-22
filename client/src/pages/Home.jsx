import React from "react";
import { Link } from "react-router-dom";
import CarouselComponent from "../components/carousel/Carousel";
import ProductCard from "../components/productCard/ProductCard";
import "../styles/_home.scss";

function Home(products) {
  return (
    <div className="container">
      <main className="home">
        <CarouselComponent myProducts={products} />
      </main>
      <div className="flex-shop">
        <h2 className="title-shop">Shop The Latest</h2>
        <Link to="/catalog" className="shop-link">
          View all
        </Link>
      </div>
      <div className="cards-container">
        <ProductCard className="product-card" />
        <ProductCard className="product-card" />
        <ProductCard className="product-card" />
        <ProductCard className="product-card" />
        <ProductCard className="product-card" />
        <ProductCard className="product-card" />
      </div>
    </div>
  );
}

export default Home;
