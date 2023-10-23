/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../http/api";
import CarouselComponent from "../components/carousel/Carousel";
import "../styles/_home.scss";
import ProductCard from "../components/productCard/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/products");
        if (response.status === 200) {
          const productsData = response.data;
          setProducts(productsData.slice(0, 6));
        } else {
          console.log("Произошла ошибка при получении данных о продуктах.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных о продуктах:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container home-page">
      <main className="home">
        <CarouselComponent key={products.index} myProducts={products} />
      </main>
      <div className="flex-shop">
        <h2 className="title-shop">Shop The Latest</h2>
        <Link to="/catalog" className="shop-link">
          View all
        </Link>
      </div>
      <div className="cards-container">
        {products.map((product) => (
          <ProductCard
            key={product.itemNo}
            title={product.name}
            price={product.currentPrice}
            imageUrl={product.imageUrls[0]}
            showSaleInfo={false}
            showButtons
            itemNo={product.itemNo}
            cardUrl={product.productUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
