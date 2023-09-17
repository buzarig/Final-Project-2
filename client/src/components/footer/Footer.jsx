import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
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

export default Footer;
