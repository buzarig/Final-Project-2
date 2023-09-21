import React from "react";
import { Outlet } from "react-router-dom";
import Search from "../components/filter/search";

function Catalog() {
  return (
    <>
      <h2>Catalog</h2>
      <Search/>
      <Outlet />
    </>
  );
}
export default Catalog;
