import React, {useEffect, useState} from "react";
import "../styles/_cart.scss";
import { useSelector, useDispatch} from "react-redux";
import {Country, State, City} from "country-state-city";
import Select from 'react-select';
import care from "../assets/images/about-care.png";
import remove from "../assets/images/remove-cart-item.png";
import close from "../assets/images/close-shipping.png"

import {
  removeProduct,
  decreaseCount,
  increaseCount
} from "../redux/actions/basketActions";


const products = [
  {
    name: "Lira Earrings",
    price: 20,
    color: 'black',
    size: 'medium',
    number: 1
  },
  {
    name: "Ollie Earrings",
    price: 20,
    color: 'white',
    size: 'small',
    number: 3
  }
]


function Cart() {
  // const productsArray = useSelector((state) => state.basket.productsArray);
  // const isDeleting = useSelector((state) => state.basket.isDeleting);
  const dispatch = useDispatch();

  const handleRemoveProduct = (itemNo) => {
    dispatch(removeProduct(itemNo));
  };

  const handleIncreaseCount = (itemNo) => {
    dispatch(increaseCount(itemNo));
  };

  const handleDecreaseCount = (itemNo) => {
    dispatch(decreaseCount(itemNo));
  };



  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isShippingInfoVisible, setShippingInfoVisible] = useState(true);
  const [postCode, setPostCode] = useState('');

  // useEffect(() => {
  //   console.log(selectedCountry);
  //   console.log(selectedCountry?.isoCode);
  //   console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  // }, [selectedCountry]);

  const toggleShippingInfo = () => {
    setShippingInfoVisible(!isShippingInfoVisible);
  };

  // const handleUpdateTotals = () => {
  //   if (selectedCountry && selectedState && selectedCity) {
  //     console.log('Selected Country:', selectedCountry.name);
  //     console.log('Selected State:', selectedState.name);
  //     console.log('Selected City:', selectedCity.name);
  //     console.log('Selected Post code/Zip:', postCode);
  //   }
  // };

  const handleUpdateTotals = () => {
    if (selectedCountry && selectedState && selectedCity) {
      return (
        <div className="shipping-info">
          <div>Selected Country: {selectedCountry.name}</div>
          <div>Selected State: {selectedState.name}</div>
          <div>Selected City: {selectedCity.name}</div>
          <div>Selected Post code/Zip: {postCode}</div>
        </div>
        
      );
    }
  };




  return (
    <div className="cart">
      <h1 className="cart__title">Shopping cart</h1>

      <div className="cart__container">
        <div className="cart__products">
          <div className="cart__products-items">
          {products.map((product, index) => (
            <div className="cart__products-item" key={index}>
              <img className="cart__products-image" src={care} alt={product.name} />
              <div className="cart__products-text">
                <h1 className="cart__products-text-title">{product.name}</h1>
                <p className="cart__products-text-color">{product.color}/{product.size}</p>
                <p className="cart__products-text-price">{product.price},00 $</p>
              </div>
              <div className="cart__products-count">
                <button className="cart__products-count-minus">-</button>
                <p className="cart__products-count-number">1</p>
                <button
                  type="button"
                  onClick={() => handleIncreaseCount(index)}
                 className="cart__products-count-plus"
                 >+</button>
              </div>
              <button className="remove-button">
                <img className="cart__products-item-remove" src={remove} alt="" />
              </button>
              
            </div>

      ))}
          </div>
          <div className="cart__products-footer">
            <div className="cart__products-update">
              <button type="submit" className="cart__products-update-button">Update Cart</button>
            </div>
            {/* <div className="cart__products-coupon">
              <input placeholder="Coupon Code" type="text" className="cart__products-coupon-input" />
              <button className="cart__products-coupon-button">Apply Coupon</button>
            </div> */}
          </div>
        </div>
        <div className="cart__checkout">
          <div className="checkout-container">
          <h1 className="cart__checkout-title">Cart Totals</h1>

          <div className="count">
            <span className="count-text">Subtotal</span>
            <span className="count-summ">
              {/* {productsArray
                  .reduce(
                  (acc, { product, cartQuantity }) =>
                  acc + product.currentPrice * cartQuantity,
                  0
                  )
                  .toFixed(2)}{" "} */}
                  num
            </span>
          </div>
        <div className="shipping">
        <div className="shipping-title-container">
          <p className="shipping-title">Shipping</p>
          <p className="shipping-text">  
            Shipping costs will be calculated once you have provided address.
          </p>  
        </div>
        </div>
        <div className="shipping-container">
          <div className="shipping-container-calculate">
            <h1 className="shipping-container-h1">CALCULATE SHIPPING</h1>
            <button onClick={toggleShippingInfo} className="shipping-container-close">
              <img  className="shipping-container-close-image" src={close} alt="" />
            </button>
            
          </div>
          {isShippingInfoVisible && (
            <div>
              <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
        }}
        placeholder="Select a Country"
        className="shipping-country-select"
      />
      <Select
          options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
          getOptionLabel={(options) => {
            return options["name"];
          }}
          getOptionValue={(options) => {
            return options["name"];
          }}
          value={selectedState}
          onChange={(item) => {
            setSelectedState(item);
          }}
          placeholder="Select a State"
          className="shipping-country-select"
          styles={{control: base => ({
            ...base,
          fontFamily: 'DM Sans', 
          }),}}
      />    
        <Select
          options={City.getCitiesOfState(
            selectedState?.countryCode,
            selectedState?.isoCode
          )}
          getOptionLabel={(options) => {
            return options["name"];
          }}
          getOptionValue={(options) => {
            return options["name"];
          }}
          value={selectedCity}
          onChange={(item) => {
            setSelectedCity(item);
          }}
          placeholder="Select a City"
          className="shipping-country-select"
      
        />
        <input onChange={(e) => setPostCode(e.target.value)} className="shipping-zip" type="text" placeholder="Post code/Zip" />
        
        <button onClick={handleUpdateTotals} className="shipping-submit">Update Totals</button>
            </div>
          )}</div>
          {handleUpdateTotals()}

          </div>
         <div className="cart__total">
          <p className="cart__total-text">Total</p>
          <p className="cart__total-number">num</p>
          </div>
          <div className="cart__submit">
            <button type="submit" className="cart__submit-button">Proceed to Checkout</button>
          </div>
           
        </div>
      </div>
    </div>



  )
}
export default Cart;
