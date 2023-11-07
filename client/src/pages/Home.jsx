/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../http/api";
import CarouselComponent from "../components/carousel/Carousel";
import "../styles/_home.scss";
import ProductCard from "../components/productCard/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get(`/products?perPage=6&startPage=1`);
        if (response.status === 200) {
          const productsData = response.data;
          setProducts(productsData);
        } else {
          console.log("Произошла ошибка при получении данных о продуктах.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных о продуктах:", error);
      }
    }

    fetchProducts();
  }, [startPage]);

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
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.itemNo}
              title={product.name}
              price={product.currentPrice}
              imageUrl={product.imageUrls[0]}
              showSaleInfo={false}
              showButtons
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
