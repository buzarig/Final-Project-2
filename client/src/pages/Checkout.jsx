import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Country } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import {
  countryAddress,
  stateAddress,
  cityAddress,
  codeAddress
} from "../redux/actions/addressActions";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/_checkout.scss";


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    marginTop: 32,
    border: "none",
    borderBottom: "1px solid #9a9a9a",
    borderRadius: 0,
    fontFamily: "DM Sans, sans-serif",
    color: "#9a9a9a"
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none"
  })
};

function Checkout() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [orderNo, setOrderNo] = useState();
  const dispatch = useDispatch();
  const productsArray = useSelector((state) => state.cart.cartProducts);
  const adress = useSelector((state) => state.shippingInfo);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      firstName: data.name,
      lastName: data.lastname,
      country: selectedCountry,
      address: data.address,
      city: data.city,
      postal: data.postal,
      mobile: data.mobile,
      email: data.email,
      payment: data.payment,
      letterSubject: "Thank you for order! You are welcome!",
      letterHtml: `<h1>Your order is placed. Your order was successful!. You are welcome!</h1><p>{Other details about order in your HTML}</p>`
    };

    const orderData = {
      ...formData,

      products: productsArray
    };

    fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataFetch) => {
        setOrderNo(dataFetch.order.orderNo);

        // dispatch(clear()); для очищення корзини
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="checkout_page">
        <div className="checkout_main-top">
          <h2 className="main-top_title">Checkout</h2>
          <p className="main-top_login">
            Returning Customer?
            <Link to="/myAccount/signIn">
              <a className="login-mark-text"> Click here to login</a>
            </Link>
          </p>
          <div className="main-top_coupon">
          <p className="coupon-text">
            Have a coupon?
            <a className="login-mark-text">Click here to enter your code</a>
          </p>
          <div className="coupon-box">
            <h4 className="box-title">
              If you have a coupon code, please apply it below.
            </h4>
            <div className="box-flex-action">
              <div className="box-textfield">
                <TextField
                  id="standard-basic"
                  label="Coupon Code"
                  variant="standard"
                  sx={{ width: 350 }}
                />
              </div>
              <div className="box-button">
                <Button
                  variant="contained"
                  sx={{
                    width: 150,
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "grey"
                    }
                  }}
                >
                  APPLY COUPON
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="checkout_main-bottom">
          <div className="main-bottom_billing">
            <div className="billing_names">
              <h3 className="billing_title">Billing Details</h3>
              <div className="billing_textfield-items">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      className="billing_textfield-item"
                      placeholder="First name *"
                      // value={redux}
                      {...register("firstName", { required: true })}
                      {...field}
                      required
                    />
                  )}
                  rules={{
                    pattern: {
                      value: /^[A-Za-z]{2,}$/i,
                      message:
                        "First name should contain at least 2 letters and no other characters."
                    }
                  }}
                />
                {errors.name && <span>{errors.firstName.message}</span>}
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      className="billing_textfield-item"
                      placeholder="Last name *"
                      // value={redux}
                      {...register("lastName", { required: true })}
                      {...field}
                    />
                  )}
                  rules={{
                    pattern: {
                      value: /^[A-Za-z]{2,}$/i,
                      message:
                        "Last name should contain at least 2 letters and no other characters."
                    }
                  }}
                />
                {errors.lastName && <span>{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="billing_info-items">
              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options.name;
                }}
                getOptionValue={(options) => {
                  return options.name;
                }}
                value={adress.selectedCountry}
                onChange={(item) => {
                  countryAddress










                  setSelectedCountry(item);
                }}
                placeholder="Country *"
                styles={customStyles}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="billing_info-item"
                    placeholder="Street Address *"
                    {...register("address", { required: true })}
                    {...field}
                  />
                )}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9 ]+$/i,
                    message: "Incorrect address."
                  }
                }}
              />
              {errors.address && <span>{errors.address.message}</span>}
              <Controller
                name="postal"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="billing_info-item"
                    placeholder="Postcode / ZIP *"
                    {...register("postal", { required: true })}
                    {...field}
                  />
                )}
                rules={{
                  pattern: {
                    value: /^\d{5}$/i,
                    message: "Incorrect postcode."
                  }
                }}
              />
              {errors.postal && <span>{errors.postal.message}</span>}
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="billing_info-item"
                    placeholder="Town / City *"
                    {...register("city", { required: true })}
                    {...field}
                  />
                )}
                rules={{
                  pattern: {
                    value: /^[A-Za-z]{2,}$/i,
                    message:
                      "Сity should contain at least 2 letters and no other characters."
                  }
                }}
              />
              {errors.city && <span>{errors.city.message}</span>}

              <Controller
                name="mobile"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="billing_info-item"
                    placeholder="Phone *"
                    {...register("mobile", { required: true })}
                    {...field}
                  />
                )}
                rules={{
                  pattern: {
                    value: /^\d{10}$/i,
                    message: "Incorrect phone number."
                  }
                }}
              />
              {errors.mobile && <span>{errors.mobile.message}</span>}

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
              <input
                className="billing_info-item"
                placeholder="Email *"
                {...register("email", { required: true })}
                {...field}
              />
              )}
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "Incorrect email."
                  }
                }}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>


          <div className="main-bottom_order">
            <h3 className="order_title"> Your Order</h3>
            <div className="order_product-box">
              <div className="box-total_title">
                <div className="total-product">Product</div>
                <div className="total-title">Total</div>
              </div>
              <div className="box-items">
                <div className="item-name">name DB</div>
                <div className="item-price">price DB</div>
              </div>
              <div className="box-subtotal">
                <div className="subtotal-title">Subtotal</div>
                <div className="subtotal-price">price DB</div>
              </div>
              <div className="box-shipping">
                <div className="shipping-title">Shipping</div>
                <div className="shipping-subtitle">Free shipping</div>
              </div>
              <div className="box-total-sum">
                <div className="total-sum-title">Total</div>
                <div className="total-sum-total">sum DB</div>
              </div>
              <div className="box-action">
                <div className="action-bank">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Direct bank transfer"
                  />
                  <div className="bank-title">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account
                  </div>
                </div>
                <div className="action-check">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Check payments"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Cash on delivery"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="PayPal"
                    />
                  </FormGroup>
                </div>
                <div className="action-btn">
                  <Button
                    variant="contained"
                    sx={{
                      width: 462,
                      backgroundColor: "black",
                      "&:hover": {
                        backgroundColor: "grey"
                      }
                    }}
                  >
                    PLACE ORDER
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Checkout;
