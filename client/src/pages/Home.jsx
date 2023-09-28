import React from "react";
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
        <button type="button" className="btn-link">
          View all
        </button>
      </div>
    </div>
  );
}

export default Home;
