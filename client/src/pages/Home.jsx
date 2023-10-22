/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../http/api";
import CarouselComponent from "../components/carousel/Carousel";
import "../styles/_home.scss";

function Home() {
  const [products, setProducts] = useState([]);
  console.log(products);

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
        <CarouselComponent myProducts={products} />
      </main>
      <div className="flex-shop">
        <h2 className="title-shop">Shop The Latest</h2>
        <Link to="/catalog" className="shop-link">
          View all
        </Link>
      </div>
      <div className="cards-container">
        {products.map(
          (product) => console.log(product.name)
          // <ProductCard
          //   key={product.itemNo}
          //   title={product.title}
          //   price={product.price}
          //   imageUrl={product.imageUrl}
          //   showSaleInfo={false}
          //   showButtons
          // />
        )}
      </div>
    </div>
  );
}

export default Home;
