import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Contacts from "./pages/Contacts";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import Order from "./pages/Order";
import OrderConfirmation from "./pages/OrderConfirmation";

import MyAccount from "./pages/MyAccount";
import ResetPassword from "./pages/ResetPassword";
import PageError from "./pages/PageError";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<Home />} />
          <Route path="catalog" element={<Catalog />}>
            <Route path="catalog/:productId" element={<Product />} />
          </Route>
          <Route path="contacts" element={<Contacts />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order" element={<Order />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />

          <Route path="myAccount" element={<MyAccount />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="thanks" element={<Thanks />} />
          <Route path="order" element={<Order />} />
          <Route path="error" element={<PageError />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
