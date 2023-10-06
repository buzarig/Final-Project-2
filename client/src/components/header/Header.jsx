/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import searchToggle from "../../redux/actions/searchActions";

import "./header.scss";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isToggledSearch = useSelector((state) => state.search.searchToggle);
  const [searchQuery, setSearchQuery] = useState("");

  function toggleSearchBar() {
    isToggledSearch = !isToggledSearch;
    dispatch(searchToggle(isToggledSearch));
  }

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/${searchQuery}`);
  }

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
              <button type="button" onClick={toggleSearchBar}>
                <img src="../../assets/icons/Icon-search.png" alt="" />
              </button>
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
          {/* MENU */}
          <div className="menu">
            <ul className="menu-personal">
              <li className="home-mobile">
                <Link to="/">Home</Link>
              </li>
              <li className="catalog-mobile">
                <Link to="catalog">Shop</Link>
              </li>
              <li className="about-mobile">
                <Link to="aboutUs">About</Link>
              </li>
              <li className="blog-mobile">
                <Link to="blog">Blog</Link>
              </li>
              <li className="help-mobile">
                <Link to="help">Help</Link>
              </li>
              <li className="contact-mobile">
                <Link to="contacts">Contact</Link>
              </li>
            </ul>
            <ul className="menu-account">
              <li className="myAccount-menu">
                <Link to="myAccount">
                  <img src="../../assets/icons/Icon-account.png" alt="" />
                  My Account
                </Link>
                <Link to="*">
                  <img src="../../assets/icons/logOut-icon.png" alt="" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          {/* MENU */}
          {isToggledSearch && (
            <form className="search-bar" onSubmit={handleSearch}>
              <TextField
                id="search-bar-mui"
                className="text"
                onInput={(e) => {
                  setSearchQuery(e.target.value);
                }}
                label="Search"
                variant="outlined"
                placeholder="Search..."
                size="small"
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "black" }} />
              </IconButton>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
