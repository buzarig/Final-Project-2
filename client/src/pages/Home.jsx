import React from "react";
import CarouselComponent from "../components/carousel/Carousel";

function Home() {
  return (
    <div className="container">
        <h1>Title</h1>
      <main>
        <CarouselComponent/>
        <CarouselComponent/>
        <CarouselComponent/>
        <CarouselComponent/>
      </main>
    </div>
  );
}

export default Home;
