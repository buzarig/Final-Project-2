import React from "react";
import "../styles/_privacy.scss";

function Privacy() {
  return (
    <div className="privacy-container">
      <h1 className="privacy-h1">Privacy Policy</h1>
      <p className="privacy-text">
        Your privacy matters to us. At our jewelry web-shop, we are committed to
        safeguarding your personal information. Our Privacy Policy outlines how
        we collect, use, and protect your data. We respect your choices and
        ensure that any information you share with us is used solely for
        improving your shopping experience and providing you with personalized
        services. We are dedicated to transparency and compliance with data
        protection laws to ensure your trust in our web-shop.
      </p>
      <h1 className="privacy__security">Security</h1>
      <p className="privacy__security-text">
        Protecting your data and ensuring a secure online shopping environment
        is our top priority. Our web-shop employs state-of-the-art security
        measures to safeguard your personal and financial information. We use
        encryption technology to secure your transactions, and our team
        constantly monitors for potential threats. Rest assured that your data
        is treated with the utmost care, and we are committed to maintaining the
        highest standards of security to keep your shopping experience
        worry-free.
      </p>
      <h1 className="privacy__cookies">Cookies</h1>
      <ul className="privacy__cookies-list">
        <li className="privacy__cookies-list-text">
          {" "}
          - Cookies help us remember your preferences, such as your selected
          items, shopping cart contents, and preferred settings (e.g., currency
          and language).
        </li>
        <li className="privacy__cookies-list-text">
          {" "}
          - We use cookies to analyze your browsing and purchase history,
          allowing us to offer personalized product recommendations.{" "}
        </li>
      </ul>
    </div>
  );
}
export default Privacy;
