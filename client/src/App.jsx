import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Contacts from "./pages/Contacts";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import ShippingAndReturns from "./pages/Shipping";
import TermsOfService from "./pages/TermsOfService";
import TermsOfUse from "./pages/TermsOfUse";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import Order from "./pages/Order";
import OrderConfirmation from "./pages/OrderConfirmation";

import Cabinet from "./pages/Cabinet";
import Dashboard from "./pages/navCabinet/Dashboard";
import Orders from "./pages/navCabinet/Orders";
import Addresses from "./pages/navCabinet/Addresses";
import AccountDetails from "./pages/navCabinet/AccountDetails";
import MyAccount from "./pages/MyAccount";

import ResetPassword from "./pages/ResetPassword";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";
import PageError from "./pages/PageError";

const theme = createTheme({
  direction: "rtl"
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route
              path="catalog/:productUrl/:productId"
              element={<Product />}
            />
            <Route path="contacts" element={<Contacts />} />
            <Route path="blog" element={<Blog />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="privacy" element={<Privacy />} />
            <Route
              path="shipping-and-returns"
              element={<ShippingAndReturns />}
            />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order" element={<Order />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />

            <Route path="myAccount" element={<MyAccount />}>
              <Route path="signIn" element={<SignIn />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="cabinet" element={<Cabinet />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="accountDetails" element={<AccountDetails />} />
            </Route>

            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="thanks" element={<Thanks />} />
            <Route path="order" element={<Order />} />
            <Route path="*" element={<PageError />} />
          </Route>
        </Routes>

        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
