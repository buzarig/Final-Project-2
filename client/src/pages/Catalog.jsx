import React from "react";
import { Outlet } from "react-router-dom";

function Catalog() {
  return (
    <>
      <h2>Catalog</h2>
      <Outlet />
    </>
  );
}
export default Catalog;
