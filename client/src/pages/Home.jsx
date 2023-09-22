import React from "react";
import { Outlet } from "react-router-dom";
import CarouselComponent from "../components/carousel/Carousel";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div className="container">
      <Header />
      <main>
        <CarouselComponent />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
