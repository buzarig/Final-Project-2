import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Country } from "country-state-city";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/_checkout.scss";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import { FormLabel, Radio, RadioGroup } from "@mui/material";

const customStyles = {
  // eslint-disable-next-line no-unused-vars
  control: (provided, state) => ({
    ...provided,
    marginTop: 32,
    border: "none",
    borderBottom: "1px solid #9a9a9a",
    borderRadius: 0,
    fontFamily: "DM Sans, sans-serif",
    color: "#9a9a9a"
  }),
  // eslint-disable-next-line no-unused-vars
  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0
  }),
  // eslint-disable-next-line no-unused-vars
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none"
  })
};

function Checkout() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPromo, setSelectedPromo] = useState("");
  // const [orderNo, setOrderNo] = useState();
  const productsArray = useSelector((state) => state.cart.cartProducts);
  const promoData = [
    {
      id: 1,
      title: "PROMO20",
      sum: 20,
      count: 10
    },
    {
      id: 2,
      title: "PROMO30",
      sum: 30,
      count: 5
    }
  ];

  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm();
  const usePromo = (e) => {
    // console.log(getValues().promo);
    e.preventDefault();
    const promoCode = getValues().promo;
    const promoItem = promoData.find((promo) => promo.title === promoCode);

    // console.log(promoItem);
    if (promoItem) {
      setSelectedPromo(`${promoItem.sum}`);
    } else if (promoItem === undefined) {
      setSelectedPromo(undefined);
    }
  };

  const watchPromo = watch("promo");

  const getTotalPrice = () => {
    if (!productsArray || productsArray.length === 0) {
      return 0;
    }
    const totalPrice = productsArray.reduce(
      (acc, { product, cartQuantity }) =>
        acc + product.currentPrice * cartQuantity,
      0
    );
    if (selectedPromo) {
      return (totalPrice - (totalPrice / 100) * selectedPromo).toFixed(2);
    }
    return totalPrice;
  };

  const onSubmit = (data) => {
    const formData = {
      name: data.name,
      lastname: data.lastname,
      country: selectedCountry,
      address: data.address,
      city: data.city,
      postal: data.postal,
      mobile: data.mobile,
      email: data.email,
      promo: data.promo,
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
      // .then((dataFetch) => {
      //   setOrderNo(dataFetch.order.orderNo);
      //
      //   // dispatch(clear()); для очищення корзини
      // })
      .catch((error) => {
        // eslint-disable-next-line no-console
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
            <Link className="login-mark-text" to="/myAccount/signIn">
              Click here to login
            </Link>
          </p>
          <div className="main-top_coupon">
            <div className="coupon-box">
              <h4 className="box-title">
                If you have a coupon code, please apply it below.
              </h4>

              <div className="box-flex-action">
                <div className="box-textfield">
                  {selectedPromo === undefined && (
                    <p className="promo_select">Сoupon code is not valid</p>
                  )}
                  {selectedPromo && (
                    <p className="promo_select">
                      - {selectedPromo} % discount using your coupon code
                    </p>
                  )}
                  <TextField
                    id="standard-basic"
                    label="Coupon Code"
                    variant="standard"
                    sx={{ width: 350 }}
                    {...register("promo", { required: false })}
                  />
                </div>
                <div className="box-button">
                  <Button
                    className="btn_promo"
                    type="submit"
                    onClick={usePromo}
                    disabled={!watchPromo || watchPromo.length === 0}
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
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      className="billing_textfield-item"
                      placeholder="First name *"
                      // value={redux}
                      {...register("name", { required: true })}
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
                {errors.name && <span>{errors.name.message}</span>}
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      className="billing_textfield-item"
                      placeholder="Last name *"
                      // value={redux}
                      {...register("lastname", { required: true })}
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
                value={selectedCountry}
                // value={redux}!!!
                onChange={(item) => {
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
              {productsArray.map((product) => (
                <div key={product.product.itemNo} className="box-items">
                  <div className="item-name">
                    {product.product.name.charAt(0).toUpperCase() +
                      product.product.name.slice(1)}
                  </div>
                  <div className="item-price">
                    ${product.product.currentPrice}
                  </div>
                </div>
              ))}
              <div className="box-subtotal">
                <div className="subtotal-title">Subtotal</div>
                <div className="subtotal-price">
                  $
                  {productsArray.reduce(
                    (acc, { product, cartQuantity }) =>
                      acc + product.currentPrice * cartQuantity,
                    0
                  )}
                </div>
              </div>
              <div className="box-shipping">
                <div className="shipping-title">Shipping</div>
                <div className="shipping-subtitle">Free shipping</div>
              </div>
              <div className="box-total-sum">
                <div className="total-sum-title">Total</div>
                {promoData.length > 0 ? (
                  <div className="total-sum-total"> ${getTotalPrice()}</div>
                ) : (
                  <div className="total-sum-total"> ${getTotalPrice()}</div>
                )}
              </div>

              <div className="box-action">
                <div className="action-bank">
                  <FormControl style={{ marginBottom: "30px" }}>
                    <FormLabel id="payment-method" />
                    <RadioGroup
                      aria-labelledby="payment-method"
                      defaultValue="Direct bank transfer"
                      // onChange={handleChange}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Direct bank transfer"
                        control={<Radio />}
                        label="Direct bank transfer"
                      />
                      <FormControlLabel
                        value="Check payments"
                        control={<Radio />}
                        label="Check payments"
                      />
                      <FormControlLabel
                        value="Cash on delivery"
                        control={<Radio />}
                        label="Cash on delivery"
                      />

                      <FormControlLabel
                        value="PayPal"
                        control={<Radio />}
                        label={
                          <div
                            style={{ display: "flex", alignItems: "flex-end" }}
                          >
                            PayPal
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="16"
                              viewBox="0 0 13 16"
                              fill="none"
                              style={{ marginLeft: "5px" }}
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.9137 3.92184C10.5446 6.2604 8.53789 7.98157 6.18226 7.97996H3.63704C3.34237 7.97667 3.0904 8.19229 3.04661 8.48522L2.44023 12.2867C2.39644 12.5796 2.14447 12.7952 1.8498 12.7919H0.405644C0.286846 12.7964 0.17247 12.7463 0.0948464 12.6558C0.0172233 12.5653 -0.0152129 12.4442 0.00670657 12.3268L1.88171 0.673747C1.94493 0.281523 2.28433 -0.00504559 2.67959 6.79661e-05H8.26472C9.0744 0.00102164 9.8438 0.355163 10.3735 0.970696C10.9032 1.58623 11.141 2.40255 11.0254 3.20806L10.9137 3.92184ZM12.6613 7.12993L12.773 6.41615C12.8756 5.68865 12.6862 4.94998 12.2464 4.36304C11.6783 7.27799 9.13763 9.38147 6.18254 9.38355H4.82615C4.57256 9.38715 4.34877 9.55104 4.26764 9.79257L3.36604 15.5349C3.34445 15.6509 3.3759 15.7706 3.45169 15.8607C3.52748 15.9509 3.63958 16.0021 3.757 16H5.20115C5.49639 16.0005 5.74906 15.7872 5.79956 15.4948L6.39797 11.6933C6.44492 11.4022 6.69496 11.1882 6.9884 11.188H7.89797C10.2657 11.2055 12.2904 9.48055 12.6613 7.12993Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
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
