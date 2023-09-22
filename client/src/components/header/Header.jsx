/* eslint-disable react/self-closing-comp */
import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <Link className="logo" to="/">
          <img src="../../assets/images/SHOPPE.png" alt="" />
        </Link>
        <div className="nav">
          <ul className="links">
            <li>
              <Link to="catalog">Shop</Link>
            </li>
            <li>
              <Link to="blog">Blog</Link>
            </li>
            <li>
              <Link to="about-us">Our Story</Link>
            </li>
            <li className="line"></li>
          </ul>
          <ul className="personal">
            <li className="search">
              <Link to="catalog">
                <img src="../../assets/icons/Icon-search.png" alt="" />
              </Link>
            </li>
            <li className="favorite">
              <Link to="favorite">
                <img src="../../assets/icons/Icon-favorite.png" alt="" />
              </Link>
            </li>
            <li className="cart">
              <Link to="cart">
                <img src="../../assets/icons/Icon-cart.png" alt="" />
              </Link>
            </li>
            <li className="account">
              <Link to="account">
                <img src="../../assets/icons/Icon-account.png" alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Header;
