/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "../styles/_termsOfUse.scss";

function TermsOfUse() {
  return (
    <div className="terms-and-conditions">
      <div className="terms-and-conditions__container">
        <div className="terms">
          <h1>Terms and Conditions</h1>
          <p>
            Welcome to the Shoppe's Terms and Conditions page. Here, you'll find
            information about the legal terms and guidelines governing your use
            of our website and services.
          </p>
        </div>

        <div className="policy">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using the Shoppe website, you agree to comply with
            our Terms and Conditions. Please carefully read and understand the
            following terms:
          </p>
        </div>
        <ul className="terms-list">
          <li>
            <span>● Use of the Website:</span> Your use of our website is
            subject to these terms. You may not use our services if you do not
            agree with the terms.
          </li>
          <li>
            <span>● Privacy Policy:</span> Your use of personal information is
            governed by our Privacy Policy, which you should review as well.
          </li>
          <li>
            <span>● Changes to Terms:</span> Shoppe reserves the right to modify
            these terms at any time. You should review them regularly.
          </li>
        </ul>

        <div className="rights">
          <h2>Your Rights and Obligations</h2>
          <p>
            We want to make sure you understand your rights and responsibilities
            when using our website and services:
          </p>
        </div>
        <ul className="rights-list">
          <li>
            <span>● Intellectual Property:</span> All content on this website,
            including text, images, and logos, is protected by copyright and
            other intellectual property rights owned by Shoppe.
          </li>
          <li>
            <span>● Prohibited Activities:</span> You are prohibited from
            engaging in certain activities on our website, such as spamming,
            hacking, or distributing malware.
          </li>
          <li>
            <span>● Termination:</span> Shoppe reserves the right to terminate
            your access to the website for violating these terms.
          </li>
        </ul>

        <div className="contact">
          <p>
            If you have any questions or need further clarification regarding
            our Terms and Conditions, please don't hesitate to contact us. We're
            here to assist you in understanding our policies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;
