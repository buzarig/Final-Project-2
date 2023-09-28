import React from "react";
import { Outlet } from "react-router-dom";
import ProductCard from "../components/productCard/ProductCard";
import "../styles/style.scss";

function Catalog() {
  return (
    <div className="main-catalog">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <Outlet />
    </div>
  );
}
export default Catalog;
