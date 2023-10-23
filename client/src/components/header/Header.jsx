/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from "react";
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
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleSearchBar() {
    isToggledSearch = !isToggledSearch;
    dispatch(searchToggle(isToggledSearch));
  }

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/${searchQuery}`);
  }

  useEffect(() => {
    let timeoutId;

    function handleDocumentClick(event) {
      const searchInput = document.getElementsByClassName("search-bar")[0];
      if (isToggledSearch && searchInput) {
        if (
          !searchInput.contains(event.target) &&
          event.target !== searchInput
        ) {
          // Закрыть поиск при клике вне элемента поиска
          dispatch(searchToggle(false));
        }
      }
    }

    // Добавьте обработчик события click при открытой строке поиска с небольшой задержкой
    if (isToggledSearch) {
      timeoutId = setTimeout(() => {
        window.addEventListener("click", handleDocumentClick);
      }, 100); // Используйте нужное значение задержки (в миллисекундах)
    }

    // Удалите обработчик события click и отмените таймаут при закрытом поиске
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("click", handleDocumentClick);
    };
  }, [isToggledSearch, dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.documentElement.classList.add("scroll-lock");
      document.body.classList.add("scroll-lock");
    } else {
      document.documentElement.classList.remove("scroll-lock");
      document.body.classList.remove("scroll-lock");
    }
  };

  useEffect(() => {
    function handleWheel(event) {
      if (isMenuOpen) {
        // Вмешиваемся в прокрутку, если меню открыто
        const { deltaY } = event;
        const scrollContainer = document.querySelector(".menu"); // Замените на соответствующий селектор
        if (scrollContainer) {
          scrollContainer.scrollTop += deltaY;
        }
      }
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-wrapper__content">
          <Link className="logo" to="/">
            <img src="../../assets/images/SHOPPE.png" alt="" />
          </Link>
          <div className="nav">
            <ul className="links">
              <li
                className={
                  window.location.pathname.startsWith("/catalog")
                    ? "active"
                    : ""
                }
              >
                <Link to="catalog">Shop</Link>
              </li>
              <li
                className={window.location.pathname === "/blog" ? "active" : ""}
              >
                <Link to="blog">Blog</Link>
              </li>
              <li
                className={
                  window.location.pathname === "/about-us" ? "active" : ""
                }
              >
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
                <Link to="myAccount/register">
                  <img src="../../assets/icons/Icon-account.png" alt="" />
                </Link>
              </li>
            </ul>
            {/* MENU */}
            <li className="menu-cart">
              <Link to="cart">
                <img src="../../assets/icons/Icon-cart.png" alt="" />
              </Link>
            </li>
            <button
              id="menu-hamburger-btn"
              type="button"
              className={isMenuOpen ? "open" : ""}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
            {isMenuOpen && (
              <div className="menu">
                <ul className="menu-personal">
                  <li className="home-mobile">
                    <Link to="/" onClick={toggleMenu}>
                      Home
                    </Link>
                  </li>
                  <li className="catalog-mobile">
                    <Link to="catalog" onClick={toggleMenu}>
                      Shop
                    </Link>
                  </li>
                  <li className="about-mobile">
                    <Link to="about-us" onClick={toggleMenu}>
                      About
                    </Link>
                  </li>
                  <li className="blog-mobile">
                    <Link to="blog" onClick={toggleMenu}>
                      Blog
                    </Link>
                  </li>
                  <li className="help-mobile">
                    <Link to="help" onClick={toggleMenu}>
                      Help
                    </Link>
                  </li>
                  <li className="contact-mobile">
                    <Link to="contacts" onClick={toggleMenu}>
                      Contact
                    </Link>
                  </li>
                </ul>
                <ul className="menu-account">
                  <Link to="myAccount/signIn" onClick={toggleMenu}>
                    <img src="../../assets/icons/Icon-account.png" alt="" />
                    My Account
                  </Link>
                  <Link to="*" onClick={toggleMenu}>
                    <img src="../../assets/icons/logOut-icon.png" alt="" />
                    Logout
                  </Link>
                </ul>
              </div>
            )}
            {/* MENU */}
          </div>
        </div>
        <div className="header-wrapper__search">
          <form className="menu-search-bar" onSubmit={handleSearch}>
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
