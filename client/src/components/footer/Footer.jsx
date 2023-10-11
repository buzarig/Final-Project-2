import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="nav">
          <ul className="help">
            <li>
              <Link to="/contacts">Contact</Link>
            </li>
            <li>Terms Of Services</li>
            <li>Shipping And Returns</li>
          </ul>
          <div className="privacy">
            <span>© 2021 Shelly.</span> Terms of use <span>and</span> privacy
            policy.
          </div>
        </div>
        <div className="info">
          <div className="newsletter">form email</div>
          <div className="socials">
            <a href="https://www.linkedin.com/">
              <img src="../../assets/icons/Icon-linkedin.png" alt="" />
            </a>
            <a href="https://www.facebook.com/">
              <img src="../../assets/icons/Icon-facebook.png" alt="" />
            </a>
            <a href="https://www.instagram.com/">
              <img src="../../assets/icons/Icon-instagram.png" alt="" />
            </a>
            <a href="https://twitter.com/">
              <img src="../../assets/icons/Icon-twitter.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
