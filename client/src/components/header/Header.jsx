import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

function Header() {
  return (
    <div className="header">
      <Link className="logo" to="/">
        Logo
      </Link>
      <div className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Каталог</Link>
          </li>
          <li>
            <Link to="/delivery">Доставка</Link>
          </li>
          <li>
            <Link to="/aboutUs">Про нас</Link>
          </li>
          <li>
            <Link to="/contacts">Контакти</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header;
