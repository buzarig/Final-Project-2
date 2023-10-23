/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "../styles/_shipping.scss";

function ShippingAndReturns() {
  return (
    <div className="shipping-and-returns">
      <div className="shipping-and-returns__container">
        <div className="shipping">
          <h1>Shipping and Returns</h1>
          <p>
            Welcome to the Shoppe's Shipping and Returns page. Here, you'll find
            information about our shipping policies and how to return products.
          </p>
        </div>

        <div className="policy">
          <h2>Shipping Policy</h2>
          <p>
            At Shoppe, our primary goal is to offer you an exceptional online
            shopping experience, characterized by a seamless and
            customer-centric approach. To ensure you have a comprehensive Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Ab, natus.
            understanding of our shipping services, here is a detailed overview:
          </p>
        </div>
        <ul className="shipping-list">
          <li>
            <span>● Shipping Rates:</span> Our shipping rates and delivery times
            may vary depending on your location and the products you've ordered.
            You can find specific shipping details during the checkout process.
          </li>
          <li>
            <span>● Order Processing:</span> We strive to process and ship
            orders promptly. Orders are typically processed within 14 and
            shipped to you as soon as possible.
          </li>
          <li>
            <span>● Delivery:</span> We partner with reliable shipping carriers
            to ensure the safe and timely delivery of your orders. You can track
            your order using the provided tracking number.
          </li>
        </ul>

        <div className="returns">
          <h2>Returns and Exchanges</h2>
          <p>
            If you are not entirely satisfied with your purchase, we're here to
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            alias minus odio sed voluptates suscipit. help. Here's our return
            and exchange policy:
          </p>
        </div>
        <ul className="returns-list">
          <li>
            <span>● Eligibility:</span> To be eligible for a return or exchange,
            your item must be unused and in the same condition that you received
            it.
          </li>
          <li>
            <span>● Requesting a Return:</span> To initiate a return or
            exchange, please contact our customer support within [mention number
            of days] days of receiving your order. You can reach us at [mention
            contact email or phone number].
          </li>
          <li>
            <span>● Refunds:</span> Once your return is received and inspected,
            we will send you an email to notify you of the approval or rejection
            of your refund. If approved, your refund will be processed, and a
            credit will be applied to your original payment method within
            [mention processing time] days.
          </li>
          <li>
            <span>● Exchanges:</span> We're happy to exchange your item for a
            different size or product. Contact our support to initiate an
            exchange.
          </li>
        </ul>

        <div className="questions">
          <p>
            If you have any questions or need further assistance regarding our
            shipping and returns policy, please don't hesitate to contact us.
            We're here to provide you with exceptional customer service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingAndReturns;
