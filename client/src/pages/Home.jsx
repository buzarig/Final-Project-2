import React from "react";
import { Link } from "react-router-dom";
import CarouselComponent from "../components/carousel/Carousel";
import "../styles/_home.scss";

function Home() {
  return (
    <div className="container">
      <main className="home">
        <CarouselComponent />
      </main>
      <div className="flex-shop">
        <h2 className="title-shop">Shop The Latest</h2>
        <Link to="/catalog">View all</Link>
      </div>
    </div>
  );
}

export default Home;
