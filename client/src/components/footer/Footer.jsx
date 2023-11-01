import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

import linkedInLogo from "../../assets/icons/Icon-linkedin.png";
import facebookLogo from "../../assets/icons/Icon-facebook.png";
import instagramLogo from "../../assets/icons/Icon-instagram.png";
import twitterLogo from "../../assets/icons/Icon-twitter.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="nav">
          <ul className="help">
            <li>
              <Link to="/contacts">Contact</Link>
            </li>
            <li>
              <Link to="terms-of-service">Terms Of Services</Link>
            </li>
            <li>
              <Link to="shipping-and-returns">Shipping And Returns</Link>
            </li>
          </ul>
          <div className="privacy">
            <span>© 2021 Shelly.</span>{" "}
            <Link to="terms-of-use">Terms of use </Link>
            <span>and</span>
            <Link to="privacy"> privacy policy</Link>.
          </div>
        </div>
        <div className="info">
          <div className="socials">
            <a href="https://www.linkedin.com/">
              <img src={linkedInLogo} alt="" />
            </a>
            <a href="https://www.facebook.com/">
              <img src={facebookLogo} alt="" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={instagramLogo} alt="" />
            </a>
            <a href="https://twitter.com/">
              <img src={twitterLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
