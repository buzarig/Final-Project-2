/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../styles/_cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { Link } from "react-router-dom";
import remove from "../assets/images/remove-cart-item.png";
import close from "../assets/images/close-shipping.png";
import api from "../http/api";

import {
  productsFromServer,
  removeProduct,
  decreaseCount,
  increaseCount
} from "../redux/actions/cartActions";

import { updateShippingInfo } from "../redux/actions/addressActions";

function Cart() {
  const products = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accessToken);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isShippingInfoVisible, setShippingInfoVisible] = useState(true);
  const [postCode, setPostCode] = useState("");

  const cartFromServer = async () => {
    try {
      const headers = {
        Authorization: token
      };

      const response = await api.get("/cart", {
        headers
      });

      if (response.status === 200) {
        const cart = response.data;
        dispatch(productsFromServer(cart.products));
      } else {
        alert.log("Произошла ошибка при получении данных о корзине.");
      }
    } catch (error) {
      alert.error("Ошибка при получении данных о корзине:", error);
    }
  };

  useEffect(() => {
    if (token !== null) {
      cartFromServer();
    }
  }, [token]);

  const handleUpdateTotals = () => {
    const updatedShippingInfo = {
      selectedCountry: selectedCountry.name,
      selectedState: selectedState.name,
      selectedCity: selectedCity.name,
      postCode
    };

    dispatch(updateShippingInfo(updatedShippingInfo));
    setShippingInfoVisible(!isShippingInfoVisible);
  };

  const toggleShippingInfo = () => {
    setShippingInfoVisible(!isShippingInfoVisible);
  };

  const changeCountry = (country) => {
    setSelectedCountry(country);
  };

  const changeState = (state) => {
    setSelectedState(state);
  };

  const changeCity = (city) => {
    setSelectedCity(city);
  };

  const changeCode = (code) => {
    setPostCode(code);
  };

  const handleIncreaseCount = (product, itemNo) => {
    dispatch(increaseCount(product, itemNo, token));
  };

  const handleDecreaseCount = (product, itemNo) => {
    dispatch(decreaseCount(product, itemNo, token));
  };

  const handleRemoveProduct = (product, itemNo) => {
    dispatch(removeProduct(product, itemNo, token));
  };

  return (
    <div className="cart">
      <h1 className="cart__title">Shopping cart</h1>

      <div className="cart__container">
        <div className="cart__products">
          <div className="cart__products-items">
            {products.length ? (
              products.map((product, index) => (
                <div
                  className="cart__products-item"
                  key={product.product.itemNo}
                >
                  <img
                    className="cart__products-image"
                    src={product.product.imageUrls[0]}
                    alt={product.product.name}
                  />
                  <div className="cart__products-text">
                    <h1 className="cart__products-text-title">
                      {product.product.name}
                    </h1>
                    <p className="cart__products-text-color">
                      {product.product.color}
                    </p>
                    <p className="cart__products-text-price">
                      {product.product.currentPrice}$
                    </p>
                  </div>
                  <div className="cart__products-count">
                    <button
                      type="button"
                      onClick={() =>
                        handleDecreaseCount(product.product, index)
                      }
                      className="cart__products-count-minus"
                    >
                      -
                    </button>
                    <p className="cart__products-count-number">
                      {product.cartQuantity}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleIncreaseCount(product.product, index)
                      }
                      className="cart__products-count-plus"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(product.product, index)}
                    className="remove-button"
                  >
                    <img
                      className="cart__products-item-remove"
                      src={remove}
                      alt=""
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-cart">No products in the cart</p>
            )}
          </div>
        </div>
        <div className="cart__checkout">
          <div className="checkout-container">
            <h1 className="cart__checkout-title">Cart Totals</h1>

            <div className="count">
              <span className="count-text">Subtotal</span>
              <span className="count-summ">
                {products
                  .reduce(
                    (acc, { product, cartQuantity }) =>
                      acc + product.currentPrice * cartQuantity,
                    0
                  )
                  .toFixed(2)}{" "}
                $
              </span>
            </div>
            <div className="shipping">
              <div className="shipping-title-container">
                <p className="shipping-title">Shipping</p>
                <p className="shipping-text">
                  Shipping costs will be calculated once you have provided
                  address.
                </p>
              </div>
            </div>
            <div className="shipping-container">
              <div className="shipping-container-calculate">
                <h1 className="shipping-container-h1">CALCULATE SHIPPING</h1>
                <button
                  type="button"
                  onClick={toggleShippingInfo}
                  className="shipping-container-close"
                >
                  <img
                    className="shipping-container-close-image"
                    src={close}
                    alt=""
                  />
                </button>
              </div>
              {isShippingInfoVisible && (
                <form className="shipping-select">
                  <Select
                    options={Country.getAllCountries()}
                    getOptionLabel={(options) => {
                      return options.name;
                    }}
                    getOptionValue={(options) => {
                      return options.name;
                    }}
                    value={selectedCountry}
                    onChange={(item) => {
                      changeCountry(item);
                    }}
                    placeholder="Select a Country"
                    className="shipping-country-select"
                  />
                  <Select
                    options={State?.getStatesOfCountry(
                      selectedCountry?.isoCode
                    )}
                    getOptionLabel={(options) => {
                      return options.name;
                    }}
                    getOptionValue={(options) => {
                      return options.name;
                    }}
                    value={selectedState}
                    onChange={(item) => {
                      changeState(item);
                    }}
                    placeholder="Select a State"
                    className="shipping-country-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        fontFamily: "DM Sans"
                      })
                    }}
                  />
                  <Select
                    options={City.getCitiesOfState(
                      selectedState?.countryCode,
                      selectedState?.isoCode
                    )}
                    getOptionLabel={(options) => {
                      return options.name;
                    }}
                    getOptionValue={(options) => {
                      return options.name;
                    }}
                    value={selectedCity}
                    onChange={(name) => {
                      changeCity(name);
                    }}
                    placeholder="Select a City"
                    className="shipping-country-select"
                  />
                  <input
                    onChange={(e) => changeCode(e.target.value)}
                    className="shipping-zip"
                    type="text"
                    placeholder="Post code/Zip"
                  />

                  <button
                    type="button"
                    className="shipping-submit"
                    onClick={handleUpdateTotals}
                  >
                    Update Totals
                  </button>
                </form>
              )}
            </div>
            {!isShippingInfoVisible && (
              <div className="shipping-display">
                <p className="shipping-display-item">
                  Selected Country: {selectedCountry?.name}
                </p>
                <p className="shipping-display-item">
                  Selected State: {selectedState?.name}
                </p>
                <p className="shipping-display-item">
                  Selected City: {selectedCity?.name}
                </p>
                <p className="shipping-display-item">
                  Post code/Zip: {postCode}
                </p>
              </div>
            )}
          </div>
          <div className="cart__total">
            <p className="cart__total-text">Total</p>
            <p className="cart__total-number">
              {products
                .reduce(
                  (acc, { product, cartQuantity }) =>
                    acc + product.currentPrice * cartQuantity,
                  0
                )
                .toFixed(2)}{" "}
              $
            </p>
          </div>
          <div className="cart__submit">
            {products.length > 0 ? (
              <Link to="/checkout">
                <button type="submit" className="cart__submit-button">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <div className="cart__empty-error">
                <p className="cart__empty-error-text">Your cart is empty!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
