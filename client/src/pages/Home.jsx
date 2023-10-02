import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div className="container">
      home!!!!
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Home;
