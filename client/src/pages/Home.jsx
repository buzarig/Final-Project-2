import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Home;
